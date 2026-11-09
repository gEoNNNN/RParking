// SiteEditLayer – "editare directa pe site": a small overlay (only for logged
// in admins) that lets you browse the public site and click on any text or
// image to edit it in place. Matching works by comparing the clicked DOM
// element against a flat map of every editable string fetched from
// /api/admin/edit-map, then writing the changed leaf through /api/admin/edit.
// Hidden on public visitors, /admin pages and everything within .rp-edit-root.
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { LuPencil, LuX, LuUpload } from 'react-icons/lu';

type Leaf = { path: string; value: string };
type Match = { file: string; path: string; value: string };
type ImgEntry = { path: string };

type Index = {
  text: Map<string, Match[]>;
  img: Map<string, Match[]>;
};

type Anchor = { left: number; top: number; maxH: number };

type EditorState =
  | { kind: 'text'; options: Match[]; sel: number; value: string; anchor: Anchor }
  | { kind: 'image'; match: Match; src: string; anchor: Anchor };

const FILE_LABELS: Record<string, string> = {
  'messages:ro': 'Texte site (RO)',
  'messages:en': 'Texte site (EN)',
  'messages:ru': 'Texte site (RU)',
  'content:shop-products': 'Produse magazin',
  'content:ecosystem-cards': 'Carduri produse (prima pagina)',
  'content:catalog-cards': 'Carduri catalog (pagini produse)',
  'content:rti-solutions': 'Carusel solutii RTI',
  'content:solutii-domains': 'Domenii de aplicare (solutii)',
  'content:gallery': 'Galerie implementari',
};

const FORBIDDEN = ['__proto__', 'constructor', 'prototype'];
// Edit mode survives a full page reload (every save triggers one, see below).
const EDIT_ON_KEY = 'rp_edit_on';
const norm = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase();
const decodeSafe = (s: string) => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};

const IMG_RE = /\.(png|jpe?g|webp|gif|svg|avif)$/i;
// A valid image reference is either a local path or an absolute http(s) link.
const isValidImgRef = (v: string) =>
  /^https?:\/\/[^\s]+$/i.test(v) || (/^\/[^/]/.test(v.trim()) && !v.startsWith('//'));
const isImgValue = (v: string) => isValidImgRef(v) && (v.startsWith('http') || IMG_RE.test(v));

// next/image renders <img src="/_next/image?url=%2Fimg%2Fx.png&w=640&q=75">;
// unwrap it back to the original path or absolute link.
function unwrapRawSrc(raw: string): string {
  if (!raw) return '';
  const i = raw.indexOf('/_next/image');
  if (i === -1) return raw;
  const q = raw.indexOf('?', i);
  if (q === -1) return raw;
  const u = new URLSearchParams(raw.slice(q + 1)).get('url') || '';
  return u || raw;
}

function bgImageUrl(el: HTMLElement): string | null {
  const bg = getComputedStyle(el).backgroundImage;
  if (!bg || bg === 'none') return null;
  const m = /url\((['"]?)(.*?)\1\)/.exec(bg);
  if (!m || !m[2]) return null;
  const url = m[2];
  return isValidImgRef(url) ? url : null;
}

// Deep-set a dotted path ("items.2.title") inside a plain JSON object/array.
function setDeep(root: unknown, path: string, value: string): boolean {
  const segs = path.split('.').filter(Boolean);
  if (segs.length === 0 || segs.some((s) => FORBIDDEN.includes(s))) return false;
  let cur: unknown = root;
  for (let i = 0; i < segs.length - 1; i++) {
    const seg = segs[i];
    const next = Array.isArray(cur) ? cur[Number(seg)] : (cur as Record<string, unknown>)?.[seg];
    if (next === undefined) return false;
    cur = next;
  }
  const last = segs[segs.length - 1];
  if (Array.isArray(cur) && /^\d+$/.test(last)) {
    (cur as unknown[])[Number(last)] = value;
    return true;
  }
  if (cur && !Array.isArray(cur) && typeof cur === 'object') {
    const obj = cur as Record<string, unknown>;
    if (last in obj) {
      obj[last] = value;
      return true;
    }
  }
  return false;
}

function placePopup(r: DOMRect, vw: number, vh: number): Anchor {
  const width = Math.min(440, vw - 16);
  const below = r.bottom + 10;
  const availBelow = vh - below - 8;
  const maxH = Math.min(480, Math.max(240, availBelow >= 260 ? availBelow : r.top - 20));
  const top = availBelow >= 260 ? below : Math.max(8, r.top - maxH - 10);
  const left = Math.max(8, Math.min(r.left - 8, vw - width - 8));
  return { left, top, maxH };
}

export default function SiteEditLayer() {
  const locale = useLocale() as string;
  const pathname = usePathname() || '';

  // Hide inside the admin panel itself.
  const stripped = pathname.replace(/^\/(ro|en|ru)(?=\/|$)/, '');
  const isAdminPath = stripped === '/admin' || stripped.startsWith('/admin/');

  const [authed, setAuthed] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [applyAll, setApplyAll] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [imgList, setImgList] = useState<ImgEntry[]>([]);
  const [imgFilter, setImgFilter] = useState('');

  const editingRef = useRef(false);
  const idxRef = useRef<Index | null>(null);
  const filesRef = useRef<{ files: Record<string, Leaf[]>; images: ImgEntry[] } | null>(null);
  const hlRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeElRef = useRef<HTMLElement | null>(null);
  const suppressRef = useRef(false);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  // ─── session check (with a few retries: the server may still be booting) ─
  useEffect(() => {
    let dead = false;
    let attempts = 0;
    const check = async () => {
      attempts += 1;
      try {
        const r = await fetch('/api/admin/session', { cache: 'no-store' });
        const d = (await r.json()) as { authenticated?: boolean };
        if (dead) return;
        setAuthed(Boolean(d.authenticated));
        if (!d.authenticated && attempts < 3) window.setTimeout(check, 1500);
      } catch {
        if (!dead && attempts < 3) window.setTimeout(check, 1500);
        else if (!dead) setAuthed(false);
      }
    };
    check();
    return () => {
      dead = true;
    };
  }, [pathname]);

  // Close the popup when navigating.
  useEffect(() => {
    setEditor(null);
    setEditing(false);
    editingRef.current = false;
  }, [pathname]);

  // ─── load the edit map + build indexes when edit mode turns on ────────
  const enterEditMode = useCallback(async () => {
    setEditing(true);
    editingRef.current = true;
    try {
      sessionStorage.setItem(EDIT_ON_KEY, '1');
    } catch {
      /* private mode: fine, mode just will not resume after reload */
    }
    setEditor(null);
    try {
      const r = await fetch(`/api/admin/edit-map?locale=${locale}`, { cache: 'no-store' });
      if (!r.ok) throw new Error('map');
      const d = (await r.json()) as {
        files: Record<string, Leaf[]>;
        images: { uploads: ImgEntry[]; assets: ImgEntry[] };
      };
      filesRef.current = { files: d.files, images: [...(d.images?.uploads ?? []), ...(d.images?.assets ?? [])] };
      setImgList(d.images?.uploads ?? []);

      const text = new Map<string, Match[]>();
      const img = new Map<string, Match[]>();
      const push = (map: Map<string, Match[]>, key: string, m: Match) => {
        const arr = map.get(key) || [];
        if (!arr.some((x) => x.file === m.file && x.path === m.path)) arr.push(m);
        map.set(key, arr);
      };
      for (const [file, leaves] of Object.entries(d.files)) {
        for (const leaf of leaves) {
          const m: Match = { file, path: leaf.path, value: leaf.value };
          push(text, norm(leaf.value), m);
          if (isImgValue(leaf.value)) push(img, norm(decodeSafe(leaf.value)), m);
        }
      }
      idxRef.current = { text, img };
    } catch {
      showToast('Nu am putut incarca harta de editare. Verifica sesiunea.');
      setEditing(false);
      editingRef.current = false;
    }
  }, [locale, showToast]);

  const exitEditMode = useCallback(() => {
    setEditing(false);
    editingRef.current = false;
    setEditor(null);
    idxRef.current = null;
    try {
      sessionStorage.removeItem(EDIT_ON_KEY);
    } catch {
      /* noop */
    }
    if (hlRef.current) {
      hlRef.current.classList.remove('rp-edit-hl');
      hlRef.current = null;
    }
  }, []);

  // Auto-resume edit mode after a full reload (see save(): every save reloads).
  useEffect(() => {
    if (!authed || isAdminPath || editingRef.current) return;
    let on = null;
    try {
      on = sessionStorage.getItem(EDIT_ON_KEY);
    } catch {
      on = null;
    }
    if (on === '1') void enterEditMode();
  }, [authed, isAdminPath, enterEditMode]);

  // ─── matching ─────────────────────────────────────────────────────────
  const findMatches = useCallback(
    (start: HTMLElement): { kind: 'text' | 'image'; options: Match[]; el: HTMLElement } | null => {
      const idx = idxRef.current;
      if (!idx) return null;
      let el: HTMLElement | null = start;
      for (let i = 0; el && i < 5; i++, el = el.parentElement) {
        if (el.closest('.rp-edit-root')) return null;

        if (el.tagName === 'IMG') {
          const raw = (el as HTMLImageElement).currentSrc || (el as HTMLImageElement).src || '';
          const src = decodeSafe(unwrapRawSrc(raw));
          if (!src) continue;
          const hits = idx.img.get(norm(src));
          if (hits && hits.length) return { kind: 'image', options: hits, el };
          continue;
        }
        const bg = bgImageUrl(el);
        if (bg) {
          const hits = idx.img.get(norm(decodeSafe(bg)));
          if (hits && hits.length) return { kind: 'image', options: hits, el };
        }
        const t = (el.textContent || '').trim();
        if (t) {
          const hits = idx.text.get(norm(t));
          if (hits && hits.length) return { kind: 'text', options: hits, el };
        }
      }
      return null;
    },
    [],
  );

  const clearHighlight = useCallback(() => {
    if (hlRef.current) {
      hlRef.current.classList.remove('rp-edit-hl');
      hlRef.current = null;
    }
  }, []);

  // ─── pointer feedback (hover highlight) while editing ─────────────────
  useEffect(() => {
    if (!editing || isAdminPath) return;
    const onMove = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t || suppressRef.current) return;
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const found = findMatches(t);
        if (found && found.el !== hlRef.current) {
          clearHighlight();
          found.el.classList.add('rp-edit-hl');
          hlRef.current = found.el;
        } else if (!found) {
          clearHighlight();
        }
      });
    };
    const onLeave = () => clearHighlight();
    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      clearHighlight();
    };
  }, [editing, isAdminPath, findMatches, clearHighlight]);

  // ─── click interception while editing ─────────────────────────────────
  useEffect(() => {
    if (!editing || isAdminPath) return;
    const onClick = (e: MouseEvent) => {
      if (suppressRef.current) return;
      const t = e.target as HTMLElement | null;
      if (!t || t.closest('.rp-edit-root')) return;
      const found = findMatches(t);
      if (!found) return; // normal site behaviour
      e.preventDefault();
      e.stopPropagation();
      activeElRef.current = found.el;
      const rect = found.el.getBoundingClientRect();
      const anchor = placePopup(rect, window.innerWidth, window.innerHeight);
      if (found.kind === 'image') {
        const raw = (found.el as HTMLImageElement).currentSrc || (found.el as HTMLImageElement).src || '';
        setImgFilter('');
        setEditor({
          kind: 'image',
          match: found.options[0],
          src: unwrapRawSrc(raw),
          anchor,
        });
      } else {
        setEditor({ kind: 'text', options: found.options, sel: 0, value: found.options[0].value, anchor });
      }
      setApplyAll(false);
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, [editing, isAdminPath, findMatches]);

  // Escape closes the popup.
  useEffect(() => {
    if (!editor) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setEditor(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [editor]);

  // ─── saving ───────────────────────────────────────────────────────────
  const save = useCallback(async () => {
    if (!editor || busy) return;
    setBusy(true);
    try {
      const isText = editor.kind === 'text';
      const m = isText ? editor.options[editor.sel] : editor.match;
      const rawValue = isText ? editor.value : editor.src;
      const value = isText ? rawValue : rawValue.trim();
      if (!isText && !isValidImgRef(value)) {
        showToast('Imagine invalida: foloseste o cale /img/... sau un link http(s).');
        return;
      }
      const r = await fetch('/api/admin/edit', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: m.file, path: m.path, value }),
      });
      if (!r.ok) {
        const d = (await r.json().catch(() => ({}))) as { error?: string };
        showToast(d.error || 'Salvare esuata.');
        return;
      }

      // optimistic DOM update
      const el = activeElRef.current;
      if (el && isText && el.children.length === 0) el.textContent = value;
      if (el && !isText) (el as HTMLImageElement).src = value;

      // update the in-memory map so the next click matches the new value
      const files = filesRef.current?.files;
      const leaf = files?.[m.file]?.find((l) => l.path === m.path && l.value === m.value);
      if (leaf) leaf.value = value;
      if (files) {
        const text = new Map<string, Match[]>();
        const img = new Map<string, Match[]>();
        for (const [file, leaves] of Object.entries(files)) {
          for (const lf of leaves) {
            const mm: Match = { file, path: lf.path, value: lf.value };
            const tk = norm(lf.value);
            const arr = text.get(tk) || [];
            if (!arr.some((x) => x.file === mm.file && x.path === mm.path)) arr.push(mm);
            text.set(tk, arr);
            if (isImgValue(lf.value)) {
              const ik = norm(decodeSafe(lf.value));
              const ia = img.get(ik) || [];
              if (!ia.some((x) => x.file === mm.file && x.path === mm.path)) ia.push(mm);
              img.set(ik, ia);
            }
          }
        }
        idxRef.current = { text, img };
      }

      // optional: mirror the same text into the other locales (messages only)
      if (m.file.startsWith('messages:') && applyAll) {
        const cur = m.file.split(':')[1];
        for (const loc of ['ro', 'en', 'ru']) {
          if (loc === cur) continue;
          try {
            const lr = await fetch(`/api/admin/messages?locale=${loc}`, { cache: 'no-store' });
            if (!lr.ok) continue;
            const ld = (await lr.json()) as { messages: unknown };
            if (!setDeep(ld.messages, m.path, value)) continue;
            await fetch('/api/admin/messages', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ locale: loc, messages: ld.messages }),
            });
          } catch {
            /* keep going; partial application is acceptable */
          }
        }
      }

      setEditor(null);
      // Feedback first: server-side revalidation has already run (revalidatePath
      // fires in writeMessages/writeCollection), so a full reload serves the
      // fresh content deterministically. router.refresh() proved unreliable
      // here (Next replays the client router cache without hitting the server).
      showToast('Salvat. Actualizez pagina...');
      setTimeout(() => window.location.reload(), 300);
    } finally {
      setBusy(false);
    }
  }, [editor, busy, applyAll, showToast]);

  // ─── image upload in the image editor ────────────────────────────────
  const upload = useCallback(
    async (file: File | null) => {
      if (!file || !editor || editor.kind !== 'image') return;
      const fd = new FormData();
      fd.append('files', file);
      const r = await fetch('/api/admin/images', { method: 'POST', body: fd });
      const d = (await r.json().catch(() => ({}))) as {
        saved?: { path: string }[];
        rejected?: string[];
        error?: string;
      };
      if (r.ok && d.saved?.[0]) {
        setEditor({ ...editor, src: d.saved[0].path });
        setImgList((prev) => [d.saved![0], ...prev]);
        showToast('Imaginea a fost incarcata. Apasa Salveaza.');
      } else {
        showToast(d.error || d.rejected?.join('; ') || 'Upload esuat.');
      }
    },
    [editor, showToast],
  );

  if (isAdminPath || !authed) return null;

  const shownImgs = imgList.filter((i) => i.path.toLowerCase().includes(imgFilter.toLowerCase())).slice(0, 80);

  return (
    <div className="rp-edit-root">
      {!editing && (
        <button type="button" className="rp-edit-fab" onClick={enterEditMode} title="Mod editare directa pe site">
          <LuPencil className="w-4 h-4" />
          <span>Mod editare</span>
        </button>
      )}

      {editing && (
        <div className="rp-edit-bar">
          <span className="rp-edit-badge" />
          <span className="rp-edit-bar-title">Mod editare activ</span>
          <span className="rp-edit-bar-hint">da click pe un text sau o imagine</span>
          <button type="button" className="rp-edit-bar-btn" onClick={exitEditMode}>
            Gata
          </button>
        </div>
      )}

      {editor && (
        <div
          className="rp-edit-pop"
          style={{
            left: editor.anchor.left,
            top: editor.anchor.top,
            width: `min(440px, calc(100vw - 16px))`,
            maxHeight: editor.anchor.maxH,
          }}
        >
          <div className="rp-edit-pop-head">
            <span>{editor.kind === 'text' ? 'Editeaza textul' : 'Editeaza imaginea'}</span>
            <button type="button" className="rp-edit-x" onClick={() => setEditor(null)} aria-label="Inchide">
              <LuX className="w-4 h-4" />
            </button>
          </div>

          {editor.kind === 'text' && editor.options.length > 1 && (
            <div className="rp-edit-opts">
              <div className="rp-edit-opts-label">Alege sursa ({editor.options.length}):</div>
              {editor.options.map((o, i) => (
                <label key={`${o.file}::${o.path}`} className="rp-edit-opt">
                  <input
                    type="radio"
                    checked={editor.sel === i}
                    onChange={() =>
                      setEditor({
                        ...editor,
                        sel: i,
                        value: i === editor.sel ? editor.value : o.value,
                      })
                    }
                  />
                  <span>
                    {FILE_LABELS[o.file] || o.file} &gt; {o.path}
                  </span>
                </label>
              ))}
            </div>
          )}

          {editor.kind === 'text' ? (
            <>
              <div className="rp-edit-file">
                {FILE_LABELS[editor.options[editor.sel].file] || editor.options[editor.sel].file}
                {' > '}
                {editor.options[editor.sel].path}
                {editor.options[editor.sel].file.startsWith('content:') && ' (se aplica in toate limbile)'}
              </div>
              <textarea
                className="rp-edit-texta"
                value={editor.value}
                onChange={(e) => setEditor({ ...editor, value: e.target.value })}
                rows={5}
              />
              {editor.options[editor.sel].file.startsWith('messages:') && (
                <label className="rp-edit-check">
                  <input type="checkbox" checked={applyAll} onChange={(e) => setApplyAll(e.target.checked)} />
                  <span>aplica acelasi text si in celelalte limbi (RO/EN/RU)</span>
                </label>
              )}
            </>
          ) : (
            <>
              <div className="rp-edit-file">
                {FILE_LABELS[editor.match.file] || editor.match.file}
                {' > '}
                {editor.match.path}
                {' (se aplica in toate limbile)'}
              </div>
              <div className="rp-edit-imgwrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="rp-edit-imgprev" src={editor.src} alt="" />
                <input
                  className="rp-edit-input"
                  value={editor.src}
                  placeholder="cale locala (/img/...) sau link https://..."
                  onChange={(e) => setEditor({ ...editor, src: e.target.value })}
                  spellCheck={false}
                />
                <label className="rp-edit-upbtn">
                  <LuUpload className="w-4 h-4" />
                  <span>Incarca</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="rp-edit-upinput"
                    onChange={(e) => upload(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
              <div className="rp-edit-hintimg">
                Imaginea aleasa aici se aplica pe toate cele 3 limbi (RO / EN / RU).
              </div>
              <input
                className="rp-edit-input rp-edit-search"
                placeholder="cauta in imagini..."
                value={imgFilter}
                onChange={(e) => setImgFilter(e.target.value)}
              />
              <div className="rp-edit-grid">
                {shownImgs.map((im) => (
                  <button
                    key={im.path}
                    type="button"
                    className={`rp-edit-cell${editor.src === im.path ? ' sel' : ''}`}
                    title={im.path}
                    onClick={() => setEditor({ ...editor, src: im.path })}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={im.path} alt="" loading="lazy" />
                  </button>
                ))}
                {shownImgs.length === 0 && <div className="rp-edit-empty">nicio imagine</div>}
              </div>
            </>
          )}

          <div className="rp-edit-act">
            <button type="button" className="rp-edit-btn-ghost" onClick={() => setEditor(null)}>
              Renunta
            </button>
            <button type="button" className="rp-edit-btn-save" onClick={save} disabled={busy}>
              {busy ? 'Se salveaza...' : 'Salveaza'}
            </button>
          </div>
        </div>
      )}

      {toast && <div className="rp-edit-toast">{toast}</div>}

      <style jsx global>{`
        .rp-edit-fab {
          position: fixed;
          left: 12px;
          bottom: 12px;
          z-index: 2147483000;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          border-radius: 999px;
          border: 1px solid rgba(22, 101, 52, 0.25);
          background: #ffffff;
          color: #166534;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 6px 20px rgba(15, 23, 42, 0.18);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .rp-edit-fab:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 26px rgba(15, 23, 42, 0.22);
        }
        .rp-edit-fab:active {
          transform: translateY(1px);
        }

        .rp-edit-bar {
          position: fixed;
          left: 12px;
          bottom: 12px;
          z-index: 2147483000;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 8px 8px 12px;
          border-radius: 999px;
          background: #14532d;
          color: #f0fdf4;
          font-size: 13px;
          box-shadow: 0 8px 26px rgba(15, 23, 42, 0.3);
        }
        .rp-edit-badge {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #4ade80;
          flex: none;
        }
        .rp-edit-bar-title {
          font-weight: 700;
          white-space: nowrap;
        }
        .rp-edit-bar-hint {
          color: #bbf7d0;
          font-size: 12px;
          white-space: nowrap;
        }
        .rp-edit-bar-btn {
          padding: 7px 14px;
          border-radius: 999px;
          background: #ffffff;
          color: #14532d;
          font-size: 13px;
          font-weight: 600;
          border: none;
          cursor: pointer;
        }

        .rp-edit-hl {
          outline: 2px dashed #16a34a !important;
          outline-offset: 2px;
          border-radius: 2px;
          cursor: pointer !important;
        }

        .rp-edit-pop {
          position: fixed;
          z-index: 2147483001;
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow: auto;
          padding: 14px;
          border-radius: 14px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 18px 50px rgba(15, 23, 42, 0.28);
          font-size: 13px;
          color: #0f172a;
        }
        .rp-edit-pop-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 700;
          font-size: 14px;
        }
        .rp-edit-x {
          border: none;
          background: transparent;
          cursor: pointer;
          color: #64748b;
          padding: 2px;
        }
        .rp-edit-file {
          font-size: 11.5px;
          color: #64748b;
          word-break: break-all;
          background: #f8fafc;
          border: 1px solid #eef2f7;
          padding: 6px 8px;
          border-radius: 8px;
        }
        .rp-edit-opts {
          max-height: 130px;
          overflow: auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 8px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
        }
        .rp-edit-opts-label {
          font-size: 12px;
          font-weight: 600;
          color: #475569;
        }
        .rp-edit-opt {
          display: flex;
          gap: 8px;
          align-items: flex-start;
          font-size: 12px;
          cursor: pointer;
          color: #334155;
        }
        .rp-edit-texta {
          width: 100%;
          min-height: 96px;
          resize: vertical;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          padding: 9px 10px;
          font-size: 13px;
          line-height: 1.45;
          font-family: inherit;
        }
        .rp-edit-texta:focus,
        .rp-edit-input:focus {
          outline: 2px solid #16a34a;
          outline-offset: 1px;
          border-color: #16a34a;
        }
        .rp-edit-hintimg {
          font-size: 11.5px;
          color: #64748b;
          margin-top: -2px;
        }
        .rp-edit-check {
          display: flex;
          gap: 8px;
          align-items: center;
          font-size: 12px;
          color: #475569;
          cursor: pointer;
        }
        .rp-edit-input {
          width: 100%;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          padding: 8px 10px;
          font-size: 12.5px;
          font-family: inherit;
        }
        .rp-edit-search {
          flex: none;
        }
        .rp-edit-imgwrap {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .rp-edit-imgwrap .rp-edit-input {
          flex: 1;
          min-width: 0;
        }
        .rp-edit-imgprev {
          width: 84px;
          height: 64px;
          object-fit: contain;
          background: #f1f5f9;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          flex: none;
        }
        .rp-edit-upbtn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border: 1px dashed #86efac;
          background: #f0fdf4;
          color: #166534;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
          white-space: nowrap;
          align-self: center;
          position: relative;
          overflow: hidden;
        }
        .rp-edit-upinput {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
          width: 100%;
        }
        .rp-edit-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
          gap: 6px;
          max-height: 170px;
          overflow: auto;
          padding: 2px;
        }
        .rp-edit-cell {
          height: 48px;
          border-radius: 8px;
          border: 2px solid transparent;
          background: #f8fafc;
          padding: 0;
          cursor: pointer;
          overflow: hidden;
        }
        .rp-edit-cell img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .rp-edit-cell:hover {
          border-color: #bbf7d0;
        }
        .rp-edit-cell.sel {
          border-color: #16a34a;
        }
        .rp-edit-empty {
          grid-column: 1 / -1;
          color: #94a3b8;
          font-size: 12px;
          padding: 8px;
        }
        .rp-edit-act {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }
        .rp-edit-btn-ghost {
          padding: 8px 14px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #334155;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
        .rp-edit-btn-save {
          padding: 8px 16px;
          border-radius: 10px;
          border: none;
          background: #16a34a;
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }
        .rp-edit-btn-save:hover {
          background: #15803d;
        }
        .rp-edit-btn-save:disabled {
          opacity: 0.6;
          cursor: default;
        }
        .rp-edit-toast {
          position: fixed;
          left: 50%;
          bottom: 68px;
          transform: translateX(-50%);
          z-index: 2147483002;
          background: #14532d;
          color: #f0fdf4;
          padding: 9px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 8px 26px rgba(15, 23, 42, 0.3);
        }
        @media (max-width: 640px) {
          .rp-edit-bar-hint {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

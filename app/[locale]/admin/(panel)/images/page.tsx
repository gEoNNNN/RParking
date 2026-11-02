'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { apiDelete, apiGet } from '../../_components/api';
import { Btn, Skeleton, inputClass } from '../../_components/ui';
import { LuCheck, LuCopy, LuTrash2, LuUpload } from 'react-icons/lu';

type Img = { path: string; size: number };

function kb(bytes: number) {
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function PathRow({ img, onDelete }: { img: Img; onDelete?: () => void }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-2.5 transition hover:border-green-300">
      <img src={img.path} alt="" className="h-11 w-14 shrink-0 rounded-lg bg-gray-50 object-contain" loading="lazy" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-mono text-xs text-gray-800">{decodeURIComponent(img.path)}</p>
        <p className="text-[10px] text-gray-400">{kb(img.size)}</p>
      </div>
      <button
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(img.path);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          } catch {
            /* clipboard unavailable */
          }
        }}
        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-green-600"
        title="Copiaza calea"
      >
        {copied ? <LuCheck className="h-4 w-4 text-green-600" /> : <LuCopy className="h-4 w-4" />}
      </button>
      {onDelete ? (
        <button
          onClick={onDelete}
          className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
          title="Sterge"
        >
          <LuTrash2 className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}

export default function AdminImagesPage() {
  const [uploads, setUploads] = useState<Img[]>([]);
  const [assets, setAssets] = useState<Img[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const refresh = useCallback(() => {
    apiGet<{ uploads: Img[]; assets: Img[] }>('/api/admin/images')
      .then((r) => {
        setUploads(r.uploads);
        setAssets(r.assets);
      })
      .catch((e) => setError(String(e?.message || e)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError('');
    setNotice('');
    const form = new FormData();
    for (const f of Array.from(files)) form.append('files', f);
    try {
      const r = await fetch('/api/admin/images', { method: 'POST', body: form });
      const body = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(body?.error || 'Incarcare esuata.');
      const savedCount = body.saved?.length ?? 0;
      const rejected: string[] = body.rejected ?? [];
      setNotice(
        savedCount
          ? `${savedCount} imagine${savedCount === 1 ? '' : 'i'} incarcata${savedCount === 1 ? '' : 'uri'} in /uploads/.${rejected.length ? ` Respins: ${rejected.join('; ')}` : ''}`
          : ''
      );
      refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Incarcare esuata.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  async function remove(path: string) {
    if (!window.confirm(`Stergi ${path}? Ai grija – daca e folosita pe site, poza dispare.`)) return;
    try {
      await apiDelete(`/api/admin/images?path=${encodeURIComponent(path)}`);
      setUploads((u) => u.filter((i) => i.path !== path));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Stergere esuata.');
    }
  }

  const q = query.toLowerCase();
  const shownUploads = uploads.filter((i) => i.path.toLowerCase().includes(q));
  const shownAssets = assets.filter((i) => i.path.toLowerCase().includes(q));

  return (
    <div>
      <h1 className="mb-1 text-2xl font-black text-gray-900">Imagini</h1>
      <p className="mb-6 text-sm text-gray-500">
        Incarca poze noi (se salveaza in <span className="font-mono text-xs">public/uploads/</span>) si copiazu-le calea in formularele de produse sau carduri.
      </p>

      <div
        className="mb-6 rounded-2xl border-2 border-dashed border-gray-300 bg-white p-6 text-center transition hover:border-green-400"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onFiles(e.dataTransfer.files);
        }}
      >
        <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
        <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
          <LuUpload className="h-5 w-5" />
        </span>
        <p className="mb-3 text-sm text-gray-600">Trage fisiere aici sau alege-le din calculator (PNG, JPG, WEBP, SVG – max 10 MB)</p>
        <Btn onClick={() => fileRef.current?.click()} disabled={uploading}>
          {uploading ? 'Se incarca…' : 'Incarca imagini'}
        </Btn>
      </div>

      {error ? (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">{error}</p>
      ) : null}
      {notice ? (
        <p className="mb-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">{notice}</p>
      ) : null}

      <input
        className={inputClass + ' mb-6 max-w-md'}
        placeholder="Cauta in toate imaginile…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading ? (
        <Skeleton lines={6} />
      ) : (
        <div className="space-y-8">
          <section>
            <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-gray-900">
              Incarcate de tine <span className="ml-1 font-mono text-xs font-normal text-gray-400">/uploads/</span>
            </h2>
            {shownUploads.length === 0 ? (
              <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
                {uploads.length === 0 ? 'Nicio imagine incarcata inca.' : 'Niciun rezultat pentru filtre.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {shownUploads.map((img) => (
                  <PathRow key={img.path} img={img} onDelete={() => remove(img.path)} />
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-gray-900">
              Fisiere existente pe site <span className="ml-1 font-mono text-xs font-normal text-gray-400">/img/</span>
            </h2>
            <p className="mb-3 text-xs text-gray-500">Acestea sunt imaginile originale ale site-ului – le poti folosi in formulare, dar nu se pot sterge din panou.</p>
            <div className="grid max-h-[38rem] grid-cols-1 gap-2 overflow-y-auto pr-1 md:grid-cols-2">
              {shownAssets.map((img) => (
                <PathRow key={img.path} img={img} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { apiDelete, apiGet } from './api';
import { Btn, Modal, Skeleton, inputClass } from './ui';

type Img = { path: string; size: number };

export default function ImagePicker({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (path: string) => void;
}) {
  const [uploads, setUploads] = useState<Img[]>([]);
  const [assets, setAssets] = useState<Img[]>([]);
  const [tab, setTab] = useState<'uploads' | 'assets'>('uploads');
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const refresh = useCallback(() => {
    setLoading(true);
    apiGet<{ uploads: Img[]; assets: Img[] }>('/api/admin/images')
      .then((r) => {
        setUploads(r.uploads);
        setAssets(r.assets);
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (open) refresh();
  }, [open, refresh]);

  const list = (tab === 'uploads' ? uploads : assets).filter((i) =>
    i.path.toLowerCase().includes(query.toLowerCase())
  );

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError('');
    const form = new FormData();
    for (const f of Array.from(files)) form.append('files', f);
    try {
      const r = await fetch('/api/admin/images', { method: 'POST', body: form });
      const body = await r.json();
      if (!r.ok) throw new Error(body?.error || 'Upload esuat.');
      if (body.saved?.length) onSelect(body.saved[body.saved.length - 1].path);
      refresh();
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Upload esuat.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  async function remove(path: string, e: React.MouseEvent) {
    e.stopPropagation();
    if (!window.confirm(`Stergi imaginea ${path}?`)) return;
    await apiDelete(`/api/admin/images?path=${encodeURIComponent(path)}`).catch(() => undefined);
    setUploads((u) => u.filter((i) => i.path !== path));
  }

  function useUrl() {
    const v = url.trim();
    const ok = /^https?:\/\/[^\s]+$/i.test(v) || (/^\/[^/]/.test(v) && !v.startsWith('//'));
    if (!ok) {
      setUrlError('Scrie un link complet (https://...) sau o cale locala (/img/...).');
      return;
    }
    setUrlError('');
    onSelect(v);
    setUrl('');
  }

  return (
    <Modal open={open} onClose={onClose} title="Alege imagine" wide>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="flex overflow-hidden rounded-lg border border-gray-200 text-sm font-semibold">
          {(['uploads', 'assets'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3.5 py-1.5 transition ${tab === t ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              {t === 'uploads' ? 'Incarcate' : 'Fisiere site'}
            </button>
          ))}
        </div>
        <input
          className={inputClass + ' max-w-xs flex-1'}
          placeholder="Filtreaza dupa nume…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="ml-auto flex items-center gap-2">
          <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
          <Btn onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? 'Se incarca…' : 'Incarca'}
          </Btn>
        </div>
      </div>
      {uploadError ? <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">{uploadError}</p> : null}

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <input
          className={inputClass + ' min-w-0 flex-1 font-mono text-xs'}
          placeholder="sau lipeste un link https://... (imagine de pe alt site)"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setUrlError('');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              useUrl();
            }
          }}
        />
        <Btn kind="outline" onClick={useUrl}>
          Foloseste link
        </Btn>
      </div>
      {urlError ? <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">{urlError}</p> : null}
      <p className="mb-3 text-[11px] text-gray-500">
        Imaginea aleasa se aplica pe toate cele 3 limbi (RO / EN / RU).
      </p>

      {loading ? (
        <Skeleton lines={4} />
      ) : list.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-sm text-gray-500">
          {tab === 'uploads'
            ? 'Nicio imagine incarcata. Apasa „Incarca” pentru a adauga.'
            : 'Niciun fisier gasit.'}
        </div>
      ) : (
        <div className="grid max-h-[52vh] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3 md:grid-cols-4">
          {list.map((img) => (
            <button
              key={img.path}
              type="button"
              onClick={() => onSelect(img.path)}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 text-left transition hover:border-green-400 hover:shadow-md"
            >
              <span className="block h-24 w-full bg-gray-50">
                {/* plain img: admin picker needs no optimization */}
                <img src={img.path} alt="" className="h-24 w-full object-contain" loading="lazy" />
              </span>
              <span className="block truncate px-2 py-1.5 font-mono text-[10px] leading-tight text-gray-600 group-hover:text-green-700">
                {decodeURIComponent(img.path)}
              </span>
              {tab === 'uploads' ? (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => remove(img.path, e)}
                  onKeyDown={(e) => e.key === 'Enter' && remove(img.path, e as unknown as React.MouseEvent)}
                  className="absolute right-1.5 top-1.5 hidden rounded-md bg-white/90 px-1.5 py-0.5 text-[10px] font-bold text-red-600 shadow group-hover:block"
                >
                  sterge
                </span>
              ) : null}
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
}

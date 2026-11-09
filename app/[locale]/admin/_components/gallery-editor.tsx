'use client';

import { useState } from 'react';
import { apiPut } from './api';
import { Btn, StatusLine } from './ui';
import ImagePicker from './image-picker';
import { LuArrowDown, LuArrowUp, LuPlus, LuTrash2 } from 'react-icons/lu';

type Status = { kind: 'idle' | 'saving' | 'saved' | 'error'; msg?: string };

export default function GalleryEditor({
  data,
  onSave,
}: {
  data: { items: string[] };
  onSave: (next: { items: string[] }) => void;
}) {
  const [items, setItems] = useState<string[]>(data.items);
  const [picker, setPicker] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [dirty, setDirty] = useState(false);

  function mutate(next: string[]) {
    setItems(next);
    setDirty(true);
    setStatus({ kind: 'idle' });
  }

  function move(idx: number, dir: -1 | 1) {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[idx], next[j]] = [next[j], next[idx]];
    mutate(next);
  }

  async function save() {
    setStatus({ kind: 'saving' });
    try {
      await apiPut('/api/admin/content', { collection: 'gallery', data: { items } });
      onSave({ items });
      setDirty(false);
      setStatus({ kind: 'saved', msg: 'Salvat. Caruselul de pe homepage foloseste noile poze.' });
    } catch (e) {
      setStatus({ kind: 'error', msg: e instanceof Error ? e.message : 'Eroare la salvare.' });
    }
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Galerie implementari – homepage</h1>
          <p className="mt-1 text-sm text-gray-500">
            Caruselul „Implementari reale”. Adauga poze din sectiunea Imagini, incarca-le direct de aici sau lipi un link.
            Pozele sunt comune pentru toate cele 3 limbi.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Btn kind="outline" onClick={() => setPicker(true)}>
            <LuPlus className="h-4 w-4" /> Adauga poza
          </Btn>
          <Btn onClick={save} disabled={!dirty || status.kind === 'saving'}>
            {status.kind === 'saving' ? 'Se salveaza…' : 'Salveaza galeria'}
          </Btn>
          <StatusLine status={status} />
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
          Nicio imagine in galerie.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {items.map((src, idx) => (
            <div key={`${src}-${idx}`} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-2">
              <span className="w-6 shrink-0 text-center font-mono text-[10px] text-gray-400">{idx + 1}</span>
              <img src={src} alt="" className="h-12 w-16 shrink-0 rounded-md bg-gray-50 object-cover" loading="lazy" />
              <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-gray-600">{decodeURIComponent(src)}</span>
              <button onClick={() => move(idx, -1)} disabled={idx === 0} className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 disabled:opacity-30" title="Sus">
                <LuArrowUp className="h-4 w-4" />
              </button>
              <button onClick={() => move(idx, 1)} disabled={idx === items.length - 1} className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 disabled:opacity-30" title="Jos">
                <LuArrowDown className="h-4 w-4" />
              </button>
              <button onClick={() => mutate(items.filter((_, i) => i !== idx))} className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600" title="Scoateti din galerie">
                <LuTrash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <ImagePicker
        open={picker}
        onClose={() => setPicker(false)}
        onSelect={(p) => {
          if (!items.includes(p)) mutate([...items, p]);
          setPicker(false);
        }}
      />
    </div>
  );
}

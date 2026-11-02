'use client';

import { useMemo, useRef, useState } from 'react';
import { apiPut, delPath, getPath, setPath } from './api';
import type { MsgTree } from './api';
import { Btn, Field, Modal, StatusLine, TextArea, TextInput, inputClass } from './ui';
import type { Locale } from '../../../lib/content-types';
import {
  LuArrowDown, LuArrowUp, LuPlus, LuSearch, LuTrash2, LuTriangleAlert,
} from 'react-icons/lu';

type Row = {
  path: string[];
  kind: 'string' | 'lines' | 'raw';
  value: unknown;
};

const LOCALES: Locale[] = ['ro', 'en', 'ru'];

function walk(value: unknown, path: string[], rows: Row[]) {
  if (typeof value === 'string') {
    rows.push({ path, kind: 'string', value });
    return;
  }
  if (Array.isArray(value)) {
    if (value.every((v) => typeof v === 'string')) rows.push({ path, kind: 'lines', value: value as string[] });
    else rows.push({ path, kind: 'raw', value });
    return;
  }
  if (value !== null && typeof value === 'object') {
    const entries = Object.entries(value as MsgTree);
    if (entries.length === 0) {
      rows.push({ path, kind: 'raw', value });
      return;
    }
    for (const [k, v] of entries) walk(v, [...path, k], rows);
    return;
  }
  // number / boolean / null – edited as raw JSON
  rows.push({ path, kind: 'raw', value });
}

function rowsFor(tree: MsgTree): Row[] {
  const rows: Row[] = [];
  for (const [k, v] of Object.entries(tree)) walk(v, [k], rows);
  return rows;
}

function icuPlaceholders(value: string): string[] {
  return value.match(/\{[^{}]+\}/g) ?? [];
}

export default function TextEditor({
  initial,
  onSaved,
}: {
  initial: Record<Locale, MsgTree>;
  onSaved: (locale: Locale, tree: MsgTree) => void;
}) {
  const [locale, setLocale] = useState<Locale>('ro');
  const [tree, setTree] = useState<MsgTree>(initial.ro);
  const baseline = useRef<MsgTree>(initial.ro);
  const [section, setSection] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [addPath, setAddPath] = useState('');
  const [addValue, setAddValue] = useState('');
  const [status, setStatus] = useState<{ kind: 'idle' | 'saving' | 'saved' | 'error'; msg?: string }>({ kind: 'idle' });

  const allRows = useMemo(() => rowsFor(tree), [tree]);

  const sections = useMemo(() => {
    const map = new Map<string, { count: number; dirty: boolean }>();
    for (const r of allRows) {
      const s = r.path[0];
      const cur = map.get(s) ?? { count: 0, dirty: false };
      cur.count += 1;
      map.set(s, cur);
    }
    // section names present only in the baseline (e.g. fully emptied)
    for (const s of Object.keys(baseline.current)) if (!map.has(s)) map.set(s, { count: 0, dirty: true });
    for (const [s] of map) {
      const was = JSON.stringify(getPath(baseline.current, [s]));
      const now = JSON.stringify(getPath(tree, [s]));
      map.set(s, { ...map.get(s)!, dirty: was !== now });
    }
    return map;
  }, [allRows, tree]);

  const dirtySections = [...sections.entries()].filter(([, v]) => v.dirty).map(([k]) => k);
  const dirtyCount = dirtySections.length;

  function editRow(path: string[], value: unknown) {
    setTree((t) => setPath(t, path, value));
    setStatus({ kind: 'idle' });
  }

  function deleteRow(path: string[]) {
    if (!window.confirm(`Sterge cheia „${path.join('.')}”? Site-ul nu va mai gasi textul.`)) return;
    setTree((t) => delPath(t, path));
    setStatus({ kind: 'idle' });
  }

  function switchLocale(loc: Locale) {
    if (loc === locale) return;
    if (
      dirtyCount > 0 &&
      !window.confirm('Ai modificari nesalvate la aceasta limba. Treci mai departe si le pierzi?')
    )
      return;
    setLocale(loc);
    setTree(initial[loc]);
    baseline.current = initial[loc];
    setStatus({ kind: 'idle' });
    setSection(null);
    setQuery('');
  }

  async function save() {
    setStatus({ kind: 'saving' });
    try {
      await apiPut('/api/admin/messages', { locale, messages: tree });
      onSaved(locale, tree);
      baseline.current = tree;
      setStatus({ kind: 'saved', msg: 'Salvat. Textele noi apar pe site in cateva secunde.' });
    } catch (e) {
      setStatus({ kind: 'error', msg: e instanceof Error ? e.message : 'Eroare la salvare.' });
    }
  }

  function addKey() {
    const rel = addPath.trim().split('.').filter(Boolean);
    if (!section || rel.length === 0) return;
    editRow([section, ...rel], addValue);
    setAddOpen(false);
    setAddPath('');
    setAddValue('');
  }

  const q = query.trim().toLowerCase();
  const rows = q
    ? allRows.filter(
        (r) => r.path.join('.').toLowerCase().includes(q) || String(r.value ?? '').toLowerCase().includes(q)
      )
    : section
      ? allRows.filter((r) => r.path[0] === section)
      : allRows;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-black text-gray-900">Texte site</h1>
        <div className="flex overflow-hidden rounded-lg border border-gray-200 text-sm font-bold">
          {LOCALES.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`px-3.5 py-1.5 uppercase transition ${locale === l ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <StatusLine status={status} />
          {dirtyCount > 0 ? (
            <span className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
              {dirtyCount} sectiuni nesalvate
            </span>
          ) : null}
          <Btn onClick={save} disabled={status.kind === 'saving' || dirtyCount === 0}>
            {status.kind === 'saving' ? 'Se salveaza…' : 'Salveaza'}
          </Btn>
        </div>
      </div>

      <div className="mb-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">
        <LuTriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
        <p>
          Aici se editeaza <b>toate texturile</b> site-ului (meniuri, titluri, butoane, footer). Nu redenumi si nu sterge
          cheile existente daca nu stii ce faci &ndash; site-ul le cauta dupa nume. Variabilele de tip{' '}
          <code className="font-mono">{'{count}'}</code> sunt inlocuite automat in text; lasa-le exact asa cum sunt.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[220px_minmax(0,1fr)] items-start">
        {/* Sections rail */}
        <div className="space-y-1">
          <button
            onClick={() => {
              setSection(null);
              setQuery('');
            }}
            className={`w-full rounded-lg px-3 py-1.5 text-left text-xs font-bold transition ${
              !section && !q ? 'bg-green-600 text-white' : 'border border-gray-200 bg-white text-gray-600 hover:border-green-300'
            }`}
          >
            Toate ({allRows.length})
          </button>
          {[...sections.keys()].map((s) => (
            <button
              key={s}
              onClick={() => {
                setSection(s);
                setQuery('');
              }}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-xs font-bold transition ${
                section === s ? 'bg-green-600 text-white' : 'border border-gray-200 bg-white text-gray-600 hover:border-green-300'
              }`}
            >
              <span className="truncate">{s}</span>
              {sections.get(s)?.dirty ? (
                <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" title="Modificata, nesalvata" />
              ) : null}
            </button>
          ))}
        </div>

        {/* Rows */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <LuSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                className={inputClass + ' pl-9'}
                placeholder="Cauta in toate textele…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {section && !q ? (
              <Btn kind="outline" onClick={() => setAddOpen(true)}>
                <LuPlus className="h-4 w-4" /> Cheie noua
              </Btn>
            ) : null}
          </div>

          <div className="space-y-3">
            {rows.map((r) => {
              const dotty = r.path.join('.');
              if (r.kind === 'string') {
                const value = String(r.value);
                const ph = icuPlaceholders(value);
                const long = value.length > 70 || value.includes('\n');
                return (
                  <div key={dotty} className="rounded-xl border border-gray-200 bg-white p-3.5">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-gray-800">{r.path[r.path.length - 1]}</span>
                      <span className="truncate font-mono text-[10px] text-gray-400">{dotty}</span>
                      {ph.length > 0 ? (
                        <span className="ml-auto flex flex-wrap gap-1">
                          {ph.map((p, i) => (
                            <span key={i} className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] text-gray-600" title="Variabila automata – nu o modifica">
                              {p}
                            </span>
                          ))}
                        </span>
                      ) : null}
                      <button onClick={() => deleteRow(r.path)} className="rounded-md p-1 text-gray-300 hover:bg-red-50 hover:text-red-600" title="Sterge cheia">
                        <LuTrash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    {long ? (
                      <TextArea rows={Math.min(6, 2 + Math.floor(value.length / 90))} value={value} onChange={(v) => editRow(r.path, v)} />
                    ) : (
                      <TextInput value={value} onChange={(v) => editRow(r.path, v)} />
                    )}
                  </div>
                );
              }
              if (r.kind === 'lines') {
                const arr = r.value as string[];
                return (
                  <div key={dotty} className="rounded-xl border border-gray-200 bg-white p-3.5">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-gray-800">{r.path[r.path.length - 1]}</span>
                      <span className="truncate font-mono text-[10px] text-gray-400">{dotty}</span>
                      <button onClick={() => deleteRow(r.path)} className="ml-auto rounded-md p-1 text-gray-300 hover:bg-red-50 hover:text-red-600" title="Sterge cheia">
                        <LuTrash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {arr.map((line, li) => (
                        <div key={li} className="flex items-center gap-1.5">
                          <input
                            className={inputClass}
                            value={line}
                            onChange={(e) => editRow(r.path, arr.map((x, xi) => (xi === li ? e.target.value : x)))}
                          />
                          <button
                            onClick={() => {
                              const next = [...arr];
                              if (li > 0) [next[li - 1], next[li]] = [next[li], next[li - 1]];
                              editRow(r.path, next);
                            }}
                            disabled={li === 0}
                            className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 disabled:opacity-30"
                            title="Sus"
                          >
                            <LuArrowUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              const next = [...arr];
                              if (li < next.length - 1) [next[li], next[li + 1]] = [next[li + 1], next[li]];
                              editRow(r.path, next);
                            }}
                            disabled={li === arr.length - 1}
                            className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 disabled:opacity-30"
                            title="Jos"
                          >
                            <LuArrowDown className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => editRow(r.path, arr.filter((_, xi) => xi !== li))}
                            className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                            title="Sterge randul"
                          >
                            <LuTrash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                      <button onClick={() => editRow(r.path, [...arr, ''])} className="text-xs font-bold text-green-700 hover:text-green-600">
                        + linie noua
                      </button>
                    </div>
                  </div>
                );
              }
              const json = JSON.stringify(r.value, null, 2);
              return (
                <details key={dotty} className="rounded-xl border border-gray-200 bg-white p-3.5">
                  <summary className="flex cursor-pointer items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-gray-800">{r.path[r.path.length - 1]}</span>
                    <span className="truncate font-mono text-[10px] text-gray-400">{dotty}</span>
                    <span className="ml-auto rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] text-gray-500">JSON avansat</span>
                  </summary>
                  <textarea
                    className={inputClass + ' mt-3 font-mono text-[11px]'}
                    rows={6}
                    defaultValue={json}
                    onBlur={(e) => {
                      try {
                        editRow(r.path, JSON.parse(e.target.value));
                      } catch {
                        /* pastram ultima valoare valida */
                      }
                    }}
                  />
                </details>
              );
            })}

            {rows.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
                {q ? 'Niciun rezultat pentru cautare.' : 'Sectiune goala.'}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title={`Cheie noua in sectiunea „${section ?? ''}”`}>
        <div className="space-y-4">
          <Field label="Nume cheie" hint="Foloseste puncte pentru nivele: ex. newCard.title">
            <TextInput value={addPath} onChange={setAddPath} placeholder="ex. myTitle" />
          </Field>
          <Field label="Valoare (text)">
            <TextArea value={addValue} onChange={setAddValue} rows={3} />
          </Field>
          <div className="flex justify-end gap-2">
            <Btn kind="ghost" onClick={() => setAddOpen(false)}>
              Renunta
            </Btn>
            <Btn onClick={addKey} disabled={!addPath.trim()}>
              Adauga
            </Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

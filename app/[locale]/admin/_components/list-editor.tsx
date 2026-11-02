'use client';

import { useRef, useState } from 'react';
import ImageField from './image-field';
import {
  Btn, CheckGroup, Field, IconPicker, Select, StatusLine, TextArea, TextInput, Toggle, inputClass,
} from './ui';
import { getPath, setPath, slugify, uniqueSlug } from './api';
import type { MsgTree } from './api';
import type { CollectionName, Locale } from '../../../lib/content-types';
import { apiPut } from './api';
import {
  LuArrowDown, LuArrowUp, LuImage, LuPencil, LuPlus, LuTrash2, LuX,
} from 'react-icons/lu';

export type Opt = { value: string; label: string };

export type FieldDef = {
  id: string;
  label: string;
  kind: 'text' | 'textarea' | 'number' | 'toggle' | 'image' | 'icon' | 'select' | 'checks';
  hint?: string;
  options?: Opt[] | ((data: unknown) => Opt[]);
};

export type LocaleTextDef = {
  id: string;
  label: string;
  multiline?: boolean;
  path: (item: Record<string, unknown>) => string[];
};

export type LocaleArrayDef = {
  id: string;
  label: string;
  addLabel?: string;
  path: (item: Record<string, unknown>) => string[];
};

const LOCALES: Locale[] = ['ro', 'en', 'ru'];
const LOCALE_LABELS: Record<Locale, string> = { ro: 'Ro', en: 'En', ru: 'Ru' };

type Item = Record<string, unknown>;
type TextVals = Record<Locale, Record<string, string>>;
type ArrVals = Record<Locale, Record<string, string[]>>;
type Status = { kind: 'idle' | 'saving' | 'saved' | 'error'; msg?: string };

export default function ListEditor({
  collection,
  heading,
  help,
  data,
  setData,
  messages,
  setMessages,
  fields,
  localeTexts,
  localeArrays,
  describe,
  blank,
  prepare,
  headerExtra,
}: {
  collection: CollectionName;
  heading: string;
  help?: string;
  data: unknown;
  setData: (updater: (prev: unknown) => unknown) => void;
  messages: Record<Locale, MsgTree>;
  setMessages: (locale: Locale, tree: MsgTree) => void;
  fields: FieldDef[] | ((data: unknown) => FieldDef[]);
  localeTexts: (item: Item) => LocaleTextDef[];
  localeArrays?: (item: Item) => LocaleArrayDef[];
  describe: (item: Item) => string;
  blank: () => Item;
  prepare?: (draft: Item, items: Item[], texts: TextVals) => Item;
  headerExtra?: React.ReactNode;
}) {
  const items: Item[] = ((data as { items?: Item[] })?.items ?? []);
  const fieldDefs = typeof fields === 'function' ? fields(data) : fields;

  const [selected, setSelected] = useState<number | 'new' | null>(null);
  const [draft, setDraft] = useState<Item>(blank());
  const [texts, setTexts] = useState<TextVals>(emptyVals());
  const [arrays, setArrays] = useState<ArrVals>(emptyArrVals());
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const listScroll = useRef<HTMLDivElement>(null);

  function emptyVals(): TextVals {
    return { ro: {}, en: {}, ru: {} };
  }
  function emptyArrVals(): ArrVals {
    return { ro: {}, en: {}, ru: {} };
  }

  function openItem(idx: number | 'new') {
    if (idx === 'new') {
      const b = blank();
      setDraft(b);
      const t = emptyVals();
      const a = emptyArrVals();
      for (const def of localeTexts(b)) for (const loc of LOCALES) t[loc][def.id] = '';
      for (const def of localeArrays?.(b) ?? []) for (const loc of LOCALES) a[loc][def.id] = [];
      setTexts(t);
      setArrays(a);
    } else {
      const it = items[idx];
      setDraft(structuredClone(it));
      const t = emptyVals();
      const a = emptyArrVals();
      for (const def of localeTexts(it))
        for (const loc of LOCALES) {
          const v = getPath(messages[loc], def.path(it));
          t[loc][def.id] = typeof v === 'string' ? v : '';
        }
      for (const def of localeArrays?.(it) ?? [])
        for (const loc of LOCALES) {
          const v = getPath(messages[loc], def.path(it));
          a[loc][def.id] = Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
        }
      setTexts(t);
      setArrays(a);
    }
    setSelected(idx);
    setStatus({ kind: 'idle' });
  }

  function closeForm() {
    setSelected(null);
    setStatus({ kind: 'idle' });
  }

  async function save() {
    setStatus({ kind: 'saving' });
    try {
      let final: Item = structuredClone(draft);
      if (prepare) final = prepare(final, items, texts);

      const nextItems =
        selected === 'new' ? [...items, final] : items.map((it, i) => (i === selected ? final : it));
      const nextData = { ...(data as Record<string, unknown>), items: nextItems };

      const trees: Record<Locale, MsgTree> = { ro: messages.ro, en: messages.en, ru: messages.ru };
      for (const loc of LOCALES) {
        for (const def of localeTexts(final)) {
          const val = texts[loc][def.id] ?? '';
          const cur = getPath(trees[loc], def.path(final));
          if (typeof cur === 'string' || cur === undefined) {
            trees[loc] = setPath(trees[loc], def.path(final), val);
          }
        }
        for (const def of localeArrays?.(final) ?? []) {
          const cur = getPath(trees[loc], def.path(final));
          if (!Array.isArray(cur) || cur.every((x) => typeof x === 'string')) {
            trees[loc] = setPath(trees[loc], def.path(final), (arrays[loc][def.id] ?? []).map((s) => s));
          }
        }
      }

      await apiPut('/api/admin/content', { collection, data: nextData });
      for (const loc of LOCALES) {
        if (trees[loc] !== messages[loc]) await apiPut('/api/admin/messages', { locale: loc, messages: trees[loc] });
      }
      for (const loc of LOCALES) if (trees[loc] !== messages[loc]) setMessages(loc, trees[loc]);

      setData(() => nextData);
      if (selected === 'new') setSelected(nextItems.length - 1);
      setDraft(final);
      setStatus({ kind: 'saved' });
    } catch (e) {
      setStatus({ kind: 'error', msg: e instanceof Error ? e.message : 'Eroare la salvare.' });
    }
  }

  async function removeItem(idx: number) {
    const it = items[idx];
    if (!window.confirm(`Stergi elementul „${describe(it)}”? Textele asociate raman in mesajele site-ului.`)) return;
    const nextItems = items.filter((_, i) => i !== idx);
    const nextData = { ...(data as Record<string, unknown>), items: nextItems };
    setStatus({ kind: 'saving' });
    try {
      await apiPut('/api/admin/content', { collection, data: nextData });
      setData(() => nextData);
      if (selected === idx) closeForm();
      else if (typeof selected === 'number' && selected > idx) setSelected(selected - 1);
      setStatus({ kind: 'saved' });
    } catch (e) {
      setStatus({ kind: 'error', msg: e instanceof Error ? e.message : 'Eroare.' });
    }
  }

  async function move(idx: number, dir: -1 | 1) {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const nextItems = [...items];
    [nextItems[idx], nextItems[j]] = [nextItems[j], nextItems[idx]];
    const nextData = { ...(data as Record<string, unknown>), items: nextItems };
    setStatus({ kind: 'saving' });
    try {
      await apiPut('/api/admin/content', { collection, data: nextData });
      setData(() => nextData);
      if (selected === idx) setSelected(j);
      else if (selected === j) setSelected(idx);
      setStatus({ kind: 'idle' });
    } catch (e) {
      setStatus({ kind: 'error', msg: e instanceof Error ? e.message : 'Eroare.' });
    }
  }

  const editing = selected !== null;

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">{heading}</h1>
          {help ? <p className="mt-1 text-sm leading-relaxed text-gray-500">{help}</p> : null}
        </div>
        {!editing ? (
          <Btn onClick={() => openItem('new')}>
            <LuPlus className="h-4 w-4" /> Adauga element
          </Btn>
        ) : (
          <Btn kind="ghost" onClick={closeForm}>
            <LuX className="h-4 w-4" /> Inchide
          </Btn>
        )}
      </div>

      {headerExtra ? <div className="mb-5">{headerExtra}</div> : null}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] items-start">
        {/* List */}
        <div ref={listScroll} className="space-y-2">
          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
              Niciun element. Adauga primul cu butonul de mai sus.
            </div>
          ) : (
            items.map((it, idx) => (
              <div
                key={idx}
                className={`group flex items-center gap-2 rounded-xl border bg-white p-2.5 transition ${
                  selected === idx ? 'border-green-500 ring-1 ring-green-500/30' : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50 text-gray-500">
                  {typeof it.image === 'string' && it.image ? (
                    <img src={it.image} alt="" className="h-11 w-11 object-contain" loading="lazy" />
                  ) : (
                    <LuImage className="h-4 w-4" />
                  )}
                </span>
                <button className="min-w-0 flex-1 text-left" onClick={() => openItem(idx)}>
                  <p className="truncate text-sm font-bold text-gray-900">{describe(it) || '(fara nume)'}</p>
                  <p className="truncate font-mono text-[10px] text-gray-400">
                    {String(it.key ?? it.descKey ?? it.title ?? '')}
                  </p>
                </button>
                <div className="flex shrink-0 items-center gap-0.5">
                  <button onClick={() => move(idx, -1)} disabled={idx === 0} className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30" title="Sus">
                    <LuArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => move(idx, 1)} disabled={idx === items.length - 1} className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30" title="Jos">
                    <LuArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => openItem(idx)} className="rounded-md p-1.5 text-gray-400 hover:bg-green-50 hover:text-green-600" title="Editeaza">
                    <LuPencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => removeItem(idx)} className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600" title="Sterge">
                    <LuTrash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Form */}
        {editing ? (
          <div className="sticky top-20 space-y-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fieldDefs.map((f) => {
                const v = draft[f.id];
                const opts = typeof f.options === 'function' ? f.options(data) : f.options ?? [];
                if (f.kind === 'toggle')
                  return (
                    <Field key={f.id} label={f.label} hint={f.hint}>
                      <Toggle checked={Boolean(v)} onChange={(nv) => setDraft((d) => ({ ...d, [f.id]: nv }))} label={f.label} />
                    </Field>
                  );
                if (f.kind === 'number')
                  return (
                    <Field key={f.id} label={f.label} hint={f.hint}>
                      <input
                        type="number"
                        className={inputClass}
                        value={String(v ?? 0)}
                        onChange={(e) => setDraft((d) => ({ ...d, [f.id]: Number(e.target.value) }))}
                      />
                    </Field>
                  );
                if (f.kind === 'select')
                  return (
                    <Field key={f.id} label={f.label} hint={f.hint}>
                      <Select
                        value={String(v ?? '')}
                        onChange={(nv) => setDraft((d) => ({ ...d, [f.id]: nv }))}
                        options={opts}
                      />
                    </Field>
                  );
                if (f.kind === 'checks')
                  return (
                    <Field key={f.id} label={f.label} hint={f.hint}>
                      <CheckGroup
                        values={Array.isArray(v) ? (v as string[]) : []}
                        onChange={(nv) => setDraft((d) => ({ ...d, [f.id]: nv }))}
                        options={opts}
                      />
                    </Field>
                  );
                if (f.kind === 'image')
                  return (
                    <Field key={f.id} label={f.label} hint={f.hint}>
                      <ImageField value={String(v ?? '')} onChange={(nv) => setDraft((d) => ({ ...d, [f.id]: nv }))} />
                    </Field>
                  );
                if (f.kind === 'icon')
                  return (
                    <Field key={f.id} label={f.label} hint={f.hint}>
                      <IconPicker value={String(v ?? '')} onChange={(nv) => setDraft((d) => ({ ...d, [f.id]: nv }))} />
                    </Field>
                  );
                if (f.kind === 'textarea')
                  return (
                    <Field key={f.id} label={f.label} hint={f.hint}>
                      <TextArea value={String(v ?? '')} onChange={(nv) => setDraft((d) => ({ ...d, [f.id]: nv }))} />
                    </Field>
                  );
                return (
                  <Field key={f.id} label={f.label} hint={f.hint}>
                    <TextInput value={String(v ?? '')} onChange={(nv) => setDraft((d) => ({ ...d, [f.id]: nv }))} />
                  </Field>
                );
              })}
            </div>

            {/* Texts per locale */}
            <div className="space-y-4 border-t border-gray-100 pt-4">
              {localeTexts(draft).map((def) => (
                <Field key={def.id} label={def.label} hint="Textul afisat pe site, pe cele 3 limbi.">
                  <div className="space-y-2">
                    {LOCALES.map((loc) => (
                      <div key={loc} className="flex items-start gap-2">
                        <span className="mt-2 w-8 shrink-0 text-[10px] font-black uppercase text-gray-400">{LOCALE_LABELS[loc]}</span>
                        {def.multiline ? (
                          <TextArea
                            rows={2}
                            value={texts[loc][def.id] ?? ''}
                            onChange={(nv) => setTexts((t) => ({ ...t, [loc]: { ...t[loc], [def.id]: nv } }))}
                          />
                        ) : (
                          <div className="flex-1">
                            <TextInput
                              value={texts[loc][def.id] ?? ''}
                              onChange={(nv) => setTexts((t) => ({ ...t, [loc]: { ...t[loc], [def.id]: nv } }))}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Field>
              ))}

              {(localeArrays?.(draft) ?? []).map((def) => (
                <Field key={def.id} label={def.label}>
                  <div className="space-y-3">
                    {LOCALES.map((loc) => (
                      <div key={loc}>
                        <p className="mb-1 text-[10px] font-black uppercase text-gray-400">{LOCALE_LABELS[loc]}</p>
                        <div className="space-y-1.5">
                          {(arrays[loc][def.id] ?? []).map((line, li) => (
                            <div key={li} className="flex items-center gap-1.5">
                              <input
                                className={inputClass}
                                value={line}
                                onChange={(e) =>
                                  setArrays((a) => ({
                                    ...a,
                                    [loc]: {
                                      ...a[loc],
                                      [def.id]: (a[loc][def.id] ?? []).map((x, xi) => (xi === li ? e.target.value : x)),
                                    },
                                  }))
                                }
                              />
                              <button
                                onClick={() =>
                                  setArrays((a) => ({
                                    ...a,
                                    [loc]: { ...a[loc], [def.id]: (a[loc][def.id] ?? []).filter((_, xi) => xi !== li) },
                                  }))
                                }
                                className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                                title="Sterge randul"
                              >
                                <LuX className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() =>
                              setArrays((a) => ({
                                ...a,
                                [loc]: { ...a[loc], [def.id]: [...(a[loc][def.id] ?? []), ''] },
                              }))
                            }
                            className="text-xs font-bold text-green-700 hover:text-green-600"
                          >
                            + {def.addLabel ?? 'linie noua'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Field>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4">
              <Btn onClick={save} disabled={status.kind === 'saving'}>
                {status.kind === 'saving' ? 'Se salveaza…' : 'Salveaza'}
              </Btn>
              <Btn kind="ghost" onClick={closeForm}>
                Renunta
              </Btn>
              <StatusLine status={status} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// Helpers reused by page-level configs
export { slugify, uniqueSlug };
export type { MsgTree };

'use client';

import { useState } from 'react';
import ListEditor from '../../_components/list-editor';
import type { FieldDef } from '../../_components/list-editor';
import { apiPut, getPath, setPath, slugify } from '../../_components/api';
import { useAdminData } from '../../_components/use-store';
import { Btn, Field, IconPicker, Modal, Skeleton, StatusLine, TextInput, inputClass } from '../../_components/ui';
import type { ShopCategory, ShopData } from '../../../../lib/content-types';
import { Icon } from '../../../../lib/icon-registry';
import { LuPlus, LuTrash2 } from 'react-icons/lu';

const USAGE_OPTIONS = [
  { value: 'parking', label: 'Parcare' },
  { value: 'access', label: 'Acces' },
  { value: 'payment', label: 'Plata' },
];

function takenKeys(items: Record<string, unknown>[]): Set<string> {
  return new Set(items.map((i) => String(i.key ?? '')));
}

function CategoryManager({
  shop,
  messages,
  setCollection,
  setLocaleMessages,
}: {
  shop: ShopData;
  messages: Record<'ro' | 'en' | 'ru', Record<string, unknown>>;
  setCollection: (name: 'shop-products', data: unknown) => void;
  setLocaleMessages: (locale: 'ro' | 'en' | 'ru', tree: Record<string, unknown>) => void;
}) {
  const [open, setOpen] = useState(false);
  const [labelRo, setLabelRo] = useState('');
  const [labelEn, setLabelEn] = useState('');
  const [labelRu, setLabelRu] = useState('');
  const [icon, setIcon] = useState('LuBoxes');
  const [status, setStatus] = useState<{ kind: 'idle' | 'saving' | 'saved' | 'error'; msg?: string }>({ kind: 'idle' });

  async function persist(next: ShopData, catKey: string | null) {
    setStatus({ kind: 'saving' });
    try {
      await apiPut('/api/admin/content', { collection: 'shop-products', data: next });
      if (catKey) {
        for (const loc of ['ro', 'en', 'ru'] as const) {
          const val = { ro: labelRo, en: labelEn, ru: labelRu }[loc] || labelRo;
          const tree = setPath(messages[loc], ['ShopPage', 'categories', catKey], val);
          await apiPut('/api/admin/messages', { locale: loc, messages: tree });
          setLocaleMessages(loc, tree);
        }
      }
      setCollection('shop-products', next);
      setStatus({ kind: 'saved' });
      setOpen(false);
      setLabelRo('');
      setLabelEn('');
      setLabelRu('');
      setIcon('LuBoxes');
    } catch (e) {
      setStatus({ kind: 'error', msg: e instanceof Error ? e.message : 'Eroare.' });
    }
  }

  async function addCategory() {
    const base = slugify(labelRo || labelEn || labelRu || 'categorie');
    const taken = new Set(shop.categories.map((c) => c.key));
    let k = base;
    let n = 2;
    while (taken.has(k)) k = `${base}-${n++}`;
    const next: ShopData = { ...shop, categories: [...shop.categories, { key: k, icon }] };
    await persist(next, k);
  }

  async function removeCategory(key: string) {
    const inUse = shop.items.filter((p) => p.category === key).length;
    if (inUse > 0) {
      setStatus({ kind: 'error', msg: `Categoria are ${inUse} produse – muta-le intai in alta categorie.` });
      return;
    }
    if (!window.confirm(`Stergi categoria „${key}”?`)) return;
    const next: ShopData = { ...shop, categories: shop.categories.filter((c) => c.key !== key) };
    setStatus({ kind: 'saving' });
    try {
      await apiPut('/api/admin/content', { collection: 'shop-products', data: next });
      setCollection('shop-products', next);
      setStatus({ kind: 'saved' });
    } catch (e) {
      setStatus({ kind: 'error', msg: e instanceof Error ? e.message : 'Eroare.' });
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-600">Categorii din sidebar (magazin)</p>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {shop.categories.map((c: ShopCategory) => {
          const count = shop.items.filter((p) => p.category === c.key).length;
          const label = String(getPath(messages.ro, ['ShopPage', 'categories', c.key]) ?? c.key);
          return (
            <span key={c.key} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 py-1 pl-2.5 pr-1 text-xs font-semibold text-gray-700">
              <Icon name={c.icon} className="h-3.5 w-3.5 text-green-600" />
              {label}
              <span className="text-gray-400">({count})</span>
              <button onClick={() => removeCategory(c.key)} className="ml-0.5 rounded-full p-1 text-gray-400 hover:bg-red-50 hover:text-red-600" title="Sterge categoria">
                <LuTrash2 className="h-3 w-3" />
              </button>
            </span>
          );
        })}
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-1 rounded-full border border-dashed border-green-400 px-3 py-1 text-xs font-bold text-green-700 hover:bg-green-50">
          <LuPlus className="h-3 w-3" /> categorie noua
        </button>
      </div>
      <StatusLine status={status} />

      <Modal open={open} onClose={() => setOpen(false)} title="Categorie noua">
        <div className="space-y-4">
          <Field label="Nume in RO" hint="Ex: „Bariere si accesorii”. Folosit in filtrul din stanga paginii Magazin.">
            <TextInput value={labelRo} onChange={setLabelRo} />
          </Field>
          <Field label="Nume in EN">
            <TextInput value={labelEn} onChange={setLabelEn} />
          </Field>
          <Field label="Nume in RU">
            <TextInput value={labelRu} onChange={setLabelRu} />
          </Field>
          <Field label="Pictograma">
            <IconPicker value={icon} onChange={setIcon} />
          </Field>
          <div className="flex justify-end gap-2">
            <Btn kind="ghost" onClick={() => setOpen(false)}>
              Renunta
            </Btn>
            <Btn onClick={addCategory} disabled={!labelRo.trim() || status.kind === 'saving'}>
              {status.kind === 'saving' ? 'Se salveaza…' : 'Adauga'}
            </Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function WaField({
  shop,
  setCollection,
}: {
  shop: ShopData;
  setCollection: (name: 'shop-products', data: unknown) => void;
}) {
  const [value, setValue] = useState(shop.waNumber);
  const [status, setStatus] = useState<{ kind: 'idle' | 'saving' | 'saved' | 'error'; msg?: string }>({ kind: 'idle' });

  async function save() {
    setStatus({ kind: 'saving' });
    try {
      const next = { ...shop, waNumber: value.trim() || shop.waNumber };
      await apiPut('/api/admin/content', { collection: 'shop-products', data: next });
      setCollection('shop-products', next);
      setStatus({ kind: 'saved', msg: 'Salvat.' });
    } catch (e) {
      setStatus({ kind: 'error', msg: e instanceof Error ? e.message : 'Eroare.' });
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <Field label="Numar WhatsApp (cereri de oferta din Magazin)" hint="Format international, fara + (ex: 37369116121).">
        <div className="flex items-center gap-2">
          <input className={inputClass + ' font-mono'} value={value} onChange={(e) => setValue(e.target.value)} />
          <Btn onClick={save} disabled={status.kind === 'saving' || value.trim() === shop.waNumber}>
            Salveaza
          </Btn>
        </div>
      </Field>
      <div className="mt-2">
        <StatusLine status={status} />
      </div>
    </div>
  );
}

export default function AdminProductsPage() {
  const { store, error, setCollection, setLocaleMessages } = useAdminData();

  if (error) {
    return <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>;
  }
  if (!store) return <Skeleton lines={6} />;

  const shop = store.collections['shop-products'] as ShopData;

  const fields: (data: unknown) => FieldDef[] = (data) => {
    const s = data as ShopData;
    return [
      { id: 'key', label: 'Cheie produs (identificator)', kind: 'text', hint: 'Las-o libera la produse noi – se genereaza din nume.' },
      { id: 'category', label: 'Categorie', kind: 'select', options: s.categories.map((c) => ({ value: c.key, label: c.key })) },
      { id: 'type', label: 'Tip', kind: 'select', options: [{ value: 'hardware', label: 'Hardware' }, { value: 'software', label: 'Software' }] },
      { id: 'usage', label: 'Utilizare (filtre)', kind: 'checks', options: USAGE_OPTIONS },
      { id: 'price', label: 'Pret (EUR, fara TVA)', kind: 'number' },
      { id: 'inStock', label: 'In stoc', kind: 'toggle', hint: 'Oprit = „la comanda”.' },
      { id: 'image', label: 'Imagine produs', kind: 'image' },
      { id: 'contain', label: 'Incadreaza imaginea', kind: 'toggle', hint: 'Oprit = imaginea acopera tot cardul.' },
      { id: 'href', label: 'Link detalii', kind: 'text', hint: 'Ex: /products/pay-point. Lasat gol = butonul cere oferta pe WhatsApp.' },
      { id: 'icon', label: 'Pictograma', kind: 'icon', hint: 'Pictograma mica din filtre si liste.' },
    ];
  };

  return (
    <div>
      <ListEditor
        collection="shop-products"
        heading="Produse – pagina Magazin"
        help="Catalogul cu preturi, stoc si filtrare. Fiecare produs are nume si descriere in RO/EN/RU."
        data={shop}
        setData={(u) => setCollection('shop-products', u(shop))}
        messages={store.messages}
        setMessages={setLocaleMessages}
        describe={(i) => `${String(i.key ?? '')} · €${String(i.price ?? 0)}`}
        blank={() => ({
          key: '',
          category: (shop.categories[0]?.key as string) ?? 'accessories',
          type: 'hardware',
          usage: ['parking'],
          price: 0,
          inStock: true,
          image: '',
          contain: true,
          href: '',
          icon: 'LuBoxes',
        })}
        fields={fields}
        headerExtra={
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1fr_minmax(0,420px)]">
            <CategoryManager
              shop={shop}
              messages={store.messages}
              setCollection={setCollection}
              setLocaleMessages={setLocaleMessages}
            />
            <WaField shop={shop} setCollection={setCollection} />
          </div>
        }
        localeTexts={(i) => {
          const k = String(i.key ?? '');
          return [
            { id: 'name', label: 'Nume produs', path: () => ['ShopPage', 'products', k, 'name'] },
            { id: 'desc', label: 'Descriere produs', multiline: true, path: () => ['ShopPage', 'products', k, 'desc'] },
          ];
        }}
        prepare={(draft, items, texts) => {
          if (!draft.key) {
            const base = slugify(String(texts.ro.name || 'produs'));
            const taken = takenKeys(items);
            let k = base || 'produs';
            let n = 2;
            while (taken.has(k)) k = `${base}-${n++}`;
            draft.key = k;
          }
          if (draft.href === '') draft.href = null;
          if (typeof draft.href === 'string') draft.href = draft.href.trim() || null;
          draft.price = Math.max(0, Number(draft.price) || 0);
          return draft;
        }}
      />
    </div>
  );
}

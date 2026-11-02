'use client';

import { useState } from 'react';
import ListEditor from '../../_components/list-editor';
import { slugify } from '../../_components/api';
import { useAdminData } from '../../_components/use-store';
import { Skeleton } from '../../_components/ui';
import GalleryEditor from '../../_components/gallery-editor';

const TABS = [
  { id: 'ecosystem', label: 'Card home (Ecosistem)' },
  { id: 'catalog', label: 'Card pagina Produse' },
  { id: 'rti', label: 'Card RTI Systems' },
  { id: 'domains', label: 'Carduri Solutii' },
  { id: 'gallery', label: 'Galerie implementari' },
] as const;

type TabId = (typeof TABS)[number]['id'];

function takenDescKeys(items: Record<string, unknown>[]): Set<string> {
  return new Set(items.map((i) => String(i.descKey ?? '')));
}

function takenKeys(items: Record<string, unknown>[]): Set<string> {
  return new Set(items.map((i) => String(i.key ?? '')));
}

export default function AdminCardsPage() {
  const { store, error, setCollection, setLocaleMessages } = useAdminData();
  const [tab, setTab] = useState<TabId>('ecosystem');

  if (error) {
    return <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>;
  }
  if (!store) {
    return <Skeleton lines={6} />;
  }

  const eco = store.collections['ecosystem-cards'] as { items: Record<string, unknown>[] };
  const cat = store.collections['catalog-cards'] as { items: Record<string, unknown>[] };
  const rti = store.collections['rti-solutions'] as { items: Record<string, unknown>[] };
  const dom = store.collections['solutii-domains'] as { items: Record<string, unknown>[] };
  const gal = store.collections['gallery'] as { items: string[] };

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-1.5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-3.5 py-2 text-xs font-bold transition ${
              tab === t.id ? 'bg-green-600 text-white shadow-sm shadow-green-600/25' : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300 hover:text-green-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'ecosystem' ? (
        <ListEditor
          collection="ecosystem-cards"
          heading="Carduri ecosistem – pagina principala"
          help="Grila de 4 carduri „Ecosistemul de produse RParking” de pe homepage."
          data={eco}
          setData={(u) => setCollection('ecosystem-cards', u(eco))}
          messages={store.messages}
          setMessages={setLocaleMessages}
          describe={(i) => String(i.title ?? '')}
          blank={() => ({ title: '', descKey: '', link: '/products', image: '', isPhoto: true, cover: false })}
          fields={[
            { id: 'title', label: 'Titlu card', kind: 'text', hint: 'Acelasi text pe toate limbile (nume de produs).' },
            { id: 'descKey', label: 'Cheie descriere', kind: 'text', hint: 'Las-o libera la carduri noi – se genereaza singura.' },
            { id: 'link', label: 'Link (catre pagina produsului)', kind: 'text' },
            { id: 'image', label: 'Imagine', kind: 'image' },
            { id: 'isPhoto', label: 'Arata imaginea', kind: 'toggle', hint: 'Daca este oprita, cardul afiseaza ilustratia animata.' },
            { id: 'cover', label: 'Imagine pe toata cardul', kind: 'toggle', hint: 'Acoperire (crop) in loc de incadrare.' },
          ]}
          localeTexts={(i) => [
            {
              id: 'desc',
              label: 'Descriere card',
              multiline: true,
              path: (item) => ['ProductEcosystem', String(item.descKey || i.descKey || '')],
            },
          ]}
          prepare={(draft, items) => {
            if (!draft.descKey) {
              const base = `${slugify(String(draft.title || 'card'))}Desc`;
              const taken = takenDescKeys(items);
              let k = base;
              let n = 2;
              while (taken.has(k)) k = `${base}${n++}`;
              draft.descKey = k;
            }
            return draft;
          }}
        />
      ) : null}

      {tab === 'catalog' ? (
        <ListEditor
          collection="catalog-cards"
          heading="Carduri – pagina /products"
          help="Grila „Solutii complete pentru fiecare etapa” de pe pagina de produse."
          data={cat}
          setData={(u) => setCollection('catalog-cards', u(cat))}
          messages={store.messages}
          setMessages={setLocaleMessages}
          describe={(i) => String(i.title ?? '')}
          blank={() => ({ key: '', title: '', href: '/products', image: '', icon: 'LuBoxes' })}
          fields={[
            { id: 'title', label: 'Titlu card', kind: 'text' },
            { id: 'key', label: 'Cheie (pt. texte)', kind: 'text', hint: 'Se foloseste ca identificator in mesaje. Las-o libera la carduri noi.' },
            { id: 'href', label: 'Link', kind: 'text' },
            { id: 'image', label: 'Imagine', kind: 'image' },
            { id: 'icon', label: 'Pictograma', kind: 'icon' },
          ]}
          localeTexts={(i) => {
            const k = String(i.key ?? '');
            return [
              { id: 'subtitle', label: 'Subtitlu (randul mic de sus)', path: () => ['ProductsPage', 'items', k, 'subtitle'] },
              { id: 'desc', label: 'Descriere', multiline: true, path: () => ['ProductsPage', 'items', k, 'desc'] },
            ];
          }}
          localeArrays={(i) => {
            const k = String(i.key ?? '');
            return [{ id: 'features', label: 'Lista de puncte (bifuri)', path: () => ['ProductsPage', 'items', k, 'features'] }];
          }}
          prepare={(draft, items) => {
            if (!draft.key) {
              const base = slugify(String(draft.title || 'card'));
              const taken = takenKeys(items);
              let k = base;
              let n = 2;
              while (taken.has(k)) k = `${base}-${n++}`;
              draft.key = k;
            }
            return draft;
          }}
        />
      ) : null}

      {tab === 'rti' ? (
        <ListEditor
          collection="rti-solutions"
          heading="Carduri RTI Systems – homepage"
          help="sectiunea finala „RTI Systems” de pe pagina principala."
          data={rti}
          setData={(u) => setCollection('rti-solutions', u(rti))}
          messages={store.messages}
          setMessages={setLocaleMessages}
          describe={(i) => String(i.title ?? '')}
          blank={() => ({ title: '', descKey: '', image: '', href: '/products', imageWidth: 120, imageHeight: 80 })}
          fields={[
            { id: 'title', label: 'Titlu card', kind: 'text' },
            { id: 'descKey', label: 'Cheie descriere', kind: 'text', hint: 'Las-o libera la carduri noi.' },
            { id: 'href', label: 'Link', kind: 'text' },
            { id: 'image', label: 'Imagine', kind: 'image' },
            { id: 'imageWidth', label: 'Latime imagine (px)', kind: 'number' },
            { id: 'imageHeight', label: 'Inaltime imagine (px)', kind: 'number' },
          ]}
          localeTexts={(i) => [
            {
              id: 'desc',
              label: 'Descriere card',
              multiline: true,
              path: (item) => ['RtiSolutions', String(item.descKey || i.descKey || '')],
            },
          ]}
          prepare={(draft, items) => {
            if (!draft.descKey) {
              const base = slugify(String(draft.title || 'card'));
              const taken = takenDescKeys(items);
              let k = base;
              let n = 2;
              while (taken.has(k)) k = `${base}-${n++}`;
              draft.descKey = k;
            }
            return draft;
          }}
        />
      ) : null}

      {tab === 'domains' ? (
        <ListEditor
          collection="solutii-domains"
          heading="Carduri domenii – pagina /solutii"
          help="Grila „Domenii de aplicare” – residential, mall, corporate, aeroporturi, spitale, hoteluri."
          data={dom}
          setData={(u) => setCollection('solutii-domains', u(dom))}
          messages={store.messages}
          setMessages={setLocaleMessages}
          describe={(i) => String(i.key ?? '')}
          blank={() => ({ key: '', image: '', icon: 'LuBuilding' })}
          fields={[
            { id: 'key', label: 'Cheie (slug, ex: malls)', kind: 'text', hint: 'Identificator unic. Titlurile si listele se editeaza mai jos.' },
            { id: 'image', label: 'Imagine fundal', kind: 'image' },
            { id: 'icon', label: 'Pictograma badge', kind: 'icon' },
          ]}
          localeTexts={(i) => {
            const k = String(i.key ?? '');
            return [
              { id: 'title', label: 'Titlu domeniu', path: () => ['SolutiiPage', 'domains', k, 'title'] },
              { id: 'description', label: 'Descriere', multiline: true, path: () => ['SolutiiPage', 'domains', k, 'description'] },
            ];
          }}
          localeArrays={(i) => {
            const k = String(i.key ?? '');
            return [{ id: 'features', label: 'Puncte enumerate', path: () => ['SolutiiPage', 'domains', k, 'features'] }];
          }}
          prepare={(draft, items, texts) => {
            if (!draft.key) draft.key = slugify(String(texts.ro.title || draft.image || 'domeniu'));
            const taken = takenKeys(items);
            if (taken.has(String(draft.key))) {
              const base = String(draft.key);
              let n = 2;
              while (taken.has(`${base}-${n}`)) n++;
              draft.key = `${base}-${n}`;
            }
            return draft;
          }}
        />
      ) : null}

      {tab === 'gallery' ? (
        <GalleryEditor
          data={gal}
          onSave={(next) => {
            setCollection('gallery', next);
          }}
        />
      ) : null}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { apiGet } from '../_components/api';
import { Skeleton } from '../_components/ui';
import type { ShopData, EcosystemData, CatalogData, RtiData, SolDomainData, GalleryData } from '../../../lib/content-types';
import {
  LuTriangleAlert, LuImage, LuLayers, LuShoppingBag, LuType, LuArrowRight,
} from 'react-icons/lu';

type Content = {
  collections: {
    'shop-products': ShopData;
    'ecosystem-cards': EcosystemData;
    'catalog-cards': CatalogData;
    'rti-solutions': RtiData;
    'solutii-domains': SolDomainData;
    'gallery': GalleryData;
  };
};

const TILES = [
  { href: '/admin/products', label: 'Produse din magazin', icon: LuShoppingBag, count: (c: Content) => c.collections['shop-products'].items.length },
  { href: '/admin/cards', label: 'Carduri pe site', icon: LuLayers, count: (c: Content) =>
      c.collections['ecosystem-cards'].items.length +
      c.collections['catalog-cards'].items.length +
      c.collections['rti-solutions'].items.length +
      c.collections['solutii-domains'].items.length },
  { href: '/admin/cards', label: 'Poze in galerie', icon: LuImage, count: (c: Content) => c.collections['gallery'].items.length },
  { href: '/admin/text', label: 'Texte RO / EN / RU', icon: LuType, count: () => 3 },
];

export default function AdminDashboardPage() {
  const [content, setContent] = useState<Content | null>(null);
  const [usingDefault, setUsingDefault] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    apiGet<Content>('/api/admin/content').then(setContent).catch((e) => setError(String(e?.message || e)));
    apiGet<{ usingDefaultPassword: boolean }>('/api/admin/session')
      .then((r) => setUsingDefault(r.usingDefaultPassword))
      .catch(() => undefined);
  }, []);

  return (
    <div>
      <h1 className="mb-1 text-2xl font-black text-gray-900">Panou de continut</h1>
      <p className="mb-6 text-sm text-gray-500">
        Editeaza textele, imaginile, cardurile si produsele site-ului RParking. Modificarile apar public imediat dupa salvare.
      </p>

      {usingDefault ? (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4">
          <LuTriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div className="text-sm leading-relaxed text-amber-800">
            <p className="font-bold">Folosesti parola implicita de admin.</p>
            <p className="mt-0.5">
              Schimb-o in fisierul <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">.env.local</code>
              {' '}(cheia <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">ADMIN_PASSWORD</code>) si reporneste serverul.
            </p>
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>
      ) : null}

      {!content && !error ? (
        <Skeleton lines={4} />
      ) : content ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TILES.map((tile) => (
            <a
              key={tile.label}
              href={tile.href}
              className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-green-300 hover:shadow-lg hover:shadow-green-600/5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 transition group-hover:bg-green-600 group-hover:text-white">
                <tile.icon className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-gray-900">{tile.label}</p>
                <p className="text-xs text-gray-500">{tile.count(content)} elemente</p>
              </div>
              <LuArrowRight className="ml-auto h-4 w-4 shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-green-600" />
            </a>
          ))}
        </div>
      ) : null}

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-gray-900">Unde se salveaza continutul</h2>
        <ul className="space-y-1.5 text-sm leading-relaxed text-gray-600">
          <li>
            <span className="font-mono text-xs text-gray-800">data/content/*.json</span> — produse, carduri, galerie (structura: preturi, imagini, linkuri, pictograme)
          </li>
          <li>
            <span className="font-mono text-xs text-gray-800">messages/ro|en|ru.json</span> — toate textele site-ului, pe cele 3 limbi
          </li>
          <li>
            <span className="font-mono text-xs text-gray-800">public/uploads/</span> — imaginile incarcate din panou
          </li>
          <li>
            <span className="font-mono text-xs text-gray-800">data/backup/</span> — copii automate inainte de fiecare salvare
          </li>
        </ul>
        <p className="mt-3 text-xs leading-relaxed text-gray-500">
          La deploy pe server, pastreaza aceste foldere (nu le suprascrie cu versiunea din git) pentru a nu pierde editarile.
        </p>
      </section>
    </div>
  );
}

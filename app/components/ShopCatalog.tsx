'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
import {
  LuLogIn, LuLogOut, LuCreditCard, LuLayoutDashboard,
  LuShieldCheck, LuZap, LuList, LuArrowRight, LuRotateCcw,
  LuChevronDown, LuRadar,
} from 'react-icons/lu';
import { TbBarrierBlock } from 'react-icons/tb';
import { FaWhatsapp } from 'react-icons/fa';

type CategoryKey = 'entry' | 'exit' | 'pay' | 'backoffice' | 'wc' | 'rchange' | 'accessories';
type ProductType = 'hardware' | 'software';
type Usage = 'parking' | 'access' | 'payment';

type Product = {
  key: string;
  category: CategoryKey;
  type: ProductType;
  usage: Usage[];
  price: number;
  inStock: boolean;
  image: string;
  contain: boolean;
  href: string | null;
  icon: React.ReactNode;
};

const WA_NUMBER = '37369116121';
const PAGE_SIZE = 8;

const products: Product[] = [
  { key: 'entry', category: 'entry', type: 'hardware', usage: ['parking'], price: 2450, inStock: true, image: '/img/produs1.png', contain: true, href: '/products/entry-point', icon: <LuLogIn className="w-5 h-5" /> },
  { key: 'exit', category: 'exit', type: 'hardware', usage: ['parking'], price: 2750, inStock: true, image: '/img/produs2.png', contain: true, href: '/products/exit-point-cardpass', icon: <LuLogOut className="w-5 h-5" /> },
  { key: 'pay', category: 'pay', type: 'hardware', usage: ['parking', 'payment'], price: 3350, inStock: true, image: '/img/paypoint.png', contain: true, href: '/products/pay-point', icon: <LuCreditCard className="w-5 h-5" /> },
  { key: 'backoffice', category: 'backoffice', type: 'software', usage: ['parking'], price: 1250, inStock: true, image: '/img/produs 4.png', contain: true, href: '/products/backoffice', icon: <LuLayoutDashboard className="w-5 h-5" /> },
  { key: 'wc', category: 'wc', type: 'hardware', usage: ['access', 'payment'], price: 1150, inStock: true, image: '/img/wc.png', contain: true, href: '/products/raccess-wc', icon: <LuShieldCheck className="w-5 h-5" /> },
  { key: 'rchange', category: 'rchange', type: 'hardware', usage: ['payment'], price: 980, inStock: true, image: '/img/exchange.png', contain: true, href: '/products/rchange', icon: <LuZap className="w-5 h-5" /> },
  { key: 'barrier', category: 'accessories', type: 'hardware', usage: ['parking', 'access'], price: 980, inStock: false, image: '/img/implementari/bare automate.png', contain: false, href: null, icon: <TbBarrierBlock className="w-5 h-5" /> },
  { key: 'detector', category: 'accessories', type: 'hardware', usage: ['parking', 'access'], price: 120, inStock: false, image: '/img/photo_2026-05-27_13-07-42.jpg', contain: false, href: null, icon: <LuRadar className="w-5 h-5" /> },
];

const categories: { key: CategoryKey | 'all'; icon: React.ReactNode }[] = [
  { key: 'all', icon: <LuList className="w-4 h-4" /> },
  { key: 'entry', icon: <LuLogIn className="w-4 h-4" /> },
  { key: 'exit', icon: <LuLogOut className="w-4 h-4" /> },
  { key: 'pay', icon: <LuCreditCard className="w-4 h-4" /> },
  { key: 'backoffice', icon: <LuLayoutDashboard className="w-4 h-4" /> },
  { key: 'wc', icon: <LuShieldCheck className="w-4 h-4" /> },
  { key: 'rchange', icon: <LuZap className="w-4 h-4" /> },
  { key: 'accessories', icon: <TbBarrierBlock className="w-4 h-4" /> },
];

function formatPrice(value: number) {
  return `€${value.toLocaleString('en-US')}`;
}

export default function ShopCatalog() {
  const t = useTranslations('ShopPage');

  const [category, setCategory] = useState<CategoryKey | 'all'>('all');
  const [draftType, setDraftType] = useState<'all' | ProductType>('all');
  const [draftUsage, setDraftUsage] = useState<'all' | Usage>('all');
  const [draftStock, setDraftStock] = useState<{ inStock: boolean; onOrder: boolean }>({ inStock: false, onOrder: false });
  const [applied, setApplied] = useState({ type: 'all' as 'all' | ProductType, usage: 'all' as 'all' | Usage, stock: { inStock: false, onOrder: false } });
  const [sort, setSort] = useState<'popular' | 'asc' | 'desc'>('popular');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let list = products.filter((p) => (category === 'all' ? true : p.category === category));
    if (applied.type !== 'all') list = list.filter((p) => p.type === applied.type);
    if (applied.usage !== 'all') list = list.filter((p) => p.usage.includes(applied.usage as Usage));
    if (applied.stock.inStock || applied.stock.onOrder) {
      list = list.filter((p) => (p.inStock && applied.stock.inStock) || (!p.inStock && applied.stock.onOrder));
    }
    if (sort === 'asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'desc') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, applied, sort]);

  const shown = filtered.slice(0, visible);
  const inStockCount = products.filter((p) => p.inStock).length;
  const onOrderCount = products.length - inStockCount;

  const selectCategory = (c: CategoryKey | 'all') => {
    setCategory(c);
    setVisible(PAGE_SIZE);
  };

  const applyFilters = () => {
    setApplied({ type: draftType, usage: draftUsage, stock: draftStock });
    setVisible(PAGE_SIZE);
  };

  const resetFilters = () => {
    setDraftType('all');
    setDraftUsage('all');
    setDraftStock({ inStock: false, onOrder: false });
    setApplied({ type: 'all', usage: 'all', stock: { inStock: false, onOrder: false } });
    setCategory('all');
    setVisible(PAGE_SIZE);
  };

  const selectClass = 'w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500';

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">

          {/* ── Sidebar ── */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            {/* Categories */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="text-gray-900 font-bold text-sm mb-3 uppercase tracking-wide">{t('categoriesTitle')}</h3>
              <ul className="space-y-1">
                {categories.map((c) => {
                  const count = c.key === 'all' ? products.length : products.filter((p) => p.category === c.key).length;
                  const active = category === c.key;
                  return (
                    <li key={c.key}>
                      <button
                        onClick={() => selectCategory(c.key)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          active ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                        }`}
                      >
                        <span className={active ? 'text-green-600' : 'text-gray-400'}>{c.icon}</span>
                        <span className="flex-1 text-left">{t(`categories.${c.key}`)}</span>
                        <span className={`text-xs ${active ? 'text-green-600' : 'text-gray-400'}`}>{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="text-gray-900 font-bold text-sm mb-4 uppercase tracking-wide">{t('filtersTitle')}</h3>

              <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('filterType')}</label>
              <div className="relative mb-4">
                <select value={draftType} onChange={(e) => setDraftType(e.target.value as 'all' | ProductType)} className={selectClass}>
                  <option value="all">{t('filterAll')}</option>
                  <option value="hardware">{t('typeHardware')}</option>
                  <option value="software">{t('typeSoftware')}</option>
                </select>
                <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('filterUsage')}</label>
              <div className="relative mb-4">
                <select value={draftUsage} onChange={(e) => setDraftUsage(e.target.value as 'all' | Usage)} className={selectClass}>
                  <option value="all">{t('filterAll')}</option>
                  <option value="parking">{t('usageParking')}</option>
                  <option value="access">{t('usageAccess')}</option>
                  <option value="payment">{t('usagePayment')}</option>
                </select>
                <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              <p className="text-xs font-semibold text-gray-500 mb-2">{t('stockTitle')}</p>
              <div className="space-y-2 mb-5">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={draftStock.inStock}
                    onChange={(e) => setDraftStock((s) => ({ ...s, inStock: e.target.checked }))}
                    className="w-4 h-4 rounded border-gray-300 text-green-600 accent-green-600"
                  />
                  {t('inStock')} <span className="text-gray-400 text-xs">({inStockCount})</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={draftStock.onOrder}
                    onChange={(e) => setDraftStock((s) => ({ ...s, onOrder: e.target.checked }))}
                    className="w-4 h-4 rounded border-gray-300 text-green-600 accent-green-600"
                  />
                  {t('onOrder')} <span className="text-gray-400 text-xs">({onOrderCount})</span>
                </label>
              </div>

              <button
                onClick={applyFilters}
                className="w-full bg-green-600 hover:bg-green-500 text-white text-sm font-bold px-4 py-2.5 rounded-md transition-all duration-200 hover:shadow-md hover:shadow-green-600/30 active:scale-95"
              >
                {t('applyFilters')}
              </button>
              <button
                onClick={resetFilters}
                className="mt-3 w-full inline-flex items-center justify-center gap-1.5 text-gray-400 hover:text-green-600 text-xs font-medium transition-colors"
              >
                <LuRotateCcw className="w-3.5 h-3.5" />
                {t('resetFilters')}
              </button>
            </div>
          </aside>

          {/* ── Grid ── */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h2 className="text-gray-900 font-bold text-lg">
                {t('productsFound', { count: filtered.length })}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{t('sortLabel')}</span>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as 'popular' | 'asc' | 'desc')}
                    className="appearance-none rounded-md border border-gray-200 bg-white pl-3 pr-8 py-2 text-sm text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  >
                    <option value="popular">{t('sortPopular')}</option>
                    <option value="asc">{t('sortPriceAsc')}</option>
                    <option value="desc">{t('sortPriceDesc')}</option>
                  </select>
                  <LuChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {shown.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500 text-sm">
                {t('noResults')}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {shown.map((p) => (
                  <div
                    key={p.key}
                    className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-green-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="h-44 bg-gray-50 relative flex items-center justify-center overflow-hidden">
                      <Image
                        src={p.image}
                        alt={t(`products.${p.key}.name`)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        className={`${p.contain ? 'object-contain p-4' : 'object-cover'} transition-transform duration-500 group-hover:scale-105`}
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-4">
                      <h3 className="text-gray-900 font-extrabold text-base leading-snug mb-1">{t(`products.${p.key}.name`)}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed mb-3 flex-1">{t(`products.${p.key}.desc`)}</p>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold mb-2 ${p.inStock ? 'text-green-600' : 'text-amber-600'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-green-500' : 'bg-amber-500'}`} />
                        {p.inStock ? t('inStock') : t('onOrder')}
                      </span>
                      <p className="mb-4">
                        <span className="text-gray-900 font-black text-lg">{formatPrice(p.price)}</span>
                        <span className="text-gray-400 text-xs ml-1.5">{t('vatNote')}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-auto">
                        {p.href ? (
                          <Link
                            href={p.href}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 border border-green-600 text-green-700 hover:bg-green-600 hover:text-white text-xs font-bold px-3 py-2.5 rounded-md transition-all duration-200"
                          >
                            {t('viewDetails')}
                          </Link>
                        ) : (
                          <a
                            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t(`products.${p.key}.name`))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 border border-green-600 text-green-700 hover:bg-green-600 hover:text-white text-xs font-bold px-3 py-2.5 rounded-md transition-all duration-200"
                          >
                            {t('viewDetails')}
                          </a>
                        )}
                        <a
                          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t(`products.${p.key}.name`))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="WhatsApp"
                          className="shrink-0 inline-flex items-center justify-center w-10 h-10 border border-gray-200 hover:border-green-500 text-gray-500 hover:text-green-600 rounded-md transition-all duration-200"
                        >
                          <FaWhatsapp className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {visible < filtered.length && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 border border-green-600 text-green-700 hover:bg-green-600 hover:text-white text-sm font-bold px-8 py-3 rounded-md transition-all duration-200"
                >
                  {t('loadMore')}
                  <LuArrowRight className="w-4 h-4 rotate-90" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

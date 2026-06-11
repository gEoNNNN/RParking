import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '../../../i18n/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  LuArrowRight, LuCheck,
  LuLogIn, LuLogOut, LuCreditCard, LuLayoutDashboard,
  LuShieldCheck, LuSettings2, LuZap, LuPuzzle,
} from 'react-icons/lu';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Produse RParking – Sisteme automate de parcare',
  description:
    'Echipamente complete pentru automatizarea parcărilor: Entry Point, Exit Point, Pay Point, BackOffice, RAccess WC, RChange. Hardware și software dezvoltate în Moldova.',
  keywords: [
    'echipamente parcare',
    'sistem automatizare parcare',
    'terminal intrare parcare',
    'terminal ieșire parcare',
    'terminal plată parcare',
    'software management parcare',
    'bariere automate',
    'control acces parcare',
    'validator carduri',
    'validator bancnote',
    'schimb valutar automat',
    'RParking produse',
  ],
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Produse RParking – Echipamente complete pentru parcări',
    description:
      'Soluții hardware și software pentru automatizarea completă a parcărilor: control acces, plăți automate, monitorizare.',
    url: `${SITE_URL}/products`,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Produse RParking',
      },
    ],
  },
};

const products = [
  { key: 'entry', title: 'Entry Point', href: '/products/entry-point', image: '/img/produs1 - Copy.png', icon: <LuLogIn className="w-6 h-6 text-green-600" /> },
  { key: 'exit', title: 'Exit Point', href: '/products/exit-point-cardpass', image: '/img/produs2 - Copy.png', icon: <LuLogOut className="w-6 h-6 text-green-600" /> },
  { key: 'pay', title: 'Pay Point', href: '/products/pay-point', image: '/img/produs3 - Copy.png', icon: <LuCreditCard className="w-6 h-6 text-green-600" /> },
  { key: 'backoffice', title: 'BackOffice', href: '/products/backoffice', image: null, icon: <LuLayoutDashboard className="w-6 h-6 text-green-600" /> },
];

const whyUs = [
  { key: 'complete', icon: <LuShieldCheck className="w-6 h-6 text-green-600" /> },
  { key: 'integration', icon: <LuPuzzle className="w-6 h-6 text-green-600" /> },
  { key: 'support', icon: <LuSettings2 className="w-6 h-6 text-green-600" /> },
  { key: 'updates', icon: <LuZap className="w-6 h-6 text-green-600" /> },
  { key: 'reports', icon: <LuLayoutDashboard className="w-6 h-6 text-green-600" /> },
  { key: 'security', icon: <LuShieldCheck className="w-6 h-6 text-green-600" /> },
];

function BackOfficeIllustration() {
  return (
    <div className="w-full h-full bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[180px]">
        <div className="bg-slate-800 rounded-t-lg p-2 shadow-md">
          <div className="bg-white rounded p-2 space-y-1.5">
            <div className="flex items-center gap-1 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <div className="flex-1 h-1.5 bg-gray-100 rounded" />
            </div>
            <div className="grid grid-cols-3 gap-1">
              {['247', '4.8K', '82%'].map((v) => (
                <div key={v} className="bg-gray-50 rounded p-1 text-center">
                  <p className="text-[7px] font-bold text-green-700">{v}</p>
                </div>
              ))}
            </div>
            <div className="flex items-end gap-0.5 h-6 pt-1">
              {[40, 65, 50, 80, 60, 90, 70, 85].map((h, i) => (
                <div key={i} className="flex-1 bg-green-500 rounded-t-sm opacity-70" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
        <div className="bg-slate-700 h-1.5 rounded-b-sm" />
        <div className="bg-slate-600 h-1 rounded-b-md w-[90%] mx-auto" />
      </div>
    </div>
  );
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ProductsPage');
  return (
    <main>
      {/* Navbar + Logo */}
      <div className="relative">
        <Navbar />
        <Link href="/" className="absolute top-0 left-1/2 -translate-x-[38%] lg:left-20 lg:translate-x-0 z-50 h-20 flex items-center">
          <Image src="/img/logo.png" alt="RTi Parking Logo" width={210} height={80} priority className="object-contain" />
        </Link>

        {/* ── Hero ── */}
        <section className="relative w-full overflow-hidden bg-white min-h-[60vh] lg:min-h-0">
          {/* Mobile Background Image */}
          <div className="lg:hidden absolute inset-0">
            <Image src="/img/produse/produse.png" alt="" fill className="object-cover object-center opacity-20" quality={95} priority />
          </div>
          {/* Image full width from left - Desktop */}
          <div className="hidden lg:block overflow-hidden" style={{ maxHeight: '85vh' }}>
            <Image src="/img/produse/produse.png" alt="" width={1693} height={929} className="w-full h-auto block object-cover" style={{ objectPosition: 'center top' }} quality={95} priority />
          </div>
          {/* Desktop fog - compact over text area */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none" 
            style={{ 
              background: 'radial-gradient(ellipse 60% 110% at 5% 45%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 20%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.6) 60%, transparent 80%)'
            }} 
          />

          <div className="relative lg:absolute inset-0 z-10 flex flex-col justify-start pt-32 sm:pt-36 lg:pt-52 pb-12 px-6 lg:pl-24">
            <div className="max-w-xl">
              <h1 data-reveal data-reveal-delay="80" className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-5">
                {t('heroTitlePrefix')}<span className="text-green-600">RParking</span>
              </h1>
              <p data-reveal data-reveal-delay="250" className="text-gray-600 text-lg leading-relaxed max-w-xl mb-8">
                {t('description')}
              </p>

              <div data-reveal data-reveal-delay="340" className="grid grid-cols-3 gap-6 max-w-sm mb-8">
                {[
                  { label: t('hardware') },
                  { label: t('software') },
                  { label: t('support') },
                ].map((b) => (
                  <div key={b.label} className="flex flex-col items-center text-center gap-1.5">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                      <LuCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-700 text-xs font-semibold leading-tight">{b.label}</span>
                  </div>
                ))}
              </div>

              <div data-reveal data-reveal-delay="430" className="flex flex-wrap items-center gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-7 py-3.5 rounded-md transition-all duration-200 text-sm shadow-md shadow-green-600/25 hover:shadow-lg hover:shadow-green-600/40 hover:scale-105 active:scale-95"
                >
                  {t('ctaQuote')} <LuArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 border border-gray-400 hover:border-green-600 text-gray-800 hover:text-green-600 font-semibold px-7 py-3.5 rounded-md transition-all duration-200 text-sm bg-white/70 hover:bg-white hover:scale-105 active:scale-95"
                >
                  {t('ctaDetails')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Soluții complete pentru fiecare etapă ── */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade" className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {t('sectionTitle')}
            </h2>
            <p className="text-gray-500 text-base max-w-2xl mx-auto">
              {t('sectionSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {products.map((p, idx) => (
              <div
                key={p.title}
                data-reveal
                data-reveal-delay={String(idx * 80)}
                className="group flex flex-col border border-gray-200 hover:border-green-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl overflow-hidden transition-all duration-300 bg-white"
              >
                {/* Image area */}
                <div className="h-52 bg-gray-50 relative flex items-center justify-center overflow-hidden">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={280}
                      height={260}
                      className="object-contain h-48 w-auto transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <BackOfficeIllustration />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                      {p.icon}
                    </div>
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{t(`items.${p.key}.subtitle`)}</span>
                  </div>
                  <h3 className="text-gray-900 font-extrabold text-lg mb-1.5">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{t(`items.${p.key}.desc`)}</p>

                  <ul className="space-y-1.5 mb-5 flex-1">
                    {(t.raw(`items.${p.key}.features`) as string[]).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-gray-600 text-xs">
                        <LuCheck className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={p.href}
                    className="mt-auto inline-flex items-center gap-1.5 text-green-600 text-sm font-semibold hover:text-green-700 transition-colors group/link"
                  >
                    {t('viewDetails')}
                    <LuArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── De ce să alegi RParking? ── */}
      <section className="py-16" style={{ backgroundColor: '#f7f9f4' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {t('whyTitlePrefix')}<span className="text-green-600">RParking</span>{t('whyTitleSuffix')}
            </h2>
            <div className="w-12 h-0.5 bg-green-500 mx-auto" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {whyUs.map((w, idx) => (
              <div
                key={w.key}
                data-reveal
                data-reveal-delay={String(idx * 70)}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-green-300">
                  {w.icon}
                </div>
                <span className="text-gray-700 text-xs font-semibold leading-tight">{t(`why.${w.key}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/img/produse/produse.png" alt="" fill className="object-cover object-center" quality={90} />
        </div>
        <div className="absolute inset-0 bg-gray-950/75 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <h2 data-reveal className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            {t('bottomTitle1')}<br />{t('bottomTitle2')}
          </h2>
          <p data-reveal data-reveal-delay="100" className="text-gray-300 text-base mb-8 max-w-xl mx-auto">
            {t('bottomDesc')}
          </p>
          <div data-reveal data-reveal-delay="200" className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/37369116121" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-md transition-all duration-200 text-sm shadow-md shadow-green-600/30 hover:scale-105 active:scale-95"
            >
              {t('bottomDemo')} <LuArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/37369116121" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/40 hover:border-white text-white font-semibold px-8 py-4 rounded-md transition-all duration-200 text-sm bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95"
            >
              {t('ctaDetails')}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

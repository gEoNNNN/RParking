import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '../../../i18n/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ShopCatalog from '../../components/ShopCatalog';
import {
  LuShieldCheck, LuHeadphones, LuTruck, LuSettings2, LuBadgeCheck, LuArrowRight,
} from 'react-icons/lu';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Magazin RParking – Echipamente și Soluții pentru Parcări Moderne',
  description:
    'Cumpărați echipamente RParking pentru automatizarea parcărilor: Entry Point, Exit Point, Pay Point, BackOffice, RAccess WC, RChange, bariere automate și accesorii. Garanție 24 luni, livrare rapidă în Moldova.',
  keywords: [
    'magazin echipamente parcare Moldova',
    'cumpăr echipamente parcare Chișinău',
    'bariere automate de vânzare Moldova',
    'terminal plată parcare preț',
    'software parcare de vânzare',
    'accesorii parcare automatizată',
    'RParking magazin',
  ],
  alternates: { canonical: '/magazin' },
  openGraph: {
    title: 'Magazin RParking – Echipamente pentru parcări moderne',
    description: 'Echipamente certificate, garanție 24 luni, suport tehnic dedicat și livrare rapidă.',
    url: `${SITE_URL}/magazin`,
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'Magazin RParking' }],
  },
};

export default async function ShopPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ShopPage');

  const trust = [
    { key: 'certified', icon: <LuBadgeCheck className="w-5 h-5 text-green-600" /> },
    { key: 'warranty', icon: <LuShieldCheck className="w-5 h-5 text-green-600" /> },
    { key: 'support', icon: <LuHeadphones className="w-5 h-5 text-green-600" /> },
    { key: 'delivery', icon: <LuTruck className="w-5 h-5 text-green-600" /> },
    { key: 'custom', icon: <LuSettings2 className="w-5 h-5 text-green-600" /> },
  ];

  const benefits = [
    { key: 'delivery', icon: <LuTruck className="w-6 h-6 text-green-600" /> },
    { key: 'warranty', icon: <LuShieldCheck className="w-6 h-6 text-green-600" /> },
    { key: 'support', icon: <LuHeadphones className="w-6 h-6 text-green-600" /> },
    { key: 'custom', icon: <LuSettings2 className="w-6 h-6 text-green-600" /> },
  ];

  return (
    <main>
      {/* Navbar + Logo */}
      <div className="relative">
        <Navbar />
        <Link href="/" className="absolute top-0 left-1/2 -translate-x-[38%] lg:left-20 lg:translate-x-0 z-50 h-20 flex items-center">
          <Image src="/img/logo.png" alt="RTi Parking Logo" width={210} height={80} priority className="object-contain" />
        </Link>

        {/* ── Hero ── */}
        <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <Image src="/img/implementari/implementarebg.png" alt="" fill className="object-cover object-center" quality={95} priority />
          </div>
          {/* White fog - mobile full, desktop 75% */}
          <div className="lg:hidden absolute inset-0 bg-linear-to-r from-white via-white/95 to-white/70 pointer-events-none" />
          <div className="hidden lg:block absolute inset-0 bg-linear-to-r from-white via-white/90 to-transparent pointer-events-none" style={{ width: '75%' }} />

          <div className="relative z-10 w-full px-6 lg:px-10 py-28 pt-36">
            <div className="max-w-2xl">
              <h1 data-reveal data-reveal-delay="150" className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-4">
                {t('heroTitle')}<span className="text-green-600"> RParking</span>
              </h1>
              <p data-reveal data-reveal-delay="250" className="text-gray-600 text-lg leading-relaxed max-w-xl mb-8">
                {t('heroSubtitle')}
              </p>

              {/* CTA button */}
              <div data-reveal data-reveal-delay="340" className="flex flex-wrap items-center gap-4 mb-10">
                <a
                  href="https://wa.me/37369116121" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-7 py-3.5 rounded-md transition-all duration-200 text-sm shadow-md shadow-green-600/25 hover:shadow-lg hover:shadow-green-600/40 hover:scale-105 active:scale-95"
                >
                  {t('ctaButton')} <LuArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Hero badges */}
              <div data-reveal data-reveal-delay="430" className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl">
                {trust.slice(0, 4).map((b) => (
                  <div key={b.key} className="flex flex-col items-start gap-1.5">
                    <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      {b.icon}
                    </div>
                    <span className="text-gray-700 text-xs font-semibold leading-tight">{t(`trust.${b.key}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Catalog ── */}
      <ShopCatalog />

      {/* ── Benefits bar ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, idx) => (
              <div key={b.key} data-reveal data-reveal-delay={String(idx * 80)} className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-green-50 border border-gray-100 flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-110 hover:border-green-300">
                  {b.icon}
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-sm mb-1">{t(`benefits.${b.key}.title`)}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{t(`benefits.${b.key}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/img/produse/produse-footer.png" alt="" fill className="object-cover object-center" quality={90} />
        </div>
        <div className="absolute inset-0 bg-gray-950/70 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <h2 data-reveal className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            {t('ctaTitle')}
          </h2>
          <p data-reveal data-reveal-delay="100" className="text-gray-300 text-base mb-8 max-w-xl mx-auto">
            {t('ctaDesc')}
          </p>
          <div data-reveal data-reveal-delay="200">
            <a
              href="https://wa.me/37369116121" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-md transition-all duration-200 text-sm shadow-md shadow-green-600/30 hover:scale-105 active:scale-95"
            >
              {t('ctaButton')} <LuArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

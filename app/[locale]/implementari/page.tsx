import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '../../../i18n/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  LuLogIn, LuLogOut, LuCreditCard, LuLayoutDashboard, LuArrowRight, LuCheck,
  LuZap, LuActivity, LuFileText, LuTrendingUp, LuSettings2, LuChevronRight,
  LuQrCode, LuCloud, LuServer, LuCode, LuWifi, LuScanLine, LuHouse,
} from 'react-icons/lu';
import { TbBarrierBlock } from 'react-icons/tb';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Implementări RParking – Proiecte reale în Moldova',
  description:
    'Vezi proiectele reale implementate cu sistemul RParking: centre comerciale, business centre, parcări rezidențiale. Peste 1.000.000 de treceri zilnice.',
  keywords: [
    'implementari parcare',
    'implementare sistem parcare',
    'proiecte parcare Moldova',
    'sistem parcare Chișinău',
    'parcare automatizata reala',
    'proiect parcare centru comercial',
    'proiect parcare business',
    'exemplu parcare automatizata',
    'case study parcare',
    'echipament parcare instalat',
    'RParking implementări',
    'parcari automatizate Moldova',
  ],
  alternates: {
    canonical: '/implementari',
  },
  openGraph: {
    title: 'Implementări RParking – Proiecte reale în Moldova',
    description:
      'Vezi proiectele reale implementate cu sistemul RParking. Peste 1.000.000 de treceri zilnice.',
    url: `${SITE_URL}/implementari`,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Implementări RParking',
      },
    ],
  },
};

const heroBadges = [
  { key: 'badge1', icon: <LuZap className="w-5 h-5 text-green-600" /> },
  { key: 'badge2', icon: <LuCreditCard className="w-5 h-5 text-green-600" /> },
  { key: 'badge3', icon: <LuActivity className="w-5 h-5 text-green-600" /> },
  { key: 'badge4', icon: <LuFileText className="w-5 h-5 text-green-600" /> },
];

const challengeKeys = ['c1', 'c2', 'c3', 'c4', 'c5'];

const solutionProducts = [
  { label: 'Entry Point', icon: <LuLogIn className="w-6 h-6 text-green-600" /> },
  { label: 'Exit Point', icon: <LuLogOut className="w-6 h-6 text-green-600" /> },
  { label: 'Pay Point', icon: <LuCreditCard className="w-6 h-6 text-green-600" /> },
  { label: 'BackOffice', icon: <LuLayoutDashboard className="w-6 h-6 text-green-600" /> },
  { key: 'barriers', icon: <TbBarrierBlock className="w-6 h-6 text-green-600" /> },
];

const gallery = [
  { image: '/img/implementari/entry%20point.png', key: 'g1', span: false },
  { image: '/img/implementari/bare%20automate.png', key: 'g2', span: false },
  { image: '/img/implementari/exit%20point.png', key: 'g3', span: false },
  { image: '/img/implementari/flux%20intrare%20iesire.png', key: 'g4', span: false },
  { image: '/img/implementari/pay%20point.png', key: 'g5', span: true },
  { image: '/img/implementari/control%20acces.png', key: 'g6', span: false },
  { image: '/img/implementari/instalare%20profesionala.png', key: 'g7', span: false },
  { image: '/img/implementarea%2013.jpg', key: 'g8', span: false },
  { image: '/img/implementarea%2014.jpg', key: 'g9', span: false },
  { image: '/img/implementarea%2016.jpg', key: 'g10', span: false },
  { image: '/img/implementarea%2017.jpg', key: 'g11', span: false },
];

const usedProducts = [
  { image: '/img/implementari/RParking%20entry%20point.png', key: 'u1' },
  { image: '/img/implementari/rparking%20exit%20point.png', key: 'u2' },
  { image: '/img/implementari/rparking%20pay%20point.png', key: 'u3' },
  { image: '/img/back.jpg', key: 'u4' },
];

const benefits = [
  { key: 'b1', icon: <LuZap className="w-6 h-6 text-green-600" /> },
  { key: 'b2', icon: <LuSettings2 className="w-6 h-6 text-green-600" /> },
  { key: 'b3', icon: <LuActivity className="w-6 h-6 text-green-600" /> },
  { key: 'b4', icon: <LuFileText className="w-6 h-6 text-green-600" /> },
  { key: 'b5', icon: <LuCreditCard className="w-6 h-6 text-green-600" /> },
  { key: 'b6', icon: <LuTrendingUp className="w-6 h-6 text-green-600" /> },
];

const technologies = [
  { label: 'NFC Ready', icon: <LuWifi className="w-5 h-5 text-green-600" /> },
  { label: 'QR Code Ready', icon: <LuQrCode className="w-5 h-5 text-green-600" /> },
  { label: 'ANPR Ready', icon: <LuScanLine className="w-5 h-5 text-green-600" /> },
  { label: 'Cloud Ready', icon: <LuCloud className="w-5 h-5 text-green-600" /> },
  { label: 'BackOffice SaaS', icon: <LuServer className="w-5 h-5 text-green-600" /> },
  { label: 'REST API Integrations', icon: <LuCode className="w-5 h-5 text-green-600" /> },
];

export default async function ImplementariPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ImplementariPage');
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
                {t('heroTitlePrefix')}<span className="text-green-600">RParking</span>{t('heroTitleSuffix')}
              </h1>
              <p data-reveal data-reveal-delay="250" className="text-gray-600 text-lg leading-relaxed max-w-xl mb-8">
                {t('heroDesc')}
              </p>

              {/* CTA buttons */}
              <div data-reveal data-reveal-delay="340" className="flex flex-wrap items-center gap-4 mb-10 lg:ml-28">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-7 py-3.5 rounded-md transition-all duration-200 text-sm shadow-md shadow-green-600/25 hover:shadow-lg hover:shadow-green-600/40 hover:scale-105 active:scale-95"
                >
                  {t('ctaQuote')} <LuArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Hero badges */}
              <div data-reveal data-reveal-delay="430" className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl">
                {heroBadges.map((b) => (
                  <div key={b.key} className="flex flex-col items-start gap-1.5">
                    <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      {b.icon}
                    </div>
                    <span className="text-gray-700 text-xs font-semibold leading-tight">{t(`badges.${b.key}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Provocări + Soluție ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
            {/* Challenges */}
            <div data-reveal="fade-left" className="rounded-2xl border border-gray-100 shadow-sm p-8 bg-white h-full">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-6">
                <LuCheck className="w-5 h-5 text-green-600" /> {t('challengesTitle')}
              </h2>
              <ul className="space-y-4">
                {challengeKeys.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-gray-600 text-sm">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                      <LuCheck className="w-3 h-3 text-green-600" />
                    </span>
                    {t(`challenges.${c}`)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Arrow */}
            <div data-reveal="scale" className="hidden lg:flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <LuArrowRight className="w-6 h-6 text-green-600" />
              </div>
            </div>

            {/* Solution */}
            <div data-reveal="fade-right" className="rounded-2xl border border-gray-100 shadow-sm p-8 bg-white h-full">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                <LuZap className="w-5 h-5 text-green-600" /> {t('solutionTitle')}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {t('solutionDesc')}
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:grid sm:grid-cols-5">
                {solutionProducts.map((p) => (
                  <div key={p.label ?? p.key} className="flex flex-col items-center text-center gap-2 w-[calc(33%-0.5rem)] sm:w-auto">
                    <div className="w-12 h-12 rounded-xl border border-green-100 bg-green-50/50 flex items-center justify-center">
                      {p.icon}
                    </div>
                    <span className="text-gray-700 text-xs font-semibold leading-tight">{p.label ?? t('barriers')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Implementarea în imagini ── */}
      <section className="py-16" style={{ backgroundColor: '#f7f9f4' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div data-reveal="fade" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('galleryTitle')}</h2>
            <div className="w-10 h-0.5 bg-green-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.map((g, idx) => (
              <div key={g.key} data-reveal data-reveal-delay={String((idx % 4) * 100)} className={`group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white ${g.span ? 'lg:col-span-2' : ''}`}>
                <div className="relative h-44 overflow-hidden">
                  <Image src={g.image} alt={t(`gallery.${g.key}.title`)} fill quality={95} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="flex items-center gap-2 text-gray-900 font-bold text-sm mb-1">
                    <LuCheck className="w-4 h-4 text-green-600 shrink-0" /> {t(`gallery.${g.key}.title`)}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{t(`gallery.${g.key}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Produse utilizate ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div data-reveal="fade" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('usedTitle')}</h2>
            <div className="w-10 h-0.5 bg-green-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {usedProducts.map((p, idx) => (
              <div key={p.key} data-reveal data-reveal-delay={String((idx % 4) * 100)} className="group rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-white">
                <div className="h-52 bg-gray-50 relative flex items-center justify-center p-4">
                  <Image src={p.image} alt={t(`used.${p.key}.title`)} width={260} height={200} quality={95} className="object-contain h-full w-auto" />
                </div>
                <div className="p-5">
                  <h3 className="text-gray-900 font-bold text-base mb-1.5">{t(`used.${p.key}.title`)}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t(`used.${p.key}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Beneficii obținute ── */}
      <section className="py-16" style={{ backgroundColor: '#f7f9f4' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div data-reveal="fade" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('benefitsTitle')}</h2>
            <div className="w-10 h-0.5 bg-green-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, idx) => (
              <div key={b.key} data-reveal data-reveal-delay={String((idx % 3) * 100)} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                  {b.icon}
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-base mb-1">{t(`benefits.${b.key}.title`)}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{t(`benefits.${b.key}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tehnologii integrate ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div data-reveal="fade" className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('techTitle')}</h2>
            <div className="w-10 h-0.5 bg-green-500 mx-auto" />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-10 gap-y-5 w-fit mx-auto">
            {technologies.map((t) => (
              <div key={t.label} className="flex items-center gap-2">
                {t.icon}
                <span className="text-gray-700 text-sm font-semibold">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-12" style={{ backgroundColor: '#eaf2e3' }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div data-reveal="fade-left" className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
              <LuLayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {t('bottomTitlePrefix')}<span className="text-green-600">RParking</span>{t('bottomTitleSuffix')}
              </h2>
              <p className="text-gray-600 text-sm max-w-2xl">
                {t('bottomDesc')}
              </p>
            </div>
          </div>
          <a
            data-reveal="fade-right"
            href="https://wa.me/37369116121" target="_blank" rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-3.5 rounded-md transition-all duration-200 text-sm hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            {t('bottomButton')} <LuArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

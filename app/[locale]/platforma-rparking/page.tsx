import type { Metadata } from 'next';
import { Fragment } from 'react';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '../../../i18n/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  LuCheck, LuArrowRight, LuChevronRight, LuHouse,
  LuCpu, LuShieldCheck, LuServer, LuLayoutDashboard, LuTrendingUp,
  LuCloud, LuLock, LuPuzzle, LuSmartphone, LuSettings,
  LuActivity, LuFileText, LuUsers, LuBrainCircuit,
  LuCamera, LuScanLine, LuKeyRound, LuRadioTower,
} from 'react-icons/lu';
import { TbBarrierBlock } from 'react-icons/tb';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Platforma RParking – Arhitectură și tehnologii',
  description:
    'Arhitectura platformei RParking: modulară, scalabilă, securizată. Integrări ANPR, NFC, QR, API REST, cloud, monitorizare 24/7.',
  keywords: [
    'platforma parcare',
    'arhitectura sistem parcare',
    'tehnologii parcare',
    'integrare ANPR',
    'API parcare',
    'sistem cloud parcare',
    'monitorizare parcare',
    'RParking platforma',
  ],
  alternates: {
    canonical: '/platforma-rparking',
  },
  openGraph: {
    title: 'Platforma RParking – Arhitectură și tehnologii',
    description:
      'Arhitectura platformei RParking: modulară, scalabilă, securizată. Integrări ANPR, NFC, QR, API REST.',
    url: `${SITE_URL}/platforma-rparking`,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Platforma RParking',
      },
    ],
  },
};

const heroBadgeKeys = ['b1', 'b2', 'b3', 'b4'];

const steps = [
  { key: 's1', icon: <LuCpu className="w-8 h-8 text-green-600" /> },
  { key: 's2', icon: <LuLock className="w-8 h-8 text-green-600" /> },
  { key: 's3', icon: <LuServer className="w-8 h-8 text-green-600" /> },
  { key: 's4', icon: <LuLayoutDashboard className="w-8 h-8 text-green-600" /> },
  { key: 's5', icon: <LuTrendingUp className="w-8 h-8 text-green-600" /> },
];

const whyFeatures = [
  { key: 'w1', icon: <LuShieldCheck className="w-7 h-7 text-green-600" /> },
  { key: 'w2', icon: <LuCloud className="w-7 h-7 text-green-600" /> },
  { key: 'w3', icon: <LuLock className="w-7 h-7 text-green-600" /> },
  { key: 'w4', icon: <LuPuzzle className="w-7 h-7 text-green-600" /> },
  { key: 'w5', icon: <LuSmartphone className="w-7 h-7 text-green-600" /> },
  { key: 'w6', icon: <LuSettings className="w-7 h-7 text-green-600" /> },
];

const keyFeatures = [
  { key: 'k1', icon: <LuCloud className="w-6 h-6 text-green-600" /> },
  { key: 'k2', icon: <LuActivity className="w-6 h-6 text-green-600" /> },
  { key: 'k3', icon: <LuBrainCircuit className="w-6 h-6 text-green-600" /> },
  { key: 'k4', icon: <LuServer className="w-6 h-6 text-green-600" /> },
  { key: 'k5', icon: <LuFileText className="w-6 h-6 text-green-600" /> },
  { key: 'k6', icon: <LuUsers className="w-6 h-6 text-green-600" /> },
];

const integrations = [
  { key: 'i1', icon: <LuCamera className="w-7 h-7 text-green-600" /> },
  { key: 'i2', icon: <TbBarrierBlock className="w-7 h-7 text-green-600" /> },
  { key: 'i3', icon: <LuScanLine className="w-7 h-7 text-green-600" /> },
  { key: 'i4', icon: <LuKeyRound className="w-7 h-7 text-green-600" /> },
  { key: 'i5', icon: <LuCpu className="w-7 h-7 text-green-600" /> },
];

const connectivityKeys = ['c1', 'c2', 'c3', 'c4'];

export default async function PlatformaRParkingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('PlatformaRParkingPage');
  return (
    <main>
      {/* Navbar + Logo */}
      <div className="relative">
        <Navbar />
        <Link href="/" className="absolute top-0 left-1/2 -translate-x-[38%] lg:left-20 lg:translate-x-0 z-50 h-20 flex items-center">
          <Image src="/img/logo.png" alt="RTi Parking Logo" width={210} height={80} priority className="object-contain" />
        </Link>

        {/* ── Hero ── */}
        <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/img/platforma-rparking/hero.png" alt="" fill className="object-cover object-center" quality={95} priority />
          </div>
          {/* White fog - mobile full, desktop 75% */}
          <div className="lg:hidden absolute inset-0 bg-linear-to-r from-white via-white/95 to-white/70 pointer-events-none" />
          <div className="hidden lg:block absolute inset-0 bg-linear-to-r from-white via-white/90 to-transparent pointer-events-none" style={{ width: '75%' }} />

          <div className="relative z-10 w-full px-6 lg:px-10 py-28 pt-36">
            <div className="max-w-2xl">
              <p data-reveal data-reveal-delay="80" className="text-green-600 font-bold tracking-wide text-sm mb-4">
                {t('heroLabel')}
              </p>
              <h1 data-reveal data-reveal-delay="150" className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-5">
                {t.rich('heroTitle', { span: (chunks) => <span className="text-green-600">{chunks}</span> })}
              </h1>
              <p data-reveal data-reveal-delay="250" className="text-gray-600 text-lg leading-relaxed max-w-xl mb-8">
                {t('heroDesc')}
              </p>

              {/* CTA buttons */}
              <div data-reveal data-reveal-delay="340" className="flex flex-wrap items-center gap-4 mb-10">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-7 py-3.5 rounded-md transition-all duration-200 text-sm shadow-md shadow-green-600/30 hover:shadow-lg hover:shadow-green-600/50 hover:scale-105 active:scale-95"
                >
                  {t('ctaQuote')} <LuArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 border border-gray-400 hover:border-green-600 text-gray-800 hover:text-green-600 font-semibold px-7 py-3.5 rounded-md transition-all duration-200 text-sm bg-white/70 hover:bg-white hover:scale-105 active:scale-95"
                >
                  {t('ctaDemo')}
                </Link>
              </div>

              {/* Hero badges */}
              <div data-reveal data-reveal-delay="430" className="flex flex-wrap items-center gap-x-8 gap-y-3">
                {heroBadgeKeys.map((b) => (
                  <div key={b} className="flex items-center gap-2">
                    <LuCheck className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700 text-sm font-semibold">{t(`badges.${b}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Cum funcționează ── */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade" className="mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {t.rich('howTitle', { span: (chunks) => <span className="text-green-600">{chunks}</span> })}
            </h2>
            <div className="w-12 h-0.5 bg-green-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-start gap-y-10 gap-x-4">
            {steps.map((step, idx) => (
              <Fragment key={step.key}>
                <div className="flex flex-col items-center text-center gap-3 lg:flex-1">
                  <div className="w-24 h-24 rounded-full bg-green-50 border border-green-100 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-200/60 hover:border-green-400 cursor-pointer">
                    {step.icon}
                  </div>
                  <p className="text-gray-900 font-bold text-sm leading-tight">{t(`steps.${step.key}.title`)}</p>
                  <p className="text-gray-500 text-xs leading-relaxed max-w-44">{t(`steps.${step.key}.description`)}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex items-center pt-12">
                    <LuArrowRight className="w-6 h-6 text-green-500 shrink-0" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── De ce tehnologia ── */}
      <section className="py-16" style={{ backgroundColor: '#f7f9f4' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div data-reveal="fade" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {t.rich('whyTitle', { span: (chunks) => <span className="text-green-600">{chunks}</span> })}
            </h2>
            <div className="w-12 h-0.5 bg-green-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyFeatures.map((f, idx) => (
              <div key={f.key} data-reveal data-reveal-delay={String((idx % 3) * 100)} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-base mb-1.5">{t(`why.${f.key}.title`)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(`why.${f.key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tehnologie și funcționalități cheie ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div data-reveal="fade" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('techTitle')}</h2>
            <div className="w-12 h-0.5 bg-green-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {keyFeatures.map((f, idx) => (
              <div key={f.key} data-reveal data-reveal-delay={String((idx % 3) * 100)} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-base mb-1">{t(`key.${f.key}.title`)}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t(`key.${f.key}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Integrare și ecosistem deschis ── */}
      <section className="py-16" style={{ backgroundColor: '#f7f9f4' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div data-reveal="fade" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('integrationTitle')}</h2>
            <div className="w-12 h-0.5 bg-green-500" />
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: integration icons */}
            <div data-reveal="fade-left" className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {integrations.map((i) => (
                <div key={i.key} className="flex flex-col items-center text-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-green-300">
                    {i.icon}
                  </div>
                  <span className="text-gray-700 text-xs font-semibold leading-tight">{t(`integrations.${i.key}`)}</span>
                </div>
              ))}
            </div>

            {/* Right: connectivity dark card */}
            <div data-reveal="fade-right" className="relative rounded-2xl bg-gray-900 p-8 overflow-hidden">
              <h3 className="text-white font-bold text-xl mb-6">{t('connectivityTitle')}</h3>
              <ul className="space-y-4 relative z-10">
                {connectivityKeys.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-gray-200 text-sm">
                    <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                      <LuCheck className="w-3 h-3 text-green-400" />
                    </span>
                    {t(`connectivity.${c}`)}
                  </li>
                ))}
              </ul>
              {/* Decorative icon cluster */}
              <div className="absolute -right-6 -bottom-6 opacity-20">
                <LuRadioTower className="w-40 h-40 text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA (dark) ── */}
      <section className="relative py-16 bg-gray-950 overflow-hidden">
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-10">
          <LuServer className="w-64 h-64 text-green-400" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div data-reveal="fade-left">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
              {t.rich('bottomTitle', { span: (chunks) => <span className="text-green-500">{chunks}</span> })}
            </h2>
            <p className="text-gray-400 text-base max-w-xl">
              {t('bottomDesc')}
            </p>
          </div>
          <div data-reveal="fade-right" className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-3.5 rounded-md transition-all duration-200 text-sm shadow-md shadow-green-600/30 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              {t('ctaQuote')} <LuArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white font-semibold px-8 py-3.5 rounded-md transition-all duration-200 text-sm bg-white/5 hover:bg-white/10 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              {t('ctaDemo')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

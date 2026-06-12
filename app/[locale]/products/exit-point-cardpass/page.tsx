import type { Metadata } from 'next';
import { Fragment } from 'react';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '../../../../i18n/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import {
  LuCheck, LuArrowRight, LuChevronRight, LuHouse,
  LuQrCode, LuRadioTower, LuCreditCard, LuVolume2, LuMonitor, LuCar,
  LuCamera, LuServer, LuThermometer, LuZap, LuWifi, LuBox, LuPuzzle,
  LuLightbulb, LuWallet, LuShieldCheck, LuLayoutDashboard, LuBuilding2,
} from 'react-icons/lu';
import { TbBarrierBlock } from 'react-icons/tb';
import { FaParking } from 'react-icons/fa';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../../../lib/seo';

export const metadata: Metadata = {
  title: 'Exit Point CardPass – Stație de ieșire cu card | RParking',
  description:
    'Stație de ieșire cu validare carduri: verificare tichete, calcul tarife, integrare plăți, control automat acces.',
  keywords: [
    'stație ieșire parcare',
    'validare carduri parcare',
    'validator carduri',
    'calcul tarife parcare',
    'control acces ieșire',
    'RParking Exit Point',
    'sistem ieșire card',
  ],
  alternates: {
    canonical: '/products/exit-point-cardpass',
  },
  openGraph: {
    title: 'Exit Point CardPass – Stație de ieșire cu card',
    description:
      'Soluție pentru controlul ieșirii din parcări: validare carduri, calcul tarife, integrare plăți.',
    url: `${SITE_URL}/products/exit-point-cardpass`,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Exit Point CardPass RParking',
      },
    ],
  },
};

const heroFeatureKeys = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const keyFeatures = [
  { key: 'k1', icon: <LuCreditCard className="w-6 h-6 text-green-600" /> },
  { key: 'k2', icon: <LuRadioTower className="w-6 h-6 text-green-600" /> },
  { key: 'k3', icon: <LuQrCode className="w-6 h-6 text-green-600" /> },
  { key: 'k4', icon: <LuShieldCheck className="w-6 h-6 text-green-600" /> },
  { key: 'k5', icon: <LuMonitor className="w-6 h-6 text-green-600" /> },
  { key: 'k6', icon: <TbBarrierBlock className="w-6 h-6 text-green-600" /> },
];

const steps = [
  { key: 's1', icon: <LuCar className="w-16 h-16 text-green-600" /> },
  { key: 's2', icon: <LuCreditCard className="w-16 h-16 text-green-600" /> },
  { key: 's3', icon: <LuShieldCheck className="w-16 h-16 text-green-600" /> },
  { key: 's4', icon: <TbBarrierBlock className="w-16 h-16 text-green-600" /> },
  { key: 's5', icon: <FaParking className="w-14 h-14 text-green-600" /> },
];

const hardware = [
  { n: 1, key: 'hw1' },
  { n: 2, key: 'hw2' },
  { n: 3, key: 'hw3' },
  { n: 4, key: 'hw4' },
  { n: 5, key: 'hw5' },
  { n: 6, key: 'hw6' },
];

const callouts = [
  { n: 1, top: '15%', left: '46%' },
  { n: 2, top: '33%', left: '47%' },
  { n: 3, top: '40%', left: '47%' },
  { n: 4, top: '48%', left: '41%' },
  { n: 5, top: '47%', left: '58%' },
  { n: 6, top: '56%', left: '47%' },
];

const specs = [
  { key: 'sp1', icon: <LuMonitor className="w-4 h-4 text-gray-400" /> },
  { key: 'sp2', icon: <LuQrCode className="w-4 h-4 text-gray-400" /> },
  { key: 'sp3', icon: <LuRadioTower className="w-4 h-4 text-gray-400" /> },
  { key: 'sp4', icon: <LuCreditCard className="w-4 h-4 text-gray-400" /> },
  { key: 'sp5', icon: <LuVolume2 className="w-4 h-4 text-gray-400" /> },
  { key: 'sp6', icon: <LuLightbulb className="w-4 h-4 text-gray-400" /> },
  { key: 'sp7', icon: <LuWifi className="w-4 h-4 text-gray-400" /> },
  { key: 'sp8', icon: <LuServer className="w-4 h-4 text-gray-400" /> },
  { key: 'sp9', icon: <LuThermometer className="w-4 h-4 text-gray-400" /> },
  { key: 'sp10', icon: <LuZap className="w-4 h-4 text-gray-400" /> },
  { key: 'sp11', icon: <LuBox className="w-4 h-4 text-gray-400" /> },
  { key: 'sp12', icon: <LuPuzzle className="w-4 h-4 text-gray-400" /> },
];

const integrations = [
  { key: 'i1', icon: <LuCreditCard className="w-7 h-7 text-green-600" /> },
  { key: 'i2', icon: <LuRadioTower className="w-7 h-7 text-green-600" /> },
  { key: 'i3', icon: <LuQrCode className="w-7 h-7 text-green-600" /> },
  { key: 'i4', icon: <LuCamera className="w-7 h-7 text-green-600" /> },
  { key: 'i5', icon: <TbBarrierBlock className="w-7 h-7 text-green-600" /> },
  { key: 'i6', icon: <LuWallet className="w-7 h-7 text-green-600" /> },
  { key: 'i7', icon: <LuLayoutDashboard className="w-7 h-7 text-green-600" /> },
  { key: 'i8', icon: <LuBuilding2 className="w-7 h-7 text-green-600" /> },
];

const ecosystem = [
  { key: 'e1', href: '/products/entry-point', image: '/img/produs1 - Copy.png', icon: null },
  { key: 'e2', href: '/products/pay-point', image: '/img/produs3 - Copy.png', icon: null },
  { key: 'e3', href: '/products/backoffice', image: null, icon: <LuLayoutDashboard className="w-10 h-10 text-green-600" /> },
];

export default async function ExitPointCardPassPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ExitPointCardPassPage');
  return (
    <main>
      {/* Navbar + Logo */}
      <div className="relative">
        <Navbar />
        <Link href="/" className="absolute top-0 left-1/2 -translate-x-[38%] lg:left-20 lg:translate-x-0 z-50 h-20 flex items-center">
          <Image src="/img/logo.png" alt="RTi Parking Logo" width={210} height={80} priority className="object-contain" />
        </Link>

        {/* ── Hero ── */}
        <section className="relative w-full overflow-hidden bg-white">
          {/* Desktop: Image full width from left */}
          <div className="hidden lg:block overflow-hidden" style={{ maxHeight: '85vh' }}>
            <Image src="/img/produse/entrybg.png" alt="" width={1627} height={967} className="w-full h-auto block object-cover" style={{ objectPosition: 'center top' }} quality={95} priority />
          </div>
          {/* Desktop fog - compact over text area */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none" 
            style={{ 
              background: 'radial-gradient(ellipse 60% 110% at 5% 45%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 20%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.6) 60%, transparent 80%)'
            }} 
          />

          {/* Mobile image */}
          <div className="lg:hidden absolute inset-0 overflow-hidden" style={{ maxHeight: '85vh' }}>
            <Image src="/img/produse/entrybg.png" alt="" fill className="object-cover" style={{ objectPosition: 'center top' }} quality={95} priority />
          </div>
          {/* Mobile fog */}
          <div className="lg:hidden absolute inset-0 bg-linear-to-r from-white via-white/95 via-40% via-white/85 via-65% to-white/50 pointer-events-none" />

          {/* Content */}
          <div className="relative lg:absolute lg:inset-0 z-10 flex flex-col justify-start pt-36 lg:pt-52 pb-12 px-6 lg:pl-24 min-h-[500px] lg:min-h-0">
            <div className="max-w-xl">
              <h1 data-reveal data-reveal-delay="80" className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-5">
                {t.rich('heroTitle', { span: (chunks) => <span className="text-green-600">{chunks}</span> })}
              </h1>
              <p data-reveal data-reveal-delay="250" className="text-gray-600 text-lg leading-relaxed max-w-xl mb-8">
                {t('heroDesc')}
              </p>

              {/* Feature checkmarks */}
              <div data-reveal data-reveal-delay="340" className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8 max-w-lg">
                {heroFeatureKeys.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <LuCheck className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700 text-sm font-semibold">{t(`heroFeatures.${f}`)}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
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
                  {t('ctaDemo')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Funcționalități cheie ── */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('keyFeaturesTitle')}</h2>
            <div className="w-12 h-0.5 bg-green-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            {keyFeatures.map((f, idx) => (
              <div
                key={f.key}
                data-reveal
                data-reveal-delay={String((idx % 6) * 80)}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-5"
              >
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-base leading-tight mb-1.5">
                  {t(`key.${f.key}.title`)} <span className="block text-green-600">{t(`key.${f.key}.accent`)}</span>
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(`key.${f.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cum funcționează? ── */}
      <section className="py-16" style={{ backgroundColor: '#f7f9f4' }}>
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade" className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('howTitle')}</h2>
            <div className="w-12 h-0.5 bg-green-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-start gap-y-10 gap-x-4">
            {steps.map((step, idx) => (
              <Fragment key={step.key}>
                <div className="flex flex-col items-center text-center gap-3 lg:flex-1">
                  <div className="w-32 h-32 rounded-full bg-green-50 border border-green-100 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-200/60 hover:border-green-400 cursor-pointer">
                    {step.icon}
                  </div>
                  <p className="text-gray-900 font-bold text-sm leading-tight">{t(`steps.${step.key}.title`)}</p>
                  <p className="text-gray-500 text-xs leading-relaxed max-w-44">{t(`steps.${step.key}.desc`)}</p>
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

      {/* ── Componente hardware ── */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('hardwareTitle')}</h2>
            <div className="w-12 h-0.5 bg-green-500" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Left: technical diagram with labels */}
            <div data-reveal="fade-left" className="bg-white rounded-2xl p-4 flex items-center justify-center border border-gray-100">
              <Image src="/img/produse/exit point.jpg" alt="Exit Point CardPass componente" width={600} height={800} className="w-full lg:w-auto lg:h-[480px] max-h-[70vw] lg:max-h-none object-contain" />
            </div>

            {/* Right: component descriptions */}
            <div data-reveal="fade-right" className="flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{t('hardwareSubtitle')}</h3>
              <div className="space-y-4">
                {hardware.map((h) => (
                  <div key={h.key} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center shrink-0">{h.n}</div>
                    <div>
                      <p className="text-gray-900 font-semibold">{t(`hardware.${h.key}.title`)}</p>
                      <p className="text-gray-500 text-sm">{t(`hardware.${h.key}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Specificații tehnice + Integrare și compatibilitate ── */}
      <section className="py-16" style={{ backgroundColor: '#f7f9f4' }}>
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Specs */}
            <div data-reveal="fade-left">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('specsTitle')}</h2>
                <div className="w-12 h-0.5 bg-green-500" />
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 grid sm:grid-cols-2 gap-x-8">
                {specs.map((s) => (
                  <div key={s.key} className="flex items-center justify-between gap-3 py-2.5 border-b border-gray-100">
                    <span className="flex items-center gap-2 text-gray-500 text-sm">
                      {s.icon}
                      {t(`specs.${s.key}.label`)}
                    </span>
                    <span className="text-gray-900 font-semibold text-sm text-right">{t(`specs.${s.key}.value`)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Integrations */}
            <div data-reveal="fade-right">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('integrationTitle')}</h2>
                <div className="w-12 h-0.5 bg-green-500" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10">
                {integrations.map((i) => (
                  <div key={i.key} className="flex flex-col items-center text-center gap-2">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-green-300">
                      {i.icon}
                    </div>
                    <span className="text-gray-700 text-xs font-semibold leading-tight">{t(`integrations.${i.key}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Compatibil cu ecosistemul RParking ── */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {t.rich('ecosystemTitle', { span: (chunks) => <span className="text-green-600">{chunks}</span> })}
            </h2>
            <div className="w-12 h-0.5 bg-green-500 mx-auto" />
          </div>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            {ecosystem.map((e, idx) => (
              <Fragment key={e.key}>
                <Link
                  href={e.href}
                  data-reveal
                  data-reveal-delay={String(idx * 100)}
                  className="flex-1 flex items-center gap-4 bg-white rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-300 p-5"
                >
                  <div className="relative w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                    {e.image ? (
                      <Image src={e.image} alt={t(`ecosystem.${e.key}.title`)} width={70} height={70} className="object-contain h-16 w-auto" />
                    ) : (
                      e.icon
                    )}
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold text-base mb-1">{t(`ecosystem.${e.key}.title`)}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{t(`ecosystem.${e.key}.desc`)}</p>
                  </div>
                </Link>
                {idx < ecosystem.length - 1 && (
                  <div className="hidden lg:flex items-center text-green-500">
                    <LuChevronRight className="w-5 h-5" />
                    <LuChevronRight className="w-5 h-5 -ml-3" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA (dark) ── */}
      <section className="relative py-20 bg-gray-950 overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block">
          <Image src="/img/produse/entrybg.png" alt="" fill className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-linear-to-r from-gray-950 via-gray-950/70 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade-left" className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
              {t.rich('bottomTitle', { span: (chunks) => <span className="text-green-500">{chunks}</span> })}
            </h2>
            <p className="text-gray-400 text-base mb-8">
              {t('bottomDesc')}
            </p>
            <div className="flex flex-wrap items-center gap-4">
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
        </div>
      </section>

      <Footer />
    </main>
  );
}

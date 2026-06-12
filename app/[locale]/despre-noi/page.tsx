import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '../../../i18n/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RealImplementations from '../../components/RealImplementations';
import {
  LuArrowRight, LuCheck, LuChevronRight, LuHouse,
  LuMapPin, LuCode, LuMonitor, LuHeadphones, LuPuzzle,
  LuZap, LuShieldCheck, LuTrendingUp, LuUsers, LuHandshake,
  LuLogIn, LuLogOut, LuCreditCard, LuLayoutDashboard,
  LuWrench, LuSettings, LuGraduationCap,
} from 'react-icons/lu';
import { TbBarrierBlock } from 'react-icons/tb';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Despre noi – RTi Systems | Producător RParking Moldova',
  description:
    'RTi Systems dezvoltă și produce sisteme inteligente de parcare în Republica Moldova. Hardware și software propriu, echipă experimentată, suport tehnic complet.',
  keywords: [
    'RTi Systems',
    'producator parcare Moldova',
    'despre RParking',
    'companie parcare',
    'echipament parcare Moldova',
    'software parcare autohton',
    'RTi Systems Chișinău',
  ],
  alternates: {
    canonical: '/despre-noi',
  },
  openGraph: {
    title: 'Despre noi – RTi Systems | Producător RParking Moldova',
    description:
      'RTi Systems dezvoltă și produce sisteme inteligente de parcare în Republica Moldova.',
    url: `${SITE_URL}/despre-noi`,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Despre noi RTi Systems',
      },
    ],
  },
};

const heroBadges = [
  { key: 'badge1', icon: <LuMapPin className="w-5 h-5 text-green-600" /> },
  { key: 'badge2', icon: <LuCode className="w-5 h-5 text-green-600" /> },
  { key: 'badge3', icon: <LuMonitor className="w-5 h-5 text-green-600" /> },
];

const aboutPointKeys = ['p1', 'p2', 'p3', 'p4', 'p5'];

const hardware = [
  { key: 'hw1', icon: <LuLogIn className="w-4 h-4 text-green-600" /> },
  { key: 'hw2', icon: <LuLogOut className="w-4 h-4 text-green-600" /> },
  { key: 'hw3', icon: <LuCreditCard className="w-4 h-4 text-green-600" /> },
  { key: 'hw4', icon: <TbBarrierBlock className="w-4 h-4 text-green-600" /> },
  { key: 'hw5', icon: <LuLayoutDashboard className="w-4 h-4 text-green-600" /> },
];

const software = [
  { key: 'sw1', icon: <LuLayoutDashboard className="w-4 h-4 text-green-600" /> },
  { key: 'sw2', icon: <LuMonitor className="w-4 h-4 text-green-600" /> },
  { key: 'sw3', icon: <LuTrendingUp className="w-4 h-4 text-green-600" /> },
  { key: 'sw4', icon: <LuShieldCheck className="w-4 h-4 text-green-600" /> },
  { key: 'sw5', icon: <LuCreditCard className="w-4 h-4 text-green-600" /> },
];

const servicii = [
  { key: 'sv1', icon: <LuUsers className="w-4 h-4 text-green-600" /> },
  { key: 'sv2', icon: <LuWrench className="w-4 h-4 text-green-600" /> },
  { key: 'sv3', icon: <LuSettings className="w-4 h-4 text-green-600" /> },
  { key: 'sv4', icon: <LuGraduationCap className="w-4 h-4 text-green-600" /> },
  { key: 'sv5', icon: <LuHeadphones className="w-4 h-4 text-green-600" /> },
];

const whyUs = [
  { key: 'w1', icon: <LuPuzzle className="w-8 h-8 text-green-600" /> },
  { key: 'w2', icon: <LuCode className="w-8 h-8 text-green-600" /> },
  { key: 'w3', icon: <LuHeadphones className="w-8 h-8 text-green-600" /> },
  { key: 'w4', icon: <LuTrendingUp className="w-8 h-8 text-green-600" /> },
];

const values = [
  { key: 'v1', icon: <LuZap className="w-7 h-7 text-green-600" /> },
  { key: 'v2', icon: <LuShieldCheck className="w-7 h-7 text-green-600" /> },
  { key: 'v3', icon: <LuShieldCheck className="w-7 h-7 text-green-600" /> },
  { key: 'v4', icon: <LuTrendingUp className="w-7 h-7 text-green-600" /> },
  { key: 'v5', icon: <LuHandshake className="w-7 h-7 text-green-600" /> },
];

export default async function DespreNoiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('DespreNoiPage');
  return (
    <main>
      {/* Navbar + Logo */}
      <div className="relative">
        <Navbar />
        <Link href="/" className="absolute top-0 left-1/2 -translate-x-[38%] lg:left-20 lg:translate-x-0 z-50 h-20 flex items-center">
          <Image src="/img/logo.png" alt="RTi Parking Logo" width={210} height={80} priority className="object-contain" />
        </Link>

        {/* ── Hero ── */}
        <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden bg-white">
          <div className="absolute inset-0">
            <Image src="/img/homepage.bg.png" alt="" fill className="object-cover object-center" quality={95} priority />
          </div>
          {/* Mobile fog - full width with high opacity */}
          <div className="lg:hidden absolute inset-0 bg-linear-to-r from-white via-white/98 via-30% via-white/95 via-50% via-white/90 via-70% to-white/70 pointer-events-none" />
          {/* Desktop fog - 50% width */}
          <div className="hidden lg:block absolute inset-0 bg-linear-to-r from-white via-white/95 via-30% via-white/80 via-50% to-transparent pointer-events-none" style={{ width: '50%' }} />

          <div className="relative z-10 w-full px-6 lg:px-10 py-28 pt-36">
            <div className="max-w-3xl">
              <p data-reveal data-reveal-delay="80" className="text-green-600 font-bold tracking-wide text-sm mb-4">
                {t('heroLabel')}
              </p>
              <h1 data-reveal data-reveal-delay="150" className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-5">
                {t('heroTitle1')}<br />{t('heroTitle2')}
              </h1>
              <p data-reveal data-reveal-delay="250" className="text-gray-600 text-lg leading-relaxed max-w-xl mb-10">
                {t('heroDesc')}
              </p>

              {/* Hero badges - horizontal compact layout */}
              <div data-reveal data-reveal-delay="340" className="flex flex-wrap gap-2">
                {heroBadges.map((b) => (
                  <div key={b.key} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-green-300 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                      {b.icon}
                    </div>
                    <span className="text-gray-700 text-xs font-medium leading-tight whitespace-pre-line">{t(`badges.${b.key}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Despre RParking ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left: text */}
            <div data-reveal="fade-left">
              <p className="text-green-600 font-bold tracking-wide text-sm mb-3">{t('whoLabel')}</p>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-5">
                {t('aboutTitlePrefix')}<span className="text-green-600">RParking</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('aboutP1')}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t.rich('aboutP2', { b: (chunks) => <span className="font-semibold text-gray-800">{chunks}</span> })}
              </p>
              <p className="text-gray-700 font-semibold mb-4">{t('designedFor')}</p>
              <ul className="space-y-2.5">
                {aboutPointKeys.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-gray-600 text-sm">
                    <span className="w-5 h-5 rounded-full bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
                      <LuCheck className="w-3 h-3 text-green-600" />
                    </span>
                    {t(`points.${p}`)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: RTI building photo */}
            <div data-reveal="fade-right" className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/img/exchange/rti.jpg"
                alt="RTI Systems"
                width={700}
                height={500}
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-gray-950/80 to-transparent">
                <p className="text-white font-bold text-lg">RTI Systems</p>
                <p className="text-gray-300 text-sm">{t('location')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ce dezvoltăm ── */}
      <section className="py-16" style={{ backgroundColor: '#f7f9f4' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade" className="text-center mb-12">
            <p className="text-green-600 font-bold tracking-wide text-sm mb-2">{t('developLabel')}</p>
            <h2 className="text-3xl font-black text-gray-900">{t('developTitle')}</h2>
            <div className="w-12 h-0.5 bg-green-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hardware */}
            <div data-reveal data-reveal-delay="0" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <LuCode className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-gray-900 font-black text-lg">{t('hardwareTitle')}</h3>
              </div>
              <ul className="space-y-3">
                {hardware.map((h) => (
                  <li key={h.key} className="flex items-center gap-3 text-gray-600 text-sm">
                    <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center shrink-0">{h.icon}</div>
                    {t(`hardware.${h.key}`)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Software */}
            <div data-reveal data-reveal-delay="100" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <LuMonitor className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-gray-900 font-black text-lg">{t('softwareTitle')}</h3>
              </div>
              <ul className="space-y-3">
                {software.map((s) => (
                  <li key={s.key} className="flex items-center gap-3 text-gray-600 text-sm">
                    <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center shrink-0">{s.icon}</div>
                    {t(`software.${s.key}`)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Servicii */}
            <div data-reveal data-reveal-delay="200" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <LuHeadphones className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-gray-900 font-black text-lg">{t('servicesTitle')}</h3>
              </div>
              <ul className="space-y-3">
                {servicii.map((s) => (
                  <li key={s.key} className="flex items-center gap-3 text-gray-600 text-sm">
                    <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center shrink-0">{s.icon}</div>
                    {t(`services.${s.key}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── De ce clienții aleg RParking ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade" className="text-center mb-12">
            <p className="text-green-600 font-bold tracking-wide text-sm mb-2">{t('whyLabel')}</p>
            <h2 className="text-3xl font-black text-gray-900">{t('whyTitle')}</h2>
            <div className="w-12 h-0.5 bg-green-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((w, idx) => (
              <div key={w.key} data-reveal data-reveal-delay={String(idx * 80)} className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-4">
                  {w.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-base mb-2">{t(`why.${w.key}.title`)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(`why.${w.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Implementări reale ── */}
      <RealImplementations />

      {/* ── Valorile noastre ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade" className="text-center mb-12">
            <p className="text-green-600 font-bold tracking-wide text-sm mb-2">{t('valuesLabel')}</p>
            <h2 className="text-3xl font-black text-gray-900">{t('valuesTitle')}</h2>
            <div className="w-12 h-0.5 bg-green-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((v, idx) => (
              <div key={v.key} data-reveal data-reveal-delay={String(idx * 70)} className={`flex flex-col items-center text-center gap-3${idx === values.length - 1 && values.length % 2 !== 0 ? ' col-span-2 sm:col-span-1' : ''}`}>
                <div className="w-14 h-14 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center hover:scale-110 hover:border-green-400 transition-all duration-300 cursor-default">
                  {v.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-sm">{t(`values.${v.key}.title`)}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{t(`values.${v.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/img/homepage.bg.png" alt="" fill className="object-cover object-center" quality={90} />
        </div>
        <div className="absolute inset-0 bg-gray-950/70 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-reveal="fade-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
                <span className="block lg:whitespace-nowrap">{t('ctaTitle1')}</span>
                <span className="block lg:whitespace-nowrap text-green-400">{t('ctaTitle2')}</span>
              </h2>
            </div>
            <div data-reveal="fade-right" className="flex flex-col gap-4 lg:ml-auto lg:max-w-md">
              <a
                href="https://wa.me/37369116121" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-md transition-all duration-200 text-sm shadow-md shadow-green-600/30 hover:scale-105 active:scale-95"
              >
                {t('ctaDemo')} <LuArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

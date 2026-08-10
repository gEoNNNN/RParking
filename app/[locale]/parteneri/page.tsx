import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '../../../i18n/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PartnerForm from '../../components/PartnerForm';
import {
  LuTrendingUp, LuShieldCheck, LuHeadphones, LuGraduationCap, LuMegaphone,
  LuWrench, LuStore, LuNetwork, LuGlobe, LuCheck, LuArrowRight,
  LuPercent, LuBellRing, LuUsers, LuClipboardList, LuPhoneCall,
  LuFileText, LuPenLine, LuRocket,
} from 'react-icons/lu';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Parteneriat RParking – Program de Parteneri pentru Sisteme de Parcare',
  description:
    'Deveniți partener RParking: instalatori, distribuitori, integratori și parteneri internaționali. Marje comerciale competitive, training, suport tehnic dedicat și materiale de marketing.',
  keywords: [
    'parteneriat RParking',
    'partener instalare parcări Moldova',
    'distribuitor echipamente parcare',
    'integrator sisteme parcare',
    'program parteneri automatizare parcări',
    'colaborare sisteme parcare Chișinău',
  ],
  alternates: { canonical: '/parteneri' },
  openGraph: {
    title: 'Deveniți partener RParking',
    description: 'Împreună construim parcări mai inteligente. Soluții moderne, fiabile și profitabile pentru parteneri.',
    url: `${SITE_URL}/parteneri`,
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'Parteneriat RParking' }],
  },
};

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('PartnersPage');

  const benefits = [
    { key: 'revenue', icon: <LuTrendingUp className="w-5 h-5 text-green-600" /> },
    { key: 'reliable', icon: <LuShieldCheck className="w-5 h-5 text-green-600" /> },
    { key: 'support', icon: <LuHeadphones className="w-5 h-5 text-green-600" /> },
    { key: 'training', icon: <LuGraduationCap className="w-5 h-5 text-green-600" /> },
    { key: 'marketing', icon: <LuMegaphone className="w-5 h-5 text-green-600" /> },
  ];

  const types = [
    { key: 'installer', icon: <LuWrench className="w-7 h-7 text-green-600" /> },
    { key: 'distributor', icon: <LuStore className="w-7 h-7 text-green-600" /> },
    { key: 'integrator', icon: <LuNetwork className="w-7 h-7 text-green-600" /> },
    { key: 'international', icon: <LuGlobe className="w-7 h-7 text-green-600" /> },
  ];

  const program = [
    { key: 'margins', icon: <LuPercent className="w-5 h-5 text-green-400" /> },
    { key: 'support', icon: <LuHeadphones className="w-5 h-5 text-green-400" /> },
    { key: 'training', icon: <LuGraduationCap className="w-5 h-5 text-green-400" /> },
    { key: 'updates', icon: <LuBellRing className="w-5 h-5 text-green-400" /> },
    { key: 'marketing', icon: <LuMegaphone className="w-5 h-5 text-green-400" /> },
    { key: 'leads', icon: <LuUsers className="w-5 h-5 text-green-400" /> },
  ];

  const steps = [
    { key: 's1', icon: <LuClipboardList className="w-5 h-5 text-green-600" /> },
    { key: 's2', icon: <LuPhoneCall className="w-5 h-5 text-green-600" /> },
    { key: 's3', icon: <LuFileText className="w-5 h-5 text-green-600" /> },
    { key: 's4', icon: <LuPenLine className="w-5 h-5 text-green-600" /> },
    { key: 's5', icon: <LuRocket className="w-5 h-5 text-green-600" /> },
  ];

  const partners = ['Kaufland', 'Linella', 'Dansicons', 'Autobaza', 'Astercon', 'Bomba'];

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
          <div className="lg:hidden absolute inset-0">
            <Image src="/img/homepage.bg.png" alt="" fill className="object-cover object-center opacity-20" quality={95} priority />
          </div>
          <div className="hidden lg:block overflow-hidden" style={{ maxHeight: '75vh' }}>
            <Image src="/img/homepage.bg.png" alt="" width={1693} height={929} className="w-full h-auto block object-cover" style={{ objectPosition: 'center 30%' }} quality={95} priority />
          </div>
          <div
            className="hidden lg:block absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 110% at 5% 45%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 20%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.6) 60%, transparent 80%)',
            }}
          />

          <div className="relative lg:absolute inset-0 z-10 flex flex-col justify-start pt-32 sm:pt-36 lg:pt-44 pb-12 px-6 lg:pl-24">
            <div className="max-w-xl">
              <h1 data-reveal data-reveal-delay="80" className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-3">
                {t('heroTitle1')} <span className="text-green-600">{t('heroTitle2')}</span>
              </h1>
              <p data-reveal data-reveal-delay="180" className="text-gray-800 font-semibold text-lg mb-3">
                {t('heroSubtitle')}
              </p>
              <p data-reveal data-reveal-delay="260" className="text-gray-600 text-base leading-relaxed max-w-lg mb-8">
                {t('heroDesc')}
              </p>
              <div data-reveal data-reveal-delay="340">
                <a
                  href="#form"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-7 py-3.5 rounded-md transition-all duration-200 text-sm shadow-md shadow-green-600/25 hover:shadow-lg hover:shadow-green-600/40 hover:scale-105 active:scale-95"
                >
                  {t('heroCta')} <LuArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Benefits bar ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {benefits.map((b, idx) => (
              <div
                key={b.key}
                data-reveal
                data-reveal-delay={String(idx * 70)}
                className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl p-4 transition-all duration-300 hover:border-green-300 hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                  {b.icon}
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-xs mb-0.5">{t(`benefits.${b.key}.title`)}</h3>
                  <p className="text-gray-500 text-[11px] leading-snug">{t(`benefits.${b.key}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tipuri de parteneriat ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div data-reveal="fade" className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{t('typesTitle')}</h2>
            <div className="w-12 h-0.5 bg-green-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {types.map((type, idx) => (
              <div
                key={type.key}
                data-reveal
                data-reveal-delay={String(idx * 80)}
                className="group flex flex-col border border-gray-200 rounded-2xl p-6 bg-white transition-all duration-300 hover:border-green-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  {type.icon}
                </div>
                <h3 className="text-gray-900 font-extrabold text-lg mb-2">{t(`types.${type.key}.title`)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{t(`types.${type.key}.desc`)}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {(['f1', 'f2', 'f3'] as const).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-600 text-xs">
                      <LuCheck className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      {t(`types.${type.key}.${f}`)}
                    </li>
                  ))}
                </ul>
                <a
                  href="#form"
                  className="mt-auto inline-flex items-center gap-1.5 text-green-600 text-sm font-semibold hover:text-green-700 transition-colors group/link"
                >
                  {t('learnMore')}
                  <LuArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Program + Form ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Dark panel */}
            <div data-reveal className="relative rounded-2xl overflow-hidden bg-green-900 p-8 sm:p-10 flex flex-col">
              <div className="absolute inset-0 opacity-15">
                <Image src="/img/mainbg.png" alt="" fill className="object-cover object-center" quality={85} />
              </div>
              <div className="relative z-10">
                <h2 className="text-white font-black text-2xl sm:text-3xl leading-tight mb-3">{t('programTitle')}</h2>
                <p className="text-green-100/80 text-sm mb-8">{t('programDesc')}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                  {program.map((p) => (
                    <div key={p.key} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                        {p.icon}
                      </div>
                      <span className="text-white text-xs font-semibold leading-snug">{t(`program.${p.key}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div id="form" data-reveal data-reveal-delay="120" className="scroll-mt-28">
              <PartnerForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Cum devii partener? ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div data-reveal="fade" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('stepsTitle')}</h2>
            <div className="w-12 h-0.5 bg-green-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((s, idx) => (
              <div key={s.key} data-reveal data-reveal-delay={String(idx * 90)} className="relative flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                    {s.icon}
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <LuArrowRight className="hidden lg:block absolute top-7 -right-4 w-4 h-4 text-gray-300" />
                )}
                <h3 className="text-gray-900 font-bold text-sm mb-1.5">{t(`steps.${s.key}.title`)}</h3>
                <p className="text-gray-500 text-xs leading-relaxed max-w-48">{t(`steps.${s.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partenerii noștri ── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div data-reveal="fade" className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('partnersTitle')}</h2>
            <div className="w-12 h-0.5 bg-green-500 mx-auto" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {partners.map((name, idx) => (
              <div
                key={name}
                data-reveal
                data-reveal-delay={String(idx * 60)}
                className="h-20 bg-white border border-gray-200 rounded-xl flex items-center justify-center px-4 transition-all duration-300 hover:border-green-300 hover:shadow-md"
              >
                <span className="text-gray-400 font-black text-lg tracking-tight uppercase text-center leading-tight hover:text-gray-600 transition-colors">
                  {name}
                </span>
              </div>
            ))}
          </div>

          <div data-reveal="fade" className="text-center">
            <Link
              href="/implementari"
              className="inline-flex items-center gap-1.5 text-green-600 text-sm font-semibold hover:text-green-700 transition-colors group"
            >
              {t('viewAll')}
              <LuArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

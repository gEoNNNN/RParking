import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  LuArrowRight, LuCheck, LuChevronRight, LuHouse,
  LuMapPin, LuCode, LuMonitor, LuHeadphones, LuPuzzle,
  LuZap, LuShieldCheck, LuTrendingUp, LuUsers, LuHandshake,
  LuLogIn, LuLogOut, LuCreditCard, LuLayoutDashboard,
  LuWrench, LuSettings, LuGraduationCap,
} from 'react-icons/lu';
import { TbBarrierBlock } from 'react-icons/tb';

const heroBadges = [
  { label: 'Dezvoltați în\nRepublica Moldova', icon: <LuMapPin className="w-5 h-5 text-green-600" /> },
  { label: 'Hardware\npropriu', icon: <LuCode className="w-5 h-5 text-green-600" /> },
  { label: 'Software\npropriu', icon: <LuMonitor className="w-5 h-5 text-green-600" /> },
];

const aboutPoints = [
  'Centre comerciale',
  'Clădiri de birouri',
  'Complexe rezidențiale',
  'Aeroporturi',
  'Parcări publice',
];

const hardware = [
  { label: 'Entry Point', icon: <LuLogIn className="w-4 h-4 text-green-600" /> },
  { label: 'Exit Point', icon: <LuLogOut className="w-4 h-4 text-green-600" /> },
  { label: 'Pay Point', icon: <LuCreditCard className="w-4 h-4 text-green-600" /> },
  { label: 'Bariere automate', icon: <TbBarrierBlock className="w-4 h-4 text-green-600" /> },
  { label: 'Display locuri disponibile', icon: <LuLayoutDashboard className="w-4 h-4 text-green-600" /> },
];

const software = [
  { label: 'BackOffice', icon: <LuLayoutDashboard className="w-4 h-4 text-green-600" /> },
  { label: 'Monitorizare live', icon: <LuMonitor className="w-4 h-4 text-green-600" /> },
  { label: 'Rapoarte', icon: <LuTrendingUp className="w-4 h-4 text-green-600" /> },
  { label: 'Management acces', icon: <LuShieldCheck className="w-4 h-4 text-green-600" /> },
  { label: 'Management plăți', icon: <LuCreditCard className="w-4 h-4 text-green-600" /> },
];

const servicii = [
  { label: 'Consultanță', icon: <LuUsers className="w-4 h-4 text-green-600" /> },
  { label: 'Instalare', icon: <LuWrench className="w-4 h-4 text-green-600" /> },
  { label: 'Configurare', icon: <LuSettings className="w-4 h-4 text-green-600" /> },
  { label: 'Training', icon: <LuGraduationCap className="w-4 h-4 text-green-600" /> },
  { label: 'Suport tehnic', icon: <LuHeadphones className="w-4 h-4 text-green-600" /> },
];

const whyUs = [
  {
    title: 'Soluție completă',
    desc: 'Hardware și software într-o singură platformă',
    icon: <LuPuzzle className="w-8 h-8 text-green-600" />,
  },
  {
    title: 'Dezvoltare proprie',
    desc: 'Control total asupra produsului și actualizărilor.',
    icon: <LuCode className="w-8 h-8 text-green-600" />,
  },
  {
    title: 'Suport local',
    desc: 'Intervenții rapide și comunicare directă.',
    icon: <LuHeadphones className="w-8 h-8 text-green-600" />,
  },
  {
    title: 'Scalabilitate',
    desc: 'De la parcări mici până la proiecte complexe.',
    icon: <LuTrendingUp className="w-8 h-8 text-green-600" />,
  },
];

const values = [
  { title: 'Inovație', desc: 'Dezvoltăm constant soluții moderne și eficiente.', icon: <LuZap className="w-7 h-7 text-green-600" /> },
  { title: 'Fiabilitate', desc: 'Echipamente și software stabile și testate.', icon: <LuShieldCheck className="w-7 h-7 text-green-600" /> },
  { title: 'Securitate', desc: 'Protejăm datele și accesul în orice moment.', icon: <LuShieldCheck className="w-7 h-7 text-green-600" /> },
  { title: 'Performanță', desc: 'Sisteme rapide, precise și optimizate.', icon: <LuTrendingUp className="w-7 h-7 text-green-600" /> },
  { title: 'Parteneriat', desc: 'Construim relații solide pe termen lung.', icon: <LuHandshake className="w-7 h-7 text-green-600" /> },
];

const gallery = [
  '/img/implementarea 1.jpg',
  '/img/implementarea 2.jpg',
  '/img/implementarea 3.jpg',
  '/img/implementarea 4.jpg',
  '/img/implementarea 5.jpg',
];

export default function DespreNoiPage() {
  return (
    <main>
      {/* Navbar + Logo */}
      <div className="relative">
        <Navbar />
        <Link href="/" className="absolute top-0 left-20 z-50 h-20 flex items-center">
          <Image src="/img/logo.png" alt="RTi Parking Logo" width={210} height={80} priority className="object-contain" />
        </Link>

        {/* ── Hero ── */}
        <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden bg-white">
          <div className="absolute inset-0">
            <Image src="/img/mainbg.png" alt="" fill className="object-cover object-center" quality={95} priority />
          </div>
          {/* Mobile fog - full width with high opacity */}
          <div className="lg:hidden absolute inset-0 bg-linear-to-r from-white via-white/98 via-30% via-white/95 via-50% via-white/90 via-70% to-white/70 pointer-events-none" />
          {/* Desktop fog - 50% width */}
          <div className="hidden lg:block absolute inset-0 bg-linear-to-r from-white via-white/95 via-30% via-white/80 via-50% to-transparent pointer-events-none" style={{ width: '50%' }} />

          <div className="relative z-10 w-full px-6 lg:px-10 py-28 pt-36">
            <div className="max-w-3xl">
              <p data-reveal data-reveal-delay="80" className="text-green-600 font-bold tracking-wide text-sm mb-4">
                DESPRE NOI
              </p>
              <h1 data-reveal data-reveal-delay="150" className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-5">
                Construim viitorul<br />parcărilor inteligente
              </h1>
              <p data-reveal data-reveal-delay="250" className="text-gray-600 text-lg leading-relaxed max-w-xl mb-10">
                RParking dezvoltă și implementează soluții complete pentru automatizarea parcărilor,
                combinând hardware propriu, software avansat și suport local într-o platformă unică.
              </p>

              {/* Hero badges - horizontal compact layout */}
              <div data-reveal data-reveal-delay="340" className="flex flex-wrap gap-2">
                {heroBadges.map((b) => (
                  <div key={b.label} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-green-300 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                      {b.icon}
                    </div>
                    <span className="text-gray-700 text-xs font-medium leading-tight whitespace-pre-line">{b.label}</span>
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
              <p className="text-green-600 font-bold tracking-wide text-sm mb-3">CINE SUNTEM</p>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-5">
                Despre <span className="text-green-600">RParking</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                RParking este divizia specializată în managementul și automatizarea parcărilor din cadrul RTI Systems.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Am creat o platformă completă care controlează accesul vehiculelor, procesează plățile și oferă
                monitorizare în timp real printr-un sistem centralizat <span className="font-semibold text-gray-800">BackOffice</span>.
              </p>
              <p className="text-gray-700 font-semibold mb-4">Soluția este proiectată pentru:</p>
              <ul className="space-y-2.5">
                {aboutPoints.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-gray-600 text-sm">
                    <span className="w-5 h-5 rounded-full bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
                      <LuCheck className="w-3 h-3 text-green-600" />
                    </span>
                    {p}
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
                <p className="text-gray-300 text-sm">Chișinău, Republica Moldova</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ce dezvoltăm ── */}
      <section className="py-16" style={{ backgroundColor: '#f7f9f4' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade" className="text-center mb-12">
            <p className="text-green-600 font-bold tracking-wide text-sm mb-2">CE DEZVOLTĂM</p>
            <h2 className="text-3xl font-black text-gray-900">Soluții complete de la zero</h2>
            <div className="w-12 h-0.5 bg-green-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hardware */}
            <div data-reveal data-reveal-delay="0" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <LuCode className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-gray-900 font-black text-lg">HARDWARE</h3>
              </div>
              <ul className="space-y-3">
                {hardware.map((h) => (
                  <li key={h.label} className="flex items-center gap-3 text-gray-600 text-sm">
                    <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center shrink-0">{h.icon}</div>
                    {h.label}
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
                <h3 className="text-gray-900 font-black text-lg">SOFTWARE</h3>
              </div>
              <ul className="space-y-3">
                {software.map((s) => (
                  <li key={s.label} className="flex items-center gap-3 text-gray-600 text-sm">
                    <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center shrink-0">{s.icon}</div>
                    {s.label}
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
                <h3 className="text-gray-900 font-black text-lg">SERVICII</h3>
              </div>
              <ul className="space-y-3">
                {servicii.map((s) => (
                  <li key={s.label} className="flex items-center gap-3 text-gray-600 text-sm">
                    <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center shrink-0">{s.icon}</div>
                    {s.label}
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
            <p className="text-green-600 font-bold tracking-wide text-sm mb-2">DE CE CLIENȚII ALEG RPARKING</p>
            <h2 className="text-3xl font-black text-gray-900">Avantajele noastre</h2>
            <div className="w-12 h-0.5 bg-green-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((w, idx) => (
              <div key={w.title} data-reveal data-reveal-delay={String(idx * 80)} className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-4">
                  {w.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-base mb-2">{w.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Implementări reale ── */}
      <section className="py-16" style={{ backgroundColor: '#f7f9f4' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade" className="text-center mb-10">
            <p className="text-green-600 font-bold tracking-wide text-sm mb-2">IMPLEMENTĂRI REALE</p>
            <h2 className="text-3xl font-black text-gray-900">Văzut în acțiune</h2>
            <div className="w-12 h-0.5 bg-green-500 mx-auto mt-4" />
          </div>

          <div data-reveal className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {gallery.map((src, idx) => (
              <div key={idx} className={`relative rounded-xl overflow-hidden aspect-square${idx === gallery.length - 1 && gallery.length % 2 !== 0 ? ' col-span-2 md:col-span-1 max-w-[50%] md:max-w-full mx-auto w-full' : ''}`}>
                <Image src={src} alt="" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
          <p data-reveal className="text-center text-gray-500 text-sm">
            Sistem RParking implementat și operat într-o parcare modernă din Chișinău.
          </p>
        </div>
      </section>

      {/* ── Valorile noastre ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade" className="text-center mb-12">
            <p className="text-green-600 font-bold tracking-wide text-sm mb-2">VALORILE NOASTRE</p>
            <h2 className="text-3xl font-black text-gray-900">Ce ne definește</h2>
            <div className="w-12 h-0.5 bg-green-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((v, idx) => (
              <div key={v.title} data-reveal data-reveal-delay={String(idx * 70)} className={`flex flex-col items-center text-center gap-3${idx === values.length - 1 && values.length % 2 !== 0 ? ' col-span-2 sm:col-span-1' : ''}`}>
                <div className="w-14 h-14 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center hover:scale-110 hover:border-green-400 transition-all duration-300 cursor-default">
                  {v.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-sm">{v.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/img/mainbg.png" alt="" fill className="object-cover object-center" quality={90} />
        </div>
        <div className="absolute inset-0 bg-gray-950/70 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div data-reveal="fade-left">
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                Hai să transformăm parcarea ta<br />
                <span className="text-green-400">într-un sistem inteligent</span>
              </h2>
            </div>
            <div data-reveal="fade-right" className="flex flex-col gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-md transition-all duration-200 text-sm shadow-md shadow-green-600/30 hover:scale-105 active:scale-95"
              >
                Solicită demonstrație <LuArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 border border-white/40 hover:border-white text-white font-semibold px-8 py-4 rounded-md transition-all duration-200 text-sm bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95"
              >
                Programează demonstrație
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

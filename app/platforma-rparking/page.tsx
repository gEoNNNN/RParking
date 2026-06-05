import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  LuCheck, LuArrowRight, LuChevronRight, LuHouse,
  LuCpu, LuShieldCheck, LuServer, LuLayoutDashboard, LuTrendingUp,
  LuCloud, LuLock, LuPuzzle, LuSmartphone, LuSettings,
  LuActivity, LuFileText, LuUsers, LuBrainCircuit,
  LuCamera, LuScanLine, LuKeyRound, LuRadioTower,
} from 'react-icons/lu';
import { TbBarrierBlock } from 'react-icons/tb';

const heroBadges = ['Fiabilă', 'Securizată', 'Scalabilă', 'Ușor de integrat'];

const steps = [
  { title: 'Echipamente inteligente', description: 'Entry Point, Exit Point, Pay Point și senzori conectați.', icon: <LuCpu className="w-8 h-8 text-green-600" /> },
  { title: 'Comunicare securizată', description: 'Datele sunt transmise criptat prin rețele sigure.', icon: <LuLock className="w-8 h-8 text-green-600" /> },
  { title: 'Platforma RParking', description: 'Toate datele sunt procesate, stocate și corelate în timp real.', icon: <LuServer className="w-8 h-8 text-green-600" /> },
  { title: 'BackOffice & Monitorizare', description: 'Control complet, rapoarte și alerte instant.', icon: <LuLayoutDashboard className="w-8 h-8 text-green-600" /> },
  { title: 'Decizii inteligente', description: 'Rapoarte care permit o operare mai eficientă și profitabilă.', icon: <LuTrendingUp className="w-8 h-8 text-green-600" /> },
];

const whyFeatures = [
  { title: 'Performanță ridicată', description: 'Procesare rapidă a mii de tranzacții simultan.', icon: <LuShieldCheck className="w-7 h-7 text-green-600" /> },
  { title: 'Disponibilitate 99.9%', description: 'SLA ridicat și infrastructură rezilientă în cloud.', icon: <LuCloud className="w-7 h-7 text-green-600" /> },
  { title: 'Securitate avansată', description: 'Protecție end-to-end a datelor și acceselor.', icon: <LuLock className="w-7 h-7 text-green-600" /> },
  { title: 'Integrare ușoară', description: 'API-uri moderne pentru integrări rapide cu sisteme terțe.', icon: <LuPuzzle className="w-7 h-7 text-green-600" /> },
  { title: 'Acces de oriunde', description: 'Platformă web și mobilă, din orice dispozitiv.', icon: <LuSmartphone className="w-7 h-7 text-green-600" /> },
  { title: 'Scalabilitate', description: 'Se adaptează ușor oricărei parcări, de la 1 la 1000+ locații.', icon: <LuSettings className="w-7 h-7 text-green-600" /> },
];

const keyFeatures = [
  { title: 'Cloud modern', description: 'Infrastructură cloud de ultimă generație pentru viteze mari și uptime ridicat.', icon: <LuCloud className="w-6 h-6 text-green-600" /> },
  { title: 'Date în timp real', description: 'Monitorizare live a plăților, acceselor, ocupării și echipamentelor.', icon: <LuActivity className="w-6 h-6 text-green-600" /> },
  { title: 'AI & Analytics', description: 'Analize avansate și predicții pentru optimizarea veniturilor și a fluxului de trafic.', icon: <LuBrainCircuit className="w-6 h-6 text-green-600" /> },
  { title: 'Management echipamente', description: 'Stare, diagnoze, configurare și update remote pentru toate dispozitivele.', icon: <LuServer className="w-6 h-6 text-green-600" /> },
  { title: 'Rapoarte avansate', description: 'Rapoarte personalizate, exporturi și dashboard-uri interactive.', icon: <LuFileText className="w-6 h-6 text-green-600" /> },
  { title: 'Multi-tenant', description: 'Gestionare multi-locație și roluri personalizate pentru utilizatori.', icon: <LuUsers className="w-6 h-6 text-green-600" /> },
];

const integrations = [
  { label: 'ANPR Camera', icon: <LuCamera className="w-7 h-7 text-green-600" /> },
  { label: 'Bariere', icon: <TbBarrierBlock className="w-7 h-7 text-green-600" /> },
  { label: 'Validatoare', icon: <LuScanLine className="w-7 h-7 text-green-600" /> },
  { label: 'Sisteme de acces', icon: <LuKeyRound className="w-7 h-7 text-green-600" /> },
  { label: 'IoT Devices', icon: <LuCpu className="w-7 h-7 text-green-600" /> },
];

const connectivity = [
  'TCP/IP, HTTPS, MQTT',
  'API RESTful',
  'VPN, 4G / 5G / Wi-Fi',
  'SNMP și monitorizare avansată',
];

export default function PlatformaRParkingPage() {
  return (
    <main>
      {/* Navbar + Logo */}
      <div className="relative">
        <Navbar />
        <Link href="/" className="absolute top-4 left-6 z-50">
          <Image src="/img/logo.png" alt="RTi Parking Logo" width={210} height={80} priority className="object-contain" />
        </Link>

        {/* ── Hero (dark) ── */}
        <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-gray-950">
          <div className="absolute inset-0">
            <Image src="/img/platforma-rparking/hero.png" alt="" fill className="object-cover object-center" quality={95} priority />
          </div>
          {/* Dark fog from the left for text readability */}
          <div className="absolute inset-0 bg-linear-to-r from-gray-950 via-gray-950/80 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gray-950/30 pointer-events-none" />

          <div className="relative z-10 w-full px-6 lg:px-10 py-28 pt-36">
            {/* Breadcrumb */}
            <nav data-reveal className="flex items-center gap-2 text-sm text-gray-300 mb-6">
              <Link href="/" className="flex items-center gap-1 hover:text-green-400 transition-colors">
                <LuHouse className="w-4 h-4" /> Acasă
              </Link>
              <LuChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Platforma RParking</span>
            </nav>

            <div className="max-w-2xl">
              <p data-reveal data-reveal-delay="80" className="text-green-400 font-bold tracking-wide text-sm mb-4">
                PLATFORMA RPARKING
              </p>
              <h1 data-reveal data-reveal-delay="150" className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-5">
                Tehnologie inteligentă care <span className="text-green-500">simplifică</span> parcările.
              </h1>
              <p data-reveal data-reveal-delay="250" className="text-gray-300 text-lg leading-relaxed max-w-xl mb-8">
                RParking combină echipamente inteligente, software avansat și conectivitate securizată
                într-o platformă unitară și scalabilă.
              </p>

              {/* CTA buttons */}
              <div data-reveal data-reveal-delay="340" className="flex flex-wrap items-center gap-4 mb-10">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-7 py-3.5 rounded-md transition-all duration-200 text-sm shadow-md shadow-green-600/30 hover:shadow-lg hover:shadow-green-600/50 hover:scale-105 active:scale-95"
                >
                  Solicită ofertă <LuArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white font-semibold px-7 py-3.5 rounded-md transition-all duration-200 text-sm bg-white/5 hover:bg-white/10 hover:scale-105 active:scale-95"
                >
                  Programare demo
                </Link>
              </div>

              {/* Hero badges */}
              <div data-reveal data-reveal-delay="430" className="flex flex-wrap items-center gap-x-8 gap-y-3">
                {heroBadges.map((b) => (
                  <div key={b} className="flex items-center gap-2">
                    <LuCheck className="w-5 h-5 text-green-400 shrink-0" />
                    <span className="text-gray-200 text-sm font-semibold">{b}</span>
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
              Cum funcționează platforma <span className="text-green-600">RParking</span>
            </h2>
            <div className="w-12 h-0.5 bg-green-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-start gap-y-10 gap-x-4">
            {steps.map((step, idx) => (
              <Fragment key={step.title}>
                <div className="flex flex-col items-center text-center gap-3 lg:flex-1">
                  <div className="w-24 h-24 rounded-full bg-green-50 border border-green-100 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-200/60 hover:border-green-400 cursor-pointer">
                    {step.icon}
                  </div>
                  <p className="text-gray-900 font-bold text-sm leading-tight">{step.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed max-w-44">{step.description}</p>
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
              De ce tehnologia <span className="text-green-600">RParking</span>?
            </h2>
            <div className="w-12 h-0.5 bg-green-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyFeatures.map((f, idx) => (
              <div key={f.title} data-reveal data-reveal-delay={String((idx % 3) * 100)} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-base mb-1.5">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tehnologie și funcționalități cheie ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div data-reveal="fade" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Tehnologie și funcționalități cheie</h2>
            <div className="w-12 h-0.5 bg-green-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {keyFeatures.map((f, idx) => (
              <div key={f.title} data-reveal data-reveal-delay={String((idx % 3) * 100)} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-base mb-1">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Integrare și ecosistem deschis</h2>
            <div className="w-12 h-0.5 bg-green-500" />
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: integration icons */}
            <div data-reveal="fade-left" className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {integrations.map((i) => (
                <div key={i.label} className="flex flex-col items-center text-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-green-300">
                    {i.icon}
                  </div>
                  <span className="text-gray-700 text-xs font-semibold leading-tight">{i.label}</span>
                </div>
              ))}
            </div>

            {/* Right: connectivity dark card */}
            <div data-reveal="fade-right" className="relative rounded-2xl bg-gray-900 p-8 overflow-hidden">
              <h3 className="text-white font-bold text-xl mb-6">Conectivitate flexibilă</h3>
              <ul className="space-y-4 relative z-10">
                {connectivity.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-gray-200 text-sm">
                    <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                      <LuCheck className="w-3 h-3 text-green-400" />
                    </span>
                    {c}
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
              Tehnologie care <span className="text-green-500">transformă</span> parcările.
            </h2>
            <p className="text-gray-400 text-base max-w-xl">
              Alege platforma RParking și beneficiază de o soluție completă,
              securizată și pregătită pentru viitor.
            </p>
          </div>
          <div data-reveal="fade-right" className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-3.5 rounded-md transition-all duration-200 text-sm shadow-md shadow-green-600/30 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Solicită ofertă <LuArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white font-semibold px-8 py-3.5 rounded-md transition-all duration-200 text-sm bg-white/5 hover:bg-white/10 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Programare demo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

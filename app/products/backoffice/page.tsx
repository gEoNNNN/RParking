import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  LuCheck, LuArrowRight, LuChevronRight, LuHouse,
  LuLayoutDashboard, LuFileText, LuUsers, LuTag, LuBell, LuShieldCheck,
  LuServer, LuCloud, LuActivity, LuSettings, LuWallet,
  LuLogIn, LuLogOut, LuCamera, LuCpu, LuBuilding2,
  LuLock, LuDatabase, LuClock, LuCreditCard,
  LuTrendingUp, LuZap, LuCalendar,
} from 'react-icons/lu';
import { TbBarrierBlock } from 'react-icons/tb';

const heroFeatures = [
  'Monitorizare în timp real',
  'Evenimente și alerte',
  'Rapoarte și statistici avansate',
  'Integrare completă cu echipamente',
  'Management utilizatori și tarife',
  'Acces securizat și audit trail',
];

const keyFeatures = [
  { title: 'Dashboard', accent: 'în timp real', desc: 'Vizualizează instant performanța parcărilor și indicatorii cheie.', icon: <LuLayoutDashboard className="w-6 h-6 text-green-600" /> },
  { title: 'Rapoarte', accent: 'și statistici', desc: 'Rapoarte personalizate pentru încasări, tranzacții și ocupare.', icon: <LuFileText className="w-6 h-6 text-green-600" /> },
  { title: 'Management', accent: 'utilizatori', desc: 'Roluri și permisiuni flexibile pentru echipa ta.', icon: <LuUsers className="w-6 h-6 text-green-600" /> },
  { title: 'Tarife', accent: 'și reguli', desc: 'Configurează tarife, promoții și reguli de acces.', icon: <LuTag className="w-6 h-6 text-green-600" /> },
  { title: 'Alerte', accent: 'și notificări', desc: 'Primești notificări pentru evenimente importante în sistem.', icon: <LuBell className="w-6 h-6 text-green-600" /> },
  { title: 'Securitate', accent: 'avansată', desc: 'Acces securizat, loguri complete și audit trail.', icon: <LuShieldCheck className="w-6 h-6 text-green-600" /> },
];

const steps = [
  { title: 'Datele sunt colectate automat de la echipamente', desc: 'Entry, Exit, Pay Point trimit date continuu.', icon: <LuServer className="w-16 h-16 text-green-600" /> },
  { title: 'Informațiile sunt transmise securizat în BackOffice', desc: 'Conexiune criptată și protejată.', icon: <LuCloud className="w-16 h-16 text-green-600" /> },
  { title: 'Datele sunt procesate și centralizate în rapoarte', desc: 'Agregare automată și structurare pe categorii.', icon: <LuFileText className="w-16 h-16 text-green-600" /> },
  { title: 'Obții statistici și alerte relevante în timp real', desc: 'Notificări inteligente pentru orice eveniment.', icon: <LuBell className="w-16 h-16 text-green-600" /> },
  { title: 'Iei decizii mai bune și optimizezi performanța', desc: 'Date clare pentru o administrare eficientă.', icon: <LuSettings className="w-16 h-16 text-green-600" /> },
];

const modules = [
  { n: 1, title: 'Monitorizare live', desc: 'Stare echipamente, tranzacții și alerte în timp real.', icon: <LuActivity className="w-5 h-5 text-green-600" /> },
  { n: 2, title: 'Rapoarte avansate', desc: 'Rapoarte financiare, operaționale și de ocupare personalizate.', icon: <LuFileText className="w-5 h-5 text-green-600" /> },
  { n: 3, title: 'Management financiar', desc: 'Încasări, plăți, rambursări și reconcilieri automate.', icon: <LuWallet className="w-5 h-5 text-green-600" /> },
  { n: 4, title: 'Management acces', desc: 'Utilizatori, roluri, permisiuni și politici de acces.', icon: <LuUsers className="w-5 h-5 text-green-600" /> },
  { n: 5, title: 'Configurare sistem', desc: 'Tarife, zone, reguli, ore de funcționare și integrări.', icon: <LuSettings className="w-5 h-5 text-green-600" /> },
];

const integrations = [
  { label: 'Entry Point', icon: <LuLogIn className="w-7 h-7 text-green-600" /> },
  { label: 'Exit Point', icon: <LuLogOut className="w-7 h-7 text-green-600" /> },
  { label: 'Pay Point', icon: <LuWallet className="w-7 h-7 text-green-600" /> },
  { label: 'Bariere', icon: <TbBarrierBlock className="w-7 h-7 text-green-600" /> },
  { label: 'ANPR Camera', icon: <LuCamera className="w-7 h-7 text-green-600" /> },
  { label: 'Validatoare', icon: <LuCreditCard className="w-7 h-7 text-green-600" /> },
  { label: 'Dispozitive IoT', icon: <LuCpu className="w-7 h-7 text-green-600" /> },
  { label: 'Sisteme terțe', icon: <LuBuilding2 className="w-7 h-7 text-green-600" /> },
];

const security = [
  { text: 'Conexiune criptată end-to-end', icon: <LuLock className="w-5 h-5 text-green-400" /> },
  { text: 'Backup automat și replicare în cloud', icon: <LuDatabase className="w-5 h-5 text-green-400" /> },
  { text: 'Disponibilitate ridicată 24/7', icon: <LuClock className="w-5 h-5 text-green-400" /> },
  { text: 'Audit și trasabilitate completă', icon: <LuShieldCheck className="w-5 h-5 text-green-400" /> },
];

const ecosystem = [
  { title: 'Entry Point', desc: 'Stație de intrare care emite cardul de acces.', href: '/products/entry-point', image: '/img/produs1.png', icon: null },
  { title: 'Exit Point', desc: 'Stație de ieșire cu validare card sau tichet.', href: '/products/exit-point-cardpass', image: '/img/produs2.png', icon: null },
  { title: 'Pay Point', desc: 'Plată automată cu numerar și card.', href: '/products/pay-point', image: '/img/produs3.png', icon: null },
];

export default function BackOfficePage() {
  return (
    <main>
      {/* Navbar + Logo */}
      <div className="relative">
        <Navbar />
        <Link href="/" className="absolute top-0 left-20 z-50 h-20 flex items-center">
          <Image src="/img/logo.png" alt="RTi Parking Logo" width={210} height={80} priority className="object-contain" />
        </Link>

        {/* ── Hero (white + green) ── */}
        <section className="relative w-full min-h-[88vh] flex items-center overflow-hidden bg-white">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-green-50 to-transparent pointer-events-none" />
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 py-16 pt-36">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <div>
              <h1 data-reveal data-reveal-delay="80" className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-5">
                BackOffice
              </h1>
              <p data-reveal data-reveal-delay="250" className="text-gray-500 text-lg leading-relaxed max-w-xl mb-8">
                Platforma centralizată pentru administrarea și monitorizarea inteligentă a parcărilor.
              </p>

              {/* Feature checkmarks */}
              <div data-reveal data-reveal-delay="340" className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8 max-w-lg">
                {heroFeatures.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <LuCheck className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700 text-sm font-semibold">{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div data-reveal data-reveal-delay="430" className="flex flex-wrap items-center gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-7 py-3.5 rounded-md transition-all duration-200 text-sm shadow-md shadow-green-600/30 hover:shadow-lg hover:shadow-green-600/50 hover:scale-105 active:scale-95"
                >
                  Solicită ofertă <LuArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 border border-gray-300 hover:border-gray-500 text-gray-800 font-semibold px-7 py-3.5 rounded-md transition-all duration-200 text-sm hover:bg-gray-50 hover:scale-105 active:scale-95"
                >
                  Programare demonstrație
                </Link>
              </div>
            </div>

            {/* Right: BackOffice dashboard - EXACT screenshot match */}
            <div data-reveal="fade-left" className="relative flex items-center justify-center mt-8 lg:mt-0 w-full">
              <div className="hidden lg:block absolute w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-3xl overflow-hidden group hover:shadow-3xl transition-shadow duration-500">
                {/* Top Header - interactive */}
                <div className="bg-slate-600 px-3 lg:px-4 py-2 flex items-center justify-between hover:bg-slate-700 transition-colors duration-300 cursor-pointer">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-5 h-5 flex flex-col justify-center gap-0.5 group/menu cursor-pointer hover:scale-110 transition-transform">
                      <div className="w-full h-0.5 bg-white group-hover/menu:w-4 transition-all" />
                      <div className="w-full h-0.5 bg-white" />
                      <div className="w-full h-0.5 bg-white group-hover/menu:w-3 transition-all" />
                    </div>
                    <span className="text-white font-medium text-xs lg:text-sm">Parking Control Panel</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-white/90 text-xs">
                    <div className="w-4 h-4 border border-white/60 rounded-full hover:bg-white/20 hover:scale-110 transition-all cursor-pointer" />
                    <div className="w-4 h-4 border border-white/60 rounded-full hover:bg-white/20 hover:scale-110 transition-all cursor-pointer" />
                    <span className="hidden md:inline hover:text-white hover:scale-105 transition-all cursor-pointer">Support</span>
                    <span className="hidden md:inline hover:text-red-300 hover:scale-105 transition-all cursor-pointer">Logout</span>
                    <span className="flex items-center gap-1 hover:text-white cursor-pointer hover:scale-105 transition-all">● EN</span>
                  </div>
                </div>
                {/* Main Content with Sidebar */}
                <div className="flex flex-col md:flex-row">
                  {/* Left Sidebar - hidden on mobile */}
                  <div className="hidden md:block w-28 lg:w-32 bg-white border-b md:border-b-0 md:border-r border-gray-200 p-2">
                    <div className="text-[9px] text-gray-400 mb-2 font-medium">Menu</div>
                    {[
                      { icon: '■', label: 'Monitoring', active: false },
                      { icon: '▤', label: 'Reports', active: false, arrow: true },
                      { icon: '▤', label: 'Graphics', active: false, arrow: true },
                      { icon: '●', label: 'Number of payments', active: true },
                      { icon: '▤', label: 'Number of tickets', active: false },
                      { icon: '⚙', label: 'Setting', active: false, arrow: true },
                      { icon: '$', label: 'Money', active: false, arrow: true },
                      { icon: '▤', label: 'Tickets', active: false },
                      { icon: '▤', label: 'Tickets With Gifts', active: false },
                      { icon: '▤', label: 'History Detect', active: false },
                      { icon: '▤', label: 'Used Access List', active: false },
                      { icon: '▤', label: 'Custom Services', active: false },
                      { icon: '▤', label: 'Main Information', active: false },
                    ].map((item, i) => (
                      <div key={i} className={`flex items-center gap-1.5 py-1 px-1.5 rounded mb-0.5 text-[9px] cursor-pointer transition-all duration-200 hover:scale-105 hover:translate-x-1 ${item.active ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <span className={item.active ? 'text-indigo-500' : 'text-gray-400 group-hover:text-indigo-500'}>{item.icon}</span>
                        <span className="truncate">{item.label}</span>
                        {item.arrow && <span className="ml-auto text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all">›</span>}
                      </div>
                    ))}
                  </div>
                  {/* Main Panel */}
                  <div className="flex-1 p-3 lg:p-4">
                    {/* Section Title */}
                    <div className="text-indigo-600 text-xs font-medium mb-3">Number of payments</div>
                    {/* Legend */}
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 bg-teal-400 rounded-sm" />
                        <span className="text-[10px] text-gray-500">Cash</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 bg-indigo-600 rounded-sm" />
                        <span className="text-[10px] text-gray-500">Card</span>
                      </div>
                    </div>
                    {/* Chart Area */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Chart */}
                      <div className="flex-1">
                        <div className="flex items-end gap-1 h-24 sm:h-28 border-b border-l border-gray-300 pb-1 pl-1">
                          {[
                            [3,18], [5,22], [8,20], [6,28], [12,30], [10,32], [14,28], [12,35], [16,38], [20,42], [22,45], [12,48],
                            [8,28], [6,22], [4,18], [3,15], [5,12], [4,10], [6,8], [5,6]
                          ].slice(0, 12).map((vals, i) => (
                            <div key={i} className="flex-1 flex items-end gap-0.5 group/bar cursor-pointer">
                              <div className="flex-1 bg-teal-400 rounded-t hover:bg-teal-300 transition-all duration-300 group-hover/bar:brightness-110" style={{ height: `${vals[0] * 1.5}px` }} />
                              <div className="flex-1 bg-indigo-600 rounded-t hover:bg-indigo-500 transition-all duration-300 group-hover/bar:brightness-110" style={{ height: `${vals[1] * 1.2}px` }} />
                            </div>
                          ))}
                        </div>
                        {/* Date labels */}
                        <div className="flex text-[7px] sm:text-[8px] text-gray-500 mt-1 px-1">
                          <span className="flex-1 text-center">27.05</span>
                          <span className="flex-1 text-center">28.05</span>
                          <span className="flex-1 text-center">29.05</span>
                          <span className="flex-1 text-center">30.05</span>
                          <span className="flex-1 text-center">31.05</span>
                          <span className="flex-1 text-center">01.06</span>
                          <span className="flex-1 text-center">02.06</span>
                        </div>
                        {/* Buttons */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="text-[8px] sm:text-[9px] bg-indigo-600 text-white px-2 py-1 rounded-sm font-medium cursor-pointer hover:bg-indigo-700 hover:scale-105 transition-all shadow-md">LAST 7 DAYS</span>
                          <span className="text-[8px] sm:text-[9px] bg-indigo-100 text-indigo-700 px-2 py-1 rounded-sm font-medium cursor-pointer hover:bg-indigo-200 hover:scale-105 transition-all">LAST MONTH</span>
                          <span className="hidden sm:inline text-[8px] sm:text-[9px] bg-indigo-100 text-indigo-700 px-2 py-1 rounded-sm font-medium cursor-pointer hover:bg-indigo-200 hover:scale-105 transition-all">LAST THREE MONTHS</span>
                        </div>
                      </div>
                      {/* Right Statistics */}
                      <div className="w-full sm:w-24 flex flex-row sm:flex-col justify-between sm:justify-start pt-2 gap-2 sm:gap-0">
                        <div className="sm:mb-3 cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5 transition-all hover:scale-105">
                          <p className="text-[8px] sm:text-[9px] text-gray-500 mb-0.5">Total Card:</p>
                          <p className="text-base sm:text-lg font-semibold text-gray-800 leading-none hover:text-indigo-600 transition-colors">165</p>
                        </div>
                        <div className="sm:mb-3 cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5 transition-all hover:scale-105">
                          <p className="text-[8px] sm:text-[9px] text-gray-500 mb-0.5">Total Cash:</p>
                          <p className="text-base sm:text-lg font-semibold text-gray-800 leading-none hover:text-indigo-600 transition-colors">57</p>
                        </div>
                        <div className="sm:mb-3 cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5 transition-all hover:scale-105">
                          <p className="text-[8px] sm:text-[9px] text-gray-500 mb-0.5">Total Tickets:</p>
                          <p className="text-base sm:text-lg font-semibold text-gray-800 leading-none hover:text-indigo-600 transition-colors">216</p>
                        </div>
                        <div className="cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5 transition-all hover:scale-105">
                          <p className="text-[8px] sm:text-[9px] text-gray-500 mb-0.5">Total Payments:</p>
                          <p className="text-base sm:text-lg font-semibold text-gray-800 leading-none hover:text-indigo-600 transition-colors">222</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>
      </div>

      {/* ── Funcționalități principale ── */}
      <section className="py-16" style={{ backgroundColor: '#f7f9f4' }}>
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Funcționalități principale</h2>
            <div className="w-12 h-0.5 bg-green-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            {keyFeatures.map((f, idx) => (
              <div
                key={f.title}
                data-reveal
                data-reveal-delay={String((idx % 6) * 80)}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-5"
              >
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-base leading-tight mb-1.5">
                  {f.title} <span className="block text-green-600">{f.accent}</span>
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cum funcționează? ── */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade" className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Cum funcționează?</h2>
            <div className="w-12 h-0.5 bg-green-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-start gap-y-10 gap-x-4">
            {steps.map((step, idx) => (
              <Fragment key={step.title}>
                <div className="flex flex-col items-center text-center gap-3 lg:flex-1">
                  <div className="w-32 h-32 rounded-full bg-green-50 border border-green-100 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-200/60 hover:border-green-400 cursor-pointer">
                    {step.icon}
                  </div>
                  <p className="text-gray-900 font-bold text-sm leading-tight">{step.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed max-w-44">{step.desc}</p>
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

      {/* ── Module și capabilități ── */}
      <section className="py-16" style={{ backgroundColor: '#f7f9f4' }}>
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Module și capabilități</h2>
            <div className="w-12 h-0.5 bg-green-500" />
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* Module list */}
            <div data-reveal="fade-left" className="lg:col-span-2 space-y-4">
              {modules.map((m) => (
                <div key={m.n} className="flex items-start gap-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-5">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                    {m.icon}
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-sm leading-tight mb-1">{m.title}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dashboard screenshot collage */}
            <div data-reveal="fade-right" className="lg:col-span-3 relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-200">
              <Image
                src="/img/produse/backoffice.png"
                alt="BackOffice dashboard"
                width={900}
                height={560}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Integrare completă + Securitate ── */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Integrations */}
            <div data-reveal="fade-left">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Integrare completă</h2>
                <div className="w-12 h-0.5 bg-green-500" />
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                BackOffice se integrează nativ cu toate echipamentele și modulele din ecosistemul <span className="text-green-600 font-semibold">RParking</span>.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {integrations.map((i) => (
                  <div key={i.label} className="flex flex-col items-center text-center gap-2">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-green-300">
                      {i.icon}
                    </div>
                    <span className="text-gray-700 text-xs font-semibold leading-tight">{i.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div data-reveal="fade-right">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Securitate și fiabilitate</h2>
                <div className="w-12 h-0.5 bg-green-500" />
              </div>
              <div className="relative bg-gray-900 rounded-2xl p-7 overflow-hidden">
                {/* Glow */}
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-green-500/15 rounded-full blur-3xl pointer-events-none" />
                {/* Decorative icon - right side */}
                <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-20">
                  <LuLock className="w-40 h-40 text-green-400" />
                </div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-green-600/20 border border-green-600/30 flex items-center justify-center mb-6">
                    <LuShieldCheck className="w-7 h-7 text-green-400" />
                  </div>
                  <ul className="space-y-4">
                    {security.map((s) => (
                      <li key={s.text} className="flex items-center gap-3">
                        {s.icon}
                        <span className="text-gray-200 text-sm font-medium">{s.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Compatibil cu ecosistemul RParking ── */}
      <section className="py-16" style={{ backgroundColor: '#f7f9f4' }}>
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Compatibil cu ecosistemul <span className="text-green-600">RParking</span>
            </h2>
            <div className="w-12 h-0.5 bg-green-500 mx-auto" />
          </div>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            {ecosystem.map((e, idx) => (
              <Fragment key={e.title}>
                <Link
                  href={e.href}
                  data-reveal
                  data-reveal-delay={String(idx * 100)}
                  className="flex-1 flex items-center gap-4 bg-white rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-300 p-5"
                >
                  <div className="relative w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                    {e.image ? (
                      <Image src={e.image} alt={e.title} width={70} height={70} className="object-contain h-16 w-auto" />
                    ) : (
                      e.icon
                    )}
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold text-base mb-1">{e.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{e.desc}</p>
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
          <Image src="/img/pc.png" alt="" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-linear-to-r from-gray-950 via-gray-950/70 to-transparent" />
        </div>
        {/* Decorative elements - right side */}
        <div className="absolute top-1/2 right-20 -translate-y-1/2 hidden lg:flex flex-col gap-6 opacity-20">
          <div className="w-20 h-20 rounded-2xl bg-green-500/30 border border-green-500/50 flex items-center justify-center backdrop-blur-sm">
            <LuLayoutDashboard className="w-10 h-10 text-green-400" />
          </div>
          <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/30 flex items-center justify-center backdrop-blur-sm ml-12">
            <LuZap className="w-10 h-10 text-white" />
          </div>
          <div className="w-20 h-20 rounded-2xl bg-green-500/30 border border-green-500/50 flex items-center justify-center backdrop-blur-sm">
            <LuTrendingUp className="w-10 h-10 text-green-400" />
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left - Text */}
            <div data-reveal="fade-right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                Transformă datele în <span className="text-green-500">decizii inteligente</span>.
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-lg">
                Descoperă cum BackOffice te ajută să crești eficiența și veniturile parcărilor tale.
              </p>
            </div>
            {/* Right - Buttons */}
            <div data-reveal="fade-left" className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:justify-end">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 text-base shadow-lg shadow-green-600/30 hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                <LuFileText className="w-5 h-5" />
                Solicită ofertă
                <LuArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white hover:bg-white/10 text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 text-base whitespace-nowrap"
              >
                <LuCalendar className="w-5 h-5" />
                Programare demonstrație
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

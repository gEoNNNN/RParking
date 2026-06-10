import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  LuLogIn, LuLogOut, LuCreditCard, LuLayoutDashboard, LuArrowRight, LuCheck,
  LuZap, LuActivity, LuFileText, LuTrendingUp, LuSettings2, LuChevronRight,
  LuQrCode, LuCloud, LuServer, LuCode, LuWifi, LuScanLine, LuHouse,
} from 'react-icons/lu';
import { TbBarrierBlock } from 'react-icons/tb';

const heroBadges = [
  { label: 'Automatizare completă', icon: <LuZap className="w-5 h-5 text-green-600" /> },
  { label: 'Plăți cash și card', icon: <LuCreditCard className="w-5 h-5 text-green-600" /> },
  { label: 'Monitorizare în timp real', icon: <LuActivity className="w-5 h-5 text-green-600" /> },
  { label: 'Raportare centralizată', icon: <LuFileText className="w-5 h-5 text-green-600" /> },
];

const challenges = [
  'Control manual al accesului și ieșirii',
  'Lipsa raportării centralizate',
  'Monitorizare limitată și dificultăți în verificarea plăților',
  'Timp mare de procesare la intrare și la plată',
  'Lipsa unei soluții integrate și scalabile',
];

const solutionProducts = [
  { label: 'Entry Point', icon: <LuLogIn className="w-6 h-6 text-green-600" /> },
  { label: 'Exit Point', icon: <LuLogOut className="w-6 h-6 text-green-600" /> },
  { label: 'Pay Point', icon: <LuCreditCard className="w-6 h-6 text-green-600" /> },
  { label: 'BackOffice', icon: <LuLayoutDashboard className="w-6 h-6 text-green-600" /> },
  { label: 'Bariere automate', icon: <TbBarrierBlock className="w-6 h-6 text-green-600" /> },
];

const gallery = [
  { image: '/img/implementari/entry%20point.png', title: 'Entry Point', description: 'Intrare automată a tichetelor și control acces vehicule.' },
  { image: '/img/implementari/bare%20automate.png', title: 'Bariere automate', description: 'Acces rapid și sigur, cu bariere de înaltă performanță.' },
  { image: '/img/implementari/exit%20point.png', title: 'Exit Point', description: 'Validare tichet și control acces la ieșirea din parcare.' },
  { image: '/img/implementari/flux%20intrare%20iesire.png', title: 'Flux intrare – ieșire', description: 'Experiență fluidă și sigură pentru utilizatori.' },
  { image: '/img/implementari/pay%20point.png', title: 'Pay Point', description: 'Plăți cash și card, chitanță automată, interfață intuitivă.' },
  { image: '/img/implementari/control%20acces.png', title: 'Control acces', description: 'Echipamente moderne pentru verificare rapidă și sigură.' },
  { image: '/img/implementari/instalare%20profesionala.png', title: 'Instalare profesională', description: 'Implementare curată, integrată perfect în infrastructura parcării.' },
];

const usedProducts = [
  { image: '/img/implementari/RParking%20entry%20point.png', title: 'RParking Entry Point', description: 'Emitere și validare automată a tichetelor și control acces.' },
  { image: '/img/implementari/rparking%20exit%20point.png', title: 'RParking Exit Point', description: 'Validare și control acces la ieșire, integrat cu sistemul de plată.' },
  { image: '/img/implementari/rparking%20pay%20point.png', title: 'RParking Pay Point', description: 'Plăți cash și card, chitanță automată și raportare.' },
  { image: '/img/implementari/RParking%20back%20office.png', title: 'RParking BackOffice', description: 'Administrare completă, monitorizare în timp real și rapoarte avansate.' },
];

const benefits = [
  { title: 'Automatizare completă', description: 'Acces, plăți și raportare automatizate integral.', icon: <LuZap className="w-6 h-6 text-green-600" /> },
  { title: 'Reducerea intervențiilor manuale', description: 'Operațiuni eficiente și costuri operaționale mai mici.', icon: <LuSettings2 className="w-6 h-6 text-green-600" /> },
  { title: 'Monitorizare în timp real', description: 'Vizualizare live a tuturor acceselor și tranzacțiilor.', icon: <LuActivity className="w-6 h-6 text-green-600" /> },
  { title: 'Raportare centralizată', description: 'Rapoarte financiare și statistici disponibile instant.', icon: <LuFileText className="w-6 h-6 text-green-600" /> },
  { title: 'Plăți multiple', description: 'Suport pentru plăți cash, card și alte metode.', icon: <LuCreditCard className="w-6 h-6 text-green-600" /> },
  { title: 'Scalabilitate', description: 'Soluție pregătită pentru extindere ușoară.', icon: <LuTrendingUp className="w-6 h-6 text-green-600" /> },
];

const technologies = [
  { label: 'NFC Ready', icon: <LuWifi className="w-5 h-5 text-green-600" /> },
  { label: 'QR Code Ready', icon: <LuQrCode className="w-5 h-5 text-green-600" /> },
  { label: 'ANPR Ready', icon: <LuScanLine className="w-5 h-5 text-green-600" /> },
  { label: 'Cloud Ready', icon: <LuCloud className="w-5 h-5 text-green-600" /> },
  { label: 'BackOffice SaaS', icon: <LuServer className="w-5 h-5 text-green-600" /> },
  { label: 'REST API Integrations', icon: <LuCode className="w-5 h-5 text-green-600" /> },
];

export default function ImplementariPage() {
  return (
    <main>
      {/* Navbar + Logo */}
      <div className="relative">
        <Navbar />
        <Link href="/" className="absolute top-0 left-20 z-50 h-20 flex items-center">
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
              <p data-reveal data-reveal-delay="80" className="text-green-600 font-bold tracking-wide text-sm mb-3">
                IMPLEMENTARE REALĂ
              </p>
              <h1 data-reveal data-reveal-delay="150" className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-4">
                Implementare reală <span className="text-green-600">RParking</span> în Chișinău
              </h1>
              <p data-reveal data-reveal-delay="250" className="text-gray-600 text-lg leading-relaxed max-w-xl mb-8">
                Sistem complet de automatizare a accesului, plăților și monitorizării pentru parcări moderne.
              </p>

              {/* CTA buttons */}
              <div data-reveal data-reveal-delay="340" className="flex flex-wrap items-center gap-4 mb-10">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-7 py-3.5 rounded-md transition-all duration-200 text-sm shadow-md shadow-green-600/25 hover:shadow-lg hover:shadow-green-600/40 hover:scale-105 active:scale-95"
                >
                  Solicită ofertă <LuArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 border border-gray-400 hover:border-green-600 text-gray-800 hover:text-green-600 font-semibold px-7 py-3.5 rounded-md transition-all duration-200 text-sm bg-white/70 hover:bg-white hover:scale-105 active:scale-95"
                >
                  Programare demo
                </Link>
              </div>

              {/* Hero badges */}
              <div data-reveal data-reveal-delay="430" className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl">
                {heroBadges.map((b) => (
                  <div key={b.label} className="flex flex-col items-start gap-1.5">
                    <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      {b.icon}
                    </div>
                    <span className="text-gray-700 text-xs font-semibold leading-tight">{b.label}</span>
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
                <LuCheck className="w-5 h-5 text-green-600" /> Provocările clientului
              </h2>
              <ul className="space-y-4">
                {challenges.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-gray-600 text-sm">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                      <LuCheck className="w-3 h-3 text-green-600" />
                    </span>
                    {c}
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
                <LuZap className="w-5 h-5 text-green-600" /> Soluția RParking
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Am livrat un sistem complet de automatizare, format din echipamente inteligente și platforma BackOffice,
                care asigură eficiență operațională și experiență excelentă pentru utilizatori.
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:grid sm:grid-cols-5">
                {solutionProducts.map((p) => (
                  <div key={p.label} className="flex flex-col items-center text-center gap-2 w-[calc(33%-0.5rem)] sm:w-auto">
                    <div className="w-12 h-12 rounded-xl border border-green-100 bg-green-50/50 flex items-center justify-center">
                      {p.icon}
                    </div>
                    <span className="text-gray-700 text-xs font-semibold leading-tight">{p.label}</span>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Implementarea în imagini</h2>
            <div className="w-10 h-0.5 bg-green-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.map((g, idx) => (
              <div key={g.title} data-reveal data-reveal-delay={String((idx % 4) * 100)} className={`group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white ${g.title === 'Pay Point' ? 'lg:col-span-2' : ''}`}>
                <div className="relative h-44 overflow-hidden">
                  <Image src={g.image} alt={g.title} fill quality={95} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="flex items-center gap-2 text-gray-900 font-bold text-sm mb-1">
                    <LuCheck className="w-4 h-4 text-green-600 shrink-0" /> {g.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{g.description}</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Produse utilizate în această implementare</h2>
            <div className="w-10 h-0.5 bg-green-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {usedProducts.map((p, idx) => (
              <div key={p.title} data-reveal data-reveal-delay={String((idx % 4) * 100)} className="group rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-white">
                <div className="h-52 bg-gray-50 relative flex items-center justify-center p-4">
                  <Image src={p.image} alt={p.title} width={260} height={200} quality={95} className="object-contain h-full w-auto" />
                </div>
                <div className="p-5">
                  <h3 className="text-gray-900 font-bold text-base mb-1.5">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.description}</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Beneficii obținute</h2>
            <div className="w-10 h-0.5 bg-green-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, idx) => (
              <div key={b.title} data-reveal data-reveal-delay={String((idx % 3) * 100)} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                  {b.icon}
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-base mb-1">{b.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.description}</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Tehnologii integrate</h2>
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
                Pregătim următoarele implementări <span className="text-green-600">RParking</span>
              </h2>
              <p className="text-gray-600 text-sm max-w-2xl">
                Platforma RParking este pregătită pentru centre comerciale, clădiri de birouri,
                parcări rezidențiale, aeroporturi și instituții publice.
              </p>
            </div>
          </div>
          <Link
            data-reveal="fade-right"
            href="/#contact"
            className="shrink-0 inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-3.5 rounded-md transition-all duration-200 text-sm hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Solicită demonstrație <LuArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

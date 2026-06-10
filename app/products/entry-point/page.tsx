import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  LuCheck, LuArrowRight, LuChevronRight, LuHouse,
  LuQrCode, LuRadioTower, LuCreditCard, LuVolume2, LuMonitor, LuCar,
  LuCamera, LuServer, LuThermometer, LuZap, LuWifi, LuBox, LuPuzzle,
  LuLightbulb, LuWallet, LuLogOut, LuLayoutDashboard,
} from 'react-icons/lu';
import { TbBarrierBlock } from 'react-icons/tb';
import { FaParking } from 'react-icons/fa';

const heroFeatures = [
  'QR Code',
  'Asistență vocală',
  'NFC / RFID',
  'Integrare cu bariere',
  'Emitere card acces',
  'Management centralizat',
];

const keyFeatures = [
  { title: 'QR Code', accent: 'Scanner', desc: 'Scanează rapid și procesează codurile QR.', icon: <LuQrCode className="w-6 h-6 text-green-600" /> },
  { title: 'NFC / RFID', accent: 'Reader', desc: 'Citește carduri și tag-uri NFC / RFID.', icon: <LuRadioTower className="w-6 h-6 text-green-600" /> },
  { title: 'Emitere', accent: 'card acces', desc: 'Emite carduri de acces pentru utilizatori.', icon: <LuCreditCard className="w-6 h-6 text-green-600" /> },
  { title: 'Asistență', accent: 'vocală', desc: 'Ghidaj audio clar pentru utilizatori.', icon: <LuVolume2 className="w-6 h-6 text-green-600" /> },
  { title: 'Integrare', accent: 'bariere', desc: 'Deschidere automată a barierei.', icon: <TbBarrierBlock className="w-6 h-6 text-green-600" /> },
  { title: 'Management', accent: 'centralizat', desc: 'Control și monitorizare în timp real din BackOffice.', icon: <LuMonitor className="w-6 h-6 text-green-600" /> },
];

const steps = [
  { title: 'Mașina ajunge la Entry Point', desc: 'Vehiculul se apropie de terminalul de intrare.', icon: <LuCar className="w-16 h-16 text-green-600" /> },
  { title: 'Scanare QR Code / card', desc: 'Utilizatorul scanează codul QR sau apropie cardul.', icon: <LuQrCode className="w-16 h-16 text-green-600" /> },
  { title: 'Emitere card de acces', desc: 'Stația eliberează cardul de acces.', icon: <LuCreditCard className="w-16 h-16 text-green-600" /> },
  { title: 'Bariera se deschide automat', desc: 'Bariera se ridică automat după validare.', icon: <TbBarrierBlock className="w-16 h-16 text-green-600" /> },
  { title: 'Acces permis în parcare', desc: 'Vehiculul intră, accesul fiind înregistrat.', icon: <FaParking className="w-14 h-14 text-green-600" /> },
];

const hardware = [
  { n: 1, title: 'Monitor IP65 7"', desc: 'Ecran tactil rezistent' },
  { n: 2, title: 'NFC / RFID Reader', desc: 'Citire carduri și tag-uri' },
  { n: 3, title: 'QR Code Scanner', desc: 'Scanner 1D / 2D' },
  { n: 4, title: 'Card Issuing Machine', desc: 'Emitere card acces' },
  { n: 5, title: 'Speaker', desc: 'Asistență vocală' },
  { n: 6, title: 'Service Button', desc: 'Apel operator' },
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
  { label: 'Display', value: '7" Touch IP65', icon: <LuMonitor className="w-4 h-4 text-gray-400" /> },
  { label: 'QR Scanner', value: '1D / 2D', icon: <LuQrCode className="w-4 h-4 text-gray-400" /> },
  { label: 'NFC / RFID', value: '13.56 MHz', icon: <LuRadioTower className="w-4 h-4 text-gray-400" /> },
  { label: 'Card Issuing', value: 'Automat', icon: <LuCreditCard className="w-4 h-4 text-gray-400" /> },
  { label: 'Speaker', value: '2W / 4Ω', icon: <LuVolume2 className="w-4 h-4 text-gray-400" /> },
  { label: 'LED Status', value: 'Da', icon: <LuLightbulb className="w-4 h-4 text-gray-400" /> },
  { label: 'Comunicație', value: 'Ethernet / 4G', icon: <LuWifi className="w-4 h-4 text-gray-400" /> },
  { label: 'Protocol', value: 'TCP/IP, HTTPS', icon: <LuServer className="w-4 h-4 text-gray-400" /> },
  { label: 'Temperatură', value: '-20°C ~ +60°C', icon: <LuThermometer className="w-4 h-4 text-gray-400" /> },
  { label: 'Alimentare', value: '220V AC', icon: <LuZap className="w-4 h-4 text-gray-400" /> },
  { label: 'Material', value: 'Metal IP54', icon: <LuBox className="w-4 h-4 text-gray-400" /> },
  { label: 'Integrare API', value: 'Da', icon: <LuPuzzle className="w-4 h-4 text-gray-400" /> },
];

const integrations = [
  { label: 'QR Code', icon: <LuQrCode className="w-7 h-7 text-green-600" /> },
  { label: 'NFC / RFID', icon: <LuRadioTower className="w-7 h-7 text-green-600" /> },
  { label: 'Carduri acces', icon: <LuCreditCard className="w-7 h-7 text-green-600" /> },
  { label: 'ANPR', icon: <LuCamera className="w-7 h-7 text-green-600" /> },
  { label: 'Bariere', icon: <TbBarrierBlock className="w-7 h-7 text-green-600" /> },
  { label: 'Pay Point', icon: <LuWallet className="w-7 h-7 text-green-600" /> },
  { label: 'Exit Point', icon: <LuLogOut className="w-7 h-7 text-green-600" /> },
  { label: 'BackOffice', icon: <LuLayoutDashboard className="w-7 h-7 text-green-600" /> },
];

const ecosystem = [
  { title: 'Pay Point', desc: 'Plată automată cu numerar și card.', href: '/products/pay-point', image: '/img/produs3.png', icon: null },
  { title: 'Exit Point', desc: 'Stație de ieșire cu card sau tichet.', href: '/products/exit-point-cardpass', image: '/img/produs2.png', icon: null },
  { title: 'BackOffice', desc: 'Administrare și raportare în timp real.', href: '/products/backoffice', image: null, icon: <LuLayoutDashboard className="w-10 h-10 text-green-600" /> },
];

export default function EntryPointPage() {
  return (
    <main>
      {/* Navbar + Logo */}
      <div className="relative">
        <Navbar />
        <Link href="/" className="absolute top-0 left-20 z-50 h-20 flex items-center">
          <Image src="/img/logo.png" alt="RTi Parking Logo" width={210} height={80} priority className="object-contain" />
        </Link>

        {/* ── Hero ── */}
        <section className="relative w-full overflow-hidden bg-white">
          {/* Desktop: Image full width from left */}
          <div className="hidden lg:block overflow-hidden" style={{ maxHeight: '85vh' }}>
            <Image src="/img/produse/entry point.png" alt="" width={1627} height={967} className="w-full h-auto block object-cover" style={{ objectPosition: 'center top' }} quality={95} priority />
          </div>
          {/* Desktop fog - compact over text area */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none" 
            style={{ 
              background: 'radial-gradient(ellipse 60% 110% at 5% 45%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 20%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.6) 60%, transparent 80%)'
            }} 
          />

          {/* Mobile image */}
          <div className="lg:hidden absolute inset-0 overflow-hidden" style={{ maxHeight: '85vh' }}>
            <Image src="/img/produse/entry point.png" alt="" fill className="object-cover" style={{ objectPosition: 'center top' }} quality={95} priority />
          </div>
          {/* Mobile fog */}
          <div className="lg:hidden absolute inset-0 bg-linear-to-r from-white via-white/95 via-40% via-white/85 via-65% to-white/50 pointer-events-none" />

          {/* Content */}
          <div className="relative lg:absolute lg:inset-0 z-10 flex flex-col justify-start pt-36 lg:pt-52 pb-12 px-6 lg:pl-24 min-h-[500px] lg:min-h-0">
            <div className="max-w-xl">
              <h1 data-reveal data-reveal-delay="80" className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-5">
                Entry Point
              </h1>
              <p data-reveal data-reveal-delay="250" className="text-gray-600 text-lg leading-relaxed max-w-xl mb-8">
                Stație inteligentă pentru controlul accesului în parcări moderne.
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
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-7 py-3.5 rounded-md transition-all duration-200 text-sm shadow-md shadow-green-600/25 hover:shadow-lg hover:shadow-green-600/40 hover:scale-105 active:scale-95"
                >
                  Solicită ofertă <LuArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 border border-gray-400 hover:border-green-600 text-gray-800 hover:text-green-600 font-semibold px-7 py-3.5 rounded-md transition-all duration-200 text-sm bg-white/70 hover:bg-white hover:scale-105 active:scale-95"
                >
                  Programare demonstrație
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
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Funcționalități cheie</h2>
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
      <section className="py-16" style={{ backgroundColor: '#f7f9f4' }}>
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

      {/* ── Componente hardware ── */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Componente hardware</h2>
            <div className="w-12 h-0.5 bg-green-500" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Left: technical diagram with labels */}
            <div data-reveal="fade-left" className="bg-white rounded-2xl p-4 flex items-center justify-center border border-gray-100">
              <Image src="/img/produse/entry point.jpg" alt="Entry Point componente" width={600} height={800} className="w-full lg:w-auto lg:h-[480px] max-h-[70vw] lg:max-h-none object-contain" />
            </div>

            {/* Right: component descriptions */}
            <div data-reveal="fade-right" className="flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Componente principale</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center shrink-0">1</div>
                  <div>
                    <p className="text-gray-900 font-semibold">Monitor 7 inch</p>
                    <p className="text-gray-500 text-sm">Antivandalism, IP65, afișaj tactil rezistent</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center shrink-0">2</div>
                  <div>
                    <p className="text-gray-900 font-semibold">NFC Reader</p>
                    <p className="text-gray-500 text-sm">Citire carduri RFID/NFC pentru acces rapid</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center shrink-0">3</div>
                  <div>
                    <p className="text-gray-900 font-semibold">2D / QR Code Scanner</p>
                    <p className="text-gray-500 text-sm">Scanare coduri QR și coduri de bare 2D</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center shrink-0">4</div>
                  <div>
                    <p className="text-gray-900 font-semibold">Card Issuing Machine</p>
                    <p className="text-gray-500 text-sm">Dispenser automat pentru carduri temporare</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center shrink-0">5</div>
                  <div>
                    <p className="text-gray-900 font-semibold">Built-in Speaker</p>
                    <p className="text-gray-500 text-sm">Difuzor integrat pentru asistență vocală</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center shrink-0">6</div>
                  <div>
                    <p className="text-gray-900 font-semibold">Service Button</p>
                    <p className="text-gray-500 text-sm">Buton de ajutor pentru asistență la distanță</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Specificații tehnice + Integrare completă ── */}
      <section className="py-16" style={{ backgroundColor: '#f7f9f4' }}>
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Specs */}
            <div data-reveal="fade-left">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Specificații tehnice</h2>
                <div className="w-12 h-0.5 bg-green-500" />
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 grid sm:grid-cols-2 gap-x-8">
                {specs.map((s) => (
                  <div key={s.label} className="flex items-center justify-between gap-3 py-2.5 border-b border-gray-100">
                    <span className="flex items-center gap-2 text-gray-500 text-sm">
                      {s.icon}
                      {s.label}
                    </span>
                    <span className="text-gray-900 font-semibold text-sm text-right">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Integrations */}
            <div data-reveal="fade-right">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Integrare completă</h2>
                <div className="w-12 h-0.5 bg-green-500" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10">
                {integrations.map((i) => (
                  <div key={i.label} className="flex flex-col items-center text-center gap-2">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-green-300">
                      {i.icon}
                    </div>
                    <span className="text-gray-700 text-xs font-semibold leading-tight">{i.label}</span>
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
          <Image src="/img/produse/entry point.png" alt="" fill className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-linear-to-r from-gray-950 via-gray-950/70 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade-left" className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
              Doriți să automatizați <span className="text-green-500">accesul</span> în parcarea dvs.?
            </h2>
            <p className="text-gray-400 text-base mb-8">
              Echipa noastră vă stă la dispoziție pentru a vă oferi cea mai bună soluție adaptată nevoilor dvs.
            </p>
            <div className="flex flex-wrap items-center gap-4">
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

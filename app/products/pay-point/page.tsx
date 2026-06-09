import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  LuCheck, LuArrowRight, LuChevronRight, LuHouse,
  LuQrCode, LuRadioTower, LuCreditCard, LuMonitor, LuPrinter,
  LuCamera, LuServer, LuThermometer, LuZap, LuWifi, LuBox, LuPuzzle,
  LuBanknote, LuCoins, LuReceipt, LuPointer, LuShieldCheck,
  LuLogIn, LuLogOut, LuLayoutDashboard, LuSmartphone, LuBuilding2,
} from 'react-icons/lu';
import { TbBarrierBlock } from 'react-icons/tb';
import { FaParking } from 'react-icons/fa';

const heroFeatures = [
  'Plată cu card',
  'QR Code',
  'Plată numerar',
  'NFC / RFID',
  'Rest automat',
  'Bon fiscal',
];

const keyFeatures = [
  { title: 'Plată', accent: 'cu card', desc: 'Acceptă carduri bancare contactless și cu CIP.', icon: <LuCreditCard className="w-6 h-6 text-green-600" /> },
  { title: 'Plată', accent: 'numerar', desc: 'Acceptă bancnote și monede în siguranță.', icon: <LuBanknote className="w-6 h-6 text-green-600" /> },
  { title: 'Rest', accent: 'automat', desc: 'Returnează restul rapid și în siguranță.', icon: <LuCoins className="w-6 h-6 text-green-600" /> },
  { title: 'Bon', accent: 'fiscal', desc: 'Emite bon fiscal conform legislației în vigoare.', icon: <LuReceipt className="w-6 h-6 text-green-600" /> },
  { title: 'QR', accent: 'Code', desc: 'Scanează și procesează plata prin QR Code.', icon: <LuQrCode className="w-6 h-6 text-green-600" /> },
  { title: 'NFC', accent: 'RFID', desc: 'Suportă plăți și validări prin NFC / RFID.', icon: <LuRadioTower className="w-6 h-6 text-green-600" /> },
];

const steps = [
  { title: 'Șoferul selectează opțiunea de plată', desc: 'Pe ecranul tactil, intuitiv și multilingv.', icon: <LuPointer className="w-16 h-16 text-green-600" /> },
  { title: 'Alege metoda de plată (card sau numerar)', desc: 'Card bancar, numerar sau plată contactless.', icon: <LuCreditCard className="w-16 h-16 text-green-600" /> },
  { title: 'Sistemul validează plata', desc: 'Procesare securizată și verificare în timp real.', icon: <LuShieldCheck className="w-16 h-16 text-green-600" /> },
  { title: 'Primește bon fiscal și restul', desc: 'Bon fiscal emis și rest returnat dacă este cazul.', icon: <LuReceipt className="w-16 h-16 text-green-600" /> },
  { title: 'Ieșirea din parcare este permisă', desc: 'Acces validat pentru ieșirea din parcare.', icon: <FaParking className="w-14 h-14 text-green-600" /> },
];

const hardware = [
  { n: 1, title: 'Monitor 21.5" Touch', desc: 'Ecran tactil rezistent' },
  { n: 2, title: 'NFC / RFID Reader', desc: 'Citire carduri și tag-uri' },
  { n: 3, title: 'Card Reader', desc: 'Citire carduri bancare' },
  { n: 4, title: 'QR Code Scanner', desc: 'Scanare 1D / 2D' },
  { n: 5, title: 'Printer', desc: 'Imprimantă bon fiscal' },
  { n: 6, title: 'Cash Acceptor', desc: 'Acceptare bancnote' },
  { n: 7, title: 'Coin Acceptor', desc: 'Acceptare monede' },
  { n: 8, title: 'Cash Dispenser', desc: 'Returnare rest automat' },
];

const callouts = [
  { n: 1, top: '21%', left: '46%' },
  { n: 2, top: '37%', left: '34%' },
  { n: 3, top: '37%', left: '56%' },
  { n: 4, top: '52%', left: '40%' },
  { n: 5, top: '44%', left: '46%' },
  { n: 6, top: '50%', left: '57%' },
  { n: 7, top: '57%', left: '57%' },
  { n: 8, top: '64%', left: '45%' },
];

const specs = [
  { label: 'Display', value: '21.5" Touch IP65', icon: <LuMonitor className="w-4 h-4 text-gray-400" /> },
  { label: 'Plată card', value: 'EMV Contactless', icon: <LuCreditCard className="w-4 h-4 text-gray-400" /> },
  { label: 'NFC / RFID', value: '13.56 MHz', icon: <LuRadioTower className="w-4 h-4 text-gray-400" /> },
  { label: 'QR Scanner', value: '1D / 2D', icon: <LuQrCode className="w-4 h-4 text-gray-400" /> },
  { label: 'Imprimantă', value: 'Termică 80mm', icon: <LuPrinter className="w-4 h-4 text-gray-400" /> },
  { label: 'Bancnote', value: 'Acceptare & validare', icon: <LuBanknote className="w-4 h-4 text-gray-400" /> },
  { label: 'Monede', value: 'Acceptare & returnare', icon: <LuCoins className="w-4 h-4 text-gray-400" /> },
  { label: 'Rest automat', value: 'Da', icon: <LuReceipt className="w-4 h-4 text-gray-400" /> },
  { label: 'Comunicație', value: 'Ethernet / 4G', icon: <LuWifi className="w-4 h-4 text-gray-400" /> },
  { label: 'Alimentare', value: '220V AC', icon: <LuZap className="w-4 h-4 text-gray-400" /> },
  { label: 'Material', value: 'Metal IP54', icon: <LuBox className="w-4 h-4 text-gray-400" /> },
  { label: 'Integrare API', value: 'Da', icon: <LuPuzzle className="w-4 h-4 text-gray-400" /> },
];

const integrations = [
  { label: 'Entry Point', icon: <LuLogIn className="w-7 h-7 text-green-600" /> },
  { label: 'Exit Point', icon: <LuLogOut className="w-7 h-7 text-green-600" /> },
  { label: 'BackOffice', icon: <LuLayoutDashboard className="w-7 h-7 text-green-600" /> },
  { label: 'Bariere', icon: <TbBarrierBlock className="w-7 h-7 text-green-600" /> },
  { label: 'ANPR Camera', icon: <LuCamera className="w-7 h-7 text-green-600" /> },
  { label: 'Mobile App', icon: <LuSmartphone className="w-7 h-7 text-green-600" /> },
  { label: 'Carduri bancare', icon: <LuCreditCard className="w-7 h-7 text-green-600" /> },
  { label: 'Sisteme terțe', icon: <LuBuilding2 className="w-7 h-7 text-green-600" /> },
];

const ecosystem = [
  { title: 'Entry Point', desc: 'Stație de intrare care emite cardul de acces.', href: '/products/entry-point', image: '/img/produs1.png', icon: null },
  { title: 'Exit Point', desc: 'Stație de ieșire cu validare card sau tichet.', href: '/products/exit-point-cardpass', image: '/img/produs2.png', icon: null },
  { title: 'BackOffice', desc: 'Administrare și raportare în timp real.', href: '/products/backoffice', image: null, icon: <LuLayoutDashboard className="w-10 h-10 text-green-600" /> },
];

export default function PayPointPage() {
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
            <Image src="/img/produse/paypoint.png" alt="" width={1672} height={941} className="w-full h-auto block object-cover" style={{ objectPosition: 'center top' }} quality={95} priority />
          </div>
          {/* Desktop fog - compact over text area */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none" 
            style={{ 
              background: 'radial-gradient(ellipse 60% 110% at 5% 45%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 20%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.6) 60%, transparent 80%)'
            }} 
          />

          {/* Mobile image */}
          <div className="lg:hidden absolute inset-0 overflow-hidden" style={{ maxHeight: '85vh' }}>
            <Image src="/img/produse/paypoint.png" alt="" fill className="object-cover" style={{ objectPosition: 'center top' }} quality={95} priority />
          </div>
          {/* Mobile fog */}
          <div className="lg:hidden absolute inset-0 bg-linear-to-r from-white via-white/95 via-30% via-white/85 via-50% to-transparent pointer-events-none" />

          {/* Content */}
          <div className="relative lg:absolute lg:inset-0 z-10 flex flex-col justify-start pt-36 lg:pt-52 pb-12 px-6 lg:pl-24 min-h-[500px] lg:min-h-0">
            <div className="max-w-xl">
              <p data-reveal data-reveal-delay="80" className="text-green-600 font-bold tracking-wide text-sm mb-4">
                PAY POINT
              </p>
              <h1 data-reveal data-reveal-delay="150" className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-5">
                Pay Point
              </h1>
              <p data-reveal data-reveal-delay="250" className="text-gray-600 text-lg leading-relaxed max-w-xl mb-8">
                Terminal automat de plată pentru parcări moderne.
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

      {/* ── Funcționalități principale ── */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Funcționalități principale</h2>
            <div className="w-12 h-0.5 bg-green-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            {keyFeatures.map((f, idx) => (
              <div
                key={f.title + f.accent}
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
              <Image src="/img/produse/pay point.jpg" alt="Pay Point componente" width={600} height={800} className="h-[480px] w-auto object-contain" />
            </div>

            {/* Right: component descriptions */}
            <div data-reveal="fade-right" className="flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Componente principale</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center shrink-0">1</div>
                  <div>
                    <p className="text-gray-900 font-semibold">Monitor 19 inch</p>
                    <p className="text-gray-500 text-sm">Antivandalism, IP65, afișaj tactil color</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center shrink-0">2</div>
                  <div>
                    <p className="text-gray-900 font-semibold">NFC Reader</p>
                    <p className="text-gray-500 text-sm">Citire carduri pentru plăți rapide</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center shrink-0">3</div>
                  <div>
                    <p className="text-gray-900 font-semibold">2D / QR Code Scanner</p>
                    <p className="text-gray-500 text-sm">Scanare coduri pentru verificare bilete</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center shrink-0">4</div>
                  <div>
                    <p className="text-gray-900 font-semibold">Bill Validator</p>
                    <p className="text-gray-500 text-sm">Acceptor bancnote cu verificare autenticitate</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center shrink-0">5</div>
                  <div>
                    <p className="text-gray-900 font-semibold">Coin Acceptor</p>
                    <p className="text-gray-500 text-sm">Acceptor monede cu recunoaștere multi-valută</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center shrink-0">6</div>
                  <div>
                    <p className="text-gray-900 font-semibold">Cash Dispensing</p>
                    <p className="text-gray-500 text-sm">Automat de rest bancnote</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center shrink-0">7</div>
                  <div>
                    <p className="text-gray-900 font-semibold">Fiscal Printer</p>
                    <p className="text-gray-500 text-sm">Imprimantă fiscală RTI 5000F/5000 INB/RAFS</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center shrink-0">8</div>
                  <div>
                    <p className="text-gray-900 font-semibold">Smart UPS</p>
                    <p className="text-gray-500 text-sm">Sursă de alimentare neîntreruptibilă</p>
                  </div>
                </div>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Integrare și compatibilitate</h2>
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
              <p className="text-gray-500 text-sm leading-relaxed mt-6">
                Pay Point este complet integrat în ecosistemul <span className="text-green-600 font-semibold">RParking</span> și poate fi configurat pentru orice tip de tarifare și politică de parcare.
              </p>
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
          <Image src="/img/produse/paypoint.png" alt="" fill className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-linear-to-r from-gray-950 via-gray-950/70 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div data-reveal="fade-left" className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
              Vrei o experiență de plată <span className="text-green-500">rapidă</span> și sigură în parcarea ta?
            </h2>
            <p className="text-gray-400 text-base mb-8">
              Echipa noastră te ajută să configurezi cea mai bună soluție de plată pentru nevoile tale.
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

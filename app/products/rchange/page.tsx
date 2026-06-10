import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  LuCheck, LuArrowRight,
  LuClock, LuZap, LuShieldCheck, LuBanknote,
  LuGlobe, LuBuilding2, LuHotel, LuPlane,
  LuBus, LuCamera, LuMonitor, LuSettings,
  LuWifi, LuSmartphone, LuWallet,
} from 'react-icons/lu';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'RChange – Schimb valutar automat 24/7 | RParking',
  description:
    'Aparat de schimb valutar self-service: acceptă bancnote, eliberează monede, ecran tactil, disponibil non-stop, integrare BackOffice.',
  keywords: [
    'schimb valutar automat',
    'aparat schimb valutar',
    'exchange machine',
    'schimb bancnote monede',
    'dispenser monede',
    'validator bancnote',
    'RChange',
    'schimb valutar self-service',
  ],
  alternates: {
    canonical: '/products/rchange',
  },
  openGraph: {
    title: 'RChange – Schimb valutar automat 24/7',
    description:
      'Soluție self-service pentru schimb valutar: acceptă bancnote, eliberează monede, disponibil non-stop.',
    url: `${SITE_URL}/products/rchange`,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'RChange RParking',
      },
    ],
  },
};

const heroFeatures = [
  'Disponibil non-stop',
  'Schimb rapid și simplu',
  'Fără comisioane ascunse',
];

const keyFeatures = [
  { title: 'Disponibil', accent: 'non-stop', desc: 'Funcționează 24/7 fără supraveghere umană.', icon: <LuClock className="w-6 h-6 text-green-600" /> },
  { title: 'Schimb rapid', accent: 'și simplu', desc: 'Validare instantă și eliberare automată de monede.', icon: <LuZap className="w-6 h-6 text-green-600" /> },
  { title: 'Fără comisioane', accent: 'ascunse', desc: 'Transparență totală în taxare.', icon: <LuShieldCheck className="w-6 h-6 text-green-600" /> },
];

const steps = [
  { n: '01', title: 'Introduci bancnota', desc: 'Clientul introduce bancnota în fanta de validare.', image: '/img/exchange/pas3.png' },
  { n: '02', title: 'Aparatul verifică', desc: 'Sistemul validează bancnota și calculează suma în monede.', image: '/img/exchange/pas2.png' },
  { n: '03', title: 'Monedele sunt eliberate', desc: 'Dispenserul pregătește automat monedele necesare.', image: '/img/exchange/pas1.png' },
  { n: '04', title: 'Ridici monedele', desc: 'Tranzacția este finalizată în doar câteva secunde.', image: '/img/exchange/pas4.png' },
];

const componentFeatures = [
  { title: 'Ecran tactil intuitiv', desc: 'Interfață prietenoasă cu instrucțiuni clare, pas cu pas.' },
  { title: 'Validator de bancnote', desc: 'Detectare avansată a autenticității bancnotelor.' },
  { title: 'Dispenser automat de monede', desc: 'Eliberare rapidă și precisă a monedelor.' },
  { title: 'Acceptă bancnote și eliberează monede', desc: 'Schimb complet automatizat, fără personal.' },
  { title: 'Design compact și modern', desc: 'Se integrează elegant în orice locație.' },
];

const locations = [
  { icon: <LuPlane className="w-8 h-8 text-green-600" />, label: 'Aeroporturi' },
  { icon: <LuBuilding2 className="w-8 h-8 text-green-600" />, label: 'Centre comerciale' },
  { icon: <LuHotel className="w-8 h-8 text-green-600" />, label: 'Hoteluri' },
  { icon: <LuBus className="w-8 h-8 text-green-600" />, label: 'Gări' },
  { icon: <LuGlobe className="w-8 h-8 text-green-600" />, label: 'Autogări' },
  { icon: <LuCamera className="w-8 h-8 text-green-600" />, label: 'Zone turistice' },
];

const specs = [
  { label: 'Display', value: '10" Touch', icon: <LuMonitor className="w-4 h-4 text-gray-400" /> },
  { label: 'Validator', value: 'Multi-valută', icon: <LuBanknote className="w-4 h-4 text-gray-400" /> },
  { label: 'Dispenser', value: '8 tipuri monede', icon: <LuWallet className="w-4 h-4 text-gray-400" /> },
  { label: 'Capacitate', value: '2000+ monede', icon: <LuShieldCheck className="w-4 h-4 text-gray-400" /> },
  { label: 'Viteză', value: '< 10 secunde', icon: <LuZap className="w-4 h-4 text-gray-400" /> },
  { label: 'Comunicație', value: 'Ethernet / 4G', icon: <LuWifi className="w-4 h-4 text-gray-400" /> },
  { label: 'Management', value: 'Cloud BackOffice', icon: <LuSettings className="w-4 h-4 text-gray-400" /> },
  { label: 'Plăți', value: 'Cash & Card', icon: <LuSmartphone className="w-4 h-4 text-gray-400" /> },
];

export default function RChangePage() {
  return (
    <>
      <div className="relative">
        <Navbar />
        <Link href="/" className="absolute top-0 left-1/2 -translate-x-[38%] lg:left-20 lg:translate-x-0 z-50 h-20 flex items-center">
          <Image src="/img/logo.png" alt="RTi Parking Logo" width={210} height={80} priority className="object-contain" />
        </Link>
      </div>
      <main className="bg-white">
        {/* ── Hero ── */}
        <section className="relative w-full overflow-hidden bg-white">
          {/* Desktop: Image full width from left */}
          <div className="hidden lg:block overflow-hidden" style={{ maxHeight: '85vh' }}>
            <Image src="/img/exchange/bg.png" alt="" width={1627} height={967} className="w-full h-auto block object-cover" style={{ objectPosition: 'center top' }} quality={95} priority />
          </div>
          {/* Desktop fog - compact over text area */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 110% at 5% 45%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 20%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.6) 60%, transparent 80%)'
            }}
          />

          {/* Mobile image */}
          <div className="lg:hidden absolute inset-0 overflow-hidden" style={{ maxHeight: '85vh' }}>
            <Image src="/img/exchange/bg.png" alt="" fill className="object-cover" style={{ objectPosition: 'center top' }} quality={95} priority />
          </div>
          {/* Mobile fog */}
          <div className="lg:hidden absolute inset-0 bg-linear-to-r from-white via-white/95 via-40% via-white/85 via-65% to-white/50 pointer-events-none" />

          {/* Content */}
          <div className="relative lg:absolute lg:inset-0 z-10 flex flex-col justify-start pt-36 lg:pt-52 pb-12 px-6 lg:pl-16 min-h-[500px] lg:min-h-0">
            <div className="max-w-xl">
              <h1 data-reveal data-reveal-delay="80" className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-5">
                RChange
              </h1>
              <p data-reveal data-reveal-delay="250" className="text-gray-600 text-lg leading-relaxed max-w-xl mb-8">
                Schimb valutar automat disponibil 24/7. Soluție self-service pentru schimb valutar rapid, simlu și sigur.
              </p>

              {/* Hero Features */}
              <div data-reveal data-reveal-delay="340" className="grid grid-cols-2 gap-x-8 gap-y-3 mb-8 max-w-lg">
                {heroFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <LuCheck className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700 text-sm font-semibold">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div data-reveal data-reveal-delay="430" className="flex flex-wrap items-center gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-7 py-3.5 rounded-md transition-all duration-200 text-sm shadow-md shadow-green-600/25 hover:shadow-lg hover:shadow-green-600/40 hover:scale-105 active:scale-95"
                >
                  Solicită ofertă
                  <LuArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#specs"
                  className="inline-flex items-center gap-2 border border-gray-400 hover:border-green-600 text-gray-800 hover:text-green-600 font-semibold px-7 py-3.5 rounded-md transition-all duration-200 text-sm bg-white/60 hover:bg-white hover:scale-105 active:scale-95"
                >
                  Vezi detalii tehnice
                  <LuArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Key Features Section ── */}
        <section className="py-20 bg-white">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Schimb valutar <span className="text-green-600">inteligent</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                RChange este soluția ideală pentru locațiile cu trafic intens de turiști și călători. Oferă schimb valutar rapid, fără comisioane ascunse și disponibil non-stop.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {keyFeatures.map((f, i) => (
                <div
                  key={i}
                  data-reveal="fade-up"
                  data-reveal-delay={i * 100}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-5">
                    {f.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">
                    {f.title} <span className="text-green-600">{f.accent}</span>
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Components Section ── */}
        <section className="py-24 bg-gray-50 overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Terminal showcase */}
              <div data-reveal="fade-right" className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-green-100 to-green-50 rounded-[2rem] blur-2xl opacity-70" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-950">
                  <Image
                    src="/img/exchange/terminal.png"
                    alt="Terminal RChange"
                    width={1024}
                    height={819}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Right - Feature list */}
              <div data-reveal="fade-left">
                <span className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-3 block">Echipament</span>
                <h2 className="text-4xl font-bold text-gray-900 mb-5">Componente <span className="text-green-600">principale</span></h2>
                <p className="text-gray-500 leading-relaxed mb-8">
                  Fiecare terminal RChange integrează componente de înaltă calitate pentru o experiență de schimb valutar rapidă și sigură.
                </p>
                <ul className="space-y-4">
                  {componentFeatures.map((f) => (
                    <li key={f.title} className="flex items-start gap-4">
                      <span className="w-9 h-9 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                        <LuCheck className="w-4 h-4 text-green-600" />
                      </span>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{f.title}</h4>
                        <p className="text-gray-500 text-sm mt-0.5">{f.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Locations Section ── */}
        <section className="py-20 bg-white">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Unde poate fi instalat</h2>
              <div className="w-12 h-0.5 bg-green-500 mx-auto" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {locations.map((loc, i) => (
                <div key={i} data-reveal="fade-up" className="flex flex-col items-center text-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center">
                    {loc.icon}
                  </div>
                  <span className="text-gray-700 text-sm font-medium leading-tight">{loc.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it Works ── */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
            <div className="text-center mb-14">
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-3 block">Proces simplu</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Cum funcționează?</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Patru pași simpli pentru un schimb valutar rapid și automat</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, idx) => (
                <div
                  key={step.title}
                  data-reveal="fade-up"
                  data-reveal-delay={idx * 100}
                  className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Dark gradient for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
                    {/* Number badge */}
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-green-500 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-green-900/40">
                      {step.n}
                    </div>
                    {/* Text */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-bold text-lg mb-1 leading-tight">{step.title}</h3>
                      <p className="text-gray-300 text-sm leading-snug">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Specs Section ── */}
        <section id="specs" className="py-20 bg-white">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-10 items-stretch">
              {/* Specs */}
              <div data-reveal="fade-left" className="flex flex-col">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Specificații tehnice</h2>
                  <div className="w-12 h-0.5 bg-green-500" />
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 grid sm:grid-cols-2 gap-x-8 flex-1">
                  {specs.map((s) => (
                    <div key={s.label} className="flex items-center justify-between gap-3 py-2.5 border-b border-gray-100">
                      <span className="flex items-center gap-2 text-gray-500 text-sm">
                        {s.icon}
                        {s.label}
                      </span>
                      <span className="text-gray-900 font-medium text-sm">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Integration */}
              <div data-reveal="fade-right" className="flex flex-col">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Integrare completă</h2>
                  <div className="w-12 h-0.5 bg-green-500" />
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex-1 flex flex-col justify-center">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    RChange se integrează perfect cu platforma BackOffice pentru monitorizare în timp real a tranzacțiilor, stocului de monede și rapoarte detaliate.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['BackOffice', 'Cloud', 'Rapoarte', 'Monitorizare'].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="relative py-20 bg-gray-900 overflow-hidden">
          {/* Coins decoration */}
          <div className="absolute -left-10 -bottom-8 w-72 opacity-90 pointer-events-none select-none hidden md:block">
            <Image src="/img/exchange/banuti.png" alt="" width={400} height={280} className="w-full h-auto drop-shadow-2xl" />
          </div>
          <div className="absolute right-0 top-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="md:pl-64">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Simplu. Rapid. <span className="text-green-400">Disponibil 24/7.</span>
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Oferă clienților tăi o experiență modernă de schimb valutar.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-md transition-all duration-200 hover:scale-105 shadow-lg shadow-green-900/40"
                >
                  Solicită ofertă
                  <LuArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="https://wa.me/37369116121" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-6 py-3 rounded-md transition-all duration-200"
                >
                  Programează demonstrație
                  <LuArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

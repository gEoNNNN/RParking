import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  LuCheck, LuArrowRight, LuHouse,
  LuClock, LuZap, LuShieldCheck, LuBanknote,
  LuGlobe, LuBuilding2, LuHotel, LuPlane,
  LuBus, LuCamera, LuMonitor, LuSettings,
  LuWifi, LuSmartphone, LuWallet,
} from 'react-icons/lu';

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
  { title: 'Introduci bancnota', desc: 'Clientul introduce bancnota în aparat.', icon: <LuBanknote className="w-16 h-16 text-green-600" /> },
  { title: 'Aparatul verifică', desc: 'Sistemul validează bancnota și calculează suma.', icon: <LuCheck className="w-16 h-16 text-green-600" /> },
  { title: 'Primești moneda', desc: 'Aparatul eliberează automat monedele corespunzătoare.', icon: <LuWallet className="w-16 h-16 text-green-600" /> },
  { title: 'Ridici monedele', desc: 'Tranzacția este finalizată în câteva secunde.', icon: <LuArrowRight className="w-16 h-16 text-green-600" /> },
];

const components = [
  {
    n: 1,
    title: 'Ecran tactil intuitiv',
    desc: 'Interfață prietenoasă cu instrucțiuni clare pentru utilizatori.',
    image: '/img/exchange/pas2.png'
  },
  {
    n: 2,
    title: 'Validator bancnote',
    desc: 'Detectare avansată a autenticității bancnotelor.',
    image: '/img/exchange/pas1.png'
  },
  {
    n: 3,
    title: 'Dispenser monede',
    desc: 'Eliberare rapidă și precisă a monedelor.',
    image: '/img/exchange/pas4.png'
  },
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
        <Link href="/" className="absolute top-0 left-20 z-50 h-20 flex items-center">
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
          <div className="lg:hidden absolute inset-0 bg-linear-to-r from-white via-white/95 via-30% via-white/85 via-50% to-transparent pointer-events-none" />

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
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Image */}
              <div data-reveal="fade-right" className="relative rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto">
                <Image
                  src="/img/exchange/terminal.png"
                  alt="RChange Terminal"
                  width={400}
                  height={500}
                  className="object-cover w-full h-auto"
                />
              </div>

              {/* Right - Content */}
              <div data-reveal="fade-left">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Schimb valutar <span className="text-green-600">inteligent</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  RChange este soluția ideală pentru locațiile cu trafic intens de turiști și călători. Oferă schimb valutar rapid, fără comisioane ascunse și disponibil non-stop.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  {keyFeatures.map((f, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                        {f.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {f.title} <span className="text-green-600">{f.accent}</span>
                        </h4>
                        <p className="text-gray-500 text-sm mt-1">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Components Section ── */}
        <section className="py-24 bg-white">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
            <div className="text-center mb-16">
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-3 block">Echipamente incluse</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Componentele <span className="text-green-600">RChange</span></h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Sistem complet format din trei componente principale pentru o experiență fluidă</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {components.map((c, i) => (
                <div
                  key={i}
                  data-reveal="fade-up"
                  data-reveal-delay={i * 100}
                  className="group flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white border border-gray-100"
                >
                  {/* Image - white bg same as card, no padding, full image visible */}
                  <div className="relative w-full bg-white" style={{ aspectRatio: '1/1' }}>
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-green-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                      {c.n}
                    </div>
                  </div>
                  <div className="h-px bg-gray-100 mx-6" />

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{c.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{c.desc}</p>
                    <div className="mt-5 flex items-center gap-1.5 text-green-600 text-sm font-semibold">
                      <span>Componentă esențială</span>
                      <LuArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Locations Section ── */}
        <section className="py-20 bg-gray-50">
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
        <section className="py-20 bg-white">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
            <div className="text-center mb-14">
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
                    <p className="text-gray-900 font-bold text-sm leading-tight max-w-48">{step.title}</p>
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

        {/* ── Specs Section ── */}
        <section id="specs" className="py-20 bg-gray-50">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
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
        <section className="py-20 bg-gray-900">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Simpliu. Rapid. Disponibil 24/7.
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Oferă clienților tăi o experiență modernă de schimb valutar.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-md transition-all duration-200 hover:scale-105"
                >
                  Solicită ofertă
                  <LuArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#contact"
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

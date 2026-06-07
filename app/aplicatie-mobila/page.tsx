import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  LuHouse, LuChevronRight, LuArrowRight, LuCheck,
  LuSmartphone, LuQrCode, LuCreditCard, LuBell,
  LuMapPin, LuShieldCheck, LuClock, LuTrendingUp,
} from 'react-icons/lu';

const features = [
  {
    title: 'Scanare QR',
    desc: 'Acces rapid prin scanarea codului QR la intrare și ieșire.',
    icon: <LuQrCode className="w-6 h-6 text-white" />,
  },
  {
    title: 'Plăți mobile',
    desc: 'Achitare securizată direct din aplicație cu cardul.',
    icon: <LuCreditCard className="w-6 h-6 text-white" />,
  },
  {
    title: 'Notificări',
    desc: 'Alerte instant pentru timp de parcare și plăți.',
    icon: <LuBell className="w-6 h-6 text-white" />,
  },
  {
    title: 'Istoric complet',
    desc: 'Vizualizare istoric parcări și tranzacții.',
    icon: <LuClock className="w-6 h-6 text-white" />,
  },
  {
    title: 'Locuri disponibile',
    desc: 'Verificare în timp real a locurilor libere.',
    icon: <LuMapPin className="w-6 h-6 text-white" />,
  },
  {
    title: 'Securitate',
    desc: 'Autentificare sigură și date criptate.',
    icon: <LuShieldCheck className="w-6 h-6 text-white" />,
  },
];

const stats = [
  { value: '4.8★', label: 'Rating Play Store' },
  { value: '10K+', label: 'Descărcări' },
  { value: '24/7', label: 'Disponibilitate' },
  { value: '100%', label: 'Securizat' },
];

export default function AplicatieMobilaPage() {
  return (
    <main>
      {/* Navbar + Logo */}
      <div className="relative">
        <Navbar />
        <Link href="/" className="absolute top-0 left-20 z-50 h-20 flex items-center">
          <Image src="/img/logo.png" alt="RTi Parking Logo" width={210} height={80} priority className="object-contain" />
        </Link>

        {/* ── Hero ── */}
        <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-white">
          <div className="absolute inset-0">
            <Image src="/img/platforma-rparking/hero.png" alt="" fill className="object-cover object-center" quality={95} priority />
          </div>
          {/* White fog - mobile full, desktop 70% */}
          <div className="lg:hidden absolute inset-0 bg-linear-to-r from-white via-white/95 via-40% to-transparent pointer-events-none" />
          <div className="hidden lg:block absolute inset-0 bg-linear-to-r from-white via-white/90 to-transparent pointer-events-none" style={{ width: '70%' }} />

          <div className="relative z-10 w-full px-6 lg:px-10 py-28 pt-36">
            {/* Breadcrumb */}
            <nav data-reveal className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="flex items-center gap-1 hover:text-green-600 transition-colors">
                <LuHouse className="w-4 h-4" /> Acasă
              </Link>
              <LuChevronRight className="w-4 h-4" />
              <span className="text-gray-700 font-medium">Aplicație mobilă</span>
            </nav>

            <div className="max-w-2xl">
              <p data-reveal data-reveal-delay="80" className="text-green-600 font-bold tracking-wide text-sm mb-4">
                APLICAȚIE MOBILĂ
              </p>
              <h1 data-reveal data-reveal-delay="150" className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-5">
                Parcare inteligentă <span className="text-green-600">în buzunarul tău</span>
              </h1>
              <p data-reveal data-reveal-delay="250" className="text-gray-600 text-lg leading-relaxed max-w-xl mb-8">
                Aplicația RParking pentru Android îți oferă control complet asupra parcării 
                direct de pe telefon. Scanare QR, plăți rapide și notificări în timp real.
              </p>

              {/* CTA Buttons */}
              <div data-reveal data-reveal-delay="340" className="flex flex-wrap items-center gap-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.rti.android.rparking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-7 py-3.5 rounded-md transition-all duration-200 text-sm shadow-md shadow-green-600/25 hover:shadow-lg hover:scale-105"
                >
                  <LuSmartphone className="w-5 h-5" />
                  Descarcă din Google Play
                  <LuArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Stats */}
              <div data-reveal data-reveal-delay="430" className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl font-black text-green-600">{s.value}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Features Grid ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div data-reveal className="text-center mb-12">
            <p className="text-green-600 font-bold tracking-wide text-sm mb-2">FUNCȚIONALITĂȚI</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Tot ce ai nevoie pentru parcare</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, idx) => (
              <div
                key={f.title}
                data-reveal
                data-reveal-delay={String(idx * 80)}
                className="group bg-gray-50 rounded-2xl p-6 hover:bg-green-50 transition-all duration-300 border border-gray-100 hover:border-green-200"
              >
                <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── App Screenshots ── */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#f7f9f4' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div data-reveal className="text-center mb-12">
            <p className="text-green-600 font-bold tracking-wide text-sm mb-2">INTERFAȚĂ INTUITIVĂ</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Design modern și ușor de utilizat</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div data-reveal="fade-right" className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/img/platforma-rparking/hero.png" alt="Aplicație mobilă RParking" fill className="object-cover" />
            </div>
            <div data-reveal="fade-left" className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
                  <LuQrCode className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Scanare QR rapidă</h3>
                  <p className="text-gray-500">Intră și ieși din parcare în câteva secunde prin scanarea codului QR.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
                  <LuCreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Plăți securizate</h3>
                  <p className="text-gray-500">Achită parcarea direct din aplicație cu cardul tău.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
                  <LuBell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Notificări inteligente</h3>
                  <p className="text-gray-500">Primești alerte pentru timpul de parcare și plăți.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How to use ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div data-reveal className="text-center mb-12">
            <p className="text-green-600 font-bold tracking-wide text-sm mb-2">CUM FUNCȚIONEAZĂ</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">3 pași simpli</h2>
          </div>

          <div className="space-y-6">
            {[
              { step: '1', title: 'Descarcă aplicația', desc: 'Instalează gratuit din Google Play Store pe telefonul tău Android.' },
              { step: '2', title: 'Scanează codul QR', desc: 'La intrare în parcare, scanează codul QR afișat pe ecranul stației.' },
              { step: '3', title: 'Plătește și pleacă', desc: 'Achită parcarea direct din aplicație și scanează la ieșire.' },
            ].map((item, idx) => (
              <div key={item.step} data-reveal data-reveal-delay={String(idx * 100)} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-600 text-white font-bold flex items-center justify-center shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 lg:py-20 bg-green-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <h2 data-reveal className="text-3xl sm:text-4xl font-black text-white mb-4">
            Descarcă aplicația acum
          </h2>
          <p data-reveal data-reveal-delay="100" className="text-green-200 mb-8 max-w-xl mx-auto">
            Disponibilă gratuit pentru toți utilizatorii parcărilor RParking.
          </p>
          <a
            data-reveal
            data-reveal-delay="200"
            href="https://play.google.com/store/apps/details?id=com.rti.android.rparking"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-green-900 hover:bg-green-50 font-bold px-8 py-4 rounded-md transition-all duration-200 hover:scale-105"
          >
            <LuSmartphone className="w-6 h-6" />
            Google Play Store
            <LuArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

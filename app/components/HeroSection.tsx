import { LuLogIn, LuLogOut, LuCreditCard, LuLayoutDashboard, LuArrowRight, LuPlane, LuSettings2, LuUsers, LuShieldCheck, LuClock, LuZap } from 'react-icons/lu';

const featureCards = [
  {
    title: 'Entry Point',
    subtitle: 'Acces automat',
    icon: <LuLogIn className="w-8 h-8 text-white" />,
  },
  {
    title: 'Exit Point',
    subtitle: 'Ieșire controlată',
    icon: <LuLogOut className="w-8 h-8 text-white" />,
  },
  {
    title: 'Pay Point',
    subtitle: 'Plăți rapide',
    icon: <LuCreditCard className="w-8 h-8 text-white" />,
  },
  {
    title: 'BackOffice',
    subtitle: 'Control total',
    icon: <LuLayoutDashboard className="w-8 h-8 text-white" />,
  },
];

const badges = [
  {
    line1: 'Dezvoltat în',
    line2: 'Moldova',
    icon: <LuPlane className="w-7 h-7 text-green-600 shrink-0" />,
  },
  {
    line1: 'Hardware &',
    line2: 'Software propriu',
    icon: <LuSettings2 className="w-7 h-7 text-green-600 shrink-0" />,
  },
  {
    line1: 'Support tehnic',
    line2: 'dedicat',
    icon: <LuUsers className="w-7 h-7 text-green-600 shrink-0" />,
  },
  {
    line1: 'Securizat',
    line2: 'și fiabil',
    icon: <LuShieldCheck className="w-7 h-7 text-green-600 shrink-0" />,
  },
  {
    line1: 'Integrări',
    line2: 'ușoare',
    icon: <LuClock className="w-7 h-7 text-green-600 shrink-0" />,
  },
  {
    line1: 'Instalare',
    line2: 'rapidă',
    icon: <LuZap className="w-7 h-7 text-green-600 shrink-0" />,
  },
];

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image — starts below navbar, not full-screen height */}
      <div
        className="absolute inset-x-0 bottom-0 top-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/img/mainbg.png')" }}
      />

      <div className="relative z-10 w-full flex items-start min-h-[80vh] lg:min-h-[95vh] pt-20 px-5 sm:px-8 lg:pl-16 lg:pr-6 pb-16">
        {/* ── Left content ──────────────────────────────────────── */}
        <div className="w-full lg:w-[50%] pt-16 md:pt-28 lg:pt-32 pb-12">
          {/* Heading */}
          <h1 data-reveal className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-3">
            <span className="text-green-600">R</span>
            <span className="text-gray-900">Parking</span>
          </h1>

          {/* Subtitle */}
          <h2 data-reveal data-reveal-delay="120" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug mb-5">
            Soluția inteligentă pentru<br />parcări moderne
          </h2>

          {/* Description */}
          <p data-reveal data-reveal-delay="220" className="text-gray-800 text-base md:text-lg lg:text-xl leading-relaxed mb-8 md:mb-12 max-w-lg font-medium">
            Control complet al accesului, plăților și monitorizării
            într-o platformă integrată de hardware și software
            dezvoltată și produsă în Republica Moldova.
          </p>

          {/* CTA buttons */}
          <div data-reveal data-reveal-delay="340" className="flex flex-wrap items-center gap-4 mb-12 md:mb-20">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-7 py-3.5 rounded-md transition-all duration-200 text-sm shadow-md shadow-green-600/25 hover:shadow-lg hover:shadow-green-600/40 hover:scale-105 active:scale-95"
            >
              Solicită demonstrație
              <LuArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center border border-gray-400 hover:border-green-600 text-gray-800 hover:text-green-600 font-semibold px-7 py-3.5 rounded-md transition-all duration-200 text-sm bg-white/60 hover:bg-white hover:scale-105 active:scale-95"
            >
              Cere ofertă
            </a>
          </div>

          {/* Bottom badge strip */}
          <div data-reveal data-reveal-delay="460" className="grid grid-cols-2 gap-x-6 gap-y-3 w-fit">
            {badges.map((b, i) => (
              <div key={b.line1} className="flex items-center gap-2">
                {b.icon}
                <span className="text-sm font-semibold text-gray-800 leading-tight">
                  {b.line1}<br />{b.line2}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right feature cards ───────────────────────────────── */}
        <div data-reveal="fade-right" data-reveal-delay="200" className="hidden lg:flex flex-col gap-2 ml-110 mr-6 w-64 shrink-0 mt-64">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="flex items-center gap-2 px-4 py-5 cursor-pointer transition-all duration-200 rounded-xl bg-black/65 hover:bg-black/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-x-1"
            >
              <div className="w-11 h-11 flex items-center justify-center shrink-0">
                {card.icon}
              </div>
              <div className="flex-1 flex flex-col items-center text-center">
                <p className="text-white font-bold text-base leading-tight">{card.title}</p>
                <p className="text-gray-300 text-sm mt-0.5">{card.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

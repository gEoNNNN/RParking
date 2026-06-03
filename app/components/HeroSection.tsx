const featureCards = [
  {
    title: 'Entry Point',
    subtitle: 'Acces automat',
    icon: (
      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
      </svg>
    ),
  },
  {
    title: 'Exit Point',
    subtitle: 'Ieșire controlată',
    icon: (
      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    ),
  },
  {
    title: 'Pay Point',
    subtitle: 'Plăți rapide',
    icon: (
      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    title: 'BackOffice',
    subtitle: 'Control total',
    icon: (
      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const badges = [
  {
    label: 'Dezvoltat în Moldova',
    icon: (
      <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21l1.9-5.7a8.5 8.5 0 113.8 3.8z" />
      </svg>
    ),
  },
  {
    label: 'Hardware & Software propriu',
    icon: (
      <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    label: 'Support tehnic dedicat',
    icon: (
      <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'Securizat și fiabil',
    icon: (
      <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    label: 'Integrări ușoare',
    icon: (
      <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
];

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/img/mainbg.png')" }}
      />
      {/* Left-to-right gradient overlay so dark text stays readable */}
      <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/75 to-white/0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex items-center min-h-[calc(100vh-4rem)]">
        {/* ── Left content ──────────────────────────────────────── */}
        <div className="w-full lg:w-[48%] py-16">
          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-3">
            <span className="text-green-600">R</span>
            <span className="text-gray-900">Parking</span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-5">
            Soluția inteligentă pentru<br />parcări moderne
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-md">
            Control complet al accesului, plăților și monitorizării
            într-o platformă integrată de hardware și software
            dezvoltată și produsă în Republica Moldova.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-7 py-3.5 rounded-md transition-colors text-sm shadow-md shadow-green-600/25"
            >
              Solicită demonstrație
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center border border-gray-400 hover:border-green-600 text-gray-800 hover:text-green-600 font-semibold px-7 py-3.5 rounded-md transition-colors text-sm bg-white/60 hover:bg-white"
            >
              Cere ofertă
            </a>
          </div>

          {/* Bottom badge strip */}
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {badges.map((b) => (
              <div key={b.label} className="flex items-center gap-1.5 text-xs text-gray-700 font-medium">
                {b.icon}
                {b.label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right feature cards ───────────────────────────────── */}
        <div className="hidden lg:flex flex-col gap-0 ml-auto w-52 shrink-0 rounded-xl overflow-hidden shadow-2xl">
          {featureCards.map((card, idx) => (
            <div
              key={card.title}
              className={`flex items-center gap-3 px-4 py-4 cursor-pointer transition-colors ${
                idx % 2 === 0
                  ? 'bg-gray-900 hover:bg-gray-800'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <div className="w-9 h-9 bg-gray-700 rounded-lg flex items-center justify-center shrink-0">
                {card.icon}
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">{card.title}</p>
                <p className="text-gray-400 text-xs mt-0.5">{card.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

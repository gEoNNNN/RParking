const steps = [
  {
    title: 'Intrare în parcare',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7-7-7 7M5 9v11a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1V9" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 22V12h6v10" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18" />
      </svg>
    ),
  },
  {
    title: 'ANPR / QR / NFC Identificare',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9V6a1 1 0 011-1h3M3 15v3a1 1 0 001 1h3m11-13h3a1 1 0 011 1v3m-4 11h3a1 1 0 001-1v-3" />
        <rect x="7" y="7" width="10" height="10" rx="1" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6M12 9v6" />
      </svg>
    ),
  },
  {
    title: 'Timp petrecut în parcare',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 17V7h4a3 3 0 010 6H9" />
      </svg>
    ),
  },
  {
    title: 'Plată la Pay Point',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 10h20" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 15h4" />
      </svg>
    ),
  },
  {
    title: 'Ieșire din parcare',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h14m-4-4l4 4-4 4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 5h2a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
      </svg>
    ),
  },
  {
    title: 'Raport și analiză în BackOffice',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3v18h18" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Cum funcționează</h2>
          <div className="w-10 h-0.5 bg-green-500 mx-auto" />
        </div>

        {/* Steps row */}
        <div className="flex items-start justify-center flex-wrap gap-y-6">
          {steps.map((step, idx) => (
            <div key={step.title} className="flex items-start">
              {/* Step block */}
              <div className="flex flex-col items-center gap-2 w-24">
                <div className="w-16 h-16 rounded-full border-2 border-green-500 bg-white flex items-center justify-center shadow-sm">
                  {step.icon}
                </div>
                <p className="text-gray-700 text-xs font-medium text-center leading-tight">
                  {step.title}
                </p>
              </div>

              {/* Arrow connector */}
              {idx < steps.length - 1 && (
                <div className="flex items-center justify-center mt-4 px-1">
                  <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

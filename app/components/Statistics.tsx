const metrics = [
  {
    value: '1 000 000+',
    label: 'Treceri zilnice',
    icon: (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    value: '200+',
    label: 'Locații implementate',
    icon: (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    value: '50 000+',
    label: 'Locuri de parcare administrate',
    icon: (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    value: '99,9%',
    label: 'Disponibilitate sistem',
    icon: (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function Statistics() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-green-50 border border-green-100 rounded-2xl px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left tagline */}
            <div className="flex items-start gap-4 lg:w-64 shrink-0">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 5.9 16.17 3.82 19.96 3.32 20.88 4.39 21.8 5.22 21.17 7.5 19.43 10.15 17 12 17c0 0 1-1 2-3 1.33-2.67 2.33-5.33 3-8z" />
                </svg>
              </div>
              <p className="text-gray-900 font-bold text-lg leading-snug">
                Tehnologie inteligentă pentru viitor sustenabil
              </p>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-16 bg-green-200" />

            {/* Metrics */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-10 flex-1">
              {metrics.map((m, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white border border-green-200 rounded-full flex items-center justify-center shrink-0">
                    {m.icon}
                  </div>
                  <div>
                    <p className="text-gray-900 text-xl font-black leading-none">{m.value}</p>
                    <p className="text-gray-500 text-xs mt-0.5 max-w-28 leading-tight">{m.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

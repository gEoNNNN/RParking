const metrics = [
  {
    value: '100%',
    label: 'Automatizare',
    icon: (
      <svg className="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    value: '-30%',
    label: 'Costuri operaționale',
    icon: (
      <svg className="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ),
  },
  {
    value: '+99%',
    label: 'Satisfacția utilizatorilor',
    icon: (
      <svg className="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
  },
  {
    value: '24/7',
    label: 'Control și monitorizare',
    icon: (
      <svg className="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function BenefitsBar() {
  return (
    <section className="bg-green-800 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left tagline */}
          <div className="flex items-start gap-4 lg:w-72 shrink-0">
            <svg className="w-8 h-8 text-green-400 shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 8C8 10 5.9 16.17 3.82 19.96 3.32 20.88 4.39 21.8 5.22 21.17 7.5 19.43 10.15 17 12 17c0 0 1-1 2-3 1.33-2.67 2.33-5.33 3-8z" />
            </svg>
            <p className="text-white text-xl font-bold leading-snug">
              Parcări mai eficiente,<br />
              <span className="text-green-300">orașe mai verzi.</span>
            </p>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-16 bg-green-700" />

          {/* Metrics */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-10 flex-1">
            {metrics.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {item.icon}
                <div>
                  <p className="text-white text-2xl font-black leading-none">{item.value}</p>
                  <p className="text-green-300 text-xs mt-0.5">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

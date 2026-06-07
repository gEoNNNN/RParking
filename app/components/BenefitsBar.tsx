import { LiaLeafSolid } from 'react-icons/lia';

const metrics = [
  {
    value: '100%',
    label: 'Automatizare',
    icon: (
      <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    value: '-30%',
    label: 'Costuri operaționale',
    icon: (
      <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ),
  },
  {
    value: '+99%',
    label: 'Satisfacția utilizatorilor',
    icon: (
      <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
  },
  {
    value: '24/7',
    label: 'Control și monitorizare',
    icon: (
      <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function BenefitsBar() {
  return (
    <section className="relative bg-green-900 overflow-hidden hidden min-[1500px]:block">
      {/* Background image sets the height and is shown in full (no crop) */}
      <img src="/img/bg%20cards.png" alt="" className="block w-full h-auto" />

      {/* Content overlaid and vertically centered over the image */}
      <div className="absolute inset-0">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-10 w-full">
            {/* Left tagline */}
            <div className="flex items-center gap-3 lg:w-72 shrink-0">
              <LiaLeafSolid className="w-12 h-12 lg:w-16 lg:h-16 text-green-400 shrink-0" />
              <p className="text-white text-lg lg:text-2xl font-bold leading-snug">
                Parcări mai eficiente,<br />orașe mai verzi.
              </p>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-16 bg-green-600" />

            {/* Metrics */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-3 lg:gap-10 flex-1">
              {metrics.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  {item.icon}
                  <div>
                    <p className="text-white text-2xl font-black leading-none">{item.value}</p>
                    <p className="text-white/70 text-xs mt-0.5">{item.label}</p>
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

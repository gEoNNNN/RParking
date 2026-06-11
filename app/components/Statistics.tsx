import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { LuTrendingUp, LuMapPin, LuCar, LuClock } from 'react-icons/lu';

const metrics = [
  {
    value: '1 000 000+',
    labelKey: 'dailyPasses',
    icon: <LuTrendingUp className="w-6 h-6 text-green-600" />,
  },
  {
    value: '200+',
    labelKey: 'locations',
    icon: <LuMapPin className="w-6 h-6 text-green-600" />,
  },
  {
    value: '50 000+',
    labelKey: 'spots',
    icon: <LuCar className="w-6 h-6 text-green-600" />,
  },
  {
    value: '99,9%',
    labelKey: 'uptime',
    icon: <LuClock className="w-6 h-6 text-green-600" />,
  },
];

export default function Statistics() {
  const t = useTranslations('Statistics');
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div data-reveal="scale" className="border border-green-100 rounded-2xl px-8 py-8" style={{ backgroundColor: '#f0f4ea' }}>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left tagline */}
            <div className="flex items-start gap-4 lg:w-64 shrink-0">
              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                <Image src="/img/leaf.png" alt="leaf" width={80} height={80} className="w-full h-full object-cover" />
              </div>
              <p className="text-gray-900 font-bold text-lg leading-snug">
                {t('tagline')}
              </p>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-16 bg-green-200" />

            {/* Metrics */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-10 flex-1">
              {metrics.map((m, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white border border-green-200 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-125 hover:border-green-500 hover:shadow-md hover:shadow-green-200/60 cursor-pointer">
                    {m.icon}
                  </div>
                  <div>
                    <p className="text-gray-900 text-xl font-black leading-none">{m.value}</p>
                    <p className="text-gray-500 text-xs mt-0.5 max-w-28 leading-tight">{t(m.labelKey)}</p>
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

import { useTranslations } from 'next-intl';

const audiences = [
  { key: 'mall' },
  { key: 'business' },
  { key: 'residential' },
  { key: 'airports' },
  { key: 'hospitals' },
  { key: 'hotels' },
  { key: 'municipal' },
  { key: 'institutions' },
];

export default function TargetAudience() {
  const t = useTranslations('TargetAudience');
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div data-reveal="fade" className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
            {t('titlePrefix')}<span className="text-green-600">R</span>Parking{t('titleSuffix')}
          </h2>
          <div className="w-16 h-1 bg-green-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((a, idx) => (
            <div key={a.key} data-reveal data-reveal-delay={String(idx * 50)} className="border-l-4 border-green-500 pl-5 py-4 rounded-r-xl bg-gray-50/60 hover:bg-green-50/40 transition-colors duration-200">
              <p className="text-gray-900 font-semibold text-base leading-relaxed">{t(a.key)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

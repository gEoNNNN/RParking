import { useTranslations } from 'next-intl';

export default function CTABanner() {
  const t = useTranslations('CTA');
  return (
    <section className="bg-green-800 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left text */}
          <div className="lg:max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-snug">
              {t('title')}
            </h2>
            <p className="text-green-200 text-lg leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 shrink-0">
            <a
              href="https://wa.me/37369116121" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-bold px-12 py-5 rounded-md transition-colors text-lg"
            >
              {t('requestDemo')}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center border-2 border-white/60 hover:border-white text-white font-bold px-12 py-5 rounded-md transition-colors text-lg"
            >
              {t('contactUs')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

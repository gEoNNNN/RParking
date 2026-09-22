'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  LuShieldCheck,
  LuMaximize2,
  LuX,
  LuExternalLink,
  LuBuilding2,
  LuFileText,
  LuCircleCheck,
  LuBadgeCheck,
} from 'react-icons/lu';

export default function TrademarkCertificate() {
  const t = useTranslations('DespreNoiPage.trademark');
  const [isOpen, setIsOpen] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <section id="certificat" className="py-20 bg-gray-50/70 border-y border-gray-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div data-reveal="fade" className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-bold uppercase tracking-wider mb-3">
            <LuBadgeCheck className="w-4 h-4 text-green-600" />
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
            {t('title')}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
          <div className="w-12 h-0.5 bg-green-500 mx-auto mt-4" />
        </div>

        {/* Main Certificate Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-10 shadow-sm">
          {/* Left Column: Certificate Preview with Interactive Hover */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              onClick={() => setIsOpen(true)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden border-2 border-green-100/80 shadow-md hover:shadow-xl transition-all duration-300 max-w-xs sm:max-w-sm w-full bg-white"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsOpen(true);
                }
              }}
              aria-label={t('clickToZoom')}
            >
              <div className="relative aspect-[3/4.2] w-full bg-gray-50">
                <Image
                  src="/img/certificat.png"
                  alt="Certificat de Înregistrare a Mărcii RParking Nr. 42952"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-300"
                  priority
                />
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 text-white font-semibold text-sm backdrop-blur-[2px]">
                <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
                  <LuMaximize2 className="w-5 h-5 text-white" />
                </div>
                <span>{t('clickToZoom')}</span>
              </div>

              {/* Certificate badge at bottom */}
              <div className="p-3 bg-gray-50/90 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="font-bold text-gray-900 flex items-center gap-1.5">
                  <LuFileText className="w-3.5 h-3.5 text-green-600" />
                  AGEPI {t('certNumber')}
                </span>
                <span className="text-green-700 font-medium inline-flex items-center gap-1">
                  <LuShieldCheck className="w-3.5 h-3.5" />
                  {t('registerValue')}
                </span>
              </div>
            </div>

            {/* Quick Actions under thumbnail */}
            <div className="mt-4 flex flex-wrap gap-3 justify-center">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 font-semibold text-xs transition-colors"
              >
                <LuMaximize2 className="w-3.5 h-3.5" />
                {t('viewOriginal')}
              </button>
              <a
                href="/img/certificat.png"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold text-xs transition-colors"
              >
                <LuExternalLink className="w-3.5 h-3.5" />
                {t('openNewTab')}
              </a>
            </div>
          </div>

          {/* Right Column: Official Details & Legal Guarantees */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-b border-gray-100 pb-5">
              <div className="inline-block px-3 py-1 rounded-md bg-green-100/70 text-green-800 font-bold text-xs uppercase tracking-wider mb-2">
                Registrul Național al Mărcilor
              </div>
              <h3 className="text-2xl font-black text-gray-900 leading-tight">
                Marca RPARKING – Certificat Nr. 42952
              </h3>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                Eliberat în temeiul Legii Republicii Moldova nr. 38/2008 privind protecția mărcilor. Oferă protecție juridică completă pentru denumire, tehnologie și soluții tehnice de parcare automatizată.
              </p>
            </div>

            {/* Attributes Table / Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80">
                <span className="text-gray-500 block mb-1">{t('authorityLabel')}</span>
                <span className="font-bold text-gray-900 block leading-snug">{t('authorityValue')}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80">
                <span className="text-gray-500 block mb-1">{t('lawLabel')}</span>
                <span className="font-bold text-gray-900 block leading-snug">{t('lawValue')}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80">
                <span className="text-gray-500 block mb-1">{t('ownerLabel')}</span>
                <span className="font-bold text-gray-900 block leading-snug">{t('ownerValue')}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80">
                <span className="text-gray-500 block mb-1">{t('registerLabel')}</span>
                <span className="font-bold text-green-700 block leading-snug">{t('certNumber')} • Marcă Activă</span>
              </div>
            </div>

            {/* Trust Features */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-green-50/50 border border-green-200/70">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <LuCircleCheck className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{t('feature1Title')}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed mt-0.5">{t('feature1Desc')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-green-50/50 border border-green-200/70">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <LuBuilding2 className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{t('feature2Title')}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed mt-0.5">{t('feature2Desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal for Certificate */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm p-4 sm:p-6 transition-all animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[92vh] w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <LuBadgeCheck className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                  {t('title')} – AGEPI {t('certNumber')}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/img/certificat.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-500 hover:text-green-600 hover:bg-gray-100 transition-colors"
                  title={t('openNewTab')}
                >
                  <LuExternalLink className="w-5 h-5" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  aria-label={t('close')}
                >
                  <LuX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image View */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(92vh-130px)] flex justify-center bg-gray-100/50">
              <div className="relative w-full max-w-2xl shadow-lg rounded-lg overflow-hidden border border-gray-200 bg-white">
                <Image
                  src="/img/certificat.png"
                  alt="Certificat de Înregistrare a Mărcii RParking"
                  width={1200}
                  height={1700}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
              <span className="font-medium">
                {t('ownerValue')} • Agenția de Stat pentru Proprietatea Intelectuală
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-md bg-gray-900 hover:bg-gray-800 text-white font-semibold transition-colors"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

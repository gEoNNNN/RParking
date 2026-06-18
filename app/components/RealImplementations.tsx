'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const IMGS = Array.from({ length: 17 }, (_, i) => `/img/implementarea ${i + 1}.jpg`);
const VISIBLE = 4;
const CLONES = VISIBLE;
// Extended array: CLONES at start (tail of IMGS) + all IMGS + CLONES at end (head of IMGS)
const extended = [...IMGS.slice(-CLONES), ...IMGS, ...IMGS.slice(0, CLONES)];
const TOTAL = extended.length; // 25

export default function RealImplementations() {
  const t = useTranslations('RealImplementations');
  const [lightbox, setLightbox] = useState<string | null>(null);
  // trackIdx into extended[], starts at CLONES so first real image is visible
  const [trackIdx, setTrackIdx] = useState(CLONES);
  const [animated, setAnimated] = useState(true);
  const pausedRef = useRef(false);

  // Keyboard close lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Seamless infinite snap-back
  useEffect(() => {
    if (trackIdx >= CLONES + IMGS.length) {
      const timer = setTimeout(() => {
        setAnimated(false);
        setTrackIdx(trackIdx - IMGS.length);
      }, 600);
      return () => clearTimeout(timer);
    }
    if (trackIdx < CLONES) {
      const timer = setTimeout(() => {
        setAnimated(false);
        setTrackIdx(IMGS.length + trackIdx);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [trackIdx]);

  // Re-enable animation after instant snap
  useEffect(() => {
    if (!animated) {
      let id1: number;
      let id2: number;
      id1 = requestAnimationFrame(() => {
        id2 = requestAnimationFrame(() => setAnimated(true));
      });
      return () => { cancelAnimationFrame(id1); cancelAnimationFrame(id2); };
    }
  }, [animated]);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) setTrackIdx(c => c + 1);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  // translateX % is relative to the track's own width
  const translatePct = trackIdx * (100 / TOTAL);

  return (
    <section id="implementations" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div data-reveal="fade" className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">{t('title')}</h2>
          <div className="w-10 h-0.5 bg-green-500 mx-auto" />
        </div>

        {/* Carousel */}
        <div
          className="relative mb-6 overflow-hidden"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          {/* Track */}
          <div
            className="flex h-48"
            style={{
              width: `${(TOTAL / VISIBLE) * 100}%`,
              transform: `translateX(-${translatePct}%)`,
              transition: animated ? 'transform 0.55s ease-in-out' : 'none',
            }}
          >
            {extended.map((src, idx) => (
              <div
                key={idx}
                className="relative h-full px-1 cursor-pointer group shrink-0"
                style={{ width: `${100 / TOTAL}%` }}
                onClick={() => setLightbox(src)}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src={src}
                    alt={`${t('imageAlt')} ${((idx - CLONES + IMGS.length * 2) % IMGS.length) + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-green-800/0 group-hover:bg-green-800/20 transition-colors duration-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Prev arrow */}
          <button
            onClick={() => setTrackIdx(c => c - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md z-10 transition-all hover:scale-110"
            aria-label="Previous"
          >
            <FiChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Next arrow */}
          <button
            onClick={() => setTrackIdx(c => c + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md z-10 transition-all hover:scale-110"
            aria-label="Next"
          >
            <FiChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-900 font-semibold text-sm">
                {t('statTitle')}
              </p>
              <p className="text-gray-500 text-xs mt-0.5">
                {t('statSubtitle')}
              </p>
            </div>
          </div>

          <Link
            href="/implementari"
            className="shrink-0 border border-green-600 text-green-700 hover:bg-green-600 hover:text-white font-medium text-sm px-6 py-2.5 rounded-md transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-green-600/30"
          >
            {t('viewAll')}
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors z-10"
            onClick={() => setLightbox(null)}
            aria-label={t('close')}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative w-full max-w-5xl max-h-[88vh] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox}
              alt=""
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  );
}

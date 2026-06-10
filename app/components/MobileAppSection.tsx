'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuMapPin, LuQrCode, LuWallet, LuInfo, LuDownload } from 'react-icons/lu';

const features = [
  {
    icon: <LuMapPin className="w-6 h-6 text-green-600" />,
    text: 'Găsește parcare rapid și ușor pe o hartă interactivă',
  },
  {
    icon: <LuQrCode className="w-6 h-6 text-green-600" />,
    text: 'Intrare și ieșire rapidă prin QR code',
  },
  {
    icon: <LuWallet className="w-6 h-6 text-green-600" />,
    text: 'Abonează-te și economisește timp și bani',
  },
  {
    icon: <LuInfo className="w-6 h-6 text-green-600" />,
    text: 'Informații complete despre parcare și tarife transparente',
  },
];

const mockupImages = [
  '/img/mockup1.png',
  '/img/mockup2.png',
  '/img/mockup3.png',
  '/img/mockup4.png',
];

export default function MobileAppSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockupImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-2 block">
              Aplicație mobilă
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Parchează inteligent cu <span className="text-green-600 whitespace-nowrap">RParking App</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Descarcă aplicația și ai control total asupra parcărilor tale direct de pe telefon.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  data-reveal
                  data-reveal-delay={String(idx * 100)}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>
                  <p className="text-gray-700 font-medium pt-2.5">{feature.text}</p>
                </div>
              ))}
            </div>

            {/* Download Button */}
            <Link
              href="https://play.google.com/store/apps/details?id=com.rti.android.rparking"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit mx-auto lg:mx-0 items-center gap-3 bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg"
            >
              <LuDownload className="w-5 h-5" />
              <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-wide opacity-80">Descarcă de pe</span>
                <span className="text-sm font-bold -mt-0.5">Google Play</span>
              </div>
            </Link>
          </div>

          {/* Right - Mockup Carousel */}
          <div data-reveal="fade-left" className="relative flex justify-center">
            <div className="relative w-72 md:w-80">
              {/* Phone frame background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 rounded-[40px] blur-2xl opacity-60" />
              
              {/* Carousel images */}
              <div className="relative z-10 w-full aspect-[320/640] rounded-3xl overflow-hidden shadow-2xl">
                {mockupImages.map((src, idx) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`RParking App Mockup ${idx + 1}`}
                    fill
                    className={`object-cover transition-opacity duration-500 ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    priority={idx === 0}
                  />
                ))}
              </div>
              
              {/* Indicators */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {mockupImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-green-600' : 'bg-gray-300'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

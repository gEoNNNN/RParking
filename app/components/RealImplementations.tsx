import Image from 'next/image';

const images = [
  '/img/implementarea 1.jpg',
  '/img/implementarea 2.jpg',
  '/img/implementarea 3.jpg',
  '/img/implementarea 4.jpg',
  '/img/implementarea 5.jpg',
  '/img/implementarea 6.jpg',
  '/img/implementarea 7.jpg',
];

export default function RealImplementations() {
  return (
    <section id="implementations" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div data-reveal="fade" className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Implementări reale</h2>
          <div className="w-10 h-0.5 bg-green-500 mx-auto" />
        </div>

        {/* Image row */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="relative h-48 min-w-42 flex-1 rounded-lg overflow-hidden shrink-0 group cursor-pointer"
            >
              <Image
                src={src}
                alt={`Implementare ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 170px, 20vw"
              />
              <div className="absolute inset-0 bg-green-800/0 group-hover:bg-green-800/20 transition-colors duration-300" />
            </div>
          ))}
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
                Peste 1 000 000 de treceri zilnice prin sistemele RParking
              </p>
              <p className="text-gray-500 text-xs mt-0.5">
                în centre comerciale, business centre și parcări rezidențiale.
              </p>
            </div>
          </div>

          <a
            href="#implementations"
            className="shrink-0 border border-green-600 text-green-700 hover:bg-green-600 hover:text-white font-medium text-sm px-6 py-2.5 rounded-md transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-green-600/30"
          >
            Vezi toate implementările
          </a>
        </div>
      </div>
    </section>
  );
}

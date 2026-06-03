import Image from 'next/image';

export default function CTABanner() {
  return (
    <section className="relative bg-green-800 py-14 overflow-hidden">
      {/* Decorative flower right */}
      <div className="absolute right-0 bottom-0 w-56 h-56 pointer-events-none select-none opacity-80">
        <Image
          src="/img/flower.png"
          alt=""
          fill
          className="object-contain object-right-bottom"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left text */}
          <div className="lg:max-w-lg">
            <h2 className="text-3xl font-bold text-white mb-3 leading-snug">
              Ești gata să automatizezi parcarea?
            </h2>
            <p className="text-green-200 text-sm leading-relaxed">
              Solicită o demonstrație personalizată și află cum RParking
              poate aduce valoare afacerii dumneavoastră.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 shrink-0">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-7 py-3 rounded-md transition-colors text-sm"
            >
              Solicită demo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center border border-white/60 hover:border-white text-white font-semibold px-7 py-3 rounded-md transition-colors text-sm"
            >
              Contactați-ne
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

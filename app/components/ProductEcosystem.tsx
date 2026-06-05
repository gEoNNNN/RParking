import Image from 'next/image';

const products = [
  {
    title: 'Entry Point',
    description: 'Terminal de intrare cu ANPR, QR/NFC și barieră.',
    link: '#entry-point',
    image: '/img/produs1.png',
    isPhoto: true,
  },
  {
    title: 'Exit Point',
    description: 'Terminal de ieșire cu validare și control acces.',
    link: '#exit-point',
    image: '/img/produs2.png',
    isPhoto: true,
  },
  {
    title: 'Pay Point',
    description: 'Terminal de plată cu card, numerar și rest.',
    link: '#pay-point',
    image: '/img/produs3.png',
    isPhoto: true,
  },
  {
    title: 'BackOffice',
    description: 'Administrare completă si detaliata în timp real.',
    link: '#backoffice',
    image: null,
    isPhoto: false,
  },
];

function BackOfficeIllustration() {
  return (
    <div className="w-full h-full bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[220px]">
        {/* Laptop screen */}
        <div className="bg-slate-800 rounded-t-lg p-2 shadow-md">
          <div className="bg-white rounded p-2 space-y-1.5">
            {/* Header bar */}
            <div className="flex items-center gap-1 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <div className="flex-1 h-1.5 bg-gray-100 rounded" />
            </div>
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-1">
              {['247', '$4.8K', '82%'].map((v) => (
                <div key={v} className="bg-gray-50 rounded p-1 text-center">
                  <p className="text-[8px] font-bold text-green-700">{v}</p>
                </div>
              ))}
            </div>
            {/* Chart bars */}
            <div className="flex items-end gap-0.5 h-8 pt-1">
              {[40, 65, 50, 80, 60, 90, 70, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-green-500 rounded-t-sm opacity-70"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            {/* Rows */}
            <div className="space-y-1 pt-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-1">
                  <div className="w-8 h-1.5 bg-gray-200 rounded" />
                  <div className="flex-1 h-1.5 bg-gray-100 rounded" />
                  <div className="w-5 h-1.5 bg-green-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Laptop base */}
        <div className="bg-slate-700 h-2 rounded-b-sm" />
        <div className="bg-slate-600 h-1 rounded-b-md w-[90%] mx-auto" />
      </div>
    </div>
  );
}

export default function ProductEcosystem() {
  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div data-reveal="fade" className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
            Ecosistemul{' '}
            <span className="text-green-600">R</span>Parking
          </h2>
          <div className="w-10 h-0.5 bg-green-500 mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product, idx) => (
            <div
              key={product.title}
              data-reveal
              data-reveal-delay={String(idx * 100)}
              className="group border border-gray-200 hover:border-green-300 hover:shadow-xl hover:-translate-y-1 rounded-xl overflow-hidden transition-all duration-300 bg-white"
            >
              {/* Image area */}
              <div className="h-52 bg-gray-50 relative flex items-center justify-center overflow-hidden">
                {product.isPhoto && product.image ? (
                  (product as { cover?: boolean }).cover ? (
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={300}
                      height={280}
                      className="object-contain h-48 w-auto"
                    />
                  )
                ) : (
                  <BackOfficeIllustration />
                )}
              </div>

              <div className="p-5">
                <h3 className="text-gray-900 font-extrabold text-xl mb-1.5">{product.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{product.description}</p>
                <a
                  href={product.link}
                  className="inline-flex items-center gap-1 text-green-600 text-sm font-semibold hover:text-green-700 transition-colors"
                >
                  Detalii
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

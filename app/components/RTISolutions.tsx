import Image from 'next/image';
import Link from 'next/link';
import { LuArrowRight } from 'react-icons/lu';

const rtiProducts = [
  {
    title: 'RParking',
    description: 'Automatizare completă a parcărilor.',
    image: '/img/logo.png',
    href: '/products',
  },
  {
    title: 'RAccess WC',
    description: 'Control acces și taxare pentru grupuri sanitare publice.',
    image: '/img/wc.png',
    href: '#',
  },
  {
    title: 'RChange',
    description: 'Automat self-service pentru schimb valutar și servicii automate.',
    image: '/img/exchange.png',
    href: '#',
  },
];

export default function RTISolutions() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Alte soluții dezvoltate de <span className="text-green-600">RTI Systems</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Portofoliu diversificat de soluții inteligente pentru automatizare și control acces.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rtiProducts.map((product, idx) => (
            <div
              key={product.title}
              data-reveal
              data-reveal-delay={String(idx * 100)}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-green-300 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-100 flex items-center justify-center p-6">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={120}
                  height={80}
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>
                <Link
                  href={product.href}
                  className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm hover:text-green-700 transition-colors"
                >
                  Detalii <LuArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';

const challenges = [
  { challenge: 'Cozi la intrare și ieșire', solution: 'Automatizare completă a accesului' },
  { challenge: 'Acces necontrolat', solution: 'Recunoaștere ANPR, QR și NFC' },
  { challenge: 'Fraudă și pierderi financiare', solution: 'Rapoarte și monitorizare în timp real' },
  { challenge: 'Evidență manuală și erori', solution: 'Control total și istoric complet' },
  { challenge: 'Costuri operaționale ridicate', solution: 'Reducerea costurilor și creșterea veniturilor' },
];

export default function WhyRParking() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Card */}
        <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
          <div className="grid lg:grid-cols-2 gap-0 items-stretch">
            {/* Left – text + comparison with green bg */}
            <div className="p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                De ce să alegi <span className="text-green-600">R</span>Parking?
              </h2>

              <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-2">
                <p className="text-red-500 font-semibold text-sm">Provocările tale</p>
                <p className="text-green-600 font-semibold text-sm">Soluția RParking</p>
              </div>

              {challenges.map((row, idx) => (
                <div key={idx} className="grid grid-cols-2 items-center gap-6 py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 font-bold text-sm mt-0.5">✕</span>
                    <p className="text-gray-600 text-sm leading-snug">{row.challenge}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 font-bold text-sm mt-0.5">✓</span>
                    <p className="text-gray-700 text-sm leading-snug">{row.solution}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right – pc.png image */}
            <div className="relative hidden lg:block min-h-full bg-gray-50">
              <Image
                src="/img/pc.png"
                alt="RParking BackOffice Dashboard"
                fill
                className="object-contain object-right"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


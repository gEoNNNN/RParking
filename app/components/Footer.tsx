import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="contact" className="bg-white border-t border-gray-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="mb-3">
              <Image src="/img/logo.png" alt="RTi Parking" width={100} height={40} className="object-contain" />
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-50">
              RParking este un produs dezvoltat si produs de RTi in Republica Moldova.
            </p>
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold text-sm mb-4">Produse</h4>
            <ul className="space-y-2.5">
              {['Entry Point', 'Exit Point', 'Pay Point', 'BackOffice'].map((item) => (
                <li key={item}><Link href="#" className="text-gray-500 text-sm hover:text-green-600 transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold text-sm mb-4">Solutii</h4>
            <ul className="space-y-2.5">
              {['Centre comerciale', 'Business centre', 'Rezidentiale', 'Municipale', 'Aeroporturi'].map((item) => (
                <li key={item}><Link href="#" className="text-gray-500 text-sm hover:text-green-600 transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold text-sm mb-4">Companie</h4>
            <ul className="space-y-2.5">
              {['Despre noi', 'Implementari', 'Contact', 'Suport'].map((item) => (
                <li key={item}><Link href="#" className="text-gray-500 text-sm hover:text-green-600 transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-500 text-sm">+373 60 000 11</li>
              <li className="flex items-center gap-2 text-gray-500 text-sm">office@rti.md</li>
              <li className="flex items-center gap-2 text-gray-500 text-sm">Chisinau, Republica Moldova</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-xs">© 2024 RTi. Toate drepturile rezervate.</p>
          <div className="flex gap-5">
            <Link href="#" className="text-gray-400 text-xs hover:text-green-600 transition-colors">Politica de confidentialitate</Link>
            <Link href="#" className="text-gray-400 text-xs hover:text-green-600 transition-colors">Termeni si conditii</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

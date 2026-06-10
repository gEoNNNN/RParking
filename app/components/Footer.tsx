'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import { LuArrowRight } from 'react-icons/lu';

export default function Footer() {
  return (
    <footer id="contact" className="bg-white border-t border-gray-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="mb-3">
              <Image src="/img/logo.png" alt="RTi Parking" width={300} height={120} className="object-contain" style={{ transform: 'translateX(-8px)' }} />
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-50">
              RParking este un produs dezvoltat și produs de RTi în Republica Moldova.
            </p>
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold text-sm mb-4">Produse</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Entry Point', href: '/products/entry-point' },
                { name: 'Exit Point', href: '/products/exit-point-cardpass' },
                { name: 'Pay Point', href: '/products/pay-point' },
                { name: 'BackOffice', href: '/products/backoffice' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-500 text-sm hover:text-green-600 transition-colors inline-flex items-center gap-1.5 group">
                    {item.name}
                    <LuArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold text-sm mb-4">Soluțiile RTI Systems</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'RParking', href: '/products' },
                { name: 'RAccess WC', href: '/products/raccess-wc' },
                { name: 'RChange', href: '/products/rchange' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-500 text-sm hover:text-green-600 transition-colors inline-flex items-center gap-1.5 group">
                    {item.name}
                    <LuArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold text-sm mb-4">Soluții</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Centre comerciale', href: '/solutii' },
                { name: 'Business centre', href: '/solutii' },
                { name: 'Rezidentiale', href: '/solutii' },
                { name: 'Municipale', href: '/solutii' },
                { name: 'Aeroporturi', href: '/solutii' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-500 text-sm hover:text-green-600 transition-colors inline-flex items-center gap-1.5 group">
                    {item.name}
                    <LuArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold text-sm mb-4">Companie</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Despre noi', href: '/despre-noi' },
                { name: 'Implementari', href: '/implementari' },
                { name: 'Contact', href: '/#contact' },
                { name: 'Suport', href: '/suport' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-500 text-sm hover:text-green-600 transition-colors inline-flex items-center gap-1.5 group">
                    {item.name}
                    <LuArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-500 text-sm">+373 069116121</li>
              <li className="flex items-center gap-3">
                <Link
                  href="https://wa.me/37369116121"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
                >
                  <FaWhatsapp className="w-4 h-4" /> WhatsApp
                </Link>
                <Link
                  href="https://t.me/+37369116121"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors"
                >
                  <FaTelegramPlane className="w-4 h-4" /> Telegram
                </Link>
              </li>
              <li className="flex items-center gap-2 text-gray-500 text-sm">Chisinau, Republica Moldova</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-xs">© 2026 RTi. Toate drepturile rezervate.</p>
          <div className="flex gap-5">
            <Link href="#" className="text-gray-400 text-xs hover:text-green-600 transition-colors">Politica de confidențialitate</Link>
            <Link href="#" className="text-gray-400 text-xs hover:text-green-600 transition-colors">Termeni și condiții</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

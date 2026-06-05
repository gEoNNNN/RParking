'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LuMenu, LuX } from 'react-icons/lu';

const navLinks = [
  { label: 'Acasă',        href: '/' },
  { label: 'Soluții',      href: '/solutii' },
  { label: 'Produse',      href: '/#products' },
  { label: 'Platforma RParking', href: '/platforma-rparking' },
  { label: 'Implementări', href: '/implementari' },
  { label: 'Despre noi',   href: '/#about' },
  { label: 'Contact',      href: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <nav className="w-full absolute top-0 left-0 right-0 z-50 bg-white shadow-sm overflow-visible">
      <div className="max-w-7xl mx-auto px-6 flex items-center h-20">
        {/* Left spacer */}
        <div className="flex-1 hidden lg:block" />

        {/* Desktop nav links — center */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`relative group flex items-center gap-0.5 px-3 py-2 text-base font-semibold whitespace-nowrap transition-colors ${
                isActive(link.href) ? 'text-green-600' : 'text-gray-800 hover:text-green-600'
              }`}
            >
              {link.label}
              {/* Sliding underline */}
              <span
                className={`absolute bottom-0 left-3 right-3 h-0.5 bg-green-500 transition-transform duration-300 origin-left ${
                  isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex-1 hidden lg:flex justify-start items-center gap-3 pl-20">
          <Link
            href="/#contact"
            className="bg-green-600 hover:bg-green-500 text-white text-base font-bold px-5 py-2.5 rounded-md transition-all duration-200 whitespace-nowrap hover:scale-105 active:scale-95 hover:shadow-md hover:shadow-green-600/30"
          >
            Solicită demo
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-gray-700 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Fog/mist gradient that fades from white into the hero image below */}
      {!pathname.startsWith('/solutii') && !pathname.startsWith('/platforma-rparking') && !pathname.startsWith('/products') && (
        <div className="absolute top-full left-0 right-0 h-14 bg-linear-to-b from-white via-white/65 to-transparent pointer-events-none" />
      )}

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center justify-between text-gray-700 hover:text-green-600 text-sm font-medium py-2 border-b border-gray-50"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="mt-2 bg-green-600 text-white text-sm font-semibold px-5 py-3 rounded-md text-center"
            onClick={() => setIsOpen(false)}
          >
            Solicită demo
          </Link>
        </div>
      )}
    </nav>
  );
}

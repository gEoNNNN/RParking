'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LuMenu, LuX, LuChevronDown } from 'react-icons/lu';

type NavLink = { label: string; href: string; children?: { label: string; href: string }[] };

const navLinks: NavLink[] = [
  { label: 'Acasă',        href: '/' },
  { label: 'Soluții',      href: '/solutii' },
  {
    label: 'Produse',
    href: '/products',
    children: [
      { label: 'Entry Point',  href: '/products/entry-point' },
      { label: 'Exit Point',   href: '/products/exit-point-cardpass' },
      { label: 'Pay Point',    href: '/products/pay-point' },
      { label: 'BackOffice',   href: '/products/backoffice' },
      { label: 'RAccess WC',   href: '/products/raccess-wc' },
    ],
  },
  { label: 'Platforma RParking', href: '/platforma-rparking' },
  { label: 'Implementări', href: '/implementari' },
  { label: 'Despre noi',   href: '/despre-noi' },
  { label: 'Contact',      href: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);
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
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative group/dropdown">
                <Link
                  href={link.href}
                  className={`relative flex items-center gap-1 px-3 py-2 text-base font-semibold whitespace-nowrap transition-colors ${
                    pathname.startsWith('/products') ? 'text-green-600' : 'text-gray-800 hover:text-green-600'
                  }`}
                >
                  {link.label}
                  <LuChevronDown className="w-4 h-4 transition-transform duration-300 group-hover/dropdown:rotate-180" />
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-0.5 bg-green-500 transition-transform duration-300 origin-left ${
                      pathname.startsWith('/products') ? 'scale-x-100' : 'scale-x-0 group-hover/dropdown:scale-x-100'
                    }`}
                  />
                </Link>
                {/* Dropdown */}
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 invisible translate-y-1 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0 transition-all duration-200 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-60">
                    {link.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className={`block px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                          isActive(c.href) ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                        }`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
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
            )
          )}
        </div>

        {/* Right side */}
        <div className="flex-1 hidden lg:flex justify-end items-center gap-3">
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
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="border-b border-gray-50">
                {/* Header with link to products page and toggle button */}
                <div className="flex items-center justify-between py-2">
                  <Link
                    href={link.href}
                    className="flex-1 text-gray-700 hover:text-green-600 text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setProdOpen(!prodOpen);
                    }}
                    className="p-2 text-gray-500 hover:text-green-600"
                    aria-label="Toggle products menu"
                  >
                    <LuChevronDown className={`w-4 h-4 transition-transform duration-300 ${prodOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                <div className={`flex flex-col pl-3 pb-2 overflow-hidden transition-all duration-300 ${prodOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {/* Link to all products */}
                  <Link
                    href="/products"
                    className="py-2 text-sm font-semibold text-green-600 hover:text-green-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Vezi toate produsele →
                  </Link>
                  {link.children.map((c) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      className="py-2 text-sm text-gray-600 hover:text-green-600"
                      onClick={() => setIsOpen(false)}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center justify-between text-gray-700 hover:text-green-600 text-sm font-medium py-2 border-b border-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
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

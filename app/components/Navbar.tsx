'use client';
import { useState } from 'react';
import Link from 'next/link';
import { LuChevronDown, LuMenu, LuX } from 'react-icons/lu';

const navLinks = [
  { label: 'Acasă', href: '/', active: true, dropdown: false },
  { label: 'Soluții', href: '#solutions', dropdown: true },
  { label: 'Produse', href: '#products', dropdown: true },
  { label: 'Tehnologie', href: '#technology', dropdown: true },
  { label: 'Despre noi', href: '#about', dropdown: false },
  { label: 'Implementări', href: '#implementations', dropdown: false },
  { label: 'Contact', href: '#contact', dropdown: false },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full absolute top-0 left-0 right-0 z-50 bg-white shadow-sm overflow-visible">
      <div className="max-w-7xl mx-auto px-6 flex items-center h-20">
        {/* Left spacer */}
        <div className="flex-1 hidden lg:block" />

        {/* Desktop nav links — center */}
        <div className="hidden lg:flex items-center gap-1 text-base font-semibold text-gray-800">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-0.5 px-3 py-2 rounded-md transition-colors hover:text-green-600 text-base font-semibold whitespace-nowrap ${
                link.active
                  ? 'text-green-600 border-b-2 border-green-500 rounded-none pb-1.5'
                  : ''
              }`}
            >
              {link.label}
              {link.dropdown && <LuChevronDown className="w-3.5 h-3.5 mt-0.5 text-gray-400" />}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex-1 hidden lg:flex justify-start items-center gap-3 pl-20">
          <Link
            href="#contact"
            className="bg-green-600 hover:bg-green-500 text-white text-base font-bold px-5 py-2.5 rounded-md transition-colors whitespace-nowrap"
          >
            Solicită demo
          </Link>
          <button className="flex items-center gap-1 text-base font-semibold text-gray-700 hover:text-green-600 transition-colors px-2 py-1.5 rounded">
            RO
            <LuChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
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
      <div className="absolute top-full left-0 right-0 h-14 bg-linear-to-b from-white via-white/65 to-transparent pointer-events-none" />

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
              {link.dropdown && (
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </Link>
          ))}
          <Link
            href="#contact"
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

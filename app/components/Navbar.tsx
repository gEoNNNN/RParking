'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
    <nav className="w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/img/logo.png"
            alt="RTi Parking Logo"
            width={130}
            height={48}
            priority
            className="object-contain"
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-0.5 px-3 py-2 rounded-md transition-colors hover:text-green-600 ${
                link.active
                  ? 'text-green-600 border-b-2 border-green-500 rounded-none pb-1.5'
                  : ''
              }`}
            >
              {link.label}
              {link.dropdown && (
                <svg className="w-3.5 h-3.5 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language selector */}
          <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-green-600 transition-colors px-2 py-1.5 rounded">
            RO
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <Link
            href="#contact"
            className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors"
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
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-3">
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

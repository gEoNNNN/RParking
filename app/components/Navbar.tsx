'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '../../i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { LuMenu, LuX, LuChevronDown } from 'react-icons/lu';

type NavLink = { key: string; href: string; children?: { label: string; href: string }[] };

const navLinks: NavLink[] = [
  { key: 'home',            href: '/' },
  { key: 'solutions',       href: '/solutii' },
  {
    key: 'products',
    href: '/products',
    children: [
      { label: 'Entry Point',  href: '/products/entry-point' },
      { label: 'Exit Point',   href: '/products/exit-point-cardpass' },
      { label: 'Pay Point',    href: '/products/pay-point' },
      { label: 'BackOffice',   href: '/products/backoffice' },
    ],
  },
  { key: 'platform',        href: '/platforma-rparking' },
  { key: 'implementations', href: '/implementari' },
  { key: 'shop',            href: '/magazin' },
  { key: 'partners',        href: '/parteneri' },
  { key: 'about',           href: '/despre-noi' },
  { key: 'contact',         href: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('Nav');

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <nav className="w-full absolute top-0 left-0 right-0 z-50 bg-white shadow-sm overflow-visible">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-8 flex items-center justify-between h-20 gap-3 2xl:gap-6">
        {/* Logo inside flex flow so it never overlaps links */}
        <Link href="/" className="shrink-0 flex items-center h-full py-2">
          <Image
            src="/img/logo.png"
            alt="RTi Parking Logo"
            width={210}
            height={80}
            priority
            className="w-36 sm:w-40 xl:w-44 2xl:w-48 h-auto object-contain"
          />
        </Link>

        {/* Desktop nav links — center */}
        <div className="hidden xl:flex items-center justify-center gap-0.5 2xl:gap-1 min-w-0">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.key} className="relative group/dropdown">
                <Link
                  href={link.href}
                  className={`relative flex items-center gap-1 px-2 2xl:px-3 py-2 text-[13.5px] 2xl:text-[15px] font-semibold whitespace-nowrap transition-colors ${
                    pathname.startsWith('/products') ? 'text-green-600' : 'text-gray-800 hover:text-green-600'
                  }`}
                >
                  {t(link.key)}
                  <LuChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover/dropdown:rotate-180" />
                  <span
                    className={`absolute bottom-0 left-2 right-2 2xl:left-3 2xl:right-3 h-0.5 bg-green-500 transition-transform duration-300 origin-left ${
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
                key={link.key}
                href={link.href}
                className={`relative group flex items-center gap-0.5 px-2 2xl:px-3 py-2 text-[13.5px] 2xl:text-[15px] font-semibold whitespace-nowrap transition-colors ${
                  isActive(link.href) ? 'text-green-600' : 'text-gray-800 hover:text-green-600'
                }`}
              >
                {t(link.key)}
                {/* Sliding underline */}
                <span
                  className={`absolute bottom-0 left-2 right-2 2xl:left-3 2xl:right-3 h-0.5 bg-green-500 transition-transform duration-300 origin-left ${
                    isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            )
          )}
        </div>

        {/* Right side */}
        <div className="hidden xl:flex shrink-0 justify-end items-center gap-2 2xl:gap-3">
          <LanguageSwitcher />
          <a
            href="https://wa.me/37369116121"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white text-xs 2xl:text-sm font-bold px-3.5 2xl:px-5 py-2 2xl:py-2.5 rounded-md transition-all duration-200 whitespace-nowrap hover:scale-105 active:scale-95 hover:shadow-md hover:shadow-green-600/30"
          >
            {t('requestDemo')}
          </a>
        </div>

        {/* Mobile / Tablet right side */}
        <div className="xl:hidden ml-auto flex items-center gap-2">
          <button
            className="text-gray-700 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Fog/mist gradient that fades from white into the hero image below */}
      {!pathname.startsWith('/solutii') && !pathname.startsWith('/platforma-rparking') && !pathname.startsWith('/products') && !pathname.startsWith('/magazin') && !pathname.startsWith('/parteneri') && !pathname.startsWith('/politica') && !pathname.startsWith('/privacy') && (
        <div className="absolute top-full left-0 right-0 h-14 bg-linear-to-b from-white via-white/65 to-transparent pointer-events-none" />
      )}

      {/* Mobile / Tablet menu */}
      {isOpen && (
        <div className="xl:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm px-6 py-4 flex flex-col gap-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-sm font-medium text-gray-700">Language</span>
            <LanguageSwitcher />
          </div>
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.key} className="border-b border-gray-50">
                {/* Header with link to products page and toggle button */}
                <div className="flex items-center justify-between py-2">
                  <Link
                    href={link.href}
                    className="flex-1 text-gray-700 hover:text-green-600 text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {t(link.key)}
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
                    {t('viewAllProducts')}
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
                key={link.key}
                href={link.href}
                className="flex items-center justify-between text-gray-700 hover:text-green-600 text-sm font-medium py-2 border-b border-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {t(link.key)}
              </Link>
            )
          )}
          <a
            href="https://wa.me/37369116121"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-green-600 text-white text-sm font-semibold px-5 py-3 rounded-md text-center"
            onClick={() => setIsOpen(false)}
          >
            {t('requestDemo')}
          </a>
        </div>
      )}
    </nav>
  );
}

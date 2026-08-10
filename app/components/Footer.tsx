'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import { LuArrowRight } from 'react-icons/lu';

export default function Footer() {
  const t = useTranslations('Footer');
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
              {t('description')}
            </p>
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold text-sm mb-4">
              <Link href="/products" className="hover:text-green-600 transition-colors">{t('products')}</Link>
            </h4>
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
            <h4 className="text-gray-900 font-semibold text-sm mb-4">
              <Link href="/products" className="hover:text-green-600 transition-colors">{t('solutions')}</Link>
            </h4>
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
            <h4 className="text-gray-900 font-semibold text-sm mb-4">
              <Link href="/solutii" className="hover:text-green-600 transition-colors">{t('solutions2')}</Link>
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: t('mall'), href: '/solutii#mall' },
                { name: t('business'), href: '/solutii#corporate' },
                { name: t('residential'), href: '/solutii#residential' },
                { name: t('municipal'), href: '/solutii#hospitals' },
                { name: t('airports'), href: '/solutii#airports' },
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
            <h4 className="text-gray-900 font-semibold text-sm mb-4">
              <Link href="/despre-noi" className="hover:text-green-600 transition-colors">{t('company')}</Link>
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: t('about'), href: '/despre-noi' },
                { name: t('implementations'), href: '/implementari' },
                { name: t('shop'), href: '/magazin' },
                { name: t('partners'), href: '/parteneri' },
                { name: t('contactLink'), href: '/#contact' },
                { name: t('support'), href: '/#contact' },
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
            <h4 className="text-gray-900 font-semibold text-sm mb-4">
              <Link href="/#contact" className="hover:text-green-600 transition-colors">{t('contact')}</Link>
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-500 text-sm">+373 069116121</li>
              <li className="flex items-center gap-3">
                <a
                  href="https://wa.me/37369116121"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
                >
                  <FaWhatsapp className="w-4 h-4" /> WhatsApp
                </a>
                <a
                  href="https://t.me/+37369116121"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors"
                >
                  <FaTelegramPlane className="w-4 h-4" /> Telegram
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-500 text-sm">{t('location')}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-xs">© 2026 RTi. {t('copyright')}</p>
          <div className="flex gap-5">
            <a href="#" className="text-gray-400 text-xs hover:text-green-600 transition-colors">{t('privacy')}</a>
            <a href="#" className="text-gray-400 text-xs hover:text-green-600 transition-colors">{t('terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '../../i18n/navigation';
import { routing } from '../../i18n/routing';
import { LuGlobe, LuCheck } from 'react-icons/lu';

const localeLabels: Record<string, string> = {
  ro: 'Română',
  ru: 'Русский',
  en: 'English',
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('LanguageSwitcher');
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleSelect = (newLocale: (typeof routing.locales)[number]) => {
    setIsOpen(false);
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        aria-label={t('label')}
      >
        <LuGlobe className="w-5 h-5" />
        <span className="text-sm font-medium uppercase">{locale}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
          {routing.locales.map((l) => (
            <button
              key={l}
              onClick={() => handleSelect(l)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                locale === l
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{localeLabels[l]}</span>
              {locale === l && <LuCheck className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

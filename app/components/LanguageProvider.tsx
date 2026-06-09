'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Locale, locales, defaultLocale } from '../lib/i18n';
import { getTranslations } from '../lib/translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: ReturnType<typeof getTranslations>;
  isValidLocale: (l: string) => l is Locale;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    if (locales.includes(newLocale)) {
      setLocaleState(newLocale);
      // Store preference in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('locale', newLocale);
      }
    }
  }, []);

  const isValidLocale = useCallback((l: string): l is Locale => {
    return locales.includes(l as Locale);
  }, []);

  const t = getTranslations(locale);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isValidLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

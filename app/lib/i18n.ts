export type Locale = 'ro' | 'ru' | 'en';

export const locales: Locale[] = ['ro', 'ru', 'en'];
export const defaultLocale: Locale = 'ro';

export const localeLabels: Record<Locale, string> = {
  ro: 'Română',
  ru: 'Русский',
  en: 'English',
};

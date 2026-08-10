import { MetadataRoute } from 'next';
import { SITE_URL } from './lib/seo';

const locales = ['ro', 'ru', 'en'] as const;
const defaultLocale = 'ro';

const routes = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/products', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/products/entry-point', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/products/exit-point-cardpass', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/products/exit-point-ticket', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/products/pay-point', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/products/backoffice', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/products/raccess-wc', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/products/rchange', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/solutii', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/magazin', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/parteneri', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/implementari', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/despre-noi', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/platforma-rparking', priority: 0.7, changeFrequency: 'monthly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const sitemap: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      const url = `${baseUrl}/${locale}${route.path}`;
      const alternates: MetadataRoute.Sitemap[number]['alternates'] = {
        languages: Object.fromEntries(
          locales.map((loc) => [loc, `${baseUrl}/${loc}${route.path}`])
        ),
      };

      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates,
      });
    }
  }

  return sitemap;
}

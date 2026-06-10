import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/img/'],
    },
    sitemap: 'https://rparking.md/sitemap.xml',
  };
}

import { MetadataRoute } from 'next';
import { SITE_NAME, SITE_URL } from './lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} – Sistem inteligent de parcare`,
    short_name: SITE_NAME,
    description: 'Sistem complet de automatizare a parcărilor: control acces, bariere automate, plăți automate. Dezvoltat în Republica Moldova.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#16a34a',
    icons: [
      { src: '/img/logo.png', sizes: '192x192', type: 'image/png' },
      { src: '/img/logo.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}

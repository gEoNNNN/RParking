import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '../../i18n/navigation';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BenefitsBar from '../components/BenefitsBar';
import ProductEcosystem from '../components/ProductEcosystem';
import HowItWorks from '../components/HowItWorks';
import RealImplementations from '../components/RealImplementations';
import MobileAppSection from '../components/MobileAppSection';
import TargetAudience from '../components/TargetAudience';
import WhyRParking from '../components/WhyRParking';
import RTISolutions from '../components/RTISolutions';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../lib/seo';

export const metadata: Metadata = {
  title: 'RParking – Sistem inteligent de parcare automatizată | Moldova',
  description:
    'Sistem complet de automatizare a parcărilor dezvoltat în Republica Moldova: control acces, bariere automate, plăți cash și card, monitorizare în timp real. Hardware și software propriu RTi.',
  keywords: [
    'sistem parcare',
    'parcare automatizată',
    'parcare inteligentă',
    'management parcare',
    'bariere automate parcare',
    'bariera parcare automata',
    'control acces parcare',
    'terminal plată parcare',
    'echipament parcare',
    'echipamente parcare automatizata',
    'statie intrare parcare',
    'statie iesire parcare',
    'tichete parcare automat',
    'intrare automata parcare',
    'iesire automata parcare',
    'sistem parcare Moldova',
    'parcare Chișinău',
    'echipamente parcare',
    'software parcare',
    'automatizare parcare',
    'Entry Point parcare',
    'Exit Point parcare',
    'Pay Point parcare',
    'BackOffice parcare',
    'ANPR parcare',
    'parcare QR code',
    'parcare NFC',
    'RParking',
    'RTi Systems',
    'RTi Systems Moldova',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'RParking – Sistem inteligent de parcare automatizată',
    description:
      'Soluție completă pentru parcări moderne: control acces, plăți automate, monitorizare în timp real. Dezvoltat și produs în Republica Moldova.',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'RParking – Sistem inteligent de parcare',
      },
    ],
  },
};

export default function Home() {
  return (
    <main>
      <div className="relative">
        <Navbar />
        <Link href="/" className="absolute top-0 left-1/2 -translate-x-[38%] lg:left-20 lg:translate-x-0 z-50 h-20 flex items-center">
          <Image
            src="/img/logo.png"
            alt="RTi Parking Logo"
            width={210}
            height={80}
            priority
            className="object-contain"
          />
        </Link>
        <HeroSection />
      </div>
      <BenefitsBar />
      <ProductEcosystem />
      <HowItWorks />
      <RealImplementations />
      <MobileAppSection />
      <TargetAudience />
      <WhyRParking />
      <RTISolutions />
      <CTABanner />
      <Footer />
    </main>
  );
}
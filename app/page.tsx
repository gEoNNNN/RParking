import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BenefitsBar from './components/BenefitsBar';
import ProductEcosystem from './components/ProductEcosystem';
import HowItWorks from './components/HowItWorks';
import RealImplementations from './components/RealImplementations';
import TargetAudience from './components/TargetAudience';
import WhyRParking from './components/WhyRParking';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <div className="relative">
        <Navbar />
        <Link href="/" className="absolute top-0 left-20 z-50 h-20 flex items-center">
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
      <TargetAudience />
      <WhyRParking />
      <CTABanner />
      <Footer />
    </main>
  );
}

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BenefitsBar from './components/BenefitsBar';
import ProductEcosystem from './components/ProductEcosystem';
import HowItWorks from './components/HowItWorks';
import Statistics from './components/Statistics';
import RealImplementations from './components/RealImplementations';
import TargetAudience from './components/TargetAudience';
import WhyRParking from './components/WhyRParking';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <BenefitsBar />
      <ProductEcosystem />
      <HowItWorks />
      <Statistics />
      <RealImplementations />
      <TargetAudience />
      <WhyRParking />
      <CTABanner />
      <Footer />
    </main>
  );
}

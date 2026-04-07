import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LogoStrip from '@/components/LogoStrip';
import BentoFeatures from '@/components/BentoFeatures';
import TestimonialSection from '@/components/TestimonialSection';
import NoteStack from '@/components/NoteStack';
import PricingSection from '@/components/PricingSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${progress * 100}%` }} />;
}

export default function Index() {
  return (
    <div className="relative min-h-screen">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <LogoStrip />
      <BentoFeatures />
      <TestimonialSection />
      <NoteStack />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}

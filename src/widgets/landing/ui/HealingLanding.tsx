'use client';

import { GradientBG } from '@/shared/ui/background/GradientBG';
import { CTABanner } from '@/widgets/landing/ui/CTABanner';
import { FAQ } from '@/widgets/landing/ui/FAQ';
import { FeaturesGrid } from '@/widgets/landing/ui/FeaturesGrid';
import { Hero } from '@/widgets/landing/ui/Hero';
import { HowItWorks } from '@/widgets/landing/ui/HowItWorks';
import { Testimonials } from '@/widgets/landing/ui/Testimonials';
import { LandingFooter } from './LandingFooter';

export const HealingLanding = () => {
  return (
    <div className="-mx-mobile-padding tablet:-mx-tablet-padding web:mx-0 relative min-h-screen bg-gradient-to-b from-sky-50 via-rose-50 to-amber-50 text-slate-800">
      <GradientBG />
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <Testimonials />
      <CTABanner />
      <FAQ />
      <LandingFooter />
    </div>
  );
};

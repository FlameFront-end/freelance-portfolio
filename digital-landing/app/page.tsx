import { FaqSection } from "@/components/home/sections/faq-section";
import { FeaturesSection } from "@/components/home/sections/features-section";
import { FinalCtaSection } from "@/components/home/sections/final-cta-section";
import { HomeScrollSync } from "@/components/navigation/home-scroll-sync";
import { HeroSection } from "@/components/home/sections/hero-section";
import { PricingTeaserSection } from "@/components/home/sections/pricing-teaser-section";
import { ScrollElement } from "@/components/navigation/scroll-element";
import { ShowcaseSection } from "@/components/home/sections/showcase-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SocialProofSection } from "@/components/home/sections/social-proof-section";
import { TestimonialsSection } from "@/components/home/sections/testimonials-section";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="background-radial pointer-events-none" />
      <div className="background-grid pointer-events-none" />
      <HomeScrollSync />
      <main>
        <HeroSection />
        <SocialProofSection />
        <ScrollElement name="features">
          <FeaturesSection />
        </ScrollElement>
        <ScrollElement name="showcase">
          <ShowcaseSection />
        </ScrollElement>
        <TestimonialsSection />
        <PricingTeaserSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}



import { PricingPageContent } from "@/components/pages/pricing-page-content";
import { SiteFooter } from "@/components/layout/site-footer";

export default function PricingPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="background-radial pointer-events-none" />
      <div className="background-grid pointer-events-none" />
      <main>
        <PricingPageContent />
      </main>
      <SiteFooter />
    </div>
  );
}



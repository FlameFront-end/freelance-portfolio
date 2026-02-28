import { DocsPageContent } from "@/components/pages/docs-page-content";
import { SiteFooter } from "@/components/layout/site-footer";

export default function DocsPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="background-radial pointer-events-none" />
      <div className="background-grid pointer-events-none" />
      <main>
        <DocsPageContent />
      </main>
      <SiteFooter />
    </div>
  );
}



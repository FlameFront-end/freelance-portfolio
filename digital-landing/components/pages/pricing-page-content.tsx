import { comparisonRows } from "@/content/site-content";
import { PricingPlansSwitcher } from "@/components/pages/pricing-plans-switcher";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

export function PricingPageContent() {
  return (
    <SectionShell className="pt-28 sm:pt-32">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple pricing for fast-moving teams"
        description="Switch between monthly and yearly billing. Yearly plans include two months free."
      />

      <PricingPlansSwitcher />

      <div className="glass-panel mt-10 overflow-x-auto rounded-3xl p-6 sm:p-8">
        <h3 className="font-display text-2xl text-white">Plan comparison</h3>
        <table className="mt-6 w-full min-w-[680px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/12 text-slate-400">
              <th className="py-3 font-medium">Feature</th>
              <th className="py-3 font-medium">Starter</th>
              <th className="py-3 font-medium">Pro</th>
              <th className="py-3 font-medium">Team</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.feature} className="border-b border-white/8 text-slate-200">
                <td className="py-3 pr-4">{row.feature}</td>
                <td className="py-3 pr-4">{row.starter}</td>
                <td className="py-3 pr-4">{row.pro}</td>
                <td className="py-3">{row.team}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}



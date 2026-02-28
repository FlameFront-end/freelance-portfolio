import { plans } from "@/content/site-content";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

export function PricingTeaserSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Pricing"
        title="Plans for products at every stage"
        description="Start with Starter, grow into Pro, and scale with Team workflows."
        actions={
          <ButtonLink href="/pricing" variant="secondary" size="md">
            See full pricing
          </ButtonLink>
        }
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`rounded-2xl p-6 ${
              plan.featured
                ? "glass-panel-strong interactive-card"
                : "glass-panel interactive-card"
            }`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-100/85">{plan.name}</p>
            <p className="mt-4 font-display text-4xl text-white">${plan.monthly}</p>
            <p className="mt-1 text-xs text-slate-400">per month</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">{plan.description}</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-200">
              {plan.features.slice(0, 3).map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-200" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}



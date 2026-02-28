"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { plans } from "@/content/site-content";
import { ButtonLink } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";

export function PricingPlansSwitcher() {
  const [billingMode, setBillingMode] = useState<"monthly" | "yearly">("monthly");

  const visiblePrices = useMemo(
    () =>
      plans.map((plan) => ({
        ...plan,
        activePrice: billingMode === "monthly" ? plan.monthly : plan.yearly,
      })),
    [billingMode],
  );

  return (
    <>
      <div className="mt-8 inline-flex rounded-full border border-teal-100/20 bg-white/[0.03] p-1">
        {(["monthly", "yearly"] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setBillingMode(mode)}
            className={cn(
              "cursor-pointer rounded-full px-5 py-2 text-sm font-medium capitalize transition-all duration-300",
              billingMode === mode ? "bg-teal-200/18 text-teal-100" : "text-slate-300 hover:text-white",
            )}
          >
            {mode}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {visiblePrices.map((plan) => (
          <article
            key={plan.name}
            className={cn(
              "glass-panel interactive-card flex h-full flex-col rounded-2xl p-6",
              plan.featured ? "glass-panel-strong" : "",
            )}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-100/80">{plan.name}</p>
              {plan.featured ? (
                <span className="rounded-full border border-teal-200/40 bg-teal-100/15 px-3 py-1 text-[11px] font-medium text-teal-50">
                  Most popular
                </span>
              ) : null}
            </div>
            <p className="mt-5 font-display text-4xl text-white">{formatPrice(plan.activePrice)}</p>
            <p className="mt-1 text-xs text-slate-400">per {billingMode === "monthly" ? "month" : "year"}</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">{plan.description}</p>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm text-slate-200">
                  <Check size={16} className="mt-0.5 text-teal-100" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-7">
              <ButtonLink
                href="#"
                variant={plan.featured ? "primary" : "secondary"}
                size="lg"
                className="w-full"
              >
                Start {plan.name}
              </ButtonLink>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

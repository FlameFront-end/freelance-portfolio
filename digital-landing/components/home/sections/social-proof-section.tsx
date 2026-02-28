"use client";

import Marquee from "react-fast-marquee";
import { socialProof } from "@/content/site-content";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { SectionShell } from "@/components/ui/section-shell";

export function SocialProofSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <SectionShell className="py-10 sm:py-12">
      <div className="glass-panel rounded-3xl px-6 py-7 sm:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-300/80">{socialProof.text}</p>
        <div className="mt-6 overflow-hidden rounded-2xl">
          {prefersReducedMotion ? (
            <div className="flex flex-wrap justify-center gap-2 p-2">
              {socialProof.companies.map((company) => (
                <span
                  key={company}
                  className="inline-flex h-10 shrink-0 items-center rounded-xl border border-white/10 bg-slate-900/35 px-4 text-sm font-medium text-slate-200"
                >
                  {company}
                </span>
              ))}
            </div>
          ) : (
            <Marquee className="social-marquee" autoFill speed={35} pauseOnHover={false}>
              {socialProof.companies.map((company, index) => (
                <span
                  key={`${company}-${index}`}
                  className="mx-2 inline-flex h-10 shrink-0 items-center rounded-xl border border-white/10 bg-slate-900/35 px-4 text-sm font-medium text-slate-200"
                >
                  {company}
                </span>
              ))}
            </Marquee>
          )}
        </div>
      </div>
    </SectionShell>
  );
}



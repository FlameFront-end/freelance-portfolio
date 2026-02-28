import { ButtonLink } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";

export function FinalCtaSection() {
  return (
    <SectionShell className="pb-14 pt-6">
      <div className="glass-panel rounded-3xl px-6 py-10 sm:px-10 sm:py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">Ready to build</p>
        <h2 className="font-display mt-4 max-w-3xl text-3xl leading-tight text-white sm:text-4xl">
          Build a premium web app surface that users trust on first contact.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          Start with Nebula templates and deliver a cohesive interface in days, not months.
        </p>
        <div className="mt-8">
          <ButtonLink href="/pricing" variant="primary" size="lg">
            Get started
          </ButtonLink>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <div className="final-cta-metric rounded-xl px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">Templates</p>
            <p className="font-display mt-2 text-xl text-white">42</p>
          </div>
          <div className="final-cta-metric rounded-xl px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">Motion presets</p>
            <p className="font-display mt-2 text-xl text-white">18</p>
          </div>
          <div className="final-cta-metric rounded-xl px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">Live blocks</p>
            <p className="font-display mt-2 text-xl text-white">120+</p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}



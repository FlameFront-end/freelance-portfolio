import { testimonials } from "@/content/site-content";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

export function TestimonialsSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Testimonials"
        title="Teams describe Nebula as fast and dependable"
        description="Short feedback from product teams shipping on weekly release cycles."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.name} className="glass-panel interactive-card rounded-2xl p-6">
            <p className="text-sm leading-7 text-slate-200">
              &ldquo;{item.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] font-semibold text-teal-100">
                {item.name
                  .split(" ")
                  .map((chunk) => chunk[0])
                  .join("")}
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs text-slate-400">
                  {item.role} · {item.company}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}



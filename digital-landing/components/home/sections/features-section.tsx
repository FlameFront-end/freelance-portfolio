"use client";

import { motion } from "framer-motion";
import { Code2, LayoutTemplate, Layers, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { features } from "@/content/site-content";
import { SectionShell } from "@/components/ui/section-shell";
import { SectionHeading } from "@/components/ui/section-heading";

const iconMap = {
  layers: Layers,
  palette: Palette,
  sparkles: Sparkles,
  shield: ShieldCheck,
  layout: LayoutTemplate,
  code: Code2,
};

export function FeaturesSection() {
  return (
    <SectionShell id="features">
      <SectionHeading
        eyebrow="Features"
        title="Everything you need for premium product surfaces"
        description="Pre-built components, elegant motion, and clear design tokens let your team ship polished experiences without rebuilding the basics."
      />

      <motion.div
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.09 } },
        }}
      >
        {features.map((feature) => {
          const Icon = iconMap[feature.icon];
          return (
            <motion.article
              key={feature.title}
              variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.44, ease: "easeOut" }}
              className="glass-panel interactive-card group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-teal-200/50 to-transparent" />
              <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-teal-200/25 bg-teal-100/10 text-teal-100 transition-colors duration-300 group-hover:bg-teal-200/18">
                <Icon size={18} />
              </span>
              <h3 className="font-display text-xl text-white transition-colors duration-300 group-hover:text-teal-50">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
              <p className="mt-5 text-xs uppercase tracking-[0.16em] text-teal-100/70">Production ready</p>
            </motion.article>
          );
        })}
      </motion.div>
    </SectionShell>
  );
}



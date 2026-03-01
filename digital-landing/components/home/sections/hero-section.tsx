"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { heroContent } from "@/content/site-content";
import { scrollToSection } from "@/lib/section-scroll";
import { ButtonLink, buttonClassName } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";

const HeroOrb = dynamic(() => import("@/components/home/visuals/hero-orb"), {
  ssr: false,
  loading: () => (
    <div className="h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(148,163,184,0.26),rgba(71,85,105,0.2)_45%,transparent_75%)] blur-md sm:h-[380px] sm:w-[380px]" />
  ),
});

const riseUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const heroStats = [
  { label: "Weekly launches", value: "58+" },
  { label: "Avg setup", value: "43 min" },
  { label: "Design consistency", value: "99.2%" },
];

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToShowcase = () => {
    if (prefersReducedMotion) {
      const target = document.getElementById("showcase");
      if (!target) return;

      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 110);
      window.scrollTo({ top, behavior: "auto" });
      return;
    }

    scrollToSection("showcase");
  };

  return (
    <SectionShell className="pt-28 sm:pt-32">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate={prefersReducedMotion ? undefined : "visible"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p
            variants={riseUp}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-6 inline-flex items-center rounded-full border border-slate-300/20 bg-white/[0.04] px-4 py-1 text-xs uppercase tracking-[0.18em] text-slate-200/85"
          >
            {heroContent.badge}
          </motion.p>
          <motion.h1
            variants={riseUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-display text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl"
          >
            <span className="hero-heading">Ship premium</span>
            <br />
            <span className="hero-heading-accent">product UI faster.</span>
          </motion.h1>
          <motion.p
            variants={riseUp}
            transition={{ duration: 0.48, ease: "easeOut" }}
            className="mt-6 max-w-2xl text-base leading-8 text-slate-300"
          >
            {heroContent.subtitle}
          </motion.p>
          <motion.div
            variants={riseUp}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <ButtonLink href="/pricing" variant="primary" size="lg">
              {heroContent.primaryCta}
            </ButtonLink>
            <button
              type="button"
              className={`${buttonClassName("secondary", "lg")} cursor-pointer`}
              onClick={handleScrollToShowcase}
            >
              {heroContent.secondaryCta}
            </button>
          </motion.div>
          <motion.div
            variants={riseUp}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mt-8 grid gap-3 sm:grid-cols-3"
          >
            {heroStats.map((stat) => (
              <div key={stat.label} className="hero-kpi-card rounded-2xl px-4 py-3">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{stat.label}</p>
                <p className="font-display mt-2 text-xl text-white">{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.18 }}
          className="relative isolate"
        >
          <div className="absolute inset-6 -z-10 rounded-full bg-slate-300/10 blur-3xl" />
          <motion.div
            className="glass-panel-strong absolute -left-2 top-6 hidden rounded-2xl px-4 py-3 md:block"
            animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
            transition={prefersReducedMotion ? undefined : { duration: 6, ease: "easeInOut", repeat: Infinity }}
          >
            <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">Live quality score</p>
            <p className="font-display mt-1 text-lg text-slate-100">98.4</p>
          </motion.div>
          <motion.div
            className="glass-panel absolute -bottom-1 right-6 hidden rounded-2xl px-4 py-3 md:block"
            animate={prefersReducedMotion ? undefined : { y: [0, 9, 0] }}
            transition={prefersReducedMotion ? undefined : { duration: 7.5, ease: "easeInOut", repeat: Infinity }}
          >
            <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">Deploy speed</p>
            <p className="font-display mt-1 text-lg text-slate-100">4m 12s</p>
          </motion.div>
          <div className="flex justify-center">
            <HeroOrb />
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}



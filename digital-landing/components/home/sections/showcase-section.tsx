"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { showcaseTabs } from "@/content/site-content";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { cn } from "@/lib/utils";

export function ShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = showcaseTabs[activeIndex];

  return (
    <SectionShell id="showcase">
      <SectionHeading
        eyebrow="Showcase"
        title="Switch product views without visual breakage"
        description="A mini gallery that mirrors real product contexts: dashboard, billing, and analytics."
      />

      <div className="mt-8 flex flex-wrap gap-3">
        {showcaseTabs.map((tab, index) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
              index === activeIndex
                ? "border-teal-100/50 bg-teal-200/15 text-teal-50"
                : "border-white/15 bg-white/[0.03] text-slate-300 hover:bg-white/[0.08]",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="glass-panel mt-6 rounded-3xl p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h3 className="font-display text-2xl text-white sm:text-3xl">{activeTab.heading}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">{activeTab.description}</p>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {activeTab.metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/14 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{metric.label}</p>
                  <p className="mt-3 font-display text-2xl text-teal-100">{metric.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-[2fr_1fr]">
              <div className="rounded-2xl border border-teal-100/18 bg-slate-900/60 p-4">
                <div className="mb-4 flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-300/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[62, 38, 74, 52].map((height, index) => (
                    <div key={height} className="rounded-xl border border-white/7 bg-slate-800/50 p-3">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Signal {index + 1}</p>
                      <div className="mt-3 h-20 rounded-lg bg-slate-900/80 p-2">
                        <motion.div
                          className="h-full rounded-md bg-gradient-to-t from-teal-500/30 via-teal-300/45 to-teal-100/60"
                          initial={{ height: "24%" }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-teal-100/18 bg-slate-900/60 p-4">
                <div className="rounded-xl border border-white/10 bg-slate-900/80 p-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Release pulse</p>
                  <div className="mt-3 space-y-2">
                    {[32, 56, 44, 74].map((width, index) => (
                      <motion.div
                        key={width}
                        className="h-2.5 rounded-full bg-gradient-to-r from-teal-200/85 to-emerald-200/70"
                        initial={{ width: "12%" }}
                        animate={{ width: `${width}%` }}
                        transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.06 }}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-3 rounded-xl border border-white/10 bg-slate-900/80 p-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">System note</p>
                  <p className="mt-2 text-xs leading-6 text-slate-300">
                    Build flow remains stable across dashboard, billing, and analytics workloads.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionShell>
  );
}



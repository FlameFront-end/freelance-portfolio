"use client";

import { useCallback, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { scrollToElementById } from "@/lib/section-scroll";
import { cn } from "@/lib/utils";

type DocsSidebarNavProps = {
  sectionLinks: Array<{ label: string; id: string }>;
};

const ACTIVE_SECTION_THRESHOLDS = [0, 0.2, 0.4, 0.6, 0.8, 1];

export function DocsSidebarNav({ sectionLinks }: DocsSidebarNavProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeSection, setActiveSection] = useState(sectionLinks[0]?.id ?? "getting-started");
  const activeIndex = Math.max(0, sectionLinks.findIndex((item) => item.id === activeSection));

  const scrollToSection = useCallback(
    (id: string) => {
      if (prefersReducedMotion) {
        const target = document.getElementById(id);
        if (!target) return;

        const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 110);
        window.scrollTo({ top, behavior: "auto" });
        return;
      }

      scrollToElementById(id, 110, 560);
    },
    [prefersReducedMotion],
  );

  useEffect(() => {
    if (!sectionLinks.length) return;
    if (typeof IntersectionObserver === "undefined") return;

    const sectionVisibility = new Map<string, number>();

    const updateActiveSection = () => {
      let next: string | null = null;
      let bestScore = -1;

      sectionLinks.forEach((item, index) => {
        const ratio = sectionVisibility.get(item.id) ?? 0;
        if (ratio <= 0) return;

        const score = ratio + index * 0.0001;
        if (score > bestScore) {
          bestScore = score;
          next = item.id;
        }
      });

      if (!next) return;
      const nextSectionId = next;
      setActiveSection((prev) => (prev === nextSectionId ? prev : nextSectionId));
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id;
          sectionVisibility.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        updateActiveSection();
      },
      {
        root: null,
        rootMargin: "-120px 0px -45% 0px",
        threshold: ACTIVE_SECTION_THRESHOLDS,
      },
    );

    sectionLinks.forEach((item) => {
      const element = document.getElementById(item.id);
      if (!element) return;
      sectionVisibility.set(item.id, 0);
      sectionObserver.observe(element);
    });

    const lastSectionId = sectionLinks[sectionLinks.length - 1]?.id;
    const bottomSentinel = document.getElementById("docs-bottom-sentinel");
    const bottomObserver = new IntersectionObserver(
      (entries) => {
        if (!lastSectionId) return;
        if (!entries.some((entry) => entry.isIntersecting)) return;

        setActiveSection((prev) => (prev === lastSectionId ? prev : lastSectionId));
      },
      { threshold: 0 },
    );

    if (bottomSentinel) bottomObserver.observe(bottomSentinel);

    return () => {
      sectionObserver.disconnect();
      bottomObserver.disconnect();
    };
  }, [sectionLinks]);

  return (
    <aside className="glass-panel h-fit rounded-2xl p-5 lg:sticky lg:top-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Documentation</p>
      <nav className="relative mt-4 flex flex-col gap-2">
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 h-10 rounded-lg border border-white/20 bg-white/10 transition-transform",
            prefersReducedMotion ? "duration-0" : "duration-300 ease-out",
          )}
          style={{ transform: `translate3d(0, ${activeIndex * 48}px, 0)` }}
        />
        {sectionLinks.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setActiveSection(item.id);
              scrollToSection(item.id);
            }}
            className={cn(
              "relative block h-10 w-full cursor-pointer overflow-hidden rounded-lg border px-3 py-2 text-left text-sm transition-all",
              activeSection === item.id
                ? "border-white/20 text-white"
                : "border-transparent text-slate-200 hover:border-white/20 hover:bg-white/10",
            )}
          >
            <span className="relative z-10">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

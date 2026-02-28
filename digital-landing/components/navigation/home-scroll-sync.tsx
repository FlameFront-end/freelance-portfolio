"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToSectionWhenReady } from "@/lib/section-scroll";

const HOME_SCROLL_TARGET_KEY = "homeScrollTarget";

export function HomeScrollSync() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const section = window.sessionStorage.getItem(HOME_SCROLL_TARGET_KEY);
    if (!section) {
      const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (navEntry?.type === "reload") {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
      return;
    }
    if (section !== "features" && section !== "showcase") return;

    window.sessionStorage.removeItem(HOME_SCROLL_TARGET_KEY);
    const stop = scrollToSectionWhenReady(section);

    return stop;
  }, [pathname]);

  return null;
}

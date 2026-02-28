"use client";

import { animateScroll } from "react-scroll";

export type HomeSection = "features" | "showcase";

const SCROLL_OFFSET = 110;
const SCROLL_DURATION = 560;

export function scrollToSection(section: HomeSection) {
  return scrollToElementById(section);
}

export function scrollToSectionWhenReady(section: HomeSection) {
  if (typeof window === "undefined") return () => {};

  let cancelled = false;
  let attempts = 0;
  let timer: number | undefined;

  const tick = () => {
    if (cancelled) return;
    if (scrollToSection(section)) return;

    attempts += 1;
    if (attempts > 24) return;

    timer = window.setTimeout(tick, 40);
  };

  tick();

  return () => {
    cancelled = true;
    if (timer) window.clearTimeout(timer);
  };
}

export function scrollToElementById(id: string, offset = SCROLL_OFFSET, duration = SCROLL_DURATION) {
  if (typeof window === "undefined") return false;

  const target = document.getElementById(id);
  if (!target) return false;

  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);

  animateScroll.scrollTo(top, {
    duration,
    smooth: "easeOutQuad",
  });

  return true;
}

export function scrollToTop() {
  animateScroll.scrollToTop({
    duration: 500,
    smooth: "easeOutQuad",
  });
}

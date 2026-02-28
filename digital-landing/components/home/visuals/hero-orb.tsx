"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function HeroOrb() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative mx-auto h-[360px] w-[360px] max-w-full lg:h-[430px] lg:w-[430px]">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_25%_25%,rgba(148,163,184,0.34),rgba(71,85,105,0.12)_45%,transparent_70%)] blur-xl" />
      <motion.div
        className="absolute inset-8 rounded-full border border-slate-300/22"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={prefersReducedMotion ? undefined : { repeat: Infinity, ease: "linear", duration: 28 }}
      />
      <motion.div
        className="absolute inset-6 rounded-full border border-slate-200/10"
        animate={prefersReducedMotion ? undefined : { rotate: -360 }}
        transition={prefersReducedMotion ? undefined : { repeat: Infinity, ease: "linear", duration: 42 }}
      />
      <motion.div
        className="absolute inset-14 rounded-full border border-slate-300/14"
        animate={prefersReducedMotion ? undefined : { rotate: -360 }}
        transition={prefersReducedMotion ? undefined : { repeat: Infinity, ease: "linear", duration: 21 }}
      />
      <motion.div
        className="absolute inset-[18%] rounded-full bg-[conic-gradient(from_0deg,rgba(226,232,240,0.22),rgba(148,163,184,0.08),rgba(203,213,225,0.2),rgba(226,232,240,0.22))]"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={prefersReducedMotion ? undefined : { repeat: Infinity, ease: "linear", duration: 14 }}
      />
      <motion.div
        className="absolute inset-[22%] rounded-full bg-[linear-gradient(135deg,rgba(203,213,225,0.72),rgba(100,116,139,0.3))] shadow-[0_0_88px_-26px_rgba(148,163,184,0.45)]"
        animate={prefersReducedMotion ? undefined : { y: [0, -12, 0], scale: [1, 1.04, 1] }}
        transition={prefersReducedMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-[34%] rounded-full border border-slate-200/28 bg-slate-950/58"
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1] }}
        transition={prefersReducedMotion ? undefined : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[10%] top-[18%] h-16 w-16 rounded-full bg-slate-200/14 blur-lg"
        animate={prefersReducedMotion ? undefined : { y: [0, 14, 0], x: [0, 6, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[14%] right-[12%] h-20 w-20 rounded-full bg-slate-300/10 blur-xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -10, 0], x: [0, -8, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}



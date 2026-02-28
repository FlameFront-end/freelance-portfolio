import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function SectionShell({ id, className, children }: SectionShellProps) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20", className)}>
      {children}
    </section>
  );
}



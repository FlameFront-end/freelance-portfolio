import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  actions?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  actions,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div className={cn(isCentered ? "text-center" : "text-left", className)}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal-200/80">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl">{title}</h2>
      <div className={cn("mt-4 h-px w-24 bg-gradient-to-r from-teal-200/85 to-transparent", isCentered ? "mx-auto" : "")} />
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-sm leading-7 text-slate-300/90 sm:text-base",
            isCentered ? "mx-auto" : "",
          )}
        >
          {description}
        </p>
      ) : null}
      {actions ? <div className={cn("mt-6", isCentered ? "flex justify-center" : "")}>{actions}</div> : null}
    </div>
  );
}



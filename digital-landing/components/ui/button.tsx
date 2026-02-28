import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-slate-300/28 bg-[linear-gradient(180deg,rgba(51,65,85,0.96),rgba(30,41,59,0.94))] text-slate-50 shadow-[0_12px_26px_-16px_rgba(2,6,23,0.95)] hover:border-slate-200/36 hover:bg-[linear-gradient(180deg,rgba(71,85,105,0.96),rgba(30,41,59,0.96))]",
  secondary:
    "bg-white/[0.04] text-slate-100 border border-white/20 hover:bg-white/[0.1]",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
};

export function buttonClassName(variant: ButtonVariant = "primary", size: ButtonSize = "md") {
  return cn(
    "inline-flex cursor-pointer items-center justify-center rounded-full font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
    variantClasses[variant],
    sizeClasses[size],
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(buttonClassName(variant, size), className)}>
      {children}
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return <button className={cn(buttonClassName(variant, size), className)} {...props} />;
}



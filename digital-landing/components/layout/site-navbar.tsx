"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/content/site-content";
import { cn } from "@/lib/utils";
import { scrollToSection, scrollToTop } from "@/lib/section-scroll";
import { ButtonLink } from "@/components/ui/button";

const HOME_SCROLL_TARGET_KEY = "homeScrollTarget";

export function SiteNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen]);

  const setHomeScrollTarget = (section: "features" | "showcase") => {
    window.sessionStorage.setItem(HOME_SCROLL_TARGET_KEY, section);
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;

    event.preventDefault();
    scrollToTop();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
      <div
        className={cn(
          "mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-400 sm:px-6",
          isScrolled
            ? "border-white/14 bg-slate-950/78 shadow-[0_14px_36px_-24px_rgba(15,23,42,0.75)] backdrop-blur-xl"
            : "border-white/10 bg-slate-950/38 backdrop-blur-md",
        )}
      >
        <NextLink
          href="/"
          scroll={!isHome}
          onClick={handleLogoClick}
          className="cursor-pointer font-display text-lg font-semibold tracking-wide text-white"
        >
          Nebula
        </NextLink>

        <nav className="hidden items-center gap-7 text-sm text-slate-200 md:flex">
          {navLinks.map((item) => {
            if (item.section && isHome) {
              const section = item.section;

              return (
                <button
                  type="button"
                  key={item.label}
                  className="hover-underline-grow cursor-pointer border-0 bg-transparent p-0 transition-colors duration-300 hover:text-slate-100"
                  onClick={() => scrollToSection(section)}
                >
                  {item.label}
                </button>
              );
            }

            if (item.type === "scroll" && item.section) {
              const section = item.section;

              return (
                <NextLink
                  key={item.label}
                  href="/"
                  scroll={false}
                  onClick={() => {
                    setHomeScrollTarget(section);
                  }}
                  className="hover-underline-grow cursor-pointer transition-colors duration-300 hover:text-slate-100"
                >
                  {item.label}
                </NextLink>
              );
            }

            const href = item.href ?? "/";
            const isAboutLink = href === "/";

            if (isAboutLink && isHome) {
              return (
                <button
                  type="button"
                  key={item.label}
                  className="hover-underline-grow cursor-pointer border-0 bg-transparent p-0 transition-colors duration-300 hover:text-slate-100"
                  onClick={() => scrollToTop()}
                >
                  {item.label}
                </button>
              );
            }

            return (
              <NextLink
                key={item.label}
                href={href}
                className="hover-underline-grow cursor-pointer transition-colors duration-300 hover:text-slate-100"
              >
                {item.label}
              </NextLink>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink href="#" variant="secondary" size="md">
            Login
          </ButtonLink>
          <ButtonLink href="/pricing" variant="primary" size="md">
            Get started
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-100 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isOpen ? (
        <div className="mx-auto mt-3 w-full max-w-6xl rounded-2xl border border-white/20 bg-slate-950/95 p-5 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-4 text-sm text-slate-100">
            {navLinks.map((item) => {
              if (item.section && isHome) {
                const section = item.section;

                return (
                  <button
                    type="button"
                    key={item.label}
                    onClick={() => {
                      setIsOpen(false);
                      scrollToSection(section);
                    }}
                    className="w-full cursor-pointer rounded-lg border-0 bg-transparent px-3 py-2 text-left transition-colors hover:bg-white/10"
                  >
                    {item.label}
                  </button>
                );
              }

              if (item.type === "scroll" && item.section) {
                const section = item.section;

                return (
                  <NextLink
                    key={item.label}
                    href="/"
                    scroll={false}
                    onClick={() => {
                      setIsOpen(false);
                      setHomeScrollTarget(section);
                    }}
                    className="cursor-pointer rounded-lg px-3 py-2 transition-colors hover:bg-white/10"
                  >
                    {item.label}
                  </NextLink>
                );
              }

              const href = item.href ?? "/";
              const isAboutLink = href === "/";

              if (isAboutLink && isHome) {
                return (
                  <button
                    type="button"
                    key={item.label}
                    onClick={() => {
                      setIsOpen(false);
                      scrollToTop();
                    }}
                    className="w-full cursor-pointer rounded-lg border-0 bg-transparent px-3 py-2 text-left transition-colors hover:bg-white/10"
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <NextLink
                  key={item.label}
                  href={href}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="cursor-pointer rounded-lg px-3 py-2 transition-colors hover:bg-white/10"
                >
                  {item.label}
                </NextLink>
              );
            })}
          </nav>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <ButtonLink href="#" variant="secondary" size="md" className="w-full">
              Login
            </ButtonLink>
            <ButtonLink href="/pricing" variant="primary" size="md" className="w-full">
              Get started
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}

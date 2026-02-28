import Link from "next/link";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Showcase", href: "/#showcase" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "X", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 sm:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[1.2fr_2fr]">
        <div>
          <Link href="/" className="font-display text-2xl text-white">
            Nebula
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-7 text-slate-400">
            A premium concept landing for modern digital products.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{column.title}</p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover-underline-grow text-sm text-slate-300 transition-colors hover:text-teal-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-8 w-full max-w-6xl border-t border-white/10 pt-5 text-xs text-slate-500">
        © 2026 Nebula
      </div>
    </footer>
  );
}



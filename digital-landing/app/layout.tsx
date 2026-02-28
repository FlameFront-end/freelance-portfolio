import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import { SiteNavbar } from "@/components/layout/site-navbar";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nebula-landing.vercel.app"),
  title: {
    default: "Nebula - Premium UI Platform",
    template: "%s | Nebula",
  },
  description:
    "Nebula is a premium digital product landing with pricing, docs, social proof, and polished motion-driven sections.",
  keywords: [
    "Nebula",
    "digital landing",
    "SaaS landing page",
    "premium UI",
    "Next.js template",
  ],
  applicationName: "Nebula",
  authors: [{ name: "Nebula Team" }],
  creator: "Nebula Team",
  publisher: "Nebula",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Nebula",
    title: "Nebula - Premium UI Platform",
    description:
      "Premium digital landing with high-conversion sections, pricing, docs, and refined visual direction.",
    images: [
      {
        url: "/nebula-mark.svg",
        width: 1200,
        height: 630,
        alt: "Nebula brand mark",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nebula - Premium UI Platform",
    description:
      "Premium digital landing with high-conversion sections, pricing, docs, and refined visual direction.",
    images: ["/nebula-mark.svg"],
  },
  icons: {
    icon: [{ url: "/nebula-mark.svg", type: "image/svg+xml" }],
    shortcut: ["/nebula-mark.svg"],
    apple: [{ url: "/nebula-mark.svg" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070b14" },
    { media: "(prefers-color-scheme: light)", color: "#e7ecf6" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${sora.variable} antialiased`}>
        <SiteNavbar />
        {children}
      </body>
    </html>
  );
}



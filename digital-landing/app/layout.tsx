import type { Metadata } from "next";
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
  title: "Nebula - Premium UI Platform",
  description: "Concept landing page for a premium digital product.",
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



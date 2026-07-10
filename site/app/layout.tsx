import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jbMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artur Prolisko — Senior Product Design Leader · iGaming & Sportsbook",
  description:
    "14+ years turning platform complexity into effortless products for Tier 1 iGaming operators. Head of Product at Fitzdares, building from Gibraltar.",
};

export const viewport: Viewport = {
  themeColor: "#0B0C10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jbMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}

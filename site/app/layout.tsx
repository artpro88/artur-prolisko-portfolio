import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://pokacity.com"),
  title: "Artur Prolisko — Senior Product Design Leader · iGaming & Sportsbook",
  description:
    "14+ years turning platform complexity into effortless products for Tier 1 iGaming operators. Head of Product at Fitzdares, building from Gibraltar.",
  keywords: [
    "product design leader", "iGaming", "sportsbook", "casino", "live casino",
    "Head of Product", "UX strategy", "design systems", "Fitzdares", "Gibraltar",
  ],
  openGraph: {
    type: "website",
    url: "https://pokacity.com",
    siteName: "Artur Prolisko",
    title: "Artur Prolisko — Senior Product Design Leader · iGaming & Sportsbook",
    description:
      "14+ years at Tier 1 operators: 250% ROI, three market launches, and a platform stood up in Gibraltar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artur Prolisko — Senior Product Design Leader · iGaming & Sportsbook",
    description:
      "14+ years at Tier 1 operators: 250% ROI, three market launches, and a platform stood up in Gibraltar.",
  },
  robots: { index: true, follow: true },
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
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import LoadingScreen from "@/components/loading/LoadingScreen";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.businessName} | Licensed Electrician`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description:
    "Hindley Electric — licensed residential and commercial electrical work from Nick Hindley, 15+ years in the trade. Panels, EV chargers, lighting, outlets, solar repair, and more.",
  openGraph: {
    title: `${siteConfig.businessName} | Licensed Electrician`,
    description:
      "Licensed, direct, no runaround. Nick Hindley brings 15+ years of hands-on electrical experience to every job.",
    url: siteConfig.siteUrl,
    siteName: siteConfig.businessName,
    images: ["/brand/logo.png"],
    type: "website",
  },
  icons: {
    icon: "/brand/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-ground font-sans text-bone antialiased">
        <JsonLd />
        <LoadingScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

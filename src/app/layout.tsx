import type { Metadata, Viewport } from "next";
import { ExternalLinks } from "@/components/ExternalLinks";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CommandPalette } from "@/components/CommandPalette";
import { ThemeScript } from "@/components/ThemeToggle";
import { SkipLink } from "@/components/SkipLink";
import { LayerScript } from "@/components/LayerToggle";
import { LangStrip } from "@/components/LangStrip";
import { TranslateOffer } from "@/components/TranslateOffer";
import { SectionSiblings } from "@/components/SectionSiblings";
import { RegionProvider } from "@/lib/region";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { RegisterSW } from "@/components/RegisterSW";
import { WebMCP } from "@/components/WebMCP";
import { FEED_TYPES } from "@/lib/seo";
import { GardenDefs } from "@/components/Garden";
import { MotionGovernor } from "@/components/MotionGovernor";
import { ChipTitles } from "@/components/ChipTitles";
import { AnalyticsConsentBar } from "@/components/AnalyticsConsent";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

/**
 * Site-wide defaults. Every page sets its own title, description, canonical URL and social copies via `pageMeta`
 * (src/lib/seo.ts); these are the fallbacks and the shared bits (metadataBase, title template, robots, Twitter card).
 * The Open Graph / Twitter image comes from src/app/opengraph-image.png and is inherited by every route.
 */
export const metadata: Metadata = {
  title: { default: "OnCo: total information dominance on cancer", template: "%s · OnCo" },
  description: "Total information dominance on cancer: every technology, target, product, company, institution, pathway, trial, and idea, one page per object, linked, with plain-English TL;DRs.",
  metadataBase: new URL("https://onco.cc"),
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "OnCo", statusBarStyle: "default" },
  alternates: { canonical: "https://onco.cc/", types: FEED_TYPES },
  applicationName: "OnCo",
  keywords: ["oncology", "cancer", "cancer treatments", "clinical trials", "drug targets", "antibody-drug conjugates", "radiopharmaceuticals", "knowledge graph", "open data"],
  openGraph: { title: "OnCo: total information dominance on cancer", description: "The current state of the art, the history, and what is coming, for every cancer.", type: "website", siteName: "OnCo", locale: "en_GB", url: "https://onco.cc/" },
  twitter: { card: "summary_large_image", title: "OnCo: total information dominance on cancer", description: "The current state of the art, the history, and what is coming, for every cancer." },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#d6336c" }, { media: "(prefers-color-scheme: dark)", color: "#121816" }] };

/**
 * The saved site language is applied to <html lang> and <html dir> before paint by LayerScript and kept in sync
 * by useLayer, so the static "en" here is only the server default. Chrome text in server components goes through
 * <T>, which renders English first and swaps after hydration.
 *
 * The header and footer live in src/components/SiteChrome.tsx, a client module, so their trees are not repeated in
 * the RSC payload of every exported page; nothing page-specific is passed to them (src/app/chrome-size.test.ts
 * guards the size of what this layout adds to each page).
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <RegionProvider>
        <ThemeScript />
        {/* Google Analytics (gtag.js, visit counts only) is not in this HTML: AnalyticsConsentBar inserts it after the visitor presses Allow (src/lib/analytics-consent.ts). Disclosed on /privacy/. */}
        <LayerScript />
        <GardenDefs />
        <SkipLink />
        <SiteHeader />
        <LangStrip />
        <CommandPalette />
        <RegisterSW />
        <MotionGovernor />
        <ChipTitles />
        <WebMCP />
        <ExternalLinks />
        {/* Record pages stamp data-onco-id / data-onco-kind on this element for agents (MachineLinks); the hydration warning is for those attributes. */}
        <main id="main" className="flex-1" suppressHydrationWarning><TranslateOffer />{children}<SectionSiblings /></main>
        <SiteFooter />
        <AnalyticsConsentBar />
              </RegionProvider>
      </body>
    </html>
  );
}

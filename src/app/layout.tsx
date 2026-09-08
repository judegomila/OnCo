import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { CommandPalette, PaletteTrigger } from "@/components/CommandPalette";
import { NavMenu } from "@/components/NavMenu";
import { ThemeToggle, ThemeScript } from "@/components/ThemeToggle";
import { SkipLink } from "@/components/SkipLink";
import { NAV_GROUPS } from "@/lib/nav";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "OnCo — the open map of oncology", template: "%s · OnCo" },
  description: "Total information dominance on cancer: every technology, target, product, company, institution, pathway, trial, and idea, one page per object, linked, with plain-English TL;DRs.",
  metadataBase: new URL("https://onco-umber.vercel.app"),
  openGraph: { title: "OnCo — the open map of oncology", description: "The current state of the art, the history, and what is coming, for every cancer.", type: "website" },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeScript />
        <SkipLink />
        <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="inline-block h-6 w-6 rounded-md bg-accent" aria-hidden />
              <span>OnCo</span>
              <span className="hidden sm:inline text-muted font-normal text-sm">the open map of oncology</span>
            </Link>
            <div className="ml-2"><NavMenu /></div>
            <div className="ml-auto w-full max-w-xs sm:max-w-sm">
              <PaletteTrigger className="w-full" />
            </div>
            <ThemeToggle />
          </div>
        </header>
        <CommandPalette />
        <main id="main" className="flex-1">{children}</main>
        <footer className="border-t border-border mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-7 text-sm">
            <div className="md:col-span-2">
              <div className="font-semibold mb-2">OnCo</div>
              <p className="text-muted max-w-md">
                A public, cited, editable map of oncology: technologies, targets, products, companies, institutions, pathways, trials, pairings, roadmaps, and ideas. One page per object, with a plain-English TL;DR on every page.
              </p>
              <p className="text-muted mt-3">
                Not medical advice. Oncology moves weekly and this map is kept current; check with a clinician and the primary sources linked on each page.
              </p>
            </div>
            {NAV_GROUPS.map((g) => (
              <div key={g.id}>
                <div className="kicker mb-2"><Link className="hover:underline" href={g.href}>{g.label}</Link></div>
                <ul className="space-y-1">
                  {g.items.map((it) => <li key={it.href}>{it.href.startsWith("http") ? <a className="hover:underline" href={it.href} rel="noopener">{it.label}</a> : <Link className="hover:underline" href={it.href}>{it.label}</Link>}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </footer>
      </body>
    </html>
  );
}

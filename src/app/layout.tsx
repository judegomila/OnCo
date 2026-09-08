import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { CommandPalette, PaletteTrigger } from "@/components/CommandPalette";
import { NavMenu } from "@/components/NavMenu";
import { ThemeToggle, ThemeScript } from "@/components/ThemeToggle";
import { SkipLink } from "@/components/SkipLink";
import { LayerToggle } from "@/components/LayerToggle";
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
              <svg viewBox="0 0 64 64" width="24" height="24" aria-hidden className="shrink-0"><rect width="64" height="64" rx="14" fill="#b91c1c"/><circle cx="32" cy="32" r="15" fill="none" stroke="#fff" strokeWidth="5"/><circle cx="32" cy="12" r="4" fill="#fff"/><circle cx="50" cy="42" r="4" fill="#fff"/><circle cx="14" cy="42" r="4" fill="#fff"/></svg>
              <span>OnCo</span>
              <span className="hidden sm:inline text-muted font-normal text-sm">the open map of oncology</span>
            </Link>
            <div className="ml-2"><NavMenu /></div>
            <div className="ml-auto w-full max-w-[220px] sm:max-w-xs">
              <PaletteTrigger className="w-full" />
            </div>
            <LayerToggle />
            <ThemeToggle />
            <a href="https://github.com/judegomila/OnCo" rel="noopener" aria-label="OnCo on GitHub" title="GitHub repository" className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card hover:bg-foreground/5">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            </a>
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
                <strong className="text-foreground/80">Work in progress.</strong> Every fact on this site is being built and checked in the open and may be incomplete, out of date, or wrong. You must do your own research and verify anything here at its primary source before relying on it. Nothing on this site is medical advice; decisions belong with you and your clinicians.
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

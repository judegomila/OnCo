"use client";

import Link from "next/link";
import { PaletteTrigger } from "./CommandPalette";
import { NavMenu } from "./NavMenu";
import { ThemeToggle } from "./ThemeToggle";
import { LayerToggle } from "./LayerToggle";
import { RegionToggle } from "./RegionToggle";
import { GitHubStars } from "./GitHubStars";
import { AccountMenu } from "./AccountMenu";
import { GardenBackdrop } from "./Garden";
import { FooterNav } from "./FooterNav";
import { AnalyticsChoice } from "./AnalyticsConsent";
import { T } from "./T";

/**
 * The site header and footer as one client module. The root layout used to build these trees in a server
 * component, so every one of the 27,000 exported pages repeated the whole header and footer (class strings,
 * inline SVG paths, link lists) in its RSC payload as well as in its HTML. Rendered from a client module the
 * payload carries one reference per element and the markup comes from the shared bundle; the HTML is unchanged.
 * Nothing here takes props that vary by page: static chrome belongs in imported code, not in per-page props.
 */
export function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden className="shrink-0">
      <rect width="64" height="64" rx="14" fill="#d6336c" />
      <circle cx="32" cy="32" r="15" fill="none" stroke="#fff" strokeWidth="5" />
      <circle cx="32" cy="12" r="4" fill="#fff" />
      <circle cx="50" cy="42" r="4" fill="#fff" />
      <circle cx="14" cy="42" r="4" fill="#fff" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center gap-1.5 sm:gap-3 xl:gap-2 2xl:gap-3">
        <Link href="/" className="inline-flex h-10 shrink-0 items-center gap-2.5 rounded-lg sm:pe-2 font-semibold tracking-tight" aria-label="OnCo home">
          <Mark />
          <span className="text-[15px]">OnCo</span>
          <span className="hidden min-[1800px]:inline text-muted font-normal text-sm">total information dominance on cancer</span>
        </Link>
        <NavMenu />
        {/* Shrinks to an icon at phone widths so the fixed-width controls and the menu button always fit on one row.
            Every wrapper round a control is a flex box: an inline-flex button on a block's line box sits on the text
            baseline with a descender gap under it, so the control (region, language, search) rode above the centre line. */}
        <div className="ms-auto flex flex-1 items-center min-w-10 max-w-[17rem] sm:max-w-xs xl:ms-auto">
          <PaletteTrigger className="w-full h-10 rounded-[0.625rem]" />
        </div>
        <RegionToggle />
        <LayerToggle />
        <ThemeToggle />
        <GitHubStars className="hidden sm:inline-flex" />
        {/* Sign in/up: a link to the signed-in site, me.onco.cc; this site keeps no session. */}
        <AccountMenu className="inline-flex" />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="garden-footer relative border-t border-border mt-28">
      {/* A low grass line grows up from the footer's top edge into the gap above it. */}
      <GardenBackdrop variant="footer" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-[minmax(0,1.6fr)_repeat(6,minmax(0,1fr))] lg:gap-x-8 text-sm">
          <div className="col-span-2 sm:col-span-3 xl:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 font-semibold tracking-tight"><Mark size={24} /><span>OnCo</span></Link>
            <p className="text-muted max-w-md mt-3 leading-relaxed"><T k="footer.about" /></p>
            <p className="text-muted mt-3 max-w-md leading-relaxed">
              <strong className="text-foreground/80"><T k="footer.wip" /></strong> <T k="footer.disclaimer" />
            </p>
            <p className="text-muted mt-3 max-w-md leading-relaxed" data-testid="footer-medical">
              <T k="footer.medical" /> <Link href="/terms-of-use/" className="underline hover:text-foreground"><T k="footer.terms" /></Link>
            </p>
          </div>
          <FooterNav />
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs text-muted">
          <p><T k="footer.licence" /> <Link href="/about/#licence" className="underline hover:text-foreground"><T k="footer.commercial" /></Link>. <T k="footer.madeBy" /> <a href="https://judegomila.com" rel="noopener author" className="underline hover:text-foreground">Jude Gomila</a> <span className="inline-flex items-center gap-1.5 align-middle ms-1 text-muted" title="Marin and the Golden Gate"><svg viewBox="0 0 24 12" width="22" height="11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-label="Mount Tamalpais" role="img"><path d="M1 11 L7 4 L10 7 L14 2 L18 6 L23 11" /><path d="M4 11h16" opacity="0.5" /></svg><svg viewBox="0 0 28 12" width="26" height="11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-label="Golden Gate Bridge" role="img"><path d="M1 10h26" /><path d="M8 10V2M20 10V2" /><path d="M1 6c2.5-1.5 4.5-4 7-4s4.5 4 6 4 3.5-4 6-4 4.5 2.5 7 4" /><path d="M11 10V7M14 10V6M17 10V7" opacity="0.6" /></svg></span>.</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/about/" className="hover:text-foreground hover:underline"><T k="footer.aboutLink" /></Link>
            <Link href="/corrections/" className="hover:text-foreground hover:underline"><T k="footer.corrections" /></Link>
            <Link href="/api/" className="hover:text-foreground hover:underline"><T k="footer.api" /></Link>
            <Link href="/terms-of-use/" className="hover:text-foreground hover:underline"><T k="footer.terms" /></Link>
            <Link href="/privacy/" className="hover:text-foreground hover:underline"><T k="footer.privacy" /></Link>
            <AnalyticsChoice variant="footer" />
            <a href="https://github.com/judegomila/OnCo" rel="noopener" className="hover:text-foreground hover:underline">GitHub</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

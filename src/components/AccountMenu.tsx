"use client";

import { useEffect, useRef } from "react";
import { useT } from "@/lib/i18n/ui";

/**
 * The "Sign in/up" control in the header: a bridge to the signed-in site. onco.cc is the public, signed-out site
 * and stores nothing personal, neither in the browser nor in any cloud; roles, cancer type and case data live at
 * https://me.onco.cc/, a separate app with its own sign-in and database. This control is a plain anchor to that
 * site carrying the current onco.cc address as `?back=`, so the reader can come straight back to the page they
 * left. It opens in the same tab, reads no session and renders the same for every visitor.
 *
 * The exported HTML carries the bare address (the page's own address is not known at build time); the `back`
 * parameter is filled in after mount, so a click before hydration still reaches the signed-in site.
 */
export const ME_URL = "https://me.onco.cc/";
/** The header pill: the shared 40px control box in the accent with white text, a square on phones. */
const CTA_CLASS = "ctl btn-primary w-10 px-0 sm:w-auto sm:px-2.5 gap-1.5 text-sm font-medium";

/** The signed-in site's address with the page to come back to; the bare address when none is given. */
export function meHref(back?: string | null): string {
  return back ? `${ME_URL}?back=${encodeURIComponent(back)}` : ME_URL;
}

function ProfileIcon({ size = 18 }: { size?: number }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" /></svg>;
}

export function AccountMenu({ className = "" }: { className?: string }) {
  const { t } = useT();
  const link = useRef<HTMLAnchorElement>(null);
  // The `back` address is written straight onto the anchor after mount (the exported HTML and the hydrated tree stay
  // identical); the click handler refreshes it, since Next navigates between pages without remounting the header.
  useEffect(() => { if (link.current) link.current.href = meHref(window.location.href); }, []);
  const label = t("account.signInCta");
  return (
    <span className={`relative ${className}`}>
      <a ref={link} href={ME_URL} onClick={(e) => { e.currentTarget.href = meHref(window.location.href); }} className={CTA_CLASS} title={label} aria-label={label} data-testid="sign-in-bridge">
        <ProfileIcon /><span className="hidden sm:inline">{label}</span>
      </a>
    </span>
  );
}

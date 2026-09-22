"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n/ui";
import { fetchMe, ME_CONTEXT_URL } from "@/lib/me";

/**
 * The "Sign in/up" control in the header: a bridge to the signed-in site. onco.cc is the public, signed-out site
 * and stores nothing personal, neither in the browser nor in any cloud; roles, cancer type and case data live at
 * https://me.onco.cc/, a separate app with its own sign-in and database. This control is a plain anchor to that
 * site carrying the current onco.cc address as `?back=`, so the reader can come straight back to the page they
 * left. It opens in the same tab, reads no session and renders the same for every visitor.
 *
 * The exported HTML carries the bare address (the page's own address is not known at build time); the `back`
 * parameter is filled in after mount, so a click before hydration still reaches the signed-in site.
 *
 * After mount it also asks me.onco.cc whether this browser is signed in there (src/lib/me.ts: a credentialed
 * fetch answered from that site's own cookie, first name only). Signed in, the pill shows the first name and
 * leads to My context; nothing is stored here and the exported HTML is unchanged.
 */
export const ME_URL = "https://me.onco.cc/signin/";
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
  const [firstName, setFirstName] = useState<string | null>(null);
  useEffect(() => {
    if (link.current) link.current.href = meHref(window.location.href);
    let alive = true;
    void fetchMe().then((me) => { if (alive && me.signedIn) setFirstName(me.firstName || "My context"); });
    return () => { alive = false; };
  }, []);
  const label = t("account.signInCta");
  if (firstName) {
    const title = `Signed in to me.onco.cc as ${firstName}. Open My context.`;
    return (
      <span className={`relative ${className}`}>
        <a href={ME_CONTEXT_URL} className={CTA_CLASS} title={title} aria-label={title} data-testid="sign-in-bridge" data-signed-in="true">
          <ProfileIcon /><span className="hidden sm:inline max-w-[9rem] truncate">{firstName}</span>
        </a>
      </span>
    );
  }
  return (
    <span className={`relative ${className}`}>
      <a ref={link} href={ME_URL} onClick={(e) => { e.currentTarget.href = meHref(window.location.href); }} className={CTA_CLASS} title={label} aria-label={label} data-testid="sign-in-bridge">
        <ProfileIcon /><span className="hidden sm:inline">{label}</span>
      </a>
    </span>
  );
}

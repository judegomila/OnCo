"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { T } from "./T";
import { useT, type UiKey } from "@/lib/i18n/ui";
import { CONSENT_OPEN_EVENT, loadGtag, openConsentBar, useAnalyticsConsent, type Choice, type Consent } from "@/lib/analytics-consent";

/**
 * The analytics gate the visitor sees. The bar renders nothing on the server and on the first client render, so it
 * is absent from the exported HTML and never shifts a page: it is fixed to the bottom of the viewport, inside the
 * phone's safe area, and appears once, only while no choice is stored and the browser sent no Global Privacy
 * Control signal (src/lib/analytics-consent.ts decides). It also does the loading: when the stored choice is
 * "granted" it inserts gtag.js after mount, so the tag is loaded from one place only. The change-choice control
 * (footer and /privacy/) re-opens the bar or, on the privacy page, offers the two pills in place.
 */
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const ChartIcon = ({ size = 18 }: { size?: number }) => <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden {...S}><path d="M4 20h16" /><path d="M7 16v-5M12 16V6M17 16v-8" /></svg>;
const TickIcon = () => <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden {...S}><path d="M4 10.5l4 4 8-9" /></svg>;
const CrossIcon = () => <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden {...S}><path d="M5 5l10 10M15 5L5 15" /></svg>;

const STATE_KEY: Record<Consent, UiKey> = { granted: "consent.state.granted", denied: "consent.state.denied", unset: "consent.state.unset" };

function ChoicePills({ consent, choose, size = "h-9" }: { consent: Consent; choose: (c: Choice) => void; size?: string }) {
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => choose("granted")} aria-pressed={consent === "granted"} className={`btn btn-primary ${size} px-3.5 text-[13px]`}><TickIcon /><T k="consent.allow" /></button>
      <button type="button" onClick={() => choose("denied")} aria-pressed={consent === "denied"} className={`btn ${size} px-3.5 text-[13px]`}><CrossIcon /><T k="consent.decline" /></button>
    </div>
  );
}

export function AnalyticsConsentBar() {
  const { consent, ready, set } = useAnalyticsConsent();
  // Re-opened by the change-choice control; otherwise the bar is open exactly while no choice is stored.
  const [reopened, setReopened] = useState(false);
  const { t } = useT();

  // Load the tag once the browser has been read and the stored choice is Allow (and again after a fresh Allow).
  useEffect(() => { if (ready && consent === "granted") loadGtag(); }, [ready, consent]);

  useEffect(() => {
    const onOpen = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  if (!ready || !(reopened || consent === "unset")) return null;
  const choose = (c: Choice) => { set(c); setReopened(false); };

  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-50 pointer-events-none px-3 pb-3" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}>
      <section role="region" aria-label={t("consent.choice")} data-testid="analytics-consent" className="pointer-events-auto mx-auto max-w-3xl rounded-xl border border-border bg-card shadow-lg px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm">
        <span className="text-accent shrink-0"><ChartIcon /></span>
        <p className="flex-1 min-w-[14rem] leading-snug text-foreground/85">
          <T k="consent.text" /> <Link href="/privacy/#analytics" className="underline text-accent hover:text-foreground whitespace-nowrap"><T k="footer.privacy" /></Link>
        </p>
        <div className="ms-auto"><ChoicePills consent={consent} choose={choose} /></div>
      </section>
    </div>
  );
}

/**
 * The control for changing the choice later. `footer`: one text link in the footer's link row that says the current
 * state and re-opens the bar. `panel`: the state, the GPC note when that is why analytics are off, and the two pills
 * in place, for the analytics section of /privacy/.
 */
export function AnalyticsChoice({ variant }: { variant: "footer" | "panel" }) {
  const { consent, gpc, ready, set } = useAnalyticsConsent();
  const state = <T k={STATE_KEY[consent]} />;

  if (variant === "footer") {
    return (
      <button type="button" onClick={openConsentBar} data-testid="analytics-choice" className="hover:text-foreground hover:underline">
        <T k="consent.choice" />{ready ? <>: {state}</> : null}
      </button>
    );
  }

  return (
    <div className="not-prose rounded-xl border border-border bg-card px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm" data-testid="analytics-choice">
      <span className="text-accent shrink-0"><ChartIcon size={20} /></span>
      <div className="flex-1 min-w-[12rem] leading-snug">
        <strong className="font-semibold"><T k="consent.choice" /></strong>{ready ? <>: {state}</> : null}
        {ready && gpc && consent === "denied" ? <span className="block text-muted text-xs mt-0.5"><T k="consent.gpc" /></span> : null}
      </div>
      <ChoicePills consent={consent} choose={set} />
    </div>
  );
}

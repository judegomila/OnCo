"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

/**
 * Two-column tools on a phone (docs/MOBILE.md). A chooser (organ list, biomarker ticks, saved queries) on one side
 * drives a result on the other; below the `lg` breakpoint the columns stack, so a tap in the chooser changes
 * something a screen or more below. This wrapper keeps the desktop grid exactly as it was and, on small screens,
 * shows one pane at a time behind a sticky pair of pills, "Choose" and "View", under the site header. The parent
 * owns the pane so it can switch to the view after a choice (`useChooseView().showView`); the pills switch back.
 *
 * Both panes stay in the DOM (hidden with `max-lg:hidden`), so ids, anchors and print output are unchanged; the
 * pane wrappers carry `data-choose-view-pane` and globals.css shows both when printing. The View pill's hint
 * ("153 matches") is mirrored in a live region so a screen reader hears the effect of a choice without moving.
 */
export type Pane = "choose" | "view";

const SMALL = "(max-width: 63.99rem)"; // below Tailwind's lg (64rem): the point where the columns stack

export function useChooseView(initial: Pane = "choose") {
  const [pane, setPane] = useState<Pane>(initial);
  return { pane, setPane, showView: () => setPane("view"), showChoose: () => setPane("choose") };
}

function ListGlyph({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.5" cy="6" r="1.2" fill="currentColor" stroke="none" /><circle cx="4.5" cy="12" r="1.2" fill="currentColor" stroke="none" /><circle cx="4.5" cy="18" r="1.2" fill="currentColor" stroke="none" /></svg>;
}
function EyeGlyph({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.8" /></svg>;
}

export function ChooseView({ pane, onPane, choose, view, chooseLabel = "Choose", viewLabel = "View", chooseHint, viewHint, className = "", chooseClass = "", viewClass = "", name }: {
  pane: Pane;
  onPane: (p: Pane) => void;
  /** The controls column, as it renders on desktop. */
  choose: ReactNode;
  /** The driven column, as it renders on desktop. */
  view: ReactNode;
  chooseLabel?: string;
  viewLabel?: string;
  /** Short state shown on the pills, for example "3 picked" and "153 matches"; the view hint is also announced. */
  chooseHint?: string;
  viewHint?: string;
  /** The desktop grid classes, unchanged (for example "grid gap-8 lg:grid-cols-[340px_1fr]"). */
  className?: string;
  chooseClass?: string;
  viewClass?: string;
  /** Machine-readable name for the mobile audit (scripts/mobile-audit.ts). */
  name: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const chooseId = `cv-${uid}-choose`, viewId = `cv-${uid}-view`;
  const root = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // On a phone, a pane switch should land the reader at the top of the shown pane, under the pills, with focus on
  // it for screen readers. Desktop shows both panes, so nothing moves there.
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (typeof window === "undefined" || !window.matchMedia(SMALL).matches) return;
    const el = root.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 60;
    if (window.scrollY > top) window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    if (pane === "view") viewRef.current?.focus({ preventScroll: true });
  }, [pane]);

  const pill = (p: Pane, label: string, hint: string | undefined, controls: string) => {
    const on = pane === p;
    return (
      <button type="button" role="tab" aria-selected={on} aria-controls={controls} onClick={() => onPane(p)} title={p === "choose" ? "Show the choices" : "Show the result"}
        className={`chip border ${on ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-foreground/5"}`}>
        {p === "choose" ? <ListGlyph /> : <EyeGlyph />}
        <span>{label}</span>
        {hint && <span className={`tabular-nums ${on ? "text-background/70" : "text-muted"}`}>· {hint}</span>}
      </button>
    );
  };

  return (
    <div ref={root} data-mobile-pattern="choose-view" data-mobile-view={name} className={className}>
      <div role="tablist" aria-label={`${chooseLabel} or ${viewLabel}`} className="no-print lg:hidden sticky top-14 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 bg-background/95 backdrop-blur border-b border-border flex items-center gap-2 text-sm">
        {pill("choose", chooseLabel, chooseHint, chooseId)}
        {pill("view", viewLabel, viewHint, viewId)}
        <span className="sr-only" aria-live="polite" data-mobile-live>{viewHint}</span>
      </div>
      <div id={chooseId} data-choose-view-pane="choose" className={`min-w-0 ${pane === "view" ? "max-lg:hidden" : ""} ${chooseClass}`}>{choose}</div>
      <div id={viewId} ref={viewRef} tabIndex={-1} data-choose-view-pane="view" data-mobile-driven className={`min-w-0 outline-none ${pane === "choose" ? "max-lg:hidden" : ""} ${viewClass}`}>
        <button type="button" onClick={() => onPane("choose")} className="no-print lg:hidden mb-3 text-sm underline text-muted">‹ Back to {chooseLabel.toLowerCase()}</button>
        {view}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useT } from "@/lib/i18n/ui";

/** `label` is the English section name; it is translated through the chrome dictionary where a translation exists. */
export type Tab = { id: string; label: string; content: ReactNode; count?: number };

/** Below the site header (3.5rem) plus this bar (3rem): where sticky table headers should stop. */
const CONTENT_STYLE = { "--sticky-top": "calc(var(--header-h) + 3rem)" } as CSSProperties;

/** Room kept at each end of the bar when the active tab is scrolled into view, so the neighbour peeks out. */
const EDGE = 40;

/**
 * Section navigator for long object pages. All sections are rendered one after another so the
 * page reads top to bottom (and so print gets every section, see PrintButton); a sticky, high-contrast
 * bar lists the sections, highlights the one in view (scroll-spy), and scrolls to a section on click.
 * The section id is kept in the URL hash and on the bar as `data-active` for other components.
 *
 * Layout: the bar spans the full content width. When `aside` is given the sections and the aside form the
 * two-column grid *below* the bar (main and right column), so the tabs never share a row with the sidebar and
 * are never cut off by it; `after` renders under the sections in the main column.
 *
 * Overflow: when the tabs are wider than the bar it scrolls sideways; the overflowing edge fades and an arrow
 * at that end scrolls a step (`data-fade` carries the state for the CSS). The active tab is scrolled into view
 * whenever it changes, including on load for a `#hash`, by moving the bar's own scroll position only, so the
 * page is not scrolled vertically as a side effect.
 *
 * Accessibility: the bar is navigation (a list of same-page links), not a tablist, because no panel is ever
 * hidden; `aria-current` marks the section in view and Left/Right/Home/End move focus between the tabs.
 * The tabs form one compact strip (shared hairline, rounded ends, active tab filled); the count on each tab
 * is hidden while it is active, since the reader is looking at the objects themselves.
 */
export function Tabs({ tabs, ariaLabel, aside, after }: { tabs: Tab[]; ariaLabel?: string; aside?: ReactNode; after?: ReactNode }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const [fade, setFade] = useState<"" | "left" | "right" | "both">("");
  const { t: tT, tl } = useT();
  const bar = useRef<HTMLDivElement>(null);
  const suppress = useRef(false);

  const jump = (id: string, smooth = true) => {
    const el = document.getElementById(`sec-${id}`);
    if (!el) return;
    suppress.current = true;
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
    const top = el.getBoundingClientRect().top + window.scrollY - 112;
    window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
    setTimeout(() => { suppress.current = false; }, 700);
  };

  // Scroll-spy.
  useEffect(() => {
    const els = tabs.map((t) => document.getElementById(`sec-${t.id}`)).filter((x): x is HTMLElement => !!x);
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      if (suppress.current) return;
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id.replace(/^sec-/, ""));
    }, { rootMargin: "-120px 0px -60% 0px", threshold: 0 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [tabs]);

  // Open on the hashed section.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const h = window.location.hash.replace(/^#/, "");
      if (h && tabs.some((t) => t.id === h)) jump(h, false);
    });
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Left/Right/Home/End move focus between tabs; Enter or Space on a focused tab follows the link as usual. */
  const onBarKey = (e: React.KeyboardEvent) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    const pills = [...(bar.current?.querySelectorAll<HTMLAnchorElement>("a[data-id]") ?? [])];
    if (!pills.length) return;
    const i = pills.indexOf(document.activeElement as HTMLAnchorElement);
    const next = e.key === "Home" ? 0 : e.key === "End" ? pills.length - 1 : e.key === "ArrowRight" ? (i + 1) % pills.length : (i - 1 + pills.length) % pills.length;
    e.preventDefault();
    pills[next].focus();
  };

  /** Which edges hide tabs: drives the fade and the arrows. */
  const measure = () => {
    const nav = bar.current;
    if (!nav) return;
    const overflow = nav.scrollWidth - nav.clientWidth > 1;
    if (!overflow) { setFade(""); return; }
    const left = nav.scrollLeft > 1;
    const right = nav.scrollLeft + nav.clientWidth < nav.scrollWidth - 1;
    setFade(left && right ? "both" : left ? "left" : right ? "right" : "");
  };
  useEffect(() => {
    const nav = bar.current;
    if (!nav) return;
    const ro = new ResizeObserver(measure);
    ro.observe(nav);
    nav.addEventListener("scroll", measure, { passive: true });
    return () => { ro.disconnect(); nav.removeEventListener("scroll", measure); };
  }, [tabs]);

  // Keep the active tab in view inside the bar, scrolling the bar alone (never the page).
  useEffect(() => {
    const nav = bar.current;
    const el = nav?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!nav || !el) return;
    const r = el.getBoundingClientRect(), n = nav.getBoundingClientRect();
    if (r.left < n.left + EDGE) nav.scrollLeft += r.left - n.left - EDGE;
    else if (r.right > n.right - EDGE) nav.scrollLeft += r.right - n.right + EDGE;
    measure();
  }, [active]);

  const step = (dir: 1 | -1) => bar.current?.scrollBy({ left: dir * Math.max(120, (bar.current.clientWidth || 0) * 0.6), behavior: "smooth" });

  const sections = (
    <div className="pt-6 space-y-14" style={CONTENT_STYLE}>
      {tabs.map((t) => (
        <section key={t.id} id={`sec-${t.id}`} aria-labelledby={`h-${t.id}`} data-section={t.id} className="scroll-mt-28 print-section">
          {t.id === "overview" && <h2 id={`h-${t.id}`} className="sr-only print:not-sr-only print:text-xl print:font-semibold print:mb-3">{tl(t.label)}</h2>}
          {t.id !== "overview" && (
            <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-border">
              <h2 id={`h-${t.id}`} className="text-xl font-semibold tracking-tight">{tl(t.label)}</h2>
              {t.count !== undefined && <span className="text-sm text-muted tabular-nums">{t.count}</span>}
              <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="ms-auto text-xs text-muted hover:text-foreground hover:underline">{tT("top")} <span aria-hidden>↑</span></a>
            </div>
          )}
          {t.content}
        </section>
      ))}
    </div>
  );

  return (
    <div>
      {/* The sticky wrapper spans the full content width (bleeding into the container padding); the arrows sit on it, outside the scrolling nav. */}
      <div className="tabbar-wrap sticky top-14 z-30 -mx-4 sm:-mx-6 bg-background/90 backdrop-blur border-b border-border" data-fade={fade || undefined}>
        <nav ref={bar} aria-label={ariaLabel ?? tT("sections")} data-tabbar data-active={active} onKeyDown={onBarKey}
          className="tabbar px-4 sm:px-6 h-12 flex items-center overflow-x-auto no-scrollbar">
          {/* One strip of adjoining tabs (see .tabstrip in globals.css); when wider than the bar it scrolls sideways and the active tab is kept in view. */}
          <div className="tabstrip">
            {tabs.map((t) => {
              const on = t.id === active;
              return (
                <a key={t.id} href={`#${t.id}`} data-id={t.id} onClick={(e) => { e.preventDefault(); jump(t.id); }} aria-current={on ? "true" : undefined} className="tab">
                  <span>{tl(t.label)}</span>
                  {t.count !== undefined && <span className="tab-count">{t.count}</span>}
                </a>
              );
            })}
          </div>
        </nav>
        {(fade === "left" || fade === "both") && <button type="button" onClick={() => step(-1)} aria-label="Earlier sections" title="Earlier sections" className="tabbar-arrow start-0"><span aria-hidden>‹</span></button>}
        {(fade === "right" || fade === "both") && <button type="button" onClick={() => step(1)} aria-label="Later sections" title="Later sections" className="tabbar-arrow end-0"><span aria-hidden>›</span></button>}
      </div>
      {aside ? (
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]" data-tab-grid>
          <div className="min-w-0">{sections}{after}</div>
          {aside}
        </div>
      ) : <>{sections}{after}</>}
    </div>
  );
}

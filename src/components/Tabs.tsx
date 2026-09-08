"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type Tab = { id: string; label: string; content: ReactNode; count?: number };

/** Below the site header (3.5rem) plus this bar (3rem): where sticky table headers should stop. */
const CONTENT_STYLE = { "--sticky-top": "calc(var(--header-h) + 3rem)" } as CSSProperties;

/**
 * Section navigator for long object pages. All sections are rendered one after another so the
 * page reads top to bottom; a sticky, high-contrast bar lists the sections, highlights the one in
 * view (scroll-spy), and scrolls to a section on click. The section id is kept in the URL hash.
 */
export function Tabs({ tabs, ariaLabel = "Sections" }: { tabs: Tab[]; ariaLabel?: string }) {
  const [active, setActive] = useState(tabs[0]?.id);
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

  // Keep the active pill in view inside the bar.
  useEffect(() => {
    const el = bar.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    el?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [active]);

  return (
    <div>
      <nav ref={bar} aria-label={ariaLabel}
        className="sticky top-14 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 h-12 bg-background/90 backdrop-blur border-b border-border flex items-center gap-1 overflow-x-auto no-scrollbar">
        {tabs.map((t) => {
          const on = t.id === active;
          return (
            <a key={t.id} href={`#${t.id}`} data-id={t.id} onClick={(e) => { e.preventDefault(); jump(t.id); }} aria-current={on ? "true" : undefined}
              className={`shrink-0 inline-flex h-8 items-center whitespace-nowrap rounded-full border px-3 text-[13px] transition-colors ${on ? "bg-foreground text-background border-foreground font-medium" : "bg-card border-border text-foreground/75 hover:bg-surface hover:text-foreground hover:border-border-strong"}`}>
              {t.label}{t.count !== undefined && <span className={`ml-1.5 text-xs tabular-nums ${on ? "text-background/70" : "text-muted"}`}>{t.count}</span>}
            </a>
          );
        })}
      </nav>
      <div className="pt-6 space-y-14" style={CONTENT_STYLE}>
        {tabs.map((t) => (
          <section key={t.id} id={`sec-${t.id}`} aria-labelledby={`h-${t.id}`} className="scroll-mt-28">
            {t.id !== "overview" && (
              <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-border">
                <h2 id={`h-${t.id}`} className="text-xl font-semibold tracking-tight">{t.label}</h2>
                {t.count !== undefined && <span className="text-sm text-muted tabular-nums">{t.count}</span>}
                <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="ml-auto text-xs text-muted hover:text-foreground hover:underline">top <span aria-hidden>↑</span></a>
              </div>
            )}
            {t.content}
          </section>
        ))}
      </div>
    </div>
  );
}

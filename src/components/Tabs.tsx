"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type Tab = { id: string; label: string; content: ReactNode; count?: number };

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
        className="sticky top-14 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 bg-background/95 backdrop-blur border-b border-border flex gap-1.5 overflow-x-auto no-scrollbar">
        {tabs.map((t) => {
          const on = t.id === active;
          return (
            <a key={t.id} href={`#${t.id}`} data-id={t.id} onClick={(e) => { e.preventDefault(); jump(t.id); }} aria-current={on ? "true" : undefined}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition ${on ? "bg-foreground text-background border-foreground font-medium" : "bg-card border-border text-foreground/80 hover:bg-foreground/5 hover:text-foreground"}`}>
              {t.label}{t.count !== undefined && <span className={`ml-1.5 text-xs tabular-nums ${on ? "text-background/70" : "text-muted"}`}>{t.count}</span>}
            </a>
          );
        })}
      </nav>
      <div className="pt-6 space-y-14">
        {tabs.map((t) => (
          <section key={t.id} id={`sec-${t.id}`} aria-labelledby={`h-${t.id}`} className="scroll-mt-28">
            {t.id !== "overview" && (
              <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-border">
                <h2 id={`h-${t.id}`} className="text-xl font-semibold tracking-tight">{t.label}</h2>
                {t.count !== undefined && <span className="text-sm text-muted tabular-nums">{t.count}</span>}
                <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="ml-auto text-xs text-muted hover:underline">top ↑</a>
              </div>
            )}
            {t.content}
          </section>
        ))}
      </div>
    </div>
  );
}

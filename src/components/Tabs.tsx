"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type Tab = { id: string; label: string; content: ReactNode; count?: number };

/**
 * Sticky tab bar for long object pages. Only the active tab's content is shown; the tab id is
 * kept in the URL hash so links like /cancers/tnbc/#history open the right tab.
 */
export function Tabs({ tabs, ariaLabel = "Sections" }: { tabs: Tab[]; ariaLabel?: string }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apply = () => {
      const h = window.location.hash.replace(/^#/, "");
      if (h && tabs.some((t) => t.id === h)) setActive(h);
    };
    const id = requestAnimationFrame(apply);
    window.addEventListener("hashchange", apply);
    return () => { cancelAnimationFrame(id); window.removeEventListener("hashchange", apply); };
  }, [tabs]);

  const select = (id: string) => {
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
    const top = (bar.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 64;
    if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
  };

  const onKey = (e: React.KeyboardEvent) => {
    const i = tabs.findIndex((t) => t.id === active);
    if (e.key === "ArrowRight") select(tabs[(i + 1) % tabs.length].id);
    if (e.key === "ArrowLeft") select(tabs[(i - 1 + tabs.length) % tabs.length].id);
  };

  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  return (
    <div>
      <div ref={bar} role="tablist" aria-label={ariaLabel} onKeyDown={onKey}
        className="sticky top-14 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 bg-background/90 backdrop-blur border-b border-border flex gap-1 overflow-x-auto no-scrollbar">
        {tabs.map((t) => {
          const on = t.id === current.id;
          return (
            <button key={t.id} role="tab" aria-selected={on} tabIndex={on ? 0 : -1} onClick={() => select(t.id)}
              className={`shrink-0 px-3 py-2.5 text-sm border-b-2 -mb-px whitespace-nowrap ${on ? "border-accent text-foreground font-medium" : "border-transparent text-muted hover:text-foreground"}`}>
              {t.label}{t.count !== undefined && <span className={`ml-1.5 text-xs tabular-nums ${on ? "text-foreground/70" : "text-muted"}`}>{t.count}</span>}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="pt-6">{current.content}</div>
    </div>
  );
}

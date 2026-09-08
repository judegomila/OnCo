"use client";

import { NavIcon } from "./NavIcon";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_GROUPS } from "@/lib/nav";

/** Grouped header navigation: dropdowns on desktop, a drawer on mobile. */
export function NavMenu() {
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const path = usePathname();

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(null); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setDrawer(false); } };
    document.addEventListener("mousedown", onDoc); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, []);
  useEffect(() => { const id = requestAnimationFrame(() => { setOpen(null); setDrawer(false); }); return () => cancelAnimationFrame(id); }, [path]);
  // The drawer owns the scroll while open.
  useEffect(() => {
    if (!drawer) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [drawer]);

  const activeGroup = NAV_GROUPS.find((g) => g.items.some((i) => i.href !== "/" && path?.startsWith(i.href)) || (g.href !== "/" && path?.startsWith(g.href)));

  return (
    <div ref={wrap} className="flex items-center order-last xl:order-none min-w-0">
      <nav className="hidden xl:flex items-center text-sm" aria-label="Primary">
        {NAV_GROUPS.map((g) => {
          const on = open === g.id;
          const active = activeGroup?.id === g.id;
          return (
            <div key={g.id} className="relative" onMouseEnter={() => setOpen(g.id)} onMouseLeave={() => setOpen((o) => (o === g.id ? null : o))}>
              <button type="button" aria-haspopup="menu" aria-expanded={on} aria-current={active ? "page" : undefined} onClick={() => setOpen(on ? null : g.id)}
                className={`relative inline-flex h-10 items-center gap-1 rounded-lg px-2 whitespace-nowrap transition-colors hover:bg-surface hover:text-foreground ${on ? "bg-surface" : ""} ${active ? "text-foreground font-medium after:absolute after:left-2 after:right-2 after:-bottom-2 after:h-0.5 after:rounded-full after:bg-accent" : "text-foreground/75"}`}>
                {g.label}
                <svg aria-hidden viewBox="0 0 12 12" width="10" height="10" className={`text-muted transition-transform ${on ? "rotate-180" : ""}`}><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              {on && (
                <div role="menu" className="absolute left-0 top-full pt-1.5 z-50">
                  <div className="card shadow-pop w-[400px] p-2">
                    <Link href={g.href} role="menuitem" className="block rounded-lg px-3 py-2.5 hover:bg-surface">
                      <div className="font-semibold leading-snug flex items-center gap-2"><NavIcon id={g.id} className="h-4 w-4 text-accent" />{g.label}</div>
                      <div className="text-xs text-muted mt-0.5 leading-relaxed">{g.blurb}</div>
                    </Link>
                    <div className="my-1.5 border-t border-border" />
                    <div className={g.items.length > 6 ? "grid grid-cols-2 gap-x-1" : ""}>
                      {g.items.map((it) => {
                        const here = !!path && path.startsWith(it.href) && !it.href.startsWith("http");
                        return (
                          <Link key={it.href} href={it.href} role="menuitem" className={`block rounded-lg px-3 py-1.5 hover:bg-surface ${here ? "text-foreground font-medium bg-surface/60" : ""}`}>
                            <div className="text-sm leading-snug flex items-center gap-1.5">{here && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />}{it.label}</div>
                            {g.items.length <= 6 && <div className="text-xs text-muted leading-relaxed">{it.blurb}</div>}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <button type="button" onClick={() => setDrawer(true)} className="ctl xl:hidden px-0 sm:px-3" aria-label="Open menu" aria-expanded={drawer} aria-controls="site-drawer">
        <svg aria-hidden viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M3 5.5h14M3 10h14M3 14.5h14" /></svg>
        <span className="hidden sm:inline">Menu</span>
      </button>
      {drawer && (
        <div className="fixed inset-0 z-[90] bg-black/45 backdrop-blur-[2px]" onMouseDown={(e) => { if (e.target === e.currentTarget) setDrawer(false); }}>
          <div id="site-drawer" role="dialog" aria-modal="true" aria-label="Menu" className="absolute right-0 top-0 h-full w-[88vw] max-w-sm bg-background border-l border-border overflow-y-auto shadow-pop flex flex-col">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-4 h-14 border-b border-border bg-background/95 backdrop-blur">
              <span className="font-semibold tracking-tight">Menu</span>
              <button type="button" onClick={() => setDrawer(false)} className="ctl ctl-icon" aria-label="Close menu">
                <svg aria-hidden viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M5 5l10 10M15 5L5 15" /></svg>
              </button>
            </div>
            <div className="px-4 py-4 space-y-6">
              {NAV_GROUPS.map((g) => (
                <div key={g.id}>
                  <Link href={g.href} className={`kicker inline-flex items-center gap-1.5 hover:text-foreground ${activeGroup?.id === g.id ? "text-accent" : ""}`}><NavIcon id={g.id} className="h-4 w-4" />{g.label}</Link>
                  <ul className="mt-2 -mx-2">
                    {g.items.map((it) => {
                      const here = !!path && path.startsWith(it.href) && !it.href.startsWith("http");
                      return (
                        <li key={it.href}>
                          {it.href.startsWith("http")
                            ? <a href={it.href} rel="noopener" className="block rounded-lg px-2 py-2 text-[15px] hover:bg-surface">{it.label}</a>
                            : <Link href={it.href} className={`block rounded-lg px-2 py-2 text-[15px] hover:bg-surface ${here ? "font-medium bg-surface" : ""}`}>{it.label}</Link>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

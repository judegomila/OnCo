"use client";

import { NavIcon, NavItemIcon } from "./NavIcon";
import { useRegion } from "@/lib/region";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_GROUPS } from "@/lib/nav";

/** Grouped header navigation: dropdowns on desktop, a drawer on mobile. */
export function NavMenu() {
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const { region } = useRegion();
  // Country-specific pages appear only for readers in that country; Global view shows everything.
  const visible = <T extends { regions?: string[] }>(items: T[]): T[] => items.filter((it) => !it.regions || region === null || it.regions.includes(region));
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
    <div ref={wrap} className="flex items-center order-last xl:order-none min-w-0 xl:shrink-0">
      <nav className="hidden xl:flex items-center text-sm" aria-label="Primary">
        {NAV_GROUPS.map((g) => {
          const on = open === g.id;
          const active = activeGroup?.id === g.id;
          return (
            <div key={g.id} className="relative flex items-center shrink-0" onMouseEnter={() => setOpen(g.id)} onMouseLeave={() => setOpen((o) => (o === g.id ? null : o))}>
              <Link href={g.href} aria-current={active ? "page" : undefined} onFocus={() => setOpen(g.id)} title={`Open ${g.label}`}
                className={`relative inline-flex h-10 items-center gap-1 rounded-lg px-1.5 2xl:px-2 whitespace-nowrap transition-colors hover:bg-surface hover:text-foreground ${on ? "bg-surface" : ""} ${active ? "text-foreground font-medium after:absolute after:left-2 after:right-2 after:-bottom-2 after:h-0.5 after:rounded-full after:bg-accent" : "text-foreground/75"}`}>
                {g.short ?? g.label}
                </Link>
              <button type="button" aria-haspopup="menu" aria-expanded={on} aria-label={`${on ? "Close" : "Open"} ${g.label} menu`} onClick={() => setOpen(on ? null : g.id)} className="inline-flex h-10 w-5 -ml-1 items-center justify-center rounded-md text-muted hover:text-foreground"><svg aria-hidden viewBox="0 0 12 12" width="10" height="10" className={`text-muted transition-transform ${on ? "rotate-180" : ""}`}><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              {on && (
                <div role="menu" className="absolute left-0 top-full pt-1.5 z-50">
                  <div className="card shadow-pop w-[400px] p-2">
                    <Link href={g.href} role="menuitem" className="block rounded-lg px-3 py-2.5 hover:bg-surface">
                      <div className="font-semibold leading-snug flex items-center gap-2"><NavIcon id={g.id} className="h-4 w-4 text-accent" />{g.label}</div>
                      <div className="text-xs text-muted mt-0.5 leading-relaxed">{g.blurb}</div>
                    </Link>
                    <div className="my-1.5 border-t border-border" />
                    <div className={visible(g.items).length > 6 ? "grid grid-cols-2 gap-x-1" : ""}>
                      {visible(g.items).map((it) => {
                        const here = !!path && path.startsWith(it.href) && !it.href.startsWith("http");
                        return (
                          <Link key={it.href} href={it.href} role="menuitem" className={`block rounded-lg px-3 py-1.5 hover:bg-surface ${here ? "text-foreground font-medium bg-surface/60" : ""}`}>
                            <div className="text-sm leading-snug flex items-center gap-2"><NavItemIcon href={it.href} label={it.label} className={`h-4 w-4 shrink-0 ${here ? "text-accent" : "text-muted"}`} />{it.label}</div>
                            {visible(g.items).length <= 6 && <div className="text-xs text-muted leading-relaxed">{it.blurb}</div>}
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

      <button type="button" onClick={() => { setOpenGroup(activeGroup?.id ?? "find"); setDrawer(true); }} className="ctl xl:hidden px-0 sm:px-3" aria-label="Open menu" aria-expanded={drawer} aria-controls="site-drawer">
        <svg aria-hidden viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M3 5.5h14M3 10h14M3 14.5h14" /></svg>
        <span className="hidden sm:inline">Menu</span>
      </button>
      {/* Portaled to <body>: the header's backdrop-filter makes it the containing block for fixed
          descendants, which would trap the overlay inside the 56px header bar. */}
      {drawer && createPortal(
        <div className="fixed inset-0 z-[90] bg-black/45 backdrop-blur-[2px]" onMouseDown={(e) => { if (e.target === e.currentTarget) setDrawer(false); }}>
          <div id="site-drawer" role="dialog" aria-modal="true" aria-label="Menu" className="absolute right-0 top-0 h-full w-[88vw] max-w-sm bg-background border-l border-border overflow-y-auto overscroll-contain shadow-pop flex flex-col">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-4 h-14 border-b border-border bg-background/95 backdrop-blur">
              <span className="font-semibold tracking-tight">Menu</span>
              <button type="button" onClick={() => setDrawer(false)} className="ctl ctl-icon" aria-label="Close menu">
                <svg aria-hidden viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M5 5l10 10M15 5L5 15" /></svg>
              </button>
            </div>
            <div className="px-3 py-3">
              {/* Quick actions: the things most people open the menu for */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button type="button" onClick={() => { setDrawer(false); window.dispatchEvent(new Event("onco:open-palette")); }} className="card px-3 py-2.5 text-left text-sm font-medium hover:bg-surface flex items-center gap-2"><NavIcon id="search" className="h-4 w-4 text-accent" />Search</button>
                <Link href="/for-me/" className="card px-3 py-2.5 text-sm font-medium hover:bg-surface flex items-center gap-2"><NavIcon id="live" className="h-4 w-4 text-accent" />For me</Link>
                <Link href="/ask/" className="card px-3 py-2.5 text-sm font-medium hover:bg-surface flex items-center gap-2"><NavIcon id="find" className="h-4 w-4 text-accent" />Ask OnCo</Link>
                <Link href="/cancers/" className="card px-3 py-2.5 text-sm font-medium hover:bg-surface flex items-center gap-2"><NavIcon id="map" className="h-4 w-4 text-accent" />Cancer types</Link>
              </div>
              {/* One group open at a time; the current section starts open */}
              <div className="divide-y divide-border rounded-xl border border-border overflow-hidden bg-card">
                {NAV_GROUPS.map((g) => {
                  const isOpen = openGroup === g.id;
                  const active = activeGroup?.id === g.id;
                  return (
                    <div key={g.id}>
                      <div className="flex items-stretch">
                        <button type="button" onClick={() => setOpenGroup(isOpen ? null : g.id)} aria-expanded={isOpen} aria-controls={`drawer-${g.id}`}
                          className={`flex-1 flex items-center gap-2.5 px-3 py-3 text-left text-[15px] font-medium hover:bg-surface ${active ? "text-accent" : ""}`}>
                          <NavIcon id={g.id} className="h-5 w-5 shrink-0" />
                          <span className="flex-1">{g.label}</span>
                          <span className="text-xs text-muted tabular-nums">{visible(g.items).length}</span>
                          <svg aria-hidden viewBox="0 0 12 12" width="12" height="12" className={`text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                      </div>
                      {isOpen && (
                        <ul id={`drawer-${g.id}`} className="pb-2 bg-background/60">
                          <li><Link href={g.href} className="block px-4 py-2.5 text-[15px] text-accent hover:bg-surface">Overview of {g.label.toLowerCase()} →</Link></li>
                          {visible(g.items).map((it) => {
                            const here = !!path && path.startsWith(it.href) && !it.href.startsWith("http");
                            return (
                              <li key={it.href}>
                                {it.href.startsWith("http")
                                  ? <a href={it.href} rel="noopener" className="block px-4 py-2.5 text-[15px] hover:bg-surface">{it.label}</a>
                                  : <Link href={it.href} className={`block px-4 py-2.5 text-[15px] hover:bg-surface ${here ? "font-medium bg-surface" : ""}`}><span className="flex items-center gap-2"><NavItemIcon href={it.href} label={it.label} className="h-4 w-4 shrink-0 text-accent" />{it.label}</span><span className="block text-xs text-muted leading-snug line-clamp-1 pl-6">{it.blurb}</span></Link>}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 px-1 text-xs text-muted">Country, language and theme switches are in the top bar.</p>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}

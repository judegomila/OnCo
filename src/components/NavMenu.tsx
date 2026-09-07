"use client";

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

  const activeGroup = NAV_GROUPS.find((g) => g.items.some((i) => i.href !== "/" && path?.startsWith(i.href)) || (g.href !== "/" && path?.startsWith(g.href)));

  return (
    <div ref={wrap} className="flex items-center">
      <nav className="hidden lg:flex items-center gap-0.5 text-sm" aria-label="Primary">
        {NAV_GROUPS.map((g) => {
          const on = open === g.id;
          return (
            <div key={g.id} className="relative" onMouseEnter={() => setOpen(g.id)} onMouseLeave={() => setOpen((o) => (o === g.id ? null : o))}>
              <button type="button" aria-haspopup="menu" aria-expanded={on} onClick={() => setOpen(on ? null : g.id)}
                className={`px-2.5 py-1.5 rounded-md hover:bg-foreground/5 ${activeGroup?.id === g.id ? "text-foreground font-medium" : "text-foreground/80"}`}>
                {g.label}<span aria-hidden className="ml-1 text-[10px] text-muted">▾</span>
              </button>
              {on && (
                <div role="menu" className="absolute left-0 top-full pt-1 z-50">
                  <div className="card shadow-xl w-[380px] p-2">
                    <Link href={g.href} role="menuitem" className="block rounded-md px-3 py-2 hover:bg-foreground/5">
                      <div className="font-semibold">{g.label}</div>
                      <div className="text-xs text-muted">{g.blurb}</div>
                    </Link>
                    <div className="my-1 border-t border-border" />
                    <div className={g.items.length > 6 ? "grid grid-cols-2" : ""}>
                      {g.items.map((it) => (
                        <Link key={it.href} href={it.href} role="menuitem" className={`block rounded-md px-3 py-1.5 hover:bg-foreground/5 ${path?.startsWith(it.href) ? "text-foreground font-medium" : ""}`}>
                          <div className="text-sm">{it.label}</div>
                          {g.items.length <= 6 && <div className="text-xs text-muted">{it.blurb}</div>}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <button type="button" onClick={() => setDrawer(true)} className="lg:hidden ml-2 rounded-md border border-border px-2.5 py-1.5 text-sm" aria-label="Open menu">Menu</button>
      {drawer && (
        <div className="fixed inset-0 z-[90] bg-black/40" onMouseDown={(e) => { if (e.target === e.currentTarget) setDrawer(false); }}>
          <div className="absolute right-0 top-0 h-full w-[85vw] max-w-sm bg-background border-l border-border overflow-auto p-4">
            <div className="flex items-center justify-between mb-4"><span className="font-semibold">OnCo</span><button type="button" onClick={() => setDrawer(false)} className="text-sm underline">Close</button></div>
            {NAV_GROUPS.map((g) => (
              <div key={g.id} className="mb-5">
                <Link href={g.href} className="kicker hover:underline">{g.label}</Link>
                <ul className="mt-1.5 space-y-1">{g.items.map((it) => <li key={it.href}><Link href={it.href} className="block py-1 text-sm">{it.label}</Link></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { REGION_META, REGION_ORDER, useRegion } from "@/lib/region";

/** Header control: which country's regulator decides what "approved" means on this site. Not a language switch. */
export function RegionToggle() {
  const { region, setRegion } = useRegion();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);
  const meta = REGION_META[region];
  return (
    <div ref={box} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open} aria-label={`Approvals shown for ${meta.label}. Change country`} title={`Approvals shown for ${meta.label} (${meta.regulator}). Click to change country.`}
        className="ctl px-2 gap-1.5 text-sm">
        <span aria-hidden className="text-base leading-none">{meta.flag}</span>
        <span className="hidden sm:inline text-xs font-medium">{region}</span>
      </button>
      {open && (
        <div role="listbox" aria-label="Country for approvals" className="absolute right-0 top-full mt-1.5 z-50 card shadow-pop w-72 p-1.5">
          <div className="px-2.5 pt-1.5 pb-2 text-xs text-muted leading-snug">Which regulator decides what <span className="font-medium text-foreground">approved</span> means on every page. Other countries&apos; approvals stay visible as flags.</div>
          {REGION_ORDER.map((r) => {
            const m = REGION_META[r];
            const on = r === region;
            return (
              <button key={r} role="option" aria-selected={on} onClick={() => { setRegion(r); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm hover:bg-surface ${on ? "bg-surface font-medium" : ""}`}>
                <span aria-hidden className="text-lg leading-none">{m.flag}</span>
                <span className="min-w-0"><span className="block leading-snug">{m.label}</span><span className="block text-xs text-muted leading-snug">{m.regulator}</span></span>
                {on && <span className="ml-auto text-xs text-accent">selected</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

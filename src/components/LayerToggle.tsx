"use client";

import { useEffect, useRef, useState } from "react";
import { LANGS, LEVELS, useLayer } from "@/lib/layer";

/** Compact header control for reading level and language. */
export function LayerToggle({ className = "" }: { className?: string }) {
  const [layer, update] = useLayer();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, []);

  const lang = LANGS.find((l) => l.code === layer.lang) ?? LANGS[0];
  const level = LEVELS.find((l) => l.code === layer.level) ?? LEVELS[0];
  const nonDefault = layer.level !== "technical" || layer.lang !== "en";

  return (
    <div ref={box} className={`relative ${className}`}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="dialog" aria-expanded={open} aria-label="Reading level and language"
        className={`ctl px-2.5 ${nonDefault ? "border-accent bg-accent-soft" : ""}`} title={`${level.label} · ${lang.label}`}>
        <span aria-hidden className="font-semibold tracking-tight">Aa</span>
        <span className="text-xs text-muted font-medium">{lang.code.toUpperCase()}</span>
      </button>
      {/* Phones: span the viewport below the header (a right-anchored 18rem panel would run off the left edge). */}
      {open && (
        <div role="dialog" aria-label="Reading level and language" className="fixed inset-x-4 top-[calc(var(--header-h)+0.375rem)] z-50 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-1.5 sm:w-72 card shadow-pop p-3 text-sm">
          <div className="kicker mb-1.5">Reading level</div>
          <div className="flex rounded-lg border border-border overflow-hidden mb-1.5 p-0.5 gap-0.5 bg-surface">
            {LEVELS.map((l) => (
              <button key={l.code} type="button" onClick={() => update({ level: l.code })} aria-pressed={layer.level === l.code}
                className={`flex-1 rounded-md px-2 py-1.5 transition-colors ${layer.level === l.code ? "bg-foreground text-background font-medium shadow-sm" : "hover:bg-card"}`}>{l.label}</button>
            ))}
          </div>
          <p className="text-xs text-muted mb-3 leading-relaxed">{level.blurb}.</p>
          <div className="kicker mb-1.5">Language of TL;DRs</div>
          <div className="grid grid-cols-5 gap-1">
            {LANGS.map((l) => (
              <button key={l.code} type="button" onClick={() => update({ lang: l.code })} title={l.label} aria-pressed={layer.lang === l.code}
                className={`rounded-md border px-1 py-1.5 text-xs transition-colors ${layer.lang === l.code ? "bg-foreground text-background border-foreground font-medium" : "border-border hover:bg-surface"}`}>{l.native}</button>
            ))}
          </div>
          <p className="text-[11px] text-muted mt-2.5 leading-relaxed">Translations and simplified text are machine-assisted and unreviewed. Technical summaries stay in English. Where a translation is missing, the English TL;DR is shown with an EN mark.</p>
          {nonDefault && <button type="button" onClick={() => update({ level: "technical", lang: "en" })} className="mt-2 text-xs underline text-muted hover:text-foreground">Reset</button>}
        </div>
      )}
    </div>
  );
}

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
        className={`flex h-8 shrink-0 items-center gap-1 whitespace-nowrap rounded-lg border px-2 text-sm leading-none hover:bg-foreground/5 ${nonDefault ? "border-accent bg-accent/5" : "border-border bg-card"}`} title={`${level.label} · ${lang.label}`}>
        <span aria-hidden className="font-semibold">Aa</span>
        <span className="text-xs text-muted">{lang.code.toUpperCase()}</span>
      </button>
      {open && (
        <div role="dialog" aria-label="Reading level and language" className="absolute right-0 z-50 mt-1 w-72 card shadow-xl p-3 text-sm">
          <div className="kicker mb-1.5">Reading level</div>
          <div className="flex rounded-md border border-border overflow-hidden mb-1">
            {LEVELS.map((l) => (
              <button key={l.code} type="button" onClick={() => update({ level: l.code })} className={`flex-1 px-2 py-1.5 ${layer.level === l.code ? "bg-foreground text-background" : "bg-card hover:bg-foreground/5"}`}>{l.label}</button>
            ))}
          </div>
          <p className="text-xs text-muted mb-3">{level.blurb}.</p>
          <div className="kicker mb-1.5">Language of TL;DRs</div>
          <div className="grid grid-cols-5 gap-1">
            {LANGS.map((l) => (
              <button key={l.code} type="button" onClick={() => update({ lang: l.code })} title={l.label} className={`rounded-md border px-1 py-1.5 text-xs ${layer.lang === l.code ? "bg-foreground text-background border-foreground" : "border-border hover:bg-foreground/5"}`}>{l.native}</button>
            ))}
          </div>
          <p className="text-[11px] text-muted mt-2">Translations and simplified text are machine-assisted and unreviewed. Technical summaries stay in English. Where a translation is missing, the English TL;DR is shown with an EN mark.</p>
          {nonDefault && <button type="button" onClick={() => update({ level: "technical", lang: "en" })} className="mt-2 text-xs underline text-muted">Reset</button>}
        </div>
      )}
    </div>
  );
}

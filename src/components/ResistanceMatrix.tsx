"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { CATEGORIES, CATEGORY_BY_ID, type MechanismCategory } from "@/lib/resistance-categories";

/* ------------------------------------------------------------------------------------------------
 * Shared highlight state. The matrix, the escape-route maps and the mechanism cards all live in
 * different server-rendered sections, so a small context carried by `AtlasProvider` lets a click
 * on a category column dim everything else on the page.
 * ---------------------------------------------------------------------------------------------- */

type AtlasState = { highlight: MechanismCategory | null; setHighlight: (c: MechanismCategory | null) => void; toggle: (c: MechanismCategory) => void };
const AtlasContext = createContext<AtlasState>({ highlight: null, setHighlight: () => {}, toggle: () => {} });

export function AtlasProvider({ children }: { children: ReactNode }) {
  const [highlight, setHighlight] = useState<MechanismCategory | null>(null);
  const toggle = useCallback((c: MechanismCategory) => setHighlight((cur) => (cur === c ? null : c)), []);
  const value = useMemo(() => ({ highlight, setHighlight, toggle }), [highlight, toggle]);
  return <AtlasContext.Provider value={value}>{children}</AtlasContext.Provider>;
}

export function useAtlas() {
  return useContext(AtlasContext);
}

/** Wrap anything that belongs to one category; it fades when a different category is highlighted. */
export function CategoryScope({ category, children, className = "", id }: { category: MechanismCategory; children: ReactNode; className?: string; id?: string }) {
  const { highlight } = useAtlas();
  const dimmed = highlight !== null && highlight !== category;
  return (
    <div id={id} data-category={category} className={`transition-opacity duration-300 ${dimmed ? "opacity-30 saturate-0" : ""} ${className}`} aria-hidden={dimmed || undefined}>
      {children}
    </div>
  );
}

/** Small coloured dot for a category, used in headings and legends. */
export function CategoryDot({ category, size = 10, className = "" }: { category: MechanismCategory; size?: number; className?: string }) {
  return <span aria-hidden className={`inline-block rounded-full shrink-0 ${className}`} style={{ width: size, height: size, background: CATEGORY_BY_ID[category].color }} />;
}

/* ------------------------------------------------------------------------------------------------
 * Heat grid: drug classes × categories.
 * ---------------------------------------------------------------------------------------------- */

export type MatrixRow = {
  id: string;
  /** Short class label for the row header. */
  label: string;
  /** Mechanism names per category (empty array when none). */
  cells: Record<MechanismCategory, string[]>;
};

function mix(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha.toFixed(3)})`;
}

export function ResistanceMatrix({ rows }: { rows: MatrixRow[] }) {
  const { highlight, toggle, setHighlight } = useAtlas();
  const max = useMemo(() => Math.max(1, ...rows.flatMap((r) => CATEGORIES.map((c) => r.cells[c.id].length))), [rows]);
  const colTotals = useMemo(() => Object.fromEntries(CATEGORIES.map((c) => [c.id, rows.reduce((s, r) => s + r.cells[c.id].length, 0)])) as Record<MechanismCategory, number>, [rows]);
  const total = rows.reduce((s, r) => s + CATEGORIES.reduce((t, c) => t + r.cells[c.id].length, 0), 0);
  const active = highlight ? CATEGORY_BY_ID[highlight] : null;

  return (
    <div className="card overflow-hidden">
      <div className="px-4 pt-4 pb-2 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="kicker">Overview</div>
          <div className="font-medium">How each drug class gets beaten</div>
          <p className="text-sm text-muted mt-0.5">{rows.length} drug classes · {total} documented escape routes · darker cells mean more routes of that kind. Click a row to jump to it, a column to follow one kind of escape across the page.</p>
        </div>
        {active && (
          <button type="button" onClick={() => setHighlight(null)} className="chip border bg-card border-border hover:bg-foreground/5 inline-flex items-center gap-1.5">
            <CategoryDot category={active.id} size={8} /> Showing {active.label.toLowerCase()} only · clear
          </button>
        )}
      </div>

      <div className="overflow-x-auto px-2 pb-2">
        <div role="table" aria-label="Resistance mechanisms by drug class and category" className="min-w-[760px] grid text-sm" style={{ gridTemplateColumns: `minmax(180px, 1.5fr) repeat(${CATEGORIES.length}, minmax(64px, 1fr)) 56px` }}>
          {/* Header row */}
          <div role="columnheader" className="px-2 py-2 text-[11px] uppercase tracking-wider text-muted font-semibold self-end">Drug class</div>
          {CATEGORIES.map((c) => {
            const on = highlight === c.id, off = highlight !== null && !on;
            return (
              <div key={c.id} role="columnheader" className="self-end">
                <button type="button" onClick={() => toggle(c.id)} aria-pressed={on} title={c.oneLiner}
                  className={`w-full px-1 py-2 text-left rounded-md transition ${off ? "opacity-40" : ""} hover:bg-foreground/5 focus-visible:bg-foreground/5`}>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold leading-tight" style={{ color: c.color }}>
                    <CategoryDot category={c.id} size={8} /> <span className={on ? "underline underline-offset-2" : ""}>{c.label}</span>
                  </span>
                  <span className="sr-only">{c.oneLiner}</span>
                </button>
              </div>
            );
          })}
          <div role="columnheader" className="px-1 py-2 text-[11px] uppercase tracking-wider text-muted font-semibold text-right self-end">All</div>

          {/* Body */}
          {rows.map((r) => {
            const rowTotal = CATEGORIES.reduce((s, c) => s + r.cells[c.id].length, 0);
            return (
              <div key={r.id} role="row" className="contents">
                <a role="rowheader" href={`#${r.id}`} className="px-2 py-1.5 border-t border-border font-medium hover:underline decoration-foreground/30 underline-offset-[3px] truncate self-center" title={`Jump to ${r.label}`}>
                  {r.label}
                </a>
                {CATEGORIES.map((c, ci) => {
                  const names = r.cells[c.id];
                  const n = names.length;
                  const off = highlight !== null && highlight !== c.id;
                  const alpha = n ? 0.14 + 0.66 * (n / max) : 0;
                  return (
                    <div key={c.id} role="cell" className={`group relative border-t border-border p-1 transition-opacity ${off ? "opacity-30" : ""}`}>
                      <div tabIndex={n ? 0 : -1} aria-label={n ? `${n} ${c.label} route${n > 1 ? "s" : ""} for ${r.label}: ${names.join("; ")}` : undefined}
                        className={`h-9 rounded-md flex items-center justify-center text-[13px] font-semibold tabular-nums outline-none ${n ? "cursor-help" : ""}`}
                        style={n ? { background: mix(c.color, alpha), color: alpha > 0.55 ? "#fff" : c.color, boxShadow: `inset 0 0 0 1px ${mix(c.color, 0.35)}` } : { boxShadow: "inset 0 0 0 1px var(--border)" }}>
                        {n ? n : <span className="text-border">·</span>}
                      </div>
                      {n > 0 && (
                        <div role="tooltip" className={`pointer-events-none invisible group-hover:visible group-focus-within:visible absolute z-20 top-full mt-1 w-56 card p-2.5 text-xs shadow-lg ${ci >= CATEGORIES.length - 2 ? "right-0" : "left-0"}`}>
                          <div className="flex items-center gap-1.5 font-semibold" style={{ color: c.color }}><CategoryDot category={c.id} size={7} /> {c.label} · {r.label}</div>
                          <ul className="mt-1 space-y-0.5 text-foreground/90 list-disc ps-4">{names.map((nm) => <li key={nm} className="leading-snug">{nm}</li>)}</ul>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div role="cell" className="border-t border-border px-2 py-1.5 text-right text-muted tabular-nums self-center">{rowTotal}</div>
              </div>
            );
          })}

          {/* Footer totals */}
          <div role="cell" className="px-2 py-2 border-t-2 border-border text-[11px] uppercase tracking-wider text-muted font-semibold">All classes</div>
          {CATEGORIES.map((c) => (
            <div key={c.id} role="cell" className={`px-1 py-2 border-t-2 border-border text-center font-semibold tabular-nums transition-opacity ${highlight !== null && highlight !== c.id ? "opacity-30" : ""}`} style={{ color: c.color }}>{colTotals[c.id] || <span className="text-border">·</span>}</div>
          ))}
          <div role="cell" className="px-2 py-2 border-t-2 border-border text-right font-semibold tabular-nums">{total}</div>
        </div>
      </div>

      {/* Legend */}
      <div className="border-t border-border px-4 py-3">
        <div className="kicker mb-2">Kinds of escape</div>
        <div className="grid gap-x-4 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => {
            const on = highlight === c.id, off = highlight !== null && !on;
            return (
              <button key={c.id} type="button" onClick={() => toggle(c.id)} aria-pressed={on}
                className={`text-left flex items-start gap-2 rounded-md px-1.5 py-1 -mx-1.5 transition hover:bg-foreground/5 ${off ? "opacity-40" : ""} ${on ? "bg-foreground/5" : ""}`}>
                <span className="mt-1.5 inline-block w-3 h-[3px] rounded-full shrink-0" style={{ background: c.color }} />
                <span className="text-xs leading-snug"><span className="font-semibold" style={{ color: c.color }}>{c.label}</span> <span className="text-muted">{c.oneLiner}</span></span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm border-l-2 border-accent bg-accent/10" /> escape route (how the tumour gets out)</span>
          <span className="inline-flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm border-l-2 border-emerald-500 bg-emerald-500/10" /> countermeasure (what closes it)</span>
          <span className="inline-flex items-center gap-1.5"><span className="inline-flex items-center justify-center w-5 h-3.5 rounded-sm border border-emerald-500 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">2</span> gate on a map = number of countermeasures</span>
        </div>
      </div>
    </div>
  );
}

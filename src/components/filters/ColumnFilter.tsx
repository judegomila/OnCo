"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { toggleValue, type FacetOption } from "./FacetSelect";
import { useT } from "@/lib/i18n/ui";

/**
 * What a column needs to filter itself from its header: the distinct values (with counts), the current selection
 * and the setter the toolbar's facet control already uses, so the header and the facet button stay in step.
 * `single` marks facets that hold one value at a time (the toolbar shows them as a single-choice select).
 */
export type ColumnFilterSpec = { options: FacetOption[]; value: string[]; onChange: (v: string[]) => void; single?: boolean };

/** Search box threshold: lists longer than this get a search field at the top. */
export const SEARCH_FROM = 8;
const W = 288;

/** The selection after choosing `v`: multi lists toggle it (as the facet dropdown does); single lists replace or clear. */
export function pickValue(current: string[], v: string, single?: boolean): string[] {
  if (single) return current.includes(v) ? [] : [v];
  return toggleValue(current, v);
}

/** Funnel glyph: outlined when nothing is selected, filled in the accent when the column is filtered. */
export function FilterGlyph({ active, className = "" }: { active: boolean; className?: string }) {
  return (
    <svg aria-hidden data-glyph="filter" viewBox="0 0 16 16" width="12" height="12" className={`shrink-0 ${className}`}>
      <path d="M2 3h12l-4.6 5.4V13l-2.8-1.4V8.4Z" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * A column header that filters its own column. The trigger sits in the <th>; clicking it opens a small panel
 * anchored under the header with every distinct value as a pill (with a count), a search box when there are
 * more than eight, and Clear and Close. Choosing a pill calls the same setter as the toolbar's facet button, so
 * the two controls, and the URL where the browser writes one, never disagree.
 *
 * The panel is position: fixed and measured from the trigger when it opens, so it is never clipped by the
 * table's sideways scroll and opening it moves nothing else on the page; under the sm breakpoint it becomes a
 * bottom sheet. Escape or Close returns focus to the trigger.
 *
 * `variant="label"` makes the whole header text the trigger (columns that do not sort); `variant="glyph"`
 * renders only the funnel, for headers whose text is the sort control.
 */
export function ColumnFilter({ label, labelNode, spec, variant }: { label: string; labelNode?: ReactNode; spec: ColumnFilterSpec; variant: "label" | "glyph" }) {
  const { t, tl, lang } = useT();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const [sheet, setSheet] = useState(false);
  const [q, setQ] = useState("");
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const col = tl(label);
  const selected = useMemo(() => new Set(spec.value), [spec.value]);
  const active = spec.value.length > 0;
  const searchable = spec.options.length > SEARCH_FROM;
  const lower = (s: string) => (lang === "en" ? s.toLowerCase() : s);

  const place = () => {
    const r = btn.current?.getBoundingClientRect();
    if (!r) return;
    const small = window.innerWidth < 640;
    setSheet(small);
    if (!small) setPos({ left: Math.min(Math.max(8, r.left), Math.max(8, window.innerWidth - W - 8)), top: r.bottom + 6 });
  };
  const close = (refocus = true) => { setOpen(false); setQ(""); if (refocus) btn.current?.focus(); };
  const toggle = () => { if (open) { close(); return; } place(); setQ(""); setOpen(true); };

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const tgt = e.target as Node;
      if (panel.current?.contains(tgt) || btn.current?.contains(tgt)) return;
      setOpen(false); setQ("");
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { e.stopPropagation(); setOpen(false); setQ(""); btn.current?.focus(); } };
    const onMove = () => {
      const r = btn.current?.getBoundingClientRect();
      if (!r) return;
      const small = window.innerWidth < 640;
      setSheet(small);
      if (!small) setPos({ left: Math.min(Math.max(8, r.left), Math.max(8, window.innerWidth - W - 8)), top: r.bottom + 6 });
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onMove);
    window.addEventListener("scroll", onMove, true);
    const id = window.setTimeout(() => (input.current ?? panel.current?.querySelector<HTMLElement>("button"))?.focus(), 0);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onMove);
      window.removeEventListener("scroll", onMove, true);
      window.clearTimeout(id);
    };
  }, [open]);

  const shown = useMemo(() => {
    const n = q.trim().toLowerCase();
    return n ? spec.options.filter((o) => o.label.toLowerCase().includes(n) || o.value.toLowerCase().includes(n)) : spec.options;
  }, [spec.options, q]);

  const pick = (v: string) => {
    spec.onChange(pickValue(spec.value, v, spec.single));
    if (spec.single) close();
  };

  const labelFor = (v: string) => spec.options.find((o) => o.value === v)?.label ?? v;
  const summary = active ? spec.value.map(labelFor).join(", ") : "";
  const title = active ? t("table.filteringCol", { col, value: summary }) : t("table.filterCol", { col });
  const first = active ? labelFor(spec.value[0]) : "";

  return (
    <>
      <button ref={btn} type="button" onClick={toggle} aria-haspopup="dialog" aria-expanded={open} aria-label={variant === "glyph" ? title : undefined} title={title} data-column-filter={variant}
        className={`group/filter inline-flex items-center gap-1 rounded-sm py-1.5 -my-1.5 max-w-full ${active ? "text-foreground" : ""} ${variant === "glyph" ? "px-0.5" : ""}`}>
        {variant === "label" && (labelNode ?? col)}
        <FilterGlyph active={active} className={active ? "text-accent" : "text-muted/40 group-hover/filter:text-muted"} />
        {active && (
          <span lang={lang} className="chip bg-accent-soft text-accent border-accent text-[10px] leading-none py-px px-1.5 max-w-[7rem] normal-case tracking-normal font-medium">
            <span className="truncate">{first}</span>{spec.value.length > 1 && <span className="tabular-nums">+{spec.value.length - 1}</span>}
          </span>
        )}
      </button>
      {open && (
        <>
          {sheet && <div aria-hidden className="fixed inset-0 z-40 bg-foreground/30" onClick={() => close()} />}
          <div ref={panel} role="dialog" aria-label={t("table.filterCol", { col })} lang={lang}
            className={`z-50 card shadow-pop overflow-hidden text-start text-sm leading-normal whitespace-normal normal-case tracking-normal font-normal text-foreground ${sheet ? "fixed inset-x-0 bottom-0 rounded-b-none rounded-t-2xl max-h-[70vh] flex flex-col" : "fixed w-72 max-w-[calc(100vw-16px)]"}`}
            style={sheet ? undefined : { left: pos?.left ?? 8, top: pos?.top ?? 8 }}>
            <div className="flex items-center justify-between gap-2 px-3 pt-2.5 pb-1.5">
              <span className="kicker">{t("table.filterCol", { col })}</span>
              <span className="text-xs text-muted tabular-nums">{spec.options.length}</span>
            </div>
            {searchable && (
              <div className="px-2 pb-2">
                <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder={`${t("table.searchIn", { label: lower(col) })}…`} aria-label={t("table.searchIn", { label: lower(col) })}
                  className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/25" />
              </div>
            )}
            <div className={`px-3 pb-2 flex flex-wrap gap-1.5 overflow-auto ${sheet ? "" : "max-h-64"}`} role="group" aria-label={col}>
              {shown.map((o) => {
                const on = selected.has(o.value);
                return (
                  <button key={o.value} type="button" onClick={() => pick(o.value)} aria-pressed={on} title={on ? t("table.filteringBy", { facet: col, value: o.label }) : t("table.filterBy", { facet: col, value: o.label })}
                    className={`chip cursor-pointer transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${on ? "bg-accent-soft text-accent border-accent" : `${o.className ?? "bg-foreground/5"} hover:bg-accent-soft hover:text-accent`}`}>
                    {on && <svg aria-hidden viewBox="0 0 12 12" width="10" height="10" className="shrink-0"><path d="M2.5 6.5 5 9l4.5-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    {o.icon !== undefined && <span aria-hidden className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center text-xs leading-none">{o.icon}</span>}
                    <span className="truncate max-w-[14rem]">{o.label}</span>
                    {o.count !== undefined && <span className="text-[10px] text-muted tabular-nums">{o.count}</span>}
                  </button>
                );
              })}
              {shown.length === 0 && <span className="text-sm text-muted py-1">{t("table.noMatches")}</span>}
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-border px-3 py-2 bg-surface/50">
              <button type="button" onClick={() => { spec.onChange([]); if (spec.single) close(); }} disabled={!active} className={`text-xs underline ${active ? "text-muted hover:text-foreground" : "text-muted/40 no-underline cursor-default"}`}>{t("table.clearLabel", { label: lower(col) })}</button>
              <button type="button" onClick={() => close()} className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium hover:bg-surface">{t("close")}</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

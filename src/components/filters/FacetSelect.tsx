"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type FacetOption = { value: string; label: string; count?: number; group?: string; className?: string };

type Props = {
  label: string;
  options: FacetOption[];
  /** For multi=false pass a string | null; for multi=true pass string[]. */
  value: string[] | string | null;
  onChange: (v: string[] | string | null) => void;
  multi?: boolean;
  searchable?: boolean;
  placeholder?: string;
  /** Text for the "none" choice in single mode. */
  allLabel?: string;
  width?: string;
};

/** Compact dropdown facet with optional search. Shared by Explore and the products browser. */
export function FacetSelect({ label, options, value, onChange, multi = false, searchable = true, placeholder, allLabel = "All", width = "w-56" }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, []);
  useEffect(() => { if (open) setTimeout(() => input.current?.focus(), 0); }, [open]);

  const selected = useMemo(() => new Set(Array.isArray(value) ? value : value ? [value] : []), [value]);
  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    return n ? options.filter((o) => o.label.toLowerCase().includes(n) || o.value.toLowerCase().includes(n)) : options;
  }, [options, q]);
  const groups = useMemo(() => {
    const m = new Map<string, FacetOption[]>();
    for (const o of filtered) { const g = o.group ?? ""; m.set(g, [...(m.get(g) ?? []), o]); }
    return [...m.entries()];
  }, [filtered]);

  const summary = selected.size === 0 ? (placeholder ?? allLabel) : selected.size === 1 ? (options.find((o) => selected.has(o.value))?.label ?? [...selected][0]) : `${selected.size} selected`;

  const pick = (v: string) => {
    if (multi) { const next = new Set(selected); if (next.has(v)) next.delete(v); else next.add(v); onChange([...next]); }
    else { onChange(selected.has(v) ? null : v); setOpen(false); }
  };

  return (
    <div ref={box} className="relative">
      <button type="button" onClick={() => { setQ(""); setOpen((o) => !o); }} aria-haspopup="listbox" aria-expanded={open}
        className={`${width} max-w-full flex items-center justify-between gap-2 rounded-lg border px-3 py-1.5 text-sm text-left transition-colors ${selected.size ? "border-accent bg-accent-soft" : "border-border bg-card hover:border-border-strong"} hover:bg-surface`}>
        <span className="min-w-0 truncate"><span className="text-muted">{label}: </span><span className="font-medium">{summary}</span></span>
        <svg aria-hidden viewBox="0 0 12 12" width="10" height="10" className={`shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {open && (
        <div className="absolute z-40 mt-1.5 w-72 max-w-[85vw] card shadow-pop overflow-hidden">
          {searchable && <div className="p-2 border-b border-border"><input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${label.toLowerCase()}…`} aria-label={`Search ${label.toLowerCase()}`} className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/25" /></div>}
          <div className="max-h-72 overflow-auto py-1" role="listbox" aria-multiselectable={multi}>
            {!multi && (
              <button type="button" onClick={() => { onChange(null); setOpen(false); }} className={`w-full text-left px-3 py-1.5 text-sm hover:bg-surface ${selected.size === 0 ? "font-semibold" : ""}`}>{allLabel}</button>
            )}
            {groups.map(([g, opts]) => (
              <div key={g}>
                {g && <div className="px-3 pt-2.5 pb-1 kicker">{g}</div>}
                {opts.map((o) => {
                  const on = selected.has(o.value);
                  return (
                    <button key={o.value} type="button" role="option" aria-selected={on} onClick={() => pick(o.value)} className={`w-full flex items-center gap-2.5 text-left px-3 py-1.5 text-sm hover:bg-surface ${on ? "font-medium" : ""}`}>
                      {multi && (
                        <span aria-hidden className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${on ? "bg-accent-solid border-accent-solid text-accent-fg" : "border-border-strong bg-card"}`}>
                          {on && <svg viewBox="0 0 12 12" width="10" height="10"><path d="M2.5 6.5 5 9l4.5-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        </span>
                      )}
                      <span className={`flex-1 truncate ${o.className ?? ""}`}>{o.label}</span>
                      {o.count !== undefined && <span className="text-xs text-muted tabular-nums">{o.count}</span>}
                    </button>
                  );
                })}
              </div>
            ))}
            {filtered.length === 0 && <div className="px-3 py-2 text-sm text-muted">No matches.</div>}
          </div>
          {multi && selected.size > 0 && <div className="border-t border-border p-2 bg-surface/50"><button type="button" onClick={() => onChange([])} className="text-xs underline text-muted hover:text-foreground">Clear {label.toLowerCase()}</button></div>}
        </div>
      )}
    </div>
  );
}

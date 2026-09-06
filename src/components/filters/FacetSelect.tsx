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
        className={`${width} max-w-full flex items-center justify-between gap-2 rounded-lg border px-3 py-1.5 text-sm text-left ${selected.size ? "border-accent bg-accent/5" : "border-border bg-card"} hover:bg-foreground/5`}>
        <span className="min-w-0 truncate"><span className="text-muted">{label}: </span><span className="font-medium">{summary}</span></span>
        <span aria-hidden className="text-muted text-xs">▾</span>
      </button>
      {open && (
        <div className="absolute z-40 mt-1 w-72 max-w-[85vw] card shadow-xl">
          {searchable && <div className="p-2 border-b border-border"><input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${label.toLowerCase()}…`} className="w-full rounded-md border border-border bg-background px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-accent/40" /></div>}
          <div className="max-h-72 overflow-auto py-1" role="listbox" aria-multiselectable={multi}>
            {!multi && (
              <button type="button" onClick={() => { onChange(null); setOpen(false); }} className={`w-full text-left px-3 py-1.5 text-sm hover:bg-foreground/5 ${selected.size === 0 ? "font-semibold" : ""}`}>{allLabel}</button>
            )}
            {groups.map(([g, opts]) => (
              <div key={g}>
                {g && <div className="px-3 pt-2 pb-0.5 text-[10px] uppercase tracking-wider text-muted">{g}</div>}
                {opts.map((o) => {
                  const on = selected.has(o.value);
                  return (
                    <button key={o.value} type="button" role="option" aria-selected={on} onClick={() => pick(o.value)} className={`w-full flex items-center gap-2 text-left px-3 py-1.5 text-sm hover:bg-foreground/5 ${on ? "font-semibold" : ""}`}>
                      {multi && <span className={`h-3.5 w-3.5 rounded border ${on ? "bg-accent border-accent" : "border-border"}`} />}
                      <span className={`flex-1 truncate ${o.className ?? ""}`}>{o.label}</span>
                      {o.count !== undefined && <span className="text-xs text-muted tabular-nums">{o.count}</span>}
                    </button>
                  );
                })}
              </div>
            ))}
            {filtered.length === 0 && <div className="px-3 py-2 text-sm text-muted">No matches.</div>}
          </div>
          {multi && selected.size > 0 && <div className="border-t border-border p-2"><button type="button" onClick={() => onChange([])} className="text-xs underline text-muted">Clear {label.toLowerCase()}</button></div>}
        </div>
      )}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FacetSelect } from "./filters/FacetSelect";
import { ResultsTable, Toolbar, type Column, type SortState } from "./filters/ResultsTable";

export type HtaRow = {
  id: string; body: string; country: string; drugId?: string; product: string; route?: string; brand?: string; modality?: string;
  title: string; verdict: string; verdictLabel: string; tone: string; date?: string; updated?: string; url: string; documentUrl?: string; note?: string; origin: "fetched" | "curated";
};

const TONE: Record<string, string> = {
  positive: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  managed: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200",
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  negative: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
  neutral: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
};

/** Filterable table of HTA verdicts (NICE, G-BA, PBAC, curated NICE and SMC rows) per product and country. */
export function HtaTable({ rows }: { rows: HtaRow[] }) {
  const [bodies, setBodies] = useState<string[]>([]);
  const [verdicts, setVerdicts] = useState<string[]>([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortState>({ key: "date", dir: -1 });

  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    const list = rows.filter((r) => (!bodies.length || bodies.includes(r.body)) && (!verdicts.length || verdicts.includes(r.verdictLabel)) && (!n || `${r.product} ${r.brand ?? ""} ${r.title} ${r.note ?? ""}`.toLowerCase().includes(n)));
    list.sort((a, b) => sort.key === "product" ? sort.dir * a.product.localeCompare(b.product) : sort.key === "body" ? sort.dir * a.body.localeCompare(b.body) || a.product.localeCompare(b.product) : sort.dir * (a.date ?? "").localeCompare(b.date ?? "") || a.product.localeCompare(b.product));
    return list;
  }, [rows, bodies, verdicts, q, sort]);

  const opt = (f: (r: HtaRow) => string) => { const m = new Map<string, number>(); for (const r of rows) m.set(f(r), (m.get(f(r)) ?? 0) + 1); return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([v, n]) => ({ value: v, label: v, count: n })); };

  const columns: Column<HtaRow>[] = [
    { key: "date", label: "Date", sortable: true, render: (r) => <span className="font-mono text-sm whitespace-nowrap">{r.date ?? ""}{r.updated && r.updated !== r.date ? <span className="block text-[11px] text-muted">updated {r.updated}</span> : null}</span> },
    { key: "product", label: "Product", sortable: true, render: (r) => <div>{r.route ? <Link href={r.route} className="font-medium hover:underline">{r.product}</Link> : <span className="font-medium">{r.product}</span>}{(r.brand || r.modality) && <div className="text-xs text-muted">{[r.brand, r.modality].filter(Boolean).join(" · ")}</div>}</div> },
    { key: "body", label: "Body", sortable: true, render: (r) => <span className="whitespace-nowrap">{r.body}<span className="block text-xs text-muted">{r.country}</span></span> },
    { key: "verdict", label: "Verdict", render: (r) => <span className={`chip ${TONE[r.tone] ?? TONE.neutral}`}>{r.verdictLabel}</span> },
    { key: "title", label: "Appraisal", render: (r) => <span><a href={r.url} rel="noopener" className="hover:underline">{r.title}</a>{r.documentUrl && <> <a href={r.documentUrl} rel="noopener" className="text-xs underline text-muted">document</a></>}{r.note && <span className="block text-xs text-muted">{r.note}</span>}</span> },
  ];

  return (
    <div>
      <Toolbar count={filtered.length} total={rows.length} noun="verdicts"
        left={<>
          <FacetSelect label="Body" options={opt((r) => r.body)} value={bodies} onChange={(v) => setBodies(v as string[])} multi searchable={false} allLabel="Any" width="w-44" />
          <FacetSelect label="Verdict" options={opt((r) => r.verdictLabel)} value={verdicts} onChange={(v) => setVerdicts(v as string[])} multi searchable={false} allLabel="Any" width="w-64" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Product, brand or appraisal…" aria-label="Filter verdicts" className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 w-64" />
          {(bodies.length || verdicts.length || q) ? <button type="button" onClick={() => { setBodies([]); setVerdicts([]); setQ(""); }} className="text-sm underline text-muted">Clear</button> : null}
        </>} />
      <ResultsTable columns={columns} rows={filtered} rowKey={(r) => r.id} sort={sort} onSort={(k) => setSort((s) => (s.key === k ? { key: k, dir: s.dir === 1 ? -1 : 1 } : { key: k, dir: k === "date" ? -1 : 1 }))} />
    </div>
  );
}

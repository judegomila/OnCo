"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Tip } from "@/components/Tip";
import { STATUS_LABEL, STATUS_TIPS, statusClass } from "@/lib/text";
import { FacetSelect } from "./filters/FacetSelect";
import { ResultsTable, Toolbar, type Column, type SortState } from "./filters/ResultsTable";

/**
 * One templated, full-width, sortable and filterable table for any kind of entity.
 * The server page turns entities into BrowserRow[] with facet values and extra columns;
 * this component owns the single control row at the top and the table below.
 */
export type BrowserRow = {
  id: string; name: string; tldr: string; route: string; status?: string;
  /** Facet values keyed by facet key; arrays for multi-valued facets. */
  facets: Record<string, string[]>;
  /** Extra columns keyed by column key: formatted strings, numbers, or lists of links. */
  cols: Record<string, string | number | undefined | LinkList | RichText>;
  /** Optional numeric sort keys for extra columns. */
  sortKeys?: Record<string, number>;
  sub?: string;
  logo?: string;
};

/** A list of linked objects; `tip` is the object's one-line explanation, shown on hover. */
export type LinkList = Array<{ label: string; href: string; tip?: string }>;
/** Free text with glossary marks: each mark is a span with a one-line explanation and a link to the term page. */
export type RichText = { text: string; marks: Array<{ s: number; e: number; label: string; tip: string; href: string }> };
const isRich = (v: unknown): v is RichText => !!v && typeof v === "object" && !Array.isArray(v) && "text" in (v as object);
const cellText = (v: unknown): string => (Array.isArray(v) ? (v as LinkList).map((l) => l.label).join(", ") : isRich(v) ? v.text : String(v ?? ""));
export type FacetDef = { key: string; label: string; searchable?: boolean; width?: string; order?: string[] };
export type ColDef = { key: string; label: string; sortable?: boolean; hide?: string; className?: string; numeric?: boolean; chip?: boolean; tip?: string; /** Tips for chip/string values keyed by value, e.g. { "Phase 3": "..." }. */ valueTips?: Record<string, string> };

const STATUS_ORDER = ["approved", "standard-of-care", "positive", "phase-3", "established", "completed", "recruiting", "active", "phase-2", "emerging", "phase-1", "preclinical", "concept", "planned", "mixed", "historic", "negative", "withdrawn"];

export function EntityBrowser({ rows, facets, columns, noun, defaultSort, hideStatus = false, hideTldr = false, external = null, onExternalChange }: {
  rows: BrowserRow[]; facets: FacetDef[]; columns: ColDef[]; noun: string; defaultSort?: SortState; hideStatus?: boolean; hideTldr?: boolean;
  /** Facet values set by a parent (e.g. a map legend); merged with the internal selection for that key and shown as selected. */
  external?: { key: string; values: string[] } | null;
  /** Called when the user changes the externally controlled facet from inside the table (or clears all filters). */
  onExternalChange?: (values: string[]) => void;
}) {
  const [q, setQ] = useState("");
  const [own, setOwn] = useState<Record<string, string[]>>({});
  /** Effective selection: the internal choice plus whatever the parent set on the controlled key. */
  const sel = useMemo(() => {
    if (!external?.values.length) return own;
    return { ...own, [external.key]: [...new Set([...(own[external.key] ?? []), ...external.values])] };
  }, [own, external]);
  const setFacet = (key: string, vals: string[]) => {
    if (external && key === external.key) {
      if (onExternalChange) { onExternalChange(vals); setOwn((s) => ({ ...s, [key]: [] })); return; }
      setOwn((s) => ({ ...s, [key]: vals.filter((v) => !external.values.includes(v)) }));
      return;
    }
    setOwn((s) => ({ ...s, [key]: vals }));
  };
  const clearAll = () => { setOwn({}); setQ(""); onExternalChange?.([]); };
  const [sort, setSort] = useState<SortState>(defaultSort ?? { key: hideStatus ? "name" : "status", dir: 1 });

  const allFacets = useMemo(() => (hideStatus ? facets : [{ key: "status", label: "Phase / status", searchable: false, width: "w-48", order: STATUS_ORDER }, ...facets]), [facets, hideStatus]);
  const facetVals = (r: BrowserRow, k: string) => (k === "status" ? (r.status ? [r.status] : []) : (r.facets[k] ?? []));

  const matches = (r: BrowserRow, skip?: string) => {
    const needle = q.trim().toLowerCase();
    if (needle && !`${r.name} ${r.tldr} ${r.sub ?? ""} ${Object.values(r.facets).flat().join(" ")} ${Object.values(r.cols).map((v) => cellText(v)).join(" ")}`.toLowerCase().includes(needle)) return false;
    for (const f of allFacets) {
      if (f.key === skip) continue;
      const want = sel[f.key]; if (!want || !want.length) continue;
      if (!want.some((w) => facetVals(r, f.key).includes(w))) return false;
    }
    return true;
  };

  const filtered = useMemo(() => {
    const list = rows.filter((r) => matches(r));
    const statusIdx = (s?: string) => { const i = STATUS_ORDER.indexOf(s ?? ""); return i < 0 ? 99 : i; };
    list.sort((a, b) => {
      let d = 0;
      if (sort.key === "name") d = a.name.localeCompare(b.name);
      else if (sort.key === "status") d = statusIdx(a.status) - statusIdx(b.status);
      else if (a.sortKeys && b.sortKeys && sort.key in a.sortKeys) d = (a.sortKeys[sort.key] ?? 0) - (b.sortKeys[sort.key] ?? 0);
      else d = cellText(a.cols[sort.key]).localeCompare(cellText(b.cols[sort.key]));
      return sort.dir * d || a.name.localeCompare(b.name);
    });
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, q, sel, sort]);

  const options = useMemo(() => {
    const out: Record<string, Array<{ value: string; label: string; count: number }>> = {};
    for (const f of allFacets) {
      const counts = new Map<string, number>();
      for (const r of rows) if (matches(r, f.key)) for (const v of facetVals(r, f.key)) counts.set(v, (counts.get(v) ?? 0) + 1);
      let arr = [...counts.entries()];
      arr = f.order ? arr.sort((a, b) => (f.order!.indexOf(a[0]) + 1 || 999) - (f.order!.indexOf(b[0]) + 1 || 999)) : arr.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
      out[f.key] = arr.map(([v, n]) => ({ value: v, label: f.key === "status" ? STATUS_LABEL[v] ?? v : v, count: n }));
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, q, sel]);

  const onSort = (key: string) => setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: 1 }));
  const active = Object.values(sel).some((a) => a.length) || q;

  const tableCols: Column<BrowserRow>[] = [
    { key: "name", label: "Name", sortable: true, render: (r) => (
      <div className="min-w-[220px] flex items-start gap-2">
        {r.logo && (
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-white overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element -- hotlinked favicon, never copied */}
            <img src={r.logo} alt="" className="h-[70%] w-[70%] object-contain" loading="lazy" referrerPolicy="no-referrer" />
          </span>
        )}
        <div><Link href={r.route} className="font-medium hover:underline">{r.name}</Link>{r.sub && <div className="text-xs text-muted">{r.sub}</div>}{!hideTldr && <div className="text-xs text-muted line-clamp-2 max-w-lg">{r.tldr}</div>}</div>
      </div>) },
    ...(hideStatus ? [] : [{ key: "status", label: "Phase / status", sortable: true, render: (r: BrowserRow) => r.status ? (STATUS_TIPS[r.status] ? <Tip title={STATUS_LABEL[r.status] ?? r.status} text={STATUS_TIPS[r.status]}><span className={`chip cursor-help ${statusClass(r.status)}`}>{STATUS_LABEL[r.status] ?? r.status}</span></Tip> : <span className={`chip ${statusClass(r.status)}`}>{STATUS_LABEL[r.status] ?? r.status}</span>) : null } as Column<BrowserRow>]),
    ...columns.map((c): Column<BrowserRow> => ({
      key: c.key, label: c.label, sortable: c.sortable, hide: c.hide, className: c.className, tip: c.tip,
      render: (r) => {
        const v = r.cols[c.key];
        if (v === undefined || v === "" || (Array.isArray(v) && v.length === 0)) return <span className="text-muted">—</span>;
        if (isRich(v)) {
          const parts: React.ReactNode[] = []; let pos = 0;
          v.marks.forEach((m, i) => { if (m.s > pos) parts.push(v.text.slice(pos, m.s)); parts.push(<Tip key={i} title={m.label} text={m.tip} href={m.href} linkLabel="Glossary page →"><Link href={m.href} className="underline decoration-dotted decoration-foreground/30 underline-offset-[3px] hover:text-foreground">{v.text.slice(m.s, m.e)}</Link></Tip>); pos = m.e; });
          if (pos < v.text.length) parts.push(v.text.slice(pos));
          return <span className="text-muted">{parts}</span>;
        }
        if (Array.isArray(v)) return <span className="text-muted">{v.map((l, i) => <span key={l.href}>{i > 0 && ", "}{l.tip ? <Tip title={l.label} text={l.tip} href={l.href}><Link href={l.href} className="hover:underline hover:text-foreground underline decoration-dotted decoration-foreground/25 underline-offset-[3px]">{l.label}</Link></Tip> : <Link href={l.href} className="hover:underline hover:text-foreground">{l.label}</Link>}</span>)}</span>;
        const vt = c.valueTips?.[String(v)];
        const cell = c.chip ? <span className="chip bg-foreground/5">{v}</span> : <span className={`text-muted ${c.numeric ? "tabular-nums" : ""}`}>{v}</span>;
        return vt ? <Tip title={String(v)} text={vt}><span className="cursor-help">{cell}</span></Tip> : cell;
      },
    })),
  ];

  return (
    <div>
      <Toolbar
        count={filtered.length} total={rows.length} noun={noun}
        left={<>
          {allFacets.map((f) => {
            const opts = options[f.key] ?? [];
            if (!opts.length && !(sel[f.key]?.length)) return null;
            return <FacetSelect key={f.key} label={f.label} options={opts} value={sel[f.key] ?? []} onChange={(v) => setFacet(f.key, v as string[])} multi searchable={f.searchable ?? true} allLabel="Any" width={f.width ?? "w-48"} />;
          })}
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Filter ${noun}…`} aria-label={`Filter ${noun}`} className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 w-56" />
          {active ? <button type="button" onClick={clearAll} className="text-sm underline text-muted">Clear</button> : null}
        </>}
      />
      <ResultsTable columns={tableCols} rows={filtered} rowKey={(r) => r.id} sort={sort} onSort={onSort} />
    </div>
  );
}

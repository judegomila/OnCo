"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Tip } from "@/components/Tip";
import { MoleculeSlot } from "./MoleculeSlot";
import { ApprovalChip } from "./ApprovalChip";
import { STATUS_LABEL, STATUS_TIPS, statusClass } from "@/lib/text";
import { FacetSelect } from "./filters/FacetSelect";
import { ResultsTable, Toolbar, type Column, type SortState } from "./filters/ResultsTable";

/**
 * One templated, full-width, sortable and filterable table for any kind of entity.
 * The server page turns entities into BrowserRow[] with facet values and extra columns;
 * this component owns the single control row at the top and the table below.
 *
 * Filter state lives in the URL (`?group=Solid&type=Cancer+center&q=her2`): facet keys are the query
 * keys, values repeat (or are comma-separated), and `q` is the search box. The URL is read once on
 * mount and rewritten with `history.replaceState` as filters change, so any view is linkable and the
 * page stays a static export (no server search params).
 */
export type BrowserRow = {
  id: string; name: string; tldr: string; route: string; status?: string;
  /** Drug id: renders a small rotating molecule beside the name, or an explained placeholder when there is no structure. */
  molecule?: string;
  modality?: string;
  /** Facet values keyed by facet key; arrays for multi-valued facets. */
  facets: Record<string, string[]>;
  /** Extra columns keyed by column key: formatted strings, numbers, lists of links, glossary-marked text, or facet chips. */
  cols: Record<string, CellValue>;
  /** Optional numeric sort keys for extra columns. */
  sortKeys?: Record<string, number>;
  sub?: string;
  logo?: string;
};

/** A linked object; `tip` is the object's one-line explanation, shown on hover. */
export type LinkItem = { label: string; href: string; tip?: string };
/** A list of linked objects. */
export type LinkList = LinkItem[];
/**
 * A clickable chip that sets a facet in the same table (and so in the URL): `facet` is the facet key,
 * `value` the exact facet value, `label` what to print (defaults to the value), `tip` extra hover text.
 */
export type FacetLink = { facet: string; value: string; label?: string; tip?: string };
/** Free text with glossary marks: each mark is a span with a one-line explanation and a link to the term page. */
export type RichText = { text: string; marks: Array<{ s: number; e: number; label: string; tip: string; href: string }> };
/** Anything a table cell can hold. Lists may mix entity links and facet chips (e.g. a trial's sponsors). */
export type CellValue = string | number | undefined | RichText | FacetLink | Array<LinkItem | FacetLink>;

const isRich = (v: unknown): v is RichText => !!v && typeof v === "object" && !Array.isArray(v) && "text" in (v as object);
const isFacetLink = (v: unknown): v is FacetLink => !!v && typeof v === "object" && !Array.isArray(v) && "facet" in (v as object);
const itemLabel = (i: LinkItem | FacetLink): string => ("href" in i ? i.label : (i.label ?? i.value));
/** The plain text of a cell: what search matches against and what text sorting compares. */
export const cellText = (v: CellValue): string => (Array.isArray(v) ? v.map(itemLabel).join(", ") : isRich(v) ? v.text : isFacetLink(v) ? itemLabel(v) : String(v ?? ""));

export type FacetDef = { key: string; label: string; searchable?: boolean; width?: string; order?: string[] };
export type ColDef = { key: string; label: string; sortable?: boolean; hide?: string; className?: string; numeric?: boolean; chip?: boolean; tip?: string; /** Tips for chip/string values keyed by value, e.g. { "Phase 3": "..." }. */ valueTips?: Record<string, string> };

const STATUS_ORDER = ["approved", "standard-of-care", "positive", "phase-3", "established", "completed", "recruiting", "active", "phase-2", "emerging", "phase-1", "preclinical", "concept", "planned", "mixed", "historic", "negative", "withdrawn"];
const STATUS_FACET: FacetDef = { key: "status", label: "Phase / status", searchable: false, width: "w-48", order: STATUS_ORDER };
const QUERY_KEY = "q";

export function EntityBrowser({ rows, facets, columns, noun, defaultSort, hideStatus = false, hideTldr = false, external = null, onExternalChange }: {
  rows: BrowserRow[]; facets: FacetDef[]; columns: ColDef[]; noun: string; defaultSort?: SortState; hideStatus?: boolean; hideTldr?: boolean;
  /** Facet values set by a parent (e.g. a map legend); merged with the internal selection for that key and shown as selected. */
  external?: { key: string; values: string[] } | null;
  /** Called when the user changes the externally controlled facet from inside the table (or clears all filters). */
  onExternalChange?: (values: string[]) => void;
}) {
  const [q, setQ] = useState("");
  const [own, setOwn] = useState<Record<string, string[]>>({});
  /** True once the URL has been read, so the write-back effect never clobbers a shared link with the empty initial state. */
  const [synced, setSynced] = useState(false);
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
  /** A facet chip: select exactly that value, or clear it when it is already selected. */
  const clickFacet = (f: FacetLink) => {
    const cur = sel[f.facet] ?? [];
    setFacet(f.facet, cur.includes(f.value) ? cur.filter((v) => v !== f.value) : [f.value]);
  };
  const clearAll = () => { setOwn({}); setQ(""); onExternalChange?.([]); };
  const [sort, setSort] = useState<SortState>(defaultSort ?? { key: hideStatus ? "name" : "status", dir: 1 });

  const allFacets = useMemo(() => (hideStatus ? facets : [STATUS_FACET, ...facets]), [facets, hideStatus]);
  const facetVals = (r: BrowserRow, k: string) => (k === "status" ? (r.status ? [r.status] : []) : (r.facets[k] ?? []));
  const facetLabel = (key: string) => allFacets.find((f) => f.key === key)?.label ?? key;

  // Read the URL once on mount (deferred a frame, as the other URL-backed views do, so the effect sets no state
  // synchronously). Values repeat (`?cancers=A&cancers=B`) or are comma-separated; a raw value that is itself a
  // known facet value is kept whole so values containing commas survive.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const next: Record<string, string[]> = {};
      let ext: string[] = [];
      for (const f of allFacets) {
        const raw = params.getAll(f.key);
        if (!raw.length) continue;
        const known = new Set(rows.flatMap((r) => facetVals(r, f.key)));
        const vals = [...new Set(raw.flatMap((s) => (known.has(s) ? [s] : s.split(",").map((x) => x.trim()).filter(Boolean))))];
        if (!vals.length) continue;
        if (external && f.key === external.key && onExternalChange) ext = vals; else next[f.key] = vals;
      }
      if (Object.keys(next).length) setOwn(next);
      if (ext.length) onExternalChange?.(ext);
      const q0 = params.get(QUERY_KEY);
      if (q0) setQ(q0);
      setSynced(true);
    });
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount only: the URL seeds state, then state owns the URL
  }, []);

  // Write the selection and search back to the URL, leaving unrelated query keys and the hash alone.
  useEffect(() => {
    if (!synced) return;
    const url = new URL(window.location.href);
    for (const f of allFacets) url.searchParams.delete(f.key);
    url.searchParams.delete(QUERY_KEY);
    for (const f of allFacets) for (const v of sel[f.key] ?? []) url.searchParams.append(f.key, v);
    if (q.trim()) url.searchParams.set(QUERY_KEY, q.trim());
    const next = url.pathname + url.search + url.hash;
    if (next !== window.location.pathname + window.location.search + window.location.hash) window.history.replaceState(window.history.state, "", next);
  }, [synced, sel, q, allFacets]);

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

  /** Options per facet, counted over rows that pass every other filter (so counts answer "what happens if I pick this?"). */
  const options = useMemo(() => {
    const out: Record<string, { value: string; label: string; count: number }[]> = {};
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

  /** A facet chip: a button that filters the table by that value, with a tooltip saying so. */
  const facetChip = (f: FacetLink, extraTip?: string, className?: string) => {
    const label = itemLabel(f);
    const fl = facetLabel(f.facet);
    const on = (sel[f.facet] ?? []).includes(f.value);
    const action = on ? `Filtering by ${fl}: ${label}. Click to clear.` : `Filter by ${fl}: ${label}`;
    const tip = [f.tip, extraTip, action].filter(Boolean).join(" ");
    const look = className ? `${className} ${on ? "ring-2 ring-accent/50" : ""}` : on ? "bg-accent-soft text-accent border-accent" : "bg-foreground/5 hover:bg-accent-soft hover:text-accent";
    return (
      <Tip title={label} text={tip}>
        <button type="button" onClick={() => clickFacet(f)} aria-label={`Filter by ${fl}: ${label}`} aria-pressed={on}
          className={`chip cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${look}`}>
          {label}
        </button>
      </Tip>
    );
  };
  const entityLink = (l: LinkItem) => (l.tip
    ? <Tip title={l.label} text={l.tip} href={l.href}><Link href={l.href} className="hover:underline hover:text-foreground underline decoration-dotted decoration-foreground/25 underline-offset-[3px]">{l.label}</Link></Tip>
    : <Link href={l.href} className="hover:underline hover:text-foreground">{l.label}</Link>);

  const tableCols: Column<BrowserRow>[] = [
    { key: "name", label: "Name", sortable: true, render: (r) => (
      <div className="min-w-[220px] flex items-start gap-2">
        {r.molecule && <MoleculeSlot drugId={r.molecule} modality={r.modality} name={r.name} className="h-10 w-10" />}
        {r.logo && !r.molecule && (
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-white overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element -- hotlinked favicon, never copied */}
            <img src={r.logo} alt="" className="h-[70%] w-[70%] object-contain" loading="lazy" referrerPolicy="no-referrer" />
          </span>
        )}
        <div><Link href={r.route} className="font-medium hover:underline">{r.name}</Link>{r.sub && <div className="text-xs text-muted">{r.sub}</div>}{!hideTldr && <div className="text-xs text-muted line-clamp-2 max-w-lg">{r.tldr}</div>}</div>
      </div>) },
    ...(hideStatus ? [] : [{ key: "status", label: "Phase / status", sortable: true, render: (r: BrowserRow) => r.molecule
      ? <ApprovalChip drugId={r.molecule} status={r.status} />
      : r.status ? facetChip({ facet: "status", value: r.status, label: STATUS_LABEL[r.status] ?? r.status }, STATUS_TIPS[r.status], statusClass(r.status)) : null } as Column<BrowserRow>]),
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
        if (isFacetLink(v)) return facetChip(v, c.valueTips?.[itemLabel(v)]);
        if (Array.isArray(v)) {
          const allChips = v.every((i) => !("href" in i));
          return <span className={allChips ? "inline-flex flex-wrap gap-1" : "text-muted"}>{v.map((l, i) => "href" in l
            ? <span key={`l:${l.href}`}>{i > 0 && ", "}{entityLink(l)}</span>
            : <span key={`f:${l.facet}:${l.value}`}>{i > 0 && !allChips && ", "}{facetChip(l, c.valueTips?.[itemLabel(l)])}</span>)}</span>;
        }
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

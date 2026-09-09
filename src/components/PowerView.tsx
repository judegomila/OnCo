"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { KIND_META, type Kind } from "@/lib/schema";
import { scoreRow, WEIGHTS, type PowerRow, type Signals } from "@/lib/relevance";
import { MoleculeThumb } from "./MoleculeThumb";
import { STRUCTURES } from "@/lib/structures";
import { STATUS_LABEL, statusClass } from "@/lib/text";
import { FacetSelect } from "./filters/FacetSelect";
import { ResultsTable, Toolbar, type Column, type SortState } from "./filters/ResultsTable";

export type PowerCancer = { id: string; name: string; group: string; route: string };
const KINDS_ORDER: Kind[] = ["drug", "technology", "target", "trial", "pairing", "idea", "company", "institution", "pathway", "term", "roadmap", "collection"];

function scoreParts(sig: Signals | undefined): Array<[string, number]> {
  if (!sig) return [];
  return (Object.keys(WEIGHTS) as Array<keyof typeof WEIGHTS>).filter((k) => sig[k]).map((k) => [k, WEIGHTS[k]]);
}

export function PowerView({ rows, cancers, initialCancer, initialKind }: { rows: PowerRow[]; cancers: PowerCancer[]; initialCancer?: string; initialKind?: Kind }) {
  const [cancer, setCancer] = useState<string | null>(initialCancer ?? null);
  const [kind, setKind] = useState<Kind>(initialKind ?? "drug");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string[]>([]);
  const [sort, setSort] = useState<SortState>({ key: "score", dir: -1 });

  useEffect(() => {
    // Read shareable state from the URL after hydration (deferred to avoid a synchronous setState in the effect).
    const id = requestAnimationFrame(() => {
      const p = new URLSearchParams(window.location.search);
      const c = p.get("cancer"), k = p.get("kind") as Kind | null;
      if (c && cancers.some((x) => x.id === c)) setCancer(c);
      if (k && KINDS_ORDER.includes(k)) setKind(k);
    });
    return () => cancelAnimationFrame(id);
  }, [cancers]);
  useEffect(() => {
    const p = new URLSearchParams();
    if (cancer) p.set("cancer", cancer);
    if (kind !== "drug") p.set("kind", kind);
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [cancer, kind]);

  const cancerOptions = useMemo(() => cancers.map((c) => ({ value: c.id, label: c.name, group: c.group })), [cancers]);
  const cancerName = cancers.find((c) => c.id === cancer)?.name;

  const kindCounts = useMemo(() => {
    const m: Partial<Record<Kind, number>> = {};
    for (const r of rows) if (!cancer || r.rel[cancer]) m[r.kind] = (m[r.kind] ?? 0) + 1;
    return m;
  }, [rows, cancer]);
  const kindOptions = KINDS_ORDER.filter((k) => kindCounts[k]).map((k) => ({ value: k, label: KIND_META[k].plural[0].toUpperCase() + KIND_META[k].plural.slice(1), count: kindCounts[k] }));

  const statusOptions = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of rows) if (r.kind === kind && (!cancer || r.rel[cancer]) && r.status) m.set(r.status, (m.get(r.status) ?? 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([s, n]) => ({ value: s, label: STATUS_LABEL[s] ?? s, count: n }));
  }, [rows, kind, cancer]);

  const scored = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = rows
      .filter((r) => r.kind === kind)
      .map((r) => ({ r, score: scoreRow(r, cancer) }))
      .filter(({ r, score }) => score >= 0 && (!status.length || status.includes(r.status ?? "")) && (!needle || `${r.name} ${r.tldr} ${r.meta} ${r.tags.join(" ")}`.toLowerCase().includes(needle)));
    const val = (x: { r: PowerRow; score: number }) => sort.key === "score" ? x.score : sort.key === "evidence" ? x.r.evidence : sort.key === "degree" ? x.r.degree : sort.key === "year" ? (x.r.year ?? 0) : 0;
    list.sort((a, b) => sort.key === "name" ? sort.dir * a.r.name.localeCompare(b.r.name) : sort.dir * (val(a) - val(b)) || a.r.name.localeCompare(b.r.name));
    return list;
  }, [rows, kind, cancer, q, status, sort]);

  const onSort = (key: string) => setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: key === "name" ? 1 : -1 }));

  type Row = { r: PowerRow; score: number };
  const columns: Column<Row>[] = [
    { key: "rank", label: "#", render: (_, i) => <span className="tabular-nums text-muted">{i + 1}</span>, className: "w-10" },
    { key: "name", label: "Name", sortable: true, render: ({ r }) => (
      <div className="min-w-[240px] flex items-start gap-2">{r.kind === "drug" && STRUCTURES[r.id] && <Link href={r.route} aria-hidden tabIndex={-1} className="shrink-0 rounded-md border border-border bg-card"><MoleculeThumb drugId={r.id} className="h-10 w-10" /></Link>}<div><Link href={r.route} className="font-medium hover:underline">{r.name}</Link><div className="text-xs text-muted line-clamp-2 max-w-xl">{r.meta && <span className="text-foreground/70">{r.meta} · </span>}{r.tldr}</div></div></div>) },
    { key: "evidence", label: "Phase / status", sortable: true, render: ({ r }) => r.status ? <span className={`chip ${statusClass(r.status)}`}>{STATUS_LABEL[r.status] ?? r.status}</span> : null },
    { key: "why", label: "Why it ranks", hide: "hidden md:table-cell", render: ({ r }) => (
      <div className="flex flex-wrap gap-1">
        {cancer ? scoreParts(r.rel[cancer]).map(([k, w]) => <span key={k} className="chip bg-foreground/5 text-[10px]">{k === "soc" ? "standard of care" : k} +{w}</span>) : <span className="text-xs text-muted">evidence + links</span>}
      </div>) },
    { key: "degree", label: "Links", sortable: true, hide: "hidden sm:table-cell", render: ({ r }) => <span className="tabular-nums text-muted">{r.degree}</span> },
    { key: "year", label: "Year", sortable: true, hide: "hidden sm:table-cell", render: ({ r }) => <span className="tabular-nums text-muted">{r.year ?? "—"}</span> },
    { key: "score", label: "Score", sortable: true, render: ({ score }) => <span className="tabular-nums font-semibold">{score}</span> },
  ];

  return (
    <div>
      <Toolbar
        count={scored.length}
        noun={`${KIND_META[kind].plural}${cancerName ? ` for ${cancerName.replace(/ \(.*\)$/, "")}` : ""}`}
        left={<>
          <FacetSelect label="Cancer" options={cancerOptions} value={cancer} onChange={(v) => setCancer(v as string | null)} allLabel="All cancers" width="w-72" />
          <FacetSelect label="Kind" options={kindOptions} value={kind} onChange={(v) => { if (v) setKind(v as Kind); }} searchable={false} allLabel="Products" width="w-44" highlight={false} />
          <FacetSelect label="Phase / status" options={statusOptions} value={status} onChange={(v) => setStatus(v as string[])} multi searchable={false} allLabel="Any" width="w-48" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Filter ${KIND_META[kind].plural}…`} aria-label="Filter" className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 w-56" />
          {(cancer || status.length || q) ? <button type="button" onClick={() => { setCancer(null); setStatus([]); setQ(""); }} className="text-sm underline text-muted">Clear</button> : null}
        </>}
        right={cancer ? <Link href={cancers.find((c) => c.id === cancer)!.route} className="underline">cancer page →</Link> : undefined}
      />
      <ResultsTable columns={columns} rows={scored} rowKey={(x) => x.r.id} sort={sort} onSort={onSort} empty="Nothing matches. Choose another kind or clear filters." />
      <details className="mt-3 text-xs text-muted">
        <summary className="cursor-pointer">How the rank is computed</summary>
        <p className="mt-1 max-w-3xl">For a chosen cancer: standard-of-care mention +{WEIGHTS.soc}, in its pipeline +{WEIGHTS.pipeline}, in its history +{WEIGHTS.history}, directly linked +{WEIGHTS.direct}, linked through one of its drugs +{WEIGHTS.indirect}. Always: evidence tier (approved 10 … concept 0) plus half a point per connection in the graph, capped at 10. It ranks documentation and evidence, not clinical benefit.</p>
      </details>
    </div>
  );
}

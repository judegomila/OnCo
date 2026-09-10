"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FacetSelect } from "./filters/FacetSelect";
import { ResultsTable, Toolbar, type Column, type SortState } from "./filters/ResultsTable";
import type { SponsorRow } from "@/lib/sponsors";
import type { SponsorKind } from "@/data/sponsor-aliases";
import { KIND_COLOR } from "@/lib/text";

const KIND_LABEL: Record<SponsorKind, string> = { company: "Company", institution: "Institution", "cooperative-group": "Cooperative group", government: "Government or charity", other: "Unmapped" };
const KIND_CHIP: Record<SponsorKind, string> = { company: KIND_COLOR.company, institution: KIND_COLOR.institution, "cooperative-group": KIND_COLOR.collection, government: KIND_COLOR.section, other: KIND_COLOR.term };

export function SponsorBoard({ rows, cancers }: { rows: SponsorRow[]; cancers: Array<{ id: string; name: string }> }) {
  const [cancer, setCancer] = useState<string | null>(null);
  const [kinds, setKinds] = useState<string[]>([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortState>({ key: "total", dir: -1 });
  const cancerName = useMemo(() => new Map(cancers.map((c) => [c.id, c.name])), [cancers]);

  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    const list = rows.filter((r) => (!kinds.length || kinds.includes(r.kind)) && (!cancer || (r.cancers[cancer] ?? 0) > 0) && (!n || r.label.toLowerCase().includes(n)));
    const inCancer = (r: SponsorRow) => (cancer ? r.cancers[cancer] ?? 0 : r.registryTotal + r.corpusTrials.length);
    const num = (r: SponsorRow) => sort.key === "total" ? inCancer(r) : sort.key === "corpus" ? r.corpusTrials.length : sort.key === "registry" ? r.registryTotal : sort.key === "p3" ? r.registryPhase3 + r.corpusTrials.filter((t) => t.phase === "3").length : sort.key === "p2" ? r.registryPhase2 : sort.key === "rec" ? r.registryRecruiting : 0;
    list.sort((a, b) => (sort.key === "name" ? sort.dir * a.label.localeCompare(b.label) : sort.dir * (num(a) - num(b)) || b.registryTotal - a.registryTotal));
    return list;
  }, [rows, kinds, cancer, q, sort]);

  const cancerOptions = useMemo(() => { const m = new Map<string, number>(); for (const r of rows) for (const [c, n] of Object.entries(r.cancers)) m.set(c, (m.get(c) ?? 0) + n); return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([value, count]) => ({ value, label: cancerName.get(value) ?? value, count })); }, [rows, cancerName]);
  const kindOptions = (Object.keys(KIND_LABEL) as SponsorKind[]).map((k) => ({ value: k, label: KIND_LABEL[k], count: rows.filter((r) => r.kind === k).length })).filter((o) => o.count);

  const columns: Column<SponsorRow>[] = [
    { key: "rank", label: "#", render: (_r, i) => <span className="tabular-nums text-muted">{i + 1}</span>, className: "w-10" },
    { key: "name", label: "Sponsor", sortable: true, render: (r) => <div>{r.route ? <Link href={r.route} className="font-medium hover:underline">{r.label}</Link> : <span className="font-medium">{r.label}</span>}<div className="mt-0.5"><span className={`chip border ${KIND_CHIP[r.kind]}`}>{KIND_LABEL[r.kind]}</span></div></div> },
    { key: "total", label: cancer ? `Studies in ${cancerName.get(cancer) ?? cancer}` : "All studies", sortable: true, tip: cancer ? "Registry studies plus corpus trials whose conditions or cancer links name this cancer." : "Registry studies (de-duplicated by NCT id) plus curated corpus trials.", render: (r) => <span className="font-semibold tabular-nums">{cancer ? r.cancers[cancer] ?? 0 : r.registryTotal + r.corpusTrials.length}</span> },
    { key: "corpus", label: "Landmark trials", sortable: true, tip: "Curated trials in the OnCo corpus that name this sponsor.", render: (r) => r.corpusTrials.length ? <div><span className="tabular-nums">{r.corpusTrials.length}</span><div className="flex flex-wrap gap-1 mt-1">{r.corpusTrials.slice(0, 3).map((t) => <Link key={t.id} href={t.route} className={`chip border ${KIND_COLOR.trial}`}>{t.name}</Link>)}{r.corpusTrials.length > 3 && <span className="text-xs text-muted">+{r.corpusTrials.length - 3}</span>}</div></div> : <span className="text-muted">0</span> },
    { key: "registry", label: "Registry studies", sortable: true, tip: "Phase 2 and 3 studies on ClinicalTrials.gov, found under products in the corpus, where this is the lead sponsor.", render: (r) => <span className="tabular-nums">{r.registryTotal}</span> },
    { key: "p3", label: "Phase 3", sortable: true, hide: "hidden md:table-cell", render: (r) => <span className="tabular-nums">{r.registryPhase3 + r.corpusTrials.filter((t) => t.phase === "3").length}</span> },
    { key: "p2", label: "Phase 2", sortable: true, hide: "hidden md:table-cell", render: (r) => <span className="tabular-nums">{r.registryPhase2}</span> },
    { key: "rec", label: "Recruiting", sortable: true, hide: "hidden lg:table-cell", render: (r) => <span className="tabular-nums">{r.registryRecruiting}</span> },
    { key: "cancers", label: "Top cancers", hide: "hidden lg:table-cell", render: (r) => <div className="flex flex-wrap gap-1">{Object.entries(r.cancers).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([c, n]) => <button key={c} type="button" onClick={() => setCancer(c)} className={`chip border ${KIND_COLOR.cancer}`}>{cancerName.get(c) ?? c} {n}</button>)}</div> },
  ];

  return (
    <div>
      <Toolbar count={filtered.length} total={rows.length} noun="sponsors"
        left={<>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search sponsor" className="w-48 rounded-lg border border-border bg-card px-3 py-1.5 text-sm" aria-label="Search sponsors" />
          <FacetSelect label="Cancer" options={cancerOptions} value={cancer} onChange={(v) => setCancer(v as string | null)} allLabel="Any" width="w-60" />
          <FacetSelect label="Type" options={kindOptions} value={kinds} onChange={(v) => setKinds(v as string[])} multi searchable={false} allLabel="Any" width="w-52" />
          {(cancer || kinds.length || q) ? <button type="button" onClick={() => { setCancer(null); setKinds([]); setQ(""); }} className="text-sm underline text-muted">Reset</button> : null}
        </>} />
      <ResultsTable columns={columns} rows={filtered} rowKey={(r) => r.key} sort={sort} onSort={(k) => setSort((s) => (s.key === k ? { key: k, dir: s.dir === 1 ? -1 : 1 } : { key: k, dir: k === "name" ? 1 : -1 }))} />
    </div>
  );
}

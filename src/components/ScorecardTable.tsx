"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FacetSelect } from "./filters/FacetSelect";
import { ResultsTable, Toolbar, type Column, type SortState } from "./filters/ResultsTable";
import { Tip } from "./Tip";

export type ScorecardFinancials = {
  fiscalYear: string; currency: string; symbol: string;
  oncologyRevenue?: number; totalRevenue?: number; rdSpend?: number; cash?: number;
  top: Array<{ name: string; sales: number; route?: string; note?: string }>;
  sourceLabel: string; sourceUrl: string; note?: string;
};

export type ScorecardRow = {
  id: string; name: string; route: string; country: string; companyType: string; ticker?: string;
  rank: number; score: number;
  approved: number; phase3: number; early: number; targets: number; modalities: number; regions: string[]; recentEvents: number; registryTrials: number; failures: number;
  points: { approved: number; phase3: number; early: number; targets: number; modalities: number; regions: number; momentum: number; trials: number; failures: number };
  financials?: ScorecardFinancials;
};

const TYPE_LABEL: Record<string, string> = { pharma: "Pharma", biotech: "Biotech", diagnostics: "Diagnostics", imaging: "Imaging", devices: "Devices", "ai-software": "AI and software", radiopharma: "Radiopharma", "cell-therapy": "Cell therapy", "cro-services": "CRO and services", nonprofit: "Non-profit" };

const bn = (f: ScorecardFinancials, n?: number) => (n === undefined ? null : `${f.symbol}${n.toFixed(1)}bn`);

function breakdown(r: ScorecardRow): string {
  const parts: Array<[string, number]> = [["approved", r.points.approved], ["phase 3", r.points.phase3], ["early", r.points.early], ["targets", r.points.targets], ["modalities", r.points.modalities], ["regions", r.points.regions], ["momentum", r.points.momentum], ["trials", r.points.trials], ["failures", r.points.failures]];
  return parts.filter(([, v]) => v !== 0).map(([k, v]) => `${k} ${v > 0 ? "+" : ""}${v}`).join(", ") || "no products linked";
}

function Financials({ f }: { f: ScorecardFinancials }) {
  return (
    <div className="text-xs leading-snug min-w-[190px]">
      {f.oncologyRevenue !== undefined && <div><span className="font-medium">{bn(f, f.oncologyRevenue)}</span> oncology revenue</div>}
      {f.top.slice(0, 2).map((p) => <div key={p.name}>{p.route ? <Link href={p.route} className="hover:underline">{p.name}</Link> : p.name} {bn(f, p.sales)}</div>)}
      {f.rdSpend !== undefined && <div className="text-muted">R&amp;D {bn(f, f.rdSpend)}{f.cash !== undefined ? ` · cash ${bn(f, f.cash)}` : ""}</div>}
      <a href={f.sourceUrl} rel="noopener" className="underline text-muted">{f.fiscalYear} filing</a>
    </div>
  );
}

export function ScorecardTable({ rows }: { rows: ScorecardRow[] }) {
  const [types, setTypes] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [onlyProducts, setOnlyProducts] = useState(true);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortState>({ key: "score", dir: -1 });

  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    const list = rows.filter((r) => (!types.length || types.includes(r.companyType)) && (!countries.length || countries.includes(r.country)) && (!onlyProducts || r.approved + r.phase3 + r.early + r.failures > 0) && (!n || r.name.toLowerCase().includes(n) || r.ticker?.toLowerCase().includes(n)));
    const num = (r: ScorecardRow): number => {
      switch (sort.key) {
        case "score": return r.score; case "approved": return r.approved; case "phase3": return r.phase3; case "early": return r.early; case "targets": return r.targets; case "modalities": return r.modalities; case "regions": return r.regions.length; case "events": return r.recentEvents; case "trials": return r.registryTrials; case "failures": return r.failures;
        case "onc": return r.financials?.oncologyRevenue ?? r.financials?.top[0]?.sales ?? -1; case "rd": return r.financials?.rdSpend ?? -1; default: return 0;
      }
    };
    list.sort((a, b) => sort.key === "name" ? sort.dir * a.name.localeCompare(b.name) : sort.dir * (num(a) - num(b)) || a.rank - b.rank);
    return list;
  }, [rows, types, countries, onlyProducts, q, sort]);

  const opt = (f: (r: ScorecardRow) => string, labelOf: (v: string) => string) => { const m = new Map<string, number>(); for (const r of rows) m.set(f(r), (m.get(f(r)) ?? 0) + 1); return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([value, count]) => ({ value, label: labelOf(value), count })); };

  const columns: Column<ScorecardRow>[] = [
    { key: "rank", label: "#", render: (r) => <span className="tabular-nums text-muted">{r.rank}</span>, className: "w-10" },
    { key: "name", label: "Company", sortable: true, render: (r) => <div><Link href={r.route} className="font-medium hover:underline">{r.name}</Link><div className="text-xs text-muted">{TYPE_LABEL[r.companyType] ?? r.companyType} · {r.country}{r.ticker ? ` · ${r.ticker}` : ""}</div></div> },
    { key: "score", label: "Score", sortable: true, tip: "Sum of the disclosed components: approved products, phase 3 assets, earlier assets, distinct targets and modality classes, regions approved, regulatory events in 24 months, registry trials, minus failures. Hover a score for the breakdown.", render: (r) => <Tip title={`${r.name}: ${r.score}`} text={breakdown(r)}><span className="font-semibold tabular-nums cursor-help underline decoration-dotted decoration-foreground/30 underline-offset-[3px]">{r.score}</span></Tip> },
    { key: "approved", label: "Approved", sortable: true, tip: "Products linked to the company with status approved or standard of care (6 points each).", render: (r) => <span className="tabular-nums">{r.approved || <span className="text-muted">0</span>}</span> },
    { key: "phase3", label: "Phase 3", sortable: true, tip: "Products in phase 3 (3 points each).", render: (r) => <span className="tabular-nums">{r.phase3 || <span className="text-muted">0</span>}</span> },
    { key: "early", label: "Ph 1/2", sortable: true, tip: "Products in phase 1 or 2 (1 point each).", hide: "hidden md:table-cell", render: (r) => <span className="tabular-nums">{r.early || <span className="text-muted">0</span>}</span> },
    { key: "targets", label: "Targets", sortable: true, tip: "Distinct targets across the company's products (2 points each, capped at 20).", hide: "hidden lg:table-cell", render: (r) => <span className="tabular-nums">{r.targets}</span> },
    { key: "modalities", label: "Modalities", sortable: true, tip: "Distinct modality classes: ADC, antibody, small molecule, cell therapy, radiopharmaceutical and so on (2 points each).", hide: "hidden lg:table-cell", render: (r) => <span className="tabular-nums">{r.modalities}</span> },
    { key: "regions", label: "Regions", sortable: true, tip: "Regions with at least one approved product (1 point each).", hide: "hidden xl:table-cell", render: (r) => <span className="text-xs">{r.regions.join(" ") || <span className="text-muted">none</span>}</span> },
    { key: "events", label: "24m events", sortable: true, tip: "Dated regulatory events (designations, filings, approvals, CRLs, label changes) across its products in the last 24 months (2 points each, capped at 20).", hide: "hidden xl:table-cell", render: (r) => <span className="tabular-nums">{r.recentEvents}</span> },
    { key: "trials", label: "Registry trials", sortable: true, tip: "Phase 2 and 3 studies on ClinicalTrials.gov for its products, summed (round(2 x sqrt(n)) points, capped at 30).", hide: "hidden md:table-cell", render: (r) => <span className="tabular-nums">{r.registryTrials.toLocaleString("en-GB")}</span> },
    { key: "failures", label: "Failures", sortable: true, tip: "Products recorded as negative or withdrawn (minus 3 each).", hide: "hidden lg:table-cell", render: (r) => <span className={`tabular-nums ${r.failures ? "text-rose-700 dark:text-rose-300" : "text-muted"}`}>{r.failures}</span> },
    { key: "onc", label: "Financials", sortable: true, tip: "Oncology revenue where the company reports one, otherwise its largest oncology product, with R&D spend; from the annual report or 10-K for the fiscal year shown.", render: (r) => r.financials ? <Financials f={r.financials} /> : <span className="text-xs text-muted">not recorded</span> },
  ];

  return (
    <div>
      <Toolbar count={filtered.length} total={rows.length} noun="companies"
        left={<>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search company or ticker" className="w-52 rounded-lg border border-border bg-card px-3 py-1.5 text-sm" aria-label="Search companies" />
          <FacetSelect label="Type" options={opt((r) => r.companyType, (v) => TYPE_LABEL[v] ?? v)} value={types} onChange={(v) => setTypes(v as string[])} multi searchable={false} allLabel="Any" width="w-48" />
          <FacetSelect label="Country" options={opt((r) => r.country, (v) => v)} value={countries} onChange={(v) => setCountries(v as string[])} multi allLabel="Any" width="w-40" />
          <label className="text-sm flex items-center gap-1.5 text-muted"><input type="checkbox" checked={onlyProducts} onChange={(e) => setOnlyProducts(e.target.checked)} /> with products only</label>
        </>} />
      <ResultsTable columns={columns} rows={filtered} rowKey={(r) => r.id} sort={sort} onSort={(k) => setSort((s) => (s.key === k ? { key: k, dir: s.dir === 1 ? -1 : 1 } : { key: k, dir: k === "name" ? 1 : -1 }))} scroll />
      <details className="mt-4 text-sm text-muted">
        <summary className="cursor-pointer">Score breakdown for the rows shown</summary>
        <ul className="mt-2 space-y-1 text-xs">{filtered.slice(0, 60).map((r) => <li key={r.id}><span className="font-medium text-foreground">{r.name}</span> {r.score}: {breakdown(r)}</li>)}</ul>
      </details>
    </div>
  );
}

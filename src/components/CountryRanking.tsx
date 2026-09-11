"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FacetSelect } from "./filters/FacetSelect";
import { ResultsTable, Toolbar, type Column, type SortState } from "./filters/ResultsTable";

export type CountryRow = {
  code: string; name: string;
  works: Record<string, number>; total: number; citedHigh: number; oa: number; trials?: number;
  population?: number; incidence?: number; mortality?: number; funder?: string; budget?: string; budgetSource?: string; programmes?: string[]; gcoUrl?: string;
  institutions: number;
};

/**
 * Composite "research intensity" score (0-100), disclosed:
 *   40% works 2025 (log-scaled against the leader)
 *   20% highly-cited share (works > 50 citations / total, 2021-25), scaled to the best
 *   15% five-year growth (2025 vs 2021, capped at +150%)
 *   15% registered trials with a site in the country (log-scaled against the leader)
 *   10% open-access share
 * Per-capita mode swaps the works and trials terms for per-million-population values.
 */
export function scoreCountry(r: CountryRow, rows: CountryRow[], perCapita: boolean): { score: number; parts: Array<[string, number]> } {
  const w25 = r.works["2025"] ?? 0, w21 = r.works["2021"] ?? 0;
  const pop = r.population;
  const worksV = perCapita && pop ? w25 / pop : w25;
  const trialsV = perCapita && pop ? (r.trials ?? 0) / pop : (r.trials ?? 0);
  const maxWorks = Math.max(...rows.map((x) => (perCapita && x.population ? (x.works["2025"] ?? 0) / x.population : (x.works["2025"] ?? 0))), 1);
  const maxTrials = Math.max(...rows.map((x) => (perCapita && x.population ? (x.trials ?? 0) / x.population : (x.trials ?? 0))), 1);
  const hiShare = r.total ? r.citedHigh / r.total : 0;
  const maxHi = Math.max(...rows.filter((x) => x.total >= 500).map((x) => (x.total ? x.citedHigh / x.total : 0)), 0.001);
  const growth = w21 ? Math.min(1.5, (w25 - w21) / w21) : 0;
  const oaShare = r.total ? r.oa / r.total : 0;
  const parts: Array<[string, number]> = [
    ["works", 40 * (Math.log1p(worksV) / Math.log1p(maxWorks))],
    ["highly cited share", 20 * Math.min(1, hiShare / maxHi)],
    ["growth", 15 * Math.max(0, growth) / 1.5],
    ["trials", 15 * (Math.log1p(trialsV) / Math.log1p(maxTrials))],
    ["open access", 10 * oaShare],
  ];
  return { score: Math.round(parts.reduce((a, [, v]) => a + v, 0) * 10) / 10, parts };
}

const REGION: Record<string, string> = { US: "North America", CA: "North America", MX: "North America", BR: "Latin America", AR: "Latin America", CL: "Latin America", CO: "Latin America", PE: "Latin America", CN: "Asia", JP: "Asia", KR: "Asia", IN: "Asia", TW: "Asia", SG: "Asia", HK: "Asia", TH: "Asia", VN: "Asia", ID: "Asia", MY: "Asia", PK: "Asia", IR: "Middle East", SA: "Middle East", IL: "Middle East", EG: "Africa", ZA: "Africa", NG: "Africa", TR: "Europe", GB: "Europe", DE: "Europe", FR: "Europe", IT: "Europe", ES: "Europe", NL: "Europe", CH: "Europe", SE: "Europe", BE: "Europe", PL: "Europe", DK: "Europe", AT: "Europe", NO: "Europe", FI: "Europe", GR: "Europe", PT: "Europe", CZ: "Europe", IE: "Europe", RU: "Europe", AU: "Oceania", NZ: "Oceania" };

const fmt = (n?: number) => (n === undefined || Number.isNaN(n) ? "-" : n >= 1000 ? Math.round(n).toLocaleString("en-GB") : n.toLocaleString("en-GB", { maximumFractionDigits: 1 }));
const pct = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)}%` : "-");

export function CountryRanking({ rows, years, deepDives = [] }: { rows: CountryRow[]; years: number[]; /** ISO codes with a deep-dive page at /countries/<code>/. */ deepDives?: string[] }) {
  const [perCapita, setPerCapita] = useState(false);
  const [region, setRegion] = useState<string[]>([]);
  const [min, setMin] = useState<string | null>("500");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortState>({ key: "score", dir: -1 });
  const y0 = String(years[0]), y1 = String(years[years.length - 1]);

  const eligible = useMemo(() => rows.filter((r) => r.total >= Number(min ?? 0)), [rows, min]);
  const scored = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = eligible
      .filter((r) => (!region.length || region.includes(REGION[r.code] ?? "Other")) && (!needle || `${r.name} ${r.code} ${r.funder ?? ""}`.toLowerCase().includes(needle)))
      .map((r) => ({ r, ...scoreCountry(r, eligible, perCapita) }));
    const val = (x: { r: CountryRow; score: number }) => {
      const r = x.r, pop = r.population;
      switch (sort.key) {
        case "score": return x.score;
        case "works": return perCapita && pop ? (r.works[y1] ?? 0) / pop : (r.works[y1] ?? 0);
        case "growth": return r.works[y0] ? (r.works[y1] - r.works[y0]) / r.works[y0] : -1;
        case "hi": return r.total ? r.citedHigh / r.total : 0;
        case "oa": return r.total ? r.oa / r.total : 0;
        case "trials": return perCapita && pop ? (r.trials ?? 0) / pop : (r.trials ?? 0);
        case "inst": return r.institutions;
        case "incidence": return r.incidence ?? -1;
        default: return 0;
      }
    };
    list.sort((a, b) => (sort.key === "name" ? sort.dir * a.r.name.localeCompare(b.r.name) : sort.dir * (val(a) - val(b)) || a.r.name.localeCompare(b.r.name)));
    return list;
  }, [eligible, region, q, perCapita, sort, y0, y1]);

  const onSort = (key: string) => setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: key === "name" ? 1 : -1 }));
  const regions = [...new Set(rows.map((r) => REGION[r.code] ?? "Other"))].sort().map((v) => ({ value: v, label: v }));

  type Row = { r: CountryRow; score: number; parts: Array<[string, number]> };
  const columns: Column<Row>[] = [
    { key: "rank", label: "#", render: (_, i) => <span className="tabular-nums text-muted">{i + 1}</span>, className: "w-10" },
    { key: "name", label: "Country", sortable: true, render: ({ r }) => (
      <div className="min-w-[200px]">
        <div className="font-medium">{r.name} <span className="text-xs text-muted">{r.code}</span>{deepDives.includes(r.code) ? <Link href={`/countries/${r.code.toLowerCase()}/`} className="ml-2 text-xs underline decoration-dotted text-muted hover:text-foreground">Deep dive</Link> : null}</div>
        <div className="text-xs text-muted">{r.funder ?? ""}{r.budget ? ` · ${r.budget}` : ""}</div>
      </div>) },
    { key: "works", label: perCapita ? `Works ${y1} / M pop` : `Oncology works ${y1}`, sortable: true, render: ({ r }) => <span className="tabular-nums">{perCapita && r.population ? fmt((r.works[y1] ?? 0) / r.population) : fmt(r.works[y1])}</span> },
    { key: "growth", label: `Growth ${y0}→${y1}`, sortable: true, hide: "hidden sm:table-cell", render: ({ r }) => { const g = r.works[y0] ? ((r.works[y1] - r.works[y0]) / r.works[y0]) * 100 : undefined; return <span className={`tabular-nums ${g !== undefined && g < 0 ? "text-rose-600" : "text-muted"}`}>{g === undefined ? "-" : `${g > 0 ? "+" : ""}${Math.round(g)}%`}</span>; } },
    { key: "hi", label: "Highly cited", sortable: true, hide: "hidden md:table-cell", render: ({ r }) => <span className="tabular-nums text-muted" title={`${fmt(r.citedHigh)} works with >50 citations, ${y0}-${y1}`}>{pct(r.citedHigh, r.total)}</span> },
    { key: "oa", label: "Open access", sortable: true, hide: "hidden lg:table-cell", render: ({ r }) => <span className="tabular-nums text-muted">{pct(r.oa, r.total)}</span> },
    { key: "trials", label: perCapita ? "Trials / M pop" : "Trials with a site", sortable: true, hide: "hidden md:table-cell", render: ({ r }) => <span className="tabular-nums text-muted">{r.trials === undefined ? "-" : perCapita && r.population ? fmt(r.trials / r.population) : fmt(r.trials)}</span> },
    { key: "inst", label: "In OnCo", sortable: true, hide: "hidden lg:table-cell", render: ({ r }) => r.institutions ? <Link href="/institutions/" className="underline tabular-nums">{r.institutions}</Link> : <span className="text-muted">-</span> },
    { key: "incidence", label: "Incidence / mortality", sortable: true, hide: "hidden xl:table-cell", render: ({ r }) => r.incidence ? <a className="tabular-nums text-muted underline decoration-dotted" href={r.gcoUrl} rel="noopener" title="GLOBOCAN 2022 age-standardised rates per 100,000">{r.incidence} / {r.mortality}</a> : <span className="text-muted">-</span> },
    { key: "score", label: "Score", sortable: true, render: ({ score, parts }) => <span className="tabular-nums font-semibold" title={parts.map(([k, v]) => `${k} ${v.toFixed(1)}`).join(" · ")}>{score}</span> },
  ];

  return (
    <div>
      <Toolbar count={scored.length} total={rows.length} noun="countries"
        left={<>
          <FacetSelect label="Region" options={regions} value={region} onChange={(v) => setRegion(v as string[])} multi searchable={false} allLabel="All" width="w-48" />
          <FacetSelect label="Min works 2021-25" options={[{ value: "0", label: "Any" }, { value: "100", label: "100+" }, { value: "500", label: "500+" }, { value: "2000", label: "2,000+" }, { value: "10000", label: "10,000+" }]} value={min} onChange={(v) => setMin(v as string | null)} searchable={false} allLabel="Any" width="w-52" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={perCapita} onChange={(e) => setPerCapita(e.target.checked)} /> per million population</label>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Country or funder…" aria-label="Filter countries" className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 w-48" />
        </>} />
      <ResultsTable columns={columns} rows={scored} rowKey={(x) => x.r.code} sort={sort} onSort={onSort} scroll />
      <p className="text-xs text-muted mt-3">Hover a score for its breakdown. Per-capita mode needs a population figure (top ~30 countries have one); others keep absolute values.</p>
    </div>
  );
}

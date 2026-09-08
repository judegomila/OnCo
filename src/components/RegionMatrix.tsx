"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { REGIONS, REGION_META, approvedRegions, type Region, type RegionalEntry, type RegionalRow, type RegionalStatus } from "@/data/regional-approvals";
import { FacetSelect } from "./filters/FacetSelect";
import { ResultsTable, Toolbar, type Column, type SortState } from "./filters/ResultsTable";

export type MatrixRow = { id: string; name: string; brand?: string; modality: string; status: string; route: string; regions: RegionalRow };

const STATUS_STYLE: Record<RegionalStatus, { dot: string; chip: string; label: string; short: string }> = {
  approved: { dot: "bg-emerald-500", chip: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200", label: "Approved", short: "✓" },
  conditional: { dot: "bg-teal-400", chip: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200", label: "Conditional / accelerated", short: "✓c" },
  "under-review": { dot: "bg-amber-400", chip: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200", label: "Under review / pending", short: "…" },
  "not-filed": { dot: "bg-zinc-300 dark:bg-zinc-600", chip: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300", label: "Not filed", short: "—" },
  withdrawn: { dot: "bg-rose-500", chip: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200", label: "Withdrawn", short: "✕" },
  rejected: { dot: "bg-rose-600", chip: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200", label: "Rejected", short: "✕" },
};

type GapType = "all" | "us-not-eu" | "eu-not-us" | "cn-first" | "cn-only" | "jp-first" | "everywhere" | "single" | "missing-au" | "missing-cn" | "any-gap";
const GAP_OPTIONS: { value: GapType; label: string }[] = [
  { value: "all", label: "All products" },
  { value: "any-gap", label: "Any gap (approved somewhere, not everywhere)" },
  { value: "us-not-eu", label: "Approved in US, not EU" },
  { value: "eu-not-us", label: "Approved in EU or UK, not US" },
  { value: "cn-first", label: "China approved first" },
  { value: "cn-only", label: "China only" },
  { value: "jp-first", label: "Japan approved first" },
  { value: "missing-cn", label: "Missing in China" },
  { value: "missing-au", label: "Missing in Australia" },
  { value: "everywhere", label: "Approved in all six regions" },
  { value: "single", label: "Single region only" },
];

const ok = (e?: RegionalEntry) => !!e && (e.status === "approved" || e.status === "conditional");
const firstYear = (row: RegionalRow) => Math.min(...REGIONS.map((r) => (ok(row[r]) && row[r]?.year) || Infinity));
const firstRegions = (row: RegionalRow): Region[] => { const y = firstYear(row); return isFinite(y) ? REGIONS.filter((r) => ok(row[r]) && row[r]?.year === y) : []; };

function matchesGap(row: RegionalRow, gap: GapType): boolean {
  const app = approvedRegions(row);
  const first = firstRegions(row);
  switch (gap) {
    case "all": return true;
    case "any-gap": return app.length > 0 && app.length < REGIONS.length;
    case "us-not-eu": return ok(row.US) && !ok(row.EU);
    case "eu-not-us": return (ok(row.EU) || ok(row.UK)) && !ok(row.US);
    case "cn-first": return first.includes("CN") && first.length < REGIONS.length;
    case "cn-only": return app.length === 1 && app[0] === "CN";
    case "jp-first": return first.includes("JP") && first.length < 3;
    case "missing-cn": return app.length > 0 && !ok(row.CN);
    case "missing-au": return app.length > 0 && !ok(row.AU);
    case "everywhere": return app.length === REGIONS.length;
    case "single": return app.length === 1;
  }
}

function Cell({ e }: { e?: RegionalEntry }) {
  if (!e) return <span className="text-muted/50 text-xs" title="No sourced record: unknown, not necessarily unapproved">·</span>;
  const s = STATUS_STYLE[e.status];
  const tip = [s.label, e.year ? String(e.year) : "", e.indication ?? "", e.note ?? ""].filter(Boolean).join(" · ");
  const body = (
    <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs whitespace-nowrap ${s.chip}`} title={tip}>
      <span aria-hidden>{s.short}</span>{e.year ?? ""}{e.verified && <span aria-label="verified against regulator page" title="Verified against regulator page" className="text-[9px]">●</span>}
    </span>
  );
  return e.source ? <a href={e.source} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">{body}</a> : body;
}

/** Products × regions matrix with gap filters, region summaries, and lag table. */
export function RegionMatrix({ rows }: { rows: MatrixRow[] }) {
  const [regions, setRegions] = useState<string[]>([]);
  const [gap, setGap] = useState<GapType>("all");
  const [modality, setModality] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortState>({ key: "first", dir: 1 });

  const shown: Region[] = useMemo(() => (regions.length ? REGIONS.filter((r) => regions.includes(r)) : REGIONS), [regions]);
  const modalities = useMemo(() => Array.from(new Set(rows.map((r) => r.modality))).sort().map((m) => ({ value: m, label: m, count: rows.filter((r) => r.modality === m).length })), [rows]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (modality && r.modality !== modality) return false;
      if (needle && !`${r.name} ${r.brand ?? ""} ${r.modality}`.toLowerCase().includes(needle)) return false;
      if (regions.length && !shown.some((rg) => r.regions[rg])) return false;
      return matchesGap(r.regions, gap);
    });
  }, [rows, q, modality, regions, shown, gap]);

  const sorted = useMemo(() => {
    const dir = sort.dir;
    const v = (r: MatrixRow): number | string => {
      if (sort.key === "first") return firstYear(r.regions);
      if (sort.key === "count") return approvedRegions(r.regions).length;
      if (sort.key === "name") return r.name.toLowerCase();
      if (sort.key === "modality") return r.modality;
      if ((REGIONS as string[]).includes(sort.key)) { const e = r.regions[sort.key as Region]; return ok(e) ? (e?.year ?? 9999) : 99999; }
      return 0;
    };
    return [...filtered].sort((a, b) => { const x = v(a), y = v(b); return (x < y ? -1 : x > y ? 1 : 0) * dir || a.name.localeCompare(b.name); });
  }, [filtered, sort]);

  // Per-region summary and lag.
  const summary = useMemo(() => REGIONS.map((r) => {
    const approved = rows.filter((x) => ok(x.regions[r]));
    const lags = approved.map((x) => { const f = firstYear(x.regions); const y = x.regions[r]?.year; return isFinite(f) && y ? y - f : null; }).filter((n): n is number => n !== null).sort((a, b) => a - b);
    const median = lags.length ? lags[Math.floor(lags.length / 2)] : null;
    const firsts = rows.filter((x) => { const f = firstRegions(x.regions); return f.includes(r) && f.length < REGIONS.length; }).length;
    const missing = rows.filter((x) => approvedRegions(x.regions).length > 0 && !ok(x.regions[r])).length;
    const pending = rows.filter((x) => x.regions[r]?.status === "under-review").length;
    const neg = rows.filter((x) => x.regions[r]?.status === "withdrawn" || x.regions[r]?.status === "rejected").length;
    return { r, approved: approved.length, median, firsts, missing, pending, neg, mean: lags.length ? lags.reduce((a, b) => a + b, 0) / lags.length : null };
  }), [rows]);

  const onSort = (key: string) => setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: 1 }));

  const columns: Column<MatrixRow>[] = [
    { key: "name", label: "Product", sortable: true, render: (r) => <Link href={r.route} className="font-medium hover:underline">{r.name}{r.brand && <span className="text-muted font-normal"> · {r.brand}</span>}</Link> },
    { key: "modality", label: "Modality", sortable: true, hide: "hidden lg:table-cell", className: "text-muted text-xs", render: (r) => r.modality },
    ...shown.map((rg): Column<MatrixRow> => ({ key: rg, label: `${REGION_META[rg].flag} ${rg}`, sortable: true, className: "text-center", render: (r) => <Cell e={r.regions[rg]} /> })),
    { key: "count", label: "Regions", sortable: true, className: "text-center tabular-nums", render: (r) => <span title={approvedRegions(r.regions).join(", ")}>{approvedRegions(r.regions).length}/{REGIONS.length}</span> },
    { key: "first", label: "First", sortable: true, className: "tabular-nums text-xs", render: (r) => { const y = firstYear(r.regions); return isFinite(y) ? <span>{y} <span className="text-muted">{firstRegions(r.regions).join("/")}</span></span> : <span className="text-muted">—</span>; } },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {summary.map((s) => (
          <a key={s.r} href={REGION_META[s.r].url} target="_blank" rel="noopener noreferrer" className="card p-3 hover:shadow-md transition block">
            <div className="flex items-center justify-between"><span className="text-lg" aria-hidden>{REGION_META[s.r].flag}</span><span className="text-xs text-muted">{REGION_META[s.r].regulator.split(" ")[0]}</span></div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">{s.approved}<span className="text-sm text-muted font-normal"> / {rows.length}</span></div>
            <div className="text-xs text-muted leading-snug mt-1">
              <div>median lag <span className="text-foreground tabular-nums">{s.median === null ? "—" : `${s.median} yr${s.median === 1 ? "" : "s"}`}</span></div>
              <div>first-in-world <span className="text-foreground tabular-nums">{s.firsts}</span> · missing <span className="text-foreground tabular-nums">{s.missing}</span></div>
              <div>pending <span className="text-foreground tabular-nums">{s.pending}</span>{s.neg > 0 && <> · withdrawn/rejected <span className="text-foreground tabular-nums">{s.neg}</span></>}</div>
            </div>
          </a>
        ))}
      </div>

      <Toolbar count={sorted.length} total={rows.length} noun="products" left={
        <>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search product or brand" aria-label="Search products" className="rounded-md border border-border bg-card px-3 py-1.5 text-sm w-48" />
          <FacetSelect label="Regions" multi options={REGIONS.map((r) => ({ value: r, label: `${REGION_META[r].flag} ${REGION_META[r].label}` }))} value={regions} onChange={(v) => setRegions(Array.isArray(v) ? v : [])} searchable={false} width="w-56" />
          <FacetSelect label="Gap type" options={GAP_OPTIONS} value={gap} onChange={(v) => setGap((typeof v === "string" ? v : "all") as GapType)} searchable={false} allLabel="All products" width="w-80" />
          <FacetSelect label="Modality" options={modalities} value={modality} onChange={(v) => setModality(typeof v === "string" ? v : null)} width="w-56" />
        </>
      } right={
        <div className="hidden md:flex items-center gap-2 text-xs text-muted">
          {(Object.keys(STATUS_STYLE) as RegionalStatus[]).map((s) => <span key={s} className="inline-flex items-center gap-1"><span className={`inline-block h-2 w-2 rounded-full ${STATUS_STYLE[s].dot}`} />{STATUS_STYLE[s].label.split(" /")[0]}</span>)}
          <span>· blank = unknown</span>
        </div>
      } />

      <ResultsTable columns={columns} rows={sorted} rowKey={(r) => r.id} sort={sort} onSort={onSort} />

      <div className="card p-4">
        <h3 className="font-semibold mb-2">Approval lag by region</h3>
        <p className="text-sm text-muted mb-3">Years between the first approval anywhere and approval in each region, across products approved in that region. Zero means the region was among the first to approve.</p>
        <div className="overflow-x-auto">
          <table className="onco">
            <thead><tr><th>Region</th><th>Regulator</th><th className="text-right">Approved</th><th className="text-right">Median lag</th><th className="text-right">Mean lag</th><th className="text-right">First-in-world</th><th className="text-right">Missing</th><th className="text-right">Pending</th></tr></thead>
            <tbody>
              {summary.map((s) => (
                <tr key={s.r}>
                  <td><span aria-hidden>{REGION_META[s.r].flag}</span> {REGION_META[s.r].label}</td>
                  <td><a href={REGION_META[s.r].url} target="_blank" rel="noopener noreferrer" className="hover:underline">{REGION_META[s.r].regulator}</a></td>
                  <td className="text-right tabular-nums">{s.approved}</td>
                  <td className="text-right tabular-nums">{s.median === null ? "—" : `${s.median} yr`}</td>
                  <td className="text-right tabular-nums">{s.mean === null ? "—" : `${s.mean.toFixed(1)} yr`}</td>
                  <td className="text-right tabular-nums">{s.firsts}</td>
                  <td className="text-right tabular-nums">{s.missing}</td>
                  <td className="text-right tabular-nums">{s.pending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/** Compact six-region strip for product pages: label + status dot + year, each linking to its source. */
export function RegionStrip({ row, className = "" }: { row?: RegionalRow; className?: string }) {
  if (!row) return null;
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {REGIONS.map((r) => {
        const e = row[r];
        const s = e ? STATUS_STYLE[e.status] : null;
        const tip = e ? [REGION_META[r].label, s?.label, e.year ? String(e.year) : "", e.indication ?? "", e.note ?? ""].filter(Boolean).join(" · ") : `${REGION_META[r].label}: no sourced record`;
        const inner = (
          <span className={`inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-xs ${e ? "bg-card" : "opacity-50"}`} title={tip}>
            <span className={`inline-block h-2 w-2 rounded-full ${s ? s.dot : "bg-zinc-300 dark:bg-zinc-600"}`} />
            <span className="font-medium">{r}</span>
            {e?.year && <span className="text-muted tabular-nums">{e.year}</span>}
            {e && !e.year && <span className="text-muted">{s?.label.split(" /")[0].toLowerCase()}</span>}
          </span>
        );
        return e?.source ? <a key={r} href={e.source} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">{inner}</a> : <span key={r}>{inner}</span>;
      })}
      <Link href="/regulatory/regions/" className="text-xs text-muted hover:underline self-center ml-1">compare regions →</Link>
    </div>
  );
}

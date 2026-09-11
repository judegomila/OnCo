"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { ResultsTable, type Column, type SortState } from "./filters/ResultsTable";

/** One row of the /universities/ OpenAlex tables, flattened so the server can hand it to this client component. */
export type RankingRow = {
  key: string;
  name: string;
  /** Parent university for an institution row; nothing for a university row. */
  sub?: string;
  href?: string;
  logo?: ReactNode;
  /** Member institutions of a university row. */
  members?: Array<{ id: string; name: string; href: string }>;
  openalexId?: string;
  openalexName?: string;
  works2024: number;
  works2025: number;
  /** Citations to the 2024 and 2025 works; null when the snapshot has none. */
  cited2yr: number | null;
  /** Oncology works in the five-year window from research-index.json; null when the institution is not in it. */
  works5: number | null;
  cited5: number | null;
};

const n = (v: number | null | undefined) => (v === null || v === undefined ? "-" : v.toLocaleString("en-GB"));

/** Sortable OpenAlex output table: two-year counts from institutions.json and five-year counts from research-index.json. */
export function ResearchRanking({ rows, years, mode }: { rows: RankingRow[]; years: [number, number] | null; mode: "institution" | "university" }) {
  const [sort, setSort] = useState<SortState>({ key: "works2", dir: -1 });
  const hasCited2 = rows.some((r) => r.cited2yr !== null);
  const has5 = years !== null && rows.some((r) => r.works5 !== null);
  const sorted = useMemo(() => {
    const val = (r: RankingRow): number => {
      switch (sort.key) {
        case "works2024": return r.works2024;
        case "works2025": return r.works2025;
        case "works2": return r.works2024 + r.works2025;
        case "cited2": return r.cited2yr ?? -1;
        case "works5": return r.works5 ?? -1;
        case "cited5": return r.cited5 ?? -1;
        default: return 0;
      }
    };
    const list = [...rows];
    list.sort((a, b) => (sort.key === "name" ? sort.dir * a.name.localeCompare(b.name) : sort.dir * (val(a) - val(b)) || a.name.localeCompare(b.name)));
    return list;
  }, [rows, sort]);
  const onSort = (key: string) => setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: key === "name" ? 1 : -1 }));
  const window = years ? `${years[0]} to ${years[1]}` : "";

  const columns: Column<RankingRow>[] = [
    { key: "rank", label: "#", render: (_, i) => <span className="tabular-nums text-muted">{i + 1}</span>, className: "w-10" },
    { key: "name", label: mode === "institution" ? "Institution" : "University / parent", sortable: true, render: (r) => (
      <div className="flex items-center gap-2 min-w-[220px]">{r.logo}<div>{r.href ? <Link href={r.href} className="font-medium hover:underline">{r.name}</Link> : <span className="font-medium">{r.name}</span>}{r.sub && <div className="text-xs text-muted">{r.sub}</div>}</div></div>) },
    ...(mode === "university" ? [{ key: "members", label: "Institutions counted", render: (r: RankingRow) => <span className="text-sm min-w-[220px] inline-block">{(r.members ?? []).map((m) => <Link key={m.id} href={m.href} className="underline mr-2">{m.name}</Link>)}</span> } satisfies Column<RankingRow>] : []),
    ...(mode === "institution" ? [{ key: "match", label: "OpenAlex match", hide: "hidden md:table-cell", render: (r: RankingRow) => r.openalexId ? <a className="underline text-xs text-muted" href={`https://openalex.org/${r.openalexId}`} rel="noopener">{r.openalexName}</a> : <span className="text-muted">-</span> } satisfies Column<RankingRow>] : []),
    ...(mode === "institution" ? [
      { key: "works2024", label: "Oncology works 2024", sortable: true, hide: "hidden lg:table-cell", tip: "Works whose OpenAlex primary topic subfield is Oncology, published in 2024, counted with institution lineage.", render: (r: RankingRow) => <span className="tabular-nums">{n(r.works2024)}</span> } satisfies Column<RankingRow>,
      { key: "works2025", label: "2025", sortable: true, hide: "hidden lg:table-cell", tip: "Oncology works published in 2025.", render: (r: RankingRow) => <span className="tabular-nums">{n(r.works2025)}</span> } satisfies Column<RankingRow>,
    ] : []),
    { key: "works2", label: "2024+2025", sortable: true, tip: "Oncology works published in 2024 and 2025 together.", render: (r) => <span className="tabular-nums font-semibold">{n(r.works2024 + r.works2025)}</span> },
    ...(hasCited2 ? [{ key: "cited2", label: "Citations 2024+2025", sortable: true, hide: "hidden xl:table-cell", tip: "OpenAlex citations to the 2024 and 2025 works.", render: (r: RankingRow) => <span className="tabular-nums text-muted">{n(r.cited2yr)}</span> } satisfies Column<RankingRow>] : []),
    ...(has5 ? [
      { key: "works5", label: `Works ${window}`, sortable: true, tip: `Oncology works published ${window} (the last five years, current year in progress), from public/openalex/research-index.json.`, render: (r: RankingRow) => <span className="tabular-nums">{n(r.works5)}</span> } satisfies Column<RankingRow>,
      { key: "cited5", label: `Citations ${window}`, sortable: true, tip: "OpenAlex citations to the five-year works.", render: (r: RankingRow) => <span className="tabular-nums text-muted">{n(r.cited5)}</span> } satisfies Column<RankingRow>,
    ] : []),
  ];
  return <ResultsTable columns={columns} rows={sorted} rowKey={(r) => r.key} sort={sort} onSort={onSort} scroll pageSize={mode === "institution" ? 100 : undefined} />;
}

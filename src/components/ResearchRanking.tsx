"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ResultsTable, type Column, type SortState } from "./filters/ResultsTable";
import { countOptions, useHeaderFilters } from "./filters/useHeaderFilters";
import { useRemoteRows } from "./filters/FilterableTable";
import { RowAvatar } from "./RowAvatar";
import { TABLE_PAGE, type MoreRows } from "@/lib/static-tables";
import { useT } from "@/lib/i18n/ui";

/** One row of the /universities/ OpenAlex tables, flattened so the server can hand it to this client component. */
export type RankingRow = {
  key: string;
  name: string;
  /** Parent university for an institution row; nothing for a university row. */
  sub?: string;
  href?: string;
  /** Logo URL drawn beside the name (an empty string draws initials; absent draws nothing). */
  avatar?: string;
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

const DEFAULT_SORT: SortState = { key: "works2", dir: -1 };

/**
 * Sortable OpenAlex output table: two-year counts from institutions.json and five-year counts from research-index.json.
 * With `more`, `rows` are the first page in the default order and the rest is fetched from `more.src` when the reader
 * scrolls past them, presses Show more, or sets a filter or another sort (src/lib/static-tables.ts).
 */
export function ResearchRanking({ rows: first, years, mode, more }: { rows: RankingRow[]; years: [number, number] | null; mode: "institution" | "university"; more?: MoreRows }) {
  const [sort, setSort] = useState<SortState>(DEFAULT_SORT);
  const hf = useHeaderFilters();
  const { t } = useT();
  const remote = useRemoteRows(first, more);
  const rows = remote.rows;
  const needAll = !remote.complete && (hf.active || sort.key !== DEFAULT_SORT.key || sort.dir !== DEFAULT_SORT.dir);
  const { want } = remote;
  useEffect(() => { if (needAll) want(); }, [needAll, want]);
  const hasCited2 = rows.some((r) => r.cited2yr !== null);
  const has5 = years !== null && rows.some((r) => r.works5 !== null);
  const parentOf = (r: RankingRow) => r.sub ?? "No parent recorded";
  const inIndex = (r: RankingRow) => (r.works5 === null ? "Not in the five-year index" : "In the five-year index");
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
    const list = rows.filter((r) => hf.pass("parent", [parentOf(r)]) && hf.pass("index5", [inIndex(r)]));
    list.sort((a, b) => (sort.key === "name" ? sort.dir * a.name.localeCompare(b.name) : sort.dir * (val(a) - val(b)) || a.name.localeCompare(b.name)));
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- hf.pass reads hf.sel
  }, [rows, sort, hf.sel]);
  const onSort = (key: string) => setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: key === "name" ? 1 : -1 }));
  const window = years ? `${years[0]} to ${years[1]}` : "";

  const columns: Column<RankingRow>[] = [
    { key: "rank", label: "#", render: (_, i) => <span className="tabular-nums text-muted">{i + 1}</span>, className: "w-10" },
    { key: "name", label: mode === "institution" ? "Institution" : "University / parent", sortable: true, filter: mode === "institution" ? hf.spec("parent", countOptions(rows.map(parentOf))) : undefined, render: (r) => (
      <div className="flex items-center gap-2 min-w-[220px]">{r.avatar !== undefined && <RowAvatar src={r.avatar || undefined} name={r.name} />}<div>{r.href ? <Link href={r.href} className="font-medium hover:underline">{r.name}</Link> : <span className="font-medium">{r.name}</span>}{r.sub && <div className="text-xs text-muted">{r.sub}</div>}</div></div>) },
    ...(mode === "university" ? [{ key: "members", label: "Institutions counted", render: (r: RankingRow) => <span className="text-sm min-w-[220px] inline-block">{(r.members ?? []).map((m) => <Link key={m.id} href={m.href} className="underline mr-2">{m.name}</Link>)}</span> } satisfies Column<RankingRow>] : []),
    ...(mode === "institution" ? [{ key: "match", label: "OpenAlex match", hide: "hidden md:table-cell", render: (r: RankingRow) => r.openalexId ? <a className="underline text-xs text-muted" href={`https://openalex.org/${r.openalexId}`} rel="noopener">{r.openalexName}</a> : <span className="text-muted">-</span> } satisfies Column<RankingRow>] : []),
    ...(mode === "institution" ? [
      { key: "works2024", label: "Oncology works 2024", sortable: true, hide: "hidden lg:table-cell", tip: "Works whose OpenAlex primary topic subfield is Oncology, published in 2024, counted with institution lineage.", render: (r: RankingRow) => <span className="tabular-nums">{n(r.works2024)}</span> } satisfies Column<RankingRow>,
      { key: "works2025", label: "2025", sortable: true, hide: "hidden lg:table-cell", tip: "Oncology works published in 2025.", render: (r: RankingRow) => <span className="tabular-nums">{n(r.works2025)}</span> } satisfies Column<RankingRow>,
    ] : []),
    { key: "works2", label: "2024+2025", sortable: true, tip: "Oncology works published in 2024 and 2025 together.", render: (r) => <span className="tabular-nums font-semibold">{n(r.works2024 + r.works2025)}</span> },
    ...(hasCited2 ? [{ key: "cited2", label: "Citations 2024+2025", sortable: true, hide: "hidden xl:table-cell", tip: "OpenAlex citations to the 2024 and 2025 works.", render: (r: RankingRow) => <span className="tabular-nums text-muted">{n(r.cited2yr)}</span> } satisfies Column<RankingRow>] : []),
    ...(has5 ? [
      { key: "works5", label: `Works ${window}`, sortable: true, tip: `Oncology works published ${window} (the last five years, current year in progress), from public/openalex/research-index.json.`, filter: hf.spec("index5", countOptions(rows.map(inIndex))), render: (r: RankingRow) => <span className="tabular-nums">{n(r.works5)}</span> } satisfies Column<RankingRow>,
      { key: "cited5", label: `Citations ${window}`, sortable: true, tip: "OpenAlex citations to the five-year works.", render: (r: RankingRow) => <span className="tabular-nums text-muted">{n(r.cited5)}</span> } satisfies Column<RankingRow>,
    ] : []),
  ];
  const total = more?.total ?? rows.length;
  return (
    <div>
      {needAll && remote.loading && <p className="text-xs text-muted mb-2" aria-live="polite">{t("table.loadingMore")}</p>}
      {needAll && remote.failed && <p className="text-xs text-muted mb-2">Only the first {first.length} of {total} rows could be filtered: the full list did not load. Check your connection and reload.</p>}
      <ResultsTable columns={columns} rows={sorted} rowKey={(r) => r.key} sort={sort} onSort={onSort} scroll pageSize={more ? TABLE_PAGE : mode === "institution" ? 100 : undefined}
        more={more && !remote.complete && !remote.failed && !needAll ? { total, load: want, loading: remote.loading } : undefined} />
    </div>
  );
}

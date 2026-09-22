import Link from "next/link";
import { readPublicJson } from "@/lib/feed-meta";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/kinds";
import { StaticTable, type StaticColumn, type StaticRow } from "@/components/filters/StaticTable";

/** Shape written by scripts/fetch-openalex-papers.ts (public/openalex/papers.json). */
export type PaperCitations = { doi: string; openalexId: string; cited: number; byYear: Record<string, number>; year?: number; title?: string };
export type CitationsSnapshot = { fetched: string; source: string; license: string; papers: Record<string, PaperCitations>; missing: string[] };

export const readCitations = () => readPublicJson<CitationsSnapshot>("openalex/papers.json");

const YEARS = ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];

/** Most cited key papers, with total and recent-year citations from OpenAlex. */
export function CitedPapers({ limit = 25 }: { limit?: number }) {
  const snap = readCitations();
  if (!snap) return <p className="card p-4 text-sm text-muted">Citation counts are not part of this build yet; they appear after the next weekly refresh.</p>;
  const g = graph();
  const rows = Object.entries(snap.papers)
    .map(([id, c]) => ({ id, c, e: g.get(id) }))
    .filter((r) => r.e)
    .sort((a, b) => b.c.cited - a.c.cited)
    .slice(0, limit);
  const thisYear = String(new Date().getFullYear());
  const lastYear = String(new Date().getFullYear() - 1);
  const total = Object.keys(snap.papers).length;
  const columns: StaticColumn[] = [
    { key: "rank", label: "#", sortable: true, numeric: true, className: "text-muted" },
    { key: "paper", label: "Paper" },
    { key: "journal", label: "Journal", filterable: true, hide: "hidden sm:table-cell", className: "text-muted" },
    { key: "year", label: "Year", filterable: true, sortable: true, numeric: true, hide: "hidden lg:table-cell", className: "text-muted" },
    { key: "cited", label: "Citations", sortable: true, numeric: true, className: "text-right font-medium" },
    { key: "last", label: lastYear, sortable: true, numeric: true, hide: "hidden md:table-cell", className: "text-right text-muted" },
    { key: "this", label: thisYear, sortable: true, numeric: true, hide: "hidden md:table-cell", className: "text-right text-muted" },
    { key: "byYear", label: "By year", hide: "hidden lg:table-cell" },
  ];
  const table: StaticRow[] = rows.map((r, i) => {
    const e = r.e!;
    const paper = e.kind === "paper" ? e : undefined;
    return {
      id: r.id,
      rank: i + 1,
      paper: { text: e.name, href: routeFor(e), strong: true, sub: paper ? `${paper.authors} · ${paper.year}` : undefined },
      journal: paper?.journal,
      year: paper ? String(paper.year) : undefined,
      cited: r.c.cited,
      last: r.c.byYear[lastYear] ?? 0,
      this: r.c.byYear[thisYear] ?? 0,
      byYear: { text: "", bars: YEARS.map((y) => r.c.byYear[y] ?? 0), title: YEARS.map((y) => `${y}: ${r.c.byYear[y] ?? 0}`).join(", ") },
    };
  });
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">Citations for {total} of {g.kind("paper").length} key papers, from <a className="underline" href="https://openalex.org/" rel="noopener">OpenAlex</a> (CC0) on {snap.fetched}. Total citations reward age; the last two years show whether a paper is still being built on.</p>
      <StaticTable rows={table} columns={columns} noun="papers" defaultSort={{ key: "rank", dir: 1 }} />
      {snap.missing.length > 0 && <p className="text-xs text-muted">Not found in OpenAlex by DOI: {snap.missing.map((id, i) => { const e = g.get(id); return <span key={id}>{i > 0 && ", "}{e ? <Link href={routeFor(e)} className="underline">{e.name}</Link> : id}</span>; })}.</p>}
    </div>
  );
}

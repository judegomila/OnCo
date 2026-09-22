import { rankUniversities } from "@/lib/ranking";
import { routeFor } from "@/lib/schema";
import { logoSrc } from "@/lib/logos";
import type { CellObj, StaticColumn, StaticRow } from "@/components/filters/StaticTable";
import type { RankingRow } from "@/components/ResearchRanking";
import { outputRows, universityOutputRows } from "@/components/OutputTable";

/**
 * The three tables of /universities/ (1.5 MB of HTML when every row shipped twice): the OpenAlex output per
 * institution, the same grouped by university, and the corpus-derived score. Each page carries a first page and
 * fetches its file for the rest.
 */
export const UNIVERSITY_OUTPUT_TABLE = "university-output";
export const UNIVERSITY_GROUPED_TABLE = "university-output-grouped";
export const UNIVERSITY_SCORE_TABLE = "university-score";

export const CORPUS_COLUMNS: StaticColumn[] = [
  { key: "rank", label: "#", sortable: true, numeric: true, className: "text-muted" },
  { key: "university", label: "University", className: "min-w-[220px]" },
  { key: "country", label: "Country", filterable: true, hide: "hidden md:table-cell", className: "text-muted" },
  { key: "institutions", label: "Institutions in OnCo", className: "text-sm max-w-md" },
  { key: "count", label: "Centres", sortable: true, numeric: true, hide: "hidden lg:table-cell" },
  { key: "links", label: "Linked objects", sortable: true, numeric: true },
  { key: "score", label: "Score", sortable: true, numeric: true },
];

/** Corpus score rows, rank ascending (the table's default order). */
export function universityScoreRows(corpus = rankUniversities()): StaticRow[] {
  return corpus.map((r) => ({
    id: r.university,
    rank: r.rank,
    university: { text: r.university, strong: true, avatar: logoSrc(r.institutions[0]?.id, r.institutions[0]?.website ?? "") ?? "" },
    country: r.institutions[0]?.country,
    institutions: [...r.institutions.slice(0, 4).map((i): CellObj => ({ text: i.name, href: routeFor(i), muted: true })), ...(r.institutions.length > 4 ? [{ text: `+${r.institutions.length - 4} more`, muted: true } as CellObj] : [])],
    count: r.institutions.length,
    links: r.links,
    score: { text: String(r.score), v: r.score, strong: true },
  }));
}

/** The client table's default order: 2024+2025 works descending, then name; the first page must be sorted the same way. */
const byWorks = (a: RankingRow, b: RankingRow) => b.works2024 + b.works2025 - (a.works2024 + a.works2025) || a.name.localeCompare(b.name);

/** OpenAlex output per institution, flattened for the client table, in the table's default order. */
export function universityOutputRankingRows(rows = outputRows()): RankingRow[] {
  return rows.map((r): RankingRow => ({
    key: r.institution.id, name: r.institution.name, sub: r.institution.university, href: routeFor(r.institution),
    avatar: logoSrc(r.institution.id, r.institution.website) ?? "",
    openalexId: r.openalexId, openalexName: r.openalexName, works2024: r.works2024, works2025: r.works2025, cited2yr: r.cited2yr, works5: r.works5, cited5: r.cited5,
  })).sort(byWorks);
}

/** The same grouped by parent university, in the table's default order. */
export function universityGroupedRankingRows(rows = universityOutputRows()): RankingRow[] {
  return rows.map((r): RankingRow => ({
    key: r.university, name: r.university,
    members: r.institutions.map((i) => ({ id: i.id, name: i.name.replace(/ \/.*$/, ""), href: routeFor(i) })),
    works2024: r.works2024, works2025: r.works2025, cited2yr: r.cited, works5: r.works5, cited5: r.cited5,
  })).sort(byWorks);
}

import type { BrowserRow, ColDef, FacetCounts, FacetDef } from "@/components/EntityBrowser";
import type { SortState } from "@/components/filters/ResultsTable";
import { buildBrowser } from "@/lib/kind-browser";
import { baseSortFor, sortBrowserRows } from "@/lib/browser-sort";
import { KIND_META, KINDS, type Kind } from "@/lib/kinds";
import { KIND_PAGE, pageRows, type MoreRows } from "@/lib/static-tables";
import { termMarks } from "@/lib/term-hover";
import type { TableFile } from "./index";

/**
 * The kind browsers (/trials/, /key-papers/, /people/ ...) as paged tables. Every row of a kind index used to be in
 * the page twice (rendered and as hydration props): /trials/ 7.8 MB, /key-papers/ 3.7 MB, /ideas/ 2.9 MB when
 * measured on 22 Sept 2026 (docs/TABLES.md). The kinds listed here carry their first KIND_PAGE rows in the default
 * order plus whole-table facet counts, and the rest lives in /api/v1/tables/kind-<route>.json, fetched when the
 * reader scrolls past the first rows, presses Show more, or sets a filter, search or sort. Every record has its
 * own page and the sitemap lists them, so the index need not list every row; the page links the kind's JSON and
 * CSV under /api/v1/ for crawlers and agents that want the whole set at once.
 *
 * Rows are the same objects src/app/[kind]/page.tsx renders (buildBrowser plus glossary marks), sorted here with
 * the client's own comparator, so the first page and the file agree by construction (scripts/build-tables.test.ts).
 */
export const PAGED_KINDS: readonly Kind[] = ["trial", "paper", "person", "company", "drug", "idea", "institution", "target", "term", "technology", "cancer"];

/** A kind whose browser ships every row: small tables (roadmaps, bottlenecks, pairings, collections, journals, fronts, pathways). */
export const isPagedKind = (k: Kind): boolean => PAGED_KINDS.includes(k);

/** The table id of a kind browser's file: `kind-` and the kind's route (`kind-key-papers`), so it cannot clash with a hand-written table. */
export const kindTableId = (k: Kind): string => `kind-${KIND_META[k].route}`;

export type KindBrowser = {
  rows: BrowserRow[]; facets: FacetDef[]; columns: ColDef[]; hideStatus: boolean; hideTldr: boolean; defaultSort?: SortState;
  /** The order the rows are in: the table's default sort. */
  sort: SortState;
  /** Facet counts over every row, including `status` when the table shows it. */
  counts: FacetCounts;
};

/** Glossary tooltips inside free-text cells: any non-chip, non-numeric string column gets its technical terms marked. */
function withTermMarks(rows: BrowserRow[], columns: ColDef[]): BrowserRow[] {
  const richKeys = new Set(columns.filter((c) => !c.chip && !c.numeric).map((c) => c.key));
  return rows.map((r) => {
    const cols = { ...r.cols };
    for (const key of richKeys) {
      const v = cols[key];
      if (typeof v === "string" && v.length > 3) { const marks = termMarks(v); if (marks.length) cols[key] = { text: v, marks }; }
    }
    return { ...r, cols };
  });
}

/** Count every facet value over the whole table, in the order the client would list them without an explicit `order`: most common first, then by name. */
export function facetCounts(rows: BrowserRow[], facets: FacetDef[], hideStatus: boolean): FacetCounts {
  const out: FacetCounts = {};
  const keys = hideStatus ? facets.map((f) => f.key) : ["status", ...facets.map((f) => f.key)];
  for (const key of keys) {
    const tally = new Map<string, number>();
    for (const r of rows) for (const v of key === "status" ? (r.status ? [r.status] : []) : (r.facets[key] ?? [])) tally.set(v, (tally.get(v) ?? 0) + 1);
    out[key] = [...tally.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }
  return out;
}

/** The whole browser of one kind: rows with glossary marks in default order, its facets and columns, and the facet counts. */
export function kindBrowser(k: Kind): KindBrowser {
  const built = buildBrowser(k);
  const hideStatus = !!built.hideStatus;
  const sort = baseSortFor(built.defaultSort, hideStatus);
  const rows = sortBrowserRows(withTermMarks(built.rows, built.columns), sort);
  return { rows, facets: built.facets, columns: built.columns, hideStatus, hideTldr: !!built.hideTldr, defaultSort: built.defaultSort, sort, counts: facetCounts(rows, built.facets, hideStatus) };
}

/** What the kind page hands to EntityBrowser: every row for a small kind; the first KIND_PAGE rows, the file and the counts for a paged one. */
export function pageKindRows(k: Kind, rows: BrowserRow[]): { rows: BrowserRow[]; more?: MoreRows } {
  return isPagedKind(k) ? pageRows(kindTableId(k), rows, KIND_PAGE) : { rows };
}

/** The paged kind browsers as table files for scripts/build-tables.ts, in KINDS order. */
export function kindTables(): TableFile[] {
  return KINDS.filter(isPagedKind).map((k) => ({ id: kindTableId(k), rows: kindBrowser(k).rows, page: KIND_PAGE }));
}

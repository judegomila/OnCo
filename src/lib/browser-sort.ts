/**
 * The order an EntityBrowser table shows its rows in, as a pure function, so the server can put a paged kind
 * browser's first rows in the same order the client sorts them (src/lib/tables/kinds.ts) and the file that holds
 * the rest agrees with the page by construction. EntityBrowser imports the comparator from here; nothing here
 * touches React or the graph.
 */
import type { BrowserRow, CellValue, FacetLink, LinkItem, RichText } from "@/components/EntityBrowser";
import type { SortState } from "@/components/filters/ResultsTable";

/** Phase and status values in "what works first" order; unknown values sort last. */
export const STATUS_ORDER = ["approved", "standard-of-care", "positive", "phase-3", "established", "completed", "recruiting", "active", "phase-2", "emerging", "phase-1", "preclinical", "concept", "planned", "mixed", "historic", "negative", "withdrawn"];

export const isRich = (v: unknown): v is RichText => !!v && typeof v === "object" && !Array.isArray(v) && "text" in (v as object);
export const isFacetLink = (v: unknown): v is FacetLink => !!v && typeof v === "object" && !Array.isArray(v) && "facet" in (v as object);
export const itemLabel = (i: LinkItem | FacetLink): string => ("href" in i ? i.label : (i.label ?? i.value));
/** The plain text of a cell: what search matches against and what text sorting compares. */
export const cellText = (v: CellValue): string => (Array.isArray(v) ? v.map(itemLabel).join(", ") : isRich(v) ? v.text : isFacetLink(v) ? itemLabel(v) : String(v ?? ""));

const statusIdx = (s?: string) => { const i = STATUS_ORDER.indexOf(s ?? ""); return i < 0 ? 99 : i; };

/** The comparator behind a sorted browser table: the chosen column, then `tie` (higher first), then the name. */
export function compareBrowserRows(sort: SortState): (a: BrowserRow, b: BrowserRow) => number {
  return (a, b) => {
    let d = 0;
    if (sort.key === "name") d = a.name.localeCompare(b.name);
    else if (sort.key === "status") d = statusIdx(a.status) - statusIdx(b.status);
    else if (a.sortKeys && b.sortKeys && sort.key in a.sortKeys) d = (a.sortKeys[sort.key] ?? 0) - (b.sortKeys[sort.key] ?? 0);
    else d = cellText(a.cols[sort.key]).localeCompare(cellText(b.cols[sort.key]));
    return sort.dir * d || (b.tie ?? 0) - (a.tie ?? 0) || a.name.localeCompare(b.name);
  };
}

/** The order the table opens in when the page sets no `defaultSort`: by status when the table shows one, else by name. */
export const baseSortFor = (defaultSort: SortState | undefined, hideStatus: boolean): SortState => defaultSort ?? { key: hideStatus ? "name" : "status", dir: 1 };

/** A sorted copy of the rows. */
export const sortBrowserRows = (rows: BrowserRow[], sort: SortState): BrowserRow[] => [...rows].sort(compareBrowserRows(sort));

/**
 * Paged hand-written tables: the page carries the first TABLE_PAGE rows of a large table and the rest lives in one
 * static file under /api/v1/tables/, fetched when the reader scrolls past the first rows, presses "Show more" or
 * sets a filter or sort the first rows alone cannot answer (the explore pattern, src/lib/explore-kinds.ts).
 *
 * Every row a server page hands to a client table is written into the HTML twice: once rendered and once as the
 * props React hydrates from. /evidence/ carried 3,527 trials that way and weighed 6.2 MB. Pure module: the pages,
 * the client tables, the API writer (scripts/build-tables.ts) and the tests read one definition.
 */
export const TABLE_PAGE = 30;
/** First page and step for a list whose items are whole tables (the per-pathway node tables of /pathway-drugs/). */
export const SECTION_PAGE = 10;
/** First page of a kind browser (/trials/, /key-papers/, ...): two ordinary pages, so the index reads as a list before anything is fetched (src/lib/tables/kinds.ts). */
export const KIND_PAGE = 60;

/** Site-relative URL of the file holding every row of one paged table. */
export const tableFile = (id: string): string => `/api/v1/tables/${id}.json`;

/** Rows beyond the first page exist in a file the client fetches on demand; `total` is the whole table. */
export type MoreRows = { total: number; src: string };

/**
 * Split a table into what the page renders and where the rest is. Rows must already be in the table's default
 * order (the first page stands in for the whole until the file is fetched). Tables that fit in one page carry
 * every row and no file. The file (scripts/build-tables.ts) exists for every table longer than its page, so the
 * `size` given here must be the one the table is registered with in src/lib/tables/index.ts (TABLE_PAGE unless
 * the table says otherwise; the kind browsers use KIND_PAGE).
 */
export function pageRows<T>(id: string, rows: T[], size: number = TABLE_PAGE): { rows: T[]; more?: MoreRows } {
  if (rows.length <= size) return { rows };
  return { rows: rows.slice(0, size), more: { total: rows.length, src: tableFile(id) } };
}

/** One request per file per page; the promise is shared by every caller. Null when the file cannot be fetched. */
const files = new Map<string, Promise<unknown[] | null>>();
export function loadTableFile<T>(src: string): Promise<T[] | null> {
  let p = files.get(src);
  if (!p) {
    p = fetch(src).then(async (r) => (r.ok ? ((await r.json()) as unknown[]) : null)).catch(() => null);
    files.set(src, p);
  }
  return p as Promise<T[] | null>;
}
/** Test seam: forget the fetched files. */
export function resetTableFiles() { files.clear(); }

/**
 * The paged tables' row files: public/api/v1/tables/<id>.json, one per hand-written table longer than one page
 * (src/lib/static-tables.ts), each holding every row in the table's default order. The page itself carries the
 * first TABLE_PAGE rows; the browser fetches the file when the reader scrolls past them, presses "Show more" or
 * sets a filter or sort that needs the whole set. Called from scripts/build-api.ts; exported as a function so the
 * test can write into a temporary directory and compare counts.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tableFile } from "../src/lib/static-tables";
import { pagedTables, type TableFile } from "../src/lib/tables";

export type WrittenTable = { id: string; path: string; file: string; count: number };

/** Write one file per paged table under `apiDir` (the public/api/v1 directory) and return what was written. */
export function writeTableFiles(apiDir: string, tables: TableFile[] = pagedTables()): WrittenTable[] {
  mkdirSync(join(apiDir, "tables"), { recursive: true });
  const out: WrittenTable[] = [];
  for (const t of tables) {
    const file = join(apiDir, "tables", `${t.id}.json`);
    writeFileSync(file, JSON.stringify(t.rows));
    out.push({ id: t.id, path: tableFile(t.id), file, count: t.rows.length });
  }
  return out;
}

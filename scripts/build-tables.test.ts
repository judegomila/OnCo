import { describe, expect, it } from "vitest";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pageRows, TABLE_PAGE, tableFile } from "../src/lib/static-tables";
import { allTables, pagedTables } from "../src/lib/tables";
import { EVIDENCE_TABLE } from "../src/lib/tables/evidence";
import { CHINA_TRIALS_TABLE } from "../src/lib/tables/china";
import { UNIVERSITY_GROUPED_TABLE, UNIVERSITY_OUTPUT_TABLE, UNIVERSITY_SCORE_TABLE } from "../src/lib/tables/universities";
import { PATHWAY_MATRIX_TABLE, PATHWAY_NODES_TABLE } from "../src/lib/tables/pathway-drugs";
import { dossierTrialsTableId } from "../src/lib/tables/dossier-trials";
import { STARTUPS_TABLE } from "../src/lib/tables/startups";
import { writeTableFiles } from "./build-tables";

/**
 * A paged table's page carries its first TABLE_PAGE rows and fetches the rest from one file. The file must hold
 * every row in the order the page uses, its size must be the total the page prints, and ids must be unique so the
 * table keys stay stable when the file replaces the first page.
 */
describe("paged table files", () => {
  const tables = allTables();
  const paged = pagedTables(tables);
  const dir = mkdtempSync(join(tmpdir(), "onco-tables-"));
  const written = writeTableFiles(dir, paged);
  const read = (file: string) => JSON.parse(readFileSync(file, "utf8")) as Array<{ id?: string; key?: string }>;
  const ids = new Set(written.map((w) => w.id));

  it("writes the heavy pages' tables at the paths the pages fetch", () => {
    for (const id of [EVIDENCE_TABLE, CHINA_TRIALS_TABLE, UNIVERSITY_OUTPUT_TABLE, UNIVERSITY_GROUPED_TABLE, UNIVERSITY_SCORE_TABLE, PATHWAY_MATRIX_TABLE, PATHWAY_NODES_TABLE, STARTUPS_TABLE, dossierTrialsTableId("pd1")]) expect(ids, id).toContain(id);
    for (const w of written) {
      expect(w.path).toBe(tableFile(w.id));
      expect(w.file.endsWith(w.path.replace("/api/v1/", "/"))).toBe(true);
      expect(w.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
    expect(ids.size).toBe(written.length);
  });

  it("writes only tables longer than a page, each holding every row with unique ids", () => {
    for (const t of tables) expect(ids.has(t.id), t.id).toBe(t.rows.length > TABLE_PAGE);
    for (const w of written) {
      const rows = read(w.file);
      const source = tables.find((t) => t.id === w.id)!;
      expect(rows.length, w.id).toBe(w.count);
      expect(rows.length, w.id).toBe(source.rows.length);
      const keys = rows.map((r) => r.id ?? r.key);
      expect(keys.every((k) => typeof k === "string"), `${w.id} keyed`).toBe(true);
      expect(new Set(keys).size, `${w.id} ids unique`).toBe(rows.length);
    }
  });

  it("starts each file with the rows the page renders, in the same order", () => {
    for (const w of written) {
      const rows = read(w.file);
      const source = tables.find((t) => t.id === w.id)!;
      const page = pageRows(w.id, source.rows);
      expect(page.rows.length, w.id).toBe(TABLE_PAGE);
      expect(page.more, w.id).toEqual({ total: rows.length, src: w.path });
      expect(JSON.stringify(rows.slice(0, TABLE_PAGE)), w.id).toBe(JSON.stringify(page.rows));
    }
  });

  it("holds plain JSON only: no functions or React nodes cross into the file", () => {
    for (const t of paged) expect(JSON.parse(JSON.stringify(t.rows)), t.id).toEqual(t.rows);
  });

  it("leaves the tmp dir clean", () => { rmSync(dir, { recursive: true, force: true }); expect(true).toBe(true); });
});

import { describe, expect, it } from "vitest";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { IDEA_PICKS } from "../src/data/idea-picks";
import { rankAll, RANK_PAGE, rankingsFile, VIEW_IDS, type RankedRow } from "../src/lib/idea-rankings";
import { writeIdeaRankingFiles } from "./build-idea-rankings";

/**
 * The idea rankings page carries the first RANK_PAGE rows of each view and fetches the rest from one file per view.
 * The files must hold every row the view can rank, in the order the page uses, and their sizes must be the counts
 * the view pills print; otherwise the reader would see a total the list never reaches.
 */
describe("idea ranking view files", () => {
  const all = rankAll(Infinity);
  const page = rankAll(RANK_PAGE);
  const dir = mkdtempSync(join(tmpdir(), "onco-rankings-"));
  const written = writeIdeaRankingFiles(dir, all);
  const read = (file: string) => JSON.parse(readFileSync(file, "utf8")) as RankedRow[];

  it("writes one file per view at the path the page fetches", () => {
    expect(written.map((f) => f.view)).toEqual([...VIEW_IDS]);
    for (const f of written) {
      expect(f.path).toBe(rankingsFile(f.view));
      expect(f.file.endsWith(f.path.replace("/api/v1/", "/"))).toBe(true);
    }
  });

  it("holds every row the view can rank, numbered from 1, matching the count the pill shows", () => {
    for (const f of written) {
      const rows = read(f.file);
      const view = all.find((v) => v.view.id === f.view)!;
      expect(rows.length, f.view).toBe(f.count);
      expect(rows.length, f.view).toBe(view.ranked);
      rows.forEach((r, i) => expect(r.rank, `${f.view} row ${i}`).toBe(i + 1));
      expect(new Set(rows.map((r) => r.parts.id)).size, `${f.view} ids unique`).toBe(rows.length);
      // The four computed views rank most ideas, so the page's first page never shows them whole; Cherry picked is a short hand-kept list.
      if (!["most-wanted", "cherry-picked"].includes(f.view)) expect(rows.length, f.view).toBeGreaterThan(RANK_PAGE);
      if (f.view === "cherry-picked") expect(rows.map((r) => r.parts.id)).toEqual(IDEA_PICKS.map((p) => p.id).filter((id) => rows.some((r) => r.parts.id === id)));
      if (!view.available) expect(rows, f.view).toEqual([]);
    }
  });

  it("starts each file with the rows the page renders, in the same order", () => {
    for (const f of written) {
      const rows = read(f.file);
      const first = page.find((v) => v.view.id === f.view)!.rows;
      expect(first.length, f.view).toBe(Math.min(RANK_PAGE, rows.length));
      expect(rows.slice(0, first.length).map((r) => r.parts.id), f.view).toEqual(first.map((r) => r.parts.id));
    }
  });

  it("carries plain data only: every score is a number or null and every part is JSON-safe", () => {
    for (const f of written) {
      for (const r of read(f.file)) {
        expect(r.score === null || typeof r.score === "number", `${f.view} ${r.parts.id}`).toBe(true);
        expect(typeof r.parts.name).toBe("string");
        expect(r.parts.route).toMatch(/^\/ideas\/[a-z0-9-]+\/$/);
        if (f.view === "cherry-picked") expect(r.reason, r.parts.id).toBeTruthy();
      }
    }
  });

  it("leaves the tmp dir clean", () => { rmSync(dir, { recursive: true, force: true }); expect(true).toBe(true); });
});

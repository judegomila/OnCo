import { describe, expect, it } from "vitest";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { EXPLORE_KINDS, EXPLORE_PAGE, exploreFile } from "../src/lib/explore-kinds";
import { exploreSections } from "../src/lib/relevance-rows";
import type { PowerRow } from "../src/lib/relevance";
import { writeExploreFiles } from "./build-explore";

/**
 * The Explore page carries the first EXPLORE_PAGE rows of each kind and fetches the rest from one file per kind.
 * The files must hold every row of the kind, in the order the page uses, and their sizes must be the counts the
 * page prints; otherwise the reader would see a total the table never reaches.
 */
describe("explore section files", () => {
  const sections = exploreSections();
  const dir = mkdtempSync(join(tmpdir(), "onco-explore-"));
  const written = writeExploreFiles(dir, sections);
  const read = (file: string) => JSON.parse(readFileSync(file, "utf8")) as PowerRow[];

  it("writes one file per Explore kind at the path the page fetches", () => {
    expect(written.map((f) => f.kind)).toEqual(EXPLORE_KINDS);
    for (const f of written) {
      expect(f.path).toBe(exploreFile(f.kind));
      expect(f.file.endsWith(f.path.replace("/api/v1/", "/"))).toBe(true);
    }
  });

  it("holds every row of the kind, all of that kind, matching the count the page shows", () => {
    for (const f of written) {
      const rows = read(f.file);
      expect(rows.length, f.kind).toBe(f.count);
      expect(rows.length, f.kind).toBe(sections.counts[""][f.kind]);
      expect(rows.length, f.kind).toBe(sections.full[f.kind]?.length);
      expect(rows.every((r) => r.kind === f.kind), f.kind).toBe(true);
      expect(new Set(rows.map((r) => r.id)).size, `${f.kind} ids unique`).toBe(rows.length);
    }
  });

  it("starts each file with the rows the page renders, in the same order", () => {
    for (const f of written) {
      const rows = read(f.file);
      const first = sections.first.filter((r) => r.kind === f.kind);
      expect(first.length, f.kind).toBe(Math.min(EXPLORE_PAGE, rows.length));
      expect(rows.slice(0, first.length).map((r) => r.id), f.kind).toEqual(first.map((r) => r.id));
    }
  });

  it("counts per cancer never exceed the kind total and only name Explore kinds", () => {
    for (const [cancerId, m] of Object.entries(sections.counts)) {
      for (const [k, n] of Object.entries(m)) {
        expect(EXPLORE_KINDS, `${cancerId} ${k}`).toContain(k);
        expect(n, `${cancerId} ${k}`).toBeLessThanOrEqual(sections.counts[""][k as (typeof EXPLORE_KINDS)[number]] ?? 0);
      }
    }
  });

  it("leaves the tmp dir clean", () => { rmSync(dir, { recursive: true, force: true }); expect(true).toBe(true); });
});

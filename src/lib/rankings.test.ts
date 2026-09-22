import { describe, expect, it } from "vitest";
import { coverageSentence, coverageShare, MIN_COVERAGE, RANKING_SLUGS, rankingJson, rankings, TOP } from "./rankings";

describe("rankings registry", () => {
  const all = rankings();

  it("has unique, url-safe slugs", () => {
    expect(new Set(RANKING_SLUGS).size).toBe(RANKING_SLUGS.length);
    for (const s of RANKING_SLUGS) expect(s).toMatch(/^[a-z0-9-]+$/);
    expect(all.map((r) => r.slug)).toEqual(RANKING_SLUGS);
  });

  it("returns rows for every ranking, ranked 1..n, ordered by value then name, capped at the top", () => {
    for (const r of all) {
      expect(r.rows.length, r.slug).toBeGreaterThan(0);
      expect(r.rows.length, r.slug).toBeLessThanOrEqual(TOP);
      expect(r.total, r.slug).toBeGreaterThanOrEqual(r.rows.length);
      r.rows.forEach((row, i) => {
        expect(row.rank).toBe(i + 1);
        expect(row.value, `${r.slug} ${row.id}`).toBeGreaterThan(0);
        expect(row.route).toMatch(/^\/[a-z-]+\/[^/]+\/$/);
        expect(row.metric.length).toBeGreaterThan(0);
        if (i > 0) {
          const prev = r.rows[i - 1];
          expect(prev.value >= row.value, `${r.slug} row ${i}`).toBe(true);
          if (prev.value === row.value) expect(prev.name.localeCompare(row.name) <= 0, `${r.slug} tie ${prev.name} / ${row.name}`).toBe(true);
        }
      });
      expect(new Set(r.rows.map((x) => x.id)).size).toBe(r.rows.length);
    }
  });

  it("states a basis that is one sentence ending in a full stop, and a metric and context label", () => {
    for (const r of all) {
      expect(r.basis.endsWith("."), r.slug).toBe(true);
      expect(r.basis.includes("—"), r.slug).toBe(false);
      expect(r.how.endsWith("."), r.slug).toBe(true);
      expect(r.metricLabel.length).toBeGreaterThan(0);
      expect(r.contextLabel.length).toBeGreaterThan(0);
      expect(r.title.length).toBeGreaterThan(0);
    }
  });

  it("only registers rankings whose counted field is filled on at least the disclosed share of records", () => {
    for (const r of all) {
      const pct = Math.round(100 * coverageShare(r.coverage));
      expect(pct, `${r.slug}: ${coverageSentence(r.coverage)}`).toBeGreaterThanOrEqual(Math.round(100 * MIN_COVERAGE));
      expect(coverageSentence(r.coverage)).toMatch(/\(\d+%\)\.$/);
    }
  });

  it("exports the same rows as JSON without images", () => {
    for (const r of all) {
      const j = rankingJson(r);
      expect(j.rows.length).toBe(r.rows.length);
      expect(j.rows[0]).not.toHaveProperty("image");
      expect(j.top).toBe(r.rows.length);
      expect(j.coverage.share).toBeGreaterThanOrEqual(MIN_COVERAGE - 0.005);
    }
  });

  it("labels enrolment with the population the number counts", () => {
    const t = all.find((r) => r.slug === "trials-by-enrolment")!;
    for (const row of t.rows) expect(row.metric).toMatch(/^[\d,]+ (enrolled|randomised|analysed|treated|registered)$/);
  });
});

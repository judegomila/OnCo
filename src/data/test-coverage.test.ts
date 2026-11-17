import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import { productClass } from "@/lib/product-class";
import { TEST_COVERAGE, TEST_COVERAGE_GAPS, testCoverageFor, type TestCoverageRow } from "./test-coverage";

/**
 * Who pays for a test (src/data/test-coverage.ts). A wrong coverage statement on a patient-facing page is the worst
 * thing this file could produce, so the checks here are about provenance: every row names a real test record, points
 * at the payer's own site, says when it was read, and a gap is always labelled as a gap.
 */

/** Primary hosts only: the payer or guidance body itself, or the regulator whose list a rule defers to. */
const ALLOWED_HOSTS = [/(^|\.)cms\.gov$/, /(^|\.)palmettogba\.com$/, /(^|\.)nice\.org\.uk$/, /(^|\.)fda\.gov$/];

const ALL: TestCoverageRow[] = [...TEST_COVERAGE, ...TEST_COVERAGE_GAPS];

const onAllowedHost = (url: string) => {
  const u = new URL(url);
  return u.protocol === "https:" && ALLOWED_HOSTS.some((re) => re.test(u.hostname));
};

describe("test coverage rows", () => {
  const g = graph();

  it("names only real records that productClass() classes as a test", () => {
    const bad = ALL.filter((r) => {
      const e = g.byId.get(r.testId);
      return !e || e.kind !== "drug" || productClass(e) !== "test";
    }).map((r) => r.testId);
    expect(bad).toEqual([]);
  });

  it("links every document and every search to an https page on a primary host", () => {
    const bad = ALL.flatMap((r) => [r.document?.url, r.searchUrl].filter((u): u is string => Boolean(u)).filter((u) => !onAllowedHost(u)));
    expect(bad).toEqual([]);
  });

  it("carries a read date on every row, and well-formed dates", () => {
    const iso = /^\d{4}-\d{2}-\d{2}$/;
    expect(ALL.filter((r) => !iso.test(r.readOn)).map((r) => r.testId)).toEqual([]);
    expect(ALL.filter((r) => r.effective !== undefined && !iso.test(r.effective)).map((r) => r.testId)).toEqual([]);
  });

  it("has no duplicate (test, document)", () => {
    const seen = new Set<string>();
    const dupes: string[] = [];
    for (const r of ALL) {
      const key = `${r.testId}|${r.country}|${r.document?.id ?? `search:${r.searchUrl}`}`;
      if (seen.has(key)) dupes.push(key);
      seen.add(key);
    }
    expect(dupes).toEqual([]);
  });

  it("rests every confirmed fact on a document, with a note", () => {
    const bad = TEST_COVERAGE.filter((r) => r.status === "not confirmed" || !r.document || r.note.length < 60).map((r) => r.testId);
    expect(bad).toEqual([]);
  });

  it("labels every gap as not confirmed and says what was searched and where", () => {
    const bad = TEST_COVERAGE_GAPS.filter((r) => r.status !== "not confirmed" || !r.searched || !r.searchUrl || !r.note.startsWith("Not confirmed.")).map((r) => r.testId);
    expect(bad).toEqual([]);
  });

  it("keeps house style in the notes: no em or en dashes, no date stamps", () => {
    const bad = ALL.filter((r) => /[–—]/.test(r.note) || /\bas of\b/i.test(r.note)).map((r) => r.testId);
    expect(bad).toEqual([]);
  });

  it("looks rows up by test, facts before gaps", () => {
    const rows = testCoverageFor("oc-sensor-fit");
    expect(rows.map((r) => r.country).sort()).toEqual(["GB", "US"]);
    const mixed = testCoverageFor("mammaprint");
    expect(mixed.map((r) => r.status)).toEqual(["not recommended", "not confirmed"]);
    expect(testCoverageFor("no-such-test")).toEqual([]);
  });
});

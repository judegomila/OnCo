import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import { DOMAIN_LABEL, DOMAIN_ORDER, PRECISION_ROWS, precisionFill, precisionProblems, type PrecisionRow } from "./precision-matrix";

/**
 * The precision matrix (src/data/precision-matrix/, rendered at /live/precision/): for each technology whose
 * usefulness is limited by how precise it is, what precision means there, how precise it is today, what limits it,
 * the next step and what that step would buy a patient.
 *
 * What this file defends, in order of how badly it would hurt to lose it:
 *
 *  1. **Nothing about today without a source and its words.** `today` is the one field that states how precise
 *     something is, so it must carry a source with a verbatim quote. The quote was checked by exact string match
 *     against the raw source when the row was written; the test keeps the field from quietly emptying.
 *  2. **Every id resolves.** A row links to the records it is about; an id that does not exist is a broken link on
 *     the page and, worse, a row about nothing.
 *  3. **Oversold precision is graded, not just asserted.** `oversold` without a grade would be an opinion.
 *  4. **The checker bites.** The rows start empty and are filled by four facets in parallel, so a test that passes
 *     on an empty list proves nothing. The fixture below is a set of bad rows, one rule broken in each, and the test
 *     fails if the checker lets any of them through.
 */

const g = graph();
const has = (id: string) => g.get(id) !== undefined;

describe("precision matrix: the rows", () => {
  it("break none of the rules", () => {
    expect(precisionProblems(PRECISION_ROWS, has)).toEqual([]);
  });

  it("have unique ids across all four domain files", () => {
    const ids = PRECISION_ROWS.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("only use domains the page knows how to group", () => {
    expect(new Set(DOMAIN_ORDER)).toEqual(new Set(Object.keys(DOMAIN_LABEL)));
    for (const r of PRECISION_ROWS) expect(DOMAIN_ORDER, r.id).toContain(r.domain);
  });

  it("are counted honestly for the page lede", () => {
    const f = precisionFill();
    expect(f.rows).toBe(PRECISION_ROWS.length);
    expect(Object.values(f.byDomain).reduce((a, b) => a + b, 0)).toBe(PRECISION_ROWS.length);
    expect(f.withToday).toBeLessThanOrEqual(f.rows);
    expect(f.oversold).toBeLessThanOrEqual(f.graded);
  });
});

/** A row that passes every rule; each fixture below breaks exactly one. */
const good: PrecisionRow = {
  id: "fixture-good-row",
  domain: "radiation",
  label: "A fixture row",
  technologyIds: ["mr-linac"],
  metric: "margin added around the target, mm",
  today: { value: "2 mm", context: "A fixture cohort", source: { label: "A fixture source", url: "https://example.org/a", quote: "a verbatim fragment" } },
  limits: [{ kind: "physics", text: "A fixture limit." }],
  nextStep: { text: "A fixture step.", status: "in-trials", relatedIds: ["adaptive-radiotherapy"] },
  buys: { text: "A fixture benefit.", outcome: "plausible" },
  grade: "moderate",
  oversold: "A fixture sentence.",
  relatedIds: ["sbrt"],
};

const bad: Array<[string, PrecisionRow[]]> = [
  ["duplicate row id", [good, { ...good }]],
  ["id is not kebab-case", [{ ...good, id: "Fixture Row" }]],
  ["technologyIds is empty", [{ ...good, technologyIds: [] }]],
  ["is not a corpus id", [{ ...good, technologyIds: ["no-such-record-anywhere"] }]],
  ["is not a corpus id", [{ ...good, relatedIds: ["no-such-record-anywhere"] }]],
  ["is not a corpus id", [{ ...good, nextStep: { ...good.nextStep!, relatedIds: ["no-such-record-anywhere"] } }]],
  ["today has no source", [{ ...good, today: { value: "2 mm", context: "A fixture cohort" } as PrecisionRow["today"] }]],
  ["no verbatim quote", [{ ...good, today: { ...good.today!, source: { label: "A fixture source", url: "https://example.org/a" } } }]],
  ["no verbatim quote", [{ ...good, today: { ...good.today!, source: { ...good.today!.source, quote: "   " } } }]],
  ["empty quote", [{ ...good, limits: [{ kind: "physics", text: "A fixture limit.", source: { label: "A fixture source", url: "https://example.org/b", quote: "" } }] }]],
  ["url is not https", [{ ...good, today: { ...good.today!, source: { ...good.today!.source, url: "http://example.org/a" } } }]],
  ["em or en dash", [{ ...good, metric: "margin — in mm" }]],
  ["em or en dash", [{ ...good, limits: [{ kind: "biology", text: "From 2–3 mm." }] }]],
  ["unknown grade", [{ ...good, grade: "excellent" as PrecisionRow["grade"] }]],
  ["oversold without a grade", [{ ...good, grade: undefined }]],
  ["unknown domain", [{ ...good, domain: "psychic" as PrecisionRow["domain"] }]],
  ["unknown kind", [{ ...good, limits: [{ kind: "money" as "physics", text: "A fixture limit." }] }]],
  ["unknown status", [{ ...good, nextStep: { ...good.nextStep!, status: "soon" as "research" } }]],
  ["established with no source", [{ ...good, buys: { text: "A fixture benefit.", outcome: "established" } }]],
];

describe("precision matrix: the checker bites", () => {
  it("passes a well-formed fixture row", () => {
    expect(precisionProblems([good], has)).toEqual([]);
  });

  it("accepts a dash inside a verbatim quote, because quotations are never edited", () => {
    const quoted = { ...good, today: { ...good.today!, source: { ...good.today!.source, quote: "95% CI, 2.9–14.5" } } };
    expect(precisionProblems([quoted], has)).toEqual([]);
  });

  it.each(bad.map(([rule, rows], i) => [`${i}: ${rule}`, rule, rows] as const))("rejects %s", (_name, rule, rows) => {
    const problems = precisionProblems(rows, has);
    expect(problems.some((p) => p.includes(rule)), `expected "${rule}" in ${JSON.stringify(problems)}`).toBe(true);
  });
});

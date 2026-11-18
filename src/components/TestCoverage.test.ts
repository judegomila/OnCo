import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TEST_COVERAGE, TEST_COVERAGE_GAPS, testCoverageFor } from "@/data/test-coverage";
import { TestCoverage } from "./TestCoverage";

/** "Who pays for this test" shows every row a test has, with its source and the day it was read, and nothing otherwise. */
const html = (testId: string) => renderToStaticMarkup(createElement(TestCoverage, { testId }));

describe("who pays for this test", () => {
  it("renders nothing for a test nobody has looked up", () => {
    expect(html("no-such-test")).toBe("");
  });

  it("shows each confirmed row with its document, the day it was read and the status in the source's terms", () => {
    for (const r of TEST_COVERAGE) {
      const h = html(r.testId);
      expect(h, r.testId).toContain(`Read on ${r.readOn}.`);
      if (r.document) expect(h, r.testId).toContain(`href="${r.document.url.replace(/&/g, "&amp;")}"`);
      expect(h.toLowerCase(), r.testId).toContain(r.status);
    }
  });

  it("shows a gap as not confirmed, with what was searched, and never as a refusal", () => {
    for (const r of TEST_COVERAGE_GAPS) {
      const h = html(r.testId);
      expect(h, r.testId).toContain("Not confirmed");
      expect(h, r.testId).toContain("Searched:");
    }
    const onlyGaps = TEST_COVERAGE_GAPS.map((r) => r.testId).filter((id) => testCoverageFor(id).every((r) => r.status === "not confirmed"));
    for (const id of onlyGaps) expect(html(id), id).not.toMatch(/>Not covered</);
  });

  it("stays small: the heaviest test page's block", () => {
    // Measured 16 Nov 2026: 3.4 KB at the heaviest (a test with two gap rows); the budget is that plus 15 per cent.
    const sizes = [...new Set([...TEST_COVERAGE, ...TEST_COVERAGE_GAPS].map((r) => r.testId))].map((id) => [id, Buffer.byteLength(html(id), "utf8") / 1024] as const).sort((a, b) => b[1] - a[1]);
    expect(sizes[0][1], `${sizes[0][0]} at ${sizes[0][1].toFixed(1)} KB`).toBeLessThan(4);
  });
});

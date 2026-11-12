import { describe, expect, it } from "vitest";
import { SUMMARY_LANGUAGES, summarySnapshot } from "./education-summary-consumers";
import { fieldHash, reviewProblems } from "./education-coverage";

const owners = [{ id: "example", name: "Example" }];
const tables = SUMMARY_LANGUAGES.map(language => {
  const entries: Record<string, string> = language === "fr" ? { example: "A scoped summary." } : {};
  return { language, entries };
});

describe("reader-summary audit evidence", () => {
  it("cannot substitute the canonical English record for a changed translated consumer", () => {
    const snapshot = summarySnapshot(owners, ["example"], tables);
    const row = snapshot.records.find(row => row.language === "fr")!;
    const review = { status: "reviewed" as const, auditor: "agent", checkedAt: "2026-11-09", rationale: "Read the selected summary.", points: [{ id: "wording", requirement: "Retain the scoped wording.", status: "covered-draft" as const, remaining: [], evidence: [{ version: snapshot.version, recordId: row.id, field: "text", fieldSha256: fieldHash(row.text), explanation: "Actual translated consumer text." }] }] };
    const catalog = new Map([["proposal-therapeutic:example", { id: "example", kind: "term", name: "Example", text: row.text }]]);
    expect(reviewProblems({ sourceType: "adjacent-concept", review }, catalog)).toContain("wording: missing owner/version proposal-summary-consumers:example-fr");
    catalog.set(`${snapshot.version}:${row.id}`, row);
    expect(reviewProblems({ sourceType: "adjacent-concept", review }, catalog)).toEqual([]);
    catalog.set(`${snapshot.version}:${row.id}`, { ...row, text: "A universal guarantee." });
    expect(reviewProblems({ sourceType: "adjacent-concept", review }, catalog)).toContain("wording: evidence field changed");
  });

  it("retains absent translations and refuses omitted tables or ambiguous canonical owners", () => {
    const snapshot = summarySnapshot(owners, ["example"], tables);
    expect(snapshot.records).toHaveLength(9);
    expect(snapshot.records.find(row => row.language === "de")).toMatchObject({ available: false, text: null });
    expect(() => summarySnapshot(owners, ["example"], tables.slice(1))).toThrow("Expected one summary table");
    expect(() => summarySnapshot([...owners, ...owners], ["example"], tables)).toThrow("found 2");
    expect(() => summarySnapshot(owners, ["unknown"], tables)).toThrow("found 0");
    expect(() => summarySnapshot(owners, ["example", "example"], tables)).toThrow("distinct");
  });
});

import { describe, expect, it } from "vitest";
import { recordBlock, rewriteBlock, rewriteSummary } from "./refresh-trial-registry-figures";

describe("enrolment and primary completion on registry-ingested trials", () => {
  it("updates the figure and says enrolled once the registry counts it as actual", () => {
    const r = rewriteSummary("X is a phase 1 interventional study registered as NCT00000001 by Acme, with 30 participants planned, started 2024-01-02 and due to reach its primary completion in 2027-06-30. Interventions recorded: A.", 30, { enrolment: 19, enrolmentType: "ACTUAL", primaryCompletion: "2026-09-24", primaryCompletionType: "ACTUAL" });
    expect(r.text).toBe("X is a phase 1 interventional study registered as NCT00000001 by Acme, with 19 participants enrolled, started 2024-01-02 and reached its primary completion in 2026-09-24. Interventions recorded: A.");
    expect(r.unmatched).toEqual([]);
  });
  it("keeps the ingest's word where the registry has not moved, and recorded stays recorded", () => {
    const s = "X, with 44 participants recorded, started 2020-12-11 and reached its primary completion in 2024-12-07.";
    expect(rewriteSummary(s, 44, { enrolment: 44, enrolmentType: "ESTIMATED", primaryCompletion: "2024-12-07", primaryCompletionType: "ESTIMATED" }).text).toBe(s);
    expect(rewriteSummary(s.replace("recorded", "enrolled"), 44, { enrolment: 40, enrolmentType: "ESTIMATED" }).text).toContain("with 40 participants enrolled");
  });
  it("reads the one-line shape of the entity waves", () => {
    const src = `export const x = [\n  t({ id: "nct00000003", name: "C", enrolled: 44, tldr: "C.", summary: "C, with 44 participants recorded, started 2020-12-11 and due to reach its primary completion in 2024-12-07.", links: [] }),\n  t({ id: "nct00000004", name: "D", enrolled: 44, summary: "D." }),\n];\n`;
    const b = recordBlock(src, "nct00000003")!;
    const r = rewriteBlock(src.slice(b.start, b.end), { enrolment: 41, enrolmentType: "ACTUAL", primaryCompletion: "2024-11-30", primaryCompletionType: "ACTUAL" });
    expect(r.block).toBe(`  t({ id: "nct00000003", name: "C", enrolled: 41, tldr: "C.", summary: "C, with 41 participants recorded, started 2020-12-11 and reached its primary completion in 2024-11-30.", links: [] }),\n`);
  });
  it("keeps the future tense for a date the registry still estimates", () => {
    const r = rewriteSummary("X, with a registry enrolment figure of 100 participants, started 2025-01-01 and reached its primary completion in 2026-01.", 100, { enrolment: 120, enrolmentType: "ESTIMATED", primaryCompletion: "2027-03", primaryCompletionType: "ESTIMATED" });
    expect(r.text).toBe("X, with a registry enrolment figure of 120 participants, started 2025-01-01 and due to reach its primary completion in 2027-03.");
  });
  it("rewrites the wave 2 sentences with the registry's own word", () => {
    const r = rewriteSummary("Planned enrolment is 420 participants (estimated). The study started in 2025-06-20 and primary completion is expected in 2026-07-30. No results.", 420, { enrolment: 3, enrolmentType: "ACTUAL", primaryCompletion: "2026-08-01", primaryCompletionType: "ACTUAL" });
    expect(r.text).toBe("Planned enrolment is 3 participants (actual). The study started in 2025-06-20 and primary completion was reached in 2026-08-01. No results.");
  });
  it("never touches a number that is not the record's enrolled figure", () => {
    const r = rewriteSummary("A study, with 30 participants planned, of whom 12 participants were in cohort A.", 12, { enrolment: 50, enrolmentType: "ESTIMATED" });
    expect(r.text).toContain("with 30 participants planned");
    expect(r.unmatched.length).toBe(1);
  });
  it("leaves hand-written wording alone and says so", () => {
    const r = rewriteSummary("The trial aims to enrol 200 patients; primary completion 2026-01 (registry).", 200, { enrolment: 250, enrolmentType: "ESTIMATED", primaryCompletion: "2027-01", primaryCompletionType: "ESTIMATED" });
    expect(r.text).toBe("The trial aims to enrol 200 patients; primary completion 2026-01 (registry).");
    expect(r.unmatched.length).toBe(2);
  });
  it("does not write an estimate's wording for an actual count or date", () => {
    const r = rewriteSummary("Enrollment is planned at 182 participants. Primary completion is estimated at 2027-05-31.", 182, { enrolment: 150, enrolmentType: "ACTUAL", primaryCompletion: "2026-05-31", primaryCompletionType: "ACTUAL" });
    expect(r.text).toContain("planned at 182");
    expect(r.unmatched.length).toBe(2);
  });
  it("moves the field and the sentence together, inside one record only", () => {
    const src = `export const x = [\n  { id: "nct00000001", kind: "trial", name: "A", nct: "NCT00000001", enrolled: 30, asOf, tags,\n    summary: "A, with 30 participants planned, started 2024-01-02.",\n    links: [] },\n  { id: "nct00000002", kind: "trial", name: "B", nct: "NCT00000002", enrolled: 30, asOf, tags,\n    summary: "B, with 30 participants planned, started 2024-01-02.",\n    links: [] },\n];\n`;
    const b = recordBlock(src, "nct00000001")!;
    const r = rewriteBlock(src.slice(b.start, b.end), { enrolment: 45, enrolmentType: "ESTIMATED" });
    expect(r.block).toContain("enrolled: 45,");
    expect(r.block).toContain("with 45 participants planned");
    expect(r.block).not.toContain("nct00000002");
    expect(r.changed).toEqual(["enrolled 30 to 45", "enrolment sentence"]);
  });
  it("leaves a record whose figure has its own basis", () => {
    const r = rewriteBlock(`  { id: "a", kind: "trial", enrolled: 30, enrolledBasis: "randomised",\n    summary: "A, with 30 participants planned.",\n    links: [] },\n`, { enrolment: 45, enrolmentType: "ACTUAL" });
    expect(r.changed).toEqual([]);
    expect(r.unmatched.length).toBe(1);
  });
});

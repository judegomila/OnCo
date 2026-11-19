import { describe, expect, it } from "vitest";
import { type CheckResult, type Finding, emptyResult } from "./lib";
import { type Report, prSummary, reportJson, reportMarkdown } from "./report";

const finding = (over: Partial<Finding> = {}): Finding => ({ kind: "us-approvals", type: "indication-withdrawn", severity: "high", recordId: "lurbinectedin", recordKind: "drug", onco: "accelerated approval still open (granted 2020-06-15)", source: "Zepzelca (lurbinectedin): metastatic SCLC | second line: withdrawn on 2026-09-30", url: "https://www.fda.gov/drugs/resources-information-approved-drugs/withdrawn-cancer-accelerated-approvals", date: "2026-09-30", ...over });
const result = (over: Partial<CheckResult>): CheckResult => ({ ...emptyResult("us-approvals", "US approvals (FDA)"), checked: 1750, requests: 5, durationMs: 7000, ...over });
const report: Report = { generated: "2026-11-18", results: [
  result({ kind: "trials", label: "Trial registry drift", checked: 6413, requests: 65, durationMs: 50_000, mechanical: ["src/data/trial-registry-status.ts regenerated: 240 status changes recorded (234 before)."], findings: Array.from({ length: 130 }, (_, i) => finding({ kind: "trials", type: "enrolment", severity: "low", recordId: `nct${String(i).padStart(8, "0")}`, onco: "100 participants (registry figure)", source: "104 (estimated)", url: `https://clinicaltrials.gov/study/NCT${String(i).padStart(8, "0")}`, date: "2026-11-10" })) }),
  result({ findings: [finding(), finding({ type: "notice-drug-not-held", severity: "medium", recordId: undefined, onco: "no record answers to examplinib", source: "FDA approves examplinib", date: "2026-11-05" })], blocked: [{ url: "https://www.fda.gov/x", reason: "refused (403)" }], errors: ["The FDA approval notices page refused the request; notices were not compared."] }),
] };

describe("the report", () => {
  const md = reportMarkdown(report);
  it("gives each row the record, what OnCo says, what the source says, the source address and the date", () => {
    expect(md).toContain("| Record | OnCo says | The source says | Source | Date |");
    expect(md).toContain("| `lurbinectedin` | accelerated approval still open (granted 2020-06-15) | Zepzelca (lurbinectedin): metastatic SCLC \\| second line: withdrawn on 2026-09-30 | [fda.gov](https://www.fda.gov/drugs/resources-information-approved-drugs/withdrawn-cancer-accelerated-approvals) | 2026-09-30 |");
    expect(md).toContain("| not held | no record answers to examplinib |");
  });
  it("groups rows by check and by rule, the most serious first", () => {
    expect(md).toContain("## 1. Trial registry drift");
    expect(md).toContain("## 2. US approvals (FDA)");
    expect(md.indexOf("### Indications the FDA lists as withdrawn that OnCo does not (1)")).toBeLessThan(md.indexOf("### Recent FDA approval notices naming a drug OnCo does not hold (1)"));
  });
  it("cuts a long table and says where the rest is", () => {
    expect(md).toContain("### Enrolment differs from the registry (130)");
    expect(md).toContain("30 more rows of this kind are in the JSON file.");
    expect(md.match(/\| `nct\d{8}` \|/g)).toHaveLength(100);
  });
  it("says what the run changed, what it could not do, and what refused it", () => {
    expect(md).toContain("## Changed by the run itself");
    expect(md).toContain("- Trial registry drift: src/data/trial-registry-status.ts regenerated: 240 status changes recorded (234 before).");
    expect(md).toContain("## Not completed");
    expect(md).toContain("## Blocked sources");
    expect(md).toContain("| US approvals (FDA) | fda.gov | 1 | refused (403) |");
  });
  it("is the same text for the same results", () => {
    expect(reportMarkdown(report)).toBe(md);
  });

  it("has a JSON twin holding every row, with counts by rule", () => {
    const json = reportJson(report) as { generated: string; totals: { findings: number; requests: number }; checks: Array<{ kind: string; counts: Record<string, number>; findings: Finding[]; requests: number; durationSeconds: number }> };
    expect(json.generated).toBe("2026-11-18");
    expect(json.totals).toEqual({ findings: 132, requests: 70 });
    expect(json.checks[0]).toMatchObject({ kind: "trials", counts: { enrolment: 130 }, requests: 65, durationSeconds: 50 });
    expect(json.checks[0].findings).toHaveLength(130);
    expect(json.checks[1].findings[0]).toMatchObject({ type: "indication-withdrawn", recordId: "lurbinectedin", url: finding().url, date: "2026-09-30" });
  });

  it("summarises the counts for the pull request", () => {
    const body = prSummary(report);
    expect(body).toContain("| Trial registry drift | 6,413 | 130 | 0 | 0 | 130 | 0 | 65 | 50 s |");
    expect(body).toContain("- Indications the FDA lists as withdrawn that OnCo does not: 1");
    expect(body).toContain("**Not completed:**");
    expect(body).toContain("No model took part.");
    expect(body).toContain("Sources that refused the request, left alone: US approvals (FDA) 1.");
  });
});

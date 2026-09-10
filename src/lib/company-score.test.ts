import { describe, expect, it } from "vitest";
import { eventDay, modalityClass, scoreCompanies } from "./company-score";
import { graph } from "./graph";

const AS_OF = "2026-09-09";

describe("company score", () => {
  it("ranks every company once, in descending score order", () => {
    const rows = scoreCompanies(AS_OF);
    expect(rows.length).toBe(graph().kind("company").length);
    expect(new Set(rows.map((r) => r.company.id)).size).toBe(rows.length);
    for (let i = 1; i < rows.length; i++) expect(rows[i - 1].score).toBeGreaterThanOrEqual(rows[i].score);
    rows.forEach((r, i) => expect(r.rank).toBe(i + 1));
  });

  it("the score is the sum of the disclosed components", () => {
    for (const r of scoreCompanies(AS_OF)) {
      const sum = r.approvedPoints + r.phase3Points + r.earlyPoints + r.targetPoints + r.modalityPoints + r.regionPoints + r.momentumPoints + r.trialPoints + r.failurePenalty;
      expect(r.score, r.company.id).toBe(sum);
      expect(r.approvedPoints).toBe(6 * r.approved);
      expect(r.phase3Points).toBe(3 * r.phase3);
      expect(r.failurePenalty).toBe(-3 * r.failures);
      expect(r.momentumPoints).toBeLessThanOrEqual(20);
      expect(r.trialPoints).toBeLessThanOrEqual(30);
      expect(r.targetPoints).toBeLessThanOrEqual(40);
    }
  });

  it("large pharma with approved products outscore companies with none", () => {
    const rows = scoreCompanies(AS_OF);
    const merck = rows.find((r) => r.company.id === "merck")!;
    expect(merck.approved).toBeGreaterThan(0);
    expect(merck.regions).toContain("US");
    const none = rows.filter((r) => r.products.length === 0);
    for (const n of none) expect(merck.score).toBeGreaterThan(n.score);
  });

  it("parses loose regulatory event dates", () => {
    expect(eventDay("2026-Q2")).toBe("2026-06-28");
    expect(eventDay("2024-11")).toBe("2024-11-15");
    expect(eventDay("2020-04-22")).toBe("2020-04-22");
    expect(eventDay("2019")).toBe("2019-06-30");
    expect(eventDay("soon")).toBeNull();
  });

  it("collapses modalities into comparable classes", () => {
    expect(modalityClass("ADC")).toBe("ADC");
    expect(modalityClass("Bispecific ADC")).toBe("Bispecific ADC");
    expect(modalityClass("Monoclonal antibody (anti-PD-1)")).toBe("Antibody");
    expect(modalityClass("Small-molecule inhibitor (KRAS G12C)")).toBe("Small molecule");
    expect(modalityClass("CAR-T (CD19)")).toBe("Cell therapy");
    expect(modalityClass("Radioligand therapy (beta)")).toBe("Radiopharmaceutical");
  });
});

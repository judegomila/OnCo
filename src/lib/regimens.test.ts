import { describe, expect, it } from "vitest";
import { regimens } from "@/data/regimens";
import { cycleSummary, dayLabel, numericCycles, regimensFor, totalWeeks, validateRegimens } from "./regimens";

describe("regimen library", () => {
  it("validates against the graph: every cancer, trial and product id resolves", () => {
    expect(() => validateRegimens()).not.toThrow();
    expect(regimens.length).toBeGreaterThanOrEqual(60);
  });

  it("every regimen has a source, components and a plausible cycle", () => {
    for (const r of regimens) {
      expect(r.source.url, r.id).toMatch(/^https:\/\//);
      expect(r.components.length, r.id).toBeGreaterThan(0);
      expect(r.cycleDays, r.id).toBeGreaterThanOrEqual(1);
      expect(r.setting.length, r.id).toBeGreaterThan(10);
      expect(r.name, r.id).not.toMatch(/—/);
    }
  });

  it("rejects a dangling id with a message naming the regimen and field", () => {
    const bad = { ...regimens[0], id: "bad-regimen", cancers: ["no-such-cancer"] };
    expect(() => validateRegimens([bad])).toThrow(/bad-regimen: unknown id "no-such-cancer" in cancers/);
  });

  it("rejects a day outside the cycle", () => {
    const bad = { ...regimens[0], id: "bad-days", components: [{ ...regimens[0].components[0], days: [1, 99] }] };
    expect(() => validateRegimens([bad])).toThrow(/day 99 is outside/);
  });

  it("formats days and cycles", () => {
    expect(dayLabel({ name: "x", dose: "", route: "IV", days: [1] })).toBe("D1");
    expect(dayLabel({ name: "x", dose: "", route: "IV", days: [1, 8, 15] })).toBe("D1, 8, 15");
    expect(dayLabel({ name: "x", dose: "", route: "PO", days: [1, 2, 3, 4, 5] })).toBe("D1-5");
    expect(dayLabel({ name: "x", dose: "", route: "IV", days: [1, 2], infusionHours: 46 })).toBe("D1, 2 (46 h infusion)");
    expect(numericCycles("12 (6 months)")).toBe(12);
    expect(numericCycles("until progression")).toBeNull();
    const folfox = regimens.find((r) => r.id === "mfolfox6")!;
    expect(cycleSummary(folfox)).toBe("every 14 days × 12");
    expect(totalWeeks(folfox)).toBe(24);
  });

  it("finds regimens by product or cancer", () => {
    expect(regimensFor("oxaliplatin").map((r) => r.id)).toContain("mfolfox6");
    expect(regimensFor("pancreatic").map((r) => r.id)).toContain("folfirinox");
    expect(regimensFor("no-such-thing")).toHaveLength(0);
  });
});

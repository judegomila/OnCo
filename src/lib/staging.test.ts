import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { riskScores, stagingSystems } from "@/data/staging";

describe("staging and risk scores", () => {
  it("every cancer and term id resolves", () => {
    const g = graph();
    for (const s of stagingSystems) {
      for (const id of s.cancerIds) expect(g.get(id)?.kind, `${s.id}: ${id}`).toBe("cancer");
      for (const id of s.terms ?? []) expect(g.get(id)?.kind, `${s.id}: ${id}`).toBe("term");
      expect(s.groups.length, s.id).toBeGreaterThan(1);
      expect(s.source.url).toMatch(/^https:\/\//);
    }
    for (const r of riskScores) {
      for (const id of r.cancerIds) expect(g.get(id)?.kind, `${r.id}: ${id}`).toBe("cancer");
      for (const id of r.terms ?? []) expect(g.get(id)?.kind, `${r.id}: ${id}`).toBe("term");
    }
  });

  it("risk-group point ranges are contiguous and cover the possible totals", () => {
    for (const r of riskScores) {
      const max = r.inputs.reduce((s, i) => s + (i.options ? Math.max(...i.options.map((o) => o.points)) : (i.points ?? 0)), 0);
      const min = r.inputs.reduce((s, i) => s + (i.options ? Math.min(...i.options.map((o) => o.points)) : 0), 0);
      const sorted = r.groups.slice().sort((a, b) => a.min - b.min);
      expect(sorted[0].min, r.id).toBe(min);
      expect(sorted[sorted.length - 1].max, r.id).toBeGreaterThanOrEqual(max);
      for (let i = 1; i < sorted.length; i++) expect(sorted[i].min, `${r.id} ${sorted[i].label}`).toBe(sorted[i - 1].max + 1);
    }
  });

  it("R-ISS point device reproduces the published rules", () => {
    const r = riskScores.find((x) => x.id === "r-iss")!;
    const group = (t: number) => r.groups.find((g) => t >= g.min && t <= g.max)!.label;
    expect(group(0)).toBe("R-ISS I"); // ISS I, no FISH, normal LDH
    expect(group(3)).toBe("R-ISS II"); // ISS III alone
    expect(group(1 + 1 + 1)).toBe("R-ISS II"); // ISS II + FISH + LDH
    expect(group(3 + 1)).toBe("R-ISS III"); // ISS III + FISH
  });
});

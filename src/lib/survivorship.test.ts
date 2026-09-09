import { describe, expect, it } from "vitest";
import { entriesForTreatment, SURVIVORSHIP, SYSTEM_ORDER } from "@/data/survivorship";
import { graph } from "./graph";

describe("survivorship registry", () => {
  it("has unique ids and at least one way to reach every entry", () => {
    const ids = SURVIVORSHIP.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const e of SURVIVORSHIP) {
      const reachable = e.matchDrugIds.length > 0 || e.matchTechnologyIds.length > 0 || !!e.matchModalityRe || e.manualPick === true;
      expect(reachable, e.id).toBe(true);
      expect(e.lateEffects.length, e.id).toBeGreaterThan(0);
    }
  });

  it("every late effect has a real-looking source URL, a screening test and an interval", () => {
    for (const e of SURVIVORSHIP) for (const le of e.lateEffects) {
      expect(le.source.url, `${e.id}: ${le.effect}`).toMatch(/^https:\/\/[^\s]+$/);
      expect(le.source.label.length, `${e.id}: ${le.effect}`).toBeGreaterThan(10);
      expect(le.screening.length, `${e.id}: ${le.effect}`).toBeGreaterThan(5);
      expect(le.interval.length, `${e.id}: ${le.effect}`).toBeGreaterThan(3);
      expect(SYSTEM_ORDER, `${e.id}: ${le.effect}`).toContain(le.system);
    }
  });

  it("references only drugs and technologies that exist in the corpus", () => {
    const g = graph();
    for (const e of SURVIVORSHIP) {
      for (const id of e.matchDrugIds) expect(g.get(id)?.kind, `${e.id} -> ${id}`).toBe("drug");
      for (const id of e.matchTechnologyIds) expect(g.get(id)?.kind, `${e.id} -> ${id}`).toBe("technology");
      if (e.matchModalityRe) expect(() => new RegExp(e.matchModalityRe!, "i")).not.toThrow();
    }
  });

  it("matches by id and by modality", () => {
    expect(entriesForTreatment("doxorubicin", "Cytotoxic chemotherapy (anthracycline)").map((e) => e.id)).toContain("anthracyclines");
    expect(entriesForTreatment("some-new-drug", "Monoclonal antibody (anti-PD-1)").map((e) => e.id)).toEqual(["checkpoint-inhibitors"]);
    expect(entriesForTreatment("allogeneic-hsct", undefined).map((e) => e.id)).toEqual(["hsct"]);
    expect(entriesForTreatment("unknown", undefined)).toEqual([]);
  });

  it("uses no em-dashes in reader-facing copy", () => {
    const text = JSON.stringify(SURVIVORSHIP);
    expect(text).not.toContain("—");
  });
});

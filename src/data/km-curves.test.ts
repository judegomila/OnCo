import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import { KM_CURVES, endpointFamily } from "./km-curves";

describe("km-curves side data", () => {
  it("every curve points at a trial in the corpus", () => {
    const g = graph();
    for (const c of KM_CURVES) {
      const t = g.get(c.trial);
      expect(t, `unknown trial ${c.trial}`).toBeTruthy();
      expect(t?.kind, c.trial).toBe("trial");
    }
  });

  it("landmarks are in time order, within 0-100%, non-increasing, and every curve cites a source", () => {
    for (const c of KM_CURVES) {
      expect(c.sources.length, `${c.trial} ${c.endpoint} has a source`).toBeGreaterThan(0);
      for (const s of c.sources) expect(s.startsWith("https://"), s).toBe(true);
      expect(c.arms.length, `${c.trial} ${c.endpoint} arms`).toBeGreaterThanOrEqual(2);
      for (const a of c.arms) {
        let lastT = 0, lastS = 100;
        for (const [t, s] of a.points) {
          expect(t, `${c.trial} ${a.name} time order`).toBeGreaterThan(lastT);
          expect(s, `${c.trial} ${a.name} range`).toBeGreaterThanOrEqual(0);
          expect(s, `${c.trial} ${a.name} range`).toBeLessThanOrEqual(100);
          expect(s, `${c.trial} ${a.name} non-increasing`).toBeLessThanOrEqual(lastS);
          lastT = t; lastS = s;
        }
        if (a.median !== undefined) expect(a.median, `${c.trial} ${a.name} median`).toBeGreaterThan(0);
      }
      expect(endpointFamily(c.endpoint), `${c.trial} ${c.endpoint} family matches label`).toBe(c.family);
    }
  });
});

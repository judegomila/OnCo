import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import { JOURNEYS, layoutPhases } from "./journeys";

describe("treatment journeys", () => {
  it("reference real cancers, drugs and technologies, with sources and sane durations", () => {
    const g = graph();
    const ids = new Set<string>();
    for (const j of JOURNEYS) {
      expect(ids.has(j.id), `duplicate ${j.id}`).toBe(false); ids.add(j.id);
      expect(g.get(j.cancer)?.kind, `${j.id} cancer`).toBe("cancer");
      expect(j.sources.length, `${j.id} sources`).toBeGreaterThan(0);
      expect(j.phases.length, `${j.id} phases`).toBeGreaterThanOrEqual(4);
      const phaseIds = new Set(j.phases.map((p) => p.id));
      for (const d of j.decisions) expect(phaseIds.has(d.after), `${j.id} decision after ${d.after}`).toBe(true);
      for (const p of j.phases) {
        expect(p.weeks[0], `${j.id}/${p.id} min weeks`).toBeGreaterThan(0);
        expect(p.weeks[1], `${j.id}/${p.id} max ≥ min`).toBeGreaterThanOrEqual(p.weeks[0]);
        for (const id of p.drugs ?? []) expect(g.get(id)?.kind, `${j.id}/${p.id} drug ${id}`).toBe("drug");
        for (const id of p.technologies ?? []) expect(g.get(id)?.kind, `${j.id}/${p.id} technology ${id}`).toBe("technology");
        if (p.source) expect(p.source.startsWith("https://"), p.source).toBe(true);
      }
      const rows = layoutPhases(j);
      for (let i = 1; i < rows.length; i++) expect(rows[i].start, `${j.id} monotone starts`).toBeGreaterThanOrEqual(rows[i - 1].phase.parallel ? 0 : rows[i - 1].start);
    }
  });
});

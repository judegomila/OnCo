import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import { BODY_REGIONS } from "./body-regions";
import { SPREAD, SPREAD_ANCHORS } from "./spread";

describe("metastatic spread side data", () => {
  it("every entry names a cancer in the corpus, a body-map primary region, known site anchors and sources", () => {
    const g = graph();
    const regions = new Set(BODY_REGIONS.map((r) => r.id));
    const anchors = new Set(Object.keys(SPREAD_ANCHORS));
    const seen = new Set<string>();
    for (const s of SPREAD) {
      expect(seen.has(s.cancer), `duplicate ${s.cancer}`).toBe(false); seen.add(s.cancer);
      expect(g.get(s.cancer)?.kind, s.cancer).toBe("cancer");
      expect(regions.has(s.primary), `${s.cancer} primary ${s.primary}`).toBe(true);
      expect(s.sources.length, `${s.cancer} sources`).toBeGreaterThan(0);
      expect(s.sites.length, `${s.cancer} sites`).toBeGreaterThanOrEqual(3);
      for (const site of s.sites) expect(regions.has(site.region) || anchors.has(site.region), `${s.cancer} site region ${site.region}`).toBe(true);
      expect(s.sites.some((x) => x.tier === "most common"), `${s.cancer} has a most-common site`).toBe(true);
    }
  });
});

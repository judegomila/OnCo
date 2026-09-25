import type { Graph } from "./graph";
import { routeFor } from "./kinds";
import type { BodyRegion } from "@/data/body-regions";
import type { BodyCancer, BodyFamily } from "@/components/BodyMap";

/**
 * The phone entry point on the home page reuses the body map (src/components/BodyMap.tsx) with, per region, the
 * counts of what OnCo holds for the cancers arising there: distinct trials, products and ideas across those cancers
 * (src/lib/graph.ts, forCancer), and the region's lead cancer, whose Explore view the count pills open.
 */
export function bodyEntry(g: Graph, regions: BodyRegion[]): { cancers: Record<string, BodyCancer>; families: Record<string, BodyFamily> } {
  const cancers: Record<string, BodyCancer> = {};
  const families: Record<string, BodyFamily> = {};
  for (const r of regions) {
    const trials = new Set<string>(), drugs = new Set<string>(), ideas = new Set<string>();
    let lead = r.cancers[0] ?? "", leadN = -1;
    for (const id of r.cancers) {
      const c = g.must(id);
      const near = g.forCancer(id);
      const d = near.get("drug") ?? [];
      for (const t of near.get("trial") ?? []) trials.add(t.id);
      for (const x of d) drugs.add(x.id);
      for (const i of near.get("idea") ?? []) ideas.add(i.id);
      if (!cancers[id]) cancers[id] = { id, name: c.name, tldr: "", route: routeFor(c), products: d.length };
      if (d.length > leadN) { lead = id; leadN = d.length; }
    }
    families[r.id] = { cancers: r.cancers.length, trials: trials.size, drugs: drugs.size, ideas: ideas.size, lead };
  }
  return { cancers, families };
}

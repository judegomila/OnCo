import { describe, expect, it } from "vitest";
import { describePath, findPaths, hopLabel, type PathData } from "./paths";
import { pathData } from "./paths-data";

const toy: PathData = {
  nodes: [
    { id: "hippo", kind: "pathway", name: "Hippo", route: "/pathways/hippo/" },
    { id: "yap", kind: "target", name: "YAP", route: "/targets/yap/" },
    { id: "trop2", kind: "target", name: "TROP2", route: "/targets/trop2/" },
    { id: "sg", kind: "drug", name: "Sacituzumab govitecan", route: "/drugs/sg/" },
    { id: "tnbc", kind: "cancer", name: "TNBC", route: "/cancers/tnbc/" },
    { id: "hub", kind: "section", name: "ADCs front", route: "/fronts/hub/" },
  ],
  vias: ["pathway-node", "targets", "cancers", "sections"],
  edges: [
    [0, 1, 0], // hippo -> yap (pathway node)
    [1, 2, 1], // yap -> trop2 (targets)
    [3, 2, 1], // sg -> trop2
    [3, 4, 2], // sg -> tnbc
    [0, 5, 3], [3, 5, 3], // both link the hub section
  ],
};

describe("findPaths", () => {
  it("finds the shortest labelled path and names each hop", () => {
    const paths = findPaths(toy, 0, 3, 3);
    // Only the two-hop route through the shared front is shortest; the YAP route is three hops.
    expect(paths.length).toBe(1);
    expect(describePath(toy, paths[0])).toBe("Hippo -[links section]-> ADCs front -[section of]-> Sacituzumab govitecan");
  });

  it("walks typed relationships in both directions when hubs are absent", () => {
    const noHub: PathData = { ...toy, edges: toy.edges.filter(([, b]) => b !== 5) };
    const paths = findPaths(noHub, 0, 3, 3);
    expect(paths.length).toBe(1);
    expect(describePath(noHub, paths[0])).toBe("Hippo -[pathway node]-> YAP -[links target]-> TROP2 -[target of]-> Sacituzumab govitecan");
    expect(paths[0].hops.map((h) => h.forward)).toEqual([true, true, false]);
  });

  it("returns nothing for the same node or unreachable pairs", () => {
    expect(findPaths(toy, 1, 1)).toEqual([]);
    const isolated: PathData = { nodes: [toy.nodes[0], toy.nodes[1]], vias: [], edges: [] };
    expect(findPaths(isolated, 0, 1)).toEqual([]);
  });

  it("labels hops in both directions", () => {
    expect(hopLabel("targets", true, "drug", "target")).toBe("links target");
    expect(hopLabel("targets", false, "target", "drug")).toBe("target of");
    expect(hopLabel("standardOfCare", false, "drug", "cancer")).toBe("standard of care for");
  });
});

describe("corpus paths", () => {
  it("connects a pathway to an ADC within a few hops", () => {
    const data = pathData();
    const idx = new Map(data.nodes.map((n, i) => [n.id, i]));
    const from = idx.get("hippo") ?? idx.get("pi3k-akt-mtor") ?? 0;
    const to = idx.get("sacituzumab-govitecan")!;
    const paths = findPaths(data, from, to, 3);
    expect(paths.length).toBeGreaterThan(0);
    expect(paths[0].hops.length).toBeLessThanOrEqual(6);
    expect(paths[0].hops[paths[0].hops.length - 1].node).toBe(to);
  });
});

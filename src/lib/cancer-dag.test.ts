import { describe, expect, it } from "vitest";
import { findCycles } from "./dag";
import { HISTOLOGY_PREFIX, METRICS, SYSTEM_PREFIX, buildCancerDag, cancerDag, cancerDagExport, layoutCancerDag } from "./cancer-dag";
import type { Cancer } from "./schema";

/** A minimal cancer record; only the fields the DAG reads are meaningful. */
const cancer = (id: string, group: string, extra: Partial<Cancer> = {}): Cancer => ({
  id, kind: "cancer", name: extra.name ?? id, aka: [], tldr: "t", summary: "s", asOf: "2026-01-01", links: [], tags: [], related: [],
  cancers: [], sections: [], technologies: [], targets: [], drugs: [], companies: [], institutions: [], pathways: [], terms: [], trials: [], people: [],
  bottlenecks: [], keyPapers: [], journals: [], dependsOn: [], notes: [], group, subtypes: [], biomarkers: [], standardOfCare: [], stateOfArt: [],
  history: [], pipeline: [], openProblems: [], ...extra,
});

const FIXTURE: Cancer[] = [
  cancer("sarcoma", "sarcoma", { name: "Sarcoma" }),
  cancer("gist", "gastrointestinal", { name: "GIST", parent: "sarcoma" }),
  cancer("colorectal", "gastrointestinal", { name: "Colorectal cancer" }),
  cancer("rectal", "gastrointestinal", { name: "Rectal cancer", parent: "colorectal" }),
  cancer("lung-adeno", "lung", { name: "Lung adenocarcinoma" }),
  cancer("pancreatic", "gastrointestinal", { name: "Pancreatic adenocarcinoma" }),
  cancer("nsclc", "lung", { name: "Non-small-cell lung cancer" }),
];
const links = (c: Cancer) => ({ trials: c.id === "rectal" ? ["t1", "t2"] : c.id === "colorectal" ? ["t1"] : [], drugs: c.id === "gist" ? ["imatinib"] : [], approvals: c.id === "gist" ? ["imatinib"] : [], ideas: [] });
const small = buildCancerDag(FIXTURE, links);

describe("cancer DAG on a fixture", () => {
  it("draws system, parent and histology edges once each along a chain", () => {
    const e = small.edges.map((x) => `${x.from}>${x.to}`);
    expect(e).toContain("system:sarcoma>sarcoma");
    expect(e).toContain("sarcoma>gist");
    // GIST is gastrointestinal by site and a sarcoma by parent: two parents, one cancer.
    expect(e).toContain("system:gastrointestinal>gist");
    expect(small.byId.get("gist")!.parents).toEqual(["sarcoma", "system:gastrointestinal"]);
    // Rectal cancer shares colorectal's system, so no second system edge.
    expect(e).not.toContain("system:gastrointestinal>rectal");
    expect(e).toContain("colorectal>rectal");
    // Adenocarcinoma spans lung and GI, so the histology node survives.
    expect(e).toContain("histology:adenocarcinoma>lung-adeno");
    expect(e).toContain("histology:adenocarcinoma>pancreatic");
    expect(small.stats).toMatchObject({ systems: 3, histologies: 1, cancers: 7, subtypes: 2, multiParent: 3, crossSystem: 1 });
  });

  it("layers groupings first, then cancers, then subtypes", () => {
    expect(small.byId.get("system:lung")!.depth).toBe(0);
    expect(small.byId.get("histology:adenocarcinoma")!.depth).toBe(0);
    expect(small.byId.get("colorectal")!.depth).toBe(1);
    expect(small.byId.get("rectal")!.depth).toBe(2);
    expect(small.layers[0]).toEqual(expect.arrayContaining(["system:lung", "histology:adenocarcinoma"]));
  });

  it("counts distinct linked ids over a node and everything beneath it", () => {
    expect(small.byId.get("rectal")!.counts.trials).toBe(2);
    expect(small.byId.get("colorectal")!.counts.trials).toBe(2);
    expect(small.byId.get("system:gastrointestinal")!.counts).toEqual({ trials: 2, drugs: 1, approvals: 1, ideas: 0 });
    expect(small.byId.get("system:sarcoma")!.counts.drugs).toBe(1);
  });

  it("lays out every node inside the canvas with at least a row between neighbours in a column", () => {
    const lay = layoutCancerDag(small, { rowH: 20 });
    for (const n of small.nodes) {
      const p = lay.pos[n.id];
      expect(p, n.id).toBeDefined();
      expect(p.y).toBeGreaterThanOrEqual(0);
      expect(p.y).toBeLessThanOrEqual(lay.height);
      expect(p.x + p.w).toBeLessThanOrEqual(lay.width);
    }
    for (const l of small.layers) for (let i = 1; i < l.length; i++) expect(lay.pos[l[i]].y - lay.pos[l[i - 1]].y).toBeGreaterThanOrEqual(20 - 1e-6);
  });
});

describe("cancer DAG over the corpus", () => {
  const d = cancerDag();

  it("has no cycles", () => {
    expect(findCycles(d.dag)).toEqual([]);
  });

  it("reaches every cancer from an organ system", () => {
    const fromSystem = new Set<string>();
    const stack = d.nodes.filter((n) => n.layer === "system").map((n) => n.id);
    while (stack.length) { const id = stack.pop()!; for (const ch of d.dag.down.get(id) ?? []) if (!fromSystem.has(ch)) { fromSystem.add(ch); stack.push(ch); } }
    const missing = d.nodes.filter((n) => (n.layer === "cancer" || n.layer === "subtype") && !fromSystem.has(n.id)).map((n) => n.id);
    expect(missing).toEqual([]);
    expect(d.stats.cancers).toBeGreaterThan(300);
  });

  it("keeps every count a non-negative integer and every grouping node non-empty", () => {
    for (const n of d.nodes) {
      for (const m of METRICS) { expect(Number.isInteger(n.counts[m]), `${n.id} ${m}`).toBe(true); expect(n.counts[m]).toBeGreaterThanOrEqual(0); }
      if (n.id.startsWith(SYSTEM_PREFIX) || n.id.startsWith(HISTOLOGY_PREFIX)) expect(n.children.length, n.id).toBeGreaterThan(0);
    }
  });

  it("is a DAG rather than a tree: some cancers sit under more than one node", () => {
    expect(d.stats.multiParent).toBeGreaterThan(0);
    expect(d.stats.edges).toBeGreaterThan(d.stats.nodes - 1);
  });

  it("exports plain data with the same node and edge counts", () => {
    const x = cancerDagExport(d);
    expect(x.nodes.length).toBe(d.stats.nodes);
    expect(x.edges.length).toBe(d.stats.edges);
    expect(JSON.parse(JSON.stringify(x)).stats).toEqual(d.stats);
  });
});

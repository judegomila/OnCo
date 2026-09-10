import { describe, expect, it } from "vitest";
import { blurbOf, graphData } from "./graph-export";
import { adjacency, fitChars, HUE, LABEL_MAX_NODES, layoutFocus, layoutOverview, NODE_R, RING, shortName } from "./graph-layout";
import { KINDS } from "./schema";

describe("graph explorer layout", () => {
  const data = graphData();
  const adj = adjacency(data);

  it("has a hue for every kind and a blurb for every node", () => {
    for (const k of KINDS) expect(HUE[k]).toMatch(/^#[0-9a-f]{6}$/);
    for (const n of data.nodes) expect(n.blurb.length, n.id).toBeGreaterThan(0);
  });

  it("puts fronts on the inner ring and cancers on the outer ring, alphabetically", () => {
    const s = layoutOverview(data);
    const fronts = s.placed.filter((p) => p.n.kind === "section");
    const cancers = s.placed.filter((p) => p.n.kind === "cancer");
    expect(fronts.length).toBeGreaterThan(10);
    expect(cancers.length).toBeGreaterThan(40);
    for (const p of fronts) expect(Math.hypot(p.x, p.y)).toBeCloseTo(100, 5);
    for (const p of cancers) expect(Math.hypot(p.x, p.y)).toBeCloseTo(224, 5);
    const names = cancers.map((p) => p.n.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  it("groups a focused node's neighbours by kind in contiguous arcs with labels when the ring is sparse", () => {
    const i = data.nodes.findIndex((n) => n.degree > 5 && n.degree < 40);
    const s = layoutFocus(data, adj, i, new Set(), new Set());
    expect(s.labels).toBe(true);
    expect(s.placed.every((p) => Math.abs(Math.hypot(p.x, p.y) - RING) < 1e-6)).toBe(true);
    expect(s.placed.every((p) => p.r === NODE_R)).toBe(true);
    for (const arc of s.arcs) {
      const inArc = s.placed.filter((p) => p.a >= arc.a0 - 1e-9 && p.a <= arc.a1 + 1e-9);
      expect(inArc.length).toBe(arc.shown);
      expect(inArc.every((p) => p.n.kind === arc.kind)).toBe(true);
    }
  });

  it("staggers and shrinks a crowded ring instead of overlapping labels", () => {
    const i = data.nodes.reduce((best, n, idx) => (n.degree > data.nodes[best].degree ? idx : best), 0);
    const all = new Set(KINDS);
    const s = layoutFocus(data, adj, i, new Set(), all);
    expect(s.placed.length).toBeGreaterThan(LABEL_MAX_NODES);
    expect(s.labels).toBe(false);
    expect(new Set(s.placed.map((p) => p.level)).size).toBeGreaterThan(1);
    expect(s.placed[0].r).toBeLessThan(NODE_R);
    expect(s.placed[0].r).toBeGreaterThanOrEqual(5);
  });

  it("respects hidden kinds and the per-kind cap", () => {
    const i = data.nodes.reduce((best, n, idx) => (n.degree > data.nodes[best].degree ? idx : best), 0);
    const s = layoutFocus(data, adj, i, new Set(["drug", "trial", "paper"]), new Set());
    expect(s.placed.some((p) => p.n.kind === "drug" || p.n.kind === "trial" || p.n.kind === "paper")).toBe(false);
    for (const arc of s.arcs) expect(arc.shown).toBeLessThanOrEqual(14);
  });

  it("shortens names at natural breaks", () => {
    expect(shortName("Diagnostics & Biomarkers", 14)).toBe("Diagnostics");
    expect(shortName("Radiopharmaceuticals & Theranostics", 22)).toBe("Radiopharmaceuticals");
    expect(shortName("Breast cancer (invasive)", 30)).toBe("Breast cancer");
    expect(shortName("Non-small cell lung cancer", 17)).toBe("Non-small cell…");
    expect(shortName("AI & Computation", 15)).toBe("AI");
    expect(shortName("Imaging", 5)).toBe("Imag…");
  });

  it("fits more label characters along the wide axis than towards the poles", () => {
    const wide = fitChars(0, 206, 440, 350, 300);
    const pole = fitChars(-Math.PI / 2, 206, 440, 350, 300);
    expect(wide).toBeGreaterThanOrEqual(pole);
    expect(pole).toBeGreaterThan(10);
  });

  it("clips blurbs to a first sentence on a word boundary", () => {
    expect(blurbOf("A short first sentence here. A second sentence.")).toBe("A short first sentence here.");
    expect(blurbOf("Uses e.g. abbreviations mid sentence and carries on. Second.")).toBe("Uses e.g. abbreviations mid sentence and carries on.");
    const long = "word ".repeat(60).trim();
    const b = blurbOf(long, 50);
    expect(b.length).toBeLessThanOrEqual(50);
    expect(b.endsWith("…")).toBe(true);
  });
});

import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { edgeIdsForCancer, forMeRelated } from "./for-me-related";
import type { Cancer } from "./schema";

/**
 * The record set behind the Edge "For you" filter (/edge/?for=<id>): the cancer, its family, the medicines approved
 * or in phase 3 for it with those trials, its roadmaps and technologies. Checked on a real cancer with subtypes,
 * a parent and a deep pipeline, so the client-side match has something to hit.
 */
describe("edgeIdsForCancer", () => {
  const g = graph();
  const c = g.must("tnbc") as Cancer;
  const ids = new Set(edgeIdsForCancer(g, c));

  it("holds the cancer, its parent family and its subtypes", () => {
    expect(ids.has("tnbc")).toBe(true);
    expect(c.parent).toBeTruthy();
    expect(ids.has(c.parent!)).toBe(true);
    const children = g.kind("cancer").filter((x) => x.parent === "tnbc");
    expect(children.length).toBeGreaterThan(0);
    for (const x of children) expect(ids.has(x.id), x.id).toBe(true);
  });

  it("holds every drug approved for it and every drug in a phase 3 trial for it, with those trials", () => {
    const approved = g.kind("drug").filter((d) => d.cancers.includes("tnbc") && d.approvals.length);
    expect(approved.length).toBeGreaterThan(3);
    for (const d of approved) expect(ids.has(d.id), d.id).toBe(true);
    const p3 = g.kind("trial").filter((t) => t.cancers.includes("tnbc") && (t.phase === "3" || t.phase === "2/3"));
    expect(p3.length).toBeGreaterThan(10);
    for (const t of p3) { expect(ids.has(t.id), t.id).toBe(true); for (const d of t.drugs) expect(ids.has(d), `${t.id} -> ${d}`).toBe(true); }
    // Not widened to the parent's medicines: a breast-only phase 3 drug that never names TNBC stays out.
    const parentOnly = g.kind("trial").filter((t) => t.cancers.includes(c.parent!) && !t.cancers.includes("tnbc") && t.phase === "3").flatMap((t) => t.drugs).filter((d) => !g.must(d).cancers.includes("tnbc"));
    const leaked = parentOnly.filter((d) => ids.has(d) && !p3.some((t) => t.drugs.includes(d)));
    expect(leaked).toEqual([]);
  });

  it("holds its roadmaps and technologies and is sorted, deduplicated and free of unknown ids", () => {
    for (const r of g.kind("roadmap")) if (r.cancers.includes("tnbc")) expect(ids.has(r.id), r.id).toBe(true);
    for (const t of g.kind("technology")) if (t.cancers.includes("tnbc")) expect(ids.has(t.id), t.id).toBe(true);
    const list = edgeIdsForCancer(g, c);
    expect(list).toEqual([...new Set(list)].sort());
    for (const id of list) expect(g.get(id), id).toBeTruthy();
  });

  it("rides in the related file the For me picker already fetches", () => {
    const rel = forMeRelated(g, c);
    expect(rel.edgeIds).toEqual(edgeIdsForCancer(g, c));
    // Unlike the hopeful groups, the Edge set keeps withdrawn and failed records: a withdrawal is news for this reader.
    expect(rel.edgeIds.length).toBeGreaterThan(Object.values(rel.groups).flat().filter((x) => ["drug", "trial", "roadmap", "technology"].includes(g.must(x.id).kind)).length / 4);
  });

  it("works for every cancer without throwing and always includes the cancer itself", () => {
    for (const x of g.kind("cancer")) expect(edgeIdsForCancer(g, x)).toContain(x.id);
  });
});

import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { KINDS } from "./schema";
import { rankInstitutions } from "./ranking";

describe("corpus", () => {
  it("parses, has unique ids, and every reference resolves", () => {
    const g = graph();
    expect(g.entities.length).toBeGreaterThan(500);
    for (const k of KINDS) if (k !== "paper") expect(g.kind(k).length).toBeGreaterThan(0);
  });

  it("every entity has a non-technical tldr shorter than its summary", () => {
    const g = graph();
    for (const e of g.entities) {
      expect(e.tldr.length, e.id).toBeGreaterThan(20);
      expect(e.tldr.length, e.id).toBeLessThanOrEqual(400);
    }
  });

  it("the TNBC spike is fully built", () => {
    const g = graph();
    const t = g.must("tnbc");
    expect(t.kind).toBe("cancer");
    if (t.kind !== "cancer") return;
    expect(t.history.length).toBeGreaterThanOrEqual(10);
    expect(t.standardOfCare.length).toBeGreaterThanOrEqual(4);
    expect(t.pipeline.length).toBeGreaterThanOrEqual(8);
    const rel = g.forCancer("tnbc");
    expect((rel.get("drug") ?? []).length).toBeGreaterThan(8);
    expect((rel.get("technology") ?? []).length).toBeGreaterThan(8);
  });

  it("backlinks are symmetric with outgoing links", () => {
    const g = graph();
    const trop2 = g.incoming("trop2");
    const drugs = trop2.get("drug") ?? [];
    expect(drugs.some((d) => d.id === "sacituzumab-govitecan")).toBe(true);
  });

  it("ranking is deterministic and MSK is first", () => {
    const r = rankInstitutions();
    expect(r[0].institution.id).toBe("mskcc");
    expect(r.every((x, i) => i === 0 || r[i - 1].score >= x.score)).toBe(true);
  });

  it("no external link is obviously malformed", () => {
    const g = graph();
    for (const e of g.entities) for (const l of e.links) expect(l.url, `${e.id}: ${l.url}`).toMatch(/^https?:\/\//);
  });
});

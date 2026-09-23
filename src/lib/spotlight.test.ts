import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { KIND_META } from "./kinds";
import { clip, rankForSpotlight, spotlightFile, spotlightSets } from "./spotlight";
import { SPOTLIGHT_KINDS, dayOfYear, parseSpotlightQuery, spotlightHref, spotlightKindFor, spotlightNeighbours } from "./spotlight-schedule";

describe("spotlight schedule", () => {
  it("covers every kind exactly once over one cycle of consecutive days", () => {
    const start = new Date(2026, 0, 1);
    const seen = new Set<string>();
    for (let i = 0; i < SPOTLIGHT_KINDS.length; i++) seen.add(spotlightKindFor(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)));
    expect([...seen].sort()).toEqual([...SPOTLIGHT_KINDS].sort());
    // And over a whole year, every kind gets its turn.
    const year = new Set<string>();
    for (let i = 0; i < 365; i++) year.add(spotlightKindFor(new Date(2026, 0, 1 + i)));
    expect(year.size).toBe(SPOTLIGHT_KINDS.length);
  });

  it("gives the same kind for the same local date whatever the time of day, and a different one the next day", () => {
    const morning = new Date(2026, 8, 23, 0, 30);
    const night = new Date(2026, 8, 23, 23, 45);
    expect(spotlightKindFor(morning)).toBe(spotlightKindFor(night));
    expect(spotlightKindFor(new Date(2026, 8, 24))).not.toBe(spotlightKindFor(morning));
    expect(dayOfYear(new Date(2026, 0, 1))).toBe(0);
    expect(dayOfYear(new Date(2026, 11, 31))).toBe(364);
    // Across the spring DST change the day count still steps by one.
    expect(dayOfYear(new Date(2026, 2, 30)) - dayOfYear(new Date(2026, 2, 28))).toBe(2);
  });

  it("walks the rotation in both directions and wraps", () => {
    expect(spotlightNeighbours(SPOTLIGHT_KINDS[0]).prev).toBe(SPOTLIGHT_KINDS.at(-1));
    expect(spotlightNeighbours(SPOTLIGHT_KINDS.at(-1)!).next).toBe(SPOTLIGHT_KINDS[0]);
    for (const k of SPOTLIGHT_KINDS) {
      const { prev, next } = spotlightNeighbours(k);
      expect(spotlightNeighbours(prev).next).toBe(k);
      expect(spotlightNeighbours(next).prev).toBe(k);
    }
  });

  it("reads the override from the query by kind id, route or plural and ignores unknown values", () => {
    expect(parseSpotlightQuery("?spotlight=drug")).toBe("drug");
    expect(parseSpotlightQuery("?spotlight=drugs")).toBe("drug");
    expect(parseSpotlightQuery("?spotlight=key-papers")).toBe("paper");
    expect(parseSpotlightQuery("?spotlight=Trials")).toBe("trial");
    expect(parseSpotlightQuery("?spotlight=term")).toBeNull();
    expect(parseSpotlightQuery("?spotlight=")).toBeNull();
    expect(parseSpotlightQuery("")).toBeNull();
    expect(spotlightHref("drug", "drug")).toBe("/");
    expect(spotlightHref("drug", "cancer")).toBe("/?spotlight=drug");
  });
});

describe("spotlight sets", () => {
  const g = graph();
  const sets = spotlightSets(g);

  it("has one set per kind in rotation, each with a hero of that kind, three facts, pills and two runners-up", () => {
    expect(Object.keys(sets).sort()).toEqual([...SPOTLIGHT_KINDS].sort());
    for (const k of SPOTLIGHT_KINDS) {
      const s = sets[k];
      expect(s.kind).toBe(k);
      expect(s.label).toBe(KIND_META[k].title ?? KIND_META[k].plural);
      expect(s.hero.kind).toBe(k);
      expect(s.hero.route).toBe(`/${KIND_META[k].route}/${s.hero.id}/`);
      expect(s.hero.tldr.length, k).toBeGreaterThan(20);
      expect(s.hero.facts, k).toHaveLength(3);
      for (const f of s.hero.facts) { expect(f.kicker.length).toBeGreaterThan(0); expect(f.text.length).toBeGreaterThan(0); expect(f.text.length).toBeLessThanOrEqual(240); }
      expect(s.hero.pills.length, k).toBeGreaterThan(0);
      expect(s.hero.pills.length).toBeLessThanOrEqual(8);
      for (const p of s.hero.pills) { expect(p.kind).not.toBe("term"); expect(p.kind).not.toBe("journal"); expect(g.get(p.id)?.name).toBe(p.name); }
      expect(s.runnersUp).toHaveLength(2);
      expect(new Set([s.hero.id, ...s.runnersUp.map((r) => r.id)]).size).toBe(3);
    }
  });

  it("picks the most connected record of each kind, ties by prose length", () => {
    for (const k of SPOTLIGHT_KINDS) {
      const ranked = rankForSpotlight(g, k);
      expect(sets[k].hero.id).toBe(ranked[0].id);
      expect(sets[k].runnersUp.map((r) => r.id)).toEqual(ranked.slice(1, 3).map((e) => e.id));
      const n = (id: string) => [...g.neighbours(id).values()].reduce((a, l) => a + l.length, 0);
      expect(n(ranked[0].id)).toBeGreaterThanOrEqual(n(ranked[1].id));
      expect(sets[k].hero.connected).toBe(n(ranked[0].id));
    }
    // The heroes readers would expect: the lung cancer page, pembrolizumab, checkpoint inhibitors, PD-1.
    expect(sets.cancer.hero.id).toBe("nsclc");
    expect(sets.drug.hero.id).toBe("pembrolizumab");
    expect(sets.technology.hero.id).toBe("checkpoint-inhibitor");
    expect(sets.target.hero.id).toBe("pd1");
  });

  it("writes a small file that states the rule, the schedule and the build day's kind", () => {
    const file = spotlightFile(g, new Date(2026, 8, 23));
    expect(file.kinds).toEqual([...SPOTLIGHT_KINDS]);
    expect(file.buildKind).toBe(spotlightKindFor(new Date(2026, 8, 23)));
    expect(file.rule).toContain("most connected");
    expect(file.schedule).toContain("?spotlight=");
    const json = JSON.stringify(file);
    expect(json).not.toMatch(/—/);
    expect(Buffer.byteLength(json, "utf8")).toBeLessThan(48 * 1024);
    // Deterministic for the same graph and date.
    expect(JSON.stringify(spotlightFile(g, new Date(2026, 8, 23)))).toBe(json);
  });

  it("clips at a word boundary", () => {
    expect(clip("short", 20)).toBe("short");
    const long = clip("alpha beta gamma delta epsilon zeta eta theta", 24);
    expect(long.length).toBeLessThanOrEqual(24);
    expect(long.endsWith("…")).toBe(true);
    expect(long).not.toMatch(/\s…$/);
  });
});

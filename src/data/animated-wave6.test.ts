import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import { WAVE6 } from "./animated-wave6";
import { WAVE3 } from "./animated-wave3";
import { WAVE4 } from "./animated-wave4";
import { WAVE5 } from "./animated-wave5";
import { ANIMATED } from "./animated";
import { schematicFor } from "./schematics";

describe("wave 6 animated technology schematics", () => {
  const keys = Object.keys(WAVE6);

  it("covers forty technologies, every key a real technology id not already in waves 3 to 5, all registered in ANIMATED", () => {
    expect(keys.length).toBe(40);
    const g = graph();
    for (const k of keys) {
      const e = g.get(k);
      expect(e?.kind, `${k} is a technology`).toBe("technology");
      expect(k in WAVE3 || k in WAVE4 || k in WAVE5, `${k} not in an earlier wave`).toBe(false);
      expect(k in ANIMATED, `${k} registered`).toBe(true);
      expect(schematicFor(k, (e as unknown as { sections: string[] }).sections).specific, `${k} is specific`).toBe(true);
    }
  });

  it("every scene stays under 500 points, keeps finite coordinates and matching point/alpha counts, and captions four phases", () => {
    for (const [key, build] of Object.entries(WAVE6)) {
      const m = build();
      expect(m.points.length, `${key} points`).toBeLessThan(500);
      expect(m.points.length, `${key} has geometry`).toBeGreaterThan(20);
      expect(m.animate, `${key} has animate`).toBeTruthy();
      expect(m.animate!.duration).toBeGreaterThanOrEqual(12);
      expect(m.animate!.duration).toBeLessThanOrEqual(14);
      expect(m.labels?.length ?? 0, `${key} labels`).toBeGreaterThanOrEqual(3);
      expect(m.labels?.length ?? 0, `${key} labels`).toBeLessThanOrEqual(4);
      const captions = new Set<string>();
      for (const t of [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.99]) {
        const f = m.animate!.frame(t);
        expect(f.caption, `${key} caption at t=${t}`).toBeTruthy();
        captions.add(f.caption!);
        expect(f.points?.length, `${key} points at t=${t}`).toBe(m.points.length);
        expect(f.alpha?.length, `${key} alpha at t=${t}`).toBe(m.segments.length);
        for (const p of f.points ?? []) for (const c of p) expect(Number.isFinite(c), `${key} finite coords at t=${t}`).toBe(true);
        for (const a of f.alpha ?? []) { expect(Number.isFinite(a), `${key} finite alpha at t=${t}`).toBe(true); expect(a, `${key} alpha in range at t=${t}`).toBeGreaterThanOrEqual(0); expect(a, `${key} alpha in range at t=${t}`).toBeLessThanOrEqual(1); }
      }
      expect(captions.size, `${key} has four phase captions`).toBe(4);
      for (const c of captions) { expect(c, `${key} caption numbered`).toMatch(/^[1-4] · /); expect(c, `${key} caption without em-dash`).not.toContain("—"); expect(c.toLowerCase(), `${key} caption avoids "spike"`).not.toContain("spike"); }
    }
  });

  it("every scene has at least one filled face and ends in its final state", () => {
    for (const [key, build] of Object.entries(WAVE6)) {
      const m = build();
      expect(m.faces?.length ?? 0, `${key} has a filled body`).toBeGreaterThan(0);
      const a = m.animate!.frame(0.97), b = m.animate!.frame(0.999);
      expect(a.caption).toBe(b.caption);
    }
  });
});

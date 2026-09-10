import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import { faceSegments, sceneExtents, type Vec3 } from "@/lib/wireframe";
import { FRONT_ANIMATED } from "./front-animations";
import { ALL_ANIMATED } from "./schematics";

describe("front schematics", () => {
  it("every section has an animated schematic registered", () => {
    for (const s of graph().kind("section")) expect(`front:${s.id}` in ALL_ANIMATED, s.id).toBe(true);
  });

  it("every front mesh stays under 500 points, has valid faces and plays finite captioned frames", () => {
    for (const [key, build] of Object.entries(FRONT_ANIMATED)) {
      const m = build();
      const n = m.points.length;
      expect(n, `${key} points`).toBeLessThan(500);
      expect(m.faces?.length ?? 0, `${key} has filled bodies`).toBeGreaterThan(0);
      const segs = faceSegments(m);
      (m.faces ?? []).forEach((f, k) => {
        expect(f.idx.length).toBeGreaterThanOrEqual(3);
        for (const i of f.idx) expect(i >= 0 && i < n, `${key} face ${k} index`).toBe(true);
        expect(segs[k].length, `${key} face ${k} follows drawn edges`).toBeGreaterThan(0);
      });
      expect(m.animate, `${key} has animate`).toBeTruthy();
      for (const t of [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 0.99]) {
        const f = m.animate!.frame(t);
        expect(f.caption, `${key} caption at t=${t}`).toBeTruthy();
        expect(f.points?.length ?? n, `${key} points at t=${t}`).toBe(n);
        expect(f.alpha?.length ?? m.segments.length, `${key} alpha at t=${t}`).toBe(m.segments.length);
        for (const p of f.points ?? []) for (const c of p) expect(Number.isFinite(c), `${key} finite coords at t=${t}`).toBe(true);
      }
    }
  });

  it("the fronts share a scale: no outlier ever forces the body below 60% of the height budget", () => {
    // The grid should read as a set: the body of each drawing must not be shrunk drastically by a far-off actor.
    for (const [key, build] of Object.entries(FRONT_ANIMATED)) {
      const m = build();
      const c: Vec3 = [0, 0, 0];
      for (const p of m.points) { c[0] += p[0]; c[1] += p[1]; c[2] += p[2]; }
      c[0] /= m.points.length; c[1] /= m.points.length; c[2] /= m.points.length;
      const e = sceneExtents(m.points, c, 0.45);
      expect(e.hxMax / e.hx, `${key} width outliers`).toBeLessThan(2.6);
      expect(e.hyMax / e.hy, `${key} height outliers`).toBeLessThan(1.75);
    }
  });
});

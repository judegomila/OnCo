import { describe, expect, it } from "vitest";
import { add, box, cylinder, disc, ellipsoid, empty, faceSegments, facing, fitScale, hexToRgb, icosahedron, keyShape, membrane, octahedron, polygonNormal, sceneExtents, sphere, syringe, torus, type Mesh } from "./wireframe";

/** Every face index points at a real point, every face has at least three vertices, and each edge of a filled shape is also drawn. */
function checkFaces(m: Mesh, name: string) {
  const segs = faceSegments(m);
  (m.faces ?? []).forEach((f, k) => {
    expect(f.idx.length, `${name} face ${k} vertices`).toBeGreaterThanOrEqual(3);
    for (const i of f.idx) { expect(Number.isInteger(i) && i >= 0 && i < m.points.length, `${name} face ${k} index ${i}`).toBe(true); }
    expect(segs[k].length, `${name} face ${k} has drawn edges`).toBeGreaterThan(0);
  });
}

describe("wireframe geometry helpers", () => {
  it("filled primitives produce valid faces and unfilled ones produce none", () => {
    expect(sphere(1, 5, 8).faces).toBeUndefined();
    const s = sphere(1, 5, 8, "hot", true);
    // 4 bands of 8 quads plus 8 triangles at each pole
    expect(s.faces?.length).toBe(4 * 8 + 16);
    checkFaces(s, "sphere");
    expect(box(1, 1, 1, undefined, true).faces?.length).toBe(6);
    checkFaces(box(1, 2, 3, "soft", true), "box");
    expect(icosahedron(1, undefined, true).faces?.length).toBe(20);
    expect(octahedron(1, undefined, true).faces?.length).toBe(8);
    expect(torus(2, 0.5, 12, 6, undefined, true).faces?.length).toBe(72);
    checkFaces(torus(2, 0.5, 12, 6, undefined, true), "torus");
    const cyl = cylinder(1, 2, 10, 3, undefined, true, true);
    expect(cyl.faces?.length).toBe(2 * 10 + 2); // two bands of side quads plus two end discs
    checkFaces(cyl, "cylinder");
    expect(disc(1, 12).faces?.length).toBe(1);
    expect(ellipsoid(1, 2, 1, 3, 6, "soft", true).faces?.every((f) => f.cls === "soft")).toBe(true);
  });

  it("add() offsets face indices and honours the class override", () => {
    const m = empty();
    add(m, box(1, 1, 1, undefined, true), { at: [5, 0, 0] });
    add(m, octahedron(0.5, "accent", true), { at: [-5, 0, 0], cls: "hot" });
    expect(m.points.length).toBe(14);
    expect(m.faces?.length).toBe(14);
    const oct = m.faces!.slice(6);
    expect(oct.every((f) => f.idx.every((i) => i >= 8 && i < 14))).toBe(true);
    expect(oct.every((f) => f.cls === "hot")).toBe(true);
    checkFaces(m, "composite");
  });

  it("membrane is two sheets joined by rungs, with one translucent face per sheet", () => {
    const m = membrane(2, 1, "soft", 4, 2);
    const perSheet = 5 * 3;
    expect(m.points.length).toBe(perSheet * 2);
    expect(m.faces?.length).toBe(2);
    const rungs = m.segments.filter((s) => Math.abs(m.points[s[0]][1] - m.points[s[1]][1]) > 0.1);
    expect(rungs.length).toBe(perSheet);
    expect(m.points.every((p) => Math.abs(Math.abs(p[1]) - 0.07) < 1e-9)).toBe(true);
    checkFaces(m, "membrane");
  });

  it("keyShape and syringe are compact, finite and pointed the documented way", () => {
    const k = keyShape(1, "hot");
    expect(Math.min(...k.points.map((p) => p[0]))).toBeCloseTo(-0.35, 5);
    expect(Math.max(...k.points.map((p) => p[0]))).toBeCloseTo(0.4, 5);
    expect(k.segments.every((s) => s[2] === "hot")).toBe(true);
    const s = syringe(1, "accent");
    expect(Math.min(...s.points.map((p) => p[1]))).toBeCloseTo(0, 5); // needle tip at the origin
    expect(Math.max(...s.points.map((p) => p[1]))).toBeCloseTo(1.08, 5);
    for (const p of [...k.points, ...s.points]) for (const c of p) expect(Number.isFinite(c)).toBe(true);
  });

  it("faceSegments maps each face edge to the segment drawn along it", () => {
    const b = box(1, 1, 1, undefined, true);
    const segs = faceSegments(b);
    expect(segs.length).toBe(6);
    for (const s of segs) { expect(s.length).toBe(4); expect(new Set(s).size).toBe(4); }
    // a face whose edges are not drawn maps to nothing
    const m: Mesh = { points: [[0, 0, 0], [1, 0, 0], [1, 1, 0]], segments: [[0, 0]], faces: [{ idx: [0, 1, 2] }] };
    expect(faceSegments(m)).toEqual([[]]);
  });

  it("polygonNormal and facing follow the polygon's orientation", () => {
    const flat = polygonNormal([[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]]);
    expect(flat[0]).toBeCloseTo(0); expect(flat[1]).toBeCloseTo(0); expect(Math.abs(flat[2])).toBeCloseTo(2); // twice the area
    expect(facing([[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]])).toBeCloseTo(1);
    expect(facing([[0, 0, 0], [0, 1, 0], [0, 1, 1], [0, 0, 1]])).toBeCloseTo(0); // edge-on
    const tilted = facing([[0, 0, 0], [1, 0, 0], [1, 1, 1], [0, 1, 1]]);
    expect(tilted).toBeGreaterThan(0.6); expect(tilted).toBeLessThan(0.8);
    expect(facing([[0, 0, 0], [0, 0, 0], [0, 0, 0]])).toBe(0);
  });

  it("hexToRgb reads the theme variable formats and rejects the rest", () => {
    expect(hexToRgb("#d6336c")).toEqual([214, 51, 108]);
    expect(hexToRgb(" #FCE7F0 ")).toEqual([252, 231, 240]);
    expect(hexToRgb("#fff")).toEqual([255, 255, 255]);
    expect(hexToRgb("#1b1f1cff")).toEqual([27, 31, 28]);
    expect(hexToRgb("rgb(12, 34, 56)")).toEqual([12, 34, 56]);
    expect(hexToRgb("rgba(12 34 56 / 0.5)")).toEqual([12, 34, 56]);
    expect(hexToRgb("transparent")).toBeNull();
    expect(hexToRgb("")).toBeNull();
    expect(hexToRgb("color-mix(in srgb, red, blue)")).toBeNull();
  });

  it("sceneExtents separates width (XZ radius) from tilt-aware height", () => {
    // a flat wide bar along X: wide, but short
    const bar: [number, number, number][] = Array.from({ length: 50 }, (_, i) => [-2 + (4 * i) / 49, 0, 0]);
    const flat = sceneExtents(bar, [0, 0, 0], 0);
    expect(flat.hxMax).toBeCloseTo(2);
    expect(flat.hx).toBeGreaterThan(1.2); expect(flat.hx).toBeLessThan(2);
    // no height at all: falls back to 1 so the caller never divides by zero
    expect(flat.hy).toBe(1); expect(flat.hyMax).toBe(1);
    // a little tilt lifts part of the XZ body radius into the vertical extent
    const slight = sceneExtents(bar, [0, 0, 0], 0.5);
    expect(slight.hy).toBeCloseTo(slight.hx * Math.sin(0.5));
    expect(slight.hyMax).toBeCloseTo(slight.hy);
    // tilting the camera lifts part of the XZ radius into the vertical extent
    const tilted = sceneExtents(bar, [0, 0, 0], Math.PI / 2);
    expect(tilted.hyMax).toBeCloseTo(tilted.hx);
    // a tall column: no width, all height
    const col = sceneExtents([[0, -3, 0], [0, 0, 0], [0, 3, 0]], [0, 0, 0], 0);
    expect(col.hxMax).toBe(1); // degenerate width falls back to 1 so the caller never divides by zero
    expect(col.hyMax).toBeCloseTo(3);
    // one outlier does not move the body extents
    const body = sceneExtents([...bar, [40, 0, 0]], [0, 0, 0], 0);
    expect(body.hx).toBeLessThan(2.1); expect(body.hxMax).toBeCloseTo(40);
    expect(Number.isFinite(sceneExtents([], [0, 0, 0], 0.3).hx)).toBe(true);
  });

  it("fitScale fills the card with the body but keeps outliers within reach of the edge", () => {
    // compact card 340×128: a round body of radius 2 → limited by 44% of height
    const round = { hx: 2, hxMax: 2, hy: 2, hyMax: 2 };
    expect(fitScale(340, 128, round, true)).toBeCloseTo((128 * 0.5) / 2);
    // a wide, short scene gets more scale than its radius alone would allow
    const wide = { hx: 2.5, hxMax: 2.5, hy: 1.2, hyMax: 1.4 };
    expect(fitScale(340, 128, wide, true)).toBeGreaterThan(fitScale(340, 128, round, true));
    // an actor parked far to the side: the cap keeps hxMax·s ≤ 0.62·W
    const outlier = { hx: 2, hxMax: 8, hy: 2, hyMax: 2 };
    const s = fitScale(340, 128, outlier, true);
    expect(s * 8).toBeLessThanOrEqual(340 * 0.62 + 1e-9);
    expect(s).toBeLessThan(fitScale(340, 128, round, true));
    // full-size card uses 48% of height for the body
    expect(fitScale(700, 416, round, false)).toBeCloseTo((416 * 0.48) / 2);
    // degenerate inputs never divide by zero
    expect(Number.isFinite(fitScale(300, 100, { hx: 0, hxMax: 0, hy: 0, hyMax: 0 }, true))).toBe(true);
  });
});

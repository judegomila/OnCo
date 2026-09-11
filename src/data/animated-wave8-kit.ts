/**
 * Shared scene helpers for wave 8 of the animated technology schematics (./animated-wave8.ts and ./animated-wave8b.ts).
 * Same conventions as ./animated-wave7.ts: a scene of named parts around one focal object with a filled body, one to three
 * animated actors, four captioned phases on a 12-14 s loop, three or four plain labels, every mesh under 500 points.
 * Self-contained (imports only the wireframe primitives) so that ./animated.ts can spread WAVE8 into its registry without
 * an import cycle.
 */
import { add, box, cylinder, disc, dots, ellipsoid, empty, line, lerp3, movePart, octahedron, part, phase, polyline, setAlpha, sphere, type Mesh, type Part, type Vec3 } from "@/lib/wireframe";

export const TAU = Math.PI * 2;
export type Scene = { mesh: Mesh; parts: Record<string, Part> };
export type Lbl = { at: Vec3; text: string };
export const scene = (): Scene => ({ mesh: empty(), parts: {} });
export const put = (sc: Scene, name: string, m: Mesh, opts: Parameters<typeof add>[2] = {}): Part => { const p = part(sc.mesh, m, opts); sc.parts[name] = p; return p; };
export const pulse = (t: number, f = 6) => 0.55 + 0.45 * Math.sin(t * TAU * f);
/** Filled cell body: a translucent wash inside a wire rim, so the cell reads as a body rather than a cage. */
export const cell = (r: number, cls?: string) => sphere(r, 5, 10, cls, true);
export const small = (r: number, cls?: string) => sphere(r, 3, 8, cls);
export const blob = (r: number, cls = "hot") => sphere(r, 4, 8, cls, true);
/** Filled organ body. */
export const organ = (rx: number, ry: number, rz: number, cls = "soft") => ellipsoid(rx, ry, rz, 5, 10, cls, true);
/** Phase i of four: 0→1 eased over the i-th quarter of the loop. */
export const Q = (t: number, i: number) => phase(t, i * 0.25, (i + 1) * 0.25);
export const stageOf = (t: number) => Math.min(3, Math.floor(t * 4));
export const clamp = (x: number) => Math.max(0, Math.min(1, x));
export const grow = (alpha: number[], p: Part, u: number) => { const n = p.s1 - p.s0; for (let k = 0; k < n; k++) alpha[p.s0 + k] = clamp(u * n - k); };
export const hide = (alpha: number[], ...parts: Part[]) => parts.forEach((p) => setAlpha(alpha, p, 0));
export const show = (alpha: number[], a: number, ...parts: Part[]) => parts.forEach((p) => setAlpha(alpha, p, a));
export const moveTo = (pts: Vec3[], base: Vec3[], p: Part, from: Vec3, to: Vec3, u: number, scale = 1, spin = 0) => { const d = lerp3(from, to, u); movePart(pts, base, p, [d[0] - from[0], d[1] - from[1], d[2] - from[2]], scale, spin); };
/** Staggered reveal of a list of parts: part i switches on as u passes i/n. */
export const cascade = (alpha: number[], parts: Part[], u: number) => parts.forEach((p, i) => setAlpha(alpha, p, clamp(u * parts.length - i)));
/** Standing human silhouette, ~1.8 tall, centred at origin, with a filled torso so the figure reads as a body. */
export function figure(cls?: string): Mesh {
  const m = empty();
  add(m, sphere(0.15, 4, 8, cls, true), { at: [0, 0.8, 0] });
  add(m, polyline([[0, 0.65, 0], [0, 0.56, 0]], cls));
  const torso = polyline([[-0.3, 0.56, 0], [0.3, 0.56, 0], [0.22, 0.0, 0], [-0.22, 0.0, 0]], cls, true);
  torso.faces = [cls ? { idx: [0, 1, 2, 3], cls } : { idx: [0, 1, 2, 3] }];
  add(m, torso);
  add(m, polyline([[-0.3, 0.56, 0], [-0.42, 0.26, 0.05], [-0.38, -0.04, 0.1]], cls));
  add(m, polyline([[0.3, 0.56, 0], [0.42, 0.26, 0.05], [0.38, -0.04, 0.1]], cls));
  add(m, polyline([[-0.15, 0.0, 0], [-0.18, -0.42, 0.02], [-0.2, -0.86, 0]], cls));
  add(m, polyline([[0.15, 0.0, 0], [0.18, -0.42, 0.02], [0.2, -0.86, 0]], cls));
  return m;
}
/** Clipboard / document: a rectangle with a few text lines. */
export function doc(w = 0.7, h = 0.9, lines = 4, cls?: string): Mesh {
  const m = polyline([[-w / 2, -h / 2, 0], [w / 2, -h / 2, 0], [w / 2, h / 2, 0], [-w / 2, h / 2, 0]], cls, true);
  for (let i = 0; i < lines; i++) { const y = h / 2 - 0.18 - (i * (h - 0.3)) / Math.max(1, lines - 1); add(m, line([-w / 2 + 0.1, y, 0], [w / 2 - 0.1 - (i % 2) * 0.15, y, 0], "soft")); }
  return m;
}
/** Filled rectangle in the XY plane, centred at the origin (a tile, a screen, a slide seen from above). */
export function quad(w: number, h: number, cls?: string): Mesh {
  const m = polyline([[-w / 2, -h / 2, 0], [w / 2, -h / 2, 0], [w / 2, h / 2, 0], [-w / 2, h / 2, 0]], cls, true);
  m.faces = [cls ? { idx: [0, 1, 2, 3], cls } : { idx: [0, 1, 2, 3] }];
  return m;
}
/** Timeline: a baseline with n ticks. */
export function ticks(x0: number, x1: number, y: number, n: number, cls?: string): Mesh {
  const m = line([x0, y, 0], [x1, y, 0], cls);
  for (let i = 0; i < n; i++) { const x = x0 + ((x1 - x0) * i) / Math.max(1, n - 1); add(m, line([x, y - 0.08, 0], [x, y + 0.08, 0], cls)); }
  return m;
}
/** Filled bar standing on y=0 at x, of height h. */
export const bar = (x: number, h: number, w = 0.3, cls?: string) => { const m = box(w, h, w, cls, true); m.points = m.points.map((p) => [p[0] + x, p[1] + h / 2, p[2]] as Vec3); return m; };
/** Scatter of n dots inside a flattened blob of radius r (cells in a tissue, particles, a cohort). */
export function cloud(n: number, r: number, cls?: string, seed = 1): Mesh {
  const pts: Vec3[] = [];
  for (let i = 0; i < n; i++) { const a = (TAU * i * 0.618 * seed) % TAU, rr = r * (0.3 + 0.7 * (((i * 7 + seed) % 11) / 11)); pts.push([rr * Math.cos(a), rr * Math.sin(a) * 0.7, 0.3 * r * Math.sin(i * 1.7)]); }
  return dots(pts, cls);
}
/** Horizontal gut/vessel tube along x, centred at origin, with a translucent wall. */
export const tube = (r: number, len: number, cls?: string) => { const m = cylinder(r, len, 12, 3, cls, false, true); m.points = m.points.map((p) => [p[1], p[0], p[2]] as Vec3); return m; };
/** Simple L-shaped chart axes with origin at `o`, width w and height h. */
export const axes = (o: Vec3, w: number, h: number, cls = "soft") => polyline([[o[0], o[1] + h, 0], [o[0], o[1], 0], [o[0] + w, o[1], 0]], cls);
/** Two crossed strokes over a point (an X: advised against, ruled out). */
export const cross = (c: Vec3, s = 0.25, cls = "hot") => { const m = line([c[0] - s, c[1] - s, c[2]], [c[0] + s, c[1] + s, c[2]], cls); add(m, line([c[0] - s, c[1] + s, c[2]], [c[0] + s, c[1] - s, c[2]], cls)); return m; };
/** Tick mark (a check: passed, confirmed). */
export const tick = (c: Vec3, s = 0.25, cls = "accent") => polyline([[c[0] - s, c[1], c[2]], [c[0] - s * 0.3, c[1] - s * 0.7, c[2]], [c[0] + s, c[1] + s * 0.8, c[2]]], cls);
/** Upright vial: a capped, filled cylinder. */
export const vial = (r: number, h: number, cls?: string) => cylinder(r, h, 8, 2, cls, true, true);
/** Capsule / tablet: a small filled ellipsoid lying along x. */
export const capsule = (s: number, cls = "accent") => ellipsoid(0.22 * s, 0.1 * s, 0.1 * s, 3, 8, cls, true);
/** Small house outline (a home, a clinic), centred at origin. */
export const house = (w = 1.2, h = 0.8, cls = "soft") => polyline([[-w / 2, -h / 2, 0], [w / 2, -h / 2, 0], [w / 2, h / 2, 0], [0, h / 2 + 0.45, 0], [-w / 2, h / 2, 0]], cls, true);
/** Clock face in the XY plane: a filled rim and two hands. */
export const clockFace = (r = 0.35, cls = "soft") => { const m = disc(r, 12, cls, "z"); add(m, line([0, 0, 0.01], [0, r * 0.7, 0.01], "accent")); add(m, line([0, 0, 0.01], [r * 0.5, 0, 0.01], "accent")); return m; };
/** Open hand seen from above: a filled palm with five finger strokes, fingers pointing +y. */
export function hand(cls = "soft"): Mesh {
  const m = ellipsoid(0.32, 0.36, 0.1, 4, 8, cls, true);
  for (let i = 0; i < 4; i++) { const x = -0.24 + 0.16 * i; add(m, polyline([[x, 0.3, 0], [x, 0.62 + (i === 1 || i === 2 ? 0.1 : 0), 0]], cls)); }
  add(m, polyline([[0.3, 0.05, 0], [0.5, 0.3, 0]], cls));
  return m;
}
/** Building block: a filled box with a row of window strokes. */
export const building = (w = 1.0, h = 0.9, cls = "soft") => { const m = box(w, h, 0.5, cls, true); for (let i = 0; i < 3; i++) add(m, line([-w / 2 + 0.2 + (i * (w - 0.4)) / 2, h / 2 - 0.25, 0.26], [-w / 2 + 0.2 + (i * (w - 0.4)) / 2, h / 2 - 0.45, 0.26], "soft")); return m; };
/** Screen / monitor: a filled panel on a short stand. */
export const screen = (w = 1.4, h = 0.9, cls = "soft") => { const m = quad(w, h, cls); add(m, line([0, -h / 2, 0], [0, -h / 2 - 0.2, 0], cls)); add(m, line([-0.3, -h / 2 - 0.2, 0], [0.3, -h / 2 - 0.2, 0], cls)); return m; };
/** Neural-network block: a filled slab with three layers of node dots and a few connecting strokes (a model). */
export function model(w = 1.4, h = 1.0, cls = "accent"): Mesh {
  const m = box(w, h, 0.4, cls, true);
  const cols = 3, rows = 3;
  const nx = (c: number) => -w / 2 + 0.25 + (c * (w - 0.5)) / (cols - 1), ny = (r: number) => -h / 2 + 0.2 + (r * (h - 0.4)) / (rows - 1);
  const nodes: Vec3[] = []; for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) nodes.push([nx(c), ny(r), 0.21]);
  add(m, dots(nodes, cls));
  for (let c = 0; c < cols - 1; c++) for (let r = 0; r < rows; r++) add(m, line([nx(c), ny(r), 0.21], [nx(c + 1), ny((r + 1) % rows), 0.21], "soft"));
  return m;
}
/** Particle / mote: a tiny octahedron (6 points), for swarms where a small sphere would cost too much. */
export const mote = (r = 0.06, cls = "accent") => octahedron(r, cls);
/** Protein: a compact tangle of a few strokes inside a translucent body. */
export function protein(r = 0.5, cls = "soft"): Mesh {
  const m = sphere(r, 4, 8, cls, true);
  const pts: Vec3[] = []; for (let i = 0; i < 9; i++) { const a = i * 2.2; pts.push([0.7 * r * Math.cos(a) * (0.5 + 0.5 * Math.sin(i)), 0.7 * r * Math.sin(a * 0.8), 0.6 * r * Math.sin(a)]); }
  add(m, polyline(pts, cls));
  return m;
}
/** Leaf: a filled pointed ellipse with a midrib, tip along +y. */
export const leaf = (s = 0.4, cls = "accent") => { const m = ellipsoid(0.45 * s, s, 0.05, 3, 8, cls, true); add(m, line([0, -s, 0], [0, s, 0], cls)); return m; };
/** Radiation beam: a thin filled wedge from `from` to `to`. */
export const beam = (from: Vec3, to: Vec3, w = 0.2, cls = "accent") => { const m = polyline([[from[0], from[1] - w * 0.3, from[2]], [from[0], from[1] + w * 0.3, from[2]], [to[0], to[1] + w, to[2]], [to[0], to[1] - w, to[2]]], cls, true); m.faces = [{ idx: [0, 1, 2, 3], cls }]; return m; };
/** Slide: a thin filled rectangle with a tissue smear. */
export const slide = (cls = "soft") => { const m = quad(1.2, 0.5, cls); add(m, cloud(8, 0.3, "hot", 2), { at: [0.1, 0, 0.02] }); return m; };
export function frame(sc: Scene, duration: number, fn: (t: number, pts: Vec3[], alpha: number[]) => { caption: string; labels?: Lbl[] }): Mesh {
  sc.mesh.animate = { duration, frame: (t) => { const pts = sc.mesh.points.map((p) => [p[0], p[1], p[2]] as Vec3); const alpha = sc.mesh.segments.map(() => 1); const r = fn(t, pts, alpha); return { points: pts, alpha, caption: r.caption, labels: r.labels ?? sc.mesh.labels }; } };
  return sc.mesh;
}
export const L = (at: Vec3, text: string): Lbl => ({ at, text });

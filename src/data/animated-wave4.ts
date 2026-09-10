/**
 * Wave 4 of animated technology schematics: forty more well-connected technologies that until now fell back to a
 * generic front placeholder (diagnostics such as flow MRD, karyotype and FISH, slide scanners; supportive care such as
 * antiemetics, transfusion, bone agents, psycho-oncology, pain; complementary and lifestyle evidence; manufacturing and
 * trial infrastructure). Same conventions as ./animated-wave3.ts: a scene of named parts around one focal object with a
 * filled body where it helps, one to three animated actors, four captioned phases on a 12-14 s loop, three or four plain
 * labels, every mesh under 500 points. Numbers in captions come from the technology record only. The viewer blends the
 * last 14 % of the cycle back to frame 0, so each scene simply ends in its final state.
 *
 * Self-contained (imports only the wireframe primitives) so that ./animated.ts can spread WAVE4 into its registry without
 * an import cycle.
 */
import { add, antibody, arrow, box, chromosome, cone, cylinder, disc, dots, ellipsoid, empty, helix, lerp, lerp3, line, movePart, octahedron, part, phase, polyline, ring, setAlpha, sphere, syringe, torus, type Mesh, type Part, type Vec3 } from "@/lib/wireframe";

const TAU = Math.PI * 2;
type Scene = { mesh: Mesh; parts: Record<string, Part> };
type Lbl = { at: Vec3; text: string };
const scene = (): Scene => ({ mesh: empty(), parts: {} });
const put = (sc: Scene, name: string, m: Mesh, opts: Parameters<typeof add>[2] = {}): Part => { const p = part(sc.mesh, m, opts); sc.parts[name] = p; return p; };
const pulse = (t: number, f = 6) => 0.55 + 0.45 * Math.sin(t * TAU * f);
/** Filled cell body: a translucent wash inside a wire rim, so the cell reads as a body rather than a cage. */
const cell = (r: number, cls?: string) => sphere(r, 5, 10, cls, true);
const small = (r: number, cls?: string) => sphere(r, 3, 8, cls);
const blob = (r: number, cls = "hot") => sphere(r, 4, 8, cls, true);
/** Filled organ body. */
const organ = (rx: number, ry: number, rz: number, cls = "soft") => ellipsoid(rx, ry, rz, 5, 10, cls, true);
/** Phase i of four: 0→1 eased over the i-th quarter of the loop. */
const Q = (t: number, i: number) => phase(t, i * 0.25, (i + 1) * 0.25);
const stageOf = (t: number) => Math.min(3, Math.floor(t * 4));
const clamp = (x: number) => Math.max(0, Math.min(1, x));
const grow = (alpha: number[], p: Part, u: number) => { const n = p.s1 - p.s0; for (let k = 0; k < n; k++) alpha[p.s0 + k] = clamp(u * n - k); };
const hide = (alpha: number[], ...parts: Part[]) => parts.forEach((p) => setAlpha(alpha, p, 0));
const show = (alpha: number[], a: number, ...parts: Part[]) => parts.forEach((p) => setAlpha(alpha, p, a));
const moveTo = (pts: Vec3[], base: Vec3[], p: Part, from: Vec3, to: Vec3, u: number, scale = 1, spin = 0) => { const d = lerp3(from, to, u); movePart(pts, base, p, [d[0] - from[0], d[1] - from[1], d[2] - from[2]], scale, spin); };
/** Staggered reveal of a list of parts: part i switches on as u passes i/n. */
const cascade = (alpha: number[], parts: Part[], u: number) => parts.forEach((p, i) => setAlpha(alpha, p, clamp(u * parts.length - i)));
/** Standing human silhouette, ~1.8 tall, centred at origin, with a filled torso so the figure reads as a body. */
function figure(cls?: string): Mesh {
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
function doc(w = 0.7, h = 0.9, lines = 4, cls?: string): Mesh {
  const m = polyline([[-w / 2, -h / 2, 0], [w / 2, -h / 2, 0], [w / 2, h / 2, 0], [-w / 2, h / 2, 0]], cls, true);
  for (let i = 0; i < lines; i++) { const y = h / 2 - 0.18 - (i * (h - 0.3)) / Math.max(1, lines - 1); add(m, line([-w / 2 + 0.1, y, 0], [w / 2 - 0.1 - (i % 2) * 0.15, y, 0], "soft")); }
  return m;
}
/** Filled rectangle in the XY plane, centred at the origin (a tile, a screen, a slide seen from above). */
function quad(w: number, h: number, cls?: string): Mesh {
  const m = polyline([[-w / 2, -h / 2, 0], [w / 2, -h / 2, 0], [w / 2, h / 2, 0], [-w / 2, h / 2, 0]], cls, true);
  m.faces = [cls ? { idx: [0, 1, 2, 3], cls } : { idx: [0, 1, 2, 3] }];
  return m;
}
/** Timeline: a baseline with n ticks. */
function ticks(x0: number, x1: number, y: number, n: number, cls?: string): Mesh {
  const m = line([x0, y, 0], [x1, y, 0], cls);
  for (let i = 0; i < n; i++) { const x = x0 + ((x1 - x0) * i) / Math.max(1, n - 1); add(m, line([x, y - 0.08, 0], [x, y + 0.08, 0], cls)); }
  return m;
}
/** Filled bar standing on y=0 at x, of height h. */
const bar = (x: number, h: number, w = 0.3, cls?: string) => { const m = box(w, h, w, cls, true); m.points = m.points.map((p) => [p[0] + x, p[1] + h / 2, p[2]] as Vec3); return m; };
/** Scatter of n dots inside a flattened blob of radius r (marrow, microbes, cells in a tissue). */
function cloud(n: number, r: number, cls?: string, seed = 1): Mesh {
  const pts: Vec3[] = [];
  for (let i = 0; i < n; i++) { const a = (TAU * i * 0.618 * seed) % TAU, rr = r * (0.3 + 0.7 * (((i * 7 + seed) % 11) / 11)); pts.push([rr * Math.cos(a), rr * Math.sin(a) * 0.7, 0.3 * r * Math.sin(i * 1.7)]); }
  return dots(pts, cls);
}
/** Branching vessel tree from `root` toward +x, three levels deep. */
function tree(root: Vec3, len: number, cls?: string): Mesh {
  const m = empty();
  const rec = (a: Vec3, dir: number, l: number, depth: number) => {
    const b: Vec3 = [a[0] + l, a[1] + dir * l * 0.6, a[2] + (depth % 2 ? 0.1 : -0.1) * l];
    add(m, line(a, b, cls));
    if (depth < 3) { rec(b, 1, l * 0.6, depth + 1); rec(b, -1, l * 0.6, depth + 1); }
  };
  const tip: Vec3 = [root[0] + len, root[1], root[2]];
  add(m, line(root, tip, cls)); rec(tip, 1, len * 0.55, 1); rec(tip, -1, len * 0.55, 1);
  return m;
}
/** Horizontal gut/vessel/bone tube along x, centred at origin, with a translucent wall. */
const tube = (r: number, len: number, cls?: string) => { const m = cylinder(r, len, 12, 3, cls, false, true); m.points = m.points.map((p) => [p[1], p[0], p[2]] as Vec3); return m; };
/** Dumbbell along x: a bar with two weights. */
function dumbbell(s = 1, cls?: string): Mesh {
  const m = line([-0.5 * s, 0, 0], [0.5 * s, 0, 0], cls);
  add(m, sphere(0.14 * s, 3, 8, cls, true), { at: [-0.5 * s, 0, 0] }); add(m, sphere(0.14 * s, 3, 8, cls, true), { at: [0.5 * s, 0, 0] });
  return m;
}
/** Simple L-shaped chart axes with origin at `o`, width w and height h. */
const axes = (o: Vec3, w: number, h: number, cls = "soft") => polyline([[o[0], o[1] + h, 0], [o[0], o[1], 0], [o[0] + w, o[1], 0]], cls);
function frame(sc: Scene, duration: number, fn: (t: number, pts: Vec3[], alpha: number[]) => { caption: string; labels?: Lbl[] }): Mesh {
  sc.mesh.animate = { duration, frame: (t) => { const pts = sc.mesh.points.map((p) => [p[0], p[1], p[2]] as Vec3); const alpha = sc.mesh.segments.map(() => 1); const r = fn(t, pts, alpha); return { points: pts, alpha, caption: r.caption, labels: r.labels ?? sc.mesh.labels }; } };
  return sc.mesh;
}
const L = (at: Vec3, text: string): Lbl => ({ at, text });

// ---------------------------------------------------------------- 1. evidence-based integrative oncology
export function integrativeOncology(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [0, 0, 0];
  put(sc, "patient", figure(), { at: PAT });
  put(sc, "pole", polyline([[-1.3, -0.8, 0], [-1.3, 1.5, 0], [-0.9, 1.5, 0]], "soft"));
  const bag = put(sc, "bag", box(0.32, 0.5, 0.14, "accent", true), { at: [-0.9, 1.2, 0] });
  const iv = put(sc, "iv", polyline([[-0.9, 0.95, 0], [-0.6, 0.5, 0], [-0.38, 0.3, 0.05]], "accent"));
  const beam = put(sc, "beam", polyline([[-2.2, 1.9, 0], [-0.1, 0.4, 0], [-1.6, 2.3, 0]], "accent"));
  const needles: Part[] = []; for (let i = 0; i < 3; i++) needles.push(put(sc, `n${i}`, line([1.2 + 0.15 * i, 0.9 - 0.15 * i, 0], [0.45 + 0.05 * i, 0.4 - 0.1 * i, 0.05], "accent")));
  const mind = put(sc, "mind", ring(0.3, 14, "accent", "z"), { at: [1.6, 1.3, 0] });
  const mat = put(sc, "mat", box(0.9, 0.05, 0.4, "accent", true), { at: [2.3, 0.2, 0] });
  const note = put(sc, "note", polyline([[2.7, 0.75, 0], [2.7, 1.35, 0], [2.95, 1.45, 0]], "accent"));
  const noteHead = put(sc, "noteHead", small(0.08, "accent"), { at: [2.65, 0.73, 0] });
  const evidence = put(sc, "evidence", ticks(0.9, 3.1, -0.35, 2, "soft"));
  const bottle = put(sc, "bottle", cylinder(0.14, 0.4, 8, 2, "hot", true, true), { at: [1.6, -0.9, 0] });
  const cross = put(sc, "cross", polyline([[1.35, -1.15, 0.16], [1.85, -0.65, 0.16]], "hot"));
  const cross2 = put(sc, "cross2", polyline([[1.35, -0.65, 0.16], [1.85, -1.15, 0.16]], "hot"));
  sc.mesh.labels = [L([-1.5, 1.95, 0], "Standard treatment"), L([2.1, 1.85, 0], "Acupuncture, yoga, mindfulness, music"), L([2.0, -0.2, 0], "Evidence bar"), L([1.6, -1.45, 0], "Most supplements: advised against")];
  return frame(sc, 14, (t, pts, alpha) => {
    hide(alpha, ...needles, mat, mind, note, noteHead, bottle, cross, cross2, evidence);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, beam, u > 0.1 ? pulse(t, 5) : 0); setAlpha(alpha, bag, 0.5 + 0.5 * u); grow(alpha, iv, u); return { caption: "1 · Standard treatment stays in place: surgery, drugs, radiotherapy" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, beam, 0.4); cascade(alpha, [mind, mat, note, noteHead], u); needles.forEach((n, i) => grow(alpha, n, clamp(u * 1.5 - i * 0.2))); return { caption: "2 · Complementary care is added for symptoms: acupuncture for nausea and pain, yoga and mindfulness for anxiety and fatigue, music therapy" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, beam, 0.4); show(alpha, 1, mind, mat, note, noteHead, ...needles); setAlpha(alpha, evidence, u); setAlpha(alpha, bottle, u); return { caption: "3 · Each approach is held to the same bar as a drug: randomised trials first, then SIO-ASCO guidelines" }; }
    const u = Q(t, 3); setAlpha(alpha, beam, 0.4); show(alpha, 1, mind, mat, note, noteHead, ...needles); setAlpha(alpha, evidence, 1); setAlpha(alpha, bottle, 1 - 0.6 * u); grow(alpha, cross, u); grow(alpha, cross2, u);
    return { caption: "4 · Most supplements are advised against during treatment (interactions, antioxidant harm); alternatives used instead of treatment shorten life" };
  });
}

// ---------------------------------------------------------------- 2. multiparameter flow cytometry MRD
export function flowCytometryMrd(): Mesh {
  const sc = scene();
  const TUBE: Vec3 = [-2.5, 0.3, 0];
  put(sc, "tube", cylinder(0.3, 1.2, 10, 3, undefined, false, true), { at: TUBE });
  put(sc, "sample", cloud(14, 0.4, undefined, 2), { at: [TUBE[0], TUBE[1] - 0.2, 0] });
  const tags = put(sc, "tags", cloud(14, 0.42, "accent", 4), { at: [TUBE[0] + 0.02, TUBE[1] - 0.18, 0.05] });
  const NOZ: Vec3 = [-0.6, 1.4, 0], END: Vec3 = [-0.6, -1.4, 0];
  put(sc, "nozzle", cone(0.4, 0.6, 10, undefined, false), { at: [NOZ[0], NOZ[1] + 0.3, 0] });
  put(sc, "stream", line(NOZ, END, "soft"));
  const N = 6; const cells: Part[] = [];
  for (let i = 0; i < N; i++) cells.push(put(sc, `c${i}`, small(0.09, i === 3 ? "hot" : undefined), { at: NOZ }));
  const laser = put(sc, "laser", line([-1.8, 0.1, 0], [NOZ[0], 0.1, 0], "accent"));
  put(sc, "laserBox", box(0.4, 0.3, 0.3, undefined, true), { at: [-2.0, 0.1, 0] });
  const flashes: Part[] = []; for (let i = 0; i < 3; i++) flashes.push(put(sc, `f${i}`, line([NOZ[0], 0.1, 0], [NOZ[0] + 0.9, 0.55 - 0.45 * i, 0], "accent")));
  for (let i = 0; i < 3; i++) put(sc, `d${i}`, box(0.2, 0.3, 0.3, undefined, true), { at: [NOZ[0] + 1.05, 0.55 - 0.45 * i, 0] });
  const AX: Vec3 = [1.3, -1.1, 0];
  const ax = put(sc, "axes", axes(AX, 2.0, 2.2));
  const normal = put(sc, "normal", cloud(16, 0.45, undefined, 3), { at: [AX[0] + 0.7, AX[1] + 0.7, 0] });
  const outlier = put(sc, "outlier", small(0.1, "hot"), { at: [AX[0] + 1.6, AX[1] + 1.7, 0] });
  sc.mesh.labels = [L([TUBE[0], 1.35, 0], "Marrow cells, antibody-tagged"), L([-1.4, -0.35, 0], "Laser"), L([NOZ[0] + 1.05, 1.05, 0], "Colour detectors"), L([AX[0] + 1.6, AX[1] + 2.15, 0], "Different-from-normal cell")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...cells, ...flashes, normal, outlier, tags); setAlpha(alpha, laser, 0.2); setAlpha(alpha, ax, 0.25);
    const s = stageOf(t);
    const flow = () => cells.forEach((c, i) => { const v = (t * 5 + i / N) % 1; moveTo(pts, base, c, NOZ, END, v); setAlpha(alpha, c, 1); });
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, tags, u); return { caption: "1 · Bone marrow cells are tagged with fluorescent antibodies, eight to ten colours at once" }; }
    if (s === 1) { setAlpha(alpha, tags, 1); flow(); setAlpha(alpha, laser, pulse(t, 8)); flashes.forEach((f) => setAlpha(alpha, f, pulse(t + 0.05, 8))); return { caption: "2 · They pass a laser one cell at a time; each flash of colour is recorded" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, tags, 1); flow(); setAlpha(alpha, laser, 0.8); show(alpha, 0.6, ...flashes); setAlpha(alpha, ax, 0.25 + 0.6 * u); setAlpha(alpha, normal, u); setAlpha(alpha, outlier, u > 0.7 ? 1 : 0); return { caption: "3 · Normal cells fall into familiar patterns; leukaemia cells show a different-from-normal pattern" }; }
    const u = Q(t, 3); setAlpha(alpha, tags, 1); flow(); setAlpha(alpha, laser, 0.8); show(alpha, 0.6, ...flashes); setAlpha(alpha, ax, 0.85); setAlpha(alpha, normal, 1); setAlpha(alpha, outlier, pulse(t, 5)); movePart(pts, base, outlier, [0, 0, 0], 1 + 0.4 * u);
    return { caption: "4 · One leukaemia cell in ten thousand is measurable: undetectable MRD after treatment predicts long remission" };
  });
}

// ---------------------------------------------------------------- 3. cytogenetics and FISH
export function cytogeneticsFish(): Mesh {
  const sc = scene();
  const DISH: Vec3 = [-2.3, -0.2, 0];
  put(sc, "dish", disc(0.9, 20, "soft", "z"), { at: DISH });
  const cells: Part[] = []; for (let i = 0; i < 5; i++) { const a = (TAU * i) / 5; cells.push(put(sc, `cell${i}`, small(0.16), { at: [DISH[0] + 0.5 * Math.cos(a), DISH[1] + 0.5 * Math.sin(a), 0.05] })); }
  const daughters: Part[] = []; for (let i = 0; i < 5; i++) { const a = (TAU * i) / 5; daughters.push(put(sc, `dau${i}`, small(0.12), { at: [DISH[0] + 0.5 * Math.cos(a), DISH[1] + 0.5 * Math.sin(a), 0.05] })); }
  const KAR: Vec3 = [0.0, 0.3, 0];
  const chroms: Part[] = []; for (let i = 0; i < 8; i++) chroms.push(put(sc, `ch${i}`, chromosome(1.0, i === 5 ? "hot" : undefined), { at: [KAR[0] + (i % 4) * 0.4, KAR[1] + 0.4 - Math.floor(i / 4) * 0.7, 0] }));
  const swap = put(sc, "swap", arrow([KAR[0] + 0.5, KAR[1] + 0.2, 0.05], [KAR[0] + 0.4, KAR[1] - 0.15, 0.05], "hot"));
  const NUC: Vec3 = [2.4, 0.2, 0];
  put(sc, "nuc", sphere(0.6, 4, 10, "soft", true), { at: NUC });
  const PA: Vec3 = [NUC[0] - 0.3, 1.7, 0], PB: Vec3 = [NUC[0] + 0.3, 1.7, 0], TARGET: Vec3 = [NUC[0], NUC[1] + 0.1, 0.1];
  const probeA = put(sc, "pA", octahedron(0.1, "accent"), { at: PA });
  const probeB = put(sc, "pB", octahedron(0.1, "hot"), { at: PB });
  const glow = put(sc, "glow", ring(0.2, 10, "hot", "z"), { at: TARGET });
  sc.mesh.labels = [L([DISH[0], 1.0, 0], "Cells grown until they divide"), L([KAR[0] + 0.6, 1.3, 0], "Karyotype"), L([NUC[0], -0.8, 0], "FISH probes light up a gene break"), L([0.6, -1.4, 0], "Risk group")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...chroms, swap, probeA, probeB, glow, ...daughters);
    const s = stageOf(t);
    const divide = (u: number) => cells.forEach((c, i) => { const a = (TAU * i) / 5; movePart(pts, base, c, [-0.12 * u * Math.cos(a), -0.12 * u * Math.sin(a), 0], 1 - 0.25 * u); setAlpha(alpha, daughters[i], u); movePart(pts, base, daughters[i], [0.16 * u * Math.cos(a), 0.16 * u * Math.sin(a), 0], 1); });
    if (s === 0) { divide(Q(t, 0)); return { caption: "1 · Leukaemia cells are cultured until they divide, which takes 7 to 14 days; only then do chromosomes condense enough to see" }; }
    if (s === 1) { const u = Q(t, 1); divide(1); cascade(alpha, chroms, u); setAlpha(alpha, swap, u > 0.8 ? pulse(t, 5) : 0); return { caption: "2 · Karyotype: the chromosomes are laid out and counted; swaps, gains and losses show up, e.g. t(15;17) in AML" }; }
    if (s === 2) { const u = Q(t, 2); divide(1); show(alpha, 1, ...chroms); setAlpha(alpha, swap, 0.6); show(alpha, 1, probeA, probeB); moveTo(pts, base, probeA, PA, [TARGET[0] - 0.1, TARGET[1], TARGET[2]], u, 1, u * 4); moveTo(pts, base, probeB, PB, [TARGET[0] + 0.1, TARGET[1], TARGET[2]], u, 1, u * 4); setAlpha(alpha, glow, u > 0.7 ? pulse(t, 6) : 0); return { caption: "3 · FISH: fluorescent probes stick to specific genes in resting nuclei and glow where a break or fusion sits, cell by cell" }; }
    divide(1); show(alpha, 1, ...chroms); setAlpha(alpha, swap, 0.6); show(alpha, 1, probeA, probeB); moveTo(pts, base, probeA, PA, [TARGET[0] - 0.1, TARGET[1], TARGET[2]], 1); moveTo(pts, base, probeB, PB, [TARGET[0] + 0.1, TARGET[1], TARGET[2]], 1); setAlpha(alpha, glow, pulse(t, 4)); movePart(pts, base, glow, [0, 0, 0], 1 + 0.5 * Q(t, 3));
    return { caption: "4 · The pattern places the leukaemia in a risk group, e.g. del(17p) in CLL, and steers treatment; cryptic changes need NGS or optical genome mapping" };
  });
}

// ---------------------------------------------------------------- 4. whole-slide scanners and image management
export function wholeSlideScanners(): Mesh {
  const sc = scene();
  const SCAN: Vec3 = [-1.9, 0, 0];
  put(sc, "scanner", box(1.4, 1.2, 1.0, undefined, true), { at: SCAN });
  const SLIDE0: Vec3 = [SCAN[0] - 1.6, SCAN[1] - 0.2, 0], SLIDE1: Vec3 = [SCAN[0], SCAN[1] - 0.2, 0];
  const slide = put(sc, "slide", box(0.8, 0.04, 0.3, "accent", true), { at: SLIDE0 });
  const tissue = put(sc, "tissue", disc(0.1, 8, "hot", "y"), { at: [SLIDE0[0], SLIDE0[1] + 0.03, 0] });
  const lens = put(sc, "lens", cylinder(0.12, 0.35, 8, 2, undefined, false, true), { at: [SCAN[0] - 0.3, SCAN[1] + 0.15, 0] });
  const beam = put(sc, "beam", line([SCAN[0] - 0.3, SCAN[1] - 0.02, 0], [SCAN[0] - 0.3, SCAN[1] - 0.18, 0], "accent"));
  const IMG: Vec3 = [0.9, 0.3, 0]; const tiles: Part[] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) tiles.push(put(sc, `t${r}${c}`, quad(0.3, 0.3, "soft"), { at: [IMG[0] - 0.45 + c * 0.3, IMG[1] + 0.45 - r * 0.3, 0] }));
  const pyr: Part[] = []; for (let i = 0; i < 3; i++) pyr.push(put(sc, `p${i}`, quad(1.0 - 0.25 * i, 1.0 - 0.25 * i, "soft"), { at: [IMG[0], IMG[1], -0.3 * (i + 1)] }));
  const viewer = put(sc, "viewer", figure("soft"), { at: [2.9, -0.35, 0], scale: 0.6 });
  const ai = put(sc, "ai", box(0.5, 0.4, 0.3, "accent", true), { at: [2.9, 1.1, 0] });
  const l1 = put(sc, "l1", arrow([IMG[0] + 0.7, IMG[1], 0], [2.55, -0.1, 0], "accent"));
  const l2 = put(sc, "l2", arrow([IMG[0] + 0.7, IMG[1] + 0.3, 0], [2.6, 1.0, 0], "accent"));
  sc.mesh.labels = [L([SLIDE0[0], 0.5, 0], "Glass slide"), L([SCAN[0], 1.0, 0], "Scanner"), L([IMG[0], 1.2, 0], "Stitched gigapixel image"), L([2.9, 1.65, 0], "Remote sign-out and AI")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, ...tiles, ...pyr, viewer, ai, l1, l2, beam);
    const s = stageOf(t);
    const slideIn = (u: number) => { moveTo(pts, base, slide, SLIDE0, SLIDE1, u); moveTo(pts, base, tissue, [SLIDE0[0], SLIDE0[1] + 0.03, 0], [SLIDE1[0], SLIDE1[1] + 0.03, 0], u); };
    if (s === 0) { const u = Q(t, 0); slideIn(u); setAlpha(alpha, beam, u > 0.9 ? 1 : 0); return { caption: "1 · A glass slide goes into the scanner; a microscope objective sweeps over it at 20 to 40 times magnification" }; }
    if (s === 1) { const u = Q(t, 1); slideIn(1); setAlpha(alpha, beam, pulse(t, 10)); movePart(pts, base, lens, [0.3 * Math.sin(u * TAU * 2), 0, 0.2 * Math.cos(u * TAU)], 1); cascade(alpha, tiles, u); return { caption: "2 · Thousands of small tiles are captured and stitched into one gigapixel image" }; }
    if (s === 2) { const u = Q(t, 2); slideIn(1); setAlpha(alpha, beam, 0.3); show(alpha, 1, ...tiles); cascade(alpha, pyr, u); return { caption: "3 · The image is stored as a pyramid of zoom levels (1 to 4 GB per slide) and indexed by an image-management system linked to the lab record" }; }
    const u = Q(t, 3); slideIn(1); setAlpha(alpha, beam, 0.3); show(alpha, 1, ...tiles); show(alpha, 0.7, ...pyr); grow(alpha, l1, u); grow(alpha, l2, u); setAlpha(alpha, viewer, u); setAlpha(alpha, ai, u > 0.5 ? pulse(t, 4) : 0);
    return { caption: "4 · Pathologists sign out remotely, seek second opinions and run AI over the archive; scanner-to-scanner colour and focus differences are the catch" };
  });
}

// ---------------------------------------------------------------- 5. antiemetics for chemotherapy-induced nausea and vomiting
export function antiemetics(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [-0.4, 0, 0];
  put(sc, "patient", figure(), { at: PAT });
  const centre = put(sc, "centre", small(0.09, "hot"), { at: [PAT[0] + 0.02, 0.82, 0.12] });
  put(sc, "gut", tube(0.14, 0.5, "soft"), { at: [PAT[0], 0.15, 0.05] });
  const drip = put(sc, "drip", box(0.3, 0.45, 0.14, undefined, true), { at: [-1.9, 1.5, 0] });
  const dripLine = put(sc, "dripLine", polyline([[-1.9, 1.27, 0], [-1.4, 0.6, 0], [PAT[0] - 0.4, 0.3, 0.05]], "soft"));
  const GUT: Vec3 = [PAT[0], 0.15, 0.12], CENTRE: Vec3 = [PAT[0], 0.8, 0.14], SHIELD: Vec3 = [PAT[0], 0.5, 0.14];
  const sig: Part[] = []; for (let i = 0; i < 5; i++) sig.push(put(sc, `s${i}`, octahedron(0.06, "hot"), { at: GUT }));
  const shield = put(sc, "shield", ring(0.2, 12, "accent", "z"), { at: SHIELD });
  const blockers: Part[] = []; for (let i = 0; i < 4; i++) blockers.push(put(sc, `b${i}`, cylinder(0.11, 0.34, 8, 2, "accent", true, true), { at: [1.2 + 0.55 * i, -0.7, 0], rotZ: 0.5 }));
  const risk = put(sc, "risk", ticks(1.0, 3.0, 0.9, 4, "soft"));
  const riskArrow = put(sc, "riskArrow", arrow([1.0, 1.1, 0], [3.0, 1.1, 0], "hot"));
  sc.mesh.labels = [L([-1.9, 2.0, 0], "Chemotherapy (e.g. cisplatin)"), L([PAT[0], 1.4, 0], "Vomiting centre"), L([PAT[0] - 1.0, -0.2, 0], "Gut releases serotonin"), L([2.0, -1.2, 0], "5-HT3 · NK1 · dexamethasone · olanzapine")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...sig, shield, ...blockers, risk, riskArrow);
    const s = stageOf(t);
    const travel = (i: number, u: number, stopAt = 1) => { const v = clamp(u * 1.6 - i * 0.15) * stopAt; moveTo(pts, base, sig[i], GUT, CENTRE, v); setAlpha(alpha, sig[i], v > 0 && v < 1 ? 1 : 0.3); };
    if (s === 0) { const u = Q(t, 0); grow(alpha, dripLine, u); setAlpha(alpha, drip, 0.5 + 0.5 * u); sig.forEach((_, i) => travel(i, u)); setAlpha(alpha, centre, 0.4 + 0.6 * pulse(t, 5)); return { caption: "1 · Chemotherapy such as cisplatin injures the gut lining, which releases serotonin; the signal reaches the brain's vomiting centre" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, shield, u); setAlpha(alpha, blockers[0], 1); movePart(pts, base, blockers[0], [0, 0, 0], 1 + 0.2 * pulse(t, 4)); sig.forEach((_, i) => travel(i, 0.6 + 0.4 * u, 0.52)); setAlpha(alpha, centre, 0.4); return { caption: "2 · Given before the dose, a 5-HT3 blocker (ondansetron, palonosetron) stops the serotonin signal: the acute phase" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, shield, 1); movePart(pts, base, shield, [0, 0, 0], 1 + 0.4 * u); setAlpha(alpha, blockers[0], 1); cascade(alpha, [blockers[1], blockers[2], blockers[3]], u); sig.forEach((_, i) => travel(i, 1, 0.5)); setAlpha(alpha, centre, 0.3); return { caption: "3 · An NK1 blocker (aprepitant) and dexamethasone cover the delayed phase over the following days; olanzapine adds a fourth layer for the highest-risk regimens" }; }
    const u = Q(t, 3); setAlpha(alpha, shield, 1); movePart(pts, base, shield, [0, 0, 0], 1.4); show(alpha, 1, ...blockers); sig.forEach((_, i) => travel(i, 1, 0.5)); setAlpha(alpha, centre, 0.3); setAlpha(alpha, risk, u); grow(alpha, riskArrow, u);
    return { caption: "4 · Prophylaxis is matched to the emetic risk of each regimen: complete control in about 70 to 80% even with cisplatin; delayed nausea is the weak spot" };
  });
}

// ---------------------------------------------------------------- 6. alternative medicine used instead of standard treatment
export function alternativeInsteadOfTreatment(): Mesh {
  const sc = scene();
  const START: Vec3 = [-2.6, 0, 0];
  put(sc, "patient", figure(), { at: START });
  const tum0 = put(sc, "tum0", blob(0.12), { at: [START[0] + 0.15, 0.25, 0.1] });
  const fork = put(sc, "fork", polyline([[-2.1, 0, 0], [-1.5, 0, 0], [-0.9, 0.9, 0]], "soft"));
  const fork2 = put(sc, "fork2", polyline([[-1.5, 0, 0], [-0.9, -0.9, 0]], "soft"));
  const hosp = put(sc, "hosp", box(0.8, 0.7, 0.5, undefined, true), { at: [-0.1, 1.1, 0] });
  const beamU = put(sc, "beamU", polyline([[-0.5, 1.9, 0], [0.0, 1.3, 0], [0.3, 1.95, 0]], "accent"));
  const tumU = put(sc, "tumU", blob(0.2), { at: [1.2, 1.0, 0] });
  const tick = put(sc, "tick", polyline([[1.7, 1.0, 0], [1.85, 0.8, 0], [2.2, 1.3, 0]], "accent"));
  const leaf = put(sc, "leaf", polyline([[-0.4, -1.1, 0], [-0.1, -0.7, 0], [0.2, -1.1, 0], [-0.1, -1.4, 0]], "hot", true));
  const tumL = put(sc, "tumL", blob(0.2), { at: [1.2, -1.0, 0] });
  const spread: Part[] = []; for (let i = 0; i < 5; i++) spread.push(put(sc, `sp${i}`, small(0.07, "hot"), { at: [1.2, -1.0, 0] }));
  const b1 = put(sc, "b1", bar(2.6, 0.4, 0.25, "accent"), { at: [0, -0.5, 0] });
  const b2 = put(sc, "b2", bar(3.0, 1.0, 0.25, "hot"), { at: [0, -0.5, 0] });
  const bBase = put(sc, "bBase", line([2.35, -0.5, 0], [3.25, -0.5, 0], "soft"));
  sc.mesh.labels = [L([-0.1, 2.25, 0], "Standard treatment"), L([-0.1, -1.8, 0], "Alternative therapy alone"), L([2.8, 0.9, 0], "Risk of death"), L([START[0], 1.35, 0], "Curable tumour")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, hosp, beamU, tumU, tick, leaf, tumL, ...spread, b1, b2, bBase);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, tum0, pulse(t, 4)); grow(alpha, fork, u); grow(alpha, fork2, u); return { caption: "1 · A curable, non-metastatic cancer is found: two roads" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, hosp, 1); setAlpha(alpha, beamU, pulse(t, 5)); setAlpha(alpha, tumU, 1); movePart(pts, base, tumU, [0, 0, 0], 1 - 0.8 * u); grow(alpha, tick, u); return { caption: "2 · Standard road: surgery, chemotherapy, radiotherapy or hormone therapy; the tumour is removed or shrinks" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, hosp, 0.5); setAlpha(alpha, tumU, 1); movePart(pts, base, tumU, [0, 0, 0], 0.2); setAlpha(alpha, tick, 0.6); setAlpha(alpha, leaf, 1); setAlpha(alpha, tumL, 1); movePart(pts, base, tumL, [0, 0, 0], 1 + 0.7 * u); spread.forEach((p, i) => { const a = 0.4 + i * 1.1; const v = clamp(u * 1.4 - i * 0.1); setAlpha(alpha, p, v); moveTo(pts, base, p, [1.2, -1.0, 0], [1.2 + 0.9 * Math.cos(a), -1.0 + 0.6 * Math.sin(a), 0.2 * Math.sin(i)], v); }); return { caption: "3 · Alternative road: an unproven therapy on its own; the tumour keeps growing and spreads, from curable to incurable" }; }
    const u = Q(t, 3); setAlpha(alpha, hosp, 0.5); setAlpha(alpha, tumU, 1); movePart(pts, base, tumU, [0, 0, 0], 0.2); setAlpha(alpha, tick, 0.6); setAlpha(alpha, leaf, 0.6); setAlpha(alpha, tumL, 1); movePart(pts, base, tumL, [0, 0, 0], 1.7); spread.forEach((p, i) => { const a = 0.4 + i * 1.1; setAlpha(alpha, p, 1); moveTo(pts, base, p, [1.2, -1.0, 0], [1.2 + 0.9 * Math.cos(a), -1.0 + 0.6 * Math.sin(a), 0.2 * Math.sin(i)], 1); }); setAlpha(alpha, bBase, 1); setAlpha(alpha, b1, clamp(u * 2)); setAlpha(alpha, b2, clamp(u * 2 - 0.5));
    return { caption: "4 · In the US National Cancer Database, patients who chose alternative medicine alone were two and a half times as likely to die (over five times in breast cancer); complementary care alongside treatment is a different choice" };
  });
}

// ---------------------------------------------------------------- 7. minoxidil for persistent chemotherapy- and endocrine-therapy hair loss
export function minoxidilAlopecia(): Mesh {
  const sc = scene();
  const SCALP: Vec3 = [-1.0, -0.7, 0];
  put(sc, "scalp", ellipsoid(2.0, 0.6, 1.2, 4, 12, "soft", true), { at: SCALP });
  const N = 7; const hairs: Part[] = []; const foll: Part[] = [];
  for (let i = 0; i < N; i++) {
    const x = SCALP[0] - 1.5 + (3.0 * i) / (N - 1); const y = SCALP[1] + 0.6 * Math.sqrt(Math.max(0, 1 - ((x - SCALP[0]) / 2.0) ** 2));
    foll.push(put(sc, `f${i}`, small(0.06), { at: [x, y - 0.1, 0] }));
    hairs.push(put(sc, `h${i}`, polyline([[x, y, 0], [x + 0.05, y + 0.45, 0], [x + 0.15, y + 0.8, 0]])));
  }
  const FOL: Vec3 = [2.2, 0.0, 0];
  put(sc, "folWall", cylinder(0.3, 1.2, 10, 3, "soft", false, true), { at: [FOL[0], FOL[1] + 0.3, 0] });
  const bulb = put(sc, "bulb", sphere(0.26, 4, 8, undefined, true), { at: [FOL[0], FOL[1] - 0.3, 0] });
  const shaft = put(sc, "shaft", polyline([[FOL[0], FOL[1] - 0.1, 0], [FOL[0], FOL[1] + 0.7, 0], [FOL[0], FOL[1] + 1.4, 0]]));
  const vessel = put(sc, "vessel", tree([FOL[0] - 1.3, FOL[1] - 0.95, 0], 0.55, "hot"));
  const channel = put(sc, "channel", ring(0.12, 8, "accent", "z"), { at: [FOL[0] - 0.3, FOL[1] - 0.3, 0.05] });
  const BOT: Vec3 = [0.6, 1.5, 0];
  const bottle = put(sc, "bottle", cylinder(0.14, 0.45, 8, 2, "accent", true, true), { at: BOT });
  const drops: Part[] = []; for (let i = 0; i < 3; i++) drops.push(put(sc, `d${i}`, octahedron(0.05, "accent"), { at: [BOT[0], BOT[1] - 0.3, 0] }));
  sc.mesh.labels = [L([SCALP[0], 0.9, 0], "Scalp after chemotherapy or endocrine therapy"), L([FOL[0], 1.75, 0], "Follicle, close up"), L([BOT[0], 1.95, 0], "Minoxidil lotion or low-dose tablet"), L([FOL[0] - 1.1, -1.35, 0], "Blood supply")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...drops, channel); setAlpha(alpha, vessel, 0.25); setAlpha(alpha, bottle, 0.3);
    const s = stageOf(t);
    const thin = (k: number) => { hairs.forEach((h, i) => grow(alpha, h, 1 - k * (i % 2 ? 0.75 : 0.5))); foll.forEach((f) => movePart(pts, base, f, [0, 0, 0], 1 - 0.4 * k)); movePart(pts, base, bulb, [0, 0, 0], 1 - 0.4 * k); grow(alpha, shaft, 1 - 0.5 * k); };
    if (s === 0) { thin(Q(t, 0)); return { caption: "1 · Docetaxel, or years of tamoxifen or an aromatase inhibitor, leave follicles miniaturised: hair thin and slow to return" }; }
    if (s === 1) { const u = Q(t, 1); thin(1); setAlpha(alpha, bottle, 1); drops.forEach((d, i) => { const v = clamp(u * 1.5 - i * 0.2); setAlpha(alpha, d, v > 0 && v < 1 ? 1 : 0); moveTo(pts, base, d, [BOT[0], BOT[1] - 0.3, 0], [BOT[0] - 0.4 + 0.4 * i, SCALP[1] + 0.5, 0], v); }); setAlpha(alpha, channel, u > 0.6 ? pulse(t, 5) : 0); return { caption: "2 · Minoxidil, as a lotion or a low-dose tablet, opens potassium channels in the follicle" }; }
    if (s === 2) { const u = Q(t, 2); thin(1 - 0.4 * u); setAlpha(alpha, bottle, 1); setAlpha(alpha, channel, 1); grow(alpha, vessel, u); setAlpha(alpha, bulb, 0.6 + 0.4 * pulse(t, 4)); return { caption: "3 · Blood flow and growth signals rise; the growth phase (anagen) lasts longer and small follicles enlarge again" }; }
    const u = Q(t, 3); thin(0.6 * (1 - u)); setAlpha(alpha, bottle, 1); setAlpha(alpha, channel, 1); setAlpha(alpha, vessel, 1);
    return { caption: "4 · Regrowth over months in most patients in dermatology series; watch for scalp irritation, unwanted facial hair and, with tablets, blood pressure" };
  });
}

// ---------------------------------------------------------------- 8. nutrition support and cachexia management
export function nutritionSupport(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [-2.3, 0, 0];
  put(sc, "patient", figure(), { at: PAT });
  const muscle = put(sc, "muscle", ellipsoid(0.16, 0.4, 0.14, 3, 8, undefined, true), { at: [PAT[0] - 0.48, -0.4, 0.05] });
  const AX: Vec3 = [-1.3, 0.5, 0];
  put(sc, "axes", axes(AX, 1.6, 1.0));
  const wLoss = put(sc, "wLoss", polyline([[AX[0], AX[1] + 0.9, 0], [AX[0] + 0.5, AX[1] + 0.75, 0], [AX[0] + 1.0, AX[1] + 0.45, 0]], "hot"));
  const wGain = put(sc, "wGain", polyline([[AX[0] + 1.0, AX[1] + 0.45, 0], [AX[0] + 1.3, AX[1] + 0.5, 0], [AX[0] + 1.6, AX[1] + 0.65, 0]], "accent"));
  const screen = put(sc, "screen", doc(0.6, 0.8, 4), { at: [-1.0, -0.9, 0] });
  const counsel = put(sc, "counsel", figure("accent"), { at: [0.5, -0.5, 0], scale: 0.5 });
  const supp = put(sc, "supp", cylinder(0.12, 0.4, 8, 2, "accent", true, true), { at: [1.2, -0.75, 0] });
  const feed = put(sc, "feed", polyline([[1.9, 0.5, 0], [1.9, -0.4, 0], [2.2, -0.75, 0]], "accent"));
  const ivBag = put(sc, "ivBag", box(0.25, 0.35, 0.12, "soft", true), { at: [2.8, 0.7, 0] });
  const iv = put(sc, "iv", polyline([[2.8, 0.5, 0], [2.8, -0.5, 0]], "soft"));
  const stair = put(sc, "stair", polyline([[0.2, -1.2, 0], [0.9, -1.2, 0], [0.9, -1.05, 0], [1.6, -1.05, 0], [1.6, -0.9, 0], [2.4, -0.9, 0], [2.4, -0.75, 0], [3.1, -0.75, 0]], "soft"));
  const dumb = put(sc, "dumb", dumbbell(0.7, "accent"), { at: [0.9, 1.3, 0] });
  const drug = put(sc, "drug", antibody(0.28, "accent"), { at: [1.9, 1.3, 0] });
  sc.mesh.labels = [L([AX[0] + 0.8, AX[1] + 1.3, 0], "Weight"), L([-1.0, -1.45, 0], "Screen (NRS-2002, PG-SGA)"), L([1.7, -1.5, 0], "Step up: counselling, supplements, tube, vein"), L([1.4, 1.85, 0], "Cachexia: nutrition + exercise + drugs")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, wLoss, wGain, screen, counsel, supp, feed, ivBag, iv, dumb, drug); setAlpha(alpha, stair, 0.25);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); grow(alpha, wLoss, u); movePart(pts, base, muscle, [0, 0, 0], 1 - 0.4 * u); setAlpha(alpha, screen, u); return { caption: "1 · Screening at diagnosis and through treatment: weight loss, appetite and intake are scored (NRS-2002, PG-SGA)" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, wLoss, 1); movePart(pts, base, muscle, [0, 0, 0], 0.6); setAlpha(alpha, screen, 1); cascade(alpha, [counsel, supp], u); grow(alpha, stair, 0.4 * u); return { caption: "2 · First steps: dietitian counselling and oral supplements" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, wLoss, 1); movePart(pts, base, muscle, [0, 0, 0], 0.6); setAlpha(alpha, screen, 1); show(alpha, 1, counsel, supp); grow(alpha, feed, u); setAlpha(alpha, ivBag, u > 0.6 ? 0.5 : 0); setAlpha(alpha, iv, u > 0.6 ? 0.5 : 0); setAlpha(alpha, stair, 0.4 + 0.6 * u); return { caption: "3 · If swallowing or the gut fails, tube feeding, e.g. during chemoradiation for head and neck or oesophageal cancer; intravenous feeding only rarely, since it seldom helps and carries risk" }; }
    const u = Q(t, 3); setAlpha(alpha, wLoss, 1); grow(alpha, wGain, u); movePart(pts, base, muscle, [0, 0, 0], 0.6 + 0.4 * u); setAlpha(alpha, muscle, 0.6 + 0.4 * pulse(t, 4)); setAlpha(alpha, screen, 1); show(alpha, 1, counsel, supp, feed); show(alpha, 0.5, ivBag, iv); setAlpha(alpha, stair, 1); setAlpha(alpha, dumb, u); setAlpha(alpha, drug, u); movePart(pts, base, dumb, [0, 0.1 * Math.sin(t * TAU * 3), 0], 1);
    return { caption: "4 · Cachexia is treated as a whole: nutrition plus resistance exercise plus appetite or anti-GDF-15 drugs (anamorelin, ponsegromab), not feeding alone" };
  });
}

// ---------------------------------------------------------------- 9. transfusion support and anaemia management
export function transfusionSupport(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [-0.5, 0, 0];
  put(sc, "patient", figure(), { at: PAT });
  const marrow = put(sc, "marrow", cloud(12, 0.35, "accent", 3), { at: [PAT[0], -0.4, 0.05] });
  const G: Vec3 = [-2.4, 0, 0];
  put(sc, "gauge", cylinder(0.25, 2.0, 10, 2, "soft"), { at: G });
  const levels: Part[] = []; for (let i = 0; i < 8; i++) levels.push(put(sc, `lv${i}`, disc(0.25, 10, "hot", "y"), { at: [G[0], G[1] - 0.88 + 0.25 * i, 0] }));
  const thresh = put(sc, "thresh", ring(0.34, 12, "accent", "y"), { at: [G[0], G[1] - 1.0 + 0.25 * 3, 0] });
  const rbc = put(sc, "rbc", box(0.4, 0.55, 0.15, "hot", true), { at: [1.1, 1.5, 0] });
  const plt = put(sc, "plt", box(0.4, 0.55, 0.15, "accent", true), { at: [1.8, 1.5, 0] });
  const ln1 = put(sc, "ln1", polyline([[1.1, 1.22, 0], [0.5, 0.6, 0], [PAT[0] + 0.4, 0.3, 0.05]], "hot"));
  const ln2 = put(sc, "ln2", polyline([[1.8, 1.22, 0], [0.9, 0.7, 0], [PAT[0] + 0.42, 0.35, 0.08]], "accent"));
  const ESA: Vec3 = [2.0, -0.2, 0], IRON: Vec3 = [2.6, -0.5, 0];
  const esa = put(sc, "esa", syringe(0.6, "accent"), { at: ESA, rotZ: -Math.PI / 2 });
  const iron = put(sc, "iron", octahedron(0.12, "accent"), { at: IRON });
  const overload = put(sc, "overload", cloud(8, 0.3, "hot", 7), { at: [PAT[0], -0.4, 0.12] });
  const chel = put(sc, "chel", ring(0.2, 10, "accent", "z"), { at: [PAT[0] + 0.7, -0.9, 0] });
  sc.mesh.labels = [L([G[0], 1.4, 0], "Haemoglobin"), L([G[0] + 0.95, -0.25, 0], "Restrictive threshold"), L([1.45, 2.0, 0], "Red cells · platelets"), L([2.3, -1.0, 0], "ESA and intravenous iron")];
  const base = sc.mesh.points;
  const level = (alpha: number[], k: number) => levels.forEach((l, i) => setAlpha(alpha, l, clamp(k - i)));
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, rbc, plt, ln1, ln2, esa, iron, overload, chel);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, marrow, 1 - 0.7 * u); level(alpha, lerp(7, 2, u)); setAlpha(alpha, thresh, 0.4); return { caption: "1 · Chemotherapy or marrow failure leaves too few red cells and platelets: anaemia, fatigue, bleeding risk" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, marrow, 0.3); show(alpha, 1, rbc, plt); grow(alpha, ln1, u); grow(alpha, ln2, u); level(alpha, lerp(2, 3.5, u)); setAlpha(alpha, thresh, pulse(t, 4)); return { caption: "2 · Transfuse only below a restrictive threshold (haemoglobin 7 to 8 g/dL; platelets 10×10⁹/L): trials showed more is not better" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.5, rbc, plt, ln1, ln2); level(alpha, lerp(3.5, 4.5, u)); setAlpha(alpha, thresh, 0.6); show(alpha, 1, esa, iron); moveTo(pts, base, esa, ESA, [PAT[0] + 0.9, 0.2, 0], u); moveTo(pts, base, iron, IRON, [PAT[0] + 0.6, -0.1, 0.1], u); setAlpha(alpha, marrow, 0.3 + 0.7 * u * pulse(t, 4)); return { caption: "3 · Erythropoiesis-stimulating agents and intravenous iron push the marrow to make red cells; ESAs are capped, since high haemoglobin targets caused clots and deaths in trials" }; }
    const u = Q(t, 3); show(alpha, 0.5, rbc, plt, ln1, ln2); level(alpha, 4.5); setAlpha(alpha, thresh, 0.6); show(alpha, 0.5, esa, iron); moveTo(pts, base, esa, ESA, [PAT[0] + 0.9, 0.2, 0], 1); moveTo(pts, base, iron, IRON, [PAT[0] + 0.6, -0.1, 0.1], 1); setAlpha(alpha, marrow, 0.8); setAlpha(alpha, overload, u < 0.5 ? u * 2 : 2 - 2 * u); setAlpha(alpha, chel, u > 0.4 ? 1 : 0); moveTo(pts, base, chel, [PAT[0] + 0.7, -0.9, 0], [PAT[0] + 0.2, -0.45, 0.1], clamp(u * 2 - 0.8));
    return { caption: "4 · Years of transfusion load iron, treated with chelation; newer MDS drugs (luspatercept, imetelstat) cut the need for transfusion" };
  });
}

// ---------------------------------------------------------------- 10. bone-modifying agents
export function boneModifyingAgents(): Mesh {
  const sc = scene();
  put(sc, "bone", tube(0.5, 3.6, "soft"));
  const TUM: Vec3 = [0.3, 0.6, 0.15];
  const tum = put(sc, "tum", blob(0.3), { at: TUM });
  const oc: Part[] = []; for (let i = 0; i < 3; i++) oc.push(put(sc, `oc${i}`, small(0.14, "hot"), { at: [-0.7 + 0.5 * i, 0.42, 0.38] }));
  const PIT: Vec3 = [-0.2, 0.3, 0.42];
  const pit = put(sc, "pit", polyline([[-1.0, 0.5, 0.42], [-0.7, 0.28, 0.42], [-0.2, 0.22, 0.42], [0.3, 0.28, 0.42], [0.6, 0.5, 0.42]], "hot"));
  const rankl: Part[] = []; for (let i = 0; i < 4; i++) rankl.push(put(sc, `rk${i}`, octahedron(0.05, "hot"), { at: TUM }));
  const gf: Part[] = []; for (let i = 0; i < 4; i++) gf.push(put(sc, `gf${i}`, octahedron(0.05, "accent"), { at: PIT }));
  const BP0: Vec3 = [-2.6, 1.6, 0.2];
  const bp: Part[] = []; for (let i = 0; i < 5; i++) bp.push(put(sc, `bp${i}`, octahedron(0.07, "accent"), { at: BP0 }));
  const AB0: Vec3 = [2.4, 1.5, 0], AB1: Vec3 = [-0.3, 1.0, 0.3];
  const ab = put(sc, "ab", antibody(0.35, "accent"), { at: AB0 });
  sc.mesh.labels = [L([-1.6, 1.0, 0], "Bone"), L([TUM[0], 1.25, 0], "Tumour deposit"), L([-0.3, -0.35, 0.4], "Osteoclasts dissolving bone"), L([2.4, 2.0, 0], "Denosumab catches RANKL")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...bp, ab);
    const s = stageOf(t);
    const cycle = (u: number, stopAt = 1) => { rankl.forEach((r, i) => { const v = ((u + i * 0.25) % 1) * stopAt; moveTo(pts, base, r, TUM, [-0.4, 0.5, 0.4], v); setAlpha(alpha, r, v > 0.05 && v < 0.95 ? 1 : 0); }); gf.forEach((g, i) => { const v = (u + i * 0.25) % 1; moveTo(pts, base, g, PIT, TUM, v); setAlpha(alpha, g, v > 0.05 && v < 0.95 ? 1 : 0); }); };
    if (s === 0) { const u = Q(t, 0); cycle(t * 4); oc.forEach((o, i) => setAlpha(alpha, o, 0.6 + 0.4 * pulse(t + i * 0.1, 5))); grow(alpha, pit, u); return { caption: "1 · Tumour cells in bone stir up osteoclasts, which dissolve bone; growth factors released from the bone feed the tumour: a vicious cycle" }; }
    if (s === 1) { const u = Q(t, 1); cycle(t * 4); bp.forEach((b, i) => { const v = clamp(u * 1.5 - i * 0.12); setAlpha(alpha, b, 1); moveTo(pts, base, b, BP0, [-1.1 + 0.45 * i, 0.55, 0.4], v); }); oc.forEach((o, i) => setAlpha(alpha, o, 1 - 0.5 * clamp(u * 2 - i * 0.3))); return { caption: "2 · Bisphosphonates (zoledronic acid) coat the bone surface and poison the osteoclasts that swallow them" }; }
    if (s === 2) { const u = Q(t, 2); cycle(t * 4, 1 - 0.5 * u); bp.forEach((b, i) => { setAlpha(alpha, b, 1); moveTo(pts, base, b, BP0, [-1.1 + 0.45 * i, 0.55, 0.4], 1); }); show(alpha, 0.5, ...oc); setAlpha(alpha, ab, 1); moveTo(pts, base, ab, AB0, AB1, u, 1, u * 2); return { caption: "3 · Denosumab, an antibody, mops up RANKL, the signal osteoclasts need to form and survive" }; }
    const u = Q(t, 3); cycle(t * 4, 0.5); gf.forEach((g) => setAlpha(alpha, g, 0)); bp.forEach((b, i) => { setAlpha(alpha, b, 1); moveTo(pts, base, b, BP0, [-1.1 + 0.45 * i, 0.55, 0.4], 1); }); show(alpha, 0.5 * (1 - u), ...oc); setAlpha(alpha, ab, 1); moveTo(pts, base, ab, AB0, AB1, 1); setAlpha(alpha, pit, 1 - 0.7 * u); movePart(pts, base, tum, [0, 0, 0], 1 - 0.25 * u);
    return { caption: "4 · Fewer fractures, less cord compression and pain; adjuvant bisphosphonates cut bone recurrence in postmenopausal breast cancer. Watch the jaw (osteonecrosis) and calcium" };
  });
}

// ---------------------------------------------------------------- 11. psycho-oncology and distress screening
export function psychoOncology(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [-2.4, 0, 0];
  put(sc, "patient", figure(), { at: PAT });
  const waves: Part[] = []; for (let i = 0; i < 3; i++) waves.push(put(sc, `w${i}`, ring(0.3 + 0.15 * i, 12, "hot", "z"), { at: [PAT[0], 0.8, 0] }));
  const TH: Vec3 = [-1.1, 0.1, 0];
  put(sc, "therm", cylinder(0.12, 1.6, 8, 2, "soft", false, true), { at: TH }); put(sc, "bulb", sphere(0.2, 3, 8, "soft", true), { at: [TH[0], TH[1] - 0.9, 0] });
  const merc = put(sc, "merc", cylinder(0.06, 1.2, 6, 2, "hot", true, true), { at: [TH[0], TH[1] - 0.2, 0] });
  put(sc, "thTicks", ticks(TH[0] + 0.2, TH[0] + 0.2, TH[1] - 0.5, 1, "soft"), { rotZ: Math.PI / 2 });
  const STAIR: Vec3 = [0, -1.0, 0];
  const steps: Part[] = []; for (let i = 0; i < 4; i++) steps.push(put(sc, `step${i}`, bar(0.3 + 0.6 * i, 0.3 + 0.3 * i, 0.45, "accent"), { at: STAIR }));
  const climber = put(sc, "climber", small(0.12, "hot"), { at: [STAIR[0] + 0.3, STAIR[1] + 0.45, 0] });
  const onc = put(sc, "onc", figure("soft"), { at: [2.9, 0.7, 0], scale: 0.5 });
  const psy = put(sc, "psy", figure("accent"), { at: [2.9, -0.5, 0], scale: 0.5 });
  const link = put(sc, "link", line([2.9, 0.25, 0], [2.9, -0.05, 0], "accent"));
  sc.mesh.labels = [L([PAT[0], 1.55, 0], "Distress"), L([TH[0], 1.25, 0], "Distress Thermometer"), L([1.2, -1.45, 0], "Stepped care"), L([2.9, 1.45, 0], "Mental-health specialist in the team")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, ...steps, climber, onc, psy, link); setAlpha(alpha, merc, 0.2); movePart(pts, base, merc, [0, 0, 0], 0.2);
    const s = stageOf(t);
    const ripple = (a: number) => waves.forEach((w, i) => { const v = (t * 3 + i / 3) % 1; movePart(pts, base, w, [0, 0, 0], 0.6 + 0.9 * v); setAlpha(alpha, w, a * (1 - v)); });
    if (s === 0) { ripple(1); return { caption: "1 · About a third of people with cancer meet criteria for anxiety, depression or another disorder; most goes unseen unless someone asks" }; }
    if (s === 1) { const u = Q(t, 1); ripple(1); setAlpha(alpha, merc, 0.2 + 0.8 * u); movePart(pts, base, merc, [0, 0, 0], 0.2 + 0.8 * u); return { caption: "2 · Everyone is screened with a validated tool such as the Distress Thermometer, a requirement for accredited cancer centres" }; }
    if (s === 2) { const u = Q(t, 2); ripple(0.7); setAlpha(alpha, merc, 1); movePart(pts, base, merc, [0, 0, 0], 1); cascade(alpha, steps, u); setAlpha(alpha, climber, 1); moveTo(pts, base, climber, [STAIR[0] + 0.3, STAIR[1] + 0.45, 0], [STAIR[0] + 2.1, STAIR[1] + 1.35, 0], u); return { caption: "3 · Stepped care: information and peer support, then cancer-adapted therapies (CBT, meaning-centred, CALM, fear-of-recurrence programmes), then psychiatry" }; }
    const u = Q(t, 3); ripple(0.7 * (1 - u)); setAlpha(alpha, merc, 1 - 0.6 * u); movePart(pts, base, merc, [0, 0, 0], 1 - 0.6 * u); show(alpha, 1, ...steps); setAlpha(alpha, climber, 1); moveTo(pts, base, climber, [STAIR[0] + 0.3, STAIR[1] + 0.45, 0], [STAIR[0] + 2.1, STAIR[1] + 1.35, 0], 1); cascade(alpha, [onc, psy, link], u);
    return { caption: "4 · Mental-health specialists sit inside the oncology team; collaborative care lifts depression outcomes above usual care. Screening without a referral route does not help" };
  });
}

// ---------------------------------------------------------------- 12. somatostatin receptor PET
export function sstrPet(): Mesh {
  const sc = scene();
  const CELL: Vec3 = [-1.8, 0, 0];
  put(sc, "cell", cell(0.8), { at: CELL }); put(sc, "nuc", sphere(0.28, 3, 8, "soft"), { at: [CELL[0] + 0.15, 0, 0] });
  const recs: Part[] = []; for (let i = 0; i < 3; i++) { const a = 0.6 + i * 0.5; recs.push(put(sc, `r${i}`, line([CELL[0] + 0.78 * Math.cos(a), 0.78 * Math.sin(a), 0], [CELL[0] + 1.02 * Math.cos(a), 1.02 * Math.sin(a), 0]))); }
  const T0: Vec3 = [-1.0, 2.1, 0.3], DOCK: Vec3 = [CELL[0] + 1.2 * Math.cos(1.1), 1.2 * Math.sin(1.1), 0];
  const pep = put(sc, "pep", helix(0.07, 0.4, 2, 12, "accent"), { at: T0, rotZ: Math.PI / 2 });
  const ISO_OFF: Vec3 = [0.3, 0.05, 0];
  const iso = put(sc, "iso", octahedron(0.09, "hot"), { at: [T0[0] + ISO_OFF[0], T0[1] + ISO_OFF[1], T0[2]] });
  const EMIT: Vec3 = [DOCK[0] + ISO_OFF[0], DOCK[1] + ISO_OFF[1], 0];
  const ph1 = put(sc, "ph1", line(EMIT, [EMIT[0] + 1.4, EMIT[1] + 0.7, 0], "accent"));
  const ph2 = put(sc, "ph2", line(EMIT, [EMIT[0] - 1.4, EMIT[1] - 0.7, 0], "accent"));
  const BODY: Vec3 = [1.9, 0, 0];
  const bodyF = put(sc, "body", figure("soft"), { at: BODY, scale: 0.8 });
  const hots: Part[] = []; const HOT: Vec3[] = [[0.12, 0.1, 0.06], [-0.1, -0.3, 0.06], [0.22, 0.32, 0.06]]; for (let i = 0; i < 3; i++) hots.push(put(sc, `hot${i}`, blob(0.1), { at: [BODY[0] + HOT[i][0], BODY[1] + HOT[i][1], HOT[i][2]] }));
  const pet = put(sc, "pet", torus(1.35, 0.1, 20, 6, undefined, true), { at: BODY, rotX: Math.PI / 2 });
  const handoff = put(sc, "handoff", arrow([BODY[0], -1.55, 0], [BODY[0], -2.1, 0], "hot"));
  sc.mesh.labels = [L([CELL[0], 1.2, 0], "Neuroendocrine tumour cell"), L([CELL[0] + 1.5, 0.85, 0], "SSTR2 receptor"), L([BODY[0], 1.75, 0], "PET ring"), L([BODY[0], -2.35, 0], "Bright uptake qualifies for 177Lu-DOTATATE")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ph1, ph2, ...hots, handoff); setAlpha(alpha, pet, 0.35); setAlpha(alpha, bodyF, 0.5);
    const s = stageOf(t);
    const carry = (u: number, spin = 0) => { moveTo(pts, base, pep, T0, DOCK, u, 1, spin); moveTo(pts, base, iso, [T0[0] + ISO_OFF[0], T0[1] + ISO_OFF[1], T0[2]], EMIT, u); };
    if (s === 0) { const u = Q(t, 0); carry(u, u * 3); show(alpha, u > 0.8 ? pulse(t, 5) : 1, ...recs); return { caption: "1 · A radioactive somatostatin look-alike (68Ga- or 64Cu-DOTATATE) is injected and locks onto SSTR2 receptors on neuroendocrine tumour cells" }; }
    if (s === 1) { const u = Q(t, 1); carry(1); const v = (t * 6) % 1; grow(alpha, ph1, v * 2); grow(alpha, ph2, v * 2); movePart(pts, base, ph1, [0, 0, 0], 0.3 + 0.7 * v); movePart(pts, base, ph2, [0, 0, 0], 0.3 + 0.7 * v); setAlpha(alpha, pet, 0.35 + 0.65 * u * pulse(t, 6)); return { caption: "2 · Each decay sends two gamma photons in opposite directions; the ring of detectors around the patient pins the source" }; }
    if (s === 2) { const u = Q(t, 2); carry(1); show(alpha, 0.4, ph1, ph2); setAlpha(alpha, pet, 0.8); setAlpha(alpha, bodyF, 0.5 + 0.5 * u); cascade(alpha, hots, u); return { caption: "3 · A whole-body map of receptor-rich tumours, far more sensitive than the older octreotide scan; it changes management in about 40% of patients" }; }
    const u = Q(t, 3); carry(1); show(alpha, 0.4, ph1, ph2); setAlpha(alpha, pet, 0.8); setAlpha(alpha, bodyF, 1); hots.forEach((h, i) => { setAlpha(alpha, h, 0.6 + 0.4 * pulse(t + i * 0.1, 4)); movePart(pts, base, h, [0, 0, 0], 1 + 0.3 * u); }); grow(alpha, handoff, u);
    return { caption: "4 · Bright uptake (Krenning score 3 or more) qualifies patients for the matching treatment, 177Lu-DOTATATE; FDG PET covers high-grade disease that stays dark" };
  });
}

// ---------------------------------------------------------------- 13. limb-salvage surgery and endoprosthetic reconstruction
export function limbSalvage(): Mesh {
  const sc = scene();
  const LEG: Vec3 = [0, 0, 0];
  put(sc, "thigh", cylinder(0.32, 1.4, 12, 2, undefined, false, true), { at: [LEG[0], LEG[1] + 1.1, 0] });
  const seg = put(sc, "seg", cylinder(0.32, 0.9, 12, 2, undefined, false, true), { at: [LEG[0], LEG[1] - 0.05, 0] });
  put(sc, "shin", cylinder(0.32, 1.4, 12, 2, undefined, false, true), { at: [LEG[0], LEG[1] - 1.2, 0] });
  const tum = put(sc, "tum", blob(0.36), { at: [LEG[0] + 0.1, LEG[1], 0.05] });
  const margin = put(sc, "margin", cylinder(0.42, 1.0, 12, 2, "accent"), { at: [LEG[0], LEG[1] - 0.05, 0] });
  const cut1 = put(sc, "cut1", ring(0.5, 14, "hot", "y"), { at: [LEG[0], LEG[1] + 0.45, 0] });
  const cut2 = put(sc, "cut2", ring(0.5, 14, "hot", "y"), { at: [LEG[0], LEG[1] - 0.55, 0] });
  const PRO0: Vec3 = [2.4, 0.9, 0], PRO1: Vec3 = [LEG[0], LEG[1] - 0.05, 0];
  const pros = put(sc, "pros", cylinder(0.14, 0.9, 8, 3, "accent", true, true), { at: PRO0 });
  const prosStem1 = put(sc, "stem1", line([PRO0[0], PRO0[1] + 0.45, 0], [PRO0[0], PRO0[1] + 0.8, 0], "accent"));
  const prosStem2 = put(sc, "stem2", line([PRO0[0], PRO0[1] - 0.45, 0], [PRO0[0], PRO0[1] - 0.8, 0], "accent"));
  const saw = put(sc, "saw", polyline([[-2.2, 1.2, 0], [-1.2, 1.2, 0], [-1.2, 1.05, 0]], "soft"));
  const beam = put(sc, "beam", polyline([[-2.4, -1.4, 0], [-0.6, -0.1, 0], [-2.0, -1.9, 0]], "accent"));
  const drip = put(sc, "drip", box(0.3, 0.45, 0.14, "accent", true), { at: [2.5, -1.2, 0] });
  const dripLine = put(sc, "dripLine", polyline([[2.5, -1.42, 0], [1.6, -1.6, 0], [0.35, -1.2, 0.05]], "accent"));
  sc.mesh.labels = [L([LEG[0] + 1.1, 0.3, 0], "Sarcoma"), L([LEG[0] - 1.3, 0.5, 0], "Wide margin"), L([PRO0[0], 1.9, 0], "Metal endoprosthesis"), L([0.2, -2.3, 0], "Chemotherapy (bone) or radiotherapy (soft tissue)")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, margin, cut1, cut2, pros, prosStem1, prosStem2, saw, beam, drip, dripLine);
    const s = stageOf(t);
    if (s === 0) { setAlpha(alpha, tum, pulse(t, 4)); return { caption: "1 · A bone or soft-tissue sarcoma sits in the limb; amputation was once the only option" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, margin, u); setAlpha(alpha, cut1, u > 0.3 ? pulse(t, 6) : 0); setAlpha(alpha, cut2, u > 0.5 ? pulse(t, 6) : 0); setAlpha(alpha, saw, u); moveTo(pts, base, saw, [0, 0, 0], [0.5, -0.7, 0], u); setAlpha(alpha, seg, 1 - 0.7 * clamp(u * 2 - 1)); setAlpha(alpha, tum, 1 - 0.7 * clamp(u * 2 - 1)); return { caption: "2 · Surgeons remove the tumour en bloc with a margin of healthy tissue, guided by imaging and navigation" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.3, margin, cut1, cut2); setAlpha(alpha, seg, 0.3 * (1 - u)); setAlpha(alpha, tum, 0); show(alpha, 1, pros, prosStem1, prosStem2); moveTo(pts, base, pros, PRO0, PRO1, u); moveTo(pts, base, prosStem1, PRO0, PRO1, u); moveTo(pts, base, prosStem2, PRO0, PRO1, u); return { caption: "3 · The gap is rebuilt with a modular metal endoprosthesis, bone graft or a custom 3D-printed implant; growing prostheses lengthen with a child" }; }
    const u = Q(t, 3); show(alpha, 0.3, margin); setAlpha(alpha, seg, 0); setAlpha(alpha, tum, 0); show(alpha, 1, pros, prosStem1, prosStem2); moveTo(pts, base, pros, PRO0, PRO1, 1); moveTo(pts, base, prosStem1, PRO0, PRO1, 1); moveTo(pts, base, prosStem2, PRO0, PRO1, 1); setAlpha(alpha, beam, u > 0.1 ? pulse(t, 5) : 0); setAlpha(alpha, drip, u); grow(alpha, dripLine, u);
    return { caption: "4 · Chemotherapy (bone) or radiotherapy (soft tissue) completes treatment; survival matches amputation and the limb keeps working, with infection and wear the long-term trade-offs" };
  });
}

// ---------------------------------------------------------------- 14. bariatric surgery and cancer incidence
export function bariatricSurgeryCancer(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [-2.0, 0, 0];
  const fig = put(sc, "patient", figure(), { at: PAT });
  const fat = put(sc, "fat", ellipsoid(0.55, 0.5, 0.4, 4, 10, "soft", true), { at: [PAT[0], 0.25, 0] });
  const ST: Vec3 = [-0.3, 0.3, 0];
  const stomach = put(sc, "stomach", organ(0.55, 0.7, 0.4), { at: ST });
  const sleeve = put(sc, "sleeve", cylinder(0.18, 1.3, 10, 3, "accent", false, true), { at: ST });
  const staple = put(sc, "staple", polyline([[ST[0] + 0.2, ST[1] + 0.65, 0.1], [ST[0] + 0.22, ST[1] + 0.2, 0.1], [ST[0] + 0.2, ST[1] - 0.25, 0.1], [ST[0] + 0.22, ST[1] - 0.65, 0.1]], "hot"));
  const sig: Part[] = []; for (let i = 0; i < 6; i++) sig.push(put(sc, `sig${i}`, octahedron(0.06, "hot"), { at: [PAT[0] + 0.3 + 0.12 * (i % 3), 0.5 - 0.25 * Math.floor(i / 3), 0.2] }));
  const womb = put(sc, "womb", organ(0.35, 0.45, 0.3, "hot"), { at: [1.1, -0.9, 0] });
  const AX: Vec3 = [1.8, -0.2, 0];
  put(sc, "axes", axes(AX, 1.5, 1.6));
  const bFull = put(sc, "bFull", bar(AX[0] + 0.45, 1.3, 0.35, "hot"), { at: [0, AX[1], 0] });
  const bLess = put(sc, "bLess", bar(AX[0] + 1.05, 0.87, 0.35, "accent"), { at: [0, AX[1], 0] });
  sc.mesh.labels = [L([PAT[0], 1.45, 0], "Severe obesity"), L([ST[0], 1.35, 0], "Stomach"), L([PAT[0] + 0.7, 0.9, 0], "Insulin, oestrogen, inflammation"), L([AX[0] + 0.75, 1.7, 0], "Cancers over a decade")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, sleeve, staple, bFull, bLess); setAlpha(alpha, fig, 1);
    const s = stageOf(t);
    const signals = (a: number) => sig.forEach((p, i) => { setAlpha(alpha, p, a); movePart(pts, base, p, [0.15 * Math.sin(t * TAU * 2 + i), 0.1 * Math.cos(t * TAU * 2 + i), 0], 1); });
    if (s === 0) { signals(pulse(t, 3)); setAlpha(alpha, womb, 0.5 + 0.5 * pulse(t, 4)); return { caption: "1 · Severe obesity raises insulin, oestrogen and inflammatory signals that drive womb, breast, liver and bowel cancers" }; }
    if (s === 1) { const u = Q(t, 1); signals(1); grow(alpha, staple, u); setAlpha(alpha, sleeve, u); setAlpha(alpha, stomach, 1 - 0.7 * u); movePart(pts, base, fat, [0, 0, 0], 1 - 0.5 * u); setAlpha(alpha, fat, 1 - 0.5 * u); return { caption: "2 · Weight-loss surgery shrinks or bypasses the stomach; weight falls substantially and stays down" }; }
    if (s === 2) { const u = Q(t, 2); signals(1 - 0.8 * u); setAlpha(alpha, staple, 1); setAlpha(alpha, sleeve, 1); setAlpha(alpha, stomach, 0.3); movePart(pts, base, fat, [0, 0, 0], 0.5); setAlpha(alpha, fat, 0.5); setAlpha(alpha, womb, 1 - 0.6 * u); movePart(pts, base, womb, [0, 0, 0], 1 - 0.2 * u); return { caption: "3 · Hormone and inflammatory signals fall; the womb lining changes that precede cancer reverse" }; }
    const u = Q(t, 3); signals(0.2); setAlpha(alpha, staple, 1); setAlpha(alpha, sleeve, 1); setAlpha(alpha, stomach, 0.3); movePart(pts, base, fat, [0, 0, 0], 0.5); setAlpha(alpha, fat, 0.5); setAlpha(alpha, womb, 0.4); movePart(pts, base, womb, [0, 0, 0], 0.8); setAlpha(alpha, bFull, clamp(u * 2)); setAlpha(alpha, bLess, clamp(u * 2 - 0.6));
    return { caption: "4 · Over the following decade, roughly a third fewer cancers than matched people who did not have surgery, largest for womb cancer; the evidence is observational, not randomised" };
  });
}

// ---------------------------------------------------------------- 15. resistance training and protein for cachexia
export function resistanceTraining(): Mesh {
  const sc = scene();
  const ARM: Vec3 = [0, 0, 0];
  put(sc, "boneA", cylinder(0.1, 2.6, 8, 2, "soft", false, true), { at: ARM, rotZ: Math.PI / 2 });
  const muscle = put(sc, "muscle", organ(1.0, 0.55, 0.45, undefined), { at: [ARM[0], ARM[1] + 0.35, 0] });
  const fibres: Part[] = []; for (let i = 0; i < 4; i++) fibres.push(put(sc, `fb${i}`, polyline([[-0.8, 0.2 + 0.1 * i, 0.46], [0, 0.32 + 0.1 * i, 0.46], [0.8, 0.2 + 0.1 * i, 0.46]], "accent")));
  const TUM: Vec3 = [-2.5, 1.3, 0];
  put(sc, "tum", blob(0.32), { at: TUM });
  const cyto: Part[] = []; for (let i = 0; i < 5; i++) cyto.push(put(sc, `cy${i}`, octahedron(0.06, "hot"), { at: TUM }));
  const DB0: Vec3 = [2.6, -1.3, 0], DB1: Vec3 = [1.6, 0.9, 0];
  const dumb = put(sc, "dumb", dumbbell(0.8, "accent"), { at: DB0 });
  const mtor = put(sc, "mtor", ring(0.22, 10, "accent", "z"), { at: [ARM[0] + 0.3, ARM[1] + 0.35, 0.5] });
  const PROT0: Vec3 = [-2.3, -1.3, 0];
  const plate = put(sc, "plate", disc(0.45, 14, "soft", "y"), { at: PROT0 });
  const prot: Part[] = []; for (let i = 0; i < 6; i++) prot.push(put(sc, `pr${i}`, octahedron(0.06, "accent"), { at: [PROT0[0] - 0.2 + 0.08 * i, PROT0[1] + 0.1, 0.1 * Math.sin(i)] }));
  sc.mesh.labels = [L([ARM[0], 1.35, 0], "Muscle"), L([TUM[0], 1.95, 0], "Tumour: inflammatory signals"), L([DB1[0] + 0.3, 1.55, 0], "Load"), L([PROT0[0], -1.85, 0], "Protein, 1.2 to 1.5 g/kg a day")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, mtor, ...prot); setAlpha(alpha, plate, 0.3); setAlpha(alpha, dumb, 0.3);
    const s = stageOf(t);
    const attack = (a: number) => cyto.forEach((c, i) => { const v = (t * 3 + i * 0.2) % 1; moveTo(pts, base, c, TUM, [ARM[0] - 0.6 + 0.3 * i, ARM[1] + 0.5, 0.3], v); setAlpha(alpha, c, a * (v > 0.05 && v < 0.95 ? 1 : 0)); });
    if (s === 0) { const u = Q(t, 0); attack(1); movePart(pts, base, muscle, [0, 0, 0], 1 - 0.35 * u); fibres.forEach((f, i) => setAlpha(alpha, f, 1 - 0.6 * clamp(u * 1.5 - i * 0.15))); return { caption: "1 · Inflammatory signals from the tumour switch on muscle breakdown; muscle shrinks (cachexia)" }; }
    if (s === 1) { const u = Q(t, 1); attack(0.6); movePart(pts, base, muscle, [0, 0, 0], 0.65); show(alpha, 0.4, ...fibres); setAlpha(alpha, dumb, 1); moveTo(pts, base, dumb, DB0, DB1, u); movePart(pts, base, dumb, [DB1[0] - DB0[0], DB1[1] - DB0[1] + 0.15 * Math.sin(t * TAU * 4) * u, 0], 1); setAlpha(alpha, mtor, u > 0.5 ? pulse(t, 5) : 0); return { caption: "2 · Resistance exercise loads the muscle, switching on the building pathway (mTOR)" }; }
    if (s === 2) { const u = Q(t, 2); attack(0.4); movePart(pts, base, muscle, [0, 0, 0], 0.65 + 0.1 * u); show(alpha, 0.5, ...fibres); setAlpha(alpha, dumb, 1); movePart(pts, base, dumb, [DB1[0] - DB0[0], DB1[1] - DB0[1] + 0.15 * Math.sin(t * TAU * 4), 0], 1); setAlpha(alpha, mtor, 1); setAlpha(alpha, plate, 1); prot.forEach((p, i) => { const v = clamp(u * 1.5 - i * 0.1); setAlpha(alpha, p, 1); moveTo(pts, base, p, [PROT0[0] - 0.2 + 0.08 * i, PROT0[1] + 0.1, 0.1 * Math.sin(i)], [ARM[0] - 0.5 + 0.2 * i, ARM[1] + 0.3, 0.4], v); }); return { caption: "3 · Protein, 1.2 to 1.5 g per kilogram a day, supplies the bricks (leucine in particular)" }; }
    const u = Q(t, 3); attack(0.3); movePart(pts, base, muscle, [0, 0, 0], 0.75 + 0.25 * u); setAlpha(alpha, muscle, 0.7 + 0.3 * pulse(t, 4)); fibres.forEach((f, i) => setAlpha(alpha, f, 0.5 + 0.5 * clamp(u * 1.5 - i * 0.15))); setAlpha(alpha, dumb, 1); movePart(pts, base, dumb, [DB1[0] - DB0[0], DB1[1] - DB0[1] + 0.15 * Math.sin(t * TAU * 4), 0], 1); setAlpha(alpha, mtor, 1); setAlpha(alpha, plate, 1); prot.forEach((p, i) => { setAlpha(alpha, p, 1 - u); moveTo(pts, base, p, [PROT0[0] - 0.2 + 0.08 * i, PROT0[1] + 0.1, 0.1 * Math.sin(i)], [ARM[0] - 0.5 + 0.2 * i, ARM[1] + 0.3, 0.4], 1); });
    return { caption: "4 · Lean mass and function are preserved or rebuilt in small trials; the catch is that the sickest patients struggle to train, and no trial yet shows longer survival" };
  });
}

// ---------------------------------------------------------------- 16. probiotics, antibiotics and stewardship around immunotherapy
export function antibioticStewardshipIo(): Mesh {
  const sc = scene();
  const GUT: Vec3 = [-1.4, -0.6, 0];
  put(sc, "gut", tube(0.4, 2.6, "soft"), { at: GUT });
  const flora = put(sc, "flora", cloud(20, 1.0, "accent", 3), { at: GUT });
  const mono = put(sc, "mono", cloud(14, 1.0, "hot", 9), { at: [GUT[0], GUT[1], 0.05] });
  const AB0: Vec3 = [-1.4, 1.6, 0];
  const abx = put(sc, "abx", cylinder(0.12, 0.4, 8, 2, "hot", true, true), { at: AB0, rotZ: 0.5 });
  const PB0: Vec3 = [-2.6, 1.2, 0];
  const prob = put(sc, "prob", cylinder(0.12, 0.4, 8, 2, "soft", true, true), { at: PB0, rotZ: -0.5 });
  const T: Vec3 = [1.4, 0.6, 0], TUM: Vec3 = [2.6, 0.6, 0];
  const tcell = put(sc, "tcell", cell(0.32, "accent"), { at: T });
  const ab = put(sc, "ab", antibody(0.22), { at: [T[0] + 0.42, T[1] + 0.05, 0], rotZ: -Math.PI / 2 });
  const tum = put(sc, "tum", cell(0.5, "hot"), { at: TUM });
  const signal = put(sc, "signal", arrow([GUT[0] + 0.6, GUT[1] + 0.5, 0], [T[0] - 0.4, T[1] - 0.2, 0], "accent"));
  const cal = put(sc, "cal", ticks(0.6, 2.8, -1.3, 5, "soft"));
  const window = put(sc, "window", line([0.6, -1.1, 0], [2.0, -1.1, 0], "hot"));
  sc.mesh.labels = [L([GUT[0], 0.35, 0], "Gut microbes"), L([AB0[0], 2.05, 0], "Antibiotic"), L([PB0[0], 1.7, 0], "Shop-bought probiotic"), L([TUM[0], 1.45, 0], "Checkpoint therapy, T cell and tumour")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, mono, abx, prob, window); setAlpha(alpha, cal, 0.3);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); grow(alpha, signal, u); setAlpha(alpha, tcell, 0.5 + 0.5 * u); moveTo(pts, base, tcell, T, [TUM[0] - 0.85, TUM[1], 0], 0.5 * u); moveTo(pts, base, ab, [T[0] + 0.42, T[1] + 0.05, 0], [TUM[0] - 0.43, TUM[1] + 0.05, 0], 0.5 * u); return { caption: "1 · A diverse gut community supports the immune response to checkpoint drugs" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, abx, 1); moveTo(pts, base, abx, AB0, [GUT[0], GUT[1] + 0.2, 0], u, 1 - 0.5 * u); setAlpha(alpha, flora, 1 - 0.8 * clamp(u * 1.5 - 0.3)); setAlpha(alpha, signal, 1 - 0.8 * u); setAlpha(alpha, tcell, 1 - 0.6 * u); moveTo(pts, base, tcell, T, [TUM[0] - 0.85, TUM[1], 0], 0.5 - 0.3 * u); moveTo(pts, base, ab, [T[0] + 0.42, T[1] + 0.05, 0], [TUM[0] - 0.43, TUM[1] + 0.05, 0], 0.5 - 0.3 * u); movePart(pts, base, tum, [0, 0, 0], 1 + 0.2 * u); setAlpha(alpha, cal, 1); setAlpha(alpha, window, u); return { caption: "2 · Broad-spectrum antibiotics in the month or two before immunotherapy strip that community; in cohorts survival was roughly halved, though sicker patients get more antibiotics" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, abx, 0.3); moveTo(pts, base, abx, AB0, [GUT[0], GUT[1] + 0.2, 0], 1, 0.5); setAlpha(alpha, flora, 0.2); setAlpha(alpha, prob, 1); moveTo(pts, base, prob, PB0, [GUT[0] - 0.8, GUT[1] + 0.2, 0], u, 1 - 0.5 * u); setAlpha(alpha, mono, clamp(u * 1.5 - 0.3)); setAlpha(alpha, signal, 0.2); setAlpha(alpha, tcell, 0.4); moveTo(pts, base, tcell, T, [TUM[0] - 0.85, TUM[1], 0], 0.2); moveTo(pts, base, ab, [T[0] + 0.42, T[1] + 0.05, 0], [TUM[0] - 0.43, TUM[1] + 0.05, 0], 0.2); movePart(pts, base, tum, [0, 0, 0], 1.2); setAlpha(alpha, cal, 1); setAlpha(alpha, window, 1); return { caption: "3 · Shop-bought probiotics can flood the niche with one strain and lower diversity; one defined strain (CBM588) helped in a small randomised trial in kidney cancer" }; }
    const u = Q(t, 3); setAlpha(alpha, abx, 0.3 * (1 - u)); moveTo(pts, base, abx, AB0, [GUT[0], GUT[1] + 0.2, 0], 1, 0.5); setAlpha(alpha, prob, 1 - u); moveTo(pts, base, prob, PB0, [GUT[0] - 0.8, GUT[1] + 0.2, 0], 1, 0.5); setAlpha(alpha, mono, 1 - u); setAlpha(alpha, flora, 0.2 + 0.8 * u); grow(alpha, signal, u); setAlpha(alpha, tcell, 0.4 + 0.6 * u); moveTo(pts, base, tcell, T, [TUM[0] - 0.85, TUM[1], 0], 0.2 + 0.8 * u, 1 + 0.3 * u); moveTo(pts, base, ab, [T[0] + 0.42, T[1] + 0.05, 0], [TUM[0] - 0.43, TUM[1] + 0.05, 0], 0.2 + 0.8 * u); movePart(pts, base, tum, [0, 0, 0], 1.2 - 0.5 * u); setAlpha(alpha, cal, 1); setAlpha(alpha, window, 0.4);
    return { caption: "4 · Stewardship: avoid needless antibiotics around the start of immunotherapy, keep courses short and narrow, and skip unselected probiotic supplements" };
  });
}

// ---------------------------------------------------------------- 17. thermal ablation and cryotherapy for cervical precancer
export function precancerAblation(): Mesh {
  const sc = scene();
  const CX: Vec3 = [-0.8, -0.3, 0];
  put(sc, "cervix", disc(1.1, 22, undefined, "z"), { at: CX });
  put(sc, "os", ring(0.18, 10, "soft", "z"), { at: [CX[0], CX[1], 0.02] });
  const lesion = put(sc, "lesion", disc(0.35, 12, "hot", "z"), { at: [CX[0] + 0.45, CX[1] + 0.3, 0.04] });
  const PROBE0: Vec3 = [2.2, 1.6, 0.6], PROBE1: Vec3 = [CX[0] + 0.45, CX[1] + 0.3, 0.3];
  const probe = put(sc, "probe", cylinder(0.1, 0.9, 8, 2, "accent", true, true), { at: [PROBE0[0], PROBE0[1] + 0.45, PROBE0[2]] });
  const tip = put(sc, "tip", disc(0.3, 12, "accent", "y"), { at: PROBE0 });
  const heat: Part[] = []; for (let i = 0; i < 3; i++) heat.push(put(sc, `heat${i}`, ring(0.4 + 0.15 * i, 14, "hot", "z"), { at: [PROBE1[0], PROBE1[1], 0.06] }));
  const battery = put(sc, "battery", box(0.4, 0.25, 0.25, "soft", true), { at: [PROBE0[0], PROBE0[1] + 1.05, PROBE0[2]] });
  const clock = put(sc, "clock", ring(0.35, 14, "soft", "z"), { at: [2.4, -0.7, 0] });
  const hand = put(sc, "hand", line([2.4, -0.7, 0], [2.4, -0.4, 0], "accent"));
  const healed = put(sc, "healed", disc(0.35, 12, "soft", "z"), { at: [CX[0] + 0.45, CX[1] + 0.3, 0.04] });
  const vis = put(sc, "vis", octahedron(0.08, "accent"), { at: [CX[0] - 0.6, CX[1] + 1.3, 0.1] });
  sc.mesh.labels = [L([CX[0], 1.1, 0], "Cervix"), L([CX[0] + 1.2, 0.4, 0], "Precancer patch"), L([PROBE0[0], 2.4, 0], "Battery-powered thermal probe"), L([2.4, -1.3, 0], "20 to 40 seconds")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, ...heat, healed, hand); setAlpha(alpha, clock, 0.3); setAlpha(alpha, probe, 0.4); setAlpha(alpha, tip, 0.4); setAlpha(alpha, battery, 0.4);
    const s = stageOf(t);
    const approach = (u: number) => { moveTo(pts, base, probe, [PROBE0[0], PROBE0[1] + 0.45, PROBE0[2]], [PROBE1[0], PROBE1[1] + 0.45, PROBE1[2]], u); moveTo(pts, base, tip, PROBE0, PROBE1, u); moveTo(pts, base, battery, [PROBE0[0], PROBE0[1] + 1.05, PROBE0[2]], [PROBE1[0], PROBE1[1] + 1.05, PROBE1[2]], u); };
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, vis, 1); moveTo(pts, base, vis, [CX[0] - 0.6, CX[1] + 1.3, 0.1], [CX[0] + 0.45, CX[1] + 0.3, 0.1], u); setAlpha(alpha, lesion, 0.3 + 0.7 * u * pulse(t, 4)); return { caption: "1 · A positive screen (HPV test or a look with acetic acid) shows a precancer patch on the cervix" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, vis, 0); approach(u); show(alpha, 0.4 + 0.6 * u, probe, tip, battery); setAlpha(alpha, clock, 0.3 + 0.7 * u); setAlpha(alpha, hand, u); movePart(pts, base, hand, [0, 0, 0], 1, u * TAU * 0.6); heat.forEach((h, i) => { const v = ((t * 4) + i / 3) % 1; setAlpha(alpha, h, u > 0.8 ? (1 - v) : 0); movePart(pts, base, h, [0, 0, 0], 0.6 + 0.8 * v); }); return { caption: "2 · A probe heated to 100°C touches it for 20 to 40 seconds, or a cryotherapy tip freezes it" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, vis, 0); approach(1 - u); show(alpha, 1 - 0.6 * u, probe, tip, battery); setAlpha(alpha, clock, 1); setAlpha(alpha, hand, 1); movePart(pts, base, hand, [0, 0, 0], 1, TAU * 0.6); heat.forEach((h, i) => { const v = ((t * 4) + i / 3) % 1; setAlpha(alpha, h, (1 - v) * (1 - u)); movePart(pts, base, h, [0, 0, 0], 0.6 + 0.8 * v); }); setAlpha(alpha, lesion, 1 - 0.8 * u); return { caption: "3 · The abnormal cells die (coagulative necrosis, or freeze-thaw injury) and slough away over the following weeks" }; }
    const u = Q(t, 3); setAlpha(alpha, vis, 0); approach(0); show(alpha, 0.4, probe, tip, battery); setAlpha(alpha, clock, 0.6); setAlpha(alpha, hand, 0.6); movePart(pts, base, hand, [0, 0, 0], 1, TAU * 0.6); setAlpha(alpha, lesion, 0.2 * (1 - u)); setAlpha(alpha, healed, u);
    return { caption: "4 · Single-visit screen-and-treat: cure in about 85 to 95% of eligible lesions, no anaesthetic, no mains electricity; large or endocervical lesions need excision instead" };
  });
}

// ---------------------------------------------------------------- 18. clinical NGS bioinformatics and variant interpretation
export function ngsBioinformatics(): Mesh {
  const sc = scene();
  const SEQ: Vec3 = [-2.6, 0.6, 0];
  put(sc, "seq", box(0.9, 0.7, 0.6, undefined, true), { at: SEQ });
  const N = 8; const reads: Part[] = []; const R0: Vec3[] = []; const R1: Vec3[] = [];
  for (let i = 0; i < N; i++) { const from: Vec3 = [SEQ[0] + 0.5, SEQ[1] + 0.3 - 0.08 * i, 0.05 * (i % 3)]; const to: Vec3 = [-1.2 + 0.25 * (i % 5), 0.9 - 0.2 * Math.floor(i / 5) - 0.1 * (i % 2), 0]; R0.push(from); R1.push(to); reads.push(put(sc, `rd${i}`, line([0, 0, 0], [0.7, 0, 0], i === 3 ? "hot" : "soft"), { at: from })); }
  const ref = put(sc, "ref", line([-1.4, 0.2, 0], [0.8, 0.2, 0], "accent"));
  const variant = put(sc, "variant", small(0.08, "hot"), { at: [-0.45, 0.2, 0] });
  const KB: Vec3 = [1.7, 0.6, 0];
  const kb = put(sc, "kb", cylinder(0.5, 0.9, 12, 4, undefined, false, true), { at: KB });
  const match = put(sc, "match", arrow([-0.45, 0.3, 0], [KB[0] - 0.55, KB[1], 0], "hot"));
  const REP: Vec3 = [1.7, -1.1, 0];
  const report = put(sc, "report", doc(0.8, 1.0, 5), { at: REP });
  const tier = put(sc, "tier", small(0.07, "hot"), { at: [REP[0] - 0.25, REP[1] + 0.22, 0.05] });
  const toRep = put(sc, "toRep", arrow([KB[0], KB[1] - 0.5, 0], [REP[0], REP[1] + 0.55, 0], "accent"));
  const clin = put(sc, "clin", figure("soft"), { at: [2.9, -1.2, 0], scale: 0.5 });
  sc.mesh.labels = [L([SEQ[0], 1.35, 0], "Sequencer: millions of short reads"), L([-0.3, -0.2, 0], "Reference genome"), L([KB[0], 1.45, 0], "Knowledgebases (OncoKB, CIViC, ClinVar)"), L([REP[0], -1.9, 0], "Draft report, tiered by evidence")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, variant, match, toRep, tier, clin); setAlpha(alpha, ref, 0.2); setAlpha(alpha, kb, 0.3); setAlpha(alpha, report, 0.2);
    const s = stageOf(t);
    const align = (u: number) => reads.forEach((r, i) => { const v = clamp(u * 1.5 - i * 0.07); moveTo(pts, base, r, R0[i], R1[i], v); });
    if (s === 0) { reads.forEach((r, i) => { const v = (t * 4 + i / N) % 1; moveTo(pts, base, r, R0[i], [R0[i][0] + 0.8, R0[i][1], R0[i][2]], v); setAlpha(alpha, r, 1 - v); }); return { caption: "1 · The sequencer produces millions of short reads from the tumour sample" }; }
    if (s === 1) { const u = Q(t, 1); align(u); setAlpha(alpha, ref, 0.2 + 0.8 * u); setAlpha(alpha, variant, u > 0.7 ? pulse(t, 5) : 0); return { caption: "2 · Secondary analysis aligns them to the reference genome and calls variants where the reads disagree" }; }
    if (s === 2) { const u = Q(t, 2); align(1); setAlpha(alpha, ref, 1); setAlpha(alpha, variant, 1); grow(alpha, match, u); setAlpha(alpha, kb, 0.3 + 0.7 * u); movePart(pts, base, kb, [0, 0, 0], 1, u * 2); return { caption: "3 · Tertiary interpretation: each variant is matched against curated knowledgebases (OncoKB, CIViC, ClinVar) and tiered by strength of evidence" }; }
    const u = Q(t, 3); align(1); setAlpha(alpha, ref, 1); setAlpha(alpha, variant, 1); setAlpha(alpha, match, 0.5); setAlpha(alpha, kb, 1); movePart(pts, base, kb, [0, 0, 0], 1, 2); grow(alpha, toRep, u); setAlpha(alpha, report, 0.2 + 0.8 * u); setAlpha(alpha, tier, u > 0.5 ? pulse(t, 5) : 0); setAlpha(alpha, clin, u);
    return { caption: "4 · A draft report lists the mutations that matter, the drugs they point to and open trials, for a clinician to review and sign" };
  });
}

// ---------------------------------------------------------------- 19. oncofertility and fertility preservation
export function fertilityPreservation(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [-2.5, 0, 0];
  put(sc, "patient", figure(), { at: PAT });
  const drip = put(sc, "drip", box(0.3, 0.45, 0.14, "hot", true), { at: [PAT[0] - 0.9, 1.5, 0] });
  const dripLine = put(sc, "dripLine", polyline([[PAT[0] - 0.9, 1.27, 0], [PAT[0] - 0.7, 0.6, 0], [PAT[0] - 0.4, 0.3, 0.05]], "hot"));
  const FRZ: Vec3 = [0.2, 0.7, 0];
  const freezer = put(sc, "freezer", box(1.0, 1.0, 0.6, undefined, true), { at: FRZ });
  const snow = put(sc, "snow", dots([[FRZ[0] - 0.25, FRZ[1] + 0.25, 0.31], [FRZ[0] + 0.2, FRZ[1] - 0.1, 0.31], [FRZ[0], FRZ[1] + 0.35, 0.31]], "soft"));
  const OV: Vec3 = [PAT[0] + 0.25, -0.15, 0.1];
  const ovary = put(sc, "ovary", sphere(0.14, 3, 8, "accent", true), { at: OV });
  const eggs: Part[] = []; for (let i = 0; i < 4; i++) eggs.push(put(sc, `egg${i}`, small(0.06, "accent"), { at: OV }));
  const vial = put(sc, "vial", cylinder(0.1, 0.4, 8, 2, "accent", true, true), { at: [FRZ[0] - 0.25, FRZ[1] - 0.15, 0.2] });
  const strip = put(sc, "strip", box(0.35, 0.08, 0.15, "accent", true), { at: [FRZ[0] + 0.25, FRZ[1] - 0.15, 0.2] });
  const shield = put(sc, "shield", ring(0.24, 12, "accent", "z"), { at: OV });
  const clock = put(sc, "clock", ring(0.35, 14, "soft", "z"), { at: [0.2, -1.2, 0] });
  const hand = put(sc, "hand", line([0.2, -1.2, 0], [0.2, -0.9, 0], "accent"));
  const LATER: Vec3 = [2.4, 0, 0];
  const later = put(sc, "later", figure("soft"), { at: LATER });
  const bump = put(sc, "bump", sphere(0.22, 3, 8, "accent", true), { at: [LATER[0] + 0.1, 0.15, 0.15] });
  const tl = put(sc, "tl", arrow([FRZ[0] + 0.6, FRZ[1] - 0.6, 0], [LATER[0] - 0.5, 0.2, 0], "soft"));
  sc.mesh.labels = [L([PAT[0], 1.45, 0], "Before treatment starts"), L([FRZ[0], 1.55, 0], "Eggs, embryos, sperm or ovarian tissue, frozen"), L([0.2, -1.75, 0], "Within two weeks"), L([LATER[0], 1.35, 0], "Years later")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, vial, strip, shield, later, bump, tl, ...eggs); setAlpha(alpha, freezer, 0.3); setAlpha(alpha, snow, 0.3); setAlpha(alpha, drip, 0.3); setAlpha(alpha, dripLine, 0.3); setAlpha(alpha, clock, 0.3); setAlpha(alpha, hand, 0.3);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, drip, 0.3 + 0.7 * u); setAlpha(alpha, dripLine, 0.3 + 0.7 * u * pulse(t, 5)); setAlpha(alpha, ovary, 1 - 0.5 * u * pulse(t, 5)); return { caption: "1 · Alkylating chemotherapy, pelvic radiotherapy and transplant conditioning damage eggs and sperm; the conversation has to happen before the first dose" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, clock, 1); setAlpha(alpha, hand, 1); movePart(pts, base, hand, [0, 0, 0], 1, u * TAU * 0.8); eggs.forEach((e, i) => { const v = clamp(u * 1.5 - i * 0.12); setAlpha(alpha, e, v > 0 && v < 1 ? 1 : 0); moveTo(pts, base, e, OV, [FRZ[0] - 0.25, FRZ[1] - 0.15, 0.2], v); }); setAlpha(alpha, freezer, 0.3 + 0.7 * u); setAlpha(alpha, snow, 0.3 + 0.7 * u); setAlpha(alpha, vial, clamp(u * 2 - 0.8)); return { caption: "2 · Sperm banking, or egg or embryo freezing after a random-start stimulation that fits inside two weeks" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, clock, 0.6); setAlpha(alpha, hand, 0.6); movePart(pts, base, hand, [0, 0, 0], 1, TAU * 0.8); setAlpha(alpha, freezer, 1); setAlpha(alpha, snow, 1); setAlpha(alpha, vial, 1); setAlpha(alpha, strip, clamp(u * 2)); moveTo(pts, base, strip, [OV[0], OV[1], OV[2]], [FRZ[0] + 0.25, FRZ[1] - 0.15, 0.2], clamp(u * 2)); setAlpha(alpha, shield, clamp(u * 2 - 1) * pulse(t, 4)); return { caption: "3 · Ovarian tissue freezing, the only option for young girls; moving the ovary out of a radiation field; a GnRH agonist to quieten the ovary during chemotherapy for breast cancer" }; }
    const u = Q(t, 3); setAlpha(alpha, clock, 0.6); setAlpha(alpha, hand, 0.6); movePart(pts, base, hand, [0, 0, 0], 1, TAU * 0.8); setAlpha(alpha, freezer, 1); setAlpha(alpha, snow, 1); setAlpha(alpha, vial, 1); setAlpha(alpha, strip, 1); setAlpha(alpha, shield, 0.6); grow(alpha, tl, u); setAlpha(alpha, later, u); setAlpha(alpha, bump, clamp(u * 2 - 1));
    return { caption: "4 · Years later, live births from every method; pregnancy after breast cancer is safe (POSITIVE trial). Fewer than half of eligible patients are counselled: the gap is referral" };
  });
}

// ---------------------------------------------------------------- 20. prophylactic cranial irradiation versus MRI surveillance
export function prophylacticCranialIrradiation(): Mesh {
  const sc = scene();
  const HEAD: Vec3 = [-1.6, 0.2, 0];
  put(sc, "head", sphere(0.95, 5, 12, "soft", true), { at: HEAD });
  const hippo = put(sc, "hippo", polyline([[HEAD[0] - 0.3, HEAD[1] - 0.2, 0.3], [HEAD[0] - 0.1, HEAD[1] - 0.35, 0.3], [HEAD[0] + 0.2, HEAD[1] - 0.3, 0.3]], "accent"));
  const seeds: Part[] = []; const SEED: Vec3[] = [[0.35, 0.3, 0.2], [-0.4, 0.45, -0.1], [0.1, -0.1, 0.4], [-0.2, 0.0, -0.4], [0.5, -0.3, 0.1]];
  for (let i = 0; i < 5; i++) seeds.push(put(sc, `sd${i}`, small(0.06, "hot"), { at: [HEAD[0] + SEED[i][0], HEAD[1] + SEED[i][1], SEED[i][2]] }));
  const beams: Part[] = []; for (let i = 0; i < 4; i++) { const a = 0.5 + i * 0.7; beams.push(put(sc, `bm${i}`, line([HEAD[0] + 2.2 * Math.cos(a), HEAD[1] + 2.2 * Math.sin(a), 0], [HEAD[0] + 0.95 * Math.cos(a), HEAD[1] + 0.95 * Math.sin(a), 0], "accent"))); }
  const lung = put(sc, "lung", organ(0.35, 0.5, 0.3), { at: [HEAD[0], -1.6, 0] });
  const primary = put(sc, "primary", blob(0.14), { at: [HEAD[0] + 0.1, -1.55, 0.1] });
  const MRI: Vec3 = [1.8, 0.2, 0];
  const mri = put(sc, "mri", torus(1.1, 0.12, 20, 6, undefined, true), { at: MRI, rotX: Math.PI / 2 });
  const head2 = put(sc, "head2", sphere(0.6, 4, 10, "soft", true), { at: MRI });
  const met = put(sc, "met", small(0.1, "hot"), { at: [MRI[0] + 0.25, MRI[1] + 0.2, 0.1] });
  const srs: Part[] = []; for (let i = 0; i < 3; i++) { const a = 0.9 + i * 0.5; srs.push(put(sc, `srs${i}`, line([MRI[0] + 0.25 + 1.0 * Math.cos(a), MRI[1] + 0.2 + 1.0 * Math.sin(a), 0.1], [MRI[0] + 0.25, MRI[1] + 0.2, 0.1], "accent"))); }
  const cal = put(sc, "cal", ticks(MRI[0] - 1.0, MRI[0] + 1.0, -1.4, 5, "soft"));
  sc.mesh.labels = [L([HEAD[0], 1.55, 0], "Brain: tiny hidden deposits"), L([HEAD[0] - 0.4, -0.75, 0.3], "Hippocampus, spared"), L([MRI[0], 1.7, 0], "MRI every few months"), L([MRI[0], -1.75, 0], "Treat what appears, focally")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...beams, met, ...srs); setAlpha(alpha, mri, 0.3); setAlpha(alpha, head2, 0.3); setAlpha(alpha, cal, 0.3); setAlpha(alpha, hippo, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, primary, pulse(t, 4)); seeds.forEach((sd, i) => { const v = clamp(u * 1.6 - i * 0.15); setAlpha(alpha, sd, v); moveTo(pts, base, sd, [HEAD[0] + 0.1, -1.55, 0.1], [HEAD[0] + SEED[i][0], HEAD[1] + SEED[i][1], SEED[i][2]], v); }); setAlpha(alpha, lung, 1); return { caption: "1 · Small-cell lung cancer seeds the brain so often that tiny deposits are assumed to be present after the chest is treated" }; }
    if (s === 1) { const u = Q(t, 1); beams.forEach((b) => setAlpha(alpha, b, u > 0.1 ? pulse(t, 6) : 0)); seeds.forEach((sd) => setAlpha(alpha, sd, 1 - 0.85 * u)); setAlpha(alpha, hippo, 1); return { caption: "2 · Prophylactic cranial irradiation: whole-brain radiotherapy (25 Gy in 10 fractions) sterilises them before symptoms, at a cost to memory; hippocampal avoidance limits the harm" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.3, ...beams); show(alpha, 0.15, ...seeds); setAlpha(alpha, mri, 0.3 + 0.7 * u * pulse(t, 5)); setAlpha(alpha, head2, 0.3 + 0.7 * u); setAlpha(alpha, cal, 0.3 + 0.7 * u); setAlpha(alpha, met, u > 0.6 ? pulse(t, 5) : 0); srs.forEach((r) => setAlpha(alpha, r, u > 0.8 ? pulse(t, 7) : 0)); return { caption: "3 · The alternative: regular MRI scans, treating any deposit that appears with focused stereotactic radiosurgery" }; }
    const u = Q(t, 3); show(alpha, 0.3, ...beams); show(alpha, 0.15, ...seeds); setAlpha(alpha, mri, 1); setAlpha(alpha, head2, 1); setAlpha(alpha, cal, 1); setAlpha(alpha, met, 1 - 0.8 * u); movePart(pts, base, met, [0, 0, 0], 1 - 0.6 * u); show(alpha, 0.5, ...srs);
    return { caption: "4 · With MRI surveillance available the survival gain from irradiating everyone is unclear; the SWOG S1827 trial compares the two directly" };
  });
}

// ---------------------------------------------------------------- 21. sleep and circadian interventions
export function sleepCircadian(): Mesh {
  const sc = scene();
  const CLK: Vec3 = [-1.7, 0.2, 0];
  put(sc, "clock", ring(1.2, 24, undefined, "z"), { at: CLK });
  const night = put(sc, "night", polyline(Array.from({ length: 9 }, (_, i) => { const a = Math.PI + (Math.PI * i) / 8; return [CLK[0] + 1.05 * Math.cos(a), CLK[1] + 1.05 * Math.sin(a), 0.02] as Vec3; }), "soft"));
  const sun = put(sc, "sun", sphere(0.14, 3, 8, "accent", true), { at: [CLK[0], CLK[1] + 0.75, 0.05] });
  const moon = put(sc, "moon", ring(0.14, 10, "soft", "z"), { at: [CLK[0], CLK[1] - 0.75, 0.05] });
  const hand = put(sc, "hand", line([CLK[0], CLK[1], 0.05], [CLK[0], CLK[1] + 0.9, 0.05], "accent"));
  const AX: Vec3 = [0.4, -1.1, 0];
  put(sc, "axes", axes(AX, 2.8, 1.4));
  const flat = put(sc, "flat", polyline(Array.from({ length: 13 }, (_, i) => [AX[0] + (2.8 * i) / 12, AX[1] + 0.7 + 0.15 * Math.sin(i * 2.1) * (i % 2 ? 1 : 0.5), 0] as Vec3), "hot"));
  const rhythm = put(sc, "rhythm", polyline(Array.from({ length: 13 }, (_, i) => [AX[0] + (2.8 * i) / 12, AX[1] + 0.7 + 0.55 * Math.sin((TAU * i) / 12 * 2), 0] as Vec3), "accent"));
  const cbt = put(sc, "cbt", doc(0.6, 0.8, 4), { at: [1.1, 1.1, 0] });
  const screen = put(sc, "screen", box(0.5, 0.35, 0.06, "accent", true), { at: [1.9, 1.05, 0] });
  const horm = put(sc, "horm", polyline(Array.from({ length: 9 }, (_, i) => [2.4 + 0.1 * i, 1.0 + 0.3 * Math.sin((TAU * i) / 8), 0] as Vec3), "soft"));
  const pill = put(sc, "pill", cylinder(0.1, 0.32, 8, 2, "accent", true, true), { at: [CLK[0] + 0.5, CLK[1] + 0.5, 0.1], rotZ: 0.6 });
  sc.mesh.labels = [L([CLK[0], 1.75, 0], "24-hour clock"), L([AX[0] + 1.4, AX[1] - 0.35, 0], "Rest-activity rhythm (actigraphy)"), L([1.5, 1.7, 0], "CBT for insomnia, in person or digital"), L([2.8, 1.55, 0], "Cortisol and melatonin cycle")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, rhythm, cbt, screen, horm, pill); setAlpha(alpha, night, 0.5);
    const s = stageOf(t);
    movePart(pts, base, hand, [0, 0, 0], 1, 0);
    const spin = (a: number) => { const c = Math.cos(a), si = Math.sin(a); for (let i = hand.p0; i < hand.p1; i++) { const x = base[i][0] - CLK[0], y = base[i][1] - CLK[1]; pts[i] = [CLK[0] + x * c - y * si, CLK[1] + x * si + y * c, base[i][2]]; } };
    spin(-t * TAU * 2);
    if (s === 0) { const u = Q(t, 0); grow(alpha, flat, u); setAlpha(alpha, moon, 0.4 + 0.6 * pulse(t, 6)); return { caption: "1 · Half of people with cancer sleep badly; the daily rhythm of rest and activity flattens, and fatigue, pain and low mood follow" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, flat, 1 - 0.6 * u); cascade(alpha, [cbt, screen], u); return { caption: "2 · Cognitive behavioural therapy for insomnia, in person or digital, is first-line and works in survivors; sleeping pills are second-line" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, flat, 0.3); show(alpha, 1, cbt, screen); grow(alpha, rhythm, u); grow(alpha, horm, u); setAlpha(alpha, night, 0.5 + 0.5 * u); return { caption: "3 · A steady rhythm restores the cortisol and melatonin cycle and the daily traffic of immune cells" }; }
    const u = Q(t, 3); setAlpha(alpha, flat, 0.3); show(alpha, 1, cbt, screen, rhythm, horm); setAlpha(alpha, night, 1); setAlpha(alpha, pill, u); setAlpha(alpha, sun, 0.5 + 0.5 * pulse(t, 4));
    return { caption: "4 · Symptoms improve; whether better sleep, or timing drugs to the clock (chronotherapy), changes the cancer itself is being tested in trials" };
  });
}

// ---------------------------------------------------------------- 22. BH3 profiling
export function bh3Profiling(): Mesh {
  const sc = scene();
  const CELL: Vec3 = [-0.6, 0, 0];
  const membrane = put(sc, "cell", cell(1.1), { at: CELL });
  const holes: Part[] = []; for (let i = 0; i < 4; i++) { const a = 0.4 + i * 1.5; holes.push(put(sc, `hole${i}`, ring(0.12, 8, "hot", "z"), { at: [CELL[0] + 1.1 * Math.cos(a), 1.1 * Math.sin(a), 0] })); }
  const MITO: Vec3[] = [[-0.4, 0.4, 0.2], [0.35, -0.2, 0.1], [-0.3, -0.5, -0.1]];
  const mitos: Part[] = MITO.map((m, i) => put(sc, `m${i}`, ellipsoid(0.3, 0.15, 0.15, 3, 8, "accent", true), { at: [CELL[0] + m[0], m[1], m[2]], rotZ: 0.4 * i }));
  const PEP0: Vec3 = [-2.8, 1.2, 0];
  const peps: Part[] = []; for (let i = 0; i < 3; i++) peps.push(put(sc, `pep${i}`, helix(0.06, 0.35, 2, 10, "hot"), { at: [PEP0[0], PEP0[1] - 0.4 * i, 0], rotZ: Math.PI / 2 }));
  const AX: Vec3 = [1.5, -1.0, 0];
  put(sc, "axes", axes(AX, 1.6, 2.0));
  const bars: Part[] = [1.5, 0.5, 0.3].map((h, i) => put(sc, `bar${i}`, bar(AX[0] + 0.35 + 0.5 * i, h, 0.3, i === 0 ? "hot" : "accent"), { at: [0, AX[1], 0] }));
  const pill = put(sc, "pill", cylinder(0.11, 0.36, 8, 2, "accent", true, true), { at: [AX[0] + 0.35, AX[1] + 2.0, 0], rotZ: 0.5 });
  sc.mesh.labels = [L([CELL[0], 1.45, 0], "Leukaemia cell, gently permeabilised"), L([CELL[0] - 0.4, -0.95, 0.2], "Mitochondria"), L([PEP0[0], 1.65, 0], "BH3 peptides"), L([AX[0] + 0.85, AX[1] - 0.35, 0], "BCL-2 · BCL-XL · MCL-1 dependence")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...holes, ...bars, pill);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); holes.forEach((h, i) => setAlpha(alpha, h, clamp(u * 1.6 - i * 0.2) * pulse(t, 5))); setAlpha(alpha, membrane, 1 - 0.3 * u); return { caption: "1 · Leukaemia cells are gently permeabilised so that peptides can reach their mitochondria" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 0.6, ...holes); setAlpha(alpha, membrane, 0.7); peps.forEach((p, i) => { const v = clamp(u * 1.4 - i * 0.15); moveTo(pts, base, p, [PEP0[0], PEP0[1] - 0.4 * i, 0], [CELL[0] + MITO[i][0] - 0.2, MITO[i][1] + 0.15, MITO[i][2] + 0.1], v, 1, v * 3); }); return { caption: "2 · BH3 peptides, each matching one survival protein (BCL-2, BCL-XL, MCL-1), are added" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.6, ...holes); setAlpha(alpha, membrane, 0.7); peps.forEach((p, i) => moveTo(pts, base, p, [PEP0[0], PEP0[1] - 0.4 * i, 0], [CELL[0] + MITO[i][0] - 0.2, MITO[i][1] + 0.15, MITO[i][2] + 0.1], 1)); mitos.forEach((m, i) => { const v = i === 0 ? clamp(u * 1.5) : clamp(u * 1.5 - 0.7) * 0.3; setAlpha(alpha, m, 1 - 0.7 * v); movePart(pts, base, m, [0, 0, 0], 1 - 0.3 * v); }); return { caption: "3 · If the mitochondria lose their charge, the cell was 'primed' to die and depends on that protein" }; }
    const u = Q(t, 3); show(alpha, 0.6, ...holes); setAlpha(alpha, membrane, 0.7); peps.forEach((p, i) => moveTo(pts, base, p, [PEP0[0], PEP0[1] - 0.4 * i, 0], [CELL[0] + MITO[i][0] - 0.2, MITO[i][1] + 0.15, MITO[i][2] + 0.1], 1)); mitos.forEach((m, i) => { const v = i === 0 ? 1 : 0.3; setAlpha(alpha, m, 1 - 0.7 * v); movePart(pts, base, m, [0, 0, 0], 1 - 0.3 * v); }); cascade(alpha, bars, u); setAlpha(alpha, pill, clamp(u * 2 - 1) * pulse(t, 4));
    return { caption: "4 · A BCL-2-dependent profile predicts response to venetoclax; MCL-1 dependence explains resistance. Hours to a result, but fresh cells are needed" };
  });
}

// ---------------------------------------------------------------- 23. colposcopy and excisional treatment
export function colposcopyExcision(): Mesh {
  const sc = scene();
  const CX: Vec3 = [-0.6, -0.4, 0];
  put(sc, "cervix", disc(1.1, 22, undefined, "z"), { at: CX });
  put(sc, "os", ring(0.18, 10, "soft", "z"), { at: [CX[0], CX[1], 0.02] });
  const zone = put(sc, "zone", ring(0.5, 16, "soft", "z"), { at: [CX[0], CX[1], 0.03] });
  const lesion = put(sc, "lesion", disc(0.3, 12, "hot", "z"), { at: [CX[0] + 0.35, CX[1] + 0.25, 0.04] });
  const white = put(sc, "white", disc(0.3, 12, "accent", "z"), { at: [CX[0] + 0.35, CX[1] + 0.25, 0.05] });
  const SCOPE: Vec3 = [-0.6, 0.6, 2.2];
  const scope = put(sc, "scope", cylinder(0.35, 0.8, 12, 2, undefined, false, true), { at: SCOPE, rotX: Math.PI / 2 });
  const view = put(sc, "view", cone(1.1, 1.8, 10, "soft", true), { at: [CX[0], CX[1] + 0.2, 1.2], rotX: -Math.PI / 2 });
  const DROP0: Vec3 = [-2.4, 1.6, 0.3];
  const drop = put(sc, "drop", octahedron(0.08, "accent"), { at: DROP0 });
  const forceps = put(sc, "forceps", polyline([[2.0, 1.8, 0.5], [CX[0] + 0.55, CX[1] + 0.45, 0.4], [CX[0] + 0.35, CX[1] + 0.25, 0.1]], "soft"));
  const LOOP0: Vec3 = [2.4, 0.4, 0.4];
  const loop = put(sc, "loop", ring(0.42, 14, "hot", "y"), { at: LOOP0, rotX: 0.3 });
  const handle = put(sc, "handle", line([LOOP0[0], LOOP0[1] + 0.3, LOOP0[2]], [LOOP0[0] + 0.9, LOOP0[1] + 0.9, LOOP0[2]], "soft"));
  const specimen = put(sc, "specimen", disc(0.5, 14, "hot", "z"), { at: [2.4, -1.2, 0] });
  const jar = put(sc, "jar", cylinder(0.6, 0.5, 12, 2, "soft", false, true), { at: [2.4, -1.2, 0] });
  sc.mesh.labels = [L([CX[0], 1.0, 0], "Cervix, magnified"), L([SCOPE[0], SCOPE[1] + 0.7, SCOPE[2]], "Colposcope"), L([LOOP0[0], LOOP0[1] + 1.3, 0], "Electrified wire loop (LEEP/LLETZ)"), L([2.4, -1.9, 0], "Tissue for histology")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, white, forceps, loop, handle, specimen); setAlpha(alpha, jar, 0.3); setAlpha(alpha, view, 0.25); setAlpha(alpha, zone, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, scope, 1); setAlpha(alpha, view, 0.25 + 0.4 * u); setAlpha(alpha, drop, 1); moveTo(pts, base, drop, DROP0, [CX[0] + 0.35, CX[1] + 0.25, 0.1], u); setAlpha(alpha, white, clamp(u * 3 - 2)); return { caption: "1 · After a positive screen, a colposcope magnifies the cervix; acetic acid turns abnormal areas white" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, view, 0.65); setAlpha(alpha, drop, 0); setAlpha(alpha, white, 1); grow(alpha, forceps, u); return { caption: "2 · A small biopsy from the white patch confirms a high-grade lesion" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, view, 0.65); setAlpha(alpha, drop, 0); setAlpha(alpha, white, 1); setAlpha(alpha, forceps, 0.2); show(alpha, 1, loop, handle); const to: Vec3 = [CX[0], CX[1], 0.1]; moveTo(pts, base, loop, LOOP0, to, u); moveTo(pts, base, handle, LOOP0, to, u); setAlpha(alpha, loop, 0.6 + 0.4 * pulse(t, 8)); setAlpha(alpha, zone, 0.4 + 0.6 * clamp(u * 2 - 1) * pulse(t, 8)); return { caption: "3 · An electrified wire loop (LEEP/LLETZ) removes the transformation zone in a clinic visit, giving tissue for histology" }; }
    const u = Q(t, 3); setAlpha(alpha, view, 0.65); setAlpha(alpha, drop, 0); setAlpha(alpha, forceps, 0); show(alpha, 0.5, loop, handle); moveTo(pts, base, loop, LOOP0, [CX[0], CX[1], 0.1], 1 - u); moveTo(pts, base, handle, LOOP0, [CX[0], CX[1], 0.1], 1 - u); setAlpha(alpha, white, 1 - u); setAlpha(alpha, lesion, 1 - u); setAlpha(alpha, zone, 0.2); setAlpha(alpha, specimen, u); setAlpha(alpha, jar, 0.3 + 0.7 * u); moveTo(pts, base, specimen, [CX[0], CX[1], 0.1], [2.4, -1.2, 0], u);
    return { caption: "4 · Cure rates above 90%; excision slightly raises the risk of preterm birth later, which is why ablation or see-and-treat are weighed for some women" };
  });
}

// ---------------------------------------------------------------- 24. microbiome modulation to unlock immunotherapy
export function microbiomeModulationIo(): Mesh {
  const sc = scene();
  const GUT: Vec3 = [-1.6, -0.7, 0];
  put(sc, "gut", tube(0.4, 2.4, "soft"), { at: GUT });
  const sparse = put(sc, "sparse", cloud(6, 0.9, "hot", 8), { at: GUT });
  const newFlora = put(sc, "newFlora", cloud(18, 0.9, "accent", 5), { at: GUT });
  const CAP0: Vec3 = [-1.6, 1.6, 0];
  const cap = put(sc, "cap", cylinder(0.14, 0.42, 8, 2, "accent", true, true), { at: CAP0, rotZ: 0.6 });
  const consort: Part[] = []; for (let i = 0; i < 5; i++) consort.push(put(sc, `cs${i}`, small(0.05, "accent"), { at: [CAP0[0] - 0.08 + 0.04 * i, CAP0[1] + 0.05 * Math.sin(i * 2), 0.1] }));
  const T: Vec3 = [1.2, 0.4, 0], TUM: Vec3 = [2.6, 0.4, 0];
  const tcell = put(sc, "tcell", cell(0.32, "accent"), { at: T });
  const ab = put(sc, "ab", antibody(0.22), { at: [T[0] + 0.42, T[1] + 0.05, 0], rotZ: -Math.PI / 2 });
  const tum = put(sc, "tum", cell(0.55, "hot"), { at: TUM });
  const ifn: Part[] = []; for (let i = 0; i < 4; i++) ifn.push(put(sc, `ifn${i}`, octahedron(0.05, "accent"), { at: [GUT[0] + 0.8, GUT[1] + 0.4, 0] }));
  const trial = put(sc, "trial", doc(0.6, 0.8, 4), { at: [1.6, -1.3, 0] });
  const rnd = put(sc, "rnd", polyline([[1.35, -1.55, 0.02], [1.6, -1.05, 0.02], [1.85, -1.55, 0.02]], "accent"));
  sc.mesh.labels = [L([GUT[0], 0.25, 0], "Non-responder's gut: a different community"), L([CAP0[0], 2.05, 0], "Responder stool or a defined bacterial mix"), L([TUM[0], 1.3, 0], "T cell, PD-1 antibody, tumour"), L([1.6, -1.85, 0], "Randomised phase 2 trials")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, newFlora, ...ifn, trial, rnd); setAlpha(alpha, cap, 0.3); show(alpha, 0.3, ...consort);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, sparse, 0.6 + 0.4 * pulse(t, 3)); setAlpha(alpha, tcell, 0.35); setAlpha(alpha, ab, 0.5); movePart(pts, base, tum, [0, 0, 0], 1 + 0.15 * u); return { caption: "1 · Gut composition predicts who responds to checkpoint drugs; this patient's T cells stay quiet and the tumour grows" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, tcell, 0.35); setAlpha(alpha, ab, 0.5); movePart(pts, base, tum, [0, 0, 0], 1.15); setAlpha(alpha, cap, 1); show(alpha, 1, ...consort); moveTo(pts, base, cap, CAP0, [GUT[0], GUT[1] + 0.1, 0], u, 1 - 0.4 * u); consort.forEach((c, i) => moveTo(pts, base, c, [CAP0[0] - 0.08 + 0.04 * i, CAP0[1] + 0.05 * Math.sin(i * 2), 0.1], [GUT[0] - 0.08 + 0.04 * i, GUT[1] + 0.1, 0.1], u)); return { caption: "2 · Stool from a responder, or a defined mix of bacteria (LND101), is given by capsule" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, cap, 1 - u); show(alpha, 1 - u, ...consort); moveTo(pts, base, cap, CAP0, [GUT[0], GUT[1] + 0.1, 0], 1, 0.6); consort.forEach((c, i) => moveTo(pts, base, c, [CAP0[0] - 0.08 + 0.04 * i, CAP0[1] + 0.05 * Math.sin(i * 2), 0.1], [GUT[0] - 0.08 + 0.04 * i, GUT[1] + 0.1, 0.1], 1)); setAlpha(alpha, sparse, 1 - 0.7 * u); setAlpha(alpha, newFlora, u); ifn.forEach((f, i) => { const v = clamp(u * 1.5 - i * 0.15); setAlpha(alpha, f, v > 0 && v < 1 ? 1 : 0); moveTo(pts, base, f, [GUT[0] + 0.8, GUT[1] + 0.4, 0], [T[0] - 0.3, T[1], 0], v); }); setAlpha(alpha, tcell, 0.35 + 0.65 * u); setAlpha(alpha, ab, 0.5 + 0.5 * u); movePart(pts, base, tum, [0, 0, 0], 1.15); return { caption: "3 · New commensals change antigen presentation and interferon tone; T cells wake and move into the tumour" }; }
    const u = Q(t, 3); setAlpha(alpha, cap, 0); show(alpha, 0, ...consort); setAlpha(alpha, sparse, 0.3); setAlpha(alpha, newFlora, 1); setAlpha(alpha, ab, 1); moveTo(pts, base, tcell, T, [TUM[0] - 0.85, TUM[1], 0], u, 1 + 0.3 * u); moveTo(pts, base, ab, [T[0] + 0.42, T[1] + 0.05, 0], [TUM[0] - 0.43, TUM[1] + 0.05, 0], u); movePart(pts, base, tum, [0, 0, 0], 1.15 - 0.5 * u); setAlpha(alpha, tum, 1 - 0.4 * u); setAlpha(alpha, trial, u); grow(alpha, rnd, u);
    return { caption: "4 · A minority of refractory melanoma patients regained response in small studies; randomised phase 2 trials (Canada, Oslo, the Netherlands) now test it properly" };
  });
}

// ---------------------------------------------------------------- 25. PET-adapted (response-adapted) therapy
export function petAdaptedTherapy(): Mesh {
  const sc = scene();
  const Y0 = 0.0;
  const cycles: Part[] = []; for (let i = 0; i < 2; i++) cycles.push(put(sc, `cy${i}`, box(0.45, 0.45, 0.3, undefined, true), { at: [-2.8 + 0.6 * i, Y0, 0] }));
  const PET: Vec3 = [-1.2, Y0, 0];
  const pet = put(sc, "pet", torus(0.6, 0.07, 16, 6, "accent", true), { at: PET, rotX: Math.PI / 2 });
  const body = put(sc, "body", figure("soft"), { at: PET, scale: 0.55 });
  const glow = put(sc, "glow", blob(0.12), { at: [PET[0], Y0 + 0.15, 0.06] });
  const SCALE: Vec3 = [0.1, Y0 - 0.3, 0];
  const deauville: Part[] = []; for (let i = 0; i < 5; i++) deauville.push(put(sc, `dv${i}`, bar(SCALE[0] + 0.22 * i, 0.15 + 0.15 * i, 0.16, i >= 3 ? "hot" : "accent"), { at: [0, SCALE[1], 0] }));
  const liver = put(sc, "liver", line([SCALE[0] - 0.15, SCALE[1] + 0.45, 0], [SCALE[0] + 1.05, SCALE[1] + 0.45, 0], "soft"));
  const up = put(sc, "up", polyline([[0.9, Y0, 0], [1.4, Y0 + 0.9, 0], [1.7, Y0 + 0.9, 0]], "soft"));
  const down = put(sc, "down", polyline([[0.9, Y0, 0], [1.4, Y0 - 0.9, 0], [1.7, Y0 - 0.9, 0]], "soft"));
  const lessCycles: Part[] = []; for (let i = 0; i < 2; i++) lessCycles.push(put(sc, `lc${i}`, box(0.4, 0.4, 0.28, "accent", true), { at: [2.0 + 0.5 * i, Y0 + 0.9, 0] }));
  const noRt = put(sc, "noRt", polyline([[2.9, Y0 + 1.25, 0], [3.1, Y0 + 0.9, 0], [3.3, Y0 + 1.25, 0]], "soft"));
  const noRtX = put(sc, "noRtX", polyline([[2.95, Y0 + 0.7, 0.05], [3.25, Y0 + 1.1, 0.05]], "hot")); const noRtX2 = put(sc, "noRtX2", polyline([[2.95, Y0 + 1.1, 0.05], [3.25, Y0 + 0.7, 0.05]], "hot"));
  const moreCycles: Part[] = []; for (let i = 0; i < 3; i++) moreCycles.push(put(sc, `mc${i}`, box(0.4, 0.4, 0.28, "hot", true), { at: [2.0 + 0.5 * i, Y0 - 0.9, 0] }));
  sc.mesh.labels = [L([-2.5, Y0 + 0.75, 0], "Two cycles"), L([PET[0], Y0 + 1.3, 0], "Interim PET (PET2)"), L([SCALE[0] + 0.5, SCALE[1] - 0.4, 0], "Deauville scale against the liver"), L([2.5, Y0 + 1.7, 0], "Dark: give less")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, glow, ...deauville, liver, up, down, ...lessCycles, noRt, noRtX, noRtX2, ...moreCycles); setAlpha(alpha, pet, 0.3); setAlpha(alpha, body, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, cycles, clamp(u * 1.5)); setAlpha(alpha, pet, 0.3 + 0.7 * clamp(u * 2 - 1) * pulse(t, 5)); setAlpha(alpha, body, 0.4 + 0.6 * clamp(u * 2 - 1)); return { caption: "1 · Chemotherapy starts; after two cycles a PET scan (PET2) is taken" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 1, ...cycles); setAlpha(alpha, pet, 1); setAlpha(alpha, body, 1); setAlpha(alpha, glow, clamp(u * 2) * (0.4 + 0.6 * pulse(t, 4))); setAlpha(alpha, liver, u); cascade(alpha, deauville, u); return { caption: "2 · Uptake is scored on the Deauville scale against the liver: 1 to 3 counts as dark, 4 or 5 as still bright" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 1, ...cycles); setAlpha(alpha, pet, 1); setAlpha(alpha, body, 1); setAlpha(alpha, glow, 0.3 * (1 - u)); setAlpha(alpha, liver, 1); show(alpha, 1, ...deauville); grow(alpha, up, u); cascade(alpha, lessCycles, clamp(u * 1.5 - 0.3)); setAlpha(alpha, noRt, clamp(u * 2 - 1)); grow(alpha, noRtX, clamp(u * 2 - 1)); grow(alpha, noRtX2, clamp(u * 2 - 1)); return { caption: "3 · Dark on PET (negative): drop bleomycin or skip radiotherapy, with no loss of cure in the Hodgkin trials (RATHL, RAPID)" }; }
    const u = Q(t, 3); show(alpha, 1, ...cycles); setAlpha(alpha, pet, 1); setAlpha(alpha, body, 1); setAlpha(alpha, glow, u * pulse(t, 5)); movePart(pts, base, glow, [0, 0, 0], 1 + 0.3 * u); setAlpha(alpha, liver, 1); show(alpha, 1, ...deauville); setAlpha(alpha, up, 0.5); show(alpha, 0.5, ...lessCycles, noRt, noRtX, noRtX2); grow(alpha, down, u); cascade(alpha, moreCycles, clamp(u * 1.5 - 0.3));
    return { caption: "4 · Still bright (Deauville 4 or 5): escalate. Imperfect, since many PET-positive patients would have been cured anyway" };
  });
}

// ---------------------------------------------------------------- 26. point-of-care and decentralised cell manufacturing
export function pointOfCareManufacturing(): Mesh {
  const sc = scene();
  const HOSP: Vec3 = [-2.2, -0.4, 0], FACT: Vec3 = [2.4, 1.2, 0], POC: Vec3 = [-0.9, -0.4, 0];
  put(sc, "hosp", box(1.1, 1.0, 0.8, undefined, true), { at: HOSP });
  put(sc, "cross1", line([HOSP[0] - 0.15, HOSP[1] + 0.15, 0.41], [HOSP[0] + 0.15, HOSP[1] + 0.15, 0.41], "soft")); put(sc, "cross2", line([HOSP[0], HOSP[1], 0.41], [HOSP[0], HOSP[1] + 0.3, 0.41], "soft"));
  const patient = put(sc, "patient", figure(), { at: [HOSP[0], HOSP[1] - 0.05, 0.5], scale: 0.45 });
  const factory = put(sc, "factory", box(1.4, 0.8, 0.8, "soft", true), { at: FACT });
  const chimney = put(sc, "chimney", box(0.2, 0.5, 0.2, "soft", true), { at: [FACT[0] + 0.45, FACT[1] + 0.6, 0] });
  const out = put(sc, "out", arrow([HOSP[0] + 0.6, HOSP[1] + 0.3, 0], [FACT[0] - 0.75, FACT[1] - 0.1, 0], "soft"));
  const back = put(sc, "back", arrow([FACT[0] - 0.75, FACT[1] - 0.35, 0], [HOSP[0] + 0.6, HOSP[1] + 0.05, 0], "soft"));
  const bag = put(sc, "bag", box(0.28, 0.36, 0.1, "accent", true), { at: [HOSP[0] + 0.6, HOSP[1] + 0.3, 0.1] });
  const poc = put(sc, "poc", box(0.7, 0.9, 0.6, "accent", true), { at: POC });
  const drum = put(sc, "drum", cylinder(0.18, 0.4, 10, 2, "accent"), { at: [POC[0], POC[1] + 0.05, 0.31], rotX: Math.PI / 2 });
  const loop = put(sc, "loop", arrow([HOSP[0] + 0.6, HOSP[1] - 0.6, 0.2], [POC[0] - 0.4, POC[1] - 0.6, 0.2], "accent"));
  const loopBack = put(sc, "loopBack", arrow([POC[0] - 0.4, POC[1] - 0.8, 0.2], [HOSP[0] + 0.6, HOSP[1] - 0.8, 0.2], "accent"));
  const QC: Vec3 = [0.9, 1.3, 0];
  const qc = put(sc, "qc", doc(0.6, 0.7, 3), { at: QC });
  const qcLink1 = put(sc, "qcl1", line([QC[0], QC[1] - 0.35, 0], [POC[0] + 0.2, POC[1] + 0.45, 0], "soft"));
  const qcLink2 = put(sc, "qcl2", line([QC[0], QC[1] - 0.35, 0], [FACT[0] - 0.5, FACT[1] - 0.4, 0], "soft"));
  const clock = put(sc, "clock", ring(0.35, 14, "soft", "z"), { at: [1.4, -1.1, 0] });
  const hand = put(sc, "hand", line([1.4, -1.1, 0], [1.4, -0.8, 0], "accent"));
  const slow = put(sc, "slow", ticks(0.4, 2.8, -1.7, 6, "soft"));
  const fast = put(sc, "fast", ticks(0.4, 1.0, -1.9, 2, "accent"));
  sc.mesh.labels = [L([HOSP[0], 0.6, 0], "Hospital"), L([FACT[0], 2.05, 0], "Central factory, weeks away"), L([POC[0], 0.5, 0], "Closed automated platform on site"), L([QC[0], 1.9, 0], "One specification, central quality oversight")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, poc, drum, loop, loopBack, qc, qcLink1, qcLink2, fast); setAlpha(alpha, clock, 0.3); setAlpha(alpha, hand, 0.3); setAlpha(alpha, slow, 0.3);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); grow(alpha, out, clamp(u * 2)); grow(alpha, back, clamp(u * 2 - 1)); const v = u < 0.5 ? u * 2 : 2 - 2 * u; moveTo(pts, base, bag, [HOSP[0] + 0.6, HOSP[1] + 0.3, 0.1], [FACT[0] - 0.75, FACT[1] - 0.2, 0.1], v); setAlpha(alpha, slow, 0.3 + 0.7 * u); movePart(pts, base, hand, [0, 0, 0], 1, u * TAU * 3); setAlpha(alpha, hand, 1); setAlpha(alpha, clock, 1); return { caption: "1 · Today's model: a patient's T cells are shipped to a central factory and back, weeks from vein to vein" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 0.3, out, back, factory, chimney); setAlpha(alpha, bag, 0.3); setAlpha(alpha, poc, u); setAlpha(alpha, drum, u); movePart(pts, base, drum, [0, 0, 0], 1, u * TAU); grow(alpha, loop, u); setAlpha(alpha, slow, 0.3); setAlpha(alpha, clock, 0.6); setAlpha(alpha, hand, 0.6); movePart(pts, base, hand, [0, 0, 0], 1, TAU * 3); return { caption: "2 · Point-of-care: a closed, automated platform in or near the hospital runs the same process, cells never leave the building" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.3, out, back, factory, chimney); setAlpha(alpha, bag, 0.3); show(alpha, 1, poc, drum, loop); movePart(pts, base, drum, [0, 0, 0], 1, t * TAU * 4); setAlpha(alpha, qc, u); grow(alpha, qcLink1, u); grow(alpha, qcLink2, u); setAlpha(alpha, slow, 0.3); setAlpha(alpha, clock, 0.6); setAlpha(alpha, hand, 0.6); movePart(pts, base, hand, [0, 0, 0], 1, TAU * 3); return { caption: "3 · Central quality oversight and digital batch records hold every site to one product specification" }; }
    const u = Q(t, 3); show(alpha, 0.3, out, back, factory, chimney); setAlpha(alpha, bag, 0.3); show(alpha, 1, poc, drum, loop, qc); show(alpha, 0.6, qcLink1, qcLink2); movePart(pts, base, drum, [0, 0, 0], 1, t * TAU * 4); grow(alpha, loopBack, u); setAlpha(alpha, patient, 1); setAlpha(alpha, slow, 0.3); setAlpha(alpha, fast, u); setAlpha(alpha, clock, 1); setAlpha(alpha, hand, 1); movePart(pts, base, hand, [0, 0, 0], 1, TAU * 3 + u * TAU * 0.5);
    return { caption: "4 · About a week to product, lower cost and access for distant hospitals; regulators are still working out how to license many small sites" };
  });
}

// ---------------------------------------------------------------- 27. ultra-processed food and sugar-sweetened drinks
export function ultraProcessedFood(): Mesh {
  const sc = scene();
  const packs: Part[] = []; for (let i = 0; i < 3; i++) packs.push(put(sc, `pk${i}`, box(0.4, 0.55, 0.25, "hot", true), { at: [-2.7 + 0.5 * i, 0.9, 0], rotY: 0.2 * i }));
  const can = put(sc, "can", cylinder(0.16, 0.5, 10, 2, "hot", true, true), { at: [-1.2, 0.9, 0] });
  const PAT: Vec3 = [-0.4, -0.3, 0];
  put(sc, "patient", figure(), { at: PAT });
  const fat = put(sc, "fat", ellipsoid(0.45, 0.42, 0.35, 4, 10, "soft", true), { at: [PAT[0], PAT[1] + 0.25, 0] });
  const intake: Part[] = []; for (let i = 0; i < 4; i++) intake.push(put(sc, `in${i}`, octahedron(0.06, "hot"), { at: [-1.8, 0.8, 0.1] }));
  const additives: Part[] = []; for (let i = 0; i < 4; i++) additives.push(put(sc, `ad${i}`, small(0.05, "accent"), { at: [PAT[0] - 0.4 + 0.25 * i, PAT[1] - 0.2, 0.3] }));
  const fibre = put(sc, "fibre", polyline([[-2.6, -1.3, 0], [-2.3, -1.0, 0], [-2.0, -1.3, 0], [-1.7, -1.0, 0]], "accent"));
  const fibreX = put(sc, "fibreX", polyline([[-2.5, -1.45, 0.05], [-1.8, -0.85, 0.05]], "hot"));
  const AX: Vec3 = [1.2, -1.0, 0];
  put(sc, "axes", axes(AX, 1.8, 1.8));
  const risk = put(sc, "risk", polyline([[AX[0], AX[1] + 0.6, 0], [AX[0] + 0.6, AX[1] + 0.75, 0], [AX[0] + 1.2, AX[1] + 0.95, 0], [AX[0] + 1.8, AX[1] + 1.2, 0]], "hot"));
  const sugar = put(sc, "sugar", octahedron(0.12, "soft"), { at: [2.6, 1.2, 0] });
  const tumour = put(sc, "tumour", blob(0.2), { at: [2.6, 0.5, 0] });
  const feed = put(sc, "feed", arrow([2.6, 1.05, 0], [2.6, 0.75, 0], "soft"));
  const feedX = put(sc, "feedX", polyline([[2.4, 0.7, 0.05], [2.8, 1.1, 0.05]], "hot")); const feedX2 = put(sc, "feedX2", polyline([[2.4, 1.1, 0.05], [2.8, 0.7, 0.05]], "hot"));
  sc.mesh.labels = [L([-2.0, 1.55, 0], "Ultra-processed food and sugary drinks"), L([PAT[0], 1.1, 0], "Adiposity"), L([AX[0] + 0.9, AX[1] - 0.35, 0], "Cancer risk with share of diet"), L([2.6, 1.6, 0], "Sugar does not 'feed' a tumour directly")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...additives, fibre, fibreX, risk, sugar, tumour, feed, feedX, feedX2); movePart(pts, base, fat, [0, 0, 0], 0.5); setAlpha(alpha, fat, 0.4);
    const s = stageOf(t);
    const eat = (a: number) => intake.forEach((p, i) => { const v = (t * 3 + i * 0.25) % 1; moveTo(pts, base, p, [-1.8, 0.8, 0.1], [PAT[0], PAT[1] + 0.45, 0.15], v); setAlpha(alpha, p, a * (v > 0.05 && v < 0.95 ? 1 : 0)); });
    if (s === 0) { eat(1); packs.forEach((p, i) => setAlpha(alpha, p, 0.6 + 0.4 * pulse(t + i * 0.1, 4))); return { caption: "1 · Industrially processed foods and sugary drinks: energy-dense, hyper-palatable, low in fibre, easy to over-eat" }; }
    if (s === 1) { const u = Q(t, 1); eat(1); movePart(pts, base, fat, [0, 0, 0], 0.5 + 0.5 * u); setAlpha(alpha, fat, 0.4 + 0.6 * u); return { caption: "2 · Over-eating and weight gain follow; adiposity is the main route from these foods to cancer risk" }; }
    if (s === 2) { const u = Q(t, 2); eat(0.6); movePart(pts, base, fat, [0, 0, 0], 1); setAlpha(alpha, fat, 1); cascade(alpha, additives, u); grow(alpha, fibre, u); grow(alpha, fibreX, clamp(u * 2 - 1)); return { caption: "3 · Additives, packaging chemicals and the whole foods they displace may add smaller direct effects; this part is less certain" }; }
    const u = Q(t, 3); eat(0.6); movePart(pts, base, fat, [0, 0, 0], 1); setAlpha(alpha, fat, 1); show(alpha, 1, ...additives, fibre, fibreX); grow(alpha, risk, u); setAlpha(alpha, sugar, u); setAlpha(alpha, tumour, u); setAlpha(alpha, feed, u * 0.5); grow(alpha, feedX, clamp(u * 2 - 1)); grow(alpha, feedX2, clamp(u * 2 - 1));
    return { caption: "4 · In large cohorts each extra 10% of the diet from ultra-processed food tracked 12% higher cancer risk; sugar itself does not 'feed' a tumour in the way social media claims" };
  });
}

// ---------------------------------------------------------------- 28. ADC bioconjugation manufacturing
export function adcManufacturing(): Mesh {
  const sc = scene();
  const BIO: Vec3 = [-2.5, 0.9, 0], CONT: Vec3 = [-2.5, -0.9, 0], VES: Vec3 = [-0.4, 0, 0];
  put(sc, "bioreactor", cylinder(0.45, 1.0, 12, 3, undefined, false, true), { at: BIO });
  const cho = put(sc, "cho", cloud(10, 0.35, "soft", 4), { at: BIO });
  put(sc, "containment", box(1.0, 0.9, 0.7, "hot", true), { at: CONT });
  const warn = put(sc, "warn", polyline([[CONT[0] - 0.2, CONT[1] - 0.15, 0.36], [CONT[0] + 0.2, CONT[1] - 0.15, 0.36], [CONT[0], CONT[1] + 0.2, 0.36]], "hot", true));
  const AB0: Vec3 = [BIO[0], BIO[1], 0.2], PAY0: Vec3 = [CONT[0], CONT[1], 0.4];
  const ab = put(sc, "ab", antibody(0.45), { at: AB0 });
  const pays: Part[] = []; for (let i = 0; i < 4; i++) pays.push(put(sc, `pay${i}`, octahedron(0.08, "hot"), { at: PAY0 }));
  const vessel = put(sc, "vessel", cylinder(0.7, 1.2, 14, 3, "accent"), { at: VES });
  const stir = put(sc, "stir", line([VES[0] - 0.4, VES[1] - 0.3, 0], [VES[0] + 0.4, VES[1] - 0.3, 0], "accent"));
  const AX: Vec3 = [1.0, -1.3, 0];
  const ax = put(sc, "axes", axes(AX, 1.4, 1.0));
  const dar: Part[] = [0.2, 0.5, 0.85, 0.5, 0.2].map((h, i) => put(sc, `dar${i}`, bar(AX[0] + 0.25 + 0.22 * i, h, 0.14, "accent"), { at: [0, AX[1], 0] }));
  const free = put(sc, "free", small(0.06, "hot"), { at: [AX[0] + 1.3, AX[1] + 0.15, 0] });
  const VIAL: Vec3 = [2.4, 0.7, 0];
  const vials: Part[] = []; for (let i = 0; i < 3; i++) vials.push(put(sc, `vial${i}`, cylinder(0.12, 0.42, 8, 2, "accent", true, true), { at: [VIAL[0] - 0.35 + 0.35 * i, VIAL[1], 0] }));
  const fill = put(sc, "fill", arrow([VES[0] + 0.75, VES[1] + 0.3, 0], [VIAL[0] - 0.6, VIAL[1], 0], "accent"));
  sc.mesh.labels = [L([BIO[0], 1.85, 0], "Antibody from CHO cells"), L([CONT[0], -1.75, 0], "Payload-linker, high-potency containment"), L([VES[0], 1.2, 0], "Conjugation and purification"), L([VIAL[0], 1.4, 0], "Aseptic fill and freeze-drying")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...dar, free, ...vials, fill); setAlpha(alpha, ax, 0.25); setAlpha(alpha, vessel, 0.35); setAlpha(alpha, stir, 0.35);
    const s = stageOf(t);
    const conjugate = (u: number) => { moveTo(pts, base, ab, AB0, [VES[0], VES[1] + 0.1, 0.1], u); pays.forEach((p, i) => moveTo(pts, base, p, PAY0, [VES[0] + (i % 2 ? 0.28 : -0.28), VES[1] - 0.25 + 0.15 * i, 0.1], u)); };
    if (s === 0) { setAlpha(alpha, cho, 0.6 + 0.4 * pulse(t, 3)); setAlpha(alpha, warn, 0.5 + 0.5 * pulse(t, 5)); movePart(pts, base, ab, [0, 0, 0], 1, t * TAU); return { caption: "1 · The antibody is grown in CHO cells in a bioreactor; the toxic payload-linker is made separately under high-potency containment" }; }
    if (s === 1) { const u = Q(t, 1); conjugate(u); setAlpha(alpha, vessel, 0.35 + 0.65 * u); setAlpha(alpha, stir, 1); movePart(pts, base, stir, [0, 0, 0], 1, t * TAU * 6); return { caption: "2 · Conjugation joins them, at defined sites or at random cysteines and lysines" }; }
    if (s === 2) { const u = Q(t, 2); conjugate(1); setAlpha(alpha, vessel, 1); setAlpha(alpha, stir, 1); movePart(pts, base, stir, [0, 0, 0], 1, t * TAU * 6); setAlpha(alpha, ax, 0.25 + 0.6 * u); cascade(alpha, dar, u); setAlpha(alpha, free, clamp(u * 2 - 1) * pulse(t, 5)); return { caption: "3 · Purification and analytics: the drug-to-antibody ratio and any free payload are measured before release" }; }
    const u = Q(t, 3); conjugate(1); setAlpha(alpha, vessel, 1); setAlpha(alpha, stir, 0.5); setAlpha(alpha, ax, 0.85); show(alpha, 1, ...dar); setAlpha(alpha, free, 0.5); grow(alpha, fill, u); cascade(alpha, vials, clamp(u * 1.4 - 0.3));
    return { caption: "4 · Aseptic fill and freeze-drying into vials; only a handful of contractors can do the whole chain, so queues are long and supply is concentrated" };
  });
}

// ---------------------------------------------------------------- 29. AI auto-contouring and adaptive planning
export function autoContouring(): Mesh {
  const sc = scene();
  const SL: Vec3 = [-1.2, 0.2, 0];
  const slice = put(sc, "slice", quad(2.6, 2.0, "soft"), { at: SL });
  put(sc, "bodyOutline", ellipsoid(1.1, 0.8, 0.01, 1, 14, "soft"), { at: SL });
  const organs: Array<{ at: Vec3; r: [number, number] }> = [{ at: [SL[0] - 0.5, SL[1] + 0.1, 0.02], r: [0.3, 0.35] }, { at: [SL[0] + 0.5, SL[1] + 0.1, 0.02], r: [0.3, 0.35] }, { at: [SL[0], SL[1] - 0.35, 0.02], r: [0.25, 0.15] }];
  const contours: Part[] = organs.map((o, i) => put(sc, `ct${i}`, ellipsoid(o.r[0], o.r[1], 0.01, 1, 12, "accent"), { at: o.at }));
  const target = put(sc, "target", ring(0.2, 12, "hot", "z"), { at: [SL[0] + 0.15, SL[1] + 0.35, 0.03] });
  const AI: Vec3 = [1.0, 1.4, 0];
  const ai = put(sc, "ai", box(0.7, 0.5, 0.4, "accent", true), { at: AI });
  const nodes = put(sc, "nodes", dots([[AI[0] - 0.2, AI[1] + 0.1, 0.21], [AI[0], AI[1] - 0.1, 0.21], [AI[0] + 0.2, AI[1] + 0.1, 0.21], [AI[0], AI[1] + 0.15, 0.21]], "accent"));
  const aiLink = put(sc, "aiLink", arrow([AI[0] - 0.4, AI[1] - 0.1, 0], [SL[0] + 1.0, SL[1] + 0.6, 0], "accent"));
  const clin = put(sc, "clin", figure("soft"), { at: [2.4, 0.2, 0], scale: 0.6 });
  const pen = put(sc, "pen", line([2.1, 0.5, 0.1], [SL[0] + 0.35, SL[1] + 0.35, 0.1], "soft"));
  const tick = put(sc, "tick", polyline([[1.6, -0.6, 0], [1.75, -0.8, 0], [2.1, -0.3, 0]], "accent"));
  const days: Part[] = []; for (let i = 0; i < 3; i++) days.push(put(sc, `day${i}`, quad(0.5, 0.4, "soft"), { at: [0.9 + 0.55 * i, -1.3, 0] }));
  const dayC: Part[] = []; for (let i = 0; i < 3; i++) dayC.push(put(sc, `dayc${i}`, ring(0.1, 8, "accent", "z"), { at: [0.9 + 0.55 * i + 0.05 * i, -1.3 + 0.04 * i, 0.02] }));
  sc.mesh.labels = [L([SL[0], 1.5, 0], "Planning scan, one slice"), L([AI[0], 1.95, 0], "Neural network draws the organs"), L([2.4, 1.1, 0], "Clinician checks and edits"), L([1.45, -1.8, 0], "Re-plan daily on today's anatomy")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, ...contours, target, ai, nodes, aiLink, clin, pen, tick, ...days, ...dayC); setAlpha(alpha, slice, 0.6);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, slice, 0.3 + 0.7 * u); return { caption: "1 · A planning CT or MR scan arrives; organs at risk and the target have to be outlined on every slice, hours of work by hand" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, ai, 1); setAlpha(alpha, nodes, pulse(t, 6)); grow(alpha, aiLink, clamp(u * 3)); contours.forEach((c, i) => grow(alpha, c, clamp(u * 1.6 - 0.3 - i * 0.2))); return { caption: "2 · A neural network trained on expert contours draws the organs in minutes" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, ai, 0.5); setAlpha(alpha, nodes, 0.5); setAlpha(alpha, aiLink, 0.3); show(alpha, 1, ...contours); setAlpha(alpha, clin, 1); grow(alpha, pen, u); grow(alpha, target, clamp(u * 2 - 0.6)); setAlpha(alpha, tick, clamp(u * 3 - 2)); return { caption: "3 · A clinician checks and edits; drawing the tumour target itself stays a human job" }; }
    const u = Q(t, 3); setAlpha(alpha, ai, 0.5); setAlpha(alpha, nodes, 0.5); setAlpha(alpha, aiLink, 0.3); show(alpha, 1, ...contours, target, tick); setAlpha(alpha, clin, 1); setAlpha(alpha, pen, 0.3); cascade(alpha, days, u); cascade(alpha, dayC, u);
    return { caption: "4 · Fast contours make daily adaptive radiotherapy practical: re-plan on today's anatomy in minutes rather than days" };
  });
}

// ---------------------------------------------------------------- 30. cancer pain management
export function painManagement(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [-2.0, 0, 0];
  put(sc, "patient", figure(), { at: PAT });
  const boneMet = put(sc, "boneMet", blob(0.1), { at: [PAT[0] + 0.19, -0.45, 0.05] });
  const nerve = put(sc, "nerve", polyline([[PAT[0] + 0.3, 0.56, 0.05], [PAT[0] + 0.42, 0.26, 0.08], [PAT[0] + 0.38, -0.04, 0.12]], "hot"));
  const visc = put(sc, "visc", blob(0.1), { at: [PAT[0] - 0.05, 0.2, 0.08] });
  const flashes: Part[] = [boneMet, nerve, visc].map((_, i) => put(sc, `fl${i}`, ring(0.2, 10, "hot", "z"), { at: [[PAT[0] + 0.19, -0.45, 0.06], [PAT[0] + 0.42, 0.26, 0.09], [PAT[0] - 0.05, 0.2, 0.09]][i] as Vec3 }));
  const STEP: Vec3 = [-0.6, -1.2, 0];
  const steps: Part[] = []; for (let i = 0; i < 3; i++) steps.push(put(sc, `st${i}`, bar(STEP[0] + 0.55 * i, 0.3 + 0.3 * i, 0.5, "accent"), { at: STEP }));
  const morphine = put(sc, "morphine", cylinder(0.11, 0.34, 8, 2, "accent", true, true), { at: [STEP[0] + 0.55, STEP[1] + 0.95, 0], rotZ: 0.5 });
  const adj = put(sc, "adj", cylinder(0.09, 0.28, 8, 2, "soft", true, true), { at: [STEP[0] + 1.1, STEP[1] + 1.2, 0], rotZ: -0.5 });
  const beam = put(sc, "beam", polyline([[PAT[0] - 1.3, -1.6, 0], [PAT[0] + 0.19, -0.45, 0], [PAT[0] - 1.6, -1.2, 0]], "accent"));
  const needle = put(sc, "needle", line([1.4, 1.5, 0.2], [PAT[0] + 0.05, 0.2, 0.15], "accent"));
  const pump = put(sc, "pump", disc(0.22, 12, "accent", "z"), { at: [1.6, 0.4, 0] });
  const cath = put(sc, "cath", polyline([[1.4, 0.4, 0], [0.6, 0.3, 0.1], [PAT[0] + 0.2, 0.1, 0.12]], "accent"));
  const globe = put(sc, "globe", sphere(0.5, 4, 10, "soft"), { at: [2.6, -0.8, 0] });
  const noAccess = put(sc, "noAccess", cloud(8, 0.4, "hot", 6), { at: [2.6, -0.8, 0.1] });
  sc.mesh.labels = [L([PAT[0], 1.45, 0], "Pain: bone, nerve, organ"), L([STEP[0] + 0.55, STEP[1] - 0.4, 0], "Oral morphine plus adjuvants"), L([1.6, 1.0, 0], "Nerve block, pump, radiotherapy"), L([2.6, -1.6, 0], "Most of the world: almost no morphine")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...steps, morphine, adj, beam, needle, pump, cath, noAccess); setAlpha(alpha, globe, 0.25);
    const s = stageOf(t);
    const flash = (a: number) => flashes.forEach((f, i) => { const v = (t * 3 + i / 3) % 1; movePart(pts, base, f, [0, 0, 0], 0.5 + 1.2 * v); setAlpha(alpha, f, a * (1 - v)); });
    if (s === 0) { flash(1); return { caption: "1 · Pain is assessed by type (bone, nerve, organ) and intensity, and the cause is treated alongside the symptom" }; }
    if (s === 1) { const u = Q(t, 1); flash(0.7); cascade(alpha, steps, u); setAlpha(alpha, morphine, clamp(u * 2 - 0.5)); setAlpha(alpha, adj, clamp(u * 2 - 1)); return { caption: "2 · Oral morphine, cheap and on the WHO essential list, is the core; adjuvants (dexamethasone, gabapentinoids, duloxetine for chemotherapy nerve pain) target the mechanism" }; }
    if (s === 2) { const u = Q(t, 2); flash(0.4); show(alpha, 1, ...steps, morphine, adj); setAlpha(alpha, beam, u > 0.1 ? pulse(t, 5) : 0); setAlpha(alpha, boneMet, 1 - 0.6 * u); movePart(pts, base, boneMet, [0, 0, 0], 1 - 0.4 * u); return { caption: "3 · Treat the cause too: a single radiotherapy fraction eases bone pain in about 60%; bone drugs and radiopharmaceuticals help as well" }; }
    const u = Q(t, 3); flash(0.2); show(alpha, 1, ...steps, morphine, adj); setAlpha(alpha, beam, 0.3); setAlpha(alpha, boneMet, 0.4); movePart(pts, base, boneMet, [0, 0, 0], 0.6); grow(alpha, needle, clamp(u * 2)); setAlpha(alpha, pump, clamp(u * 2 - 0.5)); grow(alpha, cath, clamp(u * 2 - 0.5)); setAlpha(alpha, globe, 0.25 + 0.75 * u); setAlpha(alpha, noAccess, clamp(u * 2 - 1) * pulse(t, 4));
    return { caption: "4 · Refractory pain: nerve blocks (coeliac plexus), vertebroplasty or an intrathecal pump. The global gap is access: about 80% of the world has essentially no morphine" };
  });
}

export const WAVE4: Record<string, () => Mesh> = {
  "integrative-oncology": integrativeOncology,
  "flow-cytometry-mrd": flowCytometryMrd,
  "cytogenetics-fish": cytogeneticsFish,
  "whole-slide-scanners": wholeSlideScanners,
  "antiemetic-therapy": antiemetics,
  "alternative-medicine-instead-of-treatment": alternativeInsteadOfTreatment,
  "minoxidil-chemotherapy-alopecia": minoxidilAlopecia,
  "oncology-nutrition": nutritionSupport,
  "transfusion-support": transfusionSupport,
  "bone-modifying-agents": boneModifyingAgents,
  "psycho-oncology": psychoOncology,
  "sstr-pet": sstrPet,
  "limb-salvage-surgery": limbSalvage,
  "bariatric-surgery-cancer-incidence": bariatricSurgeryCancer,
  "resistance-training-cachexia": resistanceTraining,
  "probiotics-antibiotic-stewardship-io": antibioticStewardshipIo,
  "precancer-ablation": precancerAblation,
  "ngs-bioinformatics-software": ngsBioinformatics,
  "fertility-preservation": fertilityPreservation,
  "prophylactic-cranial-irradiation": prophylacticCranialIrradiation,
  "sleep-circadian-interventions": sleepCircadian,
  "bh3-profiling": bh3Profiling,
  "colposcopy-excision": colposcopyExcision,
  "microbiome-modulation-io": microbiomeModulationIo,
  "pet-adapted-therapy": petAdaptedTherapy,
  "point-of-care-cell-manufacturing": pointOfCareManufacturing,
  "ultra-processed-food-ssb": ultraProcessedFood,
  "adc-cdmo-manufacturing": adcManufacturing,
  "auto-contouring-ai": autoContouring,
  "pain-management": painManagement,
};

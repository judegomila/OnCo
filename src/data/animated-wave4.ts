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
};

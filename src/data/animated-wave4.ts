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
};

/**
 * Wave 3 of animated technology schematics: thirty well-connected technologies that until now fell back
 * to a generic front placeholder (transplants, screening, interventional radiology, nutrition and
 * lifestyle evidence, registries, palliative care, …). Same conventions as ./animated.ts and
 * ./front-animations.ts: a scene of named parts, four captioned phases on a 10-14 s loop, plain-English
 * labels, every mesh under 500 points. The viewer blends the last 14 % of the cycle back to frame 0, so
 * each scene simply ends in its final state and lets the renderer carry it home.
 *
 * Self-contained (imports only the wireframe primitives) so that ./animated.ts can spread WAVE3 into its
 * registry without an import cycle.
 */
import { add, antibody, arrow, box, cylinder, dna, dots, ellipsoid, empty, helix, lerp, lerp3, line, movePart, octahedron, part, phase, polyline, ring, setAlpha, sphere, torus, type Mesh, type Part, type Vec3 } from "@/lib/wireframe";

const TAU = Math.PI * 2;
type Scene = { mesh: Mesh; parts: Record<string, Part> };
type Lbl = { at: Vec3; text: string };
const scene = (): Scene => ({ mesh: empty(), parts: {} });
const put = (sc: Scene, name: string, m: Mesh, opts: Parameters<typeof add>[2] = {}): Part => { const p = part(sc.mesh, m, opts); sc.parts[name] = p; return p; };
const pulse = (t: number, f = 6) => 0.55 + 0.45 * Math.sin(t * TAU * f);
const cell = (r: number, cls?: string) => sphere(r, 5, 10, cls);
const small = (r: number, cls?: string) => sphere(r, 3, 8, cls);
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
/** Standing human silhouette, ~1.8 tall, centred at origin. */
function figure(cls?: string): Mesh {
  const m = empty();
  add(m, sphere(0.16, 3, 8, cls), { at: [0, 0.78, 0] });
  add(m, polyline([[0, 0.6, 0], [0, 0.0, 0]], cls));
  add(m, polyline([[-0.32, 0.5, 0], [0, 0.55, 0], [0.32, 0.5, 0]], cls));
  add(m, polyline([[-0.32, 0.5, 0], [-0.4, 0.0, 0]], cls)); add(m, polyline([[0.32, 0.5, 0], [0.4, 0.0, 0]], cls));
  add(m, polyline([[-0.18, 0.0, 0], [0, 0.0, 0], [0.18, 0.0, 0]], cls));
  add(m, polyline([[-0.18, 0.0, 0], [-0.2, -0.8, 0]], cls)); add(m, polyline([[0.18, 0.0, 0], [0.2, -0.8, 0]], cls));
  return m;
}
/** Clipboard / document: a rectangle with a few text lines. */
function doc(w = 0.7, h = 0.9, lines = 4, cls?: string): Mesh {
  const m = polyline([[-w / 2, -h / 2, 0], [w / 2, -h / 2, 0], [w / 2, h / 2, 0], [-w / 2, h / 2, 0]], cls, true);
  for (let i = 0; i < lines; i++) { const y = h / 2 - 0.18 - (i * (h - 0.3)) / Math.max(1, lines - 1); add(m, line([-w / 2 + 0.1, y, 0], [w / 2 - 0.1 - (i % 2) * 0.15, y, 0], "soft")); }
  return m;
}
/** Timeline: a baseline with n ticks. */
function ticks(x0: number, x1: number, y: number, n: number, cls?: string): Mesh {
  const m = line([x0, y, 0], [x1, y, 0], cls);
  for (let i = 0; i < n; i++) { const x = x0 + ((x1 - x0) * i) / Math.max(1, n - 1); add(m, line([x, y - 0.08, 0], [x, y + 0.08, 0], cls)); }
  return m;
}
/** Bar standing on y=0 at x, of height h. */
const bar = (x: number, h: number, w = 0.3, cls?: string) => { const m = box(w, h, w, cls); m.points = m.points.map((p) => [p[0] + x, p[1] + h / 2, p[2]] as Vec3); return m; };
/** Scatter of n dots inside a flattened blob of radius r (marrow, microbes, cells in a tissue). */
function cloud(n: number, r: number, cls?: string, seed = 1): Mesh {
  const pts: Vec3[] = [];
  for (let i = 0; i < n; i++) { const a = (TAU * i * 0.618 * seed) % TAU, rr = r * (0.3 + 0.7 * (((i * 7 + seed) % 11) / 11)); pts.push([rr * Math.cos(a), rr * Math.sin(a) * 0.7, 0.3 * r * Math.sin(i * 1.7)]); }
  return dots(pts, cls);
}
/** Branching artery tree from `root` toward +x, three levels deep. */
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
/** Horizontal gut/vessel tube along x, centred at origin. */
const tube = (r: number, len: number, cls?: string) => { const m = cylinder(r, len, 12, 3, cls); m.points = m.points.map((p) => [p[1], p[0], p[2]] as Vec3); return m; };
function frame(sc: Scene, duration: number, fn: (t: number, pts: Vec3[], alpha: number[]) => { caption: string; labels?: Lbl[] }): Mesh {
  sc.mesh.animate = { duration, frame: (t) => { const pts = sc.mesh.points.map((p) => [p[0], p[1], p[2]] as Vec3); const alpha = sc.mesh.segments.map(() => 1); const r = fn(t, pts, alpha); return { points: pts, alpha, caption: r.caption, labels: r.labels ?? sc.mesh.labels }; } };
  return sc.mesh;
}
const L = (at: Vec3, text: string): Lbl => ({ at, text });

// ---------------------------------------------------------------- 1. allogeneic stem cell transplant
export function allogeneicHsct(): Mesh {
  const sc = scene();
  const DONOR: Vec3 = [-2.4, 0, 0], PAT: Vec3 = [1.6, 0, 0], MARROW: Vec3 = [PAT[0], -0.35, 0];
  put(sc, "donor", figure("soft"), { at: DONOR });
  put(sc, "patient", figure(), { at: PAT });
  const marrowOld = put(sc, "marrowOld", cloud(14, 0.45, "hot", 2), { at: MARROW });
  const marrowNew = put(sc, "marrowNew", cloud(14, 0.45, "accent", 3), { at: MARROW });
  const leuk = put(sc, "leuk", small(0.14, "hot"), { at: [PAT[0] + 0.55, -0.6, 0.1] });
  const beam = put(sc, "beam", polyline([[PAT[0] - 0.9, 1.9, 0], [PAT[0], 0.9, 0], [PAT[0] + 0.9, 1.9, 0]], "accent"));
  const GRAFT0: Vec3 = [DONOR[0], -0.35, 0], BAG: Vec3 = [-0.5, 0.9, 0];
  const graft = put(sc, "graft", cloud(12, 0.3, "accent", 5), { at: GRAFT0 });
  const bag = put(sc, "bag", box(0.5, 0.7, 0.2), { at: BAG });
  const tcell = put(sc, "tcell", small(0.12, "accent"), { at: [PAT[0] + 0.3, -0.5, 0.15] });
  sc.mesh.labels = [L([DONOR[0], 1.35, 0], "Donor"), L([PAT[0], 1.35, 0], "Patient"), L([PAT[0], -1.15, 0], "Bone marrow"), L([PAT[0] + 0.9, -0.9, 0], "Leukaemia cell")];
  const base = sc.mesh.points;
  return frame(sc, 14, (t, pts, alpha) => {
    hide(alpha, marrowNew, tcell, beam);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, beam, u > 0.1 ? pulse(t, 5) : 0); setAlpha(alpha, marrowOld, 1 - 0.85 * u); setAlpha(alpha, leuk, 1 - 0.6 * u); setAlpha(alpha, bag, 0.4); return { caption: "1 · Conditioning: chemotherapy or radiation clears the patient's own marrow and most of the leukaemia" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, marrowOld, 0.15); setAlpha(alpha, leuk, 0.4); moveTo(pts, base, graft, GRAFT0, BAG, u, lerp(1, 0.6, u)); setAlpha(alpha, bag, 0.4 + 0.6 * u); return { caption: "2 · A matched donor gives blood-forming stem cells, collected into a bag" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, marrowOld, 0.15); setAlpha(alpha, leuk, 0.4); moveTo(pts, base, graft, GRAFT0, MARROW, u, lerp(0.6, 1, u)); setAlpha(alpha, bag, 1 - u); return { caption: "3 · Infused like a transfusion, the cells find their way to the patient's bone marrow" }; }
    const u = Q(t, 3); moveTo(pts, base, graft, GRAFT0, MARROW, 1); setAlpha(alpha, graft, 1 - u); setAlpha(alpha, marrowNew, u); setAlpha(alpha, marrowOld, 0.15 * (1 - u)); setAlpha(alpha, bag, 0);
    setAlpha(alpha, tcell, u); moveTo(pts, base, tcell, [PAT[0] + 0.3, -0.5, 0.15], [PAT[0] + 0.45, -0.58, 0.12], u); movePart(pts, base, leuk, [0, 0, 0], 1 - 0.9 * u); setAlpha(alpha, leuk, 0.4 * (1 - u) + 0.2 * pulse(t, 8) * (1 - u));
    return { caption: "4 · New donor marrow grows; donor immune cells hunt any leukaemia left (graft-versus-leukaemia)" };
  });
}

// ---------------------------------------------------------------- 2. autologous stem cell transplant
export function autologousTransplant(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [0.6, 0, 0], STORE: Vec3 = [-2.2, 0.6, 0], MARROW: Vec3 = [PAT[0], -0.35, 0];
  put(sc, "patient", figure(), { at: PAT });
  const marrow = put(sc, "marrow", cloud(12, 0.4, "accent", 4), { at: MARROW });
  const myel = put(sc, "myel", cloud(10, 0.5, "hot", 6), { at: [PAT[0], -0.25, 0.05] });
  const freezer = put(sc, "freezer", box(0.9, 0.9, 0.5), { at: STORE });
  const snow = put(sc, "snow", dots([[STORE[0] - 0.2, STORE[1] + 0.2, 0.26], [STORE[0] + 0.2, STORE[1] - 0.1, 0.26], [STORE[0], STORE[1] + 0.3, 0.26]], "soft"));
  const drip: Part[] = []; for (let i = 0; i < 6; i++) drip.push(put(sc, `d${i}`, octahedron(0.06, "hot"), { at: [PAT[0] - 0.5 + 0.2 * i, 1.9, 0] }));
  const iv = put(sc, "iv", polyline([[PAT[0] + 0.4, 0.1, 0], [PAT[0] + 1.3, 0.8, 0], [PAT[0] + 1.3, 1.8, 0]], "soft"));
  const bag = put(sc, "bag", box(0.4, 0.55, 0.15, "accent"), { at: [PAT[0] + 1.3, 2.05, 0] });
  const chart = put(sc, "chart", polyline([[2.6, -0.9, 0], [2.9, -0.95, 0], [3.1, -0.6, 0], [3.35, -0.1, 0], [3.6, 0.1, 0]], "accent"));
  sc.mesh.labels = [L([STORE[0], 1.35, 0], "Own stem cells, frozen"), L([PAT[0], 1.35, 0], "Patient"), L([PAT[0], -1.1, 0], "Marrow"), L([3.1, 0.45, 0], "Blood counts recover")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...drip, bag, chart); setAlpha(alpha, iv, 0.3);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); moveTo(pts, base, marrow, MARROW, STORE, u, lerp(1, 0.6, u)); setAlpha(alpha, freezer, 0.4 + 0.6 * u); setAlpha(alpha, snow, u); return { caption: "1 · The patient's own stem cells are collected from the blood and frozen" }; }
    if (s === 1) { const u = Q(t, 1); moveTo(pts, base, marrow, MARROW, STORE, 1, 0.6); drip.forEach((d, i) => { const v = clamp(u * 1.6 - i * 0.1); setAlpha(alpha, d, v > 0 && v < 1 ? 1 : 0); moveTo(pts, base, d, [PAT[0] - 0.5 + 0.2 * i, 1.9, 0], [PAT[0] - 0.3 + 0.12 * i, -0.3, 0], v); }); setAlpha(alpha, myel, 1 - 0.9 * u); return { caption: "2 · High-dose chemotherapy (melphalan) wipes out the myeloma, and the marrow with it" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, myel, 0.1); setAlpha(alpha, snow, 1 - u); setAlpha(alpha, bag, u < 0.5 ? u * 2 : 2 - 2 * u); setAlpha(alpha, iv, 0.3 + 0.7 * u); moveTo(pts, base, marrow, STORE, MARROW, u, lerp(0.6, 1, u)); return { caption: "3 · The thawed cells are given back through a vein: a rescue for the marrow, not a new immune system" }; }
    const u = Q(t, 3); setAlpha(alpha, myel, 0.1); movePart(pts, base, marrow, [0, 0, 0], 1 + 0.2 * u); setAlpha(alpha, marrow, 0.6 + 0.4 * pulse(t, 4)); grow(alpha, chart, u);
    return { caption: "4 · Within two weeks the marrow regrows and blood counts return: a deeper remission" };
  });
}

// ---------------------------------------------------------------- 3. global oncology and access
export function globalAccess(): Mesh {
  const sc = scene();
  const HI: Vec3 = [-1.9, 0, 0], LO: Vec3 = [1.9, 0, 0];
  put(sc, "hiOut", ring(1.25, 20, "soft", "z"), { at: HI }); put(sc, "loOut", ring(1.25, 20, "soft", "z"), { at: LO });
  const hiCases = put(sc, "hiCases", cloud(8, 0.7, "hot", 2), { at: HI }); const loCases = put(sc, "loCases", cloud(18, 0.8, "hot", 3), { at: LO });
  const kit = (at: Vec3, prefix: string): Part[] => [
    put(sc, `${prefix}Rad`, torus(0.3, 0.06, 12, 5, "accent"), { at: [at[0] - 0.5, at[1] + 0.55, 0], rotX: Math.PI / 2 }),
    put(sc, `${prefix}Drug`, box(0.3, 0.4, 0.3, "accent"), { at: [at[0] + 0.5, at[1] + 0.55, 0] }),
    put(sc, `${prefix}Path`, box(0.45, 0.06, 0.3, "accent"), { at: [at[0], at[1] - 0.7, 0] }),
  ];
  const hiKit = kit(HI, "hi"), loKit = kit(LO, "lo");
  const bridges: Part[] = [0.6, 0.1, -0.4].map((y, i) => put(sc, `br${i}`, arrow([HI[0] + 1.3, y, 0], [LO[0] - 1.3, y, 0], "accent")));
  sc.mesh.labels = [L([HI[0], 1.5, 0], "High-income country"), L([LO[0], 1.5, 0], "Low- and middle-income country"), L([0, -1.2, 0], "Radiotherapy · medicines · pathology")];
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, ...bridges);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, hiCases, u); setAlpha(alpha, loCases, u); hide(alpha, ...loKit); return { caption: "1 · Most new cancers now occur in low- and middle-income countries" }; }
    if (s === 1) { const u = Q(t, 1); hide(alpha, ...loKit); setAlpha(alpha, hiCases, 1 - 0.6 * u); show(alpha, pulse(t, 4), ...hiKit); return { caption: "2 · Radiotherapy machines, essential medicines and pathology sit where cases are fewest" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, hiCases, 0.4); bridges.forEach((b, i) => grow(alpha, b, clamp(u * 1.5 - i * 0.25))); cascade(alpha, loKit, u); return { caption: "3 · Access programmes: pooled buying, twinning, training, and machines built for the setting" }; }
    const u = Q(t, 3); setAlpha(alpha, hiCases, 0.4); show(alpha, 0.5, ...bridges); setAlpha(alpha, loCases, 1 - 0.6 * u); show(alpha, 1, ...loKit);
    return { caption: "4 · Cheaper, decentralised care closes the survival gap, one service at a time" };
  });
}

// ---------------------------------------------------------------- 4. active surveillance
export function activeSurveillance(): Mesh {
  const sc = scene();
  const ORG: Vec3 = [-1.6, 0.1, 0];
  put(sc, "organ", ellipsoid(0.9, 0.75, 0.7, 4, 10, "soft"), { at: ORG });
  const tum = put(sc, "tum", small(0.14, "hot"), { at: [ORG[0] + 0.3, ORG[1] + 0.1, 0.2] });
  const scalpel = put(sc, "scalpel", polyline([[0, 0, 0], [0.5, 0.5, 0], [0.62, 0.45, 0]], "accent"), { at: [ORG[0] + 0.6, ORG[1] + 0.9, 0] });
  const tl = put(sc, "tl", ticks(0.2, 3.2, -0.6, 6));
  const checks: Part[] = []; for (let i = 0; i < 6; i++) checks.push(put(sc, `c${i}`, i % 2 ? ring(0.16, 10, "accent", "z") : cylinder(0.08, 0.3, 8, 2, "accent"), { at: [0.2 + 0.6 * i, -0.1, 0] }));
  const flat = put(sc, "flat", polyline([[0.2, 0.6, 0], [1.4, 0.62, 0], [2.6, 0.58, 0], [3.2, 0.6, 0]], "soft"));
  const rise = put(sc, "rise", polyline([[2.0, 0.6, 0], [2.6, 0.75, 0], [3.2, 1.05, 0]], "hot"));
  sc.mesh.labels = [L([ORG[0], 1.1, 0], "Low-risk tumour"), L([1.7, -1.0, 0], "Regular PSA tests and MRI"), L([1.7, 1.3, 0], "Treat only if it grows")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, ...checks, flat, rise); setAlpha(alpha, tl, 0.4);
    const s = stageOf(t);
    if (s === 0) { setAlpha(alpha, tum, pulse(t, 4)); setAlpha(alpha, scalpel, 0.3 + 0.7 * Q(t, 0)); return { caption: "1 · A small, slow-growing cancer is found: surgery or radiation would work, but with side effects" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, scalpel, 1 - u); moveTo(pts, base, scalpel, [0, 0, 0], [0.4, 0.6, 0], u); setAlpha(alpha, tl, 0.4 + 0.6 * u); cascade(alpha, checks, u); return { caption: "2 · Instead: watch closely, with blood tests, scans and occasional biopsies on a schedule" }; }
    if (s === 2) { const u = Q(t, 2); hide(alpha, scalpel); show(alpha, 1, ...checks); grow(alpha, flat, u); setAlpha(alpha, tum, 0.7); return { caption: "3 · Most stay stable for years, and the side effects of treatment are avoided entirely" }; }
    const u = Q(t, 3); show(alpha, 1, ...checks); setAlpha(alpha, flat, 1); grow(alpha, rise, u); movePart(pts, base, tum, [0, 0, 0], 1 + 0.6 * u); setAlpha(alpha, tum, pulse(t, 5)); setAlpha(alpha, scalpel, u); moveTo(pts, base, scalpel, [0, 0, 0], [-0.3, -0.35, 0], u);
    return { caption: "4 · If tests show growth, curative treatment starts then, with nothing lost by waiting" };
  });
}

// ---------------------------------------------------------------- 5. cachexia pharmacotherapy
export function cachexiaDrugs(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [1.2, 0, 0], TUM: Vec3 = [-2.0, -0.3, 0], BRAIN: Vec3 = [PAT[0], 0.78, 0];
  const body = put(sc, "body", figure(), { at: PAT });
  const muscle = put(sc, "muscle", ellipsoid(0.22, 0.45, 0.2, 3, 8), { at: [PAT[0] - 0.42, -0.35, 0] });
  const tum = put(sc, "tum", cell(0.4, "hot"), { at: TUM });
  const sig: Part[] = []; for (let i = 0; i < 5; i++) sig.push(put(sc, `s${i}`, octahedron(0.06, "hot"), { at: TUM }));
  const ab = put(sc, "ab", antibody(0.4, "accent"), { at: [-0.4, 1.6, 0] });
  const pill = put(sc, "pill", cylinder(0.1, 0.32, 8, 2, "accent"), { at: [2.4, 0.2, 0], rotZ: 0.6 });
  const plate = put(sc, "plate", ring(0.3, 14, "accent", "z"), { at: [2.4, 0.9, 0] });
  sc.mesh.labels = [L([TUM[0], 0.4, 0], "Tumour makes GDF-15"), L([BRAIN[0], 1.4, 0], "Brain appetite centre"), L([PAT[0] - 0.9, -0.6, 0], "Muscle"), L([2.4, 1.3, 0], "Appetite back")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, pill, plate, ab); setAlpha(alpha, body, 1);
    const s = stageOf(t);
    const path = (i: number, u: number) => { const v = clamp(u * 1.5 - i * 0.12); moveTo(pts, base, sig[i], TUM, [BRAIN[0] - 0.2, BRAIN[1], 0.1], v); setAlpha(alpha, sig[i], v > 0 && v < 1 ? 1 : 0.3); };
    if (s === 0) { const u = Q(t, 0); sig.forEach((_, i) => path(i, u)); movePart(pts, base, muscle, [0, 0, 0], 1 - 0.4 * u); setAlpha(alpha, tum, pulse(t, 4)); return { caption: "1 · The tumour releases GDF-15 and other signals; the brain switches appetite off and muscle wastes" }; }
    if (s === 1) { const u = Q(t, 1); sig.forEach((p, i) => { moveTo(pts, base, p, TUM, [-0.6, 0.6 + 0.1 * i, 0], 0.5); setAlpha(alpha, p, 1 - 0.8 * u); }); movePart(pts, base, muscle, [0, 0, 0], 0.6); setAlpha(alpha, ab, 1); moveTo(pts, base, ab, [-0.4, 1.6, 0], [-0.6, 0.85, 0], u); return { caption: "2 · An antibody (ponsegromab) catches GDF-15 in the blood before it reaches the brain" }; }
    if (s === 2) { const u = Q(t, 2); sig.forEach((p) => { moveTo(pts, base, p, TUM, [-0.6, 0.6, 0], 0.5); setAlpha(alpha, p, 0.2); }); setAlpha(alpha, ab, 1); moveTo(pts, base, ab, [-0.4, 1.6, 0], [-0.6, 0.85, 0], 1); setAlpha(alpha, pill, 1); moveTo(pts, base, pill, [2.4, 0.2, 0], [BRAIN[0] + 0.2, BRAIN[1], 0.1], u, 1 - 0.5 * u); movePart(pts, base, muscle, [0, 0, 0], 0.6 + 0.1 * u); return { caption: "3 · Anamorelin mimics the hunger hormone ghrelin; olanzapine quiets nausea. Eating restarts" }; }
    const u = Q(t, 3); sig.forEach((p) => { moveTo(pts, base, p, TUM, [-0.6, 0.6, 0], 0.5); setAlpha(alpha, p, 0.2); }); setAlpha(alpha, ab, 1); moveTo(pts, base, ab, [-0.4, 1.6, 0], [-0.6, 0.85, 0], 1); setAlpha(alpha, plate, u); movePart(pts, base, muscle, [0, 0, 0], 0.7 + 0.3 * u); setAlpha(alpha, muscle, 0.6 + 0.4 * pulse(t, 4));
    return { caption: "4 · Weight and muscle come back, with exercise and nutrition alongside the drugs" };
  });
}

// ---------------------------------------------------------------- 6. survivorship care plan
export function survivorshipPlan(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [-2.3, 0, 0];
  put(sc, "patient", figure(), { at: PAT });
  const hosp = put(sc, "hosp", box(0.8, 0.9, 0.5, "soft"), { at: [-2.3, 1.6, 0] });
  const plan = put(sc, "plan", doc(0.8, 1.0, 5), { at: [-0.9, 0.5, 0] });
  const tl = put(sc, "tl", ticks(-0.4, 3.2, -0.7, 5, "soft"));
  const heart = put(sc, "heart", small(0.16), { at: [0.5, 0.0, 0] });
  const scan = put(sc, "scan", ring(0.2, 12, undefined, "z"), { at: [1.4, 0.0, 0] });
  const blood = put(sc, "blood", cylinder(0.08, 0.36, 8, 2), { at: [2.3, 0.0, 0] });
  const flag = put(sc, "flag", small(0.1, "hot"), { at: [2.3, 0.3, 0.05] });
  const back = put(sc, "back", arrow([2.3, 0.5, 0], [-1.5, 1.4, 0], "accent"));
  sc.mesh.labels = [L([-2.3, 2.3, 0], "Treatment ends"), L([-0.9, 1.25, 0], "Written care plan"), L([1.4, -1.1, 0], "Yearly checks: heart, scans, bloods"), L([2.3, 0.75, 0], "Late effect caught early")];
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, heart, scan, blood, flag, back); setAlpha(alpha, tl, 0.3);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, hosp, 1 - 0.7 * u); setAlpha(alpha, plan, 0.15); return { caption: "1 · Active treatment finishes, but risks remain: heart damage, second cancers, fatigue, fertility" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, hosp, 0.3); grow(alpha, plan, u); return { caption: "2 · A written survivorship plan: what was given, what to watch for, who to call" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, hosp, 0.3); setAlpha(alpha, tl, 0.3 + 0.7 * u); cascade(alpha, [heart, scan, blood], u); return { caption: "3 · Scheduled checks over the years: echocardiogram, mammogram, thyroid and hormone bloods" }; }
    const u = Q(t, 3); setAlpha(alpha, hosp, 0.3 + 0.7 * u); show(alpha, 1, heart, scan, blood); setAlpha(alpha, flag, u > 0.2 ? pulse(t, 6) : 0); grow(alpha, back, u);
    return { caption: "4 · A problem found early goes straight back to the team, while it is still treatable" };
  });
}

// ---------------------------------------------------------------- 7. HPV testing and self-sampling
export function hpvTesting(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [-2.4, 0, 0];
  put(sc, "patient", figure(), { at: PAT });
  const SWAB0: Vec3 = [PAT[0] + 0.5, -0.1, 0.1], TUBE: Vec3 = [-0.9, 0, 0];
  const swab = put(sc, "swab", polyline([[0, 0, 0], [0, 0.6, 0]], "accent"), { at: SWAB0 });
  const swabTip = put(sc, "swabTip", small(0.06, "accent"), { at: [SWAB0[0], SWAB0[1] + 0.6, SWAB0[2]] });
  put(sc, "tube", cylinder(0.22, 1.1, 10, 3), { at: TUBE });
  const virus = put(sc, "virus", sphere(0.2, 3, 8, "hot"), { at: [0.6, 0.7, 0] });
  const vdna = put(sc, "vdna", dna(0.12, 0.7, 2, 20, "hot", 4), { at: [0.6, -0.3, 0] });
  const reads: Part[] = []; for (let i = 0; i < 4; i++) reads.push(put(sc, `r${i}`, line([1.3, 0.6 - 0.3 * i, 0], [2.0, 0.6 - 0.3 * i, 0], i === 1 ? "hot" : "soft")));
  const cervix = put(sc, "cervix", ring(0.35, 14, undefined, "z"), { at: [2.9, -0.4, 0] });
  const lesion = put(sc, "lesion", small(0.08, "hot"), { at: [3.05, -0.3, 0.02] });
  const scope = put(sc, "scope", ring(0.5, 16, "accent", "z"), { at: [2.9, -0.4, 0.1] });
  const clock = put(sc, "clock", ring(0.35, 14, "soft", "z"), { at: [2.9, 0.8, 0] });
  const hand = put(sc, "hand", line([2.9, 0.8, 0], [2.9, 1.1, 0], "accent"));
  sc.mesh.labels = [L([PAT[0], 1.35, 0], "Self-collected swab"), L([0.6, 1.2, 0], "HPV virus DNA"), L([2.9, -1.0, 0], "Cervix: colposcopy"), L([2.9, 1.4, 0], "Negative: five years")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, vdna, ...reads, cervix, lesion, scope, clock, hand); setAlpha(alpha, virus, 0.2);
    const s = stageOf(t);
    const swabTo = (u: number) => { moveTo(pts, base, swab, SWAB0, [TUBE[0], TUBE[1] - 0.3, 0], u); moveTo(pts, base, swabTip, [SWAB0[0], SWAB0[1] + 0.6, SWAB0[2]], [TUBE[0], TUBE[1] + 0.3, 0], u); };
    if (s === 0) { swabTo(Q(t, 0)); return { caption: "1 · A vaginal swab, taken by the woman herself at home, goes into a tube" }; }
    if (s === 1) { const u = Q(t, 1); swabTo(1); setAlpha(alpha, virus, 1); movePart(pts, base, virus, [0, 0, 0], 1 + 0.3 * u, u * 2); setAlpha(alpha, vdna, u); movePart(pts, base, vdna, [0, 0, 0], 1, u * 3); cascade(alpha, reads, u); return { caption: "2 · The lab looks for the DNA of high-risk HPV types (16, 18 and others), not for abnormal cells" }; }
    if (s === 2) { const u = Q(t, 2); swabTo(1); setAlpha(alpha, virus, 0.6); setAlpha(alpha, vdna, 0.6); show(alpha, 1, ...reads); setAlpha(alpha, cervix, u); setAlpha(alpha, lesion, u > 0.4 ? pulse(t, 5) : 0); setAlpha(alpha, scope, u); movePart(pts, base, scope, [0, 0, 0], 1.4 - 0.4 * u); return { caption: "3 · Positive: a closer look at the cervix finds any precancer, which is simply removed" }; }
    const u = Q(t, 3); swabTo(1); setAlpha(alpha, virus, 0.3); show(alpha, 0.5, ...reads); setAlpha(alpha, cervix, 0.5); setAlpha(alpha, scope, 0.3); setAlpha(alpha, clock, u); setAlpha(alpha, hand, u); movePart(pts, base, hand, [0, 0, 0], 1, u * TAU * 0.8);
    return { caption: "4 · Negative: safe for five years or more. Fewer visits, more women screened" };
  });
}

// ---------------------------------------------------------------- 8. PRRT
export function prrt(): Mesh {
  const sc = scene();
  const CELL: Vec3 = [1.2, 0, 0], NEIGH: Vec3 = [1.9, -1.3, 0.5];
  put(sc, "cell", cell(0.9), { at: CELL });
  put(sc, "nuc", sphere(0.3, 4, 8, "soft"), { at: [CELL[0] + 0.2, 0.05, 0] });
  put(sc, "neigh", cell(0.55, "hot"), { at: NEIGH });
  const recs: Part[] = []; for (let i = 0; i < 3; i++) { const a = 2.6 + i * 0.35; recs.push(put(sc, `rec${i}`, line([CELL[0] + 0.85 * Math.cos(a), 0.85 * Math.sin(a), 0], [CELL[0] + 1.1 * Math.cos(a), 1.1 * Math.sin(a), 0]))); }
  const START: Vec3 = [-2.4, 0.5, 0.1], DOCK: Vec3 = [CELL[0] - 1.25, 0.3, 0];
  const pep = put(sc, "pep", helix(0.08, 0.5, 2, 14, "accent"), { at: START, rotZ: Math.PI / 2 });
  const iso = put(sc, "iso", octahedron(0.1, "hot"), { at: [START[0] - 0.35, START[1], START[2]] });
  const rays: Part[] = []; for (let i = 0; i < 6; i++) { const a = (TAU * i) / 6; rays.push(put(sc, `ray${i}`, line([0, 0, 0], [0.9 * Math.cos(a), 0.9 * Math.sin(a), 0.3 * Math.sin(i)], "hot"), { at: [DOCK[0] - 0.35, DOCK[1], 0] })); }
  const dmg = put(sc, "dmg", dots([[CELL[0] + 0.1, 0.15, 0.1], [CELL[0] + 0.3, -0.05, -0.1], [CELL[0] + 0.25, 0.2, -0.1]], "hot"));
  const cycles = put(sc, "cycles", ticks(-2.2, -0.4, -1.3, 4, "soft"));
  sc.mesh.labels = [L([CELL[0], 1.2, 0], "Neuroendocrine tumour cell"), L([CELL[0] - 1.5, 0.75, 0], "Somatostatin receptor"), L([START[0], 0.95, 0], "Lu-177 on a peptide"), L([-1.3, -1.6, 0], "Four cycles, eight weeks apart")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...rays, dmg); setAlpha(alpha, cycles, 0.3);
    const s = stageOf(t);
    const carry = (u: number, spin = 0) => { moveTo(pts, base, pep, START, DOCK, u, 1, spin); moveTo(pts, base, iso, [START[0] - 0.35, START[1], START[2]], [DOCK[0] - 0.35, DOCK[1], 0], u); };
    if (s === 0) { carry(Q(t, 0), Q(t, 0) * 2); return { caption: "1 · A short peptide that mimics somatostatin carries a radioactive atom (lutetium-177)" }; }
    if (s === 1) { carry(1); show(alpha, pulse(t, 5), ...recs); return { caption: "2 · It locks onto somatostatin receptors, which neuroendocrine tumours carry in abundance" }; }
    if (s === 2) { const u = Q(t, 2); carry(1); rays.forEach((r, i) => { grow(alpha, r, clamp(u * 1.4 - i * 0.08)); movePart(pts, base, r, [0, 0, 0], 0.6 + 0.6 * pulse(t + i * 0.1, 3)); }); setAlpha(alpha, dmg, u > 0.5 ? pulse(t, 7) : 0); return { caption: "3 · Beta particles travel a couple of millimetres, breaking DNA in the cell and its neighbours" }; }
    const u = Q(t, 3); carry(1); show(alpha, 0.3, ...rays); setAlpha(alpha, dmg, 1); movePart(pts, base, sc.parts["cell"], [0, 0, 0], 1 - 0.15 * u); movePart(pts, base, sc.parts["neigh"], [0, 0, 0], 1 - 0.3 * u); setAlpha(alpha, sc.parts["neigh"], 1 - 0.6 * u); setAlpha(alpha, cycles, 0.3 + 0.7 * u);
    return { caption: "4 · Tumours shrink or stop growing; the same peptide with gallium-68 shows them on a PET scan first" };
  });
}

// ---------------------------------------------------------------- 9. oncology real-world data
export function realWorldData(): Mesh {
  const sc = scene();
  const recs: Part[] = [];
  for (let i = 0; i < 3; i++) { const at: Vec3 = [-2.6, 1.0 - i, 0]; put(sc, `cl${i}`, box(0.6, 0.5, 0.4, "soft"), { at }); recs.push(put(sc, `rec${i}`, doc(0.3, 0.36, 3, "hot"), { at: [at[0] + 0.45, at[1], 0.25] })); }
  const db = put(sc, "db", cylinder(0.6, 1.2, 14, 4), { at: [-0.4, 0, 0] });
  const grid = empty(); for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) add(grid, dots([[1.0 + 0.3 * c, 0.6 - 0.35 * r, 0]], "accent"));
  const rows = put(sc, "rows", grid);
  const km = put(sc, "km", polyline([[2.4, 0.9, 0], [2.6, 0.9, 0], [2.6, 0.6, 0], [2.9, 0.6, 0], [2.9, 0.2, 0], [3.2, 0.2, 0], [3.2, -0.1, 0], [3.5, -0.1, 0]], "accent"));
  const kmAx = put(sc, "kmAx", polyline([[2.4, 1.0, 0], [2.4, -0.3, 0], [3.6, -0.3, 0]], "soft"));
  const back = put(sc, "back", arrow([2.8, -0.6, 0], [-2.0, -1.5, 0], "accent"));
  sc.mesh.labels = [L([-2.6, 1.8, 0], "Clinics: notes, scans, prescriptions"), L([-0.4, 1.0, 0], "De-identified database"), L([1.45, 1.0, 0], "Structured rows"), L([3.0, 1.3, 0], "Real-world survival")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, rows, km, back); setAlpha(alpha, kmAx, 0.2);
    const s = stageOf(t);
    const flow = (u: number) => recs.forEach((r, i) => { const from: Vec3 = [-2.15, 1.0 - i, 0.25]; moveTo(pts, base, r, from, [-0.4, 0.3 - 0.3 * i, 0], u, 1 - 0.5 * u); });
    if (s === 0) { setAlpha(alpha, db, 0.3); show(alpha, pulse(t, 4), ...recs); return { caption: "1 · Every visit leaves a trail: notes, pathology, scans, prescriptions, in thousands of clinics" }; }
    if (s === 1) { const u = Q(t, 1); flow(u); setAlpha(alpha, db, 0.3 + 0.7 * u); recs.forEach((r) => setAlpha(alpha, r, 1 - 0.7 * u)); return { caption: "2 · Records are stripped of names and pooled; free text is read into structured fields" }; }
    if (s === 2) { const u = Q(t, 2); flow(1); show(alpha, 0.2, ...recs); cascade(alpha, [rows], 1); setAlpha(alpha, rows, u); movePart(pts, base, rows, [0, 0, 0], 0.5 + 0.5 * u); grow(alpha, km, u); setAlpha(alpha, kmAx, 0.2 + 0.6 * u); return { caption: "3 · Analysts ask how a drug performs in ordinary patients, not just the fittest trial volunteers" }; }
    const u = Q(t, 3); flow(1); show(alpha, 0.2, ...recs); setAlpha(alpha, rows, 1); setAlpha(alpha, km, 1); setAlpha(alpha, kmAx, 0.8); grow(alpha, back, u);
    return { caption: "4 · Findings feed back to regulators, guidelines and clinics: an external control arm, a safety signal" };
  });
}

// ---------------------------------------------------------------- 10. colorectal cancer screening
export function colorectalScreening(): Mesh {
  const sc = scene();
  const path: Vec3[] = [[-1.4, -1.2, 0], [-1.6, -0.4, 0], [-1.6, 0.6, 0], [-1.2, 1.1, 0], [0, 1.2, 0], [1.2, 1.1, 0], [1.6, 0.6, 0], [1.6, -0.4, 0], [1.4, -1.2, 0]];
  const colon = put(sc, "colon", polyline(path, undefined)); put(sc, "colon2", polyline(path.map((p) => [p[0] * 0.8, p[1] * 0.8, 0.1] as Vec3), "soft"));
  const POLYP: Vec3 = [1.4, 0.75, 0.05];
  const polyp = put(sc, "polyp", small(0.12, "hot"), { at: POLYP });
  const fit = put(sc, "fit", cylinder(0.12, 0.5, 8, 2, "accent"), { at: [-2.6, 0.2, 0] });
  const fitDots = put(sc, "fitDots", dots([[-2.62, 0.35, 0.13], [-2.55, 0.05, 0.13]], "hot"));
  const scopeLen = 8; const scopePts: Vec3[] = []; for (let i = 0; i <= scopeLen; i++) scopePts.push([-1.4, -1.6, 0.05]);
  const scope = put(sc, "scope", polyline(scopePts, "accent"));
  const snare = put(sc, "snare", ring(0.2, 10, "accent", "z"), { at: POLYP });
  const clock = put(sc, "clock", ring(0.35, 14, "soft", "z"), { at: [2.6, 0.2, 0] });
  const hand = put(sc, "hand", line([2.6, 0.2, 0], [2.6, 0.5, 0], "accent"));
  sc.mesh.labels = [L([0, 1.6, 0], "Colon"), L([POLYP[0] + 0.6, POLYP[1], 0], "Polyp"), L([-2.6, 0.75, 0], "Stool or blood test"), L([2.6, 0.85, 0], "Clear: back in ten years")];
  const base = sc.mesh.points;
  // colonoscope path: along the colon outline from the bottom-left end
  const along = (u: number): Vec3 => { const n = path.length - 1; const f = u * n, i = Math.min(n - 1, Math.floor(f)); return lerp3(path[i], path[i + 1], f - i); };
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, scope, snare, clock, hand); setAlpha(alpha, fitDots, 0);
    const s = stageOf(t);
    const scopeAt = (u: number) => { const head = clamp(u); for (let k = 0; k <= scopeLen; k++) { const v = Math.max(0, head - (k * head) / scopeLen); const p = along(v); pts[scope.p0 + k] = [p[0] + 0.05, p[1], 0.06]; } };
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, fit, 1); setAlpha(alpha, fitDots, u > 0.5 ? pulse(t, 5) : 0); setAlpha(alpha, polyp, 0.5 + 0.5 * pulse(t, 3)); scopeAt(0); return { caption: "1 · A home stool test (FIT) or a blood test picks up traces a polyp is bleeding or shedding DNA" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, fit, 0.3); setAlpha(alpha, scope, 1); scopeAt(u * 0.78); return { caption: "2 · A positive result leads to colonoscopy: a camera travels the whole length of the colon" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, fit, 0.3); setAlpha(alpha, scope, 1); scopeAt(0.78); setAlpha(alpha, snare, 1); movePart(pts, base, snare, [0, 0, 0], 1.3 - 0.9 * u); moveTo(pts, base, polyp, POLYP, [2.2, 1.4, 0.3], phase(u, 0.5, 1), 1 - 0.5 * phase(u, 0.5, 1)); return { caption: "3 · Polyps are snared and removed on the spot, years before they could become cancer" }; }
    const u = Q(t, 3); setAlpha(alpha, fit, 0.3); setAlpha(alpha, scope, 1 - u); scopeAt(0.78 * (1 - u)); setAlpha(alpha, polyp, 0); setAlpha(alpha, clock, u); setAlpha(alpha, hand, u); movePart(pts, base, hand, [0, 0, 0], 1, u * TAU * 0.8); setAlpha(alpha, colon, 1);
    return { caption: "4 · A clear colon means the next look is years away; from age 45 in the US, 50 in the UK" };
  });
}

// ---------------------------------------------------------------- shared: catheter into a liver tumour (TARE and TACE)
function liverCatheterScene(kind: "tare" | "tace"): Mesh {
  const sc = scene();
  const LIV: Vec3 = [1.2, 0.2, 0], TUM: Vec3 = [1.6, 0.35, 0.1];
  put(sc, "liver", ellipsoid(1.5, 0.9, 0.7, 4, 12, "soft"), { at: LIV });
  const tum = put(sc, "tum", cell(0.38, "hot"), { at: TUM });
  const art = put(sc, "art", tree([-0.6, -0.4, 0], 1.3, undefined));
  const feeder = put(sc, "feeder", line([1.4, 0.0, 0], TUM, "hot"));
  const cathPts: Vec3[] = []; for (let i = 0; i <= 8; i++) cathPts.push([-2.8, -1.6, 0]);
  const cath = put(sc, "cath", polyline(cathPts, "accent"));
  const beads: Part[] = []; for (let i = 0; i < 7; i++) beads.push(put(sc, `b${i}`, octahedron(0.06, "accent"), { at: [1.4, 0.0, 0] }));
  const rays: Part[] = []; for (let i = 0; i < 6; i++) { const a = (TAU * i) / 6; rays.push(put(sc, `ray${i}`, line([0, 0, 0], [0.5 * Math.cos(a), 0.5 * Math.sin(a), 0.2 * Math.sin(i)], "hot"), { at: TUM })); }
  sc.mesh.labels = [L([LIV[0], 1.35, 0], "Liver"), L([TUM[0] + 0.7, TUM[1] + 0.1, 0], "Tumour"), L([-2.4, -1.95, 0], "Catheter from the groin artery"), L([1.4, -0.55, 0], kind === "tare" ? "Yttrium-90 microspheres" : "Chemotherapy beads")];
  const route: Vec3[] = [[-2.8, -1.6, 0], [-1.8, -1.2, 0], [-0.6, -0.4, 0], [0.7, -0.4, 0], [1.1, -0.1, 0], [1.4, 0.0, 0]];
  const along = (u: number): Vec3 => { const n = route.length - 1, f = clamp(u) * n, i = Math.min(n - 1, Math.floor(f)); return lerp3(route[i], route[i + 1], f - i); };
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...beads, ...rays);
    const s = stageOf(t);
    const cathAt = (u: number) => { for (let k = 0; k <= 8; k++) pts[cath.p0 + k] = along(u - (k * u) / 8); };
    if (s === 0) { const u = Q(t, 0); cathAt(u); setAlpha(alpha, tum, pulse(t, 3)); return { caption: "1 · A thin catheter is threaded from an artery in the groin up into the artery feeding the tumour" }; }
    if (s === 1) { const u = Q(t, 1); cathAt(1); beads.forEach((b, i) => { const v = clamp(u * 1.5 - i * 0.08); setAlpha(alpha, b, v > 0 ? 1 : 0); const target: Vec3 = [TUM[0] + 0.25 * Math.cos(i * 2.4), TUM[1] + 0.25 * Math.sin(i * 2.4), TUM[2] + 0.1 * Math.sin(i)]; moveTo(pts, base, b, [1.4, 0.0, 0], target, v); }); return { caption: kind === "tare" ? "2 · Millions of tiny glass or resin beads carrying yttrium-90 are released and lodge in the tumour's vessels" : "2 · Chemotherapy-loaded beads (or drug in oil) are released and lodge in the tumour's small vessels" }; }
    if (s === 2) { const u = Q(t, 2); cathAt(1); beads.forEach((b, i) => { setAlpha(alpha, b, 1); moveTo(pts, base, b, [1.4, 0.0, 0], [TUM[0] + 0.25 * Math.cos(i * 2.4), TUM[1] + 0.25 * Math.sin(i * 2.4), TUM[2] + 0.1 * Math.sin(i)], 1); }); if (kind === "tare") rays.forEach((r, i) => { grow(alpha, r, clamp(u * 1.3 - i * 0.06)); movePart(pts, base, r, [0, 0, 0], 0.6 + 0.6 * pulse(t + i * 0.1, 3)); }); else { setAlpha(alpha, feeder, 1 - 0.9 * u); setAlpha(alpha, tum, 0.6 + 0.4 * pulse(t, 6)); } return { caption: kind === "tare" ? "3 · Beta radiation from inside the tumour reaches only a few millimetres, sparing the rest of the liver" : "3 · The beads block the blood supply and release chemotherapy slowly, trapped where it is needed" }; }
    const u = Q(t, 3); cathAt(1 - u); setAlpha(alpha, cath, 1 - u); beads.forEach((b, i) => { setAlpha(alpha, b, 0.6); moveTo(pts, base, b, [1.4, 0.0, 0], [TUM[0] + 0.25 * Math.cos(i * 2.4), TUM[1] + 0.25 * Math.sin(i * 2.4), TUM[2] + 0.1 * Math.sin(i)], 1, 1 - 0.6 * u); }); show(alpha, 0.2 * (1 - u), ...rays); if (kind === "tace") setAlpha(alpha, feeder, 0.1); movePart(pts, base, tum, [0, 0, 0], 1 - 0.45 * u); setAlpha(alpha, tum, 1 - 0.5 * u); setAlpha(alpha, art, 1);
    return { caption: kind === "tare" ? "4 · The tumour shrinks over weeks; healthy liver, fed mostly by the portal vein, carries on" : "4 · Starved and poisoned, the tumour shrinks; repeatable, and a bridge to transplant" };
  });
}
// 11. radioembolisation (TARE / SIRT)
export const radioembolisation = () => liverCatheterScene("tare");
// 19. TACE
export const tace = () => liverCatheterScene("tace");

// ---------------------------------------------------------------- 12. NGS-based MRD (clonoSEQ)
export function ngsMrd(): Mesh {
  const sc = scene();
  const DX: Vec3 = [-2.4, 0.4, 0], POST: Vec3 = [0.2, 0.4, 0];
  put(sc, "dxRing", ring(0.9, 18, "soft", "z"), { at: DX });
  const dxCells = put(sc, "dxCells", cloud(16, 0.7, "hot", 2), { at: DX });
  const code = empty(); for (let i = 0; i < 8; i++) add(code, line([-0.4 + 0.1 * i, -0.15, 0], [-0.4 + 0.1 * i, i % 3 ? 0.15 : 0.25, 0], "hot"));
  const barcode = put(sc, "barcode", code, { at: [DX[0], -1.1, 0] });
  put(sc, "postRing", ring(0.9, 18, "soft", "z"), { at: POST });
  const normal = put(sc, "normal", cloud(28, 0.75, "soft", 5), { at: POST });
  const one = put(sc, "one", dots([[POST[0] + 0.25, POST[1] - 0.2, 0.05]], "hot"));
  const seq = put(sc, "seq", box(1.0, 0.7, 0.6), { at: [2.2, 0.4, 0] });
  const reads: Part[] = []; for (let i = 0; i < 6; i++) reads.push(put(sc, `r${i}`, line([1.75, 0.65 - 0.1 * i, 0.32], [2.65 - (i % 2) * 0.2, 0.65 - 0.1 * i, 0.32], i === 3 ? "hot" : "accent")));
  const meter = put(sc, "meter", polyline([[1.6, -0.9, 0], [2.8, -0.9, 0]], "soft"));
  const needle = put(sc, "needle", dots([[1.65, -0.9, 0.02]], "hot"));
  sc.mesh.labels = [L([DX[0], 1.5, 0], "At diagnosis: the cancer clone"), L([DX[0], -1.5, 0], "Its unique DNA fingerprint"), L([POST[0], 1.5, 0], "After treatment: marrow looks clear"), L([2.2, -1.3, 0], "One cell in a million")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, ...reads, needle); setAlpha(alpha, one, 0); setAlpha(alpha, meter, 0.3);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, dxCells, pulse(t, 3)); grow(alpha, barcode, u); setAlpha(alpha, normal, 0.2); setAlpha(alpha, seq, 0.3); return { caption: "1 · At diagnosis, the cancer's cells all share one rearranged receptor gene: a fingerprint is recorded" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, dxCells, 0.3); setAlpha(alpha, normal, 0.2 + 0.8 * u); setAlpha(alpha, one, u > 0.6 ? 0.5 : 0); setAlpha(alpha, seq, 0.3); return { caption: "2 · After treatment the marrow looks normal under the microscope, but a few cancer cells may hide" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, dxCells, 0.3); setAlpha(alpha, one, 0.5); setAlpha(alpha, seq, 1); cascade(alpha, reads, u); return { caption: "3 · Deep sequencing reads millions of receptor genes from the sample and searches for the fingerprint" }; }
    const u = Q(t, 3); setAlpha(alpha, dxCells, 0.3); setAlpha(alpha, seq, 1); show(alpha, 1, ...reads); setAlpha(alpha, one, pulse(t, 6)); setAlpha(alpha, meter, 1); setAlpha(alpha, needle, 1); moveTo(pts, base, needle, [1.65, -0.9, 0.02], [1.75, -0.9, 0.02], u);
    return { caption: "4 · Sensitive to one cancer cell in a million: MRD-negative predicts long remission, MRD-positive prompts action" };
  });
}

// ---------------------------------------------------------------- 13. GLP-1 agonists and cancer risk
export function glp1CancerRisk(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [-1.2, 0, 0];
  put(sc, "body", figure(), { at: PAT });
  const fat = put(sc, "fat", ellipsoid(0.55, 0.4, 0.3, 3, 10, "soft"), { at: [PAT[0], 0.15, 0.05] });
  const organs: Part[] = ["colon", "liver", "womb", "breast"].map((n, i) => put(sc, n, small(0.16), { at: [1.2 + 0.6 * i, 0.9 - 0.5 * (i % 2), 0] }));
  const sig: Part[] = []; for (let i = 0; i < 6; i++) sig.push(put(sc, `s${i}`, octahedron(0.05, "hot"), { at: [PAT[0] + 0.5, 0.15, 0.05] }));
  const pen = put(sc, "pen", cylinder(0.08, 0.7, 8, 2, "accent"), { at: [-2.6, 0.3, 0], rotZ: 0.4 });
  const brainSig = put(sc, "brainSig", ring(0.24, 10, "accent", "z"), { at: [PAT[0], 0.78, 0.05] });
  const barHi = put(sc, "barHi", bar(2.0, 1.0, 0.3, "hot"), { at: [0, -1.4, 0] }); const barLo = put(sc, "barLo", bar(2.5, 0.65, 0.3, "accent"), { at: [0, -1.4, 0] });
  sc.mesh.labels = [L([PAT[0], 1.35, 0], "Excess fat tissue"), L([2.1, 1.4, 0], "Organs at risk: colon, liver, womb, breast"), L([-2.6, 0.9, 0], "GLP-1 injection"), L([2.25, -1.7, 0], "Observed risk, before vs after")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, brainSig, barHi, barLo); setAlpha(alpha, pen, 0.2);
    const s = stageOf(t);
    const emit = (u: number, fade = 1) => sig.forEach((p, i) => { const v = (u * 1.5 + i * 0.17) % 1; const target: Vec3 = [1.2 + 0.6 * (i % 4), 0.9 - 0.5 * (i % 2), 0]; moveTo(pts, base, p, [PAT[0] + 0.5, 0.15, 0.05], target, v); setAlpha(alpha, p, fade * (v < 0.9 ? 1 : 0)); });
    if (s === 0) { emit(Q(t, 0)); show(alpha, 0.6 + 0.4 * pulse(t, 3), ...organs); return { caption: "1 · Fat tissue pumps out insulin-raising, inflammatory and hormonal signals that push several cancers" }; }
    if (s === 1) { const u = Q(t, 1); emit(1, 1 - 0.5 * u); setAlpha(alpha, pen, 0.2 + 0.8 * u); moveTo(pts, base, pen, [-2.6, 0.3, 0], [PAT[0] - 0.55, 0.15, 0], u); setAlpha(alpha, brainSig, u); movePart(pts, base, brainSig, [0, 0, 0], 1 + 0.3 * pulse(t, 4)); return { caption: "2 · A weekly GLP-1 injection (semaglutide, tirzepatide) tells the brain and gut: full, slow down" }; }
    if (s === 2) { const u = Q(t, 2); emit(1, 0.5 - 0.4 * u); moveTo(pts, base, pen, [-2.6, 0.3, 0], [PAT[0] - 0.55, 0.15, 0], 1); movePart(pts, base, fat, [0, 0, 0], 1 - 0.45 * u); setAlpha(alpha, brainSig, 0.5); show(alpha, 0.5, ...organs); return { caption: "3 · Weight falls 15-20 %; insulin, inflammation and oestrogen from fat all drop with it" }; }
    const u = Q(t, 3); emit(1, 0.1); moveTo(pts, base, pen, [-2.6, 0.3, 0], [PAT[0] - 0.55, 0.15, 0], 1); movePart(pts, base, fat, [0, 0, 0], 0.55); show(alpha, 0.4, ...organs); setAlpha(alpha, barHi, u); setAlpha(alpha, barLo, u); movePart(pts, base, barLo, [0, -0.35 * (1 - u), 0], 1);
    return { caption: "4 · Large cohorts see fewer obesity-linked cancers in users; trials must confirm it is cause, not chance" };
  });
}

// ---------------------------------------------------------------- 14. nutrition screening and medical nutrition therapy
export function nutritionScreening(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [-2.3, 0, 0], DIET: Vec3 = [0.2, 0, 0];
  put(sc, "patient", figure(), { at: PAT });
  const scale = put(sc, "scale", box(0.7, 0.1, 0.5, "soft"), { at: [PAT[0], -0.9, 0] });
  const form = put(sc, "form", doc(0.6, 0.8, 4), { at: [-1.2, 0.6, 0] });
  const flag = put(sc, "flag", small(0.09, "hot"), { at: [-0.85, 0.85, 0.02] });
  const diet = put(sc, "diet", figure("accent"), { at: DIET });
  const plate = put(sc, "plate", ring(0.4, 16, undefined, "z"), { at: [1.8, 0.7, 0] });
  const portions = put(sc, "portions", polyline([[1.8, 0.7, 0], [1.8, 1.1, 0], [1.8, 0.7, 0], [2.15, 0.5, 0], [1.8, 0.7, 0], [1.45, 0.5, 0]], "soft"));
  const supp = put(sc, "supp", cylinder(0.12, 0.45, 8, 2, "accent"), { at: [2.6, 0.0, 0] });
  const tubeF = put(sc, "tube", polyline([[PAT[0] + 0.05, 0.75, 0.1], [PAT[0] + 0.3, 0.9, 0.1], [PAT[0] + 0.4, 0.3, 0.1], [PAT[0] + 0.05, 0.2, 0.1]], "accent"));
  const wt = put(sc, "wt", polyline([[1.3, -1.0, 0], [1.7, -1.15, 0], [2.1, -1.2, 0], [2.5, -1.15, 0], [2.9, -1.05, 0]], "accent"));
  const wtAx = put(sc, "wtAx", polyline([[1.3, -0.6, 0], [1.3, -1.4, 0], [3.0, -1.4, 0]], "soft"));
  sc.mesh.labels = [L([PAT[0], 1.35, 0], "Weight and appetite screen"), L([DIET[0], 1.35, 0], "Dietitian"), L([2.2, 1.35, 0], "Plan: food first, then supplements or a tube"), L([2.15, -1.7, 0], "Weight held")];
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, flag, plate, portions, supp, tubeF, wt); setAlpha(alpha, wtAx, 0.2); setAlpha(alpha, diet, 0.2);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); grow(alpha, form, u); setAlpha(alpha, scale, 0.6 + 0.4 * pulse(t, 3)); return { caption: "1 · At every visit a quick screen: weight lost? eating less? A score flags who is at risk" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, flag, pulse(t, 5)); setAlpha(alpha, diet, 0.2 + 0.8 * u); return { caption: "2 · A flagged patient sees a dietitian, who works out needs, symptoms and what is getting in the way" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, flag, 0.5); setAlpha(alpha, diet, 1); cascade(alpha, [plate, portions, supp, tubeF], u); return { caption: "3 · A tailored plan: protein-rich food first, then oral supplements, then tube or vein feeding if needed" }; }
    const u = Q(t, 3); setAlpha(alpha, flag, 0.3); setAlpha(alpha, diet, 1); show(alpha, 1, plate, portions, supp); setAlpha(alpha, tubeF, 0.5); setAlpha(alpha, wtAx, 0.8); grow(alpha, wt, u);
    return { caption: "4 · Weight and muscle held: fewer interrupted treatments, fewer complications, better quality of life" };
  });
}

// ---------------------------------------------------------------- 15. dietitian-led weight loss in HR+ breast cancer
export function weightLossBreast(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [-1.4, 0, 0];
  put(sc, "body", figure(), { at: PAT });
  const fat = put(sc, "fat", ellipsoid(0.5, 0.35, 0.3, 3, 10, "soft"), { at: [PAT[0], 0.1, 0.05] });
  const tum = put(sc, "tum", small(0.12, "hot"), { at: [PAT[0] - 0.2, 0.5, 0.15] });
  const est: Part[] = []; for (let i = 0; i < 5; i++) est.push(put(sc, `e${i}`, octahedron(0.05, "hot"), { at: [PAT[0] + 0.3, 0.1, 0.1] }));
  const diet = put(sc, "diet", figure("accent"), { at: [0.6, 0, 0] });
  const plate = put(sc, "plate", ring(0.3, 14, "accent", "z"), { at: [1.7, 0.9, 0] });
  const steps = put(sc, "steps", polyline([[1.4, 0.1, 0], [1.6, 0.25, 0], [1.8, 0.1, 0], [2.0, 0.25, 0], [2.2, 0.1, 0]], "accent"));
  const barA = put(sc, "barA", bar(2.1, 0.9, 0.3, "soft"), { at: [0, -1.4, 0] }); const barB = put(sc, "barB", bar(2.6, 0.6, 0.3, "accent"), { at: [0, -1.4, 0] });
  sc.mesh.labels = [L([PAT[0], 1.35, 0], "Fat tissue makes oestrogen"), L([PAT[0] - 0.8, 0.7, 0], "Hormone-fed tumour"), L([1.8, 1.35, 0], "Diet, activity, coaching"), L([2.35, -1.7, 0], "Recurrences: the trial question")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, plate, steps, barA, barB); setAlpha(alpha, diet, 0.15);
    const s = stageOf(t);
    const feed = (u: number, a: number) => est.forEach((p, i) => { const v = (u * 1.4 + i * 0.2) % 1; moveTo(pts, base, p, [PAT[0] + 0.3, 0.1, 0.1], [PAT[0] - 0.2, 0.5, 0.15], v); setAlpha(alpha, p, a); });
    if (s === 0) { feed(Q(t, 0), 1); setAlpha(alpha, tum, pulse(t, 4)); return { caption: "1 · After menopause, fat tissue is the main oestrogen source, and that oestrogen feeds HR-positive cancer" }; }
    if (s === 1) { const u = Q(t, 1); feed(1, 1); setAlpha(alpha, diet, 0.15 + 0.85 * u); cascade(alpha, [plate, steps], u); return { caption: "2 · A dietitian-led programme: calorie targets, more walking, regular phone coaching for two years" }; }
    if (s === 2) { const u = Q(t, 2); feed(1, 1 - 0.8 * u); setAlpha(alpha, diet, 1); show(alpha, 1, plate, steps); movePart(pts, base, fat, [0, 0, 0], 1 - 0.4 * u); setAlpha(alpha, tum, 0.6); return { caption: "3 · Losing 5-10 % of body weight lowers oestrogen, insulin and inflammation" }; }
    const u = Q(t, 3); feed(1, 0.2); setAlpha(alpha, diet, 1); show(alpha, 1, plate, steps); movePart(pts, base, fat, [0, 0, 0], 0.6); setAlpha(alpha, barA, u); setAlpha(alpha, barB, u);
    return { caption: "4 · The BWEL trial asks whether that translates into fewer recurrences; results are awaited" };
  });
}

// ---------------------------------------------------------------- 16. dietary fibre, gut microbiome and immunotherapy
export function fibreMicrobiomeIo(): Mesh {
  const sc = scene();
  const GUT: Vec3 = [-1.0, -0.6, 0];
  put(sc, "gut", tube(0.45, 3.0, "soft"), { at: GUT });
  const food: Part[] = []; for (let i = 0; i < 5; i++) food.push(put(sc, `f${i}`, octahedron(0.08, "accent"), { at: [GUT[0] - 1.7, GUT[1] + 0.15 - 0.08 * i, 0] }));
  const microbes = put(sc, "microbes", cloud(22, 1.1, undefined, 7), { at: GUT });
  const scfa: Part[] = []; for (let i = 0; i < 6; i++) scfa.push(put(sc, `a${i}`, dots([[0, 0, 0]], "accent"), { at: [GUT[0] - 1.0 + 0.4 * i, GUT[1] + 0.45, 0] }));
  const T: Vec3 = [1.0, 1.0, 0], TUM: Vec3 = [2.5, 1.0, 0];
  const tcell = put(sc, "tcell", cell(0.35, "accent"), { at: T });
  const ab = put(sc, "ab", antibody(0.25, undefined), { at: [T[0] + 0.45, T[1] + 0.1, 0], rotZ: -Math.PI / 2 });
  const tum = put(sc, "tum", cell(0.5, "hot"), { at: TUM });
  sc.mesh.labels = [L([GUT[0] - 1.9, GUT[1] + 0.8, 0], "Fibre: vegetables, grains, beans"), L([GUT[0], GUT[1] - 0.9, 0], "Gut microbes"), L([T[0], T[1] + 0.7, 0], "T cell + checkpoint drug"), L([TUM[0], TUM[1] + 0.85, 0], "Tumour")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, ...scfa); setAlpha(alpha, microbes, 0.35); setAlpha(alpha, ab, 0.3);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); food.forEach((f, i) => moveTo(pts, base, f, [GUT[0] - 1.7, GUT[1] + 0.15 - 0.08 * i, 0], [GUT[0] - 0.6 + 0.35 * i, GUT[1] + 0.1 - 0.08 * i, 0], clamp(u * 1.3 - i * 0.07), 1, u * 3)); setAlpha(alpha, tcell, 0.4); return { caption: "1 · Fibre the body cannot digest reaches the large bowel intact" }; }
    if (s === 1) { const u = Q(t, 1); food.forEach((f, i) => { moveTo(pts, base, f, [GUT[0] - 1.7, GUT[1] + 0.15 - 0.08 * i, 0], [GUT[0] - 0.6 + 0.35 * i, GUT[1] + 0.1 - 0.08 * i, 0], 1); setAlpha(alpha, f, 1 - 0.8 * u); }); setAlpha(alpha, microbes, 0.35 + 0.65 * u); movePart(pts, base, microbes, [0, 0, 0], 1 + 0.15 * u); scfa.forEach((p, i) => { const v = clamp(u * 1.5 - i * 0.1); setAlpha(alpha, p, v); moveTo(pts, base, p, [GUT[0] - 1.0 + 0.4 * i, GUT[1] + 0.45, 0], [GUT[0] - 1.0 + 0.4 * i, GUT[1] + 1.0, 0], v); }); setAlpha(alpha, tcell, 0.4); return { caption: "2 · Fibre-loving bacteria (Ruminococcaceae, Faecalibacterium) thrive and release short-chain fatty acids" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.2, ...food); setAlpha(alpha, microbes, 1); movePart(pts, base, microbes, [0, 0, 0], 1.15); scfa.forEach((p, i) => moveTo(pts, base, p, [GUT[0] - 1.0 + 0.4 * i, GUT[1] + 0.45, 0], [T[0] - 0.3 + 0.1 * i, T[1] - 0.3, 0], u)); show(alpha, 1 - 0.7 * u, ...scfa); setAlpha(alpha, tcell, 0.4 + 0.6 * u); movePart(pts, base, tcell, [0, 0, 0], 1 + 0.3 * u, u * 2); setAlpha(alpha, ab, 0.3 + 0.7 * u); return { caption: "3 · Those signals, and the microbes themselves, prime T cells so the checkpoint drug has something to release" }; }
    const u = Q(t, 3); show(alpha, 0.2, ...food); setAlpha(alpha, microbes, 1); movePart(pts, base, microbes, [0, 0, 0], 1.15); show(alpha, 0.3, ...scfa); setAlpha(alpha, ab, 1); moveTo(pts, base, tcell, T, [TUM[0] - 0.75, TUM[1], 0], u, 1.3, 2); moveTo(pts, base, ab, [T[0] + 0.45, T[1] + 0.1, 0], [TUM[0] - 0.3, TUM[1] + 0.1, 0], u); movePart(pts, base, tum, [0, 0, 0], 1 - 0.4 * u); setAlpha(alpha, tum, 1 - 0.5 * u);
    return { caption: "4 · Patients eating over 20 g of fibre a day respond to immunotherapy more often; probiotic pills did not help" };
  });
}

// ---------------------------------------------------------------- 17. aspirin for prevention
export function aspirinPrevention(): Mesh {
  const sc = scene();
  const wall = empty(); for (let i = 0; i < 7; i++) add(wall, line([-2.4 + 0.8 * i, -0.8, 0], [-2.4 + 0.8 * i, -0.4, 0], "soft")); add(wall, line([-2.4, -0.8, 0], [2.4, -0.8, 0], "soft")); add(wall, line([-2.4, -0.4, 0], [2.4, -0.4, 0], "soft"));
  put(sc, "wall", wall);
  const polyp = put(sc, "polyp", small(0.15, "hot"), { at: [0.8, -0.3, 0] });
  const cox = put(sc, "cox", ring(0.3, 12, undefined, "z"), { at: [-1.2, 0.3, 0] });
  const pg: Part[] = []; for (let i = 0; i < 5; i++) pg.push(put(sc, `pg${i}`, octahedron(0.05, "hot"), { at: [-1.2, 0.3, 0] }));
  const platelets: Part[] = []; for (let i = 0; i < 4; i++) platelets.push(put(sc, `pl${i}`, ring(0.08, 8, "soft", "y"), { at: [-2.0 + 0.5 * i, 1.2, 0.2] }));
  const asp = put(sc, "asp", ring(0.14, 6, "accent", "z"), { at: [-1.2, 1.6, 0] });
  const vessel = put(sc, "vessel", tube(0.12, 1.2, "soft"), { at: [2.0, 1.0, 0] });
  const bleed: Part[] = []; for (let i = 0; i < 4; i++) bleed.push(put(sc, `bl${i}`, dots([[0, 0, 0]], "hot"), { at: [1.7 + 0.2 * i, 0.85, 0.05] }));
  sc.mesh.labels = [L([0, -1.15, 0], "Bowel lining"), L([-1.2, 0.8, 0], "COX enzyme → prostaglandins"), L([-1.2, 1.95, 0], "Aspirin"), L([2.0, 1.45, 0], "Bleeding risk: the trade-off")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, ...bleed); setAlpha(alpha, vessel, 0.3); setAlpha(alpha, asp, 0);
    const s = stageOf(t);
    const emit = (u: number, a: number) => pg.forEach((p, i) => { const v = (u * 1.3 + i * 0.2) % 1; moveTo(pts, base, p, [-1.2, 0.3, 0], [0.8 - 0.1 * i, -0.2, 0.1], v); setAlpha(alpha, p, a); });
    if (s === 0) { const u = Q(t, 0); emit(u, 1); setAlpha(alpha, cox, pulse(t, 4)); movePart(pts, base, polyp, [0, 0, 0], 1 + 0.4 * u); platelets.forEach((p, i) => movePart(pts, base, p, [0.3 * Math.sin(t * TAU * 2 + i), 0, 0])); return { caption: "1 · Inflamed bowel lining makes COX enzymes; their prostaglandins and sticky platelets drive polyps to grow" }; }
    if (s === 1) { const u = Q(t, 1); emit(1, 1 - 0.8 * u); setAlpha(alpha, asp, 1); moveTo(pts, base, asp, [-1.2, 1.6, 0], [-1.2, 0.3, 0], u, 1, u * 3); setAlpha(alpha, cox, 1 - 0.5 * u); movePart(pts, base, polyp, [0, 0, 0], 1.4); platelets.forEach((p, i) => movePart(pts, base, p, [0.3 * Math.sin(t * TAU * 2 + i) * (1 - u), 0, 0])); return { caption: "2 · A low daily dose of aspirin blocks COX permanently in platelets and dampens it in the lining" }; }
    if (s === 2) { const u = Q(t, 2); emit(1, 0.2); setAlpha(alpha, asp, 1); moveTo(pts, base, asp, [-1.2, 1.6, 0], [-1.2, 0.3, 0], 1); setAlpha(alpha, cox, 0.5); movePart(pts, base, polyp, [0, 0, 0], 1.4 - 0.7 * u); setAlpha(alpha, polyp, 1 - 0.4 * u); show(alpha, 0.4, ...platelets); return { caption: "3 · Over years, fewer polyps and fewer bowel cancers, clearest in people with Lynch syndrome" }; }
    const u = Q(t, 3); emit(1, 0.2); setAlpha(alpha, asp, 1); moveTo(pts, base, asp, [-1.2, 1.6, 0], [-1.2, 0.3, 0], 1); setAlpha(alpha, cox, 0.5); movePart(pts, base, polyp, [0, 0, 0], 0.7); setAlpha(alpha, polyp, 0.6); show(alpha, 0.4, ...platelets); setAlpha(alpha, vessel, 1); bleed.forEach((b, i) => { const v = clamp(u * 1.5 - i * 0.15); setAlpha(alpha, b, v); moveTo(pts, base, b, [1.7 + 0.2 * i, 0.85, 0.05], [1.7 + 0.2 * i, 0.4 - 0.1 * i, 0.05], v); });
    return { caption: "4 · The same platelet effect raises bleeding risk, so who benefits depends on age and genetics" };
  });
}

// ---------------------------------------------------------------- 18. endoscopic resection (EMR / ESD)
export function endoscopicResection(): Mesh {
  const sc = scene();
  const layer = (y: number, cls?: string) => { const m = empty(); for (let i = 0; i <= 4; i++) add(m, line([-1.8, y, -0.6 + 0.3 * i], [1.8, y, -0.6 + 0.3 * i], cls)); add(m, line([-1.8, y, -0.6], [-1.8, y, 0.6], cls)); add(m, line([1.8, y, -0.6], [1.8, y, 0.6], cls)); return m; };
  put(sc, "mucosa", layer(0.0)); put(sc, "sub", layer(-0.35, "soft")); put(sc, "muscle", layer(-0.7));
  const LES: Vec3 = [0.3, 0.1, 0];
  const lesion = put(sc, "lesion", ellipsoid(0.5, 0.12, 0.35, 3, 10, "hot"), { at: LES });
  const cushion = put(sc, "cushion", ellipsoid(0.7, 0.2, 0.5, 2, 10, "accent"), { at: [LES[0], -0.15, 0] });
  const scopePts: Vec3[] = []; for (let i = 0; i <= 6; i++) scopePts.push([-2.6, 1.6, 0]);
  const scope = put(sc, "scope", polyline(scopePts, "accent"));
  const needle = put(sc, "needle", line([LES[0] - 0.9, 0.9, 0], [LES[0] - 0.5, 0.05, 0], "accent"));
  const cut = put(sc, "cut", ring(0.65, 20, "accent", "y"), { at: [LES[0], 0.02, 0] });
  const board = put(sc, "board", box(1.0, 0.05, 0.7, "soft"), { at: [2.6, 1.2, 0] });
  const pins = put(sc, "pins", dots([[2.15, 1.25, -0.3], [3.05, 1.25, -0.3], [2.15, 1.25, 0.3], [3.05, 1.25, 0.3]], "accent"));
  sc.mesh.labels = [L([-2.2, 0.0, 0], "Lining"), L([-2.2, -0.7, 0], "Muscle wall, kept intact"), L([LES[0], 0.6, 0], "Early tumour"), L([2.6, 1.7, 0], "Whole specimen, pinned for the pathologist")];
  const base = sc.mesh.points;
  const route: Vec3[] = [[-2.6, 1.6, 0], [-1.6, 1.3, 0], [-0.8, 0.9, 0], [LES[0] - 0.6, 0.45, 0]];
  const along = (u: number): Vec3 => { const n = route.length - 1, f = clamp(u) * n, i = Math.min(n - 1, Math.floor(f)); return lerp3(route[i], route[i + 1], f - i); };
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, cushion, needle, cut, board, pins);
    const s = stageOf(t);
    const scopeAt = (u: number) => { for (let k = 0; k <= 6; k++) pts[scope.p0 + k] = along(u - (k * u) / 6); };
    if (s === 0) { scopeAt(Q(t, 0)); setAlpha(alpha, lesion, pulse(t, 4)); return { caption: "1 · An endoscope finds a flat early cancer confined to the lining of the gut" }; }
    if (s === 1) { const u = Q(t, 1); scopeAt(1); setAlpha(alpha, needle, u < 0.7 ? 1 : 0); setAlpha(alpha, cushion, u); movePart(pts, base, cushion, [0, 0, 0], 0.3 + 0.7 * u); movePart(pts, base, lesion, [0, 0.25 * u, 0]); return { caption: "2 · Fluid injected beneath lifts the lesion off the muscle layer, like a cushion" }; }
    if (s === 2) { const u = Q(t, 2); scopeAt(1); setAlpha(alpha, cushion, 1); movePart(pts, base, lesion, [0, 0.25, 0]); grow(alpha, cut, u); movePart(pts, base, cut, [0, 0.1, 0]); return { caption: "3 · A snare or electric knife cuts around and under it, through the lifted plane, in one piece" }; }
    const u = Q(t, 3); scopeAt(1 - 0.5 * u); setAlpha(alpha, cushion, 1 - u); setAlpha(alpha, cut, 1 - u); moveTo(pts, base, lesion, LES, [2.6, 1.32, 0], u, 1, u); setAlpha(alpha, board, u); setAlpha(alpha, pins, u);
    return { caption: "4 · The specimen is pinned out and checked for clear margins; the organ stays, no surgery needed" };
  });
}

// ---------------------------------------------------------------- 20. structured exercise after treatment
export function structuredExercise(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [-1.6, 0, 0];
  put(sc, "torso", figure(), { at: PAT });
  const legL = put(sc, "legL", polyline([[-0.18, 0, 0], [-0.2, -0.8, 0]]), { at: PAT }); const legR = put(sc, "legR", polyline([[0.18, 0, 0], [0.2, -0.8, 0]]), { at: PAT });
  const trainer = put(sc, "trainer", figure("accent"), { at: [-0.2, 0, 0] });
  const heart = put(sc, "heart", small(0.14, "hot"), { at: [PAT[0] - 0.1, 0.4, 0.15] });
  const muscle = put(sc, "muscle", ellipsoid(0.16, 0.35, 0.16, 3, 8, "accent"), { at: [PAT[0] - 0.5, -0.4, 0] });
  const inflam: Part[] = []; for (let i = 0; i < 5; i++) inflam.push(put(sc, `in${i}`, dots([[0, 0, 0]], "hot"), { at: [PAT[0] + 0.5 * Math.cos(i * 1.3), 0.3 + 0.4 * Math.sin(i * 1.3), 0.1] }));
  const cal = put(sc, "cal", ticks(-0.9, 1.1, 1.6, 6, "soft"));
  const ax = put(sc, "ax", polyline([[1.6, 1.0, 0], [1.6, -1.0, 0], [3.4, -1.0, 0]], "soft"));
  const ctrl = put(sc, "ctrl", polyline([[1.6, 0.9, 0], [2.0, 0.6, 0], [2.5, 0.1, 0], [3.0, -0.3, 0], [3.4, -0.6, 0]], "soft"));
  const exer = put(sc, "exer", polyline([[1.6, 0.9, 0], [2.0, 0.75, 0], [2.5, 0.45, 0], [3.0, 0.2, 0], [3.4, 0.0, 0]], "accent"));
  sc.mesh.labels = [L([PAT[0], 1.35, 0], "After treatment"), L([-0.2, 1.35, 0], "Coach"), L([0.1, 1.95, 0], "Three years of sessions"), L([2.5, -1.35, 0], "Disease-free survival (CHALLENGE trial)")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, ctrl, exer); setAlpha(alpha, ax, 0.2); setAlpha(alpha, cal, 0.2); setAlpha(alpha, trainer, 0.15);
    const s = stageOf(t);
    const walk = (amp: number) => { const sw = Math.sin(t * TAU * 6) * amp; movePart(pts, base, legL, [sw * 0.25, 0, 0]); movePart(pts, base, legR, [-sw * 0.25, 0, 0]); };
    if (s === 0) { walk(0); setAlpha(alpha, heart, 0.4); setAlpha(alpha, muscle, 0.3); show(alpha, pulse(t, 3), ...inflam); return { caption: "1 · After chemotherapy: tired, deconditioned, with lingering inflammation and insulin resistance" }; }
    if (s === 1) { const u = Q(t, 1); walk(u); setAlpha(alpha, trainer, 0.15 + 0.85 * u); setAlpha(alpha, cal, 0.2 + 0.8 * u); setAlpha(alpha, heart, 0.4 + 0.3 * u); setAlpha(alpha, muscle, 0.3 + 0.3 * u); show(alpha, 1 - 0.5 * u, ...inflam); return { caption: "2 · A structured programme: a coach, weekly sessions, a target of brisk walking most days" }; }
    if (s === 2) { const u = Q(t, 2); walk(1); setAlpha(alpha, trainer, 1); setAlpha(alpha, cal, 1); setAlpha(alpha, heart, 0.7 + 0.3 * pulse(t, 8)); movePart(pts, base, muscle, [0, 0, 0], 1 + 0.4 * u); setAlpha(alpha, muscle, 1); show(alpha, 0.5 - 0.45 * u, ...inflam); return { caption: "3 · Fitness rises, muscle rebuilds, inflammatory and growth signals fall" }; }
    const u = Q(t, 3); walk(1); setAlpha(alpha, trainer, 1); setAlpha(alpha, cal, 1); setAlpha(alpha, heart, 1); movePart(pts, base, muscle, [0, 0, 0], 1.4); show(alpha, 0.05, ...inflam); setAlpha(alpha, ax, 0.8); grow(alpha, ctrl, u); grow(alpha, exer, u);
    return { caption: "4 · In colon cancer, fewer recurrences and deaths over eight years: exercise as a prescription" };
  });
}

// ---------------------------------------------------------------- 21. Mediterranean and plant-forward diet
export function mediterraneanDiet(): Mesh {
  const sc = scene();
  const PL: Vec3 = [-1.8, 0.4, 0];
  put(sc, "plate", ring(0.9, 22, undefined, "z"), { at: PL });
  const veg: Part[] = []; for (let i = 0; i < 6; i++) veg.push(put(sc, `v${i}`, small(0.1, "accent"), { at: [PL[0] - 0.35 + 0.3 * Math.cos(i * 1.05), PL[1] + 0.3 * Math.sin(i * 1.05), 0.05] }));
  const grain = put(sc, "grain", dots([[PL[0] + 0.45, PL[1] + 0.3, 0.05], [PL[0] + 0.55, PL[1] + 0.15, 0.05], [PL[0] + 0.4, PL[1] + 0.1, 0.05]], "accent"));
  const oil = put(sc, "oil", cylinder(0.08, 0.5, 8, 2, "accent"), { at: [PL[0] + 1.2, PL[1] + 0.5, 0] });
  const fish = put(sc, "fish", polyline([[PL[0] + 0.25, PL[1] - 0.4, 0.05], [PL[0] + 0.6, PL[1] - 0.25, 0.05], [PL[0] + 0.25, PL[1] - 0.1, 0.05], [PL[0] + 0.25, PL[1] - 0.4, 0.05]], "accent"));
  const meat = put(sc, "meat", box(0.35, 0.15, 0.3, "hot"), { at: [PL[0] - 0.4, PL[1] - 0.4, 0.05] });
  const GUT: Vec3 = [1.0, -0.9, 0];
  put(sc, "gut", tube(0.35, 2.4, "soft"), { at: GUT });
  const microbes = put(sc, "microbes", cloud(18, 0.9, undefined, 9), { at: GUT });
  const inflam: Part[] = []; for (let i = 0; i < 5; i++) inflam.push(put(sc, `in${i}`, dots([[0, 0, 0]], "hot"), { at: [1.0 + 0.5 * Math.cos(i * 1.3), 0.8 + 0.3 * Math.sin(i * 1.3), 0] }));
  const bars: Part[] = [["colon", 0.9], ["breast", 0.7], ["liver", 0.6]].map(([n, h], i) => put(sc, `bar${n}`, bar(2.1 + 0.5 * i, h as number, 0.28, "soft"), { at: [0, -0.2, 0] }));
  const barsLo: Part[] = [0.65, 0.55, 0.45].map((h, i) => put(sc, `lo${i}`, bar(2.1 + 0.5 * i, h, 0.28, "accent"), { at: [0, -0.2, 0] }));
  sc.mesh.labels = [L([PL[0], 1.55, 0], "Vegetables, pulses, grains, olive oil, fish; little red meat"), L([GUT[0], GUT[1] - 0.75, 0], "Gut microbes"), L([1.0, 1.3, 0], "Inflammation"), L([2.6, 1.05, 0], "Risk: colon, breast, liver")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, ...inflam, ...bars, ...barsLo); setAlpha(alpha, microbes, 0.3);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, [...veg, grain, oil, fish], u); setAlpha(alpha, meat, 1 - 0.7 * u); movePart(pts, base, meat, [0, 0, 0], 1 - 0.5 * u); return { caption: "1 · Mostly plants: vegetables, pulses, whole grains, nuts, olive oil, fish; red and processed meat rarely" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, meat, 0.3); movePart(pts, base, meat, [0, 0, 0], 0.5); veg.forEach((v, i) => moveTo(pts, base, v, [PL[0] - 0.35 + 0.3 * Math.cos(i * 1.05), PL[1] + 0.3 * Math.sin(i * 1.05), 0.05], [GUT[0] - 0.9 + 0.3 * i, GUT[1], 0], clamp(u * 1.4 - i * 0.08), 0.6)); setAlpha(alpha, microbes, 0.3 + 0.7 * u); movePart(pts, base, microbes, [0, 0, 0], 1 + 0.15 * u); return { caption: "2 · Fibre and polyphenols feed a diverse gut flora; less processed meat means fewer carcinogens" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, meat, 0.3); movePart(pts, base, meat, [0, 0, 0], 0.5); show(alpha, 0.3, ...veg); veg.forEach((v, i) => moveTo(pts, base, v, [PL[0] - 0.35 + 0.3 * Math.cos(i * 1.05), PL[1] + 0.3 * Math.sin(i * 1.05), 0.05], [GUT[0] - 0.9 + 0.3 * i, GUT[1], 0], 1, 0.6)); setAlpha(alpha, microbes, 1); movePart(pts, base, microbes, [0, 0, 0], 1.15); show(alpha, 1 - u, ...inflam); return { caption: "3 · Body weight, insulin and inflammation settle; oxidative damage to DNA falls" }; }
    const u = Q(t, 3); setAlpha(alpha, meat, 0.3); movePart(pts, base, meat, [0, 0, 0], 0.5); show(alpha, 0.3, ...veg); veg.forEach((v, i) => moveTo(pts, base, v, [PL[0] - 0.35 + 0.3 * Math.cos(i * 1.05), PL[1] + 0.3 * Math.sin(i * 1.05), 0.05], [GUT[0] - 0.9 + 0.3 * i, GUT[1], 0], 1, 0.6)); setAlpha(alpha, microbes, 1); movePart(pts, base, microbes, [0, 0, 0], 1.15); show(alpha, 0.05, ...inflam); cascade(alpha, bars, u); cascade(alpha, barsLo, u);
    return { caption: "4 · Cohorts and one large trial (PREDIMED) show modestly lower rates of several cancers" };
  });
}

// ---------------------------------------------------------------- 22. liver transplantation for cancer
export function liverTransplant(): Mesh {
  const sc = scene();
  const OLD: Vec3 = [0.4, 0, 0], NEW0: Vec3 = [3.2, 1.3, 0];
  const oldLiver = put(sc, "old", ellipsoid(1.4, 0.85, 0.7, 4, 12, "soft"), { at: OLD });
  const NODS: Array<[number, number]> = [[-0.5, 0.2], [0.3, 0.35], [0.6, -0.25]];
  const nods: Part[] = NODS.map(([x, y], i) => put(sc, `n${i}`, small(0.14, "hot"), { at: [OLD[0] + x, OLD[1] + y, 0.1] }));
  const rulers: Part[] = NODS.map(([x, y], i) => put(sc, `ru${i}`, ring(0.28, 12, "accent", "z"), { at: [OLD[0] + x, OLD[1] + y, 0.12] }));
  const list = put(sc, "list", doc(0.7, 0.9, 3), { at: [-2.2, 0.6, 0] });
  const ticksP = put(sc, "ticks", dots([[-2.4, 0.78, 0.02], [-2.4, 0.55, 0.02], [-2.4, 0.32, 0.02]], "accent"));
  const clock = put(sc, "clock", ring(0.3, 12, "soft", "z"), { at: [-2.2, -0.9, 0] });
  const hand = put(sc, "hand", line([-2.2, -0.9, 0], [-2.2, -0.65, 0], "accent"));
  const probe = put(sc, "probe", line([OLD[0] + 1.0, 1.6, 0], [OLD[0] + 0.35, OLD[1] + 0.4, 0.1], "accent"));
  const newLiver = put(sc, "new", ellipsoid(1.4, 0.85, 0.7, 4, 12), { at: NEW0 });
  const vessels = put(sc, "vessels", polyline([[OLD[0] - 1.6, OLD[1] - 0.6, 0], [OLD[0] - 1.2, OLD[1] - 0.3, 0], [OLD[0] - 0.8, OLD[1] - 0.1, 0]], "hot"));
  const immuno: Part[] = []; for (let i = 0; i < 4; i++) immuno.push(put(sc, `im${i}`, octahedron(0.05, "accent"), { at: [OLD[0] - 0.9 + 0.6 * i, OLD[1] + 1.2, 0] }));
  sc.mesh.labels = [L([-2.2, 1.3, 0], "Milan criteria: ≤ 3 nodules, ≤ 3 cm each"), L([-2.2, -1.4, 0], "Waiting list"), L([OLD[0], -1.2, 0], "Diseased liver"), L([NEW0[0], NEW0[1] + 1.1, 0], "Donor liver")];
  const base = sc.mesh.points;
  return frame(sc, 14, (t, pts, alpha) => {
    hide(alpha, ...rulers, ticksP, probe, vessels, ...immuno); setAlpha(alpha, newLiver, 0); setAlpha(alpha, clock, 0.2); setAlpha(alpha, hand, 0.2); setAlpha(alpha, list, 0.3);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, list, 1); cascade(alpha, rulers, u); nods.forEach((n, i) => setAlpha(alpha, n, u * 3 > i ? pulse(t, 4) : 1)); setAlpha(alpha, ticksP, u > 0.8 ? 1 : 0); return { caption: "1 · Small liver cancers in a cirrhotic liver are counted and measured against the Milan criteria" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, list, 1); setAlpha(alpha, ticksP, 1); setAlpha(alpha, clock, 1); setAlpha(alpha, hand, 1); movePart(pts, base, hand, [0, 0, 0], 1, u * TAU * 1.5); setAlpha(alpha, probe, u < 0.8 ? pulse(t, 5) : 0); nods.forEach((n) => setAlpha(alpha, n, 1 - 0.5 * u)); return { caption: "2 · Months on the waiting list: ablation or embolisation holds the tumours steady meanwhile" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, ticksP, 1); moveTo(pts, base, oldLiver, OLD, [OLD[0] - 0.5, OLD[1] - 2.2, 0], u); setAlpha(alpha, oldLiver, 1 - u); nods.forEach((n, i) => { moveTo(pts, base, n, [OLD[0] + [-0.5, 0.3, 0.6][i], OLD[1] + [0.2, 0.35, -0.25][i], 0.1], [OLD[0] - 0.5 + [-0.5, 0.3, 0.6][i], OLD[1] - 2.2 + [0.2, 0.35, -0.25][i], 0.1], u); setAlpha(alpha, n, 0.5 * (1 - u)); }); setAlpha(alpha, newLiver, u); moveTo(pts, base, newLiver, NEW0, OLD, u); return { caption: "3 · The whole diseased liver comes out, cancer and cirrhosis together; a donor liver goes in" }; }
    const u = Q(t, 3); setAlpha(alpha, ticksP, 1); setAlpha(alpha, oldLiver, 0); hide(alpha, ...nods); setAlpha(alpha, newLiver, 1); moveTo(pts, base, newLiver, NEW0, OLD, 1); grow(alpha, vessels, u); immuno.forEach((p, i) => { const v = clamp(u * 1.5 - i * 0.15); setAlpha(alpha, p, v); moveTo(pts, base, p, [OLD[0] - 0.9 + 0.6 * i, OLD[1] + 1.2, 0], [OLD[0] - 0.6 + 0.4 * i, OLD[1] + 0.2, 0.2], v); });
    return { caption: "4 · Vessels and bile duct are joined; lifelong anti-rejection drugs, and about 70 % alive at five years" };
  });
}

// ---------------------------------------------------------------- 23. dietary supplements during treatment
export function supplementInteractions(): Mesh {
  const sc = scene();
  put(sc, "bottle", cylinder(0.3, 0.9, 10, 3), { at: [-2.4, 0.3, 0] });
  const supp: Part[] = []; for (let i = 0; i < 3; i++) supp.push(put(sc, `sp${i}`, octahedron(0.09, "hot"), { at: [-2.4, 0.9 + 0.2 * i, 0] }));
  const drug: Part[] = []; for (let i = 0; i < 5; i++) drug.push(put(sc, `dr${i}`, dots([[0, 0, 0]], "accent"), { at: [-1.6, -0.9 + 0.15 * i, 0] }));
  const LIV: Vec3 = [0.2, 0, 0];
  put(sc, "liver", ellipsoid(0.9, 0.6, 0.5, 3, 10, "soft"), { at: LIV });
  const enzyme = put(sc, "enzyme", torus(0.28, 0.07, 12, 5), { at: LIV, rotX: Math.PI / 2 });
  const level = put(sc, "level", polyline([[1.6, -0.2, 0], [2.2, -0.2, 0], [2.8, -0.2, 0], [3.4, -0.2, 0]], "accent"));
  const band = put(sc, "band", polyline([[1.6, 0.05, 0], [3.4, 0.05, 0], [3.4, -0.45, 0], [1.6, -0.45, 0]], "soft", true));
  const TUM: Vec3 = [2.5, 1.2, 0];
  const tum = put(sc, "tum", small(0.25, "hot"), { at: TUM });
  const shield = put(sc, "shield", ring(0.42, 14, "hot", "z"), { at: TUM });
  const ray = put(sc, "ray", line([1.4, 1.9, 0], [TUM[0] - 0.3, TUM[1] + 0.25, 0], "accent"));
  const list = put(sc, "list", doc(0.7, 0.9, 4), { at: [-0.6, -1.3, 0] });
  sc.mesh.labels = [L([-2.4, 1.6, 0], "Supplement (e.g. St John's wort, high-dose antioxidants)"), L([LIV[0], -0.95, 0], "Liver enzymes (CYP3A4)"), L([2.5, -0.8, 0], "Drug level: safe band"), L([TUM[0], TUM[1] + 0.8, 0], "Tumour shielded from radiation")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, shield, ray, list); setAlpha(alpha, tum, 0.3); setAlpha(alpha, band, 0.3);
    const s = stageOf(t);
    const flowDrug = (u: number, spd = 1) => drug.forEach((d, i) => { const v = (u * spd + i * 0.2) % 1; moveTo(pts, base, d, [-1.6, -0.9 + 0.15 * i, 0], [LIV[0] + 0.1, LIV[1], 0.1], v); });
    if (s === 0) { const u = Q(t, 0); flowDrug(u); setAlpha(alpha, enzyme, pulse(t, 3)); supp.forEach((p, i) => moveTo(pts, base, p, [-2.4, 0.9 + 0.2 * i, 0], [LIV[0] - 0.2, LIV[1] + 0.1, 0.1], clamp(u * 1.4 - i * 0.2), 1, u * 4)); return { caption: "1 · Cancer drugs and herbal supplements are broken down by the same liver enzymes" }; }
    if (s === 1) { const u = Q(t, 1); flowDrug(1, 1 + u); supp.forEach((p, i) => moveTo(pts, base, p, [-2.4, 0.9 + 0.2 * i, 0], [LIV[0] - 0.2, LIV[1] + 0.1, 0.1], 1, 1, 4)); movePart(pts, base, enzyme, [0, 0, 0], 1 + 0.3 * u, u * 6); setAlpha(alpha, enzyme, 1); setAlpha(alpha, band, 0.6); for (let k = 0; k < 4; k++) pts[level.p0 + k] = [1.6 + 0.6 * k, -0.2 - 0.5 * u * (k / 3), 0]; return { caption: "2 · St John's wort revs those enzymes up: the drug is cleared too fast and falls below its working level" }; }
    if (s === 2) { const u = Q(t, 2); flowDrug(1, 2); supp.forEach((p) => setAlpha(alpha, p, 0.3)); movePart(pts, base, enzyme, [0, 0, 0], 1.3, 6); for (let k = 0; k < 4; k++) pts[level.p0 + k] = [1.6 + 0.6 * k, -0.7 * (k / 3), 0]; setAlpha(alpha, level, 0.4); setAlpha(alpha, tum, 1); setAlpha(alpha, ray, 1); grow(alpha, ray, u); setAlpha(alpha, shield, u > 0.5 ? pulse(t, 5) : 0); return { caption: "3 · High-dose antioxidants can mop up the free radicals that radiation and some chemotherapy rely on" }; }
    const u = Q(t, 3); flowDrug(1, 2); supp.forEach((p) => setAlpha(alpha, p, 0.3)); movePart(pts, base, enzyme, [0, 0, 0], 1.3, 6); for (let k = 0; k < 4; k++) pts[level.p0 + k] = [1.6 + 0.6 * k, -0.7 * (k / 3), 0]; setAlpha(alpha, level, 0.4); setAlpha(alpha, tum, 0.6); setAlpha(alpha, shield, 0.4); setAlpha(alpha, ray, 0.4); grow(alpha, list, u);
    return { caption: "4 · So the rule is simple: list every supplement to the team, and pause the risky ones during treatment" };
  });
}

// ---------------------------------------------------------------- 24. cancer registries and surveillance
export function cancerRegistries(): Mesh {
  const sc = scene();
  const recs: Part[] = [];
  const SRC: Vec3[] = [[-2.7, 1.1, 0], [-2.7, 0.2, 0], [-2.7, -0.7, 0]];
  SRC.forEach((at, i) => { put(sc, `src${i}`, box(0.55, 0.45, 0.4, "soft"), { at }); recs.push(put(sc, `rec${i}`, dots([[0, 0, 0], [0.12, 0.1, 0], [-0.1, 0.12, 0]], "hot"), { at: [at[0] + 0.4, at[1], 0.2] })); });
  const REG: Vec3 = [-0.8, 0.2, 0];
  const reg = put(sc, "reg", cylinder(0.6, 1.1, 14, 4), { at: REG });
  const linkLine = put(sc, "link", line([REG[0], REG[1] - 0.55, 0], [REG[0], REG[1] - 1.3, 0], "soft"));
  const deaths = put(sc, "deaths", box(0.5, 0.3, 0.3, "soft"), { at: [REG[0], REG[1] - 1.5, 0] });
  const map = empty(); for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) add(map, polyline([[0, 0, 0], [0.3, 0, 0], [0.3, 0.3, 0], [0, 0.3, 0]], "soft", true), { at: [0.9 + 0.32 * c, 0.9 - 0.32 * r, 0] });
  const mapP = put(sc, "map", map);
  const hot = put(sc, "hot", dots([[1.37, 0.73, 0.02], [1.69, 0.41, 0.02], [2.33, 1.05, 0.02]], "hot"));
  const trend = put(sc, "trend", polyline([[0.9, -0.5, 0], [1.3, -0.55, 0], [1.7, -0.5, 0], [2.1, -0.65, 0], [2.5, -0.8, 0]], "accent"));
  const trendAx = put(sc, "trendAx", polyline([[0.9, -0.3, 0], [0.9, -0.9, 0], [2.6, -0.9, 0]], "soft"));
  const back = put(sc, "back", arrow([1.8, -1.15, 0], [-2.3, -1.3, 0], "accent"));
  sc.mesh.labels = [L([-2.7, 1.7, 0], "Hospitals, labs, death records"), L([REG[0], 1.1, 0], "Population registry"), L([1.7, 1.55, 0], "Incidence by area"), L([1.75, -1.6, 0], "Survival trends → policy")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, mapP, hot, trend, back); setAlpha(alpha, trendAx, 0.2); setAlpha(alpha, linkLine, 0.2); setAlpha(alpha, deaths, 0.2);
    const s = stageOf(t);
    const flow = (u: number) => recs.forEach((r, i) => { moveTo(pts, base, r, [SRC[i][0] + 0.4, SRC[i][1], 0.2], REG, clamp(u * 1.4 - i * 0.15)); setAlpha(alpha, r, 1 - 0.7 * clamp(u * 1.4 - i * 0.15)); });
    if (s === 0) { flow(Q(t, 0)); setAlpha(alpha, reg, 0.4 + 0.6 * Q(t, 0)); return { caption: "1 · Every new diagnosis is reported by law: pathology, hospitals and clinics feed a central registry" }; }
    if (s === 1) { const u = Q(t, 1); flow(1); setAlpha(alpha, linkLine, 0.2 + 0.8 * u); setAlpha(alpha, deaths, 0.2 + 0.8 * u); setAlpha(alpha, reg, 0.6 + 0.4 * pulse(t, 3)); return { caption: "2 · Records are coded to one standard, de-duplicated and linked to death certificates for follow-up" }; }
    if (s === 2) { const u = Q(t, 2); flow(1); setAlpha(alpha, linkLine, 1); setAlpha(alpha, deaths, 1); setAlpha(alpha, mapP, u); setAlpha(alpha, hot, u > 0.5 ? pulse(t, 5) : 0); setAlpha(alpha, trendAx, 0.2 + 0.6 * u); grow(alpha, trend, u); return { caption: "3 · Out come incidence maps, survival curves and trends: who gets what cancer, where, and how they fare" }; }
    const u = Q(t, 3); flow(1); setAlpha(alpha, linkLine, 1); setAlpha(alpha, deaths, 1); setAlpha(alpha, mapP, 1); setAlpha(alpha, hot, 1); setAlpha(alpha, trend, 1); setAlpha(alpha, trendAx, 0.8); grow(alpha, back, u);
    return { caption: "4 · Screening programmes, prevention policy and research targets are set on these numbers" };
  });
}

// ---------------------------------------------------------------- 25. intravesical therapy (BCG)
export function intravesicalBcg(): Mesh {
  const sc = scene();
  const BL: Vec3 = [0.4, 0.4, 0];
  const bladder = put(sc, "bladder", sphere(1.2, 6, 12, undefined), { at: BL });
  const tumours: Part[] = [[0.0, 1.0], [0.8, 0.5], [-0.9, 0.3]].map(([x, y], i) => put(sc, `t${i}`, small(0.12, "hot"), { at: [BL[0] + x, BL[1] + y, 0.4] }));
  const loop = put(sc, "loop", ring(0.2, 10, "accent", "z"), { at: [BL[0], BL[1] + 1.0, 0.4] });
  const cathPts: Vec3[] = []; for (let i = 0; i <= 5; i++) cathPts.push([BL[0] - 0.3, BL[1] - 2.4, 0]);
  const cath = put(sc, "cath", polyline(cathPts, "accent"));
  const bcg: Part[] = []; for (let i = 0; i < 12; i++) bcg.push(put(sc, `b${i}`, dots([[0, 0, 0]], "accent"), { at: [BL[0] - 0.3, BL[1] - 1.1, 0] }));
  const immune: Part[] = []; for (let i = 0; i < 4; i++) immune.push(put(sc, `im${i}`, small(0.1), { at: [BL[0] + 1.9, BL[1] - 0.6 + 0.3 * i, 0.2] }));
  const weeks = put(sc, "weeks", ticks(-2.6, -0.6, -1.6, 6, "soft"));
  sc.mesh.labels = [L([BL[0], BL[1] + 1.6, 0], "Bladder, seen from inside"), L([BL[0] - 0.3, BL[1] - 2.7, 0], "Catheter"), L([BL[0] + 2.4, BL[1] + 0.2, 0], "Immune cells"), L([-1.6, -1.95, 0], "Weekly for six weeks, then maintenance")];
  const base = sc.mesh.points;
  const route: Vec3[] = [[BL[0] - 0.3, BL[1] - 2.4, 0], [BL[0] - 0.3, BL[1] - 1.6, 0], [BL[0] - 0.3, BL[1] - 1.1, 0]];
  const along = (u: number): Vec3 => { const n = route.length - 1, f = clamp(u) * n, i = Math.min(n - 1, Math.floor(f)); return lerp3(route[i], route[i + 1], f - i); };
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...bcg, ...immune, loop); setAlpha(alpha, weeks, 0.2); setAlpha(alpha, bladder, 0.7);
    const s = stageOf(t);
    const cathAt = (u: number) => { for (let k = 0; k <= 5; k++) pts[cath.p0 + k] = along(u - (k * u) / 5); };
    const spread = (u: number, a = 1) => bcg.forEach((b, i) => { const ang = i * 0.52, r = 1.05 * clamp(u); moveTo(pts, base, b, [BL[0] - 0.3, BL[1] - 1.1, 0], [BL[0] + r * Math.cos(ang), BL[1] + r * Math.sin(ang), 0.3 * Math.sin(i)], clamp(u)); setAlpha(alpha, b, a); });
    if (s === 0) { const u = Q(t, 0); cathAt(0); setAlpha(alpha, loop, u < 0.7 ? 1 : 0); moveTo(pts, base, tumours[0], [BL[0], BL[1] + 1.0, 0.4], [BL[0] + 0.3, BL[1] + 2.0, 0.6], phase(u, 0.4, 1)); setAlpha(alpha, tumours[0], 1 - phase(u, 0.4, 1)); tumours.slice(1).forEach((p) => setAlpha(alpha, p, pulse(t, 4))); return { caption: "1 · Visible bladder tumours are shaved off through the urethra, but microscopic disease usually remains" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, tumours[0], 0); tumours.slice(1).forEach((p) => setAlpha(alpha, p, 0.6)); cathAt(u); spread(phase(u, 0.6, 1)); return { caption: "2 · Weeks later, BCG (a weakened tuberculosis vaccine bacterium) is instilled through a catheter" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, tumours[0], 0); cathAt(1); spread(1); immune.forEach((p, i) => { const v = clamp(u * 1.5 - i * 0.15); setAlpha(alpha, p, v); moveTo(pts, base, p, [BL[0] + 1.9, BL[1] - 0.6 + 0.3 * i, 0.2], [BL[0] + 0.9 * Math.cos(1.2 + i), BL[1] + 0.9 * Math.sin(1.2 + i), 0.35], v); }); tumours.slice(1).forEach((p) => { setAlpha(alpha, p, 0.6 * (1 - u) + 0.3 * pulse(t, 6) * (1 - u)); movePart(pts, base, p, [0, 0, 0], 1 - 0.7 * u); }); return { caption: "3 · Held for two hours, the bacteria stick to the lining; the immune response they provoke kills the cancer cells" }; }
    const u = Q(t, 3); setAlpha(alpha, tumours[0], 0); hide(alpha, ...tumours); cathAt(1 - u); setAlpha(alpha, cath, 1 - u); spread(1, 1 - u); immune.forEach((p, i) => { setAlpha(alpha, p, 0.5); moveTo(pts, base, p, [BL[0] + 1.9, BL[1] - 0.6 + 0.3 * i, 0.2], [BL[0] + 0.9 * Math.cos(1.2 + i), BL[1] + 0.9 * Math.sin(1.2 + i), 0.35], 1); }); setAlpha(alpha, weeks, 0.2 + 0.8 * u);
    return { caption: "4 · Repeated weekly, then as maintenance; when BCG fails, gene therapy or drug-releasing devices go in the same way" };
  });
}

// ---------------------------------------------------------------- 26. radioiodine therapy
export function radioiodine(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [-1.4, 0, 0];
  put(sc, "body", figure("soft"), { at: PAT });
  const THY: Vec3 = [PAT[0], 0.5, 0.15];
  const remnant = put(sc, "remnant", small(0.1, "hot"), { at: THY });
  const met = put(sc, "met", small(0.09, "hot"), { at: [PAT[0] + 0.25, 0.15, 0.15] });
  const pumps: Part[] = [remnant, met].map((_, i) => put(sc, `pump${i}`, ring(0.18, 10, "accent", "z"), { at: i === 0 ? THY : [PAT[0] + 0.25, 0.15, 0.16] }));
  const tsh: Part[] = []; for (let i = 0; i < 4; i++) tsh.push(put(sc, `tsh${i}`, dots([[0, 0, 0]], "accent"), { at: [PAT[0], 0.85, 0.2] }));
  const capsule = put(sc, "capsule", cylinder(0.08, 0.28, 8, 2, "hot"), { at: [PAT[0] - 0.9, 1.5, 0], rotZ: 0.5 });
  const rays: Part[] = []; for (let i = 0; i < 5; i++) { const a = (TAU * i) / 5; rays.push(put(sc, `ray${i}`, line([0, 0, 0], [0.25 * Math.cos(a), 0.25 * Math.sin(a), 0], "hot"), { at: THY })); }
  const plate = empty(); for (let i = 0; i <= 4; i++) { add(plate, line([-0.6, -1.0 + 0.5 * i, 0], [0.6, -1.0 + 0.5 * i, 0], "soft")); add(plate, line([-0.6 + 0.3 * i, -1.0, 0], [-0.6 + 0.3 * i, 1.0, 0], "soft")); }
  const scan = put(sc, "scan", plate, { at: [1.9, 0, 0] });
  const spots = put(sc, "spots", dots([[1.9, 0.5, 0.02], [2.15, 0.15, 0.02]], "hot"));
  sc.mesh.labels = [L([PAT[0], 1.35, 0], "Thyroid remnant after surgery"), L([PAT[0] + 0.9, 0.15, 0], "Distant deposit"), L([PAT[0] - 0.9, 1.85, 0], "I-131 capsule"), L([1.9, -1.35, 0], "Whole-body scan: where the iodine went")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...rays, spots); setAlpha(alpha, scan, 0.15); show(alpha, 0, ...pumps);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); tsh.forEach((p, i) => { const v = (u * 1.4 + i * 0.25) % 1; moveTo(pts, base, p, [PAT[0], 0.85, 0.2], i % 2 ? THY : [PAT[0] + 0.25, 0.15, 0.15], v); setAlpha(alpha, p, u > 0 ? 1 : 0); }); show(alpha, u, ...pumps); setAlpha(alpha, capsule, 0.3); return { caption: "1 · Thyroid cells, even cancerous ones, pump in iodine; raising TSH switches those pumps to full" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 0.5, ...tsh); show(alpha, 1, ...pumps); setAlpha(alpha, capsule, 1); moveTo(pts, base, capsule, [PAT[0] - 0.9, 1.5, 0], [PAT[0], 0.0, 0.1], u, 1 - 0.6 * u, u * 4); return { caption: "2 · A capsule of radioactive iodine-131 is swallowed; it enters the blood like ordinary iodine" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.2, ...tsh); show(alpha, 1, ...pumps); setAlpha(alpha, capsule, 1 - u); moveTo(pts, base, capsule, [PAT[0] - 0.9, 1.5, 0], [PAT[0], 0.0, 0.1], 1, 0.4, 4); rays.forEach((r, i) => { grow(alpha, r, clamp(u * 1.3 - i * 0.1)); movePart(pts, base, r, [0, 0, 0], 0.6 + 0.6 * pulse(t + i * 0.1, 3)); }); setAlpha(alpha, remnant, pulse(t, 6)); setAlpha(alpha, met, pulse(t, 6)); return { caption: "3 · Only iodine-hungry cells concentrate it: beta particles destroy remnant and deposits from within" }; }
    const u = Q(t, 3); show(alpha, 0.2, ...tsh); show(alpha, 0.5, ...pumps); setAlpha(alpha, capsule, 0); show(alpha, 0.2, ...rays); movePart(pts, base, remnant, [0, 0, 0], 1 - 0.5 * u); movePart(pts, base, met, [0, 0, 0], 1 - 0.5 * u); setAlpha(alpha, scan, 0.15 + 0.85 * u); setAlpha(alpha, spots, u > 0.4 ? pulse(t, 5) : 0);
    return { caption: "4 · Its gamma rays also light up a whole-body scan, showing exactly where the iodine, and the cancer, went" };
  });
}

// ---------------------------------------------------------------- 27. early integrated palliative care
export function palliativeCare(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [0, 0, 0];
  put(sc, "patient", figure(), { at: PAT });
  const symptoms: Part[] = [[0.1, 0.3], [-0.25, 0.1], [0.3, -0.4], [0, 0.78]].map(([x, y], i) => put(sc, `sym${i}`, small(0.09, "hot"), { at: [PAT[0] + x, PAT[1] + y, 0.2 + 0.02 * i] }));
  const onc = put(sc, "onc", figure("soft"), { at: [-2.2, 0, 0] });
  const oncArrow = put(sc, "oncArrow", arrow([-1.7, 0.3, 0], [-0.5, 0.3, 0], "soft"));
  const pal = put(sc, "pal", figure("accent"), { at: [2.2, 0, 0] });
  const palArrow = put(sc, "palArrow", arrow([1.7, 0.3, 0], [0.5, 0.3, 0], "accent"));
  const bubble = put(sc, "bubble", ring(0.35, 14, "accent", "z"), { at: [1.3, 1.4, 0] });
  const ax = put(sc, "ax", polyline([[-1.0, -1.3, 0], [-1.0, -2.3, 0], [1.6, -2.3, 0]], "soft"));
  const qolUsual = put(sc, "qolUsual", polyline([[-1.0, -1.6, 0], [-0.3, -1.75, 0], [0.4, -1.95, 0], [1.4, -2.1, 0]], "soft"));
  const qolEarly = put(sc, "qolEarly", polyline([[-1.0, -1.6, 0], [-0.3, -1.55, 0], [0.4, -1.5, 0], [1.4, -1.55, 0]], "accent"));
  sc.mesh.labels = [L([PAT[0], 1.35, 0], "Pain, breathlessness, worry"), L([-2.2, 1.35, 0], "Cancer team"), L([2.2, 1.35, 0], "Palliative team, from the start"), L([0.3, -2.6, 0], "Quality of life over time")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, bubble, qolUsual, qolEarly); setAlpha(alpha, ax, 0.2); setAlpha(alpha, pal, 0.15); setAlpha(alpha, palArrow, 0);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, symptoms, u); symptoms.forEach((p, i) => { if (u * 4 > i) setAlpha(alpha, p, pulse(t + i * 0.1, 4)); }); setAlpha(alpha, oncArrow, 1); return { caption: "1 · Advanced cancer brings symptoms, worry and hard decisions, alongside the treatment itself" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 1, ...symptoms); setAlpha(alpha, pal, 0.15 + 0.85 * u); grow(alpha, palArrow, u); setAlpha(alpha, onc, 1); setAlpha(alpha, oncArrow, 1); return { caption: "2 · A palliative team joins within weeks of diagnosis, working alongside the oncologists, not instead of them" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 1 - 0.8 * u, ...symptoms); setAlpha(alpha, pal, 1); setAlpha(alpha, palArrow, 1); setAlpha(alpha, bubble, u); movePart(pts, base, bubble, [0, 0, 0], 0.6 + 0.4 * pulse(t, 3)); return { caption: "3 · Symptoms treated properly; honest conversations about what matters and what to expect" }; }
    const u = Q(t, 3); show(alpha, 0.2, ...symptoms); setAlpha(alpha, pal, 1); setAlpha(alpha, palArrow, 1); setAlpha(alpha, bubble, 0.5); setAlpha(alpha, ax, 0.8); grow(alpha, qolUsual, u); grow(alpha, qolEarly, u);
    return { caption: "4 · Better quality of life, less depression, less futile chemotherapy at the end, and in some trials longer survival" };
  });
}

// ---------------------------------------------------------------- 28. metabolic therapy
export function metabolicTherapy(): Mesh {
  const sc = scene();
  const VES: Vec3 = [-1.6, 1.0, 0], CELL: Vec3 = [0.8, -0.2, 0], NORM: Vec3 = [2.9, -0.5, 0.3];
  put(sc, "vessel", tube(0.3, 3.6, "soft"), { at: VES });
  const tum = put(sc, "tum", cell(0.8, "hot"), { at: CELL });
  const nuc = put(sc, "nuc", sphere(0.26, 3, 8, "soft"), { at: [CELL[0] + 0.15, CELL[1], 0] });
  const norm = put(sc, "norm", cell(0.5, "soft"), { at: NORM });
  const inner = put(sc, "inner", dots([[NORM[0] - 0.1, NORM[1] + 0.1, 0.1], [NORM[0] + 0.15, NORM[1] - 0.1, 0.1]], "accent"));
  const port = put(sc, "port", line([CELL[0] - 0.85, CELL[1] + 0.3, 0], [CELL[0] - 0.55, CELL[1] + 0.3, 0]));
  const nut: Part[] = []; for (let i = 0; i < 7; i++) nut.push(put(sc, `n${i}`, octahedron(0.06, "accent"), { at: [VES[0] - 1.6 + 0.5 * i, VES[1], 0] }));
  const fuel = put(sc, "fuel", cloud(8, 0.5, "accent", 4), { at: CELL });
  const enzyme = put(sc, "enzyme", ring(0.22, 8, "hot", "z"), { at: [VES[0] + 0.4, VES[1] + 0.9, 0] });
  const blocker = put(sc, "blocker", small(0.1, "hot"), { at: [CELL[0] - 1.4, CELL[1] + 0.3, 0] });
  sc.mesh.labels = [L([VES[0], VES[1] + 0.6, 0], "Blood nutrient (e.g. glutamine, asparagine, methionine)"), L([CELL[0], CELL[1] - 1.15, 0], "Tumour cell: cannot make its own"), L([NORM[0], NORM[1] - 0.85, 0], "Normal cell: can"), L([VES[0] + 0.4, VES[1] + 1.3, 0], "Nutrient-destroying enzyme or transporter blocker")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, enzyme, blocker);
    const s = stageOf(t);
    const flow = (u: number, a: number, intoCell = true) => nut.forEach((p, i) => { const v = (u * 1.2 + i * 0.14) % 1; const from: Vec3 = [VES[0] - 1.6 + 0.5 * i, VES[1], 0]; const to: Vec3 = intoCell ? [CELL[0] - 0.4 + 0.15 * (i % 3), CELL[1] + 0.3 - 0.2 * (i % 2), 0] : [VES[0] + 1.6, VES[1], 0]; moveTo(pts, base, p, from, to, v); setAlpha(alpha, p, a); });
    if (s === 0) { flow(Q(t, 0), 1); setAlpha(alpha, port, pulse(t, 4)); setAlpha(alpha, fuel, 0.5 + 0.5 * pulse(t, 3)); return { caption: "1 · Some tumours are addicted to one nutrient from the blood, pulled in through a transporter" }; }
    if (s === 1) { const u = Q(t, 1); flow(1, 1 - 0.7 * u, false); setAlpha(alpha, enzyme, 1); moveTo(pts, base, enzyme, [VES[0] + 0.4, VES[1] + 0.9, 0], [VES[0] + 0.4, VES[1], 0], u, 1, u * 4); setAlpha(alpha, blocker, u); moveTo(pts, base, blocker, [CELL[0] - 1.4, CELL[1] + 0.3, 0], [CELL[0] - 0.95, CELL[1] + 0.3, 0], u); return { caption: "2 · An enzyme destroys the nutrient in the blood (asparaginase), or a drug plugs the transporter" }; }
    if (s === 2) { const u = Q(t, 2); flow(1, 0.2, false); setAlpha(alpha, enzyme, 1); moveTo(pts, base, enzyme, [VES[0] + 0.4, VES[1] + 0.9, 0], [VES[0] + 0.4, VES[1], 0], 1, 1, 4); setAlpha(alpha, blocker, 1); moveTo(pts, base, blocker, [CELL[0] - 1.4, CELL[1] + 0.3, 0], [CELL[0] - 0.95, CELL[1] + 0.3, 0], 1); setAlpha(alpha, fuel, 0.8 * (1 - u)); movePart(pts, base, tum, [0, 0, 0], 1 - 0.3 * u); movePart(pts, base, nuc, [0, 0, 0], 1 - 0.3 * u); return { caption: "3 · Starved of the fuel it cannot make, the tumour cell stalls and dies" }; }
    const u = Q(t, 3); flow(1, 0.2, false); setAlpha(alpha, enzyme, 1); moveTo(pts, base, enzyme, [VES[0] + 0.4, VES[1] + 0.9, 0], [VES[0] + 0.4, VES[1], 0], 1, 1, 4); setAlpha(alpha, blocker, 1); moveTo(pts, base, blocker, [CELL[0] - 1.4, CELL[1] + 0.3, 0], [CELL[0] - 0.95, CELL[1] + 0.3, 0], 1); setAlpha(alpha, fuel, 0); movePart(pts, base, tum, [0, 0, 0], 0.7); movePart(pts, base, nuc, [0, 0, 0], 0.7); setAlpha(alpha, tum, 0.5); setAlpha(alpha, norm, 1); setAlpha(alpha, inner, 0.6 + 0.4 * pulse(t, 4)); movePart(pts, base, norm, [0, 0, 0], 1 + 0.05 * u);
    return { caption: "4 · Normal cells make their own and carry on: a proven idea in leukaemia, now being tested in solid tumours" };
  });
}

// ---------------------------------------------------------------- 29. ERAS and perioperative nutrition
export function erasNutrition(): Mesh {
  const sc = scene();
  const tl = put(sc, "tl", ticks(-2.8, 2.8, -1.5, 4, "soft"));
  const PAT: Vec3 = [-2.2, 0, 0];
  put(sc, "pat", figure(), { at: PAT });
  const drink = put(sc, "drink", cylinder(0.12, 0.4, 8, 2, "accent"), { at: [PAT[0] + 0.6, 0.5, 0] });
  const noFast = put(sc, "noFast", ring(0.25, 12, "soft", "z"), { at: [PAT[0] - 0.8, 0.9, 0] });
  const cross = put(sc, "cross", polyline([[PAT[0] - 1.0, 0.7, 0], [PAT[0] - 0.6, 1.1, 0]], "hot"));
  const table = put(sc, "table", box(1.4, 0.08, 0.6, "soft"), { at: [-0.3, -0.3, 0] });
  const lying = put(sc, "lying", figure(), { at: [-0.3, -0.05, 0], rotZ: -Math.PI / 2, scale: 0.75 });
  const scalpel = put(sc, "scalpel", polyline([[0, 0, 0], [0.3, 0.3, 0], [0.4, 0.28, 0]], "accent"), { at: [-0.3, 0.1, 0.1] });
  const drain = put(sc, "drain", polyline([[-0.1, -0.2, 0.2], [0.3, -0.7, 0.3], [0.6, -0.9, 0.3]], "hot"));
  const walker = put(sc, "walker", figure("accent"), { at: [1.5, 0, 0] });
  const legL = put(sc, "legL", polyline([[-0.18, 0, 0], [-0.2, -0.8, 0]], "accent"), { at: [1.5, 0, 0] }); const legR = put(sc, "legR", polyline([[0.18, 0, 0], [0.2, -0.8, 0]], "accent"), { at: [1.5, 0, 0] });
  const plate = put(sc, "plate", ring(0.25, 12, "accent", "z"), { at: [2.2, 0.6, 0] });
  const barOld = put(sc, "barOld", bar(2.6, 1.0, 0.25, "soft"), { at: [0, -1.4, 0] }); const barNew = put(sc, "barNew", bar(3.0, 0.55, 0.25, "accent"), { at: [0, -1.4, 0] });
  sc.mesh.labels = [L([PAT[0], 1.5, 0], "Before: carbohydrate drink, no long fast"), L([-0.3, 0.9, 0], "Surgery: fewer tubes, warm, well hydrated"), L([1.8, 1.4, 0], "After: eat and walk the same day"), L([2.8, -1.75, 0], "Days in hospital: old vs ERAS")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, scalpel, drain, plate, barOld, barNew); setAlpha(alpha, tl, 0.3); show(alpha, 0.15, table, lying, walker, legL, legR);
    const s = stageOf(t);
    const walk = (amp: number) => { const sw = Math.sin(t * TAU * 6) * amp; movePart(pts, base, legL, [sw * 0.25, 0, 0]); movePart(pts, base, legR, [-sw * 0.25, 0, 0]); };
    if (s === 0) { const u = Q(t, 0); walk(0); moveTo(pts, base, drink, [PAT[0] + 0.6, 0.5, 0], [PAT[0] + 0.15, 0.75, 0.1], u, 1 - 0.4 * u); setAlpha(alpha, noFast, 1); grow(alpha, cross, u); return { caption: "1 · No starving from midnight: a clear carbohydrate drink two hours before, and any malnutrition treated first" }; }
    if (s === 1) { const u = Q(t, 1); walk(0); setAlpha(alpha, drink, 0.3); show(alpha, 1, table, lying); setAlpha(alpha, scalpel, u < 0.7 ? 1 : 0); movePart(pts, base, scalpel, [0.4 * u, 0, 0]); setAlpha(alpha, drain, 0.6 * (1 - u)); return { caption: "2 · In theatre: keyhole where possible, careful fluids and warmth, few drains, minimal opioids" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, drink, 0.3); show(alpha, 0.4, table, lying); show(alpha, 1, walker, legL, legR); walk(u); setAlpha(alpha, plate, u); return { caption: "3 · Eating and walking within hours, not days; the gut restarts faster and muscle is preserved" }; }
    const u = Q(t, 3); setAlpha(alpha, drink, 0.3); show(alpha, 0.4, table, lying); show(alpha, 1, walker, legL, legR); walk(1); setAlpha(alpha, plate, 1); setAlpha(alpha, barOld, u); setAlpha(alpha, barNew, u); setAlpha(alpha, tl, 1);
    return { caption: "4 · Fewer complications and two to three fewer days in hospital, with chemotherapy started on time" };
  });
}

// ---------------------------------------------------------------- 30. faecal microbiota transplantation for PD-1 non-responders
export function fmtCheckpoint(): Mesh {
  const sc = scene();
  const DON: Vec3 = [-2.4, 1.0, 0], PAT: Vec3 = [-0.4, -0.9, 0];
  put(sc, "donGut", tube(0.35, 1.8, "soft"), { at: DON });
  const donFlora = put(sc, "donFlora", cloud(16, 0.7, "accent", 3), { at: DON });
  put(sc, "patGut", tube(0.35, 1.8, "soft"), { at: PAT });
  const patFlora = put(sc, "patFlora", cloud(6, 0.7, "hot", 8), { at: PAT });
  const newFlora = put(sc, "newFlora", cloud(16, 0.7, "accent", 5), { at: PAT });
  const caps = put(sc, "caps", cylinder(0.12, 0.35, 8, 2, "accent"), { at: [-1.4, 0.05, 0], rotZ: 0.6 });
  const T: Vec3 = [1.4, 0.9, 0], TUM: Vec3 = [2.7, 0.9, 0];
  const tcell = put(sc, "tcell", cell(0.32, "accent"), { at: T });
  const ab = put(sc, "ab", antibody(0.22), { at: [T[0] + 0.42, T[1] + 0.05, 0], rotZ: -Math.PI / 2 });
  const tum = put(sc, "tum", cell(0.55, "hot"), { at: TUM });
  sc.mesh.labels = [L([DON[0], DON[1] + 0.75, 0], "Donor who responded to immunotherapy"), L([PAT[0], PAT[1] - 0.75, 0], "Patient's gut, sparse microbes"), L([T[0], T[1] + 0.75, 0], "T cell + PD-1 antibody, asleep"), L([TUM[0], TUM[1] + 0.9, 0], "Tumour")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, newFlora, caps); setAlpha(alpha, donFlora, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, tcell, 0.35); setAlpha(alpha, ab, 0.5); setAlpha(alpha, patFlora, 0.6 + 0.4 * pulse(t, 3)); movePart(pts, base, tum, [0, 0, 0], 1 + 0.15 * u); return { caption: "1 · Despite a PD-1 drug, this patient's T cells stay quiet and the melanoma keeps growing" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, tcell, 0.35); setAlpha(alpha, ab, 0.5); movePart(pts, base, tum, [0, 0, 0], 1.15); setAlpha(alpha, donFlora, 1); setAlpha(alpha, caps, 1); moveTo(pts, base, donFlora, DON, [-1.4, 0.05, 0], u, 1 - 0.6 * u); return { caption: "2 · Stool from a donor who responded is screened, processed and given by capsule or colonoscopy" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, tcell, 0.35 + 0.3 * u); setAlpha(alpha, ab, 0.5 + 0.5 * u); movePart(pts, base, tum, [0, 0, 0], 1.15); moveTo(pts, base, donFlora, DON, [-1.4, 0.05, 0], 1, 0.4); setAlpha(alpha, donFlora, 1 - u); setAlpha(alpha, caps, 1 - u); moveTo(pts, base, caps, [-1.4, 0.05, 0], PAT, u); setAlpha(alpha, patFlora, 1 - 0.7 * u); setAlpha(alpha, newFlora, u); return { caption: "3 · The donor's microbial community takes hold in the patient's gut" }; }
    const u = Q(t, 3); setAlpha(alpha, donFlora, 0); setAlpha(alpha, patFlora, 0.3); setAlpha(alpha, newFlora, 1); setAlpha(alpha, ab, 1); moveTo(pts, base, tcell, T, [TUM[0] - 0.85, TUM[1], 0], u, 1 + 0.4 * u, u * 2); moveTo(pts, base, ab, [T[0] + 0.42, T[1] + 0.05, 0], [TUM[0] - 0.4, TUM[1] + 0.05, 0], u); movePart(pts, base, tum, [0, 0, 0], 1.15 - 0.55 * u); setAlpha(alpha, tum, 1 - 0.5 * u);
    return { caption: "4 · With the PD-1 drug continued, T cells wake and the tumour shrinks in a third of patients in small trials" };
  });
}

export const WAVE3: Record<string, () => Mesh> = {
  "allogeneic-hsct": allogeneicHsct,
  "autologous-stem-cell-transplant": autologousTransplant,
  "global-oncology-access": globalAccess,
  "active-surveillance": activeSurveillance,
  "cachexia-appetite-pharmacotherapy": cachexiaDrugs,
  "survivorship-care-plan": survivorshipPlan,
  "hpv-testing": hpvTesting,
  prrt,
  "oncology-real-world-data": realWorldData,
  "colorectal-screening": colorectalScreening,
  "radioembolisation-tare": radioembolisation,
  "ngs-mrd-clonoseq": ngsMrd,
  "glp1-agonists-cancer-risk": glp1CancerRisk,
  "nutrition-screening-mnt": nutritionScreening,
  "dietitian-led-weight-loss-breast": weightLossBreast,
  "dietary-fibre-microbiome-io": fibreMicrobiomeIo,
  "aspirin-cancer-prevention": aspirinPrevention,
  "endoscopic-resection": endoscopicResection,
  tace,
  "structured-exercise-survivorship": structuredExercise,
  "mediterranean-plant-forward-diet": mediterraneanDiet,
  "liver-transplant-oncology": liverTransplant,
  "dietary-supplements-treatment-interactions": supplementInteractions,
  "cancer-registries-surveillance": cancerRegistries,
  "bcg-and-intravesical-therapy": intravesicalBcg,
  "radioiodine-therapy": radioiodine,
  "palliative-care": palliativeCare,
  "metabolic-therapy": metabolicTherapy,
  "eras-perioperative-nutrition": erasNutrition,
  "fmt-checkpoint-nonresponders": fmtCheckpoint,
};

/**
 * Wave 5 of animated technology schematics: forty more well-connected technologies that until now fell back to a
 * generic front placeholder (diagnostic assays such as thyroid FNA, MSI/MMR, ctHPV-DNA and lymphoma ctDNA; prevention
 * and diet evidence such as alcohol, red meat, soy, vitamin D; supportive care such as prehabilitation, ePRO, exercise
 * during chemotherapy, palliative radiotherapy; and the manufacturing and trial infrastructure behind cell therapy,
 * radiopharmaceuticals and trials). Same conventions as ./animated-wave4.ts: a scene of named parts around one focal
 * object with a filled body, one to three animated actors, four captioned phases on a 12-14 s loop, three or four plain
 * labels, every mesh under 500 points. Numbers in captions come from the technology record only. The viewer blends the
 * last 14 % of the cycle back to frame 0, so each scene simply ends in its final state.
 *
 * Self-contained (imports only the wireframe primitives) so that ./animated.ts can spread WAVE5 into its registry without
 * an import cycle.
 */
import { add, antibody, arrow, box, cone, cylinder, disc, dots, ellipsoid, empty, helix, lerp3, line, movePart, octahedron, part, phase, polyline, ring, setAlpha, sphere, syringe, type Mesh, type Part, type Vec3 } from "@/lib/wireframe";

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
/** Scatter of n dots inside a flattened blob of radius r (cells in a tissue, particles, a cohort). */
function cloud(n: number, r: number, cls?: string, seed = 1): Mesh {
  const pts: Vec3[] = [];
  for (let i = 0; i < n; i++) { const a = (TAU * i * 0.618 * seed) % TAU, rr = r * (0.3 + 0.7 * (((i * 7 + seed) % 11) / 11)); pts.push([rr * Math.cos(a), rr * Math.sin(a) * 0.7, 0.3 * r * Math.sin(i * 1.7)]); }
  return dots(pts, cls);
}
/** Horizontal gut/vessel tube along x, centred at origin, with a translucent wall. */
const tube = (r: number, len: number, cls?: string) => { const m = cylinder(r, len, 12, 3, cls, false, true); m.points = m.points.map((p) => [p[1], p[0], p[2]] as Vec3); return m; };
/** Dumbbell along x: a bar with two weights. */
function dumbbell(s = 1, cls?: string): Mesh {
  const m = line([-0.5 * s, 0, 0], [0.5 * s, 0, 0], cls);
  add(m, sphere(0.14 * s, 3, 8, cls, true), { at: [-0.5 * s, 0, 0] }); add(m, sphere(0.14 * s, 3, 8, cls, true), { at: [0.5 * s, 0, 0] });
  return m;
}
/** Simple L-shaped chart axes with origin at `o`, width w and height h. */
const axes = (o: Vec3, w: number, h: number, cls = "soft") => polyline([[o[0], o[1] + h, 0], [o[0], o[1], 0], [o[0] + w, o[1], 0]], cls);
/** Two crossed strokes over a point (an X: advised against, ruled out). */
const cross = (c: Vec3, s = 0.25, cls = "hot") => { const m = line([c[0] - s, c[1] - s, c[2]], [c[0] + s, c[1] + s, c[2]], cls); add(m, line([c[0] - s, c[1] + s, c[2]], [c[0] + s, c[1] - s, c[2]], cls)); return m; };
/** Upright vial: a capped, filled cylinder. */
const vial = (r: number, h: number, cls?: string) => cylinder(r, h, 8, 2, cls, true, true);
function frame(sc: Scene, duration: number, fn: (t: number, pts: Vec3[], alpha: number[]) => { caption: string; labels?: Lbl[] }): Mesh {
  sc.mesh.animate = { duration, frame: (t) => { const pts = sc.mesh.points.map((p) => [p[0], p[1], p[2]] as Vec3); const alpha = sc.mesh.segments.map(() => 1); const r = fn(t, pts, alpha); return { points: pts, alpha, caption: r.caption, labels: r.labels ?? sc.mesh.labels }; } };
  return sc.mesh;
}
const L = (at: Vec3, text: string): Lbl => ({ at, text });

// ---------------------------------------------------------------- 1. thyroid nodule FNA, Bethesda cytology and molecular classifiers
export function thyroidFnaMolecular(): Mesh {
  const sc = scene();
  const THY: Vec3 = [-1.8, 0, 0];
  put(sc, "lobeL", organ(0.42, 0.7, 0.3), { at: [THY[0] - 0.5, THY[1], 0] });
  put(sc, "lobeR", organ(0.42, 0.7, 0.3), { at: [THY[0] + 0.5, THY[1], 0] });
  put(sc, "isthmus", box(0.5, 0.2, 0.2, "soft", true), { at: [THY[0], THY[1] - 0.25, 0] });
  const NOD: Vec3 = [THY[0] + 0.55, THY[1] + 0.15, 0.25];
  const nodule = put(sc, "nodule", blob(0.2), { at: NOD });
  const PR0: Vec3 = [THY[0] + 0.55, 1.5, 0.4];
  const probe = put(sc, "probe", box(0.5, 0.2, 0.3, "accent", true), { at: PR0 });
  const waves: Part[] = []; for (let i = 0; i < 3; i++) waves.push(put(sc, `w${i}`, ring(0.15 + 0.12 * i, 12, "accent", "y"), { at: [PR0[0], PR0[1] - 0.25 - 0.22 * i, PR0[2]] }));
  const SY0: Vec3 = [0.6, 1.5, 0.5];
  const needle = put(sc, "needle", syringe(0.8, "accent"), { at: SY0, rotZ: -0.5 });
  const cells = put(sc, "cells", cloud(6, 0.12, "hot", 3), { at: NOD });
  const tiles: Part[] = []; for (let i = 0; i < 6; i++) tiles.push(put(sc, `b${i}`, quad(0.3, 0.3, i === 2 || i === 3 ? "hot" : "soft"), { at: [0.2 + 0.36 * i, -0.9, 0] }));
  const MOL: Vec3 = [2.3, 0.6, 0];
  const mol = put(sc, "mol", box(0.9, 0.7, 0.5, "accent", true), { at: MOL });
  const dna = put(sc, "dna", helix(0.12, 0.5, 3, 24, "accent"), { at: [MOL[0], MOL[1], 0.3] });
  const link = put(sc, "link", arrow([1.4, -0.7, 0], [MOL[0] - 0.3, MOL[1] - 0.4, 0], "accent"));
  const knife = put(sc, "knife", polyline([[2.0, -0.9, 0.1], [2.6, -0.9, 0.1], [2.75, -0.98, 0.1]], "soft"));
  const knifeX = put(sc, "knifeX", cross([2.35, -0.9, 0.15], 0.2));
  sc.mesh.labels = [L([THY[0], 1.1, 0], "Thyroid nodule"), L([-0.4, 2.0, 0], "Ultrasound probe, then a fine needle"), L([1.1, -1.35, 0], "Bethesda I to VI"), L([MOL[0], 1.25, 0], "Molecular classifier on the same cells")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...waves, needle, cells, ...tiles, mol, dna, link, knife, knifeX);
    const s = stageOf(t);
    const nd = (a: number) => moveTo(pts, base, needle, SY0, [NOD[0] + 0.05, NOD[1] + 0.05, NOD[2]], a);
    if (s === 0) { const u = Q(t, 0); waves.forEach((w, i) => { const v = (t * 4 + i / 3) % 1; setAlpha(alpha, w, u * (1 - v)); movePart(pts, base, w, [0, -0.3 * v, 0], 0.6 + 0.8 * v); }); setAlpha(alpha, nodule, 0.4 + 0.6 * u * pulse(t, 4)); return { caption: "1 · Ultrasound scores the nodule (TI-RADS) and decides whether it needs a biopsy at all" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, probe, 0.4); setAlpha(alpha, needle, 1); nd(u); setAlpha(alpha, cells, clamp(u * 2 - 1) * pulse(t, 5)); return { caption: "2 · A fine needle, guided by the ultrasound picture, draws cells out of the nodule" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, probe, 0.4); setAlpha(alpha, needle, 1); nd(1 - 0.5 * u); moveTo(pts, base, cells, NOD, [0.9, -0.9, 0.05], u); setAlpha(alpha, cells, 1); cascade(alpha, tiles, u); tiles.forEach((tl, i) => { if (i === 2 || i === 3) setAlpha(alpha, tl, clamp(u * 6 - i) * (0.5 + 0.5 * pulse(t, 4))); }); return { caption: "3 · Cytology grades them on the Bethesda scale I to VI; about 20% land in the indeterminate III to IV categories, which used to mean a diagnostic lobectomy" }; }
    const u = Q(t, 3); setAlpha(alpha, probe, 0.4); setAlpha(alpha, needle, 0.6); nd(0.5); moveTo(pts, base, cells, NOD, [0.9, -0.9, 0.05], 1); setAlpha(alpha, cells, 1); show(alpha, 1, ...tiles); grow(alpha, link, u); setAlpha(alpha, mol, clamp(u * 2 - 0.5)); setAlpha(alpha, dna, clamp(u * 2 - 0.7)); movePart(pts, base, dna, [0, 0, 0], 1, t * TAU * 2); setAlpha(alpha, knife, clamp(u * 2 - 1)); setAlpha(alpha, knifeX, clamp(u * 3 - 2)); setAlpha(alpha, nodule, 1 - 0.5 * u);
    return { caption: "4 · A gene-expression or mutation panel on the same sample (Afirma GSC, ThyroSeq v3) rules cancer out with 95 to 97% negative predictive value, halving unnecessary surgery" };
  });
}

// ---------------------------------------------------------------- 2. reference laboratories and companion-diagnostic testing
export function referenceLaboratories(): Mesh {
  const sc = scene();
  const HOSP: Vec3 = [-2.6, 0.2, 0];
  put(sc, "hospital", box(0.9, 0.9, 0.7, "soft", true), { at: HOSP });
  put(sc, "crossV", line([HOSP[0], HOSP[1] + 0.2, 0.36], [HOSP[0], HOSP[1] + 0.6, 0.36], "soft"));
  put(sc, "crossH", line([HOSP[0] - 0.2, HOSP[1] + 0.4, 0.36], [HOSP[0] + 0.2, HOSP[1] + 0.4, 0.36], "soft"));
  const LAB: Vec3 = [0.1, 0.2, 0];
  const SL0: Vec3 = [HOSP[0] + 0.75, HOSP[1] - 0.25, 0.3], SL1: Vec3 = [LAB[0] - 0.45, LAB[1] - 0.15, 0.55];
  const slide = put(sc, "slide", quad(0.5, 0.2, "accent"), { at: SL0 });
  const tissue = put(sc, "tissue", disc(0.06, 8, undefined, "z"), { at: [SL0[0], SL0[1], SL0[2] + 0.01] });
  put(sc, "lab", box(1.9, 1.3, 1.0, undefined, true), { at: LAB });
  const stainer = put(sc, "stainer", box(0.5, 0.5, 0.4, "accent", true), { at: [LAB[0] + 0.45, LAB[1] + 0.15, 0.3] });
  const drops: Part[] = []; for (let i = 0; i < 4; i++) drops.push(put(sc, `d${i}`, small(0.05, "accent"), { at: [LAB[0] + 0.3 + 0.1 * i, LAB[1] + 0.4, 0.55] }));
  const stain = put(sc, "stain", disc(0.09, 8, "hot", "z"), { at: [SL1[0], SL1[1], SL1[2] + 0.02] });
  const PATH: Vec3 = [2.0, -0.4, 0];
  const path = put(sc, "path", figure("soft"), { at: PATH, scale: 0.7 });
  const scope = put(sc, "scope", cylinder(0.08, 0.5, 8, 2, "soft", false, true), { at: [PATH[0] - 0.5, PATH[1] + 0.25, 0.2], rotZ: 0.4 });
  const scoreA = put(sc, "scoreA", bar(1.6, 0.9, 0.22, "accent"), { at: [0, 0.6, 0] });
  const scoreB = put(sc, "scoreB", bar(1.95, 0.45, 0.22, "hot"), { at: [0, 0.6, 0] });
  const drug = put(sc, "drug", vial(0.12, 0.35, "accent"), { at: [2.8, 1.1, 0] });
  const link = put(sc, "link", arrow([1.75, 1.6, 0], [2.65, 1.3, 0], "accent"));
  const drugX = put(sc, "drugX", cross([2.8, 1.1, 0.15], 0.2));
  sc.mesh.labels = [L([HOSP[0], 1.1, 0], "Biopsy at the treating hospital"), L([LAB[0], 1.35, 0], "Reference lab: IHC, FISH, NGS at scale"), L([1.8, 2.0, 0], "Same tumour, two clones, two scores"), L([2.8, 0.55, 0], "One drug's label")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...drops, stain, path, scope, scoreA, scoreB, drug, link, drugX); setAlpha(alpha, stainer, 0.3);
    const s = stageOf(t);
    const travel = (u: number) => { moveTo(pts, base, slide, SL0, SL1, u); moveTo(pts, base, tissue, SL0, SL1, u); };
    if (s === 0) { travel(Q(t, 0)); return { caption: "1 · A biopsy is cut into slides, and the slides travel from the treating hospital to a national reference lab (Labcorp, Quest, NeoGenomics, Mayo, ARUP)" }; }
    if (s === 1) { const u = Q(t, 1); travel(1); setAlpha(alpha, stainer, 1); drops.forEach((d, i) => { const v = (t * 4 + i * 0.25) % 1; moveTo(pts, base, d, [0, 0, 0], [-0.3 - 0.1 * i + 0.1 * i, -0.55, 0], v); setAlpha(alpha, d, u * (v < 0.9 ? 1 : 0)); }); setAlpha(alpha, stain, clamp(u * 1.5 - 0.3)); return { caption: "2 · An automated stainer runs a validated antibody clone (PD-L1 22C3, SP142 or SP263; HER2 4B5) on its own platform, under CLIA/CAP or ISO 15189 accreditation" }; }
    if (s === 2) { const u = Q(t, 2); travel(1); setAlpha(alpha, stainer, 0.6); setAlpha(alpha, stain, 1); show(alpha, 1, path, scope); movePart(pts, base, scope, [0, 0.05 * Math.sin(t * TAU * 3), 0], 1); setAlpha(alpha, scoreA, u); movePart(pts, base, scoreA, [0, -0.45 * (1 - u), 0], 1); setAlpha(alpha, scoreB, clamp(u * 2 - 1)); movePart(pts, base, scoreB, [0, -0.22 * (1 - clamp(u * 2 - 1)), 0], 1); return { caption: "3 · A pathologist scores the stain by the algorithm written into the drug label; the same tumour can score differently on another clone and platform, which is why PD-L1 scores are not interchangeable" }; }
    const u = Q(t, 3); travel(1); setAlpha(alpha, stainer, 0.6); setAlpha(alpha, stain, 1); show(alpha, 1, path, scope, scoreA, scoreB); grow(alpha, link, u); setAlpha(alpha, drug, clamp(u * 2 - 0.5)); setAlpha(alpha, drugX, clamp(u * 3 - 2) * 0.7); setAlpha(alpha, slide, 1 - 0.6 * u); setAlpha(alpha, tissue, 1 - 0.8 * u);
    return { caption: "4 · The score decides eligibility for one drug; the block runs out when IHC, FISH and NGS all compete for the same tissue, and US regulation of lab-developed tests is still in flux" };
  });
}

// ---------------------------------------------------------------- 3. prehabilitation before cancer surgery
export function prehabilitation(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [-0.6, 0.1, 0];
  put(sc, "patient", figure(), { at: PAT });
  const tl = put(sc, "timeline", ticks(-2.4, 2.4, -1.4, 5, "soft"));
  const marker = put(sc, "marker", octahedron(0.1, "accent"), { at: [-2.4, -1.4, 0] });
  const knife = put(sc, "knife", polyline([[2.2, -1.05, 0], [2.6, -1.05, 0], [2.75, -1.12, 0]], "soft"));
  const dumb = put(sc, "dumb", dumbbell(0.7, "accent"), { at: [-1.75, 0.45, 0.2] });
  const shake = put(sc, "shake", vial(0.13, 0.4, "accent"), { at: [0.35, 0.5, 0.2] });
  const mind = put(sc, "mind", ring(0.28, 14, "accent", "z"), { at: [PAT[0], 1.5, 0] });
  const cig = put(sc, "cig", line([0.25, -0.25, 0.2], [0.7, -0.25, 0.2], "soft"));
  const cigX = put(sc, "cigX", cross([0.47, -0.25, 0.22], 0.18));
  const blood = put(sc, "blood", small(0.1, "hot"), { at: [-1.4, -0.4, 0.2] });
  const ax = put(sc, "axes", axes([1.4, -0.7, 0], 1.8, 1.9));
  const baseline = put(sc, "baseline", line([1.4, -0.2, 0], [3.2, -0.2, 0], "soft"));
  const fit = put(sc, "fit", polyline([[1.5, -0.2, 0], [1.9, -0.05, 0], [2.3, 0.35, 0], [2.6, 0.8, 0]], "accent"));
  const dip = put(sc, "dip", polyline([[2.6, 0.8, 0], [2.8, 0.15, 0], [3.1, 0.75, 0]], "accent"));
  const compl = put(sc, "compl", bar(2.9, 0.0, 0.01), { at: [0, -0.6, 0] });
  sc.mesh.labels = [L([-2.4, -1.75, 0], "Diagnosis"), L([0, -1.75, 0], "4 to 8 week window"), L([2.5, -1.75, 0], "Surgery"), L([2.3, 1.5, 0], "Fitness (6-minute walk)")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, knife, dumb, shake, mind, cig, cigX, blood, fit, dip, compl); setAlpha(alpha, ax, 0.3); setAlpha(alpha, baseline, 0.3); setAlpha(alpha, tl, 0.6);
    const s = stageOf(t);
    const mk = (u: number) => moveTo(pts, base, marker, [-2.4, -1.4, 0], [2.4, -1.4, 0], u);
    if (s === 0) { const u = Q(t, 0); mk(0.15 * u); setAlpha(alpha, knife, 0.4 * u); return { caption: "1 · Diagnosis to operation leaves a window of 4 to 8 weeks that used to be spent waiting" }; }
    if (s === 1) { const u = Q(t, 1); mk(0.15 + 0.25 * u); setAlpha(alpha, knife, 0.4); cascade(alpha, [dumb, shake, mind, cig, cigX, blood], u); movePart(pts, base, dumb, [0, 0.12 * Math.sin(t * TAU * 4), 0], 1); movePart(pts, base, mind, [0, 0, 0], 1 + 0.15 * Math.sin(t * TAU * 2)); return { caption: "2 · Aerobic and resistance exercise, protein supplements, anxiety reduction, smoking and alcohol cessation and anaemia correction fill it, supervised or at home" }; }
    if (s === 2) { const u = Q(t, 2); mk(0.4 + 0.4 * u); setAlpha(alpha, knife, 0.4); show(alpha, 1, dumb, shake, mind, cig, cigX, blood); movePart(pts, base, dumb, [0, 0.12 * Math.sin(t * TAU * 4), 0], 1); setAlpha(alpha, ax, 1); setAlpha(alpha, baseline, 0.6); grow(alpha, fit, u); return { caption: "3 · Physiological reserve rises: 6-minute walk distance improves before the operation, so the patient starts from a higher baseline" }; }
    const u = Q(t, 3); mk(0.8 + 0.2 * u); setAlpha(alpha, knife, 1); show(alpha, 0.6, dumb, shake, mind, cig, cigX, blood); setAlpha(alpha, ax, 1); setAlpha(alpha, baseline, 0.6); setAlpha(alpha, fit, 1); grow(alpha, dip, u);
    return { caption: "4 · The dip after surgery is shallower and recovery faster: fewer severe complications in colorectal trials (PREHAB, 2023), heterogeneous results elsewhere; neoadjuvant therapy now shortens the window" };
  });
}

// ---------------------------------------------------------------- 4. alcohol reduction, pricing and cancer warning labels
export function alcoholReductionLabelling(): Mesh {
  const sc = scene();
  const FIG: Vec3 = [-1.9, 0, 0]; const S = 1.3;
  put(sc, "body", figure(), { at: FIG, scale: S });
  const sites: Vec3[] = [[0, 0.78, 0.15], [0.02, 0.66, 0.12], [0, 0.58, 0.12], [0, 0.4, 0.1], [0.1, 0.12, 0.1], [0, -0.05, 0.1], [-0.12, 0.35, 0.12]];
  const marks: Part[] = sites.map((p, i) => put(sc, `site${i}`, small(0.06, "hot"), { at: [FIG[0] + p[0] * S, FIG[1] + p[1] * S, p[2]] }));
  const BOT: Vec3 = [0.5, -0.2, 0];
  const bottle = put(sc, "bottle", vial(0.25, 0.9, "hot"), { at: BOT });
  const neck = put(sc, "neck", cylinder(0.1, 0.4, 8, 2, "hot", false, true), { at: [BOT[0], BOT[1] + 0.65, 0] });
  const warn = put(sc, "warn", quad(0.36, 0.28, "accent"), { at: [BOT[0], BOT[1] - 0.05, 0.27] });
  const warnLines = put(sc, "warnLines", doc(0.3, 0.2, 2, "accent"), { at: [BOT[0], BOT[1] - 0.05, 0.28] });
  const mol = put(sc, "mol", cloud(8, 0.3, "hot", 5), { at: [-0.4, 0.5, 0.1] });
  const AX: Vec3 = [1.4, -1.5, 0];
  const ax = put(sc, "axes", axes(AX, 1.8, 1.4));
  const curve = put(sc, "curve", polyline([[AX[0], AX[1], 0], [AX[0] + 0.5, AX[1] + 0.3, 0], [AX[0] + 1.0, AX[1] + 0.65, 0], [AX[0] + 1.6, AX[1] + 1.2, 0]], "hot"));
  const TAG0: Vec3 = [2.2, 0.4, 0];
  const tag = put(sc, "tag", box(0.5, 0.3, 0.06, "accent", true), { at: TAG0 });
  const tagArrow = put(sc, "tagArrow", arrow([TAG0[0] + 0.5, TAG0[1] - 0.1, 0], [TAG0[0] + 0.5, TAG0[1] + 0.7, 0], "accent"));
  const aware = put(sc, "aware", bar(1.0, 0.55, 0.25, "soft"), { at: [0, 0.2, 0] });
  const awareFull = put(sc, "awareFull", polyline([[0.8, 1.4, 0], [1.2, 1.4, 0]], "soft"));
  sc.mesh.labels = [L([FIG[0], 1.75, 0], "Seven cancer sites"), L([BOT[0], 1.15, 0], "Alcohol"), L([2.4, 1.55, 0], "Price and availability"), L([AX[0] + 0.9, AX[1] - 0.35, 0], "Risk rises with dose, no threshold")];
  const base = sc.mesh.points;
  return frame(sc, 14, (t, pts, alpha) => {
    hide(alpha, ...marks, warn, warnLines, mol, curve, tag, tagArrow, aware, awareFull); setAlpha(alpha, ax, 0.3);
    const s = stageOf(t);
    const drift = (a: number) => { const v = (t * 3) % 1; moveTo(pts, base, mol, [-0.4, 0.5, 0.1], [FIG[0] + 0.3, 0.5, 0.1], v); setAlpha(alpha, mol, a * (1 - v)); };
    if (s === 0) { const u = Q(t, 0); drift(1); cascade(alpha, marks, u); marks.forEach((m, i) => movePart(pts, base, m, [0, 0, 0], 1 + 0.5 * pulse(t + i * 0.1, 4))); return { caption: "1 · Ethanol and its metabolite acetaldehyde damage DNA, raise oestrogen and carry other carcinogens into tissue: cancers of the mouth, pharynx, larynx, oesophagus, liver, colorectum and breast" }; }
    if (s === 1) { const u = Q(t, 1); drift(0.6); show(alpha, 1, ...marks); setAlpha(alpha, ax, 1); grow(alpha, curve, u); return { caption: "2 · Risk rises with dose and has no threshold for breast cancer; about 741,000 new cancers a year, 4% of all, are attributed to alcohol, a measurable share from light and moderate drinking" }; }
    if (s === 2) { const u = Q(t, 2); drift(0.3 * (1 - u)); show(alpha, 0.7, ...marks); setAlpha(alpha, ax, 1); setAlpha(alpha, curve, 1); setAlpha(alpha, tag, 1); moveTo(pts, base, tag, TAG0, [TAG0[0], TAG0[1] + 0.6, 0], u); grow(alpha, tagArrow, u); movePart(pts, base, bottle, [0, -0.1 * u, 0], 1 - 0.2 * u); movePart(pts, base, neck, [0, -0.28 * u, 0], 1 - 0.2 * u); return { caption: "3 · What works is price and availability: minimum unit pricing in Scotland (2018) cut alcohol-specific deaths by about 13%; taxation and marketing limits follow" }; }
    const u = Q(t, 3); show(alpha, 0.7, ...marks); setAlpha(alpha, ax, 1); setAlpha(alpha, curve, 1); setAlpha(alpha, tag, 1); moveTo(pts, base, tag, TAG0, [TAG0[0], TAG0[1] + 0.6, 0], 1); setAlpha(alpha, tagArrow, 1); movePart(pts, base, bottle, [0, -0.1, 0], 0.8); movePart(pts, base, neck, [0, -0.28, 0], 0.8); setAlpha(alpha, warn, u); setAlpha(alpha, warnLines, clamp(u * 2 - 1)); movePart(pts, base, warn, [0, -0.1, 0], 0.8); movePart(pts, base, warnLines, [0, -0.1, 0], 0.8); setAlpha(alpha, aware, u); movePart(pts, base, aware, [0, -0.27 * (1 - u), 0], 1); setAlpha(alpha, awareFull, u);
    return { caption: "4 · Cancer warning labels (Ireland, legislated 2023, deferred to 2028; a US Surgeon General advisory in 2025) target the gap: awareness that alcohol causes cancer stays below 50% in most surveys" };
  });
}

// ---------------------------------------------------------------- 5. vitamin D and omega-3 supplementation
export function vitaminDOmega3(): Mesh {
  const sc = scene();
  const COH: Vec3 = [-2.3, 0.3, 0];
  const cohort = put(sc, "cohort", cloud(30, 0.8, undefined, 2), { at: COH });
  put(sc, "ring", ring(0.95, 20, "soft", "z"), { at: COH });
  const vitD = put(sc, "vitD", ellipsoid(0.28, 0.13, 0.13, 4, 8, "accent", true), { at: [-0.7, 0.9, 0] });
  const om3 = put(sc, "om3", ellipsoid(0.28, 0.13, 0.13, 4, 8, "soft", true), { at: [-0.7, -0.3, 0] });
  const armA = put(sc, "armA", arrow([COH[0] + 0.9, COH[1] + 0.3, 0], [-1.05, 0.9, 0], "accent"));
  const armB = put(sc, "armB", arrow([COH[0] + 0.9, COH[1] - 0.3, 0], [-1.05, -0.3, 0], "soft"));
  const clock = put(sc, "clock", ring(0.3, 12, "soft", "z"), { at: [-0.7, -1.3, 0] });
  const hand = put(sc, "hand", line([-0.7, -1.3, 0], [-0.7, -1.02, 0], "accent"));
  const AX: Vec3 = [0.7, -1.4, 0];
  const ax = put(sc, "axes", axes(AX, 2.4, 2.4));
  const incP = put(sc, "incP", bar(AX[0] + 0.4, 1.6, 0.22, "soft"), { at: [0, AX[1], 0] });
  const incD = put(sc, "incD", bar(AX[0] + 0.7, 1.54, 0.22, "accent"), { at: [0, AX[1], 0] });
  const morP = put(sc, "morP", bar(AX[0] + 1.4, 1.6, 0.22, "soft"), { at: [0, AX[1], 0] });
  const morD = put(sc, "morD", bar(AX[0] + 1.7, 1.2, 0.22, "accent"), { at: [0, AX[1], 0] });
  const docs: Part[] = []; for (let i = 0; i < 3; i++) docs.push(put(sc, `doc${i}`, doc(0.5, 0.6, 3), { at: [1.6 + 0.6 * i, 1.7, 0] }));
  const docX: Part[] = []; for (let i = 0; i < 3; i++) docX.push(put(sc, `dx${i}`, cross([1.6 + 0.6 * i, 1.7, 0.05], 0.15)));
  sc.mesh.labels = [L([COH[0], 1.5, 0], "25,871 adults, median 5.3 years"), L([-0.7, 1.35, 0], "Vitamin D3 2000 IU, omega-3 1 g a day"), L([AX[0] + 0.55, -1.75, 0], "New cancers"), L([AX[0] + 1.55, -1.75, 0], "Cancer deaths")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, armA, armB, hand, incP, incD, morP, morD, ...docs, ...docX); setAlpha(alpha, ax, 0.3); setAlpha(alpha, clock, 0.3);
    const s = stageOf(t);
    const rise = (p: Part, h: number, u: number) => { setAlpha(alpha, p, u > 0 ? 1 : 0); movePart(pts, base, p, [0, -h / 2 * (1 - u), 0], 1); };
    if (s === 0) { const u = Q(t, 0); cascade(alpha, [cohort], 1); grow(alpha, armA, u); grow(alpha, armB, u); show(alpha, 0.4 + 0.6 * u, vitD, om3); setAlpha(alpha, clock, 1); setAlpha(alpha, hand, u); movePart(pts, base, hand, [0, 0, 0], 1, u * TAU * 0.8); return { caption: "1 · VITAL randomised 25,871 US adults to vitamin D3 2000 IU a day and/or omega-3 fatty acids 1 g a day, followed for a median 5.3 years" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 1, armA, armB, vitD, om3, clock, hand); movePart(pts, base, hand, [0, 0, 0], 1, TAU * 0.8); setAlpha(alpha, ax, 1); rise(incP, 1.6, clamp(u * 1.5)); rise(incD, 1.54, clamp(u * 1.5 - 0.4)); return { caption: "2 · New invasive cancers were unchanged: hazard ratio 0.96 for vitamin D, 1.03 for omega-3" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 1, armA, armB, vitD, om3, clock, hand); movePart(pts, base, hand, [0, 0, 0], 1, TAU * 0.8); setAlpha(alpha, ax, 1); rise(incP, 1.6, 1); rise(incD, 1.54, 1); rise(morP, 1.6, clamp(u * 1.5)); rise(morD, 1.2, clamp(u * 1.5 - 0.4)); setAlpha(alpha, morD, 0.5 + 0.5 * pulse(t, 3)); return { caption: "3 · Cancer deaths were numerically lower with vitamin D, significant only after excluding the first two years (HR 0.75), an exploratory finding; pooled trials suggest a 10 to 15% fall in cancer death but not in incidence" }; }
    const u = Q(t, 3); show(alpha, 1, armA, armB, vitD, om3, clock, hand); movePart(pts, base, hand, [0, 0, 0], 1, TAU * 0.8); setAlpha(alpha, ax, 1); rise(incP, 1.6, 1); rise(incD, 1.54, 1); rise(morP, 1.6, 1); rise(morD, 1.2, 1); setAlpha(alpha, morD, 0.7); cascade(alpha, docs, u); docX.forEach((x, i) => setAlpha(alpha, x, clamp(u * 3 - i - 0.5)));
    return { caption: "4 · After a diagnosis, AMATERASU, SUNSHINE and the phase 3 SOLARIS trial (2025) were null on their primary endpoints: correct deficiency, do not expect prevention from a pill" };
  });
}

// ---------------------------------------------------------------- 6. red and processed meat reduction
export function redProcessedMeat(): Mesh {
  const sc = scene();
  const COL: Vec3 = [-0.6, -0.7, 0];
  put(sc, "colon", tube(0.45, 3.0, "soft"), { at: COL });
  const lining = put(sc, "lining", cloud(12, 1.2, undefined, 4), { at: [COL[0], COL[1] - 0.2, 0.2] });
  const BAC: Vec3 = [-2.4, 1.3, 0], STK: Vec3 = [-1.4, 1.3, 0], PAN: Vec3 = [-0.2, 1.3, 0];
  const bacon = put(sc, "bacon", box(0.7, 0.14, 0.3, "hot", true), { at: BAC });
  const steak = put(sc, "steak", ellipsoid(0.35, 0.18, 0.15, 4, 8, "hot", true), { at: STK });
  const pan = put(sc, "pan", disc(0.38, 12, "soft", "y"), { at: PAN });
  put(sc, "handle", line([PAN[0] + 0.38, PAN[1], 0], [PAN[0] + 0.9, PAN[1] + 0.1, 0], "soft"));
  const nitroso = put(sc, "nitroso", cloud(6, 0.2, "hot", 3), { at: BAC });
  const haem = put(sc, "haem", cloud(6, 0.2, "hot", 6), { at: STK });
  const hca = put(sc, "hca", cloud(6, 0.2, "accent", 8), { at: [PAN[0], PAN[1] + 0.2, 0] });
  const dna = put(sc, "dna", helix(0.12, 0.7, 3, 24, "accent"), { at: [COL[0] + 0.2, COL[1], 0.1], rotZ: Math.PI / 2 });
  const damage = put(sc, "damage", small(0.09, "hot"), { at: [COL[0] + 0.2, COL[1] + 0.05, 0.15] });
  const AX: Vec3 = [1.4, -1.4, 0];
  const ax = put(sc, "axes", axes(AX, 1.6, 1.6));
  const curve = put(sc, "curve", polyline([[AX[0], AX[1] + 0.3, 0], [AX[0] + 0.5, AX[1] + 0.55, 0], [AX[0] + 1.0, AX[1] + 0.85, 0], [AX[0] + 1.45, AX[1] + 1.2, 0]], "hot"));
  const portions: Part[] = []; for (let i = 0; i < 3; i++) portions.push(put(sc, `por${i}`, disc(0.16, 10, "accent", "z"), { at: [1.6 + 0.45 * i, 1.4, 0] }));
  const baconX = put(sc, "baconX", cross([BAC[0], BAC[1], 0.2], 0.25));
  sc.mesh.labels = [L([-1.3, 1.9, 0], "Processed meat, red meat, hot pan"), L([COL[0], -1.45, 0], "Colon lining"), L([AX[0] + 0.8, AX[1] - 0.35, 0], "Risk rises with dose"), L([2.05, 1.85, 0], "Three portions a week at most")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, nitroso, haem, hca, dna, damage, curve, ...portions, baconX); setAlpha(alpha, ax, 0.3); setAlpha(alpha, lining, 0.5);
    const s = stageOf(t);
    const fall = (p: Part, from: Vec3, a: number, ph: number) => { const v = (t * 2.5 + ph) % 1; moveTo(pts, base, p, from, [COL[0] + 0.2, COL[1] + 0.1, 0.1], v); setAlpha(alpha, p, a * (1 - v * v)); };
    if (s === 0) { const u = Q(t, 0); fall(nitroso, BAC, u, 0); setAlpha(alpha, bacon, 0.6 + 0.4 * pulse(t, 3)); return { caption: "1 · Processed meat (IARC Group 1, 2015) and red meat (Group 2A) reach the colon; nitrite curing forms N-nitroso compounds" }; }
    if (s === 1) { const u = Q(t, 1); fall(nitroso, BAC, 1, 0); fall(haem, STK, u, 0.33); fall(hca, [PAN[0], PAN[1] + 0.2, 0], u, 0.66); setAlpha(alpha, pan, 0.6 + 0.4 * pulse(t, 5)); return { caption: "2 · Haem iron from red meat drives nitrosation and lipid peroxidation in the gut; high-temperature cooking adds heterocyclic amines" }; }
    if (s === 2) { const u = Q(t, 2); fall(nitroso, BAC, 1, 0); fall(haem, STK, 1, 0.33); fall(hca, [PAN[0], PAN[1] + 0.2, 0], 1, 0.66); setAlpha(alpha, dna, 1); movePart(pts, base, dna, [0, 0, 0], 1, t * TAU); setAlpha(alpha, damage, clamp(u * 2 - 0.5) * pulse(t, 5)); setAlpha(alpha, ax, 1); grow(alpha, curve, u); return { caption: "3 · Together they alkylate and oxidise DNA in the colonic lining, year after year: about 18% higher colorectal risk per 50 g a day of processed meat, 17% per 100 g a day of red meat" }; }
    const u = Q(t, 3); fall(nitroso, BAC, 1 - u, 0); fall(haem, STK, 1 - u, 0.33); fall(hca, [PAN[0], PAN[1] + 0.2, 0], 1 - u, 0.66); setAlpha(alpha, dna, 1); movePart(pts, base, dna, [0, 0, 0], 1, t * TAU); setAlpha(alpha, damage, 1 - 0.6 * u); setAlpha(alpha, ax, 1); setAlpha(alpha, curve, 1); cascade(alpha, portions, u); setAlpha(alpha, bacon, 1 - 0.6 * u); setAlpha(alpha, baconX, clamp(u * 2 - 1)); setAlpha(alpha, steak, 1 - 0.3 * u);
    return { caption: "4 · Per person that is a few percentage points of lifetime risk; across a population it is 5 to 10% of colorectal cancers. WCRF: about three portions (350 to 500 g cooked) of red meat a week, and little if any processed meat" };
  });
}

// ---------------------------------------------------------------- 7. HCC surveillance in cirrhosis (ultrasound and AFP)
export function hccSurveillance(): Mesh {
  const sc = scene();
  const LIV: Vec3 = [-0.9, 0.0, 0];
  put(sc, "liver", organ(1.3, 0.8, 0.5), { at: LIV });
  const nodules = put(sc, "nodules", cloud(16, 1.0, "soft", 5), { at: [LIV[0], LIV[1], 0.4] });
  const tumour = put(sc, "tumour", blob(0.12), { at: [LIV[0] + 0.5, LIV[1] + 0.2, 0.45] });
  const found = put(sc, "found", ring(0.3, 12, "accent", "z"), { at: [LIV[0] + 0.5, LIV[1] + 0.2, 0.5] });
  const P0: Vec3 = [LIV[0] - 0.9, 1.15, 0.3], P1: Vec3 = [LIV[0] + 0.9, 1.15, 0.3];
  const probe = put(sc, "probe", box(0.45, 0.2, 0.28, "accent", true), { at: P0 });
  const waves: Part[] = []; for (let i = 0; i < 3; i++) waves.push(put(sc, `w${i}`, ring(0.15 + 0.1 * i, 12, "accent", "y"), { at: [P0[0], P0[1] - 0.2 - 0.2 * i, P0[2]] }));
  const afp = put(sc, "afp", cylinder(0.14, 0.7, 8, 2, undefined, false, true), { at: [1.4, 0.5, 0] });
  const level = put(sc, "level", disc(0.13, 8, "hot", "y"), { at: [1.4, 0.25, 0] });
  put(sc, "cal", ticks(-2.4, 2.4, -1.5, 7, "soft"));
  const mark = put(sc, "mark", octahedron(0.1, "accent"), { at: [-2.4, -1.5, 0] });
  const knife = put(sc, "knife", polyline([[LIV[0] + 0.2, LIV[1] + 0.9, 0.5], [LIV[0] + 0.45, LIV[1] + 0.35, 0.5]], "accent"));
  const AX: Vec3 = [2.1, -1.0, 0];
  const ax = put(sc, "axes", axes(AX, 0.8, 1.6));
  const full = put(sc, "full", line([AX[0], AX[1] + 1.5, 0], [AX[0] + 0.7, AX[1] + 1.5, 0], "soft"));
  const uptake = put(sc, "uptake", bar(AX[0] + 0.4, 0.38, 0.25, "hot"), { at: [0, AX[1], 0] });
  sc.mesh.labels = [L([LIV[0], -1.05, 0], "Cirrhotic liver"), L([LIV[0], 1.7, 0], "Ultrasound sweep"), L([1.4, 1.2, 0], "AFP blood test"), L([AX[0] + 0.4, AX[1] + 1.95, 0], "Uptake under 25%")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, tumour, found, ...waves, level, knife, uptake, full); setAlpha(alpha, ax, 0.3); setAlpha(alpha, probe, 0.3); setAlpha(alpha, afp, 0.3);
    const s = stageOf(t);
    const sweep = (a: number) => { const v = 0.5 + 0.5 * Math.sin(t * TAU * 2); moveTo(pts, base, probe, P0, P1, v); setAlpha(alpha, probe, a); waves.forEach((w, i) => { const k = (t * 4 + i / 3) % 1; moveTo(pts, base, w, P0, P1, v); movePart(pts, base, w, [(P1[0] - P0[0]) * v, -0.25 * k, 0], 0.6 + 0.8 * k); setAlpha(alpha, w, a * (1 - k)); }); };
    const mk = (u: number) => moveTo(pts, base, mark, [-2.4, -1.5, 0], [2.4, -1.5, 0], u);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, [nodules], 1); setAlpha(alpha, nodules, 0.3 + 0.7 * u); mk(0.1 * u); return { caption: "1 · Cirrhosis of any cause, or chronic hepatitis B, defines the at-risk group; the liver is already nodular" }; }
    if (s === 1) { const u = Q(t, 1); sweep(1); setAlpha(alpha, afp, 1); setAlpha(alpha, level, u); movePart(pts, base, level, [0, 0.3 * u, 0], 1); mk(0.1 + 0.4 * u); return { caption: "2 · Every six months: an ultrasound sweep plus an AFP blood test, an interval matched to how fast a liver tumour doubles" }; }
    if (s === 2) { const u = Q(t, 2); sweep(0.6); setAlpha(alpha, afp, 1); setAlpha(alpha, level, 1); movePart(pts, base, level, [0, 0.3, 0], 1); mk(0.5 + 0.35 * u); setAlpha(alpha, tumour, clamp(u * 2)); movePart(pts, base, tumour, [0, 0, 0], 0.5 + 0.5 * u); setAlpha(alpha, found, clamp(u * 2 - 1) * pulse(t, 5)); grow(alpha, knife, clamp(u * 2 - 1)); return { caption: "3 · A small tumour is caught while curative treatment (resection, ablation, transplant) is still possible: early stage in about 60 to 70% of adherent patients" }; }
    const u = Q(t, 3); sweep(0.4); setAlpha(alpha, afp, 1); setAlpha(alpha, level, 1); movePart(pts, base, level, [0, 0.3, 0], 1); mk(0.85 + 0.15 * u); setAlpha(alpha, tumour, 1); setAlpha(alpha, found, 0.6); setAlpha(alpha, knife, 1); setAlpha(alpha, ax, 1); setAlpha(alpha, full, u); setAlpha(alpha, uptake, u); movePart(pts, base, uptake, [0, -0.19 * (1 - u), 0], 1);
    return { caption: "4 · Uptake is under 25% in many health systems, and ultrasound misses more in fatty or obese livers; abbreviated MRI, GALAD and cfDNA methylation tests are being tested to close the gap" };
  });
}

// ---------------------------------------------------------------- 8. circulating tumour HPV DNA
export function ctHpvDna(): Mesh {
  const sc = scene();
  const TUM: Vec3 = [-2.2, 0.9, 0];
  const tumour = put(sc, "tumour", blob(0.45), { at: TUM });
  const VES: Vec3 = [-0.9, -0.5, 0];
  put(sc, "vessel", tube(0.3, 2.4, "soft"), { at: VES });
  const frags: Part[] = []; for (let i = 0; i < 5; i++) frags.push(put(sc, `f${i}`, octahedron(0.07, "accent"), { at: TUM }));
  const beams: Part[] = []; for (let i = 0; i < 3; i++) beams.push(put(sc, `beam${i}`, line([TUM[0] - 0.9 + 0.9 * i, 2.1, 0], [TUM[0] - 0.15 + 0.15 * i, TUM[1] + 0.3, 0], "accent")));
  const TB: Vec3 = [0.6, -0.5, 0];
  const tubeB = put(sc, "tube", cylinder(0.16, 0.8, 8, 2, undefined, false, true), { at: TB });
  const GRID: Vec3 = [1.6, 0.9, 0];
  const droplets: Part[] = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) droplets.push(put(sc, `d${r}${c}`, dots([[0, 0, 0]], (r * 4 + c) % 5 === 0 ? "hot" : "soft"), { at: [GRID[0] - 0.45 + 0.3 * c, GRID[1] + 0.3 - 0.3 * r, 0] }));
  const AX: Vec3 = [1.3, -1.7, 0];
  const ax = put(sc, "axes", axes(AX, 2.0, 1.3));
  const fall = put(sc, "fall", polyline([[AX[0] + 0.1, AX[1] + 1.1, 0], [AX[0] + 0.4, AX[1] + 0.7, 0], [AX[0] + 0.7, AX[1] + 0.3, 0], [AX[0] + 1.0, AX[1] + 0.05, 0], [AX[0] + 1.3, AX[1] + 0.05, 0]], "accent"));
  const rise = put(sc, "rise", polyline([[AX[0] + 1.3, AX[1] + 0.05, 0], [AX[0] + 1.55, AX[1] + 0.15, 0], [AX[0] + 1.8, AX[1] + 0.45, 0]], "hot"));
  const scan = put(sc, "scan", ring(0.22, 12, "soft", "z"), { at: [AX[0] + 1.95, AX[1] + 0.9, 0] });
  sc.mesh.labels = [L([TUM[0], 1.65, 0], "HPV-positive throat tumour"), L([VES[0], -1.15, 0], "Viral DNA fragments in the blood"), L([GRID[0], 1.55, 0], "Droplet PCR (NavDx)"), L([AX[0] + 1.0, AX[1] - 0.35, 0], "HPV16 copies over time")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...beams, ...droplets, fall, rise, scan); setAlpha(alpha, ax, 0.3); setAlpha(alpha, tubeB, 0.4);
    const s = stageOf(t);
    const shed = (a: number, sc2 = 1) => frags.forEach((f, i) => { const v = (t * 2.5 + i / 5) % 1; const p0: Vec3 = TUM, p1: Vec3 = [VES[0] - 1.0, VES[1], 0.1], p2: Vec3 = [TB[0], TB[1] + 0.1, 0.1]; const pos = v < 0.4 ? lerp3(p0, p1, v / 0.4) : lerp3(p1, p2, (v - 0.4) / 0.6); movePart(pts, base, f, [pos[0] - TUM[0], pos[1] - TUM[1], pos[2] - TUM[2]], sc2, t * TAU * 2); setAlpha(alpha, f, a * (v > 0.03 ? 1 : 0)); });
    if (s === 0) { const u = Q(t, 0); shed(u); setAlpha(alpha, tumour, 0.6 + 0.4 * pulse(t, 3)); return { caption: "1 · An HPV-positive throat tumour sheds fragments of tumour-modified viral DNA into the bloodstream" }; }
    if (s === 1) { const u = Q(t, 1); shed(1); setAlpha(alpha, tubeB, 1); cascade(alpha, droplets, u); droplets.forEach((d, i) => { if (i % 5 === 0) setAlpha(alpha, d, clamp(u * 12 - i) * (0.5 + 0.5 * pulse(t + i * 0.05, 5))); }); return { caption: "2 · Digital droplet PCR or NGS (NavDx and others) counts HPV16 DNA copies in plasma with high specificity, one partition at a time" }; }
    if (s === 2) { const u = Q(t, 2); shed(1 - u, 1); beams.forEach((b, i) => setAlpha(alpha, b, pulse(t + i * 0.1, 6))); movePart(pts, base, tumour, [0, 0, 0], 1 - 0.55 * u); setAlpha(alpha, tubeB, 1); show(alpha, 1, ...droplets); setAlpha(alpha, ax, 1); grow(alpha, fall, u); return { caption: "3 · During chemoradiation the count falls to zero; clearance predicts cure, and a stalled count predicts trouble" }; }
    const u = Q(t, 3); shed(0.5 * u, 0.7); show(alpha, 0.3, ...beams); movePart(pts, base, tumour, [0, 0, 0], 0.45 + 0.2 * u); setAlpha(alpha, tumour, 0.4 + 0.6 * u); setAlpha(alpha, tubeB, 1); show(alpha, 1, ...droplets); setAlpha(alpha, ax, 1); setAlpha(alpha, fall, 1); grow(alpha, rise, u); setAlpha(alpha, scan, clamp(u * 3 - 2) * 0.6);
    return { caption: "4 · After treatment a rising count flags recurrence months before imaging; trials such as NRG-HN005 use it to choose patients for de-escalation, and proof that acting on it helps is still being gathered" };
  });
}

// ---------------------------------------------------------------- 9. cachexia-directed therapy (GDF-15 blockade)
export function cachexiaTherapy(): Mesh {
  const sc = scene();
  const TUM: Vec3 = [-2.4, -0.7, 0];
  put(sc, "tumour", blob(0.45), { at: TUM });
  const BR: Vec3 = [0.1, 1.0, 0];
  put(sc, "brain", organ(0.75, 0.55, 0.5), { at: BR });
  const HB: Vec3 = [BR[0], BR[1] - 0.5, 0.15];
  put(sc, "hind", sphere(0.2, 4, 8, "accent", true), { at: HB });
  const rec = put(sc, "rec", ring(0.28, 10, "accent", "z"), { at: HB });
  const gdf: Part[] = []; for (let i = 0; i < 6; i++) gdf.push(put(sc, `g${i}`, dots([[0, 0, 0]], "hot"), { at: TUM }));
  const MID: Vec3 = [-1.1, 0.2, 0.1];
  const abs: Part[] = []; for (let i = 0; i < 3; i++) abs.push(put(sc, `ab${i}`, antibody(0.22, "accent"), { at: [MID[0] - 0.25 + 0.25 * i, MID[1] - 1.1 + 0.15 * (i % 2), 0.1] }));
  const PAT: Vec3 = [2.2, -0.2, 0];
  const pat = put(sc, "patient", figure(), { at: PAT });
  const plate = put(sc, "plate", disc(0.3, 12, "accent", "y"), { at: [PAT[0], 1.3, 0] });
  const food = put(sc, "food", cloud(5, 0.15, "accent", 2), { at: [PAT[0], 1.38, 0] });
  const scale = put(sc, "scale", ticks(PAT[0] - 0.7, PAT[0] + 0.7, -1.4, 5, "soft"));
  const weight = put(sc, "weight", octahedron(0.1, "hot"), { at: [PAT[0] + 0.4, -1.4, 0] });
  sc.mesh.labels = [L([TUM[0], 0.05, 0], "Tumour releasing GDF-15"), L([BR[0], 1.85, 0], "GFRAL receptor in the hindbrain"), L([MID[0], -1.5, 0], "GDF-15 antibody (ponsegromab)"), L([PAT[0], 1.85, 0], "Appetite and weight")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...abs, plate, food); setAlpha(alpha, rec, 0.3); setAlpha(alpha, scale, 0.5);
    const s = stageOf(t);
    const flow = (a: number, stop: number) => gdf.forEach((g, i) => { const v = ((t * 2.5 + i / 6) % 1) * stop; moveTo(pts, base, g, TUM, [HB[0], HB[1] - 0.2, HB[2]], v); setAlpha(alpha, g, a * (v > 0.02 && v < stop - 0.02 ? 1 : 0)); });
    const body = (w: number) => movePart(pts, base, pat, [0, 0, 0], w);
    if (s === 0) { const u = Q(t, 0); flow(u, 1); body(1); return { caption: "1 · An advanced tumour releases GDF-15, a stress hormone, into the blood" }; }
    if (s === 1) { const u = Q(t, 1); flow(1, 1); setAlpha(alpha, rec, pulse(t, 6)); movePart(pts, base, rec, [0, 0, 0], 1 + 0.3 * pulse(t, 6)); body(1 - 0.15 * u); moveTo(pts, base, weight, [PAT[0] + 0.4, -1.4, 0], [PAT[0] - 0.5, -1.4, 0], u); return { caption: "2 · GDF-15 binds the GFRAL receptor in the hindbrain and switches appetite off; weight and lean mass drain away (cachexia)" }; }
    if (s === 2) { const u = Q(t, 2); flow(1, 1 - 0.45 * u); setAlpha(alpha, rec, 1 - 0.7 * u); movePart(pts, base, rec, [0, 0, 0], 1); body(0.85); moveTo(pts, base, weight, [PAT[0] + 0.4, -1.4, 0], [PAT[0] - 0.5, -1.4, 0], 1); cascade(alpha, abs, u); abs.forEach((a, i) => moveTo(pts, base, a, [0, -1.1, 0], [0, 0, 0], clamp(u * 1.5 - 0.15 * i))); return { caption: "3 · Ponsegromab, a GDF-15 antibody, mops the hormone up in the blood before it reaches the receptor" }; }
    const u = Q(t, 3); flow(1, 0.55); setAlpha(alpha, rec, 0.3); movePart(pts, base, rec, [0, 0, 0], 1); show(alpha, 1, ...abs); abs.forEach((a) => moveTo(pts, base, a, [0, -1.1, 0], [0, 0, 0], 1)); body(0.85 + 0.15 * u); moveTo(pts, base, weight, [PAT[0] + 0.4, -1.4, 0], [PAT[0] - 0.5, -1.4, 0], 1 - 0.8 * u); setAlpha(alpha, plate, u); setAlpha(alpha, food, clamp(u * 2 - 1));
    return { caption: "4 · Phase 2 (NCT05546476): weight improved in patients with high GDF-15; a phase 2/3 in pancreatic cancer cachexia (NCT06989437) has recruited since October 2025. No cachexia drug is yet approved, and weight must still translate into function and survival" };
  });
}

// ---------------------------------------------------------------- 10. closed automated cell-therapy manufacturing
export function closedAutomatedManufacturing(): Mesh {
  const sc = scene();
  const BOX: Vec3 = [0, 0, 0];
  put(sc, "box", box(2.6, 1.5, 1.2, undefined, true), { at: BOX });
  const path = put(sc, "path", polyline([[-1.3, 0.2, 0.3], [-0.75, 0.2, 0.3], [-0.25, 0.2, 0.3], [0.3, 0.2, 0.3], [0.85, 0.2, 0.3], [1.3, 0.2, 0.3]], "soft"));
  const magnet = put(sc, "magnet", box(0.3, 0.4, 0.3, "accent", true), { at: [-0.75, 0.55, 0.3] });
  const activ = put(sc, "activ", ring(0.2, 10, "accent", "z"), { at: [-0.25, 0.55, 0.3] });
  const virus = put(sc, "virus", octahedron(0.16, "hot"), { at: [0.3, 0.55, 0.3] });
  const culture = put(sc, "culture", disc(0.25, 12, "accent", "y"), { at: [0.85, -0.25, 0.3] });
  const cells: Part[] = []; for (let i = 0; i < 6; i++) cells.push(put(sc, `c${i}`, small(0.07, i % 2 ? "accent" : undefined), { at: [-1.3, 0.2, 0.3] }));
  const IN: Vec3 = [-2.5, 0.5, 0], OUT: Vec3 = [2.5, 0.5, 0];
  const bagIn = put(sc, "bagIn", box(0.4, 0.55, 0.15, "hot", true), { at: IN });
  put(sc, "lineIn", line([IN[0] + 0.2, IN[1] - 0.2, 0], [-1.3, 0.2, 0.3], "soft"));
  const bagOut = put(sc, "bagOut", box(0.4, 0.55, 0.15, "accent", true), { at: OUT });
  const lineOut = put(sc, "lineOut", line([1.3, 0.2, 0.3], [OUT[0] - 0.2, OUT[1] - 0.2, 0], "soft"));
  const screen = put(sc, "screen", quad(1.4, 0.55, "soft"), { at: [0, 1.25, 0] });
  const logs: Part[] = []; for (let i = 0; i < 4; i++) logs.push(put(sc, `log${i}`, line([-0.55, 1.42 - 0.11 * i, 0.01], [0.2 + 0.1 * (i % 2), 1.42 - 0.11 * i, 0.01], "accent")));
  const clock = put(sc, "clock", ring(0.28, 12, "soft", "z"), { at: [-2.4, -0.9, 0] });
  const hand = put(sc, "hand", line([-2.4, -0.9, 0], [-2.4, -0.64, 0], "accent"));
  sc.mesh.labels = [L([IN[0], 1.1, 0], "Patient's blood cells in"), L([0, -1.05, 0], "Sealed single-use cassette (Prodigy, Cocoon, Cell Shuttle, Sefia)"), L([0, 1.85, 0], "Recipe runs and logs itself"), L([OUT[0], 1.1, 0], "CAR-T product out")];
  const base = sc.mesh.points;
  return frame(sc, 14, (t, pts, alpha) => {
    hide(alpha, ...cells, ...logs, bagOut, lineOut, hand); show(alpha, 0.3, magnet, activ, virus, culture, screen, clock);
    const s = stageOf(t);
    const run = (a: number, to: number) => cells.forEach((c, i) => { const v = ((t * 2 + i / 6) % 1) * to; moveTo(pts, base, c, [-1.3, 0.2, 0.3], [1.3, 0.2, 0.3], v); setAlpha(alpha, c, a); });
    if (s === 0) { const u = Q(t, 0); movePart(pts, base, bagIn, [0, 0, 0], 1 - 0.3 * u); run(u, 0.2); setAlpha(alpha, path, 0.4 + 0.6 * u); return { caption: "1 · A patient's blood cells enter a sealed single-use cassette; from here no hand touches them" }; }
    if (s === 1) { const u = Q(t, 1); movePart(pts, base, bagIn, [0, 0, 0], 0.7); run(1, 0.2 + 0.6 * u); cascade(alpha, [magnet, activ, virus, culture], u); movePart(pts, base, virus, [0, 0, 0], 1, t * TAU); movePart(pts, base, activ, [0, 0, 0], 1 + 0.2 * pulse(t, 4)); return { caption: "2 · Inside the box: magnetic selection, activation, viral transduction, then culture, all on one fluid path with integrated centrifugation and sensors" }; }
    if (s === 2) { const u = Q(t, 2); movePart(pts, base, bagIn, [0, 0, 0], 0.7); run(1, 0.8); show(alpha, 1, magnet, activ, virus, culture); movePart(pts, base, virus, [0, 0, 0], 1, t * TAU); setAlpha(alpha, screen, 1); cascade(alpha, logs, u); setAlpha(alpha, clock, 1); setAlpha(alpha, hand, u); movePart(pts, base, hand, [0, 0, 0], 1, u * TAU * 0.75); return { caption: "3 · Software runs the recipe and logs every step for batch release; a lower-grade clean room and far fewer operators suffice" }; }
    const u = Q(t, 3); movePart(pts, base, bagIn, [0, 0, 0], 0.7); run(1, 1); show(alpha, 1, magnet, activ, virus, culture, screen, ...logs, clock, hand); movePart(pts, base, virus, [0, 0, 0], 1, t * TAU); movePart(pts, base, hand, [0, 0, 0], 1, TAU * 0.75 + u * TAU * 0.25); grow(alpha, lineOut, u); setAlpha(alpha, bagOut, u); movePart(pts, base, bagOut, [0, 0, 0], 0.5 + 0.5 * u);
    return { caption: "4 · Harvested after 7 to 14 days of culture: fewer contamination events, reproducible products, and the prerequisite for point-of-care manufacturing; capital cost per unit and comparability between platforms remain the constraints" };
  });
}

export const WAVE5: Record<string, () => Mesh> = {
  "thyroid-fna-molecular": thyroidFnaMolecular,
  "reference-laboratories": referenceLaboratories,
  "prehabilitation": prehabilitation,
  "alcohol-reduction-labelling": alcoholReductionLabelling,
  "vitamin-d-omega3-supplementation": vitaminDOmega3,
  "red-processed-meat-reduction": redProcessedMeat,
  "hcc-surveillance": hccSurveillance,
  "cthpv-dna": ctHpvDna,
  "cachexia-therapy": cachexiaTherapy,
  "closed-automated-cell-manufacturing": closedAutomatedManufacturing,
};

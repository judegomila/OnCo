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

// ---------------------------------------------------------------- 11. viral vector manufacturing
export function viralVectorManufacturing(): Mesh {
  const sc = scene();
  const HEK: Vec3 = [-1.4, 0.1, 0];
  const producer = put(sc, "producer", cell(0.75, "soft"), { at: HEK });
  const NUC: Vec3 = [HEK[0] - 0.1, HEK[1], 0.1];
  put(sc, "nucleus", sphere(0.3, 4, 8, "soft", true), { at: NUC });
  const PL: Vec3[] = [[-2.8, 1.3, 0], [-2.4, 1.65, 0], [-2.0, 1.3, 0]];
  const plasmids: Part[] = PL.map((p, i) => put(sc, `pl${i}`, ring(0.14, 10, i === 1 ? "hot" : "accent", "z"), { at: p }));
  const virions: Part[] = []; for (let i = 0; i < 6; i++) virions.push(put(sc, `v${i}`, octahedron(0.1, "hot"), { at: [HEK[0] + 0.25, HEK[1] + 0.2 - 0.08 * i, 0.2] }));
  const COL: Vec3 = [0.9, 0.1, 0];
  const column = put(sc, "column", cylinder(0.25, 1.4, 10, 3, "accent", false, true), { at: COL });
  const resin = put(sc, "resin", cloud(10, 0.22, "accent", 7), { at: [COL[0], COL[1] - 0.2, 0] });
  const flowIn = put(sc, "flowIn", arrow([HEK[0] + 0.9, HEK[1] + 0.2, 0], [COL[0] - 0.3, COL[1] + 0.6, 0], "soft"));
  const flowOut = put(sc, "flowOut", arrow([COL[0], COL[1] - 0.75, 0], [COL[0] + 0.9, COL[1] - 1.0, 0], "soft"));
  const QC: Vec3 = [2.2, 0.3, 0];
  const qc = put(sc, "qc", doc(0.7, 0.9, 3), { at: QC });
  const ticksQc: Part[] = []; for (let i = 0; i < 3; i++) ticksQc.push(put(sc, `tk${i}`, polyline([[QC[0] - 0.24, QC[1] + 0.27 - 0.25 * i, 0.02], [QC[0] - 0.17, QC[1] + 0.2 - 0.25 * i, 0.02], [QC[0] - 0.07, QC[1] + 0.34 - 0.25 * i, 0.02]], "accent")));
  const dose = put(sc, "dose", vial(0.14, 0.4, "hot"), { at: [2.2, -1.1, 0] });
  const cal = put(sc, "cal", ticks(-2.6, -0.4, -1.6, 5, "soft"));
  const gap = put(sc, "gap", box(1.1, 0.22, 0.05, "hot", true), { at: [-1.5, -1.6, 0] });
  sc.mesh.labels = [L([HEK[0], -1.05, 0], "HEK293 producer cell"), L([-2.4, 2.1, 0], "Packaging and transfer plasmids"), L([COL[0], 1.15, 0], "Chromatography"), L([QC[0], 1.05, 0], "Titre, potency, replication competence")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...virions, flowIn, flowOut, qc, ...ticksQc, dose, gap); show(alpha, 0.3, column, resin, cal);
    const s = stageOf(t);
    const bud = (a: number, k: number) => virions.forEach((v, i) => { const ang = TAU * i / 6; const from: Vec3 = [HEK[0] + 0.25, HEK[1] + 0.2 - 0.08 * i, 0.2]; const to: Vec3 = [HEK[0] + 0.95 * Math.cos(ang), HEK[1] + 0.95 * Math.sin(ang), 0.2]; moveTo(pts, base, v, from, to, k, 1, t * TAU); setAlpha(alpha, v, a); });
    if (s === 0) { const u = Q(t, 0); plasmids.forEach((p, i) => { moveTo(pts, base, p, PL[i], [NUC[0] - 0.15 + 0.15 * i, NUC[1] + 0.1 - 0.1 * (i % 2), 0.2], u, 1 - 0.3 * u, u * TAU); setAlpha(alpha, p, 1); }); return { caption: "1 · Packaging and transfer plasmids are co-transfected into HEK293 producer cells (or built into a stable producer line)" }; }
    if (s === 1) { const u = Q(t, 1); plasmids.forEach((p, i) => { moveTo(pts, base, p, PL[i], [NUC[0] - 0.15 + 0.15 * i, NUC[1] + 0.1 - 0.1 * (i % 2), 0.2], 1, 0.7); setAlpha(alpha, p, 1 - 0.5 * u); }); bud(u, clamp(u * 1.4 - 0.4)); setAlpha(alpha, producer, 0.6 + 0.4 * pulse(t, 3)); return { caption: "2 · The cells assemble lentiviral particles carrying the CAR gene and release them into the culture medium" }; }
    if (s === 2) { const u = Q(t, 2); plasmids.forEach((p, i) => { moveTo(pts, base, p, PL[i], [NUC[0] - 0.15 + 0.15 * i, NUC[1] + 0.1 - 0.1 * (i % 2), 0.2], 1, 0.7); setAlpha(alpha, p, 0.5); }); virions.forEach((v, i) => { const ang = TAU * i / 6; const from: Vec3 = [HEK[0] + 0.25, HEK[1] + 0.2 - 0.08 * i, 0.2]; const out: Vec3 = [HEK[0] + 0.95 * Math.cos(ang), HEK[1] + 0.95 * Math.sin(ang), 0.2]; const w = clamp(u * 1.3 - 0.05 * i); const pos = lerp3(out, [COL[0] - 0.1 + 0.1 * (i % 2), COL[1] + 0.5 - 0.9 * w, 0.1], w); movePart(pts, base, v, [pos[0] - from[0], pos[1] - from[1], pos[2] - from[2]], 1 - 0.3 * w, t * TAU); setAlpha(alpha, v, 1); }); grow(alpha, flowIn, clamp(u * 2)); show(alpha, 1, column); setAlpha(alpha, resin, 0.5 + 0.5 * pulse(t, 4)); grow(alpha, flowOut, clamp(u * 2 - 1)); setAlpha(alpha, dose, clamp(u * 3 - 2)); return { caption: "3 · The harvest is purified by chromatography, then tested for titre, potency and replication-competent virus before it can touch a patient's T cells" }; }
    const u = Q(t, 3); plasmids.forEach((p, i) => { moveTo(pts, base, p, PL[i], [NUC[0] - 0.15 + 0.15 * i, NUC[1] + 0.1 - 0.1 * (i % 2), 0.2], 1, 0.7); setAlpha(alpha, p, 0.5); }); virions.forEach((v, i) => { const from: Vec3 = [HEK[0] + 0.25, HEK[1] + 0.2 - 0.08 * i, 0.2]; const to: Vec3 = [2.2, -1.05 + 0.05 * (i % 3), 0.1]; movePart(pts, base, v, [to[0] - from[0], to[1] - from[1], to[2] - from[2]], 0.5, t * TAU); setAlpha(alpha, v, 0.6); }); show(alpha, 1, flowIn, flowOut, column, resin, dose); setAlpha(alpha, qc, clamp(u * 2)); cascade(alpha, ticksQc, clamp(u * 1.5 - 0.3)); setAlpha(alpha, cal, 1); setAlpha(alpha, gap, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 3)));
    return { caption: "4 · Capacity shortages in 2018 to 2022 delayed trials; CDMOs (Lonza, Thermo Fisher, Charles River, Oxford Biomedica) and in-house plants have since expanded. Titre, empty-capsid ratio and cost per dose are the levers" };
  });
}

// ---------------------------------------------------------------- 12. radiotherapy treatment planning and QA software
export function treatmentPlanningSystems(): Mesh {
  const sc = scene();
  const CT: Vec3 = [-1.0, 0, 0];
  put(sc, "body", organ(1.25, 1.0, 0.2), { at: CT });
  const TGT: Vec3 = [CT[0] + 0.2, CT[1] + 0.1, 0.15];
  const target = put(sc, "target", blob(0.28), { at: TGT });
  const oar = put(sc, "oar", sphere(0.22, 4, 8, "accent", true), { at: [CT[0] - 0.5, CT[1] - 0.25, 0.15] });
  const gantry = put(sc, "gantry", ring(1.7, 28, "soft", "z"), { at: CT });
  const ANG = [0.3, 1.5, 2.7, 3.9, 5.1]; const beams: Part[] = [];
  for (const a of ANG) { const from: Vec3 = [CT[0] + 1.7 * Math.cos(a), CT[1] + 1.7 * Math.sin(a), 0.1]; const px = Math.cos(a + Math.PI / 2), py = Math.sin(a + Math.PI / 2); beams.push(put(sc, `beam${beams.length}`, polyline([from, [TGT[0] + 0.14 * px, TGT[1] + 0.14 * py, 0.1], [TGT[0] - 0.14 * px, TGT[1] - 0.14 * py, 0.1]], "accent", true))); }
  const HEAD0: Vec3 = [CT[0] + 1.7, CT[1], 0];
  const head = put(sc, "head", box(0.35, 0.25, 0.25, "accent", true), { at: HEAD0 });
  const dose: Part[] = []; for (let i = 0; i < 3; i++) dose.push(put(sc, `dose${i}`, ring(0.34 + 0.17 * i, 14, i === 0 ? "hot" : "accent", "z"), { at: [TGT[0], TGT[1], 0.18] }));
  const SCR: Vec3 = [1.9, 0.7, 0];
  const screen = put(sc, "screen", quad(1.3, 0.9, "soft"), { at: SCR });
  const dvh = put(sc, "dvh", polyline([[SCR[0] - 0.5, SCR[1] + 0.3, 0.01], [SCR[0] - 0.1, SCR[1] + 0.28, 0.01], [SCR[0] + 0.1, SCR[1] - 0.1, 0.01], [SCR[0] + 0.5, SCR[1] - 0.32, 0.01]], "hot"));
  const dvh2 = put(sc, "dvh2", polyline([[SCR[0] - 0.5, SCR[1] + 0.3, 0.01], [SCR[0] - 0.42, SCR[1] - 0.1, 0.01], [SCR[0] - 0.2, SCR[1] - 0.32, 0.01]], "accent"));
  const PH: Vec3 = [1.9, -1.0, 0];
  const phantom = put(sc, "phantom", box(0.7, 0.5, 0.5, undefined, true), { at: PH });
  const detector = put(sc, "detector", cloud(9, 0.25, "accent", 3), { at: [PH[0], PH[1], 0.27] });
  const tick = put(sc, "tick", polyline([[PH[0] + 0.5, PH[1] - 0.1, 0.3], [PH[0] + 0.62, PH[1] - 0.25, 0.3], [PH[0] + 0.85, PH[1] + 0.12, 0.3]], "accent"));
  sc.mesh.labels = [L([CT[0], -2.0, 0], "Target and organ at risk on the CT"), L([CT[0], 2.05, 0], "Beams from many angles"), L([SCR[0], 1.35, 0], "Dose to target vs organ at risk"), L([PH[0], -1.55, 0], "Phantom QA before treatment")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...beams, head, ...dose, screen, dvh, dvh2, phantom, detector, tick); setAlpha(alpha, gantry, 0.25);
    const s = stageOf(t);
    const orbit = (a: number, k: number) => { const ang = k * TAU; movePart(pts, base, head, [1.7 * Math.cos(ang) - 1.7, 1.7 * Math.sin(ang), 0], 1); setAlpha(alpha, head, a); };
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, target, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, oar, clamp(u * 2 - 0.6)); return { caption: "1 · CT or MR images are contoured: the target volume and every organ at risk around it" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, gantry, 0.6); orbit(1, u); cascade(alpha, beams, u); return { caption: "2 · Inverse optimisation shapes the fluence of beams from many angles (IMRT, VMAT, protons) subject to the organ-at-risk constraints" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, gantry, 0.6); orbit(0.6, 1); show(alpha, 0.5, ...beams); cascade(alpha, dose, u); dose.forEach((d, i) => movePart(pts, base, d, [0, 0, 0], 0.6 + 0.4 * clamp(u * 3 - i))); setAlpha(alpha, screen, clamp(u * 2)); grow(alpha, dvh, clamp(u * 2 - 0.6)); grow(alpha, dvh2, clamp(u * 2 - 0.8)); return { caption: "3 · A Monte Carlo or convolution dose engine computes where the dose lands; automated planning cuts the work from days to hours" }; }
    const u = Q(t, 3); setAlpha(alpha, gantry, 0.6); orbit(0.6, 1); show(alpha, 0.5, ...beams); show(alpha, 1, ...dose, screen, dvh, dvh2); setAlpha(alpha, phantom, clamp(u * 2)); setAlpha(alpha, detector, clamp(u * 2 - 0.5) * (0.5 + 0.5 * pulse(t, 5))); grow(alpha, tick, clamp(u * 2 - 1));
    return { caption: "4 · Before the first fraction a phantom measurement or log-file analysis (Sun Nuclear, IBA Dosimetry, PTW, RadCalc) verifies the machine delivers what was planned; adaptive radiotherapy multiplies that QA" };
  });
}

// ---------------------------------------------------------------- 13. PET tracer manufacturing and distribution
export function petTracerManufacturing(): Mesh {
  const sc = scene();
  const CYC: Vec3 = [-2.5, 0.6, 0];
  const cyclotron = put(sc, "cyclotron", cylinder(0.5, 0.3, 12, 2, "soft", true, true), { at: CYC, rotX: Math.PI / 2 });
  const PH: Vec3 = [-0.3, 0.1, 0];
  put(sc, "pharmacy", box(2.0, 1.4, 1.1, undefined, true), { at: PH });
  const MOD: Vec3 = [PH[0] - 0.45, PH[1] + 0.1, 0.3];
  const mod = put(sc, "module", box(0.7, 0.6, 0.5, "accent", true), { at: MOD });
  const cassette = put(sc, "cassette", quad(0.5, 0.35, "accent"), { at: [MOD[0], MOD[1], MOD[2] + 0.26] });
  const iso: Part[] = []; for (let i = 0; i < 4; i++) iso.push(put(sc, `iso${i}`, dots([[0, 0, 0]], "hot"), { at: [CYC[0] + 0.5, CYC[1], 0] }));
  const feed = put(sc, "feed", line([CYC[0] + 0.5, CYC[1], 0], [MOD[0] - 0.35, MOD[1], MOD[2]], "soft"));
  const QCB: Vec3 = [PH[0] + 0.5, PH[1] + 0.1, 0.3];
  const qc = put(sc, "qc", box(0.5, 0.5, 0.4, "soft", true), { at: QCB });
  const qcTick = put(sc, "qcTick", polyline([[QCB[0] - 0.15, QCB[1], 0.52], [QCB[0] - 0.03, QCB[1] - 0.12, 0.52], [QCB[0] + 0.2, QCB[1] + 0.2, 0.52]], "accent"));
  const HOSP: Vec3[] = [[1.9, 1.3, 0], [2.7, 0.3, 0], [2.0, -1.0, 0]];
  const hosps: Part[] = HOSP.map((h, i) => put(sc, `h${i}`, box(0.4, 0.4, 0.3, "soft", true), { at: h }));
  const D0: Vec3 = [PH[0] + 1.0, PH[1], 0];
  const doses: Part[] = []; for (let i = 0; i < 3; i++) doses.push(put(sc, `dose${i}`, vial(0.08, 0.22, "hot"), { at: D0 }));
  const clock = put(sc, "clock", ring(0.3, 12, "soft", "z"), { at: [-2.5, -1.2, 0] });
  const hand = put(sc, "hand", line([-2.5, -1.2, 0], [-2.5, -0.92, 0], "hot"));
  const kit = put(sc, "kit", box(0.3, 0.3, 0.3, "accent", true), { at: [1.1, -1.4, 0] });
  sc.mesh.labels = [L([CYC[0], 1.4, 0], "Cyclotron isotope"), L([PH[0], 1.25, 0], "cGMP radiopharmacy: cassette synthesis, then QC"), L([2.3, 1.85, 0], "Hospitals, every day"), L([-2.5, -1.75, 0], "Decay clock")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...iso, qcTick, ...doses, kit, hand); show(alpha, 0.3, mod, cassette, qc, ...hosps, clock);
    const s = stageOf(t);
    const ship = (k: number) => doses.forEach((d, i) => { moveTo(pts, base, d, D0, HOSP[i], clamp(k * 1.4 - 0.2 * i)); setAlpha(alpha, d, k > 0 ? 1 : 0); });
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, cyclotron, 0.6 + 0.4 * pulse(t, 5)); iso.forEach((p, i) => { const v = (t * 3 + i / 4) % 1; moveTo(pts, base, p, [CYC[0] + 0.5, CYC[1], 0], [MOD[0] - 0.35, MOD[1], MOD[2]], v); setAlpha(alpha, p, u); }); return { caption: "1 · A short-lived isotope from the cyclotron arrives at a cGMP radiopharmacy (PETNET, Cardinal Health, SOFIE, Jubilant, Curium) or an academic site" }; }
    if (s === 1) { const u = Q(t, 1); iso.forEach((p, i) => { const v = (t * 3 + i / 4) % 1; moveTo(pts, base, p, [CYC[0] + 0.5, CYC[1], 0], [MOD[0] - 0.35, MOD[1], MOD[2]], v); setAlpha(alpha, p, 1); }); setAlpha(alpha, mod, 0.3 + 0.7 * u); setAlpha(alpha, cassette, 0.3 + 0.7 * u * pulse(t, 4)); movePart(pts, base, cassette, [0, 0, 0], 1, u * TAU * 0.5); return { caption: "2 · An automated cassette module labels the tracer (FDG, PSMA agents, FES; FAPI in trials) behind shielding" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 1, mod, cassette); movePart(pts, base, cassette, [0, 0, 0], 1, TAU * 0.5); setAlpha(alpha, qc, 0.3 + 0.7 * u); grow(alpha, qcTick, clamp(u * 1.5 - 0.3)); setAlpha(alpha, feed, 0.4); ship(clamp(u * 2 - 1.4) * 0.15); return { caption: "3 · Rapid QC on every batch, radiochemical purity and endotoxin, before release; each site needs its own approval for each tracer" }; }
    const u = Q(t, 3); show(alpha, 1, mod, cassette, qc, qcTick); movePart(pts, base, cassette, [0, 0, 0], 1, TAU * 0.5); setAlpha(alpha, feed, 0.4); ship(0.15 + 0.85 * u); hosps.forEach((h, i) => setAlpha(alpha, h, 0.3 + 0.7 * clamp(u * 1.4 - 0.2 * i))); setAlpha(alpha, clock, 1); setAlpha(alpha, hand, 1); movePart(pts, base, hand, [0, 0, 0], 1, u * TAU * 0.9); setAlpha(alpha, kit, clamp(u * 3 - 2));
    return { caption: "4 · Doses ship daily across the US and Europe against the decay clock; kits made up on site (Illuccix, Locametz) versus centrally produced doses (Pylarify) split the business model, and low-income countries are barely reached" };
  });
}

// ---------------------------------------------------------------- 14. sterile fill-finish and lyophilisation
export function sterileFillFinish(): Mesh {
  const sc = scene();
  const ISO: Vec3 = [-0.4, 0.2, 0];
  put(sc, "isolator", box(2.6, 1.4, 1.1, undefined, true), { at: ISO });
  put(sc, "belt", line([ISO[0] - 1.2, ISO[1] - 0.45, 0.3], [ISO[0] + 1.2, ISO[1] - 0.45, 0.3], "soft"));
  const V0: Vec3[] = []; const vials: Part[] = []; const fills: Part[] = [];
  for (let i = 0; i < 5; i++) { const p: Vec3 = [ISO[0] - 1.0 + 0.5 * i, ISO[1] - 0.3, 0.3]; V0.push(p); vials.push(put(sc, `v${i}`, cylinder(0.1, 0.3, 8, 2, undefined, false, true), { at: p })); fills.push(put(sc, `fill${i}`, disc(0.09, 8, "accent", "y"), { at: [p[0], p[1] - 0.08, p[2]] })); }
  const needle = put(sc, "needle", polyline([[ISO[0], ISO[1] + 0.6, 0.3], [ISO[0], ISO[1] + 0.05, 0.3]], "accent"));
  const drop = put(sc, "drop", dots([[0, 0, 0]], "accent"), { at: [ISO[0], ISO[1] + 0.05, 0.3] });
  const BULK: Vec3 = [-2.6, 0.9, 0];
  const bulk = put(sc, "bulk", box(0.5, 0.6, 0.4, "accent", true), { at: BULK });
  const pipe = put(sc, "pipe", polyline([[BULK[0] + 0.25, BULK[1], 0], [ISO[0] - 0.6, BULK[1], 0.3], [ISO[0], ISO[1] + 0.6, 0.3]], "soft"));
  const LYO: Vec3 = [1.9, 0.6, 0];
  const lyo = put(sc, "lyo", box(0.8, 0.8, 0.6, "soft", true), { at: LYO });
  const frost = put(sc, "frost", cloud(8, 0.3, "accent", 4), { at: [LYO[0], LYO[1], 0.32] });
  const insp = put(sc, "insp", ring(0.25, 12, "accent", "z"), { at: [1.9, -0.8, 0] });
  const inspBeam = put(sc, "inspBeam", line([1.65, -0.8, 0], [ISO[0] + 1.0, ISO[1] - 0.3, 0.3], "accent"));
  const plants: Part[] = []; for (let i = 0; i < 4; i++) plants.push(put(sc, `plant${i}`, box(0.3, 0.3, 0.3, "soft", true), { at: [-2.2 + 0.5 * i, -1.4, 0] }));
  const plantX = put(sc, "plantX", cross([-0.7, -1.4, 0.2], 0.2));
  sc.mesh.labels = [L([BULK[0], 1.5, 0], "Bulk drug: biologic, ADC, kit"), L([ISO[0], 1.25, 0], "Aseptic isolator: the filling line"), L([LYO[0], 1.35, 0], "Lyophiliser and 100% inspection"), L([-1.45, -1.85, 0], "A handful of plants")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...fills, drop, lyo, frost, insp, inspBeam, ...plants, plantX); setAlpha(alpha, needle, 0.3); setAlpha(alpha, pipe, 0.3);
    const s = stageOf(t);
    const conveyor = (k: number) => vials.forEach((v, i) => { moveTo(pts, base, v, V0[i], [V0[i][0] + 0.5, V0[i][1], V0[i][2]], k); moveTo(pts, base, fills[i], V0[i], [V0[i][0] + 0.5, V0[i][1], V0[i][2]], k); });
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, bulk, 0.6 + 0.4 * pulse(t, 3)); grow(alpha, pipe, u); setAlpha(alpha, needle, 0.3 + 0.7 * clamp(u * 2 - 1)); conveyor(0.2 * u); return { caption: "1 · Bulk drug, a biologic, an ADC or a radiopharmaceutical kit, is piped into an aseptic isolator; people stay outside" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, pipe, 1); setAlpha(alpha, needle, 1); const v = (t * 4) % 1; moveTo(pts, base, drop, [0, 0, 0], [0, -0.3, 0], v); setAlpha(alpha, drop, v < 0.85 ? 1 : 0); conveyor(0.2 + 0.3 * u); fills.forEach((f, i) => setAlpha(alpha, f, i <= 2 ? clamp(u * 3 - (2 - i)) : 0)); return { caption: "2 · Vials are filled by needle on a sterile line; ADCs and mRNA products are then lyophilised on a freeze-drying cycle tuned to the product's stability" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, pipe, 1); setAlpha(alpha, needle, 1); conveyor(0.5 + 0.3 * u); fills.forEach((f, i) => setAlpha(alpha, f, i <= 3 ? 1 : 0)); setAlpha(alpha, lyo, clamp(u * 2)); setAlpha(alpha, frost, clamp(u * 2 - 0.5) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, insp, clamp(u * 2 - 1)); setAlpha(alpha, inspBeam, clamp(u * 2 - 1) * pulse(t, 8)); return { caption: "3 · Every container passes 100% closure-integrity inspection: one leaking vial condemns the assumption of sterility" }; }
    const u = Q(t, 3); setAlpha(alpha, pipe, 1); setAlpha(alpha, needle, 1); conveyor(0.8 + 0.2 * u); show(alpha, 1, ...fills, lyo, frost, insp); setAlpha(alpha, inspBeam, 0.4); cascade(alpha, plants, clamp(u * 1.5)); setAlpha(alpha, plantX, clamp(u * 3 - 2)); plants.forEach((p, i) => { if (i === 3) setAlpha(alpha, p, clamp(u * 1.5) * (1 - 0.6 * clamp(u * 3 - 2))); }); vials.forEach((v, i) => setAlpha(alpha, v, 1 - 0.5 * clamp(u * 3 - 2) * (i % 2)));
    return { caption: "4 · Capacity sits with a few plants (Catalent, Vetter, Baxter, Thermo Fisher, Lonza, Samsung Biologics); in 2023 one sterile injectables plant (Intas/Accord) failed inspection and cisplatin and carboplatin ran short" };
  });
}

// ---------------------------------------------------------------- 15. oncology EHR modules and treatment pathways
export function hospitalInformationSystems(): Mesh {
  const sc = scene();
  const SCR: Vec3 = [-0.2, 0.3, 0];
  put(sc, "screen", quad(2.2, 1.5, "soft"), { at: SCR });
  put(sc, "stand", polyline([[SCR[0], SCR[1] - 0.75, 0], [SCR[0], SCR[1] - 1.05, 0], [SCR[0] - 0.4, SCR[1] - 1.05, 0], [SCR[0] + 0.4, SCR[1] - 1.05, 0]], "soft"));
  const rows: Part[] = []; for (let i = 0; i < 4; i++) rows.push(put(sc, `row${i}`, quad(1.8, 0.22, i === 1 ? "accent" : undefined), { at: [SCR[0], SCR[1] + 0.5 - 0.3 * i, 0.01] }));
  const doseLine = put(sc, "doseLine", line([SCR[0] - 0.8, SCR[1] - 0.55, 0.02], [SCR[0] + 0.2, SCR[1] - 0.55, 0.02], "accent"));
  const flag = put(sc, "flag", octahedron(0.12, "hot"), { at: [SCR[0] + 0.7, SCR[1] - 0.55, 0.05] });
  const DOC: Vec3 = [-2.4, -0.3, 0];
  put(sc, "clinician", figure(), { at: DOC, scale: 0.8 });
  const arm = put(sc, "arm", line([DOC[0] + 0.33, DOC[1] + 0.2, 0], [SCR[0] - 1.1, SCR[1] - 0.2, 0], "soft"));
  const pathway = put(sc, "pathway", polyline([[1.5, 1.3, 0], [1.5, 0.8, 0], [1.9, 0.3, 0], [1.9, -0.2, 0]], "accent"));
  const branch = put(sc, "branch", polyline([[1.5, 0.8, 0], [1.1, 0.3, 0], [1.1, -0.2, 0]], "soft"));
  const NODES: Vec3[] = [[1.5, 1.3, 0], [1.5, 0.8, 0], [1.9, 0.3, 0], [1.9, -0.2, 0], [1.1, 0.3, 0]];
  const nodes: Part[] = NODES.map((p, i) => put(sc, `n${i}`, small(0.07, i === 4 ? "soft" : "accent"), { at: p }));
  const pharm = put(sc, "pharm", box(0.5, 0.4, 0.4, "soft", true), { at: [1.4, -1.2, 0] });
  const linkP = put(sc, "linkP", arrow([SCR[0] + 0.9, SCR[1] - 0.7, 0], [1.15, -1.05, 0], "soft"));
  const DB: Vec3 = [2.7, -1.0, 0];
  const db = put(sc, "db", cylinder(0.3, 0.6, 10, 3, "accent", true, true), { at: DB });
  const flow = put(sc, "flow", arrow([SCR[0] + 1.1, SCR[1] - 0.3, 0], [DB[0] - 0.3, DB[1] + 0.3, 0], "accent"));
  sc.mesh.labels = [L([DOC[0], 1.05, 0], "Oncologist ordering"), L([SCR[0], 1.4, 0], "Regimen library, dose banding, safety check"), L([1.6, 1.75, 0], "Pathway (NCCN-aligned)"), L([DB[0], -1.55, 0], "Real-world data (mCODE)")];
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, ...rows, doseLine, flag, arm, pathway, branch, ...nodes, pharm, linkP, db, flow);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); grow(alpha, arm, clamp(u * 2)); cascade(alpha, rows, clamp(u * 1.5 - 0.3)); setAlpha(alpha, rows[1], clamp(u * 6 - 1) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "1 · The oncologist opens the regimen library in the oncology EHR (Epic Beacon, Cerner PowerChart Oncology, ARIA, MOSAIQ, OncoEMR) and picks a protocol" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 1, arm, ...rows); grow(alpha, doseLine, clamp(u * 2)); setAlpha(alpha, flag, clamp(u * 2 - 0.8) * (0.5 + 0.5 * pulse(t, 6))); movePart(pts, base, flag, [0, 0, 0], 1 + 0.4 * pulse(t, 6)); setAlpha(alpha, pharm, clamp(u * 2 - 1)); grow(alpha, linkP, clamp(u * 2 - 1)); return { caption: "2 · Doses are calculated and banded; safety checks fire at the point of ordering, and pharmacy and scheduling are pulled along" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 1, arm, ...rows, doseLine, pharm, linkP); setAlpha(alpha, flag, 0.5); grow(alpha, pathway, u); grow(alpha, branch, u); cascade(alpha, nodes, u); setAlpha(alpha, branch, 0.4 * clamp(u * 2)); setAlpha(alpha, nodes[4], 0.4 * clamp(u * 5 - 4)); return { caption: "3 · A pathway programme (Via Oncology/ClinicalPath, Value Pathways, Dana-Farber pathways) nudges toward evidence-based regimens and is tied to payer schemes; deviation needs a reason" }; }
    const u = Q(t, 3); show(alpha, 1, arm, ...rows, doseLine, pharm, linkP, pathway, ...nodes); setAlpha(alpha, flag, 0.5); setAlpha(alpha, branch, 0.4); setAlpha(alpha, nodes[4], 0.4); grow(alpha, flow, u); setAlpha(alpha, db, clamp(u * 2 - 0.5) * (0.6 + 0.4 * pulse(t, 3)));
    return { caption: "4 · Structured data (mCODE) flows out to real-world evidence and quality measurement; vendor fragmentation, clinician burden and the tension between compliance and individualisation remain" };
  });
}

// ---------------------------------------------------------------- 16. electronic patient-reported outcome symptom monitoring
export function eproSymptomMonitoring(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [-2.2, -0.2, 0];
  put(sc, "patient", figure(), { at: PAT });
  put(sc, "home", polyline([[PAT[0] - 0.9, -1.2, -0.3], [PAT[0] - 0.9, 1.0, -0.3], [PAT[0], 1.6, -0.3], [PAT[0] + 0.9, 1.0, -0.3], [PAT[0] + 0.9, -1.2, -0.3]], "soft"));
  const PH: Vec3 = [-1.1, 0.4, 0.2];
  put(sc, "phone", quad(0.45, 0.8, "soft"), { at: PH });
  const sliders: Part[] = []; const knobs: Part[] = [];
  for (let i = 0; i < 4; i++) { sliders.push(put(sc, `sl${i}`, line([PH[0] - 0.15, PH[1] + 0.25 - 0.16 * i, 0.21], [PH[0] + 0.15, PH[1] + 0.25 - 0.16 * i, 0.21], "soft"))); knobs.push(put(sc, `kn${i}`, dots([[0, 0, 0]], i === 2 ? "hot" : "accent"), { at: [PH[0] - 0.15, PH[1] + 0.25 - 0.16 * i, 0.22] })); }
  const VAL = [0.3, 0.5, 0.95, 0.2];
  const alert = put(sc, "alert", arrow([PH[0] + 0.3, PH[1] + 0.1, 0], [0.5, 0.5, 0], "hot"));
  const NUR: Vec3 = [0.9, -0.2, 0];
  const nurse = put(sc, "nurse", figure("accent"), { at: NUR });
  const call = put(sc, "call", arrow([NUR[0] - 0.4, NUR[1] + 0.05, 0.1], [PAT[0] + 0.5, PAT[1] + 0.25, 0.1], "accent"));
  const week = put(sc, "week", ticks(PAT[0] - 0.8, PAT[0] + 0.8, -1.55, 7, "soft"));
  const er = put(sc, "er", box(0.45, 0.45, 0.3, "hot", true), { at: [0.2, -1.2, 0] });
  const erX = put(sc, "erX", cross([0.2, -1.2, 0.2], 0.2, "accent"));
  const AX: Vec3 = [1.7, -1.4, 0];
  const ax = put(sc, "axes", axes(AX, 1.5, 2.2));
  const barU = put(sc, "barU", bar(AX[0] + 0.45, 1.3, 0.28, "soft"), { at: [0, AX[1], 0] });
  const barE = put(sc, "barE", bar(AX[0] + 1.0, 1.56, 0.28, "accent"), { at: [0, AX[1], 0] });
  sc.mesh.labels = [L([-1.0, 1.4, 0], "Weekly symptom form (PRO-CTCAE)"), L([NUR[0], 1.05, 0], "Nurse alert and call-back"), L([0.2, -1.65, 0], "Emergency visits"), L([AX[0] + 0.75, AX[1] + 2.5, 0], "Survival, months: 26.0 vs 31.2")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, alert, nurse, call, er, erX, barU, barE); setAlpha(alpha, ax, 0.3); setAlpha(alpha, week, 0.5);
    const s = stageOf(t);
    const slide = (k: number) => knobs.forEach((kn, i) => moveTo(pts, base, kn, [0, 0, 0], [0.3 * VAL[i], 0, 0], clamp(k * 1.5 - 0.15 * i)));
    if (s === 0) { const u = Q(t, 0); slide(u); setAlpha(alpha, week, 1); return { caption: "1 · Each week the patient rates symptoms on a phone or web form (PRO-CTCAE, ESAS), from home" }; }
    if (s === 1) { const u = Q(t, 1); slide(1); setAlpha(alpha, knobs[2], 0.5 + 0.5 * pulse(t, 6)); grow(alpha, alert, clamp(u * 2)); setAlpha(alpha, nurse, clamp(u * 2 - 0.6)); grow(alpha, call, clamp(u * 2 - 1)); return { caption: "2 · A severe or worsening score triggers an alert; a nurse calls back the same day and adjusts medication or brings the patient in" }; }
    if (s === 2) { const u = Q(t, 2); slide(1); show(alpha, 1, alert, nurse, call); setAlpha(alpha, er, clamp(u * 2) * (1 - 0.5 * clamp(u * 2 - 1))); setAlpha(alpha, erX, clamp(u * 2 - 1)); return { caption: "3 · Problems are caught between visits: fewer emergency visits, more chemotherapy tolerated and better quality of life in 766 patients (MSK trial), confirmed in 52 community practices (PRO-TECT)" }; }
    const u = Q(t, 3); slide(1); show(alpha, 1, alert, nurse, call, erX); setAlpha(alpha, er, 0.5); setAlpha(alpha, ax, 1); setAlpha(alpha, barU, clamp(u * 2)); movePart(pts, base, barU, [0, -0.65 * (1 - clamp(u * 2)), 0], 1); setAlpha(alpha, barE, clamp(u * 2 - 0.5)); movePart(pts, base, barE, [0, -0.78 * (1 - clamp(u * 2 - 0.5)), 0], 1);
    return { caption: "4 · Overall survival 31.2 vs 26.0 months in that trial, and 22.5 vs 14.9 months in lung cancer follow-up (Moovcare); now a CMS Enhancing Oncology Model requirement. Alert fatigue and the digital divide are the limits" };
  });
}

// ---------------------------------------------------------------- 17. exercise during chemotherapy and radiotherapy
export function exerciseDuringChemotherapy(): Mesh {
  const sc = scene();
  const PAT: Vec3 = [-0.8, 0.1, 0];
  const pat = put(sc, "patient", figure(), { at: PAT });
  put(sc, "treadmill", box(1.2, 0.08, 0.5, "soft", true), { at: [PAT[0], PAT[1] - 0.92, 0] });
  put(sc, "pole", polyline([[-2.0, -0.8, 0], [-2.0, 1.4, 0], [-1.7, 1.4, 0]], "soft"));
  put(sc, "bag", box(0.3, 0.45, 0.14, "accent", true), { at: [-1.7, 1.15, 0] });
  const iv = put(sc, "iv", polyline([[-1.7, 0.92, 0], [-1.4, 0.5, 0], [PAT[0] - 0.4, PAT[1] + 0.3, 0.05]], "accent"));
  const heart = put(sc, "heart", blob(0.16, "hot"), { at: [PAT[0] - 0.07, PAT[1] + 0.4, 0.15] });
  const muscles: Part[] = [-0.19, 0.19].map((dx, i) => put(sc, `m${i}`, ellipsoid(0.11, 0.28, 0.11, 4, 8, "accent", true), { at: [PAT[0] + dx, PAT[1] - 0.4, 0.1] }));
  const nerve = put(sc, "nerve", polyline([[PAT[0] + 0.3, PAT[1] + 0.56, 0.1], [PAT[0] + 0.42, PAT[1] + 0.26, 0.15], [PAT[0] + 0.38, PAT[1] - 0.04, 0.2]], "accent"));
  const inflam = put(sc, "inflam", cloud(8, 0.5, "hot", 6), { at: [PAT[0], PAT[1] + 0.3, 0.2] });
  const AX: Vec3 = [1.0, -1.3, 0];
  const ax = put(sc, "axes", axes(AX, 2.2, 2.2));
  const fatigue = put(sc, "fatigue", polyline([[AX[0] + 0.1, AX[1] + 1.6, 0], [AX[0] + 0.6, AX[1] + 1.45, 0], [AX[0] + 1.1, AX[1] + 1.05, 0], [AX[0] + 1.5, AX[1] + 0.7, 0]], "hot"));
  const fitness = put(sc, "fitness", polyline([[AX[0] + 0.1, AX[1] + 1.0, 0], [AX[0] + 0.6, AX[1] + 1.04, 0], [AX[0] + 1.1, AX[1] + 1.14, 0], [AX[0] + 1.5, AX[1] + 1.2, 0]], "accent"));
  const doseRef = put(sc, "doseRef", line([AX[0] + 1.65, AX[1] + 1.9, 0], [AX[0] + 2.15, AX[1] + 1.9, 0], "soft"));
  const doseBar = put(sc, "doseBar", bar(AX[0] + 1.9, 1.9, 0.25, "accent"), { at: [0, AX[1], 0] });
  sc.mesh.labels = [L([-1.85, 1.75, 0], "Chemotherapy running"), L([PAT[0], -1.4, 0], "Heart, muscle, nerve"), L([AX[0] + 0.8, AX[1] + 2.5, 0], "Fatigue falls, fitness holds"), L([AX[0] + 1.9, AX[1] - 0.35, 0], "Full-dose completion")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, fatigue, fitness, doseBar, doseRef); setAlpha(alpha, ax, 0.3);
    const s = stageOf(t);
    const jog = (a: number) => { const b = a * 0.06 * Math.abs(Math.sin(t * TAU * 6)); movePart(pts, base, pat, [0, b, 0], 1); [heart, nerve, ...muscles].forEach((p) => movePart(pts, base, p, [0, b, 0], 1)); };
    if (s === 0) { const u = Q(t, 0); grow(alpha, iv, clamp(u * 2)); setAlpha(alpha, inflam, u * (0.5 + 0.5 * pulse(t, 5))); muscles.forEach((m) => movePart(pts, base, m, [0, 0, 0], 1 - 0.3 * u)); setAlpha(alpha, heart, 1 - 0.5 * u); setAlpha(alpha, nerve, 1 - 0.6 * u); return { caption: "1 · Cytotoxic treatment deconditions: inflammatory signals, muscle loss, fatigue, strain on heart and peripheral nerve" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, inflam, 1 - 0.6 * u); jog(u); muscles.forEach((m) => movePart(pts, base, m, [0, 0.06 * u * Math.abs(Math.sin(t * TAU * 6)), 0], 0.7)); setAlpha(alpha, heart, 0.5 + 0.5 * u * pulse(t, 6)); setAlpha(alpha, nerve, 0.4); return { caption: "2 · Supervised aerobic and resistance sessions run through the treatment weeks; home-based and remotely supervised formats keep most of the benefit" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, inflam, 0.4 - 0.3 * u); jog(1); muscles.forEach((m) => movePart(pts, base, m, [0, 0.06 * Math.abs(Math.sin(t * TAU * 6)), 0], 0.7 + 0.3 * u)); setAlpha(alpha, heart, 0.5 + 0.5 * pulse(t, 6)); setAlpha(alpha, nerve, 0.4 + 0.6 * u); setAlpha(alpha, ax, 1); grow(alpha, fatigue, u); grow(alpha, fitness, u); return { caption: "3 · Muscle protein synthesis and mitochondrial function are maintained; fatigue falls and fitness holds, in more than a hundred randomised trials (Cochrane, the 2019 ACSM roundtable)" }; }
    const u = Q(t, 3); setAlpha(alpha, inflam, 0.1); jog(1); muscles.forEach((m) => movePart(pts, base, m, [0, 0.06 * Math.abs(Math.sin(t * TAU * 6)), 0], 1)); setAlpha(alpha, heart, 0.5 + 0.5 * pulse(t, 6)); setAlpha(alpha, nerve, 1); setAlpha(alpha, ax, 1); show(alpha, 1, fatigue, fitness); setAlpha(alpha, doseRef, u); setAlpha(alpha, doseBar, u); movePart(pts, base, doseBar, [0, -0.95 * (1 - u), 0], 1);
    return { caption: "4 · More patients finish chemotherapy at full dose (PACES in breast cancer); smaller trials hint at less neuropathy and cardiotoxicity, and none has shown harm with stable blood counts. A survival effect during treatment is unproven" };
  });
}

// ---------------------------------------------------------------- 18. MSI and mismatch-repair testing
export function msiMmrTesting(): Mesh {
  const sc = scene();
  const NUC: Vec3 = [-1.6, 0.2, 0];
  put(sc, "nucleus", cell(0.9, "soft"), { at: NUC });
  const dna = put(sc, "dna", helix(0.15, 1.2, 4, 30), { at: NUC, rotZ: Math.PI / 2 });
  const repeat = put(sc, "repeat", ticks(NUC[0] - 0.4, NUC[0] + 0.4, NUC[1] - 0.45, 6, "soft"));
  const errs: Part[] = []; for (let i = 0; i < 4; i++) errs.push(put(sc, `err${i}`, dots([[0, 0, 0]], "hot"), { at: [NUC[0] - 0.3 + 0.2 * i, NUC[1] - 0.3 + 0.1 * (i % 2), 0.12] }));
  const prots: Part[] = []; for (let i = 0; i < 4; i++) prots.push(put(sc, `p${i}`, sphere(0.13, 3, 8, i === 0 ? "hot" : "accent", true), { at: [NUC[0] - 0.45 + 0.3 * i, NUC[1] + 0.45, 0.2] }));
  const SL: Vec3 = [0.9, 0.95, 0];
  const slide = put(sc, "slide", quad(1.4, 0.5, "soft"), { at: SL });
  const wells: Part[] = []; for (let i = 0; i < 4; i++) wells.push(put(sc, `w${i}`, disc(0.12, 8, i === 0 ? undefined : "accent", "z"), { at: [SL[0] - 0.45 + 0.3 * i, SL[1], 0.01] }));
  const PCR: Vec3 = [0.9, -0.5, 0];
  const pcrAx = put(sc, "pcrAx", axes([PCR[0] - 0.7, PCR[1] - 0.4, 0], 1.4, 0.8));
  const peaks = put(sc, "peaks", polyline([[PCR[0] - 0.6, PCR[1] - 0.4, 0], [PCR[0] - 0.45, PCR[1] + 0.2, 0], [PCR[0] - 0.3, PCR[1] - 0.4, 0], [PCR[0] - 0.15, PCR[1] + 0.3, 0], [PCR[0], PCR[1] - 0.4, 0], [PCR[0] + 0.15, PCR[1] + 0.1, 0], [PCR[0] + 0.3, PCR[1] - 0.4, 0], [PCR[0] + 0.45, PCR[1] + 0.15, 0], [PCR[0] + 0.6, PCR[1] - 0.4, 0]], "hot"));
  const PEM: Vec3 = [2.5, 0.75, 0];
  const pembro = put(sc, "pembro", antibody(0.3, "accent"), { at: PEM });
  const tcell = put(sc, "tcell", cell(0.3, "accent"), { at: [2.5, -0.15, 0] });
  const fam: Part[] = [2.25, 2.75].map((x, i) => put(sc, `fam${i}`, figure("soft"), { at: [x, -1.3, 0], scale: 0.45 }));
  sc.mesh.labels = [L([NUC[0], -1.1, 0], "Copied DNA with a repeat run"), L([NUC[0], 1.4, 0], "MLH1, PMS2, MSH2, MSH6: one lost"), L([SL[0], 1.5, 0], "IHC, then PCR or NGS"), L([2.5, 1.35, 0], "Immunotherapy, and Lynch screening")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...errs, slide, ...wells, peaks, pembro, tcell, ...fam); setAlpha(alpha, pcrAx, 0.25); setAlpha(alpha, repeat, 0.4);
    const s = stageOf(t);
    movePart(pts, base, dna, [0, 0, 0], 1, t * TAU);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, prots, clamp(u * 2)); setAlpha(alpha, prots[0], clamp(u * 8) * (1 - 0.8 * clamp(u * 2 - 1))); movePart(pts, base, prots[0], [0, 0.4 * clamp(u * 2 - 1), 0], 1); setAlpha(alpha, repeat, 0.4 + 0.6 * u); cascade(alpha, errs, clamp(u * 2 - 1)); return { caption: "1 · Mismatch repair proteins (MLH1, PMS2, MSH2, MSH6) proofread copied DNA; when one is lost, insertion and deletion errors pile up at repetitive microsatellites" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 1, ...prots); setAlpha(alpha, prots[0], 0.2); movePart(pts, base, prots[0], [0, 0.4, 0], 1); setAlpha(alpha, repeat, 1); errs.forEach((e, i) => setAlpha(alpha, e, 0.5 + 0.5 * pulse(t + i * 0.1, 4))); setAlpha(alpha, slide, clamp(u * 2)); cascade(alpha, wells, clamp(u * 2 - 0.3)); setAlpha(alpha, wells[0], 0.2 * clamp(u * 2 - 0.3)); setAlpha(alpha, pcrAx, 0.25 + 0.75 * clamp(u * 2 - 1)); grow(alpha, peaks, clamp(u * 2 - 1)); return { caption: "2 · Immunohistochemistry shows the missing protein; PCR at five or more markers (MSI-high) or an NGS panel (FoundationOne CDx, TSO Comprehensive) reads the instability directly" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 1, ...prots, repeat, slide, ...wells, pcrAx, peaks); setAlpha(alpha, prots[0], 0.2); movePart(pts, base, prots[0], [0, 0.4, 0], 1); setAlpha(alpha, wells[0], 0.2); show(alpha, 1, ...errs); setAlpha(alpha, pembro, clamp(u * 2)); moveTo(pts, base, pembro, PEM, [PEM[0], PEM[1] - 0.45, 0.1], clamp(u * 2 - 0.5)); setAlpha(alpha, tcell, clamp(u * 2 - 0.3) * (0.6 + 0.4 * pulse(t, 4))); movePart(pts, base, tcell, [0, 0, 0], 1 + 0.3 * clamp(u * 2 - 1)); return { caption: "3 · About 15% of colorectal, 25 to 30% of endometrial and smaller fractions of gastric cancers are dMMR; their hypermutation answers unusually well to pembrolizumab (first tissue-agnostic approval, 2017) and dostarlimab (2021)" }; }
    const u = Q(t, 3); show(alpha, 1, ...prots, repeat, slide, ...wells, pcrAx, peaks, ...errs, pembro); setAlpha(alpha, prots[0], 0.2); movePart(pts, base, prots[0], [0, 0.4, 0], 1); setAlpha(alpha, wells[0], 0.2); moveTo(pts, base, pembro, PEM, [PEM[0], PEM[1] - 0.45, 0.1], 1); setAlpha(alpha, tcell, 1); movePart(pts, base, tcell, [0, 0, 0], 1.3); cascade(alpha, fam, u);
    return { caption: "4 · Universal testing of colorectal and endometrial cancers doubles as Lynch syndrome screening: MLH1 promoter methylation and BRAF V600E separate sporadic from inherited loss, and germline confirmation needs a blood test. Immunotherapy still fails in about a third" };
  });
}

// ---------------------------------------------------------------- 19. multiparametric prostate MRI (PI-RADS)
export function mpMri(): Mesh {
  const sc = scene();
  const MRI: Vec3 = [-1.4, 0.1, 0];
  const bore = put(sc, "bore", ring(1.5, 28, "soft", "z"), { at: MRI });
  const bore2 = put(sc, "bore2", ring(1.5, 28, "soft", "z"), { at: [MRI[0], MRI[1], -0.5] });
  put(sc, "prostate", organ(0.7, 0.55, 0.5), { at: MRI });
  put(sc, "urethra", ring(0.1, 8, "soft", "z"), { at: [MRI[0], MRI[1] - 0.1, 0.5] });
  const lesion = put(sc, "lesion", blob(0.2), { at: [MRI[0] + 0.3, MRI[1] - 0.15, 0.4] });
  const psa = put(sc, "psa", vial(0.12, 0.35, "hot"), { at: [-2.9, 1.3, 0] });
  const layers: Part[] = []; for (let i = 0; i < 3; i++) layers.push(put(sc, `layer${i}`, quad(1.0, 0.8, i === 1 ? "accent" : "soft"), { at: [0.9, 0.95 - 0.15 * i, -0.2 * i] }));
  const spot = put(sc, "spot", disc(0.1, 8, "hot", "z"), { at: [1.1, 0.8, 0.01] });
  const scaleT = put(sc, "scale", ticks(0.3, 1.9, -0.4, 5, "soft"));
  const pointer = put(sc, "pointer", octahedron(0.1, "hot"), { at: [0.3, -0.4, 0] });
  const grid: Part[] = []; for (let i = 0; i < 6; i++) grid.push(put(sc, `gn${i}`, line([MRI[0] - 0.5 + 0.2 * i, MRI[1] - 1.35, 0.5], [MRI[0] - 0.5 + 0.2 * i, MRI[1] - 0.3 + 0.1 * (i % 2), 0.5], "soft")));
  const target = put(sc, "target", line([MRI[0] + 0.6, MRI[1] - 1.35, 0.5], [MRI[0] + 0.32, MRI[1] - 0.2, 0.45], "hot"));
  const AX: Vec3 = [2.1, -1.5, 0];
  const ax = put(sc, "axes", axes(AX, 1.0, 1.4));
  const barS = put(sc, "barS", bar(AX[0] + 0.3, 0.78, 0.22, "soft"), { at: [0, AX[1], 0] });
  const barT = put(sc, "barT", bar(AX[0] + 0.7, 1.14, 0.22, "accent"), { at: [0, AX[1], 0] });
  const spared = put(sc, "spared", figure("soft"), { at: [2.6, 0.9, 0], scale: 0.5 });
  const sparedTick = put(sc, "sparedTick", polyline([[2.85, 0.9, 0.1], [2.95, 0.78, 0.1], [3.15, 1.05, 0.1]], "accent"));
  sc.mesh.labels = [L([MRI[0], 1.9, 0], "Prostate in the scanner"), L([0.9, 1.6, 0], "T2, diffusion, contrast"), L([1.1, -0.75, 0], "PI-RADS 1 to 5"), L([AX[0] + 0.5, AX[1] - 0.35, 0], "Significant cancer found: 26% vs 38%")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, lesion, ...layers, spot, pointer, ...grid, target, barS, barT, spared, sparedTick); setAlpha(alpha, ax, 0.3); setAlpha(alpha, scaleT, 0.3); show(alpha, 0.3, bore, bore2);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, psa, 0.4 + 0.6 * pulse(t, 3)); show(alpha, 0.3 + 0.7 * u * pulse(t, 2), bore, bore2); return { caption: "1 · A raised PSA leads to an MRI before any biopsy, not after" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, psa, 0.5); show(alpha, 0.8, bore, bore2); cascade(alpha, layers, clamp(u * 1.5)); setAlpha(alpha, spot, clamp(u * 2 - 0.8) * (0.5 + 0.5 * pulse(t, 5))); setAlpha(alpha, lesion, clamp(u * 2 - 0.8)); setAlpha(alpha, scaleT, 1); setAlpha(alpha, pointer, clamp(u * 3 - 1)); moveTo(pts, base, pointer, [0.3, -0.4, 0], [1.5, -0.4, 0], clamp(u * 2 - 1)); return { caption: "2 · Three sequences, T2-weighted, diffusion-weighted and dynamic contrast, are read together and each lesion is scored PI-RADS 1 to 5 for the likelihood of significant cancer" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, psa, 0.5); show(alpha, 0.8, bore, bore2); show(alpha, 1, ...layers, spot, lesion, scaleT, pointer); moveTo(pts, base, pointer, [0.3, -0.4, 0], [1.5, -0.4, 0], 1); cascade(alpha, grid, clamp(u * 2)); grid.forEach((g) => setAlpha(alpha, g, 0.35 * clamp(u * 2) * (1 - 0.5 * clamp(u * 2 - 1)))); grow(alpha, target, clamp(u * 2 - 0.8)); setAlpha(alpha, ax, 1); [barS, barT].forEach((b, i) => { const k = clamp(u * 2 - 1 - 0.3 * i); setAlpha(alpha, b, k > 0 ? 1 : 0); movePart(pts, base, b, [0, -(i ? 0.57 : 0.39) * (1 - k), 0], 1); }); return { caption: "3 · Needles are aimed at the suspicious lesion instead of a blind grid: PRECISION (2018) found clinically significant cancer in 38% vs 26%, and less insignificant cancer" }; }
    const u = Q(t, 3); setAlpha(alpha, psa, 0.5); show(alpha, 0.8, bore, bore2); show(alpha, 1, ...layers, spot, lesion, scaleT, pointer, target, ax, barS, barT); moveTo(pts, base, pointer, [0.3, -0.4, 0], [1.5, -0.4, 0], 1); show(alpha, 0.15, ...grid); setAlpha(alpha, spared, clamp(u * 2)); grow(alpha, sparedTick, clamp(u * 2 - 0.8));
    return { caption: "4 · 28% of men with a clear scan avoided biopsy altogether; about 10% of significant cancers are still missed and readers vary, so AI reading (PI-CAI) now matches radiologists and relying on a negative scan in higher-risk men is debated" };
  });
}

// ---------------------------------------------------------------- 20. dermoscopy, total-body photography and AI skin analysis
export function dermoscopyAi(): Mesh {
  const sc = scene();
  const SKIN: Vec3 = [-1.7, -0.2, 0];
  put(sc, "skin", quad(1.8, 1.4, "soft"), { at: SKIN });
  const MOLE: Vec3 = [SKIN[0] + 0.1, SKIN[1], 0.01];
  const mole = put(sc, "mole", disc(0.22, 12, "hot", "z"), { at: MOLE });
  const net = put(sc, "net", cloud(10, 0.2, undefined, 5), { at: [MOLE[0], MOLE[1], 0.04] });
  const LENS0: Vec3 = [MOLE[0], 1.45, 0.7], LENS1: Vec3 = [MOLE[0], MOLE[1] + 0.05, 0.3];
  const lens = put(sc, "lens", cylinder(0.32, 0.2, 12, 2, "accent", true, true), { at: LENS0, rotX: Math.PI / 2 });
  const handle = put(sc, "handle", line([LENS0[0], LENS0[1], LENS0[2] + 0.1], [LENS0[0], LENS0[1] + 0.55, LENS0[2] + 0.45], "accent"));
  const FIG: Vec3 = [0.5, -0.2, 0];
  put(sc, "body", figure("soft"), { at: FIG, scale: 0.9 });
  const SP: Vec3[] = ([[-0.15, 0.4], [0.1, 0.2], [0.18, -0.2], [-0.12, -0.5], [0.05, 0.6]] as Array<[number, number]>).map((p) => [FIG[0] + p[0] * 0.9, FIG[1] + p[1] * 0.9, 0.12] as Vec3);
  const spots: Part[] = SP.map((p, i) => put(sc, `sp${i}`, dots([[0, 0, 0]], i === 2 ? "hot" : "accent"), { at: p }));
  const cam = put(sc, "cam", box(0.3, 0.2, 0.2, "soft", true), { at: [FIG[0] + 1.0, FIG[1] + 0.5, 0.5] });
  const flash = put(sc, "flash", line([FIG[0] + 0.85, FIG[1] + 0.5, 0.5], [FIG[0] + 0.25, FIG[1] + 0.1, 0.15], "accent"));
  const NN: Vec3 = [2.3, 0.6, 0];
  const nn = put(sc, "nn", box(0.9, 0.7, 0.4, "accent", true), { at: NN });
  const nodes: Part[] = []; for (let c = 0; c < 3; c++) for (let r = 0; r < 3; r++) nodes.push(put(sc, `nn${c}${r}`, dots([[0, 0, 0]], "accent"), { at: [NN[0] - 0.3 + 0.3 * c, NN[1] + 0.2 - 0.2 * r, 0.22] }));
  const feed = put(sc, "feed", arrow([SKIN[0] + 0.9, SKIN[1] + 0.3, 0.1], [NN[0] - 0.5, NN[1], 0], "soft"));
  const verdict = put(sc, "verdict", quad(0.5, 0.25, "hot"), { at: [NN[0], NN[1] - 0.7, 0] });
  const scalpel = put(sc, "scalpel", polyline([[2.0, -1.2, 0], [2.5, -1.2, 0], [2.65, -1.28, 0]], "soft"));
  const scalpelX = put(sc, "scalpelX", cross([2.3, -1.2, 0.1], 0.2, "accent"));
  sc.mesh.labels = [L([SKIN[0], 2.0, 0], "Mole under the dermatoscope"), L([FIG[0], 1.2, 0], "Total-body photography"), L([NN[0], 1.25, 0], "Deep-learning classifier"), L([2.3, -1.6, 0], "Fewer benign excisions")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, net, ...spots, flash, nn, ...nodes, feed, verdict, scalpel, scalpelX); setAlpha(alpha, cam, 0.3);
    const s = stageOf(t);
    const scope = (k: number) => { moveTo(pts, base, lens, LENS0, LENS1, k); moveTo(pts, base, handle, LENS0, LENS1, k); };
    if (s === 0) { const u = Q(t, 0); scope(u); setAlpha(alpha, net, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4))); movePart(pts, base, mole, [0, 0, 0], 1 + 0.4 * clamp(u * 2 - 1)); return { caption: "1 · Polarised or immersion magnification shows the pigment network inside a mole that the naked eye cannot resolve" }; }
    if (s === 1) { const u = Q(t, 1); scope(1); setAlpha(alpha, net, 1); movePart(pts, base, mole, [0, 0, 0], 1.4); setAlpha(alpha, cam, 1); setAlpha(alpha, flash, pulse(t, 8) * clamp(u * 3)); cascade(alpha, spots, u); setAlpha(alpha, spots[2], clamp(u * 5 - 2) * (0.5 + 0.5 * pulse(t, 5))); return { caption: "2 · Sequential total-body photography maps every lesion in a high-risk patient, so change over time, not appearance alone, triggers action" }; }
    if (s === 2) { const u = Q(t, 2); scope(1); setAlpha(alpha, net, 1); movePart(pts, base, mole, [0, 0, 0], 1.4); setAlpha(alpha, cam, 1); setAlpha(alpha, flash, 0.3); show(alpha, 1, ...spots); grow(alpha, feed, clamp(u * 2)); setAlpha(alpha, nn, clamp(u * 2 - 0.5)); cascade(alpha, nodes, clamp(u * 2 - 0.7)); nodes.forEach((n, i) => setAlpha(alpha, n, clamp(clamp(u * 2 - 0.7) * 9 - i) * (0.4 + 0.6 * pulse(t + i * 0.07, 5)))); setAlpha(alpha, verdict, clamp(u * 3 - 2)); return { caption: "3 · Convolutional networks trained on labelled lesion images match dermatologists on benchmark sets; DermaSensor (elastic scattering spectroscopy, FDA 2024) is cleared for primary care" }; }
    const u = Q(t, 3); scope(1); setAlpha(alpha, net, 1); movePart(pts, base, mole, [0, 0, 0], 1.4); setAlpha(alpha, cam, 1); setAlpha(alpha, flash, 0.3); show(alpha, 1, ...spots, feed, nn, ...nodes, verdict); setAlpha(alpha, scalpel, clamp(u * 2)); setAlpha(alpha, scalpelX, clamp(u * 2 - 1)); setAlpha(alpha, mole, 1 - 0.4 * u);
    return { caption: "4 · Fewer benign excisions when used well; but performance drops on darker skin and rare subtypes, and no screening RCT has shown a mortality benefit" };
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
  "viral-vector-manufacturing": viralVectorManufacturing,
  "treatment-planning-systems": treatmentPlanningSystems,
  "pet-tracer-manufacturing": petTracerManufacturing,
  "sterile-fill-finish": sterileFillFinish,
  "hospital-information-systems-oncology": hospitalInformationSystems,
  "epro-symptom-monitoring": eproSymptomMonitoring,
  "exercise-during-chemotherapy": exerciseDuringChemotherapy,
  "msi-mmr-testing": msiMmrTesting,
  "mp-mri": mpMri,
  "dermoscopy-ai": dermoscopyAi,
};

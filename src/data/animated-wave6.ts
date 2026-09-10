/**
 * Wave 6 of animated technology schematics: forty more well-connected technologies that until now fell back to a
 * generic front placeholder (surveillance and screening programmes such as thyroid active surveillance, the NHS lung
 * health check and polygenic risk scores; supportive care with a trial record such as acupuncture, oral cryotherapy,
 * CBT-I, tai chi and hyperbaric oxygen; the infrastructure behind trials, sequencing, antibodies and cell therapy; and
 * frontier concepts such as logic gates, hypoxia prodrugs and histotripsy). Same conventions as ./animated-wave5.ts: a
 * scene of named parts around one focal object with a filled body, one to three animated actors, four captioned phases
 * on a 12-14 s loop, three or four plain labels, every mesh under 500 points. Numbers in captions come from the technology
 * record only. The viewer blends the last 14 % of the cycle back to frame 0, so each scene simply ends in its final state.
 *
 * Self-contained (imports only the wireframe primitives) so that ./animated.ts can spread WAVE6 into its registry without
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
/** Simple L-shaped chart axes with origin at `o`, width w and height h. */
const axes = (o: Vec3, w: number, h: number, cls = "soft") => polyline([[o[0], o[1] + h, 0], [o[0], o[1], 0], [o[0] + w, o[1], 0]], cls);
/** Two crossed strokes over a point (an X: advised against, ruled out). */
const cross = (c: Vec3, s = 0.25, cls = "hot") => { const m = line([c[0] - s, c[1] - s, c[2]], [c[0] + s, c[1] + s, c[2]], cls); add(m, line([c[0] - s, c[1] + s, c[2]], [c[0] + s, c[1] - s, c[2]], cls)); return m; };
/** Upright vial: a capped, filled cylinder. */
const vial = (r: number, h: number, cls?: string) => cylinder(r, h, 8, 2, cls, true, true);
/** Capsule / tablet: a small filled ellipsoid lying along x. */
const capsule = (s: number, cls = "accent") => ellipsoid(0.22 * s, 0.1 * s, 0.1 * s, 3, 8, cls, true);
/** Acupuncture needle: a thin shaft hanging down from the origin with a small handle ring. */
const needle = (len = 0.5, cls = "accent") => { const m = line([0, 0, 0], [0, -len, 0], cls); add(m, ring(0.04, 6, cls, "y"), { at: [0, 0, 0] }); return m; };
/** Small house outline (a home), centred at origin. */
const house = (w = 1.2, h = 0.8, cls = "soft") => polyline([[-w / 2, -h / 2, 0], [w / 2, -h / 2, 0], [w / 2, h / 2, 0], [0, h / 2 + 0.45, 0], [-w / 2, h / 2, 0]], cls, true);
/** Clock face in the XY plane: a filled rim and two hands. */
const clockFace = (r = 0.35, cls = "soft") => { const m = disc(r, 12, cls, "z"); add(m, line([0, 0, 0.01], [0, r * 0.7, 0.01], "accent")); add(m, line([0, 0, 0.01], [r * 0.5, 0, 0.01], "accent")); return m; };
function frame(sc: Scene, duration: number, fn: (t: number, pts: Vec3[], alpha: number[]) => { caption: string; labels?: Lbl[] }): Mesh {
  sc.mesh.animate = { duration, frame: (t) => { const pts = sc.mesh.points.map((p) => [p[0], p[1], p[2]] as Vec3); const alpha = sc.mesh.segments.map(() => 1); const r = fn(t, pts, alpha); return { points: pts, alpha, caption: r.caption, labels: r.labels ?? sc.mesh.labels }; } };
  return sc.mesh;
}
const L = (at: Vec3, text: string): Lbl => ({ at, text });

// ---------------------------------------------------------------- 1. active surveillance of papillary thyroid microcarcinoma
export function activeSurveillanceThyroid(): Mesh {
  const sc = scene();
  const THY: Vec3 = [-1.7, 0, 0];
  put(sc, "lobeL", organ(0.4, 0.68, 0.3), { at: [THY[0] - 0.48, 0, 0] });
  put(sc, "lobeR", organ(0.4, 0.68, 0.3), { at: [THY[0] + 0.48, 0, 0] });
  put(sc, "isthmus", box(0.5, 0.2, 0.2, "soft", true), { at: [THY[0], -0.25, 0] });
  const NOD: Vec3 = [THY[0] + 0.55, 0.2, 0.26];
  const nodule = put(sc, "nodule", blob(0.11), { at: NOD });
  const PR0: Vec3 = [THY[0] + 0.55, 1.5, 0.4];
  const probe = put(sc, "probe", box(0.5, 0.2, 0.3, "accent", true), { at: PR0 });
  const waves: Part[] = []; for (let i = 0; i < 3; i++) waves.push(put(sc, `w${i}`, ring(0.14 + 0.12 * i, 12, "accent", "y"), { at: [PR0[0], PR0[1] - 0.25 - 0.22 * i, PR0[2]] }));
  const tl = put(sc, "tl", ticks(0.1, 2.7, -1.1, 6, "soft"));
  const marker = put(sc, "marker", small(0.08, "accent"), { at: [0.1, -1.1, 0.05] });
  const ghosts: Part[] = []; for (let i = 0; i < 6; i++) ghosts.push(put(sc, `g${i}`, ring(0.11, 10, "hot", "z"), { at: [0.1 + 0.52 * i, -0.75, 0] }));
  const ruler = put(sc, "ruler", ticks(1.2, 2.0, 0.9, 4, "soft"));
  const thresh = put(sc, "thresh", line([2.0, 0.75, 0], [2.0, 1.15, 0], "hot"));
  const knife = put(sc, "knife", polyline([[1.0, 0.25, 0.1], [1.7, 0.25, 0.1], [1.85, 0.17, 0.1]], "soft"));
  const knifeX = put(sc, "knifeX", cross([1.4, 0.25, 0.15], 0.2));
  const stable = put(sc, "stable", bar(2.5, 1.2, 0.3, "soft"), { at: [0, -0.4, 0] });
  const grew = put(sc, "grew", bar(2.95, 0.14, 0.3, "hot"), { at: [0, -0.4, 0] });
  sc.mesh.labels = [L([THY[0], 1.05, 0], "Papillary microcarcinoma, 1 cm or less"), L([1.4, -1.45, 0], "Ultrasound every 6 to 12 months"), L([1.6, 1.4, 0], "Surgery only if it grows 3 mm or more"), L([2.7, 1.1, 0], "About 90% stable over a decade")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...waves, tl, marker, ...ghosts, ruler, thresh, knife, knifeX, stable, grew);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); waves.forEach((w, i) => { const v = (t * 4 + i / 3) % 1; setAlpha(alpha, w, u * (1 - v)); movePart(pts, base, w, [0, -0.3 * v, 0], 0.6 + 0.8 * v); }); setAlpha(alpha, nodule, 0.4 + 0.6 * u * pulse(t, 4)); return { caption: "1 · Ultrasound finds a papillary microcarcinoma of 1 cm or less, with no nodal or extrathyroidal disease" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, tl, 1); setAlpha(alpha, marker, 1); moveTo(pts, base, marker, [0.1, -1.1, 0.05], [2.7, -1.1, 0.05], u); cascade(alpha, ghosts, u); setAlpha(alpha, probe, 0.5 + 0.5 * pulse(t, 6)); waves.forEach((w) => setAlpha(alpha, w, 0.4 * pulse(t, 6))); return { caption: "2 · Instead of operating, serial ultrasound at 6 to 12 month intervals measures the nodule at each visit" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, tl, 0.5); setAlpha(alpha, marker, 0.5); moveTo(pts, base, marker, [0.1, -1.1, 0.05], [2.7, -1.1, 0.05], 1); show(alpha, 0.6, ...ghosts); grow(alpha, ruler, u); setAlpha(alpha, thresh, clamp(u * 3 - 1) * pulse(t, 5)); setAlpha(alpha, knife, clamp(u * 3 - 1)); setAlpha(alpha, knifeX, clamp(u * 3 - 2)); return { caption: "3 · Surgery is triggered only by growth of 3 mm or more or a nodal metastasis; delayed surgery is equally effective when needed" }; }
    const u = Q(t, 3); setAlpha(alpha, tl, 0.4); setAlpha(alpha, marker, 0.4); moveTo(pts, base, marker, [0.1, -1.1, 0.05], [2.7, -1.1, 0.05], 1); show(alpha, 0.4, ...ghosts); show(alpha, 0.6, ruler, thresh, knife, knifeX);
    setAlpha(alpha, stable, u); movePart(pts, base, stable, [0, -0.6 * (1 - u), 0], 1); setAlpha(alpha, grew, clamp(u * 2 - 1)); setAlpha(alpha, probe, 0.5);
    return { caption: "4 · About 90% remain stable over a decade, sparing lifelong thyroid hormone and voice or parathyroid injury" };
  });
}

// ---------------------------------------------------------------- 2. decentralised and hybrid clinical trials
export function decentralisedClinicalTrials(): Mesh {
  const sc = scene();
  const HUB: Vec3 = [0, 1.05, 0], HOME: Vec3 = [-2.2, -0.35, 0], LAB: Vec3 = [2.2, -0.35, 0];
  put(sc, "hub", box(1.1, 0.7, 0.6, "accent", true), { at: HUB });
  put(sc, "hubDoc", doc(0.5, 0.45, 3, "soft"), { at: [HUB[0], HUB[1], 0.32] });
  put(sc, "house", house(1.4, 0.9), { at: [HOME[0], HOME[1] + 0.1, -0.3] });
  put(sc, "patient", figure("soft"), { at: [HOME[0], HOME[1] - 0.05, 0], scale: 0.9 });
  const wear = put(sc, "wear", ring(0.07, 6, "accent", "x"), { at: [HOME[0] + 0.36, HOME[1] - 0.05, 0.1] });
  put(sc, "lab", box(0.9, 0.8, 0.6, "soft", true), { at: LAB });
  put(sc, "labRing", ring(0.28, 12, "soft", "z"), { at: [LAB[0], LAB[1] + 0.05, 0.32] });
  const screen = put(sc, "screen", quad(0.5, 0.35, "accent"), { at: [HOME[0] + 0.9, HOME[1] + 0.9, 0] });
  const consent = put(sc, "consent", line([HOME[0] + 1.15, HOME[1] + 0.9, 0], [HUB[0] - 0.55, HUB[1] - 0.1, 0], "accent"));
  const N0: Vec3 = [HUB[0] - 0.2, HUB[1] - 0.95, 0.2];
  const nurse = put(sc, "nurse", figure("accent"), { at: N0, scale: 0.7 });
  const bag = put(sc, "bag", vial(0.08, 0.2, "hot"), { at: [N0[0] + 0.3, N0[1] - 0.2, 0.2] });
  const P0: Vec3 = [HUB[0] + 0.3, HUB[1] - 0.6, 0.3];
  const parcel = put(sc, "parcel", box(0.3, 0.25, 0.25, "accent", true), { at: P0 });
  const toLab = put(sc, "toLab", arrow([HOME[0] + 0.55, HOME[1] - 0.6, 0.2], [LAB[0] - 0.55, LAB[1] - 0.3, 0.2], "soft"));
  const data1 = put(sc, "data1", arrow([LAB[0] - 0.2, LAB[1] + 0.45, 0], [HUB[0] + 0.45, HUB[1] - 0.3, 0], "accent"));
  const data2 = put(sc, "data2", arrow([HOME[0] + 0.45, HOME[1] + 0.3, 0.2], [HUB[0] - 0.5, HUB[1] - 0.35, 0.2], "accent"));
  const wearWaves: Part[] = []; for (let i = 0; i < 2; i++) wearWaves.push(put(sc, `ww${i}`, ring(0.12 + 0.1 * i, 8, "accent", "x"), { at: [HOME[0] + 0.36, HOME[1] - 0.05, 0.1] }));
  const iv = put(sc, "iv", vial(0.1, 0.35, "hot"), { at: [LAB[0] + 0.05, LAB[1] + 0.85, 0] });
  const ivLine = put(sc, "ivLine", polyline([[LAB[0] + 0.05, LAB[1] + 0.65, 0], [LAB[0] + 0.05, LAB[1] + 0.42, 0]], "hot"));
  sc.mesh.labels = [L([HUB[0], HUB[1] + 0.7, 0], "Central protocol"), L([HOME[0], HOME[1] - 1.35, 0], "Patient at home"), L([N0[0] - 0.9, N0[1] - 0.2, 0], "Mobile nurse and home shipping"), L([LAB[0], LAB[1] - 0.95, 0], "Local imaging and labs")];
  const base = sc.mesh.points;
  const NH: Vec3 = [HOME[0] + 0.75, HOME[1] - 0.15, 0.2], PH: Vec3 = [HOME[0] + 0.6, HOME[1] - 0.8, 0.3];
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, screen, consent, nurse, bag, parcel, toLab, data1, data2, ...wearWaves, iv, ivLine);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, screen, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 5))); grow(alpha, consent, clamp(u * 2 - 0.5)); return { caption: "1 · One central protocol; consent and follow-up visits happen by telehealth rather than at a distant centre" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 0.5, screen, consent); setAlpha(alpha, nurse, 1); moveTo(pts, base, nurse, N0, NH, u); setAlpha(alpha, bag, clamp(u * 3 - 2)); moveTo(pts, base, bag, [N0[0] + 0.3, N0[1] - 0.2, 0.2], [NH[0] + 0.3, NH[1] - 0.2, 0.2], u); setAlpha(alpha, parcel, 1); moveTo(pts, base, parcel, P0, PH, clamp(u * 1.3)); return { caption: "2 · A mobile nurse draws blood or gives treatment at home, and drug ships direct to the patient" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.4, screen, consent); setAlpha(alpha, nurse, 0.5); moveTo(pts, base, nurse, N0, NH, 1); setAlpha(alpha, parcel, 0.5); moveTo(pts, base, parcel, P0, PH, 1); grow(alpha, toLab, clamp(u * 2)); grow(alpha, data1, clamp(u * 2 - 0.6)); grow(alpha, data2, clamp(u * 2 - 0.8)); wearWaves.forEach((w, i) => setAlpha(alpha, w, clamp(u * 2 - 0.5) * pulse(t + i * 0.1, 5))); setAlpha(alpha, wear, 1); return { caption: "3 · Local imaging and labs, remote data capture and wearables feed results back to the coordinating site" }; }
    const u = Q(t, 3); show(alpha, 0.4, screen, consent, toLab, data1, data2); setAlpha(alpha, nurse, 0.5); moveTo(pts, base, nurse, N0, NH, 1); setAlpha(alpha, parcel, 0.5); moveTo(pts, base, parcel, P0, PH, 1); wearWaves.forEach((w) => setAlpha(alpha, w, 0.3));
    setAlpha(alpha, iv, u); grow(alpha, ivLine, u);
    return { caption: "4 · Oncology stays hybrid: IV drugs and imaging still need sites, so remote consent and local labs are the common elements (FDA guidance 2023-24)" };
  });
}

// ---------------------------------------------------------------- 3. glutamine for mucositis (and the weak case in neuropathy)
export function glutamineMucositis(): Mesh {
  const sc = scene();
  const slab = put(sc, "slab", quad(3.0, 0.5, "soft"), { at: [-0.4, -0.75, 0], rotX: Math.PI / 2 });
  for (let i = 0; i < 6; i++) put(sc, `c${i}`, sphere(0.2, 3, 8, "soft", true), { at: [-1.65 + 0.5 * i, -0.5, 0] });
  const beam = put(sc, "beam", cone(0.55, 1.5, 10, "accent", false), { at: [-0.4, 0.75, 0] });
  const chemo = put(sc, "chemo", cloud(8, 0.7, "hot", 2), { at: [-0.4, 0.5, 0] });
  const damage: Part[] = []; for (let i = 0; i < 6; i++) damage.push(put(sc, `d${i}`, ring(0.24, 8, "hot", "z"), { at: [-1.65 + 0.5 * i, -0.5, 0] }));
  const caps: Part[] = []; const C0: Vec3 = [2.2, 0.9, 0.2]; for (let i = 0; i < 3; i++) caps.push(put(sc, `cap${i}`, capsule(1), { at: [C0[0] - 0.1 * i, C0[1] - 0.25 * i, C0[2]] }));
  const glow: Part[] = []; for (let i = 0; i < 6; i++) glow.push(put(sc, `g${i}`, dots([[0, 0, 0]], "accent"), { at: [-1.65 + 0.5 * i, -0.5, 0.22] }));
  const ivBag = put(sc, "ivBag", vial(0.14, 0.4, "soft"), { at: [2.1, 1.1, 0] });
  const ivX = put(sc, "ivX", cross([2.1, 1.1, 0.2], 0.22));
  const nerve = put(sc, "nerve", polyline([[1.3, -1.3, 0], [1.7, -1.15, 0], [2.1, -1.3, 0], [2.5, -1.15, 0], [2.9, -1.3, 0]], "soft"));
  const nerveX = put(sc, "nerveX", cross([2.1, -1.22, 0.15], 0.2));
  sc.mesh.labels = [L([-0.4, -1.25, 0], "Oral mucosa"), L([-0.4, 1.7, 0], "Chemoradiation"), L([2.5, 0.5, 0], "Oral glutamine"), L([2.2, -1.65, 0], "IV in transplant, neuropathy: not recommended")];
  const base = sc.mesh.points;
  const capTo = (i: number): Vec3 => [-1.65 + 1.0 * i, -0.5, 0.3];
  const capFrom = (i: number): Vec3 => [C0[0] - 0.1 * i, C0[1] - 0.25 * i, C0[2]];
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, beam, chemo, ...damage, ...caps, ...glow, ivBag, ivX, nerve, nerveX);
    setAlpha(alpha, slab, 0.7);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, beam, u * (0.5 + 0.5 * pulse(t, 8))); setAlpha(alpha, chemo, u); movePart(pts, base, chemo, [0, -0.6 * ((t * 4) % 1), 0], 1); damage.forEach((d, i) => setAlpha(alpha, d, clamp(u * 6 - i) * pulse(t + i * 0.05, 5))); return { caption: "1 · Radiotherapy with chemotherapy for head and neck cancer injures the fast-dividing cells of the mouth lining" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, beam, 0.3); show(alpha, 0.8, ...damage); caps.forEach((c, i) => { setAlpha(alpha, c, 1); moveTo(pts, base, c, capFrom(i), capTo(i), clamp(u * 1.3 - 0.1 * i)); }); return { caption: "2 · Oral glutamine supplies the fuel that enterocytes and mucosal cells prefer, so repair can start" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, beam, 0.2); damage.forEach((d, i) => setAlpha(alpha, d, 0.8 * (1 - clamp(u * 6 - i)))); glow.forEach((g, i) => setAlpha(alpha, g, clamp(u * 6 - i) * pulse(t, 6))); caps.forEach((c, i) => { setAlpha(alpha, c, 1 - u); moveTo(pts, base, c, capFrom(i), capTo(i), 1); }); return { caption: "3 · Faster epithelial repair in small randomised trials; the 2020 MASCC/ISOO guideline suggests it for head and neck chemoradiation" }; }
    const u = Q(t, 3); setAlpha(alpha, beam, 0.2); show(alpha, 0.6, ...glow); setAlpha(alpha, ivBag, clamp(u * 2)); setAlpha(alpha, ivX, clamp(u * 3 - 1)); grow(alpha, nerve, clamp(u * 2)); setAlpha(alpha, nerveX, clamp(u * 3 - 2));
    return { caption: "4 · Not everywhere: parenteral glutamine is advised against in stem cell transplant, and the neuropathy trials are small and inconsistent" };
  });
}

// ---------------------------------------------------------------- 4. infusion pumps, ports and ambulatory chemotherapy devices
export function infusionDevices(): Mesh {
  const sc = scene();
  const F0: Vec3 = [-1.7, 0.1, 0];
  const person = put(sc, "person", figure("soft"), { at: F0, scale: 1.3 });
  const port = put(sc, "port", disc(0.13, 10, "accent", "z"), { at: [F0[0] + 0.2, F0[1] + 0.55, 0.12] });
  const cath = put(sc, "cath", polyline([[F0[0] + 0.2, F0[1] + 0.55, 0.1], [F0[0] + 0.1, F0[1] + 0.75, 0.05], [F0[0] + 0.02, F0[1] + 0.55, 0.02]], "accent"));
  const svc = put(sc, "svc", small(0.06, "accent"), { at: [F0[0] + 0.02, F0[1] + 0.55, 0.02] });
  const S0: Vec3 = [-0.7, 1.4, 0.4], S1: Vec3 = [F0[0] + 0.32, F0[1] + 0.68, 0.25];
  const needleP = put(sc, "needle", syringe(0.7, "accent"), { at: S0, rotZ: -0.7 });
  const pump = put(sc, "pump", box(0.9, 0.7, 0.4, "accent", true), { at: [0.6, 0.5, 0] });
  const rows: Part[] = []; for (let i = 0; i < 3; i++) rows.push(put(sc, `row${i}`, line([0.3, 0.7 - 0.2 * i, 0.21], [0.9 - 0.15 * (i % 2), 0.7 - 0.2 * i, 0.21], "soft")));
  const pumpLine = put(sc, "pumpLine", polyline([[0.15, 0.5, 0.1], [-0.6, 0.75, 0.15], [F0[0] + 0.3, F0[1] + 0.58, 0.15]], "accent"));
  const E0: Vec3 = [0.9, 1.5, 0.2];
  const elasto = put(sc, "elasto", ellipsoid(0.16, 0.42, 0.16, 4, 8, "hot", true), { at: E0 });
  const elLine = put(sc, "elLine", polyline([[E0[0], E0[1] - 0.42, 0.15], [E0[0] - 0.5, E0[1] - 0.7, 0.15], [F0[0] + 0.3, F0[1] + 0.58, 0.15]], "hot"));
  const hh = put(sc, "home", house(1.2, 0.8), { at: [2.2, 0.2, -0.3] });
  const clock = put(sc, "clock", clockFace(0.3), { at: [2.2, 1.35, 0] });
  const drips = put(sc, "drips", dots([[E0[0] - 0.15, E0[1] - 0.55, 0.15], [E0[0] - 0.3, E0[1] - 0.63, 0.15], [E0[0] - 0.45, E0[1] - 0.68, 0.15]], "hot"));
  const thromb = put(sc, "thromb", cross([F0[0] + 0.1, F0[1] + 0.75, 0.2], 0.12));
  const infect = put(sc, "infect", ring(0.2, 8, "hot", "z"), { at: [F0[0] + 0.2, F0[1] + 0.55, 0.14] });
  const errX = put(sc, "errX", cross([0.6, 0.5, 0.25], 0.22));
  sc.mesh.labels = [L([F0[0] + 0.9, F0[1] + 0.95, 0], "Implanted port, tip in the superior vena cava"), L([0.6, -0.2, 0], "Smart pump with drug library"), L([E0[0] + 0.5, E0[1] + 0.35, 0], "Elastomeric pump: 46-hour infusion at home")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, needleP, pump, ...rows, pumpLine, elasto, elLine, hh, clock, drips, thromb, infect, errX);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, port, u * (0.5 + 0.5 * pulse(t, 5))); grow(alpha, cath, clamp(u * 1.5 - 0.3)); setAlpha(alpha, svc, clamp(u * 2 - 1) * pulse(t, 6)); return { caption: "1 · A port is implanted: a subcutaneous reservoir with its catheter tip in the superior vena cava, for repeated access without vein damage" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, needleP, 1); moveTo(pts, base, needleP, S0, S1, clamp(u * 1.5)); setAlpha(alpha, pump, clamp(u * 2 - 0.5)); cascade(alpha, rows, clamp(u * 2 - 0.8)); grow(alpha, pumpLine, clamp(u * 2 - 1)); return { caption: "2 · A needle accesses the port; a smart pump meters the drug at a set rate, checked against its drug library" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, needleP, 0.4); moveTo(pts, base, needleP, S0, S1, 1); setAlpha(alpha, pump, 0.4 * (1 - u)); show(alpha, 0.4 * (1 - u), ...rows, pumpLine); setAlpha(alpha, elasto, clamp(u * 2)); grow(alpha, elLine, clamp(u * 2 - 0.4)); setAlpha(alpha, hh, clamp(u * 2 - 1)); setAlpha(alpha, clock, clamp(u * 2 - 1)); setAlpha(alpha, drips, clamp(u * 2 - 0.6) * pulse(t, 4)); return { caption: "3 · An elastomeric pump takes over: pressure alone pushes a 46-hour infusion such as FOLFOX while the patient goes home" }; }
    const u = Q(t, 3); setAlpha(alpha, needleP, 0.4); moveTo(pts, base, needleP, S0, S1, 1); show(alpha, 0.7, elasto, elLine, hh, clock); setAlpha(alpha, drips, 0.5); setAlpha(alpha, pump, 0.4); show(alpha, 0.4, ...rows);
    setAlpha(alpha, thromb, clamp(u * 3) * pulse(t, 5)); setAlpha(alpha, infect, clamp(u * 3 - 1) * pulse(t, 5)); setAlpha(alpha, errX, clamp(u * 3 - 2)); setAlpha(alpha, person, 1);
    return { caption: "4 · The safety issues: catheter thrombosis and port infection, pump programming errors, and device recalls (Alaris, 2020-23)" };
  });
}

// ---------------------------------------------------------------- 5. cancer interception vaccines
export function interceptionVaccination(): Mesh {
  const sc = scene();
  const F0: Vec3 = [-1.5, 0.05, 0];
  put(sc, "person", figure("soft"), { at: F0, scale: 1.3 });
  const node = put(sc, "node", small(0.12, "accent"), { at: [F0[0] + 0.25, F0[1] + 0.85, 0.15] });
  const S0: Vec3 = [-2.6, 1.6, 0.4], S1: Vec3 = [F0[0] - 0.55, F0[1] + 0.85, 0.3];
  const syr = put(sc, "syr", syringe(0.75, "accent"), { at: S0, rotZ: -1.1 });
  const A0: Vec3 = [F0[0] - 0.35, F0[1] + 0.55, 0.3];
  const ags = put(sc, "ags", cloud(6, 0.14, "accent", 4), { at: A0 });
  const T0: Vec3 = [F0[0] + 0.25, F0[1] + 0.85, 0.15];
  const tcells: Part[] = []; for (let i = 0; i < 4; i++) tcells.push(put(sc, `t${i}`, small(0.09, "accent"), { at: T0 }));
  const COL: Vec3 = [1.6, -0.3, 0];
  put(sc, "colon", tube(0.42, 2.2, "soft"), { at: COL });
  const bad = put(sc, "bad", blob(0.14), { at: [COL[0] + 0.3, COL[1] + 0.1, 0.2] });
  const badRing = put(sc, "badRing", ring(0.22, 10, "hot", "z"), { at: [COL[0] + 0.3, COL[1] + 0.1, 0.2] });
  const tl = put(sc, "tl", ticks(0.6, 2.7, -1.35, 5, "soft"));
  const endpoint = put(sc, "endpoint", ring(0.1, 8, "soft", "z"), { at: [2.7, -1.35, 0] });
  sc.mesh.labels = [L([F0[0], F0[1] + 1.5, 0], "Healthy high-risk person"), L([-2.3, 0.6, 0], "Shared frameshift neoantigens"), L([0.2, 1.3, 0], "Memory T cells"), L([COL[0], COL[1] - 0.85, 0], "Transformed cell in the colon")];
  const base = sc.mesh.points;
  const TT = (i: number): Vec3 => [F0[0] + 0.25 + 0.45 * Math.cos((TAU * i) / 4), F0[1] + 0.3 + 0.35 * Math.sin((TAU * i) / 4), 0.25];
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, syr, ags, ...tcells, bad, badRing, tl, endpoint);
    setAlpha(alpha, node, 0.3);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, node, 0.3 + 0.4 * u * pulse(t, 4)); return { caption: "1 · A Lynch syndrome carrier is healthy: no tumour burden and an intact immune system, but a high lifetime risk" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, syr, 1); moveTo(pts, base, syr, S0, S1, clamp(u * 1.6)); setAlpha(alpha, ags, clamp(u * 3 - 1)); moveTo(pts, base, ags, A0, T0, clamp(u * 2 - 1)); setAlpha(alpha, node, 0.3 + 0.7 * clamp(u * 2 - 1) * pulse(t, 5)); return { caption: "2 · An off-the-shelf vaccine carries the shared frameshift neoantigens a future tumour is predicted to express (Nous-209)" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, syr, 0.3); moveTo(pts, base, syr, S0, S1, 1); tcells.forEach((c, i) => { setAlpha(alpha, c, clamp(u * 3 - 0.3 * i)); moveTo(pts, base, c, T0, TT(i), clamp(u * 2 - 0.2 * i)); }); setAlpha(alpha, bad, clamp(u * 3 - 2) * pulse(t, 5)); setAlpha(alpha, badRing, clamp(u * 3 - 2)); return { caption: "3 · Memory T cells form and patrol; when a transformed cell appears in the bowel they can eliminate it before a cancer forms" }; }
    const u = Q(t, 3); setAlpha(alpha, syr, 0.3); moveTo(pts, base, syr, S0, S1, 1);
    tcells.forEach((c, i) => { setAlpha(alpha, c, 1); const dest: Vec3 = [COL[0] + 0.3 + 0.28 * Math.cos((TAU * i) / 4), COL[1] + 0.1 + 0.28 * Math.sin((TAU * i) / 4), 0.25]; moveTo(pts, base, c, T0, i < 2 ? dest : TT(i), i < 2 ? clamp(u * 1.6) : 1); });
    setAlpha(alpha, bad, (1 - clamp(u * 2 - 0.8)) * pulse(t, 5)); movePart(pts, base, bad, [0, 0, 0], 1 - 0.6 * clamp(u * 2 - 0.8)); setAlpha(alpha, badRing, 1 - clamp(u * 2 - 0.8)); grow(alpha, tl, u); setAlpha(alpha, endpoint, clamp(u * 3 - 2));
    return { caption: "4 · Asking a healthy person to accept risk sets a far higher safety bar, so trials run for years with adenoma or lesion endpoints" };
  });
}

// ---------------------------------------------------------------- 6. new short-read sequencing platforms
export function nextGenShortRead(): Mesh {
  const sc = scene();
  const FC: Vec3 = [-0.5, -0.5, 0];
  put(sc, "flowcell", quad(2.4, 1.2, "accent"), { at: FC, rotX: Math.PI / 2 });
  const clusters = put(sc, "clusters", cloud(14, 0.9, "soft", 5), { at: [FC[0], FC[1] + 0.03, FC[2]], rotX: Math.PI / 2 });
  const FR0: Vec3 = [-2.4, 1.3, 0];
  const fragFrom = (i: number): Vec3 => [FR0[0] + 0.3 * i, FR0[1] - 0.2 * i, 0.2 * i];
  const fragTo = (i: number): Vec3 => [FC[0] - 0.7 + 0.5 * i, FC[1] + 0.2, 0.2 * i - 0.2];
  const frags: Part[] = []; for (let i = 0; i < 3; i++) frags.push(put(sc, `f${i}`, helix(0.07, 0.35, 1.5, 10, "hot"), { at: fragFrom(i) }));
  const baseFrom = (i: number): Vec3 => [FC[0] - 0.6 + 0.4 * i, FC[1] + 0.9, 0.1];
  const baseTo = (i: number): Vec3 => [FC[0] - 0.6 + 0.4 * i, FC[1] + 0.1, 0.1];
  const bases: Part[] = []; for (let i = 0; i < 4; i++) bases.push(put(sc, `b${i}`, octahedron(0.07, "hot"), { at: baseFrom(i) }));
  const flashes: Part[] = []; for (let i = 0; i < 4; i++) flashes.push(put(sc, `fl${i}`, ring(0.14, 8, "hot", "y"), { at: [FC[0] - 0.6 + 0.4 * i, FC[1] + 0.06, 0.1] }));
  const cam = put(sc, "cam", box(0.7, 0.4, 0.5, "soft", true), { at: [FC[0], 1.35, 0] });
  const lens = put(sc, "lens", ring(0.14, 10, "soft", "y"), { at: [FC[0], 1.13, 0] });
  const readRows: Part[] = []; for (let i = 0; i < 4; i++) readRows.push(put(sc, `r${i}`, line([1.3, 0.9 - 0.25 * i, 0], [2.4 - 0.2 * (i % 2), 0.9 - 0.25 * i, 0], "accent")));
  const ax = put(sc, "ax", axes([1.3, -1.3, 0], 1.4, 1.0));
  const hs = [0.9, 0.55, 0.3];
  const bars: Part[] = []; for (let i = 0; i < 3; i++) bars.push(put(sc, `bar${i}`, bar(1.55 + 0.45 * i, hs[i], 0.25, i === 0 ? "soft" : "accent"), { at: [0, -1.3, 0] }));
  sc.mesh.labels = [L([FC[0] - 1.6, FC[1], 0], "Flow cell or open wafer"), L([FC[0], 1.8, 0], "Optical or electronic readout"), L([1.9, 1.25, 0], "Reads"), L([2.0, -1.65, 0], "Cost per genome falling")];
  const base = sc.mesh.points;
  const settle = (pts: Vec3[]) => { frags.forEach((f, i) => moveTo(pts, base, f, fragFrom(i), fragTo(i), 1, 1, TAU)); bases.forEach((b, i) => moveTo(pts, base, b, baseFrom(i), baseTo(i), 1)); };
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...frags, ...bases, ...flashes, cam, lens, ...readRows, ax, ...bars);
    setAlpha(alpha, clusters, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); frags.forEach((f, i) => { setAlpha(alpha, f, 1); moveTo(pts, base, f, fragFrom(i), fragTo(i), clamp(u * 1.4 - 0.15 * i), 1, u * TAU); }); setAlpha(alpha, clusters, 0.4 + 0.6 * clamp(u * 2 - 1)); return { caption: "1 · Fragments of tumour DNA attach to a flow cell or open wafer and are amplified into millions of clusters" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 0.5, ...frags); frags.forEach((f, i) => moveTo(pts, base, f, fragFrom(i), fragTo(i), 1, 1, TAU)); setAlpha(alpha, cam, 1); setAlpha(alpha, lens, 1); const k = Math.min(3, Math.floor(u * 4)); bases.forEach((b, i) => { setAlpha(alpha, b, i <= k ? 1 : 0); moveTo(pts, base, b, baseFrom(i), baseTo(i), clamp(u * 4 - i)); setAlpha(alpha, flashes[i], i === k ? pulse(t, 10) : 0); }); return { caption: "2 · Sequencing by synthesis or by expansion: each added base is read optically or electronically, across every cluster at once" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.5, ...frags, cam, lens); settle(pts); show(alpha, 0.6, ...bases); cascade(alpha, readRows, clamp(u * 1.5)); setAlpha(alpha, ax, clamp(u * 2 - 0.5)); bars.forEach((b, i) => { const v = clamp(u * 3 - 1 - 0.5 * i); setAlpha(alpha, b, v); movePart(pts, base, b, [0, -hs[i] * (1 - v) * 0.5, 0], 1); }); return { caption: "3 · Ultima, Element, Roche SBX, MGI and Singular now compete with Illumina, with sub-$100 genome claims" }; }
    const u = Q(t, 3); show(alpha, 0.5, ...frags, cam, lens, ax, ...bars); settle(pts); show(alpha, 0.6, ...bases);
    setAlpha(alpha, clusters, 0.4 + 0.6 * u * pulse(t, 4)); readRows.forEach((r, i) => setAlpha(alpha, r, 0.5 + 0.5 * clamp(u * 4 - i)));
    return { caption: "4 · Cheaper gigabases make whole-genome tumour-normal, high-depth ctDNA and single-cell studies routine, though every clinical assay must be revalidated" };
  });
}

// ---------------------------------------------------------------- 7. fish oil (EPA) for cancer cachexia
export function omega3Epa(): Mesh {
  const sc = scene();
  const MU: Vec3 = [-1.2, 0, 0];
  const muscle = put(sc, "muscle", organ(1.0, 0.45, 0.4), { at: MU });
  const fibres: Part[] = []; for (let i = 0; i < 3; i++) fibres.push(put(sc, `fb${i}`, line([MU[0] - 0.8, MU[1] - 0.15 + 0.15 * i, 0.42], [MU[0] + 0.8, MU[1] - 0.15 + 0.15 * i, 0.42], "soft")));
  const cyto: Part[] = []; for (let i = 0; i < 5; i++) cyto.push(put(sc, `cy${i}`, small(0.07, "hot"), { at: [MU[0] + 1.3 * Math.cos((TAU * i) / 5), MU[1] + 0.8 * Math.sin((TAU * i) / 5), 0.2] }));
  const C0: Vec3 = [1.9, 1.3, 0.2], C1: Vec3 = [1.4, 0.75, 0.2];
  const cap = put(sc, "cap", capsule(1.4, "accent"), { at: C0 });
  const ves = put(sc, "ves", tube(0.22, 1.6, "soft"), { at: [1.4, 0.35, 0] });
  const epa = put(sc, "epa", cloud(5, 0.3, "accent", 3), { at: [1.4, 0.35, 0] });
  const aa = put(sc, "aa", cloud(5, 0.3, "soft", 6), { at: [1.4, 0.35, 0] });
  const ax = put(sc, "ax", axes([0.6, -1.4, 0], 2.0, 1.0));
  const weight = put(sc, "weight", polyline([[0.6, -0.9, 0], [1.1, -0.92, 0], [1.6, -0.9, 0], [2.1, -0.93, 0], [2.6, -0.9, 0]], "accent"));
  const cochrane = put(sc, "cochrane", doc(0.6, 0.7, 4, "soft"), { at: [2.6, 1.2, 0] });
  sc.mesh.labels = [L([MU[0], MU[1] + 0.9, 0], "Skeletal muscle"), L([MU[0] - 1.6, MU[1] - 0.9, 0], "IL-6, TNF"), L([C0[0], C0[1] + 0.4, 0], "EPA capsule"), L([1.6, -1.7, 0], "Weight: no change")];
  const base = sc.mesh.points;
  const shrink = (pts: Vec3[], k: number) => { movePart(pts, base, muscle, [0, 0, 0], k); fibres.forEach((f) => movePart(pts, base, f, [0, 0, 0], k)); };
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, cap, ves, epa, aa, ax, weight, cochrane);
    const s = stageOf(t);
    const wobble = (u: number) => cyto.forEach((c, i) => movePart(pts, base, c, [0.15 * Math.sin(t * TAU * 3 + i), 0.1 * Math.cos(t * TAU * 2 + i), 0], 1 + 0.3 * u * pulse(t, 5)));
    if (s === 0) { const u = Q(t, 0); wobble(u); shrink(pts, 1 - 0.12 * u); show(alpha, 0.5 + 0.5 * u, ...cyto); return { caption: "1 · Cachexia: IL-6, TNF and proteolysis-inducing factor drive muscle breakdown that food alone does not reverse" }; }
    if (s === 1) { const u = Q(t, 1); wobble(1); shrink(pts, 0.88); setAlpha(alpha, cap, 1); moveTo(pts, base, cap, C0, C1, clamp(u * 1.5)); setAlpha(alpha, ves, clamp(u * 2)); setAlpha(alpha, aa, clamp(u * 2 - 0.5)); setAlpha(alpha, epa, clamp(u * 2 - 1)); return { caption: "2 · EPA from fish oil competes with arachidonic acid, reducing pro-inflammatory eicosanoids and cytokine-driven proteolysis" }; }
    if (s === 2) { const u = Q(t, 2); wobble(1); shrink(pts, 0.88); setAlpha(alpha, cap, 0.3); moveTo(pts, base, cap, C0, C1, 1); show(alpha, 0.5, ves, aa, epa); setAlpha(alpha, ax, clamp(u * 2)); grow(alpha, weight, clamp(u * 1.5 - 0.3)); show(alpha, 0.8, ...cyto); return { caption: "3 · In randomised trials the effect was too small to change weight, lean mass, quality of life or survival (Cochrane review, 2007)" }; }
    const u = Q(t, 3); wobble(1); shrink(pts, 0.88); setAlpha(alpha, cap, 0.3); moveTo(pts, base, cap, C0, C1, 1); show(alpha, 0.5, ves, aa, epa, ax, weight); show(alpha, 0.8, ...cyto);
    setAlpha(alpha, cochrane, u);
    return { caption: "4 · Safe and well tolerated, so EPA-enriched supplements stay an option inside dietitian-led nutrition, not a treatment for established cachexia" };
  });
}

// ---------------------------------------------------------------- 8. electronic patient-reported outcomes and remote monitoring
export function remotePatientMonitoring(): Mesh {
  const sc = scene();
  const PH: Vec3 = [-1.4, 0.2, 0];
  put(sc, "phone", quad(0.9, 1.6, "accent"), { at: PH });
  const lens = [0.35, 0.5, 0.25, 0.6];
  const items: Part[] = []; for (let i = 0; i < 4; i++) items.push(put(sc, `it${i}`, box(lens[i], 0.12, 0.05, i === 3 ? "hot" : "soft", true), { at: [PH[0] - 0.3 + lens[i] / 2, PH[1] + 0.5 - 0.3 * i, 0.05] }));
  put(sc, "patient", figure("soft"), { at: [-2.5, -0.15, 0], scale: 0.9 });
  const alert = put(sc, "alert", arrow([PH[0] + 0.5, PH[1] - 0.4, 0], [1.05, 0.15, 0], "hot"));
  const bell = put(sc, "bell", ring(0.16, 8, "hot", "z"), { at: [PH[0] + 0.15, PH[1] - 0.45, 0.06] });
  const N0: Vec3 = [1.5, -0.1, 0];
  const nurse = put(sc, "nurse", figure("accent"), { at: N0 });
  const dash = put(sc, "dash", quad(1.3, 0.8, "soft"), { at: [1.7, 1.3, -0.1] });
  const dashRows: Part[] = []; for (let i = 0; i < 3; i++) dashRows.push(put(sc, `dr${i}`, line([1.15, 1.55 - 0.25 * i, -0.05], [2.25 - 0.2 * (i % 2), 1.55 - 0.25 * i, -0.05], i === 1 ? "hot" : "accent")));
  const call = put(sc, "call", arrow([N0[0] - 0.4, N0[1] + 0.5, 0.1], [-2.15, 0.5, 0.1], "accent"));
  const ax = put(sc, "ax", axes([0.6, -1.5, 0], 2.0, 0.9));
  const curveA = put(sc, "curveA", polyline([[0.6, -0.7, 0], [1.1, -0.8, 0], [1.6, -0.95, 0], [2.1, -1.15, 0], [2.6, -1.3, 0]], "accent"));
  const curveB = put(sc, "curveB", polyline([[0.6, -0.7, 0], [1.1, -0.9, 0], [1.6, -1.1, 0], [2.1, -1.3, 0], [2.6, -1.45, 0]], "soft"));
  sc.mesh.labels = [L([PH[0], PH[1] + 1.15, 0], "Weekly symptom report (PRO-CTCAE)"), L([-0.2, -0.35, 0], "Threshold alert"), L([N0[0], N0[1] - 1.25, 0], "Nursing team"), L([1.7, 1.95, 0], "EHR dashboard")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, alert, bell, dash, ...dashRows, call, ax, curveA, curveB);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, items, u); items.forEach((it, i) => movePart(pts, base, it, [-(lens[i] / 2) * (1 - clamp(u * 4 - i)), 0, 0], 1)); return { caption: "1 · Each week the patient answers a validated PRO-CTCAE questionnaire on a phone or web app between visits" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, items[3], 0.5 + 0.5 * pulse(t, 6)); setAlpha(alpha, bell, clamp(u * 3) * pulse(t, 6)); movePart(pts, base, bell, [0, 0, 0], 1 + 0.5 * pulse(t, 6)); grow(alpha, alert, clamp(u * 1.5 - 0.3)); setAlpha(alpha, nurse, 0.5 + 0.5 * clamp(u * 2 - 1)); return { caption: "2 · A symptom crossing its threshold fires an alert routed to the clinical team" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, items[3], 0.8); show(alpha, 0.6, alert, bell); setAlpha(alpha, dash, clamp(u * 2)); cascade(alpha, dashRows, clamp(u * 2 - 0.5)); grow(alpha, call, clamp(u * 1.5 - 0.5)); return { caption: "3 · The nurse calls early, before an emergency visit; dashboards sit inside the EHR (Epic, Kaiku, Noona, Carevive)" }; }
    const u = Q(t, 3); show(alpha, 0.6, alert, bell, dash, ...dashRows, call); setAlpha(alpha, items[3], 0.8);
    setAlpha(alpha, ax, clamp(u * 2)); grow(alpha, curveB, clamp(u * 1.5 - 0.3)); grow(alpha, curveA, clamp(u * 1.5 - 0.5));
    return { caption: "4 · In Basch's randomised trials weekly reporting improved quality of life, cut ER visits and in one trial extended survival by five months" };
  });
}

// ---------------------------------------------------------------- 9. wigs, cranial prostheses and head coverings
export function wigsCranialProsthesis(): Mesh {
  const sc = scene();
  const HD: Vec3 = [-0.6, 0.1, 0];
  put(sc, "head", cell(0.7, "soft"), { at: HD });
  put(sc, "neck", cylinder(0.25, 0.5, 8, 2, "soft", false, true), { at: [HD[0], HD[1] - 0.85, 0] });
  const hairs: Part[] = []; for (let i = 0; i < 8; i++) { const a = -0.4 + (0.8 * i) / 7; hairs.push(put(sc, `h${i}`, polyline([[HD[0] + 0.72 * Math.sin(a), HD[1] + 0.72 * Math.cos(a), 0.15], [HD[0] + 0.95 * Math.sin(a), HD[1] + 0.95 * Math.cos(a) + 0.1, 0.15]], "hot"))); }
  const liner = put(sc, "liner", ring(0.7, 14, "accent", "y"), { at: [HD[0], HD[1] + 0.2, 0] });
  const W0: Vec3 = [1.9, 1.5, 0], WIGON: Vec3 = [HD[0], HD[1] + 0.35, 0];
  const wig = put(sc, "wig", ellipsoid(0.78, 0.5, 0.78, 3, 12, "accent", true), { at: W0 });
  const wigLines: Part[] = []; for (let i = 0; i < 3; i++) wigLines.push(put(sc, `wl${i}`, line([W0[0] - 0.6 + 0.3 * i, W0[1] + 0.25, 0.55], [W0[0] - 0.75 + 0.3 * i, W0[1] - 0.6, 0.6], "accent")));
  const nhs = put(sc, "nhs", box(0.8, 0.5, 0.4, "soft", true), { at: [-2.5, 1.0, 0] });
  const nhsLine = put(sc, "nhsLine", arrow([-2.05, 1.0, 0], [HD[0] - 0.8, HD[1] + 0.7, 0], "soft"));
  const rx = put(sc, "rx", doc(0.7, 0.9, 4, "accent"), { at: [1.9, -0.6, 0] });
  const rxLine = put(sc, "rxLine", arrow([1.5, -0.6, 0], [HD[0] + 0.8, HD[1] - 0.2, 0], "accent"));
  sc.mesh.labels = [L([HD[0], HD[1] - 1.45, 0], "Scalp"), L([HD[0] - 1.6, HD[1] + 0.2, 0], "Cap liner"), L([W0[0], W0[1] + 0.85, 0], "Wig fitted before hair loss"), L([1.9, -1.35, 0], "Prescription: cranial prosthesis")];
  const base = sc.mesh.points;
  const wigOn = (pts: Vec3[], alpha: number[]) => { setAlpha(alpha, wig, 1); moveTo(pts, base, wig, W0, WIGON, 1); wigLines.forEach((w) => { setAlpha(alpha, w, 1); moveTo(pts, base, w, W0, WIGON, 1); }); };
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, liner, ...wigLines, nhs, nhsLine, rx, rxLine);
    setAlpha(alpha, wig, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); hairs.forEach((h, i) => { const v = clamp(u * 2 - (i % 4) * 0.3); setAlpha(alpha, h, 1 - v); movePart(pts, base, h, [0.15 * v, -1.2 * v, 0], 1); }); setAlpha(alpha, wig, 0.4 + 0.6 * clamp(u * 3 - 2)); return { caption: "1 · Hair loss from chemotherapy is among its most distressing effects; fitting starts before the hair falls, so colour can be matched" }; }
    if (s === 1) { const u = Q(t, 1); hide(alpha, ...hairs); setAlpha(alpha, liner, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 5))); setAlpha(alpha, wig, 1); const v = clamp(u * 1.5 - 0.4); moveTo(pts, base, wig, W0, WIGON, v); wigLines.forEach((w, i) => { setAlpha(alpha, w, v * clamp(u * 4 - 1 - i)); moveTo(pts, base, w, W0, WIGON, v); }); return { caption: "2 · A soft cap liner protects the tender scalp; synthetic wigs are lighter and cheaper, human hair costs more and needs styling" }; }
    if (s === 2) { const u = Q(t, 2); hide(alpha, ...hairs); setAlpha(alpha, liner, 0.5); wigOn(pts, alpha); setAlpha(alpha, nhs, clamp(u * 2)); grow(alpha, nhsLine, clamp(u * 2 - 0.5)); return { caption: "3 · In the UK a wig comes on NHS prescription through the appliance department: free in Scotland, Wales and Northern Ireland, and for exempt groups in England" }; }
    const u = Q(t, 3); hide(alpha, ...hairs); setAlpha(alpha, liner, 0.5); wigOn(pts, alpha); show(alpha, 0.6, nhs, nhsLine);
    setAlpha(alpha, rx, clamp(u * 2)); grow(alpha, rxLine, clamp(u * 2 - 0.5));
    return { caption: "4 · In the US a prescription worded as a cranial prosthesis lets some insurers reimburse; charities and wig banks supply the rest" };
  });
}

// ---------------------------------------------------------------- 10. acupuncture for aromatase-inhibitor arthralgia
export function acupunctureAiArthralgia(): Mesh {
  const sc = scene();
  const F0: Vec3 = [-1.7, 0.05, 0];
  put(sc, "person", figure("soft"), { at: F0, scale: 1.3 });
  const JP: Vec3[] = [[F0[0] - 0.5, F0[1] - 0.05, 0.13], [F0[0] + 0.5, F0[1] - 0.05, 0.13], [F0[0] - 0.23, F0[1] - 0.55, 0.03], [F0[0] + 0.23, F0[1] - 0.55, 0.03]];
  const joints: Part[] = JP.map((p, i) => put(sc, `j${i}`, small(0.1, "hot"), { at: p }));
  const T0: Vec3 = [-2.7, 1.7, 0.2], T1: Vec3 = [F0[0], F0[1] + 0.95, 0.2];
  const tablet = put(sc, "tablet", disc(0.12, 10, "accent", "z"), { at: T0 });
  const needles: Part[] = JP.map((p, i) => put(sc, `n${i}`, needle(0.45, "accent"), { at: [p[0], p[1] + 1.0, p[2] + 0.15] }));
  const sham = put(sc, "sham", needle(0.45, "soft"), { at: [F0[0] + 0.9, F0[1] + 0.7, 0.2] });
  const ax = put(sc, "ax", axes([0.5, -1.4, 0], 2.3, 1.7));
  const hs = [2.05, 1.07, 0.99].map((v) => v * 0.7);
  const bars: Part[] = []; for (let i = 0; i < 3; i++) bars.push(put(sc, `b${i}`, bar(0.9 + 0.65 * i, hs[i], 0.3, i === 0 ? "accent" : "soft"), { at: [0, -1.4, 0] }));
  const tl = put(sc, "tl", ticks(0.6, 2.8, 0.85, 3, "soft"));
  const guide = put(sc, "guide", doc(0.6, 0.7, 4, "accent"), { at: [2.6, 1.5, 0] });
  sc.mesh.labels = [L([F0[0], F0[1] + 1.5, 0], "Aromatase inhibitor arthralgia"), L([F0[0] + 1.35, F0[1] + 0.3, 0], "True acupuncture"), L([1.55, -1.75, 0], "Worst pain drop, 0 to 10 scale"), L([1.7, 1.15, 0], "6, 24 and 52 weeks")];
  const base = sc.mesh.points;
  const needlesIn = (pts: Vec3[], alpha: number[]) => needles.forEach((n) => { setAlpha(alpha, n, 0.7); movePart(pts, base, n, [0, -1.0, 0], 1); });
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...needles, sham, ax, ...bars, tl, guide);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, tablet, 1); moveTo(pts, base, tablet, T0, T1, clamp(u * 1.5)); joints.forEach((j, i) => { const v = clamp(u * 3 - 1 - 0.3 * i); setAlpha(alpha, j, v * (0.5 + 0.5 * pulse(t, 5))); movePart(pts, base, j, [0, 0, 0], 1 + 0.5 * v * pulse(t, 5)); }); return { caption: "1 · Aromatase inhibitor tablets bring joint pain and stiffness, the main reason women stop them early" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, tablet, 0.3); moveTo(pts, base, tablet, T0, T1, 1); show(alpha, 0.8, ...joints); needles.forEach((n, i) => { const v = clamp(u * 4 - i); setAlpha(alpha, n, v); movePart(pts, base, n, [0, -1.0 * v, 0], 1); }); setAlpha(alpha, sham, clamp(u * 2 - 1) * 0.6); return { caption: "2 · Needling twice weekly for six weeks, then six weekly maintenance sessions; a sham-needle arm controls for expectation" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, tablet, 0.3); moveTo(pts, base, tablet, T0, T1, 1); needlesIn(pts, alpha); setAlpha(alpha, sham, 0.4); joints.forEach((j) => { setAlpha(alpha, j, 0.8 - 0.5 * u); movePart(pts, base, j, [0, 0, 0], 1 - 0.4 * u); }); setAlpha(alpha, ax, clamp(u * 2)); bars.forEach((b, i) => { const v = clamp(u * 3 - 0.5 - 0.5 * i); setAlpha(alpha, b, v); movePart(pts, base, b, [0, -hs[i] * (1 - v) * 0.5, 0], 1); }); return { caption: "3 · At six weeks worst pain fell 2.05 points on a 0 to 10 scale, versus 1.07 with sham and 0.99 on the waitlist (SWOG S1200, 226 women)" }; }
    const u = Q(t, 3); setAlpha(alpha, tablet, 0.3); moveTo(pts, base, tablet, T0, T1, 1); needlesIn(pts, alpha); setAlpha(alpha, sham, 0.4); joints.forEach((j) => { setAlpha(alpha, j, 0.3); movePart(pts, base, j, [0, 0, 0], 0.6); }); show(alpha, 1, ax, ...bars);
    grow(alpha, tl, clamp(u * 1.5)); setAlpha(alpha, guide, clamp(u * 2 - 1));
    return { caption: "4 · The gain held at 24 and 52 weeks; the 2022 SIO-ASCO pain guideline gives acupuncture a firm recommendation for this syndrome" };
  });
}

// ---------------------------------------------------------------- 11. acupuncture for chemotherapy-induced neuropathy
export function acupunctureNeuropathy(): Mesh {
  const sc = scene();
  const HAND: Vec3 = [-1.5, -0.3, 0];
  put(sc, "hand", organ(0.55, 0.75, 0.25), { at: HAND });
  const nerve = put(sc, "nerve", polyline([[HAND[0], 1.4, 0.1], [HAND[0] - 0.05, 0.6, 0.15], [HAND[0], -0.1, 0.2], [HAND[0] - 0.2, -0.75, 0.25], [HAND[0] + 0.2, -0.75, 0.25]], "soft"));
  const dmg: Part[] = []; for (let i = 0; i < 4; i++) dmg.push(put(sc, `dm${i}`, small(0.07, "hot"), { at: [HAND[0] - 0.3 + 0.2 * i, -0.85 + 0.05 * (i % 2), 0.28] }));
  const V0: Vec3 = [-2.6, 1.5, 0.2];
  const chemo = put(sc, "chemo", vial(0.14, 0.4, "hot"), { at: V0 });
  const drops = put(sc, "drops", dots([[V0[0] + 0.2, V0[1] - 0.4, 0.2], [V0[0] + 0.4, V0[1] - 0.6, 0.2], [V0[0] + 0.6, V0[1] - 0.75, 0.2]], "hot"));
  const NP: Vec3[] = [[HAND[0] - 0.25, HAND[1] + 0.3, 0.3], [HAND[0] + 0.25, HAND[1] + 0.1, 0.3], [HAND[0], HAND[1] - 0.25, 0.3]];
  const needles: Part[] = NP.map((p, i) => put(sc, `n${i}`, needle(0.4, "accent"), { at: [p[0], p[1] + 0.9, p[2]] }));
  const flow = put(sc, "flow", ring(0.45, 12, "accent", "z"), { at: [HAND[0], HAND[1], 0.32] });
  const ax = put(sc, "ax", axes([0.5, -1.4, 0], 2.4, 1.4));
  const hs = [0.5, 0.7, 0.4, 0.6];
  const bars: Part[] = []; for (let i = 0; i < 4; i++) bars.push(put(sc, `b${i}`, bar(0.85 + 0.5 * i, hs[i], 0.25, "accent"), { at: [0, -1.4, 0] }));
  const qm = put(sc, "qm", ring(0.25, 10, "hot", "z"), { at: [2.75, -0.6, 0] });
  const dulox = put(sc, "dulox", disc(0.14, 10, "soft", "z"), { at: [0.8, 1.2, 0] });
  const big = put(sc, "big", ring(0.5, 16, "accent", "z"), { at: [2.2, 1.1, 0] });
  const bigDots = put(sc, "bigDots", cloud(9, 0.35, "accent", 7), { at: [2.2, 1.1, 0.02] });
  sc.mesh.labels = [L([HAND[0], 1.7, 0], "Peripheral nerve"), L([V0[0], V0[1] + 0.45, 0], "Taxane, platinum, bortezomib"), L([HAND[0] + 1.2, HAND[1] + 0.9, 0], "Acupuncture points"), L([1.6, -1.75, 0], "Pilot trials of a few dozen patients")];
  const base = sc.mesh.points;
  const needlesIn = (pts: Vec3[], alpha: number[], a: number) => needles.forEach((n) => { setAlpha(alpha, n, a); movePart(pts, base, n, [0, -0.9, 0], 1); });
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...needles, flow, ax, ...bars, qm, dulox, big, bigDots);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, drops, u * pulse(t, 5)); movePart(pts, base, drops, [0.2 * ((t * 4) % 1), -0.3 * ((t * 4) % 1), 0], 1); dmg.forEach((d, i) => { const v = clamp(u * 4 - i); setAlpha(alpha, d, v * (0.5 + 0.5 * pulse(t, 6))); movePart(pts, base, d, [0, 0, 0], 0.5 + v); }); setAlpha(alpha, nerve, 1 - 0.4 * u); return { caption: "1 · Taxanes, oxaliplatin, cisplatin, vincristine and bortezomib damage the long nerves to hands and feet, sometimes permanently" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, chemo, 0.4); setAlpha(alpha, drops, 0); setAlpha(alpha, nerve, 0.6); show(alpha, 0.8, ...dmg); needles.forEach((n, i) => { const v = clamp(u * 3 - i); setAlpha(alpha, n, v); movePart(pts, base, n, [0, -0.9 * v, 0], 1); }); setAlpha(alpha, flow, clamp(u * 2 - 1) * pulse(t, 4)); movePart(pts, base, flow, [0, 0, 0], 0.7 + 0.6 * ((t * 4) % 1)); return { caption: "2 · Needling is proposed to improve microcirculation, modulate dorsal horn signalling and release endogenous opioids; none is established here" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, chemo, 0.4); setAlpha(alpha, drops, 0); setAlpha(alpha, nerve, 0.6); show(alpha, 0.7, ...dmg); needlesIn(pts, alpha, 0.7); setAlpha(alpha, flow, 0.3); setAlpha(alpha, ax, clamp(u * 2)); bars.forEach((b, i) => { const v = clamp(u * 3 - 0.4 * i); setAlpha(alpha, b, v); movePart(pts, base, b, [0, -hs[i] * (1 - v) * 0.5, 0], 1); }); setAlpha(alpha, qm, clamp(u * 3 - 2) * pulse(t, 4)); return { caption: "3 · Pilot randomised trials of a few dozen patients each report better symptom scores, but point protocols, controls and follow-up all differ" }; }
    const u = Q(t, 3); setAlpha(alpha, chemo, 0.4); setAlpha(alpha, drops, 0); setAlpha(alpha, nerve, 0.6); show(alpha, 0.7, ...dmg); needlesIn(pts, alpha, 0.7); setAlpha(alpha, flow, 0.3); show(alpha, 0.7, ax, ...bars); setAlpha(alpha, qm, 0.7);
    setAlpha(alpha, dulox, clamp(u * 2)); setAlpha(alpha, big, clamp(u * 2 - 0.5)); movePart(pts, base, big, [0, 0, 0], 0.4 + 0.6 * clamp(u * 2 - 0.5)); setAlpha(alpha, bigDots, clamp(u * 3 - 2) * (0.6 + 0.4 * pulse(t, 4)));
    return { caption: "4 · Systematic reviews call the evidence insufficient; duloxetine is the only drug with randomised support, and larger sham-controlled trials are recruiting" };
  });
}

// ---------------------------------------------------------------- 12. acupuncture for hot flushes on endocrine therapy
export function acupunctureHotFlushes(): Mesh {
  const sc = scene();
  const F0: Vec3 = [-1.6, 0.05, 0];
  put(sc, "person", figure("soft"), { at: F0, scale: 1.3 });
  const hypo = put(sc, "hypo", small(0.08, "accent"), { at: [F0[0], F0[1] + 1.02, 0.1] });
  const heat: Part[] = []; for (let i = 0; i < 3; i++) heat.push(put(sc, `ht${i}`, ring(0.3 + 0.12 * i, 12, "hot", "y"), { at: [F0[0], F0[1] + 0.2 + 0.25 * i, 0] }));
  const T0: Vec3 = [-2.7, 1.6, 0.2], T1: Vec3 = [F0[0], F0[1] + 0.95, 0.2];
  const tablet = put(sc, "tablet", disc(0.12, 10, "soft", "z"), { at: T0 });
  const NP: Vec3[] = [[F0[0] - 0.3, F0[1] + 0.35, 0.2], [F0[0] + 0.3, F0[1] + 0.35, 0.2]];
  const needles: Part[] = NP.map((p, i) => put(sc, `n${i}`, needle(0.4, "accent"), { at: [p[0], p[1] + 0.9, p[2]] }));
  const zig = put(sc, "zig", polyline([[NP[0][0], NP[0][1] + 0.02, 0.22], [NP[0][0] + 0.15, NP[0][1] + 0.12, 0.22], [NP[0][0] + 0.3, NP[0][1] - 0.06, 0.22], [NP[0][0] + 0.45, NP[0][1] + 0.12, 0.22], [NP[1][0], NP[1][1] + 0.02, 0.22]], "accent"));
  const signal = put(sc, "signal", line([F0[0] + 0.05, F0[1] + 0.4, 0.15], [F0[0] + 0.02, F0[1] + 0.98, 0.12], "accent"));
  const ax = put(sc, "ax", axes([0.5, -1.4, 0], 2.4, 1.6));
  const hs = [0.5, 0.85, 0.7, 1.1];
  const cls = ["accent", "soft", "accent", "soft"];
  const bars: Part[] = []; for (let i = 0; i < 4; i++) bars.push(put(sc, `b${i}`, bar(0.85 + 0.5 * i, hs[i], 0.25, cls[i]), { at: [0, -1.4, 0] }));
  const gaba = put(sc, "gaba", capsule(1.2, "soft"), { at: [1.35, -0.1, 0.25] });
  const tl = put(sc, "tl", ticks(0.6, 2.8, 1.0, 4, "soft"));
  const guide = put(sc, "guide", doc(0.6, 0.7, 4, "accent"), { at: [2.6, 1.6, 0] });
  sc.mesh.labels = [L([F0[0], F0[1] + 1.65, 0], "Hot flush on endocrine therapy"), L([F0[0] + 1.1, F0[1] + 1.1, 0], "Hypothalamic thermostat"), L([F0[0] + 1.3, F0[1] + 0.3, 0], "Electroacupuncture"), L([1.6, -1.75, 0], "Flush score: acupuncture, gabapentin, sham, placebo")];
  const base = sc.mesh.points;
  const needlesIn = (pts: Vec3[], alpha: number[], a: number) => needles.forEach((n) => { setAlpha(alpha, n, a); movePart(pts, base, n, [0, -0.9, 0], 1); });
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...needles, zig, signal, ax, ...bars, gaba, tl, guide);
    const s = stageOf(t);
    const flush = (k: number) => heat.forEach((h, i) => { const v = (t * 4 + i / 3) % 1; setAlpha(alpha, h, k * (1 - v)); movePart(pts, base, h, [0, 0.5 * v, 0], 0.8 + 0.6 * v); });
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, tablet, 1); moveTo(pts, base, tablet, T0, T1, clamp(u * 1.5)); flush(clamp(u * 2 - 0.5)); setAlpha(alpha, hypo, 0.5 + 0.5 * pulse(t, 6)); return { caption: "1 · On tamoxifen or an aromatase inhibitor most women get hot flushes, and oestrogen replacement is off the table" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, tablet, 0.3); moveTo(pts, base, tablet, T0, T1, 1); flush(0.6); needles.forEach((n, i) => { const v = clamp(u * 2.5 - i); setAlpha(alpha, n, v); movePart(pts, base, n, [0, -0.9 * v, 0], 1); }); setAlpha(alpha, zig, clamp(u * 3 - 1.5) * pulse(t, 10)); grow(alpha, signal, clamp(u * 3 - 2)); return { caption: "2 · Electroacupuncture: needles at set points carry a small current, aiming to reset the hypothalamic thermostat through beta-endorphin and serotonin" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, tablet, 0.3); moveTo(pts, base, tablet, T0, T1, 1); flush(0.6 - 0.4 * u); needlesIn(pts, alpha, 0.7); setAlpha(alpha, zig, 0.5); setAlpha(alpha, signal, 0.5); setAlpha(alpha, ax, clamp(u * 2)); bars.forEach((b, i) => { const v = clamp(u * 3 - 0.4 * i); setAlpha(alpha, b, v); movePart(pts, base, b, [0, -hs[i] * (1 - v) * 0.5, 0], 1); }); setAlpha(alpha, gaba, clamp(u * 3 - 1)); return { caption: "3 · In 120 survivors it cut flush scores more than gabapentin 900 mg a day at eight weeks, with fewer side effects (Mao, JCO 2015)" }; }
    const u = Q(t, 3); setAlpha(alpha, tablet, 0.3); moveTo(pts, base, tablet, T0, T1, 1); flush(0.2); needlesIn(pts, alpha, 0.7); setAlpha(alpha, zig, 0.5); setAlpha(alpha, signal, 0.5); show(alpha, 0.8, ax, ...bars, gaba);
    grow(alpha, tl, clamp(u * 1.5)); setAlpha(alpha, guide, clamp(u * 2 - 1));
    return { caption: "4 · Sham needling also beat placebo pills and effects lasted to 24 weeks: a real effect with a large non-specific part; the SIO 2017 guideline grades it an option" };
  });
}

// ---------------------------------------------------------------- 13. CAIX PET with 89Zr-girentuximab
export function caixPet(): Mesh {
  const sc = scene();
  const KID: Vec3 = [-1.5, 0, 0];
  put(sc, "kidney", organ(0.5, 0.85, 0.35), { at: KID });
  put(sc, "hilum", ring(0.14, 8, "soft", "z"), { at: [KID[0] + 0.4, KID[1], 0.05] });
  const MASS: Vec3 = [KID[0] - 0.25, KID[1] + 0.4, 0.3];
  const mass = put(sc, "mass", blob(0.22), { at: MASS });
  const caix: Part[] = []; for (let i = 0; i < 4; i++) caix.push(put(sc, `cx${i}`, line([MASS[0] + 0.2 * Math.cos((TAU * i) / 4), MASS[1] + 0.2 * Math.sin((TAU * i) / 4), MASS[2] + 0.05], [MASS[0] + 0.32 * Math.cos((TAU * i) / 4), MASS[1] + 0.32 * Math.sin((TAU * i) / 4), MASS[2] + 0.08], "hot")));
  const AB0: Vec3 = [1.0, 1.6, 0.3], AB1: Vec3 = [MASS[0] + 0.45, MASS[1] + 0.35, MASS[2] + 0.2];
  const ab = put(sc, "ab", antibody(0.5, "accent"), { at: AB0 });
  const zr = put(sc, "zr", octahedron(0.09, "accent"), { at: [AB0[0], AB0[1] - 0.55, AB0[2]] });
  const clock = put(sc, "clock", clockFace(0.32), { at: [0.6, 0.4, 0] });
  const det = put(sc, "det", ring(1.35, 20, "soft", "z"), { at: [KID[0] + 0.1, KID[1] + 0.1, 0] });
  const photons: Part[] = []; for (let i = 0; i < 3; i++) { const a = 0.4 + i * 1.1; photons.push(put(sc, `ph${i}`, line([MASS[0] - 1.2 * Math.cos(a), MASS[1] - 1.2 * Math.sin(a), 0], [MASS[0] + 1.2 * Math.cos(a), MASS[1] + 1.2 * Math.sin(a), 0], "accent"))); }
  const ax = put(sc, "ax", axes([1.3, -1.4, 0], 1.6, 1.3));
  const sens = put(sc, "sens", bar(1.75, 0.86 * 1.2, 0.3, "accent"), { at: [0, -1.4, 0] });
  const spec = put(sc, "spec", bar(2.35, 0.87 * 1.2, 0.3, "accent"), { at: [0, -1.4, 0] });
  const biopsy = put(sc, "biopsy", syringe(0.55, "soft"), { at: [-2.6, 1.2, 0.3], rotZ: -0.9 });
  const biopsyX = put(sc, "biopsyX", cross([-2.55, 1.0, 0.4], 0.2));
  const lu = put(sc, "lu", octahedron(0.09, "hot"), { at: [AB1[0], AB1[1] - 0.55, AB1[2]] });
  const crl = put(sc, "crl", doc(0.6, 0.7, 4, "soft"), { at: [1.4, 1.5, 0] });
  const crlX = put(sc, "crlX", cross([1.4, 1.5, 0.1], 0.22));
  sc.mesh.labels = [L([KID[0], KID[1] - 1.3, 0], "Indeterminate renal mass, CAIX on clear-cell RCC"), L([AB0[0] + 0.9, AB0[1] + 0.1, 0], "89Zr-girentuximab"), L([0.6, 0.85, 0], "PET at 5 days"), L([2.05, -1.7, 0], "Sensitivity 86%, specificity 87%")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...caix, ab, zr, clock, det, ...photons, ax, sens, spec, biopsy, biopsyX, lu, crl, crlX);
    const s = stageOf(t);
    const dock = (pts: Vec3[], v: number) => { moveTo(pts, base, ab, AB0, AB1, v); moveTo(pts, base, zr, AB0, AB1, v); };
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, mass, 0.5 + 0.5 * pulse(t, 4)); caix.forEach((c, i) => setAlpha(alpha, c, clamp(u * 4 - i))); setAlpha(alpha, biopsy, clamp(u * 2 - 1) * 0.6); return { caption: "1 · An indeterminate renal mass: clear-cell cancer or a benign lump? CAIX, a HIF target, is expressed in more than 95% of clear-cell RCC because of VHL loss" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 1, ...caix); setAlpha(alpha, biopsy, 0.4); setAlpha(alpha, ab, 1); setAlpha(alpha, zr, 1); dock(pts, clamp(u * 1.4)); setAlpha(alpha, clock, clamp(u * 2 - 0.5)); movePart(pts, base, clock, [0, 0, 0], 1, 0); return { caption: "2 · 89Zr-labelled girentuximab is injected and binds CAIX on the mass over the following days" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 1, ...caix); setAlpha(alpha, biopsy, 0.4); setAlpha(alpha, biopsyX, clamp(u * 3 - 2)); setAlpha(alpha, ab, 1); setAlpha(alpha, zr, 1); dock(pts, 1); setAlpha(alpha, clock, 0.6); setAlpha(alpha, det, clamp(u * 2)); photons.forEach((p, i) => setAlpha(alpha, p, clamp(u * 3 - 0.5 - 0.5 * i) * pulse(t + i * 0.1, 7))); setAlpha(alpha, ax, clamp(u * 2 - 0.5)); [sens, spec].forEach((b, i) => { const v = clamp(u * 3 - 1.2 - 0.5 * i); setAlpha(alpha, b, v); movePart(pts, base, b, [0, -0.5 * (1 - v), 0], 1); }); return { caption: "3 · Imaging 5 days later: in the ZIRCON phase 3 (2023) sensitivity was 86% and specificity 87%, histology-level answers plus whole-body staging without a biopsy" }; }
    const u = Q(t, 3); show(alpha, 1, ...caix); show(alpha, 0.4, biopsy, biopsyX, det); show(alpha, 0.3, ...photons); setAlpha(alpha, clock, 0.4); show(alpha, 0.8, ax, sens, spec);
    setAlpha(alpha, ab, 1); dock(pts, 1); setAlpha(alpha, zr, 1 - clamp(u * 2 - 0.6)); setAlpha(alpha, lu, clamp(u * 2 - 0.6) * (0.6 + 0.4 * pulse(t, 5))); setAlpha(alpha, crl, clamp(u * 2)); setAlpha(alpha, crlX, clamp(u * 3 - 1.5));
    return { caption: "4 · Not yet approved (FDA complete response letter 2025 over manufacturing); the same antibody labelled with 177Lu is in the STARLITE therapy trials" };
  });
}

// ---------------------------------------------------------------- 14. cystoscopy, blue-light imaging and TURBT
export function cystoscopyTurbt(): Mesh {
  const sc = scene();
  const BL: Vec3 = [0, 0.3, 0];
  put(sc, "bladder", cell(0.95, "soft"), { at: BL });
  put(sc, "urethra", cylinder(0.14, 1.0, 8, 2, "soft"), { at: [BL[0], BL[1] - 1.3, 0] });
  const PAP: Vec3 = [BL[0] - 0.45, BL[1] + 0.55, 0.45];
  const pap = put(sc, "pap", blob(0.2), { at: PAP });
  const papStalk = put(sc, "papStalk", line([PAP[0] + 0.15, PAP[1] - 0.2, PAP[2] - 0.15], PAP, "hot"));
  const CIS: Vec3 = [BL[0] + 0.55, BL[1] + 0.2, 0.6];
  const cis = put(sc, "cis", disc(0.2, 10, "hot", "z"), { at: CIS });
  const SC0: Vec3 = [BL[0], BL[1] - 2.4, 0], SC1: Vec3 = [BL[0], BL[1] - 0.9, 0];
  const scope = put(sc, "scope", cylinder(0.07, 1.6, 6, 2, "accent"), { at: SC0 });
  const white = put(sc, "white", cone(0.6, 1.1, 8, "soft", false), { at: [BL[0], BL[1] + 0.35, 0.2] });
  const blue = put(sc, "blue", cone(0.6, 1.1, 8, "accent", false), { at: [BL[0], BL[1] + 0.35, 0.2] });
  const glow = put(sc, "glow", ring(0.28, 10, "accent", "z"), { at: CIS });
  const loop = put(sc, "loop", ring(0.12, 8, "accent", "x"), { at: [BL[0], BL[1] - 0.1, 0.3] });
  const slide = put(sc, "slide", quad(0.7, 0.45, "accent"), { at: [2.1, 1.1, 0] });
  const slideDots = put(sc, "slideDots", cloud(6, 0.2, "hot", 3), { at: [2.1, 1.1, 0.02] });
  const ax = put(sc, "ax", axes([1.5, -1.4, 0], 1.3, 1.0));
  const under = put(sc, "under", bar(1.9, 0.25, 0.3, "hot"), { at: [0, -1.4, 0] });
  const rest = put(sc, "rest", bar(2.4, 0.75, 0.3, "soft"), { at: [0, -1.4, 0] });
  const urine = put(sc, "urine", vial(0.12, 0.4, "accent"), { at: [-2.3, -0.9, 0] });
  const tl = put(sc, "tl", ticks(-2.8, -1.4, -1.5, 5, "soft"));
  sc.mesh.labels = [L([BL[0], BL[1] + 1.4, 0], "Bladder"), L([CIS[0] + 0.9, CIS[1] + 0.35, 0], "Flat CIS under blue light"), L([BL[0] - 1.6, BL[1] - 0.6, 0], "Cystoscope and resection loop"), L([2.1, -1.7, 0], "T1 understaged in about 25%")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, white, blue, glow, loop, slide, slideDots, ax, under, rest, urine, tl);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); moveTo(pts, base, scope, SC0, SC1, clamp(u * 1.4)); setAlpha(alpha, white, clamp(u * 2 - 1) * 0.6); setAlpha(alpha, cis, 0.15); setAlpha(alpha, pap, 0.6 + 0.4 * clamp(u * 2 - 1)); return { caption: "1 · A cystoscope passes up the urethra; under white light a papillary tumour is obvious but flat carcinoma in situ is easy to miss" }; }
    if (s === 1) { const u = Q(t, 1); moveTo(pts, base, scope, SC0, SC1, 1); setAlpha(alpha, white, 0.6 * (1 - u)); setAlpha(alpha, blue, u * (0.5 + 0.5 * pulse(t, 6))); setAlpha(alpha, cis, 0.15 + 0.85 * u * (0.6 + 0.4 * pulse(t, 5))); setAlpha(alpha, glow, clamp(u * 2 - 0.5) * pulse(t, 5)); movePart(pts, base, glow, [0, 0, 0], 0.8 + 0.5 * pulse(t, 5)); return { caption: "2 · Blue light after hexaminolevulinate makes the flat CIS fluoresce, improving detection and reducing recurrence" }; }
    if (s === 2) { const u = Q(t, 2); moveTo(pts, base, scope, SC0, SC1, 1); setAlpha(alpha, blue, 0.3); setAlpha(alpha, cis, 1); setAlpha(alpha, glow, 0.3); setAlpha(alpha, loop, 1); moveTo(pts, base, loop, [BL[0], BL[1] - 0.1, 0.3], PAP, clamp(u * 2)); const k = clamp(u * 2 - 1); setAlpha(alpha, pap, 1 - k); movePart(pts, base, pap, [0, 0, 0], 1 - 0.7 * k); setAlpha(alpha, papStalk, 1 - k); setAlpha(alpha, slide, k); setAlpha(alpha, slideDots, clamp(u * 3 - 2)); return { caption: "3 · TURBT: a loop resects each tumour down to muscle with electrosurgery or laser, so diagnosis, staging and treatment happen in one sitting" }; }
    const u = Q(t, 3); moveTo(pts, base, scope, SC0, SC1, 1); setAlpha(alpha, blue, 0.3); setAlpha(alpha, cis, 1 - 0.7 * u); setAlpha(alpha, glow, 0.3); setAlpha(alpha, loop, 1); moveTo(pts, base, loop, [BL[0], BL[1] - 0.1, 0.3], CIS, u); hide(alpha, pap, papStalk); show(alpha, 0.8, slide, slideDots);
    setAlpha(alpha, ax, clamp(u * 2)); [under, rest].forEach((b, i) => { const v = clamp(u * 3 - 0.5 - 0.5 * i); setAlpha(alpha, b, v); }); setAlpha(alpha, urine, clamp(u * 2 - 1)); grow(alpha, tl, clamp(u * 2 - 0.8));
    return { caption: "4 · About 25% of T1 tumours are understaged, so T1 disease gets a re-resection; surveillance is lifelong, and urine biomarkers aim to thin it out" };
  });
}

// ---------------------------------------------------------------- 15. digital twins and virtual control arms
export function digitalTwinsTrials(): Mesh {
  const sc = scene();
  const F0: Vec3 = [-2.3, -0.1, 0];
  put(sc, "patient", figure("accent"), { at: F0, scale: 1.1 });
  const twin = put(sc, "twin", figure("soft"), { at: [F0[0] + 0.9, F0[1], -0.3], scale: 1.1 });
  const HIST: Vec3 = [-0.4, 1.4, 0];
  const hist = put(sc, "hist", cloud(16, 0.7, "soft", 2), { at: HIST });
  const MOD: Vec3 = [0.8, 0.9, 0];
  const model = put(sc, "model", box(1.0, 0.7, 0.6, "accent", true), { at: MOD });
  const gears: Part[] = []; for (let i = 0; i < 2; i++) gears.push(put(sc, `gear${i}`, ring(0.12 + 0.06 * i, 8, "soft", "z"), { at: [MOD[0] - 0.2 + 0.4 * i, MOD[1], 0.32] }));
  const feed = put(sc, "feed", arrow([HIST[0] + 0.4, HIST[1] - 0.3, 0], [MOD[0] - 0.4, MOD[1] + 0.25, 0], "soft"));
  const inArrow = put(sc, "inArrow", arrow([F0[0] + 1.3, F0[1] + 0.4, 0], [MOD[0] - 0.55, MOD[1] - 0.1, 0], "accent"));
  const ax = put(sc, "ax", axes([0.5, -1.5, 0], 2.4, 1.6));
  const pred = put(sc, "pred", polyline([[0.5, -0.4, 0], [0.9, -0.55, 0], [1.3, -0.75, 0], [1.7, -1.0, 0], [2.1, -1.2, 0], [2.5, -1.35, 0]], "soft"));
  const real = put(sc, "real", polyline([[0.5, -0.4, 0], [0.9, -0.5, 0], [1.3, -0.65, 0], [1.7, -0.8, 0], [2.1, -0.9, 0], [2.5, -1.0, 0]], "accent"));
  const drift = put(sc, "drift", polyline([[0.5, -0.4, 0], [0.9, -0.5, 0], [1.3, -0.55, 0], [1.7, -0.6, 0], [2.1, -0.62, 0], [2.5, -0.63, 0]], "hot"));
  const driftX = put(sc, "driftX", cross([2.75, -0.75, 0], 0.16));
  const cohort: Part[] = []; for (let i = 0; i < 6; i++) cohort.push(put(sc, `co${i}`, small(0.09, "soft"), { at: [-0.9 + 0.3 * (i % 3), -1.1 - 0.35 * Math.floor(i / 3), 0] }));
  sc.mesh.labels = [L([F0[0], F0[1] + 1.45, 0], "Enrolled patient and digital twin"), L([HIST[0], HIST[1] + 0.75, 0], "Historical trial and registry data"), L([2.0, -1.85, 0], "Predicted control trajectory"), L([-0.6, -1.85, 0], "Smaller control arm")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, hist, model, ...gears, feed, inArrow, ax, pred, real, drift, driftX);
    setAlpha(alpha, twin, 0.25);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, twin, 0.25 + 0.45 * u * (0.7 + 0.3 * pulse(t, 4))); movePart(pts, base, twin, [0.15 * u, 0, 0], 1); return { caption: "1 · Each enrolled patient gets a digital twin: a predicted trajectory of what would have happened on standard treatment" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, twin, 0.7); movePart(pts, base, twin, [0.15, 0, 0], 1); setAlpha(alpha, hist, clamp(u * 2) * (0.5 + 0.5 * pulse(t, 3))); setAlpha(alpha, model, clamp(u * 2 - 0.3)); gears.forEach((g) => setAlpha(alpha, g, clamp(u * 2 - 0.5))); grow(alpha, feed, clamp(u * 2 - 0.5)); grow(alpha, inArrow, clamp(u * 2 - 1)); return { caption: "2 · A prognostic model trained on historical trial and registry data produces the prediction, which becomes a covariate or replaces part of the control arm" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, twin, 0.7); movePart(pts, base, twin, [0.15, 0, 0], 1); show(alpha, 0.5, hist, feed, inArrow); setAlpha(alpha, model, 0.8); gears.forEach((g) => setAlpha(alpha, g, 0.8)); setAlpha(alpha, ax, clamp(u * 2)); grow(alpha, pred, clamp(u * 1.5 - 0.3)); cohort.forEach((c, i) => setAlpha(alpha, c, i < 3 ? 1 : 1 - clamp(u * 2 - 0.5))); return { caption: "3 · Fewer people are randomised to the inferior arm; regulators have accepted external and synthetic controls in rare diseases and single-arm oncology submissions" }; }
    const u = Q(t, 3); setAlpha(alpha, twin, 0.7); movePart(pts, base, twin, [0.15, 0, 0], 1); show(alpha, 0.5, hist, feed, inArrow); setAlpha(alpha, model, 0.8); gears.forEach((g) => setAlpha(alpha, g, 0.8)); setAlpha(alpha, ax, 1); setAlpha(alpha, pred, 1); cohort.forEach((c, i) => setAlpha(alpha, c, i < 3 ? 1 : 0));
    grow(alpha, real, clamp(u * 1.5)); grow(alpha, drift, clamp(u * 1.5 - 0.3)); setAlpha(alpha, driftX, clamp(u * 3 - 2) * pulse(t, 4));
    return { caption: "4 · The risk: standard of care drifts between eras, and a wrong model is invisible without a real control arm, so use in common cancers stays cautious" };
  });
}

// ---------------------------------------------------------------- 16. electrochemotherapy
export function electrochemotherapy(): Mesh {
  const sc = scene();
  put(sc, "skin", quad(3.0, 1.6, "soft"), { at: [-0.4, -0.7, 0], rotX: Math.PI / 2 });
  const TU: Vec3 = [-0.4, -0.2, 0];
  const tumour = put(sc, "tumour", blob(0.42), { at: TU });
  const pores: Part[] = []; for (let i = 0; i < 6; i++) pores.push(put(sc, `po${i}`, ring(0.06, 6, "accent", "z"), { at: [TU[0] + 0.4 * Math.cos((TAU * i) / 6), TU[1] + 0.4 * Math.sin((TAU * i) / 6), 0.15] }));
  const SY0: Vec3 = [-2.6, 1.3, 0.3];
  const syr = put(sc, "syr", syringe(0.7, "accent"), { at: SY0, rotZ: -1.2 });
  const drug = put(sc, "drug", cloud(8, 0.9, "accent", 4), { at: [TU[0], TU[1] + 0.5, 0.3] });
  const EL: Vec3[] = [[TU[0] - 0.7, TU[1] + 1.3, 0.1], [TU[0] + 0.7, TU[1] + 1.3, 0.1]];
  const electrodes: Part[] = EL.map((p, i) => put(sc, `el${i}`, line([p[0], p[1], p[2]], [p[0], p[1] - 1.2, p[2]], "accent")));
  const gen = put(sc, "gen", box(0.7, 0.45, 0.4, "accent", true), { at: [TU[0], TU[1] + 1.75, 0] });
  const genLines: Part[] = EL.map((p, i) => put(sc, `gl${i}`, line([TU[0] - 0.25 + 0.5 * i, TU[1] + 1.55, 0.05], [p[0], p[1] + 0.02, p[2]], "accent")));
  const arcs: Part[] = []; for (let i = 0; i < 3; i++) arcs.push(put(sc, `arc${i}`, polyline([[EL[0][0] + 0.1, TU[1] + 0.3 - 0.25 * i, 0.2], [TU[0] - 0.3, TU[1] + 0.42 - 0.25 * i, 0.2], [TU[0], TU[1] + 0.25 - 0.25 * i, 0.2], [TU[0] + 0.3, TU[1] + 0.42 - 0.25 * i, 0.2], [EL[1][0] - 0.1, TU[1] + 0.3 - 0.25 * i, 0.2]], "hot")));
  const ax = put(sc, "ax", axes([1.3, -1.4, 0], 1.5, 1.4));
  const cr = put(sc, "cr", bar(1.75, 0.6 * 1.3, 0.3, "accent"), { at: [0, -1.4, 0] });
  const orr = put(sc, "orr", bar(2.35, 0.85 * 1.3, 0.3, "accent"), { at: [0, -1.4, 0] });
  const nice = put(sc, "nice", doc(0.6, 0.7, 4, "soft"), { at: [2.2, 1.3, 0] });
  sc.mesh.labels = [L([TU[0], TU[1] - 1.1, 0], "Cutaneous metastasis"), L([TU[0], TU[1] + 2.15, 0], "Pulse generator and needle electrodes"), L([TU[0] - 1.9, TU[1] + 0.3, 0], "Bleomycin through open pores"), L([2.05, -1.7, 0], "About 60% complete, 85% overall response")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...pores, syr, drug, ...electrodes, gen, ...genLines, ...arcs, ax, cr, orr, nice);
    const s = stageOf(t);
    const SY1: Vec3 = [-1.6, 0.6, 0.3];
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, syr, 1); moveTo(pts, base, syr, SY0, SY1, clamp(u * 1.5)); setAlpha(alpha, drug, clamp(u * 2 - 1) * 0.6); movePart(pts, base, drug, [0, 0, 0], 1.6, t * TAU); return { caption: "1 · A skin metastasis of melanoma, breast cancer, Kaposi sarcoma or squamous carcinoma; a small systemic dose of bleomycin or cisplatin is given first" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, syr, 0.3); moveTo(pts, base, syr, SY0, SY1, 1); setAlpha(alpha, drug, 0.6); movePart(pts, base, drug, [0, 0, 0], 1.6, TAU); electrodes.forEach((e, i) => { setAlpha(alpha, e, 1); movePart(pts, base, e, [0, -0.9 * clamp(u * 2 - 0.3 * i), 0], 1); }); setAlpha(alpha, gen, clamp(u * 2)); genLines.forEach((g) => setAlpha(alpha, g, clamp(u * 2))); const k = clamp(u * 2 - 1); const flash = Math.floor(t * 4 * 8 * 4) % 2 === 0 ? 1 : 0.2; arcs.forEach((a) => setAlpha(alpha, a, k * flash)); pores.forEach((p, i) => setAlpha(alpha, p, clamp(u * 4 - 2 - 0.2 * i))); return { caption: "2 · Needle electrodes deliver 8 pulses of about 1000 V/cm; the membrane opens for a moment (reversible electroporation)" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, syr, 0.3); moveTo(pts, base, syr, SY0, SY1, 1); electrodes.forEach((e) => { setAlpha(alpha, e, 0.6); movePart(pts, base, e, [0, -0.9, 0], 1); }); setAlpha(alpha, gen, 0.5); genLines.forEach((g) => setAlpha(alpha, g, 0.5)); show(alpha, 1, ...pores); setAlpha(alpha, drug, 1); movePart(pts, base, drug, [0, -0.5 * u, -0.15 * u], 1.6 - 1.1 * u, TAU + u * 2); setAlpha(alpha, tumour, 1); movePart(pts, base, tumour, [0, 0, 0], 1 - 0.3 * clamp(u * 2 - 1)); return { caption: "3 · Bleomycin floods in, several hundred times more cytotoxic than usual and cisplatin about 80-fold; vessels lock and the cells die immunogenically" }; }
    const u = Q(t, 3); setAlpha(alpha, syr, 0.3); moveTo(pts, base, syr, SY0, SY1, 1); electrodes.forEach((e) => { setAlpha(alpha, e, 0.4); movePart(pts, base, e, [0, -0.9, 0], 1); }); setAlpha(alpha, gen, 0.4); genLines.forEach((g) => setAlpha(alpha, g, 0.4)); show(alpha, 0.5, ...pores); setAlpha(alpha, drug, 0.6); movePart(pts, base, drug, [0, -0.5, -0.15], 0.5, TAU + 2); movePart(pts, base, tumour, [0, 0, 0], 0.7 - 0.3 * u); setAlpha(alpha, tumour, 1 - 0.5 * u);
    setAlpha(alpha, ax, clamp(u * 2)); [cr, orr].forEach((b, i) => { const v = clamp(u * 3 - 0.5 - 0.5 * i); setAlpha(alpha, b, v); movePart(pts, base, b, [0, -0.5 * (1 - v), 0], 1); }); setAlpha(alpha, nice, clamp(u * 3 - 2));
    return { caption: "4 · InspECT registry: about 60% complete and 85% overall response; standardised by ESOPE (2006), NICE-supported since 2013, little used in the US with no FDA-cleared device" };
  });
}

// ---------------------------------------------------------------- 17. genomics cloud platforms and trusted research environments
export function genomicsCloudPlatforms(): Mesh {
  const sc = scene();
  const CL: Vec3 = [0, 0.9, 0];
  put(sc, "cloudA", cell(0.7, "accent"), { at: CL });
  put(sc, "cloudB", sphere(0.5, 4, 8, "accent", true), { at: [CL[0] - 0.75, CL[1] - 0.15, 0] });
  put(sc, "cloudC", sphere(0.5, 4, 8, "accent", true), { at: [CL[0] + 0.75, CL[1] - 0.15, 0] });
  const hosp: Part[] = []; const HP: Vec3[] = [[-2.4, -0.9, 0], [-1.4, -1.1, 0.2]]; HP.forEach((p, i) => hosp.push(put(sc, `hosp${i}`, box(0.7, 0.6, 0.5, "soft", true), { at: p })));
  const ups: Part[] = HP.map((p, i) => put(sc, `up${i}`, arrow([p[0] + 0.2, p[1] + 0.35, 0], [CL[0] - 0.9 + 0.2 * i, CL[1] - 0.5, 0], "soft")));
  const packets: Part[] = HP.map((p, i) => put(sc, `pk${i}`, small(0.07, "hot"), { at: [p[0] + 0.2, p[1] + 0.35, 0.1] }));
  const wf: Part[] = []; for (let i = 0; i < 3; i++) wf.push(put(sc, `wf${i}`, box(0.28, 0.2, 0.2, "soft", true), { at: [CL[0] - 0.35 + 0.35 * i, CL[1] + 0.05, 0.3] }));
  const RS: Vec3 = [2.3, -0.7, 0];
  put(sc, "researcher", figure("soft"), { at: RS, scale: 0.9 });
  const visit = put(sc, "visit", arrow([RS[0] - 0.3, RS[1] + 0.6, 0], [CL[0] + 0.9, CL[1] - 0.3, 0], "accent"));
  const eye = put(sc, "eye", ring(0.12, 8, "accent", "z"), { at: [CL[0] + 0.85, CL[1] - 0.2, 0.3] });
  const dl = put(sc, "dl", arrow([CL[0] + 0.9, CL[1] - 0.6, 0.2], [RS[0] - 0.2, RS[1] + 0.2, 0.2], "hot"));
  const dlX = put(sc, "dlX", cross([1.6, -0.05, 0.3], 0.18));
  const audit = put(sc, "audit", doc(0.55, 0.65, 4, "soft"), { at: [CL[0] + 1.9, CL[1] + 0.9, 0] });
  const pass = put(sc, "pass", ring(0.16, 8, "accent", "z"), { at: [RS[0], RS[1] + 0.95, 0.15] });
  const fed: Part[] = []; for (let i = 0; i < 2; i++) fed.push(put(sc, `fed${i}`, sphere(0.3, 3, 8, "soft", true), { at: [-2.5 + 5.0 * i, 1.7, -0.3] }));
  const fedLines: Part[] = fed.map((_, i) => put(sc, `fl${i}`, line([-2.2 + 4.4 * i, 1.65, -0.2], [CL[0] - 0.7 + 1.4 * i, CL[1] + 0.35, -0.1], "accent")));
  sc.mesh.labels = [L([CL[0], CL[1] + 1.0, 0], "Secure cloud tenancy"), L([-1.9, -1.6, 0], "Contributing hospitals and biobanks"), L([RS[0], RS[1] - 1.15, 0], "Researcher visits the data, no download"), L([CL[0], CL[1] - 0.45, 0.4], "Workflow engine")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...ups, ...packets, ...wf, visit, eye, dl, dlX, audit, pass, ...fed, ...fedLines);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); ups.forEach((a) => grow(alpha, a, clamp(u * 1.5))); packets.forEach((p, i) => { setAlpha(alpha, p, clamp(u * 2 - 0.2 * i)); moveTo(pts, base, p, [HP[i][0] + 0.2, HP[i][1] + 0.35, 0.1], [CL[0] - 0.9 + 0.2 * i, CL[1] - 0.5, 0.1], clamp(u * 1.5 - 0.2 * i)); }); return { caption: "1 · Hospitals and biobanks deposit sequencing data into an access-controlled cloud tenancy, at petabyte scale" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 0.5, ...ups); wf.forEach((w, i) => { setAlpha(alpha, w, clamp(u * 3 - i)); movePart(pts, base, w, [0, 0.08 * Math.sin(t * TAU * 4 + i), 0], 1, t * TAU); }); return { caption: "2 · Containerised workflows (WDL, Nextflow, CWL) run inside the tenancy next to the object storage, reproducibly and with an audit trail" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.5, ...ups); wf.forEach((w, i) => { setAlpha(alpha, w, 0.8); movePart(pts, base, w, [0, 0.08 * Math.sin(t * TAU * 4 + i), 0], 1, t * TAU); }); grow(alpha, visit, clamp(u * 1.5)); setAlpha(alpha, eye, clamp(u * 2 - 0.6) * (0.6 + 0.4 * pulse(t, 5))); setAlpha(alpha, dl, clamp(u * 3 - 1.5) * 0.7); setAlpha(alpha, dlX, clamp(u * 3 - 2)); setAlpha(alpha, audit, clamp(u * 2 - 1)); return { caption: "3 · Researchers visit the data rather than downloading it: trusted research environments with audit and egress controls (Genomics England, UK Biobank, GDC)" }; }
    const u = Q(t, 3); show(alpha, 0.5, ...ups, visit, eye, dl, dlX, audit); wf.forEach((w, i) => { setAlpha(alpha, w, 0.8); movePart(pts, base, w, [0, 0.08 * Math.sin(t * TAU * 4 + i), 0], 1, t * TAU); });
    setAlpha(alpha, pass, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); fed.forEach((f, i) => { setAlpha(alpha, f, clamp(u * 2 - 0.5 - 0.3 * i)); grow(alpha, fedLines[i], clamp(u * 2 - 0.8 - 0.3 * i)); });
    return { caption: "4 · GA4GH Passports, DRS and WES let federated analysis span national resources; cloud cost, data-residency rules and vendor lock-in are the limits" };
  });
}

// ---------------------------------------------------------------- 18. hypoxia-activated prodrugs
export function hypoxiaActivatedTherapy(): Mesh {
  const sc = scene();
  const TU: Vec3 = [0.5, 0, 0];
  put(sc, "tumour", cell(1.15, "soft"), { at: TU });
  const core = put(sc, "core", blob(0.5), { at: TU });
  put(sc, "vessel", tube(0.16, 2.2, "soft"), { at: [-1.3, 0, 0], rotZ: Math.PI / 2 });
  const o2 = put(sc, "o2", cloud(8, 0.3, "accent", 5), { at: [TU[0] - 0.75, TU[1] + 0.1, 0.15] });
  const P0: Vec3 = [-1.3, 0.6, 0.2];
  const pro1 = put(sc, "pro1", octahedron(0.1, "soft"), { at: P0 });
  const pro2 = put(sc, "pro2", octahedron(0.1, "soft"), { at: [P0[0], P0[1] - 1.2, P0[2]] });
  const active = put(sc, "active", octahedron(0.12, "hot"), { at: TU });
  const marks = put(sc, "marks", dots([[TU[0] - 0.2, TU[1] + 0.2, 0.3], [TU[0] + 0.25, TU[1] - 0.1, 0.3], [TU[0], TU[1] - 0.3, 0.35], [TU[0] + 0.2, TU[1] + 0.3, 0.3]], "hot"));
  const trials: Part[] = []; for (let i = 0; i < 2; i++) trials.push(put(sc, `tr${i}`, doc(0.5, 0.6, 3, "soft"), { at: [2.2 + 0.0 * i, 1.4 - 1.0 * i, 0] }));
  const trialX: Part[] = trials.map((_, i) => put(sc, `tx${i}`, cross([2.2, 1.4 - 1.0 * i, 0.1], 0.2)));
  const petRing = put(sc, "petRing", ring(0.5, 14, "accent", "z"), { at: [2.3, -1.0, 0] });
  const petSpot = put(sc, "petSpot", blob(0.14, "accent"), { at: [2.3, -1.0, 0.05] });
  sc.mesh.labels = [L([TU[0], TU[1] - 0.25, 0.6], "Hypoxic core"), L([TU[0] - 0.4, TU[1] + 1.4, 0], "Perfused rim with oxygen"), L([-2.0, 1.0, 0], "Prodrug"), L([2.3, -1.7, 0], "Hypoxia imaging to select patients")];
  const base = sc.mesh.points;
  const RIM: Vec3 = [TU[0] - 0.6, TU[1] + 0.35, 0.3], CORE: Vec3 = [TU[0], TU[1] - 0.05, 0.3];
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, pro1, pro2, active, marks, ...trials, ...trialX, petRing, petSpot);
    setAlpha(alpha, o2, 0.6);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, core, 0.3 + 0.7 * u * (0.7 + 0.3 * pulse(t, 3))); setAlpha(alpha, o2, 0.3 + 0.7 * u); movePart(pts, base, o2, [0.1 * Math.sin(t * TAU * 2), 0.05 * Math.cos(t * TAU * 3), 0], 1); return { caption: "1 · A tumour core far from its vessels is hypoxic in a way no normal tissue is; radiotherapy kills those cells poorly" }; }
    if (s === 1) { const u = Q(t, 1); movePart(pts, base, o2, [0.1 * Math.sin(t * TAU * 2), 0.05 * Math.cos(t * TAU * 3), 0], 1); setAlpha(alpha, pro1, 1); const v = clamp(u * 1.6); moveTo(pts, base, pro1, P0, RIM, v <= 1 ? Math.sin(v * Math.PI * 0.5) : 1, 1, t * TAU * 2); setAlpha(alpha, pro1, 1 - clamp(u * 3 - 2)); setAlpha(alpha, pro2, 1); moveTo(pts, base, pro2, [P0[0], P0[1] - 1.2, P0[2]], CORE, clamp(u * 1.3 - 0.2), 1, t * TAU * 2); return { caption: "2 · The prodrug diffuses in; where oxygen is present its one-electron reduction is reversed and nothing happens" }; }
    if (s === 2) { const u = Q(t, 2); movePart(pts, base, o2, [0.1 * Math.sin(t * TAU * 2), 0.05 * Math.cos(t * TAU * 3), 0], 1); setAlpha(alpha, pro2, 1 - u); moveTo(pts, base, pro2, [P0[0], P0[1] - 1.2, P0[2]], CORE, 1, 1, TAU); setAlpha(alpha, active, u * (0.6 + 0.4 * pulse(t, 6))); movePart(pts, base, active, [0, 0, 0.3], 1 + 0.5 * u, t * TAU * 3); setAlpha(alpha, marks, clamp(u * 2 - 1) * pulse(t, 8)); setAlpha(alpha, core, 1 - 0.5 * clamp(u * 2 - 1)); movePart(pts, base, core, [0, 0, 0], 1 - 0.25 * clamp(u * 2 - 1)); return { caption: "3 · In the hypoxic core the nitroaromatic or quinone trigger fragments and releases the active cytotoxin, killing the cells radiotherapy misses" }; }
    const u = Q(t, 3); movePart(pts, base, o2, [0.1 * Math.sin(t * TAU * 2), 0.05 * Math.cos(t * TAU * 3), 0], 1); setAlpha(alpha, active, 0.6); movePart(pts, base, active, [0, 0, 0.3], 1.5, TAU * 3); setAlpha(alpha, marks, 0.7); setAlpha(alpha, core, 0.5); movePart(pts, base, core, [0, 0, 0], 0.75);
    trials.forEach((d, i) => { setAlpha(alpha, d, clamp(u * 3 - 0.5 * i)); setAlpha(alpha, trialX[i], clamp(u * 3 - 1 - 0.5 * i)); }); setAlpha(alpha, petRing, clamp(u * 2 - 1)); setAlpha(alpha, petSpot, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 5)));
    return { caption: "4 · Evofosfamide failed two phase 3 trials in 2015 without hypoxia selection; the field now pairs prodrugs with hypoxia imaging or gene signatures and radiation" };
  });
}

// ---------------------------------------------------------------- 19. logic-gated therapeutics (AND and NOT gates)
export function logicGatedTherapeutics(): Mesh {
  const sc = scene();
  const T0: Vec3 = [-1.8, 0, 0];
  const tcell = put(sc, "tcell", cell(0.5, "accent"), { at: T0 });
  const recA = put(sc, "recA", line([T0[0] + 0.45, T0[1] + 0.2, 0], [T0[0] + 0.8, T0[1] + 0.3, 0], "soft"));
  const recAhead = put(sc, "recAhead", small(0.07, "soft"), { at: [T0[0] + 0.8, T0[1] + 0.3, 0] });
  const recB = put(sc, "recB", line([T0[0] + 0.45, T0[1] - 0.2, 0], [T0[0] + 0.8, T0[1] - 0.3, 0], "hot"));
  const recBhead = put(sc, "recBhead", small(0.07, "hot"), { at: [T0[0] + 0.8, T0[1] - 0.3, 0] });
  const recN = put(sc, "recN", line([T0[0], T0[1] - 0.45, 0], [T0[0], T0[1] - 0.85, 0], "soft"));
  const recNbar = put(sc, "recNbar", line([T0[0] - 0.15, T0[1] - 0.85, 0], [T0[0] + 0.15, T0[1] - 0.85, 0], "soft"));
  const TU: Vec3 = [1.2, 1.0, 0], NO: Vec3 = [1.2, -1.0, 0], HLA: Vec3 = [2.7, -0.2, 0];
  const tum = put(sc, "tum", cell(0.5, "hot"), { at: TU });
  put(sc, "tumA", small(0.07, "soft"), { at: [TU[0] - 0.55, TU[1] + 0.2, 0] });
  put(sc, "tumB", small(0.07, "hot"), { at: [TU[0] - 0.55, TU[1] - 0.2, 0] });
  const norm = put(sc, "norm", cell(0.5, "soft"), { at: NO });
  put(sc, "normB", small(0.07, "hot"), { at: [NO[0] - 0.55, NO[1] - 0.2, 0] });
  const norm2 = put(sc, "norm2", cell(0.45, "soft"), { at: HLA });
  put(sc, "n2A", small(0.07, "soft"), { at: [HLA[0] - 0.5, HLA[1] + 0.2, 0] });
  put(sc, "n2B", small(0.07, "hot"), { at: [HLA[0] - 0.5, HLA[1] - 0.2, 0] });
  const hlaMark = put(sc, "hlaMark", octahedron(0.09, "accent"), { at: [HLA[0], HLA[1] + 0.55, 0] });
  const kill = put(sc, "kill", dots([[TU[0] - 0.1, TU[1] + 0.15, 0.4], [TU[0] + 0.2, TU[1] - 0.1, 0.4], [TU[0], TU[1] - 0.25, 0.45]], "hot"));
  const spare = put(sc, "spare", ring(0.6, 12, "accent", "z"), { at: NO });
  const block = put(sc, "block", cross([HLA[0] - 0.95, HLA[1] + 0.1, 0.2], 0.18));
  sc.mesh.labels = [L([T0[0], T0[1] + 0.9, 0], "Logic-gated CAR-T: sensor A, killer B, inhibitor"), L([TU[0], TU[1] + 0.9, 0], "Tumour: A and B"), L([NO[0], NO[1] - 0.95, 0], "Normal: B only"), L([HLA[0], HLA[1] + 1.0, 0], "NOT gate: protective antigen kept by normal tissue")];
  const base = sc.mesh.points;
  const tParts = [tcell, recA, recAhead, recB, recBhead, recN, recNbar];
  const moveT = (pts: Vec3[], to: Vec3, u: number) => tParts.forEach((p) => moveTo(pts, base, p, T0, to, u));
  const D1: Vec3 = [TU[0] - 1.25, TU[1], 0], D2: Vec3 = [NO[0] - 1.25, NO[1], 0], D3: Vec3 = [HLA[0] - 1.2, HLA[1], 0];
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, kill, spare, block);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, recAhead, 0.5 + 0.5 * pulse(t, 4) * u); setAlpha(alpha, recBhead, 0.5 + 0.5 * pulse(t + 0.1, 4) * u); show(alpha, 0.3, tum, norm, norm2); return { caption: "1 · A CAR-T cell carries two receptors: a synNotch sensor for antigen A and a killing receptor for antigen B, plus an inhibitory receptor" }; }
    if (s === 1) { const u = Q(t, 1); moveT(pts, D1, clamp(u * 1.5)); const k = clamp(u * 2 - 1); setAlpha(alpha, kill, k * pulse(t, 8)); setAlpha(alpha, tum, 1 - 0.5 * k); movePart(pts, base, tum, [0, 0, 0], 1 - 0.25 * k); show(alpha, 0.3, norm, norm2); return { caption: "2 · AND gate: on a tumour cell showing both, antigen A licenses the killing receptor, and the cell dies" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, tum, 0.4); movePart(pts, base, tum, [0, 0, 0], 0.75); setAlpha(alpha, kill, 0.5); const path = u < 0.5 ? lerp3(D1, [T0[0] + 0.5, 0, 0], u * 2) : lerp3([T0[0] + 0.5, 0, 0], D2, (u - 0.5) * 2); tParts.forEach((p) => movePart(pts, base, p, [path[0] - T0[0], path[1] - T0[1], path[2] - T0[2]], 1)); setAlpha(alpha, spare, clamp(u * 3 - 2) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, norm, 1); setAlpha(alpha, norm2, 0.3); return { caption: "3 · A normal cell showing only B is spared, which turns a non-specific antigen into a usable target" }; }
    const u = Q(t, 3); setAlpha(alpha, tum, 0.4); movePart(pts, base, tum, [0, 0, 0], 0.75); setAlpha(alpha, kill, 0.5); setAlpha(alpha, spare, 0.5); setAlpha(alpha, norm2, 1);
    const path = u < 0.5 ? lerp3(D2, [T0[0] + 1.2, -0.4, 0], u * 2) : lerp3([T0[0] + 1.2, -0.4, 0], D3, (u - 0.5) * 2); tParts.forEach((p) => movePart(pts, base, p, [path[0] - T0[0], path[1] - T0[1], path[2] - T0[2]], 1));
    setAlpha(alpha, hlaMark, 0.6 + 0.4 * pulse(t, 5)); setAlpha(alpha, block, clamp(u * 3 - 2) * pulse(t, 6)); setAlpha(alpha, recN, 1); setAlpha(alpha, recNbar, 0.6 + 0.4 * clamp(u * 3 - 2));
    return { caption: "4 · NOT gate: an inhibitory receptor against an antigen kept only by normal tissue (Tmod, using HLA loss of heterozygosity) blocks killing; AND and NOT constructs are in phase 1" };
  });
}

// ---------------------------------------------------------------- 20. antibody manufacturing (CHO bioprocessing)
export function mabManufacturing(): Mesh {
  const sc = scene();
  const BR: Vec3 = [-1.7, 0.1, 0];
  put(sc, "reactor", cylinder(0.65, 1.9, 12, 3, "accent", true, true), { at: BR });
  const cho = put(sc, "cho", cloud(14, 0.5, "soft", 3), { at: [BR[0], BR[1] - 0.2, 0] });
  const impeller = put(sc, "impeller", line([BR[0] - 0.35, BR[1] - 0.6, 0], [BR[0] + 0.35, BR[1] - 0.6, 0], "soft"));
  put(sc, "shaft", line([BR[0], BR[1] + 1.1, 0], [BR[0], BR[1] - 0.6, 0], "soft"));
  const feed = put(sc, "feed", dots([[BR[0] + 0.2, BR[1] + 1.2, 0], [BR[0] + 0.2, BR[1] + 1.0, 0], [BR[0] + 0.2, BR[1] + 0.8, 0]], "accent"));
  const abs: Part[] = []; for (let i = 0; i < 3; i++) abs.push(put(sc, `ab${i}`, antibody(0.25, "accent"), { at: [BR[0] - 0.3 + 0.3 * i, BR[1] + 0.3 - 0.25 * (i % 2), 0.2] }));
  const pipe = put(sc, "pipe", polyline([[BR[0] + 0.65, BR[1] - 0.8, 0], [-0.3, BR[1] - 0.8, 0], [-0.3, 0.9, 0], [0.2, 0.9, 0]], "soft"));
  const COL: Vec3 = [0.55, 0.35, 0];
  const column = put(sc, "column", cylinder(0.28, 1.3, 10, 2, "soft", true, true), { at: COL });
  const beads = put(sc, "beads", cloud(10, 0.22, "accent", 6), { at: COL });
  const waste = put(sc, "waste", dots([[COL[0] + 0.1, COL[1] - 0.85, 0], [COL[0] + 0.2, COL[1] - 1.05, 0], [COL[0] + 0.05, COL[1] - 1.2, 0]], "soft"));
  const FL: Vec3 = [1.65, 0.35, 0];
  const filt = put(sc, "filt", box(0.55, 0.6, 0.45, "soft", true), { at: FL });
  const filtLines: Part[] = []; for (let i = 0; i < 3; i++) filtLines.push(put(sc, `fl${i}`, line([FL[0] - 0.2, FL[1] + 0.2 - 0.2 * i, 0.24], [FL[0] + 0.2, FL[1] + 0.2 - 0.2 * i, 0.24], "soft")));
  const pipe2 = put(sc, "pipe2", line([COL[0] + 0.28, COL[1], 0], [FL[0] - 0.28, FL[1], 0], "soft"));
  const pipe3 = put(sc, "pipe3", polyline([[FL[0], FL[1] - 0.3, 0], [FL[0], FL[1] - 0.9, 0], [2.5, FL[1] - 0.9, 0]], "soft"));
  const vialP = put(sc, "vial", vial(0.16, 0.5, "accent"), { at: [2.5, -0.95, 0] });
  const carried = put(sc, "carried", antibody(0.25, "accent"), { at: [BR[0] + 0.65, BR[1] - 0.8, 0.1] });
  sc.mesh.labels = [L([BR[0], BR[1] + 1.4, 0], "CHO cells, 2,000 to 20,000 L bioreactor"), L([COL[0], COL[1] + 1.05, 0], "Protein A capture"), L([FL[0], FL[1] + 0.75, 0], "Viral inactivation and filtration"), L([2.5, -0.35, 0], "Fill")];
  const base = sc.mesh.points;
  const path: Vec3[] = [[BR[0] + 0.65, BR[1] - 0.8, 0.1], [-0.3, BR[1] - 0.8, 0.1], [-0.3, 0.9, 0.1], [COL[0], 0.9, 0.1], [COL[0], COL[1], 0.1], [FL[0], FL[1], 0.1], [FL[0], FL[1] - 0.9, 0.1], [2.5, FL[1] - 0.9, 0.1], [2.5, -0.85, 0.1]];
  const along = (u: number): Vec3 => { const n = path.length - 1; const k = Math.min(n - 1, Math.floor(u * n)); return lerp3(path[k], path[k + 1], u * n - k); };
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...abs, pipe, column, beads, waste, filt, ...filtLines, pipe2, pipe3, vialP, carried);
    const s = stageOf(t);
    const stir = () => { movePart(pts, base, impeller, [0, 0, 0], 1, t * TAU * 4); movePart(pts, base, cho, [0, 0.1 * Math.sin(t * TAU * 2), 0], 1, t * TAU * 1.5); setAlpha(alpha, feed, pulse(t, 5)); movePart(pts, base, feed, [0, -0.2 * ((t * 6) % 1), 0], 1); };
    if (s === 0) { const u = Q(t, 0); stir(); setAlpha(alpha, cho, 0.4 + 0.6 * u); movePart(pts, base, cho, [0, 0.1 * Math.sin(t * TAU * 2), 0], 0.6 + 0.4 * u, t * TAU * 1.5); return { caption: "1 · Stable transfected CHO clones grow in fed-batch or perfusion culture, in 2,000 to 20,000 L stainless or single-use bioreactors" }; }
    if (s === 1) { const u = Q(t, 1); stir(); abs.forEach((a, i) => { setAlpha(alpha, a, clamp(u * 3 - i)); movePart(pts, base, a, [0.1 * Math.sin(t * TAU * 2 + i), 0.1 * Math.cos(t * TAU * 3 + i), 0], 1); }); return { caption: "2 · The cells secrete grams per litre of antibody into the medium; titres keep rising and continuous processing cuts cost of goods" }; }
    if (s === 2) { const u = Q(t, 2); stir(); show(alpha, 0.7, ...abs); grow(alpha, pipe, clamp(u * 2)); setAlpha(alpha, column, clamp(u * 2 - 0.4)); setAlpha(alpha, beads, clamp(u * 2 - 0.6)); setAlpha(alpha, carried, 1); const c = along(clamp(u * 1.2) * 0.5); movePart(pts, base, carried, [c[0] - path[0][0], c[1] - path[0][1], c[2] - path[0][2]], 1); setAlpha(alpha, waste, clamp(u * 3 - 2) * pulse(t, 5)); return { caption: "3 · Protein A chromatography captures the antibody from the harvest; polishing steps, viral inactivation and filtration follow" }; }
    const u = Q(t, 3); stir(); show(alpha, 0.7, ...abs); show(alpha, 1, pipe, column, beads); setAlpha(alpha, waste, 0.4); setAlpha(alpha, filt, clamp(u * 3)); cascade(alpha, filtLines, clamp(u * 3 - 0.5)); grow(alpha, pipe2, clamp(u * 3)); grow(alpha, pipe3, clamp(u * 3 - 1)); setAlpha(alpha, vialP, clamp(u * 3 - 1.5)); setAlpha(alpha, carried, 1); const c = along(0.5 + 0.5 * u); movePart(pts, base, carried, [c[0] - path[0][0], c[1] - path[0][1], c[2] - path[0][2]], 1);
    return { caption: "4 · Formulation and fill: the industrial base for pembrolizumab, trastuzumab and every ADC antibody, held by pharma and CDMOs such as Samsung Biologics, Lonza and WuXi" };
  });
}

// ---------------------------------------------------------------- 21. NHS Targeted Lung Health Check
export function nhsLungHealthCheck(): Mesh {
  const sc = scene();
  put(sc, "ground", quad(3.2, 1.6, "soft"), { at: [1.0, -1.05, 0], rotX: Math.PI / 2 });
  for (let i = 0; i < 3; i++) put(sc, `bay${i}`, line([0.2 + 0.8 * i, -1.04, -0.7], [0.2 + 0.8 * i, -1.04, 0.7], "soft"));
  const TR: Vec3 = [1.5, -0.2, 0];
  put(sc, "truck", box(1.8, 1.1, 0.9, "accent", true), { at: TR });
  put(sc, "cab", box(0.5, 0.7, 0.9, "accent", true), { at: [TR[0] + 1.15, TR[1] - 0.2, 0] });
  for (let i = 0; i < 2; i++) put(sc, `wheel${i}`, ring(0.18, 10, "soft", "z"), { at: [TR[0] - 0.55 + 1.3 * i, TR[1] - 0.72, 0.46] });
  const ct = put(sc, "ct", ring(0.42, 16, "soft", "x"), { at: [TR[0] - 0.2, TR[1] + 0.05, 0] });
  const F0: Vec3 = [-2.4, -0.15, 0.2], F1: Vec3 = [-0.8, -0.15, 0.4], F2: Vec3 = [TR[0] - 0.2, TR[1] + 0.05, 0];
  const person = put(sc, "person", figure("soft"), { at: F0 });
  const letter = put(sc, "letter", doc(0.45, 0.35, 2, "accent"), { at: [-2.9, 1.3, 0.2] });
  const phone = put(sc, "phone", quad(0.4, 0.65, "accent"), { at: [-1.3, 1.0, 0.2] });
  const riskRows: Part[] = []; for (let i = 0; i < 3; i++) riskRows.push(put(sc, `rr${i}`, line([-1.45, 1.2 - 0.18 * i, 0.22], [-1.15 + 0.05 * (i % 2), 1.2 - 0.18 * i, 0.22], i === 2 ? "hot" : "soft")));
  const lung = put(sc, "lung", organ(0.22, 0.32, 0.18), { at: [F2[0], F2[1] + 0.15, 0.05] });
  const nodule = put(sc, "nodule", blob(0.06), { at: [F2[0] + 0.1, F2[1] + 0.25, 0.22] });
  const beams: Part[] = []; for (let i = 0; i < 3; i++) { const a = 0.3 + i * 1.05; beams.push(put(sc, `bm${i}`, line([F2[0], F2[1] + 0.4 * Math.sin(a), 0.4 * Math.cos(a)], [F2[0], F2[1] - 0.4 * Math.sin(a), -0.4 * Math.cos(a)], "accent"))); }
  const ax = put(sc, "ax", axes([-2.9, -1.5, 0], 1.6, 1.1));
  const early = put(sc, "early", bar(-2.45, 0.9, 0.3, "accent"), { at: [0, -1.5, 0] });
  const late = put(sc, "late", bar(-1.85, 0.3, 0.3, "hot"), { at: [0, -1.5, 0] });
  const tl = put(sc, "tl", ticks(-0.2, 2.6, 1.3, 3, "soft"));
  sc.mesh.labels = [L([F0[0], F0[1] + 1.35, 0], "Ever-smoker aged 55 to 74"), L([-1.3, 1.6, 0], "Risk assessment: PLCOm2012, Liverpool Lung Project"), L([TR[0], TR[1] + 0.95, 0], "Mobile low-dose CT in a car park"), L([-2.15, -1.85, 0], "Three quarters at stage 1 or 2")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, letter, phone, ...riskRows, lung, nodule, ...beams, ax, early, late, tl);
    setAlpha(alpha, ct, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, letter, 1); moveTo(pts, base, letter, [-2.9, 1.3, 0.2], [F0[0] + 0.45, F0[1] + 0.35, 0.3], clamp(u * 1.4)); setAlpha(alpha, person, 0.6 + 0.4 * clamp(u * 2 - 1)); return { caption: "1 · Ever-smokers aged 55 to 74 are invited through their GP records to a lung health check" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, letter, 0.4); moveTo(pts, base, letter, [-2.9, 1.3, 0.2], [F0[0] + 0.45, F0[1] + 0.35, 0.3], 1); setAlpha(alpha, phone, clamp(u * 2)); cascade(alpha, riskRows, clamp(u * 2 - 0.5)); setAlpha(alpha, riskRows[2], clamp(u * 3 - 2) * (0.5 + 0.5 * pulse(t, 5))); return { caption: "2 · A telephone or face-to-face risk assessment (PLCOm2012, Liverpool Lung Project) decides who is above threshold" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, letter, 0.3); moveTo(pts, base, letter, [-2.9, 1.3, 0.2], [F0[0] + 0.45, F0[1] + 0.35, 0.3], 1); show(alpha, 0.5, phone, ...riskRows); const w = clamp(u * 1.6); moveTo(pts, base, person, F0, w < 0.6 ? lerp3(F0, F1, w / 0.6) : lerp3(F1, F2, (w - 0.6) / 0.4), 1); setAlpha(alpha, person, w > 0.7 ? 0.3 : 1); setAlpha(alpha, ct, 0.4 + 0.6 * clamp(u * 3 - 2)); setAlpha(alpha, lung, clamp(u * 3 - 2)); beams.forEach((b, i) => setAlpha(alpha, b, clamp(u * 3 - 2) * pulse(t + i * 0.1, 7))); setAlpha(alpha, nodule, clamp(u * 4 - 3) * pulse(t, 5)); grow(alpha, tl, clamp(u * 2 - 1)); return { caption: "3 · Those at high risk get a low-dose CT, often in a mobile scanner in a supermarket car park, repeated at 24 months with volumetric nodule management" }; }
    const u = Q(t, 3); setAlpha(alpha, letter, 0.3); moveTo(pts, base, letter, [-2.9, 1.3, 0.2], [F0[0] + 0.45, F0[1] + 0.35, 0.3], 1); show(alpha, 0.5, phone, ...riskRows, tl); moveTo(pts, base, person, F0, F2, 1); setAlpha(alpha, person, 0.3); setAlpha(alpha, ct, 1); setAlpha(alpha, lung, 1); show(alpha, 0.3, ...beams); setAlpha(alpha, nodule, 1);
    setAlpha(alpha, ax, clamp(u * 2)); [early, late].forEach((b, i) => { const v = clamp(u * 3 - 0.5 - 0.5 * i); setAlpha(alpha, b, v); movePart(pts, base, b, [0, -0.4 * (1 - v), 0], 1); });
    return { caption: "4 · Around three quarters of cancers were found at stage 1 or 2, reversing the usual pattern; begun in 2019, national rollout is committed for 2029" };
  });
}

// ---------------------------------------------------------------- 22. oncology nursing and nurse-led care
export function oncologyNursing(): Mesh {
  const sc = scene();
  const N0: Vec3 = [-0.2, 0.05, 0];
  const nurse = put(sc, "nurse", figure("accent"), { at: N0, scale: 1.3 });
  const P0: Vec3 = [-2.2, -0.05, 0];
  put(sc, "patient", figure("soft"), { at: P0, scale: 1.1 });
  put(sc, "stand", line([P0[0] - 0.7, P0[1] - 1.0, 0], [P0[0] - 0.7, P0[1] + 1.4, 0], "soft"));
  const bag = put(sc, "bag", vial(0.14, 0.4, "hot"), { at: [P0[0] - 0.7, P0[1] + 1.2, 0] });
  const drip = put(sc, "drip", polyline([[P0[0] - 0.7, P0[1] + 1.0, 0], [P0[0] - 0.7, P0[1] + 0.5, 0.1], [P0[0] - 0.42, P0[1] + 0.25, 0.1]], "hot"));
  const chart = put(sc, "chart", doc(0.45, 0.6, 4, "soft"), { at: [N0[0] + 0.6, N0[1] + 0.4, 0.3] });
  const check = put(sc, "check", polyline([[N0[0] + 0.45, N0[1] + 0.35, 0.35], [N0[0] + 0.55, N0[1] + 0.25, 0.35], [N0[0] + 0.75, N0[1] + 0.5, 0.35]], "accent"));
  const rooms: Part[] = []; const RP: Vec3[] = [[1.5, 1.2, 0], [2.3, 0.4, 0], [1.6, -0.5, 0], [2.4, -1.2, 0]]; RP.forEach((p, i) => rooms.push(put(sc, `room${i}`, box(0.6, 0.45, 0.45, "soft", true), { at: p })));
  const path = put(sc, "path", polyline([[N0[0] + 0.5, N0[1] - 0.2, 0.3], [RP[0][0] - 0.3, RP[0][1] - 0.2, 0.3], [RP[1][0] - 0.3, RP[1][1], 0.3], [RP[2][0], RP[2][1] + 0.1, 0.3], [RP[3][0] - 0.3, RP[3][1] + 0.2, 0.3]], "accent"));
  const walker = put(sc, "walker", small(0.09, "accent"), { at: [N0[0] + 0.5, N0[1] - 0.2, 0.3] });
  const phone = put(sc, "phone", quad(0.3, 0.5, "accent"), { at: [-1.0, 1.5, 0] });
  const waves: Part[] = []; for (let i = 0; i < 2; i++) waves.push(put(sc, `pw${i}`, ring(0.25 + 0.15 * i, 10, "accent", "z"), { at: [-1.0, 1.5, 0] }));
  const nurse2 = put(sc, "nurse2", figure("accent"), { at: [1.2, 1.0, -0.6], scale: 0.7 });
  const nurse3 = put(sc, "nurse3", figure("accent"), { at: [1.9, 1.0, -0.8], scale: 0.7 });
  const shortage = put(sc, "shortage", cross([2.6, 1.15, -0.6], 0.18));
  sc.mesh.labels = [L([N0[0], N0[1] + 1.5, 0], "Oncology nurse"), L([P0[0], P0[1] - 1.4, 0], "Patient on treatment"), L([2.0, -1.75, 0], "Navigation through the pathway"), L([-1.0, 2.1, 0], "Telephone triage")];
  const base = sc.mesh.points;
  const PATH: Vec3[] = [[N0[0] + 0.5, N0[1] - 0.2, 0.3], [RP[0][0] - 0.3, RP[0][1] - 0.2, 0.3], [RP[1][0] - 0.3, RP[1][1], 0.3], [RP[2][0], RP[2][1] + 0.1, 0.3], [RP[3][0] - 0.3, RP[3][1] + 0.2, 0.3]];
  const along = (u: number): Vec3 => { const n = PATH.length - 1; const k = Math.min(n - 1, Math.floor(u * n)); return lerp3(PATH[k], PATH[k + 1], u * n - k); };
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, chart, check, path, walker, phone, ...waves, nurse2, nurse3, shortage);
    show(alpha, 0.35, ...rooms);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); moveTo(pts, base, nurse, N0, [P0[0] + 0.9, P0[1], 0.1], clamp(u * 1.5)); setAlpha(alpha, bag, 0.5 + 0.5 * clamp(u * 2 - 1)); grow(alpha, drip, clamp(u * 2 - 1)); return { caption: "1 · Specialist nurses administer chemotherapy and immunotherapy under ONS/ASCO safety standards and watch for toxicity as it happens" }; }
    if (s === 1) { const u = Q(t, 1); moveTo(pts, base, nurse, N0, [P0[0] + 0.9, P0[1], 0.1], 1); setAlpha(alpha, drip, 1); setAlpha(alpha, chart, clamp(u * 2)); moveTo(pts, base, chart, [N0[0] + 0.6, N0[1] + 0.4, 0.3], [P0[0] + 1.5, P0[1] + 0.4, 0.4], 1); grow(alpha, check, clamp(u * 2 - 0.8)); moveTo(pts, base, check, [N0[0] + 0.6, N0[1] + 0.4, 0.3], [P0[0] + 1.5, P0[1] + 0.4, 0.4], 1); return { caption: "2 · Education, symptom management and nurse-led follow-up, shown as safe as physician follow-up in breast and lung cancer" }; }
    if (s === 2) { const u = Q(t, 2); moveTo(pts, base, nurse, N0, [P0[0] + 0.9, P0[1], 0.1], 1 - u); setAlpha(alpha, drip, 0.5); show(alpha, 0.4, chart, check); moveTo(pts, base, chart, [N0[0] + 0.6, N0[1] + 0.4, 0.3], [P0[0] + 1.5, P0[1] + 0.4, 0.4], 1); moveTo(pts, base, check, [N0[0] + 0.6, N0[1] + 0.4, 0.3], [P0[0] + 1.5, P0[1] + 0.4, 0.4], 1); grow(alpha, path, clamp(u * 1.5)); rooms.forEach((r, i) => setAlpha(alpha, r, 0.35 + 0.65 * clamp(u * 4 - i))); setAlpha(alpha, walker, clamp(u * 3)); const c = along(clamp(u * 1.2)); movePart(pts, base, walker, [c[0] - PATH[0][0], c[1] - PATH[0][1], c[2] - PATH[0][2]], 1); setAlpha(alpha, phone, clamp(u * 2 - 1)); waves.forEach((w, i) => setAlpha(alpha, w, clamp(u * 2 - 1) * pulse(t + 0.1 * i, 5))); return { caption: "3 · Nurse navigation steers patients through the system, improving timeliness and reducing disparities (Freeman, Harlem 1990); telephone triage and PRO monitoring cut admissions" }; }
    const u = Q(t, 3); setAlpha(alpha, drip, 0.5); show(alpha, 0.4, chart, check); moveTo(pts, base, chart, [N0[0] + 0.6, N0[1] + 0.4, 0.3], [P0[0] + 1.5, P0[1] + 0.4, 0.4], 1); moveTo(pts, base, check, [N0[0] + 0.6, N0[1] + 0.4, 0.3], [P0[0] + 1.5, P0[1] + 0.4, 0.4], 1); setAlpha(alpha, path, 0.6); show(alpha, 0.7, ...rooms); setAlpha(alpha, walker, 1); const c = along(1); movePart(pts, base, walker, [c[0] - PATH[0][0], c[1] - PATH[0][1], c[2] - PATH[0][2]], 1); setAlpha(alpha, phone, 0.6); waves.forEach((w) => setAlpha(alpha, w, 0.3));
    setAlpha(alpha, nurse2, clamp(u * 2)); setAlpha(alpha, nurse3, clamp(u * 2 - 0.5)); setAlpha(alpha, shortage, clamp(u * 3 - 2) * pulse(t, 4));
    return { caption: "4 · Global shortages make nursing the rate-limiting resource for expanding cancer care; task-shifting lets nurses deliver chemotherapy in Rwanda and Malawi" };
  });
}

// ---------------------------------------------------------------- 23. oral cryotherapy to prevent mucositis
export function oralCryotherapy(): Mesh {
  const sc = scene();
  const MO: Vec3 = [-1.2, 0.2, 0];
  put(sc, "mouth", organ(1.0, 0.6, 0.5), { at: MO });
  const lining = put(sc, "lining", ring(0.8, 16, "soft", "z"), { at: [MO[0], MO[1], 0.3] });
  const vessels: Part[] = []; for (let i = 0; i < 6; i++) vessels.push(put(sc, `v${i}`, ring(0.09, 8, "hot", "z"), { at: [MO[0] + 0.72 * Math.cos((TAU * i) / 6), MO[1] + 0.5 * Math.sin((TAU * i) / 6), 0.35] }));
  const ice: Part[] = []; for (let i = 0; i < 4; i++) ice.push(put(sc, `ice${i}`, octahedron(0.12, "accent"), { at: [MO[0] - 0.4 + 0.3 * i, MO[1] + 1.4 + 0.2 * (i % 2), 0.3] }));
  const clock = put(sc, "clock", clockFace(0.3), { at: [0.5, 1.4, 0] });
  put(sc, "blood", tube(0.22, 3.2, "soft"), { at: [0.0, -1.2, 0] });
  const fu = put(sc, "fu", cloud(8, 0.5, "hot", 2), { at: [-1.4, -1.2, 0] });
  const upArrows: Part[] = []; for (let i = 0; i < 3; i++) upArrows.push(put(sc, `ua${i}`, arrow([MO[0] - 0.5 + 0.5 * i, -0.95, 0.2], [MO[0] - 0.5 + 0.5 * i, -0.5, 0.2], "hot")));
  const ax = put(sc, "ax", axes([1.2, -0.3, 0], 1.6, 1.4));
  const with_ = put(sc, "with", bar(1.65, 0.45, 0.3, "accent"), { at: [0, -0.3, 0] });
  const without = put(sc, "without", bar(2.25, 1.1, 0.3, "hot"), { at: [0, -0.3, 0] });
  const guide = put(sc, "guide", doc(0.55, 0.65, 4, "accent"), { at: [2.7, 1.4, 0] });
  const oxali = put(sc, "oxali", vial(0.12, 0.4, "soft"), { at: [1.4, 1.4, 0] });
  const oxaliX = put(sc, "oxaliX", cross([1.4, 1.4, 0.2], 0.2));
  sc.mesh.labels = [L([MO[0], MO[1] + 0.95, 0], "Oral mucosa and its vessels"), L([0.5, 1.9, 0], "Ice chips, 30 minutes"), L([0.0, -1.75, 0], "Bolus 5-FU in the blood"), L([1.95, -0.65, 0], "Mucositis with and without cooling")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...ice, clock, ...upArrows, ax, with_, without, guide, oxali, oxaliX);
    const s = stageOf(t);
    const flow = (k: number) => { movePart(pts, base, fu, [((t * 4 * 2.6) % 2.6) * k + 0.0, 0, 0], 1); };
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, fu, u); flow(1); upArrows.forEach((a, i) => setAlpha(alpha, a, clamp(u * 3 - i) * pulse(t + 0.1 * i, 5))); vessels.forEach((v) => setAlpha(alpha, v, 0.5 + 0.5 * u * pulse(t, 4))); setAlpha(alpha, lining, 0.5 + 0.5 * clamp(u * 2 - 1) * pulse(t, 4)); return { caption: "1 · A bolus of fluorouracil or high-dose melphalan is at peak concentration for a short window, and the mouth lining takes the dose" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, fu, 1); flow(1); ice.forEach((c, i) => { setAlpha(alpha, c, 1); moveTo(pts, base, c, [MO[0] - 0.4 + 0.3 * i, MO[1] + 1.4 + 0.2 * (i % 2), 0.3], [MO[0] - 0.4 + 0.3 * i, MO[1] + 0.1 * (i % 2), 0.4], clamp(u * 1.5 - 0.1 * i), 1, t * TAU); }); setAlpha(alpha, clock, clamp(u * 2)); vessels.forEach((v) => { setAlpha(alpha, v, 0.8); movePart(pts, base, v, [0, 0, 0], 1 - 0.5 * clamp(u * 2 - 0.8)); }); upArrows.forEach((a) => setAlpha(alpha, a, 0.6 * (1 - clamp(u * 2 - 0.8)))); return { caption: "2 · Ice chips for 30 minutes around the bolus constrict the mucosal vessels, so less drug reaches the oral epithelium" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, fu, 1); flow(1); ice.forEach((c, i) => { setAlpha(alpha, c, 0.8); moveTo(pts, base, c, [MO[0] - 0.4 + 0.3 * i, MO[1] + 1.4 + 0.2 * (i % 2), 0.3], [MO[0] - 0.4 + 0.3 * i, MO[1] + 0.1 * (i % 2), 0.4], 1, 1, TAU); }); setAlpha(alpha, clock, 0.6); vessels.forEach((v) => { setAlpha(alpha, v, 0.8); movePart(pts, base, v, [0, 0, 0], 0.5); }); setAlpha(alpha, ax, clamp(u * 2)); [with_, without].forEach((b, i) => { const v = clamp(u * 3 - 0.5 - 0.5 * i); setAlpha(alpha, b, v); movePart(pts, base, b, [0, -0.4 * (1 - v), 0], 1); }); setAlpha(alpha, guide, clamp(u * 3 - 2)); return { caption: "3 · A 2015 Cochrane review of 14 randomised trials found fewer cases of any and of moderate to severe mucositis; MASCC/ISOO 2020 recommends it for bolus 5-FU and melphalan conditioning" }; }
    const u = Q(t, 3); setAlpha(alpha, fu, 1); flow(1); ice.forEach((c, i) => { setAlpha(alpha, c, 0.8); moveTo(pts, base, c, [MO[0] - 0.4 + 0.3 * i, MO[1] + 1.4 + 0.2 * (i % 2), 0.3], [MO[0] - 0.4 + 0.3 * i, MO[1] + 0.1 * (i % 2), 0.4], 1, 1, TAU); }); setAlpha(alpha, clock, 0.6); vessels.forEach((v) => { setAlpha(alpha, v, 0.8); movePart(pts, base, v, [0, 0, 0], 0.5); }); show(alpha, 0.8, ax, with_, without, guide);
    setAlpha(alpha, oxali, clamp(u * 2)); setAlpha(alpha, oxaliX, clamp(u * 3 - 1.5));
    return { caption: "4 · Only for short-infusion drugs: no help with infusional 5-FU or capecitabine, and avoided with oxaliplatin because cold triggers acute neuropathy" };
  });
}

// ---------------------------------------------------------------- 24. polygenic risk scores
export function polygenicRiskScores(): Mesh {
  const sc = scene();
  const DN: Vec3 = [-2.2, 0.1, 0];
  put(sc, "dna", helix(0.22, 2.4, 3, 30, "soft"), { at: DN });
  put(sc, "dna2", helix(0.22, 2.4, 3, 30, "soft", Math.PI), { at: DN });
  const variants: Part[] = []; for (let i = 0; i < 9; i++) { const a = (TAU * 3 * i) / 9 + 0.4; variants.push(put(sc, `var${i}`, sphere(0.05, 2, 6, "hot"), { at: [DN[0] + 0.22 * Math.cos(a), DN[1] - 1.2 + (2.4 * i) / 9, DN[2] + 0.22 * Math.sin(a)] })); }
  const sums: Part[] = []; for (let i = 0; i < 3; i++) sums.push(put(sc, `sum${i}`, arrow([DN[0] + 0.35, DN[1] - 0.8 + 0.8 * i, 0], [-0.75, 0.55, 0], "soft")));
  const DIAL: Vec3 = [-0.1, 0.6, 0];
  put(sc, "dial", disc(0.55, 14, "accent", "z"), { at: DIAL });
  const needleD = put(sc, "needle", line([DIAL[0], DIAL[1], 0.03], [DIAL[0] - 0.42, DIAL[1] + 0.2, 0.03], "hot"));
  const factors: Part[] = []; for (let i = 0; i < 3; i++) factors.push(put(sc, `fac${i}`, box(0.35, 0.18, 0.15, "soft", true), { at: [DIAL[0] - 0.4 + 0.4 * i, DIAL[1] + 1.05, 0] }));
  const facArrows: Part[] = []; for (let i = 0; i < 3; i++) facArrows.push(put(sc, `fa${i}`, arrow([DIAL[0] - 0.4 + 0.4 * i, DIAL[1] + 0.95, 0], [DIAL[0] - 0.2 + 0.2 * i, DIAL[1] + 0.6, 0], "soft")));
  const ax = put(sc, "ax", axes([0.9, -1.4, 0], 2.2, 1.3));
  const bell = put(sc, "bell", polyline(Array.from({ length: 11 }, (_, i) => { const x = i / 10; return [0.95 + 2.0 * x, -1.4 + 1.1 * Math.exp(-((x - 0.5) ** 2) / 0.045), 0] as Vec3; }), "soft"));
  const marker = put(sc, "marker", small(0.09, "hot"), { at: [1.95, -0.25, 0.05] });
  const decile = put(sc, "decile", quad(0.3, 1.1, "hot"), { at: [2.75, -0.85, -0.02] });
  const scan = put(sc, "scan", ring(0.35, 12, "accent", "z"), { at: [2.7, 0.9, 0] });
  const scanBody = put(sc, "scanBody", small(0.12, "soft"), { at: [2.7, 0.9, 0.05] });
  const trials = put(sc, "trials", doc(0.55, 0.65, 4, "soft"), { at: [1.4, 1.3, 0] });
  sc.mesh.labels = [L([DN[0], DN[1] + 1.55, 0], "313 common variants"), L([DIAL[0], DIAL[1] - 0.9, 0], "Absolute risk model (CanRisk)"), L([1.9, -1.75, 0], "Population risk distribution"), L([2.75, 0.4, 0], "Top decile: earlier or more intensive screening")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...sums, ...factors, ...facArrows, ax, bell, marker, decile, scan, scanBody, trials);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); variants.forEach((v, i) => { setAlpha(alpha, v, clamp(u * 3 - 0.25 * i) * (0.5 + 0.5 * pulse(t + 0.05 * i, 5))); movePart(pts, base, v, [0, 0, 0], 1 + 0.6 * clamp(u * 3 - 0.25 * i)); }); sums.forEach((a, i) => grow(alpha, a, clamp(u * 3 - 1.5 - 0.3 * i))); setAlpha(alpha, needleD, 0.3 + 0.7 * clamp(u * 2 - 1)); movePart(pts, base, needleD, [0, 0, 0], 1, 0); return { caption: "1 · Hundreds of common variants each nudge risk a little; the 313-variant breast cancer score (Mavaddat, 2019) sums their small effects" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 1, ...variants); show(alpha, 0.5, ...sums); factors.forEach((f, i) => { setAlpha(alpha, f, clamp(u * 3 - i)); grow(alpha, facArrows[i], clamp(u * 3 - 0.5 - i)); }); return { caption: "2 · The genotype score is combined with age, family history and other risk factors into an absolute risk (CanRisk, the BOADICEA model used in UK clinics)" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 1, ...variants); show(alpha, 0.5, ...sums, ...facArrows); show(alpha, 0.8, ...factors); setAlpha(alpha, ax, clamp(u * 2)); grow(alpha, bell, clamp(u * 1.5 - 0.2)); setAlpha(alpha, marker, clamp(u * 2 - 1)); moveTo(pts, base, marker, [1.95, -0.25, 0.05], [2.75, -1.25, 0.05], clamp(u * 2 - 1)); setAlpha(alpha, decile, clamp(u * 3 - 2) * 0.6); setAlpha(alpha, scan, clamp(u * 3 - 2.3)); setAlpha(alpha, scanBody, clamp(u * 3 - 2.3)); return { caption: "3 · It spreads people across a several-fold range of lifetime risk; in BARCODE1 (2025) men in the top decile got MRI and biopsy regardless of PSA, with a high yield of significant cancer" }; }
    const u = Q(t, 3); show(alpha, 1, ...variants); show(alpha, 0.5, ...sums, ...facArrows); show(alpha, 0.8, ...factors, ax, bell); setAlpha(alpha, marker, 1); moveTo(pts, base, marker, [1.95, -0.25, 0.05], [2.75, -1.25, 0.05], 1); setAlpha(alpha, decile, 0.6); show(alpha, 1, scan, scanBody); movePart(pts, base, scan, [0, 0, 0], 1 + 0.15 * pulse(t, 4));
    setAlpha(alpha, trials, clamp(u * 2));
    return { caption: "4 · WISDOM and MyPeBS test risk-based mammography against age-based screening; ancestry bias, modest discrimination and unproven clinical utility are the limits" };
  });
}

// ---------------------------------------------------------------- 25. tai chi and qigong
export function taiChiQigong(): Mesh {
  const sc = scene();
  const F0: Vec3 = [-1.2, 0.1, 0];
  const head = put(sc, "head", sphere(0.2, 4, 8, "accent", true), { at: [F0[0], F0[1] + 1.05, 0] });
  const torso = put(sc, "torso", quad(0.7, 0.75, "accent"), { at: [F0[0], F0[1] + 0.45, 0] });
  const armL = put(sc, "armL", polyline([[F0[0] - 0.35, F0[1] + 0.75, 0], [F0[0] - 0.8, F0[1] + 0.55, 0.15], [F0[0] - 1.1, F0[1] + 0.75, 0.3]], "accent"));
  const armR = put(sc, "armR", polyline([[F0[0] + 0.35, F0[1] + 0.75, 0], [F0[0] + 0.8, F0[1] + 0.4, 0.15], [F0[0] + 1.0, F0[1] + 0.05, 0.3]], "accent"));
  const legL = put(sc, "legL", polyline([[F0[0] - 0.2, F0[1] + 0.08, 0], [F0[0] - 0.45, F0[1] - 0.5, 0.05], [F0[0] - 0.55, F0[1] - 1.05, 0]], "accent"));
  const legR = put(sc, "legR", polyline([[F0[0] + 0.2, F0[1] + 0.08, 0], [F0[0] + 0.45, F0[1] - 0.5, 0.05], [F0[0] + 0.55, F0[1] - 1.05, 0]], "accent"));
  const baseLine = put(sc, "base", line([F0[0] - 0.9, F0[1] - 1.05, 0], [F0[0] + 0.9, F0[1] - 1.05, 0], "soft"));
  const breath: Part[] = []; for (let i = 0; i < 3; i++) breath.push(put(sc, `br${i}`, ring(0.3 + 0.15 * i, 12, "soft", "z"), { at: [F0[0], F0[1] + 0.5, 0.1] }));
  const ax = put(sc, "ax", axes([0.7, -1.3, 0], 2.3, 1.6));
  const fatigue = put(sc, "fatigue", bar(1.1, 1.3, 0.3, "hot"), { at: [0, -1.3, 0] });
  const sleepA = put(sc, "sleepA", bar(1.8, 1.0, 0.3, "accent"), { at: [0, -1.3, 0] });
  const sleepB = put(sc, "sleepB", bar(2.35, 1.02, 0.3, "soft"), { at: [0, -1.3, 0] });
  const tl = put(sc, "tl", ticks(0.9, 2.8, 0.75, 4, "soft"));
  const guide = put(sc, "guide", doc(0.55, 0.65, 4, "accent"), { at: [2.5, 1.5, 0] });
  const fallX = put(sc, "fallX", cross([F0[0] + 1.35, F0[1] - 0.9, 0.1], 0.16));
  sc.mesh.labels = [L([F0[0], F0[1] + 1.55, 0], "Weight shift and breath"), L([1.1, -1.65, 0], "Fatigue"), L([2.1, -1.65, 0], "Sleep: tai chi versus CBT-I"), L([F0[0], F0[1] - 1.4, 0], "Balance and fall prevention")];
  const base = sc.mesh.points;
  const body = [head, torso, armL, armR, legL, legR];
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...breath, ax, fatigue, sleepA, sleepB, tl, guide, fallX);
    const s = stageOf(t);
    const sway = (k: number) => { const dx = 0.25 * Math.sin(t * TAU * 1.5) * k; body.forEach((p) => movePart(pts, base, p, [dx, 0.03 * Math.cos(t * TAU * 3) * k, 0], 1)); movePart(pts, base, armL, [dx, 0.2 * Math.sin(t * TAU * 1.5 + 1) * k, 0], 1, 0.5 * Math.sin(t * TAU * 1.5) * k); movePart(pts, base, armR, [dx, 0.25 * Math.sin(t * TAU * 1.5 + 2.5) * k, 0], 1, -0.4 * Math.sin(t * TAU * 1.5) * k); breath.forEach((b, i) => { const v = (t * 3 + i / 3) % 1; setAlpha(alpha, b, k * (1 - v) * 0.7); movePart(pts, base, b, [dx, 0, 0], 0.6 + 0.9 * v); }); };
    if (s === 0) { const u = Q(t, 0); sway(u); return { caption: "1 · Slow choreographed movement, weight shifting and breath control, from Chinese tradition, well suited to older and frailer adults" }; }
    if (s === 1) { const u = Q(t, 1); sway(1); setAlpha(alpha, ax, clamp(u * 2)); setAlpha(alpha, fatigue, clamp(u * 2 - 0.5)); movePart(pts, base, fatigue, [0, -0.65 * clamp(u * 2 - 1) * 0.5, 0], [1, 1 - 0.5 * clamp(u * 2 - 1), 1][1]); return { caption: "2 · Randomised trials in breast, lung and prostate cancer report less fatigue and better sleep, balance and quality of life" }; }
    if (s === 2) { const u = Q(t, 2); sway(1); setAlpha(alpha, ax, 1); setAlpha(alpha, fatigue, 0.8); movePart(pts, base, fatigue, [0, -0.325, 0], 0.5); [sleepA, sleepB].forEach((b, i) => { const v = clamp(u * 3 - 0.5 - 0.6 * i); setAlpha(alpha, b, v); movePart(pts, base, b, [0, -0.5 * (1 - v), 0], 1); }); grow(alpha, tl, clamp(u * 2 - 1)); return { caption: "3 · In 90 breast cancer survivors with insomnia, tai chi chih was non-inferior to CBT-I at 15 months (Irwin, JCO 2017)" }; }
    const u = Q(t, 3); sway(1); show(alpha, 1, ax, sleepA, sleepB, tl); setAlpha(alpha, fatigue, 0.8); movePart(pts, base, fatigue, [0, -0.325, 0], 0.5);
    setAlpha(alpha, guide, clamp(u * 2)); setAlpha(alpha, baseLine, 1); movePart(pts, base, baseLine, [0.25 * Math.sin(t * TAU * 1.5), 0, 0], 1 + 0.3 * u); setAlpha(alpha, fallX, clamp(u * 3 - 2));
    return { caption: "4 · The 2024 SIO-ASCO fatigue guideline recommends tai chi or qigong during treatment; trials are unblinded with varied controls, and there are no survival or recurrence data" };
  });
}

// ---------------------------------------------------------------- 26. telehealth and hospital-at-home in oncology
export function telehealthOncology(): Mesh {
  const sc = scene();
  const HOME: Vec3 = [-2.1, -0.3, 0], HOSP: Vec3 = [2.1, -0.3, 0];
  put(sc, "house", house(1.5, 1.0), { at: [HOME[0], HOME[1] + 0.15, -0.3] });
  put(sc, "patient", figure("soft"), { at: HOME, scale: 0.9 });
  put(sc, "hospital", box(1.3, 1.3, 0.8, "soft", true), { at: [HOSP[0], HOSP[1] + 0.2, -0.3] });
  put(sc, "crossV", line([HOSP[0], HOSP[1] + 0.5, 0.11], [HOSP[0], HOSP[1] + 0.9, 0.11], "soft"));
  put(sc, "crossH", line([HOSP[0] - 0.2, HOSP[1] + 0.7, 0.11], [HOSP[0] + 0.2, HOSP[1] + 0.7, 0.11], "soft"));
  const clin = put(sc, "clin", figure("accent"), { at: [HOSP[0], HOSP[1] - 0.1, 0.2], scale: 0.9 });
  const SCR: Vec3 = [0, 0.9, 0];
  const screen = put(sc, "screen", quad(1.3, 0.85, "accent"), { at: SCR });
  const face = put(sc, "face", sphere(0.14, 3, 8, "soft", true), { at: [SCR[0] - 0.3, SCR[1] + 0.05, 0.03] });
  const face2 = put(sc, "face2", sphere(0.14, 3, 8, "accent", true), { at: [SCR[0] + 0.3, SCR[1] + 0.05, 0.03] });
  const link1 = put(sc, "link1", line([HOME[0] + 0.45, HOME[1] + 0.6, 0], [SCR[0] - 0.65, SCR[1] - 0.2, 0], "accent"));
  const link2 = put(sc, "link2", line([SCR[0] + 0.65, SCR[1] - 0.2, 0], [HOSP[0] - 0.45, HOSP[1] + 0.6, 0.1], "accent"));
  const ax = put(sc, "ax", axes([-0.9, -1.6, 0], 1.8, 1.1));
  const hs = [0.05, 1.0, 0.3];
  const bars: Part[] = []; for (let i = 0; i < 3; i++) bars.push(put(sc, `b${i}`, bar(-0.55 + 0.55 * i, hs[i], 0.25, "accent"), { at: [0, -1.6, 0] }));
  const syr = put(sc, "syr", syringe(0.5, "hot"), { at: [HOME[0] + 0.9, HOME[1] + 0.5, 0.3], rotZ: -1.0 });
  const wear = put(sc, "wear", ring(0.08, 6, "hot", "x"), { at: [HOME[0] + 0.36, HOME[1] - 0.05, 0.1] });
  const wearWave = put(sc, "wearWave", ring(0.2, 8, "hot", "x"), { at: [HOME[0] + 0.36, HOME[1] - 0.05, 0.1] });
  const gapX = put(sc, "gapX", cross([HOME[0] + 0.75, HOME[1] + 1.15, 0.1], 0.16));
  const border = put(sc, "border", polyline([[0, -0.3, 0.2], [0, -0.05, 0.2], [0, 0.2, 0.2]], "hot"));
  const borderX = put(sc, "borderX", cross([0, -0.05, 0.3], 0.14));
  sc.mesh.labels = [L([HOME[0], HOME[1] - 1.3, 0], "Patient at home"), L([SCR[0], SCR[1] + 0.75, 0], "Video visit"), L([HOSP[0], HOSP[1] - 1.3, 0], "Clinician at the centre"), L([0, -1.95, 0], "Share of visits: about 1%, 50%, then 10 to 20%")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, screen, face, face2, link1, link2, ax, ...bars, syr, wear, wearWave, gapX, border, borderX);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); grow(alpha, link1, clamp(u * 2)); setAlpha(alpha, screen, clamp(u * 2 - 0.5)); setAlpha(alpha, face, clamp(u * 2 - 0.8)); setAlpha(alpha, face2, clamp(u * 2 - 1)); grow(alpha, link2, clamp(u * 2 - 0.8)); setAlpha(alpha, ax, clamp(u * 2 - 1)); [bars[0], bars[1]].forEach((b, i) => { const v = clamp(u * 3 - 1.5 - 0.5 * i); setAlpha(alpha, b, v); movePart(pts, base, b, [0, -hs[i] * (1 - v) * 0.5, 0], 1); }); return { caption: "1 · Video visits replaced in-person ones where no examination is needed; use rose from about 1% to about 50% of oncology visits at the 2020 peak" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 1, screen, face, face2, ax, bars[0], bars[1]); setAlpha(alpha, link1, 0.5 + 0.5 * pulse(t, 5)); setAlpha(alpha, link2, 0.5 + 0.5 * pulse(t + 0.1, 5)); setAlpha(alpha, bars[2], clamp(u * 2)); movePart(pts, base, bars[2], [0, -hs[2] * (1 - clamp(u * 2)) * 0.5, 0], 1); setAlpha(alpha, clin, 0.6 + 0.4 * pulse(t, 3)); return { caption: "2 · It settled around 10 to 20%: follow-up, results, and palliative care, where video was equal to in-person in REACH PC (JAMA 2024)" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.6, screen, face, face2, link1, link2); show(alpha, 0.8, ax, ...bars); setAlpha(alpha, syr, clamp(u * 2)); moveTo(pts, base, syr, [HOME[0] + 0.9, HOME[1] + 0.5, 0.3], [HOME[0] + 0.5, HOME[1] + 0.25, 0.3], clamp(u * 1.5)); setAlpha(alpha, wear, clamp(u * 2 - 1)); setAlpha(alpha, wearWave, clamp(u * 2 - 1) * pulse(t, 5)); movePart(pts, base, wearWave, [0, 0, 0], 0.7 + 0.6 * pulse(t, 5)); return { caption: "3 · Low-risk treatment moves home: subcutaneous daratumumab, pembrolizumab or trastuzumab-pertuzumab, oral drugs with remote monitoring, hospital-at-home pilots for neutropenia and CAR-T" }; }
    const u = Q(t, 3); show(alpha, 0.6, screen, face, face2, link1, link2); show(alpha, 0.8, ax, ...bars); setAlpha(alpha, syr, 0.6); moveTo(pts, base, syr, [HOME[0] + 0.9, HOME[1] + 0.5, 0.3], [HOME[0] + 0.5, HOME[1] + 0.25, 0.3], 1); setAlpha(alpha, wear, 1); setAlpha(alpha, wearWave, 0.3);
    setAlpha(alpha, gapX, clamp(u * 3) * pulse(t, 4)); setAlpha(alpha, border, clamp(u * 3 - 1)); setAlpha(alpha, borderX, clamp(u * 3 - 2));
    return { caption: "4 · The limits: broadband and digital literacy, licensure across state lines, reimbursement parity, and visits that need hands, imaging or complex toxicity care" };
  });
}

// ---------------------------------------------------------------- 27. total-body PET for screening and ultra-low-dose imaging
export function totalBodyPet(): Mesh {
  const sc = scene();
  const person = put(sc, "person", figure("soft"), { at: [0, 0, 0], scale: 1.4, rotZ: -Math.PI / 2 });
  const longDet = put(sc, "long", cylinder(0.75, 3.0, 14, 3, "accent", false, true), { at: [0, 0, 0], rotZ: Math.PI / 2 });
  const shortDet = put(sc, "short", cylinder(0.8, 0.5, 14, 2, "soft"), { at: [0.3, 0, 0], rotZ: Math.PI / 2 });
  const photons: Part[] = []; const SRC: Vec3[] = [[-0.9, 0.1, 0], [0.4, -0.05, 0.1], [1.0, 0.15, -0.1]]; SRC.forEach((p, i) => { for (let k = 0; k < 2; k++) { const a = 0.5 + k * 1.3 + i * 0.4; photons.push(put(sc, `ph${i}${k}`, line([p[0], p[1] - 0.72 * Math.sin(a), p[2] - 0.72 * Math.cos(a)], [p[0], p[1] + 0.72 * Math.sin(a), p[2] + 0.72 * Math.cos(a)], "accent"))); } });
  const ax = put(sc, "ax", axes([-2.9, -1.6, 0], 1.4, 1.1));
  const sensA = put(sc, "sensA", bar(-2.55, 0.05, 0.28, "soft"), { at: [0, -1.6, 0] });
  const sensB = put(sc, "sensB", bar(-2.0, 1.0, 0.28, "accent"), { at: [0, -1.6, 0] });
  const clock = put(sc, "clock", clockFace(0.3), { at: [1.9, -1.2, 0] });
  const doseA = put(sc, "doseA", bar(2.6, 0.9, 0.28, "soft"), { at: [0, -1.6, 0] });
  const doseB = put(sc, "doseB", bar(2.6, 0.12, 0.28, "accent"), { at: [0, -1.6, 0] });
  const inc = put(sc, "inc", blob(0.12, "hot"), { at: [0.55, 0.15, 0.45] });
  const incRing = put(sc, "incRing", ring(0.24, 10, "hot", "z"), { at: [0.55, 0.15, 0.45] });
  const evid = put(sc, "evid", doc(0.55, 0.65, 4, "soft"), { at: [2.4, 1.3, 0] });
  const evidX = put(sc, "evidX", cross([2.4, 1.3, 0.1], 0.22));
  sc.mesh.labels = [L([0, 1.25, 0], "Long axial field of view: the whole body at once"), L([0.3, -1.05, 0.9], "Conventional ring"), L([-2.3, -1.95, 0], "Roughly forty times the sensitivity"), L([2.6, -1.95, 0], "Dose or time, traded down")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...photons, ax, sensA, sensB, clock, doseA, doseB, inc, incRing, evid, evidX);
    setAlpha(alpha, person, 0.7);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, shortDet, 1 - 0.6 * u); setAlpha(alpha, longDet, 0.2 + 0.8 * u); movePart(pts, base, longDet, [0, 0, 0], 1, 0); photons.forEach((p, i) => setAlpha(alpha, p, clamp(u * 3 - 1 - 0.2 * i) * pulse(t + 0.07 * i, 7))); setAlpha(alpha, ax, clamp(u * 2 - 1)); [sensA, sensB].forEach((b, i) => { const v = clamp(u * 3 - 1.5 - 0.5 * i); setAlpha(alpha, b, v); movePart(pts, base, b, [0, -0.5 * (1 - v), 0], 1); }); return { caption: "1 · A long axial detector covers the whole body in one field of view, catching roughly forty times more of the emitted photons than a conventional scanner" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, shortDet, 0.4); setAlpha(alpha, longDet, 1); photons.forEach((p, i) => setAlpha(alpha, p, 0.5 * pulse(t + 0.07 * i, 7))); show(alpha, 1, ax, sensA, sensB); setAlpha(alpha, clock, clamp(u * 2)); setAlpha(alpha, doseA, clamp(u * 2 - 0.5) * 0.5); setAlpha(alpha, doseB, clamp(u * 2 - 1)); movePart(pts, base, doseA, [0, 0, 0], [1, 1 - 0.85 * clamp(u * 2 - 1), 1][1]); return { caption: "2 · That sensitivity is traded for time or dose: minute-long scans, very low tracer doses, and dynamic whole-body kinetics for radioligand dosimetry" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, shortDet, 0.4); setAlpha(alpha, longDet, 1); photons.forEach((p, i) => setAlpha(alpha, p, 0.5 * pulse(t + 0.07 * i, 7))); show(alpha, 1, ax, sensA, sensB, clock, doseB); setAlpha(alpha, doseA, 0.3); movePart(pts, base, doseA, [0, 0, 0], 0.15); setAlpha(alpha, person, 1); setAlpha(alpha, inc, clamp(u * 3 - 1.5) * pulse(t, 5)); setAlpha(alpha, incRing, clamp(u * 3 - 2) * pulse(t, 5)); movePart(pts, base, incRing, [0, 0, 0], 0.8 + 0.5 * pulse(t, 5)); return { caption: "3 · Scanning healthy people becomes technically conceivable for the first time, and the scan finds things: incidentalomas that need working up" }; }
    const u = Q(t, 3); setAlpha(alpha, shortDet, 0.4); setAlpha(alpha, longDet, 1); photons.forEach((p, i) => setAlpha(alpha, p, 0.5 * pulse(t + 0.07 * i, 7))); show(alpha, 1, ax, sensA, sensB, clock, doseB); setAlpha(alpha, doseA, 0.3); movePart(pts, base, doseA, [0, 0, 0], 0.15); setAlpha(alpha, person, 1); setAlpha(alpha, inc, 0.8); setAlpha(alpha, incRing, 0.5);
    setAlpha(alpha, evid, clamp(u * 2)); setAlpha(alpha, evidX, clamp(u * 3 - 1.5));
    return { caption: "4 · There is no evidence of mortality benefit, and incidentalomas, cost and radiation argue against screening; near-term value is dosimetry, paediatrics and pharmacokinetic research" };
  });
}

// ---------------------------------------------------------------- 28. AI compute and model platforms
export function aiComputePlatforms(): Mesh {
  const sc = scene();
  const RK: Vec3 = [0, -0.5, 0];
  const racks: Part[] = []; for (let i = 0; i < 4; i++) racks.push(put(sc, `rack${i}`, box(1.4, 0.28, 0.9, "accent", true), { at: [RK[0], RK[1] - 0.6 + 0.34 * i, RK[2]] }));
  const leds: Part[] = []; for (let i = 0; i < 4; i++) leds.push(put(sc, `led${i}`, dots([[RK[0] - 0.5, RK[1] - 0.6 + 0.34 * i, 0.46], [RK[0] - 0.3, RK[1] - 0.6 + 0.34 * i, 0.46]], "hot")));
  put(sc, "slide", quad(0.7, 0.45, "soft"), { at: [-2.4, 0.9, 0] });
  const slideDots = put(sc, "slideDots", cloud(6, 0.2, "hot", 3), { at: [-2.4, 0.9, 0.02] });
  put(sc, "ctRing", ring(0.3, 12, "soft", "z"), { at: [-2.4, -0.3, 0] });
  const inArrows: Part[] = [put(sc, "in0", arrow([-1.95, 0.8, 0], [RK[0] - 0.75, RK[1] + 0.2, 0], "soft")), put(sc, "in1", arrow([-2.05, -0.3, 0], [RK[0] - 0.75, RK[1] - 0.2, 0], "soft"))];
  const NET: Vec3 = [0, 1.25, 0];
  const nodes: Part[] = []; const NP: Vec3[] = [[-0.6, 0.3, 0], [-0.6, -0.3, 0], [0, 0.45, 0.1], [0, 0, 0.1], [0, -0.45, 0.1], [0.6, 0.3, 0], [0.6, -0.3, 0]]; NP.forEach((p, i) => nodes.push(put(sc, `nd${i}`, small(0.07, "accent"), { at: [NET[0] + p[0], NET[1] + p[1], NET[2] + p[2]] })));
  const edges: Part[] = []; [[0, 2], [0, 3], [1, 3], [1, 4], [2, 5], [3, 5], [3, 6], [4, 6]].forEach(([a, b], i) => edges.push(put(sc, `ed${i}`, line([NET[0] + NP[a][0], NET[1] + NP[a][1], NET[2] + NP[a][2]], [NET[0] + NP[b][0], NET[1] + NP[b][1], NET[2] + NP[b][2]], "soft"))));
  const fw: Part[] = []; for (let i = 0; i < 3; i++) fw.push(put(sc, `fw${i}`, doc(0.45, 0.3, 2, "soft"), { at: [-1.6 + 0.0 * i, 1.9 - 0.45 * i, -0.2] }));
  const out = put(sc, "out", arrow([RK[0] + 0.75, RK[1] + 0.1, 0], [1.75, 0.5, 0], "accent"));
  const viewer = put(sc, "viewer", quad(0.9, 0.65, "accent"), { at: [2.25, 0.75, 0] });
  const heat = put(sc, "heat", cloud(5, 0.2, "hot", 4), { at: [2.35, 0.7, 0.03] });
  const lock = put(sc, "lock", box(0.4, 0.3, 0.25, "soft", true), { at: [2.2, -0.9, 0] });
  const lockArc = put(sc, "lockArc", ring(0.14, 8, "soft", "z"), { at: [2.2, -0.65, 0] });
  const reg = put(sc, "reg", doc(0.5, 0.6, 4, "soft"), { at: [2.9, -0.9, 0] });
  sc.mesh.labels = [L([RK[0], RK[1] - 1.25, 0], "GPU cluster"), L([-2.4, 1.45, 0], "Pathology slides and radiology in"), L([NET[0], NET[1] + 0.85, 0], "Foundation model"), L([2.5, -1.45, 0], "Governance and validation")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...inArrows, ...nodes, ...edges, ...fw, out, viewer, heat, lock, lockArc, reg);
    leds.forEach((l, i) => setAlpha(alpha, l, 0.4 + 0.6 * pulse(t + 0.13 * i, 9)));
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); inArrows.forEach((a, i) => grow(alpha, a, clamp(u * 1.5 - 0.2 * i))); setAlpha(alpha, slideDots, 0.5 + 0.5 * pulse(t, 4)); movePart(pts, base, slideDots, [1.2 * clamp(u * 1.5 - 0.3), -0.6 * clamp(u * 1.5 - 0.3), 0], 1); racks.forEach((r, i) => setAlpha(alpha, r, 0.6 + 0.4 * clamp(u * 4 - i))); return { caption: "1 · Whole-slide images, CT and MRI, and molecular data stream into GPU clusters, on premises or in the cloud" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 0.5, ...inArrows); movePart(pts, base, slideDots, [1.2, -0.6, 0], 1); setAlpha(alpha, slideDots, 0.3); fw.forEach((f, i) => setAlpha(alpha, f, clamp(u * 3 - i))); nodes.forEach((n, i) => setAlpha(alpha, n, clamp(u * 2 - 0.1 * i))); edges.forEach((e, i) => setAlpha(alpha, e, clamp(u * 2 - 0.5 - 0.1 * i) * (0.5 + 0.5 * pulse(t + 0.1 * i, 5)))); return { caption: "2 · Domain frameworks (NVIDIA Clara, MONAI, BioNeMo) supply pretrained encoders, DICOM and whole-slide I/O, and deployment tooling" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.5, ...inArrows, ...fw); movePart(pts, base, slideDots, [1.2, -0.6, 0], 1); setAlpha(alpha, slideDots, 0.3); show(alpha, 1, ...nodes); edges.forEach((e, i) => setAlpha(alpha, e, 0.5 + 0.5 * pulse(t + 0.1 * i, 5))); grow(alpha, out, clamp(u * 2)); setAlpha(alpha, viewer, clamp(u * 2 - 0.5)); setAlpha(alpha, heat, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "3 · Foundation models train and serve on hyperscaler services (AWS HealthOmics, Google MedGemma, Azure Prov-GigaPath) and open hubs, then run in the pathology or radiology viewer" }; }
    const u = Q(t, 3); show(alpha, 0.5, ...inArrows, ...fw); movePart(pts, base, slideDots, [1.2, -0.6, 0], 1); setAlpha(alpha, slideDots, 0.3); show(alpha, 1, ...nodes, out, viewer); edges.forEach((e, i) => setAlpha(alpha, e, 0.5 + 0.5 * pulse(t + 0.1 * i, 5))); setAlpha(alpha, heat, 0.8);
    setAlpha(alpha, lock, clamp(u * 2)); setAlpha(alpha, lockArc, clamp(u * 2)); setAlpha(alpha, reg, clamp(u * 2 - 0.8));
    return { caption: "4 · Compute access, data governance and validation frameworks decide who can build and deploy; regulatory clearance lags, and capacity sits with a few vendors" };
  });
}

// ---------------------------------------------------------------- 29. apheresis and starting-material collection
export function apheresisStartingMaterial(): Mesh {
  const sc = scene();
  const P0: Vec3 = [-2.2, 0.1, 0];
  put(sc, "patient", figure("soft"), { at: P0, scale: 1.2 });
  const MC: Vec3 = [0.3, 0.2, 0];
  put(sc, "machine", box(1.4, 1.5, 0.8, "accent", true), { at: MC });
  const drum = put(sc, "drum", disc(0.42, 14, "soft", "z"), { at: [MC[0], MC[1] + 0.15, 0.41] });
  const spokes: Part[] = []; for (let i = 0; i < 3; i++) spokes.push(put(sc, `sp${i}`, line([MC[0], MC[1] + 0.15, 0.42], [MC[0] + 0.4 * Math.cos((TAU * i) / 3), MC[1] + 0.15 + 0.4 * Math.sin((TAU * i) / 3), 0.42], "accent")));
  const lineOut = put(sc, "lineOut", polyline([[P0[0] + 0.45, P0[1] + 0.3, 0.15], [-1.0, 0.7, 0.2], [MC[0] - 0.7, MC[1] + 0.5, 0.2]], "hot"));
  const lineBack = put(sc, "lineBack", polyline([[MC[0] - 0.7, MC[1] - 0.4, 0.2], [-1.0, -0.4, 0.2], [P0[0] + 0.45, P0[1] - 0.1, 0.15]], "soft"));
  const blood: Part[] = []; for (let i = 0; i < 3; i++) blood.push(put(sc, `bl${i}`, small(0.06, "hot"), { at: [P0[0] + 0.45, P0[1] + 0.3, 0.2] }));
  const back: Part[] = []; for (let i = 0; i < 3; i++) back.push(put(sc, `bk${i}`, small(0.06, "soft"), { at: [MC[0] - 0.7, MC[1] - 0.4, 0.25] }));
  const mnc = put(sc, "mnc", cloud(8, 0.25, "accent", 5), { at: [MC[0], MC[1] + 0.15, 0.45] });
  const BAG: Vec3 = [1.6, 0.9, 0.2];
  const bag = put(sc, "bag", vial(0.2, 0.55, "accent"), { at: BAG });
  const bagLine = put(sc, "bagLine", polyline([[MC[0] + 0.7, MC[1] + 0.5, 0.2], [BAG[0], MC[1] + 0.5, 0.2], [BAG[0], BAG[1] - 0.28, 0.2]], "accent"));
  const qc = put(sc, "qc", doc(0.55, 0.65, 4, "soft"), { at: [2.6, 0.9, 0] });
  const shipper = put(sc, "shipper", box(0.6, 0.6, 0.6, "soft", true), { at: [2.3, -0.9, 0] });
  const shipArrow = put(sc, "shipArrow", arrow([BAG[0], BAG[1] - 0.45, 0.2], [2.1, -0.5, 0.2], "soft"));
  const clock = put(sc, "clock", clockFace(0.28), { at: [-1.0, 1.5, 0] });
  const benda = put(sc, "benda", vial(0.1, 0.32, "hot"), { at: [P0[0] - 0.75, P0[1] + 1.2, 0.2] });
  const bendaArrow = put(sc, "bendaArrow", arrow([P0[0] - 0.65, P0[1] + 0.95, 0.2], [P0[0] - 0.3, P0[1] + 0.55, 0.2], "hot"));
  const fit = put(sc, "fit", ring(0.3, 10, "hot", "z"), { at: [BAG[0], BAG[1], 0.35] });
  const slot = put(sc, "slot", ticks(-0.4, 1.6, -1.5, 5, "soft"));
  const slotX: Part[] = []; for (let i = 0; i < 3; i++) slotX.push(put(sc, `sx${i}`, cross([-0.4 + 0.5 * i, -1.5, 0.05], 0.09)));
  sc.mesh.labels = [L([P0[0], P0[1] + 1.5, 0], "Patient on the apheresis machine"), L([MC[0], MC[1] - 1.1, 0], "Continuous-flow centrifuge"), L([BAG[0], BAG[1] + 0.65, 0], "Mononuclear cell bag"), L([2.6, 1.55, 0], "CD3 count, viability")];
  const base = sc.mesh.points;
  const OUT: Vec3[] = [[P0[0] + 0.45, P0[1] + 0.3, 0.2], [-1.0, 0.7, 0.25], [MC[0] - 0.7, MC[1] + 0.5, 0.25]];
  const BACK: Vec3[] = [[MC[0] - 0.7, MC[1] - 0.4, 0.25], [-1.0, -0.4, 0.25], [P0[0] + 0.45, P0[1] - 0.1, 0.2]];
  const along = (P: Vec3[], u: number): Vec3 => { const n = P.length - 1; const k = Math.min(n - 1, Math.floor(u * n)); return lerp3(P[k], P[k + 1], u * n - k); };
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...blood, ...back, mnc, bag, bagLine, qc, shipper, shipArrow, clock, benda, bendaArrow, fit, slot, ...slotX);
    const s = stageOf(t);
    const circulate = (k: number) => { blood.forEach((b, i) => { const v = (t * 3 + i / 3) % 1; setAlpha(alpha, b, k); const c = along(OUT, v); movePart(pts, base, b, [c[0] - OUT[0][0], c[1] - OUT[0][1], c[2] - OUT[0][2]], 1); }); back.forEach((b, i) => { const v = (t * 3 + i / 3 + 0.15) % 1; setAlpha(alpha, b, k); const c = along(BACK, v); movePart(pts, base, b, [c[0] - BACK[0][0], c[1] - BACK[0][1], c[2] - BACK[0][2]], 1); }); spokes.forEach((sp) => movePart(pts, base, sp, [0, 0, 0], 1, 0)); };
    const spin = (k: number) => { const a = t * TAU * 6 * k; spokes.forEach((sp, i) => { const c: Vec3 = [MC[0], MC[1] + 0.15, 0.42]; const ang = (TAU * i) / 3 + a; pts[sp.p1 - 1] = [c[0] + 0.4 * Math.cos(ang), c[1] + 0.4 * Math.sin(ang), c[2]]; }); };
    if (s === 0) { const u = Q(t, 0); grow(alpha, lineOut, clamp(u * 2)); grow(alpha, lineBack, clamp(u * 2 - 0.5)); circulate(clamp(u * 2 - 1)); spin(1); setAlpha(alpha, clock, clamp(u * 2 - 1)); return { caption: "1 · Blood flows from the patient through a Spectra Optia or Amicus over several hours; every autologous CAR-T begins here" }; }
    if (s === 1) { const u = Q(t, 1); circulate(1); spin(1); setAlpha(alpha, clock, 0.6); setAlpha(alpha, drum, 0.5 + 0.5 * pulse(t, 3)); setAlpha(alpha, mnc, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); movePart(pts, base, mnc, [0, 0, 0], 1, t * TAU * 2); return { caption: "2 · Continuous-flow centrifugation separates the mononuclear cells into a layer; plasma and red cells return to the patient" }; }
    if (s === 2) { const u = Q(t, 2); circulate(1); spin(1); setAlpha(alpha, clock, 0.6); grow(alpha, bagLine, clamp(u * 2)); setAlpha(alpha, bag, clamp(u * 2 - 0.3)); setAlpha(alpha, mnc, 1); moveTo(pts, base, mnc, [MC[0], MC[1] + 0.15, 0.45], BAG, clamp(u * 1.6 - 0.2), 0.7); setAlpha(alpha, qc, clamp(u * 2 - 1)); setAlpha(alpha, shipper, clamp(u * 3 - 2)); grow(alpha, shipArrow, clamp(u * 3 - 2)); return { caption: "3 · The product is characterised (CD3 count, viability) and shipped fresh or cryopreserved to the manufacturing site" }; }
    const u = Q(t, 3); circulate(0.6); spin(1); setAlpha(alpha, clock, 0.6); show(alpha, 0.8, bagLine, bag, qc, shipper, shipArrow); setAlpha(alpha, mnc, 1); moveTo(pts, base, mnc, [MC[0], MC[1] + 0.15, 0.45], BAG, 1, 0.7);
    setAlpha(alpha, benda, clamp(u * 2)); grow(alpha, bendaArrow, clamp(u * 2 - 0.3)); setAlpha(alpha, fit, clamp(u * 2 - 0.8) * pulse(t, 4)); grow(alpha, slot, clamp(u * 2 - 1)); slotX.forEach((x, i) => setAlpha(alpha, x, clamp(u * 3 - 2 - 0.2 * i)));
    return { caption: "4 · T-cell fitness at collection, worn down by prior chemotherapy such as bendamustine and by disease burden, predicts CAR-T expansion; apheresis slots are a hidden bottleneck" };
  });
}

// ---------------------------------------------------------------- 30. breath and volatile-organic-compound detection
export function breathVocs(): Mesh {
  const sc = scene();
  const F0: Vec3 = [-2.4, -0.1, 0];
  put(sc, "person", figure("soft"), { at: F0, scale: 1.2 });
  const breath: Part[] = []; for (let i = 0; i < 3; i++) breath.push(put(sc, `br${i}`, ring(0.1 + 0.08 * i, 10, "soft", "x"), { at: [F0[0] + 0.3 + 0.25 * i, F0[1] + 0.95, 0] }));
  const TB: Vec3 = [-0.9, 0.85, 0];
  const tubeP = put(sc, "tube", cylinder(0.14, 0.9, 10, 2, "accent", true, true), { at: TB, rotZ: Math.PI / 2 });
  const vocs = put(sc, "vocs", cloud(7, 0.25, "hot", 4), { at: [F0[0] + 0.5, F0[1] + 0.95, 0.05] });
  const GC: Vec3 = [0.8, 0.2, 0];
  put(sc, "gc", box(1.3, 1.2, 0.8, "soft", true), { at: GC });
  const colLine = put(sc, "colLine", polyline([[GC[0] - 0.5, GC[1] + 0.35, 0.41], [GC[0] + 0.5, GC[1] + 0.35, 0.41], [GC[0] + 0.5, GC[1] + 0.05, 0.41], [GC[0] - 0.5, GC[1] + 0.05, 0.41], [GC[0] - 0.5, GC[1] - 0.25, 0.41], [GC[0] + 0.5, GC[1] - 0.25, 0.41]], "soft"));
  const sep: Part[] = []; for (let i = 0; i < 5; i++) sep.push(put(sc, `sep${i}`, small(0.05, "hot"), { at: [GC[0] - 0.5, GC[1] + 0.35, 0.45] }));
  const ax = put(sc, "ax", axes([1.7, -1.5, 0], 1.6, 1.1));
  const hs = [0.3, 0.8, 0.45, 1.0, 0.25];
  const peaks: Part[] = []; for (let i = 0; i < 5; i++) peaks.push(put(sc, `pk${i}`, bar(1.9 + 0.28 * i, hs[i], 0.14, "hot"), { at: [0, -1.5, 0] }));
  const ml = put(sc, "ml", box(0.7, 0.5, 0.4, "accent", true), { at: [2.6, 0.9, 0] });
  const mlArrow = put(sc, "mlArrow", arrow([2.5, -0.35, 0], [2.6, 0.6, 0], "accent"));
  const verdict = put(sc, "verdict", ring(0.2, 10, "accent", "z"), { at: [2.6, 1.6, 0] });
  const nose = put(sc, "nose", cloud(6, 0.3, "accent", 7), { at: [GC[0], GC[1] - 0.9, 0.3] });
  const approvedX = put(sc, "approvedX", cross([2.6, 0.9, 0.25], 0.22));
  const triage = put(sc, "triage", ring(0.3, 12, "soft", "z"), { at: [0.2, 1.7, 0] });
  sc.mesh.labels = [L([F0[0], F0[1] + 1.5, 0], "Exhaled breath"), L([TB[0], TB[1] + 0.55, 0], "Sorbent tube"), L([GC[0], GC[1] - 0.95, 0], "GC-MS or electronic nose"), L([2.4, -1.85, 0], "Pattern classified by machine learning")];
  const base = sc.mesh.points;
  const COL: Vec3[] = [[GC[0] - 0.5, GC[1] + 0.35, 0.45], [GC[0] + 0.5, GC[1] + 0.35, 0.45], [GC[0] + 0.5, GC[1] + 0.05, 0.45], [GC[0] - 0.5, GC[1] + 0.05, 0.45], [GC[0] - 0.5, GC[1] - 0.25, 0.45], [GC[0] + 0.5, GC[1] - 0.25, 0.45]];
  const along = (u: number): Vec3 => { const n = COL.length - 1; const k = Math.min(n - 1, Math.floor(u * n)); return lerp3(COL[k], COL[k + 1], u * n - k); };
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...sep, ax, ...peaks, ml, mlArrow, verdict, nose, approvedX, triage);
    setAlpha(alpha, colLine, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); breath.forEach((b, i) => { const v = (t * 4 + i / 3) % 1; setAlpha(alpha, b, u * (1 - v)); movePart(pts, base, b, [0.9 * v, 0, 0], 0.6 + 1.2 * v); }); setAlpha(alpha, vocs, u); moveTo(pts, base, vocs, [F0[0] + 0.5, F0[1] + 0.95, 0.05], TB, clamp(u * 1.4 - 0.2), 0.6); setAlpha(alpha, tubeP, 0.5 + 0.5 * clamp(u * 2 - 1)); return { caption: "1 · Tumour metabolism changes the trace volatile compounds in exhaled breath; a sample is collected on a sorbent tube or sampled directly" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 0.3, ...breath); setAlpha(alpha, vocs, 1 - clamp(u * 2)); moveTo(pts, base, vocs, [F0[0] + 0.5, F0[1] + 0.95, 0.05], TB, 1, 0.6); sep.forEach((p, i) => { setAlpha(alpha, p, clamp(u * 3 - 0.2 * i)); const c = along(clamp(u * 1.3 - 0.12 * i)); movePart(pts, base, p, [c[0] - COL[0][0], c[1] - COL[0][1], c[2] - COL[0][2]], 1); }); setAlpha(alpha, nose, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "2 · Gas chromatography-mass spectrometry, or an electronic-nose sensor array, separates the compounds into a pattern" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.3, ...breath); setAlpha(alpha, vocs, 0); sep.forEach((p, i) => { setAlpha(alpha, p, 0.8); const c = along(1 - 0.12 * i); movePart(pts, base, p, [c[0] - COL[0][0], c[1] - COL[0][1], c[2] - COL[0][2]], 1); }); setAlpha(alpha, nose, 0.5); setAlpha(alpha, ax, clamp(u * 2)); peaks.forEach((p, i) => { const v = clamp(u * 3 - 0.3 * i); setAlpha(alpha, p, v); movePart(pts, base, p, [0, -hs[i] * (1 - v) * 0.5, 0], 1); }); grow(alpha, mlArrow, clamp(u * 3 - 1.5)); setAlpha(alpha, ml, clamp(u * 3 - 2)); return { caption: "3 · Machine learning classifies the pattern; COBRA2 (colorectal, Imperial), an MSK electronic-nose study and a Breathe BioMedical breast study are recruiting in 2026" }; }
    const u = Q(t, 3); show(alpha, 0.3, ...breath); setAlpha(alpha, vocs, 0); sep.forEach((p, i) => { setAlpha(alpha, p, 0.8); const c = along(1 - 0.12 * i); movePart(pts, base, p, [c[0] - COL[0][0], c[1] - COL[0][1], c[2] - COL[0][2]], 1); }); setAlpha(alpha, nose, 0.5); show(alpha, 1, ax, ...peaks, mlArrow, ml);
    setAlpha(alpha, verdict, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, approvedX, clamp(u * 3 - 1.5)); setAlpha(alpha, triage, clamp(u * 3 - 2)); peaks.forEach((p, i) => movePart(pts, base, p, [0, -hs[i] * 0.25 * u * Math.sin(i * 2.1) * 0.5, 0], 1 - 0.2 * u * Math.abs(Math.sin(i * 2.1))));
    return { caption: "4 · Accuracies vary widely between cohorts, diets and smoking status; no breath test is approved for screening, so the near-term role is triage for imaging" };
  });
}

// ---- WAVE6_MORE_SCENES

export const WAVE6: Record<string, () => Mesh> = {
  "active-surveillance-thyroid": activeSurveillanceThyroid,
  "decentralised-clinical-trials": decentralisedClinicalTrials,
  "glutamine-mucositis-neuropathy": glutamineMucositis,
  "infusion-devices-vascular-access": infusionDevices,
  "interception-vaccination": interceptionVaccination,
  "next-gen-short-read-platforms": nextGenShortRead,
  "omega3-epa-cachexia": omega3Epa,
  "remote-patient-monitoring": remotePatientMonitoring,
  "wigs-cranial-prosthesis": wigsCranialProsthesis,
  "acupuncture-aromatase-inhibitor-arthralgia": acupunctureAiArthralgia,
  "acupuncture-chemotherapy-neuropathy": acupunctureNeuropathy,
  "acupuncture-hot-flushes": acupunctureHotFlushes,
  "caix-pet": caixPet,
  "cystoscopy-turbt": cystoscopyTurbt,
  "digital-twins-trials": digitalTwinsTrials,
  "electrochemotherapy": electrochemotherapy,
  "genomics-cloud-platforms": genomicsCloudPlatforms,
  "hypoxia-activated-therapy": hypoxiaActivatedTherapy,
  "logic-gated-therapeutics": logicGatedTherapeutics,
  "monoclonal-antibody-manufacturing": mabManufacturing,
  "nhs-targeted-lung-health-check": nhsLungHealthCheck,
  "oncology-nursing": oncologyNursing,
  "oral-cryotherapy-mucositis": oralCryotherapy,
  "polygenic-risk-scores": polygenicRiskScores,
  "tai-chi-qigong": taiChiQigong,
  "telehealth-oncology": telehealthOncology,
  "total-body-pet-screening": totalBodyPet,
  "ai-compute-platforms": aiComputePlatforms,
  "apheresis-starting-material": apheresisStartingMaterial,
  "breath-vocs": breathVocs,
  // ---- WAVE6_MORE_KEYS
};

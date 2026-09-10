/**
 * Wave 7 of animated technology schematics: forty more well-connected technologies that until now fell back to a
 * generic front placeholder (lifestyle and diet evidence such as coffee, green tea and fasting-mimicking diets; the
 * limb-saving and organ-sparing procedures of isolated limb perfusion, partial nephrectomy and fertility-sparing
 * progestins; supportive care with a trial record such as decongestive therapy, P6 acupressure, hypnosis, yoga and
 * frozen gloves; laboratory and pharmacy infrastructure from autostainers and pre-analytic tubes to compounding robots;
 * radiopharmacy hardware and physics such as generators, Auger emitters and alpha nanogenerators; and the negative
 * record of hydrazine sulfate and antineoplastons). Same conventions as ./animated-wave6.ts: a scene of named parts
 * around one focal object with a filled body, one to three animated actors, four captioned phases on a 12-14 s loop,
 * three or four plain labels, every mesh under 500 points. Numbers in captions come from the technology record only.
 * The viewer blends the last 14 % of the cycle back to frame 0, so each scene simply ends in its final state.
 *
 * Self-contained (imports only the wireframe primitives) so that ./animated.ts can spread WAVE7 into its registry without
 * an import cycle.
 */
import { add, arrow, box, cone, cylinder, disc, dots, ellipsoid, empty, helix, lerp3, line, movePart, octahedron, part, phase, polyline, ring, setAlpha, sphere, syringe, torus, type Mesh, type Part, type Vec3 } from "@/lib/wireframe";

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
/** Small house outline (a home, a clinic), centred at origin. */
const house = (w = 1.2, h = 0.8, cls = "soft") => polyline([[-w / 2, -h / 2, 0], [w / 2, -h / 2, 0], [w / 2, h / 2, 0], [0, h / 2 + 0.45, 0], [-w / 2, h / 2, 0]], cls, true);
/** Clock face in the XY plane: a filled rim and two hands. */
const clockFace = (r = 0.35, cls = "soft") => { const m = disc(r, 12, cls, "z"); add(m, line([0, 0, 0.01], [0, r * 0.7, 0.01], "accent")); add(m, line([0, 0, 0.01], [r * 0.5, 0, 0.01], "accent")); return m; };
/** Dumbbell lying along x: a bar with two filled weights. */
const dumbbell = (s = 1, cls = "accent") => { const m = line([-0.35 * s, 0, 0], [0.35 * s, 0, 0], cls); add(m, cylinder(0.12 * s, 0.1 * s, 8, 2, cls, true, true), { at: [-0.35 * s, 0, 0], rotZ: Math.PI / 2 }); add(m, cylinder(0.12 * s, 0.1 * s, 8, 2, cls, true, true), { at: [0.35 * s, 0, 0], rotZ: Math.PI / 2 }); return m; };
/** Open hand seen from above: a filled palm with five finger strokes, fingers pointing +y. */
function hand(cls = "soft"): Mesh {
  const m = ellipsoid(0.32, 0.36, 0.1, 4, 8, cls, true);
  for (let i = 0; i < 4; i++) { const x = -0.24 + 0.16 * i; add(m, polyline([[x, 0.3, 0], [x, 0.62 + (i === 1 || i === 2 ? 0.1 : 0), 0]], cls)); }
  add(m, polyline([[0.3, 0.05, 0], [0.5, 0.3, 0]], cls));
  return m;
}
/** Building block: a filled box with a row of window strokes. */
const building = (w = 1.0, h = 0.9, cls = "soft") => { const m = box(w, h, 0.5, cls, true); for (let i = 0; i < 3; i++) add(m, line([-w / 2 + 0.2 + (i * (w - 0.4)) / 2, h / 2 - 0.25, 0.26], [-w / 2 + 0.2 + (i * (w - 0.4)) / 2, h / 2 - 0.45, 0.26], "soft")); return m; };
function frame(sc: Scene, duration: number, fn: (t: number, pts: Vec3[], alpha: number[]) => { caption: string; labels?: Lbl[] }): Mesh {
  sc.mesh.animate = { duration, frame: (t) => { const pts = sc.mesh.points.map((p) => [p[0], p[1], p[2]] as Vec3); const alpha = sc.mesh.segments.map(() => 1); const r = fn(t, pts, alpha); return { points: pts, alpha, caption: r.caption, labels: r.labels ?? sc.mesh.labels }; } };
  return sc.mesh;
}
const L = (at: Vec3, text: string): Lbl => ({ at, text });

// ---------------------------------------------------------------- 1. coffee and tea intake
export function coffeeIntake(): Mesh {
  const sc = scene();
  const LIV: Vec3 = [1.5, 0.1, 0];
  const liver = put(sc, "liver", organ(1.0, 0.62, 0.45), { at: LIV });
  put(sc, "lobe", organ(0.45, 0.35, 0.3), { at: [LIV[0] + 0.85, LIV[1] - 0.25, 0.1] });
  const CUP: Vec3 = [-1.9, -0.2, 0];
  put(sc, "cup", cylinder(0.32, 0.5, 10, 2, "accent", true, true), { at: CUP });
  put(sc, "handle", ring(0.14, 8, "accent", "z"), { at: [CUP[0] + 0.4, CUP[1], 0] });
  const steam: Part[] = []; for (let i = 0; i < 3; i++) steam.push(put(sc, `st${i}`, ring(0.08, 6, "soft", "y"), { at: [CUP[0] - 0.12 + 0.12 * i, CUP[1] + 0.4, 0] }));
  const card = put(sc, "card", doc(0.8, 0.6, 2, "soft"), { at: [-1.9, 1.15, 0] });
  const g2b = put(sc, "g2b", cross([-2.15, 1.15, 0.05], 0.12));
  const g3 = put(sc, "g3", small(0.08, "accent"), { at: [-1.65, 1.15, 0.05] });
  const beans: Part[] = []; for (let i = 0; i < 4; i++) beans.push(put(sc, `b${i}`, ellipsoid(0.09, 0.06, 0.05, 3, 6, "accent", true), { at: [CUP[0], CUP[1] + 0.3, 0] }));
  const riskA = put(sc, "riskA", bar(0.35, 1.0, 0.25, "hot"), { at: [0, -1.4, 0] });
  const riskB = put(sc, "riskB", bar(0.75, 0.65, 0.25, "accent"), { at: [0, -1.4, 0] });
  const oes = put(sc, "oes", tube(0.12, 1.2, "soft"), { at: [0.2, 1.1, 0], rotZ: Math.PI / 2 });
  const hot = put(sc, "hot", blob(0.1), { at: [0.2, 1.6, 0] });
  const burn: Part[] = []; for (let i = 0; i < 3; i++) burn.push(put(sc, `bu${i}`, ring(0.17, 8, "hot", "y"), { at: [0.2, 1.4 - 0.3 * i, 0] }));
  const rx = put(sc, "rx", capsule(1.2, "soft"), { at: [-1.9, -1.3, 0] });
  const rxX = put(sc, "rxX", cross([-1.9, -1.3, 0.12], 0.2));
  sc.mesh.labels = [L([LIV[0], LIV[1] + 0.95, 0], "Liver: about 30-40% lower HCC risk at 2-3 cups a day"), L([CUP[0], CUP[1] - 0.75, 0], "Coffee: IARC Group 3 since 2016"), L([0.2, 2.05, 0], "Drinks above 65 C: Group 2A"), L([-1.9, -1.7, 0], "Not a treatment")];
  const base = sc.mesh.points;
  const beanTo = (i: number): Vec3 => [LIV[0] - 0.4 + 0.25 * i, LIV[1] + 0.15 * (i % 2), 0.4];
  const B0: Vec3 = [CUP[0], CUP[1] + 0.3, 0];
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, g2b, g3, ...beans, riskA, riskB, oes, hot, ...burn, rx, rxX);
    steam.forEach((s, i) => { const v = (t * 6 + i / 3) % 1; setAlpha(alpha, s, 0.6 * (1 - v)); movePart(pts, base, s, [0, 0.35 * v, 0], 1 + v); });
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, card, 1); setAlpha(alpha, g2b, clamp(u * 3) * (1 - clamp(u * 3 - 1.5))); setAlpha(alpha, g3, clamp(u * 3 - 2) * pulse(t, 5)); return { caption: "1 · IARC's 1991 'possibly carcinogenic' verdict (Group 2B) was confounded by smoking; in 2016 coffee was reclassified as not classifiable (Group 3)" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, g3, 1); beans.forEach((b, i) => { setAlpha(alpha, b, 1); moveTo(pts, base, b, B0, beanTo(i), clamp(u * 1.4 - 0.1 * i)); }); setAlpha(alpha, liver, 0.6 + 0.4 * u * pulse(t, 4)); setAlpha(alpha, riskA, clamp(u * 2)); setAlpha(alpha, riskB, clamp(u * 2 - 1)); return { caption: "2 · Prospective cohorts link 2-3 cups a day with about 30-40% lower hepatocellular carcinoma risk, and lower endometrial cancer risk" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, g3, 1); beans.forEach((b, i) => { setAlpha(alpha, b, 0.6); moveTo(pts, base, b, B0, beanTo(i), 1); }); show(alpha, 0.6, riskA, riskB); setAlpha(alpha, oes, 1); setAlpha(alpha, hot, clamp(u * 2)); moveTo(pts, base, hot, [0.2, 1.6, 0], [0.2, 0.6, 0], u); cascade(alpha, burn, u); return { caption: "3 · The hazard is temperature, not coffee: very hot beverages above 65 C are Group 2A for oesophageal squamous cell carcinoma" }; }
    const u = Q(t, 3); setAlpha(alpha, g3, 1); beans.forEach((b, i) => { setAlpha(alpha, b, 0.6); moveTo(pts, base, b, B0, beanTo(i), 1); }); show(alpha, 0.6, riskA, riskB, oes, ...burn); setAlpha(alpha, hot, 0.6); moveTo(pts, base, hot, [0.2, 1.6, 0], [0.2, 0.6, 0], 1);
    setAlpha(alpha, rx, clamp(u * 2)); setAlpha(alpha, rxX, clamp(u * 2 - 1));
    return { caption: "4 · Lower recurrence in the CALGB 89803 colon cohort is hypothesis-generating only: coffee is safe, probably good for the liver, and not a treatment" };
  });
}

// ---------------------------------------------------------------- 2. compression, decongestive therapy and exercise for lymphoedema
export function lymphoedemaDecongestive(): Mesh {
  const sc = scene();
  const ARM: Vec3 = [-0.6, 0.1, 0];
  const arm = put(sc, "arm", cylinder(0.3, 2.4, 12, 3, "soft", true, true), { at: ARM, rotZ: Math.PI / 2 });
  put(sc, "hand", hand("soft"), { at: [ARM[0] - 1.45, ARM[1], 0], rotZ: Math.PI / 2, scale: 0.8 });
  const axilla = put(sc, "axilla", cloud(5, 0.25, "hot", 3), { at: [ARM[0] + 1.35, ARM[1] + 0.35, 0.2] });
  const swell = put(sc, "swell", ellipsoid(1.1, 0.45, 0.45, 4, 10, "hot", true), { at: [ARM[0] - 0.2, ARM[1], 0] });
  const hands: Part[] = []; for (let i = 0; i < 2; i++) hands.push(put(sc, `h${i}`, hand("accent"), { at: [ARM[0] - 1.0 + 0.9 * i, ARM[1] + 0.75, 0.2], scale: 0.55 }));
  const bandage: Part[] = []; for (let i = 0; i < 6; i++) bandage.push(put(sc, `bd${i}`, ring(0.36, 10, "accent", "x"), { at: [ARM[0] - 1.1 + 0.36 * i, ARM[1], 0] }));
  const garment = put(sc, "garment", cylinder(0.33, 2.2, 12, 2, "accent", false, true), { at: [ARM[0] - 0.1, ARM[1], 0], rotZ: Math.PI / 2 });
  const vol0 = put(sc, "vol0", bar(1.7, 1.1, 0.28, "hot"), { at: [0, -1.5, 0] });
  const vol1 = put(sc, "vol1", bar(2.1, 0.7, 0.28, "accent"), { at: [0, -1.5, 0] });
  const W0: Vec3 = [1.9, 1.3, 0.2];
  const weight = put(sc, "weight", dumbbell(0.9), { at: W0 });
  const flare0 = put(sc, "flare0", bar(-2.0, 0.9, 0.28, "hot"), { at: [0, -1.5, 0] });
  const flare1 = put(sc, "flare1", bar(-1.6, 0.45, 0.28, "accent"), { at: [0, -1.5, 0] });
  sc.mesh.labels = [L([ARM[0] + 1.45, ARM[1] + 0.85, 0], "Axillary or groin node dissection"), L([ARM[0] - 0.2, ARM[1] - 0.85, 0], "Bandaging, then a fitted compression garment"), L([1.9, 1.85, 0.2], "PAL trial: slow progressive weight lifting"), L([-1.8, -1.85, 0], "Exacerbations halved (141 survivors, NEJM 2009)")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...hands, ...bandage, garment, vol0, vol1, weight, flare0, flare1);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, axilla, 0.4 + 0.6 * pulse(t, 5)); setAlpha(alpha, swell, 0.3 + 0.5 * u); movePart(pts, base, swell, [0, 0, 0], 0.4 + 0.6 * u); return { caption: "1 · After axillary or groin node dissection and radiotherapy, lymph backs up and the limb swells in a substantial minority of patients" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, swell, 0.8 - 0.3 * u); hands.forEach((h, i) => { setAlpha(alpha, h, 1); movePart(pts, base, h, [0.5 * Math.sin((t * 8 + i * 0.5) * TAU) * 0.4 + 0.6 * u, 0, 0], 1); }); cascade(alpha, bandage, clamp(u * 1.3 - 0.2)); return { caption: "2 · Complete decongestive therapy: manual lymphatic drainage strokes fluid towards the trunk, then multilayer bandaging holds the gain" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, swell, 0.5 - 0.35 * u); movePart(pts, base, swell, [0, 0, 0], 1 - 0.3 * u); bandage.forEach((b) => setAlpha(alpha, b, 1 - u)); setAlpha(alpha, garment, u); setAlpha(alpha, arm, 1); setAlpha(alpha, vol0, clamp(u * 2)); setAlpha(alpha, vol1, clamp(u * 2 - 1)); return { caption: "3 · A fitted compression garment, skin care and exercise keep the volume down; compression is the element with the most consistent effect, and pneumatic pumps add modestly" }; }
    const u = Q(t, 3); setAlpha(alpha, swell, 0.15); movePart(pts, base, swell, [0, 0, 0], 0.7); setAlpha(alpha, garment, 0.7); show(alpha, 0.6, vol0, vol1);
    setAlpha(alpha, weight, 1); movePart(pts, base, weight, [0, 0.35 * Math.abs(Math.sin(t * TAU * 3)) * clamp(u * 2), 0], 1);
    setAlpha(alpha, flare0, clamp(u * 2)); setAlpha(alpha, flare1, clamp(u * 2 - 1));
    return { caption: "4 · Once forbidden, slowly progressive weight lifting halved exacerbations and improved strength in the PAL trial of 141 breast cancer survivors" };
  });
}

// ---------------------------------------------------------------- 3. fasting and fasting-mimicking diets around chemotherapy
export function fastingMimickingDiet(): Mesh {
  const sc = scene();
  const NRM: Vec3 = [-1.4, 0.2, 0], TUM: Vec3 = [1.4, 0.2, 0];
  const normal = put(sc, "normal", cell(0.7, "soft"), { at: NRM });
  put(sc, "nrmNuc", sphere(0.25, 3, 8, "soft"), { at: NRM });
  const tumour = put(sc, "tumour", cell(0.7, "hot"), { at: TUM });
  put(sc, "tumNuc", sphere(0.25, 3, 8, "hot"), { at: TUM });
  const plate = put(sc, "plate", disc(0.45, 12, "accent", "y"), { at: [0, -1.1, 0] });
  const food = put(sc, "food", cloud(7, 0.3, "accent", 2), { at: [0, -0.95, 0] });
  const signals: Part[] = []; for (let i = 0; i < 6; i++) signals.push(put(sc, `sig${i}`, small(0.06, "accent"), { at: [-0.5 + 0.2 * i, 1.35, 0.2 * Math.sin(i)] }));
  const shield = put(sc, "shield", ring(0.85, 14, "accent", "z"), { at: NRM });
  const bud = put(sc, "bud", cell(0.4, "hot"), { at: [TUM[0] + 0.75, TUM[1] - 0.45, 0.2] });
  const drops: Part[] = []; for (let i = 0; i < 6; i++) drops.push(put(sc, `d${i}`, octahedron(0.09, "hot"), { at: [-1.6 + 0.6 * i, 1.6, 0] }));
  const dmg = put(sc, "dmg", dots([[TUM[0] - 0.15, TUM[1] + 0.1, 0.3], [TUM[0] + 0.15, TUM[1] - 0.1, 0.3], [TUM[0], TUM[1] + 0.25, 0.3]], "accent"));
  const tl = put(sc, "tl", ticks(-1.4, 1.4, -1.7, 5, "soft"));
  const adh0 = put(sc, "adh0", bar(2.35, 1.0, 0.25, "soft"), { at: [0, -1.7, 0] });
  const adh1 = put(sc, "adh1", bar(2.7, 0.2, 0.25, "hot"), { at: [0, -1.7, 0] });
  sc.mesh.labels = [L([NRM[0], NRM[1] + 1.05, 0], "Normal cell: protective, low-proliferation state"), L([TUM[0], TUM[1] + 1.05, 0], "Tumour cell: cannot slow down"), L([0, -2.05, 0], "3 days before and the day of each cycle"), L([2.5, -0.35, 0], "Fewer than 20% completed all cycles")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, shield, bud, ...drops, dmg, adh0, adh1);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, plate, 1 - 0.4 * u); setAlpha(alpha, food, 1 - 0.8 * u); movePart(pts, base, food, [0, 0, 0], 1 - 0.6 * u); signals.forEach((g, i) => { setAlpha(alpha, g, 1 - 0.85 * clamp(u * 1.5 - 0.1 * i)); movePart(pts, base, g, [0, -0.5 * u, 0], 1); }); setAlpha(alpha, tl, 0.5); return { caption: "1 · A plant-based fasting-mimicking diet for three days before and on the day of each chemotherapy cycle lowers glucose, insulin and IGF-1" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, plate, 0.6); setAlpha(alpha, food, 0.2); movePart(pts, base, food, [0, 0, 0], 0.4); show(alpha, 0.15, ...signals); setAlpha(alpha, shield, u * (0.6 + 0.4 * pulse(t, 4))); movePart(pts, base, normal, [0, 0, 0], 1 - 0.15 * u); setAlpha(alpha, bud, clamp(u * 1.5)); movePart(pts, base, bud, [0, 0, 0], 0.3 + 0.7 * u); setAlpha(alpha, tumour, 0.6 + 0.4 * pulse(t, 5)); return { caption: "2 · Differential stress resistance: normal cells drop into a protected, low-proliferation state while cancer cells keep dividing" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, food, 0.2); movePart(pts, base, food, [0, 0, 0], 0.4); show(alpha, 0.15, ...signals); setAlpha(alpha, shield, 0.8); movePart(pts, base, normal, [0, 0, 0], 0.85); setAlpha(alpha, bud, 1); drops.forEach((d, i) => { const v = clamp(u * 1.6 - 0.1 * i); setAlpha(alpha, d, 1 - clamp(v * 3 - 2)); const to: Vec3 = i < 3 ? [NRM[0] - 0.4 + 0.4 * i, NRM[1] + 0.9, 0] : [TUM[0] - 0.4 + 0.4 * (i - 3), TUM[1] + 0.2, 0.3]; moveTo(pts, base, d, [-1.6 + 0.6 * i, 1.6, 0], to, v); }); setAlpha(alpha, dmg, clamp(u * 2 - 1) * pulse(t, 6)); setAlpha(alpha, tumour, 1 - 0.3 * clamp(u * 2 - 1)); return { caption: "3 · In DIRECT (131 patients, HER2-negative early breast cancer) radiological response was better with the diet (OR 3.2), and 90-100% tumour cell loss more frequent" }; }
    const u = Q(t, 3); setAlpha(alpha, food, 0.2); movePart(pts, base, food, [0, 0, 0], 0.4); show(alpha, 0.15, ...signals); setAlpha(alpha, shield, 0.5); movePart(pts, base, normal, [0, 0, 0], 0.85); setAlpha(alpha, bud, 0.8); setAlpha(alpha, dmg, 0.8); setAlpha(alpha, tumour, 0.7); drops.forEach((d, i) => { const to: Vec3 = i < 3 ? [NRM[0] - 0.4 + 0.4 * i, NRM[1] + 0.9, 0] : [TUM[0] - 0.4 + 0.4 * (i - 3), TUM[1] + 0.2, 0.3]; moveTo(pts, base, d, [-1.6 + 0.6 * i, 1.6, 0], to, 1); });
    setAlpha(alpha, adh0, clamp(u * 2)); setAlpha(alpha, adh1, clamp(u * 2 - 1) * pulse(t, 4));
    return { caption: "4 · Adherence collapsed (fewer than 20% completed all cycles) and pathological complete response did not differ; muscle loss is a real risk and fasting is contraindicated in cachexia" };
  });
}

// ---------------------------------------------------------------- 4. isolated limb perfusion and infusion
export function isolatedLimbPerfusion(): Mesh {
  const sc = scene();
  const LEG: Vec3 = [-0.9, -0.1, 0];
  put(sc, "leg", cylinder(0.42, 2.6, 12, 3, "soft", true, true), { at: LEG });
  put(sc, "foot", ellipsoid(0.3, 0.16, 0.5, 3, 8, "soft", true), { at: [LEG[0], LEG[1] - 1.4, 0.2] });
  const mets: Part[] = []; for (let i = 0; i < 4; i++) mets.push(put(sc, `m${i}`, blob(0.11), { at: [LEG[0] + 0.42 * Math.cos(i * 1.9), LEG[1] + 0.7 - 0.45 * i, 0.42 * Math.sin(i * 1.9)] }));
  const tourn = put(sc, "tourn", torus(0.5, 0.06, 14, 5, "hot", true), { at: [LEG[0], LEG[1] + 1.3, 0] });
  const PUMP: Vec3 = [1.4, 0.3, 0];
  const pump = put(sc, "pump", box(0.9, 0.7, 0.5, "accent", true), { at: PUMP });
  put(sc, "rotor", ring(0.2, 10, "accent", "z"), { at: [PUMP[0], PUMP[1], 0.27] });
  const artLine = put(sc, "art", polyline([[PUMP[0] - 0.45, PUMP[1] + 0.2, 0], [LEG[0] + 0.7, LEG[1] + 1.05, 0], [LEG[0] + 0.42, LEG[1] + 0.95, 0]], "accent"));
  const venLine = put(sc, "ven", polyline([[LEG[0] + 0.42, LEG[1] + 0.6, 0.15], [LEG[0] + 0.8, LEG[1] + 0.35, 0.15], [PUMP[0] - 0.45, PUMP[1] - 0.2, 0.15]], "soft"));
  const drug: Part[] = []; for (let i = 0; i < 6; i++) drug.push(put(sc, `dr${i}`, octahedron(0.07, "accent"), { at: [PUMP[0], PUMP[1], 0.3] }));
  const heat: Part[] = []; for (let i = 0; i < 3; i++) heat.push(put(sc, `ht${i}`, ring(0.5 + 0.08 * i, 12, "hot", "y"), { at: [LEG[0], LEG[1] - 0.2 + 0.4 * i, 0] }));
  const cr0 = put(sc, "cr0", bar(1.15, 0.3, 0.25, "soft"), { at: [0, -1.5, 0] });
  const cr1 = put(sc, "cr1", bar(1.5, 0.8, 0.25, "accent"), { at: [0, -1.5, 0] });
  const salv = put(sc, "salv", bar(2.0, 1.0, 0.25, "accent"), { at: [0, -1.5, 0] });
  const io = put(sc, "io", cloud(6, 0.35, "soft", 5), { at: [2.2, 1.3, 0] });
  sc.mesh.labels = [L([LEG[0], LEG[1] + 1.75, 0], "Tourniquet isolates the limb"), L([PUMP[0], PUMP[1] + 0.75, 0], "Oxygenated circuit, 39-40 °C, 60-90 minutes"), L([LEG[0] - 0.95, LEG[1] - 0.2, 0], "Melphalan at 15-20 times the systemic dose"), L([1.6, -1.85, 0], "CR ~50-70% melanoma, limb salvage ~80% sarcoma")];
  const base = sc.mesh.points;
  const drugPos = (i: number, v: number): Vec3 => { const w = (v + i / 6) % 1; if (w < 0.5) return lerp3([PUMP[0] - 0.45, PUMP[1] + 0.2, 0], [LEG[0] + 0.42, LEG[1] + 0.95, 0], w * 2); return lerp3([LEG[0] + 0.42, LEG[1] + 0.6, 0.15], [PUMP[0] - 0.45, PUMP[1] - 0.2, 0.15], (w - 0.5) * 2); };
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, artLine, venLine, ...drug, ...heat, cr0, cr1, salv, io);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); mets.forEach((m, i) => setAlpha(alpha, m, clamp(u * 4 - i) * (0.6 + 0.4 * pulse(t, 5)))); setAlpha(alpha, tourn, clamp(u * 3 - 1.5)); movePart(pts, base, tourn, [0, 0, 0], 1.4 - 0.4 * clamp(u * 3 - 1.5)); setAlpha(alpha, pump, 0.4); return { caption: "1 · In-transit melanoma metastases or a locally advanced extremity sarcoma threaten amputation; a tourniquet shuts the limb off from the body (Creech and Krementz, 1958)" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 1, ...mets); grow(alpha, artLine, clamp(u * 2)); grow(alpha, venLine, clamp(u * 2 - 0.7)); setAlpha(alpha, pump, 1); drug.forEach((d, i) => { setAlpha(alpha, d, clamp(u * 3 - 1.5)); const p = drugPos(i, t * 4); movePart(pts, base, d, [p[0] - PUMP[0], p[1] - PUMP[1], p[2] - 0.3], 1); }); return { caption: "2 · The artery and vein are cannulated onto an oxygenated extracorporeal circuit, and melphalan (with TNF-alpha in Europe) circulates at 15-20 times the systemic dose" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 1, artLine, venLine, pump); drug.forEach((d, i) => { setAlpha(alpha, d, 1); const p = drugPos(i, t * 4); movePart(pts, base, d, [p[0] - PUMP[0], p[1] - PUMP[1], p[2] - 0.3], 1); }); heat.forEach((h, i) => setAlpha(alpha, h, clamp(u * 3 - i) * pulse(t + i * 0.1, 4))); mets.forEach((m, i) => { const v = clamp(u * 1.5 - 0.1 * i); setAlpha(alpha, m, 1 - 0.8 * v); movePart(pts, base, m, [0, 0, 0], 1 - 0.7 * v); }); return { caption: "3 · Hyperthermia at 39-40 °C for 60-90 minutes boosts drug penetration; TNF-alpha selectively destroys tumour vasculature; complete response in about 50-70% of melanoma in-transit disease" }; }
    const u = Q(t, 3); show(alpha, 0.5, artLine, venLine, pump, ...heat); drug.forEach((d, i) => { setAlpha(alpha, d, 0.4); const p = drugPos(i, 0.3); movePart(pts, base, d, [p[0] - PUMP[0], p[1] - PUMP[1], p[2] - 0.3], 1); }); mets.forEach((m) => { setAlpha(alpha, m, 0.2); movePart(pts, base, m, [0, 0, 0], 0.3); });
    setAlpha(alpha, cr0, clamp(u * 2)); setAlpha(alpha, cr1, clamp(u * 2)); setAlpha(alpha, salv, clamp(u * 2 - 0.5)); setAlpha(alpha, io, clamp(u * 2 - 1) * 0.7);
    return { caption: "4 · Limb salvage about 80% in sarcoma with TNF-melphalan; isolated limb infusion is the lower-dose percutaneous variant (~30-40% CR), and checkpoint inhibitors have displaced ILP for most melanoma" };
  });
}

// ---------------------------------------------------------------- 5. cancer variant knowledgebases and molecular tumour boards
export function variantKnowledgebases(): Mesh {
  const sc = scene();
  const KB: Vec3 = [0, 0.75, 0];
  const kb = put(sc, "kb", cylinder(0.65, 0.9, 12, 3, "accent", true, true), { at: KB });
  for (let i = 0; i < 2; i++) put(sc, `ring${i}`, ring(0.66, 12, "accent", "y"), { at: [KB[0], KB[1] - 0.15 + 0.3 * i, 0] });
  const rep = put(sc, "rep", doc(0.7, 0.9, 4, "soft"), { at: [-2.2, 0.6, 0] });
  const variant = put(sc, "variant", octahedron(0.1, "hot"), { at: [-2.2, 0.75, 0.1] });
  const query = put(sc, "query", arrow([-1.8, 0.7, 0.1], [KB[0] - 0.7, KB[1], 0.1], "hot"));
  const tiers: Part[] = []; for (let i = 0; i < 4; i++) tiers.push(put(sc, `tier${i}`, bar(1.3 + 0.32 * i, 0.9 - 0.2 * i, 0.24, i === 0 ? "accent" : "soft"), { at: [0, -0.1, 0] }));
  const answer = put(sc, "answer", arrow([KB[0] + 0.7, KB[1], 0.1], [1.25, 0.6, 0.1], "accent"));
  const table = put(sc, "table", disc(0.7, 12, "soft", "y"), { at: [0, -1.25, 0] });
  const board: Part[] = []; for (let i = 0; i < 3; i++) board.push(put(sc, `dr${i}`, figure(i === 1 ? "accent" : "soft"), { at: [-0.9 + 0.9 * i, -1.25, -0.4 + 0.3 * (i % 2)], scale: 0.55 }));
  const act = put(sc, "act", bar(-1.9, 0.9, 0.28, "accent"), { at: [0, -1.9, 0] });
  const treated = put(sc, "treated", bar(-1.5, 0.35, 0.28, "hot"), { at: [0, -1.9, 0] });
  sc.mesh.labels = [L([KB[0], KB[1] + 0.75, 0], "OncoKB, CIViC, COSMIC, ClinVar"), L([-2.2, 1.35, 0], "Sequencing report"), L([1.8, 1.05, 0], "Evidence levels 1-4, R1-R2"), L([-1.7, -2.25, 0], "Actionable 30-50%, treated 10-25%")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, query, ...tiers, answer, table, ...board, act, treated);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, rep, 1); setAlpha(alpha, variant, 0.5 + 0.5 * pulse(t, 5)); grow(alpha, query, clamp(u * 1.5 - 0.3)); setAlpha(alpha, kb, 0.5 + 0.5 * clamp(u * 2 - 1)); return { caption: "1 · A sequencing report lists a variant; the lab queries a curated knowledgebase to ask what that gene-variant-disease-drug combination means" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, query, 0.6); setAlpha(alpha, kb, 0.6 + 0.4 * pulse(t, 4)); cascade(alpha, tiers, clamp(u * 1.4)); grow(alpha, answer, clamp(u * 2 - 0.8)); return { caption: "2 · Expert curation grades the evidence into levels (OncoKB 1-4 and R1-R2 for resistance), exposed by API for lab reporting and decision support" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.5, query, answer, ...tiers); setAlpha(alpha, table, u); board.forEach((b, i) => { setAlpha(alpha, b, clamp(u * 3 - i)); movePart(pts, base, b, [0, 0.3 * (1 - clamp(u * 3 - i)), 0], 1); }); return { caption: "3 · A molecular tumour board (institutional, national Genomic MDTs, or virtual services such as NAVIFY, Syapse and Tempus) applies the evidence to the patient" }; }
    const u = Q(t, 3); show(alpha, 0.5, query, answer, ...tiers, table, ...board);
    setAlpha(alpha, act, clamp(u * 2)); setAlpha(alpha, treated, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4)));
    return { caption: "4 · Actionable findings in 30-50% of sequenced patients but treatment uptake of only 10-25%: curation lag, sparse evidence for rare variants and board capacity are the gaps" };
  });
}

// ---------------------------------------------------------------- 6. organoid-guided therapy at scale
export function organoidGuidedTherapy(): Mesh {
  const sc = scene();
  const DOME: Vec3 = [-1.5, 0.1, 0];
  put(sc, "dish", disc(0.85, 14, "soft", "y"), { at: [DOME[0], DOME[1] - 0.45, 0] });
  const dome = put(sc, "dome", ellipsoid(0.8, 0.6, 0.8, 4, 10, "accent", true), { at: DOME });
  const chunk = put(sc, "chunk", blob(0.18), { at: [-1.5, 1.7, 0] });
  const orgs: Part[] = []; for (let i = 0; i < 4; i++) orgs.push(put(sc, `org${i}`, sphere(0.16, 3, 8, "hot", true), { at: [DOME[0] - 0.3 + 0.2 * i, DOME[1] - 0.1 + 0.25 * Math.sin(i * 2.1), 0.2 * Math.cos(i * 1.3)] }));
  const wells: Part[] = []; for (let i = 0; i < 6; i++) wells.push(put(sc, `w${i}`, cylinder(0.2, 0.15, 6, 2, "soft", false, true), { at: [0.55 + 0.5 * (i % 3), -0.2 + 0.5 * Math.floor(i / 3), 0] }));
  const wellOrgs: Part[] = []; for (let i = 0; i < 6; i++) wellOrgs.push(put(sc, `wo${i}`, octahedron(0.09, "hot", true), { at: [0.55 + 0.5 * (i % 3), -0.2 + 0.5 * Math.floor(i / 3), 0] }));
  const caps: Part[] = []; for (let i = 0; i < 3; i++) caps.push(put(sc, `cap${i}`, capsule(0.8, "accent"), { at: [0.55 + 0.5 * i, 1.5, 0] }));
  const ax = put(sc, "ax", axes([0.25, -1.75, 0], 1.7, 0.9));
  const bars: Part[] = []; const H = [0.8, 0.25, 0.65, 0.15, 0.7, 0.45]; for (let i = 0; i < 6; i++) bars.push(put(sc, `b${i}`, bar(0.45 + 0.26 * i, H[i], 0.18, H[i] < 0.3 ? "accent" : "soft"), { at: [0, -1.75, 0] }));
  const tl = put(sc, "tl", ticks(-2.3, -0.7, -1.6, 4, "soft"));
  const rct = put(sc, "rct", doc(0.6, 0.7, 3, "soft"), { at: [2.4, 0.9, 0] });
  const rctX = put(sc, "rctX", cross([2.4, 0.9, 0.1], 0.22));
  sc.mesh.labels = [L([DOME[0], DOME[1] + 1.05, 0], "Fresh tumour tissue in matrix"), L([1.05, 0.95, 0], "Drug panel on the patient's organoids"), L([-1.5, -1.95, 0], "Results needed inside three weeks, take rate above 70%"), L([2.4, 1.45, 0], "No randomised proof yet")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...orgs, ...wellOrgs, ...caps, ax, ...bars, tl, rct, rctX);
    show(alpha, 0.5, ...wells);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, chunk, 1 - clamp(u * 3 - 2)); moveTo(pts, base, chunk, [-1.5, 1.7, 0], DOME, clamp(u * 1.5)); setAlpha(alpha, dome, 0.5 + 0.5 * clamp(u * 2 - 1)); orgs.forEach((o, i) => { const v = clamp(u * 3 - 1.5 - 0.15 * i); setAlpha(alpha, o, v); movePart(pts, base, o, [0, 0, 0], 0.2 + 0.8 * v); }); return { caption: "1 · Fresh tumour tissue is dissociated and cultured in matrix; the patient's own organoids grow, reproducing its genotype and drug response" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 1, ...orgs); wellOrgs.forEach((w, i) => { setAlpha(alpha, w, clamp(u * 2 - 0.1 * i)); moveTo(pts, base, w, [DOME[0], DOME[1], 0.3], [0.55 + 0.5 * (i % 3), -0.2 + 0.5 * Math.floor(i / 3), 0], clamp(u * 1.5 - 0.1 * i)); }); caps.forEach((c, i) => { const v = clamp(u * 2 - 1 - 0.1 * i); setAlpha(alpha, c, v); movePart(pts, base, c, [0, -1.5 * v, 0], 1); }); show(alpha, 1, ...wells); return { caption: "2 · A drug panel is applied well by well: single agents, combinations and sequences that a genotype alone cannot rank" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.6, ...orgs); show(alpha, 1, ...wells); wellOrgs.forEach((w, i) => { moveTo(pts, base, w, [DOME[0], DOME[1], 0.3], [0.55 + 0.5 * (i % 3), -0.2 + 0.5 * Math.floor(i / 3), 0], 1); setAlpha(alpha, w, H[i] < 0.3 ? 1 - 0.8 * u : 1); movePart(pts, base, w, [0, 0, 0], H[i] < 0.3 ? 1 - 0.6 * u : 1); }); caps.forEach((c) => { setAlpha(alpha, c, 0.5); movePart(pts, base, c, [0, -1.5, 0], 1); }); setAlpha(alpha, ax, 1); bars.forEach((b, i) => { setAlpha(alpha, b, clamp(u * 3 - 0.3 * i)); }); return { caption: "3 · Viability is read out per well into a sensitivity profile; prospective series in colorectal, pancreatic and ovarian cancer show meaningful correlation with clinical response" }; }
    const u = Q(t, 3); show(alpha, 0.6, ...orgs, ...caps, ax, ...bars); show(alpha, 1, ...wells); wellOrgs.forEach((w, i) => { moveTo(pts, base, w, [DOME[0], DOME[1], 0.3], [0.55 + 0.5 * (i % 3), -0.2 + 0.5 * Math.floor(i / 3), 0], 1); setAlpha(alpha, w, H[i] < 0.3 ? 0.2 : 1); movePart(pts, base, w, [0, 0, 0], H[i] < 0.3 ? 0.4 : 1); }); caps.forEach((c) => movePart(pts, base, c, [0, -1.5, 0], 1));
    grow(alpha, tl, clamp(u * 2)); setAlpha(alpha, rct, clamp(u * 2 - 0.5)); setAlpha(alpha, rctX, clamp(u * 2 - 1));
    return { caption: "4 · Routine use needs take rates above 70%, answers inside three weeks and a randomised trial showing that acting on the result helps; Xilis, Curesponse and academic programmes push throughput, but that trial does not exist yet" };
  });
}

// ---------------------------------------------------------------- 7. probiotics for chemotherapy and radiotherapy diarrhoea
export function probioticsDiarrhoea(): Mesh {
  const sc = scene();
  const gut = put(sc, "gut", tube(0.5, 3.4, "soft"), { at: [0, -0.2, 0] });
  const villi: Part[] = []; for (let i = 0; i < 7; i++) villi.push(put(sc, `v${i}`, line([-1.5 + 0.5 * i, 0.3, 0.2], [-1.5 + 0.5 * i, 0.05, 0.2], "soft")));
  const beam = put(sc, "beam", cone(0.7, 1.3, 10, "hot", false), { at: [0, 1.5, 0] });
  const gaps: Part[] = []; for (let i = 0; i < 4; i++) gaps.push(put(sc, `g${i}`, ring(0.14, 8, "hot", "z"), { at: [-1.2 + 0.8 * i, 0.3, 0.3] }));
  const patho = put(sc, "patho", cloud(8, 0.5, "hot", 4), { at: [0.2, -0.3, 0.2] });
  const pot = put(sc, "pot", vial(0.22, 0.5, "accent"), { at: [-2.4, 1.3, 0] });
  const pro: Part[] = []; for (let i = 0; i < 8; i++) pro.push(put(sc, `p${i}`, ellipsoid(0.09, 0.05, 0.05, 3, 6, "accent", true), { at: [-2.4, 1.3, 0.1] }));
  const barrier = put(sc, "barrier", line([-1.7, 0.32, 0.32], [1.7, 0.32, 0.32], "accent"));
  const drops: Part[] = []; for (let i = 0; i < 3; i++) drops.push(put(sc, `d${i}`, octahedron(0.08, "hot"), { at: [1.9 + 0.2 * i, -0.9 - 0.15 * (i % 2), 0] }));
  const neut = put(sc, "neut", cell(0.28, "soft"), { at: [2.4, 1.3, 0] });
  const lineCV = put(sc, "cvc", polyline([[2.0, 0.6, 0.1], [2.5, 0.9, 0.1]], "soft"));
  const warn = put(sc, "warn", cross([2.4, 1.05, 0.2], 0.28));
  sc.mesh.labels = [L([0, -1.05, 0], "Irradiated or chemotherapy-damaged gut"), L([-2.4, 1.9, 0], "Lactobacillus, Bifidobacterium, VSL#3"), L([0, 2.35, 0], "Cochrane 2018: may reduce diarrhoea, low certainty"), L([2.4, 1.85, 0], "Avoid in profound neutropenia or with a central line")];
  const base = sc.mesh.points;
  const proTo = (i: number): Vec3 => [-1.4 + 0.4 * i, 0.32 + 0.1 * (i % 2), 0.3];
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...gaps, patho, ...pro, barrier, ...drops, neut, lineCV, warn);
    setAlpha(alpha, gut, 0.7);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, beam, u * (0.5 + 0.5 * pulse(t, 8))); villi.forEach((v, i) => setAlpha(alpha, v, 1 - 0.7 * clamp(u * 2 - 0.15 * i))); cascade(alpha, gaps, u); setAlpha(alpha, patho, clamp(u * 2 - 1) * pulse(t, 5)); drops.forEach((d, i) => { const v = (t * 4 + i / 3) % 1; setAlpha(alpha, d, clamp(u * 2 - 1) * (1 - v)); movePart(pts, base, d, [0, -0.6 * v, 0], 1); }); return { caption: "1 · Pelvic radiotherapy or chemotherapy strips the fast-dividing gut lining: the barrier leaks, pathogens take hold and diarrhoea follows" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, beam, 0.3); show(alpha, 0.3, ...villi); show(alpha, 0.8, ...gaps); setAlpha(alpha, patho, 0.9); setAlpha(alpha, pot, 0.6 + 0.4 * pulse(t, 4)); pro.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, [-2.4, 1.3, 0.1], proTo(i), clamp(u * 1.4 - 0.05 * i)); }); return { caption: "2 · Live bacterial supplements (Lactobacillus, Bifidobacterium, mixtures such as VSL#3) are swallowed in the hope that they colonise the damaged lining" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, beam, 0.2); show(alpha, 0.6, ...villi); pro.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, [-2.4, 1.3, 0.1], proTo(i), 1); }); gaps.forEach((g, i) => setAlpha(alpha, g, 0.8 * (1 - clamp(u * 4 - i)))); grow(alpha, barrier, u); setAlpha(alpha, patho, 0.9 - 0.7 * u); movePart(pts, base, patho, [0, 0, 0], 1 - 0.5 * u); return { caption: "3 · Colonising bacteria compete with pathogens, reinforce the mucosal barrier and damp local inflammation; a 2018 Cochrane review found they may reduce diarrhoea, with low-certainty evidence and varying strains and doses" }; }
    const u = Q(t, 3); setAlpha(alpha, beam, 0.2); show(alpha, 0.6, ...villi, barrier); pro.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [-2.4, 1.3, 0.1], proTo(i), 1); }); setAlpha(alpha, patho, 0.2); movePart(pts, base, patho, [0, 0, 0], 0.5);
    setAlpha(alpha, neut, clamp(u * 2) * 0.5); grow(alpha, lineCV, clamp(u * 2)); setAlpha(alpha, warn, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4)));
    return { caption: "4 · Bacteraemia and fungaemia have occurred in immunocompromised patients, so probiotics are avoided during profound neutropenia and with central venous catheters unless specifically advised" };
  });
}

// ---------------------------------------------------------------- 8. radionuclide generators and cold kits
export function radionuclideGenerators(): Mesh {
  const sc = scene();
  const GEN: Vec3 = [-1.4, 0.2, 0];
  put(sc, "shield", box(1.1, 1.5, 1.0, "soft", true), { at: GEN });
  const column = put(sc, "column", cylinder(0.22, 1.0, 10, 3, "accent", true, true), { at: GEN });
  const parent: Part[] = []; for (let i = 0; i < 6; i++) parent.push(put(sc, `pa${i}`, small(0.05, "soft"), { at: [GEN[0] - 0.1 + 0.1 * (i % 3), GEN[1] - 0.35 + 0.18 * i, 0.05 * (i % 2)] }));
  const daughter: Part[] = []; for (let i = 0; i < 6; i++) daughter.push(put(sc, `da${i}`, octahedron(0.06, "hot"), { at: [GEN[0] - 0.1 + 0.1 * (i % 3), GEN[1] - 0.35 + 0.18 * i, 0.15] }));
  const outlet = put(sc, "outlet", polyline([[GEN[0], GEN[1] - 0.55, 0], [GEN[0], GEN[1] - 0.95, 0], [0.1, GEN[1] - 0.95, 0], [0.1, -0.35, 0]], "accent"));
  const eluate = put(sc, "eluate", vial(0.18, 0.45, "hot"), { at: [0.1, -0.6, 0] });
  const KIT: Vec3 = [1.5, 0.9, 0];
  const kit = put(sc, "kit", vial(0.2, 0.5, "accent"), { at: KIT });
  const powder = put(sc, "powder", dots([[KIT[0] - 0.08, KIT[1] - 0.15, 0.1], [KIT[0] + 0.06, KIT[1] - 0.1, 0.1], [KIT[0], KIT[1] - 0.2, 0.12]], "accent"));
  const kitBox = put(sc, "kitBox", box(0.7, 0.75, 0.6, "soft", false), { at: KIT });
  const mix = put(sc, "mix", arrow([0.35, -0.6, 0], [KIT[0] - 0.05, KIT[1] - 0.4, 0], "hot"));
  const tracer: Part[] = []; for (let i = 0; i < 4; i++) tracer.push(put(sc, `tr${i}`, octahedron(0.07, "hot"), { at: [KIT[0] - 0.08 + 0.06 * i, KIT[1] - 0.15 + 0.08 * (i % 2), 0.15] }));
  const syr = put(sc, "syr", syringe(0.6, "accent"), { at: [2.3, -0.9, 0.2], rotZ: -0.9 });
  const tl = put(sc, "tl", ticks(-2.3, -0.5, -1.5, 4, "soft"));
  const marker = put(sc, "marker", small(0.07, "accent"), { at: [-2.3, -1.5, 0.05] });
  const cyc = put(sc, "cyc", torus(0.45, 0.06, 12, 5, "soft"), { at: [1.5, -1.1, 0], rotX: Math.PI / 2 });
  const cycX = put(sc, "cycX", cross([1.5, -1.1, 0.2], 0.3));
  sc.mesh.labels = [L([GEN[0], GEN[1] + 1.05, 0], "Ge-68/Ga-68 generator (6-12 months of elutions)"), L([KIT[0], KIT[1] + 0.7, 0], "Cold kit: lyophilised PSMA-11 or DOTATATE"), L([-1.4, -1.85, 0], "Ga-68 eluted on demand"), L([1.5, -1.75, 0], "No cyclotron needed")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...daughter, eluate, mix, ...tracer, syr, tl, marker, cyc, cycX);
    setAlpha(alpha, powder, 0.7);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, column, 1); parent.forEach((p, i) => setAlpha(alpha, p, 1 - 0.5 * clamp(u * 6 - i))); daughter.forEach((d, i) => setAlpha(alpha, d, clamp(u * 6 - i) * (0.6 + 0.4 * pulse(t + i * 0.1, 5)))); setAlpha(alpha, outlet, 0.4); return { caption: "1 · A long-lived parent (germanium-68, or molybdenum-99 for SPECT) sits adsorbed on a shielded column and steadily decays into the short-lived daughter" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 0.5, ...parent); daughter.forEach((d, i) => { const v = clamp(u * 1.5 - 0.1 * i); setAlpha(alpha, d, 1 - 0.7 * v); moveTo(pts, base, d, [GEN[0] - 0.1 + 0.1 * (i % 3), GEN[1] - 0.35 + 0.18 * i, 0.15], [0.1, -0.6, 0.15], v); }); grow(alpha, outlet, clamp(u * 1.5)); setAlpha(alpha, eluate, clamp(u * 2 - 0.5)); return { caption: "2 · Saline 'milks' the daughter off the column: gallium-68 is eluted on demand, and one generator keeps eluting for 6-12 months" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.5, ...parent); hide(alpha, ...daughter); show(alpha, 1, outlet, eluate); grow(alpha, mix, clamp(u * 1.6)); setAlpha(alpha, eluate, 1 - 0.6 * clamp(u * 2 - 1)); setAlpha(alpha, kit, 1); tracer.forEach((tr, i) => setAlpha(alpha, tr, clamp(u * 3 - 1.5 - 0.2 * i) * (0.6 + 0.4 * pulse(t, 5)))); setAlpha(alpha, kitBox, 0.5); return { caption: "3 · Poured onto a cold kit (Illuccix, Gozellix, Locametz, NETSPOT), the lyophilised chelator-ligand and buffer label PSMA-11 or DOTATATE in one step, in minutes" }; }
    const u = Q(t, 3); show(alpha, 0.5, ...parent, outlet); setAlpha(alpha, eluate, 0.4); setAlpha(alpha, mix, 0.5); show(alpha, 1, kit, ...tracer); setAlpha(alpha, kitBox, 0.5);
    setAlpha(alpha, syr, clamp(u * 2)); moveTo(pts, base, syr, [2.3, -0.9, 0.2], [KIT[0] + 0.6, KIT[1] - 0.5, 0.2], clamp(u * 1.5)); setAlpha(alpha, tl, 0.7); setAlpha(alpha, marker, 1); moveTo(pts, base, marker, [-2.3, -1.5, 0.05], [-0.5, -1.5, 0.05], u); setAlpha(alpha, cyc, clamp(u * 2 - 0.5) * 0.6); setAlpha(alpha, cycX, clamp(u * 2 - 1));
    return { caption: "4 · A hospital radiopharmacy makes PET tracers without a cyclotron, but each elution yields only a few patient doses, and generator supply is concentrated in a few producers (Ge-68 shortage, 2018-19)" };
  });
}

// ---------------------------------------------------------------- 9. tandem autologous transplant
export function tandemTransplant(): Mesh {
  const sc = scene();
  const MAR: Vec3 = [0, -0.2, 0];
  const marrow = put(sc, "marrow", cylinder(0.45, 2.2, 12, 3, "soft", true, true), { at: MAR, rotZ: Math.PI / 2 });
  const stem: Part[] = []; for (let i = 0; i < 8; i++) stem.push(put(sc, `s${i}`, octahedron(0.08, "accent", true), { at: [MAR[0] - 0.9 + 0.26 * i, MAR[1] + 0.15 * Math.sin(i * 1.8), 0.15] }));
  const nb = put(sc, "nb", cloud(7, 0.5, "hot", 6), { at: [MAR[0] + 0.3, MAR[1], 0.3] });
  const BAG: Vec3 = [2.2, 1.2, 0];
  const bag = put(sc, "bag", box(0.55, 0.7, 0.3, "accent", true), { at: BAG });
  const frost: Part[] = []; for (let i = 0; i < 3; i++) frost.push(put(sc, `fr${i}`, ring(0.42 + 0.1 * i, 10, "accent", "z"), { at: BAG }));
  const harvest: Part[] = []; for (let i = 0; i < 4; i++) harvest.push(put(sc, `h${i}`, octahedron(0.07, "accent", true), { at: [MAR[0] + 0.4 + 0.2 * i, MAR[1] + 0.3, 0.2] }));
  const chemo1 = put(sc, "chemo1", cloud(9, 0.8, "hot", 2), { at: [MAR[0], MAR[1] + 1.3, 0] });
  const chemo2 = put(sc, "chemo2", cloud(9, 0.8, "hot", 3), { at: [MAR[0], MAR[1] + 1.3, 0] });
  const back: Part[] = []; for (let i = 0; i < 4; i++) back.push(put(sc, `bk${i}`, octahedron(0.07, "accent", true), { at: BAG }));
  const tl = put(sc, "tl", ticks(-2.3, -0.5, -1.55, 3, "soft"));
  const efs0 = put(sc, "efs0", bar(0.9, 0.5, 0.28, "soft"), { at: [0, -1.9, 0] });
  const efs1 = put(sc, "efs1", bar(1.35, 0.9, 0.28, "accent"), { at: [0, -1.9, 0] });
  const gd2 = put(sc, "gd2", polyline([[2.0, -1.3, 0], [2.2, -1.0, 0], [2.4, -1.3, 0]], "accent"));
  sc.mesh.labels = [L([MAR[0], MAR[1] + 0.85, 0], "Bone marrow with residual neuroblastoma"), L([BAG[0], BAG[1] + 0.7, 0], "Cryopreserved autologous stem cells"), L([-1.4, -1.95, 0], "Two myeloablative courses back to back"), L([1.4, -2.3, 0], "3-year EFS 61.6% vs 48.4% (COG ANBL0532)")];
  const base = sc.mesh.points;
  return frame(sc, 14, (t, pts, alpha) => {
    const flyIn = (p: Part, i: number, u: number) => moveTo(pts, base, p, BAG, [MAR[0] - 0.6 + 0.4 * i, MAR[1], 0.2], u);
    hide(alpha, ...frost, ...harvest, chemo1, chemo2, ...back, efs0, efs1, gd2);
    setAlpha(alpha, tl, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, nb, 0.5 + 0.5 * pulse(t, 5)); harvest.forEach((h, i) => { setAlpha(alpha, h, 1 - clamp(u * 3 - 2.5)); moveTo(pts, base, h, [MAR[0] + 0.4 + 0.2 * i, MAR[1] + 0.3, 0.2], BAG, clamp(u * 1.5 - 0.1 * i)); }); setAlpha(alpha, bag, 0.5 + 0.5 * u); frost.forEach((f, i) => setAlpha(alpha, f, clamp(u * 3 - 2 - 0.3 * i) * 0.7)); return { caption: "1 · After induction and surgery for high-risk neuroblastoma, the child's own stem cells are harvested and cryopreserved, enough for two rescues" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 0.6, ...frost); setAlpha(alpha, chemo1, clamp(u * 2) * (1 - clamp(u * 2 - 1))); movePart(pts, base, chemo1, [0, -1.1 * clamp(u * 2), 0], 1); stem.forEach((st) => setAlpha(alpha, st, 1 - 0.9 * clamp(u * 2 - 0.3))); setAlpha(alpha, nb, 0.9 - 0.5 * u); movePart(pts, base, nb, [0, 0, 0], 1 - 0.4 * u); setAlpha(alpha, marrow, 1 - 0.4 * clamp(u * 2 - 0.5)); back.forEach((b, i) => { setAlpha(alpha, b, clamp(u * 3 - 2 - 0.2 * i)); flyIn(b, i, clamp(u * 3 - 2 - 0.2 * i)); }); return { caption: "2 · First myeloablative course, thiotepa and cyclophosphamide, empties the marrow; half the frozen cells are reinfused to rescue it" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.6, ...frost); setAlpha(alpha, chemo2, clamp(u * 2) * (1 - clamp(u * 2 - 1))); movePart(pts, base, chemo2, [0, -1.1 * clamp(u * 2), 0], 1); stem.forEach((st, i) => setAlpha(alpha, st, 0.1 + 0.9 * clamp(u * 4 - 3 - 0.1 * i))); setAlpha(alpha, nb, 0.4 - 0.35 * u); movePart(pts, base, nb, [0, 0, 0], 0.6 - 0.4 * u); setAlpha(alpha, marrow, 0.6 + 0.4 * clamp(u * 3 - 2)); back.forEach((b, i) => { setAlpha(alpha, b, clamp(u * 3 - 1.5 - 0.2 * i)); flyIn(b, i, clamp(u * 3 - 1.5 - 0.2 * i)); }); return { caption: "3 · Second course, carboplatin, etoposide and melphalan, then the remaining stem cells: sequential dose intensity against residual disease" }; }
    const u = Q(t, 3); show(alpha, 0.4, ...frost); show(alpha, 1, ...stem); setAlpha(alpha, nb, 0.05); movePart(pts, base, nb, [0, 0, 0], 0.2); setAlpha(alpha, marrow, 1); back.forEach((b, i) => { setAlpha(alpha, b, 0.6); flyIn(b, i, 1); });
    setAlpha(alpha, efs0, clamp(u * 2)); setAlpha(alpha, efs1, clamp(u * 2 - 0.5)); grow(alpha, gd2, clamp(u * 2 - 1));
    return { caption: "4 · 3-year event-free survival 61.6% versus 48.4% with a single transplant, a benefit that held with anti-GD2 immunotherapy; Europe uses single busulfan-melphalan instead" };
  });
}

// ---------------------------------------------------------------- 10. targeting tumour mechanics and pressure
export function mechanobiologyTherapy(): Mesh {
  const sc = scene();
  const TUM: Vec3 = [0, 0.2, 0];
  const tumour = put(sc, "tumour", blob(1.0, "hot"), { at: TUM });
  const fibres: Part[] = []; for (let i = 0; i < 8; i++) { const a = (TAU * i) / 8; fibres.push(put(sc, `f${i}`, polyline([[0.7 * Math.cos(a), 0.7 * Math.sin(a), 0.2], [1.3 * Math.cos(a + 0.3), 1.3 * Math.sin(a + 0.3), 0.1], [1.6 * Math.cos(a), 1.6 * Math.sin(a), 0]], "soft"), { at: TUM })); }
  const vessel = put(sc, "vessel", tube(0.16, 2.4, "accent"), { at: [TUM[0], TUM[1] - 0.2, 0.45] });
  const drug: Part[] = []; for (let i = 0; i < 6; i++) drug.push(put(sc, `d${i}`, octahedron(0.07, "accent"), { at: [-2.3 + 0.15 * (i % 2), TUM[1] - 0.2 + 0.08 * (i % 3) - 0.08, 0.45] }));
  const press: Part[] = []; for (let i = 0; i < 4; i++) { const a = (TAU * i) / 4 + 0.4; press.push(put(sc, `pr${i}`, arrow([1.35 * Math.cos(a), 1.35 * Math.sin(a), 0.3], [0.95 * Math.cos(a), 0.95 * Math.sin(a), 0.3], "hot"), { at: TUM })); }
  const caps: Part[] = []; for (let i = 0; i < 3; i++) caps.push(put(sc, `cap${i}`, capsule(1, "accent"), { at: [2.4, 1.5 - 0.3 * i, 0.2] }));
  const bars0 = put(sc, "p3", doc(0.6, 0.7, 3, "soft"), { at: [2.3, -1.2, 0] });
  const p3X = put(sc, "p3X", cross([2.3, -1.2, 0.1], 0.22));
  const inv = put(sc, "inv", arrow([TUM[0] + 0.9, TUM[1] - 0.9, 0.2], [TUM[0] + 1.7, TUM[1] - 1.5, 0.2], "hot"));
  sc.mesh.labels = [L([TUM[0], TUM[1] + 1.85, 0], "Desmoplastic tumour (pancreatic cancer)"), L([-2.1, TUM[1] + 0.4, 0.45], "Vessel collapsed by solid stress"), L([2.4, 2.0, 0.2], "Losartan, hyaluronidase, LOXL2 inhibitors"), L([2.3, -1.75, 0], "PEGPH20 failed phase 3")];
  const base = sc.mesh.points;
  const squash = (pts: Vec3[], u: number) => { for (let i = vessel.p0; i < vessel.p1; i++) { const p = base[i]; pts[i] = [p[0], TUM[1] - 0.2 + (p[1] - (TUM[1] - 0.2)) * (1 - 0.75 * u), 0.45 + (p[2] - 0.45) * (1 - 0.75 * u)]; } };
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...caps, bars0, p3X, inv);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); squash(pts, u); press.forEach((p, i) => setAlpha(alpha, p, clamp(u * 4 - i) * (0.6 + 0.4 * pulse(t, 4)))); fibres.forEach((f) => setAlpha(alpha, f, 0.5 + 0.5 * u)); drug.forEach((d, i) => { setAlpha(alpha, d, 1); movePart(pts, base, d, [0.9 * ((t * 3 + i / 6) % 1) * (1 - 0.6 * u), 0, 0], 1); }); return { caption: "1 · Dense matrix generates solid stress that squeezes the tumour's own vessels shut; drugs and immune cells cannot get in" }; }
    if (s === 1) { const u = Q(t, 1); squash(pts, 1); show(alpha, 0.8, ...press); caps.forEach((c, i) => { setAlpha(alpha, c, 1); moveTo(pts, base, c, [2.4, 1.5 - 0.3 * i, 0.2], [TUM[0] + 0.6 * Math.cos(i * 2.1), TUM[1] + 0.6 * Math.sin(i * 2.1), 0.5], clamp(u * 1.4 - 0.1 * i)); }); drug.forEach((d, i) => { setAlpha(alpha, d, 1); movePart(pts, base, d, [0.4 * ((t * 3 + i / 6) % 1), 0, 0], 1); }); return { caption: "2 · Agents that cut matrix content or stiffness (losartan, hyaluronidase, LOXL2 inhibitors) aim to lower the stress and decompress the vessels" }; }
    if (s === 2) { const u = Q(t, 2); squash(pts, 1 - u); fibres.forEach((f, i) => setAlpha(alpha, f, 1 - 0.7 * clamp(u * 2 - 0.1 * i))); press.forEach((p) => setAlpha(alpha, p, 0.8 * (1 - u))); caps.forEach((c, i) => { setAlpha(alpha, c, 1 - 0.5 * u); moveTo(pts, base, c, [2.4, 1.5 - 0.3 * i, 0.2], [TUM[0] + 0.6 * Math.cos(i * 2.1), TUM[1] + 0.6 * Math.sin(i * 2.1), 0.5], 1); }); drug.forEach((d, i) => { setAlpha(alpha, d, 1); movePart(pts, base, d, [(0.4 + 3.6 * u) * ((t * 3 + i / 6) % 1), 0, 0], 1); }); setAlpha(alpha, tumour, 1 - 0.3 * u); return { caption: "3 · Perfusion reopens and drug reaches the tumour; the physics is well characterised and measurable with imaging" }; }
    const u = Q(t, 3); squash(pts, 0); show(alpha, 0.3, ...fibres); hide(alpha, ...press); caps.forEach((c, i) => { setAlpha(alpha, c, 0.5); moveTo(pts, base, c, [2.4, 1.5 - 0.3 * i, 0.2], [TUM[0] + 0.6 * Math.cos(i * 2.1), TUM[1] + 0.6 * Math.sin(i * 2.1), 0.5], 1); }); drug.forEach((d, i) => { setAlpha(alpha, d, 0.6); movePart(pts, base, d, [4.0 * ((0.3 + i / 6) % 1), 0, 0], 1); }); setAlpha(alpha, tumour, 0.7);
    setAlpha(alpha, bars0, clamp(u * 2)); setAlpha(alpha, p3X, clamp(u * 2 - 0.6)); grow(alpha, inv, clamp(u * 2 - 1));
    return { caption: "4 · Converting it into benefit has failed so far: PEGPH20 lost its phase 3 in pancreatic cancer, losartan combinations remain investigational, and loosening the matrix may aid invasion" };
  });
}

export const WAVE7: Record<string, () => Mesh> = {
  "coffee-intake-cancer": coffeeIntake,
  "lymphoedema-decongestive-therapy": lymphoedemaDecongestive,
  "fasting-mimicking-diet": fastingMimickingDiet,
  "isolated-limb-perfusion": isolatedLimbPerfusion,
  "variant-knowledgebases": variantKnowledgebases,
  "organoid-guided-therapy-scale": organoidGuidedTherapy,
  "probiotics-treatment-diarrhoea": probioticsDiarrhoea,
  "radionuclide-generators-kits": radionuclideGenerators,
  "tandem-transplant": tandemTransplant,
  "mechanobiology-therapy": mechanobiologyTherapy,
};

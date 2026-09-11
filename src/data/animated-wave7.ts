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

// ---------------------------------------------------------------- 11. acupuncture and acupressure for chemotherapy nausea
export function acupunctureNausea(): Mesh {
  const sc = scene();
  const ARM: Vec3 = [-1.3, 0.1, 0];
  put(sc, "forearm", cylinder(0.28, 1.8, 12, 3, "soft", true, true), { at: ARM, rotZ: Math.PI / 2 });
  put(sc, "hand", hand("soft"), { at: [ARM[0] - 1.15, ARM[1], 0], rotZ: Math.PI / 2, scale: 0.75 });
  const P6: Vec3 = [ARM[0] - 0.55, ARM[1] + 0.3, 0.05];
  const p6 = put(sc, "p6", small(0.07, "accent"), { at: P6 });
  const STO: Vec3 = [1.4, 0.4, 0];
  const stomach = put(sc, "stomach", organ(0.65, 0.5, 0.4), { at: STO });
  const waves: Part[] = []; for (let i = 0; i < 3; i++) waves.push(put(sc, `wv${i}`, ring(0.55 + 0.12 * i, 12, "hot", "z"), { at: STO }));
  const chemo = put(sc, "chemo", octahedron(0.12, "hot"), { at: [STO[0], STO[1] + 1.4, 0] });
  const ndl = put(sc, "ndl", needle(0.45, "accent"), { at: [P6[0], P6[1] + 0.7, P6[2]] });
  const band = put(sc, "band", torus(0.32, 0.05, 12, 5, "accent", true), { at: [P6[0], ARM[1], 0], rotZ: Math.PI / 2 });
  const zap: Part[] = []; for (let i = 0; i < 3; i++) zap.push(put(sc, `z${i}`, ring(0.12 + 0.1 * i, 8, "accent", "y"), { at: P6 }));
  const nerve = put(sc, "nerve", polyline([[P6[0], P6[1] + 0.1, 0.1], [ARM[0] + 0.6, ARM[1] + 0.9, 0.1], [0.2, 1.7, 0.1], [STO[0] - 0.3, STO[1] + 0.5, 0.1]], "accent"));
  const caps: Part[] = []; for (let i = 0; i < 3; i++) caps.push(put(sc, `cap${i}`, capsule(1, "accent"), { at: [0.6 + 0.45 * i, -1.35, 0] }));
  const v0 = put(sc, "v0", bar(2.3, 0.9, 0.25, "hot"), { at: [0, -1.6, 0] });
  const v1 = put(sc, "v1", bar(2.65, 0.7, 0.25, "accent"), { at: [0, -1.6, 0] });
  sc.mesh.labels = [L([P6[0], P6[1] + 1.35, 0], "P6 (Neiguan), inner wrist"), L([STO[0], STO[1] + 0.85, 0], "Brainstem emetic circuits and the stomach"), L([1.05, -1.95, 0], "5-HT3, NK1 antagonists, olanzapine first"), L([2.5, -0.5, 0], "Small extra reduction in acute vomiting")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...waves, ndl, band, ...zap, nerve, v0, v1);
    show(alpha, 0.5, ...caps);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, chemo, 1); moveTo(pts, base, chemo, [STO[0], STO[1] + 1.4, 0], STO, clamp(u * 1.5)); waves.forEach((w, i) => { const v = (t * 5 + i / 3) % 1; setAlpha(alpha, w, clamp(u * 2 - 1) * (1 - v)); movePart(pts, base, w, [0, 0, 0], 0.7 + 0.8 * v); }); setAlpha(alpha, stomach, 0.6 + 0.4 * pulse(t, 5)); return { caption: "1 · Chemotherapy triggers the brainstem emetic circuits; guideline antiemetics matched to the regimen's emetic risk (5-HT3, NK1 antagonists, olanzapine) do most of the work" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, chemo, 0.5); moveTo(pts, base, chemo, [STO[0], STO[1] + 1.4, 0], STO, 1); waves.forEach((w) => setAlpha(alpha, w, 0.5)); show(alpha, 1, ...caps); setAlpha(alpha, ndl, clamp(u * 2)); moveTo(pts, base, ndl, [P6[0], P6[1] + 0.7, P6[2]], [P6[0], P6[1] + 0.45, P6[2]], clamp(u * 1.5)); setAlpha(alpha, band, clamp(u * 2 - 1)); setAlpha(alpha, p6, 0.5 + 0.5 * pulse(t, 5)); return { caption: "2 · A needle, electrical stimulation or a pressure wristband at the P6 point on the inner wrist is added on top of the antiemetics" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, chemo, 0.5); moveTo(pts, base, chemo, [STO[0], STO[1] + 1.4, 0], STO, 1); show(alpha, 1, ...caps, ndl, band); moveTo(pts, base, ndl, [P6[0], P6[1] + 0.7, P6[2]], [P6[0], P6[1] + 0.45, P6[2]], 1); zap.forEach((z, i) => { const v = (t * 5 + i / 3) % 1; setAlpha(alpha, z, u * (1 - v)); movePart(pts, base, z, [0, 0, 0], 0.5 + v); }); grow(alpha, nerve, u); waves.forEach((w) => setAlpha(alpha, w, 0.5 - 0.35 * u)); setAlpha(alpha, stomach, 1); return { caption: "3 · Stimulation is thought to modulate vagal tone and the brainstem circuits and raise endogenous opioid and serotonin activity; sham-controlled trials suggest part of the effect is expectation" }; }
    const u = Q(t, 3); setAlpha(alpha, chemo, 0.5); moveTo(pts, base, chemo, [STO[0], STO[1] + 1.4, 0], STO, 1); show(alpha, 1, ...caps, ndl, band); moveTo(pts, base, ndl, [P6[0], P6[1] + 0.7, P6[2]], [P6[0], P6[1] + 0.45, P6[2]], 1); setAlpha(alpha, nerve, 0.6); waves.forEach((w) => setAlpha(alpha, w, 0.15)); show(alpha, 0.4, ...zap);
    setAlpha(alpha, v0, clamp(u * 2)); setAlpha(alpha, v1, clamp(u * 2 - 1));
    return { caption: "4 · A Cochrane review of 11 trials found less acute vomiting with electroacupuncture and less nausea with acupressure; SIO 2017 and ASCO 2018 grade them as reasonable additions, never a substitute" };
  });
}

// ---------------------------------------------------------------- 12. Auger-electron therapy
export function augerElectronTherapy(): Mesh {
  const sc = scene();
  const C: Vec3 = [-0.4, 0, 0], N: Vec3 = [-0.4, 0.05, 0];
  put(sc, "cell", cell(1.15, "soft"), { at: C });
  const nucleus = put(sc, "nucleus", sphere(0.5, 4, 10, "accent", true), { at: N });
  const dna = put(sc, "dna", helix(0.12, 0.7, 2.5, 20, "accent"), { at: [N[0], N[1] - 0.35, 0] });
  const NEI: Vec3 = [1.85, -0.5, 0.3];
  const neigh = put(sc, "neigh", cell(0.6, "soft"), { at: NEI });
  put(sc, "neighNuc", sphere(0.22, 3, 8, "soft"), { at: NEI });
  const A0: Vec3 = [-2.4, 1.3, 0.3], A1: Vec3 = [C[0] - 0.75, C[1] + 0.45, 0.3], A2: Vec3 = [N[0] + 0.08, N[1] + 0.05, 0.15];
  const atom = put(sc, "atom", octahedron(0.12, "hot", true), { at: A0 });
  const spray1: Part[] = []; for (let i = 0; i < 3; i++) spray1.push(put(sc, `s1${i}`, ring(0.08 + 0.06 * i, 8, "hot", "z"), { at: A1 }));
  const spray2: Part[] = []; for (let i = 0; i < 3; i++) spray2.push(put(sc, `s2${i}`, ring(0.08 + 0.06 * i, 8, "hot", "z"), { at: A2 }));
  const breaks = put(sc, "breaks", dots([[N[0] - 0.05, N[1] + 0.15, 0.15], [N[0] + 0.12, N[1] - 0.1, 0.15], [N[0] + 0.02, N[1] - 0.25, 0.15]], "hot"));
  const alphaRing = put(sc, "alphaRing", ring(1.9, 16, "hot", "z"), { at: C });
  const alphaX = put(sc, "alphaX", cross([NEI[0], NEI[1] + 0.85, 0.3], 0.18));
  const lig = put(sc, "lig", polyline([[1.5, 1.5, 0], [1.9, 1.5, 0], [2.1, 1.7, 0]], "accent"));
  const tb = put(sc, "tb", octahedron(0.1, "hot", true), { at: [1.4, 1.5, 0] });
  const lu = put(sc, "lu", octahedron(0.1, "soft"), { at: [1.4, 1.5, 0] });
  sc.mesh.labels = [L([C[0], C[1] + 1.5, 0], "Electron range: nanometres to micrometres"), L([N[0], N[1] - 0.85, 0], "Lethal only on or inside the DNA"), L([NEI[0], NEI[1] - 0.95, 0.3], "Neighbour spared, unlike alpha crossfire"), L([1.9, 2.0, 0], "Terbium-161 in place of lutetium-177")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...spray1, ...spray2, breaks, alphaRing, alphaX, lig, tb, lu);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); moveTo(pts, base, atom, A0, A1, clamp(u * 1.3), 1, u * 3); spray1.forEach((r, i) => { const v = (t * 6 + i / 3) % 1; setAlpha(alpha, r, clamp(u * 3 - 2) * (1 - v)); movePart(pts, base, r, [0, 0, 0], 0.5 + 0.6 * v); }); return { caption: "1 · Iodine-125, indium-111 or terbium-161 decay by electron capture, releasing a cascade of very low-energy electrons that travel only nanometres; in the cytoplasm the cascade fizzles harmlessly" }; }
    if (s === 1) { const u = Q(t, 1); moveTo(pts, base, atom, A1, A2, u, 1, 3 + u * 3); setAlpha(alpha, nucleus, 0.6 + 0.4 * clamp(u * 2 - 1) * pulse(t, 5)); return { caption: "2 · Everything depends on delivery: the emitter has to be carried onto or into the nucleus, next to the DNA" }; }
    if (s === 2) { const u = Q(t, 2); moveTo(pts, base, atom, A1, A2, 1, 1, 6); spray2.forEach((r, i) => { const v = (t * 6 + i / 3) % 1; setAlpha(alpha, r, (1 - v)); movePart(pts, base, r, [0, 0, 0], 0.5 + 0.6 * v); }); setAlpha(alpha, breaks, clamp(u * 2 - 0.5) * pulse(t, 7)); setAlpha(alpha, dna, 1 - 0.4 * u); setAlpha(alpha, alphaRing, clamp(u * 2 - 1) * 0.5); setAlpha(alpha, neigh, 1); setAlpha(alpha, alphaX, clamp(u * 3 - 2)); return { caption: "3 · There the cascade is exquisitely cytotoxic to that one cell while the neighbour is spared almost entirely; an alpha emitter's range would have crossed into it" }; }
    const u = Q(t, 3); moveTo(pts, base, atom, A1, A2, 1, 1, 6); show(alpha, 0.5, ...spray2, alphaRing); setAlpha(alpha, breaks, 1); setAlpha(alpha, dna, 0.6); setAlpha(alpha, alphaX, 0.7);
    setAlpha(alpha, lig, clamp(u * 2)); setAlpha(alpha, lu, clamp(u * 2) * (1 - clamp(u * 2 - 1))); setAlpha(alpha, tb, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4)));
    return { caption: "4 · Terbium-161 is closest to the clinic because it slots into existing PSMA and somatostatin ligands in place of lutetium-177; true nuclear delivery remains preclinical, and beta-emitter dosimetry does not apply" };
  });
}

// ---------------------------------------------------------------- 13. bimatoprost for eyelash and eyebrow regrowth
export function bimatoprostEyelash(): Mesh {
  const sc = scene();
  const E: Vec3 = [0, 0, 0];
  put(sc, "eye", ellipsoid(1.1, 0.55, 0.35, 4, 12, "soft", true), { at: E });
  put(sc, "iris", disc(0.32, 12, "accent", "z"), { at: [E[0], E[1], 0.3] });
  put(sc, "pupil", disc(0.13, 8, "soft", "z"), { at: [E[0], E[1], 0.32] });
  put(sc, "lid", polyline([[-1.1, 0, 0.3], [-0.6, 0.45, 0.35], [0, 0.6, 0.38], [0.6, 0.45, 0.35], [1.1, 0, 0.3]], "soft"));
  const lashes: Part[] = []; for (let i = 0; i < 7; i++) { const x = -0.9 + 0.3 * i, y0 = 0.62 - 0.14 * Math.abs(x) - 0.08 * x * x; lashes.push(put(sc, `l${i}`, line([x, y0, 0.36], [x + 0.08, y0 + 0.42, 0.42], "accent"))); }
  const chemo = put(sc, "chemo", cloud(8, 0.9, "hot", 3), { at: [0, 1.7, 0] });
  const APP0: Vec3 = [1.9, 1.5, 0.4];
  const app = put(sc, "app", polyline([[0, 0, 0], [0, 0.55, 0]], "accent"), { at: APP0 });
  const drop = put(sc, "drop", octahedron(0.07, "accent", true), { at: APP0 });
  const moon = put(sc, "moon", ring(0.22, 10, "soft", "z"), { at: [-2.1, 1.4, 0] });
  const tl = put(sc, "tl", ticks(-2.4, 2.4, -1.15, 5, "soft"));
  const marker = put(sc, "marker", small(0.07, "accent"), { at: [-2.4, -1.15, 0.05] });
  const red: Part[] = []; for (let i = 0; i < 2; i++) red.push(put(sc, `r${i}`, ring(0.42 + 0.1 * i, 12, "hot", "z"), { at: [E[0], E[1], 0.3] }));
  const dark = put(sc, "dark", polyline([[-0.9, 0.55, 0.37], [0, 0.72, 0.4], [0.9, 0.55, 0.37]], "hot"));
  const chemoX = put(sc, "chemoX", cross([0, 1.7, 0.2], 0.3));
  sc.mesh.labels = [L([0, -0.85, 0], "Upper lash margin, nightly"), L([APP0[0], APP0[1] + 0.85, 0.4], "Bimatoprost 0.03 percent (FDA 2008)"), L([0, -1.5, 0], "Month 4 gains, continued to 12 months"), L([-2.1, 1.95, 0], "Not during active chemotherapy")];
  const base = sc.mesh.points;
  const lashScale = (pts: Vec3[], k: number) => lashes.forEach((l) => { const a = base[l.p0], b = base[l.p1 - 1]; pts[l.p1 - 1] = [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k]; });
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, app, drop, moon, tl, marker, ...red, dark, chemoX);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, chemo, 1); movePart(pts, base, chemo, [0, -0.5 * u, 0], 1); lashScale(pts, 1 - 0.75 * u); lashes.forEach((l, i) => setAlpha(alpha, l, 1 - 0.6 * clamp(u * 2 - 0.1 * i))); return { caption: "1 · Chemotherapy pushes follicles out of the growth phase: eyelashes and eyebrows fall out and can be slow to return" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, chemo, 0.2 * (1 - u)); lashScale(pts, 0.25); show(alpha, 0.4, ...lashes); setAlpha(alpha, moon, clamp(u * 2) * 0.8); setAlpha(alpha, app, 1); setAlpha(alpha, drop, 1); const k = clamp(u * 1.5); moveTo(pts, base, app, APP0, [0.9, 0.85, 0.42], k); const sw: Vec3 = [0.9 - 1.8 * clamp(u * 3 - 1.5), 0.85 - 0.15 * Math.sin(clamp(u * 3 - 1.5) * Math.PI), 0.42]; moveTo(pts, base, app, APP0, sw, k >= 1 ? 1 : k); moveTo(pts, base, drop, APP0, [sw[0], sw[1] - 0.05, 0.45], k); return { caption: "2 · Once chemotherapy is over, the prostaglandin analogue bimatoprost 0.03 percent is brushed along the upper lash margin each night" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, chemo, 0); setAlpha(alpha, moon, 0.4); setAlpha(alpha, app, 0.4); moveTo(pts, base, app, APP0, [-0.9, 0.7, 0.42], 1); setAlpha(alpha, drop, 0); setAlpha(alpha, tl, 1); setAlpha(alpha, marker, 1); moveTo(pts, base, marker, [-2.4, -1.15, 0.05], [2.4, -1.15, 0.05], u); lashScale(pts, 0.25 + 1.0 * u); lashes.forEach((l, i) => setAlpha(alpha, l, 0.4 + 0.6 * clamp(u * 2 - 0.1 * i))); return { caption: "3 · Prolonging the anagen phase lengthens and thickens the lashes: in a randomised vehicle-controlled trial that included people after chemotherapy, prominence, length, thickness and darkness improved by month 4 and kept improving to 12 months" }; }
    const u = Q(t, 3); setAlpha(alpha, chemo, 0.25); setAlpha(alpha, moon, 0.4); setAlpha(alpha, app, 0.4); moveTo(pts, base, app, APP0, [-0.9, 0.7, 0.42], 1); setAlpha(alpha, tl, 0.6); setAlpha(alpha, marker, 0.6); moveTo(pts, base, marker, [-2.4, -1.15, 0.05], [2.4, -1.15, 0.05], 1); lashScale(pts, 1.25); show(alpha, 1, ...lashes);
    red.forEach((r, i) => setAlpha(alpha, r, clamp(u * 3 - i) * 0.6 * pulse(t, 4))); setAlpha(alpha, dark, clamp(u * 2 - 0.5)); setAlpha(alpha, chemoX, clamp(u * 2 - 1));
    return { caption: "4 · Side effects are local (conjunctival redness, eyelid skin darkening); iris darkening is rare at the lash margin. Lashes usually regrow unaided within months, so this is for faster or fuller return, not during active chemotherapy" };
  });
}

// ---------------------------------------------------------------- 14. cancer-associated thrombosis prevention and treatment
export function cancerAssociatedThrombosis(): Mesh {
  const sc = scene();
  const V: Vec3 = [0.2, 0.3, 0];
  const vein = put(sc, "vein", tube(0.42, 3.2, "soft"), { at: V });
  const flow: Part[] = []; for (let i = 0; i < 6; i++) flow.push(put(sc, `fl${i}`, octahedron(0.07, "soft"), { at: [V[0] - 1.4 + 0.5 * i, V[1] + 0.12 * Math.sin(i * 2), 0.1 * Math.cos(i)] }));
  const clot = put(sc, "clot", blob(0.36, "hot"), { at: [V[0] + 0.5, V[1] - 0.05, 0] });
  const tumour = put(sc, "tumour", blob(0.4, "hot"), { at: [-2.1, 1.4, 0] });
  const tf: Part[] = []; for (let i = 0; i < 4; i++) tf.push(put(sc, `tf${i}`, dots([[0, 0, 0]], "hot"), { at: [-2.1, 1.4, 0.2] }));
  const score = put(sc, "score", doc(0.75, 0.85, 4, "soft"), { at: [-2.1, -1.0, 0] });
  const scoreDot = put(sc, "scoreDot", small(0.08, "hot"), { at: [-1.9, -0.75, 0.1] });
  const proph: Part[] = []; for (let i = 0; i < 2; i++) proph.push(put(sc, `pr${i}`, capsule(1, "accent"), { at: [-0.9 + 0.5 * i, -1.35, 0] }));
  const vte0 = put(sc, "vte0", bar(1.6, 0.9, 0.25, "hot"), { at: [0, -1.85, 0] });
  const vte1 = put(sc, "vte1", bar(1.95, 0.45, 0.25, "accent"), { at: [0, -1.85, 0] });
  const doac = put(sc, "doac", capsule(1.3, "accent"), { at: [2.3, 1.3, 0] });
  const lmwh = put(sc, "lmwh", syringe(0.55, "soft"), { at: [2.3, 0.35, 0.2], rotZ: -1.0 });
  const gut = put(sc, "gut", tube(0.16, 0.9, "hot"), { at: [1.55, 1.75, 0] });
  const tl = put(sc, "tl", ticks(0.6, 2.6, -1.0, 6, "soft"));
  sc.mesh.labels = [L([V[0], V[1] + 0.85, 0], "Deep vein: risk 4-7-fold in cancer"), L([-2.1, -1.65, 0], "Khorana score of 2 or more"), L([1.8, -2.2, 0], "AVERT and CASSINI: VTE roughly halved"), L([2.3, 2.1, 0], "DOAC; LMWH for luminal GI tumours")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...tf, score, scoreDot, ...proph, vte0, vte1, doac, lmwh, gut, tl);
    setAlpha(alpha, vein, 0.7);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); flow.forEach((f, i) => { const v = (t * 3 + i / 6) % 1; setAlpha(alpha, f, 0.8); movePart(pts, base, f, [2.8 * v - 0.5 * i, 0, 0], 1); }); tf.forEach((d, i) => { const v = (t * 3 + i / 4) % 1; setAlpha(alpha, d, 1 - v); moveTo(pts, base, d, [-2.1, 1.4, 0.2], [V[0] - 1.2 + 0.3 * i, V[1] + 0.2, 0.2], v); }); setAlpha(alpha, clot, clamp(u * 2 - 0.5) * (0.6 + 0.4 * pulse(t, 5))); movePart(pts, base, clot, [0, 0, 0], 0.3 + 0.7 * clamp(u * 2 - 0.5)); setAlpha(alpha, tumour, 0.6 + 0.4 * pulse(t, 4)); return { caption: "1 · Cancer raises venous thromboembolism risk 4-7-fold, highest in pancreatic, gastric, brain and lung cancers and myeloma on IMiDs; clots are the second commonest cause of death" }; }
    if (s === 1) { const u = Q(t, 1); flow.forEach((f, i) => { const v = (0.5 + i / 6) % 1; setAlpha(alpha, f, 0.4); movePart(pts, base, f, [2.8 * v - 0.5 * i, 0, 0], 1); }); setAlpha(alpha, clot, 0.3); movePart(pts, base, clot, [0, 0, 0], 0.5); setAlpha(alpha, score, 1); setAlpha(alpha, scoreDot, clamp(u * 2) * pulse(t, 5)); proph.forEach((p, i) => { setAlpha(alpha, p, clamp(u * 3 - 1 - 0.3 * i)); movePart(pts, base, p, [0, 0.4 * (1 - clamp(u * 3 - 1 - 0.3 * i)), 0], 1); }); setAlpha(alpha, vte0, clamp(u * 3 - 1.5)); setAlpha(alpha, vte1, clamp(u * 3 - 2)); return { caption: "2 · The Khorana score (2008) picks out high-risk outpatients; in AVERT (apixaban) and CASSINI (rivaroxaban), prophylaxis roughly halved VTE in patients scoring 2 or more with acceptable bleeding" }; }
    if (s === 2) { const u = Q(t, 2); flow.forEach((f, i) => { const v = (0.5 + i / 6) % 1; setAlpha(alpha, f, 0.4); movePart(pts, base, f, [2.8 * v - 0.5 * i, 0, 0], 1); }); setAlpha(alpha, clot, 1 - 0.7 * u); movePart(pts, base, clot, [0, 0, 0], 1 - 0.6 * u); show(alpha, 0.5, score, scoreDot, ...proph, vte0, vte1); setAlpha(alpha, doac, clamp(u * 2)); moveTo(pts, base, doac, [2.3, 1.3, 0], [V[0] + 0.5, V[1] + 0.7, 0.3], clamp(u * 1.5)); setAlpha(alpha, gut, clamp(u * 2 - 1) * 0.8); setAlpha(alpha, lmwh, clamp(u * 2 - 1)); return { caption: "3 · For an established clot, Hokusai VTE Cancer, SELECT-D and Caravaggio established DOACs over the LMWH injections standard since CLOT (2003); LMWH stays preferred for luminal GI tumours and drug interactions" }; }
    const u = Q(t, 3); flow.forEach((f, i) => { const v = (t * 3 + i / 6) % 1; setAlpha(alpha, f, 0.8); movePart(pts, base, f, [2.8 * v - 0.5 * i, 0, 0], 1); }); setAlpha(alpha, clot, 0.15); movePart(pts, base, clot, [0, 0, 0], 0.3); show(alpha, 0.5, score, scoreDot, ...proph, vte0, vte1, gut, lmwh); setAlpha(alpha, doac, 1); moveTo(pts, base, doac, [2.3, 1.3, 0], [V[0] + 0.5, V[1] + 0.7, 0.3], 1);
    grow(alpha, tl, u);
    return { caption: "4 · Anticoagulation continues for at least 6 months while the cancer is active; catheter thrombosis, arterial events on VEGF and BTK inhibitors, brain tumours and thrombocytopenia need individual judgement" };
  });
}

// ---------------------------------------------------------------- 15. CAR-T against stroma: fibroblasts and myeloid cells
export function stromaDirectedCar(): Mesh {
  const sc = scene();
  const T: Vec3 = [0.3, 0, 0];
  const tumour = put(sc, "tumour", blob(0.7, "hot"), { at: T });
  const fibs: Part[] = []; for (let i = 0; i < 6; i++) { const a = (TAU * i) / 6; fibs.push(put(sc, `fb${i}`, ellipsoid(0.42, 0.13, 0.13, 3, 8, "soft", true), { at: [T[0] + 1.05 * Math.cos(a), T[1] + 0.85 * Math.sin(a), 0.15 * Math.sin(i)], rotZ: a + Math.PI / 2 })); }
  const fap: Part[] = []; for (let i = 0; i < 6; i++) { const a = (TAU * i) / 6; fap.push(put(sc, `fap${i}`, dots([[0, 0, 0]], "accent"), { at: [T[0] + 1.3 * Math.cos(a), T[1] + 1.05 * Math.sin(a), 0.2] })); }
  const CAR0: Vec3 = [-2.4, 1.2, 0.3];
  const car = put(sc, "car", cell(0.32, "accent"), { at: CAR0 });
  put(sc, "carNuc", sphere(0.12, 3, 8, "accent"), { at: CAR0 });
  const rec = put(sc, "rec", polyline([[CAR0[0] + 0.3, CAR0[1], 0.3], [CAR0[0] + 0.5, CAR0[1], 0.3]], "accent"));
  const drugs: Part[] = []; for (let i = 0; i < 5; i++) drugs.push(put(sc, `d${i}`, octahedron(0.08, "accent"), { at: [-2.3 + 0.2 * (i % 2), -1.2 - 0.15 * i, 0.2] }));
  const marrow = put(sc, "marrow", cylinder(0.22, 1.1, 10, 2, "soft", true, true), { at: [2.3, 1.1, 0], rotZ: Math.PI / 2 });
  const wound = put(sc, "wound", polyline([[1.8, -1.0, 0], [2.1, -1.3, 0], [2.4, -1.0, 0], [2.7, -1.3, 0]], "soft"));
  const hits: Part[] = []; for (let i = 0; i < 2; i++) hits.push(put(sc, `hit${i}`, ring(0.3, 10, "hot", "z"), { at: i === 0 ? [2.3, 1.1, 0.25] : [2.25, -1.15, 0.1] }));
  sc.mesh.labels = [L([T[0], T[1] + 1.65, 0], "FAP+ cancer-associated fibroblasts"), L([CAR0[0], CAR0[1] + 0.65, 0.3], "CAR-T against a stromal antigen"), L([2.3, 1.65, 0], "FAP also in bone marrow stroma"), L([2.25, -1.7, 0], "and in healing tissue")];
  const base = sc.mesh.points;
  const fibPos = (i: number): Vec3 => { const a = (TAU * i) / 6; return [T[0] + 1.3 * Math.cos(a), T[1] + 1.05 * Math.sin(a), 0.2]; };
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...drugs, ...hits);
    show(alpha, 0.35, marrow, wound);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, tumour, 0.6 + 0.4 * pulse(t, 4)); fibs.forEach((f, i) => setAlpha(alpha, f, 0.4 + 0.6 * clamp(u * 3 - 0.3 * i))); fap.forEach((f) => setAlpha(alpha, f, clamp(u * 2 - 1) * pulse(t, 5))); setAlpha(alpha, car, 0.5); setAlpha(alpha, rec, 0.5); return { caption: "1 · A desmoplastic tumour hides behind cancer-associated fibroblasts (FAP+) and suppressive myeloid cells; the scaffold blocks drugs and immunity" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 1, ...fibs, ...fap); fibs.forEach((f, i) => { const v = clamp(u * 1.5 - 0.15 * i); setAlpha(alpha, f, 1 - 0.85 * v); movePart(pts, base, f, [0, 0, 0], 1 - 0.6 * v); }); fap.forEach((f, i) => setAlpha(alpha, f, 1 - clamp(u * 1.5 - 0.15 * i))); const k = Math.min(5, Math.floor(u * 6)); const p = fibPos(k); moveTo(pts, base, car, CAR0, [p[0] - 0.4, p[1], 0.3], clamp(u * 6 - k) * 0.5 + 0.5 * Math.min(1, k)); moveTo(pts, base, rec, CAR0, [p[0] - 0.4, p[1], 0.3], clamp(u * 6 - k) * 0.5 + 0.5 * Math.min(1, k)); return { caption: "2 · The CAR recognises FAP (or CSF1R, TREM2, CD163 on myeloid cells) rather than a tumour antigen, and kills the supporting cells one by one; a small Swiss study gave FAP CAR-T into the pleura in mesothelioma" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.15, ...fibs); hide(alpha, ...fap); const p = fibPos(5); moveTo(pts, base, car, CAR0, [p[0] - 0.4, p[1], 0.3], 1); moveTo(pts, base, rec, CAR0, [p[0] - 0.4, p[1], 0.3], 1); drugs.forEach((d, i) => { setAlpha(alpha, d, 1); moveTo(pts, base, d, [-2.3 + 0.2 * (i % 2), -1.2 - 0.15 * i, 0.2], [T[0] - 0.3 + 0.15 * i, T[1] - 0.2 + 0.1 * (i % 3), 0.5], clamp(u * 1.5 - 0.1 * i)); }); setAlpha(alpha, tumour, 1 - 0.4 * clamp(u * 2 - 1)); return { caption: "3 · With the niche collapsed, chemotherapy and immune cells reach the tumour, as in mouse models; stroma is genetically stable, so it cannot mutate away, and one construct could serve many cancers" }; }
    const u = Q(t, 3); show(alpha, 0.15, ...fibs); hide(alpha, ...fap); const p = fibPos(5); moveTo(pts, base, car, CAR0, [p[0] - 0.4, p[1], 0.3], 1); moveTo(pts, base, rec, CAR0, [p[0] - 0.4, p[1], 0.3], 1); drugs.forEach((d, i) => { setAlpha(alpha, d, 0.7); moveTo(pts, base, d, [-2.3 + 0.2 * (i % 2), -1.2 - 0.15 * i, 0.2], [T[0] - 0.3 + 0.15 * i, T[1] - 0.2 + 0.1 * (i % 3), 0.5], 1); }); setAlpha(alpha, tumour, 0.6);
    show(alpha, 0.5 + 0.5 * u, marrow, wound); hits.forEach((h, i) => setAlpha(alpha, h, clamp(u * 2 - 0.5 * i) * (0.6 + 0.4 * pulse(t, 5))));
    return { caption: "4 · The recurring problem is that FAP and myeloid markers are not tumour-specific: FAP sits in bone marrow stroma and healing tissue, murine FAP CAR-T caused cachexia and marrow toxicity, and depleting stroma sped up some pancreatic models" };
  });
}

// ---------------------------------------------------------------- 16. clinical hypnosis for procedures, pain and hot flushes
export function hypnosisCancerCare(): Mesh {
  const sc = scene();
  const P: Vec3 = [-0.5, -0.4, 0];
  put(sc, "bed", box(2.4, 0.15, 0.8, "soft", true), { at: [P[0], P[1] - 0.45, 0] });
  const patient = put(sc, "patient", figure("soft"), { at: [P[0], P[1] + 0.05, 0.1], rotZ: -Math.PI / 2, scale: 0.85 });
  const head = put(sc, "head", sphere(0.3, 4, 10, "accent", true), { at: [P[0] - 0.95, P[1] + 0.1, 0.1] });
  const wavesA = put(sc, "wA", polyline([[-2.4, 1.3, 0], [-2.2, 1.55, 0], [-2.0, 1.05, 0], [-1.8, 1.6, 0], [-1.6, 1.0, 0], [-1.4, 1.5, 0], [-1.2, 1.15, 0]], "hot"));
  const wavesB = put(sc, "wB", polyline([[-2.4, 1.3, 0], [-2.15, 1.42, 0], [-1.9, 1.3, 0], [-1.65, 1.42, 0], [-1.4, 1.3, 0], [-1.2, 1.4, 0]], "accent"));
  const thera = put(sc, "thera", figure("accent"), { at: [1.4, -0.2, -0.3], scale: 0.85 });
  const clock = put(sc, "clock", clockFace(0.32), { at: [1.4, 1.35, 0] });
  const voice: Part[] = []; for (let i = 0; i < 3; i++) voice.push(put(sc, `v${i}`, ring(0.1 + 0.08 * i, 8, "accent", "y"), { at: [1.0, 0.5, 0] }));
  const ax = put(sc, "ax", axes([0.4, -1.95, 0], 2.3, 1.0));
  const bars: Part[] = []; const HB = [0.85, 0.5, 0.75, 0.42, 0.7, 0.4]; for (let i = 0; i < 6; i++) bars.push(put(sc, `b${i}`, bar(0.65 + 0.36 * i, HB[i], 0.2, i % 2 ? "accent" : "hot"), { at: [0, -1.95, 0] }));
  const flush: Part[] = []; for (let i = 0; i < 3; i++) flush.push(put(sc, `fl${i}`, ring(0.4 + 0.12 * i, 10, "hot", "z"), { at: [P[0] - 0.95, P[1] + 0.1, 0.1] }));
  const sessions = put(sc, "sess", ticks(-2.4, -0.6, -1.7, 5, "accent"));
  const ctrlX = put(sc, "ctrlX", cross([2.6, 0.9, 0], 0.2));
  const ctrl = put(sc, "ctrl", doc(0.5, 0.6, 3, "soft"), { at: [2.6, 0.9, -0.05] });
  sc.mesh.labels = [L([P[0], P[1] - 1.05, 0], "Breast biopsy or lumpectomy"), L([1.4, 1.95, 0], "15-minute presurgical session"), L([1.6, -2.3, 0], "Pain, nausea, fatigue lower (200 women, JNCI 2007)"), L([-1.5, -2.05, 0], "Five weekly sessions: hot flushes down about two thirds")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, wavesB, ...voice, ax, ...bars, ...flush, sessions, ctrlX, ctrl);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, wavesA, 1); setAlpha(alpha, clock, 1); setAlpha(alpha, thera, 1); movePart(pts, base, thera, [-0.6 * u, 0, 0], 1); voice.forEach((v, i) => { const w = (t * 5 + i / 3) % 1; setAlpha(alpha, v, clamp(u * 2 - 0.5) * (1 - w)); movePart(pts, base, v, [-0.8 * w, 0, 0], 1); }); setAlpha(alpha, head, 0.6 + 0.4 * pulse(t, 8)); return { caption: "1 · Before a breast biopsy or lumpectomy, a psychologist gives a 15-minute session of focused attention and suggestion" }; }
    if (s === 1) { const u = Q(t, 1); movePart(pts, base, thera, [-0.6, 0, 0], 1); voice.forEach((v) => setAlpha(alpha, v, 0.3)); setAlpha(alpha, wavesA, 1 - u); setAlpha(alpha, wavesB, u); setAlpha(alpha, head, 0.7); setAlpha(alpha, patient, 1); return { caption: "2 · Suggestion under focused attention alters expectation and the cortical processing of pain and autonomic signals; effects are largest for acute, procedural symptoms" }; }
    if (s === 2) { const u = Q(t, 2); movePart(pts, base, thera, [-0.6, 0, 0], 1); setAlpha(alpha, wavesB, 1); setAlpha(alpha, head, 0.7); setAlpha(alpha, ax, 1); bars.forEach((b, i) => setAlpha(alpha, b, clamp(u * 3 - 0.4 * i))); return { caption: "3 · In 200 women (Montgomery, JNCI 2007) post-operative pain, nausea, fatigue and discomfort were lower and operating room time shorter than with attention control; the 2022 SIO-ASCO pain guideline says hypnosis may be offered for procedural pain" }; }
    const u = Q(t, 3); movePart(pts, base, thera, [-0.6, 0, 0], 1); setAlpha(alpha, wavesB, 1); show(alpha, 0.6, ax, ...bars);
    flush.forEach((f, i) => { const w = (t * 4 + i / 3) % 1; setAlpha(alpha, f, clamp(u * 2) * (1 - w) * (1 - 0.6 * clamp(u * 2 - 1))); movePart(pts, base, f, [0, 0, 0], 0.6 + 0.8 * w); }); grow(alpha, sessions, clamp(u * 2)); setAlpha(alpha, ctrl, clamp(u * 3 - 1.5)); setAlpha(alpha, ctrlX, clamp(u * 3 - 2));
    return { caption: "4 · In 60 survivors (Elkins, JCO 2008) five weekly sessions cut hot flush scores by about two thirds versus no treatment, but without a sham or attention control the placebo component is unmeasured; hypnotisability varies and trained providers are few" };
  });
}

// ---------------------------------------------------------------- 17. engineered exosomes as drug carriers
export function exosomeTherapeutics(): Mesh {
  const sc = scene();
  const D: Vec3 = [-1.7, 0.3, 0];
  const donor = put(sc, "donor", cell(0.8, "soft"), { at: D });
  put(sc, "donorNuc", sphere(0.3, 3, 8, "soft"), { at: [D[0] - 0.1, D[1], 0] });
  const exos: Part[] = []; for (let i = 0; i < 5; i++) exos.push(put(sc, `ex${i}`, sphere(0.16, 3, 8, "accent", true), { at: [D[0] + 0.55, D[1] - 0.4 + 0.2 * i, 0.2 * Math.sin(i)] }));
  const cargo: Part[] = []; for (let i = 0; i < 5; i++) cargo.push(put(sc, `cg${i}`, helix(0.05, 0.14, 1.5, 8, "hot"), { at: [D[0] + 0.55, D[1] - 0.47 + 0.2 * i, 0.2 * Math.sin(i)] }));
  const cd47: Part[] = []; for (let i = 0; i < 5; i++) cd47.push(put(sc, `cd${i}`, dots([[0.18, 0, 0]], "accent"), { at: [D[0] + 0.55, D[1] - 0.4 + 0.2 * i, 0.2 * Math.sin(i)] }));
  const MAC: Vec3 = [0.3, 1.4, 0.2];
  const mac = put(sc, "mac", ellipsoid(0.55, 0.4, 0.35, 4, 10, "soft", true), { at: MAC });
  const macX = put(sc, "macX", cross([MAC[0], MAC[1] - 0.55, 0.3], 0.16));
  const TUM: Vec3 = [1.9, 0.1, 0];
  const tumour = put(sc, "tumour", cell(0.75, "hot"), { at: TUM });
  put(sc, "tumNuc", sphere(0.28, 3, 8, "hot"), { at: TUM });
  const kras = put(sc, "kras", octahedron(0.12, "hot", true), { at: [TUM[0] + 0.05, TUM[1] + 0.35, 0.25] });
  const krasX = put(sc, "krasX", cross([TUM[0] + 0.05, TUM[1] + 0.35, 0.35], 0.18, "accent"));
  const liver = put(sc, "liver", ellipsoid(0.55, 0.35, 0.3, 4, 8, "soft", true), { at: [0.2, -1.4, 0] });
  const spleen = put(sc, "spleen", ellipsoid(0.3, 0.2, 0.2, 3, 8, "soft", true), { at: [1.3, -1.45, 0] });
  const lost: Part[] = []; for (let i = 0; i < 3; i++) lost.push(put(sc, `lo${i}`, octahedron(0.1, "accent", true), { at: [D[0] + 0.55, D[1], 0.2] }));
  sc.mesh.labels = [L([D[0], D[1] + 1.15, 0], "Mesenchymal donor cell"), L([MAC[0], MAC[1] + 0.65, 0.2], "CD47: 'do not eat me' to macrophages"), L([TUM[0], TUM[1] + 1.1, 0], "Pancreatic cancer cell, KRAS G12D"), L([0.7, -1.95, 0], "Most still ends in liver and spleen")];
  const base = sc.mesh.points;
  const exFrom = (i: number): Vec3 => [D[0] + 0.55, D[1] - 0.4 + 0.2 * i, 0.2 * Math.sin(i)];
  const exTo = (i: number): Vec3 => [TUM[0] - 0.5 + 0.2 * (i % 3), TUM[1] - 0.2 + 0.2 * Math.floor(i / 3), 0.4];
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, macX, krasX, ...lost);
    show(alpha, 0.35, liver, spleen);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, donor, 0.7 + 0.3 * pulse(t, 4)); exos.forEach((e, i) => { const v = clamp(u * 2.5 - 0.3 * i); setAlpha(alpha, e, v); movePart(pts, base, e, [-0.4 * (1 - v), 0, 0], 0.3 + 0.7 * v); setAlpha(alpha, cargo[i], v); movePart(pts, base, cargo[i], [-0.4 * (1 - v), 0, 0], 0.3 + 0.7 * v); setAlpha(alpha, cd47[i], v); movePart(pts, base, cd47[i], [-0.4 * (1 - v), 0, 0], 1); }); setAlpha(alpha, mac, 0.4); setAlpha(alpha, tumour, 0.5); setAlpha(alpha, kras, 0.5); return { caption: "1 · Donor mesenchymal cells shed natural lipid vesicles that are loaded, ex vivo or by engineering the donor, with siRNA against KRAS G12D (iExosomes)" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 1, ...exos, ...cargo, ...cd47); exos.forEach((e, i) => { const k = clamp(u * 1.2 - 0.08 * i); const mid: Vec3 = lerp3(exFrom(i), [MAC[0], MAC[1] - 0.6, 0.3], k); moveTo(pts, base, e, exFrom(i), mid, 1); moveTo(pts, base, cargo[i], exFrom(i), mid, 1); moveTo(pts, base, cd47[i], exFrom(i), mid, 1); }); setAlpha(alpha, mac, 1); setAlpha(alpha, macX, clamp(u * 3 - 2) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, tumour, 0.5); setAlpha(alpha, kras, 0.5); return { caption: "2 · Surface CD47 tells macrophages not to eat them, so they circulate long, poorly cleared by the immune system, and cross barriers that liposomes struggle with" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, mac, 0.6); setAlpha(alpha, macX, 0.6); exos.forEach((e, i) => { const k = clamp(u * 1.3 - 0.08 * i); const from: Vec3 = [MAC[0], MAC[1] - 0.6, 0.3]; const to = exTo(i); moveTo(pts, base, e, exFrom(i), lerp3(from, to, k), 1); moveTo(pts, base, cargo[i], exFrom(i), lerp3(from, to, k), 1); moveTo(pts, base, cd47[i], exFrom(i), lerp3(from, to, k), 1); setAlpha(alpha, e, 1 - 0.6 * clamp(k * 3 - 2)); setAlpha(alpha, cd47[i], 1 - clamp(k * 3 - 2)); }); setAlpha(alpha, tumour, 1); setAlpha(alpha, kras, 1 - 0.7 * clamp(u * 2 - 1)); setAlpha(alpha, krasX, clamp(u * 2 - 1)); return { caption: "3 · Inside the pancreatic cancer cell the siRNA silences KRAS G12D; this construct is in a phase 1 at MD Anderson (NCT03608631)" }; }
    const u = Q(t, 3); setAlpha(alpha, mac, 0.6); setAlpha(alpha, macX, 0.6); exos.forEach((e, i) => { moveTo(pts, base, e, exFrom(i), exTo(i), 1); moveTo(pts, base, cargo[i], exFrom(i), exTo(i), 1); moveTo(pts, base, cd47[i], exFrom(i), exTo(i), 1); setAlpha(alpha, e, 0.4); setAlpha(alpha, cd47[i], 0); }); setAlpha(alpha, kras, 0.3); setAlpha(alpha, krasX, 1);
    show(alpha, 0.35 + 0.65 * u, liver, spleen); lost.forEach((l, i) => { setAlpha(alpha, l, clamp(u * 2 - 0.2 * i)); moveTo(pts, base, l, [D[0] + 0.55, D[1], 0.2], i < 2 ? [0.0 + 0.3 * i, -1.35, 0.3] : [1.3, -1.4, 0.25], clamp(u * 1.5 - 0.2 * i)); });
    return { caption: "4 · Manufacturing consistency, low and variable loading per particle and a biodistribution that still favours liver and spleen are the barriers; no exosome therapeutic has been approved" };
  });
}

// ---------------------------------------------------------------- 18. histology automation and IHC autostainers
export function ihcAutostainers(): Mesh {
  const sc = scene();
  const M: Vec3 = [0.3, 0.2, 0];
  const machine = put(sc, "machine", box(2.2, 1.3, 1.0, "accent", true), { at: M });
  put(sc, "tray", box(1.8, 0.08, 0.6, "soft", true), { at: [M[0], M[1] - 0.45, 0.25] });
  const rail = put(sc, "rail", line([-2.5, M[1] - 0.4, 0.55], [M[0] + 0.8, M[1] - 0.4, 0.55], "soft"));
  const block = put(sc, "block", box(0.4, 0.3, 0.3, "soft", true), { at: [-2.5, 1.2, 0.3] });
  const blade = put(sc, "blade", polyline([[-2.9, 0.75, 0.3], [-2.1, 0.75, 0.3]], "soft"));
  const slides: Part[] = []; for (let i = 0; i < 3; i++) slides.push(put(sc, `sl${i}`, quad(0.5, 0.22, "soft"), { at: [-2.5, M[1] - 0.35, 0.55 + 0.01 * i], rotX: Math.PI / 2 }));
  const barcode = put(sc, "bc", ticks(-0.15, 0.15, 0, 5, "accent"), { at: [-2.5, M[1] - 0.34, 0.75] });
  const arm = put(sc, "arm", polyline([[M[0] - 0.6, M[1] + 0.9, 0.55], [M[0] - 0.6, M[1] + 0.3, 0.55], [M[0] - 0.4, M[1] + 0.3, 0.55]], "accent"));
  const drops: Part[] = []; for (let i = 0; i < 3; i++) drops.push(put(sc, `dr${i}`, octahedron(0.06, "hot", true), { at: [M[0] - 0.4, M[1] + 0.2, 0.55] }));
  const stain: Part[] = []; for (let i = 0; i < 3; i++) stain.push(put(sc, `st${i}`, dots([[-0.12, 0, 0.02], [0.05, 0.05, 0.02], [0.14, -0.04, 0.02], [-0.02, -0.06, 0.02]], "hot"), { at: [M[0] - 0.6 + 0.5 * i, M[1] - 0.34, 0.56] }));
  const control = put(sc, "ctrl", small(0.06, "accent"), { at: [M[0] + 0.85, M[1] - 0.34, 0.58] });
  const lock = put(sc, "lock", ring(0.2, 10, "accent", "z"), { at: [M[0] + 0.7, M[1] + 0.35, 0.51] });
  const lockBar = put(sc, "lockBar", polyline([[M[0] + 0.58, M[1] + 0.35, 0.52], [M[0] + 0.58, M[1] + 0.55, 0.52], [M[0] + 0.82, M[1] + 0.55, 0.52], [M[0] + 0.82, M[1] + 0.35, 0.52]], "accent"));
  const vendors: Part[] = []; for (let i = 0; i < 3; i++) vendors.push(put(sc, `vd${i}`, vial(0.1, 0.3, i === 0 ? "accent" : "soft"), { at: [-1.6 + 0.35 * i, -1.35, 0] }));
  const vendX = put(sc, "vendX", cross([-1.05, -1.35, 0.15], 0.18));
  sc.mesh.labels = [L([M[0], M[1] + 1.1, 0], "IHC/ISH autostainer, barcode-driven protocols"), L([-2.5, 1.75, 0.3], "Processor, embedding, microtome"), L([M[0] + 1.1, M[1] - 0.95, 0.5], "On-board control"), L([-1.25, -1.85, 0], "Reagents locked to one platform")];
  const base = sc.mesh.points;
  const slideX = (i: number, u: number) => -2.5 + (M[0] - 0.6 + 0.5 * i + 2.5) * u;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...drops, ...stain, control, lock, lockBar, ...vendors, vendX);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, rail, 0.6); setAlpha(alpha, block, 1 - 0.5 * u); movePart(pts, base, blade, [0, -0.35 * Math.abs(Math.sin(t * TAU * 4)) * clamp(u * 2), 0], 1); slides.forEach((sl, i) => { const v = clamp(u * 3 - 1 - 0.3 * i); setAlpha(alpha, sl, clamp(u * 3 - 0.3 * i)); moveTo(pts, base, sl, [-2.5, M[1] - 0.35, 0.55], [slideX(i, v), M[1] - 0.35, 0.55], 1); }); setAlpha(alpha, barcode, clamp(u * 3 - 1)); movePart(pts, base, barcode, [slideX(0, clamp(u * 3 - 1)) + 2.5, 0, 0], 1); setAlpha(alpha, machine, 0.6); return { caption: "1 · Tissue processors, embedding stations and microtomes turn the block into sections; barcoded cassettes and slides carry the identity so nothing is mislabelled" }; }
    if (s === 1) { const u = Q(t, 1); slides.forEach((sl, i) => moveTo(pts, base, sl, [-2.5, M[1] - 0.35, 0.55], [slideX(i, 1), M[1] - 0.35, 0.55], 1)); movePart(pts, base, barcode, [slideX(0, 1) + 2.5, 0, 0], 1); setAlpha(alpha, machine, 1); const k = Math.min(2, Math.floor(u * 3)); movePart(pts, base, arm, [0.5 * k, -0.15 * Math.abs(Math.sin(u * 3 * Math.PI)), 0], 1); drops.forEach((d, i) => { const v = (t * 6 + i / 3) % 1; setAlpha(alpha, d, 1 - v); movePart(pts, base, d, [0.5 * k, -0.45 * v, 0], 1); }); stain.forEach((st, i) => setAlpha(alpha, st, clamp(u * 3 - i) * 0.6)); return { caption: "2 · The autostainer (VENTANA BenchMark ULTRA, Leica BOND, Dako Omnis, Tissue-Tek Genie) dispenses antibody and detection chemistry slide by slide under a locked protocol" }; }
    if (s === 2) { const u = Q(t, 2); slides.forEach((sl, i) => moveTo(pts, base, sl, [-2.5, M[1] - 0.35, 0.55], [slideX(i, 1), M[1] - 0.35, 0.55], 1)); movePart(pts, base, barcode, [slideX(0, 1) + 2.5, 0, 0], 1); movePart(pts, base, arm, [1.0, 0, 0], 1); show(alpha, 1, ...stain); setAlpha(alpha, control, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 5))); setAlpha(alpha, lock, clamp(u * 2 - 0.5)); grow(alpha, lockBar, clamp(u * 2 - 0.8)); return { caption: "3 · Every slide gets the same incubation and detection; an on-board control confirms the run, so HER2 and PD-L1 read the same way in every lab that runs the approved companion assay" }; }
    const u = Q(t, 3); slides.forEach((sl, i) => moveTo(pts, base, sl, [-2.5, M[1] - 0.35, 0.55], [slideX(i, 1), M[1] - 0.35, 0.55], 1)); movePart(pts, base, barcode, [slideX(0, 1) + 2.5, 0, 0], 1); movePart(pts, base, arm, [1.0, 0, 0], 1); show(alpha, 1, ...stain, control, lock, lockBar);
    vendors.forEach((v, i) => setAlpha(alpha, v, clamp(u * 3 - i))); setAlpha(alpha, vendX, clamp(u * 3 - 2) * (0.6 + 0.4 * pulse(t, 4)));
    return { caption: "4 · The price of reproducibility is lock-in: platform, antibody clone and scoring guide are label-specific, assays are not interchangeable across vendors, and the capital cost shuts out small labs" };
  });
}

// ---------------------------------------------------------------- 19. honey for radiation mucositis
export function honeyRadiationMucositis(): Mesh {
  const sc = scene();
  const slab = put(sc, "slab", quad(3.0, 0.5, "soft"), { at: [-0.4, -0.75, 0], rotX: Math.PI / 2 });
  const cells: Part[] = []; for (let i = 0; i < 6; i++) cells.push(put(sc, `c${i}`, sphere(0.2, 3, 8, "soft", true), { at: [-1.65 + 0.5 * i, -0.5, 0] }));
  const beam = put(sc, "beam", cone(0.55, 1.5, 10, "hot", false), { at: [-0.4, 0.75, 0] });
  const ulcers: Part[] = []; for (let i = 0; i < 6; i++) ulcers.push(put(sc, `u${i}`, ring(0.24, 8, "hot", "z"), { at: [-1.65 + 0.5 * i, -0.5, 0] }));
  const JAR: Vec3 = [2.1, 0.9, 0];
  const jar = put(sc, "jar", cylinder(0.3, 0.55, 10, 2, "accent", true, true), { at: JAR });
  put(sc, "lid", disc(0.32, 10, "accent", "y"), { at: [JAR[0], JAR[1] + 0.3, 0] });
  const spoon = put(sc, "spoon", polyline([[JAR[0] - 0.1, JAR[1] + 0.6, 0.2], [JAR[0] - 0.55, JAR[1] + 1.05, 0.2]], "soft"));
  const coat = put(sc, "coat", quad(3.1, 0.55, "accent"), { at: [-0.4, -0.27, 0], rotX: Math.PI / 2 });
  const pour: Part[] = []; for (let i = 0; i < 4; i++) pour.push(put(sc, `p${i}`, octahedron(0.07, "accent", true), { at: [JAR[0] - 0.3, JAR[1] + 0.3, 0.2] }));
  const guide = put(sc, "guide", doc(0.7, 0.8, 3, "soft"), { at: [2.2, -1.1, 0] });
  const dash = put(sc, "dash", line([1.95, -1.1, 0.1], [2.45, -1.1, 0.1], "hot"));
  const tooth = put(sc, "tooth", polyline([[-2.6, -1.35, 0], [-2.5, -1.05, 0], [-2.35, -1.2, 0], [-2.2, -1.05, 0], [-2.1, -1.35, 0]], "soft", true));
  const sugar = put(sc, "sugar", dots([[-2.45, -1.15, 0.1], [-2.3, -1.25, 0.1], [-2.2, -1.12, 0.1]], "hot"));
  sc.mesh.labels = [L([-0.4, -1.25, 0], "Oral mucosa under head and neck radiotherapy"), L([JAR[0], JAR[1] + 1.3, 0], "Honey swallowed before and after each fraction"), L([2.2, -1.7, 0], "MASCC/ISOO 2020: no guideline possible"), L([-2.35, -1.75, 0], "Sugar load: caries, diabetes")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...ulcers, coat, ...pour, guide, dash, tooth, sugar);
    setAlpha(alpha, slab, 0.7);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, beam, u * (0.5 + 0.5 * pulse(t, 8))); ulcers.forEach((d, i) => setAlpha(alpha, d, clamp(u * 6 - i) * pulse(t + i * 0.05, 5))); setAlpha(alpha, jar, 0.4); setAlpha(alpha, spoon, 0.4); return { caption: "1 · Head and neck radiotherapy injures the fast-dividing mouth lining fraction by fraction; standard prevention is oral care, photobiomodulation and, for some regimens, oral cryotherapy or palifermin" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, beam, 0.3); show(alpha, 0.8, ...ulcers); setAlpha(alpha, jar, 1); setAlpha(alpha, spoon, 1); movePart(pts, base, spoon, [0, 0.15 * Math.sin(t * TAU * 3), 0], 1); pour.forEach((p, i) => { const v = (t * 4 + i / 4) % 1; setAlpha(alpha, p, 1 - v); moveTo(pts, base, p, [JAR[0] - 0.3, JAR[1] + 0.3, 0.2], [JAR[0] - 1.6 - 0.8 * i, -0.2, 0.2], v); }); setAlpha(alpha, coat, u * 0.6); return { caption: "2 · Patients swallow or apply honey around each session: it coats the mucosa, and its osmotic antibacterial and anti-inflammatory phenolic effects may limit injury and secondary infection" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, beam, 0.2); setAlpha(alpha, coat, 0.6); ulcers.forEach((d, i) => setAlpha(alpha, d, 0.8 * (1 - clamp(u * 6 - i)))); cells.forEach((c) => setAlpha(alpha, c, 0.7 + 0.3 * u)); setAlpha(alpha, jar, 1); setAlpha(alpha, spoon, 1); return { caption: "3 · Small randomised trials, largely from single centres in Asia and the Middle East, report less severe oral mucositis and, in some, less weight loss" }; }
    const u = Q(t, 3); setAlpha(alpha, beam, 0.2); setAlpha(alpha, coat, 0.5); hide(alpha, ...ulcers); setAlpha(alpha, jar, 0.7); setAlpha(alpha, spoon, 0.7);
    setAlpha(alpha, guide, clamp(u * 2)); setAlpha(alpha, dash, clamp(u * 2 - 0.5) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, tooth, clamp(u * 2 - 1)); setAlpha(alpha, sugar, clamp(u * 2 - 1));
    return { caption: "4 · The 2020 MASCC/ISOO guideline found the studies too inconsistent and low in quality to recommend for or against; honey is cheap and safe in adults but is avoided in infants and used with care in diabetes and severe dental disease" };
  });
}

// ---------------------------------------------------------------- 20. hydrazine sulfate
export function hydrazineSulfate(): Mesh {
  const sc = scene();
  const P: Vec3 = [-1.8, 0.0, 0];
  const patient = put(sc, "patient", figure("soft"), { at: P });
  const tumour = put(sc, "tumour", blob(0.22, "hot"), { at: [P[0] + 0.1, P[1] + 0.25, 0.15] });
  const LIV: Vec3 = [0.3, 0.9, 0];
  const liver = put(sc, "liver", organ(0.7, 0.42, 0.35), { at: LIV });
  const glu: Part[] = []; for (let i = 0; i < 4; i++) glu.push(put(sc, `g${i}`, octahedron(0.07, "accent"), { at: [LIV[0] + 0.2 - 0.15 * i, LIV[1] - 0.1, 0.4] }));
  const path = put(sc, "path", arrow([LIV[0] - 0.75, LIV[1], 0.2], [P[0] + 0.5, P[1] + 0.3, 0.2], "accent"));
  const cap = put(sc, "cap", capsule(1.2, "accent"), { at: [1.9, 1.6, 0] });
  const block = put(sc, "block", cross([LIV[0] - 0.3, LIV[1] + 0.05, 0.45], 0.18));
  const trials: Part[] = []; for (let i = 0; i < 3; i++) trials.push(put(sc, `tr${i}`, doc(0.55, 0.65, 3, "soft"), { at: [0.6 + 0.75 * i, -0.5, 0] }));
  const w0 = put(sc, "w0", bar(0.55, 0.8, 0.22, "soft"), { at: [0, -1.9, 0] });
  const w1 = put(sc, "w1", bar(0.85, 0.8, 0.22, "soft"), { at: [0, -1.9, 0] });
  const s0 = put(sc, "s0", bar(1.45, 0.7, 0.22, "soft"), { at: [0, -1.9, 0] });
  const s1 = put(sc, "s1", bar(1.75, 0.7, 0.22, "soft"), { at: [0, -1.9, 0] });
  const nerve = put(sc, "nerve", polyline([[P[0] - 0.9, P[1] - 1.1, 0], [P[0] - 0.6, P[1] - 0.95, 0], [P[0] - 0.3, P[1] - 1.1, 0], [P[0], P[1] - 0.95, 0]], "hot"));
  const tox: Part[] = []; for (let i = 0; i < 2; i++) tox.push(put(sc, `tx${i}`, ring(0.5 + 0.12 * i, 10, "hot", "z"), { at: LIV }));
  const warn = put(sc, "warn", polyline([[2.2, -1.5, 0], [2.7, -1.5, 0], [2.45, -1.05, 0]], "hot", true));
  const warnDot = put(sc, "warnDot", dots([[2.45, -1.28, 0.02]], "hot"));
  sc.mesh.labels = [L([P[0], P[1] + 1.3, 0], "Cancer weight loss"), L([LIV[0], LIV[1] + 0.75, 0], "Claimed: block hepatic gluconeogenesis (PEPCK)"), L([1.35, -2.3, 0], "Three NCI trials, more than 600 patients: no benefit"), L([2.45, -1.85, 0], "Suspected carcinogen")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, block, ...trials, w0, w1, s0, s1, nerve, ...tox, warn, warnDot);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, tumour, 0.6 + 0.4 * pulse(t, 5)); glu.forEach((g, i) => { const v = (t * 3 + i / 4) % 1; setAlpha(alpha, g, 1 - v); moveTo(pts, base, g, [LIV[0] + 0.2 - 0.15 * i, LIV[1] - 0.1, 0.4], [P[0] + 0.1, P[1] + 0.25, 0.4], v); }); grow(alpha, path, clamp(u * 2)); movePart(pts, base, patient, [0, 0, 0], 1 - 0.1 * u); setAlpha(alpha, cap, 0.4); return { caption: "1 · The 1970s claim: the liver's gluconeogenesis feeds the tumour and wastes the patient, so blocking phosphoenolpyruvate carboxykinase should starve the cancer and preserve weight" }; }
    if (s === 1) { const u = Q(t, 1); movePart(pts, base, patient, [0, 0, 0], 0.9); setAlpha(alpha, cap, 1); moveTo(pts, base, cap, [1.9, 1.6, 0], [LIV[0] + 0.1, LIV[1] + 0.1, 0.45], clamp(u * 1.5)); setAlpha(alpha, block, clamp(u * 2 - 1)); glu.forEach((g) => setAlpha(alpha, g, 0.6 * (1 - clamp(u * 2 - 1)))); setAlpha(alpha, path, 1 - 0.6 * clamp(u * 2 - 1)); return { caption: "2 · Hydrazine sulfate was promoted on the basis of small Russian and American reports, generating lasting demand through the 1980s" }; }
    if (s === 2) { const u = Q(t, 2); movePart(pts, base, patient, [0, 0, 0], 0.9); setAlpha(alpha, cap, 1); moveTo(pts, base, cap, [1.9, 1.6, 0], [LIV[0] + 0.1, LIV[1] + 0.1, 0.45], 1); setAlpha(alpha, block, 1); setAlpha(alpha, path, 0.4); cascade(alpha, trials, clamp(u * 1.5)); show(alpha, clamp(u * 2 - 1), w0, w1, s0, s1); return { caption: "3 · Three randomised placebo-controlled NCI trials in the early 1990s, in non-small-cell lung and colorectal cancer with more than 600 patients, found no gain in survival, weight or quality of life, and one found worse quality of life" }; }
    const u = Q(t, 3); movePart(pts, base, patient, [0, 0, 0], 0.9); setAlpha(alpha, cap, 0.7); moveTo(pts, base, cap, [1.9, 1.6, 0], [LIV[0] + 0.1, LIV[1] + 0.1, 0.45], 1); setAlpha(alpha, block, 0.7); setAlpha(alpha, path, 0.4); show(alpha, 0.7, ...trials, w0, w1, s0, s1);
    grow(alpha, nerve, clamp(u * 2)); setAlpha(alpha, liver, 0.6 + 0.4 * pulse(t, 4)); tox.forEach((r, i) => setAlpha(alpha, r, clamp(u * 2 - 0.3 * i) * pulse(t, 4) * 0.8)); setAlpha(alpha, warn, clamp(u * 2 - 1)); setAlpha(alpha, warnDot, clamp(u * 2 - 1));
    return { caption: "4 · Neurotoxicity and hepatorenal toxicity occurred, hydrazine is a known animal carcinogen, and the NCI PDQ summary concludes there is no evidence of benefit" };
  });
}

// ---------------------------------------------------------------- 21. nuclear medicine and total-body PET hardware
export function nuclearMedicineHardware(): Mesh {
  const sc = scene();
  const G: Vec3 = [-0.9, 0.2, 0];
  const gantry = put(sc, "gantry", torus(1.0, 0.16, 14, 5, "accent", true), { at: G, rotY: Math.PI / 2 });
  const bed = put(sc, "bed", box(3.6, 0.1, 0.6, "soft", true), { at: [0.3, G[1] - 0.55, 0] });
  const P0: Vec3 = [1.6, G[1] - 0.2, 0];
  const patient = put(sc, "patient", figure("soft"), { at: P0, rotZ: -Math.PI / 2, scale: 0.8 });
  const fov = put(sc, "fov", box(0.5, 1.5, 1.5, "accent", false), { at: G });
  const long1 = put(sc, "long1", torus(1.0, 0.16, 14, 5, "accent", true), { at: [G[0] + 0.55, G[1], 0], rotY: Math.PI / 2 });
  const long2 = put(sc, "long2", torus(1.0, 0.16, 14, 5, "accent", true), { at: [G[0] + 1.1, G[1], 0], rotY: Math.PI / 2 });
  const long3 = put(sc, "long3", torus(1.0, 0.16, 14, 5, "accent", true), { at: [G[0] + 1.65, G[1], 0], rotY: Math.PI / 2 });
  const fovL = put(sc, "fovL", box(2.2, 1.5, 1.5, "accent", false), { at: [G[0] + 0.8, G[1], 0] });
  const photons: Part[] = []; for (let i = 0; i < 6; i++) photons.push(put(sc, `ph${i}`, line([0, 0, 0], [0, 0.35, 0], "hot"), { at: [P0[0] - 1.6 + 0.6 * i, G[1] - 0.15, 0.1], rotZ: (i % 2 ? 1 : -1) * 0.8 }));
  const s0 = put(sc, "s0", bar(-2.2, 0.15, 0.25, "soft"), { at: [0, -1.85, 0] });
  const s1 = put(sc, "s1", bar(-1.8, 1.2, 0.25, "accent"), { at: [0, -1.85, 0] });
  const ct = put(sc, "ct", ring(1.05, 14, "soft", "x"), { at: [G[0] - 0.45, G[1], 0] });
  const dose = put(sc, "dose", doc(0.6, 0.7, 3, "soft"), { at: [2.3, 1.3, 0] });
  const cost = put(sc, "cost", polyline([[1.9, -1.5, 0], [2.7, -1.5, 0], [2.7, -0.9, 0], [1.9, -0.9, 0]], "hot", true));
  sc.mesh.labels = [L([G[0], G[1] + 1.55, 0], "SiPM detector rings with time-of-flight"), L([0.3, G[1] - 1.05, 0], "Standard PET/CT: the bed steps through a short ring"), L([-2.0, -2.2, 0], "Long axial field: sensitivity roughly 40-fold"), L([2.3, -1.85, 0], "Total-body system: more than $10M")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, long1, long2, long3, fovL, s0, s1, dose, cost);
    setAlpha(alpha, ct, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, fov, 0.6 + 0.4 * pulse(t, 5)); photons.forEach((p, i) => setAlpha(alpha, p, (0.4 + 0.6 * pulse(t + i * 0.13, 6)) * (Math.abs(P0[0] - 1.6 + 0.6 * i - G[0]) < 0.35 ? 1 : 0.15))); setAlpha(alpha, bed, 0.7); setAlpha(alpha, gantry, 0.6 + 0.4 * clamp(u * 2)); return { caption: "1 · Silicon photomultiplier rings with time-of-flight timing catch pairs of annihilation photons; the CT ring beside them supplies attenuation correction" }; }
    if (s === 1) { const u = Q(t, 1); const shift = -2.6 * u; movePart(pts, base, patient, [shift, 0, 0], 1); photons.forEach((p, i) => { movePart(pts, base, p, [shift, 0, 0], 1); const x = P0[0] - 1.6 + 0.6 * i + shift; setAlpha(alpha, p, Math.abs(x - G[0]) < 0.35 ? 0.4 + 0.6 * pulse(t, 6) : 0.15); }); setAlpha(alpha, fov, 0.8); return { caption: "2 · A conventional scanner covers only a short axial length, so the bed steps the patient through several positions, each collecting for minutes" }; }
    if (s === 2) { const u = Q(t, 2); movePart(pts, base, patient, [-2.6 * (1 - u), 0, 0], 1); photons.forEach((p, i) => { movePart(pts, base, p, [-2.6 * (1 - u), 0, 0], 1); setAlpha(alpha, p, 0.15 + 0.85 * u * (0.4 + 0.6 * pulse(t + i * 0.13, 6))); }); setAlpha(alpha, fov, 1 - u); setAlpha(alpha, long1, clamp(u * 3)); setAlpha(alpha, long2, clamp(u * 3 - 1)); setAlpha(alpha, long3, clamp(u * 3 - 2)); setAlpha(alpha, fovL, clamp(u * 3 - 2) * 0.8); return { caption: "3 · Total-body and long-axial-field-of-view PET (uEXPLORER, Biograph Vision Quadra, Omni Legend) capture the whole body in one bed position" }; }
    const u = Q(t, 3); photons.forEach((p, i) => setAlpha(alpha, p, 0.4 + 0.6 * pulse(t + i * 0.13, 6))); setAlpha(alpha, fov, 0); show(alpha, 1, long1, long2, long3); setAlpha(alpha, fovL, 0.8);
    setAlpha(alpha, s0, clamp(u * 2)); setAlpha(alpha, s1, clamp(u * 2 - 0.5)); setAlpha(alpha, dose, clamp(u * 2 - 1)); setAlpha(alpha, cost, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4)));
    return { caption: "4 · Sensitivity rises roughly 40-fold, enabling low-dose, dynamic and multi-tracer studies and SPECT/CT-grade dosimetry for radioligand therapy; the capital cost exceeds $10M and reimbursement is not tied to sensitivity" };
  });
}

// ---------------------------------------------------------------- 22. oncology pharmacy automation and compounding robots
export function pharmacyAutomation(): Mesh {
  const sc = scene();
  const ISO: Vec3 = [0.2, 0.3, 0];
  const iso = put(sc, "iso", box(2.4, 1.6, 1.2, "accent", true), { at: ISO });
  const arm = put(sc, "arm", polyline([[ISO[0] - 0.9, ISO[1] + 0.6, 0.2], [ISO[0] - 0.9, ISO[1] + 0.1, 0.2], [ISO[0] - 0.5, ISO[1] + 0.1, 0.2], [ISO[0] - 0.5, ISO[1] - 0.2, 0.2]], "soft"));
  const vialP = put(sc, "vial", vial(0.14, 0.4, "hot"), { at: [ISO[0] - 0.5, ISO[1] - 0.45, 0.2] });
  const syr = put(sc, "syr", syringe(0.55, "soft"), { at: [ISO[0] + 0.3, ISO[1] - 0.55, 0.3] });
  const bag = put(sc, "bag", box(0.45, 0.6, 0.2, "soft", true), { at: [ISO[0] + 0.85, ISO[1] - 0.3, 0.3] });
  const fill = put(sc, "fill", quad(0.35, 0.3, "hot"), { at: [ISO[0] + 0.85, ISO[1] - 0.4, 0.42] });
  const scale = put(sc, "scale", box(0.6, 0.08, 0.4, "accent", true), { at: [ISO[0] + 0.85, ISO[1] - 0.68, 0.3] });
  const readout = put(sc, "readout", ticks(-0.2, 0.2, 0, 3, "accent"), { at: [ISO[0] + 0.85, ISO[1] + 0.45, 0.62] });
  const bc = put(sc, "bc", ticks(-0.15, 0.15, 0, 6, "accent"), { at: [ISO[0] - 0.5, ISO[1] - 0.9, 0.35] });
  const beam = put(sc, "beam", line([ISO[0] - 0.5, ISO[1] - 0.6, 0.6], [ISO[0] - 0.5, ISO[1] - 0.9, 0.6], "hot"));
  const cstd = put(sc, "cstd", ring(0.16, 8, "accent", "y"), { at: [ISO[0] - 0.5, ISO[1] - 0.2, 0.2] });
  const flow: Part[] = []; for (let i = 0; i < 3; i++) flow.push(put(sc, `fl${i}`, arrow([ISO[0] - 1.0 + 1.0 * i, ISO[1] + 1.05, 0], [ISO[0] - 1.0 + 1.0 * i, ISO[1] + 0.8, 0], "accent", 0.1)));
  const pharm = put(sc, "pharm", figure("soft"), { at: [-2.3, -0.2, 0.3], scale: 0.9 });
  const shieldRing = put(sc, "shield", ring(0.9, 14, "accent", "z"), { at: [-2.3, -0.2, 0.3] });
  const vapours = put(sc, "vap", cloud(6, 0.6, "hot", 4), { at: [ISO[0] - 0.2, ISO[1] + 0.2, 0.3] });
  const err0 = put(sc, "err0", bar(1.95, 0.9, 0.22, "hot"), { at: [0, -1.85, 0] });
  const err1 = put(sc, "err1", bar(2.3, 0.3, 0.22, "accent"), { at: [0, -1.85, 0] });
  const uneven = put(sc, "uneven", building(0.6, 0.5, "soft"), { at: [-1.6, -1.55, 0] });
  const unevenX = put(sc, "unevenX", cross([-1.6, -1.55, 0.3], 0.18));
  sc.mesh.labels = [L([ISO[0], ISO[1] + 1.35, 0], "Negative-pressure isolator or robot (USP 800)"), L([-2.3, -1.3, 0.3], "Pharmacist outside the closed system"), L([ISO[0] + 0.85, ISO[1] - 1.15, 0.3], "Gravimetric check of every dose"), L([2.1, -2.2, 0], "Fewer dosing errors; uneven adoption outside big centres")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, fill, readout, bc, beam, cstd, ...flow, shieldRing, err0, err1, uneven, unevenX);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, iso, 0.6); setAlpha(alpha, vapours, (0.3 + 0.7 * pulse(t, 4)) * (1 - 0.8 * u)); movePart(pts, base, vapours, [0, 0.3 * ((t * 3) % 1), 0], 1); flow.forEach((f, i) => { const v = (t * 3 + i / 3) % 1; setAlpha(alpha, f, clamp(u * 2 - 0.5) * (1 - v)); movePart(pts, base, f, [0, -0.3 * v, 0], 1); }); setAlpha(alpha, shieldRing, clamp(u * 2 - 1) * 0.7); setAlpha(alpha, pharm, 1); return { caption: "1 · Cytotoxics are handled inside a negative-pressure isolator or robot cell that meets USP 800 hazardous-drug rules, so the pharmacist outside is never exposed" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, iso, 0.6); setAlpha(alpha, vapours, 0.05); show(alpha, 0.5, ...flow, shieldRing); setAlpha(alpha, beam, clamp(u * 3) * (1 - clamp(u * 3 - 1)) * pulse(t, 10)); setAlpha(alpha, bc, clamp(u * 3)); setAlpha(alpha, cstd, clamp(u * 3 - 1)); movePart(pts, base, arm, [0, -0.2 * clamp(u * 3 - 1), 0], 1); setAlpha(alpha, vialP, 1); return { caption: "2 · A barcode scan reconciles the vial against the order; a closed-system transfer device (PhaSeal, Equashield, ChemoLock) seals the withdrawal" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, iso, 0.6); setAlpha(alpha, vapours, 0.05); show(alpha, 0.5, ...flow, shieldRing, bc); setAlpha(alpha, cstd, 1); movePart(pts, base, arm, [1.35 * clamp(u * 2), -0.2, 0], 1); moveTo(pts, base, syr, [ISO[0] + 0.3, ISO[1] - 0.55, 0.3], [ISO[0] + 0.85, ISO[1] - 0.1, 0.45], clamp(u * 2)); setAlpha(alpha, fill, clamp(u * 2 - 1)); movePart(pts, base, fill, [0, 0, 0], 0.3 + 0.7 * clamp(u * 2 - 1)); setAlpha(alpha, readout, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 5))); setAlpha(alpha, scale, 1); return { caption: "3 · The robot (APOTECAchemo, RIVA, IV Station, BD Cato workflow) draws up and injects the dose into the bag while a balance verifies the mass gravimetrically" }; }
    const u = Q(t, 3); setAlpha(alpha, iso, 0.6); setAlpha(alpha, vapours, 0.05); show(alpha, 0.5, ...flow, shieldRing, bc, cstd); movePart(pts, base, arm, [1.35, -0.2, 0], 1); moveTo(pts, base, syr, [ISO[0] + 0.3, ISO[1] - 0.55, 0.3], [ISO[0] + 0.85, ISO[1] - 0.1, 0.45], 1); setAlpha(alpha, fill, 1); setAlpha(alpha, readout, 1); setAlpha(alpha, bag, 1);
    setAlpha(alpha, err0, clamp(u * 2)); setAlpha(alpha, err1, clamp(u * 2 - 0.5)); setAlpha(alpha, uneven, clamp(u * 2 - 1) * 0.7); setAlpha(alpha, unevenX, clamp(u * 2 - 1));
    return { caption: "4 · Gravimetric verification and barcode workflows cut dosing errors and give traceability; capital cost, throughput and EHR order-set integration keep adoption uneven outside large centres" };
  });
}

// ---------------------------------------------------------------- 23. partial nephrectomy, ablation and active surveillance of small renal masses
export function partialNephrectomy(): Mesh {
  const sc = scene();
  const K: Vec3 = [-1.0, 0.1, 0];
  const kidney = put(sc, "kidney", organ(0.7, 1.05, 0.5), { at: K });
  put(sc, "hilum", ellipsoid(0.2, 0.4, 0.2, 3, 8, "soft", true), { at: [K[0] + 0.55, K[1], 0] });
  const MASS: Vec3 = [K[0] - 0.45, K[1] + 0.55, 0.3];
  const mass = put(sc, "mass", blob(0.22), { at: MASS });
  const ct = put(sc, "ct", ring(1.5, 16, "accent", "z"), { at: K });
  const ruler = put(sc, "ruler", ticks(MASS[0] - 0.22, MASS[0] + 0.22, MASS[1] + 0.45, 3, "accent"));
  const tl = put(sc, "tl", ticks(0.5, 2.6, 1.4, 5, "soft"));
  const ghosts: Part[] = []; for (let i = 0; i < 5; i++) ghosts.push(put(sc, `g${i}`, ring(0.1 + 0.012 * i, 8, "hot", "z"), { at: [0.5 + 0.525 * i, 1.75, 0] }));
  const benign = put(sc, "benign", bar(2.5, 0.5, 0.22, "soft"), { at: [0, 0.3, 0] });
  const probe = put(sc, "probe", polyline([[2.2, 1.0, 0.4], [MASS[0] + 0.15, MASS[1] + 0.1, 0.5]], "accent"));
  const ice: Part[] = []; for (let i = 0; i < 3; i++) ice.push(put(sc, `ice${i}`, ring(0.28 + 0.1 * i, 10, "accent", "z"), { at: MASS }));
  const wedge = put(sc, "wedge", polyline([[MASS[0] - 0.35, MASS[1] - 0.35, 0.3], [MASS[0], MASS[1] + 0.4, 0.3], [MASS[0] + 0.35, MASS[1] - 0.35, 0.3]], "accent"));
  const stitches: Part[] = []; for (let i = 0; i < 3; i++) stitches.push(put(sc, `st${i}`, line([MASS[0] - 0.2 + 0.2 * i, MASS[1] - 0.2, 0.35], [MASS[0] - 0.2 + 0.2 * i, MASS[1] + 0.05, 0.35], "accent")));
  const f0 = put(sc, "f0", bar(1.3, 1.0, 0.25, "accent"), { at: [0, -1.85, 0] });
  const f1 = put(sc, "f1", bar(1.7, 0.55, 0.25, "hot"), { at: [0, -1.85, 0] });
  const radical = put(sc, "radical", organ(0.35, 0.5, 0.25), { at: [2.4, -1.3, 0] });
  const radX = put(sc, "radX", cross([2.4, -1.3, 0.3], 0.3));
  sc.mesh.labels = [L([K[0], K[1] + 1.5, 0], "Small renal mass under 4 cm"), L([1.55, 2.05, 0], "Surveillance: growth triggers action"), L([1.5, -2.2, 0], "Nephrons kept: less CKD and cardiovascular death"), L([2.4, -0.55, 0], "20-30% are benign or indolent")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ruler, tl, ...ghosts, benign, probe, ...ice, wedge, ...stitches, f0, f1, radical, radX);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, ct, clamp(u * 2) * (0.4 + 0.6 * pulse(t, 4))); movePart(pts, base, ct, [0, 0, 0], 1.3 - 0.3 * clamp(u * 2)); setAlpha(alpha, mass, clamp(u * 2 - 0.5) * (0.6 + 0.4 * pulse(t, 5))); setAlpha(alpha, ruler, clamp(u * 2 - 1)); setAlpha(alpha, benign, clamp(u * 2 - 1)); return { caption: "1 · A scan done for something else shows a small renal mass under 4 cm; 20-30% of these are benign or indolent, and most grow slowly" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, ct, 0.3); show(alpha, 0.6, ruler, benign); setAlpha(alpha, tl, 1); ghosts.forEach((g, i) => { setAlpha(alpha, g, clamp(u * 5 - i)); movePart(pts, base, g, [0, 0, 0], 1 + 0.15 * i); }); return { caption: "2 · Active surveillance (DISSRM, the Canadian registry) tracks the mass on serial imaging; metastatic risk is low and intervention is triggered by growth" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, ct, 0.3); show(alpha, 0.5, ruler, benign, tl, ...ghosts); ghosts.forEach((g, i) => movePart(pts, base, g, [0, 0, 0], 1 + 0.15 * i)); if (u < 0.5) { const v = u * 2; grow(alpha, probe, v); ice.forEach((r, i) => setAlpha(alpha, r, clamp(v * 3 - i) * pulse(t, 5))); } else { const v = (u - 0.5) * 2; setAlpha(alpha, probe, 0.3); show(alpha, 0.3, ...ice); grow(alpha, wedge, clamp(v * 2)); stitches.forEach((st, i) => setAlpha(alpha, st, clamp(v * 3 - 1 - 0.3 * i))); setAlpha(alpha, mass, 1 - 0.8 * clamp(v * 2 - 0.5)); movePart(pts, base, mass, [0, 0, 0], 1 - 0.6 * clamp(v * 2 - 0.5)); } return { caption: "3 · Percutaneous cryoablation or microwave ablation suits comorbid patients; for T1 tumours the preferred operation is robotic partial nephrectomy, removing the tumour and keeping the kidney" }; }
    const u = Q(t, 3); setAlpha(alpha, ct, 0.3); show(alpha, 0.5, ruler, benign, tl, ...ghosts, probe, ...ice, wedge, ...stitches); ghosts.forEach((g, i) => movePart(pts, base, g, [0, 0, 0], 1 + 0.15 * i)); setAlpha(alpha, mass, 0.2); movePart(pts, base, mass, [0, 0, 0], 0.4); setAlpha(alpha, kidney, 1);
    setAlpha(alpha, f0, clamp(u * 2)); setAlpha(alpha, f1, clamp(u * 2 - 0.5)); setAlpha(alpha, radical, clamp(u * 2 - 1) * 0.6); setAlpha(alpha, radX, clamp(u * 2 - 1));
    return { caption: "4 · Nephron preservation lowers chronic kidney disease and cardiovascular mortality; radical nephrectomy is reserved for larger or central tumours, and renal mass biopsy and SBRT (FASTRACK II) are growing roles" };
  });
}

// ---------------------------------------------------------------- 24. pre-analytics: blood-collection tubes and tissue fixation
export function preanalyticsStabilisation(): Mesh {
  const sc = scene();
  const TA: Vec3 = [-1.9, 0.3, 0], TB: Vec3 = [-0.7, 0.3, 0];
  const tubeA = put(sc, "tubeA", vial(0.28, 1.5, "soft"), { at: TA });
  const tubeB = put(sc, "tubeB", vial(0.28, 1.5, "accent"), { at: TB });
  const wbcA: Part[] = []; for (let i = 0; i < 4; i++) wbcA.push(put(sc, `wa${i}`, sphere(0.09, 3, 8, "soft", true), { at: [TA[0] - 0.1 + 0.1 * (i % 2), TA[1] - 0.5 + 0.3 * i, 0.1] }));
  const wbcB: Part[] = []; for (let i = 0; i < 4; i++) wbcB.push(put(sc, `wb${i}`, sphere(0.09, 3, 8, "accent", true), { at: [TB[0] - 0.1 + 0.1 * (i % 2), TB[1] - 0.5 + 0.3 * i, 0.1] }));
  const ctA: Part[] = []; for (let i = 0; i < 3; i++) ctA.push(put(sc, `ca${i}`, helix(0.04, 0.12, 1.5, 8, "hot"), { at: [TA[0] + 0.12, TA[1] - 0.4 + 0.35 * i, 0.15] }));
  const ctB: Part[] = []; for (let i = 0; i < 3; i++) ctB.push(put(sc, `cb${i}`, helix(0.04, 0.12, 1.5, 8, "hot"), { at: [TB[0] + 0.12, TB[1] - 0.4 + 0.35 * i, 0.15] }));
  const flood = put(sc, "flood", cloud(10, 0.3, "soft", 5), { at: [TA[0], TA[1], 0.2] });
  const clock = put(sc, "clock", clockFace(0.3), { at: [-1.3, 1.65, 0] });
  const truck = put(sc, "truck", box(0.6, 0.3, 0.3, "soft", true), { at: [-1.3, -1.3, 0] });
  const ROUTE: Vec3 = [1.2, -1.3, 0];
  const BLK: Vec3 = [1.6, 0.4, 0];
  const bath = put(sc, "bath", box(1.3, 0.9, 0.8, "soft", true), { at: BLK });
  const block = put(sc, "block", box(0.5, 0.3, 0.4, "hot", true), { at: [BLK[0], BLK[1] - 0.15, 0] });
  const xlink: Part[] = []; for (let i = 0; i < 3; i++) xlink.push(put(sc, `xl${i}`, ring(0.3 + 0.1 * i, 10, "accent", "y"), { at: [BLK[0], BLK[1] - 0.15, 0] }));
  const win = put(sc, "win", ticks(0.9, 2.3, 1.55, 4, "soft"));
  const winLo = put(sc, "winLo", line([1.1, 1.4, 0], [1.1, 1.7, 0], "accent"));
  const winHi = put(sc, "winHi", line([2.1, 1.4, 0], [2.1, 1.7, 0], "accent"));
  const slideA = put(sc, "slideA", quad(0.5, 0.25, "accent"), { at: [1.3, -1.0, 0], rotX: Math.PI / 2 });
  const slideB = put(sc, "slideB", quad(0.5, 0.25, "hot"), { at: [2.0, -1.0, 0], rotX: Math.PI / 2 });
  const disc0 = put(sc, "disc0", cross([1.65, -1.0, 0.15], 0.15));
  sc.mesh.labels = [L([-1.3, 2.2, 0], "Plain tube vs cfDNA stabilising tube (Streck, PAXgene, Roche)"), L([-1.3, -1.8, 0], "Room temperature for days"), L([BLK[0], BLK[1] + 0.85, 0], "Formalin fixation: 6-72 hour window (ASCO/CAP)"), L([1.65, -1.55, 0], "Discordant PD-L1 or HER2 result")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, flood, truck, ...xlink, win, winLo, winHi, slideA, slideB, disc0);
    setAlpha(alpha, tubeA, 0.7); setAlpha(alpha, tubeB, 0.7);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, clock, 1); movePart(pts, base, clock, [0, 0, 0], 1, 0); wbcA.forEach((w, i) => { const v = clamp(u * 2 - 0.2 * i); setAlpha(alpha, w, 1 - 0.9 * v); movePart(pts, base, w, [0, 0, 0], 1 + 0.8 * v); }); setAlpha(alpha, flood, clamp(u * 2 - 0.5) * 0.8); ctA.forEach((c) => setAlpha(alpha, c, 1 - 0.7 * clamp(u * 2 - 0.5))); show(alpha, 1, ...wbcB, ...ctB); setAlpha(alpha, bath, 0.4); setAlpha(alpha, block, 0.4); return { caption: "1 · In a plain tube white cells lyse within hours and nucleases wake up: genomic DNA floods the plasma and drowns the few tumour-derived fragments" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, clock, 0.5); show(alpha, 0.1, ...wbcA); wbcA.forEach((w) => movePart(pts, base, w, [0, 0, 0], 1.8)); setAlpha(alpha, flood, 0.8); show(alpha, 0.3, ...ctA); show(alpha, 1, ...wbcB); ctB.forEach((c, i) => setAlpha(alpha, c, 0.6 + 0.4 * pulse(t + i * 0.1, 5))); setAlpha(alpha, tubeB, 0.7 + 0.3 * pulse(t, 4)); setAlpha(alpha, truck, clamp(u * 2)); moveTo(pts, base, truck, [-1.3, -1.3, 0], ROUTE, clamp(u * 1.4)); setAlpha(alpha, bath, 0.4); setAlpha(alpha, block, 0.4); return { caption: "2 · A chemical stabiliser (Streck Cell-Free DNA BCT, PAXgene ccfDNA, Roche Cell-Free DNA Collection Tube) keeps leukocytes intact and nucleases quiet, so ctDNA can travel at room temperature for days to a central lab" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, clock, 0.5); show(alpha, 0.1, ...wbcA); wbcA.forEach((w) => movePart(pts, base, w, [0, 0, 0], 1.8)); setAlpha(alpha, flood, 0.5); show(alpha, 0.3, ...ctA); show(alpha, 0.8, ...wbcB, ...ctB); setAlpha(alpha, truck, 0.5); moveTo(pts, base, truck, [-1.3, -1.3, 0], ROUTE, 1); setAlpha(alpha, bath, 1); setAlpha(alpha, block, 1); xlink.forEach((x, i) => { const v = (t * 4 + i / 3) % 1; setAlpha(alpha, x, u * (1 - v)); movePart(pts, base, x, [0, 0, 0], 0.5 + 0.8 * v); }); setAlpha(alpha, win, clamp(u * 2 - 0.5)); setAlpha(alpha, winLo, clamp(u * 2 - 0.7)); setAlpha(alpha, winHi, clamp(u * 2 - 1)); return { caption: "3 · For tissue, cross-linking formalin fixation preserves morphology and antigens only inside validated windows: ASCO/CAP HER2 and CAP/CLSI guidance set 6-72 hours, and ischaemia time before fixation also counts" }; }
    const u = Q(t, 3); setAlpha(alpha, clock, 0.5); show(alpha, 0.1, ...wbcA); wbcA.forEach((w) => movePart(pts, base, w, [0, 0, 0], 1.8)); setAlpha(alpha, flood, 0.5); show(alpha, 0.3, ...ctA); show(alpha, 0.8, ...wbcB, ...ctB); setAlpha(alpha, truck, 0.5); moveTo(pts, base, truck, [-1.3, -1.3, 0], ROUTE, 1); show(alpha, 0.7, bath, block, win, winLo, winHi); show(alpha, 0.3, ...xlink);
    setAlpha(alpha, slideA, clamp(u * 2)); setAlpha(alpha, slideB, clamp(u * 2 - 0.5)); setAlpha(alpha, disc0, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4)));
    return { caption: "4 · Over- or under-fixation degrades DNA and RNA and shifts IHC scores, so the same tumour can read PD-L1 or HER2 differently in two labs; pre-analytic variability is a major source of discordant biomarker results" };
  });
}

// ---------------------------------------------------------------- 25. sonodynamic therapy
export function sonodynamicTherapy(): Mesh {
  const sc = scene();
  const B: Vec3 = [0.2, 0.1, 0];
  const brain = put(sc, "brain", organ(1.25, 1.0, 0.9), { at: B });
  put(sc, "fissure", polyline([[B[0], B[1] + 0.95, 0.3], [B[0] - 0.1, B[1] + 0.5, 0.6], [B[0], B[1], 0.85]], "soft"));
  const GLI: Vec3 = [B[0] + 0.45, B[1] + 0.15, 0.45];
  const glioma = put(sc, "glioma", blob(0.4), { at: GLI });
  const cap = put(sc, "cap", capsule(1.2, "accent"), { at: [-2.4, 1.2, 0] });
  const ppix: Part[] = []; for (let i = 0; i < 6; i++) ppix.push(put(sc, `pp${i}`, dots([[0, 0, 0]], "accent"), { at: [GLI[0] - 0.25 + 0.1 * i, GLI[1] - 0.2 + 0.08 * (i % 3), GLI[2] + 0.2] }));
  const normalDots: Part[] = []; for (let i = 0; i < 3; i++) normalDots.push(put(sc, `nd${i}`, dots([[0, 0, 0]], "accent"), { at: [B[0] - 0.8 + 0.3 * i, B[1] - 0.3 + 0.2 * (i % 2), 0.6] }));
  const TR: Vec3 = [-1.9, -0.9, 0.3];
  const trans = put(sc, "trans", cylinder(0.35, 0.25, 12, 2, "accent", true, true), { at: TR, rotZ: 0.8 });
  const waves: Part[] = []; for (let i = 0; i < 4; i++) waves.push(put(sc, `wv${i}`, ring(0.15 + 0.12 * i, 10, "accent", "x"), { at: TR, rotZ: 0.8 }));
  const ros: Part[] = []; for (let i = 0; i < 4; i++) ros.push(put(sc, `ros${i}`, ring(0.1 + 0.05 * i, 8, "hot", "z"), { at: [GLI[0] + 0.1 * Math.cos(i * 1.7), GLI[1] + 0.1 * Math.sin(i * 1.7), GLI[2] + 0.2] }));
  const tri: Part[] = []; for (let i = 0; i < 3; i++) tri.push(put(sc, `tr${i}`, doc(0.5, 0.55, 3, "soft"), { at: [1.9 + 0.55 * i - 0.55, -1.35 + 0.1 * (i % 2), 0] }));
  const survX = put(sc, "survX", cross([2.5, -0.55, 0.1], 0.18));
  const surv = put(sc, "surv", polyline([[2.15, -0.7, 0], [2.4, -0.45, 0], [2.85, -0.7, 0]], "soft"));
  sc.mesh.labels = [L([B[0], B[1] + 1.4, 0], "Glioblastoma: sound reaches where light cannot"), L([-2.4, 1.7, 0], "5-ALA, already used for fluorescence-guided surgery"), L([TR[0], TR[1] - 0.6, 0.3], "Focused or diffuse ultrasound"), L([1.9, -1.9, 0], "Phase 2 running; no randomised survival data")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...ppix, ...normalDots, ...waves, ...ros, ...tri, survX, surv);
    setAlpha(alpha, brain, 0.8);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, cap, 1); moveTo(pts, base, cap, [-2.4, 1.2, 0], [B[0] - 0.9, B[1] + 0.5, 0.6], clamp(u * 1.5)); setAlpha(alpha, cap, 1 - 0.7 * clamp(u * 3 - 2)); normalDots.forEach((d, i) => setAlpha(alpha, d, clamp(u * 3 - 1.5 - 0.2 * i) * 0.5)); ppix.forEach((d, i) => setAlpha(alpha, d, clamp(u * 3 - 1.5 - 0.15 * i))); setAlpha(alpha, glioma, 0.6 + 0.4 * pulse(t, 4)); setAlpha(alpha, trans, 0.4); return { caption: "1 · Oral 5-ALA is taken up by glioma cells and converted into protoporphyrin IX, which builds up in the tumour far more than in normal brain" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, cap, 0.3); moveTo(pts, base, cap, [-2.4, 1.2, 0], [B[0] - 0.9, B[1] + 0.5, 0.6], 1); show(alpha, 0.2, ...normalDots); show(alpha, 1, ...ppix); setAlpha(alpha, trans, 1); waves.forEach((w, i) => { const v = (t * 4 + i / 4) % 1; setAlpha(alpha, w, u * (1 - v)); moveTo(pts, base, w, TR, GLI, v, 0.6 + 1.2 * v); }); return { caption: "2 · Ultrasound through the intact skull, focused (ExAblate) or diffuse, penetrates deep tissue in a way light for photodynamic therapy never could" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, cap, 0.3); moveTo(pts, base, cap, [-2.4, 1.2, 0], [B[0] - 0.9, B[1] + 0.5, 0.6], 1); show(alpha, 0.2, ...normalDots); show(alpha, 1, ...ppix); setAlpha(alpha, trans, 1); waves.forEach((w, i) => { const v = (t * 4 + i / 4) % 1; setAlpha(alpha, w, 0.6 * (1 - v)); moveTo(pts, base, w, TR, GLI, v, 0.6 + 1.2 * v); }); ros.forEach((r, i) => { const v = (t * 5 + i / 4) % 1; setAlpha(alpha, r, u * (1 - v)); movePart(pts, base, r, [0, 0, 0], 0.5 + 1.5 * v); }); setAlpha(alpha, glioma, 1 - 0.5 * u); movePart(pts, base, glioma, [0, 0, 0], 1 - 0.3 * u); return { caption: "3 · Cavitation in the sensitised cells generates reactive oxygen species that kill them locally while the surrounding brain, with little sensitiser, is spared" }; }
    const u = Q(t, 3); setAlpha(alpha, cap, 0.3); moveTo(pts, base, cap, [-2.4, 1.2, 0], [B[0] - 0.9, B[1] + 0.5, 0.6], 1); show(alpha, 0.2, ...normalDots); show(alpha, 0.6, ...ppix, ...waves); waves.forEach((w, i) => moveTo(pts, base, w, TR, GLI, (i + 0.5) / 4, 0.6 + 1.2 * ((i + 0.5) / 4))); show(alpha, 0.3, ...ros); setAlpha(alpha, glioma, 0.5); movePart(pts, base, glioma, [0, 0, 0], 0.7); setAlpha(alpha, trans, 0.7);
    cascade(alpha, tri, clamp(u * 1.5)); setAlpha(alpha, surv, clamp(u * 2 - 1)); setAlpha(alpha, survX, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4)));
    return { caption: "4 · Alpheus Medical is in phase 2 in newly diagnosed glioblastoma with temozolomide (NCT07225621) after a phase 1 (NCT05362409); Insightec completed a phase 2 (NCT04845919). No randomised survival data exist, and uptake varies across a heterogeneous tumour" };
  });
}

// ---------------------------------------------------------------- 26. spatial biology instruments
export function spatialBiologyInstruments(): Mesh {
  const sc = scene();
  const S: Vec3 = [-0.6, -0.1, 0];
  put(sc, "slide", quad(3.0, 1.6, "soft"), { at: [S[0], S[1], -0.05] });
  const section = put(sc, "section", ellipsoid(1.1, 0.6, 0.02, 4, 12, "accent", true), { at: S });
  const cellsGrid: Part[] = []; for (let i = 0; i < 12; i++) cellsGrid.push(put(sc, `c${i}`, ring(0.11, 6, "soft", "z"), { at: [S[0] - 0.75 + 0.3 * (i % 6), S[1] - 0.22 + 0.44 * Math.floor(i / 6), 0.02] }));
  const probes: Part[] = []; for (let i = 0; i < 12; i++) probes.push(put(sc, `p${i}`, dots([[0, 0, 0]], i % 3 === 0 ? "hot" : "accent"), { at: [S[0] - 0.75 + 0.3 * (i % 6), S[1] + 1.3 + 0.1 * (i % 4), 0.05 + 0.02 * Math.floor(i / 6)] }));
  const lens = put(sc, "lens", ring(0.45, 12, "accent", "z"), { at: [S[0] - 0.9, S[1], 0.5] });
  const beam = put(sc, "beam", cone(0.45, 0.45, 8, "accent", false), { at: [S[0] - 0.9, S[1], 0.27] });
  const cycles = put(sc, "cycles", ticks(-2.2, -0.2, -1.4, 4, "soft"));
  const MAP: Vec3 = [1.9, 0.3, 0];
  const map = put(sc, "map", quad(1.3, 1.3, "soft"), { at: MAP });
  const clusters: Part[] = []; const CL = [["hot", -0.3, 0.3], ["accent", 0.3, 0.25], ["accent", -0.25, -0.3], ["hot", 0.3, -0.3]] as const; CL.forEach(([cls, dx, dy], i) => clusters.push(put(sc, `cl${i}`, cloud(6, 0.3, cls, i + 2), { at: [MAP[0] + dx, MAP[1] + dy, 0.05] })));
  const genes = put(sc, "genes", ticks(1.35, 2.45, -0.75, 6, "accent"));
  const bill = put(sc, "bill", doc(0.55, 0.6, 3, "soft"), { at: [2.2, -1.5, 0] });
  const billX = put(sc, "billX", cross([2.2, -1.5, 0.1], 0.2));
  const court = put(sc, "court", building(0.7, 0.5, "soft"), { at: [1.3, -1.5, 0] });
  sc.mesh.labels = [L([S[0], S[1] + 1.05, 0], "Tumour section on a slide"), L([S[0] - 1.6, S[1] - 0.9, 0.3], "Imaged over many cycles"), L([MAP[0], MAP[1] + 0.95, 0], "Hundreds to thousands of genes, in place"), L([1.75, -1.95, 0], "Cost per section; not yet reimbursed")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...probes, lens, beam, cycles, map, ...clusters, genes, bill, billX, court);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, section, 0.7); cellsGrid.forEach((c, i) => setAlpha(alpha, c, clamp(u * 3 - 0.2 * i))); probes.forEach((p, i) => { const v = clamp(u * 1.8 - 0.05 * i); setAlpha(alpha, p, clamp(u * 3 - 0.1 * i)); moveTo(pts, base, p, [S[0] - 0.75 + 0.3 * (i % 6), S[1] + 1.3 + 0.1 * (i % 4), 0.05 + 0.02 * Math.floor(i / 6)], [S[0] - 0.75 + 0.3 * (i % 6), S[1] - 0.22 + 0.44 * Math.floor(i / 6), 0.05], v); }); return { caption: "1 · Barcoded probes hybridise in situ to RNA or antibodies bind proteins across an intact tumour section, cell by cell, with the tissue architecture preserved" }; }
    if (s === 1) { const u = Q(t, 1); probes.forEach((p, i) => { moveTo(pts, base, p, [S[0] - 0.75 + 0.3 * (i % 6), S[1] + 1.3 + 0.1 * (i % 4), 0.05 + 0.02 * Math.floor(i / 6)], [S[0] - 0.75 + 0.3 * (i % 6), S[1] - 0.22 + 0.44 * Math.floor(i / 6), 0.05], 1); const lit = Math.abs(S[0] - 0.75 + 0.3 * (i % 6) - (S[0] - 0.9 + 2.0 * u)) < 0.35; setAlpha(alpha, p, lit ? 1 : 0.5); }); setAlpha(alpha, lens, 1); setAlpha(alpha, beam, 0.6 + 0.4 * pulse(t, 6)); movePart(pts, base, lens, [2.0 * u, 0, 0], 1); movePart(pts, base, beam, [2.0 * u, 0, 0], 1); grow(alpha, cycles, u); return { caption: "2 · An imager (Xenium, CosMx, MERSCOPE, PhenoCycler, COMET) reads the barcodes over many hybridisation and imaging cycles; Visium HD instead captures position on an array and sequences" }; }
    if (s === 2) { const u = Q(t, 2); probes.forEach((p, i) => { moveTo(pts, base, p, [S[0] - 0.75 + 0.3 * (i % 6), S[1] + 1.3 + 0.1 * (i % 4), 0.05 + 0.02 * Math.floor(i / 6)], [S[0] - 0.75 + 0.3 * (i % 6), S[1] - 0.22 + 0.44 * Math.floor(i / 6), 0.05], 1); setAlpha(alpha, p, 1); }); setAlpha(alpha, lens, 0.5); setAlpha(alpha, beam, 0.3); movePart(pts, base, lens, [2.0, 0, 0], 1); movePart(pts, base, beam, [2.0, 0, 0], 1); setAlpha(alpha, cycles, 0.6); setAlpha(alpha, map, clamp(u * 2)); clusters.forEach((c, i) => setAlpha(alpha, c, clamp(u * 3 - 0.5 - 0.4 * i))); grow(alpha, genes, clamp(u * 2 - 0.8)); return { caption: "3 · The output is a map of which of hundreds to thousands of genes and proteins are active in each part of the tumour: immune niches, hypoxic cores, invasive edges" }; }
    const u = Q(t, 3); probes.forEach((p, i) => { moveTo(pts, base, p, [S[0] - 0.75 + 0.3 * (i % 6), S[1] + 1.3 + 0.1 * (i % 4), 0.05 + 0.02 * Math.floor(i / 6)], [S[0] - 0.75 + 0.3 * (i % 6), S[1] - 0.22 + 0.44 * Math.floor(i / 6), 0.05], 1); setAlpha(alpha, p, 0.8); }); setAlpha(alpha, lens, 0.5); setAlpha(alpha, beam, 0.3); movePart(pts, base, lens, [2.0, 0, 0], 1); movePart(pts, base, beam, [2.0, 0, 0], 1); setAlpha(alpha, cycles, 0.6); show(alpha, 1, map, ...clusters, genes);
    setAlpha(alpha, court, clamp(u * 2) * 0.7); setAlpha(alpha, bill, clamp(u * 2 - 0.5)); setAlpha(alpha, billX, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4)));
    return { caption: "4 · Research impact on the tumour microenvironment is large; clinical use is nascent, held back by cost per section, analysis complexity and no reimbursement, and patent litigation reshaped the vendors (NanoString to Bruker, 2024)" };
  });
}

// ---------------------------------------------------------------- 27. Sybil: lung cancer risk from a single low-dose CT
export function sybilRisk(): Mesh {
  const sc = scene();
  const CT: Vec3 = [-1.7, 0.2, 0];
  const vol = put(sc, "vol", box(1.4, 1.5, 1.0, "soft", true), { at: CT });
  const lungL = put(sc, "lungL", organ(0.3, 0.55, 0.3, "accent"), { at: [CT[0] - 0.35, CT[1] - 0.05, 0] });
  const lungR = put(sc, "lungR", organ(0.3, 0.55, 0.3, "accent"), { at: [CT[0] + 0.35, CT[1] - 0.05, 0] });
  const nodX = put(sc, "nodX", cross([CT[0], CT[1] + 1.05, 0.2], 0.15));
  const nodRing = put(sc, "nodRing", ring(0.12, 8, "hot", "z"), { at: [CT[0], CT[1] + 1.05, 0.15] });
  const layers: Part[] = []; for (let i = 0; i < 4; i++) layers.push(put(sc, `ly${i}`, quad(0.9 - 0.15 * i, 1.1 - 0.2 * i, "accent"), { at: [-0.3 + 0.35 * i, 0.3, -0.3 + 0.2 * i] }));
  const feed = put(sc, "feed", arrow([CT[0] + 0.75, CT[1], 0.3], [-0.75, 0.3, 0.2], "accent"));
  const scanDots: Part[] = []; for (let i = 0; i < 5; i++) scanDots.push(put(sc, `sd${i}`, dots([[0, 0, 0]], "hot"), { at: [CT[0] - 0.5 + 0.25 * i, CT[1] - 0.6 + 0.3 * (i % 2), 0.55] }));
  const gauge = put(sc, "gauge", ring(0.55, 14, "soft", "z"), { at: [1.9, 0.4, 0] });
  const needleP = put(sc, "needle", line([1.9, 0.4, 0.05], [1.9, 0.9, 0.05], "hot"));
  const years = put(sc, "years", ticks(1.35, 2.45, -0.45, 6, "soft"));
  const lo = put(sc, "lo", ticks(0.4, 2.6, -1.35, 3, "accent"));
  const hi = put(sc, "hi", ticks(0.4, 2.6, -1.85, 7, "hot"));
  const ns = put(sc, "ns", figure("soft"), { at: [-2.4, -1.3, 0.2], scale: 0.6 });
  const nsQ = put(sc, "nsQ", ring(0.14, 8, "hot", "z"), { at: [-2.05, -0.75, 0.3] });
  sc.mesh.labels = [L([CT[0], CT[1] + 1.45, 0], "One low-dose CT, no visible nodule"), L([0.3, 1.25, 0], "3D CNN trained on time-to-cancer (NLST)"), L([1.9, 1.2, 0], "Six-year lung cancer risk"), L([1.5, -2.2, 0], "Longer intervals for low risk, shorter for high")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, nodX, ...layers, feed, gauge, needleP, years, lo, hi, ns, nsQ);
    setAlpha(alpha, nodRing, 0.3);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, vol, 0.7); scanDots.forEach((d, i) => { const v = (t * 3 + i / 5) % 1; setAlpha(alpha, d, 1 - v); movePart(pts, base, d, [0, 1.2 * v, 0], 1); }); setAlpha(alpha, nodRing, clamp(u * 2) * 0.6); setAlpha(alpha, nodX, clamp(u * 2 - 1)); show(alpha, 0.6 + 0.4 * pulse(t, 4), lungL, lungR); return { caption: "1 · A single low-dose screening CT of the chest, with no nodule that a radiologist would call, goes in whole" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, vol, 0.7); show(alpha, 0.3, ...scanDots); setAlpha(alpha, nodX, 0.5); grow(alpha, feed, clamp(u * 2)); layers.forEach((l, i) => setAlpha(alpha, l, clamp(u * 3 - 0.5 - 0.5 * i) * (0.5 + 0.5 * pulse(t + i * 0.1, 5)))); return { caption: "2 · A 3D convolutional network from MIT and MGH, trained on National Lung Screening Trial CTs against time-to-cancer rather than visible nodules, scans the whole volume" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, vol, 0.7); show(alpha, 0.3, ...scanDots); setAlpha(alpha, nodX, 0.5); setAlpha(alpha, feed, 0.6); show(alpha, 0.8, ...layers); setAlpha(alpha, gauge, clamp(u * 2)); setAlpha(alpha, needleP, clamp(u * 2 - 0.3)); movePart(pts, base, needleP, [0, 0, 0], 1, 0); const ang = -1.2 * clamp(u * 1.5 - 0.3); for (let i = needleP.p0; i < needleP.p1; i++) { const p = base[i]; const dx = p[0] - 1.9, dy = p[1] - 0.4; pts[i] = [1.9 + dx * Math.cos(ang) - dy * Math.sin(ang), 0.4 + dx * Math.sin(ang) + dy * Math.cos(ang), p[2]]; } grow(alpha, years, clamp(u * 2 - 0.5)); return { caption: "3 · It outputs the person's risk of lung cancer over the next six years, validated at MGH and in Taiwan (JCO 2023); the code is open source" }; }
    const u = Q(t, 3); setAlpha(alpha, vol, 0.7); show(alpha, 0.3, ...scanDots); setAlpha(alpha, nodX, 0.5); setAlpha(alpha, feed, 0.6); show(alpha, 0.8, ...layers, gauge, years); setAlpha(alpha, needleP, 1); const ang = -1.2; for (let i = needleP.p0; i < needleP.p1; i++) { const p = base[i]; const dx = p[0] - 1.9, dy = p[1] - 0.4; pts[i] = [1.9 + dx * Math.cos(ang) - dy * Math.sin(ang), 0.4 + dx * Math.sin(ang) + dy * Math.cos(ang), p[2]]; }
    grow(alpha, lo, clamp(u * 2)); grow(alpha, hi, clamp(u * 2 - 0.3)); setAlpha(alpha, ns, clamp(u * 2 - 1) * 0.7); setAlpha(alpha, nsQ, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4)));
    return { caption: "4 · Screening programmes are testing it to personalise intervals, longer for low-risk people and shorter for high-risk ones; trained on screening populations, its performance in never-smokers is less certain and prospective trials are still needed" };
  });
}

// ---------------------------------------------------------------- 28. trained innate immunity
export function trainedInnateImmunity(): Mesh {
  const sc = scene();
  const MAR: Vec3 = [-1.6, -0.2, 0];
  put(sc, "marrow", cylinder(0.55, 2.0, 12, 3, "soft", true, true), { at: MAR });
  const prog = put(sc, "prog", cell(0.32, "accent"), { at: MAR });
  const dnaP = put(sc, "dnaP", helix(0.08, 0.3, 2, 12, "accent"), { at: [MAR[0], MAR[1] - 0.15, 0.1] });
  const marks: Part[] = []; for (let i = 0; i < 3; i++) marks.push(put(sc, `mk${i}`, dots([[0, 0, 0]], "hot"), { at: [MAR[0] + 0.08 * Math.cos(i * 2.1), MAR[1] - 0.12 + 0.12 * i, 0.15] }));
  const agon: Part[] = []; for (let i = 0; i < 4; i++) agon.push(put(sc, `ag${i}`, octahedron(0.08, "hot"), { at: [-2.5, 1.5 - 0.2 * i, 0.2] }));
  const mono: Part[] = []; for (let i = 0; i < 3; i++) mono.push(put(sc, `mo${i}`, sphere(0.2, 3, 8, "accent", true), { at: [MAR[0] + 0.9, MAR[1] + 0.5 - 0.5 * i, 0.3] }));
  const nk = put(sc, "nk", sphere(0.22, 3, 8, "accent", true), { at: [MAR[0] + 0.9, MAR[1] - 0.9, 0.3] });
  const TUM: Vec3 = [1.7, 0.2, 0];
  const tumour = put(sc, "tumour", blob(0.6), { at: TUM });
  const burst: Part[] = []; for (let i = 0; i < 4; i++) burst.push(put(sc, `bu${i}`, ring(0.1 + 0.08 * i, 8, "hot", "z"), { at: [TUM[0] - 0.55, TUM[1] + 0.2, 0.3] }));
  const r0 = put(sc, "r0", bar(1.3, 0.35, 0.22, "soft"), { at: [0, -1.85, 0] });
  const r1 = put(sc, "r1", bar(1.65, 0.95, 0.22, "accent"), { at: [0, -1.85, 0] });
  const flip = put(sc, "flip", arrow([2.5, -0.7, 0], [2.5, -1.5, 0], "hot"));
  const bladder = put(sc, "bladder", organ(0.4, 0.35, 0.3), { at: [0.2, 1.5, 0] });
  const bcg = put(sc, "bcg", dots([[0.1, 0.05, 0.2], [-0.1, -0.05, 0.2], [0, 0.15, 0.22]], "hot"), { at: [0.2, 1.5, 0] });
  sc.mesh.labels = [L([MAR[0], MAR[1] + 1.2, 0], "Haematopoietic progenitors, epigenetically rewired"), L([-2.5, 2.0, 0.2], "BCG, beta-glucans"), L([TUM[0], TUM[1] + 0.95, 0], "Monocytes and NK cells hit harder next time"), L([2.5, -1.85, 0], "Can reverse into suppression")];
  const base = sc.mesh.points;
  const monoTo = (i: number): Vec3 => [TUM[0] - 0.85 + 0.15 * (i % 2), TUM[1] + 0.5 - 0.5 * i, 0.3];
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...marks, ...mono, nk, ...burst, r0, r1, flip, bladder, bcg);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); agon.forEach((a, i) => { setAlpha(alpha, a, 1 - 0.6 * clamp(u * 3 - 2)); moveTo(pts, base, a, [-2.5, 1.5 - 0.2 * i, 0.2], [MAR[0] - 0.2 + 0.1 * i, MAR[1] + 0.25, 0.3], clamp(u * 1.5 - 0.1 * i)); }); setAlpha(alpha, prog, 0.6 + 0.4 * u * pulse(t, 5)); marks.forEach((m, i) => setAlpha(alpha, m, clamp(u * 3 - 1.5 - 0.3 * i))); setAlpha(alpha, tumour, 0.4); return { caption: "1 · BCG, the oldest immunotherapy, or a beta-glucan reaches haematopoietic progenitors in the marrow and rewires them epigenetically and metabolically" }; }
    if (s === 1) { const u = Q(t, 1); agon.forEach((a, i) => { setAlpha(alpha, a, 0.4); moveTo(pts, base, a, [-2.5, 1.5 - 0.2 * i, 0.2], [MAR[0] - 0.2 + 0.1 * i, MAR[1] + 0.25, 0.3], 1); }); show(alpha, 1, ...marks); setAlpha(alpha, dnaP, 1); mono.forEach((m, i) => { const v = clamp(u * 2 - 0.3 * i); setAlpha(alpha, m, v); movePart(pts, base, m, [-0.6 * (1 - v), 0, 0], 0.3 + 0.7 * v); }); setAlpha(alpha, nk, clamp(u * 2 - 1)); movePart(pts, base, nk, [-0.6 * (1 - clamp(u * 2 - 1)), 0, 0], 0.3 + 0.7 * clamp(u * 2 - 1)); setAlpha(alpha, tumour, 0.4); return { caption: "2 · The progenitors now produce monocytes and NK cells with heightened effector programmes, a state that lasts months: innate memory without antigen or T cells" }; }
    if (s === 2) { const u = Q(t, 2); agon.forEach((a, i) => { setAlpha(alpha, a, 0.3); moveTo(pts, base, a, [-2.5, 1.5 - 0.2 * i, 0.2], [MAR[0] - 0.2 + 0.1 * i, MAR[1] + 0.25, 0.3], 1); }); show(alpha, 0.7, ...marks); mono.forEach((m, i) => { setAlpha(alpha, m, 1); moveTo(pts, base, m, [MAR[0] + 0.9, MAR[1] + 0.5 - 0.5 * i, 0.3], monoTo(i), clamp(u * 1.4 - 0.1 * i)); }); setAlpha(alpha, nk, 1); moveTo(pts, base, nk, [MAR[0] + 0.9, MAR[1] - 0.9, 0.3], [TUM[0] - 0.7, TUM[1] - 0.75, 0.3], clamp(u * 1.4 - 0.3)); setAlpha(alpha, tumour, 1); burst.forEach((b, i) => { const v = (t * 5 + i / 4) % 1; setAlpha(alpha, b, clamp(u * 2 - 1) * (1 - v)); movePart(pts, base, b, [0, 0, 0], 0.5 + 1.2 * v); }); setAlpha(alpha, r0, clamp(u * 2 - 1)); setAlpha(alpha, r1, clamp(u * 2 - 1.2)); return { caption: "3 · Next time they meet a tumour the response is harder; the aim is to induce the state deliberately, alone or before checkpoint blockade" }; }
    const u = Q(t, 3); agon.forEach((a, i) => { setAlpha(alpha, a, 0.3); moveTo(pts, base, a, [-2.5, 1.5 - 0.2 * i, 0.2], [MAR[0] - 0.2 + 0.1 * i, MAR[1] + 0.25, 0.3], 1); }); show(alpha, 0.7, ...marks); mono.forEach((m, i) => { setAlpha(alpha, m, 1); moveTo(pts, base, m, [MAR[0] + 0.9, MAR[1] + 0.5 - 0.5 * i, 0.3], monoTo(i), 1); }); setAlpha(alpha, nk, 1); moveTo(pts, base, nk, [MAR[0] + 0.9, MAR[1] - 0.9, 0.3], [TUM[0] - 0.7, TUM[1] - 0.75, 0.3], 1); setAlpha(alpha, tumour, 0.8); show(alpha, 0.3, ...burst); show(alpha, 0.7, r0, r1);
    setAlpha(alpha, bladder, clamp(u * 2) * 0.8); setAlpha(alpha, bcg, clamp(u * 2)); grow(alpha, flip, clamp(u * 2 - 1));
    return { caption: "4 · The clear precedent is intravesical BCG in bladder cancer; beyond it the cancer data are early, there is no standard assay to confirm training in patients, and in the wrong context the same reprogramming is immunosuppressive" };
  });
}

// ---------------------------------------------------------------- 29. tumour mutational burden testing
export function tmbTesting(): Mesh {
  const sc = scene();
  const dnaM = put(sc, "dna", helix(0.18, 3.6, 6, 48, "soft"), { at: [-0.4, -0.2, 0], rotZ: Math.PI / 2 });
  const muts: Part[] = []; for (let i = 0; i < 9; i++) muts.push(put(sc, `m${i}`, octahedron(0.07, "hot", true), { at: [-2.0 + 0.4 * i, -0.2 + 0.18 * Math.sin(i * 2.4), 0.18 * Math.cos(i * 2.4)] }));
  const bracket = put(sc, "bracket", polyline([[-2.2, -0.75, 0], [-2.2, -0.9, 0], [1.4, -0.9, 0], [1.4, -0.75, 0]], "soft"));
  const gaugeAx = put(sc, "gaugeAx", axes([2.0, -1.0, 0], 0.6, 2.2));
  const level = put(sc, "level", bar(2.3, 1.6, 0.28, "hot"), { at: [0, -1.0, 0] });
  const thresh = put(sc, "thresh", line([1.85, 0.1, 0.05], [2.75, 0.1, 0.05], "accent"));
  const pembro = put(sc, "pembro", polyline([[2.3, 0.85, 0.2], [2.3, 1.45, 0.2]], "accent"));
  const pembroHead = put(sc, "pembroHead", polyline([[2.1, 1.25, 0.2], [2.3, 1.45, 0.2], [2.5, 1.25, 0.2]], "accent"));
  const panelA = put(sc, "panelA", bar(-1.6, 1.15, 0.28, "hot"), { at: [0, -2.0, 0] });
  const panelB = put(sc, "panelB", bar(-1.2, 0.85, 0.28, "soft"), { at: [0, -2.0, 0] });
  const cut = put(sc, "cut", line([-1.9, -1.0, 0.05], [-0.9, -1.0, 0.05], "accent"));
  const tubeP = put(sc, "tube", vial(0.16, 0.6, "accent"), { at: [0.3, -1.5, 0] });
  const blood = put(sc, "blood", dots([[0.3, -1.6, 0.17], [0.25, -1.4, 0.17], [0.36, -1.5, 0.18]], "hot"));
  const flt: Part[] = []; for (let i = 0; i < 3; i++) flt.push(put(sc, `flt${i}`, cross([-2.0 + 0.4 * i * 3, -0.2 + 0.18 * Math.sin(i * 3 * 2.4), 0.3], 0.12, "accent")));
  sc.mesh.labels = [L([-0.4, 0.75, 0], "Somatic non-synonymous mutations across the panel"), L([2.3, 1.85, 0.2], "Pembrolizumab: TMB of at least 10 per megabase"), L([-1.4, -2.4, 0], "Panels can disagree around the cut-off"), L([0.3, -2.1, 0], "Blood TMB when tissue is inadequate")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, bracket, gaugeAx, level, thresh, pembro, pembroHead, panelA, panelB, cut, tubeP, blood, ...flt);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, dnaM, 0.8); muts.forEach((m, i) => setAlpha(alpha, m, clamp(u * 9 - i) * (0.6 + 0.4 * pulse(t + i * 0.1, 5)))); grow(alpha, bracket, clamp(u * 1.5 - 0.3)); return { caption: "1 · A comprehensive genomic profiling panel sequences the tumour's coding territory and counts somatic non-synonymous mutations, after filtering germline and known driver variants" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, dnaM, 0.8); show(alpha, 1, ...muts); setAlpha(alpha, bracket, 1); flt.forEach((f, i) => setAlpha(alpha, f, clamp(u * 3 - i) * 0.8)); setAlpha(alpha, gaugeAx, clamp(u * 2)); setAlpha(alpha, level, clamp(u * 2 - 0.5)); movePart(pts, base, level, [0, -0.8 * (1 - clamp(u * 2 - 0.5)), 0], 1); return { caption: "2 · The count is normalised to the megabases actually sequenced and reported as mutations per megabase, free with every large panel" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, dnaM, 0.8); show(alpha, 1, ...muts, bracket, gaugeAx, level); show(alpha, 0.8, ...flt); setAlpha(alpha, thresh, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 5))); setAlpha(alpha, pembro, clamp(u * 2 - 0.7)); setAlpha(alpha, pembroHead, clamp(u * 2 - 0.7)); movePart(pts, base, pembro, [0, -0.5 * clamp(u * 2 - 1), 0], 1); movePart(pts, base, pembroHead, [0, -0.5 * clamp(u * 2 - 1), 0], 1); return { caption: "3 · In June 2020 the FDA gave pembrolizumab a tissue-agnostic accelerated approval for solid tumours with TMB of at least 10 mutations per megabase on FoundationOne CDx (KEYNOTE-158)" }; }
    const u = Q(t, 3); setAlpha(alpha, dnaM, 0.8); show(alpha, 1, ...muts, bracket, gaugeAx, level, thresh, pembro, pembroHead); show(alpha, 0.8, ...flt); movePart(pts, base, pembro, [0, -0.5, 0], 1); movePart(pts, base, pembroHead, [0, -0.5, 0], 1);
    setAlpha(alpha, panelA, clamp(u * 2)); setAlpha(alpha, panelB, clamp(u * 2 - 0.3)); setAlpha(alpha, cut, clamp(u * 2 - 0.6) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, tubeP, clamp(u * 2 - 1)); setAlpha(alpha, blood, clamp(u * 2 - 1));
    return { caption: "4 · Panel size, synonymous variants and germline filtering all shift the number, and the Friends of Cancer Research harmonisation project showed panels disagreeing at the cut-off; blood TMB is an emerging fallback, and TMB is weakest in tobacco-driven cancers" };
  });
}

// ---------------------------------------------------------------- 30. yoga during and after cancer treatment
export function yogaCancer(): Mesh {
  const sc = scene();
  const mat = put(sc, "mat", quad(3.2, 1.0, "soft"), { at: [-0.6, -1.1, 0], rotX: Math.PI / 2 });
  const P: Vec3 = [-0.6, -0.3, 0];
  const person = put(sc, "person", figure("accent"), { at: P });
  const armsUp = put(sc, "armsUp", polyline([[P[0] - 0.3, P[1] + 0.56, 0], [P[0] - 0.4, P[1] + 1.0, 0.05], [P[0] - 0.15, P[1] + 1.35, 0.1]], "accent"));
  const armsUp2 = put(sc, "armsUp2", polyline([[P[0] + 0.3, P[1] + 0.56, 0], [P[0] + 0.4, P[1] + 1.0, 0.05], [P[0] + 0.15, P[1] + 1.35, 0.1]], "accent"));
  const breath: Part[] = []; for (let i = 0; i < 3; i++) breath.push(put(sc, `br${i}`, ring(0.25 + 0.12 * i, 10, "accent", "z"), { at: [P[0], P[1] + 0.3, 0.2] }));
  const group: Part[] = []; for (let i = 0; i < 2; i++) group.push(put(sc, `g${i}`, figure("soft"), { at: [P[0] - 1.3 + 2.6 * i, P[1] - 0.05, -0.5], scale: 0.85 }));
  const inst = put(sc, "inst", figure("soft"), { at: [P[0], P[1] + 0.1, -1.6], scale: 0.7 });
  const ax = put(sc, "ax", axes([1.3, -1.9, 0], 1.6, 1.3));
  const bars: Part[] = []; const HB = [1.0, 0.55, 0.9, 0.5, 0.85, 0.45]; for (let i = 0; i < 6; i++) bars.push(put(sc, `b${i}`, bar(1.5 + 0.25 * i, HB[i], 0.18, i % 2 ? "accent" : "hot"), { at: [0, -1.9, 0] }));
  const weeks = put(sc, "weeks", ticks(1.3, 2.9, 0.9, 6, "soft"));
  const dumb = put(sc, "dumb", dumbbell(0.8), { at: [2.2, 1.7, 0] });
  const runner = put(sc, "runner", polyline([[1.5, 1.45, 0], [1.75, 1.75, 0], [2.0, 1.45, 0], [2.25, 1.75, 0]], "soft"));
  sc.mesh.labels = [L([P[0], P[1] + 1.75, 0], "Postures, breathing and relaxation, 6 to 12 weeks"), L([P[0], P[1] - 1.55, 0], "Group class with a trained instructor"), L([2.1, -2.25, 0], "Fatigue, anxiety, low mood and sleep: Cochrane, 24 trials"), L([2.0, 2.2, 0], "Aerobic and resistance exercise still needed")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, armsUp, armsUp2, ...breath, ...group, inst, ax, ...bars, weeks, dumb, runner);
    setAlpha(alpha, mat, 0.6);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, person, 1); alpha[person.s0 + 3] = 1 - u; alpha[person.s0 + 4] = 1 - u; setAlpha(alpha, armsUp, u); setAlpha(alpha, armsUp2, u); breath.forEach((b, i) => { const v = (t * 3 + i / 3) % 1; setAlpha(alpha, b, clamp(u * 2 - 0.5) * (1 - v) * 0.8); movePart(pts, base, b, [0, 0, 0], 0.5 + 1.0 * v); }); return { caption: "1 · Gentle hatha or Iyengar-derived yoga: slow postures, regulated breathing and relaxation over a programme of six to twelve weeks" }; }
    if (s === 1) { const u = Q(t, 1); alpha[person.s0 + 3] = 0; alpha[person.s0 + 4] = 0; show(alpha, 1, armsUp, armsUp2); breath.forEach((b, i) => { const v = (t * 3 + i / 3) % 1; setAlpha(alpha, b, (1 - v) * 0.8); movePart(pts, base, b, [0, 0, 0], 0.5 + 1.0 * v); }); group.forEach((g, i) => { setAlpha(alpha, g, clamp(u * 2 - 0.5 * i)); movePart(pts, base, g, [0, 0.3 * (1 - clamp(u * 2 - 0.5 * i)), 0], 1); }); setAlpha(alpha, inst, clamp(u * 2 - 1)); return { caption: "2 · Slow movement and breath lower sympathetic arousal and inflammatory signalling; the group setting adds social support, and oncology-trained instructors adapt for limited mobility" }; }
    if (s === 2) { const u = Q(t, 2); alpha[person.s0 + 3] = 0; alpha[person.s0 + 4] = 0; show(alpha, 1, armsUp, armsUp2, ...group, inst); show(alpha, 0.3, ...breath); setAlpha(alpha, ax, 1); bars.forEach((b, i) => setAlpha(alpha, b, clamp(u * 3 - 0.4 * i))); grow(alpha, weeks, clamp(u * 2)); return { caption: "3 · A Cochrane review of 24 randomised trials in breast cancer found moderate-quality evidence of better quality of life and less fatigue and sleep disturbance than no intervention, and less depression and anxiety than education controls" }; }
    const u = Q(t, 3); alpha[person.s0 + 3] = 0; alpha[person.s0 + 4] = 0; show(alpha, 1, armsUp, armsUp2, ...group, inst, ax, ...bars, weeks); show(alpha, 0.3, ...breath);
    setAlpha(alpha, dumb, clamp(u * 2)); movePart(pts, base, dumb, [0, 0.2 * Math.abs(Math.sin(t * TAU * 3)) * clamp(u * 2), 0], 1); grow(alpha, runner, clamp(u * 2 - 0.5));
    return { caption: "4 · SIO-ASCO recommends yoga for fatigue during treatment (2024) and for anxiety and depressive symptoms (2023); evidence is concentrated in breast cancer, and it does not replace the aerobic and resistance exercise that carries the survival-related evidence" };
  });
}

// ---------------------------------------------------------------- 31. acupuncture for dry mouth after head and neck radiotherapy
export function acupunctureXerostomia(): Mesh {
  const sc = scene();
  const H: Vec3 = [-0.9, 0.3, 0];
  const head = put(sc, "head", organ(0.85, 1.0, 0.8), { at: H });
  const parL = put(sc, "parL", blob(0.22, "accent"), { at: [H[0] - 0.75, H[1] - 0.25, 0.3] });
  const parR = put(sc, "parR", blob(0.22, "accent"), { at: [H[0] + 0.75, H[1] - 0.25, 0.3] });
  const saliva: Part[] = []; for (let i = 0; i < 4; i++) saliva.push(put(sc, `sa${i}`, octahedron(0.05, "accent", true), { at: [H[0] - 0.6 + 0.4 * i, H[1] - 0.55, 0.5] }));
  const beam = put(sc, "beam", cone(0.9, 1.6, 10, "hot", false), { at: [H[0], H[1] + 1.55, 0] });
  const dry: Part[] = []; for (let i = 0; i < 3; i++) dry.push(put(sc, `dr${i}`, ring(0.3 + 0.1 * i, 10, "hot", "z"), { at: [H[0], H[1] - 0.6, 0.5] }));
  const ear = put(sc, "ear", needle(0.4, "accent"), { at: [H[0] + 0.95, H[1] + 0.75, 0.2] });
  const HAND: Vec3 = [1.4, -0.9, 0.2];
  put(sc, "hand", hand("soft"), { at: HAND, scale: 0.8 });
  const hn: Part[] = []; for (let i = 0; i < 2; i++) hn.push(put(sc, `hn${i}`, needle(0.35, "accent"), { at: [HAND[0] - 0.15 + 0.3 * i, HAND[1] + 0.55, HAND[2] + 0.1] }));
  const sched = put(sc, "sched", ticks(0.6, 2.6, 1.6, 7, "soft"));
  const dots3: Part[] = []; for (let i = 0; i < 3; i++) dots3.push(put(sc, `d3${i}`, dots([[0, 0, 0]], "accent"), { at: [0.6 + 0.667 * i, 1.75, 0] }));
  const y0 = put(sc, "y0", bar(1.0, 0.9, 0.22, "hot"), { at: [0, -0.1, 0] });
  const y1 = put(sc, "y1", bar(1.3, 0.55, 0.22, "accent"), { at: [0, -0.1, 0] });
  const ySham = put(sc, "ySham", bar(1.6, 0.72, 0.22, "soft"), { at: [0, -0.1, 0] });
  const imrt = put(sc, "imrt", polyline([[H[0] - 1.35, H[1] + 1.4, 0], [H[0] - 0.9, H[1] + 0.9, 0], [H[0] - 0.7, H[1] - 0.05, 0]], "accent"));
  const imrt2 = put(sc, "imrt2", polyline([[H[0] + 1.35, H[1] + 1.4, 0], [H[0] + 0.9, H[1] + 0.9, 0], [H[0] + 0.7, H[1] - 0.05, 0]], "accent"));
  sc.mesh.labels = [L([H[0], H[1] + 1.9, 0], "Parotid glands inside the radiotherapy field"), L([1.6, 2.0, 0], "Three sessions a week during radiotherapy"), L([1.3, -0.5, 0], "Xerostomia at 12 months: standard, acupuncture, sham"), L([H[0], H[1] - 1.45, 0], "Parotid-sparing IMRT still comes first")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...dry, ear, ...hn, sched, ...dots3, y0, y1, ySham, imrt, imrt2);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, beam, u * (0.5 + 0.5 * pulse(t, 8))); saliva.forEach((d, i) => { const v = (t * 3 + i / 4) % 1; setAlpha(alpha, d, (1 - v) * (1 - 0.8 * u)); movePart(pts, base, d, [0, -0.4 * v, 0], 1); }); show(alpha, 1 - 0.5 * u, parL, parR); dry.forEach((d, i) => setAlpha(alpha, d, clamp(u * 3 - 1 - 0.4 * i) * pulse(t, 4))); setAlpha(alpha, head, 0.8); return { caption: "1 · The salivary glands sit in the head and neck radiotherapy field; xerostomia is common and often permanent" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, beam, 0.3); show(alpha, 0.5, parL, parR); show(alpha, 0.2, ...saliva); show(alpha, 0.6, ...dry); setAlpha(alpha, ear, clamp(u * 2)); moveTo(pts, base, ear, [H[0] + 0.95, H[1] + 0.75, 0.2], [H[0] + 0.95, H[1] + 0.55, 0.2], clamp(u * 2)); hn.forEach((n, i) => { setAlpha(alpha, n, clamp(u * 2 - 0.5 - 0.3 * i)); moveTo(pts, base, n, [HAND[0] - 0.15 + 0.3 * i, HAND[1] + 0.55, HAND[2] + 0.1], [HAND[0] - 0.15 + 0.3 * i, HAND[1] + 0.35, HAND[2] + 0.1], clamp(u * 2 - 0.5 - 0.3 * i)); }); setAlpha(alpha, sched, clamp(u * 2 - 1)); dots3.forEach((d, i) => setAlpha(alpha, d, clamp(u * 3 - 2 - 0.3 * i))); return { caption: "2 · Points around the ear and on the hands are needled three times a week throughout radiotherapy, aiming to raise parasympathetic salivary drive and protect the glands" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, beam, 0.2); show(alpha, 0.5 + 0.3 * u, parL, parR); show(alpha, 0.2 + 0.5 * u, ...saliva); dry.forEach((d) => setAlpha(alpha, d, 0.6 * (1 - u))); show(alpha, 1, ear, ...hn, sched, ...dots3); moveTo(pts, base, ear, [H[0] + 0.95, H[1] + 0.75, 0.2], [H[0] + 0.95, H[1] + 0.55, 0.2], 1); hn.forEach((n, i) => moveTo(pts, base, n, [HAND[0] - 0.15 + 0.3 * i, HAND[1] + 0.55, HAND[2] + 0.1], [HAND[0] - 0.15 + 0.3 * i, HAND[1] + 0.35, HAND[2] + 0.1], 1)); setAlpha(alpha, y0, clamp(u * 3)); setAlpha(alpha, y1, clamp(u * 3 - 1)); setAlpha(alpha, ySham, clamp(u * 3 - 2)); return { caption: "3 · In 399 patients at Fudan University and MD Anderson (JAMA Network Open 2019), patient-reported xerostomia at 12 months was lower than with standard care, with sham acupuncture intermediate; the effect was clearer at the Chinese centre" }; }
    const u = Q(t, 3); setAlpha(alpha, beam, 0.2); show(alpha, 0.8, parL, parR); show(alpha, 0.7, ...saliva); hide(alpha, ...dry); show(alpha, 0.6, ear, ...hn, sched, ...dots3); moveTo(pts, base, ear, [H[0] + 0.95, H[1] + 0.75, 0.2], [H[0] + 0.95, H[1] + 0.55, 0.2], 1); hn.forEach((n, i) => moveTo(pts, base, n, [HAND[0] - 0.15 + 0.3 * i, HAND[1] + 0.55, HAND[2] + 0.1], [HAND[0] - 0.15 + 0.3 * i, HAND[1] + 0.35, HAND[2] + 0.1], 1)); show(alpha, 1, y0, y1, ySham);
    grow(alpha, imrt, clamp(u * 2)); grow(alpha, imrt2, clamp(u * 2 - 0.3)); setAlpha(alpha, beam, 0.2 * (1 - u));
    return { caption: "4 · Objective salivary flow rarely improves and the result needs replication before guidelines adopt it; parotid-sparing IMRT, and amifostine where used, remain the primary preventive measures" };
  });
}

// ---------------------------------------------------------------- 32. alpha-emitter nanogenerators and daughter trapping
export function alphaNanogenerators(): Mesh {
  const sc = scene();
  const A: Vec3 = [-1.5, 0.4, 0];
  const chel = put(sc, "chel", ring(0.3, 10, "soft", "z"), { at: A });
  const ac = put(sc, "ac", octahedron(0.14, "hot", true), { at: A });
  const alphas: Part[] = []; for (let i = 0; i < 4; i++) alphas.push(put(sc, `al${i}`, ring(0.12, 8, "hot", "z"), { at: A }));
  const dau: Part[] = []; for (let i = 0; i < 3; i++) dau.push(put(sc, `da${i}`, octahedron(0.09, "hot"), { at: A }));
  const KID: Vec3 = [-1.6, -1.4, 0], SAL: Vec3 = [0.2, 1.7, 0];
  const kidney = put(sc, "kidney", organ(0.28, 0.42, 0.22), { at: KID });
  const salivary = put(sc, "salivary", organ(0.32, 0.22, 0.2), { at: SAL });
  const hitK = put(sc, "hitK", ring(0.5, 10, "hot", "z"), { at: KID });
  const hitS = put(sc, "hitS", ring(0.45, 10, "hot", "z"), { at: SAL });
  const N: Vec3 = [1.5, 0.3, 0];
  const nano = put(sc, "nano", cell(0.62, "accent"), { at: N });
  const shell2 = put(sc, "shell2", ring(0.5, 12, "accent", "z"), { at: N });
  const ac2 = put(sc, "ac2", octahedron(0.14, "hot", true), { at: N });
  const alphas2: Part[] = []; for (let i = 0; i < 4; i++) alphas2.push(put(sc, `al2${i}`, ring(0.12, 8, "hot", "z"), { at: N }));
  const dau2: Part[] = []; for (let i = 0; i < 3; i++) dau2.push(put(sc, `da2${i}`, octahedron(0.09, "hot"), { at: N }));
  const tumour = put(sc, "tumour", blob(0.9, "hot"), { at: [N[0], N[1], -0.4] });
  const ret0 = put(sc, "ret0", bar(2.6, 1.1, 0.24, "accent"), { at: [0, -1.8, 0] });
  const human = put(sc, "human", figure("soft"), { at: [0.3, -1.2, 0.2], scale: 0.6 });
  const humanX = put(sc, "humanX", cross([0.3, -0.7, 0.4], 0.2));
  sc.mesh.labels = [L([A[0], A[1] + 0.85, 0], "Ac-225 in a chelator: four alphas, daughters recoil out"), L([KID[0], KID[1] - 0.75, 0], "Kidneys and salivary glands take the dose"), L([N[0], N[1] + 1.15, 0], "Nanocarrier (LaPO4, TiO2, liposome) holds the daughters"), L([2.6, -2.15, 0], "Retention above 90% in animals; no human data")];
  const base = sc.mesh.points;
  const dauTo = (i: number): Vec3 => i === 0 ? [KID[0], KID[1] + 0.2, 0.2] : i === 1 ? [SAL[0], SAL[1] - 0.15, 0.2] : [A[0] + 1.0, A[1] - 0.6, 0.2];
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...alphas, ...dau, hitK, hitS, ...alphas2, ...dau2, ret0, human, humanX);
    show(alpha, 0.5, kidney, salivary, tumour);
    setAlpha(alpha, nano, 0.4); setAlpha(alpha, shell2, 0.4); setAlpha(alpha, ac2, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, ac, 0.6 + 0.4 * pulse(t, 5)); alphas.forEach((r, i) => { const v = (t * 4 + i / 4) % 1; setAlpha(alpha, r, clamp(u * 4 - i) * (1 - v)); const ang = (TAU * i) / 4 + 0.5; movePart(pts, base, r, [0.9 * v * Math.cos(ang), 0.9 * v * Math.sin(ang), 0], 1 + v); }); return { caption: "1 · Actinium-225's power comes from its decay chain: four alpha particles per atom, each depositing enormous energy over a few cell diameters" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, ac, 0.4); show(alpha, 0.3, ...alphas); alphas.forEach((r, i) => { const ang = (TAU * i) / 4 + 0.5; movePart(pts, base, r, [0.9 * Math.cos(ang), 0.9 * Math.sin(ang), 0], 2); }); setAlpha(alpha, chel, 1 - 0.5 * u); dau.forEach((d, i) => { const v = clamp(u * 1.5 - 0.15 * i); setAlpha(alpha, d, 1); moveTo(pts, base, d, A, dauTo(i), v, 1, v * 4); }); setAlpha(alpha, hitK, clamp(u * 3 - 2) * pulse(t, 5)); setAlpha(alpha, hitS, clamp(u * 3 - 2) * pulse(t, 5)); show(alpha, 0.5 + 0.5 * clamp(u * 3 - 2), kidney, salivary); return { caption: "2 · But recoil energy ejects each daughter nuclide from any chelator, so francium, bismuth and their alphas drift off to irradiate the kidneys and salivary glands" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, ac, 0.3); setAlpha(alpha, chel, 0.5); dau.forEach((d, i) => { setAlpha(alpha, d, 0.6); moveTo(pts, base, d, A, dauTo(i), 1, 1, 4); }); show(alpha, 0.5, hitK, hitS); setAlpha(alpha, nano, 0.4 + 0.6 * u); setAlpha(alpha, shell2, 0.4 + 0.6 * u); setAlpha(alpha, ac2, 0.6 + 0.4 * pulse(t, 5)); alphas2.forEach((r, i) => { const v = (t * 4 + i / 4) % 1; setAlpha(alpha, r, clamp(u * 4 - i) * (1 - v)); const ang = (TAU * i) / 4 + 0.5; movePart(pts, base, r, [1.0 * v * Math.cos(ang), 1.0 * v * Math.sin(ang), 0], 1 + v); }); dau2.forEach((d, i) => { const v = clamp(u * 2 - 0.5 - 0.2 * i); setAlpha(alpha, d, v); const ang = i * 2.1; moveTo(pts, base, d, N, [N[0] + 0.38 * Math.cos(ang), N[1] + 0.38 * Math.sin(ang), 0.2], v, 1, v * 3); }); setAlpha(alpha, tumour, 0.5 + 0.3 * u); return { caption: "3 · Encapsulating the parent in a solid-state or multi-shell nanocarrier (lanthanum phosphate, titanium dioxide, liposomes, polymer cages) physically catches the recoiling daughters so they decay inside the tumour" }; }
    const u = Q(t, 3); setAlpha(alpha, ac, 0.3); setAlpha(alpha, chel, 0.5); dau.forEach((d, i) => { setAlpha(alpha, d, 0.6); moveTo(pts, base, d, A, dauTo(i), 1, 1, 4); }); show(alpha, 0.5, hitK, hitS); show(alpha, 1, nano, shell2, ac2); show(alpha, 0.3, ...alphas2); alphas2.forEach((r, i) => { const ang = (TAU * i) / 4 + 0.5; movePart(pts, base, r, [1.0 * Math.cos(ang), 1.0 * Math.sin(ang), 0], 2); }); dau2.forEach((d, i) => { setAlpha(alpha, d, 1); const ang = i * 2.1; moveTo(pts, base, d, N, [N[0] + 0.38 * Math.cos(ang), N[1] + 0.38 * Math.sin(ang), 0.2], 1, 1, 3); }); setAlpha(alpha, tumour, 0.8);
    setAlpha(alpha, ret0, clamp(u * 2)); setAlpha(alpha, human, clamp(u * 2 - 0.5) * 0.7); setAlpha(alpha, humanX, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4)));
    return { caption: "4 · Retention above 90% has been reported in animals, multiplying alpha dose per targeting event; no construct had reached human trials by 2026, nanoparticles still favour liver and spleen, and no regulatory path exists for a radioactive nanomaterial" };
  });
}

// ---------------------------------------------------------------- 33. antineoplastons (Burzynski clinic)
export function antineoplastons(): Mesh {
  const sc = scene();
  const CL: Vec3 = [-1.4, 0.3, 0];
  const clinic = put(sc, "clinic", building(1.6, 1.1, "soft"), { at: CL });
  put(sc, "roof", house(1.7, 1.1, "soft"), { at: [CL[0], CL[1], -0.3] });
  const vials: Part[] = []; for (let i = 0; i < 2; i++) vials.push(put(sc, `v${i}`, vial(0.12, 0.42, "accent"), { at: [CL[0] - 0.25 + 0.5 * i, CL[1] - 0.2, 0.4] }));
  const pep: Part[] = []; for (let i = 0; i < 4; i++) pep.push(put(sc, `pp${i}`, helix(0.04, 0.1, 1.2, 6, "accent"), { at: [CL[0] - 0.3 + 0.2 * i, CL[1] + 1.2, 0.2] }));
  const child = put(sc, "child", figure("soft"), { at: [-2.6, -1.2, 0.2], scale: 0.6 });
  const brain = put(sc, "brain", blob(0.12, "hot"), { at: [-2.6, -0.7, 0.35] });
  const bag = put(sc, "bag", box(0.25, 0.35, 0.15, "accent", true), { at: [-2.05, -0.6, 0.2] });
  const drip = put(sc, "drip", polyline([[-2.05, -0.78, 0.2], [-2.05, -1.0, 0.2], [-2.45, -1.1, 0.25]], "accent"));
  const trials: Part[] = []; for (let i = 0; i < 6; i++) trials.push(put(sc, `tr${i}`, doc(0.42, 0.5, 2, "soft"), { at: [0.5 + 0.22 * i, 1.0 + 0.06 * i, -0.05 * i] }));
  const pubX = put(sc, "pubX", cross([1.35, 0.55, 0.3], 0.25));
  const nci = put(sc, "nci", doc(0.55, 0.65, 3, "soft"), { at: [2.4, 1.0, 0] });
  const nciBar = put(sc, "nciBar", line([2.1, 1.0, 0.1], [2.7, 1.0, 0.1], "hot"));
  const na: Part[] = []; for (let i = 0; i < 5; i++) na.push(put(sc, `na${i}`, dots([[0, 0, 0]], "hot"), { at: [-2.75 + 0.08 * i, -1.35 + 0.1 * (i % 3), 0.35] }));
  const naBar = put(sc, "naBar", bar(0.5, 1.2, 0.22, "hot"), { at: [0, -1.9, 0] });
  const money: Part[] = []; for (let i = 0; i < 3; i++) money.push(put(sc, `m${i}`, quad(0.5, 0.25, "soft"), { at: [1.5 + 0.1 * i, -1.5 + 0.12 * i, 0.05 * i] }));
  const toClinic = put(sc, "toClinic", arrow([1.7, -1.2, 0.2], [CL[0] + 0.9, CL[1] - 0.3, 0.2], "soft"));
  sc.mesh.labels = [L([CL[0], CL[1] + 1.65, 0], "Peptide fractions from urine (A10, AS2-1)"), L([1.2, 1.75, 0], "More than 60 registered phase 2 trials, none published in full"), L([2.4, 0.4, 0], "NCI trial terminated"), L([0.5, -2.25, 0], "Severe hypernatraemia; patients pay")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...trials, pubX, nci, nciBar, ...na, naBar, ...money, toClinic);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, clinic, 1); pep.forEach((p, i) => { const v = clamp(u * 2 - 0.2 * i); setAlpha(alpha, p, 1); moveTo(pts, base, p, [CL[0] - 0.3 + 0.2 * i, CL[1] + 1.2, 0.2], [CL[0] - 0.25 + 0.5 * (i % 2), CL[1] - 0.15, 0.45], v); }); vials.forEach((v) => setAlpha(alpha, v, 0.5 + 0.5 * u)); setAlpha(alpha, child, 0.5); setAlpha(alpha, brain, 0.5); setAlpha(alpha, bag, 0.3); setAlpha(alpha, drip, 0.3); return { caption: "1 · Since the 1970s one private clinic in Texas has given 'antineoplastons', peptides and amino-acid derivatives related to phenylacetate, claimed to restore a natural defence against cancer" }; }
    if (s === 1) { const u = Q(t, 1); pep.forEach((p, i) => { setAlpha(alpha, p, 0.5); moveTo(pts, base, p, [CL[0] - 0.3 + 0.2 * i, CL[1] + 1.2, 0.2], [CL[0] - 0.25 + 0.5 * (i % 2), CL[1] - 0.15, 0.45], 1); }); show(alpha, 1, child, bag, drip); setAlpha(alpha, brain, 0.6 + 0.4 * pulse(t, 5)); cascade(alpha, trials, u); return { caption: "2 · Mostly children with brain tumours are treated on a trial basis: the Burzynski Research Institute has registered more than 60 phase 2 trials since the 1990s" }; }
    if (s === 2) { const u = Q(t, 2); pep.forEach((p, i) => { setAlpha(alpha, p, 0.5); moveTo(pts, base, p, [CL[0] - 0.3 + 0.2 * i, CL[1] + 1.2, 0.2], [CL[0] - 0.25 + 0.5 * (i % 2), CL[1] - 0.15, 0.45], 1); }); show(alpha, 1, child, bag, drip); setAlpha(alpha, brain, 0.8); show(alpha, 0.7, ...trials); setAlpha(alpha, pubX, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, nci, clamp(u * 2 - 0.5)); setAlpha(alpha, nciBar, clamp(u * 2 - 1)); return { caption: "3 · None has been completed and published in full; the only independent attempt, an NCI-sponsored trial in the 1990s, was terminated after eligibility disputes with too few patients to analyse, and case reports remain unverified" }; }
    const u = Q(t, 3); pep.forEach((p, i) => { setAlpha(alpha, p, 0.5); moveTo(pts, base, p, [CL[0] - 0.3 + 0.2 * i, CL[1] + 1.2, 0.2], [CL[0] - 0.25 + 0.5 * (i % 2), CL[1] - 0.15, 0.45], 1); }); show(alpha, 1, child, bag, drip); setAlpha(alpha, brain, 0.8); show(alpha, 0.7, ...trials, pubX, nci, nciBar);
    na.forEach((d, i) => { const v = (t * 3 + i / 5) % 1; setAlpha(alpha, d, clamp(u * 2) * (1 - v)); movePart(pts, base, d, [0, 0.6 * v, 0], 1); }); setAlpha(alpha, naBar, clamp(u * 2)); money.forEach((m, i) => setAlpha(alpha, m, clamp(u * 3 - 1 - 0.3 * i))); grow(alpha, toClinic, clamp(u * 2 - 1));
    return { caption: "4 · Hypernatraemia, sometimes severe, is a recognised toxicity; patients pay large sums, the FDA and Texas Medical Board have acted repeatedly, and the NCI PDQ summary finds no randomised trial showing benefit" };
  });
}

// ---------------------------------------------------------------- 34. cancer neuroscience: cutting the nerve supply
export function nerveTumourDenervation(): Mesh {
  const sc = scene();
  const T: Vec3 = [0.6, -0.2, 0];
  const tumour = put(sc, "tumour", blob(0.75, "hot"), { at: T });
  const nerves: Part[] = []; const NPATH: Vec3[][] = [[[-2.5, 1.2, 0], [-1.6, 0.9, 0.1], [-0.8, 0.5, 0.1], [T[0] - 0.4, T[1] + 0.3, 0.2]], [[-2.5, -0.3, 0], [-1.7, -0.4, 0.1], [-0.9, -0.5, 0.15], [T[0] - 0.5, T[1] - 0.3, 0.2]], [[-2.5, -1.5, 0], [-1.6, -1.3, 0.1], [-0.7, -0.9, 0.15], [T[0] - 0.3, T[1] - 0.6, 0.2]]]; NPATH.forEach((p, i) => nerves.push(put(sc, `nv${i}`, polyline(p, "accent"))));
  const twigs: Part[] = []; for (let i = 0; i < 4; i++) twigs.push(put(sc, `tw${i}`, line([T[0] - 0.3, T[1] + 0.2 - 0.2 * i, 0.3], [T[0] + 0.2 + 0.1 * (i % 2), T[1] + 0.3 - 0.25 * i, 0.4], "accent")));
  const sig: Part[] = []; for (let i = 0; i < 6; i++) sig.push(put(sc, `sg${i}`, dots([[0, 0, 0]], "accent"), { at: NPATH[i % 3][0] }));
  const recs: Part[] = []; for (let i = 0; i < 3; i++) recs.push(put(sc, `rc${i}`, ring(0.09, 6, "accent", "z"), { at: [T[0] - 0.55 + 0.05 * i, T[1] + 0.3 - 0.45 * i, 0.3] }));
  const caps: Part[] = []; for (let i = 0; i < 3; i++) caps.push(put(sc, `cap${i}`, capsule(0.9, "soft"), { at: [2.3, 1.5 - 0.3 * i, 0.2] }));
  const blocks: Part[] = []; for (let i = 0; i < 3; i++) blocks.push(put(sc, `bl${i}`, cross([T[0] - 0.55 + 0.05 * i, T[1] + 0.3 - 0.45 * i, 0.35], 0.1, "soft")));
  const syr = put(sc, "syr", syringe(0.55, "soft"), { at: [-1.4, 1.6, 0.3], rotZ: -2.2 });
  const cut = put(sc, "cut", cross([-1.2, -0.45, 0.2], 0.16, "soft"));
  const trialDocs: Part[] = []; for (let i = 0; i < 3; i++) trialDocs.push(put(sc, `td${i}`, doc(0.5, 0.55, 3, "soft"), { at: [1.4 + 0.6 * i, -1.6, 0] }));
  const bio = put(sc, "bio", bar(2.75, 0.8, 0.22, "accent"), { at: [0, -0.9, 0] });
  const survX = put(sc, "survX", cross([2.75, 0.4, 0.2], 0.18));
  sc.mesh.labels = [L([T[0], T[1] + 1.1, 0], "Tumour recruits its own nerve supply"), L([-2.0, 1.75, 0], "Adrenergic and cholinergic fibres"), L([2.3, 2.0, 0.2], "Perioperative propranolol"), L([2.0, -2.15, 0], "Biomarker endpoints only, so far")];
  const base = sc.mesh.points;
  const along = (i: number, v: number): Vec3 => { const p = NPATH[i % 3]; const k = v * 3; const j = Math.min(2, Math.floor(k)); return lerp3(p[j], p[j + 1], k - j); };
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...caps, ...blocks, syr, cut, ...trialDocs, bio, survX);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); nerves.forEach((n, i) => grow(alpha, n, clamp(u * 1.5 - 0.15 * i))); twigs.forEach((w, i) => setAlpha(alpha, w, clamp(u * 3 - 2 - 0.2 * i))); sig.forEach((d, i) => { const v = (t * 3 + i / 6) % 1; setAlpha(alpha, d, clamp(u * 2 - 1) * (1 - v * 0.5)); const p = along(i, v); moveTo(pts, base, d, NPATH[i % 3][0], p, 1); }); setAlpha(alpha, tumour, 0.6 + 0.4 * u * pulse(t, 4)); movePart(pts, base, tumour, [0, 0, 0], 0.8 + 0.2 * u); show(alpha, 0.5 + 0.5 * u, ...recs); return { caption: "1 · Nerves infiltrate the tumour and adrenergic and cholinergic endings feed growth and survival signals to tumour and stromal cells; perineural invasion has long been a bad prognostic sign" }; }
    if (s === 1) { const u = Q(t, 1); sig.forEach((d, i) => { const v = (t * 3 + i / 6) % 1; setAlpha(alpha, d, 1 - v * 0.5); moveTo(pts, base, d, NPATH[i % 3][0], along(i, v), 1); }); movePart(pts, base, tumour, [0, 0, 0], 1); show(alpha, 1, ...recs); caps.forEach((c, i) => { setAlpha(alpha, c, 1); moveTo(pts, base, c, [2.3, 1.5 - 0.3 * i, 0.2], [T[0] - 0.55 + 0.05 * i, T[1] + 0.55 - 0.45 * i, 0.5], clamp(u * 1.4 - 0.1 * i)); }); blocks.forEach((b, i) => setAlpha(alpha, b, clamp(u * 3 - 2 - 0.2 * i))); return { caption: "2 · Beta-blockers such as propranolol occupy the adrenergic receptors so the signal stops; the drugs are cheap, long established and indifferent to tumour genotype" }; }
    if (s === 2) { const u = Q(t, 2); sig.forEach((d, i) => { const v = Math.min((0.3 + i / 6) % 1, 0.6); setAlpha(alpha, d, 0.4 * (1 - u)); moveTo(pts, base, d, NPATH[i % 3][0], along(i, v), 1); }); movePart(pts, base, tumour, [0, 0, 0], 1 - 0.15 * u); setAlpha(alpha, tumour, 1 - 0.3 * u); show(alpha, 0.6, ...recs, ...blocks); caps.forEach((c, i) => { setAlpha(alpha, c, 0.6); moveTo(pts, base, c, [2.3, 1.5 - 0.3 * i, 0.2], [T[0] - 0.55 + 0.05 * i, T[1] + 0.55 - 0.45 * i, 0.5], 1); }); setAlpha(alpha, syr, clamp(u * 2)); moveTo(pts, base, syr, [-1.4, 1.6, 0.3], [-1.3, 0.05, 0.3], clamp(u * 1.5)); setAlpha(alpha, cut, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, nerves[1], 1 - 0.7 * clamp(u * 2 - 1)); return { caption: "3 · Botulinum toxin injected into the nerve supply is chemical denervation, trialled in gastric cancer; surgery is the other route" }; }
    const u = Q(t, 3); sig.forEach((d, i) => { setAlpha(alpha, d, 0); moveTo(pts, base, d, NPATH[i % 3][0], along(i, 0.3), 1); }); movePart(pts, base, tumour, [0, 0, 0], 0.85); setAlpha(alpha, tumour, 0.7); show(alpha, 0.6, ...recs, ...blocks, ...caps, syr, cut); caps.forEach((c, i) => moveTo(pts, base, c, [2.3, 1.5 - 0.3 * i, 0.2], [T[0] - 0.55 + 0.05 * i, T[1] + 0.55 - 0.45 * i, 0.5], 1)); moveTo(pts, base, syr, [-1.4, 1.6, 0.3], [-1.3, 0.05, 0.3], 1); setAlpha(alpha, nerves[1], 0.3);
    cascade(alpha, trialDocs, clamp(u * 1.5)); setAlpha(alpha, bio, clamp(u * 2 - 0.5)); setAlpha(alpha, survX, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4)));
    return { caption: "4 · Trials of perioperative propranolol in prostate cancer (NCT05679193, completed) and pancreatic cancer (NCT06145074), and beta-blockade with a COX-2 inhibitor in ovarian cancer (NCT06839144), have shown effects on biomarkers, not survival" };
  });
}

// ---------------------------------------------------------------- 35. fertility-sparing hormonal treatment of early endometrial cancer
export function fertilitySparingEndometrial(): Mesh {
  const sc = scene();
  const U: Vec3 = [-0.8, 0.2, 0];
  const uterus = put(sc, "uterus", ellipsoid(0.95, 1.05, 0.7, 5, 10, "soft", true), { at: U });
  put(sc, "cervix", cylinder(0.3, 0.5, 8, 2, "soft", false, true), { at: [U[0], U[1] - 1.2, 0] });
  const lining = put(sc, "lining", ellipsoid(0.5, 0.65, 0.35, 4, 8, "accent", true), { at: U });
  const tumour = put(sc, "tumour", blob(0.22), { at: [U[0] + 0.15, U[1] + 0.35, 0.3] });
  const mri = put(sc, "mri", ring(1.35, 16, "accent", "z"), { at: U });
  const caps: Part[] = []; for (let i = 0; i < 3; i++) caps.push(put(sc, `cap${i}`, capsule(1, "accent"), { at: [1.6, 1.6 - 0.3 * i, 0.2] }));
  const iud = put(sc, "iud", polyline([[U[0] - 0.3, U[1] + 0.35, 0.4], [U[0] + 0.3, U[1] + 0.35, 0.4]], "accent"));
  const iud2 = put(sc, "iud2", polyline([[U[0], U[1] + 0.35, 0.4], [U[0], U[1] - 0.45, 0.4]], "accent"));
  const biopsy = put(sc, "biopsy", syringe(0.5, "soft"), { at: [U[0], U[1] - 2.0, 0.3] });
  const cr0 = put(sc, "cr0", bar(1.4, 1.0, 0.24, "accent"), { at: [0, -1.85, 0] });
  const rec = put(sc, "rec", bar(1.8, 0.4, 0.24, "hot"), { at: [0, -1.85, 0] });
  const baby = put(sc, "baby", sphere(0.28, 4, 8, "accent", true), { at: [U[0], U[1] - 0.05, 0.3] });
  const lb = put(sc, "lb", bar(2.3, 0.5, 0.24, "accent"), { at: [0, -1.85, 0] });
  const knife = put(sc, "knife", polyline([[2.0, 1.1, 0.1], [2.6, 1.1, 0.1], [2.75, 1.02, 0.1]], "soft"));
  const later = put(sc, "later", ticks(1.9, 2.8, 0.75, 3, "soft"));
  sc.mesh.labels = [L([U[0], U[1] + 1.55, 0], "Grade 1 endometrioid, no myometrial invasion on MRI, PR-positive"), L([1.6, 2.05, 0.2], "Megestrol or medroxyprogesterone, or a levonorgestrel IUD"), L([1.85, -2.2, 0], "CR ~70-80% at 12 months, recurrence ~30%, live birth ~30-40%"), L([2.4, 1.45, 0.1], "Hysterectomy after childbearing")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...caps, iud, iud2, biopsy, cr0, rec, baby, lb, knife, later);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, mri, clamp(u * 2) * (0.4 + 0.6 * pulse(t, 4))); movePart(pts, base, mri, [0, 0, 0], 1.3 - 0.3 * clamp(u * 2)); setAlpha(alpha, tumour, 0.6 + 0.4 * pulse(t, 5)); setAlpha(alpha, lining, 0.8); return { caption: "1 · The candidate is a young woman with grade 1 endometrioid carcinoma confined to the endometrium on MRI, progesterone-receptor positive, with no myometrial invasion" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, mri, 0.3); setAlpha(alpha, lining, 0.8); caps.forEach((c, i) => { setAlpha(alpha, c, 1 - 0.5 * clamp(u * 3 - 2)); moveTo(pts, base, c, [1.6, 1.6 - 0.3 * i, 0.2], [U[0] + 0.1 - 0.1 * i, U[1] + 0.1 * i, 0.5], clamp(u * 1.5 - 0.1 * i)); }); grow(alpha, iud, clamp(u * 3 - 1)); grow(alpha, iud2, clamp(u * 3 - 1.5)); return { caption: "2 · Oral megestrol or medroxyprogesterone, or a levonorgestrel IUD placed in the uterus, often with metformin or hysteroscopic resection, drives differentiation and apoptosis of the hormone-responsive cancer cells" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, mri, 0.3); caps.forEach((c, i) => { setAlpha(alpha, c, 0.5); moveTo(pts, base, c, [1.6, 1.6 - 0.3 * i, 0.2], [U[0] + 0.1 - 0.1 * i, U[1] + 0.1 * i, 0.5], 1); }); show(alpha, 1, iud, iud2); setAlpha(alpha, tumour, 1 - 0.85 * u); movePart(pts, base, tumour, [0, 0, 0], 1 - 0.7 * u); setAlpha(alpha, biopsy, 1); moveTo(pts, base, biopsy, [U[0], U[1] - 2.0, 0.3], [U[0], U[1] - 1.2, 0.3], 0.5 + 0.5 * Math.sin(t * TAU * 2)); setAlpha(alpha, cr0, clamp(u * 2 - 0.5)); setAlpha(alpha, rec, clamp(u * 2 - 1)); return { caption: "3 · Under close endometrial sampling, complete response is about 70-80% at 12 months; about 30% recur, so imaging and biopsy surveillance is strict" }; }
    const u = Q(t, 3); setAlpha(alpha, mri, 0.3); caps.forEach((c, i) => { setAlpha(alpha, c, 0.4); moveTo(pts, base, c, [1.6, 1.6 - 0.3 * i, 0.2], [U[0] + 0.1 - 0.1 * i, U[1] + 0.1 * i, 0.5], 1); }); show(alpha, 1 - 0.7 * u, iud, iud2); setAlpha(alpha, tumour, 0.15); movePart(pts, base, tumour, [0, 0, 0], 0.3); setAlpha(alpha, biopsy, 0.4); moveTo(pts, base, biopsy, [U[0], U[1] - 2.0, 0.3], [U[0], U[1] - 1.2, 0.3], 0.3); show(alpha, 1, cr0, rec);
    setAlpha(alpha, baby, clamp(u * 2)); movePart(pts, base, baby, [0, 0, 0], 0.3 + 0.7 * clamp(u * 2)); setAlpha(alpha, uterus, 1); setAlpha(alpha, lb, clamp(u * 2 - 0.5)); setAlpha(alpha, knife, clamp(u * 2 - 1)); grow(alpha, later, clamp(u * 2 - 1));
    return { caption: "4 · Live-birth rates of about 30-40% with assisted reproduction; hysterectomy is recommended once childbearing is complete, and grade 2-3, p53-abnormal or invasive disease is not eligible" };
  });
}

// ---------------------------------------------------------------- 36. financial toxicity and financial navigation
export function financialNavigation(): Mesh {
  const sc = scene();
  const P: Vec3 = [-1.9, -0.1, 0];
  put(sc, "patient", figure("soft"), { at: P });
  const wallet = put(sc, "wallet", box(0.6, 0.4, 0.2, "accent", true), { at: [P[0], P[1] - 1.5, 0.2] });
  const sav = put(sc, "sav", bar(-0.9, 1.3, 0.28, "accent"), { at: [0, -1.85, 0] });
  const bills: Part[] = []; for (let i = 0; i < 4; i++) bills.push(put(sc, `bill${i}`, doc(0.45, 0.55, 3, "hot"), { at: [0.2 + 0.25 * i, 1.4 - 0.1 * i, -0.05 * i] }));
  const screen = put(sc, "screen", quad(0.8, 0.55, "accent"), { at: [0.3, -0.1, 0] });
  const screenLines = put(sc, "scrLines", ticks(-0.25, 0.25, -0.1, 3, "soft"), { at: [0.3, 0, 0.02] });
  const nav = put(sc, "nav", figure("accent"), { at: [1.3, -0.1, -0.3], scale: 0.85 });
  const boxes: Part[] = []; for (let i = 0; i < 3; i++) boxes.push(put(sc, `bx${i}`, box(0.6, 0.45, 0.4, "soft", true), { at: [2.4, 1.2 - 0.85 * i, 0] }));
  const links: Part[] = []; for (let i = 0; i < 3; i++) links.push(put(sc, `lk${i}`, arrow([1.6, -0.1, 0.1], [2.05, 1.2 - 0.85 * i, 0.1], "accent", 0.1)));
  const relief: Part[] = []; for (let i = 0; i < 3; i++) relief.push(put(sc, `rl${i}`, octahedron(0.08, "accent", true), { at: [2.4, 1.2 - 0.85 * i, 0.3] }));
  const dis0 = put(sc, "dis0", bar(0.9, 1.1, 0.26, "hot"), { at: [0, -1.85, 0] });
  const dis1 = put(sc, "dis1", bar(1.25, 0.6, 0.26, "accent"), { at: [0, -1.85, 0] });
  const price = put(sc, "price", polyline([[1.9, -1.4, 0], [2.7, -1.4, 0], [2.7, -0.9, 0], [1.9, -0.9, 0]], "hot", true));
  const priceX = put(sc, "priceX", cross([2.3, -1.15, 0.1], 0.14, "soft"));
  sc.mesh.labels = [L([P[0], P[1] + 1.3, 0], "Savings gone within two years for about 40% of US patients"), L([0.6, 1.95, 0], "Drug prices, cost-sharing, lost income, travel"), L([2.4, 1.85, 0], "Assistance programmes, insurance, legal help"), L([1.1, -2.25, 0], "Distress down, debt down (CAFÉ 2024)")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, screen, screenLines, nav, ...boxes, ...links, ...relief, dis0, dis1, price, priceX);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); bills.forEach((b, i) => { const v = clamp(u * 2.5 - 0.4 * i); setAlpha(alpha, b, v); moveTo(pts, base, b, [0.2 + 0.25 * i, 1.4 - 0.1 * i, -0.05 * i], [P[0] + 0.7 + 0.15 * i, P[1] + 0.6 - 0.1 * i, 0.2 - 0.05 * i], v); }); setAlpha(alpha, sav, 1); movePart(pts, base, sav, [0, -1.3 * 0.6 * u, 0], 1); alpha[sav.s0] = 1; setAlpha(alpha, wallet, 1 - 0.5 * u); return { caption: "1 · Cancer treatment can bankrupt an insured patient: about 40% of US patients deplete their savings within two years, and cancer patients are 2.65 times more likely to declare bankruptcy, which itself predicts mortality" }; }
    if (s === 1) { const u = Q(t, 1); bills.forEach((b, i) => { setAlpha(alpha, b, 1); moveTo(pts, base, b, [0.2 + 0.25 * i, 1.4 - 0.1 * i, -0.05 * i], [P[0] + 0.7 + 0.15 * i, P[1] + 0.6 - 0.1 * i, 0.2 - 0.05 * i], 1); }); movePart(pts, base, sav, [0, -0.78, 0], 1); setAlpha(alpha, wallet, 0.5); setAlpha(alpha, screen, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 5))); setAlpha(alpha, screenLines, clamp(u * 2 - 0.5)); setAlpha(alpha, nav, clamp(u * 2 - 0.5)); movePart(pts, base, nav, [0.5 * (1 - clamp(u * 2 - 0.5)), 0, 0], 1); return { caption: "2 · Treat cost as a side effect: screen every patient routinely and quantify it with a validated tool such as COST-FACIT, then assign a trained navigator" }; }
    if (s === 2) { const u = Q(t, 2); bills.forEach((b, i) => { setAlpha(alpha, b, 1 - 0.5 * clamp(u * 2 - 0.3 * i)); moveTo(pts, base, b, [0.2 + 0.25 * i, 1.4 - 0.1 * i, -0.05 * i], [P[0] + 0.7 + 0.15 * i, P[1] + 0.6 - 0.1 * i, 0.2 - 0.05 * i], 1); }); movePart(pts, base, sav, [0, -0.78, 0], 1); setAlpha(alpha, wallet, 0.5); show(alpha, 1, screen, screenLines, nav); links.forEach((l, i) => grow(alpha, l, clamp(u * 2 - 0.3 * i))); boxes.forEach((b, i) => setAlpha(alpha, b, clamp(u * 2 - 0.3 * i))); relief.forEach((r, i) => { const v = clamp(u * 2 - 1 - 0.2 * i); setAlpha(alpha, r, v); moveTo(pts, base, r, [2.4, 1.2 - 0.85 * i, 0.3], [P[0] + 0.1, P[1] - 1.4, 0.4], v); }); return { caption: "3 · Navigators connect patients to pharmaceutical assistance programmes, insurance optimisation and legal help, hold medication cost conversations, and steer toward equally effective lower-cost options" }; }
    const u = Q(t, 3); bills.forEach((b, i) => { setAlpha(alpha, b, 0.4); moveTo(pts, base, b, [0.2 + 0.25 * i, 1.4 - 0.1 * i, -0.05 * i], [P[0] + 0.7 + 0.15 * i, P[1] + 0.6 - 0.1 * i, 0.2 - 0.05 * i], 1); }); movePart(pts, base, sav, [0, -0.78 + 0.3 * u, 0], 1); setAlpha(alpha, wallet, 0.5 + 0.5 * u); show(alpha, 0.7, screen, screenLines, nav, ...boxes, ...links); relief.forEach((r, i) => { setAlpha(alpha, r, 1); moveTo(pts, base, r, [2.4, 1.2 - 0.85 * i, 0.3], [P[0] + 0.1, P[1] - 1.4, 0.4], 1); });
    setAlpha(alpha, dis0, clamp(u * 2)); setAlpha(alpha, dis1, clamp(u * 2 - 0.5)); setAlpha(alpha, price, clamp(u * 2 - 1)); setAlpha(alpha, priceX, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4)));
    return { caption: "4 · Randomised and pragmatic trials (CAFÉ, 2024) show less financial distress and more assistance taken up, recovering funds well beyond programme cost; the root cause, drug and service prices, is untouched, and LMIC households remain largely unaddressed" };
  });
}

// ---------------------------------------------------------------- 37. frozen gloves, socks and compression for taxane nail and nerve damage
export function frozenGlovesCompression(): Mesh {
  const sc = scene();
  const HA: Vec3 = [-1.4, -0.2, 0], HB: Vec3 = [1.4, -0.2, 0];
  put(sc, "handA", hand("soft"), { at: HA, scale: 1.3 });
  put(sc, "handB", hand("soft"), { at: HB, scale: 1.3 });
  const nailsA: Part[] = []; for (let i = 0; i < 4; i++) nailsA.push(put(sc, `na${i}`, quad(0.1, 0.12, "soft"), { at: [HA[0] + (-0.24 + 0.16 * i) * 1.3, HA[1] + (0.6 + (i === 1 || i === 2 ? 0.1 : 0)) * 1.3, 0.05] }));
  const nailsB: Part[] = []; for (let i = 0; i < 4; i++) nailsB.push(put(sc, `nb${i}`, quad(0.1, 0.12, "soft"), { at: [HB[0] + (-0.24 + 0.16 * i) * 1.3, HB[1] + (0.6 + (i === 1 || i === 2 ? 0.1 : 0)) * 1.3, 0.05] }));
  const vesA: Part[] = []; for (let i = 0; i < 3; i++) vesA.push(put(sc, `va${i}`, ring(0.08, 8, "hot", "y"), { at: [HA[0] - 0.2 + 0.2 * i, HA[1] - 0.1, 0.12] }));
  const vesB: Part[] = []; for (let i = 0; i < 3; i++) vesB.push(put(sc, `vb${i}`, ring(0.08, 8, "hot", "y"), { at: [HB[0] - 0.2 + 0.2 * i, HB[1] - 0.1, 0.12] }));
  const bag = put(sc, "bag", vial(0.2, 0.55, "hot"), { at: [0, 1.7, 0] });
  const drugA: Part[] = []; for (let i = 0; i < 4; i++) drugA.push(put(sc, `da${i}`, octahedron(0.06, "hot"), { at: [0, 1.4, 0] }));
  const drugB: Part[] = []; for (let i = 0; i < 4; i++) drugB.push(put(sc, `db${i}`, octahedron(0.06, "hot"), { at: [0, 1.4, 0] }));
  const glove = put(sc, "glove", box(1.1, 1.5, 0.5, "accent", true), { at: [HA[0], HA[1] + 0.25, 0.1] });
  const frost: Part[] = []; for (let i = 0; i < 3; i++) frost.push(put(sc, `fr${i}`, ring(0.9 + 0.1 * i, 12, "accent", "z"), { at: [HA[0], HA[1] + 0.25, 0.1] }));
  const dmgB: Part[] = []; for (let i = 0; i < 4; i++) dmgB.push(put(sc, `dm${i}`, cross([HB[0] + (-0.24 + 0.16 * i) * 1.3, HB[1] + (0.6 + (i === 1 || i === 2 ? 0.1 : 0)) * 1.3, 0.1], 0.06)));
  const nerveB = put(sc, "nerveB", polyline([[HB[0] - 0.3, HB[1] - 0.45, 0.12], [HB[0] - 0.1, HB[1] - 0.3, 0.12], [HB[0] + 0.1, HB[1] - 0.45, 0.12], [HB[0] + 0.3, HB[1] - 0.3, 0.12]], "hot"));
  const tight = put(sc, "tight", polyline([[HA[0] - 0.5, HA[1] - 0.4, 0.15], [HA[0] - 0.5, HA[1] + 0.95, 0.15], [HA[0] + 0.5, HA[1] + 0.95, 0.15], [HA[0] + 0.5, HA[1] - 0.4, 0.15]], "accent", true));
  const oxali = put(sc, "oxali", capsule(1.1, "soft"), { at: [0, -1.7, 0] });
  const oxaliX = put(sc, "oxaliX", cross([0, -1.7, 0.15], 0.2));
  sc.mesh.labels = [L([HA[0], HA[1] + 1.55, 0], "Frozen glove, or a tight surgical glove"), L([HB[0], HB[1] + 1.55, 0], "Ungloved control hand"), L([0, 2.35, 0], "Docetaxel or paclitaxel at peak"), L([0, -2.15, 0], "Not with oxaliplatin; frostbite risk")];
  const base = sc.mesh.points;
  const nailA = (i: number): Vec3 => [HA[0] + (-0.24 + 0.16 * i) * 1.3, HA[1] + (0.6 + (i === 1 || i === 2 ? 0.1 : 0)) * 1.3, 0.1];
  const nailB = (i: number): Vec3 => [HB[0] + (-0.24 + 0.16 * i) * 1.3, HB[1] + (0.6 + (i === 1 || i === 2 ? 0.1 : 0)) * 1.3, 0.1];
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...drugA, ...drugB, glove, ...frost, ...dmgB, nerveB, tight, oxali, oxaliX);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, bag, 1); [...drugA, ...drugB].forEach((d, i) => { const v = (t * 3 + i / 8) % 1; setAlpha(alpha, d, clamp(u * 2) * (1 - v * 0.3)); moveTo(pts, base, d, [0, 1.4, 0], i < 4 ? nailA(i) : nailB(i - 4), v); }); show(alpha, 0.6 + 0.4 * pulse(t, 5), ...vesA, ...vesB); return { caption: "1 · During a taxane infusion the drug peaks in the blood for a short window and is carried into the nail matrix and the fine nerve endings of the hands and feet" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, bag, 1); setAlpha(alpha, glove, clamp(u * 2) * 0.7); frost.forEach((f, i) => setAlpha(alpha, f, clamp(u * 2 - 0.3 * i) * 0.6 * pulse(t + i * 0.1, 3))); vesA.forEach((v) => { setAlpha(alpha, v, 1); movePart(pts, base, v, [0, 0, 0], 1 - 0.6 * u); }); show(alpha, 1, ...vesB); [...drugA, ...drugB].forEach((d, i) => { const v = (t * 3 + i / 8) % 1; const gloved = i < 4; setAlpha(alpha, d, gloved ? (1 - v) * (1 - 0.8 * u) : 1 - v * 0.3); moveTo(pts, base, d, [0, 1.4, 0], gloved ? nailA(i) : nailB(i - 4), gloved ? Math.min(v, 1 - 0.6 * u) : v); }); return { caption: "2 · A frozen glove and sock, as with scalp cooling, constrict the local vessels for the duration of the infusion, so far less drug reaches the nail beds and nerves on that side" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, bag, 0.6); setAlpha(alpha, glove, 0.7); show(alpha, 0.4, ...frost); vesA.forEach((v) => { setAlpha(alpha, v, 1); movePart(pts, base, v, [0, 0, 0], 0.4); }); show(alpha, 1, ...vesB); drugA.forEach((d, i) => { setAlpha(alpha, d, 0.2); moveTo(pts, base, d, [0, 1.4, 0], nailA(i), 0.4); }); drugB.forEach((d, i) => { setAlpha(alpha, d, 0.8); moveTo(pts, base, d, [0, 1.4, 0], nailB(i), 1); }); dmgB.forEach((x, i) => setAlpha(alpha, x, clamp(u * 3 - 0.5 * i))); nailsB.forEach((n) => setAlpha(alpha, n, 1 - 0.5 * u)); grow(alpha, nerveB, clamp(u * 2 - 0.5)); return { caption: "3 · In a multicentre docetaxel study nail toxicity was markedly lower on the gloved hand than the control hand; in 36 women on weekly paclitaxel (Hanai, JNCI 2018) objective and subjective neuropathy were lower on the cooled side" }; }
    const u = Q(t, 3); setAlpha(alpha, bag, 0.6); setAlpha(alpha, glove, 0.7 * (1 - 0.5 * u)); show(alpha, 0.4 * (1 - u), ...frost); vesA.forEach((v) => { setAlpha(alpha, v, 1); movePart(pts, base, v, [0, 0, 0], 0.4); }); show(alpha, 1, ...vesB); drugA.forEach((d, i) => { setAlpha(alpha, d, 0.2); moveTo(pts, base, d, [0, 1.4, 0], nailA(i), 0.4); }); drugB.forEach((d, i) => { setAlpha(alpha, d, 0.8); moveTo(pts, base, d, [0, 1.4, 0], nailB(i), 1); }); show(alpha, 1, ...dmgB, nerveB); show(alpha, 0.5, ...nailsB);
    setAlpha(alpha, tight, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, oxali, clamp(u * 2 - 0.5)); setAlpha(alpha, oxaliX, clamp(u * 2 - 1));
    return { caption: "4 · Tight surgical gloves give similar protection with more comfort, and trials comparing cooling, compression and both are ongoing; SIO-ASCO 2022 says either may be offered with low certainty. Prolonged cold risks frostbite, and oxaliplatin is a contraindication" };
  });
}

// ---------------------------------------------------------------- 38. gastric cancer endoscopic screening (East Asia)
export function gastricEndoscopicScreening(): Mesh {
  const sc = scene();
  const ST: Vec3 = [0.4, -0.1, 0];
  const stomach = put(sc, "stomach", organ(1.1, 0.8, 0.7), { at: ST, rotZ: -0.4 });
  put(sc, "oes", tube(0.16, 1.1, "soft"), { at: [ST[0] - 1.0, ST[1] + 1.0, 0], rotZ: 1.1 });
  const lesion = put(sc, "lesion", blob(0.14), { at: [ST[0] + 0.35, ST[1] + 0.25, 0.55] });
  const cohort: Part[] = []; for (let i = 0; i < 3; i++) cohort.push(put(sc, `co${i}`, figure("soft"), { at: [-2.4 + 0.55 * i, 0.9, -0.3 * i], scale: 0.55 }));
  const cal = put(sc, "cal", ticks(-2.6, -1.2, -0.3, 3, "accent"));
  const scope = put(sc, "scope", polyline([[ST[0] - 2.1, ST[1] + 2.1, 0.1], [ST[0] - 1.4, ST[1] + 1.55, 0.1], [ST[0] - 0.8, ST[1] + 0.8, 0.2], [ST[0] - 0.2, ST[1] + 0.3, 0.4], [ST[0] + 0.25, ST[1] + 0.25, 0.5]], "accent"));
  const light = put(sc, "light", cone(0.2, 0.3, 8, "accent", false), { at: [ST[0] + 0.3, ST[1] + 0.25, 0.55], rotX: Math.PI / 2 });
  const snare = put(sc, "snare", ring(0.2, 10, "accent", "z"), { at: [ST[0] + 0.35, ST[1] + 0.25, 0.6] });
  const stage: Part[] = []; const SH = [1.1, 0.45, 0.3, 0.2]; for (let i = 0; i < 4; i++) stage.push(put(sc, `sg${i}`, bar(1.8 + 0.3 * i, SH[i], 0.22, i === 0 ? "accent" : "soft"), { at: [0, -1.9, 0] }));
  const m0 = put(sc, "m0", bar(-2.2, 1.0, 0.24, "hot"), { at: [0, -1.9, 0] });
  const m1 = put(sc, "m1", bar(-1.8, 0.53, 0.24, "accent"), { at: [0, -1.9, 0] });
  const hp = put(sc, "hp", helix(0.06, 0.4, 3, 12, "hot"), { at: [2.5, 1.5, 0], rotZ: Math.PI / 2 });
  const hpX = put(sc, "hpX", cross([2.5, 1.5, 0.15], 0.2, "accent"));
  const rct = put(sc, "rct", doc(0.5, 0.55, 3, "soft"), { at: [2.5, 0.5, 0] });
  const rctX = put(sc, "rctX", cross([2.5, 0.5, 0.1], 0.18));
  sc.mesh.labels = [L([-1.85, 1.75, 0], "Korea: everyone aged 40 and over, every two years"), L([ST[0], ST[1] - 1.15, 0], "Early lesion removed through the endoscope"), L([2.2, -2.25, 0], "Over half now stage I; mortality 47% lower"), L([2.5, 2.0, 0], "Low-incidence countries: H. pylori test-and-treat instead")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, scope, light, snare, ...stage, m0, m1, hp, hpX, rct, rctX);
    setAlpha(alpha, stomach, 0.8);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cohort.forEach((c, i) => { setAlpha(alpha, c, clamp(u * 3 - 0.5 * i)); movePart(pts, base, c, [0, 0.3 * (1 - clamp(u * 3 - 0.5 * i)), 0], 1); }); grow(alpha, cal, clamp(u * 2 - 0.5)); setAlpha(alpha, lesion, 0.3 + 0.4 * u); return { caption: "1 · Where stomach cancer is common, screening is population-wide: Korea has offered biennial upper endoscopy (or barium X-ray) to everyone aged 40 and over since 1999; Japan added endoscopy for those 50 and over in 2016" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 0.5, ...cohort, cal); grow(alpha, scope, clamp(u * 1.4)); setAlpha(alpha, light, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 6))); setAlpha(alpha, lesion, 0.7 + 0.3 * clamp(u * 2 - 1) * pulse(t, 5)); return { caption: "2 · The camera passes down the oesophagus and inspects the whole stomach lining, biopsying suspicious areas; the slow progression from atrophic gastritis through intestinal metaplasia gives a long window" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.5, ...cohort, cal); setAlpha(alpha, scope, 1); setAlpha(alpha, light, 0.5); setAlpha(alpha, snare, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 5))); movePart(pts, base, snare, [0, 0, 0], 1.6 - 0.9 * clamp(u * 2)); setAlpha(alpha, lesion, 1 - 0.85 * clamp(u * 2 - 1)); movePart(pts, base, lesion, [0, 0.4 * clamp(u * 2 - 1), 0.3 * clamp(u * 2 - 1)], 1 - 0.5 * clamp(u * 2 - 1)); stage.forEach((b, i) => setAlpha(alpha, b, clamp(u * 3 - 1 - 0.3 * i))); return { caption: "3 · Early cancers are removed by endoscopic submucosal dissection rather than gastrectomy; over half of Korean gastric cancers are now diagnosed at stage I" }; }
    const u = Q(t, 3); show(alpha, 0.5, ...cohort, cal); setAlpha(alpha, scope, 0.6); setAlpha(alpha, light, 0.3); setAlpha(alpha, snare, 0.5); movePart(pts, base, snare, [0, 0, 0], 0.7); setAlpha(alpha, lesion, 0.15); movePart(pts, base, lesion, [0, 0.4, 0.3], 0.5); show(alpha, 1, ...stage);
    setAlpha(alpha, m0, clamp(u * 2)); setAlpha(alpha, m1, clamp(u * 2 - 0.4)); setAlpha(alpha, rct, clamp(u * 2 - 0.8)); setAlpha(alpha, rctX, clamp(u * 2 - 1)); setAlpha(alpha, hp, clamp(u * 2 - 1)); setAlpha(alpha, hpX, clamp(u * 2 - 1.2) * (0.6 + 0.4 * pulse(t, 4)));
    return { caption: "4 · A Korean nested case-control study (Gastroenterology 2017) found 47% lower gastric cancer mortality, but there is no randomised trial and it is cost-effective only at high incidence; elsewhere Helicobacter pylori test-and-treat prevents rather than detects" };
  });
}

// ---------------------------------------------------------------- 39. generic oncology drug supply and shortage mitigation
export function genericDrugShortage(): Mesh {
  const sc = scene();
  const V: Vec3 = [0, 0.5, 0];
  const cis = put(sc, "cis", vial(0.32, 0.9, "accent"), { at: V });
  const shelf = put(sc, "shelf", box(2.2, 0.08, 0.7, "soft", true), { at: [V[0], V[1] - 0.5, 0] });
  const others: Part[] = []; for (let i = 0; i < 4; i++) others.push(put(sc, `ov${i}`, vial(0.18, 0.55, "soft"), { at: [V[0] - 0.9 + 0.6 * i + (i >= 2 ? 0.6 : 0), V[1] - 0.2, 0.05] }));
  const plants: Part[] = []; for (let i = 0; i < 3; i++) plants.push(put(sc, `pl${i}`, building(0.7, 0.55, i === 1 ? "hot" : "soft"), { at: [-2.4 + 0.85 * i, 1.85, -0.3] }));
  const feeds: Part[] = []; for (let i = 0; i < 3; i++) feeds.push(put(sc, `fd${i}`, arrow([-2.4 + 0.85 * i, 1.55, -0.2], [V[0] - 0.2 + 0.2 * i, V[1] + 0.5, 0], "soft", 0.1)));
  const alert = put(sc, "alert", cross([-1.55, 1.85, 0.1], 0.32));
  const supply = put(sc, "supply", bar(2.2, 1.3, 0.26, "accent"), { at: [0, -1.9, 0] });
  const queue: Part[] = []; for (let i = 0; i < 3; i++) queue.push(put(sc, `q${i}`, figure("soft"), { at: [-1.6 - 0.5 * i, -1.2, 0.3 - 0.2 * i], scale: 0.55 }));
  const ration = put(sc, "ration", cross([-1.1, -0.9, 0.4], 0.16));
  const imports = put(sc, "imports", box(0.5, 0.4, 0.4, "accent", true), { at: [2.4, 1.6, 0] });
  const impArrow = put(sc, "impArrow", arrow([2.1, 1.4, 0.1], [V[0] + 0.45, V[1] + 0.35, 0.1], "accent", 0.1));
  const npPlant = put(sc, "np", building(0.7, 0.55, "accent"), { at: [1.5, -0.9, 0] });
  const npFeed = put(sc, "npFeed", arrow([1.2, -0.65, 0.1], [V[0] + 0.3, V[1] - 0.2, 0.1], "accent", 0.1));
  const policy = put(sc, "policy", doc(0.55, 0.6, 3, "soft"), { at: [2.5, -1.8, 0] });
  sc.mesh.labels = [L([V[0], V[1] + 1.0, 0], "Cisplatin and carboplatin: thin margins, few makers"), L([-1.55, 2.45, -0.3], "FDA import alert on one plant (2023)"), L([-2.1, -1.95, 0], "Hospitals ration"), L([2.2, -2.35, 0], "Imports, Civica Rx and Phlow, task force, EU Critical Medicines Act 2025")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, alert, ...queue, ration, imports, impArrow, npPlant, npFeed, policy);
    setAlpha(alpha, shelf, 0.7);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); feeds.forEach((f, i) => { const v = (t * 3 + i / 3) % 1; setAlpha(alpha, f, 0.4 + 0.6 * (1 - v)); }); setAlpha(alpha, supply, 1); movePart(pts, base, supply, [0, 0, 0], 1); setAlpha(alpha, cis, 0.7 + 0.3 * u); return { caption: "1 · Sterile injectable generics (platinums, 5-FU, methotrexate) sell on thin margins and come from only a few manufacturers, so the whole supply hangs on a handful of plants" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, alert, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, plants[1], 0.5); setAlpha(alpha, feeds[1], 0.6 * (1 - clamp(u * 2))); feeds.forEach((f, i) => { if (i !== 1) setAlpha(alpha, f, 0.7); }); for (let i = supply.p0; i < supply.p1; i++) { const p = base[i]; pts[i] = [p[0], -1.9 + (p[1] + 1.9) * (1 - 0.7 * u), p[2]]; } others.forEach((o, i) => setAlpha(alpha, o, 1 - 0.7 * clamp(u * 3 - 0.5 * i))); setAlpha(alpha, cis, 1 - 0.4 * u); return { caption: "2 · In 2023 an FDA import alert on Intas took one plant offline and cisplatin and carboplatin supply collapsed across the United States" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, alert, 0.8); setAlpha(alpha, plants[1], 0.5); setAlpha(alpha, feeds[1], 0); for (let i = supply.p0; i < supply.p1; i++) { const p = base[i]; pts[i] = [p[0], -1.9 + (p[1] + 1.9) * 0.3, p[2]]; } show(alpha, 0.3, ...others); setAlpha(alpha, cis, 0.6); queue.forEach((q, i) => { setAlpha(alpha, q, clamp(u * 3 - 0.5 * i)); movePart(pts, base, q, [0.3 * (1 - clamp(u * 3 - 0.5 * i)), 0, 0], 1); }); setAlpha(alpha, ration, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "3 · Hospitals rationed doses, switched regimens and delayed treatment for curable cancers" }; }
    const u = Q(t, 3); setAlpha(alpha, alert, 0.5); setAlpha(alpha, plants[1], 0.5); setAlpha(alpha, feeds[1], 0); show(alpha, 0.6, ...queue); setAlpha(alpha, ration, 0.4); for (let i = supply.p0; i < supply.p1; i++) { const p = base[i]; pts[i] = [p[0], -1.9 + (p[1] + 1.9) * (0.3 + 0.6 * u), p[2]]; } others.forEach((o, i) => setAlpha(alpha, o, 0.3 + 0.7 * clamp(u * 3 - 0.5 * i))); setAlpha(alpha, cis, 0.6 + 0.4 * u);
    setAlpha(alpha, imports, clamp(u * 3)); grow(alpha, impArrow, clamp(u * 3)); setAlpha(alpha, npPlant, clamp(u * 3 - 1)); grow(alpha, npFeed, clamp(u * 3 - 1)); setAlpha(alpha, policy, clamp(u * 3 - 2));
    return { caption: "4 · Responses: temporary imports (Qilu), non-profit manufacturing by Civica Rx and Phlow, the HHS supply-chain resilience programme and FDA's Drug Shortage Task Force, and Europe's Critical Medicines Act (2025); the economics stay unfavourable and quality problems recur" };
  });
}

// ---------------------------------------------------------------- 40. green tea and EGCG extracts
export function greenTeaEgcg(): Mesh {
  const sc = scene();
  const CUP: Vec3 = [-1.8, -0.2, 0];
  const cup = put(sc, "cup", cylinder(0.4, 0.55, 12, 2, "accent", true, true), { at: CUP });
  put(sc, "saucer", disc(0.6, 12, "soft", "y"), { at: [CUP[0], CUP[1] - 0.3, 0] });
  const leaves: Part[] = []; for (let i = 0; i < 3; i++) leaves.push(put(sc, `lf${i}`, ellipsoid(0.12, 0.05, 0.03, 3, 6, "accent", true), { at: [CUP[0] - 0.15 + 0.15 * i, CUP[1] + 0.3, 0.05], rotZ: 0.5 * i }));
  const steam: Part[] = []; for (let i = 0; i < 3; i++) steam.push(put(sc, `st${i}`, ring(0.08, 6, "soft", "y"), { at: [CUP[0] - 0.15 + 0.15 * i, CUP[1] + 0.45, 0] }));
  const egcg: Part[] = []; for (let i = 0; i < 5; i++) egcg.push(put(sc, `eg${i}`, octahedron(0.08, "accent", true), { at: [CUP[0], CUP[1] + 0.2, 0.1] }));
  const DISH: Vec3 = [0.6, 0.9, 0];
  const dish = put(sc, "dish", disc(0.7, 14, "soft", "y"), { at: [DISH[0], DISH[1] - 0.2, 0] });
  const cellD = put(sc, "cellD", cell(0.35, "hot"), { at: DISH });
  const ros = put(sc, "ros", cloud(6, 0.55, "hot", 3), { at: [DISH[0], DISH[1] + 0.1, 0.2] });
  const gap = put(sc, "gap", polyline([[DISH[0] - 0.9, DISH[1] - 0.9, 0], [DISH[0] + 0.9, DISH[1] - 0.9, 0]], "soft"));
  const gapX = put(sc, "gapX", cross([DISH[0], DISH[1] - 0.9, 0.1], 0.14));
  const scaleBar = put(sc, "scaleBar", polyline([[1.2, -0.9, 0], [2.8, -0.9, 0]], "soft"));
  const pan = put(sc, "pan", line([2.0, -0.9, 0], [2.0, -0.4, 0], "soft"));
  const stack: Part[] = []; for (let i = 0; i < 4; i++) stack.push(put(sc, `sk${i}`, doc(0.4, 0.45, 2, "soft"), { at: [1.4 + 0.12 * i, -0.65 + 0.08 * i, -0.04 * i] }));
  const stack2: Part[] = []; for (let i = 0; i < 4; i++) stack2.push(put(sc, `sk2${i}`, doc(0.4, 0.45, 2, "soft"), { at: [2.6 - 0.12 * i, -0.65 + 0.08 * i, -0.04 * i] }));
  const caps: Part[] = []; for (let i = 0; i < 3; i++) caps.push(put(sc, `cp${i}`, capsule(1.1, "hot"), { at: [-0.5 + 0.35 * i, -1.6, 0] }));
  const liver = put(sc, "liver", organ(0.5, 0.32, 0.28), { at: [1.3, -1.75, 0] });
  const liverX = put(sc, "liverX", ring(0.6, 12, "hot", "z"), { at: [1.3, -1.75, 0.1] });
  const bort = put(sc, "bort", octahedron(0.1, "soft", true), { at: [2.5, -1.75, 0] });
  const bortX = put(sc, "bortX", cross([2.5, -1.75, 0.15], 0.2));
  sc.mesh.labels = [L([CUP[0], CUP[1] - 0.9, 0], "Tea as a beverage: safe"), L([DISH[0], DISH[1] + 0.85, 0], "In vitro catechin effects at doses drinking never reaches"), L([2.0, -0.1, 0], "Cochrane 2020, 142 studies: inconclusive"), L([1.9, -2.3, 0], "Extracts above 800 mg EGCG a day: liver injury; bortezomib interaction")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...egcg, ros, gap, gapX, scaleBar, pan, ...stack, ...stack2, ...caps, liver, liverX, bort, bortX);
    steam.forEach((s, i) => { const v = (t * 6 + i / 3) % 1; setAlpha(alpha, s, 0.6 * (1 - v)); movePart(pts, base, s, [0, 0.35 * v, 0], 1 + v); });
    setAlpha(alpha, dish, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, cup, 1); leaves.forEach((l) => setAlpha(alpha, l, 1)); egcg.forEach((e, i) => { const v = clamp(u * 1.5 - 0.12 * i); setAlpha(alpha, e, v); moveTo(pts, base, e, [CUP[0], CUP[1] + 0.2, 0.1], [DISH[0] - 0.3 + 0.15 * i, DISH[1] + 0.35, 0.3], v, 1, v * 3); }); setAlpha(alpha, cellD, 0.5 + 0.5 * clamp(u * 2 - 1)); setAlpha(alpha, ros, clamp(u * 2 - 1) * 0.7); return { caption: "1 · Epigallocatechin gallate and other catechins scavenge reactive oxygen species and modulate kinases and the proteasome in cells in a dish" }; }
    if (s === 1) { const u = Q(t, 1); egcg.forEach((e, i) => { setAlpha(alpha, e, 1); moveTo(pts, base, e, [CUP[0], CUP[1] + 0.2, 0.1], [DISH[0] - 0.3 + 0.15 * i, DISH[1] + 0.35, 0.3], 1, 1, 3); }); setAlpha(alpha, cellD, 1); setAlpha(alpha, ros, 0.7); grow(alpha, gap, clamp(u * 2)); setAlpha(alpha, gapX, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "2 · The concentrations that do this are not reached by drinking tea, and randomised trials of extracts in prostate cancer precursors and chronic lymphocytic leukaemia showed biological activity without proven clinical benefit" }; }
    if (s === 2) { const u = Q(t, 2); egcg.forEach((e, i) => { setAlpha(alpha, e, 0.6); moveTo(pts, base, e, [CUP[0], CUP[1] + 0.2, 0.1], [DISH[0] - 0.3 + 0.15 * i, DISH[1] + 0.35, 0.3], 1, 1, 3); }); setAlpha(alpha, cellD, 0.7); setAlpha(alpha, ros, 0.4); show(alpha, 0.6, gap, gapX); setAlpha(alpha, scaleBar, clamp(u * 2)); setAlpha(alpha, pan, clamp(u * 2)); const tilt = 0.12 * Math.sin(t * TAU * 1.5) * clamp(u * 2 - 0.5); for (let i = scaleBar.p0; i < scaleBar.p1; i++) { const p = base[i]; pts[i] = [p[0], p[1] + (p[0] - 2.0) * tilt, p[2]]; } stack.forEach((d, i) => { setAlpha(alpha, d, clamp(u * 3 - 0.5 - 0.3 * i)); movePart(pts, base, d, [0, (1.4 + 0.12 * i - 2.0) * tilt, 0], 1); }); stack2.forEach((d, i) => { setAlpha(alpha, d, clamp(u * 3 - 0.7 - 0.3 * i)); movePart(pts, base, d, [0, (2.6 - 0.12 * i - 2.0) * tilt, 0], 1); }); return { caption: "3 · A 2020 Cochrane review of 142 studies, mostly observational, found inconsistent and inconclusive evidence for cancer prevention, with low- to very-low-certainty results in both directions by cancer site" }; }
    const u = Q(t, 3); egcg.forEach((e, i) => { setAlpha(alpha, e, 0.6); moveTo(pts, base, e, [CUP[0], CUP[1] + 0.2, 0.1], [DISH[0] - 0.3 + 0.15 * i, DISH[1] + 0.35, 0.3], 1, 1, 3); }); setAlpha(alpha, cellD, 0.7); setAlpha(alpha, ros, 0.4); show(alpha, 0.6, gap, gapX, scaleBar, pan, ...stack, ...stack2);
    caps.forEach((c, i) => setAlpha(alpha, c, clamp(u * 3 - 0.4 * i))); setAlpha(alpha, liver, clamp(u * 2 - 0.5) * 0.8); setAlpha(alpha, liverX, clamp(u * 2 - 0.8) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, bort, clamp(u * 2 - 1)); setAlpha(alpha, bortX, clamp(u * 2 - 1.2));
    return { caption: "4 · Concentrated extracts, typically above 800 mg EGCG a day, are linked to hepatotoxicity, and EGCG can blunt bortezomib, some statins and beta-blockers; tea as a beverage carries none of these concerns" };
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
  "acupuncture-nausea": acupunctureNausea,
  "auger-electron-therapy": augerElectronTherapy,
  "bimatoprost-eyelash-regrowth": bimatoprostEyelash,
  "cancer-associated-thrombosis": cancerAssociatedThrombosis,
  "stroma-directed-car": stromaDirectedCar,
  "hypnosis-cancer-care": hypnosisCancerCare,
  "exosome-therapeutics": exosomeTherapeutics,
  "ihc-autostainers-histology-automation": ihcAutostainers,
  "honey-radiation-mucositis": honeyRadiationMucositis,
  "hydrazine-sulfate": hydrazineSulfate,
  "nuclear-medicine-hardware": nuclearMedicineHardware,
  "pharmacy-automation": pharmacyAutomation,
  "partial-nephrectomy-active-surveillance": partialNephrectomy,
  "preanalytics-sample-stabilisation": preanalyticsStabilisation,
  "sonodynamic-therapy": sonodynamicTherapy,
  "spatial-biology-instruments": spatialBiologyInstruments,
  "sybil": sybilRisk,
  "trained-innate-immunity": trainedInnateImmunity,
  "tmb-testing": tmbTesting,
  "yoga-cancer": yogaCancer,
  "acupuncture-xerostomia": acupunctureXerostomia,
  "alpha-nanogenerators": alphaNanogenerators,
  "antineoplastons": antineoplastons,
  "nerve-tumour-denervation": nerveTumourDenervation,
  "fertility-sparing-endometrial": fertilitySparingEndometrial,
  "financial-navigation": financialNavigation,
  "frozen-gloves-compression-taxane": frozenGlovesCompression,
  "gastric-endoscopic-screening": gastricEndoscopicScreening,
  "generic-drug-shortage-response": genericDrugShortage,
  "green-tea-egcg": greenTeaEgcg,
};

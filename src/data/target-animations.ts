/**
 * Animated wireframe schematics for target pages: what a target is and how drugs act on it,
 * told in four plain-English phases on a 10-14 s loop. One generic scene per `targetClass`
 * plus specific scenes for the most important targets, using the same scene/part/frame
 * machinery as ./animated.ts and ./front-animations.ts. Every mesh stays under 500 points.
 *
 * Colour convention (see Wireframe3D): plain lines = the target and the cell, "accent" (pink) =
 * the drug, "hot" (amber) = the effect (signal, damage, kill), "soft" = context.
 */
import { add, antibody, antibodyTips, box, cylinder, dna, dots, ellipsoid, empty, helix, icosahedron, lerp3, line, movePart, octahedron, phase, polyline, ring, setAlpha, sphere, torus, type Mesh, type Part, type Vec3 } from "@/lib/wireframe";
import { buffers, pulse, put, receptor, scene, type Scene } from "./animated";

const TAU = Math.PI * 2;
type Lbl = { at: Vec3; text: string };
const L = (at: Vec3, text: string): Lbl => ({ at, text });
const cell = (r: number, cls?: string) => sphere(r, 5, 10, cls);
/** Reveal a polyline part progressively (segments switch on in order). */
const grow = (alpha: number[], p: Part, u: number) => { const n = p.s1 - p.s0; for (let k = 0; k < n; k++) alpha[p.s0 + k] = Math.max(0, Math.min(1, u * n - k)); };
const hide = (alpha: number[], ...parts: Part[]) => parts.forEach((p) => setAlpha(alpha, p, 0));
const show = (alpha: number[], a: number, ...parts: Part[]) => parts.forEach((p) => setAlpha(alpha, p, a));
const moveTo = (pts: Vec3[], base: Vec3[], p: Part, from: Vec3, to: Vec3, u: number, scale = 1, spin = 0) => { const d = lerp3(from, to, u); movePart(pts, base, p, [d[0] - from[0], d[1] - from[1], d[2] - from[2]], scale, spin); };
const shift = (pts: Vec3[], base: Vec3[], p: Part, d: Vec3, scale = 1, spin = 0) => movePart(pts, base, p, d, scale, spin);
function frame(sc: Scene, duration: number, fn: (t: number, pts: Vec3[], alpha: number[]) => { caption: string; labels?: Lbl[] }): Mesh {
  sc.mesh.animate = { duration, frame: (t) => { const { pts, alpha } = buffers(sc); const r = fn(t, pts, alpha); return { points: pts, alpha, caption: r.caption, labels: r.labels ?? sc.mesh.labels }; } };
  return sc.mesh;
}
/** Small drug molecule: an octahedron in the drug colour. */
const pill = (r = 0.11, cls = "accent") => octahedron(r, cls);
/** Zig-zag relay from `a` to `b` (a phosphorylation cascade), drawn in the effect colour. */
function relay(a: Vec3, b: Vec3, steps = 5, amp = 0.12, cls = "hot"): Mesh {
  const pts: Vec3[] = [];
  for (let i = 0; i <= steps; i++) { const u = i / steps; const p = lerp3(a, b, u); pts.push([p[0], p[1] + (i % 2 ? amp : -amp) * (i && i < steps ? 1 : 0), p[2]]); }
  return polyline(pts, cls);
}
/** Membrane-side receptor: stub pointing out of the cell (-x) with a head, plus a short tail inside the cell. */
function surfaceReceptor(base: Vec3, len = 0.3, cls?: string, tail = 0.18): Mesh {
  const m = empty();
  add(m, receptor(base, -len, cls));
  if (tail) add(m, line(base, [base[0] + tail, base[1], base[2]], cls));
  return m;
}
/** The standard cell: sphere on the right with a nucleus, membrane facing left at x ≈ C[0] - r. */
function standardCell(sc: Scene, opts: { at?: Vec3; r?: number; nucleus?: number; cls?: string; name?: string } = {}): { C: Vec3; r: number; N: Vec3 } {
  const C = opts.at ?? [1.2, 0, 0], r = opts.r ?? 1.0, N: Vec3 = [C[0] + 0.25, C[1] + 0.05, C[2]];
  put(sc, opts.name ?? "cell", cell(r, opts.cls), { at: C });
  put(sc, `${opts.name ?? "cell"}Nuc`, sphere(opts.nucleus ?? 0.36, 4, 8, "soft"), { at: N });
  return { C, r, N };
}
/** x on the left face of a sphere of radius r at C for a given (y, z). */
const faceX = (C: Vec3, r: number, y: number, z: number) => C[0] - Math.sqrt(Math.max(0.05, r * r - y * y - z * z));

// =====================================================================================
// Surface antigen: marker on the cell → antibody binds → pulled inside → payload released
// =====================================================================================
type AdcOpts = { antigen: string; drug: string; captions?: [string, string, string, string]; neighbour?: boolean; receptors?: number; payloads?: number; duration?: number };
function adcScene(o: AdcOpts): Mesh {
  const sc = scene();
  const { C, r, N } = standardCell(sc);
  const NEIGH: Vec3 = [1.9, -1.55, 0.7];
  if (o.neighbour) { put(sc, "neigh", cell(0.65, "soft"), { at: NEIGH }); put(sc, "neighNuc", sphere(0.2, 3, 8, "soft"), { at: NEIGH }); }
  const recs: Part[] = [];
  const slots: Array<[number, number]> = [[0.18, 0.1], [-0.22, -0.14], [0.5, -0.3], [-0.5, 0.3], [0.05, 0.45], [0.3, -0.5]];
  for (let i = 0; i < (o.receptors ?? 2); i++) { const [y, z] = slots[i]; recs.push(put(sc, `rec${i}`, surfaceReceptor([faceX(C, r, y, z), y, z], 0.28))); }
  put(sc, "vesicle", ring(0.34, 14, "soft"), { at: [C[0] - 0.3, 0.05, 0], rotX: 0.5 });
  const START: Vec3 = [-2.1, 0.45, 0.1], DOCK: Vec3 = [faceX(C, r, 0.18, 0.1) - 0.28 - 0.95 * 0.5, 0.18 - 0.55 * 0.5 * 0.9, 0.1], IN: Vec3 = [C[0] - 0.3, 0.05, 0];
  const ab = put(sc, "ab", antibody(0.5, "accent"), { at: START });
  const pays: Part[] = [];
  const nPay = o.payloads ?? 4;
  for (let i = 0; i < nPay; i++) { const y = -0.45 + (0.35 * i) / Math.max(1, nPay - 1); pays.push(put(sc, `pay${i}`, octahedron(0.05, "accent"), { at: [START[0] + (i % 2 ? 0.16 : -0.16), START[1] + y, START[2] + (i % 4 < 2 ? 0.08 : -0.08)] })); }
  const free = put(sc, "free", dots([[N[0] - 0.1, N[1] + 0.15, 0.1], [N[0] + 0.12, N[1] - 0.05, -0.1], [N[0], N[1] + 0.2, -0.12], [N[0] + 0.15, N[1] + 0.1, 0.1]], "hot"));
  const bys = o.neighbour ? put(sc, "bys", dots([[NEIGH[0] - 0.05, NEIGH[1] + 0.1, NEIGH[2]], [NEIGH[0] + 0.08, NEIGH[1] - 0.05, NEIGH[2] + 0.05]], "hot")) : null;
  const base = sc.mesh.points, P = sc.parts;
  const abAll = [ab, ...pays];
  const cap = o.captions ?? [
    `1 · The tumour cell carries a marker protein on its surface: ${o.antigen}`,
    `2 · An antibody drug recognises the marker and locks onto it`,
    `3 · The cell pulls the antibody inside (internalisation)`,
    `4 · The toxic payload is released inside and kills the cell`,
  ];
  return frame(sc, o.duration ?? 12, (t, pts, alpha) => {
    hide(alpha, free, P["vesicle"]); if (bys) hide(alpha, bys);
    let caption = "";
    const abTo = (to: Vec3, u: number, s = 1) => abAll.forEach((p) => moveTo(pts, base, p, START, to, u, s));
    if (t < 0.25) { recs.forEach((p) => setAlpha(alpha, p, pulse(t, 4))); abTo(START, 0); caption = cap[0]; }
    else if (t < 0.5) { const u = phase(t, 0.25, 0.5); abTo(DOCK, u); caption = cap[1]; }
    else if (t < 0.75) { const u = phase(t, 0.5, 0.75); abTo(lerp3(DOCK, IN, u), 1, 1 - 0.45 * u); if (recs[0]) shift(pts, base, recs[0], [0.35 * u, -0.1 * u, 0], 1 - 0.3 * u); setAlpha(alpha, P["vesicle"], u); caption = cap[2]; }
    else { const u = phase(t, 0.75, 1); abTo(IN, 1, 0.55); show(alpha, 1 - u, ...abAll); if (recs[0]) shift(pts, base, recs[0], [0.35, -0.1, 0], 0.7); setAlpha(alpha, P["vesicle"], 1 - u); pays.forEach((p, i) => moveTo(pts, base, p, START, [IN[0] + (N[0] - IN[0]) * u, IN[1] + (N[1] - IN[1]) * u + 0.1 * i, 0], 1, 0.55)); setAlpha(alpha, free, u > 0.5 ? pulse(t, 5) : 0); setAlpha(alpha, P["cell"], 1 - 0.4 * u); if (bys) setAlpha(alpha, bys, u > 0.7 ? pulse(t, 5) : 0); caption = cap[3]; }
    const labels: Lbl[] = [L([C[0], C[1] + r + 0.1, 0], "Tumour cell"), L([N[0], N[1] - 0.45, 0], "Inside the cell")];
    if (t < 0.5) labels.push(L([faceX(C, r, 0.18, 0.1) - 0.3, 0.18, 0.1], o.antigen));
    if (t >= 0.2 && t < 0.75) labels.push(L(t < 0.5 ? lerp3(START, DOCK, phase(t, 0.25, 0.5)) : DOCK, o.drug));
    if (t >= 0.75) labels.push(L([N[0], N[1] + 0.3, 0.1], "Toxic payload"));
    if (o.neighbour && t >= 0.75) labels.push(L([NEIGH[0], NEIGH[1] - 0.8, NEIGH[2]], "Neighbour hit too (bystander effect)"));
    return { caption, labels };
  });
}

/** HER2: trastuzumab and pertuzumab dock, then T-DXd is internalised and its payload spreads to a neighbour. */
function her2Scene(): Mesh {
  const sc = scene();
  const { C, r, N } = standardCell(sc);
  const NEIGH: Vec3 = [1.9, -1.55, 0.7];
  put(sc, "neigh", cell(0.65, "soft"), { at: NEIGH }); put(sc, "neighNuc", sphere(0.2, 3, 8, "soft"), { at: NEIGH });
  const slots: Array<[number, number]> = [[0.35, 0.1], [-0.1, -0.15], [0.7, -0.25], [-0.55, 0.25], [0.1, 0.5], [0.3, -0.55]];
  const recs = slots.map(([y, z], i) => put(sc, `rec${i}`, surfaceReceptor([faceX(C, r, y, z), y, z], 0.28)));
  const her3 = put(sc, "her3", surfaceReceptor([faceX(C, r, -0.1, -0.15) - 0.02, -0.34, -0.15], 0.24, "soft"));
  const A0: Vec3 = [-2.2, 1.1, 0.1], A1: Vec3 = [faceX(C, r, 0.35, 0.1) - 0.3 - 0.45, 0.35 - 0.2, 0.1];
  const B0: Vec3 = [-2.3, -0.9, -0.1], B1: Vec3 = [faceX(C, r, -0.1, -0.15) - 0.3 - 0.4, -0.22 - 0.2, -0.15];
  const tras = put(sc, "tras", antibody(0.42, "accent"), { at: A0 });
  const pert = put(sc, "pert", antibody(0.42, "accent"), { at: B0, rotZ: 0.9 });
  const D0: Vec3 = [-2.3, 0.3, 0.3], D1: Vec3 = [faceX(C, r, 0.7, -0.25) - 0.3 - 0.45, 0.7 - 0.2, -0.25], IN: Vec3 = [C[0] - 0.3, 0.3, -0.1];
  const dxd = put(sc, "dxd", antibody(0.42, "accent"), { at: D0 });
  const pays: Part[] = [];
  for (let i = 0; i < 6; i++) pays.push(put(sc, `pay${i}`, octahedron(0.045, "accent"), { at: [D0[0] + (i % 2 ? 0.14 : -0.14), D0[1] - 0.4 + 0.07 * i, D0[2] + (i % 4 < 2 ? 0.07 : -0.07)] }));
  const dmg = put(sc, "dmg", dots([[N[0] - 0.1, N[1] + 0.15, 0.1], [N[0] + 0.12, N[1] - 0.05, -0.1], [N[0], N[1] + 0.2, -0.12]], "hot"));
  const bys = put(sc, "bys", dots([[NEIGH[0] - 0.05, NEIGH[1] + 0.1, NEIGH[2]], [NEIGH[0] + 0.08, NEIGH[1] - 0.05, NEIGH[2] + 0.05]], "hot"));
  const base = sc.mesh.points, P = sc.parts;
  const dxdAll = [dxd, ...pays];
  return frame(sc, 14, (t, pts, alpha) => {
    hide(alpha, dmg, bys);
    let caption = "";
    if (t < 0.22) { recs.forEach((p) => setAlpha(alpha, p, pulse(t, 4))); caption = "1 · HER2 crowds the surface of some breast, stomach and other cancers (millions of copies per cell)"; }
    else if (t < 0.47) { const u = phase(t, 0.22, 0.47); moveTo(pts, base, tras, A0, A1, u); moveTo(pts, base, pert, B0, B1, u); shift(pts, base, her3, [0, 0, 0], 1); setAlpha(alpha, her3, 0.6 + 0.4 * (1 - u)); caption = "2 · Trastuzumab grabs HER2's outer part; pertuzumab stops it pairing with its partner HER3"; }
    else if (t < 0.74) { moveTo(pts, base, tras, A0, A1, 1); moveTo(pts, base, pert, B0, B1, 1); const u = phase(t, 0.47, 0.6), v = phase(t, 0.6, 0.74); dxdAll.forEach((p) => moveTo(pts, base, p, D0, lerp3(D1, IN, v), u, 1 - 0.4 * v)); shift(pts, base, recs[2], [0.4 * v, -0.1 * v, 0.1 * v], 1 - 0.3 * v); caption = "3 · T-DXd: trastuzumab carrying eight toxin molecules is pulled inside the cell"; }
    else { moveTo(pts, base, tras, A0, A1, 1); moveTo(pts, base, pert, B0, B1, 1); const u = phase(t, 0.74, 1); dxdAll.forEach((p) => moveTo(pts, base, p, D0, IN, 1, 0.6)); setAlpha(alpha, dxd, 1 - u); shift(pts, base, recs[2], [0.4, -0.1, 0.1], 0.7); pays.forEach((p, i) => { const tgt: Vec3 = i < 4 ? [N[0] + 0.1 * (i - 1.5), N[1] + 0.1 * (i % 2), 0] : [NEIGH[0], NEIGH[1] + 0.3, NEIGH[2]]; moveTo(pts, base, p, D0, [IN[0] + (tgt[0] - IN[0]) * u, IN[1] + (tgt[1] - IN[1]) * u, IN[2] + (tgt[2] - IN[2]) * u], 1, 0.6); }); setAlpha(alpha, dmg, u > 0.4 ? pulse(t, 5) : 0); setAlpha(alpha, bys, u > 0.7 ? pulse(t, 5) : 0); setAlpha(alpha, P["cell"], 1 - 0.35 * u); caption = "4 · The payload breaks DNA in the cell and leaks into neighbours: the bystander effect"; }
    const labels: Lbl[] = [L([C[0], C[1] + r + 0.1, 0], "Tumour cell"), L([N[0], N[1] - 0.45, 0], "Inside the cell")];
    if (t < 0.47) labels.push(L([faceX(C, r, 0.35, 0.1) - 0.32, 0.35, 0.1], "HER2 receptor"));
    if (t >= 0.22 && t < 0.74) labels.push(L(A1, "Trastuzumab"), L(B1, "Pertuzumab"));
    if (t >= 0.47 && t < 0.74) labels.push(L(t < 0.6 ? lerp3(D0, D1, phase(t, 0.47, 0.6)) : D1, "T-DXd (antibody + toxin)"));
    if (t >= 0.74) labels.push(L([N[0], N[1] + 0.3, 0.1], "DNA damage"), L([NEIGH[0], NEIGH[1] - 0.8, NEIGH[2]], "Neighbour cell hit too"));
    if (t >= 0.22 && t < 0.47) labels.push(L([faceX(C, r, -0.1, -0.15) - 0.28, -0.34, -0.15], "HER3 (partner)"));
    return { caption, labels };
  });
}

// =====================================================================================
// Receptor kinase: ligand → dimerisation → cascade to nucleus → TKI blocks the ATP pocket
// =====================================================================================
type RtkOpts = { receptor: string; ligand: string; drug: string; mutant?: "point" | "fusion"; captions: [string, string, string, string]; duration?: number };
function rtkScene(o: RtkOpts): Mesh {
  const sc = scene();
  const { C, r, N } = standardCell(sc, { r: 1.05 });
  const Y1 = 0.42, Y2 = -0.32, X1 = faceX(C, r, Y1, 0), X2 = faceX(C, r, Y2, 0);
  const mkRec = (x: number, y: number, fusionPartner?: boolean) => { const m = empty(); add(m, receptor([x, y, 0], -0.32)); add(m, line([x, y, 0], [x + 0.25, y, 0])); add(m, box(0.16, 0.16, 0.16, fusionPartner ? "hot" : undefined), { at: [x + 0.33, y, 0] }); return m; };
  const r1 = put(sc, "r1", mkRec(X1, Y1)), r2 = put(sc, "r2", mkRec(X2, Y2, o.mutant === "fusion"));
  const LIG0: Vec3 = [-2.2, 0.6, 0.2], LIG1: Vec3 = [Math.min(X1, X2) - 0.4, 0.05, 0.05];
  const lig = put(sc, "lig", octahedron(0.12), { at: LIG0 });
  const mut = put(sc, "mut", dots([[X1 + 0.33 + (o.mutant === "fusion" ? -0.2 : 0), 0.05, 0.12]], "hot"));
  const P1: Vec3 = [X1 + 0.5, 0.05, 0.08], P2: Vec3 = [N[0] - 0.36, N[1], 0];
  const casc = put(sc, "casc", relay(P1, P2, 6, 0.14));
  const pmarks = put(sc, "pm", dots([[X1 + 0.42, 0.18, 0.1], [X1 + 0.42, -0.08, -0.1]], "hot"));
  const DRUG0: Vec3 = [-1.4, -1.5, 0.3], DRUG1: Vec3 = [X1 + 0.33, 0.05, 0];
  const drug = put(sc, "drug", pill(0.1), { at: DRUG0 });
  const base = sc.mesh.points, P = sc.parts;
  const pairDy = (Y1 - Y2) / 2 - 0.12;
  return frame(sc, o.duration ?? 12, (t, pts, alpha) => {
    hide(alpha, casc, pmarks, drug); if (!o.mutant) hide(alpha, mut);
    let caption = "";
    const pair = (u: number) => { shift(pts, base, r1, [0, -pairDy * u, 0]); shift(pts, base, r2, [0, pairDy * u, 0]); };
    if (t < 0.25) { const u = phase(t, 0, 0.25); if (o.mutant) { pair(1); setAlpha(alpha, mut, pulse(t, 4)); hide(alpha, lig); } else moveTo(pts, base, lig, LIG0, [LIG0[0] + 0.6, LIG0[1], LIG0[2]], u); caption = o.captions[0]; }
    else if (t < 0.5) { const u = phase(t, 0.25, 0.5); if (o.mutant) { pair(1); hide(alpha, lig); setAlpha(alpha, mut, 1); } else { moveTo(pts, base, lig, LIG0, LIG1, u); pair(u); } setAlpha(alpha, pmarks, u > 0.6 ? pulse(t, 5) : 0); caption = o.captions[1]; }
    else if (t < 0.75) { pair(1); if (o.mutant) hide(alpha, lig); else moveTo(pts, base, lig, LIG0, LIG1, 1); const u = phase(t, 0.5, 0.75); setAlpha(alpha, pmarks, 1); grow(alpha, casc, u); setAlpha(alpha, P["cellNuc"], u > 0.8 ? pulse(t, 5) : 1); caption = o.captions[2]; }
    else { pair(1); if (o.mutant) hide(alpha, lig); else moveTo(pts, base, lig, LIG0, LIG1, 1); const u = phase(t, 0.75, 1); setAlpha(alpha, drug, 1); moveTo(pts, base, drug, DRUG0, DRUG1, Math.min(1, u * 1.6), 1, t * 8); setAlpha(alpha, casc, 1 - u); setAlpha(alpha, pmarks, 1 - u); if (o.mutant) setAlpha(alpha, mut, 1 - u); caption = o.captions[3]; }
    const labels: Lbl[] = [L([C[0], C[1] + r + 0.1, 0], "Tumour cell"), L([N[0], N[1] - 0.5, 0], "Nucleus (inside the cell)"), L([X1 - 0.35, Y1, 0], o.receptor)];
    if (!o.mutant && t < 0.5) labels.push(L(t < 0.25 ? [LIG0[0] + 0.6, LIG0[1], LIG0[2]] : lerp3(LIG0, LIG1, phase(t, 0.25, 0.5)), o.ligand));
    if (o.mutant && t < 0.75) labels.push(L([X1 + 0.33, 0.05, 0.12], o.mutant === "fusion" ? "Fusion partner (glued on)" : "Mutation: stuck on"));
    if (t >= 0.5 && t < 0.75) labels.push(L(lerp3(P1, P2, 0.5), "Grow / divide signal"));
    if (t >= 0.75) labels.push(L(DRUG1, o.drug));
    return { caption, labels };
  });
}

// =====================================================================================
// Intracellular kinase cascade (BRAF, CDK4/6): nodes inside the cell, one stuck on, a drug on it
// =====================================================================================
type CascadeOpts = { nodes: string[]; stuck: number; drugAt: number; drug: string; captions: [string, string, string, string]; secondDrug?: { at: number; name: string } };
function cascadeScene(o: CascadeOpts): Mesh {
  const sc = scene();
  const { C, r, N } = standardCell(sc, { at: [0.3, 0, 0], r: 1.6, nucleus: 0.42 });
  const X0 = faceX(C, r, 0.1, 0);
  put(sc, "rec", surfaceReceptor([X0, 0.1, 0], 0.3));
  const n = o.nodes.length;
  const pos: Vec3[] = o.nodes.map((_, i) => { const u = (i + 1) / (n + 1); return [X0 + 0.25 + (N[0] - 0.5 - X0 - 0.25) * u, 0.1 + 0.35 * Math.sin(i * 2.1), 0.12 * Math.cos(i * 1.7)]; });
  const nodes = pos.map((p, i) => put(sc, `n${i}`, i === o.stuck ? octahedron(0.16) : sphere(0.13, 3, 6), { at: p }));
  const links = pos.slice(0, -1).map((p, i) => put(sc, `l${i}`, relay(p, pos[i + 1], 3, 0.06)));
  const last = put(sc, "last", relay(pos[n - 1], [N[0] - 0.42, N[1], N[2]], 3, 0.06));
  const first = put(sc, "first", relay([X0 + 0.2, 0.1, 0], pos[0], 3, 0.06));
  const mut = put(sc, "mut", dots([[pos[o.stuck][0], pos[o.stuck][1] + 0.22, pos[o.stuck][2]]], "hot"));
  const D0: Vec3 = [-2.4, -1.4, 0.4], D1 = pos[o.drugAt];
  const drug = put(sc, "drug", pill(0.1), { at: D0 });
  const E0: Vec3 = [-2.2, 1.6, -0.3], E1 = o.secondDrug ? pos[o.secondDrug.at] : D1;
  const drug2 = o.secondDrug ? put(sc, "drug2", pill(0.1), { at: E0 }) : null;
  const base = sc.mesh.points, P = sc.parts;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, drug, ...links, last, first); if (drug2) hide(alpha, drug2);
    let caption = "";
    if (t < 0.25) { const u = phase(t, 0, 0.25); hide(alpha, mut); links.forEach((l, i) => grow(alpha, l, Math.max(0, Math.min(1, u * (n + 1) - i - 1)))); grow(alpha, first, Math.min(1, u * (n + 1))); grow(alpha, last, Math.max(0, u * (n + 1) - n)); caption = o.captions[0]; }
    else if (t < 0.5) { const u = phase(t, 0.25, 0.5); setAlpha(alpha, mut, pulse(t, 4)); shift(pts, base, nodes[o.stuck], [0, 0, 0], 1 + 0.25 * Math.sin(t * TAU * 3)); links.forEach((l, i) => setAlpha(alpha, l, i >= o.stuck ? 1 : 0.35)); setAlpha(alpha, last, 1); setAlpha(alpha, first, 0.35); setAlpha(alpha, P["cellNuc"], u > 0.5 ? pulse(t, 5) : 1); caption = o.captions[1]; }
    else if (t < 0.75) { const u = phase(t, 0.5, 0.75); setAlpha(alpha, mut, 1); links.forEach((l, i) => setAlpha(alpha, l, i >= o.stuck ? 1 : 0.35)); setAlpha(alpha, last, 1); setAlpha(alpha, first, 0.35); setAlpha(alpha, P["cellNuc"], pulse(t, 5)); setAlpha(alpha, drug, 1); moveTo(pts, base, drug, D0, D1, u, 1, t * 8); if (drug2) { setAlpha(alpha, drug2, 1); moveTo(pts, base, drug2, E0, E1, u, 1, t * 8); } caption = o.captions[2]; }
    else { const u = phase(t, 0.75, 1); setAlpha(alpha, drug, 1); moveTo(pts, base, drug, D0, D1, 1); if (drug2) { setAlpha(alpha, drug2, 1); moveTo(pts, base, drug2, E0, E1, 1); } setAlpha(alpha, mut, 1 - u); links.forEach((l, i) => setAlpha(alpha, l, i >= o.drugAt ? 1 - u : 0.35)); setAlpha(alpha, last, 1 - u); setAlpha(alpha, first, 0.35); caption = o.captions[3]; }
    const labels: Lbl[] = [L([C[0], C[1] + r + 0.1, 0], "Inside the cell"), L([N[0], N[1] - 0.55, 0], "Nucleus: divide?"), L([X0 - 0.35, 0.1, 0], "Growth signal arrives")];
    o.nodes.forEach((name, i) => labels.push(L([pos[i][0], pos[i][1] + 0.28, pos[i][2]], name)));
    if (t >= 0.5) labels.push(L(D1, o.drug)); if (t >= 0.5 && o.secondDrug) labels.push(L(E1, o.secondDrug.name));
    return { caption, labels };
  });
}

// =====================================================================================
// Checkpoint: T cell meets tumour cell → PD-1/PD-L1 handshake → antibody breaks it → kill
// =====================================================================================
type CheckpointOpts = { onT: string; onTumour: string; drugSide: "t" | "tumour"; drug: string; captions: [string, string, string, string] };
function checkpointScene(o: CheckpointOpts): Mesh {
  const sc = scene();
  const TC: Vec3 = [-1.5, 0.1, 0], TUM: Vec3 = [1.2, 0, 0];
  const tcell = put(sc, "t", icosahedron(0.72), { at: TC });
  put(sc, "tum", cell(0.95), { at: TUM });
  const tumNuc = put(sc, "tumNuc", sphere(0.32, 4, 8, "soft"), { at: [TUM[0] + 0.2, 0, 0] });
  // TCR / antigen (the "kill" contact) above, checkpoint handshake below
  const tcr = put(sc, "tcr", receptor([TC[0] + 0.62, 0.42, 0], 0.3));
  const ag = put(sc, "ag", receptor([faceX(TUM, 0.95, 0.42, 0), 0.42, 0], -0.28));
  const pd1 = put(sc, "pd1", receptor([TC[0] + 0.66, -0.3, 0.05], 0.3, "hot"));
  const pdl1 = put(sc, "pdl1", receptor([faceX(TUM, 0.95, -0.3, 0.05), -0.3, 0.05], -0.28, "hot"));
  const GAP = TUM[0] - 0.95 - (TC[0] + 0.72); // room between the two cells
  const A0: Vec3 = [-0.1, -2.1, 0.4];
  const A1: Vec3 = o.drugSide === "t" ? [TC[0] + 0.66 + 0.3 - 0.1, -0.3 - 0.45, 0.05] : [faceX(TUM, 0.95, -0.3, 0.05) - 0.28 + 0.1, -0.3 - 0.45, 0.05];
  const ab = put(sc, "ab", antibody(0.4, "accent"), { at: A0 });
  const gran = put(sc, "gran", dots([[TC[0] + 0.5, 0.2, 0.1], [TC[0] + 0.55, 0.05, -0.1], [TC[0] + 0.45, 0.35, 0]], "hot"));
  const base = sc.mesh.points, P = sc.parts;
  const approach: Vec3 = [GAP * 0.55, 0, 0];
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, gran);
    let caption = "";
    const tOff = (u: number) => [tcell, tcr, pd1].forEach((p) => shift(pts, base, p, [approach[0] * u, 0, 0]));
    const hand = (u: number) => { shift(pts, base, pdl1, [-GAP * 0.45 * u, 0, 0]); shift(pts, base, ag, [-GAP * 0.45 * u, 0, 0]); };
    if (t < 0.22) { const u = phase(t, 0, 0.22); tOff(u); hand(u); caption = o.captions[0]; }
    else if (t < 0.48) { tOff(1); hand(1); const u = phase(t, 0.22, 0.34); show(alpha, u > 0.5 ? pulse(t, 5) : 1, pd1, pdl1); setAlpha(alpha, tcell, 1 - 0.55 * phase(t, 0.3, 0.48)); setAlpha(alpha, tcr, 1 - 0.55 * phase(t, 0.3, 0.48)); caption = o.captions[1]; }
    else if (t < 0.72) { tOff(1); hand(1); const u = phase(t, 0.48, 0.66); moveTo(pts, base, ab, A0, A1, u); setAlpha(alpha, tcell, 0.45 + 0.55 * phase(t, 0.6, 0.72)); setAlpha(alpha, tcr, 0.45 + 0.55 * phase(t, 0.6, 0.72)); shift(pts, base, o.drugSide === "t" ? pdl1 : pd1, [(o.drugSide === "t" ? 1 : -1) * 0.12 * u + (o.drugSide === "t" ? -GAP * 0.45 : approach[0]), 0, 0]); caption = o.captions[2]; }
    else { tOff(1); hand(1); moveTo(pts, base, ab, A0, A1, 1); shift(pts, base, o.drugSide === "t" ? pdl1 : pd1, [(o.drugSide === "t" ? 1 : -1) * 0.12 + (o.drugSide === "t" ? -GAP * 0.45 : approach[0]), 0, 0]); const u = phase(t, 0.72, 1); setAlpha(alpha, gran, 1); moveTo(pts, base, gran, [TC[0] + 0.5, 0.2, 0], [TUM[0] - 0.2, 0.1, 0], u); setAlpha(alpha, P["tum"], 1 - 0.6 * u); setAlpha(alpha, tumNuc, 1 - 0.6 * u); shift(pts, base, P["tum"], [0, 0, 0], 1 - 0.2 * u); caption = o.captions[3]; }
    const labels: Lbl[] = [L([TC[0] + approach[0], TC[1] + 0.95, 0], "T cell (immune killer)"), L([TUM[0], 1.1, 0], "Tumour cell")];
    if (t >= 0.1) labels.push(L([TC[0] + approach[0] + 0.66 + 0.3, -0.3, 0.05], o.onT), L([faceX(TUM, 0.95, -0.3, 0.05) - 0.28 - GAP * 0.45, -0.45, 0.05], o.onTumour));
    if (t >= 0.48) labels.push(L(t < 0.66 ? lerp3(A0, A1, phase(t, 0.48, 0.66)) : A1, o.drug));
    if (t >= 0.72) labels.push(L([TUM[0] - 0.3, 0.45, 0], "Kill"));
    return { caption, labels };
  });
}

// =====================================================================================
// Nuclear receptor: hormone enters → binds receptor → nucleus, genes on → drug blocks / degrades
// =====================================================================================
type NrOpts = { hormone: string; receptor: string; drug: string; mode: "block" | "degrade" | "supply"; captions: [string, string, string, string] };
function nuclearReceptorScene(o: NrOpts): Mesh {
  const sc = scene();
  const { C, r, N } = standardCell(sc, { at: [0.6, 0, 0], r: 1.5, nucleus: 0.6 });
  const strand = put(sc, "dna", dna(0.12, 0.8, 1.5, 16, undefined, 4), { at: N, rotZ: Math.PI / 2 });
  const H0: Vec3 = [-2.6, 0.5, 0.2], H1: Vec3 = [faceX(C, r, 0.5, 0.2) - 0.15, 0.5, 0.2], REC: Vec3 = [C[0] - 0.7, -0.1, 0.1];
  const horm = put(sc, "horm", octahedron(0.1), { at: H0 });
  const rec = put(sc, "rec", (() => { const m = empty(); add(m, torus(0.2, 0.06, 10, 4)); add(m, line([0, -0.2, 0], [0, -0.45, 0])); return m; })(), { at: REC, rotX: Math.PI / 2 });
  const glow = put(sc, "glow", dots([[N[0] - 0.25, N[1] + 0.2, 0.1], [N[0] + 0.25, N[1] - 0.15, -0.1], [N[0], N[1] + 0.35, 0], [N[0] + 0.1, N[1] - 0.35, 0.1]], "hot"));
  const D0: Vec3 = [-2.4, -1.4, 0.3];
  const drug = put(sc, "drug", pill(0.1), { at: D0 });
  const bin = put(sc, "bin", cylinder(0.22, 0.4, 10, 2, "soft"), { at: [C[0] - 0.4, -1.0, 0.2] });
  const base = sc.mesh.points;
  const toNuc: Vec3 = [N[0] - 0.3, N[1], 0];
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, glow, drug, bin);
    let caption = "";
    if (t < 0.25) { const u = phase(t, 0, 0.25); moveTo(pts, base, horm, H0, H1, u); caption = o.captions[0]; }
    else if (t < 0.5) { const u = phase(t, 0.25, 0.5); moveTo(pts, base, horm, H0, [REC[0], REC[1] + 0.05, REC[2]], u); if (u > 0.9) shift(pts, base, rec, [0, 0, 0], 1.15); caption = o.captions[1]; }
    else if (t < 0.75) { const u = phase(t, 0.5, 0.75); moveTo(pts, base, horm, H0, lerp3([REC[0], REC[1] + 0.05, REC[2]], [toNuc[0], toNuc[1] + 0.05, toNuc[2]], u), 1); moveTo(pts, base, rec, REC, toNuc, u, 1.15); setAlpha(alpha, glow, u > 0.6 ? pulse(t, 5) : 0); setAlpha(alpha, strand, u > 0.6 ? pulse(t, 3) : 1); caption = o.captions[2]; }
    else {
      const u = phase(t, 0.75, 1);
      setAlpha(alpha, drug, 1);
      if (o.mode === "supply") { moveTo(pts, base, horm, H0, toNuc, 1); setAlpha(alpha, horm, 1 - u); moveTo(pts, base, rec, REC, toNuc, 1, 1.15 - 0.15 * u); moveTo(pts, base, drug, D0, [H0[0] + 0.9, H0[1], H0[2]], Math.min(1, u * 1.5), 1, t * 8); }
      else if (o.mode === "degrade") { setAlpha(alpha, bin, 1); moveTo(pts, base, horm, H0, toNuc, 1); setAlpha(alpha, horm, 1 - u); moveTo(pts, base, drug, D0, toNuc, Math.min(1, u * 2), 1, t * 8); const v = phase(t, 0.85, 1); moveTo(pts, base, rec, REC, lerp3(toNuc, [C[0] - 0.4, -1.0, 0.2], v), 1, 1.15 - 0.9 * v); setAlpha(alpha, rec, 1 - v * 0.9); if (v > 0.5) moveTo(pts, base, drug, D0, [C[0] - 0.4, -1.0, 0.2], 1, 1 - v); }
      else { moveTo(pts, base, horm, H0, toNuc, 1); setAlpha(alpha, horm, 1 - u); moveTo(pts, base, rec, REC, toNuc, 1, 1.15); moveTo(pts, base, drug, D0, [toNuc[0], toNuc[1] + 0.05, toNuc[2]], Math.min(1, u * 1.6), 1, t * 8); }
      setAlpha(alpha, glow, 1 - u); caption = o.captions[3];
    }
    const labels: Lbl[] = [L([C[0], C[1] + r + 0.1, 0], "Cancer cell"), L([N[0], N[1] - 0.75, 0], "Nucleus (DNA)")];
    if (t < 0.5) labels.push(L(t < 0.25 ? lerp3(H0, H1, phase(t, 0, 0.25)) : lerp3(H0, [REC[0], REC[1] + 0.05, REC[2]], phase(t, 0.25, 0.5)), o.hormone));
    labels.push(L(t < 0.5 ? [REC[0], REC[1] - 0.5, REC[2]] : t < 0.75 ? lerp3([REC[0], REC[1] - 0.5, REC[2]], [toNuc[0], toNuc[1] - 0.5, 0], phase(t, 0.5, 0.75)) : [toNuc[0], toNuc[1] - 0.5, 0], o.receptor));
    if (t >= 0.5 && t < 0.85) labels.push(L([N[0], N[1] + 0.5, 0], "Growth genes switched on"));
    if (t >= 0.75) labels.push(L(o.mode === "supply" ? [H0[0] + 0.9, H0[1] + 0.3, H0[2]] : [toNuc[0] - 0.4, toNuc[1] - 0.2, 0.2], o.drug));
    if (o.mode === "degrade" && t >= 0.88) labels.push(L([C[0] - 0.4, -1.35, 0.2], "Proteasome (cell's waste disposal)"));
    return { caption, labels };
  });
}

// =====================================================================================
// Enzyme: substrate → product turnover, inhibitor jams the active site
// =====================================================================================
type EnzymeOpts = { enzyme: string; substrate: string; product: string; drug: string; captions: [string, string, string, string] };
function enzymeScene(o: EnzymeOpts): Mesh {
  const sc = scene();
  const E: Vec3 = [0, 0, 0];
  put(sc, "enz", torus(0.75, 0.3, 18, 7), { at: E, rotX: Math.PI / 2 });
  put(sc, "site", ring(0.34, 12, "soft", "z"), { at: E });
  const subs: Part[] = [];
  for (let i = 0; i < 3; i++) subs.push(put(sc, `sub${i}`, octahedron(0.13), { at: [-2.6 - 0.7 * i, 0.4 - 0.2 * i, 0.2 * (i % 2)] }));
  const prods: Part[] = [];
  for (let i = 0; i < 3; i++) prods.push(put(sc, `prod${i}`, (() => { const m = empty(); add(m, octahedron(0.09, "hot"), { at: [-0.1, 0.05, 0] }); add(m, octahedron(0.07, "hot"), { at: [0.12, -0.05, 0] }); return m; })(), { at: E }));
  const D0: Vec3 = [-0.4, -2.3, 0.3];
  const drug = put(sc, "drug", (() => { const m = empty(); add(m, pill(0.16)); add(m, ring(0.24, 8, "accent", "z")); return m; })(), { at: D0 });
  const base = sc.mesh.points, P = sc.parts;
  const S0 = (i: number): Vec3 => [-2.6 - 0.7 * i, 0.4 - 0.2 * i, 0.2 * (i % 2)];
  const OUT = (i: number): Vec3 => [2.4 + 0.5 * i, -0.3 + 0.3 * i, -0.2 * (i % 2)];
  return frame(sc, 11, (t, pts, alpha) => {
    hide(alpha, ...prods, drug);
    let caption = "";
    // Turnover cycle: substrate i enters over [a, a+0.12], product leaves over [a+0.12, a+0.3].
    const turnover = (t0: number, t1: number, active: boolean) => subs.forEach((s, i) => {
      const a = t0 + ((t1 - t0) * i) / 3, mid = a + (t1 - t0) * 0.14, end = a + (t1 - t0) * 0.36;
      if (t < a) { moveTo(pts, base, s, S0(i), E, 0); return; }
      if (t < mid || !active) { moveTo(pts, base, s, S0(i), active ? E : [E[0] - 0.75, E[1] + 0.35 * (i - 1), E[2]], phase(t, a, mid)); return; }
      hide(alpha, s); setAlpha(alpha, prods[i], t < end ? 1 : 0); moveTo(pts, base, prods[i], E, OUT(i), phase(t, mid, end));
    });
    if (t < 0.22) { subs.forEach((s, i) => moveTo(pts, base, s, S0(i), E, 0)); setAlpha(alpha, P["site"], pulse(t, 3)); caption = o.captions[0]; }
    else if (t < 0.55) { turnover(0.22, 0.55, true); setAlpha(alpha, P["site"], 1); caption = o.captions[1]; }
    else if (t < 0.75) { const u = phase(t, 0.55, 0.7); setAlpha(alpha, drug, 1); moveTo(pts, base, drug, D0, E, u, 1, t * 6); subs.forEach((s, i) => moveTo(pts, base, s, S0(i), [E[0] - 1.2, E[1] + 0.4 * (i - 1), E[2]], phase(t, 0.55, 0.75) * 0.9)); caption = o.captions[2]; }
    else { setAlpha(alpha, drug, 1); moveTo(pts, base, drug, D0, E, 1); const u = phase(t, 0.75, 1); subs.forEach((s, i) => { const from: Vec3 = [E[0] - 1.2, E[1] + 0.4 * (i - 1), E[2]]; moveTo(pts, base, s, S0(i), [from[0] - 0.15 * Math.sin(u * TAU + i), from[1] + 0.05 * Math.cos(u * TAU * 2 + i), from[2]], 0.9); }); setAlpha(alpha, P["site"], 0.3); caption = o.captions[3]; }
    const labels: Lbl[] = [L([E[0], E[1] + 1.1, 0], o.enzyme), L([E[0], E[1] - 0.4, 0.35], t >= 0.75 ? "Active site: jammed" : "Active site (pocket)")];
    if (t < 0.55) labels.push(L([-2.6, 0.75, 0.2], o.substrate)); else labels.push(L([-1.9, 0.75, 0.2], `${o.substrate} piles up`));
    if (t >= 0.22 && t < 0.55) labels.push(L([2.5, 0.2, 0], o.product));
    if (t >= 0.55) labels.push(L(t < 0.7 ? lerp3(D0, E, phase(t, 0.55, 0.7)) : [E[0] + 0.3, E[1] - 0.3, 0.3], o.drug));
    return { caption, labels };
  });
}

// =====================================================================================
// Transcription factor on DNA → growth programme → degrader / blocker removes it
// =====================================================================================
type TfOpts = { factor: string; drug: string; mode: "degrade" | "block"; captions: [string, string, string, string] };
function transcriptionScene(o: TfOpts): Mesh {
  const sc = scene();
  const strand = put(sc, "dna", dna(0.22, 4.4, 4, 44, undefined, 4), { at: [0, -0.3, 0], rotZ: Math.PI / 2 });
  const TF: Vec3 = [-0.3, 0.15, 0];
  const tf = put(sc, "tf", (() => { const m = empty(); add(m, box(0.55, 0.32, 0.4)); add(m, line([-0.2, -0.16, 0], [-0.2, -0.36, 0])); add(m, line([0.2, -0.16, 0], [0.2, -0.36, 0])); return m; })(), { at: TF });
  const rnas: Part[] = [];
  for (let i = 0; i < 4; i++) rnas.push(put(sc, `rna${i}`, helix(0.07, 0.8, 2.5, 14, "hot"), { at: [0.35 + 0.35 * i, 0.75, 0.15 * (i % 2)], rotZ: -0.4 }));
  const D0: Vec3 = [-2.4, 1.6, 0.4], D1: Vec3 = [TF[0], TF[1] + 0.32, TF[2]];
  const drug = put(sc, "drug", o.mode === "degrade" ? (() => { const m = empty(); add(m, pill(0.1), { at: [-0.16, 0, 0] }); add(m, line([-0.08, 0, 0], [0.08, 0, 0], "accent")); add(m, pill(0.1), { at: [0.16, 0, 0] }); return m; })() : pill(0.13), { at: D0 });
  const BIN: Vec3 = [1.9, 1.4, -0.3];
  const bin = put(sc, "bin", cylinder(0.32, 0.6, 12, 3, "soft"), { at: BIN });
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, ...rnas, drug, bin);
    let caption = "";
    if (t < 0.22) { const u = phase(t, 0, 0.22); moveTo(pts, base, tf, [TF[0], TF[1] + 1.4, TF[2]], TF, u); caption = o.captions[0]; }
    else if (t < 0.5) { const u = phase(t, 0.22, 0.5); rnas.forEach((rna, i) => { grow(alpha, rna, Math.max(0, Math.min(1, u * 4 - i * 0.8))); shift(pts, base, rna, [0, 0.15 * Math.sin(t * TAU * 2 + i), 0]); }); setAlpha(alpha, strand, pulse(t, 3)); caption = o.captions[1]; }
    else if (t < 0.75) { const u = phase(t, 0.5, 0.7); rnas.forEach((rna) => setAlpha(alpha, rna, 1)); setAlpha(alpha, drug, 1); moveTo(pts, base, drug, D0, D1, u, 1, t * 6); if (o.mode === "degrade") setAlpha(alpha, bin, phase(t, 0.6, 0.75)); caption = o.captions[2]; }
    else {
      const u = phase(t, 0.75, 1);
      setAlpha(alpha, drug, 1); rnas.forEach((rna) => setAlpha(alpha, rna, 1 - u));
      if (o.mode === "degrade") { setAlpha(alpha, bin, 1); const v = phase(t, 0.75, 0.92); moveTo(pts, base, tf, TF, BIN, v, 1 - 0.7 * v); moveTo(pts, base, drug, D0, [BIN[0], BIN[1] + 0.32, BIN[2]], 1, 1 - 0.7 * v); setAlpha(alpha, tf, 1 - v * 0.9); }
      else { moveTo(pts, base, drug, D0, D1, 1); moveTo(pts, base, tf, TF, [TF[0], TF[1] + 0.9 * u, TF[2] + 0.4 * u], 1); }
      caption = o.captions[3];
    }
    const labels: Lbl[] = [L([-1.8, -0.75, 0], "DNA (the cell's instructions)"), L(t < 0.22 ? lerp3([TF[0], TF[1] + 1.4, TF[2]], TF, phase(t, 0, 0.22)) : t >= 0.75 && o.mode === "degrade" ? lerp3(TF, BIN, phase(t, 0.75, 0.92)) : TF, o.factor)];
    if (t >= 0.22 && t < 0.85) labels.push(L([1.0, 1.35, 0], "Growth genes being read (RNA)"));
    if (t >= 0.5) labels.push(L(t < 0.7 ? lerp3(D0, D1, phase(t, 0.5, 0.7)) : t >= 0.75 && o.mode === "degrade" ? lerp3(D1, [BIN[0], BIN[1] + 0.32, BIN[2]], phase(t, 0.75, 0.92)) : D1, o.drug));
    if (o.mode === "degrade" && t >= 0.62) labels.push(L([BIN[0], BIN[1] - 0.5, BIN[2]], "Proteasome (waste disposal)"));
    return { caption, labels };
  });
}

// =====================================================================================
// Oncogene switch (KRAS): ON/OFF lever, mutation jams it ON, covalent drug locks it OFF
// =====================================================================================
type SwitchOpts = { name: string; fuel: string; drug: string; covalent: boolean; captions: [string, string, string, string] };
function switchScene(o: SwitchOpts): Mesh {
  const sc = scene();
  const { C, r, N } = standardCell(sc, { at: [0.5, 0, 0], r: 1.55, nucleus: 0.42 });
  const X0 = faceX(C, r, 0.2, 0);
  put(sc, "rec", surfaceReceptor([X0, 0.2, 0], 0.3));
  const K: Vec3 = [X0 + 0.75, 0.05, 0];
  put(sc, "kras", sphere(0.34, 4, 8), { at: K });
  put(sc, "pivot", dots([[K[0], K[1] + 0.34, K[2]]]));
  const lever = put(sc, "lever", polyline([[0, 0, 0], [0, 0.45, 0]], "hot"), { at: [K[0], K[1] + 0.34, K[2]] });
  const G0: Vec3 = [X0 + 0.4, -1.2, 0.3], G1: Vec3 = [K[0] - 0.25, K[1] - 0.25, K[2] + 0.15];
  const gtp = put(sc, "gtp", octahedron(0.1), { at: G0 });
  const mut = put(sc, "mut", dots([[K[0] + 0.3, K[1] + 0.12, K[2] + 0.12]], "hot"));
  const casc = put(sc, "casc", relay([K[0] + 0.34, K[1], K[2]], [N[0] - 0.42, N[1], N[2]], 6, 0.12));
  const D0: Vec3 = [-2.4, -1.3, 0.4], D1: Vec3 = [K[0] + 0.32, K[1] + 0.12, K[2] + 0.12];
  const drug = put(sc, "drug", pill(0.1), { at: D0 });
  const lock = put(sc, "lock", ring(0.2, 10, "accent", "z"), { at: D1 });
  const base = sc.mesh.points, P = sc.parts;
  const leverAngle = (pts: Vec3[], a: number) => { const i = lever.p0 + 1; pts[i] = [K[0] + 0.45 * Math.sin(a), K[1] + 0.34 + 0.45 * Math.cos(a), K[2]]; };
  const OFF = -1.3, ON = 0.3;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, casc, drug, lock, mut);
    let caption = "";
    if (t < 0.25) { const c = (t / 0.25) * 2; const on = c % 2 < 1; const u = phase(c % 1, 0, 0.5); leverAngle(pts, on ? OFF + (ON - OFF) * u : ON + (OFF - ON) * u); moveTo(pts, base, gtp, G0, G1, on ? u : 1 - u); grow(alpha, casc, on ? u : 1 - u); caption = o.captions[0]; }
    else if (t < 0.5) { const u = phase(t, 0.25, 0.5); leverAngle(pts, ON); moveTo(pts, base, gtp, G0, G1, 1); setAlpha(alpha, mut, pulse(t, 4)); setAlpha(alpha, casc, 1); setAlpha(alpha, P["cellNuc"], u > 0.3 ? pulse(t, 5) : 1); caption = o.captions[1]; }
    else if (t < 0.75) { const u = phase(t, 0.5, 0.7); leverAngle(pts, ON); moveTo(pts, base, gtp, G0, G1, 1); setAlpha(alpha, mut, 1); setAlpha(alpha, casc, 1); setAlpha(alpha, P["cellNuc"], pulse(t, 5)); setAlpha(alpha, drug, 1); moveTo(pts, base, drug, D0, D1, u, 1, t * 8); if (o.covalent) setAlpha(alpha, lock, phase(t, 0.68, 0.75)); caption = o.captions[2]; }
    else { const u = phase(t, 0.75, 0.9); setAlpha(alpha, drug, 1); moveTo(pts, base, drug, D0, D1, 1); if (o.covalent) setAlpha(alpha, lock, pulse(t, 3)); leverAngle(pts, ON + (OFF - ON) * u); moveTo(pts, base, gtp, G0, G1, 1 - u); setAlpha(alpha, casc, 1 - u); setAlpha(alpha, mut, 0.4); caption = o.captions[3]; }
    const labels: Lbl[] = [L([C[0], C[1] + r + 0.1, 0], "Inside the cell"), L([N[0], N[1] - 0.55, 0], "Nucleus: divide?"), L([K[0], K[1] - 0.5, K[2]], `${o.name} (a molecular switch)`)];
    if (t < 0.25 || t >= 0.9) labels.push(L([K[0] - 0.55, K[1] + 0.34 - 0.2, K[2]], "OFF"));
    else labels.push(L([K[0] + 0.25, K[1] + 0.34 + 0.45, K[2]], "ON"));
    if (t < 0.5) labels.push(L(G1, o.fuel));
    if (t >= 0.25 && t < 0.75) labels.push(L([K[0] + 0.3, K[1] + 0.35, K[2] + 0.12], "Mutation jams it ON"));
    if (t >= 0.5) labels.push(L(t < 0.7 ? lerp3(D0, D1, phase(t, 0.5, 0.7)) : [D1[0] + 0.25, D1[1] - 0.3, D1[2]], o.drug));
    if (t >= 0.5 && t < 0.75) labels.push(L(lerp3([K[0] + 0.34, K[1], K[2]], [N[0] - 0.42, N[1], N[2]], 0.5), "Grow signal"));
    return { caption, labels };
  });
}

// =====================================================================================
// Tumour suppressor (TP53): the brake on cell division is lost; drugs restore or exploit
// =====================================================================================
function suppressorScene(): Mesh {
  const sc = scene();
  const { C, r, N } = standardCell(sc, { at: [-0.4, 0, 0], r: 1.35, nucleus: 0.45 });
  const dmg = put(sc, "dmg", dots([[N[0] - 0.15, N[1] + 0.15, 0.1], [N[0] + 0.15, N[1] - 0.1, -0.1], [N[0], N[1] + 0.25, -0.1]], "hot"));
  const WHEEL: Vec3 = [C[0] - 0.55, -0.35, 0.2];
  put(sc, "wheel", ring(0.38, 14, undefined, "z"), { at: WHEEL });
  const spokes = put(sc, "spokes", polyline([[WHEEL[0] - 0.38, WHEEL[1], WHEEL[2]], [WHEEL[0] + 0.38, WHEEL[1], WHEEL[2]]]));
  const spokes2 = put(sc, "spokes2", polyline([[WHEEL[0], WHEEL[1] - 0.38, WHEEL[2]], [WHEEL[0], WHEEL[1] + 0.38, WHEEL[2]]]));
  const B0: Vec3 = [WHEEL[0], WHEEL[1] + 0.85, WHEEL[2]], B1: Vec3 = [WHEEL[0], WHEEL[1] + 0.5, WHEEL[2]];
  const brake = put(sc, "brake", (() => { const m = empty(); add(m, box(0.6, 0.14, 0.3)); add(m, line([0, 0.07, 0], [0, 0.3, 0])); return m; })(), { at: B0 });
  const sig = put(sc, "sig", relay([N[0] - 0.4, N[1], 0], [B0[0], B0[1] + 0.3, B0[2]], 4, 0.08));
  const D: Vec3 = [1.9, -0.2, 0];
  const daughter = put(sc, "daughter", cell(0.95, "soft"), { at: D });
  const daughterNuc = put(sc, "dNuc", sphere(0.32, 3, 8, "soft"), { at: D });
  const daughterDmg = put(sc, "dDmg", dots([[D[0] - 0.1, D[1] + 0.1, 0.1], [D[0] + 0.12, D[1] - 0.08, -0.1]], "hot"));
  const A0: Vec3 = [-2.6, 1.6, 0.3];
  const drug = put(sc, "drug", pill(0.12), { at: A0 });
  const base = sc.mesh.points;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, dmg, sig, daughter, daughterNuc, daughterDmg, drug);
    let caption = "";
    const spin = (a: number) => { shift(pts, base, spokes, [0, 0, 0], 1, 0); const rot = (p: Part) => { for (let i = p.p0; i < p.p1; i++) { const x = base[i][0] - WHEEL[0], y = base[i][1] - WHEEL[1]; pts[i] = [WHEEL[0] + x * Math.cos(a) - y * Math.sin(a), WHEEL[1] + x * Math.sin(a) + y * Math.cos(a), base[i][2]]; } }; rot(spokes); rot(spokes2); };
    if (t < 0.25) { const u = phase(t, 0, 0.25); setAlpha(alpha, dmg, pulse(t, 4)); grow(alpha, sig, u); moveTo(pts, base, brake, B0, B1, phase(t, 0.15, 0.25)); spin(t * TAU * 1.5 * (1 - phase(t, 0.15, 0.25))); caption = "1 · A tumour suppressor is a brake: when DNA is damaged, it halts cell division until repairs are made"; }
    else if (t < 0.5) { const u = phase(t, 0.25, 0.5); setAlpha(alpha, dmg, 1); setAlpha(alpha, sig, 1 - u); moveTo(pts, base, brake, B0, B1, 1 - u); setAlpha(alpha, brake, 1 - 0.8 * u); spin(0); caption = "2 · In most cancers the brake gene (TP53, BRCA, RB) is lost or broken"; }
    else if (t < 0.75) { const u = phase(t, 0.5, 0.75); setAlpha(alpha, dmg, 1); setAlpha(alpha, brake, 0.2); spin(t * TAU * 3); setAlpha(alpha, daughter, u); setAlpha(alpha, daughterNuc, u); setAlpha(alpha, daughterDmg, u > 0.6 ? pulse(t, 5) : 0); moveTo(pts, base, daughter, [D[0] - 1.2, D[1], D[2]], D, u); moveTo(pts, base, daughterNuc, [D[0] - 1.2, D[1], D[2]], D, u); moveTo(pts, base, daughterDmg, [D[0] - 1.2, D[1], D[2]], D, u); caption = "3 · Damaged cells keep dividing, passing their damage on: mutations pile up"; }
    else { const u = phase(t, 0.75, 1); setAlpha(alpha, dmg, 1); setAlpha(alpha, daughter, 1); setAlpha(alpha, daughterNuc, 1); setAlpha(alpha, daughterDmg, 1); setAlpha(alpha, drug, 1); moveTo(pts, base, drug, A0, [B0[0], B0[1] + 0.45, B0[2]], Math.min(1, u * 1.5), 1, t * 8); setAlpha(alpha, brake, 0.2 + 0.8 * u); moveTo(pts, base, brake, B0, B1, u); spin(t * TAU * 3 * (1 - u)); caption = "4 · Drugs try to restore the brake (p53 reactivators, MDM2 blockers) or exploit the weakness it leaves behind"; }
    const labels: Lbl[] = [L([C[0], C[1] + r + 0.1, 0], "Cell"), L([N[0], N[1] + 0.6, 0], "Damaged DNA"), L([WHEEL[0] - 0.9, WHEEL[1], WHEEL[2]], "Cell-division cycle"), L([B0[0] + 0.5, B0[1] + 0.1, B0[2]], t < 0.5 || t >= 0.75 ? "Brake (tumour suppressor)" : "Brake lost")];
    if (t >= 0.6) labels.push(L([D[0], D[1] + 1.05, D[2]], "Daughter cell, damage copied"));
    if (t >= 0.75) labels.push(L([B0[0], B0[1] + 0.75, B0[2]], "Drug restores the brake"));
    return { caption, labels };
  });
}

/** BRCA + PARP: two DNA repair crews; lose one by mutation, block the other with a drug, the cell dies. */
function syntheticLethalityScene(): Mesh {
  const sc = scene();
  const { C, r, N } = standardCell(sc, { at: [0, 0, 0], r: 1.7, nucleus: 0.9 });
  const strand = put(sc, "dna", dna(0.16, 1.4, 2, 24, undefined, 4), { at: N, rotZ: Math.PI / 2 });
  const nick = put(sc, "nick", dots([[N[0] - 0.2, N[1] + 0.16, 0], [N[0] + 0.3, N[1] - 0.16, 0]], "hot"));
  const brk = put(sc, "break", (() => { const m = empty(); add(m, line([N[0] - 0.05, N[1] - 0.4, 0], [N[0] + 0.05, N[1] + 0.4, 0], "hot")); add(m, line([N[0] + 0.02, N[1] - 0.4, 0.1], [N[0] + 0.12, N[1] + 0.4, 0.1], "hot")); return m; })());
  const BRCA: Vec3 = [N[0] - 0.7, N[1] + 0.9, 0.2], PARP: Vec3 = [N[0] + 0.7, N[1] + 0.9, -0.2];
  const brca = put(sc, "brca", (() => { const m = empty(); add(m, box(0.42, 0.28, 0.28)); add(m, polyline([[-0.1, -0.14, 0], [-0.1, -0.34, 0]])); add(m, polyline([[0.1, -0.14, 0], [0.1, -0.34, 0]])); return m; })(), { at: BRCA });
  const parp = put(sc, "parp", (() => { const m = empty(); add(m, sphere(0.2, 3, 8)); add(m, line([0, -0.2, 0], [0, -0.38, 0])); return m; })(), { at: PARP });
  const cross = put(sc, "cross", (() => { const m = empty(); add(m, line([-0.28, -0.28, 0.2], [0.28, 0.28, 0.2], "hot")); add(m, line([-0.28, 0.28, 0.2], [0.28, -0.28, 0.2], "hot")); return m; })(), { at: BRCA });
  const D0: Vec3 = [2.7, -1.2, 0.3];
  const drug = put(sc, "drug", pill(0.12), { at: D0 });
  const base = sc.mesh.points, P = sc.parts;
  const PARP_ON: Vec3 = [N[0] + 0.3, N[1] + 0.05, 0];
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, brk, cross, drug);
    let caption = "";
    if (t < 0.25) { const u = phase(t, 0, 0.25); setAlpha(alpha, nick, u < 0.5 ? pulse(t, 5) : 1 - phase(t, 0.15, 0.25)); moveTo(pts, base, brca, BRCA, [N[0] - 0.2, N[1] + 0.4, 0], Math.sin(u * Math.PI)); moveTo(pts, base, parp, PARP, [N[0] + 0.3, N[1] + 0.35, 0], Math.sin(u * Math.PI)); caption = "1 · DNA is nicked and broken all the time; two repair crews fix it: BRCA (big breaks) and PARP (small nicks)"; }
    else if (t < 0.5) { const u = phase(t, 0.25, 0.5); setAlpha(alpha, cross, u); setAlpha(alpha, brca, 1 - 0.7 * u); setAlpha(alpha, nick, pulse(t, 4)); moveTo(pts, base, parp, PARP, [N[0] + 0.3, N[1] + 0.35, 0], Math.abs(Math.sin(t * TAU * 1.5))); caption = "2 · In a BRCA-mutant cancer cell the BRCA crew is missing, so the cell leans entirely on PARP"; }
    else if (t < 0.75) { const u = phase(t, 0.5, 0.7); setAlpha(alpha, cross, 1); setAlpha(alpha, brca, 0.3); setAlpha(alpha, nick, 1); setAlpha(alpha, drug, 1); moveTo(pts, base, parp, PARP, PARP_ON, 1); moveTo(pts, base, drug, D0, [PARP_ON[0] + 0.05, PARP_ON[1] + 0.22, 0.15], u, 1, t * 8); setAlpha(alpha, brk, phase(t, 0.65, 0.75)); caption = "3 · A PARP inhibitor (olaparib) traps PARP on the DNA: small nicks turn into big breaks nobody can fix"; }
    else { const u = phase(t, 0.75, 1); setAlpha(alpha, cross, 1); setAlpha(alpha, brca, 0.3); setAlpha(alpha, drug, 1); moveTo(pts, base, parp, PARP, PARP_ON, 1); moveTo(pts, base, drug, D0, [PARP_ON[0] + 0.05, PARP_ON[1] + 0.22, 0.15], 1); setAlpha(alpha, brk, pulse(t, 5)); setAlpha(alpha, nick, 1); setAlpha(alpha, P["cell"], 1 - 0.6 * u); setAlpha(alpha, P["cellNuc"], 1 - 0.6 * u); setAlpha(alpha, strand, 1 - 0.5 * u); shift(pts, base, P["cell"], [0, 0, 0], 1 - 0.15 * u); caption = "4 · The cancer cell dies. Healthy cells still have BRCA, so they cope: this is synthetic lethality"; }
    const labels: Lbl[] = [L([C[0], C[1] + r + 0.1, 0], "Cancer cell"), L([N[0], N[1] - 1.1, 0], "DNA")];
    labels.push(L(t < 0.25 ? lerp3(BRCA, [N[0] - 0.2, N[1] + 0.4, 0], Math.sin(phase(t, 0, 0.25) * Math.PI)) : BRCA, t < 0.25 ? "BRCA repair crew" : "BRCA missing (mutated)"));
    labels.push(L(t < 0.5 ? PARP : PARP_ON, t < 0.5 ? "PARP repair crew" : "PARP trapped on DNA"));
    if (t >= 0.5) labels.push(L(t < 0.7 ? lerp3(D0, [PARP_ON[0] + 0.05, PARP_ON[1] + 0.22, 0.15], phase(t, 0.5, 0.7)) : [PARP_ON[0] + 0.45, PARP_ON[1] + 0.3, 0.15], "PARP inhibitor"));
    if (t >= 0.7) labels.push(L([N[0] + 0.1, N[1] + 0.55, 0.1], "Unrepaired breaks"));
    return { caption, labels };
  });
}

// =====================================================================================
// Stroma (FAP): fibroblasts wall off the tumour; drugs aim at the wall
// =====================================================================================
function stromaScene(): Mesh {
  const sc = scene();
  const TUM: Vec3[] = [[0, 0.1, 0], [0.45, -0.25, 0.2], [-0.4, -0.3, -0.15]];
  TUM.forEach((p, i) => put(sc, `tum${i}`, cell(0.38, "hot"), { at: p }));
  const fibs: Part[] = [];
  const fibPos: Vec3[] = [];
  for (let i = 0; i < 6; i++) { const a = (TAU * i) / 6 + 0.3; const p: Vec3 = [1.35 * Math.cos(a), 0.9 * Math.sin(a), 0.4 * Math.sin(a * 2)]; fibPos.push(p); fibs.push(put(sc, `fib${i}`, ellipsoid(0.34, 0.12, 0.12, 2, 8), { at: [p[0] * 1.5, p[1] * 1.5, p[2] * 1.5], rotZ: a + Math.PI / 2 })); }
  const fibres: Part[] = [];
  for (let i = 0; i < 10; i++) { const a = (TAU * i) / 10; const b = a + 0.9; fibres.push(put(sc, `fx${i}`, polyline([[1.2 * Math.cos(a), 0.85 * Math.sin(a), 0.3 * Math.sin(a * 3)], [1.3 * Math.cos((a + b) / 2), 0.95 * Math.sin((a + b) / 2), -0.2], [1.2 * Math.cos(b), 0.85 * Math.sin(b), 0.3 * Math.sin(b * 3)]], "soft"))); }
  const tcells: Part[] = []; const T0: Vec3[] = [[-2.9, 1.0, 0.3], [-3.0, -0.6, -0.2], [2.9, 0.8, 0.1]];
  T0.forEach((p, i) => tcells.push(put(sc, `tc${i}`, icosahedron(0.16), { at: p })));
  const D0: Vec3 = [2.9, -1.2, 0.3];
  const drug = put(sc, "drug", antibody(0.32, "accent"), { at: D0 });
  const zaps = fibPos.map((p, i) => put(sc, `zap${i}`, dots([[p[0] * 1.5, p[1] * 1.5, p[2] * 1.5]], "accent")));
  const base = sc.mesh.points;
  const wallEdge = (p: Vec3): Vec3 => { const L2 = Math.hypot(p[0] / 1.55, p[1] / 1.15) || 1; return [p[0] / L2, p[1] / L2, p[2]]; };
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, ...fibres, ...tcells, drug, ...zaps);
    let caption = "";
    if (t < 0.25) { const u = phase(t, 0, 0.25); fibs.forEach((f) => setAlpha(alpha, f, 0.3 + 0.7 * u)); TUM.forEach((_, i) => setAlpha(alpha, sc.parts[`tum${i}`], pulse(t, 3))); caption = "1 · Around the tumour cells sit fibroblasts: the body's builders and repairers"; }
    else if (t < 0.5) { const u = phase(t, 0.25, 0.5); fibs.forEach((f, i) => moveTo(pts, base, f, [fibPos[i][0] * 1.5, fibPos[i][1] * 1.5, fibPos[i][2] * 1.5], fibPos[i], u)); fibres.forEach((f, i) => grow(alpha, f, Math.max(0, Math.min(1, u * 10 - i * 0.7)))); caption = "2 · The tumour recruits them; they lay down a dense fibre matrix, a wall around it"; }
    else if (t < 0.75) { const u = phase(t, 0.5, 0.75); fibs.forEach((f, i) => moveTo(pts, base, f, [fibPos[i][0] * 1.5, fibPos[i][1] * 1.5, fibPos[i][2] * 1.5], fibPos[i], 1)); fibres.forEach((f) => setAlpha(alpha, f, 1)); tcells.forEach((c, i) => { setAlpha(alpha, c, 1); moveTo(pts, base, c, T0[i], wallEdge(T0[i]), Math.min(1, u * 1.2), 1, t * 6); }); caption = "3 · The wall keeps immune cells and drugs out, and feeds the tumour"; }
    else { const u = phase(t, 0.75, 1); fibs.forEach((f, i) => { moveTo(pts, base, f, [fibPos[i][0] * 1.5, fibPos[i][1] * 1.5, fibPos[i][2] * 1.5], fibPos[i], 1); setAlpha(alpha, f, 1 - 0.7 * phase(t, 0.85, 1)); }); fibres.forEach((f) => setAlpha(alpha, f, 1 - phase(t, 0.85, 1))); setAlpha(alpha, drug, 1); moveTo(pts, base, drug, D0, [fibPos[0][0], fibPos[0][1] + 0.35, fibPos[0][2]], Math.min(1, u * 1.6)); zaps.forEach((z, i) => { setAlpha(alpha, z, phase(t, 0.82, 0.9) * pulse(t, 5)); moveTo(pts, base, z, [fibPos[i][0] * 1.5, fibPos[i][1] * 1.5, fibPos[i][2] * 1.5], fibPos[i], 1); }); tcells.forEach((c, i) => { setAlpha(alpha, c, 1); moveTo(pts, base, c, T0[i], lerp3(wallEdge(T0[i]), [TUM[i][0] - 0.3, TUM[i][1] + 0.3, TUM[i][2]], phase(t, 0.88, 1)), 1, 1, t * 6); }); caption = "4 · Drugs aim at the fibroblasts themselves (FAP) to breach the wall, or use FAP as a beacon for radioligands"; }
    const labels: Lbl[] = [L([0, 0.65, 0], "Tumour cells"), L(t < 0.25 ? [fibPos[1][0] * 1.5, fibPos[1][1] * 1.5 + 0.2, fibPos[1][2]] : [fibPos[1][0], fibPos[1][1] + 0.25, fibPos[1][2]], "Fibroblast (FAP on its surface)")];
    if (t >= 0.35 && t < 0.9) labels.push(L([-1.25, -0.85, 0.3], "Fibre matrix (the wall)"));
    if (t >= 0.5) labels.push(L([-2.9, 1.25, 0.3], "Immune cells kept out"));
    if (t >= 0.75) labels.push(L(lerp3(D0, [fibPos[0][0], fibPos[0][1] + 0.35, fibPos[0][2]], Math.min(1, phase(t, 0.75, 1) * 1.6)), "Anti-FAP drug"));
    return { caption, labels };
  });
}

// =====================================================================================
// Generic "other": a protein the cancer depends on; a drug binds it; something changes
// =====================================================================================
function genericScene(): Mesh {
  const sc = scene();
  const { C, r, N } = standardCell(sc);
  const X0 = faceX(C, r, 0.3, 0.1);
  const surf = put(sc, "surf", surfaceReceptor([X0, 0.3, 0.1], 0.3));
  const INNER: Vec3 = [C[0] - 0.35, -0.35, 0.1];
  const inner = put(sc, "inner", sphere(0.18, 3, 8), { at: INNER });
  const A0: Vec3 = [-2.4, 1.2, 0.2], A1: Vec3 = [X0 - 0.3 - 0.45, 0.3 - 0.2, 0.1];
  const ab = put(sc, "ab", antibody(0.42, "accent"), { at: A0 });
  const D0: Vec3 = [-2.4, -1.3, 0.3], D1: Vec3 = [INNER[0], INNER[1] + 0.05, INNER[2]];
  const drug = put(sc, "drug", pill(0.1), { at: D0 });
  const sig = put(sc, "sig", relay([INNER[0] + 0.18, INNER[1], INNER[2]], [N[0] - 0.36, N[1], N[2]], 4, 0.1));
  const base = sc.mesh.points, P = sc.parts;
  return frame(sc, 11, (t, pts, alpha) => {
    hide(alpha, ab, drug);
    let caption = "";
    if (t < 0.25) { setAlpha(alpha, surf, pulse(t, 4)); setAlpha(alpha, inner, pulse(t + 0.1, 4)); grow(alpha, sig, phase(t, 0.1, 0.25)); caption = "1 · A target is a molecule the cancer depends on: for growth, survival, or hiding from the immune system"; }
    else if (t < 0.5) { setAlpha(alpha, sig, 1); setAlpha(alpha, P["cellNuc"], pulse(t, 5)); caption = "2 · It may sit on the cell surface (reachable by antibodies) or inside the cell (reachable by small molecules)"; }
    else if (t < 0.75) { const u = phase(t, 0.5, 0.72); setAlpha(alpha, sig, 1); setAlpha(alpha, ab, 1); setAlpha(alpha, drug, 1); moveTo(pts, base, ab, A0, A1, u); moveTo(pts, base, drug, D0, D1, u, 1, t * 8); caption = "3 · A drug is designed to bind that molecule precisely, and little else"; }
    else { const u = phase(t, 0.75, 1); setAlpha(alpha, ab, 1); setAlpha(alpha, drug, 1); moveTo(pts, base, ab, A0, A1, 1); moveTo(pts, base, drug, D0, D1, 1); setAlpha(alpha, sig, 1 - u); setAlpha(alpha, P["cell"], 1 - 0.3 * u); caption = "4 · Binding switches the molecule off, flags the cell for the immune system, or delivers a payload"; }
    const labels: Lbl[] = [L([C[0], C[1] + r + 0.1, 0], "Cancer cell"), L([N[0], N[1] - 0.45, 0], "Inside the cell"), L([X0 - 0.35, 0.3, 0.1], "Surface target"), L([INNER[0], INNER[1] - 0.3, INNER[2]], "Inside target")];
    if (t >= 0.5) labels.push(L(t < 0.72 ? lerp3(A0, A1, phase(t, 0.5, 0.72)) : A1, "Antibody drug"), L(t < 0.72 ? lerp3(D0, D1, phase(t, 0.5, 0.72)) : [D1[0] - 0.3, D1[1] - 0.25, D1[2]], "Small-molecule drug"));
    return { caption, labels };
  });
}

// =====================================================================================
// T-cell redirection (BCMA, CD19): CAR-T then bispecific engager pull a T cell onto the cancer cell
// =====================================================================================
type RedirectOpts = { antigen: string; cellName: string; captions: [string, string, string, string] };
function redirectScene(o: RedirectOpts): Mesh {
  const sc = scene();
  const TUM: Vec3 = [1.2, 0, 0];
  put(sc, "tum", cell(0.9), { at: TUM });
  const tumNuc = put(sc, "tumNuc", sphere(0.3, 4, 8, "soft"), { at: [TUM[0] + 0.2, 0, 0] });
  const ag1 = put(sc, "ag1", surfaceReceptor([faceX(TUM, 0.9, 0.35, 0.1), 0.35, 0.1], 0.28));
  const ag2 = put(sc, "ag2", surfaceReceptor([faceX(TUM, 0.9, -0.4, -0.1), -0.4, -0.1], 0.28));
  const CAR0: Vec3 = [-2.6, 0.8, 0.2], CAR1: Vec3 = [faceX(TUM, 0.9, 0.35, 0.1) - 0.28 - 0.3 - 0.62, 0.35, 0.1];
  const car = put(sc, "car", icosahedron(0.62), { at: CAR0 });
  const carRec = put(sc, "carRec", (() => { const m = empty(); add(m, line([0, 0, 0], [0.3, 0, 0], "accent")); add(m, antibody(0.16, "accent"), { at: [0.38, 0, 0], rotZ: -Math.PI / 2 }); return m; })(), { at: [CAR0[0] + 0.62, CAR0[1], CAR0[2]] });
  const T0: Vec3 = [-2.6, -1.3, -0.2], T1: Vec3 = [faceX(TUM, 0.9, -0.4, -0.1) - 0.28 - 0.75 - 0.62, -0.4, -0.1];
  const tcell = put(sc, "t", icosahedron(0.62), { at: T0 });
  const cd3 = put(sc, "cd3", receptor([T0[0] + 0.62, T0[1], T0[2]], 0.22));
  const B0: Vec3 = [-0.4, -2.2, 0.3], B1: Vec3 = [faceX(TUM, 0.9, -0.4, -0.1) - 0.28 - 0.4, -0.4, -0.1];
  const bsab = put(sc, "bs", (() => { const m = empty(); add(m, antibody(0.32, "accent"), { rotZ: Math.PI / 2 }); const [, rt] = antibodyTips(0.32); add(m, sphere(0.07, 2, 6, "hot"), { at: [-rt[1], rt[0], 0] }); return m; })(), { at: B0 });
  const gran1 = put(sc, "g1", dots([[CAR1[0] + 0.5, CAR1[1] + 0.1, 0.1], [CAR1[0] + 0.55, CAR1[1] - 0.1, -0.1]], "hot"));
  const gran2 = put(sc, "g2", dots([[T1[0] + 0.5, T1[1] + 0.1, 0.1], [T1[0] + 0.55, T1[1] - 0.1, -0.1]], "hot"));
  const base = sc.mesh.points, P = sc.parts;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, car, carRec, tcell, cd3, bsab, gran1, gran2);
    let caption = "";
    if (t < 0.22) { show(alpha, pulse(t, 4), ag1, ag2); caption = o.captions[0]; }
    else if (t < 0.5) { const u = phase(t, 0.22, 0.45); show(alpha, 1, car, carRec); moveTo(pts, base, car, CAR0, CAR1, u); moveTo(pts, base, carRec, CAR0, CAR1, u); caption = o.captions[1]; }
    else if (t < 0.75) { show(alpha, 1, car, carRec, tcell, cd3); moveTo(pts, base, car, CAR0, CAR1, 1); moveTo(pts, base, carRec, CAR0, CAR1, 1); const u = phase(t, 0.5, 0.62), v = phase(t, 0.6, 0.75); setAlpha(alpha, bsab, 1); moveTo(pts, base, bsab, B0, B1, u); moveTo(pts, base, tcell, T0, T1, v); moveTo(pts, base, cd3, T0, T1, v); caption = o.captions[2]; }
    else { show(alpha, 1, car, carRec, tcell, cd3, bsab); moveTo(pts, base, car, CAR0, CAR1, 1); moveTo(pts, base, carRec, CAR0, CAR1, 1); moveTo(pts, base, bsab, B0, B1, 1); moveTo(pts, base, tcell, T0, T1, 1); moveTo(pts, base, cd3, T0, T1, 1); const u = phase(t, 0.75, 1); show(alpha, 1, gran1, gran2); moveTo(pts, base, gran1, [CAR1[0] + 0.5, CAR1[1], 0], [TUM[0] - 0.2, 0.2, 0], u); moveTo(pts, base, gran2, [T1[0] + 0.5, T1[1], 0], [TUM[0] - 0.2, -0.2, 0], u); setAlpha(alpha, P["tum"], 1 - 0.6 * u); setAlpha(alpha, tumNuc, 1 - 0.6 * u); shift(pts, base, P["tum"], [0, 0, 0], 1 - 0.2 * u); caption = o.captions[3]; }
    const labels: Lbl[] = [L([TUM[0], 1.05, 0], o.cellName), L([faceX(TUM, 0.9, 0.35, 0.1) - 0.3, 0.6, 0.1], o.antigen)];
    if (t >= 0.22) labels.push(L(t < 0.45 ? lerp3([CAR0[0], CAR0[1] + 0.8, CAR0[2]], [CAR1[0], CAR1[1] + 0.8, CAR1[2]], phase(t, 0.22, 0.45)) : [CAR1[0], CAR1[1] + 0.8, CAR1[2]], "CAR-T cell (engineered receptor)"));
    if (t >= 0.5) labels.push(L(t < 0.62 ? lerp3(B0, B1, phase(t, 0.5, 0.62)) : [B1[0], B1[1] - 0.45, B1[2]], "Bispecific: one arm on the cancer, one on the T cell"), L(t < 0.75 ? lerp3([T0[0], T0[1] - 0.8, T0[2]], [T1[0], T1[1] - 0.8, T1[2]], phase(t, 0.6, 0.75)) : [T1[0], T1[1] - 0.8, T1[2]], "Ordinary T cell"));
    if (t >= 0.75) labels.push(L([TUM[0] - 0.3, 0.45, 0], "Kill"));
    return { caption, labels };
  });
}

// =====================================================================================
// Radioligand (PSMA): small ligand carries a radioactive atom; beta particles break DNA nearby
// =====================================================================================
function radioligandScene(o: { antigen: string; cellName: string; captions: [string, string, string, string] }): Mesh {
  const sc = scene();
  const { C, r, N } = standardCell(sc);
  const NEIGH: Vec3 = [1.9, -1.5, 0.7];
  put(sc, "neigh", cell(0.6, "soft"), { at: NEIGH });
  const recs = ([[0.3, 0.1], [-0.25, -0.15], [0.05, 0.45]] as Array<[number, number]>).map(([y, z], i) => put(sc, `rec${i}`, surfaceReceptor([faceX(C, r, y, z), y, z], 0.28)));
  const L0: Vec3 = [-2.4, 0.6, 0.2], L1: Vec3 = [faceX(C, r, 0.3, 0.1) - 0.28 - 0.14, 0.3, 0.1];
  const lig = put(sc, "lig", (() => { const m = empty(); add(m, pill(0.1)); add(m, line([-0.1, 0, 0], [-0.3, 0.05, 0], "accent")); add(m, sphere(0.09, 2, 6, "hot"), { at: [-0.4, 0.06, 0] }); return m; })(), { at: L0 });
  const rays: Part[] = [];
  const RAY: Vec3 = [L1[0] - 0.4, L1[1] + 0.06, L1[2]];
  for (let i = 0; i < 6; i++) { const a = (TAU * i) / 6 + 0.2; rays.push(put(sc, `ray${i}`, polyline([RAY, [RAY[0] + 1.6 * Math.cos(a), RAY[1] + 1.6 * Math.sin(a), RAY[2] + 0.5 * Math.sin(a * 2)]], "accent"))); }
  const dmg = put(sc, "dmg", dots([[N[0] - 0.1, N[1] + 0.15, 0.1], [N[0] + 0.12, N[1] - 0.05, -0.1], [N[0], N[1] + 0.2, -0.12]], "hot"));
  const ndmg = put(sc, "ndmg", dots([[NEIGH[0] - 0.05, NEIGH[1] + 0.1, NEIGH[2]], [NEIGH[0] + 0.08, NEIGH[1] - 0.05, NEIGH[2]]], "hot"));
  const base = sc.mesh.points, P = sc.parts;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, ...rays, dmg, ndmg);
    let caption = "";
    if (t < 0.25) { recs.forEach((p) => setAlpha(alpha, p, pulse(t, 4))); caption = o.captions[0]; }
    else if (t < 0.5) { const u = phase(t, 0.25, 0.5); moveTo(pts, base, lig, L0, L1, u, 1, u * 3); caption = o.captions[1]; }
    else if (t < 0.75) { moveTo(pts, base, lig, L0, L1, 1); const u = phase(t, 0.5, 0.75); rays.forEach((ry, i) => grow(alpha, ry, Math.max(0, Math.min(1, u * 2 - i * 0.15)) * (0.6 + 0.4 * Math.sin(t * TAU * 6 + i)))); caption = o.captions[2]; }
    else { moveTo(pts, base, lig, L0, L1, 1); const u = phase(t, 0.75, 1); rays.forEach((ry, i) => setAlpha(alpha, ry, 0.5 + 0.5 * Math.sin(t * TAU * 6 + i))); setAlpha(alpha, dmg, pulse(t, 5)); setAlpha(alpha, ndmg, u > 0.5 ? pulse(t, 5) : 0); setAlpha(alpha, P["cell"], 1 - 0.4 * u); caption = o.captions[3]; }
    const labels: Lbl[] = [L([C[0], C[1] + r + 0.1, 0], o.cellName), L([faceX(C, r, 0.3, 0.1) - 0.3, 0.55, 0.1], o.antigen)];
    if (t >= 0.25) labels.push(L(t < 0.5 ? lerp3(L0, L1, phase(t, 0.25, 0.5)) : [L1[0] - 0.2, L1[1] - 0.35, L1[2]], "Ligand + radioactive atom"));
    if (t >= 0.5) labels.push(L([RAY[0] - 1.2, RAY[1] + 0.9, RAY[2]], "Radiation (a few millimetres)"));
    if (t >= 0.75) labels.push(L([N[0], N[1] + 0.3, 0.1], "DNA broken"), L([NEIGH[0], NEIGH[1] - 0.75, NEIGH[2]], "Neighbour hit too (crossfire)"));
    return { caption, labels };
  });
}

// =====================================================================================
// VEGF: tumour calls for blood vessels; antibody mops up the signal
// =====================================================================================
function vegfScene(): Mesh {
  const sc = scene();
  const TUM: Vec3 = [-1.3, 0.1, 0];
  put(sc, "tum", cell(0.75, "hot"), { at: TUM });
  put(sc, "tum2", cell(0.45, "hot"), { at: [TUM[0] + 0.55, TUM[1] - 0.55, 0.3] });
  put(sc, "vessel", cylinder(0.3, 3.2, 12, 4, "soft"), { at: [1.9, 0, 0] });
  const V0: Vec3[] = [[TUM[0] + 0.7, 0.4, 0.1], [TUM[0] + 0.75, -0.1, -0.15], [TUM[0] + 0.6, 0.7, -0.1], [TUM[0] + 0.8, -0.5, 0.2]];
  const sigs = V0.map((p, i) => put(sc, `v${i}`, octahedron(0.07), { at: p }));
  const sprouts = [[1.6, 0.8], [1.6, -0.6], [1.6, 0.1]].map(([x, y], i) => put(sc, `sp${i}`, polyline([[x, y, 0.1 * i], [x - 0.6, y * 0.7 + 0.1, 0.1 * i], [x - 1.2, y * 0.4, 0.05], [TUM[0] + 0.55, y * 0.3, 0]], "soft")));
  const A0: Vec3 = [0.4, -2.2, 0.4];
  const abs = [0, 1, 2].map((i) => put(sc, `ab${i}`, antibody(0.3, "accent"), { at: [A0[0] + 0.3 * i, A0[1] + 0.2 * i, A0[2] - 0.2 * i] }));
  const base = sc.mesh.points, P = sc.parts;
  const VT: Vec3[] = V0.map((p, i) => [1.55, 0.5 - 0.35 * i, 0.15 * (i % 2)]);
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, ...sigs, ...sprouts, ...abs);
    let caption = "";
    if (t < 0.22) { setAlpha(alpha, P["tum"], pulse(t, 3)); shift(pts, base, P["tum"], [0, 0, 0], 1 + 0.08 * Math.sin(t * TAU * 3)); caption = "1 · A tumour bigger than a couple of millimetres starves unless it gets its own blood supply"; }
    else if (t < 0.5) { const u = phase(t, 0.22, 0.5); sigs.forEach((s, i) => { setAlpha(alpha, s, 1); moveTo(pts, base, s, V0[i], VT[i], Math.max(0, Math.min(1, u * 1.3 - i * 0.1))); }); caption = "2 · It releases VEGF, a signal that tells nearby vessels to sprout towards it"; }
    else if (t < 0.75) { const u = phase(t, 0.5, 0.75); sigs.forEach((s, i) => { setAlpha(alpha, s, 1 - u); moveTo(pts, base, s, V0[i], VT[i], 1); }); sprouts.forEach((sp, i) => grow(alpha, sp, Math.max(0, Math.min(1, u * 1.4 - i * 0.2)))); setAlpha(alpha, P["tum"], 1); caption = "3 · New vessels grow into the tumour, feeding it and giving cells a road to spread"; }
    else { const u = phase(t, 0.75, 1); sprouts.forEach((sp, i) => grow(alpha, sp, 1 - phase(t, 0.85, 1) * (1 - 0.35 * i))); sigs.forEach((s, i) => { setAlpha(alpha, s, u < 0.5 ? u * 2 : 1); moveTo(pts, base, s, V0[i], [V0[i][0] + 0.7, V0[i][1], V0[i][2]], Math.min(1, u * 1.5)); }); abs.forEach((ab, i) => { setAlpha(alpha, ab, 1); const from: Vec3 = [A0[0] + 0.3 * i, A0[1] + 0.2 * i, A0[2] - 0.2 * i]; moveTo(pts, base, ab, from, [V0[i][0] + 0.7, V0[i][1] - 0.35, V0[i][2]], Math.min(1, u * 1.5)); }); caption = "4 · Antibodies (bevacizumab) mop up VEGF or block its receptor; the vessels prune back and normalise"; }
    const labels: Lbl[] = [L([TUM[0], TUM[1] + 0.95, 0], "Tumour"), L([1.9, 1.75, 0], "Blood vessel")];
    if (t >= 0.22 && t < 0.75) labels.push(L(lerp3(V0[0], VT[0], t < 0.5 ? phase(t, 0.22, 0.5) : 1), "VEGF (‘build me vessels’ signal)"));
    if (t >= 0.55 && t < 0.9) labels.push(L([0.7, 0.75, 0], "New vessels sprouting"));
    if (t >= 0.75) labels.push(L([V0[0][0] + 0.7, V0[0][1] - 0.7, 0.1], "Anti-VEGF antibody soaks up the signal"));
    return { caption, labels };
  });
}

// =====================================================================================
// BCL-2: the self-destruct held shut; venetoclax lets go
// =====================================================================================
function bcl2Scene(): Mesh {
  const sc = scene();
  const { C, r } = standardCell(sc, { at: [0.2, 0, 0], r: 1.6, nucleus: 0.35 });
  const MITO: Vec3 = [C[0] - 0.5, -0.1, 0.1];
  const mito = put(sc, "mito", ellipsoid(0.75, 0.38, 0.35, 4, 12), { at: MITO });
  put(sc, "cristae", polyline([[MITO[0] - 0.55, MITO[1], 0.2], [MITO[0] - 0.35, MITO[1] + 0.2, 0.2], [MITO[0] - 0.15, MITO[1] - 0.2, 0.2], [MITO[0] + 0.05, MITO[1] + 0.2, 0.2], [MITO[0] + 0.25, MITO[1] - 0.2, 0.2], [MITO[0] + 0.45, MITO[1] + 0.1, 0.2]], "soft"));
  const B: Vec3 = [MITO[0] + 0.1, MITO[1] + 0.55, 0.15];
  const bcl2 = put(sc, "bcl2", (() => { const m = empty(); add(m, box(0.5, 0.22, 0.3)); add(m, polyline([[-0.12, -0.11, 0], [-0.12, -0.3, 0]])); add(m, polyline([[0.12, -0.11, 0], [0.12, -0.3, 0]])); return m; })(), { at: B });
  const bax = put(sc, "bax", dots([[B[0] - 0.1, B[1] - 0.28, B[2]], [B[0] + 0.1, B[1] - 0.28, B[2] + 0.05]], "hot"));
  const D0: Vec3 = [-2.6, 1.5, 0.3], D1: Vec3 = [B[0] - 0.2, B[1] - 0.02, B[2] + 0.2];
  const drug = put(sc, "drug", pill(0.1), { at: D0 });
  const pores = [0, 1, 2].map((i) => put(sc, `pore${i}`, ring(0.08, 8, "hot", "y"), { at: [MITO[0] - 0.4 + 0.4 * i, MITO[1] + 0.36, 0.05] }));
  const cyt = put(sc, "cyt", dots([[MITO[0] - 0.4, MITO[1] + 0.6, 0.05], [MITO[0], MITO[1] + 0.7, -0.1], [MITO[0] + 0.4, MITO[1] + 0.65, 0.1], [MITO[0] + 0.2, MITO[1] + 0.9, 0]], "hot"));
  const base = sc.mesh.points, P = sc.parts;
  return frame(sc, 12, (t, pts, alpha) => {
    hide(alpha, drug, ...pores, cyt);
    let caption = "";
    if (t < 0.25) { setAlpha(alpha, bax, pulse(t, 3)); caption = "1 · Every cell carries a self-destruct (apoptosis). BCL-2 holds it shut by gripping the triggers, BAX and BAK"; }
    else if (t < 0.5) { const u = phase(t, 0.25, 0.5); shift(pts, base, bcl2, [0, 0, 0], 1 + 0.5 * u); setAlpha(alpha, bax, 0.6); caption = "2 · Leukaemia and lymphoma cells make far too much BCL-2, so damaged cells that should die never do"; }
    else if (t < 0.75) { const u = phase(t, 0.5, 0.72); shift(pts, base, bcl2, [0, 0, 0], 1.5); setAlpha(alpha, drug, 1); moveTo(pts, base, drug, D0, D1, u, 1, t * 8); setAlpha(alpha, bax, 0.6 + 0.4 * u); caption = "3 · Venetoclax is shaped like the trigger's grip site (a BH3 mimetic); it slides into the groove where BCL-2 holds BAX and BAK"; }
    else { const u = phase(t, 0.75, 1); shift(pts, base, bcl2, [0, 0.35 * u, 0], 1.5); setAlpha(alpha, drug, 1); moveTo(pts, base, drug, D0, [D1[0], D1[1] + 0.35 * u, D1[2]], 1); shift(pts, base, bax, [0, -0.25 * u, 0], 1 + u); pores.forEach((p, i) => setAlpha(alpha, p, phase(t, 0.8 + 0.04 * i, 0.9 + 0.04 * i))); setAlpha(alpha, cyt, phase(t, 0.88, 1) * pulse(t, 5)); setAlpha(alpha, mito, 1 - 0.3 * u); setAlpha(alpha, P["cell"], 1 - 0.4 * phase(t, 0.9, 1)); caption = "4 · Freed, BAX and BAK punch holes in the mitochondrion and the cell self-destructs within hours"; }
    const labels: Lbl[] = [L([C[0], C[1] + r + 0.1, 0], "Cancer cell"), L([MITO[0], MITO[1] - 0.6, 0.1], "Mitochondrion (power plant)"), L([B[0] + 0.55, B[1] + (t >= 0.75 ? 0.35 * phase(t, 0.75, 1) : 0), B[2]], "BCL-2 (the hand over the trigger)"), L([B[0] - 0.45, B[1] - 0.3 - (t >= 0.75 ? 0.25 * phase(t, 0.75, 1) : 0), B[2]], "BAX / BAK (self-destruct triggers)")];
    if (t >= 0.5) labels.push(L(t < 0.72 ? lerp3(D0, D1, phase(t, 0.5, 0.72)) : [D1[0] - 0.4, D1[1] + 0.3, D1[2]], "Venetoclax"));
    if (t >= 0.85) labels.push(L([MITO[0] + 0.6, MITO[1] + 0.9, 0], "Cell self-destructs"));
    return { caption, labels };
  });
}

// =====================================================================================
// Registry
// =====================================================================================
const CHECKPOINT_GENERIC: [string, string, string, string] = [
  "1 · A T cell (immune killer) finds a tumour cell and prepares to destroy it",
  "2 · The tumour shows a checkpoint partner; it grips the checkpoint on the T cell, a handshake that says ‘stand down’",
  "3 · An antibody drug covers one side of the handshake so it cannot form",
  "4 · With the brake released, the T cell kills the tumour cell",
];

/** Generic scene per targetClass, plus specific scenes keyed by target id. */
export const TARGET_ANIMATED: Record<string, () => Mesh> = {
  // ---- generic, keyed by class
  "surface-antigen": () => adcScene({ antigen: "Marker protein (antigen)", drug: "Antibody drug (ADC)" }),
  kinase: () => rtkScene({ receptor: "Receptor (kinase)", ligand: "Growth signal (ligand)", drug: "Kinase inhibitor plugs the ATP pocket", captions: [
    "1 · Receptors sit in the cell membrane waiting for a growth signal from outside",
    "2 · The signal (ligand) arrives; two receptors pair up and switch each other on",
    "3 · A relay of phosphorylations carries the message ‘grow, divide’ to the nucleus",
    "4 · A small-molecule drug plugs the ATP pocket the kinase needs; the relay goes quiet",
  ] }),
  checkpoint: () => checkpointScene({ onT: "Checkpoint (e.g. PD-1)", onTumour: "Its partner (e.g. PD-L1)", drugSide: "t", drug: "Checkpoint antibody", captions: CHECKPOINT_GENERIC }),
  "nuclear-receptor": () => nuclearReceptorScene({ hormone: "Hormone", receptor: "Hormone receptor", drug: "Receptor blocker", mode: "block", captions: [
    "1 · A hormone (oestrogen, testosterone) slips straight through the cell membrane",
    "2 · Inside, it binds its receptor: a protein waiting for exactly that hormone",
    "3 · The pair moves into the nucleus and switches on genes that tell the cell to grow",
    "4 · Drugs block the receptor, cut off the hormone supply, or destroy the receptor itself",
  ] }),
  enzyme: () => enzymeScene({ enzyme: "Enzyme (a molecular machine)", substrate: "Substrate", product: "Product", drug: "Inhibitor jams the pocket", captions: [
    "1 · An enzyme is a molecular machine with a pocket shaped for one job (the active site)",
    "2 · Molecules that fit the pocket are changed and released, thousands of times a second",
    "3 · An inhibitor drug is shaped to fit the same pocket, but it does not react and does not leave",
    "4 · The pocket is jammed: the reaction the cancer depends on stops",
  ] }),
  transcription: () => transcriptionScene({ factor: "Transcription factor", drug: "Degrader / blocker", mode: "degrade", captions: [
    "1 · A transcription factor is a protein that sits on DNA and decides which genes are read",
    "2 · In cancer, a broken or hijacked factor reads out a growth programme non-stop",
    "3 · A degrader drug tags the factor for the cell's waste disposal, or a blocker stops it docking",
    "4 · With the factor gone, the growth programme switches off",
  ] }),
  oncogene: () => switchScene({ name: "Oncogene protein", fuel: "GTP (fuel)", drug: "Inhibitor locks it OFF", covalent: false, captions: [
    "1 · Many oncogene proteins are switches: ON when fuel (GTP) is bound, OFF when it is spent",
    "2 · A mutation jams the switch ON, so the cell hears ‘grow’ without pause",
    "3 · A drug fits a pocket that only exists in the OFF shape, or the mutant shape",
    "4 · Held in the OFF shape, the switch can no longer send its signal",
  ] }),
  "tumor-suppressor": suppressorScene,
  stroma: stromaScene,
  other: genericScene,

  // ---- specific, keyed by target id
  her2: her2Scene,
  trop2: () => adcScene({ antigen: "TROP2 on the surface", drug: "ADC (Dato-DXd, sacituzumab govitecan)", neighbour: true, receptors: 4, payloads: 6, captions: [
    "1 · TROP2 is crowded on many lung, breast and other cancer cells, but sparse on healthy tissue",
    "2 · An antibody-drug conjugate finds TROP2 and locks on",
    "3 · The cell swallows the antibody; inside, the linker is cut",
    "4 · The toxin damages DNA in the cell and leaks into neighbours (bystander effect)",
  ] }),
  egfr: () => rtkScene({ receptor: "EGFR receptor", ligand: "Growth signal (EGF)", drug: "TKI (osimertinib) plugs the ATP pocket", mutant: "point", captions: [
    "1 · EGFR normally waits for a growth signal; in some lung cancers a mutation keeps it switched on with no signal",
    "2 · The mutant pair sits permanently ‘on’, phosphorylating itself",
    "3 · A relay carries ‘grow, divide’ to the nucleus, all day, every day",
    "4 · A tyrosine kinase inhibitor (osimertinib) plugs the ATP pocket; the relay goes quiet",
  ] }),
  alk: () => rtkScene({ receptor: "ALK receptor", ligand: "Growth signal", drug: "ALK inhibitor (alectinib, lorlatinib)", mutant: "fusion", captions: [
    "1 · In ALK-positive lung cancer a chromosome break glues ALK to a partner gene (a fusion)",
    "2 · The partner forces the ALK kinases together, so they are permanently on",
    "3 · The relay to the nucleus never stops: divide, divide, divide",
    "4 · ALK inhibitors plug the ATP pocket; later generations fit even after resistance mutations",
  ] }),
  braf: () => cascadeScene({ nodes: ["RAS", "BRAF", "MEK", "ERK"], stuck: 1, drugAt: 1, drug: "BRAF inhibitor", secondDrug: { at: 2, name: "MEK inhibitor" }, captions: [
    "1 · Growth signals travel down a relay inside the cell: RAS to BRAF to MEK to ERK to the nucleus",
    "2 · BRAF V600E is a single letter change that leaves BRAF stuck on: the relay runs without a signal",
    "3 · A BRAF inhibitor plugs the mutant kinase; a MEK inhibitor is added one step down",
    "4 · Two blocks in the same relay: the cell stops dividing, and resistance is slower to appear",
  ] }),
  "cdk4-6": () => cascadeScene({ nodes: ["Cyclin D", "CDK4/6", "RB (brake)", "E2F (go)"], stuck: 1, drugAt: 1, drug: "CDK4/6 inhibitor (palbociclib, ribociclib, abemaciclib)", captions: [
    "1 · Before a cell divides it must pass a checkpoint: CDK4/6, powered by cyclin D, switches off the RB brake",
    "2 · In hormone-driven breast cancer the cyclin D to CDK4/6 step runs hot, so the brake is always off",
    "3 · A CDK4/6 inhibitor fits the kinase's ATP pocket",
    "4 · RB stays on the brake; the cell parks before dividing. Combined with hormone therapy this doubles progression-free time",
  ] }),
  pd1: () => checkpointScene({ onT: "PD-1 (on the T cell)", onTumour: "PD-L1 (on the tumour)", drugSide: "t", drug: "Anti-PD-1 antibody (pembrolizumab, nivolumab)", captions: [
    "1 · A T cell (immune killer) finds a tumour cell and prepares to destroy it",
    "2 · The tumour shows PD-L1; it grips PD-1 on the T cell, a handshake that says ‘stand down’",
    "3 · An anti-PD-1 antibody covers PD-1 so the handshake cannot form",
    "4 · With the brake released, the T cell kills the tumour cell",
  ] }),
  pdl1: () => checkpointScene({ onT: "PD-1 (on the T cell)", onTumour: "PD-L1 (on the tumour)", drugSide: "tumour", drug: "Anti-PD-L1 antibody (atezolizumab, durvalumab)", captions: [
    "1 · A T cell (immune killer) finds a tumour cell and prepares to destroy it",
    "2 · The tumour shows PD-L1; it grips PD-1 on the T cell, a handshake that says ‘stand down’",
    "3 · An anti-PD-L1 antibody covers PD-L1 on the tumour so the handshake cannot form",
    "4 · With the brake released, the T cell kills the tumour cell",
  ] }),
  kras: () => switchScene({ name: "KRAS", fuel: "GTP (fuel)", drug: "G12C inhibitor (sotorasib, adagrasib)", covalent: true, captions: [
    "1 · KRAS is a molecular switch: ON when GTP is bound, OFF once it is spent. Normally it flicks on and off",
    "2 · A mutation (G12C, G12D) jams the switch ON, so ‘grow’ signals never stop",
    "3 · A G12C drug slips into a pocket beside the mutant cysteine and bonds to it permanently (covalently)",
    "4 · Locked in the OFF shape, mutant KRAS can no longer signal. Newer drugs aim at G12D and the ON state",
  ] }),
  "kras-g12c": () => TARGET_ANIMATED.kras(),
  bcma: () => redirectScene({ antigen: "BCMA", cellName: "Myeloma cell", captions: [
    "1 · BCMA sits on plasma cells, and on nearly every myeloma cell",
    "2 · CAR-T: a patient's own T cells are given a receptor that recognises BCMA, then returned",
    "3 · Bispecific antibodies: one arm holds BCMA, the other grabs CD3 on any passing T cell",
    "4 · Either way a T cell is pulled onto the myeloma cell and kills it. ADCs against BCMA also exist",
  ] }),
  cd19: () => redirectScene({ antigen: "CD19", cellName: "B-cell leukaemia / lymphoma cell", captions: [
    "1 · CD19 sits on B cells from early in life, and on most B-cell leukaemias and lymphomas",
    "2 · CAR-T: the patient's T cells are engineered to recognise CD19 and returned as a living drug",
    "3 · Bispecifics (blinatumomab) bridge CD19 on the cancer cell to CD3 on any T cell",
    "4 · The T cell kills the cancer cell. Healthy B cells are lost too, which is survivable",
  ] }),
  psma: () => radioligandScene({ antigen: "PSMA", cellName: "Prostate cancer cell", captions: [
    "1 · PSMA is a protein on the surface of most prostate cancer cells; healthy tissue carries little",
    "2 · A small molecule shaped to fit PSMA carries a radioactive atom (lutetium-177)",
    "3 · It docks; the atom decays and fires particles that travel a few millimetres",
    "4 · DNA breaks in the cell and its neighbours. The same ligand with gallium-68 lights up a PET scan",
  ] }),
  brca: syntheticLethalityScene,
  parp: syntheticLethalityScene,
  vegf: vegfScene,
  "estrogen-receptor": () => nuclearReceptorScene({ hormone: "Oestrogen", receptor: "Oestrogen receptor (ER)", drug: "SERD (fulvestrant, elacestrant) destroys the receptor", mode: "degrade", captions: [
    "1 · Oestrogen slips straight through the cell membrane of a breast cancer cell",
    "2 · Inside, it binds the oestrogen receptor",
    "3 · The pair moves into the nucleus and switches on growth genes: the engine of ER-positive breast cancer",
    "4 · Tamoxifen blocks the receptor, aromatase inhibitors cut the oestrogen supply, SERDs send the receptor to the waste disposal",
  ] }),
  "androgen-receptor": () => nuclearReceptorScene({ hormone: "Testosterone / DHT", receptor: "Androgen receptor (AR)", drug: "AR blocker (enzalutamide) or supply cut (ADT)", mode: "block", captions: [
    "1 · Testosterone slips into a prostate cancer cell",
    "2 · Inside, it binds the androgen receptor",
    "3 · The pair moves into the nucleus and switches on the genes that drive prostate cancer",
    "4 · Hormone therapy (ADT) cuts the supply; enzalutamide and apalutamide block the receptor; new drugs degrade it",
  ] }),
  bcl2: bcl2Scene,
};

/** Class-level generic keys (everything in TARGET_ANIMATED that is not a target id). */
export const TARGET_CLASS_KEYS = ["surface-antigen", "kinase", "checkpoint", "nuclear-receptor", "enzyme", "transcription", "oncogene", "tumor-suppressor", "stroma", "other"] as const;

/** Scene for a target: specific by id if we have one, otherwise the generic scene for its class. */
export function targetSchematicFor(target: { id: string; targetClass: string }): { mesh: Mesh; specific: boolean } {
  const specific = !(TARGET_CLASS_KEYS as readonly string[]).includes(target.id) && TARGET_ANIMATED[target.id];
  if (specific) return { mesh: specific(), specific: true };
  const generic = TARGET_ANIMATED[target.targetClass] ?? TARGET_ANIMATED.other;
  return { mesh: generic(), specific: false };
}

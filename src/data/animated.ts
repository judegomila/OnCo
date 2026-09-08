/**
 * Animated process schematics: looping wireframe sequences (ADC internalisation, CAR-T killing, …)
 * built from named parts so each phase can move, scale, show, or hide them while the scene rotates.
 * Each builder returns a Mesh with `animate` set; the static viewer ignores it, Wireframe3D plays it.
 */
import { add, antibody, antibodyTips, dots, empty, helix, lerp, lerp3, line, movePart, octahedron, part, phase, polyline, ring, setAlpha, sphere, type Mesh, type Part, type Vec3 } from "@/lib/wireframe";

const TAU = Math.PI * 2;
const cell = (r: number, cls?: string) => sphere(r, 5, 10, cls);

type Scene = { mesh: Mesh; parts: Record<string, Part> };
function scene(): Scene { return { mesh: empty(), parts: {} }; }
function put(sc: Scene, name: string, m: Mesh, opts: Parameters<typeof add>[2] = {}): Part { const p = part(sc.mesh, m, opts); sc.parts[name] = p; return p; }
/** Fresh frame buffers: copy of base points and all-ones alpha. */
function buffers(sc: Scene): { pts: Vec3[]; alpha: number[] } { return { pts: sc.mesh.points.map((p) => [p[0], p[1], p[2]] as Vec3), alpha: sc.mesh.segments.map(() => 1) }; }
const pulse = (t: number, f = 6) => 0.55 + 0.45 * Math.sin(t * TAU * f);
/** Small receptor stub with a head, pointing along +x from `base`. */
function receptor(base: Vec3, len = 0.28, cls?: string): Mesh { const m = empty(); add(m, line(base, [base[0] + len, base[1], base[2]], cls)); add(m, sphere(0.06, 2, 6, cls), { at: [base[0] + len, base[1], base[2]] }); return m; }
/** ADC-like antibody with payload octahedra on the Fc region; returns the parts needed for animation. */
function adcParts(sc: Scene, prefix: string, at: Vec3, scale: number, sites: number, arms: [boolean, boolean] = [true, true], payloadCls = "accent"): Part[] {
  put(sc, `${prefix}.ab`, antibody(scale, undefined, 0.6, arms[0], arms[1]), { at });
  const pays: Part[] = [];
  for (let i = 0; i < sites; i++) {
    const y = -0.9 * scale + (0.7 * scale * i) / Math.max(1, sites - 1);
    const p: Vec3 = [at[0] + (i % 2 ? 0.3 : -0.3) * scale, at[1] + y, at[2] + (i % 4 < 2 ? 0.12 : -0.12) * scale];
    const m = empty(); add(m, line([at[0] + (i % 2 ? 0.12 : -0.12) * scale, at[1] + y, at[2]], p, "soft")); add(m, octahedron(0.07 * scale, payloadCls), { at: p });
    pays.push(put(sc, `${prefix}.pay${i}`, m));
  }
  return pays;
}

// =====================================================================================
// ADC: circulate → bind → internalise → lysosome → payload release → DNA damage → bystander
// =====================================================================================
export function adcAnimated(opts: { bispecific?: boolean; payloadLabel?: string; antigenLabel?: string } = {}): Mesh {
  const sc = scene();
  const CELL: Vec3 = [1.3, 0, 0], NUC: Vec3 = [1.55, 0.05, 0], NEIGH: Vec3 = [1.9, -1.55, 0.7];
  put(sc, "cell", cell(1.0), { at: CELL });
  put(sc, "nucleus", sphere(0.36, 4, 8, "soft"), { at: NUC });
  put(sc, "neigh", cell(0.7, "soft"), { at: NEIGH });
  put(sc, "neighNuc", sphere(0.22, 3, 8, "soft"), { at: NEIGH });
  // receptors on the facing surface
  const R1: Vec3 = [0.33, 0.15, 0.1], R2: Vec3 = [0.36, -0.2, -0.12];
  put(sc, "rec1", receptor(R1, 0.26));
  if (opts.bispecific) put(sc, "rec2", receptor(R2, 0.26, "hot"));
  // vesicle (hidden until endocytosis) and lysosome
  put(sc, "vesicle", ring(0.36, 14, "soft"), { at: [0.95, 0.05, 0], rotX: 0.5 });
  put(sc, "lyso", ring(0.28, 12, "hot"), { at: [1.05, 0.0, 0], rotX: 1.0 });
  // ADC starts far left
  const START: Vec3 = [-2.1, 0.4, 0.1];
  const pays = adcParts(sc, "adc", START, 0.55, 6, [true, opts.bispecific ? true : true]);
  if (opts.bispecific) { const [, r] = antibodyTips(0.55); put(sc, "adc.arm2", sphere(0.09, 2, 6, "hot"), { at: [START[0] + r[0], START[1] + r[1], START[2]] }); }
  // DNA damage marks in nucleus (hidden until late)
  put(sc, "dna", dots([[1.45, 0.15, 0.1], [1.65, -0.05, -0.1], [1.55, 0.2, -0.15], [1.7, 0.1, 0.12]], "hot"));
  const labels = { cell: { at: [1.3, 1.05, 0] as Vec3, text: "Tumour cell" }, neigh: { at: NEIGH, text: "Antigen-negative neighbour" }, rec: { at: [0.62, 0.15, 0.1] as Vec3, text: opts.antigenLabel ?? "Antigen (e.g. TROP2, HER2)" } };
  const base = sc.mesh.points;
  const P = sc.parts;
  const DOCK: Vec3 = [-0.55, 0.2, 0.1]; // ADC centre when arms touch the receptor
  const INSIDE: Vec3 = [0.95, 0.05, 0];
  sc.mesh.labels = [labels.cell, labels.rec];
  sc.mesh.animate = {
    duration: 14,
    frame: (t) => {
      const { pts, alpha } = buffers(sc);
      let caption = "";
      const abParts = [P["adc.ab"], ...pays, ...(P["adc.arm2"] ? [P["adc.arm2"]] : [])];
      const moveAb = (dx: Vec3, scale = 1, spin = 0) => { for (const p of abParts) movePart(pts, base, p, dx, 1, 0); if (scale !== 1 || spin) { /* group scale about the antibody centre */ const c = centroid(pts, P["adc.ab"]); for (const p of abParts) for (let i = p.p0; i < p.p1; i++) { const q = pts[i]; const x = (q[0] - c[0]) * scale, y = (q[1] - c[1]) * scale, z = (q[2] - c[2]) * scale; const cs = Math.cos(spin), sn = Math.sin(spin); pts[i] = [c[0] + x * cs + z * sn, c[1] + y, c[2] - x * sn + z * cs]; } } };
      setAlpha(alpha, P["vesicle"], 0); setAlpha(alpha, P["lyso"], 0); setAlpha(alpha, P["dna"], 0);
      if (t < 0.22) {
        const u = phase(t, 0, 0.22);
        const d = lerp3(START, DOCK, u);
        moveAb([d[0] - START[0], d[1] - START[1], d[2] - START[2]], 1, u * 0.6);
        caption = "1 · ADC circulates and finds the antigen";
      } else if (t < 0.32) {
        moveAb([DOCK[0] - START[0], DOCK[1] - START[1], DOCK[2] - START[2]], 1, 0.6);
        setAlpha(alpha, P["rec1"], pulse(t)); if (P["rec2"]) setAlpha(alpha, P["rec2"], pulse(t));
        caption = opts.bispecific ? "2 · Two arms bind two antigens: stronger grip, faster uptake" : "2 · Binds the antigen on the cell surface";
      } else if (t < 0.52) {
        const u = phase(t, 0.32, 0.52);
        const d = lerp3(DOCK, INSIDE, u);
        moveAb([d[0] - START[0], d[1] - START[1], d[2] - START[2]], lerp(1, 0.55, u), 0.6 + u);
        movePart(pts, base, P["rec1"], [lerp(0, INSIDE[0] - 0.46, u), lerp(0, INSIDE[1] - 0.15, u), 0], 1); setAlpha(alpha, P["rec1"], 1 - u * 0.7);
        if (P["rec2"]) { movePart(pts, base, P["rec2"], [lerp(0, INSIDE[0] - 0.5, u), lerp(0, INSIDE[1] + 0.2, u), 0], 1); setAlpha(alpha, P["rec2"], 1 - u * 0.7); }
        setAlpha(alpha, P["vesicle"], u);
        caption = "3 · Receptor and ADC are pulled inside (endocytosis)";
      } else if (t < 0.62) {
        moveAb([INSIDE[0] - START[0], INSIDE[1] - START[1], INSIDE[2] - START[2]], 0.55, 1.6);
        setAlpha(alpha, P["rec1"], 0.3); if (P["rec2"]) setAlpha(alpha, P["rec2"], 0.3);
        setAlpha(alpha, P["vesicle"], 1 - phase(t, 0.52, 0.62)); setAlpha(alpha, P["lyso"], pulse(t, 4));
        caption = "4 · Vesicle becomes a lysosome; enzymes cleave the linker";
      } else if (t < 0.8) {
        const u = phase(t, 0.62, 0.8);
        // antibody fades, payloads fly out toward the nucleus and around
        movePart(pts, base, P["adc.ab"], [INSIDE[0] - START[0], INSIDE[1] - START[1], INSIDE[2] - START[2]], 0.55, 1.6); setAlpha(alpha, P["adc.ab"], 0.5 - 0.45 * u);
        if (P["adc.arm2"]) { movePart(pts, base, P["adc.arm2"], [INSIDE[0] - START[0], INSIDE[1] - START[1], INSIDE[2] - START[2]], 0.55); setAlpha(alpha, P["adc.arm2"], 0.5 - 0.45 * u); }
        setAlpha(alpha, P["rec1"], 0.2); if (P["rec2"]) setAlpha(alpha, P["rec2"], 0.2); setAlpha(alpha, P["lyso"], 1 - u);
        pays.forEach((p, i) => {
          const dir: Vec3 = [Math.cos((TAU * i) / pays.length), Math.sin((TAU * i) / pays.length) * 0.6, (i % 2 ? 0.4 : -0.4)];
          const target: Vec3 = i < 4 ? [NUC[0] + dir[0] * 0.25, NUC[1] + dir[1] * 0.25, NUC[2] + dir[2] * 0.25] : [INSIDE[0] + dir[0] * 0.9, INSIDE[1] + dir[1] * 0.9, dir[2] * 0.9];
          const from: Vec3 = INSIDE;
          const d = lerp3(from, target, u);
          movePart(pts, base, p, [d[0] - START[0], d[1] - START[1], d[2] - START[2]], lerp(0.55, 1.1, u), u * 3);
          // hide the short linker line (first segment) once released
          alpha[p.s0] = 1 - u;
        });
        caption = "5 · Payload released; membrane-permeable payload reaches the nucleus";
      } else if (t < 0.9) {
        const u = phase(t, 0.8, 0.9);
        setAlpha(alpha, P["adc.ab"], 0.05); if (P["adc.arm2"]) setAlpha(alpha, P["adc.arm2"], 0.05); setAlpha(alpha, P["rec1"], 0.15); if (P["rec2"]) setAlpha(alpha, P["rec2"], 0.15);
        pays.forEach((p, i) => { const dir: Vec3 = [Math.cos((TAU * i) / pays.length), Math.sin((TAU * i) / pays.length) * 0.6, (i % 2 ? 0.4 : -0.4)]; const target: Vec3 = i < 4 ? [NUC[0] + dir[0] * 0.25, NUC[1] + dir[1] * 0.25, NUC[2] + dir[2] * 0.25] : [INSIDE[0] + dir[0] * 0.9, INSIDE[1] + dir[1] * 0.9, dir[2] * 0.9]; movePart(pts, base, p, [target[0] - START[0], target[1] - START[1], target[2] - START[2]], 1.1, 3); alpha[p.s0] = 0; });
        setAlpha(alpha, P["dna"], pulse(t, 8)); setAlpha(alpha, P["nucleus"], 0.6 + 0.4 * pulse(t, 8));
        movePart(pts, base, P["cell"], [0, 0, 0], 1 - 0.08 * u);
        caption = "6 · TOP1 inhibition → DNA breaks → the cell dies";
      } else {
        const u = phase(t, 0.9, 1);
        setAlpha(alpha, P["adc.ab"], 0.05); if (P["adc.arm2"]) setAlpha(alpha, P["adc.arm2"], 0.05); setAlpha(alpha, P["rec1"], 0.15); if (P["rec2"]) setAlpha(alpha, P["rec2"], 0.15);
        setAlpha(alpha, P["dna"], 1); movePart(pts, base, P["cell"], [0, 0, 0], 0.92);
        pays.forEach((p, i) => {
          const dir: Vec3 = [Math.cos((TAU * i) / pays.length), Math.sin((TAU * i) / pays.length) * 0.6, (i % 2 ? 0.4 : -0.4)];
          const stay: Vec3 = i < 4 ? [NUC[0] + dir[0] * 0.25, NUC[1] + dir[1] * 0.25, NUC[2] + dir[2] * 0.25] : [INSIDE[0] + dir[0] * 0.9, INSIDE[1] + dir[1] * 0.9, dir[2] * 0.9];
          const target: Vec3 = i >= 4 ? lerp3(stay, [NEIGH[0] + (i % 2 ? 0.1 : -0.15), NEIGH[1] + 0.1, NEIGH[2]], u) : stay;
          movePart(pts, base, p, [target[0] - START[0], target[1] - START[1], target[2] - START[2]], 1.1, 3); alpha[p.s0] = 0;
        });
        setAlpha(alpha, P["neighNuc"], 0.3 + 0.7 * u); movePart(pts, base, P["neigh"], [0, 0, 0], 1 - 0.06 * u);
        caption = "7 · Bystander effect: free payload diffuses into antigen-negative neighbours";
      }
      const labelsNow = [labels.cell, ...(t < 0.52 ? [labels.rec] : []), ...(t >= 0.9 ? [labels.neigh] : []), ...(t >= 0.62 && t < 0.9 ? [{ at: NUC, text: opts.payloadLabel ?? "Payload (e.g. DXd, SN-38)" }] : [])];
      return { points: pts, alpha, caption, labels: labelsNow };
    },
  };
  return sc.mesh;
}

function centroid(pts: Vec3[], p: Part): Vec3 { let x = 0, y = 0, z = 0; const n = p.p1 - p.p0 || 1; for (let i = p.p0; i < p.p1; i++) { x += pts[i][0]; y += pts[i][1]; z += pts[i][2]; } return [x / n, y / n, z / n]; }

// =====================================================================================
// CAR-T: approach → synapse → granules → target dies → CAR-T expands
// =====================================================================================
export function carTAnimated(kind: "car-t" | "tcr-t" | "car-nk" = "car-t"): Mesh {
  const sc = scene();
  const T0: Vec3 = [-2.4, 0.1, 0], TUM: Vec3 = [1.3, 0, 0], T1: Vec3 = [-0.95, 0, 0];
  const tcell = empty(); add(tcell, cell(0.85, "soft"));
  for (let i = 0; i < 7; i++) { const a = -0.9 + (1.8 * i) / 6; const p: Vec3 = [0.85 * Math.cos(a), 0.85 * Math.sin(a), 0]; add(tcell, line(p, [p[0] * 1.25, p[1] * 1.25, 0], "accent")); }
  put(sc, "t", tcell, { at: T0 });
  put(sc, "tum", cell(0.9, "hot"), { at: TUM });
  put(sc, "tumNuc", sphere(0.3, 3, 8, "soft"), { at: TUM });
  for (let i = 0; i < 4; i++) { const a = Math.PI + (-0.45 + 0.3 * i); put(sc, `ag${i}`, receptor([TUM[0] + 0.9 * Math.cos(a), TUM[1] + 0.9 * Math.sin(a), 0], -0.22)); }
  put(sc, "synapse", polyline([[-0.05, 0.35, 0], [0.4, 0.35, 0], [0.4, -0.35, 0], [-0.05, -0.35, 0]], "hot"));
  put(sc, "granules", dots([[-0.2, 0.15, 0.1], [-0.1, -0.1, -0.1], [-0.25, -0.2, 0.05], [-0.15, 0.25, -0.08]], "accent"));
  put(sc, "clone", tcell, { at: [-2.4, 1.7, -0.6] });
  const base = sc.mesh.points, P = sc.parts;
  const who = kind === "car-nk" ? "CAR-NK / macrophage" : kind === "tcr-t" ? "TCR-T cell" : "CAR-T cell";
  const rec = kind === "tcr-t" ? "TCR sees peptide on HLA" : "CAR binds surface antigen (no HLA needed)";
  sc.mesh.labels = [{ at: TUM, text: "Tumour cell" }];
  sc.mesh.animate = {
    duration: 11,
    frame: (t) => {
      const { pts, alpha } = buffers(sc);
      setAlpha(alpha, P["synapse"], 0); setAlpha(alpha, P["granules"], 0); setAlpha(alpha, P["clone"], 0);
      let caption = "", tLabel: Vec3 = T0;
      if (t < 0.3) { const u = phase(t, 0, 0.3); const d = lerp3(T0, T1, u); movePart(pts, base, P["t"], [d[0] - T0[0], d[1] - T0[1], 0]); tLabel = d; caption = `1 · ${who} patrols and finds its antigen`; }
      else if (t < 0.45) { movePart(pts, base, P["t"], [T1[0] - T0[0], 0, 0]); tLabel = T1; const u = phase(t, 0.3, 0.45); setAlpha(alpha, P["synapse"], u); for (let i = 0; i < 4; i++) setAlpha(alpha, P[`ag${i}`], pulse(t)); caption = `2 · ${rec}; immune synapse forms`; }
      else if (t < 0.68) { movePart(pts, base, P["t"], [T1[0] - T0[0], 0, 0]); tLabel = T1; setAlpha(alpha, P["synapse"], 1); const u = phase(t, 0.45, 0.68); setAlpha(alpha, P["granules"], 1); movePart(pts, base, P["granules"], [lerp(0, 1.2, u), 0, 0], 1 - 0.3 * u); caption = "3 · Perforin and granzymes delivered into the target"; }
      else if (t < 0.88) { movePart(pts, base, P["t"], [T1[0] - T0[0], 0, 0]); tLabel = T1; const u = phase(t, 0.68, 0.88); setAlpha(alpha, P["synapse"], 1 - u); movePart(pts, base, P["tum"], [0, 0, 0], 1 - 0.55 * u); setAlpha(alpha, P["tum"], 1 - 0.6 * u); movePart(pts, base, P["tumNuc"], [0, 0, 0], 1 - 0.5 * u); setAlpha(alpha, P["tumNuc"], pulse(t, 6)); for (let i = 0; i < 4; i++) setAlpha(alpha, P[`ag${i}`], 1 - u); caption = "4 · Target cell dies; the CAR-T survives to kill again"; }
      else { movePart(pts, base, P["t"], [T1[0] - T0[0], 0, 0]); tLabel = T1; const u = phase(t, 0.88, 1); movePart(pts, base, P["tum"], [0, 0, 0], 0.45); setAlpha(alpha, P["tum"], 0.35); movePart(pts, base, P["tumNuc"], [0, 0, 0], 0.5); setAlpha(alpha, P["tumNuc"], 0.3); for (let i = 0; i < 4; i++) setAlpha(alpha, P[`ag${i}`], 0); setAlpha(alpha, P["clone"], u); movePart(pts, base, P["clone"], [lerp(1.2, 0, u), lerp(-1.2, 0, u), 0], lerp(0.3, 1, u)); caption = kind === "car-t" ? "5 · Serial killing and expansion in vivo (a living drug)" : "5 · Serial killing; persistence varies by cell type"; }
      return { points: pts, alpha, caption, labels: [{ at: TUM, text: "Tumour cell" }, { at: [tLabel[0], tLabel[1] + 0.95, 0] as Vec3, text: who }] };
    },
  };
  return sc.mesh;
}

// =====================================================================================
// Radioligand therapy: ligand binds → internalises → decay track → crossfire
// =====================================================================================
export function radioligandAnimated(alphaEmitter = false): Mesh {
  const sc = scene();
  const CELL: Vec3 = [0.3, 0, 0], NEIGH: Vec3 = [-1.6, -0.9, 0.5];
  put(sc, "cell", cell(1.0), { at: CELL });
  put(sc, "nuc", sphere(0.35, 3, 8, "soft"), { at: [CELL[0] + 0.1, 0.05, 0] });
  put(sc, "neigh", cell(0.6, "soft"), { at: NEIGH });
  for (let i = 0; i < 6; i++) { const a = (TAU * i) / 6; const p: Vec3 = [CELL[0] + Math.cos(a), 0.15, Math.sin(a)]; put(sc, `rec${i}`, line(p, [p[0] + (p[0] - CELL[0]) * 0.22, p[1] * 1.2, p[2] * 1.22])); }
  const START: Vec3 = [2.6, 0.9, 0.4], DOCK: Vec3 = [CELL[0] + 1.32, 0.2, 0];
  put(sc, "lig", octahedron(0.1, "accent"), { at: START });
  put(sc, "ligTail", line([START[0] - 0.18, START[1], START[2]], START, "accent"));
  const trackPts: Vec3[] = alphaEmitter ? [[DOCK[0], DOCK[1], 0], [0.9, 0.25, 0.05], [0.55, 0.1, 0.02]] : [[DOCK[0], DOCK[1], 0], [0.9, 0.5, 0.3], [0.3, 0.2, 0.5], [-0.3, 0.6, 0.1], [-0.9, 0.3, -0.2], [-1.6, -0.5, 0.2]];
  const track = put(sc, "track", polyline(trackPts, "hot"));
  const track2 = put(sc, "track2", polyline(alphaEmitter ? [[DOCK[0], DOCK[1], 0], [1.2, -0.3, -0.2], [1.0, -0.5, -0.3]] : [[DOCK[0], DOCK[1], 0], [0.6, -0.5, -0.4], [-0.2, -0.9, -0.1], [-1.2, -0.8, 0.4]], "hot"));
  put(sc, "dna", dots(alphaEmitter ? [[0.5, 0.1, 0.1], [0.62, 0.02, -0.05], [0.4, 0.15, 0.05]] : [[0.3, 0.2, 0.4], [-0.3, 0.55, 0.1]], "hot"));
  const base = sc.mesh.points, P = sc.parts;
  const iso = alphaEmitter ? "Ac-225 / Pb-212 (α)" : "Lu-177 (β⁻)";
  sc.mesh.labels = [{ at: [CELL[0], 1.05, 0], text: "PSMA / SSTR-positive cell" }];
  sc.mesh.animate = {
    duration: 11,
    frame: (t) => {
      const { pts, alpha } = buffers(sc);
      setAlpha(alpha, track, 0); setAlpha(alpha, track2, 0); setAlpha(alpha, P["dna"], 0);
      let caption = "", ligAt: Vec3 = START;
      const moveLig = (d: Vec3) => { movePart(pts, base, P["lig"], [d[0] - START[0], d[1] - START[1], d[2] - START[2]], 1, t * 12); movePart(pts, base, P["ligTail"], [d[0] - START[0], d[1] - START[1], d[2] - START[2]]); };
      const grow = (p: Part, u: number) => { const n = p.s1 - p.s0; for (let k = 0; k < n; k++) alpha[p.s0 + k] = Math.max(0, Math.min(1, u * n - k)); };
      if (t < 0.32) { const u = phase(t, 0, 0.32); ligAt = lerp3(START, DOCK, u); moveLig(ligAt); caption = `1 · Radioligand circulates; the ligand seeks its receptor`; }
      else if (t < 0.45) { moveLig(DOCK); ligAt = DOCK; setAlpha(alpha, P["rec0"], pulse(t)); caption = "2 · Binds the receptor (PSMA, SSTR2, FAP)"; }
      else if (t < 0.58) { const u = phase(t, 0.45, 0.58); ligAt = lerp3(DOCK, [DOCK[0] - 0.4, DOCK[1] - 0.05, 0], u); moveLig(ligAt); movePart(pts, base, P["rec0"], [-0.35 * u, 0, 0]); caption = "3 · Internalised and retained inside the cell"; }
      else if (t < 0.8) { const u = phase(t, 0.58, 0.8); ligAt = [DOCK[0] - 0.4, DOCK[1] - 0.05, 0]; moveLig(ligAt); movePart(pts, base, P["rec0"], [-0.35, 0, 0]); grow(track, u); setAlpha(alpha, P["dna"], u > 0.6 ? pulse(t, 8) : 0); movePart(pts, base, track, [-0.4, -0.05, 0]); caption = alphaEmitter ? "4 · α decay: a few short, very dense tracks (~50-100 µm)" : "4 · β⁻ decay: electrons travel ~2 mm, breaking DNA along the way"; }
      else { const u = phase(t, 0.8, 1); ligAt = [DOCK[0] - 0.4, DOCK[1] - 0.05, 0]; moveLig(ligAt); movePart(pts, base, P["rec0"], [-0.35, 0, 0]); setAlpha(alpha, track, 1); movePart(pts, base, track, [-0.4, -0.05, 0]); grow(track2, u); movePart(pts, base, track2, [-0.4, -0.05, 0]); setAlpha(alpha, P["dna"], 1); if (!alphaEmitter) setAlpha(alpha, P["neigh"], 0.3 + 0.7 * u); caption = alphaEmitter ? "5 · Kills single cells with little crossfire; spares neighbours" : "5 · Crossfire: neighbouring receptor-negative cells are hit too"; }
      return { points: pts, alpha, caption, labels: [{ at: [CELL[0], 1.05, 0] as Vec3, text: "PSMA / SSTR-positive cell" }, { at: ligAt, text: `Ligand + ${iso}` }, ...(t > 0.8 && !alphaEmitter ? [{ at: NEIGH, text: "Neighbour (crossfire)" }] : [])] };
    },
  };
  return sc.mesh;
}

// =====================================================================================
// Checkpoint inhibitor: PD-1–PD-L1 brake → antibody blocks → T cell kills
// =====================================================================================
export function checkpointAnimated(): Mesh {
  const sc = scene();
  const TC: Vec3 = [-1.3, 0, 0], TUM: Vec3 = [1.3, 0, 0];
  put(sc, "t", cell(0.9, "soft"), { at: TC });
  put(sc, "tum", cell(0.9, "hot"), { at: TUM });
  put(sc, "tumNuc", sphere(0.3, 3, 8, "soft"), { at: TUM });
  // TCR–MHC contact (dashed-ish) and PD-1–PD-L1 brake above
  put(sc, "tcr", line([-0.4, -0.25, 0], [0.4, -0.25, 0], "soft"));
  put(sc, "pd1", line([-0.4, 0.3, 0], [-0.05, 0.3, 0]));
  put(sc, "pdl1", line([0.4, 0.3, 0], [0.05, 0.3, 0]));
  put(sc, "brake", line([-0.05, 0.3, 0], [0.05, 0.3, 0], "hot"));
  const START: Vec3 = [-0.4, 2.4, 0.3], DOCK: Vec3 = [-0.25, 0.75, 0];
  put(sc, "ab", antibody(0.45, "accent", 0.9), { at: START, rotZ: Math.PI });
  put(sc, "granules", dots([[-0.55, 0.05, 0.1], [-0.5, -0.15, -0.1], [-0.65, 0.2, 0.05]], "accent"));
  const base = sc.mesh.points, P = sc.parts;
  sc.mesh.animate = {
    duration: 11,
    frame: (t) => {
      const { pts, alpha } = buffers(sc);
      setAlpha(alpha, P["granules"], 0);
      let caption = "";
      const abAt = (d: Vec3) => movePart(pts, base, P["ab"], [d[0] - START[0], d[1] - START[1], d[2] - START[2]]);
      if (t < 0.2) { abAt([START[0], START[1] + 2, START[2]]); setAlpha(alpha, P["ab"], 0); setAlpha(alpha, P["brake"], pulse(t)); caption = "1 · T cell sees the tumour, but PD-L1 → PD-1 applies the brake"; }
      else if (t < 0.45) { const u = phase(t, 0.2, 0.45); abAt(lerp3(START, DOCK, u)); caption = "2 · Anti-PD-1 / anti-PD-L1 antibody arrives"; }
      else if (t < 0.6) { abAt(DOCK); const u = phase(t, 0.45, 0.6); setAlpha(alpha, P["brake"], 1 - u); movePart(pts, base, P["pdl1"], [0.12 * u, 0, 0]); caption = "3 · The PD-1–PD-L1 handshake is blocked: brake released"; }
      else if (t < 0.82) { abAt(DOCK); setAlpha(alpha, P["brake"], 0); movePart(pts, base, P["pdl1"], [0.12, 0, 0]); const u = phase(t, 0.6, 0.82); setAlpha(alpha, P["granules"], 1); movePart(pts, base, P["granules"], [lerp(0, 1.6, u), lerp(0, -0.05, u), 0], 1 - 0.3 * u); setAlpha(alpha, P["tcr"], pulse(t, 5)); caption = "4 · T cell activates through its TCR and kills"; }
      else { abAt(DOCK); setAlpha(alpha, P["brake"], 0); movePart(pts, base, P["pdl1"], [0.12, 0, 0]); const u = phase(t, 0.82, 1); movePart(pts, base, P["tum"], [0, 0, 0], 1 - 0.5 * u); setAlpha(alpha, P["tum"], 1 - 0.6 * u); movePart(pts, base, P["tumNuc"], [0, 0, 0], 1 - 0.5 * u); setAlpha(alpha, P["tumNuc"], pulse(t, 6)); caption = "5 · Durable responses come from many T cells doing this for years"; }
      return { points: pts, alpha, caption, labels: [{ at: [TC[0], 0.95, 0] as Vec3, text: "T cell (PD-1)" }, { at: [TUM[0], 0.95, 0] as Vec3, text: "Tumour cell (PD-L1)" }, ...(t >= 0.2 ? [{ at: DOCK, text: "Checkpoint antibody" }] : [])] };
    },
  };
  return sc.mesh;
}

// =====================================================================================
// T-cell engager: bispecific bridges CD3 and tumour antigen
// =====================================================================================
export function engagerAnimated(): Mesh {
  const sc = scene();
  const TC: Vec3 = [-1.3, 0, 0], TUM: Vec3 = [1.3, 0, 0];
  put(sc, "t", cell(0.9, "soft"), { at: TC });
  put(sc, "tum", cell(0.9, "hot"), { at: TUM });
  put(sc, "tumNuc", sphere(0.3, 3, 8, "soft"), { at: TUM });
  put(sc, "cd3", receptor([TC[0] + 0.9, 0.1, 0], 0.2));
  put(sc, "ag", receptor([TUM[0] - 0.9, 0.1, 0], -0.2, "hot"));
  const START: Vec3 = [0, 2.5, 0.2], DOCK: Vec3 = [0, 0.05, 0];
  put(sc, "bite", antibody(0.4, "accent", 1.3), { at: START, rotZ: Math.PI / 2 });
  put(sc, "granules", dots([[-0.55, 0.05, 0.1], [-0.5, -0.15, -0.1], [-0.65, 0.2, 0.05]], "accent"));
  const base = sc.mesh.points, P = sc.parts;
  sc.mesh.animate = {
    duration: 11,
    frame: (t) => {
      const { pts, alpha } = buffers(sc);
      setAlpha(alpha, P["granules"], 0);
      let caption = "";
      const at = (d: Vec3) => movePart(pts, base, P["bite"], [d[0] - START[0], d[1] - START[1], d[2] - START[2]]);
      if (t < 0.3) { const u = phase(t, 0, 0.3); at(lerp3(START, [DOCK[0] + 0.5, DOCK[1], 0], u)); caption = "1 · Engager finds the tumour antigen (DLL3, BCMA, CD20, PSMA…)"; }
      else if (t < 0.45) { const u = phase(t, 0.3, 0.45); at(lerp3([DOCK[0] + 0.5, DOCK[1], 0], DOCK, u)); movePart(pts, base, P["t"], [0.35 * u, 0, 0]); movePart(pts, base, P["cd3"], [0.35 * u, 0, 0]); setAlpha(alpha, P["cd3"], pulse(t)); caption = "2 · Second arm grabs CD3: any T cell is recruited, no HLA needed"; }
      else if (t < 0.7) { at(DOCK); movePart(pts, base, P["t"], [0.35, 0, 0]); movePart(pts, base, P["cd3"], [0.35, 0, 0]); const u = phase(t, 0.45, 0.7); setAlpha(alpha, P["granules"], 1); movePart(pts, base, P["granules"], [lerp(0.35, 1.7, u), 0, 0], 1 - 0.3 * u); caption = "3 · Forced immune synapse; cytokines released (CRS risk)"; }
      else { at(DOCK); movePart(pts, base, P["t"], [0.35, 0, 0]); movePart(pts, base, P["cd3"], [0.35, 0, 0]); const u = phase(t, 0.7, 1); movePart(pts, base, P["tum"], [0, 0, 0], 1 - 0.5 * u); setAlpha(alpha, P["tum"], 1 - 0.6 * u); setAlpha(alpha, P["tumNuc"], pulse(t, 6)); movePart(pts, base, P["tumNuc"], [0, 0, 0], 1 - 0.5 * u); setAlpha(alpha, P["ag"], 1 - u); caption = "4 · Target killed; the engager is redosed as a drug, not a cell"; }
      return { points: pts, alpha, caption, labels: [{ at: [TC[0] + (t > 0.3 ? 0.35 : 0), 0.95, 0] as Vec3, text: "T cell (CD3)" }, { at: [TUM[0], 0.95, 0] as Vec3, text: "Tumour cell" }, { at: DOCK, text: "Bispecific engager" }] };
    },
  };
  return sc.mesh;
}

// =====================================================================================
// mRNA vaccine: LNP uptake → mRNA → translation → presentation → T-cell priming
// =====================================================================================
export function mrnaVaccineAnimated(): Mesh {
  const sc = scene();
  const DC: Vec3 = [0.4, 0, 0];
  put(sc, "dc", cell(1.1, "soft"), { at: DC });
  put(sc, "dcNuc", sphere(0.35, 3, 8, "soft"), { at: [DC[0] + 0.2, 0.1, 0] });
  const START: Vec3 = [-2.4, 0.6, 0.2], IN: Vec3 = [-0.2, 0.15, 0.1];
  put(sc, "lnp", sphere(0.32, 4, 8, "accent"), { at: START });
  put(sc, "mrna", helix(0.12, 0.7, 2.5, 20, "hot"), { at: IN, rotZ: 1.2 });
  put(sc, "ribo", dots([[IN[0] - 0.2, IN[1] + 0.1, 0.1], [IN[0], IN[1] + 0.15, -0.05], [IN[0] + 0.2, IN[1], 0.08]], "soft"));
  const peps: Part[] = [];
  for (let i = 0; i < 4; i++) peps.push(put(sc, `pep${i}`, octahedron(0.06, "hot"), { at: [IN[0] + 0.1 * i, IN[1] + 0.05, 0] }));
  const MHC: Vec3[] = [[DC[0] + 1.1, 0.3, 0], [DC[0] + 1.05, -0.2, 0.3], [DC[0] + 1.0, 0.1, -0.45], [DC[0] + 1.08, 0.5, 0.2]];
  MHC.forEach((p, i) => put(sc, `mhc${i}`, receptor(p, 0.2)));
  const TC0: Vec3 = [3.2, 0.2, 0], TC1: Vec3 = [2.3, 0.25, 0];
  put(sc, "t", cell(0.65, "soft"), { at: TC0 });
  const base = sc.mesh.points, P = sc.parts;
  sc.mesh.animate = {
    duration: 13,
    frame: (t) => {
      const { pts, alpha } = buffers(sc);
      setAlpha(alpha, P["mrna"], 0); setAlpha(alpha, P["ribo"], 0); peps.forEach((p) => setAlpha(alpha, p, 0)); setAlpha(alpha, P["t"], 0);
      let caption = "";
      const lnpAt = (d: Vec3, s = 1) => movePart(pts, base, P["lnp"], [d[0] - START[0], d[1] - START[1], d[2] - START[2]], s);
      if (t < 0.25) { const u = phase(t, 0, 0.25); lnpAt(lerp3(START, [DC[0] - 1.05, 0.2, 0.1], u)); caption = "1 · Lipid nanoparticle carrying patient-specific mRNA is injected"; }
      else if (t < 0.4) { const u = phase(t, 0.25, 0.4); lnpAt(lerp3([DC[0] - 1.05, 0.2, 0.1], IN, u), 1 - 0.3 * u); caption = "2 · Taken up by a dendritic cell (endocytosis)"; }
      else if (t < 0.52) { const u = phase(t, 0.4, 0.52); lnpAt(IN, 0.7 + 0.5 * u); setAlpha(alpha, P["lnp"], 1 - u); setAlpha(alpha, P["mrna"], u); caption = "3 · Endosomal escape releases the mRNA (up to 34 neoantigens encoded)"; }
      else if (t < 0.68) { setAlpha(alpha, P["lnp"], 0); setAlpha(alpha, P["mrna"], 1); const u = phase(t, 0.52, 0.68); setAlpha(alpha, P["ribo"], 1); movePart(pts, base, P["ribo"], [0.35 * Math.sin(u * TAU) * 0.5 + 0.2 * u, 0, 0]); peps.forEach((p, i) => { setAlpha(alpha, p, Math.max(0, Math.min(1, u * 4 - i))); }); caption = "4 · Ribosomes translate the mRNA into neoantigen peptides"; }
      else if (t < 0.85) { setAlpha(alpha, P["lnp"], 0); setAlpha(alpha, P["mrna"], 0.4); const u = phase(t, 0.68, 0.85); peps.forEach((p, i) => { setAlpha(alpha, p, 1); const from: Vec3 = [IN[0] + 0.1 * i, IN[1] + 0.05, 0]; const to: Vec3 = [MHC[i][0] + 0.2, MHC[i][1], MHC[i][2]]; const d = lerp3(from, to, u); movePart(pts, base, p, [d[0] - from[0], d[1] - from[1], d[2] - from[2]]); }); MHC.forEach((_, i) => setAlpha(alpha, P[`mhc${i}`], 0.6 + 0.4 * u)); caption = "5 · Peptides are presented on MHC at the cell surface"; }
      else { setAlpha(alpha, P["lnp"], 0); setAlpha(alpha, P["mrna"], 0.3); peps.forEach((p, i) => { setAlpha(alpha, p, 1); const from: Vec3 = [IN[0] + 0.1 * i, IN[1] + 0.05, 0]; const to: Vec3 = [MHC[i][0] + 0.2, MHC[i][1], MHC[i][2]]; movePart(pts, base, p, [to[0] - from[0], to[1] - from[1], to[2] - from[2]]); }); const u = phase(t, 0.85, 1); setAlpha(alpha, P["t"], 1); const d = lerp3(TC0, TC1, u); movePart(pts, base, P["t"], [d[0] - TC0[0], d[1] - TC0[1], 0]); MHC.forEach((_, i) => setAlpha(alpha, P[`mhc${i}`], pulse(t, 5))); caption = "6 · T cells that recognise the neoantigens are primed and expand"; }
      return { points: pts, alpha, caption, labels: [{ at: [DC[0], 1.15, 0] as Vec3, text: "Dendritic cell" }, ...(t >= 0.85 ? [{ at: [TC1[0], TC1[1] + 0.7, 0] as Vec3, text: "T cell primed" }] : [])] };
    },
  };
  return sc.mesh;
}

/** Technology ids that have an animated process schematic. */
export const ANIMATED: Record<string, () => Mesh> = {
  adc: () => adcAnimated(),
  "bispecific-adc": () => adcAnimated({ bispecific: true, antigenLabel: "Two antigens (e.g. EGFR × HER3)" }),
  "dual-payload-adc": () => adcAnimated({ payloadLabel: "Two payload classes" }),
  "car-t": () => carTAnimated("car-t"),
  "tcr-t": () => carTAnimated("tcr-t"),
  "car-nk-macrophage": () => carTAnimated("car-nk"),
  "radioligand-therapy": () => radioligandAnimated(false),
  "targeted-alpha-therapy": () => radioligandAnimated(true),
  "checkpoint-inhibitor": () => checkpointAnimated(),
  "t-cell-engager": () => engagerAnimated(),
  "neoantigen-mrna-vaccine": () => mrnaVaccineAnimated(),
};

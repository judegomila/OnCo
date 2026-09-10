/**
 * Scene building and frame drawing for Molecule3D, kept apart from React so a frame can be drawn into any
 * 2D-context-like object (the component passes the real canvas; tests pass a recorder).
 *
 * Small molecules: ball-and-stick. Spheres are pre-rendered sprites (radial gradient with an off-centre highlight)
 * keyed by colour and radius; bonds are round-capped strokes with a dark edge, two half-bonds in their atoms'
 * colours, and a soft highlight; double and triple bonds draw as parallel lanes. Proteins: a Catmull-Rom ribbon
 * through the C-alpha trace, per-chain colour, widened on helices and strands, depth-fogged and lit by how much
 * the ribbon faces the viewer, with any bound ligand in ball-and-stick. Everything is depth-sorted per frame.
 */
import type { Mesh, Vec3 as MeshVec3 } from "./wireframe";
import {
  apply, chainColour, chainSegments, darken, depthSort, elementColour, elementsPresent, inferSecondary, lighten, mix, normaliseElement,
  RIBBON_WIDTH, ribbonGeometry, rotation, vdwRadius, type Mol, type Vec3,
} from "./molecule-render";

/** Ball radius in angstroms for an element (a fraction of the van der Waals radius, so bonds stay visible). */
export const ballRadius = (el: string) => (normaliseElement(el) === "H" ? 0.26 : 0.2 * vdwRadius(el) + 0.08);
const BOND_WIDTH = 0.2; // angstroms (diameter)
const COIL = RIBBON_WIDTH.C;

export type Scene = {
  isProtein: boolean;
  centre: Vec3; radius: number;
  atoms: Array<{ p: Vec3; el: string; r: number; isH: boolean; lig: boolean }>;
  bonds: Array<{ a: number; b: number; order: number }>;
  /** Flattened ribbon spline: positions, normals, half-widths, per point the chain index, and the first index of each drawable segment. */
  rib: { P: Float64Array; N: Float64Array; W: Float64Array; chain: Int16Array; segStart: Int32Array; count: number };
  chains: string[]; elements: string[]; hasH: boolean; hasLigand: boolean; residues: number;
};

export function buildScene(mol: Mol, isProtein: boolean): Scene {
  const chains = mol.chains ?? [...new Set(mol.atoms.map((a) => a[4]).filter((c): c is string => !!c))];
  const atoms: Scene["atoms"] = [];
  const map = new Map<number, number>();
  mol.atoms.forEach((a, k) => {
    if (isProtein && a[5] !== "lig") return;
    map.set(k, atoms.length);
    const el = normaliseElement(a[3]);
    atoms.push({ p: [a[0], a[1], a[2]], el, r: ballRadius(el), isH: el === "H", lig: a[5] === "lig" });
  });
  const bonds: Scene["bonds"] = [];
  for (const [a, b, order] of mol.bonds) { const i = map.get(a), j = map.get(b); if (i !== undefined && j !== undefined) bonds.push({ a: i, b: j, order: order >= 1 && order <= 3 ? order : 1 }); }

  // Ribbon geometry for proteins: one smooth run per unbroken stretch of backbone.
  const runs = isProtein ? chainSegments(mol) : [];
  const residues = runs.reduce((n, r) => n + r.idx.length, 0);
  const subdiv = residues > 1200 ? 3 : residues > 600 ? 4 : 6;
  const P: number[] = [], N: number[] = [], W: number[] = [], C: number[] = [], segStart: number[] = [];
  for (const run of runs) {
    if (run.idx.length < 2) continue;
    const ca = run.idx.map((k) => [mol.atoms[k][0], mol.atoms[k][1], mol.atoms[k][2]] as Vec3);
    const ss = mol.ss && run.idx.every((k) => "HEC".includes(mol.ss![k] ?? "-")) ? run.idx.map((k) => mol.ss![k]).join("") : inferSecondary(ca);
    const start = P.length / 3;
    const pts = ribbonGeometry(ca, ss, subdiv);
    const ci = Math.max(0, chains.indexOf(run.chain));
    pts.forEach((q, j) => { P.push(...q.p); N.push(...q.n); W.push(q.w); C.push(ci); if (j > 0) segStart.push(start + j - 1); });
  }
  const rib = { P: Float64Array.from(P), N: Float64Array.from(N), W: Float64Array.from(W), chain: Int16Array.from(C), segStart: Int32Array.from(segStart), count: W.length };

  // Centre and fit. Proteins with a bound ligand centre on the ligand and frame the pocket with some backbone
  // context; everything else centres on the heavy atoms and fits the whole thing.
  const heavy = atoms.filter((a) => !a.isH).map((a) => a.p);
  const caPts: Vec3[] = [];
  for (let i = 0; i < rib.count; i++) caPts.push([P[3 * i], P[3 * i + 1], P[3 * i + 2]]);
  const focus = isProtein && heavy.length ? heavy : isProtein ? caPts : heavy.length ? heavy : atoms.map((a) => a.p);
  const centre: Vec3 = [0, 0, 0];
  for (const p of focus) { centre[0] += p[0]; centre[1] += p[1]; centre[2] += p[2]; }
  const nF = focus.length || 1; centre[0] /= nF; centre[1] /= nF; centre[2] /= nF;
  const dist = (p: Vec3) => Math.hypot(p[0] - centre[0], p[1] - centre[1], p[2] - centre[2]);
  let radius = 1;
  if (isProtein && heavy.length) {
    const pocket = mol.atoms.filter((a) => a[5] === "pkt" || a[5] === "lig").map((a) => dist([a[0], a[1], a[2]]));
    const full = caPts.reduce((m, p) => Math.max(m, dist(p)), 0);
    radius = Math.min(full || 1e9, Math.max(...pocket, 4) * 2.4);
  } else {
    const all = isProtein ? caPts : atoms.map((a) => a.p);
    radius = all.reduce((m, p) => Math.max(m, dist(p)), 0) + (isProtein ? 1.5 : 0.7);
  }
  return {
    isProtein, centre, radius: radius || 1, atoms, bonds, rib, chains,
    elements: elementsPresent(mol, { includeH: true, role: isProtein ? "lig" : undefined }),
    hasH: atoms.some((a) => a.isH), hasLigand: isProtein && heavy.length > 0, residues,
  };
}

/** Wireframe alternative: the same snapshot as a monoline mesh for Wireframe3D. */
export function toMesh(mol: Mol, isProtein: boolean, showH: boolean): Mesh {
  const keep = mol.atoms.map((a) => isProtein || showH || normaliseElement(a[3]) !== "H");
  const points = mol.atoms.map((a) => [a[0], a[1], a[2]] as MeshVec3);
  const segments: Mesh["segments"] = [];
  for (const [a, b] of mol.bonds) {
    if (!keep[a] || !keep[b]) continue;
    const role = mol.atoms[a][5];
    segments.push(role === "lig" ? [a, b, "accent"] : role === "pkt" ? [a, b, "soft"] : [a, b]);
  }
  return { points, segments };
}

/** The slice of CanvasRenderingContext2D the renderer uses, so tests can pass a recorder. */
export type Ctx2D = Pick<CanvasRenderingContext2D, "setTransform" | "clearRect" | "beginPath" | "moveTo" | "lineTo" | "closePath" | "fill" | "stroke" | "arc" | "drawImage" | "fillStyle" | "strokeStyle" | "lineWidth" | "lineCap" | "lineJoin" | "globalAlpha">;
export type SpriteCanvas = { width: number; height: number; ctx: Pick<CanvasRenderingContext2D, "scale" | "createRadialGradient" | "fillStyle" | "strokeStyle" | "lineWidth" | "globalAlpha" | "beginPath" | "arc" | "fill" | "stroke">; image: CanvasImageSource };
export type View = { W: number; H: number; dpr: number; yaw: number; pitch: number; showH: boolean; compact: boolean; dark: boolean };

export const CARD_BG = { light: "#fcfbf8", dark: "#1a201e" };
export const LIGAND_CARBON = { light: "#d6336c", dark: "#f472b6" };

/** Colour lookups quantised by fog (8 levels) and shade (8 levels) so the hot loop never builds colour strings. */
function tables(base: string, bg: string) {
  const fog: string[] = [], edge: string[] = [], shaded: string[][] = [];
  for (let f = 0; f < 8; f++) {
    const c = mix(base, bg, (f / 7) * 0.55);
    fog.push(c); edge.push(darken(c, 0.4));
    const row: string[] = [];
    for (let s = 0; s < 8; s++) { const k = 0.6 + (s / 7) * 0.55; row.push(k < 1 ? darken(c, 1 - k) : lighten(c, k - 1)); }
    shaded.push(row);
  }
  return { fog, edge, shaded };
}
type Tables = ReturnType<typeof tables>;

/**
 * Per-scene renderer: owns the scratch buffers, the depth-sorted item list, the colour tables and the sphere sprite
 * cache. `draw` paints one frame; caches are keyed by theme so switching light/dark just repaints.
 */
export function createRenderer(scene: Scene, createCanvas: (sizePx: number) => SpriteCanvas) {
  const { atoms, bonds, rib, chains, centre, radius } = scene;
  const nA = atoms.length, nB = bonds.length, nR = rib.segStart.length;
  const AX = new Float64Array(nA), AY = new Float64Array(nA), AZ = new Float64Array(nA), AF = new Float64Array(nA);
  const RX = new Float64Array(rib.count), RY = new Float64Array(rib.count), RZ = new Float64Array(rib.count), RF = new Float64Array(rib.count);
  const NX = new Float64Array(rib.count), NY = new Float64Array(rib.count), NZ = new Float64Array(rib.count);
  // Draw items: kind 0 atom, 1 bond, 2 ribbon quad; depth refreshed each frame then painter-sorted.
  const items: Array<{ kind: 0 | 1 | 2; i: number; d: number }> = [];
  for (let i = 0; i < nA; i++) items.push({ kind: 0, i, d: 0 });
  for (let i = 0; i < nB; i++) items.push({ kind: 1, i, d: 0 });
  for (let i = 0; i < nR; i++) items.push({ kind: 2, i, d: 0 });
  const D = radius * 3.6; // camera distance for a mild perspective

  let themeKey = "";
  let bg = CARD_BG.light;
  let sprites = new Map<string, SpriteCanvas>();
  let colourTables = new Map<string, Tables>();
  let chainCols: string[] = [];
  const setTheme = (dark: boolean) => {
    const key = dark ? "dark" : "light";
    if (key === themeKey) return;
    themeKey = key; bg = dark ? CARD_BG.dark : CARD_BG.light;
    sprites = new Map(); colourTables = new Map();
    chainCols = chains.map((c) => chainColour(chains, c, dark));
  };
  const table = (base: string) => { let t = colourTables.get(base); if (!t) { t = tables(base, bg); colourTables.set(base, t); } return t; };
  const atomBase = (k: number, dark: boolean) => (atoms[k].lig && atoms[k].el === "C" ? (dark ? LIGAND_CARBON.dark : LIGAND_CARBON.light) : elementColour(atoms[k].el));
  const fogLevel = (z: number) => Math.max(0, Math.min(7, Math.round((1 - (z / radius + 1) / 2) * 7)));

  const sprite = (col: string, r: number, dpr: number): SpriteCanvas => {
    const key = `${col}|${r}|${dpr}`;
    let c = sprites.get(key);
    if (c) return c;
    if (sprites.size > 800) sprites.clear();
    c = createCanvas(Math.ceil((r * 2 + 3) * dpr));
    const g = c.ctx;
    g.scale(dpr, dpr);
    const cx = c.width / dpr / 2;
    const grad = g.createRadialGradient(cx - r * 0.34, cx - r * 0.36, r * 0.04, cx, cx, r);
    grad.addColorStop(0, lighten(col, 0.75)); grad.addColorStop(0.28, lighten(col, 0.25)); grad.addColorStop(0.7, col); grad.addColorStop(1, darken(col, 0.42));
    g.fillStyle = grad; g.beginPath(); g.arc(cx, cx, r, 0, Math.PI * 2); g.fill();
    g.strokeStyle = darken(col, 0.55); g.globalAlpha = 0.3; g.lineWidth = Math.min(1, r * 0.12); g.stroke();
    sprites.set(key, c);
    return c;
  };

  const c0: [number, number, number, number] = [0, 0, 0, 0], c1: [number, number, number, number] = [0, 0, 0, 0];

  function draw(ctx: Ctx2D, v: View) {
    const { W, H, dpr, compact } = v;
    setTheme(v.dark);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const m = rotation(v.yaw, v.pitch);
    const sc = (Math.min(W, H) * (compact ? 0.46 : 0.42)) / radius;
    const showH = v.showH && !compact;

    for (let k = 0; k < nA; k++) {
      const p = atoms[k].p;
      const q = apply(m, [p[0] - centre[0], p[1] - centre[1], p[2] - centre[2]]);
      const f = D / (D - q[2]);
      AX[k] = W / 2 + q[0] * sc * f; AY[k] = H / 2 - q[1] * sc * f; AZ[k] = q[2]; AF[k] = f;
    }
    for (let i = 0; i < rib.count; i++) {
      const q = apply(m, [rib.P[3 * i] - centre[0], rib.P[3 * i + 1] - centre[1], rib.P[3 * i + 2] - centre[2]]);
      const f = D / (D - q[2]);
      RX[i] = W / 2 + q[0] * sc * f; RY[i] = H / 2 - q[1] * sc * f; RZ[i] = q[2]; RF[i] = f;
      const n = apply(m, [rib.N[3 * i], rib.N[3 * i + 1], rib.N[3 * i + 2]]);
      NX[i] = n[0]; NY[i] = n[1]; NZ[i] = n[2];
    }
    for (const it of items) {
      if (it.kind === 0) it.d = AZ[it.i];
      else if (it.kind === 1) { const b = bonds[it.i]; it.d = (AZ[b.a] + AZ[b.b]) / 2; }
      else { const g = rib.segStart[it.i]; it.d = (RZ[g] + RZ[g + 1]) / 2; }
    }
    const order = depthSort(items, (it) => it.d);

    ctx.lineCap = "round"; ctx.lineJoin = "round";
    const sizeBoost = compact ? 1.3 : 1;
    for (const it of order) {
      if (it.kind === 0) {
        const a = atoms[it.i];
        if (a.isH && !showH) continue;
        const col = table(atomBase(it.i, v.dark)).fog[fogLevel(AZ[it.i])];
        const r = Math.max(compact ? 1.4 : 1.8, Math.round(a.r * sc * AF[it.i] * sizeBoost * 2) / 2);
        const sp = sprite(col, r, dpr);
        const w = sp.width / dpr;
        ctx.drawImage(sp.image, AX[it.i] - w / 2, AY[it.i] - w / 2, w, w);
      } else if (it.kind === 1) {
        const b = bonds[it.i];
        const A = atoms[b.a], B = atoms[b.b];
        if ((A.isH || B.isH) && !showH) continue;
        const fl = fogLevel(it.d);
        const ca = table(atomBase(b.a, v.dark)).fog[fl], cb = table(atomBase(b.b, v.dark)).fog[fl];
        const f = (AF[b.a] + AF[b.b]) / 2;
        const w = Math.max(compact ? 1 : 1.3, BOND_WIDTH * sc * f * sizeBoost * (A.isH || B.isH ? 0.7 : 1));
        const x0 = AX[b.a], y0 = AY[b.a], x1 = AX[b.b], y1 = AY[b.b];
        const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, px = -dy / L, py = dx / L;
        const lanes = b.order === 3 ? [-1.15, 0, 1.15] : b.order === 2 ? [-0.62, 0.62] : [0];
        const lw = b.order === 3 ? w * 0.5 : b.order === 2 ? w * 0.62 : w;
        const edge = table(mix(ca, cb, 0.5)).edge[0];
        for (const lane of lanes) {
          const ox = px * lane * w, oy = py * lane * w;
          const mx = (x0 + x1) / 2 + ox, my = (y0 + y1) / 2 + oy;
          // Dark outline gives the cylinder an edge, then each half in its atom's colour, then a soft highlight.
          ctx.strokeStyle = edge; ctx.lineWidth = lw + 1.1;
          ctx.beginPath(); ctx.moveTo(x0 + ox, y0 + oy); ctx.lineTo(x1 + ox, y1 + oy); ctx.stroke();
          ctx.lineWidth = lw;
          ctx.strokeStyle = ca; ctx.beginPath(); ctx.moveTo(x0 + ox, y0 + oy); ctx.lineTo(mx, my); ctx.stroke();
          ctx.strokeStyle = cb; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(x1 + ox, y1 + oy); ctx.stroke();
          if (lw >= 2.2) {
            ctx.globalAlpha = 0.55; ctx.strokeStyle = "#ffffff"; ctx.lineWidth = lw * 0.28;
            const hx = -px * lw * 0.22 - Math.abs(py) * lw * 0.1, hy = -Math.abs(py) * lw * 0.22;
            ctx.beginPath(); ctx.moveTo(x0 + ox + hx, y0 + oy + hy); ctx.lineTo(x1 + ox + hx, y1 + oy + hy); ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      } else {
        const g = rib.segStart[it.i], h = g + 1;
        const t = table(chainCols[rib.chain[g]] ?? chainCols[0] ?? "#888888");
        const fl = fogLevel(it.d);
        corner(g, sc, c0); corner(h, sc, c1);
        const k = Math.max(0, Math.min(1, (rib.W[g] - COIL) / 0.5));
        const shade = (1 - k) * 0.85 + k * (0.55 + 0.45 * Math.abs(NZ[g]));
        const col = t.shaded[fl][Math.max(0, Math.min(7, Math.round(shade * 7)))];
        ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(c0[0], c0[1]); ctx.lineTo(c1[0], c1[1]); ctx.lineTo(c1[2], c1[3]); ctx.lineTo(c0[2], c0[3]); ctx.closePath(); ctx.fill(); ctx.stroke();
        if (!compact && k > 0.3) {
          ctx.globalAlpha = 0.45 * k; ctx.strokeStyle = t.edge[fl]; ctx.lineWidth = 0.7;
          ctx.beginPath(); ctx.moveTo(c0[0], c0[1]); ctx.lineTo(c1[0], c1[1]); ctx.moveTo(c0[2], c0[3]); ctx.lineTo(c1[2], c1[3]); ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  /** Screen-space corners of the ribbon at spline point i: a tube (fixed width, perpendicular to the path) for coil, blending to a flat band along the projected normal for helices and strands. */
  function corner(i: number, sc: number, out: [number, number, number, number]) {
    const prev = i > 0 && rib.chain[i - 1] === rib.chain[i] ? i - 1 : i, next = i + 1 < rib.count && rib.chain[i + 1] === rib.chain[i] ? i + 1 : i;
    const tx = RX[next] - RX[prev], ty = RY[next] - RY[prev], tl = Math.hypot(tx, ty) || 1;
    const perpX = -ty / tl, perpY = tx / tl;
    const nx = NX[i], ny = -NY[i], nl = Math.hypot(nx, ny);
    const k = Math.max(0, Math.min(1, (rib.W[i] - COIL) / 0.5));
    let dx = perpX, dy = perpY;
    if (nl > 0.05 && k > 0) {
      const sgn = nx * perpX + ny * perpY < 0 ? -1 : 1;
      dx = perpX * (1 - k) + (sgn * nx / nl) * k; dy = perpY * (1 - k) + (sgn * ny / nl) * k;
      const dl = Math.hypot(dx, dy) || 1; dx /= dl; dy /= dl;
    }
    const hw = Math.max(COIL * 0.85, COIL * (1 - k) + rib.W[i] * Math.max(nl, 0.18) * k) * sc * RF[i];
    out[0] = RX[i] + dx * hw; out[1] = RY[i] + dy * hw; out[2] = RX[i] - dx * hw; out[3] = RY[i] - dy * hw;
  }

  return { draw, itemCount: items.length };
}

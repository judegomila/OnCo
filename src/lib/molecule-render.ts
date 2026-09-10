/**
 * Pure geometry and colour helpers behind Molecule3D (ball-and-stick small molecules, backbone ribbons for
 * proteins). No DOM here so everything is unit-testable; the canvas work lives in the component.
 *
 * Snapshot format (public/structures/*.json, written by scripts/fetch-structures.ts):
 *   atoms: [x, y, z, element, chain?, role?]   role: "ca" backbone C-alpha, "lig" bound ligand, "pkt" pocket residue atom
 *   bonds: [a, b, order]                        PubChem bond orders 1-3; PDB snapshots use 1 throughout
 *   ss:    one char per atom (PDB only, newer snapshots): H helix, E strand, C coil, "-" not backbone
 */
export type Vec3 = [number, number, number];
export type Atom = [number, number, number, string] | [number, number, number, string, string, string];
export type Bond = [number, number, number];
export type Mol = { atoms: Atom[]; bonds: Bond[]; dim?: 2 | 3; name?: string; chains?: string[]; ligands?: string[]; ss?: string };

/** CPK-style element colours, tuned to sit on a warm off-white card. Keys are symbols in canonical case (Cl, Br, Pt). */
export const ELEMENT_COLOURS: Record<string, string> = {
  H: "#eceae4", C: "#8f9299", N: "#3b6fd6", O: "#d8433a", S: "#d9b62a", P: "#e8862b", F: "#4cae5b", Cl: "#3b9b52", Br: "#8c2f2a", I: "#6f3fb3",
  B: "#e0a06a", Se: "#d0872a", Si: "#9a8b6b", Pt: "#5f7c8c", Pd: "#5f7c8c", Au: "#c9a227", Cu: "#b87333", Zn: "#7d8a99", Fe: "#b25a2c", Mg: "#5fa86e", Ca: "#7a7f8a", Na: "#8a6fd0", K: "#7a5fbf",
  Lu: "#2a9fc0", Ga: "#2a9fc0", Ac: "#2a9fc0", Ra: "#2a9fc0", Y: "#2a9fc0", Tc: "#2a9fc0", In: "#2a9fc0", Zr: "#2a9fc0", Gd: "#2a9fc0", Sm: "#2a9fc0", Sr: "#2a9fc0", Ho: "#2a9fc0", Re: "#2a9fc0", Pb: "#2a9fc0", Bi: "#2a9fc0",
};
export const ELEMENT_NAMES: Record<string, string> = {
  H: "hydrogen", C: "carbon", N: "nitrogen", O: "oxygen", S: "sulphur", P: "phosphorus", F: "fluorine", Cl: "chlorine", Br: "bromine", I: "iodine", B: "boron", Se: "selenium", Si: "silicon",
  Pt: "platinum", Pd: "palladium", Au: "gold", Cu: "copper", Zn: "zinc", Fe: "iron", Mg: "magnesium", Ca: "calcium", Na: "sodium", K: "potassium",
  Lu: "lutetium", Ga: "gallium", Ac: "actinium", Ra: "radium", Y: "yttrium", Tc: "technetium", In: "indium", Zr: "zirconium", Gd: "gadolinium", Sm: "samarium", Sr: "strontium", Ho: "holmium", Re: "rhenium", Pb: "lead", Bi: "bismuth",
};
/** Van der Waals radii in angstroms (Bondi / Alvarez); ball radius is a fraction of these. */
const VDW: Record<string, number> = { H: 1.1, C: 1.7, N: 1.55, O: 1.52, F: 1.47, Cl: 1.75, Br: 1.85, I: 1.98, S: 1.8, P: 1.8, B: 1.92, Se: 1.9, Si: 2.1, Pt: 1.75, Pd: 1.63, Au: 1.66, Cu: 1.4, Zn: 1.39, Fe: 1.5, Mg: 1.73, Ca: 2.3, Na: 2.27, K: 2.75, Lu: 2.2, Ga: 1.87, Ac: 2.5, Ra: 2.8, Y: 2.3 };
const FALLBACK_COLOUR = "#a05fb5";

/** Canonical element symbol: "CL" and "cl" become "Cl". PDB files sometimes upper-case the whole symbol. */
export function normaliseElement(el: string): string {
  const s = (el ?? "").trim();
  if (!s) return "";
  return s[0].toUpperCase() + s.slice(1).toLowerCase();
}
export function elementColour(el: string): string {
  return ELEMENT_COLOURS[normaliseElement(el)] ?? FALLBACK_COLOUR;
}
export function elementName(el: string): string {
  const e = normaliseElement(el);
  return ELEMENT_NAMES[e] ?? e;
}
export function vdwRadius(el: string): number {
  return VDW[normaliseElement(el)] ?? 2.0;
}

/**
 * Painter's algorithm: return items far-to-near so later draws cover earlier ones. `depth` is the camera-space
 * z after rotation with +z towards the viewer, so ascending order is back to front. Stable for equal depths.
 */
export function depthSort<T>(items: readonly T[], depth: (item: T) => number): T[] {
  return items
    .map((item, i) => ({ item, i, d: depth(item) }))
    .sort((a, b) => (a.d - b.d) || (a.i - b.i))
    .map((x) => x.item);
}

/** Yaw about Y then pitch about X, as in the other viewers; returns a row-major 3x3 matrix. */
export function rotation(yaw: number, pitch: number): number[] {
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cx = Math.cos(pitch), sx = Math.sin(pitch);
  // x1 = x cy + z sy ; z1 = -x sy + z cy ; y2 = y cx - z1 sx ; z2 = y sx + z1 cx
  return [cy, 0, sy, sx * sy, cx, -sx * cy, -cx * sy, sx, cx * cy];
}
export function apply(m: number[], p: Vec3): Vec3 {
  return [m[0] * p[0] + m[1] * p[1] + m[2] * p[2], m[3] * p[0] + m[4] * p[1] + m[5] * p[2], m[6] * p[0] + m[7] * p[1] + m[8] * p[2]];
}

/** Hex colour helpers: parse, mix towards another colour (t = 0 keeps `a`), lighten/darken. */
export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
export function rgbToHex([r, g, b]: [number, number, number]): string {
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}
export function mix(a: string, b: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(a), [r2, g2, b2] = hexToRgb(b);
  const k = Math.max(0, Math.min(1, t));
  return rgbToHex([r1 + (r2 - r1) * k, g1 + (g2 - g1) * k, b1 + (b2 - b1) * k]);
}
export const lighten = (hex: string, t: number) => mix(hex, "#ffffff", t);
export const darken = (hex: string, t: number) => mix(hex, "#000000", t);

/**
 * Uniform Catmull-Rom spline through `pts` with `subdiv` points per segment (the last control point is included).
 * Works on vectors of any length so positions, normals and widths can be interpolated together.
 */
export function catmullRom(pts: number[][], subdiv: number): number[][] {
  const n = pts.length;
  if (n === 0) return [];
  if (n === 1 || subdiv < 1) return pts.map((p) => [...p]);
  const dims = pts[0].length;
  const out: number[][] = [];
  const at = (i: number) => pts[Math.max(0, Math.min(n - 1, i))];
  for (let i = 0; i < n - 1; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    for (let s = 0; s < subdiv; s++) {
      const t = s / subdiv, t2 = t * t, t3 = t2 * t;
      const q: number[] = new Array(dims);
      for (let d = 0; d < dims; d++) {
        q[d] = 0.5 * ((2 * p1[d]) + (-p0[d] + p2[d]) * t + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * t2 + (-p0[d] + 3 * p1[d] - 3 * p2[d] + p3[d]) * t3);
      }
      out.push(q);
    }
  }
  out.push([...pts[n - 1]]);
  return out;
}

/** Continuous runs of backbone C-alpha atoms (role "ca"), split where the snapshot has no bond (chain breaks, gaps). */
export function chainSegments(mol: Mol): Array<{ chain: string; idx: number[] }> {
  const isCa = (k: number) => mol.atoms[k]?.[5] === "ca" || (mol.atoms[k]?.[3] === "CA" && mol.atoms[k]?.length === 6);
  const next = new Map<number, number>();
  for (const [a, b] of mol.bonds) if (isCa(a) && isCa(b) && !next.has(a)) next.set(a, b);
  const hasPrev = new Set(next.values());
  const out: Array<{ chain: string; idx: number[] }> = [];
  for (let k = 0; k < mol.atoms.length; k++) {
    if (!isCa(k) || hasPrev.has(k)) continue;
    const idx = [k];
    let cur = k;
    while (next.has(cur)) { cur = next.get(cur)!; idx.push(cur); }
    out.push({ chain: mol.atoms[k][4] ?? "", idx });
  }
  return out;
}

/**
 * Secondary structure from C-alpha geometry alone, for snapshots written before `ss` was kept. The i to i+3 and
 * i to i+4 distances separate helices (about 5.2 and 6.2 angstroms) from strands (about 10 and 13). Short runs
 * are dropped so the ribbon does not flicker between states. Returns one char per point: H, E or C.
 */
export function inferSecondary(ca: Vec3[]): string {
  const n = ca.length;
  const d = (i: number, j: number) => Math.hypot(ca[i][0] - ca[j][0], ca[i][1] - ca[j][1], ca[i][2] - ca[j][2]);
  const raw: string[] = new Array(n).fill("C");
  for (let i = 0; i + 4 < n; i++) {
    const d2 = d(i, i + 2), d3 = d(i, i + 3), d4 = d(i, i + 4);
    if (Math.abs(d3 - 5.2) < 0.7 && Math.abs(d4 - 6.2) < 0.9 && d2 < 6.0) { for (let k = i; k <= i + 4; k++) raw[k] = raw[k] === "E" ? "E" : "H"; }
    else if (d2 > 6.5 && d3 > 9.8 && d4 > 12.8) { for (let k = i; k <= i + 4; k++) if (raw[k] === "C") raw[k] = "E"; }
  }
  // Drop runs too short to be real (helix < 5, strand < 4). Against the HELIX/SHEET records of 5A9U, 5DK3 and 1IGT this agrees on about 69% of residues; it is only the fallback.
  const out = raw.slice();
  let i = 0;
  while (i < n) {
    let j = i;
    while (j < n && raw[j] === raw[i]) j++;
    const len = j - i;
    if ((raw[i] === "H" && len < 5) || (raw[i] === "E" && len < 4)) for (let k = i; k < j; k++) out[k] = "C";
    i = j;
  }
  return out.join("");
}

/** Half-width of the ribbon in angstroms for each secondary-structure state. */
export const RIBBON_WIDTH: Record<string, number> = { H: 1.5, E: 1.25, C: 0.42 };

export type RibbonPoint = { p: Vec3; n: Vec3; w: number };
/**
 * Smooth ribbon geometry for one backbone run: positions from a Catmull-Rom spline through the C-alpha trace,
 * a per-point normal (the local curvature direction, sign-continued along the chain so the ribbon does not flip)
 * and a half-width that widens on helices and strands. `ss` is one char per C-alpha in the run.
 */
export function ribbonGeometry(ca: Vec3[], ss: string, subdiv: number): RibbonPoint[] {
  const n = ca.length;
  if (n < 2) return [];
  const normals: Vec3[] = [];
  let prev: Vec3 | null = null;
  for (let i = 0; i < n; i++) {
    const a = ca[Math.max(0, i - 1)], b = ca[i], c = ca[Math.min(n - 1, i + 1)];
    let v: Vec3 = [a[0] - 2 * b[0] + c[0], a[1] - 2 * b[1] + c[1], a[2] - 2 * b[2] + c[2]];
    let L = Math.hypot(v[0], v[1], v[2]);
    if (L < 1e-3) {
      // Straight stretch or chain end: pick any vector perpendicular to the tangent.
      const t: Vec3 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
      const tl = Math.hypot(t[0], t[1], t[2]) || 1;
      const tn: Vec3 = [t[0] / tl, t[1] / tl, t[2] / tl];
      v = Math.abs(tn[1]) < 0.9 ? [-tn[2], 0, tn[0]] : [0, tn[2], -tn[1]];
      L = Math.hypot(v[0], v[1], v[2]) || 1;
    }
    let nrm: Vec3 = [v[0] / L, v[1] / L, v[2] / L];
    if (prev && (nrm[0] * prev[0] + nrm[1] * prev[1] + nrm[2] * prev[2]) < 0) nrm = [-nrm[0], -nrm[1], -nrm[2]];
    normals.push(nrm);
    prev = nrm;
  }
  // Smooth the normals a little so strands read as a gently twisting band rather than a saw-tooth.
  const sm: Vec3[] = normals.map((nv, i) => {
    const a = normals[Math.max(0, i - 1)], c = normals[Math.min(n - 1, i + 1)];
    const v: Vec3 = [a[0] + 2 * nv[0] + c[0], a[1] + 2 * nv[1] + c[1], a[2] + 2 * nv[2] + c[2]];
    const L = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / L, v[1] / L, v[2] / L];
  });
  const ctrl = ca.map((p, i) => [p[0], p[1], p[2], sm[i][0], sm[i][1], sm[i][2], RIBBON_WIDTH[ss[i] ?? "C"] ?? RIBBON_WIDTH.C]);
  return catmullRom(ctrl, subdiv).map((q) => {
    const L = Math.hypot(q[3], q[4], q[5]) || 1;
    return { p: [q[0], q[1], q[2]], n: [q[3] / L, q[4] / L, q[5] / L], w: Math.max(RIBBON_WIDTH.C, q[6]) };
  });
}

/** Elements present, most frequent first, hydrogens optional. */
export function elementsPresent(mol: Mol, opts: { includeH?: boolean; role?: string } = {}): string[] {
  const counts = new Map<string, number>();
  for (const a of mol.atoms) {
    if (opts.role && a[5] !== opts.role) continue;
    const el = normaliseElement(a[3]);
    if (el === "Ca" && a[5] === "ca") continue; // backbone marker, not calcium
    if (!el || (el === "H" && !opts.includeH)) continue;
    counts.set(el, (counts.get(el) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([el]) => el);
}

/** Calm chain palettes (light and dark cards): sage, periwinkle, mauve, ochre, teal, lavender, clay, moss. */
export const CHAIN_PALETTE = {
  light: ["#5b8a72", "#6b7fb3", "#b06a8a", "#c48a4a", "#4f8fa3", "#8a7fb0", "#a35b5b", "#6f9a5a"],
  dark: ["#8fc4a8", "#9fb0e0", "#dca0bd", "#e0b27a", "#86c3d6", "#b7addc", "#d19393", "#a6cf8d"],
};
export function chainColour(chains: string[], chain: string, dark: boolean): string {
  const pal = dark ? CHAIN_PALETTE.dark : CHAIN_PALETTE.light;
  return pal[Math.max(0, chains.indexOf(chain)) % pal.length];
}

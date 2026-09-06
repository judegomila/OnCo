/**
 * Tiny wireframe mesh format and procedural generators for technology schematics.
 * Coordinates are arbitrary units; the viewer normalises to the bounding radius.
 * Segment `cls` selects a colour class in the viewer: "accent" (beam/energy), "soft" (faint context), "hot" (highlight), default (structure).
 */
export type Vec3 = [number, number, number];
export type Segment = [number, number] | [number, number, string];
export type Label = { at: Vec3; text: string };
export type Mesh = { points: Vec3[]; segments: Segment[]; labels?: Label[] };

const TAU = Math.PI * 2;

export function empty(): Mesh { return { points: [], segments: [], labels: [] }; }

/** Append `m` into `target` (mutates target), optionally translated/scaled, with segment class override. */
export function add(target: Mesh, m: Mesh, opts: { at?: Vec3; scale?: number | Vec3; cls?: string; rotY?: number; rotX?: number; rotZ?: number } = {}): Mesh {
  const off = target.points.length;
  const s: Vec3 = typeof opts.scale === "number" ? [opts.scale, opts.scale, opts.scale] : (opts.scale ?? [1, 1, 1]);
  const at = opts.at ?? [0, 0, 0];
  for (const p of m.points) {
    let [x, y, z] = [p[0] * s[0], p[1] * s[1], p[2] * s[2]];
    if (opts.rotX) { const c = Math.cos(opts.rotX), si = Math.sin(opts.rotX); [y, z] = [y * c - z * si, y * si + z * c]; }
    if (opts.rotY) { const c = Math.cos(opts.rotY), si = Math.sin(opts.rotY); [x, z] = [x * c + z * si, -x * si + z * c]; }
    if (opts.rotZ) { const c = Math.cos(opts.rotZ), si = Math.sin(opts.rotZ); [x, y] = [x * c - y * si, x * si + y * c]; }
    target.points.push([x + at[0], y + at[1], z + at[2]]);
  }
  for (const seg of m.segments) target.segments.push([seg[0] + off, seg[1] + off, opts.cls ?? seg[2]] as Segment);
  for (const l of m.labels ?? []) {
    let [x, y, z] = [l.at[0] * s[0], l.at[1] * s[1], l.at[2] * s[2]];
    if (opts.rotX) { const c = Math.cos(opts.rotX), si = Math.sin(opts.rotX); [y, z] = [y * c - z * si, y * si + z * c]; }
    if (opts.rotY) { const c = Math.cos(opts.rotY), si = Math.sin(opts.rotY); [x, z] = [x * c + z * si, -x * si + z * c]; }
    if (opts.rotZ) { const c = Math.cos(opts.rotZ), si = Math.sin(opts.rotZ); [x, y] = [x * c - y * si, x * si + y * c]; }
    (target.labels ??= []).push({ at: [x + at[0], y + at[1], z + at[2]], text: l.text });
  }
  return target;
}

export function label(target: Mesh, at: Vec3, text: string): Mesh { (target.labels ??= []).push({ at, text }); return target; }

/** Wire ellipsoid: `lat` latitude rings × `lon` meridians. */
export function ellipsoid(rx: number, ry: number, rz: number, lat = 5, lon = 8, cls?: string): Mesh {
  const m = empty();
  const rings: number[][] = [];
  for (let i = 1; i <= lat; i++) {
    const phi = (Math.PI * i) / (lat + 1);
    const ring: number[] = [];
    for (let j = 0; j < lon; j++) {
      const th = (TAU * j) / lon;
      ring.push(m.points.length);
      m.points.push([rx * Math.sin(phi) * Math.cos(th), ry * Math.cos(phi), rz * Math.sin(phi) * Math.sin(th)]);
    }
    rings.push(ring);
  }
  const top = m.points.length; m.points.push([0, ry, 0]);
  const bot = m.points.length; m.points.push([0, -ry, 0]);
  for (let i = 0; i < rings.length; i++) {
    for (let j = 0; j < lon; j++) {
      m.segments.push([rings[i][j], rings[i][(j + 1) % lon], cls as string]);
      if (i + 1 < rings.length) m.segments.push([rings[i][j], rings[i + 1][j], cls as string]);
    }
  }
  for (let j = 0; j < lon; j++) { m.segments.push([top, rings[0][j], cls as string]); m.segments.push([bot, rings[rings.length - 1][j], cls as string]); }
  return m;
}

export const sphere = (r: number, lat = 5, lon = 8, cls?: string) => ellipsoid(r, r, r, lat, lon, cls);

/** Ring in the XZ plane (axis = Y). */
export function ring(r: number, n = 24, cls?: string, axis: "x" | "y" | "z" = "y"): Mesh {
  const m = empty();
  for (let i = 0; i < n; i++) {
    const t = (TAU * i) / n, a = r * Math.cos(t), b = r * Math.sin(t);
    m.points.push(axis === "y" ? [a, 0, b] : axis === "x" ? [0, a, b] : [a, b, 0]);
  }
  for (let i = 0; i < n; i++) m.segments.push([i, (i + 1) % n, cls as string]);
  return m;
}

/** Torus around axis Y. */
export function torus(R: number, r: number, nMajor = 16, nMinor = 6, cls?: string): Mesh {
  const m = empty();
  for (let i = 0; i < nMajor; i++) {
    const u = (TAU * i) / nMajor;
    for (let j = 0; j < nMinor; j++) {
      const v = (TAU * j) / nMinor;
      m.points.push([(R + r * Math.cos(v)) * Math.cos(u), r * Math.sin(v), (R + r * Math.cos(v)) * Math.sin(u)]);
    }
  }
  for (let i = 0; i < nMajor; i++) for (let j = 0; j < nMinor; j++) {
    const a = i * nMinor + j;
    m.segments.push([a, i * nMinor + ((j + 1) % nMinor), cls as string]);
    m.segments.push([a, ((i + 1) % nMajor) * nMinor + j, cls as string]);
  }
  return m;
}

/** Open cylinder along Y from -h/2 to h/2. */
export function cylinder(r: number, h: number, n = 16, rings = 2, cls?: string, capped = false): Mesh {
  const m = empty();
  for (let k = 0; k < rings; k++) {
    const y = -h / 2 + (h * k) / (rings - 1 || 1);
    for (let i = 0; i < n; i++) { const t = (TAU * i) / n; m.points.push([r * Math.cos(t), y, r * Math.sin(t)]); }
  }
  for (let k = 0; k < rings; k++) for (let i = 0; i < n; i++) {
    m.segments.push([k * n + i, k * n + ((i + 1) % n), cls as string]);
    if (k + 1 < rings) m.segments.push([k * n + i, (k + 1) * n + i, cls as string]);
  }
  if (capped) { const c0 = m.points.length; m.points.push([0, -h / 2, 0]); const c1 = m.points.length; m.points.push([0, h / 2, 0]); for (let i = 0; i < n; i += 2) { m.segments.push([c0, i, cls as string]); m.segments.push([c1, (rings - 1) * n + i, cls as string]); } }
  return m;
}

export function box(w: number, h: number, d: number, cls?: string): Mesh {
  const m = empty();
  for (const x of [-w / 2, w / 2]) for (const y of [-h / 2, h / 2]) for (const z of [-d / 2, d / 2]) m.points.push([x, y, z]);
  const e: Array<[number, number]> = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];
  for (const [a, b] of e) m.segments.push([a, b, cls as string]);
  return m;
}

export function polyline(pts: Vec3[], cls?: string, closed = false): Mesh {
  const m = empty();
  m.points.push(...pts);
  for (let i = 0; i + 1 < pts.length; i++) m.segments.push([i, i + 1, cls as string]);
  if (closed && pts.length > 2) m.segments.push([pts.length - 1, 0, cls as string]);
  return m;
}

export function line(a: Vec3, b: Vec3, cls?: string): Mesh { return polyline([a, b], cls); }

/** Helix along Y. */
export function helix(r: number, h: number, turns: number, n = 40, cls?: string, phase = 0): Mesh {
  const pts: Vec3[] = [];
  for (let i = 0; i <= n; i++) { const t = i / n; const a = TAU * turns * t + phase; pts.push([r * Math.cos(a), -h / 2 + h * t, r * Math.sin(a)]); }
  return polyline(pts, cls);
}

/** Double helix with rungs (DNA). */
export function dna(r: number, h: number, turns: number, n = 40, cls?: string, rungEvery = 4): Mesh {
  const m = empty();
  add(m, helix(r, h, turns, n, cls, 0));
  add(m, helix(r, h, turns, n, cls, Math.PI));
  for (let i = 0; i <= n; i += rungEvery) m.segments.push([i, n + 1 + i, "soft"]);
  return m;
}

/** Cone / fan: apex at `apex`, base circle radius r at distance L along -Y (rotated by caller). */
export function cone(r: number, L: number, n = 10, cls?: string, apexUp = true): Mesh {
  const m = empty();
  const apexY = apexUp ? L / 2 : -L / 2, baseY = apexUp ? -L / 2 : L / 2;
  m.points.push([0, apexY, 0]);
  for (let i = 0; i < n; i++) { const t = (TAU * i) / n; m.points.push([r * Math.cos(t), baseY, r * Math.sin(t)]); }
  for (let i = 1; i <= n; i++) { m.segments.push([0, i, cls as string]); m.segments.push([i, (i % n) + 1, cls as string]); }
  return m;
}

/** Planar fan (2D wedge) in the XY plane, apex at origin, opening downward. */
export function fan(halfAngle: number, L: number, n = 8, cls?: string): Mesh {
  const m = empty();
  m.points.push([0, 0, 0]);
  for (let i = 0; i <= n; i++) { const a = -halfAngle + (2 * halfAngle * i) / n; m.points.push([L * Math.sin(a), -L * Math.cos(a), 0]); }
  for (let i = 1; i <= n + 1; i++) { m.segments.push([0, i, cls as string]); if (i <= n) m.segments.push([i, i + 1, cls as string]); }
  return m;
}

/** Grid of isolated points (rendered as dots because a point with a zero-length segment draws a dot). */
export function dots(pts: Vec3[], cls?: string): Mesh {
  const m = empty();
  pts.forEach((p, i) => { m.points.push(p); m.segments.push([i, i, cls as string]); });
  return m;
}

export function grid3(nx: number, ny: number, nz: number, spacing: number, cls?: string): Mesh {
  const pts: Vec3[] = [];
  for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) for (let k = 0; k < nz; k++) pts.push([(i - (nx - 1) / 2) * spacing, (j - (ny - 1) / 2) * spacing, (k - (nz - 1) / 2) * spacing]);
  return dots(pts, cls);
}

export function arrow(a: Vec3, b: Vec3, cls?: string, head = 0.15): Mesh {
  const m = polyline([a, b], cls);
  const d: Vec3 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const L = Math.hypot(...d) || 1;
  const u: Vec3 = [d[0] / L, d[1] / L, d[2] / L];
  // perpendicular
  const p: Vec3 = Math.abs(u[1]) < 0.9 ? [ -u[2], 0, u[0] ] : [1, 0, 0];
  const pl = Math.hypot(...p) || 1; const q: Vec3 = [p[0] / pl, p[1] / pl, p[2] / pl];
  const hb: Vec3 = [b[0] - u[0] * head * L, b[1] - u[1] * head * L, b[2] - u[2] * head * L];
  const w = head * L * 0.5;
  const i1 = m.points.length; m.points.push([hb[0] + q[0] * w, hb[1] + q[1] * w, hb[2] + q[2] * w]);
  const i2 = m.points.length; m.points.push([hb[0] - q[0] * w, hb[1] - q[1] * w, hb[2] - q[2] * w]);
  m.segments.push([1, i1, cls as string], [1, i2, cls as string]);
  return m;
}

/** Icosahedron wire (virus capsid). */
export function icosahedron(r: number, cls?: string): Mesh {
  const t = (1 + Math.sqrt(5)) / 2;
  const raw: Vec3[] = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]];
  const s = r / Math.hypot(1, t);
  const m = empty();
  m.points = raw.map(([x, y, z]) => [x * s, y * s, z * s]);
  const edges = new Set<string>();
  const tris = [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8], [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]];
  for (const [a, b, c] of tris) for (const [x, y] of [[a, b], [b, c], [c, a]]) { const k = x < y ? `${x}-${y}` : `${y}-${x}`; if (!edges.has(k)) { edges.add(k); m.segments.push([x, y, cls as string]); } }
  return m;
}

/** Small octahedron (used for payload "spheres"). */
export function octahedron(r: number, cls?: string): Mesh {
  const m = empty();
  m.points = [[r, 0, 0], [-r, 0, 0], [0, r, 0], [0, -r, 0], [0, 0, r], [0, 0, -r]];
  for (const a of [0, 1]) for (const b of [2, 3]) for (const c of [4, 5]) { m.segments.push([a, b, cls as string], [b, c, cls as string], [a, c, cls as string]); }
  return m;
}

/** Y-shaped antibody: Fc stem down, two Fab arms up; returns arm tips via labels-free convention (see antibodyTips). */
export function antibody(scale = 1, cls?: string, armAngle = 0.6, leftArm = true, rightArm = true): Mesh {
  const m = empty();
  const s = scale;
  // Fc stem as two parallel chains
  add(m, polyline([[-0.12 * s, -1.0 * s, 0], [-0.12 * s, -0.05 * s, 0]], cls));
  add(m, polyline([[0.12 * s, -1.0 * s, 0], [0.12 * s, -0.05 * s, 0]], cls));
  add(m, polyline([[-0.12 * s, -1.0 * s, 0], [0.12 * s, -1.0 * s, 0]], cls));
  // hinge
  add(m, polyline([[-0.12 * s, -0.05 * s, 0], [0.12 * s, -0.05 * s, 0]], cls));
  const arm = (dir: number) => {
    const dx = Math.sin(armAngle) * dir, dy = Math.cos(armAngle);
    const base: Vec3 = [0.12 * s * dir, -0.05 * s, 0];
    const tip: Vec3 = [base[0] + dx * 1.0 * s, base[1] + dy * 1.0 * s, 0];
    const off: Vec3 = [-dy * 0.12 * s * dir, dx * 0.12 * s * dir, 0];
    add(m, polyline([base, tip], cls));
    add(m, polyline([[base[0] + off[0], base[1] + off[1], 0], [tip[0] + off[0], tip[1] + off[1], 0]], cls));
    add(m, polyline([[tip[0], tip[1], 0], [tip[0] + off[0], tip[1] + off[1], 0]], cls));
  };
  if (leftArm) arm(-1);
  if (rightArm) arm(1);
  return m;
}

export function antibodyTips(scale = 1, armAngle = 0.6): [Vec3, Vec3] {
  const s = scale, dx = Math.sin(armAngle), dy = Math.cos(armAngle);
  return [[-0.12 * s - dx * s, -0.05 * s + dy * s, 0], [0.12 * s + dx * s, -0.05 * s + dy * s, 0]];
}

/** Bounding radius (for callers who want to size compositions). */
export function radius(m: Mesh): number { let r = 0; for (const p of m.points) r = Math.max(r, Math.hypot(...p)); return r; }

export function pointCount(m: Mesh): number { return m.points.length; }

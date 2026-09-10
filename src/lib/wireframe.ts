/**
 * Tiny wireframe mesh format and procedural generators for technology schematics.
 * Coordinates are arbitrary units; the viewer normalises to the bounding radius.
 * Segment `cls` selects a colour class in the viewer: "accent" (beam/energy), "soft" (faint context), "hot" (highlight), default (structure).
 * Optional `faces` are closed polygons (point indices) that the viewer fills with a translucent wash so closed shapes
 * (a cell, an organ, a scanner ring) read as bodies rather than cages. Everything without faces renders exactly as before.
 */
export type Vec3 = [number, number, number];
export type Segment = [number, number] | [number, number, string];
export type Label = { at: Vec3; text: string };
/** Closed polygon over point indices (3 or more, planar or nearly so). `cls` follows the segment colour classes. */
export type Face = { idx: number[]; cls?: string };
/** One animation frame: replacement point positions (same length as `points`), per-segment alpha multipliers (0-1), an optional caption, and optional label overrides. */
export type Frame = { points?: Vec3[]; alpha?: number[]; caption?: string; labels?: Label[] };
export type Animation = { duration: number; frame: (t: number) => Frame };
/** `anim` names an animated builder (see data/animated.ts); server components pass this marker and the client viewer builds the animation, because functions cannot cross the server→client boundary. */
export type Mesh = { points: Vec3[]; segments: Segment[]; faces?: Face[]; labels?: Label[]; animate?: Animation; anim?: string };

/** Interpolation helpers for animations. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const lerp3 = (a: Vec3, b: Vec3, t: number): Vec3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
export const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
/** Maps t from [a,b] to [0,1], clamped, smoothstep-eased. */
export const phase = (t: number, a: number, b: number) => { const u = clamp01((t - a) / (b - a)); return u * u * (3 - 2 * u); };

/** Named part of a composed mesh: index ranges into points/segments, so animations can transform parts independently. */
export type Part = { p0: number; p1: number; s0: number; s1: number };
/** Append `m` as a named part; returns its index ranges. */
export function part(target: Mesh, m: Mesh, opts: Parameters<typeof add>[2] = {}): Part {
  const p0 = target.points.length, s0 = target.segments.length;
  add(target, m, opts);
  return { p0, p1: target.points.length, s0, s1: target.segments.length };
}
/** Transform a part in a frame buffer: translate by dx, scale about the part centroid, optionally spin around Y. */
export function movePart(buf: Vec3[], base: Vec3[], pt: Part, dx: Vec3, scale = 1, spin = 0): void {
  let cx = 0, cy = 0, cz = 0; const n = pt.p1 - pt.p0 || 1;
  for (let i = pt.p0; i < pt.p1; i++) { cx += base[i][0]; cy += base[i][1]; cz += base[i][2]; }
  cx /= n; cy /= n; cz /= n;
  const c = Math.cos(spin), si = Math.sin(spin);
  for (let i = pt.p0; i < pt.p1; i++) {
    let x = (base[i][0] - cx) * scale, z = (base[i][2] - cz) * scale;
    const y = (base[i][1] - cy) * scale;
    if (spin) { const x1 = x * c + z * si; z = -x * si + z * c; x = x1; }
    buf[i] = [x + cx + dx[0], y + cy + dx[1], z + cz + dx[2]];
  }
}
export function setAlpha(alpha: number[], pt: Part, a: number): void { for (let i = pt.s0; i < pt.s1; i++) alpha[i] = a; }

const TAU = Math.PI * 2;

export function empty(): Mesh { return { points: [], segments: [], labels: [] }; }

function rot(p: Vec3, opts: { rotX?: number; rotY?: number; rotZ?: number }): Vec3 {
  let [x, y, z] = p;
  if (opts.rotX) { const c = Math.cos(opts.rotX), si = Math.sin(opts.rotX); [y, z] = [y * c - z * si, y * si + z * c]; }
  if (opts.rotY) { const c = Math.cos(opts.rotY), si = Math.sin(opts.rotY); [x, z] = [x * c + z * si, -x * si + z * c]; }
  if (opts.rotZ) { const c = Math.cos(opts.rotZ), si = Math.sin(opts.rotZ); [x, y] = [x * c - y * si, x * si + y * c]; }
  return [x, y, z];
}

/** Append `m` into `target` (mutates target), optionally translated/scaled, with segment class override. Faces and labels come along. */
export function add(target: Mesh, m: Mesh, opts: { at?: Vec3; scale?: number | Vec3; cls?: string; rotY?: number; rotX?: number; rotZ?: number } = {}): Mesh {
  const off = target.points.length;
  const s: Vec3 = typeof opts.scale === "number" ? [opts.scale, opts.scale, opts.scale] : (opts.scale ?? [1, 1, 1]);
  const at = opts.at ?? [0, 0, 0];
  const place = (p: Vec3): Vec3 => { const [x, y, z] = rot([p[0] * s[0], p[1] * s[1], p[2] * s[2]], opts); return [x + at[0], y + at[1], z + at[2]]; };
  for (const p of m.points) target.points.push(place(p));
  for (const seg of m.segments) target.segments.push([seg[0] + off, seg[1] + off, opts.cls ?? seg[2]] as Segment);
  for (const f of m.faces ?? []) (target.faces ??= []).push({ idx: f.idx.map((i) => i + off), cls: opts.cls ?? f.cls });
  for (const l of m.labels ?? []) (target.labels ??= []).push({ at: place(l.at), text: l.text });
  return target;
}

export function label(target: Mesh, at: Vec3, text: string): Mesh { (target.labels ??= []).push({ at, text }); return target; }

const face = (m: Mesh, idx: number[], cls?: string) => { (m.faces ??= []).push(cls ? { idx, cls } : { idx }); };

/** Wire ellipsoid: `lat` latitude rings × `lon` meridians. `filled` adds translucent quads between the rings and pole triangles. */
export function ellipsoid(rx: number, ry: number, rz: number, lat = 5, lon = 8, cls?: string, filled = false): Mesh {
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
      const j1 = (j + 1) % lon;
      m.segments.push([rings[i][j], rings[i][j1], cls as string]);
      if (i + 1 < rings.length) {
        m.segments.push([rings[i][j], rings[i + 1][j], cls as string]);
        if (filled) face(m, [rings[i][j], rings[i][j1], rings[i + 1][j1], rings[i + 1][j]], cls);
      }
    }
  }
  for (let j = 0; j < lon; j++) {
    const j1 = (j + 1) % lon, last = rings.length - 1;
    m.segments.push([top, rings[0][j], cls as string]); m.segments.push([bot, rings[last][j], cls as string]);
    if (filled) { face(m, [top, rings[0][j1], rings[0][j]], cls); face(m, [bot, rings[last][j], rings[last][j1]], cls); }
  }
  return m;
}

export const sphere = (r: number, lat = 5, lon = 8, cls?: string, filled = false) => ellipsoid(r, r, r, lat, lon, cls, filled);

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

/** Filled disc (one n-gon face plus its rim), same orientation options as `ring`. */
export function disc(r: number, n = 24, cls?: string, axis: "x" | "y" | "z" = "y"): Mesh {
  const m = ring(r, n, cls, axis);
  face(m, m.points.map((_, i) => i), cls);
  return m;
}

/** Torus around axis Y. `filled` adds a translucent skin. */
export function torus(R: number, r: number, nMajor = 16, nMinor = 6, cls?: string, filled = false): Mesh {
  const m = empty();
  for (let i = 0; i < nMajor; i++) {
    const u = (TAU * i) / nMajor;
    for (let j = 0; j < nMinor; j++) {
      const v = (TAU * j) / nMinor;
      m.points.push([(R + r * Math.cos(v)) * Math.cos(u), r * Math.sin(v), (R + r * Math.cos(v)) * Math.sin(u)]);
    }
  }
  for (let i = 0; i < nMajor; i++) for (let j = 0; j < nMinor; j++) {
    const a = i * nMinor + j, b = i * nMinor + ((j + 1) % nMinor), c = ((i + 1) % nMajor) * nMinor + j, d = ((i + 1) % nMajor) * nMinor + ((j + 1) % nMinor);
    m.segments.push([a, b, cls as string]);
    m.segments.push([a, c, cls as string]);
    if (filled) face(m, [a, b, d, c], cls);
  }
  return m;
}

/** Open cylinder along Y from -h/2 to h/2. `filled` adds a translucent side wall (and end discs when `capped`). */
export function cylinder(r: number, h: number, n = 16, rings = 2, cls?: string, capped = false, filled = false): Mesh {
  const m = empty();
  for (let k = 0; k < rings; k++) {
    const y = -h / 2 + (h * k) / (rings - 1 || 1);
    for (let i = 0; i < n; i++) { const t = (TAU * i) / n; m.points.push([r * Math.cos(t), y, r * Math.sin(t)]); }
  }
  for (let k = 0; k < rings; k++) for (let i = 0; i < n; i++) {
    const i1 = (i + 1) % n;
    m.segments.push([k * n + i, k * n + i1, cls as string]);
    if (k + 1 < rings) {
      m.segments.push([k * n + i, (k + 1) * n + i, cls as string]);
      if (filled) face(m, [k * n + i, k * n + i1, (k + 1) * n + i1, (k + 1) * n + i], cls);
    }
  }
  if (capped) {
    const c0 = m.points.length; m.points.push([0, -h / 2, 0]); const c1 = m.points.length; m.points.push([0, h / 2, 0]);
    for (let i = 0; i < n; i += 2) { m.segments.push([c0, i, cls as string]); m.segments.push([c1, (rings - 1) * n + i, cls as string]); }
    if (filled) { face(m, Array.from({ length: n }, (_, i) => i), cls); face(m, Array.from({ length: n }, (_, i) => (rings - 1) * n + i), cls); }
  }
  return m;
}

export function box(w: number, h: number, d: number, cls?: string, filled = false): Mesh {
  const m = empty();
  for (const x of [-w / 2, w / 2]) for (const y of [-h / 2, h / 2]) for (const z of [-d / 2, d / 2]) m.points.push([x, y, z]);
  const e: Array<[number, number]> = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];
  for (const [a, b] of e) m.segments.push([a, b, cls as string]);
  if (filled) for (const q of [[0, 1, 3, 2], [4, 5, 7, 6], [0, 1, 5, 4], [2, 3, 7, 6], [0, 2, 6, 4], [1, 3, 7, 5]]) face(m, q, cls);
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

/** Planar fan (2D wedge) in the XY plane, apex at origin, opening downward. `filled` adds a translucent wedge face (a beam). */
export function fan(halfAngle: number, L: number, n = 8, cls?: string, filled = false): Mesh {
  const m = empty();
  m.points.push([0, 0, 0]);
  for (let i = 0; i <= n; i++) { const a = -halfAngle + (2 * halfAngle * i) / n; m.points.push([L * Math.sin(a), -L * Math.cos(a), 0]); }
  for (let i = 1; i <= n + 1; i++) { m.segments.push([0, i, cls as string]); if (i <= n) m.segments.push([i, i + 1, cls as string]); }
  if (filled) face(m, m.points.map((_, i) => i), cls);
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

/** Icosahedron wire (virus capsid). `filled` adds the twenty triangular facets. */
export function icosahedron(r: number, cls?: string, filled = false): Mesh {
  const t = (1 + Math.sqrt(5)) / 2;
  const raw: Vec3[] = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]];
  const s = r / Math.hypot(1, t);
  const m = empty();
  m.points = raw.map(([x, y, z]) => [x * s, y * s, z * s]);
  const edges = new Set<string>();
  const tris = [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8], [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]];
  for (const [a, b, c] of tris) {
    for (const [x, y] of [[a, b], [b, c], [c, a]]) { const k = x < y ? `${x}-${y}` : `${y}-${x}`; if (!edges.has(k)) { edges.add(k); m.segments.push([x, y, cls as string]); } }
    if (filled) face(m, [a, b, c], cls);
  }
  return m;
}

/** Small octahedron (used for payload "spheres"). `filled` adds its eight facets. */
export function octahedron(r: number, cls?: string, filled = false): Mesh {
  const m = empty();
  m.points = [[r, 0, 0], [-r, 0, 0], [0, r, 0], [0, -r, 0], [0, 0, r], [0, 0, -r]];
  for (const a of [0, 1]) for (const b of [2, 3]) for (const c of [4, 5]) { m.segments.push([a, b, cls as string], [b, c, cls as string], [a, c, cls as string]); if (filled) face(m, [a, b, c], cls); }
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

/**
 * Lipid bilayer patch: two parallel sheets (w along X, d along Z, `gap` apart, centred on the origin) drawn as a light grid
 * with short rungs joining them, plus two translucent faces so the membrane reads as a surface. Receptors sit on +Y.
 */
export function membrane(w: number, d: number, cls = "soft", nx = 7, nz = 2, gap = 0.14): Mesh {
  const m = empty();
  const sheet = (y: number): number[] => {
    const start = m.points.length;
    for (let i = 0; i <= nx; i++) for (let k = 0; k <= nz; k++) m.points.push([-w / 2 + (w * i) / nx, y, -d / 2 + (d * k) / nz]);
    const at = (i: number, k: number) => start + i * (nz + 1) + k;
    for (let i = 0; i <= nx; i++) for (let k = 0; k <= nz; k++) {
      if (i < nx) m.segments.push([at(i, k), at(i + 1, k), cls]);
      if (k < nz) m.segments.push([at(i, k), at(i, k + 1), cls]);
    }
    face(m, [at(0, 0), at(nx, 0), at(nx, nz), at(0, nz)], cls);
    return Array.from({ length: (nx + 1) * (nz + 1) }, (_, j) => start + j);
  };
  const top = sheet(gap / 2), bot = sheet(-gap / 2);
  for (let j = 0; j < top.length; j++) m.segments.push([top[j], bot[j], cls]);
  return m;
}

/** Small key (hormone "key" for a receptor "lock"): ring head on the left, shaft along +X, two teeth below. Length ≈ 0.75·s. */
export function keyShape(s = 1, cls?: string): Mesh {
  const m = empty();
  add(m, ring(0.1 * s, 8, cls, "z"), { at: [-0.25 * s, 0, 0] });
  add(m, polyline([[-0.15 * s, 0, 0], [0.4 * s, 0, 0]], cls));
  add(m, polyline([[0.22 * s, 0, 0], [0.22 * s, -0.12 * s, 0]], cls));
  add(m, polyline([[0.36 * s, 0, 0], [0.36 * s, -0.15 * s, 0]], cls));
  return m;
}

/** Metaphase chromosome: two chromatids crossing at the centromere (an X), height ≈ 0.36·s. */
export function chromosome(s = 1, cls?: string): Mesh {
  const m = empty();
  add(m, polyline([[-0.09 * s, -0.18 * s, 0], [0, 0, 0], [0.09 * s, 0.18 * s, 0]], cls));
  add(m, polyline([[0.09 * s, -0.18 * s, 0], [0, 0, 0], [-0.09 * s, 0.18 * s, 0]], cls));
  return m;
}

/** Syringe along +Y: needle tip at the origin pointing down (-Y), barrel above, plunger on top. Height ≈ 1.1·s. */
export function syringe(s = 1, cls?: string): Mesh {
  const m = empty();
  add(m, polyline([[0, 0, 0], [0, 0.32 * s, 0]], cls));
  add(m, cylinder(0.1 * s, 0.5 * s, 10, 2, cls, false, true), { at: [0, 0.57 * s, 0] });
  add(m, ring(0.14 * s, 10, cls, "y"), { at: [0, 0.82 * s, 0] });
  add(m, polyline([[0, 0.82 * s, 0], [0, 1.08 * s, 0]], cls));
  add(m, ring(0.09 * s, 8, cls, "y"), { at: [0, 1.08 * s, 0] });
  return m;
}

/** Bounding radius (for callers who want to size compositions). */
export function radius(m: Mesh): number { let r = 0; for (const p of m.points) r = Math.max(r, Math.hypot(...p)); return r; }

export function pointCount(m: Mesh): number { return m.points.length; }

// ---------------------------------------------------------------- renderer helpers (pure, unit-tested)

/** Parse a CSS colour as written in the theme variables (#rgb, #rrggbb, #rrggbbaa, rgb()/rgba()). Returns null for anything else (e.g. "transparent"). */
export function hexToRgb(css: string): [number, number, number] | null {
  const v = css.trim();
  const hex = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(v);
  if (hex) {
    let h = hex[1];
    if (h.length <= 4) h = h.split("").map((c) => c + c).join("");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  const fn = /^rgba?\(\s*(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)/i.exec(v);
  if (fn) return [Math.round(+fn[1]), Math.round(+fn[2]), Math.round(+fn[3])];
  return null;
}

/**
 * For each face, the indices of the mesh segments that run along its edges. The viewer fades a face with the mean alpha of
 * these segments, so an animated part that dims or vanishes takes its fill with it. Faces with no matching edge get [].
 */
export function faceSegments(m: Mesh): number[][] {
  const byEdge = new Map<string, number>();
  m.segments.forEach((s, k) => { if (s[0] !== s[1]) byEdge.set(s[0] < s[1] ? `${s[0]}-${s[1]}` : `${s[1]}-${s[0]}`, k); });
  return (m.faces ?? []).map((f) => {
    const out: number[] = [];
    for (let i = 0; i < f.idx.length; i++) {
      const a = f.idx[i], b = f.idx[(i + 1) % f.idx.length];
      const k = byEdge.get(a < b ? `${a}-${b}` : `${b}-${a}`);
      if (k !== undefined) out.push(k);
    }
    return out;
  });
}

/** Newell normal of a polygon (not normalised; its length is twice the area). Works for non-planar quads as an average. */
export function polygonNormal(pts: Vec3[]): Vec3 {
  let nx = 0, ny = 0, nz = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length];
    nx += (a[1] - b[1]) * (a[2] + b[2]);
    ny += (a[2] - b[2]) * (a[0] + b[0]);
    nz += (a[0] - b[0]) * (a[1] + b[1]);
  }
  return [nx, ny, nz];
}

/** How squarely a polygon faces the viewer along Z: 1 face-on, 0 edge-on. */
export function facing(pts: Vec3[]): number {
  const n = polygonNormal(pts);
  const L = Math.hypot(n[0], n[1], n[2]);
  return L ? Math.abs(n[2]) / L : 0;
}

/**
 * Scene fit used by the viewer. `pR` is the 82nd-percentile radius (the body of the drawing), `maxR` the true extent.
 * The body fills the card (36% of width, 44-50% of height) but the scale is also capped so that outliers (an actor
 * waiting off to one side) never travel more than ~25% past the card edge, so nothing important clips.
 */
export function fitScale(W: number, H: number, pR: number, maxR: number, compact: boolean): number {
  const body = Math.min(W * 0.36, H * (compact ? 0.44 : 0.5)) / (pR || 1);
  const outer = Math.min(W * 0.55, H * 0.62) / (maxR || pR || 1);
  return Math.min(body, outer);
}

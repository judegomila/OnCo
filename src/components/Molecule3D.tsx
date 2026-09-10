"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Mesh, Vec3 as MeshVec3 } from "@/lib/wireframe";
import { Wireframe3D } from "./Wireframe3D";
import {
  apply, chainColour, chainSegments, darken, depthSort, elementColour, elementName, elementsPresent, inferSecondary, lighten, mix,
  normaliseElement, RIBBON_WIDTH, ribbonGeometry, rotation, vdwRadius, type Mol, type Vec3,
} from "@/lib/molecule-render";

export type StructureEntry = { label: string; file: string; note?: string; dim: 2 | 3; source: string; ref: string };
type Style = "solid" | "wire";

/** Ball radius in angstroms for an element (a fraction of the van der Waals radius, so bonds stay visible). */
const ballRadius = (el: string) => (normaliseElement(el) === "H" ? 0.26 : 0.2 * vdwRadius(el) + 0.08);
const BOND_WIDTH = 0.2; // angstroms (diameter)
const COIL = RIBBON_WIDTH.C;

type Scene = {
  isProtein: boolean;
  centre: Vec3; radius: number;
  atoms: Array<{ p: Vec3; el: string; r: number; isH: boolean; lig: boolean }>;
  bonds: Array<{ a: number; b: number; order: number }>;
  /** Flattened ribbon spline: positions, normals, half-widths, and per point the chain index. */
  rib: { P: Float64Array; N: Float64Array; W: Float64Array; chain: Int16Array; segStart: Int32Array; count: number };
  chains: string[]; elements: string[]; hasH: boolean; hasLigand: boolean; residues: number;
};

function buildScene(mol: Mol, isProtein: boolean): Scene {
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
function toMesh(mol: Mol, isProtein: boolean, showH: boolean): Mesh {
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

const themeOf = () => { const t = document.documentElement.dataset.theme; return t === "dark" || t === "contrast" ? true : t === "light" ? false : window.matchMedia("(prefers-color-scheme: dark)").matches; };

/**
 * Ball-and-stick model of a small molecule, or a smooth backbone ribbon (with the bound drug in ball-and-stick)
 * for a protein, drawn on a plain canvas: CPK colours, shaded spheres, depth-sorted cylinders, gentle auto-rotation,
 * drag to rotate, light or dark card. `compact` is the thumbnail form: canvas only, 30 fps, no controls.
 * Structures are the self-hosted snapshots under public/structures; no runtime calls to external services.
 */
export function Molecule3D({ entry, compact = false, height = "h-64 sm:h-80", className = "" }: { entry: StructureEntry; compact?: boolean; height?: string; className?: string }) {
  // The loaded snapshot is tagged with its file name so a changed entry never shows a stale molecule.
  const [loaded, setLoaded] = useState<{ file: string; mol: Mol | null; err: boolean } | null>(null);
  const [style, setStyle] = useState<Style>("solid");
  const [showH, setShowH] = useState(false);
  const [playing, setPlaying] = useState(true);
  const isProtein = entry.source === "pdb";
  const mol = loaded?.file === entry.file ? loaded.mol : null;
  const err = loaded?.file === entry.file ? loaded.err : false;

  useEffect(() => {
    let alive = true;
    const file = entry.file;
    fetch(`/structures/${file}`).then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); }).then((m: Mol) => { if (alive) setLoaded({ file, mol: m, err: false }); }).catch(() => { if (alive) setLoaded({ file, mol: null, err: true }); });
    return () => { alive = false; };
  }, [entry.file]);

  const scene = useMemo(() => (mol ? buildScene(mol, isProtein) : null), [mol, isProtein]);
  const mesh = useMemo(() => (mol && style === "wire" ? toMesh(mol, isProtein, showH) : null), [mol, isProtein, style, showH]);

  const canvasEl = style === "wire" && mesh
    ? <Wireframe3D mesh={mesh} height={compact ? className : height} compact={compact} speed={0.3} />
    : <SolidCanvas scene={scene} compact={compact} className={compact ? `block w-full ${className}` : `block w-full ${height}`} showH={showH} playing={playing} label={entry.label} />;

  if (compact) return canvasEl;

  const pdbId = isProtein ? entry.file.replace(/^pdb-|\.json$/g, "") : "";
  const what = isProtein ? (style === "wire" ? "Backbone trace" : "Backbone ribbon") : (style === "wire" ? "Wireframe" : "Ball-and-stick model");
  const from = isProtein ? `from PDB ${pdbId}` : entry.dim === 2 ? "from PubChem 2D record (no 3D conformer available)" : "from PubChem 3D conformer";

  return (
    <div>
      <div className="relative bg-gradient-to-b from-foreground/[0.03] to-transparent">
        {canvasEl}
        {!mol && !err && <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">Loading structure</div>}
        {err && <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">Structure unavailable.</div>}
      </div>
      <div className="px-3 py-2 border-t border-border flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
        <span className="inline-flex rounded-md border border-border overflow-hidden" role="group" aria-label="Drawing style">
          {([["solid", isProtein ? "Ribbon" : "Ball and stick"], ["wire", "Wireframe"]] as Array<[Style, string]>).map(([v, l]) => (
            <button key={v} type="button" onClick={() => setStyle(v)} aria-pressed={style === v} className={`px-2 py-0.5 ${style === v ? "bg-foreground text-background" : "bg-card hover:bg-foreground/5"}`}>{l}</button>
          ))}
        </span>
        {!isProtein && scene?.hasH && <button type="button" onClick={() => setShowH((h) => !h)} aria-pressed={showH} className={`chip border ${showH ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-foreground/5"}`}>Hydrogens</button>}
        {style === "solid" && <button type="button" onClick={() => setPlaying((p) => !p)} aria-pressed={!playing} className="chip border border-border bg-card hover:bg-foreground/5">{playing ? "Pause" : "Play"}</button>}
        {style === "solid" && <span className="text-muted hidden sm:inline">Drag to rotate</span>}
        {scene && <Legend scene={scene} showH={showH} />}
      </div>
      <p className="px-3 pb-2 text-xs text-muted">
        {what} {from}. <a className="underline" href={entry.ref} rel="noopener">{isProtein ? `RCSB PDB ${pdbId}` : "PubChem record"}</a>
        {isProtein && style === "solid" && ". The ribbon widens where the chain is folded into a regular pattern and narrows where it is a loose loop."}
      </p>
    </div>
  );
}

function Legend({ scene, showH }: { scene: Scene; showH: boolean }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const update = () => setDark(themeOf());
    update();
    const mo = new MutationObserver(update); mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);
  const dot = (colour: string) => <i aria-hidden className="inline-block h-2.5 w-2.5 rounded-full border border-black/10 align-[-1px] mr-1" style={{ background: colour }} />;
  if (scene.isProtein) {
    return (
      <span className="ml-auto flex flex-wrap items-center gap-x-2.5 gap-y-1 text-muted">
        {scene.chains.map((c) => <span key={c}>{dot(chainColour(scene.chains, c, dark))}Chain {c}</span>)}
        {scene.hasLigand && <span>{dot(dark ? "#f472b6" : "#d6336c")}Bound drug</span>}
      </span>
    );
  }
  const els = scene.elements.filter((e) => e !== "H" || showH);
  return (
    <span className="ml-auto flex flex-wrap items-center gap-x-2.5 gap-y-1 text-muted">
      {els.map((e) => <span key={e}>{dot(elementColour(e))}{elementName(e)}</span>)}
    </span>
  );
}

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

function SolidCanvas({ scene, compact, className, showH, playing, label }: { scene: Scene | null; compact: boolean; className: string; showH: boolean; playing: boolean; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const st = useRef({ showH, playing, yaw: 0, seeded: false, pitchOff: 0, dragging: false, lastX: 0, lastY: 0, resumeAt: 0, lastTime: 0 });
  const redraw = useRef<(() => void) | null>(null);
  useEffect(() => { st.current.showH = showH; st.current.playing = playing; redraw.current?.(); }, [showH, playing]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !scene) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s0 = st.current;
    if (!s0.seeded) { s0.yaw = Math.random() * Math.PI * 2; s0.seeded = true; } // thumbnails in a grid start at different angles
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dark = themeOf();
    let bg = dark ? "#1a201e" : "#fcfbf8";
    let sprites = new Map<string, HTMLCanvasElement>();
    let colourTables = new Map<string, Tables>();
    const table = (base: string) => { let t = colourTables.get(base); if (!t) { t = tables(base, bg); colourTables.set(base, t); } return t; };
    const retheme = () => { dark = themeOf(); bg = dark ? "#1a201e" : "#fcfbf8"; sprites = new Map(); colourTables = new Map(); if (reduced) draw(performance.now()); };
    const mo = new MutationObserver(retheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", retheme);

    const sprite = (col: string, r: number, dpr: number) => {
      const key = `${col}|${r}|${dpr}`;
      let c = sprites.get(key);
      if (c) return c;
      if (sprites.size > 800) sprites.clear();
      const size = Math.ceil((r * 2 + 3) * dpr);
      c = document.createElement("canvas"); c.width = size; c.height = size;
      const g = c.getContext("2d")!;
      g.scale(dpr, dpr);
      const cx = size / dpr / 2;
      const grad = g.createRadialGradient(cx - r * 0.34, cx - r * 0.36, r * 0.04, cx, cx, r);
      grad.addColorStop(0, lighten(col, 0.75)); grad.addColorStop(0.28, lighten(col, 0.25)); grad.addColorStop(0.7, col); grad.addColorStop(1, darken(col, 0.42));
      g.fillStyle = grad; g.beginPath(); g.arc(cx, cx, r, 0, Math.PI * 2); g.fill();
      g.strokeStyle = darken(col, 0.55); g.globalAlpha = 0.3; g.lineWidth = Math.min(1, r * 0.12); g.stroke();
      sprites.set(key, c);
      return c;
    };

    const { atoms, bonds, rib, chains, centre, radius, isProtein } = scene;
    const nA = atoms.length, nB = bonds.length, nR = rib.segStart.length;
    // Camera-space scratch buffers.
    const AX = new Float64Array(nA), AY = new Float64Array(nA), AZ = new Float64Array(nA), AF = new Float64Array(nA);
    const RX = new Float64Array(rib.count), RY = new Float64Array(rib.count), RZ = new Float64Array(rib.count), RF = new Float64Array(rib.count);
    const NX = new Float64Array(rib.count), NY = new Float64Array(rib.count), NZ = new Float64Array(rib.count);
    // Draw items: kind 0 atom, 1 bond, 2 ribbon quad; depth refreshed each frame then painter-sorted.
    const items: Array<{ kind: 0 | 1 | 2; i: number; d: number }> = [];
    for (let i = 0; i < nA; i++) items.push({ kind: 0, i, d: 0 });
    for (let i = 0; i < nB; i++) items.push({ kind: 1, i, d: 0 });
    for (let i = 0; i < nR; i++) items.push({ kind: 2, i, d: 0 });
    const accent = () => (dark ? "#f472b6" : "#d6336c");
    const atomBase = (k: number) => (atoms[k].lig && atoms[k].el === "C" ? accent() : elementColour(atoms[k].el));
    const fogLevel = (z: number) => Math.max(0, Math.min(7, Math.round((1 - (z / radius + 1) / 2) * 7)));

    const D = radius * 3.6; // camera distance for a mild perspective
    const draw = (time: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = canvas.clientWidth, H = canvas.clientHeight;
      if (!W || !H) return;
      if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) { canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const dt = s0.lastTime ? Math.min(0.1, (time - s0.lastTime) / 1000) : 0;
      s0.lastTime = time;
      if (s0.playing && !s0.dragging && time > s0.resumeAt && !reduced) s0.yaw += dt * (compact ? 0.3 : 0.35);
      const pitch = 0.35 + s0.pitchOff + (reduced ? 0 : Math.sin((time / 1000) * 0.15) * 0.15);
      const m = rotation(s0.yaw, pitch);
      const sc = (Math.min(W, H) * (compact ? 0.46 : 0.42)) / radius;
      const showH = s0.showH && !compact;
      const chainCols = chains.map((c) => chainColour(chains, c, dark));

      // Project atoms.
      for (let k = 0; k < nA; k++) {
        const p = atoms[k].p;
        const q = apply(m, [p[0] - centre[0], p[1] - centre[1], p[2] - centre[2]]);
        const f = D / (D - q[2]);
        AX[k] = W / 2 + q[0] * sc * f; AY[k] = H / 2 - q[1] * sc * f; AZ[k] = q[2]; AF[k] = f;
      }
      // Project ribbon points and rotate their normals.
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
          const fl = fogLevel(AZ[it.i]);
          const col = table(atomBase(it.i)).fog[fl];
          const r = Math.max(compact ? 1.4 : 1.8, Math.round(a.r * sc * AF[it.i] * sizeBoost * 2) / 2);
          const sp = sprite(col, r, dpr);
          const w = sp.width / dpr;
          ctx.drawImage(sp, AX[it.i] - w / 2, AY[it.i] - w / 2, w, w);
        } else if (it.kind === 1) {
          const b = bonds[it.i];
          const A = atoms[b.a], B = atoms[b.b];
          if ((A.isH || B.isH) && !showH) continue;
          const fl = fogLevel(it.d);
          const ca = table(atomBase(b.a)).fog[fl], cb = table(atomBase(b.b)).fog[fl];
          const f = (AF[b.a] + AF[b.b]) / 2;
          const w = Math.max(compact ? 1 : 1.3, BOND_WIDTH * sc * f * sizeBoost * (A.isH || B.isH ? 0.7 : 1));
          const x0 = AX[b.a], y0 = AY[b.a], x1 = AX[b.b], y1 = AY[b.b];
          const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, px = -dy / L, py = dx / L;
          const lanes = b.order === 3 ? [-1.15, 0, 1.15] : b.order === 2 ? [-0.62, 0.62] : [0];
          const lw = b.order === 3 ? w * 0.5 : b.order === 2 ? w * 0.62 : w;
          for (const lane of lanes) {
            const ox = px * lane * w, oy = py * lane * w;
            const mx = (x0 + x1) / 2 + ox, my = (y0 + y1) / 2 + oy;
            // Dark outline gives the cylinder an edge, then each half in its atom's colour, then a soft highlight.
            ctx.strokeStyle = darken(mix(ca, cb, 0.5), 0.4); ctx.lineWidth = lw + 1.1;
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
          const corner = (i: number, out: [number, number, number, number]) => {
            const prev = i > 0 && rib.chain[i - 1] === rib.chain[i] ? i - 1 : i, next = i + 1 < rib.count && rib.chain[i + 1] === rib.chain[i] ? i + 1 : i;
            const tx = RX[next] - RX[prev], ty = RY[next] - RY[prev], tl = Math.hypot(tx, ty) || 1;
            const perpX = -ty / tl, perpY = tx / tl;
            const nx = NX[i], ny = -NY[i], nl = Math.hypot(nx, ny);
            const k = Math.max(0, Math.min(1, (rib.W[i] - COIL) / 0.5)); // 0 coil (tube), 1 flat ribbon
            let dx = perpX, dy = perpY;
            if (nl > 0.05 && k > 0) {
              const sgn = nx * perpX + ny * perpY < 0 ? -1 : 1;
              dx = perpX * (1 - k) + (sgn * nx / nl) * k; dy = perpY * (1 - k) + (sgn * ny / nl) * k;
              const dl = Math.hypot(dx, dy) || 1; dx /= dl; dy /= dl;
            }
            const hw = Math.max(COIL * 0.85, COIL * (1 - k) + rib.W[i] * Math.max(nl, 0.18) * k) * sc * RF[i];
            out[0] = RX[i] + dx * hw; out[1] = RY[i] + dy * hw; out[2] = RX[i] - dx * hw; out[3] = RY[i] - dy * hw;
          };
          const c0: [number, number, number, number] = [0, 0, 0, 0], c1: [number, number, number, number] = [0, 0, 0, 0];
          corner(g, c0); corner(h, c1);
          const k = Math.max(0, Math.min(1, (rib.W[g] - COIL) / 0.5));
          const facing = Math.abs(NZ[g]);
          const shade = (1 - k) * 0.85 + k * (0.55 + 0.45 * facing); // 0..1 → table index
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
    };
    redraw.current = () => draw(performance.now());

    // Drag to rotate (full mode only; thumbnails sit inside links and buttons). Auto-rotation resumes after 2.5 s.
    const onDown = (e: PointerEvent) => { if (compact) return; s0.dragging = true; s0.lastX = e.clientX; s0.lastY = e.clientY; canvas.setPointerCapture(e.pointerId); };
    const onMove = (e: PointerEvent) => {
      if (!s0.dragging) return;
      s0.yaw += (e.clientX - s0.lastX) * 0.01;
      s0.pitchOff = Math.max(-1.2, Math.min(1.2, s0.pitchOff + (e.clientY - s0.lastY) * 0.01));
      s0.lastX = e.clientX; s0.lastY = e.clientY; s0.resumeAt = performance.now() + 2500;
      if (reduced) draw(performance.now());
    };
    const onUp = (e: PointerEvent) => { if (!s0.dragging) return; s0.dragging = false; s0.resumeAt = performance.now() + 2500; try { canvas.releasePointerCapture(e.pointerId); } catch { /* already released */ } };
    canvas.addEventListener("pointerdown", onDown); canvas.addEventListener("pointermove", onMove); canvas.addEventListener("pointerup", onUp); canvas.addEventListener("pointercancel", onUp);

    let raf = 0, visible = true, last = 0;
    const minGap = compact || isProtein ? 1000 / 30 : 0;
    const loop = (time: number) => {
      if (!visible) return;
      if (time - last >= minGap) { draw(time); last = time; }
      if (!reduced) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); } }, { threshold: 0.05 });
    io.observe(canvas);
    const ro = new ResizeObserver(() => { if (reduced) draw(performance.now()); });
    ro.observe(canvas);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); mo.disconnect(); mq.removeEventListener("change", retheme); redraw.current = null;
      canvas.removeEventListener("pointerdown", onDown); canvas.removeEventListener("pointermove", onMove); canvas.removeEventListener("pointerup", onUp); canvas.removeEventListener("pointercancel", onUp);
    };
  }, [scene, compact]);

  return <canvas ref={ref} className={`${className} ${compact ? "" : "cursor-grab active:cursor-grabbing touch-none"}`} aria-label={scene?.isProtein ? `${label}: backbone ribbon, drag to rotate` : `${label}: ball-and-stick model, drag to rotate`} />;
}


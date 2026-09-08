"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type StructureEntry = { label: string; file: string; note?: string; dim: 2 | 3; source: string; ref: string };
/** atoms: [x, y, z, element, chain?, role?]; role "ca" backbone, "lig" bound ligand, "pkt" pocket residue atoms. */
type Atom = [number, number, number, string] | [number, number, number, string, string, string];
type Mol = { atoms: Atom[]; bonds: Array<[number, number, number]>; dim: 2 | 3; name: string; chains?: string[]; ligands?: string[] };

type Style = "wire" | "ball";
type Colour = "element" | "mono" | "pharma";

const CPK: Record<string, string> = { C: "#9ca3af", N: "#3b82f6", O: "#ef4444", S: "#eab308", F: "#22c55e", Cl: "#16a34a", Br: "#b45309", I: "#7c3aed", P: "#f97316", Pt: "#94a3b8", Lu: "#0ea5e9", Ga: "#0ea5e9", B: "#f59e0b", Se: "#d97706", H: "#e5e7eb" };
const CHAIN_COLOURS = ["#38bdf8", "#a78bfa", "#34d399", "#f472b6", "#fbbf24", "#60a5fa", "#fb7185", "#4ade80"];
const HALOGEN = new Set(["F", "Cl", "Br", "I"]);

/**
 * Molecule / protein-backbone viewer: slowly rotating wireframe drawn on a canvas, with a small toolbar.
 * Interaction: pause/play, drag to rotate (auto-rotation resumes after a pause), wheel to zoom, hydrogens on/off,
 * colour by element / monochrome / pharmacophore, wireframe or ball-and-stick. Protein entries colour by chain,
 * show a bound ligand in red and the pocket residues within 5 Å as a thin cage.
 * Self-hosted JSON (see scripts/fetch-structures.ts); no runtime calls to external services.
 * Respects prefers-reduced-motion (static frame) and pauses when off-screen.
 */
export function MoleculeViewer({ entries }: { entries: StructureEntry[] }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [style, setStyle] = useState<Style>("wire");
  const [colour, setColour] = useState<Colour>("element");
  const [showH, setShowH] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [info, setInfo] = useState<{ hasH: boolean; chains: string[]; ligands: string[]; hasPocket: boolean } | null>(null);
  const entry = entries[i];
  const isProtein = entry.source === "pdb";

  return (
    <div className="card overflow-hidden">
      <Canvas key={entry.file} file={entry.file} isProtein={isProtein} playing={playing} style={style} colour={colour} showH={showH} zoom={zoom} onZoom={setZoom} onInfo={setInfo} />
      <div className="px-3 py-2 border-t border-border flex flex-wrap items-center gap-1.5 text-xs">
        <button type="button" onClick={() => setPlaying((p) => !p)} className="chip border border-border bg-card hover:bg-foreground/5" aria-pressed={!playing}>{playing ? "❚❚ pause" : "▶ play"}</button>
        <span className="text-muted hidden sm:inline">· drag to rotate · wheel to zoom</span>
        <span className="mx-1 text-border">|</span>
        <Seg value={style} onChange={(v) => setStyle(v as Style)} options={[["wire", "Wireframe"], ["ball", "Ball & stick"]]} />
        {!isProtein && <Seg value={colour} onChange={(v) => setColour(v as Colour)} options={[["element", "Element"], ["mono", "Mono"], ["pharma", "Pharmacophore"]]} />}
        {!isProtein && <button type="button" onClick={() => setShowH((h) => !h)} disabled={info ? !info.hasH : false} title={info && !info.hasH ? "This record has no hydrogen coordinates" : "Toggle hydrogens"} className={`chip border ${showH ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-foreground/5"} disabled:opacity-40`}>H</button>}
        {isProtein && info && info.chains.length > 0 && <span className="text-muted">chains: {info.chains.map((c, k) => <span key={c} style={{ color: CHAIN_COLOURS[k % CHAIN_COLOURS.length] }} className="font-semibold ml-1">{c}</span>)}</span>}
        {isProtein && info && info.ligands.length > 0 && <span className="text-muted">· <span className="text-accent font-semibold">ligand</span> {info.ligands.join(", ")}{info.hasPocket && " · pocket cage ≤5 Å"}</span>}
        <button type="button" onClick={() => setZoom(1)} className="ml-auto chip border border-border bg-card hover:bg-foreground/5">reset</button>
      </div>
      <div className="px-4 py-3 border-t border-border text-sm">
        {entries.length > 1 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {entries.map((e, k) => (
              <button key={e.file + k} type="button" onClick={() => setI(k)} className={`chip border ${k === i ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-foreground/5"}`}>{e.label}</button>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="font-medium">{entry.label}{entry.dim === 2 && <span className="text-muted font-normal"> · 2D coordinates (no PubChem conformer)</span>}</div>
          <a className="underline text-muted text-xs" href={entry.ref} rel="noopener">{isProtein ? "RCSB PDB" : "PubChem"}</a>
        </div>
        {entry.note && <p className="text-xs text-muted mt-1">{entry.note}</p>}
        {!isProtein && colour === "pharma" && <p className="text-xs text-muted mt-1">Pharmacophore colours: <span className="text-violet-500 font-medium">aromatic rings</span>, <span className="text-emerald-600 font-medium">halogens</span>, <span className="text-blue-500 font-medium">N</span> and <span className="text-red-500 font-medium">O</span> as hydrogen-bond donors/acceptors, grey carbon scaffold.</p>}
      </div>
    </div>
  );
}

function Seg({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: Array<[string, string]> }) {
  return (
    <span className="inline-flex rounded-md border border-border overflow-hidden">
      {options.map(([v, l]) => <button key={v} type="button" onClick={() => onChange(v)} className={`px-2 py-0.5 ${value === v ? "bg-foreground text-background" : "bg-card hover:bg-foreground/5"}`}>{l}</button>)}
    </span>
  );
}

/** Six-membered rings of C/N atoms, found by bounded DFS; used to approximate aromatic systems. */
function sixRings(nAtoms: number, bonds: Array<[number, number, number]>, els: string[]): Set<number> {
  const adj: number[][] = Array.from({ length: nAtoms }, () => []);
  for (const [a, b] of bonds) { adj[a].push(b); adj[b].push(a); }
  const out = new Set<number>();
  const ok = (i: number) => (els[i] === "C" || els[i] === "N") && adj[i].length <= 3;
  for (let start = 0; start < nAtoms; start++) {
    if (!ok(start)) continue;
    const stack: Array<[number, number[]]> = [[start, [start]]];
    while (stack.length) {
      const [cur, path] = stack.pop()!;
      for (const nb of adj[cur]) {
        if (path.length === 6 && nb === start) { path.forEach((x) => out.add(x)); continue; }
        if (path.length < 6 && !path.includes(nb) && ok(nb) && nb > start) stack.push([nb, [...path, nb]]);
      }
    }
  }
  return out;
}

function Canvas({ file, isProtein, playing, style, colour, showH, zoom, onZoom, onInfo }: {
  file: string; isProtein: boolean; playing: boolean; style: Style; colour: Colour; showH: boolean; zoom: number; onZoom: (z: number) => void;
  onInfo: (i: { hasH: boolean; chains: string[]; ligands: string[]; hasPocket: boolean }) => void;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [mol, setMol] = useState<Mol | null>(null);
  const [err, setErr] = useState(false);
  // Mutable render state read by the animation loop (so toggles do not restart it).
  const st = useRef({ playing, style, colour, showH, zoom, ang: 0, tiltOff: 0, dragging: false, lastX: 0, lastY: 0, resumeAt: 0, lastTime: 0 });
  const onZoomRef = useRef(onZoom);
  const onInfoRef = useRef(onInfo);
  useEffect(() => { st.current.playing = playing; st.current.style = style; st.current.colour = colour; st.current.showH = showH; st.current.zoom = zoom; onZoomRef.current = onZoom; onInfoRef.current = onInfo; }, [playing, style, colour, showH, zoom, onZoom, onInfo]);

  useEffect(() => {
    let alive = true;
    fetch(`/structures/${file}`).then((r) => r.json()).then((m: Mol) => { if (alive) setMol(m); }).catch(() => setErr(true));
    return () => { alive = false; };
  }, [file]);

  const derived = useMemo(() => {
    if (!mol) return null;
    const els = mol.atoms.map((a) => a[3]);
    const rings = isProtein ? new Set<number>() : sixRings(mol.atoms.length, mol.bonds, els);
    const chains = mol.chains ?? [...new Set(mol.atoms.map((a) => a[4]).filter((c): c is string => !!c))];
    return { els, rings, chains, hasH: els.includes("H"), ligands: mol.ligands ?? [], hasPocket: mol.atoms.some((a) => a[5] === "pkt") };
  }, [mol, isProtein]);

  useEffect(() => { if (derived) onInfoRef.current({ hasH: derived.hasH, chains: derived.chains, ligands: derived.ligands, hasPocket: derived.hasPocket }); }, [derived]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !mol || !derived) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { els, rings, chains } = derived;

    // Centre on the ligand if present (so the pocket is in view), else on all heavy atoms.
    const focus = mol.atoms.filter((a) => a[5] === "lig");
    const centreSet = focus.length ? focus : mol.atoms.filter((a) => a[3] !== "H");
    const c = [0, 0, 0];
    for (const a of centreSet) { c[0] += a[0]; c[1] += a[1]; c[2] += a[2]; }
    c[0] /= centreSet.length || 1; c[1] /= centreSet.length || 1; c[2] /= centreSet.length || 1;
    let maxR = 0;
    const pts = mol.atoms.map((a) => { const p = [a[0] - c[0], a[1] - c[1], a[2] - c[2]]; return p; });
    // Radius: if a ligand is present, fit the pocket region (ligand + pocket atoms) rather than the whole protein.
    const fitSet = focus.length ? mol.atoms.map((a, k) => (a[5] === "lig" || a[5] === "pkt" ? k : -1)).filter((k) => k >= 0) : pts.map((_, k) => k);
    for (const k of fitSet) maxR = Math.max(maxR, Math.hypot(pts[k][0], pts[k][1], pts[k][2]));
    if (focus.length) maxR *= 1.6; // show some backbone context around the pocket
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const base = dark ? "226, 232, 240" : "22, 24, 29";
    const accentHex = dark ? "#f87171" : "#b91c1c";

    let raf = 0, visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loop(performance.now()); }, { threshold: 0.05 });
    io.observe(canvas);

    // Interaction: drag rotates; wheel zooms; auto-rotation resumes 2.5 s after the last drag.
    const s0 = st.current;
    const down = (x: number, y: number) => { s0.dragging = true; s0.lastX = x; s0.lastY = y; };
    const move = (x: number, y: number) => { if (!s0.dragging) return; s0.ang += (x - s0.lastX) * 0.01; s0.tiltOff = Math.max(-1.2, Math.min(1.2, s0.tiltOff + (y - s0.lastY) * 0.01)); s0.lastX = x; s0.lastY = y; s0.resumeAt = performance.now() + 2500; if (reduced) draw(performance.now()); };
    const up = () => { s0.dragging = false; };
    const onMouseDown = (e: MouseEvent) => down(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => move(e.clientX, e.clientY);
    const onTouchStart = (e: TouchEvent) => { if (e.touches[0]) down(e.touches[0].clientX, e.touches[0].clientY); };
    const onTouchMove = (e: TouchEvent) => { if (e.touches[0]) { move(e.touches[0].clientX, e.touches[0].clientY); if (s0.dragging) e.preventDefault(); } };
    const onWheel = (e: WheelEvent) => { e.preventDefault(); const z = Math.max(0.4, Math.min(4, s0.zoom * (e.deltaY > 0 ? 0.9 : 1.1))); s0.zoom = z; onZoomRef.current(z); if (reduced) draw(performance.now()); };
    canvas.addEventListener("mousedown", onMouseDown); window.addEventListener("mousemove", onMouseMove); window.addEventListener("mouseup", up);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true }); canvas.addEventListener("touchmove", onTouchMove, { passive: false }); canvas.addEventListener("touchend", up);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    const chainColour = (ch?: string) => CHAIN_COLOURS[Math.max(0, chains.indexOf(ch ?? "")) % CHAIN_COLOURS.length];
    const atomColour = (k: number) => {
      const el = els[k];
      if (isProtein) { const role = mol.atoms[k][5]; return role === "lig" ? accentHex : role === "pkt" ? (dark ? "#94a3b8" : "#64748b") : chainColour(mol.atoms[k][4]); }
      if (s0.colour === "mono") return dark ? "#e2e8f0" : "#16181d";
      if (s0.colour === "pharma") { if (rings.has(k)) return "#a855f7"; if (HALOGEN.has(el)) return "#059669"; if (el === "N") return "#3b82f6"; if (el === "O") return "#ef4444"; return "#9ca3af"; }
      return CPK[el] ?? "#a855f7";
    };

    const draw = (time: number) => {
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.clientWidth, H = canvas.clientHeight;
      if (canvas.width !== W * dpr || canvas.height !== H * dpr) { canvas.width = W * dpr; canvas.height = H * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      // Advance auto-rotation only when playing and not being dragged.
      const dt = s0.lastTime ? Math.min(0.1, (time - s0.lastTime) / 1000) : 0;
      s0.lastTime = time;
      if (s0.playing && !s0.dragging && time > s0.resumeAt && !reduced) s0.ang += dt * 0.35;
      const sc = (Math.min(W, H) * 0.42 * s0.zoom) / (maxR || 1);
      const ay = s0.ang;
      const ax = 0.35 + s0.tiltOff + (reduced ? 0 : Math.sin(time / 1000 * 0.15) * 0.15);
      const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
      const proj = pts.map(([x, y, z]) => {
        const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
        const y2 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;
        return [W / 2 + x1 * sc, H / 2 - y2 * sc, z2 / (maxR || 1)] as const;
      });
      const hide = (k: number) => !isProtein && !s0.showH && els[k] === "H";
      const ball = s0.style === "ball";

      // Bonds back to front, depth-faded.
      const order = mol.bonds.map((b, k) => [k, (proj[b[0]][2] + proj[b[1]][2]) / 2] as const).sort((a, b) => a[1] - b[1]);
      for (const [k] of order) {
        const [a, b, ord] = mol.bonds[k];
        if (hide(a) || hide(b)) continue;
        const pa = proj[a], pb = proj[b];
        const depth = Math.max(-1, Math.min(1, (pa[2] + pb[2]) / 2));
        const t = (depth + 1) / 2;
        const role = mol.atoms[a][5];
        if (isProtein) {
          const isLig = role === "lig", isPkt = role === "pkt";
          const col = isLig ? accentHex : isPkt ? (dark ? "148, 163, 184" : "100, 116, 139") : chainColour(mol.atoms[a][4]);
          const alpha = isLig ? 0.6 + 0.4 * t : isPkt ? 0.15 + 0.3 * t : 0.3 + 0.6 * t;
          ctx.strokeStyle = isLig ? hexA(accentHex, alpha) : isPkt ? `rgba(${col}, ${alpha.toFixed(3)})` : hexA(col, alpha);
          ctx.lineWidth = isLig ? 1.8 + 1.2 * t : isPkt ? 0.6 + 0.4 * t : 1.2 + 0.8 * t;
          ctx.beginPath(); ctx.moveTo(pa[0], pa[1]); ctx.lineTo(pb[0], pb[1]); ctx.stroke();
          continue;
        }
        const alpha = 0.25 + 0.65 * t;
        if (ball || s0.colour !== "mono") {
          // Half-bonds coloured by each atom.
          const mx = (pa[0] + pb[0]) / 2, my = (pa[1] + pb[1]) / 2;
          ctx.lineWidth = (ball ? 2.6 : ord >= 2 ? 2.2 : 1.3) + 0.6 * t;
          ctx.strokeStyle = hexA(atomColour(a), alpha); ctx.beginPath(); ctx.moveTo(pa[0], pa[1]); ctx.lineTo(mx, my); ctx.stroke();
          ctx.strokeStyle = hexA(atomColour(b), alpha); ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(pb[0], pb[1]); ctx.stroke();
        } else {
          ctx.strokeStyle = `rgba(${base}, ${alpha.toFixed(3)})`;
          ctx.lineWidth = (ord >= 2 ? 2.2 : 1.3) + 0.6 * t;
          ctx.beginPath(); ctx.moveTo(pa[0], pa[1]); ctx.lineTo(pb[0], pb[1]); ctx.stroke();
        }
        if (!ball && ord >= 2) {
          const dx = pb[0] - pa[0], dy = pb[1] - pa[1], L = Math.hypot(dx, dy) || 1, ox = (-dy / L) * 2.4, oy = (dx / L) * 2.4;
          ctx.strokeStyle = `rgba(${base}, ${(alpha * 0.8).toFixed(3)})`; ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(pa[0] + ox, pa[1] + oy); ctx.lineTo(pb[0] + ox, pb[1] + oy); ctx.stroke();
        }
      }
      // Atoms (small molecules and ligands): dots or balls.
      const atomOrder = mol.atoms.map((_, k) => k).sort((a, b) => proj[a][2] - proj[b][2]);
      for (const k of atomOrder) {
        if (hide(k)) continue;
        const role = mol.atoms[k][5];
        if (isProtein && role !== "lig") continue;
        const el = els[k];
        const p = proj[k];
        const t = Math.max(0, Math.min(1, (p[2] + 1) / 2));
        const r = ball ? (el === "H" ? 2.2 : 4.2) * (0.7 + 0.5 * t) * Math.min(1.6, Math.max(0.6, sc / 18)) : (1.6 + 1.6 * t + (el === "C" || el === "H" ? 0 : 0.8));
        ctx.fillStyle = hexA(atomColour(k), 0.55 + 0.45 * t);
        ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, Math.PI * 2); ctx.fill();
        if (ball) { ctx.strokeStyle = `rgba(${base}, ${(0.35 * t).toFixed(3)})`; ctx.lineWidth = 0.6; ctx.stroke(); }
      }
    };

    const loop = (time: number) => {
      if (!visible) return;
      draw(time);
      if (!reduced) raf = requestAnimationFrame(loop);
    };
    loop(performance.now());
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      canvas.removeEventListener("mousedown", onMouseDown); window.removeEventListener("mousemove", onMouseMove); window.removeEventListener("mouseup", up);
      canvas.removeEventListener("touchstart", onTouchStart); canvas.removeEventListener("touchmove", onTouchMove); canvas.removeEventListener("touchend", up);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, [mol, derived, isProtein]);

  return (
    <div className="relative bg-gradient-to-b from-foreground/[0.03] to-transparent">
      <canvas ref={ref} className="block w-full h-64 sm:h-80 cursor-grab active:cursor-grabbing touch-none" aria-label="Rotating wireframe of the molecule; drag to rotate, scroll to zoom" />
      {!mol && !err && <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">Loading structure…</div>}
      {err && <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">Structure unavailable.</div>}
    </div>
  );
}

function hexA(hex: string, a: number): string {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${Math.max(0, Math.min(1, a)).toFixed(3)})`;
}

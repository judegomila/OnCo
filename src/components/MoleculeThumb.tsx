"use client";

import { useEffect, useRef, useState } from "react";
import structureIndex from "../../public/structures/index.json";
import type { StructureEntry } from "./MoleculeViewer";

const STRUCTURES = structureIndex as Record<string, StructureEntry[]>;
type Mol = { atoms: Array<[number, number, number, string]>; bonds: Array<[number, number, number]>; chains?: string[] };
const CPK: Record<string, string> = { C: "#9ca3af", N: "#3b82f6", O: "#ef4444", S: "#eab308", F: "#22c55e", Cl: "#16a34a", Br: "#b45309", I: "#7c3aed", P: "#f97316", Pt: "#94a3b8", Lu: "#0ea5e9", Ga: "#0ea5e9" };

/** Does this product have a structure to show? */
export function hasMolecule(drugId: string): boolean {
  return !!STRUCTURES[drugId]?.length;
}

/**
 * Tiny slowly rotating wireframe of a product's molecule (first structure entry: the payload for ADCs,
 * the drug itself for small molecules, the antibody backbone for biologics). No toolbar, ~30 fps,
 * pauses off-screen, static under prefers-reduced-motion. Used wherever a drug is mentioned.
 */
export function MoleculeThumb({ drugId, className = "h-24" }: { drugId: string; className?: string }) {
  const entry = STRUCTURES[drugId]?.[0];
  const ref = useRef<HTMLCanvasElement>(null);
  const [mol, setMol] = useState<Mol | null>(null);

  useEffect(() => {
    if (!entry) return;
    let alive = true;
    fetch(`/structures/${entry.file}`).then((r) => r.json()).then((m: Mol) => { if (alive) setMol(m); }).catch(() => {});
    return () => { alive = false; };
  }, [entry]);

  useEffect(() => {
    const canvas = ref.current; if (!canvas || !mol || !entry) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const isProtein = entry.source === "pdb";
    const n = mol.atoms.length;
    const c = [0, 0, 0];
    for (const a of mol.atoms) { c[0] += a[0]; c[1] += a[1]; c[2] += a[2]; }
    c[0] /= n; c[1] /= n; c[2] /= n;
    let maxR = 0;
    const pts = mol.atoms.map((a) => { const p = [a[0] - c[0], a[1] - c[1], a[2] - c[2]]; maxR = Math.max(maxR, Math.hypot(p[0], p[1], p[2])); return p; });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dark = document.documentElement.dataset.theme === "dark" || (!document.documentElement.dataset.theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const base = dark ? "226, 232, 240" : "22, 24, 29";
    let raf = 0, visible = true, last = 0;
    const t0 = performance.now() + Math.random() * 4000;
    const draw = (time: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = canvas.clientWidth, H = canvas.clientHeight;
      if (!W || !H) return;
      if (canvas.width !== W * dpr || canvas.height !== H * dpr) { canvas.width = W * dpr; canvas.height = H * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      const s = (Math.min(W, H) * 0.44) / (maxR || 1);
      const ay = ((time - t0) / 1000) * 0.3, ax = 0.35 + Math.sin(((time - t0) / 1000) * 0.15) * 0.25;
      const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
      const proj = pts.map(([x, y, z]) => { const x1 = x * cy + z * sy, z1 = -x * sy + z * cy; const y2 = y * cx - z1 * sx, z2 = y * sx + z1 * cx; return [W / 2 + x1 * s, H / 2 - y2 * s, z2 / (maxR || 1)] as const; });
      const order = mol.bonds.map((b, k) => [k, (proj[b[0]][2] + proj[b[1]][2]) / 2] as const).sort((a, b) => a[1] - b[1]);
      for (const [k] of order) {
        const [a, b] = mol.bonds[k]; const pa = proj[a], pb = proj[b]; if (!pa || !pb) continue;
        const d = (pa[2] + pb[2]) / 2;
        ctx.strokeStyle = `rgba(${base}, ${(0.25 + 0.65 * (d + 1) / 2).toFixed(3)})`; ctx.lineWidth = (isProtein ? 0.9 : 1.1) + 0.5 * (d + 1) / 2;
        ctx.beginPath(); ctx.moveTo(pa[0], pa[1]); ctx.lineTo(pb[0], pb[1]); ctx.stroke();
      }
      if (!isProtein) for (let k = 0; k < n; k++) {
        const el = mol.atoms[k][3]; if (el === "H" || el === "C") continue;
        const p = proj[k]; ctx.fillStyle = CPK[el] ?? "#a855f7"; ctx.globalAlpha = 0.6 + 0.4 * (p[2] + 1) / 2;
        ctx.beginPath(); ctx.arc(p[0], p[1], 1.6 + 1.2 * (p[2] + 1) / 2, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
      }
    };
    const loop = (time: number) => { if (!visible) return; if (time - last > 33) { draw(time); last = time; } if (!reduced) raf = requestAnimationFrame(loop); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); } }, { threshold: 0.05 });
    io.observe(canvas);
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [mol, entry]);

  if (!entry) return null;
  return <canvas ref={ref} className={`block w-full ${className}`} aria-label={`${entry.label} wireframe`} />;
}

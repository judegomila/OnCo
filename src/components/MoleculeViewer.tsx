"use client";

import { useEffect, useRef, useState } from "react";

export type StructureEntry = { label: string; file: string; note?: string; dim: 2 | 3; source: string; ref: string };
type Mol = { atoms: Array<[number, number, number, string]>; bonds: Array<[number, number, number]>; dim: 2 | 3; name: string };

const CPK: Record<string, string> = { C: "#9ca3af", N: "#3b82f6", O: "#ef4444", S: "#eab308", F: "#22c55e", Cl: "#16a34a", Br: "#b45309", I: "#7c3aed", P: "#f97316", Pt: "#94a3b8", Lu: "#0ea5e9", Ga: "#0ea5e9", CA: "#b91c1c", H: "#e5e7eb" };

/**
 * Slowly rotating wireframe of a molecule or protein backbone, drawn on a canvas.
 * Self-hosted JSON (see scripts/fetch-structures.ts); no runtime calls to external services.
 * Respects prefers-reduced-motion (renders a static frame) and pauses when off-screen.
 */
export function MoleculeViewer({ entries }: { entries: StructureEntry[] }) {
  const [i, setI] = useState(0);
  const entry = entries[i];
  return (
    <div className="card overflow-hidden">
      <Canvas key={entry.file} file={entry.file} isBackbone={entry.source === "pdb"} />
      <div className="px-4 py-3 border-t border-border text-sm">
        {entries.length > 1 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {entries.map((e, k) => (
              <button key={e.file + k} onClick={() => setI(k)} className={`chip border ${k === i ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-foreground/5"}`}>{e.label}</button>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="font-medium">{entry.label}{entry.dim === 2 && <span className="text-muted font-normal"> · 2D coordinates (no PubChem conformer)</span>}</div>
          <a className="underline text-muted text-xs" href={entry.ref} rel="noopener">{entry.source === "pdb" ? "RCSB PDB" : "PubChem"}</a>
        </div>
        {entry.note && <p className="text-xs text-muted mt-1">{entry.note}</p>}
      </div>
    </div>
  );
}

function Canvas({ file, isBackbone }: { file: string; isBackbone: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [mol, setMol] = useState<Mol | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`/structures/${file}`).then((r) => r.json()).then((m: Mol) => { if (alive) setMol(m); }).catch(() => setErr(true));
    return () => { alive = false; };
  }, [file]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !mol) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Centre and scale once.
    const n = mol.atoms.length;
    const c = [0, 0, 0];
    for (const a of mol.atoms) { c[0] += a[0]; c[1] += a[1]; c[2] += a[2]; }
    c[0] /= n; c[1] /= n; c[2] /= n;
    let maxR = 0;
    const pts = mol.atoms.map((a) => { const p = [a[0] - c[0], a[1] - c[1], a[2] - c[2]]; maxR = Math.max(maxR, Math.hypot(p[0], p[1], p[2])); return p; });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    let raf = 0, visible = true;
    const t0 = performance.now();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loop(performance.now()); }, { threshold: 0.05 });
    io.observe(canvas);

    const draw = (time: number) => {
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.clientWidth, H = canvas.clientHeight;
      if (canvas.width !== W * dpr || canvas.height !== H * dpr) { canvas.width = W * dpr; canvas.height = H * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const s = (Math.min(W, H) * 0.42) / (maxR || 1);
      const ay = ((time - t0) / 1000) * 0.35; // rad/s around Y
      const ax = 0.35 + Math.sin(((time - t0) / 1000) * 0.15) * 0.25; // gentle nod
      const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
      const proj = pts.map(([x, y, z]) => {
        const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
        const y2 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;
        return [W / 2 + x1 * s, H / 2 - y2 * s, z2 / (maxR || 1)] as const;
      });
      // Bonds, back to front, depth-faded.
      const order = mol.bonds.map((b, k) => [k, (proj[b[0]][2] + proj[b[1]][2]) / 2] as const).sort((a, b) => a[1] - b[1]);
      const base = dark ? "226, 232, 240" : "22, 24, 29";
      for (const [k] of order) {
        const [a, b, ord] = mol.bonds[k];
        const pa = proj[a], pb = proj[b];
        const depth = (pa[2] + pb[2]) / 2; // -1 back … 1 front
        const alpha = isBackbone ? 0.35 + 0.55 * (depth + 1) / 2 : 0.25 + 0.65 * (depth + 1) / 2;
        ctx.strokeStyle = `rgba(${base}, ${alpha.toFixed(3)})`;
        ctx.lineWidth = isBackbone ? 1.2 + 0.8 * (depth + 1) / 2 : (ord >= 2 ? 2.2 : 1.3) + 0.6 * (depth + 1) / 2;
        ctx.beginPath(); ctx.moveTo(pa[0], pa[1]); ctx.lineTo(pb[0], pb[1]); ctx.stroke();
        if (!isBackbone && ord >= 2) {
          // second thin line offset for double/triple bonds
          const dx = pb[0] - pa[0], dy = pb[1] - pa[1], L = Math.hypot(dx, dy) || 1, ox = (-dy / L) * 2.4, oy = (dx / L) * 2.4;
          ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(pa[0] + ox, pa[1] + oy); ctx.lineTo(pb[0] + ox, pb[1] + oy); ctx.stroke();
        }
      }
      if (!isBackbone) {
        for (let k = 0; k < n; k++) {
          const el = mol.atoms[k][3];
          if (el === "H") continue;
          const p = proj[k];
          const r = 1.6 + 1.6 * (p[2] + 1) / 2 + (el === "C" ? 0 : 0.8);
          ctx.fillStyle = CPK[el] ?? "#a855f7";
          ctx.globalAlpha = 0.55 + 0.45 * (p[2] + 1) / 2;
          ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 1;
      } else {
        // Mark chain termini softly
        ctx.fillStyle = "#b91c1c"; ctx.globalAlpha = 0.6;
        for (const [a, b] of mol.bonds) { void a; void b; }
        ctx.globalAlpha = 1;
      }
    };

    const loop = (time: number) => {
      if (!visible) return;
      draw(time);
      if (!reduced) raf = requestAnimationFrame(loop);
    };
    loop(performance.now());
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [mol, isBackbone]);

  return (
    <div className="relative bg-gradient-to-b from-foreground/[0.03] to-transparent">
      <canvas ref={ref} className="block w-full h-64 sm:h-72" aria-label="Rotating wireframe of the molecule" />
      {!mol && !err && <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">Loading structure…</div>}
      {err && <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">Structure unavailable.</div>}
    </div>
  );
}

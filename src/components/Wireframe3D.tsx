"use client";

import { useEffect, useRef } from "react";
import type { Mesh } from "@/lib/wireframe";

/**
 * Slowly rotating wireframe schematic on a canvas, in the same visual language as MoleculeViewer:
 * thin depth-faded lines, slow Y rotation with a gentle nod, pause when off-screen, static under
 * prefers-reduced-motion. Segment classes: default structure, "accent" (energy/beam), "hot" (highlight), "soft" (context).
 */
export function Wireframe3D({ mesh, height = "h-64 sm:h-72", speed = 0.3, tilt = 0.35 }: { mesh: Mesh; height?: string; speed?: number; tilt?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pts = mesh.points;
    const n = pts.length;
    if (!n) return;
    const c = [0, 0, 0];
    for (const p of pts) { c[0] += p[0]; c[1] += p[1]; c[2] += p[2]; }
    c[0] /= n; c[1] /= n; c[2] /= n;
    let maxR = 0;
    const local = pts.map((p) => { const q = [p[0] - c[0], p[1] - c[1], p[2] - c[2]]; maxR = Math.max(maxR, Math.hypot(q[0], q[1], q[2])); return q; });
    const labels = (mesh.labels ?? []).map((l) => ({ text: l.text, p: [l.at[0] - c[0], l.at[1] - c[1], l.at[2] - c[2]] }));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const base = dark ? "226, 232, 240" : "22, 24, 29";
    const accent = dark ? "248, 113, 113" : "185, 28, 28";
    const hot = dark ? "251, 191, 36" : "217, 119, 6";

    let raf = 0, visible = true;
    const t0 = performance.now();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loop(performance.now()); }, { threshold: 0.05 });
    io.observe(canvas);

    const project = (time: number, W: number, H: number) => {
      const s = (Math.min(W, H) * 0.42) / (maxR || 1);
      const ay = ((time - t0) / 1000) * speed;
      const ax = tilt + Math.sin(((time - t0) / 1000) * 0.15) * 0.2;
      const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
      const f = ([x, y, z]: number[]) => {
        const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
        const y2 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;
        return [W / 2 + x1 * s, H / 2 - y2 * s, z2 / (maxR || 1)] as const;
      };
      return f;
    };

    const draw = (time: number) => {
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.clientWidth, H = canvas.clientHeight;
      if (canvas.width !== W * dpr || canvas.height !== H * dpr) { canvas.width = W * dpr; canvas.height = H * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const f = project(time, W, H);
      const proj = local.map(f);
      const order = mesh.segments.map((seg, k) => [k, (proj[seg[0]][2] + proj[seg[1]][2]) / 2] as const).sort((a, b) => a[1] - b[1]);
      for (const [k] of order) {
        const [a, b, cls] = mesh.segments[k];
        const pa = proj[a], pb = proj[b];
        const depth = (pa[2] + pb[2]) / 2;
        const t = (depth + 1) / 2; // 0 back … 1 front
        const rgb = cls === "accent" ? accent : cls === "hot" ? hot : base;
        const alpha = cls === "soft" ? 0.12 + 0.28 * t : cls === "accent" || cls === "hot" ? 0.45 + 0.5 * t : 0.25 + 0.6 * t;
        ctx.strokeStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
        ctx.fillStyle = ctx.strokeStyle;
        ctx.lineWidth = (cls === "accent" ? 1.6 : cls === "hot" ? 1.8 : 1.1) + 0.7 * t;
        if (a === b) { ctx.beginPath(); ctx.arc(pa[0], pa[1], 1.4 + 1.6 * t, 0, Math.PI * 2); ctx.fill(); continue; }
        ctx.beginPath(); ctx.moveTo(pa[0], pa[1]); ctx.lineTo(pb[0], pb[1]); ctx.stroke();
      }
      // Labels: leader dot + text, faded by depth, skipped when far behind.
      ctx.font = "11px ui-sans-serif, system-ui, sans-serif";
      ctx.textBaseline = "middle";
      for (const l of labels) {
        const p = f(l.p);
        const t = (p[2] + 1) / 2;
        if (t < 0.25) continue;
        const alpha = 0.35 + 0.65 * t;
        ctx.fillStyle = `rgba(${base}, ${alpha.toFixed(3)})`;
        ctx.beginPath(); ctx.arc(p[0], p[1], 2.2, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = `rgba(${base}, ${(alpha * 0.5).toFixed(3)})`; ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + 10, p[1] - 10); ctx.stroke();
        ctx.fillStyle = dark ? `rgba(15,17,19,${(0.75 * alpha).toFixed(3)})` : `rgba(251,251,250,${(0.8 * alpha).toFixed(3)})`;
        const w = ctx.measureText(l.text).width;
        ctx.fillRect(p[0] + 12, p[1] - 18, w + 6, 15);
        ctx.fillStyle = `rgba(${base}, ${alpha.toFixed(3)})`;
        ctx.fillText(l.text, p[0] + 15, p[1] - 10.5);
      }
    };

    const loop = (time: number) => {
      if (!visible) return;
      draw(time);
      if (!reduced) raf = requestAnimationFrame(loop);
    };
    loop(performance.now());
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [mesh, speed, tilt]);

  return (
    <div className="relative bg-gradient-to-b from-foreground/[0.03] to-transparent">
      <canvas ref={ref} className={`block w-full ${height}`} aria-label="Rotating wireframe schematic" />
    </div>
  );
}

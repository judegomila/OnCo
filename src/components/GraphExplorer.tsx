"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { KIND_META, KINDS, type Kind } from "@/lib/schema";
import type { GraphData } from "@/lib/graph-export";
import { KIND_COLOR } from "@/lib/text";

const HUE: Record<Kind, string> = {
  cancer: "#e11d48", section: "#64748b", technology: "#0284c7", target: "#7c3aed", drug: "#059669", company: "#d97706", institution: "#0d9488",
  pathway: "#c026d3", term: "#71717a", trial: "#4f46e5", pairing: "#ea580c", roadmap: "#0891b2", idea: "#65a30d", collection: "#78716c",
};

type Sim = { x: Float32Array; y: Float32Array; vx: Float32Array; vy: Float32Array };

/**
 * Force-directed explorer of the knowledge graph. Layout runs ~300 ticks then freezes.
 * Wheel to zoom, drag background to pan, click a node to open its page.
 */
export function GraphExplorer({ data }: { data: GraphData }) {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [kinds, setKinds] = useState<Set<Kind>>(new Set(KINDS));
  const [minDegree, setMinDegree] = useState(4);
  const [focus, setFocus] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [hover, setHover] = useState<number | null>(null);
  const view = useRef({ scale: 1, tx: 0, ty: 0 });
  const sim = useRef<Sim | null>(null);
  const tick = useRef(0);
  const raf = useRef(0);

  const adjacency = useMemo(() => {
    const adj: number[][] = data.nodes.map(() => []);
    for (const [a, b] of data.edges) { adj[a].push(b); adj[b].push(a); }
    return adj;
  }, [data]);

  // Visible node set: focus neighbourhood, or degree/kind filter.
  const visible = useMemo(() => {
    const set = new Set<number>();
    if (focus !== null) {
      const fi = data.nodes.findIndex((n) => n.id === focus);
      if (fi >= 0) {
        set.add(fi);
        for (const n of adjacency[fi]) set.add(n);
        for (const n of [...set]) for (const m of adjacency[n]) if (set.size < 220) set.add(m);
      }
    } else {
      data.nodes.forEach((n, i) => { if (n.degree >= minDegree && kinds.has(n.kind)) set.add(i); });
    }
    return set;
  }, [data, adjacency, focus, minDegree, kinds]);

  const visibleEdges = useMemo(() => data.edges.filter(([a, b]) => visible.has(a) && visible.has(b)), [data, visible]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return data.nodes.filter((n) => n.name.toLowerCase().includes(q) || n.id.includes(q)).slice(0, 8);
  }, [data, query]);

  // (Re)initialise simulation when the visible set changes.
  useEffect(() => {
    const n = data.nodes.length;
    const s: Sim = { x: new Float32Array(n), y: new Float32Array(n), vx: new Float32Array(n), vy: new Float32Array(n) };
    const ids = [...visible];
    const R = Math.sqrt(ids.length) * 28 + 40;
    ids.forEach((i, k) => {
      const a = (k / Math.max(1, ids.length)) * Math.PI * 2 * 7.3;
      const r = R * Math.sqrt((k + 1) / ids.length);
      s.x[i] = Math.cos(a) * r; s.y[i] = Math.sin(a) * r;
    });
    sim.current = s;
    tick.current = 0;
    view.current = { scale: 1, tx: 0, ty: 0 };
  }, [visible, data.nodes.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const ids = [...visible];
    const degIn = new Map<number, number>();
    for (const [a, b] of visibleEdges) { degIn.set(a, (degIn.get(a) ?? 0) + 1); degIn.set(b, (degIn.get(b) ?? 0) + 1); }
    const radius = (i: number) => 3 + Math.min(14, Math.sqrt(degIn.get(i) ?? 0) * 1.6);

    const step = () => {
      const s = sim.current!;
      // Grid-based repulsion.
      const cell = 60;
      const grid = new Map<string, number[]>();
      for (const i of ids) { const k = `${Math.floor(s.x[i] / cell)},${Math.floor(s.y[i] / cell)}`; (grid.get(k) ?? grid.set(k, []).get(k)!).push(i); }
      for (const i of ids) {
        const gx = Math.floor(s.x[i] / cell), gy = Math.floor(s.y[i] / cell);
        for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
          const bucket = grid.get(`${gx + dx},${gy + dy}`); if (!bucket) continue;
          for (const j of bucket) {
            if (j === i) continue;
            let ddx = s.x[i] - s.x[j], ddy = s.y[i] - s.y[j];
            let d2 = ddx * ddx + ddy * ddy;
            if (d2 < 1) { ddx = Math.random() - 0.5; ddy = Math.random() - 0.5; d2 = 1; }
            const f = 900 / d2;
            s.vx[i] += ddx * f * 0.02; s.vy[i] += ddy * f * 0.02;
          }
        }
      }
      // Springs.
      for (const [a, b] of visibleEdges) {
        const dx = s.x[b] - s.x[a], dy = s.y[b] - s.y[a];
        const d = Math.hypot(dx, dy) || 1;
        const f = (d - 55) * 0.004;
        s.vx[a] += dx / d * f; s.vy[a] += dy / d * f; s.vx[b] -= dx / d * f; s.vy[b] -= dy / d * f;
      }
      // Centre gravity + integrate.
      for (const i of ids) {
        s.vx[i] -= s.x[i] * 0.0015; s.vy[i] -= s.y[i] * 0.0015;
        s.vx[i] *= 0.85; s.vy[i] *= 0.85;
        s.x[i] += s.vx[i]; s.y[i] += s.vy[i];
      }
    };

    const draw = () => {
      const s = sim.current!;
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.clientWidth, H = canvas.clientHeight;
      if (canvas.width !== W * dpr || canvas.height !== H * dpr) { canvas.width = W * dpr; canvas.height = H * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const v = view.current;
      const tx = (x: number) => W / 2 + (x + v.tx) * v.scale, ty = (y: number) => H / 2 + (y + v.ty) * v.scale;
      const hoverSet = hover !== null ? new Set([hover, ...adjacency[hover]]) : null;
      ctx.lineWidth = 0.8;
      for (const [a, b] of visibleEdges) {
        const lit = hoverSet ? hoverSet.has(a) && hoverSet.has(b) && (a === hover || b === hover) : false;
        ctx.strokeStyle = lit ? (dark ? "rgba(248,250,252,0.9)" : "rgba(15,23,42,0.85)") : dark ? "rgba(148,163,184,0.18)" : "rgba(71,85,105,0.16)";
        ctx.lineWidth = lit ? 1.6 : 0.8;
        ctx.beginPath(); ctx.moveTo(tx(s.x[a]), ty(s.y[a])); ctx.lineTo(tx(s.x[b]), ty(s.y[b])); ctx.stroke();
      }
      for (const i of ids) {
        const n = data.nodes[i];
        const r = radius(i) * Math.sqrt(v.scale);
        const dim = hoverSet ? !hoverSet.has(i) : false;
        ctx.globalAlpha = dim ? 0.25 : 1;
        ctx.fillStyle = HUE[n.kind];
        ctx.beginPath(); ctx.arc(tx(s.x[i]), ty(s.y[i]), r, 0, Math.PI * 2); ctx.fill();
        if (i === focusIndex || i === hover) { ctx.strokeStyle = dark ? "#fff" : "#000"; ctx.lineWidth = 2; ctx.stroke(); }
        if (r >= 6 || i === hover || i === focusIndex || (hoverSet && hoverSet.has(i))) {
          ctx.fillStyle = dark ? "#e8e8e6" : "#16181d";
          ctx.font = `${i === hover ? 600 : 500} ${Math.max(10, Math.min(13, 9 + r / 2))}px system-ui, sans-serif`;
          ctx.fillText(n.name.length > 28 ? n.name.slice(0, 27) + "…" : n.name, tx(s.x[i]) + r + 3, ty(s.y[i]) + 4);
        }
        ctx.globalAlpha = 1;
      }
    };

    const focusIndex = focus !== null ? data.nodes.findIndex((n) => n.id === focus) : -1;
    const loop = () => {
      if (tick.current < 300) { step(); tick.current++; }
      draw();
      raf.current = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf.current);
  }, [visible, visibleEdges, adjacency, data.nodes, hover, focus]);

  // Interaction: hover, click, pan, zoom.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let dragging = false, lx = 0, ly = 0, moved = false;
    const pick = (mx: number, my: number): number | null => {
      const s = sim.current!; const v = view.current;
      const W = canvas.clientWidth, H = canvas.clientHeight;
      let best: number | null = null, bd = 12 * 12;
      for (const i of visible) {
        const x = W / 2 + (s.x[i] + v.tx) * v.scale, y = H / 2 + (s.y[i] + v.ty) * v.scale;
        const d = (x - mx) ** 2 + (y - my) ** 2;
        if (d < bd) { bd = d; best = i; }
      }
      return best;
    };
    const pos = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top] as const; };
    const onMove = (e: MouseEvent) => {
      const [mx, my] = pos(e);
      if (dragging) { view.current.tx += (mx - lx) / view.current.scale; view.current.ty += (my - ly) / view.current.scale; lx = mx; ly = my; moved = true; return; }
      const h = pick(mx, my); setHover(h); canvas.style.cursor = h !== null ? "pointer" : "grab";
    };
    const onDown = (e: MouseEvent) => { dragging = true; moved = false; [lx, ly] = pos(e); };
    const onUp = (e: MouseEvent) => {
      dragging = false;
      if (moved) return;
      const [mx, my] = pos(e); const h = pick(mx, my);
      if (h !== null) router.push(data.nodes[h].route);
    };
    const onWheel = (e: WheelEvent) => { e.preventDefault(); const f = Math.exp(-e.deltaY * 0.0015); view.current.scale = Math.min(6, Math.max(0.2, view.current.scale * f)); };
    const onLeave = () => { dragging = false; setHover(null); };
    canvas.addEventListener("mousemove", onMove); canvas.addEventListener("mousedown", onDown); canvas.addEventListener("mouseup", onUp);
    canvas.addEventListener("wheel", onWheel, { passive: false }); canvas.addEventListener("mouseleave", onLeave);
    return () => { canvas.removeEventListener("mousemove", onMove); canvas.removeEventListener("mousedown", onDown); canvas.removeEventListener("mouseup", onUp); canvas.removeEventListener("wheel", onWheel); canvas.removeEventListener("mouseleave", onLeave); };
  }, [visible, data.nodes, router]);

  const toggleKind = (k: Kind) => setKinds((s) => { const n = new Set(s); if (n.has(k)) n.delete(k); else n.add(k); return n; });
  const hoverNode = hover !== null ? data.nodes[hover] : null;

  return (
    <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-4 text-sm">
        <div>
          <div className="kicker mb-1.5">Focus on a node</div>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. TROP2, Enhertu, TNBC" aria-label="Focus search" className="w-full rounded-lg border border-border bg-card px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-accent/40" />
          {matches.length > 0 && (
            <ul className="card mt-1 divide-y divide-border">
              {matches.map((m) => <li key={m.id}><button onClick={() => { setFocus(m.id); setQuery(""); }} className="w-full text-left px-3 py-1.5 hover:bg-foreground/5"><span className={`chip border mr-2 ${KIND_COLOR[m.kind]}`}>{KIND_META[m.kind].label}</span>{m.name}</button></li>)}
            </ul>
          )}
          {focus && <div className="mt-2 flex items-center gap-2"><span className="text-muted">Focused: {data.nodes.find((n) => n.id === focus)?.name}</span><button onClick={() => setFocus(null)} className="underline text-muted">clear</button></div>}
        </div>
        {!focus && (
          <>
            <div>
              <div className="kicker mb-1.5">Minimum connections: {minDegree}</div>
              <input type="range" min={1} max={20} value={minDegree} onChange={(e) => setMinDegree(Number(e.target.value))} className="w-full" aria-label="Minimum degree" />
            </div>
            <div>
              <div className="kicker mb-1.5">Kinds</div>
              <div className="flex flex-wrap gap-1.5">
                {KINDS.map((k) => (
                  <button key={k} onClick={() => toggleKind(k)} className={`chip border text-[12px] ${kinds.has(k) ? KIND_COLOR[k] : "bg-card border-border text-muted line-through"}`}>
                    <span className="inline-block h-2 w-2 rounded-full mr-1" style={{ background: HUE[k] }} />{KIND_META[k].plural}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
        <div className="text-xs text-muted">{visible.size} nodes · {visibleEdges.length} edges. Scroll to zoom, drag to pan, click a node to open it.</div>
      </aside>
      <div className="card relative overflow-hidden">
        <canvas ref={canvasRef} className="block w-full h-[70vh] min-h-[480px]" aria-label="Knowledge graph" />
        {hoverNode && (
          <div className="absolute left-3 bottom-3 card px-3 py-2 text-sm shadow pointer-events-none">
            <span className={`chip border mr-2 ${KIND_COLOR[hoverNode.kind]}`}>{KIND_META[hoverNode.kind].label}</span><span className="font-medium">{hoverNode.name}</span><span className="text-muted"> · {hoverNode.degree} links</span>
          </div>
        )}
      </div>
    </div>
  );
}

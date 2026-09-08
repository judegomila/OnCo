"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { GraphData, GraphNode } from "@/lib/graph-export";
import { KIND_META, KINDS, type Kind } from "@/lib/schema";
import { FacetSelect } from "./filters/FacetSelect";

const HUE: Record<Kind, string> = {
  cancer: "#e11d48", section: "#64748b", technology: "#0284c7", target: "#7c3aed", drug: "#059669", company: "#d97706", institution: "#0d9488",
  pathway: "#c026d3", term: "#71717a", trial: "#4f46e5", pairing: "#ea580c", roadmap: "#0891b2", idea: "#65a30d", collection: "#78716c", person: "#db2777", bottleneck: "#b91c1c", paper: "#0369a1",
};
const ORDER: Kind[] = ["cancer", "section", "technology", "target", "drug", "trial", "pairing", "pathway", "company", "institution", "person", "bottleneck", "paper", "idea", "roadmap", "term", "collection"];
const MAX_PER_KIND = 18;

type Placed = { n: GraphNode; x: number; y: number; r: number; ring?: number };

/**
 * Clean radial explorer. Overview: fronts (inner ring) and cancers (outer ring). Focus: one object in the
 * centre, neighbours grouped by kind in arcs. No physics, no jitter; every label stays readable.
 */
export function GraphExplorer({ data }: { data: GraphData }) {
  const router = useRouter();
  const canvas = useRef<HTMLCanvasElement>(null);
  const [focus, setFocus] = useState<number | null>(null);
  const [trail, setTrail] = useState<number[]>([]);
  const [hidden, setHidden] = useState<Set<Kind>>(new Set(["term", "collection"]));
  const [hover, setHover] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<Set<Kind>>(new Set());

  const byId = useMemo(() => new Map(data.nodes.map((n, i) => [n.id, i])), [data.nodes]);
  const adj = useMemo(() => {
    const m = data.nodes.map(() => [] as number[]);
    for (const [a, b] of data.edges) { m[a].push(b); m[b].push(a); }
    return m;
  }, [data]);

  // Read ?focus= on mount.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const f = new URLSearchParams(window.location.search).get("focus");
      if (f && byId.has(f)) setFocus(byId.get(f)!);
    });
    return () => cancelAnimationFrame(id);
  }, [byId]);
  useEffect(() => {
    const p = focus === null ? "" : `?focus=${data.nodes[focus].id}`;
    window.history.replaceState(null, "", p || window.location.pathname);
  }, [focus, data.nodes]);

  // Layout.
  const scene = useMemo(() => {
    const W = 1000, H = 640, cx = W / 2, cy = H / 2;
    const placed: Placed[] = [];
    const arcs: Array<{ kind: Kind; a0: number; a1: number; count: number; shown: number }> = [];
    if (focus === null) {
      const fronts = data.nodes.map((n, i) => [n, i] as const).filter(([n]) => n.kind === "section");
      const cancers = data.nodes.map((n, i) => [n, i] as const).filter(([n]) => n.kind === "cancer");
      fronts.forEach(([n, i], k) => { const a = (k / fronts.length) * Math.PI * 2 - Math.PI / 2; placed.push({ n, x: cx + Math.cos(a) * 150, y: cy + Math.sin(a) * 150, r: 7, ring: 1 }); void i; });
      cancers.forEach(([n], k) => { const a = (k / cancers.length) * Math.PI * 2 - Math.PI / 2; placed.push({ n, x: cx + Math.cos(a) * 265, y: cy + Math.sin(a) * 265, r: 6, ring: 2 }); });
      return { W, H, cx, cy, placed, arcs, center: null as Placed | null };
    }
    const center: Placed = { n: data.nodes[focus], x: cx, y: cy, r: 14 };
    const groups = new Map<Kind, number[]>();
    for (const j of adj[focus]) { const k = data.nodes[j].kind; if (hidden.has(k)) continue; (groups.get(k) ?? groups.set(k, []).get(k)!).push(j); }
    const kinds = ORDER.filter((k) => groups.has(k));
    const shownCounts = kinds.map((k) => { const g = groups.get(k)!; return expanded.has(k) ? g.length : Math.min(g.length, MAX_PER_KIND); });
    const total = shownCounts.reduce((a, b) => a + b, 0) || 1;
    let a = -Math.PI / 2;
    kinds.forEach((k, gi) => {
      const g = groups.get(k)!.slice().sort((x, y) => data.nodes[y].degree - data.nodes[x].degree);
      const shown = shownCounts[gi];
      const span = (shown / total) * Math.PI * 2;
      const gap = Math.min(0.12, span * 0.2);
      arcs.push({ kind: k, a0: a, a1: a + span, count: g.length, shown });
      for (let i = 0; i < shown; i++) {
        const t = shown === 1 ? 0.5 : (i + 0.5) / shown;
        const ang = a + gap / 2 + t * (span - gap);
        const rad = 210 + (i % 2) * 44; // alternate radii so labels do not collide
        placed.push({ n: data.nodes[g[i]], x: cx + Math.cos(ang) * rad, y: cy + Math.sin(ang) * rad, r: 5 });
      }
      a += span;
    });
    return { W, H, cx, cy, placed, arcs, center };
  }, [focus, data.nodes, adj, hidden, expanded]);

  // Draw.
  useEffect(() => {
    const c = canvas.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const { W, H, cx, cy, placed, arcs, center } = scene;
    c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const dark = document.documentElement.dataset.theme === "dark" || (!document.documentElement.dataset.theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const ink = dark ? "#e8e8e6" : "#16181d", faint = dark ? "rgba(232,232,230,0.10)" : "rgba(22,24,29,0.08)";
    const hoverIdx = hover;
    const hoverSet = new Set<number>(hoverIdx !== null ? adj[hoverIdx] : []);
    ctx.font = "12px ui-sans-serif, system-ui, sans-serif";

    if (center) {
      // arcs
      for (const arc of arcs) {
        ctx.beginPath(); ctx.strokeStyle = HUE[arc.kind]; ctx.globalAlpha = 0.35; ctx.lineWidth = 3;
        ctx.arc(cx, cy, 300, arc.a0 + 0.02, arc.a1 - 0.02); ctx.stroke(); ctx.globalAlpha = 1;
        const mid = (arc.a0 + arc.a1) / 2;
        ctx.fillStyle = HUE[arc.kind]; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.font = "600 11px ui-sans-serif, system-ui, sans-serif";
        const label = `${KIND_META[arc.kind].plural} ${arc.count}${arc.shown < arc.count ? ` (showing ${arc.shown})` : ""}`;
        ctx.fillText(label.toUpperCase(), cx + Math.cos(mid) * 318, cy + Math.sin(mid) * 318);
        ctx.font = "12px ui-sans-serif, system-ui, sans-serif";
      }
      // spokes
      for (const p of placed) {
        const on = hoverIdx !== null && byId.get(p.n.id) === hoverIdx;
        ctx.beginPath(); ctx.moveTo(cx, cy);
        const mx = (cx + p.x) / 2 + (p.y - cy) * 0.08, my = (cy + p.y) / 2 - (p.x - cx) * 0.08;
        ctx.quadraticCurveTo(mx, my, p.x, p.y);
        ctx.strokeStyle = on ? HUE[p.n.kind] : faint; ctx.lineWidth = on ? 1.6 : 1; ctx.stroke();
      }
    } else if (hoverIdx !== null) {
      // overview: connections of hovered node among placed nodes
      const pos = new Map(placed.map((p) => [byId.get(p.n.id)!, p]));
      const h = pos.get(hoverIdx);
      if (h) for (const j of adj[hoverIdx]) { const q = pos.get(j); if (!q) continue; ctx.beginPath(); ctx.moveTo(h.x, h.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = HUE[h.n.kind]; ctx.globalAlpha = 0.35; ctx.lineWidth = 1.2; ctx.stroke(); ctx.globalAlpha = 1; }
      // rings
    }
    if (!center) {
      for (const r of [150, 265]) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.strokeStyle = faint; ctx.lineWidth = 1; ctx.stroke(); }
      ctx.fillStyle = ink; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.font = "600 14px ui-sans-serif, system-ui, sans-serif"; ctx.fillText("OnCo", cx, cy - 8);
      ctx.font = "11px ui-sans-serif, system-ui, sans-serif"; ctx.fillStyle = dark ? "#9aa1ad" : "#5b6270"; ctx.fillText("fronts inside · cancers outside", cx, cy + 10); ctx.font = "12px ui-sans-serif, system-ui, sans-serif";
    }
    // nodes + labels
    const drawNode = (p: Placed, big = false) => {
      const idx = byId.get(p.n.id)!;
      const on = hoverIdx === idx || hoverSet.has(idx);
      ctx.beginPath(); ctx.arc(p.x, p.y, big ? 14 : p.r + (on ? 1.5 : 0), 0, Math.PI * 2);
      ctx.fillStyle = HUE[p.n.kind]; ctx.globalAlpha = hoverIdx !== null && !on && !big ? 0.45 : 1; ctx.fill(); ctx.globalAlpha = 1;
      ctx.lineWidth = 2; ctx.strokeStyle = dark ? "#0e1013" : "#fbfbfa"; ctx.stroke();
      const name = p.n.name.replace(/ \(.*\)$/, "");
      const text = big ? name : name.length > 26 ? name.slice(0, 25) + "…" : name;
      ctx.fillStyle = on || big ? ink : dark ? "#c8ccd3" : "#3a3f48";
      ctx.font = big ? "600 14px ui-sans-serif, system-ui, sans-serif" : on ? "600 12px ui-sans-serif, system-ui, sans-serif" : "12px ui-sans-serif, system-ui, sans-serif";
      if (big) { ctx.textAlign = "center"; ctx.textBaseline = "top"; ctx.fillText(text, p.x, p.y + 20); }
      else {
        const dx = p.x - cx, dy = p.y - cy; const right = dx >= 0;
        ctx.textAlign = right ? "left" : "right"; ctx.textBaseline = "middle";
        const off = 9 + (Math.abs(dy) > Math.abs(dx) * 3 ? 0 : 0);
        ctx.fillText(text, p.x + (right ? off : -off), p.y);
      }
      ctx.font = "12px ui-sans-serif, system-ui, sans-serif";
    };
    for (const p of placed) drawNode(p);
    if (center) drawNode(center, true);
  }, [scene, hover, adj, byId]);

  // Hit testing.
  const hit = (e: React.MouseEvent<HTMLCanvasElement>): number | null => {
    const c = canvas.current!; const rect = c.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * scene.W, y = ((e.clientY - rect.top) / rect.height) * scene.H;
    const all = scene.center ? [scene.center, ...scene.placed] : scene.placed;
    let best: Placed | null = null, bd = 1e9;
    for (const p of all) { const d = Math.hypot(p.x - x, p.y - y); if (d < 16 && d < bd) { bd = d; best = p; } }
    return best ? byId.get(best.n.id)! : null;
  };
  const go = (i: number) => { if (focus !== null) setTrail((t) => [...t.slice(-7), focus]); setFocus(i); setExpanded(new Set()); };

  const options = useMemo(() => data.nodes.map((n) => ({ value: n.id, label: n.name, group: KIND_META[n.kind].plural })), [data.nodes]);
  const focusNode = focus !== null ? data.nodes[focus] : null;
  const kindsPresent = focus !== null ? ORDER.filter((k) => adj[focus].some((j) => data.nodes[j].kind === k)) : [];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <FacetSelect label="Focus" options={options} value={focusNode?.id ?? null} onChange={(v) => { if (v) go(byId.get(v as string)!); else { setFocus(null); setTrail([]); } }} allLabel="Overview" width="w-80" />
        {focusNode && <button type="button" onClick={() => router.push(focusNode.route)} className="rounded-lg bg-accent text-white px-3 py-1.5 text-sm">Open {KIND_META[focusNode.kind].label.toLowerCase()} page →</button>}
        {trail.length > 0 && <button type="button" onClick={() => { const prev = trail[trail.length - 1]; setTrail((t) => t.slice(0, -1)); setFocus(prev); }} className="text-sm underline text-muted">← Back</button>}
        {focusNode && <button type="button" onClick={() => { setFocus(null); setTrail([]); }} className="text-sm underline text-muted">Overview</button>}
        <span className="ml-auto text-xs text-muted">{focusNode ? `${adj[focus!].length} connections · click a node to refocus` : "Hover a node to see its links · click to focus"}</span>
      </div>
      {focusNode && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {kindsPresent.map((k) => {
            const n = adj[focus!].filter((j) => data.nodes[j].kind === k).length;
            const off = hidden.has(k);
            return <button key={k} type="button" onClick={() => setHidden((h) => { const s = new Set(h); if (s.has(k)) s.delete(k); else s.add(k); return s; })} className={`chip border text-[12px] ${off ? "bg-card border-border text-muted line-through" : "text-white border-transparent"}`} style={off ? {} : { background: HUE[k] }}>{KIND_META[k].plural} {n}{!off && n > MAX_PER_KIND && !expanded.has(k) && <span role="button" onClick={(e) => { e.stopPropagation(); setExpanded((x) => new Set([...x, k])); }} className="ml-1 underline">show all</span>}</button>;
          })}
        </div>
      )}
      <div className="card overflow-hidden">
        <canvas ref={canvas} className="w-full h-auto cursor-pointer" style={{ aspectRatio: "1000 / 640" }} aria-label="Knowledge graph"
          onMouseMove={(e) => setHover(hit(e))} onMouseLeave={() => setHover(null)}
          onClick={(e) => { const i = hit(e); if (i === null) return; if (i === focus) router.push(data.nodes[i].route); else go(i); }} />
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        {KINDS.map((k) => <span key={k} className="inline-flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: HUE[k] }} />{KIND_META[k].plural}</span>)}
        <span className="ml-auto">Terms and collections are hidden by default; toggle them above when focused.</span>
      </div>
    </div>
  );
}

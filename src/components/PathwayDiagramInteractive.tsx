"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PathwayView } from "@/lib/pathway-products";
import { STATUS_LABEL, statusClass } from "@/lib/text";

const W = 900, H = 520, PAD = 60, BOX_W = 170, BOX_H = 40;

/**
 * Pathway diagram that lights up. Pick a product: the nodes it hits glow, everything else dims,
 * and the escape routes (activating inputs that feed the pathway downstream of the block) are marked.
 * Renders the full static SVG on the server, so it works without JavaScript.
 */
export function PathwayDiagramInteractive({ view }: { view: PathwayView }) {
  const [selected, setSelected] = useState<string | null>(null);
  const product = view.products.find((p) => p.id === selected) ?? null;

  const pos = useMemo(() => new Map(view.nodes.map((n) => [n.id, { x: PAD + (n.x / 100) * (W - 2 * PAD), y: PAD + (n.y / 100) * (H - 2 * PAD) }])), [view.nodes]);

  // Nodes hit by the product; downstream nodes (reachable via "activates" from a hit node); escape edges: activating
  // edges into a downstream node whose source is NOT itself downstream of the hit (i.e. a bypass input).
  const { hit, downstream, escapes } = useMemo(() => {
    const hit = new Set(product?.nodeIds ?? []);
    const downstream = new Set<string>();
    if (hit.size) {
      const q = [...hit];
      while (q.length) {
        const cur = q.pop()!;
        for (const e of view.edges) if (e.from === cur && e.type === "activates" && !downstream.has(e.to) && !hit.has(e.to)) { downstream.add(e.to); q.push(e.to); }
      }
    }
    const escapes = new Set<number>();
    if (hit.size) view.edges.forEach((e, i) => { if (e.type === "activates" && downstream.has(e.to) && !hit.has(e.from) && !downstream.has(e.from)) escapes.add(i); });
    return { hit, downstream, escapes };
  }, [product, view.edges]);

  const escapeSources = [...escapes].map((i) => view.nodes.find((n) => n.id === view.edges[i].from)?.label).filter(Boolean);
  const hitLabels = view.nodes.filter((n) => hit.has(n.id)).map((n) => n.label);

  return (
    <div className="card overflow-hidden">
      {view.products.length > 0 && (
        <div className="px-3 pt-3 flex flex-wrap items-center gap-1.5 text-sm">
          <span className="text-muted mr-1">Light up a product:</span>
          <button type="button" onClick={() => setSelected(null)} className={`chip border ${!selected ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-foreground/5"}`}>None</button>
          {view.products.slice(0, 18).map((p) => (
            <button key={p.id} type="button" onClick={() => setSelected(p.id === selected ? null : p.id)} aria-pressed={p.id === selected}
              className={`chip border ${p.id === selected ? "bg-accent text-white border-accent" : "bg-card border-border hover:bg-foreground/5"}`}>{p.name}</button>
          ))}
          {view.products.length > 18 && <span className="text-xs text-muted">+{view.products.length - 18} more via the Connected tab</span>}
        </div>
      )}
      <div className="p-2 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[640px] h-auto" role="img" aria-label={`${view.name} pathway diagram${product ? `, highlighting ${product.name}` : ""}`}>
          <defs>
            <marker id={`arrow-${view.id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker>
            <marker id={`bar-${view.id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><rect x="7" y="0" width="3" height="10" fill="currentColor" /></marker>
            <filter id={`glow-${view.id}`} x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          {view.edges.map((e, i) => {
            const a = pos.get(e.from), b = pos.get(e.to);
            if (!a || !b) return null;
            const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1, ux = dx / len, uy = dy / len;
            const sx = a.x + ux * (BOX_W / 2) * Math.min(1, Math.abs(ux) + 0.35), sy = a.y + uy * (BOX_H / 2 + 4);
            const ex = b.x - ux * (BOX_W / 2) * Math.min(1, Math.abs(ux) + 0.35), ey = b.y - uy * (BOX_H / 2 + 6);
            const inhibit = e.type === "inhibits";
            const isEscape = escapes.has(i);
            const dimmed = !!product && !isEscape && !hit.has(e.from) && !hit.has(e.to) && !downstream.has(e.to);
            const blocked = !!product && hit.has(e.from) && e.type === "activates";
            const cls = isEscape ? "text-amber-500" : inhibit ? "text-rose-500" : blocked ? "text-accent" : "text-foreground/60";
            return (
              <g key={i} className={`transition-opacity ${dimmed ? "opacity-20" : ""}`}>
                <line x1={sx} y1={sy} x2={ex} y2={ey} stroke="currentColor" strokeWidth={isEscape ? 2.6 : blocked ? 2.2 : 1.6}
                  strokeDasharray={inhibit ? "5 4" : blocked ? "2 5" : undefined} className={cls}
                  markerEnd={inhibit ? `url(#bar-${view.id})` : `url(#arrow-${view.id})`} />
                {isEscape && <text x={(sx + ex) / 2} y={(sy + ey) / 2 - 6} textAnchor="middle" className="fill-amber-600" style={{ fontSize: 10, fontWeight: 600 }}>escape</text>}
                {blocked && <text x={(sx + ex) / 2 + 8} y={(sy + ey) / 2 + 4} className="fill-accent" style={{ fontSize: 10, fontWeight: 600 }}>blocked</text>}
              </g>
            );
          })}
          {view.nodes.map((n) => {
            const c = pos.get(n.id)!;
            const isHit = hit.has(n.id), isDown = downstream.has(n.id);
            const dimmed = !!product && !isHit && !isDown;
            const box = (
              <g className={`transition-opacity ${dimmed ? "opacity-30" : ""}`} filter={isHit ? `url(#glow-${view.id})` : undefined}>
                <rect x={c.x - BOX_W / 2} y={c.y - BOX_H / 2} width={BOX_W} height={BOX_H} rx={8} strokeWidth={isHit ? 2.2 : 1.2}
                  className={isHit ? "fill-rose-100 stroke-accent dark:fill-rose-950" : isDown ? "fill-amber-50 stroke-amber-400 dark:fill-amber-950/40" : n.targetId ? "fill-violet-50 stroke-violet-400 dark:fill-violet-950" : "fill-card stroke-border"} />
                <text x={c.x} y={c.y + 4} textAnchor="middle" className="fill-foreground" style={{ fontSize: 12.5, fontWeight: n.targetId || isHit ? 600 : 500 }}>
                  {n.label.length > 26 ? n.label.slice(0, 25) + "…" : n.label}
                </text>
                {isHit && <text x={c.x} y={c.y - BOX_H / 2 - 5} textAnchor="middle" className="fill-accent" style={{ fontSize: 10, fontWeight: 700 }}>◉ {product?.name}</text>}
              </g>
            );
            return n.href ? <Link key={n.id} href={n.href} aria-label={`${n.label}, open target page`}>{box}</Link> : <g key={n.id}>{box}</g>;
          })}
          <g transform={`translate(${PAD}, ${H - 22})`} className="text-foreground/60" style={{ fontSize: 11 }}>
            <line x1={0} y1={0} x2={30} y2={0} stroke="currentColor" markerEnd={`url(#arrow-${view.id})`} /><text x={36} y={4} className="fill-muted">activates</text>
            <line x1={110} y1={0} x2={140} y2={0} stroke="currentColor" strokeDasharray="5 4" className="text-rose-500" markerEnd={`url(#bar-${view.id})`} /><text x={146} y={4} className="fill-muted">inhibits</text>
            <rect x={220} y={-8} width={14} height={14} rx={3} className="fill-violet-50 stroke-violet-400 dark:fill-violet-950" /><text x={240} y={4} className="fill-muted">druggable target (click)</text>
            <rect x={400} y={-8} width={14} height={14} rx={3} className="fill-rose-100 stroke-accent dark:fill-rose-950" /><text x={420} y={4} className="fill-muted">hit by selected product</text>
            <line x1={580} y1={0} x2={610} y2={0} stroke="currentColor" strokeWidth={2.4} className="text-amber-500" markerEnd={`url(#arrow-${view.id})`} /><text x={616} y={4} className="fill-muted">escape route</text>
          </g>
        </svg>
      </div>
      {product && (
        <div className="px-4 py-3 border-t border-border text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={product.route} className="font-medium hover:underline">{product.name}</Link>
            {product.status && <span className={`chip ${statusClass(product.status)}`}>{STATUS_LABEL[product.status] ?? product.status}</span>}
            <span className="text-muted">{product.modality}</span>
          </div>
          <p className="mt-1 text-muted">
            Hits <span className="text-foreground">{hitLabels.join(", ")}</span>.
            {escapeSources.length > 0
              ? <> Known escape routes feed the pathway below the block via <span className="text-foreground">{escapeSources.join(", ")}</span>; this is why single agents fail and vertical or parallel combinations are used.</>
              : <> No bypass inputs are drawn downstream of this block in this diagram.</>}
          </p>
          {view.interventions.length > 0 && (
            <p className="mt-1 text-xs text-muted">Countermeasures listed for this pathway: {view.interventions.slice(0, 3).join("; ")}{view.interventions.length > 3 ? "; …" : ""}</p>
          )}
        </div>
      )}
    </div>
  );
}

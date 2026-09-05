import Link from "next/link";
import type { Pathway } from "@/lib/schema";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";

/** Static SVG rendering of a pathway; nodes with a targetId link to the target page. */
export function PathwayDiagram({ p }: { p: Pathway }) {
  const g = graph();
  const W = 900, H = 520, pad = 60;
  const pos = new Map(p.nodes.map((n) => [n.id, { x: pad + (n.x / 100) * (W - 2 * pad), y: pad + (n.y / 100) * (H - 2 * pad) }]));
  const boxW = 170, boxH = 40;

  return (
    <div className="card p-2 overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[640px] h-auto" role="img" aria-label={`${p.name} pathway diagram`}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
          <marker id="bar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <rect x="7" y="0" width="3" height="10" fill="currentColor" />
          </marker>
        </defs>
        {p.edges.map((e, i) => {
          const a = pos.get(e.from), b = pos.get(e.to);
          if (!a || !b) return null;
          const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
          const ux = dx / len, uy = dy / len;
          const sx = a.x + ux * (boxW / 2) * Math.min(1, Math.abs(ux) + 0.35), sy = a.y + uy * (boxH / 2 + 4);
          const ex = b.x - ux * (boxW / 2) * Math.min(1, Math.abs(ux) + 0.35), ey = b.y - uy * (boxH / 2 + 6);
          const inhibit = e.type === "inhibits";
          return (
            <line key={i} x1={sx} y1={sy} x2={ex} y2={ey} stroke="currentColor" strokeWidth={1.6} strokeDasharray={inhibit ? "5 4" : undefined}
              className={inhibit ? "text-rose-500" : "text-foreground/60"} markerEnd={inhibit ? "url(#bar)" : "url(#arrow)"} />
          );
        })}
        {p.nodes.map((n) => {
          const c = pos.get(n.id)!;
          const target = n.targetId ? g.get(n.targetId) : undefined;
          const body = (
            <g>
              <rect x={c.x - boxW / 2} y={c.y - boxH / 2} width={boxW} height={boxH} rx={8}
                className={target ? "fill-violet-50 stroke-violet-400 dark:fill-violet-950" : "fill-card stroke-border"} strokeWidth={1.2} />
              <text x={c.x} y={c.y + 4} textAnchor="middle" className="fill-foreground" style={{ fontSize: 12.5, fontWeight: target ? 600 : 500 }}>
                {n.label.length > 26 ? n.label.slice(0, 25) + "…" : n.label}
              </text>
            </g>
          );
          return target ? (
            <Link key={n.id} href={routeFor(target)}>{body}</Link>
          ) : (
            <g key={n.id}>{body}</g>
          );
        })}
        <g transform={`translate(${pad}, ${H - 22})`} className="text-foreground/60" style={{ fontSize: 11 }}>
          <line x1={0} y1={0} x2={30} y2={0} stroke="currentColor" markerEnd="url(#arrow)" />
          <text x={36} y={4} className="fill-muted">activates</text>
          <line x1={110} y1={0} x2={140} y2={0} stroke="currentColor" strokeDasharray="5 4" className="text-rose-500" markerEnd="url(#bar)" />
          <text x={146} y={4} className="fill-muted">inhibits</text>
          <rect x={220} y={-8} width={14} height={14} rx={3} className="fill-violet-50 stroke-violet-400 dark:fill-violet-950" />
          <text x={240} y={4} className="fill-muted">druggable target (click)</text>
        </g>
      </svg>
    </div>
  );
}

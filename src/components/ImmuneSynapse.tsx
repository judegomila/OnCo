"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CheckpointClassId, CheckpointSide, CheckpointTone } from "@/data/checkpoint-map";
import { ACCENT, CheckpointGlyph, TONE_COLOUR } from "./CheckpointGlyph";
import { STATUS_LABEL } from "@/lib/text";

/** One node of the synapse, built on the server from the checkpoint rows (plain data: no functions cross the boundary). */
export type SynapseNode = {
  id: string;
  label: string;
  side: CheckpointSide;
  tone: CheckpointTone;
  classId: CheckpointClassId;
  className: string;
  approved: boolean;
  bestStatus?: string;
  bestDrug?: string;
  expressedOn: string;
  partners: string[];
  targetRoute: string;
  rowRoute: string;
  drugCount: number;
};

const W = 900, H = 800;
const T = { cx: 205, cy: 330, r: 245 };
const MAC = { cx: 205, cy: 690, r: 58 };
const TUM = { x: 565, y: 80, w: 315, h: 540, rx: 70 };
const IMMUNE_X = T.cx + T.r - 8, TUMOUR_X = TUM.x + 6, MAC_X = MAC.cx + MAC.r - 6, SOL_X = 455, INTRA_X = 745;
const Y0 = 100, Y1 = 570;

type Pos = { x: number; y: number };

/** Immune-side nodes in taxonomy order; tumour-side nodes sorted by the height of their partners so pairs face each other. */
function layout(nodes: SynapseNode[]): Map<string, Pos> {
  const pos = new Map<string, Pos>();
  const spread = (ids: string[], x: number, y0: number, y1: number) => {
    const n = ids.length;
    ids.forEach((id, i) => pos.set(id, { x, y: n === 1 ? (y0 + y1) / 2 : y0 + ((y1 - y0) * i) / (n - 1) }));
  };
  const immune = nodes.filter((n) => n.side === "immune-cell").map((n) => n.id);
  spread(immune, IMMUNE_X, Y0, Y1);
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const key = (n: SynapseNode) => {
    const ys = n.partners.map((p) => pos.get(p)?.y).filter((y): y is number => y !== undefined);
    return ys.length ? ys.reduce((a, b) => a + b, 0) / ys.length : Number.POSITIVE_INFINITY;
  };
  const tumour = nodes.filter((n) => n.side === "tumour-or-apc").map((n) => n.id).sort((a, b) => key(byId.get(a)!) - key(byId.get(b)!));
  spread(tumour, TUMOUR_X, Y0, Y1);
  spread(nodes.filter((n) => n.side === "macrophage").map((n) => n.id), MAC_X, MAC.cy - 45, MAC.cy + 45);
  spread(nodes.filter((n) => n.side === "soluble").map((n) => n.id), SOL_X, 655, 745);
  spread(nodes.filter((n) => n.side === "intracellular").map((n) => n.id), INTRA_X, 640, 700);
  return pos;
}

/**
 * The immune synapse: a T cell or NK cell (left) facing a tumour cell or antigen-presenting cell (right), with a
 * macrophage below and the soluble signals between. Every receptor and ligand is a node coloured by its class tone;
 * lines join partners; members with an approved drug carry the pink accent. Hover or focus a node for where it is
 * expressed and its best drug status; clicking opens its row in the table below. The legend pills highlight one class.
 * The full SVG renders on the server, so the drawing stands without JavaScript.
 */
export function ImmuneSynapse({ nodes, classes }: { nodes: SynapseNode[]; classes: Array<{ id: CheckpointClassId; name: string; tone: CheckpointTone; anchor: string }> }) {
  const [hover, setHover] = useState<string | null>(null);
  const [only, setOnly] = useState<CheckpointClassId | null>(null);
  const pos = useMemo(() => layout(nodes), [nodes]);
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const edges = useMemo(() => {
    const seen = new Set<string>();
    const out: Array<[string, string]> = [];
    for (const n of nodes) for (const p of n.partners) { const k = [n.id, p].sort().join("|"); if (!seen.has(k) && byId.has(p)) { seen.add(k); out.push([n.id, p]); } }
    return out;
  }, [nodes, byId]);
  const active = hover ? byId.get(hover) : undefined;
  const lit = (n: SynapseNode) => (only ? n.classId === only : true) && (!active || active.id === n.id || active.partners.includes(n.id));
  const tip = active ? pos.get(active.id) : undefined;

  return (
    <div className="relative" data-checkpoint-synapse>
      <div className="flex flex-wrap gap-1.5 mb-3 text-xs" role="group" aria-label="Highlight a class">
        {classes.map((c) => (
          <button key={c.id} type="button" aria-pressed={only === c.id} onClick={() => setOnly(only === c.id ? null : c.id)}
            className={`chip border inline-flex items-center gap-1.5 transition-colors ${only === c.id ? "border-accent bg-accent-soft text-accent" : "bg-card border-border hover:bg-foreground/5"}`}
            style={{ color: only && only !== c.id ? undefined : TONE_COLOUR[c.tone].stroke }}>
            <CheckpointGlyph id={c.tone} className="h-3.5 w-3.5" /><span className="text-foreground">{c.name}</span>
          </button>
        ))}
        {only && <a href={`#${only}`} className="chip border border-border bg-card hover:bg-foreground/5">Open the class table →</a>}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Immune synapse: receptors on a T cell, NK cell and macrophage facing their ligands on a tumour cell or antigen-presenting cell" onMouseLeave={() => setHover(null)}>
        <defs>
          <radialGradient id="cp-cell" cx="35%" cy="30%" r="80%"><stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor="#f1f3f5" /></radialGradient>
        </defs>
        {/* cells */}
        <circle cx={T.cx} cy={T.cy} r={T.r} fill="url(#cp-cell)" stroke="#adb5bd" strokeWidth={2} />
        <circle cx={T.cx - 40} cy={T.cy - 10} r={95} fill="#e9ecef" stroke="#ced4da" />
        <text x={T.cx - 40} y={T.cy - 4} textAnchor="middle" fontSize={16} fontWeight={600} fill="#495057">T cell</text>
        <text x={T.cx - 40} y={T.cy + 16} textAnchor="middle" fontSize={12} fill="#868e96">or NK cell</text>
        <circle cx={MAC.cx} cy={MAC.cy} r={MAC.r} fill="url(#cp-cell)" stroke="#adb5bd" strokeWidth={2} />
        <text x={MAC.cx - 12} y={MAC.cy + 4} textAnchor="middle" fontSize={12} fontWeight={600} fill="#495057">Macrophage</text>
        <rect x={TUM.x} y={TUM.y} width={TUM.w} height={TUM.h} rx={TUM.rx} fill="url(#cp-cell)" stroke="#adb5bd" strokeWidth={2} />
        <circle cx={TUM.x + TUM.w * 0.62} cy={TUM.y + 190} r={80} fill="#e9ecef" stroke="#ced4da" />
        <text x={TUM.x + TUM.w * 0.62} y={TUM.y + 186} textAnchor="middle" fontSize={15} fontWeight={600} fill="#495057">Tumour cell</text>
        <text x={TUM.x + TUM.w * 0.62} y={TUM.y + 206} textAnchor="middle" fontSize={11} fill="#868e96">or antigen-presenting cell</text>
        <text x={SOL_X} y={632} textAnchor="middle" fontSize={11} fill="#868e96">Soluble signals</text>
        <text x={INTRA_X} y={622} textAnchor="middle" fontSize={11} fill="#868e96">Inside the cell</text>
        {/* partner lines */}
        {edges.map(([a, b]) => {
          const pa = pos.get(a)!, pb = pos.get(b)!;
          const na = byId.get(a)!, nb = byId.get(b)!;
          const on = lit(na) && lit(nb) && (!active || active.id === a || active.id === b);
          const tone = na.tone === "ligand" ? nb.tone : na.tone;
          return <line key={`${a}-${b}`} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke={TONE_COLOUR[tone].stroke} strokeWidth={on ? 2 : 1} strokeOpacity={on ? 0.7 : 0.15} strokeDasharray={na.tone === "soluble" || nb.tone === "soluble" ? "4 4" : undefined} />;
        })}
        {/* nodes */}
        {nodes.map((n) => {
          const p = pos.get(n.id)!;
          const c = TONE_COLOUR[n.tone];
          const on = lit(n);
          const left = n.side === "immune-cell" || n.side === "macrophage";
          const anchor = n.side === "soluble" || n.side === "intracellular" ? "middle" : left ? "end" : "start";
          const lx = anchor === "middle" ? p.x : left ? p.x - 14 : p.x + 14;
          const ly = anchor === "middle" ? p.y + 22 : p.y + 4;
          return (
            <a key={n.id} href={n.rowRoute} aria-label={`${n.label}: open its row`}
              onMouseEnter={() => setHover(n.id)} onFocus={() => setHover(n.id)} onBlur={() => setHover(null)} style={{ cursor: "pointer", opacity: on ? 1 : 0.25 }}>
              {n.approved && <circle cx={p.x} cy={p.y} r={13} fill="none" stroke={ACCENT} strokeWidth={2} />}
              <circle cx={p.x} cy={p.y} r={8.5} fill={n.approved ? ACCENT : c.fill} stroke={n.approved ? ACCENT : c.stroke} strokeWidth={2} />
              {n.tone === "stimulatory" && <path d={`M${p.x - 3} ${p.y + 2}l3-4 3 4`} fill="none" stroke={n.approved ? "#fff" : c.stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />}
              {n.tone === "inhibitory" && <line x1={p.x - 3.5} y1={p.y} x2={p.x + 3.5} y2={p.y} stroke={n.approved ? "#fff" : c.stroke} strokeWidth={1.8} strokeLinecap="round" />}
              <text x={lx} y={ly} textAnchor={anchor} fontSize={11.5} fontWeight={hover === n.id ? 700 : 500} fill={n.approved ? ACCENT : "#343a40"}>{n.label}</text>
            </a>
          );
        })}
      </svg>
      {active && tip && (
        <div role="tooltip" className="pointer-events-none absolute z-20 w-64 max-w-[85vw] card shadow-xl p-3 text-sm leading-snug"
          style={{ left: `min(calc(${(tip.x / W) * 100}% + 12px), calc(100% - 17rem))`, top: `calc(${(tip.y / H) * 100}% + 12px)` }}>
          <div className="flex items-center gap-1.5 font-semibold" style={{ color: TONE_COLOUR[active.tone].stroke }}><CheckpointGlyph id={active.tone} className="h-3.5 w-3.5" />{active.label}</div>
          <div className="text-xs text-muted">{active.className}</div>
          <p className="mt-1 text-muted">{active.expressedOn}</p>
          <p className="mt-1">{active.bestStatus ? <>Best drug status: <span className="font-medium">{STATUS_LABEL[active.bestStatus] ?? active.bestStatus}</span>{active.bestDrug && <> ({active.bestDrug})</>}</> : "No drug with a pipeline status in the corpus."} {active.drugCount > 0 && <span className="text-muted">{active.drugCount} product{active.drugCount === 1 ? "" : "s"}.</span>}</p>
          {active.partners.length > 0 && <p className="mt-1 text-xs text-muted">Partner{active.partners.length > 1 ? "s" : ""}: {active.partners.map((p) => byId.get(p)?.label ?? p).join(", ")}</p>}
          <p className="mt-1 text-xs">Click for its row · <Link href={active.targetRoute} className="underline">target page</Link></p>
        </div>
      )}
      <p className="mt-2 text-xs text-muted flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="inline-flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full" style={{ background: ACCENT }} /> approved drug against it</span>
        {(["inhibitory", "stimulatory", "ligand", "innate", "metabolic", "soluble"] as const).map((t) => <span key={t} className="inline-flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full border-2" style={{ borderColor: TONE_COLOUR[t].stroke, background: TONE_COLOUR[t].fill }} />{TONE_COLOUR[t].label}</span>)}
      </p>
    </div>
  );
}

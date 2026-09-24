"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CheckpointClassId, Gate } from "@/data/checkpoint-map";
import { ACCENT, CheckpointGlyph, TONE_COLOUR } from "./CheckpointGlyph";
import { STATUS_LABEL } from "@/lib/text";

/** One member of the cell-cycle map, built on the server (plain data). */
export type RingNode = {
  id: string;
  label: string;
  gates: Gate[];
  classId: CheckpointClassId;
  className: string;
  approved: boolean;
  bestStatus?: string;
  bestDrug?: string;
  actsWhere: string;
  drugs: string[];
  targetRoute: string;
  rowRoute: string;
};

const W = 820, H = 640;
const C = { x: 410, y: 310 };
const R = 165;
/** Phase arcs as fractions of the ring, clockwise from the top: G1 is the long phase, M the short one. */
const PHASES: Array<{ id: string; label: string; from: number; to: number; fill: string }> = [
  { id: "g1", label: "G1", from: 0, to: 0.4, fill: "#e7f5ff" },
  { id: "s", label: "S", from: 0.4, to: 0.7, fill: "#fff9db" },
  { id: "g2", label: "G2", from: 0.7, to: 0.88, fill: "#e6fcf5" },
  { id: "m", label: "M", from: 0.88, to: 1, fill: "#fff0f6" },
];
/** Where each gate sits on the ring (fraction), its caption, and the column its members line up in. */
const GATES: Record<Gate, { at: number; title: string; sub: string; col: { x: number; y0: number; anchor: "start" | "end" }; label: { x: number; y: number; anchor: "start" | "end" | "middle" } }> = {
  "G1/S": { at: 0.4, title: "G1/S gate", sub: "commit to copying DNA", col: { x: 640, y0: 486, anchor: "start" }, label: { x: 620, y: 440, anchor: "start" } },
  "G2/M": { at: 0.88, title: "G2/M gate", sub: "commit to dividing", col: { x: 150, y0: 150, anchor: "end" }, label: { x: 262, y: 120, anchor: "end" } },
  SAC: { at: 0.94, title: "Spindle assembly checkpoint", sub: "inside mitosis", col: { x: 330, y0: 34, anchor: "end" }, label: { x: 348, y: 40, anchor: "start" } },
  DDR: { at: 0, title: "DNA-damage response", sub: "the sensors behind every gate", col: { x: 396, y0: 300, anchor: "start" }, label: { x: 410, y: 250, anchor: "middle" } },
};
const GATE_ORDER: Gate[] = ["G1/S", "G2/M", "SAC", "DDR"];
const STEP = 30;

const pt = (f: number, r: number) => { const a = f * Math.PI * 2 - Math.PI / 2; return { x: C.x + r * Math.cos(a), y: C.y + r * Math.sin(a) }; };
const arc = (from: number, to: number, r1: number, r2: number) => {
  const a = pt(from, r2), b = pt(to, r2), c = pt(to, r1), d = pt(from, r1);
  const large = to - from > 0.5 ? 1 : 0;
  return `M${a.x} ${a.y}A${r2} ${r2} 0 ${large} 1 ${b.x} ${b.y}L${c.x} ${c.y}A${r1} ${r1} 0 ${large} 0 ${d.x} ${d.y}Z`;
};

type Pos = { x: number; y: number; anchor: "start" | "end"; gate: Gate };

/** The gate a member is drawn at: DNA-damage-response members in the centre, everyone else at the first gate they name. */
const gateOf = (n: RingNode): Gate => (n.classId === "ddr" ? "DDR" : GATE_ORDER.find((g) => n.gates.includes(g)) ?? "DDR");

function layout(nodes: RingNode[]): Map<string, Pos> {
  const pos = new Map<string, Pos>();
  const count: Partial<Record<Gate, number>> = {};
  for (const n of nodes) {
    const g = gateOf(n);
    const i = count[g] ?? 0;
    count[g] = i + 1;
    const { col } = GATES[g];
    pos.set(n.id, { x: col.x, y: col.y0 + i * STEP, anchor: col.anchor, gate: g });
  }
  return pos;
}

/**
 * The cell cycle as a ring with its checkpoint gates. G1, S, G2 and M are arcs; the G1/S and G2/M gates sit at the
 * phase boundaries, the spindle assembly checkpoint inside M and the DNA-damage response in the centre. Each member
 * is a node in its gate's column, pink when an approved drug exists; hover or focus for where it acts and its drugs,
 * click for its row in the table. Rendered on the server, interactive when hydrated.
 */
export function CellCycleRing({ nodes }: { nodes: RingNode[] }) {
  const [hover, setHover] = useState<string | null>(null);
  const pos = useMemo(() => layout(nodes), [nodes]);
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const active = hover ? byId.get(hover) : undefined;
  const tip = active ? pos.get(active.id) : undefined;
  const gate = TONE_COLOUR.gate;
  const first = (g: Gate) => [...pos.values()].find((p) => p.gate === g);

  return (
    <div className="relative" data-checkpoint-ring>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Cell cycle ring with the G1/S, G2/M and spindle assembly checkpoints and the DNA-damage response" onMouseLeave={() => setHover(null)}>
        <defs><marker id="cp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5 0 10z" fill="#868e96" /></marker></defs>
        {PHASES.map((p) => <path key={p.id} d={arc(p.from, p.to, R - 28, R + 28)} fill={p.fill} stroke="#adb5bd" strokeWidth={1.5} />)}
        {PHASES.map((p) => { const m = pt((p.from + p.to) / 2, R); return <text key={p.id} x={m.x} y={m.y + 6} textAnchor="middle" fontSize={18} fontWeight={700} fill="#495057">{p.label}</text>; })}
        {(() => { const a = pt(0.2, R + 40), b = pt(0.24, R + 40); return <path d={`M${a.x} ${a.y}L${b.x} ${b.y}`} stroke="#868e96" strokeWidth={2} markerEnd="url(#cp-arrow)" fill="none" />; })()}
        <circle cx={C.x} cy={C.y} r={R - 40} fill="#ffffff" stroke="#dee2e6" strokeDasharray="4 4" />
        {/* gates: a bar across the ring, a caption, and a thin lead to the first member of the column */}
        {(["G1/S", "G2/M", "SAC"] as Gate[]).map((g) => {
          const spec = GATES[g];
          const a = pt(spec.at, R - 34), b = pt(spec.at, R + 34), o = pt(spec.at, R + 36);
          const f = first(g);
          return (
            <g key={g}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={gate.stroke} strokeWidth={4} strokeLinecap="round" />
              {f && <line x1={o.x} y1={o.y} x2={f.x} y2={f.y} stroke={gate.stroke} strokeWidth={1} strokeDasharray="3 3" strokeOpacity={0.6} />}
              <text x={spec.label.x} y={spec.label.y} textAnchor={spec.label.anchor} fontSize={12.5} fontWeight={700} fill={gate.stroke}>{spec.title}</text>
              <text x={spec.label.x} y={spec.label.y + 14} textAnchor={spec.label.anchor} fontSize={10.5} fill="#868e96">{spec.sub}</text>
            </g>
          );
        })}
        <text x={GATES.DDR.label.x} y={GATES.DDR.label.y} textAnchor="middle" fontSize={12.5} fontWeight={700} fill={gate.stroke}>{GATES.DDR.title}</text>
        <text x={GATES.DDR.label.x} y={GATES.DDR.label.y + 14} textAnchor="middle" fontSize={10.5} fill="#868e96">{GATES.DDR.sub}</text>
        {/* nodes */}
        {nodes.map((n) => {
          const p = pos.get(n.id)!;
          const on = !active || active.id === n.id;
          const lx = p.anchor === "end" ? p.x - 13 : p.x + 13;
          return (
            <a key={n.id} href={n.rowRoute} aria-label={`${n.label}: open its row`} style={{ cursor: "pointer", opacity: on ? 1 : 0.35 }}
              onMouseEnter={() => setHover(n.id)} onFocus={() => setHover(n.id)} onBlur={() => setHover(null)}>
              {n.approved && <circle cx={p.x} cy={p.y} r={12} fill="none" stroke={ACCENT} strokeWidth={2} />}
              <circle cx={p.x} cy={p.y} r={7.5} fill={n.approved ? ACCENT : gate.fill} stroke={n.approved ? ACCENT : gate.stroke} strokeWidth={2} />
              <text x={lx} y={p.y + 4} textAnchor={p.anchor} fontSize={11.5} fontWeight={hover === n.id ? 700 : 500} fill={n.approved ? ACCENT : "#343a40"}>{n.label}</text>
            </a>
          );
        })}
      </svg>
      {active && tip && (
        <div role="tooltip" className="pointer-events-none absolute z-20 w-64 max-w-[85vw] card shadow-xl p-3 text-sm leading-snug"
          style={{ left: `min(calc(${(tip.x / W) * 100}% + 12px), calc(100% - 17rem))`, top: `calc(${(tip.y / H) * 100}% + 12px)` }}>
          <div className="flex items-center gap-1.5 font-semibold" style={{ color: gate.stroke }}><CheckpointGlyph id="gate" className="h-3.5 w-3.5" />{active.label}</div>
          <div className="text-xs text-muted">{active.className} · {active.gates.join(", ")}</div>
          <p className="mt-1 text-muted">{active.actsWhere}</p>
          <p className="mt-1">{active.bestStatus ? <>Best drug status: <span className="font-medium">{STATUS_LABEL[active.bestStatus] ?? active.bestStatus}</span>{active.bestDrug && <> ({active.bestDrug})</>}</> : "No drug with a pipeline status in the corpus."}</p>
          {active.drugs.length > 0 && <p className="mt-1 text-xs text-muted">Drugs: {active.drugs.slice(0, 5).join(", ")}{active.drugs.length > 5 ? ` and ${active.drugs.length - 5} more` : ""}</p>}
          <p className="mt-1 text-xs">Click for its row · <Link href={active.targetRoute} className="underline">target page</Link></p>
        </div>
      )}
      <p className="mt-2 text-xs text-muted flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="inline-flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full" style={{ background: ACCENT }} /> approved drug against it</span>
        <span className="inline-flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full border-2" style={{ borderColor: gate.stroke, background: gate.fill }} /> checkpoint member, no approval yet</span>
        <span className="inline-flex items-center gap-1"><span className="inline-block h-0.5 w-4" style={{ background: gate.stroke }} /> gate</span>
      </p>
    </div>
  );
}

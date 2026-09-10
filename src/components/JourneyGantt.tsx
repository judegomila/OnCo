import { layoutPhases, type Journey, type PhaseType } from "@/data/journeys";

const COLOUR: Record<PhaseType, string> = { diagnosis: "#64748b", neoadjuvant: "#b91c1c", surgery: "#0f766e", radiotherapy: "#b45309", adjuvant: "#7c3aed", systemic: "#2563eb", "cell-therapy": "#c2185b", surveillance: "#4d7c0f" };
const LABEL: Record<PhaseType, string> = { diagnosis: "Diagnosis and tests", neoadjuvant: "Before surgery", surgery: "Surgery and recovery", radiotherapy: "Radiotherapy", adjuvant: "After surgery", systemic: "Systemic therapy", "cell-therapy": "Cell therapy", surveillance: "Surveillance" };

const ROW = 34, LEFT = 230, W = 860, PAD_T = 34, PAD_B = 68;

/**
 * Gantt-style timeline of a treatment journey: one bar per phase (solid to the minimum duration, hatched to
 * the maximum), parallel phases on their own rows aligned with the phase they accompany, open-ended phases
 * running off the right edge, and decision points as diamonds on the axis. Hand-drawn SVG, server-rendered.
 */
export function JourneyGantt({ journey, horizonWeeks }: { journey: Journey; horizonWeeks?: number }) {
  const rows = layoutPhases(journey);
  const finite = rows.filter((r) => !r.phase.ongoing);
  const lastFinite = Math.max(12, ...finite.map((r) => r.endMax));
  const horizon = horizonWeeks ?? Math.min(Math.ceil((lastFinite * 1.15) / 13) * 13, 260);
  const x = (w: number) => LEFT + ((W - LEFT - 20) * Math.min(w, horizon)) / horizon;
  const H = PAD_T + rows.length * ROW + PAD_B;
  const monthTicks = Array.from({ length: Math.floor(horizon / 4.345) + 1 }, (_, i) => i).filter((m) => horizon <= 60 ? true : horizon <= 130 ? m % 3 === 0 : m % 6 === 0);
  const decisionsAt = journey.decisions.map((d) => { const r = rows.find((x) => x.phase.id === d.after); return r ? { d, at: r.endMin } : null; }).filter((v): v is NonNullable<typeof v> => !!v);
  const types = Array.from(new Set(rows.map((r) => r.phase.type)));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[640px]" role="img" aria-label={`${journey.title} timeline: ${rows.map((r) => `${r.phase.label} from week ${r.start} for ${r.phase.weeks[0]}${r.phase.weeks[1] !== r.phase.weeks[0] ? ` to ${r.phase.weeks[1]}` : ""} weeks${r.phase.ongoing ? ", ongoing" : ""}`).join("; ")}`}>
      <defs>
        <pattern id={`hatch-${journey.id}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" /></pattern>
      </defs>
      {/* month grid */}
      {monthTicks.map((m) => { const xx = x(m * 4.345); return <g key={m}><line x1={xx} x2={xx} y1={PAD_T - 6} y2={H - PAD_B + 4} stroke="currentColor" strokeOpacity={m % 12 === 0 ? 0.18 : 0.06} /><text x={xx} y={H - PAD_B + 18} textAnchor="middle" fontSize={10} fill="currentColor" fillOpacity={0.7}>{m % 12 === 0 && m > 0 ? `${m / 12} yr` : m}</text></g>; })}
      <text x={(LEFT + W) / 2} y={H - PAD_B + 34} textAnchor="middle" fontSize={10.5} fill="currentColor" fillOpacity={0.7}>Months from diagnosis · solid bar = shortest typical duration, hatched = up to the longest · arrow = continues for years</text>
      <text x={0} y={18} fontSize={11} fontWeight={600} fill="currentColor" fillOpacity={0.8}>Phase</text>
      {/* rows */}
      {rows.map((r, i) => {
        const y = PAD_T + i * ROW;
        const c = COLOUR[r.phase.type];
        const x0 = x(r.start), x1 = x(r.endMin), x2 = x(r.endMax);
        const label = r.phase.label.length > 38 ? r.phase.label.slice(0, 37).trimEnd() + "…" : r.phase.label;
        const dur = r.phase.ongoing ? "years" : r.phase.weeks[0] === r.phase.weeks[1] ? `${r.phase.weeks[0]} wk` : `${r.phase.weeks[0]}-${r.phase.weeks[1]} wk`;
        return (
          <g key={r.phase.id}>
            {i % 2 === 1 && <rect x={0} y={y} width={W} height={ROW} fill="currentColor" fillOpacity={0.025} />}
            <text x={0} y={y + 14} fontSize={11.5} fontWeight={600} fill="currentColor">{label}</text>
            <text x={0} y={y + 27} fontSize={9.5} fill="currentColor" fillOpacity={0.6}>{LABEL[r.phase.type]} · {dur}{r.phase.parallel ? " · alongside" : ""}</text>
            <rect x={x0} y={y + 8} width={Math.max(3, x1 - x0)} height={ROW - 16} rx={3} fill={c} fillOpacity={0.85} />
            {x2 > x1 && <rect x={x1} y={y + 8} width={x2 - x1} height={ROW - 16} rx={3} fill={`url(#hatch-${journey.id})`} stroke={c} strokeOpacity={0.6} />}
            {r.phase.ongoing && <path d={`M${W - 18},${y + ROW / 2 - 6} L${W - 6},${y + ROW / 2} L${W - 18},${y + ROW / 2 + 6}`} fill="none" stroke={c} strokeWidth={2} />}
            {r.phase.ongoing && <line x1={x2} x2={W - 18} y1={y + ROW / 2} y2={y + ROW / 2} stroke={c} strokeWidth={2} strokeDasharray="3 4" />}
          </g>
        );
      })}
      {/* decision diamonds */}
      {decisionsAt.map(({ d, at }, i) => { const xx = x(at); return <g key={i}><path d={`M${xx},${PAD_T - 14} l7,7 l-7,7 l-7,-7 z`} fill="var(--accent)" /><title>{d.question}</title><text x={xx} y={PAD_T - 18} textAnchor="middle" fontSize={9.5} fill="currentColor" fillOpacity={0.75}>decision {i + 1}</text></g>; })}
      {/* legend */}
      {types.map((t, i) => <g key={t} transform={`translate(${i * 118} ${H - 6})`}><rect x={0} y={-9} width={10} height={10} rx={2} fill={COLOUR[t]} /><text x={14} y={0} fontSize={9.5} fill="currentColor" fillOpacity={0.75}>{LABEL[t]}</text></g>)}
    </svg>
  );
}

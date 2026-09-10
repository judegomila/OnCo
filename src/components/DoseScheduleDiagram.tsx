import type { RegimenComponent, Route } from "@/data/regimens";

/**
 * One cycle of a regimen drawn as a calendar strip: days across the top, one row per component, a mark on each
 * dosing day. Marks differ by shape as well as tone (filled square for IV, open circle for oral, triangle for
 * subcutaneous, cross-hatched bar for radiotherapy, long bar for a continuous infusion), so the strip still reads
 * in black and white and for colour-blind readers. No animation, so nothing to reduce for motion preferences.
 * Server-safe: plain SVG, no hooks.
 */
export type DoseScheduleProps = {
  components: RegimenComponent[];
  cycleDays: number;
  /** "6", "until progression"... shown under the strip. */
  cycles: string;
  totalWeeks?: number | null;
  /** Short version for table cells: no legend, no labels beyond a week ruler. */
  compact?: boolean;
  className?: string;
};

const CELL = 18, ROW = 22, LABEL_W = 150, LABEL_W_COMPACT = 0, PAD = 6;
const ROUTE_LABEL: Record<Route, string> = { IV: "Intravenous", PO: "Oral", SC: "Subcutaneous", IT: "Intrathecal", Intravesical: "Intravesical", RT: "Radiotherapy" };

/** Days a continuous infusion covers, given the first day and the length in hours. */
function infusionSpan(k: RegimenComponent): [number, number] | null {
  if (!k.infusionHours) return null;
  const start = Math.min(...k.days);
  const end = Math.max(start + Math.ceil(k.infusionHours / 24) - 1, Math.max(...k.days));
  return [start, end];
}

function Mark({ route, x, y }: { route: Route; x: number; y: number }) {
  const s = 5.5;
  switch (route) {
    case "PO": return <circle cx={x} cy={y} r={s - 0.5} fill="none" stroke="currentColor" strokeWidth={1.6} />;
    case "SC": return <path d={`M${x} ${y - s} L${x + s} ${y + s - 1} L${x - s} ${y + s - 1} Z`} fill="currentColor" />;
    case "IT": return <path d={`M${x} ${y - s} L${x + s} ${y} L${x} ${y + s} L${x - s} ${y} Z`} fill="currentColor" />;
    case "Intravesical": return <rect x={x - s} y={y - s} width={2 * s} height={2 * s} rx={s} fill="none" stroke="currentColor" strokeWidth={1.6} strokeDasharray="2 2" />;
    case "RT": return <rect x={x - s} y={y - s} width={2 * s} height={2 * s} fill="url(#dose-hatch)" stroke="currentColor" strokeWidth={1} />;
    default: return <rect x={x - s} y={y - s} width={2 * s} height={2 * s} rx={1.5} fill="currentColor" />;
  }
}

export function DoseScheduleDiagram({ components, cycleDays, cycles, totalWeeks, compact = false, className = "" }: DoseScheduleProps) {
  const labelW = compact ? LABEL_W_COMPACT : LABEL_W;
  const days = Math.max(1, cycleDays);
  const width = labelW + days * CELL + PAD * 2;
  const headerH = compact ? 14 : 20;
  const height = headerH + components.length * ROW + PAD * 2 + (compact ? 0 : 6);
  const dayX = (d: number) => labelW + PAD + (d - 1) * CELL + CELL / 2;
  const routes = [...new Set(components.map((k) => k.route))];
  const cycleNote = cycles.match(/^\d+/) ? `${days}-day cycle × ${cycles}` : `${days}-day cycle, ${cycles}`;

  return (
    <figure className={`min-w-0 ${className}`}>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Dose schedule: ${cycleNote}. ${components.map((k) => `${k.name} on day${k.days.length > 1 ? "s" : ""} ${k.days.join(", ")}`).join("; ")}.`} className="text-foreground block max-w-none">
          <defs>
            <pattern id="dose-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="4" stroke="currentColor" strokeWidth="1.2" /></pattern>
          </defs>
          {/* Day ruler with week ticks. */}
          {Array.from({ length: days }, (_, i) => i + 1).map((d) => {
            const weekStart = (d - 1) % 7 === 0;
            return (
              <g key={d}>
                <line x1={dayX(d) - CELL / 2} y1={headerH} x2={dayX(d) - CELL / 2} y2={height - PAD} stroke="currentColor" strokeOpacity={weekStart ? 0.35 : 0.1} strokeWidth={weekStart ? 1 : 0.5} />
                {(d === 1 || weekStart || d === days || (days <= 14) || d % 7 === 0) && <text x={dayX(d)} y={headerH - 6} textAnchor="middle" fontSize={compact ? 8 : 9} fill="currentColor" fillOpacity={0.7} className="tabular-nums">{d}</text>}
              </g>
            );
          })}
          <line x1={labelW + PAD + days * CELL} y1={headerH} x2={labelW + PAD + days * CELL} y2={height - PAD} stroke="currentColor" strokeOpacity={0.35} />
          {components.map((k, i) => {
            const y = headerH + i * ROW + ROW / 2 + PAD;
            const span = infusionSpan(k);
            return (
              <g key={`${k.name}-${i}`}>
                {!compact && <text x={labelW - 4} y={y + 3.5} textAnchor="end" fontSize={10} fill="currentColor"><title>{`${k.name}: ${k.dose}, ${ROUTE_LABEL[k.route]}`}</title>{k.name.length > 24 ? `${k.name.slice(0, 23)}…` : k.name}</text>}
                <line x1={labelW + PAD} y1={y} x2={labelW + PAD + days * CELL} y2={y} stroke="currentColor" strokeOpacity={0.08} />
                {span && <rect x={dayX(span[0]) - CELL / 2 + 2} y={y - 5} width={(span[1] - span[0] + 1) * CELL - 4} height={10} rx={3} fill="currentColor" fillOpacity={0.25} stroke="currentColor" strokeWidth={1} />}
                {k.route === "PO" && k.days.length > 3 && !span && (
                  <rect x={dayX(Math.min(...k.days)) - CELL / 2 + 2} y={y - 5} width={(Math.max(...k.days) - Math.min(...k.days) + 1) * CELL - 4} height={10} rx={5} fill="none" stroke="currentColor" strokeWidth={1.2} strokeDasharray={k.days.every((d, j) => j === 0 || d === k.days[j - 1] + 1) ? undefined : "3 3"} />
                )}
                {k.days.map((d) => (span && d !== span[0]) || (k.route === "PO" && k.days.length > 3) ? null : <Mark key={d} route={k.route} x={dayX(d)} y={y} />)}
              </g>
            );
          })}
        </svg>
      </div>
      {!compact && (
        <figcaption className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
          <span className="text-foreground font-medium">{cycleNote}{totalWeeks ? ` (about ${totalWeeks} weeks)` : ""}</span>
          {routes.map((r) => (
            <span key={r} className="inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="-7 -7 14 14" className="text-foreground"><defs><pattern id="dose-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="4" stroke="currentColor" strokeWidth="1.2" /></pattern></defs><Mark route={r} x={0} y={0} /></svg>
              {ROUTE_LABEL[r]}
            </span>
          ))}
          {components.some((k) => k.infusionHours) && <span className="inline-flex items-center gap-1.5"><span className="inline-block h-2.5 w-6 rounded-sm border border-current bg-current/25" /> Continuous infusion</span>}
          {components.some((k) => k.route === "PO" && k.days.length > 3) && <span className="inline-flex items-center gap-1.5"><span className="inline-block h-2.5 w-6 rounded-full border border-current" /> Daily oral course</span>}
        </figcaption>
      )}
    </figure>
  );
}

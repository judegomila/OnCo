import type { KmArm } from "@/data/km-curves";

export const SERIES_PALETTE = ["#b91c1c", "#2563eb", "#7c3aed", "#0d9488"];

const W = 600, H = 320, L = 46, R = 18, T = 18, B = 44;
const niceMax = (t: number) => Math.max(12, Math.ceil(t / 12) * 12);

/**
 * Kaplan-Meier style survival chart drawn from published landmark estimates. Step lines join the
 * landmarks (each arm starts at 100% at time zero); the true curve between landmarks is not shown, so
 * the points are marked and labelled. Dashed guides mark the median where the source reports one.
 * Plain SVG, server-renderable; wrap with ChartExport for downloads.
 */
export function KMChart({ arms, title, annotation, maxMonths, yLabel = "Alive or event-free (%)" }: { arms: KmArm[]; title?: string; annotation?: string; maxMonths?: number; yLabel?: string }) {
  const tmax = niceMax(maxMonths ?? Math.max(...arms.flatMap((a) => [...a.points.map((p) => p[0]), a.median ?? 0]), 12));
  const x = (t: number) => L + ((W - L - R) * t) / tmax;
  const y = (s: number) => T + ((H - T - B) * (100 - s)) / 100;
  const xTicks = tmax <= 36 ? [0, 6, 12, 18, 24, 30, 36].filter((t) => t <= tmax) : Array.from({ length: tmax / 12 + 1 }, (_, i) => i * 12);
  const path = (pts: Array<[number, number]>) => {
    let d = `M${x(0)},${y(100)}`, s = 100;
    for (const [t, v] of pts) { d += ` H${x(t)} V${y(v)}`; s = v; }
    return { d, last: s };
  };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`${title ?? "Survival"}: ${arms.map((a) => `${a.name} ${a.points.map((p) => `${p[1]}% at ${p[0]} months`).join(", ")}`).join("; ")}`}>
      {/* grid */}
      {[0, 25, 50, 75, 100].map((s) => <line key={s} x1={L} x2={W - R} y1={y(s)} y2={y(s)} stroke="currentColor" strokeOpacity={s === 50 ? 0.18 : 0.08} strokeDasharray={s === 50 ? "3 3" : undefined} />)}
      {xTicks.map((t) => <line key={t} x1={x(t)} x2={x(t)} y1={y(100)} y2={y(0)} stroke="currentColor" strokeOpacity={0.06} />)}
      {/* axes */}
      <line x1={L} x2={W - R} y1={y(0)} y2={y(0)} stroke="currentColor" strokeOpacity={0.5} />
      <line x1={L} x2={L} y1={y(100)} y2={y(0)} stroke="currentColor" strokeOpacity={0.5} />
      {[0, 25, 50, 75, 100].map((s) => <text key={s} x={L - 6} y={y(s)} textAnchor="end" dominantBaseline="middle" fontSize={10} fill="currentColor" fillOpacity={0.7}>{s}</text>)}
      {xTicks.map((t) => <text key={t} x={x(t)} y={y(0) + 14} textAnchor="middle" fontSize={10} fill="currentColor" fillOpacity={0.7}>{t}</text>)}
      <text x={(L + W - R) / 2} y={H - 8} textAnchor="middle" fontSize={11} fill="currentColor" fillOpacity={0.75}>Months from randomisation</text>
      <text transform={`translate(12 ${(T + H - B) / 2}) rotate(-90)`} textAnchor="middle" fontSize={11} fill="currentColor" fillOpacity={0.75}>{yLabel}</text>
      {/* medians */}
      {arms.map((a, i) => a.median !== undefined && a.median <= tmax ? (
        <g key={`m${i}`} stroke={SERIES_PALETTE[i % SERIES_PALETTE.length]} strokeOpacity={0.55} strokeDasharray="4 3">
          <line x1={x(a.median)} x2={x(a.median)} y1={y(50)} y2={y(0)} />
        </g>
      ) : null)}
      {/* curves */}
      {arms.map((a, i) => {
        const c = SERIES_PALETTE[i % SERIES_PALETTE.length];
        const { d } = path(a.points);
        return (
          <g key={i}>
            <path d={d} fill="none" stroke={c} strokeWidth={2} strokeLinejoin="round" />
            {a.points.map(([t, v], k) => (
              <g key={k}>
                <circle cx={x(t)} cy={y(v)} r={3.2} fill={c} />
                <text x={x(t)} y={y(v) + (i % 2 === 0 ? -8 : 14)} textAnchor="middle" fontSize={10} fontWeight={600} fill={c}>{v}%</text>
              </g>
            ))}
            {a.median !== undefined && a.median <= tmax && <text x={x(a.median)} y={y(0) - 4 - 11 * i} textAnchor="middle" fontSize={9.5} fill={c}>median {a.median} mo</text>}
          </g>
        );
      })}
      {/* legend */}
      {arms.map((a, i) => (
        <g key={`l${i}`} transform={`translate(${W - R - 6} ${T + 4 + i * 14})`}>
          <rect x={-10} y={-5} width={10} height={3} fill={SERIES_PALETTE[i % SERIES_PALETTE.length]} />
          <text x={-14} y={0} textAnchor="end" fontSize={10.5} fill="currentColor" fillOpacity={0.85}>{a.name.length > 38 ? a.name.slice(0, 37).trimEnd() + "…" : a.name}</text>
        </g>
      ))}
      {annotation && <text x={W - R - 6} y={T + 4 + arms.length * 14 + 4} textAnchor="end" fontSize={10} fill="currentColor" fillOpacity={0.6}>{annotation}</text>}
    </svg>
  );
}

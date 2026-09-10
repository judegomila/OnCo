import type { Trial } from "@/lib/schema";
import { endpointFamily, kmCurvesFor } from "@/data/km-curves";
import { ChartExport } from "./ChartExport";
import { KMChart, SERIES_PALETTE } from "./KMChart";

type Outcome = Trial["outcomes"][number];
const outcomeNote = (o: Outcome) => o.arms.map((a) => a.note).filter(Boolean).join(" · ");
const PALETTE = SERIES_PALETTE;
const hrText = (o: Outcome) => o.hr !== undefined ? `HR ${o.hr}${o.ci ? ` (${o.ci[0]}–${o.ci[1]})` : ""}` : "";

/** "Out of 100 people" dot grid for one arm of a percent endpoint. */
function DotGrid({ pct, color, label, n }: { pct: number; color: string; label: string; n?: number }) {
  const filled = Math.round(Math.min(100, Math.max(0, pct)));
  return (
    <div className="min-w-[180px]">
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <span className="text-sm font-medium truncate" title={label}>{label}</span>
        <span className="text-sm tabular-nums"><span className="font-semibold">{pct}</span><span className="text-muted"> of 100</span></span>
      </div>
      <svg viewBox="0 0 200 40" className="w-full h-auto" role="img" aria-label={`${label}: ${pct} out of 100`}>
        {Array.from({ length: 100 }, (_, i) => {
          const col = i % 25, row = Math.floor(i / 25);
          return <circle key={i} cx={4 + col * 8} cy={5 + row * 10} r={3} fill={i < filled ? color : "currentColor"} className={i < filled ? "" : "text-foreground/15"} />;
        })}
      </svg>
      {n !== undefined && <div className="text-[11px] text-muted mt-0.5">n = {n.toLocaleString()}</div>}
    </div>
  );
}

/** Paired horizontal bars for a time-to-event endpoint (median months), drawn as one SVG so it exports with the card. */
function MonthBars({ o }: { o: Outcome }) {
  const max = Math.max(...o.arms.map((a) => a.value ?? 0), 1);
  const ROW = 24, LABEL = 150, VAL = 70, W = 480, H = o.arms.length * ROW;
  const barW = W - LABEL - VAL - 12;
  const unit = o.unit ?? "months";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`${o.endpoint}: ${o.arms.map((a) => `${a.name} ${a.value !== undefined ? `${a.value} ${unit}` : a.note ?? "not reported"}`).join("; ")}`}>
      {o.arms.map((a, i) => {
        const y = i * ROW;
        const w = a.value !== undefined ? (a.value / max) * barW : 0;
        return (
          <g key={i}>
            <text x={LABEL - 8} y={y + ROW / 2} textAnchor="end" dominantBaseline="middle" fontSize={12} fill="currentColor" fillOpacity={0.9}>{a.name.length > 24 ? a.name.slice(0, 23).trimEnd() + "…" : a.name}</text>
            <rect x={LABEL} y={y + 6} width={barW} height={ROW - 12} rx={3} fill="currentColor" fillOpacity={0.08} />
            {w > 0 && <rect x={LABEL} y={y + 6} width={w} height={ROW - 12} rx={3} fill={PALETTE[i % PALETTE.length]} />}
            <text x={LABEL + barW + 8} y={y + ROW / 2} dominantBaseline="middle" fontSize={12} fill="currentColor" fillOpacity={0.9} style={{ fontVariantNumeric: "tabular-nums" }}>{a.value !== undefined ? `${a.value} ${unit === "months" ? "mo" : unit}` : (a.note ?? "—")}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function Pictogram({ o, exportable = true }: { o: Outcome; exportable?: boolean }) {
  const hasValues = o.arms.some((a) => a.value !== undefined);
  const body = (
    <>
      {!hasValues && <p className="text-sm text-muted">{outcomeNote(o) || "Numbers not yet public."}</p>}
      {hasValues && o.unit === "%" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {o.arms.map((a, i) => a.value !== undefined ? <DotGrid key={i} pct={a.value} color={PALETTE[i % PALETTE.length]} label={a.name} n={a.n} /> : <div key={i} className="text-sm text-muted">{a.name}: {a.note ?? "—"}</div>)}
        </div>
      )}
      {hasValues && o.unit !== "%" && <MonthBars o={o} />}
    </>
  );
  return (
    <div className="card p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <div className="font-medium">{o.endpoint}{o.primary && <span className="chip ml-2 bg-foreground/5">primary</span>}</div>
        <div className="text-xs text-muted tabular-nums">{hrText(o)}{o.p && <> · p {o.p.startsWith("<") || o.p.startsWith("=") ? o.p : `= ${o.p}`}</>}</div>
      </div>
      {hasValues && exportable ? <ChartExport title={o.endpoint} source={o.source ?? "trial publication (see outcome source)"} filename={`outcome-${o.endpoint}`}>{body}</ChartExport> : body}
      {hasValues && outcomeNote(o) && <p className="text-xs text-muted mt-2">{outcomeNote(o)}</p>}
      {o.source && <a className="text-xs underline text-muted mt-2 inline-block" href={o.source} rel="noopener">Source</a>}
    </div>
  );
}

/** Published landmark survival curves for a trial, paired with the outcome that reports the hazard ratio for the same endpoint family. */
export function SurvivalCurves({ t }: { t: Trial }) {
  const curves = kmCurvesFor(t.id);
  if (!curves.length) return null;
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <h3 className="font-medium">Survival over time</h3>
        <p className="text-xs text-muted">Step lines join published landmark estimates; the true curve between them is not shown.</p>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {curves.map((c, i) => {
          const match = t.outcomes.find((o) => endpointFamily(o.endpoint) === c.family && o.hr !== undefined);
          return (
            <div key={i} className="card p-4">
              <div className="font-medium mb-2">{c.endpoint}</div>
              <ChartExport title={`${t.name}: ${c.endpoint}`} source={c.sources[0]} filename={`${t.id}-${c.family}-curve`}>
                <KMChart arms={c.arms} title={`${t.name} ${c.endpoint}`} annotation={match ? hrText(match) : undefined} />
              </ChartExport>
              {c.note && <p className="text-xs text-muted mt-2">{c.note}</p>}
              <p className="text-xs text-muted mt-1">{c.sources.map((s, k) => <a key={k} className="underline mr-2" href={s} rel="noopener">Source {c.sources.length > 1 ? k + 1 : ""}</a>)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** All outcomes for a trial as pictograms (primary first), survival curves where published, and a compact table. */
export function TrialOutcomes({ t }: { t: Trial }) {
  if (!t.outcomes.length) return <p className="text-sm text-muted">No structured outcomes recorded yet{t.replication ? `: ${t.replication}` : "."}</p>;
  const sorted = [...t.outcomes].sort((a, b) => Number(!!b.primary) - Number(!!a.primary));
  return (
    <div className="space-y-4">
      {t.enrolled && <p className="text-sm text-muted">{t.enrolled.toLocaleString()} participants enrolled.</p>}
      <div className="grid gap-3 lg:grid-cols-2">{sorted.map((o, i) => <Pictogram key={i} o={o} />)}</div>
      <SurvivalCurves t={t} />
      <OutcomeTable t={t} />
      {t.replication && <div className="card p-4 text-sm"><div className="kicker mb-1">Replication</div>{t.replication}</div>}
    </div>
  );
}

export function OutcomeTable({ t }: { t: Trial }) {
  if (!t.outcomes.length) return null;
  return (
    <div className="overflow-x-auto">
      <table className="onco">
        <thead><tr><th>Endpoint</th><th>Arm</th><th>n</th><th>Value</th><th>HR (95% CI)</th><th>p</th><th>Source</th></tr></thead>
        <tbody>
          {t.outcomes.flatMap((o, oi) => o.arms.map((a, ai) => (
            <tr key={`${oi}-${ai}`}>
              {ai === 0 ? <td rowSpan={o.arms.length} className="font-medium">{o.endpoint}{o.primary && <span className="chip ml-1 bg-foreground/5">primary</span>}</td> : null}
              <td>{a.name}</td>
              <td className="tabular-nums text-muted">{a.n?.toLocaleString() ?? "—"}</td>
              <td className="tabular-nums">{a.value !== undefined ? `${a.value}${o.unit === "%" ? "%" : o.unit ? ` ${o.unit}` : ""}` : (a.note ?? "—")}</td>
              {ai === 0 ? <td rowSpan={o.arms.length} className="tabular-nums text-muted">{o.hr !== undefined ? `${o.hr}${o.ci ? ` (${o.ci[0]}–${o.ci[1]})` : ""}` : "—"}</td> : null}
              {ai === 0 ? <td rowSpan={o.arms.length} className="tabular-nums text-muted">{o.p ?? "—"}</td> : null}
              {ai === 0 ? <td rowSpan={o.arms.length}>{o.source ? <a className="underline text-xs" href={o.source} rel="noopener">link</a> : <span className="text-muted">—</span>}</td> : null}
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
}

/** One-line summary of the primary endpoint for cards and tables. */
export function primaryOutcomeSummary(t: Trial): string | undefined {
  const o = t.outcomes.find((x) => x.primary) ?? t.outcomes[0];
  if (!o) return undefined;
  const vals = o.arms.filter((a) => a.value !== undefined).map((a) => `${a.value}${o.unit === "%" ? "%" : o.unit ? ` ${o.unit}` : ""}`);
  const hr = o.hr !== undefined ? `, HR ${o.hr}` : "";
  return vals.length ? `${o.endpoint}: ${vals.join(" vs ")}${hr}` : `${o.endpoint}: ${outcomeNote(o) || "pending"}`;
}

export function TrialOutcomeSummary({ t }: { t: Trial }) {
  const s = primaryOutcomeSummary(t);
  return s ? <span className="text-sm text-muted">{s}</span> : null;
}

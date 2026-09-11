import type { Trial } from "@/lib/schema";
import { endpointTypeNote, explainPrimary, explainTrial, type EndpointType } from "@/lib/trial-explain";
import { Tip } from "./Tip";

const TYPE_LABEL: Record<EndpointType, string> = { os: "survival endpoint", surrogate: "surrogate endpoint", response: "response endpoint", other: "other endpoint" };
const TYPE_CLASS: Record<EndpointType, string> = {
  os: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-200 dark:border-emerald-900",
  surrogate: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/30 dark:text-amber-200 dark:border-amber-900",
  response: "bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/30 dark:text-sky-200 dark:border-sky-900",
  other: "bg-foreground/5 text-muted border-border",
};

/** Chip naming what kind of endpoint this is, with a hover explaining why it matters. */
export function EndpointTypeChip({ type }: { type: EndpointType }) {
  return (
    <Tip title={TYPE_LABEL[type][0].toUpperCase() + TYPE_LABEL[type].slice(1)} text={endpointTypeNote(type)}>
      <span className={`chip border cursor-help ${TYPE_CLASS[type]}`}>{TYPE_LABEL[type]}</span>
    </Tip>
  );
}

/**
 * "In plain words": every structured outcome of a trial as sentences a person without statistics can read.
 * Absolute differences per 100 people, rough numbers needed to treat, medians as midpoints, and the
 * caveats (surrogate endpoints, who was enrolled, biomarker selection). Server-safe; sits above the pictograms.
 */
export function TrialExplainer({ trial, compact = false }: { trial: Trial; compact?: boolean }) {
  if (!trial.outcomes.length) return null;
  const items = explainTrial(trial);
  // Caveats repeated across every outcome (endpoint-agnostic ones) are shown once at the bottom.
  const shared = items.length > 1 ? items[0].explanation.caveats.filter((c) => items.every((x) => x.explanation.caveats.includes(c))) : [];
  return (
    <div className="card p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <div>
          <div className="kicker">In plain words</div>
          <div className="font-semibold mt-0.5">What these results mean for people, not percentages</div>
        </div>
        {trial.enrolled !== undefined && <span className="text-xs text-muted tabular-nums">{trial.enrolled.toLocaleString()} people took part</span>}
      </div>
      <div className="space-y-4">
        {items.map(({ outcome, explanation }, i) => {
          const own = explanation.caveats.filter((c) => !shared.includes(c));
          return (
            <div key={i} className={i > 0 ? "border-t border-border pt-4" : ""}>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="font-medium">{outcome.endpoint}</span>
                {outcome.primary && <span className="chip bg-foreground/5">primary</span>}
                <EndpointTypeChip type={explanation.endpointType} />
              </div>
              <ul className="space-y-1 text-[15px] leading-relaxed">
                {explanation.sentences.map((s, j) => <li key={j}>{s}</li>)}
              </ul>
              {!compact && own.length > 0 && (
                <ul className="mt-2 space-y-1 text-sm text-muted list-disc pl-5">
                  {own.map((c, j) => <li key={j}>{c}</li>)}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      {!compact && shared.length > 0 && (
        <div className="mt-4 border-t border-border pt-3">
          <div className="kicker mb-1">Caveats</div>
          <ul className="space-y-1 text-sm text-muted list-disc pl-5">{shared.map((c, j) => <li key={j}>{c}</li>)}</ul>
        </div>
      )}
      <p className="text-xs text-muted mt-4">Numbers are from the trial as recorded here; see the source links in the table below. This is orientation, not medical advice: ask your team how closely the trial population matches you.</p>
    </div>
  );
}

/** One plain sentence for the primary endpoint, for tables and cards. */
export function TrialExplainerInline({ trial, className = "" }: { trial: Pick<Trial, "outcomes" | "setting" | "enrolled">; className?: string }) {
  const s = explainPrimary(trial);
  return s ? <span className={`text-sm ${className}`}>{s}</span> : null;
}

import { confidence, type Confidence } from "@/data/confidence";

/**
 * Probability range for speculative content. Looks up `src/data/confidence.ts` by key
 * (entity id, or `<roadmapId>#<stepIndex>`), or takes an explicit value (e.g. an entity's
 * own `confidence` field). Renders nothing when there is no estimate.
 */
export function ConfidenceChip({ id, value, compact = false }: { id?: string; value?: Confidence | null; compact?: boolean }) {
  const c = value ?? (id ? confidence[id] : undefined);
  if (!c) return null;
  const [lo, hi] = c.probability;
  const mid = (lo + hi) / 2;
  const tone = mid >= 0.6 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200" : mid >= 0.35 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200" : "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200";
  const pct = (x: number) => `${Math.round(x * 100)}%`;
  return (
    <span className={`inline-flex flex-wrap items-center gap-2 ${compact ? "" : "text-xs"}`} title={`${c.by}, ${c.on}${c.note ? ` — ${c.note}` : ""}`}>
      <span className={`chip ${tone}`}>
        <span className="tabular-nums">{pct(lo)}–{pct(hi)}</span>
        <span className="opacity-70 font-normal">likely</span>
      </span>
      {!compact && <span className="text-muted">{c.by}, {c.on}{c.note && <> · {c.note}</>}</span>}
    </span>
  );
}

/** A short explanation used once per page where chips appear. */
export function ConfidenceLegend() {
  return (
    <p className="text-xs text-muted">
      Probability ranges are named estimates that the claim is borne out on roughly a five-year horizon. They are meant to be argued with: propose a revision with your name and reasoning via a pull request to <code>src/data/confidence.ts</code>.
    </p>
  );
}

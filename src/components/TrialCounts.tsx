import trialIndex from "../../public/trials/index.json";

type IndexEntry = { query: string; total: number; byPhase: Record<string, number>; byStatus: Record<string, number>; recruiting: number; fetched: string };
const INDEX = trialIndex as Record<string, IndexEntry>;

const PHASE_LABEL: Record<string, string> = { PHASE1: "Phase 1", PHASE2: "Phase 2", PHASE3: "Phase 3", PHASE4: "Phase 4", EARLY_PHASE1: "Early phase 1", NA: "N/A" };

/**
 * Phase 2/3 study counts for a product from ClinicalTrials.gov (weekly refresh via scripts/fetch-trials.ts).
 * Server component; renders nothing if the product has no fetched record.
 */
export function TrialCounts({ drugId }: { drugId: string }) {
  const e = INDEX[drugId];
  if (!e || e.total === 0) return null;
  const searchUrl = `https://clinicaltrials.gov/search?intr=${encodeURIComponent(e.query)}&aggFilters=phase:2%203`;
  const phases = Object.entries(e.byPhase).filter(([k]) => k === "PHASE2" || k === "PHASE3").sort();
  return (
    <div className="card p-4 text-sm">
      <div className="flex items-baseline justify-between gap-2">
        <div className="kicker">ClinicalTrials.gov · phase 2/3</div>
        <span className="text-xs text-muted">refreshed {e.fetched}</span>
      </div>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span><span className="text-2xl font-semibold tabular-nums">{e.total}</span> <span className="text-muted">studies</span></span>
        <span><span className="font-semibold tabular-nums">{e.recruiting}</span> <span className="text-muted">recruiting</span></span>
        {phases.map(([k, n]) => <span key={k}><span className="font-semibold tabular-nums">{n}</span> <span className="text-muted">{PHASE_LABEL[k] ?? k}</span></span>)}
      </div>
      <a className="underline text-muted text-xs mt-2 inline-block" href={searchUrl} rel="noopener">Search “{e.query}” on ClinicalTrials.gov →</a>
      <div className="text-[11px] text-muted mt-1">Counts are from a name search and may include unrelated studies; up to 100 studies are summarised.</div>
    </div>
  );
}

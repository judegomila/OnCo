import Link from "next/link";
import { readPublicJson } from "@/lib/feed-meta";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { statusClass } from "@/lib/text";

/** Shape written by scripts/fetch-trials.ts (public/trials/changes.json). */
export type TrialChange = { detected: string; drugId: string; nct: string; title: string; kind: "status" | "results-posted" | "primary-completion" | "new-study"; from?: string; to?: string; phases: string[]; sponsor?: string; primaryCompletion?: string };
export type TrialChanges = { fetched: string; previousFetched?: string; keepDays: number; changes: TrialChange[] };

export const readTrialChanges = () => readPublicJson<TrialChanges>("trials/changes.json");

const KIND_LABEL: Record<TrialChange["kind"], string> = { status: "Status change", "results-posted": "Results posted", "primary-completion": "Primary completion moved", "new-study": "New phase 2/3 study" };
const KIND_TONE: Record<TrialChange["kind"], string> = { status: "phase-3", "results-posted": "approved", "primary-completion": "phase-2", "new-study": "planned" };
const STATUS_WORDS: Record<string, string> = { RECRUITING: "recruiting", NOT_YET_RECRUITING: "not yet recruiting", ENROLLING_BY_INVITATION: "enrolling by invitation", ACTIVE_NOT_RECRUITING: "active, not recruiting", COMPLETED: "completed", TERMINATED: "terminated", WITHDRAWN: "withdrawn", SUSPENDED: "suspended", UNKNOWN: "unknown" };
const word = (s?: string) => (s ? STATUS_WORDS[s] ?? s.toLowerCase().replace(/_/g, " ") : "");

function calendarIssueUrl(c: TrialChange, drugName: string): string {
  const p = new URLSearchParams({
    template: "suggest-edit.yml",
    title: `edit: calendar · ${c.nct} ${KIND_LABEL[c.kind].toLowerCase()}`,
    body: `Registry change detected ${c.detected} for ${c.title} (${c.nct}, ${drugName}): ${KIND_LABEL[c.kind]}${c.from || c.to ? ` ${word(c.from)} -> ${word(c.to)}` : ""}.\n\nSource: https://clinicaltrials.gov/study/${c.nct}\n\nProposed: add or update the readout calendar entry in src/data/calendar.ts, or update the trial record.`,
  });
  return `https://github.com/judegomila/OnCo/issues/new?${p.toString()}`;
}

/**
 * Auto-detected registry changes for /calendar/: what ClinicalTrials.gov changed since the previous weekly
 * snapshot, shown as "expected" events pending editorial review. Phase 3 first, then by detection date.
 */
export function TrialChangesPanel({ limit = 40 }: { limit?: number }) {
  const snap = readTrialChanges();
  if (!snap) return <p className="card p-4 text-sm text-muted">Registry change detection starts with the next weekly refresh; the first run only records a baseline to compare against.</p>;
  const g = graph();
  const interesting = snap.changes
    .filter((c) => c.kind !== "new-study" || c.phases.includes("PHASE3"))
    .filter((c) => c.kind !== "status" || ["COMPLETED", "TERMINATED", "WITHDRAWN", "SUSPENDED", "ACTIVE_NOT_RECRUITING", "RECRUITING"].includes(c.to ?? ""))
    .sort((a, b) => Number(b.phases.includes("PHASE3")) - Number(a.phases.includes("PHASE3")) || b.detected.localeCompare(a.detected))
    .slice(0, limit);
  const trialByNct = new Map(g.kind("trial").filter((t) => t.nct).map((t) => [t.nct!, t]));
  return (
    <div className="card p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-1">
        <h2 className="font-semibold">Registry changes awaiting review</h2>
        <span className="text-xs text-muted">snapshot {snap.fetched}{snap.previousFetched ? ` vs ${snap.previousFetched}` : ""} · {snap.changes.length} changes in {snap.keepDays} days</span>
      </div>
      <p className="text-sm text-muted mb-3">Detected automatically by diffing weekly ClinicalTrials.gov snapshots for every product: status moves, newly posted results and moved primary completion dates. These are expected events, not confirmed ones, until an editor checks them and adds a dated calendar entry.</p>
      {interesting.length === 0 ? <p className="text-sm text-muted">No changes recorded yet.</p> : (
        <ul className="divide-y divide-border text-sm">
          {interesting.map((c, i) => {
            const t = trialByNct.get(c.nct);
            const d = g.get(c.drugId);
            return (
              <li key={`${c.nct}-${c.kind}-${i}`} className="py-2 grid gap-1 sm:grid-cols-[6rem_1fr]">
                <span className="font-mono text-xs text-muted">{c.detected}</span>
                <span>
                  <span className={`chip mr-1.5 ${statusClass(KIND_TONE[c.kind])}`}>{KIND_LABEL[c.kind]}</span>
                  {t ? <Link href={routeFor(t)} className="font-medium hover:underline">{t.name}</Link> : <a href={`https://clinicaltrials.gov/study/${c.nct}`} rel="noopener" className="font-medium hover:underline">{c.title}</a>}
                  <span className="text-muted"> · {c.nct}{c.phases.length ? ` · ${c.phases.map((p) => p.replace("PHASE", "phase ")).join("/")}` : ""}</span>
                  {(c.from || c.to) && <span className="block text-muted">{c.kind === "primary-completion" ? `${c.from} to ${c.to}` : `${word(c.from)}${c.from ? " to " : ""}${word(c.to)}`}</span>}
                  <span className="block mt-0.5 flex flex-wrap items-center gap-2 text-xs">
                    {d && <Link href={routeFor(d)} className="chip border bg-card border-border hover:bg-foreground/5">{d.name}</Link>}
                    <a href={`https://clinicaltrials.gov/study/${c.nct}`} rel="noopener" className="underline text-muted">Registry</a>
                    <a href={calendarIssueUrl(c, d?.name ?? c.drugId)} rel="noopener" className="underline text-muted">Propose a calendar entry</a>
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

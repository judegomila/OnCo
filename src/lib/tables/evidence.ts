import { graph } from "@/lib/graph";
import { phaseLabel, routeFor } from "@/lib/schema";
import { trialEvidence, evidenceLabel } from "@/lib/evidence";
import { primaryOutcomeSummary } from "@/components/Pictogram";
import { STATUS_LABEL, statusClass } from "@/lib/text";
import type { StaticColumn, StaticRow } from "@/components/filters/StaticTable";

/** The /evidence/ table: every trial ranked by evidence strength. The page carries the first page; the file the rest. */
export const EVIDENCE_TABLE = "evidence";

export const EVIDENCE_COLUMNS: StaticColumn[] = [
  { key: "rank", label: "#", sortable: true, numeric: true, className: "text-muted" },
  { key: "trial", label: "Trial", className: "min-w-[220px]" },
  { key: "phase", label: "Phase", filterable: true, sortable: true, numeric: false, className: "text-muted" },
  { key: "result", label: "Result", filterable: true, order: ["positive", "negative", "mixed", "ongoing", "withdrawn"].map((s) => STATUS_LABEL[s] ?? s) },
  { key: "endpoint", label: "Primary endpoint", hide: "hidden md:table-cell", className: "text-xs text-muted max-w-md" },
  { key: "enrolled", label: "Enrolled", sortable: true, numeric: true, hide: "hidden sm:table-cell", className: "text-muted" },
  { key: "score", label: "Score", sortable: true, numeric: true },
  { key: "strength", label: "Strength", filterable: true, order: ["Strong", "Solid", "Emerging", "Preliminary"], className: "text-xs text-muted" },
];

/** Trials with their evidence score, best first (the table's default order: rank ascending). */
export function evidenceRanked() {
  return graph().kind("trial").map((t) => ({ t, ev: trialEvidence(t) })).sort((a, b) => b.ev.score - a.ev.score || a.t.name.localeCompare(b.t.name));
}

export function evidenceRows(ranked = evidenceRanked()): StaticRow[] {
  return ranked.map(({ t, ev }, i) => ({
    id: t.id,
    rank: i + 1,
    trial: { text: t.name, href: routeFor(t), strong: true, sub: t.setting },
    phase: phaseLabel(t.phase),
    result: t.status ? { text: STATUS_LABEL[t.status] ?? t.status, chip: statusClass(t.status) } : undefined,
    endpoint: primaryOutcomeSummary(t),
    enrolled: t.enrolled,
    score: { text: String(ev.score), v: ev.score, strong: true },
    strength: evidenceLabel(ev.score),
  }));
}

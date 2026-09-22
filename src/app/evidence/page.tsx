import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { graph } from "@/lib/graph";
import { phaseLabel, routeFor } from "@/lib/schema";
import { trialEvidence, evidenceLabel } from "@/lib/evidence";
import { Pictogram, primaryOutcomeSummary } from "@/components/Pictogram";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { STATUS_LABEL, statusClass } from "@/lib/text";
import { StaticTable, type StaticColumn, type StaticRow } from "@/components/filters/StaticTable";

export const metadata: Metadata = pageMeta({ title: "Evidence", description: "Every trial ranked by evidence strength, with its primary endpoint drawn as people out of 100, and the scoring formula disclosed.", path: "/evidence/" });

const COLUMNS: StaticColumn[] = [
  { key: "rank", label: "#", sortable: true, numeric: true, className: "text-muted" },
  { key: "trial", label: "Trial", className: "min-w-[220px]" },
  { key: "phase", label: "Phase", filterable: true, sortable: true, numeric: false, className: "text-muted" },
  { key: "result", label: "Result", filterable: true, order: ["positive", "negative", "mixed", "ongoing", "withdrawn"].map((s) => STATUS_LABEL[s] ?? s) },
  { key: "endpoint", label: "Primary endpoint", hide: "hidden md:table-cell", className: "text-xs text-muted max-w-md" },
  { key: "enrolled", label: "Enrolled", sortable: true, numeric: true, hide: "hidden sm:table-cell", className: "text-muted" },
  { key: "score", label: "Score", sortable: true, numeric: true },
  { key: "strength", label: "Strength", filterable: true, order: ["Strong", "Solid", "Emerging", "Preliminary"], className: "text-xs text-muted" },
];

export default function EvidencePage() {
  const g = graph();
  const rows = g.kind("trial").map((t) => ({ t, ev: trialEvidence(t) })).sort((a, b) => b.ev.score - a.ev.score || a.t.name.localeCompare(b.t.name));
  const withOutcomes = rows.filter((r) => r.t.outcomes.some((o) => o.arms.some((a) => a.value !== undefined)));
  const table: StaticRow[] = rows.map(({ t, ev }, i) => ({
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
  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Evidence"
        lede="Every trial in OnCo ranked by a disclosed evidence-strength score, with its primary endpoint drawn as people out of 100 or as median months. The score measures how much and what kind of evidence exists, not how large the benefit is." />
      <Container className="pb-16">
        <details className="card p-4 text-sm mb-8">
          <summary className="cursor-pointer font-medium">How the score is computed</summary>
          <ul className="mt-2 space-y-1 text-muted">
            <li>Phase: 3 → 30 · 2/3 → 22 · 2 → 15 · 1/2 → 8 · 1 → 4 · observational or platform → 10</li>
            <li>Size: 5 × log10(enrolled), capped at 20 (100 people → 10, 1,000 → 15, 10,000 → 20)</li>
            <li>Primary endpoint: overall survival → 20 · time to progression or recurrence → 14 · surrogate (response, pCR, detection) → 8</li>
            <li>Result: positive → 15 · mixed → 6 · ongoing → 0 · negative or withdrawn → −20</li>
            <li>Replication: an independent or consistent confirming study → 10</li>
            <li>A linked product is approved → 5</li>
          </ul>
          <p className="mt-2 text-muted">Products score from their status tier, their best linked trial, and approvals; technologies and targets from their status and best linked product. Full code in <code>src/lib/evidence.ts</code>.</p>
        </details>

        <h2 className="text-lg font-semibold mb-3">Primary endpoints as pictures</h2>
        <div className="grid gap-3 lg:grid-cols-2 mb-10">
          {withOutcomes.slice(0, 12).map(({ t }) => {
            const o = t.outcomes.find((x) => x.primary && x.arms.some((a) => a.value !== undefined)) ?? t.outcomes.find((x) => x.arms.some((a) => a.value !== undefined))!;
            return <div key={t.id}><div className="text-sm mb-1"><Link href={routeFor(t)} className="font-medium hover:underline">{t.name}</Link><span className="text-muted"> · {t.setting.split(":")[0]}</span></div><Pictogram o={o} /></div>;
          })}
        </div>

        <h2 className="text-lg font-semibold mb-3">All trials by evidence strength</h2>
        <StaticTable rows={table} columns={COLUMNS} noun="trials" url defaultSort={{ key: "rank", dir: 1 }} />
      </Container>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { trialEvidence, evidenceLabel } from "@/lib/evidence";
import { Pictogram, primaryOutcomeSummary } from "@/components/Pictogram";
import { Container, GroupKicker, PageHeader, StatusChip } from "@/components/ui";

export const metadata: Metadata = { title: "Evidence", description: "Every trial ranked by evidence strength, with its primary endpoint drawn as people out of 100, and the scoring formula disclosed." };

export default function EvidencePage() {
  const g = graph();
  const rows = g.kind("trial").map((t) => ({ t, ev: trialEvidence(t) })).sort((a, b) => b.ev.score - a.ev.score || a.t.name.localeCompare(b.t.name));
  const withOutcomes = rows.filter((r) => r.t.outcomes.some((o) => o.arms.some((a) => a.value !== undefined)));
  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Evidence, trial by trial"
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
        <div className="card overflow-x-auto">
          <table className="onco">
            <thead><tr><th>#</th><th>Trial</th><th>Phase</th><th>Result</th><th className="hidden md:table-cell">Primary endpoint</th><th className="hidden sm:table-cell">Enrolled</th><th>Score</th></tr></thead>
            <tbody>
              {rows.map(({ t, ev }, i) => (
                <tr key={t.id}>
                  <td className="tabular-nums text-muted">{i + 1}</td>
                  <td className="min-w-[220px]"><Link href={routeFor(t)} className="font-medium hover:underline">{t.name}</Link><div className="text-xs text-muted line-clamp-1">{t.setting}</div></td>
                  <td className="text-muted">Phase {t.phase}</td>
                  <td><StatusChip status={t.status} /></td>
                  <td className="hidden md:table-cell text-xs text-muted max-w-md">{primaryOutcomeSummary(t) ?? "—"}</td>
                  <td className="hidden sm:table-cell tabular-nums text-muted">{t.enrolled?.toLocaleString() ?? "—"}</td>
                  <td className="tabular-nums"><span className="font-semibold">{ev.score}</span><span className="text-muted text-xs"> {evidenceLabel(ev.score)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
}

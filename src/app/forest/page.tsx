import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { trialEvidence } from "@/lib/evidence";
import { endpointFamily } from "@/data/km-curves";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { ForestPlot, type ForestRow } from "@/components/ForestPlot";
import { FAMILY_LABEL, settingClass } from "@/lib/forest";

export const metadata: Metadata = pageMeta({ title: "Forest plot: hazard ratios across trials", description: "Every hazard ratio with its confidence interval in the OnCo trial corpus, side by side on one log axis. Filter by cancer, setting and endpoint; download the rows as CSV.", path: "/forest/" });

export default function ForestPage() {
  const g = graph();
  const rows: ForestRow[] = [];
  for (const t of g.kind("trial")) {
    const ev = trialEvidence(t).score;
    t.outcomes.forEach((o, i) => {
      if (o.hr === undefined) return;
      const family = endpointFamily(o.endpoint);
      const n = o.arms.some((a) => a.n !== undefined) ? o.arms.reduce((a, b) => a + (b.n ?? 0), 0) : t.enrolled;
      rows.push({
        id: `${t.id}-${i}`, trial: t.name, route: routeFor(t), nct: t.nct, phase: t.phase, year: t.yearReported,
        cancers: t.cancers.map((id) => g.get(id)).filter((c): c is NonNullable<typeof c> => !!c).map((c) => ({ id: c.id, name: c.name })),
        setting: t.setting, settingClass: settingClass(t.setting),
        endpoint: o.endpoint, family, familyLabel: FAMILY_LABEL[family] ?? family, primary: !!o.primary,
        hr: o.hr, lo: o.ci?.[0], hi: o.ci?.[1], n, evidence: ev, arms: o.arms.map((a) => a.name).join(" vs "), source: o.source,
      });
    });
  }
  const trials = new Set(rows.map((r) => r.id.replace(/-\d+$/, ""))).size;
  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Forest plot"
        lede={`${rows.length} hazard ratios from ${trials} trials on one axis. A hazard ratio below 1 means the experimental arm did better on that endpoint; the line is the 95% confidence interval. Pick a cancer, a setting and an endpoint to see comparable trials side by side, then download the rows.`} />
      <Container className="pb-16">
        <ForestPlot rows={rows} />
        <section className="mt-10 max-w-3xl text-sm text-muted space-y-2">
          <h2 className="text-lg font-semibold text-foreground">How to read it</h2>
          <p>Each row is one endpoint from one trial, taken from the structured outcomes recorded in the corpus with the publication linked as its source. The square sits at the reported hazard ratio; its area grows with the number of participants in the arms (or the trial enrolment when arm sizes are not recorded), and its shade follows the trial&apos;s evidence score (phase, size, endpoint type, result, replication).</p>
          <p>Trials are not pooled and hazard ratios are not adjusted: a ratio from a placebo-controlled adjuvant trial is not directly comparable with one against an active comparator in the metastatic setting. Use the setting and endpoint filters to keep like with like, and open the trial page for the population, comparator and follow-up behind each number.</p>
        </section>
      </Container>
    </>
  );
}

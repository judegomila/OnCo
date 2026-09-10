import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { ScorecardTable, type ScorecardRow } from "@/components/ScorecardTable";
import { scoreCompanies, TRIALS_FETCHED } from "@/lib/company-score";
import { companyFinancials, CURRENCY_SYMBOL } from "@/data/company-financials";

export const metadata: Metadata = pageMeta({ title: "Company scorecards", description: "Every company in the corpus ranked by a disclosed score: approved products, phase 3 assets, targets, modalities, regions, regulatory momentum, registry trials and failures, with financial snapshots.", path: "/scorecards/" });

export default function ScorecardsPage() {
  const g = graph();
  const asOf = new Date().toISOString().slice(0, 10);
  const scored = scoreCompanies(asOf);
  const rows: ScorecardRow[] = scored.map((s) => {
    const fin = companyFinancials.find((f) => f.companyId === s.company.id);
    return {
      id: s.company.id, name: s.company.name, route: routeFor(s.company), country: s.company.country, companyType: s.company.companyType, ticker: s.company.ticker,
      rank: s.rank, score: s.score,
      approved: s.approved, phase3: s.phase3, early: s.early, targets: s.targets, modalities: s.modalities, regions: s.regions, recentEvents: s.recentEvents, registryTrials: s.registryTrials, failures: s.failures,
      points: { approved: s.approvedPoints, phase3: s.phase3Points, early: s.earlyPoints, targets: s.targetPoints, modalities: s.modalityPoints, regions: s.regionPoints, momentum: s.momentumPoints, trials: s.trialPoints, failures: s.failurePenalty },
      financials: fin ? { fiscalYear: fin.fiscalYear, currency: fin.currency, symbol: CURRENCY_SYMBOL[fin.currency], oncologyRevenue: fin.oncologyRevenue, totalRevenue: fin.totalRevenue, rdSpend: fin.rdSpend, cash: fin.cash, top: fin.topProducts.map((p) => { const e = p.drugId ? g.get(p.drugId) : undefined; return { name: p.name, sales: p.sales, route: e ? routeFor(e) : undefined, note: p.note }; }), sourceLabel: fin.source.label, sourceUrl: fin.source.url, note: fin.note } : undefined,
    };
  });
  const withProducts = rows.filter((r) => r.approved + r.phase3 + r.early + r.failures > 0).length;
  return (
    <>
      <PageHeader kicker={<GroupKicker id="who" />} title="Company scorecards"
        lede={`${rows.length} companies ranked by one disclosed formula, ${withProducts} of them with products in the corpus. The score rewards approved and late-stage products, breadth of targets and modalities, regions reached, recent regulatory activity and registry trial volume, and penalises recorded failures. Financial snapshots come from annual reports for ${companyFinancials.length} public companies.`} />
      <Container className="pb-16">
        <ScorecardTable rows={rows} />
        <section className="grid md:grid-cols-2 gap-6 text-sm mt-10">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">The formula</h2>
            <pre className="text-xs leading-relaxed whitespace-pre-wrap font-mono">{`score = 6 x approved products
      + 3 x phase 3 products
      + 1 x phase 1 or 2 products
      + 2 x distinct targets (max 20 targets)
      + 2 x distinct modality classes
      + 1 x regions with an approved product
      + 2 x regulatory events in the last 24 months (max 20 points)
      + round(2 x sqrt(registry phase 2/3 studies)) (max 30 points)
      - 3 x products recorded as negative or withdrawn`}</pre>
            <p>&ldquo;Products&rdquo; are every product linked to the company in this corpus in either direction, so the score is also a measure of how well we cover a company. Registry counts are ClinicalTrials.gov phase 2 and 3 studies naming each product, fetched {TRIALS_FETCHED}. Regulatory events come from the dated timelines on product pages. Approval regions combine the product records with the <Link href="/regulatory/regions/" className="underline">six-region matrix</Link>.</p>
            <p>Like the <Link href="/institutions/" className="underline">institution ranking</Link>, this is deliberately simple. It does not use revenue, market value or pipeline quality, and a diagnostics or device company will score low because most of its products are not phased trials.</p>
          </div>
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">Financial snapshots</h2>
            <p>Figures are as reported in each company&rsquo;s annual report, Form 10-K or 20-F for the fiscal year shown, in the reporting currency, rounded to one decimal in billions. Oncology revenue appears only where the company reports an oncology aggregate; otherwise the largest oncology products are listed. R&amp;D is the company total across all therapy areas. Cash follows each company&rsquo;s own grouping (some include marketable securities, some do not), so compare with care.</p>
            <p>Re-check every figure against the linked filing before relying on it. Add a year or a company in <code className="text-xs">src/data/company-financials.ts</code>; unsourced numbers are not accepted.</p>
          </div>
        </section>
      </Container>
    </>
  );
}

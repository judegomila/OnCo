import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { funding } from "@/data/funding";
import { graph } from "@/lib/graph";
import { routeFor, type Entity } from "@/lib/schema";
import { ChipList, Container, GroupKicker, PageHeader } from "@/components/ui";

export const metadata: Metadata = pageMeta({ title: "Funding flows", description: "Where the money in the war on cancer comes from: government, charity, EU, and industry, with sources.", path: "/funding/" });

export default function Funding() {
  const g = graph();
  const types: Array<[FundingType, string]> = [["government", "Government"], ["eu", "European Union"], ["charity", "Charities and foundations"], ["industry", "Industry"]];
  type FundingType = (typeof funding)[number]["type"];
  return (
    <>
      <PageHeader kicker={<GroupKicker id="who" />} title="Funding flows"
        lede="Who pays for cancer research and care innovation. Figures are as published by each funder, in their own currency and fiscal year, each with a source link. Unsourced figures are omitted. This is a starting map, not an audit." />
      <Container className="pb-16">
        <div className="prose-onco text-[15px] leading-relaxed max-w-3xl mb-8">
          <p>Two facts frame everything else. The US National Cancer Institute is the largest single funder of cancer research, at roughly seven billion dollars a year, and it pays for the infrastructure the rest of the field depends on: the designated centres, the cooperative groups, and the registries. Industry spending on cancer medicines is an order of magnitude larger and is what pays for late-stage trials; that is why the products on this site cluster where the market is, and why cooperative groups and charities matter for the questions industry will not fund, such as de-escalation, exercise, and comparisons between approved drugs.</p>
        </div>
        {types.map(([t, label]) => {
          const rows = funding.filter((f) => f.type === t);
          if (!rows.length) return null;
          return (
            <section key={t} className="mt-8">
              <h2 className="text-lg font-semibold mb-3">{label}</h2>
              <div className="overflow-x-auto card">
                <table className="onco">
                  <thead><tr><th>Funder</th><th>Amount</th><th>What</th><th>Year</th><th>Linked</th><th>Source</th></tr></thead>
                  <tbody>
                    {rows.map((f) => {
                      const refs = f.refs.map((id) => g.get(id)).filter((x): x is Entity => !!x);
                      return (
                        <tr key={f.id}>
                          <td className="font-medium min-w-[200px]">{f.funder}<div className="text-xs text-muted">{f.country}</div></td>
                          <td className="font-semibold tabular-nums min-w-[140px]">{f.amount}</td>
                          <td className="text-muted min-w-[260px]">{f.what}{f.note && <div className="text-xs mt-1">{f.note}</div>}</td>
                          <td className="tabular-nums text-muted">{f.year}</td>
                          <td className="min-w-[160px]">{refs.length ? <ChipList items={refs} /> : <span className="text-muted">-</span>}</td>
                          <td><a className="underline text-xs" href={f.source} rel="noopener">source</a></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
        <p className="text-sm text-muted mt-8">Missing a funder? Add a sourced row to <code>src/data/funding.ts</code>. See <Link className="underline" href="/gaps/">gaps</Link> for other places to help, and <Link className="underline" href={routeFor(g.must("nci"))}>the NCI page</Link> for what its budget buys.</p>
      </Container>
    </>
  );
}

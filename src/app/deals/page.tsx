import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor, type Entity } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { RefChips } from "@/components/RefChips";
import { DealFlow } from "@/components/DealFlow";
import { regionForCountry, type DealFlowItem } from "@/lib/deal-regions";
import { deals, DEAL_TYPE_LABEL, type Party } from "@/data/deals";
import { statusClass } from "@/lib/text";

export const metadata: Metadata = pageMeta({ title: "Deal and licensing map", description: "Licences, acquisitions and co-development deals that moved oncology assets between companies: date, parties, asset, upfront and total value, territories, with a flow diagram by region and year.", path: "/deals/" });

function PartyName({ p }: { p: Party }) {
  const e = p.id ? graph().get(p.id) : undefined;
  return e ? <Link href={routeFor(e)} className="hover:underline">{e.name}</Link> : <span>{p.name}</span>;
}

export default function DealsPage() {
  const g = graph();
  const country = (p: Party) => { const e = p.id ? g.get(p.id) : undefined; return e && e.kind === "company" ? e.country : p.country; };
  const flows: DealFlowItem[] = deals.map((d) => ({ id: d.id, year: Number(d.date.slice(0, 4)), from: regionForCountry(country(d.from)), to: regionForCountry(country(d.to)), type: DEAL_TYPE_LABEL[d.type], label: `${d.from.name} to ${d.to.name}: ${d.assetText}` }));
  const sorted = [...deals].sort((a, b) => b.date.localeCompare(a.date));
  const chinaOut = flows.filter((f) => f.from === "China" && f.to !== "China").length;
  const acquisitions = deals.filter((d) => d.type === "acquisition").length;
  const years = new Map<string, typeof sorted>();
  for (const d of sorted) { const y = d.date.slice(0, 4); years.set(y, [...(years.get(y) ?? []), d]); }
  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Deal and licensing map"
        lede={`${deals.length} deals since ${sorted[sorted.length - 1].date.slice(0, 4)}: ${acquisitions} acquisitions and ${deals.length - acquisitions} licences or co-development agreements, ${chinaOut} of them China-out. Every row has the announcement, the parties, the asset, what was paid up front and the headline total, with territories. The chord shows where assets move between regions.`} />
      <Container className="pb-16">
        <DealFlow flows={flows} />
        <div className="mt-10 space-y-10">
          {[...years.entries()].map(([year, list]) => (
            <section key={year}>
              <h2 className="text-lg font-semibold mb-3">{year} <span className="text-sm font-normal text-muted">{list.length} {list.length === 1 ? "deal" : "deals"}</span></h2>
              <div className="card overflow-x-auto">
                <table className="onco">
                  <thead><tr><th>Date</th><th>From</th><th>To</th><th>Asset</th><th>Type</th><th>Upfront</th><th>Total</th><th>Territories</th><th>Source</th></tr></thead>
                  <tbody>
                    {list.map((d) => {
                      const assets = d.assets.map((id) => g.get(id)).filter((x): x is Entity => !!x);
                      return (
                        <tr key={d.id} id={d.id}>
                          <td className="font-mono text-xs text-muted whitespace-nowrap">{d.date}{d.status === "announced" && <div className="text-[10px] uppercase tracking-wide">announced</div>}</td>
                          <td className="min-w-[140px]"><PartyName p={d.from} /></td>
                          <td className="min-w-[140px]"><PartyName p={d.to} /></td>
                          <td className="min-w-[240px] text-sm">{d.assetText}{assets.length > 0 && <RefChips ids={assets.map((a) => a.id)} className="mt-1" />}{d.refs?.length ? <RefChips ids={d.refs} className="mt-1" /> : null}{d.note && <div className="text-xs text-muted mt-1">{d.note}</div>}</td>
                          <td><span className={`chip ${statusClass(d.type === "acquisition" ? "approved" : d.type === "co-development" ? "phase-3" : "phase-2")}`}>{DEAL_TYPE_LABEL[d.type]}</span></td>
                          <td className="tabular-nums whitespace-nowrap font-medium">{d.upfront ?? <span className="text-muted font-normal">not disclosed</span>}</td>
                          <td className="tabular-nums whitespace-nowrap">{d.total ?? <span className="text-muted">not disclosed</span>}</td>
                          <td className="text-xs text-muted min-w-[200px]">{d.territories}</td>
                          <td><a className="underline text-xs" href={d.source} rel="noopener">source</a></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
        <section className="grid md:grid-cols-2 gap-6 text-sm mt-10">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">Reading the numbers</h2>
            <p>&ldquo;Upfront&rdquo; is cash at signing plus any stated non-contingent payments. &ldquo;Total&rdquo; is the headline &ldquo;up to&rdquo; figure including development, regulatory and sales milestones, most of which are never paid. For acquisitions the total is the equity value announced; contingent value rights are noted. Amounts are as announced and are not adjusted for inflation or currency.</p>
            <p>Where a figure was not disclosed the cell says so. Nothing is estimated.</p>
          </div>
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">What the flow shows</h2>
            <p>The chord counts deals by the region of the seller or licensor and the buyer or licensee, using the company&rsquo;s headquarters. The China-to-United States and China-to-Europe ribbons are the China-out ADC and bispecific wave of 2022 to 2025; Japan-to-United States is the Daiichi Sankyo DXd platform; United States-to-United States is mostly acquisitions.</p>
            <p>Add a deal in <code className="text-xs">src/data/deals.ts</code> with the announcement as the source. Companies outside the corpus are named with a country code so they still appear in the flow.</p>
          </div>
        </section>
      </Container>
    </>
  );
}

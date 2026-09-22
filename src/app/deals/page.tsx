import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor, type Entity } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { DealFlow } from "@/components/DealFlow";
import { DEAL_REGIONS, regionForCountry, type DealFlowItem } from "@/lib/deal-regions";
import { deals, DEAL_TYPE_LABEL, type Party } from "@/data/deals";
import { statusClass } from "@/lib/text";
import { StaticTable, type CellObj, type StaticColumn, type StaticRow } from "@/components/filters/StaticTable";

export const metadata: Metadata = pageMeta({ title: "Deals and licences", description: "Licences, acquisitions and co-development deals that moved oncology assets between companies: date, parties, asset, upfront and total value, territories, with a flow diagram by region and year.", path: "/deals/" });

const COLUMNS: StaticColumn[] = [
  { key: "date", label: "Date", sortable: true, numeric: false, className: "whitespace-nowrap" },
  { key: "year", label: "Year", filterable: true, hide: "hidden xl:table-cell" },
  { key: "from", label: "From", className: "min-w-[140px]" },
  { key: "to", label: "To", className: "min-w-[140px]" },
  { key: "fromRegion", label: "From region", filterable: true, order: [...DEAL_REGIONS], hide: "hidden lg:table-cell" },
  { key: "toRegion", label: "To region", filterable: true, order: [...DEAL_REGIONS], hide: "hidden lg:table-cell" },
  { key: "asset", label: "Asset", className: "min-w-[240px] text-sm" },
  { key: "linked", label: "Linked", hide: "hidden md:table-cell", className: "min-w-[160px]" },
  { key: "type", label: "Type", filterable: true, order: Object.values(DEAL_TYPE_LABEL) },
  { key: "upfront", label: "Upfront", sortable: true, className: "whitespace-nowrap font-medium" },
  { key: "total", label: "Total", sortable: true, className: "whitespace-nowrap" },
  { key: "territories", label: "Territories", className: "text-xs text-muted min-w-[200px]", hide: "hidden md:table-cell" },
  { key: "source", label: "Source" },
];

/** A money string as announced ("$1.2B", "€400M", "up to $5bn") to a sortable number in millions of dollars-equivalent. */
function moneyValue(s?: string): number {
  if (!s) return -1;
  const m = s.replace(/,/g, "").match(/(\d+(?:\.\d+)?)\s*(bn|b|billion|m|million|k)?/i);
  if (!m) return -1;
  const n = parseFloat(m[1]);
  const unit = (m[2] ?? "").toLowerCase();
  return unit.startsWith("b") ? n * 1000 : unit === "k" ? n / 1000 : n;
}

export default function DealsPage() {
  const g = graph();
  const country = (p: Party) => { const e = p.id ? g.get(p.id) : undefined; return e && e.kind === "company" ? e.country : p.country; };
  const party = (p: Party): CellObj => { const e = p.id ? g.get(p.id) : undefined; return e ? { text: e.name, href: routeFor(e) } : { text: p.name }; };
  const flows: DealFlowItem[] = deals.map((d) => ({ id: d.id, year: Number(d.date.slice(0, 4)), from: regionForCountry(country(d.from)), to: regionForCountry(country(d.to)), type: DEAL_TYPE_LABEL[d.type], label: `${d.from.name} to ${d.to.name}: ${d.assetText}` }));
  const sorted = [...deals].sort((a, b) => b.date.localeCompare(a.date));
  const chinaOut = flows.filter((f) => f.from === "China" && f.to !== "China").length;
  const acquisitions = deals.filter((d) => d.type === "acquisition").length;
  const rows: StaticRow[] = sorted.map((d) => {
    const assets = d.assets.map((id) => g.get(id)).filter((x): x is Entity => !!x);
    const refs = (d.refs ?? []).map((id) => g.get(id)).filter((x): x is Entity => !!x);
    return {
      id: d.id,
      date: { text: d.date, v: d.date, mono: true, muted: true, sub: d.status === "announced" ? "announced" : d.status === "terminated" ? "terminated" : undefined },
      year: d.date.slice(0, 4),
      from: party(d.from),
      to: party(d.to),
      fromRegion: regionForCountry(country(d.from)),
      toRegion: regionForCountry(country(d.to)),
      asset: { text: d.assetText, sub: d.note },
      linked: [...assets, ...refs].map((e) => ({ text: e.name, href: routeFor(e), chip: "border border-border bg-card text-xs" })),
      type: { text: DEAL_TYPE_LABEL[d.type], chip: statusClass(d.type === "acquisition" ? "approved" : d.type === "co-development" ? "phase-3" : "phase-2") },
      upfront: d.upfront ? { text: d.upfront, v: moneyValue(d.upfront) } : { text: "not disclosed", v: -1, muted: true, className: "font-normal" },
      total: d.total ? { text: d.total, v: moneyValue(d.total) } : { text: "not disclosed", v: -1, muted: true },
      territories: d.territories,
      source: { text: "source", href: d.source, ext: true, className: "text-xs" },
    };
  });
  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Deals and licences"
        lede={`${deals.length} deals since ${sorted[sorted.length - 1].date.slice(0, 4)}: ${acquisitions} acquisitions and ${deals.length - acquisitions} licences or co-development agreements, ${chinaOut} of them China-out. Every row has the announcement, the parties, the asset, what was paid up front and the headline total, with territories. The chord shows where assets move between regions; filter the table from any column header.`} />
      <Container className="pb-16">
        <DealFlow flows={flows} />
        <div className="mt-10">
          <StaticTable rows={rows} columns={COLUMNS} noun="deals" url defaultSort={{ key: "date", dir: -1 }} />
        </div>
        <section className="grid md:grid-cols-2 gap-6 text-sm mt-10">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">Reading the numbers</h2>
            <p>&ldquo;Upfront&rdquo; is cash at signing plus any stated non-contingent payments. &ldquo;Total&rdquo; is the headline &ldquo;up to&rdquo; figure including development, regulatory and sales milestones, most of which are never paid. For acquisitions the total is the equity value announced; contingent value rights are noted. Amounts are as announced and are not adjusted for inflation or currency; sorting by amount treats every currency alike.</p>
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

import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { funding } from "@/data/funding";
import { graph } from "@/lib/graph";
import { routeFor, type Entity } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { StaticTable, type StaticColumn, type StaticRow } from "@/components/filters/StaticTable";

export const metadata: Metadata = pageMeta({ title: "Funding flows", description: "Where the money in the war on cancer comes from: government, charity, EU, and industry, with sources.", path: "/funding/" });

type FundingType = (typeof funding)[number]["type"];
const TYPE_LABEL: Record<FundingType, string> = { government: "Government", eu: "European Union", charity: "Charities and foundations", industry: "Industry" };
const COLUMNS: StaticColumn[] = [
  { key: "funder", label: "Funder", className: "min-w-[200px]" },
  { key: "type", label: "Type", filterable: true, order: Object.values(TYPE_LABEL) },
  { key: "country", label: "Country", filterable: true, hide: "hidden lg:table-cell" },
  { key: "amount", label: "Amount", className: "font-semibold tabular-nums min-w-[140px]" },
  { key: "what", label: "What", className: "text-muted min-w-[260px]" },
  { key: "year", label: "Year", filterable: true, sortable: true, numeric: true, className: "text-muted" },
  { key: "linked", label: "Linked", className: "min-w-[160px]" },
  { key: "source", label: "Source" },
];

export default function Funding() {
  const g = graph();
  const rows: StaticRow[] = funding.map((f) => {
    const refs = f.refs.map((id) => g.get(id)).filter((x): x is Entity => !!x);
    return {
      id: f.id,
      funder: { text: f.funder, strong: true },
      type: TYPE_LABEL[f.type],
      country: f.country,
      amount: f.amount,
      what: { text: f.what, sub: f.note },
      year: String(f.year),
      linked: refs.map((e) => ({ text: e.name, href: routeFor(e), chip: "border border-border bg-card text-xs" })),
      source: { text: "source", href: f.source, ext: true, className: "text-xs" },
    };
  });
  return (
    <>
      <PageHeader kicker={<GroupKicker id="who" />} title="Funding flows"
        lede="Who pays for cancer research and care innovation. Figures are as published by each funder, in their own currency and fiscal year, each with a source link. Unsourced figures are omitted. This is a starting map, not an audit." />
      <Container className="pb-16">
        <div className="prose-onco text-[15px] leading-relaxed max-w-3xl mb-8">
          <p>Two facts frame everything else. The US National Cancer Institute is the largest single funder of cancer research, at roughly seven billion dollars a year, and it pays for the infrastructure the rest of the field depends on: the designated centres, the cooperative groups, and the registries. Industry spending on cancer medicines is an order of magnitude larger and is what pays for late-stage trials; that is why the products on this site cluster where the market is, and why cooperative groups and charities matter for the questions industry will not fund, such as de-escalation, exercise, and comparisons between approved drugs.</p>
        </div>
        <StaticTable rows={rows} columns={COLUMNS} noun="funders" url defaultSort={{ key: "year", dir: -1 }} />
        <p className="text-sm text-muted mt-8">Missing a funder? Add a sourced row to <code>src/data/funding.ts</code>. See <Link className="underline" href="/gaps/">gaps</Link> for other places to help, and <Link className="underline" href={routeFor(g.must("nci"))}>the NCI page</Link> for what its budget buys.</p>
      </Container>
    </>
  );
}

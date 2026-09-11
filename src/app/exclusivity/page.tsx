import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor, type Entity } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { ExclusivityTimeline, type ExclusivityItem } from "@/components/ExclusivityTimeline";
import { exclusivity, earliestExpiry, ORANGE_BOOK, PURPLE_BOOK } from "@/data/exclusivity";
import { modalityClass } from "@/lib/company-score";

export const metadata: Metadata = pageMeta({ title: "Exclusivity expiry", description: "When cancer drugs lose exclusivity: key patent expiry and regulatory exclusivity by region, 2026 to 2040, with the biosimilar and generic entrants already launched or in development.", path: "/exclusivity/" });

export default function ExclusivityPage() {
  const g = graph();
  const items: ExclusivityItem[] = exclusivity.map((e) => {
    const d = g.must(e.drugId);
    if (d.kind !== "drug") throw new Error(`${e.drugId} is not a drug`);
    const companies = (g.neighbours(d.id).get("company") ?? []).map((c: Entity) => ({ id: c.id, name: c.name, route: routeFor(c) }));
    return { drugId: d.id, name: d.name, brand: d.brand, route: routeFor(d), modality: modalityClass(d.modality), companies, rows: e.rows, entrants: e.entrants, note: e.note };
  });
  const before2030 = exclusivity.filter((e) => { const y = earliestExpiry(e); return y !== undefined && y >= 2026 && y <= 2030; }).length;
  const withEntrants = exclusivity.filter((e) => e.entrants.some((x) => x.status === "launched")).length;
  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Exclusivity expiry"
        lede={`${exclusivity.length} products with a sourced exclusivity floor or recorded entrants. ${before2030} lose a key patent or regulatory exclusivity between 2026 and 2030, and ${withEntrants} already face launched biosimilars or generics. Bars end at the expiry year; markers are entrants. Filter by modality, company and region.`} />
      <Container className="pb-16">
        <ExclusivityTimeline items={items} />
        <section className="grid md:grid-cols-2 gap-6 text-sm mt-10">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">Earliest dates, not forecasts</h2>
            <p>The patent year is the expiry of the key compound or composition patent as the marketing company discloses it, including supplementary protection certificates and patent term extensions where stated. Later formulation, method-of-use and manufacturing patents often extend practical exclusivity, and litigation or settlements can move entry earlier or later. Treat every bar as the earliest date competition could arrive, not the date it will.</p>
            <p>Regulatory exclusivity is deterministic: 12 years from first US licensure for biologics (the <a href={PURPLE_BOOK} rel="noopener" className="underline">Purple Book</a>), 5 years for new chemical entities (the <a href={ORANGE_BOOK} rel="noopener" className="underline">Orange Book</a>), and 8 plus 2 years in the EU. It is the floor beneath the patent floor.</p>
          </div>
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">Why this matters</h2>
            <p>Loss of exclusivity is what turns a list price into a generic price and what forces the next generation of products to launch on time. The <Link href="/coverage/us/" className="underline">US paying-for-care</Link> and <Link href="/coverage/uk/" className="underline">NHS</Link> pages show what each product costs today; this page says how long that lasts.</p>
            <p>Add a product in <code className="text-xs">src/data/exclusivity.ts</code> with the 10-K, annual report or regulator page as the source. Products with no public disclosure are left out rather than guessed.</p>
          </div>
        </section>
      </Container>
    </>
  );
}

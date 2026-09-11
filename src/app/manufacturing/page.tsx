import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor, type Entity } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { ManufacturingMap, type SiteRow } from "@/components/ManufacturingMap";
import { manufacturingSites, CAPABILITY_LABEL } from "@/data/manufacturing";

export const metadata: Metadata = pageMeta({ title: "Manufacturing map", description: "Where ADCs are conjugated, cell therapies and viral vectors are made, and medical isotopes are produced: contract manufacturers and in-house sites on a world map, with capabilities, customers and sources.", path: "/manufacturing/" });

export default function ManufacturingPage() {
  const g = graph();
  const link = (e: Entity) => ({ id: e.id, name: e.name, route: routeFor(e) });
  const sites: SiteRow[] = manufacturingSites.map((s) => {
    const op = s.operatorId ? g.get(s.operatorId) : undefined;
    const bn = s.bottleneckId ? g.get(s.bottleneckId) : undefined;
    return {
      id: s.id, name: s.name, operator: s.operator, operatorRoute: op ? routeFor(op) : undefined, ownership: s.ownership,
      city: s.city, country: s.country, lat: s.lat, lng: s.lng, capabilities: s.capabilities, capacity: s.capacity,
      customers: s.customers.map((id) => g.get(id)).filter((x): x is Entity => !!x).map(link),
      drugs: (s.drugs ?? []).map((id) => g.get(id)).filter((x): x is Entity => !!x).map(link),
      bottleneck: bn ? link(bn) : undefined, source: s.source,
    };
  });
  const counts = new Map<string, number>();
  for (const s of manufacturingSites) for (const c of s.capabilities) counts.set(c, (counts.get(c) ?? 0) + 1);
  const cdmo = manufacturingSites.filter((s) => s.ownership === "cdmo").length;
  return (
    <>
      <PageHeader kicker={<GroupKicker id="who" />} title="Manufacturing map"
        lede={`${manufacturingSites.length} sites, ${cdmo} of them contract manufacturers: ${counts.get("adc-conjugation") ?? 0} conjugate ADCs, ${counts.get("cell-therapy") ?? 0} make cell therapies, ${counts.get("radioisotope") ?? 0} produce medical isotopes. Isotopes had a supply tracker; conjugation suites, vector plants and CAR-T factories did not. This is the start of one.`} />
      <Container className="pb-16">
        <ManufacturingMap sites={sites} />
        <section className="grid md:grid-cols-2 gap-6 text-sm mt-10">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">Why capacity is a bottleneck</h2>
            <p>An ADC needs three supply chains (antibody, payload-linker, conjugation) and only a handful of sites can conjugate at commercial scale with highly potent payloads. Autologous CAR-T is made one patient at a time, so slots, vector and trained staff set how many patients can be treated: see <Link href={routeFor(g.must("b-manufacturing-cell-therapy"))} className="underline">the cell therapy manufacturing bottleneck</Link>. Radioligand therapy is limited by isotope production and same-week logistics: see the <Link href="/isotopes/" className="underline">isotope supply tracker</Link>.</p>
            <p>Most China-origin ADCs licensed to Western companies were made at WuXi XDC; the Singapore site and the new Lonza, Samsung Biologics and Abzena suites are the supply-chain response.</p>
          </div>
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">Sourcing</h2>
            <p>Each site links to the operator&rsquo;s own facility page or announcement. Capacity is described in the operator&rsquo;s words; volumes appear only where they have been published. Customers are listed only for publicly announced relationships, so most contract sites show none. Coordinates are the city.</p>
            <p>Capabilities: {(Object.keys(CAPABILITY_LABEL) as Array<keyof typeof CAPABILITY_LABEL>).map((c) => CAPABILITY_LABEL[c]).join(", ")}. Add a site in <code className="text-xs">src/data/manufacturing.ts</code>.</p>
          </div>
        </section>
      </Container>
    </>
  );
}

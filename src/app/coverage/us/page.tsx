import type { Metadata } from "next";
import Link from "next/link";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { EntityBrowser, type BrowserRow, type ColDef, type FacetDef } from "@/components/EntityBrowser";
import { coverageUs, US_SYSTEM } from "@/data/coverage-us";

export const metadata: Metadata = {
  title: "Paying for cancer care in the United States",
  description: "Medicare Part B versus Part D, Medicare Advantage, Medicaid, commercial prior authorisation, the $2,000 Part D cap, price negotiation, 340B, clinical trial coverage and assistance programmes, plus a coverage record for each approved cancer product.",
};

const PART_LABEL: Record<string, string> = { B: "Part B", D: "Part D", "B or D": "Part B or D", "not covered": "Not covered", unknown: "Unknown" };
const PART_ORDER = ["Part B", "Part D", "Part B or D", "Not covered", "Unknown"];
const COMMERCIAL_ORDER = ["covered on label", "covered with prior authorisation", "step therapy common", "variable", "unknown"];
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const PART_TIPS: Record<string, string> = {
  "Part B": "Clinician-administered (infusion, injection, radiopharmaceutical, DME or lab test). Original Medicare pays 80%; the patient owes 20% with no cap unless Medigap applies.",
  "Part D": "Self-administered, usually oral. Covered by a Part D plan on the specialty tier; out-of-pocket capped at $2,000 (2025) / $2,100 (2026).",
  "Part B or D": "Oral anticancer drug with an injectable equivalent, or a product whose benefit depends on where it is given.",
  "Not covered": "Not FDA-approved, so no US coverage outside a clinical trial.",
};
const COMMERCIAL_TIPS: Record<string, string> = {
  "covered on label": "Usually paid without prior authorisation, typically a generic or a bundled surgical supply.",
  "covered with prior authorisation": "Paid for labelled and compendia-listed uses after the plan confirms diagnosis, biomarker and line of therapy.",
  "step therapy common": "Plans frequently require a cheaper alternative first (a biosimilar, generic imatinib, generic abiraterone).",
  variable: "Coverage differs materially between plans; some treat the product as investigational.",
};

export default function CoverageUsPage() {
  const g = graph();
  const approved = g.kind("drug").filter((d) => d.status === "approved");
  const covered = approved.filter((d) => coverageUs[d.id]);
  const missing = approved.length - covered.length;
  const pct = Math.round((100 * covered.length) / approved.length);
  const prices = Object.values(coverageUs).filter((c) => c.listPriceUsd).length;

  const rows: BrowserRow[] = Object.values(coverageUs).flatMap((c) => {
    const d = g.get(c.drugId);
    if (!d || d.kind !== "drug") return [];
    const part = PART_LABEL[c.medicare.part] ?? c.medicare.part;
    const assist = c.patientAssistance?.length ?? 0;
    return [{
      id: d.id, name: d.name, tldr: d.tldr, route: routeFor(d), molecule: d.id, modality: d.modality,
      sub: [d.brand, d.dosing?.route].filter(Boolean).join(" · "),
      facets: { medicare: [part], commercial: [c.commercial.typical], modality: [d.modality] },
      cols: {
        medicare: part,
        commercial: c.commercial.typical,
        price: c.listPriceUsd ? `${usd(c.listPriceUsd.value)} / ${c.listPriceUsd.per.split(",")[0]} (${c.listPriceUsd.year})` : undefined,
        assistance: assist ? `${assist} programme${assist === 1 ? "" : "s"}` : undefined,
        ncd: c.medicare.ncd ? `NCD ${c.medicare.ncd}` : undefined,
      },
      sortKeys: { price: c.listPriceUsd?.value ?? 0, assistance: assist },
    }];
  });

  const facets: FacetDef[] = [
    { key: "medicare", label: "Medicare part", searchable: false, width: "w-44", order: PART_ORDER },
    { key: "commercial", label: "Commercial pattern", searchable: false, width: "w-60", order: COMMERCIAL_ORDER },
  ];
  const columns: ColDef[] = [
    { key: "medicare", label: "Medicare", sortable: true, chip: true, valueTips: PART_TIPS, tip: "Which part of Original Medicare pays for the product." },
    { key: "commercial", label: "Commercial", sortable: true, hide: "hidden sm:table-cell", valueTips: COMMERCIAL_TIPS, tip: "What large commercial plans and PBMs typically do." },
    { key: "price", label: "List price", sortable: true, numeric: true, hide: "hidden md:table-cell", tip: "Published list (WAC) price with a source and year only; blank means no reliable public figure was recorded, not that the product is cheap." },
    { key: "assistance", label: "Assistance", sortable: true, numeric: true, hide: "hidden lg:table-cell", tip: "Manufacturer and charity programmes recorded for this product." },
    { key: "ncd", label: "NCD", hide: "hidden xl:table-cell", tip: "National coverage determination, where one exists." },
  ];

  return (
    <>
      <PageHeader kicker={<GroupKicker id="find" />} title="Paying for cancer care in the United States"
        lede={`How Medicare, Medicaid and commercial insurance pay for cancer treatment, in plain English first and detail second, then a coverage record for ${covered.length} of the ${approved.length} approved products in OnCo: which part of Medicare pays, what commercial plans usually require, published list prices where they exist, and where to find assistance.`} />
      <Container className="pb-16">
        <div className="card p-4 text-sm text-muted max-w-3xl border-amber-300/60 dark:border-amber-700/60">
          <div className="kicker mb-1">Read this first</div>
          <p>Not medical or financial advice. Coverage rules, formularies, prices and assistance funds change often and differ between plans; verify with your plan, your oncology practice&apos;s financial navigator, or a State Health Insurance Assistance Program counsellor before making decisions. List prices are shown only where a published figure with a source and year exists ({prices} products); net prices after rebates are usually lower, and what you pay depends on your plan.</p>
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-1">How the system works</h2>
          <p className="text-sm text-muted mb-4 max-w-3xl">Fifteen short explainers. The first paragraph is for anyone; the second is for people who want the mechanics.</p>
          <div className="grid gap-4 md:grid-cols-2">
            {US_SYSTEM.map((s) => (
              <article key={s.id} id={s.id} className="card p-5 flex flex-col">
                <h3 className="font-semibold leading-snug">{s.title}</h3>
                <p className="mt-2 text-sm">{s.plain}</p>
                <p className="mt-3 text-sm text-muted">{s.detail}</p>
                <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                  {s.links.map((l) => <li key={l.url}><a className="underline" href={l.url} rel="noopener">{l.label}</a></li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-baseline justify-between mb-1"><h2 className="text-lg font-semibold">Coverage by product</h2><span className="text-xs text-muted">{covered.length} of {approved.length} approved products ({pct}%)</span></div>
          <p className="text-sm text-muted mb-2 max-w-3xl">Filter by Medicare part or commercial pattern, sort by list price, and click through to the product page for the full record with sources and assistance links. Part B means a clinician gives it (20% coinsurance, uncapped in Original Medicare); Part D means you take it at home (capped at $2,000 in 2025 and $2,100 in 2026).</p>
          <p className="text-xs text-muted mb-4 max-w-3xl">Data gap: {missing} of the {approved.length} approved products in OnCo have no US coverage record yet. Most are newly approved (2025–2026) products whose Medicare coding and plan policies are still settling, or products approved outside the US. Add a record in <code>src/data/coverage-us.ts</code>; see <Link className="underline" href="/gaps/">gaps and bounties</Link>.</p>
          <EntityBrowser rows={rows} facets={facets} columns={columns} noun="products" hideStatus defaultSort={{ key: "name", dir: 1 }} />
        </section>
      </Container>
    </>
  );
}

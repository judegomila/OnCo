import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { regimens } from "@/data/regimens";
import { EMETOGENICITY_LABEL, EMETOGENICITY_TIP, GCSF_LABEL, GCSF_TIP, componentsLine, cycleSummary, intentLabel, numericCycles, regimenRoute, validateRegimens } from "@/lib/regimens";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { EntityBrowser, type BrowserRow, type ColDef, type FacetDef, type LinkItem } from "@/components/EntityBrowser";

export const metadata: Metadata = pageMeta({ title: "Regimen library", description: "Named chemotherapy, immunotherapy and targeted regimens with components, doses, days, cycle length, cycle count, emetogenicity and G-CSF need, filterable by cancer, setting and intent.", path: "/regimens/" });

const EMETO_ORDER = ["High (>90%)", "Moderate (30-90%)", "Low (10-30%)", "Minimal (<10%)"];
const GCSF_ORDER = ["Recommended", "Built into the protocol", "Consider (10-20% FN risk)", "Not routine"];

export default function RegimensPage() {
  validateRegimens();
  const g = graph();
  const rows: BrowserRow[] = regimens.map((r) => {
    const cancers = r.cancers.map((id) => g.must(id));
    const trials = (r.trials ?? []).map((id) => g.must(id));
    const components: LinkItem[] = r.components.map((k) => {
      const d = k.drugId ? g.get(k.drugId) : undefined;
      return d ? { label: k.name.split(" (")[0], href: routeFor(d), tip: `${k.dose} · ${d.tldr}` } : { label: k.name, href: regimenRoute(r), tip: k.dose };
    });
    const n = numericCycles(r.cycles);
    return {
      id: r.id, name: r.name, tldr: componentsLine(r), route: regimenRoute(r), sub: r.aka?.join(", "),
      facets: { cancer: cancers.map((c) => c.name), intent: [intentLabel(r)], emeto: [EMETOGENICITY_LABEL[r.emetogenicity]], gcsf: [GCSF_LABEL[r.gcsf]] },
      cols: {
        components, cycle: cycleSummary(r), setting: r.setting,
        cancers: cancers.map((c) => ({ facet: "cancer", value: c.name })),
        emeto: { facet: "emeto", value: EMETOGENICITY_LABEL[r.emetogenicity], label: r.emetogenicity[0].toUpperCase() + r.emetogenicity.slice(1) },
        gcsf: { facet: "gcsf", value: GCSF_LABEL[r.gcsf] },
        trials: trials.map((t) => ({ label: t.name, href: routeFor(t), tip: t.tldr })),
      },
      sortKeys: { cycle: r.cycleDays * (n ?? 99), emeto: EMETO_ORDER.indexOf(EMETOGENICITY_LABEL[r.emetogenicity]), gcsf: GCSF_ORDER.indexOf(GCSF_LABEL[r.gcsf]) },
    };
  });
  const facets: FacetDef[] = [
    { key: "cancer", label: "Cancer", width: "w-56" },
    { key: "intent", label: "Intent", searchable: false, order: ["Neoadjuvant", "Adjuvant", "Perioperative", "Chemoradiation", "Curative", "Induction", "Consolidation", "First line", "Maintenance", "Later line", "Conditioning"] },
    { key: "emeto", label: "Emetogenicity", searchable: false, order: EMETO_ORDER },
    { key: "gcsf", label: "G-CSF", searchable: false, order: GCSF_ORDER },
  ];
  const columns: ColDef[] = [
    { key: "components", label: "Components", tip: "Each drug in the regimen with its dose on hover. Links go to the product page when one exists." },
    { key: "cycle", label: "Cycle", sortable: true, numeric: true, tip: "How often a cycle repeats and how many cycles are planned. Open-ended regimens run until progression or intolerance." },
    { key: "cancers", label: "Cancers", hide: "hidden lg:table-cell" },
    { key: "setting", label: "Setting", hide: "hidden xl:table-cell", className: "max-w-xs text-xs", tip: "The clinical situation the regimen is used in, in protocol language." },
    { key: "emeto", label: "Emetogenicity", sortable: true, tip: EMETOGENICITY_TIP },
    { key: "gcsf", label: "G-CSF", sortable: true, hide: "hidden md:table-cell", tip: GCSF_TIP },
    { key: "trials", label: "Trials", hide: "hidden lg:table-cell", tip: "Trials in the corpus that established or extended the regimen." },
  ];
  const cancerCount = new Set(regimens.flatMap((r) => r.cancers)).size;
  return (
    <>
      <PageHeader kicker={<GroupKicker id="map" />} title="Regimen library"
        lede={`${regimens.length} named regimens across ${cancerCount} cancers: every component with its dose and days, the cycle length and count, emetogenic risk and whether G-CSF is given. Click a regimen for its calendar strip and sources. Reference values from the protocol or label, not a prescription.`} />
      <Container className="pb-16">
        <EntityBrowser rows={rows} facets={facets} columns={columns} noun="regimens" hideStatus defaultSort={{ key: "name", dir: 1 }} />
        <div className="mt-8 grid gap-6 md:grid-cols-2 text-sm">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">How to read a row</h2>
            <p>Components are the published protocol doses for a typical adult; hover a drug for its dose, click for its page. The cycle column gives the repeat interval and the planned count, so &ldquo;every 14 days × 12&rdquo; is six months. Emetogenicity follows the NCCN Antiemesis and MASCC-ESMO classes for the most emetogenic component; G-CSF follows the ASCO 2015 and NCCN febrile-neutropenia bands. Every regimen page cites its pivotal publication or the NCCN guideline that lists it.</p>
          </div>
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">What this is not</h2>
            <p>Not a prescribing system. Doses are adjusted for renal and hepatic function, age, prior toxicity and local protocol; several regimens exist in more than one published variant and the one shown is named in the source. Check the current label and your institution&rsquo;s protocol before treating. The <Link href="/calculators/" className="underline">calculators</Link> cover body surface area, carboplatin AUC and creatinine clearance; <Link href="/interactions/" className="underline">interactions</Link> flags the common drug-drug problems.</p>
          </div>
        </div>
      </Container>
    </>
  );
}

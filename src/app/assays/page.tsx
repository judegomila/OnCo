import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { EntityBrowser, type BrowserRow, type ColDef, type FacetDef } from "@/components/EntityBrowser";
import { assays } from "@/data/assays";
import { biomarkers } from "@/data/biomarkers";
import { RegulatoryClaims } from "@/components/ScopedEvidence";

export const metadata: Metadata = pageMeta({ title: "Companion diagnostics and assays", description: "Every companion diagnostic and key assay with its cut-off: PD-L1 CPS and TPS, HER2 IHC and ISH, EGFR, KRAS, BRAF, ALK, MSI, TMB, HRD, FLT3, FOLR1, CLDN18.2 and the multi-gene panels, linked to the drugs and cancers they gate.", path: "/assays/" });

const PLATFORM_TIPS: Record<string, string> = { IHC: "Immunohistochemistry: antibody staining scored by a pathologist.", "FISH/ISH": "In situ hybridisation: counts gene copies or breaks in the nucleus.", PCR: "Polymerase chain reaction for a fixed list of mutations; fast, cheap, narrow.", "NGS tissue": "Next-generation sequencing of a tumour sample across many genes.", "NGS plasma": "Sequencing of circulating tumour DNA from blood (liquid biopsy).", "Gene expression": "RNA-based signature scored as a continuous risk number.", "Germline NGS": "Sequencing of inherited DNA from blood or saliva.", Imaging: "A PET tracer or other imaging read-out used to select patients." };
const REG_TIPS: Record<string, string> = {
  "FDA CDx": "Approved by the FDA as a companion diagnostic: a test named for use with a particular drug. Each approval covers one cancer, one treatment, one kind of sample and one cut-off, so check the one that applies.",
  "FDA cleared": "Cleared by the FDA, but not as a companion test required for a drug. The clearance covers the use the maker stated.",
  "CE-IVD": "CE-marked for in vitro diagnostic use in Europe, for the use the maker states. The mark is about the test meeting the rules, not about whether it helps any one person.",
  LDT: "Laboratory-developed test: designed and run by one laboratory rather than sold as a kit. The laboratory can be certified without the test itself being approved as a product.",
  "Breakthrough device": "An FDA designation that speeds up review. It is not an approval.",
};

export default function AssaysPage() {
  const g = graph();
  const bm = new Map(biomarkers.map((b) => [b.id, b]));
  const rows: BrowserRow[] = assays.map((a) => {
    const ents = (ids: string[]) => ids.map((id) => g.get(id)).filter((x): x is NonNullable<typeof x> => !!x).map((x) => ({ label: x.name.split(" (")[0], href: routeFor(x), tip: x.tldr }));
    const targets = a.targets.map((id) => g.get(id)).filter((x): x is NonNullable<typeof x> => !!x);
    return {
      id: a.id, name: a.name, tldr: a.note ?? a.cutoff, route: `/assays/#${a.id}`, sub: a.vendor,
      facets: { platform: [a.platform], regulatory: [a.regulatory], target: targets.map((t) => t.name.split(" (")[0]), cancer: a.cancers.map((c) => g.get(c)?.name.split(" (")[0] ?? c) },
      cols: {
        analyte: a.analyte,
        cutoff: a.cutoff,
        platform: { facet: "platform", value: a.platform },
        regulatory: { facet: "regulatory", value: a.regulatory },
        approved: a.approved,
        drugs: ents(a.drugs),
        targets: targets.map((t) => ({ label: t.name.split(" (")[0], href: `/dossiers/${t.id}/`, tip: t.tldr })),
        cancers: ents(a.cancers),
        biomarkers: a.biomarkers.map((id) => bm.get(id)?.label ?? id).join("; "),
        source: [{ label: a.source.label.length > 30 ? "FDA CDx list" : a.source.label, href: a.source.url }],
      },
      sortKeys: { approved: a.approved ?? 0 },
    };
  });
  const facets: FacetDef[] = [
    { key: "platform", label: "Platform", searchable: false, width: "w-44" },
    { key: "regulatory", label: "Status", searchable: false, width: "w-48", order: ["FDA CDx", "FDA cleared", "CE-IVD", "Breakthrough device", "LDT"] },
    { key: "target", label: "Target", width: "w-48" },
    { key: "cancer", label: "Cancer", width: "w-52" },
  ];
  const columns: ColDef[] = [
    { key: "platform", label: "Platform", sortable: true, valueTips: PLATFORM_TIPS },
    { key: "analyte", label: "Analyte", hide: "hidden md:table-cell" },
    { key: "cutoff", label: "Cut-off", tip: "The result that counts as positive, from the label or the trial that set it. One test can carry different cut-offs for different cancers and treatments." },
    { key: "drugs", label: "Treatments it is used with", hide: "hidden sm:table-cell", tip: "Treatments this test is used to select people for. The cut-off that applies depends on the cancer and the treatment." },
    { key: "cancers", label: "Cancers", hide: "hidden lg:table-cell" },
    { key: "targets", label: "Target dossier", hide: "hidden xl:table-cell" },
    { key: "regulatory", label: "Status", sortable: true, valueTips: REG_TIPS, hide: "hidden md:table-cell" },
    { key: "approved", label: "First approved", sortable: true, numeric: true, hide: "hidden lg:table-cell", tip: "Year of the first FDA companion-diagnostic approval on record. Later uses of the same test were approved in later years. Blank means not recorded here, not unapproved." },
    { key: "biomarkers", label: "Tumour-board biomarker", hide: "hidden xl:table-cell", tip: "The matching entries in the tumour-board biomarker list." },
    { key: "source", label: "Source", hide: "hidden xl:table-cell" },
  ];
  const cdx = assays.filter((a) => a.regulatory === "FDA CDx").length;
  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Companion diagnostics and assays"
        lede={`The tests that decide who is offered a biomarker-selected drug. ${assays.length} assays, ${cdx} of them FDA companion diagnostics, each with its maker, its method, what it measures and the cut-off that counts as positive. One test can be approved for several cancers and treatments with a different cut-off for each, so read the one that matches yours.`} />
      <Container className="pb-16">
        <EntityBrowser rows={rows} facets={facets} columns={columns} noun="assays" hideStatus defaultSort={{ key: "name", dir: 1 }} />
        {assays.some(a => a.regulatoryClaims?.length) && <section className="mt-8 space-y-6" aria-labelledby="scoped-assay-uses">
          <h2 id="scoped-assay-uses" className="font-medium text-xl">What each approval covers</h2>
          <p className="text-sm text-muted max-w-3xl">A status such as &ldquo;FDA CDx&rdquo; does not say which cancer, treatment and cut-off an approval is for. Where OnCo has read the individual approvals, they are set out below, each with its source. This list is not complete yet: a use that is missing here has not been added, which is different from not being approved.</p>
          {assays.filter(a => a.regulatoryClaims?.length).map(a => <div key={a.id} className="card p-4 scroll-mt-28" id={a.id}><RegulatoryClaims claims={a.regulatoryClaims!} /></div>)}
        </section>}
        <div className="grid gap-4 md:grid-cols-3 mt-8 text-sm">
          <div className="card p-4"><div className="kicker mb-1">Back to the biomarker matrix</div><p className="text-muted">Tick the biomarkers a report shows on the <Link className="underline" href="/tumor-board/">tumour board</Link> to see matched options; see how common each target is per cancer on the <Link className="underline" href="/prevalence/">prevalence matrix</Link>.</p></div>
          <div className="card p-4"><div className="kicker mb-1">Read the cut-off, not just the name</div><p className="text-muted">The same marker can have a different cut-off for each treatment: PD-L1 at 1% for one drug and 50% for another. A positive result on one test is not automatically a positive result on another, because the stain, the scoring method and the sample differ.</p></div>
          <div className="card p-4"><div className="kicker mb-1">Primary source</div><p className="text-muted">The FDA list of companion diagnostic devices is the reference for every FDA CDx row, and the drug labels give the full conditions of use. The status and year in the table summarise each test; the individual approvals are in the list above where OnCo has them. Corrections welcome via <Link className="underline" href="/suggest/">suggest an edit</Link>.</p></div>
        </div>
        <div className="sr-only">{assays.filter(a => !a.regulatoryClaims?.length).map((a) => <span key={a.id} id={a.id}>{a.name}</span>)}</div>
      </Container>
    </>
  );
}

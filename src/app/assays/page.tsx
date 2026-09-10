import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { EntityBrowser, type BrowserRow, type ColDef, type FacetDef } from "@/components/EntityBrowser";
import { assays } from "@/data/assays";
import { biomarkers } from "@/data/biomarkers";

export const metadata: Metadata = pageMeta({ title: "Companion diagnostics and assays", description: "Every companion diagnostic and key assay with its cut-off: PD-L1 CPS and TPS, HER2 IHC and ISH, EGFR, KRAS, BRAF, ALK, MSI, TMB, HRD, FLT3, FOLR1, CLDN18.2 and the multi-gene panels, linked to the drugs and cancers they gate.", path: "/assays/" });

const PLATFORM_TIPS: Record<string, string> = { IHC: "Immunohistochemistry: antibody staining scored by a pathologist.", "FISH/ISH": "In situ hybridisation: counts gene copies or breaks in the nucleus.", PCR: "Polymerase chain reaction for a fixed list of mutations; fast, cheap, narrow.", "NGS tissue": "Next-generation sequencing of a tumour sample across many genes.", "NGS plasma": "Sequencing of circulating tumour DNA from blood (liquid biopsy).", "Gene expression": "RNA-based signature scored as a continuous risk number.", "Germline NGS": "Sequencing of inherited DNA from blood or saliva.", Imaging: "A PET tracer or other imaging read-out used to select patients." };
const REG_TIPS: Record<string, string> = { "FDA CDx": "Approved by the FDA as a companion diagnostic named in a drug label.", "FDA cleared": "Cleared by the FDA but not as a required companion test.", "CE-IVD": "CE-marked for in vitro diagnostic use in Europe.", LDT: "Laboratory-developed test run under CLIA; not FDA-approved as a device.", "Breakthrough device": "FDA breakthrough designation; approval pending." };

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
    { key: "cutoff", label: "Cut-off that gates therapy", tip: "The threshold or positivity rule from the label or the trial that set it." },
    { key: "drugs", label: "Gates", hide: "hidden sm:table-cell", tip: "Products whose use depends on this test." },
    { key: "cancers", label: "Cancers", hide: "hidden lg:table-cell" },
    { key: "targets", label: "Target dossier", hide: "hidden xl:table-cell" },
    { key: "regulatory", label: "Status", sortable: true, valueTips: REG_TIPS, hide: "hidden md:table-cell" },
    { key: "approved", label: "First approved", sortable: true, numeric: true, hide: "hidden lg:table-cell", tip: "Year of first FDA companion-diagnostic approval, where read from the FDA list; blank is unrecorded, not unapproved." },
    { key: "biomarkers", label: "Tumour-board biomarker", hide: "hidden xl:table-cell", tip: "The matching entries in the tumour-board biomarker list." },
    { key: "source", label: "Source", hide: "hidden xl:table-cell" },
  ];
  const cdx = assays.filter((a) => a.regulatory === "FDA CDx").length;
  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Companion diagnostics and assays"
        lede={`Cut-offs gate every biomarker-selected drug: PD-L1 CPS 10, HER2 IHC 1+ or 2+, MSI-high, TMB 10 and the rest. ${assays.length} assays (${cdx} FDA companion diagnostics) with vendor, platform, analyte, the exact threshold, the products and cancers they gate, and the tumour-board biomarker they correspond to.`} />
      <Container className="pb-16">
        <EntityBrowser rows={rows} facets={facets} columns={columns} noun="assays" hideStatus defaultSort={{ key: "name", dir: 1 }} />
        <div className="grid gap-4 md:grid-cols-3 mt-8 text-sm">
          <div className="card p-4"><div className="kicker mb-1">Back to the biomarker matrix</div><p className="text-muted">Tick the biomarkers a report shows on the <Link className="underline" href="/tumor-board/">tumour board</Link> to see matched options; see how common each target is per cancer on the <Link className="underline" href="/prevalence/">prevalence matrix</Link>.</p></div>
          <div className="card p-4"><div className="kicker mb-1">Read the cut-off, not just the name</div><p className="text-muted">The same analyte gates different drugs at different thresholds (PD-L1 TPS 1% versus 50%; HER2 3+ versus low). A positive result on one assay is not a positive result on another; SP142 and 22C3 are the classic example.</p></div>
          <div className="card p-4"><div className="kicker mb-1">Primary source</div><p className="text-muted">The FDA list of cleared or approved companion diagnostic devices is the reference for every FDA CDx row; cut-offs are quoted from labels and trials. Corrections welcome via <Link className="underline" href="/suggest/">suggest an edit</Link>.</p></div>
        </div>
        <div className="sr-only">{assays.map((a) => <span key={a.id} id={a.id}>{a.name}</span>)}</div>
      </Container>
    </>
  );
}

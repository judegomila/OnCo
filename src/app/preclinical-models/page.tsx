import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { EntityBrowser, type BrowserRow, type ColDef, type FacetDef, type LinkItem } from "@/components/EntityBrowser";
import { preclinicalModels, cellLineIds, REPOS } from "@/data/preclinical-models";
import { CELL_LINE_IDS_GENERATED } from "@/data/cell-line-ids";

export const metadata: Metadata = pageMeta({ title: "Preclinical models", description: "Which cell lines (with Cellosaurus and DepMap ids), PDX repositories, genetically engineered mouse models and organoid banks exist for each cancer and target.", path: "/preclinical-models/" });

const TYPE_TIPS: Record<string, string> = { "Cell line": "Immortalised line; identifiers resolved from Cellosaurus, with the DepMap id where one exists.", "Mouse model": "Genetically engineered or carcinogen-induced mouse model, with the paper that described it.", "PDX repository": "Where to find patient-derived xenografts for this cancer or target.", "Organoid bank": "Where to find patient-derived organoids." };

export default function PreclinicalModelsPage() {
  const g = graph();
  const rows: BrowserRow[] = [];
  const seenLine = new Map<string, BrowserRow>();
  for (const m of preclinicalModels) {
    const subj = g.get(m.subject); if (!subj) continue;
    const subjName = subj.name.split(" (")[0];
    const subjLink: LinkItem = { label: subjName, href: subj.kind === "target" ? `/dossiers/${subj.id}/` : routeFor(subj), tip: subj.tldr };
    for (const c of m.cellLines) {
      const ids = cellLineIds(c.name);
      const species = ids?.species ? (ids.species === "Homo sapiens" ? "Human" : ids.species === "Mus musculus" ? "Mouse" : ids.species) : /mouse|murine|syngeneic/i.test(c.note) ? "Mouse" : "Human";
      const tgts = (c.targets ?? []).map((id) => g.get(id)).filter((x): x is NonNullable<typeof x> => !!x);
      const existing = seenLine.get(c.name);
      if (existing) {
        existing.facets.subject.push(subjName);
        (existing.cols.subjects as LinkItem[]).push(subjLink);
        for (const t of tgts) if (!existing.facets.target.includes(t.name.split(" (")[0])) { existing.facets.target.push(t.name.split(" (")[0]); (existing.cols.targets as LinkItem[]).push({ label: t.name.split(" (")[0], href: `/dossiers/${t.id}/`, tip: t.tldr }); }
        continue;
      }
      const row: BrowserRow = {
        id: `line-${c.name}`, name: c.name, tldr: c.note, route: ids ? `https://www.cellosaurus.org/${ids.cellosaurus}` : subjLink.href, sub: ids?.disease,
        facets: { type: ["Cell line"], subject: [subjName], species: [species], depmap: [ids?.depmap ? "In DepMap" : "Not in DepMap"], target: tgts.map((t) => t.name.split(" (")[0]) },
        cols: {
          ids: ids ? [{ label: ids.cellosaurus, href: `https://www.cellosaurus.org/${ids.cellosaurus}`, tip: "Cellosaurus record: authentication, STR profile, misidentification warnings." }, ...(ids.depmap ? [{ label: ids.depmap, href: `https://depmap.org/portal/cell_line/${ids.depmap}`, tip: "DepMap: CRISPR dependencies, drug sensitivity and omics for this line." }] : [])] : "not resolved",
          subjects: [subjLink],
          targets: tgts.map((t) => ({ label: t.name.split(" (")[0], href: `/dossiers/${t.id}/`, tip: t.tldr })),
          detail: c.note,
          source: undefined,
        },
      };
      seenLine.set(c.name, row); rows.push(row);
    }
    for (const gm of m.gemms) rows.push({
      id: `gemm-${m.subject}-${gm.name}`, name: gm.name, tldr: gm.note, route: gm.source.url, sub: gm.alleles,
      facets: { type: ["Mouse model"], subject: [subjName], species: ["Mouse"], depmap: [], target: [] },
      cols: { ids: undefined, subjects: [subjLink], targets: [], detail: gm.note, source: [{ label: gm.source.label, href: gm.source.url }] },
    });
    for (const r of m.pdx) rows.push({
      id: `pdx-${m.subject}-${r.name}`, name: r.name, tldr: r.note, route: r.url,
      facets: { type: ["PDX repository"], subject: [subjName], species: ["Human"], depmap: [], target: [] },
      cols: { ids: undefined, subjects: [subjLink], targets: [], detail: r.note, source: [{ label: "portal", href: r.url }] },
    });
    for (const r of m.organoids) rows.push({
      id: `org-${m.subject}-${r.name}`, name: r.name, tldr: r.note, route: r.url,
      facets: { type: ["Organoid bank"], subject: [subjName], species: ["Human"], depmap: [], target: [] },
      cols: { ids: undefined, subjects: [subjLink], targets: [], detail: r.note, source: [{ label: "portal", href: r.url }] },
    });
  }
  const facets: FacetDef[] = [
    { key: "type", label: "Model type", searchable: false, width: "w-44", order: Object.keys(TYPE_TIPS) },
    { key: "subject", label: "Cancer or target", width: "w-56" },
    { key: "target", label: "Genotype models", width: "w-48" },
    { key: "species", label: "Species", searchable: false, width: "w-32" },
    { key: "depmap", label: "DepMap", searchable: false, width: "w-40" },
  ];
  const columns: ColDef[] = [
    { key: "ids", label: "Identifiers", tip: "Cellosaurus accession and DepMap ACH id, resolved by name from the Cellosaurus API." },
    { key: "subjects", label: "Used for", sortable: true, tip: "The cancers and targets this model is listed under." },
    { key: "targets", label: "Genotype", hide: "hidden lg:table-cell", tip: "Targets whose alteration this line carries." },
    { key: "detail", label: "Why it is used / alleles", hide: "hidden md:table-cell" },
    { key: "source", label: "Source", hide: "hidden xl:table-cell" },
  ];
  const lines = rows.filter((r) => r.facets.type[0] === "Cell line").length;
  const withDepmap = rows.filter((r) => r.facets.depmap[0] === "In DepMap").length;
  const cancers = preclinicalModels.filter((m) => g.get(m.subject)?.kind === "cancer").length;
  const targets = preclinicalModels.length - cancers;
  return (
    <>
      <PageHeader kicker={<GroupKicker id="map" />} title="Preclinical models"
        lede={`Which cell lines, PDX, mouse models and organoid banks exist for ${cancers} cancers and ${targets} targets: ${lines} cell lines with Cellosaurus accessions (${withDepmap} in DepMap, so their dependencies and drug sensitivities are one click away), the mouse models with the paper that made them, and where to request patient-derived models.`} />
      <Container className="pb-16">
        <EntityBrowser rows={rows} facets={facets} columns={columns} noun="models" hideStatus defaultSort={{ key: "name", dir: 1 }} />
        <div className="grid gap-4 md:grid-cols-2 mt-8 text-sm">
          <div className="card p-4"><div className="kicker mb-1">Before you pick a line</div><p className="text-muted">Check the Cellosaurus record for misidentification and contamination flags, confirm the allele you need in DepMap or Cellosaurus (G12C is not G12D), and authenticate your stock by STR profiling. Many historic lines are not what their names say.</p></div>
          <div className="card p-4"><div className="kicker mb-1">Where to look next</div><ul className="text-muted space-y-1">{[REPOS.depmap, REPOS.pdcm, REPOS.hcmi, REPOS.pdmr].map((r) => <li key={r.url}><a className="underline" href={r.url} rel="noopener">{r.name}</a>: {r.note}</li>)}</ul></div>
        </div>
        <p className="text-xs text-muted mt-6 max-w-3xl">Identifiers resolved from the Cellosaurus API on {CELL_LINE_IDS_GENERATED || "build"}; disease labels are Cellosaurus&apos; NCIt terms. Repository links go to the portal, not to a specific model. Targets link to their <Link className="underline" href="/dossiers/">dossiers</Link>.</p>
      </Container>
    </>
  );
}

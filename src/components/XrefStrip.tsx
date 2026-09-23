import { targetXrefs, type GeneXref } from "@/data/target-xrefs";
import { GENE_ID_URL, geneIdLinks, type GeneIds } from "@/lib/gene-ids";
import { Tip } from "./Tip";

/** External resource links derived from a gene's identifiers. Nothing here is typed by hand: every URL is built from an id. */
export function xrefLinks(g: GeneXref): Array<{ label: string; url: string; tip: string; id: string }> {
  const out: Array<{ label: string; url: string; tip: string; id: string }> = [];
  out.push({ label: "HGNC", id: g.hgnc, url: GENE_ID_URL.hgnc(g.hgnc), tip: "HUGO Gene Nomenclature Committee: the authoritative gene symbol and name." });
  if (g.ensembl) out.push({ label: "Ensembl", id: g.ensembl, url: GENE_ID_URL.ensembl(g.ensembl), tip: "Gene model, transcripts and variation." });
  if (g.uniprot) out.push({ label: "UniProt", id: g.uniprot, url: GENE_ID_URL.uniprot(g.uniprot), tip: "Protein sequence, domains, isoforms and function." });
  if (g.uniprot) out.push({ label: "AlphaFold DB", id: g.uniprot, url: `https://alphafold.ebi.ac.uk/entry/${g.uniprot}`, tip: "Predicted protein structure." });
  if (g.chembl) out.push({ label: "ChEMBL", id: g.chembl, url: `https://www.ebi.ac.uk/chembl/explore/target/${g.chembl}`, tip: "Bioactivity data: every compound measured against this target." });
  if (g.ensembl) out.push({ label: "Open Targets", id: g.ensembl, url: `https://platform.opentargets.org/target/${g.ensembl}`, tip: "Target-disease evidence, tractability and safety." });
  if (g.entrez) out.push({ label: "CIViC", id: g.entrez, url: `https://civicdb.org/genes/${g.entrez}/summary`, tip: "Clinical interpretations of variants in cancer (open, curated)." });
  out.push({ label: "OncoKB", id: g.symbol, url: `https://www.oncokb.org/gene/${g.symbol}`, tip: "Levels of evidence for alterations and drugs (MSK)." });
  out.push({ label: "COSMIC", id: g.cosmic ?? g.symbol, url: `https://cancer.sanger.ac.uk/cosmic/gene/analysis?ln=${g.cosmic ?? g.symbol}`, tip: "Catalogue of somatic mutations in cancer." });
  out.push({ label: "cBioPortal", id: g.symbol, url: `https://www.cbioportal.org/results/mutations?cancer_study_list=msk_impact_2017&gene_list=${g.symbol}`, tip: "Mutations and copy number across clinical sequencing cohorts (opens MSK-IMPACT)." });
  out.push({ label: "DepMap", id: g.symbol, url: `https://depmap.org/portal/gene/${g.symbol}?tab=overview`, tip: "CRISPR dependency and expression across cancer cell lines." });
  if (g.ensembl) out.push({ label: "Human Protein Atlas", id: g.ensembl, url: `https://www.proteinatlas.org/${g.ensembl}-${g.symbol}`, tip: "Protein expression in normal tissue, cancer and single cells." });
  if (g.entrez) out.push({ label: "NCBI Gene", id: g.entrez, url: GENE_ID_URL.entrez(g.entrez), tip: "Gene summary, RefSeq and literature." });
  if (g.omim) out.push({ label: "OMIM", id: g.omim, url: `https://www.omim.org/entry/${g.omim}`, tip: "Mendelian phenotypes linked to the gene." });
  return out;
}

/**
 * "Elsewhere" strip: external identifiers for a target, one row per gene when a target covers several (BRCA1 and
 * BRCA2, AKT1/2/3). Links are built from HGNC, Ensembl, UniProt, Entrez and ChEMBL ids fetched by scripts/fetch-xrefs.ts.
 */
export function XrefStrip({ targetId, compact = false, fallback }: { targetId: string; compact?: boolean; /** The record's own ids, used when target-xrefs.ts has no entry yet (generated gene records). */ fallback?: GeneIds & { symbol: string; name: string } }) {
  const x = targetXrefs[targetId] ?? (fallback?.hgnc ? { genes: [{ symbol: fallback.symbol, name: fallback.name, hgnc: fallback.hgnc, ensembl: fallback.ensembl, uniprot: fallback.uniprot, entrez: fallback.entrez }] } : undefined);
  if (!x) return null;
  return (
    <div className="space-y-2">
      {x.genes.map((g) => (
        <div key={g.hgnc} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
          <span className="font-mono font-semibold notranslate" translate="no">{g.symbol}</span>
          {!compact && <span className="text-muted text-xs">{g.name}{g.locus ? ` · ${g.locus}` : ""}</span>}
          <span className="flex flex-wrap gap-1.5 notranslate" translate="no">
            {xrefLinks(g).map((l) => (
              <Tip key={l.label} title={l.label} text={`${l.tip} Id: ${l.id}.`}>
                <a href={l.url} rel="noopener" className="chip border bg-card border-border hover:bg-foreground/5 text-xs">{l.label}</a>
              </Tip>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Compact identifiers row for a single-gene target: the four registry ids carried on the record itself (HGNC,
 * Ensembl, UniProt, NCBI Gene), each shown as its accession with a tooltip and a link. Composite targets carry no
 * record-level ids and render nothing here; their per-gene links are in the XrefStrip.
 */
export function IdentifierRow({ target }: { target: GeneIds }) {
  const links = geneIdLinks(target);
  if (!links.length) return null;
  return (
    <span className="flex flex-wrap gap-1.5 notranslate" translate="no">
      {links.map((l) => (
        <Tip key={l.key} title={l.label} text={`${l.tip} Id: ${l.id}.`}>
          <a href={l.url} rel="noopener" className="chip border bg-card border-border hover:bg-foreground/5 text-xs font-mono"><span className="text-muted">{l.label}</span> {l.id}</a>
        </Tip>
      ))}
    </span>
  );
}

/** Plain JSON view of a target's cross-references, for merging into the entity export. */
export function xrefJson(targetId: string): Array<Record<string, string>> {
  const x = targetXrefs[targetId];
  if (!x) return [];
  return x.genes.map((g) => Object.fromEntries(xrefLinks(g).map((l) => [l.label.toLowerCase().replace(/\s+/g, "-"), l.url])));
}

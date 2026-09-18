/**
 * Canonical URLs for a gene's external identifiers. One place for the templates so the identifiers row on the
 * target page, the "Elsewhere" strip, the JSON-LD sameAs and the RDF triples all point at the same addresses.
 */
export type GeneIds = { hgnc?: string; ensembl?: string; uniprot?: string; entrez?: string };

export const GENE_ID_URL = {
  hgnc: (id: string) => `https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/${id}`,
  ensembl: (id: string) => `https://www.ensembl.org/Homo_sapiens/Gene/Summary?g=${id}`,
  uniprot: (id: string) => `https://www.uniprot.org/uniprotkb/${id}/entry`,
  entrez: (id: string) => `https://www.ncbi.nlm.nih.gov/gene/${id}`,
} as const;

export type GeneIdLink = { key: keyof GeneIds; label: string; id: string; url: string; tip: string };

/** The four core identifiers as labelled links, in registry order; absent ids are skipped. */
export function geneIdLinks(g: GeneIds): GeneIdLink[] {
  const out: GeneIdLink[] = [];
  if (g.hgnc) out.push({ key: "hgnc", label: "HGNC", id: g.hgnc, url: GENE_ID_URL.hgnc(g.hgnc), tip: "HUGO Gene Nomenclature Committee: the authoritative gene symbol and name." });
  if (g.ensembl) out.push({ key: "ensembl", label: "Ensembl", id: g.ensembl, url: GENE_ID_URL.ensembl(g.ensembl), tip: "Gene model, transcripts and variation." });
  if (g.uniprot) out.push({ key: "uniprot", label: "UniProt", id: g.uniprot, url: GENE_ID_URL.uniprot(g.uniprot), tip: "Protein sequence, domains, isoforms and function." });
  if (g.entrez) out.push({ key: "entrez", label: "NCBI Gene", id: g.entrez, url: GENE_ID_URL.entrez(g.entrez), tip: "Gene summary, RefSeq and literature." });
  return out;
}

/** The same identifiers as bare URLs, for schema:sameAs. */
export const geneIdUrls = (g: GeneIds): string[] => geneIdLinks(g).map((l) => l.url);

/**
 * External identifier cross-references for every target, generated from public registries.
 *
 *   HGNC REST   https://rest.genenames.org/fetch/symbol/<SYMBOL>   → HGNC id, Ensembl gene, UniProt, Entrez, COSMIC symbol, OMIM, locus
 *   ChEMBL REST https://www.ebi.ac.uk/chembl/api/data/target.json?target_components__accession=<UNIPROT>  → ChEMBL target id
 *
 * Writes src/data/target-xrefs.ts. Open Targets, CIViC, OncoKB, cBioPortal, Human Protein Atlas, DepMap and
 * AlphaFold DB links are derived from these ids at render time (see src/components/XrefStrip.tsx), so nothing is
 * typed by hand. Symbols come from `target.symbol`; a few targets name several genes ("BRCA1, BRCA2", "AKT1/2/3").
 *
 * Run: npx tsx scripts/fetch-xrefs.ts   (network; ~200 requests)
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";

const UA = "OnCo/1.0 (https://github.com/judegomila/OnCo; target cross-references)";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Targets whose `symbol` field does not list every gene worth cross-referencing. */
const EXTRA_GENES: Record<string, string[]> = {
  "prmt5-mtap": ["MTAP"],
  vegf: ["FLT1", "FLT4"],
};
/** Targets whose symbol is not a gene symbol (antigens, fusions written with a product note). */
const SYMBOL_OVERRIDE: Record<string, string[]> = {
  gd2: ["B4GALNT1"],
  "ewsr1-fli1": ["EWSR1", "FLI1"],
  "bcr-abl": ["BCR", "ABL1"],
};

/** "AKT1/2/3" → AKT1, AKT2, AKT3; "BRCA1, BRCA2" → both; "NTRK1/2/3" likewise. */
export function genesFromSymbol(symbol: string): string[] {
  const parts = symbol.replace(/\(.*?\)/g, "").split(/[,;]|::|\s+and\s+/).map((s) => s.trim()).filter(Boolean);
  const out: string[] = [];
  for (const p of parts) {
    const slash = p.split("/").map((s) => s.trim()).filter(Boolean);
    if (slash.length > 1) {
      const m = slash[0].match(/^([A-Z0-9]+?)(\d+)$/);
      if (m && slash.slice(1).every((s) => /^\d+$/.test(s))) { out.push(slash[0], ...slash.slice(1).map((d) => `${m[1]}${d}`)); continue; }
      out.push(...slash);
      continue;
    }
    out.push(p);
  }
  return [...new Set(out.filter((s) => /^[A-Z][A-Z0-9-]{1,10}$/.test(s)))];
}

type HgncDoc = { hgnc_id: string; symbol: string; name: string; ensembl_gene_id?: string; uniprot_ids?: string[]; entrez_id?: string; cosmic?: string; omim_id?: string[]; location?: string };

async function getJson<T>(url: string, tries = 4): Promise<T> {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
      if (r.status === 429 || r.status >= 500) { await sleep(1200 * (i + 1)); continue; }
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return (await r.json()) as T;
    } catch (e) {
      if (i === tries - 1) throw e;
      await sleep(800 * (i + 1));
    }
  }
  throw new Error("unreachable");
}

async function hgnc(symbol: string): Promise<HgncDoc | null> {
  const j = await getJson<{ response: { docs: HgncDoc[] } }>(`https://rest.genenames.org/fetch/symbol/${encodeURIComponent(symbol)}`);
  if (j.response.docs.length) return j.response.docs[0];
  // Fall back to previous symbols and aliases.
  for (const field of ["prev_symbol", "alias_symbol"]) {
    const k = await getJson<{ response: { docs: HgncDoc[] } }>(`https://rest.genenames.org/fetch/${field}/${encodeURIComponent(symbol)}`);
    if (k.response.docs.length) return k.response.docs[0];
  }
  return null;
}

async function chembl(uniprot: string): Promise<string | undefined> {
  const j = await getJson<{ targets: Array<{ target_chembl_id: string; target_type: string; organism: string }> }>(`https://www.ebi.ac.uk/chembl/api/data/target.json?target_components__accession=${uniprot}&organism=Homo%20sapiens&limit=20`);
  const single = j.targets.find((t) => t.target_type === "SINGLE PROTEIN");
  return (single ?? j.targets[0])?.target_chembl_id;
}

async function main() {
  const g = graph();
  const targets = g.kind("target");
  const out: Record<string, { genes: Array<Record<string, string | undefined>> }> = {};
  let n = 0;
  for (const t of targets) {
    const symbols = SYMBOL_OVERRIDE[t.id] ?? [...(t.symbol ? genesFromSymbol(t.symbol) : []), ...(EXTRA_GENES[t.id] ?? [])];
    const genes: Array<Record<string, string | undefined>> = [];
    for (const s of symbols) {
      const doc = await hgnc(s);
      await sleep(120);
      if (!doc) { console.warn(`  no HGNC record for ${t.id} / ${s}`); continue; }
      const uniprot = doc.uniprot_ids?.[0];
      const chemblId = uniprot ? await chembl(uniprot) : undefined;
      await sleep(120);
      genes.push({ symbol: doc.symbol, name: doc.name, hgnc: doc.hgnc_id, ensembl: doc.ensembl_gene_id, uniprot, entrez: doc.entrez_id, chembl: chemblId, cosmic: doc.cosmic, omim: doc.omim_id?.[0], locus: doc.location });
      n++;
    }
    if (genes.length) out[t.id] = { genes };
    console.log(`${t.id}: ${genes.map((x) => x.symbol).join(", ") || "(none)"}`);
  }

  const today = new Date().toISOString().slice(0, 10);
  const body = `/**
 * External identifiers for every target, keyed by target id. GENERATED by scripts/fetch-xrefs.ts on ${today}
 * from the HGNC REST API (ids, Ensembl, UniProt, Entrez, COSMIC, OMIM, locus) and the ChEMBL REST API (target id).
 * Do not edit by hand; re-run the script. Link builders live in src/components/XrefStrip.tsx.
 */
export type GeneXref = {
  symbol: string; name: string; hgnc: string; ensembl?: string; uniprot?: string; entrez?: string; chembl?: string; cosmic?: string; omim?: string; locus?: string;
};
export type TargetXref = { genes: GeneXref[] };

export const TARGET_XREFS_GENERATED = "${today}";

export const targetXrefs: Record<string, TargetXref> = ${JSON.stringify(out, null, 2).replace(/"([a-zA-Z_]+)":/g, "$1:")};
`;
  writeFileSync(join(process.cwd(), "src", "data", "target-xrefs.ts"), body);
  console.log(`xrefs: ${Object.keys(out).length} targets, ${n} genes → src/data/target-xrefs.ts`);
}

main().catch((e) => { console.error(e); process.exit(1); });

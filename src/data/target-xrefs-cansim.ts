/**
 * Cross-references for the gene targets added from the CanSim terms map (src/data/targets-cansim.ts), read from the
 * HGNC REST API (https://rest.genenames.org/fetch/symbol/<SYMBOL>) on 2026-09-24 by the CanSim terms wave; no ChEMBL
 * lookup was run. Spread into `targetXrefs` (src/data/target-xrefs.ts) beside the generated gene-wave references;
 * re-running scripts/fetch-xrefs.ts supersedes these entries.
 */
import type { TargetXref } from "./target-xrefs";

export const targetXrefsCansim: Record<string, TargetXref> = {
  "grb7": { genes: [{"symbol": "GRB7", "name": "growth factor receptor bound protein 7", "hgnc": "HGNC:4567", "ensembl": "ENSG00000141738", "uniprot": "Q14451", "entrez": "2886", "locus": "17q12"}] },
  "stard3": { genes: [{"symbol": "STARD3", "name": "StAR related lipid transfer domain containing 3", "hgnc": "HGNC:17579", "ensembl": "ENSG00000131748", "uniprot": "Q14849", "entrez": "10948", "locus": "17q12"}] },
  "pgap3": { genes: [{"symbol": "PGAP3", "name": "post-GPI attachment to proteins phospholipase 3", "hgnc": "HGNC:23719", "ensembl": "ENSG00000161395", "uniprot": "Q96FM1", "entrez": "93210", "locus": "17q12"}] },
  "mien1": { genes: [{"symbol": "MIEN1", "name": "migration and invasion enhancer 1", "hgnc": "HGNC:28230", "ensembl": "ENSG00000141741", "uniprot": "Q9BRT3", "entrez": "84299", "locus": "17q12"}] },
  "pnmt": { genes: [{"symbol": "PNMT", "name": "phenylethanolamine N-methyltransferase", "hgnc": "HGNC:9160", "ensembl": "ENSG00000141744", "uniprot": "P11086", "entrez": "5409", "locus": "17q12"}] },
  "spry4": { genes: [{"symbol": "SPRY4", "name": "sprouty RTK signaling antagonist 4", "hgnc": "HGNC:15533", "ensembl": "ENSG00000187678", "uniprot": "Q9C004", "entrez": "81848", "locus": "5q31.3"}] },
  "phlpp2": { genes: [{"symbol": "PHLPP2", "name": "PH domain and leucine rich repeat protein phosphatase 2", "hgnc": "HGNC:29149", "ensembl": "ENSG00000040199", "uniprot": "Q6ZVD8", "entrez": "23035", "locus": "16q22.2"}] },
  "e2f7": { genes: [{"symbol": "E2F7", "name": "E2F transcription factor 7", "hgnc": "HGNC:23820", "ensembl": "ENSG00000165891", "uniprot": "Q96AV8", "entrez": "144455", "locus": "12q21.2"}] },
  "dclk1": { genes: [{"symbol": "DCLK1", "name": "doublecortin like kinase 1", "hgnc": "HGNC:2700", "ensembl": "ENSG00000133083", "uniprot": "O15075", "entrez": "9201", "locus": "13q13.3"}] },
  "dnajc12": { genes: [{"symbol": "DNAJC12", "name": "DnaJ heat shock protein family (Hsp40) member C12", "hgnc": "HGNC:28908", "ensembl": "ENSG00000108176", "uniprot": "Q9UKB3", "entrez": "56521", "locus": "10q21.3"}] },
  "phlda1": { genes: [{"symbol": "PHLDA1", "name": "pleckstrin homology like domain family A member 1", "hgnc": "HGNC:8933", "ensembl": "ENSG00000139289", "uniprot": "Q8WV24", "entrez": "22822", "locus": "12q21.2"}] },
};

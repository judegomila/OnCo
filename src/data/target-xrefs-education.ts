/** Manual education-target extension. HGNC and reviewed human UniProt checked 9 November 2026. */
import type { TargetXref } from "./target-xrefs";

export const targetXrefsEducation: Record<string, TargetXref> = {
  "tap1": {
    "genes": [
      {
        "symbol": "TAP1",
        "name": "transporter 1, ATP binding cassette subfamily B member",
        "hgnc": "HGNC:43",
        "ensembl": "ENSG00000168394",
        "entrez": "6890",
        "uniprot": "Q03518"
      }
    ]
  },
  "tap2": {
    "genes": [
      {
        "symbol": "TAP2",
        "name": "transporter 2, ATP binding cassette subfamily B member",
        "hgnc": "HGNC:44",
        "ensembl": "ENSG00000204267",
        "entrez": "6891",
        "uniprot": "Q03519"
      }
    ]
  },
  "erap1": {
    "genes": [
      {
        "symbol": "ERAP1",
        "name": "endoplasmic reticulum aminopeptidase 1",
        "hgnc": "HGNC:18173",
        "ensembl": "ENSG00000164307",
        "entrez": "51752",
        "uniprot": "Q9NZ08"
      }
    ]
  },
  "erap2": {
    "genes": [
      {
        "symbol": "ERAP2",
        "name": "endoplasmic reticulum aminopeptidase 2",
        "hgnc": "HGNC:29499",
        "ensembl": "ENSG00000164308",
        "entrez": "64167",
        "uniprot": "Q6P179"
      }
    ]
  },
  // MUC1: HGNC and reviewed human UniProt checked 12 November 2026; no ChEMBL lookup.
  "muc1": {
    "genes": [
      {
        "symbol": "MUC1",
        "name": "mucin 1, cell surface associated",
        "hgnc": "HGNC:7508",
        "ensembl": "ENSG00000185499",
        "entrez": "4582",
        "uniprot": "P15941",
        "locus": "1q22",
        "cosmic": "MUC1",
        "omim": "158340"
      }
    ]
  }
};

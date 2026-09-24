/**
 * Target records rewritten from reader proposals (the "Suggest an edit" issue form). Each record replaces a generated
 * gene record of the same id (scripts/fetch-cancer-genes.ts writes targets-genes-wave.ts): src/data/index.ts keeps the
 * hand-written record and folds the generated role, evidence tier and sources onto it where this file has none, so the
 * identifiers and catalogue links below are copied from the generated record and the prose is written from the papers
 * named in `sources`. A reader's proposal is applied only where its claims were checked against a public source; the
 * issue number is in `notes`, the reply is on the issue.
 */
import type { TargetInput } from "@/lib/schema";

const asOf = "2026-09-24";
const DOI = (d: string) => `https://doi.org/${d}`;
const tg = (x: Omit<TargetInput, "kind" | "asOf">): TargetInput => ({ kind: "target", asOf, ...x });

export const targetsReaderEdits: TargetInput[] = [
  // Issue 64 (reader wreingru proposed a GeneCards summary): rewritten from the primary papers instead.
  tg({ id: "pald1", name: "PALD1 (paladin)", symbol: "PALD1", aka: ["phosphatase domain containing paladin 1", "Paladin", "KIAA1274", "PALD"],
    hgnc: "HGNC:23530", ensembl: "ENSG00000107719", uniprot: "Q9ULE6", entrez: "27143", targetClass: "other", role: [], evidenceTier: "association-only",
    tldr: "PALD1 encodes paladin, a protein built like a tyrosine phosphatase that in blood-vessel cells removes a phosphate from a membrane lipid and so tunes VEGF receptor signalling. It is not an established cancer gene: one study ties it to colon cancer spread, and Open Targets records an association with non-Hodgkin lymphoma.",
    summary: "PALD1 (paladin, earlier KIAA1274) encodes a protein with a tyrosine phosphatase-like domain. UniProt lists no function text for the human protein (Q9ULE6) and HGNC names it 'phosphatase domain containing paladin 1', so what is known comes from animal work. Paladin was first picked out in screens for genes specific to blood vessels. In mice it sits in endosomes and the Golgi, binds vascular endothelial growth factor receptor 2 (VEGFR2) and removes a phosphate from the membrane lipid PI(4,5)P2; without it VEGFR2 is internalised more, ERK1/2 is over-activated and retinal vessels over-sprout (EMBO Reports 2021). Female mice lacking Pald1 develop emphysema-like lungs with endothelial cell death (Scientific Reports 2017). In the chick neural crest it behaves as an 'antiphosphatase': it shapes when Snail2 and Sox10 switch on and how the cells migrate, and mutating its predicted catalytic cysteines does not abolish that function (Developmental Biology 2012).\n\nIn cancer the evidence is thin. A 2022 study found paladin overexpressed in colon cancer, bound to the phosphatase SSH1, and needed for actin remodelling, cell migration and liver metastasis in mouse models (Oncogenesis 2022). Open Targets scores its association with non-Hodgkin lymphoma at 0.55. No drug targets it, no trial selects on it and it is not on any driver-gene list. The 2021 mouse work suggests that inhibiting paladin could be a way to tune VEGFR2 signalling when full blockade of the receptor is unwanted, an idea not yet tested in people.",
    biology: "Tyrosine phosphatase-like domain; acts as a PI(4,5)P2 lipid phosphatase on endosomal and Golgi membranes in endothelial cells (mouse) and as an antiphosphatase in the chick neural crest. Location: cytoplasm, cytosol (UniProt). Locus 10q22.1 (HGNC).",
    whereFound: ["Non-Hodgkin lymphoma: Open Targets association 0.55 with non-Hodgkin lymphoma (MONDO_0018908)", "Colon cancer: overexpressed, and required for cell migration and liver metastasis in mouse models (Oncogenesis 2022)"],
    cancers: ["non-hodgkin-lymphoma", "colorectal"], related: ["open-targets", "vegf"],
    sources: [
      { label: "HGNC HGNC:23530", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:23530", note: "approved symbol, name, aliases and locus" },
      { label: "UniProt Q9ULE6", url: "https://www.uniprot.org/uniprotkb/Q9ULE6/entry", note: "protein name and location; no function text" },
      { label: "Open Targets ENSG00000107719", url: "https://platform.opentargets.org/target/ENSG00000107719/associations", note: "non-Hodgkin lymphoma association 0.55 (CC0)" },
      { label: "Nitzsche et al., EMBO Reports 2021", url: DOI("10.15252/embr.202050218"), note: "paladin is a PI(4,5)P2 phosphatase regulating endosomal VEGFR2 signalling and angiogenesis (mouse)" },
      { label: "Oncogenesis 2022", url: DOI("10.1038/s41389-022-00416-4"), note: "paladin overexpressed in colon cancer and required for actin polymerisation and liver metastasis (cell lines and mouse models)" },
      { label: "Developmental Biology 2012", url: DOI("10.1016/j.ydbio.2012.08.007"), note: "paladin as an antiphosphatase regulating neural crest formation and migration (chick)" },
      { label: "Scientific Reports 2017", url: DOI("10.1038/s41598-017-14894-9"), note: "female Pald1 knockout mice show endothelial apoptosis and emphysema" },
    ],
    links: [
      { label: "HGNC HGNC:23530", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:23530" },
      { label: "UniProt Q9ULE6", url: "https://www.uniprot.org/uniprotkb/Q9ULE6/entry" },
      { label: "NCBI Gene 27143", url: "https://www.ncbi.nlm.nih.gov/gene/27143" },
      { label: "Ensembl ENSG00000107719", url: "https://www.ensembl.org/Homo_sapiens/Gene/Summary?g=ENSG00000107719" },
      { label: "Europe PMC: paladin and VEGFR2 (EMBO Reports 2021)", url: "https://europepmc.org/article/MED/33369848" },
      { label: "Europe PMC: paladin in colon cancer metastasis (Oncogenesis 2022)", url: "https://europepmc.org/article/MED/35882839" },
    ],
    notes: ["Rewritten on 24 September 2026 after issue 64 proposed a GeneCards summary. The proposal's expression profile and its 'inferred' disorder links (Alzheimer disease 7, Hutchinson-Gilford progeria) are GeneCards aggregations with no primary source and were not used; the function, localisation and cancer statements above come from the papers in sources.", "Prevalence not recorded: none of the sources gives a positivity rate."],
    tags: ["cancer-genes-wave", "reader-edit"] }),
];

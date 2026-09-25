/**
 * Gene records the CanSim terms map named that the gene layer lacked: the 17q12 HER2 amplicon neighbours (GRB7,
 * STARD3, PGAP3, MIEN1, PNMT) and MAPK and PI3K pathway modulators (SPRY4, PHLPP2, PHLDA1) plus three luminal and
 * lineage genes (E2F7, DCLK1, DNAJC12). Symbol, name, aliases, locus and identifiers come from the HGNC REST API and
 * the function text from the UniProt REST API, both fetched 24 Sept 2026; nothing else is asserted. The CanSim
 * concordance and sensitiser gene lists with no general oncology meaning were not added (see docs/CANCERSIM-TERMS-GAP.md).
 */
import type { TargetInput } from "@/lib/schema";
import { CANSIM_ASOF, CANSIM_ATTRIBUTION } from "./terms-cansim-oncology";

const asOf = CANSIM_ASOF;
const provenance = { editedBy: "OnCo CanSim terms wave (HGNC REST, UniProt REST)", editedOn: asOf, note: CANSIM_ATTRIBUTION };
type G = { id: string; symbol: string; name: string; aka?: string[]; hgnc: string; ensembl: string; uniprot: string; entrez: string; locus: string; targetClass?: TargetInput["targetClass"]; role?: TargetInput["role"]; tldr: string; biology: string; summary: string; related?: string[]; pathways?: string[]; terms?: string[]; cancers?: string[] };
const g = (x: G): TargetInput => ({
  kind: "target", asOf, provenance, tags: ["cansim-terms"],
  id: x.id, symbol: x.symbol, name: x.symbol, aka: [x.name, ...(x.aka ?? [])],
  hgnc: x.hgnc, ensembl: x.ensembl, uniprot: x.uniprot, entrez: x.entrez,
  targetClass: x.targetClass ?? "other", role: x.role ?? ["biomarker"], evidenceTier: "association-only",
  tldr: x.tldr, biology: x.biology, summary: x.summary,
  whereFound: [`Locus ${x.locus} (HGNC).`],
  sources: [
    { label: `HGNC ${x.hgnc}`, url: `https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/${x.hgnc}`, note: "approved symbol, name, aliases, locus and cross-references (REST API, 2026-09-24)" },
    { label: `UniProt ${x.uniprot}`, url: `https://www.uniprot.org/uniprotkb/${x.uniprot}/entry`, note: "protein name, function and tissue specificity text (REST API, 2026-09-24)" },
  ],
  links: [{ label: `HGNC ${x.hgnc}`, url: `https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/${x.hgnc}` }, { label: `UniProt ${x.uniprot}`, url: `https://www.uniprot.org/uniprotkb/${x.uniprot}/entry` }],
  notes: [`Named in the ${CANSIM_ATTRIBUTION}.`],
  related: x.related ?? [], pathways: x.pathways ?? [], terms: ["co-amplification", "cancer-ai-vocabulary", ...(x.terms ?? [])], cancers: x.cancers ?? [],
});

const AMPLICON = "17q12 HER2 amplicon neighbour: co-amplified and co-expressed with ERBB2 in HER2-positive breast and gastric cancer, so it appears in HER2-enriched expression signatures as a passenger of the amplification rather than a driver of its own.";

export const cansimTargets: TargetInput[] = [
  g({ id: "grb7", symbol: "GRB7", name: "growth factor receptor bound protein 7", hgnc: "HGNC:4567", ensembl: "ENSG00000141738", uniprot: "Q14451", entrez: "2886", locus: "17q12",
    tldr: "GRB7 is an adaptor protein gene that sits next to HER2 on chromosome 17 and is copied along with it in HER2-positive cancers.",
    biology: "Adapter protein that binds the cytoplasmic domain of receptor kinases and modulates downstream signalling, promoting activation of STAT3, AKT1 and MAPK1/3 and of HRAS (UniProt Q14451).",
    summary: `${AMPLICON} UniProt describes GRB7 as an adapter that interacts with numerous receptor kinases and promotes activation of STAT3, AKT and MAPK; it is one of the genes in the Oncotype DX HER2 group.`,
    related: ["her2"], pathways: ["ras-mapk", "pi3k-akt-mtor"], cancers: ["breast-cancer", "gastric"] }),
  g({ id: "stard3", symbol: "STARD3", name: "StAR related lipid transfer domain containing 3", aka: ["MLN64", "es64"], hgnc: "HGNC:17579", ensembl: "ENSG00000131748", uniprot: "Q14849", entrez: "10948", locus: "17q12", targetClass: "enzyme",
    tldr: "STARD3 (MLN64) moves cholesterol between cell compartments and is co-amplified with HER2 in breast cancer.",
    biology: "Sterol-binding protein that mediates cholesterol transport from the endoplasmic reticulum to endosomes (UniProt Q14849).",
    summary: `${AMPLICON} UniProt describes STARD3 as a sterol-binding protein that transports cholesterol from the endoplasmic reticulum to endosomes; it was first cloned as MLN64 from a breast cancer amplicon.`,
    related: ["her2"], cancers: ["breast-cancer", "gastric"] }),
  g({ id: "pgap3", symbol: "PGAP3", name: "post-GPI attachment to proteins phospholipase 3", aka: ["PERLD1", "CAB2"], hgnc: "HGNC:23719", ensembl: "ENSG00000161395", uniprot: "Q96FM1", entrez: "93210", locus: "17q12", targetClass: "enzyme",
    tldr: "PGAP3 is an enzyme gene in the HER2 amplicon that remodels the lipid anchors of cell-surface proteins.",
    biology: "Phospholipase involved in the fatty acid remodelling steps of GPI-anchor maturation; ubiquitously expressed, highest in thyroid and placenta (UniProt Q96FM1).",
    summary: `${AMPLICON} UniProt describes PGAP3 as acting in the fatty acid remodelling of GPI anchors, replacing an unsaturated acyl chain with a saturated one.`,
    related: ["her2"], cancers: ["breast-cancer", "gastric"] }),
  g({ id: "mien1", symbol: "MIEN1", name: "migration and invasion enhancer 1", aka: ["C17orf37", "C35"], hgnc: "HGNC:28230", ensembl: "ENSG00000141741", uniprot: "Q9BRT3", entrez: "84299", locus: "17q12",
    tldr: "MIEN1 is a small HER2-amplicon gene whose protein promotes cell migration and is strongly raised in breast and prostate cancers.",
    biology: "Increases cell migration by inducing filopodia at the leading edge; regulates apoptosis, possibly through CASP3; among normal tissues present only in Leydig cells, strongly up-regulated in breast cancers and higher-grade prostate adenocarcinoma at the protein level (UniProt Q9BRT3).",
    summary: `${AMPLICON} UniProt notes that MIEN1 is nearly absent from normal tissue outside the testis yet strongly up-regulated in breast cancer and in higher-grade prostate cancer, which makes it one of the more interesting passengers.`,
    related: ["her2"], cancers: ["breast-cancer", "prostate"] }),
  g({ id: "pnmt", symbol: "PNMT", name: "phenylethanolamine N-methyltransferase", aka: ["PENT"], hgnc: "HGNC:9160", ensembl: "ENSG00000141744", uniprot: "P11086", entrez: "5409", locus: "17q12", targetClass: "enzyme",
    tldr: "PNMT makes adrenaline from noradrenaline in the adrenal gland; in breast cancer it matters only because it lies inside the HER2 amplicon.",
    biology: "Catalyses the transmethylation of noradrenaline to adrenaline using S-adenosyl-L-methionine (UniProt P11086).",
    summary: `${AMPLICON} UniProt describes PNMT as the enzyme that converts noradrenaline to adrenaline; its expression in HER2-positive tumours reflects gene dosage, not adrenal biology.`,
    related: ["her2"], cancers: ["breast-cancer"] }),
  g({ id: "spry4", symbol: "SPRY4", name: "sprouty RTK signaling antagonist 4", hgnc: "HGNC:15533", ensembl: "ENSG00000187678", uniprot: "Q9C004", entrez: "81848", locus: "5q31.3",
    tldr: "SPRY4 is a feedback brake on growth-factor signalling that the MAPK pathway switches on, so its expression is a read-out of how active that pathway is.",
    biology: "Suppresses insulin receptor and EGFR-transduced MAPK signalling, probably by impairing GTP-Ras formation; inhibits Ras-independent activation of RAF1 (UniProt Q9C004).",
    summary: "SPRY4, like SPRY2, is a Sprouty family feedback inhibitor: UniProt describes it as suppressing receptor-driven MAPK signalling upstream of Ras and RAF1. Because the pathway induces its own inhibitors, SPRY2, SPRY4 and the DUSP phosphatases are the transcriptional output genes used to infer MAPK activity from expression, and they fall when a MEK inhibitor works.",
    related: ["spry2"], pathways: ["ras-mapk"], terms: ["pathway-activation-state"] }),
  g({ id: "phlpp2", symbol: "PHLPP2", name: "PH domain and leucine rich repeat protein phosphatase 2", aka: ["PHLPPL", "PPM3B"], hgnc: "HGNC:29149", ensembl: "ENSG00000040199", uniprot: "Q6ZVD8", entrez: "23035", locus: "16q22.2", targetClass: "enzyme", role: ["tumour-suppressor", "biomarker"],
    tldr: "PHLPP2 is a phosphatase that switches AKT off; it is lost in most colorectal cancers, which leaves the survival pathway on.",
    biology: "Protein phosphatase that dephosphorylates Ser-473 of AKT1 and hydrophobic-motif sites of PKC isoforms; expression lost or significantly decreased in about 80 percent of tested colorectal tumours at the protein level (UniProt Q6ZVD8).",
    summary: "UniProt describes PHLPP2 as the phosphatase that removes the activating Ser-473 phosphate from AKT1 and equivalent sites on PKC, and records that its protein is lost in about four in five colorectal cancers. It is a case where the protein, not the transcript, tells the story: a PI3K/AKT activation state that RNA alone cannot see.",
    pathways: ["pi3k-akt-mtor"], terms: ["pathway-activation-state", "mrna-protein-concordance"], cancers: ["colorectal"] }),
  g({ id: "phlda1", symbol: "PHLDA1", name: "pleckstrin homology like domain family A member 1", aka: ["TDAG51"], hgnc: "HGNC:8933", ensembl: "ENSG00000139289", uniprot: "Q8WV24", entrez: "22822", locus: "12q21.2",
    tldr: "PHLDA1 is a growth-factor-responsive gene involved in cell death; it is high in benign moles and falls as melanoma progresses.",
    biology: "Involved in regulation of apoptosis, possibly detachment-mediated cell death, and in the anti-apoptotic effects of IGF1; widely expressed, strongly in benign melanocytic naevi and progressively reduced in primary and metastatic melanoma at the protein level (UniProt Q8WV24).",
    summary: "UniProt describes PHLDA1 (TDAG51) as an apoptosis regulator whose protein is strong in benign naevi and progressively lost in melanoma. The PHLDA family genes are induced downstream of receptor tyrosine kinase and MAPK signalling, which puts them among the MAPK-responsive output genes read from expression.",
    pathways: ["ras-mapk"], cancers: ["melanoma"] }),
  g({ id: "e2f7", symbol: "E2F7", name: "E2F transcription factor 7", hgnc: "HGNC:23820", ensembl: "ENSG00000165891", uniprot: "Q96AV8", entrez: "144455", locus: "12q21.2", targetClass: "transcription",
    tldr: "E2F7 is an unusual member of the E2F family that represses genes rather than activating them, helping cells pause after DNA damage.",
    biology: "Atypical E2F transcription repressor that binds DNA independently of DP proteins and acts in angiogenesis, polyploidisation and the DNA damage response (UniProt Q96AV8).",
    summary: "UniProt describes E2F7 as an atypical E2F that mainly represses transcription, recognising the E2 site without a DP partner and participating in the DNA damage response. It is a cell-cycle gene whose transcript and protein can diverge, one of the examples of decoupled mRNA and protein in proteogenomic data.",
    pathways: ["p53-cell-cycle"], terms: ["mrna-protein-concordance"] }),
  g({ id: "dclk1", symbol: "DCLK1", name: "doublecortin like kinase 1", aka: ["DCAMKL1", "DCLK"], hgnc: "HGNC:2700", ensembl: "ENSG00000133083", uniprot: "O15075", entrez: "9201", locus: "13q13.3", targetClass: "kinase",
    tldr: "DCLK1 is a kinase gene from neuronal development that also marks a rare stem-like cell population in the gut, studied as a colorectal and pancreatic cancer stem-cell marker.",
    biology: "Probable kinase in a calcium-signalling pathway controlling neuronal migration; in adults expressed in brain and detectable in heart, liver, spleen, prostate, ovary, small intestine and colon (UniProt O15075).",
    summary: "UniProt describes DCLK1 as a probable kinase of neuronal migration expressed in the adult brain and, at lower levels, in the gut and other organs. In cancer research it is followed as a marker of tuft-like intestinal stem cells implicated in colorectal and pancreatic tumour initiation, and its transcript and protein levels track each other closely in proteogenomic data.",
    terms: ["mrna-protein-concordance"], cancers: ["colorectal", "pancreatic"] }),
  g({ id: "dnajc12", symbol: "DNAJC12", name: "DnaJ heat shock protein family (Hsp40) member C12", aka: ["JDP1"], hgnc: "HGNC:28908", ensembl: "ENSG00000108176", uniprot: "Q9UKB3", entrez: "56521", locus: "10q21.3",
    tldr: "DNAJC12 is a co-chaperone gene that is strongly expressed in oestrogen receptor-positive (luminal) breast cancers and is used as a luminal marker.",
    biology: "Probable co-chaperone for the folding of biopterin-dependent aromatic amino acid hydroxylases (PAH, TH, TPH1 and TPH2); expressed at high levels in brain, heart and testis (UniProt Q9UKB3).",
    summary: "UniProt describes DNAJC12 as an Hsp40 co-chaperone that helps fold the aromatic amino acid hydroxylases. In breast cancer it is an oestrogen-responsive gene that separates luminal from basal-like tumours in expression data, and one of the genes whose protein closely follows its transcript.",
    terms: ["pam50", "hormone-receptor-status", "mrna-protein-concordance"], cancers: ["breast-cancer"] }),
];

/**
 * Biomarkers and alterations a tumour board would list, mapped to the OnCo objects they unlock.
 * `matches` are ids in the corpus: targets, terms, technologies, and free tags on entities.
 * Used by /tumor-board/ and available to /for-me/ via src/lib/biomarker-match.ts.
 */
export type BiomarkerGroup = "IHC" | "genomic" | "germline" | "immune";
export type Biomarker = {
  id: string;
  label: string;
  group: BiomarkerGroup;
  matches: { targets?: string[]; terms?: string[]; technologies?: string[]; tags?: string[] };
  note: string;
  /** Cancer ids where this biomarker is most often tested; informational. */
  typical?: string[];
};

export const biomarkers: Biomarker[] = [
  // ---- IHC / protein ----
  { id: "pdl1-cps10", label: "PD-L1 CPS ≥ 10 (22C3)", group: "IHC", matches: { targets: ["pdl1", "pd1"], terms: ["cps"] }, note: "Threshold for pembrolizumab combinations in TNBC (KEYNOTE-355, ASCENT-04).", typical: ["tnbc", "head-and-neck", "gastric", "cervical"] },
  { id: "pdl1-tps50", label: "PD-L1 TPS ≥ 50% (lung)", group: "IHC", matches: { targets: ["pdl1", "pd1"] }, note: "Single-agent PD-1 blockade is an option in NSCLC without a driver mutation.", typical: ["nsclc"] },
  { id: "her2-3plus", label: "HER2 IHC 3+ / amplified", group: "IHC", matches: { targets: ["her2"] }, note: "HER2-directed antibodies, TKIs, and ADCs; tumour-agnostic T-DXd for IHC 3+.", typical: ["breast-her2-positive", "gastric", "colorectal", "cholangiocarcinoma"] },
  { id: "her2-low", label: "HER2-low (IHC 1+ or 2+/ISH−)", group: "IHC", matches: { targets: ["her2"], terms: ["her2-low"] }, note: "Trastuzumab deruxtecan after chemotherapy (DESTINY-Breast04) or after endocrine therapy (DESTINY-Breast06).", typical: ["breast-hr-positive", "tnbc"] },
  { id: "her2-ultralow", label: "HER2-ultralow (IHC 0 with faint staining)", group: "IHC", matches: { targets: ["her2"], terms: ["her2-low"] }, note: "Included in DESTINY-Breast06; scoring is hard and AI-assisted quantification is being validated.", typical: ["breast-hr-positive"] },
  { id: "er-positive", label: "ER positive", group: "IHC", matches: { targets: ["estrogen-receptor", "cdk4-6"], technologies: ["endocrine-therapy", "cdk46-inhibitor"] }, note: "Endocrine therapy backbone; CDK4/6 inhibitors; oral SERDs and degraders for ESR1-mutant disease.", typical: ["breast-hr-positive", "endometrial"] },
  { id: "trop2", label: "TROP2 expression (informational)", group: "IHC", matches: { targets: ["trop2"], technologies: ["trop2-pet"] }, note: "TROP2 ADCs are given regardless of IHC level; PET tracers to select patients are in development.", typical: ["tnbc", "breast-hr-positive", "nsclc"] },
  { id: "cldn18-2", label: "Claudin 18.2 positive (≥75% moderate-strong)", group: "IHC", matches: { targets: ["cldn18-2"] }, note: "Zolbetuximab with chemotherapy; CLDN18.2 ADCs and CAR-T in trials or approved in China.", typical: ["gastric", "pancreatic"] },
  { id: "fra-high", label: "Folate receptor α high (≥75% 2+/3+)", group: "IHC", matches: { targets: ["folr1"] }, note: "Mirvetuximab soravtansine in platinum-resistant ovarian cancer.", typical: ["ovarian", "endometrial"] },
  { id: "nectin4", label: "Nectin-4 expression (informational)", group: "IHC", matches: { targets: ["nectin4"] }, note: "Enfortumab vedotin is given without testing; expression is near-universal in urothelial cancer.", typical: ["urothelial"] },
  { id: "dll3", label: "DLL3 expression (informational)", group: "IHC", matches: { targets: ["dll3"] }, note: "Tarlatamab is given without DLL3 testing in small-cell lung cancer.", typical: ["sclc"] },
  { id: "b7h3", label: "B7-H3 (CD276) expression", group: "IHC", matches: { targets: ["b7h3"] }, note: "Ifinatamab deruxtecan and other B7-H3 agents in trials.", typical: ["sclc", "prostate"] },
  { id: "psma-pet-positive", label: "PSMA PET positive", group: "IHC", matches: { targets: ["psma"], technologies: ["psma-pet", "radioligand-therapy", "targeted-alpha-therapy"], terms: ["theranostics"] }, note: "Required for 177Lu-PSMA-617; alpha-emitter trials also select by PSMA PET.", typical: ["prostate"] },
  { id: "tils-high", label: "Stromal TILs ≥ 50%", group: "immune", matches: { terms: ["tils"], technologies: ["til-therapy"] }, note: "Excellent prognosis in small TNBC; de-escalation trials; more TILs also help immunotherapy.", typical: ["tnbc"] },
  // ---- Genomic (somatic) ----
  { id: "egfr-mut", label: "EGFR activating mutation (ex19del / L858R)", group: "genomic", matches: { targets: ["egfr"], technologies: ["kinase-inhibitors"] }, note: "Osimertinib or amivantamab-lazertinib first line; ADCs after progression.", typical: ["nsclc"] },
  { id: "egfr-ex20", label: "EGFR exon 20 insertion", group: "genomic", matches: { targets: ["egfr"] }, note: "Amivantamab with chemotherapy.", typical: ["nsclc"] },
  { id: "alk-fusion", label: "ALK fusion", group: "genomic", matches: { targets: ["alk"], terms: ["gene-fusion"] }, note: "Lorlatinib or alectinib; adjuvant alectinib after resection.", typical: ["nsclc"] },
  { id: "kras-g12c", label: "KRAS G12C", group: "genomic", matches: { targets: ["kras"], technologies: ["kras-inhibitors"] }, note: "Sotorasib or adagrasib; add an EGFR antibody in colorectal cancer.", typical: ["nsclc", "colorectal"] },
  { id: "kras-g12d", label: "KRAS G12D (or other non-G12C KRAS)", group: "genomic", matches: { targets: ["kras"], technologies: ["kras-inhibitors", "shared-antigen-vaccine"] }, note: "No approved inhibitor yet; pan-RAS(ON) inhibitors and KRAS vaccines in trials.", typical: ["pancreatic", "colorectal"] },
  { id: "braf-v600e", label: "BRAF V600E", group: "genomic", matches: { targets: ["braf"] }, note: "BRAF + MEK inhibitors; encorafenib + cetuximab (+ chemotherapy) in colorectal cancer.", typical: ["melanoma", "colorectal", "thyroid", "nsclc"] },
  { id: "ret", label: "RET fusion or mutation", group: "genomic", matches: { targets: ["ret"], terms: ["gene-fusion", "tumour-agnostic"] }, note: "Selpercatinib (tumour-agnostic for fusions).", typical: ["thyroid", "nsclc"] },
  { id: "ntrk", label: "NTRK fusion", group: "genomic", matches: { targets: ["ntrk"], terms: ["gene-fusion", "tumour-agnostic"] }, note: "Larotrectinib, entrectinib, repotrectinib regardless of tumour type.", typical: ["sarcoma", "thyroid", "colorectal"] },
  { id: "met", label: "MET exon 14 skipping or amplification / c-MET overexpression", group: "genomic", matches: { targets: ["met"] }, note: "Capmatinib or tepotinib for ex14; amivantamab or telisotuzumab vedotin for MET-driven resistance or overexpression.", typical: ["nsclc"] },
  { id: "fgfr2", label: "FGFR2 fusion (or FGFR3 alteration)", group: "genomic", matches: { targets: ["fgfr2"], terms: ["gene-fusion"] }, note: "Pemigatinib or futibatinib in cholangiocarcinoma; erdafitinib for FGFR3 urothelial cancer.", typical: ["cholangiocarcinoma", "urothelial", "gastric"] },
  { id: "idh", label: "IDH1 / IDH2 mutation", group: "genomic", matches: { targets: ["idh"], technologies: ["epigenetic-drugs"] }, note: "Vorasidenib in low-grade glioma; ivosidenib in AML and cholangiocarcinoma.", typical: ["glioblastoma", "aml", "cholangiocarcinoma"] },
  { id: "pik3ca", label: "PIK3CA mutation", group: "genomic", matches: { targets: ["pik3ca", "akt"] }, note: "Inavolisib, alpelisib, or capivasertib with endocrine therapy in HR+ breast cancer.", typical: ["breast-hr-positive", "endometrial"] },
  { id: "esr1", label: "ESR1 mutation (ctDNA)", group: "genomic", matches: { targets: ["estrogen-receptor"], technologies: ["liquid-biopsy", "protac-degrader", "endocrine-therapy"] }, note: "Elacestrant, imlunestrant, or vepdegestrant; detected by liquid biopsy.", typical: ["breast-hr-positive"] },
  { id: "pten-loss", label: "PTEN loss", group: "genomic", matches: { targets: ["akt", "pik3ca"] }, note: "Capivasertib with abiraterone in metastatic prostate cancer; with fulvestrant in breast cancer.", typical: ["prostate", "breast-hr-positive"] },
  { id: "akt1", label: "AKT1 E17K", group: "genomic", matches: { targets: ["akt"] }, note: "Capivasertib eligibility in HR+ breast cancer.", typical: ["breast-hr-positive"] },
  { id: "nrg1", label: "NRG1 fusion", group: "genomic", matches: { targets: ["her3", "her2"], terms: ["gene-fusion"] }, note: "Zenocutuzumab in lung, pancreatic, and biliary cancers.", typical: ["nsclc", "pancreatic", "cholangiocarcinoma"] },
  { id: "mtap-del", label: "MTAP deletion (CDKN2A co-deletion)", group: "genomic", matches: { technologies: ["synthetic-lethality-approaches"], terms: ["synthetic-lethality"] }, note: "PRMT5 inhibitors in phase 2/3; present in ~15% of cancers including mesothelioma and glioblastoma.", typical: ["mesothelioma", "glioblastoma", "nsclc", "pancreatic"] },
  { id: "tp53-mut", label: "TP53 mutation", group: "genomic", matches: { targets: ["tp53", "wee1", "atr"], technologies: ["synthetic-lethality-approaches"] }, note: "No direct drug; WEE1/ATR inhibitors and p53-reactivators in trials. Near-universal in TNBC and ovarian cancer.", typical: ["tnbc", "ovarian", "sclc"] },
  { id: "tmb-high", label: "TMB ≥ 10 mut/Mb", group: "genomic", matches: { targets: ["pd1"], terms: ["tmb", "tumour-agnostic", "neoantigen"] }, note: "Tumour-agnostic pembrolizumab; more neoantigens for personalised vaccines.", typical: ["melanoma", "nsclc", "urothelial"] },
  { id: "msi-h", label: "MSI-high / dMMR", group: "genomic", matches: { targets: ["pd1", "ctla4"], terms: ["msi", "tumour-agnostic"] }, note: "Checkpoint inhibitors regardless of tumour type; organ preservation in rectal cancer with dostarlimab.", typical: ["colorectal", "endometrial", "gastric"] },
  { id: "hrd", label: "HRD positive (genomic scar)", group: "genomic", matches: { targets: ["parp", "brca"], technologies: ["parp-inhibitor", "platinum", "hrd-testing"], terms: ["hrd"] }, note: "PARP inhibitor maintenance in ovarian cancer beyond BRCA; platinum sensitivity.", typical: ["ovarian", "tnbc"] },
  { id: "ctdna-mrd-pos", label: "ctDNA MRD positive after curative treatment", group: "genomic", matches: { technologies: ["mrd-testing", "liquid-biopsy"], terms: ["mrd", "ctdna"] }, note: "Predicts relapse; atezolizumab approved for ctDNA+ bladder cancer (IMvigor011); trials in other cancers.", typical: ["urothelial", "colorectal", "tnbc", "nsclc"] },
  // ---- Germline ----
  { id: "gbrca", label: "Germline BRCA1/2 (or PALB2)", group: "germline", matches: { targets: ["brca", "parp"], technologies: ["parp-inhibitor", "germline-testing", "chemoprevention", "platinum"], terms: ["germline-vs-somatic"] }, note: "Adjuvant olaparib in breast cancer (OlympiA); PARP inhibitors in ovarian, prostate, pancreatic cancer; family testing and risk-reducing surgery.", typical: ["tnbc", "breast-hr-positive", "ovarian", "prostate", "pancreatic"] },
  { id: "lynch", label: "Lynch syndrome (germline MMR)", group: "germline", matches: { targets: ["pd1"], terms: ["msi"], technologies: ["chemoprevention", "germline-testing"] }, note: "Colonoscopic surveillance, aspirin chemoprevention, immunotherapy for dMMR tumours, interception vaccine trials.", typical: ["colorectal", "endometrial"] },
];

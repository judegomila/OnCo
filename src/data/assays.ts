/**
 * Companion diagnostic and key assay registry: the tests whose cut-offs gate biomarker-selected drugs.
 *
 * Rows are FDA-approved companion diagnostics (from the FDA list of cleared or approved companion diagnostic
 * devices), CE-marked or laboratory-developed assays that trials and guidelines rely on, and the multi-gene panels
 * that carry many companion claims at once. `drugs` and `cancers` are corpus ids; `biomarkers` are ids from
 * src/data/biomarkers.ts so the row can point back to the tumour-board matrix. `approved` is the year of the first
 * FDA companion-diagnostic approval for the assay, recorded only where it could be read from the FDA list or the
 * approval letter; blank does not mean unapproved. Cut-offs are quoted from the label or the trial that set them.
 *
 * Rendered at /assays/ and on target dossiers.
 */
export type AssayPlatform = "IHC" | "FISH/ISH" | "PCR" | "NGS tissue" | "NGS plasma" | "Gene expression" | "Germline NGS" | "Imaging";
export type AssayRegulatory = "FDA CDx" | "FDA cleared" | "CE-IVD" | "LDT" | "Breakthrough device";

export type Assay = {
  id: string;
  name: string;
  vendor: string;
  platform: AssayPlatform;
  /** What is measured: protein, gene, alteration class or signature. */
  analyte: string;
  /** The threshold or positivity rule that gates therapy. */
  cutoff: string;
  regulatory: AssayRegulatory;
  approved?: number;
  /** Target ids the analyte maps to. */
  targets: string[];
  drugs: string[];
  cancers: string[];
  biomarkers: string[];
  note?: string;
  source: { label: string; url: string };
};

const FDA_CDX = { label: "FDA: List of cleared or approved companion diagnostic devices", url: "https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-cleared-or-approved-companion-diagnostic-devices-in-vitro-and-imaging-tools" };
const doi = (d: string, label: string) => ({ label, url: `https://doi.org/${d}` });

export const assays: Assay[] = [
  // ---- PD-L1 ----
  { id: "pdl1-22c3", name: "PD-L1 IHC 22C3 pharmDx", vendor: "Agilent (Dako)", platform: "IHC", analyte: "PD-L1 protein (tumour and immune cells)", regulatory: "FDA CDx", approved: 2015,
    cutoff: "TPS at least 1% or at least 50% (NSCLC); CPS at least 1 (head and neck, oesophageal, gastric); CPS at least 10 (TNBC, gastric first line); CPS at least 1 (cervical)",
    targets: ["pdl1", "pd1"], drugs: ["pembrolizumab"], cancers: ["nsclc", "head-and-neck", "esophageal", "gastric", "tnbc", "cervical", "urothelial"], biomarkers: ["pdl1-cps10", "pdl1-tps50"],
    note: "The first PD-L1 companion diagnostic, approved with pembrolizumab in second-line NSCLC in October 2015; the scoring system (TPS then CPS) grew indication by indication.", source: FDA_CDX },
  { id: "pdl1-sp142", name: "VENTANA PD-L1 (SP142) Assay", vendor: "Roche Diagnostics", platform: "IHC", analyte: "PD-L1 protein (immune-cell and tumour-cell scoring)", regulatory: "FDA CDx", approved: 2016,
    cutoff: "IC at least 5% (urothelial, historic); IC at least 1% (TNBC, indication later withdrawn); TC at least 50% or IC at least 10% (NSCLC)",
    targets: ["pdl1"], drugs: ["atezolizumab"], cancers: ["urothelial", "tnbc", "nsclc"], biomarkers: ["pdl1-cps10"],
    note: "Stains fewer tumour cells than 22C3 or 28-8 (Blueprint studies), so its results are not interchangeable with the other PD-L1 assays.", source: FDA_CDX },
  { id: "pdl1-sp263", name: "VENTANA PD-L1 (SP263) Assay", vendor: "Roche Diagnostics", platform: "IHC", analyte: "PD-L1 protein (tumour-cell scoring)", regulatory: "FDA CDx",
    cutoff: "TC at least 1% (durvalumab after chemoradiotherapy, NSCLC; PACIFIC-derived)",
    targets: ["pdl1"], drugs: ["durvalumab", "pembrolizumab", "atezolizumab"], cancers: ["nsclc"], biomarkers: ["pdl1-tps50"],
    note: "Concordant with 22C3 for tumour-cell scoring in the Blueprint comparison; carries companion claims for several PD-1/PD-L1 antibodies in NSCLC.", source: FDA_CDX },
  { id: "pdl1-28-8", name: "PD-L1 IHC 28-8 pharmDx", vendor: "Agilent (Dako)", platform: "IHC", analyte: "PD-L1 protein (tumour-cell scoring)", regulatory: "FDA CDx", approved: 2020,
    cutoff: "TC at least 1% (nivolumab plus ipilimumab, first-line NSCLC)",
    targets: ["pdl1", "pd1"], drugs: ["nivolumab", "ipilimumab"], cancers: ["nsclc", "melanoma"], biomarkers: ["pdl1-tps50"],
    note: "Originally a complementary (not required) test with nivolumab; became a companion diagnostic for the CheckMate 227 combination.", source: FDA_CDX },
  // ---- HER2 ----
  { id: "her2-herceptest", name: "HercepTest", vendor: "Agilent (Dako)", platform: "IHC", analyte: "HER2 protein", regulatory: "FDA CDx", approved: 1998,
    cutoff: "IHC 3+ (or 2+ confirmed by ISH) for trastuzumab; IHC 1+ or 2+/ISH-negative (HER2-low) for trastuzumab deruxtecan; IHC 0 with faint membrane staining (HER2-ultralow) for trastuzumab deruxtecan in HR-positive breast cancer",
    targets: ["her2"], drugs: ["trastuzumab", "pertuzumab", "trastuzumab-emtansine", "trastuzumab-deruxtecan", "tucatinib"], cancers: ["breast-her2-positive", "breast-hr-positive", "gastric"], biomarkers: ["her2-3plus", "her2-low", "her2-ultralow"],
    note: "The first companion diagnostic (with trastuzumab, 1998). Its scoring scale was built to find amplification; the HER2-low and ultralow claims added in 2022 and 2025 stretch it to the bottom of the range, where reproducibility is weakest.", source: FDA_CDX },
  { id: "her2-pathway-4b5", name: "PATHWAY anti-HER2/neu (4B5)", vendor: "Roche Diagnostics", platform: "IHC", analyte: "HER2 protein", regulatory: "FDA CDx",
    cutoff: "IHC 3+ (HER2-positive); IHC 1+ or 2+/ISH-negative (HER2-low) for trastuzumab deruxtecan; IHC 3+ solid tumours for tumour-agnostic trastuzumab deruxtecan",
    targets: ["her2"], drugs: ["trastuzumab", "trastuzumab-deruxtecan", "trastuzumab-emtansine"], cancers: ["breast-her2-positive", "breast-hr-positive", "gastric", "colorectal"], biomarkers: ["her2-3plus", "her2-low"],
    source: FDA_CDX },
  { id: "her2-ish", name: "HER2 IQFISH pharmDx and INFORM HER2 Dual ISH", vendor: "Agilent; Roche Diagnostics", platform: "FISH/ISH", analyte: "ERBB2 gene copy number", regulatory: "FDA CDx",
    cutoff: "HER2/CEP17 ratio at least 2.0, or ratio below 2.0 with average HER2 copy number at least 6.0 (ASCO/CAP 2018)",
    targets: ["her2"], drugs: ["trastuzumab", "pertuzumab", "trastuzumab-emtansine"], cancers: ["breast-her2-positive", "gastric"], biomarkers: ["her2-3plus"],
    note: "Resolves IHC 2+ cases; the ASCO/CAP groups 2 to 4 (unusual ratio and copy-number combinations) are where results differ between laboratories.", source: FDA_CDX },
  // ---- EGFR ----
  { id: "egfr-cobas-v2", name: "cobas EGFR Mutation Test v2", vendor: "Roche Molecular Systems", platform: "PCR", analyte: "EGFR exon 19 deletions, L858R, T790M and other exon 18 to 21 mutations (tissue and plasma)", regulatory: "FDA CDx", approved: 2013,
    cutoff: "Mutation detected (qualitative); plasma negative result should be reflexed to tissue",
    targets: ["egfr"], drugs: ["erlotinib", "gefitinib", "osimertinib"], cancers: ["nsclc"], biomarkers: ["egfr-mut"],
    note: "The plasma claim (2016) made it the first FDA-approved liquid biopsy companion diagnostic.", source: FDA_CDX },
  { id: "egfr-therascreen", name: "therascreen EGFR RGQ PCR Kit", vendor: "QIAGEN", platform: "PCR", analyte: "EGFR exon 19 deletions, L858R, T790M, G719X, S768I, L861Q, exon 20 insertions", regulatory: "FDA CDx", approved: 2013,
    cutoff: "Mutation detected (qualitative)",
    targets: ["egfr"], drugs: ["afatinib", "gefitinib", "dacomitinib"], cancers: ["nsclc"], biomarkers: ["egfr-mut", "egfr-ex20"],
    source: FDA_CDX },
  // ---- KRAS / BRAF ----
  { id: "kras-therascreen", name: "therascreen KRAS RGQ PCR Kit", vendor: "QIAGEN", platform: "PCR", analyte: "KRAS codon 12, 13 and 61 mutations including G12C", regulatory: "FDA CDx", approved: 2012,
    cutoff: "Wild-type required for cetuximab or panitumumab (colorectal); G12C detected for sotorasib and adagrasib (NSCLC)",
    targets: ["kras", "egfr"], drugs: ["cetuximab", "panitumumab", "sotorasib", "adagrasib"], cancers: ["colorectal", "nsclc"], biomarkers: ["kras-g12c", "kras-g12d"],
    note: "Started life as a negative selector (no anti-EGFR antibody if KRAS mutant) and became a positive selector for the G12C inhibitors in 2021 and 2022.", source: FDA_CDX },
  { id: "braf-cobas", name: "cobas 4800 BRAF V600 Mutation Test", vendor: "Roche Molecular Systems", platform: "PCR", analyte: "BRAF V600E (and cross-reactive V600K/D)", regulatory: "FDA CDx", approved: 2011,
    cutoff: "V600 mutation detected",
    targets: ["braf"], drugs: ["vemurafenib", "cobimetinib"], cancers: ["melanoma"], biomarkers: ["braf-v600e"],
    source: FDA_CDX },
  { id: "braf-thxid", name: "THxID BRAF Kit", vendor: "bioMérieux", platform: "PCR", analyte: "BRAF V600E and V600K", regulatory: "FDA CDx", approved: 2013,
    cutoff: "V600E or V600K detected",
    targets: ["braf"], drugs: ["dabrafenib-trametinib"], cancers: ["melanoma"], biomarkers: ["braf-v600e"],
    source: FDA_CDX },
  { id: "braf-therascreen", name: "therascreen BRAF V600E RGQ PCR Kit", vendor: "QIAGEN", platform: "PCR", analyte: "BRAF V600E", regulatory: "FDA CDx", approved: 2020,
    cutoff: "V600E detected (colorectal cancer, encorafenib plus cetuximab)",
    targets: ["braf", "egfr"], drugs: ["encorafenib", "cetuximab"], cancers: ["colorectal"], biomarkers: ["braf-v600e"],
    source: FDA_CDX },
  // ---- ALK / ROS1 / RET / NTRK ----
  { id: "alk-vysis-fish", name: "Vysis ALK Break Apart FISH Probe Kit", vendor: "Abbott Molecular", platform: "FISH/ISH", analyte: "ALK rearrangement", regulatory: "FDA CDx", approved: 2011,
    cutoff: "At least 15% of tumour cells with split or isolated 3' signals (at least 50 cells scored)",
    targets: ["alk"], drugs: ["crizotinib", "brigatinib", "alectinib"], cancers: ["nsclc"], biomarkers: ["alk-fusion"],
    note: "Approved alongside crizotinib in 2011, the first drug-diagnostic co-approval in lung cancer.", source: FDA_CDX },
  { id: "alk-d5f3", name: "VENTANA ALK (D5F3) CDx Assay", vendor: "Roche Diagnostics", platform: "IHC", analyte: "ALK protein (surrogate for rearrangement)", regulatory: "FDA CDx", approved: 2015,
    cutoff: "Binary: strong granular cytoplasmic staining in any tumour cells is positive",
    targets: ["alk"], drugs: ["crizotinib", "alectinib", "brigatinib", "lorlatinib", "ceritinib"], cancers: ["nsclc"], biomarkers: ["alk-fusion"],
    note: "Cheaper and faster than FISH; became the routine screening method in most pathology departments.", source: FDA_CDX },
  // ---- Multi-gene panels ----
  { id: "foundationone-cdx-panel", name: "FoundationOne CDx", vendor: "Foundation Medicine (Roche)", platform: "NGS tissue", analyte: "324 genes: mutations, copy number, selected fusions; MSI and TMB", regulatory: "FDA CDx", approved: 2017,
    cutoff: "Per companion claim: EGFR, ALK, BRAF V600, ERBB2 amplification, KRAS wild-type, BRCA1/2 and HRR genes, PIK3CA, MET exon 14, RET, FGFR2 fusions, IDH1, NTRK fusions; MSI-high; TMB at least 10 mutations per megabase",
    targets: ["egfr", "alk", "braf", "her2", "kras", "brca", "parp", "pik3ca", "met", "ret", "fgfr2", "idh", "ntrk", "pd1"],
    drugs: ["osimertinib", "alectinib", "dabrafenib-trametinib", "trastuzumab", "cetuximab", "olaparib", "rucaparib", "talazoparib", "alpelisib", "capmatinib-tepotinib", "selpercatinib", "pemigatinib", "ivosidenib", "larotrectinib", "pembrolizumab"],
    cancers: ["nsclc", "melanoma", "breast-her2-positive", "colorectal", "ovarian", "prostate", "breast-hr-positive", "cholangiocarcinoma", "thyroid"], biomarkers: ["egfr-mut", "alk-fusion", "braf-v600e", "her2-3plus", "kras-g12c", "gbrca", "hrd", "pik3ca", "met", "ret", "fgfr2", "idh", "ntrk", "tmb-high", "msi-h"],
    note: "The first pan-tumour NGS companion diagnostic (November 2017); most new targeted-therapy approvals add a claim to it rather than launch a single-gene kit.", source: FDA_CDX },
  { id: "foundationone-liquid-cdx", name: "FoundationOne Liquid CDx", vendor: "Foundation Medicine (Roche)", platform: "NGS plasma", analyte: "Circulating tumour DNA: more than 300 genes", regulatory: "FDA CDx", approved: 2020,
    cutoff: "Per companion claim: EGFR (osimertinib, erlotinib, gefitinib), ALK (alectinib), BRCA1/2 and ATM (olaparib, rucaparib), PIK3CA (alpelisib), FGFR3 (erdafitinib), NTRK and RET; negative plasma results reflex to tissue",
    targets: ["egfr", "alk", "brca", "pik3ca", "fgfr2", "ntrk", "ret"], drugs: ["osimertinib", "alectinib", "olaparib", "rucaparib", "alpelisib", "erdafitinib"], cancers: ["nsclc", "prostate", "ovarian", "breast-hr-positive", "urothelial"], biomarkers: ["egfr-mut", "alk-fusion", "gbrca", "pik3ca", "fgfr2"],
    source: FDA_CDX },
  { id: "guardant360-cdx", name: "Guardant360 CDx", vendor: "Guardant Health", platform: "NGS plasma", analyte: "Circulating tumour DNA: 55 to 74 genes", regulatory: "FDA CDx", approved: 2020,
    cutoff: "Per companion claim: EGFR (osimertinib), EGFR exon 20 insertions (amivantamab), KRAS G12C (sotorasib), ESR1 mutations (elacestrant), ERBB2 mutations (zongertinib); negative plasma reflexes to tissue",
    targets: ["egfr", "kras", "estrogen-receptor", "her2"], drugs: ["osimertinib", "amivantamab", "sotorasib", "elacestrant", "zongertinib"], cancers: ["nsclc", "breast-hr-positive"], biomarkers: ["egfr-mut", "egfr-ex20", "kras-g12c", "esr1"],
    note: "The first FDA-approved liquid NGS companion diagnostic (August 2020); the ESR1 claim (2023) made ctDNA the standard route to elacestrant eligibility.", source: FDA_CDX },
  { id: "oncomine-dx", name: "Oncomine Dx Target Test", vendor: "Thermo Fisher Scientific", platform: "NGS tissue", analyte: "23 genes (DNA and RNA) in NSCLC", regulatory: "FDA CDx", approved: 2017,
    cutoff: "Per companion claim: BRAF V600E (dabrafenib plus trametinib), ROS1 fusions (crizotinib), EGFR (gefitinib), RET fusions (pralsetinib), MET exon 14 (tepotinib), EGFR exon 20 insertions",
    targets: ["braf", "ros1", "egfr", "ret", "met"], drugs: ["dabrafenib-trametinib", "crizotinib", "gefitinib", "pralsetinib", "capmatinib-tepotinib"], cancers: ["nsclc"], biomarkers: ["braf-v600e", "egfr-mut", "ret", "met", "egfr-ex20"],
    note: "Runs on small biopsies with both DNA and RNA, which is why it carries fusion claims.", source: FDA_CDX },
  { id: "resolution-ctdx-first", name: "Agilent Resolution ctDx FIRST", vendor: "Agilent (Resolution Bioscience)", platform: "NGS plasma", analyte: "Circulating tumour DNA: 109 genes", regulatory: "FDA CDx", approved: 2022,
    cutoff: "KRAS G12C detected (adagrasib, NSCLC)",
    targets: ["kras"], drugs: ["adagrasib"], cancers: ["nsclc"], biomarkers: ["kras-g12c"],
    source: FDA_CDX },
  // ---- FGFR / PIK3CA / IDH / FLT3 ----
  { id: "fgfr-therascreen", name: "therascreen FGFR RGQ RT-PCR Kit", vendor: "QIAGEN", platform: "PCR", analyte: "FGFR3 point mutations (R248C, S249C, G370C, Y373C) and FGFR2/FGFR3 fusions", regulatory: "FDA CDx", approved: 2019,
    cutoff: "Alteration detected (erdafitinib, urothelial carcinoma)",
    targets: ["fgfr2"], drugs: ["erdafitinib"], cancers: ["urothelial"], biomarkers: ["fgfr2"],
    source: FDA_CDX },
  { id: "pik3ca-therascreen", name: "therascreen PIK3CA RGQ PCR Kit", vendor: "QIAGEN", platform: "PCR", analyte: "11 PIK3CA mutations in exons 7, 9 and 20 (tissue or plasma)", regulatory: "FDA CDx", approved: 2019,
    cutoff: "Mutation detected (alpelisib plus fulvestrant); plasma negative reflexes to tissue",
    targets: ["pik3ca"], drugs: ["alpelisib"], cancers: ["breast-hr-positive"], biomarkers: ["pik3ca"],
    source: FDA_CDX },
  { id: "idh1-abbott", name: "Abbott RealTime IDH1", vendor: "Abbott Molecular", platform: "PCR", analyte: "IDH1 R132 mutations (C, G, H, L, S)", regulatory: "FDA CDx", approved: 2018,
    cutoff: "Mutation detected (ivosidenib, AML)",
    targets: ["idh"], drugs: ["ivosidenib"], cancers: ["aml"], biomarkers: ["idh"],
    source: FDA_CDX },
  { id: "idh2-abbott", name: "Abbott RealTime IDH2", vendor: "Abbott Molecular", platform: "PCR", analyte: "IDH2 R140 and R172 mutations", regulatory: "FDA CDx", approved: 2017,
    cutoff: "Mutation detected (enasidenib, AML)",
    targets: ["idh"], drugs: ["enasidenib"], cancers: ["aml"], biomarkers: ["idh"],
    source: FDA_CDX },
  { id: "flt3-leukostrat", name: "LeukoStrat CDx FLT3 Mutation Assay", vendor: "Invivoscribe", platform: "PCR", analyte: "FLT3 internal tandem duplication and D835/I836 tyrosine-kinase-domain mutations", regulatory: "FDA CDx", approved: 2017,
    cutoff: "ITD signal ratio at least 0.05 or TKD mutation detected (midostaurin, gilteritinib); ITD only for quizartinib",
    targets: ["flt3"], drugs: ["midostaurin", "gilteritinib", "quizartinib"], cancers: ["aml"], biomarkers: [],
    note: "The signal ratio cut-off, not simply presence, defines eligibility, and the ratio also carries prognostic weight in ELN risk classification.", source: FDA_CDX },
  // ---- Germline and HRD ----
  { id: "bracanalysis-cdx", name: "BRACAnalysis CDx", vendor: "Myriad Genetics", platform: "Germline NGS", analyte: "Germline BRCA1 and BRCA2 sequence and large rearrangements", regulatory: "FDA CDx", approved: 2014,
    cutoff: "Deleterious or suspected deleterious germline variant",
    targets: ["brca", "parp"], drugs: ["olaparib", "talazoparib", "rucaparib", "niraparib"], cancers: ["ovarian", "breast-hr-positive", "tnbc", "pancreatic", "prostate"], biomarkers: ["gbrca"],
    note: "The first companion diagnostic for a PARP inhibitor (olaparib, December 2014) and the first germline companion diagnostic.", source: FDA_CDX },
  { id: "mychoice-cdx", name: "myChoice CDx", vendor: "Myriad Genetics", platform: "NGS tissue", analyte: "Tumour BRCA1/2 status plus genomic instability score (loss of heterozygosity, telomeric allelic imbalance, large-scale state transitions)", regulatory: "FDA CDx", approved: 2019,
    cutoff: "Genomic instability score at least 42, or BRCA1/2 mutation, defines HRD-positive (olaparib plus bevacizumab, PAOLA-1; niraparib)",
    targets: ["brca", "parp"], drugs: ["olaparib", "niraparib", "bevacizumab"], cancers: ["ovarian"], biomarkers: ["hrd", "gbrca"],
    note: "A scar assay: it records past homologous-recombination deficiency and stays positive after reversion restores repair.", source: FDA_CDX },
  { id: "foundationfocus-brca", name: "FoundationFocus CDxBRCA", vendor: "Foundation Medicine", platform: "NGS tissue", analyte: "Tumour BRCA1/2 (somatic and germline) sequence alterations", regulatory: "FDA CDx", approved: 2016,
    cutoff: "Deleterious BRCA1/2 alteration (rucaparib, ovarian cancer)",
    targets: ["brca", "parp"], drugs: ["rucaparib"], cancers: ["ovarian"], biomarkers: ["gbrca", "hrd"],
    note: "The first NGS-based companion diagnostic approved by the FDA.", source: FDA_CDX },
  // ---- Mismatch repair ----
  { id: "mmr-ventana", name: "VENTANA MMR RxDx Panel", vendor: "Roche Diagnostics", platform: "IHC", analyte: "MLH1, PMS2, MSH2 and MSH6 protein expression", regulatory: "FDA CDx", approved: 2021,
    cutoff: "Loss of nuclear expression of any mismatch-repair protein in tumour cells (dostarlimab, endometrial cancer)",
    targets: ["pd1"], drugs: ["dostarlimab", "pembrolizumab"], cancers: ["endometrial", "colorectal"], biomarkers: ["msi-h", "lynch"],
    source: FDA_CDX },
  { id: "msi-pcr", name: "MSI by PCR (Promega MSI Analysis System and equivalents)", vendor: "Promega and others", platform: "PCR", analyte: "Microsatellite instability at five mononucleotide markers", regulatory: "LDT",
    cutoff: "Instability at two or more of five markers (MSI-high); NGS panels report MSI from hundreds of loci",
    targets: ["pd1", "ctla4"], drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "dostarlimab"], cancers: ["colorectal", "endometrial", "gastric"], biomarkers: ["msi-h", "lynch"],
    note: "Pembrolizumab's 2017 tumour-agnostic approval for MSI-high or dMMR cancer was granted without a named companion device; IHC, PCR and NGS are all accepted in practice.", source: doi("10.1056/NEJMoa1500596", "Le et al., NEJM 2015") },
  // ---- Surface antigens for ADCs and antibodies ----
  { id: "folr1-ventana", name: "VENTANA FOLR1 (FOLR1-2.1) RxDx Assay", vendor: "Roche Diagnostics", platform: "IHC", analyte: "Folate receptor alpha protein", regulatory: "FDA CDx", approved: 2022,
    cutoff: "At least 75% of viable tumour cells with membrane staining of at least 2+ intensity (mirvetuximab soravtansine, ovarian cancer)",
    targets: ["folr1"], drugs: ["mirvetuximab-soravtansine"], cancers: ["ovarian"], biomarkers: ["fra-high"],
    source: FDA_CDX },
  { id: "cldn18-ventana", name: "VENTANA CLDN18 (43-14A) RxDx Assay", vendor: "Roche Diagnostics", platform: "IHC", analyte: "Claudin 18 protein (isoform 18.2 in gastric epithelium)", regulatory: "FDA CDx", approved: 2024,
    cutoff: "At least 75% of tumour cells with moderate-to-strong membranous staining (zolbetuximab, gastric and gastro-oesophageal junction adenocarcinoma)",
    targets: ["cldn18-2"], drugs: ["zolbetuximab"], cancers: ["gastric", "esophageal"], biomarkers: ["cldn18-2"],
    note: "The antibody detects CLDN18 regardless of isoform; specificity for 18.2 relies on 18.1 being absent from stomach.", source: FDA_CDX },
  { id: "egfr-pharmdx", name: "EGFR pharmDx", vendor: "Agilent (Dako)", platform: "IHC", analyte: "EGFR protein", regulatory: "FDA CDx", approved: 2004,
    cutoff: "Any EGFR membrane staining (historic requirement for cetuximab and panitumumab in colorectal cancer)",
    targets: ["egfr"], drugs: ["cetuximab", "panitumumab"], cancers: ["colorectal", "head-and-neck"], biomarkers: [],
    note: "A historical example of a companion diagnostic that did not predict benefit: EGFR IHC was dropped from practice once RAS status proved to be the real selector.", source: FDA_CDX },
  { id: "psma-pet-selection", name: "PSMA PET (Ga-68 PSMA-11, F-18 piflufolastat, F-18 flotufolastat)", vendor: "Novartis, Lantheus, Blue Earth Diagnostics", platform: "Imaging", analyte: "PSMA expression on PET", regulatory: "FDA CDx", approved: 2022,
    cutoff: "At least one PSMA-positive lesion and no dominant PSMA-negative lesion (VISION criteria) for lutetium-177 PSMA-617",
    targets: ["psma"], drugs: ["pluvicto", "ga68-psma-11", "pylarify", "flotufolastat"], cancers: ["prostate"], biomarkers: ["psma-pet-positive"],
    note: "Ga-68 PSMA-11 is the first imaging agent listed by the FDA as a companion diagnostic; PSMAfore later relaxed the VISION exclusion rules.", source: FDA_CDX },
  // ---- Gene expression and prognostic ----
  { id: "oncotype-dx", name: "Oncotype DX Breast Recurrence Score", vendor: "Exact Sciences", platform: "Gene expression", analyte: "21-gene RT-PCR signature", regulatory: "LDT",
    cutoff: "Recurrence score 0 to 25 (postmenopausal, node-negative or 1 to 3 nodes): chemotherapy can be omitted (TAILORx, RxPONDER); premenopausal 16 to 25: benefit from chemotherapy",
    targets: ["estrogen-receptor"], drugs: ["oncotype-dx", "tamoxifen", "letrozole"], cancers: ["breast-hr-positive"], biomarkers: ["er-positive"],
    note: "Not an FDA companion diagnostic; a laboratory-developed test whose cut-offs were set prospectively by randomised trials.", source: doi("10.1056/NEJMoa1804710", "TAILORx, NEJM 2018") },
  { id: "signatera-mrd", name: "Signatera (tumour-informed ctDNA MRD)", vendor: "Natera", platform: "NGS plasma", analyte: "16 patient-specific somatic variants tracked in plasma", regulatory: "Breakthrough device",
    cutoff: "Two or more variants detected above the assay threshold defines ctDNA-positive (IMvigor011: adjuvant atezolizumab for ctDNA-positive bladder cancer)",
    targets: ["pdl1"], drugs: ["signatera", "atezolizumab"], cancers: ["urothelial", "colorectal", "breast-hr-positive"], biomarkers: ["ctdna-mrd-pos"],
    note: "Medicare-covered as a laboratory-developed test; the first assay to select adjuvant immunotherapy by molecular residual disease in a positive phase 3 trial.", source: doi("10.1038/s41591-022-02115-4", "GALAXY (CIRCULATE-Japan), Nat Med 2023") },
  { id: "ki67-mib1", name: "Ki-67 IHC (MIB-1)", vendor: "Multiple (Agilent, Roche, Leica)", platform: "IHC", analyte: "Ki-67 proliferation index", regulatory: "FDA CDx", approved: 2021,
    cutoff: "At least 20% (monarchE high-risk cohort; the abemaciclib label's Ki-67 requirement was removed in 2023)",
    targets: ["cdk4-6"], drugs: ["abemaciclib"], cancers: ["breast-hr-positive"], biomarkers: ["er-positive"],
    note: "Ki-67 scoring varies by antibody, hotspot versus global counting and laboratory; the International Ki-67 Working Group validated only the extremes (below 5%, above 30%).", source: FDA_CDX },
  { id: "tmb-panel", name: "Tumour mutational burden (FoundationOne CDx and equivalents)", vendor: "Foundation Medicine and others", platform: "NGS tissue", analyte: "Non-synonymous mutations per megabase across the panel", regulatory: "FDA CDx", approved: 2020,
    cutoff: "At least 10 mutations per megabase (pembrolizumab, tumour-agnostic, KEYNOTE-158)",
    targets: ["pd1"], drugs: ["pembrolizumab"], cancers: ["melanoma", "nsclc", "urothelial", "endometrial"], biomarkers: ["tmb-high"],
    note: "Panel size, germline filtering and the mutation types counted all shift the number; the Friends of Cancer Research TMB harmonisation project exists because 10 on one panel is not 10 on another.", source: FDA_CDX },
];

export const assaysForTarget = (targetId: string): Assay[] => assays.filter((a) => a.targets.includes(targetId));
export const assaysForDrug = (drugId: string): Assay[] => assays.filter((a) => a.drugs.includes(drugId));

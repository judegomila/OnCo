import type { BiomarkerInput, BottleneckInput, CompanyInput, DrugInput, IdeaInput, PaperInput, RoadmapInput, TargetInput, TechnologyInput, TrialInput } from "@/lib/schema";
import type { Spike } from "./index";

/**
 * WHICH CLONE IS LEFT? Ultra-sensitive residual disease tests, the limit on naming the subclone or the phenotype that
 * remains, and the trials that act on a blood result (4 November 2026).
 *
 * Read from four research notes written the same day (on ultra-sensitive platforms, subclone attribution, phenotype
 * from blood, and residual-disease-guided trials) and checked again here: every PubMed id below was resolved through the Europe PMC REST API on
 * 4 November 2026 and its abstract read before a figure was taken from it; where a figure comes from the open-access
 * full text (ECLIPSE's operating point, METER's ER accuracy, the OrigiMed and Genecast probit limits, TRACERx 2017's
 * panel sizes) the record says so. Every NCT id was read from the ClinicalTrials.gov v2 API the same day. Company
 * figures (Natera's FAQ, the FoundationOne MRD technical specification, the Foresight Diagnostics site footer) were
 * read from the raw page, are labelled as the maker's statement, and are never presented as peer reviewed.
 *
 * Left out on purpose, because no primary source was read: Guardant Reveal Ultra's limit, the Haystack 6 ppm poster,
 * the Signatera Genome and next-generation Oncodetect sub-ppm claims (company statements only, already on their
 * records where sourced), Burning Rock's cPAS kit (a press release), PredicineBEACON's 5 ppm web claim, the TROP2
 * QCS-NMR figures (conference abstracts not obtained) and ZEST's screening numbers (secondary reporting only).
 *
 * The arithmetic in the bottleneck record is arithmetic: it multiplies sourced inputs and is labelled as such.
 *
 * The patch lands on `breast-cancer`; supplements attach links to records other files own (the MRD technology, the
 * ctDNA MRD and ESR1 readouts, TROP2, SERENA-6, c-TRAK TN, PREDICT-RD, ASPRIA, PERSEVERE, COGNITION-GUIDE, the ctDNA
 * roadmap, the TNBC record).
 */
const asOf = "2026-11-04";
const doiUrl = (d: string) => `https://doi.org/${d}`;
const pubmed = (p: string) => `https://pubmed.ncbi.nlm.nih.gov/${p}/`;
const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });
const ctResults = (nct: string) => `https://clinicaltrials.gov/study/${nct}?tab=results`;

const test = (x: Omit<DrugInput, "kind" | "asOf">): DrugInput => ({ kind: "drug", asOf, tags: ["test", "mrd"], ...x });
const agent = (x: Omit<DrugInput, "kind" | "asOf">): DrugInput => ({ kind: "drug", asOf, tags: ["diagnostic", "frontier"], ...x });
const co = (x: Omit<CompanyInput, "kind" | "asOf">): CompanyInput => ({ kind: "company", asOf, ...x });
const tech = (x: Omit<TechnologyInput, "kind" | "asOf">): TechnologyInput => ({ kind: "technology", asOf, ...x });
const p = (x: Omit<PaperInput, "kind" | "asOf">): PaperInput => ({ kind: "paper", asOf, ...x });
const t = (x: Omit<TrialInput, "kind" | "asOf">): TrialInput => ({ kind: "trial", asOf, ...x });

// Paper ids, named once so the records below cannot drift from each other.
const P = {
  parsons: "paper-parsons-mrd-early-breast-cancer-clin-cancer-res-2020",
  coates: "paper-coates-sacituzumab-resistance-tacstd2-cancer-discov-2021",
  notini: "paper-notini-trop2-pan-cancer-multiomic-npj-precis-oncol-2026",
  northcott: "paper-northcott-next-personal-validation-oncotarget-2024",
  klimova: "paper-klimova-phased-seq-validation-oncotarget-2025",
  griffin: "paper-doebley-griffin-nucleosome-profiling-nat-commun-2022",
  meter: "paper-paoli-meter-methylome-subtyping-genome-med-2026",
  baca: "paper-baca-plasma-epigenomic-profiling-nat-med-2023",
  sadeh: "paper-sadeh-cfchip-seq-nat-biotechnol-2021",
  epic: "paper-esfahani-epic-seq-nat-biotechnol-2022",
  saferseqs: "paper-cohen-saferseqs-nat-biotechnol-2021",
  mrdedge: "paper-widman-mrd-edge-nat-med-2024",
  santonja: "paper-santonja-tumour-informed-vs-naive-breast-embo-mol-med-2023",
  trakEr: "paper-cunningham-trak-er-surveillance-ann-oncol-2026",
  pada1: "paper-bidard-pada-1-lancet-oncol-2022",
  serena6Ext: "paper-turner-serena-6-extended-lancet-oncol-2026",
  serena6Nejm: "paper-serena-6-n-engl-j-med-2025",
  my6349Jci: "paper-chen-ga68-my6349-jci-2024",
  my6349Breast: "paper-yu-ga68-my6349-breast-theranostics-2026",
  notaT4: "paper-liu-ga68-nota-t4-breast-eur-j-nucl-med-2026",
  accuscan: "paper-li-accuscan-embo-mol-med-2024",
  cancerdetect: "paper-heo-cancerdetect-validation-plos-one-2025",
  prophet: "paper-chen-prophet-nsclc-cancer-cell-2023",
  minerva: "paper-zhou-minerva-prime-evidence-nat-commun-2026",
  geneplus: "paper-liu-geneplus-personalised-mrd-medcomm-2025",
  orimiracle: "paper-qi-orimiracle-gastrointestinal-cancer-med-2023",
  osteosarcoma: "paper-fu-osteosarcoma-ctdna-eclinicalmedicine-2024",
  enspyre: "paper-labrousse-enspyre-sci-rep-2026",
  haystack: "paper-clark-haystack-mrd-validation-j-mol-diagn-2026",
  fiala: "paper-fiala-ctdna-early-detection-bmc-med-2018",
  // Already in the corpus (src/data/spikes/precision-molecular.ts, lung-evidence-papers-treatment.ts, tnbc-treatment.ts).
  eclipse: "paper-abbosh-tracerx-ctdna-relapse-nature-2023",
  tracerx2017: "paper-abbosh-phylogenetic-ctdna-lung-cancer-nature-2017",
  ctrak: "paper-turner-c-trak-tn-ctdna-pembrolizumab-ann-oncol-2023",
  zviran: "paper-zviran-whole-genome-cfdna-residual-disease-nat-med-2020",
  kurtz: "paper-kurtz-nat-biotechnol",
  // Added on 4 November 2026 to correct the mutation-count argument (abstracts and open full texts read through Europe PMC).
  nikZainal2016: "paper-nik-zainal-560-breast-cancer-genomes-nature-2016",
  nikZainal2012: "paper-nik-zainal-life-history-21-breast-cancers-cell-2012",
  dentro: "paper-dentro-pcawg-intratumour-heterogeneity-cell-2021",
} as const;

const BOTTLENECK = "b-subclone-attribution-residual-disease";
const IDEA = "idea-same-fragment-methylation-and-mutation";

const MRD_TERMS = ["mrd", "ctdna", "tumour-informed-assay"];
const MRD_TECH = ["mrd-testing", "liquid-biopsy"];

// =====================================================================================================================
// Residual disease tests not yet in the corpus, each with its stated limit of detection in the source's own words.
// =====================================================================================================================
const tests: DrugInput[] = [
  test({ id: "foresight-clarity", name: "Foresight CLARITY", brand: "Foresight CLARITY", aka: ["CLARITY MRD", "Foresight CLARITY MRD", "PhasED-Seq MRD assay"],
    modality: "Tumour-informed ctDNA minimal residual disease test (phased variants, PhasED-Seq)", status: "emerging",
    mechanism: "Sequencing of the tumour finds stretches of DNA that carry two or more mutations on the same short fragment (phased variants); the blood test looks for fragments carrying those mutations together, which background sequencing errors almost never reproduce.",
    tldr: "A blood test for leftover lymphoma that looks for several of the tumour's mutations sitting on the same piece of DNA, which lets it see far smaller traces than tests that look for one mutation at a time.",
    summary: "Foresight CLARITY is the commercial residual disease test of Foresight Diagnostics of Boulder, Colorado, built on PhasED-Seq (Phased Variant Enrichment and Detection Sequencing), the method published from Stanford by Kurtz and colleagues in 2021. The company's site describes Foresight Diagnostics as a wholly owned subsidiary of Natera and states that CLARITY has not been cleared or approved by the FDA.\n\nIts analytical validation was in B-cell malignancies, chiefly diffuse large B-cell lymphoma (Klimova et al., Oncotarget 2025): a false positive rate of 0.24 per cent, a background error rate of 1.95 x 10^-8, and a 95 per cent detection limit of 0.7 parts per million with 120 ng of input DNA. Against a single-nucleotide-variant comparator, positive percent agreement was 90.62 per cent and negative percent agreement 77.78 per cent. The validation does not cover solid tumours.",
    notes: [
      "Stated limit of detection, in the paper's words: \"The limit of detection at 95% detection rate with 120 ng of input DNA was 0.7 parts in 1,000,000\" (Klimova et al., Oncotarget 2025, B-cell malignancies).",
      "120 ng of cell-free DNA is more than most single blood draws yield, so the limit applies at that input; the paper does not state a limit at lower inputs.",
      "What a result means: like other residual disease tests it reports whether tumour DNA is present; it does not report which clone of the lymphoma the DNA came from.",
      "Ownership read from the Foresight Diagnostics site footer on 4 November 2026: \"Foresight Diagnostics, a wholly-owned subsidiary of Natera, Inc.\"",
    ],
    cancers: ["dlbcl"], companies: ["foresight-diagnostics"], technologies: [...MRD_TECH, "ctdna-lymphoma-monitoring"], terms: MRD_TERMS,
    keyPapers: [P.klimova, P.kurtz], related: ["signatera"],
    links: [{ label: "Foresight Diagnostics", url: "https://www.foresight-dx.com/" }, { label: "Klimova et al., analytical validation of PhasED-Seq in B-cell malignancies (Oncotarget 2025)", url: doiUrl("10.18632/oncotarget.28719") }] }),

  test({ id: "brprophet", name: "brPROPHET", brand: "brPROPHET", aka: ["PROPHET", "Burning Rock PROPHET", "Patient-specific pROgnostic and Potential tHErapeutic marker Tracking"],
    modality: "Tumour-informed ctDNA minimal residual disease test (up to 50 variants, hybrid capture)", status: "emerging",
    mechanism: "Whole-exome sequencing of tumour and white blood cells selects up to 50 patient-specific variants, which a personalised capture panel then reads deeply in plasma with molecular barcodes.",
    tldr: "Burning Rock's personalised blood test for leftover lung cancer after surgery, which tracks up to 50 of the tumour's own mutations.",
    summary: "PROPHET (Patient-specific pROgnostic and Potential tHErapeutic marker Tracking) was described by Burning Rock Biotech and Chinese surgical groups in Cancer Cell in 2023: deep sequencing of 50 patient-specific variants, a stated limit of detection of 0.004 per cent, and 760 plasma samples from 181 prospectively enrolled patients with early-stage non-small cell lung cancer. It detected tumour DNA before surgery in 45 per cent of patients, outperformed fixed-panel assays for prognosis, and gave a median lead time of 299 days to radiologically confirmed recurrence. Of the variants it tracked, 98.2 per cent were not canonical driver mutations.\n\nBurning Rock states in a press release of 25 August 2026 that its CanCatch Custom kit entered China's NMPA special review procedure for innovative medical devices; that is entry to review, not registration, and was not checked on the NMPA site.",
    notes: [
      "Stated limit of detection, in the abstract's words: \"a limit of detection of 0.004%\" (Chen et al., Cancer Cell 2023). The full text gives probit limits of 0.0036 per cent at 20 ng and 0.0018 per cent at 60 ng input, measured on a diluted cell line, which is 36 and 18 parts per million.",
      "Variant choice favours high allele fraction; the paper describes tracking trunk mutations shared by most tumour cells. It does not report which clone remains.",
    ],
    cancers: ["nsclc"], companies: ["burning-rock"], technologies: MRD_TECH, terms: MRD_TERMS, keyPapers: [P.prophet], related: ["minerva-prime", "geneplus-personalised-mrd"],
    links: [{ label: "Chen et al., PROPHET in early-stage NSCLC (Cancer Cell 2023)", url: doiUrl("10.1016/j.ccell.2023.08.010") }, { label: "Burning Rock: CanCatch Custom kit enters NMPA innovative device review (25 August 2026)", url: "https://www.brbiotech.com/details.php?class_id=105107103&id=550" }] }),

  test({ id: "minerva-prime", name: "MinerVa Prime", brand: "MinerVa Prime", aka: ["Genecast MinerVa Prime"],
    modality: "Tumour-informed ctDNA minimal residual disease test (up to 52 variants plus a hotspot panel)", status: "emerging",
    mechanism: "Tumour whole-exome sequencing selects up to 52 patient-specific variants, read in plasma together with a fixed panel of more than 1,000 mutation hotspots.",
    tldr: "Genecast's personalised blood test for leftover cancer, used to follow patients with EGFR-mutated lung cancer after surgery in the EVIDENCE trial.",
    summary: "MinerVa Prime is the personalised residual disease assay of Genecast Biotechnology of Wuxi. Its largest published use is the MRD analysis of the phase 3 EVIDENCE trial of adjuvant icotinib versus chemotherapy in resected stage II to IIIA EGFR-mutated non-small cell lung cancer (Zhou et al., Nature Communications 2026): 1,352 plasma samples from 175 patients. At the landmark it found residual disease in 35.8 per cent of stage III and 14.7 per cent of stage II patients, with a longitudinal positivity of 47.4 per cent; positivity was associated with shorter disease-free survival at the landmark (hazard ratio 4.44) and over follow-up (7.82), longitudinal negative predictive value was 91.3 per cent, and median lead time over clinical recurrence was 169 days.",
    notes: [
      "Stated limit of detection, from the paper's full text: \"Probit analysis determined the limit of detection (LoD) values of 0.0075%, 0.0042%, and 0.0024% for 5 ng, 10 ng, and 30 ng inputs, respectively, when tracking 50 variants per sample\" (Zhou et al., Nature Communications 2026). That is 75, 42 and 24 parts per million.",
      "Results are reported as tumour genome equivalents per mL with a residual disease call; no clone attribution is reported.",
    ],
    cancers: ["nsclc"], companies: ["genecast"], technologies: MRD_TECH, terms: MRD_TERMS, drugs: ["icotinib"], keyPapers: [P.minerva], related: ["brprophet"],
    links: [{ label: "Zhou et al., MRD in the EVIDENCE trial (Nature Communications 2026)", url: doiUrl("10.1038/s41467-026-76392-9") }] }),

  test({ id: "geneplus-personalised-mrd", name: "Geneplus personalised MRD assay", aka: ["Geneplus tumour-informed MRD assay", "Geneplus ctDNA-MRD assay"],
    modality: "Tumour-informed ctDNA minimal residual disease test (up to 20 variants plus a fixed panel)", status: "emerging",
    mechanism: "Comprehensive genomic profiling of the tumour selects up to 20 top-ranked variants for a personalised panel, which is combined with a tumour-naive fixed panel for the cancer type and sequenced deeply in plasma.",
    tldr: "Geneplus-Beijing's personalised blood test for leftover cancer in bowel, breast and lung cancer, which labels each tracked mutation as present in all tumour cells or only some.",
    summary: "Geneplus-Beijing described the assay in MedComm in 2025 (Liu et al.): up to 20 variants chosen from tumour profiling, combined with a cancer-type fixed panel, with a stated sample-level limit of detection as low as 0.005 per cent and 100 per cent specificity. Applied to colorectal, breast and lung cancer, it predicted postoperative recurrence before imaging by a median of 112 days in breast cancer and 83 days in lung cancer.\n\nIt is the one published assay in this group that labels the tracked variants as clonal or subclonal, and in its data clonal mutations carried more prognostic value than subclonal ones. That is research output, not a reported clinical field.",
    notes: [
      "Stated limit of detection, in the abstract's words: \"Its limit of detection at the sample level reaches as low as 0.005%\" (Liu et al., MedComm 2025), which is 50 parts per million.",
      "The authors note that personalised panels cannot follow mutations that appear later in resistant subclones.",
    ],
    cancers: ["colorectal", "breast-cancer", "nsclc"], companies: ["geneplus"], technologies: MRD_TECH, terms: MRD_TERMS, keyPapers: [P.geneplus], related: ["brprophet"],
    links: [{ label: "Liu et al., personalised tumour-informed ctDNA assay (MedComm 2025)", url: doiUrl("10.1002/mco2.70483") }] }),

  test({ id: "orimiracle-s", name: "OriMIRACLE S", brand: "OriMIRACLE S", aka: ["OriMIRACLE", "Minimal Residual Circulating Nucleic Acid Longitudinal Detection in Solid Tumor"],
    modality: "Tumour-informed ctDNA minimal residual disease test (clonal variants, multiplex PCR)", status: "emerging",
    mechanism: "Whole-exome sequencing of tumour and matched normal DNA; the OriSelector algorithm picks clonal single-nucleotide variants for a patient-specific multiplex PCR panel, and a sample is called positive when three tracked sites are detected.",
    tldr: "OrigiMed's personalised blood test for leftover cancer, which deliberately tracks only mutations shared by every tumour cell.",
    summary: "OriMIRACLE S was developed by OrigiMed of Shanghai and described in Cancer Medicine in 2023 (Qi et al.) in 127 patients with gastrointestinal tumours: panels of 21 to 30 clonal variants, positivity defined by three detected sites, residual disease detected before surgery in 18 of 26 patients and after surgery in 24 of 82. A 2024 study of 59 patients with osteosarcoma at Sun Yat-sen University, with OrigiMed co-authors and the same variant selection, found that ctDNA after surgery predicted event-free survival and preceded imaging by an average of 92.6 days in five patients.",
    notes: [
      "Stated limit of detection, from the osteosarcoma paper's methods: \"The detection limit for variant allele frequency (VAF) is as low as 0.01%\", with 25 to 100 ng of DNA from an 8 to 20 mL blood sample (Fu et al., eClinicalMedicine 2024). That is 100 parts per million.",
      "Because only clonal variants are tracked, by design the test cannot report a subclone.",
    ],
    cancers: ["gastric", "colorectal", "osteosarcoma"], companies: ["origimed"], technologies: MRD_TECH, terms: MRD_TERMS, keyPapers: [P.orimiracle, P.osteosarcoma], related: ["signatera"],
    links: [{ label: "Qi et al., OriMIRACLE S in gastrointestinal cancer (Cancer Medicine 2023)", url: doiUrl("10.1002/cam4.6286") }, { label: "Fu et al., tumour-informed ctDNA in osteosarcoma (eClinicalMedicine 2024)", url: doiUrl("10.1016/j.eclinm.2024.102697") }] }),

  test({ id: "accuscan-mrd", name: "AccuScan", brand: "AccuScan", aka: ["AccuraGen AccuScan"],
    modality: "Tumour-informed whole-genome ctDNA minimal residual disease test (single-read error correction)", status: "emerging",
    mechanism: "Whole-genome sequencing of cell-free DNA in which each read is error-corrected on its own, so thousands of a tumour's mutations found by tumour whole-genome sequencing can be counted across the genome without a personalised panel.",
    tldr: "A whole-genome blood test for leftover cancer from AccuraGen that corrects sequencing errors read by read, so it can add up thousands of a tumour's mutations.",
    summary: "AccuScan was described by AccuraGen of San Jose, California, with Shanghai YunSheng Medical Laboratory, in EMBO Molecular Medicine in 2024 (Li et al.). The authors report an error rate of 4.2 x 10^-7 and an analytical sensitivity down to 10^-6 circulating variant allele frequency at 99 per cent sample-level specificity. In colorectal cancer it showed 90 per cent landmark sensitivity and 100 per cent specificity for relapse within six weeks of surgery; in oesophageal cancer, 67 per cent sensitivity and 100 per cent specificity one week after surgery.\n\nThe full text's dilution data put the dependable limit near 10 parts per million: detection at 10 parts per million was 96 per cent with 10,000 markers and 100 per cent with 20,000, and in a melanoma dilution series two of three replicates were detected at 5 parts per million and one of three at 2. Commercial status was not confirmed.",
    notes: [
      "Stated limit of detection, in the abstract's words: \"analytical sensitivity down to 10-6 circulating variant allele frequency at 99% sample-level specificity\" (Li et al., EMBO Mol Med 2024). The measured detection rate at 10 parts per million was \"96% for 10K markers\" (full text); the 10^-6 figure rests on one of three replicates.",
      "Contrived samples were donor cell-free DNA mixtures using germline variants as markers, not tumour plasma.",
    ],
    cancers: ["colorectal", "esophageal", "melanoma"], companies: ["accuragen"], technologies: [...MRD_TECH, "wes-wgs"], terms: MRD_TERMS, keyPapers: [P.accuscan], related: ["genome-wide-ctdna-mutation-integration"],
    links: [{ label: "Li et al., AccuScan (EMBO Molecular Medicine 2024)", url: doiUrl("10.1038/s44321-024-00115-0") }] }),

  test({ id: "cancerdetect-imbdx", name: "CancerDetect", brand: "CancerDetect", aka: ["IMBdx CancerDetect", "AlphaLiquid Detect"],
    modality: "Tumour-informed ctDNA minimal residual disease test (bespoke variants plus hotspot panel, hybrid capture)", status: "emerging",
    mechanism: "A bespoke capture panel of patient-specific mutations from tumour sequencing, combined with tumour-agnostic actionable hotspot targets, read with molecular barcodes.",
    tldr: "IMBdx's personalised blood test for leftover cancer, from Seoul, which adds a set of common treatable mutations to the patient's own.",
    summary: "CancerDetect, formerly reported as AlphaLiquid Detect, is the residual disease test of IMBdx of Seoul. Its analytical validation (Heo et al., PLoS One 2025) combines personalised mutations with tumour-agnostic hotspot mutations and reports a limit of detection of 0.001 per cent with 99.9 per cent specificity. The full text measured that limit on a cell-line mixture of 385 germline single-nucleotide polymorphisms rather than on tumour mutations, and the hotspot regions had a separate limit of 0.1 per cent.",
    notes: [
      "Stated limit of detection, in the abstract's words: \"limit of detection successfully reached down to 0.001% (10-5) with 99.9% specificity\" (Heo et al., PLoS One 2025). That is 10 parts per million, at rather than below that level, on a germline-variant mixture.",
    ],
    companies: ["imbdx"], technologies: MRD_TECH, terms: MRD_TERMS, keyPapers: [P.cancerdetect],
    links: [{ label: "Heo et al., analytical validation of CancerDetect (PLoS One 2025)", url: doiUrl("10.1371/journal.pone.0334282") }] }),

  test({ id: "enspyre-mrd", name: "Enspyre", brand: "Enspyre", aka: ["Biofidelity Enspyre"],
    modality: "Tumour-informed ctDNA minimal residual disease assay (mutation enrichment, shallow sequencing)", status: "emerging",
    mechanism: "A custom capture panel against patient-specific variants from tumour whole-genome sequencing, with a chemistry that enriches mutated DNA so that far fewer sequencing reads are needed; no molecular barcodes are used.",
    tldr: "An experimental blood test from Biofidelity in Cambridge that enriches the tumour's mutated DNA before sequencing, so it needs far less sequencing to find leftover cancer.",
    summary: "Enspyre is a ctDNA enrichment method from Biofidelity Ltd of Cambridge, UK. Its analytical study (Labrousse et al., Scientific Reports 2026) used tumour whole-genome sequencing from eight lung cancer patients, ran 72 samples of patient plasma diluted into healthy donor plasma plus eight healthy controls, and reported 100 per cent (6 of 6) detection down to 10 parts per million, residual disease calls as low as 5 parts per million, and no false positives, with a median DNA input of 7.67 ng and a median of 9.6 million read pairs per sample. The authors state that larger studies are needed to establish its analytical performance. Whether it is offered as a clinical test was not confirmed.",
    notes: [
      "Stated limit of detection, in the abstract's words: \"Enspyre reached 100% (6/6) detection rate down to 10 parts per million (ppm) and was able to call MRD in samples as low as 5 ppm\" (Labrousse et al., Sci Rep 2026). Eight patients, diluted plasma.",
    ],
    cancers: ["nsclc"], companies: ["biofidelity"], technologies: MRD_TECH, terms: MRD_TERMS, keyPapers: [P.enspyre],
    links: [{ label: "Labrousse et al., Enspyre (Scientific Reports 2026)", url: doiUrl("10.1038/s41598-026-57421-5") }] }),
];

/** Makers the corpus lacked, each read from the affiliations of its own paper. */
const companies: CompanyInput[] = [
  co({ id: "origimed", name: "OrigiMed", hq: "Shanghai", country: "CN", companyType: "diagnostics", sections: ["diagnostics"],
    tldr: "A Shanghai cancer genomics company whose OriMIRACLE S blood test tracks a tumour's shared mutations to look for leftover cancer.",
    summary: "OrigiMed is a Shanghai genomics company. Its employees co-authored the development of OriMIRACLE S, a tumour-informed residual disease test using clonal variants chosen by its OriSelector algorithm (Cancer Medicine 2023), and the whole-exome sequencing behind a 2024 osteosarcoma ctDNA study at Sun Yat-sen University (eClinicalMedicine 2024).",
    technologies: ["mrd-testing", "liquid-biopsy"], keyPapers: [P.orimiracle],
    links: [{ label: "Qi et al., OriMIRACLE S (Cancer Medicine 2023)", url: doiUrl("10.1002/cam4.6286") }] }),
  co({ id: "accuragen", name: "AccuraGen", hq: "San Jose, CA", country: "US", companyType: "diagnostics", sections: ["diagnostics"],
    tldr: "A Californian company behind AccuScan, a whole-genome blood test for leftover cancer that corrects sequencing errors read by read.",
    summary: "AccuraGen Inc of San Jose, California, developed AccuScan with Shanghai YunSheng Medical Laboratory, according to the affiliations of the 2024 EMBO Molecular Medicine paper describing it. Its website could not be reached when this record was written.",
    technologies: ["mrd-testing", "liquid-biopsy"], keyPapers: [P.accuscan],
    links: [{ label: "Li et al., AccuScan (EMBO Molecular Medicine 2024)", url: doiUrl("10.1038/s44321-024-00115-0") }] }),
  co({ id: "biofidelity", name: "Biofidelity", aka: ["Biofidelity Ltd"], hq: "Cambridge", country: "GB", companyType: "diagnostics", sections: ["diagnostics"],
    tldr: "A Cambridge company developing Enspyre, a way of enriching tumour DNA so blood tests for leftover cancer need far less sequencing.",
    summary: "Biofidelity Ltd of Cambridge, UK, is the affiliation of the authors of the 2026 Scientific Reports study of Enspyre, a mutation-enrichment ctDNA assay tested on diluted lung cancer plasma.",
    technologies: ["mrd-testing", "liquid-biopsy"], keyPapers: [P.enspyre],
    links: [{ label: "Labrousse et al., Enspyre (Scientific Reports 2026)", url: doiUrl("10.1038/s41598-026-57421-5") }] }),
];

// =====================================================================================================================
// TROP2 PET imaging agents
// =====================================================================================================================
const imagingAgents: DrugInput[] = [
  agent({ id: "ga68-my6349", name: "68Ga-MY6349", aka: ["[68Ga]Ga-MY6349", "Gallium-68 MY6349", "MY6349"],
    modality: "Investigational PET imaging agent (TROP2-specific radiotracer, gallium-68)", status: "phase-1",
    mechanism: "A Trop2-specific radiotracer labelled with gallium-68 binds Trop2 on tumour cells, so PET shows where Trop2 is expressed across the body in one scan.",
    tldr: "An experimental PET scan from Xiamen that lights up cancer carrying the TROP2 protein, the target of several antibody-drug conjugates.",
    summary: "68Ga-MY6349 has been studied at the First Affiliated Hospital of Xiamen University, which sponsored its first registered study. In a prospective study of 90 patients with 15 cancer types (Chen et al., Journal of Clinical Investigation 2024; NCT06188468), uptake was generally high but varied between lesions, patients and cancers, and correlated closely with Trop2 expression by immunohistochemistry; in breast cancer, tumour uptake was higher than with 18F-FDG (maximum standardised uptake value 7.2 against 5.4).\n\nIn 73 patients with suspected or confirmed breast cancer (Yu et al., Theranostics 2026) it found more malignant lesions than FDG (564 against 436) with fewer false positives (2 against 40), upgraded stage in 6 of 30 initial-staging patients, changed treatment in 4 of those 30 and in 5 of 43 restaging patients. In three patients with triple-negative breast cancer on sacituzumab tirumotecan, early changes in uptake after two cycles matched the later response; the authors call this preliminary. It is an investigational agent in China and not approved anywhere.",
    notes: [
      "What it can and cannot show: a scan reads Trop2 on lesions large enough to image; it says nothing about the small amounts of residual disease that blood tests detect.",
      "A further study, NCT07753499, uses it in recurrent or metastatic thyroid cancer.",
    ],
    targets: ["trop2"], cancers: ["breast-cancer", "tnbc"], technologies: ["trop2-pet", "pet"], drugs: ["sacituzumab-tirumotecan"], trials: ["nct06188468"],
    keyPapers: [P.my6349Jci, P.my6349Breast], related: ["ga68-nota-t4", "idea-trop2-pet-selection", "fluoroestradiol-f18"],
    links: [{ label: "Chen et al., 68Ga-MY6349 PET/CT across 15 cancers (J Clin Invest 2024)", url: doiUrl("10.1172/jci185408") }, { label: "Yu et al., 68Ga-MY6349 PET/CT in breast cancer (Theranostics 2026)", url: doiUrl("10.7150/thno.136704") }, ct("NCT06188468"), ct("NCT07753499")] }),
  agent({ id: "ga68-nota-t4", name: "68Ga-NOTA-T4", aka: ["[68Ga]Ga-NOTA-T4", "Gallium-68 NOTA-T4"],
    modality: "Investigational PET imaging agent (TROP2-targeting tracer, gallium-68)", status: "phase-1",
    mechanism: "A TROP2-targeting tracer labelled with gallium-68, imaged by PET to show TROP2 expression across all lesions.",
    tldr: "An experimental PET scan from Shanghai that shows TROP2 in breast cancer, and showed that the amount of TROP2 changes with treatment.",
    summary: "[68Ga]Ga-NOTA-T4 was studied at Huashan Hospital, Fudan University, in 42 patients with HER2-negative breast cancer imaged between September 2023 and March 2025 (Liu et al., European Journal of Nuclear Medicine and Molecular Imaging 2026), 27 of whom also had FDG PET. It identified patients and metastatic lesions about as well as FDG. Uptake differed with prior treatment: in luminal B disease, treated patients had higher uptake than untreated ones (maximum standardised uptake value 5.20 against 3.36, p = 0.008), while in triple-negative disease treated patients had lower uptake (3.02 against 7.63, p = 0.008). That is direct imaging evidence that TROP2 expression is not fixed and can move with therapy. A separate registered study at RenJi Hospital, NCT06851663, lists [68Ga]Ga-NOTA-T4 among its tracers.",
    notes: [
      "A retrospective single-centre series; the authors describe the tracer as promising and its use for choosing treatment as untested.",
    ],
    targets: ["trop2"], cancers: ["breast-hr-positive", "tnbc"], technologies: ["trop2-pet", "pet"], trials: ["nct06851663"],
    keyPapers: [P.notaT4], related: ["ga68-my6349", "idea-trop2-pet-selection"],
    links: [{ label: "Liu et al., [68Ga]Ga-NOTA-T4 PET/CT in HER2-negative breast cancer (Eur J Nucl Med Mol Imaging 2026)", url: doiUrl("10.1007/s00259-026-07796-4") }, ct("NCT06851663")] }),
];

// =====================================================================================================================
// Methods: subclone deconvolution, genome-wide aggregation, phenotype from cell-free DNA, duplex sequencing
// =====================================================================================================================
const technologies: TechnologyInput[] = [
  tech({ id: "eclipse-subclone-ctdna", name: "ECLIPSE (subclone tracking from ctDNA)", aka: ["ECLIPSE", "ECLIPSE subclone deconvolution"], sections: ["diagnostics"], status: "emerging", since: 2023,
    tldr: "A research method from the TRACERx lung cancer study that estimates which branches of a tumour's family tree are present in a blood sample, but only when there is enough tumour DNA in the blood.",
    summary: "ECLIPSE is the bioinformatic tool the TRACERx team built to call the presence or absence of individual tumour subclones in plasma and estimate their cancer cell fractions from low-tumour-content cell-free DNA (Abbosh et al., Nature 2023). It uses a background error estimate for each sample and copy number from multi-region tumour sequencing, and was applied to anchored multiplex PCR panels tracking a median of 200 mutations per patient, with up to 4 mL of plasma per case.\n\nIts stated operating point is the most useful single number on how far subclone attribution reaches: plasma with a clonal ctDNA level of 0.1 per cent (1,000 parts per million) had an estimated minimally detectable cancer cell fraction of 20 per cent for a representative subclone, and simulated subclones built from the assay's dilution validation data gave 94 per cent detection sensitivity for a 20 per cent subclone at that level with four tracked mutations and 10 ng of DNA. Detection fell below 10 ng, so only samples with at least 0.1 per cent clonal ctDNA and 10 ng input were analysed for clonal composition. ECLIPSE found patients with polyclonal metastatic dissemination, which carried a worse outcome, and subclones that later seeded metastases were more expanded in preoperative plasma.",
    principle: "Each tracked mutation is assigned to a clone from multi-region tumour sequencing; plasma read counts for each clone's mutations are compared with a per-sample background error rate and corrected for copy number and mutation multiplicity to estimate that clone's cancer cell fraction.",
    strengths: ["Names the subclone, not only the presence of tumour DNA", "Corrects for copy number, which a simple ratio of allele fractions does not", "Validated against multi-region tumour sequencing in TRACERx"],
    limitations: ["Works at 0.1 per cent clonal ctDNA and above, about a hundred times above the levels ultrasensitive tests now report", "Needs multi-region tumour sequencing and tissue copy number", "Published in non-small cell lung cancer only; no breast cancer application was found", "Research tool, not a clinical test"],
    cancers: ["nsclc"], trials: ["tracerx"], technologies: ["mrd-testing", "clonal-evolution-tracking"], keyPapers: [P.eclipse, P.tracerx2017], terms: ["ctdna", "mrd"], bottlenecks: [BOTTLENECK],
    links: [{ label: "Abbosh et al., Nature 2023 (TRACERx ctDNA and ECLIPSE)", url: doiUrl("10.1038/s41586-023-05776-4") }] }),

  tech({ id: "genome-wide-ctdna-mutation-integration", name: "Genome-wide ctDNA mutation integration (MRDetect, MRD-EDGE)", aka: ["MRDetect", "MRD-EDGE", "Whole-genome ctDNA MRD"], sections: ["diagnostics"], status: "emerging", since: 2020,
    tldr: "Instead of reading a few of the tumour's mutations very deeply in blood, read the whole genome once and add up the faint signal from thousands of mutations.",
    summary: "MRDetect (Zviran et al., Nature Medicine 2020) showed that deep sequencing of a small panel is limited by the number of DNA fragments in the tube, and that whole-genome sequencing of cell-free DNA, integrating the signal of thousands of somatic mutations, reached a tumour fraction detection sensitivity as low as 10^-5. MRD-EDGE (Widman et al., Nature Medicine 2024) added machine-learning error suppression that raised single-nucleotide-variant signal-to-noise about 300-fold, cut the aneuploidy needed for copy-number detection from 1 Gb to 200 Mb, detected ctDNA shed by precancerous colorectal adenomas, and allowed plasma-only monitoring without tumour tissue in melanoma and lung cancer on immunotherapy. The commercial descendant of the approach is TrueMRD; AccuScan is a related whole-genome method.",
    principle: "Plasma is sequenced across the whole genome at modest depth; each tumour mutation is seen at most once or twice, and the evidence is summed across thousands of sites, with a classifier separating real tumour fragments from sequencing errors.",
    strengths: ["Breadth replaces depth: thousands of sites rather than a few", "No personalised panel to design"],
    limitations: ["Each site is read about once, so the result is an aggregate tumour fraction and cannot say which clone is present", "The parts-per-million results in MRD-EDGE come from in silico admixtures, not wet-laboratory dilutions"],
    technologies: ["mrd-testing", "wes-wgs"], keyPapers: [P.zviran, P.mrdedge], drugs: ["truemrd"], terms: ["ctdna", "cfdna"], bottlenecks: [BOTTLENECK], related: ["accuscan-mrd"],
    links: [{ label: "Zviran et al., Nat Med 2020 (MRDetect)", url: doiUrl("10.1038/s41591-020-0915-3") }, { label: "Widman et al., Nat Med 2024 (MRD-EDGE)", url: doiUrl("10.1038/s41591-024-03040-4") }] }),

  tech({ id: "griffin-nucleosome-profiling", name: "Griffin (nucleosome profiling of cell-free DNA)", aka: ["Griffin"], sections: ["diagnostics"], status: "emerging", since: 2022,
    tldr: "A way of reading which genes are switched on in a tumour from the pattern of where DNA in the blood is protected, used to tell whether a breast cancer still carries the oestrogen receptor.",
    summary: "Griffin (Doebley et al., Nature Communications 2022) profiles nucleosome protection and accessibility at transcription factor binding sites from cell-free DNA, with a GC correction tailored to fragment size, using whole-genome sequencing at coverage as low as 0.1x. It predicted oestrogen receptor subtype in 139 patients with metastatic breast cancer who had at least 5 per cent detectable ctDNA, with an area under the curve of 0.89, and 0.96 in independent cohorts. Performance depends on tumour fraction, so it reads the phenotype of advanced disease, not of residual disease at parts-per-million levels.",
    principle: "Where a transcription factor such as the oestrogen receptor is bound and active, the DNA is accessible and is cut differently when cells die; summing fragment coverage around thousands of its binding sites in plasma gives a readout of that factor's activity in the cells shedding DNA.",
    strengths: ["Reads a phenotype (oestrogen receptor activity), not a mutation", "Works from cheap low-coverage sequencing"],
    limitations: ["Validated only with at least 5 per cent tumour fraction", "Tumour-naive: signal from tumour is diluted by the blood cells' own DNA"],
    cancers: ["breast-hr-positive"], targets: ["estrogen-receptor"], technologies: ["fragmentomics", "liquid-biopsy"], keyPapers: [P.griffin], terms: ["cfdna", "ctdna"], bottlenecks: [BOTTLENECK], related: ["meter-methylome-subtyping", "epic-seq"],
    links: [{ label: "Doebley et al., Nat Commun 2022 (Griffin)", url: doiUrl("10.1038/s41467-022-35076-w") }] }),

  tech({ id: "meter-methylome-subtyping", name: "METER (methylome-based ctDNA detection and subtyping)", aka: ["METER"], sections: ["diagnostics"], status: "emerging", since: 2026,
    tldr: "A computer method that reads chemical marks on DNA in the blood to measure how much breast cancer is there and whether it still carries the oestrogen receptor.",
    summary: "METER (Paoli et al., Genome Medicine 2026) uses tumour-type-specific DNA methylation patterns in low-pass (0.5 to 1x) whole-methylome sequencing of plasma to detect, quantify and subtype ctDNA without tumour tissue. In longitudinal samples from metastatic breast cancer it was more strongly associated with outcome than other ctDNA methods and matched circulating tumour cell counts, including below 3 per cent tumour content. In the full text, oestrogen receptor calls on samples with at least 5 per cent tumour content had an accuracy of 0.93 when the two cohorts were combined (80 ER-positive against 12 ER-negative samples). The authors state that subtype accuracy depends on tumour content.",
    principle: "Plasma methylation is deconvolved into reference components, including oestrogen receptor positive and negative breast cancer, and the predominant component assigns the subtype.",
    strengths: ["Quantifies and subtypes from one low-cost assay", "Open source"],
    limitations: ["Subtyping validated at 5 per cent tumour content and above, in metastatic disease", "Only 12 ER-negative samples in the combined validation"],
    cancers: ["breast-hr-positive"], targets: ["estrogen-receptor"], technologies: ["methylation-profiling", "cfdna-methylation-testing"], keyPapers: [P.meter], terms: ["cfdna", "ctdna"], bottlenecks: [BOTTLENECK], related: ["griffin-nucleosome-profiling"],
    links: [{ label: "Paoli et al., Genome Med 2026 (METER)", url: doiUrl("10.1186/s13073-026-01603-3") }, { label: "METER code", url: "https://github.com/caos-lab-unifi/METER" }] }),

  tech({ id: "epic-seq", name: "EPIC-seq (expression inference from cell-free DNA)", aka: ["EPIC-seq", "Epigenetic expression inference from cell-free DNA-sequencing"], sections: ["diagnostics"], status: "emerging", since: 2022,
    tldr: "A blood test method that infers which genes a tumour is using from how DNA fragments are cut at the start of each gene.",
    summary: "EPIC-seq (Esfahani et al., Nature Biotechnology 2022) uses targeted sequencing of gene promoters and a feature called promoter fragmentation entropy to predict RNA expression at individual genes from cell-free DNA. In 329 blood samples from 201 patients with cancer and 87 healthy adults it classified subtypes of lung carcinoma and diffuse large B-cell lymphoma, and inferred expression profiles correlated with response to PD-1 or PD-L1 inhibitors. In the full text, lung cancer histology accuracy was 87 per cent at mean allele fractions above 5 per cent, 81 per cent between 1 and 5 per cent and 73 per cent below 1 per cent.",
    principle: "Active promoters lose a well-positioned nucleosome, so the sizes of fragments starting there are more varied; that variety (entropy) tracks how much the gene is expressed in the cells that shed the DNA.",
    strengths: ["Gene-level expression from blood", "Targeted, so it is cheaper than whole-genome approaches"],
    limitations: ["Accuracy falls with tumour fraction", "Shown for lung cancer histology and lymphoma cell of origin, not for oestrogen receptor or TROP2"],
    cancers: ["nsclc", "dlbcl"], technologies: ["fragmentomics", "liquid-biopsy"], keyPapers: [P.epic], terms: ["cfdna", "ctdna"], bottlenecks: [BOTTLENECK], related: ["griffin-nucleosome-profiling", "plasma-epigenomic-profiling"],
    links: [{ label: "Esfahani et al., Nat Biotechnol 2022 (EPIC-seq)", url: doiUrl("10.1038/s41587-022-01222-4") }] }),

  tech({ id: "plasma-epigenomic-profiling", name: "Plasma epigenomic profiling (cfChIP-seq)", aka: ["cfChIP-seq", "ChIP-seq of plasma cell-free nucleosomes", "Liquid biopsy epigenomic profiling"], sections: ["diagnostics"], status: "emerging", since: 2021,
    tldr: "Pulling down DNA in the blood that is still wrapped in the chemical marks of active genes, to see which genes the tumour has switched on, including the targets of some drugs.",
    summary: "Chromatin immunoprecipitation of cell-free nucleosomes carrying active histone marks (cfChIP-seq) was applied to 268 plasma samples by Sadeh and colleagues (Nature Biotechnology 2021), who detected transcriptionally active HER2 amplifications in metastatic colorectal cancer. Baca and colleagues (Nature Medicine 2023) extended it to histone modifications and DNA methylation from 1 mL of plasma, measuring 1,268 epigenomic profiles from 433 people with 15 cancers, and inferred the expression of diagnostic markers and drug targets and the activity of targetable transcription factors. In the full text, samples were analysed only above 3 per cent ctDNA (5 per cent for ERBB2), the level to which the tumour-fraction estimator is benchmarked, and the oestrogen receptor comparisons involved 17 to 19 patients. TROP2 (TACSTD2) is not among the genes reported.",
    principle: "Antibodies against marks of active promoters and enhancers (H3K4me3, H3K27ac) capture the nucleosomes that carried them in the dying cell; sequencing what is captured maps which genes were active in the cells shedding DNA.",
    strengths: ["Reads transcriptional programmes and drug-target expression from blood", "Works from 1 mL of plasma"],
    limitations: ["Proof of concept in advanced cancers at percent-level ctDNA", "No TROP2 readout published", "Small validation sets for oestrogen receptor"],
    technologies: ["liquid-biopsy", "methylation-profiling"], keyPapers: [P.sadeh, P.baca], terms: ["cfdna", "ctdna"], bottlenecks: [BOTTLENECK], related: ["epic-seq", "griffin-nucleosome-profiling"],
    links: [{ label: "Sadeh et al., Nat Biotechnol 2021 (cfChIP-seq)", url: doiUrl("10.1038/s41587-020-00775-6") }, { label: "Baca et al., Nat Med 2023", url: doiUrl("10.1038/s41591-023-02605-z") }] }),

  tech({ id: "saferseqs", name: "SaferSeqS (Watson and Crick strand sequencing)", aka: ["SaferSeqS"], sections: ["diagnostics"], status: "emerging", since: 2021,
    tldr: "A way of reading both strands of each DNA molecule in a blood sample, so a real mutation can be told from a copying error even when only one molecule in 100,000 carries it.",
    summary: "SaferSeqS (Cohen et al., Nature Biotechnology 2021, Johns Hopkins) introduces identical molecular barcodes on the Watson and Crick strands of each template molecule and enriches targets with strand-specific PCR. It detects variants below 1 in 100,000 template molecules with a background mutation rate below 5 x 10^-7 mutants per base pair, can assess one or several amplicons, recovers both strands well from limited cell-free DNA, and cuts the error rate of existing barcoding approaches by more than 100-fold. It reaches that level per locus, for the few mutations it assays. Haystack MRD describes its chemistry as an optimised version of the earlier Safe-SeqS method from the same group.",
    principle: "A true mutation is present on both strands of a double-stranded molecule; an error made while copying is usually on one. Requiring both strands, tied together by barcodes, removes most errors.",
    strengths: ["Error rate low enough to read single rare molecules", "Works on small amounts of cell-free DNA"],
    limitations: ["Amplicon based: each assay reads few loci, so the total number of informative molecules is small", "A per-locus limit, not a whole-sample limit"],
    technologies: ["mrd-testing", "liquid-biopsy"], keyPapers: [P.saferseqs], terms: ["ctdna", "ngs"], related: ["haystack-mrd", IDEA],
    links: [{ label: "Cohen et al., Nat Biotechnol 2021 (SaferSeqS)", url: doiUrl("10.1038/s41587-021-00900-z") }] }),
];

// =====================================================================================================================
// Papers (abstracts read through Europe PMC on 4 November 2026)
// =====================================================================================================================
const ref = (label: string, doi: string, pmid: string) => [{ label, url: doiUrl(doi) }, { label: "PubMed", url: pubmed(pmid) }];

const papers: PaperInput[] = [
  p({ id: P.parsons, name: "Sensitive Detection of Minimal Residual Disease in Patients Treated for Early-Stage Breast Cancer",
    tldr: "A breast cancer blood test that tracked hundreds of each patient's tumour mutations found leftover disease that predicted relapse, but most patients' tumours had far fewer mutations to track, and that set how sensitive the test could be.",
    summary: "The authors tracked hundreds of patient-specific mutations in cell-free DNA with an error rate 1,000-fold lower than conventional sequencing, after whole-exome sequencing of each tumour. In a dilution series the approach was 100-fold more sensitive than digital droplet PCR when tracking 488 mutations, but most patients had fewer identifiable tumour mutations to track (median 57, range 2 to 346). Clinical sensitivity was 81 per cent (13 of 16) in newly diagnosed metastatic breast cancer, 23 per cent (7 of 30) after surgery and 19 per cent (6 of 32) at one year in early-stage disease, highest in patients with the most mutations to track. Residual disease at one year was associated with distant recurrence (hazard ratio 20.8, 95% CI 7.3 to 58.9), with a median lead time of 18.9 months.",
    journal: "Clinical Cancer Research", year: 2020, doi: "10.1158/1078-0432.CCR-19-3005", pmid: "32170028", authors: "Parsons HA, Rhoades J, Reed SC, et al.", paperType: "translational", participants: 158,
    findings: ["100-fold more sensitive than ddPCR when tracking 488 mutations.", "Median 57 trackable tumour mutations per patient (range 2 to 346).", "Clinical sensitivity 23% after surgery and 19% at one year in early breast cancer.", "Residual disease at one year: distant recurrence hazard ratio 20.8 (95% CI 7.3 to 58.9); median lead time 18.9 months."],
    whatItMeans: "In breast cancer, how sensitive a personalised blood test can be is limited by how many mutations it tracks, and breast tumours have relatively few in the protein-coding part of the genome that exome sequencing reads. Designs built from the whole genome find many more, so the 57 is a limit of the exome method rather than of the tumour.",
    caveats: ["Retrospective cohorts with prospectively collected plasma.", "Sensitivity depended on the number of mutations available, which varies widely between patients."],
    technologies: ["mrd-testing"], cancers: ["breast-cancer", "breast-hr-positive"], terms: MRD_TERMS, journals: ["clinical-cancer-research"], bottlenecks: [BOTTLENECK], sections: ["diagnostics"],
    links: ref("Parsons et al., Clin Cancer Res 2020", "10.1158/1078-0432.CCR-19-3005", "32170028") }),

  p({ id: P.coates, name: "Parallel Genomic Alterations of Antigen and Payload Targets Mediate Polyclonal Acquired Clinical Resistance to Sacituzumab Govitecan in Triple-Negative Breast Cancer",
    tldr: "When triple-negative breast cancer became resistant to sacituzumab govitecan in one patient, one branch of the tumour had changed the drug's payload target and a different branch had changed TROP2 itself.",
    summary: "RNA and whole-exome sequencing of tumour specimens before treatment and after progression on sacituzumab govitecan in triple-negative breast cancer. A patient with de novo progression lacked TROP2 expression, while a patient with a deep, prolonged response had robust TROP2 expression and focal amplification of TACSTD2, the TROP2 gene. At acquired resistance in that patient, one phylogenetic branch carried the canonical TOP1 E418K resistance mutation and a later frameshift TOP1 mutation, while a distinct branch carried a new TACSTD2 T256R missense mutation. Reconstitution experiments showed that T256R causes resistance through defective plasma membrane localisation and reduced cell-surface binding by hRS7, the antibody in the drug.",
    journal: "Cancer Discovery", year: 2021, doi: "10.1158/2159-8290.CD-21-0702", pmid: "34404686", authors: "Coates JT, Sun S, Leshchiner I, et al.", paperType: "translational",
    findings: ["De novo progression in a patient whose tumour lacked TROP2 expression.", "Acquired resistance in one patient arose on two branches: TOP1 E418K (payload target) on one, TACSTD2 T256R (antibody target) on another.", "TROP2 T256R reduces membrane localisation and hRS7 binding."],
    whatItMeans: "Resistance can come from different subclones in the same person, each with its own mechanism, and one of them changed the TROP2 protein itself. It is the clearest published link between a residual clone and a TROP2 phenotype, made from tissue at progression rather than from blood.",
    caveats: ["Case-level evidence from a small number of patients.", "Tissue at progression in metastatic disease, not plasma at residual-disease levels."],
    drugs: ["sacituzumab-govitecan"], targets: ["trop2"], cancers: ["tnbc"], journals: ["cancer-discovery"], bottlenecks: [BOTTLENECK], sections: ["adcs"],
    links: ref("Coates et al., Cancer Discov 2021", "10.1158/2159-8290.CD-21-0702", "34404686") }),

  p({ id: P.notini, name: "Pan-cancer multi-omic integration of Trop2 reveals biological determinants and translational implications for ADC therapy",
    tldr: "Across more than 20,000 tumour and normal samples, how much TROP2 a tissue makes was set mainly by chemical marks on its DNA rather than by mutations in its gene.",
    summary: "The authors integrated bulk and single-cell transcriptomes from more than 20,000 samples across TCGA, GTEx and public atlases to map TACSTD2 (TROP2) expression in solid tumours and healthy epithelia. Expression was restricted to epithelial lineages, enriched in several tumours and detectable in some normal epithelia. Genomic alterations of the gene were uncommon, whereas DNA methylation showed a consistent inverse association with expression, indicating dominant epigenetic control. TACSTD2 expression was linked to epithelial barrier programmes and variable immune interactions, and showed modest, context-dependent co-expression with genes involved in processing antibody-drug conjugates and in payload sensitivity. The authors conclude that antigen abundance alone is insufficient to predict ADC efficacy or toxicity.",
    journal: "NPJ Precision Oncology", year: 2026, doi: "10.1038/s41698-026-01523-w", pmid: "42297906", authors: "Notini G, Galbardi B, Viale G, et al.", paperType: "translational",
    findings: ["More than 20,000 samples integrated across TCGA, GTEx and public atlases.", "TACSTD2 genomic alterations were uncommon; DNA methylation was inversely associated with expression.", "Antigen abundance alone did not predict ADC efficacy or toxicity."],
    whatItMeans: "If TROP2 levels are set by methylation rather than by mutation, a blood test that tracks a tumour's mutations carries almost no information about whether the cells left behind make TROP2. A test that reads methylation might.",
    caveats: ["Associations in public expression data, not a clinical study.", "Methylation was inversely associated with expression; whether it can be read from blood at useful levels is untested."],
    targets: ["trop2"], cancers: ["breast-cancer", "tnbc"], drugs: ["sacituzumab-govitecan", "datopotamab-deruxtecan"], technologies: ["methylation-profiling"], bottlenecks: [BOTTLENECK], sections: ["adcs"],
    links: ref("Notini et al., NPJ Precis Oncol 2026", "10.1038/s41698-026-01523-w", "42297906") }),

  p({ id: P.northcott, name: "Analytical validation of NeXT Personal®, an ultra-sensitive personalized circulating tumor DNA assay",
    tldr: "The laboratory validation of Personalis' whole-genome blood test for leftover cancer, which detected tumour DNA at a few parts per million.",
    summary: "NeXT Personal uses whole-genome sequencing of tumour and matched normal to identify up to about 1,800 patient-specific somatic variants for a personalised panel, sequenced in plasma cell-free DNA. Validation used panels from two cell lines and 123 patients across nine cancer types. The detection threshold was 1.67 parts per million and the 95 per cent limit of detection 3.45 parts per million; the assay was linear from 0.8 to 300,000 parts per million (Pearson 0.9998), precision ranged from a coefficient of variation of 12.8 to 3.6 per cent across 25 to 25,000 parts per million, and specificity measured 100 per cent against a 99.9 per cent target.",
    journal: "Oncotarget", year: 2024, doi: "10.18632/oncotarget.28565", pmid: "38484152", authors: "Northcott J, Bartha G, Harris J, et al.", paperType: "methods",
    findings: ["Detection threshold 1.67 ppm; LOD95 3.45 ppm.", "Linear from 0.8 to 300,000 ppm.", "Up to about 1,800 tracked variants per patient."],
    whatItMeans: "Personalised whole-genome designs can detect tumour DNA at a few parts per million. The panel favours variants present at high fraction in the tumour, so it is built to detect the trunk, not to tell branches apart.",
    caveats: ["Company-authored analytical validation.", "Personalis' product page gives a limit of quantification of 10 parts per million, so detections below that are not quantitative by the company's own definition.", "Validated cell-free DNA input was 2 to 30 ng."],
    drugs: ["next-personal"], companies: ["personalis"], technologies: ["mrd-testing", "wes-wgs"], terms: MRD_TERMS, journals: ["oncotarget"], bottlenecks: [BOTTLENECK], sections: ["diagnostics"],
    links: ref("Northcott et al., Oncotarget 2024", "10.18632/oncotarget.28565", "38484152") }),

  p({ id: P.klimova, name: "Analytical validation of a circulating tumor DNA assay using PhasED-Seq technology for detecting residual disease in B-cell malignancies",
    tldr: "The laboratory validation of Foresight's phased-variant blood test in lymphoma, which detected tumour DNA at below one part per million when given plenty of DNA.",
    summary: "Blank plasma assessed specificity and a limiting dilution of a contrived diffuse large B-cell lymphoma sample assessed sensitivity and precision. The false positive rate was 0.24 per cent and the background error rate 1.95 x 10^-8. The 95 per cent limit of detection with 120 ng of input DNA was 0.7 parts per million, with precision above 96 per cent. Against a single-nucleotide-variant method as reference, positive percent agreement was 90.62 per cent (95% CI 74.98 to 98.02) and negative percent agreement 77.78 per cent (52.73 to 93.59).",
    journal: "Oncotarget", year: 2025, doi: "10.18632/oncotarget.28719", pmid: "40353795", authors: "Klimova N, Close S, Kurtz DM, et al.", paperType: "methods",
    findings: ["LOD95 0.7 parts per million at 120 ng input.", "False positive rate 0.24%; background error rate 1.95E-08.", "Positive percent agreement 90.62%, negative percent agreement 77.78% against an SNV-based comparator."],
    whatItMeans: "Reading several mutations on one fragment pushes detection below one part per million in lymphoma, where such clustered mutations are common. It has not been shown in breast cancer, where they are rarer.",
    caveats: ["B-cell malignancies only.", "The limit was set at 120 ng of input, more than most blood draws give.", "Company-authored."],
    drugs: ["foresight-clarity"], companies: ["foresight-diagnostics"], cancers: ["dlbcl"], technologies: ["mrd-testing", "ctdna-lymphoma-monitoring"], terms: MRD_TERMS, journals: ["oncotarget"], sections: ["diagnostics"],
    links: ref("Klimova et al., Oncotarget 2025", "10.18632/oncotarget.28719", "40353795") }),

  p({ id: P.griffin, name: "A framework for clinical cancer subtyping from nucleosome profiling of cell-free DNA",
    tldr: "A method that reads whether a breast cancer still carries the oestrogen receptor from the DNA in a blood sample, when there is enough tumour DNA there.",
    summary: "Griffin profiles nucleosome protection and accessibility from cell-free DNA at as low as 0.1x whole-genome coverage, with a GC correction tailored to fragment size. It predicted oestrogen receptor subtype in 139 patients with metastatic breast cancer with at least 5 per cent detectable ctDNA, with an area under the curve of 0.89, and 0.96 in independent cohorts.",
    journal: "Nature Communications", year: 2022, doi: "10.1038/s41467-022-35076-w", pmid: "36463275", authors: "Doebley AL, Ko M, Liao H, et al.", paperType: "methods", participants: 139,
    findings: ["ER subtype predicted with AUC 0.89 in 139 patients with at least 5% ctDNA.", "AUC 0.96 in independent validation cohorts."],
    whatItMeans: "The phenotype of advanced breast cancer, not only its mutations, can be read from blood. The method needs percent-level tumour DNA, so it does not yet reach residual disease after surgery.",
    caveats: ["Metastatic disease, tumour fraction at least 5%.", "In the full text, performance was lower between 5 and 10 per cent tumour fraction than above it."],
    technologies: ["griffin-nucleosome-profiling", "fragmentomics"], targets: ["estrogen-receptor"], cancers: ["breast-hr-positive"], terms: ["cfdna", "ctdna"], journals: ["nature-communications"], sections: ["diagnostics"],
    links: ref("Doebley et al., Nat Commun 2022", "10.1038/s41467-022-35076-w", "36463275") }),

  p({ id: P.meter, name: "A computational framework for sensitive tumor detection and accurate subtyping using shallow cell-free DNA methylome sequencing",
    tldr: "A method that reads DNA methylation in blood to measure metastatic breast cancer and call its oestrogen receptor status without tumour tissue.",
    summary: "METER exploits tumour-type-specific DNA methylation patterns for ctDNA detection, quantification and subtyping from plasma low-pass (0.5 to 1x) whole-methylome sequencing. In longitudinal samples from metastatic breast cancer it showed a stronger association with clinical outcomes than other ctDNA methods and matched circulating tumour cell counts, even at tumour content below 3 per cent. In the full text, oestrogen receptor calls in samples with at least 5 per cent tumour content reached an accuracy of 0.93 (95% CI 0.85 to 0.97) when the MIMESIS-1 and MIMESIS-2 cohorts were combined.",
    journal: "Genome Medicine", year: 2026, doi: "10.1186/s13073-026-01603-3", pmid: "41634848", authors: "Paoli M, Galardi F, Nardone A, et al.", paperType: "methods",
    findings: ["Associated with outcome more strongly than other ctDNA methods and CTC counts, including below 3% tumour content.", "ER status accuracy 0.93 at 5% tumour content or more (80 ER-positive, 12 ER-negative samples; full text)."],
    whatItMeans: "Methylation in blood can say whether advanced breast cancer still carries the oestrogen receptor. Subtyping still needs percent-level tumour content.",
    caveats: ["Few ER-negative samples.", "Metastatic disease only."],
    technologies: ["meter-methylome-subtyping", "methylation-profiling"], targets: ["estrogen-receptor"], cancers: ["breast-hr-positive"], terms: ["cfdna", "ctdna"], sections: ["diagnostics"],
    links: ref("Paoli et al., Genome Med 2026", "10.1186/s13073-026-01603-3", "41634848") }),

  p({ id: P.baca, name: "Liquid biopsy epigenomic profiling for cancer subtyping",
    tldr: "Reading chemical marks on DNA and its packaging from 1 mL of blood let researchers infer which genes advanced cancers had switched on, including the targets of some drugs.",
    summary: "An immunoprecipitation-based method targeting histone modifications and DNA methylation measured 1,268 epigenomic profiles in plasma from 433 people with one of 15 cancers. It served as a proxy for transcriptional activity, inferring expression of diagnostic markers and drug targets, the activity of targetable transcription factors, and epigenetic mechanisms of resistance.",
    journal: "Nature Medicine", year: 2023, doi: "10.1038/s41591-023-02605-z", pmid: "37865722", authors: "Baca SC, Seo JH, Davidsohn MP, et al.", paperType: "translational", participants: 433,
    findings: ["1,268 plasma epigenomic profiles from 433 individuals with 15 cancers, from 1 mL of plasma.", "Inferred expression of drug targets and activity of targetable transcription factors."],
    whatItMeans: "Blood can show what a tumour is doing, not only what mutations it has. It is a proof of concept in advanced cancer.",
    caveats: ["Advanced cancers; analyses were restricted to samples above 3 per cent ctDNA in the full text.", "TROP2 is not among the targets reported."],
    technologies: ["plasma-epigenomic-profiling", "liquid-biopsy"], terms: ["cfdna", "ctdna"], journals: ["nature-medicine"], sections: ["diagnostics"],
    links: ref("Baca et al., Nat Med 2023", "10.1038/s41591-023-02605-z", "37865722") }),

  p({ id: P.sadeh, name: "ChIP-seq of plasma cell-free nucleosomes identifies gene expression programs of the cells of origin",
    tldr: "Pulling down DNA in blood that was still wrapped in the marks of active genes showed which genes the cells it came from were using.",
    summary: "Chromatin immunoprecipitation of cell-free nucleosomes carrying active chromatin modifications, followed by sequencing (cfChIP-seq), was applied to 268 human samples. In healthy donors it identified bone marrow megakaryocytes, but not erythroblasts, as major contributors to cell-free DNA; in liver disease it identified pathology-related changes in hepatocyte transcription; and in metastatic colorectal carcinoma it detected patient-specific information including transcriptionally active HER2 amplifications, at low sequencing depth.",
    journal: "Nature Biotechnology", year: 2021, doi: "10.1038/s41587-020-00775-6", pmid: "33432199", authors: "Sadeh R, Sharkia I, Fialkoff G, et al.", paperType: "methods",
    findings: ["268 samples profiled by cfChIP-seq.", "Transcriptionally active HER2 amplifications detected in metastatic colorectal cancer."],
    whatItMeans: "The first demonstration that gene activity in the tissue of origin can be read from nucleosomes in blood.",
    caveats: ["Metastatic disease for the cancer findings."],
    technologies: ["plasma-epigenomic-profiling"], cancers: ["colorectal"], terms: ["cfdna"], journals: ["nature-biotechnology"], sections: ["diagnostics"],
    links: ref("Sadeh et al., Nat Biotechnol 2021", "10.1038/s41587-020-00775-6", "33432199") }),

  p({ id: P.epic, name: "Inferring gene expression from cell-free DNA fragmentation profiles",
    tldr: "How DNA fragments in blood are cut at the start of each gene predicted how active that gene was, enough to tell lung and lymphoma subtypes apart.",
    summary: "Promoter fragmentation entropy is an epigenomic cell-free DNA feature that predicts RNA expression at individual genes. EPIC-seq applies it with targeted sequencing of promoters. In 329 blood samples from 201 patients with cancer and 87 healthy adults it classified subtypes of lung carcinoma and diffuse large B-cell lymphoma, and in serial samples from patients on PD-1 or PD-L1 inhibitors the inferred expression profiles correlated with clinical response.",
    journal: "Nature Biotechnology", year: 2022, doi: "10.1038/s41587-022-01222-4", pmid: "35361996", authors: "Esfahani MS, Hamilton EG, Mehrmohamadi M, et al.", paperType: "methods", participants: 288,
    findings: ["329 samples from 201 patients with cancer and 87 healthy adults.", "Lung carcinoma and DLBCL subtypes classified from blood.", "Histology accuracy 87% above 5% mean allele fraction and 73% below 1% (full text)."],
    whatItMeans: "Gene expression, not only mutation, can be inferred from blood, and the method keeps some accuracy below 1 per cent tumour DNA. That is still far above residual-disease levels.",
    caveats: ["Accuracy falls with tumour fraction.", "Not tested for oestrogen receptor or TROP2."],
    technologies: ["epic-seq", "fragmentomics"], cancers: ["nsclc", "dlbcl"], terms: ["cfdna", "ctdna"], journals: ["nature-biotechnology"], sections: ["diagnostics"],
    links: ref("Esfahani et al., Nat Biotechnol 2022", "10.1038/s41587-022-01222-4", "35361996") }),

  p({ id: P.saferseqs, name: "Detection of low-frequency DNA variants by targeted sequencing of the Watson and Crick strands",
    tldr: "Barcoding both strands of each DNA molecule let researchers find mutations carried by fewer than 1 in 100,000 molecules.",
    summary: "SaferSeqS introduces identical molecular barcodes into the Watson and Crick strands of template molecules and enriches targets by strand-specific PCR. It detects variants at frequencies below 1 in 100,000 DNA template molecules with a background mutation rate below 5 x 10^-7 mutants per base pair, can evaluate one or several amplicons, assesses limited quantities of cell-free DNA with high recovery of both strands, and reduces the error rate of existing PCR-based barcoding by more than 100-fold.",
    journal: "Nature Biotechnology", year: 2021, doi: "10.1038/s41587-021-00900-z", pmid: "33941929", authors: "Cohen JD, Douville C, Dudley JC, et al.", paperType: "methods",
    findings: ["Variants detected below 1 in 100,000 template molecules.", "Background below 5 x 10^-7 mutants per base pair.", "More than 100-fold lower error than earlier barcoding."],
    whatItMeans: "Error is no longer what stops a blood test reading one rare molecule; how many molecules there are is.",
    caveats: ["Per-amplicon performance; few loci per assay."],
    technologies: ["saferseqs", "liquid-biopsy"], terms: ["ctdna", "ngs"], journals: ["nature-biotechnology"], sections: ["diagnostics"],
    links: ref("Cohen et al., Nat Biotechnol 2021", "10.1038/s41587-021-00900-z", "33941929") }),

  p({ id: P.mrdedge, name: "Ultrasensitive plasma-based monitoring of tumor burden using machine-learning-guided signal enrichment",
    tldr: "A machine-learning upgrade to whole-genome blood testing that strips out sequencing errors well enough to follow cancer without any tumour tissue.",
    summary: "MRD-EDGE is a machine-learning-guided whole-genome ctDNA platform for single-nucleotide and copy-number variants. Its SNV component uses deep learning and a ctDNA-specific feature space to raise signal-to-noise about 300-fold over earlier whole-genome error suppression; its copy-number component cuts the aneuploidy needed for detection from 1 Gb to 200 Mb. The authors used it to find residual disease after surgery in several cancers, track tumour fraction during neoadjuvant immunotherapy in lung cancer, show ctDNA shedding from precancerous colorectal adenomas, and monitor advanced melanoma and lung cancer on immune checkpoint inhibitors from plasma alone.",
    journal: "Nature Medicine", year: 2024, doi: "10.1038/s41591-024-03040-4", pmid: "38877116", authors: "Widman AJ, Shah M, Frydendahl A, et al.", paperType: "methods",
    findings: ["About 300-fold signal-to-noise enrichment over prior whole-genome error suppression.", "Copy-number detection needs 200 Mb of aneuploidy rather than 1 Gb.", "Plasma-only monitoring in melanoma and lung cancer on immunotherapy."],
    whatItMeans: "Whole-genome methods can now follow cancer in blood without a tumour sample. Because each site is read about once, the result is how much tumour DNA there is, not which clone.",
    caveats: ["The parts-per-million detection figures in the full text come from in silico admixtures."],
    technologies: ["genome-wide-ctdna-mutation-integration", "mrd-testing"], cancers: ["melanoma", "nsclc", "colorectal"], terms: ["ctdna", "cfdna"], journals: ["nature-medicine"], sections: ["diagnostics"],
    links: ref("Widman et al., Nat Med 2024", "10.1038/s41591-024-03040-4", "38877116") }),

  p({ id: P.santonja, name: "Comparison of tumor-informed and tumor-naïve sequencing assays for ctDNA detection in breast cancer",
    tldr: "In breast cancer, blood tests built from each patient's tumour mutations found the smallest amounts of tumour DNA, down to a few parts per million when thousands of mutations were tracked.",
    summary: "Serial plasma from patients with breast cancer was analysed with tumour-informed and tumour-naive assays for structural variants, single-nucleotide variants and copy-number changes, by multiplex PCR, hybrid capture and whole-genome sequencing at different depths. ctDNA dynamics and allele fractions were highly concordant between assays, and tumour-informed assays were the most sensitive at low concentrations. Hybrid capture targeting 1,347 to 7,491 tumour-identified mutations detected ctDNA down to an allele fraction of 0.00024 per cent (2.4 parts per million); multiplex PCR targeting 21 to 47 structural variants detected it down to 0.00047 per cent (4.7 parts per million).",
    journal: "EMBO Molecular Medicine", year: 2023, doi: "10.15252/emmm.202216505", pmid: "37161793", authors: "Santonja A, Cooper WN, Eldridge MD, et al.", paperType: "methods",
    findings: ["Hybrid capture of 1,347 to 7,491 mutations: detection down to 2.4 ppm.", "Multiplex PCR of 21 to 47 structural variants: detection down to 4.7 ppm."],
    whatItMeans: "Parts-per-million detection in breast cancer needs thousands of tracked mutations or a smaller set of structural variants; detection still pools them all, so it does not say which clone is present.",
    caveats: ["Lowest detected values, not 95 per cent limits of detection."],
    technologies: ["mrd-testing"], cancers: ["breast-cancer"], terms: MRD_TERMS, sections: ["diagnostics"],
    links: ref("Santonja et al., EMBO Mol Med 2023", "10.15252/emmm.202216505", "37161793") }),

  p({ id: P.trakEr, name: "Prospective circulating tumour DNA surveillance in patients with early high-risk hormone receptor positive, HER2-negative breast cancer in the TRAK-ER study",
    tldr: "In TRAK-ER, three-monthly blood tests found tumour DNA in about one in eight women with high-risk hormone-receptor-positive breast cancer, but two thirds of those found on their first test already had cancer visible on scans.",
    summary: "TRAK-ER enrols patients with high-risk ER-positive, HER2-negative early breast cancer for three-monthly ctDNA surveillance for up to three years during adjuvant endocrine therapy, using a tumour-informed assay from Labcorp; on detection, patients have staging scans and, without radiological recurrence, are randomised to palbociclib plus fulvestrant or standard endocrine therapy. This protocol-specified analysis reports the surveillance phase. 1,133 patients were registered by September 2025; panel design failed in 16.1 per cent (178 of 1,106) and 912 started surveillance, with 5,810 tests (median 7 per patient). Detection was 5.0 per cent on the first test and 1.3 per cent on later tests; patient-level detection was 12.0 per cent (109 of 912), and 1.1 per cent (10 of 912) had a clinical recurrence without prior ctDNA detection. Estimated cumulative detection at five years after surgery was 23.7 per cent (95% CI 14.5 to 31.9). Of patients detected on their first test, 65.9 per cent (29 of 44) already had radiological recurrence, against 26.6 per cent (17 of 64) of those first detected later. The authors conclude that ultrasensitive assays detecting ctDNA at low levels are required to identify patients before clinical recurrence.",
    journal: "Annals of Oncology", year: 2026, doi: "10.1016/j.annonc.2026.10.1292", pmid: "42946309", authors: "Cunningham N, Swift C, Cutts RJ, et al.", paperType: "observational", participants: 912,
    findings: ["Panel design failed in 16.1% (178 of 1,106).", "Patient-level ctDNA detection 12.0% (109 of 912); 5-year cumulative 23.7%.", "Radiological recurrence at detection in 65.9% of first-test positives against 26.6% of later positives."],
    whatItMeans: "Surveillance blood tests in hormone-receptor-positive breast cancer find relapse, but often too late to act on it before scans show it. The randomised question, whether treating at molecular relapse helps, has not yet reported.",
    caveats: ["Surveillance phase only; the treatment phase is ongoing.", "One assay, tumour-informed, from Labcorp."],
    trials: ["trak-er"], drugs: ["palbociclib", "fulvestrant"], cancers: ["breast-hr-positive"], technologies: ["mrd-testing"], terms: MRD_TERMS, companies: ["labcorp"], journals: ["annals-of-oncology"], bottlenecks: [BOTTLENECK], sections: ["diagnostics"],
    links: ref("Cunningham et al., Ann Oncol 2026 (TRAK-ER)", "10.1016/j.annonc.2026.10.1292", "42946309") }),

  p({ id: P.pada1, name: "Switch to fulvestrant and palbociclib versus no switch in advanced breast cancer with rising ESR1 mutation during aromatase inhibitor and palbociclib therapy (PADA-1): a randomised, open-label, multicentre, phase 3 trial",
    tldr: "Switching hormone therapy when a resistance mutation rose in the blood, before scans showed progression, roughly doubled the time cancer stayed controlled in PADA-1.",
    summary: "PADA-1 monitored 1,017 women on first-line aromatase inhibitor plus palbociclib for ER-positive, HER2-negative advanced breast cancer at 83 French hospitals for a rising ESR1 mutation in blood. 279 (27 per cent) developed one and 172 (17 per cent) were randomised, without synchronous progression, to switch to fulvestrant plus palbociclib (88) or continue (84). Median progression-free survival from randomisation was 11.9 months (95% CI 9.1 to 13.6) against 5.7 months (3.9 to 7.5), stratified hazard ratio 0.61 (0.43 to 0.86), p = 0.0040. Neutropenia was the commonest grade 3 or worse haematological event.",
    journal: "The Lancet Oncology", year: 2022, doi: "10.1016/S1470-2045(22)00555-1", pmid: "36183733", authors: "Bidard FC, Hardy-Bessard AC, Dalenc F, et al.", paperType: "rct", participants: 1017, changedPractice: false,
    findings: ["279 of 1,017 (27%) developed a rising blood ESR1 mutation; 172 randomised.", "Median PFS 11.9 vs 5.7 months; HR 0.61 (0.43 to 0.86), p = 0.0040."],
    whatItMeans: "The first randomised proof that acting on a resistant subclone seen in blood, before scans change, can help. It works because ESR1-mutant subclones are common and the mutation can be read directly.",
    caveats: ["Open label.", "Advanced disease, at tumour fractions far above residual-disease levels."],
    trials: ["pada-1"], drugs: ["fulvestrant", "palbociclib", "letrozole"], cancers: ["breast-hr-positive"], targets: ["estrogen-receptor"], technologies: ["liquid-biopsy"], terms: ["esr1-mutation", "ctdna"], companies: ["unicancer"], journals: ["lancet-oncology"], sections: ["diagnostics"],
    links: ref("Bidard et al., Lancet Oncol 2022 (PADA-1)", "10.1016/S1470-2045(22)00555-1", "36183733") }),

  p({ id: P.serena6Ext, name: "Switching to camizestrant at ESR1 mutation emergence before disease progression during first-line treatment of hormone receptor-positive advanced breast cancer (SERENA-6): extended analysis of a double-blind, placebo-controlled, randomised, phase 3 trial",
    tldr: "With longer follow-up, switching to camizestrant when an ESR1 mutation appeared in the blood kept its benefit and also lengthened control on the next treatment.",
    summary: "SERENA-6 tested ctDNA for ESR1 mutation every two to three months with Guardant360 CDx in patients on first-line aromatase inhibitor plus CDK4/6 inhibitor at 264 centres in 23 countries. From June 2021 to June 2024, 3,325 patients were screened, 3,256 had at least one test and 548 had a positive ESR1 test by screening closure; 315 were randomised to switch to camizestrant with the CDK4/6 inhibitor (157) or continue the aromatase inhibitor (158). At a median follow-up of 23.5 months, median progression-free survival was 16.8 months (95% CI 14.7 to 19.4) against 9.2 months (7.2 to 9.7), hazard ratio 0.45 (0.34 to 0.59), descriptive and consistent with the interim analysis. Median second progression-free survival was 25.7 months (20.4 to 30.3) against 19.1 months (16.8 to 21.0), hazard ratio 0.63 (0.46 to 0.86), p = 0.0037.",
    journal: "The Lancet Oncology", year: 2026, doi: "10.1016/S1470-2045(26)00287-1", pmid: "42442380", authors: "Turner NC, Mayer EL, Park YH, et al.", paperType: "rct", participants: 315,
    findings: ["3,256 tested; 548 ESR1-positive; 315 randomised.", "Updated PFS 16.8 vs 9.2 months, HR 0.45 (0.34 to 0.59).", "Second PFS 25.7 vs 19.1 months, HR 0.63 (0.46 to 0.86), p = 0.0037."],
    whatItMeans: "Acting on a resistant subclone found in blood keeps its benefit into the next line of treatment. It works where the clone carries a mutation that both marks it and chooses the drug.",
    caveats: ["Advanced disease, hotspot genotyping rather than residual disease testing.", "Overall survival not reported in this analysis."],
    trials: ["serena-6"], drugs: ["camizestrant", "guardant360-cdx"], cancers: ["breast-hr-positive"], targets: ["estrogen-receptor"], technologies: ["liquid-biopsy"], terms: ["esr1-mutation", "ctdna"], companies: ["astrazeneca"], journals: ["lancet-oncology"], sections: ["diagnostics"],
    links: ref("Turner et al., Lancet Oncol 2026 (SERENA-6 extended analysis)", "10.1016/S1470-2045(26)00287-1", "42442380") }),

  p({ id: P.my6349Jci, name: "68Ga-MY6349 PET/CT imaging to assess Trop2 expression in multiple types of cancer",
    tldr: "A new PET scan for the TROP2 protein matched what biopsies showed across 15 kinds of cancer, and showed that TROP2 levels vary between one tumour deposit and the next.",
    summary: "A prospective investigator-initiated study enrolled 90 patients with 15 cancer types for 68Ga-MY6349 PET/CT; 78 also had 18F-FDG PET/CT and 12 with prostate cancer had 68Ga-PSMA-11 PET/CT. Tumour uptake was generally high but heterogeneous across lesions, patients and cancer types, and Trop2 expression by immunohistochemistry correlated closely with uptake at primary and metastatic sites. Uptake was higher than with FDG in breast (maximum standardised uptake value 7.2 against 5.4), prostate (9.2 against 3.0) and thyroid cancer (8.5 against 3.7), all p < 0.001.",
    journal: "Journal of Clinical Investigation", year: 2024, doi: "10.1172/jci185408", pmid: "39509246", authors: "Chen H, Zhao L, Pang Y, et al.", paperType: "observational", participants: 90,
    findings: ["Uptake correlated with Trop2 immunohistochemistry at primary and metastatic sites.", "Breast cancer SUVmax 7.2 vs 5.4 with FDG (p < 0.001)."],
    whatItMeans: "TROP2 can be mapped across the whole body without a biopsy, and the map shows it is not the same everywhere in one person.",
    caveats: ["Single-centre, mixed cancers.", "Whether uptake predicts response to TROP2 drugs was not tested."],
    drugs: ["ga68-my6349"], trials: ["nct06188468"], targets: ["trop2"], cancers: ["breast-cancer"], technologies: ["trop2-pet", "pet"], sections: ["imaging"],
    links: ref("Chen et al., J Clin Invest 2024", "10.1172/jci185408", "39509246") }),

  p({ id: P.my6349Breast, name: "Trop2-targeted PET/CT imaging with 68Ga-MY6349 improves diagnostic accuracy and influences clinical management in breast cancer",
    tldr: "In 73 people with breast cancer, a TROP2 PET scan found more cancer deposits than a standard FDG scan, with fewer false alarms, and changed treatment for some.",
    summary: "73 patients with suspected or confirmed breast cancer had both 68Ga-MY6349 and 18F-FDG PET/CT between December 2024 and April 2025. 68Ga-MY6349 found more malignant lesions (564 against 436) and fewer false positives (2 against 40). In 30 initial-staging patients it upgraded stage in 6 (20 per cent) and changed treatment in 4; in 43 restaging patients it changed management in 5 (12 per cent). Overall tumour uptake was higher (median maximum standardised uptake value 5.9 against 4.1, p < 0.001). In three patients with triple-negative breast cancer on sacituzumab tirumotecan, early changes in uptake after two cycles matched the later clinical response; the authors call this preliminary.",
    journal: "Theranostics", year: 2026, doi: "10.7150/thno.136704", pmid: "42559486", authors: "Yu L, Zhao L, Zeng R, et al.", paperType: "observational", participants: 73,
    findings: ["564 vs 436 malignant lesions; 2 vs 40 false positives compared with FDG.", "Stage upgraded in 6 of 30; management changed in 4 of 30 and 5 of 43.", "Early uptake change matched response in 3 TNBC patients on sacituzumab tirumotecan."],
    whatItMeans: "A TROP2 scan may help stage breast cancer and, if the early signal holds, judge whether a TROP2 drug is working. It images visible disease, not residual disease after surgery.",
    caveats: ["Single centre; the treatment-response finding rests on three patients."],
    drugs: ["ga68-my6349", "sacituzumab-tirumotecan"], targets: ["trop2"], cancers: ["breast-cancer", "tnbc"], technologies: ["trop2-pet", "pet"], sections: ["imaging"],
    links: ref("Yu et al., Theranostics 2026", "10.7150/thno.136704", "42559486") }),

  p({ id: P.notaT4, name: "[68Ga]Ga-NOTA-T4 PET/CT imaging of TROP2 expression in patients with HER2-negative breast cancer",
    tldr: "A TROP2 PET scan in breast cancer showed that how much TROP2 a cancer has can change after hormone therapy or chemotherapy, in opposite directions in different subtypes.",
    summary: "Retrospective review of 42 patients with HER2-negative breast cancer at Huashan Hospital, Fudan University, imaged with [68Ga]Ga-NOTA-T4 PET/CT between September 2023 and March 2025, 27 of whom also had [18F]FDG PET/CT. Detection of patients and metastatic lesions was comparable with FDG. In luminal B disease, patients who had received endocrine therapy or chemotherapy had higher uptake than untreated patients (SUVmax 5.20 ± 5.07 against 3.36 ± 3.52, p = 0.008); a similar trend in luminal A was not significant (p = 0.241); in triple-negative disease, treated patients had lower uptake (3.02 ± 2.35 against 7.63 ± 5.64, p = 0.008).",
    journal: "European Journal of Nuclear Medicine and Molecular Imaging", year: 2026, doi: "10.1007/s00259-026-07796-4", pmid: "41781717", authors: "Liu Y, Chu Z, Jin X, et al.", paperType: "observational", participants: 42,
    findings: ["Comparable detection to FDG.", "Luminal B: higher uptake after treatment (p = 0.008).", "TNBC: lower uptake after treatment (p = 0.008)."],
    whatItMeans: "TROP2 is not a fixed property of a breast cancer; treatment can move it. A test of TROP2 taken at diagnosis may not describe what is left later.",
    caveats: ["Retrospective, single centre, cross-sectional comparison of treated and untreated patients rather than the same patients over time."],
    drugs: ["ga68-nota-t4"], targets: ["trop2"], cancers: ["breast-hr-positive", "tnbc"], technologies: ["trop2-pet", "pet"], bottlenecks: [BOTTLENECK], sections: ["imaging"],
    links: ref("Liu et al., Eur J Nucl Med Mol Imaging 2026", "10.1007/s00259-026-07796-4", "41781717") }),

  p({ id: P.accuscan, name: "Ultra-sensitive molecular residual disease detection through whole genome sequencing with single-read error correction",
    tldr: "A whole-genome blood test that corrects errors read by read detected tumour DNA at about ten parts per million and predicted relapse after bowel cancer surgery.",
    summary: "AccuScan is a cell-free DNA whole-genome sequencing technology with error correction at the level of single reads, with an error rate of 4.2 x 10^-7, about two orders of magnitude lower than a read-centric de-noising method. Applied to residual disease it showed analytical sensitivity down to 10^-6 circulating variant allele frequency at 99 per cent sample-level specificity; 90 per cent landmark sensitivity and 100 per cent specificity for relapse in colorectal cancer within six weeks of surgery; 67 per cent sensitivity and 100 per cent specificity in oesophageal cancer within a week of surgery; and ctDNA dynamics consistent with outcome in melanoma on immunotherapy.",
    journal: "EMBO Molecular Medicine", year: 2024, doi: "10.1038/s44321-024-00115-0", pmid: "39164471", authors: "Li X, Liu T, Bacchiocchi A, et al.", paperType: "methods",
    findings: ["Error rate 4.2 x 10^-7.", "Colorectal cancer: 90% landmark sensitivity, 100% specificity.", "Detection at 10 ppm: 96% with 10,000 markers (full text)."],
    whatItMeans: "Whole-genome methods without a personalised panel can approach ten parts per million. Below that, the published replicates thin out.",
    caveats: ["The 10^-6 claim rests on one of three replicates at 2 ppm in the full text.", "Contrived samples used germline variants."],
    drugs: ["accuscan-mrd"], companies: ["accuragen"], cancers: ["colorectal", "esophageal", "melanoma"], technologies: ["mrd-testing", "wes-wgs"], terms: MRD_TERMS, sections: ["diagnostics"],
    links: ref("Li et al., EMBO Mol Med 2024", "10.1038/s44321-024-00115-0", "39164471") }),

  p({ id: P.cancerdetect, name: "Analytical validation of a hybrid-approach combining tumor-informed and tumor-agnostic bespoke ctDNA panel assay for the sensitive detection of minimal residual disease",
    tldr: "The laboratory validation of IMBdx's personalised blood test for leftover cancer, which reached one part in 100,000 on test mixtures.",
    summary: "CancerDetect (formerly reported as AlphaLiquid Detect) combines personalised (bespoke) mutations with tumour-agnostic actionable hotspot mutations in a hybridisation-capture assay. Its analytical validation reported a limit of detection down to 0.001 per cent (10^-5) with 99.9 per cent specificity.",
    journal: "PLoS One", year: 2025, doi: "10.1371/journal.pone.0334282", pmid: "41212866", authors: "Heo S, Ham SK, Lee H, et al.", paperType: "methods",
    findings: ["Limit of detection 0.001% (10^-5) with 99.9% specificity."],
    whatItMeans: "A Korean residual disease test reports a limit at ten parts per million, on germline-variant mixtures rather than tumour plasma.",
    caveats: ["The full text measured the bespoke limit on a 385-SNP cell-line mixture; hotspot regions had a limit of 0.1 per cent."],
    drugs: ["cancerdetect-imbdx"], companies: ["imbdx"], technologies: ["mrd-testing"], terms: MRD_TERMS, sections: ["diagnostics"],
    links: ref("Heo et al., PLoS One 2025", "10.1371/journal.pone.0334282", "41212866") }),

  p({ id: P.prophet, name: "Individualized tumor-informed circulating tumor DNA analysis for postoperative monitoring of non-small cell lung cancer",
    tldr: "A personalised blood test tracking 50 of each patient's tumour mutations found leftover lung cancer after surgery months before scans did.",
    summary: "PROPHET deep-sequences 50 patient-specific variants to detect residual disease, with a limit of detection of 0.004 per cent. Applied with fixed-panel assays to 760 plasma samples from 181 prospectively enrolled patients with early-stage non-small cell lung cancer, it had higher sensitivity at baseline (45 per cent), outperformed fixed panels for prognosis and gave a median lead time of 299 days to radiologically confirmed recurrence. Non-canonical personalised variants made up 98.2 per cent of those tracked, with prognostic effects similar to canonical ones, and a proposed tumour-node-metastasis-blood classification outperformed TNM staging at the adjuvant decision point.",
    journal: "Cancer Cell", year: 2023, doi: "10.1016/j.ccell.2023.08.010", pmid: "37683638", authors: "Chen K, Yang F, Shen H, et al.", paperType: "translational", participants: 181,
    findings: ["Limit of detection 0.004%.", "Baseline sensitivity 45%.", "Median lead time 299 days to radiological recurrence."],
    whatItMeans: "Personalised panels outperform fixed gene panels after lung cancer surgery, at limits in the tens of parts per million.",
    caveats: ["Company co-authored.", "No clone attribution."],
    drugs: ["brprophet"], companies: ["burning-rock"], cancers: ["nsclc"], technologies: ["mrd-testing"], terms: MRD_TERMS, journals: ["cancer-cell"], sections: ["diagnostics"],
    links: ref("Chen et al., Cancer Cell 2023", "10.1016/j.ccell.2023.08.010", "37683638") }),

  p({ id: P.minerva, name: "Clinical utility of molecular residual disease detection in early-stage resected EGFR-mutated non-small cell lung cancer",
    tldr: "In the EVIDENCE trial of resected EGFR-mutated lung cancer, a blood test for leftover cancer picked out patients at higher risk of relapse, and icotinib helped whether or not it was positive.",
    summary: "MRD analysis of the phase 3 EVIDENCE trial in stage II to IIIA resected EGFR-mutated non-small cell lung cancer treated with adjuvant icotinib or chemotherapy: 1,352 plasma samples from 175 patients analysed with MinerVa Prime. Landmark positivity was 35.8 per cent (38 of 106) in stage III and 14.7 per cent (10 of 68) in stage II, longitudinal positivity 47.4 per cent. Positivity was associated with shorter disease-free survival at the landmark (hazard ratio 4.44) and in longitudinal monitoring (7.82). Icotinib gave disease-free survival benefit over chemotherapy in both MRD groups. Longitudinal negative predictive value was 91.3 per cent and median lead time 169 days; MRD status at 24 weeks after randomisation was the most prognostic.",
    journal: "Nature Communications", year: 2026, doi: "10.1038/s41467-026-76392-9", pmid: "42706268", authors: "Zhou F, Su C, Liang W, et al.", paperType: "translational", participants: 175,
    findings: ["Landmark positivity 35.8% (stage III) and 14.7% (stage II).", "DFS HR 4.44 landmark, 7.82 longitudinal.", "NPV 91.3%; median lead time 169 days."],
    whatItMeans: "Residual disease testing is prognostic after EGFR lung cancer surgery, but in this trial it did not pick out who benefits from icotinib, since both groups did.",
    caveats: ["Retrospective analysis within a completed trial."],
    drugs: ["minerva-prime", "icotinib"], companies: ["genecast"], cancers: ["nsclc"], technologies: ["mrd-testing"], terms: MRD_TERMS, journals: ["nature-communications"], sections: ["diagnostics"],
    links: ref("Zhou et al., Nat Commun 2026", "10.1038/s41467-026-76392-9", "42706268") }),

  p({ id: P.geneplus, name: "Personalized and Tumor Informed Circulating Tumor DNA Assay for Molecular Residual Disease Monitoring of Solid Malignancies",
    tldr: "Geneplus' personalised blood test found relapse months before scans in bowel, breast and lung cancer, and the mutations shared by every tumour cell were the most informative.",
    summary: "The assay profiles the tumour with a comprehensive genomic panel, selects up to 20 top-ranked variants for a personalised panel and integrates it with a tumour-naive cancer-type fixed panel for ultra-deep plasma sequencing. Its sample-level limit of detection reaches as low as 0.005 per cent with 100 per cent specificity. In colorectal, breast and lung cancer it predicted postoperative recurrence before imaging by a median of 112 days in breast and 83 days in lung cancer. Among tracked variants, clonal mutations showed more prognostic value than subclonal ones.",
    journal: "MedComm", year: 2025, doi: "10.1002/mco2.70483", pmid: "41346570", authors: "Liu L, Liang W, Cao W, et al.", paperType: "methods",
    findings: ["Sample-level limit of detection 0.005%, specificity 100%.", "Lead time 112 days (breast), 83 days (lung).", "Clonal variants more prognostic than subclonal."],
    whatItMeans: "Subclonal variants are seen less often in residual disease than clonal ones, which is what limits attributing what is left to a subclone.",
    caveats: ["Company co-authored."],
    drugs: ["geneplus-personalised-mrd"], companies: ["geneplus"], cancers: ["colorectal", "breast-cancer", "nsclc"], technologies: ["mrd-testing"], terms: MRD_TERMS, bottlenecks: [BOTTLENECK], sections: ["diagnostics"],
    links: ref("Liu et al., MedComm 2025", "10.1002/mco2.70483", "41346570") }),

  p({ id: P.orimiracle, name: "Monitoring of gastrointestinal carcinoma via molecular residual disease with circulating tumor DNA using a tumor-informed assay",
    tldr: "A personalised blood test from OrigiMed found leftover cancer before and after surgery for stomach and bowel cancer.",
    summary: "OriMIRACLE S identifies tumour-specific variants by whole-exome sequencing of tumour and germline DNA, selects clonal SNVs with the OriSelector algorithm for patient-specific multiplex PCR panels, and calls a sample positive when three sites are detected, giving nearly 100 per cent sample-level sensitivity and specificity with panels of 21 to 30 variants. In 127 patients with gastrointestinal tumours, residual disease was positive before surgery in 18 of 26 and after surgery in 24 of 82; positivity was 33.33 per cent in gastric adenocarcinoma and 32.26 per cent in colorectal cancer.",
    journal: "Cancer Medicine", year: 2023, doi: "10.1002/cam4.6286", pmid: "37602656", authors: "Qi Z, Li Y, Wang Z, et al.", paperType: "methods", participants: 127,
    findings: ["Panels of 21 to 30 clonal variants; positive when three sites detected.", "Positive before surgery in 18 of 26; after surgery in 24 of 82."],
    whatItMeans: "A residual disease test built on clonal variants only, which detects the trunk of the tumour and by design not its branches.",
    caveats: ["No limit of detection stated in the abstract."],
    drugs: ["orimiracle-s"], companies: ["origimed"], cancers: ["gastric", "colorectal"], technologies: ["mrd-testing"], terms: MRD_TERMS, journals: ["cancer-medicine"], sections: ["diagnostics"],
    links: ref("Qi et al., Cancer Med 2023", "10.1002/cam4.6286", "37602656") }),

  p({ id: P.osteosarcoma, name: "Tumor-informed deep sequencing of ctDNA detects minimal residual disease and predicts relapse in osteosarcoma",
    tldr: "In osteosarcoma, a personalised blood test for leftover cancer after surgery predicted who would relapse, sometimes months before scans.",
    summary: "Of 83 patients with osteosarcoma at the First Affiliated Hospital of Sun Yat-sen University, tumour-informed panels from whole-exome sequencing were obtained for 71 (85.5 per cent); 59 had panels and blood samples. Thirteen had ctDNA detected after surgery. Negative postoperative ctDNA was associated with better event-free survival at each time point studied and was a significant predictor in multivariate analysis; ctDNA preceded positive imaging in five patients by an average of 92.6 days.",
    journal: "eClinicalMedicine", year: 2024, doi: "10.1016/j.eclinm.2024.102697", pmid: "39022798", authors: "Fu Y, Xu Y, Liu W, et al.", paperType: "observational", participants: 59,
    findings: ["Panels obtained for 85.5% of patients.", "13 of 59 ctDNA-positive after surgery; ctDNA predicted event-free survival.", "Lead time over imaging 92.6 days on average in 5 patients."],
    whatItMeans: "Residual disease blood tests extend to bone sarcoma. The methods state a variant allele frequency limit of 0.01 per cent.",
    caveats: ["Single centre."],
    drugs: ["orimiracle-s"], companies: ["origimed"], cancers: ["osteosarcoma"], technologies: ["mrd-testing"], terms: MRD_TERMS, sections: ["diagnostics"],
    links: ref("Fu et al., eClinicalMedicine 2024", "10.1016/j.eclinm.2024.102697", "39022798") }),

  p({ id: P.enspyre, name: "Enrichment of mutated DNA enables ultra-sensitive ctDNA detection in NSCLC using shallow targeted sequencing",
    tldr: "A chemistry that enriches the tumour's mutated DNA before sequencing found lung cancer DNA at a few parts per million with far less sequencing than usual.",
    summary: "Enspyre is a ctDNA enrichment method. Tumour and, where available, matched normal tissue from eight lung cancer patients were whole-genome sequenced; custom capture panels ran on 72 samples of patient plasma diluted into healthy donor plasma (nine per subject) and eight healthy donor controls. Enspyre reached 100 per cent (6 of 6) detection down to 10 parts per million and called residual disease as low as 5 parts per million with no false positives, at a median DNA input of 7.67 ng, without molecular barcodes, with a median of 9.6 million read pairs per sample. The authors note that larger studies are needed.",
    journal: "Scientific Reports", year: 2026, doi: "10.1038/s41598-026-57421-5", pmid: "42288656", authors: "Labrousse P, Russell H, Stetson D, et al.", paperType: "methods", participants: 8,
    findings: ["6 of 6 detected at 10 ppm; calls down to 5 ppm; no false positives.", "Median input 7.67 ng; median 9.6 million read pairs."],
    whatItMeans: "Enrichment may make parts-per-million testing possible on small sequencers, though only eight patients were studied.",
    caveats: ["Eight patients, diluted plasma."],
    drugs: ["enspyre-mrd"], companies: ["biofidelity"], cancers: ["nsclc"], technologies: ["mrd-testing"], terms: MRD_TERMS, sections: ["diagnostics"],
    links: ref("Labrousse et al., Sci Rep 2026", "10.1038/s41598-026-57421-5", "42288656") }),

  p({ id: P.haystack, name: "Highly Accurate Detection of Circulating Tumor DNA for Monitoring Minimal Residual Disease in Solid Tumors: Analytical and Clinical Validation of the Haystack MRD Assay",
    tldr: "The validation of Quest's Haystack blood test for leftover cancer, which reports results as a count of tumour DNA molecules per millilitre of plasma.",
    summary: "Haystack MRD tracks patient-specific somatic mutations with background noise suppression. Analytical validation used reference materials and clinical specimens across 23 tumour types, followed by clinical validation in stage II to III colorectal cancer and real-world evaluation across 27 cancer types. The 95 per cent limit of detection was 0.063 mean ctDNA molecules per mL, with an analytical measurement range of 0.25 to 1,000; concordance with expected residual disease status was 99 per cent (95% CI 94.2 to 99.9), and quantitative measurements agreed with an orthogonal method (R2 = 0.9998). In early colorectal cancer, post-treatment status gave 100 per cent sensitivity and specificity for recurrence at three years, and 83.3 per cent sensitivity and 100 per cent specificity at five years.",
    journal: "Journal of Molecular Diagnostics", year: 2026, doi: "10.1016/j.jmoldx.2026.07.006", pmid: "42624249", authors: "Clark M, Prathapam R, Bramlett KS, et al.", paperType: "methods",
    findings: ["LOD95 0.063 mean ctDNA molecules/mL.", "99% agreement with expected MRD status.", "Colorectal cancer: 100% sensitivity and specificity at 3 years; 83.3% sensitivity at 5 years."],
    whatItMeans: "At these levels the honest unit is a count of molecules, not an allele fraction, which is the counting limit behind attributing residual disease to a clone.",
    caveats: ["A limit in molecules per mL cannot be converted to parts per million without each sample's cell-free DNA concentration."],
    drugs: ["haystack-mrd"], companies: ["haystack-oncology", "quest-diagnostics"], cancers: ["colorectal"], technologies: ["mrd-testing"], terms: MRD_TERMS, bottlenecks: [BOTTLENECK], sections: ["diagnostics"],
    links: ref("Clark et al., J Mol Diagn 2026", "10.1016/j.jmoldx.2026.07.006", "42624249") }),

  p({ id: P.fiala, name: "Utility of circulating tumor DNA in cancer diagnostics with emphasis on early detection",
    tldr: "A review that works out how many genome copies a blood sample holds, and why very small tumour fractions run out of molecules to find.",
    summary: "A review of circulating tumour DNA in diagnostics. Its full text states that most studies cite cell-free DNA in normal individuals at 1 to 10 ng per mL (average 5 ng per mL), that 5 ng of DNA equates to approximately 1,500 genomes, and that when the tumour fraction falls below 0.01 per cent a 10 mL blood draw (4 mL of plasma) will likely not contain a single cancer genome at a given locus, so detection becomes impossible through sampling error alone.",
    journal: "BMC Medicine", year: 2018, doi: "10.1186/s12916-018-1157-9", pmid: "30285732", authors: "Fiala C, Diamandis EP", paperType: "review",
    findings: ["Cell-free DNA 1 to 10 ng/mL, average 5 ng/mL.", "5 ng of DNA is approximately 1,500 genomes."],
    whatItMeans: "The number of molecules in the tube, not the sequencer, sets the floor for any single-locus blood test; multi-locus tests escape it only by adding sites together.",
    caveats: ["The argument is for a single locus in screening; residual disease tests track many loci."],
    technologies: ["liquid-biopsy"], terms: ["cfdna", "ctdna"], bottlenecks: [BOTTLENECK], sections: ["diagnostics"],
    links: ref("Fiala and Diamandis, BMC Med 2018", "10.1186/s12916-018-1157-9", "30285732") }),
  p({ id: P.nikZainal2016, name: "Landscape of somatic mutations in 560 breast cancer whole-genome sequences",
    tldr: "The largest whole-genome study of breast cancer at the time read every part of 560 tumours' DNA and catalogued their mutations, the genes that drive them and the processes that cause them.",
    summary: "Nik-Zainal and colleagues sequenced the whole genomes of 560 breast cancers with matched normal tissue (556 women and four men). The full text reports 3,479,652 somatic base substitutions, 371,993 small insertions and deletions and 77,695 rearrangements, with substantial variation between individual cancers. The abstract reports 93 protein-coding cancer genes carrying probable driver mutations, twelve base-substitution and six rearrangement signatures, and three rearrangement signatures associated with defective homologous-recombination repair.",
    journal: "Nature", year: 2016, doi: "10.1038/nature17676", pmid: "27135926", authors: "Nik-Zainal S, Davies H, Staaf J, et al.", paperType: "translational", participants: 560,
    findings: ["3,479,652 somatic base substitutions across 560 breast cancer genomes (full text); a mean of about 6,200 a cancer is OnCo arithmetic.", "93 protein-coding cancer genes carried probable driver mutations.", "Twelve base-substitution and six rearrangement signatures."],
    whatItMeans: "A breast cancer genome carries thousands of mutations, most of them outside genes, so a residual disease test designed from the whole genome has far more to choose from than one designed from the exome.",
    caveats: ["The per-cancer count varies widely; a mean says little about any one tumour.", "Primary tumours sequenced at ordinary depth; low-fraction subclonal mutations are under-counted."],
    technologies: ["wes-wgs"], cancers: ["breast-cancer"], journals: ["nature"], bottlenecks: [BOTTLENECK], sections: ["diagnostics"],
    links: ref("Nik-Zainal et al., Nature 2016", "10.1038/nature17676", "27135926") }),
  p({ id: P.nikZainal2012, name: "The life history of 21 breast cancers",
    tldr: "By reading 21 breast cancer genomes deeply, researchers showed that most of a tumour's mutations are carried by only some of its cells, and that every tumour had a dominant branch.",
    summary: "The abstract reports that subclonal diversification is prominent, that most mutations are found in just a fraction of tumour cells, and that every tumour has a dominant subclonal lineage representing more than 50 per cent of tumour cells. The full text states that subclonal point mutations were found in all samples studied and that their estimated number genome-wide was, for most samples, more than the number of fully clonal mutations. One ER-positive tumour with a distinctive mutator pattern was sequenced to 188-fold depth to find low-fraction mutations: 70,690 somatic substitutions, many supported by fewer than 5 per cent of reads, including a cluster of about 15,600 found in about 65 per cent of tumour cells.",
    journal: "Cell", year: 2012, doi: "10.1016/j.cell.2012.04.023", pmid: "22608083", authors: "Nik-Zainal S, Van Loo P, Wedge DC, et al.", paperType: "translational", participants: 21,
    findings: ["Most mutations are found in just a fraction of tumour cells.", "Subclonal point mutations in every sample; for most, more subclonal than fully clonal (full text).", "Finding low-fraction mutations needed deep sequencing (188-fold in the showcase tumour, which had an unusual mutator pattern)."],
    whatItMeans: "Breast cancers are not short of subclonal mutations; they are hard to find without deep sequencing of the tumour, and residual disease panels that keep only high-fraction mutations leave them out.",
    caveats: ["21 tumours.", "The 188-fold case was chosen for an unusual mutator pattern and is not typical in its mutation count."],
    technologies: ["wes-wgs"], cancers: ["breast-cancer"], journals: ["cell"], bottlenecks: [BOTTLENECK, "b-tumor-heterogeneity"], sections: ["diagnostics"],
    links: ref("Nik-Zainal et al., Cell 2012", "10.1016/j.cell.2012.04.023", "22608083") }),
  p({ id: P.dentro, name: "Characterizing genetic intra-tumor heterogeneity across 2,658 human cancer genomes",
    tldr: "An international study of 2,658 whole cancer genomes found that almost every tumour contains distinct branches carrying their own mutations.",
    summary: "The Pan-Cancer Analysis of Whole Genomes heterogeneity group characterised intra-tumour heterogeneity across whole-genome sequences of 2,658 cancer samples spanning 38 cancer types. Nearly all informative samples (95.1 per cent) contained evidence of distinct subclonal expansions, with frequent branching relationships between subclones, and the authors observed positive selection of subclonal driver mutations across most cancer types.",
    journal: "Cell", year: 2021, doi: "10.1016/j.cell.2021.03.009", pmid: "33831375", authors: "Dentro SC, Leshchiner I, Haase K, et al.", paperType: "translational", participants: 2658,
    findings: ["95.1% of informative samples had distinct subclonal expansions.", "Branching relationships between subclones were frequent.", "Subclonal driver mutations under positive selection across most cancer types."],
    whatItMeans: "Nearly every tumour has subclones, so a residual disease result built only from shared trunk mutations cannot say which branch is left.",
    caveats: ["One sample per tumour for most cases, which under-calls heterogeneity."],
    technologies: ["wes-wgs"], cancers: ["breast-cancer"], journals: ["cell"], bottlenecks: [BOTTLENECK, "b-tumor-heterogeneity"], sections: ["diagnostics"],
    links: ref("Dentro et al., Cell 2021", "10.1016/j.cell.2021.03.009", "33831375") }),
];

// =====================================================================================================================
// Trials (ClinicalTrials.gov v2 API, read 4 November 2026)
// =====================================================================================================================
const trials: TrialInput[] = [
  t({ id: "trak-er", name: "TRAK-ER", aka: ["TRAK ER"], nct: "NCT04985266", phase: "2", status: "recruiting", sponsor: "Royal Marsden NHS Foundation Trust", enrolled: 1100, started: "2022-03-30", startedType: "actual",
    setting: "High-risk ER-positive, HER2-negative early breast cancer on adjuvant endocrine therapy with at least three more years planned: three-monthly tumour-informed ctDNA surveillance for up to three years; ctDNA-positive patients without radiological recurrence randomised to palbociclib plus fulvestrant or continued standard endocrine therapy",
    tldr: "A UK-led trial that tests the blood of women with high-risk hormone-receptor-positive breast cancer every three months, and offers a change of treatment to those whose blood turns positive before scans show anything.",
    summary: "TRAK-ER (NCT04985266), sponsored by the Royal Marsden with Invitae among its collaborators, has two phases: ctDNA surveillance with a tumour-informed assay from Labcorp, then randomisation of ctDNA-positive patients without radiological recurrence to palbociclib plus fulvestrant or standard endocrine therapy (tamoxifen, letrozole, anastrozole or exemestane), for up to 24 months. The registry lists 1,100 planned participants and an estimated primary completion in September 2027.\n\nThe surveillance phase reported in Annals of Oncology in 2026: of 912 patients who started surveillance, 12.0 per cent had ctDNA detected, panel design failed in 16.1 per cent, and 65.9 per cent of those detected on their first test already had radiological recurrence, against 26.6 per cent of those first detected later. The authors conclude that ultrasensitive assays are required to find relapse before it is clinically evident. The randomised treatment phase has not reported.",
    result: "Surveillance phase: ctDNA detected in 12.0% (109 of 912); 65.9% of first-test detections had radiological recurrence at detection. Treatment phase not reported.",
    outcomes: [
      { endpoint: "Patient-level ctDNA detection during surveillance", primary: true, unit: "%", arms: [{ name: "Patients under ctDNA surveillance", n: 912, value: 12.0 }], source: doiUrl("10.1016/j.annonc.2026.10.1292") },
      { endpoint: "Radiological recurrence already present at first ctDNA detection", unit: "%", arms: [{ name: "Detected on the first test", n: 44, value: 65.9 }, { name: "First detected on a later test", n: 64, value: 26.6 }], p: "<0.001", source: doiUrl("10.1016/j.annonc.2026.10.1292") },
    ],
    drugs: ["palbociclib", "fulvestrant", "tamoxifen", "letrozole", "anastrozole", "exemestane"], cancers: ["breast-hr-positive"], targets: ["estrogen-receptor"], technologies: ["mrd-testing"], terms: MRD_TERMS,
    institutions: ["royal-marsden"], companies: ["labcorp", "invitae"], keyPapers: [P.trakEr], bottlenecks: [BOTTLENECK], related: ["c-trak-tn", "treat-ctdna"],
    links: [ct("NCT04985266"), { label: "Cunningham et al., Ann Oncol 2026 (TRAK-ER surveillance)", url: doiUrl("10.1016/j.annonc.2026.10.1292") }] }),

  t({ id: "pada-1", name: "PADA-1", aka: ["PADA 1", "UCBG3-05"], nct: "NCT03079011", phase: "3", status: "positive", sponsor: "UNICANCER", enrolled: 1017, started: "2017-03-22", startedType: "actual", yearReported: 2022,
    setting: "First-line aromatase inhibitor plus palbociclib for ER-positive, HER2-negative metastatic breast cancer, monitored for a rising ESR1 mutation in blood; patients with a rising mutation and no progression randomised to switch to fulvestrant plus palbociclib or continue",
    tldr: "A French trial that showed, for the first time in a randomised study, that changing hormone therapy when a resistance mutation appears in the blood, before scans change, keeps breast cancer controlled for longer.",
    summary: "PADA-1 (NCT03079011, UNICANCER) enrolled 1,017 women at 83 French hospitals receiving an aromatase inhibitor with palbociclib as first-line treatment for ER-positive, HER2-negative advanced breast cancer and monitored circulating tumour DNA for a rising ESR1 mutation. 279 (27 per cent) developed one and 172 were randomised: switching to fulvestrant plus palbociclib gave a median progression-free survival of 11.9 months against 5.7 months for continuing, stratified hazard ratio 0.61 (Bidard et al., Lancet Oncology 2022). The abstract describes the target as ESR1-mutated subclones that may be sensitive to fulvestrant.",
    result: "Median PFS 11.9 vs 5.7 months, HR 0.61 (0.43 to 0.86), p = 0.0040.",
    outcomes: [{ endpoint: "Progression-free survival from randomisation", primary: true, unit: "months", arms: [{ name: "Switch to fulvestrant + palbociclib", n: 88, value: 11.9 }, { name: "Continue aromatase inhibitor + palbociclib", n: 84, value: 5.7 }], hr: 0.61, ci: [0.43, 0.86], p: "0.0040", source: doiUrl("10.1016/S1470-2045(22)00555-1") }],
    replication: "SERENA-6 applied the same switch-at-ESR1-emergence strategy with camizestrant and was also positive.",
    drugs: ["palbociclib", "fulvestrant", "letrozole"], cancers: ["breast-hr-positive"], targets: ["estrogen-receptor"], technologies: ["liquid-biopsy"], terms: ["esr1-mutation", "ctdna"], companies: ["unicancer"],
    keyPapers: [P.pada1], related: ["serena-6"], people: ["francois-clement-bidard"],
    links: [ct("NCT03079011"), { label: "Bidard et al., Lancet Oncol 2022", url: doiUrl("10.1016/S1470-2045(22)00555-1") }] }),

  t({ id: "survive-breast-surveillance", name: "SURVIVE (intensive versus standard surveillance in early breast cancer)", aka: ["SURVIVE"], nct: "NCT05658172", phase: "not-applicable", status: "recruiting", sponsor: "Prof. Wolfgang Janni", enrolled: 3500, started: "2022-12-07", startedType: "actual",
    setting: "Intermediate- and high-risk early breast cancer after primary treatment: standard surveillance compared with intensive surveillance that adds blood tests (tumour markers, circulating tumour cells and ctDNA)",
    tldr: "A large German study asking whether regular blood tests after breast cancer treatment, rather than waiting for symptoms, change what happens to women.",
    summary: "SURVIVE (NCT05658172) compares standard with intensive surveillance in 3,500 planned patients with early breast cancer; in the intensive arm, abnormal blood results trigger imaging. It is the parent study of SURVIVE HERoes, which randomises patients with HER2-positive or HER2-low disease who have a molecular relapse.",
    cancers: ["breast-cancer"], technologies: ["mrd-testing", "liquid-biopsy"], terms: MRD_TERMS, trials: ["survive-heroes"],
    links: [ct("NCT05658172")] }),

  t({ id: "survive-heroes", name: "SURVIVE HERoes", aka: ["SURVIVE-HERoes"], nct: "NCT06643585", phase: "3", status: "recruiting", sponsor: "Prof. Wolfgang Janni", enrolled: 180, started: "2025-04-22", startedType: "actual",
    setting: "Intermediate- to high-risk HER2-positive or HER2-low early breast cancer in the SURVIVE study with molecular relapse (positive ctDNA): trastuzumab deruxtecan, plus endocrine therapy if hormone receptor positive, versus physician's choice, 2:1",
    tldr: "A trial that gives trastuzumab deruxtecan to people with HER2-positive or HER2-low breast cancer whose blood shows the cancer returning before anything is seen on scans.",
    summary: "SURVIVE HERoes (NCT06643585) randomises 180 planned patients from the SURVIVE surveillance study whose ctDNA turns positive to trastuzumab deruxtecan for 16 cycles (with endocrine therapy if hormone receptor positive) or physician's choice. ctDNA is measured with the RaDaR assay, and the primary endpoint is ctDNA clearance 12 months after randomisation. Patients are selected by the HER2 status of their original tumour, not by testing what has come back. The registry lists primary completion in April 2032.",
    drugs: ["trastuzumab-deruxtecan", "radar-mrd"], cancers: ["breast-cancer", "breast-her2-positive"], targets: ["her2"], technologies: ["mrd-testing"], terms: MRD_TERMS, trials: ["survive-breast-surveillance"],
    links: [ct("NCT06643585")] }),

  t({ id: "dnadalhr", name: "DNADalHR", nct: "NCT06970912", phase: "2", status: "recruiting", sponsor: "Peking University People's Hospital", enrolled: 393, started: "2025-08-01", startedType: "actual",
    setting: "High-risk HR-positive, HER2-negative early breast cancer: neoadjuvant dalpiciclib plus an aromatase inhibitor against taxane chemotherapy (1:4 randomisation), with ctDNA status after surgery deciding adjuvant treatment",
    tldr: "A Chinese trial asking whether a blood test after a tablet-based treatment before surgery can safely spare some women with hormone-receptor-positive breast cancer from chemotherapy.",
    summary: "DNADalHR (NCT06970912) randomises 393 planned women with high-risk HR-positive, HER2-negative early breast cancer to four cycles of taxane-based chemotherapy or of dalpiciclib with an aromatase inhibitor before surgery; adjuvant treatment is then adjusted by ctDNA. The registry describes tumour-informed personalised ctDNA panels of 16 clonal variants from whole-exome sequencing. Primary endpoints are ctDNA clearance after neoadjuvant therapy and three-year event-free survival; primary completion is estimated for December 2029.",
    drugs: ["dalpiciclib"], cancers: ["breast-hr-positive"], targets: ["cdk4-6"], technologies: ["mrd-testing"], terms: MRD_TERMS, institutions: ["pku-peoples-hospital"],
    links: [ct("NCT06970912")] }),

  t({ id: "ctong-2201", name: "CTONG 2201", aka: ["CTONG2201"], nct: "NCT05457049", phase: "observational", status: "recruiting", sponsor: "Guangdong Association of Clinical Trials", enrolled: 180, started: "2022-08-01", startedType: "actual",
    setting: "Completely resected stage IB to IIIA non-small cell lung cancer with landmark and longitudinal undetectable residual disease: close surveillance without adjuvant therapy",
    tldr: "A Chinese lung cancer study following people whose blood tests stayed negative after surgery, to see whether they can safely skip further treatment.",
    summary: "CTONG 2201 (NCT05457049) is a prospective, multicentre, single-arm observational study by the Chinese Thoracic Oncology Group. Patients with resected stage IB to IIIA non-small cell lung cancer whose residual disease tests are undetectable at the landmark and over time are followed closely; the primary endpoint is two-year disease-free survival. The registry lists 180 planned participants and an estimated primary completion in December 2026.",
    cancers: ["nsclc"], technologies: ["mrd-testing"], terms: MRD_TERMS, companies: ["ctong"],
    links: [ct("NCT05457049")] }),

  t({ id: "ctong-2508", name: "CTONG 2508 (ADAPT Lung)", aka: ["ADAPT Lung", "CTONG2508"], nct: "NCT07120698", phase: "2", status: "recruiting", sponsor: "Guangdong Association of Clinical Trials", enrolled: 115, started: "2025-11-05", startedType: "actual",
    setting: "Stage II to IIIB non-small cell lung cancer without pathological complete response after neoadjuvant immunotherapy plus chemotherapy: adjuvant sintilimab adapted to residual disease results",
    tldr: "A Chinese lung cancer trial that uses blood tests for leftover cancer to decide how much immunotherapy to give after surgery.",
    summary: "CTONG 2508, ADAPT Lung (NCT07120698), is a single-arm phase 2 trial of residual disease-guided adjuvant sintilimab in patients with stage II to IIIB non-small cell lung cancer who did not achieve a pathological complete response after neoadjuvant immunotherapy with chemotherapy, at the Third People's Hospital of Chengdu and Guangdong Provincial People's Hospital. The primary endpoint is two-year event-free survival; primary completion is estimated for June 2029.",
    drugs: ["sintilimab"], cancers: ["nsclc"], technologies: ["mrd-testing", "checkpoint-inhibitor"], terms: MRD_TERMS, companies: ["ctong"], institutions: ["guangdong-provincial-peoples-hospital"],
    links: [ct("NCT07120698")] }),

  t({ id: "treat-ctdna", name: "TREAT ctDNA", aka: ["EORTC-2129-BCG"], nct: "NCT05512364", phase: "3", status: "recruiting", sponsor: "European Organisation for Research and Treatment of Cancer (EORTC)", enrolled: 220, started: "2023-12-15", startedType: "actual",
    setting: "ER-positive, HER2-negative stage IIB to III breast cancer with ctDNA relapse and no distant metastasis: elacestrant versus continuing the same endocrine therapy",
    tldr: "A European trial that gives the tablet elacestrant to women whose blood shows hormone-receptor-positive breast cancer returning before scans do, to see whether it delays spread.",
    summary: "TREAT ctDNA (NCT05512364, EORTC) screens patients with ER-positive, HER2-negative breast cancer for ctDNA every six months; those who become ctDNA-positive by the Signatera assay (or another assay approved for diagnosis) without distant metastasis are randomised 1:1 to elacestrant or their current endocrine therapy (tamoxifen, letrozole, anastrozole or exemestane in the registry). Natera and the Menarini Group are collaborators. The primary endpoint is distant metastasis-free survival; primary completion is estimated for November 2032.",
    drugs: ["elacestrant", "signatera", "tamoxifen", "letrozole", "anastrozole", "exemestane"], cancers: ["breast-hr-positive"], targets: ["estrogen-receptor"], technologies: ["mrd-testing"], terms: MRD_TERMS, companies: ["natera"], related: ["trak-er"],
    links: [ct("NCT05512364")] }),

  t({ id: "mirador-medsir", name: "MiRaDoR", aka: ["MIRADOR", "MedOPP485"], nct: "NCT05708235", phase: "2", status: "active", sponsor: "MedSIR", enrolled: 976, started: "2024-04-01", startedType: "actual",
    setting: "HR-positive, HER2-negative early breast cancer at higher risk, operated on within five years: ctDNA surveillance, then treatment arms for patients who become ctDNA-positive (continued endocrine therapy, giredestrant, giredestrant plus abemaciclib, or giredestrant plus inavolisib for PIK3CA-mutated tumours)",
    tldr: "A Spanish-led study that watches the blood of women with hormone-receptor-positive breast cancer and, if tumour DNA appears, tests newer hormone drugs to try to clear it.",
    summary: "MiRaDoR (NCT05708235, MedSIR) enrols 976 patients into ctDNA surveillance with a tumour-informed panel built from tumour and matched normal sequencing; only patients confirmed ctDNA-positive by the Signatera Genome test enter the treatment phase, where they receive giredestrant, giredestrant with abemaciclib, or, if their tumour carries a PIK3CA mutation on tissue, giredestrant with inavolisib. The primary endpoint is a decrease or clearance of ctDNA three months after starting treatment. The PIK3CA gate is read from the original tumour, not from what remains in the blood.",
    drugs: ["giredestrant", "abemaciclib", "inavolisib", "signatera"], cancers: ["breast-hr-positive"], targets: ["estrogen-receptor", "pik3ca"], technologies: ["mrd-testing"], terms: MRD_TERMS,
    links: [ct("NCT05708235")] }),

  t({ id: "kan-her2-mrd", name: "KAN-HER2 MRD", aka: ["KAN-HER2"], nct: "NCT05388149", phase: "2", status: "recruiting", sponsor: "University Health Network, Toronto", enrolled: 15, started: "2022-12-06", startedType: "actual",
    setting: "Resected stage I to III HER2-positive breast cancer with residual disease detectable by RaDaR after neoadjuvant therapy, surgery and the start of adjuvant trastuzumab emtansine: neratinib added",
    tldr: "A small Canadian trial adding neratinib to standard treatment for women with HER2-positive breast cancer whose blood test shows leftover cancer after surgery.",
    summary: "KAN-HER2 MRD (Kadcyla And Neratinib for Interception of HER2+ Breast Cancer With Molecular Residual Disease, NCT05388149) adds neratinib 160 mg daily for up to 12 months to adjuvant trastuzumab emtansine in patients with residual disease detectable by the RaDaR assay. The primary endpoint is ctDNA clearance; the registry plans up to 15 participants in two stages.",
    drugs: ["neratinib", "trastuzumab-emtansine", "radar-mrd"], cancers: ["breast-her2-positive"], targets: ["her2"], technologies: ["mrd-testing"], terms: MRD_TERMS,
    links: [ct("NCT05388149")] }),

  t({ id: "nct06188468", name: "ImmunoPET Targeting Trop-2 in Solid Tumors (68Ga-MY6349)", nct: "NCT06188468", phase: "not-applicable", status: "completed", sponsor: "The First Affiliated Hospital of Xiamen University", enrolled: 90, started: "2023-10-01", startedType: "actual", yearReported: 2024,
    setting: "Patients with solid tumours: 68Ga-MY6349 PET/CT compared with standard-of-care imaging (18F-FDG, 68Ga-PSMA or 68Ga-DOTATATE PET/CT)",
    tldr: "The Xiamen study that first imaged the TROP2 protein in 90 patients with 15 kinds of cancer using a new PET scan.",
    summary: "NCT06188468 evaluated the feasibility of 68Ga-MY6349 PET/CT for non-invasive assessment of Trop2 expression across cancer types, with the aim of identifying patients who might benefit from Trop-2-targeted antibody-drug conjugates. Results were published in the Journal of Clinical Investigation in 2024: uptake correlated with Trop2 immunohistochemistry and was higher than FDG in breast, prostate and thyroid cancer.",
    result: "Uptake correlated with Trop2 immunohistochemistry; breast cancer SUVmax 7.2 vs 5.4 with FDG.",
    drugs: ["ga68-my6349"], cancers: ["breast-cancer"], targets: ["trop2"], technologies: ["trop2-pet"], keyPapers: [P.my6349Jci],
    links: [ct("NCT06188468"), { label: "Chen et al., J Clin Invest 2024", url: doiUrl("10.1172/jci185408") }] }),
];

// =====================================================================================================================
// The bottleneck and the idea
// =====================================================================================================================
const bottleneck: BottleneckInput = {
  id: BOTTLENECK, kind: "bottleneck", asOf, name: "Naming which clone or phenotype is left after treatment",
  aka: ["Subclone attribution of residual disease", "Which clone remains"],
  stage: "prevention-detection", severity: "major",
  tldr: "Blood tests can now find a few parts per million of tumour DNA after treatment, but at those levels there are too few molecules to say which branch of the tumour is left, or whether it still carries the oestrogen receptor or TROP2.",
  summary: "Ultrasensitive residual disease tests reach a few parts per million by adding up evidence across hundreds to about 1,800 tracked mutations: NeXT Personal reports a 95 per cent limit of detection of 3.45 parts per million (Northcott 2024). Saying which subclone the tumour DNA came from cannot pool that way, because it may use only the mutations private to that subclone. The published tool built for the job, ECLIPSE from TRACERx, states its operating point at 0.1 per cent clonal ctDNA (1,000 parts per million) with at least 10 ng of DNA, for a subclone present in 20 per cent of cancer cells and tracked by four mutations (Abbosh 2023). That is about a hundred to three hundred times above where detection now works.\n\nThe number of mutations is less of a limit than it first looks. The median of 57 trackable mutations per patient (range 2 to 346) in one early breast cancer study (Parsons 2020) came from whole-exome sequencing of the tumour, which reads only the protein-coding part of the genome. Panels designed from whole-genome sequencing find far more: up to about 1,800 variants for NeXT Personal (Northcott 2024), and AccuScan's validation sampled 2,000 to 20,000 markers (Li 2024). Whole-genome sequencing of 560 breast cancers found 3,479,652 somatic base substitutions (Nik-Zainal 2016), a mean of about 6,200 a cancer (OnCo arithmetic), and in 21 breast cancers the estimated number of subclonal mutations was, for most samples, more than the number of fully clonal ones (Nik-Zainal 2012).\n\nThe sharper constraints are design and molecules. NeXT Personal's design excludes variants below 10 per cent allele fraction in the tumour and ranks the rest by allele fraction (Northcott 2024, full text). A mutation on one of two copies of a chromosome, carried by 20 per cent of cancer cells, sits at about 10 per cent allele fraction even in a sample that is all tumour, and lower in a real biopsy, so this design largely leaves out the variants private to such a subclone (OnCo arithmetic). The molecule count then sets the floor: if every molecule in 30 ng of cell-free DNA is recovered, a subclone in 20 per cent of cancer cells at 10 parts per million needs about 170 private variants on the panel to expect three tumour fragments, and about 480 at 3.45 parts per million (OnCo arithmetic, in the metrics below). A whole-genome-designed panel that deliberately kept subclonal variants could in principle hold that many, if the tumour carries them and was sequenced deeply enough to find them at 10 per cent allele fraction or less; no source read here gives the usual number of variants private to one subclone in breast cancer. Reading plasma by whole-genome sequencing rather than a deep panel does not escape the arithmetic: at the 60-fold coverage AccuScan used, each site is read about 60 times, so the same subclone at 10 parts per million would need about 25,000 private sites, four times the mean total of about 6,200 substitutions in a breast cancer genome (OnCo arithmetic). Commercial panels are, besides, deliberately built from clonal, trunk mutations. The phenotype question is harder still: TROP2 expression is set mainly by DNA methylation rather than by mutation (Notini 2026), TROP2 PET uptake changes with treatment (Liu 2026), and the methods that read oestrogen receptor activity from blood (Griffin, METER, cfChIP-seq) were validated at 3 to 5 per cent tumour fraction, four orders of magnitude above residual disease. The one published case tying a resistant subclone to a TROP2 change, TACSTD2 T256R on one branch and TOP1 E418K on another under sacituzumab govitecan, was read from tissue at progression (Coates 2021). No commercial residual disease report reviewed on 4 November 2026 names the clone that remains.",
  metrics: [
    { label: "ECLIPSE operating point for calling a subclone (20% of cancer cells, 4 tracked mutations, 10 ng DNA; 94% sensitivity, estimated by simulation from the assay's dilution validation data)", value: "0.1% clonal ctDNA (1,000 parts per million)", source: "Abbosh et al., Nature 2023 (full text)", url: doiUrl("10.1038/s41586-023-05776-4") },
    { label: "NeXT Personal 95% limit of detection for tumour DNA (all tracked variants pooled; detection threshold 1.67 ppm)", value: "3.45 parts per million", source: "Northcott et al., Oncotarget 2024", url: doiUrl("10.18632/oncotarget.28565") },
    { label: "Trackable tumour mutations per patient in early breast cancer, found by whole-exome sequencing of the tumour (a whole-genome design finds more)", value: "Median 57 (range 2 to 346)", source: "Parsons et al., Clin Cancer Res 2020", url: doiUrl("10.1158/1078-0432.CCR-19-3005") },
    { label: "Somatic base substitutions found by whole-genome sequencing of 560 breast cancers (a mean of about 6,200 a cancer is OnCo arithmetic; numbers varied widely between cancers)", value: "3,479,652", source: "Nik-Zainal et al., Nature 2016", url: doiUrl("10.1038/nature17676") },
    { label: "Breast cancers in which the estimated number of subclonal point mutations genome-wide exceeded the number of fully clonal ones", value: "Most of the 21 studied (subclonal mutations found in every sample)", source: "Nik-Zainal et al., Cell 2012 (full text)", url: doiUrl("10.1016/j.cell.2012.04.023") },
    { label: "NeXT Personal variant design: variants below this tumour allele fraction are excluded, and the rest ranked by allele fraction", value: "10%", source: "Northcott et al., Oncotarget 2024 (full text)", url: doiUrl("10.18632/oncotarget.28565") },
    { label: "Arithmetic: tumour allele fraction of a mutation on one of two chromosome copies, carried by 20% of cancer cells, in a sample that is all tumour (lower when the biopsy contains normal cells)", value: "About 10% (0.2 x 0.5), at or under NeXT Personal's design cut-off", source: "OnCo arithmetic on the ECLIPSE subclone size and Northcott 2024", url: doiUrl("10.18632/oncotarget.28565") },
    { label: "AccuScan whole-genome plasma sequencing, measured in a dilution series (10 ng input): detection at 10 parts per million by number of markers", value: "38% with 2,000; 77% with 5,000; 96% with 10,000; 100% with 20,000", source: "Li et al., EMBO Mol Med 2024 (full text)", url: doiUrl("10.1038/s44321-024-00115-0") },
    { label: "Arithmetic: private sites needed to expect three fragments from a subclone in 20% of cancer cells at 10 parts per million when plasma is read by whole-genome sequencing at 60-fold coverage, as AccuScan was", value: "About 25,000 (3 / (60 x 0.00001 x 0.2))", source: "OnCo arithmetic on Li 2024", url: doiUrl("10.1038/s44321-024-00115-0") },
    { label: "Subclonal mutations on each TRACERx 2017 patient panel (of a median 18 tracked)", value: "Median 6 (range 0 to 16)", source: "Abbosh et al., Nature 2017 (full text)", url: doiUrl("10.1038/nature22364") },
    { label: "Arithmetic from sourced inputs: expected tumour fragments at one tracked position at 10 parts per million, from 30 ng of cell-free DNA (the top of NeXT Personal's validated 2 to 30 ng; its modal input is about 15 ng, which would halve these counts) at about 1,500 genome copies per 5 ng (Fiala 2018), assuming every molecule is recovered", value: "About 0.09 (9,000 copies x 0.00001)", source: "OnCo arithmetic on Northcott 2024 and Fiala and Diamandis 2018", url: doiUrl("10.1186/s12916-018-1157-9") },
    { label: "Arithmetic from the same inputs: private mutations needed to expect three fragments (about a 95% chance of seeing at least one) from a subclone in 20% of cancer cells at 10 parts per million", value: "About 167 (3 / (0.09 x 0.2)); about 484 at 3.45 ppm", source: "OnCo arithmetic on Northcott 2024, Fiala and Diamandis 2018 and the ECLIPSE subclone size", url: doiUrl("10.1038/s41586-023-05776-4") },
    { label: "TRAK-ER: patients with radiological recurrence already present when ctDNA was first detected on the first surveillance test", value: "65.9% (29 of 44)", source: "Cunningham et al., Ann Oncol 2026", url: doiUrl("10.1016/j.annonc.2026.10.1292") },
  ],
  causes: [
    "Detection pools signal across the whole panel; attributing it to a subclone may use only that subclone's private mutations, which are few.",
    "At 10 parts per million a 30 ng sample holds about 0.09 tumour fragments at any one tracked position (arithmetic above), so per-mutation counts are almost always zero and a ratio of allele fractions cannot be estimated.",
    "Commercial panels choose clonal, high-fraction variants so that they stay positive whatever relapses, which leaves branch mutations off the panel.",
    "Panels designed from whole-exome sequencing find few mutations to track in breast cancer (median 57 in one study); whole-genome designs find many more, but the one with a published design rule drops variants below 10 per cent tumour allele fraction, which is where a subclone in 20 per cent of cancer cells sits.",
    "Finding a subclone's private variants in the first place needs deep tumour sequencing: at 10 per cent allele fraction or less they are supported by few reads at ordinary depth.",
    "A panel built from one biopsy mislabels branch mutations as trunk ones; TRACERx's 'clonal illusion' analysis showed this with a single tumour region.",
    "Oestrogen receptor and TROP2 status are mostly not encoded in mutations: TROP2 expression tracks DNA methylation, and both receptors can change with treatment.",
    "Clonal haematopoiesis can put a single non-tumour molecule at a tracked position, which at these levels would be enough to call a false subclone without matched white-cell sequencing.",
  ],
  currentEfforts: [
    "ECLIPSE (TRACERx) calls subclones from plasma at 0.1% clonal ctDNA and above, in lung cancer.",
    "Phased-variant sequencing (PhasED-Seq, Foresight CLARITY) puts several mutations on one fragment and reaches 0.7 parts per million in lymphoma.",
    "Whole-genome approaches (MRDetect, MRD-EDGE, AccuScan) add up thousands of sites, though each site is read about once.",
    "Geneplus labels tracked variants as clonal or subclonal in research data; clonal ones were the more prognostic.",
    "Griffin, METER and plasma epigenomic profiling read oestrogen receptor activity from blood at percent-level tumour fractions in metastatic disease.",
    "TROP2 PET (68Ga-MY6349, 68Ga-NOTA-T4) maps TROP2 on visible lesions.",
    "SERENA-6 and PADA-1 act on a resistant subclone (ESR1-mutant) found in blood in advanced disease, where the mutation itself marks the clone and chooses the drug.",
    "COGNITION-GUIDE assigns a genomics-guided drug, including a TROP2 antibody-drug conjugate, to patients with residual cancer after neoadjuvant therapy, by tumour profiling rather than a blood test.",
  ],
  successLooksLike: "A blood test after treatment reports, with a stated limit, not only that tumour DNA is present but which clone it comes from and whether that clone carries the oestrogen receptor or TROP2, validated against tissue, so the choice between an endocrine drug and a TROP2 antibody-drug conjugate can follow what is actually left.",
  cancers: ["breast-cancer", "breast-hr-positive", "tnbc"], technologies: ["mrd-testing", "eclipse-subclone-ctdna", "liquid-biopsy"], targets: ["trop2", "estrogen-receptor"],
  keyPapers: [P.eclipse, P.northcott, P.parsons, P.nikZainal2016, P.nikZainal2012, P.dentro, P.accuscan, P.notini, P.coates, P.tracerx2017, P.fiala], trials: ["trak-er", "c-trak-tn", "serena-6", "pada-1"],
  related: ["b-dormancy-mrd", "b-tumor-heterogeneity", "ctdna-mrd-positive"],
  links: [{ label: "Abbosh et al., Nature 2023 (ECLIPSE)", url: doiUrl("10.1038/s41586-023-05776-4") }, { label: "Northcott et al., Oncotarget 2024", url: doiUrl("10.18632/oncotarget.28565") }, { label: "Parsons et al., Clin Cancer Res 2020", url: doiUrl("10.1158/1078-0432.CCR-19-3005") }],
} as unknown as BottleneckInput;

const idea: IdeaInput = {
  id: IDEA, kind: "idea", asOf, name: "Read methylation and mutation on the same cell-free DNA fragment to tell what kind of cancer is left",
  aka: ["Same-fragment methylation and mutation", "Phenotype from residual ctDNA molecules"],
  maturity: "speculative", actor: "research",
  tldr: "A proposal, untested: when a blood test finds a tumour fragment after treatment, also read the chemical marks on that same piece of DNA, which might show whether the cell it came from was making the oestrogen receptor or TROP2.",
  summary: "This is a proposal with no evidence yet that it works. Ultrasensitive residual disease tests find a handful of tumour-derived molecules by their mutations, and then discard everything else those molecules carry. The same fragment also carries its methylation, and TROP2 expression is controlled mainly by methylation of its gene rather than by mutation (Notini 2026). Reading a tracked tumour mutation and the methylation of nearby CpG sites on one molecule would tie each rare tumour fragment to an epigenetic state, so that even a few molecules could carry phenotype information that tumour-naive methods (Griffin, METER, cfChIP-seq) only recover at 3 to 5 per cent tumour fraction. Duplex strand reading such as SaferSeqS shows single rare molecules can be read accurately; whether their methylation can be read at the same time, and whether a few fragments near a mutation say anything about ESR1 or TACSTD2 regulation elsewhere in the genome, is unknown.",
  hypothesis: "Methylation read on the same cell-free DNA fragments that carry tracked tumour mutations classifies oestrogen receptor and TROP2 (TACSTD2) expression status of the source tumour better than chance at tumour fractions below 0.1 per cent, where tumour-naive methylation and fragmentation methods are not validated.",
  rationale: "TACSTD2 expression is inversely associated with methylation and its genomic alterations are uncommon (Notini 2026); oestrogen receptor activity is readable from cell-free DNA chromatin and methylation at percent-level tumour fractions (Doebley 2022, Paoli 2026); and ECLIPSE shows that the bottleneck for clone attribution is the number of informative molecules, so information per molecule is the lever.",
  test: "First, in tumour tissue and matched cell lines, check whether methylation at CpGs within a fragment's length of commonly tracked mutations differs between ER-positive and ER-negative, and TROP2-high and TROP2-low, tumours; if it does not, stop. Then, in plasma dilution series of known ER and TROP2 status (for example from metastatic breast cancer patients with paired biopsies), read mutation and methylation together with an enzymatic conversion chemistry that preserves both, and measure classification accuracy against the number of tumour molecules recovered, with matched white-cell DNA to exclude clonal haematopoiesis.",
  bottlenecks: [BOTTLENECK, "b-tumor-heterogeneity", "b-dormancy-mrd"],
  technologies: ["saferseqs", "eclipse-subclone-ctdna", "methylation-profiling", "mrd-testing", "meter-methylome-subtyping", "griffin-nucleosome-profiling"],
  targets: ["trop2", "estrogen-receptor"], cancers: ["breast-cancer", "breast-hr-positive", "tnbc"],
  keyPapers: [P.notini, P.eclipse, P.saferseqs, P.coates, P.meter, P.griffin], terms: ["ctdna", "cfdna", "mrd"],
  related: ["idea-bio1-methylation-clone-tracking", "idea-trop2-pet-selection"],
  tags: ["proposal"],
  links: [{ label: "Notini et al., NPJ Precis Oncol 2026 (TACSTD2 methylation)", url: doiUrl("10.1038/s41698-026-01523-w") }, { label: "Abbosh et al., Nature 2023 (ECLIPSE)", url: doiUrl("10.1038/s41586-023-05776-4") }, { label: "Cohen et al., Nat Biotechnol 2021 (SaferSeqS)", url: doiUrl("10.1038/s41587-021-00900-z") }],
} as unknown as IdeaInput;

// =====================================================================================================================
// Supplements onto records other files own
// =====================================================================================================================
const NEW_TESTS = tests.map((x) => x.id);
const supplements: Spike["supplements"] = [
  { id: "mrd-testing", keyPapers: [P.northcott, P.klimova, P.parsons, P.santonja], bottlenecks: [BOTTLENECK], related: ["eclipse-subclone-ctdna", "genome-wide-ctdna-mutation-integration", "saferseqs"], trials: ["ctong-2201", "trak-er", "treat-ctdna"],
    notes: ["Detection limits use method-specific quantities, including variant allele fraction, an estimated tumour fraction or tumour-attributed molecules per plasma volume. Converting a concentration into a fraction needs a compatible denominator and the methods' calculation, recovery and calibration; the printed numbers alone are insufficient. A limit also belongs to its specimen, input and calling rule, so product pages using different units do not establish a head-to-head sensitivity ranking.", "Detecting pooled tumour-associated signal does not by itself validate naming or measuring a subclone. Subclone assignment needs separate evidence about covered variants, their grouping, the clone model and its detectable abundance under the actual input conditions. Adding targets can improve detection of a tumour signal without establishing detection or quantitation of every individual variant."] } satisfies { id: string } & Partial<TechnologyInput>,
  { id: "radar-mrd", trials: ["kan-her2-mrd"] } satisfies { id: string } & Partial<DrugInput>,
  { id: "sintilimab", trials: ["ctong-2508"] } satisfies { id: string } & Partial<DrugInput>,
  { id: "liquid-biopsy", related: ["griffin-nucleosome-profiling", "meter-methylome-subtyping", "epic-seq", "plasma-epigenomic-profiling"] } satisfies { id: string } & Partial<TechnologyInput>,
  { id: "fragmentomics", related: ["griffin-nucleosome-profiling", "epic-seq"] } satisfies { id: string } & Partial<TechnologyInput>,
  { id: "ctdna-lymphoma-monitoring", keyPapers: [P.klimova], related: ["foresight-clarity"] } satisfies { id: string } & Partial<TechnologyInput>,
  { id: "trop2-pet", keyPapers: [P.my6349Jci, P.my6349Breast, P.notaT4], related: ["ga68-my6349", "ga68-nota-t4"] } satisfies { id: string } & Partial<TechnologyInput>,
  { id: "trop2", keyPapers: [P.notini, P.coates], related: ["ga68-my6349", "ga68-nota-t4", BOTTLENECK] } satisfies { id: string } & Partial<TargetInput>,
  { id: "ctdna-mrd-positive", keyPapers: [P.parsons, P.northcott, P.trakEr], related: [BOTTLENECK] } satisfies { id: string } & Partial<BiomarkerInput>,
  { id: "esr1-mutation-ctdna", keyPapers: [P.pada1, P.serena6Ext], trials: ["pada-1"] } satisfies { id: string } & Partial<BiomarkerInput>,
  // Existing tests: the stated limit of detection, in the source's words, where the record did not carry it.
  { id: "next-personal", keyPapers: [P.northcott], notes: ["Stated limit of detection, peer reviewed: \"Analytical measurements demonstrated a detection threshold of 1.67 parts per million (PPM) with a limit of detection at 95% (LOD95) of 3.45 PPM\" (Northcott et al., Oncotarget 2024). Personalis' product page gives a limit of quantification of 10 parts per million, so below that the test reports detection but not a reliable amount.", "Variant selection excludes variants below 10 per cent allele fraction in the tumour and ranks the rest by allele fraction, so the panel leans to clonal, trunk mutations; the report gives a positive or negative call and parts per million, not the clone."] } satisfies { id: string } & Partial<DrugInput>,
  { id: "haystack-mrd", keyPapers: [P.haystack], notes: ["Stated limit of detection, peer reviewed: \"Haystack MRD exhibited a 95% limit of detection of 0.063 mean ctDNA molecules/mL and an analytical measurement range of 0.25 to 1000 mean ctDNA molecules/mL\" (Clark et al., J Mol Diagn 2026). A limit in molecules per mL is not a parts-per-million figure; the two cannot be converted without the sample's cell-free DNA concentration."] } satisfies { id: string } & Partial<DrugInput>,
  { id: "foundationone-mrd", notes: ["Stated limit of detection, from Foundation Medicine's technical specification (company document, not peer reviewed): \"The analytical sensitivity of FoundationOne MRD is 95% (LOD95) at 5.21 PPM.\" The same document gives the limit by DNA input, measured on a diluted cell line: 1.08 parts per million at 300 ng, 5.21 at 70 ng, 10.90 at 35 ng and 61.32 at 5 ng. Results are reported as ctDNA detected or not detected."], links: [{ label: "Foundation Medicine: FoundationOne MRD technical specifications (July 2026)", url: "https://www.foundationmedicine.com/sites/default/files/media/documents/2026-07/FoundationOne_MRD_Technical_Specifications.pdf" }] } satisfies { id: string } & Partial<DrugInput>,
  { id: "signatera", notes: ["Stated limit of detection, from Natera's FAQ (company page): \"a low limit of detection (LOD) of 0.01% variant allele frequency (VAF)\", which is 100 parts per million. Natera states that the bespoke panel is built from clonal variants; the report gives detection and mean tumour molecules per mL, not the clone."], links: [{ label: "Natera: Signatera FAQ", url: "https://www.natera.com/oncology/signatera-advanced-cancer-detection/faq/" }] } satisfies { id: string } & Partial<DrugInput>,
  // Trials that act on a blood result in breast cancer.
  { id: "serena-6", keyPapers: [P.serena6Nejm, P.serena6Ext], related: ["pada-1"],
    outcomes: [{ endpoint: "Second progression-free survival (extended analysis)", unit: "months", arms: [{ name: "Switch to camizestrant + CDK4/6", n: 157, value: 25.7 }, { name: "Continue AI + CDK4/6", n: 158, value: 19.1 }], hr: 0.63, ci: [0.46, 0.86], p: "0.0037", source: doiUrl("10.1016/S1470-2045(26)00287-1") }],
    notes: ["Interim result as published (Bidard et al., NEJM 2025): median progression-free survival 16.0 months (95% CI 12.7 to 18.2) against 9.2 months (7.2 to 9.5), hazard ratio 0.44 (95% CI 0.31 to 0.60), P<0.0001, at a median follow-up of 12.6 months.", "Extended analysis (Turner et al., Lancet Oncology 2026, data cut-off 2 January 2026): of 3,325 screened, 3,256 had at least one ESR1 test and 548 tested positive by screening closure; updated progression-free survival 16.8 against 9.2 months, hazard ratio 0.45 (0.34 to 0.59), described as descriptive; second progression-free survival 25.7 against 19.1 months, hazard ratio 0.63 (0.46 to 0.86), p = 0.0037.", "The assay was Guardant360 CDx, a hotspot genotyping test in advanced disease, not a residual disease test."] } satisfies { id: string } & Partial<TrialInput>,
  { id: "c-trak-tn", bottlenecks: [BOTTLENECK], related: ["trak-er"] } satisfies { id: string } & Partial<TrialInput>,
  { id: "nct07069595", technologies: ["mrd-testing"], targets: ["trop2"], terms: MRD_TERMS,
    notes: ["Read on ClinicalTrials.gov on 4 November 2026: patients with residual disease receive ctDNA surveillance, and those with a molecular relapse and no recurrence on imaging receive datopotamab deruxtecan, an antibody-drug conjugate against TROP2. The registry names no TROP2 test of the residual disease and does not name the ctDNA assay."] } satisfies { id: string } & Partial<TrialInput>,
  { id: "nct04434040", technologies: ["mrd-testing"], targets: ["trop2"], terms: MRD_TERMS,
    notes: ["Read on ClinicalTrials.gov on 4 November 2026: eligibility requires residual disease after neoadjuvant therapy and ctDNA detected after all therapy; sacituzumab govitecan, a TROP2 antibody-drug conjugate, is given with atezolizumab. The registry entry contains no TROP2 test."] } satisfies { id: string } & Partial<TrialInput>,
  { id: "nct04849364", technologies: ["mrd-testing"], terms: MRD_TERMS,
    result: "Posted registry results, too small to interpret: 2-year disease-free survival 100% in the PI3K-pathway arm (1 participant), median 8.1 months in ctDNA-positive patients without a target (4 participants), and 40.2% (95% CI 11.7 to 67.9) in ctDNA-negative patients (40 participants).",
    outcomes: [{ endpoint: "Disease-free survival at 2 years (posted registry results)", unit: "%", arms: [{ name: "Arm 1c: ctDNA-positive, PI3K pathway (inavolisib + capecitabine)", n: 1, value: 100 }, { name: "Arm 2: ctDNA-positive, no target, standard of care", n: 4, value: 0, note: "Median disease-free survival 8.1 months" }, { name: "Arm 3: ctDNA-negative, physician's choice", n: 40, value: 40.2 }], source: ctResults("NCT04849364") }],
    notes: ["PERSEVERE assigned ctDNA-positive patients with residual triple-negative breast cancer to a drug matched to a genomic target (DNA repair, immune or PI3K pathway); it is one of the few trials that acted on what was found, not only on whether ctDNA was present. The registry names sequencing but not the assay."] } satisfies { id: string } & Partial<TrialInput>,
  { id: "nct05332561", drugs: ["sacituzumab-govitecan", "inavolisib", "ipatasertib", "atezolizumab"], targets: ["trop2"],
    notes: ["Read on ClinicalTrials.gov on 4 November 2026: COGNITION-GUIDE enrols high-risk patients with residual cancer after neoadjuvant therapy and allocates a genomics-guided post-neoadjuvant treatment by in-depth molecular characterisation of tumours within the COGNITION registry programme; the registered arms include the TROP2 antibody-drug conjugate sacituzumab govitecan. It chooses by tumour profiling, not by a blood test."] } satisfies { id: string } & Partial<TrialInput>,
  // The ctDNA roadmap's watch list: the randomised readouts that will say whether acting on a blood result helps in breast cancer.
  { id: "ctdna-tests", watch: [
    { item: "TRAK-ER treatment phase: randomised relapse-free survival with palbociclib plus fulvestrant after ctDNA relapse in high-risk ER-positive early breast cancer (registry primary completion, estimated)", expected: "2027-09-01", source: "https://clinicaltrials.gov/study/NCT04985266", refs: ["trak-er"] },
    { item: "TREAT ctDNA: distant metastasis-free survival with elacestrant after ctDNA relapse (registry primary completion, estimated)", expected: "2032-11-01", source: "https://clinicaltrials.gov/study/NCT05512364", refs: ["treat-ctdna", "elacestrant"] },
  ], related: [BOTTLENECK, IDEA] } satisfies { id: string } & Partial<RoadmapInput>,
  { id: "tnbc", pipeline: ["nct07069595", "nct04434040", IDEA], keyPapers: [P.coates] } as { id: string } & Record<string, unknown>,
  { id: "breast-hr-positive", pipeline: ["trak-er", "treat-ctdna", "mirador-medsir", "dnadalhr"], keyPapers: [P.pada1, P.trakEr] } as { id: string } & Record<string, unknown>,
  { id: "idea-bio1-methylation-clone-tracking", related: [IDEA] } satisfies { id: string } & Partial<IdeaInput>,
  { id: "b-dormancy-mrd", related: [BOTTLENECK] } satisfies { id: string } & Partial<BottleneckInput>,
];

const spike: Spike = {
  cancerId: "breast-cancer",
  entities: [...tests, ...companies, ...imagingAgents, ...technologies, ...papers, ...trials, bottleneck, idea],
  patch: {
    pipeline: [IDEA, "trak-er", "survive-heroes"],
    openProblems: ["After treatment, ultrasensitive blood tests can say that a few parts per million of tumour DNA remain but not which clone it came from, or whether that clone carries the oestrogen receptor or TROP2: the published subclone method (ECLIPSE) works at 0.1 per cent tumour DNA and above, and blood-based oestrogen receptor readouts at 3 to 5 per cent. Choosing between an endocrine drug and a TROP2 antibody-drug conjugate on residual disease therefore still rests on the original tumour."],
    keyPapers: [P.parsons, P.santonja],
  },
  supplements,
};

export const BREAST_RESIDUAL_NEW_TESTS = NEW_TESTS;
export default spike;

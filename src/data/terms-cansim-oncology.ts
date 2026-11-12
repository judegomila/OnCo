/**
 * Oncology vocabulary from the CanSim terms map (docs/CANCERSIM-TERMS-GAP.md, 24 Sept 2026): clinical and biological
 * concepts, assays and data modalities, genome and data standards, and access rules that OnCo lacked. Each record
 * paraphrases the page it links (Wikipedia summary, the standard's own site, the GDC or FDA page) in one or two
 * sentences; nothing is defined from memory. Every record carries the CC BY 4.0 attribution the CanSim file asks for
 * in `notes` and `provenance` (the file states no site origin, so the file itself is cited). Hover aliases are kept to
 * phrases that do not occur in ordinary prose.
 *
 * The companion file terms-cansim-methods.ts holds the machine-learning and data-standards half under the
 * "Methods and models" category; the hub term `cancer-ai-vocabulary` at the bottom of this file lists every record of both.
 */
import type { TermInput } from "@/lib/schema";

export const CANSIM_ASOF = "2026-09-24";
export const CANSIM_ATTRIBUTION = "CanSim terms map 1.0.0 (docs/onco/terms.json, generated 2026-09-24), CC BY 4.0, attribution: CanSim project, an open, public-data-first cancer foundation-model programme";
export const CANSIM_HUB = "cancer-ai-vocabulary";
const provenance = { editedBy: "OnCo CanSim terms wave (Wikipedia summaries, standards and project pages, GDC and FDA pages, Europe PMC)", editedOn: CANSIM_ASOF, note: CANSIM_ATTRIBUTION };
export const W = (s: string) => `https://en.wikipedia.org/wiki/${s}`;
export const DOI = (d: string) => `https://doi.org/${d}`;

type T = Omit<TermInput, "kind" | "asOf" | "provenance" | "tags"> & { cansim?: string } & { asOf?: string; provenance?: TermInput["provenance"] };
/** Term with the CanSim attribution note and a link back to the hub term, so no record is an orphan. */
export const cansimTerm = (x: T): TermInput => {
  const { cansim, ...rest } = x;
  const links = [...(x.links ?? []), ...(x.wikipedia && !(x.links ?? []).some((l) => l.url === x.wikipedia) ? [{ label: "Wikipedia", url: x.wikipedia }] : [])];
  return {
    kind: "term", asOf: CANSIM_ASOF, provenance, tags: ["cansim-terms"],
    ...rest,
    links,
    notes: [...(x.notes ?? []), `Listed in the ${CANSIM_ATTRIBUTION}${cansim ? `; CanSim page path ${cansim}` : ""}.`],
    related: [...(x.related ?? []), CANSIM_HUB],
  };
};
const t = cansimTerm;

const CLIN = "Clinical", PATH = "Pathology", GEN = "Genomics & genetics", BIO = "Cancer biology", REG = "Regulation & policy", BM = "Biomarkers", DX = "Diagnostics & imaging", END = "Endpoints", TX = "Treatment jargon";

export const cansimOncologyTerms: TermInput[] = [
  // ---- Clinic and pathology concepts ----
  t({ id: "tumour-board", name: "Tumour board (multidisciplinary team meeting)", category: CLIN, aka: ["tumour board", "tumor board", "tumour boards", "tumor boards", "multidisciplinary tumour board", "MDT meeting", "molecular tumour board"],
    wikipedia: W("Tumor_board_review"), cansim: "/terms/tumour-board",
    tldr: "A tumour board is a meeting where doctors from different specialties review one patient's cancer together and agree a treatment plan.",
    summary: "Tumour board review is a treatment-planning approach in which experts from several medical specialties (surgery, medical and radiation oncology, pathology, radiology) meet to discuss complex cancer cases and their treatment options, as the Wikipedia article describes. Molecular tumour boards add genomics specialists to match sequencing results to targeted drugs and trials; a model that ranks treatments would have to fit into this room.",
    terms: ["informed-consent", "tnm-staging"] }),
  t({ id: "grade-vs-stage", name: "Grade versus stage", category: PATH, aka: ["grade vs stage", "grade and stage", "grading versus staging", "tumour grade versus stage"],
    wikipedia: W("Grading_(tumors)"), links: [{ label: "Wikipedia: cancer staging", url: W("Cancer_staging") }], cansim: "/terms/grade-vs-stage",
    tldr: "Grade describes how abnormal the cancer cells look under the microscope; stage describes how far the cancer has grown and spread.",
    summary: "Grading, per the Wikipedia article, is a pathologist's measure of how much the tumour cells resemble the normal tissue they came from (differentiation), from low grade to high grade. Staging is the separate process of determining the extent of growth and spread, usually as a number from I to IV built from tumour size, invasion, lymph nodes and metastasis. Both are routine clinical covariates in prognostic models, and models that mix them up mis-state what they predict.",
    terms: ["cancer-stage", "tnm-staging", "tumour-differentiation"] }),
  t({ id: "tumour-purity", wikipediaChecked: "2026-09-25", name: "Tumour purity", category: PATH, aka: ["tumour purity", "tumor purity", "tumour cellularity", "tumor cellularity", "purity estimate"],
    links: [
  {
    "label": "Aran, Sirota and Butte, Systematic pan-cancer analysis of tumour purity (Nature Communications 2015)",
    "url": "https://doi.org/10.1038/ncomms9971"
  },
  {
    "label": "Measurement method and interpretation source",
    "url": "https://pubmed.ncbi.nlm.nih.gov/20837533/"
  },
  {
    "label": "Carter et al., ABSOLUTE, 2012",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22544022/"
  },
  {
    "label": "Smits et al., pathologist estimation variability, 2014",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23887293/"
  },
  {
    "label": "Bielski et al., advanced cancer genome doubling, 2018",
    "url": "https://pubmed.ncbi.nlm.nih.gov/30013179/"
  },
  {
    "label": "Popova et al., ploidy-specific large-scale transitions, 2012",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22933060/"
  },
  {
    "label": "Telli et al., HRD score in platinum TNBC cohorts, 2016",
    "url": "https://pubmed.ncbi.nlm.nih.gov/26957554/"
  }
], cansim: "/terms/tumour-purity",
    tldr: "Tumour purity is the fraction of cells in a sample that are actually cancer cells rather than normal, immune or stromal cells.",
    summary: "Aran, Sirota and Butte's pan-cancer analysis of TCGA estimated the proportion of cancer cells in each sample by several methods (pathologist counts, copy number, expression and methylation based estimators) and showed purity varies widely between and within cancer types and confounds molecular comparisons. Bulk sequencing measures the whole mixture, so a low-purity sample can look like a different tumour; models trained on bulk data inherit this.",
    terms: ["cell-composition-confound", "desmoplasia"] ,
"notes": [
  "Purity estimates and ploidy fits belong to the tested region and method. A pathology estimate of malignant-cell proportion and a sequencing model fit can disagree. Ploidy is a genome-wide average; local copy number can differ. Several purity-ploidy combinations may explain similar data.",
  "Idealised arithmetic assumes diploid normal cells, diploid cancer cells and one mutant copy in every cancer cell: at purity 80%, 50% and 20%, expected variant allele fractions are 40%, 25% and 10%. A one-copy cancer-cell deletion yields mixed average copy numbers 1.2, 1.5 and 1.8 respectively. Copy changes and subclones alter these relationships.",
  "Purity describes the malignant-cell share of the sampled cell mixture; a DNA-based estimate must account for how many genome copies the cells contribute. Ploidy is the average cancer-cell genome copy number. The marble-mixture analogy stops where local copy number and subclonal differences make each cell contribution unequal.",
  "ASCAT reported aneuploidy above 2.7 genome copies in 45% of its early breast cancer series and near-triploid basal-like genomes consistent with loss followed by duplication. A separate advanced-cancer study identified whole-genome doubling in nearly 30% of 9,692 patients. These populations are different. A region with three copies can be a relative loss against a four-copy baseline, while exceeding a normal diploid count.",
  "Nine pathologists estimated tumour-cell content on 47 lung tumour slides; 33% of estimates differed from manually counted content by at least three categories, mostly 10 percentage-points wide. ASCAT and ABSOLUTE jointly infer purity and ploidy from allelic copy number and related signals. Several fits, subclonal changes and low tumour content can complicate interpretation; a model fit is not a direct count.",
  "Copy-number-based genomic scars depend on segmentation and interpretation of purity and ploidy. Popova used ploidy-specific large-scale transition cutoffs in basal-like breast cancers. Telli evaluated a combined loss-of-heterozygosity, telomeric-imbalance and large-scale-transition score of at least 42 or BRCA1/2 mutation in three platinum-containing neoadjuvant TNBC trials. This does not create a universal HRD threshold or prove current repair function or treatment benefit from a fit alone.",
  "Fictional near-diploid example: 18% variant allele fraction is compatible with one mutant copy in every malignant cell at 36% purity, assuming diploid normal cells and no local copy change. It does not prove clonality. At 90% purity, the same VAF would need a different explanation such as subclonality or copy-number context. A negative low-purity result can reflect limited detection, not biological absence.",
  "Sequencing purity belongs to the region used for extraction. Tumour-bed cellularity is an area-based residual cancer burden input, while plasma tumour fraction concerns circulating DNA. Sparse residual malignant cells can make post-treatment sequencing difficult; retain the tested block and laboratory-specific detection limits.",
  "A pathology estimate uses the represented slide region, while a computational purity/ploidy estimate fits sequencing copy-number and allele-fraction data. Fitting those existing data uses no additional tissue. Report purity as a fraction or percentage and ploidy as average cancer-genome copies, such as 2.1 or 3.8, with the region, method and model assumptions.",
  "Laboratories set minimum tumour content for the particular assay. Too few tumour cells, contamination, subclonal copy changes or several similarly good model fits can make the estimate uncertain. Purity and ploidy do not identify which mutations drive the cancer or which treatment will work."
],
"asOf": "2026-11-10"
}),
  t({ id: "cell-composition-confound", keyPapers: ["paper-li-timer2-nar-2020"], name: "Cell composition confound (tumour versus stroma and immune cells)", category: BIO, aka: ["cell composition confound", "cell-mix confound", "stromal contamination", "immune infiltration confound"],
    wikipedia: W("Tumor_microenvironment"), cansim: "/terms/cell-composition-confound",
    tldr: "Because a tumour sample is a mix of cancer, stromal and immune cells, a difference between two samples may only reflect a different mix of cells.",
    summary: "The tumour microenvironment, as Wikipedia describes it, is the ecosystem of cancer cells, stromal tissue, immune cells and extracellular matrix around a tumour. Any measurement on the whole sample (bulk expression, methylation, a region of a spatial section) averages over that mix, so an apparent risk or subtype difference between regions or patients can be a composition difference rather than a change in the cancer cells themselves. Deconvolution and purity estimates are the usual corrections.",
    terms: ["tumour-purity", "microenvironment-inflammation-theory"] }),
  t({ id: "intra-tumour-heterogeneity", name: "Intra-tumour heterogeneity", category: BIO, aka: ["intra-tumour heterogeneity", "intratumour heterogeneity", "intratumoral heterogeneity", "intra-tumor heterogeneity", "ITH"],
    wikipedia: W("Tumour_heterogeneity"), cansim: "/terms/intra-tumour-heterogeneity",
    tldr: "Cancer cells can differ in DNA, molecular state and behaviour across regions and time. One sample and one target measurement need not represent every population.",
    summary: "Intratumour heterogeneity includes genetic branches and changing cell states, which are distinct biological axes. A locally clonal alteration may not be shared by unseen disease, and shared DNA does not guarantee uniform protein expression or therapeutic coverage. Interpretation retains the sample, method and uncertainty.",
    related: ["b-tumor-heterogeneity"], pathways: ["clonal-evolution"], terms: ["clonal-evolution-theory"] ,
"notes": [
  "Heterogeneity includes DNA differences, molecular states and behaviour across regions, lesions and time. Clones and subclones describe ancestry; clonal variants are estimated within a stated analysed cancer-cell population. A sampled ancestral trunk is not proof of presence in unseen lesions. Sequencing-read or molecule variant allele fractions differ from modelled cancer-cell fractions, which depend on purity, copy number, detection limits and ancestry assumptions.",
  "Neftel integrated single-cell RNA sequencing, genetic analysis and experimental lineage tracing in glioblastoma to describe four main states and plasticity between them. This is not a universal state map for all cancers. An RNA cluster is not automatically a genetic clone. A population detected after therapy can reflect previously undetected cells, acquired changes or a changed state; two snapshots may not separate these explanations.",
  "In a fictional specimen with 60 target-positive and 40 target-negative cells, perfect specificity for the target can still leave the negative population. A target-rich local biopsy is not a whole-tumour response probability. Even a shared DNA trunk does not guarantee RNA, surface protein, presented peptide or effective therapeutic coverage in every cell. A selected culture can also overrepresent cells that grow under its conditions.",
  "If two adequately tested regions share A while B is found in only one, A is a candidate shared ancestral feature and B is branch-associated under the tested model. A third unsampled site remains unknown. Retain region, date, specimen, method, resolution and uncertainty across multiregion, single-cell, spatial and modelled-fraction studies. DNA outlines, RNA-state symbols and surface marks in a figure represent different layers; icon counts are not measured fractions or treatment-response estimates."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Tumour_heterogeneity"
  },
  {
    "label": "Gerlinger et al., Intratumor heterogeneity and branched evolution revealed by multiregion sequencing. (2012)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22397650/"
  },
  {
    "label": "Neftel et al., An Integrative Model of Cellular States, Plasticity, and Genetics for Glioblastoma. (2019)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31327527/"
  }
],
"asOf": "2026-11-10"
}),
  t({ id: "tumour-evolution", name: "Tumour evolution (somatic evolution)", category: BIO, aka: ["tumour evolution", "tumor evolution", "somatic evolution", "somatic evolution in cancer", "evolution of the tumour"],
    wikipedia: W("Somatic_evolution_in_cancer"), cansim: "/terms/tumour-evolution",
    tldr: "A tumour changes over time as its cells acquire mutations and the fittest clones take over, which is why cancers relapse and resist treatment.",
    summary: "Somatic evolution, as Wikipedia summarises it, is the accumulation of mutations and epimutations in body cells over a lifetime and the effect of those changes on the cells' fitness; Vogelstein's colon cancer studies first showed it and the framework now explains progression, metastasis and resistance. Tracking clones through time from serial biopsies or blood is one of the mechanisms cancer models aim to learn.",
    pathways: ["clonal-evolution"], technologies: ["clonal-evolution-tracking"], terms: ["clonal-evolution-theory", "intra-tumour-heterogeneity"] }),
  t({ id: "censoring-and-events", name: "Censoring and events in survival data", category: END, aka: ["right-censored", "censored patients", "censored observations", "event count", "number of events", "events observed"],
    wikipedia: W("Censoring_(statistics)"), cansim: "/terms/censoring-events",
    tldr: "A patient is censored when the study ends or they leave before the event (death or progression) happens, so we only know they survived at least that long.",
    summary: "Censoring, in Wikipedia's definition, is when the value of an observation is only partly known; in survival analysis a right-censored patient has not had the event by the last follow-up. Survival methods (Kaplan-Meier, Cox regression, the concordance index) use censored patients up to their last known time. The number of events, not the number of patients, sets the statistical power of a survival model, which is why a cohort of two thousand with a hundred deaths is a small study.",
    terms: ["kaplan-meier-curve", "hazard-ratio", "concordance-index"] }),
  t({ id: "prognosis-risk-percentile", name: "Risk score and risk percentile", category: END, aka: ["risk percentile", "risk score", "prognostic score", "predicted risk", "risk group", "risk stratification"],
    wikipedia: W("Prognosis"), cansim: "/terms/prognosis-risk-percentile",
    tldr: "A risk score is a model's estimate of how likely a bad outcome is; a risk percentile says where that estimate sits compared with a reference group of patients.",
    summary: "Prognosis is a medical prediction of the likely course of a disease (Wikipedia). Prediction models turn many variables into a single score, often reported as a percentile against a reference cohort (a patient in the 90th percentile is predicted to do worse than nine in ten comparable patients) or cut into low, intermediate and high risk groups. A percentile ranks; it says nothing about absolute risk unless the model is calibrated.",
    terms: ["prognosis", "calibration", "concordance-index"] }),
  t({ id: "clinical-covariates", name: "Clinical covariates (age, stage, nodes, treatment flags)", category: CLIN, aka: ["clinical covariates", "clinical variables", "treatment flags", "radiotherapy flag", "chemotherapy flag", "clinical baseline model"],
    wikipedia: W("Proportional_hazards_model"), cansim: "/terms/clinical-variables",
    tldr: "Clinical covariates are the ordinary facts about a patient, such as age, stage, node count and whether they had chemotherapy or radiotherapy, that any prognostic model must beat or build on.",
    summary: "Survival models relate time to event to one or more covariates (Wikipedia on proportional hazards models). In cancer the routine ones are age, sex, stage, grade, nodal status, receptor status and treatment indicators for surgery, radiotherapy, chemotherapy and endocrine therapy. A molecular or imaging model is only useful if it adds discrimination over a clinical baseline built from these, and treatment flags are confounders as well as predictors because sicker patients are treated differently.",
    terms: ["grade-vs-stage", "lymph-node-status", "external-validation"] }),
  t({ id: "endocrine-therapy-resistance", name: "Endocrine therapy and endocrine resistance", category: TX, aka: ["endocrine resistance", "endocrine-resistant", "hormone therapy resistance", "anti-oestrogen resistance", "ESR1 mutation resistance"],
    wikipedia: W("Hormonal_therapy_(oncology)"), cansim: "/terms/endocrine-therapy-resistance",
    tldr: "Endocrine therapy blocks the hormones that feed some breast and prostate cancers; endocrine resistance is when the cancer learns to grow without them.",
    summary: "Hormonal therapy in oncology manipulates the endocrine system with drugs that block hormone production or hormone receptors and is one of the main modalities of medical oncology alongside chemotherapy and targeted therapy (Wikipedia). In oestrogen receptor-positive breast cancer, resistance arises through ESR1 ligand-binding-domain mutations, loss of receptor expression and growth-factor pathway activation, which is why oral SERDs and CDK4/6 inhibitors are combined with or follow aromatase inhibitors.",
    terms: ["hormone-therapy", "aromatase-inhibitor", "hormone-receptor-status"], targets: ["estrogen-receptor"] }),
  t({ id: "immunotherapy-response", name: "Immunotherapy response and its prediction", category: BM, aka: ["immunotherapy response", "response to immunotherapy", "checkpoint inhibitor response", "immunotherapy responder", "IO response prediction"],
    wikipedia: W("Cancer_immunotherapy"), cansim: "/terms/immunotherapy-response",
    tldr: "Immunotherapy response means whether a patient's cancer shrinks or stays controlled when the immune system is unleashed; predicting who will respond is one of the hardest open problems in cancer AI.",
    summary: "Cancer immunotherapy stimulates the immune system to treat cancer (Wikipedia). Only a minority of patients respond to checkpoint inhibitors, and the approved predictors (PD-L1 staining, mismatch repair deficiency, tumour mutational burden) are imperfect, so pathology and multimodal foundation models are trained to predict benefit from slides, sequencing and clinical data; MUSK reported such a task. Response is defined by imaging criteria at set time points, which makes the label noisy.",
    technologies: ["checkpoint-inhibitor", "musk"], terms: ["tmb", "biomarker"], related: ["pdl1"] }),
  t({ id: "tertiary-lymphoid-structures", name: "Tertiary lymphoid structures (TLS)", category: "Immunology", aka: ["tertiary lymphoid structures", "tertiary lymphoid structure", "TLS"],
    links: [
  {
    "label": "Sautès-Fridman et al., Tertiary lymphoid structures in the era of cancer immunotherapy (Nature Reviews Cancer 2019)",
    "url": "https://doi.org/10.1038/s41568-019-0144-6"
  },
  {
    "label": "Mature tertiary lymphoid structures predict immune checkpoint inhibitor efficacy in solid tumors independently of PD-L1 expression.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/35118423/"
  },
  {
    "label": "Tertiary lymphoid structures improve immunotherapy and survival in melanoma.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31942071/"
  },
  {
    "label": "CD4⁺ follicular helper T cell infiltration predicts breast cancer survival.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23778140/"
  },
  {
    "label": "Sautes-Fridman et al. 2019 review: Tertiary lymphoid structures in the era of cancer immunotherapy.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31092904/"
  }
], cansim: "/terms/tertiary-lymphoid-structures",
    tldr: "Organised immune-cell clusters can form within or beside tumours. Their architecture and association with treatment outcomes depend on the study and assay.",
    summary: "Sautès-Fridman and colleagues review tertiary lymphoid structures as organised aggregates of B cells, T cells and dendritic cells that develop in chronically inflamed tissues including tumours, where they are generally associated with longer survival and response to checkpoint inhibitors. Because they are visible on H&E and spatial assays, they are a known-biology probe: a slide or spatial model that recovers TLS is learning something real. No medicine in OnCo is designed to build them. Two linked trials use them directly: a phase 3 trial in triple-negative breast cancer enrols only patients whose residual tumour contains them, and a pancreatic cancer vaccine trial counts how many patients form them as a primary outcome. In the retrospective immune checkpoint cohorts of Vanhersecke et al. (Nature Cancer 2021, PMID 35118423) a structure was called mature when at least one CD23-positive cell with dendritic morphology was found within it, and mature structures were associated with better response rate, progression-free survival and overall survival independently of PD-L1 status and CD8 density; a CD23-positive cell elsewhere in tissue does not establish that architecture. Any TLS were seen in 105 of 328 discovery-cohort cases (32 per cent), 84 of them mature. That is an association in treated cohorts, so it does not by itself show extra benefit from the treatment, and no universal abundance or maturity rule selects a therapy. Aggregate, B-cell follicle and germinal centre are different architectural levels, and an RNA signature alone cannot show a germinal centre. Report density with its area and the criteria used (structures per mm2; two organised structures in 4 mm2 is 0.5 per mm2), because thresholds are method- and study-specific, and small sections or disrupted architecture limit the reading.\n\nTertiary names where these structures form: ectopic lymphoid organisation in non-lymphoid tissue, including inflamed tissues and tumours. It does not name a cancer stage or establish a particular maturation level.\n\nIn untreated invasive breast-tumour specimens, Gu-Trantien and colleagues linked CXCL13-producing follicular helper T cells in TLS germinal centres and an eight-gene signature to group outcomes, including survival or preoperative chemotherapy response. In metastatic melanoma samples, Cabrita and colleagues associated co-occurring CD8-positive T cells and CD20-positive B cells with survival, and a derived TLS signature predicted outcomes in checkpoint-blockade cohorts. Each result retains its specimens, methods and setting; these associations do not establish that inducing a TLS will benefit a particular patient.",
    terms: ["immunotherapy-response", "microenvironment-inflammation-theory"], technologies: ["spatial-transcriptomics"], trials: ["nct06313463", "nct06782932"] ,
"asOf": "2026-11-09",
"related": [
  "cancer-ai-vocabulary",
  "b-cells-and-plasma-cells"
]
}),
  t({ id: "pharmacogenomics-term", name: "Pharmacogenomics", category: GEN, aka: ["pharmacogenomics", "pharmacogenomic", "pharmacogenetics", "PGx"],
    wikipedia: W("Pharmacogenomics"), cansim: "/terms/pharmacogenomics",
    tldr: "Pharmacogenomics studies how a person's genes, and a tumour's genes, change the way drugs work or cause harm.",
    summary: "Pharmacogenomics, abbreviated PGx, is the study of the role of the genome in drug response, combining pharmacology and genomics to ask how a patient's genetic makeup affects their reaction to drugs (Wikipedia). In oncology it covers both inherited variants that govern toxicity (DPYD and fluoropyrimidines, TPMT and thiopurines) and the tumour's somatic alterations that predict sensitivity, the basis of cell-line drug-response prediction.",
    technologies: ["oncology-pharmacogenomics"], terms: ["drug-response-sensitivity", "cancer-drivers-vs-actionable"] }),
  t({ id: "drug-response-sensitivity", name: "Drug response and drug sensitivity (IC50, AUC)", category: BM, aka: ["drug sensitivity", "drug response prediction", "cell-line drug sensitivity", "IC50", "half maximal inhibitory concentration", "dose-response AUC", "area under the dose-response curve", "GI50", "AAC"],
    wikipedia: W("IC50"), links: [{ label: "Yang et al., GDSC: a resource for therapeutic biomarker discovery in cancer cells (Nucleic Acids Research 2013)", url: DOI("10.1093/nar/gks1111") }], cansim: "/terms/drug-response",
    tldr: "Drug sensitivity is how strongly a tumour or cell line is held back by a compound; it is summarised by the concentration that halves growth (IC50) or by the area under the whole dose-response curve.",
    summary: "The half maximal inhibitory concentration, IC50, measures the potency of a substance in inhibiting a biological function, the amount needed to inhibit a process by half in vitro (Wikipedia). Cell-line screens such as GDSC and CTRP report IC50, GI50 and the area under (or above) the dose-response curve for hundreds of drugs across hundreds of lines. The readouts are not interchangeable: different viability assays (CellTiter-Glo versus Syto60) and different summary statistics are a known source of disagreement between datasets.",
    terms: ["pharmacogenomics-term", "cell-lines-as-proxy"], related: ["depmap"] }),
  t({ id: "cell-lines-as-proxy", name: "Cell lines as a proxy for patients", category: BIO, aka: ["cell lines as a patient proxy", "cancer cell lines", "immortalised cell line", "immortalized cell line", "cell line model"],
    wikipedia: W("Immortalised_cell_line"), links: [{"label":"Barretina et al., The Cancer Cell Line Encyclopedia (Nature 2012)","url":"https://doi.org/10.1038/nature11003"},{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Immortalised_cell_line"},{"label":"Functional model interpretation: primary evidence","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC6522222/"},{"label":"Cell-line definition and culture checks","url":"https://onco.cc/terms/cell-line/"}], cansim: "/terms/cell-lines-as-patient-proxy",
    tldr: "Cancer cell lines support controlled laboratory experiments, while prediction for a patient requires separate evidence.",
    summary: "Cancer cell lines are selected populations maintained in culture. Versions of the same named line can differ genetically and in drug response. The culture does not reproduce the whole tumour, host drug handling or complete immune environment. Transfer to patients therefore depends on the intended intervention, endpoint, population and validation evidence, rather than the line name alone.",
    terms: ["drug-response-sensitivity", "domain-adaptation"], related: ["depmap"] , notes: [
  "A result can be repeatable in one cultured population without predicting a patient outcome. The cell-line definition holds the culture, authentication and assay-reporting details; the question here is transportability. Specify which model feature, intervention and endpoint are expected to transfer to which clinical population, then test that bridge independently. Neither many wells nor a familiar line name establishes that bridge. Source: https://pmc.ncbi.nlm.nih.gov/articles/PMC6522222/"
],
"asOf": "2026-11-10"
}),
  t({ id: "co-amplification", name: "Co-amplification and the 17q12 HER2 amplicon", category: GEN, aka: ["co-amplification", "co-amplified", "coamplification", "17q12 amplicon", "HER2 amplicon", "ERBB2 amplicon", "oncogene amplicon"],
    wikipedia: W("Gene_amplification"), links: [{ label: "Wikipedia: chromosome 17", url: W("Chromosome_17") }], cansim: "/terms/17q12-her2-amplicon",
    tldr: "When a cancer copies the HER2 gene many times over, its neighbours on chromosome 17 are copied with it; those co-amplified genes are passengers, not the driver.",
    summary: "Gene amplification is any process that increases the number of copies of a gene without a proportional increase in other genes (Wikipedia). Amplification works on a stretch of chromosome, so the HER2 (ERBB2) amplicon at 17q12 in breast and gastric cancer usually carries GRB7, STARD3, PGAP3, MIEN1 and PNMT along with it. Their expression rises with ERBB2 and they turn up in expression signatures of HER2-enriched tumours, which a model can mistake for independent biology.",
    targets: ["her2", "grb7", "stard3", "pgap3", "mien1", "pnmt"], terms: ["copy-number-variation-term"], cancers: ["breast-cancer", "gastric"] }),
  t({ id: "copy-number-variation-term", name: "Copy number alteration (CNA)", category: GEN, aka: ["copy number alteration", "copy-number alteration", "copy number alterations", "somatic copy number alteration", "SCNA", "CNA", "copy number variation", "copy-number variation", "CNV"],
    wikipedia: W("Copy_number_variation"), links: [{ label: "Mermel et al., GISTIC2.0 (Genome Biology 2011)", url: DOI("10.1186/gb-2011-12-4-r41") }], cansim: "/terms/copy-number-alteration",
    tldr: "A copy number alteration is a stretch of DNA that a tumour has gained extra copies of or lost, from a single gene to a whole chromosome arm.",
    summary: "Copy number variation is a form of structural variation in which sections of the genome are duplicated or deleted (Wikipedia); in tumours the acquired form is called a somatic copy number alteration. Arm-level and focal events are called from arrays or sequencing, and GISTIC2.0 is the standard method for finding regions amplified or deleted more often than chance across a cohort. CNA is one of TCGA's core data types and a modality in most multi-omic models.",
    terms: ["co-amplification", "gistic"], technologies: ["wes-wgs"] }),
  t({ id: "cancer-drivers-vs-actionable", name: "Actionable genomic biomarkers", category: BM, aka: ["actionable genomic biomarkers", "actionable alteration", "actionable alterations", "actionable mutation", "actionable mutations", "actionable biomarker", "clinically actionable"],
    wikipedia: W("Personalized_medicine"), cansim: "/terms/actionable-genomic-biomarkers",
    tldr: "An actionable alteration is a change in a tumour's DNA that maps directly to an approved or investigational drug, so finding it changes what the patient is offered.",
    summary: "Precision or personalised medicine tailors decisions to the patient's predicted response based on molecular features (Wikipedia). In oncology a genomic alteration is called actionable when an approved drug, a guideline recommendation or an open trial is tied to it; OncoKB and CIViC grade the evidence in tiers. Actionability is narrower than being a driver: many drivers have no drug, and some drug targets (HER2 amplification) are actionable regardless of driver status.",
    terms: ["driver-mutation", "biomarker"], related: ["oncokb", "civic"], technologies: ["cgp"] }),
  t({ id: "mrna-protein-concordance", targets: ["e2f7", "dclk1", "dnajc12"], name: "mRNA to protein concordance", category: BIO, aka: ["mRNA-protein concordance", "mRNA protein concordance", "transcript-protein correlation", "mRNA-protein correlation", "proteogenomic concordance"],
    wikipedia: W("Proteogenomics"), cansim: "/terms/mrna-protein-concordance",
    tldr: "mRNA to protein concordance is how well the amount of a gene's messenger RNA tracks the amount of the protein it codes for; for many genes it tracks poorly.",
    summary: "Proteogenomics combines proteomics, genomics and transcriptomics (Wikipedia); CPTAC applied it to TCGA-linked tumours and measured, gene by gene, how well transcript levels predict protein levels. Correlations are strong for some genes and near zero or negative for others because of post-transcriptional and post-translational regulation and protein complex stoichiometry, so an expression model is not a protein model, and phosphorylation-driven pathway activity is invisible to RNA.",
    terms: ["post-transcriptional-regulation-term", "pathway-activation-state"], related: ["cptac"], technologies: ["proteomics"] }),
  t({ id: "post-transcriptional-regulation-term", name: "Post-transcriptional and post-translational regulation", category: "Biology basics", aka: ["post-transcriptional regulation", "post-translational regulation", "post-translational modification", "post-translational modifications", "PTMs"],
    wikipedia: W("Post-transcriptional_regulation"), cansim: "/terms/post-transcriptional-regulation",
    tldr: "Cells control genes after the messenger RNA is made, by editing, transporting and degrading it and by modifying the finished protein, which is why RNA levels and protein activity can disagree.",
    summary: "Post-transcriptional regulation is control of gene expression at the RNA level, through capping, splicing, polyadenylation, localisation, stability and translation (Wikipedia). Post-translational modification then alters the protein itself by phosphorylation, ubiquitination, glycosylation and cleavage. Together they decouple protein abundance and activity from mRNA, the reason phosphoproteomics and reverse-phase protein arrays exist alongside RNA sequencing.",
    terms: ["mrna-protein-concordance", "pathway-activation-state"] }),
  t({
    asOf:"2026-11-08", notes:["Pair pathway readouts with appropriate controlled perturbations and functional measurements when testing dependence. A changed phosphosite or expression signature does not by itself establish growth inhibition, drug sensitivity or clinical benefit."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Phosphoproteomics"},{"label":"Dephosphorylation or antibody binding to the carboxy terminus stimulates pp60c-src.","url":"https://pubmed.ncbi.nlm.nih.gov/2432403/"},{"label":"Ischemia in tumors induces early and sustained phosphorylation changes in stress kinase pathways but does not affect global protein levels.","url":"https://pubmed.ncbi.nlm.nih.gov/24719451/"},{"label":"Growth factor-induced MAPK network topology shapes Erk response determining PC-12 cell fate.","url":"https://pubmed.ncbi.nlm.nih.gov/17310240/"}], related:["cancer-ai-vocabulary","phosphorylation","feedback-and-feedforward","signalling-pathway"], id: "pathway-activation-state", targets: ["spry4", "phlda1"], name: "Pathway activation state (phosphosignalling)", category: BIO, aka: ["pathway activation state", "pathway activation", "phosphosignalling", "signalling activity", "phosphorylation state"],
    wikipedia: W("Phosphoproteomics"), cansim: "/terms/pathway-activation-state",
    tldr: "Pathway activity is a question about a specified biological response. Protein amount, individual phosphorylation sites and downstream RNA patterns provide different evidence.",
    summary: "Phosphoproteomics and other protein assays can examine specified signaling modifications, with site-specific and context-specific meaning. A site can activate, inhibit, recruit a partner or have an unresolved role. Relative phosphosite intensity also depends on parent-protein amount and sample handling; it is not automatically absolute occupancy. Transcript signatures provide another, often indirect, view. Define the proposed pathway output, timing and cell population instead of equating one marker with the whole circuit.",
    pathways: ["pi3k-akt-mtor", "ras-mapk"], technologies: ["proteomics"], terms: ["rppa", "mrna-protein-concordance"] }),
  t({ id: "gene-co-expression", name: "Gene co-expression structure", category: GEN, aka: ["gene co-expression", "co-expression structure", "co-expression network", "coexpression network", "co-expression module", "gene module"],
    wikipedia: W("Gene_co-expression_network"), cansim: "/terms/gene-co-expression-structure",
    tldr: "Genes that rise and fall together across samples form co-expression modules; this correlation structure is what expression models mostly learn.",
    summary: "A gene co-expression network is a graph in which genes are nodes and an edge joins two genes whose expression is significantly correlated across samples (Wikipedia). Modules in such networks correspond to cell types, proliferation, immune infiltration and tissue of origin, so a masked-gene model that reconstructs hidden genes from visible ones is learning this structure. It also explains why a few hundred well chosen genes carry most of the information in twenty thousand.",
    terms: ["organ-of-origin-signal", "masked-modelling"] }),
  t({ id: "organ-of-origin-signal", name: "Tissue-of-origin signal in tumour data", category: BIO, aka: ["organ-of-origin signal", "tissue-of-origin signal", "tissue of origin", "organ of origin", "cell-of-origin signal", "tissue-only floor", "type-only floor"],
    wikipedia: W("Cancer_of_unknown_primary_origin"), links: [{ label: "Hoadley et al., Cell-of-Origin Patterns Dominate the Molecular Classification of 10,000 Tumors from 33 Types of Cancer (Cell 2018)", url: DOI("10.1016/j.cell.2018.03.022") }], cansim: "/terms/organ-of-origin-signal",
    tldr: "A tumour's molecular profile is dominated by the organ it came from, so a model can look impressive by recognising the organ and must be judged against a baseline that knows only that.",
    summary: "The TCGA Pan-Cancer Atlas classification paper found that cell of origin dominates the molecular clustering of ten thousand tumours across thirty-three types. Expression, methylation and even mutation patterns encode the tissue so strongly that a pan-cancer survival or drug-response model gets much of its apparent accuracy from the tissue label; the honest comparison is a tissue-only or cancer-type-only baseline, and within-type (stratified) metrics. The same signal is what classifiers exploit to assign a primary site to cancers of unknown primary (Wikipedia).",
    terms: ["concordance-index", "clinical-covariates", "gene-co-expression"], cancers: ["cancer-of-unknown-primary"] }),
  t({ id: "spatial-autocorrelation", name: "Spatial autocorrelation (Moran's I)", category: PATH, aka: ["spatial autocorrelation", "Moran's I", "Morans I", "spatially autocorrelated", "spatial domain", "spatial domains"],
    wikipedia: W("Moran's_I"), cansim: "/terms/spatial-autocorrelation",
    tldr: "Spatial autocorrelation means that nearby spots in a tissue section tend to have similar values; Moran's I is the standard number for how strong that tendency is.",
    summary: "Moran's I is a measure of spatial autocorrelation, the correlation of a signal among nearby locations in space, developed by P. A. P. Moran (Wikipedia). Values near +1 mean neighbouring spots agree, near 0 no spatial pattern, and a permutation test gives the p-value. In spatial transcriptomics it is used to show that predicted risk, subtype or expression forms coherent domains rather than noise, and methods such as SpaGCN build the neighbourhood structure into clustering.",
    technologies: ["spatial-transcriptomics"], terms: ["permutation-test", "spagcn"] }),
  t({ id: "variant-effect-prediction", name: "Variant effect prediction", category: GEN, aka: ["variant effect prediction", "variant effect predictor", "predicted pathogenicity", "in silico pathogenicity prediction", "missense effect prediction"],
    wikipedia: W("Variant_calling"), links: [
  {
    "label": "HGVS nomenclature",
    "url": "https://hgvs-nomenclature.org/stable/"
  },
  {
    "label": "Ensembl: calculated variant consequences (release 116 documentation)",
    "url": "https://www.ensembl.org/info/genome/variation/prediction/predicted_data.html"
  },
  {
    "label": "Li et al., Standards and Guidelines for the Interpretation and Reporting of Sequence Variants in Cancer (Journal of Molecular Diagnostics 2017)",
    "url": "https://doi.org/10.1016/j.jmoldx.2016.10.002"
  },
  {
    "label": "Pejaver et al., Calibration of computational tools for missense variant pathogenicity classification and ClinGen recommendations for PP3/BP4 criteria (American Journal of Human Genetics 2022)",
    "url": "https://doi.org/10.1016/j.ajhg.2022.10.013"
  },
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Variant_calling"
  }
], cansim: "/terms/variant-effect-prediction",
    tldr: "A variant-effect prediction estimates a defined consequence of a DNA change for a specified transcript or task. It does not by itself establish disease causation or treatment benefit.",
    summary: "Variant-effect prediction estimates a specified consequence of a sequence change, whereas variant calling identifies changes from sequence data. Ensembl maps each allele of a variant onto every overlapping transcript with a rule-based approach, so the same genomic change can have a different consequence in different transcripts, and its impact categories (high, moderate, low, modifier) are qualitative assumptions about likely effect, not a measured loss of function (Ensembl documentation, release 116). A score from a missense tool does not answer a splice or regulatory question, and a prediction should name the reference genome, the alleles and the transcript (with its version) it was made for. A raw model score is not automatically a probability: a splice score of 0.92 on an unspecified scale does not mean a 92 per cent chance of lost function, because thresholds and evidence strengths belong to a particular tool and task. The absence of a prediction does not make a variant benign, because a tool may not cover that variant type or transcript. RNA junction evidence, functional experiments and clinical studies address different gaps, and none is interchangeable with a sequence score. Two reports of the same prediction from the same software version are two copies of one computed result, not two independent experiments. Where a tool's training data overlap the variants used to evaluate it, its performance can be overestimated, which is why the ClinGen calibration of thirteen missense tools to ACMG/AMP pathogenicity and benignity evidence strengths, estimated from local positive predictive value, used datasets assembled to minimise that circularity (Pejaver and colleagues, 2022). That calibration used ClinVar missense variants classified as pathogenic or benign and rare in gnomAD, within the ACMG/AMP recommendations for variants in genes associated with monogenic disease, and it selected no tool designed for splice variants. Its introduction notes that many methods overlap and so do not offer independent assessment of pathogenicity, which is why agreement between tools that share training data or inputs is not independent confirmation. The AMP, ASCO and CAP guideline for somatic variants notes that early prediction algorithms were developed and validated for germline variants and recommends that their results never be used as the sole evidence for variant classification or clinical decision making (Li and colleagues, 2017).",
    terms: [
  "variant-calling",
  "hgvs",
  "data-leakage",
  "external-validation"
], technologies: [
  "evo2",
  "nucleotide-transformer",
  "alphamissense"
], related: ["clinvar"] ,
"asOf": "2026-11-10",
"provenance": {
  "editedBy": "OnCo systematic education audit, round 3 (spatial and computational content): Crossref and Europe PMC identity checks, abstracts, selected full texts and the Ensembl documentation read",
  "editedOn": "2026-11-09",
  "note": "Added from the Ensembl release 116 consequence documentation, Li 2017 (PMID 27993330, PMC HTML read for the in silico prediction section), and Pejaver 2022 (PMID 36413997, full text PMC9748256 read for the circularity discussion and for the absence of any somatic or drug-response analysis). The earlier CanSim terms-map text is unchanged: CanSim terms map 1.0.0 (docs/onco/terms.json, generated 2026-09-24), CC BY 4.0, attribution: CanSim project."
},
"notes": [
  "Model card for a variant-effect tool (a reading guide, not a score). Measures: a predicted consequence or effect for a stated sequence change and task. How: confirm the input change, choose the reference and model, calculate the output, then interpret it against calibration that suits the task. Input and tissue cost: existing sequence data and reference metadata; the computation uses no tissue, although producing the sequence input may have consumed a specimen. Output and units: consequence terms or model-specific scores, with tool version and transcript. Thresholds: tool-, task- and validation-specific, with no universal damaging cutoff. Failure modes: wrong transcript, unsupported variant type, biased evaluation or incompatible inputs. Cannot establish alone: measured protein function, a complete tumour mechanism or benefit from a drug. Validation tier: a software output has no automatic clinical status; the laboratory's validated intended use is a separate question.",
  "Figure reading (fictional layouts, no real coordinates): one genomic change, labelled P (C to T), falls inside an exon of transcript T1 and inside an intron of transcript T2 because the two transcripts have different exon boundaries. Three separate questions follow: annotation asks where P sits, a splice model asks whether exon joining could change, and an RNA assay tests the proposed joins. A score needs its model's task and scale, and a predicted effect does not establish benefit."
]
}),

  // ---- Assays and data modalities ----
  t({ id: "bulk-rna-seq", name: "Bulk RNA sequencing (RNA-seq) and the full transcriptome", category: GEN, aka: ["bulk RNA-seq", "bulk RNA sequencing", "bulk transcriptome", "bulk expression", "full transcriptome", "whole transcriptome", "transcriptome-wide expression", "~20k genes"],
    wikipedia: W("RNA-Seq"), links: [
  {
    "label": "Wikipedia: transcriptome",
    "url": "https://en.wikipedia.org/wiki/Transcriptome"
  },
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/RNA-Seq"
  },
  {
    "label": "A comprehensive assessment of RNA-seq accuracy, reproducibility and information content by the Sequencing Quality Control Consortium.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25150838/"
  },
  {
    "label": "A survey of best practices for RNA-seq data analysis.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/26813401/"
  }
], cansim: "/terms/bulk-rna-seq",
    tldr: "Bulk RNA sequencing measures captured messages pooled across a tissue sample, including contributions from multiple cell types.",
    summary: "RNA carries cellular messages; bulk sequencing samples those messages from combined tissue after protocol-specific capture and preparation. Analysis assigns usable observations to genes or transcripts and applies a defined comparison scale. A change can reflect cell composition, expression within cells or both. Gene totals can conceal transcript differences, and pooled RNA does not directly establish protein localisation, pathway flux or drug dependence.",
    technologies: ["rna-seq"], terms: ["tpm-fpkm-counts", "star-salmon", "single-cell-rna-seq", "tumour-purity"] ,
"notes": [
  "Bulk RNA sequencing measures captured messages pooled across a specimen. Cancer, immune and supporting cells can contribute different amounts of RNA; a higher signal can reflect a changed mixture, changed expression within cells, or both. Zero detected reads does not establish biological absence. Source: Conesa et al., 2016 methods review, https://doi.org/10.1186/s13059-016-0881-8.",
  "Name the counting unit and normalisation denominator. Estimated transcript counts, length-adjusted transcripts per million and tagged molecule counts answer different measurement questions. A gene total can conceal splice products; pooled RNA does not directly measure surface protein, pathway flux or drug dependence. Sources: https://salmon.readthedocs.io/en/latest/file_formats.html and https://doi.org/10.1186/s13059-016-0881-8.",
  "Fictional mixture exercise: in two 100-cell samples, increasing identical marker-producing lymphocytes from 20 to 40 doubles their stipulated marker molecules if each contributes one and other cells contribute none. This does not show cancer-cell activation. Equal RNA contribution and matched recovery are assumptions, not measured tissue properties.",
  "Bulk RNA-seq extracts RNA, prepares a library (often cDNA), may select mRNA or deplete rRNA or capture regions; bulk does not mean equal capture of all molecules.",
  "Reads or fragments are assigned to genes or transcripts; shared sequences make assignment ambiguous; a count table is already shaped by preparation and analysis.",
  "A bulk signal can rise because more cells of a type contribute, expression within them rises, or both; deconvolution estimates contributions under a model and does not separate cells.",
  "Gene-level counts can hide isoform differences; a mutant or splice product needs sequence or junction evidence.",
  "Bulk RNA can nominate expressed targets and summarise programmes but does not establish cell origin, surface protein, pathway flux or drug dependence; zero reads is not absence; thousands of genes from one biopsy are not thousands of patients.",
  "Fictional teaching exercise: With equal RNA per cell, a lymphocyte-only marker and 100-cell pieces, raising lymphocytes from 20 to 40 doubles the pooled marker (20 to 40 stipulated molecules) without changing any cancer cell.",
  "Record sampled region and RNA integrity; research profiling differs from a validated clinical RNA test.",
  "Record protocol-compatible preservation, sampled region, RNA integrity and material consumed by extraction. Track capture, sequence assignment, read/fragment units, normalisation and transcript calls. Preparation time varies; reference material, process controls and biological replicates test different uncertainties. Degradation, contamination, ambiguous annotation, batch and mixture shifts constrain purpose-specific cutoffs and clinical intended-use validation."
],
"asOf": "2026-11-10",
"related": [
  "cancer-ai-vocabulary",
  "gene-expression-signatures",
  "immune-deconvolution",
  "rna-pathway-scoring"
]
}),
  t({ id: "tpm-fpkm-counts", name: "TPM, FPKM and raw counts (expression units)", category: GEN, aka: ["TPM", "transcripts per million", "FPKM", "RPKM", "log2 TPM", "log2(TPM+1)", "raw counts", "read counts", "expression units"],
    wikipedia: W("RNA-Seq"), links: [{ label: "Salmon: fast and bias-aware quantification of transcript expression (Nature Methods 2017)", url: DOI("10.1038/nmeth.4197") }], cansim: "/terms/tpm-fpkm-counts",
    tldr: "RNA count units depend on what was counted, the normalisation denominator and any transcript-length adjustment.",
    summary: "Raw RNA tables can contain assigned reads, fragments or model-estimated counts. Counts per million divide by a named library denominator. Transcripts per million first adjust for transcript length and scale the adjusted values to a total of one million; effective length depends on the quantifier. FPKM uses a different denominator and does not in general sum to a fixed total. UMI molecule counting and three-prime tag workflows need their own rules. Composition scaling, batch handling and statistical comparison remain separate questions; no single transformed unit is the universal model input.",
    terms: ["bulk-rna-seq", "batch-effects", "quantile-normalisation"] ,
"asOf": "2026-11-10",
"notes": [
  "Start from the counting unit (reads, fragments, estimated counts); a UMI is a tag added before amplification that reduces duplicate counting; it is a counting aid, not normalisation, and uncaptured molecules remain unobserved.",
  "CPM divides a feature count by a stated library denominator and multiplies by one million; always state which denominator.",
  "TPM first adjusts for transcript length then scales to one million across included transcripts; effective length suits some models and is not a drop-in rule for 3-prime tag or UMI workflows.",
  "Between-sample methods address composition: abundant messages take library share; TMM and DESeq2 size factors estimate scaling under assumptions and do more than divide by totals; broad shifts challenge them.",
  "Fictional teaching exercise: Two transcripts with 100 fragments each and lengths 1 and 2 kb: CPM 500,000 each; rates 100 and 50 sum 150; TPM about 666,667 and 333,333.",
  "Normalisation does not repair batch effects or recover absolute molecules, cell origin, protein activity or benefit; a normalised difference still needs design and a model.",
  "Rescaling an existing feature table needs its counting unit, annotation, library metadata, denominator and any length rule; adding molecular tags requires library preparation. Report CPM, TPM or the chosen model input explicitly. Runtime, controls, replicates and composition checks vary. Wrong units, tag errors, broad shifts and incompatible annotations undermine filters/comparisons; normalisation alone does not validate a clinical test."
]
}),
  t({ id: "star-salmon", wikipediaChecked: "2026-09-25", name: "STAR and Salmon (RNA-seq alignment and quantification)", category: GEN, aka: ["STAR aligner", "STAR RNA-seq aligner", "Salmon quantification", "Salmon quantifier", "pseudoalignment"],
    links: [{ label: "STAR on GitHub (alexdobin/STAR)", url: "https://github.com/alexdobin/STAR" }, { label: "Dobin et al., STAR: ultrafast universal RNA-seq aligner (Bioinformatics 2013)", url: DOI("10.1093/bioinformatics/bts635") }, { label: "Salmon documentation", url: "https://salmon.readthedocs.io/en/latest/" }, { label: "Patro et al., Salmon (Nature Methods 2017)", url: DOI("10.1038/nmeth.4197") }], cansim: "/terms/star-salmon",
    tldr: "STAR lines sequencing reads up against the genome and Salmon estimates how much of each transcript is present; they are the two most common first steps of an RNA-seq pipeline.",
    summary: "STAR (Spliced Transcripts Alignment to a Reference) is the ultrafast universal RNA-seq aligner described by Dobin and colleagues and used by the GDC pipeline; Salmon, from Patro and colleagues, quantifies transcript expression quickly and with correction for sequence and GC bias, using a lightweight mapping rather than full alignment. Which tool, genome build and annotation were used are provenance fields a model's training data should record, because they change the numbers.",
    terms: ["bulk-rna-seq", "tpm-fpkm-counts", "genome-builds"], related: ["ngs-bioinformatics-software"] }),
  t({ id: "variant-calling", name: "Variant calling", category: GEN, aka: ["variant calling", "somatic variant calling", "variant caller", "variant callers", "SNV calling", "mutation calling"],
    wikipedia: W("SNV_calling_from_NGS_data"), links: [
  {
    "label": "Lawrence et al., Mutational heterogeneity in cancer and the search for new cancer-associated genes (MutSigCV, Nature 2013)",
    "url": "https://doi.org/10.1038/nature12213"
  },
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/SNV_calling_from_NGS_data"
  },
  {
    "label": "Sensitive detection of somatic point mutations in impure and heterogeneous cancer samples.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23396013/"
  },
  {
    "label": "Guidelines for Validation of Next-Generation Sequencing-Based Oncology Panels: A Joint Consensus Recommendation of the Association for Molecular Pathology and College of American Pathologists.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28341590/"
  }
], cansim: "/terms/variant-calling",
    tldr: "Variant calling evaluates sequence evidence and error models to identify candidate changes within a defined assay scope.",
    summary: "Variant calling assesses whether observed sequence or regional evidence supports a difference from a reference or comparison sample. Evidence quality, independent fragments, local depth, error models and the alteration class matter. Annotation describes possible consequence after calling; neither annotation nor a passed filter independently proves function or treatment relevance. Negative calls retain the workflow coverage and detection limits.",
    terms: ["germline-vs-somatic", "variant-effect-prediction", "mutsig"], technologies: ["wes-wgs", "ngs-bioinformatics-software"] ,
"notes": [
  "Base quality concerns confidence in a sequence letter; mapping quality concerns its proposed location. A clear letter can still map ambiguously. Depth depends on the chosen quality, duplicate and overlapping-pair filters, so retain these rules with support counts. Source: https://www.htslib.org/doc/samtools-depth.html, samtools 1.25 manual.",
  "Passing a computational filter does not establish biological function or treatment benefit. Agreement between callers using the same reads does not create independent molecular evidence; a shared mapping problem can remain. The exact regions, alteration classes and usable local evidence constrain a negative result.",
  "Variant calling evaluates sequence evidence and error models to identify candidate differences; methods are class-specific (substitutions, indels, copy changes, rearrangements) and a workflow calling one class may not call another.",
  "Evidence includes usable depth, base and mapping quality, strand and fragment distribution and comparison-sample support; somatic callers must handle low-frequency evidence in mixed samples.",
  "In VCF, PASS means the call passed the stated filters; a dot means filters have not been applied; counts and allele fractions need defined denominators.",
  "Annotation adds gene or predicted consequence and is separate from calling; machine learning is one method, not the definition.",
  "Two callers agreeing on shared reads can share misalignment error; confirmation needs an independent suitable method; a negative call set is bounded by detectable regions, classes and fractions.",
  "Fictional teaching exercise: A call that is PASS in two tools but supported only by reads aligning ambiguously to duplicated regions has not resolved location.",
  "Calling uses existing reads, a reference assembly and optional comparison files; a new confirmation assay can consume more material. Report coordinates, alleles, support, quality, filters and defined fractions/copy estimates. Retain caller version, detectable regions/classes and thresholds. Contamination, damage, misalignment and reference mismatch require specimen-specific end-to-end validation; filter thresholds are not treatment thresholds."
],
"asOf": "2026-11-10"
}),
  t({ id: "somatic-mutations-wxs-wgs", name: "Somatic mutations from exome and genome sequencing (WXS, WGS)", category: GEN, aka: ["WXS", "whole-exome sequencing data", "somatic mutation data", "mutation calls", "MAF file", "mutation annotation format"],
    wikipedia: W("Exome_sequencing"), links: [{ label: "Wikipedia: whole genome sequencing", url: W("Whole_genome_sequencing") }], cansim: "/terms/somatic-mutations",
    tldr: "Somatic mutations are the DNA changes a tumour acquired during life; they are read from exome (protein-coding) or whole-genome sequencing of tumour and matched normal tissue.",
    summary: "Exome sequencing selects and sequences the protein-coding regions of all genes, about one to two percent of the genome (Wikipedia), and whole genome sequencing determines the entire DNA sequence at once. TCGA relied mainly on exomes, so its mutation data (distributed as MAF files) covers coding changes; whole genomes add non-coding and structural variants. Mutation data is sparse (most genes unmutated in most tumours), which is why it adds little to expression in many prediction tasks.",
    technologies: ["wes-wgs"], terms: ["germline-vs-somatic", "variant-calling", "tmb"] }),
  t({ id: "targeted-panel-sequencing", name: "Targeted panel sequencing", category: DX, aka: ["targeted panel sequencing", "targeted-panel sequencing", "gene panel sequencing", "targeted gene panel", "clinical sequencing panel", "hundreds of genes panel"],
    wikipedia: W("Exome_sequencing"), links: [{ label: "AACR Project GENIE", url: "https://www.aacr.org/professionals/research/aacr-project-genie/" }], cansim: "/terms/targeted-panel-sequencing",
    tldr: "A targeted panel sequences only a chosen set of a few hundred cancer genes, deeply and cheaply, which is what most hospitals run on tumours today.",
    summary: "Exome sequencing works by selecting a subset of DNA before sequencing (Wikipedia); a targeted panel narrows the selection further to hundreds of clinically relevant genes, read at high depth from small samples. Panels such as MSK-IMPACT and FoundationOne underlie AACR Project GENIE, the largest clinico-genomic dataset, but panel coverage differs between institutions, so pooling requires restricting to shared genes and treating unsequenced genes as missing rather than wild type.",
    technologies: ["cgp"], related: ["genie"], terms: ["somatic-mutations-wxs-wgs", "cancer-drivers-vs-actionable"] }),
  t({ id: "gistic", wikipediaChecked: "2026-09-25", name: "GISTIC (copy number driver detection)", category: GEN, aka: ["GISTIC", "GISTIC2", "GISTIC2.0", "GISTIC peaks", "GISTIC score"],
    links: [{ label: "GISTIC2 documentation (Broad Institute)", url: "https://broadinstitute.github.io/gistic2/" }, { label: "Mermel et al., GISTIC2.0 (Genome Biology 2011)", url: DOI("10.1186/gb-2011-12-4-r41") }], cansim: "/terms/gistic",
    tldr: "GISTIC scans copy number data across many tumours to find the regions that are amplified or deleted far more often than chance, the likely targets of selection.",
    summary: "GISTIC2.0, from Mermel and colleagues at the Broad Institute, facilitates sensitive and confident localisation of the targets of focal somatic copy number alteration by scoring each genomic region on the frequency and amplitude of alteration across a cohort and assigning a false-discovery q-value; it distinguishes arm-level from focal events and reports peak regions. TCGA copy number papers report GISTIC peaks, and the gene-level thresholded calls (deep deletion, amplification) on cBioPortal come from it. The Broad distributes it under a research licence, so OnCo's open-source map lists it as skipped.",
    terms: ["copy-number-variation-term", "mutsig"], related: ["intogen"] }),
  t({ id: "mutsig", wikipediaChecked: "2026-09-25", name: "MutSig (significantly mutated gene detection)", category: GEN, aka: ["MutSig", "MutSigCV", "MutSig2CV", "significantly mutated genes", "SMG analysis"],
    links: [{ label: "Lawrence et al., Mutational heterogeneity in cancer and the search for new cancer-associated genes (Nature 2013)", url: DOI("10.1038/nature12213") }], cansim: "/terms/mutsig",
    tldr: "MutSig asks which genes are mutated more often than the background mutation rate would predict, separating likely drivers from long or late-replicating genes that collect passengers.",
    summary: "Lawrence and colleagues showed that mutation rates vary enormously between patients and across the genome (with expression level and replication timing) and that ignoring this heterogeneity produces spurious driver genes; MutSigCV corrects for it using patient-specific rates and gene covariates. It became the standard driver test in TCGA marker papers alongside GISTIC for copy number. Like GISTIC it is distributed under a Broad research licence rather than an open repository.",
    terms: ["driver-mutation", "variant-calling", "gistic"], related: ["intogen"] }),
  t({ id: "batch-effects", name: "Batch effects and harmonisation", category: GEN, aka: ["batch effects","batch effect","batch correction","platform effect","cross-platform harmonisation","harmonisation across platforms"],
    wikipedia: W("Batch_effect"), links: [
  {
    "label": "Johnson, Li and Rabinovic, Adjusting batch effects in microarray expression data using empirical Bayes methods (ComBat, Biostatistics 2007)",
    "url": "https://doi.org/10.1093/biostatistics/kxj037"
  },
  {
    "label": "sva Bioconductor package (ComBat)",
    "url": "https://bioconductor.org/packages/release/bioc/html/sva.html"
  },
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Batch_effect"
  },
  {
    "label": "Normalization of RNA-seq data using factor analysis of control genes or samples.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25150836/"
  },
  {
    "label": "Reproducibility of high-throughput mRNA and small RNA sequencing across laboratories.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/24037425/"
  }
], cansim: "/terms/batch-effects",
    tldr: "A batch effect is a systematic measurement difference associated with how samples were prepared, processed or analysed.",
    summary: "Technical conditions can shift molecular measurements and become confused with biological groups. Normalization and batch modelling address specified effects under assumptions; they cannot manufacture contrasts absent from the design. Biological changes in tissue mixture should not automatically be removed as technical variation. Controls, recorded metadata, distributed preparation and independent replication help evaluate the comparison.",
    terms: ["quantile-normalisation", "tpm-fpkm-counts", "microarray-expression", "data-leakage"] ,
"notes": [
  "Record preparation, laboratory, protocol and analysis conditions before comparing RNA profiles. The GEUVADIS study examined lymphoblastoid cell lines across laboratories; its reproducibility findings apply to that design and do not validate every tumour preparation. Source: https://doi.org/10.1038/nbt.2702.",
  "Fictional design exercise: if all baseline specimens use laboratory A and all follow-up specimens use laboratory B, the observed difference cannot separate laboratory from time. Correction cannot supply the missing crossed comparison. A changed tissue mixture can be real biology; a tidy corrected plot alone does not establish a treatment effect.",
  "A batch effect is a systematic measurement difference tied to preparation, processing or analysis conditions that can be mistaken for biology; a batch is a group sharing a technical condition.",
  "Normalisation adjusts defined aspects such as library size or composition and does not automatically remove gene-specific technical differences; models can include recorded batch variables; controls and repeat preparations help under assumptions.",
  "When every sample of one group is processed one way and every sample of another group another way the effects cannot be separately identified; an algorithm cannot supply the missing experiment.",
  "Cell mixture and treatment response can be real biology; erasing them as batch removes signal; a tidy corrected plot is not proof.",
  "Reprocessing one extract is a technical, not a biological, replicate.",
  "Multi-laboratory RNA-seq work shows why preparation conditions should be recorded.",
  "Assess technical variation using preparation metadata, appropriate controls, diagnostic plots and a defined design/model. Reanalysis uses no new tissue; new preparations use extract and resequencing can use an existing library. Acceptance criteria depend on the comparison. Missing metadata, complete confounding and removal of genuine biology can invalidate correction; check assumptions and reproducibility rather than a universal batch-size cutoff.",
  "Fictional design exercise: six baseline specimens in lab A and six follow-up specimens in lab B leave two group-laboratory cells unobserved. Allocating three to each of the four cells retains six per time point while adding the crossed contrasts. The design supports a stated model, with other biases and assumptions still requiring checks."
],
"asOf": "2026-11-10"
}),
  t({ id: "gsea", name: "Gene set enrichment analysis (GSEA and ssGSEA)", category: GEN, aka: ["gene set enrichment analysis", "gene set enrichment", "GSEA", "ssGSEA", "single-sample GSEA", "pathway enrichment", "enrichment analysis", "enrichment score"],
    wikipedia: W("Gene_set_enrichment_analysis"), links: [{ label: "Subramanian et al., Gene set enrichment analysis (PNAS 2005)", url: DOI("10.1073/pnas.0506580102") }, { label: "Barbie et al., ssGSEA introduced in Systematic RNA interference reveals that oncogenic KRAS-driven cancers require TBK1 (Nature 2009)", url: DOI("10.1038/nature08460") }, { label: "MSigDB", url: "https://www.gsea-msigdb.org/gsea/msigdb/" }], cansim: "/terms/gsea-ssgsea",
    tldr: "Gene set enrichment analysis asks whether the genes that changed in an experiment cluster in a known pathway or signature, turning a list of genes into a biological story.",
    summary: "Gene set enrichment analysis identifies classes of genes that are over-represented in a large gene list and may be associated with a phenotype (Wikipedia); Subramanian and colleagues' GSEA ranks all genes by association with a phenotype and tests whether a set concentrates at the top or bottom. Single-sample GSEA, introduced by Barbie and colleagues, scores one sample at a time, producing per-patient pathway activity scores that can be model features. The gene sets come from MSigDB (hallmark, KEGG, Reactome, GO collections). Enrichment describes; it does not prove mechanism.",
    terms: ["pathway-activation-state", "gene-co-expression"] }),
  t({ id: "single-cell-rna-seq", name: "Single-cell RNA sequencing (scRNA-seq, 10x Chromium)", category: GEN, aka: ["single-cell RNA-seq", "scRNA-seq", "single-cell RNA sequencing", "single-cell transcriptomics", "single-cell expression", "10x Chromium", "Chromium single cell", "pseudobulk"],
    wikipedia: W("Single-cell_transcriptomics"), cansim: "/terms/single-cell-rna-seq",
    tldr: "Single-cell and single-nucleus RNA sequencing profile captured messages assigned to recovered cells or nuclei.",
    summary: "RNA is distributed across cellular compartments. Whole-cell and nucleus preparations sample different material and can recover different populations. Barcodes label captured profiles rather than certifying one intact cell; quality, ambient RNA and doublet checks remain necessary. Sparse capture and selective recovery prevent a complete census, and many profiles from one biopsy do not create independent patient replicates.",
    technologies: ["single-cell-spatial"], related: ["cellxgene-hca", "10x-genomics"], terms: ["bulk-rna-seq", "spatial-transcriptomics-platforms", "foundation-model"] ,
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Single-cell_transcriptomics"
  },
  {
    "label": "Massively parallel digital transcriptional profiling of single cells.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28091601/"
  },
  {
    "label": "SoupX removes ambient RNA contamination from droplet-based single-cell RNA sequencing data.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/33367645/"
  },
  {
    "label": "Confronting false discoveries in single-cell differential expression.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/34584091/"
  },
  {
    "label": "Single-nucleus and single-cell transcriptomes compared in matched cortical cell types.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/30586455/"
  }
],
"notes": [
  "A barcode identifies a captured reaction profile, requiring checks for ambient RNA and multiple contributing cells. Whole-cell and isolated-nucleus preparations sample different compartments; recovered profiles are not a complete tissue census. A zero count does not establish biological absence. Sources: https://pubmed.ncbi.nlm.nih.gov/28091601/ and https://pubmed.ncbi.nlm.nih.gov/33367645/.",
  "Thousands of profiles from one biopsy remain nested within one biological specimen. Two technical libraries do not create two patients. Differential-expression comparisons must account for variation between biological replicates. Source: Squair et al., 2021, https://pubmed.ncbi.nlm.nih.gov/34584091/.",
  "Check library chemistry before seeking sequence variants or splice junctions. In the documented fixed RNA profiling workflow, synthetic ligated probes are sequenced rather than captured-transcript complementary DNA. Gene counts from that workflow do not provide unrestricted original transcript sequence. Source: https://www.10xgenomics.com/support/software/cell-ranger/7.2/getting-started/cr-flex-what-is-frp.",
  "A barcode labels a reaction compartment and a UMI separates captured molecules from amplified copies, giving a gene-by-barcode table; a barcode does not guarantee one intact cell.",
  "Single-nucleus sequencing samples nuclear RNA including unfinished transcripts with introns, whole cells also capture cytoplasmic messages; a mouse cortex study showed different recovery; not proof nuclei are better for tumours.",
  "Dissociation can lose fragile cells; nuclei can come from frozen tissue; fixed-material probe methods count ligated probes and cannot reveal every variant or splice product.",
  "A zero can be a missed molecule (dropout) rather than absence; ambient RNA contaminates profiles; a doublet combines cells or nuclei; correction does not certify every barcode.",
  "A cluster groups similar profiles and does not prove malignancy, lineage or a clone; cancer-cell identification needs supporting evidence.",
  "Thousands of cells from one biopsy are nested in one biological sample; splitting into two libraries does not create two patients; replicate-level aggregation is one approach.",
  "Record compatible viable/frozen/fixed preparation, material used, chemistry, cell/nucleus recovery and quality/identity checks. Report a gene-by-barcode table with its UMI/read/probe counting unit. Cell calling, low-quality and doublet criteria are chemistry/version-specific. Selective recovery, sparse capture, ambient RNA, degradation and batch require validation; a platform name provides neither a complete census nor clinical validity."
],
"asOf": "2026-11-10"
}),
  t({ id: "spatial-transcriptomics-platforms", name: "Spatial transcriptomics platforms (Visium HD, Xenium, MERFISH, CosMx, CODEX)", category: PATH, aka: ["Visium", "Visium HD", "Xenium", "MERFISH", "CosMx", "CODEX", "PhenoCycler", "spatial molecular imaging", "in situ sequencing", "spatial omics platform"],
    wikipedia: W("Spatial_transcriptomics"), links: [{ label: "10x Genomics Visium HD", url: "https://www.10xgenomics.com/products/visium-hd-spatial-gene-expression" }, { label: "10x Genomics Xenium", url: "https://www.10xgenomics.com/platforms/xenium" }, { label: "Chen et al., MERFISH: spatially resolved, highly multiplexed RNA profiling in single cells (Science 2015)", url: DOI("10.1126/science.aaa6090") }, { label: "He et al., CosMx spatial molecular imager (Nature Biotechnology 2022)", url: DOI("10.1038/s41587-022-01483-z") }, { label: "Goltsev et al., CODEX multiplexed imaging (Cell 2018)", url: DOI("10.1016/j.cell.2018.07.010") }], cansim: "/terms/spatial-platforms",
    tldr: "Spatial platforms measure RNA or protein while keeping each measurement's position on the tissue slide, so cell types and gene programmes can be mapped onto the tumour's architecture.",
    summary: "Spatial transcriptomics captures the positional context of transcription within intact tissue (Wikipedia). The platforms differ in what they trade: 10x Visium captures whole-transcriptome RNA on barcoded spots (55 micron spots originally, 2 micron bins in Visium HD); Xenium, MERFISH and CosMx image a targeted panel of hundreds to thousands of genes in situ at single-cell and subcellular resolution; CODEX (now PhenoCycler) cycles antibodies to image dozens of proteins. Public sections from 10x are CC BY 4.0 and are the usual first test for spatial models, and HTAN is assembling multi-platform tumour atlases.",
    technologies: ["spatial-transcriptomics", "spatial-biology-instruments", "single-cell-spatial"], related: ["10x-genomics"], terms: ["spatial-autocorrelation", "single-cell-rna-seq"] }),
  t({ id: "h-and-e-staining", name: "H&E staining (haematoxylin and eosin)", category: PATH, aka: ["H&E staining", "H&E stain", "H&E slide", "H&E slides", "haematoxylin and eosin", "hematoxylin and eosin", "H&E section"],
    wikipedia: W("H%26E_stain"), cansim: "/terms/h-and-e-staining",
    tldr: "H&E is the purple and pink stain on almost every pathology slide: haematoxylin colours cell nuclei blue-purple and eosin colours the cytoplasm and connective tissue pink.",
    summary: "Haematoxylin and eosin (H&E) stain makes cell appearance and tissue organisation visible in a prepared section. Haematoxylin colours nuclei blue-purple, while eosin colours cytoplasm and supporting tissue pink. Pathologists integrate nuclei, cell groups, boundaries and architecture with the specimen context. Image-analysis models can predict features from these appearances, but a molecular prediction is not a direct measurement of the named gene or protein. The section represents one sampled region and depth, rather than the entire tumour or body.",
    terms: ["digital-pathology-wsi", "tile-patch-encoding"], technologies: ["histopathology-ihc", "digital-pathology-ai"] ,
"notes": [
  "Haematoxylin highlights nuclei and other nucleic-acid-rich structures; eosin broadly stains cytoplasm and extracellular material. These colours show morphology and architecture rather than a named DNA sequence or protein. Molecular predictions from H&E require their own validation.",
  "A section represents one depth and region. Record block, section, preservation and artifacts; a nearby section may contain a different cell mixture. Fictional example: pink material around tumour nests does not prove receptor R expression. A specific validated assay would be needed to identify that receptor.",
  "Morphology includes nuclei, cell groupings, spaces, tissue boundaries and necrosis. Appearance alone does not identify every cell-death mechanism. A represented duct interface may help distinguish in-situ from invasive growth; difficult cases can require additional stains and clinical context. Grade describes selected appearance features; stage describes disease extent.",
  "Like a map of buildings, H&E shows arrangement rather than every activity inside each cell. A large nucleus or a single coloured pixel cannot establish the whole diagnosis. H&E supplies the sample context for molecular testing, including scar, necrosis or an unexpected mixture of cells.",
  "H&E examination starts with a prepared tissue section, staining, inspection and integration with relevant clinical information. Cutting the section uses finite material. The output describes cell appearance and organisation, with counts or distances only when a specified method calls for them. Criteria depend on the feature and tissue; no universal colour cutoff defines cancer. Poor fixation, folds, tears, staining variation or a missing relevant interface can limit interpretation. Clinical morphology, a research image classifier and an unvalidated molecular prediction have different evidence requirements; the slide does not directly quantify a named protein or gene or reveal tissue outside the section."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/H%26E_stain"
  },
  {
    "label": "Measurement method and interpretation source",
    "url": "https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/pathology-reports-fact-sheet"
  },
  {
    "label": "Fischer et al., H&E protocol, 2008",
    "url": "https://pubmed.ncbi.nlm.nih.gov/21356829/"
  }
],
"asOf": "2026-11-10",
"related": [
  "tumor-stroma-ratio",
  "surgical-resection-specimen",
  "myoepithelial-cells-and-basement-membrane"
]
}),
  t({ id: "digital-pathology-wsi", name: "Digital pathology and whole-slide images (WSI)", category: PATH, aka: ["digital pathology", "whole-slide image", "whole-slide images", "whole slide image", "WSI", "gigapixel slide", "gigapixel slides", ".svs file", "slide scanner image"],
    wikipedia: W("Digital_pathology"), links: [
  {
    "label": "Goode et al., OpenSlide: a vendor-neutral software foundation for digital pathology (J Pathol Inform 2013)",
    "url": "https://doi.org/10.4103/2153-3539.119005"
  },
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Digital_pathology"
  },
  {
    "label": "Measurement method and interpretation source",
    "url": "https://www.fda.gov/medical-devices/medical-device-regulatory-science-research-programs-conducted-osel/digital-pathology-program-research-digital-pathology-medical-devices"
  }
], cansim: "/terms/wsi-histopathology",
    tldr: "Digital pathology scans glass slides into gigapixel images that can be viewed, shared and analysed by software, which is what makes AI on pathology possible.",
    summary: "Digital pathology manages and analyses information from digitised specimen slides, using virtual microscopy to view, share and analyse slides on screens, with applications in diagnosis and AI (Wikipedia). A whole-slide image is typically 100,000 pixels across at 40x, stored as a pyramid in vendor formats such as Aperio .svs; OpenSlide reads them vendor-neutrally. Slides are far too large for a neural network at once, so they are cut into tiles, encoded and pooled.",
    technologies: ["whole-slide-scanners", "digital-pathology-ai"], terms: ["h-and-e-staining", "tile-patch-encoding", "magnification"] ,
"notes": [
  "A whole-slide image represents the scanned section, not every depth of the block. Keep image acquisition, computational estimation and clinical interpretation separate. A model that predicts RNA from morphology has not directly measured RNA. Scanner validation does not validate every downstream model.",
  "For interpretation, retain slide identity, stain, scanner, focus and tissue coverage, image resolution, analysis version, defined output and intended-use validation. Folds, missed tissue, stain variation and incorrect segmentation can affect results. Reusing pixels requires no new section but cannot recover unscanned tissue.",
  "A quality-checked scan preserves visible information in the captured section. Segmentation assigns boundaries; counts, areas and model scores depend on the defined analysis. A heat map or precise decimal is a method output, not proof of its biological meaning. Independent validation must fit the intended stains, scanners and population.",
  "Fictional example: research software labels an H&E region as having high predicted RNA signal. This is a prediction from appearance, not a direct RNA assay. Good image quality does not supply the missing molecular measurement. The image, analytical method and intended-use evidence are separate layers.",
  "A whole-slide workflow scans a prepared slide, checks image quality, displays it for interpretation or applies a defined analysis. Scanning generally needs no additional section. Optics, focus, colour capture, file handling, display and viewer all affect the workflow. Report image resolution and, for analysis, the defined counts, areas or model-score units; the scanner, task and intended use determine quality criteria and cutoffs.",
  "Missed tissue, poor focus, folds, stain variation, compression and incorrect cell boundaries can limit the image or its analysis. A validated diagnostic viewing workflow does not validate every computational claim. Neither a scan nor a model score supplies unscanned tissue, directly measured molecular expression or proof of treatment benefit."
],
"asOf": "2026-11-10"
}),
  t({ id: "tile-patch-encoding", name: "Tile and patch encoding of slides", category: PATH, aka: ["tile encoding", "patch encoding", "tile embeddings", "patch embeddings", "tiling", "slide tiles", "slide patches", "tile-level features"],
    wikipedia: W("Multiple_instance_learning"), links: [{ label: "Lu et al., CLAM: data-efficient and weakly supervised computational pathology on whole-slide images (Nature Biomedical Engineering 2021)", url: DOI("10.1038/s41551-020-00682-w") }], cansim: "/terms/tile-patch-encoding",
    tldr: "A whole slide is cut into thousands of small square tiles, each tile is turned into a vector by an image model, and the vectors are pooled to describe the slide.",
    summary: "Multiple-instance learning is supervised learning in which the learner receives labelled bags of instances rather than individually labelled instances (Wikipedia); a slide is the bag and its tiles the instances, since the diagnosis is known for the slide but not for each square. Tiles (typically 224 to 256 pixels at 20x) are encoded by a frozen pathology foundation model such as UNI or Virchow, and an attention-based pooling (ABMIL, CLAM) weights the tiles to make a slide-level prediction while showing which regions drove it.",
    terms: ["digital-pathology-wsi", "magnification", "abmil", "pathology-foundation-models"], technologies: ["pathology-foundation-model"] }),
  t({ id: "magnification", name: "Magnification (20x, 40x) and microns per pixel", category: PATH, aka: ["20x magnification", "40x magnification", "microns per pixel", "MPP", "objective magnification", "scan magnification"],
    wikipedia: W("Digital_pathology"), cansim: "/terms/magnification",
    tldr: "Slides are scanned at 20x or 40x objective magnification, about 0.5 or 0.25 microns per pixel; a model trained at one scale can misread tissue at another.",
    summary: "Digital pathology scans slides with virtual microscopy at a chosen objective magnification (Wikipedia). 40x resolves nuclear detail at roughly 0.25 microns per pixel and 20x, at roughly 0.5, is the usual compromise between detail and file size; scanners record the exact microns per pixel in the file header. Pathology foundation models are trained at set magnifications and tile sizes, so preprocessing must rescale slides to the training resolution, and a change of scanner is a batch effect for images.",
    terms: ["digital-pathology-wsi", "tile-patch-encoding", "batch-effects"] }),
  t({
    asOf:"2026-11-08", notes:["A beta value is a processed methylated-signal versus total-signal measure; background handling and assay chemistry matter. Standard bisulfite does not distinguish 5-methylcytosine from 5-hydroxymethylcytosine. Mixed-cell proportions, genomic context and platform coverage limit interpretation; a value is not a cancer-cell silencing percentage."], related:["cancer-ai-vocabulary","epigenetic-marks","cell-composition-confound"], id: "methylation-arrays", name: "DNA methylation arrays and beta values (450k, EPIC)", category: GEN, aka: ["methylation beta values", "beta values", "450k array", "Infinium 450k", "EPIC array", "MethylationEPIC", "methylation array", "methylation arrays", "CpG methylation profile"],
    wikipedia: W("Illumina_Methylation_Assay"), links: [{"label":"Wikipedia: DNA methylation","url":"https://en.wikipedia.org/wiki/DNA_methylation"},{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Illumina_Methylation_Assay"},{"label":"Oxidative bisulfite sequencing of 5-methylcytosine and 5-hydroxymethylcytosine.","url":"https://pubmed.ncbi.nlm.nih.gov/24008380/"},{"label":"A genomic sequencing protocol that yields a positive display of 5-methylcytosine residues in individual DNA strands.","url":"https://pubmed.ncbi.nlm.nih.gov/1542678/"}], cansim: "/terms/methylation-beta-values",
    tldr: "Methylation arrays compare modified and unmodified probe signals at selected DNA sites. Their beta values are assay signal ratios, not direct counts of cancer cells.",
    summary: "The Illumina Infinium methylation assay uses BeadChip technology for genome-wide profiling of human DNA methylation, quantifying methylation at many loci (Wikipedia); the 450k array covers about 450,000 CpG sites and the EPIC array about 850,000. Each site's beta value is the methylated signal over total signal. DNA methylation in promoters typically represses transcription and is a stable record of cell identity, which is why methylation classifiers work for brain tumours and why methylation adds tissue-of-origin information to expression.",
    technologies: ["methylation-profiling", "cns-tumour-methylation-classifier"], terms: ["organ-of-origin-signal", "mgmt"] }),
  t({ id: "microarray-expression", name: "Microarray expression data", category: GEN, aka: ["microarray expression", "expression microarray", "expression microarrays", "microarray data", "Affymetrix array", "Illumina expression array", "hybridisation platform"],
    wikipedia: W("DNA_microarray"), links: [{ label: "Curtis et al., METABRIC: the genomic and transcriptomic architecture of 2,000 breast tumours (Nature 2012)", url: DOI("10.1038/nature10983") }], cansim: "/terms/microarray-expression",
    tldr: "Microarrays measured gene expression by hybridising labelled RNA to spots of known DNA on a chip; they preceded RNA sequencing and still hold the longest-followed cohorts.",
    summary: "A DNA microarray is a collection of microscopic DNA spots on a solid surface used to measure the expression of large numbers of genes at once (Wikipedia). The METABRIC breast cancer cohort of about two thousand patients with long follow-up is microarray based, which makes it the standard external test for TCGA-trained RNA-seq survival models and a stern one: intensities and read counts have different distributions, so a model must be rank- or quantile-normalised to cross platforms.",
    terms: ["bulk-rna-seq", "batch-effects", "quantile-normalisation", "external-validation"] }),
  t({ id: "rppa", name: "Reverse-phase protein array (RPPA)", category: BM, aka: ["RPPA", "reverse-phase protein array", "reverse phase protein array", "protein array data", "RPPA data"],
    wikipedia: W("Reverse_phase_protein_lysate_microarray"), cansim: "/terms/rppa",
    tldr: "RPPA spots tiny amounts of protein extract from many tumours onto a slide and probes them with antibodies, measuring a few hundred proteins and phosphoproteins in each sample at once.",
    summary: "A reverse phase protein lysate microarray is a dot-blot platform that measures protein expression in many samples simultaneously and quantitatively where high-quality antibodies exist (Wikipedia). TCGA ran RPPA on most tumours for roughly 150 to 200 proteins and phosphoproteins chosen for signalling pathways, which makes it the only pan-cancer protein data at scale, though a targeted rather than genome-wide view. Deep mass spectrometry from CPTAC covers thousands of proteins on fewer tumours.",
    technologies: ["proteomics"], terms: ["pathway-activation-state", "mass-spec-proteome"], related: ["tcga-gdc"] }),
  t({ id: "mass-spec-proteome", name: "Deep mass-spectrometry proteome (CPTAC)", category: BM, aka: ["mass-spectrometry proteome", "mass spectrometry proteomics", "deep proteome", "global proteome", "MS proteomics", "TMT proteomics", "phospho-proteomics data"],
    wikipedia: W("Mass_spectrometry"), links: [
  {
    "label": "CPTAC (NCI Office of Cancer Clinical Proteomics Research)",
    "url": "https://proteomics.cancer.gov"
  },
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Mass_spectrometry"
  },
  {
    "label": "Aebersold and Mann, Mass spectrometry-based proteomics (Nature 2003)",
    "url": "https://doi.org/10.1038/nature01511"
  },
  {
    "label": "Lukasse and America, Protein inference using peptide quantification patterns (Journal of Proteome Research 2014)",
    "url": "https://doi.org/10.1021/pr401072g"
  },
  {
    "label": "Elias and Gygi, Target-decoy search strategy for increased confidence in large-scale protein identifications by mass spectrometry (Nature Methods 2007)",
    "url": "https://doi.org/10.1038/nmeth1019"
  },
  {
    "label": "Mertins et al., Proteogenomics connects somatic mutations to signalling in breast cancer (Nature 2016)",
    "url": "https://doi.org/10.1038/nature18003"
  },
  {
    "label": "Carr et al., Targeted peptide measurements in biology and medicine (Molecular and Cellular Proteomics 2014)",
    "url": "https://doi.org/10.1074/mcp.M113.036095"
  }
], cansim: "/terms/deep-ms-proteome",
    tldr: "Mass-spectrometry proteomics identifies protein-derived peptides and can quantify signals under a defined workflow. It does not measure every protein or directly establish a cell's activity.",
    summary: "Bottom-up mass-spectrometry proteomics identifies protein-derived peptides and can quantify selected signals under a defined workflow. Mass spectrometry-based proteomics can identify and increasingly quantify thousands of proteins in complex samples (Aebersold and Mann, 2003). Protein inference, working out which proteins are present from the identified peptides, is difficult because many peptide sequences occur in several proteins (Lukasse and America, 2014). The target-decoy strategy uses hits to a decoy database to distinguish correct from incorrect peptide identifications (Elias and Gygi, 2007), and a dataset-level false-positive rate is a property of the accepted set, not a guarantee for each identification (Beausoleil and colleagues, 2006 reported a peptide false-positive rate of 1.3 per cent for their dataset). In 105 genomically annotated breast cancers, 77 of which gave high-quality data, pathway analysis of the phosphoproteome identified a G-protein-coupled receptor cluster that was not readily identified at the mRNA level (Mertins and colleagues, 2016).",
    technologies: ["proteomics", "proteomics-platforms"], related: ["cptac"], terms: [
  "rppa",
  "mrna-protein-concordance",
  "pathway-activation-state",
  "multi-omic-integration"
] ,
"notes": [
  "Reading guide (OnCo inference built on the sources). Bottom-up proteomics digests proteins to peptides, separates them by liquid chromatography, measures ions and fragments by tandem mass spectrometry, and identifies peptides by software, so evidence for an intact, functional protein is indirect. A shared peptide cannot choose between candidate proteins; inference uses the other peptides recovered and reports ambiguity. A ratio needs its denominator, an absolute amount needs calibration with standards in a matched matrix (Carr and colleagues, 2014), and a peptide standard does not by itself show recovery of the original protein. A bulk extract mixes cells and loses their positions, so a peptide signal per mass of extract is not receptors per cancer cell.",
  "Fictional worked example. A bulk assay reports twice as much receptor-derived peptide per microgram of extract. Twice as much signal per unit of extract mass (2 x) does not mean twice as many accessible receptors on each cancer cell, because cell mixture, location and the relation of the quantified peptide to receptor forms are unresolved; a cell-specific surface measurement answers a different question.",
  "Figure reading (fictional schematic, light and dark renders agree): proteins from a defined mixed sample are extracted and digested into a peptide mixture; peptide signals come from a separation and measurement step; one shared peptide fits both candidate protein A and candidate protein B, so it cannot say which was present; intact form, source cells and surface access remain separate questions that need other evidence.",
  "Assay card in words (a reading guide). Measures and method: protein-derived peptide identity and abundance after extraction, digestion, separation and ion measurement. Input and tissue cost: a defined tissue or cell extract; fresh-frozen and formalin-fixed workflows exist with method-specific input needs; extraction consumes material and destroys spatial arrangement. Output and units: peptide and protein identifiers, normalised intensity or ratios; calibrated assays may report amounts such as femtomoles per microgram of input protein. Thresholds: identification false-discovery rate, analyte-specific detection and quantification limits, missing-value rules and calibrated range, with no universal abundance cutoff for treatment. Failure modes: incomplete extraction or digestion, shared peptides, interference, missing low-abundance analytes and inconsistent preparation. Limits: no automatic intact-form, location, accessibility, cell-of-origin or dependency conclusion. Validation context: broad discovery and targeted clinical measurement have different requirements."
],
"asOf": "2026-11-10"
}),
  t({ id: "ehr-text-pathology-reports", name: "Clinical text: EHR notes and pathology reports", category: CLIN, aka: ["EHR text", "electronic health record text", "free-text clinical notes", "pathology report text", "pathology reports", "clinical notes", "unstructured clinical data"],
    wikipedia: W("Electronic_health_record"), cansim: "/terms/ehr-text",
    tldr: "Much of what is known about a patient sits in free text, in clinic notes and pathology reports; language models are now used to read it and to pair it with slides.",
    summary: "An electronic health record is the systematised collection of a patient's health information in digital form, shareable across care settings (Wikipedia). Pathology reports are the free-text account of what the pathologist saw, with the diagnosis, grade, margins and receptor results. Vision-language pathology models such as CONCH and TITAN align slide images with report text so that a slide can be searched or described in words; the text carries protected health information, so it is rarely public.",
    technologies: ["titan"], terms: ["hipaa", "digital-pathology-wsi"] }),
  t({ id: "radiology-imaging-modality", name: "Radiology imaging as a data modality (CT, MRI, TCIA)", category: DX, aka: ["radiology imaging data", "CT imaging data", "MRI data", "DICOM imaging", "imaging modality", "radiology modality"],
    wikipedia: W("Digital_pathology"), links: [{ label: "The Cancer Imaging Archive (TCIA)", url: "https://www.cancerimagingarchive.net/" }, { label: "NCI Imaging Data Commons", url: "https://portal.imaging.datacommons.cancer.gov/" }], cansim: "/terms/radiology-imaging",
    tldr: "CT, MRI and PET scans are a data modality in their own right; public archives such as TCIA hold de-identified scans, some linked to TCGA tumours, for training imaging models.",
    summary: "Radiology images are stored as DICOM series and, like digitised slides (Wikipedia on digital pathology), are analysed by software at scale. The Cancer Imaging Archive and the NCI Imaging Data Commons hold de-identified collections, including scans of TCGA patients, under open licences. Radiomics extracts hand-designed features; radiology foundation models such as RadFM and CT-FM learn features directly. Imaging is the modality most multimodal cancer models have yet to add.",
    technologies: ["radiomics", "radfm", "ct-fm", "radiology-ai-screening"], related: ["tcia"] }),
  t({ id: "os-pfs-time-event", name: "Survival outcomes as time plus event (OS, PFS)", category: END, aka: ["time-to-event outcome", "time and event", "survival time and status", "OS time", "PFS time", "event indicator", "vital status", "days to death", "days to last follow-up"],
    wikipedia: W("Survival_analysis"), cansim: "/terms/os-pfs-outcomes",
    tldr: "A survival outcome is recorded as two numbers per patient: how long they were followed, and whether the event (death, or progression) happened by then.",
    summary: "Survival analysis is the branch of statistics for the expected time until an event such as death occurs (Wikipedia). In datasets such as TCGA the outcome is stored as a time (days to death or to last follow-up) and an event flag (vital status), from which overall survival is computed; progression-free survival needs progression dates, which TCGA records unevenly. Follow-up in TCGA is short for many cancers, so event counts are low and survival models trained on it are noisy.",
    terms: ["os", "pfs", "censoring-and-events", "kaplan-meier-curve"] }),

  // ---- Access, regulation and validation ----
  t({ id: "controlled-access-data", name: "Controlled-access genomic data (dbGaP, EGA)", category: REG, aka: ["controlled-access data", "controlled access data", "controlled-access tier", "dbGaP", "EGA", "European Genome-phenome Archive", "database of Genotypes and Phenotypes", "data access committee"],
    wikipedia: W("European_Genome-phenome_Archive"), links: [{ label: "dbGaP (NCBI)", url: "https://www.ncbi.nlm.nih.gov/gap/" }, { label: "GDC: obtaining access to controlled data", url: "https://gdc.cancer.gov/access-data/obtaining-access-controlled-data" }], cansim: "/terms/controlled-access-data",
    tldr: "Controlled-access data can identify a person (raw sequence reads, germline variants), so it is held in archives like dbGaP and EGA and released only to approved researchers under an agreement.",
    summary: "The European Genome-phenome Archive is a repository for potentially identifiable genetic, phenotypic and clinical data from biomedical research, held under secure storage (Wikipedia); dbGaP at the NCBI is the US counterpart. The GDC page on controlled data explains that TCGA's raw sequence and germline files require dbGaP authorisation through an institutional signing official, while processed, non-identifying data are open. Models trained on controlled data cannot release the data, and sometimes not the weights, without the same review.",
    terms: ["tcga-tiers", "data-use-agreements", "hipaa"], related: ["tcga-gdc"] }),
  t({ id: "tcga-tiers", wikipediaChecked: "2026-09-25", name: "TCGA open versus controlled data tiers", category: REG, aka: ["TCGA open tier", "TCGA controlled tier", "open-access tier", "open access data tier", "controlled tier", "GDC open data", "GDC controlled data"],
    links: [{ label: "GDC: obtaining access to controlled data", url: "https://gdc.cancer.gov/access-data/obtaining-access-controlled-data" }, { label: "NCI Genomic Data Commons API (data-sources)", url: "https://gdc.cancer.gov/developers/gdc-application-programming-interface-api" }], cansim: "/terms/tcga-open-vs-controlled-tiers",
    tldr: "TCGA data comes in two tiers: open files (gene expression, somatic mutations, clinical tables, slide images) anyone can download, and controlled files (raw reads, germline variants) that need dbGaP approval.",
    summary: "The GDC's access documentation divides its data into open access, which requires no authorisation and carries only a ban on attempting to re-identify participants, and controlled access, which requires an approved dbGaP application because the files could identify a person. Expression matrices, somatic MAFs, copy number segments, methylation betas, RPPA and diagnostic slides are open; BAM files and germline calls are controlled. Most public cancer models are trained entirely on the open tier.",
    terms: ["controlled-access-data", "data-use-agreements"], related: ["tcga-gdc"] }),
  t({ id: "data-use-agreements", name: "Data use agreements and consent for research use", category: REG, aka: ["data use agreement", "data use agreements", "DUA", "data access agreement", "consent for research use", "research consent", "broad consent", "secondary use consent"],
    wikipedia: W("Informed_consent"), links: [{ label: "Wikipedia: data sharing", url: W("Data_sharing") }, { label: "dbGaP (NCBI)", url: "https://www.ncbi.nlm.nih.gov/gap/" }], cansim: "/terms/data-use-agreements",
    tldr: "A data use agreement is the contract a researcher signs to receive controlled data, promising to protect it and use it only as the participants consented.",
    summary: "Informed consent is the principle that a person must have sufficient information and understanding before accepting risk (Wikipedia), and for research data it defines what future uses are allowed, from a single study to broad research use; data sharing policies from funders and journals then set how datasets are released. Controlled archives translate the consent into data use limitations attached to each study, and the data use agreement binds the recipient's institution to them. Commercial use, re-contact and cross-linking are the clauses that most often bite.",
    terms: ["informed-consent", "controlled-access-data", "hipaa"] }),
  t({ id: "samd", name: "Software as a medical device (SaMD)", category: REG, aka: ["software as a medical device", "SaMD", "AI as a medical device", "AI/ML-enabled medical device", "medical device software"],
    links: [{ label: "FDA: Software as a Medical Device (SaMD)", url: "https://www.fda.gov/medical-devices/digital-health-center-excellence/software-medical-device-samd" }, { label: "Wikipedia: medical software", url: W("Medical_software") }], cansim: "/terms/samd",
    tldr: "Software as a medical device is software that is itself the medical device, such as a program that predicts a diagnosis or a treatment response, and is regulated like one.",
    summary: "The FDA's Digital Health Center of Excellence page defines software as a medical device, following the International Medical Device Regulators Forum, as software intended for a medical purpose that performs that purpose without being part of a hardware device, and lists examples and its clinical decision support policy. A prognostic or drug-response model used to guide a patient's care would be SaMD and would need clearance or approval, with analytical and clinical validation and a plan for updates; a research model carries a research-only notice instead.",
    terms: ["research-use-only", "analytical-vs-clinical-validation", "model-card"], related: ["fda-oce"] }),
  t({
    related: ["cancer-ai-vocabulary","laboratory-certification-test-authorization","fda-ldt-rule","analytical-vs-clinical-validation"], asOf: "2026-11-08", id: "research-use-only", name: "Research use only (RUO)", category: REG, aka: ["research use only", "RUO", "for research use only", "not for diagnostic use", "research-only notice", "not for clinical use"],
    links: [{"label":"FDA guidance: Distribution of in vitro diagnostic products labeled for research use only or investigational use only (2013)","url":"https://www.fda.gov/regulatory-information/search-fda-guidance-documents/distribution-in-vitro-diagnostic-products-labeled-research-use-only-or-investigational-use-only"},{"label":"FDA: research-use-only and investigational-use-only IVD guidance","url":"https://www.fda.gov/media/87374/download"},{"label":"CMS: Clinical Laboratory Improvement Amendments","url":"https://www.cms.gov/medicare/quality/clinical-laboratory-improvement-amendments"}], cansim: "/terms/research-use-only",
    tldr: "A research-use-only label describes a product intended for research in its applicable framework. It does not establish that the product is suitable for clinical diagnosis.",
    summary: "FDA guidance on research-use-only in vitro diagnostic products concerns their intended use, labeling and distribution. The label alone is not a complete account of analytical performance or clinical usefulness, and its legal framework should not be generalized to every research model or dataset. Laboratory certification, development within a laboratory and product authorization are separate descriptions. A research result can motivate further study without becoming a validated treatment-selection report.",
    terms: ["samd", "analytical-vs-clinical-validation"] }),
  t({
    notes:["Start a claim worksheet with the population and treatment setting, specimen and method version, measured or predicted outcome, time horizon and proposed decision. A molecule measurement, drug ranking in a dish and outcome prediction from earlier patients are different claims. For risk, retain whether the estimate assumes usual care or no treatment; for a drug experiment, retain the drug, dose and combination. Leave unavailable details unknown. Then separate the tested material and quality, biological interpretation and alternatives, prediction, proposed action and evidence of benefit. Mark each measured, inferred, proposed or unknown. A sound measurement does not automatically support the later steps.","Consider a fictional report that calls a protein-rich stored tumour a Drug A responder. Its study related protein abundance to shrinkage among people all receiving Drug A for advanced Cancer X. The measurement and response association can be useful, but there is no untreated or alternative-treatment comparison establishing greater benefit from A. Applying it after surgery also changes the setting. Ask what comparison shows improved outcomes from choosing A with this result in the proposed setting. Confirmation of protein abundance answers whether that signal is real, while postoperative benefit remains a separate question. A favourable prognostic result does not itself justify omitting standard treatment.","An evidence card records population, stage, treatment context and selection; specimen, handling, assay version and quality criteria; the reference condition or care comparator and its limitations; outcome and measurement time; the analysis plan, all tuning and independent evaluation; failed samples, dropout and missing outcomes; and sample size, intervals and remaining uncertainty. A response endpoint is not recurrence or survival. A preclinical card names the actual model and tested claim; an observational clinical association retains possible confounding. Neither alone establishes that the proposed clinical action helps. A headline metric also needs the consequences of false positive and false negative calls attached to the action. Distinguish prespecified analyses from exploratory searches, keep their tuning history, and seek confirmation that does not reuse the search. State whether a treatment-study denominator includes everyone assigned, only those treated or only those evaluable.","For analytical performance, request the detection limit with its target level, input amount, specimen and detection probability; precision within runs and across days, operators, instruments and reagent lots; agreement with an appropriate independent reference; attempted-sample failure rate and reasons; and specimen handling, preservation and interference testing. The 2017 AMP/CAP recommendations concern next-generation sequencing panels for somatic variants. They ask for performance by variant class and relevant reference materials, depth and sample numbers. They describe a lower detection limit at which 95 per cent of samples are reliably detected, but also explain why observing 19 or 20 successes in 20 trials does not by itself establish that reliability with confidence. This is an assay-specific example, not a universal validation protocol. Fresh and delayed specimens can differ, and measurement variation must be understood before interpreting a trend. Self-agreement alone does not establish accuracy.","Put the decision before ordering. Write what positive, negative, uncertain and failed results would change, including proposed treatment omission, confirmation or another sample. Compare existing pathology and other tests, and record the decision deadline, finite tissue, time, travel, uncertainty and financial burden. Name who interprets the result, who owns the clinical recommendation and when further testing is unlikely to help that decision. A result arriving after the decision closes may not serve its intended use. The worksheet exposes assumptions rather than calculating a treatment choice; urgency does not establish validity.","In the fictional postoperative protein-test case, possible next steps are checking the actual companion-diagnostic requirement and whether this assay meets it, inspecting the Drug A evidence, considering a trial of the relevant strategy, or declining a tissue-consuming test that would not change the decision. The exact laboratory, service, version and intended use matter. A research-use label, laboratory certification, development designation or report drug list cannot replace the claim-specific evidence. A companion test is tied to specified treatment use. Clinician-led off-label use, access, payment and suitability are additional questions, not promises made by a molecular report. Fast-track and breakthrough-therapy designations are not marketing approval; accelerated approval is a distinct approval pathway, not just a development designation.","Research can have a defined value without selecting treatment: checking a mechanism, explaining discordant assays or generating a future hypothesis. Name the reviewer and what would count as a useful answer rather than extending an endless chain of tests. Attribute unpublished company data and state which methods and results were available to inspect; unavailable evidence does not prove the claim false. In a fictional high/low recurrence-risk test for which neither answer changes recommended care and no relevant study is open, the immediate value for that treatment decision is limited. A separate research or personal-information goal should be weighed against burden, uncertainty and alternatives. A changed treatment decision is not itself demonstrated benefit and can add unnecessary treatment."], asOf:"2026-11-12", id: "analytical-vs-clinical-validation", name: "Analytical versus clinical validation", category: BM, aka: ["analytical validation", "clinical validation", "analytical validity", "clinical validity", "clinical utility", "validation of a biomarker test"],
    wikipedia: W("Biomarker_(medicine)"), links: [{"label":"FDA: Software as a Medical Device (SaMD)","url":"https://www.fda.gov/medical-devices/digital-health-center-excellence/software-medical-device-samd"},{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Biomarker_(medicine)"},{"label":"MedlinePlus Genetics: analytical validity, clinical validity and utility","url":"https://medlineplus.gov/genetics/understanding/testing/validtest/"},{"label":"Jennings et al.: AMP/CAP somatic sequencing-panel validation recommendations (2017)","url":"https://pubmed.ncbi.nlm.nih.gov/28341590/"},{"label":"FDA: companion diagnostics and specified treatment uses","url":"https://www.fda.gov/medical-devices/in-vitro-diagnostics/companion-diagnostics"},{"label":"FDA: understanding unapproved use of approved drugs","url":"https://www.fda.gov/understanding-unapproved-use-approved-drugs-label"}], cansim: "/terms/clinical-vs-analytical-validation",
    tldr: "Analytical validity concerns whether a test measures reliably. Clinical validity concerns what its result means for a condition or outcome. Clinical utility concerns using that information for a decision.",
    summary: "Analytical validity, clinical validity and clinical utility address different questions for a specified assay, specimen, population and intended use. MedlinePlus Genetics distinguishes detection of a genetic variant, its relationship to disease presence or risk, and whether the information helps diagnosis, treatment, management or prevention. Reliable measurement does not by itself establish clinical meaning, and an outcome association does not establish benefit from changing care. For a prediction model, reproducibility of fixed-input output, discrimination, calibrated probabilities and the consequences of model-guided decisions also require distinct evidence. These are related questions rather than a universal sequence that guarantees a useful test.",
    terms: ["external-validation", "calibration", "samd", "biomarker"] }),

  // ---- Genome and identifier standards ----
  t({ id: "hgnc-symbol", name: "HGNC gene symbol", category: GEN, aka: ["HGNC symbol", "HGNC gene symbol", "approved gene symbol", "official gene symbol", "gene symbol", "HGNC id", "HGNC ID"],
    wikipedia: W("HUGO_Gene_Nomenclature_Committee"), links: [{ label: "HGNC (genenames.org)", url: "https://www.genenames.org/about/" }], cansim: "/terms/hgnc-symbol",
    tldr: "The HGNC symbol is the one official short name for each human gene (ERBB2, not HER2 or NEU), so that datasets can be joined without guessing.",
    summary: "The HUGO Gene Nomenclature Committee approves a unique name and symbol for every known human gene (Wikipedia). Symbols change and aliases collide (HER2 is ERBB2; the symbol MLL became KMT2A), so every dataset should carry the stable HGNC ID (HGNC:3430) as well as the symbol, and gene lists from different years must be mapped before they are joined. OnCo's target records carry HGNC, Ensembl, UniProt and Entrez identifiers for this reason.",
    terms: ["ensembl-gene-id", "genome-builds"], related: ["her2"] }),
  t({ id: "ensembl-gene-id", name: "Ensembl gene ID", category: GEN, aka: ["Ensembl gene ID", "Ensembl ID", "ENSG identifier", "Ensembl gene identifier", "ENSG id"],
    wikipedia: W("Ensembl_genome_database_project"), links: [{ label: "About Ensembl", url: "https://www.ensembl.org/info/about/index.html" }], cansim: "/terms/ensembl-gene-id",
    tldr: "An Ensembl gene ID such as ENSG00000141736 is a stable machine identifier for a gene that survives symbol changes, so pipelines join on it rather than on names.",
    summary: "The Ensembl genome database project at the European Bioinformatics Institute provides a centralised resource for genomes and their annotation (Wikipedia); its gene identifiers begin ENSG and carry a version suffix that increments when the annotation changes. Expression matrices from STAR and Salmon are keyed by Ensembl ID, and mapping to symbols loses genes (several IDs per symbol, retired IDs). Recording the Ensembl release alongside the genome build is part of provenance.",
    terms: ["hgnc-symbol", "genome-builds", "provenance-fields"] }),
  t({ id: "genome-builds", name: "Genome builds: GRCh38 versus hg19 (GRCh37)", category: GEN, aka: ["GRCh38", "hg38", "hg19", "GRCh37", "genome build", "reference build", "reference genome build", "liftover"],
    wikipedia: W("Reference_genome"), links: [{ label: "GRCh38.p14 assembly at NCBI Datasets", url: "https://www.ncbi.nlm.nih.gov/datasets/genome/GCF_000001405.40/" }], cansim: "/terms/grch38-vs-hg19",
    tldr: "A genome build is the version of the human reference sequence coordinates are measured against; mixing GRCh38 and the older hg19 puts variants at the wrong positions.",
    summary: "A reference genome is an assembly representing an organism's complete genetic sequence as a continuous string, accompanied by annotation (Wikipedia). GRCh38 (hg38), released in 2013, is the current human reference; GRCh37 (hg19) preceded it and much legacy TCGA data was aligned to it before the GDC re-harmonised everything to GRCh38. Coordinates differ between builds, so files must be lifted over or re-aligned, and the build is a mandatory provenance field.",
    terms: ["provenance-fields", "hgvs", "variant-calling"] }),
  t({ id: "hgvs", name: "HGVS variant nomenclature", category: GEN, aka: ["HGVS", "HGVS nomenclature", "HGVS notation", "c. notation", "p. notation", "variant nomenclature"],
    wikipedia: W("Human_Genome_Variation_Society"), links: [{ label: "HGVS nomenclature", url: "https://hgvs-nomenclature.org/stable/" }], cansim: "/terms/hgvs",
    tldr: "HGVS is the standard way to write a DNA or protein change, such as EGFR c.2573T>G or p.Leu858Arg, so that the same variant is named the same way everywhere.",
    summary: "The Human Genome Variation Society maintains the recommendations for describing sequence variants (Wikipedia; the current rules are at hgvs-nomenclature.org). A description names the reference sequence and level (g. genomic, c. coding DNA, p. protein) and the change, and a genomic description depends on the genome build. Free-text variant names in papers (L858R, T790M) are shorthand for HGVS protein descriptions; joining them to databases such as ClinVar and CIViC requires the full form.",
    terms: ["genome-builds", "variant-effect-prediction", "variant-calling"], related: ["clinvar", "civic"] }),
  t({ id: "icd-o-3", name: "ICD-O-3 (International Classification of Diseases for Oncology)", category: PATH, aka: ["ICD-O-3", "ICD-O", "ICD-O-3 morphology code", "ICD-O-3 topography code", "morphology code", "topography code"],
    wikipedia: W("International_Classification_of_Diseases_for_Oncology"), links: [{ label: "WHO: ICD-O", url: "https://www.who.int/standards/classifications/other-classifications/international-classification-of-diseases-for-oncology" }], cansim: "/terms/icd-o-3",
    tldr: "ICD-O-3 codes every tumour twice: a topography code for where it arose and a morphology code for what kind of cells it is made of and how it behaves.",
    summary: "The International Classification of Diseases for Oncology is a domain-specific extension of the ICD for tumour diseases, widely used by cancer registries (Wikipedia; the WHO maintains the third edition). Topography codes (C50.9, breast) and morphology codes (8500/3, invasive ductal carcinoma, malignant) appear in TCGA and SEER clinical tables and are the join key between registries and molecular cohorts. Cancer-type labels in machine-learning datasets should resolve to these codes rather than to project names.",
    terms: ["oncotree-term", "ncit", "tnm-staging"], related: ["seer"] }),
  t({ id: "oncotree-term", wikipediaChecked: "2026-09-25", name: "OncoTree cancer classification", category: PATH, aka: ["OncoTree", "OncoTree code", "OncoTree codes", "OncoTree classification"],
    links: [{ label: "OncoTree (Memorial Sloan Kettering)", url: "https://oncotree.mskcc.org/" }, { label: "cBioPortal", url: "https://www.cbioportal.org/" }], cansim: "/terms/oncotree",
    tldr: "OncoTree is a hierarchy of cancer types from tissue down to subtype, with short codes such as LUAD and BRCA, built for precision oncology and used by cBioPortal and AACR GENIE.",
    summary: "OncoTree, maintained by Memorial Sloan Kettering, organises cancer types as a tree from tissue of origin through histology to molecular subtype, each node with a code, and maps to NCIt and UMLS concepts; cBioPortal study data and AACR Project GENIE label samples with OncoTree codes. TCGA project codes (BRCA, LUAD) coincide with many OncoTree codes but are cohort names, not a classification. OnCo records OncoTree on the open-source map as an open standard.",
    terms: ["icd-o-3", "ncit"], related: ["genie", "cbioportal"] }),
  t({ id: "ncit", wikipediaChecked: "2026-09-25", name: "NCI Thesaurus (NCIt)", category: CLIN, aka: ["NCI Thesaurus", "NCIt", "NCIt code", "NCIt concept", "NCI terminology"],
    links: [{ label: "NCI Thesaurus browser", url: "https://ncithesaurus.nci.nih.gov/ncitbrowser/" }, { label: "Wikipedia: National Cancer Institute", url: W("National_Cancer_Institute") }], cansim: "/terms/ncit",
    tldr: "The NCI Thesaurus is the US National Cancer Institute's reference vocabulary of diseases, drugs, anatomy and findings, each with a stable code such as C4872 for breast carcinoma.",
    summary: "The NCI Thesaurus, published by the National Cancer Institute (Wikipedia describes the NCI as the coordinator of the US National Cancer Program), is a reference terminology covering cancers, drugs, anatomy, genes and clinical findings, with definitions, synonyms and codes updated monthly. ClinicalTrials.gov conditions, FDA drug terminology and OncoTree map to it, so it is the natural spine for joining trials, drugs and diagnoses across sources.",
    terms: ["icd-o-3", "oncotree-term", "mondo", "rxnorm"] }),
  t({ id: "mondo", name: "Mondo disease ontology", category: CLIN, aka: ["Mondo", "MONDO", "Mondo disease ontology", "Mondo ID", "MONDO id"],
    links: [{ label: "Mondo Disease Ontology (Monarch Initiative)", url: "https://mondo.monarchinitiative.org/" }, { label: "Wikipedia: ontology (information science)", url: W("Ontology_(information_science)") }], cansim: "/terms/mondo",
    tldr: "Mondo is a unified disease ontology that merges the disease vocabularies (OMIM, Orphanet, NCIt, ICD and others) into one hierarchy with cross-references, so a disease named in one system can be found in the others.",
    summary: "An ontology in information science is a formal naming and definition of categories and their relations (Wikipedia); Mondo, from the Monarch Initiative, is a disease ontology built by harmonising existing disease resources into a single logically defined hierarchy with equivalence mappings to each source. It is used to annotate datasets and knowledge graphs where diseases from different vocabularies must be treated as one, including cancer types alongside rare diseases.",
    terms: ["ncit", "icd-o-3", "hpo", "uberon"] }),
  t({ id: "hpo", name: "Human Phenotype Ontology (HPO)", category: CLIN, aka: ["Human Phenotype Ontology", "HPO", "HPO term", "HPO terms", "phenotype ontology"],
    wikipedia: W("Human_Phenotype_Ontology"), links: [{ label: "HPO (Jackson Laboratory)", url: "https://hpo.jax.org/" }], cansim: "/terms/hpo",
    tldr: "The Human Phenotype Ontology is a standard vocabulary of clinical features (signs, symptoms, findings) with codes, used to describe patients in a way computers can compare.",
    summary: "The Human Phenotype Ontology is a formal ontology of human phenotypes developed within the Monarch Initiative and the OBO Foundry, with over 13,000 terms and annotations to hereditary diseases (Wikipedia). Terms such as weight loss or lymphadenopathy code clinical findings in records and registries; in oncology it is used less than NCIt, but it is the standard for phenotypes in rare disease and germline cancer predisposition.",
    terms: ["mondo", "ncit", "units-ontology"] }),
  t({ id: "uberon", name: "Uberon anatomy ontology and the Cell Ontology", category: "Anatomy", aka: ["Uberon", "UBERON", "Uberon anatomy ontology", "Cell Ontology", "CL ontology", "CL term", "cell type ontology"],
    wikipedia: W("Uberon"), links: [{ label: "Wikipedia: Cell Ontology", url: W("Cell_Ontology") }, { label: "OBO Foundry: Uberon", url: "https://obofoundry.org/ontology/uberon.html" }, { label: "OBO Foundry: Cell Ontology", url: "https://obofoundry.org/ontology/cl.html" }], cansim: "/terms/uberon",
    tldr: "Uberon names anatomical structures (organs, tissues) and the Cell Ontology names cell types, each with a code, so that a tissue label or a cell-type annotation means the same thing across datasets.",
    summary: "Uberon is a comparative anatomy ontology of animal structures such as lungs, muscles and bones, connected by relations such as part-of and develops-from (Wikipedia); the Cell Ontology captures the diversity of animal cell types and its identifiers annotate data at the cell-type level, for example in single-cell atlases (Wikipedia). CELLxGENE requires both, and OnCo's body-region and organ mappings play the same role informally.",
    terms: ["mondo", "hpo", "single-cell-rna-seq"], related: ["cellxgene-hca"] }),
  t({ id: "units-ontology", wikipediaChecked: "2026-09-25", name: "Units of measurement ontology (UO)", category: CLIN, aka: ["Units Ontology", "UO ontology", "UO term", "units of measurement ontology", "unit ontology"],
    links: [{ label: "OBO Foundry: Units of measurement ontology", url: "https://obofoundry.org/ontology/uo.html" }, { label: "Wikipedia: ontology (information science)", url: W("Ontology_(information_science)") }], cansim: "/terms/uo",
    tldr: "The Units of measurement ontology gives every unit (milligram per square metre, months, TPM) a code, so a number in a dataset says what it is a number of.",
    summary: "The Units of measurement ontology, listed by the OBO Foundry, is a metadata standard of units with identifiers and relations to the quantities they measure, used alongside the other OBO ontologies (Wikipedia describes ontologies as formal definitions of categories and relations). Clinical tables mix days and months, milligrams and milligrams per square metre; recording the unit code at ingest is what stops a survival time in months being read as days.",
    terms: ["hpo", "provenance-fields", "tpm-fpkm-counts"] }),
  t({ id: "rxnorm", name: "RxNorm drug nomenclature", category: TX, aka: ["RxNorm", "RxNorm code", "RxCUI", "RxNorm concept", "normalised drug names"],
    wikipedia: W("RxNorm"), links: [{ label: "RxNorm (US National Library of Medicine)", url: "https://www.nlm.nih.gov/research/umls/rxnorm/index.html" }], cansim: "/terms/rxnorm",
    tldr: "RxNorm is the US National Library of Medicine's standard list of drug names and codes, linking brand, generic and dose forms so that the same medicine is recognised across records.",
    summary: "RxNorm is a US terminology containing all medications on the US market, part of the Unified Medical Language System and maintained by the National Library of Medicine (Wikipedia). Each concept (RxCUI) ties together ingredient, strength, dose form and brand, and maps to other drug vocabularies such as NDC codes and, through UMLS, to NCIt. Treatment histories drawn from electronic records need it to turn free-text drug names into features.",
    terms: ["ncit", "ehr-text-pathology-reports"] }),
  t({ id: "ajcc-stage", name: "AJCC stage (TNM staging manual)", category: PATH, aka: ["AJCC stage", "AJCC staging", "AJCC 8th edition", "AJCC TNM", "pathologic stage", "clinical stage"],
    links: [{ label: "American Joint Committee on Cancer (American College of Surgeons)", url: "https://www.facs.org/quality-programs/cancer-programs/american-joint-committee-on-cancer/" }, { label: "Wikipedia: cancer staging", url: W("Cancer_staging") }], cansim: "/terms/ajcc-stage",
    tldr: "AJCC stage is the stage group (I to IV) assigned from the TNM manual published by the American Joint Committee on Cancer; it is the staging most clinical tables record.",
    summary: "Cancer staging determines how far a cancer has grown and spread, assigning a number from I to IV from tumour size, invasion, nodes and metastasis (Wikipedia). The American Joint Committee on Cancer, housed at the American College of Surgeons, publishes the TNM staging manual (currently the eighth edition, with a ninth edition rolling out by disease site) used in the United States and, jointly with the UICC, worldwide. Editions change the definitions, so a stage III in a 2005 cohort and in a 2020 cohort are not identical variables.",
    terms: ["tnm-staging", "grade-vs-stage", "clinical-covariates", "staging-systems"] }),
  t({ id: "tcga-barcode", wikipediaChecked: "2026-09-25", name: "TCGA barcode", category: GEN, aka: ["TCGA barcode", "TCGA barcodes", "TCGA sample barcode", "TCGA patient barcode", "TCGA-XX-XXXX"],
    links: [{ label: "GDC documentation: TCGA barcode", url: "https://docs.gdc.cancer.gov/Encyclopedia/pages/TCGA_Barcode/" }], cansim: "/terms/tcga-barcode",
    tldr: "A TCGA barcode such as TCGA-A1-A0SB-01A-11R-A144-07 encodes the project, tissue source site, patient, sample type, vial, portion, analyte, plate and centre, and is the key that joins one patient's data files.",
    summary: "The GDC encyclopedia describes the TCGA barcode as the identifier built from a series of metadata values: project, tissue source site, participant, sample (01 primary tumour, 11 normal), vial, portion, analyte (D for DNA, R for RNA), plate and sequencing centre. The first twelve characters identify the patient and are the join key between expression, mutation, methylation and clinical tables; a tumour and its matched normal share them. The GDC now assigns UUIDs as well, and mixing the two is a common join error.",
    terms: ["tcga-tiers", "provenance-fields"], related: ["tcga-gdc"] }),
  t({ id: "provenance-fields", name: "Provenance fields for research data", category: GEN, aka: ["provenance fields", "data provenance", "data lineage", "pipeline version", "source accession", "checksum", "sha256 manifest", "content-addressed storage"],
    wikipedia: W("Data_lineage"), links: [{ label: "Wikipedia: content-addressable storage", url: W("Content-addressable_storage") }], cansim: "/terms/provenance-fields",
    tldr: "Provenance fields record where each data file came from and how it was processed (source, accession, pipeline version, genome build, date, checksum), so a result can be traced and reproduced.",
    summary: "Data lineage is the tracking of how data is generated, transformed and used across systems, documenting its origins and movements so errors can be traced (Wikipedia). For genomic data the minimum fields are the source dataset and accession, the pipeline and its version, the genome build and annotation release, the download date and a checksum. Content-addressable storage takes the last step further by keying each raw file on the hash of its contents, so the same bytes are stored once and any change is detected (Wikipedia).",
    terms: ["genome-builds", "ensembl-gene-id", "tcga-barcode", "reproducibility"] }),

  // ---- Cancer subtype vocabulary that lacked a home ----
  t({ id: "desmoplastic-stroma-rich", name: "Stroma-rich and desmoplastic tumours in molecular data", category: PATH, aka: ["stroma-rich tumours", "stroma-rich tumour", "desmoplastic tumours", "desmoplastic tumour", "high stromal content"],
    wikipedia: W("Tumor_microenvironment"), cansim: "/terms/stroma-rich-desmoplastic-tumours",
    tldr: "Some cancers, pancreatic cancer above all, are mostly dense scar-like stroma with few tumour cells; their bulk molecular profiles are dominated by that stroma.",
    summary: "The tumour microenvironment is the ecosystem of cancer cells, stromal tissue and extracellular matrix around a tumour (Wikipedia), and in desmoplastic tumours the stromal fibroblasts and matrix are the majority of the tissue. Bulk RNA, protein and methylation measurements on such samples have low purity, their mRNA-protein concordance is depressed, and expression-based subtypes can flip depending on how much stroma the biopsy caught. OnCo's desmoplasia term covers the biology; this entry covers the consequence for data.",
    terms: ["desmoplasia", "tumour-purity", "cell-composition-confound"], pathways: ["caf-activation-desmoplasia"], cancers: ["pancreatic"] }),

  // ---- Hub ----
  {
    id: CANSIM_HUB, kind: "term", name: "Cancer AI vocabulary (CanSim terms map)", category: "Methods and models", asOf: CANSIM_ASOF,
    aka: ["cancer AI vocabulary", "CanSim terms map", "CanSim terms", "methods and models glossary"],
    tldr: "A hub for the vocabulary of cancer AI: the assays and cohorts models train on, the machine-learning and statistics terms in their papers, the standards their data must follow and the licences that govern reuse.",
    summary: `OnCo added this vocabulary on 24 September 2026 from the CanSim terms map, an open list of the terms an open, public-data-first cancer foundation-model programme found itself explaining. The oncology half (assays, data modalities, standards, access rules, clinical concepts) sits in the canonical glossary categories; the methods half sits under Methods and models. Every term paraphrases the page it links, states why a reader meets it in cancer papers, and carries the attribution below. Terms that were only CanSim result names with no general meaning were left out and are listed in docs/CANCERSIM-TERMS-GAP.md. Attribution: ${CANSIM_ATTRIBUTION}.`,
    notes: ["Research vocabulary, not clinical advice: models and metrics described here are research tools unless a page says a product is cleared or approved."],
    provenance: { editedBy: "OnCo CanSim terms wave", editedOn: CANSIM_ASOF, note: CANSIM_ATTRIBUTION }, tags: ["cansim-terms", "hub"],
    // Every record of both files, so each has a way in from the glossary and none is an orphan.
    terms: [] as string[],
    technologies: ["pathology-foundation-model", "ai-compute-platforms", "rna-seq", "single-cell-spatial", "digital-pathology-ai"],
    related: ["idea-multimodal-foundation-model", "idea-data-open-cell-foundation-model", "tcga-gdc", "cptac", "depmap", "cellxgene-hca"],
  },
];

// The hub lists every record of this file (terms-cansim-methods.ts appends its own), so none is an orphan.
{
  const hub = cansimOncologyTerms.find((x) => x.id === CANSIM_HUB)!;
  hub.terms = cansimOncologyTerms.map((x) => x.id).filter((id) => id !== CANSIM_HUB);
}

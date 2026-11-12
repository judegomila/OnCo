import type { EntityInput, IdeaInput, PathwayInput, TermInput } from "@/lib/schema";

/**
 * Mechanism research: the biology behind the drugs. Pathway-kind entities draw the processes
 * (metastasis, microenvironment, metabolism, genome instability, plasticity, dormancy…), term-kind
 * entities define the Hallmarks of Cancer (Hanahan 2022) and core mechanism vocabulary, and idea-kind
 * entities state the biggest open mechanistic questions with a proposed test.
 *
 * Sources are linked per entity; leading labs and programmes are listed in `notes` and linked via
 * `institutions` (people are owned by another file). Node coordinates are on a 0-100 grid.
 */
const asOf = "2026-09-08";
const W = (s: string) => `https://en.wikipedia.org/wiki/${s}`;
type P = Omit<PathwayInput, "kind" | "asOf"> & { asOf?: string };
type T = Omit<TermInput, "kind" | "asOf" | "category"> & { category?: string; asOf?: string };
type I = Omit<IdeaInput, "kind" | "asOf">;
const p = ({ asOf: checked = asOf, ...x }: P): PathwayInput => ({ kind: "pathway", asOf: checked, ...x });
const t = ({ category = "Cancer biology", ...x }: T): TermInput => ({ kind: "term", asOf, category, ...x });
const i = (x: I): IdeaInput => ({ kind: "idea", asOf, ...x });
const HALLMARKS_2022 = { label: "Hanahan, Hallmarks of Cancer: New Dimensions (Cancer Discovery 2022)", url: "https://doi.org/10.1158/2159-8290.CD-21-1059" };

// ============================================================================================
// PATHWAYS / PROCESSES
// ============================================================================================
const pathways: PathwayInput[] = [
  p({
    id: "metastatic-cascade", name: "The metastatic cascade", wikipedia: W("Metastasis"),
    tldr: "How cancer spreads: cells leave the tumour, squeeze into blood or lymph vessels, survive the journey, exit into a new organ, often sleep there for years, and finally grow. Metastasis causes about 90% of cancer deaths.",
    summary: "Invasion (EMT, matrix proteases), intravasation, survival in circulation as CTCs or clusters (platelet cloaking, anoikis resistance), arrest and extravasation, then colonisation, which is the rate-limiting step: most disseminated tumour cells (DTCs) die or stay dormant. Organ tropism follows Paget's seed-and-soil: pre-metastatic niches are prepared by tumour-derived exosomes and myeloid cells. Clinically, ctDNA and MRD assays detect the cascade before imaging; adjuvant therapy targets it blind; no drug specifically blocks colonisation yet.",
    analogy: "A seed leaving a plant: it must detach, ride the wind, land somewhere with the right soil, survive the winter, and only then sprout. Almost every seed fails; the few that grow are the metastases.",
    nodes: [
      { id: "primary", label: "Primary tumour", x: 8, y: 50 }, { id: "emt", label: "Invasion (EMT, MMPs)", x: 22, y: 50 }, { id: "intra", label: "Intravasation", x: 36, y: 50 },
      { id: "ctc", label: "CTCs in circulation", x: 50, y: 50 }, { id: "extra", label: "Extravasation", x: 64, y: 50 }, { id: "dtc", label: "DTC dormancy", x: 78, y: 35 },
      { id: "colon", label: "Colonisation / macrometastasis", x: 92, y: 60 }, { id: "niche", label: "Pre-metastatic niche (exosomes, myeloid cells)", x: 64, y: 82 }, { id: "immune", label: "NK / T-cell clearance", x: 50, y: 18 },
    ],
    edges: [
      { from: "primary", to: "emt" }, { from: "emt", to: "intra" }, { from: "intra", to: "ctc" }, { from: "ctc", to: "extra" }, { from: "extra", to: "dtc" }, { from: "dtc", to: "colon" }, { from: "extra", to: "colon" },
      { from: "primary", to: "niche" }, { from: "niche", to: "colon" }, { from: "immune", to: "ctc", type: "inhibits" }, { from: "immune", to: "dtc", type: "inhibits" },
    ],
    interventions: ["Adjuvant systemic therapy and ctDNA-guided escalation aim at DTCs before colonisation", "Anti-EMT and anti-MMP drugs failed historically; TGF-β blockade is being retried in combinations", "Dormancy-maintaining strategies (see tumour dormancy) are the newest idea", "Metastasis-directed SBRT for oligometastatic disease"],
    pathways: ["emt", "tumor-dormancy", "tumor-microenvironment", "clonal-evolution"], technologies: ["mrd-testing", "liquid-biopsy", "sbrt", "single-cell-spatial"], terms: ["mrd", "ctdna", "oligometastatic", "disseminated-tumor-cells"],
    institutions: ["mskcc", "francis-crick", "cold-spring-harbor", "dkfz"],
    notes: ["Leading programmes: Massagué lab (MSK) on metastasis-initiating cells and dormancy; Swanton/TRACERx (Crick) on evolution and dissemination timing; Egeblad (CSHL) on neutrophils and dormancy awakening; DKFZ Metastasis Research.", "Massagué & Ganesh, Cancer Cell 2023 review: https://doi.org/10.1016/j.ccell.2023.02.020"],
    links: [{ label: "Massagué & Obenauf, Metastatic colonization by circulating tumour cells (Nature 2016)", url: "https://doi.org/10.1038/nature17038" }, { label: "Gerstberger, Jiang & Ganesh, Metastasis (Cell 2023)", url: "https://doi.org/10.1016/j.cell.2023.03.003" }],
    tags: ["mechanism"],
  }),
  p({
    id: "tumor-microenvironment", related: [
  "theories-of-cancer",
  "microenvironment-inflammation-theory",
  "tissue-organisation-field-theory",
  "extracellular-matrix"
], keyPapers: ["paper-quail-joyce-microenvironment-metastasis-natmed-2013"], name: "Tumour microenvironment (TME)", wikipedia: W("Tumor_microenvironment"),
    tldr: "A tumour’s surroundings include cells, vessels, matrix and local conditions. Their presence or location alone does not establish how they affect the cancer or its treatment.",
    summary: "Cancer cells interact with neighbouring immune and stromal cells, vessels, extracellular material and physical conditions. These interactions vary across sites, regions and time and can have different consequences. Composition, position, molecular programs and demonstrated function are separate layers of evidence.",
    analogy: "A castle under siege from the inside: the cancer conscripts the town's builders (fibroblasts) to raise walls, bribes the guards (macrophages) to look away, and diverts the water supply (vessels) so that reinforcements (T cells, drugs) never arrive.",
    nodes: [
      { id: "tumour", label: "Tumour cells", x: 50, y: 50 }, { id: "caf", label: "CAFs (FAP+)", x: 20, y: 30, targetId: "fap" }, { id: "tam", label: "TAMs (CSF1R, CD47 axis)", x: 80, y: 30, targetId: "cd47" },
      { id: "mdsc", label: "MDSCs", x: 80, y: 70 }, { id: "treg", label: "Tregs (CTLA-4)", x: 62, y: 85, targetId: "ctla4" }, { id: "cd8", label: "Exhausted CD8 T cells (PD-1)", x: 38, y: 85, targetId: "pd1" },
      { id: "vessel", label: "Abnormal vessels (VEGF)", x: 20, y: 70, targetId: "vegf" }, { id: "ecm", label: "Stiff ECM / desmoplasia", x: 8, y: 50 }, { id: "nerve", label: "Nerves", x: 92, y: 50 },
    ],
    edges: [
      { from: "tumour", to: "caf" }, { from: "caf", to: "ecm" }, { from: "ecm", to: "cd8", type: "inhibits" }, { from: "tumour", to: "vessel" }, { from: "vessel", to: "cd8", type: "inhibits" },
      { from: "tumour", to: "tam" }, { from: "tam", to: "cd8", type: "inhibits" }, { from: "mdsc", to: "cd8", type: "inhibits" }, { from: "treg", to: "cd8", type: "inhibits" }, { from: "cd8", to: "tumour", type: "inhibits" }, { from: "nerve", to: "tumour" }, { from: "caf", to: "tumour" },
    ],
    interventions: ["Checkpoint blockade (PD-1, CTLA-4, LAG-3) releases exhausted T cells", "Anti-VEGF normalises vessels and improves infiltration", "FAP-targeted imaging and radioligands attack CAFs", "CSF1R, CD47/SIRPα, CXCR4, TGF-β, adenosine (A2A/CD73) agents target myeloid and stromal suppression; most have been modest so far", "Radiation and oncolytic viruses convert excluded tumours"],
    pathways: ["pd1-checkpoint", "vegf-angiogenesis", "cgas-sting", "emt", "cancer-neuroscience", "inflammation-nfkb"], targets: ["fap", "pd1", "ctla4", "vegf", "cd47"], technologies: ["single-cell-spatial", "fapi-pet", "checkpoint-inhibitor", "antiangiogenic"], terms: ["cold-vs-hot", "tils", "cancer-associated-fibroblasts", "tumor-associated-macrophages", "myeloid-derived-suppressor-cells", "immune-exclusion"],
    institutions: ["mskcc", "md-anderson", "cold-spring-harbor", "dana-farber", "institut-curie"],
    notes: [
  "Leading programmes: Tuveson (CSHL) on CAF subtypes; Sahai (Crick) and Mechta-Grigoriou (Institut Curie) on fibroblast heterogeneity; Joyce (Ludwig Lausanne) on TAMs; MD Anderson and MSK spatial atlases; Human Tumor Atlas Network (NCI).",
  "The tumour microenvironment includes neighbouring cells, extracellular material, vessels and local physical conditions. A neighbouring cell need not belong to the malignant clone. Cell populations, cytokines and chemokines, matrix, oxygen, nutrients and waste interact in both directions, and their arrangement varies between regions, disease sites and times. A drawing is a map of possible participants, not a measured recipe or a fixed job description.",
  "Keren used multiplexed protein imaging in 41 human triple-negative breast cancers to describe composition and spatial organisation. This is observational evidence. Salmon used viable human lung-tumour slices to investigate matrix and T-cell movement, including a perturbation. The two designs answer different questions, and neither makes stromal removal a universal treatment instruction. Presence or proximity alone does not demonstrate signalling, recognition, killing or suppression.",
  "Retain site, date, treatment, region and denominator: cells per area differs from a fraction of detected cells. Selected-protein imaging, spatial RNA capture with cell assignment and a controlled functional experiment are different outputs. Segmentation can misassign boundaries and dissociation changes which cells are recovered. There is no universal TME score that establishes treatment benefit.",
  "In a fictional macrophage-rich region with inflammatory RNA, composition and expression are observed. The result does not identify every RNA signal’s cellular source, demonstrate macrophage suppression or select the best treatment. A workflow through cells, locations, vessels, matrix and conditions orders questions; it is not a causal chain from cell counts to immune function."
],
    links: [
  {
    "label": "de Visser & Joyce, The evolving tumor microenvironment (Cancer Cell 2023)",
    "url": "https://doi.org/10.1016/j.ccell.2023.02.016"
  },
  {
    "label": "Human Tumor Atlas Network",
    "url": "https://humantumoratlas.org"
  },
  {
    "label": "Keren et al., A Structured Tumor-Immune Microenvironment in Triple Negative Breast Cancer Revealed by Multiplexed Ion Beam Imaging. (2018)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/30193111/"
  },
  {
    "label": "Salmon et al., Matrix architecture defines the preferential localization and migration of T cells into the stroma of human lung tumors. (2012)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22293174/"
  }
],
    tags: ["mechanism"],

"asOf": "2026-11-10"
}),
  p({
    id: "antigen-presentation-immunoediting", name: "Antigen presentation & immune editing", wikipedia: W("Immunoediting"),
    tldr: "How the immune system sees cancer, and how cancer learns to hide. Tumours display fragments of their proteins on MHC molecules; T cells kill the ones they recognise; the survivors are the ones that stopped showing fragments or switched on brakes.",
    summary: "Proteasome-processed peptides are loaded on MHC class I (HLA-A/B/C, B2M) and presented to CD8 T cells; dendritic cells cross-present tumour antigens in lymph nodes. Immunoediting proceeds through elimination, equilibrium, and escape: loss of B2M or HLA, JAK1/2 or IFNGR mutations (blunting interferon-γ response), antigen loss, PD-L1 induction, and immunosuppressive niches. Neoantigen quality, not just quantity, predicts response; HLA genotype shapes which mutations are visible. Escape variants explain acquired resistance to checkpoint blockade and CAR-T (CD19 loss).",
    analogy: "Wanted posters: the cell pins fragments of everything it makes onto its surface. Immune police recognise criminals' faces. Cancers that survive have taken down the posters (lost MHC) or bribed the police (checkpoints).",
    nodes: [
      { id: "prot", label: "Proteasome → peptides", x: 15, y: 30 }, { id: "tap", label: "TAP transport", x: 35, y: 30 }, { id: "mhc", label: "MHC-I / B2M loading", x: 55, y: 30 }, { id: "surf", label: "Peptide-MHC on surface", x: 75, y: 30 },
      { id: "tcr", label: "CD8 T cell (TCR)", x: 75, y: 65, targetId: "cd3" }, { id: "ifn", label: "IFN-γ → JAK1/2 → STAT1", x: 45, y: 65 }, { id: "pdl1", label: "PD-L1 induction", x: 25, y: 85, targetId: "pdl1" },
      { id: "dc", label: "Dendritic cell cross-presentation", x: 92, y: 50 }, { id: "escape", label: "Escape: B2M/HLA loss, JAK mutation", x: 15, y: 60 },
    ],
    edges: [
      { from: "prot", to: "tap" }, { from: "tap", to: "mhc" }, { from: "mhc", to: "surf" }, { from: "surf", to: "tcr" }, { from: "dc", to: "tcr" }, { from: "tcr", to: "ifn" }, { from: "ifn", to: "mhc" }, { from: "ifn", to: "pdl1" }, { from: "pdl1", to: "tcr", type: "inhibits" }, { from: "escape", to: "mhc", type: "inhibits" }, { from: "escape", to: "ifn", type: "inhibits" },
    ],
    interventions: ["Checkpoint inhibitors; personalised neoantigen vaccines (intismeran) supply antigen; T-cell engagers and CAR-T bypass MHC entirely", "TCR-T and ImmTACs (tebentafusp) target intracellular antigens via peptide-HLA", "Epigenetic drugs and interferon can re-express MHC; MHC-independent NK-cell therapies address MHC-loss escape"],
    pathways: ["pd1-checkpoint", "cgas-sting", "jak-stat"], targets: ["pd1", "pdl1", "cd3", "gp100", "mage-a4", "prame", "hla-a"], technologies: ["neoantigen-mrna-vaccine", "tcr-t", "t-cell-engager", "car-t", "car-nk-macrophage", "checkpoint-inhibitor"], terms: ["neoantigen", "hla-a02-restriction", "tmb", "cold-vs-hot", "avoiding-immune-destruction"],
    institutions: ["wustl-siteman", "mskcc", "nci", "johns-hopkins"],
    notes: ["Leading programmes: Schreiber (WashU) coined immunoediting; Chan and Ribas on neoantigen quality and escape (MSK, UCLA); NCI Surgery Branch on neoantigen-reactive T cells; Balachandran (MSK) on long-term vaccine responders."],
    links: [{ label: "Schreiber, Old & Smyth, Cancer immunoediting (Science 2011)", url: "https://doi.org/10.1126/science.1203486" }, { label: "Zaretsky et al., Mutations associated with acquired resistance to PD-1 blockade (NEJM 2016)", url: "https://doi.org/10.1056/NEJMoa1604958" }],
    tags: ["mechanism"],
  }),
  p({
    id: "cancer-metabolism", name: "Cancer metabolism", wikipedia: W("Warburg_effect_(oncology)"),
    tldr: "Cancer cells rewire how they eat. They burn glucose inefficiently but fast (the Warburg effect), gorge on glutamine and fats, and build the nucleotides and lipids needed to divide. This is why the FDG PET scan works, and why metabolism is a drug target.",
    summary: "Oncogenic signalling (PI3K/AKT/mTOR, MYC, HIF) drives aerobic glycolysis and lactate export, glutaminolysis for TCA anaplerosis, de novo lipogenesis (FASN, SCD), and one-carbon metabolism (SHMT, MTHFD2) for nucleotides and methylation. Mutant IDH1/2 produce the oncometabolite 2-HG. Metabolic plasticity lets tumours switch fuels, which is why single-target metabolic drugs (glutaminase inhibitor telaglenastat, negative in RCC) disappoint. Approved metabolic drugs are antimetabolite chemotherapies and IDH inhibitors; arginine deprivation (ADI-PEG20) is in phase 3 in mesothelioma. Diet interventions (fasting-mimicking, ketogenic) are in trials as adjuncts.",
    analogy: "A factory that switches from a clean, efficient power plant to burning everything it can find, fast and dirty, because speed matters more than efficiency when you are building a new factory every day.",
    nodes: [
      { id: "glc", label: "Glucose (GLUT1)", x: 10, y: 25 }, { id: "glyc", label: "Aerobic glycolysis (Warburg)", x: 30, y: 25 }, { id: "lac", label: "Lactate export (MCT4)", x: 50, y: 10 }, { id: "tca", label: "TCA cycle", x: 50, y: 50 },
      { id: "gln", label: "Glutamine → glutaminase", x: 10, y: 65 }, { id: "lipid", label: "De novo lipogenesis (FASN)", x: 75, y: 30 }, { id: "onec", label: "One-carbon (SHMT2, MTHFD2) → nucleotides", x: 75, y: 70 },
      { id: "idh", label: "Mutant IDH → 2-HG", x: 30, y: 85, targetId: "idh" }, { id: "sig", label: "PI3K/AKT/mTOR, MYC, HIF", x: 92, y: 50 },
    ],
    edges: [
      { from: "glc", to: "glyc" }, { from: "glyc", to: "lac" }, { from: "glyc", to: "tca" }, { from: "gln", to: "tca" }, { from: "tca", to: "lipid" }, { from: "glyc", to: "onec" }, { from: "tca", to: "idh" }, { from: "sig", to: "glyc" }, { from: "sig", to: "lipid" }, { from: "sig", to: "onec" },
    ],
    interventions: ["Antimetabolite chemotherapy (5-FU, gemcitabine, methotrexate) exploits nucleotide demand", "IDH inhibitors (ivosidenib, vorasidenib) block 2-HG", "Glutaminase, MCT1, FASN, and arginine-deprivation agents in trials", "FDG PET images the Warburg effect", "Diet and metformin trials as adjuncts"],
    pathways: ["pi3k-akt-mtor", "myc", "hif-vhl"], targets: ["idh", "pik3ca", "hif2a"], drugs: ["ivosidenib", "vorasidenib"], technologies: ["fdg-pet", "cytotoxic-chemotherapy"], terms: ["warburg-effect", "deregulating-cellular-energetics", "suv"],
    institutions: ["mskcc", "md-anderson", "penn-abramson", "francis-crick"],
    notes: ["Leading programmes: Thompson (MSK) and Vander Heiden (MIT/Koch) on metabolic dependencies; DeBerardinis (UTSW) on in vivo metabolism; Rabinowitz (Princeton/Ludwig) on nutrient flux."],
    links: [{ label: "Pavlova, Zhu & Thompson, The hallmarks of cancer metabolism (Cell Metabolism 2022)", url: "https://doi.org/10.1016/j.cmet.2022.01.007" }],
    tags: ["mechanism"],
  }),
  p({
    id: "replication-stress", name: "DNA replication stress", wikipedia: W("Replication_stress"),
    tldr: "Replication stress means difficulty copying DNA. Slowed forks, damage responses and dependence on a checkpoint are different observations.",
    summary: "Replication stress concerns difficulty copying DNA, including slow or stalled forks. A stalled fork can be protected and restart; it is not automatically a broken chromosome. Checkpoint activation, recovery, incomplete copying, damage and death are separate stages and measurements. High checkpoint-gene RNA or rapid proliferation alone does not establish fork stress, dependence or drug sensitivity.\n\nRPA coats exposed single-stranded DNA and helps recruit ATR through ATRIP, initiating checkpoint signaling in biochemical and cellular experiments. Activated H-Ras in normal human-cell models produced hyper-replication before damage signaling and senescence. Bester studied HPV E6/E7 or cyclin-E-driven models in which nucleotide limitation disturbed replication and nucleoside supplementation in culture improved dynamics. These experiments do not recommend supplements or predict the behavior of every oncogene-bearing tumor.\n\nIn a fictional DNA-combing exercise, live cells receive a 30-minute IdU pulse followed by a 30-minute CldU pulse. At the stated example stretching calibration of 2 kilobases per micrometre, a 7.5-micrometre second track represents 15 kilobases copied in 30 minutes, or 0.5 kilobases per minute; a 15-micrometre track gives 1 kilobase per minute. Bester used those pulse times and calibration, but these example lengths are not that study's results and the calibration is not universal.\n\nDNA-fiber measurements require viable cells that incorporate labels; extraction destroys sampled cells. Ordinary fixed pathology cannot retrospectively supply live-label tracks. Document pulse timing, labeling, stretching, track selection, cell-cycle distribution, model and comparison group. A lower population S-phase fraction is distinct from the speed of one selected molecule. Track length alone establishes neither the cause, breaks, restart nor death; checkpoint dependence needs a targeted perturbation and a separate functional outcome, without a universal patient-positive cutoff.",
    analogy: "A copying machine can pause and recover, or remain stalled. Measuring the pause, the response and the final result answers different questions.",
    nodes: [
      { id: "onc", label: "Oncogenes (MYC, cyclin E, RAS)", x: 15, y: 20, targetId: "kras" }, { id: "origin", label: "Excess origin firing, short G1", x: 45, y: 20 }, { id: "fork", label: "Stalled forks, ssDNA gaps", x: 75, y: 20 },
      { id: "atr", label: "ATR → CHK1", x: 75, y: 55, targetId: "atr" }, { id: "wee1", label: "WEE1 / PKMYT1 restrain CDK1", x: 45, y: 55, targetId: "wee1" }, { id: "g2m", label: "G2/M checkpoint", x: 15, y: 55 },
      { id: "collapse", label: "Fork collapse → DSBs", x: 75, y: 88 }, { id: "mitosis", label: "Mitotic catastrophe", x: 30, y: 88 }, { id: "p53", label: "TP53 (lost)", x: 92, y: 55, targetId: "tp53" },
    ],
    edges: [
      { from: "onc", to: "origin" }, { from: "origin", to: "fork" }, { from: "fork", to: "atr" }, { from: "atr", to: "wee1" }, { from: "wee1", to: "g2m" }, { from: "atr", to: "origin", type: "inhibits" }, { from: "fork", to: "collapse" }, { from: "atr", to: "collapse", type: "inhibits" }, { from: "g2m", to: "mitosis", type: "inhibits" }, { from: "p53", to: "g2m" },
    ],
    interventions: ["ATR inhibitors (ceralasertib, camonsertib) alone and with PARP inhibitors or IO", "WEE1 (azenosertib) and PKMYT1 (lunresertib) inhibitors in CCNE1-amplified and TP53-mutant tumours", "PARP inhibitors trap forks in HRD tumours (see DDR)", "Gemcitabine and other antimetabolites are classical replication-stress inducers"],
    pathways: ["ddr", "p53-cell-cycle", "myc"], targets: ["atr", "wee1", "tp53", "parp"], technologies: ["synthetic-lethality-approaches", "parp-inhibitor"], terms: ["synthetic-lethality", "genome-instability-mutation"],
    institutions: ["icr-london", "dana-farber", "nki", "francis-crick"],
    notes: ["Leading programmes: Zou (MGH/Duke) and Cimprich (Stanford) on replication-stress signalling; ICR and Dana-Farber early-phase ATR/WEE1 programmes; NKI on CCNE1 dependencies."],
    links: [
  {
    "label": "Saxena & Zou, Hallmarks of DNA replication stress (Molecular Cell 2022)",
    "url": "https://doi.org/10.1016/j.molcel.2022.05.004"
  },
  {
    "label": "Sensing DNA damage through ATRIP recognition of RPA-ssDNA complexes. (2003; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/12791985/"
  },
  {
    "label": "Oncogene-induced senescence is a DNA damage response triggered by DNA hyper-replication. (2006; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/17136094/"
  },
  {
    "label": "Nucleotide deficiency promotes genomic instability in early stages of cancer development. (2011; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/21529715/"
  }
],
    tags: ["mechanism"],

"asOf": "2026-11-10"
}),
  p({
    id: "chromosomal-instability", name: "Chromosomal instability & aneuploidy", wikipedia: W("Chromosome_instability"),
    tldr: "Most cancers have the wrong number of chromosomes and keep shuffling them at every division. This chaos fuels evolution and drug resistance, but it also stresses the cell and can trigger immune alarms, a double edge that researchers are trying to exploit.",
    summary: "Chromosomal instability (CIN) arises from mitotic errors, whole-genome doubling, replication stress, and centrosome amplification; it produces aneuploidy, micronuclei, chromothripsis, and ecDNA (extrachromosomal oncogene amplicons). Consequences: intratumour heterogeneity and rapid adaptation (TRACERx), cytosolic DNA that activates cGAS-STING (immunogenic in bursts, tolerated chronically via non-canonical NF-κB), and proteotoxic and metabolic stress that creates dependencies (KIF18A, spindle assembly checkpoint, BCL-XL). CIN is a poor-prognosis marker across cancers; ecDNA drives resistance to targeted therapy in glioblastoma and others.",
    analogy: "Chromosomal instability is a library that reshuffles and duplicates random shelves every night. Most rearrangements are useless, some ruin the building, but occasionally one yields a book the librarian needs to survive a new rule, and the mess itself keeps the fire alarms twitching.",
    nodes: [
      { id: "mitosis", label: "Mitotic errors, WGD", x: 15, y: 25 }, { id: "cin", label: "Chromosomal instability", x: 45, y: 25 }, { id: "aneu", label: "Aneuploidy / karyotype heterogeneity", x: 75, y: 25 },
      { id: "micro", label: "Micronuclei → cytosolic DNA", x: 30, y: 60 }, { id: "sting", label: "cGAS-STING", x: 30, y: 90 }, { id: "ecdna", label: "ecDNA oncogene amplification", x: 75, y: 60, targetId: "egfr" },
      { id: "evol", label: "Clonal evolution, resistance", x: 92, y: 45 }, { id: "dep", label: "Dependencies: KIF18A, SAC, BCL-XL", x: 60, y: 90 }, { id: "p53", label: "TP53 loss permits", x: 15, y: 60, targetId: "tp53" },
    ],
    edges: [
      { from: "mitosis", to: "cin" }, { from: "cin", to: "aneu" }, { from: "aneu", to: "evol" }, { from: "cin", to: "micro" }, { from: "micro", to: "sting" }, { from: "cin", to: "ecdna" }, { from: "ecdna", to: "evol" }, { from: "aneu", to: "dep" }, { from: "p53", to: "cin" },
    ],
    interventions: ["KIF18A inhibitors (sovilnesib) selectively kill CIN-high cells; phase 1/2 in ovarian and TNBC", "ecDNA-directed strategies (CHK1 inhibition, transcription-replication conflict) from the Cancer Grand Challenges eDyNAmiC team", "STING pathway modulation; radiation exploits CIN", "Aneuploidy scores (TRACERx) as prognostic biomarkers"],
    pathways: ["cgas-sting", "p53-cell-cycle", "replication-stress", "clonal-evolution"], targets: ["tp53", "egfr"], technologies: ["wes-wgs", "single-cell-spatial"], terms: ["genome-instability-mutation", "whole-genome-doubling", "mutational-signature"],
    institutions: ["francis-crick", "mskcc", "stanford", "cruk"],
    notes: ["Leading programmes: Swanton (Crick/UCL, TRACERx, CIN and immune evasion); Bakhoum (MSK, CIN-STING); Mischel (Stanford) and the eDyNAmiC Cancer Grand Challenge on ecDNA; Sheltzer (Yale) on aneuploidy dependencies."],
    links: [{ label: "Bakhoum et al., Chromosomal instability drives metastasis through a cytosolic DNA response (Nature 2018)", url: "https://doi.org/10.1038/nature25432" }, { label: "Cancer Grand Challenges eDyNAmiC team", url: "https://cancergrandchallenges.org/teams/edynamic" }],
    tags: ["mechanism"],
  }),
  p({
    id: "telomere-maintenance", name: "Telomere maintenance & replicative immortality", wikipedia: W("Telomerase"),
    tldr: "Normal cells can divide only a limited number of times because the protective caps on their chromosomes, telomeres, wear down. About 90% of cancers switch the cap-rebuilding enzyme telomerase back on, often through TERT promoter mutations, and roughly 10% use an alternative lengthening route (ALT), so they divide indefinitely; imetelstat is the first approved telomerase inhibitor.",
    summary: "About 90% of cancers reactivate telomerase (TERT), often via TERT promoter mutations (glioblastoma, melanoma, bladder, thyroid) or amplification; ~10% use alternative lengthening of telomeres (ALT) through homologous recombination, associated with ATRX/DAXX loss (sarcomas, pancreatic NETs, gliomas). Telomerase inhibition (imetelstat, an oligonucleotide) reached approval in lower-risk MDS (2024) and is in phase 3 in myelofibrosis; ALT cells are sensitive to ATR inhibition. TERT promoter mutation is a diagnostic and prognostic marker and a candidate for ctDNA detection in bladder cancer and glioma.",
    analogy: "The plastic tips on shoelaces fray a little every time you tie them; when they are gone the lace unravels and the shoe is thrown out. Cancer cells carry a machine that keeps re-tipping the laces.",
    nodes: [
      { id: "div", label: "Each division shortens telomeres", x: 15, y: 30 }, { id: "crisis", label: "Senescence / crisis", x: 45, y: 30 }, { id: "tert", label: "TERT reactivation (promoter mutation)", x: 45, y: 70 },
      { id: "alt", label: "ALT (ATRX/DAXX loss)", x: 80, y: 70 }, { id: "immortal", label: "Replicative immortality", x: 80, y: 30 }, { id: "atr", label: "ATR dependence (ALT)", x: 92, y: 90, targetId: "atr" },
    ],
    edges: [
      { from: "div", to: "crisis" }, { from: "tert", to: "crisis", type: "inhibits" }, { from: "alt", to: "crisis", type: "inhibits" }, { from: "tert", to: "immortal" }, { from: "alt", to: "immortal" }, { from: "alt", to: "atr" },
    ],
    interventions: ["Imetelstat (telomerase inhibitor) approved in MDS (2024); solid-tumour use unproven", "ATR inhibitors in ALT-positive tumours", "TERT promoter mutation as a urine/plasma biomarker (bladder, glioma)"],
    pathways: ["replication-stress", "senescence"], targets: ["atr"], terms: ["tert-promoter", "enabling-replicative-immortality"],
    institutions: ["johns-hopkins", "dana-farber", "ucsf"],
    notes: ["Leading programmes: Greider (Johns Hopkins, Nobel 2009); Meyerson (Dana-Farber) on TERT promoter genetics; Costello (UCSF) on TERT in glioma; Reddel (CMRI Sydney) on ALT."],
    links: [{ label: "Shay & Wright, Telomeres and telomerase: three decades of progress (Nature Reviews Genetics 2019)", url: "https://doi.org/10.1038/s41576-019-0099-1" }],
    tags: ["mechanism"],
  }),
  p({
    id: "autophagy", name: "Autophagy", wikipedia: W("Autophagy"),
    tldr: "Autophagy delivers cellular material for breakdown and reuse. The amount present, the rate of recycling and whether cells need it to survive are different questions.",
    summary: "Macroautophagy encloses cargo in autophagosomes for lysosomal delivery and breakdown. LC3 abundance alone cannot distinguish increased formation from reduced removal. Tandem fluorescent LC3 reporters exploit different responses to acidic and degradative conditions to examine maturation in cell experiments; interpretation requires appropriate controls. Flux and survival dependence need separate tests. In a randomised phase 2 trial of 112 people with advanced pancreatic cancer, adding hydroxychloroquine to gemcitabine and nab-paclitaxel did not improve the primary endpoint of survival at 12 months. A drug trial does not by itself establish selective autophagy dependence in a tumour.",
    analogy: "A besieged city that starts recycling furniture into firewood. It keeps the lights on through the siege, and burning the 'wanted posters' (MHC) hides its criminals too.",
    nodes: [
  {
    "id": "stress",
    "label": "Defined nutrient or drug stress",
    "x": 15,
    "y": 30,
    "targetId": "kras"
  },
  {
    "id": "ulk",
    "label": "ULK1 / AMPK",
    "x": 40,
    "y": 30
  },
  {
    "id": "mtor",
    "label": "mTORC1 (inhibits)",
    "x": 40,
    "y": 70
  },
  {
    "id": "phag",
    "label": "Autophagosome",
    "x": 65,
    "y": 30
  },
  {
    "id": "lys",
    "label": "Lysosomal delivery and breakdown",
    "x": 85,
    "y": 30
  },
  {
    "id": "fuel",
    "label": "Reused building blocks; test survival",
    "x": 85,
    "y": 70
  },
  {
    "id": "mhc",
    "label": "MHC-I degradation (PDAC)",
    "x": 65,
    "y": 90
  }
],
    edges: [
      { from: "stress", to: "ulk" }, { from: "mtor", to: "ulk", type: "inhibits" }, { from: "ulk", to: "phag" }, { from: "phag", to: "lys" }, { from: "lys", to: "fuel" }, { from: "lys", to: "mhc" },
    ],
    interventions: [
  "Clinical drug studies and mechanistic dependence tests answer different questions.",
  "Assess flux, selected cargo and survival separately with complementary controls."
],
    pathways: ["ras-mapk", "pi3k-akt-mtor", "cancer-metabolism", "antigen-presentation-immunoediting"], targets: ["kras"], cancers: ["pancreatic"], technologies: ["kras-inhibitors"],
    institutions: ["penn-abramson", "cold-spring-harbor"],
    notes: [
  "Leading programmes: Amaravadi (Penn) on autophagy inhibition trials; Kimmelman (NYU) on PDAC autophagy and MHC-I; Der (UNC) on KRAS/autophagy.",
  "Macroautophagy encloses cargo in a double-membrane autophagosome, delivers it through lysosomal fusion and degrades it for reuse. Formation, delivery and breakdown are separate steps; not all lysosomal processes use autophagosomes. Active recycling often supports stress adaptation, whereas autophagy-dependent death requires causal evidence implicating the machinery.",
  "A completed macroautophagosome has separate inner and outer membranes, with space between them. When it fuses with a lysosome, the outer membrane joins the lysosomal boundary, while the inner membrane is degraded before enzymes gain access to the enclosed cargo. Itakura and colleagues located syntaxin 17 on completed autophagosomes, and Tsuboyama and colleagues found that loss of ATG conjugation systems markedly delayed inner-membrane degradation even when fusion occurred. A direct-fusion sketch omits intermediate endosomal interactions described in multicellular organisms; it is not the complete route taken by every compartment.",
  "Product return has evidence in defined systems. In leucine-starved cultured human HEK-293T cells, Wyant and colleagues found that SLC38A9 was needed for leucine made by lysosomal protein breakdown to reach the cytosol; the response also depended on the autophagy protein ATG7. Abu-Remaileh and colleagues measured regulated lysosomal amino-acid exchange in mammalian cells. Yeast experiments identified Atg22, Avt3 and Avt4 as partially redundant vacuolar amino-acid exporters. These results support amino-acid recycling in those systems, without establishing transport of every breakdown product, secretion from the cell or guaranteed growth.",
  "More lipidated LC3-II can reflect greater formation or slower removal. A controlled short lysosomal block and complementary tandem fluorescent LC3 reporter can help examine turnover and delivery to acidic compartments. Equal starting amounts can have different later fates. Little additional accumulation can reflect a late block, low formation or an unsuitable window; it does not establish dependence.",
  "Flux, selected-cargo clearance and survival dependence are different claims. NBR1 experiments identify selective ubiquitinated-cargo handling, not a universal LC3 cargo census. Use time courses, viable-cell normalisation, verified lysosomal inhibition and independent perturbations; autophagy proteins can have other functions. Lower mTOR signalling can change initiation without guaranteeing completed degradation. Typical research outputs include normalised LC3-II band intensity, reporter compartments per cell and selected-cargo disappearance over time. Tested cultures are consumed or perturbed, and prolonged lysosomal inhibition can itself disturb the system. No universal LC3 or flux cutoff selects treatment.",
  "In Karasic and colleagues' randomised phase 2 study of 112 people with advanced pancreatic cancer, adding hydroxychloroquine to gemcitabine and nab-paclitaxel increased response rate but did not improve the primary endpoint of survival at 12 months. Response was 38.2% versus 21.1%; 12-month survival was 41% versus 49%. These group results do not show selective autophagy dependence or recommend this combination."
],
    links: [
  {
    "label": "Primary source, PMID 17534139",
    "url": "https://pubmed.ncbi.nlm.nih.gov/17534139/"
  },
  {
    "label": "Primary source, PMID 31120501",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31120501/"
  },
  {
    "label": "Yamamoto et al., Autophagy promotes immune evasion of pancreatic cancer by degrading MHC-I (Nature 2020)",
    "url": "https://doi.org/10.1038/s41586-020-2229-5"
  },
  {
    "label": "Source identity and scope, PMID 33634751",
    "url": "https://pubmed.ncbi.nlm.nih.gov/33634751/"
  },
  {
    "label": "Source identity and scope, PMID 29362479",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29362479/"
  },
  {
    "label": "Source identity and scope, PMID 33584716",
    "url": "https://pubmed.ncbi.nlm.nih.gov/33584716/"
  },
  {
    "label": "Source identity and scope, PMID 19250911",
    "url": "https://pubmed.ncbi.nlm.nih.gov/19250911/"
  },
  {
    "label": "Source identity and scope, PMID 19258318",
    "url": "https://pubmed.ncbi.nlm.nih.gov/19258318/"
  },
  {
    "label": "Lysosome biology in autophagy (2020 review)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/32047650/"
  },
  {
    "label": "The hairpin-type tail-anchored SNARE syntaxin 17 targets to autophagosomes for fusion with endosomes/lysosomes (2012 cell experiments)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23217709/"
  },
  {
    "label": "The ATG conjugation systems are important for degradation of the inner autophagosomal membrane (2016 cell experiments)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/27885029/"
  },
  {
    "label": "Autophagosome maturation: An epic journey from the ER to lysosomes (2019 review)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/30578282/"
  },
  {
    "label": "mTORC1 Activator SLC38A9 Is Required to Efflux Essential Amino Acids from Lysosomes and Use Protein as a Nutrient (2017 cell and transport experiments)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29053970/"
  },
  {
    "label": "Lysosomal metabolomics reveals V-ATPase- and mTOR-dependent regulation of amino acid efflux from lysosomes (2017 lysosomal metabolomics)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29074583/"
  },
  {
    "label": "Atg22 recycles amino acids to link the degradative and recycling functions of autophagy (2006 yeast experiments)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/17021250/"
  }
],
    tags: ["mechanism"],

"asOf": "2026-11-11"
,
"related": [
  "nutrient-sensing-ampk"
]
}),
  p({
    id: "ferroptosis-cell-death", name: "Ferroptosis & regulated cell death", wikipedia: W("Ferroptosis"),
    tldr: "Ferroptosis is a form of cell death involving iron-dependent membrane-lipid damage. General oxidative stress or one positive marker does not establish this mechanism.",
    summary: "Ferroptosis involves iron-dependent membrane-lipid peroxidation and death. Cystine uptake through system xc- can support cysteine and glutathione availability; it does not transport glutathione itself. GPX4 uses glutathione to reduce lipid hydroperoxides, while FSP1 provides a parallel coenzyme-Q-associated defence. Dependence on these routes varies with the model and cellular conditions. Establishing the mechanism requires appropriately controlled measurements of death, lipid damage, iron dependence and rescue, with complementary perturbations. Findings in persistent or mesenchymal model cells do not establish a universal vulnerability or a treatment recommendation. Necrotic appearance, danger signals and adaptive antitumour immunity are separate questions.",
    analogy: "Ferroptosis is rust. Iron plus oxygen eats through the cell's membranes unless an antioxidant crew (GPX4) keeps repainting them. Cells that changed shape to dodge chemotherapy have thinner paint.",
    nodes: [
      { id: "cys", label: "Cystine import (SLC7A11)", x: 15, y: 30 }, { id: "gsh", label: "Glutathione", x: 40, y: 30 }, { id: "gpx4", label: "GPX4", x: 65, y: 30 }, { id: "lpo", label: "Lipid peroxidation", x: 65, y: 70 },
      { id: "iron", label: "Labile iron (Fenton)", x: 35, y: 70 }, { id: "ferro", label: "Ferroptosis", x: 90, y: 70 }, { id: "mes", label: "Mesenchymal / persister state", x: 90, y: 30 }, { id: "apo", label: "Apoptosis (BCL-2 family)", x: 15, y: 90, targetId: "bcl2" },
    ],
    edges: [
      { from: "cys", to: "gsh" }, { from: "gsh", to: "gpx4" }, { from: "gpx4", to: "lpo", type: "inhibits" }, { from: "iron", to: "lpo" }, { from: "lpo", to: "ferro" }, { from: "mes", to: "gpx4" },
    ],
    interventions: ["xCT inhibitors, cyst(e)inase, sulfasalazine repurposing (early trials)", "Radiotherapy and IFN-γ from T cells induce lipid peroxidation", "BH3 mimetics (venetoclax) exploit apoptosis; MCL-1 inhibitors in development", "Persister-cell targeting after EGFR/ALK inhibitors (preclinical)"],
    pathways: ["apoptosis-bcl2", "emt", "cancer-metabolism"], targets: ["bcl2"], drugs: ["venetoclax"], terms: ["resisting-cell-death", "resistance"],
    institutions: ["mskcc", "stanford", "broad-institute"],
    notes: [
  "Leading programmes: Stockwell (Columbia, coined ferroptosis); Dixon (Stanford); Schreiber (Broad) on persister-cell GPX4 dependence; Jiang (MSK) on ferroptosis in immunotherapy.",
  "Ferroptosis involves iron-dependent membrane-lipid peroxidation causing death. Erastin experiments implicated cystine uptake through system xc-, connecting cysteine and glutathione supply to antioxidant defence. Vulnerable polyunsaturated lipid chains, iron availability and cellular conditions matter; general reactive-oxygen fluorescence does not establish this mechanism.",
  "GPX4 uses glutathione to reduce lipid hydroperoxides to lipid alcohols. FSP1 provides a parallel coenzyme-Q radical-trapping defence; it does not replace every GPX4 function or describe the whole protection network. Protein abundance alone does not measure protective activity or predict compound sensitivity.",
  "Assigning ferroptosis needs convergent measurements of death, lipid damage preceding death, iron dependence and appropriately controlled rescue. Independent genetic and chemical perturbations strengthen attribution; rescue alone is not complete proof. Probe chemistry, concentration, nutrients, cell density and observation time can alter results. A lipid-probe ratio and death fraction are different outputs, with no universal diagnostic staining threshold. Live death and rescue tests consume viable model material. Specify lipid-probe oxidation ratios and independently measured death percentages over a stated interval; a marker snapshot does not reconstruct the full causal sequence.",
  "A culture with abundant GPX4, a general oxidation signal and no death has not demonstrated ferroptosis. Cell-line and xenograft vulnerabilities do not establish tolerable exposure, selective cancer killing or benefit in patients. Alternative defences can confer resistance, so a strong antioxidant programme is not automatically a treatment vulnerability."
],
    links: [
  {
    "label": "Stockwell, Ferroptosis turns 10 (Cell 2022)",
    "url": "https://doi.org/10.1016/j.cell.2022.06.003"
  },
  {
    "label": "Viswanathan et al., Dependency of a therapy-resistant state on a lipid peroxidase pathway (Nature 2017)",
    "url": "https://doi.org/10.1038/nature23007"
  },
  {
    "label": "Source identity and scope, PMID 22632970",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22632970/"
  },
  {
    "label": "Source identity and scope, PMID 27506793",
    "url": "https://pubmed.ncbi.nlm.nih.gov/27506793/"
  },
  {
    "label": "Source identity and scope, PMID 24439385",
    "url": "https://pubmed.ncbi.nlm.nih.gov/24439385/"
  },
  {
    "label": "Source identity and scope, PMID 31634900",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31634900/"
  },
  {
    "label": "Source identity and scope, PMID 29362479",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29362479/"
  }
],
    tags: ["mechanism"],

"asOf": "2026-11-09"
,
"related": [
  "reactive-oxygen-species"
]
}),
  p({
    id: "senescence", name: "Cellular senescence", wikipedia: W("Cellular_senescence"),
    tldr: "Senescent cells remain alive while their division is durably arrested. Their effects depend on the cells, signals and surrounding tissue.",
    summary: "Senescence is a stress-associated cell state with durable cell-cycle arrest and other context-dependent features. Identifying it requires combined measurements rather than one marker. In genetically switchable blood-cancer models, release from senescence allowed renewed division with enhanced clonogenic potential. That experimental result does not predict that every senescent cell will restart or that a person will relapse. Arrest, secretion and effects on neighbouring cells require separate assessment. Model findings do not establish a preferred senolytic treatment.",
    analogy: "A workshop can stop making copies while continuing to use energy and send messages. The messages and their effects must be measured in context.",
    nodes: [
  {
    "id": "dmg",
    "label": "Oncogene / therapy stress",
    "x": 15,
    "y": 30
  },
  {
    "id": "p53",
    "label": "p53 → p21",
    "x": 40,
    "y": 20,
    "targetId": "tp53"
  },
  {
    "id": "p16",
    "label": "p16 → RB",
    "x": 40,
    "y": 45,
    "targetId": "cdk4-6"
  },
  {
    "id": "arrest",
    "label": "Stable arrest",
    "x": 65,
    "y": 30
  },
  {
    "id": "sasp",
    "label": "Variable secretory programme",
    "x": 65,
    "y": 70
  },
  {
    "id": "tme",
    "label": "Context-dependent neighbour effects",
    "x": 90,
    "y": 70
  },
  {
    "id": "seno",
    "label": "Investigational clearance approaches",
    "x": 90,
    "y": 30
  }
],
    edges: [
      { from: "dmg", to: "p53" }, { from: "dmg", to: "p16" }, { from: "p53", to: "arrest" }, { from: "p16", to: "arrest" }, { from: "arrest", to: "sasp" }, { from: "sasp", to: "tme" }, { from: "seno", to: "arrest", type: "inhibits" },
    ],
    interventions: [
  "Experimental induction, persistence and clearance require separate measurements.",
  "Model findings do not establish a preferred senolytic treatment."
],
    pathways: ["p53-cell-cycle", "apoptosis-bcl2", "inflammation-nfkb", "tumor-microenvironment"], targets: ["tp53", "cdk4-6", "bcl2"], technologies: ["cdk46-inhibitor"], terms: ["senescent-cells"],
    institutions: ["mskcc", "cold-spring-harbor", "mayo-clinic"],
    notes: [
  "Leading programmes: Lowe (MSK) on senescence and immune clearance; Campisi legacy (Buck); Kirkland (Mayo) on senolytics; Demaria (ERIBA Groningen); Peeper (NKI) on one-two punch.",
  "Senescent cells remain alive and metabolically active while division is durably arrested. Damage, oncogenic signals and treatment stresses can induce the state. It is distinct from death, reversible quiescence, the broader concept of dormancy and immune exhaustion, and is not a synonym for a person's age.",
  "Low proliferation and increased p21 one day after stress do not establish durable senescence or a harmful secretory programme. Combine cell identity, longitudinal arrest or regrowth assessment and complementary features such as p16, p21, damage markers and senescence-associated beta-galactosidase. Fixed tissue cannot test later recovery, and no universal marker or arrest-duration cutoff works across contexts. Research outputs include method-defined cell fractions, marker intensities and longitudinal proliferation or regrowth. Stained sections and tested cells consume material. Secretions and their functional effects require their own readouts rather than inference from an arrest marker.",
  "The senescence-associated secretory phenotype varies with cell, stimulus, timing and environment. In Coppé and colleagues' culture experiments, selected secretions promoted epithelial invasiveness; in Demaria and colleagues' mouse skin wounds, senescent cells and PDGF-AA supported repair. Neither experiment establishes a universal harmful mixture or a clinical instruction to remove senescent cells.",
  "Genetically switchable blood-cancer models showed enhanced clonogenic growth after release from senescence. This supports possible escape in those systems, not inevitable restart, relapse prediction or a preferred senolytic treatment. Arrest, secretion and effects on neighbouring cells require separate tests."
],
    links: [
  {
    "label": "Primary source, PMID 31675495",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31675495/"
  },
  {
    "label": "Primary source, PMID 29258294",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29258294/"
  },
  {
    "label": "Schmitt, Wang & Demaria, Senescence and cancer: role and therapeutic opportunities (Nature Reviews Clinical Oncology 2022)",
    "url": "https://doi.org/10.1038/s41571-022-00668-4"
  },
  {
    "label": "Source identity and scope, PMID 29362479",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29362479/"
  },
  {
    "label": "Source identity and scope, PMID 39121846",
    "url": "https://pubmed.ncbi.nlm.nih.gov/39121846/"
  },
  {
    "label": "Source identity and scope, PMID 19053174",
    "url": "https://pubmed.ncbi.nlm.nih.gov/19053174/"
  },
  {
    "label": "Source identity and scope, PMID 25499914",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25499914/"
  }
],
    tags: ["mechanism"],

"asOf": "2026-11-09"
}),
  p({
    id: "cancer-stem-cells-plasticity", related: ["theories-of-cancer", "cancer-stem-cell-theory"], keyPapers: ["paper-singh-brain-tumour-initiating-cells-nature-2004"], name: "Cancer stem cells & phenotypic plasticity", wikipedia: W("Cancer_stem_cell"),
    tldr: "Some cancer cells behave like stem cells: they can regrow the whole tumour, resist treatment, and switch identities. This plasticity explains why tumours come back and why some lung and prostate cancers transform into a different cancer type under therapy.",
    summary: "Cancer stem cells (CSCs; first shown in AML by Dick, 1994-97) are functionally defined by tumour-initiating capacity; in solid tumours stemness is usually a reversible state rather than a fixed population. Lineage plasticity under therapy produces neuroendocrine transformation (EGFR-mutant NSCLC to SCLC; prostate adenocarcinoma to NEPC), basal/mesenchymal switching in breast cancer, and dedifferentiation. Drivers: EMT programmes, Wnt/Notch/Hedgehog, epigenetic remodelling (EZH2, SWI/SNF), TP53/RB1 loss. 'Unlocking phenotypic plasticity' is a 2022 hallmark. Therapeutic routes: differentiation therapy (ATRA in APL), EZH2/LSD1 inhibitors, targeting CSC markers (CD44, LGR5), and MRD-directed therapy.",
    analogy: "A weed that can turn from leaf to root to seed depending on what you spray on it. Kill the leaves and the roots wait; kill the roots and a seed reawakens.",
    nodes: [
      { id: "csc", label: "Stem-like state", x: 50, y: 30 }, { id: "diff", label: "Differentiated bulk", x: 20, y: 60 }, { id: "mes", label: "Mesenchymal / drug-tolerant persister", x: 80, y: 60 },
      { id: "ne", label: "Lineage switch (NE transformation)", x: 50, y: 88, targetId: "dll3" }, { id: "epi", label: "EZH2, SWI/SNF, TP53/RB1 loss", x: 88, y: 20, targetId: "ezh2" }, { id: "niche", label: "Wnt / Notch / Hedgehog niche", x: 12, y: 20 },
    ],
    edges: [
      { from: "csc", to: "diff" }, { from: "diff", to: "csc" }, { from: "csc", to: "mes" }, { from: "mes", to: "csc" }, { from: "epi", to: "ne" }, { from: "csc", to: "ne" }, { from: "niche", to: "csc" }, { from: "epi", to: "csc" },
    ],
    interventions: ["Differentiation therapy: ATRA/arsenic in APL (curative), menin inhibitors differentiate KMT2A/NPM1 leukaemias", "EZH2, LSD1, and BET inhibitors to block plasticity (trials)", "DLL3-directed tarlatamab for neuroendocrine-transformed tumours", "MRD-directed therapy to catch persisters before regrowth"],
    pathways: ["emt", "wnt", "notch", "hedgehog", "swi-snf-chromatin", "clonal-evolution"], targets: ["ezh2", "dll3", "menin", "tp53"], drugs: ["tarlatamab", "revumenib"], terms: ["unlocking-phenotypic-plasticity", "histologic-transformation", "lgr5"],
    institutions: ["princess-margaret", "mskcc", "stanford", "francis-crick"],
    notes: ["Leading programmes: Dick (Princess Margaret, leukaemia stem cells); Sawyers and Rudin (MSK, lineage plasticity in prostate and lung); Clevers (Hubrecht, organoids and LGR5); Weissman (Stanford)."],
    links: [{ label: "Rubin, Bristow, Thienger et al., Impact of lineage plasticity to and from a neuroendocrine phenotype (Molecular Cell 2020)", url: "https://doi.org/10.1016/j.molcel.2020.10.033" }, HALLMARKS_2022],
    tags: ["mechanism"],
  }),
  p({
    id: "clonal-evolution", related: ["theories-of-cancer", "clonal-evolution-theory"], name: "Clonal evolution & minimal residual disease", wikipedia: W("Somatic_evolution_in_cancer"),
    tldr: "Cancer populations can change through inherited variation, selection and chance. A clone’s larger share does not by itself prove more cells, resistance or the cause of change.",
    summary: "Related cancer-cell populations can differ in inherited features and in their representation over time or across sites. Selection depends on context, while chance and sampling also affect observed frequencies. An inferred ancestry, a measured cell state and an abundance estimate answer different questions.",
    analogy: "Clonal evolution is like weeding a field with one herbicide year after year: the field fills with the one weed that shrugs it off. Rotating herbicides and leaving some susceptible weeds to crowd out the resistant ones is the evolutionary alternative.",
    nodes: [
      { id: "trunk", label: "Truncal driver clone", x: 12, y: 50, targetId: "tp53" }, { id: "b1", label: "Subclone A", x: 38, y: 25 }, { id: "b2", label: "Subclone B (resistant)", x: 38, y: 75 },
      { id: "tx", label: "Therapy (selection)", x: 60, y: 50 }, { id: "mrd", label: "MRD (ctDNA)", x: 78, y: 50 }, { id: "relapse", label: "Relapse dominated by B", x: 92, y: 75 }, { id: "adapt", label: "Adaptive / combination therapy", x: 92, y: 20 },
    ],
    edges: [
      { from: "trunk", to: "b1" }, { from: "trunk", to: "b2" }, { from: "tx", to: "b1", type: "inhibits" }, { from: "b2", to: "mrd" }, { from: "mrd", to: "relapse" }, { from: "adapt", to: "relapse", type: "inhibits" },
    ],
    interventions: ["ctDNA MRD to escalate or de-escalate (IMvigor011, DYNAMIC)", "Upfront combinations to pre-empt resistant clones (osimertinib + chemotherapy, BRAF + MEK)", "Adaptive therapy trials (Moffitt)", "Serial liquid biopsy to switch therapy at molecular progression (SERENA-6)"],
    pathways: ["chromosomal-instability", "metastatic-cascade", "tumor-dormancy"], technologies: ["mrd-testing", "liquid-biopsy", "wes-wgs"], terms: ["mrd", "ctdna", "resistance", "vaf", "mutational-signature"], trials: ["imvigor011", "dynamic"],
    institutions: ["francis-crick", "moffitt", "broad-institute", "mskcc"],
    notes: [
  "Leading programmes: Swanton (Crick, TRACERx); Gatenby and Brown (Moffitt, adaptive therapy); Getz (Broad) on clonal reconstruction; Landau (Weill Cornell) on single-cell evolution.",
  "Clonal evolution concerns inherited lineage features and changing population composition through variation, selection and chance. Drivers can contribute to behaviour while passengers accompany them. A newly detected variant may already have existed below the earlier detection limit. Selection and fitness depend on location, nutrients, immunity and treatment, rather than simply the fastest growth or a universal measure of danger.",
  "Nowell proposed an evolutionary framework; Gerlinger’s multiregion study of four renal cancers supplied evidence for branching in its sampled setting. Neither study is a census of every tumour. Genetic drift is chance-driven change in variant frequency, and bottlenecks can change composition without the same selective explanation. A frequency change alone does not identify drift, selection or resistance. Williams tested a defined neutral-growth model in which newly arising variants have no further fitness differences during the modelled expansion, relating frequencies to mutation timing. Tarabichi showed why a good frequency-model fit is not sufficient proof of neutrality or the absence of historical selection.",
  "Fictional direct counts change from 900 A and 100 B to 90 A and 90 B. B rises from 10% to 50% of the total while falling from 100 to 90 cells. Relative enrichment is not absolute expansion. Any supplied ancestry is separate evidence; the counts do not establish a resistance mechanism or the cause of change.",
  "Sequencing read fractions and inferred cancer-cell fractions are different quantities, affected by purity, copy number and detection limits. Compare appropriate regional or time samples for shared and differing alterations, or trace labelled descendants experimentally, retaining date, location, resolution and uncertainty. An expression cluster is not automatically a genetic clone. A dominant sampled branch does not count every lesion or establish target coverage in unseen disease."
],
    links: [
  {
    "label": "Jamal-Hanjani et al., Tracking the evolution of non-small-cell lung cancer (NEJM 2017)",
    "url": "https://doi.org/10.1056/NEJMoa1616288"
  },
  {
    "label": "Zhang et al., Integrating evolutionary dynamics into treatment of mCRPC (Nature Communications 2017)",
    "url": "https://doi.org/10.1038/s41467-017-01968-5"
  },
  {
    "label": "Nowell, The clonal evolution of tumor cell populations. (1976)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/959840/"
  },
  {
    "label": "Gerlinger et al., Intratumor heterogeneity and branched evolution revealed by multiregion sequencing. (2012)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22397650/"
  },
  {
    "label": "Williams et al., Identification of neutral tumor evolution across cancer types. (2016)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/26780609/"
  },
  {
    "label": "Tarabichi et al., limits of inferring neutral tumour evolution (2018)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/30374075/"
  },
  {
    "label": "NHGRI: genetic drift",
    "url": "https://www.genome.gov/genetics-glossary/Genetic-Drift"
  }
],
    tags: ["mechanism"],

"asOf": "2026-11-10"
}),
  p({
    id: "inflammation-nfkb", name: "Inflammation & NF-κB", wikipedia: W("NF-κB"),
    tldr: "Chronic inflammation is soil for cancer: it feeds growth signals, DNA damage, and immune suppression. The NF-κB switch inside cells is the master relay, and colitis, hepatitis, and H. pylori gastritis are the clinical proof.",
    summary: "Tumour-promoting inflammation (a hallmark enabling characteristic) acts through IL-6/STAT3, TNF/NF-κB, IL-1β, COX-2/PGE2, and inflammasome signalling. NF-κB (canonical IKK/IκB and non-canonical NIK/RelB) drives survival, cytokine production, and the SASP; it is constitutively active in many lymphomas (ABC-DLBCL via MYD88/CD79B, BTK-dependent) and myeloma. Aspirin reduces colorectal cancer in Lynch syndrome (CAPP2) and canakinumab reduced lung cancer incidence in CANTOS (secondary analysis), though as treatment it failed. Anti-inflammatory chemoprevention is one of the few validated mechanism-based preventions.",
    analogy: "A wound that never heals: the repair crews keep pouring in growth signals and clearing away rubble, and a wound that is always being rebuilt is a wound where mistakes accumulate.",
    nodes: [
      { id: "trig", label: "Infection, injury, obesity", x: 12, y: 50 }, { id: "cyto", label: "TNF, IL-1β, IL-6", x: 35, y: 25 }, { id: "ikk", label: "IKK → IκB degradation", x: 58, y: 25 }, { id: "nfkb", label: "NF-κB", x: 80, y: 25 },
      { id: "stat3", label: "IL-6 → STAT3", x: 58, y: 75 }, { id: "out", label: "Survival, proliferation, SASP, immune suppression", x: 92, y: 60 }, { id: "btk", label: "BCR → BTK (lymphoma)", x: 35, y: 75, targetId: "btk" }, { id: "cox", label: "COX-2 → PGE2", x: 12, y: 85 },
    ],
    edges: [
      { from: "trig", to: "cyto" }, { from: "cyto", to: "ikk" }, { from: "ikk", to: "nfkb" }, { from: "nfkb", to: "out" }, { from: "cyto", to: "stat3" }, { from: "stat3", to: "out" }, { from: "btk", to: "ikk" }, { from: "trig", to: "cox" }, { from: "cox", to: "out" },
    ],
    interventions: ["Aspirin chemoprevention in Lynch syndrome (CAPP2); NSAIDs in FAP", "BTK inhibitors (ibrutinib, zanubrutinib) shut NF-κB in CLL/lymphoma", "IL-6/STAT3 blockade in cachexia and CRS (tocilizumab)", "Anti-H. pylori therapy prevents gastric cancer; HBV/HCV treatment prevents HCC"],
    pathways: ["jak-stat", "senescence", "tumor-microenvironment", "cachexia-biology"], targets: ["btk"], drugs: ["ibrutinib", "zanubrutinib"], technologies: ["chemoprevention", "hpv-vaccine"], terms: ["tumor-promoting-inflammation", "crs"],
    institutions: ["ucsf", "mskcc", "dkfz"],
    notes: ["Leading programmes: Karin (UCSD) on NF-κB and inflammation-driven cancer; Coussens (OHSU) on inflammation and TME; Greten (Frankfurt); CAPP2 (Burn, Newcastle)."],
    links: [{ label: "Greten & Grivennikov, Inflammation and cancer: triggers, mechanisms, and consequences (Immunity 2019)", url: "https://doi.org/10.1016/j.immuni.2019.06.025" }],
    tags: ["mechanism"],
  }),
  p({
    id: "hedgehog", targets: ["ptch1"], name: "Hedgehog signalling", wikipedia: W("Hedgehog_signaling_pathway"),
    tldr: "A developmental pathway that shapes embryos and is switched back on in basal cell skin cancer and some brain tumours. Blocking it cures most advanced basal cell carcinomas, but tumours learn to reactivate it downstream.",
    summary: "Hedgehog ligands bind Patched (PTCH1), relieving inhibition of Smoothened (SMO), which activates GLI transcription factors. PTCH1 loss or SMO mutation drives basal cell carcinoma (Gorlin syndrome) and the SHH subgroup of medulloblastoma. SMO inhibitors vismodegib and sonidegib are approved for advanced BCC; glasdegib is approved in AML with low-dose cytarabine. Resistance arises via SMO mutations or SUFU/GLI2 alterations downstream; stromal Hedgehog signalling in pancreatic cancer had paradoxical tumour-restraining effects, and SMO inhibitors failed there.",
    analogy: "A construction crew that is supposed to leave once the building is finished. In these cancers the foreman (SMO) never gets the 'stop' message from the site manager (PTCH1).",
    nodes: [
      { id: "shh", label: "SHH ligand", x: 15, y: 30 }, { id: "ptch", label: "PTCH1", x: 38, y: 30 }, { id: "smo", label: "SMO", x: 60, y: 30 }, { id: "sufu", label: "SUFU", x: 60, y: 65 }, { id: "gli", label: "GLI1/2", x: 82, y: 50 }, { id: "out", label: "Proliferation (BCC, SHH-medulloblastoma)", x: 82, y: 85 },
    ],
    edges: [{ from: "shh", to: "ptch", type: "inhibits" }, { from: "ptch", to: "smo", type: "inhibits" }, { from: "smo", to: "gli" }, { from: "sufu", to: "gli", type: "inhibits" }, { from: "gli", to: "out" }],
    interventions: ["SMO inhibitors vismodegib, sonidegib (advanced BCC), glasdegib (AML)", "GLI inhibitors (arsenic trioxide, BET inhibitors) for downstream resistance (investigational)", "Surgery and radiation remain first line for most BCC"],
    pathways: ["wnt", "notch", "cancer-stem-cells-plasticity"], cancers: ["glioblastoma", "aml"], technologies: ["kinase-inhibitors", "hedgehog-inhibitors"],
    institutions: ["stanford", "dana-farber"],
    notes: ["Leading programmes: Scott (Stanford) and Oro (Stanford) on Hedgehog in skin; Beachy (Stanford, cyclopamine); Rudin/Pomeroy on SHH medulloblastoma."],
    links: [{ label: "Sekulic et al., Vismodegib in advanced basal-cell carcinoma (NEJM 2012)", url: "https://doi.org/10.1056/NEJMoa1113713" }],
    tags: ["mechanism"],
  }),
  p({
    id: "notch", name: "Notch signalling", wikipedia: W("Notch_signaling_pathway"),
    tldr: "Notch receptors can relay signals between contacting cells. The effect depends on the receptor, ligand, alteration and tissue; receiving a signal does not by itself prove growth dependence.",
    summary: "A ligand-bearing sender, receptor amount, received signal and growth dependence are separate observations. Locate malignant, vessel and other neighboring cells before assigning a Notch mechanism. Ligand on a vessel is not evidence that the tumor received the signal, and total receptor is different from a released nuclear intracellular domain.\n\nCommon contact-dependent Notch signaling begins when Delta-like or Jagged ligand on one cell engages a receptor on a neighbor. Ligand-regulated extracellular cleavage permits subsequent gamma-secretase-mediated membrane cleavage; the released Notch intracellular domain, NICD, can enter the nucleus and work with transcriptional partners. This route differs from an RTK phosphorylation relay and omits receptor maturation and sender mechanics.\n\nWeng found activating NOTCH1 changes in extracellular heterodimerization or PEST regions in more than half of the studied T-ALLs. Agrawal identified predicted inactivating alterations in head-and-neck squamous tumors, suggesting a tumor-suppressor role there. An uncharacterized allele inherits neither direction from the pathway name; tissue, cell identity and alteration effect matter.\n\nA fictional T-ALL culture with high nuclear NICD without a ligand-bearing neighbor, and lower NICD after gamma-secretase blockade, supports a ligand-independent activation hypothesis. A contact-blocking experiment that lowers NICD without changing growth instead supports reduced received signaling without demonstrating a growth requirement. Control general toxicity, contact conditions, independent pathway perturbations and compensation. Gamma-secretase also processes other proteins; responsive HES/HEY RNA and nuclear staining need validated assays and are not universal eligibility cutoffs.",
    analogy: "A doorbell that only works when a neighbour presses it. In some cancers the bell rings constantly (T-ALL); in others it has been ripped out so cells never hear 'stop and mature'.",
    nodes: [
      { id: "lig", label: "DLL/JAG ligand (neighbour)", x: 15, y: 40 }, { id: "notch", label: "NOTCH receptor", x: 40, y: 40 }, { id: "gs", label: "γ-secretase cleavage", x: 60, y: 40 }, { id: "nicd", label: "NICD → RBPJ", x: 80, y: 40 }, { id: "hes", label: "HES1/HEY, MYC", x: 80, y: 78 },
      { id: "dll3", label: "DLL3 (inhibitory; SCLC surface)", x: 15, y: 80, targetId: "dll3" },
    ],
    edges: [{ from: "lig", to: "notch" }, { from: "notch", to: "gs" }, { from: "gs", to: "nicd" }, { from: "nicd", to: "hes" }, { from: "dll3", to: "notch", type: "inhibits" }],
    interventions: ["Nirogacestat (γ-secretase inhibitor) in desmoid tumours", "DLL3-directed tarlatamab in SCLC; DLL3 ADCs and trispecifics", "NOTCH1-mutant CLL: reduced benefit from anti-CD20, informs regimen choice"],
    pathways: ["cancer-stem-cells-plasticity", "myc"], targets: ["dll3"], drugs: ["tarlatamab", "nirogacestat"], cancers: ["sclc", "all-leukemia", "cll", "head-and-neck"],
    institutions: ["dana-farber", "penn-abramson"],
    notes: ["Leading programmes: Aster (Brigham/Harvard) on Notch in leukaemia; Pear (Penn); Radtke (EPFL)."],
    links: [
  {
    "label": "Aster, Pear & Blacklow, The varied roles of Notch in cancer (Annual Review of Pathology 2017)",
    "url": "https://doi.org/10.1146/annurev-pathol-052016-100127"
  },
  {
    "label": "Notch-1 signalling requires ligand-induced proteolytic release of intracellular domain. (primary abstract; 1998)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/9620803/"
  },
  {
    "label": "Activating mutations of NOTCH1 in human T cell acute lymphoblastic leukemia. (primary abstract; 2004)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/15472075/"
  },
  {
    "label": "Exome sequencing of head and neck squamous cell carcinoma reveals inactivating mutations in NOTCH1. (primary abstract; 2011)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/21798897/"
  },
  {
    "label": "A ligand-induced extracellular cleavage regulates gamma-secretase-like proteolytic activation of Notch1. (2000; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/10882062/"
  },
  {
    "label": "A presenilin-1-dependent gamma-secretase-like protease mediates release of Notch intracellular domain. (1999; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/10206645/"
  }
],
    tags: ["mechanism"],

"asOf": "2026-11-10"
}),
  p({
    id: "jak-stat", keyPapers: ["paper-darnell-jak-stat-science-1994"], name: "JAK-STAT signalling", wikipedia: W("JAK-STAT_signaling_pathway"),
    tldr: "The relay that turns cytokine signals into gene changes. Overactive in blood cancers (JAK2 in myelofibrosis), it is also the wire that carries interferon's cancer-killing message, so tumours cut it to escape immunotherapy.",
    summary: "Cytokine receptors recruit JAK kinases that phosphorylate STAT transcription factors. JAK2 V617F drives myeloproliferative neoplasms (ruxolitinib, fedratinib, momelotinib approved); STAT3 is a hub for IL-6-driven survival, immunosuppression, and cachexia; STAT5 in leukaemias. Interferon-γ signalling via JAK1/2-STAT1 upregulates MHC and PD-L1; JAK1/2 loss-of-function mutations cause acquired resistance to PD-1 blockade. Direct STAT3 inhibitors (degraders, antisense) are in early trials.",
    analogy: "JAK-STAT is a doorbell wired to the house lights. Cytokines ring, JAK flips the switch, STAT turns on the lights. Cancers either jam the switch on (JAK2 mutation) or cut the wire so interferon cannot turn on the 'I am infected' lights.",
    nodes: [
      { id: "cyto", label: "Cytokine / IFN-γ", x: 15, y: 40 }, { id: "rec", label: "Receptor", x: 35, y: 40 }, { id: "jak", label: "JAK1/2", x: 55, y: 40 }, { id: "stat", label: "STAT1 / STAT3 / STAT5", x: 75, y: 40 },
      { id: "mhc", label: "MHC-I, PD-L1 (STAT1)", x: 92, y: 20, targetId: "pdl1" }, { id: "surv", label: "Survival, SASP, cachexia (STAT3)", x: 92, y: 65 }, { id: "socs", label: "SOCS feedback", x: 55, y: 80 },
    ],
    edges: [{ from: "cyto", to: "rec" }, { from: "rec", to: "jak" }, { from: "jak", to: "stat" }, { from: "stat", to: "mhc" }, { from: "stat", to: "surv" }, { from: "stat", to: "socs" }, { from: "socs", to: "jak", type: "inhibits" }],
    interventions: ["JAK inhibitors in myeloproliferative neoplasms and GVHD", "STAT3 degraders/antisense (early trials)", "Anti-IL-6 (tocilizumab) for CRS and under study for cachexia", "JAK-loss tumours: MHC-independent therapies (T-cell engagers, NK cells)"],
    pathways: ["antigen-presentation-immunoediting", "inflammation-nfkb", "cachexia-biology", "pd1-checkpoint"], targets: ["pdl1", "stat5", "mpl", "jak1"], terms: ["crs"],
    institutions: ["mskcc", "mayo-clinic"],
    notes: [
  "Leading programmes: Levine (MSK) on JAK2 and MPN; Ribas (UCLA) on JAK mutations and PD-1 resistance; Darnell legacy (Rockefeller).",
  "JAK-STAT is a route used by many cytokine receptors rather than a synonym for every cytokine response. Engelowski’s artificial receptor/ligand systems tested defined signalling and growth responses. Stüber’s TGF-beta experiments measured a SMAD-associated response in ROR1 CAR T cells. Follow the specified receptor and measured pathway through to gene output and cell phenotype; a phosphate signal, feedback response, growth measurement and completed target killing are different observations."
],
    links: [
  { label: "Hu et al., The JAK/STAT signaling pathway: from bench to clinic (Signal Transduction and Targeted Therapy 2021)", url: "https://doi.org/10.1038/s41392-021-00791-1" },
  {
  "label": "Synthetic cytokine receptors transmit biological signals using artificial ligands. (2018)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/29789554/"
},
  {
  "label": "Inhibition of TGF-β-receptor signaling augments the antitumor function of ROR1-specific CAR T-cells against triple-negative breast cancer. (2020)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/32303620/"
}
],
    tags: ["mechanism"],

    asOf: "2026-11-12",
  }),
  p({
    id: "tgf-beta", targets: ["acvr1"], name: "TGF-β signalling", wikipedia: W("TGF_beta_signaling_pathway"),
    tldr: "A signal that stops normal cells from dividing but, once a cancer is established, switches sides: it builds scar-like stroma, walls out immune cells, and pushes cells into a migratory state.",
    summary: "TGF-β binds TGFBR2/TGFBR1 (ALK5) to phosphorylate SMAD2/3, which with SMAD4 regulates transcription. Early tumour suppressor (cytostatic; SMAD4 and TGFBR2 loss in pancreatic and MSI colorectal cancer) and later promoter of EMT, CAF activation, immune exclusion (T-cell exclusion in bladder and CRC), and metastasis. Bintrafusp alfa (PD-L1/TGF-β trap) failed in phase 3 (NSCLC, biliary); galunisertib was discontinued; SRK-181 (latent TGF-β1) and dalutrafusp continue. Blocking TGF-β to re-sensitise cold tumours remains an active, unproven idea.",
    analogy: "A town planner who first refuses all new building (tumour suppressor) and then, corrupted, builds walls and moats around the tumour that keep the police out (immune exclusion).",
    nodes: [
      { id: "lig", label: "Latent TGF-β (activated by integrins)", x: 12, y: 40 }, { id: "rec", label: "TGFBR2 / ALK5", x: 35, y: 40 }, { id: "smad", label: "SMAD2/3-SMAD4", x: 58, y: 40 },
      { id: "cyto", label: "Cytostasis (early)", x: 80, y: 15 }, { id: "emt", label: "EMT, CAF activation", x: 80, y: 45 }, { id: "excl", label: "T-cell exclusion", x: 80, y: 75 }, { id: "smad4", label: "SMAD4 loss (PDAC)", x: 35, y: 80 },
    ],
    edges: [{ from: "lig", to: "rec" }, { from: "rec", to: "smad" }, { from: "smad", to: "cyto" }, { from: "smad", to: "emt" }, { from: "smad", to: "excl" }, { from: "smad4", to: "smad", type: "inhibits" }],
    interventions: ["TGF-β traps and antibodies (mostly failed: bintrafusp alfa); latent-TGF-β1-selective agents in trials", "ALK5 inhibitors (vactosertib) with IO in trials", "Integrin αvβ6/αvβ8 blockade to prevent activation (investigational)"],
    pathways: ["emt", "tumor-microenvironment", "metastatic-cascade", "pd1-checkpoint"], terms: ["immune-exclusion", "cold-vs-hot", "desmoplasia"],
    institutions: ["mskcc", "vall-dhebron", "cold-spring-harbor"],
    notes: ["Leading programmes: Massagué (MSK, TGF-β biology and metastasis); Tauriello & Batlle (IRB Barcelona, TGF-β and immune exclusion in CRC); Sheppard (UCSF, integrin activation)."],
    links: [{ label: "Tauriello et al., TGFβ drives immune evasion in genetically reconstituted colon cancer metastasis (Nature 2018)", url: "https://doi.org/10.1038/nature25492" }],
    tags: ["mechanism"],
  }),
  p({
    id: "hippo-yap", name: "Hippo-YAP/TAZ", wikipedia: W("Hippo_signaling_pathway"),
    tldr: "The pathway that tells organs when to stop growing. Cancers disable it so YAP and TAZ stay in the nucleus driving growth; in mesothelioma, NF2 loss does exactly that, and the first drugs against the YAP-TEAD switch are in trials.",
    summary: "Mechanical and contact cues activate the Hippo kinases MST1/2-LATS1/2, which phosphorylate and exclude YAP/TAZ from the nucleus. NF2 (Merlin) loss (mesothelioma, meningioma), LATS loss, and YAP/TAZ fusions (epithelioid haemangioendothelioma) unleash YAP/TAZ-TEAD transcription. TEAD palmitoylation-pocket inhibitors (IK-930, VT3989, IAG933) are in phase 1/2, notably in NF2-mutant mesothelioma and as combinations to overcome KRAS/EGFR-inhibitor resistance, where YAP is a bypass route. YAP also drives stiffness-induced signalling and CAF activation.",
    analogy: "A building inspector (Hippo) who checks that the block is full and stops new floors. Cancers fire the inspector, and the architect (YAP/TAZ) keeps adding storeys.",
    nodes: [
      { id: "cue", label: "Contact, stiffness, GPCRs", x: 12, y: 40 }, { id: "nf2", label: "NF2 (Merlin)", x: 32, y: 20 }, { id: "mst", label: "MST1/2 → LATS1/2", x: 50, y: 40 }, { id: "yap", label: "YAP/TAZ", x: 70, y: 40 }, { id: "tead", label: "TEAD transcription", x: 88, y: 40 }, { id: "out", label: "Growth, EMT, drug tolerance", x: 88, y: 80 },
    ],
    edges: [{ from: "cue", to: "mst" }, { from: "nf2", to: "mst" }, { from: "mst", to: "yap", type: "inhibits" }, { from: "yap", to: "tead" }, { from: "tead", to: "out" }],
    interventions: ["TEAD inhibitors (VT3989, IK-930, IAG933) in NF2-mutant mesothelioma and with KRAS/EGFR inhibitors", "Verteporfin repurposing (preclinical)", "Combination rationale: YAP bypass after MAPK inhibition"],
    pathways: ["ras-mapk", "emt", "tumor-microenvironment"], cancers: ["mesothelioma"], targets: ["kras", "egfr"],
    institutions: ["mgh", "mskcc"],
    notes: ["Leading programmes: Camargo (Stanford), Guan (UCSD), Pan (Johns Hopkins) on Hippo biology; Vivace Therapeutics, Ikena, Novartis on TEAD inhibitors."],
    links: [{ label: "Franklin, Wu & Guan, Insights into recent findings and clinical application of YAP and TAZ in cancer (Nature Reviews Cancer 2023)", url: "https://doi.org/10.1038/s41568-023-00579-1" }],
    tags: ["mechanism"],
  }),
  p({
    id: "myc", name: "MYC", wikipedia: W("Myc"),
    tldr: "MYC is a protein that helps regulate gene activity and cell growth. Gene copy number, RNA, protein amount and dependence on MYC are different findings.",
    summary: "MYC is a transcription regulator involved in programs of cell growth and metabolism. Its abundance and activity depend on cellular context and regulatory partners.\n\nCopy gain, RNA abundance, protein amount, chromatin binding, a transcriptional program and functional dependence are separate layers. MYC pairs with MAX for sequence-specific DNA binding. A high RNA level or subtype association alone does not establish that disrupting MYC will selectively impair the sampled cancer.\n\nMYC helps regulate programs involving growth, metabolism and proliferation through partners and regulatory context. Sabo's mouse and cultured-cell work separated selective gene regulation from broader RNA increases accompanying altered cell state; direct binding and indirect transcription effects are not equivalent. Normalize for cell composition, proliferation and RNA per cell before assigning a MYC mechanism to a gene-expression pattern.\n\nIn a fictional sample with high MYC RNA, unmeasured protein and growth suppression by a broadly acting compound, MYC dependence remains unresolved. Confirm the relevant cells and MYC disruption, use independent perturbations, appropriate restoration and normal-cell comparisons, and measure growth and death separately. General transcriptional damage or many changed messages does not attribute the compound's effect to MYC.\n\nHoriuchi compared MYC-related patterns in human TNBC and tested CDK-inhibitor vulnerabilities in selected models; it did not establish dependence in every patient. Soucek used reversible genetic MYC inhibition in a Ras-driven mouse lung-cancer model and observed tumor regression alongside effects on normal regenerating tissues. Delmore showed JQ1-associated MYC transcription reduction in myeloma models. Genetic MYC inhibition, BET inhibition and a particular medicine's exposure, safety and clinical benefit remain different evidence settings.",
    analogy: "A conductor who can make every section of the orchestra play louder at once. You cannot take away the baton, so drugs try to silence the score (transcription), tire the conductor (degradation), or exploit the fact that a full-volume orchestra cannot afford a single missing player.",
    nodes: [
      { id: "up", label: "Wnt, RAS, Notch, amplification", x: 12, y: 40 }, { id: "myc", label: "MYC/MAX", x: 40, y: 40 }, { id: "ribo", label: "Ribosome biogenesis, metabolism", x: 70, y: 20 }, { id: "prol", label: "Proliferation", x: 90, y: 40 },
      { id: "imm", label: "CD47, PD-L1 (immune evasion)", x: 70, y: 70, targetId: "cd47" }, { id: "cdk9", label: "CDK9 / BET (transcription)", x: 40, y: 80 }, { id: "aurka", label: "AURKA / PLK1 (stability)", x: 12, y: 80 },
    ],
    edges: [{ from: "up", to: "myc" }, { from: "myc", to: "ribo" }, { from: "ribo", to: "prol" }, { from: "myc", to: "imm" }, { from: "cdk9", to: "myc" }, { from: "aurka", to: "myc" }],
    interventions: ["OMO-103 (Omomyc) phase 1/2 in pancreatic cancer", "BET and CDK9 inhibitors reduce MYC transcription (haematologic trials)", "AURKA inhibitors in MYCN-amplified neuroblastoma", "MYC-driven dependencies: mTOR, spliceosome, glutamine"],
    pathways: ["wnt", "ras-mapk", "notch", "cancer-metabolism", "mrna-translation-eif4f", "rna-splicing"], targets: ["cd47", "kras"], cancers: ["neuroblastoma", "dlbcl", "pancreatic"], terms: ["mycn-amplification", "sustaining-proliferative-signaling"],
    institutions: ["vall-dhebron", "ucsf", "dana-farber", "cold-spring-harbor"],
    notes: ["Leading programmes: Soucek (VHIO, Omomyc/Peptomyc); Felsher (Stanford, MYC addiction); Eilers (Würzburg); Dang (Ludwig); Bradner/Vakoc (CSHL, BET inhibitors)."],
    links: [
  {
    "label": "Dhanasekaran et al., The MYC oncogene: the grand orchestrator of cancer growth and immune evasion (Nature Reviews Clinical Oncology 2022)",
    "url": "https://doi.org/10.1038/s41571-021-00549-2"
  },
  {
    "label": "Garralda et al., MYC targeting by OMO-103 in solid tumors: a phase 1 trial (Nature Medicine 2024)",
    "url": "https://doi.org/10.1038/s41591-024-02805-1"
  },
  {
    "label": "Max: a helix-loop-helix zipper protein that forms a sequence-specific DNA-binding complex with Myc. (primary abstract; 1991)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/2006410/"
  },
  {
    "label": "Selective transcriptional regulation by Myc in cellular growth control and lymphomagenesis. (2014; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25043028/"
  },
  {
    "label": "MYC pathway activation in triple-negative breast cancer is synthetic lethal with CDK inhibition. (2012; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22430491/"
  },
  {
    "label": "Modelling Myc inhibition as a cancer therapy. (2008; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/18716624/"
  },
  {
    "label": "BET bromodomain inhibition as a therapeutic strategy to target c-Myc. (2011; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/21889194/"
  },
  {
    "label": "UniProt P01106: reviewed human protein function",
    "url": "https://www.uniprot.org/uniprotkb/P01106/entry"
  }
],
    tags: ["mechanism"],

"asOf": "2026-11-10"
}),
  p({
    id: "keap1-nrf2", name: "KEAP1-NRF2 antioxidant pathway", wikipedia: W("NFE2L2"),
    tldr: "KEAP1-NRF2 is the cell's antioxidant defence switch. Lung cancers often break the off-switch (KEAP1), leaving NRF2 permanently on, which detoxifies chemotherapy and radiation and makes these tumours resistant to almost everything.",
    summary: "KEAP1 targets NRF2 (NFE2L2) for degradation; oxidative stress or KEAP1 mutation (~20% of lung adenocarcinoma, often with KRAS or STK11) stabilises NRF2, inducing glutathione synthesis, drug efflux, and NADPH production. KEAP1/STK11-mutant NSCLC responds poorly to chemotherapy and immunotherapy. Vulnerabilities: glutaminase dependence (telaglenastat, KEAPSAKE trial negative), NRF2-activated prodrugs (TRC102?), and CDK4/6 dependence; NRF2 also drives ferroptosis resistance.",
    analogy: "KEAP1-NRF2 is a smoke detector wired to a sprinkler system. Cancers jam the detector on, so the sprinklers run constantly and wash away every poison you throw at them.",
    nodes: [
      { id: "ros", label: "Oxidative stress", x: 12, y: 40 }, { id: "keap", label: "KEAP1 (mutated)", x: 38, y: 40 }, { id: "nrf2", label: "NRF2", x: 62, y: 40 }, { id: "are", label: "ARE genes: GSH, NQO1, efflux", x: 86, y: 40 }, { id: "res", label: "Chemo/RT/ferroptosis resistance", x: 86, y: 80 }, { id: "stk11", label: "STK11/LKB1 loss (co-mutation)", x: 38, y: 80 },
    ],
    edges: [{ from: "ros", to: "keap", type: "inhibits" }, { from: "keap", to: "nrf2", type: "inhibits" }, { from: "nrf2", to: "are" }, { from: "are", to: "res" }, { from: "stk11", to: "res" }],
    interventions: ["Glutaminase inhibition (negative in KEAPSAKE)", "NRF2-activated prodrugs and NRF2 inhibitors (preclinical)", "Biomarker: KEAP1/STK11 status predicts poor IO benefit in NSCLC", "CDK4/6 and mTOR combinations under study"],
    pathways: ["ferroptosis-cell-death", "cancer-metabolism", "ras-mapk"], targets: ["kras"], cancers: ["nsclc"], terms: ["efflux-pump"],
    institutions: ["mskcc", "md-anderson"],
    notes: ["Leading programmes: Papagiannakopoulos (NYU) on KEAP1 in lung cancer; DeNicola (Moffitt); Skoulidis and Heymach (MD Anderson) on STK11/KEAP1 and IO."],
    links: [{ label: "Romero et al., Keap1 loss promotes Kras-driven lung cancer and results in dependence on glutaminolysis (Nature Medicine 2017)", url: "https://doi.org/10.1038/nm.4407" }],
    tags: ["mechanism"],
  }),
  p({
    id: "swi-snf-chromatin", name: "SWI/SNF chromatin remodelling", wikipedia: W("SWI/SNF"),
    tldr: "A machine that opens and closes DNA so genes can be read. One in five cancers has a broken part (ARID1A, SMARCA4, PBRM1), and losing one part often creates a dependence on its twin, which is the basis for new synthetic-lethal drugs.",
    summary: "SWI/SNF (BAF, PBAF, ncBAF) complexes remodel nucleosomes; subunits are mutated in ~20% of cancers: ARID1A (ovarian clear cell, endometrial, bladder), SMARCA4 (lung, SCCOHT), PBRM1 (clear-cell RCC), SMARCB1 (rhabdoid tumours, epithelioid sarcoma). Dependencies: SMARCA4-loss → SMARCA2 (degraders in trials), ARID1A-loss → EZH2/ATR/PARP, SMARCB1-loss → EZH2 (tazemetostat, withdrawn 2026 for safety). PBRM1 loss associates with IO response in RCC (debated). FHD-286 (BRM/BRG1 inhibitor) is in AML trials.",
    analogy: "A librarian who unlocks shelves on request. When one librarian is fired the other covers both shifts; fire the second and the library stops working. That second librarian is the drug target.",
    nodes: [
      { id: "baf", label: "BAF / PBAF / ncBAF", x: 40, y: 30 }, { id: "nuc", label: "Nucleosome repositioning", x: 70, y: 30 }, { id: "tx", label: "Enhancer access, differentiation genes", x: 90, y: 55 },
      { id: "arid", label: "ARID1A loss", x: 12, y: 20 }, { id: "smarca4", label: "SMARCA4 loss → SMARCA2 dependence", x: 12, y: 50 }, { id: "smarcb1", label: "SMARCB1 loss → EZH2", x: 12, y: 80, targetId: "ezh2" }, { id: "prc2", label: "PRC2 (EZH2) antagonism", x: 60, y: 75, targetId: "ezh2" },
    ],
    edges: [{ from: "baf", to: "nuc" }, { from: "nuc", to: "tx" }, { from: "arid", to: "baf", type: "inhibits" }, { from: "smarca4", to: "baf", type: "inhibits" }, { from: "smarcb1", to: "baf", type: "inhibits" }, { from: "prc2", to: "tx", type: "inhibits" }, { from: "baf", to: "prc2", type: "inhibits" }],
    interventions: ["SMARCA2 degraders (PRT3789, PRT7732) in SMARCA4-mutant cancers (phase 1/2)", "EZH2 inhibition in SMARCB1-deficient tumours (tazemetostat withdrawn 2026)", "ATR/PARP inhibitors in ARID1A-mutant tumours (trials)", "FHD-286 in AML"],
    pathways: ["epigenetic-reprogramming", "cancer-stem-cells-plasticity", "replication-stress"], targets: ["ezh2", "atr"], cancers: ["rcc", "ovarian", "nsclc", "sarcoma"], technologies: ["synthetic-lethality-approaches", "protac-degrader"],
    institutions: ["dana-farber", "broad-institute", "stanford"],
    notes: ["Leading programmes: Kadoch (Dana-Farber/Broad) on SWI/SNF structure and Foghorn Therapeutics; Crabtree (Stanford); Roberts (St. Jude) on SMARCB1."],
    links: [{ label: "Centore, Sandoval, Soares, Kadoch & Chan, Mammalian SWI/SNF chromatin remodeling complexes (Trends in Genetics 2020)", url: "https://doi.org/10.1016/j.tig.2020.07.011" }],
    tags: ["mechanism"],
  }),
  p({
    id: "epigenetic-reprogramming", related: ["epigenetic-progenitor-theory"], name: "Epigenetic reprogramming", wikipedia: W("Cancer_epigenetics"),
    tldr: "Cancer changes not just its genes but how they are read: chemical tags on DNA and histones silence guardians and awaken growth programmes. Unlike mutations, these changes are reversible, which is the hope behind epigenetic drugs.",
    summary: "DNA methylation (DNMT1/3A, TET2, IDH-driven hypermethylation), histone marks (EZH2/H3K27me3, KMT2 family, H3K27M in glioma, NSD2 in myeloma), chromatin readers (BET proteins), and remodelling (SWI/SNF) are all mutated or hijacked. 'Non-mutational epigenetic reprogramming' is a 2022 hallmark: drug-tolerant persister states arise without new mutations. Approved: azacitidine/decitabine (MDS/AML), HDAC inhibitors (T-cell lymphoma), EZH2 (tazemetostat, withdrawn 2026), IDH inhibitors, menin inhibitors (KMT2A/NPM1 leukaemia). Solid tumour activity remains modest; combinations to re-express antigens or hormone receptors are the current bet. Methylation classifiers diagnose brain tumours and underlie cfDNA cancer detection.",
    analogy: "The genome is the book; epigenetics is the highlighting and the pages stapled shut. Cancer staples shut the safety chapters and highlights the growth chapters. Epigenetic drugs pull staples.",
    nodes: [
      { id: "dnmt", label: "DNA methylation (DNMT, TET2, IDH/2-HG)", x: 15, y: 25, targetId: "idh" }, { id: "hist", label: "Histone marks (EZH2, KMT2A, H3K27M)", x: 15, y: 55, targetId: "ezh2" }, { id: "reader", label: "Readers (BET) & remodellers (SWI/SNF)", x: 15, y: 85 },
      { id: "chrom", label: "Chromatin state", x: 50, y: 55 }, { id: "sil", label: "Silenced tumour suppressors, antigens", x: 82, y: 30 }, { id: "act", label: "Active oncogenic programmes, persister states", x: 82, y: 75 }, { id: "menin", label: "Menin-KMT2A scaffold", x: 50, y: 20, targetId: "menin" },
    ],
    edges: [{ from: "dnmt", to: "chrom" }, { from: "hist", to: "chrom" }, { from: "reader", to: "chrom" }, { from: "chrom", to: "sil" }, { from: "chrom", to: "act" }, { from: "menin", to: "hist" }],
    interventions: ["Hypomethylating agents (azacitidine, decitabine) with venetoclax in AML", "Menin inhibitors (revumenib, ziftomenib) in KMT2A/NPM1 leukaemia", "IDH inhibitors reverse 2-HG hypermethylation", "HDAC, BET, LSD1 inhibitors mostly in trials; epigenetic priming for immunotherapy"],
    pathways: ["swi-snf-chromatin", "cancer-stem-cells-plasticity", "er-signaling"], targets: ["idh", "ezh2", "menin", "kmt2a", "npm1", "tet2", "brd4"], drugs: ["azacitidine", "revumenib", "ziftomenib", "vorasidenib"], technologies: ["epigenetic-drugs", "methylation-profiling", "mced"], terms: ["nonmutational-epigenetic-reprogramming", "mgmt", "h3k27m"],
    institutions: ["johns-hopkins", "dkfz", "dana-farber", "mskcc"],
    notes: ["Leading programmes: Baylin (Johns Hopkins, DNA methylation); Pfister (DKFZ, methylation classification); Armstrong (Dana-Farber, menin/KMT2A); Allis legacy (Rockefeller, histone code)."],
    links: [HALLMARKS_2022, { label: "Baylin & Jones, Epigenetic determinants of cancer (Cold Spring Harbor Perspectives 2016)", url: "https://doi.org/10.1101/cshperspect.a019505" }],
    tags: ["mechanism"],
  }),
  p({
    asOf:"2026-11-08", related:["rna","gene","mutation","nonsense-mediated-decay"],
    id: "rna-splicing", name: "RNA splicing", wikipedia: W("RNA_splicing"),
    tldr: "RNA processing removes introns and joins retained exons. Different processing choices can produce different messages without changing the underlying gene sequence.",
    summary: "Splicing processes an initial RNA transcript. Exons are retained in a specified product and may contain untranslated sequence; introns are removed. For many nuclear pre-mRNAs, a spliceosome made of RNA and proteins recognizes boundary and regulatory sequences. The donor site starts an intron and the acceptor site ends it. Alternative choices yield transcript isoforms; a variant can alter exon inclusion, intron retention or use of a cryptic site. Exon skipping is not automatically a frameshift: the coding sequence and resulting joins matter. An altered message may undergo nonsense-mediated decay or produce a changed protein, but neither outcome follows from a prediction alone.\n\nCancer-associated splicing changes can arise through altered RNA-processing factors or their expression. SF3B1, SRSF2, U2AF1 and ZRSR2 illustrate studied factors; AR-V7 and BCL2L1 illustrate named transcript contexts. The linked review describes disease-specific mechanisms and therapeutic research. An altered transcript alone does not establish an intact abnormal protein, immune presentation, a therapeutic dependency or patient benefit. Free-drug development and a conjugated payload also require their own construct-specific evidence.",
    analogy: "Splicing is like editing a recording into different versions. A changed edit can alter the final product, but the RNA join alone does not show which complete protein is made or what it does.",
    nodes: [
      { id: "pre", label: "Pre-mRNA", x: 12, y: 40 }, { id: "sf3b1", label: "SF3B1 / SRSF2 / U2AF1 (mutant)", x: 38, y: 20 }, { id: "spl", label: "Spliceosome", x: 38, y: 60 }, { id: "iso", label: "Aberrant isoforms (AR-V7)", x: 66, y: 25, targetId: "androgen-receptor" },
      { id: "neo", label: "Splice neoantigens", x: 66, y: 60 }, { id: "rloop", label: "R-loops, replication stress", x: 66, y: 90 }, { id: "prmt5", label: "PRMT5 dependence", x: 90, y: 60 },
    ],
    edges: [{ from: "pre", to: "spl" }, { from: "sf3b1", to: "spl" }, { from: "spl", to: "iso" }, { from: "spl", to: "neo" }, { from: "sf3b1", to: "rloop" }, { from: "spl", to: "prmt5" }],
    interventions: ["Spliceosome modulators (H3B-8800 negative; next generation in development)", "PRMT5 inhibitors in MTAP-deleted and splicing-mutant cancers", "Antisense oligonucleotides to redirect splicing (AR-V7, BCL2L1)", "Splice-derived neoantigen vaccines (research)"],
    pathways: ["myc", "replication-stress", "ar-signaling", "antigen-presentation-immunoediting"], targets: ["androgen-receptor"], cancers: ["aml", "cll", "melanoma", "prostate"], terms: ["ar-v7", "neoantigen"], technologies: ["antisense-sirna", "rna-seq"],
    institutions: ["mskcc", "dana-farber", "fred-hutch"],
    notes: ["Leading programmes: Abdel-Wahab (MSK) on spliceosome mutations; Bradley (Fred Hutch) on splicing and neoantigens; Ebert (Dana-Farber) on SF3B1 in MDS.","A junction read supports a local RNA join, not necessarily a complete isoform. Gene-level counts can hide transcript differences. RNA quality, read coverage, reference version and cell mixture affect interpretation; protein quantity and function need separate evidence.","The pathway drawing groups possible consequences studied in particular cancer systems. Its arrows do not mean that every splice change causes every listed outcome; protein formation, presentation and functional dependence require their own evidence."],
    links: [{"label":"Bradley & Anczuków, RNA splicing dysregulation and the hallmarks of cancer (Nature Reviews Cancer 2023)","url":"https://doi.org/10.1038/s41568-022-00541-7"},{"label":"NHGRI: Exon","url":"https://www.genome.gov/genetics-glossary/Exon"},{"label":"NHGRI: Intron","url":"https://www.genome.gov/genetics-glossary/Intron"},{"label":"OpenStax Biology 2e: 16-5-eukaryotic-post-transcriptional-gene-regulation","url":"https://openstax.org/books/biology-2e/pages/16-5-eukaryotic-post-transcriptional-gene-regulation"},{"label":"Intron function in the nonsense-mediated decay of beta-globin mRNA: indications that pre-mRNA splicing in the nucleus can influence mRNA translation in the cytoplasm.","url":"https://pubmed.ncbi.nlm.nih.gov/9671053/"},{"label":"HGVS: reference sequences","url":"https://hgvs-nomenclature.org/stable/background/refseq/"}],
    tags: ["mechanism"],
  }),
  p({
    id: "mrna-translation-eif4f", name: "mRNA translation (eIF4F / mTOR)", wikipedia: W("EIF4E"),
    tldr: "Cancer cells must make protein at furious speed. The eIF4F complex that starts protein synthesis is the funnel where growth signals converge, and drugs that pinch the funnel starve the tumour of the proteins it needs most.",
    summary: "mTORC1 phosphorylates 4E-BPs, releasing eIF4E to form eIF4F (eIF4E/4G/4A) and translate cap-dependent, oncogene-rich mRNAs (MYC, cyclin D1, BCL-2, MCL-1); MNK kinases phosphorylate eIF4E. Ribosomal protein and rRNA synthesis (POLR1, RNA pol I inhibitors such as CX-5461) are collateral dependencies. Drugs: eIF4A inhibitors (zotatifin, phase 1/2 in ER+ breast and KRAS-mutant cancers), MNK inhibitors (tomivosertib), mTOR inhibitors (everolimus approved), and RNA pol I inhibitors in BRCA/HRD (CX-5461 with PARP). Translation control is a shared node downstream of PI3K, RAS, and MYC.",
    analogy: "A factory's single loading dock (eIF4F). No matter how many orders the managers (RAS, PI3K, MYC) shout, everything must pass through the dock. Narrow the dock and the most urgent, oversized orders (oncogene proteins) are the first to fail.",
    nodes: [
      { id: "mtor", label: "mTORC1", x: 15, y: 30, targetId: "akt" }, { id: "4ebp", label: "4E-BP", x: 40, y: 30 }, { id: "eif4e", label: "eIF4E", x: 62, y: 30 }, { id: "eif4f", label: "eIF4F (4E/4G/4A)", x: 82, y: 30 },
      { id: "mnk", label: "MNK1/2", x: 62, y: 65 }, { id: "onc", label: "MYC, cyclin D1, MCL-1 translation", x: 82, y: 70 }, { id: "ribo", label: "Ribosome biogenesis (Pol I)", x: 15, y: 70 },
    ],
    edges: [{ from: "mtor", to: "4ebp", type: "inhibits" }, { from: "4ebp", to: "eif4e", type: "inhibits" }, { from: "eif4e", to: "eif4f" }, { from: "eif4f", to: "onc" }, { from: "mnk", to: "eif4e" }, { from: "mtor", to: "ribo" }, { from: "ribo", to: "onc" }],
    interventions: ["mTOR inhibitors (everolimus) approved in breast, RCC, NET", "eIF4A inhibitor zotatifin (eFT226) phase 1/2 with fulvestrant/abemaciclib", "MNK inhibitors (tomivosertib) in NSCLC (mixed)", "RNA Pol I inhibitors (CX-5461, pidnarulex) in HRD cancers"],
    pathways: ["pi3k-akt-mtor", "myc", "ras-mapk"], targets: ["akt", "pik3ca"], drugs: ["everolimus"],
    institutions: ["mgh", "mskcc", "ucsf"],
    notes: ["Leading programmes: Sonenberg (McGill); Ruggero (UCSF) on translation control in cancer; Pelletier (McGill) on eIF4A; eFFECTOR Therapeutics."],
    links: [{ label: "Fabbri, Chakraborty, Robert & Vagner, The plasticity of mRNA translation during cancer progression and therapy resistance (Nature Reviews Cancer 2021)", url: "https://doi.org/10.1038/s41568-021-00380-y" }],
    tags: ["mechanism"],
  }),
  p({
    id: "circadian-control", name: "Circadian control", wikipedia: W("Chronotherapy_(treatment_scheduling)"),
    tldr: "Cells run on a 24-hour clock that gates cell division, DNA repair, and drug metabolism. Cancers often break their clocks, and the time of day a drug or immunotherapy is given can change how well it works.",
    summary: "The CLOCK/BMAL1-PER/CRY loop times metabolism, cell-cycle checkpoints, and DNA repair; shift work is a probable carcinogen (IARC 2A) and clock-gene disruption accelerates tumorigenesis in mice. Chronomodulated chemotherapy (Lévi, oxaliplatin/5-FU) improved tolerability in colorectal cancer; retrospective and prospective data (MEMOIR, 2024-25) suggest checkpoint inhibitors given earlier in the day yield longer survival, likely through T-cell trafficking rhythms. Clock-targeting drugs (REV-ERB agonists, CRY stabilisers) are preclinical. Implementation is cheap but trial evidence is still limited.",
    analogy: "A city that lowers its bridges only at certain hours. Send the army (drug, T cells) when the bridges are down and it gets in; send it at midnight and it waits outside.",
    nodes: [
      { id: "clock", label: "CLOCK/BMAL1", x: 25, y: 35 }, { id: "per", label: "PER/CRY (repress)", x: 25, y: 70 }, { id: "cycle", label: "Cell-cycle gating (WEE1, MYC)", x: 60, y: 20, targetId: "wee1" }, { id: "repair", label: "DNA repair timing", x: 60, y: 50 },
      { id: "immune", label: "T-cell trafficking rhythm", x: 60, y: 80 }, { id: "tx", label: "Time-of-day drug response", x: 90, y: 50 },
    ],
    edges: [{ from: "clock", to: "per" }, { from: "per", to: "clock", type: "inhibits" }, { from: "clock", to: "cycle" }, { from: "clock", to: "repair" }, { from: "clock", to: "immune" }, { from: "cycle", to: "tx" }, { from: "repair", to: "tx" }, { from: "immune", to: "tx" }],
    interventions: ["Morning versus afternoon immunotherapy dosing (prospective trials ongoing)", "Chronomodulated chemotherapy infusion", "Clock-modulating compounds (preclinical)"],
    pathways: ["p53-cell-cycle", "myc", "pd1-checkpoint"], targets: ["wee1"], technologies: ["checkpoint-inhibitor", "cytotoxic-chemotherapy"],
    institutions: ["mskcc", "penn-abramson"],
    notes: ["Leading programmes: Lévi (Warwick/Paris) on chronotherapy; Sassone-Corsi legacy (UC Irvine); Scheiermann (Geneva) on immune rhythms; MEMOIR trial (Winship/Emory)."],
    links: [{ label: "Qian et al., Effect of immunotherapy time-of-day infusion on overall survival among patients with advanced melanoma (Lancet Oncology 2021)", url: "https://doi.org/10.1016/S1470-2045(21)00546-5" }],
    tags: ["mechanism"],
  }),
  p({
    id: "microbiome-tumour", name: "Microbiome-tumour interactions", wikipedia: W("Microbiome"),
    tldr: "The bacteria in the gut, and even inside tumours, influence whether cancer starts and whether immunotherapy works. Transplanting stool from responders has made some non-responders respond.",
    summary: "Gut microbiota modulate systemic immunity (Bifidobacterium, Akkermansia, Faecalibacterium associated with PD-1 response; antibiotics associated with worse outcomes); faecal microbiota transplant from responders converted a fraction of refractory melanoma patients to responders (2021, and 2023-25 follow-ups). Intratumoural bacteria (Fusobacterium nucleatum in colorectal cancer, Gammaproteobacteria degrading gemcitabine in pancreatic cancer) affect chemoresistance and inflammation; colibactin-producing pks+ E. coli leaves a mutational signature in CRC. 'Polymorphic microbiomes' is a 2022 hallmark. Defined consortia (VE800, SER-155) and diet interventions are in trials; causality beyond melanoma is not settled.",
    analogy: "Soil bacteria decide whether a garden thrives. Some feed the plants' defenders, some produce poisons, and some even eat the pesticide before it reaches the weeds.",
    nodes: [
      { id: "gut", label: "Gut microbiota", x: 15, y: 40 }, { id: "meta", label: "Metabolites (SCFA, inosine, bile acids)", x: 40, y: 20 }, { id: "dc", label: "Dendritic / T-cell priming", x: 65, y: 20 }, { id: "io", label: "Immunotherapy response", x: 90, y: 40, targetId: "pd1" },
      { id: "intra", label: "Intratumoural bacteria", x: 40, y: 70 }, { id: "chemo", label: "Chemotherapy degradation, inflammation", x: 65, y: 70 }, { id: "abx", label: "Antibiotics", x: 15, y: 80 }, { id: "colib", label: "Colibactin → mutational signature", x: 90, y: 80 },
    ],
    edges: [{ from: "gut", to: "meta" }, { from: "meta", to: "dc" }, { from: "dc", to: "io" }, { from: "abx", to: "gut", type: "inhibits" }, { from: "intra", to: "chemo" }, { from: "intra", to: "colib" }, { from: "gut", to: "intra" }],
    interventions: ["FMT from responders with PD-1 blockade (phase 2)", "Defined bacterial consortia (VE800, SER-155) and diet (fibre) trials", "Antibiotic stewardship around immunotherapy", "Fusobacterium-targeted strategies (research)"],
    pathways: ["pd1-checkpoint", "inflammation-nfkb", "tumor-microenvironment"], targets: ["pd1"], cancers: ["melanoma", "colorectal", "pancreatic"], terms: ["polymorphic-microbiomes", "mutational-signature"],
    institutions: ["md-anderson", "gustave-roussy", "penn-abramson", "johns-hopkins"],
    notes: ["Leading programmes: Wargo (MD Anderson); Zitvogel (Gustave Roussy); Gajewski (Chicago); Sears (Johns Hopkins) on colibactin; Straussman (Weizmann) on intratumoural bacteria."],
    links: [{ label: "Davar et al., Fecal microbiota transplant overcomes resistance to anti-PD-1 therapy in melanoma (Science 2021)", url: "https://doi.org/10.1126/science.abf3363" }, HALLMARKS_2022],
    tags: ["mechanism"],
  }),
  p({
    id: "cancer-neuroscience", name: "Cancer neuroscience (brain-to-cancer and nerve-tumour signalling)", wikipedia: W("Neuro-oncology"), asOf: "2026-11-03",
    tldr: "Cancer neuroscience studies how the brain, peripheral nerves and tumours signal to one another. Mouse studies have mapped brain-to-cancer circuits in breast, bowel and lung cancer, but no such circuit is an established treatment target in people, and the findings do not mean that stress caused anyone's cancer.",
    summary: "Cancer neuroscience covers several kinds of communication. Peripheral tumours can recruit sympathetic, parasympathetic and sensory nerves, while nerve signals can act on cancer, stromal and immune cells. Gliomas go further: human tumour samples and mouse models show functional neuron-glioma synapses and activity-regulated growth.\n\nBrain-to-peripheral-tumour circuits have been manipulated causally in animals. In 2023, Xiong and colleagues traced a circuit from central medial amygdala corticotropin-releasing hormone neurons through the lateral paragigantocellular nucleus to sympathetic fibres inside mouse mammary tumours. Turning the circuit up or down changed intratumour norepinephrine, immune-cell profiles and tumour growth. Mouse colorectal cancer experiments published in 2025 mapped a lateral-septum-to-enteric circuit whose GABA signal acted on tumour cells, with a human imaging association between septal activity and tumour size. Mouse lung adenocarcinoma work published in 2026 mapped a tumour-to-vagal-sensory-to-brainstem-to-sympathetic loop that suppressed macrophage and T-cell activity; human tumour datasets supplied an association, not a causal intervention.\n\nHuman treatment evidence is much thinner. A triple-blind trial gave 60 people propranolol or placebo for seven days before breast cancer surgery and found changes in tumour gene-expression and immune biomarkers, but it did not test recurrence or survival. A 2024 meta-analysis of 24 studies found no significant association between beta-blocker use and breast cancer recurrence or death. Alprazolam slowed mammary tumour growth in the Xiong mouse experiments, but it is not an anticancer treatment. Mental-health care remains important for distress and quality of life alongside evidence-based oncology care; these studies do not show that anxiety, thoughts or coping caused a person's cancer.",
    analogy: "A two-way telephone network: tumours can call the brain through sensory nerves, the brain can answer through autonomic nerves, and local nerve endings can change tumour and immune cells. Animal experiments can trace and interrupt individual lines, but human treatment evidence is still limited.",
    nodes: [
      { id: "brain", label: "Brain circuit", x: 15, y: 25 }, { id: "auto", label: "Autonomic output", x: 40, y: 25 }, { id: "nerve", label: "Tumour nerve fibres", x: 65, y: 25 },
      { id: "signal", label: "Norepinephrine, acetylcholine, GABA", x: 65, y: 60 }, { id: "immune", label: "Tumour and immune cells", x: 88, y: 60 }, { id: "growth", label: "Growth or restraint", x: 88, y: 90 },
      { id: "sensory", label: "Tumour-to-brain sensory input", x: 40, y: 80 }, { id: "syn", label: "Neuron-glioma synapse", x: 15, y: 65 },
    ],
    edges: [{ from: "brain", to: "auto" }, { from: "auto", to: "nerve" }, { from: "nerve", to: "signal" }, { from: "signal", to: "immune" }, { from: "immune", to: "growth" }, { from: "sensory", to: "brain" }, { from: "immune", to: "sensory" }, { from: "syn", to: "growth" }],
    interventions: ["Defined brain-circuit manipulation remains mouse research, with no human treatment equivalent", "Propranolol and other beta-blockers have biomarker trials, but no established recurrence or survival benefit", "Botulinum toxin denervation is early clinical research", "AMPA-receptor and neuroligin-3 signalling are being studied in glioma", "Mental-health and supportive care treat distress and quality of life; they do not replace cancer treatment"],
    pathways: ["tumor-microenvironment", "metastatic-cascade"], cancers: ["pancreatic", "prostate", "glioblastoma", "head-and-neck", "melanoma", "breast-cancer", "colorectal", "nsclc"], targets: ["ntrk"],
    institutions: ["stanford", "mskcc", "md-anderson"],
    keyPapers: ["paper-xiong-brain-tumor-circuit-jci-2023", "paper-venkatesh-nature", "paper-monje-cell"],
    notes: ["Leading programmes: Monje (Stanford) on neuron-glioma synapses; Winkler (Heidelberg/DKFZ) on tumour microtubes; Wong (MSK) and Amit (MD Anderson) on nerves in pancreatic and head and neck cancer; Cancer Grand Challenges NexTGen/ neuroscience teams.", "A separate 2019 autonomic breast-tumour innervation paper was retracted in 2024 and is not used as evidence on this page."],
    links: [{ label: "Xiong et al., A brain-tumor neural circuit controls breast cancer progression in mice (JCI 2023)", url: "https://doi.org/10.1172/JCI167725" }, { label: "Li et al., colorectal cancer hijacks a lateral-septum-to-enteric circuit (Nature Cancer 2025)", url: "https://doi.org/10.1038/s43018-025-01033-x" }, { label: "Wei et al., lung tumour-brain crosstalk through a sensory-sympathetic axis (Nature 2026)", url: "https://doi.org/10.1038/s41586-025-10028-8" }, { label: "Hiller et al., seven-day preoperative propranolol biomarker trial (Clinical Cancer Research 2020)", url: "https://doi.org/10.1158/1078-0432.CCR-19-2641" }, { label: "Scott et al., beta-blocker use and breast cancer outcomes meta-analysis (2024)", url: "https://doi.org/10.1007/s10549-024-07263-4" }, { label: "Venkatesh et al., Electrical and synaptic integration of glioma into neural circuits (Nature 2019)", url: "https://doi.org/10.1038/s41586-019-1563-y" }, { label: "Monje et al., Roadmap for the emerging field of cancer neuroscience (Cell 2020)", url: "https://doi.org/10.1016/j.cell.2020.03.034" }, { label: "Retraction notice for the separate 2019 autonomic-innervation paper", url: "https://doi.org/10.1038/s41593-024-01628-0" }],
    tags: ["mechanism"],
  }),
  p({
    id: "cachexia-biology", name: "Cancer cachexia", wikipedia: W("Cachexia"),
    tldr: "The wasting syndrome that kills up to a third of cancer patients: tumours send hormonal signals (GDF-15, IL-6) that switch off appetite and burn muscle and fat. The first drug to reverse it, ponsegromab, showed weight gain in 2024.",
    summary: "Tumour- and host-derived GDF-15 acts on the brainstem GFRAL receptor to suppress appetite; IL-6/STAT3, TNF, activin/myostatin, and glucocorticoids drive muscle proteolysis (ubiquitin-proteasome, autophagy) and adipose lipolysis/browning. Cachexia worsens treatment tolerance and is largely irreversible late. Ponsegromab (anti-GDF-15, Pfizer) increased weight and activity in a phase 2 trial (NEJM 2024) and is in phase 3; anamorelin (ghrelin agonist) is approved in Japan; nutrition and exercise remain foundational. Cachexia is now treated as a target in its own right rather than an inevitability.",
    analogy: "A thermostat hijacked by the tumour: it tells the body it is full when it is starving and orders the furnace to burn muscle for fuel. Ponsegromab cuts the wire to the thermostat.",
    nodes: [
      { id: "tum", label: "Tumour + inflammation", x: 15, y: 50 }, { id: "gdf", label: "GDF-15 → GFRAL (brainstem)", x: 45, y: 25 }, { id: "il6", label: "IL-6 / TNF / activin", x: 45, y: 75 }, { id: "app", label: "Anorexia", x: 75, y: 25 },
      { id: "muscle", label: "Muscle proteolysis, fat lipolysis", x: 75, y: 75 }, { id: "out", label: "Weight loss, frailty, death", x: 92, y: 50 },
    ],
    edges: [{ from: "tum", to: "gdf" }, { from: "tum", to: "il6" }, { from: "gdf", to: "app" }, { from: "il6", to: "muscle" }, { from: "app", to: "out" }, { from: "muscle", to: "out" }],
    interventions: ["Ponsegromab (anti-GDF-15) phase 3", "Anamorelin (approved Japan), olanzapine for appetite, corticosteroids short term", "Exercise and nutrition support (ESPEN/ASCO guidelines)", "Anti-IL-6 and activin/myostatin agents in trials"],
    pathways: ["jak-stat", "inflammation-nfkb", "cancer-metabolism"], technologies: ["exercise-oncology", "geriatric-assessment"], cancers: ["pancreatic", "nsclc", "gastric"],
    institutions: ["fred-hutch", "cold-spring-harbor", "md-anderson"],
    notes: ["Leading programmes: Janowitz (CSHL) on cachexia mechanisms; Fearon legacy (Edinburgh) on definitions; Roeland (Oregon) and Baracos (Alberta) on clinical cachexia; Pfizer ponsegromab programme; Cancer Grand Challenges CANCAN team."],
    links: [{ label: "Groarke et al., Ponsegromab for the treatment of cancer cachexia (NEJM 2024)", url: "https://doi.org/10.1056/NEJMoa2409515" }],
    tags: ["mechanism"],
  }),
  p({
    id: "clonal-haematopoiesis", related: [
  "ageing-tissue-field-theory",
  "ctdna-imaging-discordance"
], name: "Clonal haematopoiesis (CHIP)", wikipedia: W("Clonal_hematopoiesis"),
    tldr: "Some blood-forming cells acquire mutations and form an expanding clone. This can affect blood tests for tumour DNA and is distinct from a diagnosis of leukaemia.",
    summary: "Clonal haematopoiesis of indeterminate potential (CHIP, a defined category within blood-cell clonal expansion; see the source-specific variant-fraction and clinical criteria below) is present in >10% of people over 70. It confers ~0.5-1%/year progression to myeloid neoplasm, doubles cardiovascular risk via inflammasome-primed macrophages, and predicts therapy-related MDS/AML after PARP inhibitors, platinum, and radioligand therapy. For plasma testing, blood-cell clones can contribute variants that require origin assessment using matched blood-cell data, tumour evidence and the stated assay limits; some assignments remain ambiguous. Interventions are preventive (avoid unnecessary genotoxic exposure, monitor) with IL-1β/IL-6 blockade under study.",
    analogy: "Weeds in the blood's seed bank. Harmless individually, they spread with age and after chemical sprays, some turn into leukaemia, and their DNA litters the blood, so a test for tumour DNA can mistake weeds for cancer.",
    nodes: [
      { id: "hsc", label: "Ageing HSCs", x: 15, y: 50 }, { id: "mut", label: "DNMT3A, TET2, ASXL1, PPM1D, TP53", x: 40, y: 50, targetId: "tp53" }, { id: "chip", label: "CHIP clone (VAF ≥2%)", x: 65, y: 50 },
      { id: "mds", label: "Therapy-related MDS/AML", x: 90, y: 25 }, { id: "cvd", label: "Inflammation → cardiovascular disease", x: 90, y: 60 }, { id: "fp", label: "False-positive ctDNA", x: 90, y: 90 }, { id: "chemo", label: "Chemo, PARPi, radioligands select", x: 40, y: 85 },
    ],
    edges: [{ from: "hsc", to: "mut" }, { from: "mut", to: "chip" }, { from: "chip", to: "mds" }, { from: "chip", to: "cvd" }, { from: "chip", to: "fp" }, { from: "chemo", to: "chip" }],
    interventions: ["Paired white-blood-cell sequencing in liquid biopsy pipelines", "Monitoring after PARP inhibitors and radioligand therapy", "IL-1β/IL-6 blockade trials for CHIP-associated cardiovascular risk"],
    pathways: ["clonal-evolution", "inflammation-nfkb", "epigenetic-reprogramming"], targets: ["tp53", "parp", "tet2"], technologies: ["liquid-biopsy", "mrd-testing", "parp-inhibitor"], cancers: ["aml"], terms: ["vaf", "ctdna"],
    institutions: ["dana-farber", "broad-institute", "mskcc"],
    notes: [
  "Leading programmes: Ebert (Dana-Farber/Broad) and Jaiswal (Stanford) who defined CHIP; Levine and Bolton (MSK) on therapy-related clonal haematopoiesis.",
  "Clonal haematopoiesis (CH) is the broader phenomenon of blood-cell clones carrying acquired changes. In the 2022 WHO myeloid classification, CHIP requires a somatic mutation in a myeloid-malignancy-associated gene at a variant allele fraction of at least 2%, or at least 4% for X-linked gene mutations in males, without a diagnosed haematological disorder or unexplained cytopenia (Khoury 2022). Persistent unexplained cytopenia changes the classification question. These are criteria for a named category, not a rule that every smaller blood-cell clone is absent, tumour-derived or a sequencing error.",
  "Which genes: in blood-cell exomes from 17,182 people most clonal variants fell in DNMT3A, TET2 and ASXL1, were rare before age 40, and were seen in 9.5% of people aged 70 to 79 (Jaiswal 2014). ASXL1 mutations were enriched in current or former smokers, and radiation, platinum and topoisomerase II inhibitors selected for DNA-damage-response genes (TP53, PPM1D, CHEK2), with sequential samples showing those clones outgrowing others after exposure (Bolton 2020). In 8,810 people with non-haematological cancers, PPM1D and TP53 mutations were associated with prior chemotherapy, and clonal haematopoiesis was found in 25% (Coombs 2017).",
  "Source attribution in plasma, interpretation rule: TP53 is a tumour gene and also a therapy-selected blood-cell gene, so a TP53 variant in plasma after chemotherapy can come from either compartment. Matched white-blood-cell DNA and the tumour's variant list, where available, help assess its origin; some variants remain ambiguous. In Razavi's paired sequencing 53.2% of cfDNA mutations in 124 people with metastatic cancer and 81.6% in 47 controls without cancer had features of clonal haematopoiesis, and variants that could not be separated from white-blood-cell DNA kept an explicit ambiguous category, so subtracting every blood match is not a complete attribution method.",
  "Fictional example: a plasma assay detects a variant that sensitive matched blood-cell sequencing finds at 0.8% VAF. The blood result supports a blood-cell contribution even below the 2% cut-off, but it does not make the variant CHIP or exclude a tumour contribution, because tumour evidence, shared variants and each method's limits still apply. Matched sequencing has its own gene coverage, depth and detection rules, so a clone below its sensitivity can stay unseen, and a clone finding is not a leukaemia diagnosis or a solid-tumour treatment instruction.",
  "Reading the figures: a variant allele fraction counts variant alleles among the alleles evaluated and is not automatically the percentage of cells. Acquired (somatic) means not inherited and does not mean malignant. There is no age at which a plasma variant can simply be dismissed. Sequential samples show clones with DNA-damage-response mutations outgrowing others after radiation, platinum or topoisomerase II inhibitor exposure (Bolton 2020), which is selection of clones that can already be present and does not mean every new detection was caused by treatment.",
  "For an origin comparison, keep plasma, extracted blood-cell DNA and any separately sampled tumour clearly identified, with collection dates relative to treatment. The report needs the variants, coverage, allele fractions, detection limits, identity and contamination checks, and any unresolved source assignment. A clone result alone does not locate a solid-tumour lesion, predict whether that particular clone will progress, or choose a solid-tumour drug. A later blood-cell comparator can help, but it is not a time-matched measurement of the earlier sample. A clone-classification rule or origin filter does not itself establish regulatory approval or clinical validation of the sequencing method."
,
    "A gene name does not settle a plasma variant's source. Shah and colleagues found TP53 to be the most frequently mutated gene in their 2012 primary triple-negative breast-cancer cohort; Bolton's 2020 study found that radiation, platinum and topoisomerase II inhibitor exposure selected blood-cell clones with TP53 and other DNA-damage-response mutations. Those are different populations and compartments. A tumour reference and a matched blood-cell comparison help answer different questions, each within its own coverage and sensitivity. A newly confirmed tumour alteration can also reflect evolution rather than a blood-cell clone or technical noise."
  ],
    links: [
  {
    "label": "Jaiswal et al., Age-related clonal hematopoiesis associated with adverse outcomes (NEJM 2014)",
    "url": "https://doi.org/10.1056/NEJMoa1408617"
  },
  {
    "label": "Bolton et al., Cancer therapy shapes the fitness landscape of clonal hematopoiesis (Nature Genetics 2020)",
    "url": "https://doi.org/10.1038/s41588-020-00710-0"
  },
  {
    "label": "High-intensity sequencing reveals the sources of plasma circulating cell-free DNA variants",
    "url": "https://doi.org/10.1038/s41591-019-0652-7"
  },
  {
    "label": "Therapy-Related Clonal Hematopoiesis in Patients with Non-hematologic Cancers Is Common and Associated with Adverse Clinical Outcomes",
    "url": "https://doi.org/10.1016/j.stem.2017.07.010"
  },
  {
    "label": "Steensma2015",
    "url": "https://doi.org/10.1182/blood-2015-03-631747"
  },
  {
    "label": "Khoury et al.: WHO myeloid and histiocytic/dendritic classification (2022)",
    "url": "https://doi.org/10.1038/s41375-022-01613-1"
  }
,
    {"label":"Shah et al., 2012: clonal and mutational evolution in primary triple-negative breast cancer","url":"https://doi.org/10.1038/nature10933"}
  ],
    tags: ["mechanism"],

"asOf": "2026-11-12"
}),
  p({
    id: "field-cancerisation", related: ["ageing-tissue-field-theory"], name: "Field cancerisation", wikipedia: W("Field_cancerization"),
    tldr: "Cancer often arises from a whole region of tissue that already carries mutations, not from one rogue cell. Sun-exposed skin, smokers' airways, and Barrett's oesophagus are patchworks of mutant clones competing long before a tumour appears.",
    summary: "Deep sequencing of normal tissue shows that by middle age, sun-exposed skin, oesophagus (NOTCH1, TP53), bronchial epithelium, endometrium, and colon crypts are colonised by clones carrying cancer-driver mutations, most of which never progress. Field effects explain second primary tumours and local recurrence after resection, and they define who benefits from interception (chemoprevention, surveillance). Clonal competition can even be protective (NOTCH1-mutant oesophageal clones outcompete TP53 clones). Understanding the transition from field to tumour is the central question for early detection and prevention.",
    analogy: "A lawn where many patches have already turned to weeds. Any single tumour is one patch that took over; mowing it leaves the rest of the lawn ready to sprout again.",
    nodes: [
      { id: "expo", label: "Carcinogen exposure, ageing", x: 15, y: 40 }, { id: "clones", label: "Mutant clones in normal tissue (NOTCH1, TP53)", x: 42, y: 40, targetId: "tp53" }, { id: "comp", label: "Clonal competition", x: 68, y: 20 },
      { id: "prog", label: "Progression to dysplasia → cancer", x: 68, y: 65 }, { id: "second", label: "Second primaries, local recurrence", x: 92, y: 65 }, { id: "interc", label: "Interception: chemoprevention, ablation", x: 92, y: 20 },
    ],
    edges: [{ from: "expo", to: "clones" }, { from: "clones", to: "comp" }, { from: "clones", to: "prog" }, { from: "prog", to: "second" }, { from: "interc", to: "prog", type: "inhibits" }],
    interventions: ["Surveillance and ablation of precancer (Barrett's RFA, cervical precancer ablation, colon polypectomy)", "Chemoprevention (aspirin in Lynch, tamoxifen, HPV vaccination)", "Field-directed therapy after resection (e.g., 5-FU cream for actinic keratosis)", "Molecular monitoring of fields (cytosponge, sputum, urine)"],
    pathways: ["clonal-evolution", "epigenetic-reprogramming"], targets: ["tp53"], technologies: ["chemoprevention", "precancer-ablation", "endoscopic-resection", "hpv-vaccine"], cancers: ["esophageal", "head-and-neck", "nsclc", "cervical", "colorectal"], terms: ["barretts-esophagus", "cin-hsil"],
    institutions: ["cruk", "francis-crick", "johns-hopkins"],
    notes: ["Leading programmes: Jones (Wellcome Sanger) on clones in normal oesophagus and skin; Campbell/Stratton (Sanger) on somatic mutation in normal tissues; Fitzgerald (Cambridge/CRUK) on Barrett's interception; Hopkins on field cancerisation in head and neck."],
    links: [{ label: "Martincorena et al., Somatic mutant clones colonize the human esophagus with age (Science 2018)", url: "https://doi.org/10.1126/science.aau3879" }],
    tags: ["mechanism"],
  }),
  p({
    id: "tumor-dormancy", name: "Tumour dormancy",
    tldr: "Viable cancer cells may remain nondividing, or a population may stay stable because gains balance losses. A quiet scan alone cannot establish either state.",
    summary: "Dormancy describes viable persistence with restrained growth, at the cellular or population level. Model experiments investigate immune and vascular contributions, but stable imaging does not reveal which cells are present or what maintains them. Dormancy is neither proof of harmlessness nor a prediction that recurrence will occur.",
    analogy: "Seeds that stay in the soil for years waiting for the right spring. You can keep the ground cold (maintenance therapy), force them to sprout and mow them (wake-and-kill), or dig them out (immune clearance).",
    nodes: [
      { id: "dtc", label: "Disseminated tumour cell", x: 15, y: 50 }, { id: "quies", label: "Quiescence (p38↑, ERK↓, NR2F1)", x: 42, y: 30 }, { id: "niche", label: "Niche: TGF-β2, BMP7, endothelium", x: 42, y: 70 },
      { id: "immune", label: "NK / T-cell surveillance", x: 15, y: 15 }, { id: "wake", label: "Awakening: NETs, inflammation, ageing", x: 70, y: 50 }, { id: "relapse", label: "Late relapse", x: 92, y: 50 },
    ],
    edges: [{ from: "dtc", to: "quies" }, { from: "niche", to: "quies" }, { from: "immune", to: "dtc", type: "inhibits" }, { from: "wake", to: "quies", type: "inhibits" }, { from: "wake", to: "relapse" }, { from: "quies", to: "relapse", type: "inhibits" }],
    interventions: ["Extended adjuvant endocrine therapy and CDK4/6 inhibitors (de facto dormancy maintenance)", "5-azacytidine + all-trans retinoic acid to enforce dormancy (pilot, prostate)", "MRD-guided intervention at molecular relapse", "NET/inflammation inhibitors to prevent awakening (preclinical)"],
    pathways: ["metastatic-cascade", "clonal-evolution", "tgf-beta", "er-signaling"], technologies: ["mrd-testing", "endocrine-therapy", "cdk46-inhibitor"], cancers: ["breast-hr-positive", "prostate", "melanoma"], terms: ["late-recurrence", "disseminated-tumor-cells", "mrd"],
    institutions: ["mount-sinai", "cold-spring-harbor", "mskcc"],
    notes: [
  "Leading programmes: Aguirre-Ghiso (Einstein/Mount Sinai) on dormancy signalling and NR2F1; Egeblad (CSHL) on NETs awakening dormant cells; Massagué (MSK) on latency competent cells; Ghajar (Fred Hutch) on perivascular niches.",
  "Cellular dormancy is viable nondivision; population-level dormancy can instead reflect balanced division and loss or other growth restraint. Restricted vascular support and immune control are possible contributors, not proof that every cell stopped cycling. Dormancy is different from death and from senescence or another arrest; low proliferation alone does not distinguish all these states.",
  "Ghajar studied mouse breast-cancer metastasis and engineered microvascular cultures. Stable endothelial niches supported quiescence, with thrombospondin-1 implicated, while sprouting regions enriched in active TGF-beta1 and periostin supported outgrowth. This is a model-specific mechanism, not a universal human reactivation trigger. A quiet scan can mean no cells, cells below detection or restrained growth. It does not prove dormancy, harmlessness, inevitable recurrence or a universal relapse clock.",
  "Fictional one-week cultures both end with 100 viable cells. In one, no divisions or losses occur; in the other, 20 gains are balanced by 20 losses. Equal final size does not establish equal cellular state. Distinguishing these cases needs repeated viable counts, division and loss measurements, sample or volume denominators and time. Clinical scans, blood assays and controlled environmental experiments answer different questions; no universal negative threshold diagnoses all dormancy.",
  "A dissemination schematic can distinguish failure, viable persistence and later outgrowth without forecasting any person’s outcome. Its glyphs are symbolic, not measured cell counts. Evidence for a viable state, a maintenance mechanism and a causal reactivation mechanism should remain separate."
],
    links: [
  {
    "label": "Phan & Croucher, The dormant cancer cell life cycle (Nature Reviews Cancer 2020)",
    "url": "https://doi.org/10.1038/s41568-020-0263-0"
  },
  {
    "label": "Albrengues et al., Neutrophil extracellular traps produced during inflammation awaken dormant cancer cells (Science 2018)",
    "url": "https://doi.org/10.1126/science.aao4227"
  },
  {
    "label": "Aguirre-Ghiso, Models, mechanisms and clinical evidence for cancer dormancy. (2007)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/17957189/"
  },
  {
    "label": "Ghajar et al., The perivascular niche regulates breast tumour dormancy. (2013)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23728425/"
  }
],
    tags: ["mechanism"],

"asOf": "2026-11-10"
}),
];

// ============================================================================================
// TERMS: Hallmarks of Cancer (Hanahan 2022) and core mechanism vocabulary
// ============================================================================================
const terms: TermInput[] = [
  t({ id: "hallmarks-of-cancer", related: ["theories-of-cancer", "hallmarks-synthesis"], name: "Hallmarks of Cancer", wikipedia: W("The_Hallmarks_of_Cancer"),
    tldr: "The hallmarks organise research on cancer capabilities. The framework has changed over time and is not a diagnostic checklist or a treatment-selection test.",
    summary: "The hallmarks framework groups recurring capabilities and enabling processes involved in cancer. Its 2000, 2011 and 2022 versions distinguish core capabilities from emerging or provisional additions. Different cells and their surroundings can contribute, and a measurement of one process does not establish all the others.",
    links: [
  {
    "label": "Hanahan, Hallmarks of Cancer: New Dimensions (Cancer Discovery 2022)",
    "url": "https://doi.org/10.1158/2159-8290.CD-21-1059"
  },
  {
    "label": "Hanahan & Weinberg, Hallmarks of Cancer: The Next Generation (Cell 2011)",
    "url": "https://doi.org/10.1016/j.cell.2011.02.013"
  },
  {
    "label": "Hanahan et al., Hallmarks of cancer: the next generation. (2011)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/21376230/"
  }
,
{
  "label": "NCI: what cancer is, altered cells and the tumour microenvironment",
  "url": "https://www.cancer.gov/about-cancer/understanding/what-is-cancer"
}
],
    terms: ["sustaining-proliferative-signaling", "evading-growth-suppressors", "resisting-cell-death", "enabling-replicative-immortality", "inducing-angiogenesis", "activating-invasion-metastasis", "deregulating-cellular-energetics", "avoiding-immune-destruction", "genome-instability-mutation", "tumor-promoting-inflammation", "unlocking-phenotypic-plasticity", "nonmutational-epigenetic-reprogramming", "polymorphic-microbiomes", "senescent-cells"], tags: ["hallmark"] ,
"notes": [
  "The hallmarks are a versioned research framework, not a diagnostic checklist, stage, clinical assay standard or a demand that every cell independently perform every capability. The 2000 proposal contained six capabilities. The 2011 account retained six, added two emerging capabilities and described two enabling characteristics. In the 2022 account, the two emerging capabilities joined the eight core capabilities.",
  "The eight core capabilities are sustained growth signalling, evasion of growth restraints, resistance to cell death, sustained replicative capacity, obtaining a blood supply, invasion and distant colonisation, altered metabolism, and evasion of immune control. These are distinct processes: division speed does not measure replicative capacity, and a growth-related gene alteration does not establish invasion or immune escape. Vascular access can include existing vessels, not only new vessel growth.",
  "Genome instability and mutation, and tumour-promoting inflammation, are enabling characteristics in the stated framework; not every mutation matters and not all inflammation promotes cancer. Hanahan’s 2022 additions remain at different explanatory levels: plasticity as a proposed capability, nonmutational epigenetic reprogramming and microbiomes as possible enablers, and senescent cells as microenvironment participants. They are not four equivalent established core hallmarks.",
  "Capabilities can depend on cooperation with surrounding cells. To measure one, specify the process: division, death, invasion, vascular relations, metabolism or immune function. An RNA program is not a direct measurement of every capability or metabolic flux, and there is no universal hallmark unit or cutoff selecting treatment. In a fictional mutation-rich report, an enabling characteristic alone neither establishes distant disease nor proves those mutations caused the behaviour. A framework diagram organises concepts and provisional additions; it does not measure them in a specimen."
,
"Cancer develops when altered body cells grow outside normal controls. Invasion into neighbouring tissue and metastasis to a distant site are distinct capabilities, rather than consequences established by one report label. NCI also describes surrounding immune cells, fibroblasts, vessels and molecules as part of the tumour microenvironment. A specimen named for a cancer can therefore contain several cell populations; the name does not make every sampled cell malignant."
],
"asOf": "2026-11-11"
}),
  t({ id: "sustaining-proliferative-signaling", name: "Hallmark: sustaining proliferative signalling", wikipedia: W("The_Hallmarks_of_Cancer"), tldr: "Cancer cells keep telling themselves to divide, by making their own growth signals or jamming the receptors on.", summary: "Sustaining proliferative signalling is the hallmark by which cancer cells keep instructing themselves to divide, either by producing their own growth signals or by locking growth receptors in the on position. It is achieved through receptor mutation or amplification (EGFR, HER2, ALK), downstream activation (KRAS, BRAF, PIK3CA) or autocrine ligand production, and it runs through the RAS / RAF / MEK / ERK (MAPK), PI3K / AKT / mTOR and MYC pathways. This is the hallmark behind Small-molecule kinase inhibitors, Monoclonal antibodies such as HER2 antibodies, and KRAS & RAS inhibitors, and it underpins the concept of Oncogene addiction. Readers reach it from the Hallmarks of Cancer overview and the original 2000 hallmarks paper, and from the Oncogene, Growth signal and Proliferation entries.", pathways: ["ras-mapk", "pi3k-akt-mtor", "myc"], targets: ["egfr", "her2", "kras", "braf", "pik3ca", "alk"], technologies: ["kinase-inhibitors", "monoclonal-antibody", "kras-inhibitors"], terms: ["oncogene-addiction"], links: [HALLMARKS_2022], tags: ["hallmark"] }),
  t({ id: "evading-growth-suppressors", wikipedia: "https://en.wikipedia.org/wiki/The_Hallmarks_of_Cancer", name: "Hallmark: evading growth suppressors", tldr: "Evading growth suppressors means cutting the brakes that normally stop division, p53 and RB above all.", summary: "Evading growth suppressors is the hallmark of cutting the brakes that normally halt cell division, above all p53 and RB. The lesions are losses of TP53 (in half of cancers), RB1, CDKN2A (p16), PTEN, NF1 and APC, acting through the p53 / RB / cell-cycle checkpoint, Wnt / β-catenin and Hippo-YAP/TAZ pathways. Therapeutically, CDK4/6 inhibitors re-impose the RB brake, MDM2 inhibitors and p53 reactivators try to restore p53, and PTEN loss sensitises tumours to AKT inhibition, which is why TP53, CDK4/6 and AKT are the linked targets. Readers arrive here from the Hallmarks of Cancer overview and the 2000 hallmarks paper, from the Tumour suppressor gene entry, and from the p53 network and cell-cycle engine pathway pages.", pathways: ["p53-cell-cycle", "wnt", "hippo-yap"], targets: ["tp53", "cdk4-6", "akt"], technologies: ["cdk46-inhibitor"], links: [HALLMARKS_2022], tags: ["hallmark"] }),
  t({ id: "resisting-cell-death", wikipedia: "https://en.wikipedia.org/wiki/The_Hallmarks_of_Cancer", name: "Hallmark: resisting cell death", tldr: "Resisting cell death is the hallmark by which cancer cells disable their self-destruct programmes, chiefly apoptosis.", summary: "Resisting cell death is the hallmark by which cancer cells disable their own self-destruct programmes, chiefly apoptosis. It is achieved through BCL-2 family overexpression, p53 loss, IAP upregulation and dependence on autophagy, which is why the linked targets are BCL-2 and TP53 and the linked pathways are Intrinsic apoptosis (BCL-2 family), Autophagy, and Ferroptosis & regulated cell death. BH3 mimetics such as Venetoclax restore apoptosis, while ferroptosis and necroptosis are alternative death routes now being exploited. Readers meet this hallmark from the Hallmarks of Cancer overview, the 2000 hallmarks paper, the Apoptosis entry and the ferroptosis pathway page.", pathways: ["apoptosis-bcl2", "ferroptosis-cell-death", "autophagy"], targets: ["bcl2", "tp53"], drugs: ["venetoclax"], links: [HALLMARKS_2022], tags: ["hallmark"] }),
  t({ id: "enabling-replicative-immortality", wikipedia: "https://en.wikipedia.org/wiki/The_Hallmarks_of_Cancer", name: "Hallmark: enabling replicative immortality", tldr: "Cancer cells bypass the division limit set by shortening telomeres, usually by reactivating telomerase.", summary: "Enabling replicative immortality is the hallmark by which cancer cells bypass the division limit imposed by shortening telomeres, usually by reactivating telomerase. Most tumours do this through TERT reactivation and a minority through the ALT route, as described in the Telomere maintenance & replicative immortality pathway, while the Cellular senescence pathway explains the barrier being evaded. Imetelstat is the first telomerase inhibitor to be approved (MDS, 2024), and the linked TERT promoter mutation entry covers the mutations that serve as diagnostic biomarkers. Readers reach this hallmark from the Hallmarks of Cancer overview, the 2000 hallmarks paper and the telomere maintenance pathway.", pathways: ["telomere-maintenance", "senescence"], terms: ["tert-promoter"], links: [HALLMARKS_2022], tags: ["hallmark"] }),
  t({ id: "inducing-angiogenesis", wikipedia: "https://en.wikipedia.org/wiki/The_Hallmarks_of_Cancer", name: "Hallmark: inducing or accessing vasculature", tldr: "Obtaining a blood supply is a cancer capability. New-vessel growth is one route; use of existing vessels is another, and neither vessel count alone proves useful delivery.", summary: "Angiogenesis involves endothelial growth and vascular signalling, while some tumours use pre-existing vessels. Vessel structure, flow, transport and oxygenation require different measurements. Vascular interventions have setting-specific effects and risks; a biological mechanism alone does not establish clinical benefit.", pathways: ["vegf-angiogenesis", "hif-vhl"], targets: ["vegf", "hif2a"], technologies: ["antiangiogenic"], links: [
  {
    "label": "Hanahan, Hallmarks of Cancer: New Dimensions (Cancer Discovery 2022)",
    "url": "https://doi.org/10.1158/2159-8290.CD-21-1059"
  },
  {
    "label": "Holash et al., Vessel cooption, regression, and growth in tumors mediated by angiopoietins and VEGF. (1999)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/10373119/"
  },
  {
    "label": "Hanahan et al., Hallmarks of cancer: the next generation. (2011)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/21376230/"
  }
], tags: ["hallmark"] ,
"notes": [
  "Angiogenesis creates new vessels from existing vessels through endothelial-cell growth and signalling, including VEGF and its receptors. It also occurs in development and repair. A tumour can obtain blood by other routes: Holash and colleagues observed co-option of existing vessels in their tumour models. Vessel structure, perfusion, permeability, tracer transport and oxygenation are separate measurements. Oxygen availability also depends on diffusion and cellular consumption.",
  "Blocking vascular signalling can change vessel integrity and transport as well as vessel number. Tong studied transport after VEGFR2 blockade; Winkler studied a temporary oxygenation and radiation-response window in mouse brain-tumour models. These are conditional experimental findings. They do not establish a universal dose, treatment schedule or clinical benefit, and excessive loss of useful vessels can limit delivery."
],
"asOf": "2026-11-10"
}),
  t({ id: "activating-invasion-metastasis", wikipedia: "https://en.wikipedia.org/wiki/The_Hallmarks_of_Cancer", name: "Hallmark: activating invasion and metastasis", tldr: "Cancer cells detach, invade, travel, and colonise other organs, the process responsible for most cancer deaths.", summary: "Activating invasion and metastasis is the hallmark by which cancer cells detach, invade, travel and colonise other organs, the process responsible for most cancer deaths. Its components are EMT programmes, matrix degradation, intravasation, dormancy and colonisation, laid out in The metastatic cascade, Epithelial-mesenchymal transition, Tumour dormancy and TGF-β signalling pathways and in the Disseminated tumour cells (DTCs) entry. No approved drug targets metastasis directly; the clinical tools are adjuvant therapy, MRD / molecular residual disease testing and metastasis-directed SBRT / SABR for Oligometastatic disease. Readers reach this hallmark from the Hallmarks of Cancer overview, the Metastasis and Invasive entries, and the invasion and intravasation pathway pages.", pathways: ["metastatic-cascade", "emt", "tumor-dormancy", "tgf-beta"], technologies: ["mrd-testing", "sbrt"], terms: ["disseminated-tumor-cells", "oligometastatic"], links: [HALLMARKS_2022], tags: ["hallmark"], journals: ["cancer-metastasis-reviews", "clinical-and-experimental-metastasis"] }),
  t({ id: "deregulating-cellular-energetics", wikipedia: "https://en.wikipedia.org/wiki/The_Hallmarks_of_Cancer", name: "Hallmark: reprogramming cellular metabolism", tldr: "Cancer cells rewire their metabolism to build biomass fast, burning glucose inefficiently and gorging on glutamine and lipids.", summary: "Reprogramming cellular metabolism is the hallmark by which cancer cells rewire their metabolism to build biomass quickly, burning glucose inefficiently and consuming large amounts of glutamine and lipids. The Warburg effect and its relatives define this hallmark, which is described in the Cancer metabolism, VHL / HIF oxygen sensing and KEAP1-NRF2 antioxidant pathways. It is exploited clinically by FDG PET for imaging, by antimetabolite chemotherapy and by inhibitors of IDH1 / IDH2, whereas broader metabolic drugs have struggled against metabolic plasticity. Readers meet this hallmark from the Hallmarks of Cancer overview, the Cancer metabolism, Glutamine addiction and lipid metabolism pathway pages, and the entry on Warburg-effect diet claims.", pathways: ["cancer-metabolism", "hif-vhl", "keap1-nrf2"], targets: ["idh"], technologies: ["fdg-pet"], terms: ["warburg-effect"], links: [HALLMARKS_2022], tags: ["hallmark"] }),
  t({ id: "avoiding-immune-destruction", wikipedia: "https://en.wikipedia.org/wiki/The_Hallmarks_of_Cancer", name: "Hallmark: avoiding immune destruction", tldr: "Cancers hide from or switch off the immune system, by losing the molecules that display their antigens or by raising checkpoint brakes.", summary: "Avoiding immune destruction is the hallmark by which cancers hide from or switch off the immune system, by losing the molecules that display their antigens or by raising checkpoint brakes. Mechanisms include MHC and B2M loss, JAK mutations, PD-L1 expression, Treg and myeloid recruitment and TGF-β-mediated exclusion, covered in the PD-1 / PD-L1 immune checkpoint, Antigen presentation & immune editing and Tumour microenvironment (TME) pathways and the Immune exclusion entry. It is the hallmark behind Immune checkpoint inhibitors against PD-1, PD-L1, CTLA-4 and LAG-3, CAR-T cell therapy, T-cell engagers and Personalised neoantigen (mRNA) vaccines. Readers arrive from the Hallmarks of Cancer overview and the Immune checkpoint and T-cell exhaustion pages.", pathways: ["pd1-checkpoint", "antigen-presentation-immunoediting", "tumor-microenvironment", "tgf-beta"], targets: ["pd1", "pdl1", "ctla4", "lag3"], technologies: ["checkpoint-inhibitor", "car-t", "t-cell-engager", "neoantigen-mrna-vaccine"], terms: ["cold-vs-hot", "immune-exclusion"], links: [HALLMARKS_2022], tags: ["hallmark"] }),
  t({ id: "genome-instability-mutation", wikipedia: "https://en.wikipedia.org/wiki/The_Hallmarks_of_Cancer", name: "Enabling characteristic: genome instability and mutation", tldr: "Cancers mutate faster than normal cells because their DNA repair and chromosome segregation are broken. This fuels every other hallmark.", summary: "Genome instability and mutation is the enabling characteristic that lets cancers mutate faster than normal cells because DNA repair and chromosome segregation are broken, fuelling every other hallmark. Its forms are defective mismatch repair (MSI), homologous recombination deficiency (BRCA and HRD), replication stress and chromosomal instability, covered in the DNA damage response, DNA replication stress and Chromosomal instability & aneuploidy pathways and the Whole-genome doubling (WGD) entry. It is exploited by PARP inhibitors guided by HRD & BRCA testing, by platinum, by immunotherapy for MSI-H and TMB-high tumours and by emerging CIN-directed drugs, with BRCA1 / BRCA2, PARP, ATR and TP53 as targets. Readers reach it from the Hallmarks of Cancer overview and the mutagenesis pathway.", pathways: ["ddr", "replication-stress", "chromosomal-instability"], targets: ["brca", "parp", "atr", "tp53"], technologies: ["parp-inhibitor", "hrd-testing"], terms: ["msi", "tmb", "hrd", "mutational-signature", "whole-genome-doubling"], links: [HALLMARKS_2022], tags: ["hallmark"] }),
  t({ id: "tumor-promoting-inflammation", wikipedia: "https://en.wikipedia.org/wiki/The_Hallmarks_of_Cancer", name: "Enabling characteristic: tumour-promoting inflammation", tldr: "Chronic inflammation supplies growth factors, survival signals, and mutagens that help cancers start and grow.", summary: "Tumour-promoting inflammation is the enabling characteristic by which chronic inflammation supplies growth factors, survival signals and mutagens that help cancers start and grow. The signalling runs through IL-6/STAT3, TNF/NF-κB, COX-2/PGE2 and inflammasomes, described in the Inflammation & NF-κB, JAK-STAT signalling and Microbiome-tumour interactions pathways, and infection-driven cancers (HPV, HBV, Helicobacter pylori) are the clearest examples, as the Oncogenic viruses pathway explains. Prevention rests on HPV & HBV vaccination, anti-infectives and aspirin, covered under Chemoprevention & risk-reducing surgery, while BTK inhibitors shut down NF-κB in B-cell cancers. Readers meet this characteristic from the Hallmarks of Cancer overview and from the Inflammation entry.", pathways: ["inflammation-nfkb", "jak-stat", "microbiome-tumour"], technologies: ["chemoprevention", "hpv-vaccine"], links: [HALLMARKS_2022], tags: ["hallmark"] }),
  t({ id: "unlocking-phenotypic-plasticity", wikipedia: "https://en.wikipedia.org/wiki/The_Hallmarks_of_Cancer", name: "Hallmark (2022): unlocking phenotypic plasticity", tldr: "Cancer cells escape the normal rule that mature cells stay what they are: they dedifferentiate, transdifferentiate, or refuse to mature.", summary: "Unlocking phenotypic plasticity, a hallmark added in 2022, describes how cancer cells escape the rule that mature cells stay what they are: they dedifferentiate, transdifferentiate or refuse to mature. Examples are lineage plasticity under therapy (neuroendocrine transformation in prostate and lung cancer), dedifferentiation in melanoma and thyroid cancer and blocked differentiation in leukaemia, covered in the Histologic transformation entry. The responses are differentiation therapy (ATRA, menin inhibitors) and plasticity-blocking epigenetic drugs, which is why Menin, EZH2 and DLL3 are the linked targets. Readers reach it from the Hallmarks of Cancer overview, the 2022 hallmarks paper and the Lineage plasticity & neuroendocrine transformation pathway.", pathways: ["cancer-stem-cells-plasticity", "epigenetic-reprogramming", "emt"], targets: ["menin", "ezh2", "dll3"], terms: ["histologic-transformation"], links: [HALLMARKS_2022], tags: ["hallmark"] }),
  t({ id: "nonmutational-epigenetic-reprogramming", wikipedia: "https://en.wikipedia.org/wiki/The_Hallmarks_of_Cancer", name: "Hallmark (2022): non-mutational epigenetic reprogramming", tldr: "Cancers can change behaviour, including becoming drug-tolerant, without any new mutation, by rewriting the chemical tags that control which genes are read.", summary: "Non-mutational epigenetic reprogramming, a hallmark added in 2022, is the capacity of cancers to change their phenotype, including becoming drug-tolerant, without any new mutation, by rewriting the chemical tags that control which genes are read. It covers drug-tolerant persister states, microenvironment-induced chromatin changes and epigenetic silencing of tumour suppressors and antigens, described in the Epigenetic reprogramming and SWI/SNF chromatin remodelling pathways. The changes are reversible in principle, so Epigenetic drugs (hypomethylating agents, HDAC, EZH2 and BET inhibitors) and epigenetic priming before immunotherapy are the responses, read out by DNA methylation profiling. Readers meet it from the Hallmarks of Cancer overview and the Epigenetic therapy roadmap.", pathways: ["epigenetic-reprogramming", "swi-snf-chromatin"], technologies: ["epigenetic-drugs", "methylation-profiling"], links: [HALLMARKS_2022], tags: ["hallmark"] }),
  t({ id: "polymorphic-microbiomes", wikipedia: "https://en.wikipedia.org/wiki/The_Hallmarks_of_Cancer", name: "Hallmark (2022): polymorphic microbiomes", tldr: "The bacteria living in and around us differ from person to person and influence cancer risk, progression, and how well treatments work.", summary: "Polymorphic microbiomes, a hallmark added in 2022, captures the fact that the bacteria living in and around us differ from person to person and influence cancer risk, progression and how well treatments work. Gut microbiota modulate the response to immunotherapy, intratumoural bacteria drive inflammation and chemoresistance, and colibactin leaves mutational signatures, all covered in the Microbiome-tumour interactions pathway. Faecal microbiota transplantation and defined consortia are in trials, a theme developed in the idea Microbiome transplant as a routine immunotherapy adjunct and the entry on Dietary fibre and the gut microbiome. Readers reach it from the Hallmarks of Cancer overview, the 2022 hallmarks paper and the Gut microbiome diversity and composition entry.", pathways: ["microbiome-tumour"], links: [HALLMARKS_2022], tags: ["hallmark"] }),
  t({ id: "senescent-cells", wikipedia: "https://en.wikipedia.org/wiki/Cellular_senescence", name: "Hallmark (2022): senescent cells", tldr: "Cells that have permanently stopped dividing but stay alive and secrete inflammatory signals, helping nearby cancer cells grow and resist treatment.", summary: "Senescent cells, a hallmark added in 2022, are cells that have permanently stopped dividing but stay alive and secrete inflammatory signals, helping nearby cancer cells grow and resist treatment. The senescence-associated secretory phenotype arises from both stromal and tumour cells after therapy, and the underlying biology is laid out in the Cellular senescence pathway. Senolytic drugs aim to clear these cells in a one-two punch after cancer treatment, the strategy explored in the idea One-two punch: clear senescent cells after chemotherapy. Readers meet this hallmark from the Hallmarks of Cancer overview and from the 2022 hallmarks paper that added phenotypic plasticity, epigenetic reprogramming, microbiomes and senescent cells to the framework.", pathways: ["senescence"], links: [HALLMARKS_2022], tags: ["hallmark"] }),
  // core mechanism vocabulary
  t({ id: "disseminated-tumor-cells", wikipedia: W("Micrometastasis"), name: "Disseminated tumour cells (DTCs)", aka: ["disseminated tumour cell"], tldr: "Single cancer cells that have already spread to distant organs, often found in bone marrow years before any metastasis appears.", summary: "Disseminated tumour cells (DTCs) are single cancer cells that have already spread to distant organs, often found in bone marrow years before any metastasis appears. They are detected by bone marrow aspiration with cytokeratin staining in a substantial minority of early breast cancer patients and are prognostic for relapse, yet most are dormant and non-proliferating, as described in The metastatic cascade and Tumour dormancy pathways. DTCs are the biological substrate of Minimal / molecular residual disease (MRD), measured by MRD / molecular residual disease testing, and of Late recurrence. Readers meet the term in the hallmark Activating invasion and metastasis, the Metastasis and Recurrence and relapse entries, and the idea What decides which disseminated cells ever colonise?", pathways: ["metastatic-cascade", "tumor-dormancy"], terms: ["mrd", "late-recurrence"], technologies: ["mrd-testing"], links: [{ label: "Braun et al., A pooled analysis of bone marrow micrometastasis in breast cancer (NEJM 2005)", url: "https://doi.org/10.1056/NEJMoa050434" }] }),
  t({ id: "warburg-effect", related: [
  "metabolic-theory-of-cancer",
  "oxidative-phosphorylation",
  "nutrient-sensing-ampk"
], name: "Warburg effect", wikipedia: W("Warburg_effect_(oncology)"), tldr: "The Warburg effect is a pattern of making lactate from glucose while oxygen is available. It does not mean that mitochondrial energy production has stopped.", summary: "Aerobic glycolysis can coexist with mitochondrial glucose oxidation and use of other nutrients. Human lung-tumour tracer experiments demonstrated variation within and between tumours, rather than a single cancer-wide metabolic state. The pattern can support proliferation but does not establish an irreplaceable survival requirement. Glucose uptake, lactate release, oxygen consumption and calculated energy production answer different questions. Neither this pattern nor a culture nutrient-removal result supplies a dietary or drug recommendation.", pathways: ["cancer-metabolism", "hif-vhl"], technologies: ["fdg-pet"], terms: ["suv"], links: [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Warburg_effect_(oncology)"
  },
  {
    "label": "Source identity and scope, PMID 19460998",
    "url": "https://pubmed.ncbi.nlm.nih.gov/19460998/"
  },
  {
    "label": "Source identity and scope, PMID 26853473",
    "url": "https://pubmed.ncbi.nlm.nih.gov/26853473/"
  },
  {
    "label": "Source identity and scope, PMID 25449966",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25449966/"
  }
] ,
"asOf": "2026-11-09",
"notes": [
  "The Warburg effect describes substantial glucose-to-lactate metabolism with oxygen available. Glycolysis can supply ATP and lactate formation regenerates a carrier needed for its continuation. Lactate production does not imply absent mitochondrial oxidation, and proliferating normal cells can use aerobic glycolysis too.",
  "Intraoperative glucose-tracer studies in nine people with non-small-cell lung cancer found enhanced glycolysis alongside glucose oxidation, with heterogeneity within and between tumours and evidence for other nutrient use. These observations do not describe every cancer or establish an irreplaceable survival route.",
  "FDG imaging measures uptake and trapping of a glucose analogue, not lactate production or a cancer-exclusive process. Respiratory carbon dioxide contributes to medium acidification, so pH change is not pure glycolysis. Keep oxygen conditions, viable-cell normalisation, tracer identity, metabolites and timing with rate measurements; tracer labelling alone is not automatically a complete flux estimate.",
  "Lactate release, oxygen consumption and labelled glucose reaching mitochondrial metabolites can coexist. High pathway activity, a transcript signature or glucose uptake does not prove survival dependence. A culture nutrient-removal experiment does not establish that changing a person's diet selectively starves a tumour or identifies a medicine. Functional rate or tracer studies use viable cells, slices or a defined in-vivo experiment and consume or perturb material. No universal Warburg-positive threshold predicts treatment benefit; a functional perturbation and survival outcome are separate from the metabolic pattern."
]
}),
  t({ id: "immune-exclusion", wikipedia: W("Tumor_microenvironment"), name: "Immune exclusion", tldr: "Immune exclusion describes immune cells concentrated outside cancer-cell regions. Their distribution raises questions about access; it does not identify the barrier or a treatment that will overcome it.", summary: "After priming, a T cell must be recruited, adhere to and leave a vessel, traverse stroma and reach relevant cancer cells. An excluded distribution records where cells were found. It does not establish why they stopped. A cell that has reached a target but is inhibited has a different measured problem, although access and functional failures can coexist.\n\nCandidate mechanisms include recruitment signals, vascular interactions, matrix architecture, fibroblast signalling and myeloid-cell contacts. Their evidence comes from different cancers, human tissue studies and experimental models. A location measurement, causal perturbation and successful clinical intervention are different claims. Dense stroma alone does not diagnose exclusion or identify a safe way to reverse it.", pathways: ["tgf-beta", "tumor-microenvironment", "pd1-checkpoint"], terms: ["cold-vs-hot", "tils"], targets: ["fap", "vegf", "cxcr3"], drugs: ["retlirafusp-alfa", "ficerafusp-alfa"], trials: ["fortifi-hn01", "nct04950322", "nct05300269", "nct05503888", "nct05671822", "nct06679673", "nct07102901", "nct07175220", "nct07478731", "nct07503639", "nct07728019", "nct07752550", "nct07773363", "nct07797244", "nct07802184", "nct07807163", "nct07814859", "nct07815288"], links: [
  {
    "label": "Mariathasan et al., TGFβ attenuates tumour response to PD-L1 blockade by contributing to exclusion of T cells (Nature 2018)",
    "url": "https://doi.org/10.1038/nature25501"
  },
  {
    "label": "T cell exclusion, immune privilege, and the tumor microenvironment.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25838376/"
  },
  {
    "label": "Trafficking of T cells into tumors.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25477332/"
  },
  {
    "label": "Chemokine expression in melanoma metastases associated with CD8+ T-cell recruitment.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/19293190/"
  },
  {
    "label": "Melanoma-intrinsic β-catenin signalling prevents anti-tumour immunity.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25970248/"
  },
  {
    "label": "Non-redundant requirement for CXCR3 signalling during tumoricidal T-cell trafficking across tumour vascular checkpoints.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/26109379/"
  },
  {
    "label": "Matrix architecture defines the preferential localization and migration of T cells into the stroma of human lung tumors.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22293174/"
  },
  {
    "label": "TGFβ attenuates tumour response to PD-L1 blockade by contributing to exclusion of T cells.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29443960/"
  },
  {
    "label": "Macrophages impede CD8 T cells from reaching tumor cells and limit the efficacy of anti-PD-1 treatment.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29632196/"
  },
  {
    "label": "Spatial immunophenotypes predict response to anti-PD1 treatment and capture distinct paths of T cell evasion in triple negative breast cancer.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/34580291/"
  },
  {
    "label": "Spatially distinct tumor immune microenvironments stratify triple-negative breast cancers.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/30753167/"
  },
  {
    "label": "Intratumoral Activity of the CXCR3 Chemokine System Is Required for the Efficacy of Anti-PD-1 Therapy.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31097342/"
  },
  {
    "label": "A new paradigm for tumor immune escape: β-catenin-driven immune exclusion.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/26380088/"
  }
] ,
"asOf": "2026-11-11",
"notes": [
  "Harlin found six chemokines, including CCL5, CXCL9 and CXCL10, preferentially in T-cell-containing human melanoma metastases, with supporting migration experiments. In melanoma models, Mikucki found that CXCR3 supported intravascular arrest and extravasation of transferred CD8 effectors. These findings identify defined recruitment and vascular dependencies, not a universal explanation for every abnormal vessel. Spranger’s human melanoma association and mouse experiments connected tumour WNT/beta-catenin activity with deficient dendritic-cell recruitment and absent T-cell infiltration, a desert-like problem rather than necessarily an excluded rim. In their 2015 commentary on the mouse experiments, Spranger and Gajewski describe reduced CCL4 expression and failed recruitment of Batf3-lineage dendritic cells. This is a defined melanoma mechanism, not a universal explanation for every excluded tissue pattern.",
  "In viable human lung-tumour slices, Salmon observed better T-cell movement in loose matrix, restricted movement in dense aligned matrix and increased cancer-cell contact after collagenase. Mariathasan associated stromal fibroblast TGF-beta signalling, exclusion and atezolizumab non-response in metastatic urothelial cancer; combined TGF-beta and PD-L1 blockade improved penetration and regression in mice. Peranzoni linked long macrophage-CD8 contacts and poor motility to exclusion in human lung squamous cancers, then used macrophage-directed treatment in mice to improve tumour-islet access. None of these model interventions establishes a beneficial breast-cancer regimen.",
  "Hammerl’s spatial analysis of 681 TNBCs distinguished excluded, ignored and inflamed groups. Excluded samples showed collagen-10 deposits and TGF-beta/VEGF programmes; ignored samples showed either dense CD163-positive myeloid cells or WNT/PPAR-gamma programmes. The classifier also associated with anti-PD-1 response in a metastatic-TNBC phase-II trial. Gruosso separately associated stroma-restricted CD8 cells and stromal PD-L1 with poorer outcome. These associations do not prove the observed barrier caused resistance or that its removal helps a particular patient.",
  "A chemokine can matter after entry. Chow found that CXCR3 and dendritic-cell-derived CXCL9 were required for productive anti-PD-1 responses in tumour-bearing mice but were not required for initial CD8 infiltration. This is different from Mikucki’s transferred-cell vascular-trafficking experiment. Name the tested step, model, stimulus and endpoint before treating the two studies as the same claim.",
  "Multiplex imaging can separately count CD8 cells in stroma and malignant nests and measure distances. Bulk chemokine, fibroblast or TGF-beta RNA programmes lose direct location. A high stromal TIL area score can therefore coexist with exclusion. In a fictional comparison, collagen-rich stroma with peripheral CD8 cells and high TGF-beta suggests a different access question from sparse T cells with low recruiting chemokines. Both remain hypotheses requiring appropriate measurements and functional controls, rather than diagnoses from one image.",
  "Feig’s pancreatic mouse model found T cells outside cancer-cell regions coated with CAF-derived CXCL12; fibroblast depletion or CXCR4 blockade improved access and revealed checkpoint-antibody activity in that model. Separately, Balachandran’s human pancreatic-cancer study associated combined neoantigen and CD8 features with long survival, detected relevant T-cell reactivity and observed selective loss of high-quality neoantigenic clones during metastatic progression. Those findings do not show that every long-term survivor overcame one specific physical exclusion barrier."
],
"related": [
  "cold-vs-hot",
  "immune-desert-exclusion",
  "cancer-associated-fibroblasts",
  "tumor-associated-macrophages",
  "extracellular-matrix"
]
}),
  t({ id: "cancer-associated-fibroblasts", name: "Cancer-associated fibroblasts (CAFs)", wikipedia: W("Cancer-associated_fibroblast"), tldr: "Cancer-associated fibroblasts are stromal cells with varied states and effects. No single marker or abundance measurement shows that all of them suppress immunity or promote cancer.", summary: "Fibroblasts can produce and remodel extracellular matrix and exchange signals with nearby cells. Their origins, states and functions vary with tissue and experimental context. Stroma is broader than fibroblasts, and a spatial or molecular association is different from a functional or therapeutic result.", pathways: ["tumor-microenvironment", "tgf-beta"], targets: ["fap"], technologies: ["fapi-pet", "radioligand-therapy"], terms: ["desmoplasia"], drugs: ["fap-2286", "eb-mf-car-nk-01"], trials: ["nct04939610", "nct06710756", "nct07036380", "nct07510815"], links: [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Cancer-associated_fibroblast"
  },
  {
    "label": "Sahai et al., A framework for advancing our understanding of cancer-associated fibroblasts. (2020)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31980749/"
  },
  {
    "label": "Öhlund et al., Distinct populations of inflammatory fibroblasts and myofibroblasts in pancreatic cancer. (2017)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28232471/"
  },
  {
    "label": "Özdemir et al., Depletion of carcinoma-associated fibroblasts and fibrosis induces immunosuppression and accelerates pancreas cancer with reduced survival. (2014)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/24856586/"
  },
  {
    "label": "Salmon et al., Matrix architecture defines the preferential localization and migration of T cells into the stroma of human lung tumors. (2012)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22293174/"
  },
  {
    "label": "Ozdemir et al., indexed correction (2015; body unavailable at review)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28843279/"
  },
  {
    "label": "TGFβ attenuates tumour response to PD-L1 blockade by contributing to exclusion of T cells.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29443960/"
  }
] ,
"notes": [
  "Fibroblasts are cells; stroma is a broader compartment that also includes extracellular matrix, vascular structures and other cells. Fibroblasts can produce and remodel matrix and exchange signals with neighbouring cells. In the solid-tumour settings discussed here, a stromal signal is not automatically a malignant-epithelial signal. Sahai and colleagues describe diverse origins and states, without one marker or one effect shared by every cancer-associated fibroblast.",
  "Ohlund and colleagues described alpha-smooth-muscle-actin-high myofibroblastic fibroblasts near pancreatic cancer cells and IL-6-producing inflammatory populations farther away in pancreatic models and samples. This is not an exhaustive classification of breast stroma or a permanent job assignment for each cell. Ozdemir reported that depletion of selected alpha-smooth-muscle-actin-positive myofibroblasts worsened disease and immunosuppression in pancreatic mouse models. Removing all fibroblasts is not a general treatment conclusion. The indexed 2015 correction is linked; its body was unavailable for this review, so no correction-specific figure claim is adopted.",
  "Immune exclusion describes immune-cell positions relative to malignant nests. Salmon studied how matrix architecture affected T-cell movement in viable human lung-tumour slices, including a collagenase perturbation. That experiment does not show that a fibroblast-rich breast specimen is immune-excluded or that removing its stroma would help. The locations and the proposed mechanism need separate evidence.",
  "A fibroblast assessment may use fixed sections or appropriately prepared cells; sectioning and dissociation consume finite material. Report the defined marker-positive populations, cells per area or another stated denominator, cell states and positions relative to tumour structures. Retain marker combinations, morphology, cell assignment, specificity and sampled regions. There is no universal CAF-high threshold establishing function or treatment benefit. Bulk RNA can increase because there are more cells or because each cell expresses more; dissociation also loses the spatial map.",
  "In a fictional breast section with many fibroblasts and collagen but no scored immune-cell positions, immune exclusion has not been measured. First map the immune cells against tumour nests, then test candidate causes. A neighbourhood drawing can locate fibroblasts, matrix and vessels and suggest possible signals or remodelling. It does not measure movement or show that every fibroblast promotes cancer.",
  "Mariathasan’s metastatic-urothelial cohort associated stromal fibroblast TGF-beta signalling with CD8 exclusion and non-response to atezolizumab. Combined TGF-beta and PD-L1 blockade facilitated penetration and regression in a mouse model. Keep that perturbation separate from the human association: the findings do not establish that any fibroblast-rich breast specimen has the same barrier or that removing all fibroblasts would help."
],
"asOf": "2026-11-11",
"related": [
  "extracellular-matrix",
  "immune-exclusion"
]
}),
  t({ id: "tumor-associated-macrophages", name: "Tumour-associated macrophages (TAMs)", wikipedia: W("Tumor-associated_macrophage"), tldr: "Tumour-associated macrophages are macrophages in or around a tumour. Their states and functions vary; a location or marker count alone does not show that they suppress immunity or promote cancer.", summary: "Often described as M2-like, immunosuppressive and pro-angiogenic, although M1 and M2 are labels from laboratory stimulation experiments and a tumour can hold several macrophage programmes in different neighbourhoods or at different times (Murray et al., 2014; Xue et al., 2014); the name tumour-associated records location, and state and function are separate questions, so an M2-like marker pattern does not by itself show that the cells suppress T cells. Recruited by CSF1 and CCL2; express PD-L1, SIRPα, TREM2. Targets: CSF1R (pexidartinib approved in TGCT; broadly disappointing in cancer), CD47/SIRPα (magrolimab failed), TREM2, CD40 agonists. Depleting M2 TAMs is also the rationale of the MERTK ADC RGX-019-MMAE.", pathways: ["tumor-microenvironment", "myc"], targets: ["cd47", "pdl1", "csf1r", "sirpa", "cd40", "mertk", "cd163", "cd14"], drugs: ["magrolimab", "ak117", "evorpacept", "peluntamig", "spevatamig", "selicrelumab", "mitazalimab", "axatilimab", "emactuzumab"], trials: ["aspen-06", "nct03424005", "nct03768063", "nct04313881", "nct04675294", "nct04675333", "nct04778397", "nct04888312", "nct04980885", "nct05079230", "nct05227664", "nct05229497", "nct05382442", "nct05482893", "nct05491226", "nct05652686", "nct05849480", "nct05868226", "nct06488378", "nct06601335", "nct06789848", "nct06953999", "nct07007559", "nct07015853", "nct07036380", "nct07199764", "nct07245446", "nct07437287"], links: [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Tumor-associated_macrophage"
  },
  {
    "label": "Macrophage activation and polarization: nomenclature and experimental guidelines.",
    "url": "https://doi.org/10.1016/j.immuni.2014.06.008"
  },
  {
    "label": "Transcriptome-based network analysis reveals a spectrum model of human macrophage activation.",
    "url": "https://doi.org/10.1016/j.immuni.2014.01.006"
  },
  {
    "label": "Zhu et al., resident and recruited macrophages in pancreatic mouse models (2017)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28813661/"
  },
  {
    "label": "Beatty et al., CD40 and macrophage-associated stromal effects (2011)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/21436454/"
  },
  {
    "label": "Keren et al., spatial immune organisation in human TNBC (2018)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/30193111/"
  },
  {
    "label": "HGNC: TYRO3 receptor family membership",
    "url": "https://rest.genenames.org/fetch/symbol/TYRO3"
  },
  {
    "label": "HGNC: AXL receptor family membership",
    "url": "https://rest.genenames.org/fetch/symbol/AXL"
  },
  {
    "label": "HGNC: MERTK receptor family membership",
    "url": "https://rest.genenames.org/fetch/symbol/MERTK"
  },
  {
    "label": "Macrophages impede CD8 T cells from reaching tumor cells and limit the efficacy of anti-PD-1 treatment.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29632196/"
  },
  {
    "label": "CD4(+) T cells regulate pulmonary metastasis of mammary carcinomas by enhancing protumor properties of macrophages.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/19647220/"
  }
] ,
"asOf": "2026-11-11"
,
"notes": [
  "Tumour-associated macrophage describes macrophages in or around a tumour. Location, developmental origin, measured state and function are separate questions. These cells may engulf material, present antigens, remodel tissue, affect vessels or alter immune responses; not every cell performs every activity. M1 and M2 are experimental stimulation labels rather than a complete map of tumour macrophages.",
  "In pancreatic mouse models, Zhu traced contributions from embryonically derived resident cells and recruited monocytes with differing programs. This is not a census of all human tumours. Beatty combined a small human CD40-agonist study with mouse experiments in which macrophages supported tumouricidal and stromal effects. The mouse mechanism does not establish that reprogramming every macrophage is beneficial. Abundance, an outcome association and benefit from intervention require different evidence; depletion can also remove useful activities.",
  "CD68 or CD163 staining is not a T-cell suppression experiment, and circulating monocyte counts do not count tissue macrophages. Retain the marker panel, cell classification, tumour and stromal regions, area or cell denominator, site, time and treatment. Cell RNA describes programs; lineage origin needs additional evidence. Keren mapped human triple-negative breast-cancer neighbourhoods observationally, rather than testing macrophage-directed treatment selection.",
  "Dissociation, viability and culture can alter recovered cells and behaviour. A functional claim needs a defined population and a measured endpoint such as engulfment or a change in responding cells. In a fictional example, increased CD163-positive tissue cells after treatment differs from isolated cells reducing stimulated T-cell proliferation. Linking those findings requires matching definitions and sampling; neither alone proves that depletion helps.",
  "The acronym TAM also names the TYRO3, AXL and MERTK receptor tyrosine-kinase family. Those are proteins, not a macrophage population. HGNC assigns the three genes to the same receptor family; the shared acronym does not make a receptor result a tumour-macrophage count.",
  "Peranzoni linked long macrophage-CD8 contacts and low T-cell motility to exclusion in human lung squamous cancers. In mice, CSF1R-directed macrophage treatment improved tumour-islet access, and adding anti-PD-1 delayed progression. DeNardo’s mouse mammary-cancer work separately showed that IL-4-producing CD4 cells could shape macrophages that promoted invasion and lung metastasis through epithelial EGFR signalling. These are bounded human-tissue and animal findings, not a universal macrophage state or proof that depletion benefits every cancer."
]
,
"related": [
  "immune-exclusion",
  "cd4-t-cell-subsets"
]
}),
  t({ id: "myeloid-derived-suppressor-cells", name: "Myeloid-derived suppressor cells (MDSCs)", wikipedia: W("Myeloid-derived_suppressor_cell"), tldr: "These heterogeneous myeloid populations are characterised using phenotype, suppressive function and context. A marker or blood-cell count alone does not establish them.", summary: "Myeloid-derived suppressor cells are research-defined populations with demonstrable immune-suppressive activity and appropriate myeloid characteristics. Monocytic, polymorphonuclear and early-stage groups require species- and preparation-specific interpretation. Their phenotype overlaps other myeloid cells; a suggestive phenotype without established function needs qualification.", pathways: ["tumor-microenvironment", "jak-stat"], targets: ["vegf", "pdl1"], trials: ["nct05570825", "nct06149481", "nct06228053", "nct07322341"], links: [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Myeloid-derived_suppressor_cell"
  },
  {
    "label": "Greene et al., Inhibition of MDSC trafficking with SX-682, a CXCR1/2 inhibitor, enhances NK-cell immunotherapy in head and neck cancer models (Clinical Cancer Research 2020)",
    "url": "https://doi.org/10.1158/1078-0432.ccr-19-2625"
  },
  {
    "label": "Bronte et al., Recommendations for myeloid-derived suppressor cell nomenclature and characterization standards. (2016)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/27381735/"
  },
  {
    "label": "Condamine et al., Lectin-type oxidized LDL receptor-1 distinguishes population of human polymorphonuclear myeloid-derived suppressor cells in cancer patients. (2016)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28417112/"
  },
  {
    "label": "Bruger et al., How to measure the immunosuppressive activity of MDSC: assays, problems and potential solutions. (2019)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29785656/"
  }
] ,
"notes": [
  "Myeloid-derived suppressor cells are heterogeneous myeloid populations described using phenotype, suppressive function and context. They are not a unique lineage or a permanent identity defined by one marker, and populations can include mature and immature cells. The Bronte standards distinguish monocytic, polymorphonuclear and early-stage groups and recommend MDSC-like terminology for cells with a suggestive phenotype but no established suppressive activity.",
  "Human research panels include CD11b-positive, CD14-positive, low or absent HLA-DR, CD15-negative monocytic candidates, and CD14-negative cells with CD15 or CD66b for polymorphonuclear candidates. Mouse Ly6C/Ly6G panels are different. Morphology, additional markers, preparation and species remain necessary. Neither CD11b alone nor CD11b-positive/CD3-negative blood cells establish suppression. Condamine linked LOX-1 to molecular and functional features of the studied human cancer-associated polymorphonuclear population; it is not a universal marker of every subtype.",
  "Proposed suppressive routes include altered amino-acid availability, reactive molecules and inhibitory signalling, with effects depending on the population and experiment. Enzyme abundance or an RNA program does not measure the entire effect. For a suppression experiment, document candidate-cell purity and viability, adequate stimulation of responding T cells, T cells without the candidate population, suitable myeloid comparators, ratios and incubation time. Lower proliferation or cytokine output can also follow failed stimulation or cell death. The Bronte standards emphasise titration and appropriate phenotype-matched controls.",
  "Retain the tissue or blood compartment, species, isolation, gating, time and treatment. A fraction of recovered cells differs from an absolute blood concentration, and neither directly measures tissue burden. Gradient separation, freezing and sorting can change recovery or behaviour; the standards specifically warn of losses after freezing, especially in polymorphonuclear populations. A lower post-procedure count alone does not establish removal of suppressive activity or clinical benefit.",
  "The reasoning sequence is sample and species, candidate phenotype, controlled function, then a claim bounded to that context. A marker result cannot skip the functional question. No generic MDSC count or assay supplies a universal clinical cutoff or predicts benefit from depletion; such treatment claims need their own comparisons."
],
"asOf": "2026-11-10"
}),
  t({ id: "whole-genome-doubling", wikipedia: W("Polyploidy"), name: "Whole-genome doubling (WGD)", tldr: "Whole-genome doubling is a single event in which a cancer cell duplicates its entire genome, becoming tetraploid. It happens in about a third of cancers and buffers the chaos that follows.", summary: "Whole-genome doubling (WGD) is a single event in which a cancer cell duplicates its entire genome and becomes tetraploid. It occurs in about a third of tumours, often early and with TP53 loss, and it buffers the chaos that follows: the doubled cell tolerates later chromosome loss and instability, evolves faster and carries a worse prognosis, as described in the Chromosomal instability & aneuploidy and p53 / RB / cell-cycle checkpoint pathways. WGD also creates dependencies on KIF18A and the spindle checkpoint that CIN-directed drugs are beginning to exploit, pursued in the idea Is aneuploidy itself a druggable vulnerability? Readers meet the term under Genome instability and mutation, in the TRACERx 100 and TRACERx 421 papers and in the spindle assembly checkpoint pathway.", pathways: ["chromosomal-instability", "p53-cell-cycle"], targets: ["tp53"], terms: ["genome-instability-mutation"], links: [{ label: "Bielski et al., Genome doubling shapes the evolution and prognosis of advanced cancers (Nature Genetics 2018)", url: "https://doi.org/10.1038/s41588-018-0165-1" }] }),
];

// ============================================================================================
// IDEAS: the biggest open mechanistic questions, each with a proposed test
// ============================================================================================
const ideas: IdeaInput[] = [
  i({ id: "idea-dtc-colonisation-determinants", links: [{ label: "Massague and Obenauf, Metastatic colonisation by circulating tumour cells (Nature 2016)", url: "https://doi.org/10.1038/nature17038" }], name: "What decides which disseminated cells ever colonise?", maturity: "preclinical-evidence",
    tldr: "Most cancer cells that spread die or sleep forever; a few grow into lethal metastases. Nobody can yet tell them apart, and doing so would show whom to treat after surgery.",
    summary: "This open question asks what decides which disseminated cancer cells ever colonise: most die or sleep forever, a few grow into lethal metastases, and nobody can yet tell them apart. Bone marrow Disseminated tumour cells (DTCs) are common yet Late recurrence is uncommon; candidates include stemness programmes, niche interactions, immune surveillance and stochastic awakening (see Tumour dormancy). The hypothesis is that a measurable DTC state at surgery predicts late metastasis independently of stage and could be targeted with dormancy-enforcing therapy. The test is single-cell DTC profiling plus serial ctDNA in stage II-III breast cancer, relevant to HR-positive / HER2-negative breast cancer, Triple-negative breast cancer (TNBC) and Prostate cancer.",
    hypothesis: "A measurable DTC state (e.g., NR2F1-low, proliferation-primed, immune-evasive) present at surgery predicts late metastasis independently of stage and could be targeted with dormancy-enforcing therapy.",
    rationale: "Aguirre-Ghiso's NR2F1 dormancy programme, MSK latency-competent cell work, and TRACERx show dissemination is early and heterogeneous; MRD assays now let DTC biology be followed clinically.",
    test: "Prospective cohort with bone marrow DTC single-cell profiling plus serial ctDNA in stage II-III breast cancer, correlating DTC state with 10-year distant recurrence; nested randomised dormancy-maintenance trial (5-azacytidine + ATRA) in DTC-positive patients.",
    pathways: ["metastatic-cascade", "tumor-dormancy"], terms: ["disseminated-tumor-cells", "late-recurrence"], technologies: ["mrd-testing", "single-cell-spatial"], cancers: ["breast-hr-positive", "tnbc", "prostate"], institutions: ["mount-sinai", "mskcc", "cold-spring-harbor"], tags: ["mechanism", "open-question"] }),
  i({ id: "idea-immune-exclusion-drivers", links: [{ label: "Mariathasan et al., TGF-beta attenuates tumour response to PD-L1 blockade by contributing to exclusion of T cells (Nature 2018)", url: "https://doi.org/10.1038/nature25501" }], name: "What actually holds T cells at the tumour border?", maturity: "early-clinical",
    tldr: "In immune-excluded tumours T cells reach the border but cannot get in, held back by fibroblasts, matrix, abnormal vessels, CXCL12 gradients or myeloid cells, and TGF-β drugs on their own have failed. If single-cell and spatial profiling can show which stromal programme dominates in each tumour, matching the drug (TGF-β, FAP, CXCR4 or VEGF) to it could let immunotherapy work.",
    summary: "This open question asks what actually holds T cells at the tumour border: in immune-excluded tumours the immune cells are present but cannot get in, and knowing the dominant barrier would open the gate. Fibroblasts, matrix, abnormal vessels, CXCL12 gradients and myeloid cells are all implicated, yet TGF-β-directed drugs failed as monotherapy, suggesting redundancy or wrong patient selection. The hypothesis is that a few stromal programmes, classifiable by Single-cell & spatial profiling, drive Immune exclusion, so matching the agent (TGF-β, FAP, CXCR4 or VEGF) to the programme converts excluded tumours into inflamed ones. The test is a biomarker-stratified window trial with PD-1 blockade, and the idea links to FAPI PET and Hot vs cold tumours.",
    hypothesis: "Immune exclusion is driven by a small number of stromal programmes that can be classified from spatial profiling, and matching the anti-stromal agent to the programme (TGF-β vs FAP vs CXCR4 vs VEGF) converts excluded tumours to inflamed ones.",
    rationale: "Mariathasan 2018 and Tauriello 2018 showed TGF-β causality in models; spatial atlases show distinct exclusion architectures; FAP theranostics and CXCR4 antagonists reach the clinic.",
    test: "Biomarker-stratified window-of-opportunity trial: spatial transcriptomic classification of excluded tumours, randomise to matched stromal agent plus PD-1 versus PD-1 alone, primary endpoint change in intratumoural CD8 density.",
    pathways: ["tumor-microenvironment", "tgf-beta", "pd1-checkpoint"], targets: ["fap", "vegf", "pd1"], technologies: ["single-cell-spatial", "fapi-pet", "checkpoint-inhibitor"], terms: ["immune-exclusion", "cold-vs-hot"], institutions: ["gustave-roussy", "mskcc", "institut-curie"], tags: ["mechanism", "open-question"] }),
  i({ id: "idea-drugging-myc", trials: ["nct05482893"], links: [{ label: "Garralda et al., MYC targeting by OMO-103 in solid tumours: a phase 1 trial (Nature Medicine 2024)", url: "https://doi.org/10.1038/s41591-024-02805-1" }], name: "Can MYC be drugged directly, and will patients tolerate it?", maturity: "early-clinical",
    tldr: "MYC drives half of all cancers but has no pocket for a drug and is needed by normal cells too. The first direct MYC blockers are in trials; the question is whether there is a therapeutic window.",
    summary: "This open question asks whether MYC can be drugged directly and tolerated: MYC drives half of all cancers but has no pocket for a drug and is needed by normal cells too. OMO-103 (Omomyc) showed safety and disease stabilisation in phase 1, and mouse studies showed reversible toxicity in proliferating tissues, but human tolerance at effective doses is unproven. The hypothesis is that transient, intermittent MYC inhibition achieves regression in MYC-amplified cancers while normal tissues recover between doses, and PD-1 blockade may add benefit via CD47 and PD-L1. The test is a randomised phase 2 of OMO-103 plus chemotherapy in MYC-amplified Pancreatic ductal adenocarcinoma and Triple-negative breast cancer (TNBC).",
    hypothesis: "Transient, incomplete MYC inhibition (intermittent dosing) achieves tumour regression in MYC-amplified cancers while normal tissues recover between doses, yielding a usable therapeutic index.",
    rationale: "Soucek's Omomyc mouse models tolerated systemic MYC inhibition; MYC-addicted tumours show non-oncogene addiction to MYC dosage; combination with PD-1 blockade may add via CD47/PD-L1 downregulation.",
    test: "Phase 2 randomised OMO-103 plus chemotherapy vs chemotherapy in MYC-amplified metastatic PDAC and TNBC with intermittent schedules; pharmacodynamic MYC target-gene signatures in paired biopsies.",
    pathways: ["myc"], targets: ["cd47"], cancers: ["pancreatic", "tnbc", "neuroblastoma"], institutions: ["vall-dhebron", "ucsf"], tags: ["mechanism", "open-question"] }),
  i({ id: "idea-targeting-aneuploidy", keyPapers: ["paper-vogelstein-surfing-p53-network-nature-2000"], links: [{ label: "Ben-David and Amon, Context is everything: aneuploidy in cancer (Nature Reviews Genetics 2019)", url: "https://doi.org/10.1038/s41576-019-0171-x" }], name: "Is aneuploidy itself a druggable vulnerability?", maturity: "early-clinical",
    tldr: "Most cancers have the wrong number of chromosomes; normal cells do not. If that difference creates a specific weakness, a drug against it would spare normal tissue by definition.",
    summary: "This open question asks whether aneuploidy itself is a druggable vulnerability: most cancers have the wrong number of chromosomes and normal cells do not, so a drug against that difference would spare normal tissue. CIN cells depend on KIF18A, the spindle checkpoint, BCL-XL and proteostasis, and KIF18A inhibitors (sovilnesib, AMG 650) showed activity in platinum-resistant Ovarian cancer in 2024-25. The hypothesis is that a CIN score selects patients whose tumours regress on KIF18A or spindle-checkpoint therapy, and that STING modulators (cGAS-STING pathway) add immunity. The test is a randomised phase 2 of a KIF18A inhibitor against chemotherapy in CIN-high, TP53-mutant ovarian cancer; see also Whole-genome doubling (WGD).",
    hypothesis: "A CIN score (from WGS or a FISH panel) selects patients whose tumours regress on KIF18A or SAC-directed therapy, and combination with STING-modulating agents converts CIN's immune tolerance into immunity.",
    rationale: "Sheltzer and Bakhoum lab data; the eDyNAmiC and TRACERx programmes provide biomarkers; early clinical responses in CIN-high ovarian cancer.",
    test: "Randomised phase 2 of a KIF18A inhibitor vs chemotherapy in CIN-high, TP53-mutant platinum-resistant ovarian cancer, with CIN score stratification and micronuclei/STING pharmacodynamics.",
    pathways: ["chromosomal-instability", "cgas-sting"], targets: ["tp53"], cancers: ["ovarian", "tnbc"], terms: ["whole-genome-doubling"], institutions: ["francis-crick", "mskcc", "stanford"], tags: ["mechanism", "open-question"] }),
  i({ id: "idea-neoantigen-immunogenicity-rules", links: [{ label: "Wells et al., Key parameters of tumour epitope immunogenicity revealed through a consortium approach (Cell 2020)", url: "https://doi.org/10.1016/j.cell.2020.09.015" }], name: "What makes a neoantigen actually immunogenic?", maturity: "preclinical-evidence",
    tldr: "Vaccines can now encode dozens of a tumour's mutations, but only a minority provoke useful T cells. Learning the rules would make vaccines smaller, cheaper, and stronger.",
    summary: "This open question asks what makes a neoantigen immunogenic: vaccines encode dozens of mutations but only a minority provoke useful T cells, and learning the rules would make vaccines smaller and stronger. Prediction relies on HLA binding and expression, but immunogenicity also depends on TCR repertoire, dissimilarity to self, clonality and dendritic cell presentation (Antigen presentation & immune editing pathway). Long-term responders in the Balachandran pancreatic cohort provide ground truth, and INTerpath-001 follow-up supplies immune-monitoring data. The hypothesis is that a model trained on T-cell responses from trials of Intismeran autogene and other Personalised neoantigen (mRNA) vaccines can cut epitopes per vaccine from 34 to under 10.",
    hypothesis: "Immunogenic neoantigens can be predicted with >50% precision by models trained on validated T-cell responses from vaccine trials, cutting the number of epitopes needed per vaccine from 34 to under 10.",
    rationale: "INTerpath-001 success and autogene cevumeran follow-up supply immune-monitoring data; TCR-sequencing and antigen-specific assays are scalable.",
    test: "Pooled analysis of vaccine-trial immunomonitoring to train and prospectively validate an immunogenicity model; then a randomised trial of model-selected 10-epitope vs standard 34-epitope vaccines with T-cell response as primary endpoint.",
    pathways: ["antigen-presentation-immunoediting"], technologies: ["neoantigen-mrna-vaccine", "tcr-t"], drugs: ["intismeran-autogene", "autogene-cevumeran"], terms: ["neoantigen"], institutions: ["mskcc", "wustl-siteman", "nci"], tags: ["mechanism", "open-question"] }),
  i({ id: "idea-dormancy-maintenance-therapy", links: [{ label: "Sosa, Bragado and Aguirre-Ghiso, Mechanisms of disseminated cancer cell dormancy: an awakening field (Nature Reviews Cancer 2014)", url: "https://doi.org/10.1038/nrc3793" }], name: "Keep them asleep: dormancy maintenance as adjuvant therapy", maturity: "early-clinical",
    tldr: "Instead of trying to kill every hidden cancer cell after surgery, keep them dormant for life with low-toxicity drugs, the way extended hormone therapy already does in breast cancer.",
    summary: "This idea proposes dormancy maintenance as adjuvant therapy: keep hidden cancer cells dormant for life with low-toxicity drugs rather than trying to kill them all, as extended hormone therapy already does in breast cancer. Extended Endocrine therapy (SERMs, AIs, SERDs) and adjuvant CDK4/6 inhibitors may work partly by enforcing dormancy, and 5-azacytidine plus ATRA induced NR2F1 in a prostate pilot (Tumour dormancy pathway). The hypothesis is that a dormancy-enforcing regimen given for 3-5 years to patients positive for Minimal / molecular residual disease (MRD) delays or prevents relapse with less toxicity than cytotoxic escalation. The test is a randomised phase 2 in MRD-positive early Prostate cancer or HR-positive / HER2-negative breast cancer.",
    hypothesis: "A dormancy-enforcing regimen given for 3-5 years after curative therapy in MRD-positive patients delays or prevents relapse compared with observation, with less toxicity than cytotoxic escalation.",
    rationale: "Dormancy biology is now mechanistically defined; MRD assays identify who needs it; ER+ breast cancer shows the principle works clinically.",
    test: "Randomised phase 2 in MRD-positive early prostate or breast cancer: dormancy regimen vs observation, primary endpoint time to ctDNA/clinical relapse; embed DTC state biomarkers.",
    pathways: ["tumor-dormancy", "metastatic-cascade", "er-signaling"], technologies: ["mrd-testing", "endocrine-therapy"], cancers: ["prostate", "breast-hr-positive"], terms: ["mrd", "late-recurrence"], institutions: ["mount-sinai", "johns-hopkins"], tags: ["mechanism", "open-question"] }),
  i({ id: "idea-metabolic-vulnerability-mapping", links: [{ label: "Faubert et al., Lactate metabolism in human lung tumours (Cell 2017)", url: "https://doi.org/10.1016/j.cell.2017.09.019" }], name: "Map metabolic dependencies in the patient, not the dish", maturity: "preclinical-evidence",
    tldr: "Metabolic drugs keep failing because tumours switch fuels. Measuring what a patient's tumour actually eats, with tracers and PET, could pick the right metabolic drug for the right tumour.",
    summary: "This idea proposes mapping metabolic dependencies in the patient rather than the dish: tumours switch fuels, so measuring what a tumour consumes with PET tracers could match drug to tumour. Isotope tracing in patients (DeBerardinis) shows in vivo fuel use differs from culture, FDG, glutamine (18F-FGln) and acetate tracers exist, and glutaminase inhibitors failed in unselected populations. The hypothesis is that tracer-defined phenotypes (glycolytic, glutamine- or lipid-dependent) predict response to matched inhibitors, because imaging reads tumour metabolism non-invasively. The test is a basket trial assigning therapy by baseline 18F-FGln and FDG PET in Non-small-cell lung cancer, Renal cell carcinoma and Glioma & glioblastoma (Cancer metabolism pathway).",
    hypothesis: "Tracer-defined metabolic phenotypes (glycolytic, glutamine-dependent, lipid-dependent) predict response to matched metabolic inhibitors, rescuing agents that failed in unselected trials.",
    rationale: "Tumour metabolism is heterogeneous and plastic; imaging can read it non-invasively and repeatedly.",
    test: "Basket trial with baseline 18F-FGln and FDG PET assigning glutaminase inhibitor or glycolysis-targeting agent, with PET flux change at 2 weeks as pharmacodynamic endpoint.",
    pathways: ["cancer-metabolism", "keap1-nrf2"], technologies: ["fdg-pet", "pet"], cancers: ["nsclc", "rcc", "glioblastoma"], institutions: ["mskcc", "md-anderson"], tags: ["mechanism", "open-question"] }),
  i({ id: "idea-senolytics-after-chemo", sections: ["rejuvenation"], links: [{ label: "Demaria et al., Cellular senescence promotes adverse effects of chemotherapy and cancer relapse (Cancer Discovery 2017)", url: "https://doi.org/10.1158/2159-8290.CD-16-0241" }], name: "One-two punch: clear senescent cells after chemotherapy", maturity: "preclinical-evidence",
    tldr: "Chemotherapy leaves behind senescent cells that inflame tissues and help tumours relapse. A short course of senolytic drugs afterwards might reduce relapse and long-term side effects at once.",
    summary: "This idea proposes a one-two punch: chemotherapy leaves senescent cells that inflame tissues and help tumours relapse, so a short senolytic course afterwards might cut relapse and late side effects at once. Therapy-induced senescence promotes relapse, cachexia and frailty in models, and senolytics (navitoclax, BCL-XL PROTACs, dasatinib plus quercetin) and uPAR CAR-T clear such cells preclinically (Cellular senescence pathway). The hypothesis is that senolytic consolidation reduces relapse and frailty in patients with a high senescence burden measured by p16, and platelet-sparing BCL-XL degraders remove the toxicity barrier. The test is a randomised phase 2 of such a degrader against placebo after adjuvant chemotherapy in Triple-negative breast cancer (TNBC) or Ovarian cancer.",
    hypothesis: "Senolytic consolidation after chemotherapy reduces relapse and treatment-related frailty in patients with high post-treatment senescence burden (p16 expression in blood cells or tumour).",
    rationale: "Lowe, Demaria, and Kirkland preclinical data; p16INK4a in T cells is a validated senescence biomarker; platelet-sparing BCL-XL degraders remove the main toxicity barrier.",
    test: "Randomised phase 2 of a platelet-sparing BCL-XL degrader vs placebo after adjuvant chemotherapy in TNBC or ovarian cancer, endpoints DFS and geriatric-assessment frailty scores.",
    pathways: ["senescence", "apoptosis-bcl2"], targets: ["bcl2"], technologies: ["protac-degrader", "geriatric-assessment"], cancers: ["tnbc", "ovarian"], terms: ["senescent-cells"], institutions: ["mskcc", "mayo-clinic"], tags: ["mechanism", "open-question"] }),
  i({ id: "idea-microbiome-io-fmt", trials: ["checkmate-227", "checkmate-915", "fianlimab-phase3-melanoma", "keynote-042", "relativity-098"], links: [{ label: "Davar et al., Fecal microbiota transplant overcomes resistance to anti-PD-1 therapy in melanoma (Science 2021)", url: "https://doi.org/10.1126/science.abf3363" }, { label: "Baruch et al., Fecal microbiota transplant promotes response in immunotherapy-refractory melanoma (Science 2021)", url: "https://doi.org/10.1126/science.abb5920" }], name: "Microbiome transplant as a routine immunotherapy adjunct", maturity: "early-clinical",
    tldr: "Stool transplants from immunotherapy responders have rescued some non-responders in melanoma. If defined bacterial cocktails work as well, every immunotherapy patient could get one.",
    summary: "This idea proposes microbiome transplant as a routine immunotherapy adjunct: stool from responders has rescued some non-responders in Melanoma, and defined bacterial cocktails could reach every immunotherapy patient. Phase 1/2 FMT studies (Davar, Baruch) converted a fraction of refractory melanoma patients, defined consortia (SER-155, VE800) and diet trials are ongoing, and durability is unclear. The hypothesis is that a defined consortium with first-line PD-1 blockade raises the response rate in melanoma and Non-small-cell lung cancer, supported by causal FMT data and the harm done by antibiotics. The test is a placebo-controlled phase 2/3, and the idea sits within the Microbiome-tumour interactions pathway and the hallmark Polymorphic microbiomes.",
    hypothesis: "A defined bacterial consortium given with first-line PD-1 blockade increases response rate in melanoma and NSCLC compared with placebo, with effect size dependent on baseline microbiome composition.",
    rationale: "Consistent associations across cohorts, causal FMT data, and the fact that antibiotics worsen outcomes.",
    test: "Placebo-controlled phase 2/3 of a consortium plus PD-1 in first-line melanoma with stratification by baseline microbiome, endpoints ORR and PFS.",
    pathways: ["microbiome-tumour", "pd1-checkpoint"], targets: ["pd1"], cancers: ["melanoma", "nsclc"], terms: ["polymorphic-microbiomes"], institutions: ["md-anderson", "gustave-roussy"], tags: ["mechanism", "open-question"] }),
  i({ id: "idea-nerve-tumour-blockade", links: [{ label: "Zahalka et al., Adrenergic nerves activate an angio-metabolic switch in prostate cancer (Science 2017)", url: "https://doi.org/10.1126/science.aah5072" }], name: "Cut the nerve supply to tumours with old drugs", maturity: "early-clinical",
    tldr: "Nerves feed pancreatic, prostate, and other tumours. Beta-blockers and botulinum toxin are cheap, safe, and already in trials to see if severing that link slows cancer.",
    summary: "This idea proposes cutting the nerve supply to tumours with old drugs: nerves feed pancreatic, prostate and other tumours, and beta-blockers and botulinum toxin are cheap, safe and in trials. Propranolol reduced proliferation markers in window trials, denervation slowed gastric cancer in mice, perampanel targets glioma synapses, and perineural invasion is strongly prognostic. The hypothesis, rooted in the Cancer neuroscience pathway, is that beta-blockade or denervation added to standard therapy improves outcomes in tumours with high perineural invasion or an adrenergic signature. The tests are a randomised phase 2 of propranolol in resectable Pancreatic ductal adenocarcinoma and a perampanel trial in Glioma & glioblastoma; Prostate cancer is also in scope.",
    hypothesis: "Adding β-blockade (or local denervation) to standard therapy improves outcomes in tumours with high perineural invasion or adrenergic signature.",
    rationale: "Strong preclinical mechanism (Monje, Amit, Zahalka), epidemiologic signals for β-blocker users, low cost and toxicity.",
    test: "Randomised phase 2 of propranolol vs placebo added to standard therapy in resectable pancreatic cancer with perineural invasion, endpoint DFS; glioma trial of perampanel plus standard therapy with growth-rate endpoint.",
    pathways: ["cancer-neuroscience"], cancers: ["pancreatic", "glioblastoma", "prostate", "head-and-neck"], institutions: ["stanford", "md-anderson", "mskcc"], tags: ["mechanism", "open-question"] }),
  i({ id: "idea-cachexia-gdf15-prevention", links: [{ label: "Groarke et al., Ponsegromab for the treatment of cancer cachexia (NEJM 2024)", url: "https://doi.org/10.1056/NEJMoa2409515" }], name: "Treat cachexia before it starts", maturity: "early-clinical",
    tldr: "Cachexia, the muscle wasting driven partly by the hormone GDF-15, kills cancer patients and stops chemotherapy being completed, and late muscle loss is largely irreversible. Ponsegromab, an anti-GDF-15 antibody, reversed weight loss in established cachexia in 2024; the next test is a phase 3 giving it from first-line chemotherapy in pancreatic cancer to prevent wasting rather than treat it.",
    summary: "This idea proposes treating cachexia before it starts: wasting is a common cause of death in cancer and makes treatment impossible, and now that an effective anti-cachexia drug is in phase 3, the question is whether starting early prevents it. Ponsegromab reversed weight loss in established cachexia (2024), and GDF-15 rises early in pancreatic and lung cancer, so prevention could improve chemotherapy tolerance (Cancer cachexia pathway). The hypothesis is that anti-GDF-15 therapy from diagnosis in high-GDF-15 patients preserves muscle and increases chemotherapy completion and survival, because late muscle loss is largely irreversible. The test is a randomised phase 3 of ponsegromab from first-line chemotherapy in Pancreatic ductal adenocarcinoma; Non-small-cell lung cancer and Gastric cancer are also in scope.",
    hypothesis: "Anti-GDF-15 therapy started at diagnosis in high-GDF-15 patients preserves muscle mass and increases chemotherapy completion and overall survival.",
    rationale: "Muscle loss is largely irreversible late; GDF-15 is measurable and causal; ponsegromab is safe.",
    test: "Randomised phase 3 of ponsegromab vs placebo from first-line chemotherapy in metastatic pancreatic cancer with elevated GDF-15, endpoints OS and relative dose intensity.",
    pathways: ["cachexia-biology", "jak-stat"], cancers: ["pancreatic", "nsclc", "gastric"], technologies: ["exercise-oncology"], institutions: ["fred-hutch", "cold-spring-harbor"], tags: ["mechanism", "open-question"] }),
  i({ id: "idea-chip-risk-modifiers", keyPapers: ["paper-vogelstein-surfing-p53-network-nature-2000"], links: [{ label: "Jaiswal: clonal haematopoiesis, the pre-leukaemic clones in most people over 70 (New England Journal of Medicine 2014)", url: "https://doi.org/10.1056/NEJMoa1408617" }], name: "Which patients' blood clones will become leukaemia after treatment?", maturity: "preclinical-evidence",
    tldr: "PARP inhibitors, platinum, and radioligand drugs can push pre-existing blood-cell clones toward leukaemia in a few patients. Predicting who could let us choose therapies more safely.",
    summary: "This open question asks which patients' blood clones will become leukaemia after treatment: PARP inhibitors, platinum and radioligand drugs push pre-existing clones toward leukaemia in a few patients. Therapy-related myeloid neoplasms follow PPM1D and TP53 clonal haematopoiesis; incidence after PARP inhibitors is low but rising with longer use and Radioligand therapy (beta emitters), see Clonal haematopoiesis (CHIP). The hypothesis is that baseline CHIP genotype and variant allele fraction, with the planned genotoxic exposure, predict therapy-related MDS and AML well enough to guide drug choice and monitoring (Bolton 2020). The test is a prospective registry with baseline CHIP sequencing before these therapies, relevant to Acute myeloid leukaemia, Ovarian cancer and Prostate cancer.",
    hypothesis: "Baseline CHIP genotype and VAF, combined with the planned genotoxic exposure, predicts therapy-related MDS/AML well enough to guide drug choice and monitoring.",
    rationale: "Bolton 2020 described the fitness landscapes of these clones under therapy, and the populations on long-term PARP inhibitors and 177Lu therapies are growing.",
    test: "Prospective registry with baseline CHIP sequencing in patients starting PARP inhibitors or radioligand therapy, validating a risk score; randomised monitoring intensity trial.",
    pathways: ["clonal-haematopoiesis", "ddr"], targets: ["parp", "tp53"], technologies: ["parp-inhibitor", "radioligand-therapy", "liquid-biopsy"], cancers: ["aml", "ovarian", "prostate"], institutions: ["dana-farber", "mskcc"], tags: ["mechanism", "open-question"] }),
  i({ id: "idea-field-interception", keyPapers: ["paper-vogelstein-surfing-p53-network-nature-2000", "paper-gamble-preinvasive-treg-axis-lung-cancer-interception-nature-2026"], links: [{ label: "Martincorena et al., High burden and pervasive positive selection of somatic mutations in normal human skin (Science 2015)", url: "https://doi.org/10.1126/science.aaa6806" }], name: "Intercept cancer at the field stage", maturity: "early-clinical",
    tldr: "Whole regions of tissue carry cancer mutations long before a tumour exists. Detecting and treating the field, not the tumour, could prevent cancers rather than cure them.",
    summary: "This idea proposes intercepting cancer at the field stage: tissue regions carry cancer mutations long before a tumour exists, so treating the field could prevent cancers rather than cure them. Mutant clones in normal oesophagus, skin and airway are pervasive, and Barrett's ablation, HPV vaccination and Lynch aspirin already show interception works when the field is identifiable (Field cancerisation pathway). The hypothesis is that field markers such as TP53-mutant clone burden in Barrett's oesophagus or bronchial brushings identify people for whom ablation or chemoprevention cuts cancer incidence. The test is a randomised trial of marker-guided ablation against surveillance in non-dysplastic Barrett's, relevant to Oesophageal cancer and Non-small-cell lung cancer.",
    hypothesis: "Molecular field markers (e.g., TP53-mutant clone burden in Barrett's or bronchial brushings) identify individuals for whom ablation or chemoprevention reduces cancer incidence.",
    rationale: "Sanger normal-tissue sequencing; Cytosponge and nasal-brushing assays make field sampling minimally invasive.",
    test: "Randomised trial of field-marker-guided ablation versus standard surveillance in non-dysplastic Barrett's with high TP53 clone burden; endpoint progression to dysplasia/cancer.",
    pathways: ["field-cancerisation", "clonal-evolution"], targets: ["tp53"], technologies: ["precancer-ablation", "chemoprevention", "endoscopic-resection"], cancers: ["esophageal", "nsclc", "head-and-neck"], terms: ["barretts-esophagus"], institutions: ["cruk", "francis-crick"], tags: ["mechanism", "open-question"] }),
  i({ id: "idea-ferroptosis-persisters", links: [{ label: "Hangauer et al., Drug-tolerant persister cancer cells are vulnerable to GPX4 inhibition (Nature 2017)", url: "https://doi.org/10.1038/nature24297" }], name: "Kill drug-tolerant persisters through ferroptosis", maturity: "preclinical-evidence",
    tldr: "The cells that survive targeted therapy change shape and become unusually dependent on an antioxidant enzyme, GPX4. Hitting them in that window might stop resistance before it evolves.",
    summary: "This idea proposes killing drug-tolerant persisters through ferroptosis: cells surviving targeted therapy become dependent on the antioxidant enzyme GPX4, so hitting them in that window might stop resistance. Persisters after EGFR, ALK or BRAF inhibition are mesenchymal and GPX4-dependent (Viswanathan and Hangauer, 2017); no drug-like GPX4 inhibitor exists, but xCT inhibitors and radiotherapy induce lipid peroxidation. The hypothesis is that a short ferroptosis-inducing pulse at maximal response eradicates persisters and prolongs progression-free survival, timed by the ctDNA nadir on Liquid biopsy (ctDNA). The test is a randomised phase 2 in EGFR-mutant Non-small-cell lung cancer of Osimertinib alone against Osimertinib plus consolidative SBRT / SABR or an xCT inhibitor at ctDNA nadir.",
    hypothesis: "A short ferroptosis-inducing pulse at the point of maximal response to a targeted agent eradicates persisters and prolongs progression-free survival compared with continuous targeted therapy alone.",
    rationale: "Persister GPX4 dependence is reproducible across models; the persister window is identifiable by ctDNA nadir; radiotherapy to residual lesions is a feasible ferroptosis inducer today.",
    test: "Randomised phase 2 in EGFR-mutant NSCLC: osimertinib alone vs osimertinib plus consolidative radiotherapy or an xCT inhibitor at ctDNA nadir; primary endpoint PFS; ferroptosis markers in on-treatment biopsies.",
    pathways: ["ferroptosis-cell-death", "emt", "clonal-evolution"], targets: ["egfr", "alk", "braf"], drugs: ["osimertinib"], technologies: ["sbrt", "liquid-biopsy"], cancers: ["nsclc", "melanoma"], terms: ["resistance"], institutions: ["broad-institute", "stanford"], tags: ["mechanism", "open-question"] }),
  i({ id: "idea-splice-neoantigens", links: [{ label: "Kahles et al., Comprehensive analysis of alternative splicing across tumours from 8,705 patients (Cancer Cell 2018)", url: "https://doi.org/10.1016/j.ccell.2018.07.001" }], name: "Shared splice-derived neoantigens as off-the-shelf vaccine targets", maturity: "speculative",
    tldr: "Mutations in the RNA splicing genes SF3B1, SRSF2 and U2AF1 produce the same mis-spliced proteins in patient after patient with MDS, CLL or uveal melanoma. If fragments of those proteins are displayed on common HLA molecules and seen by T cells, one off-the-shelf vaccine or TCR-T therapy could serve every SF3B1-mutant patient instead of being built per person.",
    summary: "This idea proposes shared splice-derived neoantigens as off-the-shelf vaccine targets: mutations in the RNA splicing machinery make the same abnormal proteins recur from patient to patient, so one vaccine could serve all who carry the mutation. SF3B1, SRSF2 and U2AF1 mutations produce recurrent mis-spliced transcripts in MDS, CLL and uveal melanoma, some predicted to be HLA-presented, opening the way to Off-the-shelf cancer vaccines or TCR-T cell therapy. The hypothesis is that recurrent splice-junction neoantigens from SF3B1-mutant cells are presented on common HLA alleles and elicit T-cell responses, enabling a shared vaccine for SF3B1-mutant MDS and CLL. The test runs from an immunopeptidomic screen using Proteomics & phosphoproteomics to a phase 1 shared vaccine in high-risk SF3B1-mutant MDS.",
    hypothesis: "Recurrent splice-junction neoantigens from SF3B1-mutant cells are presented on common HLA alleles and elicit T-cell responses, enabling a shared vaccine for SF3B1-mutant MDS and CLL.",
    rationale: "Immunopeptidomics has detected splice-derived peptides; SF3B1 K700E is recurrent; shared-antigen platforms (KRAS vaccines, PRAME TCR) prove the model.",
    test: "Immunopeptidomic screen of SF3B1-mutant primary cells for HLA-presented splice peptides, T-cell reactivity assays in patients, then a phase 1 shared vaccine in high-risk SF3B1-mutant MDS.",
    pathways: ["rna-splicing", "antigen-presentation-immunoediting"], technologies: ["shared-antigen-vaccine", "tcr-t", "proteomics"], cancers: ["aml", "cll", "melanoma"], terms: ["neoantigen"], institutions: ["mskcc", "fred-hutch"], tags: ["mechanism", "open-question"] }),
  i({ id: "idea-chronotherapy-immunotherapy", trials: ["checkmate-227", "checkmate-915", "fianlimab-phase3-melanoma", "keynote-042", "relativity-098"], links: [{ label: "Qian et al., Effect of immunotherapy time-of-day infusion on overall survival in advanced melanoma (Lancet Oncology 2021)", url: "https://doi.org/10.1016/S1470-2045(21)00546-5" }], name: "Give immunotherapy in the morning", maturity: "early-clinical",
    tldr: "Several studies found patients infused with checkpoint inhibitors earlier in the day lived longer. If a randomised trial confirms it, it is a free improvement available everywhere tomorrow.",
    summary: "This idea proposes giving immunotherapy in the morning: patients infused with checkpoint inhibitors earlier in the day lived longer in several studies, and a randomised trial could confirm a free improvement. Retrospective cohorts (Lancet Oncology 2021 and follow-ups) and the small randomised MEMOIR signal associate morning infusions with better survival, plausibly through circadian T-cell trafficking (Circadian control pathway). The hypothesis is that infusing Immune checkpoint inhibitors against PD-1 before midday improves overall survival compared with afternoon infusions, backed by consistent cohort data and mouse immunology. The test is a large pragmatic randomised trial of morning against afternoon infusion in first-line PD-1 therapy for Non-small-cell lung cancer and Melanoma.",
    hypothesis: "Scheduling checkpoint-inhibitor infusions before midday improves overall survival compared with afternoon infusions, with an effect size large enough to change infusion-unit scheduling.",
    rationale: "Consistent direction across cohorts, mechanistic backing in mouse immunology, zero drug cost, and trivial implementation.",
    test: "Large pragmatic randomised trial of morning vs afternoon infusion in first-line PD-1 therapy for NSCLC and melanoma, endpoint OS; embedded immune-trafficking biomarkers.",
    pathways: ["circadian-control", "pd1-checkpoint"], targets: ["pd1"], technologies: ["checkpoint-inhibitor"], cancers: ["nsclc", "melanoma"], institutions: ["mskcc", "gustave-roussy"], tags: ["mechanism", "open-question"] }),
  i({ id: "idea-ecdna-targeting", links: [{ label: "Turner et al., Extrachromosomal oncogene amplification drives tumour evolution and genetic heterogeneity (Nature 2017)", url: "https://doi.org/10.1038/nature21356" }], name: "Attack extrachromosomal DNA, the engine of oncogene amplification", maturity: "preclinical-evidence",
    tldr: "Aggressive glioblastomas, sarcomas and gastric cancers keep amplified cancer genes such as EGFR, MYC, MDM2 and CDK4 on free-floating DNA circles (ecDNA) whose copy number rises and falls quickly, letting the tumour dial resistance up and down. Cells carrying ecDNA depend on CHK1, giving a first drug target.",
    summary: "ecDNA carries EGFR, MYC, MDM2, and CDK4 amplicons in glioblastoma, sarcoma, and gastric cancer, associates with shorter survival, and enables rapid drug resistance by copy-number fluctuation. The eDyNAmiC Cancer Grand Challenge team reported CHK1 dependence and transcription-replication conflicts in ecDNA+ cells (2024).",
    hypothesis: "ecDNA-positive tumours are selectively sensitive to CHK1 inhibition combined with the amplified-oncogene inhibitor, and ecDNA status detectable by WGS or cfDNA identifies responders.",
    rationale: "Preclinical CHK1 sensitivity, an ecDNA detection assay (AmpliconArchitect) applicable to routine WGS, and the failure of oncogene inhibitors alone in ecDNA-driven tumours.",
    test: "Phase 1/2 of a CHK1 inhibitor plus targeted agent in ecDNA-positive EGFR-amplified glioblastoma and MDM2/CDK4-amplified sarcoma, with ecDNA burden in cfDNA as a pharmacodynamic marker.",
    pathways: ["chromosomal-instability", "replication-stress", "clonal-evolution"], targets: ["egfr", "cdk4-6"], technologies: ["wes-wgs", "liquid-biopsy"], cancers: ["glioblastoma", "sarcoma", "gastric"], institutions: ["stanford", "cruk"], tags: ["mechanism", "open-question"] }),
];

export const mechanisms: EntityInput[] = [...pathways, ...terms, ...ideas];

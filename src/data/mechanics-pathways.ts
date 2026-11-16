import type { PathwayInput } from "@/lib/schema";

/**
 * Mechanics of cancer: the diagrams that the atlas at /mechanics/ needs and that no other file drew.
 * Barriers, checkpoints, repair crews, the replication engine, the immune hand-offs, the metastatic
 * journey, the ecosystem, and the ways treatment fails. Each record follows the pathway schema:
 * node/edge diagram on a 0-100 grid, plain analogy, sources, and the drugs that act on it.
 * Relationship arrays only use ids that exist in the corpus.
 */
const asOf = "2026-09-09";
const W = (s: string) => `https://en.wikipedia.org/wiki/${s}`;
type P = Omit<PathwayInput, "kind" | "asOf"> & Partial<Pick<PathwayInput, "asOf">>;
const p = (x: P): PathwayInput => ({ kind: "pathway", asOf, tags: ["mechanism", "mechanics-atlas", ...(x.tags ?? [])], ...x });

export const mechanicsPathways: PathwayInput[] = [
  // ------------------------------------------------------------------ 1. The body's defences
  p({
    id: "basement-membrane-tissue-barriers", name: "Basement membrane & tissue barriers", wikipedia: W("Basement_membrane"),
    tldr: "Every organ keeps its lining cells behind a thin, dense sheet of protein called the basement membrane. A tumour that has not crossed it is 'in situ' and essentially curable; crossing it is the moment cancer becomes invasive.",
    summary: "Epithelia sit on a basement membrane of laminin, collagen IV, nidogen and perlecan anchored by integrins (α6β4 at hemidesmosomes) and dystroglycan, beneath which lies interstitial stroma. Polarity (apical-basal), E-cadherin junctions, and contact inhibition keep cells in place. Carcinoma in situ (DCIS, CIN3, Barrett's dysplasia) respects the sheet; invasion requires protease-driven breach (MMP2/9/14, uPA) at invadopodia, loss of polarity (PAR3, SCRIB), integrin switching and EMT-like changes, often assisted by CAFs and macrophages that widen the gap. Myoepithelial cells in breast add a second barrier. Staging encodes this (Tis versus T1) and screening programmes aim to find lesions before the breach.",
    analogy: "A shop floor with a locked glass floor beneath it. Staff (epithelial cells) can be unruly upstairs and it is still contained; the emergency begins when someone cuts through the glass into the building services below, where the plumbing (blood and lymph vessels) runs.",
    nodes: [
      { id: "epi", label: "Polarised epithelium", x: 15, y: 15 }, { id: "junc", label: "E-cadherin junctions", x: 45, y: 15 }, { id: "bm", label: "Basement membrane", x: 45, y: 45 },
      { id: "int", label: "Integrins / hemidesmosomes", x: 15, y: 45 }, { id: "cis", label: "Carcinoma in situ", x: 78, y: 15 }, { id: "mmp", label: "MMPs, uPA, invadopodia", x: 78, y: 45 },
      { id: "stroma", label: "Stroma, vessels", x: 78, y: 80 }, { id: "inv", label: "Invasive carcinoma", x: 45, y: 80 }, { id: "myo", label: "Myoepithelial layer", x: 15, y: 80 },
    ],
    edges: [
      { from: "epi", to: "junc" }, { from: "int", to: "bm" }, { from: "junc", to: "cis", type: "inhibits" }, { from: "bm", to: "inv", type: "inhibits" }, { from: "myo", to: "inv", type: "inhibits" },
      { from: "cis", to: "mmp" }, { from: "mmp", to: "bm", type: "inhibits" }, { from: "mmp", to: "stroma" }, { from: "stroma", to: "inv" }, { from: "cis", to: "inv" },
    ],
    interventions: ["Screening and excision of in situ disease (colposcopy, DCIS surgery, endoscopic resection) before the breach", "HPV vaccination removes the commonest driver of cervical in situ lesions", "MMP inhibitors failed clinically in the 1990s; invasion is now approached via FAK, integrin and stromal targets", "Staging (Tis vs T1) and margins encode whether the barrier was crossed"],
    technologies: ["colposcopy-excision", "endoscopic-resection", "precancer-ablation", "hpv-vaccine", "histopathology-ihc"], terms: ["tnm-staging", "cin-hsil", "barretts-esophagus", "stage-shift"], pathways: ["emt", "invasion-ecm-degradation", "field-cancerisation"], cancers: ["cervical", "esophageal", "breast-hr-positive", "urothelial"],
    links: [{ label: "Kelley et al., Traversing the basement membrane in vivo (J Cell Biol 2014)", url: "https://doi.org/10.1083/jcb.201311112" }],
  }),
  p({
    id: "cancer-immunity-cycle", name: "The cancer-immunity cycle", wikipedia: W("Cancer_immunology"), related: [
  "theories-of-cancer",
  "immune-surveillance-immunoediting",
  "cold-vs-hot",
  "immune-exclusion",
  "adaptive-immune-resistance",
  "agretopicity",
  "cd4-t-cell-subsets"
],
    tldr: "The cancer-immunity cycle maps linked steps from available tumour antigens to T-cell recognition and killing. It helps locate a question or bottleneck; a result at one step does not establish the whole response.",
    summary: "Chen and Mellman’s 2013 framework describes seven linked steps: release of cancer antigens; their collection and presentation; T-cell priming and activation; trafficking; entry into tumour tissue; recognition of cancer cells; and killing. Further antigen release may support another round. In conventional T-cell recognition, a displayed peptide-HLA complex and a suitable T-cell receptor are separate dependencies.\n\nThis is a T-cell-centred organizing model, not a universal route, assay result or treatment-selection algorithm. Steps overlap, priming may occur away from the tumour, and other immune mechanisms require their own account. Checkpoints and local tissue conditions affect several steps. Vaccines aim to generate or expand reactive responses, checkpoint drugs interrupt selected inhibitory signals, and engineered cells provide a recognition system and effectors. Each still needs appropriate targets, access, function and safety evidence.",
    analogy: "A relay helps organize the questions: material must be available, presented, recognized and acted on. Several dependencies can be impaired together, and improving one handoff does not establish completion of the response. The map does not predict which treatment will help an individual.",
    nodes: [
  {
    "id": "rel",
    "label": "1 Antigen release",
    "x": 15,
    "y": 15
  },
  {
    "id": "dc",
    "label": "2 Antigen presentation",
    "x": 45,
    "y": 15
  },
  {
    "id": "prime",
    "label": "3 Priming (CD28 / CTLA-4)",
    "x": 78,
    "y": 15,
    "targetId": "ctla4"
  },
  {
    "id": "traf",
    "label": "4 Trafficking (CXCL9/10)",
    "x": 88,
    "y": 50
  },
  {
    "id": "inf",
    "label": "5 Infiltration",
    "x": 62,
    "y": 50,
    "targetId": "vegf"
  },
  {
    "id": "rec",
    "label": "6 Peptide-HLA recognition",
    "x": 45,
    "y": 82
  },
  {
    "id": "kill",
    "label": "7 Cancer-cell killing",
    "x": 15,
    "y": 82,
    "targetId": "pd1"
  },
  {
    "id": "block",
    "label": "Escape at any step",
    "x": 15,
    "y": 50
  }
],
    edges: [
      { from: "rel", to: "dc" }, { from: "dc", to: "prime" }, { from: "prime", to: "traf" }, { from: "traf", to: "inf" }, { from: "inf", to: "rec" }, { from: "rec", to: "kill" }, { from: "kill", to: "rel" },
      { from: "block", to: "kill", type: "inhibits" }, { from: "block", to: "rel", type: "inhibits" },
    ],
    interventions: [
  "Radiation, chemotherapy, viruses and antibody-drug conjugates can cause cancer-cell death. Antigen release alone does not establish immunogenic cell death or a useful T-cell response.",
  "Vaccines and antigen-presenting-cell approaches investigate antigen presentation and priming. The framework locates proposed jobs; it does not establish that a particular intervention completes them.",
  "Vascular, chemokine and stromal interventions investigate trafficking or tissue entry in defined systems. Model-specific findings do not establish a general conversion of excluded tumours.",
  "Receptor-engineered cells and engagers change recognition requirements but still depend on accessible targets and functional cells. Conventional TCR recognition remains peptide-HLA-dependent; checkpoint blockade addresses selected inhibitory signals rather than every step."
],
    targets: ["pd1", "pdl1", "ctla4", "vegf", "cd3", "cd137", "ido1"], drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "ivonescimab", "intismeran-autogene"], technologies: ["checkpoint-inhibitor", "neoantigen-mrna-vaccine", "sting-agonist", "t-cell-engager", "car-t", "oncolytic-virus", "sbrt"], terms: ["neoantigen", "immunogenic-cell-death", "cold-vs-hot", "tils"], pathways: ["pd1-checkpoint", "antigen-presentation-immunoediting", "cgas-sting", "vegf-angiogenesis"],
    links: [
  {
    "label": "Chen & Mellman, Oncology meets immunology: the cancer-immunity cycle (Immunity 2013)",
    "url": "https://doi.org/10.1016/j.immuni.2013.07.012"
  },
  {
    "label": "Chen & Mellman, Elements of cancer immunity and the cancer-immune set point (Nature 2017)",
    "url": "https://doi.org/10.1038/nature21349"
  },
  {
    "label": "Oncology meets immunology: the cancer-immunity cycle.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23890059/"
  },
  {
    "label": "Elements of cancer immunity and the cancer-immune set point.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28102259/"
  },
  {
    "label": "An immunogenic personal neoantigen vaccine for patients with melanoma.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28678778/"
  },
  {
    "label": "Consensus guidelines for the definition, detection and interpretation of immunogenic cell death.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/32209603/"
  }
,
{
  "label": "Marshall et al., 2018: antigen presentation and distinct immune recognition routes",
  "url": "https://doi.org/10.1186/s13223-018-0278-1"
},
{
  "label": "NHGRI: gene expression",
  "url": "https://www.genome.gov/genetics-glossary/Gene-Expression"
}
],

"asOf": "2026-11-12",
"notes": [
  "In a fictional vaccine study, blood cells release a cytokine after added-peptide stimulation. This supports reactivity under that assay’s conditions. Added peptide can bypass natural processing, and the result does not establish entry into the sampled tumour, recognition of naturally presenting cancer cells, useful killing or clinical benefit. Antigen release is not priming, blood expansion is not infiltration, and a return arrow does not demonstrate durable protection.",
  "Use the cycle to name the measured step and the next untested dependency. A proposed bottleneck or complementary pair of mechanisms does not establish a beneficial or safe combination. Increasing a response can also affect healthy tissue; the model does not identify a safe intervention by itself."
,
"For a coding change to supply a conventional T-cell target, its information must be expressed, protein produced and processed into a fragment, that peptide displayed with HLA, and a suitable receptor able to recognise the display. DNA, RNA, protein, recovered displayed peptide and controlled recognition are separate observations. A prediction at one step does not measure all the others. This conventional alpha-beta route does not describe every T cell, antibody or natural killer recognition system.",
"An immune observation suggests a question ladder: identify the cells and their location; ask whether a proposed peptide is produced and displayed; test recognition against appropriate target and background controls; distinguish tissue entry from useful target-specific function; then seek clinical comparisons for benefit and harm. Poor display, few matching cells, failed tissue access and impaired local function are different proposed failures. A count, supplied-peptide response or plausible pathway alone cannot complete that chain. These are task-dependent interpretation questions, not a mandatory clinical test menu.",

  "In an invented vaccine report, one blood clonotype becomes more frequent, its sequence also appears in sampled tumour, a separately tested cell mixture responds to added peptide, and ctDNA becomes undetectable. These are four observations, not proof that this clone killed the cancer. Link the responding cells to a compatible paired receptor, test natural tumour recognition and target death, and preserve each assay's denominator and detection limit. Surgery, chemotherapy, shedding and sampling can also affect ctDNA. Conversely, an unchanged blood repertoire does not exclude a response in unsampled tissue. Temporal coincidence does not establish the causal contribution of one clone.",
]
}),
  p({
    id: "extrinsic-apoptosis-death-receptors", name: "Extrinsic apoptosis (death receptors)", wikipedia: W("Death_receptor"),
    tldr: "Immune cells kill by touch: they present FAS ligand or TRAIL to a target cell, whose death receptors then trigger self-destruction from the outside in. Tumours cut this wire by deleting the receptors or over-producing decoys and blockers.",
    summary: "FASL, TRAIL and TNF bind death receptors (FAS, DR4/DR5, TNFR1), recruiting FADD and pro-caspase-8 into the DISC; active caspase-8 cleaves caspase-3/7 directly (type I cells) or cleaves BID to tBID to engage the mitochondrial pathway (type II). c-FLIP competes with caspase-8; XIAP restrains caspase-3/9; decoy receptors (DcR1-3) soak up ligand. Cytotoxic T and NK cells also deliver granzyme B through perforin pores, cleaving BID and caspases independently of receptors. Tumours lose FAS or CASP8 (head and neck, HPV-negative), overexpress c-FLIP and XIAP, and express FASL to kill infiltrating lymphocytes ('counterattack'). TRAIL agonists were safe but inactive; SMAC mimetics (IAP antagonists) and second-generation DR5 agonists are in trials; caspase-8 loss also switches death toward necroptosis.",
    analogy: "A doorbell wired to a self-destruct switch: immune cells ring it. Some tumours rip out the doorbell (FAS loss), some stuff the wiring with insulation (c-FLIP), and some install a second doorbell that rings nowhere (decoy receptors).",
    nodes: [
      { id: "ctl", label: "CTL / NK cell", x: 15, y: 12, targetId: "cd3" }, { id: "lig", label: "FASL, TRAIL", x: 45, y: 12 }, { id: "dr", label: "FAS, DR4/DR5", x: 45, y: 38 },
      { id: "dec", label: "Decoy receptors, c-FLIP", x: 82, y: 25 }, { id: "disc", label: "DISC: FADD, caspase-8", x: 45, y: 62 }, { id: "gzm", label: "Perforin / granzyme B", x: 15, y: 40 },
      { id: "bid", label: "tBID → mitochondria", x: 82, y: 62, targetId: "bcl2" }, { id: "iap", label: "XIAP (IAPs)", x: 82, y: 88 }, { id: "casp", label: "Caspase-3/7 → death", x: 45, y: 88 },
    ],
    edges: [
      { from: "ctl", to: "lig" }, { from: "ctl", to: "gzm" }, { from: "lig", to: "dr" }, { from: "dec", to: "dr", type: "inhibits" }, { from: "dr", to: "disc" }, { from: "dec", to: "disc", type: "inhibits" },
      { from: "disc", to: "casp" }, { from: "disc", to: "bid" }, { from: "bid", to: "casp" }, { from: "gzm", to: "casp" }, { from: "iap", to: "casp", type: "inhibits" },
    ],
    interventions: ["Checkpoint inhibitors, engagers and CAR-T all ultimately act through this wire, so caspase-8 or FAS loss confers immune resistance", "SMAC mimetics (IAP antagonists) lower the threshold; birinapant, xevinapant tested with chemoradiation", "DR5 agonist antibodies and TRAIL-receptor engagers, largely inactive so far", "BH3 mimetics engage the mitochondrial arm downstream of tBID"],
    targets: ["bcl2", "cd3", "pd1"], drugs: ["venetoclax"], technologies: ["car-t", "t-cell-engager", "checkpoint-inhibitor", "bh3-profiling"], terms: ["immunogenic-cell-death", "adcc"], pathways: ["apoptosis-bcl2", "pd1-checkpoint", "nk-cell-recognition"],
    links: [{ label: "Ashkenazi, Targeting the extrinsic apoptotic pathway in cancer (J Clin Invest 2015)", url: "https://doi.org/10.1172/JCI80420" }],
  }),
  p({
    id: "p53-mdm2-axis", name: "The p53 network (guardian of the genome)", wikipedia: W("P53"),
    tldr: "p53 is the cell's emergency coordinator: DNA damage, oncogene stress or lack of oxygen switch it on, and it then pauses division, orders repairs, or triggers suicide or permanent retirement, while MDM2 keeps it off in healthy cells. About half of cancers mutate p53 outright, and sarcomas, gliomas, melanomas and retinoblastomas silence it instead by amplifying MDM2 or MDM4.",
    summary: "Stress inputs converge on p53 stabilisation: DNA damage via ATM/ATR-CHK2/CHK1 phosphorylation, oncogene activation via p14ARF (CDKN2A) sequestering MDM2, ribosomal stress via RPL5/RPL11, hypoxia. MDM2 (with MDMX/MDM4) ubiquitinates p53 for proteasomal degradation and is itself a p53 target, forming a negative feedback loop. Active p53 tetramers transactivate CDKN1A (p21, arrest), PUMA/NOXA/BAX (apoptosis), GADD45/DDB2 (repair), TIGAR/SCO2 (metabolism), and senescence programmes; outcome depends on stress intensity and cofactors. TP53 mutations (~50% of cancers) are mostly missense DNA-binding-domain hotspots (R175, R248, R273) with dominant-negative and gain-of-function effects; MDM2 amplification (sarcoma, glioma) and MDM4 amplification (melanoma, retinoblastoma) silence wild-type p53. Drugs: MDM2 inhibitors (milademetan, brigimadlin, navtemadlin) in TP53-wild-type disease, limited by thrombocytopenia; Y220C reactivator rezatapopt; eprenetapopt (APR-246) failed in MDS; TP53 status guides WEE1/ATR synthetic lethality and predicts chemoresistance in CLL (del17p).",
    analogy: "A fire marshal who is normally kept locked in a cupboard (by MDM2). When alarms sound, the cupboard opens and the marshal stops work, calls repairs, and if the building is beyond saving, orders evacuation (apoptosis) or condemns it (senescence). Cancers either sack the marshal (TP53 mutation) or weld the cupboard shut (MDM2 amplification).",
    nodes: [
      { id: "dmg", label: "DNA damage (ATM/ATR)", x: 12, y: 12, targetId: "atr" }, { id: "onc", label: "Oncogene stress → ARF", x: 40, y: 12 }, { id: "hyp", label: "Hypoxia, ribosome stress", x: 70, y: 12 },
      { id: "mdm2", label: "MDM2 / MDMX", x: 82, y: 42, targetId: "mdm2" }, { id: "p53", label: "p53", x: 45, y: 45, targetId: "tp53" }, { id: "mut", label: "TP53 mutation (~50%)", x: 12, y: 45 },
      { id: "arr", label: "p21 → arrest", x: 12, y: 82 }, { id: "apo", label: "PUMA, NOXA → apoptosis", x: 40, y: 82, targetId: "bcl2" }, { id: "sen", label: "Senescence, repair", x: 70, y: 82 },
    ],
    edges: [
      { from: "dmg", to: "p53" }, { from: "onc", to: "mdm2", type: "inhibits" }, { from: "hyp", to: "p53" }, { from: "mdm2", to: "p53", type: "inhibits" }, { from: "p53", to: "mdm2" },
      { from: "mut", to: "p53", type: "inhibits" }, { from: "p53", to: "arr" }, { from: "p53", to: "apo" }, { from: "p53", to: "sen" },
    ],
    interventions: ["MDM2 inhibitors (brigimadlin, milademetan, navtemadlin) for TP53-wild-type, MDM2-amplified tumours", "Mutant p53 reactivators: rezatapopt (Y220C); eprenetapopt failed in phase 3 MDS", "TP53-mutant tumours are approached via WEE1, ATR, PLK1 dependence and via p53-independent chemotherapy", "TP53 status as biomarker: del17p CLL, MDS/AML risk, Li-Fraumeni surveillance"],
    targets: ["tp53", "mdm2", "atr", "wee1", "bcl2"], drugs: ["eprenetapopt", "venetoclax"], technologies: ["germline-testing", "cgp", "synthetic-lethality-approaches"], terms: ["li-fraumeni", "del17p-tp53", "evading-growth-suppressors", "germline-vs-somatic"], pathways: ["p53-cell-cycle", "apoptosis-bcl2", "senescence", "replication-stress"], cancers: ["sarcoma", "cll", "mds", "ovarian"],
    links: [{ label: "Kastenhuber & Lowe, Putting p53 in context (Cell 2017)", url: "https://doi.org/10.1016/j.cell.2017.08.028" }],
  }),

  // ------------------------------------------------------------------ 2. How a cell becomes cancer
  p({
    id: "mutagenesis-signatures", name: "Mutagenesis & mutational signatures", wikipedia: W("Mutational_signatures"),
    tldr: "Every cause of DNA damage leaves its own fingerprint in the genome: sunlight, tobacco, a faulty repair enzyme, a gut bacterium. Reading these fingerprints tells you what caused a cancer and which repair crews it is missing, which in turn predicts which drugs will work.",
    summary: "Mutations arise when damage (exogenous: UV, tobacco polycyclics, aflatoxin, alkylators, platinum; endogenous: deamination, APOBEC3A/B cytidine deaminases, ROS, replication errors, colibactin) meets replication before repair, or when repair itself is defective (MMR loss → SBS6/15/26 and MSI; HRD → SBS3 and indel/rearrangement patterns; POLE exonuclease mutation → ultramutation). COSMIC catalogues >60 single-base substitution signatures, plus doublet, indel and copy-number signatures. Clock-like SBS1/SBS5 accumulate with age; APOBEC (SBS2/13) is episodic and therapy-associated; SBS31/35 record prior platinum; temozolomide leaves SBS11. Signatures are now clinical: HRD scores (SBS3, LOH, TAI, LST) select PARP inhibitors; MSI and TMB select immunotherapy; APOBEC activity predicts resistance evolution.",
    analogy: "Footprints in snow. A fox, a dog and a child each leave a distinct print; you can tell who crossed the garden without having seen them. Cancer genomes are snowfields, and each mutagen and each broken repair crew leaves its own print.",
    nodes: [
      { id: "exo", label: "Exogenous: UV, tobacco", x: 12, y: 12 }, { id: "endo", label: "Endogenous: APOBEC, ROS", x: 40, y: 12 }, { id: "rep", label: "Replication errors", x: 70, y: 12 },
      { id: "dmg", label: "DNA lesions", x: 40, y: 42 }, { id: "repair", label: "Repair: MMR, HR, BER, NER", x: 78, y: 42, targetId: "brca" }, { id: "fix", label: "Fixed mutations", x: 40, y: 70 },
      { id: "sig", label: "Signature (SBS, ID, CN)", x: 12, y: 70 }, { id: "bio", label: "HRD, MSI, TMB biomarkers", x: 78, y: 70 }, { id: "drv", label: "Drivers, neoantigens", x: 40, y: 94 },
    ],
    edges: [
      { from: "exo", to: "dmg" }, { from: "endo", to: "dmg" }, { from: "rep", to: "dmg" }, { from: "repair", to: "dmg", type: "inhibits" }, { from: "dmg", to: "fix" },
      { from: "fix", to: "sig" }, { from: "repair", to: "bio", type: "inhibits" }, { from: "fix", to: "bio" }, { from: "fix", to: "drv" },
    ],
    interventions: ["Prevention removes the mutagen: smoking cessation, UV protection, HPV/HBV vaccination, aflatoxin control", "HRD signatures select PARP inhibitors and platinum; MSI/TMB select checkpoint inhibitors", "Signature-aware design: avoid TMZ in MGMT-unmethylated tumours, expect APOBEC-driven resistance", "Whole-genome sequencing and methylation profiling read the fingerprints"],
    targets: ["brca", "parp", "pd1"], drugs: ["olaparib", "pembrolizumab", "dostarlimab", "temozolomide"], technologies: ["wes-wgs", "hrd-testing", "cgp", "smoking-cessation-after-diagnosis", "hpv-vaccine"], terms: ["mutational-signature", "tmb", "msi", "hrd", "mgmt", "neoantigen", "genome-instability-mutation"], pathways: ["ddr", "mismatch-repair-msi", "homologous-recombination-repair", "clonal-evolution"],
    links: [{ label: "Alexandrov et al., The repertoire of mutational signatures in human cancer (Nature 2020)", url: "https://doi.org/10.1038/s41586-020-1943-3" }, { label: "COSMIC mutational signatures", url: "https://cancer.sanger.ac.uk/signatures/" }],
  }),
  p({
    id: "oncogene-activation-two-hit", name: "Drivers, passengers & the two-hit model", wikipedia: W("Knudson_hypothesis"),
    tldr: "Activating a growth driver and losing a protective function are different mechanisms. Two-hit loss explains some suppressors, while dosage and interference provide other routes.",
    summary: "Sequence changes, amplification or rearrangement can activate proto-oncogenes. Tumour-suppressor function can be reduced by two-copy loss, insufficient dosage from one remaining useful copy, or particular altered proteins interfering with useful protein. Variant and tissue context are necessary; these mechanisms alone do not establish a treatment dependency. Examples include activating BRAF changes and the BCR-ABL (BCR::ABL1) and EWSR1-FLI1 fusion routes.",
    analogy: "A car with a stuck accelerator (oncogene: one fault is enough) and cut brake lines (tumour suppressor: both lines must fail because they are duplicated). The scratches on the paintwork (passengers) did not cause the crash but they tell you what road it drove on.",
    nodes: [
      { id: "proto", label: "Proto-oncogene", x: 15, y: 15 }, { id: "act", label: "Mutation, amp, fusion", x: 15, y: 45, targetId: "kras" }, { id: "onc", label: "Oncogene ON (1 hit)", x: 15, y: 78 },
      { id: "ts", label: "Tumour suppressor", x: 55, y: 15, targetId: "tp53" }, { id: "hit1", label: "1st hit (germline/somatic)", x: 55, y: 45 }, { id: "hit2", label: "2nd hit: LOH, methylation", x: 85, y: 45 },
      { id: "loss", label: "Brake lost (2 hits)", x: 55, y: 78 }, { id: "pass", label: "Passengers, neoantigens", x: 85, y: 15 }, { id: "growth", label: "Clonal expansion", x: 55, y: 96 },
    ],
    edges: [
      { from: "proto", to: "act" }, { from: "act", to: "onc" }, { from: "onc", to: "growth" }, { from: "ts", to: "growth", type: "inhibits" }, { from: "hit1", to: "ts", type: "inhibits" },
      { from: "hit2", to: "ts", type: "inhibits" }, { from: "hit1", to: "loss" }, { from: "hit2", to: "loss" }, { from: "loss", to: "growth" }, { from: "pass", to: "growth" },
    ],
    interventions: ["Oncogene addiction is the basis of every targeted kinase inhibitor and of HER2 antibodies", "Suppressor loss cannot be 'inhibited', so it is exploited indirectly: synthetic lethality (BRCA-PARP, MTAP-PRMT5), CDK4/6 for RB-intact, MDM2 for TP53-wild-type", "Germline first hits drive surveillance and risk-reducing surgery in hereditary syndromes", "Comprehensive genomic profiling separates drivers from passengers at diagnosis"],
    targets: ["kras", "braf", "her2", "egfr", "alk", "tp53", "brca", "prmt5-mtap", "ewsr1-fli1", "bcr-abl"], drugs: ["imatinib", "osimertinib", "sotorasib", "trastuzumab", "olaparib"], technologies: ["cgp", "germline-testing", "kinase-inhibitors", "synthetic-lethality-approaches", "crispr-screens"], terms: ["oncogene-addiction", "gene-fusion", "hereditary-cancer-syndromes", "germline-vs-somatic", "synthetic-lethality", "vus"], pathways: ["ras-mapk", "p53-cell-cycle", "clonal-evolution", "mutagenesis-signatures"], cancers: ["retinoblastoma", "colorectal", "cml"],
    links: [
  {
    "label": "Vogelstein et al., Cancer genome landscapes (Science 2013)",
    "url": "https://doi.org/10.1126/science.1235122"
  },
  {
    "label": "Kinzler & Vogelstein, Gatekeepers and caretakers (Nature 1997)",
    "url": "https://doi.org/10.1038/386761a0"
  },
  {
    "label": "Knudson, Mutation and cancer: statistical study of retinoblastoma. (1971)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/5279523/"
  },
  {
    "label": "Fero et al., The murine gene p27Kip1 is haplo-insufficient for tumour suppression. (1998)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/9823898/"
  },
  {
    "label": "Boettcher et al., A dominant-negative effect drives selection of <i>TP53</i> missense mutations in myeloid malignancies. (2019)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31395785/"
  },
  {
    "label": "Poulikakos et al., RAF inhibitor transactivation in cell models (2010)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/20179705/"
  },
  {
    "label": "Delattre et al., translocation-generated hybrid transcript (1992)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/1522903/"
  }
],

"notes": [
  "Tumour suppressors can restrain growth, maintain the genome or help remove damaged cells. Knudson’s retinoblastoma model proposed two events, with an inherited first event or two acquired events. Different changes can disable the useful copies, but two-hit loss is not a universal law for all suppressors. Haploinsufficiency means one useful copy supplies insufficient protective dosage; Fero’s challenged p27-heterozygous mice retained an unmutated, unsilenced remaining copy.",
  "A dominant-negative altered protein interferes with useful protein rather than merely reducing dosage. Boettcher demonstrated this for particular TP53 variants in myeloid and leukaemia models, not every TP53 variant or breast tumour. TCGA reported TP53 mutations in 80% of its basal-like breast cancers. Basal-like is not identical to all TNBC, and a genomic frequency does not establish complete functional loss, drug restoration or a current approval claim.",
  "In a fictional comparison, an overactive receptor supplies a stronger signalling readout while loss of a repair safeguard has a different functional consequence. Neither observation alone demonstrates survival dependence. Interpretation retains the specimen and exact variant or copy finding, RNA or protein consequences and controlled functional endpoints, including exposure and off-target controls. There is no generic oncogene score that substitutes for disease-specific actionability.",
  "The named examples have different evidence and mechanisms. Druker’s early CML study supports BCR-ABL-directed inhibition in its historical clinical population. Delattre’s 1992 study identified a translocation-generated hybrid transcript underlying the EWSR1-FLI1 fusion. Poulikakos used chemical-genetic cell experiments to show that the tested RAF inhibitors could activate ERK through RAF dimers in wild-type BRAF settings. The allele, intervention and endpoint matter; a driver label does not make all these alterations equally drug-sensitive."
],
"asOf": "2026-11-10"
}),
  p({
    id: "oncogenic-viruses", name: "Oncogenic viruses", wikipedia: W("Oncovirus"),
    tldr: "About one cancer in eight worldwide is caused by a virus. HPV, hepatitis B and C, Epstein-Barr, HTLV-1, KSHV and Merkel cell polyomavirus each hijack the same brakes cancer normally has to mutate, which is why vaccines against HPV and HBV are among the most effective anti-cancer drugs ever made.",
    summary: "Direct carcinogens express viral oncoproteins: HPV E6 degrades p53 and E7 inactivates RB (cervical, anal, oropharyngeal; p16 overexpression is the surrogate); EBV LMP1 mimics CD40 to drive NF-κB and EBNA proteins immortalise B cells (nasopharyngeal, Burkitt, Hodgkin, post-transplant lymphoma; plasma EBV DNA is a biomarker); HTLV-1 Tax/HBZ (adult T-cell leukaemia); KSHV vFLIP/vCyclin (Kaposi sarcoma); MCPyV truncated large T antigen (Merkel cell). Indirect carcinogens act via chronic inflammation and regeneration: HBV (also integrates and expresses HBx) and HCV cause cirrhosis and HCC; H. pylori (a bacterium) drives gastric cancer via CagA and inflammation. Virus-driven tumours carry foreign antigens, explaining high immunotherapy response in Merkel cell carcinoma and HPV+ head and neck cancer, and enabling viral-antigen TCR-T and vaccines. Prevention: HPV (Gardasil 9) and HBV vaccination, HCV cure with direct-acting antivirals, H. pylori eradication.",
    analogy: "A burglar who does not need to pick the locks because he carries a master key: E6 and E7 are keys that open p53 and RB directly, saving the virus the years of mutation a spontaneous cancer needs. The upside is that the burglar's face is on every camera, so the immune system can be taught to spot him.",
    nodes: [
      { id: "hpv", label: "HPV E6 / E7", x: 12, y: 15 }, { id: "ebv", label: "EBV LMP1, EBNA", x: 12, y: 45 }, { id: "hbv", label: "HBV / HCV", x: 12, y: 78 },
      { id: "p53", label: "p53 degraded", x: 45, y: 8, targetId: "tp53" }, { id: "rb", label: "RB inactivated", x: 45, y: 30, targetId: "cdk4-6" }, { id: "nfkb", label: "NF-κB, immortalisation", x: 45, y: 52 },
      { id: "infl", label: "Chronic inflammation, cirrhosis", x: 45, y: 78 }, { id: "ca", label: "Virus-driven cancer", x: 80, y: 45 }, { id: "ag", label: "Viral antigens → IO response", x: 80, y: 80, targetId: "pd1" }, { id: "vax", label: "Vaccination, antivirals", x: 80, y: 12 },
    ],
    edges: [
      { from: "hpv", to: "p53" }, { from: "hpv", to: "rb" }, { from: "ebv", to: "nfkb" }, { from: "hbv", to: "infl" }, { from: "p53", to: "ca" }, { from: "rb", to: "ca" }, { from: "nfkb", to: "ca" }, { from: "infl", to: "ca" },
      { from: "ca", to: "ag" }, { from: "vax", to: "hpv", type: "inhibits" }, { from: "vax", to: "hbv", type: "inhibits" },
    ],
    interventions: ["HPV vaccination (Gardasil 9) and HBV vaccination prevent the infection; HCV direct-acting antivirals and H. pylori eradication remove the driver", "HPV testing and colposcopy find and excise precursor lesions", "Checkpoint inhibitors work well in Merkel cell (avelumab, retifanlimab) and HPV+ cancers; EBV- and HPV-specific TCR-T and vaccines are in trials", "Plasma EBV DNA screens for nasopharyngeal carcinoma and tracks response"],
    targets: ["tp53", "cdk4-6", "pd1", "pdl1"], drugs: ["gardasil-9", "avelumab", "retifanlimab", "pembrolizumab", "cemiplimab"], technologies: ["hpv-vaccine", "hpv-testing", "colposcopy-excision", "cthpv-dna", "hcc-surveillance", "tcr-t"], terms: ["hpv-p16", "hbv-hcv", "plasma-ebv-dna", "cin-hsil", "tumor-promoting-inflammation"], pathways: ["inflammation-nfkb", "p53-mdm2-axis", "p53-cell-cycle", "antigen-presentation-immunoediting"], cancers: ["cervical", "head-and-neck", "nasopharyngeal", "hcc", "merkel-cell-carcinoma", "kaposi-sarcoma", "anal", "hodgkin-lymphoma"],
    links: [{ label: "Mesri, Feitelson & Munger, Human viral oncogenesis: a cancer hallmarks analysis (Cell Host Microbe 2014)", url: "https://doi.org/10.1016/j.chom.2014.02.011" }, { label: "IARC Monographs, biological agents (volume 100B)", url: "https://publications.iarc.fr/119" }],
  }),

  // ------------------------------------------------------------------ 3. Replication and growth machinery
  p({
    id: "cell-cycle-engine-cdks", name: "The cell-cycle engine (cyclins & CDKs)", wikipedia: W("Cyclin-dependent_kinase"),
    tldr: "Cell division runs on a clock made of cyclins and their kinases (CDKs), each pair firing in order: D-CDK4/6 to leave rest, E-CDK2 to start copying DNA, A-CDK2 to finish, B-CDK1 to divide. Cancers speed the clock; CDK inhibitors slow it.",
    summary: "Mitogens induce cyclin D, which with CDK4/6 mono-phosphorylates RB; cyclin E-CDK2 completes RB hyperphosphorylation, releasing E2F and committing the cell at the restriction point (the point of no return). Cyclin A-CDK2 drives S phase, cyclin A/B-CDK1 drive G2 and mitosis, with CDK1 activation controlled by WEE1/PKMYT1 (inhibitory phosphorylation) and CDC25 phosphatases. CDK7 (CAK) activates all CDKs and also drives transcription. INK4 proteins (p16 from CDKN2A) inhibit CDK4/6; CIP/KIP (p21, p27) inhibit CDK2; APC/C and SCF ubiquitin ligases destroy cyclins in order. Cancer alterations: CCND1 amplification, CDK4 amplification (liposarcoma), CDKN2A deletion (very common, also removes ARF), CCNE1 amplification (ovarian, gastric, endocrine-resistant breast), RB1 loss (SCLC, TNBC, resistant prostate). CDK4/6 inhibitors need intact RB; CCNE1 amplification and RB1 loss are the escape routes and the rationale for CDK2 inhibitors and CDK4-selective atirmociclib.",
    analogy: "An engine with four cylinders that must fire in sequence. Cyclins are the fuel injected into each cylinder in turn and burned away; CDKs are the pistons. p16 and p21 are the hand on the throttle. Cancers flood the first cylinder (cyclin D) or remove the throttle hand (CDKN2A).",
    nodes: [
      { id: "mit", label: "Mitogens (ER, RTK, RAS)", x: 12, y: 12, targetId: "estrogen-receptor" }, { id: "d46", label: "Cyclin D-CDK4/6", x: 12, y: 42, targetId: "cdk4-6" }, { id: "p16", label: "p16 (CDKN2A)", x: 12, y: 75 },
      { id: "rb", label: "RB → E2F released", x: 40, y: 42 }, { id: "e2", label: "Cyclin E-CDK2", x: 40, y: 72 }, { id: "p21", label: "p21 / p27", x: 40, y: 12, targetId: "tp53" },
      { id: "s", label: "S phase (cyclin A)", x: 68, y: 72 }, { id: "b1", label: "Cyclin B-CDK1", x: 68, y: 42 }, { id: "wee1", label: "WEE1 / PKMYT1", x: 90, y: 20, targetId: "wee1" }, { id: "m", label: "Mitosis", x: 90, y: 72 },
    ],
    edges: [
      { from: "mit", to: "d46" }, { from: "p16", to: "d46", type: "inhibits" }, { from: "d46", to: "rb" }, { from: "p21", to: "e2", type: "inhibits" }, { from: "rb", to: "e2" }, { from: "e2", to: "rb" },
      { from: "e2", to: "s" }, { from: "s", to: "b1" }, { from: "wee1", to: "b1", type: "inhibits" }, { from: "b1", to: "m" },
    ],
    interventions: ["CDK4/6 inhibitors (palbociclib, ribociclib, abemaciclib) in HR+ breast cancer; CDK4-selective atirmociclib to spare neutrophils", "CDK2 inhibitors for CCNE1-amplified and CDK4/6-resistant disease (trials)", "WEE1 (azenosertib) and PKMYT1 (lunresertib) inhibitors force premature mitosis in CCNE1-amplified or TP53-mutant cells", "CDK7 and CDK9 inhibitors hit transcription as well as the cycle"],
    targets: ["cdk4-6", "wee1", "estrogen-receptor", "tp53"], drugs: ["palbociclib", "ribociclib", "abemaciclib", "atirmociclib"], technologies: ["cdk46-inhibitor", "endocrine-therapy"], terms: ["endocrine-resistance", "evading-growth-suppressors"], pathways: ["p53-cell-cycle", "er-signaling", "replication-stress", "mitotic-spindle-checkpoint"], cancers: ["breast-hr-positive", "sarcoma", "ovarian", "sclc"],
    links: [{ label: "Malumbres & Barbacid, Cell cycle, CDKs and cancer: a changing paradigm (Nat Rev Cancer 2009)", url: "https://doi.org/10.1038/nrc2602" }],
  }),
  p({
    id: "dna-replication-licensing", name: "DNA replication & origin licensing", wikipedia: W("Eukaryotic_DNA_replication"),
    tldr: "Before a cell divides it must copy three billion letters of DNA exactly once, 'licensing' thousands of start points in advance and firing them in waves. Cancers driven by MYC, cyclin E or RAS fire excess start points too fast, and antimetabolites such as 5-FU, topoisomerase poisons such as irinotecan and platinum drugs all jam this copying machinery.",
    summary: "In G1, ORC binds origins and with CDC6 and CDT1 loads double MCM2-7 hexamers (licensing). At S-phase entry CDK2 and DDK (CDC7) convert MCM into the active CMG helicase (with CDC45, GINS), recruiting polymerases: Pol α-primase starts, Pol ε (leading) and Pol δ (lagging) extend, with PCNA as clamp, RPA coating single strands, and Okazaki fragments joined by FEN1/LIG1. Re-licensing within one cycle is prevented by CDT1 degradation (CRL4-CDT2), geminin, and CDK activity. Oncogenes (MYC, cyclin E, RAS) shorten G1, fire excess and ectopic origins, and cause origin-fork collisions and dNTP exhaustion, the root of replication stress. Chemotherapy exploits this: antimetabolites deplete dNTPs (5-FU, methotrexate, pemetrexed, hydroxyurea inhibits RNR) or terminate chains (gemcitabine, cytarabine); topoisomerase I poisons (irinotecan, topotecan, ADC payloads SN-38, DXd, exatecan) trap the enzyme ahead of the fork; platinum crosslinks block polymerases. POLQ, POLA1 and CDC7 inhibitors are experimental.",
    analogy: "Printing a 3,000-page book on thousands of small presses at once. Licensing hands out one ticket per press before printing begins; firing starts them in waves. Cancer starts far too many presses with too little ink (nucleotides), so pages smear and tear, and many chemotherapies simply cut off the ink supply or jam the rollers.",
    nodes: [
      { id: "orc", label: "ORC, CDC6, CDT1", x: 12, y: 15 }, { id: "mcm", label: "MCM2-7 loaded (licence)", x: 40, y: 15 }, { id: "gem", label: "Geminin, CRL4-CDT2", x: 40, y: 45 },
      { id: "cdk", label: "CDK2 / DDK firing", x: 68, y: 15, targetId: "cdk4-6" }, { id: "cmg", label: "CMG helicase + Pol ε/δ", x: 68, y: 45 }, { id: "dntp", label: "dNTP supply (RNR)", x: 90, y: 75 },
      { id: "fork", label: "Replication fork", x: 68, y: 75 }, { id: "top1", label: "TOP1 (chemo, ADC payloads)", x: 40, y: 75, targetId: "trop2" }, { id: "onc", label: "MYC, cyclin E: excess origins", x: 12, y: 45, targetId: "kras" }, { id: "stress", label: "Replication stress", x: 12, y: 80 },
    ],
    edges: [
      { from: "orc", to: "mcm" }, { from: "gem", to: "mcm", type: "inhibits" }, { from: "mcm", to: "cdk" }, { from: "cdk", to: "cmg" }, { from: "cmg", to: "fork" }, { from: "dntp", to: "fork" },
      { from: "top1", to: "fork" }, { from: "onc", to: "cdk" }, { from: "onc", to: "stress" }, { from: "fork", to: "stress", type: "inhibits" },
    ],
    interventions: ["Antimetabolites (5-FU, gemcitabine, methotrexate, pemetrexed, hydroxyurea, cytarabine) starve or terminate synthesis", "Topoisomerase I poisons (irinotecan, topotecan) and their ADC payloads (SN-38, DXd, exatecan) trap the enzyme ahead of forks", "Platinum crosslinks and alkylators block polymerases", "ATR, CHK1, WEE1 inhibitors exploit the stress cancers create (see replication stress); CDC7 and POLQ inhibitors in trials"],
    targets: ["kras", "cdk4-6", "atr", "trop2", "her2"], drugs: ["gemcitabine", "fluorouracil", "methotrexate", "pemetrexed", "hydroxyurea", "irinotecan", "topotecan", "trastuzumab-deruxtecan", "sacituzumab-govitecan"], technologies: ["cytotoxic-chemotherapy", "topoisomerase-inhibitors", "platinum", "adc"], terms: ["topoisomerase-i-payloads", "sn-38", "dxd", "exatecan", "payload"], pathways: ["replication-stress", "cell-cycle-engine-cdks", "ddr", "myc"],
    links: [{ label: "Bell & Dutta, DNA replication in eukaryotic cells (Annu Rev Biochem 2002)", url: "https://doi.org/10.1146/annurev.biochem.71.110601.135425" }],
  }),
  p({
    id: "mitotic-spindle-checkpoint", name: "Mitosis & the spindle assembly checkpoint", wikipedia: W("Spindle_checkpoint"),
    tldr: "When a cell divides, a scaffold of microtubules (the spindle) pulls one copy of each chromosome to each side. A checkpoint holds the split until every chromosome is hooked on. Taxanes and vinca alkaloids freeze the spindle so the cell is stuck at this checkpoint until it dies.",
    summary: "In prometaphase, unattached kinetochores recruit MPS1, MAD1/MAD2, BUB1/BUBR1 to assemble the mitotic checkpoint complex, which inhibits APC/C-CDC20, keeping securin and cyclin B intact so anaphase cannot start. Once all kinetochores are attached under tension (Aurora B corrects mis-attachments), the checkpoint silences, separase cleaves cohesin, and chromosomes segregate; PLK1 and Aurora A drive spindle assembly and centrosome maturation, KIF18A tames chromosome oscillation. Microtubule drugs (taxanes, epothilones, eribulin stabilise or sequester; vinca alkaloids and ADC payloads MMAE/DM1 destabilise) cause persistent checkpoint activation; cells either die in mitosis (BCL-XL degradation, MCL-1 loss) or 'slip' into a tetraploid G1 where p53 arrests them, which is why TP53 loss tolerates slippage and drives aneuploidy. Whole-genome doubling and chromosomal instability arise here; CIN-high tumours depend on KIF18A, the checkpoint and BCL-XL. Aurora, PLK1 and MPS1 inhibitors have narrow windows; alisertib is being retested in SCLC and neuroendocrine prostate cancer.",
    analogy: "A tug-of-war where the referee (spindle checkpoint) will not blow the whistle until every player has a grip on the rope. Taxanes glue the rope so nobody can pull; the match never starts and the players eventually collapse. Cells without p53 sneak off the pitch with the wrong number of players, which is how aneuploidy begins.",
    nodes: [
      { id: "cent", label: "Centrosomes (Aurora A, PLK1)", x: 12, y: 15 }, { id: "spin", label: "Spindle microtubules", x: 40, y: 15 }, { id: "kin", label: "Kinetochore attachment", x: 68, y: 15 },
      { id: "tax", label: "Taxanes, vincas, MMAE, DM1", x: 40, y: 45, targetId: "her2" }, { id: "sac", label: "SAC: MAD2, BUBR1, MPS1", x: 68, y: 45 }, { id: "apc", label: "APC/C-CDC20", x: 90, y: 45 },
      { id: "ana", label: "Anaphase (separase)", x: 90, y: 78 }, { id: "death", label: "Mitotic death (BCL-XL↓)", x: 60, y: 78, targetId: "bcl2" }, { id: "slip", label: "Slippage → tetraploid", x: 30, y: 78 }, { id: "p53", label: "p53 arrest", x: 8, y: 78, targetId: "tp53" },
    ],
    edges: [
      { from: "cent", to: "spin" }, { from: "spin", to: "kin" }, { from: "tax", to: "spin", type: "inhibits" }, { from: "kin", to: "sac", type: "inhibits" }, { from: "sac", to: "apc", type: "inhibits" },
      { from: "apc", to: "ana" }, { from: "sac", to: "death" }, { from: "sac", to: "slip" }, { from: "p53", to: "slip", type: "inhibits" },
    ],
    interventions: ["Taxanes (paclitaxel, docetaxel, cabazitaxel), eribulin, vinca alkaloids (vincristine, vinblastine, vinorelbine)", "Tubulin-payload ADCs: MMAE (enfortumab, brentuximab, polatuzumab vedotin), DM1 (T-DM1), DM4 (mirvetuximab)", "Aurora A (alisertib), PLK1 and MPS1 inhibitors; KIF18A inhibitors for CIN-high tumours (trials)", "BCL-XL degraders to tip arrested cells into death"],
    targets: ["her2", "nectin4", "cd30", "folr1", "bcl2", "tp53"], drugs: ["paclitaxel", "docetaxel", "cabazitaxel", "eribulin", "vincristine", "vinblastine", "vinorelbine", "trastuzumab-emtansine", "enfortumab-vedotin", "brentuximab-vedotin", "mirvetuximab-soravtansine"], technologies: ["cytotoxic-chemotherapy", "adc"], terms: ["tubulin-inhibitor-payloads", "mmae", "dm1", "dm4", "whole-genome-doubling"], pathways: ["chromosomal-instability", "cell-cycle-engine-cdks", "p53-cell-cycle", "apoptosis-bcl2"],
    links: [{ label: "Musacchio & Salmon, The spindle-assembly checkpoint in space and time (Nat Rev Mol Cell Biol 2007)", url: "https://doi.org/10.1038/nrm2163" }],
  }),
  p({
    id: "rtk-activation", name: "Receptor tyrosine kinase activation", wikipedia: W("Receptor_tyrosine_kinase"),
    tldr: "Receptor tyrosine kinases can relay signals from outside a cell through protein phosphorylation. Receptor amount, signalling, drug binding and growth dependence are different measurements.",
    summary: "EGFR, FGFR and FLT3 are examples of receptor tyrosine kinases. Their normal roles and activation arrangements differ across receptor families.\n\nReceptor amount, phosphorylation, direct drug engagement, growth dependence and clinical benefit are separate observations. Lower receptor phosphorylation supports a biochemical effect under the assay conditions but can also reflect indirect regulation; it does not by itself prove direct binding. A controlled functional effect with independent specificity tests is needed before assigning receptor dependence.\n\nMany RTKs have extracellular ligand-binding regions, membrane-spanning regions and intracellular tyrosine-kinase machinery. Families activate differently: Zhang demonstrated an asymmetric EGFR kinase-domain interaction, while Stauber examined an FGF1-FGFR2 extracellular complex with a proposed heparin-related assembly arrangement. Ligand, helper molecules, receptor member and context matter. A downstream phosphosite can have multiple upstream causes and is not a universal receptor meter.\n\nSlamon 1987 studied 189 primary breast cancers and reported HER2 amplification in 30%, associated with relapse and survival; that historical study is not a present-day universal prevalence or a causal drug-response experiment. In the 2001 randomized trial of 469 women with HER2-overexpressing metastatic breast cancer, adding trastuzumab to chemotherapy increased median survival from 20.3 to 25.1 months, with cardiac toxicity as a material risk. A trial median summarizes a group and does not predict an individual survival time.\n\nIn a fictional comparison, two cultures contain a receptor, but only the amplified, high-surface-protein culture slows growth after a blocking antibody, while receptor phosphorylation falls in both. This separates amount, sampled signaling and growth response; the pattern suggests dependence but attribution still needs controls and independent perturbation. RNA is not surface accessibility, a family-name inhibitor need not engage every member at the tested exposure. For an antibody-drug conjugate, receptor access and payload delivery are separate questions from whether growth requires that receptor's signaling. Fixed-tissue staining and viable-model perturbation have different input costs and validation scopes.",
    analogy: "Two halves of a walkie-talkie that only transmit when clipped together by a signal from outside. Cancer glues them together (fusions, mutations) or installs hundreds of extra sets (amplification), so the room is full of shouted 'grow' orders. TKIs pull the battery, antibodies tape over the microphone, ADCs use the aerial as a mailing address for poison.",
    nodes: [
      { id: "lig", label: "Ligand (EGF, HGF, NRG)", x: 15, y: 10 }, { id: "rtk", label: "RTK dimer (EGFR, HER2, MET)", x: 45, y: 25, targetId: "egfr" }, { id: "alt", label: "Mutation, amp, fusion", x: 80, y: 10, targetId: "alk" },
      { id: "cbl", label: "CBL → degradation", x: 82, y: 40 }, { id: "ras", label: "GRB2/SOS → RAS", x: 20, y: 55, targetId: "kras" }, { id: "pi3k", label: "PI3K → AKT", x: 50, y: 55, targetId: "pik3ca" }, { id: "stat", label: "SRC, STAT3, PLCγ", x: 80, y: 68 },
      { id: "out", label: "Proliferation, survival", x: 50, y: 88 }, { id: "bypass", label: "Bypass RTK (MET, HER3)", x: 15, y: 88, targetId: "met" },
    ],
    edges: [
      { from: "lig", to: "rtk" }, { from: "alt", to: "rtk" }, { from: "cbl", to: "rtk", type: "inhibits" }, { from: "rtk", to: "ras" }, { from: "rtk", to: "pi3k" }, { from: "rtk", to: "stat" },
      { from: "ras", to: "out" }, { from: "pi3k", to: "out" }, { from: "stat", to: "out" }, { from: "bypass", to: "pi3k" }, { from: "bypass", to: "ras" },
    ],
    interventions: ["TKIs by driver: osimertinib (EGFR), lorlatinib/alectinib (ALK), selpercatinib (RET), larotrectinib/entrectinib (NTRK), capmatinib/tepotinib (MET), imatinib (KIT/PDGFRA/BCR-ABL), zongertinib (HER2)", "Antibodies: trastuzumab/pertuzumab (HER2), cetuximab/panitumumab (EGFR); bispecifics amivantamab (EGFR×MET), zanidatamab, zenocutuzumab (HER2×HER3)", "ADCs use the receptor as an address: T-DXd, T-DM1, patritumab deruxtecan (HER3), telisotuzumab vedotin (MET)", "Combining with MET or downstream inhibitors closes bypass routes"],
    targets: ["egfr", "her2", "her3", "met", "alk", "ret", "ros1", "ntrk", "fgfr2", "kit", "flt3", "pdgfra", "kras", "pik3ca"], drugs: ["osimertinib", "lorlatinib", "alectinib", "selpercatinib", "larotrectinib", "entrectinib", "capmatinib-tepotinib", "imatinib", "zongertinib", "trastuzumab", "pertuzumab", "cetuximab", "panitumumab", "amivantamab", "zanidatamab", "zenocutuzumab", "trastuzumab-deruxtecan", "patritumab-deruxtecan", "telisotuzumab-vedotin"], technologies: ["kinase-inhibitors", "monoclonal-antibody", "bispecific-antibody", "adc", "companion-diagnostic"], terms: ["oncogene-addiction", "gene-fusion", "egfr-exon19-l858r", "egfr-exon20-insertion", "c797s", "met-amplification", "egfrviii", "her2-low", "adcc"], pathways: ["ras-mapk", "pi3k-akt-mtor", "jak-stat", "resistance-routes-map"], cancers: ["nsclc", "breast-her2-positive", "gastric", "gist", "thyroid", "cholangiocarcinoma"],
    links: [
  {
    "label": "Lemmon & Schlessinger, Cell signaling by receptor tyrosine kinases (Cell 2010)",
    "url": "https://doi.org/10.1016/j.cell.2010.06.011"
  },
  {
    "label": "An allosteric mechanism for activation of the kinase domain of epidermal growth factor receptor. (2006; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/16777603/"
  },
  {
    "label": "Use of chemotherapy plus a monoclonal antibody against HER2 for metastatic breast cancer that overexpresses HER2. (2001; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/11248153/"
  },
  {
    "label": "Structural interactions of fibroblast growth factor receptor with its ligands. (2000; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/10618369/"
  },
  {
    "label": "Human breast cancer: correlation of relapse and survival with amplification of the HER-2/neu oncogene. (1987; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/3798106/"
  },
  {
    "label": "UniProt P36888: reviewed human FLT3 protein function",
    "url": "https://www.uniprot.org/uniprotkb/P36888/entry"
  },

  {"label":"Pemigatinib for previously treated, locally advanced or metastatic cholangiocarcinoma: a multicentre, open-label, phase 2 study (2020)","url":"https://pubmed.ncbi.nlm.nih.gov/32203698/"},

  {"label":"FIGHT-202 2024 correction notice: content not verified here","url":"https://pubmed.ncbi.nlm.nih.gov/38181811/"},

      {"label":"Taylor et al. 2009: activating FGFR4 mutations in rhabdomyosarcoma models","url":"https://pubmed.ncbi.nlm.nih.gov/19809159/"}
    ],

"asOf": "2026-11-13",

  "notes": ["The original FIGHT-202 report observed responses in 38 of 107 people, 35.5 per cent, with previously treated cholangiocarcinoma and qualifying FGFR2 fusions or rearrangements given pemigatinib. The denominator includes fusions or rearrangements, not only one fusion mechanism. A 2024 correction is linked to the report; its text was unavailable, so the figure here is from the original abstract rather than a correction-checked final estimate. It is a named single-arm clinical signal rather than evidence for any receptor variant or another disease. For an uncharacterised receptor variant, compare with the normal receptor at matched expression and measure appropriate phosphorylation and downstream changes. Similar amount without extra activation does not support activation in that condition, while leaving other conditions unresolved. An activating receptor fusion or amplification may still require its kinase, whereas an active downstream RAS route can bypass the proposed receptor step. Locate the drug's blocked step and possible downstream bypass, then separately test whether changing the output matters for growth. Neither a bulk ligand signal from a sender nor receptor presence assigns an active signal to the malignant receiver.",
      "Taylor and colleagues studied specified activating kinase-domain FGFR4 mutants in rhabdomyosarcoma models. In the tested murine cells, these mutants increased receptor autophosphorylation, STAT3 signalling and metastatic behaviour; the mutant-expressing cells were more susceptible to apoptosis under the tested FGFR inhibitor than reference-receptor or vector controls. This model evidence does not assign an effect to an uncharacterised FGFR4 alteration in another domain or cancer, or establish that a drug acting on a related receptor engages FGFR4 at the tested exposure."
    ],
}),
  p({
    id: "transcription-addiction", name: "Transcriptional machinery & addiction", wikipedia: W("Super-enhancer"),
    tldr: "Cancer cells run a few genes (MYC, their lineage factors, their fusion oncogenes) at extreme volume from giant control regions called super-enhancers. The amplifiers, BRD4, CDK7, CDK9 and Mediator, are the same in every cell, but cancers are unusually dependent on them, and that dependence is druggable.",
    summary: "Lineage transcription factors (ER, AR, MITF, SOX2, ASCL1) and oncogenic fusions (EWSR1-FLI1, TMPRSS2-ERG, PAX3-FOXO1, NUT-BRD4) nucleate super-enhancers: clusters of enhancers densely loaded with Mediator, BRD4 (reading acetyl-lysine), p300/CBP, and cohesin loops to promoters. RNA Pol II is released from promoter-proximal pausing by P-TEFb (CDK9) and initiated by TFIIH (CDK7); CDK12/13 couple elongation to DNA-repair gene expression. MYC, itself super-enhancer-driven and amplified or ecDNA-borne, is an amplifier of all active genes. Because oncogene transcripts and proteins (MYC, MCL-1) are short-lived, transient inhibition of BET, CDK7 or CDK9 collapses them first ('transcriptional addiction'). Menin-KMT2A is a lineage-specific version (revumenib, ziftomenib in NPM1/KMT2A AML); CDK12 loss creates a tandem-duplicator phenotype in prostate cancer. Hormone receptors are the oldest transcription drugs; BET inhibitors were limited by thrombocytopenia, CDK9 inhibitors and BET/CBP degraders are in trials.",
    analogy: "A concert where a few songs are played at deafening volume through rented amplifiers. Cutting the mains for a moment (BET, CDK7/9 inhibitors) silences the loudest songs first because their sound decays fastest, while the quieter household appliances keep humming.",
    nodes: [
      { id: "tf", label: "Lineage TFs (ER, AR, ASCL1)", x: 12, y: 15, targetId: "androgen-receptor" }, { id: "fus", label: "Fusion TFs (EWSR1-FLI1)", x: 12, y: 48, targetId: "ewsr1-fli1" }, { id: "se", label: "Super-enhancer", x: 42, y: 30 },
      { id: "brd4", label: "BRD4, Mediator, p300", x: 42, y: 60 }, { id: "cdk7", label: "CDK7 (TFIIH) initiation", x: 72, y: 15 }, { id: "cdk9", label: "CDK9 (P-TEFb) elongation", x: 72, y: 48 },
      { id: "pol", label: "RNA Pol II", x: 72, y: 78 }, { id: "myc", label: "MYC, MCL-1 (short-lived)", x: 42, y: 90, targetId: "bcl2" }, { id: "menin", label: "Menin-KMT2A (AML)", x: 12, y: 82, targetId: "menin" },
    ],
    edges: [
      { from: "tf", to: "se" }, { from: "fus", to: "se" }, { from: "se", to: "brd4" }, { from: "brd4", to: "cdk7" }, { from: "brd4", to: "cdk9" }, { from: "cdk7", to: "pol" }, { from: "cdk9", to: "pol" },
      { from: "pol", to: "myc" }, { from: "menin", to: "pol" },
    ],
    interventions: ["Nuclear receptor drugs (endocrine therapy, ARPIs, SERDs, PROTAC vepdegestrant) are transcription drugs", "Menin inhibitors revumenib and ziftomenib in KMT2A-rearranged and NPM1-mutant AML", "BET inhibitors and BET/CBP degraders; CDK7 (samuraciclib) and CDK9 inhibitors in trials", "Fusion-TF cancers (Ewing, NUT carcinoma) are the proving ground for transcriptional drugs"],
    targets: ["androgen-receptor", "estrogen-receptor", "ewsr1-fli1", "menin", "kmt2a", "npm1", "bcl2", "ezh2", "irf4", "ikzf1", "ikzf3"], drugs: ["revumenib", "ziftomenib", "vepdegestrant", "enzalutamide", "elacestrant"], technologies: ["endocrine-therapy", "androgen-deprivation", "protac-degrader", "epigenetic-drugs"], terms: ["differentiation-syndrome", "esr1-mutation", "ar-v7"], pathways: ["myc", "er-signaling", "ar-signaling", "epigenetic-reprogramming", "swi-snf-chromatin", "mrna-translation-eif4f"], cancers: ["ewing-sarcoma", "aml", "prostate", "breast-hr-positive"],
    links: [{ label: "Bradner, Hnisz & Young, Transcriptional addiction in cancer (Cell 2017)", url: "https://doi.org/10.1016/j.cell.2016.12.013" }],
  }),
  p({
    id: "ubiquitin-proteasome-system", name: "Ubiquitin-proteasome system & protein homeostasis", wikipedia: W("Proteasome"),
    tldr: "Ubiquitin can change a protein's interactions, location or fate. Some tags support proteasomal destruction; tagging alone does not establish completed degradation.",
    summary: "E1 enzymes activate ubiquitin, E2 enzymes carry it and E3 ligases help select substrates and assemble modifications. Chain architecture and cellular context influence the result; ubiquitination is not universally a destruction signal. Deubiquitinases can remove or remodel tags, and proteasomal degradation is a later process that needs its own evidence. A protein can fall because synthesis changes, cells are lost or degradation increases, so abundance alone does not identify the route. In targeted-degradation experiments, target binding, E3 recruitment, protein loss, proteasome dependence and sustained cellular effects are distinct observations. Proteasome inhibitors and recruited-degradation strategies intervene at different steps; mechanistic measurements do not by themselves establish clinical benefit.",
    analogy: "A recycling plant with barcode stickers (ubiquitin) and a shredder (proteasome). Myeloma is a paper mill that produces so much waste it dies when the shredder stops (bortezomib). PROTACs and glues are forged stickers that get the plant to shred the cancer's own machinery.",
    nodes: [
      { id: "e1", label: "E1 → E2 ubiquitin", x: 12, y: 15 }, { id: "e3", label: "E3 ligase (CRBN, VHL, MDM2)", x: 40, y: 15, targetId: "mdm2" }, { id: "sub", label: "Substrate (IKZF1/3, p53, HIF)", x: 70, y: 15, targetId: "hif2a" },
      { id: "chain", label: "K48 ubiquitin chain", x: 70, y: 45 }, { id: "dub", label: "DUBs (USP7)", x: 92, y: 30 }, { id: "prot", label: "26S proteasome (β5)", x: 70, y: 75 },
      { id: "upr", label: "UPR, IκB → NF-κB", x: 40, y: 75 }, { id: "glue", label: "Glues / PROTACs hijack E3", x: 40, y: 45, targetId: "estrogen-receptor" }, { id: "deg", label: "Degradation", x: 92, y: 90 }, { id: "chap", label: "HSP90 chaperones", x: 12, y: 75 },
    ],
    edges: [
      { from: "e1", to: "e3" }, { from: "e3", to: "sub" }, { from: "sub", to: "chain" }, { from: "dub", to: "chain", type: "inhibits" }, { from: "chain", to: "prot" }, { from: "prot", to: "deg" },
      { from: "prot", to: "upr", type: "inhibits" }, { from: "glue", to: "e3" }, { from: "glue", to: "sub" }, { from: "chap", to: "sub", type: "inhibits" },
    ],
    interventions: ["Proteasome inhibitors bortezomib, carfilzomib, ixazomib in multiple myeloma and mantle cell lymphoma", "Cereblon glues: lenalidomide, pomalidomide; CELMoDs iberdomide, mezigdomide, golcadomide", "PROTACs: vepdegestrant (ER), BGB-16673 (BTK), AR degraders; degrader-antibody conjugates deliver them by antibody", "Reactivating degradation of oncoproteins (MDM2 inhibition for p53) and blocking DUBs are in trials"],
    targets: [
  "mdm2",
  "hif2a",
  "estrogen-receptor",
  "btk"
], drugs: ["bortezomib", "carfilzomib", "ixazomib", "lenalidomide", "pomalidomide", "iberdomide", "mezigdomide", "golcadomide", "vepdegestrant", "bgb-16673"], technologies: ["protac-degrader", "molecular-glue-platforms", "degrader-antibody-conjugate"], terms: ["r-iss", "high-risk-myeloma"], pathways: ["hif-vhl", "p53-mdm2-axis", "inflammation-nfkb", "myc"], cancers: ["multiple-myeloma", "mantle-cell-lymphoma", "prostate", "breast-hr-positive"],
    links: [
  {
    "label": "Békés, Langley & Crews, PROTAC targeted protein degraders: the past is prologue (Nat Rev Drug Discov 2022)",
    "url": "https://doi.org/10.1038/s41573-021-00371-6"
  },
  {
    "label": "Source identity and scope, PMID 6305978",
    "url": "https://pubmed.ncbi.nlm.nih.gov/6305978/"
  },
  {
    "label": "Source identity and scope, PMID 3031653",
    "url": "https://pubmed.ncbi.nlm.nih.gov/3031653/"
  },
  {
    "label": "Source identity and scope, PMID 28421184",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28421184/"
  },
  {
    "label": "Source identity and scope, PMID 19345192",
    "url": "https://pubmed.ncbi.nlm.nih.gov/19345192/"
  },
  {
    "label": "Source identity and scope, PMID 15282312",
    "url": "https://pubmed.ncbi.nlm.nih.gov/15282312/"
  },
  {
    "label": "Source identity and scope, PMID 15958804",
    "url": "https://pubmed.ncbi.nlm.nih.gov/15958804/"
  },

  {"label":"Guidelines for the use and interpretation of assays for monitoring autophagy (4th edition)&lt;sup&gt;1&lt;/sup&gt; (2021)","url":"https://pubmed.ncbi.nlm.nih.gov/33634751/"},
  {"label":"Effect of Gemcitabine and nab-Paclitaxel With or Without Hydroxychloroquine on Patients With Advanced Pancreatic Cancer: A Phase 2 Randomized Clinical Trial (2019)","url":"https://pubmed.ncbi.nlm.nih.gov/31120501/"},
],

"notes": [
  "Ubiquitin is a small protein attached through enzyme steps: E1 uses ATP for activation, E2 carries activated ubiquitin, and E3 promotes substrate selection and transfer. Reticulocyte experiments separated these functions. E3 families differ in transfer mechanism; no single cartoon specifies all of them.",
  "Suitable tagged cargo can be unfolded by ATP-dependent proteasomal machinery and broken into fragments, while ubiquitin is removed and reused. Other ubiquitin signals organise interactions rather than destruction, and yeast experiments show overlapping chain functions. Lysosomal autophagy and proteasomal breakdown are distinct routes.",
  "Protein abundance reflects synthesis and removal. Measure named-substrate decay over time with synthesis, handling and viability controls; restoration of an E3 adaptor can strengthen attribution without proving direct binding or global proteasome failure. Catalytic activity per time, ubiquitinated-cargo intensity and protein lifetime in hours are different readouts. KEAP1 is one CUL3 adaptor for NRF2, so a CUL3 change cannot uniquely identify that substrate. Pulse labelling or a controlled temporary synthesis block can help estimate turnover but may cause stress. Independent perturbation and restoration help distinguish a selected-substrate effect from a secondary response; enzyme engagement alone does not establish selective killing.",
  "In a randomised trial of 669 people with relapsed myeloma after one to three prior therapies, bortezomib prolonged median time to progression compared with high-dose dexamethasone: 6.22 versus 3.49 months. This historical clinical result does not make an arbitrary E3 variant or abundant protein a predictive treatment biomarker.",

  "Proteasomal degradation commonly handles individual suitable proteins, whereas lysosomal macroautophagy can deliver aggregates, organelles and portions of cytoplasm. This is a distinction of machinery and typical cargo, not an absolute partition: ubiquitinated material can also be recognised by autophagy adaptors such as p62. A tagged protein, an autophagic membrane marker and disappearance of a named cargo are different observations. Bortezomib's relapsed-myeloma trial result does not predict a hydroxychloroquine result in pancreatic cancer, and blocking both routes does not by itself demonstrate selective harm to malignant cells.",
],
"asOf": "2026-11-12"
,
"related": [
  "bcma",
  "androgen-receptor",
  "er-stress-and-unfolded-protein-response"
]
}),

  // ------------------------------------------------------------------ 4. Evading death and repair
  p({
    id: "homologous-recombination-repair", name: "Double-strand break repair: HR versus end joining", wikipedia: W("Homologous_recombination"),
    tldr: "Cells can repair breaks through both DNA strands using a matching template or several end-joining routes. The available template, cell state and broken ends affect which route can operate.",
    summary: "Double-strand breaks can be repaired through matching-template homologous recombination or several end-joining routes. Homologous repair often uses the sister chromatid after DNA copying. The substrate, available template and cell-cycle state affect which route can operate.\n\nPreparing a double-strand break for homologous repair includes DNA end resection in the 5′ to 3′ direction, leaving protruding 3′ single-stranded ends. RAD51 helps a prepared strand find and pair with a complementary strand in matching duplex DNA, displacing the other template strand into a D-loop. DNA synthesis can then extend the invading end using the template. Synthesis-dependent strand annealing can finish as a noncrossover repair: the extended strand leaves the template and pairs with the other broken end. Other homologous-repair routes can have crossover outcomes, so using an intact template does not mean every repair leaves donor and recipient arrangements unchanged. Purified bacterial RecA structures reveal strand-pairing intermediates; they are not direct measurements of human RAD51 repair in a tumour.\n\nClassical nonhomologous end joining reconnects ends without requiring a long matching template and can preserve compatible ends. Microhomology-associated joining uses short matching sequences after end processing. Theta-mediated end joining names a POLQ-mediated mechanism; finding short matches alone does not identify that enzyme. These routes overlap in outcomes without becoming interchangeable definitions.\n\nKu binds broken ends, and ligase IV with supporting factors can help align and seal them; difficult ends can require processing. Resection exposes single-stranded regions for alternative joining, where short matches can align and intervening sequence can be lost. Purified-factor experiments, defined chromosome-break reporters and controlled cellular studies test particular substrates and factor dependencies, not a universal menu for every break.\n\nA fictional top-strand sequence CA-GAC-TT|AA-GAC-GT has 14 base pairs before joining. A selected short-match product CA-GAC-GT retains seven, losing the four-base TTAA interval and one three-base GAC repeat. For a selected alignment of GAC with its complementary CTG sequence, trimming the unmatched TT flaps leaves seven paired positions and two backbone nicks to seal, without a gap to fill. Other substrates can require synthesis; this arithmetic and schematic geometry are not measured repair frequencies.\n\nSequence a repaired junction and measure a defined repair reporter, then perturb the proposed factor with specificity controls and, where feasible, rescue. Repair fraction, junction distribution and cell survival are distinct outputs. A deletion with microhomology is compatible with a joining route, but does not demonstrate POLQ dependence, selective killing or benefit from a POLQ inhibitor in a patient. Viable-cell and purified-component studies have model-specific input and material costs.",
    analogy: "A matching copy can guide repair of a torn page; end joining reconnects the damaged edges. This comparison omits the proteins and end processing, and end joining can preserve compatible sequence.",
    nodes: [
      { id: "dsb", label: "Double-strand break", x: 45, y: 8 }, { id: "mrn", label: "MRN → ATM → CHK2", x: 45, y: 28, targetId: "atr" }, { id: "53bp1", label: "53BP1-Shieldin (protect)", x: 78, y: 28 },
      { id: "nhej", label: "NHEJ: Ku, DNA-PKcs, LIG4", x: 78, y: 55 }, { id: "res", label: "Resection: BRCA1-CtIP", x: 15, y: 40, targetId: "brca" }, { id: "rad51", label: "PALB2-BRCA2 → RAD51", x: 15, y: 65, targetId: "brca" },
      { id: "hr", label: "Accurate HR (sister copy)", x: 15, y: 90 }, { id: "polq", label: "POLQ end joining (backup)", x: 45, y: 90 }, { id: "join", label: "Error-prone joining", x: 78, y: 82 }, { id: "parp", label: "PARP trapping → breaks", x: 12, y: 8, targetId: "parp" },
    ],
    edges: [
      { from: "parp", to: "dsb" }, { from: "dsb", to: "mrn" }, { from: "mrn", to: "res" }, { from: "53bp1", to: "res", type: "inhibits" }, { from: "dsb", to: "nhej" }, { from: "53bp1", to: "nhej" },
      { from: "res", to: "rad51" }, { from: "rad51", to: "hr" }, { from: "res", to: "polq" }, { from: "nhej", to: "join" }, { from: "polq", to: "join" },
    ],
    interventions: ["PARP inhibitors (olaparib, niraparib, rucaparib, talazoparib) in BRCA/HRD ovarian, breast, prostate, pancreatic cancer", "Platinum chemotherapy and radiation add breaks HR-deficient cells cannot fix", "POLQ inhibitors (novobiocin analogues), ATR inhibitors after ATM loss, DNA-PK inhibitors with radiotherapy (trials)", "HRD testing (genomic scars, BRCA sequencing) and RAD51 foci assays select patients; reversion mutations detected in ctDNA flag resistance"],
    targets: ["brca", "parp", "atr", "wee1"], drugs: ["olaparib", "niraparib", "rucaparib", "talazoparib", "carboplatin", "cisplatin"], technologies: ["parp-inhibitor", "hrd-testing", "platinum", "imrt-igrt", "sbrt", "germline-testing", "synthetic-lethality-approaches"], terms: ["hrd", "synthetic-lethality", "mutational-signature", "germline-vs-somatic", "hereditary-cancer-syndromes"], pathways: ["ddr", "replication-stress", "base-excision-repair-parp", "synthetic-lethality-map", "cgas-sting"], cancers: ["ovarian", "tnbc", "prostate", "pancreatic"],
    links: [
  {
    "label": "Chang, Pannunzio, Adachi & Lieber, Non-homologous DNA end joining and alternative pathways to double-strand break repair (Nat Rev Mol Cell Biol 2017)",
    "url": "https://doi.org/10.1038/nrm.2017.48"
  },
  {
    "label": "Lord & Ashworth, PARP inhibitors: synthetic lethality in the clinic (Science 2017)",
    "url": "https://doi.org/10.1126/science.aam7344"
  },
  {
    "label": "Structural role for DNA Ligase IV in promoting the fidelity of non-homologous end joining. (2024; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/38341432/"
  },
  {
    "label": "Mechanism of microhomology-mediated end-joining promoted by human DNA polymerase θ. (2015; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25643323/"
  },
  {
    "label": "Alternative-NHEJ is a mechanistically distinct pathway of mammalian chromosome break repair. (2008; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/18584027/"
  },
  {
    "label": "DNA Ligase IV Guides End-Processing Choice during Nonhomologous End Joining. (2017; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28930678/"
  },
  {
    "label": "Essential Roles for Polymerase θ-Mediated End Joining in the Repair of Chromosome Breaks. (2016; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/27453047/"
  },
  {
    "label": "Sister chromatid gene conversion is a prominent double-strand break repair pathway in mammalian cells. (2000; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/10880452/"
  },
  {
    "label": "Brca1 controls homology-directed DNA repair. (1999; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/10549283/"
  },
  {
    "label": "Purified human BRCA2 stimulates RAD51-mediated recombination. (2010; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/20729832/"
  },
  {
    "label": "Biochemical Mechanisms of Genetic Recombination and DNA Repair (2025 biochemical review)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/40153609/"
  },
  {
    "label": "Homologous recombination and its regulation (2012 review)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22467216/"
  },
  {
    "label": "Mechanism of strand exchange from RecA-DNA synaptic and D-loop structures (2020 purified bacterial RecA cryo-EM)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/33057191/"
  }
],

"asOf": "2026-11-11"
}),
  p({
    id: "mismatch-repair-msi", name: "Mismatch repair & microsatellite instability", wikipedia: W("DNA_mismatch_repair"),
    tldr: "After DNA is copied, a proofreading crew fixes the letters the polymerase got wrong. Lose it and the genome fills with thousands of small errors, especially in repetitive stretches (microsatellites). Those errors make abnormal proteins that the immune system can see, which is why immunotherapy works so well in these cancers.",
    summary: "MutSα (MSH2-MSH6) recognises base mismatches and small insertion-deletion loops, MutSβ (MSH2-MSH3) larger loops; MutLα (MLH1-PMS2) is recruited and nicks the new strand, EXO1 excises, Pol δ resynthesises, LIG1 seals. Loss of MLH1 (usually by promoter hypermethylation in sporadic colorectal and endometrial cancer, often with BRAF V600E), MSH2, MSH6 or PMS2 (germline in Lynch syndrome, or EPCAM deletion silencing MSH2) produces microsatellite instability (MSI-H), a hypermutator phenotype with 10-100x more mutations, frameshift neoantigens, and the SBS6/15/26 signatures. Clinically MSI-H/dMMR is tumour-agnostic for pembrolizumab and dostarlimab; dMMR rectal cancer can be cured with dostarlimab alone (complete responses in >90% of patients in the MSK study); neoadjuvant nivolumab-ipilimumab gives near-universal pathological responses in dMMR colon cancer. MMR loss also confers tolerance to temozolomide and thiopurines (the lesions are no longer recognised). Synthetic lethality: MSI-H cells depend on the WRN helicase; WRN inhibitors are in trials.",
    analogy: "A spell-checker that runs after every page is typed. Without it, typos pile up, especially in words like 'banana' where it is easy to lose count of the repeats. The garbled words in the resulting proteins read as foreign, so the immune system, once its brakes are released, attacks with unusual vigour.",
    nodes: [
      { id: "err", label: "Replication mismatch", x: 12, y: 15 }, { id: "muts", label: "MutSα (MSH2-MSH6)", x: 40, y: 15 }, { id: "mutl", label: "MutLα (MLH1-PMS2)", x: 68, y: 15 },
      { id: "exo", label: "EXO1, Pol δ resynthesis", x: 92, y: 30 }, { id: "fixed", label: "Corrected DNA", x: 92, y: 60 }, { id: "loss", label: "MMR loss (Lynch, MLH1 methylation)", x: 40, y: 45 },
      { id: "msi", label: "MSI-H, hypermutation", x: 40, y: 72 }, { id: "neo", label: "Frameshift neoantigens", x: 68, y: 72 }, { id: "io", label: "Checkpoint-inhibitor response", x: 68, y: 94, targetId: "pd1" }, { id: "wrn", label: "WRN dependence", x: 12, y: 72, targetId: "wrn" },
    ],
    edges: [
      { from: "err", to: "muts" }, { from: "muts", to: "mutl" }, { from: "mutl", to: "exo" }, { from: "exo", to: "fixed" }, { from: "loss", to: "muts", type: "inhibits" }, { from: "loss", to: "mutl", type: "inhibits" },
      { from: "loss", to: "msi" }, { from: "msi", to: "neo" }, { from: "neo", to: "io" }, { from: "msi", to: "wrn" },
    ],
    interventions: ["Tumour-agnostic pembrolizumab and dostarlimab for MSI-H/dMMR; nivolumab ± ipilimumab in colorectal cancer", "Organ-sparing: dostarlimab alone cures most dMMR rectal cancers; neoadjuvant nivolumab-ipilimumab in dMMR colon cancer", "Universal MMR/MSI testing of colorectal and endometrial cancer finds Lynch syndrome; colonoscopic surveillance and aspirin for carriers", "WRN helicase inhibitors as synthetic-lethal therapy for MSI-H tumours (trials)"],
    targets: ["pd1", "ctla4", "wrn", "pdl1"], drugs: ["pembrolizumab", "dostarlimab", "nivolumab", "ipilimumab"], technologies: ["checkpoint-inhibitor", "cgp", "germline-testing", "histopathology-ihc", "colorectal-screening", "aspirin-cancer-prevention", "synthetic-lethality-approaches"], terms: ["msi", "lynch-syndrome", "tmb", "neoantigen", "tumour-agnostic", "mutational-signature", "endometrial-molecular-classes", "cms-subtypes"], pathways: ["mutagenesis-signatures", "antigen-presentation-immunoediting", "pd1-checkpoint", "synthetic-lethality-map"], cancers: ["colorectal", "endometrial", "gastric"],
    links: [{ label: "Le et al., Mismatch repair deficiency predicts response of solid tumors to PD-1 blockade (Science 2017)", url: "https://doi.org/10.1126/science.aan6733" }],
  }),
  p({
    id: "base-excision-repair-parp", name: "Base excision repair, PARP & alkylation damage", wikipedia: W("Base_excision_repair"),
    tldr: "Tens of thousands of times a day a single DNA letter is oxidised or chemically scarred. A small crew snips it out and PARP marks the nick so it gets sealed. PARP inhibitors do not just switch PARP off; they trap it on the DNA, turning a harmless nick into a lethal break when the cell copies its DNA.",
    summary: "Damaged bases (8-oxoguanine, uracil, alkylated bases from temozolomide or endogenous methylation) are removed by glycosylases (OGG1, UNG, MPG), APE1 cuts the backbone, PARP1 binds the single-strand break and PARylates itself and histones to recruit XRCC1, Pol β fills the gap and LIG3 seals it (short-patch) or FEN1/LIG1 (long-patch). PARP inhibitors compete with NAD+ and, crucially, trap PARP1 on DNA (talazoparib >> olaparib > veliparib in trapping potency), so replication forks collide with the complex and collapse into double-strand breaks that only HR can fix, the mechanistic basis of BRCA synthetic lethality; PARP1-selective saruparib spares PARP2 and bone marrow. O6-methylguanine, the lethal TMZ lesion, is reversed directly by MGMT; MGMT promoter methylation predicts TMZ benefit in glioblastoma, and MMR is needed for TMZ toxicity. PARP inhibition also traps PARP at oxidative lesions from radiation and generates cytosolic DNA that fires cGAS-STING.",
    analogy: "Potholes on a busy road. Normally a small crew fills them overnight and PARP is the foreman who cones them off. A PARP inhibitor glues the foreman to the pothole; in the morning the traffic (replication) hits him and the road collapses, and only the bridge-building crew (BRCA) could rebuild it.",
    nodes: [
      { id: "les", label: "Oxidised / alkylated base", x: 12, y: 15 }, { id: "mgmt", label: "MGMT direct reversal", x: 12, y: 45 }, { id: "glyc", label: "Glycosylase → APE1", x: 40, y: 15 },
      { id: "ssb", label: "Single-strand break", x: 68, y: 15 }, { id: "parp", label: "PARP1 → XRCC1", x: 68, y: 45, targetId: "parp" }, { id: "polb", label: "Pol β, LIG3 seal", x: 92, y: 60 },
      { id: "trap", label: "PARP trapped on DNA", x: 40, y: 72 }, { id: "fork", label: "Fork collapse → DSB", x: 68, y: 90 }, { id: "hr", label: "HR (BRCA) rescue", x: 92, y: 90, targetId: "brca" }, { id: "tmz", label: "Temozolomide, radiation", x: 12, y: 78 },
    ],
    edges: [
      { from: "les", to: "glyc" }, { from: "mgmt", to: "les", type: "inhibits" }, { from: "glyc", to: "ssb" }, { from: "ssb", to: "parp" }, { from: "parp", to: "polb" }, { from: "tmz", to: "les" },
      { from: "parp", to: "trap" }, { from: "trap", to: "fork" }, { from: "hr", to: "fork", type: "inhibits" },
    ],
    interventions: ["PARP inhibitors: talazoparib (strongest trapper), olaparib, niraparib, rucaparib; PARP1-selective saruparib", "Temozolomide in MGMT-methylated glioblastoma; lomustine, dacarbazine as alkylators", "PARP inhibitor + radiotherapy or + TMZ combinations, limited by marrow toxicity; PARP-radioligand combinations in trials", "PARP PET imaging to quantify target"],
    targets: ["parp", "brca", "atr"], drugs: ["olaparib", "niraparib", "rucaparib", "talazoparib", "temozolomide", "lomustine"], technologies: ["parp-inhibitor", "parp-pet", "radionuclide-parp-combination", "cytotoxic-chemotherapy"], terms: ["mgmt", "synthetic-lethality", "hrd", "dna-alkylator-payloads"], pathways: ["ddr", "homologous-recombination-repair", "cgas-sting", "replication-stress"], cancers: ["glioblastoma", "ovarian", "prostate", "tnbc"],
    links: [{ label: "Caldecott, Single-strand break repair and genetic disease (Nat Rev Genet 2008)", url: "https://doi.org/10.1038/nrg2380" }, { label: "Lord & Ashworth, PARP inhibitors: synthetic lethality in the clinic (Science 2017)", url: "https://doi.org/10.1126/science.aam7344" }],
  }),
  p({
    id: "synthetic-lethality-map", name: "Synthetic lethality: paired dependencies", wikipedia: W("Synthetic_lethality"),
    tldr: "Two genes are synthetically lethal when losing either alone is fine but losing both kills the cell. Cancers that have already lost one (a tumour suppressor you cannot put back) become uniquely dependent on the other, which you can drug. BRCA and PARP was the first proof; a dozen more pairs are now in trials.",
    summary: "Genome-wide CRISPR screens (DepMap, Project Score) and clinical experience have mapped paired dependencies: BRCA1/2 or HRD → PARP1 and POLQ; ATM loss → ATR; TP53 loss or CCNE1 amplification → WEE1 and PKMYT1; MSI-H → WRN helicase; MTAP deletion (co-deleted with CDKN2A in ~15% of cancers) → PRMT5 and MAT2A (MTA-cooperative PRMT5 inhibitors AMG 193, MRTX1719); SMARCA4 loss → SMARCA2 (degraders); ARID1A loss → EZH2 and ATR; RB1 loss → Aurora kinase; VHL loss → HIF-2α (belzutifan is an oncogene-addiction-style version); KRAS mutation → SHP2, SOS1 (collateral dependencies). The concept also covers 'collateral lethality' (passenger deletions removing a paralogue) and 'induced essentiality' under therapy. Clinical success requires a clean biomarker, a selective inhibitor with a therapeutic window (PARP2 and marrow; PRMT5 in normal cells), and tolerance for resistance via restoration of the lost pathway (BRCA reversion) or loss of the dependency (53BP1).",
    analogy: "A building held up by two pillars. Knock one out and it still stands; nobody notices. But a tumour has already lost one pillar to get where it is, so the second pillar, harmless to attack in every normal cell, brings the whole tumour down when it goes.",
    nodes: [
      { id: "brca", label: "BRCA / HRD loss", x: 12, y: 10, targetId: "brca" }, { id: "parp", label: "→ PARP1, POLQ", x: 40, y: 10, targetId: "parp" },
      { id: "p53", label: "TP53 loss, CCNE1 amp", x: 12, y: 32, targetId: "tp53" }, { id: "wee1", label: "→ WEE1, PKMYT1, ATR", x: 40, y: 32, targetId: "wee1" },
      { id: "msi", label: "MSI-H (MMR loss)", x: 12, y: 54 }, { id: "wrn", label: "→ WRN helicase", x: 40, y: 54, targetId: "wrn" },
      { id: "mtap", label: "MTAP deletion", x: 12, y: 76 }, { id: "prmt5", label: "→ PRMT5, MAT2A", x: 40, y: 76, targetId: "prmt5-mtap" },
      { id: "atm", label: "ATM loss", x: 12, y: 96 }, { id: "atr", label: "→ ATR", x: 40, y: 96, targetId: "atr" },
      { id: "screen", label: "CRISPR screens (DepMap)", x: 78, y: 20 }, { id: "drug", label: "Selective inhibitor", x: 78, y: 52 }, { id: "res", label: "Resistance: restore lost path", x: 78, y: 84 },
    ],
    edges: [
      { from: "brca", to: "parp" }, { from: "p53", to: "wee1" }, { from: "msi", to: "wrn" }, { from: "mtap", to: "prmt5" }, { from: "atm", to: "atr" },
      { from: "screen", to: "drug" }, { from: "drug", to: "parp", type: "inhibits" }, { from: "drug", to: "wee1", type: "inhibits" }, { from: "drug", to: "wrn", type: "inhibits" }, { from: "drug", to: "prmt5", type: "inhibits" }, { from: "res", to: "drug", type: "inhibits" },
    ],
    interventions: ["PARP inhibitors for BRCA/HRD (approved in four cancers)", "MTA-cooperative PRMT5 inhibitors for MTAP-deleted tumours (mesothelioma, NSCLC, pancreatic; phase 1-2)", "WEE1 (azenosertib), PKMYT1 (lunresertib) and ATR (ceralasertib, camonsertib) inhibitors in TP53-mutant, CCNE1-amplified and ATM-deficient tumours", "WRN inhibitors for MSI-H; SMARCA2 degraders for SMARCA4-deficient cancers"],
    targets: ["parp", "brca", "wee1", "atr", "wrn", "prmt5-mtap", "tp53", "hif2a", "ezh2"], drugs: ["olaparib", "niraparib", "talazoparib", "belzutifan"], technologies: ["synthetic-lethality-approaches", "crispr-screens", "parp-inhibitor", "hrd-testing", "cgp", "functional-drug-testing"], terms: ["synthetic-lethality", "hrd", "msi", "oncogene-addiction"], pathways: ["ddr", "homologous-recombination-repair", "mismatch-repair-msi", "replication-stress", "p53-mdm2-axis", "hif-vhl"], bottlenecks: ["b-undruggable-targets"],
    links: [{ label: "Lord & Ashworth, PARP inhibitors: synthetic lethality in the clinic (Science 2017)", url: "https://doi.org/10.1126/science.aam7344" }, { label: "DepMap portal (Broad Institute)", url: "https://depmap.org/portal/" }],
  }),

  // ------------------------------------------------------------------ 5. Feeding the tumour
  p({
    id: "glutamine-metabolism", name: "Glutamine addiction", wikipedia: W("Glutaminolysis"),
    tldr: "Glutamine supports several cellular processes. A particular cell’s dependence on its metabolism must be tested under defined conditions.",
    summary: "Glutamine enters via SLC1A5 (ASCT2) and SLC38A2; glutaminase (GLS, MYC-induced via miR-23 suppression; GLS2 is p53-induced) converts it to glutamate, which GLUD1 or transaminases (GOT1/2, GPT2) convert to α-ketoglutarate for TCA anaplerosis, supporting oxidative phosphorylation and, under hypoxia or IDH mutation, reductive carboxylation to citrate for lipids. Glutamine's amide nitrogen feeds purine and pyrimidine synthesis (CAD, PPAT) and hexosamines; glutamate makes glutathione (with cysteine via SLC7A11) and aspartate (KRAS-mutant pancreatic cancer routes glutamine through GOT1 to maintain NADPH). mTORC1 senses glutamine-derived α-KG. Tumour uptake depletes glutamine in the microenvironment, impairing T-cell effector function. Drugs: the glutaminase inhibitor telaglenastat (CB-839) failed in RCC (CANTATA) and was tested in the KEAP1/NRF2-selected NSCLC KEAPSAKE combination trial, whose registry records termination for lack of clinical benefit; the broad glutamine antagonist prodrug DRP-104 (sirpiglenastat) and ASCT2 inhibitors are in early trials; asparaginase (which also depletes glutamine) is standard in ALL. Glutamine PET tracers (18F-FGln) image glioma where FDG fails.",
    analogy: "A delivery network can supply several kinds of cellular work. A cell may compensate for one interrupted route, but that needs testing in the defined medium and model; the comparison does not predict a patient’s treatment response.",
    nodes: [
      { id: "gln", label: "Glutamine (SLC1A5)", x: 12, y: 30 }, { id: "gls", label: "Glutaminase (GLS)", x: 40, y: 30 }, { id: "glu", label: "Glutamate", x: 66, y: 30 },
      { id: "akg", label: "α-KG → TCA anaplerosis", x: 66, y: 60 }, { id: "gsh", label: "Glutathione, NADPH", x: 90, y: 45 }, { id: "nuc", label: "Nucleotides (N donor)", x: 40, y: 8 },
      { id: "myc", label: "MYC, KRAS drive uptake", x: 12, y: 65, targetId: "kras" }, { id: "idh", label: "IDH → 2-HG / reductive", x: 90, y: 80, targetId: "idh" }, { id: "tcell", label: "T cells starved", x: 40, y: 85, targetId: "pd1" }, { id: "mtor", label: "mTORC1 sensing", x: 12, y: 92, targetId: "akt" },
    ],
    edges: [
      { from: "gln", to: "gls" }, { from: "gls", to: "glu" }, { from: "gln", to: "nuc" }, { from: "glu", to: "akg" }, { from: "glu", to: "gsh" }, { from: "akg", to: "idh" },
      { from: "myc", to: "gls" }, { from: "myc", to: "gln" }, { from: "gln", to: "tcell", type: "inhibits" }, { from: "akg", to: "mtor" },
    ],
    interventions: ["Asparaginase (depletes asparagine and glutamine) in ALL", "Glutaminase inhibitor telaglenastat: negative in RCC and NSCLC; glutamine antagonist DRP-104 and ASCT2 blockers in early trials", "IDH inhibitors (ivosidenib, vorasidenib) block the oncometabolite branch", "Glutamine PET (18F-FGln) for glioma; metabolic imaging to pick fuel-dependent tumours"],
    targets: ["kras", "idh", "akt", "pd1"], drugs: ["asparaginase", "ivosidenib", "vorasidenib"], technologies: ["metabolic-therapy", "fdg-pet", "pet"], terms: ["warburg-effect", "deregulating-cellular-energetics"], pathways: ["cancer-metabolism", "myc", "ras-mapk", "keap1-nrf2", "nutrient-competition-tme"], cancers: ["all-leukemia", "rcc", "pancreatic", "glioblastoma"],
    links: [{ label: "Altman, Stine & Dang, From Krebs to clinic: glutamine metabolism to cancer therapy (Nat Rev Cancer 2016)", url: "https://doi.org/10.1038/nrc.2016.71" },
  {"label":"Keap1 loss promotes Kras-driven lung cancer and results in dependence on glutaminolysis (2017)","url":"https://pubmed.ncbi.nlm.nih.gov/28967920/"},
  {"label":"ClinicalTrials.gov: KEAPSAKE NCT04265534","url":"https://clinicaltrials.gov/study/NCT04265534"},
],

  "notes": ["A metabolic supply dependence is conditional. Romero's gene-edited KRAS-driven lung cancer experiments linked Keap1 loss and NRF2 activation to increased glutaminolysis dependence and sensitivity to glutaminase inhibition in the studied models. This does not establish a universal need in all cancers. KEAPSAKE's 40-participant registry disposition is a separate clinical result for a specified combination and selected population, rather than a response percentage or a test of every glutamine-directed intervention. Keep growth effects, metabolite measurements, the specific perturbation, medium, comparator and clinical exposure separate."],
  "asOf": "2026-11-12",
}),
  p({
    id: "lipid-metabolism-cancer", name: "Lipid synthesis, uptake & cholesterol", wikipedia: W("Fatty_acid_synthesis"),
    tldr: "Cells can make, import, store and reuse lipids. The route they use and their dependence on it vary with the cell and conditions.",
    summary: "Lipid metabolism includes synthesis, uptake, storage, membrane remodelling and oxidation. Cholesterol regulation and fatty-acid regulation overlap but are not interchangeable. Identify the SREBP member, cellular compartment and measured output rather than treating a transcript, precursor, nuclear fragment, sterol amount and synthesis rate as the same observation. SCAP-SREBP transport responds to endoplasmic reticulum cholesterol in the cited cell experiments. The mevalonate pathway supplies sterols and nonsterol products, including substrates for protein prenylation. Rescue by mevalonate therefore cannot uniquely identify cholesterol as the limiting product. Transcript abundance, lipid abundance, labelled production and a controlled survival-dependence experiment answer different questions. Results from a particular cell model or mouse experiment do not establish a universal tumour vulnerability or a preferred diet or treatment.",
    analogy: "A factory that must build its own walls. Normal adult tissue buys wall panels from a supplier (dietary fat); cancer reopens its own panel plant (FASN) and, when it lands in a fat depot, simply strips panels off the buildings next door.",
    nodes: [
      { id: "cit", label: "Citrate → ACLY → acetyl-CoA", x: 12, y: 20 }, { id: "acc", label: "ACC → malonyl-CoA", x: 40, y: 20 }, { id: "fasn", label: "FASN → palmitate", x: 68, y: 20 },
      { id: "scd", label: "SCD1 → membranes", x: 90, y: 40 }, { id: "srebp", label: "SREBP (mTORC1, hypoxia)", x: 40, y: 50, targetId: "akt" }, { id: "ampk", label: "AMPK / LKB1", x: 12, y: 50 },
      { id: "mev", label: "Mevalonate → cholesterol", x: 68, y: 55, targetId: "kras" }, { id: "cd36", label: "CD36 uptake from adipocytes", x: 12, y: 82 }, { id: "fao", label: "Fatty acid oxidation (CPT1)", x: 40, y: 82 }, { id: "ferro", label: "PUFA → ferroptosis", x: 90, y: 80 }, { id: "obes", label: "Obesity, insulin, IGF-1", x: 68, y: 88 },
    ],
    edges: [
      { from: "cit", to: "acc" }, { from: "acc", to: "fasn" }, { from: "fasn", to: "scd" }, { from: "srebp", to: "fasn" }, { from: "srebp", to: "mev" }, { from: "ampk", to: "srebp", type: "inhibits" },
      { from: "cd36", to: "fao" }, { from: "cd36", to: "scd" }, { from: "scd", to: "ferro", type: "inhibits" }, { from: "obes", to: "srebp" }, { from: "obes", to: "cd36" },
    ],
    interventions: ["FASN inhibitor denifanstat and SCD1 inhibitors in trials; statins repurposed with mostly negative randomised data", "Weight management, GLP-1 agonists and bariatric surgery reduce obesity-related cancer incidence", "Exercise and dietary pattern interventions during treatment", "Ferroptosis inducers exploit the lipid composition of mesenchymal and persister cells"],
    targets: ["akt", "kras", "estrogen-receptor"], technologies: ["metabolic-therapy", "glp1-agonists-cancer-risk", "bariatric-surgery-cancer-incidence", "mediterranean-plant-forward-diet", "exercise-oncology", "dietitian-led-weight-loss-breast"], terms: ["obesity-related-cancers", "energy-balance", "metabolic-syndrome", "body-composition", "deregulating-cellular-energetics"], pathways: ["cancer-metabolism", "ferroptosis-cell-death", "pi3k-akt-mtor", "tumor-dormancy"], cancers: ["ovarian", "prostate", "breast-hr-positive", "endometrial", "hcc"],
    links: [
  {
    "label": "Röhrig & Schulze, The multifaceted roles of fatty acid synthesis in cancer (Nat Rev Cancer 2016)",
    "url": "https://doi.org/10.1038/nrc.2016.89"
  },
  {
    "label": "Source identity and scope, PMID 19041766",
    "url": "https://pubmed.ncbi.nlm.nih.gov/19041766/"
  },
  {
    "label": "Primary SREBP or mevalonate experiment (PubMed 9616204)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/9616204/"
  },
  {
    "label": "Primary SREBP or mevalonate experiment (PubMed 22265415)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22265415/"
  },

  {"label":"OpenStax Biology 2e 3.3: sterols, membranes and hormone precursors","url":"https://openstax.org/books/biology-2e/pages/3-3-lipids"},
  {"label":"MedlinePlus: cholesterol and hormone production","url":"https://medlineplus.gov/cholesterol.html"},

  {"label":"UniProt O95749: reviewed human GGPS1 catalytic reactions","url":"https://www.uniprot.org/uniprotkb/O95749/entry"},

      {"label":"Martinez Molina et al. 2013: measuring drug target engagement with CETSA","url":"https://pubmed.ncbi.nlm.nih.gov/23828940/"},
      {"label":"UniProt Q12772: human SREBP-2 precursor, processed fragment and membrane topology","url":"https://www.uniprot.org/uniprotkb/Q12772/entry"},
      {"label":"Ye et al. 2000: SREBP membrane cleavage and release into cytosol","url":"https://pubmed.ncbi.nlm.nih.gov/10805775/"}
    ],

"notes": [
  "SCAP and local endoplasmic-reticulum sterol conditions regulate transport of membrane-bound SREBP to the Golgi. Processing releases a fragment that enters the nucleus and regulates lipid synthesis and uptake. Sufficient local sterol supply can retain the complex in the ER; total cellular cholesterol and SREBP RNA do not measure this processing.",
  "In the fictional supply experiment, nuclear SREBP-2 and uptake messages respond to lipid-poor medium; external lipid supply can reduce the response and compensate for synthesis perturbation. Record medium composition, density, timing and viability before assigning dependence. A supply-sensitive state does not establish the response of a person's tumour. Assess precursor and nuclear regulator, responsive transcripts, cellular sterols and uptake separately from labelled synthesis rates. Use controlled supplementation to test the proposed bottleneck; total amount does not specify production or local sensing. Lower synthesis does not itself show that a compound bound its target, and a medium effect does not identify uptake as its cause. An uncharacterised SCAP or MTOR variant needs evidence for its proposed functional effect; a gene name alone assigns neither activation nor loss of function.",
  "In transgenic mice expressing a truncated SREBP-2 construct, Horton and colleagues observed preferential activation of cholesterol synthesis over fatty-acid synthesis in liver and adipose tissue, contrasting it with earlier SREBP-1a results. They separately measured transcripts and synthesis using labelled water. These are relative effects in a named experimental system, not exclusive duties of each family member or proof that a transcript measurement equals flux. Precursor location and nuclear processing require their own measurements.",
  "Statins inhibit HMG-CoA reductase upstream in the mevalonate pathway, which supplies cholesterol and nonsterol products. In Freed-Pastor and colleagues' breast-cancer 3D cultures, geranylgeranyl pyrophosphate partially rescued an invasive phenotype after mutant-p53 depletion or simvastatin treatment. This illustrates why mevalonate rescue alone cannot uniquely attribute an effect to cholesterol. It does not identify every relevant metabolite, establish a universal cancer dependency or show that a statin perturbation reproduces every change in SCAP-SREBP regulation.",

  "HMG-CoA reductase makes mevalonate and is inhibited by statins. The downstream pathway branches: farnesyl pyrophosphate, FPP, feeds sterol synthesis through squalene and GGPP production as well as supplying protein prenylation; geranylgeranyl pyrophosphate, GGPP, supplies another prenylation route. Farnesyl and geranylgeranyl lipid modifications help position specified RAS- and RHO-family proteins, respectively. Cholesterol is a membrane component and a precursor of steroid hormones. Cholesterol amount, sterol synthesis and the whole mevalonate pathway are therefore different measurements. SCAP-SREBP sterol sensing regulates synthesis and uptake, but its activity, pathway transcripts, metabolite supply and dependence must each be established in the tested cells and medium.",
  "Freed-Pastor 2012 studied mutant-p53 breast cancer cells in three-dimensional culture, with different outcomes in two triple-negative lines. Depleting mutant p53 reduced invasive behaviour in MDA-MB-231 but did not make it form ordered hollow acini; MDA-MB-468 could acquire a more ordered, hollow architecture. Statins reduced invasion in the former and caused growth inhibition with extensive death in the latter, rather than exactly reproducing every p53-depletion phenotype. Mutant-p53 depletion reduced mevalonate-pathway expression, and mevalonate add-back opposed several statin effects. This supports a pathway contribution in the studied systems without isolating cholesterol. The whole paper also examined growth, death and xenograft growth; it was not solely an architecture experiment, and none of these results established patient treatment benefit.",
  "The branch experiments further narrowed an invasive-morphology question in MDA-MB-231. Blocking the geranylgeranylation branch had a larger effect than the tested sterol-branch block, and GGPP partly restored invasive growth after mutant-p53 depletion or statin treatment. That is not evidence that GGPP rescues inhibition of the transferase itself, nor that every effect in both cell lines was entirely explained by one metabolite. The authors allowed contributions from other products. In a fictional supply comparison, synthesis falls under an inhibitor in both lipid-poor and lipid-rich medium, but growth slows mainly in the former while import is stipulated to compensate in the latter. Equal engagement with different growth outcomes is compatible with environmental supply; it is not a measurement of supply or dependence in a person's tumour.",
      "In the selected SREBP-2 route, the precursor spans a membrane and its gene-regulating end faces the cytosol. SCAP escorts the membrane-bound precursor from endoplasmic reticulum through transport vesicles to Golgi membranes. Cleavage releases the regulatory fragment into cytosol before nuclear entry; it does not carry the whole precursor, SCAP or the vesicle into the nucleus. Local sterol sensing and Insig-associated retention regulate this transport. A schematic of the route supplies neither a universal sterol threshold nor a measured transcription rate.",
],
"asOf": "2026-11-14"
}),
  p({
    id: "angiogenic-switch", name: "The angiogenic switch & tumour vessels", wikipedia: W("Angiogenesis"),
    tldr: "A tumour cannot grow beyond a couple of millimetres without its own blood supply. The 'switch' flips when the signals calling for new vessels (VEGF, FGF, angiopoietin) outweigh the ones holding them back (thrombospondin). The vessels that result are leaky and chaotic, which starves the tumour of oxygen, blocks drugs, and gives cancer cells a way out.",
    summary: "Hypoxia (HIF), oncogenes (RAS, MYC), p53 loss (which normally induces thrombospondin-1) and inflammatory cells tip the balance of pro-angiogenic (VEGF-A/C, FGF2, PDGF-B, ANG2, PlGF) over anti-angiogenic (TSP-1, endostatin, angiostatin) factors. Endothelial tip cells (VEGFR2, DLL4-Notch selection) sprout, stalk cells proliferate, pericytes (PDGFRβ) stabilise; ANG2 destabilises. Alternatives: vessel co-option (liver, lung, brain metastases; a mechanism of bevacizumab resistance), intussusception, vasculogenic mimicry, and bone-marrow-derived endothelial progenitors. Tumour vessels are tortuous, leaky, poorly pericyte-covered and lack hierarchy, producing heterogeneous hypoxia, acidity, high interstitial pressure (which collapses vessels further and blocks drug penetration), and easy intravasation. Anti-VEGF therapy at moderate doses 'normalises' vessels transiently, improving perfusion, drug delivery and T-cell entry, the basis of IO-VEGF combinations. Resistance: alternative ligands (FGF, ANG2, PlGF), myeloid cells, co-option, and increased invasiveness.",
    analogy: "A new housing estate demanding roads. Once the developers (VEGF) outvote the planners (thrombospondin), roads are laid overnight: badly, with dead ends and potholes, so deliveries (oxygen, drugs) fail and the estate's residents can slip out onto the motorway. Anti-VEGF drugs do not close the roads; used well they make the few that remain drivable.",
    nodes: [
      { id: "hyp", label: "Hypoxia (HIF), RAS, p53 loss", x: 12, y: 15, targetId: "hif2a" }, { id: "pro", label: "VEGF, FGF2, ANG2, PDGF", x: 40, y: 15, targetId: "vegf" }, { id: "anti", label: "TSP-1, endostatin", x: 40, y: 45 },
      { id: "switch", label: "Angiogenic switch", x: 68, y: 30 }, { id: "tip", label: "Tip / stalk sprouting (VEGFR2)", x: 90, y: 50 }, { id: "peri", label: "Pericytes (PDGFRβ)", x: 68, y: 65 },
      { id: "vess", label: "Leaky, chaotic vessels", x: 90, y: 82 }, { id: "coopt", label: "Vessel co-option", x: 40, y: 82 }, { id: "out", label: "Hypoxia, poor delivery, exit", x: 12, y: 82 }, { id: "myeloid", label: "TAMs, MDSCs (bypass)", x: 12, y: 48, targetId: "csf1r" },
    ],
    edges: [
      { from: "hyp", to: "pro" }, { from: "pro", to: "switch" }, { from: "anti", to: "switch", type: "inhibits" }, { from: "switch", to: "tip" }, { from: "tip", to: "vess" }, { from: "peri", to: "vess", type: "inhibits" },
      { from: "vess", to: "out" }, { from: "coopt", to: "out" }, { from: "myeloid", to: "pro" }, { from: "out", to: "hyp" },
    ],
    interventions: ["Anti-VEGF antibodies (bevacizumab, ramucirumab) and VEGFR TKIs (axitinib, cabozantinib, lenvatinib, sunitinib, pazopanib, tivozanib, fruquintinib, regorafenib, sorafenib)", "Vascular normalisation windows for IO-VEGF combinations in RCC, HCC, endometrial cancer; PD-1×VEGF bispecific ivonescimab", "HIF-2α inhibition upstream (belzutifan); multikinase inhibitors hit FGFR/PDGFR escape ligands", "Vessel co-option limits anti-angiogenics in liver and brain metastases"],
    targets: ["vegf", "hif2a", "pd1", "csf1r", "pdgfra"], drugs: ["bevacizumab", "ramucirumab", "axitinib", "cabozantinib", "lenvatinib", "sunitinib", "pazopanib", "tivozanib", "fruquintinib", "regorafenib", "sorafenib", "nintedanib", "ivonescimab", "belzutifan"], technologies: ["antiangiogenic", "hypoxia-activated-therapy", "kinase-inhibitors"], terms: ["inducing-angiogenesis"], pathways: ["vegf-angiogenesis", "hif-vhl", "tumor-microenvironment", "intravasation-ctc-survival"], cancers: ["rcc", "hcc", "colorectal", "glioblastoma", "ovarian"],
    links: [{ label: "Bergers & Benjamin, Tumorigenesis and the angiogenic switch (Nat Rev Cancer 2003)", url: "https://doi.org/10.1038/nrc1093" }],
  }),
  p({
    id: "nutrient-competition-tme", name: "Nutrient competition & metabolic immunosuppression", wikipedia: W("Tumor_microenvironment"),
    tldr: "Tumours and immune cells eat from the same plate. Cancer cells hoard glucose and glutamine, dump lactate and acid, and burn tryptophan and arginine into by-products that paralyse T cells. The tumour wins the food fight, and the immune system loses before it has fired a shot.",
    summary: "Glycolytic tumour cells deplete glucose, leaving T cells unable to sustain aerobic glycolysis needed for IFN-γ production (Chang et al. 2015); lactate export (MCT4) acidifies the niche, blocks T-cell lactate export and polarises macrophages to M2 (via GPR81, HIF-1α); hypoxia induces adenosine via CD39 → CD73, which signals through A2A receptors to suppress T and NK cells. IDO1 and TDO deplete tryptophan and produce kynurenine, activating AHR in T cells and Tregs (the IDO1 inhibitor epacadostat failed in ECHO-301 with pembrolizumab); arginase-1 from MDSCs and TAMs depletes arginine, which T cells need for proliferation; glutamine depletion and cysteine competition add to the exhaustion. Lipid-laden dendritic cells present antigen poorly. Countermeasures: A2A antagonists and CD73 antibodies (modest), arginase inhibitors, glutamine antagonists that spare T cells (DRP-104), metabolic engineering of CAR-T, and diet interventions in early trials.",
    analogy: "A buffet where the tumour arrives first, eats the protein, and leaves the table sticky with lactate. The immune guests arrive hungry and find nothing but by-products that make them drowsy.",
    nodes: [
      { id: "tum", label: "Glycolytic tumour cell", x: 45, y: 12 }, { id: "glc", label: "Glucose, glutamine depleted", x: 12, y: 35 }, { id: "lac", label: "Lactate, acidity (MCT4)", x: 45, y: 40 },
      { id: "ado", label: "CD39 → CD73 → adenosine", x: 78, y: 35, targetId: "cd73-adenosine" }, { id: "ido", label: "IDO1 → kynurenine", x: 12, y: 65 }, { id: "arg", label: "Arginase (MDSC, TAM)", x: 45, y: 68, targetId: "csf1r" },
      { id: "tcell", label: "T-cell / NK dysfunction", x: 78, y: 68, targetId: "pd1" }, { id: "m2", label: "M2 macrophage polarisation", x: 78, y: 92 }, { id: "hyp", label: "Hypoxia", x: 12, y: 92, targetId: "hif2a" },
    ],
    edges: [
      { from: "tum", to: "glc" }, { from: "tum", to: "lac" }, { from: "tum", to: "ido" }, { from: "hyp", to: "ado" }, { from: "hyp", to: "tum" }, { from: "glc", to: "tcell", type: "inhibits" },
      { from: "lac", to: "tcell", type: "inhibits" }, { from: "lac", to: "m2" }, { from: "ado", to: "tcell", type: "inhibits" }, { from: "ido", to: "tcell", type: "inhibits" }, { from: "arg", to: "tcell", type: "inhibits" },
    ],
    interventions: ["IDO1 inhibitor epacadostat failed with pembrolizumab in melanoma (ECHO-301); lesson on phase 2 mirages", "Adenosine axis: CD73 antibodies (oleclumab) and A2A antagonists, modest activity so far", "Arginase inhibitors and glutamine antagonists (DRP-104) designed to spare T cells", "Vessel normalisation and hypoxia relief; metabolically armoured CAR-T; diet trials"],
    targets: ["cd73-adenosine", "pd1", "csf1r", "hif2a", "vegf"], drugs: ["epacadostat", "pembrolizumab"], technologies: ["checkpoint-inhibitor", "metabolic-therapy", "armored-car", "hypoxia-activated-therapy", "fasting-mimicking-diet"], terms: ["warburg-effect", "myeloid-derived-suppressor-cells", "tumor-associated-macrophages", "cold-vs-hot"], pathways: ["cancer-metabolism", "glutamine-metabolism", "tumor-microenvironment", "hif-vhl", "myeloid-suppression-axis"], bottlenecks: ["b-tme-immunosuppression"],
    links: [{ label: "Chang et al., Metabolic competition in the tumor microenvironment is a driver of cancer progression (Cell 2015)", url: "https://doi.org/10.1016/j.cell.2015.08.016" }],
  }),

  // ------------------------------------------------------------------ 6. Escaping the immune system
  p({
    id: "t-cell-exhaustion", name: "T-cell exhaustion", wikipedia: W("T_cell_exhaustion"),
    tldr: "Persistent stimulation can change a T cell's response programme. Exhausted populations contain subsets with different remaining functions and responses to checkpoint blockade.",
    summary: "T-cell exhaustion is a distinct programme associated with persistent stimulation, multiple inhibitory receptors and altered transcription and chromatin. It is distinct from anergy and ordinary memory. Mouse experiments identified TOX as a central regulator. In chronic-infection and tumour models, progenitor exhausted populations retained response capacity and supplied descendants with different functions; terminally exhausted cells responded differently to anti-PD-1. A related melanoma association does not establish a universal treatment-selection test. PD-L1 blockade in mice re-engaged effector transcription with limited chromatin remodelling, and continued high antigen could lead to renewed exhaustion. Human skin-cancer studies also supported clonal replacement by clonotypes not previously detected in the sampled tumour. One marker, subset count or laboratory rescue does not establish tumour specificity, safe killing or individual clinical benefit.",
    analogy: "A response can change after repeated demands. The analogy stops at the biological programme: exhausted populations are heterogeneous, and remaining functions need measurement rather than a judgement that cells are broken.",
    nodes: [
      { id: "chronic", label: "Chronic antigen, no help", x: 12, y: 15 }, { id: "tcf1", label: "TCF1+ progenitor (stem-like)", x: 40, y: 15 }, { id: "trans", label: "Transitory effector", x: 68, y: 15 },
      { id: "term", label: "Terminally exhausted", x: 90, y: 40 }, { id: "tox", label: "TOX, NR4A, NFAT", x: 40, y: 45 }, { id: "epi", label: "DNMT3A epigenetic scar", x: 68, y: 45 },
      { id: "brakes", label: "PD-1, LAG-3, TIM-3, TIGIT", x: 12, y: 50, targetId: "pd1" }, { id: "kill", label: "Cytokines, killing", x: 40, y: 82 }, { id: "block", label: "Checkpoint blockade", x: 12, y: 82, targetId: "lag3" }, { id: "cart", label: "CAR-T exhaustion", x: 78, y: 82, targetId: "cd19" },
    ],
    edges: [
      { from: "chronic", to: "tcf1" }, { from: "tcf1", to: "trans" }, { from: "trans", to: "term" }, { from: "chronic", to: "tox" }, { from: "tox", to: "brakes" }, { from: "tox", to: "epi" }, { from: "epi", to: "term" },
      { from: "brakes", to: "kill", type: "inhibits" }, { from: "trans", to: "kill" }, { from: "block", to: "brakes", type: "inhibits" }, { from: "block", to: "tcf1" }, { from: "chronic", to: "cart" },
    ],
    interventions: ["Anti-PD-1/PD-L1; combinations with anti-LAG-3 (relatlimab-nivolumab, fianlimab) and anti-TIGIT (tiragolumab, mixed results)", "Earlier use (neoadjuvant) when the TCF1+ reservoir is larger; IL-2 variants and IL-15 superagonists to expand progenitors", "CAR-T engineering: c-Jun overexpression, TET2/DNMT3A editing, transient rest, PD-1 knockout", "Epigenetic drugs to reverse scarring (preclinical)"],
    targets: ["pd1", "pdl1", "lag3", "tigit", "tim3", "ctla4", "cd19"], drugs: ["pembrolizumab", "nivolumab", "relatlimab-nivolumab", "fianlimab", "tiragolumab", "nogapendekin-alfa", "bempegaldesleukin"], technologies: ["checkpoint-inhibitor", "car-t", "til-therapy", "cytokine-therapy", "armored-car"], terms: ["tils", "cold-vs-hot", "irae", "avoiding-immune-destruction"], pathways: ["pd1-checkpoint", "antigen-presentation-immunoediting", "cancer-immunity-cycle", "epigenetic-reprogramming"], bottlenecks: ["b-immunotherapy-response"],
    links: [{"label":"Wherry & Kurachi, Molecular and cellular insights into T cell exhaustion (Nat Rev Immunol 2015)","url":"https://doi.org/10.1038/nri3862"},{"label":"PubMed 17950003","url":"https://pubmed.ncbi.nlm.nih.gov/17950003/"},{"label":"PubMed 31207603","url":"https://pubmed.ncbi.nlm.nih.gov/31207603/"},{"label":"PubMed 26205583","url":"https://pubmed.ncbi.nlm.nih.gov/26205583/"},{"label":"PubMed 27501248","url":"https://pubmed.ncbi.nlm.nih.gov/27501248/"},{"label":"PubMed 27533016","url":"https://pubmed.ncbi.nlm.nih.gov/27533016/"},{"label":"PubMed 30778252","url":"https://pubmed.ncbi.nlm.nih.gov/30778252/"},{"label":"PubMed 27789795","url":"https://pubmed.ncbi.nlm.nih.gov/27789795/"},{"label":"PubMed 29942092","url":"https://pubmed.ncbi.nlm.nih.gov/29942092/"},{"label":"PubMed 31359002","url":"https://pubmed.ncbi.nlm.nih.gov/31359002/"},
  {"label":"Miller et al.: author correction to foundation acknowledgement (2019)","url":"https://pubmed.ncbi.nlm.nih.gov/31582823/"},
],

    asOf: "2026-11-12",
    notes: ["Exhaustion is a distinct differentiation programme associated with persistent stimulation, altered function, multiple inhibitory receptors and transcriptional and chromatin changes. Mouse TOX experiments identified a central regulator of this programme. It is neither brief tiredness, every weak assay, anergy nor a DNA sequence change. Deficits can be graded and subsets retain different capacities.","In chronic LCMV infection in mice, TCF1-associated progenitor exhausted cells self-renewed and supplied the proliferative burst after PD-L1 blockade. In Miller's mouse tumour experiments, progenitor cells persisted and expanded after PD-1 blockade, whereas terminally exhausted cells had greater immediate cytotoxicity against tested tumour targets. Persistence, capacity to divide after restimulation and immediate killing are different functions. The human melanoma component associated progenitor-like features with outcomes; it was not a universal predictive test, and terminally exhausted does not mean inert.","In mouse experiments, PD-L1 blockade re-engaged effector transcription with little remodelling of the exhausted chromatin landscape. Reinvigorated cells could become exhausted again under continued high antigen and did not simply become ordinary durable memory. Laboratory reinvigoration is distinct from universal reversal or patient benefit.","PD-1 can accompany activation as well as exhaustion. TCF1 also occurs in naive and memory contexts. TIM-3/CD39, TOX and residency-associated CD103/CD39 require population and assay context; no single marker assigns state or specificity. Combine compatible response history, protein or RNA programmes, receptor identities and controlled function. TOX may be measured by intracellular staining or RNA; this is not a routine universal pathology classifier.","Paired human basal-cell and squamous-cell skin-cancer biopsies after anti-PD-1 showed expanded clonotypes not previously observed in the same tumour. Clonal replacement and reinvigoration of resident cells are different, potentially overlapping response explanations. Non-detection before therapy is not proof of whole-body absence. Breast-cancer single-cell work identified checkpoint/effector-rich tissue-resident CD8 populations; its early TNBC survival signature was an association, not a general treatment predictor."]
  }),
  p({
    id: "immune-desert-exclusion", name: "Cold tumours: immune deserts and exclusion", wikipedia: W("Tumor-infiltrating_lymphocytes"),
    tldr: "Sparse T cells and T cells gathered outside malignant regions are different immune patterns. An inflamed tumour can still restrain its T cells, and a pattern alone does not select a treatment.",
    summary: "Immune deserts have few relevant T cells in the sampled regions; immune exclusion describes cells nearby with limited entry into malignant nests. Deficient antigen availability or priming, recruitment signals, vascular interactions and stromal access can produce different distributions. Tumour WNT/beta-catenin-associated loss of dendritic-cell recruitment is one model-supported route to absent infiltration. An inflamed pattern can coexist with induced inhibitory signals, regulatory cells and exhausted programmes.\n\nThese are hypotheses about distinct dependencies. The same cancer can contain different regions or sites and can change with treatment. Matrix or cell abundance, a mixed RNA signature and spatial counts are different measurements. A proposed converter or HLA-independent recognition system still needs target, access, function, safety and comparative outcome evidence. There is no universal conversion treatment or hot/cold cutoff implied by the framework.",
    analogy: "Three maps of the same neighbourhood can show many lymphocytes among cancer cells, cells concentrated outside, or few cells in either region. The map describes location; it does not identify the cause or select a treatment. Different mechanisms can produce a similar pattern.",
    nodes: [
  {
    "id": "ag",
    "label": "Antigen, presentation, priming?",
    "x": 12,
    "y": 12
  },
  {
    "id": "wnt",
    "label": "β-catenin: recruitment model",
    "x": 12,
    "y": 40,
    "targetId": "ctnnb1"
  },
  {
    "id": "chemo",
    "label": "Recruitment chemokines?",
    "x": 12,
    "y": 68
  },
  {
    "id": "desert",
    "label": "Immune desert",
    "x": 42,
    "y": 40
  },
  {
    "id": "tgf",
    "label": "TGF-β CAFs, collagen",
    "x": 72,
    "y": 12,
    "targetId": "fap"
  },
  {
    "id": "vess",
    "label": "Abnormal vessels (VEGF)",
    "x": 72,
    "y": 40,
    "targetId": "vegf"
  },
  {
    "id": "excl",
    "label": "Immune exclusion",
    "x": 92,
    "y": 60
  },
  {
    "id": "hot",
    "label": "Inflamed; function still matters",
    "x": 42,
    "y": 90,
    "targetId": "pd1"
  },
  {
    "id": "conv",
    "label": "Interventions under study",
    "x": 12,
    "y": 92
  },
  {
    "id": "myeloid",
    "label": "Myeloid barrier",
    "x": 72,
    "y": 68,
    "targetId": "csf1r"
  }
],
    edges: [
      { from: "ag", to: "desert" }, { from: "wnt", to: "desert" }, { from: "chemo", to: "desert" }, { from: "tgf", to: "excl" }, { from: "vess", to: "excl" }, { from: "myeloid", to: "excl" },
      { from: "desert", to: "hot", type: "inhibits" }, { from: "excl", to: "hot", type: "inhibits" }, { from: "conv", to: "hot" }, { from: "conv", to: "desert", type: "inhibits" },
    ],
    interventions: [
  "Antigen-release, vaccination and local immune-stimulation approaches investigate different missing inputs. Local inflammation or an interferon signal does not by itself establish distant cancer control.",
  "Vascular and stromal approaches investigate access in defined tumour systems. A location pattern alone does not show which barrier is causal or which intervention will change outcomes. In Feig’s pancreatic mouse model, CXCR4 blockade improved T-cell access; this is not established human benefit.",
  "Chemokine or dendritic-cell recruitment can be tested with spatial measurements and controlled perturbations. A response signature or altered cell count alone does not establish restoration of the entire immune response.",
  "Engagers, engineered cells and vaccines still require suitable targets, access and function. Their recognition mechanisms differ, and none can be assumed to bypass every cause of an immune-poor pattern."
],
    targets: [
  "pd1",
  "pdl1",
  "vegf",
  "fap",
  "ezh2",
  "csf1r",
  "cxcr4",
  "ctnnb1"
], drugs: ["talimogene-laherparepvec", "vusolimogene-oderparepvec", "ivonescimab", "adu-s100", "tazemetostat"], technologies: ["checkpoint-inhibitor", "oncolytic-virus", "in-situ-vaccination", "sting-agonist", "sbrt", "epigenetic-drugs", "t-cell-engager", "single-cell-spatial", "il12-electroporation"], terms: ["cold-vs-hot", "immune-exclusion", "tils", "tmb", "cps", "desmoplasia"], pathways: ["tgf-beta", "wnt", "cgas-sting", "tumor-microenvironment", "cancer-immunity-cycle", "myeloid-suppression-axis"], bottlenecks: ["b-immunotherapy-response", "b-tme-immunosuppression"],
    links: [
  {
    "label": "Chen & Mellman, Elements of cancer immunity and the cancer-immune set point (Nature 2017)",
    "url": "https://doi.org/10.1038/nature21349"
  },
  {
    "label": "Spranger, Bao & Gajewski, Melanoma-intrinsic β-catenin signalling prevents anti-tumour immunity (Nature 2015)",
    "url": "https://doi.org/10.1038/nature14404"
  },
  {
    "label": "Elements of cancer immunity and the cancer-immune set point.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28102259/"
  },
  {
    "label": "Melanoma-intrinsic β-catenin signalling prevents anti-tumour immunity.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25970248/"
  },
  {
    "label": "Up-regulation of PD-L1, IDO, and T(regs) in the melanoma tumor microenvironment is driven by CD8(+) T cells.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23986400/"
  },
  {
    "label": "Spatial immunophenotypes predict response to anti-PD1 treatment and capture distinct paths of T cell evasion in triple negative breast cancer.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/34580291/"
  },
  {
    "label": "Intratumoral Activity of the CXCR3 Chemokine System Is Required for the Efficacy of Anti-PD-1 Therapy.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31097342/"
  },
  {
    "label": "Targeting CXCL12 from FAP-expressing carcinoma-associated fibroblasts synergizes with anti-PD-L1 immunotherapy in pancreatic cancer.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/24277834/"
  }
],

"asOf": "2026-11-11",
"related": [
  "cold-vs-hot",
  "immune-exclusion",
  "adaptive-immune-resistance",
  "t-cell-exhaustion"
]
}),
  p({
    id: "myeloid-suppression-axis", name: "Myeloid suppression: TAMs, MDSCs & don't-eat-me signals", wikipedia: W("Tumor-associated_macrophage"),
    tldr: "Tumours recruit the body's clean-up cells (macrophages and immature myeloid cells) and re-train them as bodyguards. They switch off T cells, build vessels, and, when a therapeutic antibody flags a cancer cell for eating, are told 'don't eat me' by CD47 on its surface.",
    summary: "Tumour and stromal CSF1, CCL2, CXCL1/2/8, VEGF, G-CSF and IL-6 recruit monocytes and neutrophils and expand myeloid-derived suppressor cells (PMN- and M-MDSC) from the bone marrow. In the tumour, hypoxia, lactate, IL-4/IL-13 and IL-10 polarise macrophages toward an immunosuppressive TAM state (TREM2+, SPP1+, MRC1+) that secretes IL-10, TGF-β, arginase, PGE2, expresses PD-L1, SIRPα and VISTA, and promotes angiogenesis and metastasis (TMEM doorways). MDSCs suppress via arginase, iNOS, ROS and PD-L1. CD47 on tumour cells binds SIRPα to block phagocytosis; magrolimab (anti-CD47) failed in AML/MDS after promising phase 1 data, but CD47 remains pursued with bispecifics. CSF1R inhibition (pexidartinib, vimseltinib in tenosynovial giant cell tumour) depletes TAMs but compensatory MDSC influx blunts it in cancer; CD40 agonists and TLR agonists reprogram; CXCR2 and CCR2 blockade limit recruitment; STAT3 and PI3Kγ inhibitors reprogram. Trained immunity (BCG) and engineered CAR-macrophages try to conscript the same cells for the attack.",
    analogy: "A landlord who hires the neighbourhood's own bouncers, pays them in sugar and lactate, and hangs a sign on every door that reads 'don't touch, friend' (CD47). The police (T cells) are stopped at the door by the bouncers, and the cleaners (macrophages) read the sign and leave.",
    nodes: [
      { id: "rec", label: "CSF1, CCL2, G-CSF, VEGF", x: 12, y: 15, targetId: "vegf" }, { id: "mono", label: "Monocytes, neutrophils", x: 40, y: 15 }, { id: "mdsc", label: "MDSCs (arginase, ROS)", x: 40, y: 45 },
      { id: "tam", label: "TAMs (CSF1R, TREM2)", x: 68, y: 15, targetId: "csf1r" }, { id: "sup", label: "IL-10, TGF-β, PD-L1", x: 68, y: 45, targetId: "pdl1" }, { id: "tcell", label: "T cells suppressed", x: 92, y: 62 },
      { id: "cd47", label: "CD47 → SIRPα 'don't eat'", x: 40, y: 78, targetId: "cd47" }, { id: "phag", label: "Phagocytosis (ADCP)", x: 68, y: 82 }, { id: "ang", label: "Angiogenesis, metastasis", x: 92, y: 20 }, { id: "cd40", label: "CD40 agonists, TLRs reprogram", x: 12, y: 78 },
    ],
    edges: [
      { from: "rec", to: "mono" }, { from: "mono", to: "mdsc" }, { from: "mono", to: "tam" }, { from: "tam", to: "sup" }, { from: "mdsc", to: "sup" }, { from: "sup", to: "tcell", type: "inhibits" }, { from: "tam", to: "ang" },
      { from: "cd47", to: "phag", type: "inhibits" }, { from: "tam", to: "phag" }, { from: "cd40", to: "sup", type: "inhibits" }, { from: "cd40", to: "phag" },
    ],
    interventions: ["CSF1R inhibitors pexidartinib and vimseltinib (approved in tenosynovial giant cell tumour; disappointing in cancer)", "CD47/SIRPα: magrolimab failed in AML/MDS; next-generation bispecifics and SIRPα-Fc in trials", "CD40 agonists, TLR7/9 agonists, CXCR2/CCR2 blockade, PI3Kγ inhibitors as reprogrammers", "CAR-macrophages, trained innate immunity (BCG) and antibody engineering for ADCP"],
    targets: ["csf1r", "cd47", "pdl1", "vegf", "vista", "cxcr4"], drugs: ["pexidartinib", "vimseltinib", "magrolimab", "bcg-intravesical"], technologies: ["car-nk-macrophage", "trained-innate-immunity", "bcg-and-intravesical-therapy", "checkpoint-inhibitor", "monoclonal-antibody"], terms: ["tumor-associated-macrophages", "myeloid-derived-suppressor-cells", "fc-effector", "immune-exclusion"], pathways: ["tumor-microenvironment", "nutrient-competition-tme", "angiogenic-switch", "myc", "jak-stat"], bottlenecks: ["b-tme-immunosuppression"],
    links: [{ label: "DeNardo & Ruffell, Macrophages as regulators of tumour immunity and immunotherapy (Nat Rev Immunol 2019)", url: "https://doi.org/10.1038/s41577-019-0127-6" }],
  }),
  p({
    id: "complement-in-cancer", name: "Complement in cancer", wikipedia: W("Complement_system"),
    tldr: "Complement proteins can coat targets, recruit inflammation and sometimes damage membranes. Complement deposition and completed target killing are different findings.",
    summary: "Three routes converge on C3 convertase: classical (C1q binding IgG1/IgG3 Fc clusters, the basis of complement-dependent cytotoxicity by rituximab, obinutuzumab less so, daratumumab), lectin, and alternative (spontaneous C3 tick-over). C3b opsonises for phagocytosis via CR3; C5 convertase releases C5a and assembles the membrane attack complex (C5b-9). Tumours over-express membrane regulators CD46, CD55 (DAF) and CD59 (protectin) and secrete factor H, limiting CDC; CD20 shaving and antigen loss add to rituximab resistance. Conversely, intratumoural complement activation is often pro-tumour: C5a-C5aR1 and C3a-C3aR recruit and activate MDSCs and neutrophils, suppress CD8 T cells, and promote angiogenesis; C1q from macrophages supports invasion. Blocking C5aR1 (avdoralimab) with anti-PD-1 was tested; complement is also a mediator of infusion reactions and of CAR-T-associated inflammation. Fc engineering (afucosylation for ADCC versus hexamerisation for CDC) tunes which effector dominates. Complement deposition on a coated cell is an earlier step than a membrane pore, and a pore is a different observation from measured lysis, so deposition alone does not demonstrate completed CDC; heat-inactivated or depleted complement tests complement dependence.",
    analogy: "A demolition crew that follows the flags an antibody plants on a building: they blow holes in the walls (membrane attack complex) and call in the bulldozers (phagocytes). Tumours paint over the flags (CD55, CD59), and the noise of the demolition attracts the wrong kind of crowd (C5a-recruited suppressor cells).",
    nodes: [
      { id: "ab", label: "IgG1 antibody (rituximab)", x: 12, y: 15, targetId: "cd20" }, { id: "c1q", label: "C1q classical route", x: 40, y: 15 }, { id: "alt", label: "Alternative / lectin", x: 40, y: 45 },
      { id: "c3", label: "C3 convertase → C3b", x: 68, y: 30 }, { id: "c5", label: "C5 → C5a + MAC (C5b-9)", x: 92, y: 45 }, { id: "reg", label: "CD46, CD55, CD59 shields", x: 68, y: 65 },
      { id: "lysis", label: "CDC lysis, opsonisation", x: 68, y: 92 }, { id: "c5a", label: "C5a → MDSC, neutrophils", x: 40, y: 78, targetId: "csf1r" }, { id: "tcell", label: "CD8 T cells suppressed", x: 12, y: 78, targetId: "pd1" }, { id: "adcc", label: "ADCC (NK, CD16)", x: 12, y: 45 },
    ],
    edges: [
      { from: "ab", to: "c1q" }, { from: "ab", to: "adcc" }, { from: "c1q", to: "c3" }, { from: "alt", to: "c3" }, { from: "c3", to: "c5" }, { from: "reg", to: "c3", type: "inhibits" }, { from: "reg", to: "c5", type: "inhibits" },
      { from: "c5", to: "lysis" }, { from: "c5", to: "c5a" }, { from: "c5a", to: "tcell", type: "inhibits" },
    ],
    interventions: ["CD20 and CD38 antibodies (rituximab, obinutuzumab, daratumumab, isatuximab) kill partly through complement; Fc engineering tunes CDC versus ADCC", "Blocking complement regulators (CD55/CD59) to restore CDC (preclinical)", "C5aR1 antagonists with checkpoint inhibitors to remove myeloid recruitment (early trials)", "Complement inhibition to manage infusion reactions and CAR-T inflammation"],
    targets: ["cd20", "cd38", "cd19", "pd1", "csf1r"], drugs: ["rituximab", "obinutuzumab", "daratumumab", "isatuximab"], technologies: ["monoclonal-antibody", "checkpoint-inhibitor"], terms: ["adcc", "fc-effector", "crs", "myeloid-derived-suppressor-cells"], pathways: ["myeloid-suppression-axis", "inflammation-nfkb", "nk-cell-recognition", "extrinsic-apoptosis-death-receptors"], cancers: ["dlbcl", "follicular-lymphoma", "cll", "multiple-myeloma"],
    links: [
  {
    "label": "Roumenina et al., Context-dependent roles of complement in cancer (Nat Rev Cancer 2019)",
    "url": "https://doi.org/10.1038/s41568-019-0210-0"
  },
  {
    "label": "Complement is activated by IgG hexamers assembled at the cell surface.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/24626930/"
  }
],

"asOf": "2026-11-09",
"related": [
  "adcc-adcp-cdc"
]
}),
  p({
    id: "nk-cell-recognition", name: "NK-cell recognition: missing self & stress ligands", wikipedia: W("Natural_killer_cell"),
    tldr: "Natural killer cells integrate several receptor inputs. Loss of an inhibitory self signal can matter, but target ligands, prior education and the cell’s current state also affect whether it kills.",
    summary: "Natural killer (NK) receptors are encoded in the germ line rather than assembled by the T-cell receptor’s somatic rearrangement process. They integrate complementary activating inputs with inhibitory signals; this is more complex than adding fixed on/off switches. Inhibitory motifs can recruit SHP phosphatases and suppress early activation, while several activating receptors signal through adaptors. Repertoire, receptor variants, prior education, cytokines and the target context matter. Some receptors also occur on T cells, and HLA-related recognition can depend on the bound peptide.\n\nInhibitory KIR2DL1 and KIR2DL2/3 recognize subsets of HLA-C; KIR3DL1 recognizes the Bw4 epitope on class-I molecules. Activating KIRs also exist, with variant-dependent ligands: curated examples include KIR2DS1/HLA-C and KIR3DS1/peptide-free HLA-F. CD94/NKG2A is inhibitory and reads peptide-loaded HLA-E; CD94/NKG2C is activating and bound HLA-E with lower affinity than NKG2A in the recombinant-protein study. CMV seropositivity was associated with NKG2C-rich repertoires in healthy donors. These are defined receptor-ligand findings, not interchangeable switches.",
    analogy: "An NK cell integrates several permission and alarm signals, with responsiveness also shaped by its prior interactions. Removing an inhibitory signal can matter without being enough to trigger killing. Loss of a familiar class-I signal therefore raises a question about NK recognition rather than guaranteeing elimination.",
    nodes: [
  {
    "id": "mhc",
    "label": "MHC-I → KIR (inhibit)",
    "x": 12,
    "y": 15
  },
  {
    "id": "hlae",
    "label": "HLA-E → NKG2A (inhibit)",
    "x": 12,
    "y": 45
  },
  {
    "id": "stress",
    "label": "MICA/B, ULBP → NKG2D",
    "x": 12,
    "y": 75
  },
  {
    "id": "nk",
    "label": "NK cell decision",
    "x": 45,
    "y": 45
  },
  {
    "id": "cd16",
    "label": "CD16 ← IgG1 antibody (ADCC)",
    "x": 45,
    "y": 12,
    "targetId": "her2"
  },
  {
    "id": "tigit",
    "label": "TIGIT vs DNAM-1 (CD155)",
    "x": 45,
    "y": 80,
    "targetId": "tigit"
  },
  {
    "id": "kill",
    "label": "Killing and cytokine outputs",
    "x": 78,
    "y": 30
  },
  {
    "id": "shed",
    "label": "MICA shedding, TGF-β",
    "x": 78,
    "y": 65
  },
  {
    "id": "carnk",
    "label": "CAR-NK, IL-15, NK engagers",
    "x": 92,
    "y": 90
  }
],
    edges: [
      { from: "mhc", to: "nk", type: "inhibits" }, { from: "hlae", to: "nk", type: "inhibits" }, { from: "stress", to: "nk" }, { from: "cd16", to: "nk" }, { from: "tigit", to: "nk", type: "inhibits" },
      { from: "nk", to: "kill" }, { from: "shed", to: "stress", type: "inhibits" }, { from: "shed", to: "nk", type: "inhibits" }, { from: "carnk", to: "nk" },
    ],
    interventions: [
  "Antibodies bound to a suitable target can engage CD16 and support antibody-dependent killing. Fc design matters: the MARGENZA label describes margetuximab as Fc-engineered and reports greater activating-receptor binding and NK activation in vitro; that is not a demonstration of benefit in every tumour.",
  "Cytokine stimulation, engineered NK cells and NK-cell engagers investigate different ways to alter responsiveness or recognition. Their target, assay, disease and evidence stage must remain attached.",
  "Blocking an inhibitory receptor tests a specific restraint. In INTERLINK-1, adding monalizumab to cetuximab did not improve overall survival in the studied recurrent or metastatic head-and-neck cancer population.",
  "Class-I loss can reduce inhibitory inputs, but NK-based approaches still depend on activating inputs, access and functional competence. T-cell escape does not automatically create NK sensitivity."
],
    targets: ["tigit", "her2", "egfr", "cd20", "cd38", "pd1"], drugs: ["trastuzumab", "cetuximab", "rituximab", "obinutuzumab", "margetuximab", "daratumumab", "nogapendekin-alfa", "tiragolumab"], technologies: ["car-nk-macrophage", "monoclonal-antibody", "cytokine-therapy", "allogeneic-cell-therapy", "bispecific-antibody"], terms: ["adcc", "fc-effector", "bcg-unresponsive", "avoiding-immune-destruction"], pathways: ["antigen-presentation-immunoediting", "extrinsic-apoptosis-death-receptors", "tgf-beta", "intravasation-ctc-survival", "tumor-dormancy"],
    links: [
  {
    "label": "Morvan & Lanier, NK cells and cancer: you can teach innate cells new tricks (Nat Rev Cancer 2016)",
    "url": "https://doi.org/10.1038/nrc.2015.5"
  },
  {
    "label": "Controlling natural killer cell responses: integration of signals for activation and inhibition.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23516982/"
  },
  {
    "label": "Up on the tightrope: natural killer cell activation and inhibition.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/18425106/"
  },
  {
    "label": "MHC class I molecules and KIRs in human history, health and survival.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/15719024/"
  },
  {
    "label": "HLA-E binds to natural killer cell receptors CD94/NKG2A, B and C.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/9486650/"
  },
  {
    "label": "Kinetics and peptide dependency of the binding of the inhibitory NK receptor CD94/NKG2-A and the activating receptor CD94/NKG2-C to HLA-E.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/10428963/"
  },
  {
    "label": "Imprint of human cytomegalovirus infection on the NK cell receptor repertoire.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/15304389/"
  },
  {
    "label": "Activation of NK cells and T cells by NKG2D, a receptor for stress-inducible MICA.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/10426993/"
  },
  {
    "label": "ULBPs, novel MHC class I-related molecules, bind to CMV glycoprotein UL16 and stimulate NK cytotoxicity through the NKG2D receptor.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/11239445/"
  },
  {
    "label": "The interaction of TIGIT with PVR and PVRL2 inhibits human NK cell cytotoxicity.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/19815499/"
  },
  {
    "label": "Education of hyporesponsive NK cells by cytokines.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/19701893/"
  },
  {
    "label": "Tumour-derived soluble MIC ligands impair expression of NKG2D and T-cell activation.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/12384702/"
  },
  {
    "label": "Anti-NKG2A mAb Is a Checkpoint Inhibitor that Promotes Anti-tumor Immunity by Unleashing Both T and NK Cells.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/30503213/"
  },
  {
    "label": "INTERLINK-1: A Phase III, Randomized, Placebo-Controlled Study of Monalizumab plus Cetuximab in Recurrent/Metastatic Head and Neck Squamous Cell Carcinoma.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/40300079/"
  },
  {
    "label": "UniProt reviewed KIR2DL2 function",
    "url": "https://www.uniprot.org/uniprotkb/P43627/entry"
  },
  {
    "label": "UniProt reviewed KIR2DL3 function",
    "url": "https://www.uniprot.org/uniprotkb/P43628/entry"
  },
  {
    "label": "UniProt reviewed KIR3DS1 function",
    "url": "https://www.uniprot.org/uniprotkb/Q14943/entry"
  },
  {
    "label": "UniProt reviewed KIR2DS1 function",
    "url": "https://www.uniprot.org/uniprotkb/Q14954/entry"
  },
  {
    "label": "UniProt reviewed KIR2DL1 function",
    "url": "https://www.uniprot.org/uniprotkb/P43626/entry"
  },
  {
    "label": "UniProt reviewed KIR3DL1 function",
    "url": "https://www.uniprot.org/uniprotkb/P43629/entry"
  },
  {
    "label": "IPD-KIR: gene content, haplotypes and proteins",
    "url": "https://www.ebi.ac.uk/ipd/kir/about/"
  },
  {
    "label": "MARGENZA label, description and mechanism of action",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6a6d50c7-06ea-479c-83cc-f197a9e428c9"
  }
],

"asOf": "2026-11-11",
"notes": [
  "NKG2D is activating and recognizes stress-related MICA, MICB and ULBP ligands; it also occurs on CD8 and gamma-delta T cells. NKp30, NKp44 and NKp46 are natural cytotoxicity receptors with adaptor-dependent signalling. Activating DNAM-1/CD226 recognizes CD155 and CD112; inhibitory TIGIT recognizes this ligand system as well. CD16 recognizes antibody Fc and can supply antibody-dependent cellular cytotoxicity. Fc design changes that interaction. Receptor identity is different from the cancer antigen bound by an antibody, and Long’s review describes conditions in which CD16 can activate resting NK cells without the complementary inputs required by several other tested receptors. Shared ligand recognition does not by itself measure relative affinity, competitive occupancy or which receptor input dominates in a particular cell and target pair.",
  "Education tunes responsiveness. NK cells with matched self-HLA inhibitory interactions can be more responsive to later activating stimuli, while unmatched cells can be hyporesponsive. In Juelke’s human-cell experiments, cytokine-stimulated hyporesponsive cells acquired competence when they acquired KIR in the presence of its cognate MHC. This is not a fixed panel present identically on every NK cell. Removing one inhibitory HLA interaction is not necessarily removal of all restraints or a sufficient activation signal.",
  "Groh found reduced NKG2D on tumour-infiltrating and matched blood T cells in people with cancer, associated with circulating soluble tumour-derived MICA and impaired tumour-antigen-specific T-cell responsiveness. That human observation should not silently become a measurement of every NK cell. André’s NKG2A-blockade work supported NK and CD8 activity in laboratory and mouse systems and reported an early combination-trial signal. Those observations did not establish comparative clinical efficacy.",
  "INTERLINK-1 tested monalizumab plus cetuximab against placebo plus cetuximab after checkpoint therapy and platinum progression in recurrent/metastatic head-and-neck cancer. The HPV-unrelated primary analysis set contained 216 participants, randomized 2:1. Median overall survival was 8.8 versus 8.6 months, HR 1.00 (95% CI 0.66 to 1.54); the trial met its prespecified futility criterion. This negative comparison does not support a general claim of clinical success for NKG2A blockade.",
  "Flow cytometry measures receptor proteins on defined viable populations; KIR/HLA genotyping identifies possible pairs; tissue protein or RNA tests ask about ligands; a controlled NK-target assay measures killing. A fictional target lacking all measured HLA restraints but lacking measured activating ligands need not be killed. An antibody engaging CD16 supplies a further hypothesis to test. Receptor expression, degranulation, target death, tumour entry and patient benefit remain separate measurements.",
  "An activating-KIR label does not imply that the gene is present in every person or that its ligand is interchangeable with another receptor’s. IPD-KIR describes haplotypes with different numbers and combinations of KIR genes, including activating genes. Genotyping establishes gene presence rather than protein expression on every NK cell. Long’s 2013 review noted unidentified ligands for some activation receptors; the named receptor-variant assignments above are individual examples, not a complete ligand map."
],
"related": [
  "nk-cell",
  "b2m",
  "hla",
  "klrc1",
  "monalizumab",
  "perioperative-immune-window"
]
}),

  // ------------------------------------------------------------------ 7. Invasion and metastasis
  p({
    id: "invasion-ecm-degradation", name: "Invasion: proteases, adhesion & the invasive front", wikipedia: W("Invadopodia"),
    tldr: "To invade, a cancer cell must grip the scaffolding around it, dissolve a path with enzymes, and pull itself forward, alone or in a chain led by a scout cell. Fibroblasts often cut the trail first. The enzyme blockers of the 1990s failed; today's targets are the grip (integrins, FAK) and the trail-makers.",
    summary: "Invasion cycles through protrusion (RAC1-driven lamellipodia, actin-rich invadopodia with cortactin and TKS5), adhesion (integrins α5β1, αvβ3, αvβ6 to fibronectin/collagen, signalling via FAK-SRC and ILK), matrix degradation (membrane-anchored MT1-MMP/MMP14 activating MMP2, secreted MMP9, uPA-uPAR-plasmin, cathepsins), and RHO-ROCK-myosin contraction. Modes: mesenchymal (protease-dependent, elongated), amoeboid (protease-independent squeezing through pores, RHO/ROCK-high), and collective invasion led by leader cells (keratin-14+ in breast cancer) or by CAFs that generate tracks and pull via N-cadherin/E-cadherin heterotypic junctions. Perineural and lymphovascular invasion are histological markers of the process; stiff, aligned collagen (TACS-3) promotes it. Broad-spectrum MMP inhibitors (marimastat, prinomastat) failed in phase 3 with musculoskeletal toxicity and because MMPs also produce anti-angiogenic fragments. Current approaches: FAK inhibitors (defactinib, approved with avutometinib in KRAS-mutant low-grade serous ovarian cancer; also reduce stromal density), integrin antagonists (cilengitide failed in GBM), uPAR-targeted CAR-T for senescent cells, and RHO/ROCK inhibitors.",
    analogy: "A climber in a collapsing tunnel: grip the wall (integrins), chip away the rock ahead (MMPs), and haul forward (myosin). Some climbers squeeze through cracks without chipping (amoeboid). Often a guide (a fibroblast) has already carved the passage.",
    nodes: [
      { id: "cue", label: "TGF-β, HGF, hypoxia, stiffness", x: 12, y: 12 }, { id: "emt", label: "EMT programme (ZEB1, SNAIL)", x: 40, y: 12 }, { id: "int", label: "Integrins → FAK / SRC", x: 68, y: 12 },
      { id: "inv", label: "Invadopodia, MT1-MMP", x: 68, y: 42 }, { id: "mmp", label: "MMP2/9, uPA → ECM breach", x: 92, y: 55 }, { id: "rho", label: "RHO-ROCK contraction", x: 40, y: 42 },
      { id: "amoe", label: "Amoeboid squeezing", x: 12, y: 42 }, { id: "coll", label: "Collective invasion (leaders)", x: 40, y: 75 }, { id: "caf", label: "CAF tracks", x: 12, y: 75, targetId: "fap" }, { id: "front", label: "Invasive front → vessels", x: 72, y: 82 },
    ],
    edges: [
      { from: "cue", to: "emt" }, { from: "emt", to: "int" }, { from: "int", to: "inv" }, { from: "inv", to: "mmp" }, { from: "cue", to: "rho" }, { from: "rho", to: "amoe" },
      { from: "emt", to: "coll" }, { from: "caf", to: "coll" }, { from: "mmp", to: "front" }, { from: "coll", to: "front" }, { from: "amoe", to: "front" },
    ],
    interventions: ["FAK inhibitor defactinib with avutometinib (approved 2025, KRAS-mutant low-grade serous ovarian cancer); FAK inhibition also softens stroma", "Broad MMP inhibitors and the integrin antagonist cilengitide failed in phase 3; lesson retained in the failure museum", "Surgery and radiotherapy margins are the practical answer to local invasion; perineural and lymphovascular invasion drive adjuvant decisions", "Anti-stromal strategies (FAP theranostics, Hedgehog paradox) reshape the tracks"],
    targets: ["fap", "kras", "met", "smoothened", "fak"], drugs: ["avutometinib-defactinib", "fap-2286"], technologies: ["fluorescence-guided-surgery", "robotic-surgery", "mechanobiology-therapy", "fapi-pet", "single-cell-spatial", "histopathology-ihc"], terms: ["desmoplasia", "cancer-associated-fibroblasts", "tnm-staging", "activating-invasion-metastasis"], pathways: ["emt", "basement-membrane-tissue-barriers", "tgf-beta", "hippo-yap", "caf-activation-desmoplasia", "metastatic-cascade"], cancers: ["low-grade-serous-ovarian-cancer", "pancreatic", "head-and-neck"],
    links: [{ label: "Friedl & Alexander, Cancer invasion and the microenvironment: plasticity and reciprocity (Cell 2011)", url: "https://doi.org/10.1016/j.cell.2011.11.016" }],
  }),
  p({
    id: "intravasation-ctc-survival", name: "Intravasation & circulating tumour cells", wikipedia: W("Circulating_tumor_cell"),
    tldr: "Getting into the bloodstream kills almost every cell that tries: cells are ripped from their neighbours, battered by flow, and hunted by NK cells. Fewer than one in a thousand survive. The ones that do travel in clusters, wear a cloak of platelets, or ride with neutrophils. Liquid biopsies catch what is left.",
    summary: "Intravasation happens at 'TMEM doorways' (a tumour cell, a perivascular TIE2+ macrophage and an endothelial cell in direct contact) where macrophage-derived VEGF-A transiently opens the vessel; leaky angiogenic vessels and lymphatics (VEGF-C) also admit cells. In the blood, detachment triggers anoikis (integrin loss → BIM/BMF → apoptosis), which metastatic cells resist via TrkB, PI3K, and mesenchymal states; shear stress and oxidative stress (antioxidants paradoxically aid metastasis) kill most; NK cells clear the rest. Survivors use platelet cloaking (P-selectin, tissue-factor-thrombin, platelet TGF-β shielding from NK and inducing EMT), neutrophil escorts and NETs, and travel as clusters held by plakoglobin and CD44, which are up to 50-fold more metastatic than singles and carry hypomethylated stemness genes. CTCs (EpCAM-based CellSearch; ≥5 per 7.5 mL prognostic in breast, prostate, colorectal) and ctDNA are the clinical windows; fragmentomics and methylation extend detection. Aspirin and anticoagulants reduce metastasis in models via the platelet arm; Na+/K+-ATPase inhibitors dissolve clusters preclinically.",
    analogy: "Leaving a fortress through the drains and swimming a river in flood while archers (NK cells) fire from the bank. Survivors go in rafts (clusters), under wet blankets (platelets), and with a friendly escort (neutrophils).",
    nodes: [
      { id: "tmem", label: "TMEM doorway (macrophage)", x: 12, y: 15, targetId: "csf1r" }, { id: "leak", label: "Leaky vessels (VEGF)", x: 40, y: 15, targetId: "vegf" }, { id: "intra", label: "Intravasation", x: 68, y: 15 },
      { id: "anoik", label: "Anoikis (detachment death)", x: 12, y: 48 }, { id: "shear", label: "Shear, oxidative stress", x: 40, y: 48 }, { id: "nk", label: "NK-cell clearance", x: 68, y: 48 },
      { id: "ctc", label: "Surviving CTCs / clusters", x: 92, y: 48 }, { id: "plat", label: "Platelet cloak, NETs", x: 92, y: 82 }, { id: "clust", label: "Clusters (plakoglobin, CD44)", x: 62, y: 82 }, { id: "lb", label: "Liquid biopsy detection", x: 30, y: 82 },
    ],
    edges: [
      { from: "tmem", to: "intra" }, { from: "leak", to: "intra" }, { from: "intra", to: "ctc" }, { from: "anoik", to: "ctc", type: "inhibits" }, { from: "shear", to: "ctc", type: "inhibits" }, { from: "nk", to: "ctc", type: "inhibits" },
      { from: "plat", to: "nk", type: "inhibits" }, { from: "clust", to: "anoik", type: "inhibits" }, { from: "plat", to: "ctc" }, { from: "clust", to: "ctc" }, { from: "ctc", to: "lb" },
    ],
    interventions: ["Liquid biopsy: CTC enumeration (CellSearch), ctDNA (Signatera, Guardant Reveal), fragmentomics for detection and MRD", "Aspirin and low-molecular-weight heparin target platelet cloaking; aspirin reduces recurrence in PIK3CA-mutant colorectal cancer (ALASCCA)", "Anti-VEGF and CSF1R inhibition close TMEM doorways in models", "Cluster-dissociating agents (digoxin analogues) and NK-boosting therapies are experimental"],
    targets: ["vegf", "csf1r", "epcam", "pik3ca"], drugs: ["signatera", "shield", "bevacizumab"], technologies: ["liquid-biopsy", "mrd-testing", "continuous-ctdna-monitoring", "fragmentomics", "aspirin-cancer-prevention", "cancer-associated-thrombosis"], terms: ["ctdna", "mrd", "vaf", "disseminated-tumor-cells", "activating-invasion-metastasis"], pathways: ["metastatic-cascade", "angiogenic-switch", "nk-cell-recognition", "emt", "pre-metastatic-niche"], bottlenecks: ["b-metastasis-biology", "b-dormancy-mrd"],
    links: [{ label: "Aceto et al., Circulating tumor cell clusters are oligoclonal precursors of breast cancer metastasis (Cell 2014)", url: "https://doi.org/10.1016/j.cell.2014.07.013" }, { label: "Massagué & Obenauf, Metastatic colonization by circulating tumour cells (Nature 2016)", url: "https://doi.org/10.1038/nature17038" }],
  }),
  p({
    id: "pre-metastatic-niche", name: "The pre-metastatic niche", wikipedia: W("Metastasis"),
    tldr: "Before a single cancer cell arrives, the primary tumour sends parcels ahead: tiny vesicles (exosomes) and hormones that recruit bone-marrow cells to a distant organ and remodel it into fertile soil. By the time the seed lands, the bed is already made.",
    summary: "Tumour-secreted factors (VEGF-A, PlGF, TNF, TGF-β, G-CSF, LOX) and exosomes prime distant sites: exosomal integrins address organs (α6β4/α6β1 to lung fibroblasts and epithelium, αvβ5 to liver Kupffer cells), exosomal MIF induces hepatic stellate cells to secrete fibronectin and TGF-β, and PDAC exosomes prepare liver niches; tumour-derived LOX crosslinks collagen; S100A8/A9 and SAA3 recruit VEGFR1+ haematopoietic progenitors, neutrophils and monocytes, which lay fibronectin, secrete MMP9, and increase vascular permeability. Hypoxia in the primary tumour amplifies the programme. The niche provides adhesion (fibronectin, periostin, tenascin C), survival signals, immune suppression (MDSCs, Treg), and later awakening cues (NETs, inflammation). Lymph nodes are similarly pre-conditioned (lymphangiogenesis via VEGF-C). Clinically the niche explains organ tropism and the benefit of adjuvant therapy; exosome profiling (integrin patterns, protein cargo) is being tested as a predictor of the site of relapse; LOX inhibitors and CXCR2/CCR2 blockade are experimental.",
    analogy: "A colonising power that sends engineers, seed and fertiliser to a distant shore before the settlers sail. The settlers (CTCs) that land where the soil has been prepared survive; the ones that land elsewhere starve.",
    nodes: [
      { id: "prim", label: "Primary tumour (hypoxic)", x: 12, y: 40, targetId: "hif2a" }, { id: "exo", label: "Exosomes (integrins, MIF)", x: 40, y: 15 }, { id: "fact", label: "VEGF, G-CSF, LOX, S100A8/9", x: 40, y: 65, targetId: "vegf" },
      { id: "bmdc", label: "Bone-marrow cells (VEGFR1+)", x: 68, y: 65 }, { id: "resid", label: "Resident cells: Kupffer, fibroblasts", x: 68, y: 15 }, { id: "niche", label: "Niche: fibronectin, MMP9, leaky", x: 92, y: 40 },
      { id: "ctc", label: "Arriving CTCs", x: 92, y: 82 }, { id: "col", label: "Colonisation", x: 62, y: 90 }, { id: "mdsc", label: "MDSCs, immune suppression", x: 30, y: 90, targetId: "csf1r" },
    ],
    edges: [
      { from: "prim", to: "exo" }, { from: "prim", to: "fact" }, { from: "exo", to: "resid" }, { from: "fact", to: "bmdc" }, { from: "resid", to: "niche" }, { from: "bmdc", to: "niche" },
      { from: "bmdc", to: "mdsc" }, { from: "niche", to: "col" }, { from: "ctc", to: "col" }, { from: "mdsc", to: "col" },
    ],
    interventions: ["Adjuvant systemic therapy and ctDNA-guided escalation act during niche formation and early seeding", "Exosome and integrin profiling to predict organ of relapse (research); exosome-based therapeutics in early development", "LOX, CXCR2 and CCR2 inhibitors, and G-CSF neutralisation in models", "Anti-VEGF has not prevented metastasis in adjuvant trials (bevacizumab in colon and breast), a cautionary result"],
    targets: ["vegf", "hif2a", "csf1r", "cxcr4"], drugs: ["bevacizumab", "signatera"], technologies: ["exosome-therapeutics", "mrd-testing", "liquid-biopsy", "single-cell-spatial"], terms: ["disseminated-tumor-cells", "myeloid-derived-suppressor-cells", "mrd", "late-recurrence"], pathways: ["metastatic-cascade", "intravasation-ctc-survival", "organ-tropism-seed-soil", "tumor-dormancy", "hif-vhl"], bottlenecks: ["b-metastasis-biology"],
    links: [{ label: "Peinado et al., Pre-metastatic niches: organ-specific homes for metastases (Nat Rev Cancer 2017)", url: "https://doi.org/10.1038/nrc.2017.6" }],
  }),
  p({
    id: "organ-tropism-seed-soil", name: "Organ tropism: seed and soil", wikipedia: W("Seed_and_soil_hypothesis"),
    tldr: "Breast cancer goes to bone, lung, liver and brain; prostate cancer to bone; colon cancer to liver; uveal melanoma almost only to liver. Paget's 1889 idea still holds: where a cancer spreads depends on both the seed (the cell's programme) and the soil (the organ's welcome). Each soil has its own vicious cycle, and some are druggable.",
    summary: "Blood flow anatomy sets first-pass organs (portal vein → liver for gut cancers; lung for most), but survival there is selective. Bone: tumour PTHrP, IL-11 and IL-6 induce osteoblast RANKL, activating osteoclasts that release matrix-bound TGF-β and IGF-1, which feed the tumour (the vicious cycle broken by bisphosphonates and denosumab; radium-223 targets the bone-forming surface); CXCL12-CXCR4 and osteomimicry attract seeds. Lung: tenascin C, periostin and VCAM1 support stem-like cells; SPARC and ID1 programmes. Liver: Kupffer-cell and stellate-cell activation, CREB-driven metabolic adaptation, low immune surveillance; PDAC and uveal melanoma (BAP1 loss) show strong hepatic tropism. Brain: astrocyte-mediated support via gap junctions and plasmin inhibition (see blood-brain barrier). Peritoneum: ascites, omental fat, mesothelial attachment (ovarian, gastric, appendiceal). Seed programmes are partly encoded by subtype (basal breast → lung and brain; luminal → bone; HER2 → brain; SCLC → brain). Clinically, tropism informs surveillance (brain MRI in ALK/HER2 disease), bone-modifying agents, metastasis-directed SBRT, and regional therapies (HIPEC, liver-directed radioembolisation).",
    analogy: "Dandelion seeds fall everywhere, but only take root where the soil suits them. Bone is a greenhouse for breast and prostate seeds because the seeds can trick the gardeners (osteoclasts) into digging up food for them.",
    nodes: [
      { id: "ctc", label: "CTC (seed programme)", x: 12, y: 45 }, { id: "flow", label: "Blood-flow anatomy", x: 12, y: 12 }, { id: "bone", label: "Bone: RANKL vicious cycle", x: 45, y: 12 },
      { id: "lung", label: "Lung: tenascin C, periostin", x: 45, y: 38 }, { id: "liver", label: "Liver: Kupffer, stellate cells", x: 45, y: 64 }, { id: "brain", label: "Brain: astrocytes, BBB", x: 45, y: 90 },
      { id: "tgf", label: "TGF-β, IGF-1 released", x: 78, y: 12 }, { id: "growth", label: "Organ-specific colonisation", x: 88, y: 55 }, { id: "bma", label: "Denosumab, radium-223", x: 78, y: 32 }, { id: "regional", label: "SBRT, HIPEC, TARE", x: 88, y: 88 },
    ],
    edges: [
      { from: "flow", to: "ctc" }, { from: "ctc", to: "bone" }, { from: "ctc", to: "lung" }, { from: "ctc", to: "liver" }, { from: "ctc", to: "brain" }, { from: "bone", to: "tgf" }, { from: "tgf", to: "bone" },
      { from: "tgf", to: "growth" }, { from: "lung", to: "growth" }, { from: "liver", to: "growth" }, { from: "brain", to: "growth" }, { from: "bma", to: "bone", type: "inhibits" }, { from: "regional", to: "growth", type: "inhibits" },
    ],
    interventions: ["Bone: denosumab and zoledronic acid break the vicious cycle; radium-223 and 177Lu-PSMA in bone-predominant prostate cancer", "Brain-penetrant TKIs and surveillance MRI in HER2+ breast, ALK+ lung and SCLC", "Regional therapy for organ-confined spread: HIPEC (peritoneum), radioembolisation and liver transplant (liver), SBRT for oligometastases", "Tropism-aware adjuvant trials and exosome profiling to predict relapse site"],
    targets: ["cxcr4", "psma", "her2", "alk"], drugs: ["radium-223", "pluvicto", "tucatinib", "lorlatinib"], technologies: ["bone-modifying-agents", "sbrt", "hipec", "radioembolisation-tare", "liver-transplant-oncology", "whole-body-mri", "psma-pet"], terms: ["oligometastatic", "peritoneal-metastasis", "her2-brain-metastases", "pam50", "blood-brain-barrier"], pathways: ["metastatic-cascade", "pre-metastatic-niche", "blood-brain-barrier-metastasis", "tgf-beta", "tumor-dormancy"], cancers: ["prostate", "breast-hr-positive", "colorectal", "uveal-melanoma", "ovarian"], bottlenecks: ["b-metastasis-biology"],
    links: [{ label: "Obenauf & Massagué, Surviving at a distance: organ-specific metastasis (Trends Cancer 2015)", url: "https://doi.org/10.1016/j.trecan.2015.07.009" }],
  }),
  p({
    id: "blood-brain-barrier-metastasis", name: "The blood-brain barrier & brain metastasis", wikipedia: W("Blood–brain_barrier"),
    tldr: "The brain's blood vessels are sealed tight and fitted with pumps that eject most drugs. That protects the brain from poisons but also from chemotherapy and antibodies. Cancer cells that do squeeze through recruit the brain's own support cells, astrocytes, to feed and shield them.",
    summary: "The BBB is endothelium with continuous tight junctions (claudin-5, occludin), pericyte coverage, astrocyte end-feet, and ABC efflux transporters (P-gp/ABCB1, BCRP/ABCG2) that limit drug entry; large molecules such as antibodies achieve ~0.1% of plasma levels. Metastasising cells arrest in capillary branch points, extravasate over days using cathepsin S, COX-2, HBEGF, ST6GALNAC5, and survive by hugging vessels (vascular co-option via L1CAM and β1 integrin). Reactive astrocytes first attack (plasminogen activator → FasL), which tumour cells block with serpins (neuroserpin); then astrocytes are co-opted through connexin-43 gap junctions that transfer cGAMP, activating astrocytic STING and IFN-α/TNF that support tumour growth; glioma-like neuron-tumour synapses add to it. The blood-tumour barrier in established metastases is leakier but heterogeneous, so drug levels vary lesion to lesion. Brain-penetrant small molecules (osimertinib, lorlatinib, alectinib, tucatinib, capivasertib partially, temozolomide, lomustine) changed outcomes; T-DXd shows intracranial activity despite size; focused ultrasound, intrathecal delivery and LITT are engineering solutions. Meningeal disease and leptomeningeal spread remain the hardest compartment.",
    analogy: "A gated city with customs officers who throw out most goods (efflux pumps). Smugglers who get in bribe the local guards (astrocytes) to feed them. Drugs that work here are either small enough to slip past customs or arrive by a special convoy (focused ultrasound, intrathecal delivery).",
    nodes: [
      { id: "ctc", label: "CTC arrest at capillary", x: 12, y: 15 }, { id: "bbb", label: "BBB: tight junctions, pericytes", x: 45, y: 15 }, { id: "pgp", label: "P-gp / BCRP efflux", x: 78, y: 15 },
      { id: "extra", label: "Extravasation (cathepsin S)", x: 12, y: 48 }, { id: "coopt", label: "Vascular co-option (L1CAM)", x: 45, y: 48 }, { id: "astro", label: "Astrocytes: Cx43, cGAMP", x: 78, y: 48 },
      { id: "met", label: "Brain metastasis", x: 45, y: 82 }, { id: "drug", label: "Drugs excluded", x: 92, y: 82 }, { id: "tki", label: "Brain-penetrant TKIs, FUS", x: 12, y: 82, targetId: "her2" },
    ],
    edges: [
      { from: "ctc", to: "extra" }, { from: "bbb", to: "extra", type: "inhibits" }, { from: "extra", to: "coopt" }, { from: "coopt", to: "met" }, { from: "astro", to: "met" }, { from: "met", to: "astro" },
      { from: "pgp", to: "drug" }, { from: "bbb", to: "drug" }, { from: "drug", to: "met" }, { from: "tki", to: "met", type: "inhibits" }, { from: "tki", to: "pgp", type: "inhibits" },
    ],
    interventions: ["Brain-penetrant TKIs: osimertinib (EGFR), lorlatinib/alectinib (ALK), tucatinib (HER2, HER2CLIMB), plus T-DXd intracranial activity", "Radiosurgery and hippocampal-sparing whole-brain RT; prophylactic cranial irradiation vs MRI surveillance in SCLC", "Focused ultrasound BBB opening, LITT, intrathecal and intraventricular delivery for leptomeningeal disease", "Astrocyte gap-junction (meclofenamate, tonabersat) and STING-axis blockade in trials"],
    targets: ["egfr", "alk", "her2", "akt"], drugs: ["osimertinib", "lorlatinib", "alectinib", "tucatinib", "trastuzumab-deruxtecan", "temozolomide", "lomustine", "capivasertib"], technologies: ["bbb-focused-ultrasound", "litt", "sbrt", "prophylactic-cranial-irradiation", "mri", "glioma-car-t"], terms: ["blood-brain-barrier", "her2-brain-metastases", "efflux-pump", "mgmt"], pathways: ["organ-tropism-seed-soil", "cgas-sting", "cancer-neuroscience", "drug-efflux-pumps", "metastatic-cascade"], cancers: ["nsclc", "breast-her2-positive", "melanoma", "sclc", "glioblastoma"], bottlenecks: ["b-brain-delivery"],
    links: [{ label: "Chen et al., Carcinoma-astrocyte gap junctions promote brain metastasis by cGAMP transfer (Nature 2016)", url: "https://doi.org/10.1038/nature18268" }],
  }),

  // ------------------------------------------------------------------ 8. The tumour ecosystem
  p({
    id: "caf-activation-desmoplasia", name: "Fibroblast activation, desmoplasia & matrix stiffness", wikipedia: W("Cancer-associated_fibroblast"),
    tldr: "Fibroblast activation can alter matrix and signals in a tumour. The resulting stroma has varied functions, so removing it is not a general treatment rule.",
    summary: "Signals in the microenvironment can change fibroblast states, matrix production and remodelling. Matrix amount, organisation, crosslinking and mechanical properties are different features. Experimental stromal perturbations can have opposing consequences depending on the cell population and setting.",
    analogy: "Builders hired to repair a wall who never stop: they pour concrete around the tumour until the roads are blocked (vessels), the police cannot get in (T cells), and the very hardness of the concrete tells the tenants to multiply. Demolishing the builders' work made things worse; the newer plan is to retrain them.",
    nodes: [
      { id: "tum", label: "Tumour: TGF-β, PDGF, Hh, IL-1", x: 12, y: 15 }, { id: "fib", label: "Fibroblast / stellate cell", x: 45, y: 15 }, { id: "my", label: "myCAF (FAP, αSMA, collagen)", x: 78, y: 15, targetId: "fap" },
      { id: "icaf", label: "iCAF (IL-6, CXCL12, LIF)", x: 78, y: 48, targetId: "jak2" }, { id: "ecm", label: "Collagen, HA, LOX crosslinks", x: 45, y: 48 }, { id: "stiff", label: "Stiffness → FAK → YAP/TAZ", x: 12, y: 48 },
      { id: "press", label: "Pressure: vessels collapse", x: 45, y: 82 }, { id: "excl", label: "T-cell exclusion", x: 78, y: 82, targetId: "pd1" }, { id: "grow", label: "Growth, EMT, chemoresistance", x: 12, y: 82 }, { id: "smo", label: "Hedgehog (SMO) paradox", x: 12, y: 96, targetId: "smoothened" },
    ],
    edges: [
      { from: "tum", to: "fib" }, { from: "fib", to: "my" }, { from: "fib", to: "icaf" }, { from: "my", to: "ecm" }, { from: "ecm", to: "stiff" }, { from: "stiff", to: "grow" }, { from: "stiff", to: "fib" },
      { from: "ecm", to: "press" }, { from: "my", to: "excl" }, { from: "icaf", to: "excl" }, { from: "smo", to: "fib" },
    ],
    interventions: ["FAP-targeted imaging (FAPI PET) and radioligands (FAP-2286) and FAP/LRRC15 CAR-T", "Reprogramming: vitamin D analogues, losartan with chemoradiation (PDAC trials), IL-1/JAK inhibition for iCAFs", "FAK inhibitors soften stroma and improve immunotherapy entry (trials); mechanobiology approaches", "Vismodegib and PEGPH20 failed in PDAC: stromal depletion can accelerate disease"],
    targets: ["fap", "smoothened", "jak2", "pd1"], drugs: ["fap-2286", "vismodegib", "sonidegib", "ruxolitinib", "avutometinib-defactinib"], technologies: ["fapi-pet", "stroma-directed-car", "mechanobiology-therapy", "radioligand-therapy", "single-cell-spatial"], terms: ["desmoplasia", "cancer-associated-fibroblasts", "immune-exclusion", "cold-vs-hot"], pathways: ["tumor-microenvironment", "tgf-beta", "hippo-yap", "hedgehog", "jak-stat", "immune-desert-exclusion", "invasion-ecm-degradation"], cancers: ["pancreatic", "cholangiocarcinoma", "breast-hr-positive"], bottlenecks: ["b-tme-immunosuppression"],
    links: [
  {
    "label": "Sahai et al., A framework for advancing our understanding of cancer-associated fibroblasts (Nat Rev Cancer 2020)",
    "url": "https://doi.org/10.1038/s41568-019-0238-1"
  },
  {
    "label": "Kalluri, The biology and function of fibroblasts in cancer (Nat Rev Cancer 2016)",
    "url": "https://doi.org/10.1038/nrc.2016.73"
  },
  {
    "label": "Levental et al., Matrix crosslinking forces tumor progression by enhancing integrin signaling. (2009)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/19931152/"
  },
  {
    "label": "Paszek et al., Tensional homeostasis and the malignant phenotype. (2005)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/16169468/"
  }
],

"notes": [
  "Levental and Paszek studied how crosslinking, matrix rigidity, integrin-linked signals and cell tension affected mammary-cell organisation and invasion in experimental systems. These findings do not make every collagen-rich tissue stiff, invasive or drug resistant. Integrins connect matrix conditions to chemical and mechanical cell responses; a matrix can offer routes or restrictions, rather than forming one universal solid wall.",
  "Ohlund and colleagues described alpha-smooth-muscle-actin-high myofibroblastic fibroblasts near pancreatic cancer cells and IL-6-producing inflammatory populations farther away in pancreatic models and samples. This is not an exhaustive classification of breast stroma or a permanent job assignment for each cell. Ozdemir reported that depletion of selected alpha-smooth-muscle-actin-positive myofibroblasts worsened disease and immunosuppression in pancreatic mouse models. Removing all fibroblasts is not a general treatment conclusion. The indexed 2015 correction is linked; its body was unavailable for this review, so no correction-specific figure claim is adopted.",
  "A fibroblast-rich or matrix-rich region does not by itself measure immune exclusion, stiffness or drug resistance. Treat a stained structural pattern, a mechanical measurement, live-cell migration and a controlled perturbation as different evidence. The generic extracellular-matrix and fibroblast records describe the corresponding specimen and assay limits."
],
"asOf": "2026-11-10",
"related": [
  "extracellular-matrix"
]
}),

  // ------------------------------------------------------------------ 9. Why treatments fail
  p({
    id: "resistance-routes-map", name: "Resistance routes: how a blocked pathway comes back", wikipedia: W("Drug_resistance"),
    tldr: "When a drug blocks a cancer's engine, the cancer has five ways back: change the part the drug binds, make more of it, take a side road, switch to a different engine altogether, or stop letting the drug in. Knowing which route a tumour took decides the next drug.",
    summary: "Vasan, Baselga and Hyman's framework. (1) On-target: secondary mutations that block binding (EGFR T790M and C797S, ALK G1202R, BTK C481S, KRAS Y96D, ESR1 ligand-domain, AR F877L, BCR-ABL T315I) or amplification of the target (AR, BCR-ABL, MET after MET inhibition, BRAF splice variants). (2) Bypass: a parallel input restores the downstream signal (MET or HER3 amplification under EGFR blockade, RTK upregulation via loss of ERK feedback after BRAF/MEK inhibition, NRG1 fusions, IGF1R). (3) Downstream: mutation or amplification below the block (KRAS/NRAS, PIK3CA, MAP2K1, PTEN loss, CDK4/cyclin E, RB1 loss under CDK4/6 inhibition). (4) Phenotypic: lineage plasticity (neuroendocrine transformation, EMT, squamous transdifferentiation) or entry into a drug-tolerant persister state that no longer depends on the target. (5) Pharmacological/antigenic: efflux pumps, sanctuary sites (brain), drug metabolism, and for immune therapies antigen loss (CD19, BCMA, B2M) or payload-related mechanisms for ADCs (SLFN11 loss, TOP1 mutation, antigen downregulation). Pre-existing resistant subclones are selected (clonal evolution) and new mutations arise under APOBEC-driven mutagenesis. Countermeasures: next-generation inhibitors, vertical combinations (BRAF+MEK, KRAS+EGFR), parallel combinations, ctDNA-guided switching, and non-cross-resistant modalities (ADCs, radioligands, cell therapy).",
    analogy: "Blocking a motorway. Traffic re-routes through a changed junction (target mutation), an extra lane (amplification), a parallel A-road (bypass), a road further along (downstream), a different form of transport (lineage switch), or simply avoids the roadblock's jurisdiction (efflux, sanctuary sites).",
    nodes: [
      { id: "drug", label: "Drug blocks target", x: 45, y: 8, targetId: "egfr" }, { id: "target", label: "Target → signal → growth", x: 45, y: 40 }, { id: "ontarget", label: "1 Target mutation / amp", x: 12, y: 25, targetId: "kras" },
      { id: "bypass", label: "2 Bypass RTK (MET, HER3)", x: 12, y: 55, targetId: "met" }, { id: "down", label: "3 Downstream (PIK3CA, RB1)", x: 12, y: 85, targetId: "pik3ca" }, { id: "pheno", label: "4 Lineage switch, persisters", x: 78, y: 25, targetId: "dll3" },
      { id: "pharm", label: "5 Efflux, sanctuary, antigen loss", x: 78, y: 55, targetId: "cd19" }, { id: "growth", label: "Regrowth under therapy", x: 45, y: 72 }, { id: "counter", label: "Next-gen, vertical combos, switch", x: 78, y: 88 },
    ],
    edges: [
      { from: "drug", to: "target", type: "inhibits" }, { from: "target", to: "growth" }, { from: "ontarget", to: "drug", type: "inhibits" }, { from: "bypass", to: "growth" }, { from: "down", to: "growth" },
      { from: "pheno", to: "growth" }, { from: "pharm", to: "drug", type: "inhibits" }, { from: "counter", to: "growth", type: "inhibits" },
    ],
    interventions: ["Next-generation inhibitors for on-target mutations (osimertinib for T790M, lorlatinib for ALK G1202R, pirtobrutinib for BTK C481S, asciminib for T315I)", "Vertical and parallel combinations: BRAF+MEK, KRAS G12C + EGFR in CRC, CDK4/6 + endocrine + PI3K/AKT", "Switching modality on progression: ADCs, radioligands, engagers and CAR-T are not cross-resistant with small molecules", "Serial ctDNA to detect the route (C797S, MET amp, ESR1) and adaptive dosing; see the resistance atlas for every class"],
    targets: ["egfr", "alk", "kras", "met", "her3", "pik3ca", "estrogen-receptor", "androgen-receptor", "btk", "bcr-abl", "cd19", "bcma", "dll3"], drugs: ["osimertinib", "lorlatinib", "amivantamab", "pirtobrutinib", "asciminib", "sotorasib", "cetuximab", "elacestrant", "tarlatamab"], technologies: ["liquid-biopsy", "cgp", "kinase-inhibitors", "adc", "radioligand-therapy", "car-t"], terms: ["resistance", "c797s", "met-amplification", "esr1-mutation", "ar-v7", "efflux-pump", "histologic-transformation", "oligoprogression"], pathways: ["rtk-activation", "ras-mapk", "clonal-evolution", "drug-tolerant-persisters", "drug-efflux-pumps", "lineage-plasticity-neuroendocrine", "antigen-presentation-immunoediting"], bottlenecks: ["b-resistance", "b-tumor-heterogeneity"],
    links: [{ label: "Vasan, Baselga & Hyman, A view on drug resistance in cancer (Nature 2019)", url: "https://doi.org/10.1038/s41586-019-1730-1" }],
  }),
  p({
    id: "drug-tolerant-persisters", name: "Drug-tolerant persister cells", wikipedia: W("Persister_cell"),
    tldr: "Even when a drug wipes out 99% of a tumour, a few cells survive without any resistance mutation: they go quiet, stop dividing, and wait. These persisters are the seed of relapse. They are hard to kill precisely because they are not doing much, but they have their own weaknesses.",
    summary: "First described by Sharma et al. (2010) in EGFR-mutant lung cancer cells surviving erlotinib, persisters are a reversible, largely non-genetic state resembling bacterial persistence and embryonic diapause: slow-cycling, with chromatin changes (KDM5A-dependent histone demethylation, H3K27me3 gain), activation of IGF1R, YAP/TAZ, NF-κB, Notch and AXL, autophagy, altered metabolism (reliance on fatty acid oxidation, low glutathione), reduced apoptotic priming, upregulated ABC transporters, and a mesenchymal-like, ALDH-high phenotype. Their lipid metabolism creates dependence on GPX4, so ferroptosis inducers kill them selectively in models. During persistence, downregulated repair and APOBEC activity increase mutagenesis, so genuine resistance mutations (EGFR T790M, C797S) often arise from persisters ('bet hedging' then 'commitment'). MRD detected by ctDNA after targeted therapy or in adjuvant settings partly reflects this population; senescence-like persisters share SASP features. Strategies: drug holidays and intermittent dosing to prevent commitment, GPX4/ferroptosis inducers, BCL-XL/MCL-1 inhibitors to remove the survival buffer, KDM5 or EZH2 inhibitors to block the epigenetic switch, and upfront combinations that hit the persister programme (osimertinib + chemotherapy in FLAURA2, + amivantamab in MARIPOSA).",
    analogy: "Bears in hibernation while the forest burns. Poison meant for grazing animals does nothing to a sleeping bear; but a hibernating bear cannot run, so a hunter who knows where the den is (GPX4, BCL-XL) can strike.",
    nodes: [
      { id: "drug", label: "Targeted drug or chemo", x: 12, y: 15, targetId: "egfr" }, { id: "bulk", label: "Bulk tumour dies", x: 45, y: 15 }, { id: "pers", label: "Persister: slow-cycling, reversible", x: 45, y: 45 },
      { id: "epi", label: "KDM5A, H3K27me3, YAP, NF-κB", x: 12, y: 48, targetId: "ezh2" }, { id: "meta", label: "FAO, low GSH → GPX4 dependence", x: 78, y: 30 }, { id: "abc", label: "Efflux, autophagy, BCL-XL", x: 78, y: 62, targetId: "bcl2" },
      { id: "mut", label: "APOBEC → resistance mutation", x: 45, y: 78 }, { id: "relapse", label: "Relapse (MRD → clinical)", x: 78, y: 92 }, { id: "ferro", label: "Ferroptosis inducers", x: 92, y: 8 }, { id: "combo", label: "Upfront combinations, holidays", x: 12, y: 85 },
    ],
    edges: [
      { from: "drug", to: "bulk" }, { from: "drug", to: "pers" }, { from: "epi", to: "pers" }, { from: "pers", to: "meta" }, { from: "pers", to: "abc" }, { from: "pers", to: "mut" }, { from: "mut", to: "relapse" }, { from: "pers", to: "relapse" },
      { from: "ferro", to: "meta", type: "inhibits" }, { from: "combo", to: "pers", type: "inhibits" },
    ],
    interventions: ["Upfront combinations that pre-empt persisters: osimertinib + chemotherapy (FLAURA2), amivantamab + lazertinib (MARIPOSA), BRAF + MEK + anti-PD-1", "GPX4 and ferroptosis inducers, BCL-XL/MCL-1 inhibitors, KDM5 and EZH2 inhibitors (preclinical to phase 1)", "MRD-guided treatment: ctDNA clearance to de-escalate, persistence to intensify or switch", "Intermittent or adaptive dosing to delay commitment to resistance (trials in melanoma and prostate cancer)"],
    targets: ["egfr", "ezh2", "bcl2", "kras", "braf"], drugs: ["osimertinib", "amivantamab", "lazertinib", "venetoclax", "signatera"], technologies: ["mrd-testing", "continuous-ctdna-monitoring", "epigenetic-drugs", "senescence-targeting", "kinase-inhibitors"], terms: ["mrd", "ctdna", "resistance", "nonmutational-epigenetic-reprogramming", "c797s"], pathways: ["ferroptosis-cell-death", "epigenetic-reprogramming", "autophagy", "senescence", "clonal-evolution", "cancer-stem-cells-plasticity", "resistance-routes-map"], bottlenecks: ["b-resistance", "b-dormancy-mrd"],
    links: [{ label: "Sharma et al., A chromatin-mediated reversible drug-tolerant state in cancer cell subpopulations (Cell 2010)", url: "https://doi.org/10.1016/j.cell.2010.02.027" }, { label: "Shen, Vagner & Robert, Persistent cancer cells: the deadly survivors (Cell 2020)", url: "https://doi.org/10.1016/j.cell.2020.10.027" }],
  }),
  p({
    id: "drug-efflux-pumps", name: "Drug efflux pumps (ABC transporters)", wikipedia: W("P-glycoprotein"),
    tldr: "Drug transporters can lower cellular exposure to particular anticancer drugs. Their substrate profile, location and activity matter; expression alone does not select a treatment.",
    summary: "ATP-binding cassette transporters use ATP to move substrates across membranes. ABCB1, ABCG2 and ABCC1 can transport several anticancer drugs, with different substrate profiles. Their normal protective and excretory roles also affect absorption, distribution and drug interactions; transporter activity at the blood-brain or placental barrier is a different setting from activity in a cancer cell.\n\nAcquired resistance can involve increased transport, but antigen loss, altered processing and other mechanisms must be assessed separately. Inhibiting a pump can change both tumour exposure and exposure in normal tissues. The unsuccessful clinical development of several P-glycoprotein inhibitors does not identify one universal reason for failure, and a resistant cell model does not itself select a treatment for a person.",
    analogy: "A nightclub bouncer who throws out anyone in a particular jacket. Sacking the bouncer (P-gp inhibitors) also emptied the club of the staff who kept the place safe (gut, brain, marrow). The fix was to change jackets: payloads the bouncer does not recognise.",
    nodes: [
      { id: "drug", label: "Chemo / payload enters", x: 12, y: 30 }, { id: "abcb1", label: "ABCB1 (P-gp)", x: 45, y: 15 }, { id: "abcg2", label: "ABCG2 (BCRP), ABCC1", x: 45, y: 48 },
      { id: "out", label: "Drug exported (ATP)", x: 78, y: 30 }, { id: "conc", label: "Sub-lethal intracellular dose", x: 78, y: 62 }, { id: "ind", label: "EMT, hypoxia, NRF2 induce", x: 12, y: 62, targetId: "kras" },
      { id: "bbb", label: "BBB, stem cells, marrow", x: 12, y: 90 }, { id: "payload", label: "Non-substrate payloads (DXd)", x: 45, y: 82, targetId: "trop2" }, { id: "kill", label: "Cell death", x: 78, y: 92 },
    ],
    edges: [
      { from: "drug", to: "abcb1" }, { from: "drug", to: "abcg2" }, { from: "abcb1", to: "out" }, { from: "abcg2", to: "out" }, { from: "out", to: "conc" }, { from: "conc", to: "kill", type: "inhibits" },
      { from: "ind", to: "abcb1" }, { from: "ind", to: "abcg2" }, { from: "bbb", to: "abcb1" }, { from: "payload", to: "abcb1", type: "inhibits" }, { from: "payload", to: "kill" },
    ],
    interventions: ["Payload selection: DXd and exatecan (T-DXd, Dato-DXd, sac-TMT) retain activity where MMAE and SN-38 are pumped out; PBD dimers and radionuclides are pump-independent", "Brain-penetrant TKIs engineered to evade P-gp (lorlatinib, tucatinib, osimertinib)", "P-gp inhibitors (valspodar, tariquidar, zosuquidar) failed in phase 3; a museum exhibit", "Collateral sensitivity and MDR-selective compounds are experimental"],
    targets: ["trop2", "her2", "kras", "alk"], drugs: ["trastuzumab-deruxtecan", "datopotamab-deruxtecan", "sacituzumab-tirumotecan", "sacituzumab-govitecan", "enfortumab-vedotin", "paclitaxel", "doxorubicin", "lorlatinib"], technologies: ["adc", "radioligand-therapy", "cytotoxic-chemotherapy", "topoisomerase-inhibitors"], terms: ["efflux-pump", "payload", "dxd", "exatecan", "sn-38", "mmae", "bystander-effect", "adc-sequencing", "resistance"], pathways: ["emt", "keap1-nrf2", "blood-brain-barrier-metastasis", "resistance-routes-map", "cancer-stem-cells-plasticity"], bottlenecks: ["b-resistance"],
    links: [
  {
    "label": "Robey et al., Revisiting the role of ABC transporters in multidrug-resistant cancer (Nat Rev Cancer 2018)",
    "url": "https://doi.org/10.1038/s41568-018-0005-8"
  },
  {
    "label": "Rampa et al., payload diversification and sequential ADC therapy in breast cancer (2026)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/41591991/"
  },
  {
    "label": "Chen et al., CD30 downregulation, MMAE resistance and MDR1 upregulation in brentuximab vedotin resistance (2015)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25840583/"
  },
  {
    "label": "Weng et al., antibody-exatecan conjugates overcome resistance in colon and lung cancer models (2023)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/36693125/"
  },
  {
    "label": "Robey et al., revisiting the role of ABC transporters in multidrug-resistant cancer (2018)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29643473/"
  },
  {
    "label": "Robey et al., mutations at amino-acid 482 in ABCG2 affect substrate and antagonist specificity (2003)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/14612912/"
  },
  {
    "label": "Zeng et al., methotrexate and folate transport by MRP3 and MRP1 (2001)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/11585759/"
  },
  {
    "label": "Zhou et al., Bcrp1 and relative mitoxantrone protection in mouse haematopoietic cells (2002)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/12218177/"
  }
],

"notes": [
  "Which pump handles which drug, and on what evidence. ABCG2 confers resistance to SN-38 and topotecan: in HEK-293 cells made to express wild-type or mutant ABCG2, cytotoxicity assays showed high resistance to mitoxantrone, SN-38 and topotecan and no appreciable resistance to etoposide or taxol (Robey et al. 2003), while in SN-38-resistant breast and gastric cell lines ABCG2 inhibitors restored SN-38 toxicity (Chang et al. 2016, SN-38 only). For P-gp, a brentuximab vedotin-resistant Hodgkin lymphoma line showed MMAE resistance and MDR1 upregulation, and 1 of 10 Hodgkin lymphoma patient samples expressed MDR1 (Chen et al.). Robey and colleagues' 2018 review describes ABCC1-mediated resistance to doxorubicin, etoposide and vincristine, transport of glutathione and glucuronide conjugates, and protective transporters at the brain and placental barriers. Zeng and colleagues' 2001 transport study also demonstrated MRP1 transport of methotrexate and folates, with polyglutamylation strongly limiting methotrexate transport. These are cell-line and overexpression models, not measurements of a tumour, and these laboratory findings do not validate a pump assay for selecting clinical therapy; Robey et al. 2018 describe efforts to make MDR1 a therapeutic target as unsuccessful so far. Normal-tissue protection also has experimental support: Zhou and colleagues found greater mitoxantrone sensitivity in Bcrp1-deficient mouse haematopoietic cells than in wild-type cells, supporting a protective role in that model. Robey's review also describes gastrointestinal transport affecting oral availability. These normal-tissue roles should not be confused with a cancer-specific mechanism.",
  "Antibody-drug conjugates meet pumps after delivery. Direct transport by an efflux pump concerns a released payload that is its substrate, rather than export of the intact antibody-drug conjugate during endocytosis; A neighbouring cell could likewise export a payload that entered it, but a reduced bystander effect is a mechanistic hypothesis here, not a demonstrated clinical result. The absence of this efflux mechanism does not prove that delivery, release or target action succeeded; other barriers can remain. In breast cancer cells made resistant to trastuzumab deruxtecan or sacituzumab govitecan, resistance was mainly payload-specific, notably more efflux-transporter activity rather than loss of antigen, and ADCs with microtubule-inhibitor payloads restored activity in cells and animals (Rampa et al.); exatecan conjugates with a traceless self-immolative linker moiety overcame resistance of DXd and SN-38 conjugates in multidrug-resistance-positive models (Weng et al.). A study could compare intact ADC and free payload on the same cells, with and without a pump inhibitor, to ask which delivery step is affected. That comparison would still need controls for the inhibitor's other effects."
],
"asOf": "2026-11-11"
}),
  p({
    id: "lineage-plasticity-neuroendocrine", name: "Lineage plasticity & neuroendocrine transformation", wikipedia: W("Neuroendocrine_tumor"),
    tldr: "Under pressure from a drug that blocks its identity (the androgen receptor in prostate cancer, EGFR in lung cancer), a tumour can change what kind of cell it is, becoming a small-cell neuroendocrine cancer that no longer needs the blocked signal. It is the ultimate escape: not a new mutation in the engine, but a new engine.",
    summary: "Lineage plasticity requires loss of the gatekeepers TP53 and RB1 (Ku et al., Mu et al. 2017), which unlocks SOX2, EZH2-mediated repression of lineage genes, and reactivation of neural programmes (ASCL1, NEUROD1, INSM1, BRN2), producing AR-indifferent neuroendocrine prostate cancer in 15-20% of castration-resistant cases after potent AR inhibitors, and small-cell transformation in ~5-15% of EGFR-mutant NSCLC on osimertinib (also after ALK inhibitors and in immunotherapy-treated adenocarcinoma). Related transitions: squamous transdifferentiation of adenocarcinoma, sarcomatoid dedifferentiation in RCC and mesothelioma, MITF-low neural-crest states in melanoma under BRAF inhibitors, and blast/Richter transformation in lymphoid cancers. The new state expresses DLL3, SEZ6, B7-H3, CEACAM5 and loses PSMA or EGFR dependence, is transiently sensitive to platinum-etoposide, and is detected by biopsy at progression (recommended when PSA is low relative to disease burden or ctDNA shows TP53/RB1 loss) and by DLL3 PET. Therapeutics: DLL3 engagers (tarlatamab), EZH2 inhibitors (mevrometostat + enzalutamide, tazemetostat) to block or reverse the switch, Aurora A inhibitors for MYCN/ASCL1 states, and B7-H3 or SEZ6 ADCs.",
    analogy: "A shop that sells hats is fined every time it sells a hat (AR blockade). One day it reopens as a bakery. The fine no longer applies, the old inspectors (PSA, PSMA scans) see nothing, and only a new set of tools works against the new business.",
    nodes: [
      { id: "adeno", label: "Adenocarcinoma (AR / EGFR)", x: 12, y: 15, targetId: "androgen-receptor" }, { id: "drug", label: "ARPI or EGFR TKI pressure", x: 12, y: 48, targetId: "egfr" }, { id: "loss", label: "TP53 + RB1 loss", x: 45, y: 15, targetId: "tp53" },
      { id: "sox2", label: "SOX2, EZH2, ASCL1/NEUROD1", x: 45, y: 48, targetId: "ezh2" }, { id: "ne", label: "Neuroendocrine / small-cell", x: 78, y: 30 }, { id: "dll3", label: "DLL3, B7-H3, SEZ6 surface", x: 78, y: 62, targetId: "dll3" },
      { id: "indiff", label: "AR / EGFR indifferent", x: 45, y: 82 }, { id: "tx", label: "Tarlatamab, platinum-etoposide", x: 78, y: 92 }, { id: "ezh2i", label: "EZH2 inhibitors block switch", x: 12, y: 82 },
    ],
    edges: [
      { from: "adeno", to: "ne" }, { from: "drug", to: "sox2" }, { from: "loss", to: "sox2" }, { from: "sox2", to: "ne" }, { from: "ne", to: "dll3" }, { from: "ne", to: "indiff" },
      { from: "drug", to: "adeno", type: "inhibits" }, { from: "tx", to: "ne", type: "inhibits" }, { from: "ezh2i", to: "sox2", type: "inhibits" },
    ],
    interventions: ["Re-biopsy at progression when the clinical picture and markers diverge; ctDNA TP53/RB1 loss as a warning", "DLL3 T-cell engager tarlatamab (SCLC; trials in neuroendocrine prostate cancer); B7-H3 and SEZ6 ADCs", "EZH2 inhibitors (mevrometostat with enzalutamide, tazemetostat) to prevent or reverse plasticity; Aurora A inhibitors for MYCN/ASCL1-high states", "Platinum-etoposide gives transient responses in transformed disease"],
    targets: ["dll3", "b7h3", "ezh2", "tp53", "androgen-receptor", "egfr", "ceacam5", "psma"], drugs: ["tarlatamab", "ifinatamab-deruxtecan", "mevrometostat", "tazemetostat", "platinum-etoposide", "enzalutamide", "osimertinib"], technologies: ["t-cell-engager", "adc", "epigenetic-drugs", "liquid-biopsy", "histopathology-ihc"], terms: ["histologic-transformation", "castration-resistance", "unlocking-phenotypic-plasticity", "richter-transformation", "epithelioid-vs-sarcomatoid"], pathways: ["cancer-stem-cells-plasticity", "ar-signaling", "epigenetic-reprogramming", "notch", "p53-cell-cycle", "resistance-routes-map"], cancers: ["prostate", "nsclc", "sclc", "melanoma"], bottlenecks: ["b-resistance"],
    links: [{ label: "Ku et al., Rb1 and Trp53 cooperate to suppress prostate cancer lineage plasticity, metastasis, and antiandrogen resistance (Science 2017)", url: "https://doi.org/10.1126/science.aah4199" }, { label: "Beltran et al., Divergent clonal evolution of castration-resistant neuroendocrine prostate cancer (Nat Med 2016)", url: "https://doi.org/10.1038/nm.4045" }],
  }),
];

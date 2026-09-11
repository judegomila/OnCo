/**
 * Resistance mechanism atlas: for each drug class, how tumours escape and what closes the route.
 * `refs` are entity ids (targets, drugs, technologies, terms, trials, ideas).
 * `category` places each escape route in the fixed taxonomy in `src/lib/resistance-categories.ts`.
 */
import type { MechanismCategory } from "@/lib/resistance-categories";

export type Countermeasure = { text: string; refs: string[] };
export type Mechanism = { name: string; category: MechanismCategory; how: string; frequency?: string; countermeasures: Countermeasure[]; refs: string[] };
export type ResistanceClass = { id: string; drugClass: string; tldr: string; exemplars: string[]; mechanisms: Mechanism[]; sources: Array<{ label: string; url: string }> };

export const resistance: ResistanceClass[] = [
  {
    id: "egfr-tki", drugClass: "EGFR tyrosine kinase inhibitors (osimertinib)", exemplars: ["osimertinib", "amivantamab"],
    tldr: "Lung cancers on osimertinib escape by mutating the drug's binding site, switching on a bypass receptor (MET), or changing cell type entirely.",
    mechanisms: [
      { name: "On-target EGFR C797S", category: "on-target", how: "Mutation of the cysteine that osimertinib binds covalently; abolishes drug binding while EGFR stays active.", frequency: "~7 to 15% after first-line osimertinib", refs: ["egfr"],
        countermeasures: [{ text: "Fourth-generation allosteric EGFR inhibitors (in trials); amivantamab-based regimens", refs: ["amivantamab"] }, { text: "ADCs that bypass genotype: Dato-DXd, HER3-DXd, iza-bren", refs: ["datopotamab-deruxtecan", "patritumab-deruxtecan", "izalontamab-brengitecan", "tki-then-adc-lung"] }] },
      { name: "MET amplification / bypass", category: "bypass", how: "Amplified MET signals to PI3K/MAPK independently of EGFR.", frequency: "~15 to 20%", refs: ["met"],
        countermeasures: [{ text: "EGFR×MET bispecific amivantamab; MET TKI + osimertinib combinations", refs: ["amivantamab"] }, { text: "c-MET-directed and EGFR×c-MET bispecific ADCs", refs: ["telisotuzumab-vedotin", "tilatamig-samrotecan"] }] },
      { name: "Histologic transformation", category: "lineage", how: "Conversion to small-cell lung cancer (RB1/TP53 co-loss) or squamous histology; EGFR mutation persists but the cell no longer depends on it.", frequency: "~5 to 15%", refs: ["sclc", "tp53"],
        countermeasures: [{ text: "Re-biopsy at progression; platinum-etoposide for SCLC transformation", refs: ["cytotoxic-chemotherapy"] }] },
      { name: "Pre-existing minor resistant clones", category: "other", how: "Small subclones that already carry a resistance route expand under single-agent TKI; adding chemotherapy up front kills them before they take over.", refs: ["flaura2"],
        countermeasures: [{ text: "Osimertinib + platinum-pemetrexed (FLAURA2) or amivantamab-lazertinib (MARIPOSA) in first line", refs: ["flaura2", "mariposa"] }] },
    ],
    sources: [{ label: "FLAURA2 (NEJM 2023)", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2306434" }],
  },
  {
    id: "alk-tki", drugClass: "ALK tyrosine kinase inhibitors", exemplars: ["lorlatinib"],
    tldr: "Each ALK drug generation was beaten by a new mutation in the kinase; lorlatinib covers nearly all of them, so resistance now runs through other pathways.",
    mechanisms: [
      { name: "Solvent-front G1202R and compound mutations", category: "on-target", how: "Steric clash blocks first- and second-generation inhibitors; compound mutations (G1202R + L1196M etc.) emerge after lorlatinib.", frequency: "G1202R in ~40% after second-generation TKIs", refs: ["alk"],
        countermeasures: [{ text: "Lorlatinib covers G1202R; fourth-generation neladalkib for compound mutations", refs: ["lorlatinib", "nuvalent"] }] },
      { name: "Bypass signalling (MET, EGFR, KRAS)", category: "bypass", how: "Alternative receptors or downstream mutations re-activate MAPK/PI3K.", refs: ["met", "kras"],
        countermeasures: [{ text: "Combination with MET or MEK inhibitors (trials); chemotherapy; ADCs", refs: ["kinase-inhibitors"] }] },
    ],
    sources: [{ label: "CROWN 5-year (J Clin Oncol 2024)", url: "https://ascopubs.org/doi/10.1200/JCO.24.00581" }],
  },
  {
    id: "top1-adc", drugClass: "Topoisomerase-I payload ADCs (T-DXd, sacituzumab govitecan, Dato-DXd)", exemplars: ["trastuzumab-deruxtecan", "sacituzumab-govitecan", "datopotamab-deruxtecan"],
    tldr: "Resistance can be to the address (antigen) or to the poison (payload). Payload resistance is shared across every TOP1 ADC regardless of target, which is why a second one often fails.",
    mechanisms: [
      { name: "Payload resistance: TOP1 mutation or loss", category: "payload", how: "TOP1 mutations (e.g., E418K) or reduced expression prevent trapping of the cleavage complex.", refs: ["topoisomerase-inhibitors", "adc-sequencing"],
        countermeasures: [{ text: "Switch payload class (tubulin, DNA-crosslinking, degrader) rather than antigen", refs: ["idea-payload-switching", "dual-payload-adc"] }, { text: "Radioconjugates against the same antigen", refs: ["idea-alpha-after-adc", "radioimmunotherapy"] }] },
      { name: "SLFN11 loss", category: "payload", how: "Schlafen-11 is required for replication-stress-induced death; its epigenetic silencing confers resistance to TOP1 (and platinum) agents.", refs: ["topoisomerase-inhibitors"],
        countermeasures: [{ text: "ATR/CHK1 inhibitors re-sensitise SLFN11-low cells preclinically", refs: ["atr"] }, { text: "EZH2 inhibition to restore SLFN11 (preclinical)", refs: ["ezh2"] }] },
      { name: "Efflux pump upregulation (ABCG2, ABCB1)", category: "payload", how: "SN-38 is an ABCG2 substrate; DXd and MMAE are ABCB1 substrates; mesenchymal states upregulate both.", refs: ["efflux-pump", "emt"],
        countermeasures: [{ text: "Payloads reported to be weaker efflux substrates (sac-TMT's belotecan derivative)", refs: ["sacituzumab-tirumotecan"] }, { text: "Efflux-agnostic modalities: radiation, T-cell engagers", refs: ["idea-efflux-agnostic"] }] },
      { name: "Antigen loss or downregulation", category: "antigen", how: "Reduced HER2 or TROP2 surface expression after treatment; less frequent than payload resistance for HER2-low disease.", refs: ["her2", "trop2"],
        countermeasures: [{ text: "Antigen PET to detect loss and pick the next target", refs: ["trop2-pet", "her2-pet", "idea-trop2-pet-selection"] }, { text: "Bispecific ADCs hitting two antigens", refs: ["bispecific-adc"] }] },
      { name: "Impaired internalisation / lysosomal processing", category: "pharmacology", how: "Defective endocytosis or lysosomal cathepsin activity limits payload release.", refs: ["adc", "linker"],
        countermeasures: [{ text: "Biparatopic antibodies that force receptor clustering (zanidatamab-type)", refs: ["zanidatamab"] }] },
    ],
    sources: [{ label: "ADC sequencing series, ESMO Breast 2026", url: "https://oncbrothers.com/esmobreast26" }],
  },
  {
    id: "pd1-blockade", drugClass: "PD-1 / PD-L1 checkpoint inhibitors", exemplars: ["pembrolizumab", "nivolumab", "atezolizumab"],
    tldr: "Most patients never respond (primary resistance) and some responders relapse (acquired). The routes are loss of antigen presentation, no T cells in the tumour, and a suppressive microenvironment.",
    mechanisms: [
      { name: "Loss of antigen presentation (B2M, HLA, JAK1/2)", category: "immune-evasion", how: "Mutations in B2M or HLA class I stop tumour cells displaying antigen; JAK1/2 loss removes interferon responsiveness (and PD-L1 induction).", frequency: "Acquired resistance in melanoma: ~25% JAK/B2M", refs: ["pd1-checkpoint"],
        countermeasures: [{ text: "NK-cell and CAR-based approaches that do not need MHC; T-cell engagers", refs: ["car-nk-macrophage", "t-cell-engager"] }] },
      { name: "Immune-desert / excluded tumours", category: "immune-evasion", how: "No pre-existing T-cell infiltrate (cold tumour) or T cells held at the margin by TGF-β and stroma.", refs: ["cold-vs-hot", "fap"],
        countermeasures: [{ text: "Radiation, oncolytic viruses, ADC + IO to prime", refs: ["radiation-plus-io", "oncolytic-plus-pd1", "adc-plus-io"] }, { text: "Personalised neoantigen vaccines to supply T cells", refs: ["neoantigen-mrna-vaccine", "vaccine-plus-pd1"] }, { text: "TIL therapy after PD-1 failure", refs: ["io-then-til", "lifileucel"] }] },
      { name: "Alternative checkpoints (LAG-3, TIM-3, TIGIT)", category: "bypass", how: "Exhausted T cells co-express other inhibitory receptors.", refs: ["lag3", "tigit"],
        countermeasures: [{ text: "Relatlimab + nivolumab (LAG-3) works; TIGIT combinations failed", refs: ["relatlimab-nivolumab", "tigit-plus-pd1-caution"] }] },
      { name: "Immunosuppressive myeloid cells and VEGF", category: "immune-evasion", how: "MDSCs, M2 macrophages, and VEGF suppress T-cell function and dendritic-cell maturation.", refs: ["vegf"],
        countermeasures: [{ text: "PD-1 + VEGF blockade; PD-1×VEGF bispecifics", refs: ["io-plus-vegf", "ivonescimab"] }] },
      { name: "Loss of neoantigens / low TMB", category: "antigen", how: "Immunoediting removes the clones that carried immunogenic mutations.", refs: ["neoantigen", "tmb"],
        countermeasures: [{ text: "Vaccines against shared antigens (KRAS)", refs: ["shared-antigen-vaccine"] }] },
    ],
    sources: [{ label: "CheckMate 067 10-year (NEJM 2024)", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2407417" }],
  },
  {
    id: "cdk46-endocrine", drugClass: "CDK4/6 inhibitor + endocrine therapy", exemplars: ["palbociclib", "ribociclib", "abemaciclib", "elacestrant", "vepdegestrant"],
    tldr: "Hormone-positive breast cancer escapes either by mutating the oestrogen receptor so it no longer needs oestrogen, or by rewiring the cell-cycle engine (RB loss, cyclin E) so CDK4/6 no longer matters.",
    mechanisms: [
      { name: "ESR1 ligand-binding-domain mutations", category: "on-target", how: "Y537S/D538G render ER constitutively active; arise under aromatase-inhibitor pressure, detectable in ctDNA.", frequency: "~30 to 40% after AI progression", refs: ["estrogen-receptor", "liquid-biopsy"],
        countermeasures: [{ text: "Oral SERDs (elacestrant, imlunestrant, camizestrant) and PROTAC vepdegestrant; ctDNA-guided early switch (SERENA-6)", refs: ["elacestrant", "vepdegestrant", "protac-degrader"] }] },
      { name: "RB1 loss", category: "bypass", how: "Without RB, CDK4/6 inhibition cannot arrest the cell cycle.", frequency: "~5 to 10% acquired", refs: ["p53-cell-cycle"],
        countermeasures: [{ text: "Switch to chemotherapy or ADCs (T-DXd for HER2-low, sacituzumab, Dato-DXd)", refs: ["trastuzumab-deruxtecan", "sacituzumab-govitecan", "datopotamab-deruxtecan"] }] },
      { name: "Cyclin E / CDK2 activation", category: "bypass", how: "CCNE1 amplification or CDK2 activity bypasses the G1 block.", refs: ["cdk4-6"],
        countermeasures: [{ text: "CDK2 inhibitors (AVZO-021 and others) and CDK4-selective inhibitors in trials", refs: ["avenzo"] }] },
      { name: "PI3K/AKT/mTOR activation", category: "bypass", how: "PIK3CA mutation, PTEN loss, or AKT1 E17K sustain growth independent of ER.", frequency: "PIK3CA ~40% of HR+ disease", refs: ["pi3k-akt-mtor", "pik3ca", "akt"],
        countermeasures: [{ text: "Capivasertib, inavolisib, alpelisib, everolimus, gedatolisib by genotype", refs: ["capivasertib", "inavolisib", "gedatolisib"] }] },
    ],
    sources: [{ label: "SERENA-6 (ASCO 2026 coverage, BCRF)", url: "https://www.bcrf.org/blog/asco-2026-key-takeaways/" }],
  },
  {
    id: "parp-inhibitor", drugClass: "PARP inhibitors", exemplars: ["olaparib", "niraparib", "talazoparib"],
    tldr: "Tumours that lost BRCA can regain repair by re-mutating BRCA back into working order, or by finding another way to protect their DNA.",
    mechanisms: [
      { name: "BRCA1/2 reversion mutations", category: "bypass", how: "Secondary mutations restore the open reading frame and homologous recombination; also confers platinum resistance.", frequency: "~20 to 40% of PARPi-resistant ovarian cancer", refs: ["brca", "ddr"],
        countermeasures: [{ text: "ctDNA detection of reversions to avoid futile re-challenge; switch to non-DDR agents (ADCs such as mirvetuximab)", refs: ["liquid-biopsy", "mirvetuximab-soravtansine"] }] },
      { name: "Restoration of HR via 53BP1/Shieldin loss", category: "bypass", how: "Loss of end-protection factors lets BRCA1-deficient cells resect DNA ends and repair by HR.", refs: ["ddr"],
        countermeasures: [{ text: "ATR inhibitors; POLQ inhibitors (trials)", refs: ["atr", "synthetic-lethality-approaches"] }] },
      { name: "Replication fork protection and PARP1 loss", category: "on-target", how: "Stabilised forks tolerate PARP trapping; PARP1 mutations abolish trapping.", refs: ["parp"],
        countermeasures: [{ text: "PARP1-selective saruparib for a wider window; PARP PET to confirm target", refs: ["parp-pet"] }] },
      { name: "Drug efflux (ABCB1)", category: "pharmacology", how: "Olaparib and rucaparib are P-gp substrates.", refs: ["efflux-pump"],
        countermeasures: [{ text: "Talazoparib and niraparib are weaker substrates", refs: ["talazoparib", "niraparib"] }] },
    ],
    sources: [{ label: "SOLO-1 7-year OS (J Clin Oncol 2023)", url: "https://ascopubs.org/doi/10.1200/JCO.22.01549" }],
  },
  {
    id: "kras-g12c", drugClass: "KRAS G12C inhibitors", exemplars: ["sotorasib", "adagrasib"],
    tldr: "Blocking one RAS mutant makes the cell turn up every upstream receptor and often mutate KRAS again; that is why responses are short and why combinations and pan-RAS drugs followed.",
    mechanisms: [
      { name: "Adaptive RTK feedback (EGFR, others)", category: "bypass", how: "Relief of ERK-mediated negative feedback re-activates receptors within hours, producing new wild-type KRAS-GTP the drug cannot bind.", frequency: "Universal, especially in colorectal cancer", refs: ["ras-mapk", "egfr"],
        countermeasures: [{ text: "Add anti-EGFR antibody in colorectal cancer (CodeBreaK 300, KRYSTAL-1)", refs: ["kras-plus-egfr-crc", "codebreak-300"] }, { text: "SHP2 or SOS1 inhibitor combinations (trials)", refs: ["kras-inhibitors"] }] },
      { name: "Secondary KRAS mutations (Y96D, R68S, H95) and amplification", category: "on-target", how: "Alter the switch-II pocket or overwhelm the drug.", refs: ["kras"],
        countermeasures: [{ text: "Pan-RAS(ON) tri-complex inhibitors (daraxonrasib) bind a different site", refs: ["daraxonrasib"] }] },
      { name: "Bypass alterations (MET amplification, NRAS/BRAF mutations, RTK fusions)", category: "bypass", how: "Alternative MAPK activation.", refs: ["met", "braf"],
        countermeasures: [{ text: "Combination with MEK/ERK inhibitors; re-biopsy-guided therapy", refs: ["kinase-inhibitors"] }] },
    ],
    sources: [{ label: "CodeBreaK 300 (NEJM 2023)", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2308795" }],
  },
  {
    id: "bcma-directed", drugClass: "BCMA-directed therapy (CAR-T, bispecifics, ADC)", exemplars: ["ciltacabtagene-autoleucel", "teclistamab", "belantamab-mafodotin"],
    tldr: "Myeloma escapes BCMA drugs by deleting or mutating the target, or by exhausting the T cells that were supposed to do the killing.",
    mechanisms: [
      { name: "BCMA antigen loss (biallelic TNFRSF17 deletion, extracellular mutations)", category: "antigen", how: "Deletion or mutation removes or alters the epitope; more common after bispecifics than CAR-T.", frequency: "~10 to 30% after bispecifics", refs: ["bcma"],
        countermeasures: [{ text: "Switch to GPRC5D-directed therapy (talquetamab, GPRC5D CAR-T) or FcRH5", refs: ["gprc5d"] }] },
      { name: "T-cell exhaustion and low fitness", category: "immune-evasion", how: "Prior lines, high tumour burden, and continuous bispecific dosing exhaust T cells; CAR-T products from heavily pretreated patients expand poorly.", refs: ["t-cell-engager", "car-t"],
        countermeasures: [{ text: "Earlier-line use (CARTITUDE-4, MajesTEC-3); fixed-duration or less frequent bispecific dosing", refs: ["ciltacabtagene-autoleucel", "teclistamab"] }] },
      { name: "Soluble BCMA decoy", category: "pharmacology", how: "Shed BCMA binds drug in circulation.", refs: ["bcma"],
        countermeasures: [{ text: "Gamma-secretase inhibitors to reduce shedding (trials)", refs: ["bcma"] }] },
    ],
    sources: [{ label: "CARTITUDE-4 (NEJM 2023)", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2303379" }],
  },
  {
    id: "cd19-car-t", drugClass: "CD19 CAR-T", exemplars: ["axicabtagene-ciloleucel", "blinatumomab"],
    tldr: "Leukaemia and lymphoma relapse after CD19 CAR-T either without CD19 (the target is gone) or with it (the CAR-T cells are gone or exhausted).",
    mechanisms: [
      { name: "CD19-negative relapse", category: "antigen", how: "Alternative splicing, mutation, or lineage switch (to myeloid) removes the CD19 epitope.", frequency: "~30 to 50% of relapses in ALL, less in lymphoma", refs: ["cd19"],
        countermeasures: [{ text: "CD22 CAR-T, CD20 bispecifics, dual-target CARs", refs: ["cd20", "glofitamab"] }] },
      { name: "CD19-positive relapse from poor CAR-T persistence", category: "pharmacology", how: "Limited expansion or early loss of CAR-T cells; 4-1BB products persist longer than CD28.", refs: ["car-t"],
        countermeasures: [{ text: "Allogeneic or in vivo re-dosing; armoured CARs", refs: ["in-vivo-car-t", "allogeneic-cell-therapy", "armored-car"] }] },
      { name: "Immunosuppressive microenvironment and T-cell exhaustion", category: "immune-evasion", how: "PD-1 upregulation, TGF-β, and myeloid suppression in lymphoma.", refs: ["pd1-checkpoint"],
        countermeasures: [{ text: "PD-1 knockout or blockade with CAR-T (trials)", refs: ["checkpoint-inhibitor"] }] },
    ],
    sources: [{ label: "ZUMA-7 OS (NEJM 2023)", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2301665" }],
  },
  {
    id: "ar-pathway", drugClass: "Androgen receptor pathway inhibitors (abiraterone, enzalutamide)", exemplars: ["capivasertib", "pluvicto", "olaparib"],
    tldr: "Prostate cancer keeps the androgen receptor working without hormones (amplification, splice variants), or abandons it and becomes a neuroendocrine cancer.",
    mechanisms: [
      { name: "AR amplification and ligand-binding-domain mutations", category: "on-target", how: "More receptor, or mutations (F877L, T878A) that turn antagonists into agonists.", frequency: "AR amplification ~30 to 50% of CRPC", refs: ["androgen-receptor", "ar-signaling"],
        countermeasures: [{ text: "AR degraders and N-terminal-domain inhibitors (trials); PSMA radioligand therapy", refs: ["protac-degrader", "pluvicto"] }] },
      { name: "AR splice variants (AR-V7)", category: "on-target", how: "Truncated receptor lacking the ligand-binding domain is constitutively active and invisible to enzalutamide.", refs: ["androgen-receptor"],
        countermeasures: [{ text: "Taxanes retain activity; N-terminal-domain inhibitors", refs: ["cytotoxic-chemotherapy"] }] },
      { name: "Lineage plasticity to neuroendocrine prostate cancer", category: "lineage", how: "RB1/TP53 loss enables transdifferentiation; AR-indifferent, DLL3-positive, PSMA-negative.", frequency: "~15 to 20% of CRPC", refs: ["dll3", "tp53"],
        countermeasures: [{ text: "Platinum-etoposide; DLL3 engagers (tarlatamab) and B7-H3 ADCs in trials", refs: ["tarlatamab", "ifinatamab-deruxtecan"] }] },
      { name: "PI3K/AKT activation via PTEN loss", category: "bypass", how: "Reciprocal feedback between AR and PI3K pathways.", frequency: "PTEN loss ~40% of mCRPC", refs: ["akt", "pi3k-akt-mtor"],
        countermeasures: [{ text: "Capivasertib + abiraterone (approved 2026 for PTEN-deficient disease)", refs: ["capivasertib"] }] },
      { name: "Glucocorticoid receptor substitution", category: "bypass", how: "GR drives an AR-like transcriptional programme under enzalutamide.", refs: ["relacorilant"],
        countermeasures: [{ text: "GR antagonists (relacorilant tested in prostate cancer)", refs: ["relacorilant"] }] },
    ],
    sources: [{ label: "CAPItello-281 (FDA approval Q2 2026, AACR digest)", url: "https://www.aacr.org/blog/2026/07/02/fda-approvals-in-oncology-april-june-2026/" }],
  },
];

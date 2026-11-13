import type { TermInput } from "@/lib/schema";

type Concept = Omit<TermInput, "kind" | "asOf"> & { asOf?: string };
const t = (x: Concept): TermInput => ({ kind: "term", asOf: "2026-11-08", ...x });

/** Evidence boundaries checked against primary methods, experimental studies and official guidance. */
export const educationRound2: TermInput[] = [
  t({
    id: "immune-product-evidence",
    name: "Immune measurements and product evidence",
    category: "Methods and models",
    tldr: "Each immune test or product-quality check answers a particular question. Connecting those questions helps explain how a proposed treatment moves from molecular measurements to evidence in people.",
    summary: "This reading map links immune-assay readouts, antigen evidence, specimen preparation, RNA design, recognition modules and product quality. It is a set of evidence questions, not a required experimental sequence. Receptor binding, cytokine release, cell killing, lot potency and clinical benefit are different observations. A useful explanation names the sample, assay, model and comparison that support the claim, including the steps that remain untested.",
    links: [
      {
        label: "Precision and linearity targets for validation of an IFNgamma ELISPOT, cytokine flow cytometry, and tetramer assay using CMV peptides.",
        url: "https://doi.org/10.1186/1471-2172-9-9"
      },
      {
        label: "Direct identification of clinically relevant neoepitopes presented on native human melanoma tissue by mass spectrometry.",
        url: "https://doi.org/10.1038/ncomms13404"
      },
      {
        label: "FDA: Potency Assurance for Cellular and Gene Therapy Products, final guidance (November 2026)",
        url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-potency-assurance-cellular-and-gene-therapy-products"
      }
    ],
    related: [
      "elispot",
      "intracellular-cytokine-staining",
      "peptide-hla-multimer-staining",
      "immune-cytotoxicity-assays",
      "tcr-repertoire-sequencing",
      "tcr-repertoire-clonality",
      "pbmc-specimens",
      "binding-presentation-recognition",
      "immunopeptidome",
      "immunopeptidomics",
      "peptide-hla-binding-prediction",
      "immunodominance",
      "epitope-spreading",
      "self-similarity-immune-recognition",
      "immunogenicity-versus-efficacy",
      "tissue-preparation-assay-fit",
      "finite-tissue-budget",
      "rna-integrity",
      "specimen-provenance",
      "mrna-construct-anatomy",
      "codon-optimization",
      "modified-rna-nucleosides",
      "in-vitro-transcription",
      "dsrna-impurities",
      "multi-epitope-constructs",
      "binder-targeting-module",
      "binder-affinity-epitope-developability",
      "binder-format-constraints",
      "scfv-vhh-formats",
      "delivery-target-versus-therapeutic-target",
      "chemistry-manufacturing-controls",
      "certificate-of-analysis",
      "manufacturing-process-comparability",
      "cell-segmentation",
      "targeted-proteomics-quantification"
    ]
  }),
  t({
    id: "elispot",
    name: "ELISpot secretion assays",
    category: "Immunology",
    tldr: "This test records spots where sampled cells release a chosen substance. A spot count describes secretion under the test conditions; other assays address recognition or killing.",
    summary: "The original enzyme-linked immunospot method counted antibody-secreting cells; cytokine versions are used to examine stimulated immune-cell responses. Cancer Vaccine Consortium proficiency panels showed that sample handling, protocol choices and plate reading affected results. A result needs the measured molecule, stimulation, cell input, background and reporting rule. A positive secretion response alone does not show that the sampled cells recognize or kill an unmodified tumor.",
    links: [
  {
    "label": "A solid-phase enzyme-linked immunospot (ELISPOT) assay for enumeration of specific antibody-secreting cells.",
    "url": "https://doi.org/10.1016/0022-1759(83)90308-3"
  },
  {
    "label": "Results and harmonization guidelines from two large-scale international Elispot proficiency panels conducted by the Cancer Vaccine Consortium (CVC/SVI).",
    "url": "https://doi.org/10.1007/s00262-007-0380-6"
  },
  {
    "label": "Precision and linearity targets for validation of an IFNgamma ELISPOT, cytokine flow cytometry, and tetramer assay using CMV peptides.",
    "url": "https://doi.org/10.1186/1471-2172-9-9"
  },
  {
    "label": "The role of IFN-γ Elispot assay in HIV vaccine research",
    "url": "https://doi.org/10.1038/nprot.2009.7"
  },
  {
    "label": "Validation of an IFN-gamma ELISpot assay to measure cellular immune responses against viral antigens in non-human primates",
    "url": "https://doi.org/10.1038/s41434-020-00214-w"
  },
  {
    "label": "ELISPOT Assay to Measure Peptide-specific IFN-γ Production.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/34541071/"
  }
],
    related: [
      "intracellular-cytokine-staining",
      "immune-cytotoxicity-assays",
      "pbmc-specimens"
    ],
    aka: [
      "ELISpot",
      "enzyme-linked immunospot",
      "IFN-gamma ELISpot"
    ]
  ,
"notes": [
  "Method card, what it measures: cells that secrete a chosen molecule, most often interferon gamma, under defined stimulation, counted as spots on an antibody-coated membrane. How: capture antibodies hold the released molecule near the cell, the cells are removed and detection reagents make localised spots visible. Input: viable cells, often PBMCs, allocated to the test. Prior culture expansion changes the measured population, and the cells are removed before the membrane spots are read. Output: spot-forming units per stated number of input cells, with background handling stated. Thresholds: response and quality rules fixed in advance for that assay and study, so one paper's positivity rule is not imported into another laboratory's report. Failure modes: high background, dead cells, weak stimulation, merged spots, inconsistent counting or failed controls. It cannot tell each receptor's target, natural tumour recognition, safety in healthy tissue or clinical benefit.",
  "Fictional arithmetic: wells with 100,000 input cells give 30 spots after peptide stimulation and 5 spots with vehicle. Background-subtracted, that is 30 minus 5 = 25 spots per 100,000 cells, or 250 spot-forming units per million input cells. This is an arithmetic summary and not a positivity cut-off, replicates, positive controls and a prespecified response rule still apply, and in mixed PBMCs it is not the frequency of a particular T-cell subset. If the cells came from an expanded culture, the number describes the cultured cells and not the responding fraction of the original blood draw.",
  "What the evidence does and does not support: the interferon gamma ELISpot is described as measuring the difference in the number of cells secreting the molecule with and without peptide, and interferon gamma is produced predominantly by natural killer and natural killer T cells as well as Th1 CD4 and CD8 effector T cells, so a mixed-cell spot does not by itself name the responding cell (Wykes and Renia protocol). In HIV vaccine research robust ELISpot responses were induced in a phase IIb trial that lacked efficacy, which challenged the assay's predictive power (Streeck 2009), and a validation in cynomolgus monkeys for responses to viral vector antigens (Yang 2022) validates that preparation and species and not cancer efficacy. Peptide added to cells can bypass the tumour's own processing and presentation, so a peptide response needs a separate bridge to natural tumour recognition.",
  "Receptor sequencing asks which receptor sequences are represented and in what relative abundance. ELISpot asks how many input cells release the chosen molecule under the stated stimulation. An expanded sequence does not establish that it caused a spot, and a spot in mixed cells does not identify a receptor sequence. Connecting identity to recognition or killing requires additional experiments with suitable controls.",
  "Spot size or intensity is not a measure of target-cell killing. A negative result remains bounded by the number and condition of input cells, the stimulus, chosen secreted molecule, culture history and response rule; it is not a census of every responding cell in the body. Assay reproducibility and a cancer-treatment benefit claim need separate evidence."
],
"asOf": "2026-11-10"
}),
  t({
    id: "intracellular-cytokine-staining",
    name: "Intracellular cytokine staining",
    category: "Immunology",
    tldr: "This test measures signaling proteins retained inside stimulated cells and identifies which stained cell groups produced them. The result describes a response in the assay.",
    summary: "An original multiparameter flow-cytometry study detected intracellular cytokine accumulation after antigen stimulation and measured several cytokines in individual cells. That study concerned viral responses, not cancer-treatment prediction. The stimulated material, measured cytokines, cell groups and analysis gates define the result. Cytokine production is distinct from direct measurement of target-cell death, and assay validation does not by itself establish clinical benefit.",
    links: [
  {
    "label": "Determination of antigen-specific memory/effector CD4+ T cell frequencies by flow cytometry: evidence for a novel, antigen-specific homeostatic mechanism in HIV-associated immunodeficiency.",
    "url": "https://doi.org/10.1172/jci119338"
  },
  {
    "label": "Precision and linearity targets for validation of an IFNgamma ELISPOT, cytokine flow cytometry, and tetramer assay using CMV peptides.",
    "url": "https://doi.org/10.1186/1471-2172-9-9"
  },
  {
    "label": "Sensitive and viable identification of antigen-specific CD8+ T cells by a flow cytometric assay for degranulation.",
    "url": "https://doi.org/10.1016/s0022-1759(03)00265-5"
  },
  {
    "label": "Standardization of cytokine flow cytometry assays.",
    "url": "https://doi.org/10.1186/1471-2172-6-13"
  },
  {
    "label": "Standardization of cytokine flow cytometry assays.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/15978127/"
  },
  {
    "label": "Cossarizza et al.: flow cytometry and cell sorting guidelines, third edition (2021)",
    "url": "https://doi.org/10.1002/eji.202170126"
  }
],
    related: [
      "flow-cytometry",
      "elispot",
      "immune-cytotoxicity-assays",
      "pbmc-specimens"
    ]
  ,
"notes": [
  "Method card, what it measures: cytokines retained inside cells during a defined assay, so a response can be assigned to stained cell populations. How: cells get a defined stimulus, a protein-transport inhibitor is present for a stated window so newly made cytokines accumulate, the cells are fixed and made permeable, and flow cytometry reads cytokine stains beside population markers, with a viability stain applied before fixation. Input: viable blood or tissue cells, with separate aliquots per stimulus, and fixed cells cannot go on to living-cell assays. Output: percent cytokine-positive cells within a named parent population, or percent with stated cytokine combinations. Controls: unstimulated or vehicle, a positive stimulation, viability and recovery, single-stain and staining-boundary controls. It cannot tell natural tumour presentation, direct target-cell killing, receptor sequence identity or clinical benefit.",
  "Precision evidence: in a study among laboratories involved in HIV clinical trials, using a common protocol and a cytomegalovirus pp65 peptide mix, mean inter-laboratory coefficients of variation ranged from 17% to 44% depending on sample type and analysis method, cryopreserved PBMC gave lower variation than whole blood, and centralised analysis with a dynamic gating template cut it by 5% to 20%. Variation was lowest (18% to 24%) for samples with more than 0.5% interferon gamma positive T cells and highest (57% to 82%) for samples below 0.1%, so gating is a major source of variability and precision falls as the responding frequency falls (Maecker 2005). That study supports protocol and gating consistency and does not validate every panel, stimulus or disease.",
  "Fictional interpretation: a report finds cells positive for both interferon gamma and tumour necrosis factor after peptide stimulation. They are double-cytokine-positive under that assay and may not be called tumour-killing, because natural tumour recognition and death of appropriate targets need separate tests, and a strong response to a broad positive control confirms assay responsiveness and not recognition of the intended peptide. Polyfunctional means meeting the assay's rules for several measured functions, so it always needs its panel and stimulus attached, and a stained subset can contain many receptors.",
  "The stimulus changes the question. Added peptide can bypass some processing steps; whole protein needs suitable antigen-presenting cells and processing, while broad stimulation tests responsiveness without identifying the intended antigen. The 2021 flow-cytometry guidelines describe brefeldin A and monensin as transport inhibitors and explain that their choice and exposure window can affect what is measured. Intracellular accumulation after inhibition is not a measurement of how much cytokine reached the surrounding medium.",
  "Cytokine-positive percentages need a named parent gate, and fluorescence intensity uses instrument-dependent units. Poor recovery, handling delays, signal overlap, altered staining after fixation or permeabilisation, background and scarce events can make a small positive population unstable, and inhibitor timing belongs to the protocol. Minimum event counts, positivity boundaries and clinical interpretation need validation for the panel, stimulus and population; there is no universal double-positive percentage that proves tumour killing or treatment benefit."
],
"asOf": "2026-11-10"
}),
  t({
    id: "peptide-hla-multimer-staining",
    name: "Peptide-HLA multimer staining",
    category: "Immunology",
    tldr: "This test labels cells whose receptors bind a particular displayed peptide under the assay conditions. It helps identify a binding population that can then be studied for function.",
    summary: "The original peptide-MHC tetramer study made soluble multimeric peptide-display complexes to identify antigen-specific T cells. Binding correlated with cytotoxicity in the tested systems, but those observations are different measurements. The chosen peptide and HLA molecule define which interaction is tested. Detecting multimer-binding cells does not by itself establish natural display of that peptide by a tumor, successful target-cell killing or a clinical treatment effect.",
    links: [
  {
    "label": "Phenotypic analysis of antigen-specific T lymphocytes.",
    "url": "https://doi.org/10.1126/science.274.5284.94"
  },
  {
    "label": "Sensitive and viable identification of antigen-specific CD8+ T cells by a flow cytometric assay for degranulation.",
    "url": "https://doi.org/10.1016/s0022-1759(03)00265-5"
  },
  {
    "label": "A robust method for production of MHC tetramers with small molecule fluorophores.",
    "url": "https://doi.org/10.1016/j.jim.2006.08.014"
  },
  {
    "label": "Cossarizza et al.: flow cytometry and cell sorting guidelines, third edition (2021)",
    "url": "https://doi.org/10.1002/eji.202170126"
  }
],
    related: [
      "binding-presentation-recognition",
      "intracellular-cytokine-staining",
      "immune-cytotoxicity-assays"
    ],
    aka: [
      "peptide-MHC multimer staining",
      "peptide-HLA tetramer staining",
      "pMHC multimer staining"
    ]
  ,
"notes": [
  "Method card, what it measures: binding of cells to a specified peptide held by a specified HLA allele, under the staining conditions. How: HLA molecules are assembled with the selected peptide and several copies are attached to a labelled scaffold (a tetramer is one format), cells are exposed and analysed, usually by flow cytometry, with viable-cell and gate selection. Input: blood or tissue cells, where staining uses a defined aliquot and compatibility with later living-cell assays depends on the preparation, and the reagent must match both peptide and allele. Thresholds: gate and positivity rules need background and reagent controls, and no universal percentage shows efficacy. Failure modes: nonspecific binding, weak binding, dead cells, a wrong or poorly formed reagent, chain differences or sampling loss. It cannot tell cytokine response, tumour-cell killing, healthy-tissue specificity or benefit.",
  "Denominators, fictional arithmetic: 100 stained cells among 10,000 gated CD8 T cells is 1%, and the same 100 among 40,000 viable acquired cells is 0.25%. Both are correct and answer different denominator questions, and neither is a body-wide census or a killing rate. A tetramer-negative result is not a census of every possible relevant receptor, because some receptors bind too weakly for a given staining method, and HLA restriction belongs to the peptide-HLA pair and not the peptide alone.",
  "What the evidence shows: in the original report, tetramers of HLA-A2 with two HIV-derived peptides or an influenza A matrix peptide bound peptide-specific cytotoxic T cells in vitro and T cells from the blood of HIV-infected people, and binding in general correlated well with cytotoxicity assays (Altman 1996). That is a correlation in those systems and not a rule that binding equals killing for an arbitrary tumour peptide. Tetramers are made by mixing biotinylated MHC with fluorescent streptavidin, and a later method made them with small-molecule fluorophores (Ramachandiran 2007), so reagent preparation is a source of variation. An observed stain shows binding under the tested conditions and does not show natural processing and display of that pair by a tumour.",
  "Connecting assays is an inference task. A multimer-binding cell with no measured cytokine response need not identify one failed biological step: reagent performance, viability, stimulation, measurement window and each assay's threshold can differ. A cytokine response still does not directly measure target-cell death. Compatible cell sorting and receptor sequencing can connect binding to an operational receptor identity, but natural tumour presentation, recognition and killing remain separate questions to test.",
  "Avidity describes the combined strength of multiple contacts. Multimerising peptide-HLA ligands can make binding detectable when an individual receptor-ligand contact is weak; the 2021 guidelines also caution that more multimerisation does not always improve detection. The measured output is a gate-defined binding fraction or, with a suitable counting method, a count. Reagent, viability and background controls support that binding measurement, which still requires separate validation before use for treatment selection."
],
"asOf": "2026-11-10"
}),
  t({
    id: "immune-cytotoxicity-assays",
    name: "Immune-cell cytotoxicity assays",
    category: "Immunology",
    tldr: "These experiments measure whether immune cells cause death of specified target cells. The target cells, comparison conditions and timing are part of the result.",
    summary: "A primary flow-cytometry method distinguished labeled target cells from immune effector cells and measured target death while characterizing the effector population. The study examined how timing and the effector-to-target ratio affected the assay. Degranulation markers provide a related functional readout, but they measure a step preceding cytolysis. Killing of a laboratory target does not establish recognition of every tumor cell or benefit in the person receiving a treatment.",
    links: [
  {
    "label": "A novel multiparametric flow cytometry-based cytotoxicity assay simultaneously immunophenotypes effector cells: comparisons to a 4 h 51Cr-release assay.",
    "url": "https://doi.org/10.1016/j.jim.2007.05.013"
  },
  {
    "label": "Sensitive and viable identification of antigen-specific CD8+ T cells by a flow cytometric assay for degranulation.",
    "url": "https://doi.org/10.1016/s0022-1759(03)00265-5"
  },
  {
    "label": "A versatile flow-based assay for immunocyte-mediated cytotoxicity.",
    "url": "https://doi.org/10.1016/j.jim.2019.112668"
  },
  {
    "label": "Cell-based flow cytometry assay to measure cytotoxic activity.",
    "url": "https://doi.org/10.3791/51105"
  }
],
    related: [
      "elispot",
      "peptide-hla-multimer-staining",
      "cell-therapy-release-testing"
    ],
    aka: [
      "immune cytotoxicity assay",
      "target-cell killing assay"
    ]
  ,
"notes": [
  "Method card, what it measures: whether specified effector cells cause death of specified target cells under controlled laboratory conditions, at a stated effector-to-target ratio and time. Readouts: flow cytometry that separates labelled targets from effectors and uses death-associated staining, release assays, or imaging over time. A fall in a metabolic or growth signal can reflect slowed growth and not death, so it needs validation as evidence of killing. Controls: target-only survival wells, effector identification and viability, a positive-control response, irrelevant or antigen-negative targets and suitable antigen or presentation perturbations, plus maximum release where relevant. Failure modes: high spontaneous death, mistaken target identity, aggregates, dye transfer, artificial loading, mismatched ratios or a readout that mainly measures growth.",
  "Background arithmetic, fictional: matched wells of 100 identifiable targets show 30% death without effectors and 40% with them at the same 2-hour endpoint. Raw death is 40%, but 30% occurs without effectors, so the excess is 40 minus 30 = 10 percentage points. That excess is associated with the tested condition and does not identify which deaths the effectors caused, and calling the result 40% immune killing is not justified. A control-normalised specific-lysis formula gives a different quantity from an excess-death calculation, so the method has to be named, and a high baseline death can make the experiment unsuitable.",
  "Scope of the methods: a flow-based assay labels targets with a dye, adds a dead-cell stain and analyses released nuclei, which lowers errors from target-effector aggregates, and it reported four nuclear staining patterns separating target and effector nuclei and live and dead cells (Rabinovich 2019). A peptide-pulsed target assay compares CFSE-low peptide-loaded and CFSE-high unloaded CD4 T-cell targets and calculates lytic units from specific lysis at several ratios (Noto 2013), so its result belongs to that artificial peptide loading, which can bypass the tumour's own processing. Degranulation (CD107 exposure) preceded cytolysis and was concordant with interferon gamma in the original report, and is distinct from completed target death (Betts 2003). Model-specific killing does not show trafficking, persistence, healthy-tissue safety or patient benefit.",
  "Keep the identities and preparation of both effector and target cells, whether a cell line, engineered target or patient-derived preparation, together with medium, effector-to-target ratio and exposure time. Culture can change the tested population. The output might be a fraction of identified targets dead, a viable target count, release under a specified normalisation, or a time curve; these are different quantities. A negative is interpretable only when cell health, target suitability and controls support the experiment, and no universal laboratory killing cut-off establishes clinical efficacy. Reproducibility and biological specificity need checking for the specimen, model and intended claim."
],
"asOf": "2026-11-10"
}),
  t({
    id: "tcr-repertoire-sequencing",
    name: "T-cell receptor repertoire sequencing",
    category: "Immunology",
    tldr: "Receptor sequencing records the immune-receptor sequences sampled from a population of cells. It can track which sequences are present and how their measured abundance changes.",
    summary: "An original sequencing study quantified rearranged T-cell receptor beta-chain sequences to examine repertoire diversity. A beta-chain repertoire is a sampled molecular measurement, not a complete map of paired receptors or the antigens they recognize. The specimen, sequencing method and definition of a clonotype belong with the result. Following a sequence over time is distinct from demonstrating its antigen specificity or the function of the cells that carry it.",
    links: [
  {
    "label": "Comprehensive assessment of T-cell receptor beta-chain diversity in alphabeta T cells.",
    "url": "https://doi.org/10.1182/blood-2009-04-217604"
  },
  {
    "label": "Phenotypic analysis of antigen-specific T lymphocytes.",
    "url": "https://doi.org/10.1126/science.274.5284.94"
  },
  {
    "label": "Linking T-cell receptor sequence to functional phenotype at the single-cell level",
    "url": "https://doi.org/10.1038/nbt.2938"
  },
  {
    "label": "High-resolution analysis of the human T-cell receptor repertoire",
    "url": "https://doi.org/10.1038/ncomms9081"
  },
  {
    "label": "TIRTL-seq: deep, quantitative and affordable paired TCR repertoire sequencing",
    "url": "https://doi.org/10.1038/s41592-025-02907-9"
  },
  {
    "label": "NCBI: the standard genetic code",
    "url": "https://www.ncbi.nlm.nih.gov/Taxonomy/Utils/wprintgc.cgi?chapter=cgencodes#SG1"
  },
  {
    "label": "Shugay et al.: towards error-free profiling of immune repertoires (MIGEC, 2014)",
    "url": "https://doi.org/10.1038/nmeth.2960"
  }
],
    related: [
      "tcr-repertoire-clonality",
      "clonality-testing",
      "peptide-hla-multimer-staining",
      "pbmc-specimens"
    ],
    aka: [
      "TCR repertoire sequencing",
      "TCR sequencing for immune monitoring"
    ]
  ,
"notes": [
  "Beta match, alpha hidden, fictional: three cells carry beta chains B, B and C, so a bulk beta-chain view lists B, B, C and loses the alpha chains. The paired view keeps alpha X with beta B, alpha Y with beta B and alpha Z with beta C, so the shared beta B does not make alpha X and alpha Y equal. Single-cell methods that sequence the alpha and beta genes of individual T cells retain each pair and can be combined with function-related gene expression, and the same TCR sequence can sit in functionally different cells (Han 2014). A bulk method profiles a mixed sample, often one chain, whereas TIRTL-seq generates paired alpha and beta repertoire data at cohort scale and is distinguished from bulk single-chain data and from single-cell throughput limits (Pogorelyy 2026). Paired identity plus an expression program is more context and is still not evidence of the receptor's antigen.",
  "Frequency arithmetic, fictional: clonotype A is 10 of 10,000 sampled receptor units at baseline (0.1%) and 20 of 1,000 later (2%). The measured relative frequency rose twentyfold, but these are sampled receptor units and not a census of cells, and other populations contracting, different sampling and method effects can change frequency. Read counts are not always cell counts, because preparation, amplification and transcript abundance can change them, and absolute expansion needs compatible cell-number evidence. A sequence overlap between blood and tumour is detected overlap under a clonotype definition and is not a target, and antigen specificity needs a matching controlled recognition experiment.",
  "Assay card: measures receptor identities, usually by the complementarity-determining region 3 of the variable region, and their measured representation in the sampled population. How: extract nucleic acid, amplify or capture receptor regions, sequence, then group and count under stated rules, which may use nucleotide or amino-acid sequence, gene segments, one chain or paired chains. Input: blood cells or tissue nucleic acid for bulk methods and compatible cell preparations for single-cell methods, and preparation consumes material. A high-resolution human repertoire method reported chain diversity without sequence-associated or quantitative restrictions (Ruggiero 2015). Failure modes: poor material, shallow sampling, amplification bias, chain mismatch, inconsistent definitions and batch effects. It cannot tell every receptor's target, tissue position, killing or benefit, and a research method is not automatically a treatment-selection test.",
  "Nucleotide and amino-acid clonotypes need not be the same grouping. The standard genetic code assigns several codons to the same amino acid, so different nucleotide sequences can encode the same receptor segment; amino-acid identity alone is not proof of one cellular lineage. MIGEC introduced molecular-identifier groups to correct PCR and sequencing errors in antibody and T-cell receptor repertoire profiling (Shugay 2014). Such error correction does not restore molecules absent from the sample. Report which chain, grouping rule and abundance unit the method actually used.",
  "A repertoire report can give a clonotype list, relative frequencies, diversity, clonality and overlap, but there is no universal expansion or clonality threshold that proves tumour specificity. A sequence found in dissociated tumour material does not locate its cell inside a cancer-cell nest. Not detected means absent from the assay result under its sampling and calling rules, while an observed overlap or change nominates a receptor for a separate controlled recognition experiment."
],
"asOf": "2026-11-10"
}),
  t({
    id: "tcr-repertoire-clonality",
    name: "T-cell receptor repertoire diversity and clonality",
    category: "Immunology",
    tldr: "Repertoire measures describe how many receptor identities are sampled and how unevenly they are represented. A dominant sequence does not tell us what its cells recognize.",
    summary: "Repertoire sequencing can describe richness and the distribution of sampled receptor sequences. Those summaries depend on the sampled population and the way receptor identities and counts are defined; the original sequencing study found diversity estimates that differed from earlier methods. A repertoire dominated by a clone is a distributional observation. It is distinct from proving tumor specificity, a malignant clone or successful tumor killing, each of which needs additional evidence.",
    links: [
  {
    "label": "Comprehensive assessment of T-cell receptor beta-chain diversity in alphabeta T cells.",
    "url": "https://doi.org/10.1182/blood-2009-04-217604"
  },
  {
    "label": "Phenotypic analysis of antigen-specific T lymphocytes.",
    "url": "https://doi.org/10.1126/science.274.5284.94"
  },
  {
    "label": "PubMed 26324409",
    "url": "https://pubmed.ncbi.nlm.nih.gov/26324409/"
  },
  {
    "label": "PubMed 24952902",
    "url": "https://pubmed.ncbi.nlm.nih.gov/24952902/"
  },
  {
    "label": "PubMed 31359002",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31359002/"
  },
  {
    "label": "PubMed 22365666",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22365666/"
  },
  {
    "label": "VDJtools: Unifying Post-analysis of T Cell Receptor Repertoires.",
    "url": "https://doi.org/10.1371/journal.pcbi.1004503"
  },
  {
    "label": "3D: diversity, dynamics, differential testing - a proposed pipeline for analysis of next-generation sequencing T cell repertoire data.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28241742/"
  },
  {
    "label": "VDJtools: diversity-index definitions",
    "url": "https://vdjtools-doc.readthedocs.io/en/master/diversity.html"
  }
],
    related: [
      "tcr-repertoire-sequencing",
      "clonality-testing",
      "immune-cytotoxicity-assays"
    ],
    aka: [
      "TCR repertoire clonality",
      "TCR repertoire diversity"
    ]
  ,
    notes: [
  "The repertoire is a distribution of receptor identities and abundances in a stated population and time. A clone is a cellular lineage; a clonotype is an operational sequence grouping. Single-chain labels and paired identities have different resolution. V(D)J assembly and thymic selection contribute diversity, while expansion changes abundance; diversity and total T-cell count are different quantities.",
  "Blood, tumour and lymph nodes sample overlapping but different populations. Infection, therapy, age and movement can change a sample; absence from one tube may reflect sampling or detection rather than whole-body absence. A pretreatment blood sample is not a complete stored repertoire. Lower measured diversity after infection may reflect a vigorous response and does not establish cancer specificity, vaccine causation or uniformly worse immunity.",
  "Fictional matched receptor samples contain 10 clonotype A cells among 1,000 T cells (1%) and 10 among 100 (10%). The sampled count remains 10; the changed denominator drives the larger fraction. Absolute expansion requires comparable sampling and calibrated counts, and neither frequency identifies antigen. State sampling depth, chain definition, compartment, method and timing.",
  "Metrics and arithmetic, fictional: with natural logarithms Shannon entropy is H = minus the sum of p times ln p, and one normalised clonality convention is 1 minus H / ln K for K observed clonotypes greater than one. Four clonotypes at 25, 25, 25 and 25 of 100 measured molecules give H = ln 4 = 1.386 and clonality 0. The same four at 70, 10, 10 and 10 give H = 0.940, clonality 1 minus 0.940 / 1.386 = 0.32, and an effective number of clonotypes exp(H) = 2.56. Richness is four in both, so many identities can coexist with strong dominance. Software may report Shannon entropy, its exponential or a normalised score, and these are not interchangeable: in the VDJtools documentation the Shannon-Wiener index returns the exponent of the entropy and the normalised index returns the entropy divided by the log of the clonotype count, which is evenness and not 1 minus that ratio, so a clonality built as 1 minus normalised entropy is a different number from either.",
  "Share against count, fictional: clonotype A is 30 of 100 measured molecules, 30%, and later 30 of 50, 60%. Its measured count did not rise, the total fell, and its relative frequency doubled, so relative enrichment is not absolute expansion and the molecule counts are not blood cell counts. In a published analysis pipeline, clonality was identified as a robust key metric and first choice for measuring TCR repertoire diversity, and in prostate cancer patients given sipuleucel-T the pipeline detected changes in sequence frequency and diversity in blood and prostate tissue (Zhang 2017); that is a methods and example study and sets no response threshold. A diversity-analysis software suite reports repertoire comparison and diversity outputs (Shugay 2015), and formulas, software settings and subsampling depth have to be stated.",
  "Measurement card: input is a sequencing-derived clonotype table and the calculation consumes no further tissue, though the upstream assay consumes its sample. Output units are a count for richness, dimensionless values for entropy and normalised clonality, and an effective clonotype count for effective diversity. Controls are matched compartments and handling, chain definition, error filtering, abundance units (reads, corrected molecules or cells are not automatically equivalent), depth assessment and replicates or resampling. Subsampling to a comparable depth helps assess sampling effects but cannot recover cells never sampled. A clonality summary does not identify what the receptors recognise, whether cells killed tumour, or whether treatment helped, and there is no universal clonality score that means an immune therapy is working.",
  "Effective-diversity measures weight a distribution differently. For the inverse-Simpson convention, define D as the sum of squared clonotype fractions and report 1 / D: four equal fractions of 0.25 give 4, whereas 0.70, 0.10, 0.10 and 0.10 give 1 / 0.52, about 1.92. This differs from the Shannon effective diversity of about 2.56 for the same uneven distribution. A fictional sample containing only A and B at 50 molecules each has richness 2 and equal weights; low richness does not imply unequal weights.",
  "For one observed clonotype, the expression 1 minus H / ln K divides by ln 1, which is zero. Report how the software handles that case rather than silently applying the formula. Low input, unequal depth, amplification bias, sequence errors, changing mixtures and inconsistent clonotype definitions can alter the result. Keep the software version, formula, filtering, input, compartment and abundance units, and inspect the distribution alongside the summary. Analytical reproducibility of a repertoire statistic does not establish a prognostic association or predict treatment benefit."
],
    asOf: "2026-11-10",
  }),
  t({
    id: "pbmc-specimens",
    name: "Peripheral blood mononuclear cell specimens",
    category: "Immunology",
    tldr: "This blood-cell preparation contains lymphocytes and monocytes used in many immune tests. Collection and handling affect which cells and responses can be measured.",
    summary: "The National Library of Medicine distinguishes mononuclear leukocytes from granulocytes and from monocytes alone. A primary study of immune monitoring in HIV vaccine research found that processing and cryopreservation conditions affected cell recovery, viability and measured antigen responses. Those were assay findings, not a validated cancer-treatment predictor. A blood preparation also samples a different compartment from a tumor biopsy; the specimen and handling conditions belong with its interpretation.",
    links: [
  {
    "label": "NLM MeSH: mononuclear leukocytes, definition",
    "url": "https://id.nlm.nih.gov/mesh/M0012412.json"
  },
  {
    "label": "Defining blood processing parameters for optimal detection of cryopreserved antigen-specific responses for HIV vaccine trials.",
    "url": "https://doi.org/10.1016/j.jim.2007.02.003"
  },
  {
    "label": "Isolation of mononuclear cells and granulocytes from human blood. Isolation of monuclear cells by one centrifugation, and of granulocytes by combining centrifugation and sedimentation at 1 g.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/4179068/"
  },
  {
    "label": "Defining blood processing parameters for optimal detection of cryopreserved antigen-specific responses for HIV vaccine trials.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/17382342/"
  },
  {
    "label": "Cossarizza et al.: flow cytometry and cell sorting guidelines, third edition (2021)",
    "url": "https://doi.org/10.1002/eji.202170126"
  },
  {
    "label": "Cytiva: isolation of mononuclear cells, separation principle and pathological blood specimens",
    "url": "https://cdn.cytivalifesciences.com/api/public/content/digi-16156-pdf"
  }
],
    related: [
      "elispot",
      "intracellular-cytokine-staining",
      "tcr-repertoire-sequencing",
      "tissue-preparation-assay-fit"
    ],
    aka: [
      "PBMC",
      "PBMCs",
      "peripheral blood mononuclear cells"
    ]
  ,
"notes": [
  "What the fraction is: peripheral blood mononuclear cells are circulating white blood cells with a single unsegmented nucleus, mainly lymphocytes and monocytes, with T, B and natural killer cells among them, isolated by layering anticoagulated blood over a density-separation medium and collecting the interface. Most conventional granulocytes and red cells separate elsewhere, but recovery is incomplete, so platelets, red cells or low-density granulocytes can contaminate a preparation, and the label PBMC does not guarantee purity. The classic density-gradient method dates from 1968 (Boyum 1968). Isolation selects a recoverable blood fraction and does not sample tumour or give a complete immune census.",
  "Handling is evidence: in HIV vaccine assay studies, the time from venipuncture to cryopreservation was the most important parameter, and blood processed at 24 hours compared with within 8 hours lost on average about 8% of PBMC viability, about 32% of cell recovery and 36% to 56% of interferon gamma T-cell frequencies by ELISpot, which led the authors to recommend cryopreservation within 8 hours (Bull 2007). That is a finding for those protocols and assays and is not a universal schedule for cancer assays. A rapidly processed baseline and a delayed follow-up can therefore confound a biological comparison, and a high viability percentage alone does not show that every population or function was preserved.",
  "Preparation card: input is anticoagulated blood or a blood-cell collection product and separation processes that aliquot and retains a selected cell fraction for compatible downstream assays. Output is recovered cell number, viable-cell percentage, recovery after thawing and measured population fractions, with cells per original blood volume needing a documented calculation. Controls are collection and processing timestamps, anticoagulant, storage, counting and viability methods and matched handling across time points. Thresholds are acceptance rules set for the intended downstream assay and not one universal quality number. Fictional case: two tubes have equally high viability but one recovered far fewer monocytes, so they are not automatically interchangeable for a whole-protein stimulation assay, because monocytes can contribute antigen presentation and viability does not show composition.",
  "The usable input for a downstream assay is the recovered viable cell preparation, not simply the volume of blood drawn. Fresh isolation, freezing, thawing, washing and any rest period define a sequence of selections, so record recovery, population composition and purity as well as viability. The Cytiva density-separation handbook describes the mononuclear interface, platelet carryover and possible immature-granulocyte contamination in pathological blood. That manufacturer method source does not validate every cancer assay, and an inadequate number of the relevant cells can make a rare-response experiment uninformative.",
  "A stored PBMC sample is a finite specimen. It does not establish immune infiltration of a tumour, preserve every function or population equally, identify antigen specificity, or guarantee enough material for every later test. In the fictional equal-viability comparison, losing monocytes can affect a whole-protein stimulation because antigen-presenting-cell composition matters; viability alone does not establish interchangeable inputs. Fit and acceptance rules belong to the intended downstream assay."
],
"asOf": "2026-11-10"
}),
  t({
    id: "binding-presentation-recognition",
    name: "Peptide binding, presentation and immune recognition",
    category: "Immunology",
    tldr: "A peptide can bind a display molecule, be displayed by a cell, or be recognized by an immune receptor. These are different questions that require different evidence.",
    summary: "Binding prediction estimates one part of antigen selection. Immunopeptidomics examines peptides recovered with HLA molecules, while immune assays investigate receptor binding and functional responses. A primary melanoma study directly identified naturally presented mutated peptides and separately tested their immunogenicity. A consortium study likewise evaluated prediction against measured immune interactions. A candidate supported at one stage should retain that evidence level rather than being described as a demonstrated therapeutic target.",
    links: [
  {
    "label": "Direct identification of clinically relevant neoepitopes presented on native human melanoma tissue by mass spectrometry.",
    "url": "https://doi.org/10.1038/ncomms13404"
  },
  {
    "label": "Key Parameters of Tumor Epitope Immunogenicity Revealed Through a Consortium Approach Improve Neoantigen Prediction.",
    "url": "https://doi.org/10.1016/j.cell.2020.09.015"
  },
  {
    "label": "NetMHCpan-4.0: Improved Peptide-MHC Class I Interaction Predictions Integrating Eluted Ligand and Peptide Binding Affinity Data.",
    "url": "https://doi.org/10.4049/jimmunol.1700893"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.1093/nar/gkaa379"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.1038/s41596-019-0133-y"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.1126/science.274.5284.94"
  }
],
    related: [
      "neoantigen",
      "immunopeptidome",
      "peptide-hla-binding-prediction",
      "peptide-hla-multimer-staining",
      "immune-cytotoxicity-assays"
    ]
  ,
"notes": [
  "Peptide-to-HLA binding and TCR-to-peptide-HLA binding are different contacts. Evidence maps to claims: a binding prediction supports a model estimate for one exact peptide and allele (Reynisson et al., 2020, PMID 32406916); measured binding supports binding under that assay; immunopeptidomics supports association with the recovered preparation (Purcell et al., 2019, PMID 31092913), not guaranteed cancer-cell origin, surface location or complete recovery; peptide-HLA multimer staining shows cells binding a defined reagent (Altman et al., 1996, PMID 8810254), not affinity or killing; only a controlled response to naturally presenting target cells supports recognition or the measured function. Supplied-peptide stimulation can bypass processing, and secretion and target-cell death are different outputs."
],
"asOf": "2026-11-09"
}),
  t({
    id: "immunopeptidome",
    name: "Immunopeptidome",
    category: "Immunology",
    tldr: "The immunopeptidome is the collection of peptides associated with immune display molecules in a particular biological setting. A measurement recovers a view of that collection through a defined assay.",
    summary: "An immunopeptidome concerns displayed peptide ligands, rather than every protein or RNA message in a sample. Direct analysis of native melanoma tissue identified HLA-associated peptides, including some containing tumor mutations. What is recovered depends on the tissue and analytical workflow. The observed collection should retain its sample and method, and identifying a displayed peptide remains distinct from showing an immune response to it.",
    links: [
  {
    "label": "Direct identification of clinically relevant neoepitopes presented on native human melanoma tissue by mass spectrometry.",
    "url": "https://doi.org/10.1038/ncomms13404"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.1074/mcp.tir117.000383"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.3389/fimmu.2019.00141"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.1038/s41467-021-23713-9"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.1038/s41587-019-0322-9"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.1038/s41596-019-0133-y"
  }
],
    related: [
      "immunopeptidomics",
      "binding-presentation-recognition",
      "proteomics"
    ],
    aka: [
  "HLA ligandome",
  "HLA peptidome"
]
  ,
"notes": [
  "The immunopeptidome is a biological repertoire in a defined cell population and context; an immunopeptidomics list is a method-dependent subset recovered and identified from a sample. Class I and class II repertoires are separate, and a protein can be abundant while a derived peptide is poorly generated, loaded or retained. Inflammatory signals changed peptide patterns in cancer cell lines (Chong et al., 2018, ovarian cancer cells and interferon gamma, PMID 29242379; Javitt et al., 2019, lung cancer cells and TNF-alpha and interferon gamma acting through HLA-B, PMID 30833945), which shows context-dependent remodelling and not that inflammation adds useful targets. Whole-lysate capture can recover intracellular as well as surface complexes, mixed tissue adds cancer, immune and stromal sources, relative instrument intensity is not surface copies per cell, and a reported sequence can be misassigned (Wilhelm et al., 2021, PMID 34099720). Method B identifying 1,200 peptides against method A's 800 (fictional) shows no biological difference. Sarkizova et al. (2020) gives allele-dependent repertoires from mono-allelic lines."
],
"asOf": "2026-11-09"
}),
  t({
    id: "immunopeptidomics",
    name: "Immunopeptidomics",
    category: "Methods and models",
    tldr: "This laboratory approach identifies peptides recovered with immune display molecules. It supplies evidence about peptide presentation in the material that was analyzed.",
    summary: "A primary melanoma study used mass spectrometry to identify HLA-associated peptides from native tumor tissue and then evaluated selected mutated peptides with immune assays. This is stronger evidence of natural presentation in the sampled material than a binding prediction alone. The analytical observation still has a defined specimen and workflow. It does not automatically establish the abundance of a ligand on every cancer cell, receptor recognition or a treatment effect. A published protocol isolates MHC-peptide complexes by immunoaffinity capture, dissociates the peptides by acid denaturation, fractionates them by HPLC and identifies them by nano-UPLC tandem mass spectrometry, from cell lines and tissues (Purcell and colleagues, 2019). Capture starts from mild-detergent solubilised lysates (Chong and colleagues, 2018; Sarkizova and colleagues, 2020 immunoprecipitated HLA from soluble lysates), so a lysate is not a surface-only survey, and in multi-allele samples a peptide was assigned to the best-scoring allele or alleles by computation (Sarkizova and colleagues, 2020). Identification depends on the analysis: a deep-learning model trained on more than 300,000 synthetic peptides improved HLA peptide identification up to 7-fold and indicated that 87 per cent of the proposed proteasomally spliced HLA peptides may be incorrect (Wilhelm and colleagues, 2021). A quantitative tissue study isolated peptide-HLA complexes from snap-frozen tissue and used formalin-fixed paraffin-embedded blocks only for histology (Science Translational Medicine, 2022).",
    links: [
  {
    "label": "Direct identification of clinically relevant neoepitopes presented on native human melanoma tissue by mass spectrometry.",
    "url": "https://doi.org/10.1038/ncomms13404"
  },
  {
    "label": "Key Parameters of Tumor Epitope Immunogenicity Revealed Through a Consortium Approach Improve Neoantigen Prediction.",
    "url": "https://doi.org/10.1016/j.cell.2020.09.015"
  },
  {
    "label": "Purcell et al., Mass spectrometry-based identification of MHC-bound peptides for immunopeptidomics (Nature Protocols 2019)",
    "url": "https://doi.org/10.1038/s41596-019-0133-y"
  },
  {
    "label": "Chong et al., High-throughput and Sensitive Immunopeptidomics Platform Reveals Profound Interferon-gamma-Mediated Remodeling of the Human Leukocyte Antigen Self-Peptidome (Molecular and Cellular Proteomics 2018)",
    "url": "https://doi.org/10.1074/mcp.TIR117.000383"
  },
  {
    "label": "Wilhelm et al., Deep learning boosts sensitivity of mass spectrometry-based immunopeptidomics (Nature Communications 2021)",
    "url": "https://doi.org/10.1038/s41467-021-23713-9"
  },
  {
    "label": "Quantitative immunopeptidomics reveals a tumor stroma-specific target for T cell therapy (Science Translational Medicine 2022)",
    "url": "https://doi.org/10.1126/scitranslmed.abo6135"
  },
  {
    "label": "A large peptidome dataset improves HLA class I epitope prediction across most of the human population (Nature Biotechnology 2020)",
    "url": "https://doi.org/10.1038/s41587-019-0322-9"
  }
],
    related: [
      "immunopeptidome",
      "peptide-hla-binding-prediction",
      "binding-presentation-recognition",
      "finite-tissue-budget"
    ]
  ,
"notes": [
  "Reading guide (OnCo inference). In a mixed specimen a recovered HLA-associated peptide does not reveal its cell of origin or its abundance on living cell surfaces. Non-detection does not show biological absence: it also reflects capture, allele coverage, the searchable sequence set and instrument and software sensitivity, and detection does not show safe tumour recognition. No source read here establishes that formalin-fixed tissue is usable for an assay validated on cells or frozen tissue; the lesson's statement that one protocol proposed an adaptation could not be checked (publisher page unavailable), so that claim is withheld and compatibility must be shown for the named method.",
  "Fictional worked example. A specimen yields peptide A but not peptide B. A has measured support in that preparation. For B, ask whether its allele was recovered, whether the altered sequence was searchable and whether sensitivity was adequate; 'A detected, B absent everywhere' is stronger than the experiment supports. If B is simply missing from the search database it could not have been identified as configured, so its absence is not a clean biological negative, and correcting the database does not by itself guarantee recovery or prove natural display.",
  "Reading guide: binding prediction estimates a model output, whereas immunopeptidomics identifies recovered peptides, and total-protein measurements are a different question from HLA-associated fragments (a protein can be abundant without any of its peptides being displayed, an inference); presentation, immune response and efficacy are three separate claims.",
  "Measurement card in words (a reading guide). Input: which tissue preparation and preservation are compatible, and how much material is consumed. Output and units: peptide identities and unique-sequence counts; instrument intensities are method-dependent and not copies per cell. Identification threshold: the sequence database, the false-discovery rule (spectrum or peptide level) and the supporting spectra. Coverage: which HLA classes and alleles were captured and which allele assignments were measured or inferred. Material and cost: protocol-specific input, preservation, consumption, turnaround and analysis cost, requested before a scarce specimen is used. Validation: recovery, reproducibility and reference-peptide checks for the method. Failure modes: low input, poor recovery, mixed cell populations, database gaps and wrong sequence assignments. Limits: non-detection does not prove absence and detection does not prove safe recognition; there is no universal tissue requirement or detection threshold."
],
"asOf": "2026-11-10"
}),
  t({
    id: "peptide-hla-binding-prediction",
    name: "Peptide-HLA binding and ligand prediction",
    category: "Methods and models",
    tldr: "A computer model can prioritize peptides expected to bind an immune display molecule or appear among its ligands. The prediction helps select candidates for testing.",
    summary: "NetMHCpan-4.0 combined peptide-binding affinity data with eluted-ligand data, which also contain information about processing and natural presentation. Those training signals and prediction tasks should be distinguished. A consortium comparison assessed candidate tumor epitopes using measured immune interactions and developed improved prioritization features. A model score is a prediction with a validation setting; it is not an observation of peptide display, tumor recognition or patient benefit. The NetMHCpan-4.1 documentation expresses binder thresholds as percentile rank, the position of a predicted score against the scores of random natural peptides, and lets the user set the strong and weak binder thresholds, so a 0.4 per cent rank places a candidate within the top 0.4 per cent of that reference and is not a 99.6 per cent probability of presentation, recognition or benefit. The server predicts binding of a peptide to an MHC molecule of known sequence, and its model is trained on more than 850,000 binding-affinity and mass-spectrometry eluted-ligand peptides, two different training signals (Reynisson and colleagues, 2020). A model trained on more than 185,000 peptides eluted from 95 single-allele cell lines improved prediction of presented peptides (Sarkizova and colleagues, 2020). In a consortium study, 608 predicted epitopes were then tested for T-cell binding in patient-matched samples, a separate experiment from the prediction (Wells and colleagues, 2020), so expression, processing, display, T-cell receptor recognition and sparing of healthy tissue remain to be shown after a favourable score.",
    links: [
  {
    "label": "NetMHCpan-4.0: Improved Peptide-MHC Class I Interaction Predictions Integrating Eluted Ligand and Peptide Binding Affinity Data.",
    "url": "https://doi.org/10.4049/jimmunol.1700893"
  },
  {
    "label": "Key Parameters of Tumor Epitope Immunogenicity Revealed Through a Consortium Approach Improve Neoantigen Prediction.",
    "url": "https://doi.org/10.1016/j.cell.2020.09.015"
  },
  {
    "label": "NetMHCpan-4.1 server documentation",
    "url": "https://services.healthtech.dtu.dk/services/NetMHCpan-4.1/"
  },
  {
    "label": "NetMHCpan-4.1 and NetMHCIIpan-4.0: improved predictions of MHC antigen presentation by concurrent motif deconvolution and integration of MS MHC eluted ligand data (Nucleic Acids Research 2020)",
    "url": "https://doi.org/10.1093/nar/gkaa379"
  },
  {
    "label": "A large peptidome dataset improves HLA class I epitope prediction across most of the human population (Nature Biotechnology 2020)",
    "url": "https://doi.org/10.1038/s41587-019-0322-9"
  },
  {
    "label": "Cer et al., IC50-to-Ki: conversion assumptions for enzyme inhibition and ligand binding (Nucleic Acids Research 2009)",
    "url": "https://doi.org/10.1093/nar/gkp253"
  }
],
    related: [
      "binding-presentation-recognition",
      "immunopeptidomics",
      "neoantigen"
    ],
    aka: [
      "peptide-MHC binding prediction",
      "HLA ligand prediction"
    ]
  ,
"notes": [
  "Assay distinction. A predicted binding IC50 estimates a competitive-binding assay endpoint. An IC50 depends on the assay conditions and is not automatically an equilibrium dissociation constant. Cer and colleagues' 2009 IC50-to-Ki tool calculates binding or inhibition constants using the interaction mechanism, concentrations and other assumptions; this is a biochemical distinction, not validation of an HLA model or a measure of cancer-cell growth inhibition. Reading guide (OnCo inference): Record the model and version, allele, peptide length, prediction task, units, reference distribution and threshold beside every score, and do not put a rank and an IC50 in one unlabelled column. A threshold is a selection rule for a stated workflow and cannot repair the wrong allele or an unsupported task. Inputs are peptide or source-protein sequences and an exact allele; scoring uses no tumour tissue; held-out validation, allele coverage and the endpoint (binding, recovery or T-cell recognition) decide what a good score means.",
  "Figure reading (fictional numbers, light and dark renders agree): a 1,000-score reference for HLA-A*02:01 9-mer peptides has bin counts 250, 240, 200, 130, 80, 50, 30, 16 and 4, which sum to 1,000. Four reference scores lie beyond the candidate boundary, so 4 / 1,000 x 100 = 0.4 per cent. A separate binding-affinity output of 40 nM is a predicted IC50. Neither value observes display.",
  "Fictional worked example. Candidate A has an eluted-ligand rank of 0.4 per cent and candidate B a predicted binding IC50 of 40 nM. The numbers come from different outputs with different units and tasks, so neither ranks the candidates against each other or shows tumour coverage; request matched outputs for the relevant allele and method, and test display and recognition separately.",
  "Output table in words. Predicted binding IC50 in nanomolar units: lower values mean stronger predicted competitive binding for that output, and it is not a measured concentration, an equilibrium dissociation constant or a functional T-cell response. Percentile rank: a lower rank places the candidate nearer the model's stronger-scoring reference peptides, and it is not a percent chance of tumour killing or the fraction of tumour cells covered."
],
"asOf": "2026-11-10"
}),
  t({
    id: "immunodominance",
    name: "Immunodominance",
    category: "Immunology",
    tldr: "Immune responses to a set of possible targets are often uneven. Some epitopes attract a stronger measured response than others in the same setting.",
    summary: "A primary mouse experiment showed that T-cell populations could compete for access to antigen-bearing presenting cells, changing responses to dominant and subdominant epitopes. That identifies one mechanism of immunodominance in the studied system. It does not supply a universal ranking of human tumor epitopes. The antigen design, presentation context and responding repertoire all need to remain attached to an observation of a dominant response.",
    links: [
  {
    "label": "T cells compete for access to antigen-bearing antigen-presenting cells.",
    "url": "https://doi.org/10.1084/jem.192.8.1105"
  },
  {
    "label": "PubMed 18641351",
    "url": "https://pubmed.ncbi.nlm.nih.gov/18641351/"
  },
  {
    "label": "PubMed 21367907",
    "url": "https://pubmed.ncbi.nlm.nih.gov/21367907/"
  },
  {
    "label": "PubMed 33038342",
    "url": "https://pubmed.ncbi.nlm.nih.gov/33038342/"
  }
],
    related: [
      "epitope",
      "multi-epitope-constructs",
      "tcr-repertoire-clonality"
    ]
  ,
    notes: [
  "Immunodominance is a contextual hierarchy of measured responses, distinct from encoded target count and from epitope spreading. Presentation, precursor frequency, repertoire, priming, HLA, delivery, immune history, tissue and time can change the hierarchy. A favourable binding prediction does not establish immunogenicity, and more encoded targets do not guarantee balanced immunity or independent tumour coverage.",
  "Naive precursor frequency is the starting abundance of cells with a relevant specificity. Mouse LCMV and human HLA-A2-restricted HCV experiments linked precursor frequencies to response hierarchies. Binding alone did not strictly predict the hierarchy. These studies provide no universal cancer-vaccine weights, human marker requirement or instruction to remove dominant clones.",
  "Fictional matched IFN-gamma ELISpot means of 45, 11 and 5 spots for A, B and C, minus matched background 5, give 40, 6 and 0 spots per 200,000 plated PBMCs. A dominates that measured response. Protocol replicate and positivity rules classify C as undetectable. Zero adjusted spots do not prove absent tumour display or universal uselessness, nor do three encoded sequences imply three equally effective responses.",
  "A measured hierarchy needs offered targets, compartment, cell denominator, baseline, timing, matched per-target stimulation, background and positive controls. Detection thresholds and in vitro expansion can alter apparent ranking. Peptide response is not evidence of natural tumour display or tumour-cell killing."
],
    asOf: "2026-11-09",
  }),
  t({
    id: "epitope-spreading",
    name: "Epitope spreading",
    category: "Immunology",
    tldr: "An immune response can broaden to recognize additional epitopes over time. Showing that broadening requires measurements of the added specificities.",
    summary: "A follow-up study of a small melanoma neoantigen-vaccine cohort found persistent immune responses, evolving receptor clonotypes and evidence of responses beyond the original vaccine targets. The report provides clinical immune-monitoring evidence of spreading in that cohort. The response measurements are distinct from a randomized estimate of treatment benefit. Spreading should not be inferred solely from an increased total lymphocyte count or expansion of an unidentified receptor sequence.",
    links: [
  {
    "label": "Personal neoantigen vaccines induce persistent memory T cell responses and epitope spreading in patients with melanoma.",
    "url": "https://doi.org/10.1038/s41591-020-01206-4"
  },
  {
    "label": "PubMed 33479501",
    "url": "https://pubmed.ncbi.nlm.nih.gov/33479501/"
  },
  {
    "label": "PubMed 28678778",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28678778/"
  }
],
    related: [
      "immunogenicity-versus-efficacy",
      "tcr-repertoire-sequencing",
      "immunodominance"
    ]
  ,
    notes: [
  "Epitope spreading is additional detected recognition beyond the initially targeted epitope set, potentially within one source protein or across proteins. More response to the same target is expansion. Responses to both directly encoded A and B do not themselves demonstrate spreading. Newly detected is not newly created: baseline sensitivity can miss pre-existing responsive cells.",
  "Tumour injury can release additional antigen for uptake and presentation, but one follow-up response does not establish that entire causal chain. Define peptide-HLA targets and compare matched baseline and follow-up assays with background, presentation and cross-reactivity controls; assess intervening treatment. Vaccine recruitment or expansion does not normally rewrite mature TCRs. An immune response, including one to healthy self, does not establish recurrence prevention, safety or clinical benefit.",
  "In a fictional A/B vaccine experiment, baseline C is undetectable and matched follow-up detects unencoded C, consistent with an additional detected specificity. The A-cell icons are qualitative, not counts. Ten additional receptor sequences without target testing demonstrate repertoire change, not recognition of C; causation and patient benefit remain separate questions."
],
    asOf: "2026-11-09",
  }),
  t({
    id: "self-similarity-immune-recognition",
    name: "Self-similarity and immune-recognition specificity",
    category: "Immunology",
    tldr: "A receptor may recognize more than one related peptide. Target-selection evidence needs to address recognition of healthy tissue as well as the intended target.",
    summary: "A primary investigation of an affinity-enhanced MAGE-A3-directed receptor identified cross-recognition of a peptide from titin after unexpected cardiac toxicity. This was a particular engineered-receptor program, not a toxicity rate for all T-cell therapies or neoantigen vaccines. It illustrates why target-gene expression and a sequence match alone are insufficient descriptions of receptor specificity. Proposed-target recognition and off-target recognition need evidence in relevant systems.",
    links: [
  {
    "label": "Identification of a Titin-derived HLA-A1-presented peptide as a cross-reactive target for engineered MAGE A3-directed T cells.",
    "url": "https://doi.org/10.1126/scitranslmed.3006034"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.1182/blood-2013-03-490565"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.1038/s41586-022-04735-9"
  },
  {
    "label": "Primary tolerance mechanism experiment (PubMed 3260350)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/3260350/"
  },
  {
    "label": "Primary tolerance mechanism experiment (PubMed 3029267)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/3029267/"
  },
  {
    "label": "Primary tolerance mechanism experiment (PubMed 7636184)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/7636184/"
  }
],
    related: [
      "binding-presentation-recognition",
      "binder-affinity-epitope-developability",
      "tcr-t"
    ],
    aka: [
      "peptide self-similarity and immune specificity",
      "TCR cross-recognition"
    ]
  ,
"notes": [
  "Central and peripheral tolerance include distinct mechanisms. Kisielow and colleagues demonstrated deletion of self-reactive developing cells in an H-Y-receptor transgenic mouse model. Jenkins and Schwartz demonstrated antigen-related unresponsiveness after altered antigen presentation in mouse experiments, and Sakaguchi and colleagues linked a CD4/CD25 regulatory population to prevention of autoimmunity in mice. These are mechanistic examples, rather than universal human response or safety thresholds. A tumour-specific mutation can make a peptide distinguishable from its normal counterpart, but display and a responsive receptor are still needed, and there is no universal percentage of identity that makes a target safe. Higher receptor affinity is not automatically more selective. Receptors can cross-react with peptides from unrelated proteins, as in the titin peptide recognised by the MAGE-A3-directed receptor (Cameron et al., 2013, PMID 23926201; Linette et al., 2013, PMID 23770775). Luksza et al. (Nature 2022, PMID 35589842) modelled neoantigen quality, using non-selfness and selfness, in pancreatic cancer survivors; the model is not a clinical safety rule. In a loaded-peptide concentration series, compare mutant and normal peptides at the same concentration with the same HLA and responder; artificial loading leaves natural processing open and a response threshold is not a patient safety threshold."
],
"asOf": "2026-11-09"
}),
  t({
    id: "immunogenicity-versus-efficacy",
    name: "Immunogenicity and clinical efficacy",
    category: "Endpoints",
    tldr: "An intervention can produce a measurable immune response. Whether it improves a clinical outcome is a separate question about people receiving the intervention.",
    summary: "A phase 1 personal neoantigen-vaccine report and its follow-up examined immune responses in small melanoma cohorts. Such work can demonstrate biological activity, persistence and broadening of responses. It does not by itself isolate the treatment effect on recurrence or survival from other explanations. An immune-assay endpoint, a clinical outcome and a comparative efficacy estimate should retain their distinct definitions and study designs.",
    links: [
  {
    "label": "An immunogenic personal neoantigen vaccine for patients with melanoma.",
    "url": "https://doi.org/10.1038/nature22991"
  },
  {
    "label": "Personal neoantigen vaccines induce persistent memory T cell responses and epitope spreading in patients with melanoma.",
    "url": "https://doi.org/10.1038/s41591-020-01206-4"
  },
  {
    "label": "An immunogenic personal neoantigen vaccine for patients with melanoma.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28678778/"
  },
  {
    "label": "FDA: oncology clinical-trial endpoints (2018)",
    "url": "https://www.fda.gov/media/71195/download"
  },
  {
    "label": "OncoGuide: immunogenicity-vs-efficacy (pinned teaching source)",
    "url": "https://github.com/jasonlaster/oncoguide/blob/c96896452386202405c435aa161bc5047919337a/wiki/education/concepts/evidence-and-statistics/endpoints/immunogenicity-vs-efficacy.md"
  },
  {
    "label": "OncoGuide: positive immune assay, recurrence and combined-treatment attribution",
    "url": "https://github.com/jasonlaster/oncoguide/blob/c96896452386202405c435aa161bc5047919337a/wiki/education/guides/personalized-cancer-vaccine/08-dosing-and-measuring-response.md#worked-example-a-positive-assay-and-a-recurrence"
  },
  {
    "label": "OncoGuide: receptor changes and tumour-DNA attribution",
    "url": "https://github.com/jasonlaster/oncoguide/blob/c96896452386202405c435aa161bc5047919337a/wiki/education/guides/how-the-immune-system-fights-cancer/08-measure-a-response.md#try-it"
  }
],
    related: [
      "elispot",
      "immune-cytotoxicity-assays",
      "surrogate-validation",
      "binding-presentation-recognition"
    ]
  ,
"asOf": "2026-11-10",
"notes": [
  "Immunogenicity asks whether an intervention elicits an immune response; clinical efficacy asks what adding it changes in a defined clinical endpoint, population and comparison. An immune result can justify further investigation without settling whether adding the intervention improves outcomes. For a therapeutic cancer vaccine, antigen-stimulated secretion and recurrence over follow-up answer different questions. The immune result needs its specimen, stimulus, preparation, timing, controls and denominator. The clinical result needs the intervention components, comparator, outcome rule, starting clock, follow-up, missing-data handling, harms and uncertainty. A surrogate endpoint also needs evidence connecting it to clinical benefit in that setting. Comparing standard care plus vaccine with the same care without vaccine can address the addition. Randomisation strengthens attribution, while measurement quality and follow-up remain necessary. Even a clinical outcome difference does not identify the particular clone or immune mechanism that caused it. The FDA's 2018 endpoint guidance informs these general distinctions, rather than current regulatory or treatment advice.",
  "ELISpot measures secretion under defined stimulation. Supplying peptide can bypass natural processing, and laboratory expansion changes which cells and states are measured. In the 2017 phase I melanoma vaccine study by Ott and colleagues, the selected assay passages distinguish direct ex vivo measurements from responses detected after peptide-driven expansion. That specific study supports assay interpretation; it is not an added-benefit comparison for every vaccine. A change in receptor frequency alone establishes neither antigen specificity nor vaccine-induced function, and a weak blood signal can miss responses in tissue. Natural tumour recognition, location, function and safety require their own evidence.",
  "Consider a fictional single-arm vaccine study in which peptide-reactive cells appear and some participants later recur. The measured immune response can remain real. Recurrence does not identify whether natural antigen display, tissue access, cell state or immune escape limited its effect, and without a suitable clinical comparison the recurrence frequency cannot isolate the vaccine's contribution from standard care or selection. In a second fictional example, circulating tumour DNA becomes undetectable after standard treatment plus vaccine. This tumour-derived DNA result is not an immune measurement. Timing, treatment effects, sampling and detection limits prevent attributing clearance to the vaccine alone. These observations supply no calculable added-efficacy estimate and do not prove an effect of zero.",
  "A related fictional example finds a clone becoming more frequent after treatment while circulating tumour DNA is no longer detected. This establishes a receptor-repertoire change alongside a tumour-DNA result, not that the clone eliminated the cancer. Relative frequency can rise because that clone increased, others declined, or both. Tumour specificity, function, causal attribution and assay detection limits remain separate questions, and timing, other treatments, shedding and sampling can also shape a tumour-DNA result. Suitable comparisons and target-specific experiments strengthen attribution; temporal coincidence alone does not supply it."
]
}),
  t({
    id: "tissue-preparation-assay-fit",
    name: "Tissue preparation and assay suitability",
    category: "Diagnostics & imaging",
    tldr: "Fixed, frozen and living tissue preserve different properties. A preparation that works for one test may not support another.",
    summary: "Paired-specimen studies found that fixation and extraction changed nucleic-acid measurements relative to fresh-frozen material. Viable organoid studies examine a different property: whether living cells can establish the studied culture. Preserved morphology, recoverable DNA or RNA, and viable cell behavior are therefore different specimen requirements. No preparation is universally best; the intended measurement and evidence for that particular workflow determine suitability.",
    links: [
  {
    "label": "Next-generation sequencing of RNA and DNA isolated from paired fresh-frozen and formalin-fixed paraffin-embedded samples of human cancer and normal tissue.",
    "url": "https://doi.org/10.1371/journal.pone.0098187"
  },
  {
    "label": "The Biospecimen Preanalytical Variables Program: A Multiassay Comparison of Effects of Delay to Fixation and Fixation Duration on Nucleic Acid Quality.",
    "url": "https://doi.org/10.5858/arpa.2018-0172-oa"
  },
  {
    "label": "A Living Biobank of Breast Cancer Organoids Captures Disease Heterogeneity.",
    "url": "https://doi.org/10.1016/j.cell.2017.11.010"
  },
  {
    "label": "NCI Biospecimen Evidence-Based Practices: snap-freezing of post-surgical tissue",
    "url": "https://dctd.cancer.gov/data-tools-biospecimens/snap-freeze-bebp.pdf"
  },
  {
    "label": "Biospecimen & Biorepository Basics - NCI",
    "url": "https://dctd.cancer.gov/data-tools-biospecimens/biospecimens-biobanks/basics"
  },
  {
    "label": "Surgical Pathology Reports - NCI",
    "url": "https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/pathology-reports-fact-sheet"
  },
  {
    "label": "Analysis of chemical modification of RNA from formalin-fixed samples and optimization of molecular biology applications for such samples.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/10536153/"
  },
  {
    "label": "Organoid Modeling of the Tumor Immune Microenvironment.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/30550791/"
  }
],
    related: [
      "preanalytics-sample-stabilisation",
      "rna-integrity",
      "finite-tissue-budget",
      "organoids"
    ],
    aka: [
      "FFPE versus fresh-frozen versus viable tissue",
      "specimen fitness for purpose"
    ]
  ,
"notes": [
  "Formalin-fixed paraffin-embedded material preserves architecture and supports assays validated for its altered molecules, but cannot restore the original living cells. Snap-freezing preserves material for molecular analysis; the NCI protocol excludes viability, sorting and culture endpoints. A viable-cell vial requires verified recovery, identity and function for its intended assay. No preparation label measures tumour content.",
  "Masuda experimentally demonstrated chemical modifications of fixed RNA and effects on amplification. Recovering RNA or DNA does not undo fixation or establish a viable cell. Fixed material can still support suitable molecular assays. Fresh and frozen labels describe handling history rather than a verified fraction of living malignant cells.",
  "Fictional archive: a fixed block, a snap-frozen piece and a vial labelled viable are offered for a cell-growth perturbation. None of these labels alone establishes suitability. The fixed block cannot supply its original living cells; the frozen piece may not be preserved for viable recovery; the viable vial needs recovery, relevant cell identity and model function checked. A successful culture can select a changed cell mixture rather than reproduce the archive.",
  "Preparation can irreversibly close options. If fixed molecular assays and living-cell experiments are both contemplated, their inputs and separate aliquots need planning before processing, while protecting diagnostic requirements. There is no universally best preparation; dividing finite tissue also has a cost.",
  "Assess suitability by documenting preservation, checking which cells are represented and applying quality checks for the intended assay or living-cell workflow. Sections, tissue pieces and cell aliquots are finite, and destructive quality checks also use material. Report analyte-appropriate yield and quality, or viable-cell recovery and function when those are required. The receiving method defines acceptance: a preservation label alone guarantees no pass. Delayed stabilisation, incompatible fixative, degraded analyte, poor thaw recovery and missing target cells can defeat the question. Validation on fixed tissue does not automatically transfer to frozen or cultured material, and input suitability alone proves neither clinical accuracy, tumour-wide representation nor patient drug response."
],
"asOf": "2026-11-10"
}),
  t({
    id: "finite-tissue-budget",
    name: "Finite tissue and specimen allocation",
    category: "Diagnostics & imaging",
    tldr: "Sections, extractions and destructive tests consume stored tissue. Planning several tests requires knowing what material remains and which uses it must support.",
    summary: "NCI biospecimen guidance places pathology oversight of tissue release alongside the need to protect complete medical evaluation. It also treats divided and extracted material as traceable derivative samples. A thoracic small-specimen guideline addresses triage and handling for multiple ancillary studies in its own clinical scope. The general resource issue is finite material, not a universal order of tests: remaining tissue and assay requirements need to be established for the actual specimen.",
    links: [
  {
    "label": "NCI Best Practices for Biospecimen Resources, fourth edition (2026)",
    "url": "https://dctd.cancer.gov/data-tools-biospecimens/biospecimens-biobanks/resources/best-practices/biospecimen-resources/intro"
  },
  {
    "label": "Collection and Handling of Thoracic Small Biopsy and Cytology Specimens for Ancillary Studies: Guideline From the College of American Pathologists in Collaboration With the American College of Chest Physicians, Association for Molecular Pathology, American Society of Cytopathology, American Thoracic Society, Pulmonary Pathology Society, Papanicolaou Society of Cytopathology, Society of Interventional Radiology, and Society of Thoracic Radiology.",
    "url": "https://doi.org/10.5858/arpa.2020-0119-cp"
  },
  {
    "label": "Biospecimen & Biorepository Basics - NCI",
    "url": "https://dctd.cancer.gov/data-tools-biospecimens/biospecimens-biobanks/basics"
  },
  {
    "label": "CAP practical breast grossing guide excerpt",
    "url": "https://documents-cloud.cap.org/pdf/Grossing_Sample.pdf"
  },
  {
    "label": "NCI Biospecimen Evidence-Based Practices: snap-freezing of post-surgical tissue",
    "url": "https://dctd.cancer.gov/data-tools-biospecimens/snap-freeze-bebp.pdf"
  }
],
    related: [
      "specimen-provenance",
      "tissue-preparation-assay-fit",
      "preanalytics-sample-stabilisation",
      "biopsy"
    ],
    aka: [
      "finite tissue budget",
      "tissue allocation for testing"
    ]
  ,
"notes": [
  "Cutting sections moves material from the block onto slides; extraction consumes a portion and loses its original architecture. Stored images and datasets can be copied and reanalysed but cannot refill the archive. A newly collected biopsy is another procedure and time point, and a growing culture is a changed system rather than replenishment of the original specimen.",
  "An aliquot is an allocated portion. Retain site, date, treatment context, preservation, region, quantity, prior uses, remaining material, permissions and custody. A block list or ten remaining slides does not prove that relevant malignant cells remain. Returning a block does not replace extracted tissue.",
  "Fictional small block: one proposed extraction remains possible after diagnostic needs are protected, while two teams request overlapping RNA tests. Compare questions, validated inputs, existing-data reuse, permissions and expected material use with pathology before allocation. No universal section count, percentage budget or clinical priority follows from this exercise.",
  "Specimen allocation starts by identifying the available portions, assessing their suitability, estimating method-specific use and recording consumption. Blocks, slides, frozen pieces and cell aliquots are finite inputs; their counts alone do not establish adequacy. Record remaining portions with section thickness, area or analyte amounts and the relevant context. Receiving-laboratory requirements and diagnostic priorities apply, rather than a universal test budget. Outdated inventories, unrecognised exhaustion, unsuitable regions and duplicated destructive work can waste material. Specimen governance supports reliable testing but is not itself a clinical biomarker and does not establish whether a test changes care or another procedure is appropriate."
],
"asOf": "2026-11-10"
}),
  t({
    id: "rna-integrity",
    name: "RNA integrity and assay suitability",
    category: "Genomics & genetics",
    tldr: "RNA quality measurements describe the condition of extracted RNA. Their usefulness depends on the measurement workflow the material will enter.",
    summary: "The original RNA Integrity Number method summarized electrophoretic features to standardize quality assessment. DV200 describes the proportion of RNA fragments longer than 200 nucleotides. Comparisons of fixed and frozen tissue found that fragment-distribution measures and functional amplification assays could be more informative for particular workflows. The NCI preanalytical-variables study likewise found method-dependent sensitivity to handling effects. An integrity score is therefore not a universal pass or fail rule for every RNA assay; input, preparation and intended measurement still matter.",
    links: [
  {
    "label": "The RIN: an RNA integrity number for assigning integrity values to RNA measurements.",
    "url": "https://doi.org/10.1186/1471-2199-7-3"
  },
  {
    "label": "Systematic evaluation of RNA quality, microarray data reliability and pathway analysis in fresh, fresh frozen and formalin-fixed paraffin-embedded tissue samples.",
    "url": "https://doi.org/10.1038/s41598-018-24781-6"
  },
  {
    "label": "The Biospecimen Preanalytical Variables Program: A Multiassay Comparison of Effects of Delay to Fixation and Fixation Duration on Nucleic Acid Quality.",
    "url": "https://doi.org/10.5858/arpa.2018-0172-oa"
  },
  {
    "label": "The RIN: an RNA integrity number for assigning integrity values to RNA measurements.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/16448564/"
  },
  {
    "label": "Effects of tissue handling on RNA integrity and microarray measurements from resected breast cancers.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22034635/"
  },
  {
    "label": "Robustness of RNA sequencing on older formalin-fixed paraffin-embedded tissue from high-grade ovarian serous adenocarcinomas.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31059554/"
  },
  {
    "label": "Technical Note: RNA Sequencing",
    "url": "https://support.illumina.com/content/dam/illumina-marketing/documents/products/technotes/evaluating-rna-quality-from-ffpe-samples-technical-note-470-2014-001.pdf"
  },
  {
    "label": "NCI Biospecimen Evidence-Based Practices: snap-freezing of post-surgical tissue",
    "url": "https://dctd.cancer.gov/data-tools-biospecimens/snap-freeze-bebp.pdf"
  }
],
    related: [
      "tissue-preparation-assay-fit",
      "rna-seq",
      "preanalytics-sample-stabilisation"
    ],
    aka: [
      "RNA integrity number",
      "RIN score",
      "DV200 RNA quality"
    ]
  ,
"notes": [
  "RNA integrity concerns molecular condition and fragment distribution, while yield measures recovered quantity. RNases, handling, fixation chemistry and storage can affect recovered molecules. An electropherogram separates size-associated signal. Integrity does not measure malignant-cell share, viability, protein abundance or transcript function.",
  "Schroeder developed RIN from multiple electropherogram features using a trained statistical model. Its 1 to 10 scale runs from degraded to more intact RNA and is not a percentage. DV200 describes measured fragments longer than 200 nucleotides; it does not certify every transcript. In a fictional area illustration, 6 of 10 selected signal-area units above 200 nucleotides give 60%. This is not a computation of RIN or an assay acceptance rule.",
  "Illumina describes DV200 for its RNA enrichment workflows and cautions that RIN can be insensitive in degraded FFPE samples. The older fixed ovarian-tumour study assessed shorter-fragment metrics and library performance because RIN and DV200 did not capture all limitations. Those findings and kit cutoffs must stay with their protocols, rather than becoming universal input rules.",
  "Fictional fixed RNA has low RIN but is accepted for a validated short-target expression assay and rejected for a full-length transcript workflow. These decisions can be consistent because the questions need different evidence. Passing input QC does not establish library complexity or gene recovery; a weak negative can reflect failed recovery rather than biological absence. Gene counts do not prove full-length or splice structure.",
  "RNA quality assessment uses an aliquot of an extract, which itself consumed specimen material. Examine the fragment-size distribution and method-specific quality summary, then check downstream recovery. Report RIN on its 1 to 10 scale, DV200 as a percentage, RNA quantity in nanograms and relevant library or recovery metrics. Acceptance depends on preservation, input amount and the intended assay; there is no universal RIN or DV200 pass cutoff. Poor extraction, degradation, chemical damage, contaminants, insufficient quantity or an uninterpretable trace can limit testing. Integrity does not measure tumour purity, cell viability, protein abundance or transcript function, and a research suitability metric is not a diagnostic result."
],
"asOf": "2026-11-10"
}),
  t({
    id: "specimen-provenance",
    name: "Specimen provenance and derivative tracking",
    category: "Diagnostics & imaging",
    tldr: "A result needs to remain linked to the tissue or blood sample it came from. Dividing or extracting a specimen creates new material with its own history.",
    summary: "NCI guidance describes unique identification of specimens and their derivative samples, with recorded origins and links between parent material, aliquots and extractions. That history helps establish which specimen, preparation and handling conditions produced a measurement. Results from different pieces or time points should not silently be treated as measurements of the same input. Tracking supports interpretation and quality management; it does not make a small sample representative of an entire tumor.",
    links: [
      {
        label: "NCI Best Practices for Biospecimen Resources, fourth edition (2026)",
        url: "https://dctd.cancer.gov/data-tools-biospecimens/biospecimens-biobanks/resources/best-practices/biospecimen-resources/intro"
      }
    ],
    related: [
      "finite-tissue-budget",
      "tissue-preparation-assay-fit",
      "tumour-purity",
      "biopsy"
    ],
    aka: [
      "biospecimen provenance",
      "derivative sample tracking"
    ]
  }),
  t({
    id: "mrna-construct-anatomy",
    name: "Messenger RNA construct anatomy",
    category: "Genomics & genetics",
    tldr: "An engineered messenger RNA includes a protein-coding message and surrounding features that affect how it is used. Those features are part of the construct being tested.",
    summary: "The cap, untranslated regions, coding sequence and poly(A) tail are distinct parts of a messenger RNA construct. A primary dendritic-cell study changed untranslated-region and poly(A)-tail features and measured RNA stability, protein production, peptide display and T-cell stimulation separately. Another experimental study separated effects of codon usage and RNA structure on protein expression. Construct design therefore includes more than the intended amino-acid sequence. A design that improves one measured step in one system does not establish optimal immune effects or clinical efficacy in another.\n\nStart-codon context was tested by single-base substitutions around the AUG initiator in a cloned preproinsulin gene, where the best sequence identified changed proinsulin yield over a 20-fold range (Kozak). The interaction of the cap and the poly(A) tail was tested with luciferase mRNAs delivered by electroporation into tobacco protoplasts, Chinese hamster ovary cells and yeast, where the tail's effect depended on the cap (Gallie). A textbook describes the 5' cap, 5' and 3' untranslated regions that regulate translation initiation and mRNA stability, a poly-A tail of about 200 A residues added by poly-A polymerase to cellular mRNA, and a ribosome that moves from the cap to the AUG, with Kozak's rules describing the sequence around it (OpenStax Biology 2e). The cellular tail length is not a rule for engineered constructs: one dendritic-cell study found that a 120-nucleotide tail, an unmasked tail end and two 3' untranslated regions each improved stability and translation, and it measured transcript amount by RT-PCR, protein by eGFP, peptide-MHC density and T-cell stimulation separately (Holtkamp and colleagues), so a doubled reporter signal after a 3' change is one measurement, not a different antigen or a clinical benefit. These are tested constructs and cell systems, not one best sequence for a clinical product.",
    links: [
  {
    "label": "Modification of antigen-encoding RNA increases stability, translational efficacy, and T-cell stimulatory capacity of dendritic cells.",
    "url": "https://doi.org/10.1182/blood-2006-04-015024"
  },
  {
    "label": "mRNA structure regulates protein expression through changes in functional half-life.",
    "url": "https://doi.org/10.1073/pnas.1908052116"
  },
  {
    "label": "Generating the optimal mRNA for therapy: HPLC purification eliminates immune activation and improves translation of nucleoside-modified, protein-encoding mRNA.",
    "url": "https://doi.org/10.1093/nar/gkr695"
  },
  {
    "label": "Point mutations define a sequence flanking the AUG initiator codon that modulates translation by eukaryotic ribosomes.",
    "url": "https://doi.org/10.1016/0092-8674(86)90762-2"
  },
  {
    "label": "The cap and poly(A) tail function synergistically to regulate mRNA translational efficiency.",
    "url": "https://doi.org/10.1101/gad.5.11.2108"
  },
  {
    "label": "Biology 2e, 15.4 RNA Processing in Eukaryotes (OpenStax)",
    "url": "https://openstax.org/books/biology-2e/pages/15-4-rna-processing-in-eukaryotes"
  },
  {
    "label": "Biology 2e, 15.5 Ribosomes and Protein Synthesis (OpenStax)",
    "url": "https://openstax.org/books/biology-2e/pages/15-5-ribosomes-and-protein-synthesis"
  }
],
    related: [
  "codon-optimization",
  "modified-rna-nucleosides",
  "in-vitro-transcription",
  "mrna-lnp-manufacturing",
  "multi-epitope-constructs"
],
    aka: [
      "mRNA construct anatomy",
      "mRNA untranslated regions and poly(A) tail"
    ]
  ,
"asOf": "2026-11-09",
"notes": [
  "Read a construct from its 5-prime end to its 3-prime end: cap, untranslated region, initiation context, protein-coding region, untranslated region and poly(A) tail have different jobs. A target list does not specify the finished RNA. Changing a UTR changes a regulatory sequence; changing an amino-acid spacer changes the combined protein. Sequence identity, size and integrity, end characterisation and expression need their own assays, with RNA chemistry and formulation stated."
]
}),
  t({
    id: "codon-optimization",
    name: "Codon optimization",
    category: "Genomics & genetics",
    tldr: "Synonymous codon changes can preserve the intended protein sequence while changing the RNA message. Their effects need to be measured in the intended expression system.",
    summary: "Primary experiments showed that synonymous codon choices can affect RNA stability and translation. Work on engineered messenger RNAs also separated codon usage from RNA secondary structure, showing that expression depends on more than a simple codon preference. Optimization is a design objective with a particular assay and system, not a guarantee of improved therapy. Changing codons is distinct from choosing which antigen or epitope the construct encodes.\n\nIn four human cell lines, three independent methods showed that mRNA stability tracked codon identity rather than nucleotide content, stabilising codons tended to coincide with higher tRNA levels, and the effect depended on translation (Wu and colleagues, 2019). Another study separated codon usage from coding-region structure in eGFP constructs and defined functional half-life as the time an mRNA is actively translated, which differs from RNA that is merely present or protein that persists, so a doubled reporter signal at one time point does not show twice the RNA lifetime, a better neoantigen or any clinical effect (Mauger and colleagues).",
    links: [
  {
    "label": "Codon optimality is a major determinant of mRNA stability.",
    "url": "https://doi.org/10.1016/j.cell.2015.02.029"
  },
  {
    "label": "mRNA structure regulates protein expression through changes in functional half-life.",
    "url": "https://doi.org/10.1073/pnas.1908052116"
  },
  {
    "label": "Translation affects mRNA stability in a codon-dependent manner in human cells.",
    "url": "https://doi.org/10.7554/elife.45396"
  },
  {
    "label": "NCBI: standard genetic code, table 1; DNA alphabet uses T for U",
    "url": "https://www.ncbi.nlm.nih.gov/Taxonomy/Utils/wprintgc.cgi"
  }
],
    related: [
  "mrna-construct-anatomy",
  "multi-epitope-constructs",
  "in-vitro-transcription"
]
  ,
"asOf": "2026-11-09",
"notes": [
  "A codon is a three-base unit. In the standard genetic code, GCU and GCC both encode alanine; synonymous redesign can preserve the intended amino-acid sequence while altering the RNA. RNA structure, available decoding machinery and experimental conditions still matter. Compare matched RNA amount, chemistry, cap, UTRs, purity and delivery, using RNA and protein time courses and protein identity or activity. A codon score or single reporter measurement cannot establish translation fidelity, peptide display, recognition or benefit, and a changed amino-acid spacer is a different design change.",
  "In Mauger's engineered eGFP constructs, highly expressed messages could have highly structured coding regions, and coding-region structure affected the duration of active translation. This concerns the tested coding regions and does not show that removing every fold or maximising one codon score improves every message."
]
}),
  t({
    id: "modified-rna-nucleosides",
    name: "Modified nucleosides in messenger RNA",
    category: "Genomics & genetics",
    tldr: "Chemical changes to RNA building blocks can alter how a message is sensed and translated. The effect depends on the RNA and the system in which it is tested.",
    summary: "Primary experiments found that selected nucleoside modifications changed RNA-triggered innate immune activation. Later work showed that purification of modified transcripts also affected inflammatory responses and protein expression. Modification and removal of contaminants are therefore distinct design and manufacturing questions. Results from those experimental systems do not establish that one modification is best for every cancer vaccine, delivery platform or intended immune response.\n\nIn cell lines and mice, N1-methylpseudouridine, alone or with 5-methylcytidine, gave higher reporter expression than pseudouridine-based mRNA, up to about 44-fold for double-modified mRNA and about 13-fold for single-modified mRNA as the abstract reports (cell lines and mice respectively), with less innate immunogenicity and better cell viability in vitro (Andries and colleagues). Separately, N1-methylpseudouridine caused +1 ribosomal frameshifting in vitro at slippery sequences, cellular immunity to +1 products was found in mice and humans after vaccination with BNT162b2 vaccine mRNA, and synonymous changes at those sequences reduced frameshifted products; the authors note that no adverse outcomes from mistranslation of the SARS-CoV-2 vaccines have been reported (Mulroney and colleagues). More reporter signal with less cytokine in one matched comparison does not show a stronger antigen-specific T-cell response: unmodified mRNAs were translated better after purification yet still induced high cytokine secretion, and purified modified mRNA was translated 10 to 1000-fold more in primary cells (Karikó and colleagues, 2011), so sensing, expression and T-cell readouts each need their own evidence.",
    links: [
  {
    "label": "Suppression of RNA recognition by Toll-like receptors: the impact of nucleoside modification and the evolutionary origin of RNA.",
    "url": "https://doi.org/10.1016/j.immuni.2005.06.008"
  },
  {
    "label": "Generating the optimal mRNA for therapy: HPLC purification eliminates immune activation and improves translation of nucleoside-modified, protein-encoding mRNA.",
    "url": "https://doi.org/10.1093/nar/gkr695"
  },
  {
    "label": "N(1)-methylpseudouridine-incorporated mRNA outperforms pseudouridine-incorporated mRNA by providing enhanced protein expression and reduced immunogenicity in mammalian cell lines and mice.",
    "url": "https://doi.org/10.1016/j.jconrel.2015.08.051"
  },
  {
    "label": "N<sup>1</sup>-methylpseudouridylation of mRNA causes +1 ribosomal frameshifting.",
    "url": "https://doi.org/10.1038/s41586-023-06800-3"
  },
  {
    "label": "OpenStax Organic Chemistry 28.1: nucleosides and nucleotides",
    "url": "https://openstax.org/books/organic-chemistry/pages/28-1-nucleotides-and-nucleic-acids"
  }
],
    related: [
  "dsrna-impurities",
  "mrna-construct-anatomy",
  "mrna-lnp-manufacturing"
],
    aka: [
      "modified mRNA nucleosides",
      "nucleoside-modified mRNA"
    ]
  ,
"asOf": "2026-11-09",
"notes": [
  "A nucleoside combines a base with a sugar; a nucleotide also carries phosphate. Modified RNA building blocks change chemistry separately from the intended sequence and from contaminating byproducts. Characterise chemistry and identity, impurities, protein identity and quantity, and innate-sensing readouts under matched sequence, amount, cap, UTR, purity and formulation conditions. A translation or cytokine result cannot establish every later immune or clinical outcome.",
  "Karikó's 2005 experiments compared human TLR systems and dendritic-cell readouts under selected nucleoside modifications. In the 2011 study, modified transcripts still contained activating contaminants including double-stranded RNA, and purification changed innate activation and translation. A change in building-block chemistry is therefore separate from removal of byproducts."
]
}),
  t({
    id: "in-vitro-transcription",
    name: "In vitro transcription for RNA products",
    category: "Methods and models",
    tldr: "Enzymes can copy a DNA template into RNA outside a living cell. Producing the transcript is followed by questions about its identity, composition and suitability for use.",
    summary: "Experimental RNA-manufacturing studies distinguish the intended in vitro-transcribed RNA from contaminating products and test how purification affects its performance. A primary RNA-construct study then measured expression and immune stimulation after delivering transcripts to cells. RNA production, product quality and biological performance are separate observations. An RNA yield or a band of the expected size alone does not establish a released product or a clinical treatment effect.\n\nA protocol from authors affiliated with TriLink Biotechnologies describes co-transcriptional capping with the company's CleanCap AG reagent, reported to give 94 per cent cap 1 structure at 5 mg/ml of transcription, against cap 0 products at lower efficiency from first-generation cap analogues (Henderson and colleagues). It describes one reagent and is not a release specification. Separately, T7 polymerase initiated transcription from a promoter-less DNA end and made an antisense strand that paired with the intended RNA as long double-stranded RNA, which stimulated the innate sensor MDA5; the activity was suppressed by modified nucleotides or a lower magnesium concentration (Mu and colleagues). Release analytics are layered: reviews list sequence and modification identity, poly(A) tail, RNA content by UV spectrophotometry, integrity and transcript length by gel or capillary electrophoresis or chromatography, double-stranded RNA by immunoblot or ELISA, and residual DNA as separate attributes; purification has to remove template DNA, unincorporated nucleotides and enzymes; residual nucleotides are controlled below predefined thresholds that need much lower detection limits than the main product, with the intact mRNA itself complicating their detection (Losada and colleagues; Nowak and colleagues). Because RNA content and integrity are separate assays, total mass alone does not show full-length product.",
    links: [
  {
    "label": "Generating the optimal mRNA for therapy: HPLC purification eliminates immune activation and improves translation of nucleoside-modified, protein-encoding mRNA.",
    "url": "https://doi.org/10.1093/nar/gkr695"
  },
  {
    "label": "A Facile Method for the Removal of dsRNA Contaminant from In Vitro-Transcribed mRNA.",
    "url": "https://doi.org/10.1016/j.omtn.2019.02.018"
  },
  {
    "label": "Modification of antigen-encoding RNA increases stability, translational efficacy, and T-cell stimulatory capacity of dendritic cells.",
    "url": "https://doi.org/10.1182/blood-2006-04-015024"
  },
  {
    "label": "Cap 1 Messenger RNA Synthesis with Co-transcriptional CleanCap® Analog by In Vitro Transcription.",
    "url": "https://doi.org/10.1002/cpz1.39"
  },
  {
    "label": "An origin of the immunogenicity of in vitro transcribed RNA.",
    "url": "https://doi.org/10.1093/nar/gky177"
  },
  {
    "label": "From nucleotides to intact transcripts through oligonucleotides: Integrated chromatographic strategies for therapeutic mRNA characterization.",
    "url": "https://doi.org/10.1007/s00216-026-06615-x"
  },
  {
    "label": "Process and analytical strategies for the safe production of mRNA vaccines and therapeutics.",
    "url": "https://doi.org/10.1007/s11033-026-11455-0"
  },
  {
    "label": "NEB: Evaluation of IVT Reaction Products, analytical protocol",
    "url": "https://www.neb.com/en-us/protocols/evaluation-of-ivt-reaction-products?pdf=true"
  }
],
    related: [
  "mrna-construct-anatomy",
  "dsrna-impurities",
  "chemistry-manufacturing-controls",
  "plasmid-dna-manufacturing"
],
    aka: [
      "IVT RNA production",
      "in-vitro-transcribed RNA"
    ]
  ,
"asOf": "2026-11-09",
"notes": [
  "In vitro transcription copies a DNA template into RNA outside living cells. A T7 promoter recruits the transcription machinery; a Kozak context acts at translation initiation. Cap addition during transcription or afterwards, and template-encoded or enzyme-added poly(A), are distinct process choices. The DNA is a manufacturing input; residual DNA in the product is a separate quality attribute. Preserve the connection from the intended antigen sequence through the finished construct and its expression and potency tests.",
  "NEB's IVT evaluation protocol says unincorporated nucleotides and template DNA affect the 260-nanometre absorbance reading and calls for their removal before RNA quantification. This is vendor analytical guidance, not a clinical specification. Record purification and the quantification method separately from transcript length and integrity; total mass alone does not identify full-length RNA."
]
}),
  t({
    id: "dsrna-impurities",
    name: "Double-stranded RNA impurities",
    category: "Methods and models",
    tldr: "RNA manufacture can also produce unwanted paired RNA material. Measuring and removing it is a product-quality question separate from the intended message.",
    summary: "Primary experiments identified double-stranded RNA among contaminants that affected innate immune activation and translation of in vitro-transcribed messenger RNA. Subsequent work developed and tested a cellulose-based removal method. Those studies support characterizing contaminants and their functional consequences in the tested workflows. They do not establish one universal acceptable impurity level or release method for all RNA products.\n\nOne documented origin is T7 polymerase initiating transcription from a promoter-less DNA end, producing an antisense strand and long double-stranded RNA that activated the sensor MDA5 (Mu and colleagues). In purification studies, unmodified mRNAs were translated better after HPLC purification but still induced high levels of cytokine secretion (Karikó and colleagues). A cellulose method removed at least 90 per cent of double-stranded RNA with over 65 per cent recovery regardless of mRNA length, coding sequence or nucleoside composition and increased translation in mice, and agarose gels showed that the purified mRNA stayed intact, but it removed duplexes of 30 base pairs or longer efficiently while most of a 21 base-pair duplex remained (Baiersdörfer and colleagues). Detection has its own scope: that paper notes an earlier report that about 40 base pairs of duplex are needed for detection by the J2 antibody, and a review of mRNA analytics lists immunoblot or ELISA for double-stranded RNA alongside separate integrity assays (Losada and colleagues). A lower dsRNA signal with worse fragmentation or recovery therefore does not show a better product. Method performance in those systems is not a clinical impurity limit.",
    links: [
  {
    "label": "Generating the optimal mRNA for therapy: HPLC purification eliminates immune activation and improves translation of nucleoside-modified, protein-encoding mRNA.",
    "url": "https://doi.org/10.1093/nar/gkr695"
  },
  {
    "label": "A Facile Method for the Removal of dsRNA Contaminant from In Vitro-Transcribed mRNA.",
    "url": "https://doi.org/10.1016/j.omtn.2019.02.018"
  },
  {
    "label": "An origin of the immunogenicity of in vitro transcribed RNA.",
    "url": "https://doi.org/10.1093/nar/gky177"
  },
  {
    "label": "From nucleotides to intact transcripts through oligonucleotides: Integrated chromatographic strategies for therapeutic mRNA characterization.",
    "url": "https://doi.org/10.1007/s00216-026-06615-x"
  }
],
    related: [
  "in-vitro-transcription",
  "modified-rna-nucleosides",
  "chemistry-manufacturing-controls"
],
    aka: [
      "dsRNA impurities",
      "double-stranded RNA contaminants"
    ]
  ,
"asOf": "2026-11-09",
"notes": [
  "Distinguish a shorter transcript, a fold within the intended message and an unwanted complementary RNA duplex; transcript length alone cannot identify these categories. State the antibody or other detection chemistry, calibrator, sample matrix, units, detection and quantitation limits, and recovery behind a dsRNA result. Test recognised structures and relevant RNA chemistries rather than assuming every duplex is equally visible. Assess RNA size, integrity and expression separately: lower antibody signal alone cannot establish a better product or antigen-specific immunity."
]
}),
  t({
    id: "multi-epitope-constructs",
    name: "Multi-epitope constructs and antigen processing",
    category: "Immunology",
    tldr: "A construct can encode several intended immune targets. Each target still needs to be processed, displayed and recognized in the tested biological setting.",
    summary: "A primary multiepitope DNA-vaccine study found that flanking sequence changes altered processing efficiency and measured immunogenicity of encoded epitopes. That was evidence from the tested constructs, not a validated rule for every RNA cancer vaccine. The number of encoded epitopes is distinct from the number naturally displayed or recognized. Processing evidence, immune-response breadth and clinical outcome remain separate parts of a construct claim.\n\nA computational study of spacer design for class-I-restricted string-of-beads polypeptides reported a fivefold increase in predicted epitope recovery and a 44 per cent reduction in predicted neo-epitope immunogenicity compared with designs without spacers (Schubert and Kohlbacher); these are predictions, not measured protection. Combining an N-terminal leader peptide with an MHC class I trafficking signal at the C terminus improved presentation of class I and class II epitopes in human and mouse dendritic cells and expanded antigen-specific CD8 and CD4 T cells in vitro and in mice (Kreiter and colleagues). In a first-in-human RNA poly-neo-epitope melanoma study all patients developed T-cell responses against multiple vaccine neo-epitopes (Sahin and colleagues; abstract only), and each patient's vaccine in the Rojas pancreatic cancer trial used two uridine mRNA strands, each encoding up to 10 neoepitopes. Mass spectrometry can identify recovered HLA-bound peptides. Caron and colleagues' 2015 review describes class I peptides predominantly 9 to 12 amino acids long and reports that about 10 per cent of acquired spectra could be confidently assigned at a 1 per cent false discovery rate in the workflows discussed. It also describes evidence that mass spectrometry underestimates the self-HLA peptide repertoire, so non-detection does not prove absence. Prediction is not presentation: of more than 1,300 amino acid changes in two mouse tumour models about 13 per cent were predicted to bind MHC class I and a small fraction of those were confirmed by mass spectrometry (Yadav and colleagues). Because a single amino acid after an epitope changed its immunogenicity in a multiepitope DNA vaccine (Livingston and colleagues, already linked), a changed spacer is a changed construct that needs renewed processing and display evidence, while earlier evidence is retained for the parts that did not change.",
    links: [
  {
    "label": "Optimization of epitope processing enhances immunogenicity of multiepitope DNA vaccines.",
    "url": "https://doi.org/10.1016/s0264-410x(01)00233-x"
  },
  {
    "label": "T cells compete for access to antigen-bearing antigen-presenting cells.",
    "url": "https://doi.org/10.1084/jem.192.8.1105"
  },
  {
    "label": "Modification of antigen-encoding RNA increases stability, translational efficacy, and T-cell stimulatory capacity of dendritic cells.",
    "url": "https://doi.org/10.1182/blood-2006-04-015024"
  },
  {
    "label": "Designing string-of-beads vaccines with optimal spacers.",
    "url": "https://doi.org/10.1186/s13073-016-0263-6"
  },
  {
    "label": "Increased antigen presentation efficiency by coupling antigens to MHC class I trafficking signals.",
    "url": "https://doi.org/10.4049/jimmunol.180.1.309"
  },
  {
    "label": "Personalized RNA mutanome vaccines mobilize poly-specific therapeutic immunity against cancer.",
    "url": "https://doi.org/10.1038/nature23003"
  },
  {
    "label": "Personalized RNA neoantigen vaccines stimulate T cells in pancreatic cancer.",
    "url": "https://doi.org/10.1038/s41586-023-06063-y"
  },
  {
    "label": "Analysis of Major Histocompatibility Complex (MHC) Immunopeptidomes Using Mass Spectrometry.",
    "url": "https://doi.org/10.1074/mcp.o115.052431"
  },
  {
    "label": "Predicting immunogenic tumour mutations by combining mass spectrometry and exome sequencing.",
    "url": "https://doi.org/10.1038/nature14001"
  }
],
    related: [
  "immunodominance",
  "binding-presentation-recognition",
  "codon-optimization",
  "mrna-construct-anatomy"
],
    aka: [
      "polyepitope constructs",
      "multi-epitope vaccine design"
    ]
  ,
"asOf": "2026-11-09",
"notes": [
  "An encoded antigen window is not necessarily the peptide eventually displayed. Joined windows and spacers can create new junction sequences. A protein-routing signal concerns the encoded protein rather than the particle delivery address. Identify any intended helper segment and test its HLA class II presentation and CD4 response in the relevant setting. Verify sequence and expression, recovered HLA-bound peptides and functional recognition separately; prediction scores do not supply a presentation threshold. Changing a spacer changes the construct even if two selected windows are unchanged. More encoded targets create opportunities only where relevant antigen expression, processing, compatible HLA presentation and functional recognition can occur. Target count alone is not measured response breadth."
]
}),
  t({
    id: "binder-targeting-module",
    name: "Binders as targeting modules",
    category: "Biology basics",
    tldr: "A recognition molecule can be used as one component of a larger therapeutic design. Its ability to bind is one property of that component.",
    summary: "Primary antibody-fragment studies showed how recognition domains can be used outside a complete antibody. Experiments with bispecific T-cell engagers then showed that constructs with similar binding affinity could differ in target-cell lysis because of epitope position and antigen geometry. A binder is therefore a module whose performance must be evaluated in its assembled format. Binding alone does not establish delivery, effector activity or clinical benefit. In a 1993 experiment a single-chain Fv joined to a T-cell receptor signalling chain was expressed in a cytolytic T-cell hybridoma and triggered interleukin-2 secretion and hapten-specific, non-MHC-restricted target-cell lysis (Eshhar et al.), an early demonstration of recognition coupled to activation in one cell model. In a 2022 mouse heart-failure model, lipid nanoparticles carrying CAR mRNA and targeted to CD5 delivered the message to T cells and reduced fibrosis, an example of a binder choosing the cell that receives instructions rather than the cancer cell (Rurik et al.). FDA's March 2024 antibody-drug conjugate clinical pharmacology guidance treats the conjugate and its constituent parts separately.",
    links: [
  {
    "label": "Protein engineering of antibody binding sites: recovery of specific activity in an anti-digoxin single-chain Fv analogue produced in Escherichia coli.",
    "url": "https://doi.org/10.1073/pnas.85.16.5879"
  },
  {
    "label": "Naturally occurring antibodies devoid of light chains.",
    "url": "https://doi.org/10.1038/363446a0"
  },
  {
    "label": "Epitope distance to the target cell membrane and antigen size determine the potency of T cell-mediated lysis by BiTE antibodies specific for a large melanoma surface antigen.",
    "url": "https://doi.org/10.1007/s00262-010-0844-y"
  },
  {
    "label": "Eshhar et al., 1993: specific activation and targeting of cytotoxic lymphocytes through chimeric single chains",
    "url": "https://doi.org/10.1073/pnas.90.2.720"
  },
  {
    "label": "Rurik et al., 2022: CAR T cells produced in vivo to treat cardiac injury",
    "url": "https://doi.org/10.1126/science.abm0594"
  },
  {
    "label": "FDA: clinical pharmacology considerations for antibody-drug conjugates (March 2024)",
    "url": "https://www.fda.gov/media/155997/download"
  }
],
    related: [
      "antibody",
      "epitope",
      "scfv-vhh-formats",
      "binder-format-constraints"
    ]
  ,
"asOf": "2026-11-10",
"notes": [
  "Two inferences about recognition. A gene or RNA signal for a target shows that the target is made, not that its epitope is exposed on living tumour cells. A highly specific binder can also recognise its intended target on healthy tissue; that is on-target, off-tumour injury, not a mistaken molecular address. Evidence that a binder recognises purified protein and living target-positive cells supports recognition in those settings only.",
  "Each connected action adds its own requirement. For an antibody-drug conjugate, FDA's March 2024 clinical pharmacology guidance defines total antibody, unconjugated antibody and unconjugated payload as separate quantities and says its principles may not apply to other types of conjugate. A T-cell engager needs productive contact between two cells, a receptor needs a relevant effect on signalling, and a CAR needs surface expression and target-dependent activation, which Eshhar et al. (1993) first showed in a T-cell hybridoma. Delivery binders choose the cell that receives instructions (Rurik et al., 2022), which can differ from the cancer cell. Attaching a binder shows none of these later steps.",
  "A binder is a part of a design, not a measured quantity, so it has no assay of its own. Binding strength, epitope accessibility and developability belong to the binder-profile record and must be remeasured on the assembled product, because format changes geometry, stability and exposure."
]
}),
  t({
    id: "binder-affinity-epitope-developability",
    name: "Binder affinity, epitope and developability",
    category: "Methods and models",
    tldr: "Binding strength, the site recognized and practical molecule properties answer different questions. A useful binder needs evaluation beyond a single affinity value.",
    summary: "A primary comparison of bispecific constructs found different lytic activity despite similar antigen-binding affinity, with epitope geometry contributing to the result. A separate clinical-stage antibody survey measured multiple biophysical properties relevant to developability. Those studies support evaluating recognition, function and molecule behavior separately. Their tested distributions and constructs do not establish a universal selection cutoff or guarantee that a candidate will become an effective drug. Separate measurements distinguish the quantities. For antibodies binding HLA-A2 on cells, the monovalent Fab affinity of one antibody was 1.9 x 10^7 per molar while the avidity of its bivalent F(ab)2 or IgG was 1.3 x 10^9 per molar, an enhancement the authors estimated at 68-fold by simple Scatchard analysis and at a larger value with more realistic models (Ways and Parham, 1983). In mice bearing SK-OV-3 human ovarian carcinoma xenografts, four affinity variants of one anti-HER2 antibody that recognise the same epitope (monovalent KD 270 to 0.56 nmol/L) showed the highest tumour accumulation at moderate affinity; the highest-affinity antibodies stayed in the perivascular space (average penetration 20.4 um versus 84.8 um for the lowest affinity), a conditional result in that model, not an ideal affinity (Rudnick et al., 2011). FDA's Q6B guidance lists physicochemical properties, biological activity, immunochemical properties, purity and impurities as parts of characterisation and ties specifications to the individual product, so no universal cutoff exists.",
    links: [
  {
    "label": "Epitope distance to the target cell membrane and antigen size determine the potency of T cell-mediated lysis by BiTE antibodies specific for a large melanoma surface antigen.",
    "url": "https://doi.org/10.1007/s00262-010-0844-y"
  },
  {
    "label": "Biophysical properties of the clinical-stage antibody landscape.",
    "url": "https://doi.org/10.1073/pnas.1616408114"
  },
  {
    "label": "Ways and Parham, 1983: the binding of monoclonal antibodies to cell-surface molecules",
    "url": "https://doi.org/10.1042/bj2160423"
  },
  {
    "label": "Rudnick et al., 2011: influence of affinity and antigen internalization on uptake and penetration of anti-HER2 antibodies in solid tumors",
    "url": "https://doi.org/10.1158/0008-5472.can-10-2277"
  },
  {
    "label": "FDA/ICH Q6B: specifications for biotechnological and biological products",
    "url": "https://www.fda.gov/media/71510/download"
  },
  {
    "label": "Kinna et al., 2026: antibody format matters, a comparative analysis of VHH and scFv domains",
    "url": "https://doi.org/10.1016/j.ymthe.2026.06.017"
  }
],
    related: [
      "epitope",
      "binder-targeting-module",
      "binder-format-constraints",
      "self-similarity-immune-recognition"
    ],
    aka: [
      "antibody binder developability",
      "affinity versus binder function"
    ]
  ,
"asOf": "2026-11-10",
"notes": [
  "Affinity describes one binding interaction under stated conditions. For a simple one-to-one equilibrium a lower dissociation constant (KD, a concentration often given in nanomolar units) means tighter binding, whereas papers that report association constants (per molar) read the other way, with a higher value meaning tighter binding, so compare like with like. Avidity is the combined strength of several contacts and depends on target density, spacing and the number of binding sites. In one set of experiments the Fab fragment of an anti-HLA-A2 antibody had an affinity of 1.9 x 10^7 per molar while the bivalent F(ab)2 or IgG showed an avidity of 1.3 x 10^9 per molar on cells (Ways and Parham, 1983). A cell-binding result for a multivalent product is therefore not its single-site affinity; ask which assay was used and how many sites took part.",
  "Whether a binder can reach its epitope depends on folding, orientation and neighbouring molecules, so a sequence, a signal on purified protein or a measure of protein abundance does not show access in a living setting. In BiTE antibodies against the melanoma antigen MCSP, constructs with similar binding affinity differed greatly in redirected T-cell lysis of CHO cells carrying MCSP variants, and those binding the membrane-proximal domain were more potent than those binding more distal domains (Bluemel et al., 2010). That is a defined engineered-cell system, not a general rule for every target.",
  "Developability asks whether a molecule can be produced, purified, formulated and stored, stays soluble and stable, does not aggregate and does not bind unrelated molecules. Jain et al. (2017) expressed 137 clinical-stage antibody sequences as IgG1 and measured a dozen biophysical properties to describe the range seen in clinical-stage antibodies. Kinna et al. (2026) selected ten CD123 domain- and affinity-matched pairs from llama VHH and rat scFv libraries. The VHH preparations had a higher reported thermal-unfolding midpoint and lower predicted aggregation and positive-surface-patch scores. Those computational scores are distinct from direct particle measurements: dynamic light scattering found an even monomeric distribution except for one clone in each pool. The results concern the studied preparations and readouts. Neither study tests whether a candidate works or is safe in patients, so developable does not mean effective or safe.",
  "Measurement rows and their limits. Binding strength comes from optical methods such as biolayer interferometry (used for screening and full titrations in Watson et al., 2023), where target preparation, immobilisation and multivalent binding affect the reading. Native accessibility needs binding to relevant living cells with target-negative or blocking controls, and cell binding alone does not show tissue access or clinical selectivity. Stability is read from thermal unfolding and aggregation, which depend on formulation, concentration and stress. A potency assay shows activity in that assay only. FDA Q6B ties specifications to the individual product, so no universal developability cutoff exists, and tests consume candidate material and may need target protein or cells.",
  "Inference lesson. Suppose candidate A has tighter single-site affinity but only purified-protein data and more aggregation after stress, while candidate B binds living target-positive cells and aggregates less. No treatment choice follows: the team needs the intended format, comparable functional tests and exposure evidence first. A binder profile is a development framework, not a validated score, and it is retested once the binder becomes an antibody, a payload carrier or a receptor."
]
}),
  t({
    id: "binder-format-constraints",
    name: "Format-dependent binder function",
    category: "Methods and models",
    tldr: "A recognition domain can behave differently when built into a different therapeutic structure. Its final format is part of the experiment.",
    summary: "Epitope-distance experiments in bispecific T-cell engagers linked target geometry to cell lysis in the tested models. A later comparison of CD123-directed single-chain and single-domain antibody fragments examined their behavior in engineered T cells and a mouse leukemia model. These are construct-specific findings. A successful binding measurement or one format comparison should not be generalized to all antibody fragments, targets, payloads or clinical settings. Three primary studies show what the assembled format adds. In mice with MUC16-positive xenografts, an anti-MUC16 antibody-drug conjugate made by site-specific cysteine conjugation was as effective as a conventional conjugate and was tolerated at higher doses in rats and cynomolgus monkeys (Junutula et al., 2008). CD19 CARs with a long IgG4 spacer worked in vitro but lacked antitumour activity in mice because the Fc region bound Fc receptors on myeloid cells and caused activation-induced T-cell death; modifying the CH2 domain restored activity (Hudecek et al., 2015). Antigen-independent clustering of scFvs triggered tonic CD3-zeta signalling and early exhaustion in the CARs studied, except the CD19 CAR, with 4-1BB reducing and CD28 increasing the effect (Long et al., 2015). FDA's 2024 CAR T guidance asks for in vitro and in vivo evaluation of antigen-dependent and antigen-independent activity of the complete product.",
    links: [
  {
    "label": "Epitope distance to the target cell membrane and antigen size determine the potency of T cell-mediated lysis by BiTE antibodies specific for a large melanoma surface antigen.",
    "url": "https://doi.org/10.1007/s00262-010-0844-y"
  },
  {
    "label": "Antibody format matters: A comparative analysis of VHH and scFv domains reveals superior in vivo CAR T cell function with VHH domains.",
    "url": "https://doi.org/10.1016/j.ymthe.2026.06.017"
  },
  {
    "label": "Junutula et al., 2008: site-specific conjugation of a cytotoxic drug to an antibody improves the therapeutic index",
    "url": "https://doi.org/10.1038/nbt.1480"
  },
  {
    "label": "Hudecek et al., 2015: the nonsignaling extracellular spacer domain of chimeric antigen receptors is decisive for in vivo antitumor activity",
    "url": "https://doi.org/10.1158/2326-6066.cir-14-0127"
  },
  {
    "label": "Long et al., 2015: 4-1BB costimulation ameliorates T cell exhaustion induced by tonic signaling of chimeric antigen receptors",
    "url": "https://doi.org/10.1038/nm.3838"
  },
  {
    "label": "FDA: considerations for the development of CAR T cell products (January 2024)",
    "url": "https://www.fda.gov/media/156896/download"
  }
],
    related: [
      "binder-targeting-module",
      "scfv-vhh-formats",
      "binder-affinity-epitope-developability",
      "car-t"
    ]
  ,
"asOf": "2026-11-10",
"notes": [
  "There is no transferable best affinity. A measured affinity describes an interaction in a specified model, while behaviour also depends on target density, geometry, exposure and unwanted recognition. Bluemel et al. (2010) found BiTE constructs with similar affinity but very different lysis. Kinna et al. (2026) chose ten VHH and scFv pairs with comparable domain targeting and KD of 10^-9 to 10^-11 molar and still found differences in stability, in vitro cytokine release and survival in an acute myeloid leukaemia xenograft; the tumour was the human AML-derived MOLM-14 cell line in NSG mice, with generally five mice per group. The authors identify use of a single donor from the preceding in-vitro experiments as a limitation. This does not establish general superiority of either format or compare clinical products in patients.",
  "Format changes what is tested. A soluble molecule must stay intact and usable through manufacture, storage and exposure, and adding binding units or a chemical cargo can change its behaviour (Junutula et al., 2008, anti-MUC16 conjugate in mice, rats and monkeys). A CAR fixes the binder to a membrane and links contact to signalling, so spacer reach, target position, expression and clustering matter (Hudecek et al., 2015; Long et al., 2015). The same recognition sequence therefore does not guarantee the same performance.",
  "Healthy-cell inference. A target found on cancer cells may also occur at lower amounts on healthy cells, so a change that improves recognition of target-low cancer cells can also improve recognition of healthy cells that carry some target. Format testing has to ask about both. FDA's January 2024 CAR T guidance calls for in vitro and in vivo assessment of antigen-dependent and antigen-independent activity in the complete product.",
  "Assay card for format work. Input is the actual assembled molecule or receptor-bearing cells (aliquots are consumed). Conditions to state are target density, exposure time, cell state and relevant negative and healthy-cell controls. Outputs are kept separate: binding constants under their model, receptor-positive cell fractions, cytokine concentration and timed target-cell survival. Thresholds are prespecified and product-specific, with no transferable affinity or activation cutoff. Limits include aggregation, poor expression, geometry and background signalling, and a dish omits whole-body exposure and tissue context. The validation tier is product-specific laboratory characterisation, earlier evidence than clinical safety or benefit."
]
}),
  t({
    id: "scfv-vhh-formats",
    name: "Single-chain and single-domain antibody fragments",
    category: "Biology basics",
    tldr: "An antibody recognition unit can be engineered from linked heavy- and light-chain variable regions or from a single suitable variable domain. These formats have different structures to evaluate.",
    summary: "The original single-chain Fv work linked antibody heavy- and light-chain variable regions and tested binding after expression and refolding. Camelid heavy-chain antibody studies established a different architecture without light chains, underlying VHH-derived formats. More recent engineered-cell comparisons test the behavior of particular fragments in particular constructs. Format names describe architecture; they do not by themselves establish stability, specificity or therapeutic superiority. The first single-chain Fv joined the heavy- and light-chain variable domains of an anti-digoxin antibody with a 15-amino-acid linker (relative molecular mass 26,354); after refolding it showed digoxin specificity like the Fab and an association constant (3.2 x 10^7 per molar) about six-fold below the Fab's (Huston et al., 1988). Camel serum was found to contain IgG-like molecules of about 100 kDa made of heavy-chain dimers without light chains or CH1 (Hamers-Casterman et al., 1993). The NCBI imaging database entry gives about 150 kDa for an intact antibody and 25 to 30 kDa for a monovalent scFv; a 2021 review gives nanobody masses as low as about 15 kDa. Antigen-independent scFv clustering caused tonic signalling and exhaustion in specified CAR constructs (Long et al., 2015).",
    links: [
  {
    "label": "Protein engineering of antibody binding sites: recovery of specific activity in an anti-digoxin single-chain Fv analogue produced in Escherichia coli.",
    "url": "https://doi.org/10.1073/pnas.85.16.5879"
  },
  {
    "label": "Naturally occurring antibodies devoid of light chains.",
    "url": "https://doi.org/10.1038/363446a0"
  },
  {
    "label": "Antibody format matters: A comparative analysis of VHH and scFv domains reveals superior in vivo CAR T cell function with VHH domains.",
    "url": "https://doi.org/10.1016/j.ymthe.2026.06.017"
  },
  {
    "label": "Long et al., 2015: 4-1BB costimulation ameliorates T cell exhaustion induced by tonic signaling of chimeric antigen receptors",
    "url": "https://doi.org/10.1038/nm.3838"
  },
  {
    "label": "NCBI MICAD: L36-Cy5 anti-laminin trimerbody (2004), formats and sizes",
    "url": "https://pubmed.ncbi.nlm.nih.gov/20641540/"
  },
  {
    "label": "Bathula et al., 2021: nanobodies, the future of antibody-based immune therapeutics",
    "url": "https://doi.org/10.1089/cbr.2020.3941"
  },
  {
    "label": "Ward et al., 1989: isolated immunoglobulin variable domains",
    "url": "https://doi.org/10.1038/341544a0"
  },
  {
    "label": "Roux et al., 1998: nurse-shark NAR structure",
    "url": "https://doi.org/10.1073/pnas.95.20.11804"
  },
  {
    "label": "Greenberg et al., 1995: shark antigen-receptor gene family",
    "url": "https://doi.org/10.1038/374168a0"
  }
],
    related: [
      "antibody",
      "binder-format-constraints",
      "binder-targeting-module"
    ],
    aka: [
      "scFv and VHH",
      "single-chain variable fragment",
      "VHH antibody domain",
      "single-domain antibody fragment"
    ]
  ,
"asOf": "2026-11-10",
"notes": [
  "Definitions. A conventional antibody pairs heavy- and light-chain variable domains to form a binding site. A single-chain variable fragment (scFv) joins those two domains with a peptide linker in one polypeptide chain, so single-chain does not mean one variable domain (Huston et al., 1988, a 15-amino-acid linker). VHH is the binding domain of a camelid heavy-chain-only antibody (Hamers-Casterman et al., 1993), and an isolated VHH used as a binder is called a nanobody (Bathula et al., 2021). Not every engineered single-domain antibody derives from a camelid VHH, a point the source lesson makes without a primary citation in this batch.",
  "Neither isolated format carries an antibody constant region. Huston's sFv is VH, linker and VL only, and camel heavy-chain IgGs lack CH1 (Hamers-Casterman et al.), so effector recruitment needs other components. A CAR also needs transmembrane and signalling regions, so the binder alone is not the receptor, and a binder, a CAR and a CAR-bearing cell are different objects.",
  "Size and consequences. An intact antibody is about 150 kDa and a monovalent scFv 25 to 30 kDa according to the NCBI imaging-database entry, which describes scFv as clearing faster from blood and penetrating tumours better; the Huston sFv measured 26,354 Da, and a nanobody review gives masses as low as about 15 kDa (Bathula et al.). These are properties of the soluble protein. A cell carrying a small binder does not penetrate tissue like a small soluble protein. A source lesson gives 25 to 27 kDa and 12 to 15 kDa, which differ from the ranges in the sources it cites.",
  "Affinity versus avidity across formats. Affinity is one interaction and avidity the combined strength of several, so joining domains changes the number and geometry of contacts (Ways and Parham, 1983). Format itself shifts binding: the first sFv had an association constant about six-fold below the parent Fab (Huston et al.). Compare matched formats rather than assuming that a multivalent molecule has better intrinsic affinity.",
  "Inference lesson. Two binders that both bind a purified protein have been shown equivalent in that one interaction only. As CARs, one may express poorly on T cells and the other may signal without target cells, a pattern linked to antigen-independent scFv clustering (Long et al., 2015). Surface expression, target-dependent signalling, unwanted activation, tumour killing and healthy-tissue recognition each need separate evidence. Format names describe architecture, not stability, specificity or superiority.",
  "Single-domain antibody is a broader format than camelid VHH. Ward et al. (1989) isolated murine heavy-chain variable domains that bound antigen without an accompanying light-chain variable domain. Roux et al. (1998) showed independent antigen-recognition domains in nurse-shark NAR, which does not associate with light chains. The variable domain is distinct from the full NAR receptor, which also has constant domains (Greenberg et al., 1995). These examples do not make every single-domain binder a camelid VHH."
]
}),
  t({
    id: "delivery-target-versus-therapeutic-target",
    name: "Delivery targets and therapeutic targets",
    category: "Treatment jargon",
    tldr: "The molecule used to deliver an intervention to a cell can differ from the target of the treatment that cell produces. Both targeting steps need to be named.",
    summary: "A primary mouse cardiac-fibrosis study used CD5-targeted lipid nanoparticles to deliver RNA encoding a receptor directed against fibroblast activation protein. CD5 specified a delivery interaction; the encoded receptor had a different recognition target. This is a non-oncology preclinical illustration of the distinction, not cancer-treatment evidence. Delivery, expression, effector recognition and clinical benefit should retain their separate experiments and biological settings.\n\nTargeted-LNP studies show three separate questions. Which cells receive usable cargo: in the CD5 study mRNA reached most cultured mouse T cells (83 per cent expressed the receptor, against 7 per cent with isotype-control particles) and receptor expression appeared across the main T-cell subsets in injured mice, while liver expression occurred with both CD5 and control particles; recombination in a Cre reporter reached 81.1 per cent of CD4-positive and 75.6 per cent of CD8-positive splenocytes but also 15.0 per cent of CD3-negative cells, and the statement that 87 per cent of receptor-positive cells were CD4-positive is a share of expressing cells, not the share of CD4 T cells that expressed the receptor, so each percentage needs its denominator. What the receptor recognises: FDA's January 2024 CAR T guidance says cytokine release and killing should be antigen-dependent, testable with cells that vary in target antigen expression, and asks sponsors to assess targeting of healthy tissue that expresses the intended antigen (on-target, off-tumour) and of other antigens (off-target); activity against antigen-positive healthy cells would therefore show target-dependent activity and a safety concern, not selective cancer killing. Where engineered cells act is a further question: a later study with targeted lipid nanoparticles reports reprogrammed CD8-positive T cells from healthy donors and autoimmune patients, tumour control in humanised mice and B-cell depletion in cynomolgus monkeys, each a different experiment and setting (Hunter and colleagues; abstract only). For a vaccine the address can instead be an antigen-presenting cell: intravenous RNA-lipoplexes were aimed at dendritic cells and macrophages in lymphoid compartments by adjusting net charge, without a molecular ligand (Kranz and colleagues).",
    links: [
  {
    "label": "CAR T cells produced in vivo to treat cardiac injury.",
    "url": "https://doi.org/10.1126/science.abm0594"
  },
  {
    "label": "In vivo CAR T cell generation to treat cancer and autoimmune disease.",
    "url": "https://doi.org/10.1126/science.ads8473"
  },
  {
    "label": "Systemic RNA delivery to dendritic cells exploits antiviral defence for cancer immunotherapy.",
    "url": "https://doi.org/10.1038/nature18300"
  },
  {
    "label": "Considerations for the Development of Chimeric Antigen Receptor (CAR) T Cell Products: guidance for industry, January 2024",
    "url": "https://www.fda.gov/media/156896/download"
  }
],
    related: [
  "in-vivo-car-t",
  "binder-targeting-module",
  "mrna-construct-anatomy"
],
    aka: [
      "delivery targeting versus cancer targeting",
      "delivery receptor versus effector target"
    ]
  ,
"asOf": "2026-11-09",
"notes": [
  "Separate delivery-marker binding, uptake, expression, receptor engagement, signalling and target-cell effects. A comparison needs identified live-cell populations and matched antigen-positive and antigen-negative controls. A small amount of unintended-cell expression in a sample cannot establish absence across all cells or tissues, and selectively engineering one cell population does not remove risk to healthy antigen-positive targets."
]
}),
  t({
    id: "chemistry-manufacturing-controls",
    name: "Chemistry, manufacturing and controls",
    category: "Regulation & policy",
    tldr: "This is the evidence describing a product, how it is made and how its quality is controlled. It addresses product questions alongside the separate evidence about clinical outcomes.",
    summary: "FDA guidance for human gene-therapy investigational applications describes information intended to assure product safety, identity, quality, purity and strength, including potency. The potency-assurance guidance further connects manufacturing design, controls and testing. These sources have defined product and regulatory scopes. A manufacturing dossier, a laboratory release result and evidence that an intervention improves clinical outcomes are related but distinct parts of product development. ICH Q6B defines a specification as a list of tests, references to analytical procedures and appropriate acceptance criteria. FDA's May 2026 guidance on CMC flexibilities for cellular and gene therapy biologics licence applications is issued for immediate implementation and says its flexible approaches are not an exhaustive list, so flexibility depends on product and stage and is not an exemption.",
    links: [
  {
    "label": "FDA: chemistry, manufacturing and control information for human gene therapy INDs",
    "url": "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/chemistry-manufacturing-and-control-cmc-information-human-gene-therapy-investigational-new-drug"
  },
  {
    "label": "FDA: Potency Assurance for Cellular and Gene Therapy Products, final guidance (November 2026)",
    "url": "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-potency-assurance-cellular-and-gene-therapy-products"
  },
  {
    "label": "FDA/ICH Q6B: specifications (August 1999)",
    "url": "https://www.fda.gov/media/71510/download"
  },
  {
    "label": "FDA: CMC flexibilities for human cellular and gene therapy products for a biologics license application (May 2026)",
    "url": "https://www.fda.gov/media/192321/download"
  },
  {
    "label": "FDA: final Potency Assurance for Cellular and Gene Therapy Products (November 2026 PDF)",
    "url": "https://www.fda.gov/media/196183/download"
  },
  {
    "label": "Federal Register: final potency-assurance guidance, 3 November 2026",
    "url": "https://www.federalregister.gov/documents/2026/11/03/2026-22427/potency-assurance-for-cellular-and-gene-therapy-products-guidance-for-industry-availability"
  }
],
    related: [
      "certificate-of-analysis",
      "manufacturing-process-comparability",
      "cell-therapy-release-testing",
      "mrna-lnp-manufacturing"
    ],
    aka: [
      "chemistry manufacturing and controls",
      "CMC quality information"
    ]
  ,
"asOf": "2026-11-10",
"notes": [
  "CMC is the product-quality evidence: what the product is, how it is made and how its important features are checked. For living-cell and gene products chemistry is not restricted to chemical measurements; FDA's January 2020 gene-therapy CMC guidance covers product description, manufacture, specifications and stability for investigational applications. A facility's GMP framework, a dossier and a lot's release decision are different things.",
  "Critical quality attributes (CQAs) are product characteristics kept within justified limits, and the 2020 guidance says establishing them early matters because comparability by analytical methods depends on them. A processing setting and the product attribute it affects are related but are not the same measurement. ICH Q6B defines a specification as a list of tests, references to analytical procedures and acceptance criteria.",
  "Identity and potency answer different questions. FDA's 1999 vaccine CMC guidance asks for characterisation with respect to identity, purity, potency and stability, and FDA's November 2026 potency guidance expects the relationship between a measured attribute and the product's mechanism of action to be supported.",
  "Stability asks whether quality persists under stated storage, transport and use conditions. The 2020 guidance asks for stability protocols, data, storage conditions and shelf life. A result at manufacture, or one time point, does not cover every later journey. Q5E notes that stability studies can detect subtle differences not seen at release.",
  "Changes need assessment of whether earlier evidence still applies. FDA's CAR T guidance says showing that changed product meets current lot-release criteria is typically insufficient to establish comparability. A dossier written for one version cannot simply be relabelled for a changed formulation, even if the sequence is shared.",
  "Evidence develops with the program. FDA's May 2026 CMC-flexibilities guidance, issued for immediate implementation, addresses cell and gene products moving toward a biologics licence application and states that its flexible approaches are not an exhaustive list. Flexibility depends on product and stage and is not an exemption from quality requirements; an investigational submission and a marketing application are different review settings."
]
}),
  t({
    id: "certificate-of-analysis",
    name: "Certificate of analysis",
    category: "Regulation & policy",
    tldr: "A certificate of analysis reports specified test results for an identified material lot. It needs to be read with the tests, acceptance criteria and intended use.",
    summary: "ICH Q7 describes certificates for active-ingredient or intermediate batches, including identity, batch details, tests, acceptance limits and results. FDA CAR T-cell guidance also discusses assessment of incoming material certificates. Requirements depend on the material and governing framework. A certificate is a lot-specific report, not independent proof of every possible property, general regulatory approval or clinical benefit. Q7 says an authentic certificate should be issued for each batch on request, give the material name, batch number and release date, list each test with its acceptance limits and numerical results, and be dated and signed by authorised quality-unit personnel (11.40 to 11.42). Q7 also allows a supplier's certificate to replace some incoming-material tests only where the manufacturer has a supplier-evaluation system and still tests identity of each batch (7.30), so a raw-material certificate is not a result for the final product. FDA's 2024 CAR T guidance says vector copy number per CAR-positive cell should be reported on the lot certificate and that supplier certificates form part of reagent qualification.",
    links: [
  {
    "label": "FDA/ICH Q7: certificates of analysis, section 11.4",
    "url": "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/q7-good-manufacturing-practice-guidance-active-pharmaceutical-ingredients-guidance-industry"
  },
  {
    "label": "FDA: considerations for development of CAR T-cell products",
    "url": "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/considerations-development-chimeric-antigen-receptor-car-t-cell-products"
  },
  {
    "label": "FDA/ICH Q7 (September 2016): sections 7.30 and 11.4",
    "url": "https://www.fda.gov/files/drugs/published/Q7-Good-Manufacturing-Practice-Guidance-for-Active-Pharmaceutical-Ingredients-Guidance-for-Industry.pdf"
  }
],
    related: [
      "chemistry-manufacturing-controls",
      "cell-therapy-release-testing",
      "manufacturing-process-comparability"
    ],
    aka: [
      "lot certificate of analysis"
    ]
  ,
"asOf": "2026-11-10",
"notes": [
  "A certificate of analysis is tied to a lot and a material. A raw-material certificate is not a final-product certificate. ICH Q7 allows a supplier's certificate to replace some incoming-material tests only where the manufacturer has a system to evaluate suppliers and still tests identity of each batch (7.30), and FDA's CAR T guidance lists certificate assessment among reagent qualification steps next to visual inspection and testing. A shared project label cannot turn a raw-material result into a final-cell result.",
  "Read method, result, unit, denominator and criterion together. FDA's CAR T guidance gives an example: the average vector copy number per CAR-positive cell should be reported on the lot certificate, and dividing by total cells instead includes CAR-negative cells in the denominator and lowers the reported value. A number can mean a concentration, a percentage of a defined count, or activity relative to a reference, so within specification is interpretable only once the specification and reporting method are known.",
  "Issuing context. ICH Q7 section 11.4 says a certificate should give the material name, grade, batch number and release date, expiry or retest date, each test with acceptance limits and numerical results, and be dated and signed by authorised quality-unit personnel. Q7 is scoped to active ingredients and intermediates, so this is a reading aid and not a required template for a final cell product.",
  "A certificate reports; a quality review decides. The existence of the document does not independently prove the whole review, because raw data, manufacturing records and investigations may sit elsewhere. Release is the documented disposition of the lot (see batch release).",
  "Viability, identity and potency answer different questions, and a certificate is not evidence of clinical effect, eligibility or lawful access. The reading rule for gaps: not reported is not zero, not failed and not passed, and a later storage or handling event is not resolved by an earlier acceptable laboratory result, which is why Q7 also dates results and gives retest dates."
]
}),
  t({
    id: "manufacturing-process-comparability",
    name: "Comparability after manufacturing changes",
    category: "Regulation & policy",
    tldr: "A changed manufacturing process needs evidence about the product before and after the change. Comparability asks whether observed differences could matter to product quality, safety or effectiveness.",
    summary: "ICH Q5E provides a framework for comparing a biological product before and after manufacturing changes. It emphasizes quality attributes and assessing whether additional nonclinical or clinical evidence is needed. It does not prescribe one universal testing strategy. The question concerns a specified process change and product; it should not be collapsed into a general claim that all batches, sites or related products are interchangeable. Q5E states that comparability does not necessarily mean the pre-change and post-change attributes are identical, but that they are highly similar and existing knowledge is predictive enough that differences have no adverse impact on safety or efficacy. For autologous CAR T cells FDA's 2024 guidance says historical lots may be inadequate and recommends side-by-side testing on the same starting material where possible, for example one leukapheresis split between the pre-change and post-change processes. FDA's July 2023 manufacturing-changes and comparability guidance for cellular and gene therapy products is still labelled draft, not for implementation, on FDA's page checked 9 November 2026.",
    links: [
  {
    "label": "EMA/ICH Q5E: comparability after a manufacturing-process change",
    "url": "https://www.ema.europa.eu/en/documents/scientific-guideline/ich-q-5-e-comparability-biotechnologicalbiological-products-step-5_en.pdf"
  },
  {
    "label": "FDA/ICH Q5E: comparability of biotechnological/biological products (June 2005)",
    "url": "https://www.fda.gov/media/71489/download"
  },
  {
    "label": "FDA: considerations for the development of CAR T cell products (January 2024), comparability section",
    "url": "https://www.fda.gov/media/156896/download"
  }
],
    related: [
      "chemistry-manufacturing-controls",
      "certificate-of-analysis",
      "biosimilar-manufacturing",
      "cell-therapy-release-testing"
    ],
    aka: [
      "manufacturing process comparability",
      "process-change comparability"
    ]
  ,
"asOf": "2026-11-10",
"notes": [
  "Comparable does not mean identical. Q5E says comparability shows that pre-change and post-change product are highly similar and that existing knowledge predicts that any differences have no adverse impact on safety or efficacy. First describe what changed and which properties it might alter, then use methods able to detect those effects. FDA's CAR T guidance says meeting current lot-release criteria is typically insufficient to establish comparability, and Q5E notes that stability studies can reveal subtle differences.",
  "Where suitable, the same starting material can be split between the old and new process, for example one leukapheresis divided between pre-change and post-change manufacture (FDA CAR T guidance). This reduces one source of variation but does not erase all uncertainty or replace an adequate study design; healthy-donor material may be used in some studies, with patient-versus-donor differences considered.",
  "Measurement caution. An assay change can itself create an apparent product difference, which is why FDA's potency guidance has sections on reference materials and on assay changes and transfers. The CAR T guidance asks for predefined acceptance criteria and appropriate statistical methods. A nonsignificant test alone does not establish similarity, because an insensitive comparison can miss an important difference; this is an inference from the need for predefined criteria and sensitive methods.",
  "Q5E says the evaluation should indicate whether confirmatory nonclinical or clinical studies are appropriate. Inference lesson: if cell counts match after a medium change but a relevant T-cell subset shifts substantially, count is one attribute, so the subset, function and other plausibly affected properties must be assessed before earlier evidence is called relevant. A process bridge is not head-to-head equivalence between different therapies. FDA's July 2023 comparability guidance for cellular and gene therapy products was still labelled draft, not for implementation, on FDA's page read on 9 November 2026.",
  "Personalisation does not give a new sequence or an edited process an automatic bridge to every earlier result. A platform may deliberately vary antigen sequence under defined controls, and each change still has to be assessed for its effect on the product."
]
}),
  t({
    id: "cell-segmentation",
    name: "Cell segmentation in tissue measurements",
    category: "Methods and models",
    tldr: "Image analysis estimates which pixels or detected molecules belong to each cell. Those assignments affect the measurements reported for that cell.",
    summary: "The Mesmer study developed and tested whole-cell segmentation across tissue images and used the estimated boundaries to extract cellular features. A separate spatial-transcriptomics reanalysis found that misassigned molecules could change downstream cell-state and interaction analyses. These findings concern defined datasets and methods, not one universal error rate. Segmentation quality and signal assignment need evaluation before a spatial measurement is treated as a biological conclusion. Mesmer was trained on TissueNet, a dataset of more than 1 million manually labelled cells, and was reported to generalise across the tissue types and imaging platforms in that dataset at human-level performance; its authors note that segmentation inaccuracies can substantially bias the identification and counting of cells, and that cells whose nucleus lies outside the imaging plane are missed by nucleus-based methods (Greenwald and colleagues, 2022). In that evaluation, a predicted and a true cell with a one-to-one match by intersection over union count as accurate, predicted cells with no match are false positives and true cells with no match are false negatives. The Cellpose study reported a generalist method trained on more than 70,000 segmented objects that worked without retraining across the image types it evaluated (Stringer and colleagues, 2021). Baysor was developed because methods that approximate cell positions from nuclear stains make cell boundaries hard to distinguish in single-molecule spatial data (Petukhov and colleagues, 2022).",
    links: [
  {
    "label": "Whole-cell segmentation of tissue images with human-level performance using large-scale data annotation and deep learning.",
    "url": "https://doi.org/10.1038/s41587-021-01094-0"
  },
  {
    "label": "Impact and correction of segmentation errors in spatial transcriptomics.",
    "url": "https://doi.org/10.1038/s41588-025-02497-4"
  },
  {
    "label": "Stringer et al., Cellpose: a generalist algorithm for cellular segmentation (Nature Methods 2021)",
    "url": "https://doi.org/10.1038/s41592-020-01018-x"
  },
  {
    "label": "Petukhov et al., Cell segmentation in imaging-based spatial transcriptomics (Nature Biotechnology 2022)",
    "url": "https://doi.org/10.1038/s41587-021-01044-w"
  }
],
    related: [
      "imaging-mass-cytometry",
      "spatial-transcriptomics",
      "tumour-purity"
    ],
    aka: [
      "single-cell tissue segmentation"
    ]
  ,
"notes": [
  "Reading guide (definitions plus OnCo inference). Detection asks whether a cell was found, segmentation asks which pixels belong to it, and phenotyping classifies the cell afterwards; finding a nucleus does not give a reliable whole-cell boundary. Intersection over union is the area two masks share divided by the area either covers, from 0 to 1, and a single value can hide missed or merged cells, so check object counts and characteristic errors too. A mask assigns existing signals to estimated regions and is not a measurement of a new marker. Merging, splitting and missing cells distort counts, marker combinations and spatial relations, so overlay masks on the original channels.",
  "Fictional worked example (two stipulated cells). One mask covers a small T cell and an adjacent cancer cell, so one table row reports both an immune marker and keratin; that is a merged object, not a hybrid cell. A split into three objects for two cells adds objects, not cells. Correcting the mask may show two neighbouring cells, and their proximity still does not prove immune recognition.",
  "Figure reading (synthetic, light and dark renders agree): the marker channels A (immune) and K (keratin) stay fixed while a merged mask gives one object, a split gives three, and a shifted border assigns signals to the wrong object; the table changes and the image does not. An overlay does not prove identity or function.",
  "Analysis card in words (a reading guide). Input and tissue cost: existing image channels and scale information; computation consumes no additional tissue, though upstream staining or imaging may already have consumed material. Output and units: labelled masks, object counts, estimated cell area in square micrometres when calibrated, coordinates and distances in micrometres, and unitless overlap scores. Controls: original-image overlays, representative manual annotations, held-out images, checks by cell type and region, and recorded software, model and settings. Thresholds: error tolerances set for the downstream task. Failure modes: merged, split or missing cells, weak boundary stains, misaligned channels, debris, and tissue or stain differences from the development data. Cannot tell you: new molecular signals, complete cell outlines outside the section, receptor specificity, interaction or killing. Validation context: an image-analysis component validated for a defined tissue, acquisition and task."
],
"asOf": "2026-11-10"
}),
  t({
    id: "targeted-proteomics-quantification",
    name: "Targeted proteomics and quantification limits",
    category: "Methods and models",
    tldr: "A targeted protein assay measures selected peptide signals through a defined workflow. Reliable amounts require evidence about the quantitative range and precision of the assay.",
    summary: "A primary multilaboratory study evaluated isotope-dilution multiple-reaction-monitoring assays for selected plasma proteins, examining recovery, reproducibility, linear range, detection and quantification limits. The performance belonged to the tested materials, analytes and protocols. It was not a universal certificate for all proteins or specimens. A reported protein amount should retain its measured peptide, calibration approach, sample preparation and supported range. An NIH workshop report on targeted mass spectrometry found no consensus on the criteria for a successful peptide assay and set out three tiers of assay performance, with response and calibration curves generated for each analyte in the relevant matrix to establish limits of detection and quantification; quantification rests on precursor-product ion pairs, called transitions, shown to be free of interference, and a surrogate protein standard must be shown to behave like the native analyte in tests of recovery after adding a known amount (Carr and colleagues, 2014). Stable-isotope-labelled internal standard peptides with the sequence of the analyte are spiked into the digest, and extended peptides or recombinant proteins can compensate for variability in digestion (Hoofnagle and colleagues, 2016). A multilaboratory plasma study reported reproducibility, recovery, linear range and limits of detection and quantification at microgram-per-millilitre protein concentrations (Addona and colleagues, 2009).",
    links: [
  {
    "label": "Multi-site assessment of the precision and reproducibility of multiple reaction monitoring-based measurements of proteins in plasma.",
    "url": "https://doi.org/10.1038/nbt.1546"
  },
  {
    "label": "Carr et al., Targeted peptide measurements in biology and medicine (Molecular and Cellular Proteomics 2014)",
    "url": "https://doi.org/10.1074/mcp.M113.036095"
  },
  {
    "label": "Hoofnagle et al., Recommendations for the Generation, Quantification, Storage, and Handling of Peptides Used for Mass Spectrometry-Based Assays (Clinical Chemistry 2016)",
    "url": "https://doi.org/10.1373/clinchem.2015.250563"
  }
],
    related: [
      "proteomics",
      "rppa",
      "analytical-vs-clinical-validation",
      "tissue-preparation-assay-fit"
    ],
    aka: [
      "targeted protein quantification",
      "multiple-reaction-monitoring protein assays"
    ]
  ,
"notes": [
  "Reading guide (OnCo inference built on the ICH definitions). A signal detected below the quantification limit is meaningful as detection, but it does not support a reliable amount, and neither it nor non-detection means biological zero. An upper limit also bounds the range, and a saturated response cannot separate larger inputs. Keep the denominator with every amount (for example femtomoles per microgram of total extracted protein or a concentration per volume), because it describes the mixture and not receptors per malignant cell; a selected peptide is a proxy for its source protein and cannot count intact receptors or surface copies. Tight repeats show precision, which can coexist with systematic bias. A standard added after digestion can control later measurement but cannot correct material already lost.",
  "Fictional worked example. A summary says 'receptor peptide R is absent' for an assay that detected R below its quantification limit. The result should read 'detected below the validated quantification limit', with the limit and units: it supports detection under that assay's rules but neither a dependable amount nor biological absence.",
  "Figure reading (fictional calibration, light and dark renders agree, no cutoff): a calibration plot has four regions in order of rising input, blank or background (no detection claim), detected below the lower limit of quantification (no reliable amount), validated range (report amount and units) and upper saturation (the response flattens), with replicate points scattered on the curve; a second panel says peptide amount is not surface location, and tight repeats alone do not rule out bias. Limits belong to the analyte and matrix.",
  "Assay card in words (a reading guide). Measures and how: selected peptide amounts, by extracting, digesting, measuring specified ions and fragments with controls, calibrating and assessing analyte performance. Input and tissue cost: a validated tissue, cell or fluid matrix; extraction and digestion consume material, and required mass or volume and fixation compatibility are assay-specific. Output and units: peptide identity, amount or ratio, with the denominator and the peptide-to-protein inference kept. Thresholds: analyte-specific limit of detection, quantification limit, upper limit, bias and precision acceptance and reportable range, with no universal limit or treatment threshold. Failure modes: incomplete recovery or digestion, shared peptides, interference, unstable standards, matrix effects and signal outside the validated range. Limits: no automatic intact-form, location, cell-of-origin, accessibility, occupancy or drug-dependence conclusion. Validation tier: fit-for-purpose research tiers describe analytical characterisation and do not themselves confer clinical approval."
],
"asOf": "2026-11-10"
}),
];

import type { EntityInput } from "@/lib/schema";

const asOf = "2026-09-06";

/**
 * Frontier technologies that have no established entity yet. Kept separate so they can be
 * reviewed as a group; statuses are deliberately conservative.
 */
export const frontier: EntityInput[] = [
  {
    id: "programmable-dna-targeting-therapeutics", kind: "technology", name: "Programmable DNA-targeting therapeutics", sections: ["targeted-therapy", "drug-discovery"], status: "preclinical", asOf,
    tldr: "An experimental idea: a drug that reads a cell's DNA, recognises a cancer-specific sequence, and kills only cells that carry it. Change the guide, and the same drug becomes a new drug.",
    summary: "Sequence-programmable therapeutics aim to act at the DNA level rather than the protein level, in principle reaching drivers with no druggable protein pocket (MYC, TP53 loss, APC loss). Conceptual relatives include CRISPR-based transcriptional or lethal editing, sequence-specific DNA-binding toxins, and synthetic gene circuits that fire on a mutant sequence. FinalDose (Y Combinator Spring 2026) is the most visible company pursuing a programmable 'guide + kill switch' platform; no peer-reviewed data, IND, or clinical trial has been disclosed as of September 2026. Delivery to tumour cells in vivo, off-target recognition, and immunogenicity are the known barriers for every DNA-level modality to date.",
    principle: "A guide component recognises a defined genomic sequence inside the cell; recognition triggers an effector (nuclease, toxin, or transcriptional switch) that kills or disables the cell. Healthy cells lacking the sequence are, in theory, untouched.",
    strengths: ["Targets the causal genetic lesion rather than a downstream protein", "Re-programmable: new guide, new indication", "Could address tumour-suppressor loss and 'undruggable' drivers"],
    limitations: ["No human data as of 2026", "Delivery to solid tumours is unsolved for nucleic-acid therapeutics", "Off-target cutting or recognition; immunogenicity of bacterial proteins", "Tumour heterogeneity means a single sequence may not be present in every cell"],
    technologies: ["crispr-screens", "antisense-sirna"], targets: ["tp53", "kras"],
    tags: ["frontier", "concept"],
    links: [{ label: "FinalDose (Y Combinator)", url: "https://www.ycombinator.com/companies/finaldose" }],
  },
  {
    id: "fragmentomics", kind: "technology", name: "cfDNA fragmentomics", sections: ["early-detection", "diagnostics"], status: "established", asOf, wikipedia: "https://en.wikipedia.org/wiki/Cell-free_DNA",
    tldr: "Reading the sizes and positions of DNA fragments in blood, not the mutations. Cancer cells die messily and leave a recognisable fragmentation pattern.",
    summary: "Fragmentomics analyses genome-wide cell-free DNA fragment length, end motifs, and nucleosome footprints at low sequencing depth, which is cheaper than deep mutation or methylation sequencing. DELFI Diagnostics commercialised FirstLook Lung (2023) as a blood test to increase uptake of low-dose CT screening, and presented the first randomised clinical-utility data (L301 FIRSTLUNG) at ATS 2026. Fragment features are also being layered into multi-cancer detection and MRD assays by Guardant, GRAIL, and academic groups.",
    principle: "Whole-genome sequencing of plasma cfDNA at ~1-2x depth; machine learning on fragment-size distributions across genomic windows distinguishes tumour-derived from haematopoietic DNA.",
    strengths: ["Low cost per sample", "Complements methylation and mutation signals", "Sensitive to chromatin state of the cell of origin"],
    limitations: ["Lower specificity than deep methylation panels alone", "Tissue-of-origin resolution weaker than methylation", "Clinical utility (mortality benefit) unproven"],
    technologies: ["liquid-biopsy", "mced", "mrd-testing"], terms: ["ctdna"], cancers: ["nsclc"],
    tags: ["frontier"],
    links: [{ label: "DELFI FIRSTLUNG at ATS 2026", url: "https://www.biospace.com/press-releases/delfi-diagnostics-to-present-first-clinical-utility-data-for-blood-based-lung-cancer-screening-at-ats-2026-international-conference" }],
  },
  {
    id: "adc-payload-neutralizer", kind: "technology", name: "ADC payload neutralisers", sections: ["adcs", "supportive-care"], status: "phase-1", asOf,
    tldr: "An antibody given alongside an ADC that mops up the poison once it leaks into the bloodstream, so the ADC can hit the tumour with fewer side effects.",
    summary: "Free payload released from ADCs in circulation drives much of their toxicity (neuropathy, rash, hyperglycaemia with MMAE; neutropenia with SN-38). A neutralising antibody with high affinity for the free payload but not the conjugated form could widen the therapeutic index without changing the ADC. Generate Biomedicines' GB-4362, an AI-designed MMAE neutraliser, entered the clinic in 2026 with FDA Fast Track designation for enfortumab vedotin-induced toxicity in urothelial cancer.",
    principle: "Antibody binds the released small-molecule payload in plasma, preventing uptake by normal tissue; conjugated payload on the ADC remains unaffected.",
    strengths: ["Adds to existing approved ADCs without reformulation", "Could permit higher ADC doses"],
    limitations: ["Early clinical stage", "Payload-specific: one neutraliser per payload class", "Risk of blunting bystander killing if payload diffuses into plasma from the tumour"],
    technologies: ["adc", "ai-drug-design"], drugs: ["enfortumab-vedotin"], cancers: ["urothelial"],
    tags: ["frontier"],
    links: [{ label: "Generate Biomedicines Q2 2026", url: "https://www.biospace.com/press-releases/generate-biomedicines-inc-reports-second-quarter-2026-financial-results-and-provides-business-update" }],
  },
];

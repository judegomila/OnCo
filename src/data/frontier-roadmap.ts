import type { RoadmapInput } from "@/lib/schema";

const asOf = "2026-09-08";

/**
 * Horizon roadmaps over the frontier entities in frontier.ts. Steps are grouped by when a
 * technology could plausibly change practice, not by when its advocates say it will. Each
 * description states what would have to be true for the step to happen, so a reader can see
 * how far the claim outruns the evidence.
 */
export const frontierRoadmaps: RoadmapInput[] = [
  {
    id: "frontier-2035", kind: "roadmap", name: "Radical oncology: what could change the war by 2035", asOf,
    tldr: "A horizon map of the wilder ideas in cancer, sorted by how close they are to mattering, with the reason each one might never arrive.",
    summary: "Most of what is celebrated as a breakthrough is an incremental gain on an existing modality. This roadmap collects the ideas that would change the shape of treatment rather than its slope: therapies that read DNA directly, living drugs, radiation delivered in milliseconds, and detection that runs continuously rather than annually.\n\nThe grouping is by horizon, from technologies already producing randomised data to ideas with no human evidence at all. Placement reflects the state of evidence in September 2026, not company timelines. Several steps will not happen: the failure record of hypoxia-activated prodrugs, metabolic therapy, and matrix-softening agents is a reminder that a clean mechanism is not a clinical benefit.",
    sections: ["drug-discovery", "radiation", "cell-therapy", "early-detection"],
    steps: [
      {
        era: "Now (randomised data exists)", status: "current",
        title: "Ideas already being tested against a control arm",
        description: "Microbiome modulation, spatially fractionated radiotherapy, sonodynamic therapy in glioblastoma, GDF-15 blockade for cachexia, and repurposed cheap drugs all have randomised or registrational trials running in 2026. These are the frontier ideas closest to a guideline: each has a defined population, a comparator, and a readout inside a few years. Cachexia therapy is the likeliest first approval in a domain with no approved drug at all.",
        refs: ["microbiome-modulation-io", "lattice-radiotherapy", "sonodynamic-therapy", "cachexia-therapy", "drug-repurposing", "radiodynamic-therapy"],
      },
      {
        era: "By 2027 (early clinical, readouts imminent)", status: "emerging",
        title: "Living drugs, logic gates, and designed proteins reach decision points",
        description: "Engineered bacteria, logic-gated cell therapies, molecular glue platforms, and de novo designed binders all have first-in-human programmes running. The question each faces is the same: does the elegant mechanism survive contact with a heterogeneous human tumour? Expect most to disappoint on response rate while establishing safety, which is how bispecific antibodies and ADCs also began.",
        refs: ["engineered-bacteria-therapy", "logic-gated-therapeutics", "molecular-glue-platforms", "de-novo-protein-design", "in-situ-vaccination", "histotripsy-immune-priming", "radionuclide-parp-combination"],
      },
      {
        era: "By 2030 (physics and chemistry maturing)", status: "emerging",
        title: "Radiation and radiopharmaceuticals get a second act",
        description: "Auger emitters, contained alpha nanogenerators, proton arc delivery, and very-high-energy electrons are all limited today by engineering rather than biology: isotope supply, daughter recoil, gantry speed, and dosimetry at ultra-high dose rate. Those are tractable problems with capital behind them. If FLASH sparing is real in humans, deep FLASH by electron or proton arc would be the largest change to radiotherapy since intensity modulation.",
        refs: ["auger-electron-therapy", "alpha-nanogenerators", "proton-arc-therapy", "vhee-radiotherapy", "magnetic-nanoparticle-hyperthermia", "photothermal-nanoparticles"],
      },
      {
        era: "By 2030 (detection and decision-making)", status: "emerging",
        title: "Monitoring becomes continuous and selection becomes spatial",
        description: "Fragmentomics, breath analysis, and near-continuous ctDNA sampling all push detection from an annual event towards a running signal, while spatial omics and organoid testing push treatment choice from genotype towards phenotype and architecture. The gating question for every one of them is not sensitivity but utility: acting earlier has to change outcomes, and no randomised trial has yet shown that for continuous monitoring.",
        refs: ["continuous-ctdna-monitoring", "breath-vocs", "spatial-omics-guided-therapy", "organoid-guided-therapy-scale", "digital-twins-trials", "n-of-1-platforms", "total-body-pet-screening"],
      },
      {
        era: "By 2035 (needs a delivery breakthrough)", status: "speculative",
        title: "Writing to the genome and the epigenome inside a tumour",
        description: "In vivo base and prime editing, epigenetic silencing, antibody-oligonucleotide conjugates, and programmable DNA-targeting drugs share one blocker: getting a large, charged molecule into most cells of a solid tumour. Liver-directed editing is already in the clinic, so the chemistry works; the tumour delivery problem has resisted thirty years of effort. If it is solved, undruggable drivers such as MYC and TP53 loss become addressable and much of this roadmap is rewritten.",
        refs: ["in-vivo-gene-editing-cancer", "epigenetic-editing", "antibody-oligonucleotide-conjugates", "programmable-dna-targeting-therapeutics", "self-amplifying-rna", "exosome-therapeutics", "dna-origami-nanorobots"],
      },
      {
        era: "By 2035 (attacking the host, not the tumour)", status: "speculative",
        title: "Treating the soil rather than the seed",
        description: "Stromal CAR-T, nerve blockade, senescence clearance, mechanical decompression, and targeting the tumour's own microbes all treat the environment a cancer needs rather than the cancer itself. The attraction is that the host does not mutate. The risk is visible in the record: PEGPH20 failed, FAP CAR-T caused cachexia in mice, and broad antibiotics blunt immunotherapy. Success here probably requires far better spatial measurement first.",
        refs: ["stroma-directed-car", "cancer-neuroscience", "senescence-targeting", "mechanobiology-therapy", "tumour-microbiome-targeting", "hypoxia-activated-therapy", "trained-innate-immunity"],
      },
      {
        era: "Speculative (no human evidence)", status: "speculative",
        title: "Ideas that are still physics and mouse data",
        description: "DNA origami nanorobots, phage-based delivery, and quantum-dot imaging agents have striking preclinical demonstrations and no clinical footprint. They belong on the map because the failure modes are known and specific, nuclease degradation, rapid clearance, heavy-metal toxicity, rather than vague. Any of them could move a horizon if a single delivery or materials problem is solved.",
        refs: ["dna-origami-nanorobots", "phage-delivery", "quantum-dot-imaging", "chronotherapy", "metabolic-therapy"],
      },
    ],
  },
  {
    id: "cure-paths", kind: "roadmap", name: "Paths to cures: interception, eradication, control", asOf,
    tldr: "Three different ways a cancer stops killing someone: stop it before it starts, remove every last cell, or hold it in check for life. Each needs different technology.",
    summary: "Cure is not one goal. Interception prevents a cancer from forming or removes it while it is still precancerous. Eradication removes every malignant cell, which is what surgery plus adjuvant therapy already achieves in early disease and what cell therapy achieves in some leukaemias. Control converts advanced cancer into a managed chronic condition, which is what endocrine therapy in breast cancer and TKIs in CML already do for many patients.\n\nSeparating them matters because they have different endpoints, different evidence requirements, and different technologies. An interception vaccine needs decades of follow-up in healthy people; an eradication strategy needs a sensitive measure of residual disease; a control strategy needs sequencing, tolerability, and resistance management rather than depth of response.",
    sections: ["prevention", "early-detection", "cell-therapy", "targeted-therapy"],
    steps: [
      {
        era: "Interception: established", status: "historic",
        title: "What already prevents cancer",
        description: "HPV and hepatitis B vaccination, tobacco control, screening with removal of precancerous lesions, risk-reducing surgery in carriers, and tamoxifen or aspirin chemoprevention are the interventions that have measurably reduced incidence. Almost every future interception technology is competing against, or adding to, this list, and none of it is glamorous.",
        refs: ["hpv-vaccine", "chemoprevention", "colorectal-screening", "germline-testing", "risk-reducing-salpingectomy"],
      },
      {
        era: "Interception: next", status: "emerging",
        title: "Vaccinating and monitoring people who do not yet have cancer",
        description: "Shared-neoantigen vaccines in Lynch syndrome and BRCA carriers, multi-cancer blood tests, and breath analysis all aim to act before or at the very beginning of disease. The bar is high: a healthy person accepts risk today for a probabilistic benefit later, so safety must be near-perfect and trials must run for years with surrogate endpoints. A positive interception vaccine trial would be the single largest change on this roadmap.",
        refs: ["interception-vaccination", "shared-antigen-vaccine", "mced", "fragmentomics", "breath-vocs", "trained-innate-immunity"],
      },
      {
        era: "Eradication: established", status: "current",
        title: "Removing every cell, and knowing that you did",
        description: "Surgery with adjuvant systemic therapy cures a large fraction of early cancers; CAR-T and transplant cure a minority of advanced haematologic malignancies. What has changed is measurement: ctDNA-based residual disease testing turns 'we think it is gone' into a testable claim, and the first ctDNA-guided approval arrived in bladder cancer in 2026.",
        refs: ["mrd-testing", "car-t", "allogeneic-hsct", "robotic-surgery", "sbrt"],
      },
      {
        era: "Eradication: next", status: "emerging",
        title: "Killing the last cell, wherever it is hiding",
        description: "Micrometastatic disease is where alpha and Auger emitters, in situ vaccination, and logic-gated cell therapy should have their advantage, because each kills single cells rather than bulk. The pairing to watch is a sensitive residual-disease test that says who still has disease, and a single-cell-selective therapy that can clear it, which is the explicit design of several ongoing trials.",
        refs: ["targeted-alpha-therapy", "auger-electron-therapy", "in-situ-vaccination", "logic-gated-therapeutics", "continuous-ctdna-monitoring", "radionuclide-parp-combination"],
      },
      {
        era: "Control: established", status: "current",
        title: "Living with cancer as a chronic disease",
        description: "Endocrine therapy in hormone-driven breast cancer, androgen-pathway therapy in prostate cancer, BTK and BCL-2 inhibitors in CLL, and TKIs in CML already keep many people alive for years or decades. Control depends less on depth of response than on tolerability, sequencing, and managing resistance, which is why supportive care and cardio-oncology belong in this row.",
        refs: ["endocrine-therapy", "androgen-deprivation", "kinase-inhibitors", "cardio-oncology", "exercise-oncology", "geriatric-assessment"],
      },
      {
        era: "Control: next", status: "emerging",
        title: "Steering resistance instead of waiting for it",
        description: "If a cancer cannot be eradicated, the goal becomes keeping the sensitive clone dominant. Adaptive dosing, timing treatment to the body clock, payload switching guided by resistance biomarkers, and treating the host environment all aim at that. Cachexia therapy belongs here too: patients who keep weight and function tolerate more lines of treatment.",
        refs: ["chronotherapy", "cachexia-therapy", "cancer-neuroscience", "senescence-targeting", "spatial-omics-guided-therapy", "organoid-guided-therapy-scale", "drug-repurposing"],
      },
      {
        era: "The honest caveat", status: "speculative",
        title: "What would have to be true",
        description: "Every path above assumes measurement improves faster than the cancer adapts: interception needs a test that finds disease while it is still local, eradication needs one that proves nothing is left, control needs one that spots the resistant clone before it takes over. Technology that measures is therefore upstream of technology that treats, which is an unfashionable conclusion but the one the evidence supports.",
        refs: ["mced", "mrd-testing", "spatial-omics-guided-therapy", "continuous-ctdna-monitoring", "total-body-pet-screening"],
      },
    ],
  },
];

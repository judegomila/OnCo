import type { RoadmapInput } from "@/lib/schema";

const asOf = "2026-09-08";

/** Roadmaps for AI foundation models in oncology: the virtual cell and the AI-assisted clinic. */
export const foundationRoadmaps: RoadmapInput[] = [
  {
    id: "virtual-cell", kind: "roadmap", asOf, sections: ["ai-computation", "drug-discovery"],
    name: "Virtual cell roadmap: from bulk omics to a predictive model of a cancer cell",
    tldr: "The attempt to build a computer model of a cell good enough to predict what a drug or mutation will do before anyone runs the experiment.",
    summary: "A virtual cell would let researchers test thousands of drug ideas in silico and personalise treatment from a patient's own tumour profile. The field moved from static atlases to perturbation-trained models in five years; the honest status is that current models generalise poorly to unseen contexts and barely beat simple baselines on rigorous benchmarks, while data generation has begun to scale to the size the problem needs.",
    technologies: ["geneformer", "scgpt", "state-arc", "c2s-scale", "universal-cell-embedding", "gears", "transcriptformer", "single-cell-spatial", "crispr-screens"],
    institutions: ["arc-institute", "stanford", "yale-school-of-medicine"],
    companies: ["vevo-therapeutics", "chan-zuckerberg-initiative", "google-deepmind"],
    steps: [
      { era: "2008-2018", title: "Atlases and bulk omics", status: "historic", description: "TCGA catalogues the genomes of 11,000 tumours; single-cell RNA-seq matures; the Human Cell Atlas begins. Models are statistical, per-dataset, and descriptive.", refs: ["tcga-gdc", "cellxgene-hca", "single-cell-spatial"] },
      { era: "2019-2022", title: "Pooled perturbation screens meet single cells", status: "historic", description: "Perturb-seq and genome-wide CRISPR screens (DepMap) give causal training data; GEARS shows graph models can predict some unseen knockouts.", refs: ["crispr-screens", "depmap", "gears"] },
      { era: "2023-2024", title: "First single-cell foundation models", status: "current", description: "Geneformer, scGPT, UCE, scFoundation and others pretrain on tens of millions of cells. Benchmarks reveal that perturbation prediction often does not beat linear or mean baselines, forcing better evaluation.", refs: ["geneformer", "scgpt", "universal-cell-embedding", "scfoundation", "gears"] },
      { era: "2025-2026", title: "Data at scale and context-aware models", status: "current", description: "Tahoe-100M (100M cells, 1,100 drugs, 50 cancer lines), Arc's Virtual Cell Atlas and Challenge, State trained on 100M+ perturbed cells, C2S-Scale's lab-validated hypothesis, CZI's cross-species models. The problem becomes one of held-out generalisation across cell contexts.", refs: ["tahoe-100m", "arc-virtual-cell-atlas", "state-arc", "c2s-scale", "transcriptformer", "nicheformer"] },
      { era: "2027-2029", title: "Patient-derived contexts and spatial niches", status: "emerging", description: "Models trained on perturbations in patient-derived organoids and spatial data (tumour niches, immune contexts) rather than cell lines alone; coupling with structure models for mechanism; prospective use to rank drug combinations for organoid confirmation.", refs: ["organoids", "functional-drug-testing", "nicheformer", "boltz"] },
      { era: "2030+", title: "Speculative: in silico trials and digital twins", status: "speculative", description: "A tumour's multi-omic profile seeds a patient-specific virtual cell population; treatment sequences are simulated before the first cycle; models are updated from ctDNA and imaging during care. Requires validation standards that do not yet exist.", refs: ["idea-multimodal-foundation-model", "mrd-testing"] },
    ],
  },
  {
    id: "ai-oncology-clinic", kind: "roadmap", asOf, sections: ["ai-computation"],
    name: "AI in the oncology clinic: from narrow cleared tools to multimodal decision support",
    tldr: "How AI is moving from single-task readers of scans and slides towards systems that weigh everything about a patient, and what regulators and evidence still require.",
    summary: "Hundreds of narrow AI devices are cleared, mostly in radiology triage and screening. The first predictive pathology tools (ArteraAI) prove that AI can change treatment decisions under regulation. Foundation models promise breadth, but the evidence base for deployment, the regulatory framework for updating models, and reimbursement are all unsettled.",
    technologies: ["digital-pathology-ai", "radiology-ai-screening", "pathology-foundation-model", "virchow", "prov-gigapath", "musk", "med-gemini", "ai-trial-matching", "sybil", "mirai"],
    drugs: ["artera-ai-prostate", "artera-ai-breast"],
    steps: [
      { era: "2017-2021", title: "Narrow detection tools cleared", status: "historic", description: "FDA clears the first AI detection aids: mammography CAD successors, Paige Prostate (2021), radiology triage for haemorrhage and embolism. Evidence is mostly reader studies.", refs: ["digital-pathology-ai", "radiology-ai-screening", "paige"] },
      { era: "2022-2024", title: "Screening at scale and risk models", status: "current", description: "MASAI (Sweden) shows AI-supported mammography reading finds more cancers with less workload; Sybil and Mirai predict future cancer from today's scan; whole-slide imaging becomes routine, enabling slide-level AI.", refs: ["mammography", "sybil", "mirai", "digital-pathology-ai"] },
      { era: "2025-2026", title: "First predictive AI and foundation models in products", status: "current", description: "ArteraAI Prostate (de novo 2025) predicts treatment benefit; ArteraAI Breast cleared 2026. Pathology foundation models (Virchow2, Prov-GigaPath, TITAN, Atlas) move into commercial biomarker products; multimodal models (MUSK) predict immunotherapy response retrospectively.", refs: ["artera-ai-prostate", "artera-ai-breast", "virchow", "prov-gigapath", "titan", "atlas-aignostics", "musk"] },
      { era: "2026-2028", title: "Prospective evidence and regulatory frameworks", status: "emerging", description: "Randomised or pragmatic trials of AI-guided decisions (screening intervals, treatment selection); FDA predetermined change control plans for model updates; EU AI Act high-risk obligations; payment codes for AI-derived biomarkers. LLM assistants (Med-Gemini class) enter tumour boards for documentation and trial matching under human review.", refs: ["med-gemini", "ai-trial-matching", "tempus-multimodal", "foresight-ehr"] },
      { era: "2029+", title: "Speculative: multimodal decision support as standard of care", status: "speculative", description: "A single model reads slides, scans, genomics and records to recommend and monitor therapy, audited against outcomes and updated continuously. Depends on data-sharing, liability and validation questions that are open today.", refs: ["idea-multimodal-foundation-model", "flatiron-foundation-cgdb", "imaging-data-commons"] },
    ],
  },
];

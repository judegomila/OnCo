/** Schematic aliases for the records in src/data/models-wave.ts, kept apart so a client component can read them without bundling the records (TechThumb imports src/data/schematics.ts). */
/** Aliases for the schematic table: each model borrows the drawing of the process it describes. */
export const modelSchematicAliases: Record<string, string> = {
  "mathematical-oncology": "digital-twins-trials",
  "gompertzian-growth-model": "digital-twins-trials", "log-kill-hypothesis": "cytotoxic-chemotherapy", "norton-simon-hypothesis": "cytotoxic-chemotherapy", "goldie-coldman-model": "wes-wgs",
  "drug-resistance-dynamics": "wes-wgs", "adaptive-therapy-dynamics": "wes-wgs", "evolutionary-game-theory-cancer": "wes-wgs", "clonal-evolution-models": "wes-wgs",
  "reaction-diffusion-glioma-model": "mri", "agent-based-tumour-models": "ai-compute-platforms", "immune-tumour-dynamics-models": "ai-compute-platforms", "quantitative-systems-pharmacology": "ai-compute-platforms",
  "pkpd-modelling": "germline-testing", "body-surface-area-dosing": "cytotoxic-chemotherapy", "tumour-control-probability-models": "imrt-igrt", "fractionation-repopulation-models": "imrt-igrt",
  "tumour-doubling-time": "radiology-ai-screening", "angiogenesis-models": "antiangiogenic", "tumour-mechanics-models": "antiangiogenic", "metastasis-seeding-models": "wes-wgs",
  "mrd-kinetics-models": "ngs-mrd-clonoseq", "digital-twin-patient-models": "digital-twins-trials",
};

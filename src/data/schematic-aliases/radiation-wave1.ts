/** Schematic aliases for the records in src/data/radiation-wave1.ts, kept apart so a client component can read them without bundling the records (TechThumb imports src/data/schematics.ts). */
/** Aliases for the schematic table: each new technology borrows the drawing of the delivery mechanism it shares. */
export const radiationSchematicAliases: Record<string, string> = {
  vmat: "imrt-igrt", "radiosurgery-srs": "sbrt", "adaptive-radiotherapy": "mr-linac", "surface-guided-radiotherapy": "imrt-igrt",
  "respiratory-motion-management": "sbrt", "hypofractionated-radiotherapy": "imrt-igrt", "sabr-oligometastases": "sbrt",
  "hdr-brachytherapy": "brachytherapy", "ldr-seed-brachytherapy": "brachytherapy", "intensity-modulated-proton-therapy": "proton-therapy",
  "total-body-irradiation": "imrt-igrt", "total-skin-electron-therapy": "imrt-igrt", "superficial-radiotherapy": "imrt-igrt", "cobalt-60-teletherapy": "imrt-igrt",
  "radiotherapy-access-gap": "global-oncology-access", radiosensitisers: "imrt-igrt", radioprotectors: "imrt-igrt", "linear-quadratic-model": "imrt-igrt",
  "tumour-hypoxia-modification": "hyperthermia", "dose-painting": "imrt-igrt", "knowledge-based-planning": "treatment-planning-systems",
  "in-vivo-dosimetry": "treatment-planning-systems", radiogenomics: "radiology-ai-screening",
};

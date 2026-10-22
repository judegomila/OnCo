/** Schematic aliases for the records in src/data/manufacturing-wave.ts, kept apart so a client component can read them without bundling the records (TechThumb imports src/data/schematics.ts). */
/** Aliases for the schematic table: each manufacturing record borrows the drawing of the product or process it serves. */
export const manufacturingSchematicAliases: Record<string, string> = {
  "small-molecule-api-synthesis": "cytotoxic-chemotherapy",
  "oral-solid-dose-manufacturing": "kinase-inhibitors",
  "sterile-injectable-generics-manufacturing": "cytotoxic-chemotherapy",
  "bcg-vaccine-manufacturing": "engineered-bacteria-therapy",
  "downstream-purification-chromatography": "monoclonal-antibody-manufacturing",
  "single-use-bioprocessing": "monoclonal-antibody-manufacturing",
  "biosimilar-manufacturing": "monoclonal-antibody",
  "pharmaceutical-gmp-inspections": "monoclonal-antibody-manufacturing",
  "adc-supply-chain": "adc-cdmo-manufacturing",
  "car-t-manufacturing-process": "car-t",
  "allogeneic-cell-banks": "allogeneic-cell-therapy",
  "mrna-lnp-manufacturing": "neoantigen-mrna-vaccine",
  "research-reactor-isotope-production": "medical-cyclotrons-synthesis-modules",
  "cyclotron-isotope-production": "medical-cyclotrons-synthesis-modules",
  "actinium-225-supply": "targeted-alpha-therapy",
  "radiopharmaceutical-gmp-release": "radioligand-therapy",
  "radiotherapy-equipment-manufacturing": "imrt-igrt",
  "medical-imaging-scanner-manufacturing": "pet-ct",
};

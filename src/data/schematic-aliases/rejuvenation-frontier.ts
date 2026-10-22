/** Schematic aliases for the records in src/data/spikes/rejuvenation-frontier.ts, kept apart so a client component can read them without bundling the records (TechThumb imports src/data/schematics.ts). */
/**
 * Front schematics. None of these has a drawing of its own; each is aliased to an existing one that shows the
 * same kind of object, so no record falls back to the generic front shape (src/data/animated-wave8.test.ts).
 * Spread into SCHEMATIC_ALIAS in src/data/schematics.ts.
 *
 * Chosen by reading the labels the borrowed drawing carries, not by the name of the target id: a drawing that
 * names a drug or a cancer the reader is not dealing with is the error this file is most at risk of. Where no
 * drawing fitted, the alias is a label-free one (cell-vaccine, til-therapy, neoantigen-mrna-vaccine) so that
 * nothing false is named; those pages would be better served by drawings of their own.
 */
export const rejuvenationSchematicAliases: Record<string, string> = {
  "rejuv-age-epigenetic-clocks": "methylation-profiling",
  "rejuv-age-clonal-haematopoiesis-after-therapy": "wes-wgs",
  "rejuv-age-senescent-cells-after-treatment": "senescence-targeting",
  "rejuv-age-frailty-and-late-effects": "geriatric-assessment",
  "rejuv-age-telomere-length": "cytogenetics-fish",
  "rejuv-frontier-senolytics": "senescence-targeting",
  "rejuv-frontier-metformin-ageing": "drug-repurposing",
  "rejuv-frontier-rapamycin-ageing": "drug-repurposing",
  "rejuv-frontier-nad-precursors": "drug-repurposing",
  "rejuv-frontier-nad-infusions": "infusion-devices-vascular-access",
  "rejuv-frontier-immune-reconstitution": "allogeneic-hsct",
  "rejuv-frontier-mesenchymal-stromal-cells": "cell-vaccine",
  "rejuv-frontier-fat-grafting": "til-therapy",
  "rejuv-frontier-platelet-rich-plasma": "minoxidil-chemotherapy-alopecia",
  "rejuv-frontier-hyperbaric-oxygen-claims": "hyperbaric-oxygen-radiation-injury",
  "rejuv-frontier-stem-cell-tourism": "alternative-medicine-instead-of-treatment",
  "rejuv-frontier-exosome-injections": "neoantigen-mrna-vaccine",
  "rejuv-frontier-unlicensed-peptides": "proteomics",
  "rejuv-frontier-ozone-therapy": "infusion-devices-vascular-access",
  "rejuv-frontier-hormone-pellets": "endocrine-therapy",
  "rejuv-frontier-what-works": "structured-exercise-survivorship",
};

/** Schematic aliases for the records in src/data/recovery.ts, kept apart so a client component can read them without bundling the records (TechThumb imports src/data/schematics.ts). */
/**
 * Drawings these records borrow, since none of them is a device with a mechanism of its own: the matrix reads as
 * the survivorship plan it feeds, the endocrine record as the checkpoint drawing whose toxicity it describes, and
 * the dose record as the chemotherapy scene. Required by src/data/animated-wave8.test.ts, which fails if any
 * technology falls back to a generic front schematic.
 */
export const recoverySchematicAliases: Record<string, string> = {
  "rejuv-recovery-matrix": "survivorship-care-plan",
  "rejuv-recovery-endocrine-permanence": "checkpoint-inhibitor",
  "rejuv-recovery-cumulative-dose": "cytotoxic-chemotherapy",
};

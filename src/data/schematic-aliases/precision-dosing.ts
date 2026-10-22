/** Schematic aliases for the records in src/data/spikes/precision-dosing.ts, kept apart so a client component can read them without bundling the records (TechThumb imports src/data/schematics.ts). */
/**
 * Drawings for the four records this file adds. None needs a drawing of its own: dosing a cytotoxic drug reads as the
 * chemotherapy scene, and monitoring the blood level of an oral targeted drug reads as the kinase inhibitor one.
 * Spread into SCHEMATIC_ALIAS in src/data/schematics.ts; src/data/animated-wave8.test.ts is what catches a miss.
 */
export const precisionDosingSchematicAliases: Record<string, string> = {
  "fluorouracil-pharmacokinetic-dosing": "cytotoxic-chemotherapy",
  "carboplatin-calvert-dosing": "cytotoxic-chemotherapy",
  "chemotherapy-dosing-in-obesity": "cytotoxic-chemotherapy",
  "oral-targeted-therapy-drug-monitoring": "kinase-inhibitors",
};

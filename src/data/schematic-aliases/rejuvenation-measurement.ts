/** Schematic aliases for the records in src/data/spikes/rejuvenation-measurement.ts, kept apart so a client component can read them without bundling the records (TechThumb imports src/data/schematics.ts). */
/**
 * Schematic aliases. Nothing here is a device or an assay with a mechanism to draw, so each record borrows the
 * scene of the technology whose job it is closest to: the symptom-monitoring drawing for the instruments and the
 * electronic reporting records, the survivorship clinic for the country and access records, the supervised exercise and
 * CT drawings for the objective tests, and the financial navigation scene for the cost records. Aliases resolve
 * one hop only, so each value here is a drawing rather than another alias.
 * Spread into SCHEMATIC_ALIAS in src/data/schematics.ts.
 */
export const rejuvenationMeasurementSchematicAliases: Record<string, string> = {
  // The instruments: the electronic symptom-reporting scene.
  "rejuv-measure-patient-reported-outcomes": "epro-symptom-monitoring",
  "rejuv-measure-eortc-qlq-c30": "epro-symptom-monitoring",
  "rejuv-measure-fact-and-facit": "epro-symptom-monitoring",
  "rejuv-measure-promis": "epro-symptom-monitoring",
  "rejuv-measure-pro-ctcae": "epro-symptom-monitoring",
  "rejuv-measure-eq-5d": "epro-symptom-monitoring",
  "rejuv-measure-minimally-important-difference": "epro-symptom-monitoring",
  "rejuv-measure-missing-data-and-who-is-not-asked": "epro-symptom-monitoring",
  "rejuv-measure-epro-as-treatment": "epro-symptom-monitoring",
  "rejuv-measure-epro-implementation": "epro-symptom-monitoring",
  // Condition-specific instruments: the service each one measures.
  "rejuv-measure-breast-q": "survivorship-care-plan",
  "rejuv-measure-cognitive-function": "cbt-fatigue-distress",
  "rejuv-measure-fear-of-recurrence-inventory": "psycho-oncology",
  "rejuv-measure-lymphoedema": "lymphoedema-decongestive-therapy",
  // Objective measures: exercise, body composition and the ageing marker.
  "rejuv-measure-functional-tests": "structured-exercise-survivorship",
  "rejuv-measure-cardiopulmonary-exercise-testing": "prehabilitation",
  "rejuv-measure-body-composition": "ct",
  "rejuv-measure-wearables-and-step-counts": "telehealth-oncology",
  "rejuv-measure-consumer-biological-age-tests": "methylation-profiling",
  // Country and access records: the survivorship clinic.
  "rejuv-access-survivorship-care-uk": "survivorship-care-plan",
  "rejuv-access-survivorship-care-us": "survivorship-care-plan",
  "rejuv-access-survivorship-care-germany": "survivorship-care-plan",
  "rejuv-access-survivorship-care-nordic": "survivorship-care-plan",
  "rejuv-access-survivorship-care-australia": "survivorship-care-plan",
  "rejuv-access-survivorship-care-lmic": "global-oncology-access",
  "rejuv-access-who-misses-out": "survivorship-care-plan",
  "rejuv-access-rehabilitation-referral": "structured-exercise-survivorship",
  "rejuv-access-fertility-preservation": "fertility-preservation",
  "rejuv-access-exercise-programmes": "structured-exercise-survivorship",
  // Cost records: the navigation service.
  "rejuv-access-what-it-costs-uk": "financial-navigation",
  "rejuv-access-what-it-costs-us": "financial-navigation",
  "rejuv-access-what-it-costs-elsewhere": "financial-navigation",
};

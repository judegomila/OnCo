/** Schematic aliases for the records in src/data/spikes/rejuvenation-paediatric.ts, kept apart so a client component can read them without bundling the records (TechThumb imports src/data/schematics.ts). */
/**
 * Schematics. Each new technology borrows an existing drawing whose labels are true of it: the endocrine records
 * take the hormonal drawings, the organ records take the organ they are about, and the guideline, transition and
 * service records take the survivorship care drawing, which is a care pathway rather than a mechanism.
 */
export const rejuvenationPaediatricSchematicAliases: Record<string, string> = {
  // Burden and mortality: the survivorship pathway drawing.
  "rejuv-paed-chronic-disease-burden": "survivorship-care-plan",
  "rejuv-paed-late-mortality": "survivorship-care-plan",
  // Endocrine: growth, the pituitary axis and bone.
  "rejuv-paed-growth-and-height": "endocrine-therapy",
  "rejuv-paed-pituitary-and-puberty": "endocrine-therapy",
  "rejuv-paed-bone": "bone-modifying-agents",
  // Brain and ears.
  "rejuv-paed-neurocognitive": "cbt-fatigue-distress",
  "rejuv-paed-hearing": "cytotoxic-chemotherapy",
  // Heart: the cardio-oncology loop of risk, surveillance and protection.
  "rejuv-paed-heart": "cardio-oncology",
  // Fertility: the oncofertility drawing.
  "rejuv-paed-fertility-female": "fertility-preservation",
  "rejuv-paed-fertility-male": "fertility-preservation",
  // Mouth and kidneys.
  "rejuv-paed-teeth-and-face": "acupuncture-xerostomia",
  "rejuv-paed-kidneys": "cytotoxic-chemotherapy",
  // Second cancers and the screening that follows.
  "rejuv-paed-second-cancers": "survivorship-care-plan",
  "rejuv-paed-breast-after-chest-radiotherapy": "mammography",
  // Guidelines, transition and services: care pathways, not mechanisms.
  "rejuv-paed-cog-ltfu-guidelines": "survivorship-care-plan",
  "rejuv-paed-uk-long-term-follow-up": "survivorship-care-plan",
  "rejuv-paed-transition-to-adult-care": "survivorship-care-plan",
  "rejuv-ayac-distinct-group": "survivorship-care-plan",
  "rejuv-ayac-diagnostic-delay": "survivorship-care-plan",
  "rejuv-ayac-education-and-work": "cbt-fatigue-distress",
  "rejuv-ayac-services": "survivorship-care-plan",
};

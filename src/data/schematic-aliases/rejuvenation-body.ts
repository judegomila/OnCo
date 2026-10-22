/** Schematic aliases for the records in src/data/spikes/rejuvenation-body.ts, kept apart so a client component can read them without bundling the records (TechThumb imports src/data/schematics.ts). */
/**
 * Each record here is about a body system rather than a new device or molecule, so none of them needs a drawing of
 * its own: each shares the scene of the technology whose mechanism it describes. Spread into SCHEMATIC_ALIAS in
 * src/data/schematics.ts, which is what keeps `src/data/animated-wave8.test.ts` from finding a technology on a
 * generic front placeholder.
 */
export const rejuvenationSchematicAliases: Record<string, string> = {
  // Muscle: the supervised programme, and the resistance-and-protein scene.
  "exercise-prescription-after-cancer": "structured-exercise-survivorship",
  "muscle-recovery-after-cancer-treatment": "resistance-training-cachexia",
  // Bone: the same osteoclast-and-trabecula drawing the bone drugs use.
  "cancer-treatment-bone-loss": "bone-modifying-agents",
  // Heart: both records are the cardio-oncology loop of risk, surveillance and protection.
  "cardiotoxicity-surveillance-recovery": "cardio-oncology",
  "anthracycline-cardioprotection": "cardio-oncology",
  // Nerves: the hands-and-feet neuropathy scene.
  "cipn-recovery-and-treatment": "acupuncture-chemotherapy-neuropathy",
  "scrambler-therapy": "acupuncture-chemotherapy-neuropathy",
  // Hearing: a platinum drug distributing from the bloodstream into a vulnerable tissue.
  "hearing-after-platinum-chemotherapy": "cytotoxic-chemotherapy",
  // Mouth, gut, skin, nails.
  "dry-mouth-teeth-after-head-neck-radiotherapy": "acupuncture-xerostomia",
  "bowel-after-pelvic-radiotherapy": "hyperbaric-oxygen-radiation-injury",
  "radiation-skin-recovery": "photobiomodulation-mucositis",
  "nail-changes-after-chemotherapy": "frozen-gloves-compression-taxane",
  // Lymphoedema: the limb and its drainage.
  "lymphoedema-surgery-and-early-detection": "lymphoedema-decongestive-therapy",
  // Fertility, hormones and sexual function.
  "ovarian-function-after-chemotherapy": "fertility-preservation",
  "menopause-after-cancer-treatment": "endocrine-therapy",
  "vaginal-oestrogen-after-breast-cancer": "endocrine-therapy",
  "testosterone-after-cancer-treatment": "androgen-deprivation",
  "sexual-function-after-cancer": "survivorship-care-plan",
  // Brain and fatigue: the cognitive behavioural programme.
  "cognitive-impairment-after-cancer-treatment": "cbt-fatigue-distress",
  "cancer-related-fatigue-management": "cbt-fatigue-distress",
};

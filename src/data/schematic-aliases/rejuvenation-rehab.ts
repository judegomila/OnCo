/** Schematic aliases for the records in src/data/spikes/rejuvenation-rehab.ts, kept apart so a client component can read them without bundling the records (TechThumb imports src/data/schematics.ts). */
/**
 * Animated schematics. Three scenes are drawn for this file in src/data/animated-rejuv-rehab.ts and keyed on the
 * records they fit best; the rest of the records share one of those or an existing drawing whose mechanism is the
 * same. Spread into SCHEMATIC_ALIAS in src/data/schematics.ts.
 */
export const rejuvenationRehabSchematicAliases: Record<string, string> = {
  // The discipline: a care-pathway drawing, which is what these records describe.
  "rejuv-rehab-provision-gap": "survivorship-care-plan",
  "rejuv-rehab-commissioning-inequity": "survivorship-care-plan",
  // Prospective surveillance is patient-reported measures at fixed points triggering a referral, which is the
  // electronic symptom monitoring scene exactly.
  "rejuv-rehab-prospective-surveillance": "epro-symptom-monitoring",
  // Prehabilitation: the existing drawing of the window between diagnosis and surgery.
  "rejuv-rehab-prehabilitation-evidence": "prehabilitation",
  "rejuv-rehab-prehabilitation-programme": "prehabilitation",
  // Reconstruction: the defect, the tissue moved in, the healing, the result years later.
  "rejuv-recon-head-neck": "rejuv-recon-breast",
  "rejuv-recon-stoma-reversal": "rejuv-recon-breast",
  "rejuv-recon-pelvic-exenteration": "rejuv-recon-breast",
  // A limb rebuilt around an endoprosthesis has its own drawing already.
  "rejuv-recon-limb": "limb-salvage-surgery",
  // Fitted devices: measured, made, fitted, replaced.
  "rejuv-recon-facial-prosthetics": "rejuv-rehab-assistive-devices",
  "rejuv-recon-voice-after-laryngectomy": "rejuv-rehab-assistive-devices",
  // Function-specific therapy: assess, prescribe, train, reassess.
  "rejuv-rehab-swallowing": "rejuv-rehab-cancer-rehabilitation",
  "rejuv-rehab-pelvic-floor": "rejuv-rehab-cancer-rehabilitation",
  "rejuv-rehab-respiratory": "rejuv-rehab-cancer-rehabilitation",
  "rejuv-rehab-balance-vestibular": "rejuv-rehab-cancer-rehabilitation",
  "rejuv-rehab-scar-contracture": "rejuv-rehab-cancer-rehabilitation",
  "rejuv-rehab-driving-and-exercise-return": "rejuv-rehab-cancer-rehabilitation",
};

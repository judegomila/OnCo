/** Schematic aliases for the records in src/data/spikes/rejuvenation-mind.ts, kept apart so a client component can read them without bundling the records (TechThumb imports src/data/schematics.ts). */
/**
 * Schematic aliases. None of these records is a device or an assay, so none needs a drawing of its own: each
 * borrows the scene of the technology whose mechanism it is closest to. Spread into SCHEMATIC_ALIAS in
 * src/data/schematics.ts.
 */
export const rejuvenationSchematicAliases: Record<string, string> = {
  // Fear of recurrence and the therapies that treat it: the cognitive behavioural programme.
  "rejuv-mind-fear-of-recurrence": "cbt-fatigue-distress",
  "rejuv-mind-fear-of-recurrence-treatment": "cbt-fatigue-distress",
  "rejuv-mind-scan-anxiety": "psycho-oncology",
  // Mood, trauma, screening and access: the psycho-oncology service and its therapies.
  "rejuv-mind-depression-after-cancer": "cbt-fatigue-distress",
  "rejuv-mind-anxiety-after-cancer": "mindfulness-based-interventions",
  "rejuv-mind-traumatic-stress-after-cancer": "psycho-oncology",
  "rejuv-mind-distress-screening": "psycho-oncology",
  "rejuv-mind-post-traumatic-growth": "mindfulness-based-interventions",
  "rejuv-mind-access-to-psychological-care": "psycho-oncology",
  // Body image and identity: the survivorship clinic and the relaxation scene.
  "rejuv-mind-body-image-after-cancer": "survivorship-care-plan",
  "rejuv-mind-visible-difference-head-and-neck": "survivorship-care-plan",
  "rejuv-mind-body-after-stoma-and-limb-loss": "survivorship-care-plan",
  "rejuv-mind-the-word-survivor": "survivorship-care-plan",
  // Partners, carers and children.
  "rejuv-life-partners-and-intimacy": "psycho-oncology",
  "rejuv-life-carers": "psycho-oncology",
  "rejuv-life-children-of-a-parent-with-cancer": "psycho-oncology",
  // Work and money: the exercise programme that drives return to work, and the navigation service.
  "rejuv-life-return-to-work": "structured-exercise-survivorship",
  "rejuv-life-employment-rights-uk": "financial-navigation",
  "rejuv-life-employment-rights-us": "financial-navigation",
  "rejuv-life-insurance-loans-and-the-right-to-be-forgotten": "financial-navigation",
  "rejuv-life-money-after-treatment": "financial-navigation",
  // Sleep.
  "rejuv-mind-sleep-after-cancer": "cbt-insomnia-cancer",
  "rejuv-mind-sleeping-tablets-after-cancer": "cbt-insomnia-cancer",
};

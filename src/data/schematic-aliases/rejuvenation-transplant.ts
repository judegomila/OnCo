/** Schematic aliases for the records in src/data/spikes/rejuvenation-transplant.ts, kept apart so a client component can read them without bundling the records (TechThumb imports src/data/schematics.ts). */
/**
 * Every technology needs a specific animated schematic or src/data/animated-wave8.test.ts fails, so each record
 * here borrows one. The borrowings were chosen by checking the labels on each scene so that nothing false is
 * named on the page: `allogeneic-hsct` for the transplant records, `apheresis-starting-material` for
 * photopheresis (which genuinely is a continuous-flow apheresis procedure), `transfusion-support` for iron
 * overload (its fourth caption is about transfusional iron and chelation), `g-csf-growth-factors` for the
 * cytopenia and infection records, `fertility-preservation` for the fertility record (its captions name
 * transplant conditioning), and the label-free `shared-antigen-vaccine` for revaccination and
 * `monoclonal-antibody` for the record whose lead drug, axatilimab, is a receptor-blocking antibody. Several of
 * these pages would be better served by drawings of their own: chronic GvHD organ by organ, bronchiolitis
 * obliterans and immune reconstitution in particular have no scene that depicts what they describe.
 */
export const rejuvenationSchematicAliases: Record<string, string> = {
  "rejuv-tx-quality-of-life": "psycho-oncology",
  "rejuv-tx-what-to-ask-for": "survivorship-care-plan",
  "rejuv-tx-long-term-follow-up-frameworks": "survivorship-care-plan",
  "rejuv-tx-fertility-and-growth": "fertility-preservation",
  "rejuv-tx-secondary-t-cell-malignancy": "car-t",
  "rejuv-tx-gene-modified-follow-up": "cell-therapy-orchestration-software",
  "rejuv-tx-prolonged-cytopenias": "g-csf-growth-factors",
  "rejuv-tx-icans-and-neurocognition": "car-t",
  "rejuv-tx-infection-by-phase": "g-csf-growth-factors",
  "rejuv-tx-revaccination": "shared-antigen-vaccine",
  "rejuv-tx-immune-reconstitution-timeline": "allogeneic-hsct",
  "rejuv-tx-b-cell-aplasia-and-immunoglobulin": "infusion-devices-vascular-access",
  "rejuv-tx-iron-overload": "transfusion-support",
  "rejuv-tx-bone-eyes-kidneys-lungs": "survivorship-care-plan",
  "rejuv-tx-endocrine-and-cardiometabolic": "survivorship-care-plan",
  "rejuv-tx-late-effects-overview": "survivorship-care-plan",
  "rejuv-tx-survival-after-transplant": "cancer-registries-surveillance",
  "rejuv-tx-second-cancers": "cancer-registries-surveillance",
  "gvhd-ruxolitinib-steroid-refractory": "drug-repurposing",
  "gvhd-belumosudil-axatilimab-ibrutinib": "monoclonal-antibody",
  "gvhd-photopheresis": "apheresis-starting-material",
  "gvhd-chronic-overview": "allogeneic-hsct",
  "gvhd-nih-consensus-criteria": "survivorship-care-plan",
  "gvhd-organ-by-organ": "allogeneic-hsct",
  "gvhd-lung-bronchiolitis-obliterans": "allogeneic-hsct",
  "gvhd-prophylaxis": "allogeneic-hsct",
};

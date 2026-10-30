/**
 * What sort of product a `drug` record is, for the words a reader sees.
 *
 * Every product in the corpus is stored as kind `drug`, including blood tests, companion diagnostics, PET tracers,
 * surgical dyes and devices, and the record kind and its `/drugs/<id>/` route stay that way. Before this file the site
 * called all of them a treatment or a drug: Signatera, a blood test for leftover cancer, was "Signatera · Treatment"
 * and sat under "Drugs" on the pairing page that pairs it with adjuvant treatment (owner, 30 October 2026). This is the
 * one rule for the class; the page title, the Connected groups, search chips, the /drugs/ table, JSON-LD and the
 * molecule placeholder all read it.
 *
 * The rule reads the record's modality text, then its tags. Every pattern is word-bounded: a bare fragment once
 * matched inside a longer word and put a myeloma drug's warning on every fluoropyrimidine page (AGENTS.md). An imaging
 * agent that is also a therapy (a theranostic pair, a radioligand therapy) is a medicine. Pure and corpus-free, so it is
 * safe in client components (src/lib/client-bundle.test.ts).
 */

export const PRODUCT_CLASSES = ["medicine", "test", "imaging-agent", "device"] as const;
export type ProductClass = (typeof PRODUCT_CLASSES)[number];

/**
 * Reader-facing names. The medicine label is the record kind's own ("Treatment"), so medicine pages read as they always
 * have; the others name what the product is. `group` is the heading of a list of them on a record page (the medicine
 * group keeps the kind's own plural, "drugs", translated), `facet` the value of the Type filter on /drugs/.
 * `schemaType` is the schema.org type: a PET tracer or a surgical dye is licensed as a drug, so it stays Drug there
 * while its pages call it an imaging agent; a test is a MedicalTest and a device or piece of software a MedicalDevice.
 */
export const PRODUCT_CLASS_META: Record<ProductClass, { label: string; plural: string; group: string; facet: string; schemaType: string }> = {
  medicine: { label: "Treatment", plural: "drugs", group: "Drugs", facet: "Medicine", schemaType: "Drug" },
  test: { label: "Test", plural: "tests", group: "Tests", facet: "Test", schemaType: "MedicalTest" },
  "imaging-agent": { label: "Imaging agent", plural: "imaging agents", group: "Imaging agents", facet: "Imaging agent", schemaType: "Drug" },
  device: { label: "Device or software", plural: "devices and software", group: "Devices and software", facet: "Device or software", schemaType: "MedicalDevice" },
};

/** The product treats: a therapy that may also be imaged (theranostic pair, radioligand therapy, photodynamic therapy). */
const THERAPY = /\b(therapy|therapies|therapeutic|theranostic|treatment|photodynamic|lutetium|177lu|actinium|225ac|radium|lead-212|alpha emitter|beta emitter)\b/;

/** A device or software rather than something given to the body. A drug-eluting or drug-releasing system delivers a medicine and stays one. */
const DEVICE = /\b(device|software|tumour treating fields|tumor treating fields)\b/;
const DRUG_DELIVERY = /\b(drug-eluting|drug-releasing|eluting|implant|wafer)\b/;

/** Something given to see a tumour: a PET or SPECT tracer, a contrast agent, a fluorescent surgical dye, a lymphatic-mapping agent. */
const IMAGING = /\b(pet|spect|radiotracer|tracer|imaging|contrast agent|fluorescent|fluorescence-guided|lymphatic mapping|near-infrared)\b/;

/** A test on a sample or an image: assays, companion diagnostics, screening tests, classifiers, MRD tests. "tested" does not match. */
const TEST = /\b(test|tests|assay|assays|immunoassay|classifier|companion diagnostic|diagnostic test|screening test|liquid biopsy|minimal residual disease test)\b/;

/** Tags that mark a record as a test when its modality text is silent. */
const TEST_TAGS = new Set(["test", "mced", "companion-diagnostic"]);

export type ClassifiableProduct = { modality?: string; tags?: readonly string[] };

/** The class of one product record. Anything not recognised as a test, imaging agent or device is a medicine. */
export function productClass(d: ClassifiableProduct): ProductClass {
  const m = (d.modality ?? "").toLowerCase();
  const tags = d.tags ?? [];
  if (DEVICE.test(m) && !DRUG_DELIVERY.test(m)) return "device";
  if (TEST.test(m)) return "test";
  if (IMAGING.test(m) && !THERAPY.test(m)) return "imaging-agent";
  if (tags.some((t) => TEST_TAGS.has(t))) return IMAGING.test(m) ? "imaging-agent" : "test";
  if (tags.includes("diagnostic") && !THERAPY.test(m)) return IMAGING.test(m) ? "imaging-agent" : "test";
  return "medicine";
}

export const isMedicine = (d: ClassifiableProduct) => productClass(d) === "medicine";

/** The class of any record: its product class for a `drug`, undefined for every other kind. */
export function recordProductClass(e: { kind: string } & ClassifiableProduct): ProductClass | undefined {
  return e.kind === "drug" ? productClass(e) : undefined;
}

/** The class of a product that is not a medicine, else undefined: for payloads that should stay small on every other record. */
export function nonMedicineClass(e: { kind: string } & ClassifiableProduct): Exclude<ProductClass, "medicine"> | undefined {
  const c = recordProductClass(e);
  return c && c !== "medicine" ? c : undefined;
}

/**
 * The singular kind label for a record ("Test" for Signatera, "Treatment" for pembrolizumab), or undefined when the
 * kind's own label applies (every non-product record, and medicines).
 */
export function productLabel(e: { kind: string } & ClassifiableProduct): string | undefined {
  const c = recordProductClass(e);
  return c && c !== "medicine" ? PRODUCT_CLASS_META[c].label : undefined;
}

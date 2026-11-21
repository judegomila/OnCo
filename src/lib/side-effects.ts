import { graph, type Graph } from "./graph";
import { routeFor } from "./kinds";
import type { Drug, Protocol } from "./schema";

/**
 * Symptom-first index of product toxicities.
 *
 * Every `drug.toxicity[].event` string in the corpus is written by hand in the language of the label
 * or trial ("ALT increased", "Palmar-plantar erythrodysaesthesia (with capecitabine)"). A person with
 * a symptom does not search that way, so `symptomGroup` folds the strings into plain-language groups
 * ("Liver inflammation or raised liver enzymes", "Hand-foot syndrome"). Each group has guidance in
 * `src/data/side-effect-guidance.ts`; a test asserts that nothing in the corpus falls through.
 *
 * Order matters: compound strings such as "Nausea, fatigue" or "Rash, fatigue" are grouped by the
 * first-named symptom, and specific patterns (febrile neutropenia, immune-mediated colitis) are tested
 * before the generic ones (fever, colitis).
 */
const RULES: Array<[RegExp, string]> = [
  // Life-threatening syndromes first, so "neurologic toxicity incl. ICANS" and "CRS" are never diluted.
  [/cytokine release/i, "Cytokine release syndrome"],
  [/capillary leak/i, "Capillary leak syndrome"],
  [/differentiation syndrome/i, "Differentiation syndrome"],
  [/tumou?r lysis/i, "Tumour lysis syndrome"],
  [/tumou?r flare/i, "Tumour flare"],
  [/icans|neurolog|neurotox|encephalopath|parkinson/i, "Confusion or brain effects (neurotoxicity, ICANS)"],
  [/cognitive|mood/i, "Memory, thinking or mood changes"],
  [/induction mortality|treatment-related mortality|mortality/i, "Treatment-related death"],
  [/^grade\b/i, "Any severe side effect (grade 3 or higher)"],
  [/immune-related/i, "Immune-related side effects (general)"],

  // Blood counts and infection.
  [/febrile neutropenia|fever|pyrexia|chills|influenza-like/i, "Fever or febrile neutropenia"],
  [/neutro|leukopenia|leukocytes decreased|white cell/i, "Low white cells (neutropenia)"],
  [/anaem|anemia|haemoglobin|hemoglobin/i, "Low red cells (anaemia)"],
  [/thrombocyt|platelet/i, "Low platelets (thrombocytopenia)"],
  [/lymphopenia|lymphocytes decreased/i, "Low lymphocytes (lymphopenia)"],
  [/cytopenia|myelosuppression/i, "Low blood counts (general)"],
  [/hypogammaglobulin|b-cell aplasia/i, "Low antibody levels (hypogammaglobulinaemia)"],
  [/hepatitis b reactivation/i, "Infections"],
  [/infection|pneumonia\b|covid|otitis|urinary tract|upper respiratory/i, "Infections"],
  [/\bleukocytosis/i, "Blood chemistry or blood count changes (other)"],

  // Second cancers.
  [/\bmds\b|myelodysplastic|acute leukaemia|malignan|second primary|squamous cell carcinoma|keratoacanthoma|endometrial cancer/i, "Second cancers"],

  // Gut.
  [/colitis/i, "Colitis (bowel inflammation)"],
  [/perforation/i, "Bowel perforation"],
  [/diarr|steatorrh/i, "Diarrhoea"],
  [/nausea|vomit|gastric mucosal/i, "Nausea or vomiting"],
  [/constipation/i, "Constipation"],
  [/stomatitis|mucositis/i, "Mouth soreness or ulcers (stomatitis)"],
  [/xerostomia|dry mouth|sialadenitis/i, "Dry mouth"],
  [/dysgeusia|taste/i, "Taste changes"],
  [/pancrea|lipase/i, "Pancreas inflammation or raised pancreatic enzymes"],
  [/dyspepsia|abdominal pain|cholelith/i, "Indigestion, gallstones or abdominal pain"],
  [/appetite|weight loss|weight decrease|anorexia/i, "Loss of appetite or weight loss"],
  [/weight gain/i, "Weight gain"],

  // Lungs and airways.
  [/\bild\b|\binterstitial|pneumonitis|pulmonary toxicity/i, "Lung inflammation (pneumonitis, ILD)"],
  [/dyspn|cough|hypoxia|pneumothorax|pulmonary arterial hypertension/i, "Breathlessness or cough"],
  [/dysphonia|voice/i, "Voice changes"],

  // Liver, kidney, bladder.
  [/\b(alt|ast|ggt)\b|transamin|hepat|bilirubin|veno-occlusive/i, "Liver inflammation or raised liver enzymes"],
  [/\brenal\b|nephr|proteinuria|creatinine/i, "Kidney problems"],
  [/cystitis|haematuria|dysuria|pollakiuria|micturition|urinary (frequency|urgency)|bladder/i, "Bladder symptoms"],

  // Heart and circulation.
  [/cardiomyopathy|cardiotox|cardiac failure|ventricular dysfunction|lvef|myocarditis/i, "Heart muscle weakness or inflammation"],
  [/\bqtc?\b|atrial fibrillation|flutter|bradycardia|arrhythm/i, "Heart rhythm changes (QT, atrial fibrillation)"],
  [/hypertension/i, "High blood pressure"],
  [/hypotension|syncope/i, "Low blood pressure or fainting"],
  [/thromboembol|occlusive|thrombosis|embolism/i, "Blood clots"],
  [/bleeding|haemorrhag|hemorrhag|epistaxis|bruising|contusion/i, "Bleeding or bruising"],
  [/oedema|edema|effusion|ascites/i, "Fluid retention (swelling, effusions)"],

  // Skin, hair, nails, hands and feet.
  [/hand-foot|palmar-plantar/i, "Hand-foot syndrome"],
  [/nail|onycholysis/i, "Nail changes"],
  [/alopecia|hair/i, "Hair loss"],
  [/rash|cutaneous|dermatolog|skin|pruritus|photosens|desquamation|rccep/i, "Rash, itching or skin reactions"],
  [/wound/i, "Poor wound healing"],

  // Nerves, muscles, joints, pain.
  [/neuropath|paraesth|paresth|dysaesth|dysesth/i, "Nerve damage (peripheral neuropathy)"],
  [/rhabdomyolysis/i, "Muscle breakdown (rhabdomyolysis)"],
  [/arthralgia|\bmyalgia|musculoskeletal|muscle|cramp|cpk|creatine kinase/i, "Muscle or joint pain"],
  [/headache/i, "Headache"],
  [/^pain$/i, "Pain"],
  [/fatigue|asthenia|malaise/i, "Tiredness (fatigue)"],

  // Eyes and ears.
  [/vision|cataract|retin|conjunctiv|corneal|dry eye|kerat|photopsia|ocular|periorbital/i, "Eye problems"],
  [/hearing|ototox|tinnitus/i, "Hearing problems"],

  // Reactions to the infusion or injection.
  [/infusion|injection|hypersensitivity/i, "Infusion or injection reactions"],

  // Hormones and metabolism.
  [/thyroid/i, "Thyroid changes"],
  [/adrenal/i, "Adrenal insufficiency"],
  [/hyperglyc|glucose/i, "High blood sugar"],
  [/hot flush|vaginal|sexual|ovarian/i, "Hot flushes, sexual or fertility effects"],
  [/bone/i, "Bone loss or fractures"],
  [/cholesterol|triglycerid|phosphat|kalaemia|kalemia|magnes|natraemia|calcaemia|hypoalbumin/i, "Blood chemistry or blood count changes (other)"],
];

/** Plain-language symptom group for a toxicity event string. Unmatched strings are returned unchanged. */
export function symptomGroup(event: string): string {
  const e = event.trim();
  for (const [re, group] of RULES) if (re.test(e)) return group;
  return e;
}

/** All group names the rules can produce, in rule order (deduplicated). */
export const SYMPTOM_GROUPS: string[] = [...new Set(RULES.map(([, g]) => g))];

export type SideEffectRow = {
  id: string;
  group: string;
  drugId: string;
  drug: string;
  route: string;
  modality: string;
  event: string;
  anyGradePct?: number;
  grade3PlusPct?: number;
  source?: string;
  note?: string;
};

/** Short class label for a modality string, shared with the grouping on /toxicity/. */
export function modalityClass(m: string): string {
  if (/bispecific adc/i.test(m)) return "Bispecific ADC";
  if (/^adc/i.test(m)) return "ADC";
  if (/engager|immtac/i.test(m)) return "T-cell engager";
  if (/bispecific/i.test(m)) return "Bispecific antibody";
  if (/anti-pd-1|anti-pd-l1|anti-ctla-4|anti-lag-3/i.test(m)) return "Checkpoint inhibitor";
  if (/monoclonal/i.test(m)) return "Antibody";
  if (/car-t|\btil\b|tumou?r-infiltrating|tcr-t/i.test(m)) return "Cell therapy";
  if (/radioligand|alpha[- ](?:therapy|emitt|particle)|targeted alpha|theranostic|radiopharm|radioactive/i.test(m)) return "Radiopharmaceutical";
  if (/cdk4\/6|cdk4/i.test(m)) return "CDK4/6 inhibitor";
  if (/parp/i.test(m)) return "PARP inhibitor";
  if (/btk/i.test(m)) return "BTK inhibitor";
  if (/kras|ras\(on\)/i.test(m)) return "RAS inhibitor";
  if (/kinase|tki/i.test(m)) return "Kinase inhibitor";
  if (/serd|serm|aromatase|gnrh|antiandrogen|ar antagonist|cyp17a1|progestin|hormonal/i.test(m)) return "Hormone therapy";
  if (/cytotoxic|alkylating|platinum|taxane|anthracycline|antifolate|nucleoside|topoisomerase|vinca|fluoropyrimidine|hypomethylating|nitrosourea|antibiotic|actinomycin|halichondrin|liposomal/i.test(m)) return "Chemotherapy";
  if (/oncolytic|vaccine|cytokine|interleukin|interferon/i.test(m)) return "Immunotherapy (other)";
  return m;
}

/** Server-side: one row per product toxicity, tagged with its symptom group. Serialisable for client components. */
export function buildSideEffectIndex(): SideEffectRow[] {
  const g = graph();
  return g.kind("drug").filter((d) => d.toxicity.length).flatMap((d) => d.toxicity.map((t, i) => ({
    id: `${d.id}-${i}`,
    group: symptomGroup(t.event),
    drugId: d.id,
    drug: d.name,
    route: routeFor(d),
    modality: modalityClass(d.modality),
    event: t.event,
    anyGradePct: t.anyGradePct,
    grade3PlusPct: t.grade3PlusPct,
    source: t.source,
    note: t.note,
  })));
}

/**
 * The care protocols (src/data/protocols/) that manage each symptom group, so a side-effect row reaches how the
 * problem is handled and not only how often it happens. Two kinds:
 *
 * - `general`: the protocol for the symptom whatever caused it (fever after any treatment that lowers white cells,
 *   hand-foot syndrome, nausea). Shown for the group.
 * - `specific`: a protocol for the symptom on particular treatments (immune-related colitis on checkpoint inhibitors,
 *   irinotecan's early diarrhoea, CRS after a bispecific). Shown only beside the products it reaches, which is read
 *   from the protocol record unless `PROTOCOL_REACH` below says otherwise.
 *
 * Which protocols belong to which group is written here because the groups are the rules' own plain-language labels
 * and exist nowhere in the corpus. A protocol is listed only after its own population and trigger have been read:
 * where no protocol in the corpus fits (an upper respiratory infection, cataract on tamoxifen), the group or the row stays
 * without one, and `scripts/measure-side-effect-chain.ts --gaps` names it. High blood pressure, QT prolongation and
 * lung inflammation on a drug that is not a checkpoint inhibitor were such gaps until 17 November 2026, when the
 * fourteen targeted-drug protocols were written; headache, cough, dry mouth, taste changes, second cancers and bladder
 * symptoms were gaps until 18 November 2026, when the second round of sixteen was written. src/lib/side-effects.test.ts checks that every id is a protocol and every key a group the rules produce.
 */
export const SYMPTOM_PROTOCOLS: Record<string, { general?: string[]; specific?: string[] }> = {
  "Cytokine release syndrome": { general: ["crs-grading-and-management"], specific: ["bispecific-step-up-dosing"] },
  "Capillary leak syndrome": { specific: ["capillary-leak-syndrome-on-anticancer-drugs"] },
  "Differentiation syndrome": { specific: ["differentiation-syndrome-recognition-and-treatment"] },
  "Confusion or brain effects (neurotoxicity, ICANS)": { specific: ["icans-grading-and-management", "bispecific-step-up-dosing", "irae-neurological", "ifosfamide-bladder-protection-and-encephalopathy"] },
  "Memory, thinking or mood changes": { specific: ["cognitive-and-mood-effects-on-lorlatinib-and-avapritinib"] },
  "Tumour lysis syndrome": { general: ["tumour-lysis-syndrome-prevention-and-treatment"] },
  "Tumour flare": { specific: ["tumour-flare-on-bispecific-antibodies-and-immunomodulatory-drugs"] },
  "Immune-related side effects (general)": { specific: ["checkpoint-inhibitor-baseline-and-monitoring", "irae-steroid-taper-and-pjp", "irae-rechallenge"] },
  "Fever or febrile neutropenia": { general: ["febrile-neutropenia-first-hour", "g-csf-prophylaxis-by-febrile-neutropenia-risk"] },
  "Low white cells (neutropenia)": { general: ["g-csf-prophylaxis-by-febrile-neutropenia-risk", "febrile-neutropenia-first-hour"] },
  "Low red cells (anaemia)": { general: ["chemotherapy-induced-anaemia-esa-and-iron", "red-cell-and-platelet-transfusion-thresholds"], specific: ["blood-count-and-kidney-monitoring-during-radioligand-therapy"] },
  "Low platelets (thrombocytopenia)": { general: ["bleeding-precautions-when-platelets-are-low", "red-cell-and-platelet-transfusion-thresholds"], specific: ["irae-haematological", "blood-count-and-kidney-monitoring-during-radioligand-therapy"] },
  "Low lymphocytes (lymphopenia)": { specific: ["blood-count-and-kidney-monitoring-during-radioligand-therapy"] },
  // Red cells and platelets are both low, whatever lowered them. The first-hour fever protocol is not listed: the rows
  // here are CAR T cells and leukaemia induction, and it leaves acute leukaemia and transplant to local haematology protocols.
  "Low blood counts (general)": { general: ["red-cell-and-platelet-transfusion-thresholds"], specific: ["icaht-prolonged-cytopenia", "irae-haematological"] },
  "Low antibody levels (hypogammaglobulinaemia)": { specific: ["car-t-infection-prevention", "bispecific-step-up-dosing"] },
  "Infections": { specific: ["hepatitis-b-screening-and-reactivation-prophylaxis", "pneumocystis-pneumonia-prophylaxis", "herpes-simplex-and-zoster-antiviral-prophylaxis", "car-t-infection-prevention", "bispecific-step-up-dosing", "vaccination-around-cancer-treatment", "bladder-symptoms-and-infection-after-intravesical-therapy"] },
  "Second cancers": { specific: ["second-cancers-after-anticancer-drug-treatment"] },
  "Colitis (bowel inflammation)": { general: ["treatment-induced-diarrhoea-grading-and-management"], specific: ["irae-colitis"] },
  "Diarrhoea": { general: ["treatment-induced-diarrhoea-grading-and-management"], specific: ["irinotecan-early-cholinergic-syndrome-and-late-diarrhoea", "neratinib-diarrhoea-prophylaxis-and-dose-escalation", "irae-colitis"] },
  "Nausea or vomiting": { general: ["antiemetic-prophylaxis-by-emetic-risk"] },
  "Constipation": { general: ["constipation-in-adults-with-cancer"] },
  "Mouth soreness or ulcers (stomatitis)": { general: ["oral-mucositis-prevention-and-oral-care"] },
  "Dry mouth": { specific: ["dry-mouth-from-cancer-drugs-and-radionuclide-therapy"] },
  // Twelve of its sixteen steps apply whatever the treatment; the talquetamab and tarlatamab steps say which label they come from.
  "Taste changes": { general: ["taste-changes-during-cancer-treatment"] },
  "Pancreas inflammation or raised pancreatic enzymes": { specific: ["pancreatitis-and-raised-pancreatic-enzymes-on-targeted-drugs"] },
  "Loss of appetite or weight loss": { general: ["nutrition-screening-and-support-during-cancer-treatment"] },
  "Weight gain": { specific: ["raised-lipids-and-weight-gain-on-lorlatinib-bexarotene-and-elacestrant"] },
  "Lung inflammation (pneumonitis, ILD)": { specific: ["irae-pneumonitis", "interstitial-lung-disease-on-antibody-drug-conjugates-and-targeted-drugs"] },
  "Breathlessness or cough": { specific: ["acute-oncology-telephone-triage", "breathlessness-and-cough-during-anticancer-treatment"] },
  "Liver inflammation or raised liver enzymes": { specific: ["irae-hepatitis", "raised-liver-enzymes-on-targeted-anticancer-drugs", "veno-occlusive-disease-on-inotuzumab-and-gemtuzumab-ozogamicin", "blood-count-and-kidney-monitoring-during-radioligand-therapy"] },
  "Bladder symptoms": { specific: ["bladder-symptoms-and-infection-after-intravesical-therapy", "ifosfamide-bladder-protection-and-encephalopathy"] },
  "Kidney problems": { specific: ["irae-nephritis", "renal-dose-adjustment-of-anticancer-drugs", "hypertension-and-proteinuria-on-vegf-pathway-inhibitors"] },
  "Heart muscle weakness or inflammation": { general: ["cardio-oncology-risk-assessment-and-cardiac-surveillance"], specific: ["irae-myocarditis", "left-ventricular-dysfunction-on-her2-targeted-drugs"] },
  "Heart rhythm changes (QT, atrial fibrillation)": { specific: ["qt-prolongation-monitoring-on-anticancer-drugs", "atrial-fibrillation-and-bleeding-on-btk-inhibitors"] },
  "High blood pressure": { specific: ["hypertension-and-proteinuria-on-vegf-pathway-inhibitors", "atrial-fibrillation-and-bleeding-on-btk-inhibitors"] },
  "Blood clots": { general: ["cancer-associated-vte-treatment"] },
  "Bleeding or bruising": { general: ["bleeding-precautions-when-platelets-are-low"], specific: ["atrial-fibrillation-and-bleeding-on-btk-inhibitors"] },
  "Fluid retention (swelling, effusions)": { specific: ["fluid-retention-and-effusions-on-kinase-inhibitors"] },
  "Hand-foot syndrome": { general: ["hand-foot-syndrome-prevention-and-dose-modification"] },
  "Nail changes": { general: ["skin-and-nail-care-during-cancer-drug-treatment"] },
  "Hair loss": { specific: ["scalp-cooling-during-chemotherapy"] },
  "Rash, itching or skin reactions": { general: ["skin-and-nail-care-during-cancer-drug-treatment"], specific: ["egfr-inhibitor-rash-prophylaxis", "irae-skin", "sun-protection-during-and-after-cancer-treatment"] },
  "Poor wound healing": { specific: ["anti-vegf-drugs-around-surgery"] },
  "Nerve damage (peripheral neuropathy)": { general: ["chemotherapy-induced-peripheral-neuropathy-assessment-and-prevention"] },
  "Muscle or joint pain": { specific: ["irae-rheumatological", "chronic-pain-in-cancer-survivors", "joint-and-muscle-pain-on-anticancer-drugs"] },
  "Headache": { specific: ["headache-on-anticancer-drugs"] },
  "Tiredness (fatigue)": { general: ["cancer-related-fatigue-screening-and-management"] },
  "Eye problems": { specific: ["eye-care-with-ocular-toxic-antibody-drug-conjugates", "irae-ocular", "retinal-and-eye-effects-on-fgfr-mek-and-alk-inhibitors"] },
  "Hearing problems": { specific: ["paediatric-cisplatin-hearing-protection"] },
  "Infusion or injection reactions": { general: ["infusion-reaction-management"], specific: ["premedication-before-reaction-prone-anticancer-drugs", "drug-desensitisation-after-anticancer-hypersensitivity"] },
  "Thyroid changes": { specific: ["irae-thyroid", "hypothyroidism-on-tyrosine-kinase-inhibitors"] },
  "Adrenal insufficiency": { specific: ["irae-hypophysitis-adrenal"] },
  "High blood sugar": { specific: ["irae-diabetes", "hyperglycaemia-on-pi3k-akt-mtor-inhibitors"] },
  "Hot flushes, sexual or fertility effects": { general: ["sexual-health-assessment-and-interventions"], specific: ["hot-flushes-on-endocrine-therapy-non-hormonal-options"] },
  "Bone loss or fractures": { specific: ["bone-health-on-hormone-therapy"] },
  "Blood chemistry or blood count changes (other)": { specific: ["hypomagnesaemia-on-egfr-antibodies", "hyperphosphataemia-on-fgfr-inhibitors", "low-potassium-and-low-phosphate-on-anticancer-drugs", "raised-lipids-and-weight-gain-on-lorlatinib-bexarotene-and-elacestrant"] },
};

/**
 * How a treatment-specific protocol reaches a product, where reading the protocol's `drugs` and `technologies` is not
 * the whole answer. Each entry restates the protocol's own population, read on 16 November 2026.
 *
 * Every pattern here is word-bounded. A fragment is not a class: `imid` matched inside `pyrimidine` once and put a
 * myeloma warning on a skin cream (AGENTS.md), and src/lib/side-effects.test.ts holds the non-matches for these.
 */
export type ProtocolReach = {
  /**
   * Which products the protocol record itself reaches. "named" (the default): its `drugs` include the product, or a
   * technology both name. "drugs": its `drugs` only, where the protocol says the rest of the class is not covered.
   * "class": the products whose modality matches `modality` and no others, where the protocol's `drugs` also list
   * the medicines that treat the problem. "any": every product, for a protocol about the symptom itself (use `event`).
   */
  products?: "named" | "drugs" | "class" | "any";
  /** The class the protocol's population names, as a pattern on `drug.modality`. With "named" or "drugs" it adds to them. */
  modality?: RegExp;
  /** The protocol is for solid tumours only: the product must treat at least one cancer that is not a blood cancer. */
  solidTumour?: true;
  /** The protocol covers only the rows whose event matches. */
  event?: RegExp;
  /** The protocol says it does not cover the rows whose event matches. */
  notEvent?: RegExp;
};

/** A drug that blocks an immune checkpoint, by its modality: "anti-PD-1", "PD-1×VEGF", not a PD-L1 assay. */
export const CHECKPOINT_MODALITY = /\banti-(?:pd-1|pd-l1|ctla-4|lag-3)\b|\bpd-1(?: ?[×x] ?| (?:antibody|antagonist)\b)/i;
/** A T-cell engager, by its modality. A bispecific antibody that engages no T cell (EGFR×MET, HER2×HER3) is not one. */
export const T_CELL_ENGAGER_MODALITY = /\bt[- ]cell engagers?\b|\bimmtac\b/i;

/**
 * Immune-related adverse event protocols (domain `immunotherapy-toxicity`) are for people treated with a checkpoint
 * inhibitor and for nobody else. The shared `checkpoint-inhibitor` technology is not enough: ivermectin carries it,
 * as a drug studied beside checkpoint antibodies, and was being sent to the immune-related protocols for its own
 * dizziness, itching and raised liver enzymes. Nor is being named in `drugs`: those lists hold the steroids and
 * infliximab that treat the reaction.
 */
const IRAE_REACH: ProtocolReach = { products: "class", modality: CHECKPOINT_MODALITY };

export const PROTOCOL_REACH: Record<string, ProtocolReach> = {
  // "Radiation pneumonitis and infection are differential diagnoses, not covered here."
  "irae-pneumonitis": { ...IRAE_REACH, notEvent: /\bradiation\b/i },
  // Filed under immunotherapy toxicity, and not about checkpoint inhibitors: "Adults with B-cell non-Hodgkin lymphoma
  // starting glofitamab, mosunetuzumab or epcoritamab, and adults with mantle cell, follicular or marginal zone
  // lymphoma ... starting lenalidomide"; "Flare on checkpoint inhibitors ... [is] not covered". Its `drugs` are those four.
  "tumour-flare-on-bispecific-antibodies-and-immunomodulatory-drugs": { products: "drugs" },
  // Population: BCMA and CD20 bispecifics, and "other T-cell engagers (blinatumomab, tarlatamab, talquetamab,
  // tebentafusp) follow the same principles". Its `drugs` also hold tocilizumab, dexamethasone and immunoglobulin.
  "bispecific-step-up-dosing": { products: "class", modality: T_CELL_ENGAGER_MODALITY },
  // "Other ADCs with eye effects in their labels are not covered here": the shared `adc` technology is not the scope.
  "eye-care-with-ocular-toxic-antibody-drug-conjugates": { products: "drugs" },
  // "Adults starting neratinib": lapatinib and tucatinib share the technology and not the loperamide schedule.
  "neratinib-diarrhoea-prophylaxis-and-dose-escalation": { products: "drugs" },
  // "Adults with solid tumours receiving chemotherapy that causes hair loss"; not blood cancers. Its gaps say the
  // trials read do not cover antibody-drug conjugates, whose modality is "ADC" and does not match.
  "scalp-cooling-during-chemotherapy": { modality: /\bcytotoxic\b/i, solidTumour: true },
  // "starting an aromatase inhibitor, ovarian suppression ... androgen deprivation therapy"; tamoxifen alone is excluded by a step.
  "bone-health-on-hormone-therapy": { modality: /\baromatase\b|\bgnrh\b|\blhrh\b/i },
  // One step is about this and nothing else: "For joint pain from aromatase inhibitors, recommend acupuncture".
  "chronic-pain-in-cancer-survivors": { products: "class", modality: /\baromatase\b/i, event: /\barthr(?:algia|itis)\b|\bjoint\b/i },
  // Names carboplatin, cisplatin and methotrexate as the drugs whose dose follows measured kidney function.
  "renal-dose-adjustment-of-anticancer-drugs": { products: "drugs" },
  // Vaccines against pneumonia-causing infections and COVID-19 for adults on treatment; says nothing about a cold or a urinary infection.
  "vaccination-around-cancer-treatment": { products: "any", event: /\bpneumonia\b|\bcovid(?:-19)?\b/i },
  // "with breathlessness, think of superior vena cava obstruction, clots, pneumonitis and infection": the step is about breathlessness; cough is not named.
  "acute-oncology-telephone-triage": { products: "any", event: /\bdyspnoea\b|\bdyspnea\b|\bbreathless(?:ness)?\b/i },
  // "Which drugs cause photosensitivity is set out in each drug's label; this protocol does not list them."
  "sun-protection-during-and-after-cancer-treatment": { products: "any", event: /\bphotosensitivity\b/i },

  // ---- The second round of side-effect protocols, written on 18 November 2026. Each reaches the products its own
  // `drugs` list names and no others: every one of those lists holds only products whose label or guideline the
  // protocol read for this problem, and its gaps name the products with the same side effect that it does not cover.
  // "The other five rows are deliberately not covered": vorasidenib, intismeran autogene, ivermectin, Optune, piflufolastat.
  "headache-on-anticancer-drugs": { products: "drugs" },
  // Fulvestrant and vepdegestrant carry arthralgia and are named in its gaps; musculoskeletal pain rows are not its subject.
  "joint-and-muscle-pain-on-anticancer-drugs": { products: "drugs", event: /\barthralgia\b|\bmyalgia\b|\bcramps\b|\bcpk\b|\bcreatine kinase\b/i },
  // Low potassium and low phosphate only: the same products' other blood chemistry rows belong to other protocols or to none.
  "low-potassium-and-low-phosphate-on-anticancer-drugs": { products: "drugs", event: /\bhypokala?emia\b|\bhypophosphata?emia\b/i },
  // Lipids on its three products; weight gain on lorlatinib. Megestrol's weight gain is named in its gaps and is not in `drugs`.
  "raised-lipids-and-weight-gain-on-lorlatinib-bexarotene-and-elacestrant": { products: "drugs", event: /\bhypercholesterola?emia\b|\bhypertriglycerida?emia\b|\bhyperlipida?emia\b|\bweight gain\b/i },
  "cognitive-and-mood-effects-on-lorlatinib-and-avapritinib": { products: "drugs" },
  // Dry mouth after head and neck radiotherapy is sent to other protocols; no source it read names other drugs.
  "dry-mouth-from-cancer-drugs-and-radionuclide-therapy": { products: "drugs" },
  // A label rule or work-up for each named product; the symptom guidelines it cites are for advanced cancer, not for every drug.
  "breathlessness-and-cough-during-anticancer-treatment": { products: "drugs" },
  // Bladder symptoms, BCG infection and a urinary infection on its four intravesical products; no other infection row.
  "bladder-symptoms-and-infection-after-intravesical-therapy": { products: "drugs", event: /\bbcg\b|\burinary\b|\bbladder\b|\bmicturition\b|\bdysuria\b|\bhaematuria\b/i },
  "ifosfamide-bladder-protection-and-encephalopathy": { products: "drugs" },
  "second-cancers-after-anticancer-drug-treatment": { products: "drugs" },
  "veno-occlusive-disease-on-inotuzumab-and-gemtuzumab-ozogamicin": { products: "drugs" },
  // Tamoxifen's cataract and bemarituzumab's corneal events are named in its gaps; the cornea-toxic conjugates keep their own protocol.
  "retinal-and-eye-effects-on-fgfr-mek-and-alk-inhibitors": { products: "drugs" },
  // The two licensed lutetium-177 products; the actinium-225 agents are the first entry in its gaps.
  "blood-count-and-kidney-monitoring-during-radioligand-therapy": { products: "drugs" },
  "pancreatitis-and-raised-pancreatic-enzymes-on-targeted-drugs": { products: "drugs" },
  // The HER2-targeted products whose labels carry an ejection fraction rule; not the anthracyclines in the same group.
  "left-ventricular-dysfunction-on-her2-targeted-drugs": { products: "drugs" },
};

/** A care protocol for a symptom group; for a specific one, `drugs` are the products in the group's rows it reaches. */
export type SideEffectProtocol = { id: string; name: string; route: string; general: boolean; drugs: string[] };

/** Whether a protocol names a product: in its `drugs`, or through a technology both name. */
export function protocolNamesProduct(p: { drugs: string[]; technologies: string[] }, d: { id: string; technologies: string[] }): boolean {
  return p.drugs.includes(d.id) || d.technologies.some((t) => p.technologies.includes(t));
}

const reachOf = (p: Pick<Protocol, "id" | "domain">): ProtocolReach => PROTOCOL_REACH[p.id] ?? (p.domain === "immunotherapy-toxicity" ? IRAE_REACH : {});

/** Whether a treatment-specific protocol applies to one toxicity row: this product, with this event. */
export function protocolReaches(p: Pick<Protocol, "id" | "domain" | "drugs" | "technologies">, d: Pick<Drug, "id" | "modality" | "technologies" | "cancers">, event: string, g: Graph = graph()): boolean {
  const r = reachOf(p);
  if (r.event && !r.event.test(event)) return false;
  if (r.notEvent?.test(event)) return false;
  if (r.solidTumour && !d.cancers.some((id) => { const c = g.get(id); return c?.kind === "cancer" && c.group !== "haematologic"; })) return false;
  const mode = r.products ?? "named";
  if (mode === "any" || r.modality?.test(d.modality)) return true;
  if (mode === "class") return false;
  return mode === "drugs" ? p.drugs.includes(d.id) : protocolNamesProduct(p, d);
}

/** The protocols of one group as records, general first, each id once. */
function groupProtocols(g: Graph, group: string): Array<{ p: Protocol; general: boolean }> {
  const spec = SYMPTOM_PROTOCOLS[group];
  const out: Array<{ p: Protocol; general: boolean }> = [];
  const add = (id: string, general: boolean) => { const p = g.get(id); if (p?.kind === "protocol" && !out.some((x) => x.p.id === id)) out.push({ p, general }); };
  for (const id of spec?.general ?? []) add(id, true);
  for (const id of spec?.specific ?? []) add(id, false);
  return out;
}

/** Server-side: the protocols shown for one toxicity row, general first. An empty list is a named gap, not an error. */
export function rowProtocols(row: Pick<SideEffectRow, "group" | "drugId" | "event">, g: Graph = graph()): string[] {
  const d = g.get(row.drugId);
  return groupProtocols(g, row.group).filter(({ p, general }) => general || (d?.kind === "drug" && protocolReaches(p, d, row.event, g))).map(({ p }) => p.id);
}

/** Server-side: the protocols for each symptom group present in `rows`, general first; a specific one only with the products it reaches. */
export function symptomProtocols(rows: SideEffectRow[]): Record<string, SideEffectProtocol[]> {
  const g = graph();
  const rowsByGroup = new Map<string, SideEffectRow[]>();
  for (const r of rows) rowsByGroup.set(r.group, [...(rowsByGroup.get(r.group) ?? []), r]);
  const out: Record<string, SideEffectProtocol[]> = {};
  for (const [group, list] of rowsByGroup) {
    const shown: SideEffectProtocol[] = [];
    for (const { p, general } of groupProtocols(g, group)) {
      const drugs = general ? [] : [...new Set(list.filter((r) => { const d = g.get(r.drugId); return d?.kind === "drug" && protocolReaches(p, d, r.event, g); }).map((r) => r.drugId))];
      if (general || drugs.length) shown.push({ id: p.id, name: p.name, route: routeFor(p), general, drugs });
    }
    if (shown.length) out[group] = shown;
  }
  return out;
}

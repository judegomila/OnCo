import { graph } from "./graph";
import { routeFor } from "./kinds";

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
 *   irinotecan's early diarrhoea, CRS after a bispecific). Shown only for the products it names, by the structured
 *   link: the protocol's `drugs` include the product, or its `technologies` include one of the product's.
 *
 * Which protocols belong to which group is written here because the groups are the rules' own plain-language labels
 * and exist nowhere in the corpus; which products a specific protocol applies to is read from the protocol record.
 * src/lib/side-effects.test.ts checks that every id is a protocol and every key a group the rules produce.
 */
export const SYMPTOM_PROTOCOLS: Record<string, { general?: string[]; specific?: string[] }> = {
  "Cytokine release syndrome": { general: ["crs-grading-and-management"], specific: ["bispecific-step-up-dosing"] },
  "Confusion or brain effects (neurotoxicity, ICANS)": { specific: ["icans-grading-and-management", "bispecific-step-up-dosing", "irae-neurological"] },
  "Tumour lysis syndrome": { general: ["tumour-lysis-syndrome-prevention-and-treatment"] },
  "Immune-related side effects (general)": { specific: ["checkpoint-inhibitor-baseline-and-monitoring", "irae-steroid-taper-and-pjp", "irae-rechallenge"] },
  "Fever or febrile neutropenia": { general: ["febrile-neutropenia-first-hour", "g-csf-prophylaxis-by-febrile-neutropenia-risk"] },
  "Low white cells (neutropenia)": { general: ["g-csf-prophylaxis-by-febrile-neutropenia-risk", "febrile-neutropenia-first-hour"] },
  "Low red cells (anaemia)": { general: ["chemotherapy-induced-anaemia-esa-and-iron", "red-cell-and-platelet-transfusion-thresholds"] },
  "Low platelets (thrombocytopenia)": { general: ["bleeding-precautions-when-platelets-are-low", "red-cell-and-platelet-transfusion-thresholds"], specific: ["irae-haematological"] },
  "Low blood counts (general)": { specific: ["icaht-prolonged-cytopenia", "irae-haematological"] },
  "Low antibody levels (hypogammaglobulinaemia)": { specific: ["car-t-infection-prevention", "bispecific-step-up-dosing"] },
  "Infections": { specific: ["hepatitis-b-screening-and-reactivation-prophylaxis", "pneumocystis-pneumonia-prophylaxis", "herpes-simplex-and-zoster-antiviral-prophylaxis", "car-t-infection-prevention"] },
  "Colitis (bowel inflammation)": { general: ["treatment-induced-diarrhoea-grading-and-management"], specific: ["irae-colitis"] },
  "Diarrhoea": { general: ["treatment-induced-diarrhoea-grading-and-management"], specific: ["irinotecan-early-cholinergic-syndrome-and-late-diarrhoea", "neratinib-diarrhoea-prophylaxis-and-dose-escalation", "irae-colitis"] },
  "Nausea or vomiting": { general: ["antiemetic-prophylaxis-by-emetic-risk"] },
  "Mouth soreness or ulcers (stomatitis)": { general: ["oral-mucositis-prevention-and-oral-care"] },
  "Loss of appetite or weight loss": { general: ["nutrition-screening-and-support-during-cancer-treatment"] },
  "Lung inflammation (pneumonitis, ILD)": { specific: ["irae-pneumonitis"] },
  "Liver inflammation or raised liver enzymes": { specific: ["irae-hepatitis"] },
  "Kidney problems": { specific: ["irae-nephritis"] },
  "Heart muscle weakness or inflammation": { general: ["cardio-oncology-risk-assessment-and-cardiac-surveillance"], specific: ["irae-myocarditis"] },
  "Blood clots": { general: ["cancer-associated-vte-treatment"] },
  "Bleeding or bruising": { general: ["bleeding-precautions-when-platelets-are-low"] },
  "Hand-foot syndrome": { general: ["hand-foot-syndrome-prevention-and-dose-modification"] },
  "Nail changes": { general: ["skin-and-nail-care-during-cancer-drug-treatment"] },
  "Hair loss": { specific: ["scalp-cooling-during-chemotherapy"] },
  "Rash, itching or skin reactions": { general: ["skin-and-nail-care-during-cancer-drug-treatment"], specific: ["egfr-inhibitor-rash-prophylaxis", "irae-skin"] },
  "Nerve damage (peripheral neuropathy)": { general: ["chemotherapy-induced-peripheral-neuropathy-assessment-and-prevention"] },
  "Muscle or joint pain": { specific: ["irae-rheumatological"] },
  "Tiredness (fatigue)": { general: ["cancer-related-fatigue-screening-and-management"] },
  "Eye problems": { specific: ["eye-care-with-ocular-toxic-antibody-drug-conjugates", "irae-ocular"] },
  "Hearing problems": { specific: ["paediatric-cisplatin-hearing-protection"] },
  "Infusion or injection reactions": { general: ["infusion-reaction-management"], specific: ["premedication-before-reaction-prone-anticancer-drugs", "drug-desensitisation-after-anticancer-hypersensitivity"] },
  "Thyroid changes": { specific: ["irae-thyroid"] },
  "Adrenal insufficiency": { specific: ["irae-hypophysitis-adrenal"] },
  "High blood sugar": { specific: ["irae-diabetes"] },
  "Hot flushes, sexual or fertility effects": { general: ["sexual-health-assessment-and-interventions"], specific: ["hot-flushes-on-endocrine-therapy-non-hormonal-options"] },
  "Bone loss or fractures": { specific: ["bone-health-on-hormone-therapy"] },
};

/** A care protocol for a symptom group; for a specific one, `drugs` are the products in the group's rows it names. */
export type SideEffectProtocol = { id: string; name: string; route: string; general: boolean; drugs: string[] };

/** Whether a protocol names a product: in its `drugs`, or through a technology both name. */
export function protocolNamesProduct(p: { drugs: string[]; technologies: string[] }, d: { id: string; technologies: string[] }): boolean {
  return p.drugs.includes(d.id) || d.technologies.some((t) => p.technologies.includes(t));
}

/** Server-side: the protocols for each symptom group present in `rows`, general first; a specific one only with the products it names. */
export function symptomProtocols(rows: SideEffectRow[]): Record<string, SideEffectProtocol[]> {
  const g = graph();
  const drugsByGroup = new Map<string, Set<string>>();
  for (const r of rows) {
    const set = drugsByGroup.get(r.group) ?? new Set<string>();
    set.add(r.drugId);
    drugsByGroup.set(r.group, set);
  }
  const out: Record<string, SideEffectProtocol[]> = {};
  for (const [group, drugIds] of drugsByGroup) {
    const spec = SYMPTOM_PROTOCOLS[group];
    if (!spec) continue;
    const list: SideEffectProtocol[] = [];
    const add = (id: string, general: boolean) => {
      const p = g.get(id);
      if (p?.kind !== "protocol" || list.some((x) => x.id === id)) return;
      const drugs = general ? [] : [...drugIds].filter((d) => { const e = g.get(d); return e?.kind === "drug" && protocolNamesProduct(p, e); });
      if (general || drugs.length) list.push({ id, name: p.name, route: routeFor(p), general, drugs });
    };
    for (const id of spec.general ?? []) add(id, true);
    for (const id of spec.specific ?? []) add(id, false);
    if (list.length) out[group] = list;
  }
  return out;
}

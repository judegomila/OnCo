import { protocol } from "./helpers";

/*
 * Malignant superior vena cava obstruction (SVCO): recognition, imaging, urgent referral, treatment of the cancer,
 * stenting and supportive care.
 *
 * What was read, and how (11 November 2026, fetched raw with curl and read as text):
 * - Scottish Palliative Care Guidelines, "Superior vena cava obstruction" (NHS Scotland, Right Decisions platform):
 *   the web page in full. It carries no publication or review date; its references are SIGN 137 (2014) and an ABC of
 *   Palliative Care article (1997).
 * - NICE NG122 (lung cancer, 2019, last updated March 2024): the palliative interventions chapter in full; its two SVCO
 *   recommendations date from 2005.
 * - Rowell and Gleeson 2002 systematic review (Clinical Oncology): abstract from Europe PMC. Its Cochrane version
 *   (CD001316) is withdrawn.
 * - Sen, Gloviczki et al. 2026 review of contemporary management (Journal of Vascular Surgery: Venous and Lymphatic
 *   Disorders): open access, full text from Europe PMC (PMC13098589).
 * - Annals of Palliative Medicine 2024 review of malignant SVC syndrome: abstract from Europe PMC.
 * Every DOI was resolved through Crossref and its title checked. Quotes checked by script against the raw text.
 */
export const superiorVenaCavaObstruction = protocol({
  id: "svc-obstruction",
  name: "Superior vena cava obstruction in cancer: recognition, imaging, stenting and treatment of the cause",
  aka: ["SVCO", "SVC syndrome", "superior vena cava syndrome", "malignant SVC obstruction", "SVC stent"],
  domain: "emergencies",
  tldr: "A cancer in the chest, most often lung cancer or lymphoma, can squeeze the large vein that brings blood back from the head and arms. The face, neck and arms swell, and breathing can become difficult: this needs urgent hospital assessment the same day. A CT scan confirms it; a small metal tube (stent) in the vein can relieve symptoms within days, and chemotherapy or radiotherapy treats the cancer.",
  simple: "If your face, neck or arms swell or you become breathless, and you have a cancer in your chest, ring your cancer team or 999 the same day.",
  summary: "Malignant SVCO is caused by external compression, thrombosis or direct invasion of the superior vena cava; lung cancer accounts for 65 to 80%, lymphoma for 2 to 10% (Scottish Palliative Care Guidelines). It may be the first presentation of the cancer. Symptoms are those of venous hypertension: breathlessness, headache worse on stooping, swelling of the face, neck and arms, visual change and dizziness; signs include non-pulsatile distended neck veins, chest wall collaterals and, late, stridor and papilloedema. A chest X-ray and CT confirm it; CT venography and MR venography are the primary imaging studies (Sen 2026).\n\nNICE NG122 (2005 recommendations, still current) offers chemotherapy and radiotherapy according to stage and performance status, and considers a stent for immediate relief of severe symptoms or after failure of earlier treatment. The Scottish guideline adds loosening clothing and supporting the arms, urgent discussion with oncology, radiotherapy or respiratory medicine, chemotherapy and radiotherapy for small-cell lung cancer, consideration of stenting, thrombectomy, thrombolysis and anticoagulation, and dexamethasone 16 mg then 8 mg twice daily, noting that steroids may help despite the absence of evidence. A systematic review (Rowell and Gleeson 2002) found chemotherapy and/or radiotherapy relieved SVCO in 77% with small-cell and 60% with non-small-cell lung cancer, and a stent in 95%, more rapidly; the effectiveness of steroids and the best timing of a stent were uncertain. A 2026 vascular review calls stenting first-line for symptomatic SVC syndrome of any cause (pooled clinical success 96.8% in 2249 patients; fatal complications 1 to 2%), and the Annals of Palliative Medicine 2024 review reserves immediate stenting for airway compromise, laryngeal oedema or cerebral oedema, after complete staging to decide whether treatment is curative or palliative.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "radiographer", "emergency-team", "patient-or-carer"],
    where: ["emergency-department", "acute-oncology-service", "ward", "radiotherapy-department", "home", "telephone-triage"],
  },
  population: "Adults with a known or suspected cancer in the chest (lung cancer, lymphoma, other mediastinal or metastatic disease) who develop obstruction of the superior vena cava. Benign causes (central venous catheters, pacemaker leads) are noted only where the sources compare them. Children are not covered.",
  trigger: "Swelling of the face, neck or arms, breathlessness, headache worse on bending, or distended neck and chest wall veins in a person with cancer in the chest, or as a first presentation of cancer.",
  steps: [
    {
      action: "Recognise the symptoms of venous congestion: breathlessness, swelling of the face, neck and arms, headache worse on stooping, visual change and dizziness",
      why: "The blocked vein raises pressure in the head, neck and arms; this can be the first sign of a cancer.",
      source: "scot-pcg-svco",
      quote: "This condition may be the first presentation of malignancy or can occur in those with known malignancy.",
    },
    {
      action: "Confirm the diagnosis with a chest X-ray and CT, ideally CT venography",
      why: "The scan shows where the vein is blocked, whether there is a clot, and what is pressing on it.",
      source: "sen-2026",
      quote: "Central vein obstruction can be suspected based on Duplex ultrasound of the neck and arm veins, but computed tomography venography (CTV) (Fig 1) and/or magnetic resonance venography are the primary imaging studies to diagnose and ascertain the extent of the central venous obstruction.",
    },
    {
      action: "Loosen tight clothing and support the arms on pillows",
      why: "This eases the pressure in the veins of the head and arms while treatment is arranged.",
      source: "scot-pcg-svco",
      quote: "Ensure restricting clothing is loosened and upper arms are supported on pillows.",
    },
    {
      action: "Discuss urgently with oncology, clinical oncology (radiotherapy) or respiratory medicine",
      why: "The right treatment depends on the type of cancer, its stage and how fit the person is.",
      source: "scot-pcg-svco",
      quote: "Discuss with or refer urgently to oncologist, radiotherapist, respiratory physician as appropriate.",
    },
    {
      action: "Complete staging, including the type of cancer where it is not yet known, before deciding whether treatment aims to cure",
      why: "The type and extent of the cancer decide whether chemotherapy or radiotherapy comes first, and whether cure is possible.",
      source: "apm-2024",
      quote: "When evaluating patients, a complete staging workup is recommended, as it will determine whether treatment should be definitive/curative or palliative in intent.",
    },
    {
      action: "Offer chemotherapy and radiotherapy according to the stage of the cancer and the person's performance status",
      why: "Treating the cancer relieves the obstruction in most people with lung cancer.",
      source: "nice-ng122",
      quote: "For people who present with superior vena cava obstruction, offer chemotherapy and radiotherapy based on the stage of disease and performance status. [2005]",
    },
    {
      action: "Consider a stent for immediate relief of severe symptoms, or when earlier treatment has failed",
      why: "A stent opens the vein within days, faster than chemotherapy or radiotherapy.",
      source: "nice-ng122",
      quote: "Consider stent insertion for the immediate relief of severe symptoms of superior vena caval obstruction or following failure of earlier treatment. [2005]",
    },
    {
      action: "Treat the vein urgently with a stent, with thrombolysis if there is clot, when there is airway compromise, laryngeal oedema or reduced consciousness from brain swelling",
      why: "These complications can kill before cancer treatment has time to work.",
      source: "apm-2024",
      quote: "If the patient requires urgent treatment of venous obstruction, such as in the cases of acute central airway obstruction, severe laryngeal edema and/or coma from cerebral edema, direct opening of the occlusion by endovascular stenting and angioplasty with thrombolysis should be considered.",
    },
    {
      action: "If dexamethasone is tried, stop it promptly if there is no benefit",
      why: "Steroids are widely given, but there is no good evidence that they help, and they have side effects.",
      source: "scot-pcg-svco",
      quote: "Steroids may be helpful despite the absence of evidence to support their use.",
    },
    {
      action: "Offer supportive care to everyone: benzodiazepines, opioids and oxygen for breathlessness and distress",
      why: "Breathlessness is frightening, and these ease it whatever else is done.",
      source: "scot-pcg-svco",
      quote: "Offer benzodiazepines, opioids, oxygen and supportive care to all patients in addition to the above measures.",
    },
  ],
  bestInClass: {
    statement: "No current graded guideline on malignant SVCO was found. NICE NG122 is the most recent national guideline that addresses it, with two 2005 recommendations: chemotherapy and radiotherapy by stage and performance status, and a stent for immediate relief of severe symptoms or after earlier treatment fails. The evidence since has moved towards earlier stenting: the 2002 systematic review found stents relieved SVCO in 95% (against 60 to 77% with chemotherapy or radiotherapy) and more rapidly, and a 2026 vascular surgery review of literature to April 2025 calls stenting first-line for symptomatic SVC syndrome of any cause, with covered stents probably safer. The positions differ on when to stent: NICE and the Scottish guideline consider it for severe symptoms or failure of other treatment; the vascular review puts it first for anyone symptomatic. In either case complete staging comes first, because the histology decides between chemotherapy and radiotherapy (Annals of Palliative Medicine 2024). Steroids are unsupported by evidence in every source read.",
    sources: ["nice-ng122", "rowell-2002", "sen-2026", "scot-pcg-svco", "apm-2024"],
  },
  variants: [
    {
      name: "Stent first for all symptomatic SVC obstruction",
      differs: "Puts balloon angioplasty and stenting first for every symptomatic patient, before or alongside cancer treatment, rather than reserving it for severe symptoms or failure.",
      evidence: "Sen 2026 review: pooled clinical success 96.8% and 1-year patency over 90% in a meta-analysis of 2249 patients (benign and malignant); total complications about 9%, fatal 1 to 2%, rupture with tamponade the most severe.",
      sources: ["sen-2026"],
    },
    {
      name: "Dexamethasone 16 mg, then 8 mg twice daily (Scottish Palliative Care Guidelines)",
      differs: "Gives dexamethasone 16 mg immediately and 8 mg twice daily from the next day, with the second dose before 2 pm, stopped if there is no benefit.",
      evidence: "No evidence of benefit: the guideline says so itself, and the 2002 systematic review found the effectiveness of steroids uncertain.",
      sources: ["scot-pcg-svco", "rowell-2002"],
    },
  ],
  grades: [
    { claim: "Chemotherapy and radiotherapy based on stage and performance status", grade: "not graded (NICE; dated 2005)", source: "nice-ng122" },
    { claim: "Stent for immediate relief of severe symptoms or after failure of earlier treatment", grade: "not graded (NICE; dated 2005)", source: "nice-ng122" },
    { claim: "Relief rates by treatment", grade: "systematic review (2 randomised and 44 non-randomised studies)", source: "rowell-2002", quote: "Insertion of an SVC stent relieved SVCO in 95%; 11% of those treated had further SVCO but recanalization was possible in the majority resulting in a long-term patency rate of 92%." },
  ],
  sources: [
    { key: "scot-pcg-svco", label: "Scottish Palliative Care Guidelines: Superior vena cava obstruction", publisher: "NHS Scotland, Scottish Palliative Care Guidelines (Right Decisions platform)", year: 2026, url: "https://www.palliativecareguidelines.scot.nhs.uk/scottish-palliative-care-guidelines/palliative-emergencies/superior-vena-cava-obstruction/", gradingScheme: "National consensus palliative care guidance; not graded. The page carries no publication or review date: the year given is the year it was read.", read: "full-text", accessed: "2026-11-11" },
    { key: "nice-ng122", label: "Lung cancer: diagnosis and management (NG122), palliative interventions and supportive and palliative care", publisher: "NICE", year: 2019, url: "https://www.nice.org.uk/guidance/ng122/chapter/Palliative-interventions-and-supportive-and-palliative-care", gradingScheme: "NICE does not grade recommendations; strength is in the wording ('offer', 'consider'). Each recommendation is dated by the year it was written. Published March 2019, last updated March 2024.", read: "full-text", accessed: "2026-11-11" },
    { key: "rowell-2002", label: "Steroids, radiotherapy, chemotherapy and stents for superior vena caval obstruction in carcinoma of the bronchus: a systematic review", publisher: "Clinical Oncology (Royal College of Radiologists)", year: 2002, url: "https://europepmc.org/abstract/MED/12555872", doi: "10.1053/clon.2002.0095", read: "abstract", accessed: "2026-11-11" },
    { key: "sen-2026", label: "Contemporary management of superior vena cava syndrome", publisher: "Journal of Vascular Surgery: Venous and Lymphatic Disorders", year: 2026, url: "https://europepmc.org/article/PMC/PMC13098589", doi: "10.1016/j.jvsv.2026.102491", gradingScheme: "A narrative review with a systematic literature search (to April 2025); not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "apm-2024", label: "Management of malignant superior vena cava syndrome", publisher: "Annals of Palliative Medicine", year: 2024, url: "https://europepmc.org/abstract/MED/38600814", doi: "10.21037/apm-23-573", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "No current graded guideline on malignant SVCO was found. NICE's recommendations date from 2005, and the Cochrane review of steroids, radiotherapy, chemotherapy and stents (CD001316) has been withdrawn.",
    "Whether to stent at diagnosis or only after cancer treatment fails is unsettled: the 2002 systematic review called the optimal timing uncertain, and no randomised trial of stent first against chemotherapy or radiotherapy first was found.",
    "Anticoagulation after a stent for malignant SVCO varies between centres; a 2025 retrospective series (Current Oncology) was found but not read, and no guideline read sets a regimen.",
    "Whether steroids before a biopsy can obscure a diagnosis of lymphoma is not addressed by any source read here.",
    "SIGN 137 (2014), the source of the Scottish guideline, was not read.",
  ],
  drugs: ["dexamethasone"],
  technologies: ["ct", "palliative-radiotherapy"],
  cancers: ["nsclc", "sclc", "non-hodgkin-lymphoma"],
  institutions: ["nice"],
  terms: ["superior-vena-cava-obstruction"],
  related: ["metastatic-spinal-cord-compression-emergency"],
  tags: ["protocol", "acute-oncology", "oncological-emergency"],
});

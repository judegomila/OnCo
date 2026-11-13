import { protocol } from "./helpers";

/*
 * Raised intracranial pressure in a person with cancer (brain metastases, primary brain tumour, or a bleed into a
 * tumour): recognition, urgent imaging, dexamethasone and referral.
 *
 * What was read, and how (11 November 2026, fetched raw with curl and read as text):
 * - Scottish Palliative Care Guidelines, "Raised intracranial pressure (ICP)" (NHS Scotland,
 *   on the Right Decisions platform): the web page in full. It carries no publication or review date.
 * - NICE NG122 (lung cancer), the chapter on palliative interventions, in full, and its update-information page.
 * - Congress of Neurological Surgeons (CNS) 2019 systematic review and guideline on steroids for brain metastases:
 *   abstract from Europe PMC (the recommendations are printed in the abstract). The full guideline page at cns.org
 *   returned 404 at the address the abstract gives.
 * - Vecht et al. 1994 (Neurology), the randomised dose comparison: abstract from Europe PMC.
 * - EANO-ESMO 2021 brain metastasis guideline: Europe PMC holds no abstract and annalsofoncology.org returned 403.
 *   Not read.
 * - NICE NG99 (brain tumours) recommendations page was read; it does not address the acute management of raised
 *   intracranial pressure.
 * Every DOI was resolved through Crossref and its title checked. Quotes checked by script against the raw text.
 */
export const raisedIntracranialPressure = protocol({
  id: "raised-intracranial-pressure",
  name: "Raised intracranial pressure in cancer: recognition, urgent scan, dexamethasone and referral",
  aka: ["raised ICP", "cerebral oedema from brain metastases", "brain swelling in cancer", "peritumoral oedema", "dexamethasone for brain metastases"],
  domain: "emergencies",
  tldr: "Cancer in or spreading to the brain can raise the pressure inside the skull. A headache that is worse in the morning or on coughing, being sick without feeling sick, new confusion, a fit or a change in vision needs a same-day call to your cancer team. Usually a brain scan is done and a steroid called dexamethasone is started to reduce the swelling, then lowered as soon as it can be.",
  simple: "If you have cancer and get a new headache that is worse in the morning, keep being sick, or become confused, ring your cancer team the same day.",
  summary: "Raised intracranial pressure in cancer is usually from brain metastases or a primary brain tumour with surrounding oedema, or a bleed into or around a tumour. The Scottish Palliative Care Guidelines list a headache gradually increasing, classically worse in the morning and on coughing, sneezing or bending, vomiting often without nausea, visual disturbance, dizziness, personality change and seizures; signs (raised blood pressure, altered consciousness, ocular palsies, papilloedema) are often late. Management there: urgent CT brain may be necessary; a trial of corticosteroids with gastroprotection, dexamethasone 8 to 16 mg immediately, then 4 to 8 mg twice daily with the second dose before 2 pm, stopped promptly if there is no benefit and reduced gradually in responders; raise the head of the bed; stop anticoagulants if a bleed is suspected; analgesia and antiemetics (ondansetron); referral to oncology and consideration of neurosurgery.\n\nThe Congress of Neurological Surgeons (2019, Level 3) recommends steroids for temporary relief of symptoms from raised pressure, a starting dose of 4 to 8 mg/day of dexamethasone for mild symptoms and 16 mg/day or more for severe symptoms, dexamethasone as the steroid of choice, and tapering as rapidly as tolerated; it finds insufficient evidence for steroids in people without symptoms or mass effect. The trial behind the lower dose (Vecht 1994) found 4 mg/day gave the same improvement at one week as 16 mg/day, with fewer toxic effects, in people without signs of impending herniation. NICE NG122 (lung cancer) offers dexamethasone for symptomatic brain metastases, reduced to the minimum dose that keeps symptoms controlled. EANO-ESMO 2021 could not be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer", "emergency-team"],
    where: ["home", "telephone-triage", "acute-oncology-service", "emergency-department", "ward"],
  },
  population: "Adults with a known or suspected brain tumour or brain metastases, or any cancer that can bleed into the brain, who develop symptoms of raised intracranial pressure. The Scottish guideline is written for palliative care; the CNS guideline for adults with brain metastases. Children and people with hydrocephalus needing a shunt or drain are not covered here.",
  trigger: "A person with cancer reports a new or worsening headache with the features below, vomiting, new confusion or personality change, visual disturbance or a seizure.",
  steps: [
    {
      action: "Suspect raised intracranial pressure when a person with cancer has a headache that is worse in the morning or on coughing, sneezing or bending, or vomits without nausea",
      why: "Pressure in the skull rises when lying flat overnight and when straining, so the pattern of the headache is a clue.",
      source: "scot-pcg",
      quote: "Headache often worse on coughing, sneezing and bending over",
    },
    {
      action: "Do not wait for signs on examination before acting",
      why: "Signs such as swelling at the back of the eye often appear late.",
      source: "scot-pcg",
      quote: "Diagnosis is usually based on the history. Signs are often late but can include:",
    },
    {
      action: "Arrange an urgent CT scan of the brain where it would change management",
      why: "A scan shows whether there is a tumour, swelling or bleeding, and guides treatment.",
      source: "scot-pcg",
      quote: "Urgent CT Brain may be necessary.",
    },
    {
      action: "Remember that a bleed into or around a tumour can cause it, and stop anticoagulants if a bleed is suspected",
      why: "Blood thinners can make bleeding inside the skull worse.",
      source: "scot-pcg",
      quote: "If intracranial bleed suspected stop anticoagulants",
    },
    {
      action: "Start dexamethasone with a proton pump inhibitor: 8 to 16 mg at once, then 4 to 8 mg twice daily, giving the second dose before 2 pm",
      why: "Steroids reduce the swelling around the tumour; the earlier afternoon dose helps sleep, and the stomach protection reduces ulcers.",
      source: "scot-pcg",
      quote: "Consider a trial of corticosteroids with gastroprotection (usually proton pump inhibitor),",
    },
    {
      action: "Match the starting dose to the symptoms: 4 to 8 mg a day for mild symptoms, 16 mg a day or more for severe symptoms of raised pressure",
      why: "Lower doses work as well for many people and cause fewer side effects; severe symptoms need more.",
      source: "cns-2019",
      quote: "If patients exhibit severe symptoms consistent with increased intracranial pressure, it is recommended that higher doses such as 16 mg/d or more be considered.",
      grade: "Level 3",
    },
    {
      action: "Stop dexamethasone promptly if it does not help, and reduce it gradually, as fast as symptoms allow, if it does",
      why: "Long courses of steroids cause diabetes, muscle weakness, mood change and infection.",
      source: "scot-pcg",
      quote: "Discontinue promptly if no benefit and reduce gradually in responders.",
    },
    {
      action: "Raise the head of the bed and treat pain and vomiting; ondansetron can help",
      why: "Sitting up helps the pressure fall, and controlling symptoms matters while other treatment is planned.",
      source: "scot-pcg",
      quote: "Raise the head of the patient’s bed",
    },
    {
      action: "Refer to oncology, and consider neurosurgery, to decide on treatment of the cause",
      why: "Surgery, radiotherapy or drug treatment may treat the cause; the team also needs to know what this means for the future.",
      source: "scot-pcg",
      quote: "Referral to oncology is important to understand the implications for the patient’s prognosis, and whether disease-modifying therapy would be offered",
    },
  ],
  bestInClass: {
    statement: "No graded guideline read for this page addresses raised intracranial pressure in cancer as an emergency in its own right. The Congress of Neurological Surgeons 2019 guideline is the graded source for steroids (Level 3, from a systematic review that found only two eligible studies): dexamethasone, 4 to 8 mg/day for mild symptoms and 16 mg/day or more for severe ones, tapered as fast as tolerated, and no recommendation either way when there are no symptoms. The Scottish Palliative Care Guidelines give the practical bedside sequence (CT, dexamethasone with gastroprotection, head up, anticoagulant review, referral). Their starting dose (8 to 16 mg, then 4 to 8 mg twice daily) is higher than the CNS lower range; the randomised evidence (Vecht 1994) supports 4 mg/day for people without signs of impending herniation. NICE NG122 adds that the dose should be reduced to the minimum needed. The EANO-ESMO 2021 guideline, the current European standard for brain metastases, could not be read.",
    sources: ["cns-2019", "scot-pcg", "vecht-1994", "nice-ng122", "eano-esmo-2021"],
  },
  variants: [
    {
      name: "Lower starting dose of dexamethasone (4 to 8 mg a day)",
      differs: "Starts at 4 to 8 mg a day for mild symptoms rather than 8 to 16 mg as a first dose followed by 8 to 16 mg a day.",
      evidence: "CNS 2019, Level 3; Vecht 1994 double-blind randomised trials in 96 patients: 4 or 8 mg/day gave the same improvement in performance status at one week as 16 mg/day, and toxic effects were more frequent at 16 mg/day.",
      sources: ["cns-2019", "vecht-1994"],
    },
    {
      name: "No steroids for people without symptoms",
      differs: "Withholds dexamethasone from people whose brain metastases cause no symptoms or mass effect.",
      evidence: "CNS 2019 found insufficient evidence to recommend for or against; NICE NG122 offers dexamethasone only to people with symptomatic brain metastases.",
      sources: ["cns-2019", "nice-ng122"],
    },
  ],
  grades: [
    { claim: "Corticosteroids for temporary relief of symptoms from raised intracranial pressure and oedema", grade: "Level 3", source: "cns-2019", quote: "Corticosteroids are recommended to provide temporary symptomatic relief of symptoms related to increased intracranial pressure and edema secondary to brain metastases." },
    { claim: "Dexamethasone as the steroid of choice", grade: "Level 3", source: "cns-2019", quote: "If corticosteroids are given, dexamethasone is the best drug choice given the available evidence." },
    { claim: "Offer dexamethasone for symptomatic brain metastases and reduce to the minimum maintenance dose", grade: "not graded (NICE; dated 2011)", source: "nice-ng122", quote: "Offer dexamethasone to people with symptomatic brain metastases and reduce to the minimum necessary maintenance dose for symptomatic response." },
  ],
  sources: [
    { key: "scot-pcg", label: "Scottish Palliative Care Guidelines: Raised intracranial pressure (ICP)", publisher: "NHS Scotland, Scottish Palliative Care Guidelines (Right Decisions platform)", year: 2026, url: "https://www.palliativecareguidelines.scot.nhs.uk/scottish-palliative-care-guidelines/palliative-emergencies/raised-intracranial-pressure-icp/", gradingScheme: "National consensus palliative care guidance; not graded. The page carries no publication or review date: the year given is the year it was read.", read: "full-text", accessed: "2026-11-11" },
    { key: "cns-2019", label: "Congress of Neurological Surgeons Systematic Review and Evidence-Based Guidelines on the Role of Steroids in the Treatment of Adults With Metastatic Brain Tumors", publisher: "Congress of Neurological Surgeons, Neurosurgery", year: 2019, url: "https://europepmc.org/abstract/MED/30629207", doi: "10.1093/neuros/nyy546", gradingScheme: "CNS levels of recommendation, printed as Level 1 to Level 3 before each recommendation; the abstract read does not define them, and every recommendation in it is Level 3.", read: "abstract", accessed: "2026-11-11" },
    { key: "vecht-1994", label: "Dose-effect relationship of dexamethasone on Karnofsky performance in metastatic brain tumors: a randomized study of doses of 4, 8, and 16 mg per day", publisher: "Neurology", year: 1994, url: "https://europepmc.org/abstract/MED/8164824", doi: "10.1212/WNL.44.4.675", read: "abstract", accessed: "2026-11-11" },
    { key: "nice-ng122", label: "Lung cancer: diagnosis and management (NG122), palliative interventions and supportive and palliative care", publisher: "NICE", year: 2019, url: "https://www.nice.org.uk/guidance/ng122/chapter/Palliative-interventions-and-supportive-and-palliative-care", gradingScheme: "NICE does not grade recommendations; strength is in the wording ('offer', 'consider'). Each recommendation is dated by the year it was written. Published March 2019, last updated March 2024.", read: "full-text", accessed: "2026-11-11" },
    { key: "eano-esmo-2021", label: "EANO-ESMO Clinical Practice Guidelines for diagnosis, treatment and follow-up of patients with brain metastasis from solid tumours", publisher: "EANO and ESMO, Annals of Oncology", year: 2021, url: "https://doi.org/10.1016/j.annonc.2021.07.016", doi: "10.1016/j.annonc.2021.07.016", read: "not-reachable", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The EANO-ESMO 2021 guideline on brain metastases could not be read: Europe PMC holds no abstract and the publisher refused a script. Its steroid and emergency advice is not compared here.",
    "The CNS 2019 guideline was read only as its abstract; its full text and evidence tables were not read.",
    "No source read gives a threshold for emergency neurosurgery or for osmotic therapy (mannitol or hypertonic saline) in raised pressure from a tumour; the Scottish guideline says only to consider referral to neurosurgery.",
    "The steroid evidence is thin: the CNS systematic review found two eligible studies, and its recommendations are Level 3.",
    "Whether to withhold dexamethasone before a biopsy when lymphoma of the brain is possible is not addressed by any source read here.",
  ],
  drugs: ["dexamethasone", "ondansetron"],
  technologies: ["ct", "mri", "palliative-radiotherapy"],
  cancers: ["secondary-brain-tumours", "brain-tumours", "glioblastoma"],
  institutions: ["nice"],
  terms: ["brain-metastases", "stereotactic-radiosurgery", "wbrt"],
  related: ["metastatic-spinal-cord-compression-emergency", "acute-oncology-telephone-triage"],
  tags: ["protocol", "acute-oncology", "oncological-emergency"],
});

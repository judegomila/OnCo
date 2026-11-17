import { protocol } from "./helpers";

/*
 * Raised intracranial pressure in a person with cancer (brain metastases, primary brain tumour, or a bleed into a
 * tumour): recognition, urgent imaging, dexamethasone and referral.
 *
 * What was read, and how. First pass 11 November 2026; every source re-fetched raw with curl and re-read as text
 * on 16 November 2026 (second accuracy pass), each quote checked by script against the saved text:
 * - Scottish Palliative Care Guidelines, "Raised intracranial pressure (ICP)" (NHS Scotland,
 *   on the Right Decisions platform): the web page in full. It carries no publication or review date. The dagger it
 *   prints before dexamethasone and ondansetron links to its note on off-label use.
 * - NICE NG122 (lung cancer), the chapter on palliative interventions, in full, with its overview and
 *   update-information pages (last reviewed 9 November 2026; recommendation on dexamethasone unchanged, [2011]).
 * - Congress of Neurological Surgeons (CNS) 2019 systematic review and guideline on steroids for brain metastases:
 *   abstract from Europe PMC (the recommendations are printed in the abstract). The full guideline page at cns.org
 *   still returned 404 on 16 November 2026 at the address the abstract gives.
 * - Vecht et al. 1994 (Neurology), the randomised dose comparison: abstract from Europe PMC (truncated there at
 *   250 words).
 * - EANO-ESMO 2021 brain metastasis guideline: not read on 11 November (annalsofoncology.org returned 403, and did
 *   again on 16 November). Read in full on 16 November 2026 from the typeset article (Annals of Oncology 32(11),
 *   pages 1332 to 1347) deposited in the Sapienza University of Rome repository (iris.uniroma1.it, found through
 *   Unpaywall), with pdftotext. Its supplementary tables, which define the grades, were not read.
 * - NICE NG99 (brain tumours) recommendations page was read; it does not address the acute management of raised
 *   intracranial pressure.
 * Every DOI was resolved through Crossref and its title checked.
 */
export const raisedIntracranialPressure = protocol({
  id: "raised-intracranial-pressure",
  name: "Raised intracranial pressure in cancer: recognition, urgent scan, dexamethasone and referral",
  aka: ["raised ICP", "cerebral oedema from brain metastases", "brain swelling in cancer", "peritumoral oedema", "dexamethasone for brain metastases"],
  domain: "emergencies",
  tldr: "Cancer in or spreading to the brain can raise the pressure inside the skull. A headache that is worse in the morning or on coughing, being sick without feeling sick, a change in personality, a fit or a change in vision needs urgent contact with your cancer team. A brain scan may be needed, and a steroid called dexamethasone is often tried to ease the symptoms, then lowered as soon as it can be.",
  simple: "If you have cancer and get a new headache that is worse in the morning, keep being sick, or your personality changes, contact your cancer team urgently.",
  summary: "The Scottish Palliative Care Guidelines file raised intracranial pressure under palliative emergencies and say that, in people with cancer, it may be caused by the cancer or by a bleed into or around the tumour. They list a headache gradually increasing in severity, classically worse in the morning and often worse on coughing, sneezing and bending over, vomiting commonly without nausea, visual disturbance, dizziness, personality change and seizures; the diagnosis usually rests on the history, and signs (raised blood pressure, altered level of consciousness, ocular palsies, papilloedema) are often late. Management there: urgent CT brain may be necessary; consider a trial of corticosteroids with gastroprotection (usually a proton pump inhibitor), dexamethasone 8 to 16 mg orally or intravenously immediately, then 4 to 8 mg twice daily orally with the second dose before 2 pm if possible, stopped promptly if there is no benefit and reduced gradually in responders; raise the head of the bed; stop anticoagulants if a bleed is suspected; analgesia and antiemetics (ondansetron 4 mg twice a day can be effective); referral to oncology and consideration of referral to neurosurgery. The guideline marks both dexamethasone and ondansetron here with its off-label sign.\n\nThe Congress of Neurological Surgeons (2019, Level 3) recommends steroids for temporary relief of symptoms from raised pressure and oedema, says a starting dose of 4 to 8 mg/day of dexamethasone should be considered for symptomatic patients and 16 mg/day or more for severe symptoms of raised pressure, names dexamethasone as the best drug choice, and asks for tapering as rapidly as possible but no faster than tolerated; it finds insufficient evidence to make a recommendation for people with no symptoms and no mass effect. The trial behind the lower dose (Vecht 1994) concluded that 4 mg/day gave the same improvement at one week as 16 mg/day in people without signs of impending herniation, and that toxic effects were more frequent at 16 mg/day. EANO-ESMO 2021 gives no dose: it says the lowest dose of steroids should be used for the shortest time possible when they are needed to control raised intracranial pressure, that steroids should only be considered in symptomatic patients, that anyone with cancer and symptoms or signs of raised pressure should have neuroimaging, and that surgery should be considered for acute symptoms of raised pressure. NICE NG122 (lung cancer) offers dexamethasone for symptomatic brain metastases, reduced to the minimum necessary maintenance dose.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer", "emergency-team"],
    where: ["home", "telephone-triage", "acute-oncology-service", "emergency-department", "ward"],
  },
  population: "Adults with a known or suspected brain tumour or brain metastases, or any cancer that can bleed into the brain, who develop symptoms of raised intracranial pressure. The Scottish guideline is written for palliative care; the CNS guideline for adults with brain metastases; the EANO-ESMO guideline for brain metastases from solid tumours, not primary brain tumours, lymphoma or leukaemia. Children and people with hydrocephalus needing a shunt or drain are not covered here.",
  trigger: "A person with cancer reports a new or worsening headache with the features below, vomiting, personality change, visual disturbance, dizziness or a seizure, or is found to have an altered level of consciousness.",
  steps: [
    {
      action: "Suspect raised intracranial pressure when a person with cancer has a headache that is worse in the morning or on coughing, sneezing or bending over, or vomits without nausea",
      why: "The diagnosis usually rests on the history, and this pattern of headache and vomiting is what the guideline lists.",
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
      action: "Consider an urgent CT scan of the brain",
      why: "The guideline says an urgent scan may be necessary; the pressure may come from the cancer itself or from a bleed.",
      source: "scot-pcg",
      quote: "Urgent CT Brain may be necessary.",
    },
    {
      action: "Image the brain in anyone with cancer who has symptoms or signs of raised intracranial pressure, seizures and new neurological deficits; MRI is the work-up this guideline specifies for suspected brain metastases",
      why: "The European guideline asks that brain metastases be looked for in these people.",
      source: "eano-esmo-2021",
      grade: "[EANO III, B; ESMO III, B]",
    },
    {
      action: "Remember that a bleed into or around a tumour can cause it, and stop anticoagulants if a bleed is suspected",
      why: "In people with cancer the raised pressure may come from a bleed rather than from the cancer itself.",
      source: "scot-pcg",
      quote: "If intracranial bleed suspected stop anticoagulants",
    },
    {
      action: "Consider a trial of dexamethasone with stomach protection, usually a proton pump inhibitor: 8 to 16 mg by mouth or into a vein at once, then 4 to 8 mg twice daily by mouth, with the second dose before 2 pm if possible",
      why: "It is a trial: the steroid is kept only if it helps. The guideline flags this use of dexamethasone with its off-label sign.",
      source: "scot-pcg",
      quote: "Consider a trial of corticosteroids with gastroprotection (usually proton pump inhibitor),",
    },
    {
      action: "Consider matching the starting dose to the symptoms: 4 to 8 mg a day for symptomatic patients, 16 mg a day or more for severe symptoms of raised pressure",
      why: "Steroids give temporary relief; the guideline suggests a lower starting dose unless symptoms are severe.",
      source: "cns-2019",
      quote: "If patients exhibit severe symptoms consistent with increased intracranial pressure, it is recommended that higher doses such as 16 mg/d or more be considered.",
      grade: "Level 3",
    },
    {
      action: "Stop dexamethasone promptly if it does not help, and reduce it gradually if it does",
      why: "The steroid is continued only while it is helping.",
      source: "scot-pcg",
      quote: "Discontinue promptly if no benefit and reduce gradually in responders.",
    },
    {
      action: "Use the lowest dose of steroid for the shortest time possible",
      why: "The European guideline asks for this whenever steroids are needed to control raised pressure; the American one asks for tapering as fast as is tolerated, with the long-term effects of steroids in mind.",
      source: "eano-esmo-2021",
      quote: "When required clinically for control of raised intracranial pressure, the lowest dose of steroids should be used for the shortest time possible",
      grade: "[EANO: IV, n/a; ESMO: IV, B]",
    },
    {
      action: "Raise the head of the bed and treat pain and vomiting; ondansetron 4 mg twice a day can be effective",
      why: "The guideline lists these for symptom relief alongside the steroid; it flags this use of ondansetron with its off-label sign.",
      source: "scot-pcg",
      quote: "Raise the head of the patient’s bed",
    },
    {
      action: "Refer to oncology, and consider referral to neurosurgery",
      why: "Oncology can say what this means for the future and whether treatment aimed at the disease itself would be offered.",
      source: "scot-pcg",
      quote: "Referral to oncology is important to understand the implications for the patient’s prognosis, and whether disease-modifying therapy would be offered",
    },
    {
      action: "Consider surgery when brain metastases cause acute symptoms of raised intracranial pressure",
      why: "Removing a large metastasis relieves the pressure at once and, the guideline says, allows steroids to be tapered quickly.",
      source: "eano-esmo-2021",
      quote: "Surgery should be considered when there are acute symptoms of raised intracranial pressure",
      grade: "[EANO: III, C; ESMO: IV, B]",
    },
  ],
  bestInClass: {
    statement: "No guideline read for this page gives a graded sequence for raised intracranial pressure in cancer as an emergency in its own right. The Congress of Neurological Surgeons 2019 guideline is the graded source for a steroid dose (Level 3, from a systematic review that found only two eligible studies): dexamethasone, a starting dose of 4 to 8 mg/day to be considered for symptomatic patients and 16 mg/day or more for severe symptoms of raised pressure, tapered as rapidly as possible but no faster than tolerated, and no recommendation where there are no symptoms and no mass effect. EANO-ESMO 2021, the European guideline for brain metastases from solid tumours, gives no dose: the lowest dose of steroids for the shortest time possible [EANO: IV, n/a; ESMO: IV, B], steroids only to be considered in symptomatic patients [EANO: IV, n/a; ESMO: IV, B], and surgery to be considered for acute symptoms of raised pressure [EANO: III, C; ESMO: IV, B]; it says it does not aim to describe supportive care comprehensively. The Scottish Palliative Care Guidelines, which are not graded, give the practical bedside sequence (CT, a trial of dexamethasone with gastroprotection, head up, anticoagulant review, referral). Their starting dose (8 to 16 mg, then 4 to 8 mg twice daily) is higher than the CNS lower range; the randomised evidence (Vecht 1994) supports 4 mg/day for people without signs of impending herniation. NICE NG122 adds that the dose should be reduced to the minimum necessary maintenance dose.",
    sources: ["cns-2019", "eano-esmo-2021", "scot-pcg", "vecht-1994", "nice-ng122"],
  },
  variants: [
    {
      name: "Lower starting dose of dexamethasone (4 to 8 mg a day)",
      differs: "Starts at 4 to 8 mg a day rather than 8 to 16 mg as a first dose followed by 4 to 8 mg twice daily (8 to 16 mg a day).",
      evidence: "CNS 2019, Level 3. Vecht 1994, two consecutive double-blind randomised trials, 96 patients randomised and 89 evaluated: Karnofsky score at day 7 improved by 8.0 points on 8 mg/day against 7.3 on 16 mg/day in the first, and by 6.7 points on 4 mg/day against 9.1 on 16 mg/day in the second; the authors concluded that 4 mg/day gives the same degree of improvement after one week as 16 mg/day in people with no signs of impending herniation, and toxic effects were more frequent at 16 mg/day (p < 0.03).",
      sources: ["cns-2019", "vecht-1994"],
    },
    {
      name: "No steroids for people without symptoms",
      differs: "Withholds dexamethasone from people whose brain metastases cause no symptoms.",
      evidence: "EANO-ESMO 2021: steroids should only be considered in symptomatic patients [EANO: IV, n/a; ESMO: IV, B]. CNS 2019 is more guarded: for people with no symptoms and no mass effect it found insufficient evidence to make a recommendation. NICE NG122 offers dexamethasone to people with symptomatic brain metastases and says nothing about those without symptoms.",
      sources: ["eano-esmo-2021", "cns-2019", "nice-ng122"],
    },
  ],
  grades: [
    { claim: "Corticosteroids for temporary relief of symptoms from raised intracranial pressure and oedema", grade: "Level 3", source: "cns-2019", quote: "Corticosteroids are recommended to provide temporary symptomatic relief of symptoms related to increased intracranial pressure and edema secondary to brain metastases." },
    { claim: "Dexamethasone as the steroid of choice", grade: "Level 3", source: "cns-2019", quote: "If corticosteroids are given, dexamethasone is the best drug choice given the available evidence." },
    { claim: "Steroids only to be considered in symptomatic patients", grade: "[EANO: IV, n/a; ESMO: IV, B]", source: "eano-esmo-2021", quote: "Steroids should only be considered in symptomatic patients" },
    { claim: "Lowest dose of steroids for the shortest time possible when needed to control raised intracranial pressure", grade: "[EANO: IV, n/a; ESMO: IV, B]", source: "eano-esmo-2021", quote: "When required clinically for control of raised intracranial pressure, the lowest dose of steroids should be used for the shortest time possible" },
    { claim: "Surgery to be considered for acute symptoms of raised intracranial pressure", grade: "[EANO: III, C; ESMO: IV, B]", source: "eano-esmo-2021", quote: "Surgery should be considered when there are acute symptoms of raised intracranial pressure" },
    { claim: "Offer dexamethasone for symptomatic brain metastases and reduce to the minimum maintenance dose", grade: "not graded (NICE; dated 2011)", source: "nice-ng122", quote: "Offer dexamethasone to people with symptomatic brain metastases and reduce to the minimum necessary maintenance dose for symptomatic response." },
  ],
  sources: [
    { key: "scot-pcg", label: "Scottish Palliative Care Guidelines: Raised intracranial pressure (ICP)", publisher: "NHS Scotland, Scottish Palliative Care Guidelines (Right Decisions platform)", year: 2026, url: "https://www.palliativecareguidelines.scot.nhs.uk/scottish-palliative-care-guidelines/palliative-emergencies/raised-intracranial-pressure-icp/", gradingScheme: "National consensus palliative care guidance; not graded. The page carries no publication or review date: the year given is the year it was read. A dagger before a medicine marks an off-label use.", read: "full-text", accessed: "2026-11-16" },
    { key: "cns-2019", label: "Congress of Neurological Surgeons Systematic Review and Evidence-Based Guidelines on the Role of Steroids in the Treatment of Adults With Metastatic Brain Tumors", publisher: "Congress of Neurological Surgeons, Neurosurgery", year: 2019, url: "https://europepmc.org/abstract/MED/30629207", doi: "10.1093/neuros/nyy546", gradingScheme: "CNS levels of recommendation, printed as Level 1 to Level 3 before each recommendation; the abstract read does not define them, and every recommendation in it is Level 3.", read: "abstract", accessed: "2026-11-16" },
    { key: "vecht-1994", label: "Dose-effect relationship of dexamethasone on Karnofsky performance in metastatic brain tumors: a randomized study of doses of 4, 8, and 16 mg per day", publisher: "Neurology", year: 1994, url: "https://europepmc.org/abstract/MED/8164824", doi: "10.1212/WNL.44.4.675", read: "abstract", accessed: "2026-11-16" },
    { key: "nice-ng122", label: "Lung cancer: diagnosis and management (NG122), palliative interventions and supportive and palliative care", publisher: "NICE", year: 2019, url: "https://www.nice.org.uk/guidance/ng122/chapter/Palliative-interventions-and-supportive-and-palliative-care", gradingScheme: "NICE does not grade recommendations; strength is in the wording ('offer', 'consider'). Each recommendation is dated by the year it was written. Published March 2019, last updated March 2024, with minor changes in February and November 2026 (last reviewed 9 November 2026) that did not touch the recommendation on dexamethasone, which is marked [2011].", read: "full-text", accessed: "2026-11-16" },
    { key: "eano-esmo-2021", label: "EANO-ESMO Clinical Practice Guidelines for diagnosis, treatment and follow-up of patients with brain metastasis from solid tumours", publisher: "EANO and ESMO, Annals of Oncology", year: 2021, url: "https://doi.org/10.1016/j.annonc.2021.07.016", doi: "10.1016/j.annonc.2021.07.016", gradingScheme: "Each recommendation carries two grades, printed as [EANO: level, grade; ESMO: level, grade]: EANO applies the European Federation of Neurological Societies criteria and ESMO an adapted Infectious Diseases Society of America-United States Public Health Service system. The tables defining them are in the supplement, which was not read. Statements without a grade were considered justified standard clinical practice by the authors.", read: "full-text", accessed: "2026-11-16" },
  ],
  upgrades: [],
  gaps: [
    "The EANO-ESMO 2021 guideline could not be read on 11 November 2026 because the publisher refused a script. On 16 November 2026 it was read in full from the typeset article deposited in the Sapienza University of Rome repository; the publisher's own page still returned 403. Its supplementary tables, which define the EANO and ESMO grades, were not read. No newer edition was found in Crossref or Europe PMC on that date; ESMO's guideline listing could not be read as text, so a later update announced only there would have been missed.",
    "The CNS 2019 guideline was read only as its abstract; its full text and evidence tables were not read, and on 16 November 2026 the full-guideline address printed in the abstract still returned 404.",
    "Vecht 1994 was read only as its abstract, which Europe PMC truncates at 250 words.",
    "No source read gives a dose or a threshold for osmotic therapy (mannitol or hypertonic saline) in raised pressure from a tumour. On surgery, EANO-ESMO 2021 says it should be considered for acute symptoms of raised pressure and names large metastases (over 3 cm) causing raised pressure as a case for it; the Scottish guideline says only to consider referral to neurosurgery. Neither sets a time limit.",
    "EANO-ESMO 2021 gives no starting dose of dexamethasone and says it does not aim to describe supportive care comprehensively; the only doses on this page come from the Scottish guideline (not graded) and CNS 2019 (Level 3).",
    "The steroid evidence is thin: the CNS systematic review found two eligible studies, and its recommendations are Level 3.",
    "No source read says how quickly a person at home should be seen. The Scottish guideline files raised intracranial pressure under palliative emergencies and calls the scan urgent, which is why this page says to contact the cancer team urgently.",
    "Whether to withhold dexamethasone before a biopsy when lymphoma of the brain is possible is not addressed by any source read here; EANO-ESMO 2021 excludes brain lymphoma from its scope.",
  ],
  drugs: ["dexamethasone", "ondansetron"],
  technologies: ["ct", "mri", "palliative-radiotherapy"],
  cancers: ["secondary-brain-tumours", "brain-tumours", "glioblastoma"],
  institutions: ["nice"],
  terms: ["brain-metastases", "stereotactic-radiosurgery", "wbrt"],
  related: ["metastatic-spinal-cord-compression-emergency", "acute-oncology-telephone-triage"],
  tags: ["protocol", "acute-oncology", "oncological-emergency"],
});

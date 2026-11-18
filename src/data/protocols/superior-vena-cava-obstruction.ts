import { protocol } from "./helpers";

/*
 * Malignant superior vena cava obstruction (SVCO): recognition, imaging, urgent referral, treatment of the cancer,
 * stenting and supportive care.
 *
 * What was read, and how (first on 11 November 2026; every source fetched again raw with curl and read as text on
 * 16 November 2026, in a second accuracy pass that checked each claim against the saved text):
 * - Scottish Palliative Care Guidelines, "Superior vena cava obstruction" (NHS Scotland, Right Decisions platform):
 *   the web page in full. It carries no publication or review date; its references are SIGN 137 (2014) and an ABC of
 *   Palliative Care article (1997).
 * - NICE NG122 (lung cancer, 2019, last updated March 2024): the palliative interventions chapter in full; its two SVCO
 *   recommendations date from 2005. The overview page was read for the update history.
 * - SIGN 137 (management of lung cancer, February 2014): not read on 11 November; on 16 November the PDF was fetched
 *   from sign.ac.uk and section 10.3 read with pdftotext. The grade symbols beside the two recommendations do not
 *   all survive text extraction, so the page was also rendered and read as an image: grade B and a good practice point.
 *   The tick glyph sits between "In" and "patients" in the extracted text, so the second quote starts at "patients".
 * - Rowell and Gleeson 2002 systematic review (Clinical Oncology): abstract from Europe PMC. Its Cochrane version
 *   (CD001316) is withdrawn (withdrawal notice of 2015 in Europe PMC).
 * - Sen, Gloviczki et al. 2026 review of contemporary management (Journal of Vascular Surgery: Venous and Lymphatic
 *   Disorders): open access, full text from Europe PMC (PMC13098589).
 * - Annals of Palliative Medicine 2024 review of malignant SVC syndrome: abstract only on 11 November; on 16 November
 *   the full text was read from the journal's own open-access page.
 * Every DOI was resolved through Crossref and its title checked. Quotes checked by script against the raw text.
 * The patient safety-net step (which symptoms to report, and how fast) was restored from Macmillan Cancer Support's
 * page on superior vena cava obstruction on 17 November 2026: the page was fetched raw with curl, read as text, and
 * the quote checked by script. Cancer Research UK's page on radiotherapy for SVCO was read the same day; it says SVCO
 * needs urgent treatment and does not say when a patient should seek help.
 */
export const superiorVenaCavaObstruction = protocol({
  id: "svc-obstruction",
  name: "Superior vena cava obstruction in cancer: recognition, imaging, stenting and treatment of the cause",
  aka: ["SVCO", "SVC syndrome", "superior vena cava syndrome", "malignant SVC obstruction", "SVC stent"],
  domain: "emergencies",
  tldr: "A cancer in the chest, most often lung cancer or lymphoma, can squeeze the large vein that brings blood back from the head and arms. The face, neck and arms swell, and breathing can become difficult: contact your cancer doctor or nurse straight away. A scan confirms it; a small metal tube (stent) in the vein can relieve symptoms quickly, and chemotherapy or radiotherapy treats the cancer.",
  simple: "If your face, neck or arms swell or you become breathless, and you have a cancer in your chest, contact your cancer doctor or nurse straight away.",
  summary: "Malignant SVCO is caused by external compression, thrombosis or direct invasion of the superior vena cava; lung cancer accounts for 65 to 80%, lymphoma for 2 to 10% (Scottish Palliative Care Guidelines). It may be the first presentation of the cancer. Symptoms are those of venous hypertension: breathlessness, headache worse on stooping, swelling of the face, neck and arms, visual change and dizziness; signs include non-pulsatile dilated neck veins, collateral veins on the arms and chest wall, stridor and, late, papilloedema. The diagnosis is often clinical; a chest X-ray and CT scan may confirm it, and CT venography and MR venography are the primary imaging studies (Sen 2026).\n\nNICE NG122 (2005 recommendations, still current) offers chemotherapy and radiotherapy according to stage and performance status, and considers a stent for immediate relief of severe symptoms or after failure of earlier treatment. SIGN 137 (2014) recommends chemotherapy or radiotherapy as initial treatment in small-cell lung cancer, with a stent for relapse or persistent obstruction (grade B), and says a stent may be considered as primary treatment in non-small-cell lung cancer (good practice point). The Scottish palliative guideline adds loosening clothing and supporting the arms, urgent discussion with oncology, radiotherapy or respiratory medicine, chemotherapy and radiotherapy for small-cell lung cancer, consideration of referral for stenting, thrombectomy, thrombolysis and anticoagulation, and consideration of dexamethasone 16 mg then 8 mg twice daily, noting that steroids may help despite the absence of evidence. A systematic review (Rowell and Gleeson 2002) found chemotherapy and/or radiotherapy relieved SVCO in 77% with small-cell and 60% with non-small-cell lung cancer, and a stent in 95%, possibly more rapidly; the effectiveness of steroids and the best timing of a stent were uncertain. A 2026 vascular review calls stenting first-line for symptomatic SVC syndrome of any cause (pooled clinical success 96.8% in 2249 patients; fatal complications 1 to 2%). The Annals of Palliative Medicine 2024 review says direct opening of the vein should be considered when urgent relief is needed, as in acute central airway obstruction, severe laryngeal oedema or coma from cerebral oedema; otherwise it asks for a full diagnostic work-up and staging, which decide whether treatment is curative or palliative, and for steroids to wait until the diagnosis has been confirmed by pathology.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "radiographer", "emergency-team", "patient-or-carer"],
    where: ["emergency-department", "acute-oncology-service", "ward", "radiotherapy-department", "home", "telephone-triage"],
  },
  population: "Adults with a known or suspected cancer in the chest (lung cancer, lymphoma, other mediastinal or metastatic disease) who develop obstruction of the superior vena cava. The NICE and SIGN recommendations and the 2002 systematic review are about lung cancer only. Benign causes (central venous catheters, pacemaker leads) are noted only where the sources compare them. Children are not covered.",
  trigger: "Swelling of the face, neck or arms, breathlessness, headache worse on bending, or dilated neck and chest wall veins in a person with cancer in the chest, or as a first presentation of cancer.",
  steps: [
    {
      action: "Tell the person and their carers to contact their cancer doctor or nurse straight away if they have breathlessness, headaches or a feeling of fullness in the head that gets worse on leaning forward or bending over, swelling of the face with a change in skin colour, changes in eyesight, a swollen neck, swollen arms and hands, visible swollen veins on the chest, or dizziness",
      why: "Macmillan lists these as the most common symptoms and says SVCO needs to be treated quickly. Symptoms can develop over a few days or over a few weeks.",
      source: "macmillan-svco",
      quote: "If you have any of these symptoms it is important to contact your cancer doctor or nurse straight away. SVCO needs to be treated quickly.",
    },
    {
      action: "Recognise the symptoms of venous congestion: breathlessness, swelling of the face, neck and arms, headache worse on stooping, visual change and dizziness",
      why: "The blocked vein raises pressure in the veins of the head, neck and arms; this can be the first sign of a cancer.",
      source: "scot-pcg-svco",
      quote: "This condition may be the first presentation of malignancy or can occur in those with known malignancy.",
    },
    {
      action: "Confirm the diagnosis with imaging: CT venography or MR venography shows how far the blockage extends",
      why: "The diagnosis is often made from the symptoms and signs; the scan confirms it, shows its extent and informs treatment.",
      source: "sen-2026",
      quote: "Central vein obstruction can be suspected based on Duplex ultrasound of the neck and arm veins, but computed tomography venography (CTV) (Fig 1) and/or magnetic resonance venography are the primary imaging studies to diagnose and ascertain the extent of the central venous obstruction.",
    },
    {
      action: "Loosen tight clothing and support the upper arms on pillows",
      why: "These are simple comfort measures while treatment is arranged.",
      source: "scot-pcg-svco",
      quote: "Ensure restricting clothing is loosened and upper arms are supported on pillows.",
    },
    {
      action: "Discuss with, or refer urgently to, oncology, clinical oncology (radiotherapy) or respiratory medicine",
      why: "The right treatment depends on the cause of the blockage, how severe the symptoms are and the person's outlook.",
      source: "scot-pcg-svco",
      quote: "Discuss with or refer urgently to oncologist, radiotherapist, respiratory physician as appropriate.",
    },
    {
      action: "Where the cause has not yet been confirmed by biopsy, hold steroids until it has",
      why: "Steroids started before a biopsy can make the sample harder to read, especially in lymphoma and other blood cancers.",
      source: "apm-2024",
      quote: "Some clinicians may favor use of diuretics and/or corticosteroids for patients who are symptomatic and uncomfortable; this should be administered after pathologic confirmation of the etiology of SVC syndrome, as steroid initiation can reduce the diagnostic sensitivity of a biopsy, especially for cases induced by hematologic malignancies.",
    },
    {
      action: "Complete the staging work-up before deciding whether treatment aims to cure or to relieve symptoms",
      why: "The stage decides whether cure is possible, and the type of cancer decides between chemotherapy, radiotherapy or both.",
      source: "apm-2024",
      quote: "When evaluating patients, a complete staging workup is recommended, as it will determine whether treatment should be definitive/curative or palliative in intent.",
    },
    {
      action: "Offer chemotherapy and radiotherapy according to the stage of the cancer and the person's performance status",
      why: "Treating the cancer relieved the obstruction in 60 to 77% of people with lung cancer in the 2002 systematic review.",
      source: "nice-ng122",
      quote: "For people who present with superior vena cava obstruction, offer chemotherapy and radiotherapy based on the stage of disease and performance status. [2005]",
    },
    {
      action: "Consider a stent for immediate relief of severe symptoms, or when earlier treatment has failed",
      why: "A stent may relieve symptoms in more people, and sooner, than chemotherapy or radiotherapy.",
      source: "nice-ng122",
      quote: "Consider stent insertion for the immediate relief of severe symptoms of superior vena caval obstruction or following failure of earlier treatment. [2005]",
    },
    {
      action: "Consider opening the vein directly with a stent and angioplasty, with thrombolysis, when urgent relief is needed, as in acute central airway obstruction, severe laryngeal oedema or coma from brain swelling",
      why: "This can relieve symptoms immediately, before treatment of the cancer itself begins.",
      source: "apm-2024",
      quote: "If the patient requires urgent treatment of venous obstruction, such as in the cases of acute central airway obstruction, severe laryngeal edema and/or coma from cerebral edema, direct opening of the occlusion by endovascular stenting and angioplasty with thrombolysis should be considered.",
    },
    {
      action: "If dexamethasone is tried, stop it promptly if there is no benefit, and reduce it gradually in those it helps",
      why: "The guideline says steroids may help although there is no evidence to support their use; the 2002 review found their effectiveness uncertain.",
      source: "scot-pcg-svco",
      quote: "Steroids may be helpful despite the absence of evidence to support their use.",
    },
    {
      action: "Offer benzodiazepines, opioids, oxygen and supportive care to everyone, alongside the other measures",
      why: "These are offered for comfort whatever else is done.",
      source: "scot-pcg-svco",
      quote: "Offer benzodiazepines, opioids, oxygen and supportive care to all patients in addition to the above measures.",
    },
  ],
  bestInClass: {
    statement: "No current graded guideline on malignant SVCO was found. Two national lung cancer guidelines address it, and neither is recent on this point. NICE NG122 has two ungraded 2005 recommendations: chemotherapy and radiotherapy by stage and performance status, and a stent considered for immediate relief of severe symptoms or after earlier treatment fails. SIGN 137 (February 2014; SIGN's own page says some of its recommendations may be out of date) recommends chemotherapy or radiotherapy as initial treatment in small-cell lung cancer, with a stent for relapse or persistent obstruction (grade B), and says a stent may be considered as primary treatment in non-small-cell lung cancer (good practice point). SIGN rests on the 2002 systematic review, which found stents relieved SVCO in 95% (against 60 to 77% with chemotherapy or radiotherapy) and possibly more rapidly. A 2026 vascular surgery review of literature to April 2025 goes further and calls stenting first-line for symptomatic SVC syndrome of any cause, with covered stents probably safer. So the positions differ on when to stent: NICE considers it for severe symptoms or failure of other treatment; SIGN allows it first in non-small-cell lung cancer and after relapse in small-cell; the Scottish palliative guideline says to consider referral if the patient's condition permits, with no threshold; the vascular review puts it first for anyone symptomatic. The Annals of Palliative Medicine 2024 review considers direct stenting where urgent relief is needed and otherwise asks for a full diagnostic work-up and staging before cancer treatment. On steroids, the Scottish guideline says they may help despite the absence of evidence, SIGN says their role is unclear, the 2002 review found their effectiveness uncertain, and the Annals review says they should wait for pathological confirmation of the cause.",
    sources: ["nice-ng122", "sign-137", "rowell-2002", "sen-2026", "scot-pcg-svco", "apm-2024"],
  },
  variants: [
    {
      name: "Stent first for all symptomatic SVC obstruction",
      differs: "Puts balloon angioplasty and immediate stenting first for every symptomatic patient, whatever the cause, rather than reserving it for severe symptoms or failure of other treatment.",
      evidence: "Sen 2026 review: pooled clinical success 96.8% and 1-year patency over 90% in a meta-analysis of 2249 patients (benign and malignant); total complications about 9%, fatal 1 to 2%, rupture with tamponade the most severe.",
      sources: ["sen-2026"],
    },
    {
      name: "Treatment by cell type in lung cancer (SIGN 137)",
      differs: "Chemotherapy or radiotherapy first in small-cell lung cancer, with a stent for relapse or persistent obstruction; a stent may be considered as primary treatment in non-small-cell lung cancer.",
      evidence: "Grade B for the small-cell recommendation and a good practice point for the non-small-cell one, both resting on the 2002 systematic review, which SIGN rates as evidence level 1+. SIGN 137 dates from February 2014.",
      sources: ["sign-137", "rowell-2002"],
    },
    {
      name: "Dexamethasone 16 mg, then 8 mg twice daily (Scottish Palliative Care Guidelines)",
      differs: "Considers dexamethasone 16 mg by mouth or injection immediately and 8 mg twice daily by mouth the next day, with the second dose before 2 pm if possible, stopped promptly if there is no benefit and reduced gradually in those who respond.",
      evidence: "No evidence of benefit: the guideline says so itself, and the 2002 systematic review found the effectiveness of steroids uncertain. The Annals of Palliative Medicine 2024 review says steroids should be given after pathological confirmation of the cause, because they can reduce the diagnostic sensitivity of a biopsy.",
      sources: ["scot-pcg-svco", "rowell-2002", "apm-2024"],
    },
  ],
  grades: [
    { claim: "Chemotherapy and radiotherapy based on stage and performance status", grade: "not graded (NICE; dated 2005)", source: "nice-ng122" },
    { claim: "Stent for immediate relief of severe symptoms or after failure of earlier treatment", grade: "not graded (NICE; dated 2005)", source: "nice-ng122" },
    { claim: "Small-cell lung cancer: chemotherapy or radiotherapy first, stent for relapse or persistent obstruction", grade: "B", source: "sign-137", quote: "In patients with superior vena cava obstruction due to SCLC, SACT/radiotherapy is recommended as initial treatment, but stenting may be considered for relapse or persistent superior vena cava obstruction." },
    { claim: "Non-small-cell lung cancer: stent as primary treatment", grade: "good practice point", source: "sign-137", quote: "patients with superior vena cava obstruction due to NSCLC, stenting may be considered as a primary treatment." },
    { claim: "Relief rates by treatment", grade: "systematic review (2 randomised and 44 non-randomised studies)", source: "rowell-2002", quote: "Insertion of an SVC stent relieved SVCO in 95%; 11% of those treated had further SVCO but recanalization was possible in the majority resulting in a long-term patency rate of 92%." },
  ],
  sources: [
    { key: "scot-pcg-svco", label: "Scottish Palliative Care Guidelines: Superior vena cava obstruction", publisher: "NHS Scotland, Scottish Palliative Care Guidelines (Right Decisions platform)", year: 2026, url: "https://www.palliativecareguidelines.scot.nhs.uk/scottish-palliative-care-guidelines/palliative-emergencies/superior-vena-cava-obstruction/", gradingScheme: "National consensus palliative care guidance; not graded. The page carries no publication or review date: the year given is the year it was read.", read: "full-text", accessed: "2026-11-16" },
    { key: "nice-ng122", label: "Lung cancer: diagnosis and management (NG122), palliative interventions and supportive and palliative care", publisher: "NICE", year: 2019, url: "https://www.nice.org.uk/guidance/ng122/chapter/Palliative-interventions-and-supportive-and-palliative-care", gradingScheme: "NICE does not grade recommendations; strength is in the wording ('offer', 'consider'). Each recommendation is dated by the year it was written. Published March 2019, last updated March 2024.", read: "full-text", accessed: "2026-11-16" },
    { key: "sign-137", label: "SIGN 137: Management of lung cancer, section 10.3, management of superior vena cava obstruction", publisher: "Scottish Intercollegiate Guidelines Network (SIGN)", year: 2014, url: "https://www.sign.ac.uk/media/1075/sign137.pdf", gradingScheme: "Recommendations are graded A to D by the strength of the evidence behind them (B: a body of evidence including studies rated 2++, or extrapolated from studies rated 1++ or 1+). A good practice point, shown as a tick, is recommended best practice based on the clinical experience of the guideline development group. Issued February 2014; SIGN's page says some recommendations may be out of date.", read: "full-text", accessed: "2026-11-16" },
    { key: "rowell-2002", label: "Steroids, radiotherapy, chemotherapy and stents for superior vena caval obstruction in carcinoma of the bronchus: a systematic review", publisher: "Clinical Oncology (Royal College of Radiologists)", year: 2002, url: "https://europepmc.org/abstract/MED/12555872", doi: "10.1053/clon.2002.0095", read: "abstract", accessed: "2026-11-16" },
    { key: "sen-2026", label: "Contemporary management of superior vena cava syndrome", publisher: "Journal of Vascular Surgery: Venous and Lymphatic Disorders", year: 2026, url: "https://europepmc.org/article/PMC/PMC13098589", doi: "10.1016/j.jvsv.2026.102491", gradingScheme: "A narrative review with a systematic literature search (January 1990 to April 2025); not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "macmillan-svco", label: "Superior vena cava obstruction (SVCO)", publisher: "Macmillan Cancer Support", year: 2025, url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/superior-vena-cava-obstruction", gradingScheme: "Patient information; not graded. Reviewed 31 January 2025, next review 31 January 2028.", read: "full-text", accessed: "2026-11-17" },
    { key: "apm-2024", label: "Management of malignant superior vena cava syndrome", publisher: "Annals of Palliative Medicine", year: 2024, url: "https://apm.amegroups.org/article/view/123283/html", doi: "10.21037/apm-23-573", gradingScheme: "A review article; not graded.", read: "full-text", accessed: "2026-11-16" },
  ],
  upgrades: [],
  gaps: [
    "No current graded guideline on malignant SVCO was found. NICE's recommendations date from 2005 and are not graded; SIGN 137 is graded but dates from February 2014, and SIGN's own page says some of its recommendations may be out of date; the Cochrane review of steroids, radiotherapy, chemotherapy and stents (CD001316) has been withdrawn. All three are about lung cancer, so no guideline read covers SVCO from lymphoma or other cancers.",
    "Whether to stent at diagnosis or only after cancer treatment fails is unsettled: the 2002 systematic review called the optimal timing uncertain, and no randomised trial of stent first against chemotherapy or radiotherapy first was found. The Annals of Palliative Medicine review cites a randomised trial of stent placement (Takeuchi and colleagues, Supportive Care in Cancer 2019); it was not read here.",
    "Anticoagulation after a stent for malignant SVCO varies between centres, and no guideline read sets a regimen: SIGN 137 says it is unclear whether it prevents stent thrombosis, and the 2026 vascular review says practice depends on the cause, the stent and the operator. A 2025 single-centre series of 49 patients (Current Oncology, doi 10.3390/curroncol32110601), read in full from Europe PMC on 16 November 2026, says guidelines lack specific drug recommendations.",
    "The sources pull in different directions on steroids. The Scottish guideline suggests considering dexamethasone immediately; the Annals of Palliative Medicine review says steroids should wait for pathological confirmation of the cause, because they can reduce the diagnostic sensitivity of a biopsy, especially in blood cancers. No source read reconciles the two for a person whose cancer has not yet been diagnosed.",
    "No source read sets a time limit for assessment in hours. The Scottish guideline says to refer urgently. Macmillan's patient page, read on 17 November 2026, tells people with symptoms to contact their cancer doctor or nurse straight away; it does not say when to go to an emergency department or call an ambulance instead, and neither does Cancer Research UK's page on radiotherapy for SVCO, read the same day.",
    "The Scottish Palliative Care Guidelines page carries no publication or review date. The 2002 systematic review was read as an abstract only; its full text is not open.",
  ],
  drugs: ["dexamethasone"],
  technologies: ["ct", "palliative-radiotherapy"],
  cancers: ["nsclc", "sclc", "non-hodgkin-lymphoma"],
  institutions: ["nice"],
  terms: ["superior-vena-cava-obstruction"],
  related: ["metastatic-spinal-cord-compression-emergency"],
  tags: ["protocol", "acute-oncology", "oncological-emergency"],
});

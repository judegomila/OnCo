import { protocol } from "./helpers";

/*
 * The thermoplastic immobilisation mask for head and neck (and brain) radiotherapy: making it, wearing it, and mask
 * anxiety.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - ESTRO ACROP guidelines for positioning, immobilisation and position verification of head and neck patients for
 *   radiation therapists (Leech et al., Tech Innov Patient Support Radiat Oncol 2017): full text, Europe PMC XML
 *   (PMC7033761). It is the only international guideline found on head and neck immobilisation; it grades nothing and
 *   rests on a literature review, a European survey and the writing committee's experience. No newer edition was found.
 * - Nixon et al., prevalence and experience of mask anxiety (J Med Radiat Sci 2018, PMC6275267): full text.
 * - Nixon et al., prospective examination of mask anxiety (J Med Radiat Sci 2019, PMC6745384): full text.
 * - Radiotherapy Mask Anxiety Questionnaire (R-MAQ) validation (Psycho-Oncology 2025, PMC12719024): full text.
 * - Music therapy and relaxation-visualisation randomised trial (Support Care Cancer 2025, DOI
 *   10.1007/s00520-025-09901-z): abstract, Europe PMC.
 * - OPEN phase 3 randomised trial of open versus closed masks (Radiother Oncol 2026, DOI 10.1016/j.radonc.2026.111779):
 *   abstract, Europe PMC; and its MethodsX workflow paper (2026, PMC13675897): full text.
 * - Li et al., migration to an open-face mask (J Appl Clin Med Phys 2013, PMC5714571): full text.
 * - NCI, Radiation Therapy and You (April 2021): full text, PDF from cancer.gov.
 *
 * No society guideline on preventing or managing mask anxiety was found; the census row recorded the same gap. Every
 * DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks joined.
 */
export const headAndNeckRadiotherapyImmobilisationMask = protocol({
  id: "head-and-neck-radiotherapy-immobilisation-mask",
  name: "Immobilisation mask for head and neck and brain radiotherapy, including mask anxiety",
  aka: ["radiotherapy mask", "thermoplastic mask", "shell", "head and neck mask", "mask anxiety", "claustrophobia during radiotherapy", "mould room", "open-face mask", "five-point mask"],
  domain: "radiotherapy",
  tldr: "For radiotherapy to the head or neck you wear a close-fitting plastic mesh mask, moulded to your face while it is warm and clipped to the table, so you are in exactly the same place every day. About a quarter of people feel anxious in the mask. Tell the team early: they can explain each step, give breaks, let you play music, and in some departments use a mask with the face left open.",
  simple: "A warm plastic mesh is shaped over your face and goes hard as it cools. It holds your head still during treatment. You can still breathe and signal to the team. If it makes you anxious, say so: there are ways to help.",
  summary: "The ESTRO ACROP guideline (2017) sets out the radiation therapist's procedure: a full explanation beforehand, including the mask's temperature and how to signal for help; removal of dentures, hearing aids and piercings in the field; a straight, comfortable and reproducible position with every device indexed to the couch; any mouth bite or stent in place before moulding; a mask of three or more fixation points (five points when the low neck is treated, or a shoulder retractor with a three-point mask); a check of the material's temperature before it touches the skin; moulding within one to two minutes and hardening for five to fifteen; reassurance during hardening; removal and refitting before the CT scan; and labelling of the mask. It advises against cutting out the mask except for a bite block or tracheostomy.\n\nMask anxiety affected 26% of 100 consecutive patients in one Australian cohort and 27.3% of 410 in a validation study of a four-item screen (R-MAQ); in a prospective cohort it fell during treatment in 72% of those affected. Both Australian studies recommend routine screening, which no guideline yet requires. One randomised trial (216 patients, India, 2025) found music with guided relaxation in the first five sessions lowered mask anxiety. The OPEN phase 3 trial (230 non-claustrophobic patients, 2026) found open-face masks with surface-guided radiotherapy as accurate as a closed five-point mask and better tolerated, which departs from the ESTRO advice against cutting the mask; claustrophobic patients were excluded.",
  asOf: "2026-11-11",
  setting: {
    who: ["radiographer", "patient-or-carer"],
    where: ["radiotherapy-department"],
  },
  population: "Adults having external beam radiotherapy to the head and neck, or to the brain, with a thermoplastic mask. The procedure steps are written for head and neck cancer; brain radiotherapy uses the same masks without the shoulder section. Children usually need play specialist preparation or anaesthesia, which the sources read do not address. Stereotactic radiosurgery frames are covered in the stereotactic protocol.",
  trigger: "The mould-room or planning CT appointment at which the mask is made, and every treatment session after it.",
  steps: [
    {
      action: "Before making the mask, give the patient a full explanation of the procedure",
      why: "Knowing what will happen, and what it will feel like, makes the appointment less frightening.",
      source: "estro-acrop-hn-2017",
      quote: "A full and detailed explanation of the procedure should be given to the patient by an RTT.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Explain that the mask will feel warm, stress keeping still and breathing normally, and agree how the patient will signal if they are in difficulty",
      why: "Being able to stop things at any moment gives back a sense of control.",
      source: "estro-acrop-hn-2017",
      quote: "Other aspects related to both the safety and efficacy of the procedure should be discussed with the patient including the likely mask temperature, and how the patient can alert the RTTs if they are having difficulty during the procedure.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Ask about anxiety in the mask early, using a screening question or tool, and plan support for those who screen positive",
      why: "About one person in four finds the mask distressing, and staff do not always notice.",
      source: "nixon-2019",
      quote: "Due to its high prevalence and variable patterns over time, it is recommended that routine screening for mask anxiety be implemented as standard care throughout the course of RT for HNC.",
      grade: "Recommendation of a prospective cohort study (35 patients); not a guideline",
    },
    {
      action: "Remove dentures, hearing aids, earrings and piercings in the treated area before moulding",
      why: "Anything worn when the mask is made must be the same every day, and metal can disturb the scan and the dose.",
      source: "estro-acrop-hn-2017",
      quote: "Any dentures, hearing aids, toupees, earrings and all kinds of piercings in the treated area including tongue piercings must also be removed.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Position the patient straight and comfortably, with the neck rest and every support indexed to the couch, and any mouth bite or stent in place before the mask is made",
      why: "The mask can only hold a position that can be repeated exactly each day.",
      source: "estro-acrop-hn-2017",
      quote: "All immobilisation devices must be indexed and fixed to the couch, to minimise rotational and translational errors.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Choose a mask with three or more fixation points, a five-point mask when the low neck is treated, or a shoulder retractor with a three-point mask",
      why: "The lower neck and shoulders move unless they are held too.",
      source: "estro-acrop-hn-2017",
      quote: "If treating the low neck, a 5-point mask is recommended. If a 3-point mask is used, a device to maintain shoulder position, such as a retractor, is mandatory.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Keep the airway clear, enlarging the nose and mouth openings if needed and leaving a gap over a tracheostomy",
      why: "The patient must be able to breathe freely throughout.",
      source: "estro-acrop-hn-2017",
      quote: "It may be necessary to cover the hair with cotton-type material and to ensure that the patient’s airway is not compromised during the procedure.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Check the temperature of the softened material before it touches the skin",
      why: "The plastic is softened in hot water or an oven and could burn if applied too hot.",
      source: "estro-acrop-hn-2017",
      quote: "The temperature of the material must be checked before placing on the patient’s skin to avoid burns.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Support and reassure the patient while the mask hardens, encouraging slow abdominal breathing",
      why: "The mask takes several minutes to set, and calm breathing helps people relax.",
      source: "estro-acrop-hn-2017",
      quote: "The patient should be supported and reassured by the RTTs during this time period. Motivating and supporting patients to use abdominal breathing will help them to relax during the whole procedure.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Remove and refit the mask before the planning CT to check the fit, giving the patient a short break",
      why: "A mask that fits at the scan will fit at treatment, and the break helps.",
      source: "estro-acrop-hn-2017",
      quote: "It is recommended that the mask be removed and refitted prior to commencement of CT scanning to ensure that the fit is correct and that the immobilisation provided by the mask is adequate.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Label the mask with the patient's name and the neck rest and wedges used, and record the position in the chart",
      why: "Each mask belongs to one person and must be used with the same supports every day.",
      source: "estro-acrop-hn-2017",
      quote: "For safety reasons, the patient name, type of neck rest and wedges used should always be documented on the patient mask, preferably using a method that can identify the mask in the oncology information system.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "For people with mask anxiety, offer music and guided relaxation during the first sessions, alongside the team's explanation and breaks",
      why: "In one randomised trial, music with guided relaxation lowered anxiety in the mask within five sessions.",
      source: "music-rct-2025",
      quote: "At the end of five RT sessions, the intervention group showed a statistically significant reduction in mask anxiety scores [median (IQR): 2 (2)] compared to the control group [median (IQR): 6 (1)], with p < 0.001.",
      grade: "Single randomised trial (216 patients)",
    },
  ],
  bestInClass: {
    statement: "Make the mask by the ESTRO ACROP procedure (2017): explanation and an agreed signal, a straight reproducible position with every device indexed, any bite block in place first, three or more fixation points and five for the low neck, a temperature check before the material touches the skin, reassurance while it sets, and a refit before the CT. Screen for mask anxiety early (recommended by the Australian cohort studies and supported by a validated four-item screen, R-MAQ, though no guideline yet requires it) and offer support, including music with guided relaxation (one randomised trial). Where surface-guided radiotherapy is available, an open-face mask is as accurate as a closed five-point mask and better tolerated (OPEN phase 3 randomised trial, 2026); this departs from ESTRO's 2017 advice against cutting out the mask, written before such trials existed.",
    sources: ["estro-acrop-hn-2017", "nixon-2018", "nixon-2019", "rmaq-2025", "music-rct-2025", "open-rct-2026"],
  },
  variants: [
    {
      name: "Open-face mask with surface-guided radiotherapy",
      differs: "The mask leaves the eyes, nose and mouth uncovered and a surface camera tracks the exposed face, neck and upper chest from set-up through treatment. ESTRO ACROP (2017) advises against cutting out the mask except for a bite block or tracheostomy.",
      evidence: "OPEN phase 3 trial: 230 non-claustrophobic patients randomised to a closed five-point mask or an open three- or five-point mask with surface guidance; set-up accuracy equivalent (larger longitudinal shifts with the closed mask, P < 0.001) and tolerability, experience and distress better with both open masks (p < 0.01). An earlier open-face mask study treated five claustrophobic patients who could only tolerate the open mask.",
      sources: ["open-rct-2026", "open-methods-2026", "li-2013", "estro-acrop-hn-2017"],
    },
    {
      name: "Routine screening with a validated tool (R-MAQ)",
      differs: "A four-item questionnaire given before planning identifies people at risk of an anxious response to the mask, rather than relying on staff noticing or a single distress question.",
      evidence: "Validation in 410 patients: area under the ROC curve 0.78, with 27.3% showing an anxious response at planning; comparable or better than a general claustrophobia questionnaire. No trial yet shows that screening changes outcomes.",
      sources: ["rmaq-2025"],
    },
  ],
  grades: [
    { claim: "A quarter of patients report mask anxiety", grade: "Mixed-methods cohort (100 patients)", source: "nixon-2018", quote: "In phase one, 26% of participants self‐identified as being anxious about the use of a thermoplastic mask." },
    { claim: "Mask anxiety usually eases during treatment", grade: "Prospective cohort (35 patients)", source: "nixon-2019", quote: "In 72% of participants, the level of initial distress was found to reduce over time." },
    { claim: "Open masks with surface guidance give equivalent accuracy and a better experience", grade: "Phase 3 randomised trial (230 patients)", source: "open-rct-2026", quote: "At treatment completion patient experience metrics, including tolerability, overall experience and distress, were significantly more favourable for both open-mask cohorts compared to closed masks (p < 0.01)." },
    { claim: "A brief screen predicts an anxious response at planning", grade: "Validation study (410 patients)", source: "rmaq-2025", quote: "Of the 410 participants (mean age 62), 27.3% presented an anxious response to the immobilization mask during planning exams." },
  ],
  sources: [
    {
      key: "estro-acrop-hn-2017",
      label: "ESTRO ACROP guidelines for positioning, immobilisation and position verification of head and neck patients for radiation therapists",
      publisher: "ESTRO ACROP (Leech et al., Technical Innovations and Patient Support in Radiation Oncology)",
      year: 2017,
      url: "https://doi.org/10.1016/j.tipsro.2016.12.001",
      doi: "10.1016/j.tipsro.2016.12.001",
      gradingScheme: "Guidance based on a literature review, a European survey and committee experience; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nixon-2018",
      label: "Exploring the prevalence and experience of mask anxiety for the person with head and neck cancer undergoing radiotherapy",
      publisher: "Journal of Medical Radiation Sciences (Nixon et al.)",
      year: 2018,
      url: "https://doi.org/10.1002/jmrs.308",
      doi: "10.1002/jmrs.308",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nixon-2019",
      label: "A prospective examination of mask anxiety during radiotherapy for head and neck cancer and patient perceptions of management strategies",
      publisher: "Journal of Medical Radiation Sciences (Nixon et al.)",
      year: 2019,
      url: "https://doi.org/10.1002/jmrs.346",
      doi: "10.1002/jmrs.346",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "rmaq-2025",
      label: "Development and Validation of a Rapid Screening Measure for Mask Anxiety in Head and Neck Cancer Patients Undergoing Radiotherapy",
      publisher: "Psycho-Oncology",
      year: 2025,
      url: "https://doi.org/10.1002/pon.70369",
      doi: "10.1002/pon.70369",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "music-rct-2025",
      label: "Effect of music therapy and relaxation visualization intervention on mask anxiety in head and neck cancer patients undergoing radiotherapy: a randomized controlled trial",
      publisher: "Supportive Care in Cancer",
      year: 2025,
      url: "https://doi.org/10.1007/s00520-025-09901-z",
      doi: "10.1007/s00520-025-09901-z",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "open-rct-2026",
      label: "OPEN: optimising patient experience in head and neck radiotherapy, a phase 3 randomised control trial comparing open versus closed face masks",
      publisher: "Radiotherapy and Oncology (Nicholson et al.)",
      year: 2026,
      url: "https://doi.org/10.1016/j.radonc.2026.111779",
      doi: "10.1016/j.radonc.2026.111779",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "open-methods-2026",
      label: "Surface-guided radiotherapy setup using an open-face mask for head and neck cancer; the OPEN trial approach",
      publisher: "MethodsX",
      year: 2026,
      url: "https://doi.org/10.1016/j.mex.2026.104186",
      doi: "10.1016/j.mex.2026.104186",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "li-2013",
      label: "Migration from full-head mask to \"open-face\" mask for immobilization of patients with head and neck cancer",
      publisher: "Journal of Applied Clinical Medical Physics (Li et al.)",
      year: 2013,
      url: "https://doi.org/10.1120/jacmp.v14i5.4400",
      doi: "10.1120/jacmp.v14i5.4400",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nci-rt-and-you",
      label: "Radiation Therapy and You: Support for People With Cancer (April 2021)",
      publisher: "US National Cancer Institute",
      year: 2021,
      url: "https://www.cancer.gov/publications/patient-education/radiation-therapy-and-you",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["surface-guided-radiotherapy", "patient-positioning-surface-guidance-systems", "imrt-igrt", "music-therapy-cancer", "relaxation-guided-imagery"],
  cancers: ["head-and-neck"],
  terms: ["radiotherapy"],
  related: ["radiotherapy-patient-identification-and-time-out", "head-and-neck-radiotherapy-oral-mucositis", "head-and-neck-radiotherapy-dental-assessment-osteoradionecrosis"],
  upgrades: ["idea-pu-open-face-masks", "idea-pu-mask-anxiety-screening"],
  gaps: [
    "No society guideline on preventing or managing mask anxiety was found. The screening recommendation comes from the authors of two Australian cohort studies, and the only randomised trial of a calming intervention found is a single-centre trial from India read as an abstract.",
    "The ESTRO ACROP guideline dates from 2017 and grades nothing; it predates the open-mask trials and advises against cutting out the mask.",
    "The OPEN trial excluded claustrophobic patients, so whether open masks let people who cannot tolerate a closed mask complete treatment is not tested in it; it was read as an abstract.",
    "Medication for mask anxiety (for example a short-acting anxiolytic before sessions) is reported by patients in the cohort studies, but no source read gives a recommendation on it.",
    "Preparation of children (play, desensitisation, anaesthesia) was not examined.",
  ],
});

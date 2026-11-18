import { protocol } from "./helpers";

/*
 * The thermoplastic immobilisation mask for head and neck (and brain) radiotherapy: making it, wearing it, and mask
 * anxiety.
 *
 * What was read, and how (first on 11 November 2026; every source re-read on 17 November 2026 in the second accuracy
 * pass, fetched raw and read as text, each quote checked by script with only whitespace normalised):
 * - ESTRO ACROP guidelines for positioning, immobilisation and position verification of head and neck patients for
 *   radiation therapists (Leech et al., Tech Innov Patient Support Radiat Oncol 2017): full text, Europe PMC XML
 *   (PMC7033761). It is the only international guideline found on head and neck immobilisation; it grades nothing and
 *   rests on a literature review, a European survey and the writing committee's experience. Crossref lists no update,
 *   and a Europe PMC title search on 17 November 2026 found no newer edition.
 * - Nixon et al., prevalence and experience of mask anxiety (J Med Radiat Sci 2018, PMC6275267): full text.
 * - Nixon et al., prospective examination of mask anxiety (J Med Radiat Sci 2019, PMC6745384): full text.
 * - Radiotherapy Mask Anxiety Questionnaire (R-MAQ) development and validation (Psycho-Oncology 2025, PMC12719024):
 *   full text.
 * - Music therapy and relaxation-visualisation randomised trial (Support Care Cancer 2025, DOI
 *   10.1007/s00520-025-09901-z): abstract, Europe PMC; the full text is not open.
 * - OPEN phase 3 randomised trial of open versus closed masks (Radiother Oncol 2026, DOI 10.1016/j.radonc.2026.111779):
 *   abstract, Europe PMC; the full text is not open. Its MethodsX workflow paper (2026, PMC13675897): full text.
 * - Li et al., migration to an open-face mask (J Appl Clin Med Phys 2013, PMC5714571): full text.
 * - NCI, Radiation Therapy and You (April 2021): full text, PDF from cancer.gov.
 *
 * Changed on 17 November 2026: the 2018 cohort was not consecutive; the music trial did not select anxious patients;
 * the open-face mask is no longer said to contradict the ESTRO advice on cutting out a mask, which no source read says;
 * several reasons the sources do not give were reworded to what they state.
 *
 * No society guideline on preventing or managing mask anxiety was found; the census row recorded the same gap. Every
 * DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks joined.
 */
export const headAndNeckRadiotherapyImmobilisationMask = protocol({
  id: "head-and-neck-radiotherapy-immobilisation-mask",
  name: "Immobilisation mask for head and neck and brain radiotherapy, including mask anxiety",
  aka: ["radiotherapy mask", "thermoplastic mask", "shell", "head and neck mask", "mask anxiety", "claustrophobia during radiotherapy", "mould room", "open-face mask", "five-point mask"],
  domain: "radiotherapy",
  tldr: "For radiotherapy to the head or neck you wear a close-fitting plastic mesh mask, moulded to your face while it is warm and clipped to the table, so you are in exactly the same place every day. About a quarter of people feel anxious in the mask. Tell the team early: they can explain each step, give you a break, offer music, and in some departments use a mask with the face left open.",
  simple: "A warm plastic mesh is shaped over your face and goes hard as it cools. It holds your head still during treatment. You can still breathe and signal to the team. If it makes you anxious, say so: there are ways to help.",
  summary: "The ESTRO ACROP guideline (2017) sets out the radiation therapist's procedure: a full explanation beforehand, including the mask's temperature and how to signal for help; removal of dentures, hearing aids and piercings in the field; a straight, comfortable and reproducible position with every device indexed to the couch; any mouth bite or stent in place before moulding; a mask of three or more fixation points (five points when the low neck is treated, or a shoulder retractor with a three-point mask); a check of the material's temperature before it touches the skin; moulding within one to two minutes and hardening for five to fifteen; reassurance during hardening; removal and refitting before the CT scan; and labelling of the mask. It says cutting out the mask should be avoided except for a bite block or a breathing device such as a tracheostomy.\n\nIn one Australian cohort of 100 patients, 26% reported mask anxiety; in a Canadian study of 410 that developed a four-item screen (R-MAQ), 27.3% showed an anxious response at the planning scan. In a prospective cohort of 35 people with mask anxiety it fell during treatment in 72%. The 2019 Australian study recommends routine screening and the 2018 one says it should be considered; no guideline read requires it. One randomised trial (216 patients not selected for anxiety, India, 2025) found music with guided relaxation in the first five sessions lowered mask anxiety scores. The OPEN phase 3 trial (230 non-claustrophobic patients, 2026) found open-face masks with surface-guided radiotherapy gave set-up accuracy equivalent to a closed five-point mask and a better patient experience. The ESTRO guideline does not discuss open-face masks.",
  asOf: "2026-11-17",
  setting: {
    who: ["radiographer", "patient-or-carer"],
    where: ["radiotherapy-department"],
  },
  population: "Adults having external beam radiotherapy to the head and neck, or to the brain, with a thermoplastic mask. The procedure steps are written for head and neck cancer, which is the scope of the ESTRO guideline; the sources read do not set out a separate procedure for brain radiotherapy. The trials and cohorts enrolled adults with head and neck cancer, and the sources read do not address children. Immobilisation for stereotactic radiosurgery belongs to the stereotactic protocol.",
  trigger: "The mould-room or planning CT appointment at which the mask is made, and every treatment session after it.",
  steps: [
    {
      action: "Before making the mask, give the patient a full explanation of the procedure",
      why: "In a cohort of people with mask anxiety, most (86%) rated discussions with health professionals as helpful in reducing it (Nixon 2019).",
      source: "estro-acrop-hn-2017",
      quote: "A full and detailed explanation of the procedure should be given to the patient by an RTT.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Explain how warm the mask is likely to feel, stress keeping still and breathing normally, and tell the patient how to alert staff if they are in difficulty",
      why: "The guideline treats these as part of the safety and effectiveness of the procedure: the patient needs to know how to get help.",
      source: "estro-acrop-hn-2017",
      quote: "Other aspects related to both the safety and efficacy of the procedure should be discussed with the patient including the likely mask temperature, and how the patient can alert the RTTs if they are having difficulty during the procedure.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Screen for mask anxiety routinely, from the planning scan and through the course of treatment",
      why: "About one person in four reports mask anxiety, and it changes over the weeks of treatment: it eased in most people in this cohort, stayed the same in some and rose in a few.",
      source: "nixon-2019",
      quote: "Due to its high prevalence and variable patterns over time, it is recommended that routine screening for mask anxiety be implemented as standard care throughout the course of RT for HNC.",
      grade: "Recommendation of a prospective cohort study (35 patients); not a guideline",
    },
    {
      action: "Remove dentures, hearing aids, earrings and piercings in the treated area before moulding",
      why: "The guideline says these must come out before the patient is positioned for the mask. It does not give its reasons.",
      source: "estro-acrop-hn-2017",
      quote: "Any dentures, hearing aids, toupees, earrings and all kinds of piercings in the treated area including tongue piercings must also be removed.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Position the patient straight and comfortably, with the neck rest and every support indexed to the couch, and any mouth bite or stent in place before the mask is made",
      why: "Fixing every support to the same place on the couch keeps errors of rotation and shift small, so the position can be reproduced through treatment.",
      source: "estro-acrop-hn-2017",
      quote: "All immobilisation devices must be indexed and fixed to the couch, to minimise rotational and translational errors.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Choose a mask with three or more fixation points, a five-point mask when the low neck is treated, or a shoulder retractor with a three-point mask",
      why: "When the low neck is treated, the shoulders have to be kept in position, either by the mask itself or by a separate device.",
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
      action: "Support and reassure the patient while the mask hardens, encouraging abdominal breathing",
      why: "The mask takes 5 to 15 minutes to harden, depending on the material, and the guideline says abdominal breathing helps patients relax.",
      source: "estro-acrop-hn-2017",
      quote: "The patient should be supported and reassured by the RTTs during this time period. Motivating and supporting patients to use abdominal breathing will help them to relax during the whole procedure.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Remove and refit the mask before the planning CT to check the fit, giving the patient a short break",
      why: "Refitting shows whether the fit is correct and the mask holds the patient adequately, and the guideline calls the short break before scanning advisable.",
      source: "estro-acrop-hn-2017",
      quote: "It is recommended that the mask be removed and refitted prior to commencement of CT scanning to ensure that the fit is correct and that the immobilisation provided by the mask is adequate.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Label the mask with the patient's name and the neck rest and wedges used, and record the position in the chart",
      why: "The guideline asks for this for safety reasons: the mask is marked as that patient's and carries a record of the supports used with it.",
      source: "estro-acrop-hn-2017",
      quote: "For safety reasons, the patient name, type of neck rest and wedges used should always be documented on the patient mask, preferably using a method that can identify the mask in the oncology information system.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Consider offering music with guided relaxation and visualisation during the first treatment sessions",
      why: "In one randomised trial in people having head and neck radiotherapy, who were not selected for anxiety, soft instrumental music with guided relaxation lowered mask anxiety scores after five sessions. No guideline read recommends it yet.",
      source: "music-rct-2025",
      quote: "At the end of five RT sessions, the intervention group showed a statistically significant reduction in mask anxiety scores [median (IQR): 2 (2)] compared to the control group [median (IQR): 6 (1)], with p < 0.001.",
      grade: "Single randomised trial (216 patients randomised, 208 analysed); read as an abstract; not a guideline",
    },
  ],
  bestInClass: {
    statement: "Make the mask by the ESTRO ACROP procedure (2017): explanation and an agreed signal, a straight reproducible position with every device indexed, any bite block in place first, three or more fixation points and five for the low neck, a temperature check before the material touches the skin, reassurance while it sets, and a refit before the CT. Screening for mask anxiety is recommended by one Australian cohort study and proposed for consideration by another, and a four-item screen (R-MAQ) has been developed and tested at one centre; no guideline read requires it. Music with guided relaxation lowered mask anxiety scores in one randomised trial. With surface-guided radiotherapy, an open-face mask gave set-up accuracy equivalent to a closed five-point mask and a better patient experience in non-claustrophobic patients (OPEN phase 3 randomised trial, 2026). The ESTRO guideline (2017) does not discuss open-face masks; it says only that cutting out a mask should be avoided except for bite blocks or respiratory devices.",
    sources: ["estro-acrop-hn-2017", "nixon-2018", "nixon-2019", "rmaq-2025", "music-rct-2025", "open-rct-2026"],
  },
  variants: [
    {
      name: "Open-face mask with surface-guided radiotherapy",
      differs: "The mask leaves the eyes, nose and mouth uncovered and a surface camera tracks the exposed face, neck and upper chest from set-up through treatment; daily cone-beam CT was still used to verify position in the trial. ESTRO ACROP (2017) does not discuss open-face masks; it says that cutting out a mask should be avoided except for bite blocks or respiratory devices such as tracheostomies.",
      evidence: "OPEN phase 3 trial: 230 non-claustrophobic patients randomised to a closed five-point mask without surface guidance, or an open three-point or open five-point mask with surface guidance; the authors conclude set-up accuracy was equivalent (the only significant difference was larger longitudinal shifts with the closed mask, P < 0.001), and tolerability, overall experience and distress were more favourable with both open masks (p < 0.01). An earlier study of a precut open-face mask (Li 2013) treated five patients with claustrophobia, who could only tolerate the open-face mask.",
      sources: ["open-rct-2026", "open-methods-2026", "li-2013", "estro-acrop-hn-2017"],
    },
    {
      name: "Routine screening with a validated tool (R-MAQ)",
      differs: "A four-item questionnaire completed at the first consultation, before the planning scan, identifies people at risk of an anxious response to the mask.",
      evidence: "Developed and tested in the same 410 patients at one centre in Montreal: area under the ROC curve 0.78, with 27.3% showing an anxious response at planning; the abstract reports validity comparable or superior to the 26-item Claustrophobia Questionnaire. The authors say external validation is still needed and that the study did not assess whether screening improves outcomes.",
      sources: ["rmaq-2025"],
    },
  ],
  grades: [
    { claim: "About a quarter of patients report mask anxiety", grade: "Mixed-methods study; prevalence from a cross-sectional cohort of 100 patients", source: "nixon-2018", quote: "In phase one, 26% of participants self‐identified as being anxious about the use of a thermoplastic mask." },
    { claim: "Mask anxiety eased during treatment in most of those who had it", grade: "Prospective cohort (35 patients with mask anxiety)", source: "nixon-2019", quote: "In 72% of participants, the level of initial distress was found to reduce over time." },
    { claim: "Open masks with surface guidance gave a better patient experience than closed masks", grade: "Phase 3 randomised trial (230 non-claustrophobic patients); read as an abstract", source: "open-rct-2026", quote: "At treatment completion patient experience metrics, including tolerability, overall experience and distress, were significantly more favourable for both open-mask cohorts compared to closed masks (p < 0.01)." },
    { claim: "About a quarter of patients show an anxious response to the mask at planning", grade: "Single-centre cross-sectional development and validation study (410 patients)", source: "rmaq-2025", quote: "Of the 410 participants (mean age 62), 27.3% presented an anxious response to the immobilization mask during planning exams." },
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
      accessed: "2026-11-17",
    },
    {
      key: "nixon-2018",
      label: "Exploring the prevalence and experience of mask anxiety for the person with head and neck cancer undergoing radiotherapy",
      publisher: "Journal of Medical Radiation Sciences (Nixon et al.)",
      year: 2018,
      url: "https://doi.org/10.1002/jmrs.308",
      doi: "10.1002/jmrs.308",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nixon-2019",
      label: "A prospective examination of mask anxiety during radiotherapy for head and neck cancer and patient perceptions of management strategies",
      publisher: "Journal of Medical Radiation Sciences (Nixon et al.)",
      year: 2019,
      url: "https://doi.org/10.1002/jmrs.346",
      doi: "10.1002/jmrs.346",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "rmaq-2025",
      label: "Development and Validation of a Rapid Screening Measure for Mask Anxiety in Head and Neck Cancer Patients Undergoing Radiotherapy",
      publisher: "Psycho-Oncology",
      year: 2025,
      url: "https://doi.org/10.1002/pon.70369",
      doi: "10.1002/pon.70369",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "music-rct-2025",
      label: "Effect of music therapy and relaxation visualization intervention on mask anxiety in head and neck cancer patients undergoing radiotherapy: a randomized controlled trial",
      publisher: "Supportive Care in Cancer",
      year: 2025,
      url: "https://doi.org/10.1007/s00520-025-09901-z",
      doi: "10.1007/s00520-025-09901-z",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "open-rct-2026",
      label: "OPEN: optimising patient experience in head and neck radiotherapy, a phase 3 randomised control trial comparing open versus closed face masks",
      publisher: "Radiotherapy and Oncology (Nicholson et al.)",
      year: 2026,
      url: "https://doi.org/10.1016/j.radonc.2026.111779",
      doi: "10.1016/j.radonc.2026.111779",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "open-methods-2026",
      label: "Surface-guided radiotherapy setup using an open-face mask for head and neck cancer; the OPEN trial approach",
      publisher: "MethodsX",
      year: 2026,
      url: "https://doi.org/10.1016/j.mex.2026.104186",
      doi: "10.1016/j.mex.2026.104186",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "li-2013",
      label: "Migration from full-head mask to \"open-face\" mask for immobilization of patients with head and neck cancer",
      publisher: "Journal of Applied Clinical Medical Physics (Li et al.)",
      year: 2013,
      url: "https://doi.org/10.1120/jacmp.v14i5.4400",
      doi: "10.1120/jacmp.v14i5.4400",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nci-rt-and-you",
      label: "Radiation Therapy and You: Support for People With Cancer (April 2021)",
      publisher: "US National Cancer Institute",
      year: 2021,
      url: "https://www.cancer.gov/publications/patient-education/radiation-therapy-and-you",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["surface-guided-radiotherapy", "patient-positioning-surface-guidance-systems", "imrt-igrt", "music-therapy-cancer", "relaxation-guided-imagery"],
  cancers: ["head-and-neck"],
  terms: ["radiotherapy"],
  related: ["radiotherapy-patient-identification-and-time-out", "head-and-neck-radiotherapy-oral-mucositis", "head-and-neck-radiotherapy-dental-assessment-osteoradionecrosis"],
  upgrades: ["idea-pu-open-face-masks", "idea-pu-mask-anxiety-screening"],
  gaps: [
    "No society guideline on preventing or managing mask anxiety was found. The screening recommendation comes from the authors of two Australian cohort studies, and the only randomised trial of a calming intervention found is a single-centre trial from India. On 17 November 2026 its full text was not open, so it was read as an abstract: the abstract does not say how patients were allocated or whether assessors were blinded, and its participants were not selected for mask anxiety.",
    "The ESTRO ACROP guideline dates from 2017 and grades nothing. It does not discuss open-face masks; its one related statement is that cutting out a mask should be avoided except for bite blocks or respiratory devices. No newer edition was found on 17 November 2026. A separate ESTRO-ACROP guideline on surface-guided radiotherapy (2022, DOI 10.1016/j.radonc.2022.05.026) exists; only its abstract could be read, and nothing on this page rests on it.",
    "The OPEN trial enrolled non-claustrophobic patients, so whether open masks let people who cannot tolerate a closed mask complete treatment is not tested in it. On 17 November 2026 its full text was not open, so it was read as an abstract; the size of the differences in set-up and patient experience, and the equivalence margin, could not be checked.",
    "Medication for mask anxiety is described in the cohort studies but no source read gives a recommendation on it. In the 2019 cohort less than half were prescribed medication and 25% of the cohort found it helpful, with side effects and limits on activities such as driving reported; the authors say this supports considering alternatives.",
    "The R-MAQ was developed and tested in the same patients at one centre; its authors say prospective external validation is essential. The 26% and 27.3% figures measure different things: self-reported distress on a 0 to 10 scale at one point during treatment, and an anxious response observed by radiation therapists at the planning scan.",
    "Preparation of children was not examined: none of the sources read covers it.",
  ],
});

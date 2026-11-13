import { protocol } from "./helpers";

/*
 * The radiotherapy planning scan (CT simulation): what happens, what the patient does, and what the radiographers
 * check, across tumour sites.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - NCI, Radiation Therapy and You: Support for People With Cancer (April 2021): full text, PDF from cancer.gov.
 * - ESTRO ACROP guidelines for positioning, immobilisation and position verification of head and neck patients for
 *   radiation therapists (2017, PMC7033761): full text. Its section 3 is the most detailed published CT simulation
 *   procedure found; it is written for head and neck and ungraded.
 * - ESTRO-ACROP guideline for positioning, immobilisation and setup verification for breast irradiation (2023,
 *   PMC10511493): full text, for skin marks.
 * - Shin et al., randomised trial of a virtual-reality explanation before breast radiotherapy planning (Int J Radiat
 *   Oncol Biol Phys 2023): abstract, Europe PMC.
 * - AAPM Task Group 66 (CT simulator quality assurance, 2003) was not read: it is paywalled, and a DOI tried for it
 *   resolved to an unrelated software paper and was discarded.
 *
 * Site-specific preparation lives in its own protocols and is linked rather than repeated: breast set-up and
 * breath-hold, prostate bladder and rectal filling, the head and neck mask, 4D CT for moving targets, iodinated contrast,
 * identification, and pregnancy enquiry. Every DOI was resolved through Europe PMC and its title checked. Quotes are
 * copied from the raw text with line breaks joined.
 */
export const radiotherapyPlanningCtSimulation = protocol({
  id: "radiotherapy-planning-ct-simulation",
  name: "Radiotherapy planning scan (CT simulation): positioning, skin marks and what the patient does",
  aka: ["CT simulation", "CT sim", "planning CT", "radiotherapy planning appointment", "simulation", "virtual simulation", "radiotherapy tattoos", "reference marks", "mould room"],
  domain: "radiotherapy",
  tldr: "Before radiotherapy starts you have a planning appointment, usually a CT scan. You lie in the exact treatment position, sometimes with a mask, mould or cushion, and keep very still. Small skin marks (permanent dots or temporary ink) may be made to line you up each day. Depending on the area, you may need a full or empty bladder, a dye injection, or breath-hold practice.",
  simple: "The planning scan maps exactly where the treatment will go. You lie very still in the same position you will be treated in. The team may make tiny marks on your skin.",
  summary: "The NCI booklet (2021) describes the planning session for patients: the radiation oncologist and therapist define the treatment area while the patient lies very still for scans; small permanent tattoos or ink dots are placed to line the patient up daily; a body mould or, for the head and neck, a mask may be made. The ESTRO ACROP head and neck guideline (2017) gives the radiographer's procedure: identification and consent checked before scanning; diagnosis, prescription and scan margins known in advance to keep imaging dose as low as reasonably achievable; contrast screened for, kidney function checked and the patient observed for at least 15 minutes after; nodes and scars marked and bolus placed before scanning; the couch set so all immobilisation is in the field of view; orientation entered correctly; slice thickness of 3 mm or less; dose-length product recorded; a photograph of the set-up taken if needed.\n\nOn skin marks, ESTRO-ACROP breast (2023) reports a randomised trial (176 against 166 patients) with no difference in set-up error between permanent tattoos and temporary marks on weekly portal imaging, notes that tattoos may affect wellbeing, and considers that surface guidance may allow marks to be omitted if validated locally. A randomised trial in 196 women found that a virtual-reality explanation before breast radiotherapy planning reduced anxiety immediately and improved knowledge of the procedure compared with the standard explanation. Site-specific preparation (bladder and bowel filling, breath-hold, 4D CT, masks) is in linked protocols.",
  asOf: "2026-11-11",
  setting: {
    who: ["radiographer", "doctor", "patient-or-carer"],
    where: ["radiotherapy-department"],
  },
  population: "Adults having a CT planning scan for external beam radiotherapy at any site. MR simulation, PET-CT planning and children's preparation are not covered by the sources read. The detailed CT steps come from a head and neck guideline and apply generally where marked as such.",
  trigger: "The first planning appointment after the decision to give external beam radiotherapy.",
  steps: [
    {
      action: "Explain the planning session to the patient beforehand: what the scan is for, that they must keep very still, and that skin marks may be made",
      why: "Knowing what will happen makes the appointment easier and helps people stay still.",
      source: "nci-rt-and-you",
      quote: "You will be asked to lie very still while x-rays or scans are taken.",
      grade: "Patient information (ungraded)",
    },
    {
      action: "Confirm the patient's identity and consent by departmental procedure before scanning, and complete the pregnancy enquiry where it applies",
      why: "The planning scan is the first exposure in a course of treatment, and every later step depends on it being the right person.",
      source: "estro-acrop-hn-2017",
      quote: "All departmental procedures in relation to patient informed consent and identification should be adhered to prior to commencing the CT scanning procedure.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Know the diagnosis, prescription and required scan margins before scanning, and scan no more than is needed",
      why: "This keeps the radiation from the scan itself as low as possible.",
      source: "estro-acrop-hn-2017",
      quote: "The patient diagnosis, prescription and required scanning margins should be known to the RTTs before commencing CT, so as to adhere to the ALARA principle.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "If contrast is to be given, screen for previous reactions, check kidney function, keep the emergency trolley ready, and observe the patient for at least 15 minutes afterwards",
      why: "Contrast helps the team see the tumour, but reactions, though rare, need to be prepared for.",
      source: "estro-acrop-hn-2017",
      quote: "If contrast is to be used, the RTTs must screen the patient for potential anaphylaxis as per departmental protocol, document this screening procedure and ensure that the emergency trolley is prepared and fully stocked.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Position the patient in the treatment position with all immobilisation in place, mark any scars or nodes and place any planned bolus before the scan",
      why: "The plan is calculated on this scan, so anything present at treatment must be present now.",
      source: "estro-acrop-hn-2017",
      quote: "If bolus is planned for the patient’s treatment, this should be in situ prior to CT scanning so as to account for the actual bolus to be used at treatment in the dose calculations.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Set the couch so all immobilisation devices are in the field of view, and enter patient orientation correctly at the console",
      why: "Devices must be in the scan to be accounted for in the dose, and a wrong orientation could flip the plan.",
      source: "estro-acrop-hn-2017",
      quote: "The RTTs must ensure that both patient orientation and the orientation of the topogram or pilot scan are correctly entered at the CT console.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Use thin slices (3 mm or less for head and neck) and record the scan dose (dose-length product) in the chart",
      why: "Thin slices show small structures clearly, and recording the dose is a legal requirement for imaging.",
      source: "estro-acrop-hn-2017",
      quote: "It is recommended to use axial slice thickness of 3 mm or less for head and neck cases.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Place reference marks for daily set-up, discussing with the patient permanent tattoos or temporary marks, or omit marks where a validated surface-guidance workflow allows",
      why: "Marks help line you up each day; permanent tattoos are not the only option.",
      source: "estro-acrop-breast-2023",
      quote: "Temporary skin marks may be an alternative to permanent tattoos with a lesser impact on patient well-being [70] .",
      grade: "Consideration (ESTRO-ACROP: practice the evidence could not support as a recommendation)",
    },
    {
      action: "Tell the patient to keep their marks and to say if they fade",
      why: "The marks are used every day of treatment.",
      source: "nci-rt-and-you",
      quote: "Be careful not to remove them and tell the radiation therapist if they have faded or lost color.",
      grade: "Patient information (ungraded)",
    },
    {
      action: "Before the patient leaves, take a photograph of the set-up if needed and record the position and devices in the chart",
      why: "Every radiographer who treats the patient later must be able to reproduce the position exactly.",
      source: "estro-acrop-hn-2017",
      quote: "If needed, a photograph of the patient position can be taken and added to the patient chart.",
      grade: "Guideline (ungraded)",
    },
  ],
  bestInClass: {
    statement: "Prepare the patient (an explanation in advance; a staff-led preview such as a virtual-reality walkthrough reduced anxiety and improved understanding in one randomised trial), confirm identity, consent and pregnancy status, scan in the treatment position with all devices and bolus in place and the scan limits known in advance, screen for contrast and observe afterwards, use thin slices, record the scan dose, and document the set-up (ESTRO ACROP head and neck 2017; NCI 2021). Skin marks may be permanent or temporary (no difference in accuracy in one randomised trial reported by ESTRO-ACROP breast 2023), or omitted where surface guidance is validated. No single international guideline covers CT simulation across all sites; site-specific steps are in the linked protocols.",
    sources: ["estro-acrop-hn-2017", "estro-acrop-breast-2023", "nci-rt-and-you", "shin-vr-2023"],
  },
  variants: [
    {
      name: "Virtual-reality or guided preview before planning",
      differs: "The patient sees the room, the machine and the sequence of the session in a headset (or on a visit) before the planning appointment, instead of a verbal or written explanation only.",
      evidence: "Randomised trial, 196 women before breast radiotherapy: immediate anxiety reductions of 26.0%, 16.1% and 55.8% on three scales against 8.1%, 8.5% and 13.7%, with only one scale showing a lasting difference; knowledge 81.9 against 76.8 out of 100 (P = .006).",
      sources: ["shin-vr-2023"],
    },
    {
      name: "Tattoo-free set-up with surface guidance",
      differs: "No permanent marks: the patient is aligned with a surface camera, or temporary marks are used.",
      evidence: "ESTRO-ACROP breast (2023) reports one randomised trial with no difference in set-up error between tattoos and temporary marks on weekly portal imaging, and considers that surface guidance may allow marks to be omitted after local validation.",
      sources: ["estro-acrop-breast-2023"],
    },
  ],
  grades: [
    { claim: "Virtual-reality explanation reduces anxiety at radiotherapy planning", grade: "Single randomised trial (196 patients)", source: "shin-vr-2023", quote: "Immersive VR applied to the current procedure reduces anxiety during RT planning for patients with breast cancer." },
    { claim: "Surface guidance may allow skin marks to be omitted", grade: "Consideration (ESTRO-ACROP)", source: "estro-acrop-breast-2023", quote: "SGRT may improve setup accuracy and enable the omission of skin marks entirely, though this must be validated in the context of a department’s local workflow." },
    { claim: "Patient remains at least 15 minutes after contrast", grade: "Guideline (ungraded)", source: "estro-acrop-hn-2017", quote: "As a minimum requirement, the patient must remain in the department for a further fifteen minutes." },
  ],
  sources: [
    {
      key: "nci-rt-and-you",
      label: "Radiation Therapy and You: Support for People With Cancer (April 2021)",
      publisher: "US National Cancer Institute",
      year: 2021,
      url: "https://www.cancer.gov/publications/patient-education/radiation-therapy-and-you",
      read: "full-text",
      accessed: "2026-11-11",
    },
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
      key: "estro-acrop-breast-2023",
      label: "ESTRO-ACROP guideline for positioning, immobilisation and setup verification for local and loco-regional photon breast cancer irradiation",
      publisher: "ESTRO-ACROP (Mast et al., Technical Innovations and Patient Support in Radiation Oncology)",
      year: 2023,
      url: "https://doi.org/10.1016/j.tipsro.2023.100219",
      doi: "10.1016/j.tipsro.2023.100219",
      gradingScheme: "Recommendations where the evidence supported them; considerations for relevant practice the evidence could not support.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "shin-vr-2023",
      label: "An Investigation of the Effect of Virtual Reality on Alleviating Anxiety in Patients With Breast Cancer Undergoing Radiation Therapy: A Randomized Controlled Trial",
      publisher: "International Journal of Radiation Oncology, Biology, Physics (Shin et al.)",
      year: 2023,
      url: "https://doi.org/10.1016/j.ijrobp.2023.06.275",
      doi: "10.1016/j.ijrobp.2023.06.275",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["ct", "surface-guided-radiotherapy", "treatment-planning-systems", "iodinated-contrast-media", "respiratory-motion-management"],
  cancers: ["head-and-neck", "breast-cancer"],
  terms: ["radiotherapy"],
  related: ["breast-radiotherapy-positioning-and-setup", "breath-hold-left-breast-radiotherapy", "prostate-radiotherapy-bladder-and-rectal-preparation", "head-and-neck-radiotherapy-immobilisation-mask", "respiratory-motion-management-4d-ct-and-gating", "iodinated-contrast-kidney-and-metformin", "radiotherapy-patient-identification-and-time-out", "radiotherapy-pregnancy-and-breastfeeding-enquiry"],
  upgrades: ["idea-pu-radiotherapy-walkthrough-before-planning", "idea-pu-tattoo-free-set-up"],
  gaps: [
    "No international guideline covering CT simulation for all tumour sites was found; the detailed procedure is taken from the ESTRO ACROP head and neck guideline (2017), which is ungraded and site-specific.",
    "AAPM Task Group 66 on CT simulator quality assurance (2003) was not read: it is paywalled, and an identifier tried for it resolved to an unrelated paper.",
    "MR simulation and PET-CT planning were not examined.",
    "The virtual-reality trial was in breast cancer at one institution and read as an abstract; effects in other sites are not known.",
    "The randomised trial of tattoos against temporary marks is reported through the ESTRO-ACROP breast guideline and was not read directly.",
  ],
});

import { protocol } from "./helpers";

/*
 * The radiotherapy planning scan (CT simulation): what happens, what the patient does, and what the radiographers
 * check, across tumour sites.
 *
 * What was read, and how (first on 11 November 2026; every source re-read as raw text on 17 November 2026 in the
 * second accuracy pass, with each quote checked verbatim by script):
 * - NCI, Radiation Therapy and You: Support for People With Cancer (April 2021): full text, PDF from cancer.gov
 *   (a copy another checker saved on 17 November was re-used). The web page still says the booklet was last updated
 *   in April 2021.
 * - ESTRO ACROP guidelines for positioning, immobilisation and position verification of head and neck patients for
 *   radiation therapists (2017, PMC7033761): full text from Europe PMC (saved copy re-used). Its CT section is the
 *   most detailed published CT simulation procedure found; it is written for head and neck and ungraded.
 * - ESTRO-ACROP guideline for positioning, immobilisation and setup verification for breast irradiation (2023,
 *   PMC10511493): full text from Europe PMC (saved copy re-used), for skin marks.
 * - Shin et al., randomised trial of a virtual-reality explanation in breast radiotherapy (Int J Radiat Oncol Biol
 *   Phys 2023): abstract, Europe PMC. The full text is subscription only.
 * - AAPM Task Group 66U1 report 83.B (Medical Physics, 2026, PMC13582438), the update of Task Group 66 (2003): full
 *   text as HTML from PubMed Central, found and read on 17 November 2026. It is about quality assurance of the
 *   scanner. The 2003 report itself is subscription only (abstract read through Europe PMC) and the AAPM website
 *   refused a script.
 *
 * Corrected on 17 November 2026: the pregnancy enquiry was attached to a guideline that does not mention it; the
 * tldr promised bladder filling and breath-hold practice that no source read here describes; several reasons given
 * in `why` (contrast reactions being rare, a wrong orientation flipping the plan, dose recording as a legal
 * requirement everywhere) were not in the sources; the trial's patients were called women and its explanation a
 * staff-led walkthrough, neither of which the abstract says; and the skin-mark step now quotes the breast
 * guideline's recommendation, not only its consideration.
 *
 * Site-specific preparation lives in its own protocols and is linked rather than repeated: breast set-up and
 * breath-hold, prostate bladder and rectal filling, the head and neck mask, 4D CT for moving targets, iodinated contrast,
 * identification, and pregnancy enquiry. Every DOI was resolved through Crossref or Europe PMC and its title checked.
 * Quotes are copied from the raw text with line breaks joined.
 */
export const radiotherapyPlanningCtSimulation = protocol({
  id: "radiotherapy-planning-ct-simulation",
  name: "Radiotherapy planning scan (CT simulation): positioning, skin marks and what the patient does",
  aka: ["CT simulation", "CT sim", "planning CT", "radiotherapy planning appointment", "simulation", "virtual simulation", "radiotherapy tattoos", "reference marks", "mould room"],
  domain: "radiotherapy",
  tldr: "Before radiotherapy starts you have a planning session, called a simulation, where scans are taken. You lie in the treatment position, sometimes in a mask or body mould, and keep very still. Small skin marks (permanent tattoo dots or ink) are usually made to line you up each day. Some people are given a contrast injection for the scan. Preparation for particular areas is on the linked pages.",
  simple: "The planning scan maps exactly where the treatment will go. You lie very still in the same position you will be treated in. The team may make tiny marks on your skin.",
  summary: "The NCI booklet (2021) describes the planning session for patients: the radiation oncologist and therapist define the treatment area while the patient lies very still for x-rays or scans; small marks, either tattoos or dots of coloured ink, are placed and used each day to check the position; a body mould or, for the head and neck, a mask may be made. The ESTRO ACROP head and neck guideline (2017) gives the radiographer's procedure: departmental procedures for consent and identification followed before scanning; diagnosis, prescription and scan margins known in advance, in keeping with the ALARA principle; if contrast is used, screening for anaphylaxis, a check of creatinine clearance and a stay in the department of at least 15 minutes afterwards; any marking of nodes and scars done before immobilisation and planned bolus in place before scanning; the couch height set so the immobilisation device is in the field of view; orientation entered correctly; slice thickness of 3 mm or less for head and neck; dose-length product, number of slices and scan length documented; a photograph of the position taken if needed.\n\nOn skin marks, ESTRO-ACROP breast (2023) recommends that skin marking is required where there is no surface-guided imaging and that the options are discussed with the patient. It reports a randomised trial (176 against 166 patients) with no significant difference in random and systematic set-up errors between tattoos and non-permanent marks on weekly portal imaging, notes a study reporting that permanent tattoos may affect wellbeing, and considers that surface guidance may allow marks to be omitted if validated locally. A single-institution randomised trial in 196 patients with breast cancer found that a virtual-reality explanation reduced anxiety immediately and improved knowledge of the radiotherapy procedure compared with standard care. The AAPM task group report on CT simulators (2026 update of the 2003 report) describes the same sequence for all sites (treatment position, immobilisation, reference marks) but is about quality assurance of the scanner. Site-specific preparation (bladder and bowel filling, breath-hold, 4D CT, masks) is in linked protocols.",
  asOf: "2026-11-17",
  setting: {
    who: ["radiographer", "doctor", "patient-or-carer"],
    where: ["radiotherapy-department"],
  },
  population: "People having a CT planning scan for external beam radiotherapy. The sources read do not address MR simulation, PET-CT planning or the preparation of children. The detailed CT steps come from a head and neck guideline and the skin-mark recommendation from a breast guideline; neither was written for every tumour site.",
  trigger: "The planning session (simulation) scheduled once the decision to have external beam radiotherapy has been made.",
  steps: [
    {
      action: "Tell the patient beforehand what the planning session involves: scans taken while they lie very still, and small marks made on the skin",
      why: "This is what the NCI booklet prepares patients for. In one randomised trial in breast cancer, a virtual-reality explanation lowered anxiety and improved knowledge of the procedure.",
      source: "nci-rt-and-you",
      quote: "You will be asked to lie very still while x-rays or scans are taken.",
      grade: "Patient information (ungraded)",
    },
    {
      action: "Follow the department's procedures for informed consent and patient identification before the scan starts",
      why: "The guideline asks for both before scanning begins. It does not mention pregnancy; that enquiry has its own linked protocol.",
      source: "estro-acrop-hn-2017",
      quote: "All departmental procedures in relation to patient informed consent and identification should be adhered to prior to commencing the CT scanning procedure.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Know the diagnosis, prescription and required scan margins before scanning, and keep to the local scanning margins",
      why: "The guideline ties this to the ALARA principle: keeping the radiation from the scan itself as low as reasonably achievable.",
      source: "estro-acrop-hn-2017",
      quote: "The patient diagnosis, prescription and required scanning margins should be known to the RTTs before commencing CT, so as to adhere to the ALARA principle.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "If contrast is to be used, screen for the risk of anaphylaxis and document the screening, check creatinine clearance before intravenous contrast, have the emergency trolley prepared and stocked, and keep the patient in the department for at least 15 minutes afterwards",
      why: "The guideline words the screening, the trolley and the 15 minute stay as musts, so that a severe allergic reaction can be treated at once and the patient is observed before leaving.",
      source: "estro-acrop-hn-2017",
      quote: "If contrast is to be used, the RTTs must screen the patient for potential anaphylaxis as per departmental protocol, document this screening procedure and ensure that the emergency trolley is prepared and fully stocked.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Do any marking of nodal regions or surgical scars before immobilising the patient, then scan in the treatment position with the immobilisation and any planned bolus in place",
      why: "The dose is calculated on this scan, so the bolus used at treatment should be on the patient when it is taken. The guideline calls this more accurate than adding bolus during planning.",
      source: "estro-acrop-hn-2017",
      quote: "If bolus is planned for the patient’s treatment, this should be in situ prior to CT scanning so as to account for the actual bolus to be used at treatment in the dose calculations.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Set the couch height so the immobilisation device is within the field of view, and enter the patient orientation and the orientation of the pilot scan correctly at the console",
      why: "The immobilisation device has to be outlined, along with the targets and organs at risk, before the beams are modelled, so it must be in the picture. The guideline words the orientation check as a must.",
      source: "estro-acrop-hn-2017",
      quote: "The RTTs must ensure that both patient orientation and the orientation of the topogram or pilot scan are correctly entered at the CT console.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Use an axial slice thickness of 3 mm or less for head and neck cases, and document the dose-length product, number of slices and scan length in the chart",
      why: "Thin slices give enough anatomical detail to outline the target and organs at risk. The guideline links recording the scan dose to a European directive (97/43/Euratom); the sources read do not give the rules of other regions.",
      source: "estro-acrop-hn-2017",
      quote: "It is recommended to use axial slice thickness of 3 mm or less for head and neck cases.",
      grade: "Guideline (ungraded)",
    },
    {
      action: "Where surface-guided imaging is not used, place skin marks for daily set-up, and discuss with the patient the options of permanent tattoos or temporary marks",
      why: "These are the breast guideline's two recommendations on set-up; the NCI booklet describes tattoos or ink dots for any site. As considerations, not recommendations, the breast guideline adds that temporary marks may affect wellbeing less and that surface guidance may allow marks to be left out once validated locally.",
      source: "estro-acrop-breast-2023",
      quote: "The available options for skin marking should be discussed taking into account long-term patient experience and patient preference.",
      grade: "Recommendation (ESTRO-ACROP breast guideline, summary of recommendations; not graded further)",
    },
    {
      action: "Tell the patient to take care not to remove their marks and to say if they fade",
      why: "The marks are needed throughout the course and are used each day to check the position. Ink marks fade over time.",
      source: "nci-rt-and-you",
      quote: "Be careful not to remove them and tell the radiation therapist if they have faded or lost color.",
      grade: "Patient information (ungraded)",
    },
    {
      action: "Document the procedure, the patient position and the devices used in the chart, adding a photograph of the position if needed",
      why: "The guideline asks for the procedure and position to be clearly documented; its stated aim for positioning is high reproducibility through the course of treatment.",
      source: "estro-acrop-hn-2017",
      quote: "If needed, a photograph of the patient position can be taken and added to the patient chart.",
      grade: "Guideline (ungraded)",
    },
  ],
  bestInClass: {
    statement: "Prepare the patient with an explanation in advance (a virtual-reality explanation reduced anxiety and improved knowledge in one randomised trial in breast cancer), follow departmental consent and identification procedures, scan in the treatment position with the immobilisation and any planned bolus in place and the scan margins known in advance, screen before contrast and keep the patient at least 15 minutes afterwards, use thin slices (3 mm or less for head and neck), document the scan dose, and document the set-up (ESTRO ACROP head and neck 2017; NCI 2021). Without surface guidance skin marks are required, and the choice of permanent or temporary marks is discussed with the patient (ESTRO-ACROP breast 2023, which reports one randomised trial with no significant difference in set-up errors between them); marks may be omitted where surface guidance is validated locally. No single international guideline covering the CT simulation appointment across all sites was found; the AAPM report (2026) covers quality assurance of the scanner, and site-specific steps are in the linked protocols.",
    sources: ["estro-acrop-hn-2017", "estro-acrop-breast-2023", "nci-rt-and-you", "shin-vr-2023", "aapm-tg66u1-2026"],
  },
  variants: [
    {
      name: "Virtual-reality explanation before planning",
      differs: "The radiotherapy procedure is explained with immersive virtual reality instead of the standard explanation only.",
      evidence: "Randomised trial at a single institution, 196 patients with breast cancer (97 virtual reality, 99 standard care): immediate anxiety reductions of 26.0%, 16.1% and 55.8% on three scales against 8.1%, 8.5% and 13.7%, with a long-term reduction on only one of the three scales; knowledge 81.9 against 76.8 out of 100 (P = .006). Read as an abstract.",
      sources: ["shin-vr-2023"],
    },
    {
      name: "Tattoo-free set-up with surface guidance",
      differs: "No permanent marks: the patient is aligned with surface guidance, or temporary marks are used.",
      evidence: "ESTRO-ACROP breast (2023) reports one randomised trial with no significant difference in set-up errors between tattoos and non-permanent marks on weekly portal imaging, and considers that surface guidance may allow marks to be omitted after local validation. The AAPM report (2026) notes that workflows without skin marks have been proposed for certain treatment sites.",
      sources: ["estro-acrop-breast-2023", "aapm-tg66u1-2026"],
    },
  ],
  grades: [
    { claim: "Virtual-reality explanation reduces anxiety during radiotherapy planning in breast cancer", grade: "Single randomised trial (196 patients)", source: "shin-vr-2023", quote: "Immersive VR applied to the current procedure reduces anxiety during RT planning for patients with breast cancer." },
    { claim: "Without surface-guided imaging, skin marking is required", grade: "Recommendation (ESTRO-ACROP breast guideline, summary of recommendations)", source: "estro-acrop-breast-2023", quote: "In the absence of surface guided imaging, the use of skin marking is required." },
    { claim: "Surface guidance may allow skin marks to be omitted", grade: "Consideration (ESTRO-ACROP)", source: "estro-acrop-breast-2023", quote: "SGRT may improve setup accuracy and enable the omission of skin marks entirely, though this must be validated in the context of a department’s local workflow." },
    { claim: "Patient remains at least 15 minutes after contrast", grade: "Guideline (ungraded)", source: "estro-acrop-hn-2017", quote: "As a minimum requirement, the patient must remain in the department for a further fifteen minutes." },
    { claim: "The patient is scanned in the intended treatment position", grade: "Task group report (description of the process, not a graded recommendation)", source: "aapm-tg66u1-2026", quote: "During the CT simulation, the patient is positioned on the CT table in the intended treatment position." },
  ],
  sources: [
    {
      key: "nci-rt-and-you",
      label: "Radiation Therapy and You: Support for People With Cancer (April 2021)",
      publisher: "US National Cancer Institute",
      year: 2021,
      url: "https://www.cancer.gov/publications/patient-education/radiation-therapy-and-you",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "shin-vr-2023",
      label: "An Investigation of the Effect of Virtual Reality on Alleviating Anxiety in Patients With Breast Cancer Undergoing Radiation Therapy: A Randomized Controlled Trial",
      publisher: "International Journal of Radiation Oncology, Biology, Physics (Shin et al.)",
      year: 2023,
      url: "https://doi.org/10.1016/j.ijrobp.2023.06.275",
      doi: "10.1016/j.ijrobp.2023.06.275",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "aapm-tg66u1-2026",
      label: "AAPM Task Group 66U1 report 83.B: Quality assurance for computed-tomography simulators in radiation oncology",
      publisher: "American Association of Physicists in Medicine (Cammin et al., Medical Physics)",
      year: 2026,
      url: "https://doi.org/10.1002/mp.70659",
      doi: "10.1002/mp.70659",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["ct", "surface-guided-radiotherapy", "treatment-planning-systems", "iodinated-contrast-media", "respiratory-motion-management"],
  cancers: ["head-and-neck", "breast-cancer"],
  terms: ["radiotherapy"],
  related: ["breast-radiotherapy-positioning-and-setup", "breath-hold-left-breast-radiotherapy", "prostate-radiotherapy-bladder-and-rectal-preparation", "head-and-neck-radiotherapy-immobilisation-mask", "respiratory-motion-management-4d-ct-and-gating", "iodinated-contrast-kidney-and-metformin", "radiotherapy-patient-identification-and-time-out", "radiotherapy-pregnancy-and-breastfeeding-enquiry"],
  upgrades: ["idea-pu-radiotherapy-walkthrough-before-planning", "idea-pu-tattoo-free-set-up"],
  gaps: [
    "No international guideline covering the CT simulation appointment for all tumour sites was found; the detailed procedure is taken from the ESTRO ACROP head and neck guideline (2017), which is ungraded and site-specific, and the skin-mark recommendation from a breast guideline.",
    "AAPM Task Group 66 on CT simulator quality assurance (2003) is subscription only and was read as an abstract. On 17 November 2026 its 2026 update (Task Group 66U1, report 83.B) was found and read in full from PubMed Central. It is dedicated to quality assurance of the scanner and says it does not address other parts of the radiotherapy workflow, so no step here rests on it.",
    "The head and neck guideline links recording of the scan dose to European Commission directive 97/43 (Euratom). The current European and national rules on recording imaging dose were not read, and nothing here should be taken as the legal position in any country.",
    "The pregnancy enquiry before the planning scan is not mentioned by any source read for this page; it is covered in the linked protocol.",
    "No source read here describes bladder filling, bowel preparation or breath-hold at the planning scan; those are in the linked site-specific protocols.",
    "MR simulation and PET-CT planning were not examined.",
    "The virtual-reality trial was in breast cancer at one institution and read as an abstract (the full text is subscription only); what the explanation showed and when it was given are not in the abstract, and effects in other sites are not known.",
    "The randomised trial of tattoos against temporary marks, and the study on tattoos and wellbeing, are reported through the ESTRO-ACROP breast guideline and were not read directly.",
  ],
});

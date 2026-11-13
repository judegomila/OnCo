import { protocol } from "./helpers";

/*
 * Stereotactic radiosurgery (SRS) and stereotactic body radiotherapy (SBRT, also called SABR): the safeguards around
 * planning and delivering a few very high-dose treatments with millimetre accuracy.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - AAPM-RSS Medical Physics Practice Guideline 9.b: SRS-SBRT (J Appl Clin Med Phys 2025, the update of MPPG 9.a of
 *   2017): full text, Europe PMC XML (PMC11969102). It is a United States minimum-practice guideline written in
 *   "must" and "should" language; it prints no grades.
 * - Kirkpatrick et al., randomised trial of 1 mm versus 3 mm margins in image-guided SRS for brain metastases (Int J
 *   Radiat Oncol Biol Phys 2015): abstract, Europe PMC.
 * - AAPM Task Group 101, Stereotactic body radiation therapy (Med Phys 2010): abstract only; the Wiley full text was not
 *   tried after the publisher returned 403 for another AAPM report the same day.
 * - ESTRO ACROP consensus guideline on SBRT for peripherally located early stage NSCLC (Radiother Oncol 2017):
 *   abstract only.
 * - ACR-ASTRO Practice Parameter for SBRT: not reachable (the PDF address served an HTML page to a script).
 * - UK SABR Consortium guidance: no current version was found by URL; not read.
 *
 * Every DOI was resolved through Europe PMC and its title checked (one DOI tried for the margin trial resolved to a
 * rectal cancer paper and was discarded; the corpus record's DOI was used). Quotes are copied from the raw text with
 * line breaks joined.
 */
export const stereotacticRadiosurgeryAndSbrtDeliverySafeguards = protocol({
  id: "stereotactic-radiosurgery-and-sbrt-delivery-safeguards",
  name: "Stereotactic radiosurgery and SBRT: planning and delivery safeguards",
  aka: ["SRS safety", "SBRT safety", "SABR safeguards", "stereotactic ablative radiotherapy", "radiosurgery checklist", "MPPG 9.b", "TG-101", "frameless radiosurgery", "Gamma Knife frame", "CyberKnife"],
  domain: "radiotherapy",
  tldr: "Stereotactic treatment gives a very high dose in one to a few sessions to a small target, so a small error matters more than in ordinary radiotherapy. The team uses a firm head frame or a close-fitting mask or body cushion, checks the plan with an independent calculation, takes images to confirm the target's position before every treatment, and has a physicist present for the first session.",
  simple: "Stereotactic radiotherapy is very precise and very strong. You are held very still, scans check your position before each treatment, and extra people check the plan.",
  summary: "AAPM-RSS MPPG 9.b (2025) sets minimum practice for linac SRS and SBRT in the United States. The service needs standard operating procedures for every step, a safety checklist, participation in an incident learning system, at least two radiation therapists at every session (one trained in the technique), 4D CT for thoracic and abdominal SBRT, and MRI and PET fusion. At simulation the therapists prepare immobilisation and document set-up after the radiation oncologist approves position, images and target localisation. In planning, prior radiotherapy plans are obtained for re-irradiation and cumulative dose reported; brain metastases are named with the MRI date so new and old targets cannot be confused; a calculation grid of 2 mm or finer is used (1 mm for targets of 1 cc or less); the radiation oncologist signs the plan; an independent dose calculation and a physicist's plan and chart review are done before treatment. At delivery a pre-treatment QA check including a dry-run collision check is done, target localisation is verified by imaging before every treatment, imaging-to-treatment isocentre coincidence must be within 1 mm for SRS and 1.5 mm for SBRT (tested daily on treatment days), and a qualified medical physicist personally supervises the first session and directly supervises the rest (new in 9.b). For frameless intracranial SRS, open-face masks let surface guidance use the face. In one randomised trial of SRS for brain metastases, a 1 mm margin around the visible tumour gave similar local control to 3 mm with less radionecrosis (5 of 6 biopsy-proven cases in the 3 mm arm, P=.10), and the authors judged 1 mm more appropriate.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "radiographer", "multidisciplinary-team"],
    where: ["radiotherapy-department"],
  },
  population: "Adults having linac-based stereotactic radiosurgery to the brain (single or few fractions) or stereotactic body radiotherapy to the lung, liver, spine, prostate, oligometastases or other body sites. Gamma Knife and particle therapy have their own physics guidance not read here. Disease-specific doses and selection are outside this protocol.",
  trigger: "A decision to treat with SRS or SBRT.",
  steps: [
    {
      action: "Run the service by written procedures for every step, with a safety checklist covering the whole process",
      why: "Checklists catch the slips that matter most when the whole dose is given in one or a few sessions.",
      source: "aapm-mppg-9b-2025",
      quote: "Establishment of a comprehensive safety checklist to act as a guide for the entire treatment process, and determine appropriate methods for the clinic's QA committee to monitor the SRS-SBRT program.",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "At simulation, prepare the immobilisation, position the patient and acquire the planning images, and record the set-up only after the radiation oncologist approves the position, images and target",
      why: "The position at the planning scan has to be repeatable to within a millimetre or two at treatment.",
      source: "aapm-mppg-9b-2025",
      quote: "For each simulation session, prepare immobilization devices, position the patient, and acquire images for treatment planning in accordance with the clinic's SRS-SBRT procedure and the patient-specific instructions, and document treatment setup parameters after the radiation oncologist has approved the positioning, images, and target localization.",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "For lung and upper abdominal SBRT, have 4D CT available to measure breathing motion, and MRI and PET fusion for target definition",
      why: "Tumours in the chest and upper abdomen move with breathing, and the plan must account for it.",
      source: "aapm-mppg-9b-2025",
      quote: "Four-dimensional computed tomography (4D CT) capability (for thoracic and abdominal SBRT services).",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "For re-irradiation or multiple brain metastases, obtain the previous plans and name targets so new and old lesions cannot be confused, for example with the date of the MRI",
      why: "Treating the wrong lesion, or overdosing an area treated before, are known stereotactic errors.",
      source: "aapm-mppg-9b-2025",
      quote: "In the case of multiple brain metastases and re-irradiation, a target naming convention that makes clear which targets are new and which are old must be utilized; for example, include the date of the MR scan at the end of the target structure's name.",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "Calculate the plan on a grid of 2 mm or finer (1 mm for very small targets or targets beside critical organs)",
      why: "Small targets and steep dose fall-off need a fine calculation to be accurate.",
      source: "aapm-mppg-9b-2025",
      quote: "The use of an isotropic calculation grid size of 2 mm or finer should be utilized.",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "Have the radiation oncologist sign off target coverage, dose fall-off and organ doses, then perform an independent dose calculation and a physicist's plan and chart review before the first treatment",
      why: "A second, separate check of a high-dose plan is the main protection against a planning error reaching the patient.",
      source: "aapm-mppg-9b-2025",
      quote: "An independent dose calculation check must be performed prior to treatment.",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "Before treatment, perform the defined pre-treatment QA check, including a dry run for collisions where the machine could touch the patient or couch",
      why: "Stereotactic beams often come from unusual angles close to the patient.",
      source: "aapm-mppg-9b-2025",
      quote: "This should include a “dry run” collision check where the potential for collision exists.",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "Verify the target's position by imaging before every treatment, with written criteria for imaging during treatment and for any motion management",
      why: "A few millimetres off can mean missing the tumour or hitting a nearby organ with a very high dose.",
      source: "aapm-mppg-9b-2025",
      quote: "Pre-treatment verification of target localization must always be performed; the criteria for intra-treatment image guidance should be clearly described.",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "On treatment days, confirm that the imaging and treatment isocentres coincide within 1 mm for SRS and 1.5 mm for SBRT",
      why: "The images are only useful if the machine treats exactly where the images say.",
      source: "aapm-mppg-9b-2025",
      quote: "AAPM MPPG 2.b states that the composite tolerance of the imaging-treatment isocenter coincidence and table repositioning accuracy must be ≤1 mm for SRS and ≤1.5 mm for SBRT, tested daily when SRS-SBRT treatments are conducted.",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "Have at least two radiation therapists at every session, one trained in the technique, and a qualified medical physicist personally present for the first treatment and directly supervising later ones",
      why: "Experienced eyes at the machine catch problems before the beam is switched on.",
      source: "aapm-mppg-9b-2025",
      quote: "For the first treatment session the QMP must provide personal supervision of the session.",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "Report near misses and errors in an incident learning system, and tell the physicist about any unexpected side effect so its cause can be looked for",
      why: "Learning from near misses prevents the next real error.",
      source: "aapm-mppg-9b-2025",
      quote: "Facilitation and management of the clinic's participation in an incident learning system to ensure a transparent, structured evaluation of all “near miss” and actual deviations in the planning and treatment delivery process.",
      grade: "Minimum practice guideline (ungraded)",
    },
  ],
  bestInClass: {
    statement: "AAPM-RSS MPPG 9.b (2025) is the most recent and most detailed guideline read: written procedures and a checklist for every step, an independent dose calculation and physicist plan review before treatment, imaging verification of the target before every treatment, daily isocentre coincidence within 1 mm (SRS) or 1.5 mm (SBRT), at least two trained therapists at every session and a physicist personally present at the first, and participation in incident learning. For brain metastases treated with image-guided linac SRS, one randomised trial supports a 1 mm rather than a 3 mm margin. European and UK guidance (ESTRO ACROP for lung SBRT, the UK SABR Consortium) cover the same ground; they were read only as an abstract or not at all, so differences in detail could not be compared.",
    sources: ["aapm-mppg-9b-2025", "kirkpatrick-2015", "estro-acrop-lung-sbrt-2017", "aapm-tg101-2010"],
  },
  variants: [
    {
      name: "Frame-based versus frameless intracranial radiosurgery",
      differs: "A stereotactic head frame is fixed to the skull under local anaesthetic on the day of treatment; frameless SRS uses a thermoplastic mask (often open-face, with surface guidance on the exposed face) and image guidance. MPPG 9.b requires the procedure, tolerances and supervision for each treatment type to be written down and notes that open-face masks let the face serve as a reference surface for frameless SRS.",
      evidence: "No comparative trial was read here; MPPG 9.b treats both as acceptable when commissioned and verified.",
      sources: ["aapm-mppg-9b-2025"],
    },
    {
      name: "ESTRO ACROP consensus for peripheral early-stage lung SBRT",
      differs: "A European consensus of eight institutions found only 8 of 57 technologies and techniques mandatory and 32 optional, but half of quality assurance items mandatory, and agreed risk-adapted doses of 3 x 15 Gy for peripheral lesions and 4 x 12 Gy for lesions with broad chest wall contact.",
      evidence: "Questionnaire-based expert consensus; read as an abstract.",
      sources: ["estro-acrop-lung-sbrt-2017"],
    },
  ],
  grades: [
    { claim: "A 1 mm margin is more appropriate than 3 mm for image-guided SRS of brain metastases", grade: "Single randomised trial (49 patients, 80 metastases)", source: "kirkpatrick-2015", quote: "However, given the higher potential risk of RN with a 3-mm margin, a 1-mm GTV expansion is more appropriate." },
    { claim: "Personal physicist supervision for the first session is new in the 2025 guideline", grade: "Minimum practice guideline (ungraded)", source: "aapm-mppg-9b-2025", quote: "The new language requires personal supervision for the first treatment session of SRS-SBRT and direct treatment supervision after the initial fraction." },
    { claim: "European consensus treats few techniques but many QA items as mandatory", grade: "Expert consensus (questionnaire, 8 institutions)", source: "estro-acrop-lung-sbrt-2017", quote: "Only 8/57 technologies and techniques were identified as mandatory for SBRT while 32/57 were considered as optional." },
  ],
  sources: [
    {
      key: "aapm-mppg-9b-2025",
      label: "AAPM-RSS Medical Physics Practice Guideline 9.b: SRS-SBRT",
      publisher: "American Association of Physicists in Medicine and Radiosurgery Society (Journal of Applied Clinical Medical Physics)",
      year: 2025,
      url: "https://doi.org/10.1002/acm2.14624",
      doi: "10.1002/acm2.14624",
      gradingScheme: "Minimum practice guideline using 'must' and 'should'; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "kirkpatrick-2015",
      label: "Defining the optimal planning target volume in image-guided stereotactic radiosurgery of brain metastases: results of a randomized trial",
      publisher: "International Journal of Radiation Oncology, Biology, Physics (Kirkpatrick et al.)",
      year: 2015,
      url: "https://doi.org/10.1016/j.ijrobp.2014.09.004",
      doi: "10.1016/j.ijrobp.2014.09.004",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "estro-acrop-lung-sbrt-2017",
      label: "ESTRO ACROP consensus guideline on implementation and practice of stereotactic body radiotherapy for peripherally located early stage non-small cell lung cancer",
      publisher: "ESTRO ACROP (Guckenberger et al., Radiotherapy and Oncology)",
      year: 2017,
      url: "https://doi.org/10.1016/j.radonc.2017.05.012",
      doi: "10.1016/j.radonc.2017.05.012",
      gradingScheme: "Consensus by agreement of more than 50% of institutions; items classed as mandatory or optional.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "aapm-tg101-2010",
      label: "Stereotactic body radiation therapy: the report of AAPM Task Group 101",
      publisher: "American Association of Physicists in Medicine (Benedict et al., Medical Physics)",
      year: 2010,
      url: "https://doi.org/10.1118/1.3438081",
      doi: "10.1118/1.3438081",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "acr-astro-sbrt",
      label: "ACR-ASTRO Practice Parameter for the Performance of Stereotactic Body Radiation Therapy",
      publisher: "American College of Radiology and American Society for Radiation Oncology",
      year: 2024,
      url: "https://www.acr.org/Clinical-Resources/Practice-Parameters-and-Technical-Standards",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["radiosurgery-srs", "sbrt", "sabr-oligometastases", "gamma-knife", "cyberknife", "in-room-imaging-systems", "surface-guided-radiotherapy", "respiratory-motion-management", "treatment-planning-systems"],
  cancers: ["nsclc"],
  terms: ["stereotactic-radiosurgery", "sbrt-term", "brain-metastases", "planning-target-volume"],
  keyPapers: ["paper-kirkpatrick-srs-margin-trial-ijrobp-2015"],
  related: ["respiratory-motion-management-4d-ct-and-gating", "head-and-neck-radiotherapy-immobilisation-mask", "radiotherapy-patient-identification-and-time-out"],
  upgrades: [],
  gaps: [
    "The guideline read in full is a United States physics minimum-practice document; the UK SABR Consortium guidance could not be found by URL and the ACR-ASTRO practice parameter refused a script, so UK and clinical-practice detail is missing.",
    "AAPM TG-101 and the ESTRO ACROP lung SBRT guideline were read as abstracts only.",
    "No source read sets patient-facing steps for frame placement (local anaesthetic, pin sites, frame removal) or gives evidence comparing frame-based and frameless radiosurgery.",
    "Margins for SBRT outside the brain are set by local motion studies; no randomised evidence was read.",
    "None of the safeguards is graded; their support is error and incident experience rather than trials, which is normal for physics quality assurance.",
  ],
});

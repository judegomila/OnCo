import { protocol } from "./helpers";

/*
 * Stereotactic radiosurgery (SRS) and stereotactic body radiotherapy (SBRT, also called SABR): the safeguards around
 * planning and delivering a few very high-dose treatments with millimetre accuracy.
 *
 * First written 11 November 2026. Second accuracy pass, 17 November 2026: every source was fetched again as raw text
 * and each claim re-read against it; quotes were checked by script (whitespace and line-break hyphenation only).
 * - AAPM-RSS Medical Physics Practice Guideline 9.b: SRS-SBRT (J Appl Clin Med Phys 2025, the update of MPPG 9.a of
 *   2017): full text, Europe PMC XML (PMC11969102), including its tables and footnotes. It is a United States
 *   minimum-practice guideline written in "must" and "should" language; it prints no grades. Europe PMC lists no
 *   later edition.
 * - AAPM Medical Physics Practice Guideline 2.b (image-guided radiotherapy systems, 2021): full text, Europe PMC XML
 *   (PMC8425868), read to check the isocentre figure MPPG 9.b attributes to it.
 * - UK SABR Consortium, "Stereotactic Ablative Body Radiation Therapy (SABR): A Resource", version 6.1, January 2019:
 *   the PDF linked from the consortium's home page, read with pdftotext. It was not found on the first pass.
 * - Kirkpatrick et al., randomised trial of 1 mm versus 3 mm margins in image-guided SRS for brain metastases (Int J
 *   Radiat Oncol Biol Phys 2015): abstract, Europe PMC.
 * - ESTRO ACROP consensus guideline on SBRT for peripherally located early stage NSCLC (Radiother Oncol 2017):
 *   abstract, Europe PMC; the publisher's PDF returned 403.
 * - AAPM Task Group 101 (Med Phys 2010): abstract only; the report PDF on the AAPM site returned 403. A 2023 erratum
 *   exists and was not read.
 * - ACR-ASTRO Practice Parameter for SBRT (revised 2019; Am J Clin Oncol 2020): abstract, Europe PMC. The ACR address
 *   for the document itself served an application page with no text to a script.
 *
 * Every DOI was resolved through Europe PMC (and Crossref for the four original ones) and its title checked.
 */
export const stereotacticRadiosurgeryAndSbrtDeliverySafeguards = protocol({
  id: "stereotactic-radiosurgery-and-sbrt-delivery-safeguards",
  name: "Stereotactic radiosurgery and SBRT: planning and delivery safeguards",
  aka: ["SRS safety", "SBRT safety", "SABR safeguards", "stereotactic ablative radiotherapy", "radiosurgery checklist", "MPPG 9.b", "TG-101", "frameless radiosurgery", "Gamma Knife frame", "CyberKnife"],
  domain: "radiotherapy",
  tldr: "Stereotactic treatment gives a high dose to a small target in a small number of sessions, so accuracy matters a great deal. You are held still with a head frame or mask for the brain, or supports such as a moulded vacuum bag for the body. The team checks the plan with an independent calculation and takes images to confirm the target's position before every treatment.",
  simple: "Stereotactic radiotherapy is very precise and very strong. You are held very still, scans check your position before each treatment, and extra people check the plan.",
  summary: "AAPM-RSS MPPG 9.b (2025) sets minimum practice for linac SRS and SBRT in the United States; 'must' marks what is necessary and 'should' a prudent practice with occasional exceptions. A service must have standard operating procedures, at least two certified radiation therapists at every session (at least one trained in the technique in use), 4D CT capability for thoracic and abdominal SBRT, digital access to MRI and PET images and multi-modality image fusion. The physicist's role includes a safety checklist for the whole process and participation in an incident learning system. At simulation the therapists prepare immobilisation and document set-up after the radiation oncologist approves position, images and target localisation; CT slices must be 1 to 3 mm for SBRT and should not exceed 1.25 mm for SRS. In planning, prior target structures and plans should be made available for re-irradiation and a cumulative dose report should be generated; with multiple brain metastases and re-irradiation a naming convention must separate new from old targets (for example the MRI date); an isotropic calculation grid of 2 mm or finer should be used (1 mm may be necessary for targets of 1 cc or less or beside critical organs); the radiation oncologist should sign the reported coverage, fall-off, conformity and organ doses; an independent dose calculation and a physicist's plan and chart review must be done before treatment. At delivery a pre-treatment QA check must be done and should include a dry-run collision check where a collision is possible; target localisation must be verified before every treatment. MPPG 9.b reports MPPG 2.b as requiring the combined imaging-to-treatment isocentre coincidence and table repositioning to be within 1 mm for SRS and 1.5 mm for SBRT, tested daily when such treatments are given; its own table for C-arm linacs sets daily action limits of 1.0 mm (SRS) and 1.5 mm (SBRT) for the radiation isocentre test and 1 mm (SRS) and 2 mm (SBRT) for image-guided positioning. A qualified medical physicist must personally supervise the first session (in the treatment or control room); for later sessions direct supervision (on site and immediately available) should be provided by that physicist or one working under them. This is new in 9.b. The UK SABR Consortium resource (version 6.1, 2019, endorsed by the Royal College of Radiologists' Faculty of Clinical Oncology) covers body sites only: SABR must be image guided before each fraction, the final dose grid must be 2 mm or finer, the motion of mobile tumours must be assessed for each patient by fluoroscopy or 4D CT, and patient-specific QA measurements must be made for at least the first 10 patients. In one randomised trial of SRS for brain metastases (49 patients, 80 lesions randomised to a 1 mm or 3 mm margin), local recurrence was seen in 3 lesions (2 in the 1 mm group, P=.51) and biopsy-proven radionecrosis alone in 6 (5 in the 3 mm group, P=.10); the authors judged 1 mm more appropriate.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "radiographer", "multidisciplinary-team"],
    where: ["radiotherapy-department"],
  },
  population: "People having linac-based stereotactic radiosurgery to the brain (defined in MPPG 9.b, after the ACR, as 1 to 5 fractions to intracranial targets) or stereotactic body radiotherapy to targets outside the skull. MPPG 9.b does not address gamma-ray (such as Gamma Knife) or particle beam systems, and for ring-mounted linacs it applies to SBRT only. The UK SABR Consortium resource covers body sites, not the brain. Neither document states an age range. Disease-specific selection and doses are outside this protocol.",
  trigger: "A decision to treat with SRS or SBRT.",
  steps: [
    {
      action: "Run the service by written procedures for the major steps of the whole treatment process, with a safety checklist as a guide",
      why: "The guideline says checklists support thinking and teamwork and make care more systematic by reducing variation.",
      source: "aapm-mppg-9b-2025",
      quote: "Establishment of a comprehensive safety checklist to act as a guide for the entire treatment process, and determine appropriate methods for the clinic's QA committee to monitor the SRS-SBRT program.",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "At simulation, prepare the immobilisation, position the patient and acquire the planning images, and record the set-up only after the radiation oncologist approves the position, images and target localisation",
      why: "The guideline says the smaller margins used in stereotactic planning need immobilisation that is highly accurate and reproducible.",
      source: "aapm-mppg-9b-2025",
      quote: "For each simulation session, prepare immobilization devices, position the patient, and acquire images for treatment planning in accordance with the clinic's SRS-SBRT procedure and the patient-specific instructions, and document treatment setup parameters after the radiation oncologist has approved the positioning, images, and target localization.",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "For SBRT in the chest or abdomen, have 4D CT available and consider how breathing motion will be managed; have access to MRI and PET images and the means to fuse them",
      why: "The guideline requires breathing motion to be considered for targets in the chest and abdomen.",
      source: "aapm-mppg-9b-2025",
      quote: "Four-dimensional computed tomography (4D CT) capability (for thoracic and abdominal SBRT services).",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "For re-irradiation, make the earlier target structures and plan available to the radiation oncologist and physicist; with multiple brain metastases and re-irradiation, name targets so new and old cannot be confused, for example by adding the MRI date",
      why: "A naming rule makes clear which targets are new and which are old, and the earlier plan lets the combined dose be assessed and reported.",
      source: "aapm-mppg-9b-2025",
      quote: "In the case of multiple brain metastases and re-irradiation, a target naming convention that makes clear which targets are new and which are old must be utilized; for example, include the date of the MR scan at the end of the target structure's name.",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "Calculate the plan on an isotropic grid of 2 mm or finer; a 1 mm grid may be needed for very small targets (1 cc or less) or targets beside critical organs",
      why: "The guideline discourages a grid of 3 mm or coarser. The UK SABR Consortium also sets 2 mm or finer for the final calculation.",
      source: "aapm-mppg-9b-2025",
      quote: "The use of an isotropic calculation grid size of 2 mm or finer should be utilized.",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "Have the radiation oncologist sign the report of target coverage, dose fall-off, conformity and organ doses, then perform an independent dose calculation and a physicist's plan and chart review before treatment",
      why: "The guideline calls the check before treatment critical because of the high dose and the number of fractions used.",
      source: "aapm-mppg-9b-2025",
      quote: "An independent dose calculation check must be performed prior to treatment.",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "Before treatment, perform the defined pre-treatment QA check, including a dry run for collisions where a collision is possible",
      why: "The check may depend on the technique, and the guideline says a possible collision must be considered when beams from outside the usual plane are planned.",
      source: "aapm-mppg-9b-2025",
      quote: "This should include a “dry run” collision check where the potential for collision exists.",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "Verify the target's position before every treatment using the image-guidance method the written procedure describes, with written criteria for image guidance during treatment and for any motion management",
      why: "The guideline stresses the high dose per fraction and the critical importance of targeting accuracy.",
      source: "aapm-mppg-9b-2025",
      quote: "Pre-treatment verification of target localization must always be performed; the criteria for intra-treatment image guidance should be clearly described.",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "On days when SRS or SBRT is given, test imaging-to-treatment isocentre coincidence together with table repositioning: within 1 mm for SRS and 1.5 mm for SBRT, as MPPG 9.b reports MPPG 2.b",
      why: "Image-guidance systems must be assessed as suitable for stereotactic treatment, and this daily test is how the guideline checks that imaging and treatment line up.",
      source: "aapm-mppg-9b-2025",
      quote: "AAPM MPPG 2.b states that the composite tolerance of the imaging-treatment isocenter coincidence and table repositioning accuracy must be ≤1 mm for SRS and ≤1.5 mm for SBRT, tested daily when SRS-SBRT treatments are conducted.",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "Have at least two certified radiation therapists at every session, at least one trained in the technique in use, and a qualified medical physicist in the treatment or control room for the first session; for later sessions a physicist should be on site and immediately available",
      why: "At the first session the physicist takes part in the time-out and assesses immobilisation, imaging and, where it is used, breathing management.",
      source: "aapm-mppg-9b-2025",
      quote: "For the first treatment session the QMP must provide personal supervision of the session.",
      grade: "Minimum practice guideline (ungraded)",
    },
    {
      action: "Take part in an incident learning system that evaluates near misses and actual deviations, and tell the physicist about any unexpected side effect so its cause can be looked for if necessary",
      why: "The guideline says routine review of incidents should be used to learn from past ones.",
      source: "aapm-mppg-9b-2025",
      quote: "Facilitation and management of the clinic's participation in an incident learning system to ensure a transparent, structured evaluation of all “near miss” and actual deviations in the planning and treatment delivery process.",
      grade: "Minimum practice guideline (ungraded)",
    },
  ],
  bestInClass: {
    statement: "AAPM-RSS MPPG 9.b (2025) is the most recent and most detailed guideline read: written procedures and a safety checklist, an independent dose calculation and physicist plan review before treatment, verification of the target's position before every treatment, a daily isocentre test on treatment days (1 mm for SRS, 1.5 mm for SBRT), at least two certified therapists at every session with at least one trained in the technique, a physicist personally present at the first session, and participation in incident learning. The UK SABR Consortium resource (version 6.1, 2019), for body sites, agrees on image guidance before each fraction and a dose grid of 2 mm or finer, and adds UK standards of its own (see the variant). For brain metastases treated with image-guided linac SRS, one randomised trial's authors judged a 1 mm margin more appropriate than 3 mm. ESTRO ACROP (lung SBRT), AAPM TG-101 and the ACR-ASTRO practice parameter were read only as abstracts, so their detail could not be compared.",
    sources: ["aapm-mppg-9b-2025", "uk-sabr-consortium-2019", "kirkpatrick-2015", "estro-acrop-lung-sbrt-2017", "aapm-tg101-2010"],
  },
  variants: [
    {
      name: "Frame-based versus frameless intracranial radiosurgery",
      differs: "MPPG 9.b names frameless cranial and frame-based cranial treatment among the techniques on which the pre-treatment QA check may depend. It lists a daily laser check (1 mm) only for SRS techniques that rely on lasers for target localisation, for example frame-based SRS without X-ray image guidance, and notes that for frameless intracranial SRS open-face thermoplastic masks let the face serve as a reference surface for surface guidance. It says the written procedure should describe the supervision required for each treatment type.",
      evidence: "No comparative trial was read here; MPPG 9.b covers both techniques and does not compare them.",
      sources: ["aapm-mppg-9b-2025"],
    },
    {
      name: "UK SABR Consortium resource, version 6.1 (2019), for body sites",
      differs: "The UK document describes itself as an information resource, not an instructional document or a legal standard of care. Where MPPG 9.b says a grid of 2 mm or finer should be used, it says the final dose grid must be 2 mm or finer. It requires the motion of mobile tumours to be assessed for each patient by fluoroscopy or 4D CT, and says attempts should be made to reduce, control or mitigate breathing motion above 10 mm for lung or 5 mm for liver or abdominal sites. It adds standards MPPG 9.b does not state: contours and plans should be reviewed by two clinicians, patient-specific QA measurements must be made for at least the first 10 patients, systematic set-up uncertainty should be within 5 mm and preferably 3 mm, an external audit should take place within 6 months of starting, and a minimum of 25 patients a year is recommended to maintain expertise. The sections read do not state which staff must be present at a session. For peripheral lung tumours it recommends 18 Gy x 3 fractions where the target does not abut the chest wall and 12 Gy x 5 or 11 Gy x 5 where it abuts or overlaps it.",
      evidence: "Consensus resource of the consortium's membership, endorsed by the Faculty of Clinical Oncology of the Royal College of Radiologists; ungraded, with minimum standards marked in the text.",
      sources: ["uk-sabr-consortium-2019"],
    },
    {
      name: "ESTRO ACROP consensus for peripheral early-stage lung SBRT",
      differs: "A European consensus of 11 course faculty members and their 8 institutions identified only 8 of 57 technologies and techniques as mandatory and 32 as optional, but 12 of 24 quality assurance items as mandatory. It agreed risk-adapted doses of 3 x 15 Gy for peripherally located lesions and 4 x 12 Gy for lesions with broad chest wall contact, and said 3 x 18 Gy should be considered for patients free from severe comorbidities with a favourable long-term survival expectancy. The UK schedules above differ from these.",
      evidence: "Questionnaire-based expert consensus; read as an abstract.",
      sources: ["estro-acrop-lung-sbrt-2017", "uk-sabr-consortium-2019"],
    },
  ],
  grades: [
    { claim: "A 1 mm margin is more appropriate than 3 mm for image-guided SRS of brain metastases (the trial authors' conclusion)", grade: "Single randomised trial (49 patients, 80 metastases)", source: "kirkpatrick-2015", quote: "However, given the higher potential risk of RN with a 3-mm margin, a 1-mm GTV expansion is more appropriate." },
    { claim: "Personal physicist supervision for the first session is new in the 2025 guideline", grade: "Minimum practice guideline (ungraded)", source: "aapm-mppg-9b-2025", quote: "The new language requires personal supervision for the first treatment session of SRS-SBRT and direct treatment supervision after the initial fraction." },
    { claim: "In the UK resource, every SABR patient must be treated with online image guidance", grade: "Minimum standard (ungraded)", source: "uk-sabr-consortium-2019", quote: "All patients must be treated according to an established, comprehensive IGRT process including online image guidance." },
    { claim: "In the UK resource, the final dose grid must be 2 mm or finer", grade: "Ungraded", source: "uk-sabr-consortium-2019", quote: "Dose grid resolution on the final dose calculation must be ≤2mm." },
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
      gradingScheme: "Minimum practice guideline: 'must' marks what is necessary to conform, 'should' a prudent practice to which exceptions may occasionally be made; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "uk-sabr-consortium-2019",
      label: "Stereotactic Ablative Body Radiation Therapy (SABR): A Resource, version 6.1",
      publisher: "UK SABR Consortium, endorsed by the Faculty of Clinical Oncology of the Royal College of Radiologists",
      year: 2019,
      url: "https://www.sabr.org.uk/wp-content/uploads/2019/04/SABRconsortium-guidelines-2019-v6.1.0.pdf",
      gradingScheme: "Consensus resource; minimum standards are marked in the text; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "aapm-mppg-2b-2021",
      label: "AAPM Medical Physics Practice Guideline 2.b: commissioning and quality assurance of X-ray-based image-guided radiotherapy systems",
      publisher: "American Association of Physicists in Medicine (Journal of Applied Clinical Medical Physics)",
      year: 2021,
      url: "https://doi.org/10.1002/acm2.13346",
      doi: "10.1002/acm2.13346",
      gradingScheme: "Minimum practice guideline using 'must' and 'should'; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "kirkpatrick-2015",
      label: "Defining the optimal planning target volume in image-guided stereotactic radiosurgery of brain metastases: results of a randomized trial",
      publisher: "International Journal of Radiation Oncology, Biology, Physics (Kirkpatrick et al.)",
      year: 2015,
      url: "https://doi.org/10.1016/j.ijrobp.2014.09.004",
      doi: "10.1016/j.ijrobp.2014.09.004",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "estro-acrop-lung-sbrt-2017",
      label: "ESTRO ACROP consensus guideline on implementation and practice of stereotactic body radiotherapy for peripherally located early stage non-small cell lung cancer",
      publisher: "ESTRO ACROP (Guckenberger et al., Radiotherapy and Oncology)",
      year: 2017,
      url: "https://doi.org/10.1016/j.radonc.2017.05.012",
      doi: "10.1016/j.radonc.2017.05.012",
      gradingScheme: "Questionnaire answered by 8 institutions; the abstract reports where more than 50% of them agreed and classes items as mandatory or optional.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "aapm-tg101-2010",
      label: "Stereotactic body radiation therapy: the report of AAPM Task Group 101",
      publisher: "American Association of Physicists in Medicine (Benedict et al., Medical Physics)",
      year: 2010,
      url: "https://doi.org/10.1118/1.3438081",
      doi: "10.1118/1.3438081",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "acr-astro-sbrt",
      label: "ACR-ASTRO Practice Parameter for the Performance of Stereotactic Body Radiation Therapy (revised 2019)",
      publisher: "American College of Radiology and American Society for Radiation Oncology (American Journal of Clinical Oncology)",
      year: 2020,
      url: "https://doi.org/10.1097/coc.0000000000000706",
      doi: "10.1097/coc.0000000000000706",
      read: "abstract",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["radiosurgery-srs", "sbrt", "sabr-oligometastases", "gamma-knife", "cyberknife", "in-room-imaging-systems", "surface-guided-radiotherapy", "respiratory-motion-management", "treatment-planning-systems"],
  cancers: ["nsclc"],
  terms: ["stereotactic-radiosurgery", "sbrt-term", "brain-metastases", "planning-target-volume"],
  keyPapers: ["paper-kirkpatrick-srs-margin-trial-ijrobp-2015"],
  related: ["respiratory-motion-management-4d-ct-and-gating", "head-and-neck-radiotherapy-immobilisation-mask", "radiotherapy-patient-identification-and-time-out"],
  upgrades: [],
  gaps: [
    "On 17 November 2026 the UK SABR Consortium resource (version 6.1, January 2019) was read as full text for the first time (its general sections on quality assurance, positioning, motion, imaging, planning and verification, and its lung dose recommendations; the other site chapters were not checked); the consortium's home page still links that version as its guidance. It covers body sites only, so no UK document on intracranial radiosurgery was read, and the sections read do not say which staff must be present at a treatment session.",
    "MPPG 9.b attributes a combined limit of 1.5 mm for SBRT to MPPG 2.b. The table in MPPG 2.b, as read on 17 November 2026, prints the combined imaging-to-treatment isocentre and table positioning test with 1 mm for SRS only, and 2 mm for isocentre coincidence and for table repositioning otherwise; no 1.5 mm figure was found in it. The page gives the figure as MPPG 9.b states it.",
    "AAPM TG-101, the ESTRO ACROP lung SBRT guideline and the ACR-ASTRO practice parameter were read as abstracts only (the AAPM and publisher PDFs returned 403 on 17 November 2026, and the ACR address served no document text). A 2023 erratum to TG-101 (Medical Physics, doi 10.1002/mp.16159) exists and was not read. The ACR says it revises its parameters every five years or sooner, so a revision later than 2019 may exist; none could be confirmed.",
    "No source read sets patient-facing steps for frame placement (local anaesthetic, pin sites, frame removal) or gives evidence comparing frame-based and frameless radiosurgery.",
    "The margin trial was read as an abstract: its P values (.51 for local recurrence, .10 for radionecrosis) are given as printed, and the 1 mm conclusion is the authors' judgement on 80 lesions in 49 patients.",
    "The lung dose schedules of ESTRO ACROP (2017) and the UK SABR Consortium (2019) differ and are given as each prints them; how each prescribes the dose was not compared, and disease-specific dosing belongs with the cancer's own records.",
    "None of the safeguards is graded by its source.",
  ],
});

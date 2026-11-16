import { protocol } from "./helpers";

/*
 * Image-guided verification of the daily radiotherapy set-up: what is imaged and how often, online and offline
 * correction, tolerances and action levels, who matches the images, and the dose the imaging adds.
 *
 * This is the general protocol. The site-specific parts are separate records and are not repeated here: breast
 * positioning, prostate bladder and rectal preparation, breathing motion, stereotactic delivery, patient
 * identification, and the machine's own daily checks (all linked in `related`).
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text;
 * no summarising fetch was used for anything quoted):
 * - On target 2: updated guidance for image-guided radiotherapy (Radiotherapy Board: The Royal College of
 *   Radiologists, Society and College of Radiographers, Institute of Physics and Engineering in Medicine; 2021): full
 *   text. The RCR file address returned a web page rather than the PDF to a script, so the same PDF was read from
 *   the IPEM website (ipem.ac.uk/media/fxmkha4j/rt-board-image-guided-rt-guidance-2021.pdf) with pdftotext. Sections
 *   3 to 6, 9, 10.1 and Appendix 14.1 were read closely; the site-specific chapters (10.2 to 10.15) were not, since
 *   site rules belong to other records. It supersedes On target (2008) and the 2012 National Radiotherapy
 *   Implementation Group report; no later edition was found.
 * - AAPM Medical Physics Practice Guideline 2.b, commissioning and quality assurance of X-ray-based image-guided
 *   radiotherapy systems (J Appl Clin Med Phys 2021): full text, Europe PMC XML (PMC8425868). It is the first
 *   revision of MPPG 2.a (2014) and the current edition; AAPM reviews its guidelines on their fifth anniversary.
 * - IAEA Human Health Reports No. 16, Introduction of Image Guided Radiotherapy into Clinical Practice (Vienna,
 *   2019): full text, PDF from www-pub.iaea.org with pdftotext.
 * - ASTRO safety white paper update on IGRT (Qi et al., Pract Radiat Oncol 2023), which replaces the 2013 white
 *   paper: abstract only (Europe PMC). The publisher page returned a bot challenge and Europe PMC holds no full text.
 * - ACR-ARS Practice Parameter for IGRT (Am J Clin Oncol 2025), which revises the ACR-ASTRO parameter of 2019:
 *   abstract only. The ACR document addresses tried returned 404.
 * - AAPM Task Group 180, image guidance doses (Med Phys 2018) and AAPM Task Group 179, quality assurance for
 *   CT-based IGRT (Med Phys 2012): abstracts only; aapm.org report PDFs returned 403 or 404 to a script.
 * - ESTRO-ACROP guideline on surface guided radiation therapy (Radiother Oncol 2022): abstract only.
 *
 * None of these documents grades its recommendations by level of evidence. The grade column therefore says what kind
 * of statement each quote is (a boxed recommendation, guidance text, an AAPM "must" or "should").
 *
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text
 * with line breaks joined and end-of-line hyphenation undone, nothing else; where a sentence ends in a reference
 * marker the quote stops before it.
 */
export const imageGuidedRadiotherapyDailySetupVerification = protocol({
  id: "image-guided-radiotherapy-daily-setup-verification",
  name: "Image-guided verification of daily radiotherapy set-up: imaging, matching and correction",
  aka: ["IGRT", "image-guided radiotherapy", "image guidance", "daily imaging before radiotherapy", "treatment verification imaging", "cone-beam CT before treatment", "CBCT match", "portal imaging", "kV imaging", "image matching", "online correction", "offline correction", "no action level protocol", "couch shift", "set-up error", "on-treatment verification"],
  domain: "radiotherapy",
  tldr: "Before a radiotherapy treatment the radiographers often take a quick X-ray picture or scan on the treatment machine and compare it with the planning scan, to check that you and the area being treated are in the planned position. If the position is out, the couch is moved to correct it before the beam is switched on. How often this is done, and whether it is every day or on set days, depends on the part of the body and the type of treatment.",
  simple: "The machine takes a picture of you before treatment to check you are lying in the right place. If you are a little out, the bed moves to put it right. Your own team decides how often the pictures are taken.",
  summary: "Image guidance compares an image taken on the treatment machine with the reference image from planning and corrects the difference. No source read grades its recommendations by evidence level; the fullest current document is the UK Radiotherapy Board's On target 2 (2021), read in full, beside the IAEA's implementation report (2019) and the AAPM practice guideline on IGRT systems (MPPG 2.b, 2021). The US ASTRO white paper update (2023) and ACR-ARS practice parameter (2025) could be read only as abstracts.\n\nThe sources agree that each department needs written, site-specific protocols stating the imaging type and frequency, the structures matched, the correction rule, and what staff do when a limit is exceeded; that the imaging is prescribed by the clinical oncologist with the team; that automatic matches are checked by eye; that gross errors are investigated before treating; and that imaging dose is justified, optimised and recorded.\n\nThey differ in three places. Correction rule: On target 2 recommends no action threshold for daily couch corrections where the correction is automated (every measured shift is applied), while the IAEA describes both that approach and action-level protocols that shift only above a set figure (its example is 2 mm), and MPPG 2.b asks physicists and oncologists to set repositioning thresholds. Online or offline: On target 2 notes a shift to daily online imaging but says its site chapters still include offline protocols, which have the largest evidence base; the IAEA leaves the choice to the site treated and the department's resources. Who decides: On target 2 puts online matching with trained radiographers at the machine with an independent second check; MPPG 2.b lists timely review of images among the radiation oncologist's duties; the IAEA gives the therapist final responsibility for the change, with later offline review and approval as good practice.\n\nImaging dose: On target 2 reports cone-beam CT at approximately 1 to 5 cGy per scan and, under daily imaging, organ doses of 1 to 3% of the prescribed dose; On target 2 and AAPM TG-180 both set 5% of the prescribed or target dose as the point above which imaging dose is considered in planning. A patient's own department's protocol comes first: this page explains the check and is not a set of instructions.",
  asOf: "2026-11-16",
  setting: {
    who: ["radiographer", "doctor", "multidisciplinary-team"],
    where: ["radiotherapy-department"],
  },
  population: "Adults having external beam radiotherapy on a linear accelerator with imaging in the treatment room, for any cancer. On target 2 states that it does not cover paediatric or particle (proton) radiotherapy, though it says many of the same principles apply. Rules for particular sites (breast, prostate, lung, head and neck, stereotactic treatment) are in their own protocols and in a department's own site-specific documents, which come before anything on this page. Plan adaptation (replanning during a course) is touched on only where an image prompts it.",
  trigger: "A patient is set up on the treatment couch for a fraction of radiotherapy for which the treatment protocol calls for imaging.",
  steps: [
    {
      action: "Work to a written protocol for each treatment site that states what is imaged, how often, what is matched, and what to do with the result",
      why: "Different parts of the body move in different ways, so one rule for everyone would be too loose for some treatments and needlessly heavy for others.",
      source: "on-target-2-2021",
      quote: "Each radiotherapy centre should have in place site-specific IGRT protocols that are tailored to the needs of that site and take into account the factors affecting the accuracy of set-up.",
      grade: "Main recommendation (Radiotherapy Board consensus; no evidence grade)",
    },
    {
      action: "Have the type and frequency of imaging chosen and prescribed for each patient by the oncologist with the team",
      why: "Imaging with X-rays adds a small radiation dose, so someone accountable decides that it is worth it for this patient and this treatment.",
      source: "iaea-hhr-16-2019",
      quote: "The radiation oncologist, in consultation with the radiotherapy multidisciplinary team, chooses and prescribes the appropriate image guidance protocol.",
      grade: "Process description in an IAEA report (no grade)",
    },
    {
      action: "Set the patient up each day exactly as at the planning scan: the same preparation, the same supports and the same breathing instructions",
      why: "The image can correct where the body is, but not a different shape; comfort and the same routine keep the body in the planned shape.",
      source: "on-target-2-2021",
      quote: "Patient position and anatomy should be reproducible at daily treatment, using the same preparation, immobilisation and motion management.",
      grade: "Recommendation (Radiotherapy Board consensus; no evidence grade)",
    },
    {
      action: "Use a three-dimensional scan on the machine where it is available, and keep flat X-ray pictures for the cases the protocol names",
      why: "A scan shows soft tissue and the target itself; a flat picture mostly shows bone or markers.",
      source: "on-target-2-2021",
      quote: "3D volumetric techniques should be considered where possible because of improved contrast and for analysis and visual verification.",
      grade: "Recommendation (Radiotherapy Board consensus; no evidence grade)",
    },
    {
      action: "Look at the image as soon as it is acquired: is it good enough to judge, and is anything obviously wrong",
      why: "A poor image cannot be trusted for a match, and a large mistake should be seen before any fine adjustment is made.",
      source: "iaea-hhr-16-2019",
      quote: "It is important to assess the acquired image immediately for image quality and to determine whether it is fit for its intended purpose.",
      grade: "Guidance text in an IAEA report (no grade)",
    },
    {
      action: "Match on the anatomy the protocol names, and leave out structures that move independently of the target",
      why: "If the software matches on a bone that has rotated, such as the thigh bone, the target can be put in the wrong place even though the match looks good.",
      source: "on-target-2-2021",
      quote: "It is important not to include anatomy that could adversely affect the registration, such as the femur in patients with prostate cancer where rotation of the femurs could dominate the registration and not result in a true representation of the pelvic position, or the mandible in patients with oral cancer, which may not be stable.",
      grade: "Guidance text (section 10.1.4; not a boxed recommendation)",
    },
    {
      action: "Check every automatic match by eye before accepting it",
      why: "Matching software can lock on to the wrong structure, for example the wrong bone of the spine.",
      source: "on-target-2-2021",
      quote: "In all cases, automatic algorithms can fail, so the results should always be checked visually.",
      grade: "Guidance text (section 5.2; not a boxed recommendation)",
    },
    {
      action: "With online imaging, correct the position before the beam is switched on; where the couch correction is automated, apply the measured shift rather than waiting for it to pass a threshold (the UK position; see variants for action-level protocols)",
      why: "Correcting on the day removes both the regular error and that day's chance error, and an automatic couch move costs almost no time.",
      source: "on-target-2-2021",
      quote: "Since there is no or little workload and minimal uncertainty associated with automated patient set-up corrections, it is recommended to use no action thresholds for daily table corrections.",
      grade: "Recommendation (Radiotherapy Board consensus; no evidence grade)",
    },
    {
      action: "Confirm each shift before treating, and record the shift that was applied",
      why: "A shift entered or applied wrongly moves the treatment away from the target; the record lets the team see patterns over the course.",
      source: "iaea-hhr-16-2019",
      quote: "It is important to verify every patient shift prior to treatment delivery.",
      grade: "Guidance text in an IAEA report (no grade)",
    },
    {
      action: "If the error is gross (beyond the preset limit), do not simply shift and treat: set the patient up afresh or image again, and find the cause first",
      why: "A very large error usually means something is wrong with the set-up, the supports or the patient's condition, and moving the couch would hide it.",
      source: "on-target-2-2021",
      quote: "It is important to always investigate the source of such gross errors prior to the decision to treat.",
      grade: "Guidance text (section 6.4.2); the boxed recommendation reads 'Gross errors should always be investigated.'",
    },
    {
      action: "Look at the whole image for changes in the body, such as weight loss, a collapsed lung or a changed tumour, and tell the oncologist or hold treatment when the protocol says so",
      why: "The daily image is sometimes the first sign that the patient's condition or anatomy has changed and the plan no longer fits.",
      source: "on-target-2-2021",
      quote: "It is also imperative to detect changes that may be related to medical conditions (for example, lung collapse) and take appropriate action, such as warning the clinician or delaying treatment.",
      grade: "Guidance text (section 5.2); the boxed recommendation says such changes must be detected and reported",
    },
    {
      action: "Where an offline protocol is used, image the first three or four fractions, work out the average error, apply it as a correction to later fractions, and image weekly after that",
      why: "Averaging a few days separates the regular error, which matters most for the dose, from day-to-day chance variation.",
      source: "on-target-2-2021",
      quote: "The extended NAL protocol (eNAL) includes once-weekly imaging in addition to imaging in the first 3–4 fractions.",
      grade: "Guidance text (Appendix 14.1; not a boxed recommendation)",
    },
    {
      action: "Have the online match and correction done by radiographers who set the patient up and who are trained and assessed as competent in that technique",
      why: "The people at the machine can act at once, and delay matters because organs move with time; training keeps different staff matching the same way.",
      source: "on-target-2-2021",
      quote: "For efficiency, the online registration and correction process should, where possible, be performed by radiographers involved in the actual patient set-up.",
      grade: "Recommendation (Radiotherapy Board consensus; no evidence grade)",
    },
    {
      action: "Have a second person check the match independently for high-dose treatments given in few fractions, and ideally for all treatments",
      why: "With only a few large doses, one wrong match is a large share of the whole treatment.",
      source: "on-target-2-2021",
      quote: "An independent second check in particular for high-dose hypofractionated regimes (for example, SABR) is strongly recommended, but ideally should be done for standard fractionation regimes as this can reduce the chance of errors.",
      grade: "Guidance text, 'strongly recommended' (section 5.2)",
    },
    {
      action: "Refresh training regularly, and train again after software or equipment upgrades and for new staff",
      why: "Imaging systems and their software change, and a skill used rarely fades.",
      source: "aapm-mppg-2b-2021",
      quote: "In addition to initial training, it is important that each facility develop a periodic training review program to ensure competency on current systems and augment with training for system upgrades/changes.",
      grade: "Guidance text in an AAPM practice guideline (the sentence before it reads 'Training for the operation of the IGRT system must be provided.')",
    },
    {
      action: "Write the expected number of images and their dose, including an allowance for repeats, into the site protocol, and keep each exposure as low as gives an image fit for the task",
      why: "Each X-ray image adds a small dose to healthy tissue; planning for it in advance means it is weighed against the benefit rather than added case by case.",
      source: "on-target-2-2021",
      quote: "The expected number and dose of concomitant exposures, including scope for repeat imaging where required, should be included within site-specific protocols.",
      grade: "Guidance text (section 5.5); UK law (IR(ME)R) requires exposures to be justified and optimised",
    },
    {
      action: "Take the imaging dose into account in the treatment plan when it would exceed 5% of the treatment dose",
      why: "Below that level the imaging dose is small beside the treatment; above it, it should be counted as part of what the body receives.",
      source: "aapm-tg180-2018",
      quote: "The recommended threshold beyond which imaging dose should be considered in the treatment planning process is 5% of the therapeutic target dose.",
      grade: "Task group recommendation (abstract; no evidence grade)",
    },
    {
      action: "Do not let surface (camera) guidance stand in for imaging of the inside of the body unless the site protocol says it may",
      why: "Cameras see the skin without any radiation, but the skin does not always move with the tumour.",
      source: "on-target-2-2021",
      quote: "However, because of the poor correlation between external surface and internal anatomy in many cases, surface-based approaches are not a replacement for other forms of IGRT.",
      grade: "Guidance text (section 4.5; not a boxed recommendation)",
    },
    {
      action: "Collect the match results for each patient and each technique, and use them to check the department's margins and to audit image quality and matching",
      why: "The safety margin drawn around the target at planning is only right if it matches the errors the department actually measures.",
      source: "on-target-2-2021",
      quote: "Routine prospective IGRT data collection for the individual patient, individual treatment protocol and anatomical sites is essential to calculate systematic and random errors and inform local margins.",
      grade: "Main recommendation (Radiotherapy Board consensus; no evidence grade)",
    },
  ],
  bestInClass: {
    statement: "A written, site-specific protocol; imaging prescribed for the patient; the same set-up every day; an image fit for the task; a match on the right anatomy, checked by eye; correction before the beam; gross errors investigated before treating; trained and assessed staff with a second check for treatments in few fractions; and imaging dose justified, optimised and recorded. On these the UK Radiotherapy Board (On target 2, 2021), the IAEA (2019) and the AAPM (MPPG 2.b, 2021) agree, and none grades by evidence level. They differ on three points, and each position is shown. Action threshold: On target 2 recommends none for automated daily couch corrections; the IAEA describes zero action level and action-level protocols (example 2 mm) without choosing; MPPG 2.b asks each department to set repositioning thresholds. Online or offline: On target 2 describes a shift towards daily online imaging while its site chapters keep offline protocols, which it says have the largest evidence base; the IAEA says the choice depends on the site and the department's resources. Who matches and who reviews: On target 2 gives online matching to competent radiographers with an independent second check; MPPG 2.b lists timely review of images as a radiation oncologist's responsibility; the IAEA gives the therapist final responsibility for the change with later offline review and approval. The current US documents on clinical practice (ASTRO 2023, ACR-ARS 2025) were read as abstracts only, so their detailed positions on frequency and review are not stated here.",
    sources: ["on-target-2-2021", "iaea-hhr-16-2019", "aapm-mppg-2b-2021", "astro-igrt-white-paper-2023", "acr-ars-igrt-2025"],
  },
  variants: [
    {
      name: "Action-level online protocol",
      differs: "The couch is moved only when the measured error is larger than a set figure, instead of applying every measured shift. The IAEA report describes it beside the zero action level approach: \"This is by way of contrast to action level protocols, where shifts are only applied if they are larger than a predetermined action level (e.g. 2 mm)\". MPPG 2.b lists setting repositioning thresholds among the duties of the physicist and the radiation oncologist.",
      evidence: "Neither document grades the choice. On target 2 recommends no action threshold where the couch correction is automated, on the grounds of little workload and minimal uncertainty; it keeps tolerances for errors that are not corrected, such as rotations, and says such values should be determined for each treatment site and protocol.",
      sources: ["iaea-hhr-16-2019", "aapm-mppg-2b-2021", "on-target-2-2021"],
    },
    {
      name: "Offline correction: no action level, extended no action level and shrinking action level",
      differs: "Images are taken on selected fractions and analysed after treatment, and the average error is applied to later fractions. On target 2 describes the no action level approach as calculating the systematic error after 3 to 4 fractions and correcting its whole magnitude, suggests correcting only systematic errors above 2 mm, and adds weekly imaging in the extended form. The IAEA figures show imaging for typically three successive fractions. In the shrinking action level approach the running average is compared with a limit that falls as more fractions are imaged.",
      evidence: "The IAEA report: \"Random deviations can only be corrected for with an on-line IGRT protocol.\" and \"Off-line correction protocols are therefore most suitable when the ratio of random to systematic deviation is small.\" On target 2 says offline protocols may be used depending on accuracy requirements and can reduce resources on the treatment unit, that its site-specific protocols still include them and that they have the largest evidence base so far, and that the no action level protocol does not act on gross errors, which should be corrected before a further fraction is given.",
      sources: ["on-target-2-2021", "iaea-hhr-16-2019"],
    },
    {
      name: "Review and approval of images by the radiation oncologist (United States practice documents)",
      differs: "MPPG 2.b lists among the radiation oncologist's responsibilities specifying imaging modalities and frequencies, identifying registration targets and repositioning thresholds, and conducting a timely review of clinical IGRT images; the therapist acquires positioning images for review by the therapist or the radiation oncologist. The IAEA report: \"In the on-line process, subsequent off-line review and approval of the images acquired according to the on-line protocol is a good practice to establish the types and sizes of effect, plus any trends, and to deduce possible causes.\"",
      evidence: "MPPG 2.b states that its staff responsibilities follow the ACR-ASTRO practice guideline for IGRT, whose 2025 ACR-ARS revision could be read only as an abstract. On target 2 instead places the online decision with trained radiographers and warns that without appropriate competency more cases would be referred to the clinician, delaying the process. No comparative study of the two models was read.",
      sources: ["aapm-mppg-2b-2021", "iaea-hhr-16-2019", "on-target-2-2021", "acr-ars-igrt-2025"],
    },
    {
      name: "Flat X-ray (planar) imaging instead of a scan",
      differs: "Two flat X-ray images, or megavoltage portal images, are matched on bone or implanted markers rather than a cone-beam CT matched on soft tissue.",
      evidence: "On target 2 says a cone-beam CT always yields more clinical information but that this may not translate into greater accuracy, so planar imaging can still be justified in a limited number of cases, giving short-course palliative treatment as its example. The IAEA report gives megavoltage portal imaging doses of the order of 10 cGy per image against the order of 1 cGy for kilovoltage cone-beam CT.",
      sources: ["on-target-2-2021", "iaea-hhr-16-2019"],
    },
    {
      name: "Surface guidance for set-up and monitoring",
      differs: "Cameras track the skin surface to help the first set-up and to watch for movement during treatment, with no radiation dose.",
      evidence: "On target 2 says surface systems can help initial set-up and give real-time monitoring but are not a replacement for other forms of IGRT because the surface often correlates poorly with internal anatomy. The ESTRO-ACROP guideline on surface guided radiation therapy (2022) gives recommendations on roles, commissioning and quality assurance; only its abstract was read.",
      sources: ["on-target-2-2021", "estro-acrop-sgrt-2022"],
    },
    {
      name: "Frequency of the machine check that the imaging and treatment centres coincide",
      differs: "MPPG 2.b prefers a daily check of imaging and treatment isocentre coincidence and couch repositioning (2 mm; 1 mm for radiosurgery) but accepts weekly checks for systems used with standard fractionation, and requires the check on days when stereotactic procedures are scheduled.",
      evidence: "MPPG 2.b: \"While daily checks of these parameters are preferred, weekly checks are considered acceptable for IGRT systems used with standard fractionation schemes.\" The machine checks themselves are in the linear accelerator quality assurance protocol.",
      sources: ["aapm-mppg-2b-2021"],
    },
  ],
  grades: [
    { claim: "Frequency, dose and complexity of imaging should reflect intent, site and fractionation", grade: "Main recommendation (Radiotherapy Board consensus; no evidence grade)", source: "on-target-2-2021", quote: "The frequency, imaging dose and complexity of the IGRT process should reflect the treatment intent, anatomical site and fractionation (as detailed in the site-specific guidance in Section 10)." },
    { claim: "No action threshold for automated daily couch corrections (UK)", grade: "Recommendation (Radiotherapy Board consensus; no evidence grade)", source: "on-target-2-2021", quote: "Since there is no or little workload and minimal uncertainty associated with automated patient set-up corrections, it is recommended to use no action thresholds for daily table corrections." },
    { claim: "Zero action level protocols apply every shift (IAEA describes both approaches)", grade: "Description in an IAEA report (no grade)", source: "iaea-hhr-16-2019", quote: "In zero action level protocols, the shift is applied to the patient set-up irrespective of the size of the shift." },
    { claim: "The choice of online or offline depends on the site and the department's resources (IAEA)", grade: "Guidance text in an IAEA report (no grade)", source: "iaea-hhr-16-2019", quote: "The decision of which to use depends on the site being treated and departmental resources, including the need to balance treatment accuracy with workload and expertise." },
    { claim: "Daily online imaging can often be justified (UK)", grade: "Guidance text (section 10.1; not a boxed recommendation)", source: "on-target-2-2021", quote: "Daily online IGRT can often be justified depending on clinical requirements and taking the additional time spent on the treatment unit into consideration." },
    { claim: "Gross errors are always investigated", grade: "Recommendation (Radiotherapy Board consensus; no evidence grade)", source: "on-target-2-2021", quote: "Gross errors should always be investigated." },
    { claim: "Staff training on the imaging system", grade: "must (AAPM practice guideline wording)", source: "aapm-mppg-2b-2021", quote: "Training for the operation of the IGRT system must be provided." },
    { claim: "Imaging dose measured at least annually for each mode of clinical operation", grade: "must (AAPM practice guideline wording)", source: "aapm-mppg-2b-2021", quote: "The imaging dose from an IGRT system must be measured at least annually for at least one acquisition technique of each mode of clinical operation." },
    { claim: "Imaging dose is considered in planning above 5% of the prescribed dose (UK)", grade: "Guidance text (section 5.5; not a boxed recommendation)", source: "on-target-2-2021", quote: "In cases such as this, the imaging dose should be considered in the treatment planning process if it exceeds 5% of the prescribed dose." },
    { claim: "Imaging dose is considered in planning above 5% of the therapeutic target dose (US)", grade: "Task group recommendation (abstract; no evidence grade)", source: "aapm-tg180-2018", quote: "The recommended threshold beyond which imaging dose should be considered in the treatment planning process is 5% of the therapeutic target dose." },
    { claim: "Imaging doses are justified, prescribed and reported", grade: "Summary statement in an IAEA report (no grade)", source: "iaea-hhr-16-2019", quote: "In summary, it is important that IGRT imaging doses are justified, prescribed and reported." },
    { claim: "A quality assurance programme built on established guidance is required (US)", grade: "Consensus white paper (abstract; statements reached consensus at 75% agreement or more)", source: "astro-igrt-white-paper-2023", quote: "A comprehensive quality-assurance program must be developed, using established guidance, to ensure IGRT is performed in a safe and effective manner." },
    { claim: "Image guidance complements other quality assurance (US)", grade: "Practice parameter (abstract; no evidence grade)", source: "acr-ars-igrt-2025", quote: "IGRT should complement and be used in combination with other quality assurance processes." },
  ],
  sources: [
    {
      key: "on-target-2-2021",
      label: "On target 2: updated guidance for image-guided radiotherapy",
      publisher: "Radiotherapy Board (The Royal College of Radiologists, Society and College of Radiographers, Institute of Physics and Engineering in Medicine)",
      year: 2021,
      url: "https://www.ipem.ac.uk/media/fxmkha4j/rt-board-image-guided-rt-guidance-2021.pdf",
      gradingScheme: "Consensus guidance with boxed recommendations at the end of each section; recommendations are not graded by level of evidence.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "iaea-hhr-16-2019",
      label: "Introduction of Image Guided Radiotherapy into Clinical Practice (IAEA Human Health Reports No. 16)",
      publisher: "International Atomic Energy Agency",
      year: 2019,
      url: "https://www-pub.iaea.org/MTCD/Publications/PDF/P1827_web.pdf",
      gradingScheme: "Implementation guidance written by invited experts; no recommendation grades.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "aapm-mppg-2b-2021",
      label: "AAPM Medical Physics Practice Guideline 2.b: commissioning and quality assurance of X-ray-based image-guided radiotherapy systems (McCullough et al.)",
      publisher: "American Association of Physicists in Medicine (Journal of Applied Clinical Medical Physics)",
      year: 2021,
      url: "https://doi.org/10.1002/acm2.13346",
      doi: "10.1002/acm2.13346",
      gradingScheme: "AAPM practice guideline stating minimum acceptable practice standards in 'must' and 'should' wording; no evidence grades.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "astro-igrt-white-paper-2023",
      label: "Quality and Safety Considerations in Image Guided Radiation Therapy: An ASTRO Safety White Paper Update (Qi et al.)",
      publisher: "American Society for Radiation Oncology (Practical Radiation Oncology)",
      year: 2023,
      url: "https://doi.org/10.1016/j.prro.2022.09.004",
      doi: "10.1016/j.prro.2022.09.004",
      gradingScheme: "Consensus statements; consensus was defined as 75% or more of the task force choosing 'strongly agree' or 'agree' on a 5-point scale. No evidence grades.",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "acr-ars-igrt-2025",
      label: "ACR-ARS Practice Parameter for Image-Guided Radiation Therapy (IGRT) (Garsa et al.)",
      publisher: "American College of Radiology and American Radium Society (American Journal of Clinical Oncology)",
      year: 2025,
      url: "https://doi.org/10.1097/coc.0000000000001220",
      doi: "10.1097/coc.0000000000001220",
      gradingScheme: "Practice parameter developed by the ACR process; no evidence grades.",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "aapm-tg180-2018",
      label: "Image guidance doses delivered during radiotherapy: quantification, management, and reduction. Report of the AAPM Therapy Physics Committee Task Group 180 (Ding et al.)",
      publisher: "American Association of Physicists in Medicine (Medical Physics)",
      year: 2018,
      url: "https://doi.org/10.1002/mp.12824",
      doi: "10.1002/mp.12824",
      gradingScheme: "Task group report; recommendations not graded.",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "aapm-tg179-2012",
      label: "Quality assurance for image-guided radiation therapy utilizing CT-based technologies: a report of the AAPM TG-179 (Bissonnette et al.)",
      publisher: "American Association of Physicists in Medicine (Medical Physics)",
      year: 2012,
      url: "https://doi.org/10.1118/1.3690466",
      doi: "10.1118/1.3690466",
      gradingScheme: "Task group report with test frequencies and tolerances; no evidence grades.",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "estro-acrop-sgrt-2022",
      label: "ESTRO-ACROP guideline on surface guided radiation therapy (Freislederer et al.)",
      publisher: "European Society for Radiotherapy and Oncology (Radiotherapy and Oncology)",
      year: 2022,
      url: "https://doi.org/10.1016/j.radonc.2022.05.026",
      doi: "10.1016/j.radonc.2022.05.026",
      gradingScheme: "Consensus guideline; no evidence grades stated in the abstract.",
      read: "abstract",
      accessed: "2026-11-16",
    },
  ],
  technologies: ["in-room-imaging-systems", "imrt-igrt"],
  terms: ["radiotherapy", "imrt-term", "planning-target-volume", "fiducial-markers"],
  related: [
    "breast-radiotherapy-positioning-and-setup",
    "prostate-radiotherapy-bladder-and-rectal-preparation",
    "respiratory-motion-management-4d-ct-and-gating",
    "stereotactic-radiosurgery-and-sbrt-delivery-safeguards",
    "radiotherapy-patient-identification-and-time-out",
    "linear-accelerator-quality-assurance",
    "head-and-neck-radiotherapy-immobilisation-mask",
    "breath-hold-left-breast-radiotherapy",
    "radiotherapy-planning-ct-simulation",
    "surface-guided-radiotherapy",
    "adaptive-radiotherapy",
  ],
  upgrades: [],
  gaps: [
    "No document read grades its image guidance recommendations by level of evidence, and none cites a randomised comparison of daily online imaging against an offline protocol for all sites; On target 2 says offline protocols have the largest evidence base so far.",
    "The ASTRO safety white paper update on IGRT (2023), the ACR-ARS practice parameter (2025), AAPM Task Group 180 on imaging dose (2018), AAPM Task Group 179 on CT-based image guidance (2012) and the ESTRO-ACROP surface guidance guideline (2022) could be read only as abstracts, because the publisher and society pages refused a script. The detailed United States position on imaging frequency, on physician review intervals and on documentation is therefore not stated here.",
    "No general ESTRO guideline on image guidance for all sites was found; ESTRO-ACROP guidance is written site by site (breast, prostate, head and neck, lung stereotactic treatment) and is cited in those protocols.",
    "Numerical tolerances and action levels are site-specific and are set locally from a department's own measured errors; the general documents read give examples (2 mm) and not a table for all sites. The site-specific chapters of On target 2 (10.2 to 10.15) were not read closely for this record.",
    "On target 2 says national dose reference levels for cone-beam CT verification imaging were to follow those for planning CT; whether they have since been published was not checked.",
    "On target 2 does not cover children or particle (proton) radiotherapy, and no paediatric image guidance document was read. Imaging dose matters more in children, and this page does not say how often a child should be imaged.",
    "MR-guided and online adaptive radiotherapy, where the plan is changed on the day, are outside this record apart from the point at which an image prompts a replan.",
  ],
});

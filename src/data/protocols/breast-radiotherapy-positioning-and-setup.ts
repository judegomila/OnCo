import { protocol } from "./helpers";

/*
 * Breast and chest wall radiotherapy: patient position, immobilisation, skin marks and daily set-up verification.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ESTRO-ACROP guideline for positioning, immobilisation and setup verification for local and loco-regional photon
 *   breast cancer irradiation (Mast et al., Tech Innov Patient Support Radiat Oncol 2023;28:100219): full text, Europe
 *   PMC full-text XML (PMC10511493), stripped to text and searched. The guideline separates "recommendations" (proposed
 *   where the evidence supported them) from "considerations" (relevant practice the evidence could not support); that
 *   label is quoted as the grade. Its literature search ran to January 2019, with later papers added by the authors.
 * - ESTRO-ACROP breath-hold guideline (Aznar et al., Radiother Oncol 2023): full text, as read for the breath-hold
 *   protocol (breath-hold-left-breast-radiotherapy).
 * - NICE NG101 recommendations page (HTML, full text), for the breath-hold recommendation only.
 *
 * No newer ESTRO, ASTRO or RCR guideline on breast set-up was found. The DOI was resolved through Europe PMC and its
 * title checked. Quotes are copied from the raw text unchanged.
 */
export const breastRadiotherapyPositioningAndSetup = protocol({
  id: "breast-radiotherapy-positioning-and-setup",
  name: "Breast radiotherapy positioning, immobilisation and daily set-up verification",
  aka: ["breast radiotherapy set-up", "breast board", "breast positioning for radiotherapy", "radiotherapy skin marks", "radiotherapy tattoos", "breast IGRT", "breast image guidance", "prone breast radiotherapy", "chest wall radiotherapy set-up"],
  domain: "radiotherapy",
  tldr: "For breast or chest wall radiotherapy you usually lie on your back on a sloping board with both arms above your head, in the same position every day. Skin marks or a camera that maps your skin help line you up, and X-ray images, ideally daily, check your position before treatment. If lifting both arms is too hard, one arm up is an option; some departments treat larger breasts lying face down.",
  simple: "You lie the same way every day, usually on your back with your arms above your head. Small marks or cameras help line you up, and quick X-rays check you are in the right place.",
  summary: "The ESTRO-ACROP guideline (2023) is the only international guideline on breast set-up. Its recommendations: supine as the standard position for most treatments (it works with surface guidance); prone considered for larger breasts or more lung sparing where the equipment, expertise and patient tolerance allow; both arms up as more stable (one randomised study), one arm up for those who cannot tolerate it; flat or inclined boards both acceptable if collision risk is managed. There is insufficient evidence for any breast immobilisation device; bras or thermoplastic moulds may help selected patients with large or pendulous breasts, with skin dose evaluated locally.\n\nWithout surface-guided imaging, skin marks are required; the options (permanent tattoo, temporary marks) should be discussed with the patient, and the guideline notes that temporary marks may affect wellbeing less. For verification it recommends daily 2D-2D or 3D online imaging where available, matching on the bony anatomy under the treated volume and the breast tissue or contour, and warns against using surface guidance as the only verification without local validation, especially for partial-breast or boost treatment. Most of its statements rest on small studies; several are labelled considerations because the evidence could not support a recommendation. Breath-hold for left-sided treatment is a separate protocol.",
  asOf: "2026-11-11",
  setting: {
    who: ["radiographer", "patient-or-carer"],
    where: ["radiotherapy-department"],
  },
  population: "Adults having external beam photon radiotherapy to the whole breast, partial breast or chest wall, with or without regional lymph nodes, after lumpectomy or mastectomy. Proton therapy, upright radiotherapy, MR-linac treatment and intrafraction motion are outside the guideline's scope and are not covered.",
  trigger: "The planning CT appointment and each treatment session.",
  steps: [
    {
      action: "Position the patient lying on their back for most breast and chest wall treatments",
      why: "Lying on the back is the simplest position to repeat each day and lets surface cameras see the breast.",
      source: "estro-acrop-breast-positioning-2023",
      quote: "Based on the literature and the current equipment we recommend the supine position as the standard for most treatments, see the recommendations when prone positioning is advised below.",
      grade: "Recommendation",
    },
    {
      action: "Consider lying face down (prone) for larger breasts or when more lung sparing is needed, if the department has the equipment and experience and the patient can tolerate it",
      why: "Lying face down lets a large breast fall away from the chest, which can even out the dose and spare the lung and skin folds.",
      source: "estro-acrop-breast-positioning-2023",
      quote: "For patients with larger breasts or patients that require a higher degree of lung sparing, prone may be considered if the equipment and expertise are available, and the patient can tolerate the position.",
      grade: "Recommendation",
    },
    {
      action: "Raise both arms above the head where the patient can; use one arm up if they cannot",
      why: "Both arms up is steadier from day to day, but after surgery some people cannot lift both arms for long.",
      source: "estro-acrop-breast-positioning-2023",
      quote: "Both arms up are considered more stable from one randomised study, in this study significantly lower translational displacements were found.",
      grade: "Recommendation",
    },
    {
      action: "Use a breast board indexed to the couch, flat or inclined, with the patient stable and comfortable",
      why: "A board that clicks into the same place on the couch every day makes the position easier to repeat.",
      source: "estro-acrop-breast-positioning-2023",
      quote: "While lacking formal evidence, anecdotally the authors strongly advise the use of positioning aids, e.g., supine breast boards, which can be indexed to both the treatment couch and skin reference marks for efficient and accurate patient positioning.",
      grade: "Consideration (no formal evidence)",
    },
    {
      action: "Do not adopt a breast immobilisation device routinely; consider a treatment bra or mould only for selected patients with large or pendulous breasts, and check its effect on skin dose",
      why: "No device has been shown to help most people, and anything resting on the breast can raise the skin dose and make skin reactions worse.",
      source: "estro-acrop-breast-positioning-2023",
      quote: "There is currently insufficient evidence to support the widespread adoption of any specific type of immobilisation device of the breast.",
      grade: "Recommendation",
    },
    {
      action: "Without surface-guided imaging, use skin marks for set-up, and discuss with the patient whether these are permanent tattoos or temporary marks",
      why: "Marks are needed to line the body up before imaging; permanent tattoos stay for life, and some people find them a lasting reminder of their cancer.",
      source: "estro-acrop-breast-positioning-2023",
      quote: "The available options for skin marking should be discussed taking into account long-term patient experience and patient preference.",
      grade: "Recommendation",
    },
    {
      action: "Verify the position with 2D-2D or 3D imaging online, every day where available",
      why: "Daily images before treatment catch a shift in position and allow it to be corrected before the radiation is given.",
      source: "estro-acrop-breast-positioning-2023",
      quote: "Where available, 2D-2D or 3D imaging daily is recommended for online position verification.",
      grade: "Recommendation",
    },
    {
      action: "Where only single 2D images are available, allow for the errors they cannot show with suitable margins",
      why: "A single flat image cannot see a shift towards or away from the camera.",
      source: "estro-acrop-breast-positioning-2023",
      quote: "If 2D-2D or 3D position verification is not available, the limitations of 2D position verification (online or offline) in visualising out-of-plane setup errors should be considered and appropriate target volume margins employed.",
      grade: "Recommendation",
    },
    {
      action: "Match the images on both the bones under the treated area and the breast tissue or breast outline",
      why: "The breast can move and change shape relative to the ribs, so matching on bone alone can miss it.",
      source: "estro-acrop-breast-positioning-2023",
      quote: "Image-matching should evaluate bony anatomy directly underlying the treated volume as well as breast tissue or external breast contour.",
      grade: "Recommendation",
    },
    {
      action: "Do not use surface guidance as the only check until the department has shown locally that it agrees with X-ray imaging, and take particular care with partial-breast or boost treatment",
      why: "Cameras see the skin, not the surgical bed inside the breast, which is what a partial-breast or boost treatment aims at.",
      source: "estro-acrop-breast-positioning-2023",
      quote: "SGRT should not be used as a sole means of position verification without centres first conducting a local study to validate consistent agreement with the pre-existing IGRT modality.",
      grade: "Recommendation",
    },
    {
      action: "For left-sided treatment, add breath-hold to reduce the heart dose (see the breath-hold protocol)",
      why: "Holding a deep breath moves the heart away from the treated area.",
      source: "nice-ng101",
      quote: "Use a deep inspiratory breath-hold radiotherapy technique for people with left-sided breast cancer to reduce the dose to the heart.",
      grade: "[2018]",
    },
  ],
  bestInClass: {
    statement: "Supine on an indexed breast board with both arms up where tolerated, no routine breast immobilisation device, skin marks (permanent or temporary, chosen with the patient) unless surface guidance replaces them, and daily online 2D-2D or 3D imaging matched on bone and breast tissue, with surface guidance used alone only after local validation (ESTRO-ACROP 2023). Prone treatment is an option for larger breasts or extra lung sparing where expertise exists; for left-sided cancer the heart is better spared by supine breath-hold (HeartSpare IB, in the breath-hold protocol). ESTRO-ACROP is the only guideline read on this subject, so there is no second guideline to set beside it; its authors say most of the underlying studies are small and old.",
    sources: ["estro-acrop-breast-positioning-2023", "estro-acrop-breath-hold-2023"],
  },
  variants: [
    {
      name: "Prone positioning",
      differs: "The patient lies face down on a dedicated board with the treated breast hanging through an opening.",
      evidence: "ESTRO-ACROP: improves dose homogeneity and can reduce lung and skin-fold dose, but is harder to implement and needs a dedicated team; most supine-prone comparisons are more than 10 years old; no predictor tells which patients do better prone.",
      sources: ["estro-acrop-breast-positioning-2023"],
    },
    {
      name: "One arm up",
      differs: "Only the arm on the treated side is raised, the other resting at the side or across the waist.",
      evidence: "Cohort studies report it as more comfortable; one randomised study found both arms up more stable. ESTRO-ACROP allows one arm up for patients who cannot tolerate both.",
      sources: ["estro-acrop-breast-positioning-2023"],
    },
    {
      name: "Temporary skin marks instead of permanent tattoos",
      differs: "Set-up marks are drawn or applied semi-permanently and renewed during the course, so no lifelong tattoo remains.",
      evidence: "ESTRO-ACROP cites a randomised study (176 against 166 patients) that found no significant difference in random or systematic set-up error between tattoos and non-permanent marks on weekly portal imaging, and a qualitative study (SuPPORT 4 All) reporting that permanent tattoos may affect wellbeing. It lists temporary marks as a consideration.",
      sources: ["estro-acrop-breast-positioning-2023"],
    },
    {
      name: "Surface-guided set-up without skin marks",
      differs: "An optical surface imaging system positions the patient against their planning surface, with no tattoos or marks.",
      evidence: "ESTRO-ACROP: SGRT may improve set-up accuracy and allow marks to be omitted, but must be validated in the department's own workflow, and should not replace X-ray verification without local validation.",
      sources: ["estro-acrop-breast-positioning-2023"],
    },
    {
      name: "Treatment bra or thermoplastic breast mould",
      differs: "A fabric bra or moulded shell holds a large or pendulous breast in a fixed shape.",
      evidence: "ESTRO-ACROP: may benefit selected patients; in one free-breathing study a bra reduced mean heart dose from 4.9 to 1.4 Gy but phantom measurements found skin dose about 1.5 times higher with it; the effect on skin toxicity must be evaluated locally.",
      sources: ["estro-acrop-breast-positioning-2023"],
    },
  ],
  grades: [
    { claim: "Supine as the standard position for most treatments", grade: "Recommendation", source: "estro-acrop-breast-positioning-2023" },
    { claim: "Without surface guided imaging, skin marking is required", grade: "Recommendation (summary table)", source: "estro-acrop-breast-positioning-2023", quote: "In the absence of surface guided imaging, the use of skin marking is required." },
    { claim: "Temporary skin marks may be an alternative to permanent tattoos with less impact on wellbeing", grade: "Consideration", source: "estro-acrop-breast-positioning-2023", quote: "Temporary skin marks may be an alternative to permanent tattoos with a lesser impact on patient well-being" },
    { claim: "Daily 2D-2D or 3D online position verification where available", grade: "Recommendation", source: "estro-acrop-breast-positioning-2023" },
    { claim: "SGRT should not replace standard image guidance without local validation, with particular caution for partial-breast and integrated-boost treatment", grade: "Recommendation (summary table)", source: "estro-acrop-breast-positioning-2023", quote: "SGRT should not replace standard image-guidance without local validation and particular caution to partial-breast/integrated-boost treatments." },
  ],
  sources: [
    {
      key: "estro-acrop-breast-positioning-2023",
      label: "ESTRO-ACROP guideline for positioning, immobilisation and setup verification for local and loco-regional photon breast cancer irradiation",
      publisher: "ESTRO (Technical Innovations and Patient Support in Radiation Oncology; Mast et al.)",
      year: 2023,
      url: "https://doi.org/10.1016/j.tipsro.2023.100219",
      doi: "10.1016/j.tipsro.2023.100219",
      gradingScheme: "Two labels, no levels: recommendations, proposed where the evidence supported them, and considerations, practice the authors judged relevant but the evidence could not support.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "estro-acrop-breath-hold-2023",
      label: "ESTRO-ACROP guideline: Recommendations on implementation of breath-hold techniques in radiotherapy",
      publisher: "ESTRO (Radiotherapy and Oncology; Aznar et al.)",
      year: 2023,
      url: "https://doi.org/10.1016/j.radonc.2023.109734",
      doi: "10.1016/j.radonc.2023.109734",
      gradingScheme: "Not graded: expert consensus.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nice-ng101",
      label: "Early and locally advanced breast cancer: diagnosis and management (NG101), recommendations",
      publisher: "NICE",
      year: 2018,
      url: "https://www.nice.org.uk/guidance/ng101/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or updated.",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  cancers: ["breast-cancer"],
  technologies: ["surface-guided-radiotherapy", "in-room-imaging-systems", "imrt-igrt"],
  terms: ["radiotherapy", "imrt-term", "post-mastectomy-radiotherapy"],
  related: ["breath-hold-left-breast-radiotherapy"],
  upgrades: ["idea-pu-tattoo-free-set-up"],
  gaps: [
    "Only one guideline addresses breast set-up (ESTRO-ACROP 2023), and its literature search closed in January 2019; its authors describe the evidence as limited and the studies as small. No ASTRO or RCR guideline on the same subject was found.",
    "No action threshold (how many millimetres of shift should trigger a correction) is given by the guideline; departments set their own, and none was read.",
    "The RCR guidance on image-guided radiotherapy (On Target 2) could not be found on the RCR website on 11 November 2026 (the expected page returned 404) and was not read; AAPM Task Groups 142 and 179 are paywalled and were not read.",
    "Whether permanent tattoos can be dropped without loss of accuracy rests, in the guideline, on one randomised study with weekly portal imaging and one qualitative study; neither was read directly.",
    "Intrafraction motion and respiratory motion were excluded from the guideline's scope.",
  ],
});

import { protocol } from "./helpers";

/*
 * Deep inspiration breath-hold (DIBH) for left-sided breast radiotherapy: selection, coaching, planning scan, daily
 * verification.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ESTRO-ACROP guideline: recommendations on implementation of breath-hold techniques in radiotherapy (Aznar et al.,
 *   Radiother Oncol 2023;185:109734): full text. The publisher PDF returned an HTML page to a script; the open-access
 *   (CC BY) published version was read from the Universitat Autonoma de Barcelona repository copy listed by Unpaywall
 *   (ddd.uab.cat/pub/artpub/2023/301111/301111.pdf) with pdftotext. The guideline is a consensus of experts and does not
 *   grade its recommendations.
 * - NICE NG101, Early and locally advanced breast cancer, recommendations page (HTML, full text): 1.13.2 [2018].
 * - RCR, Postoperative radiotherapy for breast cancer: UK consensus statements (November 2016): full text PDF from
 *   rcr.ac.uk. Statements carry the share of 48 centres that voted for them.
 * - ESTRO-ACROP guideline for positioning, immobilisation and setup verification in breast irradiation (Mast et al.,
 *   2023): full text, Europe PMC XML (PMC10511493). It leaves breath-hold technique to the guideline above.
 * - HeartSpare (Bartlett et al., Radiother Oncol 2013), HeartSpare stage IB (Bartlett et al., Radiother Oncol 2015),
 *   BRAVEHeart (Byrne et al., Adv Radiat Oncol 2024) and Darby et al. (N Engl J Med 2013): abstracts only, Europe PMC.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and end-of-line hyphens undone, nothing else; sentences that the PDF renders with doubled single quotes in
 * place of quotation marks were not quoted.
 */
export const breathHoldLeftBreastRadiotherapy = protocol({
  id: "breath-hold-left-breast-radiotherapy",
  name: "Deep inspiration breath-hold for left-sided breast radiotherapy",
  aka: ["DIBH", "deep inspiration breath hold", "breath-hold radiotherapy", "voluntary breath-hold", "heart-sparing breast radiotherapy", "active breathing coordinator", "ABC breath-hold", "gated breast radiotherapy"],
  domain: "radiotherapy",
  tldr: "For radiotherapy to the left breast or chest wall, you take a deep breath and hold it for about 20 to 30 seconds during each part of the treatment. Filling the lungs moves the heart away from the treated area, so it gets less radiation. You practise first, and the planning scan is done holding your breath. If breath-holding does not suit you, treatment while breathing normally is still safe.",
  simple: "You hold a deep breath for about half a minute while the machine is on. This moves your heart away from the radiation. You practise first and the team watches your breathing on a screen.",
  summary: "NICE NG101 1.13.2 [2018] recommends a deep inspiratory breath-hold technique for people with left-sided breast cancer to reduce heart dose; the RCR UK consensus (2016) supported, unanimously, that every department have a breath-hold technique available and, very strongly, a mean heart dose under 2 Gy for more than 90% of left-sided patients not having internal mammary chain treatment. The rationale is dose: the Darby case-control study found major coronary events rose by 7.4% per gray of mean heart dose with no threshold.\n\nThe ESTRO-ACROP implementation guideline (2023, ungraded expert consensus) sets out the practice: coach the patient before the planning CT, aim for a comfortable rather than maximal breath-hold (about 20 to 30 seconds is achievable for more than 90% of breast patients), plan on a CT taken in breath-hold with the same monitoring equipment used on the treatment machine, verify both patient position and breath-hold level with imaging, ideally daily, and be able to re-image and re-plan if the breathing pattern changes. It does not recommend a routine extra free-breathing planning CT beyond the implementation stage, because of the added dose.\n\nVoluntary breath-hold without equipment was as reproducible and heart-sparing as a spirometry device (ABC) in the HeartSpare randomised crossover study, quicker and preferred by patients and radiographers; in larger-breasted women it gave lower heart and coronary artery doses than prone free-breathing (HeartSpare IB). Surface tracking with visual feedback is common; one small randomised trial of chest-surface versus abdominal-block feedback found no difference in accuracy.",
  asOf: "2026-11-11",
  setting: {
    who: ["radiographer", "doctor", "patient-or-carer"],
    where: ["radiotherapy-department"],
  },
  population: "Adults having radiotherapy to the left breast or chest wall, with or without the regional lymph nodes, after surgery for early or locally advanced breast cancer. NICE found no evidence for right-sided breast cancer and made no recommendation for it; the RCR consensus adds patients having internal mammary chain radiotherapy on either side. Breath-hold for lung, lymphoma and upper abdominal tumours follows the same guideline but with different selection and imaging rules, and is not covered here.",
  trigger: "A decision to give radiotherapy to the left breast or chest wall, before the planning CT is booked.",
  steps: [
    {
      action: "Offer a breath-hold technique to everyone having radiotherapy to the left breast or chest wall",
      why: "Holding a deep breath moves the heart away from the treated area and lowers the heart dose, and heart damage from radiotherapy rises with every unit of dose it receives.",
      source: "nice-ng101",
      quote: "Use a deep inspiratory breath-hold radiotherapy technique for people with left-sided breast cancer to reduce the dose to the heart.",
      grade: "[2018]",
    },
    {
      action: "Coach the patient in the breath-hold before the planning CT, show them the equipment and agree how staff will talk to them during it",
      why: "People who have practised hold their breath more steadily, and steady breath-holds make the planning scan and every treatment line up.",
      source: "estro-acrop-breath-hold-2023",
      quote: "It is advisable to train patients in the BH procedure before computed tomography (CT), to familiarise them with the equipment and to inform them how the staff will communicate during the procedure.",
      grade: "Expert consensus (not graded)",
    },
    {
      action: "Give written or video material the patient can keep to practise holding their breath at home",
      why: "Practice at home makes the planning appointment shorter and the breath-hold more even.",
      source: "estro-acrop-breath-hold-2023",
      quote: "Information presented as flyers, videos or slide-presentations may be useful material that the patient can keep and use to practice BH at home if necessary",
      grade: "Expert consensus (not graded)",
    },
    {
      action: "Aim for a comfortable, natural deep breath held for about 20 to 30 seconds, not the deepest breath possible",
      why: "Most people can hold a breath this long, and a breath that is too deep is hard to repeat the same way every day.",
      source: "estro-acrop-breath-hold-2023",
      quote: "Most patients are able to hold their breath for 25–30 seconds: reports suggest that > 90% of breast cancer patients can achieve DIBH",
      grade: "Expert consensus (not graded)",
    },
    {
      action: "Tell the patient that treatment while breathing normally is still safe if breath-holding does not suit them",
      why: "Language, distress or difficulty following instructions can make breath-hold the wrong choice, and no one should feel they have failed.",
      source: "estro-acrop-breath-hold-2023",
      quote: "The staff should reassure the patient that free-breathing (FB) is a safe option for treatment as well.",
      grade: "Expert consensus (not graded)",
    },
    {
      action: "Take the planning CT in breath-hold, after setting up with reference marks made while breathing freely",
      why: "The plan must be made on the body in the same shape it will be in during treatment.",
      source: "estro-acrop-breath-hold-2023",
      quote: "The planning CT should be performed in DIBH and additional DIBH skin marks (non-permanent) can be added as needed.",
      grade: "Expert consensus (not graded)",
    },
    {
      action: "Use the same breath-hold monitoring system and breath-hold level for every planning scan and every treatment",
      why: "Changing the equipment or the depth of breath between planning and treatment would put the heart and the breast in different places.",
      source: "estro-acrop-breath-hold-2023",
      quote: "To maximise reproducibility and reduce the risk of introducing a systematic error, all relevant imaging for treatment planning should be performed in BH, and at the same BH level as used throughout the treatment course.",
      grade: "Expert consensus (not graded)",
    },
    {
      action: "At treatment, verify on images both the patient's position and the breath-hold level",
      why: "The monitor watches the skin or the airflow, not the heart or the breast; images show that the inside of the chest is where the plan expects it.",
      source: "estro-acrop-breath-hold-2023",
      quote: "For treatment delivery, image verification must encompass patient position (similar to treatments in FB) and verification of the BH level.",
      grade: "Expert consensus (not graded)",
    },
    {
      action: "Image daily where possible, and re-image and re-plan if the breathing pattern seems to have changed",
      why: "A breath-hold can drift over a course of treatment; daily checks catch it before it moves dose onto the heart.",
      source: "estro-acrop-breath-hold-2023",
      quote: "Daily imaging for the verification of the position of the target in BH as well as verification of the BH level (if necessary to ensure consistency in OAR sparing).",
      grade: "Expert consensus (not graded)",
    },
    {
      action: "Check each plan against a mean heart dose target, such as under 2 Gy where the internal mammary nodes are not treated",
      why: "A target makes it clear when breath-hold, or another heart-sparing method, is needed for a particular patient.",
      source: "rcr-breast-consensus-2016",
      quote: "In left-breast-affected patients undergoing radiotherapy not including the IMC, >90% of patients should be treated to a mean heart dose of <2 Gray (Gy).",
      grade: "Very strongly supported (90 to 99% of centres)",
    },
  ],
  bestInClass: {
    statement: "A breath-hold technique for every person having left breast or chest wall radiotherapy (NICE NG101 1.13.2 [2018]; RCR 2016, unanimous that every department have one), with coaching before the planning CT, a comfortable breath-hold of about 20 to 30 seconds, planning and treatment with the same monitoring system at the same breath-hold level, and image verification of position and breath-hold level, daily where feasible (ESTRO-ACROP 2023, expert consensus). The guidelines agree on the technique; they differ in scope. NICE limits its recommendation to left-sided cancer, having found no evidence for right-sided; the RCR also asks for breath-hold to be available for internal mammary chain radiotherapy, and recommends it particularly for lower-half left breast tumours. No guideline read prefers one monitoring system over another; voluntary breath-hold without equipment was equivalent to a spirometry device in a randomised crossover study and quicker to deliver.",
    sources: ["nice-ng101", "rcr-breast-consensus-2016", "estro-acrop-breath-hold-2023", "heartspare-2013"],
  },
  variants: [
    {
      name: "Voluntary breath-hold without a device",
      differs: "The patient holds their breath to a level checked against skin marks, a laser or surface imaging, with no spirometer or valve.",
      evidence: "HeartSpare (23 patients, randomised crossover): voluntary DIBH and the Active Breathing Coordinator were comparable in positional reproducibility and normal-tissue sparing; voluntary was preferred by patients and radiographers, took less time and is cheaper. ESTRO-ACROP 2023 says voluntary approaches have been shown suitable for 3D-CRT breast treatments.",
      sources: ["heartspare-2013", "estro-acrop-breath-hold-2023"],
    },
    {
      name: "Spirometry-controlled breath-hold (Active Breathing Coordinator)",
      differs: "The patient breathes through a mouthpiece with a nose clip; a valve holds the breath at a set lung volume and can interlock with the beam.",
      evidence: "Comparable heart sparing and reproducibility to voluntary breath-hold in HeartSpare, with longer set-up times and lower patient preference. No trial showing a clinical advantage was found.",
      sources: ["heartspare-2013"],
    },
    {
      name: "Surface tracking with visual feedback to the patient",
      differs: "An optical surface system or a marker block tracks the chest or abdomen, and the patient watches their own breath-hold on a screen or in goggles.",
      evidence: "BRAVEHeart (26 analysable patients, randomised): no difference in treatment accuracy, satisfaction or appointment length between chest-surface and abdominal-block feedback, though the chest surface correlated better with the chest wall (median 0.69 against 0.17). ESTRO-ACROP 2023 notes that visual coaching can decrease breath-hold to breath-hold variability in breast cancer patients.",
      sources: ["braveheart-2024", "estro-acrop-breath-hold-2023"],
    },
    {
      name: "Prone free-breathing instead of supine breath-hold",
      differs: "The patient lies face down so the breast falls away from the chest wall, without holding their breath; used in some centres for larger breasts.",
      evidence: "HeartSpare stage IB (34 larger-breasted women, randomised crossover): supine voluntary breath-hold gave lower mean heart and coronary artery doses and better positional reproducibility than prone free-breathing. ESTRO-ACROP 2023 (positioning) says prone can be considered for larger breasts or where more lung sparing is needed, if equipment and expertise are available.",
      sources: ["heartspare-ib-2015", "estro-acrop-breast-positioning-2023"],
    },
    {
      name: "An extra free-breathing planning CT alongside the breath-hold CT",
      differs: "A second planning scan is taken while breathing normally, to compare plans or keep a back-up plan for days the patient cannot hold their breath.",
      evidence: "ESTRO-ACROP 2023 accepts it while a department is learning the technique but does not recommend it for routine practice beyond implementation, because of the additional radiation; it notes the benefits are limited.",
      sources: ["estro-acrop-breath-hold-2023"],
    },
  ],
  grades: [
    { claim: "Use a deep inspiratory breath-hold technique for people with left-sided breast cancer", grade: "[2018] (NICE does not grade)", source: "nice-ng101" },
    { claim: "All UK radiotherapy departments should have a breath-hold technique available", grade: "Unanimous support", source: "rcr-breast-consensus-2016", quote: "All UK radiotherapy departments should have a breath-hold technique available." },
    { claim: "Breath-hold techniques recommended for those with lower-half left breast tumours", grade: "Consensus statement (no vote shown for this sentence)", source: "rcr-breast-consensus-2016", quote: "Breath-hold techniques are recommended for those with lower-half left breast tumours." },
    { claim: "More than 90% of left-sided patients without internal mammary chain treatment to a mean heart dose under 2 Gy", grade: "Very strongly supported", source: "rcr-breast-consensus-2016" },
    { claim: "Every centre should have a breath-hold technique for internal mammary chain radiotherapy", grade: "Consensus statement", source: "rcr-breast-consensus-2016", quote: "Every centre should have a breath-hold technique available for patients undergoing IMC radiotherapy." },
    { claim: "An additional free-breathing planning CT adds dose for limited benefit", grade: "Expert consensus (not graded)", source: "estro-acrop-breath-hold-2023", quote: "However, the benefits of the acquisition of an additional FB CT scan are limited and add an increased imaging dose." },
    { claim: "Rates of major coronary events rise with mean heart dose, by 7.4% per gray", grade: "Population-based case-control study", source: "darby-2013", quote: "Rates of major coronary events increased linearly with the mean dose to the heart by 7.4% per gray (95% confidence interval, 2.9 to 14.5; P<0.001), with no apparent threshold." },
  ],
  sources: [
    {
      key: "estro-acrop-breath-hold-2023",
      label: "ESTRO-ACROP guideline: Recommendations on implementation of breath-hold techniques in radiotherapy",
      publisher: "ESTRO (Radiotherapy and Oncology; Aznar et al.)",
      year: 2023,
      url: "https://doi.org/10.1016/j.radonc.2023.109734",
      doi: "10.1016/j.radonc.2023.109734",
      gradingScheme: "Not graded: the authors combine published reports with common empirical experience (consensus of experts) and give take-home messages and an ideal implementation list.",
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
    {
      key: "rcr-breast-consensus-2016",
      label: "Postoperative radiotherapy for breast cancer: UK consensus statements",
      publisher: "The Royal College of Radiologists",
      year: 2016,
      url: "https://www.rcr.ac.uk/media/uvzf4ttn/rcr-publications_postoperative-radiotherapy-for-breast-cancer-uk-consensus-statements_november-2016.pdf",
      gradingScheme: "Share of 48 centres voting for a statement: unanimous 100%, very strongly supported 90 to 99%, strongly supported 70 to 89%, majority 60 to 69%; 70% or more was consensus.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "estro-acrop-breast-positioning-2023",
      label: "ESTRO-ACROP guideline for positioning, immobilisation and setup verification for local and loco-regional photon breast cancer irradiation",
      publisher: "ESTRO (Technical Innovations and Patient Support in Radiation Oncology; Mast et al.)",
      year: 2023,
      url: "https://doi.org/10.1016/j.tipsro.2023.100219",
      doi: "10.1016/j.tipsro.2023.100219",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "heartspare-2013",
      label: "The UK HeartSpare Study: randomised evaluation of voluntary deep-inspiratory breath-hold in women undergoing breast radiotherapy",
      publisher: "Radiotherapy and Oncology (Bartlett et al.)",
      year: 2013,
      url: "https://doi.org/10.1016/j.radonc.2013.04.021",
      doi: "10.1016/j.radonc.2013.04.021",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "heartspare-ib-2015",
      label: "The UK HeartSpare Study (Stage IB): randomised comparison of a voluntary breath-hold technique and prone radiotherapy after breast conserving surgery",
      publisher: "Radiotherapy and Oncology (Bartlett et al.)",
      year: 2015,
      url: "https://doi.org/10.1016/j.radonc.2014.11.018",
      doi: "10.1016/j.radonc.2014.11.018",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "braveheart-2024",
      label: "Prospective randomized trial comparing 2 devices for deep inspiration breath hold management in breast radiation therapy: results of the BRAVEHeart trial",
      publisher: "Advances in Radiation Oncology (Byrne et al.)",
      year: 2024,
      url: "https://doi.org/10.1016/j.adro.2024.101572",
      doi: "10.1016/j.adro.2024.101572",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "darby-2013",
      label: "Risk of ischemic heart disease in women after radiotherapy for breast cancer",
      publisher: "New England Journal of Medicine (Darby et al.)",
      year: 2013,
      url: "https://doi.org/10.1056/NEJMoa1209825",
      doi: "10.1056/NEJMoa1209825",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  cancers: ["breast-cancer"],
  technologies: ["respiratory-motion-management", "surface-guided-radiotherapy", "in-room-imaging-systems", "imrt-igrt"],
  terms: ["deep-inspiration-breath-hold", "cardiotoxicity", "radiotherapy"],
  related: ["breast-radiotherapy-positioning-and-setup"],
  upgrades: ["idea-pu-breath-hold-left-breast-routine", "idea-pu-breath-hold-visual-feedback", "idea-pu-breath-hold-coaching-before-planning"],
  gaps: [
    "The ESTRO-ACROP breath-hold guideline (2023) is expert consensus and grades none of its recommendations; the practical steps here (coaching, breath-hold duration, daily imaging) rest on it and on small studies rather than on randomised trials of the steps themselves.",
    "No randomised trial has shown that breath-hold reduces heart attacks or heart deaths; the benefit is inferred from lower heart dose combined with the dose-response relationship found by Darby et al. (2013), which was read as an abstract.",
    "No guideline read sets a single rule for which patients gain enough to need breath-hold; the RCR uses a mean heart dose target and recommends it particularly for lower-half left breast tumours, NICE for all left-sided cancers.",
    "Right-sided breast cancer: NICE found no evidence and made no recommendation; centres that use breath-hold for right-sided nodal treatment do so to spare the lung and liver, which was not examined here.",
    "The ASTRO whole-breast radiotherapy guideline (2018) and its heart-sparing recommendations were not read; Elsevier's practicalradonc.org pages were not tried with a script after the Radiotherapy and Oncology PDF returned an HTML page.",
    "The HeartSpare, HeartSpare IB and BRAVEHeart trials were read as abstracts only; all three are small (23 to 34 patients).",
    "How often breath-hold is actually offered is not measured here; the guideline cites the POP-ART survey as showing large variation and under-use, which was not read.",
  ],
});

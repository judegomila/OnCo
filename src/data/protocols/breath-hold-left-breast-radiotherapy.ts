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
 * Second reading, 17 November 2026 (every source fetched again raw with curl and read as text; quotes re-checked by
 * script, normalising only whitespace and line-break hyphenation):
 * - ESTRO-ACROP breath-hold guideline: the same open (CC BY) published PDF from the Universitat Autonoma de Barcelona
 *   repository, read in full with pdftotext. The publisher's site was not requested. The supplement (S1, which
 *   describes each device) was not read, so device descriptions here say only what the main text says.
 * - NICE NG101 recommendations page: the copy a sibling checker fetched from nice.org.uk the same day was re-used
 *   (published 18 July 2018, last updated 14 April 2025; 1.13.2 still [2018]).
 * - RCR consensus statements: the PDF from rcr.ac.uk, read in full with pdftotext; the RCR publication page still
 *   lists it, and says only the hypofractionation statements were updated in May 2021.
 * - ESTRO-ACROP positioning guideline: the Europe PMC full text a sibling checker saved the same day was re-used.
 * - BRAVEHeart: now read in full (Europe PMC full text XML, PMC11364044). HeartSpare, HeartSpare IB and Darby:
 *   abstracts, Europe PMC. Europe PMC and Crossref show no newer edition of the breath-hold guideline.
 * Changes: reasons that the cited passage does not give were reworded to the source; "can" and "may be useful" are no
 * longer written as orders; the 20 to 30 seconds figure is no longer tied to the 90% figure; the grade of the RCR
 * internal mammary chain statement is now the printed one; the heart dose target is described as the RCR wrote it.
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
  tldr: "For radiotherapy for left-sided breast cancer, you take a comfortable deep breath and hold it, often for 20 to 30 seconds at a time, while the machine is on. Filling the lungs moves the heart away from the chest wall, so it gets less radiation. You practise first, and the planning scan is done holding your breath. If it does not suit you, treatment while breathing normally is also safe.",
  simple: "You hold a comfortable deep breath, often for 20 to 30 seconds at a time, while the machine is on. This moves your heart away from the chest wall, so it gets less radiation. You practise first and the team checks your breath-hold with images.",
  summary: "NICE NG101 1.13.2 [2018] recommends a deep inspiratory breath-hold technique for people with left-sided breast cancer to reduce heart dose; the RCR UK consensus (2016) supported, unanimously, that every department have a breath-hold technique available and, very strongly, a mean heart dose under 2 Gy for more than 90% of left-sided patients not having internal mammary chain treatment. The rationale is dose: the Darby case-control study found major coronary events rose by 7.4% per gray of mean heart dose with no apparent threshold.\n\nThe ESTRO-ACROP implementation guideline (2023, ungraded expert consensus) sets out the practice: coach the patient before the planning CT, aim for a comfortable rather than maximal breath-hold (often limited to 20 to 30 seconds, which the guideline calls a pragmatic compromise achievable by many patients; it also cites reports that more than 90% of breast cancer patients can achieve a deep inspiration breath-hold), plan on a CT taken in breath-hold with the same monitoring equipment used on the treatment machine, verify both patient position and breath-hold level with imaging, ideally daily, and be able to re-image and re-plan if the breathing pattern changes. It does not recommend a routine extra free-breathing planning CT beyond the implementation stage, because of the added dose.\n\nVoluntary breath-hold was comparable to a spirometry device (ABC) in positional reproducibility and normal-tissue sparing in the HeartSpare randomised crossover study, quicker and preferred by patients and radiographers; in larger-breasted women it gave lower heart and coronary artery doses than prone free-breathing (HeartSpare IB). The guideline says monitoring is often combined with visual feedback to the patient; one small randomised trial of chest-surface versus abdominal-block feedback found no difference in accuracy.",
  asOf: "2026-11-17",
  setting: {
    who: ["radiographer", "doctor", "patient-or-carer"],
    where: ["radiotherapy-department"],
  },
  population: "People having radiotherapy for left-sided breast cancer. NICE NG101 covers early and locally advanced breast cancer, and the evidence it cites was in adults having whole-breast radiotherapy; the RCR statements cover radiotherapy after surgery. NICE found no evidence for right-sided breast cancer and made no separate recommendation for it; the RCR consensus adds patients having internal mammary chain radiotherapy, without naming a side. Breath-hold for lung, lymphoma and upper abdominal tumours follows the same guideline but with different selection and imaging rules, and is not covered here.",
  trigger: "A decision to give radiotherapy for left-sided breast cancer, before the planning CT is booked.",
  steps: [
    {
      action: "Use a deep inspiration breath-hold technique for people having radiotherapy for left-sided breast cancer",
      why: "NICE found evidence that breath-hold lowers the mean heart dose in left-sided whole-breast radiotherapy without reducing coverage of the breast, and identified no harms.",
      source: "nice-ng101",
      quote: "Use a deep inspiratory breath-hold radiotherapy technique for people with left-sided breast cancer to reduce the dose to the heart.",
      grade: "[2018]",
    },
    {
      action: "Coach the patient in the breath-hold before the planning CT, show them the equipment and agree how staff will talk to them during it",
      why: "The guideline says the crucial thing is that the patient feels comfortable with the procedure, so that the breath-hold varies as little as possible during imaging and treatment.",
      source: "estro-acrop-breath-hold-2023",
      quote: "It is advisable to train patients in the BH procedure before computed tomography (CT), to familiarise them with the equipment and to inform them how the staff will communicate during the procedure.",
      grade: "Expert consensus (not graded)",
    },
    {
      action: "Consider giving flyers, videos or slides the patient can keep to practise holding their breath at home",
      why: "The guideline says such material may be useful, and that effective coaching has been suggested to shorten the planning scan appointment and increase the benefit of breath-hold.",
      source: "estro-acrop-breath-hold-2023",
      quote: "Information presented as flyers, videos or slide-presentations may be useful material that the patient can keep and use to practice BH at home if necessary",
      grade: "Expert consensus (not graded)",
    },
    {
      action: "Aim for a comfortable, natural deep breath held for about 20 to 30 seconds, not the deepest breath possible",
      why: "The guideline calls 20 to 30 seconds a pragmatic compromise that many patients can manage, and says a breath kept natural instead of as deep as possible may avoid the need for a repeat scan during the course.",
      source: "estro-acrop-breath-hold-2023",
      quote: "For example, the BH is often restricted to 20–30 s, for fear that longer BH may strain the patient and introduce additional uncertainties.",
      grade: "Expert consensus (not graded)",
    },
    {
      action: "Tell the patient that treatment while breathing normally is a safe option too",
      why: "The guideline says a language barrier, psychological distress or difficulty following the coaching can mean breath-hold is not the best choice for a particular patient.",
      source: "estro-acrop-breath-hold-2023",
      quote: "The staff should reassure the patient that free-breathing (FB) is a safe option for treatment as well.",
      grade: "Expert consensus (not graded)",
    },
    {
      action: "Take the planning CT in breath-hold; reference skin marks can be made while breathing freely, with extra non-permanent breath-hold marks if needed",
      why: "The guideline says all imaging used for planning should be done in breath-hold, and that marks made while breathing freely help the first alignment without moving the patient during a breath-hold.",
      source: "estro-acrop-breath-hold-2023",
      quote: "The planning CT should be performed in DIBH and additional DIBH skin marks (non-permanent) can be added as needed.",
      grade: "Expert consensus (not graded)",
    },
    {
      action: "Use the same breath-hold equipment and the same breath-hold level for planning scans and for treatment",
      why: "The guideline says this minimises the risk of a systematic difference between planning and treatment.",
      source: "estro-acrop-breath-hold-2023",
      quote: "To maximise reproducibility and reduce the risk of introducing a systematic error, all relevant imaging for treatment planning should be performed in BH, and at the same BH level as used throughout the treatment course.",
      grade: "Expert consensus (not graded)",
    },
    {
      action: "At treatment, verify on images both the patient's position and the breath-hold level",
      why: "The guideline stresses that most monitoring systems follow a stand-in for the target, not the target itself, so imaging that shows where the target is has to go with them.",
      source: "estro-acrop-breath-hold-2023",
      quote: "For treatment delivery, image verification must encompass patient position (similar to treatments in FB) and verification of the BH level.",
      grade: "Expert consensus (not graded)",
    },
    {
      action: "Image daily where possible, and be able to re-image and re-plan if a change in the breathing pattern is suspected",
      why: "The guideline lists both as part of an ideal set-up, and says breath-hold can vary quite widely from day to day in ways the monitoring signal does not always show.",
      source: "estro-acrop-breath-hold-2023",
      quote: "Daily imaging for the verification of the position of the target in BH as well as verification of the BH level (if necessary to ensure consistency in OAR sparing).",
      grade: "Expert consensus (not graded)",
    },
    {
      action: "Set a department target for mean heart dose: the RCR's is under 2 Gy for more than 90% of left-sided patients whose internal mammary chain is not treated",
      why: "UK centres agreed (strongly supported) that a target mean heart dose would help departments to implement breath-hold. This is a UK consensus target for a department's patients as a group.",
      source: "rcr-breast-consensus-2016",
      quote: "In left-breast-affected patients undergoing radiotherapy not including the IMC, >90% of patients should be treated to a mean heart dose of <2 Gray (Gy).",
      grade: "Very strongly supported (90 to 99% of centres)",
    },
  ],
  bestInClass: {
    statement: "A breath-hold technique for every person having left breast or chest wall radiotherapy (NICE NG101 1.13.2 [2018]; RCR 2016, unanimous that every department have one), with coaching before the planning CT, a comfortable breath-hold, often limited to 20 to 30 seconds, planning and treatment with the same monitoring system at the same breath-hold level, and image verification of position and breath-hold level, daily where feasible (ESTRO-ACROP 2023, expert consensus). The guidelines agree on the technique; they differ in scope. NICE limits its recommendation to left-sided cancer, having found no evidence for right-sided; the RCR also asks, unanimously, for breath-hold to be available for internal mammary chain radiotherapy, and its background text recommends breath-hold for lower-half left breast tumours. No guideline read prefers one monitoring system over another; voluntary breath-hold was comparable to a spirometry device in a small randomised crossover study and quicker to deliver.",
    sources: ["nice-ng101", "rcr-breast-consensus-2016", "estro-acrop-breath-hold-2023", "heartspare-2013"],
  },
  variants: [
    {
      name: "Voluntary breath-hold without a device",
      differs: "The patient holds the breath unaided, using little or no equipment and no spirometry device.",
      evidence: "HeartSpare (23 patients, randomised crossover): voluntary DIBH and the Active Breathing Coordinator were comparable in positional reproducibility and normal-tissue sparing; voluntary was preferred by patients and radiographers, took less time and is cheaper. ESTRO-ACROP 2023 says voluntary approaches have been shown suitable for 3D-CRT breast treatments.",
      sources: ["heartspare-2013", "estro-acrop-breath-hold-2023"],
    },
    {
      name: "Spirometry-controlled breath-hold (Active Breathing Coordinator)",
      differs: "A spirometry-based device, the Active Breathing Coordinator, is used for the breath-hold in place of an unaided hold.",
      evidence: "Comparable heart sparing and reproducibility to voluntary breath-hold in HeartSpare, with longer scanning and treatment set-up times; patients and radiographers preferred voluntary breath-hold. No trial showing a clinical advantage was found here.",
      sources: ["heartspare-2013"],
    },
    {
      name: "Surface tracking with visual feedback to the patient",
      differs: "An optical system tracks the chest surface, or an infrared camera tracks a reflector block on the abdomen, and the patient watches their own breath-hold on a screen.",
      evidence: "BRAVEHeart (randomised; 26 of 32 recruited patients available for analysis): no statistical evidence of a difference in treatment accuracy, satisfaction or appointment length between chest-surface and abdominal-block feedback, though movement of the chest surface correlated better with the internal chest wall (median correlation 0.69 against 0.17). ESTRO-ACROP 2023 notes that visual coaching can decrease breath-hold to breath-hold variability in breast cancer patients.",
      sources: ["braveheart-2024", "estro-acrop-breath-hold-2023"],
    },
    {
      name: "Prone free-breathing instead of supine breath-hold",
      differs: "The patient lies face down, so that the breast tissue falls forward and away from the lung, and breathes normally.",
      evidence: "HeartSpare stage IB (randomised crossover; 34 larger-breasted women recruited, complete dose data for 28): supine voluntary breath-hold gave lower mean heart and coronary artery doses and better positional reproducibility than prone free-breathing. ESTRO-ACROP 2023 (positioning) says prone can be considered for larger breasts or where more lung sparing is needed, if equipment and expertise are available.",
      sources: ["heartspare-ib-2015", "estro-acrop-breast-positioning-2023"],
    },
    {
      name: "An extra free-breathing planning CT alongside the breath-hold CT",
      differs: "A second planning scan is taken while breathing normally, to make a back-up plan or to measure what breath-hold gains over free breathing.",
      evidence: "ESTRO-ACROP 2023 accepts it while a department is learning the technique but does not recommend it for routine practice beyond implementation, because of the additional radiation; it notes the benefits are limited.",
      sources: ["estro-acrop-breath-hold-2023"],
    },
  ],
  grades: [
    { claim: "Use a deep inspiratory breath-hold technique for people with left-sided breast cancer", grade: "[2018] (NICE does not grade)", source: "nice-ng101" },
    { claim: "All UK radiotherapy departments should have a breath-hold technique available", grade: "Unanimous support", source: "rcr-breast-consensus-2016", quote: "All UK radiotherapy departments should have a breath-hold technique available." },
    { claim: "Breath-hold techniques recommended for those with lower-half left breast tumours", grade: "Background statement in the cardiac sparing section; not one of the voted statements", source: "rcr-breast-consensus-2016", quote: "Breath-hold techniques are recommended for those with lower-half left breast tumours." },
    { claim: "More than 90% of left-sided patients without internal mammary chain treatment to a mean heart dose under 2 Gy", grade: "Very strongly supported", source: "rcr-breast-consensus-2016" },
    { claim: "Every centre should have a breath-hold technique for internal mammary chain radiotherapy", grade: "Unanimous support", source: "rcr-breast-consensus-2016", quote: "Every centre should have a breath-hold technique available for patients undergoing IMC radiotherapy." },
    { claim: "An additional free-breathing planning CT adds dose for limited benefit", grade: "Expert consensus (not graded)", source: "estro-acrop-breath-hold-2023", quote: "However, the benefits of the acquisition of an additional FB CT scan are limited and add an increased imaging dose." },
    { claim: "A target mean heart dose would help departments to implement breath-hold", grade: "Strongly supported", source: "rcr-breast-consensus-2016" },
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
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng101",
      label: "Early and locally advanced breast cancer: diagnosis and management (NG101), recommendations",
      publisher: "NICE",
      year: 2018,
      url: "https://www.nice.org.uk/guidance/ng101/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or updated. Published July 2018, last updated April 2025.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "rcr-breast-consensus-2016",
      label: "Postoperative radiotherapy for breast cancer: UK consensus statements",
      publisher: "The Royal College of Radiologists",
      year: 2016,
      url: "https://www.rcr.ac.uk/media/uvzf4ttn/rcr-publications_postoperative-radiotherapy-for-breast-cancer-uk-consensus-statements_november-2016.pdf",
      gradingScheme: "Share of the 48 centres at the consensus meeting voting for a statement, one vote per centre: unanimous support 100%, very strongly supported 90 to 99%, strongly supported 70 to 89%, majority support 60 to 69%, equipoise 50 to 59%, rejected under 50%; 70% or more was agreed beforehand to be consensus.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "estro-acrop-breast-positioning-2023",
      label: "ESTRO-ACROP guideline for positioning, immobilisation and setup verification for local and loco-regional photon breast cancer irradiation",
      publisher: "ESTRO (Technical Innovations and Patient Support in Radiation Oncology; Mast et al.)",
      year: 2023,
      url: "https://doi.org/10.1016/j.tipsro.2023.100219",
      doi: "10.1016/j.tipsro.2023.100219",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "heartspare-2013",
      label: "The UK HeartSpare Study: randomised evaluation of voluntary deep-inspiratory breath-hold in women undergoing breast radiotherapy",
      publisher: "Radiotherapy and Oncology (Bartlett et al.)",
      year: 2013,
      url: "https://doi.org/10.1016/j.radonc.2013.04.021",
      doi: "10.1016/j.radonc.2013.04.021",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "heartspare-ib-2015",
      label: "The UK HeartSpare Study (Stage IB): randomised comparison of a voluntary breath-hold technique and prone radiotherapy after breast conserving surgery",
      publisher: "Radiotherapy and Oncology (Bartlett et al.)",
      year: 2015,
      url: "https://doi.org/10.1016/j.radonc.2014.11.018",
      doi: "10.1016/j.radonc.2014.11.018",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "braveheart-2024",
      label: "Prospective randomized trial comparing 2 devices for deep inspiration breath hold management in breast radiation therapy: results of the BRAVEHeart trial",
      publisher: "Advances in Radiation Oncology (Byrne et al.)",
      year: 2024,
      url: "https://doi.org/10.1016/j.adro.2024.101572",
      doi: "10.1016/j.adro.2024.101572",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "darby-2013",
      label: "Risk of ischemic heart disease in women after radiotherapy for breast cancer",
      publisher: "New England Journal of Medicine (Darby et al.)",
      year: 2013,
      url: "https://doi.org/10.1056/NEJMoa1209825",
      doi: "10.1056/NEJMoa1209825",
      read: "abstract",
      accessed: "2026-11-17",
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
    "No guideline read sets a single rule for which patients gain enough to need breath-hold; the RCR sets a mean heart dose target and its background text recommends breath-hold for lower-half left breast tumours, NICE for all left-sided cancers.",
    "Right-sided breast cancer: NICE found no evidence and made no separate recommendation; centres that use breath-hold for right-sided nodal treatment do so to spare the lung and liver, which was not examined here.",
    "The ASTRO whole-breast radiotherapy guideline (2018) and its heart-sparing recommendations were not read. On 17 November 2026 Europe PMC listed its executive summary (Practical Radiation Oncology 2018) with no open full text, and the publisher's pages were not requested by script.",
    "The breath-hold guideline was read from the open published PDF in a university repository; its supplement, which describes each device, was not read on 17 November 2026, so the descriptions of voluntary and spirometry-controlled breath-hold here say only what the main text and the HeartSpare abstract say.",
    "The mean heart dose target is a UK consensus figure from 2016 for a department's patients as a group; no source read gives a heart dose limit for an individual plan without internal mammary chain treatment. The RCR page notes that only its hypofractionation statements were updated, in May 2021.",
    "The HeartSpare and HeartSpare IB trials were read as abstracts only; BRAVEHeart was read in full on 17 November 2026. All three are small (23 to 34 patients recruited).",
    "How often breath-hold is actually offered is not measured here; the guideline cites the POP-ART survey as showing large variation and under-use, which was not read.",
  ],
});

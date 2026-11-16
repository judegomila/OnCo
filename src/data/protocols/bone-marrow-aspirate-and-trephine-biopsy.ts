import { protocol } from "./helpers";

/*
 * Bone marrow aspirate and trephine biopsy in adults: preparation, pain control and aftercare.
 *
 * No society procedure guideline for the procedure itself was found (the census for this round says the same). This
 * page therefore rests on the best evidence that exists and says so: the British Society for Haematology adverse event
 * surveys, randomised trials and a systematic review on pain, a nurse practitioner training guideline, and a national
 * patient information page as a description of usual UK practice.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - Bain, Bone marrow biopsy morbidity: review of 2003 (J Clin Pathol 2005) and Bone marrow biopsy morbidity and
 *   mortality (Br J Haematol 2003): abstracts, Europe PMC (the 2005 full text was not served as XML).
 * - Non-pharmacological interventions for pain in bone marrow aspiration and biopsy: systematic review and
 *   meta-analysis of randomised trials (J Clin Nurs 2024): abstract, Europe PMC.
 * - REVEH trial, virtual reality against nitrous oxide/oxygen (JMIR 2023): abstract, Europe PMC.
 * - Methoxyflurane against placebo for bone marrow biopsy (BMJ Supportive & Palliative Care 2014): abstract.
 * - Slow against rapid aspiration technique (Acta Haematologica 2016): abstract.
 * - ICSH guidelines for the standardization of bone marrow specimens and reports (Int J Lab Hematol 2008): abstract
 *   only; specimen handling is not detailed here.
 * - Jackson et al., Bone marrow aspiration and biopsy: a guideline for procedural training and competency assessment
 *   (J Adv Pract Oncol 2012): full text, Europe PMC XML (PMC4093339).
 * - Cancer Research UK, Bone marrow test (patient information, last reviewed 8 April 2025): full text (HTML).
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined.
 */
export const boneMarrowAspirateAndTrephineBiopsy = protocol({
  id: "bone-marrow-aspirate-and-trephine-biopsy",
  name: "Bone marrow aspirate and trephine biopsy: preparation, pain control and aftercare",
  aka: ["bone marrow biopsy", "bone marrow test", "bone marrow aspiration", "BMAT", "trephine biopsy", "iliac crest biopsy", "bone marrow aspirate"],
  domain: "screening-diagnostics",
  tldr: "A bone marrow test takes a small sample of liquid marrow and a thin core of bone, usually from the back of the hip, to look for blood cancers or check treatment. It is done awake with local anaesthetic, sometimes with sedation or gas and air. Serious problems are rare (about 1 in 1,250 tests in a UK survey). Call the hospital for fever, a red or oozing wound, or pain that gets worse.",
  simple: "A needle takes some marrow from inside your hip bone. You get a numbing injection. It can hurt for a short time, so ask about gas and air or medicine to relax you. Tell the team if you take blood thinners. Keep the plaster on for a day. Call the hospital if you get a fever, a red or leaking wound, or worse pain.",
  summary: "No society guideline sets out how to do or prepare for the procedure; this page is built from the evidence that exists. Safety: British Society for Haematology surveys recorded 26 adverse events, including one death, in an estimated 54,890 biopsies from 1995 to 2001, and 16 adverse events in 19,259 procedures in 2003 (0.08%). Haemorrhage was the commonest and most serious, with myeloproliferative disorders, aspirin, other platelet dysfunction and thrombocytopenia the risk factors most often present (warfarin, disseminated intravascular coagulation and obesity also named). No source sets platelet or anticoagulant thresholds; plans are local.\n\nPain: under local anaesthetic, 70% report pain and 35% severe pain (methoxyflurane trial background). A 2024 meta-analysis of 18 randomised trials (1,017 people) found distraction (SMD -0.85), a powered biopsy system (SMD -0.27) and acupoint stimulation reduced pain, while hypnosis did not reach significance. Virtual reality was not significantly different from nitrous oxide/oxygen in REVEH (mean pain 3.0 against 3.5 of 10, n = 126). Inhaled methoxyflurane lowered worst pain against placebo (4.9 against 6.0). Sedation and gas and air (Entonox) are used in some UK hospitals. Rapid aspiration gave better specimens than slow aspiration at a cost of 1 point more pain on a 10-point scale.\n\nAftercare, as UK patient information describes it: eat and drink normally unless sedated, a dressing for 24 hours, pressure on any bleeding, mild painkillers for a few days' ache, no driving or alcohol for 24 hours after sedation with someone at home overnight, and a call to the 24-hour line for fever, a red or oozing site, feeling unwell or worsening pain.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home"],
  },
  population: "Adults having a bone marrow aspirate with or without trephine biopsy, usually from the posterior iliac crest, to diagnose, stage or monitor leukaemia, lymphoma, myeloma or other blood and marrow disorders. Children (who usually have sedation or general anaesthesia) and sternal aspiration are outside scope.",
  trigger: "A bone marrow examination is requested.",
  steps: [
    {
      action: "Before the test, ask about blood thinners, aspirin and bleeding disorders, and look at the platelet count and diagnosis",
      why: "Bleeding is the main serious risk, and it was seen mostly in people on aspirin, with low platelets or with certain marrow disorders.",
      source: "bain-2005",
      quote: "The major risk factors for haemorrhage, in order of frequency, were diagnosis of a myeloproliferative disorder, aspirin treatment, other putative platelet dysfunctions, and thrombocytopenia.",
      grade: "National adverse event survey (ungraded)",
    },
    {
      action: "Explain the test and its risks, including how rare serious complications are, and take written consent",
      why: "Knowing that serious problems are rare, and which ones to watch for, helps people decide and cope.",
      source: "bain-2005",
      quote: "Sixteen adverse events were reported, representing 0.08% of total reported procedures.",
      grade: "National adverse event survey (ungraded)",
    },
    {
      action: "Let the person eat and drink as normal unless they are having sedation, in which case follow the unit's fasting instructions",
      why: "Local anaesthetic alone does not need an empty stomach; sedation does.",
      source: "cruk-2025",
      quote: "You are usually able to eat and drink before your test.",
      grade: "Patient information (ungraded)",
    },
    {
      action: "Give local anaesthetic, and offer something more for pain or anxiety, such as sedation, gas and air or inhaled methoxyflurane where available",
      why: "Many people still feel pain with local anaesthetic alone, and a third describe it as severe.",
      source: "meof-2014",
      quote: "Pain during bone marrow biopsy (BMB) under local anaesthesia (LA) is reported in 70% of patients, of whom 35% rate the pain as severe.",
      grade: "Randomised trial background statement (ungraded)",
    },
    {
      action: "Offer distraction, such as virtual reality, music or conversation, during the procedure",
      why: "In trials, distraction lowered pain without drugs or side effects.",
      source: "jcn-sr-2024",
      quote: "Distraction, powered bone marrow biopsy system and acupoint stimulation are effective in reducing pain among patients undergoing bone marrow aspiration and biopsy.",
      grade: "Systematic review and meta-analysis of randomised trials (GRADE certainty not stated in the abstract)",
    },
    {
      action: "Aspirate rapidly rather than slowly to get a good specimen, warning the person of a brief pulling pain",
      why: "A fast pull draws up more marrow and gives a better sample, so the test is less likely to need repeating.",
      source: "aspiration-rct-2016",
      quote: "We propose that the R-technique is preferable to the S-technique due to better specimen quality.",
      grade: "Randomised trial (ungraded)",
    },
    {
      action: "Cover the site with a dressing to stay on for 24 hours, and tell the person to press on it if it bleeds and call if bleeding does not stop",
      why: "Most oozing stops with firm pressure; bleeding that continues needs checking.",
      source: "cruk-2025",
      quote: "You have a dressing over the site, which you should keep on for 24 hours. If you notice any bleeding apply pressure to the area. If it doesn't stop, contact your hospital 24 hour advice line.",
      grade: "Patient information (ungraded)",
    },
    {
      action: "After sedation, make sure someone takes the person home and stays overnight, and advise no driving, alcohol or machinery for 24 hours",
      why: "Sedatives affect judgement and reactions for longer than people feel.",
      source: "cruk-2025",
      quote: "If you have sedation, you’ll need someone to take you home and stay with you overnight. Also, for 24 hours after, you shouldn’t drive, drink alcohol, or operate heavy machinery.",
      grade: "Patient information (ungraded)",
    },
    {
      action: "Tell the person to call the 24-hour line for a temperature, a red or sore site, fluid oozing, feeling unwell, or pain that is severe or getting worse",
      why: "These are signs of infection or bleeding under the skin, which are rare but need treatment.",
      source: "cruk-2025",
      quote: "If you have severe pain or it's getting worse then you should contact the hospital.",
      grade: "Patient information (ungraded)",
    },
  ],
  bestInClass: {
    statement: "There is no graded guideline for performing or preparing for bone marrow biopsy; the best-supported elements are: a bleeding history focused on aspirin, other antiplatelet and anticoagulant drugs, thrombocytopenia and myeloproliferative disorders (BSH surveys, where these were the commonest factors in haemorrhage, the main serious complication at about 0.08% of procedures); local anaesthetic with an offer of additional analgesia or sedation, since most people still feel pain; and distraction, which a 2024 meta-analysis of randomised trials found effective. Virtual reality and nitrous oxide/oxygen were similar in one phase 3 trial. Aftercare as described by UK patient information is consensus practice without trial evidence.",
    sources: ["bain-2005", "bain-2003", "jcn-sr-2024", "reveh-2023", "meof-2014", "cruk-2025"],
  },
  variants: [
    {
      name: "Nitrous oxide/oxygen (Entonox or MEOPA) for pain",
      differs: "An inhaled gas mixture breathed by the patient during the procedure, used in some UK and French centres instead of or alongside sedation.",
      evidence: "REVEH (126 patients): mean pain 3.5 of 10 with nitrous oxide/oxygen and 3.0 with virtual reality, not significantly different; all also had lidocaine. Cancer Research UK notes some hospitals use gas and air instead of sedation.",
      sources: ["reveh-2023", "cruk-2025"],
    },
    {
      name: "Inhaled methoxyflurane (Penthrox)",
      differs: "A self-administered handheld inhaler licensed in Australia for short procedures.",
      evidence: "Randomised, double-blind trial of 100 patients with cancer: worst pain 4.90 against 6.0 with placebo (p = 0.011).",
      sources: ["meof-2014"],
    },
    {
      name: "Powered biopsy drivers",
      differs: "A battery-powered driver turns the needle into the bone instead of manual pressure and rotation.",
      evidence: "In the 2024 meta-analysis, powered systems reduced pain modestly (SMD -0.27, 95% CI -0.53 to -0.003).",
      sources: ["jcn-sr-2024"],
    },
    {
      name: "Follow-up telephone calls (nurse practitioner model)",
      differs: "The operator calls each patient the day after and a week after to ask about adverse events.",
      evidence: "Described as a competency measure in a training guideline; no outcome evidence.",
      sources: ["jadpro-2012"],
    },
  ],
  grades: [
    { claim: "Adverse events, including one death, in UK biopsies 1995 to 2001", grade: "National postal survey (ungraded)", source: "bain-2003", quote: "A total of 26 adverse events, including one death directly attributable to the procedure, were reported among an estimated 54 890 biopsies." },
    { claim: "Distraction reduced pain", grade: "Meta-analysis of randomised trials", source: "jcn-sr-2024", quote: "The pooled results revealed statistically significant pain reduction effects using distraction (SMD: -.845, 95% CI: -1.344 to -.346, p < .001)" },
    { claim: "Virtual reality and nitrous oxide/oxygen gave similar pain", grade: "Phase 3 randomised trial", source: "reveh-2023", quote: "The average pain intensity was 3.5 (SD 2.6, 95% CI -1.6 to 8.6) for the MEOPA group and 3.0 (SD 2.4, 95% CI -1.7 to 7.7) for the VR group" },
  ],
  sources: [
    {
      key: "bain-2005",
      label: "Bone marrow biopsy morbidity: review of 2003",
      publisher: "Bain, Journal of Clinical Pathology (British Society for Haematology survey)",
      year: 2005,
      url: "https://doi.org/10.1136/jcp.2004.022178",
      doi: "10.1136/jcp.2004.022178",
      gradingScheme: "Adverse event survey; not graded.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "bain-2003",
      label: "Bone marrow biopsy morbidity and mortality",
      publisher: "Bain, British Journal of Haematology",
      year: 2003,
      url: "https://doi.org/10.1046/j.1365-2141.2003.04329.x",
      doi: "10.1046/j.1365-2141.2003.04329.x",
      gradingScheme: "Adverse event survey; not graded.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "jcn-sr-2024",
      label: "The effectiveness of non-pharmacological interventions on reducing pain in patients undergoing bone marrow aspiration and biopsy: a systematic review and meta-analysis of randomized controlled trials",
      publisher: "Journal of Clinical Nursing",
      year: 2024,
      url: "https://doi.org/10.1111/jocn.17121",
      doi: "10.1111/jocn.17121",
      gradingScheme: "Meta-analysis with GRADE certainty assessment (certainty per outcome not given in the abstract).",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "reveh-2023",
      label: "A New Option for Pain Prevention Using a Therapeutic Virtual Reality Solution for Bone Marrow Biopsy (REVEH Trial): Open-Label, Randomized, Multicenter, Phase 3 Study",
      publisher: "Journal of Medical Internet Research",
      year: 2023,
      url: "https://doi.org/10.2196/38619",
      doi: "10.2196/38619",
      gradingScheme: "Randomised trial; not graded.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "meof-2014",
      label: "A randomised, double-blind, placebo-controlled study to assess the safety and efficacy of methoxyflurane for procedural pain of a bone marrow biopsy",
      publisher: "BMJ Supportive & Palliative Care",
      year: 2014,
      url: "https://doi.org/10.1136/bmjspcare-2013-000447",
      doi: "10.1136/bmjspcare-2013-000447",
      gradingScheme: "Randomised trial; not graded.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "aspiration-rct-2016",
      label: "Bone Marrow Aspiration: A Randomized Controlled Trial Assessing the Quality of Bone Marrow Specimens Using Slow and Rapid Aspiration Techniques and Evaluating Pain Intensity",
      publisher: "Acta Haematologica",
      year: 2016,
      url: "https://doi.org/10.1159/000438480",
      doi: "10.1159/000438480",
      gradingScheme: "Randomised trial; not graded.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "icsh-2008",
      label: "ICSH guidelines for the standardization of bone marrow specimens and reports",
      publisher: "International Council for Standardization in Hematology (International Journal of Laboratory Hematology)",
      year: 2008,
      url: "https://doi.org/10.1111/j.1751-553x.2008.01100.x",
      doi: "10.1111/j.1751-553x.2008.01100.x",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "jadpro-2012",
      label: "Bone Marrow Aspiration and Biopsy: A Guideline for Procedural Training and Competency Assessment",
      publisher: "Jackson et al., Journal of the Advanced Practitioner in Oncology",
      year: 2012,
      url: "https://doi.org/10.6004/jadpro.2012.3.4.7",
      doi: "10.6004/jadpro.2012.3.4.7",
      gradingScheme: "Training guideline; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "cruk-2025",
      label: "Bone marrow test (patient information, last reviewed 8 April 2025)",
      publisher: "Cancer Research UK",
      year: 2025,
      url: "https://www.cancerresearchuk.org/about-cancer/tests-and-scans/bone-marrow-test",
      gradingScheme: "Patient information describing usual UK practice; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["lidocaine"],
  technologies: ["bone-marrow-biopsy-devices", "music-therapy-cancer"],
  cancers: ["multiple-myeloma", "aml", "mds", "myeloproliferative-neoplasms"],
  terms: ["bone-marrow", "biopsy"],
  related: [],
  upgrades: [],
  gaps: [
    "No society guideline for performing or preparing for bone marrow aspirate and trephine biopsy was found; the ICSH 2008 guideline covers specimens and reports and was read as an abstract only.",
    "No source read sets platelet thresholds or intervals for stopping anticoagulants or antiplatelet drugs before the procedure; UK practice follows local policy.",
    "The BSH adverse event surveys date from 1995 to 2003 and were read as abstracts; no more recent national figure was found.",
    "The aftercare steps come from patient information describing usual practice, not from trials: the 24-hour dressing and the 24-hour restrictions after sedation have no evidence behind their exact timings.",
    "The trials of pain relief were read as abstracts; certainty of evidence per intervention in the 2024 meta-analysis was not available.",
  ],
});

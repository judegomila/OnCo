import { protocol } from "./helpers";

/*
 * Bone marrow aspirate and trephine biopsy in adults: preparation, pain control and aftercare.
 *
 * No society procedure guideline for the procedure itself could be read (the census for this round says the same). This
 * page therefore rests on the best evidence that exists and says so: the British Society for Haematology adverse event
 * surveys, randomised trials and a systematic review on pain, a nurse practitioner training guideline, the NICE
 * recommendation on platelet transfusion before the test, and a national patient information page as a description of
 * usual UK practice.
 *
 * First read on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again as raw text
 * (curl, Europe PMC REST) and every claim on the page was compared with it; quotes were checked verbatim by script.
 * - Bain, Bone marrow biopsy morbidity: review of 2003 (J Clin Pathol 2005) and Bone marrow biopsy morbidity and
 *   mortality (Br J Haematol 2003): abstracts, Europe PMC. The 2005 full text is not served as XML by Europe PMC
 *   (HTTP 500) or NCBI E-utilities (no body text), and the publisher PDFs of both returned 403.
 * - Added in the second pass: the two other surveys in the series, for 2002 (Clin Lab Haematol 2004) and 2004
 *   (Haematologica 2006): abstracts, Europe PMC. The Haematologica page returned 404.
 * - Non-pharmacological interventions for pain in bone marrow aspiration and biopsy: systematic review and
 *   meta-analysis of randomised trials (J Clin Nurs 2024): abstract, Europe PMC.
 * - REVEH trial, virtual reality against nitrous oxide/oxygen (JMIR 2023): full text, Europe PMC XML (PMC9978987);
 *   abstract only on the first read.
 * - Methoxyflurane against placebo for bone marrow biopsy (BMJ Supportive & Palliative Care 2014): abstract.
 * - Slow against rapid aspiration technique (Acta Haematologica 2016): abstract.
 * - ICSH guidelines for the standardization of bone marrow specimens and reports (Int J Lab Hematol 2008) and its
 *   successor, ICSH Guidance on Bone Marrow Examination and Reporting (Int J Lab Hematol 2026, found in the second
 *   pass): abstracts only.
 * - Jackson et al., Bone marrow aspiration and biopsy: a guideline for procedural training and competency assessment
 *   (J Adv Pract Oncol 2012): full text, Europe PMC XML (PMC4093339).
 * - Cancer Research UK, Bone marrow test (patient information, last reviewed 8 April 2025): full text (HTML).
 * - Added in the second pass: NICE NG24, platelet transfusion chapter (full text, HTML) and the British Society for
 *   Haematology two-page summary of its platelet transfusion guideline (PDF text). Both were fetched from nice.org.uk
 *   and b-s-h.org.uk on 17 November 2026 by the checker of the transfusion thresholds protocol and that copy was re-used.
 *
 * Every DOI was resolved through Europe PMC (the two new ones through Crossref as well) and its title checked. Quotes
 * are copied from the raw text with line breaks joined.
 */
export const boneMarrowAspirateAndTrephineBiopsy = protocol({
  id: "bone-marrow-aspirate-and-trephine-biopsy",
  name: "Bone marrow aspirate and trephine biopsy: preparation, pain control and aftercare",
  aka: ["bone marrow biopsy", "bone marrow test", "bone marrow aspiration", "BMAT", "trephine biopsy", "iliac crest biopsy", "bone marrow aspirate"],
  domain: "screening-diagnostics",
  tldr: "A bone marrow test takes a small sample of liquid marrow and a thin core of bone, usually from the hip, to look for blood cancers or check treatment. You are usually awake, with local anaesthetic; some people have sedation or gas and air. Problems are rare: a UK survey recorded 16 in 19,259 tests (0.08%). Call the hospital for fever, a red or oozing wound, or pain that is severe or getting worse.",
  simple: "A needle takes some marrow from inside your hip bone. You get a numbing injection. It can hurt for a short time, so ask about gas and air or medicine to relax you. Tell the team if you take blood thinners. Keep the dressing on for a day. Call the hospital if you get a fever, a red or leaking wound, or pain that is bad or getting worse.",
  summary: "No society guideline on how to do or prepare for the procedure could be read; this page is built from the evidence that exists. Safety: British Society for Haematology surveys recorded 26 adverse events, including one death, in an estimated 54,890 biopsies from 1995 to 2001; 17 in 13,506 procedures in 2002; 16 in 19,259 in 2003 (0.08%); and 15 in 20,323 in 2004. Haemorrhage was the commonest event (11 of the 16 in 2003). The risk factors for haemorrhage in 2003 were, in order of frequency, a myeloproliferative disorder, aspirin, other putative platelet dysfunction and thrombocytopenia; the 1995 to 2001 survey also named warfarin, disseminated intravascular coagulation and obesity. NICE (England) says not to offer prophylactic platelet transfusion before bone marrow aspiration and trephine biopsy, which it classes as low bleeding risk, and the British Society for Haematology summary lists it as not indicated. No source read sets intervals for stopping anticoagulants or antiplatelet drugs; plans are local.\n\nPain: under local anaesthetic, pain is reported in 70% of patients, of whom 35% rate it as severe (methoxyflurane trial background). A 2024 meta-analysis of 18 randomised studies (1,017 people) found distraction (SMD -0.85), a powered biopsy system (SMD -0.27) and acupoint stimulation (SMD -1.02) reduced pain, while hypnosis did not reach significance. Virtual reality was not significantly different from nitrous oxide/oxygen in REVEH (mean pain 3.0 against 3.5 of 10; 126 randomised, 118 analysed). Inhaled methoxyflurane lowered worst pain against placebo (4.9 against 6.0), with adverse events, all grade 1, in 20.4% against 4.2%. Sedation and gas and air (Entonox) are used in some UK hospitals. In one trial rapid aspiration gave better specimens than slow aspiration, with a median of 1 point more pain on a visual analogue scale.\n\nAftercare, as UK patient information describes it: eat and drink as usual unless having sedation, a dressing for 24 hours, pressure on any bleeding, mild painkillers for an ache that may last a couple of days, no driving or alcohol for 24 hours after sedation with someone at home overnight, and a call to the hospital advice line for fever, a red and sore or oozing site, feeling unwell, or severe or worsening pain.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home"],
  },
  population: "Adults having a bone marrow aspirate with or without trephine biopsy, usually from the hip (the REVEH trial biopsied the posterior iliac crest), to diagnose, stage or monitor leukaemia, lymphoma, myeloma or other blood and marrow disorders. Children and teenagers, who often have sedation, and sternal aspiration are outside scope.",
  trigger: "A bone marrow examination is requested.",
  steps: [
    {
      action: "Before the test, ask about medicines that thin the blood, including aspirin, and note the diagnosis and the platelet count",
      why: "Bleeding was the main adverse event in the UK surveys. It was seen most often in people with a myeloproliferative disorder, on aspirin, with other platelet problems or with a low platelet count. UK patient information asks people to say if they take blood thinners so the team can advise on stopping them.",
      source: "bain-2005",
      quote: "The major risk factors for haemorrhage, in order of frequency, were diagnosis of a myeloproliferative disorder, aspirin treatment, other putative platelet dysfunctions, and thrombocytopenia.",
      grade: "National adverse event survey (ungraded)",
    },
    {
      action: "In England, follow NICE: do not offer a preventive platelet transfusion just because the person is having this test",
      why: "NICE classes bone marrow aspiration and trephine biopsy as a procedure with a low risk of bleeding. The British Society for Haematology summary also lists platelet transfusion before it as not indicated. Neither sets a platelet count below which the test should not be done.",
      source: "nice-ng24-platelets",
      quote: "Do not offer prophylactic platelet transfusions to people having procedures with a low risk of bleeding, such as adults having central venous cannulation or any people having bone marrow aspiration and trephine biopsy.",
      grade: "NICE recommendation 1.7.8 [2015] (NICE does not grade recommendations)",
    },
    {
      action: "Explain the test and its risks, and take written consent",
      why: "UK patient information describes the test as very safe with small risks. The UK surveys found adverse events in about 0.08% of procedures and noted that they can have a considerable impact on the person affected.",
      source: "cruk-2025",
      quote: "Your doctor or nurse gives you information about the procedure and asks you to sign a consent form.",
      grade: "Patient information (ungraded)",
    },
    {
      action: "Let the person eat and drink as usual unless they are having sedation; before sedation they stop eating and drinking for a few hours, as the unit instructs",
      why: "UK patient information says people can usually eat and drink before the test, and that those having sedation should stop for a few hours beforehand.",
      source: "cruk-2025",
      quote: "You are usually able to eat and drink before your test.",
      grade: "Patient information (ungraded)",
    },
    {
      action: "Give local anaesthetic, and consider something more for pain or anxiety, such as sedation, gas and air or inhaled methoxyflurane where available",
      why: "About 70% of people report pain with local anaesthetic alone, and 35% of those rate it as severe. No guideline read here says which extra pain relief to offer.",
      source: "meof-2014",
      quote: "Pain during bone marrow biopsy (BMB) under local anaesthesia (LA) is reported in 70% of patients, of whom 35% rate the pain as severe.",
      grade: "Randomised trial background statement (ungraded)",
    },
    {
      action: "Consider distraction during the procedure; virtual reality is one form that has been tested in a trial",
      why: "A 2024 meta-analysis of randomised trials found that distraction reduced pain, and its authors say staff should consider using it. The abstract does not list which kinds of distraction were tested.",
      source: "jcn-sr-2024",
      quote: "Distraction, powered bone marrow biopsy system and acupoint stimulation are effective in reducing pain among patients undergoing bone marrow aspiration and biopsy.",
      grade: "Systematic review and meta-analysis of randomised trials (GRADE certainty not stated in the abstract)",
    },
    {
      action: "Consider aspirating rapidly rather than slowly, and tell the person they may feel a pulling sensation",
      why: "In one randomised trial of 482 people, slow aspiration had higher odds of a poor quality sample (odds ratio 3.05 for cellularity), while rapid aspiration gave a median of 1 point more pain on a visual analogue scale. The authors propose the rapid technique.",
      source: "aspiration-rct-2016",
      quote: "We propose that the R-technique is preferable to the S-technique due to better specimen quality.",
      grade: "Randomised trial (ungraded)",
    },
    {
      action: "Cover the site with a dressing to stay on for 24 hours, and tell the person to press on it if it bleeds and call if bleeding does not stop",
      why: "UK patient information says a small amount of bleeding can happen where the needle went in, and gives this advice for it.",
      source: "cruk-2025",
      quote: "You have a dressing over the site, which you should keep on for 24 hours. If you notice any bleeding apply pressure to the area. If it doesn't stop, contact your hospital 24 hour advice line.",
      grade: "Patient information (ungraded)",
    },
    {
      action: "After sedation, make sure someone takes the person home and stays overnight, and advise no driving, alcohol or heavy machinery for 24 hours",
      why: "Sedation makes people drowsy. UK patient information sets these limits, and says people stay in the department for a few hours after the test to recover.",
      source: "cruk-2025",
      quote: "If you have sedation, you’ll need someone to take you home and stay with you overnight. Also, for 24 hours after, you shouldn’t drive, drink alcohol, or operate heavy machinery.",
      grade: "Patient information (ungraded)",
    },
    {
      action: "Tell the person to call the hospital advice line for a temperature, a red and sore site, fluid oozing, feeling unwell, or pain that is severe or getting worse",
      why: "UK patient information lists the first four as reasons to call about a wound infection, which it describes as a small risk, and asks people to contact the hospital for pain that is severe or getting worse.",
      source: "cruk-2025",
      quote: "If you have severe pain or it's getting worse then you should contact the hospital.",
      grade: "Patient information (ungraded)",
    },
  ],
  bestInClass: {
    statement: "No graded guideline for performing or preparing for bone marrow biopsy could be read. The best-supported elements are: a bleeding history covering aspirin, warfarin, platelet dysfunction, thrombocytopenia and myeloproliferative disorders (BSH surveys, where these were the factors most often present in haemorrhage, the commonest adverse event; all adverse events together were about 0.08% of procedures in 2003); no prophylactic platelet transfusion for the test itself (NICE, a 2015 recommendation for England, with the BSH summary in agreement); local anaesthetic with additional analgesia or sedation considered, since 70% of people still report pain; and distraction, which a 2024 meta-analysis of randomised trials found effective. Virtual reality and nitrous oxide/oxygen did not differ significantly in one phase 3 trial. Aftercare is usual practice as UK patient information describes it, without trial evidence.",
    sources: ["bain-2005", "bain-2003", "nice-ng24-platelets", "bsh-platelets-2016-summary", "jcn-sr-2024", "reveh-2023", "meof-2014", "cruk-2025"],
  },
  variants: [
    {
      name: "Nitrous oxide/oxygen (Entonox or MEOPA) for pain",
      differs: "An inhaled gas mixture breathed by the patient during the procedure. Cancer Research UK says some hospitals use it instead of sedation; the REVEH authors, working in France, describe it as having become standard for preventing pain.",
      evidence: "REVEH (126 patients randomised at 5 centres in France, 118 analysed): mean pain 3.5 of 10 with nitrous oxide/oxygen and 3.0 with virtual reality, not significantly different (P = .26); all also had lidocaine.",
      sources: ["reveh-2023", "cruk-2025"],
    },
    {
      name: "Inhaled methoxyflurane (Penthrox)",
      differs: "A self-administered handheld inhaler, licensed in Australia for the relief of pain associated with short surgical procedures.",
      evidence: "Randomised, double-blind trial of 100 patients with cancer: worst pain 4.90 against 6.0 with placebo (p = 0.011). Adverse events, all grade 1, were reported by 20.4% with methoxyflurane and 4.2% with placebo (p = 0.028).",
      sources: ["meof-2014"],
    },
    {
      name: "Powered biopsy systems",
      differs: "A powered bone marrow biopsy system is used in place of a manual needle.",
      evidence: "In the 2024 meta-analysis, powered systems reduced pain (SMD -0.27, 95% CI -0.53 to -0.003, p = .048).",
      sources: ["jcn-sr-2024"],
    },
    {
      name: "Follow-up telephone calls (nurse practitioner training model)",
      differs: "A nurse practitioner in training calls each patient one day after the procedure and again at one week to ask about adverse events, and documents the answers.",
      evidence: "Suggested in a US training guideline as a way to assess technique; it gives no outcome evidence.",
      sources: ["jadpro-2012"],
    },
  ],
  grades: [
    { claim: "Adverse events, including one death, in UK biopsies 1995 to 2001", grade: "National postal survey (ungraded)", source: "bain-2003", quote: "A total of 26 adverse events, including one death directly attributable to the procedure, were reported among an estimated 54 890 biopsies." },
    { claim: "Adverse events in UK procedures in 2003", grade: "National adverse event survey (ungraded)", source: "bain-2005", quote: "Sixteen adverse events were reported, representing 0.08% of total reported procedures." },
    { claim: "Adverse events in UK procedures in 2004", grade: "National adverse event survey (ungraded)", source: "bain-2006", quote: "The latest annual survey documented 15 adverse events, mainly hemorrhagic, among 20323 procedures." },
    { claim: "No prophylactic platelet transfusion before bone marrow aspiration and trephine biopsy", grade: "NICE recommendation 1.7.8 [2015] (ungraded)", source: "nice-ng24-platelets", quote: "Do not offer prophylactic platelet transfusions to people having procedures with a low risk of bleeding, such as adults having central venous cannulation or any people having bone marrow aspiration and trephine biopsy." },
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "bain-2004",
      label: "Bone marrow biopsy morbidity and mortality: 2002 data",
      publisher: "Bain, Clinical and Laboratory Haematology (British Society for Haematology survey)",
      year: 2004,
      url: "https://doi.org/10.1111/j.1365-2257.2004.00630.x",
      doi: "10.1111/j.1365-2257.2004.00630.x",
      gradingScheme: "Adverse event survey; not graded.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "bain-2006",
      label: "Morbidity associated with bone marrow aspiration and trephine biopsy - a review of UK data for 2004",
      publisher: "Bain, Haematologica",
      year: 2006,
      url: "https://europepmc.org/abstract/MED/16956842",
      gradingScheme: "Adverse event survey; not graded.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng24-platelets",
      label: "Blood transfusion (NG24): platelet transfusion",
      publisher: "NICE",
      year: 2015,
      url: "https://www.nice.org.uk/guidance/ng24/chapter/Platelet-transfusion",
      gradingScheme: "NICE does not grade recommendations; the wording (offer, consider, do not offer) shows their strength, and each is dated, here [2015].",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "bsh-platelets-2016-summary",
      label: "Summary of Guidelines for the Use of Platelet Transfusions: A British Society for Haematology Guideline (2016), Appendix 1",
      publisher: "British Society for Haematology",
      year: 2016,
      url: "https://b-s-h.org.uk/media/20677/bsh-platelet-transfusion-guidelines-summary-2021.pdf",
      gradingScheme: "The summary prints no grades. It is marked \"Reviewed December 2021\".",
      read: "public-summary",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "reveh-2023",
      label: "A New Option for Pain Prevention Using a Therapeutic Virtual Reality Solution for Bone Marrow Biopsy (REVEH Trial): Open-Label, Randomized, Multicenter, Phase 3 Study",
      publisher: "Journal of Medical Internet Research",
      year: 2023,
      url: "https://doi.org/10.2196/38619",
      doi: "10.2196/38619",
      gradingScheme: "Randomised trial; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "icsh-2008",
      label: "ICSH guidelines for the standardization of bone marrow specimens and reports",
      publisher: "International Council for Standardization in Hematology (International Journal of Laboratory Hematology)",
      year: 2008,
      url: "https://doi.org/10.1111/j.1751-553x.2008.01100.x",
      doi: "10.1111/j.1751-553x.2008.01100.x",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "icsh-2026",
      label: "ICSH Guidance on Bone Marrow Examination and Reporting",
      publisher: "International Council for Standardization in Haematology (International Journal of Laboratory Hematology)",
      year: 2026,
      url: "https://doi.org/10.1111/ijlh.70214",
      doi: "10.1111/ijlh.70214",
      read: "abstract",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "cruk-2025",
      label: "Bone marrow test (patient information, last reviewed 8 April 2025)",
      publisher: "Cancer Research UK",
      year: 2025,
      url: "https://www.cancerresearchuk.org/about-cancer/tests-and-scans/bone-marrow-test",
      gradingScheme: "Patient information describing usual UK practice; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["lidocaine"],
  technologies: ["bone-marrow-biopsy-devices", "music-therapy-cancer"],
  cancers: ["multiple-myeloma", "aml", "mds", "myeloproliferative-neoplasms"],
  terms: ["bone-marrow", "biopsy"],
  related: [],
  upgrades: [],
  gaps: [
    "No society guideline for performing or preparing for bone marrow aspirate and trephine biopsy could be read. The ICSH 2008 guideline on specimens and reports has a successor, ICSH Guidance on Bone Marrow Examination and Reporting (International Journal of Laboratory Hematology, published 4 September 2026), which describes itself as an extension and refinement of the 2008 text. On 17 November 2026 both could be read only as abstracts (subscription, no open copy listed by Europe PMC), so what either says about the procedure itself, if anything, is not on this page and no step rests on them.",
    "No source read sets a platelet count below which the test should not be done, or intervals for stopping anticoagulants or antiplatelet drugs before it; UK practice follows local policy. NICE (a 2015 recommendation, unchanged by its 26 February 2026 update, and written for the NHS in England) says not to offer prophylactic platelet transfusion for the test; the British Society for Haematology guideline that agrees was read only as the society's two-page summary.",
    "The BSH adverse event surveys cover 1995 to 2004 and were read as abstracts; no later national figure was found on 17 November 2026. The 2003 survey's 0.08% counts all reported adverse events, not haemorrhage alone, and the surveys relied on voluntary reports from members. The free full texts of the 2003 and 2005 papers returned 403 to a script and the 2006 Haematologica page returned 404.",
    "The aftercare steps come from patient information describing usual practice, not from trials: the 24-hour dressing and the 24-hour restrictions after sedation have no evidence behind their exact timings. The warning signs and whom to call are Cancer Research UK's wording; it gives no time limit for calling.",
    "The trials of pain relief, other than REVEH, were read as abstracts; certainty of evidence per intervention in the 2024 meta-analysis was not available, and its abstract does not say which kinds of distraction (music, conversation or virtual reality) the pooled trials used. No source read gives a dose of local anaesthetic or of a sedative, so none is given here.",
  ],
});

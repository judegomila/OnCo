import { protocol } from "./helpers";

/*
 * Venous thromboembolism (blood clot) risk assessment and primary thromboprophylaxis for people having anticancer
 * treatment as outpatients.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again as raw
 * text (curl, Europe PMC REST, one plain request to PubMed Central) into a scratch directory, or re-used from the copy
 * the checker of cancer-associated-vte-treatment saved the same day, and every claim re-read against it. Quotes were
 * checked verbatim by script.
 * - ITAC 2022 international clinical practice guidelines (Farge et al., Lancet Oncol 2022, PMC9236567): full text from
 *   the Europe PMC full-text XML, tags stripped (sibling's copy re-used), including the recommendation panels.
 * - ASH 2021 guidelines on VTE in patients with cancer (Lyman et al., Blood Adv 2021, PMC7903232): new to this page,
 *   read in full from the PubMed Central HTML (one plain request, no challenge page). Its April 2021 erratum
 *   (10.1182/bloodadvances.2021004734) exists and its text could not be read.
 * - NICE NG89 (published 21 March 2018, last updated 13 August 2019, last reviewed 18 September 2024): recommendations
 *   page and overview, HTML, section 1.6 on people with cancer.
 * - Khorana et al. 2008, the derivation and validation of the Khorana score: now read in full from the PubMed Central
 *   HTML (PMC2384124); it had been read as an abstract only. Tables 2 and 3 and the cancer sites come from it.
 * - AVERT (Carrier et al., NEJM 2019) and CASSINI (Khorana et al., NEJM 2019): new to this page, abstracts only, from
 *   Europe PMC. They are the source of the two trial doses and of the event counts.
 * - ASCO 2020: abstract only, from Europe PMC; ascopubs.org returned 403 to a script again. ASCO 2023: full text of the
 *   update from the Internet Archive capture of 11 July 2025 that the sibling checker saved; it revises the surgical
 *   and treatment questions only and does not reprint the outpatient recommendation.
 * - NHS page on deep vein thrombosis (last reviewed 30 April 2026): HTML, for the warning signs and how fast to act.
 * - ESMO 2023 VTE guideline: still not reachable. The publisher answered with a browser check and Europe PMC holds no
 *   abstract. Named, not used.
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. No newer edition of the ITAC, ASCO, ASH
 * or ESMO guideline was found in Europe PMC. Figures whose superscripts the raw text mangles (platelet and white cell
 * counts) are left out of quotes and stated in the prose.
 */
export const vteRiskAssessmentAndThromboprophylaxisAmbulatory = protocol({
  id: "vte-risk-assessment-and-thromboprophylaxis-ambulatory",
  name: "Blood clot risk assessment and preventive anticoagulation during outpatient cancer treatment",
  aka: ["Khorana score", "ambulatory thromboprophylaxis", "primary VTE prophylaxis in cancer outpatients", "cancer-associated thrombosis prevention", "blood thinners to prevent clots during chemotherapy"],
  domain: "supportive-care",
  tldr: "Cancer and its treatment raise the chance of a blood clot in a leg or lung. Blood thinners are not given routinely to everyone having treatment as an outpatient, but some people are offered one: your team can work out your risk with a simple score from your blood count, weight and type of cancer. Know the signs of a clot: a swollen, painful leg, or breathlessness or chest pain.",
  simple: "Cancer can make blood clots more likely. Your team checks how likely a clot is. If your risk is high, they may offer a blood thinner. Get medical help as soon as possible for a swollen, painful leg. Call 999 if you also feel short of breath or have chest pain.",
  summary: "Routine thromboprophylaxis is not recommended for all outpatients with cancer (ITAC 2022; ASCO 2020; NICE NG89 for mobile people on anticancer treatment; ASH 2021 advises against it at low risk). Risk is assessed periodically (ASCO) with a validated model. The usual one is the Khorana score, built from values taken before chemotherapy starts: 2 points for a very high-risk cancer site (stomach, pancreas), 1 point for a high-risk site (lung, lymphoma, gynaecological, bladder, testicular), and 1 point each for platelets of 350 × 10⁹/L or more, haemoglobin below 100 g/L or use of a red cell growth factor, white cells above 11 × 10⁹/L and a body mass index of 35 kg/m² or more. Khorana (2008) called a score of 0 low risk, 1 to 2 intermediate and 3 or more high; clots occurred in 7.1% and 6.7% of the high-risk group in its two cohorts over a median of 2.5 months.\n\nThe guidelines differ on the cut-off and on the drug. ITAC (2022) recommends rivaroxaban or apixaban for ambulatory patients on systemic anticancer therapy with a Khorana score of 2 or more who are not actively bleeding or at high risk of bleeding (grade 1B). ASH (2021) sorts patients into low, intermediate and high risk with the Khorana score and clinical judgement, and the text read prints no score cut-offs for the three groups: at high risk it suggests apixaban or rivaroxaban, or low-molecular-weight heparin, over no prophylaxis; at intermediate risk it suggests apixaban or rivaroxaban or no prophylaxis, and suggests no low-molecular-weight heparin (all conditional, moderate certainty). ASCO (2020, read as an abstract) says clinicians may offer apixaban, rivaroxaban or low-molecular-weight heparin to selected high-risk outpatients. Both trials of the oral drugs enrolled people with a score of 2 or more. AVERT tested apixaban 2.5 mg twice daily: clots occurred in 12 of 288 patients (4.2%) against 28 of 275 (10.2%) on placebo over 180 days, and major bleeding in 10 (3.5%) against 5 (1.8%). CASSINI tested rivaroxaban 10 mg daily for up to 180 days: the primary end point occurred in 25 of 420 (6.0%) against 37 of 421 (8.8%), which was not statistically significant (hazard ratio 0.66, 95% confidence interval 0.40 to 1.09), and major bleeding in 8 of 405 (2.0%) against 4 of 404 (1.0%).\n\nNICE NG89 (2018) uses no score: it says not to offer prophylaxis to mobile people on cancer treatment unless they are at increased risk for another reason, and to consider it for myeloma on thalidomide, pomalidomide or lenalidomide with steroids (aspirin 75 mg or 150 mg, or low-molecular-weight heparin) and for pancreatic cancer on chemotherapy (low-molecular-weight heparin), continued for as long as chemotherapy lasts. ITAC recommends prophylaxis in locally advanced or metastatic pancreatic cancer on systemic therapy with low bleeding risk (low-molecular-weight heparin grade 1A, rivaroxaban or apixaban grade 1B) and in myeloma on immunomodulatory drugs with steroids or other systemic therapy (grade 1A), where it lists a vitamin K antagonist at low or therapeutic dose, apixaban or low-molecular-weight heparin at prophylactic dose, or aspirin 100 mg daily (grade 2B). ASH suggests low-dose aspirin, a fixed low-dose vitamin K antagonist or low-molecular-weight heparin in myeloma (conditional, low certainty). ITAC does not recommend low-molecular-weight heparin outside a trial in locally advanced or metastatic lung cancer (guidance).",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "pharmacist", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "home"],
  },
  population: "Adults with cancer having systemic anticancer treatment as outpatients. People admitted to hospital, people having cancer surgery, people with a central venous catheter and the treatment of an established clot are covered by separate recommendations in the same guidelines and are not covered here. NICE NG89 covers people aged 16 or over. The Khorana score was built in adults starting a new chemotherapy regimen; the study excluded acute leukaemia and stem cell transplant and had too few people with brain or kidney cancer or myeloma to assess them.",
  trigger: "Systemic anticancer treatment is about to start, and periodically during it.",
  steps: [
    {
      action: "Do not give preventive blood thinners routinely to every outpatient with cancer",
      why: "Most outpatients are at low risk. In the study that built the Khorana score, about 27% of patients had a clot risk as low as 0.3% and a further 60% a risk of about 2% over a median of 2.5 months, and its authors thought these groups unlikely to benefit. ITAC does not recommend routine prophylaxis either, and ASH recommends against it at low risk.",
      source: "asco-2020",
      quote: "Thromboprophylaxis is not routinely recommended for all outpatients with cancer.",
    },
    {
      action: "Assess clot risk before systemic treatment starts and periodically during it, with a validated score such as the Khorana score and clinical judgement",
      why: "ASCO asks for periodic assessment. ITAC and ASH both name the Khorana score as the validated tool, and ASH says it should be complemented by clinical judgement and experience.",
      source: "asco-2020",
      quote: "Patients with cancer should be periodically assessed for VTE risk, and oncology professionals should provide patient education about the signs and symptoms of VTE.",
    },
    {
      action: "Score the cancer site, and the platelet count, haemoglobin or use of a red cell growth factor, white cell count and body mass index measured before chemotherapy",
      why: "Stomach and pancreatic cancer score 2. Lung, lymphoma, gynaecological, bladder and testicular cancer score 1 (the paper's text says genitourinary cancers other than prostate). Platelets of 350 × 10⁹/L or more, haemoglobin below 100 g/L or a red cell growth factor, white cells above 11 × 10⁹/L and a body mass index of 35 or more score 1 each. A score of 3 or more marked a clot risk of about 7% over a median of 2.5 months.",
      source: "khorana-2008",
      quote: "For further analysis, sites of cancer were categorized into “very high risk” with VTE rates 3-fold or higher than the average risk for the population (gastric, pancreatic), “high risk” with rates higher than average (lung, lymphoma, gynecologic, genitourinary excluding prostate), and “others” with rates at or below average (breast, colorectal, prostate, and others).",
    },
    {
      action: "Check for active bleeding, bleeding risk, platelet count, kidney function and medicine interactions before offering an anticoagulant",
      why: "ITAC limits its recommendation to people who are not actively bleeding and not at high risk of bleeding. Its guidance is that prophylaxis could be used with platelets above 80 × 10⁹/L and only case by case below that (the two trials allowed counts down to 50 × 10⁹/L), and case by case when creatinine clearance is below 30 mL/min. Both ITAC and ASH, in their sections on treating clots, name drug interactions among the things that decide the choice of anticoagulant.",
      source: "ash-2021",
      quote: "The panel noted that, even for patients at high risk for thrombosis, thromboprophylaxis should be used with caution for those at high risk for bleeding.",
    },
    {
      action: "For a Khorana score of 2 or more without high bleeding risk, offer rivaroxaban or apixaban (ITAC); ASH suggests this at high risk and leaves it optional at intermediate risk",
      why: "In a meta-analysis of six randomised trials (4626 patients) that ITAC cites, prophylaxis reduced clots by 42% at a score of 2 or more and by 55% at 3 or more, without more major bleeding. In the AVERT trial on its own, major bleeding was more frequent with apixaban than with placebo (3.5% against 1.8%).",
      source: "itac-2022",
      quote: "Primary prophylaxis with direct oral anticoagulant (rivaroxaban or apixaban) is recommended in ambulatory patients who are receiving systemic anticancer therapy and are at intermediate-to-high-risk of VTE, identified by a validated risk assessment model (ie, a Khorana score ≥2), and not actively bleeding or not at a high risk for bleeding (grade 1B).",
      grade: "1B",
    },
    {
      action: "Where an oral anticoagulant is used, know the doses the trials tested: apixaban 2.5 mg twice daily (AVERT) or rivaroxaban 10 mg daily (CASSINI); follow the local formulary for the dose prescribed",
      why: "These are the doses the two placebo-controlled trials gave to people with a Khorana score of 2 or more. No guideline recommendation read for this page prints a dose, so the trial reports are the source.",
      source: "avert-2019",
      quote: "We conducted a randomized, placebo-controlled, double-blind clinical trial assessing the efficacy and safety of apixaban (2.5 mg twice daily) for thromboprophylaxis in ambulatory patients with cancer who were at intermediate-to-high risk for venous thromboembolism (Khorana score, ≥2) and were initiating chemotherapy.",
    },
    {
      action: "In locally advanced or metastatic pancreatic cancer on systemic treatment with low bleeding risk, offer prophylaxis with low-molecular-weight heparin or with rivaroxaban or apixaban",
      why: "ITAC bases this on two randomised trials and subgroup analyses of three others; in a meta-analysis of five trials (1003 patients) prophylaxis reduced clots by 69% without excess bleeding. NICE says to consider low-molecular-weight heparin for people with pancreatic cancer on chemotherapy.",
      source: "itac-2022",
      quote: "Primary pharmacological prophylaxis of VTE with LMWH (grade 1A) or with direct oral anticoagulants (rivaroxaban or apixaban; grade 1B) is indicated in ambulatory patients with locally advanced or metastatic pancreatic cancer treated with systemic anticancer therapy and who have a low risk of bleeding.",
      grade: "1A (LMWH); 1B (rivaroxaban or apixaban)",
    },
    {
      action: "In myeloma treated with thalidomide, lenalidomide or pomalidomide, give prophylaxis with low-dose aspirin, low-molecular-weight heparin or one of the other options the guidelines list",
      why: "In a meta-analysis of ten studies (1964 patients) that ITAC cites, aspirin reduced clots compared with no prophylaxis but left more clots than low-molecular-weight heparin; a Cochrane analysis ITAC also cites found no significant difference between the two. ASH says low-molecular-weight heparin should be considered for people at higher risk. NICE words this as 'consider', with aspirin 75 mg or 150 mg or low-molecular-weight heparin.",
      source: "itac-2022",
      quote: "In patients with myeloma treated with immunomodulatory drugs combined with steroids or other systemic anticancer therapies, VTE primary pharmacological prophylaxis is recommended (grade 1A); in this setting, oral anticoagulants (vitamin K antagonists at low or therapeutic doses and apixaban at prophylactic doses), LMWH at prophylactic doses, or low-dose aspirin (100 mg daily) can be used, and have shown similar effects with regard to preventing VTE (grade 2B).",
      grade: "1A (giving prophylaxis); 2B (choice among the options)",
    },
    {
      action: "Do not use low-molecular-weight heparin prophylaxis in locally advanced or metastatic lung cancer outside a clinical trial",
      why: "ITAC says that in lung cancer the benefit of prophylaxis is offset by the risk of bleeding.",
      source: "itac-2022",
      quote: "Primary pharmacological prophylaxis of VTE with LMWH is not recommended outside of a clinical trial for patients with locally advanced or metastatic lung cancer treated with systemic anticancer therapy, including patients who have a low risk of bleeding (guidance).",
      grade: "guidance",
    },
    {
      action: "Where prophylaxis is given for myeloma or pancreatic cancer, continue it for as long as the chemotherapy continues (NICE)",
      why: "NICE ties the length of prophylaxis to the chemotherapy. The other guidelines read set no length for oral prophylaxis at a high Khorana score; CASSINI gave rivaroxaban for up to 180 days and AVERT measured clots over 180 days.",
      source: "nice-ng89",
      quote: "If giving VTE prophylaxis to people with cancer (see recommendations 1.6.2 and 1.6.3), continue for as long as they are receiving chemotherapy.",
    },
    {
      action: "Teach every patient the signs of a clot and what to do about them",
      why: "The NHS lists throbbing pain or swelling in one leg, usually the calf or thigh, with red, blue or darkened skin or swollen veins. It says to ask for an urgent GP appointment or get help from NHS 111 for a suspected clot, and to call 999 or go to A&E if there is also shortness of breath or chest pain.",
      source: "asco-2020",
      quote: "Patients with cancer should be periodically assessed for VTE risk, and oncology professionals should provide patient education about the signs and symptoms of VTE.",
    },
  ],
  bestInClass: {
    statement: "No guideline read recommends prophylaxis for every outpatient, and each makes exceptions for people at higher risk; they disagree on where the line falls. ITAC (2022, GRADE) recommends rivaroxaban or apixaban at a Khorana score of 2 or more without high bleeding risk (grade 1B). ASH (2021, GRADE) suggests apixaban, rivaroxaban or low-molecular-weight heparin at high risk, and apixaban or rivaroxaban or no prophylaxis at intermediate risk (conditional recommendations, moderate certainty). ASCO (2020) allows apixaban, rivaroxaban or low-molecular-weight heparin for selected high-risk outpatients, and its 2023 update did not revisit the question. NICE NG89 (2018) uses no score and limits prophylaxis in mobile people on cancer treatment to myeloma on thalidomide, pomalidomide or lenalidomide with steroids and to pancreatic cancer on chemotherapy, both as 'consider'. ITAC, ASH and NICE all single out myeloma on these drugs; ITAC and NICE also single out pancreatic cancer. The ESMO 2023 guideline could not be read.",
    sources: ["itac-2022", "ash-2021", "asco-2020", "asco-2023", "nice-ng89", "esmo-2023"],
  },
  variants: [
    {
      name: "No risk score; prophylaxis only in myeloma and pancreatic cancer (NICE NG89)",
      differs: "Says not to offer prophylaxis to mobile people on chemotherapy, radiotherapy or immunotherapy unless they are at increased risk for a reason other than the cancer, and to consider it only for myeloma on thalidomide, pomalidomide or lenalidomide with steroids (aspirin 75 mg or 150 mg, or low-molecular-weight heparin) and pancreatic cancer on chemotherapy (low-molecular-weight heparin).",
      evidence: "NICE does not grade recommendations; these were published in March 2018, before the AVERT and CASSINI trials of oral anticoagulants were reported. NICE checked the guideline in September 2024 and decided not to update it.",
      sources: ["nice-ng89", "avert-2019", "cassini-2019"],
    },
    {
      name: "Three risk groups, with a different answer for each (ASH 2021)",
      differs: "At high risk, suggests apixaban or rivaroxaban, or low-molecular-weight heparin, over no prophylaxis. At intermediate risk, suggests apixaban or rivaroxaban or no prophylaxis, and no low-molecular-weight heparin. At low risk, recommends no low-molecular-weight heparin and suggests no oral anticoagulant. Recommends against a vitamin K antagonist at any risk. ITAC instead draws one line at a Khorana score of 2 or more.",
      evidence: "Conditional recommendations on moderate certainty evidence, except no low-molecular-weight heparin at low risk and no vitamin K antagonist, which are strong. ASH says the groups should come from a validated tool such as the Khorana score with clinical judgement; the text read prints no score cut-offs for them. Khorana's own paper calls 1 to 2 intermediate and 3 or more high.",
      sources: ["ash-2021", "khorana-2008"],
    },
    {
      name: "Low-molecular-weight heparin as an option at high risk (ASCO 2020, ASH 2021)",
      differs: "Includes low-molecular-weight heparin, as well as apixaban and rivaroxaban, for selected high-risk outpatients, where ITAC's recommendation at a Khorana score of 2 or more names the two oral drugs only.",
      evidence: "ASCO was read as an abstract, which gives neither the score threshold nor the grade. ITAC's own discussion says low-molecular-weight heparin (grade 1A) and the oral drugs (grade 1B) have both gained evidence at a Khorana score of 2 or more, although its recommendation panel names only the oral drugs.",
      sources: ["asco-2020", "ash-2021", "itac-2022"],
    },
    {
      name: "Which drug in myeloma, and which aspirin dose (ITAC, ASH, NICE)",
      differs: "ITAC lists aspirin 100 mg daily, prophylactic low-molecular-weight heparin, a vitamin K antagonist at low or therapeutic dose and prophylactic apixaban. ASH lists low-dose aspirin, a fixed low-dose vitamin K antagonist or low-molecular-weight heparin, and does not list apixaban. NICE names aspirin 75 mg or 150 mg, or low-molecular-weight heparin.",
      evidence: "ITAC grades giving prophylaxis 1A and the choice among its options 2B, saying they have shown similar effects. ASH's is a conditional recommendation on low certainty evidence; it remarks that low-molecular-weight heparin should be considered at higher risk because of greater efficacy, and that bleeding is likely to be more frequent in people on aspirin who are also on steroids. NICE does not grade. ITAC reports two small single-arm studies of apixaban 2.5 mg twice daily in myeloma.",
      sources: ["itac-2022", "ash-2021", "nice-ng89"],
    },
  ],
  grades: [
    { claim: "Rivaroxaban or apixaban for ambulatory patients on systemic anticancer therapy with a Khorana score of 2 or more, not actively bleeding or at high bleeding risk", grade: "1B (GRADE)", source: "itac-2022" },
    { claim: "Low-molecular-weight heparin in locally advanced or metastatic pancreatic cancer on systemic treatment, low bleeding risk", grade: "1A (GRADE)", source: "itac-2022" },
    { claim: "Rivaroxaban or apixaban in the same pancreatic cancer setting", grade: "1B (GRADE)", source: "itac-2022" },
    { claim: "Prophylaxis in myeloma on immunomodulatory drugs with steroids or other systemic therapy", grade: "1A (GRADE)", source: "itac-2022" },
    { claim: "Choice among anticoagulants and low-dose aspirin in myeloma", grade: "2B (GRADE)", source: "itac-2022", quote: "or low-dose aspirin (100 mg daily) can be used, and have shown similar effects with regard to preventing VTE (grade 2B)." },
    { claim: "No low-molecular-weight heparin prophylaxis outside a trial in locally advanced or metastatic lung cancer", grade: "guidance (no GRADE rating)", source: "itac-2022" },
    { claim: "Apixaban or rivaroxaban over no prophylaxis at high risk", grade: "conditional recommendation, moderate certainty in the evidence of effects", source: "ash-2021" },
    { claim: "Apixaban or rivaroxaban, or no prophylaxis, at intermediate risk", grade: "conditional recommendation, moderate certainty in the evidence of effects", source: "ash-2021" },
    { claim: "Low-molecular-weight heparin over no prophylaxis at high risk", grade: "conditional recommendation, moderate certainty in the evidence of effects", source: "ash-2021" },
    { claim: "No prophylaxis over low-molecular-weight heparin at low risk", grade: "strong recommendation, moderate certainty in the evidence of effects", source: "ash-2021" },
    { claim: "Low-dose aspirin, fixed low-dose vitamin K antagonist or low-molecular-weight heparin in myeloma on lenalidomide, thalidomide or pomalidomide-based regimens", grade: "conditional recommendation, low certainty in the evidence of effects", source: "ash-2021" },
  ],
  sources: [
    { key: "itac-2022", label: "2022 international clinical practice guidelines for the treatment and prophylaxis of venous thromboembolism in patients with cancer, including patients with COVID-19", publisher: "International Initiative on Thrombosis and Cancer (ITAC), Lancet Oncology", year: 2022, url: "https://europepmc.org/article/PMC/PMC9236567", doi: "10.1016/S1470-2045(22)00160-7", gradingScheme: "GRADE: 1 is a strong and 2 a weak recommendation; the letter is the level of evidence, from A (high) to D (very low). 'Guidance' is best clinical practice, the panel's consensus where clear evidence is absent.", read: "full-text", accessed: "2026-11-17" },
    { key: "ash-2021", label: "American Society of Hematology 2021 guidelines for management of venous thromboembolism: prevention and treatment in patients with cancer", publisher: "American Society of Hematology, Blood Advances", year: 2021, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7903232/", doi: "10.1182/bloodadvances.2020003442", gradingScheme: "GRADE: a recommendation is strong ('recommends') or conditional ('suggests'), printed with the certainty in the evidence (high, moderate, low or very low).", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-ng89", label: "Venous thromboembolism in over 16s: reducing the risk of hospital-acquired deep vein thrombosis or pulmonary embolism (NG89), recommendations", publisher: "NICE", year: 2018, url: "https://www.nice.org.uk/guidance/ng89/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the strength is in the wording ('offer', 'consider', 'do not offer') and each is dated, for example [2018]. Published 21 March 2018, last updated 13 August 2019, last reviewed 18 September 2024.", read: "full-text", accessed: "2026-11-17" },
    { key: "asco-2020", label: "Venous Thromboembolism Prophylaxis and Treatment in Patients With Cancer: ASCO Clinical Practice Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2020, url: "https://europepmc.org/abstract/MED/31381464", doi: "10.1200/JCO.19.01461", read: "abstract", accessed: "2026-11-17" },
    { key: "asco-2023", label: "Venous Thromboembolism Prophylaxis and Treatment in Patients With Cancer: ASCO Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2023, url: "https://europepmc.org/abstract/MED/37075273", doi: "10.1200/JCO.23.00294", read: "full-text", accessed: "2026-11-17" },
    { key: "esmo-2023", label: "Venous thromboembolism in cancer patients: ESMO Clinical Practice Guideline", publisher: "ESMO, Annals of Oncology", year: 2023, url: "https://doi.org/10.1016/j.annonc.2022.12.014", doi: "10.1016/j.annonc.2022.12.014", read: "not-reachable", accessed: "2026-11-17" },
    { key: "khorana-2008", label: "Development and validation of a predictive model for chemotherapy-associated thrombosis", publisher: "Blood", year: 2008, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2384124/", doi: "10.1182/blood-2007-10-116327", read: "full-text", accessed: "2026-11-17" },
    { key: "avert-2019", label: "Apixaban to Prevent Venous Thromboembolism in Patients with Cancer (AVERT)", publisher: "New England Journal of Medicine", year: 2019, url: "https://europepmc.org/abstract/MED/30511879", doi: "10.1056/NEJMoa1814468", read: "abstract", accessed: "2026-11-17" },
    { key: "cassini-2019", label: "Rivaroxaban for Thromboprophylaxis in High-Risk Ambulatory Patients with Cancer (CASSINI)", publisher: "New England Journal of Medicine", year: 2019, url: "https://europepmc.org/abstract/MED/30786186", doi: "10.1056/NEJMoa1814630", read: "abstract", accessed: "2026-11-17" },
    { key: "nhs-dvt", label: "DVT (deep vein thrombosis)", publisher: "NHS", year: 2026, url: "https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-upgrade-clot-risk-score-and-preventive-anticoagulation"],
  gaps: [
    "The ESMO 2023 guideline could not be read: on 17 November 2026 the publisher's page again answered a script with a browser check and Europe PMC holds no abstract. Its position on the Khorana score and on direct oral anticoagulants is not stated here.",
    "ASCO 2020 was read only as an abstract (the publisher's page returned 403 again on 17 November 2026), so ASCO's Khorana threshold, its grades and any doses it gives are not stated here. The ASCO 2023 update, read in full from an archived copy, does not reprint the outpatient recommendation.",
    "No guideline recommendation read prints a dose for preventive apixaban, rivaroxaban or low-molecular-weight heparin in outpatients. The apixaban and rivaroxaban doses on this page are the ones the AVERT and CASSINI abstracts report testing; the trials were read as abstracts only, and no product label was read for this use. Low-molecular-weight heparin doses are not given here.",
    "ASH 2021 names the Khorana score for sorting patients into low, intermediate and high risk, and the text read prints no score cut-offs for those groups, so whether a score of 2 counts as intermediate or high under ASH is not stated here. An erratum to ASH 2021 was published in April 2021 (10.1182/bloodadvances.2021004734); its text could not be read on 17 November 2026.",
    "The Khorana paper is not consistent about the 1-point cancer sites: its text and Table 2 say lung, lymphoma, gynaecological and genitourinary other than prostate, and Table 3, the score itself, says lung, lymphoma, gynaecological, bladder and testicular.",
    "NHS advice read for the warning signs is written for the general public. No source read gives a symptom list or a time limit written for people on cancer treatment.",
    "No source read settles prophylaxis for people on immunotherapy alone or on oral targeted drugs, whose clot risk the Khorana score was not built for.",
    "NICE NG89's cancer recommendations date from 2018 and predate the outpatient trials of direct oral anticoagulants; NICE checked the guideline in September 2024 and decided not to update it.",
    "A British Society for Haematology guideline on cancer-associated venous thrombosis (second edition, 2024, 10.1111/bjh.19414) and a 2023 SEOM guideline (10.1007/s12094-024-03605-2) are listed in Europe PMC and were not read for this page.",
  ],
  institutions: ["nice", "asco", "esmo", "ash"],
  technologies: ["cancer-associated-thrombosis"],
  drugs: ["aspirin", "apixaban", "rivaroxaban"],
  terms: ["vte"],
  cancers: ["pancreatic", "multiple-myeloma"],
  related: ["thalidomide", "lenalidomide", "pomalidomide"],
  sections: ["supportive-care"],
  tags: ["protocol", "thrombosis", "supportive-care"],
});

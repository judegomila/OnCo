import { protocol } from "./helpers";

/*
 * A clot around a central venous catheter (port, PICC or tunnelled line) in a person with cancer: recognising it,
 * confirming it, treating it and deciding whether the line can stay.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every claim was re-read against raw
 * source text and every quote checked verbatim by script, where the source could be read.
 * - ITAC 2022 international clinical practice guidelines (Farge et al., Lancet Oncol 2022, PMC9236567): full text from
 *   the Europe PMC full-text XML, tags stripped (the copy the checker of the cancer clot treatment protocol saved on
 *   17 November 2026, re-used). Its recommendations on treatment and prophylaxis of catheter-related thrombosis and on
 *   thrombolysis are used.
 * - ASH 2021 guidelines on VTE in patients with cancer (Lyman et al., Blood Adv 2021, PMC7903232): full text from the
 *   PubMed Central HTML (the same checker's copy of 17 November 2026, re-used). Added in this pass: recommendations 18
 *   and 19 (prophylaxis with a central line) and 29 (keeping or removing the line), with their remarks.
 * - ASCO 2013 guideline on central venous catheter care (Schiffer et al., J Clin Oncol 2013): abstract only, from the
 *   Europe PMC REST API. Added in this pass. Europe PMC lists the full text as subscription only.
 * - Macmillan Cancer Support, PICC lines (patient page, reviewed 1 March 2022): HTML, tags stripped. Added in this
 *   pass for the symptoms a patient is asked to report.
 * - ESMO Clinical Practice Guidelines, central venous access in oncology (Sousa et al., Ann Oncol 2015): read in full
 *   on 11 November 2026 from the Internet Archive's capture of academic.oup.com. NOT re-read on 17 November 2026: the
 *   publisher returned 403 with a bot check, the Internet Archive answered 429, and Europe PMC holds no open copy and
 *   no abstract. Its three diagnostic steps and their quotes stand as recorded on 11 November and are named in `gaps`;
 *   the durations that rested on it alone were taken out of the steps.
 * - ISTH SSC guidance on catheter-associated upper extremity clots in cancer (2014, doi 10.1111/jth.12527): not
 *   readable (publisher 403, no abstract in Europe PMC). Named in `gaps`, not used.
 * - Independent re-read of doses and drug links on 17 November 2026, against the ITAC 2022 and ASH 2021 full texts and
 *   the current US labels of Eliquis, Xarelto and Savaysa (DailyMed label XML, tags stripped). The page carries no
 *   drug dose. The links to apixaban, rivaroxaban and edoxaban were removed: no source read names any of them for a
 *   line clot in adults (see `gaps`).
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text with
 * line breaks joined; where a sentence carries an inline reference or a grade symbol, the quote stops before it.
 */
export const catheterRelatedThrombosisInCancer = protocol({
  id: "catheter-related-thrombosis-in-cancer",
  name: "Catheter-related thrombosis in people with cancer: diagnosis, anticoagulation and whether the line can stay",
  aka: ["CRT", "line clot", "PICC clot", "port thrombosis", "upper extremity DVT from a line", "central line thrombosis", "catheter-associated thrombosis"],
  domain: "vascular-access",
  tldr: "A blood clot can form in the vein around a central line, such as a port or a PICC. Signs include swelling, redness or tenderness in the arm, chest or neck on that side, a swollen hand, shortness of breath or a tight chest. A scan checks for it. It is treated with blood thinners for at least three months, and the line can often stay in if it still works and is not infected.",
  simple: "If your arm, hand, chest or neck swells, reddens or feels tender on the side of your line, or you are short of breath, contact your hospital team. A scan checks for a clot, which is treated with blood thinners, often without taking the line out.",
  summary: "The diagnostic points here come from ESMO (2015), read on 11 November 2026 and not readable again on 17 November 2026: symptomatic catheter-related thrombosis (CRT) in about 4 to 8% of people with cancer and lines; a first sign that is often difficulty aspirating or infusing, or local pain; Doppler ultrasound as the usual first test [III, A]; venography or other imaging when ultrasound is normal but suspicion remains or central occlusion is suspected [III, A].\n\nITAC (2022, guidance) recommends anticoagulation for at least 3 months and for as long as the catheter is in place, suggesting LMWH, and notes that LMWH, DOACs and VKAs have not been compared directly in CRT and that no standard duration is established. The catheter can stay if it is functional, well positioned and not infected, with symptoms resolving under close surveillance (ITAC, guidance); ASH (2021) also suggests keeping it (conditional recommendation, very low certainty), says anticoagulation is required while it stays, and names neither a drug nor a duration. ASH's remarks say an infected, mispositioned or malfunctioning line, or one no longer needed, should be removed, and that a person who cannot receive anticoagulants may need it removed. The ASCO 2013 abstract recommends removal when the catheter is no longer needed or a radiologically confirmed thrombosis worsens despite anticoagulation.\n\nRoutine anticoagulant prophylaxis against CRT is not recommended (ITAC 1A; the ASCO 2013 abstract says the same of warfarin and LMWH); ASH suggests against it more weakly (conditional, low certainty) and remarks that it may be considered for selected high-risk patients. ITAC recommends right-sided jugular insertion with the tip at the junction of the superior vena cava and right atrium (1B) and suggests ports over PICCs where a central line is needed (guidance).",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse"],
    where: ["chemotherapy-day-unit", "acute-oncology-service", "ward", "outpatient-clinic"],
  },
  population: "Adults with cancer and a central venous catheter (implanted port, PICC, tunnelled or non-tunnelled central line). ITAC gives separate recommendations for children with central lines; they are not covered here. Line occlusion without a venous clot (a blocked lumen or fibrin sheath) is a separate problem.",
  trigger: "Swelling, redness, tenderness or pain in the arm, hand, chest or neck on the side of a central line, or a line that becomes hard to aspirate or flush.",
  steps: [
    {
      action: "Suspect a clot when the line becomes hard to aspirate or flush, or there is local pain or a burning sensation on injection",
      why: "A line that stops working well can be the first sign of a clot around it.",
      source: "esmo-2015",
      quote: "Frequently in clinical practice, the first signs are: difficulty aspirating or infusing through the lumen of the catheter, and complaints of local pain or a burning sensation during injection.",
    },
    {
      action: "Confirm with Doppler ultrasound",
      why: "Ultrasound is readily available and non-invasive.",
      source: "esmo-2015",
      quote: "Although venography is considered the gold standard for the diagnosis of CRT, Doppler ultrasound is usually carried out [III, A], because it is readily available and non-invasive (sensitivity 56%–100%; specificity 94%–100%)",
      grade: "[III, A]",
    },
    {
      action: "If ultrasound is normal but suspicion remains, or a central vein blockage is suspected, arrange venography, CT or MR imaging",
      why: "A normal ultrasound does not settle the question when a clot is still suspected.",
      source: "esmo-2015",
      quote: "In patients with suspected CRT and a normal ultrasound, or suspected central venous occlusion, venography or alternative imaging should be carried out [magnetic resonance imaging, computed tomography (CT), gadolinium-enhanced magnetic resonance venography or contrast-enhanced CT] [III, A]",
      grade: "[III, A]",
    },
    {
      action: "Anticoagulate for at least 3 months and for as long as the catheter stays in; ITAC suggests low-molecular-weight heparin",
      why: "ITAC's experts advise treatment for as long as the line is in the vein. No trial has compared the blood thinners with each other for line clots.",
      source: "itac-2022",
      quote: "For the treatment of symptomatic catheter-related thrombosis in patients with cancer, anticoagulant treatment is recommended for a minimum of 3 months and as long as the central venous catheter is in place; in this setting, LMWHs are suggested and direct comparisons between LMWHs, direct oral anticoagulants, and vitamin K antagonists have not been made (guidance).",
      grade: "guidance",
    },
    {
      action: "Keep the line if it works, is in the right place and is not infected, and watch closely while anticoagulated",
      why: "ASH also suggests keeping the line: in the two small studies it found, no line was removed because of the clot, and taking a line out is likely to mean putting in another.",
      source: "itac-2022",
      quote: "In patients with cancer and with catheter-related thrombosis, the central venous catheter can be kept in place if it is functional, well positioned, and not infected, with good resolution of symptoms under close surveillance while anticoagulation therapy is administered. No standard approach in terms of duration of anticoagulation is established (guidance).",
      grade: "guidance",
    },
    {
      action: "Remove a line that is infected, in the wrong place, not working or no longer needed",
      why: "ASH's panel says these lines should come out. It adds that a person who cannot have blood thinners, for example because of bleeding, may need the line removed if it is not required for their care.",
      source: "ash-2021",
      quote: "Patients with infected, mispositioned, or malfunctioning CVCs or those no longer requiring their CVC should have it removed.",
    },
    {
      action: "Remove the line if imaging confirms the clot is getting worse despite anticoagulation",
      why: "A clot that grows on treatment while the line is in place is a reason to take the line out.",
      source: "asco-2013",
      quote: "CVC removal is recommended when the catheter is no longer needed or if there is a radiologically confirmed thrombosis that worsens despite anticoagulation therapy.",
    },
    {
      action: "Do not give routine anticoagulant prophylaxis to prevent line clots",
      why: "ITAC sets the bleeding risk of blood thinners against it. ASH also suggests against it, on low-certainty evidence, while allowing it to be considered for selected people at high risk of clots.",
      source: "itac-2022",
      quote: "Use of anticoagulation for routine prophylaxis of catheter-related thrombosis is not recommended (grade 1A).",
      grade: "1A",
    },
  ],
  bestInClass: {
    statement: "Anticoagulate for at least 3 months and for as long as the line remains, LMWH suggested (ITAC 2022, guidance); keep a functional, well-positioned, uninfected line (ITAC, guidance; ASH 2021, conditional recommendation, very low certainty); remove a line that is infected, mispositioned, malfunctioning or no longer needed (ASH, remarks), or when a confirmed clot worsens despite anticoagulation (ASCO 2013 abstract); no routine anticoagulant prophylaxis (ITAC 1A). The sources differ in strength and detail. ITAC names LMWH and a minimum of 3 months and says no standard duration is established; ASH says anticoagulation is required while the line stays, with the choice made for the individual, and names neither a drug nor a duration. ITAC grades the advice against prophylaxis strong (1A); ASH grades it conditional on low-certainty evidence and remarks that prophylaxis may be considered for selected high-risk patients. Doppler ultrasound as the first test rests on ESMO 2015 [III, A], which could not be re-read on 17 November 2026. ITAC says LMWH, DOACs and vitamin K antagonists have not been compared directly for line clots.",
    sources: ["itac-2022", "ash-2021", "asco-2013", "esmo-2015"],
  },
  variants: [
    {
      name: "Prophylactic-dose anticoagulation while the line stays",
      differs: "After the treatment course, continues anticoagulation at a prophylactic dose until the catheter is removed.",
      evidence: "Recorded from ESMO 2015 on 11 November 2026 as a recommendation graded [I, C]; the text could not be re-read on 17 November 2026, so this is not confirmed. ITAC 2022 recommends treatment for as long as the catheter is in place without specifying a step-down dose, and ASH 2021 does not address it.",
      sources: ["esmo-2015", "itac-2022", "ash-2021"],
    },
    {
      name: "A DOAC instead of LMWH",
      differs: "Treats the line clot with a direct oral anticoagulant, a tablet, instead of heparin injections.",
      evidence: "Not compared directly with LMWH in CRT (ITAC 2022, which suggests LMWH). Neither guideline's recommendation names an individual DOAC for a line clot in adults. ASH 2021 names no preferred drug; the evidence it found was two case series followed for 12 weeks, one of 70 people with cancer treated with DOACs and one of 74 treated with LMWH or a vitamin K antagonist, with no line removed because of thrombosis.",
      sources: ["itac-2022", "ash-2021"],
    },
    {
      name: "Thrombolysis for the vein clot",
      differs: "Uses a clot-dissolving drug rather than anticoagulation alone.",
      evidence: "No source read here recommends it for line clots. ITAC 2022 has no recommendation specific to them; its general recommendation for established clots in people with cancer is that thrombolysis can only be considered case by case, with attention to contraindications, especially bleeding risk such as brain metastasis (guidance), after expert opinion and in centres with the expertise. ASH 2021 does not address it for line clots. The ASCO 2013 abstract recommends a tissue plasminogen activator to restore patency to an occluded catheter, which is a different problem from a clot in the vein.",
      sources: ["itac-2022", "ash-2021", "asco-2013"],
    },
  ],
  grades: [
    { claim: "Doppler ultrasound as the usual diagnostic test (recorded on 11 November 2026, not re-read)", grade: "[III, A]", source: "esmo-2015" },
    { claim: "Anticoagulation for at least 3 months and while the line is in place, LMWH suggested", grade: "guidance", source: "itac-2022" },
    { claim: "Keeping the line in place while on anticoagulant treatment", grade: "conditional recommendation, very low certainty in the evidence of effects", source: "ash-2021", quote: "For patients with cancer with CVC-related VTE receiving anticoagulant treatment, the ASH guideline panel suggests keeping the CVC over removing the CVC" },
    { claim: "No routine anticoagulant prophylaxis for CRT", grade: "1A", source: "itac-2022" },
    { claim: "No parenteral or oral thromboprophylaxis for people with cancer and a central line", grade: "conditional recommendation, low certainty in the evidence of effects", source: "ash-2021", quote: "For patients with cancer and a CVC, the ASH guideline panel suggests not using parenteral or oral thromboprophylaxis" },
    { claim: "Thrombolysis for established clots in cancer only case by case (not specific to line clots)", grade: "guidance", source: "itac-2022", quote: "Thrombolysis in patients with cancer and with established VTE can only be considered on a case-by-case basis, with specific attention paid to contraindications, especially bleeding risk" },
    { claim: "Right-sided jugular insertion with the tip at the junction of the superior vena cava and the right atrium", grade: "1B", source: "itac-2022", quote: "Catheters should be inserted on the right side, in the jugular vein, and the distal extremity of the central catheter should be located at the junction of the superior vena cava and the right atrium (grade 1B)." },
    { claim: "Implanted ports suggested over PICCs where a central line is needed", grade: "guidance", source: "itac-2022", quote: "In patients requiring central venous catheters, we suggest the use of implanted ports over peripherally inserted central catheter lines (guidance)." },
  ],
  sources: [
    {
      key: "itac-2022",
      label: "2022 international clinical practice guidelines for the treatment and prophylaxis of venous thromboembolism in patients with cancer, including patients with COVID-19",
      publisher: "International Initiative on Thrombosis and Cancer (ITAC), endorsed by the ISTH (Lancet Oncology, Farge et al.)",
      year: 2022,
      url: "https://doi.org/10.1016/S1470-2045(22)00160-7",
      doi: "10.1016/S1470-2045(22)00160-7",
      gradingScheme: "GRADE: evidence A (high) to D (very low); recommendation grade 1 (strong) or 2 (weak); 'guidance' (best clinical practice) where there is no clear evidence, based on expert consensus.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ash-2021",
      label: "American Society of Hematology 2021 guidelines for management of venous thromboembolism: prevention and treatment in patients with cancer",
      publisher: "American Society of Hematology (Blood Advances, Lyman et al.)",
      year: 2021,
      url: "https://doi.org/10.1182/bloodadvances.2020003442",
      doi: "10.1182/bloodadvances.2020003442",
      gradingScheme: "GRADE; a recommendation is strong ('recommends') or conditional ('suggests'), printed with the certainty of the evidence (high, moderate, low or very low). Remarks under a recommendation carry no grade of their own.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "asco-2013",
      label: "Central venous catheter care for the patient with cancer: American Society of Clinical Oncology clinical practice guideline",
      publisher: "ASCO (Journal of Clinical Oncology, Schiffer et al.)",
      year: 2013,
      url: "https://doi.org/10.1200/JCO.2012.45.5733",
      doi: "10.1200/JCO.2012.45.5733",
      gradingScheme: "The abstract prints no grade for individual recommendations.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "macmillan-picc",
      label: "PICC lines",
      publisher: "Macmillan Cancer Support",
      year: 2022,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/types-of-treatment/cancer-drug-treatments/picc-lines",
      gradingScheme: "Patient information page; not graded. Reviewed 1 March 2022, next review was due 1 March 2025, page marked as being reviewed.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "esmo-2015",
      label: "Central venous access in oncology: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology, Sousa et al.)",
      year: 2015,
      url: "https://doi.org/10.1093/annonc/mdv296",
      doi: "10.1093/annonc/mdv296",
      gradingScheme: "[level, grade]: levels I (large good-quality RCT or meta-analysis) to V (no control group, case reports, expert opinion); grades A (strongly recommended) to E (never recommended), adapted from the IDSA/USPHS system.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "eliquis-us-label",
      label: "Eliquis (apixaban) tablets: US prescribing information, DailyMed label version of 17 August 2026",
      publisher: "Bristol-Myers Squibb, published by the US National Library of Medicine (DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e9481622-7cc6-418a-acb6-c5450daae9b0",
      gradingScheme: "Product label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "xarelto-us-label",
      label: "Xarelto (rivaroxaban): US prescribing information, DailyMed label version of 10 September 2026",
      publisher: "Janssen Pharmaceuticals, published by the US National Library of Medicine (DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=10db92f9-2300-4a80-836b-673e1ae91610",
      gradingScheme: "Product label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "savaysa-us-label",
      label: "Savaysa (edoxaban) tablets: US prescribing information, DailyMed label version of 10 July 2025",
      publisher: "Daiichi Sankyo, published by the US National Library of Medicine (DailyMed)",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e77d3400-56ad-11e3-949a-0800200c9a66",
      gradingScheme: "Product label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  // No drug is linked. Until 17 November 2026 this record linked apixaban, rivaroxaban and edoxaban; no source read
  // names any of them for a catheter-related clot in adults, so the links were removed (docs/PROTOCOLS.md: a drug goes
  // in `drugs` only where a source classifies it for this use). The reasons are in `gaps`.
  drugs: [],
  technologies: ["implanted-ports", "picc-lines", "cancer-associated-thrombosis"],
  terms: ["vte", "central-venous-access"],
  related: ["cancer-associated-vte-treatment", "implanted-port-access-and-care"],
  upgrades: [],
  gaps: [
    "No randomised trial compares anticoagulants or durations for catheter-related thrombosis in cancer; ITAC's treatment recommendations are 'guidance' (expert consensus), ITAC found no new studies since 2019, and ASH's recommendation to keep the line rests on two case series.",
    "On 17 November 2026 the ESMO 2015 guideline could not be re-read: the publisher returned 403 with a bot check, the Internet Archive answered 429, and Europe PMC holds no open copy and no abstract. What rests on ESMO alone was read on 11 November 2026 and is not re-verified: the 4 to 8% figure, the first signs, Doppler ultrasound first and further imaging after a normal ultrasound (both [III, A]), the ultrasound sensitivity and specificity in the quote, and ESMO's grading scheme. No newer ESMO guideline on central venous access was found in Europe PMC or Crossref.",
    "Three points recorded from ESMO 2015 on 11 November 2026 were taken out of the steps on 17 November 2026 because they carry a duration or a threshold and could not be re-read: a short course of anticoagulation (recorded as 3 to 5 days, [I, A]) before removing a line that is no longer needed or when long-term anticoagulation is contraindicated; about 3 months of anticoagulation after removal (recorded as [I, C]); and removal if the clot extends into the superior vena cava. No source read on 17 November 2026 says how long to anticoagulate before or after the line is removed.",
    "No source read here gives a recommendation on thrombolysis for a line clot, or on how to diagnose one; the diagnostic steps rest on ESMO 2015 alone.",
    "The symptoms a patient is asked to report are Macmillan's list for PICC lines (swelling, redness or tenderness in the arm, chest area or neck, a swollen hand, shortness of breath, tightness in the chest). Macmillan says to contact the hospital doctor or nurse and gives no time limit; no source read here gives one.",
    "Not read: the ISTH SSC guidance on catheter-associated upper extremity clots in cancer (2014), ESMO's 2023 VTE guideline (both publishers returned 403 to a script on 17 November 2026) and the ASCO 2013 full text (Europe PMC lists it as subscription only; its abstract was read). ASCO's 2023 VTE update, in the copy read, has no recommendation on catheter clots. Where these differ from ITAC and ASH is therefore not shown.",
    "On 17 November 2026 the links from this page to apixaban, rivaroxaban and edoxaban were removed, because no source read here names any of the three for treating a line clot in adults. ITAC 2022 suggests LMWH and says only that direct oral anticoagulants, as a class, have not been compared with it. ASH 2021 names no drug in its recommendation; the case series of DOAC treatment it cites is identified as a rivaroxaban study only in its reference list. The current US labels, read the same day, give apixaban and rivaroxaban for the treatment of deep vein thrombosis, and edoxaban for it after 5 to 10 days of a parenteral anticoagulant, and none mentions a central venous catheter in adults; the rivaroxaban label names catheter-related thrombosis only in children, who are not covered here. The European product information was not read.",
    "Line occlusion from a fibrin sheath or blocked lumen, and its treatment with a thrombolytic lock, is not covered here.",
  ],
});

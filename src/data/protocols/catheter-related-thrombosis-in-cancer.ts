import { protocol } from "./helpers";

/*
 * A clot around a central venous catheter (port, PICC or tunnelled line) in a person with cancer: recognising it,
 * confirming it, treating it and deciding whether the line can stay.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - ITAC 2022 international clinical practice guidelines (Farge et al., Lancet Oncol 2022, PMC9236567): full text from
 *   the PMC XML, including the panels on treatment and prophylaxis of catheter-related thrombosis.
 * - ESMO Clinical Practice Guidelines, central venous access in oncology (Sousa et al., Ann Oncol 2015): full text, read
 *   from the Internet Archive's capture of academic.oup.com (the publisher refusing a script), as for the implanted port
 *   protocol. Its sections on diagnosis and treatment of catheter-induced thrombosis are quoted.
 *
 * Quotes are copied from the raw text with line breaks joined; where a sentence carries an inline reference, the quote
 * stops before it.
 */
export const catheterRelatedThrombosisInCancer = protocol({
  id: "catheter-related-thrombosis-in-cancer",
  name: "Catheter-related thrombosis in people with cancer: diagnosis, anticoagulation and whether the line can stay",
  aka: ["CRT", "line clot", "PICC clot", "port thrombosis", "upper extremity DVT from a line", "central line thrombosis", "catheter-associated thrombosis"],
  domain: "vascular-access",
  tldr: "A blood clot can form around a central line, such as a port or a PICC. Signs include a swollen, painful or red arm, neck or face, swollen veins on the chest, or a line that will not flush or give blood. An ultrasound scan confirms it. It is treated with blood thinners for at least three months, and the line can often stay in if it still works and is not infected.",
  simple: "If your arm, neck or face swells or aches, or your line stops working, tell your team the same day. A scan checks for a clot, which is treated with blood thinners, often without taking the line out.",
  summary: "Symptomatic catheter-related thrombosis (CRT) is reported in about 4 to 8% of people with cancer and lines (ESMO 2015), and many more clots are found on screening. Signs are often non-specific; the first is often difficulty aspirating or infusing, with local pain, redness, swelling or oedema. Doppler ultrasound is the usual first test [III, A]; venography or other imaging follows when ultrasound is normal but suspicion remains or central occlusion is suspected [III, A].\n\nITAC (2022, guidance) recommends anticoagulation for at least 3 months and for as long as the catheter is in place, suggesting LMWH, and notes that LMWH, DOACs and VKAs have not been compared directly in CRT. The catheter can stay if it is functional, well positioned and not infected, with symptoms resolving under close surveillance. ESMO (2015) adds that where the line is no longer needed or long-term anticoagulation is contraindicated, 3 to 5 days of anticoagulation before removal is recommended [I, A], and that the line should come out if symptoms progress or the clot extends into the superior vena cava. Routine anticoagulant prophylaxis against CRT is not recommended (ITAC 1A); right-sided jugular insertion with the tip at the cavoatrial junction is (1B), and ITAC suggests ports over PICCs where a central line is needed (guidance).",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse"],
    where: ["chemotherapy-day-unit", "acute-oncology-service", "ward", "outpatient-clinic"],
  },
  population: "Adults with cancer and a central venous catheter (implanted port, PICC, tunnelled or non-tunnelled central line). ITAC gives separate recommendations for children with central lines; they are not covered here. Line occlusion without a venous clot (a blocked lumen or fibrin sheath) is a separate problem.",
  trigger: "Arm, shoulder, neck or face swelling or pain on the side of a central line, distended chest wall veins, or a line that will not flush or aspirate.",
  steps: [
    {
      action: "Suspect a clot when the line becomes hard to aspirate or flush, or the arm, neck or face on that side is painful, red or swollen",
      why: "Line clots often cause vague symptoms; a line that stops working can be the first sign.",
      source: "esmo-2015",
      quote: "Frequently in clinical practice, the first signs are: difficulty aspirating or infusing through the lumen of the catheter, and complaints of local pain or a burning sensation during injection.",
    },
    {
      action: "Confirm with Doppler ultrasound",
      why: "Ultrasound is quick, painless and finds most line clots.",
      source: "esmo-2015",
      quote: "Although venography is considered the gold standard for the diagnosis of CRT, Doppler ultrasound is usually carried out [III, A], because it is readily available and non-invasive (sensitivity 56%–100%; specificity 94%–100%)",
      grade: "[III, A]",
    },
    {
      action: "If ultrasound is normal but suspicion remains, or a central vein blockage is suspected, arrange venography, CT or MR venography",
      why: "Ultrasound cannot see the veins inside the chest well.",
      source: "esmo-2015",
      quote: "In patients with suspected CRT and a normal ultrasound, or suspected central venous occlusion, venography or alternative imaging should be carried out [magnetic resonance imaging, computed tomography (CT), gadolinium-enhanced magnetic resonance venography or contrast-enhanced CT] [III, A]",
      grade: "[III, A]",
    },
    {
      action: "Anticoagulate for at least 3 months and for as long as the catheter stays in, preferably with low-molecular-weight heparin",
      why: "Treatment stops the clot growing or travelling to the lungs while the line, which caused it, is still there.",
      source: "itac-2022",
      quote: "For the treatment of symptomatic catheter-related thrombosis in patients with cancer, anticoagulant treatment is recommended for a minimum of 3 months and as long as the central venous catheter is in place; in this setting, LMWHs are suggested and direct comparisons between LMWHs, direct oral anticoagulants, and vitamin K antagonists have not been made (guidance).",
      grade: "guidance",
    },
    {
      action: "Keep the line if it works, is in the right place and is not infected, and watch closely while anticoagulated",
      why: "Removing a working line is often unnecessary, and a new line carries its own risks.",
      source: "itac-2022",
      quote: "In patients with cancer and with catheter-related thrombosis, the central venous catheter can be kept in place if it is functional, well positioned, and not infected, with good resolution of symptoms under close surveillance while anticoagulation therapy is administered.",
      grade: "guidance",
    },
    {
      action: "If the line is no longer needed, or long-term anticoagulation cannot be given, anticoagulate for 3 to 5 days before taking it out",
      why: "A short course first lowers the chance that pulling the line dislodges the clot.",
      source: "esmo-2015",
      quote: "When the CVC is no longer necessary, or if long-term anticoagulation is contraindicated, a short course (3–5 days) of anticoagulation therapy is recommended before removing the catheter, in order to avoid clot embolisation [I, A]",
      grade: "[I, A]",
    },
    {
      action: "Remove the line if symptoms get worse or the clot extends into the superior vena cava",
      why: "A spreading clot despite treatment, or one in the main vein to the heart, outweighs the value of keeping the line.",
      source: "esmo-2015",
      quote: "Additionally, if symptoms progress or the blood clot extends into the SVC, the CVC should be removed.",
    },
    {
      action: "Do not give routine anticoagulant prophylaxis to prevent line clots",
      why: "In trials the bleeding risk outweighed the small reduction in clots for most people.",
      source: "itac-2022",
      quote: "Use of anticoagulation for routine prophylaxis of catheter-related thrombosis is not recommended (grade 1A).",
      grade: "1A",
    },
  ],
  bestInClass: {
    statement: "Confirm with Doppler ultrasound (ESMO 2015 [III, A]); anticoagulate for at least 3 months and while the line remains, LMWH suggested (ITAC 2022, guidance); keep a functional, well-positioned, uninfected line; anticoagulate 3 to 5 days before removing a line that is no longer needed (ESMO [I, A]); no routine prophylaxis (ITAC 1A). The two sources differ on what follows removal: ITAC sets 3 months as a minimum while the catheter is in place; ESMO says the length after removal is uncertain and 3 months is usually advised [I, C]. Neither has trial data comparing DOACs with LMWH for line clots.",
    sources: ["itac-2022", "esmo-2015"],
  },
  variants: [
    {
      name: "Prophylactic-dose anticoagulation while the line stays",
      differs: "After the treatment course, continues anticoagulation at a prophylactic dose until the catheter is removed.",
      evidence: "ESMO 2015 recommends continuing at a prophylactic dose while the catheter is in place [I, C]; ITAC 2022 recommends treatment for as long as the catheter is in place without specifying a step-down dose.",
      sources: ["esmo-2015", "itac-2022"],
    },
    {
      name: "A DOAC instead of LMWH",
      differs: "Treats the line clot with apixaban, rivaroxaban or edoxaban.",
      evidence: "Not compared directly with LMWH in CRT (ITAC 2022). ESMO 2015 said there were no data for the newer oral anticoagulants in CRT at the time.",
      sources: ["itac-2022", "esmo-2015"],
    },
  ],
  grades: [
    { claim: "Doppler ultrasound as the usual diagnostic test", grade: "[III, A]", source: "esmo-2015" },
    { claim: "Short anticoagulation before removing a line that is no longer needed", grade: "[I, A]", source: "esmo-2015" },
    { claim: "About 3 months of anticoagulation after removal", grade: "[I, C]", source: "esmo-2015", quote: "According to the severity of thrombosis, 3 months of therapy is usually advised, with some authors suggesting even shorter courses [I, C]" },
    { claim: "Anticoagulation for at least 3 months and while the line is in place, LMWH suggested", grade: "guidance", source: "itac-2022" },
    { claim: "No routine anticoagulant prophylaxis for CRT", grade: "1A", source: "itac-2022" },
    { claim: "Right-sided jugular insertion with the tip at the cavoatrial junction", grade: "1B", source: "itac-2022", quote: "Catheters should be inserted on the right side, in the jugular vein, and the distal extremity of the central catheter should be located at the junction of the superior vena cava and the right atrium (grade 1B)." },
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
      accessed: "2026-11-11",
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
  ],
  drugs: ["apixaban", "rivaroxaban", "edoxaban"],
  technologies: ["implanted-ports", "picc-lines", "cancer-associated-thrombosis"],
  terms: ["vte", "central-venous-access"],
  related: ["cancer-associated-vte-treatment", "implanted-port-access-and-care"],
  upgrades: [],
  gaps: [
    "No randomised trial compares anticoagulants or durations for catheter-related thrombosis in cancer; ITAC's treatment recommendations are 'guidance' (expert consensus), and ITAC found no new studies since 2019.",
    "The ESMO guideline on central venous access dates from 2015; ESMO's 2023 VTE guideline could not be read.",
    "Line occlusion from a fibrin sheath or blocked lumen, and its treatment with a thrombolytic lock, is not covered here.",
  ],
});

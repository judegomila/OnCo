import { protocol } from "./helpers";
import { ASCO_GAP, ASCO_ICI_2021, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Immune-mediated hepatitis caused by an immune checkpoint inhibitor, managed by grade.
 *
 * What was read, and how: see ./irae-sources.ts for SITC 2021 (full text, hepatitis recommendations and review), ASCO
 * 2021 (abstract) and ESMO 2022 (not reachable). In addition, the AASLD 2023 practice guidance on drug, herbal and
 * dietary supplement induced liver injury (Hepatology, open access, full text from Europe PMC, PMC9936988), whose
 * immunotherapy section was read in full. DOIs resolved through Crossref. Quotes checked by script against the raw text.
 *
 * Second accuracy pass, 17 November 2026. The AASLD guidance was fetched again as full-text XML from the Europe PMC
 * REST API and its DOI resolved again through Crossref and Europe PMC; its immunotherapy section, Table 9 and method
 * paragraph were re-read. SITC 2021 and the ASCO 2021 abstract were re-read from the raw copies a sibling checker
 * saved from Europe PMC on 16 November 2026 (SITC hepatitis review and recommendations, and the general panel
 * recommendations). ESMO 2022 and the ASCO full text were not retried here: the sibling found both still refusing a
 * script on 16 November. Every quote was checked again by script against the tag-stripped text. Changed: symptoms and
 * a "same day" call that no source states were taken out of the patient text and the trigger; "may be given" and
 * "should be considered" are no longer written as orders; reasons no source gives were replaced with what the sources
 * say; AASLD's grade thresholds and SITC's general rules on withholding and re-challenge were added.
 */
export const iraeHepatitis = protocol({
  id: "irae-hepatitis",
  name: "Immune-mediated hepatitis from checkpoint inhibitors, by grade",
  aka: ["checkpoint inhibitor hepatitis", "ICI hepatotoxicity", "immune-related hepatitis", "IMH", "immunotherapy liver inflammation"],
  domain: "immunotherapy-toxicity",
  tldr: "Immunotherapy can inflame the liver, often without symptoms, so liver blood tests are checked before every dose. A mild rise is watched more closely. A larger rise means pausing immunotherapy and usually steroids; a severe one can mean stopping immunotherapy for good. Tell your cancer team if your skin or eyes turn yellow.",
  simple: "Immunotherapy can sometimes inflame the liver. Your blood tests check for this before each dose. If you notice yellow skin or eyes, tell your cancer team.",
  summary: "Hepatitis (raised ALT or AST) occurs in 5% on PD-(L)1 inhibitors, 5% on CTLA-4 inhibitors and 19% on combinations (9% grade 3 or more), typically 1 to 15 weeks after treatment (SITC 2021); AASLD 2023 gives 1 to 15% across trials and observational studies, mostly asymptomatic and in the first 6 to 12 weeks. AASLD reports that only 30% of demonstrable liver injury in advanced cancer is drug-induced, the rest being metastases, sepsis and other liver disease, and stresses contrast-enhanced CT and MR scanning.\n\nGrades: SITC refers to a standard scale such as CTCAE v5.0 and prints no liver thresholds. AASLD does: grade 1 is ALT above 1 to 3 times the upper limit of normal and/or bilirubin above 1 to 1.5 times; grade 2 is ALT 3 to 5 times and/or bilirubin 1.5 to 3 times; grade 3 or higher is ALT 5 to 20 times and/or bilirubin 3 to 10 times, or symptomatic liver dysfunction.\n\nSITC 2021: liver tests before every infusion. From grade 2, a workup including clotting, bilirubin, iron studies, an autoimmune hepatitis panel and a viral hepatitis panel; abdominal imaging should be considered at grade 3 or more if there is pre-existing liver disease or concern about progression or liver metastases. Recheck weekly for grades 1 to 2, every 1 to 2 days for grade 3 or more. Grade 2: prednisone 0.5 to 1 mg/kg/day or equivalent, with the checkpoint inhibitor withheld under SITC's general rule for grade 2; grades 3 to 4: methylprednisolone 1 to 2 mg/kg/day or equivalent; taper over 4 to 6 weeks once tests are grade 1 or less (LE: 1). If ALT or AST is not grade 1 or less within 10 to 14 days of starting steroids, or toxicity recurs after the taper, mycophenolate mofetil may be given (LE: 4). Infliximab should not be used (LE: 1).\n\nAASLD 2023: grade 1, continue with more frequent tests; grade 2, withhold and consider oral prednisone 0.5 to 1.0 mg/kg/day; grade 3 or higher, the checkpoint inhibitor should be permanently discontinued, and intravenous steroids at 1 to 1.5 mg/kg/day, with admission for people with jaundice, should be considered. Mycophenolate mofetil or azathioprine can be used for steroid-refractory disease. Liver biopsy is generally not recommended unless grade 3 injury or jaundice persists despite steroids. ESMO 2022 could not be read.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "acute-oncology-service", "ward"],
  },
  population: "People treated with an immune checkpoint inhibitor, alone or combined with another, whose liver tests rise or who develop jaundice. For people with pre-existing liver disease or possible liver metastases, SITC says abdominal imaging should be considered at grade 3 or more. Neither source's advice on immune hepatitis mentions children.",
  trigger: "A rise in ALT, AST or bilirubin on the pre-dose blood test, or jaundice, during or after checkpoint inhibitor treatment.",
  steps: [
    {
      action: "Check liver tests before every checkpoint inhibitor infusion",
      why: "Hepatitis from immunotherapy is often without symptoms and shows as a rise in ALT or AST.",
      source: "sitc-2021",
      quote: "Liver biochemical tests (aka liver function tests (LFTs)) should be checked prior to each ICI infusion.",
    },
    {
      action: "From grade 2, send clotting, bilirubin, alkaline phosphatase, iron studies, an autoimmune hepatitis panel and a viral hepatitis panel",
      why: "SITC asks that the workup for any immune side effect tries to rule out other possible causes.",
      source: "sitc-2021",
      quote: "Diagnostic workup for grade ≥2 liver toxicity should include ALT, AST, alkaline phosphatase, prothrombin time/international normalized ratio (PT/INR) serum bilirubin, iron studies, autoimmune hepatitis panel (antinuclear antibody (ANA), antineutrophil cytoplasmic antibody (ANCA), antimitochondrial antibody (AMA), peripheral ANCA (p-ANCA), and antismooth muscle antibody (ASMA)), and viral hepatitis panel.",
    },
    {
      action: "Use contrast-enhanced CT or MR scanning to look for liver metastases and other causes of the rise",
      why: "AASLD reports that the drug accounts for only 30% of liver injury in people with advanced cancer. SITC says abdominal imaging should be considered at grade 3 or more where there is pre-existing liver disease or concern about liver metastases.",
      source: "aasld-2023",
      quote: "Recent studies suggest that bona fide DILI is only responsible for 30% of cases of demonstrable liver injury in patients with advanced cancer, whereas hepatic metastases, sepsis, and other causes of liver disease account for the remainder, emphasizing the importance of contrast‐enhanced CT and MR scanning in evaluation of these patients.",
    },
    {
      action: "Recheck liver tests weekly for grades 1 to 2 and every 1 to 2 days for grade 3 or more",
      why: "The higher the grade, the more often the tests are repeated.",
      source: "sitc-2021",
      quote: "LFTs should be rechecked weekly for patients experiencing grade 1–2 liver toxicities, and should be rechecked every 1–2 days for patients with liver toxicities of grade ≥3.",
    },
    {
      action: "For grade 1, continue treatment with more frequent tests; for grade 2, withhold the checkpoint inhibitor",
      why: "AASLD defines grade 1 as ALT above 1 to 3 times the upper limit of normal and/or bilirubin above 1 to 1.5 times, and grade 2 as ALT 3 to 5 times and/or bilirubin 1.5 to 3 times. SITC's general rule is the same: treatment may continue at grade 1 and is withheld at grade 2.",
      source: "aasld-2023",
      quote: "For patients with grade 1 liver injury (ALT > 1–3× ULN and/or total bilirubin > 1–1.5× ULN), continued therapy with more frequent laboratory monitoring is advisable.",
    },
    {
      action: "Start prednisone 0.5 to 1 mg/kg/day (or equivalent) for grade 2 and methylprednisolone 1 to 2 mg/kg/day (or equivalent) for grades 3 and 4",
      why: "SITC recommends steroids from grade 2, at a higher starting dose for grades 3 and 4.",
      source: "sitc-2021",
      quote: "Grade 2 liver toxicity should be treated initially with prednisone 0.5–1 mg/kg/day (or equivalent), and grades 3 and 4 should be treated initially with methylprednisolone 1–2 mg/kg/day (or equivalent).",
    },
    {
      action: "Taper steroids over 4 to 6 weeks once the liver tests are back to grade 1 or less",
      why: "SITC sets the taper at 4 to 6 weeks. AASLD notes a risk of rebound hepatitis after immunosuppression is tapered.",
      source: "sitc-2021",
      quote: "Corticosteroids should be tapered over a period of 4–6 weeks after LFTs revert to grade ≤1",
      grade: "LE: 1",
    },
    {
      action: "If ALT or AST has not improved to grade 1 or less within 10 to 14 days of starting steroids, or hepatitis returns after the steroid taper, consider mycophenolate mofetil",
      why: "SITC says a second immunosuppressant may be given when steroids have not worked or the hepatitis has come back.",
      source: "sitc-2021",
      quote: "If ALT or AST results do not improve to grade ≤1 within 10–14 days of corticosteroid initiation, or if liver toxicity recurs after steroid taper, mycophenolate mofetil (1–2 g divided two times per day) may be given",
      grade: "LE: 4",
    },
    {
      action: "Do not use infliximab in people with liver toxicity",
      why: "SITC gives the risk of liver damage from infliximab as the reason.",
      source: "sitc-2021",
      quote: "Infliximab should not be used in patients with liver toxicity, given the risk for hepatotoxicity",
      grade: "LE: 1",
    },
    {
      action: "Keep a liver biopsy for grade 3 injury or jaundice that persists despite steroids",
      why: "AASLD does not generally recommend a biopsy before that point. SITC says a biopsy can be considered to help identify the cause when steroids fail.",
      source: "aasld-2023",
      quote: "Liver biopsy typically demonstrates lobular or periportal hepatitis and is generally not recommended unless patients have persistent grade 3 hepatotoxicity or jaundice despite corticosteroids.",
    },
    {
      action: "After immunosuppression is tapered, keep checking liver tests every 2 to 4 weeks",
      why: "AASLD gives the risk of rebound hepatitis as the reason.",
      source: "aasld-2023",
      quote: "After tapering of immunosuppression, the liver tests should continue to be monitored every 2–4 weeks because of the risk of rebound hepatitis.",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 and AASLD 2023 agree on the frame: liver tests before every dose, a search for other causes (SITC a viral and autoimmune hepatitis workup from grade 2, AASLD imaging for metastases), withholding at grade 2 with prednisone 0.5 to 1 mg/kg/day (SITC says it should be given, AASLD says to consider it), and mycophenolate mofetil as an option when steroids fail. They differ for grade 3 or more: SITC gives methylprednisolone 1 to 2 mg/kg/day and does not state discontinuation in its hepatitis section, and its general rule makes re-challenge after a grade 3 or 4 event a risk-adjusted decision (LE: 3); AASLD says the checkpoint inhibitor should be permanently discontinued and that intravenous steroids at 1 to 1.5 mg/kg/day, with admission for people with jaundice, should be considered. SITC grades the 4 to 6 week taper LE: 1 and the warning against infliximab LE: 1; AASLD's guidance is expert consensus and is not graded. The ASCO 2021 abstract says grade 3 toxicities generally warrant suspension and high-dose steroids, and that permanent discontinuation is in general recommended with grade 4 toxicities; its hepatitis table and ESMO 2022 were not read.",
    sources: ["sitc-2021", "aasld-2023", "asco-2021", "esmo-2022"],
  },
  variants: [
    {
      name: "Permanent discontinuation from grade 3 (AASLD 2023)",
      differs: "For ALT 5 to 20 times the upper limit of normal and/or bilirubin 3 to 10 times, or symptomatic liver dysfunction, says the checkpoint inhibitor should be permanently discontinued and that intravenous steroids at 1 to 1.5 mg/kg/day, with hospital admission for people with jaundice, should be considered; says azathioprine as well as mycophenolate mofetil can be used for steroid-refractory disease. Its Table 9 gives 1 mg/kg per day of methylprednisolone equivalents for checkpoint inhibitor cases with ALT above 5 times the upper limit of normal.",
      evidence: "Expert-panel practice guidance commissioned instead of a guideline because randomised trials are lacking.",
      sources: ["aasld-2023"],
    },
    {
      name: "Tacrolimus or antithymocyte globulin for refractory hepatitis (SITC 2021)",
      differs: "Says other agents that could be considered include tacrolimus and antithymocyte globulin, and that if ALT or AST is not grade 1 or less within 10 to 14 days of mycophenolate mofetil, a liver biopsy should be considered and CMV infection ruled out by PCR if available.",
      evidence: "Not graded (expert consensus). SITC's review text links tacrolimus and mycophenolate mofetil to their use in autoimmune hepatitis not caused by checkpoint inhibitors; it gives no basis for antithymocyte globulin.",
      sources: ["sitc-2021"],
    },
  ],
  grades: [
    { claim: "Steroid taper over 4 to 6 weeks after liver tests return to grade 1 or less", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Mycophenolate mofetil for steroid-refractory or recurrent hepatitis", grade: "LE: 4", source: "sitc-2021" },
    { claim: "No infliximab in liver toxicity", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Grade 3 or more: permanently discontinue the checkpoint inhibitor", grade: "not graded (expert-panel practice guidance)", source: "aasld-2023", quote: "For patients with grade 3 or higher hepatotoxicity (ALT 5–20× ULN and/or bilirubin 3–10× ULN or symptomatic liver dysfunction), the ICI should be permanently discontinued, and i.v. steroids at a dose of 1–1.5 mg/kg per day along with hospitalization for patients with jaundice should be considered." },
    { claim: "General rule, not specific to the liver: re-challenge after a grade 3 or 4 immune side effect is a risk-adjusted decision", grade: "LE: 3", source: "sitc-2021", quote: "The decision to re-challenge a patient who has experienced grade 3 or 4 irAEs should be risk-adjusted based on anticipated benefit with therapy versus the potential for toxicity" },
    { claim: "General rule: permanent discontinuation is recommended with grade 4 toxicities, except endocrine ones controlled by hormone replacement", grade: "expert consensus", source: "asco-2021" },
  ],
  sources: [
    { ...SITC_ICI_2021, accessed: "2026-11-17" },
    {
      key: "aasld-2023",
      label: "AASLD practice guidance on drug, herbal, and dietary supplement-induced liver injury",
      publisher: "American Association for the Study of Liver Diseases, Hepatology",
      year: 2023,
      url: "https://europepmc.org/article/PMC/PMC9936988",
      doi: "10.1002/hep.32689",
      gradingScheme: "Practice guidance developed by consensus of an expert panel after review of the literature; its guidance statements are not graded, and its advice on checkpoint inhibitor hepatitis is in the body text, not in a numbered guidance statement.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    { ...ASCO_ICI_2021, accessed: "2026-11-17" },
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    ASCO_GAP,
    "SITC's hepatitis section does not say whether to stop the checkpoint inhibitor permanently after grade 3 hepatitis; its general rule makes re-challenge after any grade 3 or 4 immune side effect a risk-adjusted decision (LE: 3), while AASLD says the drug should be permanently discontinued. The ASCO hepatitis table was not read, so ASCO's position on re-challenge after grade 3 hepatitis is not stated here.",
    "SITC's hepatitis section does not print the liver test thresholds for each grade; the multiples of the upper limit of normal on this page are AASLD's. AASLD's text gives intravenous steroids at 1 to 1.5 mg/kg per day for grade 3 or higher, while its Table 9 gives 1 mg/kg per day of methylprednisolone equivalents.",
    "Neither SITC nor AASLD lists the symptoms a patient should report or says how quickly; AASLD mentions jaundice, and says in general that patients should be taught to report untoward symptoms.",
    "On 17 November 2026 a search of Europe PMC and the Crossref record found no newer edition of the AASLD guidance. ESMO 2022 and the ASCO 2021 full text were not retried for this page on that date; another checker found both still refusing a script on 16 November 2026.",
    "No randomised trial of second-line treatment for steroid-refractory immune hepatitis was found among the sources read.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab", "prednisone", "methylprednisolone", "infliximab", "mycophenolate"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-colitis", "irae-pneumonitis"],
  tags: ["protocol", "irae", "acute-oncology"],
});

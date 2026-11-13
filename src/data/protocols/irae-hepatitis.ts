import { protocol } from "./helpers";
import { ASCO_GAP, ASCO_ICI_2021, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Immune-mediated hepatitis caused by an immune checkpoint inhibitor, managed by grade.
 *
 * What was read, and how: see ./irae-sources.ts for SITC 2021 (full text, hepatitis recommendations and review), ASCO
 * 2021 (abstract) and ESMO 2022 (not reachable). In addition, the AASLD 2023 practice guidance on drug, herbal and
 * dietary supplement induced liver injury (Hepatology, open access, full text from Europe PMC, PMC9936988), whose
 * immunotherapy section was read in full. DOIs resolved through Crossref. Quotes checked by script against the raw text.
 */
export const iraeHepatitis = protocol({
  id: "irae-hepatitis",
  name: "Immune-mediated hepatitis from checkpoint inhibitors, by grade",
  aka: ["checkpoint inhibitor hepatitis", "ICI hepatotoxicity", "immune-related hepatitis", "IMH", "immunotherapy liver inflammation"],
  domain: "immunotherapy-toxicity",
  tldr: "Immunotherapy can inflame the liver, usually without symptoms, so liver blood tests are checked before every dose. If the tests rise, immunotherapy is paused and steroids are given; severe cases mean stopping immunotherapy. Yellow skin or eyes, dark urine or pale stools need a call to your cancer team the same day.",
  simple: "Immunotherapy can sometimes inflame the liver. Your blood tests check for this before each dose. If you notice yellow skin or eyes, ring your cancer helpline.",
  summary: "Hepatitis (raised ALT or AST) occurs in about 5% on PD-(L)1 or CTLA-4 inhibitors alone and 19% on combinations (9% grade 3 or more), typically 1 to 15 weeks after starting (SITC 2021); AASLD 2023 gives 1 to 15% across trials and observational studies, mostly asymptomatic in the first 6 to 12 weeks. Only about 30% of demonstrable liver injury in advanced cancer is drug-induced, so metastases, sepsis and other causes are excluded with imaging (AASLD).\n\nSITC 2021: liver tests before every infusion. From grade 2, a workup including clotting, bilirubin, iron studies, an autoimmune hepatitis panel and viral hepatitis serology; imaging for grade 3 or more if there is liver disease or suspected metastases. Recheck weekly for grades 1 to 2, every 1 to 2 days for grade 3 or more. Grade 2: prednisone 0.5 to 1 mg/kg/day; grades 3 to 4: methylprednisolone 1 to 2 mg/kg/day; taper over 4 to 6 weeks once tests are grade 1 or less (LE: 1). No improvement in 10 to 14 days, or relapse on taper: mycophenolate mofetil (LE: 4). Never infliximab (LE: 1).\n\nAASLD 2023 agrees on grade 2 (withhold and consider prednisone 0.5 to 1.0 mg/kg/day), and for grade 3 or more permanently discontinues the checkpoint inhibitor, with intravenous steroids at 1 to 1.5 mg/kg/day and admission for jaundice, keeping liver biopsy for persistent grade 3 injury or jaundice despite steroids. ESMO 2022 could not be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "acute-oncology-service", "ward"],
  },
  population: "Adults treated with an immune checkpoint inhibitor, alone or combined with another, whose liver tests rise or who develop jaundice. People with liver metastases or chronic liver disease need the alternative causes excluded with particular care. Children are not addressed.",
  trigger: "A rise in ALT, AST or bilirubin on the pre-dose blood test, or symptoms such as jaundice, dark urine or right upper abdominal pain, during or after checkpoint inhibitor treatment.",
  steps: [
    {
      action: "Check liver tests before every checkpoint inhibitor infusion",
      why: "Immune hepatitis is usually silent and is found on the blood test.",
      source: "sitc-2021",
      quote: "Liver biochemical tests (aka liver function tests (LFTs)) should be checked prior to each ICI infusion.",
    },
    {
      action: "From grade 2, send clotting, bilirubin, alkaline phosphatase, iron studies, an autoimmune hepatitis panel and a viral hepatitis panel",
      why: "These separate immune hepatitis from viral hepatitis, other autoimmune liver disease and iron overload.",
      source: "sitc-2021",
      quote: "Diagnostic workup for grade ≥2 liver toxicity should include ALT, AST, alkaline phosphatase, prothrombin time/international normalized ratio (PT/INR) serum bilirubin, iron studies, autoimmune hepatitis panel (antinuclear antibody (ANA), antineutrophil cytoplasmic antibody (ANCA), antimitochondrial antibody (AMA), peripheral ANCA (p-ANCA), and antismooth muscle antibody (ASMA)), and viral hepatitis panel.",
    },
    {
      action: "Image the liver to look for metastases, sepsis and other causes",
      why: "In people with advanced cancer, most liver test rises are not caused by the drug.",
      source: "aasld-2023",
      quote: "Recent studies suggest that bona fide DILI is only responsible for 30% of cases of demonstrable liver injury in patients with advanced cancer, whereas hepatic metastases, sepsis, and other causes of liver disease account for the remainder, emphasizing the importance of contrast‐enhanced CT and MR scanning in evaluation of these patients.",
    },
    {
      action: "Recheck liver tests weekly for grades 1 to 2 and every 1 to 2 days for grade 3 or more",
      why: "Severe hepatitis can progress within days.",
      source: "sitc-2021",
      quote: "LFTs should be rechecked weekly for patients experiencing grade 1–2 liver toxicities, and should be rechecked every 1–2 days for patients with liver toxicities of grade ≥3.",
    },
    {
      action: "For grade 1, continue treatment with more frequent tests; for grade 2, withhold the checkpoint inhibitor",
      why: "Mild rises often settle without stopping; a moderate rise needs a pause.",
      source: "aasld-2023",
      quote: "For patients with grade 1 liver injury (ALT > 1–3× ULN and/or total bilirubin > 1–1.5× ULN), continued therapy with more frequent laboratory monitoring is advisable.",
    },
    {
      action: "Give prednisone 0.5 to 1 mg/kg/day for grade 2 and methylprednisolone 1 to 2 mg/kg/day for grades 3 and 4",
      why: "Steroids calm the immune attack on the liver; the dose rises with severity.",
      source: "sitc-2021",
      quote: "Grade 2 liver toxicity should be treated initially with prednisone 0.5–1 mg/kg/day (or equivalent), and grades 3 and 4 should be treated initially with methylprednisolone 1–2 mg/kg/day (or equivalent).",
    },
    {
      action: "Taper steroids over 4 to 6 weeks once the liver tests are back to grade 1 or less",
      why: "A fast taper risks rebound hepatitis.",
      source: "sitc-2021",
      quote: "Corticosteroids should be tapered over a period of 4–6 weeks after LFTs revert to grade ≤1",
      grade: "LE: 1",
    },
    {
      action: "If tests have not improved to grade 1 within 10 to 14 days of steroids, or hepatitis returns on the taper, add mycophenolate mofetil",
      why: "Steroid-refractory hepatitis needs a second immunosuppressant.",
      source: "sitc-2021",
      quote: "If ALT or AST results do not improve to grade ≤1 within 10–14 days of corticosteroid initiation, or if liver toxicity recurs after steroid taper, mycophenolate mofetil (1–2 g divided two times per day) may be given",
      grade: "LE: 4",
    },
    {
      action: "Do not use infliximab for immune hepatitis",
      why: "Infliximab can itself damage the liver.",
      source: "sitc-2021",
      quote: "Infliximab should not be used in patients with liver toxicity, given the risk for hepatotoxicity",
      grade: "LE: 1",
    },
    {
      action: "Keep a liver biopsy for grade 3 injury or jaundice that persists despite steroids",
      why: "Biopsy rarely changes early management but helps when steroids are failing.",
      source: "aasld-2023",
      quote: "Liver biopsy typically demonstrates lobular or periportal hepatitis and is generally not recommended unless patients have persistent grade 3 hepatotoxicity or jaundice despite corticosteroids.",
    },
    {
      action: "After immunosuppression is tapered, keep checking liver tests every 2 to 4 weeks",
      why: "Hepatitis can rebound after steroids stop.",
      source: "aasld-2023",
      quote: "After tapering of immunosuppression, the liver tests should continue to be monitored every 2–4 weeks because of the risk of rebound hepatitis.",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 and AASLD 2023 agree on the frame: liver tests before every dose, exclusion of metastases, infection and viral hepatitis, prednisone 0.5 to 1 mg/kg/day for grade 2, and mycophenolate mofetil when steroids fail. They differ for grade 3 or more: SITC gives methylprednisolone 1 to 2 mg/kg/day and does not state discontinuation in its hepatitis section; AASLD permanently discontinues the checkpoint inhibitor and considers intravenous steroids at 1 to 1.5 mg/kg/day with admission for jaundice. SITC grades the 4 to 6 week taper LE: 1 and the warning against infliximab LE: 1; AASLD's guidance is expert consensus. ASCO 2021 permanently stops checkpoint inhibitors after most grade 4 toxicities; its hepatitis table and ESMO 2022 were not read.",
    sources: ["sitc-2021", "aasld-2023", "asco-2021", "esmo-2022"],
  },
  variants: [
    {
      name: "Permanent discontinuation from grade 3 (AASLD 2023)",
      differs: "For ALT 5 to 20 times the upper limit and/or bilirubin 3 to 10 times, or symptomatic liver dysfunction, permanently discontinues the checkpoint inhibitor and considers intravenous steroids at 1 to 1.5 mg/kg/day with hospital admission for jaundice; names azathioprine as well as mycophenolate for steroid-refractory disease.",
      evidence: "Expert-panel practice guidance commissioned instead of a guideline because randomised trials are lacking.",
      sources: ["aasld-2023"],
    },
    {
      name: "Tacrolimus or antithymocyte globulin for refractory hepatitis (SITC 2021)",
      differs: "Lists tacrolimus and antithymocyte globulin as other agents to consider, and a liver biopsy if mycophenolate fails to bring tests to grade 1 within 10 to 14 days.",
      evidence: "Not graded (expert consensus), based on use in autoimmune hepatitis.",
      sources: ["sitc-2021"],
    },
  ],
  grades: [
    { claim: "Steroid taper over 4 to 6 weeks after liver tests return to grade 1 or less", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Mycophenolate mofetil for steroid-refractory or recurrent hepatitis", grade: "LE: 4", source: "sitc-2021" },
    { claim: "No infliximab in liver toxicity", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Grade 3 or more: permanently discontinue the checkpoint inhibitor", grade: "expert opinion (practice guidance)", source: "aasld-2023", quote: "For patients with grade 3 or higher hepatotoxicity (ALT 5–20× ULN and/or bilirubin 3–10× ULN or symptomatic liver dysfunction), the ICI should be permanently discontinued, and i.v. steroids at a dose of 1–1.5 mg/kg per day along with hospitalization for patients with jaundice should be considered." },
    { claim: "General rule: permanent discontinuation after grade 4", grade: "expert consensus", source: "asco-2021" },
  ],
  sources: [
    SITC_ICI_2021,
    {
      key: "aasld-2023",
      label: "AASLD practice guidance on drug, herbal, and dietary supplement induced liver injury",
      publisher: "American Association for the Study of Liver Diseases, Hepatology",
      year: 2023,
      url: "https://europepmc.org/article/PMC/PMC9936988",
      doi: "10.1002/hep.32689",
      gradingScheme: "Practice guidance developed by consensus of an expert panel after review of the literature; guidance statements are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    ASCO_ICI_2021,
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    ASCO_GAP,
    "SITC's hepatitis section does not say whether to stop the checkpoint inhibitor permanently after grade 3 hepatitis; AASLD does, and the ASCO hepatitis table was not read, so the guidelines' positions on re-challenge after grade 3 hepatitis are not compared here.",
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

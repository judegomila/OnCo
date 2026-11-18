import { protocol } from "./helpers";

/*
 * Food during cancer treatment and neutropenia: safe food handling, and the evidence against restrictive
 * "neutropenic" diets, for adults and children.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - Phillips et al., Use of food restrictions to prevent infections in paediatric patients with cancer and
 *   haematopoietic cell transplantation recipients: a systematic review and clinical practice guideline (POGO,
 *   eClinicalMedicine 2025): open access, full text from Europe PMC (PMC11872571, full-text XML).
 * - Children's Oncology Group endorsement of that guideline (version date 23 July 2025): public PDF, full text.
 * - ASCO guideline, Exercise, Diet, and Weight Management During Cancer Treatment (Ligibel et al., J Clin Oncol 2022):
 *   abstract only, Europe PMC (not open access).
 * - CDC/IDSA/ASBMT and international partners, Guidelines for preventing infectious complications among HCT
 *   recipients: a global perspective (Tomblyn et al., Biol Blood Marrow Transplant 2009): full text from Europe PMC
 *   (PMC3103296). No later edition of this guideline was found in Europe PMC.
 * - Ma et al., Front Oncol 2022 (meta-analysis, PMC8959862) and the Nutrients 2025 systematic review in adult
 *   high-dose therapy and HCT (PMC11901642): full text from Europe PMC.
 * - Stella et al., Blood Adv 2023 (randomised non-inferiority trial after HSCT): abstract, Europe PMC.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed.
 *
 * Second accuracy pass, 17 November 2026. Every source was fetched again as raw text with curl and every quote was
 * checked against it by script (whitespace normalised, XML tags stripped, nothing else): the POGO guideline, Ma 2022
 * and the Nutrients 2025 review as full-text XML from Europe PMC; the COG endorsement as its public PDF read with
 * pdftotext; the ASCO 2022 guideline as its Europe PMC abstract (still not open access); the 2009 HCT guideline from
 * the Europe PMC full-text XML a sibling checker saved the same day. Stella 2023 is now open access (PMC10580268) and
 * was read in full. Europe PMC was searched for newer editions and none was found. Corrected: Ma 2022 pooled 6
 * studies of which 4 were randomised, not 6 randomised trials; the 2009 guideline's post-engraftment diet lasts 3
 * months after autologous transplant; several reasons that no source states were reworded to what the sources say.
 */
export const foodSafetyAndNeutropenicDiet = protocol({
  id: "food-safety-and-neutropenic-diet",
  name: "Food safety during cancer treatment and the evidence against neutropenic diets",
  aka: ["neutropenic diet", "low-microbial diet", "low-bacterial diet", "clean diet", "food restrictions during chemotherapy", "food safety neutropenia", "protective diet"],
  domain: "infection-prevention",
  tldr: "Strict lists of banned foods (the 'neutropenic diet') do not prevent infections in trials, in children or adults, and they make eating harder. What matters is ordinary food safety: clean hands and surfaces, raw meat kept apart, fruit and vegetables washed, meat and eggs cooked through, and no unpasteurised milk or cheese, mouldy food or unsafe water. Transplant teams may differ.",
  simple: "You do not need to give up fresh fruit and vegetables during cancer treatment. Wash them well. Cook meat and eggs fully. Avoid unpasteurised milk and cheese. Keep the kitchen clean. Ask your team if you have had a transplant.",
  summary: "The 2025 POGO guideline, endorsed by the Children's Oncology Group, reviewed 8 randomised trials and suggests that food restrictions not be routinely used to prevent infection in children with cancer (conditional, moderate quality) or after autologous or allogeneic HCT (conditional, low quality), with a good practice statement to follow safe food handling, storing, preparation and consumption as set by applicable health authorities. ASCO (2022) does not recommend neutropenic diets to prevent infection in adults during active treatment. A meta-analysis of 6 studies in 1,114 patients, 4 of them randomised (Ma 2022), found a similar infection rate with and without a neutropenic diet (risk ratio 1.13, 95% CI 0.97 to 1.31) and, in the 2 studies that reported it, similar mortality; a 2025 systematic review of 5 randomised trials in adults having high-dose therapy found no benefit and a tendency to worse nutritional status. One older trial in 153 patients with AML or high-risk MDS found fewer bloodstream infections with restrictions; the POGO panel noted these patients were older and had different diagnoses from most children.\n\nThe older CDC/IDSA/ASBMT HCT guideline (2009) still recommends a low-microbial diet before engraftment (CIII, noting evidence is lacking) and a food-safety diet after it, for 3 months after autologous transplant and, after allogeneic transplant, until all immunosuppressive drugs are stopped and live virus vaccines have been given, with the transplant doctor deciding when it can end. Its general safe handling advice covers separating raw meat, washing produce, cooking meat to a measured internal temperature and refrigerating leftovers within 2 hours. The POGO panel says advice should be the same everywhere on avoiding unpasteurised milk and cheese, undercooked eggs and meat, mouldy food and possibly contaminated water.",
  asOf: "2026-11-17",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor", "multidisciplinary-team"],
    where: ["home", "ward", "outpatient-clinic"],
  },
  population: "Adults and children having chemotherapy, including during neutropenia, and recipients of autologous or allogeneic haematopoietic cell transplant. The POGO guideline covers ages 1 to 18; ASCO covers adults in active treatment. Transplant centres may keep stricter rules (variants).",
  trigger: "Cancer treatment that can lower the neutrophil count is planned, or a person or family asks what they can safely eat.",
  steps: [
    {
      action: "Before treatment starts, go through safe food handling with the patient and whoever will cook for them",
      why: "The transplant guideline asks for this review and teaching before conditioning begins, and says that following the advice lowers the risk of food-borne illness. It is written for people about to have a transplant; no source read sets the timing for other chemotherapy.",
      source: "hct-2009",
      quote: "This review and education should be done before the conditioning regimen (ie, chemotherapy and radiation) begins (BIII).",
      grade: "BIII",
    },
    {
      action: "Follow the food safety advice of the local or national health authority for handling, storing, preparing and eating food",
      why: "The POGO panel made this a good practice statement and says to follow local or regional guidance. As an example it gives the World Health Organization's five steps: keep food clean, separate raw and cooked items, cook thoroughly, keep food at safe temperatures, and use safe water.",
      source: "pogo-2025",
      quote: "Follow practices for safe food handling, storing, preparation and consumption outlined by applicable health authorities.",
      grade: "Good practice statement",
    },
    {
      action: "Do not put children with cancer on a routine restrictive neutropenic diet",
      why: "Six trials in people having chemotherapy showed no consistent improvement in infections, and the panel says restrictions can reduce how much is eaten, the enjoyment of food and quality of life.",
      source: "pogo-2025",
      quote: "We suggest that food restrictions not be routinely used for the prevention of infections in paediatric patients with cancer (conditional recommendation, moderate quality evidence)",
      grade: "conditional recommendation, moderate quality evidence",
    },
    {
      action: "Do not routinely restrict food for children after autologous or allogeneic stem cell transplant",
      why: "Two transplant trials, both in adults, showed no significant benefit. The recommendation is conditional because data after transplant are limited and none come directly from children.",
      source: "pogo-2025",
      quote: "We suggest that food restrictions not be routinely used for the prevention of infections in paediatric autologous HCT and allogeneic HCT recipients (conditional recommendation, low quality evidence)",
      grade: "conditional recommendation, low quality evidence",
    },
    {
      action: "Do not recommend a neutropenic diet to adults during active cancer treatment",
      why: "ASCO's review found that neutropenic diets did not lower the risk of infection during cancer treatment.",
      source: "asco-2022",
      quote: "Neutropenic diets are not recommended to prevent infection in patients with cancer during active treatment.",
    },
    {
      action: "Keep raw meat, poultry, fish and seafood on separate boards and surfaces, and wash hands, boards and knives in warm soapy water after handling them",
      why: "The guideline says uncooked meat should not touch other foods, to prevent Campylobacter and Salmonella infections, which can be severe and invasive in people with weak immunity.",
      source: "hct-2009",
      quote: "Persons preparing food should always use separate cutting boards or wash the board(s) with warm water and soap between cutting different food items (AIII).",
      grade: "AIII",
    },
    {
      action: "Wash all fresh fruit and vegetables well under running water before eating",
      why: "The guideline says washing may prevent many, though not all, infections from contaminated produce. The POGO review found no obvious harm from allowing well-washed raw fruit and vegetables.",
      source: "hct-2009",
      quote: "All fresh produce should be washed thoroughly under running water before serving (AIII)",
      grade: "AIII",
    },
    {
      action: "Cook meat right through, checking its internal temperature against the food safety authority's cooking temperatures",
      why: "The guideline calls the internal temperature the only way to tell that meat has been cooked enough. It quotes United States figures, so use the temperatures your own food safety authority sets.",
      source: "hct-2009",
      quote: "Persons cooking food for HCT recipients should follow established guidelines for monitoring internal cooking temperatures for meats, which is the only method for determining if meat has been adequately cooked (AII).",
      grade: "AII",
    },
    {
      action: "Refrigerate leftovers within 2 hours of cooking and reheat them right through before serving",
      why: "The transplant guideline says to discard leftovers kept at room temperature for more than 2 hours (AIII) and to reheat leftovers to above 74 °C (165 °F) throughout before serving (AII). It is a guideline for transplant recipients and quotes United States food agency figures; local food safety advice may word this differently.",
      source: "hct-2009",
      quote: "refrigerate leftovers within 2 hours of cooking (AII)",
      grade: "AII",
    },
    {
      action: "Avoid unpasteurised milk and cheese, undercooked eggs and meat, food with mould, and drinking water that may be contaminated",
      why: "The POGO panel says advice on these items should be the same everywhere. For other foods, such as sushi, it asks for an approach that respects the cultural and geographic context.",
      source: "pogo-2025",
      quote: "For some food items, safe food handling guidance should be consistent across jurisdictions, such as avoidance of unpasteurised milks and cheeses, undercooked eggs and meats, food with visible or introduced mould, and potentially contaminated drinking water.",
    },
  ],
  bestInClass: {
    statement: "Teach and follow ordinary food safety, and do not impose a restrictive neutropenic diet. For children with cancer and after transplant this is the POGO 2025 guideline endorsed by the Children's Oncology Group (conditional recommendations against routine food restrictions, moderate and low quality evidence, plus a good practice statement on food safety); for adults in active treatment it is ASCO 2022 (neutropenic diets not recommended). The older CDC/IDSA/ASBMT HCT guideline (2009) differs: it recommends a low-microbial diet before engraftment, while grading that CIII and saying evidence for its efficacy is lacking, and a food-safety diet after engraftment (for 3 months after autologous transplant; after allogeneic transplant until immunosuppressive drugs are stopped and live virus vaccines have been given). A randomised trial in 222 adults having HSCT or high-dose induction chemotherapy (Stella 2023) found an unrestricted diet non-inferior to a protective diet, with higher patient-reported satisfaction. A meta-analysis of 6 studies (Ma 2022) found similar infection rates with and without a neutropenic diet.",
    sources: ["pogo-2025", "cog-food-2025", "asco-2022", "hct-2009", "stella-2023", "ma-2022"],
  },
  variants: [
    {
      name: "Low-microbial diet before engraftment, then a food-safety diet (CDC/IDSA/ASBMT HCT guideline, 2009)",
      differs: "Restricts the diet of transplant recipients before engraftment, then keeps a list of foods to avoid (raw sprouts, fresh salsa, berries, unroasted raw nuts, soft and mould-ripened cheeses, raw honey and others) for 3 months after autologous transplant and, after allogeneic transplant, until all immunosuppressive drugs are stopped and the patient has received live virus vaccines. The guideline leaves the final decision on stopping the diet to the transplant doctor.",
      evidence: "The low-microbial diet is graded CIII, with the guideline stating that evidence for its efficacy is lacking; many of the individual food bans are graded EII. The 2025 POGO guideline, which reviewed trials up to May 2024, suggests against routine restrictions in children.",
      sources: ["hct-2009", "pogo-2025"],
    },
    {
      name: "Transplant centres that keep a protective diet",
      differs: "A neutropenic or low-bacterial diet has been standard care early after HSCT in many centres; the 2025 Nutrients review cites a European Society for Blood and Marrow Transplantation survey of 2015 and 2016 in which over 90% of centres in 23 countries did so. No later survey was read.",
      evidence: "Five randomised trials in 510 adults on high-dose therapy found no significant advantage on any endpoint analysed and a tendency to worse nutritional status (Nutrients 2025); the Stella 2023 trial found an unrestricted diet non-inferior during neutropenia after HSCT.",
      sources: ["nutrients-2025", "stella-2023"],
    },
    {
      name: "Cooked-food diet during remission induction for acute myeloid leukaemia",
      differs: "Restricts uncooked foods during remission induction chemotherapy for acute myeloid leukaemia, as tested in one randomised comparison of cooked and non-cooked diets published in 2008. No source read says how many units do this now.",
      evidence: "One randomised trial of 153 patients (median age 64) with AML or high-risk MDS reported fewer bloodstream infections with food restriction (14% against 29%, p = 0.022). The POGO panel noted that these patients were older and had different diagnoses from most children, and found that the six chemotherapy trials together showed no consistent improvement in infection outcomes.",
      sources: ["pogo-2025"],
    },
  ],
  grades: [
    { claim: "No routine food restrictions in children with cancer", grade: "conditional recommendation, moderate quality evidence", source: "pogo-2025" },
    { claim: "No routine food restrictions in children after autologous or allogeneic HCT", grade: "conditional recommendation, low quality evidence", source: "pogo-2025" },
    { claim: "Follow local health authority food safety practices", grade: "Good practice statement", source: "pogo-2025" },
    { claim: "Low-microbial diet for HCT recipients before engraftment", grade: "CIII", source: "hct-2009", quote: "A low-microbial diet is recommended for HCT recipients prior to engraftment 771, 772, although evidence for its efficacy to prevent infection is lacking (CIII)" },
    { claim: "Review general food safety practices before transplant", grade: "AIII", source: "hct-2009" },
    { claim: "Pooled infection risk with a neutropenic diet across 6 studies, 4 of them randomised", grade: "risk ratio 1.13, 95% CI 0.97 to 1.31 (meta-analysis, not a guideline grade)", source: "ma-2022", quote: "The meta-analysis found that patients in the study group had similar results for the incidence of infection compared with the patients in the control group (risk ratio, 1.13; 95% CI, 0.97 to 1.31; P = 0.11)." },
  ],
  sources: [
    { key: "pogo-2025", label: "Use of food restrictions to prevent infections in paediatric patients with cancer and haematopoietic cell transplantation recipients: a systematic review and clinical practice guideline", publisher: "Pediatric Oncology Group of Ontario (POGO), eClinicalMedicine", year: 2025, url: "https://europepmc.org/article/PMC/PMC11872571", doi: "10.1016/j.eclinm.2025.103093", gradingScheme: "GRADE: strong or conditional recommendations, evidence high, moderate, low or very low; good practice statements ungraded.", read: "full-text", accessed: "2026-11-17" },
    { key: "cog-food-2025", label: "Food restrictions to prevent infection in paediatric patients with cancer and HCT recipients (COG endorsement, version date 23 July 2025)", publisher: "Children's Oncology Group", year: 2025, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_Food_Restrictions_Document_23JULY2025-new-logo.pdf", gradingScheme: "Reprints the source guideline's GRADE strength and quality.", read: "full-text", accessed: "2026-11-17" },
    { key: "asco-2022", label: "Exercise, Diet, and Weight Management During Cancer Treatment: ASCO Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2022, url: "https://europepmc.org/article/MED/35576506", doi: "10.1200/jco.22.00687", read: "abstract", accessed: "2026-11-17" },
    { key: "hct-2009", label: "Guidelines for preventing infectious complications among hematopoietic cell transplantation recipients: a global perspective", publisher: "CDC, IDSA, ASBMT and international partners (Biology of Blood and Marrow Transplantation)", year: 2009, url: "https://europepmc.org/article/PMC/PMC3103296", doi: "10.1016/j.bbmt.2009.06.019", gradingScheme: "Strength A (should always be offered), B (should generally be offered), C (optional), D (should generally not be offered), E (should never be offered); quality of evidence I (at least one well-executed randomised controlled trial), II (well-designed trials without randomisation, cohort or case-control studies, time series), III (opinions of respected authorities, descriptive studies or expert committee reports); printed together, for example BIII.", read: "full-text", accessed: "2026-11-17" },
    { key: "ma-2022", label: "Neutropenic Diet Cannot Reduce the Risk of Infection and Mortality in Oncology Patients With Neutropenia", publisher: "Frontiers in Oncology", year: 2022, url: "https://europepmc.org/article/PMC/PMC8959862", doi: "10.3389/fonc.2022.836371", read: "full-text", accessed: "2026-11-17" },
    { key: "nutrients-2025", label: "A Neutropenic Diet in Haemato-Oncological Patients Receiving High-Dose Therapy and Hematopoietic Stem Cell Transplantation: A Systematic Review", publisher: "Nutrients", year: 2025, url: "https://europepmc.org/article/PMC/PMC11901642", doi: "10.3390/nu17050768", read: "full-text", accessed: "2026-11-17" },
    { key: "stella-2023", label: "Nonrestrictive diet does not increase infections during post-HSCT neutropenia: data from a multicenter randomized trial", publisher: "Blood Advances", year: 2023, url: "https://europepmc.org/article/PMC/PMC10580268", doi: "10.1182/bloodadvances.2023010348", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "The ASCO 2022 guideline was read as an abstract only, again on 17 November 2026 (it is not open access), so its grade for the neutropenic diet recommendation is not given here.",
    "The safe handling steps (teaching before treatment, separate boards, washing produce, cooking temperatures, leftovers) are quoted from the 2009 guideline for transplant recipients, which quotes United States food agency figures. No source read states them for people having chemotherapy without a transplant; for them the cited advice is to follow the local health authority.",
    "There is no agreed definition of a neutropenic diet, so the trials tested different restrictions; the POGO panel names cured meats, nuts, seeds, teas and chutneys as items with few data.",
    "The POGO review found two randomised trials after stem cell transplant, both in adults, and none in children.",
    "The CDC/IDSA/ASBMT HCT guideline dates from 2009 and no later edition was found in Europe PMC on 17 November 2026, so its transplant food lists predate the later trials. Europe PMC lists a 2010 erratum to it (Biol Blood Marrow Transplant 2010;16(2):294), which was not read.",
    "UK national guidance on food during neutropenia (for example from the British Dietetic Association) was not found at a public address and is not cited; it was not searched for again on 17 November 2026.",
  ],
  institutions: ["asco"],
  companies: ["childrens-oncology-group"],
  cancers: ["childhood-cancers", "aml", "all-leukemia"],
  technologies: ["allogeneic-hsct", "autologous-stem-cell-transplant"],
  terms: ["neutropenia", "febrile-neutropenia"],
  sections: ["supportive-care", "nutrition-lifestyle"],
  tags: ["protocol", "neutropenic-diet", "food-safety", "paediatric"],
  related: ["diet-alcohol-and-weight-during-cancer-treatment", "neutropenic-precautions-and-daily-life"],
});

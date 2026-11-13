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
 */
export const foodSafetyAndNeutropenicDiet = protocol({
  id: "food-safety-and-neutropenic-diet",
  name: "Food safety during cancer treatment and the evidence against neutropenic diets",
  aka: ["neutropenic diet", "low-microbial diet", "low-bacterial diet", "clean diet", "food restrictions during chemotherapy", "food safety neutropenia", "protective diet"],
  domain: "infection-prevention",
  tldr: "Strict lists of banned foods (the 'neutropenic diet') do not prevent infections in trials, in children or adults, and they make eating harder. What matters is ordinary food safety: clean hands and surfaces, raw meat kept apart, fruit and vegetables washed, meat and eggs cooked through, and no unpasteurised milk or cheese, mouldy food or unsafe water. Transplant teams may differ.",
  simple: "You do not need to give up fresh fruit and vegetables during cancer treatment. Wash them well. Cook meat and eggs fully. Avoid unpasteurised milk and cheese. Keep the kitchen clean. Ask your team if you have had a transplant.",
  summary: "The 2025 POGO guideline, endorsed by the Children's Oncology Group, reviewed 8 randomised trials and suggests that food restrictions not be routinely used to prevent infection in children with cancer (conditional, moderate quality) or after autologous or allogeneic HCT (conditional, low quality), with a good practice statement to follow safe food handling, storing, preparation and consumption as set by applicable health authorities. ASCO (2022) does not recommend neutropenic diets to prevent infection in adults during active treatment. Meta-analysis of 6 randomised trials (Ma 2022) found no reduction in infection (risk ratio 1.13, 95% CI 0.97 to 1.31) or mortality, and a 2025 systematic review of 5 trials in adults having high-dose therapy found no benefit and a tendency to worse nutritional status. One older trial in 153 adults with AML or high-risk MDS found fewer bloodstream infections with restrictions; the POGO panel judged it indirect for children.\n\nThe older CDC/IDSA/ASBMT HCT guideline (2009) still recommends a low-microbial diet before engraftment (CIII, noting evidence is lacking) and a food-safety diet after it until immunosuppression stops; its safe handling advice (separate raw meat, wash produce, cook meat to a measured internal temperature, refrigerate leftovers within 2 hours) is what most food safety teaching uses. The items safe handling advice agrees on everywhere are unpasteurised milk and cheese, undercooked eggs and meat, mouldy food and possibly contaminated water.",
  asOf: "2026-11-11",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor", "multidisciplinary-team"],
    where: ["home", "ward", "outpatient-clinic"],
  },
  population: "Adults and children having chemotherapy, including during neutropenia, and recipients of autologous or allogeneic haematopoietic cell transplant. The POGO guideline covers ages 1 to 18; ASCO covers adults in active treatment. Transplant centres may keep stricter rules (variants).",
  trigger: "Cancer treatment that can lower the neutrophil count is planned, or a person or family asks what they can safely eat.",
  steps: [
    {
      action: "Before treatment starts, teach the patient and whoever cooks for them safe food handling",
      why: "Food poisoning germs such as Salmonella and Campylobacter can cause severe infection when white cells are low; the teaching works best before the first course.",
      source: "hct-2009",
      quote: "This review and education should be done before the conditioning regimen (ie, chemotherapy and radiation) begins (BIII).",
      grade: "BIII",
    },
    {
      action: "Follow the food safety advice of the local or national health authority for handling, storing, preparing and eating food",
      why: "This is the measure every guideline agrees on; local advice fits local foods and water.",
      source: "pogo-2025",
      quote: "Follow practices for safe food handling, storing, preparation and consumption outlined by applicable health authorities.",
      grade: "Good practice statement",
    },
    {
      action: "Do not put children with cancer on a routine restrictive neutropenic diet",
      why: "Six trials in people having chemotherapy showed no consistent drop in infections, and restrictions can harm eating, nutrition and quality of life.",
      source: "pogo-2025",
      quote: "We suggest that food restrictions not be routinely used for the prevention of infections in paediatric patients with cancer (conditional recommendation, moderate quality evidence)",
      grade: "conditional recommendation, moderate quality evidence",
    },
    {
      action: "Do not routinely restrict food for children after autologous or allogeneic stem cell transplant",
      why: "Two transplant trials found no benefit, though there are no trials in children after transplant.",
      source: "pogo-2025",
      quote: "We suggest that food restrictions not be routinely used for the prevention of infections in paediatric autologous HCT and allogeneic HCT recipients (conditional recommendation, low quality evidence)",
      grade: "conditional recommendation, low quality evidence",
    },
    {
      action: "Do not recommend a neutropenic diet to adults during active cancer treatment",
      why: "ASCO's review found neutropenic diets did not lower the risk of infection.",
      source: "asco-2022",
      quote: "Neutropenic diets are not recommended to prevent infection in patients with cancer during active treatment.",
    },
    {
      action: "Keep raw meat, poultry, fish and seafood on separate boards and surfaces, and wash hands, boards and knives in warm soapy water after handling them",
      why: "Raw meat is the commonest source of the germs that cause food poisoning; keeping it apart stops them reaching food that will not be cooked.",
      source: "hct-2009",
      quote: "Persons preparing food should always use separate cutting boards or wash the board(s) with warm water and soap between cutting different food items (AIII).",
      grade: "AIII",
    },
    {
      action: "Wash all fresh fruit and vegetables well under running water before eating",
      why: "Washing removes most of the soil and germs on produce, so fresh fruit and vegetables can stay in the diet.",
      source: "hct-2009",
      quote: "All fresh produce should be washed thoroughly under running water before serving (AIII)",
      grade: "AIII",
    },
    {
      action: "Cook meat right through, checking the inside temperature with a food thermometer",
      why: "Colour is not a reliable guide; the temperature inside the meat is what shows germs have been killed.",
      source: "hct-2009",
      quote: "Persons cooking food for HCT recipients should follow established guidelines for monitoring internal cooking temperatures for meats, which is the only method for determining if meat has been adequately cooked (AII).",
      grade: "AII",
    },
    {
      action: "Refrigerate leftovers within 2 hours of cooking and reheat them until steaming hot throughout",
      why: "Germs multiply in food left at room temperature; prompt cooling and thorough reheating stop them.",
      source: "hct-2009",
      quote: "refrigerate leftovers within 2 hours of cooking (AII)",
      grade: "AII",
    },
    {
      action: "Avoid unpasteurised milk and cheese, undercooked eggs and meat, food with mould, and drinking water that may be contaminated",
      why: "These are the foods that food safety guidance treats as risky everywhere; other foods, such as sushi, depend on local context.",
      source: "pogo-2025",
      quote: "For some food items, safe food handling guidance should be consistent across jurisdictions, such as avoidance of unpasteurised milks and cheeses, undercooked eggs and meats, food with visible or introduced mould, and potentially contaminated drinking water.",
    },
  ],
  bestInClass: {
    statement: "Teach and follow ordinary food safety, and do not impose a restrictive neutropenic diet. For children with cancer and after transplant this is the POGO 2025 guideline endorsed by the Children's Oncology Group (conditional recommendations against routine food restrictions, moderate and low quality evidence, plus a good practice statement on food safety); for adults in active treatment it is ASCO 2022 (neutropenic diets not recommended). The older CDC/IDSA/ASBMT HCT guideline (2009) differs: it recommends a low-microbial diet before engraftment, while grading that CIII and saying evidence for its efficacy is lacking, and a food-safety diet after engraftment until immunosuppression ends. A randomised trial after HSCT in 222 adults (Stella 2023) found an unrestricted diet non-inferior to a protective diet, with higher patient satisfaction.",
    sources: ["pogo-2025", "cog-food-2025", "asco-2022", "hct-2009", "stella-2023", "ma-2022"],
  },
  variants: [
    {
      name: "Low-microbial diet before engraftment, then a food-safety diet (CDC/IDSA/ASBMT HCT guideline, 2009)",
      differs: "Restricts the diet of transplant recipients before engraftment, then keeps a list of foods to avoid (raw sprouts, fresh salsa, berries, unroasted raw nuts, soft and mould-ripened cheeses, raw honey and others) for 3 months after autologous transplant and, after allogeneic transplant, until all immunosuppression stops and live vaccines can be given.",
      evidence: "The low-microbial diet is graded CIII, with the guideline stating that evidence for its efficacy is lacking; many of the individual food bans are graded EII. Later trials and the 2025 POGO guideline do not support routine restrictions.",
      sources: ["hct-2009", "pogo-2025"],
    },
    {
      name: "Transplant centres that keep a protective diet",
      differs: "Many centres still use a neutropenic or low-bacterial diet as standard after HSCT; the 2025 Nutrients review cites a European survey of 2015 and 2016 in which over 90% of centres in 23 countries did so.",
      evidence: "Five randomised trials in 510 adults on high-dose therapy found no advantage on any endpoint and a tendency to worse nutritional status (Nutrients 2025); the Stella 2023 trial found an unrestricted diet non-inferior after HSCT.",
      sources: ["nutrients-2025", "stella-2023"],
    },
    {
      name: "Restrictions during AML induction in older adults",
      differs: "Some leukaemia units restrict uncooked foods during induction chemotherapy for acute myeloid leukaemia.",
      evidence: "One randomised trial of 153 patients (median age 64) with AML or high-risk MDS reported fewer bloodstream infections with food restriction (14% against 29%); the POGO panel judged it indirect for children, and the pooled trials show no overall benefit.",
      sources: ["pogo-2025"],
    },
  ],
  grades: [
    { claim: "No routine food restrictions in children with cancer", grade: "conditional recommendation, moderate quality evidence", source: "pogo-2025" },
    { claim: "No routine food restrictions in children after autologous or allogeneic HCT", grade: "conditional recommendation, low quality evidence", source: "pogo-2025" },
    { claim: "Follow local health authority food safety practices", grade: "Good practice statement", source: "pogo-2025" },
    { claim: "Low-microbial diet for HCT recipients before engraftment", grade: "CIII", source: "hct-2009", quote: "A low-microbial diet is recommended for HCT recipients prior to engraftment 771, 772, although evidence for its efficacy to prevent infection is lacking (CIII)" },
    { claim: "Review general food safety practices before transplant", grade: "AIII", source: "hct-2009" },
    { claim: "Pooled infection risk with a neutropenic diet across 6 randomised trials", grade: "risk ratio 1.13, 95% CI 0.97 to 1.31 (meta-analysis, not a guideline grade)", source: "ma-2022", quote: "The meta-analysis found that patients in the study group had similar results for the incidence of infection compared with the patients in the control group (risk ratio, 1.13; 95% CI, 0.97 to 1.31; P = 0.11)." },
  ],
  sources: [
    { key: "pogo-2025", label: "Use of food restrictions to prevent infections in paediatric patients with cancer and haematopoietic cell transplantation recipients: a systematic review and clinical practice guideline", publisher: "Pediatric Oncology Group of Ontario (POGO), eClinicalMedicine", year: 2025, url: "https://europepmc.org/article/PMC/PMC11872571", doi: "10.1016/j.eclinm.2025.103093", gradingScheme: "GRADE: strong or conditional recommendations, evidence high, moderate, low or very low; good practice statements ungraded.", read: "full-text", accessed: "2026-11-11" },
    { key: "cog-food-2025", label: "Food restrictions to prevent infection in paediatric patients with cancer and HCT recipients (COG endorsement, version date 23 July 2025)", publisher: "Children's Oncology Group", year: 2025, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_Food_Restrictions_Document_23JULY2025-new-logo.pdf", gradingScheme: "Reprints the source guideline's GRADE strength and quality.", read: "full-text", accessed: "2026-11-11" },
    { key: "asco-2022", label: "Exercise, Diet, and Weight Management During Cancer Treatment: ASCO Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2022, url: "https://europepmc.org/article/MED/35576506", doi: "10.1200/jco.22.00687", read: "abstract", accessed: "2026-11-11" },
    { key: "hct-2009", label: "Guidelines for preventing infectious complications among hematopoietic cell transplantation recipients: a global perspective", publisher: "CDC, IDSA, ASBMT and international partners (Biology of Blood and Marrow Transplantation)", year: 2009, url: "https://europepmc.org/article/PMC/PMC3103296", doi: "10.1016/j.bbmt.2009.06.019", gradingScheme: "Strength A (always offer) to E (never offer); quality of evidence I (at least one randomised trial), II (non-randomised, cohort or case-control studies), III (expert opinion or descriptive studies); printed together, for example BIII.", read: "full-text", accessed: "2026-11-11" },
    { key: "ma-2022", label: "Neutropenic Diet Cannot Reduce the Risk of Infection and Mortality in Oncology Patients With Neutropenia", publisher: "Frontiers in Oncology", year: 2022, url: "https://europepmc.org/article/PMC/PMC8959862", doi: "10.3389/fonc.2022.836371", read: "full-text", accessed: "2026-11-11" },
    { key: "nutrients-2025", label: "A Neutropenic Diet in Haemato-Oncological Patients Receiving High-Dose Therapy and Hematopoietic Stem Cell Transplantation: A Systematic Review", publisher: "Nutrients", year: 2025, url: "https://europepmc.org/article/PMC/PMC11901642", doi: "10.3390/nu17050768", read: "full-text", accessed: "2026-11-11" },
    { key: "stella-2023", label: "Nonrestrictive diet does not increase infections during post-HSCT neutropenia: data from a multicenter randomized trial", publisher: "Blood Advances", year: 2023, url: "https://europepmc.org/article/MED/37450382", doi: "10.1182/bloodadvances.2023010348", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The ASCO 2022 guideline was read as an abstract only, so its grade for the neutropenic diet recommendation is not given here.",
    "There is no agreed definition of a neutropenic diet, so the trials tested different restrictions; the POGO panel names cured meats, nuts, seeds, teas and chutneys as items with few data.",
    "No randomised trial has tested food restrictions in children after stem cell transplant.",
    "The CDC/IDSA/ASBMT HCT guideline dates from 2009 and no later edition was found; its transplant food lists have not been revised against the trials since.",
    "UK national guidance on food during neutropenia (for example from the British Dietetic Association) was not found at a public address and is not cited.",
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

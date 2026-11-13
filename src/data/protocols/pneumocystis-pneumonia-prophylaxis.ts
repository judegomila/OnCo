import { protocol } from "./helpers";

/*
 * Prophylaxis against Pneumocystis jirovecii pneumonia (PJP, also written PCP or PcP) in people with cancer who are
 * not living with HIV.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - AGIHO/DGHO 2020 updated guideline on primary prophylaxis of bacterial infections and Pneumocystis jirovecii
 *   pneumonia (Classen et al., Ann Hematol 2021), open access, full text from Europe PMC (PMC8116237, full-text XML),
 *   including Tables 7 to 9.
 * - ECIL-5 guidelines on preventing Pneumocystis pneumonia in haematological malignancy and stem cell transplant
 *   (Maertens et al., J Antimicrob Chemother 2016): abstract only, from Europe PMC. The publisher's full text returned
 *   a bot challenge (HTTP 403) to a script.
 * - ASCO/IDSA 2018 antimicrobial prophylaxis update: abstract only, from Europe PMC.
 * - Guideline for PJP prophylaxis in children with solid tumours (J Pediatr Hematol Oncol 2017): abstract only.
 * A Europe PMC title search (2015 to 2026) found no later international PJP prophylaxis guideline for cancer.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed.
 */
export const pneumocystisPneumoniaProphylaxis = protocol({
  id: "pneumocystis-pneumonia-prophylaxis",
  name: "Pneumocystis pneumonia (PJP) prophylaxis with co-trimoxazole",
  aka: ["PJP prophylaxis", "PCP prophylaxis", "Pneumocystis prophylaxis", "co-trimoxazole prophylaxis", "Septrin prophylaxis", "TMP-SMX prophylaxis", "trimethoprim-sulfamethoxazole prophylaxis"],
  domain: "infection-prevention",
  tldr: "Pneumocystis is a fungus that can cause a dangerous pneumonia in people whose immune system is weakened by some cancer treatments, steroids or a stem cell transplant. An inexpensive antibiotic, co-trimoxazole, taken a few times a week or daily, prevents it very well. People who cannot take it have other options: atovaquone, dapsone or an inhaled medicine once a month.",
  simple: "Some cancer treatments raise the risk of a rare but serious lung infection. A cheap antibiotic tablet, often taken only three days a week, prevents it.",
  summary: "AGIHO (2020) strongly recommends chemoprophylaxis for the groups its Table 7 lists at significant risk: acute lymphoblastic leukaemia, allogeneic stem cell transplant, long-term steroids above 20 mg prednisone equivalent daily for more than 4 weeks, and fludarabine with cyclophosphamide and rituximab (prevent PJP A-I, reduce mortality A-IIr), and for idelalisib, alemtuzumab and temozolomide with radiotherapy (A-IIu,t). Intermediate risk (R-CHOP14, escalated BEACOPP, nucleoside analogues, brain irradiation with high-dose steroids, CD4 below 200/µl) may or may not receive it (C-III). ASCO/IDSA (2018) set the threshold at regimens with more than 3.5% risk, for example 20 mg or more prednisone equivalent daily for a month or more, or purine analogues. ECIL-5 (2016) lists ALL, allogeneic HSCT, alemtuzumab, fludarabine with cyclophosphamide and rituximab, more than 4 weeks of corticosteroids and primary immune deficiencies in children, for the entire period at risk.\n\nCo-trimoxazole (trimethoprim-sulfamethoxazole) is first choice (AGIHO A-IIt,r; ECIL-5 A-II adults, A-I children), at one single-strength tablet daily or one double-strength tablet daily or thrice weekly (B-IIt); ECIL-5 gives it 2 to 3 times weekly and notes children may do equally well once weekly (B-II). Second line: atovaquone 1500 mg daily with a fatty meal (A-IIt), dapsone 100 mg daily after G6PD testing (A-IIt), or aerosolised pentamidine 300 mg monthly (B-IIt), which is probably less effective and needs staff protection. For idelalisib the label asks for prophylaxis from the start and for 2 to 6 months after stopping.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "pharmacist", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home"],
  },
  population: "People with cancer who are not living with HIV and are having treatment that suppresses cell-mediated immunity: haematological cancers, stem cell transplant, long-term corticosteroids, temozolomide with radiotherapy. AGIHO and ASCO/IDSA address adults; ECIL-5 grades adults and children separately; a 2017 guideline addresses children with solid tumours.",
  trigger: "A regimen or steroid course that carries a significant risk of Pneumocystis pneumonia is being planned.",
  steps: [
    {
      action: "Identify the people at significant risk: ALL, allogeneic stem cell transplant, steroids above 20 mg prednisone equivalent a day for more than 4 weeks, or fludarabine with cyclophosphamide and rituximab",
      why: "In these groups the pneumonia is common enough, and deadly enough, that prevention clearly pays.",
      source: "agiho-2020",
      quote: "Oncologic patients at significant risk for PcP are those treated for acute lymphoblastic leukemia, those treated with a combination of fludarabine, cyclophosphamide, and rituximab [129], and patients undergoing allogeneic HSCT [128, 130].",
    },
    {
      action: "Give these patients prophylaxis",
      why: "It prevents the pneumonia and reduces deaths from it.",
      source: "agiho-2020",
      quote: "The administration of chemoprophylaxis in patients with one of these three risk factors is thus strongly recommended to prevent PcP (A-I) and reduce mortality (A-IIr).",
      grade: "A-I (prevent PcP); A-IIr (reduce mortality)",
    },
    {
      action: "Give prophylaxis with idelalisib, alemtuzumab, or temozolomide given with radiotherapy",
      why: "These treatments carry a documented high risk, and for idelalisib the drug label requires it.",
      source: "agiho-2020",
      quote: "Based on the documented high-risk situation, we strongly recommend chemoprophylaxis against PcP for patients receiving temozolomide (in combination with radiotherapy), idelalisib, or alemtuzumab (A-IIu,t) (Tables 7 and 8).",
      grade: "A-IIu,t",
    },
    {
      action: "Decide case by case for intermediate risk, such as R-CHOP14, escalated BEACOPP, nucleoside analogues, brain radiotherapy with high-dose steroids, or a CD4 count below 200",
      why: "These patients occasionally get the infection, but no study shows prophylaxis helps them and many more would need treating to prevent one case.",
      source: "agiho-2020",
      quote: "Such patients at moderate risk may or may not receive chemoprophylaxis to prevent PcP (C-III) and to reduce mortality (C-III).",
      grade: "C-III",
    },
    {
      action: "Use co-trimoxazole (trimethoprim-sulfamethoxazole) first",
      why: "It is the most effective option, and also protects against toxoplasmosis, nocardiosis and actinomycosis.",
      source: "agiho-2020",
      quote: "For these reasons, TMP-SMX is the first-choice agent for PcP prophylaxis (A-IIt,r).",
      grade: "A-IIt,r",
    },
    {
      action: "Give one single-strength tablet daily, or one double-strength tablet daily or three times a week",
      why: "The schedules work equally well; three times a week caused fewer stoppings for side effects in a study in people with HIV.",
      source: "agiho-2020",
      quote: "We recommend using any of these dosing regimens (B-IIt).",
      grade: "B-IIt",
    },
    {
      action: "Continue it for the whole time the person is at risk",
      why: "The risk lasts as long as the immune suppression, not just the days of chemotherapy.",
      source: "ecil5-2016",
      quote: "Trimethoprim/sulfamethoxazole given 2-3 times weekly is the drug of choice for the primary prophylaxis of PCP in adults ( A-II: ) and children ( A-I: ) and should be given during the entire period at risk.",
      grade: "A-II (adults); A-I (children)",
    },
    {
      action: "If co-trimoxazole is not tolerated, use atovaquone 1500 mg once daily with a fatty meal",
      why: "It worked well and does not lower blood counts; lower doses were less effective, and fat helps it absorb.",
      source: "agiho-2020",
      quote: "Low-dose atovaquone has been described to be less effective in PcP prophylaxis [164]; thus, 1500 mg atovaquone should be administered once daily (off-label use) (A-IIt).",
      grade: "A-IIt",
    },
    {
      action: "Or use dapsone 100 mg daily, after testing for G6PD deficiency",
      why: "Dapsone works as well as co-trimoxazole but can break down red cells in G6PD deficiency and cause methaemoglobinaemia.",
      source: "agiho-2020",
      quote: "Testing for glucose-6-phosphat dehydrogenase deficiency is recommended prior to administration of dapsone.",
      grade: "A-IIt",
    },
    {
      action: "Keep aerosolised pentamidine, 300 mg once a month, for when the tablets cannot be used, and protect the staff giving it",
      why: "It has no blood or drug interactions but probably works less well, gives no protection against toxoplasmosis, and exposes staff to the drug.",
      source: "agiho-2020",
      quote: "Our recommendation to use aerosolized pentamidine (300 mg once/month) is moderate (B-IIt) (Table 9).",
      grade: "B-IIt",
    },
  ],
  bestInClass: {
    statement: "Co-trimoxazole for the whole period of risk is the agreed first choice (AGIHO 2020 A-IIt,r; ECIL-5 2016 A-II adults, A-I children). The guidelines agree on the core indications (ALL, allogeneic transplant, fludarabine-based chemoimmunotherapy, alemtuzumab, prolonged steroids) but draw the line differently: AGIHO names significant, intermediate and special-indication groups and leaves intermediate risk to judgement (C-III); ASCO/IDSA (2018) use a numerical threshold of more than 3.5% risk, with 20 mg or more prednisone equivalent daily for a month or longer as the example; ECIL-5 adds primary immune deficiencies in children and other regimens case by case. On the schedule, AGIHO accepts daily or thrice-weekly dosing (B-IIt), ECIL-5 recommends 2 to 3 times weekly and allows once weekly in children (B-II). For children with solid tumours, a 2017 guideline suggests offering prophylaxis to all children having immunosuppressive therapy unless contraindicated.",
    sources: ["agiho-2020", "ecil5-2016", "asco-idsa-2018", "jpho-2017"],
  },
  variants: [
    {
      name: "Numerical risk threshold (ASCO/IDSA 2018)",
      differs: "Recommends prophylaxis for chemotherapy regimens associated with more than 3.5% risk of Pneumocystis pneumonia, for example 20 mg or more prednisone equivalents daily for a month or more, or purine analogues.",
      evidence: "Read as an abstract only, so the grade is not given here.",
      sources: ["asco-idsa-2018"],
    },
    {
      name: "Once-weekly co-trimoxazole in children (ECIL-5)",
      differs: "Uses a single weekly dose instead of 2 to 3 times weekly in children.",
      evidence: "ECIL-5 says recent data indicate children may benefit equally, graded B-II.",
      sources: ["ecil5-2016"],
    },
    {
      name: "Prophylaxis for every child on immunosuppressive therapy for a solid tumour",
      differs: "Offers co-trimoxazole to all children with malignancies on immunosuppressive therapy unless there are clear contraindications, rather than only those in named high-risk groups.",
      evidence: "A paediatric guideline read as an abstract only; it argues from the high mortality of the pneumonia and the safety and low cost of co-trimoxazole.",
      sources: ["jpho-2017"],
    },
  ],
  grades: [
    { claim: "Prophylaxis for significant-risk groups, to prevent PJP", grade: "A-I", source: "agiho-2020" },
    { claim: "Prophylaxis for significant-risk groups, to reduce mortality", grade: "A-IIr", source: "agiho-2020" },
    { claim: "Prophylaxis with idelalisib, alemtuzumab or temozolomide with radiotherapy", grade: "A-IIu,t", source: "agiho-2020" },
    { claim: "Intermediate-risk groups may or may not receive prophylaxis", grade: "C-III", source: "agiho-2020" },
    { claim: "Co-trimoxazole as first choice", grade: "A-IIt,r", source: "agiho-2020" },
    { claim: "Co-trimoxazole 2 to 3 times weekly for the entire period at risk", grade: "A-II (adults); A-I (children)", source: "ecil5-2016" },
    { claim: "Once-weekly co-trimoxazole in children", grade: "B-II", source: "ecil5-2016", quote: "Recent data indicate that children may benefit equally from a once-weekly regimen ( B-II: )." },
    { claim: "Aerosolised pentamidine 300 mg monthly as second choice", grade: "B-IIt", source: "agiho-2020" },
  ],
  sources: [
    { key: "agiho-2020", label: "Primary prophylaxis of bacterial infections and Pneumocystis jirovecii pneumonia in patients with hematologic malignancies and solid tumors: 2020 updated guidelines of the Infectious Diseases Working Party of the German Society of Hematology and Medical Oncology (AGIHO/DGHO)", publisher: "AGIHO/DGHO, Annals of Hematology", year: 2021, url: "https://europepmc.org/article/PMC/PMC8116237", doi: "10.1007/s00277-021-04452-9", gradingScheme: "Strength of recommendation A (strongly supports use) to D (supports a recommendation against use) and quality of evidence I to III, with indices r (meta-analysis), t (transferred evidence), h (historical control), u (uncontrolled trial), a (abstract), printed as A-IIt,r.", read: "full-text", accessed: "2026-11-11" },
    { key: "ecil5-2016", label: "ECIL guidelines for preventing Pneumocystis jirovecii pneumonia in patients with haematological malignancies and stem cell transplant recipients", publisher: "European Conference on Infections in Leukaemia (ECIL-5), Journal of Antimicrobial Chemotherapy", year: 2016, url: "https://europepmc.org/abstract/MED/27550992", doi: "10.1093/jac/dkw157", gradingScheme: "IDSA grading: strength A to C, evidence I to III.", read: "abstract", accessed: "2026-11-11" },
    { key: "asco-idsa-2018", label: "Antimicrobial Prophylaxis for Adult Patients With Cancer-Related Immunosuppression: ASCO and IDSA Clinical Practice Guideline Update", publisher: "ASCO and IDSA, Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/abstract/MED/30179565", doi: "10.1200/JCO.18.00374", read: "abstract", accessed: "2026-11-11" },
    { key: "jpho-2017", label: "Guidelines for the Prophylaxis of Pneumocystis jirovecii Pneumonia (PJP) in Children With Solid Tumors", publisher: "Journal of Pediatric Hematology/Oncology", year: 2017, url: "https://europepmc.org/abstract/MED/28267082", doi: "10.1097/mph.0000000000000771", read: "abstract", accessed: "2026-11-11" },
  ],
  terms: ["lymphoma-tx-pjp-and-infection-prophylaxis"],
  upgrades: [],
  gaps: [
    "The ECIL-5 full text could not be read: the publisher's page returned a bot challenge to a script. Its paediatric doses and the additional regimen-specific indications it proposes are not given here.",
    "ASCO/IDSA 2018 was read only as an abstract, so its grade and drug choices for PJP prophylaxis are not stated.",
    "No source read here gives a duration after treatment ends beyond 'the entire period at risk', except the idelalisib label's 2 to 6 months cited by AGIHO.",
    "Evidence for co-trimoxazole schedules comes largely from people living with HIV and is transferred to cancer (AGIHO grades it B-IIt).",
    "Whether prophylaxis helps intermediate-risk groups, such as people on long-term anti-CD20 antibodies or R-CHOP14, has not been studied.",
  ],
  cancers: ["all-leukemia", "cll", "non-hodgkin-lymphoma", "glioblastoma", "childhood-cancers"],
  drugs: ["idelalisib", "alemtuzumab", "temozolomide", "fludarabine", "rituximab"],
  technologies: ["allogeneic-hsct"],
  related: ["lymphoma-tx-pjp-and-infection-prophylaxis"],
  sections: ["supportive-care"],
  tags: ["protocol", "pneumocystis", "infection-prevention"],
});

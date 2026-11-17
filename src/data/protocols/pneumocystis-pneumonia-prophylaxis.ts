import { protocol } from "./helpers";

/*
 * Prophylaxis against Pneumocystis jirovecii pneumonia (PJP, also written PCP or PcP) in people with cancer who are
 * not living with HIV.
 *
 * First read on 11 November 2026. Second accuracy pass on 17 November 2026: every source was read again as raw text
 * (curl into a scratch directory, tags stripped by script, quotes checked verbatim by script) and each claim was
 * checked against it.
 * - AGIHO/DGHO 2020 updated guideline on primary prophylaxis of bacterial infections and Pneumocystis jirovecii
 *   pneumonia (Classen et al., Ann Hematol 2021), open access: full-text XML fetched again from Europe PMC
 *   (PMC8116237), including Tables 7 to 9.
 * - ECIL-5 guidelines on preventing Pneumocystis pneumonia (Maertens et al., J Antimicrob Chemother 2016): abstract
 *   only, from the Europe PMC record a sibling checker saved on 17 November 2026 and re-used here. That checker found
 *   the publisher's page and the repository copies closed to a script the same day. ECIL's own site lists a 2013
 *   slide set on the subject; its link answered 404 on the one attempt made.
 * - ASCO/IDSA 2018 antimicrobial prophylaxis update: abstract only, from the Europe PMC record the same sibling saved
 *   on 17 November 2026 (the publisher's full text was blocked for that checker and was not tried again).
 * - Guidelines for PJP prophylaxis in children with solid tumours (J Pediatr Hematol Oncol 2017): now read in full
 *   as the authors' own version of the paper, a Word file deposited in White Rose Research Online (University of
 *   York) and linked by Europe PMC, unzipped and read as text. Its dose table flattens in the raw text, so no
 *   paediatric dose is taken from it. The journal's typeset version was read as an abstract only.
 * - Zydelig (idelalisib) summary of product characteristics, EMA product information PDF, read with pdftotext: added
 *   as the source for the 2 to 6 months after idelalisib that AGIHO reports from the label.
 * Europe PMC title searches (2019 to 2026) on 17 November 2026 found no later Pneumocystis prophylaxis guideline for
 * people with cancer. NCCN guidelines need a registered account and were not read.
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text
 * with line breaks joined and nothing else changed.
 */
export const pneumocystisPneumoniaProphylaxis = protocol({
  id: "pneumocystis-pneumonia-prophylaxis",
  name: "Pneumocystis pneumonia (PJP) prophylaxis with co-trimoxazole",
  aka: ["PJP prophylaxis", "PCP prophylaxis", "Pneumocystis prophylaxis", "co-trimoxazole prophylaxis", "Septrin prophylaxis", "TMP-SMX prophylaxis", "trimethoprim-sulfamethoxazole prophylaxis"],
  domain: "infection-prevention",
  tldr: "Pneumocystis is a fungus that can cause a dangerous pneumonia in people whose immune system is weakened by some cancer treatments, long steroid courses or a stem cell transplant. An inexpensive antibiotic, co-trimoxazole, taken daily or on a few days a week, is the first choice to prevent it. People who cannot take it have other options: atovaquone, dapsone or an inhaled medicine once a month.",
  simple: "Some cancer treatments raise the risk of a serious lung infection. An inexpensive antibiotic tablet, taken daily or on a few days a week, is the first choice to prevent it.",
  summary: "AGIHO (2020) strongly recommends chemoprophylaxis for the groups its Table 7 lists at significant risk: acute lymphoblastic leukaemia, allogeneic stem cell transplant, long-term steroids above 20 mg prednisone equivalent daily for more than 4 weeks, and fludarabine with cyclophosphamide and rituximab (prevent PJP A-I, reduce mortality A-IIr), and for idelalisib, alemtuzumab and temozolomide with radiotherapy (A-IIu,t). Intermediate risk (R-CHOP14, escalated BEACOPP, nucleoside analogues, long-term anti-CD20 antibodies, brain irradiation with high-dose steroids, CD4 below 200 cells/µl) may or may not receive it (C-III). The ASCO/IDSA (2018) abstract recommends it for chemotherapy regimens with more than 3.5% risk, giving 20 mg or more prednisone equivalent daily for a month or more, and purine analogues, as examples. ECIL-5 (2016) lists ALL, allogeneic HSCT, alemtuzumab, fludarabine with cyclophosphamide and rituximab, more than 4 weeks of corticosteroids and well-defined primary immune deficiencies in children, for the entire period at risk.\n\nCo-trimoxazole (trimethoprim-sulfamethoxazole) is first choice (AGIHO A-IIt,r; ECIL-5 A-II adults, A-I children). AGIHO gives one single-strength tablet (80/400 mg) daily or one double-strength tablet (160/800 mg) daily or thrice weekly (B-IIt); ECIL-5 gives it 2 to 3 times weekly and notes children may do equally well once weekly (B-II); the UK guideline for children with solid tumours gives it twice weekly, dosed by body surface area. For people who cannot take it AGIHO recommends atovaquone 1500 mg once daily, an off-label use (A-IIt), taken with a fatty meal; dapsone 100 mg daily where blood toxicity is not a major concern (A-IIt), with G6PD testing first; or aerosolised pentamidine 300 mg monthly (B-IIt), which is probably less effective and needs staff protection. On when to stop, the idelalisib label says throughout treatment and for 2 to 6 months afterwards, and the children's guideline suggests 3 months after treatment ends, or 6 months after a transplant, once the lymphocyte count is normal. No source read here sets a CD4 count for stopping.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "pharmacist", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home"],
  },
  population: "People with cancer who are not living with HIV and are having treatment that weakens the immune system: haematological cancers, stem cell transplant, long-term corticosteroids, temozolomide with radiotherapy. ASCO/IDSA address adults, and the doses AGIHO gives are fixed tablet doses with none by weight for children; ECIL-5 grades adults and children separately; a 2017 UK guideline addresses children aged 19 or under treated for solid tumours.",
  trigger: "A regimen or steroid course that carries a significant risk of Pneumocystis pneumonia is being planned.",
  steps: [
    {
      action: "Identify the people at significant risk: ALL, allogeneic stem cell transplant, steroids above 20 mg prednisone equivalent a day for more than 4 weeks, or fludarabine with cyclophosphamide and rituximab",
      why: "AGIHO lists these as the groups at significant risk, and says people with blood cancers appear to die more often once they develop this pneumonia.",
      source: "agiho-2020",
      quote: "Oncologic patients at significant risk for PcP are those treated for acute lymphoblastic leukemia, those treated with a combination of fludarabine, cyclophosphamide, and rituximab [129], and patients undergoing allogeneic HSCT [128, 130].",
    },
    {
      action: "Give these patients prophylaxis",
      why: "It is strongly recommended both to prevent the pneumonia and to reduce deaths.",
      source: "agiho-2020",
      quote: "The administration of chemoprophylaxis in patients with one of these three risk factors is thus strongly recommended to prevent PcP (A-I) and reduce mortality (A-IIr).",
      grade: "A-I (prevent PcP); A-IIr (reduce mortality)",
    },
    {
      action: "Give prophylaxis with idelalisib, alemtuzumab, or temozolomide given with radiotherapy",
      why: "AGIHO calls these a documented high-risk situation, and for idelalisib the drug label requires it.",
      source: "agiho-2020",
      quote: "Based on the documented high-risk situation, we strongly recommend chemoprophylaxis against PcP for patients receiving temozolomide (in combination with radiotherapy), idelalisib, or alemtuzumab (A-IIu,t) (Tables 7 and 8).",
      grade: "A-IIu,t",
    },
    {
      action: "Decide case by case for intermediate risk, such as R-CHOP14, escalated BEACOPP, nucleoside analogues, long-term anti-CD20 antibody treatment, brain radiotherapy with high-dose steroids, or a CD4 count below 200 cells per microlitre",
      why: "These patients may occasionally develop the infection. AGIHO says no studies show that prophylaxis benefits them, and that more people would probably need to be treated to prevent one case.",
      source: "agiho-2020",
      quote: "Such patients at moderate risk may or may not receive chemoprophylaxis to prevent PcP (C-III) and to reduce mortality (C-III).",
      grade: "C-III",
    },
    {
      action: "Use co-trimoxazole (trimethoprim-sulfamethoxazole) first",
      why: "AGIHO finds it the most effective agent, and it also offers protection against toxoplasmosis, nocardiosis and actinomycosis.",
      source: "agiho-2020",
      quote: "For these reasons, TMP-SMX is the first-choice agent for PcP prophylaxis (A-IIt,r).",
      grade: "A-IIt,r",
    },
    {
      action: "Give one single-strength tablet (80/400 mg) daily, or one double-strength tablet (160/800 mg) daily or three times a week",
      why: "Clinical studies showed no relevant difference in how well these schedules work. In a study in people with HIV, fewer people stopped the double-strength tablet for side effects when it was taken three times a week instead of daily.",
      source: "agiho-2020",
      quote: "We recommend using any of these dosing regimens (B-IIt).",
      grade: "B-IIt",
    },
    {
      action: "Continue it for the whole time the person is at risk",
      why: "ECIL-5 says it should be given during the entire period at risk. Its abstract does not say how long that is; the next two steps give the only durations found in the sources read.",
      source: "ecil5-2016",
      quote: "Trimethoprim/sulfamethoxazole given 2-3 times weekly is the drug of choice for the primary prophylaxis of PCP in adults ( A-II: ) and children ( A-I: ) and should be given during the entire period at risk.",
      grade: "A-II (adults); A-I (children)",
    },
    {
      action: "With idelalisib, give prophylaxis throughout treatment and for 2 to 6 months after it stops",
      why: "The European label says serious and fatal infections, including this pneumonia, have occurred with idelalisib, and that how long to continue afterwards is a clinical judgement that may take account of steroid treatment and prolonged neutropenia.",
      source: "zydelig-smpc",
      quote: "Prophylaxis for PJP should therefore be administered to all patients throughout idelalisib treatment, and for a period of 2 to 6 months after discontinuation.",
    },
    {
      action: "In children treated for a solid tumour, plan to continue until 3 months after treatment ends, or 6 months after a stem cell transplant, provided the lymphocyte count is back to normal",
      why: "The guideline says the right duration is uncertain and that no studies have looked at it; it offers this as a pragmatic choice.",
      source: "jpho-2017",
      quote: "A pragmatic choice is to continue until 3 months after the end of treatment, as long as the lymphocyte count has returned to normal, or 6 months after SCT.",
      grade: "Weak recommendation, very low quality evidence",
    },
    {
      action: "If co-trimoxazole is not tolerated or has caused severe side effects, use atovaquone 1500 mg once daily (an off-label use), taken with a fatty meal",
      why: "AGIHO recommends it as the first alternative: it was highly effective, generally well tolerated and not linked to blood toxicity. Low doses have been described as less effective, and a fatty meal helps it absorb.",
      source: "agiho-2020",
      quote: "Low-dose atovaquone has been described to be less effective in PcP prophylaxis [164]; thus, 1500 mg atovaquone should be administered once daily (off-label use) (A-IIt).",
      grade: "A-IIt",
    },
    {
      action: "Or consider dapsone 100 mg daily where blood toxicity is not a major concern, and test for G6PD deficiency before giving it",
      why: "In comparative studies daily dapsone worked as well as co-trimoxazole. AGIHO recommends the G6PD test first, a sentence it does not grade, and says the risk of methaemoglobinaemia must be carefully considered. The children's guideline explains that dapsone may trigger haemolysis in people with G6PD deficiency.",
      source: "agiho-2020",
      quote: "If hematologic toxicity is not a major concern, dapsone (100 mg/day) can be used (A-IIt).",
      grade: "A-IIt",
    },
    {
      action: "Or use aerosolised pentamidine, 300 mg once a month, and protect the staff giving it",
      why: "It has no blood toxicity or drug interactions and is given every 28 days, but AGIHO says it probably works less well than the tablets, does not protect against toxoplasmosis or bacterial infections, and exposes staff to the drug.",
      source: "agiho-2020",
      quote: "Our recommendation to use aerosolized pentamidine (300 mg once/month) is moderate (B-IIt) (Table 9).",
      grade: "B-IIt",
    },
  ],
  bestInClass: {
    statement: "Co-trimoxazole is the first choice in every guideline read (AGIHO 2020 A-IIt,r; ECIL-5 2016 A-II adults, A-I children; the UK children's guideline, strong recommendation on moderate quality evidence), and ECIL-5 says to give it for the entire period at risk. AGIHO and ECIL-5 name the same core indications (ALL, allogeneic transplant, fludarabine with cyclophosphamide and rituximab, alemtuzumab, more than 4 weeks of steroids) but the bodies draw the line differently. AGIHO sets the steroid threshold above 20 mg prednisone equivalent daily, adds idelalisib and temozolomide with radiotherapy, and leaves an intermediate-risk group to judgement (C-III). The ASCO/IDSA (2018) abstract uses a numerical threshold for chemotherapy regimens of more than 3.5% risk, with 20 mg or more prednisone equivalent daily for a month or longer as an example. The ECIL-5 abstract gives no steroid dose, adds well-defined primary immune deficiencies in children, and says further indications are proposed depending on the treatment regimen. On the schedule, AGIHO accepts daily or thrice-weekly dosing (B-IIt), ECIL-5 recommends 2 to 3 times weekly and says children may benefit equally from once weekly (B-II), and the UK children's guideline recommends twice weekly. For alternatives, AGIHO grades atovaquone and dapsone A-IIt and aerosolised pentamidine B-IIt; ECIL-5 calls all of them second-line; the children's guideline calls the choice controversial. NCCN guidance was not read, and no ASTCT guideline on the subject was found.",
    sources: ["agiho-2020", "ecil5-2016", "asco-idsa-2018", "jpho-2017"],
  },
  variants: [
    {
      name: "Numerical risk threshold (ASCO/IDSA 2018)",
      differs: "Recommends prophylaxis for chemotherapy regimens associated with more than 3.5% risk of Pneumocystis pneumonia, for example 20 mg or more prednisone equivalents daily for a month or more, or purine analogues.",
      evidence: "Read as an abstract only, so the grade is not given here. The steroid dose is the abstract's example of such a regimen, not a rule of its own.",
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
      differs: "Offers prophylaxis to all children with solid tumours having treatment likely to make them lymphopenic, unless there are clear contraindications, from the start of treatment, instead of only those in named high-risk groups. Co-trimoxazole is given twice weekly, dosed by body surface area, and is not given to children having high-dose methotrexate.",
      evidence: "A UK guideline for children aged 19 or under, read as the authors' deposited version. The recommendation to offer it to all is a consensus recommendation; twice-weekly dosing is a strong recommendation on low quality evidence; starting from the beginning of treatment is a weak recommendation on low quality evidence; leaving it out with high-dose methotrexate is a weak recommendation on very low quality evidence. Its abstract argues from the high mortality of the pneumonia and the safety and low cost of co-trimoxazole.",
      sources: ["jpho-2017"],
    },
  ],
  grades: [
    { claim: "Prophylaxis for significant-risk groups, to prevent PJP", grade: "A-I", source: "agiho-2020" },
    { claim: "Prophylaxis for significant-risk groups, to reduce mortality", grade: "A-IIr", source: "agiho-2020" },
    { claim: "Prophylaxis with idelalisib, alemtuzumab or temozolomide with radiotherapy", grade: "A-IIu,t", source: "agiho-2020" },
    { claim: "Intermediate-risk groups may or may not receive prophylaxis", grade: "C-III", source: "agiho-2020" },
    { claim: "Co-trimoxazole as first choice", grade: "A-IIt,r", source: "agiho-2020" },
    { claim: "Co-trimoxazole as one single-strength tablet daily, or one double-strength tablet daily or thrice weekly", grade: "B-IIt", source: "agiho-2020" },
    { claim: "Co-trimoxazole 2 to 3 times weekly for the entire period at risk", grade: "A-II (adults); A-I (children)", source: "ecil5-2016" },
    { claim: "Once-weekly co-trimoxazole in children", grade: "B-II", source: "ecil5-2016", quote: "Recent data indicate that children may benefit equally from a once-weekly regimen ( B-II: )." },
    { claim: "Atovaquone 1500 mg once daily as an alternative", grade: "A-IIt", source: "agiho-2020" },
    { claim: "Dapsone 100 mg daily as an alternative", grade: "A-IIt", source: "agiho-2020" },
    { claim: "Aerosolised pentamidine 300 mg monthly as second choice", grade: "B-IIt", source: "agiho-2020" },
    { claim: "Co-trimoxazole as first-line prophylaxis in children with solid tumours", grade: "Strong recommendation, moderate quality evidence", source: "jpho-2017", quote: "First line prophylaxis should be with co-trimoxazole (trimethoprim and sulfamethoxazole)" },
    { claim: "Twice-weekly co-trimoxazole, dosed by surface area, in children with solid tumours", grade: "Strong recommendation, low quality evidence", source: "jpho-2017", quote: "Co-trimoxazole prophylaxis should be given twice weekly in dosage according to surface area (see appendix A)." },
    { claim: "Continuing until 3 months after treatment ends, or 6 months after a stem cell transplant, in children with solid tumours", grade: "Weak recommendation, very low quality evidence", source: "jpho-2017" },
  ],
  sources: [
    { key: "agiho-2020", label: "Primary prophylaxis of bacterial infections and Pneumocystis jirovecii pneumonia in patients with hematologic malignancies and solid tumors: 2020 updated guidelines of the Infectious Diseases Working Party of the German Society of Hematology and Medical Oncology (AGIHO/DGHO)", publisher: "AGIHO/DGHO, Annals of Hematology", year: 2021, url: "https://europepmc.org/article/PMC/PMC8116237", doi: "10.1007/s00277-021-04452-9", gradingScheme: "Strength of recommendation A (strongly supports use) to D (supports a recommendation against use) and quality of evidence I to III, with indices r (meta-analysis), t (transferred evidence), h (historical control), u (uncontrolled trial), a (abstract), printed as A-IIt,r.", read: "full-text", accessed: "2026-11-17" },
    { key: "ecil5-2016", label: "ECIL guidelines for preventing Pneumocystis jirovecii pneumonia in patients with haematological malignancies and stem cell transplant recipients", publisher: "European Conference on Infections in Leukaemia (ECIL-5), Journal of Antimicrobial Chemotherapy", year: 2016, url: "https://europepmc.org/abstract/MED/27550992", doi: "10.1093/jac/dkw157", gradingScheme: "The abstract says the recommendations use the grading system of the IDSA; the grades it prints are A-I, A-II and B-II.", read: "abstract", accessed: "2026-11-17" },
    { key: "asco-idsa-2018", label: "Antimicrobial Prophylaxis for Adult Patients With Cancer-Related Immunosuppression: ASCO and IDSA Clinical Practice Guideline Update", publisher: "ASCO and IDSA, Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/abstract/MED/30179565", doi: "10.1200/JCO.18.00374", read: "abstract", accessed: "2026-11-17" },
    { key: "jpho-2017", label: "Guidelines for the Prophylaxis of Pneumocystis jirovecii Pneumonia (PJP) in Children With Solid Tumors (read as the authors' version deposited in White Rose Research Online)", publisher: "Journal of Pediatric Hematology/Oncology", year: 2017, url: "https://eprints.whiterose.ac.uk/113582/", doi: "10.1097/mph.0000000000000771", gradingScheme: "GRADE: each recommendation is printed as strong or weak with the quality of its evidence (moderate, low or very low), or as a consensus recommendation.", read: "full-text", accessed: "2026-11-17" },
    { key: "zydelig-smpc", label: "Zydelig (idelalisib) summary of product characteristics, section 4.4 (EMA EPAR product information, as downloaded; the PDF prints no revision date and its file properties are dated 17 May 2024)", publisher: "European Medicines Agency", year: 2024, url: "https://www.ema.europa.eu/en/documents/product-information/zydelig-epar-product-information_en.pdf", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
  ],
  terms: ["lymphoma-tx-pjp-and-infection-prophylaxis"],
  upgrades: [],
  gaps: [
    "On 17 November 2026 the ECIL-5 full text could still not be read: the publisher's page answers a script with a bot challenge, and a slide set listed on ECIL's own site returned an error. Its doses, any steroid dose threshold, its advice on when to stop and the additional regimen-specific indications it proposes are not given here.",
    "On 17 November 2026 ASCO/IDSA 2018 could be read only as an abstract, so its grade, its drug choices and its advice on duration are not stated. The abstract's sentence is about chemotherapy regimens and gives the steroid dose as an example.",
    "NCCN guidance on preventing infection needs a registered account and was not read, and a Europe PMC title search on 17 November 2026 found no ASTCT guideline on Pneumocystis prophylaxis, so this page does not say where either differs.",
    "No source read here gives a CD4 count at which to stop, and for adults none gives a time after treatment ends beyond 'the entire period at risk', except the idelalisib label's 2 to 6 months. The 3 months suggested for children with solid tumours is offered as a pragmatic choice on very low quality evidence.",
    "AGIHO's text and tables differ in two small ways: the text gives the steroid threshold as more than 20 mg a day 'for 4 weeks' where Table 7 prints 'for > 4 weeks', and the text speaks of 'these three risk factors' after naming four groups. This page follows Tables 7 and 8, which list all four as significant risk.",
    "The children's guideline was read as the authors' deposited version; the journal's typeset text was read only as an abstract and may differ in wording. Its table of doses by body surface area flattens in the raw text, so no paediatric dose is given here.",
    "AGIHO grades the co-trimoxazole schedules and all three alternatives with the index 't', meaning the evidence is transferred from other patient groups; the comparison of thrice-weekly with daily dosing it cites was in people with HIV.",
    "AGIHO found no studies showing that prophylaxis benefits intermediate-risk groups, such as people on long-term anti-CD20 antibodies or R-CHOP14.",
  ],
  cancers: ["all-leukemia", "cll", "non-hodgkin-lymphoma", "glioblastoma", "childhood-cancers"],
  drugs: ["idelalisib", "alemtuzumab", "temozolomide", "fludarabine", "rituximab"],
  technologies: ["allogeneic-hsct"],
  related: ["lymphoma-tx-pjp-and-infection-prophylaxis"],
  sections: ["supportive-care"],
  tags: ["protocol", "pneumocystis", "infection-prevention"],
});

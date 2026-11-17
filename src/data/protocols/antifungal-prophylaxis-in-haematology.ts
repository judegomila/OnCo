import { protocol } from "./helpers";

/*
 * Primary antifungal (mould-active) prophylaxis for adults and children at high risk of invasive fungal disease:
 * acute myeloid leukaemia, allogeneic transplant and the other high-risk groups.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again raw
 * with curl and read as text, every quote was checked by script against the stripped text, and every DOI was
 * resolved through Crossref and Europe PMC and its title checked.
 * - ECIL-10, Primary antifungal prophylaxis in hematological malignancies (Leukemia 2025): full text XML from the
 *   Europe PMC REST endpoint (PMC12208874). Table grades and doses are read from the stripped table text; quotes are
 *   taken only from the prose and the abstract.
 * - ECIL-9, Infectious complications of targeted drugs and biotherapies in acute leukemia (Leukemia 2022): added on
 *   17 November 2026 for the venetoclax and gilteritinib interactions that ECIL-10 refers back to. Full text XML from
 *   Europe PMC (PMC9061290). Its May 2022 correction (PMC9061292) was read and changes only the authors' names.
 * - AGIHO/DGHO 2022 update (J Antimicrob Chemother 2023): added on 17 November 2026 for the drug level targets and the
 *   dose changes with targeted drugs. Full text XML from Europe PMC (PMC10393896).
 * - EHA guideline summary (HemaSphere 2022): added on 17 November 2026. Full text XML from Europe PMC (PMC9208892);
 *   its correction (PMC9259137) changes only the corresponding author. The full EHA guideline (Lancet Haematology
 *   2022) is not open access and was not read.
 * - Lehrnbecher et al., paediatric guideline (J Clin Oncol 2020): full text XML from Europe PMC (PMC7499615), with the
 *   Children's Oncology Group endorsement PDF (version date 31 August 2020, pdftotext). The POGO guideline page, read
 *   raw on 17 November 2026, now lists this 2020 guideline as archived and the 2026 update as current.
 * - POGO 2026 update (J Clin Oncol, published 2 October 2026): abstract only, from Europe PMC. ascopubs.org answered
 *   403 with a browser check on 17 November 2026 and Europe PMC holds no full text.
 * - ASCO/IDSA antimicrobial prophylaxis update (Taplitz et al., J Clin Oncol 2018): abstract only, from Europe PMC.
 * - The NCCN guideline on cancer-related infections sits behind a login and was not read.
 * Quotes are copied from the raw text with line breaks joined and nothing else changed.
 */
export const antifungalProphylaxisInHaematology = protocol({
  id: "antifungal-prophylaxis-in-haematology",
  name: "Antifungal prophylaxis for people at high risk of invasive fungal infection",
  aka: ["mould-active prophylaxis", "mold-active prophylaxis", "posaconazole prophylaxis", "primary antifungal prophylaxis", "azole prophylaxis", "invasive aspergillosis prevention"],
  domain: "infection-prevention",
  tldr: "People on the most intensive leukaemia treatment, or a stem cell transplant from a donor, are at higher risk of serious fungal infections, including moulds. Most are offered a preventive antifungal medicine while the risk is highest; for adults this is often posaconazole. Many other cancer treatments do not need one. These medicines interact with other drugs, so the team checks each one.",
  simple: "Very strong leukaemia treatment and donor stem cell transplants raise the risk of serious fungal infections. A preventive antifungal medicine is often given during that time. It can clash with other medicines, so the team checks them.",
  summary: "Give systemic antifungal prophylaxis to groups at high risk of invasive fungal disease, and make it mould-active. Children (POGO 2020, endorsed by COG): strong recommendations for AML expected to cause profound and prolonged neutropenia (high quality) and for allogeneic HSCT pre-engraftment and during systemic immunosuppression for GVHD (moderate); consider it in newly diagnosed or relapsed ALL at high risk (weak, low); do not use it routinely in low-risk ALL or in most lymphomas and solid tumours (strong); not routinely in autologous HSCT (weak). If warranted, use a mould-active agent (strong, high), an echinocandin or a mould-active azole (strong, moderate), and not amphotericin routinely (strong, low). The abstract of the 2026 POGO update says the strong recommendations for AML, for allogeneic HCT and for an echinocandin or mould-active azole were maintained; its full text was not read. Adults: ECIL-10 (2025) grades posaconazole tablets (300 mg once daily, twice on day 1) A-I during intensive remission induction for AML and for MDS treated like AML, with isavuconazole, micafungin and caspofungin B-II; B-IIu for prophylaxis during AML consolidation and during the first four cycles of azacitidine in MDS; posaconazole A-I in steroid-treated acute GVHD. ECIL does not recommend routine prophylaxis in Hodgkin lymphoma, myeloma or autologous HSCT, proposes mould-active prophylaxis for CAR-T recipients with risk factors (B-II), and now recommends prophylaxis for children with ALL aged 12 or older or with insufficient treatment response. Voriconazole and posaconazole are not recommended with vincristine (D-II). With venetoclax, ECIL-9 says to reduce the venetoclax dose by 75% when posaconazole is given (A-I); AGIHO says by at least 75% with posaconazole or voriconazole and by 50% with fluconazole or isavuconazole. AGIHO prints drug level targets, for example posaconazole above 0.7 mg/L for prophylaxis. ASCO/IDSA (2018, adults) recommend antifungal prophylaxis for patients at high risk, including those expected to have profound, protracted neutropenia, defined as fewer than 100 neutrophils per microlitre for more than 7 days.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "pharmacist", "nurse", "patient-or-carer"],
    where: ["ward", "outpatient-clinic", "home"],
  },
  population: "Adults and children with haematological cancers, and recipients of allogeneic or autologous haematopoietic cell transplant or CAR-T cells (ECIL-10 covers adults and children with haematological malignancies; POGO covers children with cancer and HSCT recipients; AGIHO covers adults and leaves transplant recipients to separate guidelines). For most children with lymphomas or solid tumours POGO recommends against routine prophylaxis, and ECIL does not recommend it routinely in adults with lymphoma or myeloma.",
  trigger: "Treatment is planned that is expected to cause profound and prolonged neutropenia, or an allogeneic transplant, or systemic immunosuppression for graft-versus-host disease.",
  steps: [
    {
      action: "In children, do not give routine prophylaxis at low risk of invasive fungal disease; judge the risk from the child and the treatment, not the diagnosis alone",
      why: "At low risk the benefit is likely to be small and is outweighed by the risk of side effects, the cost and the inconvenience. Some children with lymphomas or solid tumours are still at high risk, such as those with advanced Burkitt lymphoma.",
      source: "paed-afp-2020",
      quote: "Do not routinely administer systemic antifungal prophylaxis to children and adolescents with cancer at low risk for IFD, such as most pediatric patients with lymphomas and solid tumors (Evidence quality: moderate; Strength of recommendation: strong).",
      grade: "Evidence quality: moderate; Strength of recommendation: strong",
    },
    {
      action: "Give antifungal prophylaxis to children and adolescents having AML treatment expected to cause profound and prolonged neutropenia",
      why: "Children with AML are at high risk of fungal infection, and prophylaxis reduced it most in those at highest risk.",
      source: "paed-afp-2020",
      quote: "Administer systemic antifungal prophylaxis to children and adolescents receiving treatment of acute myeloid leukemia that is expected to result in profound and prolonged neutropenia (Evidence quality: high; Strength of recommendation: strong).",
      grade: "Evidence quality: high; Strength of recommendation: strong",
    },
    {
      action: "Give it to children having an allogeneic transplant before engraftment, and during systemic immunosuppression for graft-versus-host disease",
      why: "These are two separate periods of high fungal risk; in transplant recipients prophylaxis also lowered deaths from fungal infection.",
      source: "paed-afp-2020",
      quote: "Administer systemic antifungal prophylaxis to children and adolescents undergoing allogeneic HSCT pre-engraftment and to those receiving systemic immunosuppression for the treatment of graft-versus-host disease (GVHD; Evidence quality: moderate; Strength of recommendation: strong).",
      grade: "Evidence quality: moderate; Strength of recommendation: strong",
    },
    {
      action: "Treat children with ALL who are aged 12 or older, or whose leukaemia responds insufficiently to treatment, as at higher risk, and offer them prophylaxis",
      why: "In an international trial of 6,316 children with ALL, age of 12 or over and insufficient treatment response were the significant risk factors for fungal disease. ECIL prints no grade for this recommendation. POGO (2020) goes less far: a weak recommendation to consider prophylaxis in ALL at high risk, without naming the subgroup.",
      source: "ecil-10",
      quote: "Consequently, older children (≥ 12 years) with ALL and those with insufficient treatment response are identified as being at elevated risk for IFD and are now recommended to receive antifungal prophylaxis.",
    },
    {
      action: "During intensive remission induction chemotherapy for AML, or for MDS treated like AML, give mould-active prophylaxis, with posaconazole tablets the first choice",
      why: "Posaconazole is the only agent ECIL grades A-I here; its table prints the tablet dose as 300 mg once a day, twice on day 1. Isavuconazole, micafungin and caspofungin are B-II alternatives. ECIL says isavuconazole may be considered in selected adults for whom posaconazole is not appropriate, for example because of liver function abnormalities, QTc prolongation, drug interactions or absorption problems, and notes that it is not approved for prophylaxis.",
      source: "ecil-10",
      quote: "Regarding acute myeloid leukemia (AML) and myelodysplastic syndromes (MDS) patients undergoing remission induction chemotherapy, a B-II grading has been assigned to isavuconazole, micafungin, and caspofungin, based on non-randomized studies that have shown efficacy in preventing invasive fungal diseases (IFD).",
      grade: "posaconazole A-I; isavuconazole B-IIt; micafungin B-IIu,t; caspofungin B-IIt",
    },
    {
      action: "After an allogeneic transplant, choose by the risk of mould infection before engraftment, and give posaconazole during steroid-treated acute graft-versus-host disease",
      why: "Before engraftment ECIL grades fluconazole A-I where the mould risk is low, and only alongside mould-directed testing or empirical treatment; where the risk is high it is against fluconazole (D-III) and grades voriconazole B-I and posaconazole B-II. In steroid-treated acute GVHD posaconazole is A-I and fluconazole D-III, and ECIL recommends monitoring serum levels of posaconazole, voriconazole and itraconazole. Isavuconazole (B-II) is a second-line choice for people who cannot tolerate posaconazole or voriconazole or who have QTc prolongation.",
      source: "ecil-10",
      quote: "For patients undergoing allogeneic hematopoietic stem cell transplantation (HSCT), no substantial changes were made, apart from the addition of isavuconazole with grading B-II in the post-engraftment period.",
      grade: "pre-engraftment: fluconazole A-I (low mould risk) and D-III (high mould risk), posaconazole B-II, voriconazole B-I; steroid-treated acute GVHD: posaconazole A-I, fluconazole D-III, isavuconazole B-II",
    },
    {
      action: "When prophylaxis is warranted in a child, use a mould-active drug: an echinocandin or a mould-active azole, not routine amphotericin",
      why: "Compared with fluconazole, mould-active drugs reduced fungal infection and deaths from it; amphotericin was no better than fluconazole and caused more side effects. For children under 13 the guideline suggests an echinocandin, voriconazole or itraconazole, and says posaconazole may also be used from 13 years.",
      source: "paed-afp-2020",
      quote: "In choosing a mold-active agent, administer an echinocandin or a mold-active azole (Evidence quality: moderate; Strength of recommendation: strong).",
      grade: "Evidence quality: moderate; Strength of recommendation: strong",
    },
    {
      action: "In ALL treated with chemotherapy that includes vincristine, do not use voriconazole or posaconazole; isavuconazole or fluconazole might be considered with caution",
      why: "Triazoles may increase the nerve toxicity of vincristine, which is broken down by the CYP3A4 enzyme. ECIL grades isavuconazole and fluconazole C-III here, and says other mould-active options (liposomal amphotericin B, echinocandins) might be considered in high-risk patients although no benefit has been shown. ECIL reports invasive fungal disease in 4 to 18% of adults with ALL, similar to AML.",
      source: "ecil-10",
      quote: "Antifungal prophylaxis with a mold-active triazole, such as voriconazole or posaconazole, is not recommended because of interactions which could increase the toxicity of vincristine (D-II).",
      grade: "D-II",
    },
    {
      action: "Check for interactions before starting an azole; if posaconazole is given with venetoclax, reduce the venetoclax dose",
      why: "Triazoles block CYP3A4, the enzyme that clears venetoclax. AGIHO says to reduce venetoclax by at least 75% with posaconazole or voriconazole and by 50% with fluconazole or isavuconazole, and that the dose must be increased again when the azole stops. The EHA summary table says to reduce venetoclax to 70 mg with posaconazole or voriconazole. In chronic lymphocytic leukaemia, ECIL-10 says prophylaxis with venetoclax should be avoided or used cautiously.",
      source: "ecil-9-targeted",
      quote: "If posaconazole is given in combination with venetoclax, reduce venetoclax dose by 75% (A-I)",
      grade: "A-I",
    },
    {
      action: "When a triazole is given with gilteritinib, monitor the QT interval closely; a gilteritinib dose reduction does not appear to be needed",
      why: "Strong CYP3A4 inhibitors such as posaconazole or voriconazole may raise gilteritinib levels. For the other targeted leukaemia drugs the guidelines differ: AGIHO advises triazole prophylaxis without dose adjustment for gilteritinib and midostaurin, and reducing quizartinib (60 to 30 mg, or 30 to 20 mg) and ivosidenib (to 250 mg a day) with posaconazole or voriconazole (both B, III); ECIL-9 says of midostaurin to consider alternatives that do not strongly inhibit CYP3A4 or to monitor for adverse reactions.",
      source: "ecil-9-targeted",
      quote: "When one of the above-mentioned triazole antifungal is given concomitantly with gilteritinib, a dose reduction does not appear to be required, however, a close monitoring of potential QT interval prolongation is recommended.",
      grade: "A-I",
    },
    {
      action: "Measure the azole blood level when a breakthrough fungal infection is suspected, and consider it when absorption or metabolism may be affected",
      why: "AGIHO's targets are: posaconazole above 0.7 mg/L for prophylaxis, voriconazole above 1 mg/L for efficacy and below 4.5 mg/L to avoid toxicity, isavuconazole 2 to 5 mg/L and oral itraconazole above 0.5 mg/L, sampled 3 days after starting posaconazole or voriconazole and 7 days after starting itraconazole. AGIHO adds that these targets are not generally applicable to prophylaxis and refer to specific situations, such as obesity, gut graft-versus-host disease or intensive care. Posaconazole suspension levels fall with diarrhoea, gut GVHD and proton pump inhibitors.",
      source: "agiho-2022",
      quote: "In general, assessment of plasma concentration is recommended for triazoles in case of a (suspected) bIFD (AIII) to understand potential reasons for IFD and scope treatment options.",
      grade: "AIII",
    },
    {
      action: "Do not give routine mould-active prophylaxis for autologous transplant, Hodgkin lymphoma or myeloma, and not routinely for non-Hodgkin lymphoma or chronic lymphocytic leukaemia",
      why: "ECIL reports a low risk of fungal disease in these groups. In autologous transplant it says fluconazole 400 mg a day should be considered to prevent mucosal Candida infection during the neutropenic phase (B-III). In non-Hodgkin lymphoma and CLL it allows prophylaxis to be considered in selected refractory cases (C-II).",
      source: "ecil-10",
      quote: "In patients undergoing auto-HSCT, antifungal prophylaxis is not indicated.",
      grade: "Hodgkin lymphoma D-II; myeloma D-II; non-Hodgkin lymphoma D-II; chronic lymphocytic leukaemia D-III",
    },
    {
      action: "For CAR-T recipients, offer mould-active prophylaxis to those with risk factors for mould infection and anti-yeast prophylaxis to the others",
      why: "ECIL cites studies reporting invasive fungal disease in 1 to 15% of people treated with CD19 CAR-T cells, and more infections after cytokine release syndrome, attributed to the immunosuppressive drugs used. The risk factors it lists include neutropenia, previous fungal disease, a previous allogeneic transplant, and CRS or ICANS needing steroids. AGIHO differs: it recommends no general prophylaxis after CAR-T.",
      source: "ecil-10",
      quote: "The expert panel proposes to endorse the use of anti-mold prophylaxis in high-risk patients during pre-infusion and post-infusion, while in low-risk patients, anti-yeast prophylaxis can be recommended (B-II).",
      grade: "B-II",
    },
    {
      action: "In children, consider giving prophylaxis during observed or expected severe neutropenia, and in allogeneic transplant during immunosuppression for GVHD",
      why: "These are the expected periods of highest risk; the guideline says there are limited data on when to start and stop. For adults after an allogeneic transplant, ECIL says that after engraftment, in people without GVHD, fluconazole can be continued until day 75, and AGIHO says prophylaxis with venetoclax should be guided by neutropenia.",
      source: "paed-afp-2020",
      quote: "If systemic antifungal prophylaxis is warranted, consider administration during periods of observed or expected severe neutropenia.",
      grade: "Evidence quality: low; Strength of recommendation: weak",
    },
  ],
  bestInClass: {
    statement: "Prophylaxis targeted to high-risk groups and mould-active. For children, the POGO guideline (2020, endorsed by COG and now listed by POGO as archived; the abstract of its 2026 update says the strong recommendations for AML and allogeneic HCT and for an echinocandin or mould-active azole were maintained, and that good practice statements on drug interactions, infection prevention and local epidemiology were added). For adults and children with haematological cancers, ECIL-10 (2025): posaconazole A-I during AML and MDS induction, isavuconazole, micafungin and caspofungin B-II, and new recommendations for CAR-T and for older or poorly responding children with ALL. AGIHO (2022 update, adults) agrees that posaconazole is the drug of choice (AI). The guidelines differ in four places. ALL: ECIL's abstract says prophylaxis is not indicated in ALL, though ECIL now recommends it for children aged 12 or older or with insufficient response; POGO makes a weak recommendation to consider it for high-risk ALL; AGIHO lists ALL among the conditions with long neutropenia in which prophylaxis is recommended. Choice of agent: POGO puts echinocandins and mould-active azoles side by side (echinocandins where hepatotoxicity matters, azoles where oral dosing matters); ECIL and AGIHO rank posaconazole highest, and AGIHO grades caspofungin and fluconazole C, I where ECIL grades them B. CAR-T: ECIL proposes mould-active prophylaxis for those with risk factors (B-II); AGIHO recommends no general prophylaxis. Venetoclax: ECIL-9 says reduce by 75% with posaconazole; AGIHO says by at least 75%; the EHA summary says to 70 mg. The definition of long neutropenia also differs: fewer than 100 neutrophils per microlitre for more than 7 days in the ASCO/IDSA abstract, fewer than 500 for more than 7 days in AGIHO.",
    sources: ["ecil-10", "ecil-9-targeted", "agiho-2022", "eha-aml-2022", "paed-afp-2020", "cog-afp-2020", "paed-prophylaxis-2026", "asco-idsa-2018"],
  },
  variants: [
    {
      name: "Fluconazole where mould risk is low",
      differs: "Uses fluconazole, which covers yeasts but not moulds, in units where mould infection is rare, or as part of a strategy with mould-directed diagnostic tests.",
      evidence: "POGO says fluconazole may be appropriate where the mould risk is sufficiently low; ECIL grades fluconazole 400 mg daily B-I in AML only where the incidence of mould infections is low; AGIHO grades fluconazole C, I in high-risk neutropenia.",
      sources: ["paed-afp-2020", "ecil-10", "agiho-2022"],
    },
    {
      name: "Echinocandin rather than azole in children",
      differs: "Uses daily intravenous caspofungin or micafungin rather than an oral azole, accepting the need for intravenous access to avoid azole interactions and liver toxicity.",
      evidence: "POGO strong recommendation for either class (moderate quality); ECIL-10 raised caspofungin to B-I in children after a randomised trial in paediatric allogeneic HSCT found it as effective as triazoles.",
      sources: ["paed-afp-2020", "ecil-10"],
    },
    {
      name: "Haploidentical transplant with post-transplant cyclophosphamide",
      differs: "ECIL treats haploidentical allogeneic HSCT with post-transplant cyclophosphamide as low risk for mould infection before engraftment.",
      evidence: "B-II in the ECIL-10 allogeneic HSCT table.",
      sources: ["ecil-10"],
    },
    {
      name: "Posaconazole tablet or oral suspension",
      differs: "The tablet is given as 300 mg once a day after 300 mg twice on day 1; the oral suspension as 200 mg three times a day.",
      evidence: "ECIL-10 names only the tablet in its AML table and prints both forms in its transplant tables; AGIHO prints the same two doses, calls the tablet readily absorbable, and notes lower suspension levels with gut GVHD, diarrhoea and proton pump inhibitors. ECIL notes the oral suspension is not approved by the EMA for children.",
      sources: ["ecil-10", "agiho-2022"],
    },
    {
      name: "EHA guidance for adults on targeted AML drugs",
      differs: "Makes drug-by-drug recommendations for adults on targeted AML drugs, most of them conditional and based on consensus.",
      evidence: "The EHA summary gives a conditional recommendation for prophylaxis with azacitidine, venetoclax and midostaurin (evidence-based, low certainty), and says the strongest recommendation remains for a mould-active triazole. Only the summary was read.",
      sources: ["eha-aml-2022"],
    },
  ],
  grades: [
    { claim: "Prophylaxis in children with AML expected to have profound and prolonged neutropenia", grade: "Evidence quality: high; Strength of recommendation: strong", source: "paed-afp-2020" },
    { claim: "Prophylaxis in children having allogeneic HSCT pre-engraftment and during GVHD treatment", grade: "Evidence quality: moderate; Strength of recommendation: strong", source: "paed-afp-2020" },
    { claim: "Consider prophylaxis in high-risk ALL in children", grade: "Evidence quality: low; Strength of recommendation: weak", source: "paed-afp-2020", quote: "Consider administering systemic antifungal prophylaxis to children and adolescents with newly diagnosed and relapsed acute lymphoblastic leukemia at high risk for IFD (Evidence quality: low; Strength of recommendation: weak)." },
    { claim: "Use a mould-active agent when prophylaxis is warranted", grade: "Evidence quality: high; Strength of recommendation: strong", source: "paed-afp-2020", quote: "If systemic antifungal prophylaxis is warranted, administer a mold-active agent (Evidence quality: high; Strength of recommendation: strong)." },
    { claim: "No routine amphotericin prophylaxis", grade: "Evidence quality: low; Strength of recommendation: strong", source: "paed-afp-2020", quote: "Do not use amphotericin routinely as systemic antifungal prophylaxis (Evidence quality: low; Strength of recommendation: strong)." },
    { claim: "No routine prophylaxis in children having autologous HSCT", grade: "Evidence quality: low; Strength of recommendation: weak", source: "paed-afp-2020" },
    { claim: "Posaconazole tablets during AML and MDS remission induction", grade: "A-I", source: "ecil-10" },
    { claim: "Systemic antifungal prophylaxis during AML consolidation chemotherapy", grade: "B-IIu", source: "ecil-10", quote: "Systemic antifungal prophylaxis has been given a B-IIu recommendation for AML patient undergoing consolidation chemotherapy." },
    { claim: "Mould-active prophylaxis during the first 4 cycles of azacitidine for MDS", grade: "B-IIu", source: "ecil-10", quote: "The new recommendation for these patients is therefore to use antimold prophylaxis during the first 4 cycles of azacytidine treatment (B-IIu)." },
    { claim: "Voriconazole or posaconazole with vincristine", grade: "D-II", source: "ecil-10" },
    { claim: "Caspofungin as mould-active prophylaxis in children", grade: "B-I", source: "ecil-10", quote: "Hence, the caspofungin grade of recommendation has been updated to a B-I." },
    { claim: "Posaconazole as the drug of choice for antifungal prophylaxis in adults", grade: "AI", source: "agiho-2022", quote: "Due to its efficacy and readily absorbable oral tablet formulation the mould-active posaconazole remains the drug of choice for antifungal prophylaxis (AI)." },
    { claim: "Reduce venetoclax by at least 75% with strong CYP3A4 inhibitors (AGIHO prints AI in the text and A, IIu,t in its table)", grade: "AI", source: "agiho-2022", quote: "The guideline group strongly recommends reducing the dose of venetoclax by at least 75% when administered concomitantly to strong CYP3A4 inhibitors (AI)." },
    { claim: "Voriconazole level below 4.5 mg/L to avoid toxicity", grade: "A, II", source: "agiho-2022" },
    { claim: "Posaconazole level above 0.7 mg/L for prophylaxis (oral suspension B, IIt; tablet or intravenous B, III)", grade: "B, IIt", source: "agiho-2022" },
  ],
  sources: [
    { key: "ecil-10", label: "Primary antifungal prophylaxis in hematological malignancies. Updated clinical practice guidelines by the European Conference on Infections in Leukemia (ECIL-10)", publisher: "European Conference on Infections in Leukaemia, Leukemia", year: 2025, url: "https://europepmc.org/article/PMC/PMC12208874", doi: "10.1038/s41375-025-02586-7", gradingScheme: "ESCMID system: strength A (strongly supports), B (moderately supports), C (marginally supports), D (supports a recommendation against use); quality I (randomised trial), II (non-randomised, cohort or case-control; index r, t, h, u or a for the source), III (expert opinion); printed as, for example, B-II.", read: "full-text", accessed: "2026-11-17" },
    { key: "ecil-9-targeted", label: "Infectious complications of targeted drugs and biotherapies in acute leukemia. Clinical practice guidelines by the European Conference on Infections in Leukemia (ECIL-9)", publisher: "European Conference on Infections in Leukaemia, Leukemia", year: 2022, url: "https://europepmc.org/article/PMC/PMC9061290", doi: "10.1038/s41375-022-01556-7", gradingScheme: "The same ECIL scheme: strength A to D and quality I to III, with an index for level II evidence; printed as, for example, A-IIr.", read: "full-text", accessed: "2026-11-17" },
    { key: "agiho-2022", label: "Primary prophylaxis of invasive fungal diseases in patients with haematological malignancies: 2022 update of the recommendations of the Infectious Diseases Working Party (AGIHO) of the German Society for Haematology and Medical Oncology (DGHO)", publisher: "AGIHO of the DGHO, Journal of Antimicrobial Chemotherapy", year: 2023, url: "https://europepmc.org/article/PMC/PMC10393896", doi: "10.1093/jac/dkad143", gradingScheme: "Strength A (strongly supports use), B (moderate evidence to support use), C (poor evidence to support), D (supports a recommendation against use); quality I to III with an index for level II; printed joined in the text, for example AI or BIIt, and in separate columns in the tables.", read: "full-text", accessed: "2026-11-17" },
    { key: "eha-aml-2022", label: "Antifungal Prophylaxis in Acute Myeloid Leukemia: New Drugs, New Challenges? Summary of the EHA Guideline on Antifungal Prophylaxis in Adult Patients With Acute Myeloid Leukemia Treated With Novel-targeted Therapies", publisher: "European Hematology Association, HemaSphere", year: 2022, url: "https://europepmc.org/article/PMC/PMC9208892", doi: "10.1097/hs9.0000000000000742", gradingScheme: "Each recommendation is labelled evidence-based (with a certainty of evidence) or consensus-based, and as conditional for, conditional against, or either for or against prophylaxis.", read: "public-summary", accessed: "2026-11-17" },
    { key: "paed-afp-2020", label: "Clinical Practice Guideline for Systemic Antifungal Prophylaxis in Pediatric Patients With Cancer and Hematopoietic Stem-Cell Transplantation Recipients", publisher: "Pediatric Oncology Group of Ontario panel (Lehrnbecher et al.), Journal of Clinical Oncology", year: 2020, url: "https://europepmc.org/article/PMC/PMC7499615", doi: "10.1200/jco.20.00158", gradingScheme: "GRADE: evidence quality high to very low and strength strong or weak, printed in brackets after each recommendation.", read: "full-text", accessed: "2026-11-17" },
    { key: "cog-afp-2020", label: "Systemic antifungal prophylaxis in pediatric patients with cancer and HSCT recipients (COG endorsement, version date 31 August 2020)", publisher: "Children's Oncology Group", year: 2020, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_Antifungal_Prophylaxis_Guideline_Document_31AUG2020-new-logo.pdf", gradingScheme: "Reprints the source guideline's GRADE strength and quality.", read: "full-text", accessed: "2026-11-17" },
    { key: "paed-prophylaxis-2026", label: "Clinical Practice Guideline for Systemic Antibacterial and Antifungal Prophylaxis in Pediatric Patients With Cancer and Hematopoietic Cell Transplant Recipients: 2026 Update", publisher: "Pediatric Oncology Group of Ontario panel, Journal of Clinical Oncology", year: 2026, url: "https://europepmc.org/article/MED/42826360", doi: "10.1200/jco-26-00720", read: "abstract", accessed: "2026-11-17" },
    { key: "asco-idsa-2018", label: "Antimicrobial Prophylaxis for Adult Patients With Cancer-Related Immunosuppression: ASCO and IDSA Clinical Practice Guideline Update", publisher: "ASCO and IDSA, Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/article/MED/30179565", doi: "10.1200/JCO.18.00374", read: "abstract", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "The 2026 paediatric update replaces the 2020 guideline, which POGO's own page now lists as archived. On 17 November 2026 the update could be read only as an abstract (ascopubs.org answered 403 with a browser check; Europe PMC holds no full text), so the paediatric steps here quote the 2020 text. The abstract confirms that the strong recommendations for AML, allogeneic HCT and an echinocandin or mould-active azole were maintained; whether the wording or grade of the other 2020 recommendations changed is not known here. The COG page still lists the 2020 endorsement.",
    "ASCO/IDSA 2018 was read only as an abstract; its choice of agent and grades are not given. No newer edition was found in Europe PMC on 17 November 2026.",
    "The NCCN guideline on prevention and treatment of cancer-related infections sits behind a login and was not read, so its position is not given here.",
    "The full EHA guideline (Lancet Haematology 2022) is not open access; only its open summary in HemaSphere was read.",
    "AGIHO's 2022 update excludes transplant recipients, who are covered by a separate AGIHO guideline that was not read.",
    "Drug level targets come from AGIHO alone, which says they are not generally applicable to prophylaxis. ECIL-10 recommends monitoring serum levels in steroid-treated GVHD and prints no target. Doses are given here only as the ECIL-10 and AGIHO tables print them; the product licences were not read.",
    "The guidelines do not agree on the venetoclax dose with an azole (ECIL-9: reduce by 75% with posaconazole; AGIHO: by at least 75%; EHA summary: to 70 mg), and AGIHO calls the exact dose an ongoing debate.",
    "ECIL-10 says knowledge of fungal infection with bispecific antibodies is too limited for any recommendation.",
    "POGO does not define which children with ALL are at high risk and calls for protocol-specific and phase-specific recommendations; ECIL names two groups (aged 12 or older, insufficient treatment response) and prints no grade.",
  ],
  institutions: ["asco"],
  companies: ["childrens-oncology-group"],
  cancers: ["aml", "all-leukemia", "childhood-cancers"],
  drugs: ["posaconazole"],
  technologies: ["allogeneic-hsct", "autologous-stem-cell-transplant", "car-t"],
  terms: ["neutropenia", "lymphoma-tx-pjp-and-infection-prophylaxis"],
  related: ["paediatric-fever-and-neutropenia", "antibacterial-prophylaxis-in-neutropenia", "neutropenic-precautions-and-daily-life", "vincristine", "venetoclax"],
  sections: ["supportive-care"],
  tags: ["protocol", "antimicrobial-prophylaxis", "antifungal", "paediatric"],
});

import { protocol } from "./helpers";

/*
 * Primary antifungal (mould-active) prophylaxis for adults and children at high risk of invasive fungal disease:
 * acute myeloid leukaemia, allogeneic transplant and the other high-risk groups.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ECIL-10, Primary antifungal prophylaxis in hematological malignancies: updated clinical practice guidelines
 *   (Leukemia 2025): open access, full text from Europe PMC (PMC12208874). Table grades are read from the stripped
 *   table text; quotes are taken only from the prose.
 * - Lehrnbecher et al., Clinical Practice Guideline for Systemic Antifungal Prophylaxis in Pediatric Patients With
 *   Cancer and HSCT Recipients (J Clin Oncol 2020): open access, full text from Europe PMC (PMC7499615), with the
 *   Children's Oncology Group endorsement PDF (version date 31 August 2020).
 * - POGO 2026 update of the paediatric antibacterial and antifungal prophylaxis guidelines (J Clin Oncol, published
 *   2 October 2026): abstract only. ascopubs.org returned 403 to a script and Europe PMC holds no full text.
 * - ASCO/IDSA antimicrobial prophylaxis update (Taplitz et al., J Clin Oncol 2018): abstract only.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed.
 */
export const antifungalProphylaxisInHaematology = protocol({
  id: "antifungal-prophylaxis-in-haematology",
  name: "Antifungal prophylaxis for people at high risk of invasive fungal infection",
  aka: ["mould-active prophylaxis", "mold-active prophylaxis", "posaconazole prophylaxis", "primary antifungal prophylaxis", "azole prophylaxis", "invasive aspergillosis prevention"],
  domain: "infection-prevention",
  tldr: "People on the most intensive leukaemia treatment, or a stem cell transplant from a donor, are at risk of serious mould infections in the lungs. Most are offered a preventive antifungal medicine, usually posaconazole, while their immunity is lowest. Other cancer treatments usually do not need one. These drugs interact with many medicines, so the pharmacist checks every combination.",
  simple: "Very strong leukaemia treatment and donor stem cell transplants can let moulds cause lung infections. A preventive antifungal medicine is often given during that time. It can clash with other medicines, so the team checks them.",
  summary: "Give systemic antifungal prophylaxis only to groups at high risk of invasive fungal disease, and make it mould-active. In children (POGO 2020, endorsed by COG; the 2026 update maintains these): strong recommendations for AML expected to cause profound and prolonged neutropenia (high quality) and for allogeneic HSCT pre-engraftment and during systemic immunosuppression for GVHD (moderate); consider it in newly diagnosed or relapsed ALL at high risk (weak, low); do not use it routinely in low-risk ALL or in most lymphomas and solid tumours (strong); not routinely in autologous HSCT (weak). If warranted, use a mould-active agent (strong, high), an echinocandin or a mould-active azole (strong, moderate), and not amphotericin routinely (strong, low). In adults, ECIL-10 (2025) grades posaconazole A-I during remission induction for AML and MDS, gives isavuconazole, micafungin and caspofungin B-II, does not indicate prophylaxis in ALL, Hodgkin lymphoma, myeloma or autologous HSCT, endorses mould-active prophylaxis for high-risk CAR-T recipients, and now counts children with ALL aged 12 or older or with insufficient treatment response as high risk. Mould-active azoles are not recommended with vincristine (D-II). ASCO/IDSA (2018) recommend antifungal prophylaxis for patients expected to have profound, protracted neutropenia.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "pharmacist", "nurse", "patient-or-carer"],
    where: ["ward", "outpatient-clinic", "home"],
  },
  population: "Adults and children with haematological cancers, and recipients of allogeneic or autologous haematopoietic cell transplant or CAR-T cells (ECIL-10 covers adults and children with haematological malignancies; POGO covers children with cancer and HSCT recipients). Most people with solid tumours or lymphoma are low risk and are not covered by a prophylaxis recommendation.",
  trigger: "Treatment is planned that is expected to cause profound and prolonged neutropenia, or an allogeneic transplant, or systemic immunosuppression for graft-versus-host disease.",
  steps: [
    {
      action: "Before each phase, decide whether the person is at high risk of invasive fungal disease, by disease, treatment and expected neutropenia",
      why: "The benefit of prophylaxis grows with the risk; in low-risk people side effects, cost and drug interactions outweigh it.",
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
      action: "Consider it for children with ALL at high risk, including those aged 12 or older and those with an insufficient response to induction",
      why: "Risk in ALL varies by protocol and phase; a large European trial found older children and poor responders were at higher risk, and ECIL now recommends prophylaxis for them.",
      source: "ecil-10",
      quote: "Consequently, older children (≥ 12 years) with ALL and those with insufficient treatment response are identified as being at elevated risk for IFD and are now recommended to receive antifungal prophylaxis.",
    },
    {
      action: "In adults with AML or high-risk MDS having remission induction chemotherapy, give mould-active prophylaxis, with posaconazole the best-supported choice",
      why: "Posaconazole is the only agent ECIL grades A-I in this setting; isavuconazole, micafungin and caspofungin are B-II alternatives.",
      source: "ecil-10",
      quote: "Regarding acute myeloid leukemia (AML) and myelodysplastic syndromes (MDS) patients undergoing remission induction chemotherapy, a B-II grading has been assigned to isavuconazole, micafungin, and caspofungin, based on non-randomized studies that have shown efficacy in preventing invasive fungal diseases (IFD).",
      grade: "posaconazole A-I; isavuconazole, micafungin, caspofungin B-II",
    },
    {
      action: "When prophylaxis is warranted, use a mould-active drug: an echinocandin or a mould-active azole, not routine amphotericin",
      why: "Compared with fluconazole, mould-active drugs reduced fungal infection and deaths from it; amphotericin was no better than fluconazole and caused more side effects.",
      source: "paed-afp-2020",
      quote: "In choosing a mold-active agent, administer an echinocandin or a mold-active azole (Evidence quality: moderate; Strength of recommendation: strong).",
      grade: "Evidence quality: moderate; Strength of recommendation: strong",
    },
    {
      action: "Do not give voriconazole or posaconazole with vincristine; consider isavuconazole with caution or another option",
      why: "These azoles slow the breakdown of vincristine and can cause severe nerve damage.",
      source: "ecil-10",
      quote: "Antifungal prophylaxis with a mold-active triazole, such as voriconazole or posaconazole, is not recommended because of interactions which could increase the toxicity of vincristine (D-II).",
      grade: "D-II",
    },
    {
      action: "Check every other medicine for interactions before starting an azole, including venetoclax and other targeted drugs",
      why: "Azoles raise the levels of many drugs; in its section on chronic lymphocytic leukaemia, ECIL says that with venetoclax prophylaxis should be avoided or used cautiously, adjusting the venetoclax dose and monitoring antifungal levels.",
      source: "ecil-10",
      quote: "In the case of co-administration of venetoclax, antifungal prophylaxis should be avoided or used cautiously because of drug-drug interactions (i.e. adjustment of venetoclax dosing is needed with therapeutic drug monitoring of the antifungal agent)",
    },
    {
      action: "Do not give routine antifungal prophylaxis for autologous transplant, ALL in adults, Hodgkin lymphoma or myeloma",
      why: "The risk of fungal infection in these groups is too low for prophylaxis to help; ECIL suggests fluconazole against Candida in the neutropenic phase of autologous transplant (B-III).",
      source: "ecil-10",
      quote: "Prophylaxis is not indicated in patients treated for myeloproliferative neoplasms (NPM), acute lymphoid leukemia (ALL), and Hodgkin lymphoma (HL).",
    },
    {
      action: "For CAR-T recipients, give mould-active prophylaxis to those at high risk and anti-yeast prophylaxis to those at low risk",
      why: "Fungal infections after CD19 CAR-T run at 1 to 15%, higher with cytokine release syndrome and the steroids used to treat it.",
      source: "ecil-10",
      quote: "The expert panel proposes to endorse the use of anti-mold prophylaxis in high-risk patients during pre-infusion and post-infusion, while in low-risk patients, anti-yeast prophylaxis can be recommended (B-II).",
      grade: "B-II",
    },
    {
      action: "In children, give prophylaxis during observed or expected severe neutropenia, and in allogeneic transplant during immunosuppression for GVHD",
      why: "These are the periods of highest risk; no trial has compared start and stop rules.",
      source: "paed-afp-2020",
      quote: "If systemic antifungal prophylaxis is warranted, consider administration during periods of observed or expected severe neutropenia.",
      grade: "Evidence quality: low; Strength of recommendation: weak",
    },
  ],
  bestInClass: {
    statement: "Prophylaxis targeted to high-risk groups and mould-active. For children, the POGO guideline (2020, endorsed by COG; its 2026 update keeps the strong recommendations for AML and allogeneic HSCT and for an echinocandin or mould-active azole, and adds good practice statements on drug interactions, infection prevention and local epidemiology). For adults and children with haematological cancers, ECIL-10 (2025): posaconazole A-I during AML and MDS induction, isavuconazole, micafungin and caspofungin B-II, and new recommendations for CAR-T and for older or poorly responding children with ALL. The guidelines differ on ALL: ECIL does not indicate prophylaxis for ALL in general but now recommends it for children aged 12 or older or with insufficient response, while POGO makes a weak recommendation to consider it for high-risk ALL without defining the subgroup. They also differ on choice: POGO puts echinocandins and mould-active azoles side by side (echinocandins where hepatotoxicity matters, azoles where oral dosing matters), while ECIL ranks posaconazole highest in AML induction.",
    sources: ["ecil-10", "paed-afp-2020", "cog-afp-2020", "paed-prophylaxis-2026", "asco-idsa-2018"],
  },
  variants: [
    {
      name: "Fluconazole where mould risk is low",
      differs: "Uses fluconazole, which covers yeasts but not moulds, in units where mould infection is rare, or as part of a strategy with mould-directed diagnostic tests.",
      evidence: "POGO says fluconazole may be appropriate where the mould risk is sufficiently low; ECIL grades fluconazole B-I in AML only where the incidence of mould infections is low.",
      sources: ["paed-afp-2020", "ecil-10"],
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
  ],
  grades: [
    { claim: "Prophylaxis in children with AML expected to have profound and prolonged neutropenia", grade: "Evidence quality: high; Strength of recommendation: strong", source: "paed-afp-2020" },
    { claim: "Prophylaxis in children having allogeneic HSCT pre-engraftment and during GVHD treatment", grade: "Evidence quality: moderate; Strength of recommendation: strong", source: "paed-afp-2020" },
    { claim: "Consider prophylaxis in high-risk ALL in children", grade: "Evidence quality: low; Strength of recommendation: weak", source: "paed-afp-2020", quote: "Consider administering systemic antifungal prophylaxis to children and adolescents with newly diagnosed and relapsed acute lymphoblastic leukemia at high risk for IFD (Evidence quality: low; Strength of recommendation: weak)." },
    { claim: "Use a mould-active agent when prophylaxis is warranted", grade: "Evidence quality: high; Strength of recommendation: strong", source: "paed-afp-2020", quote: "If systemic antifungal prophylaxis is warranted, administer a mold-active agent (Evidence quality: high; Strength of recommendation: strong)." },
    { claim: "No routine amphotericin prophylaxis", grade: "Evidence quality: low; Strength of recommendation: strong", source: "paed-afp-2020", quote: "Do not use amphotericin routinely as systemic antifungal prophylaxis (Evidence quality: low; Strength of recommendation: strong)." },
    { claim: "No routine prophylaxis in children having autologous HSCT", grade: "Evidence quality: low; Strength of recommendation: weak", source: "paed-afp-2020" },
    { claim: "Posaconazole tablets during AML and MDS remission induction", grade: "A-I", source: "ecil-10" },
    { claim: "Mould-active azoles with vincristine", grade: "D-II", source: "ecil-10" },
    { claim: "Caspofungin as mould-active prophylaxis in children", grade: "B-I", source: "ecil-10", quote: "Hence, the caspofungin grade of recommendation has been updated to a B-I." },
  ],
  sources: [
    { key: "ecil-10", label: "Primary antifungal prophylaxis in hematological malignancies. Updated clinical practice guidelines by the European Conference on Infections in Leukemia (ECIL-10)", publisher: "European Conference on Infections in Leukaemia, Leukemia", year: 2025, url: "https://europepmc.org/article/PMC/PMC12208874", doi: "10.1038/s41375-025-02586-7", gradingScheme: "ESCMID system: strength A (strongly supports) to D (supports against); quality I (randomised trial), II (non-randomised, cohort or case-control; index r, t, h, u or a for the source), III (expert opinion); printed as, for example, B-II.", read: "full-text", accessed: "2026-11-11" },
    { key: "paed-afp-2020", label: "Clinical Practice Guideline for Systemic Antifungal Prophylaxis in Pediatric Patients With Cancer and Hematopoietic Stem-Cell Transplantation Recipients", publisher: "Pediatric Oncology Group of Ontario panel (Lehrnbecher et al.), Journal of Clinical Oncology", year: 2020, url: "https://europepmc.org/article/PMC/PMC7499615", doi: "10.1200/jco.20.00158", gradingScheme: "GRADE: evidence quality high to very low and strength strong or weak, printed in brackets after each recommendation.", read: "full-text", accessed: "2026-11-11" },
    { key: "cog-afp-2020", label: "Systemic antifungal prophylaxis in pediatric patients with cancer and HSCT recipients (COG endorsement, version date 31 August 2020)", publisher: "Children's Oncology Group", year: 2020, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_Antifungal_Prophylaxis_Guideline_Document_31AUG2020-new-logo.pdf", gradingScheme: "Reprints the source guideline's GRADE strength and quality.", read: "full-text", accessed: "2026-11-11" },
    { key: "paed-prophylaxis-2026", label: "Clinical Practice Guideline for Systemic Antibacterial and Antifungal Prophylaxis in Pediatric Patients With Cancer and Hematopoietic Cell Transplant Recipients: 2026 Update", publisher: "Pediatric Oncology Group of Ontario panel, Journal of Clinical Oncology", year: 2026, url: "https://europepmc.org/article/MED/42826360", doi: "10.1200/jco-26-00720", read: "abstract", accessed: "2026-11-11" },
    { key: "asco-idsa-2018", label: "Antimicrobial Prophylaxis for Adult Patients With Cancer-Related Immunosuppression: ASCO and IDSA Clinical Practice Guideline Update", publisher: "ASCO and IDSA, Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/article/MED/30179565", doi: "10.1200/JCO.18.00374", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The 2026 paediatric update was read only as an abstract; any change in wording or grade beyond what the abstract states is not reflected here, and the COG page still lists the 2020 endorsement.",
    "ASCO/IDSA 2018 was read only as an abstract; its choice of agent and grades are not given.",
    "Doses and therapeutic drug monitoring targets are in the ECIL-10 tables and the product licences; they are not reproduced here.",
    "ECIL-10 says knowledge of fungal infection with bispecific antibodies is too limited for any recommendation.",
    "Neither guideline defines precisely which children with ALL are at high risk; POGO calls for protocol-specific and phase-specific recommendations.",
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

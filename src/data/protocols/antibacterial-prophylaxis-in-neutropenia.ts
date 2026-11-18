import { protocol } from "./helpers";

/*
 * Preventive antibiotics (fluoroquinolone prophylaxis) for people expected to have severe neutropenia, adults and
 * children.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source below was fetched again
 * as raw text with curl (PDFs through pdftotext, XML with tags stripped by script) and every claim re-read against it.
 * - NICE CG151 recommendations page and update information page (HTML, full text), fetched again on 17 November.
 *   Recommendation 1.2.1.1 was updated in January 2020 and September 2024, 1.2.1.2 in September 2024.
 * - NICE CG151 full guideline and evidence review (PDF, September 2012): the copy another checker of this pass saved
 *   from nice.org.uk late on 16 November was re-used. It was not read in the first pass; it holds NICE's evidence
 *   table and reasoning for the prophylaxis recommendation, including a mortality reduction the first pass missed.
 * - Lehrnbecher et al., Guideline for Antibacterial Prophylaxis Administration in Pediatric Cancer and Hematopoietic
 *   Stem Cell Transplantation (Clin Infect Dis 2020): open access, full text from the Europe PMC REST service
 *   (PMC7312235).
 * - Children's Oncology Group endorsement of that guideline (version date 21 July 2020), public PDF, full text; the
 *   COG endorsed-guidelines page still links this document.
 * - AGIHO/DGHO 2020 updated guideline on primary prophylaxis of bacterial infections (Classen et al., Ann Hematol
 *   2021): open access, full text from Europe PMC (PMC8116237). New in this pass.
 * - MHRA Drug Safety Update of 22 January 2024 on fluoroquinolones (gov.uk, HTML, full text). New in this pass.
 * - ECIL critical appraisal of fluoroquinolone prophylaxis (Mikulska et al., J Infect 2018): abstract only, Europe
 *   PMC. New in this pass.
 * - The levofloxacin trial in children (Alexander et al., JAMA 2018): abstract only, through the NCBI E-utilities
 *   record for PMC6143098, which holds no full text. New in this pass.
 * - One UK ciprofloxacin summary of product characteristics (500 mg tablets, Milpharm, text revised 29 May 2026) from
 *   the electronic medicines compendium, full text. New in this pass.
 * - ASCO/IDSA antimicrobial prophylaxis guideline update (Taplitz et al., J Clin Oncol 2018), the 2026 paediatric
 *   update (J Clin Oncol, 2 October 2026) and the 2025 Australian and New Zealand consensus (Intern Med J): abstracts
 *   only, Europe PMC. ascopubs.org answers a script with a browser check and no open copy exists.
 * - Not readable: the NCCN guideline (login required) and the FDA safety communication (the address tried returned 404).
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes were checked by script against
 * the raw text with only line breaks joined and XML tags stripped.
 */
export const antibacterialProphylaxisInNeutropenia = protocol({
  id: "antibacterial-prophylaxis-in-neutropenia",
  name: "Antibacterial (fluoroquinolone) prophylaxis during expected severe neutropenia",
  aka: ["fluoroquinolone prophylaxis", "levofloxacin prophylaxis", "ciprofloxacin prophylaxis", "antibiotic prophylaxis in neutropenia", "neutropenic antibacterial prophylaxis"],
  domain: "infection-prevention",
  tldr: "Some people on intensive chemotherapy, such as for acute leukaemia, are offered an antibiotic while their white cells are lowest. Guidelines disagree on who should have it: NICE offers it to more adults; children's guidelines keep it to the highest risk, as it breeds resistant germs and can have serious side effects. It does not replace ringing the 24-hour cancer line at once if you feel unwell.",
  simple: "During some very strong chemotherapy, doctors may give an antibiotic, usually by mouth, to prevent infection while white cells are very low. It is only for some people, because it can make germs resistant and can have serious side effects. If you feel unwell, with or without a fever, still ring the team at once.",
  summary: "Where prophylaxis is used it is a fluoroquinolone given only for the expected period of neutropenia; the guidelines differ on who gets it and on whether it saves lives. NICE CG151 offers a fluoroquinolone to adults with acute leukaemias, stem cell transplants or solid tumours in whom a neutrophil count of 0.5 × 10⁹/L or lower is anticipated, notes that in September 2024 only ciprofloxacin was licensed for this, points to the MHRA January 2024 restrictions and to guidance on Clostridium difficile, and asks units to monitor resistance; its 2012 evidence review found fewer deaths with quinolones (32 of 1,295 against 57 of 1,286; RR 0.615, 95% CI 0.4 to 0.946; moderate quality). ASCO/IDSA (2018) recommend antibacterial prophylaxis for patients at high risk, including those expected to have profound, protracted neutropenia (under 100 neutrophils/µL for more than 7 days). The German AGIHO guideline (2021) treats expected neutropenia of more than 7 days as high risk and recommends prophylaxis in the first chemotherapy cycle to prevent fever and infection (A-I), downgraded for later cycles (B-I), with ciprofloxacin or levofloxacin as first choice (A-II), stopped when neutropenia ends or treatment antibiotics start (A-IIu). For children, the international paediatric guideline (2020, endorsed by COG) says consider prophylaxis only in AML and relapsed ALL on intensive chemotherapy expected to cause neutrophils under 500/µL for at least 7 days (weak, high quality), not routinely in ALL induction (weak, low quality) or after autologous or allogeneic HSCT (weak, moderate quality), and not at all when severe neutropenia for 7 days is not expected (strong, moderate); levofloxacin is preferred (strong, moderate). In its trial, levofloxacin halved bacteraemia in children with AML or relapsed ALL (21.9% against 43.4% among 195 children), while the panel's pooled analysis of adult and child trials found more fluoroquinolone resistance in bloodstream isolates (RR 3.35, 95% CI 1.12 to 10.03) and no significant fall in overall mortality (RR 0.86, 95% CI 0.62 to 1.17). ECIL (2018) likewise found fewer bloodstream infections and no effect on mortality, and the 2025 Australian and New Zealand consensus concludes that in most circumstances the harms outweigh the benefit.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home"],
  },
  population: "Adults (NICE: 18 or over) with acute leukaemias, stem cell transplants or solid tumours in whom a neutrophil count of 0.5 × 10⁹/L or lower is expected from chemotherapy; children with cancer and child HSCT recipients (the 2020 paediatric guideline; NICE made no recommendation on prophylaxis for children). The MHRA says to avoid fluoroquinolones in anyone who has had a serious reaction to a quinolone and to prescribe with special caution over the age of 60, in renal impairment and after a solid-organ transplant. AGIHO advises against starting a fluoroquinolone in someone known to carry fluoroquinolone-resistant gram-negative bacteria.",
  trigger: "A course of chemotherapy or a transplant is planned that is expected to cause severe neutropenia.",
  steps: [
    {
      action: "Judge how deep and how long the neutropenia is expected to be; do not give prophylaxis to a child whose treatment is not expected to cause neutrophils below 500/µL for at least 7 days",
      why: "When severe neutropenia will be short, the child is exposed to the side effects of prophylaxis without a benefit that matters clinically.",
      source: "paed-abp-2020",
      quote: "Do not use systemic antibacterial prophylaxis for children whose therapy is not expected to result in severe neutropenia (absolute neutrophil count <500/μL) for at least 7 days.",
      grade: "Strong recommendation, moderate-quality evidence",
    },
    {
      action: "In adults expected to have neutrophils of 0.5 × 10⁹/L or lower from chemotherapy for acute leukaemia, a stem cell transplant or a solid tumour, offer a fluoroquinolone during the expected period of neutropenia only (NICE)",
      why: "NICE's guideline group accepted that preventive antibiotics add to resistance and concluded that in people having anticancer treatment the benefits outweigh that risk; other guidelines keep prophylaxis to people at higher risk (see variants).",
      source: "nice-cg151",
      quote: "In September 2024, only ciprofloxacin was licensed for prophylaxis of infections in neutropenic patients.",
    },
    {
      action: "In children, consider prophylaxis only for AML or relapsed ALL on intensive chemotherapy expected to cause neutrophils below 500/µL for at least 7 days",
      why: "In these children levofloxacin halved bloodstream infections, but pooled trials showed more resistance and no fall in overall deaths, so the panel made only a weak recommendation and kept it to the highest-risk group.",
      source: "paed-abp-2020",
      quote: "Consider systemic antibacterial prophylaxis administration in children with AML and relapsed ALL receiving intensive chemotherapy expected to result in severe neutropenia (absolute neutrophil count <500/μL) for at least 7 days.",
      grade: "Weak recommendation, high-quality evidence",
    },
    {
      action: "Do not give routine prophylaxis to children in induction for newly diagnosed ALL",
      why: "Their risk of bloodstream infection without prophylaxis is lower than in AML or relapsed ALL and the benefit in this group is uncertain, while the effect on resistance is more certain.",
      source: "paed-abp-2020",
      quote: "We suggest that systemic antibacterial prophylaxis not be used routinely for children receiving induction chemotherapy for newly diagnosed ALL.",
      grade: "Weak recommendation, low-quality evidence",
    },
    {
      action: "Do not give routine prophylaxis to children having an autologous or allogeneic stem cell transplant",
      why: "In the trial 11.5% of autologous transplant children without prophylaxis had a bloodstream infection, against 43.4% in AML and relapsed ALL, so the smaller benefit was judged not to outweigh the effect on resistance. For autologous transplant the panel added that a unit may still choose prophylaxis if the lower risk allows treatment as an outpatient.",
      source: "paed-abp-2020",
      quote: "We suggest that systemic antibacterial prophylaxis not be used routinely for children undergoing autologous HSCT.",
      grade: "Weak recommendation, moderate-quality evidence (the same grade is printed for allogeneic HSCT)",
    },
    {
      action: "Where prophylaxis is used in children, use levofloxacin",
      why: "Levofloxacin was tested in the large paediatric trial and is more active than ciprofloxacin against gram-positive bacteria such as viridans streptococci. The 2026 update kept this strong recommendation.",
      source: "paed-abp-2020",
      quote: "Levofloxacin is the preferred agent if antibacterial prophylaxis is planned.",
      grade: "Strong recommendation, moderate-quality evidence",
    },
    {
      action: "If a child cannot have levofloxacin, consider giving no antibacterial prophylaxis",
      why: "New in the 2026 update; the 2020 edition had named ciprofloxacin as the alternative, with less activity against streptococci, and had already called no prophylaxis an important option where fluoroquinolones cannot be used.",
      source: "paed-prophylaxis-2026",
      quote: "A new conditional recommendation was introduced to consider using no antibacterial prophylaxis in patients unable to receive levofloxacin.",
      grade: "conditional (as described in the abstract)",
    },
    {
      action: "Tell patients and families about the short- and long-term side effects of fluoroquinolones before starting",
      why: "The panel was concerned about the side effects reported with these drugs, levofloxacin in particular; knowing this, some families choose not to have prophylaxis.",
      source: "paed-abp-2020",
      quote: "Patients and families should be informed about potential short- and long-term fluoroquinolone-related adverse effects prior to administration and this information may lead to some families choosing against prophylaxis.",
    },
    {
      action: "In the UK, follow the MHRA restrictions: advise the person to stop the fluoroquinolone and contact their doctor immediately at the first signs of a serious reaction, take special care over the age of 60, in renal impairment and after a solid-organ transplant, and avoid giving a corticosteroid with it",
      why: "The MHRA says systemic fluoroquinolones can cause disabling side effects of tendons, muscles, joints, nerves and mental health that last months or years and may be irreversible, and that a corticosteroid could worsen tendon damage. NICE points to this advice beside its recommendation.",
      source: "mhra-dsu-2024",
      quote: "as a reminder, patients should be advised to stop fluoroquinolone treatment at the first signs of a serious adverse reaction, such as tendinitis or tendon rupture, muscle pain, muscle weakness, joint pain, joint swelling, peripheral neuropathy and central nervous system effects, and to contact their doctor immediately",
    },
    {
      action: "Give it only during the expected period of severe neutropenia",
      why: "No trial compared different start and stop rules; the trials generally gave it during severe neutropenia, and the panel wanted to keep the time on the antibiotic as short as possible.",
      source: "paed-abp-2020",
      quote: "If antibacterial prophylaxis is planned, we suggest that administration be restricted to the expected period of severe neutropenia (absolute neutrophil count <500/μL).",
      grade: "Weak recommendation, low-quality evidence",
    },
    {
      action: "In high-risk adults, start with the chemotherapy, and stop when neutropenia ends or when treatment with broad-spectrum antibiotics begins (AGIHO)",
      why: "AGIHO gives the reason for stopping as reducing side effects and preventing resistance, and notes this was the rule in the landmark trials. Comparative data on timing are scarce.",
      source: "agiho-2021",
      grade: "B-IIu (start with the cytostatic regimen); A-IIu (stop)",
    },
    {
      action: "If an infection breaks through on a fluoroquinolone, use a different class of antibiotic for the empirical treatment",
      why: "The infection has arisen despite the fluoroquinolone; AGIHO grades using a fluoroquinolone for the empirical treatment of a breakthrough infection as a recommendation against use (D-III).",
      source: "agiho-2021",
      quote: "In case of breakthrough infection during prophylactic administration of FQ, we recommend switching to another drug class for empiric therapy (A-III) (Table 5).",
      grade: "A-III",
    },
    {
      action: "Monitor antibiotic resistance and infection patterns in any unit that uses fluoroquinolone prophylaxis",
      why: "NICE's guideline group recognised that preventive antibiotics contribute to resistance, and NICE points to national guidance on Clostridium difficile beside this recommendation. AGIHO asks for surveillance of fluoroquinolone-resistant bacteria and of C. difficile infection rates.",
      source: "nice-cg151",
      quote: "Rates of antibiotic resistance and infection patterns should be monitored in treatment facilities where patients are having fluoroquinolones for the prophylaxis of neutropenic sepsis.",
    },
    {
      action: "Give written and oral information on neutropenic sepsis and on how and when to contact 24-hour specialist advice; anyone on anticancer treatment who becomes unwell is still assessed for neutropenic sepsis, on prophylaxis or not",
      why: "Infections still happen on prophylaxis. NICE's advice to suspect neutropenic sepsis and refer immediately covers everyone having anticancer treatment; the first-hour protocol covers what happens next.",
      source: "nice-cg151",
      quote: "Suspect neutropenic sepsis in patients having anticancer treatment who become unwell.",
    },
  ],
  bestInClass: {
    statement: "Give a fluoroquinolone only to people expected to have severe, prolonged neutropenia, only for that period, with resistance monitored and the person told about side effects. The guidelines differ on who qualifies. NICE CG151 offers it to adults with acute leukaemia, a stem cell transplant or a solid tumour in whom neutrophils of 0.5 × 10⁹/L or lower are expected, sets no minimum duration and does not grade recommendations; its 2012 evidence review found lower short-term mortality with quinolones (moderate quality). ASCO/IDSA (2018) recommend it for adults at high risk, including profound, protracted neutropenia (under 100/µL for more than 7 days). AGIHO (2021) recommends it for high-risk patients (expected neutropenia of more than 7 days) in the first chemotherapy cycle to prevent fever and infection (A-I), grades its effect on mortality lower (B-II), downgrades later cycles (B-I), and says G-CSF should be preferred where it lowers the risk enough (B-II). The paediatric guideline (2020, endorsed by COG) limits it to AML and relapsed ALL with neutrophils under 500/µL for at least 7 days (weak, high quality) and prefers levofloxacin (strong, moderate); the abstract of its 2026 update says those two recommendations were maintained and adds a conditional recommendation to consider no prophylaxis where levofloxacin cannot be used. ECIL (2018) found fewer bloodstream infections but no effect on mortality and says the benefit should be weighed against toxicity and local resistance. The Australian and New Zealand consensus (2025) concludes that in most circumstances the harms of resistance, side effects and microbiome disruption outweigh a benefit that does not include lower mortality.",
    sources: ["nice-cg151", "nice-cg151-full", "asco-idsa-2018", "agiho-2021", "paed-abp-2020", "paed-prophylaxis-2026", "cog-abp-2020", "ecil-2018", "anz-2025"],
  },
  variants: [
    {
      name: "Broad adult eligibility (NICE CG151)",
      differs: "Offers fluoroquinolone prophylaxis to adults with acute leukaemia, a stem cell transplant or a solid tumour in whom neutrophils of 0.5 × 10⁹/L or lower are anticipated, with no minimum duration of neutropenia. NICE made no recommendation for children, judging there was too little evidence.",
      evidence: "NICE does not grade recommendations. Its 2012 review of ten quinolone trials found fewer deaths (32 of 1,295 against 57 of 1,286; RR 0.615, 95% CI 0.4 to 0.946; moderate quality) and its cost analysis in adults with solid tumours favoured a fluoroquinolone. NICE notes that in September 2024 only ciprofloxacin was licensed for this use and refers to the MHRA January 2024 advice on fluoroquinolone restrictions.",
      sources: ["nice-cg151", "nice-cg151-full"],
    },
    {
      name: "Adults at high risk (ASCO/IDSA 2018)",
      differs: "Recommends antibacterial prophylaxis for patients at high risk of infection, including those expected to have profound, protracted neutropenia, defined as fewer than 100 neutrophils/µL for more than 7 days, or other risk factors.",
      evidence: "Read as an abstract only; the grade and the drug are not given here.",
      sources: ["asco-idsa-2018"],
    },
    {
      name: "By expected duration and chemotherapy cycle (AGIHO 2021)",
      differs: "Counts expected neutropenia of more than 7 days as high risk (A-I). Recommends prophylaxis for high-risk patients in the first chemotherapy cycle to prevent fever and infection (A-I) and downgrades it for later cycles (B-I); in low-risk patients it may be considered in the first cycle (B-I) and is graded C-I after that. Prefers G-CSF where it lowers the risk enough (B-II), prefers fluoroquinolones to co-trimoxazole (A-II), names ciprofloxacin and levofloxacin as first choice (A-II), and advises against a fluoroquinolone where the person is known to carry fluoroquinolone-resistant gram-negative bacteria (D-IIt,u).",
      evidence: "Grades are printed for the effect on each endpoint, not for prophylaxis overall: the guideline calls preventing fever and infection a non-critical goal to be weighed against resistance and side effects, and grades the effect on mortality B-II in high-risk and C-II in low-risk patients. It reviewed the regulators' fluoroquinolone warnings and did not change its recommendation. It prints no fluoroquinolone dose for neutropenia.",
      sources: ["agiho-2021"],
    },
    {
      name: "Weigh benefit against toxicity and local resistance (ECIL 2018)",
      differs: "ECIL had recommended fluoroquinolone prophylaxis for prolonged neutropenia in 2005. Its re-appraisal says the possible benefit on bloodstream infection, but not on overall mortality, should be weighed against toxicity and changes in local ecology in each centre.",
      evidence: "Two randomised trials and 12 observational studies from 2006 to 2014: no effect on mortality (pooled OR 1.01, 95% CI 0.73 to 1.41), fewer bloodstream infections (pooled OR 0.57, 95% CI 0.43 to 0.74). Read as an abstract only; no grade is given there.",
      sources: ["ecil-2018"],
    },
    {
      name: "Harms judged to outweigh benefit in most circumstances (Australia and New Zealand, 2025)",
      differs: "The updated consensus for adults and children concludes that in most circumstances the potential harm of antibiotic resistance, adverse effects and disruption to the microbiome outweighed the benefit of fewer infections, without a benefit in mortality.",
      evidence: "Read as an abstract only; its specific recommendations and grades were not read.",
      sources: ["anz-2025"],
    },
  ],
  grades: [
    { claim: "Consider prophylaxis in children with AML or relapsed ALL with neutrophils under 500/µL for at least 7 days", grade: "Weak recommendation, high-quality evidence", source: "paed-abp-2020" },
    { claim: "No routine prophylaxis in induction for newly diagnosed ALL", grade: "Weak recommendation, low-quality evidence", source: "paed-abp-2020" },
    { claim: "No prophylaxis when severe neutropenia for 7 days is not expected", grade: "Strong recommendation, moderate-quality evidence", source: "paed-abp-2020" },
    { claim: "No routine prophylaxis for children having autologous HSCT", grade: "Weak recommendation, moderate-quality evidence", source: "paed-abp-2020", quote: "We suggest that systemic antibacterial prophylaxis not be used routinely for children undergoing autologous HSCT." },
    { claim: "No routine prophylaxis for children having allogeneic HSCT", grade: "Weak recommendation, moderate-quality evidence", source: "paed-abp-2020", quote: "We suggest that systemic antibacterial prophylaxis not be used routinely for children undergoing allogeneic HSCT." },
    { claim: "Levofloxacin preferred", grade: "Strong recommendation, moderate-quality evidence", source: "paed-abp-2020" },
    { claim: "Effect of levofloxacin on bacteraemia in children with AML and relapsed ALL", grade: "RR 0.50, 95% CI 0.32 to 0.78 (trial result reported by the guideline)", source: "paed-abp-2020", quote: "Levofloxacin prophylaxis significantly reduced bacteremia in this group (RR, .50; 95% CI, .32–.78)." },
    { claim: "The same trial as its authors report it: bacteraemia in 21.9% with levofloxacin against 43.4% without among 195 children with acute leukaemia, and 11.0% against 17.3% among 418 having a transplant", grade: "Risk difference 21.6% (95% CI 8.8% to 34.4%) in acute leukaemia; 6.3% (95% CI 0.3% to 13.0%, not significant) in transplant", source: "alexander-2018" },
    { claim: "Fluoroquinolone against no antibiotic, adult and child trials pooled by the paediatric panel: bacteraemia", grade: "RR 0.56, 95% CI 0.41 to 0.76 (14 studies)", source: "paed-abp-2020" },
    { claim: "Fluoroquinolone against no antibiotic, pooled: overall mortality", grade: "RR 0.86, 95% CI 0.62 to 1.17 (15 studies; not significant)", source: "paed-abp-2020" },
    { claim: "Fluoroquinolone against no antibiotic, pooled: fluoroquinolone resistance in bacteraemia isolates", grade: "RR 3.35, 95% CI 1.12 to 10.03 (4 studies)", source: "paed-abp-2020" },
    { claim: "Fluoroquinolone against no antibiotic, pooled: Clostridioides difficile infection", grade: "RR 0.62, 95% CI 0.31 to 1.24 (3 studies; not significant)", source: "paed-abp-2020" },
    { claim: "NICE evidence review: quinolone prophylaxis and short-term all-cause mortality (10 trials, 32 of 1,295 against 57 of 1,286)", grade: "RR 0.615, 95% CI 0.4 to 0.946; moderate quality (GRADE)", source: "nice-cg151-full", quote: "There was moderate quality evidence that prophylactic quinolones (ciprofloxacin or levofloxacin) reduced short-term all cause mortality when compared with no prophylaxis." },
    { claim: "NICE evidence review: infection with bacteria resistant to the antibiotic used for prophylaxis (15 trials, 74 of 1,680 against 50 of 1,654)", grade: "RR 1.43, 95% CI 1 to 2.03; moderate quality (GRADE)", source: "nice-cg151-full" },
    { claim: "AGIHO: antibacterial prophylaxis in high-risk patients in the first chemotherapy cycle, to prevent fever and infection", grade: "A-I", source: "agiho-2021", quote: "Based on the available evidence and under consideration of the defined risk groups, we recommend using antibacterial prophylaxis in high-risk patients receiving their first chemotherapy cycle if prevention of fever and infection is desired (A-I)." },
    { claim: "AGIHO: the same, to reduce overall mortality", grade: "B-II", source: "agiho-2021", quote: "This strategy may also be effective in reducing overall mortality, but ultimate evidence is lacking (B-II)." },
    { claim: "AGIHO: prophylaxis in later chemotherapy cycles", grade: "B-I in high-risk patients, C-I in low-risk patients", source: "agiho-2021" },
    { claim: "AGIHO: ciprofloxacin and levofloxacin as the fluoroquinolones of first choice", grade: "A-II", source: "agiho-2021", quote: "The FQ ciprofloxacin and levofloxacin have both been evaluated in different studies and are the first-choice agents for antibacterial prophylaxis compared to other FQs (A-II)." },
    { claim: "AGIHO: surveillance of resistance, and of how well prophylaxis works", grade: "A-III for resistance; B-III for efficacy", source: "agiho-2021", quote: "Surveillance of resistance development (A-III) and antibiotic prophylactic efficacy (B-III) should be performed." },
  ],
  sources: [
    { key: "nice-cg151", label: "Neutropenic sepsis: prevention and management in people with cancer (CG151), recommendations", publisher: "NICE", year: 2012, url: "https://www.nice.org.uk/guidance/cg151/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the strength is in the wording ('offer', 'do not offer', 'consider'). Recommendation 1.2.1.1 was updated in January 2020 and September 2024, and 1.2.1.2 in September 2024.", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-cg151-full", label: "Neutropenic sepsis: prevention and management of neutropenic sepsis in cancer patients, full guideline and evidence review", publisher: "NICE (National Collaborating Centre for Cancer)", year: 2012, url: "https://www.nice.org.uk/guidance/cg151/evidence/full-guideline-pdf-188303581", gradingScheme: "Evidence for each question rated with GRADE as high, moderate, low or very low; recommendations themselves are not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "paed-abp-2020", label: "Guideline for Antibacterial Prophylaxis Administration in Pediatric Cancer and Hematopoietic Stem Cell Transplantation", publisher: "Pediatric Oncology Group of Ontario panel (Lehrnbecher et al.), Clinical Infectious Diseases", year: 2020, url: "https://europepmc.org/article/PMC/PMC7312235", doi: "10.1093/cid/ciz1082", gradingScheme: "GRADE: strong or weak recommendation with high, moderate, low or very low quality evidence, printed together.", read: "full-text", accessed: "2026-11-17" },
    { key: "cog-abp-2020", label: "Antibacterial prophylaxis in pediatric cancer and HSCT (COG endorsement, version date 21 July 2020)", publisher: "Children's Oncology Group", year: 2020, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_Antibacterial_Prophylaxis_Guideline_Document_21JULY2020-new-logo.pdf", gradingScheme: "Reprints the source guideline's GRADE strength and quality.", read: "full-text", accessed: "2026-11-17" },
    { key: "agiho-2021", label: "Primary prophylaxis of bacterial infections and Pneumocystis jirovecii pneumonia in patients with hematologic malignancies and solid tumors: 2020 updated guidelines of the Infectious Diseases Working Party of the German Society of Hematology and Medical Oncology (AGIHO/DGHO)", publisher: "AGIHO/DGHO (Classen et al.), Annals of Hematology", year: 2021, url: "https://europepmc.org/article/PMC/PMC8116237", doi: "10.1007/s00277-021-04452-9", gradingScheme: "Strength of recommendation A (strongly supports use), B (moderate), C (marginal) or D (against use); quality of evidence I (randomised trial), II (other clinical studies, with an index letter such as r, t, h, u or a) or III (expert opinion).", read: "full-text", accessed: "2026-11-17" },
    { key: "asco-idsa-2018", label: "Antimicrobial Prophylaxis for Adult Patients With Cancer-Related Immunosuppression: ASCO and IDSA Clinical Practice Guideline Update", publisher: "ASCO and IDSA, Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/article/MED/30179565", doi: "10.1200/JCO.18.00374", read: "abstract", accessed: "2026-11-17" },
    { key: "ecil-2018", label: "Fluoroquinolone prophylaxis in haematological cancer patients with neutropenia: ECIL critical appraisal of previous guidelines", publisher: "European Conference on Infections in Leukemia (Mikulska et al.), Journal of Infection", year: 2018, url: "https://europepmc.org/article/MED/29079323", doi: "10.1016/j.jinf.2017.10.009", read: "abstract", accessed: "2026-11-17" },
    { key: "paed-prophylaxis-2026", label: "Clinical Practice Guideline for Systemic Antibacterial and Antifungal Prophylaxis in Pediatric Patients With Cancer and Hematopoietic Cell Transplant Recipients: 2026 Update", publisher: "Pediatric Oncology Group of Ontario panel, Journal of Clinical Oncology", year: 2026, url: "https://europepmc.org/article/MED/42826360", doi: "10.1200/jco-26-00720", gradingScheme: "GRADE (strong or conditional, with evidence quality), with good practice statements; the individual grades were not read.", read: "abstract", accessed: "2026-11-17" },
    { key: "anz-2025", label: "Consensus guidelines for antibacterial prophylaxis in patients with neutropenia", publisher: "Australasian Neutropenic Fever Guidelines Steering Committee, Internal Medicine Journal", year: 2025, url: "https://europepmc.org/article/MED/41521409", doi: "10.1111/imj.70250", read: "abstract", accessed: "2026-11-17" },
    { key: "mhra-dsu-2024", label: "Fluoroquinolone antibiotics: must now only be prescribed when other commonly recommended antibiotics are inappropriate (Drug Safety Update volume 17, issue 6, published 22 January 2024)", publisher: "Medicines and Healthcare products Regulatory Agency", year: 2024, url: "https://www.gov.uk/drug-safety-update/fluoroquinolone-antibiotics-must-now-only-be-prescribed-when-other-commonly-recommended-antibiotics-are-inappropriate", read: "full-text", accessed: "2026-11-17" },
    { key: "alexander-2018", label: "Effect of Levofloxacin Prophylaxis on Bacteremia in Children With Acute Leukemia or Undergoing Hematopoietic Stem Cell Transplantation: A Randomized Clinical Trial", publisher: "Alexander et al., JAMA", year: 2018, url: "https://europepmc.org/article/MED/30208456", doi: "10.1001/jama.2018.12512", read: "abstract", accessed: "2026-11-17" },
    { key: "ciprofloxacin-smpc-uk", label: "Ciprofloxacin 500mg film-coated tablets, summary of product characteristics (text revised 29 May 2026)", publisher: "Aurobindo Pharma - Milpharm Ltd, electronic medicines compendium", year: 2026, url: "https://www.medicines.org.uk/emc/product/7257/smpc", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "The sources disagree on whether prophylaxis saves lives. NICE's 2012 evidence review, built on a 2005 Cochrane review, found lower short-term mortality with quinolones; AGIHO notes that survival benefits have been shown only in meta-analyses that include studies from different eras; the paediatric panel's pooled analysis found no significant fall in overall or infection-related mortality with a fluoroquinolone (it did find lower infection-related mortality with co-trimoxazole); and the ECIL and Australian and New Zealand abstracts report no mortality benefit.",
    "No guideline read prints a fluoroquinolone dose for prophylaxis in neutropenia: not NICE, the paediatric guideline or AGIHO, and the levofloxacin trial was read as an abstract that does not give its dose. No dose is given on this page for that reason; it comes from the local protocol and the product information.",
    "NICE's note that only ciprofloxacin was licensed for prophylaxis in neutropenic patients is dated September 2024. On 17 November 2026 the one UK ciprofloxacin summary of product characteristics read (500 mg tablets, Milpharm, text revised 29 May 2026) lists the management of neutropenic patients with fever suspected to be due to a bacterial infection and does not list prophylaxis in neutropenia among its indications or in its dose table. Other ciprofloxacin products were not read, so this does not settle the licence.",
    "The ASCO/IDSA 2018 guideline, the ECIL 2018 appraisal and the 2025 Australian and New Zealand consensus were read as abstracts only, so their grades, drug choices and exact eligibility rules are not given here. On 17 November 2026 the publisher of the ASCO/IDSA guideline still answered a script with a browser check.",
    "The NCCN guideline on cancer-related infections sits behind a login and was not read, so its position is not given. The FDA's safety communications on fluoroquinolones could not be read on 17 November 2026 (the address tried returned 404); they appear here only as AGIHO describes them, as warnings of potentially disabling and permanent effects.",
    "The 2026 paediatric update could only be read as an abstract (the publisher refused a script and there is no open full text). The abstract says the recommendations to consider prophylaxis in AML and relapsed ALL and to use levofloxacin were maintained; it does not say whether the 2020 recommendations on ALL induction, transplant, the seven-day threshold and timing were kept, so the steps quoting them rest on the 2020 text. Its three new good practice statements on drug interactions, infection prevention and infection epidemiology are not given in detail, and on 17 November 2026 the COG page still listed the 2020 endorsement.",
    "The AGIHO recommendations were approved by consensus in March 2017 and the literature was checked again to August 2020; no later AGIHO edition on antibacterial prophylaxis was found in Europe PMC on 17 November 2026.",
    "No source read says in so many words that being on prophylaxis leaves the fever pathway unchanged; NICE's recommendations on suspecting and referring neutropenic sepsis apply to everyone having anticancer treatment.",
    "The paediatric panel names as research gaps the value of prophylaxis in ALL induction and other intensive ALL phases, in solid tumours on intensive chemotherapy, and levofloxacin against ciprofloxacin head to head.",
  ],
  institutions: ["nice", "asco"],
  companies: ["childrens-oncology-group"],
  cancers: ["aml", "all-leukemia", "childhood-cancers"],
  drugs: ["levofloxacin", "ciprofloxacin"],
  technologies: ["allogeneic-hsct", "autologous-stem-cell-transplant"],
  terms: ["neutropenia", "febrile-neutropenia"],
  related: ["febrile-neutropenia-first-hour", "paediatric-fever-and-neutropenia"],
  sections: ["supportive-care"],
  tags: ["protocol", "antimicrobial-prophylaxis", "paediatric"],
});

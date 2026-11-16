import { protocol } from "./helpers";

/*
 * Preventive antibiotics (fluoroquinolone prophylaxis) for people expected to have severe neutropenia, adults and
 * children.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - NICE CG151 recommendations page (HTML, full text), including recommendation 1.2.1.1 as updated in September 2024
 *   with the MHRA fluoroquinolone advice.
 * - Lehrnbecher et al., Guideline for Antibacterial Prophylaxis Administration in Pediatric Cancer and Hematopoietic
 *   Stem Cell Transplantation (Clin Infect Dis 2020): open access, full text from Europe PMC (PMC7312235).
 * - Children's Oncology Group endorsement of that guideline (version date 21 July 2020), public PDF, full text. The
 *   COG page lists it as current.
 * - ASCO/IDSA antimicrobial prophylaxis guideline update (Taplitz et al., J Clin Oncol 2018): abstract only, Europe PMC.
 * - POGO 2026 update, Clinical Practice Guideline for Systemic Antibacterial and Antifungal Prophylaxis in Pediatric
 *   Patients With Cancer and HCT Recipients (J Clin Oncol, published 2 October 2026): abstract only, Europe PMC. It
 *   supersedes the 2020 paediatric guideline; ascopubs.org returned 403 to a script and Europe PMC holds no full text,
 *   so the 2020 full text is quoted for recommendations the 2026 abstract says were maintained.
 * - Australian and New Zealand consensus guidelines for antibacterial prophylaxis in neutropenia (Intern Med J 2025):
 *   abstract only, Europe PMC; the full text was not read.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed.
 */
export const antibacterialProphylaxisInNeutropenia = protocol({
  id: "antibacterial-prophylaxis-in-neutropenia",
  name: "Antibacterial (fluoroquinolone) prophylaxis during expected severe neutropenia",
  aka: ["fluoroquinolone prophylaxis", "levofloxacin prophylaxis", "ciprofloxacin prophylaxis", "antibiotic prophylaxis in neutropenia", "neutropenic antibacterial prophylaxis"],
  domain: "infection-prevention",
  tldr: "Some people on intensive chemotherapy, such as for acute leukaemia, are offered an antibiotic tablet while their white cells are lowest,. Guidelines disagree on who should have it: NICE offers it to more adults; children's and Australian guidelines limit it to the highest risk, as it breeds resistant germs. It does not replace calling the team at once with a fever.",
  simple: "During some very strong chemotherapy, doctors may give an antibiotic tablet to prevent infection while white cells are very low. It is only for some people, because it can make germs resistant. If you get a fever, still ring the team at once.",
  summary: "Guidelines agree that prophylaxis is a fluoroquinolone given only for the period of severe neutropenia, and differ on who gets it. NICE CG151 offers fluoroquinolone prophylaxis to adults with acute leukaemias, stem cell transplants or solid tumours in whom a neutrophil count of 0.5 × 10⁹/L or lower is anticipated, noting that only ciprofloxacin was licensed for it in September 2024 and pointing to the MHRA January 2024 restrictions; units using it should monitor resistance. ASCO/IDSA (2018) recommend antibacterial prophylaxis for patients at high risk, including those expected to have profound, protracted neutropenia (under 100 neutrophils/µL for more than 7 days). For children, the international paediatric guideline (2020, endorsed by COG) says consider prophylaxis only in AML and relapsed ALL on intensive chemotherapy expected to cause neutrophils under 500/µL for at least 7 days (weak, high quality), not routinely in ALL induction or after autologous or allogeneic HSCT (weak), and not at all when severe neutropenia for 7 days is not expected (strong, moderate); levofloxacin is preferred (strong, moderate), ciprofloxacin an alternative with weaker gram-positive cover. Prophylaxis halved bacteraemia in children with AML or relapsed ALL but increased resistance and did not reduce overall mortality. The 2025 Australian and New Zealand consensus concludes that in most circumstances the harms outweigh the benefit.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home"],
  },
  population: "Adults (NICE: 18 or over) with acute leukaemias, stem cell transplants or solid tumours in whom significant neutropenia is expected; children with cancer and child HSCT recipients (the 2020 paediatric guideline). People already on a fluoroquinolone and those with fluoroquinolone contraindications need an individual decision.",
  trigger: "A course of chemotherapy or a transplant is planned that is expected to cause severe neutropenia.",
  steps: [
    {
      action: "Before each intensive course, estimate how deep and how long the neutropenia will be",
      why: "Prophylaxis helps only when neutrophils will be very low for long enough; for shorter, milder neutropenia it adds harm without benefit.",
      source: "paed-abp-2020",
      quote: "Do not use systemic antibacterial prophylaxis for children whose therapy is not expected to result in severe neutropenia (absolute neutrophil count <500/μL) for at least 7 days.",
      grade: "Strong recommendation, moderate-quality evidence",
    },
    {
      action: "In adults expected to have neutrophils of 0.5 × 10⁹/L or lower from treatment for acute leukaemia, stem cell transplant or a solid tumour, offer a fluoroquinolone for the expected period of neutropenia (NICE)",
      why: "NICE judged that preventing infections in this group outweighs the costs; other guidelines limit prophylaxis to people at higher risk (see variants).",
      source: "nice-cg151",
    },
    {
      action: "In children, consider prophylaxis only for AML or relapsed ALL on intensive chemotherapy expected to cause neutrophils below 500/µL for at least 7 days",
      why: "In these children prophylaxis halved bloodstream infections, but it also raised resistance and did not lower overall deaths, so the panel kept it to the highest-risk group.",
      source: "paed-abp-2020",
      quote: "Consider systemic antibacterial prophylaxis administration in children with AML and relapsed ALL receiving intensive chemotherapy expected to result in severe neutropenia (absolute neutrophil count <500/μL) for at least 7 days.",
      grade: "Weak recommendation, high-quality evidence",
    },
    {
      action: "Do not give routine prophylaxis to children in induction for newly diagnosed ALL, or to children having autologous or allogeneic stem cell transplant",
      why: "Their baseline risk of bloodstream infection is lower, so the smaller benefit was judged not to outweigh the resistance it causes.",
      source: "paed-abp-2020",
      quote: "We suggest that systemic antibacterial prophylaxis not be used routinely for children receiving induction chemotherapy for newly diagnosed ALL.",
      grade: "Weak recommendation, low-quality evidence",
    },
    {
      action: "Where prophylaxis is used in children, use levofloxacin",
      why: "Levofloxacin was tested in the large paediatric trial and covers the streptococci that ciprofloxacin covers less well. The 2026 update kept this strong recommendation.",
      source: "paed-abp-2020",
      quote: "Levofloxacin is the preferred agent if antibacterial prophylaxis is planned.",
      grade: "Strong recommendation, moderate-quality evidence",
    },
    {
      action: "If a child cannot have levofloxacin, consider giving no antibacterial prophylaxis rather than another drug",
      why: "New in the 2026 update; the 2020 edition had named ciprofloxacin as the alternative, with weaker cover against streptococci.",
      source: "paed-prophylaxis-2026",
      quote: "A new conditional recommendation was introduced to consider using no antibacterial prophylaxis in patients unable to receive levofloxacin.",
      grade: "conditional (as described in the abstract)",
    },
    {
      action: "Tell patients and families about the short- and long-term side effects of fluoroquinolones before starting, and follow the MHRA restrictions",
      why: "Fluoroquinolones can cause disabling and long-lasting side effects, such as tendon damage; knowing this, some families choose not to have prophylaxis.",
      source: "paed-abp-2020",
      quote: "Patients and families should be informed about potential short- and long-term fluoroquinolone-related adverse effects prior to administration and this information may lead to some families choosing against prophylaxis.",
    },
    {
      action: "Give it only during the expected period of severe neutropenia, and stop it when the count recovers",
      why: "Limiting the time on the antibiotic limits resistance and side effects; the trials gave it only during severe neutropenia.",
      source: "paed-abp-2020",
      quote: "If antibacterial prophylaxis is planned, we suggest that administration be restricted to the expected period of severe neutropenia (absolute neutrophil count <500/μL).",
      grade: "Weak recommendation, low-quality evidence",
    },
    {
      action: "Monitor antibiotic resistance and infection patterns in any unit that uses fluoroquinolone prophylaxis",
      why: "Widespread prophylaxis can make the germs that cause infections resistant to the same drugs used to treat them.",
      source: "nice-cg151",
      quote: "Rates of antibiotic resistance and infection patterns should be monitored in treatment facilities where patients are having fluoroquinolones for the prophylaxis of neutropenic sepsis.",
    },
    {
      action: "Tell the patient that prophylaxis does not replace urgent assessment for a fever or feeling unwell",
      why: "Infections still happen on prophylaxis, and the first-hour fever pathway applies in full.",
      practice: "Every guideline read assumes that febrile neutropenia on prophylaxis is managed as an emergency; none states it as a separate recommendation. The first-hour protocol covers it.",
    },
  ],
  bestInClass: {
    statement: "Give a fluoroquinolone only to people expected to have severe, prolonged neutropenia, only for that period, with resistance monitored. The guidelines differ on who qualifies. NICE CG151 offers it to all adults with acute leukaemia, stem cell transplant or a solid tumour in whom neutrophils of 0.5 × 10⁹/L or lower are expected, and does not grade recommendations. ASCO/IDSA (2018) limit it to adults at high risk, including profound, protracted neutropenia (under 100/µL for more than 7 days). The paediatric guideline (2020, endorsed by COG; its 2026 update maintains these recommendations and adds a conditional recommendation to consider no prophylaxis where levofloxacin cannot be used) limits it to AML and relapsed ALL with neutrophils under 500/µL for at least 7 days (weak, high quality) and prefers levofloxacin (strong, moderate). The Australian and New Zealand consensus (2025) concludes that in most circumstances the harms of resistance, side effects and microbiome disruption outweigh a benefit that does not include lower mortality.",
    sources: ["nice-cg151", "asco-idsa-2018", "paed-abp-2020", "paed-prophylaxis-2026", "cog-abp-2020", "anz-2025"],
  },
  variants: [
    {
      name: "Broad adult eligibility (NICE CG151)",
      differs: "Offers fluoroquinolone prophylaxis to any adult with acute leukaemia, stem cell transplant or a solid tumour in whom neutrophils of 0.5 × 10⁹/L or lower are anticipated, including solid tumour chemotherapy, rather than only profound and protracted neutropenia.",
      evidence: "NICE does not grade recommendations. It notes that in September 2024 only ciprofloxacin was licensed for this use and refers to the MHRA January 2024 advice on fluoroquinolone restrictions.",
      sources: ["nice-cg151"],
    },
    {
      name: "High-risk adults only (ASCO/IDSA 2018)",
      differs: "Recommends antibacterial prophylaxis for patients at high risk of infection, including those expected to have profound, protracted neutropenia, defined as fewer than 100 neutrophils/µL for more than 7 days, or other risk factors.",
      evidence: "Read as an abstract only; the grade is not given here.",
      sources: ["asco-idsa-2018"],
    },
    {
      name: "Against routine prophylaxis in most circumstances (Australia and New Zealand, 2025)",
      differs: "The updated consensus for adults and children concludes that the potential harm of resistance, adverse effects and microbiome disruption outweighs the reduction in infection in most circumstances, given no mortality benefit and better sepsis pathways.",
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
  ],
  sources: [
    { key: "nice-cg151", label: "Neutropenic sepsis: prevention and management in people with cancer (CG151), recommendations", publisher: "NICE", year: 2012, url: "https://www.nice.org.uk/guidance/cg151/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the strength is in the wording ('offer', 'do not offer', 'consider'). Recommendation 1.2.1.1 was updated in January 2020 and September 2024.", read: "full-text", accessed: "2026-11-11" },
    { key: "paed-abp-2020", label: "Guideline for Antibacterial Prophylaxis Administration in Pediatric Cancer and Hematopoietic Stem Cell Transplantation", publisher: "Pediatric Oncology Group of Ontario panel (Lehrnbecher et al.), Clinical Infectious Diseases", year: 2020, url: "https://europepmc.org/article/PMC/PMC7312235", doi: "10.1093/cid/ciz1082", gradingScheme: "GRADE: strong or weak recommendation with high, moderate, low or very low quality evidence, printed together.", read: "full-text", accessed: "2026-11-11" },
    { key: "cog-abp-2020", label: "Antibacterial prophylaxis in pediatric cancer and HSCT (COG endorsement, version date 21 July 2020)", publisher: "Children's Oncology Group", year: 2020, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_Antibacterial_Prophylaxis_Guideline_Document_21JULY2020-new-logo.pdf", gradingScheme: "Reprints the source guideline's GRADE strength and quality.", read: "full-text", accessed: "2026-11-11" },
    { key: "asco-idsa-2018", label: "Antimicrobial Prophylaxis for Adult Patients With Cancer-Related Immunosuppression: ASCO and IDSA Clinical Practice Guideline Update", publisher: "ASCO and IDSA, Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/article/MED/30179565", doi: "10.1200/JCO.18.00374", read: "abstract", accessed: "2026-11-11" },
    { key: "paed-prophylaxis-2026", label: "Clinical Practice Guideline for Systemic Antibacterial and Antifungal Prophylaxis in Pediatric Patients With Cancer and Hematopoietic Cell Transplant Recipients: 2026 Update", publisher: "Pediatric Oncology Group of Ontario panel, Journal of Clinical Oncology", year: 2026, url: "https://europepmc.org/article/MED/42826360", doi: "10.1200/jco-26-00720", gradingScheme: "GRADE (strong or conditional, with evidence quality), with good practice statements; the individual grades were not read.", read: "abstract", accessed: "2026-11-11" },
    { key: "anz-2025", label: "Consensus guidelines for antibacterial prophylaxis in patients with neutropenia", publisher: "Internal Medicine Journal (Australian and New Zealand consensus)", year: 2025, url: "https://europepmc.org/article/MED/41521409", doi: "10.1111/imj.70250", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The ASCO/IDSA 2018 guideline and the 2025 Australian and New Zealand consensus were read as abstracts only, so their grades, drug choices and exact eligibility rules are not given here.",
    "No guideline read reports a mortality benefit from antibacterial prophylaxis; the paediatric synthesis found none.",
    "ECIL guidance on fluoroquinolone prophylaxis in adult haematology was not read for this protocol.",
    "The 2026 paediatric update could only be read as an abstract (the publisher refused a script and there is no open full text); its three new good practice statements on drug interactions, infection prevention and infection epidemiology are not given in detail, and the COG page still lists the 2020 endorsement.",
    "The paediatric panel names as research gaps the value of prophylaxis in ALL induction and other intensive ALL phases, in solid tumours on intensive chemotherapy, and levofloxacin against ciprofloxacin head to head.",
    "The dose and duration of fluoroquinolone used come from local protocols and the product licence, which were not read here.",
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

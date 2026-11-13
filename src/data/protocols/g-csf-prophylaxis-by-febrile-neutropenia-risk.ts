import { protocol } from "./helpers";

/*
 * Primary and secondary prophylaxis with granulocyte colony-stimulating factor (G-CSF) by the risk of febrile
 * neutropenia.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl or the Europe PMC REST API into a scratch
 * directory and read as text):
 * - NICE CG151, Neutropenic sepsis (published September 2012, recommendations 1.2.1.1 and 1.2.1.2 updated 2020 and
 *   2024), recommendations page (HTML, full text), recommendation 1.2.1.3 on G-CSF.
 * - ASCO WBC growth factors guideline update (Smith et al., J Clin Oncol 2015): abstract only, from Europe PMC.
 * - EORTC 2010 G-CSF guideline update (Aapro et al., Eur J Cancer 2011): abstract only, from Europe PMC.
 * - AGIHO/DGHO evidence-based G-CSF guideline update (Eur J Cancer 2026): abstract only, from Europe PMC; its
 *   recommendations and grades are not in the abstract.
 * - NCCN Guidelines Insights, Hematopoietic Growth Factors version 1.2022: abstract read from Europe PMC; jnccn.org
 *   returned 403. ESMO 2016 febrile neutropenia guideline: not reachable (see the febrile neutropenia protocol).
 * No ASCO growth factor update after 2015 was found in Europe PMC. Every DOI was resolved through Europe PMC and its
 * title checked. Quotes are copied from the raw text with nothing changed.
 */
export const gCsfProphylaxisByFebrileNeutropeniaRisk = protocol({
  id: "g-csf-prophylaxis-by-febrile-neutropenia-risk",
  name: "G-CSF prophylaxis by febrile neutropenia risk",
  aka: ["primary G-CSF prophylaxis", "secondary G-CSF prophylaxis", "pegfilgrastim after chemotherapy", "filgrastim injections", "white cell growth factor injections"],
  domain: "supportive-care",
  tldr: "Some chemotherapy lowers the white cells that fight infection so much that a fever becomes dangerous. If your treatment carries a high risk of this, or you had an infection with low white cells on an earlier cycle, you may be given injections of a growth factor (G-CSF) after each cycle to help your white cells recover faster.",
  simple: "Some chemotherapy lowers the cells that fight germs. A small injection after treatment can help these cells come back faster. It is given to people at high risk.",
  summary: "Primary prophylaxis with G-CSF is warranted when the regimen's risk of febrile neutropenia is about 20 per cent or higher and no equally effective and safe regimen without it exists (ASCO 2015; EORTC 2010 likewise for regimens at high risk, 20 per cent or more). For regimens with a risk of 10 to 20 per cent, patient factors such as age 65 or over decide (EORTC), and ASCO recommends prophylaxis for those at high risk from age, medical history, disease and the myelotoxicity of the regimen. After an episode of febrile neutropenia, G-CSF should be given in later cycles (secondary prophylaxis, EORTC). G-CSF is also used where it is part of a dose-dense or dose-intense regimen with proven benefit, or to keep dose intensity where cutting the dose worsens the outlook.\n\nNICE CG151 frames the same rule from the other side: do not routinely offer G-CSF to prevent neutropenic sepsis unless it is an integral part of the regimen or needed to maintain dose intensity. Filgrastim (including biosimilars), lenograstim and pegfilgrastim are all effective (EORTC); pegfilgrastim is given once per cycle, which may avoid the short courses of daily injections seen in audits. ASCO advises dose-dense regimens needing G-CSF only in trials or where efficacy data are convincing. The AGIHO 2026 update confirms most of its 2014 recommendations and adds guidance for immunotherapy settings.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "pharmacist", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "home"],
  },
  population: "Adults having chemotherapy for solid tumours or lymphoproliferative cancers. Acute myeloid leukaemia, myelodysplastic syndromes, stem cell mobilisation and children are outside the scope of the guidelines read (ASCO 2015 did not address AML or MDS).",
  trigger: "A chemotherapy regimen is planned, and again before each cycle.",
  steps: [
    {
      action: "Before the first cycle, estimate the regimen's risk of febrile neutropenia: high (20 per cent or more), intermediate (10 to 20 per cent) or low",
      why: "The regimen's own risk is the starting point for deciding whether G-CSF is needed.",
      source: "eortc-2010",
      quote: "We provide an expanded list of common chemotherapy regimens considered to have a high (≥20%) or intermediate (10-20%) risk of FN.",
    },
    {
      action: "Add the person's own risk factors, such as age 65 or over and the neutrophil count, and reassess before every cycle",
      why: "The same regimen is riskier in an older or frailer person, and risk changes from cycle to cycle.",
      source: "eortc-2010",
      quote: "We recommend that patient-related adverse risk factors, such as elderly age (≥65 years) and neutrophil count be evaluated in the overall assessment of FN risk before administering each cycle of chemotherapy.",
    },
    {
      action: "Give G-CSF from the first cycle when the overall risk is about 20 per cent or more and no equally effective regimen without it is available",
      why: "ASCO and EORTC set this as the level of risk at which preventing infection is worth the injections.",
      source: "asco-2015",
      quote: "Prophylactic use of CSFs to reduce the risk of febrile neutropenia is warranted when the risk of febrile neutropenia is approximately 20% or higher and no other equally effective and safe regimen that does not require CSFs is available.",
    },
    {
      action: "For an intermediate-risk regimen, give G-CSF when the person's risk factors raise the overall risk",
      why: "A 10 to 20 per cent regimen becomes high risk in, for example, an older person or someone with other illnesses.",
      source: "eortc-2010",
      quote: "When using a chemotherapy regimen associated with FN in 10-20% of patients, particular attention should be given to patient-related risk factors that may increase the overall risk of FN.",
    },
    {
      action: "After an episode of febrile neutropenia, give G-CSF in the following cycles",
      why: "A person who has had one episode is likely to have another on the same treatment, and it avoids cutting or delaying the dose.",
      source: "eortc-2010",
      quote: "It is important that after a previous episode of FN, patients receive prophylactic administration of G-CSF in subsequent cycles.",
    },
    {
      action: "Do not give G-CSF routinely to everyone on chemotherapy; give it where it is part of the regimen or needed to keep the dose",
      why: "For most regimens the risk is too low for routine injections to help.",
      source: "nice-cg151",
      quote: "Do not routinely offer G-CSF for the prevention of neutropenic sepsis in adults receiving chemotherapy unless they are receiving G-CSF as an integral part of the chemotherapy regimen or in order to maintain dose intensity.",
    },
    {
      action: "Choose filgrastim (or a biosimilar), lenograstim or pegfilgrastim; give the full course",
      why: "All work; pegfilgrastim is one injection a cycle, which avoids courses of daily injections being stopped too early.",
      source: "eortc-2010",
      quote: "Clinical evidence shows that filgrastim, lenograstim and pegfilgrastim have clinical efficacy and we recommend the use of any of these agents to prevent FN and FN-related complications where indicated.",
    },
    {
      action: "Use dose-dense regimens that depend on G-CSF only where they have proven benefit or in a trial",
      why: "Giving chemotherapy closer together is only worth its toxicity where it improves survival.",
      source: "asco-2015",
      quote: "Dose-dense regimens that require CSFs should only be used within an appropriately designed clinical trial or if supported by convincing efficacy data.",
    },
  ],
  bestInClass: {
    statement: "ASCO (2015) and EORTC (2010) agree on the threshold: primary prophylaxis when the risk of febrile neutropenia is about 20 per cent or more, with patient factors deciding for regimens at 10 to 20 per cent, and secondary prophylaxis after an episode. NICE CG151 states the rule negatively (no routine G-CSF unless integral to the regimen or to maintain dose intensity) and recommends fluoroquinolone prophylaxis instead for adults expected to have severe neutropenia. The AGIHO 2026 update is the most recent guideline and says it confirms most of its 2014 recommendations; its grades were not read. All the international sources read in full or abstract are 2010 to 2015 apart from AGIHO, and NCCN's current version could not be read.",
    sources: ["asco-2015", "eortc-2010", "nice-cg151", "agiho-2026", "nccn-2022"],
  },
  variants: [
    {
      name: "Antibiotic prophylaxis rather than G-CSF (NICE CG151)",
      differs: "NICE offers a fluoroquinolone during the expected period of neutropenia to adults with acute leukaemias, stem cell transplants or solid tumours in whom a neutrophil count of 0.5 × 10⁹ per litre or lower is expected from chemotherapy, points to the MHRA January 2024 advice on fluoroquinolone risks, and does not offer G-CSF routinely.",
      evidence: "NICE recommendations are not graded; the G-CSF recommendation dates from 2012.",
      sources: ["nice-cg151"],
    },
    {
      name: "G-CSF guidance for immunotherapy settings (AGIHO 2026)",
      differs: "Adds recommendations on G-CSF in immunotherapy settings and new G-CSF formulations, alongside the 2014 recommendations it confirms.",
      evidence: "Levels of evidence and strengths of recommendation set by ESCMID criteria after a literature search to December 2024; read as an abstract only, so the recommendations themselves are not given here.",
      sources: ["agiho-2026"],
    },
  ],
  grades: [],
  sources: [
    { key: "nice-cg151", label: "Neutropenic sepsis: prevention and management in people with cancer (CG151), recommendations", publisher: "NICE", year: 2012, url: "https://www.nice.org.uk/guidance/cg151/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the strength is in the wording ('offer', 'do not routinely offer').", read: "full-text", accessed: "2026-11-11" },
    { key: "asco-2015", label: "Recommendations for the Use of WBC Growth Factors: ASCO Clinical Practice Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2015, url: "https://europepmc.org/abstract/MED/26169616", doi: "10.1200/JCO.2015.62.3488", read: "abstract", accessed: "2026-11-11" },
    { key: "eortc-2010", label: "2010 update of EORTC guidelines for the use of granulocyte-colony stimulating factor to reduce the incidence of chemotherapy-induced febrile neutropenia in adult patients with lymphoproliferative disorders and solid tumours", publisher: "EORTC, European Journal of Cancer", year: 2011, url: "https://europepmc.org/abstract/MED/21095116", doi: "10.1016/j.ejca.2010.10.013", read: "abstract", accessed: "2026-11-11" },
    { key: "agiho-2026", label: "Evidence-based AGIHO guideline update on prophylaxis of infectious complications with granulocyte-stimulating factors (G-CSF) for the treatment of adult patients with cancer", publisher: "AGIHO of the German Society of Hematology and Medical Oncology (DGHO), European Journal of Cancer", year: 2026, url: "https://europepmc.org/abstract/MED/41570611", doi: "10.1016/j.ejca.2026.116244", gradingScheme: "ESCMID criteria for level of evidence and strength of recommendation (not read).", read: "abstract", accessed: "2026-11-11" },
    { key: "nccn-2022", label: "NCCN Guidelines Insights: Hematopoietic Growth Factors, Version 1.2022", publisher: "NCCN, Journal of the National Comprehensive Cancer Network", year: 2022, url: "https://europepmc.org/abstract/MED/35545171", doi: "10.6004/jnccn.2022.0026", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "Every source except NICE was read only as an abstract, so their grades, their lists of high-risk regimens and their advice on timing (for example how soon after chemotherapy to start) are not given here.",
    "The AGIHO 2026 update is the most recent guideline found; its individual recommendations and grades were not in the abstract.",
    "NCCN's current Hematopoietic Growth Factors guideline requires a login and its 2022 Insights paper returned 403; ESMO's 2016 febrile neutropenia guideline could not be read.",
    "No source read gives a list of which regimens fall above 20 per cent; EORTC 2010 publishes one, which was not read.",
    "The sources read do not cover G-CSF with immunotherapy combinations, where AGIHO 2026 says it adds guidance.",
  ],
  institutions: ["nice", "asco"],
  technologies: ["g-csf-growth-factors"],
  drugs: ["filgrastim", "pegfilgrastim", "lenograstim"],
  terms: ["febrile-neutropenia", "neutropenia"],
  related: ["febrile-neutropenia-first-hour"],
  sections: ["supportive-care"],
  tags: ["protocol", "neutropenia", "supportive-care"],
});

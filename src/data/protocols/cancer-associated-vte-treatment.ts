import { protocol } from "./helpers";

/*
 * Treating an established blood clot (deep vein thrombosis or pulmonary embolism) in a person with active cancer: which
 * anticoagulant, for how long, and in the situations where the usual choice changes.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - ITAC 2022 international clinical practice guidelines (Farge et al., Lancet Oncol 2022, PMC9236567): full text from
 *   the PMC XML. Endorsed by the ISTH. Grades quoted as printed (GRADE 1A to 2D, or "guidance").
 * - ASCO guideline update on VTE prophylaxis and treatment in patients with cancer (Key et al., J Clin Oncol 2023): full
 *   text of the update, read from the Internet Archive's capture of ascopubs.org/doi/10.1200/JCO.23.00294 (11 July 2025),
 *   the publisher refusing a script. The update revised recommendations 3.7, 4.1 and 4.2 only; the rest of the 2019
 *   guideline stands and was not read.
 * - NICE NG158, Venous thromboembolic diseases: diagnosis, management and thrombophilia testing (published 26 March
 *   2020, last updated 2 August 2023): recommendations and rationale, HTML full text.
 * - ASH 2021 guidelines on VTE in patients with cancer (Lyman et al., Blood Adv 2021): abstract only.
 * - ESMO Clinical Practice Guideline on VTE in cancer patients (Falanga et al., Ann Oncol 2023): not reachable. The
 *   publisher returned 403 to a script, no archived copy was found and Europe PMC holds no abstract. Named, not used.
 *
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text with
 * line breaks joined; figures whose superscripts the raw text mangles (platelet counts) are left out of quotes and
 * stated in the prose.
 */
export const cancerAssociatedVteTreatment = protocol({
  id: "cancer-associated-vte-treatment",
  name: "Anticoagulation for a blood clot in a person with cancer: choice of drug, duration and special situations",
  aka: ["cancer-associated thrombosis treatment", "CAT treatment", "DVT in cancer", "pulmonary embolism in cancer", "DOAC or LMWH in cancer", "apixaban for cancer clot", "dalteparin", "anticoagulation duration cancer"],
  domain: "supportive-care",
  tldr: "Clots in a leg vein or the lungs are common in cancer. They are treated with blood thinners, either daily injections (low-molecular-weight heparin) or tablets (such as apixaban, rivaroxaban or edoxaban), usually for at least six months and often while the cancer is active. Tablets suit most people, but injections may be safer with some stomach, bowel or bladder cancers and some cancer drugs.",
  simple: "A clot in someone with cancer is treated with blood thinners, as injections or tablets, usually for six months or more. Your team picks the one that is safest with your cancer and your other medicines.",
  summary: "ITAC (2022) recommends LMWH for initial treatment when creatinine clearance is at least 30 mL/min (1A), or rivaroxaban or apixaban from the start, or edoxaban after at least 5 days of parenteral anticoagulation, in patients not at high risk of gastrointestinal or genitourinary bleeding (1A). For maintenance, LMWH is preferred over vitamin K antagonists (1A) and DOACs are recommended in the absence of strong drug interactions or impaired gastrointestinal absorption (1A), with caution in gastrointestinal, especially upper gastrointestinal, cancers. Treat for at least 6 months (1A); after 6 months, continue or stop by individual assessment of benefit and risk and cancer activity (guidance). ASCO (2023) is concordant: LMWH, edoxaban, rivaroxaban or apixaban for at least 6 months, preferred over VKAs (strong, high-quality evidence), noting less recurrence but more clinically relevant non-major bleeding with factor Xa inhibitors and checking drug interactions first.\n\nNICE NG158 (2020) differs on emphasis and duration: it suggests considering a DOAC first and, if unsuitable, LMWH alone or with a VKA, and gives 3 to 6 months then review, saying evidence on duration in active cancer is very limited. ASH (2021, abstract) makes conditional recommendations for LMWH or DOAC initially, a DOAC for short-term treatment and LMWH or DOAC long term. ITAC treats incidental clots like symptomatic ones. For special situations ITAC gives guidance, not graded evidence: full-dose anticoagulation if platelets are above 50 x 10^9/L without bleeding, case-by-case below that; unfractionated heparin then early VKA, or anti-Xa-adjusted LMWH, when creatinine clearance is below 30 mL/min; LMWH or DOAC with a brain tumour (2A); LMWH in pregnancy. For recurrence on treatment, increase LMWH by 20 to 25% or switch class (guidance). Vena cava filters only when anticoagulation is contraindicated or a PE recurs despite optimal treatment (guidance).",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "pharmacist", "nurse"],
    where: ["acute-oncology-service", "emergency-department", "ward", "outpatient-clinic"],
  },
  population: "Adults with active cancer and a confirmed deep vein thrombosis or pulmonary embolism, symptomatic or found incidentally on a scan. Clots related to a central venous catheter have their own protocol. Children follow paediatric guidance; ITAC gives separate recommendations for children with central lines. NICE's recommendations for active cancer apply to proximal DVT or PE.",
  trigger: "A deep vein thrombosis or pulmonary embolism is confirmed in a person with active cancer.",
  steps: [
    {
      action: "Start anticoagulation with low-molecular-weight heparin, or with rivaroxaban or apixaban from day one, if kidney function allows (creatinine clearance 30 mL/min or more)",
      why: "Both injections and tablets prevent the clot growing or coming back; the choice depends on the person's bleeding risk, cancer and other medicines.",
      source: "itac-2022",
      quote: "Low-molecular-weight heparin (LMWH) is recommended for the initial treatment of established VTE in patients with cancer when creatinine clearance is ≥30 mL/min (grade 1A).",
      grade: "1A",
    },
    {
      action: "Use a tablet (DOAC) only where the risk of gut or bladder bleeding is not high; edoxaban needs at least 5 days of injections first",
      why: "In trials, the tablets caused more bleeding from tumours of the stomach, bowel and urinary tract.",
      source: "itac-2022",
      quote: "For patients who do not have a high risk of gastrointestinal or genitourinary bleeding, rivaroxaban or apixaban (in the first 10 days), or edoxaban (started after at least 5 days of parenteral anticoagulation) can also be used for the initial treatment of established VTE in patients with cancer when creatinine clearance is ≥30 mL/min (grade 1A).",
      grade: "1A",
    },
    {
      action: "Before choosing, take into account the tumour site, interactions with cancer drugs, and the person's bleeding risk",
      why: "Some cancer drugs change blood levels of the tablets, and some tumours bleed easily.",
      source: "nice-ng158",
      quote: "When choosing anticoagulation treatment for people with active cancer and confirmed proximal DVT or PE, take into account the tumour site, interactions with other drugs including those used to treat cancer, and the person's bleeding risk.",
      grade: "[2020]",
    },
    {
      action: "Check for drug interactions before starting a factor Xa inhibitor tablet",
      why: "Interactions with cancer treatments can make the tablet too strong (bleeding) or too weak (new clots).",
      source: "asco-2023",
      quote: "Drug-drug interaction should be checked before using a direct factor Xa inhibitor (Type: Evidence based; Evidence quality: High; Strength of recommendation: Strong).",
      grade: "Evidence based; Evidence quality: High; Strength of recommendation: Strong",
    },
    {
      action: "Treat for at least 6 months, with low-molecular-weight heparin or a DOAC rather than warfarin",
      why: "Clots often come back in people with active cancer; six months was the length tested in the trials.",
      source: "itac-2022",
      quote: "LMWH or direct oral anticoagulants should be used for a minimum of 6 months to treat established VTE in patients with cancer (grade 1A).",
      grade: "1A",
    },
    {
      action: "At 6 months, decide with the patient whether to continue, based on cancer activity, bleeding, tolerability and preference",
      why: "The risk of another clot stays high while the cancer is active, but so does the risk of bleeding.",
      source: "itac-2022",
      quote: "After 6 months, termination or continuation of anticoagulation (LMWH, direct oral anticoagulants, or vitamin K antagonists) should be based on individual evaluation of the benefit–risk ratio, tolerability, drug availability, patient preference, and cancer activity (guidance, in the absence of data).",
      grade: "guidance",
    },
    {
      action: "Treat a clot found incidentally on a staging scan the same way as one that causes symptoms",
      why: "Clots found by chance carried the same risks as symptomatic ones in the trials.",
      source: "itac-2022",
      quote: "These findings further support managing patients with incidental cancer-associated thrombosis in a similar manner as symptomatic cancer-associated thrombosis.",
    },
    {
      action: "If platelets are low, give full-dose anticoagulation only above a platelet count of 50 x 10^9/L without bleeding; below that, decide case by case with great caution",
      why: "Chemotherapy can lower platelets, and anticoagulation with very low platelets risks serious bleeding.",
      source: "itac-2022",
      quote: "decisions on treatment and dose should be made on a case-by-case basis with the utmost caution (guidance, in the absence of data and a balance between desirable and undesirable effects depending on the bleeding risk vs VTE risk).",
      grade: "guidance",
    },
    {
      action: "If creatinine clearance is below 30 mL/min, use unfractionated heparin followed by early warfarin, or LMWH adjusted by anti-Xa levels",
      why: "LMWH and the tablets build up when the kidneys are failing.",
      source: "itac-2022",
      quote: "In the presence of severe renal failure (creatinine clearance <30 mL/min), we suggest using unfractionated heparin followed by early vitamin K antagonists (possible from day 1) or LMWH adjusted to anti-Xa concentration for the treatment of established VTE (guidance, in the absence of data and an unknown balance between desirable and undesirable effects).",
      grade: "guidance",
    },
    {
      action: "If a clot recurs despite treatment, increase LMWH by 20 to 25%, or switch between LMWH and a DOAC",
      why: "A clot that recurs on treatment may need a stronger dose or a different drug.",
      source: "itac-2022",
      quote: "In the event of VTE recurrence, three options can be considered: (1) increase LMWH by 20–25% or switch to direct oral anticoagulants; (2) for direct oral anticoagulants, switch to LMWH; and (3) for vitamin K antagonist, switch to LMWH or direct oral anticoagulants (guidance, based on evidence of very low quality and an unknown balance between desirable and undesirable effects).",
      grade: "guidance",
    },
    {
      action: "Consider a vena cava filter only if anticoagulation cannot be given, or a pulmonary embolism recurs despite optimal treatment, and restart anticoagulation when safe",
      why: "A filter can stop clots reaching the lungs but does not treat the clot and can cause its own problems.",
      source: "itac-2022",
      quote: "In the initial treatment of VTE, inferior vena cava filters might be considered when anticoagulant treatment is contraindicated or, in the case of pulmonary embolism, when recurrence occurs under optimal anticoagulation.",
      grade: "guidance",
    },
  ],
  bestInClass: {
    statement: "For most people with active cancer: LMWH or a DOAC (apixaban, rivaroxaban, or edoxaban after 5 days of parenteral treatment), for at least 6 months, rather than a vitamin K antagonist (ITAC 2022, 1A; ASCO 2023, strong, high-quality evidence), with LMWH favoured where gastrointestinal or genitourinary bleeding risk is high or strong drug interactions exist, and a decision at 6 months on continuing. The guidelines differ on duration and order of preference: ITAC and ASCO set a minimum of 6 months; NICE NG158 (2020) treats for 3 to 6 months then reviews, and suggests considering a DOAC first; ASH 2021 (read as abstract) conditionally favours a DOAC for short-term treatment. ESMO 2023 could not be read.",
    sources: ["itac-2022", "asco-2023", "nice-ng158", "ash-2021"],
  },
  variants: [
    {
      name: "DOAC first (NICE)",
      differs: "Considers a DOAC as the first choice and LMWH (alone or with a VKA) only if a DOAC is unsuitable, for 3 to 6 months and then review.",
      evidence: "NICE NG158 [2020]. Its committee found evidence on duration in active cancer very limited and judged apixaban the most cost-effective option on a small number of people with cancer in the trials. Most anticoagulants were off label for cancer-associated VTE in the UK in March 2020.",
      sources: ["nice-ng158"],
    },
    {
      name: "LMWH alone for the whole course",
      differs: "Uses daily LMWH injections throughout, the standard before DOACs.",
      evidence: "ITAC: LMWH for 6 months was more effective than VKAs in five randomised trials without more bleeding; DOACs reduce recurrence compared with LMWH (pooled RR 0.62, 95% CI 0.43 to 0.91) without a significant increase in major bleeding, but with more clinically relevant non-major bleeding, and one meta-analysis in gastrointestinal cancers found more major bleeding with DOACs (RR 2.3).",
      sources: ["itac-2022"],
    },
  ],
  grades: [
    { claim: "LMWH for initial treatment (creatinine clearance 30 mL/min or more)", grade: "1A", source: "itac-2022" },
    { claim: "Rivaroxaban, apixaban or edoxaban for initial treatment, without high gastrointestinal or genitourinary bleeding risk", grade: "1A", source: "itac-2022" },
    { claim: "DOACs for maintenance in the absence of strong drug interactions or impaired gastrointestinal absorption", grade: "1A", source: "itac-2022", quote: "Direct oral anticoagulants (edoxaban, rivaroxaban, or apixaban) are recommended for patients with cancer when creatinine clearance is ≥30 mL/min in the absence of strong drug–drug interactions or gastrointestinal absorption impairment (grade 1A)." },
    { claim: "Minimum 6 months of LMWH or DOAC", grade: "1A", source: "itac-2022" },
    { claim: "LMWH, edoxaban, rivaroxaban or apixaban for at least 6 months, preferred over VKAs", grade: "Evidence based; Evidence quality: High; Strength of recommendation: Strong", source: "asco-2023", quote: "For long-term anticoagulation, LMWH, edoxaban, rivaroxaban, or apixaban for at least 6 months are preferred over vitamin K antagonists (VKAs) because of improved efficacy." },
    { claim: "Brain tumour: LMWH or DOAC", grade: "2A", source: "itac-2022", quote: "For the treatment of established VTE in patients with a brain tumour, low-molecular-weight heparin (LMWH) or direct oral anticoagulants can be used (grade 2A)." },
    { claim: "Active cancer: 3 to 6 months, then review", grade: "[2020] (NICE does not grade recommendations)", source: "nice-ng158", quote: "Offer people with active cancer and confirmed proximal DVT or PE anticoagulation treatment for 3 to 6 months." },
    { claim: "Consider a DOAC for active cancer with proximal DVT or PE", grade: "[2020] (NICE does not grade recommendations)", source: "nice-ng158", quote: "Consider a direct-acting oral anticoagulant (DOAC) for people with active cancer and confirmed proximal DVT or PE." },
  ],
  sources: [
    {
      key: "itac-2022",
      label: "2022 international clinical practice guidelines for the treatment and prophylaxis of venous thromboembolism in patients with cancer, including patients with COVID-19",
      publisher: "International Initiative on Thrombosis and Cancer (ITAC), endorsed by the ISTH (Lancet Oncology, Farge et al.)",
      year: 2022,
      url: "https://doi.org/10.1016/S1470-2045(22)00160-7",
      doi: "10.1016/S1470-2045(22)00160-7",
      gradingScheme: "GRADE: evidence A (high) to D (very low); recommendation grade 1 (strong) or 2 (weak); 'guidance' (best clinical practice) where there is no clear evidence, based on expert consensus.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "asco-2023",
      label: "Venous Thromboembolism Prophylaxis and Treatment in Patients With Cancer: ASCO Guideline Update",
      publisher: "ASCO (Journal of Clinical Oncology, Key et al.)",
      year: 2023,
      url: "https://doi.org/10.1200/JCO.23.00294",
      doi: "10.1200/JCO.23.00294",
      gradingScheme: "Each recommendation has a type (evidence based or consensus), evidence quality (high to low) and strength (strong or moderate or weak).",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nice-ng158",
      label: "Venous thromboembolic diseases: diagnosis, management and thrombophilia testing (NG158), last updated 2 August 2023",
      publisher: "NICE",
      year: 2020,
      url: "https://www.nice.org.uk/guidance/ng158/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written ([2020]).",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "ash-2021",
      label: "American Society of Hematology 2021 guidelines for management of venous thromboembolism: prevention and treatment in patients with cancer",
      publisher: "American Society of Hematology (Blood Advances, Lyman et al.)",
      year: 2021,
      url: "https://doi.org/10.1182/bloodadvances.2020003442",
      doi: "10.1182/bloodadvances.2020003442",
      gradingScheme: "GRADE; recommendations strong or conditional.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "esmo-2023",
      label: "Venous thromboembolism in cancer patients: ESMO Clinical Practice Guideline",
      publisher: "ESMO (Annals of Oncology, Falanga et al.)",
      year: 2023,
      url: "https://doi.org/10.1016/j.annonc.2022.12.014",
      doi: "10.1016/j.annonc.2022.12.014",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["apixaban", "rivaroxaban", "edoxaban", "warfarin"],
  technologies: ["cancer-associated-thrombosis"],
  terms: ["vte", "thrombocytopenia"],
  related: ["catheter-related-thrombosis-in-cancer"],
  upgrades: [],
  gaps: [
    "The ESMO Clinical Practice Guideline on VTE in cancer (2023) could not be read: the publisher refused a script, no archived copy was found and Europe PMC holds no abstract. Its positions are not represented here.",
    "The ASH 2021 guideline was read as an abstract only, so its specific drug and duration recommendations beyond the abstract's summary are not given.",
    "Only the 2023 ASCO update (recommendations 3.7, 4.1 and 4.2) was read; ASCO's unchanged 2019 recommendations on duration beyond 6 months, incidental clots and brain metastases were not.",
    "Guidance for low platelets, severe kidney failure and recurrence on treatment rests on expert consensus without trial data (ITAC 'guidance').",
    "NICE NG158 recommendations for active cancer date from 2020, before the apixaban trial CARAVAGGIO was weighed by the other guidelines.",
  ],
});

import { protocol } from "./helpers";

/*
 * Treating an established blood clot (deep vein thrombosis or pulmonary embolism) in a person with active cancer: which
 * anticoagulant, for how long, and in the situations where the usual choice changes.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again as raw
 * text into a scratch directory and every claim re-read against it; quotes were checked verbatim by script.
 * - ITAC 2022 international clinical practice guidelines (Farge et al., Lancet Oncol 2022, PMC9236567): full text from
 *   the Europe PMC full-text XML, tags stripped. The text says the guidelines were endorsed by the ISTH. Grades quoted
 *   as printed (GRADE 1A to 2D, or "guidance"). All doses on this page are the ones this text prints.
 * - ASCO guideline update on VTE prophylaxis and treatment in patients with cancer (Key et al., J Clin Oncol 2023): full
 *   text of the update, read from the Internet Archive's capture of ascopubs.org/doi/10.1200/JCO.23.00294 (11 July 2025),
 *   the publisher refusing a script. The update revised recommendations 3.7, 4.1 and 4.2 only; the rest of the 2019
 *   guideline stands and could not be read (the archived copy of the 2019 page is itself a refusal).
 * - NICE NG158, Venous thromboembolic diseases: diagnosis, management and thrombophilia testing (published 26 March
 *   2020, last updated 2 August 2023, last reviewed 1 May 2026): recommendations with the committee's rationale, the
 *   terms and the update information, HTML.
 * - ASH 2021 guidelines on VTE in patients with cancer (Lyman et al., Blood Adv 2021, PMC7903232): now read in full
 *   from the PubMed Central HTML (one plain request, no challenge page). It had been read as an abstract only. Its
 *   April 2021 erratum (10.1182/bloodadvances.2021004734) exists and its text could not be read.
 * - ESMO Clinical Practice Guideline on VTE in cancer patients (Falanga et al., Ann Oncol 2023): still not reachable.
 *   The publisher returned 403 to a script again and Europe PMC holds no abstract. Named, not used.
 *
 * Every DOI was resolved through Crossref and Europe PMC and its title checked. No newer edition of any of the five was
 * found in either. Quotes are copied from the raw text with line breaks joined; figures whose superscripts the raw text
 * mangles (platelet counts) are left out of quotes and stated in the prose.
 */
export const cancerAssociatedVteTreatment = protocol({
  id: "cancer-associated-vte-treatment",
  name: "Anticoagulation for a blood clot in a person with cancer: choice of drug, duration and special situations",
  aka: ["cancer-associated thrombosis treatment", "CAT treatment", "DVT in cancer", "pulmonary embolism in cancer", "DOAC or LMWH in cancer", "apixaban for cancer clot", "dalteparin", "anticoagulation duration cancer"],
  domain: "supportive-care",
  tldr: "People with cancer are more likely to get a clot in a leg vein or the lungs. It is treated with blood thinners, either daily injections (low-molecular-weight heparin) or tablets (apixaban, rivaroxaban or edoxaban), for at least three to six months and often longer while the cancer is active. The tablets need extra care with stomach, bowel or urinary tract cancers and with some other medicines.",
  simple: "A clot in someone with cancer is treated with blood thinners, as injections or tablets, for at least three to six months and often longer. Your team picks the one that is safest with your cancer and your other medicines.",
  summary: "ITAC (2022) recommends LMWH for initial treatment when creatinine clearance is at least 30 mL/min (1A), or rivaroxaban or apixaban from the start, or edoxaban after at least 5 days of parenteral anticoagulation, in patients not at high risk of gastrointestinal or genitourinary bleeding (1A). The starting doses ITAC gives are apixaban 10 mg twice daily for the first 7 days and rivaroxaban 15 mg twice daily for the first 21 days; edoxaban is started at its standard 60 mg daily dose after 5 days of a parenteral anticoagulant, typically LMWH. The regimens in the trials ITAC reports continued with apixaban 5 mg twice daily (CARAVAGGIO), rivaroxaban 20 mg daily (CASTA-DIVA), or dalteparin 200 IU/kg daily for 1 month then 150 IU/kg daily (the comparator in both). ITAC recommends once-daily LMWH and says that where a twice-daily regimen is required only enoxaparin 1 mg/kg twice daily can be used. For maintenance, when creatinine clearance is at least 30 mL/min, LMWH is preferred over vitamin K antagonists (1A) and DOACs are recommended in the absence of strong drug interactions or impaired gastrointestinal absorption (1A), with caution in gastrointestinal, especially upper gastrointestinal, cancers. Treat for at least 6 months (1A); after 6 months, continue or stop by individual assessment of benefit and risk, tolerability, drug availability, patient preference and cancer activity (guidance). ASCO (2023) is concordant: LMWH, edoxaban, rivaroxaban or apixaban for at least 6 months, preferred over VKAs (strong, high-quality evidence), noting less recurrence but more clinically relevant non-major bleeding with factor Xa inhibitors, caution in gastrointestinal and genitourinary cancers, and checking drug interactions first.\n\nNICE NG158 (2020) differs on emphasis and duration: it suggests considering a DOAC and, if a DOAC is unsuitable, LMWH alone or LMWH with a VKA, and offers 3 to 6 months then review, saying there was very little evidence on duration in active cancer. ASH (2021) makes one strong recommendation here, LMWH over unfractionated heparin for initial treatment; conditionally it suggests apixaban, rivaroxaban or LMWH initially, a DOAC over LMWH for the first 3 to 6 months (low certainty), and anticoagulation beyond 6 months for active cancer, with a DOAC or LMWH. ITAC treats incidental clots like symptomatic ones; ASH suggests short-term anticoagulation rather than observation for an incidental pulmonary embolism (conditional, very low certainty). For special situations ITAC gives guidance, not graded evidence: full-dose anticoagulation can be used if platelets are above 50 x 10^9/L with no evidence of bleeding, case by case below that; unfractionated heparin then early VKA, or anti-Xa-adjusted LMWH, when creatinine clearance is below 30 mL/min; LMWH or DOAC with a brain tumour (2A); LMWH in pregnancy. For recurrence on treatment ITAC lists options to consider: increase LMWH by 20 to 25% or switch class (guidance); ASH suggests raising LMWH to a supratherapeutic dose or continuing the therapeutic dose (conditional, very low certainty). On vena cava filters the guidelines differ: ITAC says one might be considered when anticoagulation is contraindicated or a PE recurs despite optimal treatment (guidance); NICE allows the same two uses, the second only after its steps for treatment failure have been taken; ASH suggests not using a filter for recurrence despite anticoagulation (conditional, very low certainty).",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "pharmacist", "nurse"],
    where: ["acute-oncology-service", "emergency-department", "ward", "outpatient-clinic"],
  },
  population: "Adults with active cancer and a confirmed deep vein thrombosis or pulmonary embolism, symptomatic or found incidentally on a scan. Clots related to a central venous catheter have their own protocol. Children follow paediatric guidance; ITAC gives separate recommendations for children with central lines. NICE's recommendations for active cancer apply to proximal DVT or PE.",
  trigger: "A deep vein thrombosis or pulmonary embolism is confirmed in a person with active cancer.",
  steps: [
    {
      action: "Start anticoagulation with low-molecular-weight heparin if kidney function allows (creatinine clearance 30 mL/min or more); rivaroxaban or apixaban from day one are the alternative in the next step",
      why: "In the trials the tablets were no worse than the injections at stopping clots coming back, so the choice depends on the person's bleeding risk, cancer and other medicines.",
      source: "itac-2022",
      quote: "Low-molecular-weight heparin (LMWH) is recommended for the initial treatment of established VTE in patients with cancer when creatinine clearance is ≥30 mL/min (grade 1A).",
      grade: "1A",
    },
    {
      action: "Use a tablet (DOAC) at the start only where the risk of gut or urinary tract bleeding is not high and creatinine clearance is 30 mL/min or more; edoxaban needs at least 5 days of injections first",
      why: "ITAC asks for caution in cancers of the gut, especially the upper gut, because the data show more gut bleeding with edoxaban and rivaroxaban.",
      source: "itac-2022",
      quote: "For patients who do not have a high risk of gastrointestinal or genitourinary bleeding, rivaroxaban or apixaban (in the first 10 days), or edoxaban (started after at least 5 days of parenteral anticoagulation) can also be used for the initial treatment of established VTE in patients with cancer when creatinine clearance is ≥30 mL/min (grade 1A).",
      grade: "1A",
    },
    {
      action: "Before choosing, take into account the tumour site, interactions with cancer drugs, and the person's bleeding risk",
      why: "Anticoagulants can interact with other medicines, including chemotherapy, and some tumours carry a higher risk of bleeding.",
      source: "nice-ng158",
      quote: "When choosing anticoagulation treatment for people with active cancer and confirmed proximal DVT or PE, take into account the tumour site, interactions with other drugs including those used to treat cancer, and the person's bleeding risk.",
      grade: "[2020]",
    },
    {
      action: "Check for drug interactions before starting a factor Xa inhibitor tablet",
      why: "ASCO makes this check part of its recommendation, and ITAC recommends the tablets only where there is no strong drug interaction.",
      source: "asco-2023",
      quote: "Drug-drug interaction should be checked before using a direct factor Xa inhibitor (Type: Evidence based; Evidence quality: High; Strength of recommendation: Strong).",
      grade: "Evidence based; Evidence quality: High; Strength of recommendation: Strong",
    },
    {
      action: "Treat for at least 6 months, with low-molecular-weight heparin or a DOAC",
      why: "People with a cancer-associated clot are at high risk of another, and the trials behind this recommendation treated for at least six months. NICE differs: 3 to 6 months, then review.",
      source: "itac-2022",
      quote: "LMWH or direct oral anticoagulants should be used for a minimum of 6 months to treat established VTE in patients with cancer (grade 1A).",
      grade: "1A",
    },
    {
      action: "At 6 months, decide with the patient whether to continue, based on the balance of benefit and risk, tolerability, drug availability, the patient's preference and cancer activity",
      why: "ITAC found no trial data to settle what to do after six months, so the decision is made person by person.",
      source: "itac-2022",
      quote: "After 6 months, termination or continuation of anticoagulation (LMWH, direct oral anticoagulants, or vitamin K antagonists) should be based on individual evaluation of the benefit–risk ratio, tolerability, drug availability, patient preference, and cancer activity (guidance, in the absence of data).",
      grade: "guidance",
    },
    {
      action: "Treat a clot found incidentally on a scan in a similar way to one that causes symptoms",
      why: "The trials comparing tablets with injections included many people whose clot was found by chance, and in them the two treatments did not differ in new clots or major bleeding.",
      source: "itac-2022",
      quote: "These findings further support managing patients with incidental cancer-associated thrombosis in a similar manner as symptomatic cancer-associated thrombosis.",
    },
    {
      action: "If platelets are low: full-dose anticoagulation can be used when the platelet count is above 50 x 10^9/L and there is no evidence of bleeding; below 50 x 10^9/L, decide treatment and dose case by case with the utmost caution",
      why: "There are no trial data here, and the balance between the risk of bleeding and the risk of another clot differs from person to person.",
      source: "itac-2022",
      quote: "decisions on treatment and dose should be made on a case-by-case basis with the utmost caution (guidance, in the absence of data and a balance between desirable and undesirable effects depending on the bleeding risk vs VTE risk).",
      grade: "guidance",
    },
    {
      action: "If creatinine clearance is below 30 mL/min, use unfractionated heparin followed by an early vitamin K antagonist (possible from day 1), or LMWH adjusted by anti-Xa levels",
      why: "The recommendations for LMWH and the tablets apply only when creatinine clearance is 30 mL/min or more; below that there are no trial data and this is expert consensus.",
      source: "itac-2022",
      quote: "In the presence of severe renal failure (creatinine clearance <30 mL/min), we suggest using unfractionated heparin followed by early vitamin K antagonists (possible from day 1) or LMWH adjusted to anti-Xa concentration for the treatment of established VTE (guidance, in the absence of data and an unknown balance between desirable and undesirable effects).",
      grade: "guidance",
    },
    {
      action: "If a clot recurs despite treatment, consider increasing LMWH by 20 to 25% or switching to a DOAC; switching from a DOAC to LMWH; or switching from a vitamin K antagonist to LMWH or a DOAC",
      why: "These are options to consider, resting on very low quality evidence; the decision is individual and the effect is judged by whether symptoms improve.",
      source: "itac-2022",
      quote: "In the event of VTE recurrence, three options can be considered: (1) increase LMWH by 20–25% or switch to direct oral anticoagulants; (2) for direct oral anticoagulants, switch to LMWH; and (3) for vitamin K antagonist, switch to LMWH or direct oral anticoagulants (guidance, based on evidence of very low quality and an unknown balance between desirable and undesirable effects).",
      grade: "guidance",
    },
    {
      action: "Consider a vena cava filter only if anticoagulation cannot be given, or a pulmonary embolism recurs despite optimal anticoagulation; reassess periodically and restart anticoagulation when safe",
      why: "The evidence for filters is of very low quality, so they are kept for when anticoagulation cannot be used or has failed. ASH suggests not using one for recurrence.",
      source: "itac-2022",
      quote: "In the initial treatment of VTE, inferior vena cava filters might be considered when anticoagulant treatment is contraindicated or, in the case of pulmonary embolism, when recurrence occurs under optimal anticoagulation.",
      grade: "guidance",
    },
  ],
  bestInClass: {
    statement: "For most people with active cancer: LMWH or a DOAC (apixaban, rivaroxaban, or edoxaban after at least 5 days of parenteral treatment), for at least 6 months, rather than a vitamin K antagonist (ITAC 2022, 1A; ASCO 2023, strong, high-quality evidence), with a decision at 6 months on continuing. ITAC recommends the DOACs where the risk of gastrointestinal or genitourinary bleeding is not high and there is no strong drug interaction or impaired gastrointestinal absorption, and ASCO asks for caution with them in gastrointestinal and genitourinary cancers, which leaves LMWH as the choice there. The guidelines differ on duration and order of preference: ITAC and ASCO set a minimum of 6 months; NICE NG158 (2020) treats for 3 to 6 months then reviews, and suggests considering a DOAC, with LMWH if a DOAC is unsuitable; ASH 2021 conditionally suggests a DOAC over LMWH for the first 3 to 6 months (low certainty) and anticoagulation beyond 6 months for active cancer (low certainty). ESMO 2023 could not be read.",
    sources: ["itac-2022", "asco-2023", "nice-ng158", "ash-2021"],
  },
  variants: [
    {
      name: "DOAC first (NICE)",
      differs: "Considers a DOAC as the first choice and LMWH (alone or with a VKA) only if a DOAC is unsuitable, for 3 to 6 months and then review.",
      evidence: "NICE NG158 [2020]. Its committee found very little evidence on duration in active cancer, and said the economic evidence showed apixaban to be the most cost-effective option although that evidence rested on a relatively small number of people. It noted more gastrointestinal and genitourinary bleeds with a DOAC than with LMWH and agreed DOACs may be unsuitable for tumours with a raised risk of those bleeds. Most anticoagulants were off label for DVT or PE in people with active cancer in the UK in March 2020.",
      sources: ["nice-ng158"],
    },
    {
      name: "LMWH alone for the whole course",
      differs: "Uses daily LMWH injections throughout, the standard before DOACs.",
      evidence: "ITAC: LMWH for 6 months was more effective than VKAs in five randomised trials without more bleeding. Meta-analyses pooling four trials (2894 patients) found fewer recurrent clots with DOACs than with LMWH (RR 0.62, 95% CI 0.43 to 0.91) without an increase in major bleeding (RR 1.31, 95% CI 0.83 to 2.08), but with more clinically relevant non-major bleeding in all but one, and one meta-analysis in gastrointestinal cancers (483 patients) found more major bleeding with DOACs (RR 2.3, 95% CI 1.08 to 4.88). In CARAVAGGIO (1170 patients) recurrent clots occurred in 5.6% on apixaban and 7.9% on dalteparin (HR 0.63, 95% CI 0.37 to 1.07) and major bleeding in 3.8% and 4.0%.",
      sources: ["itac-2022"],
    },
    {
      name: "ASH 2021: a DOAC ahead of LMWH, and no filter for recurrence",
      differs: "Suggests a DOAC over LMWH for the first 3 to 6 months, continuing beyond 6 months in active cancer, and not using a vena cava filter when a clot recurs despite anticoagulation.",
      evidence: "ASH 2021, all conditional recommendations on low or very low certainty evidence. Its remarks say DOACs should be used carefully in gastrointestinal cancers because of the higher risk of gastrointestinal bleeding, that a VKA is generally preferred over LMWH and DOACs in severe renal impairment (creatinine clearance below 30 mL/min), and that a filter may be required where anticoagulation is contraindicated.",
      sources: ["ash-2021"],
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
    { claim: "A DOAC over LMWH for the first 3 to 6 months in active cancer", grade: "conditional recommendation, low certainty in the evidence of effects", source: "ash-2021", quote: "For the short-term treatment of VTE (3-6 months) for patients with active cancer, the ASH guideline panel suggests DOAC (apixaban, edoxaban, or rivaroxaban) over LMWH (conditional recommendation, low certainty in the evidence of effects ⊕⊕◯◯)." },
    { claim: "Anticoagulation beyond 6 months for active cancer", grade: "conditional recommendation, low certainty in the evidence of effects", source: "ash-2021", quote: "For patients with active cancer and VTE, the ASH guideline panel suggests long-term anticoagulation for secondary prophylaxis (>6 months) rather than short-term treatment alone (3-6 months) (conditional recommendation, low certainty in the evidence of effects ⊕⊕◯◯)." },
    { claim: "Recurrence on LMWH: a supratherapeutic dose or the same dose", grade: "conditional recommendation, very low certainty in the evidence of effects", source: "ash-2021", quote: "For patients with cancer and recurrent VTE despite receiving therapeutic LMWH, the ASH guideline panel suggests increasing the LMWH dose to a supratherapeutic level or continuing with a therapeutic dose (conditional recommendation, very low certainty in the evidence of effects ⊕◯◯◯)." },
    { claim: "No vena cava filter for recurrence despite anticoagulation", grade: "conditional recommendation, very low certainty in the evidence of effects", source: "ash-2021", quote: "For patients with cancer and recurrent VTE despite anticoagulation treatment, the ASH guideline panel suggests not using an inferior vena cava (IVC) filter over using a filter (conditional recommendation, very low certainty in the evidence of effects ⊕◯◯◯)." },
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
      accessed: "2026-11-17",
    },
    {
      key: "asco-2023",
      label: "Venous Thromboembolism Prophylaxis and Treatment in Patients With Cancer: ASCO Guideline Update",
      publisher: "ASCO (Journal of Clinical Oncology, Key et al.)",
      year: 2023,
      url: "https://doi.org/10.1200/JCO.23.00294",
      doi: "10.1200/JCO.23.00294",
      gradingScheme: "Each recommendation has a type (evidence based or consensus), an evidence quality (high, intermediate, low or insufficient) and a strength (strong, moderate or weak).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng158",
      label: "Venous thromboembolic diseases: diagnosis, management and thrombophilia testing (NG158), last updated 2 August 2023",
      publisher: "NICE",
      year: 2020,
      url: "https://www.nice.org.uk/guidance/ng158/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written ([2020]).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ash-2021",
      label: "American Society of Hematology 2021 guidelines for management of venous thromboembolism: prevention and treatment in patients with cancer",
      publisher: "American Society of Hematology (Blood Advances, Lyman et al.)",
      year: 2021,
      url: "https://doi.org/10.1182/bloodadvances.2020003442",
      doi: "10.1182/bloodadvances.2020003442",
      gradingScheme: "GRADE; a recommendation is strong ('recommends') or conditional ('suggests'), printed with the certainty of the evidence (high, moderate, low or very low).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "esmo-2023",
      label: "Venous thromboembolism in cancer patients: ESMO Clinical Practice Guideline",
      publisher: "ESMO (Annals of Oncology, Falanga et al.)",
      year: 2023,
      url: "https://doi.org/10.1016/j.annonc.2022.12.014",
      doi: "10.1016/j.annonc.2022.12.014",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  // Enoxaparin and dalteparin are the two heparins this protocol's own source names: the 2022 ITAC guideline (Lancet Oncol,
  // read in full through Europe PMC, PMC9236567, on 16 November 2026 and again on 17 November) says "When a twice-per-day
  // regimen is required, only enoxaparin (1 mg/kg, twice-daily) can be used" and gives dalteparin, at its doses, as the
  // heparin of the CARAVAGGIO and CASTA-DIVA trials. Tinzaparin appears only in its reference list, so it is not linked.
  drugs: ["apixaban", "rivaroxaban", "edoxaban", "warfarin", "enoxaparin", "dalteparin"],
  technologies: ["cancer-associated-thrombosis"],
  terms: ["vte", "thrombocytopenia"],
  related: ["catheter-related-thrombosis-in-cancer"],
  upgrades: [],
  gaps: [
    "The ESMO Clinical Practice Guideline on VTE in cancer (2023) could not be read: on 17 November 2026 the publisher again refused a script and Europe PMC holds no abstract. Its positions are not represented here.",
    "The ASH 2021 guideline, read only as an abstract on 11 November, was read in full on 17 November 2026. An erratum to it was published in April 2021 (10.1182/bloodadvances.2021004734); its text could not be read, so what it corrects is not known here.",
    "Only the 2023 ASCO update (recommendations 3.7, 4.1 and 4.2) was read; ASCO's unchanged 2019 recommendations, which the update says still stand for the rest of treatment, were not, and on 17 November 2026 the archived copy of the 2019 guideline was itself a refusal page. The 2023 update describes itself as pending a full update of the 2019 guideline; no later ASCO edition was found.",
    "Doses: the only doses on this page are the ones the ITAC text prints (the starting doses, the trial regimens and enoxaparin twice daily). No source read here gives dose reductions for kidney function, body weight or interacting medicines, or a dose for the other heparins; those are in each product's label, which was not read.",
    "Low platelets: ITAC gives one threshold, 50 x 10^9/L, above which full doses can be used. No source read here sets a platelet count for a reduced dose or for stopping; ITAC leaves that to case-by-case decision.",
    "Guidance for low platelets, severe kidney failure and recurrence on treatment rests on expert consensus without trial data (ITAC 'guidance'). For severe kidney failure ITAC and ASH differ in emphasis: ITAC suggests unfractionated heparin then an early VKA, or anti-Xa-adjusted LMWH; ASH's remarks say a VKA is generally preferred over LMWH and DOACs.",
    "NICE NG158's recommendations for active cancer date from 2020; its committee noted that the trials it had in people with active cancer did not look at apixaban. NICE's page gives a last review date of 1 May 2026, for a check on early mobilisation that led to no update; the cancer recommendations still carry the [2020] tag.",
  ],
});

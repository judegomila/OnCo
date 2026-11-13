import { protocol } from "./helpers";
import { EBMT_2019, EBMT_2022, FDA_REMS_2025, SITC_IEC_2020 } from "./cell-therapy-sources";

/*
 * Referral for CAR T-cell therapy and the eligibility assessment before collection: which patients, when, and what the
 * treating centre checks.
 *
 * What was read, and how (11 November 2026, fetched raw and read as text):
 * - EBMT 2025 practice recommendations on indications for haematopoietic cell transplantation and CAR-T (Greco et al.,
 *   Bone Marrow Transplantation 2025): open access, full text from Europe PMC (PMC12583170), including the adult
 *   indications table (flattened text) and the lymphoma and myeloma sections. Its supplementary table defining the
 *   evidence levels was not read.
 * - EBMT/JACIE 2019 (eligibility and work-up sections; Tables 1 and 2 are images and were not read) and SITC 2020
 *   (product- and patient-specific considerations, baseline evaluations, neurotoxicity): full text.
 * - FDA safety communication of 26 June 2025 on the end of the CAR T-cell REMS: the fda.gov page, read in full.
 * - EBMT/JACIE/EHA 2022: abstract only. See ./cell-therapy-sources.ts.
 * DOIs resolved through Europe PMC. Quotes checked by script against the raw text.
 */
export const carTReferralAndEligibility = protocol({
  id: "car-t-referral-and-eligibility",
  name: "Referral and eligibility assessment for CAR T-cell therapy",
  aka: ["CAR-T referral", "CAR T eligibility", "CAR-T candidacy", "who can have CAR T", "CAR-T indications"],
  domain: "cell-therapy-toxicity",
  tldr: "CAR T-cell therapy is given at specialist centres, and a team there decides. For large B-cell lymphoma that does not respond to first treatment or returns within a year, CAR T cells are now the standard next step, so early referral matters. The centre checks your fitness, heart, brain and blood, and you will need to stay near the hospital, with someone to help, for at least two weeks after.",
  simple: "A specialist team decides whether CAR T-cell therapy is right for you. If it is, you will need to stay close to the hospital, with a helper, for at least two weeks afterwards.",
  summary: "EBMT 2025 indications (Table 1, adults; category/evidence level as printed): in large B-cell lymphoma, CAR T cells are standard of care (S/I) for primary refractory disease, early relapse with untested or chemoresistant disease and early chemosensitive relapse, where axicabtagene ciloleucel or lisocabtagene maraleucel beat salvage chemotherapy and autologous transplant in two phase III trials; for late relapse autologous transplant remains standard (S/II) and CAR T a clinical option (CO/II); after a failed autograft CAR T is standard (S/II). Follicular lymphoma: CAR T within the EMA labels, standard for refractory relapse (S/II). Mantle cell lymphoma: not first line outside trials; a clinical option second line after primary BTK inhibitor failure. Myeloma: idecabtagene vicleucel and ciltacabtagene autoleucel within their labels. Primary CNS lymphoma relapse: clinical option. Hodgkin lymphoma: not convincingly better than other options to date.\n\nEBMT/JACIE 2019: the decision is made by a multidisciplinary team in a designated centre; cumulative chemotherapy harms T-cell quality, so plan collection early. SITC 2020: prior allogeneic transplant, BiTE or antibody therapy is no bar if the target antigen is expressed (LE: 4); weigh ECOG performance status; recent or active intracranial haemorrhage excludes (LE: 4); refer for neurological review if there is inflammatory neurological disease or CNS involvement; baseline CRP, ferritin, LDH, blood count, chemistry and echocardiogram or MUGA (LE: 4). FDA 2025: the REMS ended; labels now ask patients to stay near a healthcare facility for at least two weeks and not to drive for two weeks.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "multidisciplinary-team", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic"],
  },
  population: "Adults with relapsed or refractory B-cell lymphoma, B-cell ALL or multiple myeloma, and children and young adults with B-cell ALL, being considered for a licensed CAR T-cell product. Indications and reimbursement differ by country; the EBMT categories are European. CAR T cells for autoimmune disease and solid tumours are outside this protocol.",
  trigger: "Relapse or refractoriness in a disease for which a CAR T-cell product is licensed, or a referring team asking whether a patient is a candidate.",
  steps: [
    {
      action: "Refer to a designated CAR T-cell centre, where the decision is made by its multidisciplinary team",
      why: "The treatment and its side effects need a specialist team and hospital set up for them.",
      source: "ebmt-2019",
      quote: "The decision to treat a patient with CAR T cells therapy should be made collectively at a multidisciplinary team meeting in a designated center for CAR T-cell therapy.",
    },
    {
      action: "For large B-cell lymphoma that is primary refractory or relapses early, refer for second-line CAR T-cell therapy",
      why: "In two phase III trials CAR T cells kept the lymphoma controlled for longer than chemotherapy and transplant in this group.",
      source: "ebmt-2025",
      quote: "For patients with primary refractory disease or early relapse with untested or chemorefractory disease, treatment with axi-cel or liso-cel represents the current standard of care.",
      grade: "S/I",
    },
    {
      action: "For late relapse of large B-cell lymphoma, consider autologous transplant first, with CAR T cells after a failed transplant",
      why: "Autologous transplant still works well for late relapse and has not been beaten in a trial.",
      source: "ebmt-2025",
      quote: "Patients with late relapses face reasonable outcomes with auto-HCT and this standard has not been challenged by a clinical trial as of today.",
      grade: "S/II",
    },
    {
      action: "In mantle cell lymphoma, do not use CAR T cells first line outside trials; consider them second line after BTK inhibitor failure",
      why: "The licence and the evidence are for disease that has failed earlier treatment.",
      source: "ebmt-2025",
      quote: "With Bruton’s TKIs moving to 1st-line treatment, CAR-T has become a clinical option as 2nd-line therapy in patients with primary Bruton’s TKIs failure.",
    },
    {
      action: "Refer early, before further lines of chemotherapy where possible",
      why: "Each course of chemotherapy weakens the T cells from which the product is made.",
      source: "ebmt-2019",
      quote: "There is evidence that cumulative chemotherapy exposure adversely affects the quality of circulating T cells.",
    },
    {
      action: "Do not exclude a patient for earlier allogeneic transplant, bispecific T-cell engager or antibody therapy if the cancer still expresses the target",
      why: "These do not stop CAR T cells working if the target is still present.",
      source: "sitc-iec-2020",
      quote: "Patients who have previously undergone allo-HSCT, bispecific T cell engager (BiTE) therapy, anti-CD19 monoclonal antibody (mAb) therapy, and mAbs against other targets (eg, rituximab) may be treated with CAR T cells, provided the patient’s disease still expresses the target antigen",
      grade: "LE: 4",
    },
    {
      action: "Assess performance status, and do not proceed with recent or active bleeding in the brain",
      why: "Side effects can be severe; a recent brain bleed makes neurotoxicity especially dangerous.",
      source: "sitc-iec-2020",
      quote: "Patients with evidence of recent or active intracranial hemorrhage should not undergo CAR T cell therapy",
      grade: "LE: 4",
    },
    {
      action: "Refer for neurological review if there is inflammatory neurological disease or lymphoma in the brain or spinal cord",
      why: "Existing brain disease changes the risk and the monitoring plan for neurotoxicity.",
      source: "sitc-iec-2020",
      quote: "Patients with history of inflammatory neurological conditions or current CNS disease involvement should be referred for additional neurological consultation prior to initiating CAR T cell therapy.",
    },
    {
      action: "Take baseline CRP, ferritin, LDH, blood count, kidney, liver and mineral chemistry, and an echocardiogram or MUGA scan",
      why: "Baselines make it possible to recognise toxicity early, and heart function must be adequate.",
      source: "sitc-iec-2020",
      quote: "Prior to CAR T cell therapy, treating physicians should order CRP, ferritin, lactate dehydrogenase (LDH), complete blood counts, comprehensive metabolic panel (including Mg/Pho), and transthoracic echocardiogram (TTE) or multigated acquisition (MUGA) scan.",
      grade: "LE: 4",
    },
    {
      action: "Plan for the patient to stay near a healthcare facility for at least two weeks after infusion, and not to drive for two weeks",
      why: "Cytokine release syndrome and neurotoxicity usually start in the first two weeks and can come on fast.",
      source: "fda-rems-2025",
      quote: "Specifically, labeling update included revision to language to monitor patients for at least two weeks including daily monitoring for at least one week; to instruct patients to remain within proximity of a healthcare facility for at least two weeks; and to advise patients to avoid driving for two weeks following product administration",
    },
  ],
  bestInClass: {
    statement: "For who should be referred, the EBMT 2025 indications are the most recent guideline read in full: CAR T cells are standard of care (S/I) for large B-cell lymphoma that is primary refractory or relapses early, on the strength of two randomised phase III trials, and the standard after a failed autograft (S/II); autologous transplant stays standard for late relapse (S/II). For the eligibility work-up, SITC 2020 (LE: 4) and EBMT/JACIE 2019 (ungraded) agree on a specialist multidisciplinary decision, performance status, baseline inflammatory markers and cardiac function, and neurological assessment. EBMT 2025 and its retrospective evidence leave one open point: for early chemosensitive relapse that reaches complete remission on salvage, EBMT rates CAR T S/I but also calls autologous transplant a valid clinical option (CO/II). In the US the FDA ended the REMS in June 2025 and relaxed proximity and driving restrictions to two weeks; European labels were not read.",
    sources: ["ebmt-2025", "sitc-iec-2020", "ebmt-2019", "fda-rems-2025", "ebmt-eha-2022"],
  },
  variants: [
    {
      name: "Autologous transplant for early chemosensitive relapse in complete remission (EBMT 2025)",
      differs: "For large B-cell lymphoma relapsing early but reaching complete remission on salvage, consolidates with high-dose therapy and autologous transplant rather than CAR T cells.",
      evidence: "Rated CO/II; a retrospective analysis found better progression-free survival with autologous transplant than CAR T in this group, but included no second-line CAR T and mostly tisagenlecleucel.",
      sources: ["ebmt-2025"],
    },
    {
      name: "US monitoring after the REMS (FDA 2025)",
      differs: "Removes the requirement for specially certified hospitals with immediate on-site tocilizumab; labels require monitoring for at least two weeks with daily monitoring for at least one, proximity for two weeks and no driving for two weeks.",
      evidence: "Regulatory decision based on established management guidelines and stable adverse event reporting.",
      sources: ["fda-rems-2025"],
    },
  ],
  grades: [
    { claim: "CAR T for primary refractory or early relapsed large B-cell lymphoma", grade: "S/I (standard of care; EBMT evidence level I)", source: "ebmt-2025" },
    { claim: "Autologous transplant for late relapse of large B-cell lymphoma", grade: "S/II; CAR T CO/II", source: "ebmt-2025" },
    { claim: "Prior allogeneic transplant, BiTE or antibody therapy is no bar if the antigen is expressed", grade: "LE: 4", source: "sitc-iec-2020" },
    { claim: "No CAR T with recent or active intracranial haemorrhage", grade: "LE: 4", source: "sitc-iec-2020" },
    { claim: "Baseline CRP, ferritin, LDH, blood count, chemistry and echocardiogram or MUGA", grade: "LE: 4", source: "sitc-iec-2020" },
  ],
  sources: [
    {
      key: "ebmt-2025",
      label: "Indications for haematopoietic cell transplantation and CAR-T for haematological diseases, solid tumours and immune disorders: 2025 EBMT practice recommendations",
      publisher: "European Society for Blood and Marrow Transplantation, Bone Marrow Transplantation",
      year: 2025,
      url: "https://europepmc.org/article/PMC/PMC12583170",
      doi: "10.1038/s41409-025-02701-3",
      gradingScheme: "Each indication is categorised S (standard of care), CO (clinical option after careful assessment of risks and benefits), D (developmental) or GNR (generally not recommended), with an evidence level I, II or III; the evidence levels are defined in a supplementary table that was not read.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    EBMT_2019,
    SITC_IEC_2020,
    FDA_REMS_2025,
    EBMT_2022,
  ],
  upgrades: [],
  gaps: [
    "The EBMT 2025 supplementary table that defines evidence levels I to III was not read; levels are given as printed in Table 1.",
    "The EBMT/JACIE 2019 eligibility criteria (Table 1) and minimum screening tests (Table 2) are images and were not read; the EBMT/JACIE/EHA 2022 update was read only as an abstract.",
    "NICE technology appraisals and other national reimbursement decisions, which decide who can actually be referred in each country, were not read.",
    "No organ-function thresholds (creatinine clearance, ejection fraction, oxygen saturation) are given here: SITC leaves them to institutional standards and the trial criteria were not read.",
    "The proximity and driving advice is from US labelling; European SmPCs were not read.",
  ],
  drugs: ["axicabtagene-ciloleucel", "lisocabtagene-maraleucel", "tisagenlecleucel", "brexucabtagene-autoleucel", "idecabtagene-vicleucel", "ciltacabtagene-autoleucel", "obecabtagene-autoleucel"],
  technologies: ["car-t", "autologous-stem-cell-transplant"],
  cancers: ["dlbcl", "primary-mediastinal-b-cell-lymphoma", "follicular-lymphoma", "mantle-cell-lymphoma", "all-leukemia", "multiple-myeloma"],
  terms: ["lymphoma-tx-car-t-pathway"],
  related: ["car-t-apheresis", "car-t-bridging", "car-t-lymphodepletion", "car-t-infection-prevention"],
  tags: ["protocol", "cell-therapy", "car-t"],
});

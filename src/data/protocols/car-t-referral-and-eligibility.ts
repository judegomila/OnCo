import { protocol } from "./helpers";
import { EBMT_2019, EBMT_2022, FDA_REMS_2025, SITC_IEC_2020 } from "./cell-therapy-sources";

const LABEL_SCHEME = "Regulatory prescribing information; not graded.";
const dailymed = (key: string, label: string, publisher: string, setid: string) => ({
  key,
  label,
  publisher: `${publisher}; US National Library of Medicine, DailyMed`,
  year: 2026,
  url: `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${setid}`,
  gradingScheme: LABEL_SCHEME,
  read: "full-text" as const,
  accessed: "2026-11-17",
});

/*
 * Referral for CAR T-cell therapy and the eligibility assessment before collection: which patients, when, and what the
 * treating centre checks.
 *
 * First read on 11 November 2026. Second accuracy pass on 17 November 2026: every source was read again as raw text
 * and every claim compared with it; every quote was checked by script (whitespace and line-break hyphenation only).
 * - EBMT 2025 practice recommendations on indications (Greco et al., Bone Marrow Transplantation 2025): full-text XML
 *   from the Europe PMC REST service (PMC12583170); Table 1 and Table 2 read cell by cell from the XML, and the
 *   lymphoma, myeloma and leukaemia sections. Its supplementary table, which defines the categories and evidence
 *   grades, now read from the publisher's supplementary file (docx). DOI resolved through Crossref and Europe PMC.
 * - EBMT/JACIE 2019: the open Haematologica PDF through pdftotext, in which Table 1 (eligibility) and Table 2 (minimum
 *   tests) read as text; a copy saved by a sibling checker on 17 November was re-used. The bilirubin unit in Table 2
 *   prints as "mmol/L" in that text and is not relied on.
 * - SITC 2020: full-text XML from Europe PMC (a sibling's copy of 17 November re-used).
 * - FDA safety communication of 26 June 2025: the fda.gov page, fetched again.
 * - Newly read: the current US prescribing information of the seven licensed products (DailyMed SPL XML; Yescarta and
 *   Kymriah from a sibling's copy), the European product information for Yescarta and Kymriah (ema.europa.eu PDFs, a
 *   sibling's copy), and NICE TA895 and TA1048 (nice.org.uk recommendation pages).
 * - Not readable: EBMT/JACIE/EHA 2022 (abstract only); the NHS England CAR-T page returned an empty response.
 */
export const carTReferralAndEligibility = protocol({
  id: "car-t-referral-and-eligibility",
  name: "Referral and eligibility assessment for CAR T-cell therapy",
  aka: ["CAR-T referral", "CAR T eligibility", "CAR-T candidacy", "who can have CAR T", "CAR-T indications"],
  domain: "cell-therapy-toxicity",
  tldr: "CAR T-cell therapy is given at specialist centres, and a team there decides. For large B-cell lymphoma that does not respond to first treatment or returns within a year, European guidance now makes CAR T cells the standard next step. The centre checks your fitness, heart, kidneys, liver and blood. Afterwards you stay near the hospital, with someone with you, often for two to four weeks.",
  simple: "A specialist team decides whether CAR T-cell therapy is right for you. If it is, you will need to stay close to the hospital afterwards, with someone with you. How long depends on the product and the country: often two to four weeks.",
  summary: "EBMT 2025 indications (adult table; category/evidence grade as printed): in large B-cell lymphoma, CAR T cells are standard of care (S/I) for primary refractory disease, early relapse with untested or chemoresistant disease and early chemosensitive relapse. Axicabtagene ciloleucel and lisocabtagene maraleucel gave better progression-free survival than salvage immunochemotherapy followed by autologous transplant in two phase III trials in disease refractory to, or relapsing within 12 months of, first-line therapy. For late relapse autologous transplant remains standard (S/II) and CAR T a clinical option (CO/II); after a failed autograft CAR T is standard (S/II). Follicular lymphoma: CAR T in accordance with the EMA labels; S/II for refractory relapse and for relapse at third line or later after a failed autograft. Mantle cell lymphoma: not first line outside trials; a clinical option second line after a first-line BTK inhibitor (CO/III); S/II for refractory disease and beyond second response after a BTK inhibitor. Myeloma: S/II after three prior lines including an immunomodulatory agent, a proteasome inhibitor and an anti-CD38 antibody. Relapsed primary CNS lymphoma: clinical option (CO/II). Hodgkin lymphoma: generally not recommended (GNR/III). Children with precursor B-cell ALL: S/II beyond second remission. The adult table prints no CAR T category for relapsed or refractory ALL.\n\nEBMT/JACIE 2019 (ungraded): the decision is made by a multidisciplinary team in a designated centre. Its own recommendations (Table 1): no upper age limit, with the decision based on physical condition rather than age; ECOG performance status above 2 not recommended; earlier allogeneic transplant, CD19-directed therapy or CAR T cells not a contraindication; current systemic immunosuppressive treatment a contraindication (intermittent topical, inhaled or intranasal corticosteroids allowed); not recommended in active autoimmune disease with end-organ injury or needing systemic immunosuppression or disease-modifying agents within the last 2 years; infection and a history of CNS disease are relative contraindications needing an individual risk-benefit assessment, with active infection controlled and on treatment before leukapheresis. Minimum tests (Table 2): neutrophils above 1.0 x 10⁹/L; AST and ALT below 5 times the upper limit of normal; creatinine clearance above 30 mL/min, with caution below 60 mL/min; left ventricular ejection fraction above 40%, echocardiography for pericardial effusion and an ECG; brain MRI and lumbar puncture only with a history of CNS disease or current neurological symptoms of concern; hepatitis B, hepatitis C and HIV tests within 30 days of leukapheresis where mandatory; a negative pregnancy test. Cumulative chemotherapy harms T-cell quality, so collection before salvage chemotherapy may be possible.\n\nSITC 2020: prior allogeneic transplant, BiTE or antibody therapy is no bar if the target antigen is expressed (LE: 4); take ECOG performance status into account; recent or active intracranial haemorrhage excludes (LE: 4); refer for neurological review if there is inflammatory neurological disease or CNS involvement; baseline CRP, ferritin, LDH, blood count, chemistry and echocardiogram or MUGA, with required levels set by the institution (LE: 4).\n\nLicensed indications on the current US labels: axicabtagene ciloleucel, large B-cell lymphoma refractory to or relapsing within 12 months of first-line chemoimmunotherapy, or after two or more lines, and follicular lymphoma after two or more lines; lisocabtagene maraleucel, the same second-line large B-cell lymphoma setting (also when transplant is unsuitable) or after two or more lines, and CLL or SLL, follicular, mantle cell (including a BTK inhibitor) and marginal zone lymphoma after at least two lines; tisagenlecleucel, B-cell precursor ALL up to 25 years of age that is refractory or in second or later relapse, and large B-cell and follicular lymphoma after two or more lines; brexucabtagene autoleucel, relapsed or refractory mantle cell lymphoma and adult B-cell precursor ALL; obecabtagene autoleucel, adult relapsed or refractory B-cell precursor ALL; idecabtagene vicleucel, myeloma after two or more lines including an immunomodulatory agent, a proteasome inhibitor and an anti-CD38 antibody; ciltacabtagene autoleucel, myeloma after at least one line including a proteasome inhibitor and an immunomodulatory agent, and refractory to lenalidomide. European labels can differ: the European Yescarta label gives follicular lymphoma after three or more lines.\n\nAfter infusion: the FDA ended the REMS in June 2025 and US labels were revised to ask patients to stay near a healthcare facility for at least two weeks and not to drive for two weeks (one week for both on the idecabtagene vicleucel label). The European Yescarta label asks for at least 2 weeks near a qualified centre and no driving for at least 4 weeks; the European Kymriah label for at least 4 weeks within 2 hours of travel, and its leaflet says not to drive for 8 weeks. EBMT 2019 advised at least 4 weeks within 1 hour's travel with a caregiver always present, and no driving for 8 weeks.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "multidisciplinary-team", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic"],
  },
  population: "Adults with relapsed or refractory B-cell lymphoma, B-cell precursor ALL or multiple myeloma, and children and young adults up to 25 years of age with B-cell precursor ALL, being considered for a licensed CAR T-cell product. Indications and reimbursement differ by country and by product; the EBMT categories are European. CAR T cells for autoimmune disease and solid tumours are outside this protocol.",
  trigger: "Relapse or refractoriness in a disease for which a CAR T-cell product is licensed, or a referring team asking whether a patient is a candidate.",
  steps: [
    {
      action: "Refer to a designated CAR T-cell centre, where the decision is made by its multidisciplinary team",
      why: "The team weighs the person's medical history and physical condition, which decide whether the treatment is suitable.",
      source: "ebmt-2019",
      quote: "The decision to treat a patient with CAR T cells therapy should be made collectively at a multidisciplinary team meeting in a designated center for CAR T-cell therapy.",
    },
    {
      action: "For large B-cell lymphoma that is primary refractory or relapses early, refer for second-line CAR T-cell therapy",
      why: "In two phase III trials CAR T cells kept the lymphoma controlled for longer than chemotherapy followed by transplant in people whose lymphoma was refractory or returned within 12 months.",
      source: "ebmt-2025",
      quote: "For patients with primary refractory disease or early relapse with untested or chemorefractory disease, treatment with axi-cel or liso-cel represents the current standard of care.",
      grade: "S/I",
    },
    {
      action: "For late relapse of large B-cell lymphoma, consider autologous transplant first, with CAR T cells after a failed transplant",
      why: "Autologous transplant gives reasonable results for late relapse and has not been tested against CAR T cells in a trial.",
      source: "ebmt-2025",
      quote: "Patients with late relapses face reasonable outcomes with auto-HCT and this standard has not been challenged by a clinical trial as of today.",
      grade: "S/II",
    },
    {
      action: "In mantle cell lymphoma, do not use CAR T cells first line outside trials; consider them second line after BTK inhibitor failure",
      why: "EBMT gives the labelled use as after at least two earlier treatments including a BTK inhibitor; with BTK inhibitors now used first, it accepts CAR T cells as an option one line earlier.",
      source: "ebmt-2025",
      quote: "With Bruton’s TKIs moving to 1st-line treatment, CAR-T has become a clinical option as 2nd-line therapy in patients with primary Bruton’s TKIs failure.",
    },
    {
      action: "Where the disease burden allows, consider arranging cell collection before salvage chemotherapy starts",
      why: "The more chemotherapy the T cells have been exposed to, the poorer their quality for making the product.",
      source: "ebmt-2019",
      quote: "There is evidence that cumulative chemotherapy exposure adversely affects the quality of circulating T cells.",
    },
    {
      action: "Do not exclude a patient for earlier allogeneic transplant, bispecific T-cell engager or antibody therapy if the cancer still expresses the target",
      why: "SITC and EBMT both say these earlier treatments are not in themselves a reason to withhold CAR T cells.",
      source: "sitc-iec-2020",
      quote: "Patients who have previously undergone allo-HSCT, bispecific T cell engager (BiTE) therapy, anti-CD19 monoclonal antibody (mAb) therapy, and mAbs against other targets (eg, rituximab) may be treated with CAR T cells, provided the patient’s disease still expresses the target antigen",
      grade: "LE: 4",
    },
    {
      action: "Take performance status into account before going ahead",
      why: "The risk of side effects from the treatment is high, so general fitness matters.",
      source: "sitc-iec-2020",
      quote: "Patient Eastern Cooperative Oncology Group (ECOG) performance status should be taken into account before proceeding with CAR T cell therapy, given the high risk of treatment-associated toxicity.",
    },
    {
      action: "Check the EBMT eligibility points: ECOG performance status above 2 is not recommended, there is no upper age limit, current systemic immunosuppressive treatment is a contraindication, and infection or a history of CNS disease needs an individual risk-benefit assessment",
      why: "EBMT bases the decision on physical condition rather than age, and asks for active infection to be controlled and on treatment before cells are collected.",
      source: "ebmt-2019",
    },
    {
      action: "Do not proceed with recent or active bleeding in the brain",
      why: "SITC lists this among its recommendations on neurological side effects as a reason not to give CAR T cells.",
      source: "sitc-iec-2020",
      quote: "Patients with evidence of recent or active intracranial hemorrhage should not undergo CAR T cell therapy",
      grade: "LE: 4",
    },
    {
      action: "Refer for neurological review if there is a history of inflammatory neurological disease or current cancer in the brain or spinal cord",
      why: "SITC notes that people whose disease involves the central nervous system may need earlier treatment if neurological side effects develop.",
      source: "sitc-iec-2020",
      quote: "Patients with history of inflammatory neurological conditions or current CNS disease involvement should be referred for additional neurological consultation prior to initiating CAR T cell therapy.",
    },
    {
      action: "Take baseline CRP, ferritin, LDH, blood count, a comprehensive metabolic panel including magnesium and phosphate, and an echocardiogram or MUGA scan",
      why: "Baseline values let the team recognise side effects early; the centre sets the levels it requires, often those it uses for an autologous transplant.",
      source: "sitc-iec-2020",
      quote: "Prior to CAR T cell therapy, treating physicians should order CRP, ferritin, lactate dehydrogenase (LDH), complete blood counts, comprehensive metabolic panel (including Mg/Pho), and transthoracic echocardiogram (TTE) or multigated acquisition (MUGA) scan. Required levels of these clinical parameters should be established by institutional standard operating parameters and are often similar to those required for a patient undergoing autologous hematopoietic stem cell transplantation (auto-SCT)",
      grade: "LE: 4",
    },
    {
      action: "Screen organ function against the EBMT minimum: neutrophils above 1.0 x 10⁹/L, AST and ALT below 5 times the upper limit of normal, creatinine clearance above 30 mL/min, left ventricular ejection fraction above 40%, with echocardiography for pericardial effusion and an ECG",
      why: "EBMT asks for caution when creatinine clearance is below 60 mL/min, and for the cause of any pericardial effusion to be looked for.",
      source: "ebmt-2019",
    },
    {
      action: "In the US, plan for the patient to stay near a healthcare facility for at least two weeks after infusion and not to drive for two weeks, checking the product's own label",
      why: "This is the period for which the revised US labels ask for monitoring for cytokine release syndrome and neurological side effects.",
      source: "fda-rems-2025",
      quote: "Specifically, labeling update included revision to language to monitor patients for at least two weeks including daily monitoring for at least one week; to instruct patients to remain within proximity of a healthcare facility for at least two weeks; and to advise patients to avoid driving for two weeks following product administration",
    },
    {
      action: "In Europe, follow the product's label and the centre's instructions, which can be longer: EBMT advised at least 4 weeks within 1 hour's travel of the hospital with a caregiver always present",
      why: "EBMT gives the risk of delayed neurological side effects as its reason for advising against driving for 8 weeks.",
      source: "ebmt-2019",
      quote: "On discharge, they should be instructed to remain within 1 hour’s travel of the treating hospital for at least 4 weeks following the infusion, during which time a caregiver should always be present.",
    },
  ],
  bestInClass: {
    statement: "For who should be referred, the EBMT 2025 indications are the most recent guideline read in full: CAR T cells are standard of care (S/I, grade I meaning at least one well-executed randomised trial) for large B-cell lymphoma that is primary refractory or relapses early, and the standard after a failed autograft (S/II); autologous transplant stays standard for late relapse (S/II). EBMT 2025 leaves one point open: for early chemosensitive relapse it rates CAR T S/I but also calls autologous transplant a valid clinical option (CO/II). For the eligibility work-up, EBMT/JACIE 2019 (ungraded) asks for a multidisciplinary decision in a designated centre and prints thresholds (ECOG above 2 not recommended, creatinine clearance above 30 mL/min, ejection fraction above 40%), while SITC 2020 (LE: 4) leaves the required levels to institutional standards; both ask for baseline blood tests and cardiac imaging and extra care with CNS disease. The EBMT/JACIE/EHA 2022 update, the current European edition, was read only as an abstract, so the 2019 thresholds may have changed. On how long to stay near the hospital the sources differ: at least two weeks on most US labels since June 2025, two to four weeks on the two European labels read, four weeks in EBMT 2019.",
    sources: ["ebmt-2025", "sitc-iec-2020", "ebmt-2019", "fda-rems-2025", "ebmt-eha-2022", "yescarta-smpc-eu", "kymriah-smpc-eu"],
  },
  variants: [
    {
      name: "Autologous transplant for early chemosensitive relapse in complete remission (EBMT 2025)",
      differs: "For large B-cell lymphoma relapsing early but reaching complete remission on salvage, consolidates with high-dose therapy and autologous transplant rather than CAR T cells.",
      evidence: "Rated CO/II; a retrospective analysis found better progression-free survival with autologous transplant than CAR T in this group, but included no second-line CAR T, and more than half of its patients had tisagenlecleucel.",
      sources: ["ebmt-2025"],
    },
    {
      name: "US monitoring after the REMS (FDA 2025 and the current US labels)",
      differs: "Removes the requirement for specially certified hospitals with immediate on-site tocilizumab; the FDA says labels were revised to monitoring for at least two weeks with daily monitoring for at least one, proximity for at least two weeks and no driving for two weeks. The six other US labels read say at least 2 weeks for both; the idecabtagene vicleucel label says at least one week near a healthcare facility and no driving for at least one week.",
      evidence: "Regulatory decision: the FDA cites established management guidelines, the experience of haematology and oncology teams, and stable adverse event reporting.",
      sources: ["fda-rems-2025", "abecma-label-us", "yescarta-label-us", "kymriah-label-us", "breyanzi-label-us", "tecartus-label-us", "carvykti-label-us", "aucatzyl-label-us"],
    },
    {
      name: "European labels and EBMT 2019: longer periods near the hospital and without driving",
      differs: "The European Yescarta label asks patients to remain near a qualified treatment centre or appropriately trained clinical facility for at least 2 weeks and not to drive for a minimum of 4 weeks or until neurological reactions have fully resolved. The European Kymriah label asks patients to remain within 2 hours of travel of a qualified clinical facility for at least 4 weeks, and its package leaflet says not to drive in the 8 weeks after infusion. EBMT 2019 advised at least 4 weeks within 1 hour's travel with a caregiver always present, no driving for 8 weeks, and preferably a responsible adult available for the first 3 months.",
      evidence: "Regulatory product information and ungraded expert recommendations. The European labels of the other five products were not read.",
      sources: ["yescarta-smpc-eu", "kymriah-smpc-eu", "ebmt-2019"],
    },
    {
      name: "England: second-line CAR T cells for large B-cell lymphoma (NICE TA895 and TA1048)",
      differs: "NICE TA895 (June 2023) recommends axicabtagene ciloleucel within the Cancer Drugs Fund for diffuse large B-cell lymphoma in adults that is refractory to, or has relapsed within 12 months after, first-line chemoimmunotherapy when an autologous stem cell transplant is suitable, under a managed access agreement. NICE TA1048 (March 2025) recommends lisocabtagene maraleucel for large B-cell lymphoma in the same setting, only if an autologous stem cell transplant would be considered suitable, and says age should not be used as a proxy for fitness when judging that.",
      evidence: "NICE technology appraisals; not graded. NICE judged the evidence on how long people live after lisocabtagene maraleucel uncertain.",
      sources: ["nice-ta895", "nice-ta1048"],
    },
  ],
  grades: [
    { claim: "CAR T for primary refractory or early relapsed large B-cell lymphoma", grade: "S/I (standard of care; grade I evidence)", source: "ebmt-2025" },
    { claim: "Autologous transplant for late relapse of large B-cell lymphoma", grade: "S/II; CAR T CO/II", source: "ebmt-2025" },
    { claim: "CAR T for large B-cell lymphoma relapsing after autologous transplant", grade: "S/II", source: "ebmt-2025" },
    { claim: "CAR T for mantle cell lymphoma in second response after a first-line BTK inhibitor", grade: "CO/III", source: "ebmt-2025" },
    { claim: "CAR T for myeloma after three prior lines including an immunomodulatory agent, a proteasome inhibitor and an anti-CD38 antibody", grade: "S/II", source: "ebmt-2025" },
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
      gradingScheme: "Each indication is categorised S (standard of care), CO (clinical option after careful assessment of risks and benefits), D (developmental) or GNR (generally not recommended), with an evidence grade defined in the supplementary table: I, at least one well-executed randomised trial; II, at least one well-designed trial without randomisation, cohort or case-controlled studies, multiple time-series or dramatic results from uncontrolled experiments; III, opinions of respected authorities, descriptive studies or reports of expert committees.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    { ...EBMT_2019, accessed: "2026-11-17" },
    { ...SITC_IEC_2020, accessed: "2026-11-17" },
    { ...FDA_REMS_2025, accessed: "2026-11-17" },
    EBMT_2022,
    dailymed("yescarta-label-us", "YESCARTA (axicabtagene ciloleucel) US prescribing information, DailyMed version 23, published 17 August 2026", "Kite Pharma", "9b70606e-b99c-4272-a0f1-b5523cce0c59"),
    dailymed("breyanzi-label-us", "BREYANZI (lisocabtagene maraleucel) US prescribing information, DailyMed version 15, published 5 March 2026", "Juno Therapeutics", "594bb413-af3b-4b97-afb3-bfe2b174f2ed"),
    dailymed("kymriah-label-us", "KYMRIAH (tisagenlecleucel) US prescribing information, DailyMed version 19, published 28 October 2026", "Novartis", "aad3ba54-dfd3-4cb3-9e2b-c5ef89559189"),
    dailymed("tecartus-label-us", "TECARTUS (brexucabtagene autoleucel) US prescribing information, DailyMed version 17, published 24 June 2026", "Kite Pharma", "a16108c2-7ca7-45af-965e-54bda4713022"),
    dailymed("aucatzyl-label-us", "AUCATZYL (obecabtagene autoleucel) US prescribing information, DailyMed version 6, published 6 July 2026", "Autolus", "4fef6986-b988-45e4-8c20-b14f0ef1f538"),
    dailymed("abecma-label-us", "ABECMA (idecabtagene vicleucel) US prescribing information, DailyMed version 20, published 3 August 2026", "Celgene", "b90c1fe7-f5cc-464e-958a-af36e9c26d7c"),
    dailymed("carvykti-label-us", "CARVYKTI (ciltacabtagene autoleucel) US prescribing information, DailyMed version 19, published 12 August 2026", "Janssen Biotech", "7d040b91-3fb8-41db-ba7f-60a36f06e2c2"),
    {
      key: "yescarta-smpc-eu",
      label: "Yescarta (axicabtagene ciloleucel) European product information: summary of product characteristics and package leaflet, the PDF served on 17 November 2026",
      publisher: "Kite Pharma EU; European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/yescarta-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "kymriah-smpc-eu",
      label: "Kymriah (tisagenlecleucel) European product information: summary of product characteristics and package leaflet, the PDF served on 17 November 2026",
      publisher: "Novartis Europharm; European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/kymriah-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ta895",
      label: "Axicabtagene ciloleucel for treating relapsed or refractory diffuse large B-cell lymphoma after first-line chemoimmunotherapy (NICE technology appraisal guidance TA895), recommendations",
      publisher: "National Institute for Health and Care Excellence",
      year: 2023,
      url: "https://www.nice.org.uk/guidance/ta895/chapter/1-Recommendations",
      gradingScheme: "NICE does not grade its recommendations.",
      read: "public-summary",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ta1048",
      label: "Lisocabtagene maraleucel for treating relapsed or refractory large B-cell lymphoma after first-line chemoimmunotherapy when a stem cell transplant is suitable (NICE technology appraisal guidance TA1048), recommendations",
      publisher: "National Institute for Health and Care Excellence",
      year: 2025,
      url: "https://www.nice.org.uk/guidance/ta1048/chapter/1-Recommendations",
      gradingScheme: "NICE does not grade its recommendations.",
      read: "public-summary",
      accessed: "2026-11-17",
    },
  ],
  upgrades: [],
  gaps: [
    "The EBMT/JACIE/EHA 2022 update, the current European edition of the 2019 recommendations, was read only as an abstract (the publisher refuses a script and there is no open copy), so the eligibility thresholds given here are those of the 2019 edition and may have been revised.",
    "On 17 November 2026 the EBMT/JACIE 2019 eligibility table and minimum tests table were read as text from the open PDF. The bilirubin limit prints there as below 34, or 43 with Gilbert syndrome, with the unit shown as mmol/L, which could not be confirmed; it is left out of the steps. The table's header calls the criteria those of clinical trials; the EBMT column is its own recommendation.",
    "EBMT 2025 describes idecabtagene vicleucel as approved after four or more lines of therapy; the current US label read here says two or more. EBMT 2025 gives the labelled use of CAR T cells in mantle cell lymphoma as after at least two therapies including a BTK inhibitor; the current US label for brexucabtagene autoleucel states no number of lines. The European labels for the five products other than Yescarta and Kymriah were not read.",
    "England: only the recommendation pages of NICE TA895 and TA1048 were read. Whether TA895's Cancer Drugs Fund recommendation has since been reviewed was not checked, and the other NICE appraisals of CAR T-cell products were not read. On 17 November 2026 the NHS England page on CAR T-cell therapy returned an empty response to a script, so how patients in England are referred and which centres or panels decide is not described here. Reimbursement decisions in other countries were not read.",
    "No source read gives a single period for staying near the hospital: the US labels, the two European labels read and EBMT 2019 differ, as set out above. The patient's own centre decides.",
    "SITC leaves required organ-function levels to institutional standards; the thresholds here are EBMT 2019's, and the pivotal trial protocols themselves were not read.",
  ],
  drugs: ["axicabtagene-ciloleucel", "lisocabtagene-maraleucel", "tisagenlecleucel", "brexucabtagene-autoleucel", "idecabtagene-vicleucel", "ciltacabtagene-autoleucel", "obecabtagene-autoleucel"],
  technologies: ["car-t", "autologous-stem-cell-transplant"],
  cancers: ["dlbcl", "primary-mediastinal-b-cell-lymphoma", "follicular-lymphoma", "mantle-cell-lymphoma", "all-leukemia", "multiple-myeloma"],
  terms: ["lymphoma-tx-car-t-pathway"],
  related: ["car-t-apheresis", "car-t-bridging", "car-t-lymphodepletion", "car-t-infection-prevention"],
  tags: ["protocol", "cell-therapy", "car-t"],
});

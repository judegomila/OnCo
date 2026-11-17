import type { PersonInput } from "@/lib/schema";

/**
 * People: Spain, added for /countries/es/. Public professional information only; every record carries at least one
 * paper with a DOI or PubMed id resolved through Crossref or Europe PMC.
 *
 * These are the Hospital Clínic de Barcelona clinicians and scientists behind the two academic CAR-T products the
 * Spanish health service funds, ARI-0001 and ARI0002h. Roles are taken from the affiliation lines of their most
 * recent indexed papers (PubMed, read 3 November 2026; Europe PMC was returning server errors that day) and change
 * over time; treat `role` as indicative. Each is linked from the trials and papers in src/data/country-records-es.ts.
 */
const asOf = "2026-11-03";
const pm = (q: string) => ({ label: "PubMed author search", url: `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(q)}` });
type P = Omit<PersonInput, "kind" | "asOf">;
const p = (x: P): PersonInput => ({ kind: "person", asOf, links: x.profiles, ...x });

const cart19 = { title: "CART19-BE-01: A Multicenter Trial of ARI-0001 Cell Therapy in Patients with CD19(+) Relapsed/Refractory Malignancies", journal: "Molecular Therapy", year: 2021, doi: "10.1016/j.ymthe.2020.09.027" };
const mcl = { title: "Varnimcabtagene autoleucel (ARI-0001) in relapsed or refractory mantle cell lymphoma", journal: "HemaSphere", year: 2026, doi: "10.1002/hem3.70388" };
const bcma = { title: "Fractionated initial infusion and booster dose of ARI0002h, a humanised, BCMA-directed CAR T-cell therapy, for patients with relapsed or refractory multiple myeloma (CARTBCMA-HCB-01)", journal: "The Lancet Oncology", year: 2023, doi: "10.1016/S1470-2045(23)00222-X" };

export const peopleES: PersonInput[] = [
  p({ id: "julio-delgado", name: "Julio Delgado", role: "Haematologist, Department of Hematology, Hospital Clínic de Barcelona and FRCB-IDIBAPS; Universitat de Barcelona", institutionId: "hospital-clinic-barcelona", institutions: ["hospital-clinic-barcelona"],
    specialisms: ["Chronic lymphocytic leukaemia", "CAR-T cell therapy", "Lymphoid malignancies"],
    tldr: "Barcelona haematologist and senior author of CART19-BE-01, the trial that led Spain to authorise a CAR-T made by a public hospital.",
    summary: "Julio Delgado is a haematologist in the Department of Hematology at Hospital Clínic de Barcelona and the FRCB-IDIBAPS research institute, according to the affiliation on his 2026 paper on varnimcabtagene autoleucel in mantle cell lymphoma. He is the senior author of the 2021 Molecular Therapy report of CART19-BE-01, the academic trial of the CD19 CAR-T ARI-0001, in which the measurable residual disease-negative complete response rate at day 100 in acute lymphoblastic leukaemia was 71.1%, and an author of the CARTBCMA-HCB-01 report on the hospital's BCMA CAR-T ARI0002h. He also led the ARI-0001 report in chronic lymphocytic leukaemia and Richter's transformation as senior author.",
    profiles: [pm("Delgado J[Author] ARI-0001")],
    papers: [cart19, bcma, mcl, { title: "Results of ARI-0001 CART19 Cells in Patients With Chronic Lymphocytic Leukemia and Richter's Transformation", journal: "Frontiers in Oncology", year: 2022, doi: "10.3389/fonc.2022.828471" }] }),

  p({ id: "valentin-ortiz-maldonado", name: "Valentín Ortiz-Maldonado", aka: ["Valentín Ortíz-Maldonado", "V Ortiz-Maldonado"], role: "Haematologist, Department of Hematology, Hospital Clínic de Barcelona and FRCB-IDIBAPS; Universitat de Barcelona", institutionId: "hospital-clinic-barcelona", institutions: ["hospital-clinic-barcelona"],
    specialisms: ["CAR-T cell therapy", "Acute lymphoblastic leukaemia", "Lymphoma"],
    tldr: "Barcelona haematologist who led the clinical reports of ARI-0001, the hospital's own CD19 CAR-T, from the first trial to its use in mantle cell lymphoma.",
    summary: "Valentín Ortiz-Maldonado is a haematologist at Hospital Clínic de Barcelona and FRCB-IDIBAPS, according to the affiliation on his 2026 HemaSphere paper. He is first author of the 2021 Molecular Therapy report of CART19-BE-01, in which 47 of 58 included patients were treated with ARI-0001 and grade 3 or higher cytokine release syndrome in acute lymphoblastic leukaemia occurred in 26.7% of patients before the dose was split into fractions and 4.3% after, and senior author of the 2026 report on varnimcabtagene autoleucel in relapsed or refractory mantle cell lymphoma, where overall response among 27 infused patients was 89%. He also first-authored the ARI-0001 reports in leukaemia with isolated extramedullary disease and in chronic lymphocytic leukaemia.",
    profiles: [pm("Ortiz-Maldonado V[Author]")],
    papers: [cart19, mcl, { title: "Results of ARI-0001 CART19 cell therapy in patients with relapsed/refractory CD19-positive acute lymphoblastic leukemia with isolated extramedullary disease", journal: "American Journal of Hematology", year: 2022, doi: "10.1002/ajh.26519" }] }),

  p({ id: "manel-juan", name: "Manel Juan", role: "Immunologist, Department of Immunology, Hospital Clínic de Barcelona and FRCB-IDIBAPS; Universitat de Barcelona", institutionId: "hospital-clinic-barcelona", institutions: ["hospital-clinic-barcelona"],
    specialisms: ["Immunology", "CAR-T design and manufacturing", "Advanced therapies"],
    tldr: "The Barcelona immunologist whose team designed ARI-0001 from the hospital's own antibody and made it in-house, so a public hospital could give CAR-T at lower cost.",
    summary: "Manel Juan is an immunologist in the Department of Immunology at Hospital Clínic de Barcelona and FRCB-IDIBAPS, according to the affiliation on his 2026 HemaSphere paper. The AEMPS's announcement of its February 2021 authorisation of ARI-0001 says a team led by Dr Manel Juan developed the new CD19 CAR-T from the hospital's own monoclonal antibody, and quotes him on a robust, reproducible preparation method that lowers production cost so the therapy can be affordable for academic institutions. He is an author of the CART19-BE-01 and CARTBCMA-HCB-01 reports and of the 2022 Bone Marrow Transplantation article on the hospital exemption route by which ARI-0001 was authorised.",
    profiles: [pm("Juan M[Author] ARI-0001"), { label: "AEMPS: authorisation of ARI-0001 (10 February 2021)", url: "https://www.aemps.gob.es/informa/la-aemps-autoriza-el-car-t-ari-0001-del-hospital-clinic-para-pacientes-con-leucemia-linfoblastica-aguda/" }],
    papers: [{ title: "The hospital exemption pathway for the approval of advanced therapy medicinal products: an underused opportunity? The case of the CAR-T ARI-0001", journal: "Bone Marrow Transplantation", year: 2022, doi: "10.1038/s41409-021-01463-y" }, cart19, bcma, { title: "Point-Of-Care CAR T-Cell Production (ARI-0001) Using a Closed Semi-automatic Bioreactor: Experience From an Academic Phase I Clinical Trial", journal: "Frontiers in Immunology", year: 2020, doi: "10.3389/fimmu.2020.00482" }] }),
];

import type { ProtocolInput } from "@/lib/schema";

type Source = ProtocolInput["sources"][number];

/*
 * Guidelines shared by the cell therapy and T-cell engager toxicity protocols. Each was fetched raw on 11 November 2026
 * into a scratch directory and read as text:
 * - SITC 2020 immune effector cell guideline: open access, full text from Europe PMC (PMC7745688, full-text XML).
 * - ASTCT 2019 consensus grading: the author manuscript in PMC (PMC12180426), full text through the NCBI E-utilities
 *   efetch service; the publisher page was not used.
 * - ASTCT 2026 updated consensus grading: abstract only (Europe PMC); no full text was available to a script.
 * - EBMT/JACIE 2019 best practice recommendations: open access, full text from Europe PMC (PMC7012497).
 * - EBMT/JACIE/EHA 2022 update (Annals of Oncology): abstract only; no Europe PMC full text and the publisher refused
 *   a script.
 * - ASCO 2021 CAR T-cell guideline: abstract only; ascopubs.org returned 403.
 * - FDA safety communication of 26 June 2025 on the end of the CAR T-cell REMS: the fda.gov page, full text.
 * Every DOI was resolved through Crossref or Europe PMC and its title checked.
 */
export const SITC_IEC_2020: Source = {
  key: "sitc-iec-2020",
  label: "Society for Immunotherapy of Cancer (SITC) clinical practice guideline on immune effector cell-related adverse events",
  publisher: "SITC, Journal for ImmunoTherapy of Cancer",
  year: 2020,
  url: "https://europepmc.org/article/PMC/PMC7745688",
  doi: "10.1136/jitc-2020-001511",
  gradingScheme: "Oxford Centre for Evidence-Based Medicine Levels of Evidence 2 (2016), printed after a recommendation as LE: 1 (systematic review) to LE: 5 (mechanism-based reasoning); recommendations without an LE are expert consensus.",
  read: "full-text",
  accessed: "2026-11-11",
};

export const ASTCT_2019: Source = {
  key: "astct-2019",
  label: "ASTCT Consensus Grading for Cytokine Release Syndrome and Neurologic Toxicity Associated with Immune Effector Cells",
  publisher: "American Society for Transplantation and Cellular Therapy, Biology of Blood and Marrow Transplantation",
  year: 2019,
  url: "https://europepmc.org/article/PMC/PMC12180426",
  doi: "10.1016/j.bbmt.2018.12.758",
  gradingScheme: "A consensus grading system (grades 1 to 4), not a set of graded recommendations.",
  read: "full-text",
  accessed: "2026-11-11",
};

export const ASTCT_2026: Source = {
  key: "astct-2026",
  label: "ASTCT Consensus Grading for Toxicities after Immune Effector Cell Therapy",
  publisher: "American Society for Transplantation and Cellular Therapy, Transplantation and Cellular Therapy",
  year: 2026,
  url: "https://europepmc.org/abstract/MED/42711241",
  doi: "10.1016/j.jtct.2026.05.020",
  gradingScheme: "Consensus definitions and grading criteria; the abstract gives no grades.",
  read: "abstract",
  accessed: "2026-11-11",
};

export const EBMT_2019: Source = {
  key: "ebmt-2019",
  label: "Management of adults and children undergoing chimeric antigen receptor T-cell therapy: best practice recommendations of the European Society for Blood and Marrow Transplantation (EBMT) and the Joint Accreditation Committee of ISCT and EBMT (JACIE)",
  publisher: "EBMT and JACIE, Haematologica",
  year: 2020,
  url: "https://europepmc.org/article/PMC/PMC7012497",
  doi: "10.3324/haematol.2019.229781",
  gradingScheme: "Expert best practice recommendations; not graded.",
  read: "full-text",
  accessed: "2026-11-11",
};

export const EBMT_2022: Source = {
  key: "ebmt-eha-2022",
  label: "Management of adults and children receiving CAR T-cell therapy: 2021 best practice recommendations of the European Society for Blood and Marrow Transplantation (EBMT) and the Joint Accreditation Committee of ISCT and EBMT (JACIE) and the European Haematology Association (EHA)",
  publisher: "EBMT, JACIE and EHA, Annals of Oncology",
  year: 2022,
  url: "https://europepmc.org/abstract/MED/34923107",
  doi: "10.1016/j.annonc.2021.12.003",
  read: "abstract",
  accessed: "2026-11-11",
};

export const ASCO_CART_2021: Source = {
  key: "asco-cart-2021",
  label: "Management of Immune-Related Adverse Events in Patients Treated With Chimeric Antigen Receptor T-Cell Therapy: ASCO Guideline",
  publisher: "ASCO, Journal of Clinical Oncology",
  year: 2021,
  url: "https://europepmc.org/abstract/MED/34724386",
  doi: "10.1200/JCO.21.01992",
  gradingScheme: "The abstract states that, because high-quality evidence is scarce, the recommendations are based on expert consensus.",
  read: "abstract",
  accessed: "2026-11-11",
};

export const FDA_REMS_2025: Source = {
  key: "fda-rems-2025",
  label: "FDA Eliminates Risk Evaluation and Mitigation Strategies (REMS) for Autologous Chimeric Antigen Receptor (CAR) T cell Immunotherapies (FDA Safety Communication, 26 June 2025)",
  publisher: "US Food and Drug Administration",
  year: 2025,
  url: "https://www.fda.gov/vaccines-blood-biologics/safety-availability-biologics/fda-eliminates-risk-evaluation-and-mitigation-strategies-rems-autologous-chimeric-antigen-receptor",
  gradingScheme: "A regulatory safety communication; not graded.",
  read: "full-text",
  accessed: "2026-11-11",
};

export const CELL_GAPS = [
  "The ASTCT 2026 update of the consensus grading for CRS, ICANS and IEC-HS was read only as its abstract, which says the panel considered updating the 2019 criteria but does not say what changed. The 2019 grading is used here; check the 2026 paper before relying on a grade boundary.",
  "The EBMT/JACIE/EHA 2022 recommendations (the current European edition) and the ASCO 2021 CAR T-cell guideline were read only as abstracts; the 2019 EBMT/JACIE edition was read in full and is cited where the steps rest on EBMT.",
];

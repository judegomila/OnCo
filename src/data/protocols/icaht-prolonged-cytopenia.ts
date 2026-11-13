import { protocol } from "./helpers";
import { ASTCT_2026, EBMT_2019, SITC_IEC_2020 } from "./cell-therapy-sources";

/*
 * Immune effector cell-associated haematotoxicity (ICAHT): low blood counts that persist or return after CAR T-cell
 * therapy, graded, investigated and treated.
 *
 * What was read, and how (11 November 2026, fetched raw and read as text):
 * - EHA/EBMT ICAHT consensus grading and best practice recommendations (Rejeski et al., Blood 2023): abstract only,
 *   from the Europe PMC REST API. Not in PMC; the publisher PDF (ashpublications.org, CC BY-NC-ND) returned 403 to a
 *   script, so its grading table and recommendations were not read.
 * - Beyar-Katz, Rejeski and Shouval, Haematologica 2025 review of ICAHT: open access, full text from Europe PMC
 *   (PMC12130777). Its three tables are images and were not read.
 * - SITC 2020 immune effector cell guideline (cytopenias section) and EBMT/JACIE 2019: full text, see
 *   ./cell-therapy-sources.ts. ASTCT 2026 grading update: abstract only.
 * DOIs resolved through Europe PMC. Quotes checked by script against the raw text.
 */
export const icahtProlongedCytopenia = protocol({
  id: "icaht-prolonged-cytopenia",
  name: "Prolonged low blood counts after CAR T-cell therapy (ICAHT): grading, work-up and treatment",
  aka: ["ICAHT", "immune effector cell-associated hematotoxicity", "prolonged cytopenia after CAR T", "post-CAR T neutropenia", "CAR-HEMATOTOX", "stem cell boost after CAR T"],
  domain: "cell-therapy-toxicity",
  tldr: "Low blood counts are the commonest side effect of CAR T-cell therapy. Most recover within weeks, but in some people counts stay low for months, raising infection risk. Teams check counts often, give growth factor injections, transfusions and infection-preventing tablets, and look at the bone marrow if counts stay low after about a month. Some need their own stored stem cells.",
  simple: "After CAR T-cell therapy, blood counts can stay low for a long time. Your team will check them, may give injections or transfusions, and will help protect you from infection.",
  summary: "EHA/EBMT 2023 named immune effector cell-associated haematotoxicity (ICAHT) and graded it by depth and duration of neutropenia, separately for early (day 0 to 30) and late (after day +30) cytopenia; it also set out risk factors, the pre-infusion CAR-HEMATOTOX score and recommendations on growth factors, prophylaxis, transfusion, autologous stem cell boost and allogeneic transplant. Only its abstract could be read. ASTCT's 2026 consensus grading update also addresses ICAHT (abstract only).\n\nSITC 2020 (LE: 4 unless stated): for cytopenias in the first 28 days, follow blood counts without marrow biopsy; for cytopenias beyond 28 days, bone marrow aspirate and biopsy with viral studies; consider holding G-CSF until day 14 or CRS has resolved; consider growth factors for ANC under 500 per microlitre after day 28; no GM-CSF in the CRS window (LE: 5); antibacterial and antifungal prophylaxis for all with persistent neutropenia. The Haematologica 2025 review (Beyar-Katz, Rejeski, Shouval): watch and wait for early cytopenias; irradiated red cells and platelets because of fludarabine exposure; red cell threshold 7 to 8 g/dL; platelets at 10 or below (20 with bleeding, fever or infection); thrombopoietin receptor agonists for persistent thrombocytopenia (retrospective data only); autologous CD34+ boost for G-CSF-refractory ICAHT, with 70 to 100% neutrophil recovery in retrospective series, and allogeneic transplant as a last option. No prospective or randomised trial of any ICAHT treatment exists.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team"],
    where: ["ward", "outpatient-clinic"],
  },
  population: "Adults and children after CD19- or BCMA-directed CAR T-cell therapy for lymphoma, leukaemia or myeloma. The ICAHT grading was built for CAR T cells; its use after bispecific antibodies is not established (Haematologica 2025 review).",
  trigger: "Neutropenia, thrombocytopenia or anaemia after CAR T-cell infusion, especially beyond day 28 or recurring after initial recovery.",
  steps: [
    {
      action: "Before lymphodepletion, assess bone marrow reserve and inflammation, for example with the CAR-HEMATOTOX score",
      why: "Knowing who is at high risk lets the team plan growth factors, back-up stem cells or a gentler conditioning regimen.",
      source: "haematologica-2025",
      quote: "The use of the recently introduced and widely applied CAR-HEMATOTOX score, evaluating these parameters, allows for early identification of patients at high risk of developing ICAHT.",
    },
    {
      action: "Grade neutropenia by depth and duration, separately for days 0 to 30 and after day 30",
      why: "A shared grading lets teams compare and decide when to escalate.",
      source: "eha-ebmt-icaht-2023",
      quote: "For the grading of ICAHT, a classification system based on depth and duration of neutropenia was developed for early (day 0-30) and late (after day +30) cytopenia.",
    },
    {
      action: "In the first 28 days, follow blood counts with a differential; a marrow biopsy is usually not needed",
      why: "Early low counts are expected after lymphodepletion and often recover on their own.",
      source: "sitc-iec-2020",
      quote: "For cytopenias occurring within the first 28 days after IEC infusion, a bone marrow biopsy may not be indicated—complete blood counts with differential may be adequate for follow-up",
      grade: "LE: 4",
    },
    {
      action: "If cytopenias persist beyond 28 days, perform bone marrow aspirate and biopsy, including tests for viruses",
      why: "Relapse, infection of the marrow or a new marrow disorder can each cause low counts and need different treatment.",
      source: "sitc-iec-2020",
      quote: "For cytopenias persisting >28 days after IEC infusion, bone marrow biopsy and bone marrow aspiration should be performed in addition to the standard work-up to assess response and cellularity, including assessment of viral pathogens",
      grade: "LE: 4",
    },
    {
      action: "Consider holding G-CSF until day 14 or until CRS has resolved",
      why: "Growth factor during peak CAR T-cell expansion was feared to worsen cytokine release syndrome.",
      source: "sitc-iec-2020",
      quote: "To avoid interaction with the peak CRS risk and CART expansion period, consider holding growth factors until day 14 from infusion of CAR T cells or once CRS has resolved",
      grade: "LE: 4",
    },
    {
      action: "For neutrophils persistently below 500 per microlitre after day 28, consider G-CSF; avoid GM-CSF in the CRS window",
      why: "Growth factor shortens severe neutropenia; GM-CSF in particular may aggravate CRS.",
      source: "sitc-iec-2020",
      quote: "For persistent neutropenia (ANC<500 cells/µL) after day 28 following CAR T cell infusion, growth factors should be considered",
      grade: "LE: 4",
    },
    {
      action: "Give antibacterial and antifungal prophylaxis to everyone with persistent neutropenia",
      why: "Long neutropenia is when serious bacterial and fungal infections happen.",
      source: "sitc-iec-2020",
      quote: "All patients who develop persistent neutropenia should have antibacterial and antifungal prophylaxis.",
    },
    {
      action: "Transfuse irradiated red cells and platelets",
      why: "Fludarabine in the lymphodepletion raises the risk of transfusion-associated graft-versus-host disease.",
      source: "haematologica-2025",
      quote: "Blood products are typically administered based on a patient’s blood counts, and it is imperative that red blood cells and platelets be irradiated, in part because of the prior exposure to fludarabine, which can increase the risk of transfusion-associated graft-versus-host disease (Table 3).",
    },
    {
      action: "For persistent transfusion-dependent thrombocytopenia, a thrombopoietin receptor agonist (eltrombopag or romiplostim) may be considered",
      why: "These drugs stimulate platelet production; the evidence is retrospective and uncontrolled.",
      source: "haematologica-2025",
      quote: "Thrombopoietin receptor agonists, such as eltrombopag and romiplostim, are potential treatment options for patients with persistent thrombocytopenia after CAR T-cell therapy, as they stimulate platelet production and may reduce transfusion dependence.",
    },
    {
      action: "For G-CSF-refractory, persistent ICAHT, give an autologous stem cell boost if the person's own stem cells are stored",
      why: "In retrospective series most patients recovered neutrophils within one to three weeks of a boost, without conditioning.",
      source: "haematologica-2025",
      quote: "For patients with G-CSF-refractory and persistent ICAHT, an autologous stem cell boost is emerging as a promising therapeutic option.",
    },
    {
      action: "Where no stored stem cells exist, consider allogeneic transplant only after other options and only if the person is not critically ill",
      why: "It can restore blood production but carries its own serious risks.",
      source: "haematologica-2025",
      quote: "In cases in which autologous stem cells are not available, allogeneic SCT may be considered, although this option is typically reserved for patients who have exhausted other treatment options and are not critically ill.",
    },
  ],
  bestInClass: {
    statement: "The EHA/EBMT 2023 consensus is the reference for grading and managing ICAHT, but only its abstract could be read, so its recommendations are not reproduced step by step here. The steps rest on SITC 2020 (graded LE: 4 and LE: 5) and on a 2025 review co-written by the EHA/EBMT consensus's first author, which describes the same toolkit (CAR-HEMATOTOX, grading by depth and duration, G-CSF, transfusion, thrombopoietin receptor agonists, autologous boost, allogeneic transplant). The sources disagree on the timing of G-CSF: SITC 2020 says consider holding it until day 14 or until CRS has resolved; the 2025 review describes G-CSF from day +2 for high-risk patients and cites retrospective data that early G-CSF did not increase CRS progression. EBMT/JACIE 2019 notes that about a third of patients have neutropenia beyond day 30 and that growth factor support may be indicated early.",
    sources: ["eha-ebmt-icaht-2023", "sitc-iec-2020", "haematologica-2025", "ebmt-2019"],
  },
  variants: [
    {
      name: "Prophylactic G-CSF from day +2 in high-risk patients (Haematologica 2025 review)",
      differs: "Starts G-CSF on day +2 after infusion when CAR-HEMATOTOX predicts high risk, rather than holding it until day 14 or CRS resolution.",
      evidence: "Retrospective: in 197 patients given prophylactic G-CSF or pegylated G-CSF, progression from grade 1 CRS to higher grades did not increase, and neutrophil recovery was faster. A myeloma series found more CRS with cumulative G-CSF above 1,500 micrograms or more than 5 days.",
      sources: ["haematologica-2025"],
    },
    {
      name: "Bendamustine instead of fludarabine-cyclophosphamide lymphodepletion for high-risk patients (Haematologica 2025 review)",
      differs: "Uses bendamustine, described as less myelosuppressive in some cases, for patients at high risk of ICAHT.",
      evidence: "Described as an option by the review; no comparative trial is cited for ICAHT outcomes.",
      sources: ["haematologica-2025"],
    },
    {
      name: "Back-up stem cell collection before CAR T-cell therapy (Haematologica 2025 review)",
      differs: "Collects and stores haematopoietic stem cells before CAR T-cell therapy in patients at significant risk, so a boost is possible later.",
      evidence: "Number needed to treat and cost-effectiveness unknown; a worldwide survey found a boost available in under 30% of patients, or not at all for 61% of responders.",
      sources: ["haematologica-2025"],
    },
    {
      name: "Low-dose prednisone for late ICAHT (Haematologica 2025 review)",
      differs: "Prednisone 0.5 mg/kg/day for prolonged cytopenia, mainly after CAR T cells for B-cell ALL, when G-CSF fails.",
      evidence: "Described by the review as very circumstantial; one small series of 17 patients.",
      sources: ["haematologica-2025"],
    },
  ],
  grades: [
    { claim: "No marrow biopsy needed for cytopenias in the first 28 days", grade: "LE: 4", source: "sitc-iec-2020" },
    { claim: "Marrow aspirate and biopsy with viral studies for cytopenias beyond 28 days", grade: "LE: 4", source: "sitc-iec-2020" },
    { claim: "Growth factors for ANC below 500 after day 28", grade: "LE: 4", source: "sitc-iec-2020" },
    { claim: "No GM-CSF until the CRS risk period is over", grade: "LE: 5", source: "sitc-iec-2020", quote: "If growth factors are administered, GM-CSF is not recommended until the risk period for CRS is over (usually 2 weeks) (LE: 5)." },
    { claim: "Evidence base for ICAHT treatments overall", grade: "expert opinion", source: "haematologica-2025", quote: "There are no prospective or randomized clinical trials specifically focused on ICAHT therapeutic approaches, and current recommendations are largely based on expert opinion." },
  ],
  sources: [
    {
      key: "eha-ebmt-icaht-2023",
      label: "Immune effector cell-associated hematotoxicity: EHA/EBMT consensus grading and best practice recommendations",
      publisher: "European Hematology Association and EBMT, Blood",
      year: 2023,
      url: "https://europepmc.org/abstract/MED/37300386",
      doi: "10.1182/blood.2023020578",
      gradingScheme: "Consensus of an international panel of 36 CAR T-cell experts; the abstract gives no grades.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "haematologica-2025",
      label: "Immune effector cell-associated hematotoxicity: mechanisms, clinical manifestations, and management strategies (Beyar-Katz, Rejeski and Shouval, review)",
      publisher: "Haematologica",
      year: 2025,
      url: "https://europepmc.org/article/PMC/PMC12130777",
      doi: "10.3324/haematol.2024.286027",
      gradingScheme: "Narrative review; recommendations are not graded and the authors state current recommendations are largely expert opinion.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    SITC_IEC_2020,
    EBMT_2019,
    ASTCT_2026,
  ],
  upgrades: [],
  gaps: [
    "The EHA/EBMT 2023 ICAHT consensus could not be read beyond its abstract: it is not in PubMed Central and the publisher refused a script. Its grade thresholds (neutrophil count and duration for each grade), and its own recommendations on G-CSF timing, are therefore not stated here.",
    "The ASTCT 2026 consensus grading update, which considered ICAHT among emerging toxicities, was read only as its abstract.",
    "The Haematologica 2025 review's tables (grading systems, risk factors, management) are images and were not read; figures quoted are from its prose.",
    "No prospective or randomised trial of any ICAHT treatment exists in the sources read, and the sources disagree on when G-CSF may start.",
    "The optimal CD34+ dose for an autologous boost is unknown, and the risk of tumour cells in the boost product is unproven either way.",
  ],
  drugs: ["filgrastim", "eltrombopag", "romiplostim"],
  technologies: ["car-t", "rejuv-tx-prolonged-cytopenias"],
  institutions: ["eha", "sitc"],
  terms: ["cytopenias", "lymphodepletion"],
  related: ["car-t-infection-prevention", "crs-grading-and-management", "iec-hs-management"],
  tags: ["protocol", "cell-therapy", "car-t"],
});

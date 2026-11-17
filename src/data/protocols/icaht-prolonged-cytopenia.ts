import { protocol } from "./helpers";
import { ASTCT_2026, EBMT_2019, SITC_IEC_2020 } from "./cell-therapy-sources";

/*
 * Immune effector cell-associated haematotoxicity (ICAHT): low blood counts that persist or return after CAR T-cell
 * therapy, graded, investigated and treated.
 *
 * What was read, and how (first on 11 November 2026; re-read claim by claim in a second accuracy pass on
 * 17 November 2026, every source fetched raw and read as text):
 * - EHA/EBMT ICAHT consensus (Rejeski et al., Blood 2023): abstract only, from the Europe PMC REST API on
 *   17 November 2026. Still not in PMC; ashpublications.org again answered 403 (a bot check) to a script.
 * - Beyar-Katz, Rejeski and Shouval, Haematologica 2025 review: full text XML from Europe PMC (PMC12130777), and, new
 *   on 17 November 2026, the publisher's own open PDF (haematologica.org, CC BY-NC) through pdftotext. The three
 *   tables are images in PMC but text in the PDF, so they were read this time; Tables 1 and 3 were also checked by
 *   eye against the rendered page. Nothing is quoted from a table.
 * - Rejeski et al., Blood Advances 2024 (PMC11007437), which applies the EHA/EBMT grading and prints its table: full
 *   text XML from Europe PMC, added on 17 November 2026 as a second witness to the grade thresholds.
 * - SITC 2020 (cytopenias and infection sections) and EBMT/JACIE 2019: full text XML from Europe PMC, and the ASTCT
 *   2026 abstract; the copies a sibling checker fetched on 16 November 2026 were re-used and re-read.
 * DOIs resolved through Crossref and Europe PMC and titles checked. All 13 quotes checked by script against the raw
 * text (XML tags and citation-number cross-references stripped, whitespace normalised, nothing else).
 */
export const icahtProlongedCytopenia = protocol({
  id: "icaht-prolonged-cytopenia",
  name: "Prolonged low blood counts after CAR T-cell therapy (ICAHT): grading, work-up and treatment",
  aka: ["ICAHT", "immune effector cell-associated hematotoxicity", "prolonged cytopenia after CAR T", "post-CAR T neutropenia", "CAR-HEMATOTOX", "stem cell boost after CAR T"],
  domain: "cell-therapy-toxicity",
  tldr: "Low blood counts are the commonest side effect of CAR T-cell therapy. Early low counts often recover on their own, but in some people they last or return over months, raising infection risk. Teams check counts, may give growth factor injections, transfusions and medicines to prevent infection, and examine the bone marrow if counts stay low past about a month. A few are offered stored stem cells.",
  simple: "After CAR T-cell therapy, blood counts can stay low for a long time. Your team will check them, may give injections or transfusions, and will help protect you from infection.",
  summary: "EHA/EBMT 2023 named immune effector cell-associated haematotoxicity (ICAHT) and graded it by depth and duration of neutropenia, separately for early (day 0 to 30) and late (after day +30) cytopenia; it also covers risk factors, pre-infusion scores such as CAR-HEMATOTOX, and recommendations on growth factors, anti-infective prophylaxis, transfusion, autologous stem cell boost and allogeneic transplant. Only its abstract could be read. Its grading table is reproduced in two open papers. Early ICAHT, as the Haematologica 2025 review tabulates it: grade 1, neutrophils below 500 per microlitre for 1 to 6 days; grade 2, for 7 to 13 days; grade 3, for 14 days or more, or below 100 per microlitre for 7 days or more; grade 4, never above 500 per microlitre, or below 100 per microlitre for 14 days or more. Late ICAHT (after day +30, non-transient neutropenia): grade 1 below 1,500, grade 2 below 1,000, grade 3 below 500 and grade 4 below 100 per microlitre. A 2024 validation study in Blood Advances prints the same table with each threshold as 'at or below'. That study lists the CAR-HEMATOTOX components as C-reactive protein, ferritin, neutrophil count, platelet count and haemoglobin, measured before lymphodepletion. ASTCT's 2026 consensus grading update names ICAHT among the emerging toxicities it considered (abstract only).\n\nSITC 2020: for cytopenias in the first 28 days a marrow biopsy may not be indicated and blood counts with differential may be adequate (LE: 4); for cytopenias persisting beyond 28 days, bone marrow aspirate and biopsy including viral studies (LE: 4); consider holding growth factors until day 14 or until CRS has resolved (LE: 4); growth factors should be considered for ANC under 500 per microlitre after day 28 (LE: 4); GM-CSF not recommended until the CRS risk period is over, usually 2 weeks (LE: 5); antibacterial and antifungal prophylaxis for all with persistent neutropenia (no LE printed). The Haematologica 2025 review (Beyar-Katz, Rejeski, Shouval): watch and wait is reasonable for early cytopenias; irradiated red cells and platelets, in part because of fludarabine exposure; red cell threshold 7 to 8 g/dL in haemodynamically stable patients; platelets at 10 x 10^9/L or below (20 or below with active bleeding, fever or infection), thresholds it says come largely from the transplant literature; therapeutic G-CSF when ANC is below 500 per microlitre; thrombopoietin receptor agonists for persistent thrombocytopenia (retrospective data only, no control arms); autologous CD34+ boost for G-CSF-refractory ICAHT, with 70 to 100% neutrophil recovery in retrospective series, and allogeneic transplant when other options are exhausted. The review states that there are no prospective or randomised trials of ICAHT treatments.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team"],
    where: ["ward", "outpatient-clinic"],
  },
  population: "Adults and children after CD19- or BCMA-directed CAR T-cell therapy for lymphoma, leukaemia or myeloma. The term ICAHT has been applied to CAR T-cell therapy; the grading has not yet been broadly applied after bispecific antibodies (Haematologica 2025 review).",
  trigger: "Neutropenia, thrombocytopenia or anaemia after CAR T-cell infusion, especially beyond day 28 or recurring after initial recovery.",
  steps: [
    {
      action: "Before lymphodepletion, assess bone marrow reserve and inflammation, for example with the CAR-HEMATOTOX score",
      why: "Knowing who is at high risk lets the team consider early growth factor, a different lymphodepletion regimen or collecting back-up stem cells. The review describes this as standard in many centres, not as a graded recommendation.",
      source: "haematologica-2025",
      quote: "The use of the recently introduced and widely applied CAR-HEMATOTOX score, evaluating these parameters, allows for early identification of patients at high risk of developing ICAHT.",
    },
    {
      action: "Grade neutropenia by depth and duration, separately for days 0 to 30 and after day 30",
      why: "One count on one day says little; how low the neutrophils fall and for how long is what the grading captures. The grade thresholds are in the summary above.",
      source: "eha-ebmt-icaht-2023",
      quote: "For the grading of ICAHT, a classification system based on depth and duration of neutropenia was developed for early (day 0-30) and late (after day +30) cytopenia.",
    },
    {
      action: "In the first 28 days, follow blood counts with a differential; a marrow biopsy may not be needed",
      why: "Early low counts are expected after lymphodepletion, and the Haematologica 2025 review says they often resolve on their own.",
      source: "sitc-iec-2020",
      quote: "For cytopenias occurring within the first 28 days after IEC infusion, a bone marrow biopsy may not be indicated—complete blood counts with differential may be adequate for follow-up",
      grade: "LE: 4",
    },
    {
      action: "If cytopenias persist beyond 28 days, perform bone marrow aspirate and biopsy, including tests for viruses",
      why: "The marrow sample shows the response to treatment and how well the marrow is working, and can be tested for viruses. The Haematologica 2025 review adds that persistently low counts can signal relapse and that a new myeloid cancer should be ruled out.",
      source: "sitc-iec-2020",
      quote: "For cytopenias persisting >28 days after IEC infusion, bone marrow biopsy and bone marrow aspiration should be performed in addition to the standard work-up to assess response and cellularity, including assessment of viral pathogens",
      grade: "LE: 4",
    },
    {
      action: "Consider holding G-CSF until day 14 or until CRS has resolved",
      why: "The aim is to keep growth factor away from the period when CRS risk and CAR T-cell expansion peak.",
      source: "sitc-iec-2020",
      quote: "To avoid interaction with the peak CRS risk and CART expansion period, consider holding growth factors until day 14 from infusion of CAR T cells or once CRS has resolved",
      grade: "LE: 4",
    },
    {
      action: "For neutrophils persistently below 500 per microlitre after day 28, consider growth factors; do not use GM-CSF until the CRS risk period is over (LE: 5)",
      why: "G-CSF is given to shorten neutropenia and lower infection risk (Haematologica 2025 review). SITC notes that GM-CSF may in theory aggravate CRS, and puts the risk period at usually 2 weeks.",
      source: "sitc-iec-2020",
      quote: "For persistent neutropenia (ANC<500 cells/µL) after day 28 following CAR T cell infusion, growth factors should be considered",
      grade: "LE: 4",
    },
    {
      action: "Give antibacterial and antifungal prophylaxis to everyone with persistent neutropenia",
      why: "Prolonged neutropenia leaves a person open to bacterial infection and, when the marrow stays empty, to invasive fungal infection. SITC prints no evidence level for this sentence.",
      source: "sitc-iec-2020",
      quote: "All patients who develop persistent neutropenia should have antibacterial and antifungal prophylaxis.",
    },
    {
      action: "Transfuse irradiated red cells and platelets",
      why: "Earlier fludarabine can raise the risk of transfusion-associated graft-versus-host disease.",
      source: "haematologica-2025",
      quote: "Blood products are typically administered based on a patient’s blood counts, and it is imperative that red blood cells and platelets be irradiated, in part because of the prior exposure to fludarabine, which can increase the risk of transfusion-associated graft-versus-host disease (Table 3).",
    },
    {
      action: "For prolonged thrombocytopenia needing repeated platelet transfusions, a thrombopoietin receptor agonist (eltrombopag or romiplostim) may be considered",
      why: "These drugs stimulate platelet production. The review lists them among strategies with lower levels of evidence: its table suggests starting when 2 or more units of platelets are needed in 7 days, and the studies are retrospective with no control arm.",
      source: "haematologica-2025",
      quote: "Thrombopoietin receptor agonists, such as eltrombopag and romiplostim, are potential treatment options for patients with persistent thrombocytopenia after CAR T-cell therapy, as they stimulate platelet production and may reduce transfusion dependence.",
    },
    {
      action: "For G-CSF-refractory, persistent ICAHT, consider an autologous stem cell boost if the person's own stem cells are stored",
      why: "In retrospective series 70 to 100% of patients recovered neutrophils, typically within 7 to 21 days of a boost, without conditioning. The review's table says to consider it for grade 3 or higher early ICAHT that has not responded to G-CSF beyond day +14.",
      source: "haematologica-2025",
      quote: "For patients with G-CSF-refractory and persistent ICAHT, an autologous stem cell boost is emerging as a promising therapeutic option.",
    },
    {
      action: "Where no stored stem cells exist, consider allogeneic transplant only after other options and only if the person is not critically ill",
      why: "Reports, mainly in acute lymphoblastic leukaemia, suggest it can be done safely, but the review says many of these patients are too unwell to be offered it.",
      source: "haematologica-2025",
      quote: "In cases in which autologous stem cells are not available, allogeneic SCT may be considered, although this option is typically reserved for patients who have exhausted other treatment options and are not critically ill.",
    },
  ],
  bestInClass: {
    statement: "The EHA/EBMT 2023 consensus is the reference for grading and managing ICAHT, but only its abstract could be read, so its recommendations are not reproduced step by step here; its grade thresholds are given as two open papers reprint them. The steps rest on SITC 2020 (graded LE: 4 and LE: 5) and on a 2025 review co-written by the EHA/EBMT consensus's first author, which describes the same toolkit (CAR-HEMATOTOX, grading by depth and duration, G-CSF, transfusion, thrombopoietin receptor agonists, autologous boost, allogeneic transplant) and says its recommendations are largely expert opinion. The sources differ on the timing of G-CSF: SITC 2020 says consider holding growth factors until day 14 or until CRS has resolved; the 2025 review describes G-CSF from day +2 for patients at high risk and cites a retrospective study in which prophylactic G-CSF did not significantly increase progression of CRS. EBMT/JACIE 2019 notes that about a third of patients have neutropenia beyond day +30, and that growth factor support may be indicated in the early stages of the day +28 to day +100 period.",
    sources: ["eha-ebmt-icaht-2023", "sitc-iec-2020", "haematologica-2025", "icaht-validation-2024", "ebmt-2019"],
  },
  variants: [
    {
      name: "Prophylactic G-CSF from day +2 in high-risk patients (Haematologica 2025 review)",
      differs: "Starts G-CSF on day +2 after infusion when CAR-HEMATOTOX predicts high risk (the review's table gives day +2 or +5, by individual risk and institutional guidelines), rather than holding it until day 14 or CRS resolution.",
      evidence: "Retrospective: a study including 197 patients given prophylactic G-CSF or pegylated G-CSF showed no significant increase in progression from grade 1 CRS to higher grades, with faster neutrophil recovery and shorter antibiotic use. A myeloma study found no significant difference in CRS severity with G-CSF, but more CRS with cumulative G-CSF above 1,500 micrograms or more than 5 days of it.",
      sources: ["haematologica-2025"],
    },
    {
      name: "Bendamustine instead of fludarabine-cyclophosphamide lymphodepletion for high-risk patients (Haematologica 2025 review)",
      differs: "Uses bendamustine, described as less myelosuppressive in some cases, for patients at high risk of ICAHT; the review says this might reduce the risk.",
      evidence: "Described as an option by the review, which cites two studies of bendamustine lymphodepletion and gives no figures for ICAHT.",
      sources: ["haematologica-2025"],
    },
    {
      name: "Back-up stem cell collection before CAR T-cell therapy (Haematologica 2025 review)",
      differs: "Collects and stores haematopoietic stem cells before CAR T-cell therapy in patients at significant risk, so a boost is possible later.",
      evidence: "The review says the number needed to treat is unclear and the health economics need to be considered. A worldwide survey found that, even for patients with an earlier autologous transplant, a boost was available in under 30% of patients, or not at all for 61% of responders.",
      sources: ["haematologica-2025"],
    },
    {
      name: "Low-dose prednisone for late ICAHT (Haematologica 2025 review)",
      differs: "Oral prednisone 0.5 mg/kg/day for prolonged cytopenia (beyond day 30 in the review's table), mainly after CAR T cells for B-cell ALL, when G-CSF fails.",
      evidence: "Described by the review as very circumstantial. In one small study, six of 17 patients who had responded to corticosteroids saw counts fall when the steroid was stopped and improve when it was restarted.",
      sources: ["haematologica-2025"],
    },
  ],
  grades: [
    { claim: "Marrow biopsy may not be indicated for cytopenias in the first 28 days", grade: "LE: 4", source: "sitc-iec-2020" },
    { claim: "Marrow aspirate and biopsy with viral studies for cytopenias beyond 28 days", grade: "LE: 4", source: "sitc-iec-2020" },
    { claim: "Consider holding growth factors until day 14 or until CRS has resolved", grade: "LE: 4", source: "sitc-iec-2020" },
    { claim: "Growth factors should be considered for ANC below 500 after day 28", grade: "LE: 4", source: "sitc-iec-2020" },
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "icaht-validation-2024",
      label: "Applying the EHA/EBMT grading for ICAHT after CAR-T: comparative incidence and association with infections and mortality (Rejeski and colleagues)",
      publisher: "American Society of Hematology, Blood Advances",
      year: 2024,
      url: "https://europepmc.org/article/PMC/PMC11007437",
      doi: "10.1182/bloodadvances.2023011767",
      gradingScheme: "A retrospective cohort study that applies the EHA/EBMT ICAHT grades; it makes no graded recommendations.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    { ...SITC_IEC_2020, accessed: "2026-11-16" },
    { ...EBMT_2019, accessed: "2026-11-16" },
    { ...ASTCT_2026, accessed: "2026-11-16" },
  ],
  upgrades: [],
  gaps: [
    "The EHA/EBMT 2023 ICAHT consensus could not be read beyond its abstract: it is not in PubMed Central, and on 17 November 2026 the publisher again refused a script. Its grade thresholds are given here as two open papers reprint them (Table 1 of the Haematologica 2025 review and Table 1 of the Blood Advances 2024 study); the two agree on the days and the counts, but the review prints each count as 'below' and the study as 'at or below'. The consensus's own recommendations, including on G-CSF timing and anti-infective prophylaxis, were not read; what is said here about management comes from SITC 2020 and the review.",
    "The ASTCT 2026 consensus grading update was read only as its abstract, which names ICAHT among the emerging toxicities for which the panel considered existing grading or wrote new criteria. Whether it changes the EHA/EBMT grading is not known here; check the 2026 paper before relying on a grade boundary.",
    "The Haematologica 2025 review's three tables are images in PubMed Central. On 17 November 2026 they were read as text from the publisher's open PDF, and Tables 1 and 3 were checked by eye against the page; nothing is quoted from them.",
    "The CAR-HEMATOTOX score's points and the cut-off for high risk are not stated here: the review's prose does not give them, the Blood Advances 2024 study lists only the five components, and the paper that built the score (Rejeski and colleagues, Blood 2021) was not read.",
    "A grading for low platelets after CAR T-cell therapy (T-ICAHT) was proposed in Blood in 2025 (doi 10.1182/blood.2025028833) by a group that includes authors of the EHA/EBMT consensus. It is a study, not a society consensus, and is not built into the steps here. Europe PMC also lists French recommendations on blood toxicity after CAR T cells (SFGM-TC, Bulletin du Cancer 2025), which were not read.",
    "The Haematologica 2025 review states that there are no prospective or randomised trials of ICAHT treatments, and the sources differ on when G-CSF may start.",
    "The optimal CD34+ dose for an autologous boost is unknown, and the risk of tumour cells in the boost product is described by the review as potential and unproven.",
    "None of the sources read gives a list of warning signs for patients or a time limit for reporting them, so this page gives none; a person's own CAR T-cell team says when and how to call.",
  ],
  drugs: ["filgrastim", "eltrombopag", "romiplostim"],
  technologies: ["car-t", "rejuv-tx-prolonged-cytopenias"],
  institutions: ["eha", "sitc"],
  terms: ["cytopenias", "lymphodepletion"],
  related: ["car-t-infection-prevention", "crs-grading-and-management", "iec-hs-management"],
  tags: ["protocol", "cell-therapy", "car-t"],
});

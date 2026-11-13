import { protocol } from "./helpers";
import { EBMT_2019, EBMT_2022, SITC_IEC_2020 } from "./cell-therapy-sources";

/*
 * Bridging therapy: treatment given between T-cell collection (leukapheresis) and lymphodepletion while autologous
 * CAR T cells are manufactured.
 *
 * What was read, and how (11 November 2026, fetched raw and read as text):
 * - EBMT/JACIE 2019 best practice recommendations: full text (PMC7012497), bridging therapy section read in full.
 * - Rasche et al., expert panel consensus on bridging before anti-BCMA CAR T in myeloma (Bone Marrow Transplantation
 *   2026): open access, full text from Europe PMC (PMC13349869). Its Table 1 is flattened text and was read as such.
 *   The panel and manuscript were funded by Johnson & Johnson, which markets talquetamab and ciltacabtagene autoleucel.
 * - Modified Delphi consensus on CAR T-cell administration in adult B-ALL (Blood 2026): abstract only (Europe PMC).
 * - SITC 2020 (baseline disease assessment) full text; EBMT/JACIE/EHA 2022 abstract only (./cell-therapy-sources.ts).
 * DOIs resolved through Europe PMC. Quotes checked by script against the raw text.
 */
export const carTBridging = protocol({
  id: "car-t-bridging",
  name: "Bridging therapy while CAR T cells are manufactured",
  aka: ["bridging therapy", "CAR-T bridging", "bridging chemotherapy", "holding therapy before CAR T", "bridging radiotherapy"],
  domain: "cell-therapy-toxicity",
  tldr: "Making CAR T cells from your own blood takes several weeks. During that wait many people have a short course of treatment, called bridging, to keep the cancer under control so they are well enough for the CAR T cells. It is given only after the blood cells have been collected, and is chosen so it will not cause infections or organ problems that could delay the infusion.",
  simple: "While your CAR T cells are being made, you may have a short treatment to keep the cancer in check. It starts after your cells are collected.",
  summary: "EBMT/JACIE 2019: bridging maintains disease control between collection and infusion; the aim is control rather than remission. Give it only after leukapheresis; avoid regimens that cause infection, bleeding or organ dysfunction; omit it for stable, low-burden disease when turnaround is short; avoid long half-life immunotherapies that may impair CAR T-cell expansion (alemtuzumab, daratumumab, checkpoint inhibitors, brentuximab vedotin). Lymphoma options include rituximab, gemcitabine, oxaliplatin, bendamustine, pixantrone, oral regimens such as PEP-C or cyclophosphamide 100 mg daily, lenalidomide or ibrutinib, high-dose steroids, or radiotherapy to bulky or symptomatic masses. In ALL, CRS risk tracks blast burden, so bridging matters more, usually with reduced-dose B-ALL agents. Frequent monitoring is mandatory, at the treating or referring centre.\n\nMyeloma (Rasche 2026, industry-funded expert consensus, anti-BCMA CAR T): bridging for the large majority; target at least partial response; switch regimen if not reached; usually 6 to 8 weeks; about 2 weeks' washout before lymphodepletion; avoid agents the patient was refractory to and anti-BCMA agents before anti-BCMA CAR T; consider radiotherapy for extramedullary disease; talquetamab for heavily pretreated patients. SITC 2020: assess disease burden by imaging, marrow or lumbar puncture before starting CAR T-cell therapy. The adult B-ALL Delphi consensus (Blood 2026) covers bridging and pre-CAR T leukaemia staging, but only its abstract was read.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "multidisciplinary-team", "nurse"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "ward"],
  },
  population: "Adults and children with B-cell lymphoma, B-cell acute lymphoblastic leukaemia or multiple myeloma waiting for an autologous CAR T-cell product. Choice of regimen depends on the disease; the myeloma consensus covers triple-class exposed patients before anti-BCMA CAR T only.",
  trigger: "After leukapheresis, while the CAR T-cell product is being manufactured.",
  steps: [
    {
      action: "Give bridging therapy only after the T cells have been collected",
      why: "Chemotherapy before collection can damage the T cells the product is made from.",
      source: "ebmt-2019",
      quote: "Whatever treatment is chosen, bridging therapy should only be given after leukapheresis so that the quality of the CAR T-cell product is not affected.",
    },
    {
      action: "Aim for disease control, not remission",
      why: "The goal is to arrive at the infusion well enough, with organs working, rather than to cure the cancer beforehand.",
      source: "ebmt-2019",
      quote: "In brief, the aim is not so much to achieve disease remission as to establish adequate disease control prior to the CAR T-cell infusion.",
    },
    {
      action: "Choose a regimen unlikely to cause infection, bleeding or organ damage",
      why: "Lymphodepletion and CAR T cells follow soon after, and complications from bridging can delay or prevent them.",
      source: "ebmt-2019",
      quote: "Bridging therapy should therefore ideally not induce major complications, such as infections, bleeding or any organ dysfunction that might interfere with the planned lymphodepleting therapy and CAR T-cell infusion.",
    },
    {
      action: "Consider omitting bridging when lymphoma is stable and low-burden and the product will arrive soon",
      why: "Treatment that is not needed only adds side effects.",
      source: "ebmt-2019",
      quote: "Bridging therapy can be omitted in the presence of stable, low burden disease if the turn-around time for the CAR T cells is expected to be short.",
    },
    {
      action: "Avoid long half-life immunotherapies such as alemtuzumab, daratumumab, checkpoint inhibitors and brentuximab vedotin",
      why: "They may still be in the body at infusion and stop the CAR T cells expanding or persisting.",
      source: "ebmt-2019",
      quote: "Importantly, certain agents, especially immunotherapeutic drugs with a longer half-life, may interfere with the expansion or persistence of the infused CAR T cells and should be avoided.",
    },
    {
      action: "For lymphoma, choose from chemo-immunotherapy, oral regimens, targeted drugs, high-dose steroids or radiotherapy to bulky or symptomatic sites, guided by prior response and where the disease is",
      why: "What worked before, how much disease there is and where it sits decide what will control it fastest with least harm.",
      source: "ebmt-2019",
      quote: "When choosing bridging therapy for lymphoma patients, factors to be considered include the prior response to chemotherapy and chemo-immunotherapy, the overall tumor burden and the distribution and sites of tumor involvement.",
    },
    {
      action: "In acute lymphoblastic leukaemia, use bridging to lower the blast count, usually with reduced-dose leukaemia drugs",
      why: "The more leukaemia at infusion, the higher the risk of severe cytokine release syndrome.",
      source: "ebmt-2019",
      quote: "In ALL, the risk of CRS has been found to correlate with the leukemic blast burden at the time of the CAR T-cell infusion.",
    },
    {
      action: "In myeloma, aim for at least a partial response, and switch to a different bridging regimen if it is not reached",
      why: "Lower tumour burden at infusion is linked with better results and fewer toxicities after anti-BCMA CAR T.",
      source: "rasche-mm-2026",
      quote: "We agreed that patients who do not achieve ≥partial response after initial BT should switch to a different (second-line) BT regimen; the objectives of this may differ.",
    },
    {
      action: "In myeloma, do not bridge with an anti-BCMA agent before anti-BCMA CAR T",
      why: "Short exposure to the same target could encourage resistance; the effect is unknown.",
      source: "rasche-mm-2026",
      quote: "Avoid anti-BCMA BT before anti-BCMA CAR-T therapy due to unknown effects of short-term use and resistance concerns.",
    },
    {
      action: "Where feasible, leave about two weeks between the end of bridging and lymphodepletion",
      why: "A gap lets bridging side effects settle and drugs wash out before conditioning.",
      source: "rasche-mm-2026",
      quote: "If feasible, we recommend an approximate 2-week wash-out period between BT and lymphodepleting chemotherapy, regardless of BT regimen.",
    },
    {
      action: "Monitor closely with blood tests and imaging during bridging, with clear communication between referring and treating centres",
      why: "Problems need to be caught early while waiting for the product.",
      source: "ebmt-2019",
      quote: "Frequent monitoring, including laboratory testing and imaging, is mandatory in order to prevent or rapidly treat complications that might arise while awaiting the arrival of the CAR T-cell product.",
    },
    {
      action: "Restage the disease by imaging, marrow or lumbar puncture as appropriate before starting CAR T-cell therapy",
      why: "Disease burden at infusion predicts the risk of severe toxicity and guides monitoring.",
      source: "sitc-iec-2020",
      quote: "Disease burden should be assessed via imaging and bone marrow evaluation and/or lumbar puncture, as appropriate, before initiating CAR T cell therapy.",
    },
  ],
  bestInClass: {
    statement: "EBMT/JACIE 2019 is the only general best practice text read in full and is the backbone here: bridging after collection, for control rather than remission, with low-toxicity agents, avoiding long half-life immunotherapies. It is ungraded, as are the other sources. The 2022 EBMT/JACIE/EHA update, which supersedes it, could be read only as its abstract. For myeloma the 2026 expert consensus differs from EBMT 2019 in two places: it recommends bridging for the large majority regardless of disease pace (EBMT 2019 allows omission in stable low-burden lymphoma), and it lists anti-CD38 antibody combinations as bridging options where EBMT 2019 names daratumumab among agents to avoid. The myeloma panel was funded by the manufacturer of the bispecific it recommends.",
    sources: ["ebmt-2019", "ebmt-eha-2022", "rasche-mm-2026", "sitc-iec-2020"],
  },
  variants: [
    {
      name: "Bridging for nearly everyone before anti-BCMA CAR T in myeloma (Rasche et al., 2026)",
      differs: "Uses bridging for the vast majority, including slowly progressing relapse; targets at least partial response; 6 to 8 weeks; switches regimen if no partial response; radiotherapy for extramedullary disease; anti-CD38, proteasome inhibitor, chemotherapy, venetoclax for t(11;14), or talquetamab in heavily pretreated patients.",
      evidence: "Qualitative interviews and a consensus workshop of 10 European experts, funded by Johnson & Johnson; supported by retrospective data such as the CARTITUDE-4 finding that a 25% or greater paraprotein fall after bridging went with longer progression-free survival.",
      sources: ["rasche-mm-2026"],
    },
    {
      name: "Adult B-ALL Delphi consensus (Blood 2026)",
      differs: "33 consensus statements on CAR T-cell administration in adult B-ALL, including bridging and pre-CAR T-cell leukaemia staging, from the ROCCA consortium.",
      evidence: "Modified Delphi with a 27-member validation group; only the abstract was read, so its specific bridging statements are not given here.",
      sources: ["rocca-all-2026"],
    },
  ],
  grades: [
    { claim: "EBMT/JACIE 2019 recommendations", grade: "not graded (consensus)", source: "ebmt-2019", quote: "Given the absence of randomized trial evidence in this field, a decision was made not to grade these recommendations." },
    { claim: "Myeloma bridging recommendations", grade: "expert consensus, not graded", source: "rasche-mm-2026" },
  ],
  sources: [
    EBMT_2019,
    EBMT_2022,
    {
      key: "rasche-mm-2026",
      label: "Experiences and expert panel consensus on bridging therapy before anti-BCMA CAR-T cell therapy in multiple myeloma (Rasche et al.)",
      publisher: "Bone Marrow Transplantation",
      year: 2026,
      url: "https://europepmc.org/article/PMC/PMC13349869",
      doi: "10.1038/s41409-026-02905-1",
      gradingScheme: "Expert panel consensus from interviews and a workshop with voting; recommendations are not graded. Funded by Johnson & Johnson Research & Development.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "rocca-all-2026",
      label: "Consensus recommendations for CAR T-cell administration in adult acute lymphoblastic leukemia: a modified Delphi study",
      publisher: "Blood",
      year: 2026,
      url: "https://europepmc.org/abstract/MED/42154904",
      doi: "10.1182/blood.2026033559",
      gradingScheme: "Modified Delphi consensus statements; the abstract gives no grades.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    SITC_IEC_2020,
  ],
  upgrades: [],
  gaps: [
    "The EBMT/JACIE/EHA 2022 recommendations, the current European edition, were read only as an abstract; whether they changed the 2019 bridging advice is not stated here.",
    "The adult B-ALL Delphi consensus (Blood 2026) was read only as an abstract; its bridging and staging statements are not reproduced.",
    "The EBMT 2019 washout table before leukapheresis is an image and was not read.",
    "No randomised trial compares bridging regimens, or bridging against no bridging, in any of the sources read.",
    "The International Myeloma Working Group guidance cited by the myeloma panel was not read directly.",
  ],
  drugs: ["rituximab", "gemcitabine", "oxaliplatin", "bendamustine", "pixantrone", "cyclophosphamide", "etoposide", "procarbazine", "lenalidomide", "ibrutinib", "dexamethasone", "methylprednisolone", "talquetamab", "venetoclax", "carfilzomib", "pomalidomide"],
  technologies: ["car-t"],
  cancers: ["dlbcl", "primary-mediastinal-b-cell-lymphoma", "mantle-cell-lymphoma", "follicular-lymphoma", "all-leukemia", "multiple-myeloma"],
  terms: ["bridging-therapy", "lymphoma-tx-car-t-pathway"],
  related: ["car-t-apheresis", "car-t-lymphodepletion"],
  tags: ["protocol", "cell-therapy", "car-t"],
});

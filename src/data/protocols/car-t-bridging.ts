import { protocol } from "./helpers";
import { EBMT_2019, EBMT_2022, SITC_IEC_2020 } from "./cell-therapy-sources";

/*
 * Bridging therapy: treatment given between T-cell collection (leukapheresis) and lymphodepletion while autologous
 * CAR T cells are manufactured.
 *
 * What was read, and how (first on 11 November 2026; every claim re-read against raw text on 17 November 2026 in a
 * second accuracy pass):
 * - EBMT/JACIE 2019 best practice recommendations: full text XML from Europe PMC (PMC7012497; a copy saved by a
 *   sibling checker late on 16 November was re-used) and the open Haematologica PDF (saved by a sibling on
 *   17 November, read with pdftotext). The bridging section was read in full. Table 4 (wash-out before
 *   leukapheresis) is an image in the XML but reads as text in the PDF, and was read there.
 * - Rasche et al., expert panel consensus on bridging before anti-BCMA CAR T in myeloma (Bone Marrow Transplantation
 *   2026): open access, full text XML fetched again from Europe PMC (PMC13349869) on 17 November. Its Table 1 is
 *   flattened text and was read as such. The panel meeting and manuscript were supported by Johnson & Johnson
 *   Research & Development; the paper's own reference list gives Janssen companies as the licence holders for
 *   talquetamab and ciltacabtagene autoleucel, and its data statement points to janssen.com for Johnson & Johnson.
 * - International Myeloma Working Group immunotherapy committee recommendation on sequencing immunotherapy
 *   (Costa et al., Leukemia 2025): the guidance the myeloma panel cites. Open access, full text XML from Europe PMC
 *   (PMC11879857), first read on 17 November; its holding and bridging section and its 9 recommendations were read.
 * - Modified Delphi consensus on CAR T-cell administration in adult B-ALL (Blood 2026): abstract only (Europe PMC);
 *   ashpublications.org returned 403 to one request on 17 November. Crossref lists an erratum of October 2026.
 * - SITC 2020 (baseline disease assessment): full text XML from Europe PMC (sibling copy of 16 November re-used).
 *   EBMT/JACIE/EHA 2022: abstract only (./cell-therapy-sources.ts); the abstract does not mention bridging.
 * DOIs resolved through Crossref and Europe PMC and titles checked. Every quote was checked by script against the
 * raw text (whitespace normalised, XML tags stripped, nothing else).
 */
export const carTBridging = protocol({
  id: "car-t-bridging",
  name: "Bridging therapy while CAR T cells are manufactured",
  aka: ["bridging therapy", "CAR-T bridging", "bridging chemotherapy", "holding therapy before CAR T", "bridging radiotherapy"],
  domain: "cell-therapy-toxicity",
  tldr: "Making CAR T cells from your own blood takes several weeks. During that wait many people have a short course of treatment, called bridging, to keep the cancer under control so they are well enough for the CAR T cells. It is given only after the blood cells have been collected, and is chosen so it will not cause infections or organ problems that could delay the infusion.",
  simple: "While your CAR T cells are being made, you may have a short treatment to keep the cancer in check. It starts after your cells are collected.",
  summary: "EBMT/JACIE 2019: bridging maintains disease control between collection and infusion; the aim is control rather than remission. Give it only after leukapheresis; ideally avoid regimens that cause infection, bleeding or organ dysfunction; it can be omitted for stable, low-burden disease when turnaround is expected to be short; avoid long half-life immunotherapies that may impair CAR T-cell expansion or persistence (examples given: alemtuzumab, daratumumab, checkpoint inhibitors, brentuximab vedotin). Lymphoma options include rituximab, gemcitabine, oxaliplatin, bendamustine or pixantrone, oral regimens such as PEP-C variants or cyclophosphamide 100 mg once daily, lenalidomide or ibrutinib, high-dose corticosteroids (for example dexamethasone 40 mg for 4 days), or radiotherapy to symptomatic or large masses; no radiotherapy dose is given. In ALL, CRS risk correlates with blast burden at infusion, so bridging is especially important, typically with agents from B-ALL regimens, often at reduced doses. Frequent monitoring is mandatory, at the treating or referring centre. EBMT Table 4 covers the earlier step, wash-out before leukapheresis: 3 days after short-acting cytotoxic drugs, 1 week after CNS-directed therapy, 3 to 4 weeks after high-dose chemotherapy, 4 weeks after donor lymphocyte infusion, ideally 7 days after systemic corticosteroids.\n\nMyeloma: the International Myeloma Working Group (2025) says to strongly consider bridging for high disease burden or risk of morbidity during the 4 to 6 weeks of manufacturing, with agents the myeloma is not known to resist, short, and with low risk of infection or prolonged cytopenia. Rasche 2026 (industry-supported expert consensus, anti-BCMA CAR T) goes further: bridging for the vast majority; at least partial response is an appropriate target, though less may do with low tumour burden; switch regimen if not reached; 6 to 8 weeks in the panel's experience; if feasible about 2 weeks' wash-out before lymphodepletion; avoid agents the patient was refractory to and anti-BCMA agents before anti-BCMA CAR T; consider radiation for extramedullary disease, painful bone lesions or fracture risk; consider talquetamab for heavily pretreated patients who have exhausted other effective therapies. SITC 2020: assess disease burden by imaging and marrow evaluation and/or lumbar puncture before starting CAR T-cell therapy. The adult B-ALL Delphi consensus (Blood 2026) covers bridging and pre-CAR T leukaemia staging, but only its abstract was read.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "multidisciplinary-team", "nurse"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "ward"],
  },
  population: "Adults and children with B-cell lymphoma, B-cell acute lymphoblastic leukaemia or multiple myeloma waiting for an autologous CAR T-cell product. Choice of regimen depends on the disease; the myeloma consensus covers triple-class exposed patients before anti-BCMA CAR T only.",
  trigger: "After leukapheresis, while the CAR T-cell product is being manufactured.",
  steps: [
    {
      action: "Give bridging therapy only after the T cells have been collected",
      why: "Collecting first means the bridging treatment cannot affect the quality of the CAR T-cell product.",
      source: "ebmt-2019",
      quote: "Whatever treatment is chosen, bridging therapy should only be given after leukapheresis so that the quality of the CAR T-cell product is not affected.",
    },
    {
      action: "Aim for disease control, not remission",
      why: "The goal is to stop the cancer progressing in a way that harms organs or prevents the infusion, rather than to clear it beforehand.",
      source: "ebmt-2019",
      quote: "In brief, the aim is not so much to achieve disease remission as to establish adequate disease control prior to the CAR T-cell infusion.",
    },
    {
      action: "Choose a regimen unlikely to cause infection, bleeding or organ damage",
      why: "Lymphodepletion and CAR T cells follow, and major complications from bridging could interfere with them.",
      source: "ebmt-2019",
      quote: "Bridging therapy should therefore ideally not induce major complications, such as infections, bleeding or any organ dysfunction that might interfere with the planned lymphodepleting therapy and CAR T-cell infusion.",
    },
    {
      action: "Consider omitting bridging when the disease is stable and low-burden and the product is expected to arrive soon",
      why: "Bridging exists to stop the disease progressing during the wait, which matters less when the disease is stable and the wait is short.",
      source: "ebmt-2019",
      quote: "Bridging therapy can be omitted in the presence of stable, low burden disease if the turn-around time for the CAR T cells is expected to be short.",
    },
    {
      action: "Avoid long half-life immunotherapies; EBMT's examples are alemtuzumab, daratumumab, checkpoint inhibitors and brentuximab vedotin",
      why: "They may interfere with the expansion or persistence of the infused CAR T cells.",
      source: "ebmt-2019",
      quote: "Importantly, certain agents, especially immunotherapeutic drugs with a longer half-life, may interfere with the expansion or persistence of the infused CAR T cells and should be avoided.",
    },
    {
      action: "For lymphoma, choose from chemo-immunotherapy, oral regimens, targeted drugs, high-dose corticosteroids or radiotherapy to symptomatic or large masses, weighing prior response, tumour burden and where the disease is",
      why: "Prior response, the amount of disease and where it sits are the factors EBMT says to weigh.",
      source: "ebmt-2019",
      quote: "When choosing bridging therapy for lymphoma patients, factors to be considered include the prior response to chemotherapy and chemo-immunotherapy, the overall tumor burden and the distribution and sites of tumor involvement.",
    },
    {
      action: "In acute lymphoblastic leukaemia, treat bridging as especially important, typically choosing drugs from B-ALL regimens, often at reduced doses",
      why: "The risk of cytokine release syndrome goes with the amount of leukaemia at infusion; doses are often reduced to lower the risk of infection and organ problems.",
      source: "ebmt-2019",
      quote: "In ALL, the risk of CRS has been found to correlate with the leukemic blast burden at the time of the CAR T-cell infusion.",
    },
    {
      action: "In myeloma, where bridging is given, prefer drugs the myeloma is not known to resist, keep it short, and keep the risk of infection or prolonged low blood counts low",
      why: "Bridging has to control the myeloma during manufacturing without causing problems that carry over into the CAR T-cell treatment.",
      source: "imwg-sequencing-2025",
      quote: "The ideal bridging therapy will contain agent(s) without known resistance from the patient’s myeloma, be short, with low risk of infection or prolonged cytopenias.",
    },
    {
      action: "In myeloma, aim for at least a partial response, and switch to a different bridging regimen if it is not reached",
      why: "The panel links high tumour burden with the typical CAR T toxicities, and effective bridging with better results. With low tumour burden it accepts a lesser response without progression.",
      source: "rasche-mm-2026",
      quote: "We agreed that patients who do not achieve ≥partial response after initial BT should switch to a different (second-line) BT regimen; the objectives of this may differ.",
    },
    {
      action: "In myeloma, do not bridge with an anti-BCMA agent before anti-BCMA CAR T",
      why: "The effects of short-term use on the same target are unknown, and there are concerns about resistance.",
      source: "rasche-mm-2026",
      quote: "Avoid anti-BCMA BT before anti-BCMA CAR-T therapy due to unknown effects of short-term use and resistance concerns.",
    },
    {
      action: "In myeloma, if feasible, leave about two weeks between the end of bridging and lymphodepleting chemotherapy",
      why: "The myeloma expert panel recommends this wash-out whichever bridging regimen was used; it does not state its reason. No other source read gives a wash-out before lymphodepletion.",
      source: "rasche-mm-2026",
      quote: "If feasible, we recommend an approximate 2-week wash-out period between BT and lymphodepleting chemotherapy, regardless of BT regimen.",
    },
    {
      action: "Monitor frequently with laboratory tests and imaging during bridging, with clear communication between referring and treating centres",
      why: "Complications that arise while waiting for the product need to be prevented or treated quickly.",
      source: "ebmt-2019",
      quote: "Frequent monitoring, including laboratory testing and imaging, is mandatory in order to prevent or rapidly treat complications that might arise while awaiting the arrival of the CAR T-cell product.",
    },
    {
      action: "Assess disease burden by imaging and bone marrow evaluation and/or lumbar puncture, as appropriate, before starting CAR T-cell therapy",
      why: "People with a higher disease burden before treatment are at greater risk of severe toxicity.",
      source: "sitc-iec-2020",
      quote: "Disease burden should be assessed via imaging and bone marrow evaluation and/or lumbar puncture, as appropriate, before initiating CAR T cell therapy.",
    },
  ],
  bestInClass: {
    statement: "EBMT/JACIE 2019 is the only general best practice text read in full and is the backbone here: bridging after collection, for control rather than remission, ideally without major complications, avoiding long half-life immunotherapies. It is ungraded, as are the other sources. The 2022 EBMT/JACIE/EHA update, which supersedes it, could be read only as its abstract. For myeloma the sources differ on who should be bridged: the International Myeloma Working Group (2025) says to strongly consider bridging for patients with high disease burden or at risk of morbidity during manufacturing, while the 2026 expert consensus of Rasche and colleagues says bridging should be used for a vast majority, including slowly progressing disease (EBMT 2019 allows omission in stable, low-burden disease when turnaround is short). Both myeloma texts list anti-CD38 antibody combinations as bridging options, where EBMT 2019 names daratumumab among agents to avoid. The Rasche panel's meeting and manuscript were supported by Johnson & Johnson; the paper's own reference list names Janssen-Cilag as the licence holder for talquetamab, the bispecific the panel recommends considering, and its data statement gives a janssen.com address for Johnson & Johnson.",
    sources: ["ebmt-2019", "ebmt-eha-2022", "imwg-sequencing-2025", "rasche-mm-2026", "sitc-iec-2020"],
  },
  variants: [
    {
      name: "Bridging for nearly everyone before anti-BCMA CAR T in myeloma (Rasche et al., 2026)",
      differs: "Uses bridging for the vast majority, including smouldering relapse and slowly progressing disease; at least partial response as the target; 6 to 8 weeks (1 to 2 cycles) in the panel's experience; switches regimen if no partial response; considers radiation for extramedullary disease, painful osteolytic lesions or fracture risk; lists chemotherapy, anti-CD38 antibody and proteasome inhibitor combinations, venetoclax, selinexor and talquetamab as options used after three or more prior lines, with talquetamab to be considered in heavily pretreated patients who have exhausted other effective therapies.",
      evidence: "Qualitative interviews and a consensus workshop of 10 European experts, supported by Johnson & Johnson; the panel cites an analysis of CARTITUDE-4 in which a 25% or greater paraprotein fall from baseline after bridging was associated with longer progression-free survival than a smaller fall, and a real-world German cohort. It gives no patient numbers for either.",
      sources: ["rasche-mm-2026"],
    },
    {
      name: "Selective bridging in myeloma (International Myeloma Working Group, 2025)",
      differs: "Strongly consider bridging for high disease burden or risk of morbidity during the 4 to 6 weeks of manufacturing, rather than for nearly everyone. Individualise the regimen: a carfilzomib-based combination is preferred for triple-class refractory, carfilzomib-naive disease; an anti-CD38 antibody combination where the disease is not triple-class refractory or is anti-CD38 naive or sensitive; a T-cell engager after apheresis is called reasonable, particularly if it targets a different antigen from the CAR T cells; local palliative radiation may be an option for symptomatic extramedullary disease. For treatment given before collection, it recommends a 2-week wash-out before apheresis after a proteasome inhibitor, immunomodulatory drug, naked antibody or corticosteroid, a minimum of 4 weeks after a T-cell engager, and avoiding high-dose alkylators and bendamustine when CAR T is the likely next therapy.",
      evidence: "A panel of 30 experts convened in March 2024 reviewed trials and real-world series and agreed 9 consensus recommendations; it says recommendations on T-cell engagers before CAR T rest on expert consensus and limited data. Not graded.",
      sources: ["imwg-sequencing-2025"],
    },
    {
      name: "Adult B-ALL Delphi consensus (Blood 2026)",
      differs: "33 consensus statements on CAR T-cell administration in adult B-ALL, including bridging and pre-CAR T-cell leukaemia staging, from the ROCCA consortium.",
      evidence: "Modified Delphi with a 9-member panel and a 27-member validation group; only the abstract was read, so its specific bridging statements are not given here.",
      sources: ["rocca-all-2026"],
    },
  ],
  grades: [
    { claim: "EBMT/JACIE 2019 recommendations", grade: "not graded (consensus)", source: "ebmt-2019", quote: "Given the absence of randomized trial evidence in this field, a decision was made not to grade these recommendations." },
    { claim: "Myeloma bridging recommendations (Rasche et al., 2026)", grade: "expert consensus, not graded", source: "rasche-mm-2026" },
    { claim: "International Myeloma Working Group recommendation to strongly consider bridging", grade: "consensus recommendation, not graded", source: "imwg-sequencing-2025", quote: "Strongly consider bridging therapy after apheresis for CAR T-cell manufacturing in patients with high disease burden or at risk of developing morbidity from MM during the 4-6 weeks of manufacturing." },
    { claim: "SITC 2020: assess disease burden before CAR T-cell therapy", grade: "no LE printed (expert consensus)", source: "sitc-iec-2020" },
  ],
  sources: [
    { ...EBMT_2019, accessed: "2026-11-17" },
    { ...EBMT_2022, accessed: "2026-11-17" },
    {
      key: "rasche-mm-2026",
      label: "Experiences and expert panel consensus on bridging therapy before anti-BCMA CAR-T cell therapy in multiple myeloma (Rasche et al.)",
      publisher: "Bone Marrow Transplantation",
      year: 2026,
      url: "https://europepmc.org/article/PMC/PMC13349869",
      doi: "10.1038/s41409-026-02905-1",
      gradingScheme: "Expert panel consensus from interviews and a workshop with voting; recommendations are not graded. Supported by Johnson & Johnson Research & Development.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "imwg-sequencing-2025",
      label: "International Myeloma Working Group immunotherapy committee recommendation on sequencing immunotherapy for treatment of multiple myeloma (Costa et al.)",
      publisher: "International Myeloma Working Group, Leukemia",
      year: 2025,
      url: "https://europepmc.org/article/PMC/PMC11879857",
      doi: "10.1038/s41375-024-02482-6",
      gradingScheme: "Nine consensus recommendations from a panel of 30 experts; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    { ...SITC_IEC_2020, accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "The EBMT/JACIE/EHA 2022 recommendations, the current European edition, were read only as an abstract, which does not mention bridging; whether they changed the 2019 bridging advice is not stated here.",
    "The adult B-ALL Delphi consensus (Blood 2026) was read only as an abstract; its bridging and staging statements are not reproduced. On 17 November 2026 the publisher's page refused a script, and an erratum to the paper dated October 2026 (10.1182/blood.2026036233) could not be read either.",
    "No source read gives a radiotherapy dose or fractionation for bridging; EBMT 2019 and both myeloma texts name radiotherapy as an option only.",
    "No source read gives wash-out periods before lymphodepletion by drug class. The only figure is the myeloma panel's approximate 2 weeks, if feasible, for any regimen. EBMT 2019 Table 4 and the International Myeloma Working Group figures concern wash-out before leukapheresis, not before lymphodepletion.",
    "No randomised trial compares bridging regimens, or bridging against no bridging, in any of the sources read.",
    "The International Myeloma Working Group's separate guideline on CAR T-cell therapy in clinical practice (Lancet Oncology 2024) and the European Myeloma Network guidance that the myeloma panel cites were not read.",
  ],
  drugs: ["rituximab", "gemcitabine", "oxaliplatin", "bendamustine", "pixantrone", "cyclophosphamide", "etoposide", "procarbazine", "lenalidomide", "ibrutinib", "dexamethasone", "methylprednisolone", "talquetamab", "venetoclax", "carfilzomib", "pomalidomide"],
  technologies: ["car-t"],
  cancers: ["dlbcl", "primary-mediastinal-b-cell-lymphoma", "mantle-cell-lymphoma", "follicular-lymphoma", "all-leukemia", "multiple-myeloma"],
  terms: ["bridging-therapy", "lymphoma-tx-car-t-pathway"],
  related: ["car-t-apheresis", "car-t-lymphodepletion"],
  tags: ["protocol", "cell-therapy", "car-t"],
});

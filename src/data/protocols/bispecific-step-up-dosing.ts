import { protocol } from "./helpers";
import { ASTCT_2019 } from "./cell-therapy-sources";

/*
 * T-cell engaging bispecific antibodies (BCMA-directed in myeloma above all): step-up dosing, observation, the
 * outpatient route, infection prophylaxis and handover to community centres.
 *
 * What was read, and how (11 November 2026, fetched raw and read as text):
 * - European Delphi consensus on outpatient step-up dosing and transition of care for BCMA bispecifics (eJHaem 2026):
 *   open access, full text from Europe PMC (PMC13172755), including all 62 consensus statements. The study was
 *   initiated and funded by Pfizer, which markets elranatamab, and panel members received honoraria; the page says so.
 * - IMWG immunotherapy committee 2024 (Lancet Oncology), European Myeloma Network 2023 (Lancet Oncology), CD3xCD20
 *   consensus 2024 (Blood) and a 2026 viewpoint on remote monitoring (JMIR): abstracts from Europe PMC.
 * - ASTCT 2019 consensus grading (full text; see ./cell-therapy-sources.ts).
 * Product labels (SmPC and US prescribing information), which set each drug's step-up schedule, premedication and
 * observation time, were not read. DOIs resolved through Crossref. Quotes checked by script.
 */
export const bispecificStepUpDosing = protocol({
  id: "bispecific-step-up-dosing",
  name: "T-cell engaging bispecific antibodies: step-up dosing, monitoring and outpatient delivery",
  aka: ["bispecific step-up dosing", "BCMA bispecific outpatient dosing", "teclistamab step-up", "elranatamab step-up", "bispecific CRS prevention", "T-cell engager monitoring"],
  domain: "cell-therapy-toxicity",
  tldr: "Bispecific antibodies such as teclistamab and elranatamab for myeloma, or glofitamab and epcoritamab for lymphoma, link T cells to cancer cells. The first doses are built up in steps to lower the risk of cytokine release syndrome (fever, low blood pressure) and confusion. Some countries do this in hospital; others let chosen patients go home between doses with a trained carer and a 24-hour number.",
  simple: "These drugs are started at low doses that are stepped up over the first week or two, with close checks for fever and confusion. You will need a carer with you and a hospital nearby while this happens.",
  summary: "Step-up dosing (a small priming dose, then one or more intermediate doses before the full dose) is the standard way to start T-cell engaging bispecifics; the schedule, premedication and observation period are set by each product's label, which was not read here. The European Myeloma Network (2023) recommends premedication, frequent assessment for CRS and step-up dosing, with corticosteroids and tocilizumab for CRS and anakinra for refractory cases. CRS and ICANS are graded on the ASTCT scale.\n\nThe 2026 European Delphi consensus on BCMA bispecifics in myeloma (84 statements, 75% or more agreement; Pfizer-funded) restricts outpatient step-up dosing to patients with ECOG 0 to 2, low tumour burden, stable organ function, a neutrophil count of at least 1000/mm3, no neurological symptoms or active infection, a trained adult carer available 24 hours a day, and a home within 60 minutes of a centre with haematology and intensive care. Centres must have a clinician experienced in CRS and ICANS during dosing hours, two doses of tocilizumab in a known place, dexamethasone, high-dose steroids and anakinra, written escalation protocols and access to intensive care. Neutropenia from high tumour burden should not be corrected with G-CSF before step-up dosing. Antiviral and Pneumocystis prophylaxis are mandatory for all, with baseline CMV testing and immunoglobulin replacement when IgG is under 400 mg/dL or infections recur. Transfer to a community centre only after the full step-up phase, afebrile for 24 hours and with no toxicity, with a written handover.\n\nA 2026 viewpoint notes that current US labels recommend inpatient administration during step-up dosing. The CD3xCD20 consensus (2024) covers the lymphoma bispecifics separately and was read only as an abstract.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer", "multidisciplinary-team"],
    where: ["ward", "outpatient-clinic", "chemotherapy-day-unit", "home"],
  },
  population: "Adults starting a T-cell engaging bispecific antibody, above all BCMA-directed bispecifics for relapsed or refractory multiple myeloma (teclistamab, elranatamab, linvoseltamab). CD3xCD20 bispecifics for lymphoma (glofitamab, epcoritamab, mosunetuzumab) and other T-cell engagers (blinatumomab, tarlatamab, talquetamab, tebentafusp) follow the same principles under their own labels and consensus papers.",
  trigger: "A decision to start a T-cell engaging bispecific antibody.",
  steps: [
    {
      action: "Start with step-up doses and premedication, and assess often for cytokine release syndrome",
      why: "Building up the dose lets the immune system adjust and lowers the risk and severity of CRS.",
      source: "emn-2023",
      quote: "Recommended measures include premedication, frequent assessing for symptoms and severity of cytokine release syndrome, step-up dosing for several BsAbs and some CAR T-cell therapies; corticosteroids; and tocilizumab in the case of cytokine release syndrome.",
    },
    {
      action: "Follow the product label for the step-up schedule, premedication and how long to observe after each dose",
      why: "Each bispecific has its own licensed schedule; outpatient observation must match it.",
      source: "eu-bcma-2026",
      quote: "Following each step‐up dose, patients must be observed for vital signs and neurological function for a minimum defined period as specified in the SmPC.",
    },
    {
      action: "Before the first dose, test for CMV and start antiviral and Pneumocystis prophylaxis",
      why: "Infections are the main cause of serious harm on these drugs; prophylaxis lowers the risk.",
      source: "eu-bcma-2026",
      quote: "Antiviral (e.g., acyclovir) and PJP prophylaxis (e.g., co‐trimoxazole) are mandatory for all patients.",
    },
    {
      action: "Check IgG at baseline and every 4 weeks, and give immunoglobulin replacement if IgG is under 400 mg/dL or infections recur",
      why: "BCMA bispecifics deplete antibody-making cells, leaving people unable to fight bacteria.",
      source: "eu-bcma-2026",
      quote: "Patients with trough IgG < 400 mg/dL should receive IV or SC Ig every 4 weeks and be retested every month until IgG recovers (including after completion of treatment).",
    },
    {
      action: "Do not use G-CSF to correct neutropenia before step-up dosing",
      why: "Growth factors may raise the risk of CRS, and neutropenia from heavy marrow involvement itself signals higher CRS risk.",
      source: "eu-bcma-2026",
      quote: "Neutropenia (defined as an absolute neutrophil count < 1000/mm 3 ) should not be resolved with G‐CSF prior to SUD due to the risk of CRS.",
    },
    {
      action: "Offer outpatient step-up dosing only to stable patients with low tumour burden, ECOG 0 to 2 and no neurological symptoms or active infection",
      why: "High tumour burden and frailty raise the risk of severe CRS, which is safer to manage on a ward.",
      source: "eu-bcma-2026",
      quote: "Outpatient SUD should only be considered for patients with low tumor burden (where high tumor burden is defined as BMPCs ≥ 60%, presence of ≥ 1 focal lesion ≥ 5 mm [bone or soft tissue] on MRI or PET–CT, M‐spike ≥ 30 g/L, LDH > ULN) and stable disease status.",
    },
    {
      action: "For outpatient dosing, require a trained adult carer available day and night and a home within 60 minutes of a centre with haematology and intensive care",
      why: "Someone must notice fever or confusion and get the patient back quickly.",
      source: "eu-bcma-2026",
      quote: "Patients must reside within 60 min (by ambulance, car, etc.) of a treatment center that provides both hematology or internal medicine expertise and ICU‐level care.",
    },
    {
      action: "Keep two doses of tocilizumab in a known place, with dexamethasone, high-dose steroids and anakinra, wherever step-up doses are given",
      why: "CRS and ICANS can begin within hours and must be treated without delay.",
      source: "eu-bcma-2026",
      quote: "Outpatient SUD centers must have tocilizumab (two doses) available in a known and accessible location.",
    },
    {
      action: "Write standard procedures that set observation times and escalation thresholds using ASTCT and ICE grading",
      why: "Clear triggers mean every nurse escalates at the same point.",
      source: "eu-bcma-2026",
      quote: "SOPs must define observation duration and escalation thresholds for CRS and ICANS, using established grading systems such as ASTCT and ICE.",
    },
    {
      action: "Grade any CRS on the ASTCT scale",
      why: "The same scale is used for CAR T cells and bispecifics, so treatment algorithms can be shared.",
      source: "astct-2019",
      quote: "CRS grade is determined by the more severe event: hypotension or hypoxia not attributable to any other cause.",
    },
    {
      action: "Teach patients and carers, in their own language and in writing, the early signs of CRS, ICANS and infection, and give a 24-hour contact",
      why: "Fever, confusion and breathlessness at home need an immediate call.",
      source: "eu-bcma-2026",
      quote: "Education on CRS/ICANS must include both verbal explanations and written materials tailored to BCMA‐BsAb toxicities.",
    },
    {
      action: "Transfer care to a community centre only after the full step-up phase, with the patient afebrile for 24 hours and free of toxicity",
      why: "Most CRS happens during step-up; moving care earlier risks it starting away from the team that knows the drug.",
      source: "eu-bcma-2026",
      quote: "Patients must be afebrile (≥ 24 h) and hemodynamically stable before being considered for transition to community care.",
    },
  ],
  bestInClass: {
    statement: "Step-up dosing with premedication and close CRS monitoring is common ground (European Myeloma Network 2023; IMWG 2024). Where step-up doses are given is not: a 2026 viewpoint notes that current US labels recommend inpatient administration during step-up dosing, while the 2026 European Delphi consensus sets criteria for doing it as an outpatient in selected patients (low tumour burden, ECOG 0 to 2, trained carer, within 60 minutes of intensive care, tocilizumab on site). That consensus is the most detailed source read and it was funded by Pfizer, a manufacturer of a BCMA bispecific. Infection prophylaxis (antiviral and Pneumocystis for all, immunoglobulin when IgG is under 400 mg/dL) is shared across the myeloma sources. The product labels, which set the schedules, were not read.",
    sources: ["emn-2023", "imwg-2024", "eu-bcma-2026", "rpm-2026"],
  },
  variants: [
    {
      name: "Inpatient step-up dosing (US labels)",
      differs: "Current US labelling recommends inpatient administration during step-up dosing, which concentrates treatment in academic centres.",
      evidence: "Regulatory labelling, as described in a 2026 viewpoint; the labels themselves were not read.",
      sources: ["rpm-2026"],
    },
    {
      name: "Outpatient step-up dosing with remote monitoring (2026 viewpoint)",
      differs: "Uses remote patient monitoring to support outpatient step-up dosing in academic and community practices.",
      evidence: "Authors' real-world experience and case examples; not a trial.",
      sources: ["rpm-2026"],
    },
    {
      name: "Lymphoma bispecifics (CD3xCD20 consensus, 2024)",
      differs: "An international panel of physicians, advanced practitioners, nurses and pharmacists set recommendations specific to CD3xCD20 bispecifics, noting that the timing, nature and severity of their toxicities differ from CAR T cells.",
      evidence: "Consensus recommendations; abstract read only.",
      sources: ["cd20-2024"],
    },
  ],
  grades: [
    { claim: "Antiviral and Pneumocystis prophylaxis for all patients on BCMA bispecifics", grade: "consensus, 100% agreement", source: "eu-bcma-2026" },
    { claim: "Outpatient step-up dosing only for low tumour burden and stable disease", grade: "consensus, 84% agreement", source: "eu-bcma-2026" },
    { claim: "Live within 60 minutes of a centre with haematology and intensive care", grade: "consensus, 100% agreement", source: "eu-bcma-2026" },
    { claim: "Two doses of tocilizumab on site for outpatient step-up dosing", grade: "consensus, 97% agreement", source: "eu-bcma-2026" },
    { claim: "No G-CSF to correct neutropenia before step-up dosing", grade: "consensus, 79% agreement", source: "eu-bcma-2026" },
  ],
  sources: [
    { key: "eu-bcma-2026", label: "European Recommendations for Transitioning the Care of Patients With Multiple Myeloma Treated With B-Cell Maturation Antigen Bispecific Antibodies From Academic Hospitals to Community-Based Centers and for Outpatient Step-Up Dosing", publisher: "eJHaem (European Delphi panel; funded by Pfizer)", year: 2026, url: "https://europepmc.org/article/PMC/PMC13172755", doi: "10.1002/jha2.70290", gradingScheme: "Modified Delphi: a statement reached consensus at 75% or more agreement among 38 to 53 haematologists, nurses and pharmacists from six countries; the percentage agreeing is printed beside each statement.", read: "full-text", accessed: "2026-11-11" },
    { key: "emn-2023", label: "Prevention and management of adverse events during treatment with bispecific antibodies and CAR T cells in multiple myeloma: a consensus report of the European Myeloma Network", publisher: "European Myeloma Network, The Lancet Oncology", year: 2023, url: "https://europepmc.org/abstract/MED/37269857", doi: "10.1016/S1470-2045(23)00159-6", read: "abstract", accessed: "2026-11-11" },
    { key: "imwg-2024", label: "International Myeloma Working Group immunotherapy committee consensus guidelines and recommendations for optimal use of T-cell-engaging bispecific antibodies in multiple myeloma", publisher: "International Myeloma Working Group, The Lancet Oncology", year: 2024, url: "https://europepmc.org/abstract/MED/38697166", doi: "10.1016/S1470-2045(24)00043-3", read: "abstract", accessed: "2026-11-11" },
    { key: "cd20-2024", label: "Consensus recommendations on the management of toxicity associated with CD3xCD20 bispecific antibody therapy", publisher: "Blood (international panel)", year: 2024, url: "https://europepmc.org/abstract/MED/38252906", doi: "10.1182/blood.2023022432", read: "abstract", accessed: "2026-11-11" },
    { key: "rpm-2026", label: "Practical Recommendations for Implementing Remote Patient Monitoring for Patients Receiving Bispecific Antibodies for Multiple Myeloma", publisher: "JMIR (viewpoint)", year: 2026, url: "https://europepmc.org/abstract/MED/42987260", doi: "10.2196/95949", read: "abstract", accessed: "2026-11-11" },
    ASTCT_2019,
  ],
  upgrades: [],
  gaps: [
    "The product labels (SmPC and US prescribing information) for teclistamab, elranatamab, linvoseltamab, talquetamab, glofitamab, epcoritamab and mosunetuzumab, which set each step-up schedule, premedication and observation period, were not read; no dose or schedule is given here.",
    "The IMWG 2024 guideline, the European Myeloma Network 2023 consensus and the CD3xCD20 consensus 2024 were read only as abstracts.",
    "The most detailed source, the 2026 European Delphi consensus, was funded by Pfizer and its panel members were paid honoraria; no independent source of the same detail was found.",
    "No randomised comparison of inpatient and outpatient step-up dosing was found.",
  ],
  drugs: ["teclistamab", "elranatamab", "linvoseltamab", "talquetamab", "glofitamab", "epcoritamab", "mosunetuzumab", "tocilizumab", "dexamethasone", "human-normal-immunoglobulin", "anakinra"],
  technologies: ["bispecific-antibody"],
  cancers: ["multiple-myeloma"],
  terms: ["crs", "icans", "lymphoma-tx-bispecific-step-up", "lymphoma-tx-immunoglobulin-replacement"],
  related: ["crs-grading-and-management", "icans-grading-and-management"],
  tags: ["protocol", "cell-therapy", "bispecific"],
});

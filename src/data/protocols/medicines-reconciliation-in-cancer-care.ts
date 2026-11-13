import { protocol } from "./helpers";

/*
 * Medicines reconciliation for people with cancer: building an accurate list of everything a person takes when
 * anticancer treatment starts and each time they move between care settings, and resolving the differences.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - NICE NG5, Medicines optimisation: the safe and effective use of medicines to enable the best possible outcomes
 *   (published 4 March 2015), recommendations page: full text, HTML. NICE does not grade recommendations.
 * - ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024, DOI 10.1200/OP.24.00216): full text, read by
 *   the first protocol agent from the Internet Archive's capture of ascopubs.org (copy in /tmp/pf-chemo).
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (June 2025): full
 *   text, PDF.
 * - KDIGO 2024 CKD guideline (DOI 10.1016/j.kint.2023.10.018): practice points 4.3.1 and 4.3.2, full text, PDF.
 * - Powis et al., medication reconciliation in outpatient cancer care across 21 Canadian centres (BMJ Open Qual 2023,
 *   DOI 10.1136/bmjoq-2022-002211): abstract only.
 * - Malifarge et al., reconciliation before early-phase trials (JCO Oncol Pract 2024, DOI 10.1200/OP.22.00281):
 *   abstract only.
 * - The WHO High 5s standard operating protocol for medication reconciliation was not read.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied with line breaks joined only;
 * NICE's text uses non-breaking hyphens, which are kept.
 */
export const medicinesReconciliationInCancerCare = protocol({
  id: "medicines-reconciliation-in-cancer-care",
  name: "Medicines reconciliation at the start of anticancer treatment and at each move between care settings",
  aka: ["medication reconciliation", "med rec", "MedRec", "best possible medication history", "BPMH", "drug history before chemotherapy", "medicines reconciliation on admission"],
  domain: "pharmacy",
  tldr: "Medicines reconciliation means making one accurate list of every medicine you take, including ones you buy and herbal remedies, and checking it against what the hospital thinks you take. It should happen before cancer treatment starts, when you go into hospital, when you move wards and when you go home.",
  simple: "Bring all your medicines, or a list, to your first appointment and every hospital stay. Someone will check the list with you so nothing is missed or doubled.",
  summary: "NICE NG5 (2015) uses the Institute for Healthcare Improvement's definition: identify an accurate list of a person's current medicines, compare it with the list in use, recognise and document discrepancies, and communicate the result; 'medicines' includes over-the-counter and complementary products. In an acute setting reconciliation should be done within 24 hours of a move between settings, or sooner if clinically necessary, may need repeating on admission, transfer and discharge, and should be done in primary care within a week of the practice receiving discharge information. It should be done by a trained, competent professional, ideally a pharmacist, pharmacy technician, nurse or doctor, and involve the patient and family.\n\nCancer-specific standards add the anticancer start point. ASCO-ONS (2024) requires the medication list, with over-the-counter medicines, herbal products and supplements, to be updated at every encounter and reviewed when it changes; BOPA (2025) puts the drug history and interaction check into the pharmacist's verification of the first cycle. Practice lags: across 21 Canadian cancer centres most collected a best possible medication history but full reconciliation was uncommon, and one centre's improvement project reached a documented history in 26.6% of patients starting systemic therapy and full reconciliation in 4.7%. Where it is done, it finds things: before early-phase trials, pharmacist reconciliation in 501 patients uncovered 35% of the medicines patients were taking and 51% of prohibited or monitored drugs that oncologists had missed.",
  asOf: "2026-11-11",
  setting: {
    who: ["pharmacist", "pharmacy-technician", "nurse", "doctor", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "chemotherapy-day-unit", "community"],
  },
  population: "Adults and children with cancer starting systemic anticancer treatment, and any person with cancer admitted to hospital, transferred between wards or settings, or discharged. NICE NG5 covers all people taking medicines in any setting.",
  trigger: "A new anticancer regimen is planned, or the person is admitted, transferred or discharged.",
  steps: [
    {
      action: "On admission or any move into hospital, list every medicine the person takes, including over-the-counter and complementary products, and reconcile within 24 hours, sooner if clinically necessary",
      why: "Medicines are most often lost, doubled or changed by mistake when people move between settings.",
      source: "nice-ng5",
      quote: "1.3.1 In an acute setting, accurately list all of the person's medicines (including prescribed, over‑the‑counter and complementary medicines) and carry out medicines reconciliation within 24 hours or sooner if clinically necessary, when the person moves from one care setting to another – for example, if they are admitted to hospital.",
    },
    {
      action: "Compare the list with what is currently prescribed, find and resolve every difference, and document the changes",
      why: "A list only helps if the differences between it and the prescription chart are found and settled.",
      source: "nice-ng5",
      quote: "Medicines reconciliation, as defined by the Institute for Healthcare Improvement, is the process of identifying an accurate list of a person's current medicines and comparing them with the current list in use, recognising any discrepancies, and documenting any changes, thereby resulting in a complete list of medicines, accurately communicated.",
    },
    {
      action: "Involve the patient and their family or carers in building the list",
      why: "They know what is actually taken, including things bought without a prescription.",
      source: "nice-ng5",
      quote: "1.3.6 Involve patients and their family members or carers, where appropriate, in the medicines reconciliation process.",
    },
    {
      action: "Before the first cycle of a new regimen, take a full drug history, including previous anticancer treatment, and check it against the planned treatment",
      why: "Previous treatment and current medicines can change which regimen is safe and what dose is right.",
      source: "bopa-2025",
      quote: "Check for potential interactions, contra-indications and duplication between all planned SACT & supportive medication and patient’s concurrent medication.",
    },
    {
      action: "Update the medication list, with herbal products and supplements, at every encounter during treatment, and have it reviewed when it changes",
      why: "People with cancer see many specialists, and medicines change often during treatment.",
      source: "asco-ons-2024",
      quote: "The patient's medication list inclusive of prescribed and over-the-counter medications, herbal products, and supplements is updated and documented in the medical record at every encounter and reviewed by a licensed practitioner when a change occurs",
    },
    {
      action: "Repeat reconciliation when the person is transferred between wards and at discharge",
      why: "Each handover is a new chance for a medicine to be stopped or restarted by mistake.",
      source: "nice-ng5",
      quote: "1.3.2 Recognise that medicines reconciliation may need to be carried out on more than one occasion during a hospital stay – for example, when the person is admitted, transferred between wards or discharged.",
    },
    {
      action: "If medicines are stopped during an acute illness, write and share a clear plan for when to restart them",
      why: "Medicines paused in hospital are often never restarted unless someone plans it.",
      source: "kdigo-2024",
      quote: "If medications are discontinued during an acute illness, communicate a clear plan of when to restart the discontinued medications to the affected person and healthcare providers, and ensure documentation in the medical record.",
      grade: "Practice Point 4.3.2",
    },
    {
      action: "Send complete, accurate medicines information to the next care setting, ideally within 24 hours of transfer",
      why: "The GP, community pharmacy or next hospital team needs to know what changed and why.",
      source: "nice-ng5",
      quote: "1.2.2 For all care settings, health and social care practitioners should proactively share complete and accurate information about medicines: ideally within 24 hours of the person being transferred, to ensure that patient safety is not compromised and in the most effective and secure way, such as by secure electronic communication, recognising that more than one approach may be needed.",
    },
    {
      action: "In primary care, reconcile medicines for everyone discharged from hospital before issuing a new prescription, within a week of receiving the information",
      why: "Discharge changes, such as a new anticoagulant or a stopped medicine, have to reach the GP record.",
      source: "nice-ng5",
      quote: "1.3.3 In primary care, carry out medicines reconciliation for all people who have been discharged from hospital or another care setting.",
    },
  ],
  bestInClass: {
    statement: "NICE NG5 (2015) sets the process and the clocks for every setting: a full list including over-the-counter and complementary medicines, reconciled within 24 hours of a move into an acute setting, repeated at transfer and discharge, done by a trained professional with the patient, and completed in primary care within a week of discharge information. For cancer treatment, ASCO-ONS (2024) adds a list updated at every encounter, and BOPA (2025) a drug history and interaction check in the first-cycle verification. None of these is graded.",
    sources: ["nice-ng5", "asco-ons-2024", "bopa-2025"],
  },
  variants: [
    {
      name: "Pharmacist reconciliation before trial enrolment",
      differs: "A pharmacist reconciles medicines against each trial's prohibited and monitored lists before a patient starts an investigational drug.",
      evidence: "In 501 patients at one French centre it uncovered 35% of the medicines patients were taking, found 158 prohibited interactions (more than half with herbal products) and caught 51% of prohibited or monitored drugs missed by oncologists (Malifarge 2024).",
      sources: ["malifarge-2024"],
    },
    {
      name: "Best possible medication history at the start of systemic therapy (Canadian centres)",
      differs: "Collects a structured best possible medication history for people starting systemic therapy, with full reconciliation as a later step.",
      evidence: "81% of 21 Canadian cancer centres had a process for the history but full reconciliation was uncommon; one centre's improvement project reached 26.6% documented histories and 4.7% full reconciliations within 30 days of starting treatment (Powis 2023).",
      sources: ["powis-2023"],
    },
  ],
  grades: [],
  sources: [
    {
      key: "nice-ng5",
      label: "Medicines optimisation: the safe and effective use of medicines to enable the best possible outcomes (NG5), recommendations",
      publisher: "NICE",
      year: 2015,
      url: "https://www.nice.org.uk/guidance/ng5/chapter/recommendations",
      gradingScheme: "NICE does not grade recommendations.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "asco-ons-2024",
      label: "Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology: ASCO-ONS Standards",
      publisher: "ASCO and ONS (JCO Oncology Practice)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.24.00216",
      doi: "10.1200/OP.24.00216",
      gradingScheme: "Standards are not graded; developed from a systematic review (2015 to 2023), expert panel consensus and public comment.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "bopa-2025",
      label: "Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0",
      publisher: "British Oncology Pharmacy Association",
      year: 2025,
      url: "https://www.bopa.org.uk/wp-content/uploads/2019/07/BOPA-Standards-for-the-Pharmacy-Verification-of-Prescriptions-for-Cancer-Medicines-Version-5.0-3-june-2025.pdf",
      gradingScheme: "Standards are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "kdigo-2024",
      label: "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease",
      publisher: "KDIGO (Kidney International)",
      year: 2024,
      url: "https://doi.org/10.1016/j.kint.2023.10.018",
      doi: "10.1016/j.kint.2023.10.018",
      gradingScheme: "Recommendations graded 1 or 2 with evidence quality A to D; practice points are ungraded expert judgement.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "powis-2023",
      label: "Implementation of medication reconciliation in outpatient cancer care",
      publisher: "BMJ Open Quality (Powis et al.)",
      year: 2023,
      url: "https://doi.org/10.1136/bmjoq-2022-002211",
      doi: "10.1136/bmjoq-2022-002211",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "malifarge-2024",
      label: "Impact of Medication Reconciliation in Oncology Early Phase Studies: A Drug-Drug Interaction Retrospective Study",
      publisher: "JCO Oncology Practice (Malifarge et al.)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.22.00281",
      doi: "10.1200/OP.22.00281",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  related: ["anticancer-drug-interaction-review", "sact-prescribing-and-pharmacy-verification", "oral-anticancer-medicines-at-home"],
  upgrades: [],
  gaps: [
    "No cancer-specific guideline sets a deadline for reconciliation before a first cycle; NICE NG5's 24-hour clock applies to moves into an acute setting, and ASCO-ONS and BOPA require the list without a time limit.",
    "NICE NG5 dates from 2015 and has not been updated; its recommendations are ungraded.",
    "The two oncology studies were read as abstracts only, and neither measured harm prevented.",
    "The WHO High 5s medication reconciliation protocol was not read.",
  ],
});

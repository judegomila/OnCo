import { protocol } from "./helpers";

/*
 * Medicines reconciliation for people with cancer: building an accurate list of everything a person takes when
 * anticancer treatment starts and each time they move between care settings, and resolving the differences.
 *
 * First written on 11 November 2026. Re-read claim by claim on 17 November 2026 (second accuracy pass), every source
 * as raw text:
 * - NICE NG5, Medicines optimisation (published 4 March 2015): the recommendations, introduction, overview and update
 *   information pages, fetched from nice.org.uk with curl and read as text. The update page lists link changes only
 *   (September 2019, June 2021, October 2021). NICE does not grade recommendations. The reasons given in two steps
 *   come from the guideline's introduction page, not the recommendations page.
 * - ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024, DOI 10.1200/OP.24.00216): full text, read
 *   in the Oncology Nursing Society's co-publication (Oncology Nursing Forum, July 2024, 51(4), advance-print PDF,
 *   converted with pdftotext), a copy another checker fetched from ons.org the same day. ascopubs.org was not asked.
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (3 June 2025):
 *   full text, PDF from bopa.org.uk converted with pdftotext, a copy another checker fetched the same day.
 * - KDIGO 2024 CKD guideline (DOI 10.1016/j.kint.2023.10.018): practice points 4.3.1 to 4.3.3 and their rationale,
 *   full text, PDF from kdigo.org converted with pdftotext, a copy another checker fetched the same day.
 * - Powis et al. (BMJ Open Qual 2023, DOI 10.1136/bmjoq-2022-002211): full text, Europe PMC XML (PMC10230967). The
 *   first pass had the abstract only.
 * - Malifarge et al. (JCO Oncol Pract 2024, DOI 10.1200/OP.22.00281): full text, Europe PMC XML (PMC11005900), a copy
 *   another checker fetched the same day. The first pass had the abstract only.
 * - WHO High 5s Standard Operating Protocol for medication reconciliation, version 3 (September 2014): not read in the
 *   first pass; read in full on 17 November 2026 as a PDF from WHO's document host, converted with pdftotext.
 *
 * The ASCO-ONS and KDIGO DOIs were resolved through Crossref and the two study DOIs through Europe PMC, and each title
 * checked. Every quote was checked by script against the saved text, with whitespace and line-break hyphenation
 * normalised only; NICE's text uses non-breaking hyphens, which are kept. The first pass printed the ASCO-ONS quote
 * with a straight apostrophe where the source has a typographic one; that is corrected.
 */
export const medicinesReconciliationInCancerCare = protocol({
  id: "medicines-reconciliation-in-cancer-care",
  name: "Medicines reconciliation at the start of anticancer treatment and at each move between care settings",
  aka: ["medication reconciliation", "med rec", "MedRec", "best possible medication history", "BPMH", "drug history before chemotherapy", "medicines reconciliation on admission"],
  domain: "pharmacy",
  tldr: "Medicines reconciliation means making one accurate list of every medicine you take, including ones you buy and herbal remedies, and checking it against what the hospital thinks you take. It should happen before cancer treatment starts, when you go into hospital, when you move wards and when you go home.",
  simple: "Keep an up-to-date list of your medicines, or bring the medicines themselves, when you go into hospital or come to clinic, and show the list at each visit. Someone will check it with you. Say so if you think a mistake has been made with your medicines.",
  summary: "NICE NG5 (2015) uses the Institute for Healthcare Improvement's definition: identify an accurate list of a person's current medicines, compare it with the list in use, recognise discrepancies and document changes, giving a complete list, accurately communicated; 'medicines' includes over-the-counter and complementary products, and discrepancies should be resolved. In an acute setting reconciliation should be done within 24 hours of a move between care settings, or sooner if clinically necessary, may need repeating on admission, transfer and discharge, and should be done in primary care within 1 week of the GP practice receiving the information. It should be done by a trained, competent health professional, ideally a pharmacist, pharmacy technician, nurse or doctor, and involve the patient and family where appropriate. NICE's introduction says that between 30% and 70% of patients have an error or unintentional change to their medicines when they move from one care setting to another. The WHO High 5s protocol (2014) sets a similar goal for hospital admission: reconciliation within 24 hours of the decision to admit.\n\nCancer-specific standards add the anticancer start point. The ASCO-ONS standards (2024) have the medication list, with over-the-counter medicines, herbal products and supplements, updated at every encounter and reviewed by a licensed practitioner when it changes; BOPA (2025) puts a check of concurrent medicines for interactions, contraindications and duplication into the pharmacy verification of the first cycle of a new regimen. Practice lags: of 21 Canadian cancer centres interviewed, 81% had a process for collecting a best possible medication history but full reconciliation was uncommon, and one centre's improvement project reached a documented history in 26.6% of patients starting systemic therapy and reconciliation in up to 4.7%. Where it is done, it finds things: before early-phase trials at one French centre, pharmacist reconciliation in 501 patients revealed 35.2% of the treatments patients were taking that the clinical team had not otherwise known about, and the authors credit it with identifying 51% of the prohibited or monitored drugs that oncologists had initially overlooked.",
  asOf: "2026-11-17",
  setting: {
    who: ["pharmacist", "pharmacy-technician", "nurse", "doctor", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "chemotherapy-day-unit", "community"],
  },
  population: "Adults and children with cancer starting systemic anticancer treatment, and any person with cancer admitted to hospital, transferred between wards or settings, or discharged. NICE NG5 covers health and social care for anyone taking 1 or more medicines; it is not specific to cancer. The KDIGO step was written for people with chronic kidney disease.",
  trigger: "A new anticancer regimen is planned, or the person is admitted, transferred or discharged.",
  steps: [
    {
      action: "In an acute setting, when the person moves from one care setting to another (for example on admission to hospital), list every medicine they take, including prescribed, over-the-counter and complementary medicines, and reconcile within 24 hours, or sooner if clinically necessary",
      why: "NICE's introduction to the guideline says there is a greater risk of poor communication and unintended changes to medicines when people transfer between care providers, such as at hospital admission or discharge.",
      source: "nice-ng5",
      quote: "1.3.1 In an acute setting, accurately list all of the person's medicines (including prescribed, over‑the‑counter and complementary medicines) and carry out medicines reconciliation within 24 hours or sooner if clinically necessary, when the person moves from one care setting to another – for example, if they are admitted to hospital.",
    },
    {
      action: "Compare the list with the list currently in use, recognise and resolve any discrepancies, and document the changes",
      why: "The aim NICE gives is a complete list of medicines, accurately communicated.",
      source: "nice-ng5",
      quote: "Medicines reconciliation, as defined by the Institute for Healthcare Improvement, is the process of identifying an accurate list of a person's current medicines and comparing them with the current list in use, recognising any discrepancies, and documenting any changes, thereby resulting in a complete list of medicines, accurately communicated.",
    },
    {
      action: "Involve the patient and, where appropriate, their family or carers in the reconciliation",
      why: "The WHO High 5s protocol says patients and families are in the best position to give up-to-date information about the medicines they take.",
      source: "nice-ng5",
      quote: "1.3.6 Involve patients and their family members or carers, where appropriate, in the medicines reconciliation process.",
    },
    {
      action: "At pharmacy verification of the first cycle of a new regimen, check the patient's concurrent medicines against all the planned anticancer and supportive medicines for interactions, contraindications and duplication",
      why: "BOPA's example checklist for cycle 1 lists the drug history, including previous anticancer treatment, beside this check, along with cumulative dosing and earlier toxicities that may affect the dose.",
      source: "bopa-2025",
      quote: "Check for potential interactions, contra-indications and duplication between all planned SACT & supportive medication and patient’s concurrent medication.",
    },
    {
      action: "Update and document the medication list, including over-the-counter medicines, herbal products and supplements, at every encounter, and have a licensed practitioner review it when it changes",
      why: "The standards say people with cancer often have other conditions needing several medicines, and may not mention herbal products, supplements and vitamins because they do not regard them as medicines.",
      source: "asco-ons-2024",
      quote: "The patient’s medication list inclusive of prescribed and over-the-counter medications, herbal products, and supplements is updated and documented in the medical record at every encounter and reviewed by a licensed practitioner when a change occurs",
    },
    {
      action: "Recognise that reconciliation may need repeating during a hospital stay, for example when the person is transferred between wards or discharged",
      why: "A hospital stay can involve several moves, and NICE links moves between care providers with unintended changes to medicines.",
      source: "nice-ng5",
      quote: "1.3.2 Recognise that medicines reconciliation may need to be carried out on more than one occasion during a hospital stay – for example, when the person is admitted, transferred between wards or discharged.",
    },
    {
      action: "If medicines are stopped during an acute illness, tell the person and their healthcare providers clearly when to restart them, and document the plan in the medical record",
      why: "This practice point comes from KDIGO's guideline for people with chronic kidney disease, which notes that failing to restart such medicines afterwards may lead to unintentional harm.",
      source: "kdigo-2024",
      quote: "If medications are discontinued during an acute illness, communicate a clear plan of when to restart the discontinued medications to the affected person and healthcare providers, and ensure documentation in the medical record.",
      grade: "Practice Point 4.3.2",
    },
    {
      action: "Share complete, accurate medicines information with the next care setting, ideally within 24 hours of the transfer",
      why: "NICE lists what should be shared, including medicines started or stopped, dose changes and the reason for each change.",
      source: "nice-ng5",
      quote: "1.2.2 For all care settings, health and social care practitioners should proactively share complete and accurate information about medicines: ideally within 24 hours of the person being transferred, to ensure that patient safety is not compromised and in the most effective and secure way, such as by secure electronic communication, recognising that more than one approach may be needed.",
    },
    {
      action: "In primary care, reconcile medicines for everyone discharged from hospital or another care setting as soon as practically possible, before a prescription or new supply is issued and within 1 week of the GP practice receiving the information",
      why: "This is how changes made in hospital reach the GP record before the next prescription is written.",
      source: "nice-ng5",
      quote: "1.3.3 In primary care, carry out medicines reconciliation for all people who have been discharged from hospital or another care setting. This should happen as soon as is practically possible, before a prescription or new supply of medicines is issued and within 1 week of the GP practice receiving the information.",
    },
  ],
  bestInClass: {
    statement: "NICE NG5 (2015) sets the process and the clocks for acute and primary care: a list of all medicines including over-the-counter and complementary ones, reconciled within 24 hours of a move between care settings in an acute setting (sooner if clinically necessary), repeated where needed at transfer and discharge, done by a trained and competent health professional with the patient involved, and completed in primary care within 1 week of the GP practice receiving the information. For cancer treatment, the ASCO-ONS standards (2024) add a list updated at every encounter, and BOPA (2025) a check of concurrent medicines for interactions, contraindications and duplication in the pharmacy verification of the first cycle. None of these is graded.",
    sources: ["nice-ng5", "asco-ons-2024", "bopa-2025"],
  },
  variants: [
    {
      name: "WHO High 5s standard operating protocol (hospital admission)",
      differs: "Builds a best possible medication history either before the admission medication orders are written (the proactive model) or afterwards, with the orders then compared against it (the retroactive model). Its goal is reconciliation within 24 hours of admission, which it says may not be achievable in all organisations at first. It asks that patients be taught to keep an up-to-date medicines list or bring their medicines to hospital and clinics, and to speak up if they believe a mistake has been made.",
      evidence: "The first phase of the High 5s project was limited to patients aged 65 or over admitted through emergency departments to inpatient services, and the protocol notes that reconciliation on transfer and discharge was not evaluated in the project (WHO 2014). It is not specific to cancer.",
      sources: ["who-high5s-2014"],
    },
    {
      name: "Pharmacist reconciliation before trial enrolment",
      differs: "A pharmacist reconciles medicines against each trial's prohibited and monitored lists before a patient starts an investigational drug.",
      evidence: "In a retrospective study of 501 patients at one French centre, 35.2% of the treatments patients were taking had not otherwise been known to the clinical team. The pharmacists identified 346 treatments or alternative medicine products with a relevant interaction, of which 158 were prohibited by the trial protocol; alternative medicine products accounted for 54.2% of the interactions with prohibited treatments. The abstract credits reconciliation with identifying 51% of the prohibited or monitored drugs initially overlooked by oncologists (Malifarge 2024).",
      sources: ["malifarge-2024"],
    },
    {
      name: "Best possible medication history at the start of systemic therapy (Canadian centres)",
      differs: "Collects a structured best possible medication history for people starting systemic therapy, with full reconciliation as a later step.",
      evidence: "Of 21 Canadian cancer centres interviewed, 17 (81%) had a process for collecting the history, but full reconciliation was uncommon. One centre's improvement project, which aimed for 30% of patients within 30 days either side of starting systemic therapy, reached 26.6% with a documented history and up to 4.7% with medicines reconciled (Powis 2023).",
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
      accessed: "2026-11-17",
    },
    {
      key: "asco-ons-2024",
      label: "Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology: ASCO-ONS Standards",
      publisher: "ASCO and ONS (JCO Oncology Practice)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.24.00216",
      doi: "10.1200/OP.24.00216",
      gradingScheme: "Standards are not graded; developed from a systematic review (searches from January 2015 to 2023), informal expert panel consensus and public comment.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "bopa-2025",
      label: "Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0",
      publisher: "British Oncology Pharmacy Association",
      year: 2025,
      url: "https://www.bopa.org.uk/wp-content/uploads/2019/07/BOPA-Standards-for-the-Pharmacy-Verification-of-Prescriptions-for-Cancer-Medicines-Version-5.0-3-june-2025.pdf",
      gradingScheme: "Standards are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "powis-2023",
      label: "Implementation of medication reconciliation in outpatient cancer care",
      publisher: "BMJ Open Quality (Powis et al.)",
      year: 2023,
      url: "https://doi.org/10.1136/bmjoq-2022-002211",
      doi: "10.1136/bmjoq-2022-002211",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "malifarge-2024",
      label: "Impact of Medication Reconciliation in Oncology Early Phase Studies: A Drug-Drug Interaction Retrospective Study",
      publisher: "JCO Oncology Practice (Malifarge et al.)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.22.00281",
      doi: "10.1200/OP.22.00281",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "who-high5s-2014",
      label: "The High5s Project: Standard Operating Protocol for Medication Reconciliation. Assuring Medication Accuracy at Transitions in Care, version 3 (September 2014)",
      publisher: "World Health Organization",
      year: 2014,
      url: "https://cdn.who.int/media/docs/default-source/patient-safety/high5s/h5s-sop.pdf",
      gradingScheme: "A standard operating protocol; its steps are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  related: ["anticancer-drug-interaction-review", "sact-prescribing-and-pharmacy-verification", "oral-anticancer-medicines-at-home"],
  upgrades: [],
  gaps: [
    "No cancer-specific guideline read sets a deadline for reconciliation before a first cycle; NICE NG5's 24-hour clock applies to moves between care settings in an acute setting, and ASCO-ONS and BOPA require the list and the check without a time limit.",
    "NICE NG5 was published in March 2015 and its recommendations are ungraded. On 17 November 2026 its update information page listed changes to links only (September 2019, June 2021 and October 2021), so the reconciliation recommendations stand as written in 2015. The 24-hour and 1-week clocks are NICE's guidance for the health and social care system it serves, not universal rules.",
    "The KDIGO step is a practice point (ungraded expert judgement) from a guideline for people with chronic kidney disease, applied here by analogy; no cancer guideline read states it. KDIGO published a public review draft of a separate 2027 guideline on medicines management in chronic kidney disease in October 2026; it is a draft and was not used.",
    "The two oncology studies were read in full on 17 November 2026. Both report process measures (how often reconciliation was completed, and how many unknown medicines and interactions it found); neither reports whether patients came to less harm.",
    "The WHO High 5s protocol was read in full on 17 November 2026 (version 3, September 2014). The link on WHO's own High 5s page returned an error that day and the file was read from WHO's document host instead. The protocol says reconciliation on transfer and discharge was not evaluated in the project.",
    "The ASCO-ONS standards were read in the Oncology Nursing Society's co-publication; the JCO Oncology Practice site refuses a script and was not asked. The BOPA standards were read in the version 5.0 file fetched from bopa.org.uk on 17 November 2026.",
  ],
});

import { protocol } from "./helpers";

/*
 * Telephone triage of people on cancer treatment who ring a 24-hour helpline (acute oncology advice line).
 *
 * What was read, and how (11 November 2026, fetched raw with curl and read as text):
 * - UKONS Oncology/Haemato-oncology Triage Assessment Tool, version 3: the A3 poster PDF hosted by the UK Acute Oncology
 *   Society (pdftotext, read in full). The ukons.org site does not list it publicly; this copy was found through the
 *   reference list of the JMIR Cancer 2026 paper below. The poster carries "This Tool Kit cannot be reproduced", so
 *   only short sentences are quoted here and the grade table itself is not copied.
 * - UKAOS, UKONS and UKSB, "A UK Review of Systemic Anti-cancer Therapy Helplines" (June 2025): full PDF from
 *   ukacuteoncology.co.uk, read as text (the PDF has two columns; only sentences that run contiguously in the text are
 *   quoted).
 * - Clatterbridge evaluation of the UKONS tool (Supportive Care in Cancer 2023): abstract from Europe PMC.
 * - NHS Tayside Cancer Treatment Helpline (BMJ Open Quality 2021): open access, full text from Europe PMC.
 * - UKONS-informed digital triage, Leicester (JMIR Cancer 2026): open access, full text from Europe PMC.
 * - COSTaRS practice guides, 2020 and 2026 updates (Canadian Oncology Nursing Journal): abstracts only; the full text
 *   is not released in XML and the guides' own site did not answer at the address tried.
 * - Basch et al. 2016 (JCO): abstract from Europe PMC.
 * Every DOI was resolved through Crossref and its title checked. Quotes checked by script against the raw text.
 */
export const acuteOncologyTelephoneTriage = protocol({
  id: "acute-oncology-telephone-triage",
  name: "Acute oncology telephone triage: the 24-hour helpline and the UKONS red, amber and green grading",
  aka: ["UKONS triage tool", "24-hour SACT helpline", "chemotherapy helpline", "oncology triage line", "acute oncology advice line", "Cancer Treatment Helpline"],
  domain: "emergencies",
  tldr: "During cancer treatment you should have a phone number answered day and night. A trained nurse asks set questions about each symptom and grades it green, amber or red. Green means advice for home, one amber a review within 24 hours, and red (or two ambers) being seen in person as soon as possible. A temperature of 37.5 °C or more, or below 36 °C, always means urgent assessment.",
  simple: "Keep your cancer helpline number with you. Ring it if you feel unwell during treatment. A nurse will ask questions and tell you whether you need to come in.",
  summary: "The UK model: everyone on systemic anticancer therapy (SACT) or radiotherapy has a 24-hour number for specialist advice, and calls are triaged with the UKONS Triage Assessment Tool, now version 3. Each symptom is graded from 0 to 4 against NCI-CTCAE-based descriptors and assigned a colour: all green is self-care advice; one amber is a review within 24 hours; two or more ambers escalate to red; red is a face-to-face assessment as soon as possible. Some symptoms are red at any grade: chest pain (stop SACT, advise 999, disconnect an infusion pump), and fever on SACT, where a temperature of 37.5 °C or above, below 36.0 °C, or feeling generally unwell means urgent assessment on the neutropenia pathway, with a caution that analgesia, steroids or dehydration can mask a temperature. Version 3 includes prompts for checkpoint inhibitor toxicity at any time, for ICANS and CRS after cell therapy, for MSCC with back pain and for SVCO with breathlessness.\n\nThe UKAOS four-nations review (June 2025) found 99% of UK providers support 24/7 access and 90% use the UKONS tool, but variation in who answers (41 providers used non-clinical staff first), in cut-off periods after treatment, and in records; it recommends a national framework, trained and competency-assessed triage staff, and standardised data. In Clatterbridge's year of calls, 45.2% of clinical calls were red, and 72.3% of out-of-hours reds went to the emergency department against 38.3% in hours. Scotland's Cancer Treatment Helpline routes out-of-hours calls through NHS24 call handlers using UKONS questions. Canada's COSTaRS practice guides (updated 2020 and 2026) are the main national alternative.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "patient-or-carer", "doctor"],
    where: ["telephone-triage", "acute-oncology-service", "home"],
  },
  population: "Adults receiving, or recently given, systemic anticancer therapy or radiotherapy, and people who have had immune checkpoint inhibitors or cell therapy at any time, who call a specialist helpline. Haematology patients may follow local policy for bleeding. Children's services use separate tools (a paediatric toolkit is noted in gaps) and are not covered here.",
  trigger: "A patient, carer or health professional rings the 24-hour helpline about a symptom during or after cancer treatment.",
  steps: [
    {
      action: "Give every person starting anticancer treatment a 24-hour contact number, an alert card, and guidance on which symptoms to report",
      why: "Problems from treatment can become dangerous within hours, often at night or at weekends.",
      source: "ukaos-2025",
      quote: "All SACT patients and/or carers should receive a 24-hour contact number for specialist advice, along with guidance on symptom recognition and when to seek help.",
    },
    {
      action: "Have calls triaged only by staff trained and assessed as competent in telephone triage",
      why: "A structured assessment by someone trained to use it is what makes advice over the phone safe.",
      source: "ukaos-2025",
      quote: "Best practice dictates that only staff who have successfully completed formal telephone triage training to assess treatment and disease related symptoms and are deemed competent should perform triage duties.",
    },
    {
      action: "Ask whether the person has ever had an immune checkpoint inhibitor, and if the regimen is unclear, triage by symptoms with caution",
      why: "Immunotherapy side effects can start months or years after the last dose.",
      source: "ukons-v3",
      quote: "CAUTION! Please note patients who are receiving or have received IMMUNE CHECK POINT INHIBITORS may present with treatment related problems at anytime during treatment or even months to years after treatment has been completed.",
    },
    {
      action: "Grade each symptom the caller reports against the tool, using the current NCI-CTCAE criteria for severity",
      why: "A shared grading scale means every nurse reaches the same decision for the same symptom.",
      source: "ukons-v3",
      quote: "Practitioners are advised to refer to the latest version of NCI-CTCAE common toxicity criteria to assess the severity of the problem and seek further clinical advice regarding management.",
    },
    {
      action: "If the person has had anticancer treatment in the last 6 to 8 weeks or is immunocompromised and has a temperature of 37.5 °C or above, below 36.0 °C, or feels generally unwell, arrange urgent assessment on the neutropenic sepsis pathway",
      why: "Infection with a low white cell count can kill within hours, and a normal temperature does not rule it out.",
      source: "ukons-v3",
      quote: "IF TEMPERATURE 37.5˚C OR ABOVE OR BELOW 36.0˚C OR GENERALLY UNWELL - URGENT ASSESSMENT AND CLINICAL REVIEW - FOLLOW NEUTROPENIA PATHWAY.",
    },
    {
      action: "Do not be reassured by a normal temperature in someone who has taken paracetamol, ibuprofen or steroids, or may be dehydrated",
      why: "These can hide a fever while an infection is developing.",
      source: "ukons-v3",
      quote: "ALERT - patients who have taken analgesia or steroids or who may be dehydrated may not present with an abnormal temperature but may still have an infection and be at risk of sepsis - if in doubt do a count.",
    },
    {
      action: "For chest pain, advise 999 and urgent emergency assessment, stop oral and intravenous anticancer treatment until reviewed, and arrange disconnection of any infusion pump",
      why: "Chest pain during treatment can be a heart problem, a clot in the lung or a drug reaction.",
      source: "ukons-v3",
      quote: "STOP oral and intravenous Systemic Anti-Cancer Treatment (SACT) until reviewed by oncology or haematology team.",
    },
    {
      action: "With back pain, think of spinal cord compression; with breathlessness, think of superior vena cava obstruction, clots, pneumonitis and infection",
      why: "These are emergencies that can first be described over the phone as an ordinary symptom.",
      source: "ukons-v3",
      quote: "Back pain consider metastatic spinal cord compression (MSCC).",
    },
    {
      action: "Act on the overall result: all green is self-care advice; one amber is a review within 24 hours; two or more ambers count as red; red is a face-to-face assessment as soon as possible",
      why: "Several moderate problems together can add up to someone who is seriously unwell.",
      source: "ukons-v3",
      quote: "Red = arrange for a face to face assessment as soon as possible",
    },
    {
      action: "Record every call on the log sheet and share it with the treating team, so that it can be audited and acted on",
      why: "The next nurse or doctor needs to know what was said and advised.",
      source: "ukaos-2025",
      quote: "A robust local system for documenting helpline activity is essential for audit, continuity of care, and service improvement.",
    },
  ],
  bestInClass: {
    statement: "In the UK the UKONS Triage Assessment Tool, version 3, is the national standard in practice: 90% of providers use it and a further 9 use versions based on it (UKAOS 2025). Its rules are a symptom-by-symptom 0 to 4 grade with a colour, one amber for review within 24 hours, two ambers escalating to red, and red for face-to-face assessment as soon as possible, with fever at 37.5 °C or more (or below 36 °C) on treatment always triggering the neutropenia pathway. The UKAOS 2025 review, written with UKONS, is the current UK statement on how the service around the tool should run (trained and competency-assessed staff, 24-hour access, records and audit). It is not a graded guideline: the tool is an expert consensus instrument, and its outcomes have been described in service evaluations rather than tested in a trial. The strongest trial evidence for structured symptom reporting comes from patient-reported outcome monitoring (Basch 2016: fewer emergency visits and better quality of life), which complements rather than replaces the phone line.",
    sources: ["ukons-v3", "ukaos-2025", "clatterbridge-2023", "basch-2016"],
  },
  variants: [
    {
      name: "Non-clinical call handlers out of hours (Scotland's Cancer Treatment Helpline)",
      differs: "Out of hours, calls go to NHS24, where a trained non-clinical handler asks the UKONS questions and routes the caller; in hours a trained oncology nurse triages. The UKAOS review found 41 UK providers relied on non-clinical staff to answer first.",
      evidence: "NHS Tayside service review of 8385 calls, 2016 to 2020: 35% advice only, 41% review, 24% review and admission; 85% handled by oncology alone. A descriptive single-centre review without a comparison group.",
      sources: ["tayside-2021", "ukaos-2025"],
    },
    {
      name: "COSTaRS practice guides (Canada)",
      differs: "Symptom-specific practice guides for nurses giving remote support (17 after the 2020 update, with a guide for difficulty swallowing added in 2026), with assessment, triage, medicines and self-care sections, CTCAE grades added in 2020, and a requirement to review three or more self-care strategies.",
      evidence: "Built from systematic reviews of guidelines (86 new sources in 2020; 175 in the 2026 update) and validated by Canadian oncology nurses. Read only as abstracts.",
      sources: ["costars-2020", "costars-2026"],
    },
    {
      name: "Digital daily symptom check-ins mapped to the UKONS tiers (Leicester)",
      differs: "Patients report symptoms in an app each day; answers are mapped to green, amber or red, and red tells the patient to ring the 24-hour line. Alerts are grouped into episodes for clinician review in weekday working hours only.",
      evidence: "A 10-week single-centre service evaluation of 32 patients: 91.7% of check-ins completed, median 47 minutes to first response for in-hours red alerts, no safety signal found. Not a trial.",
      sources: ["jmir-2026"],
    },
  ],
  grades: [
    { claim: "One amber: review within 24 hours", grade: "not graded (expert consensus tool)", source: "ukons-v3", quote: "1 Amber = review within 24 hours" },
    { claim: "Two or more ambers: escalate to red", grade: "not graded (expert consensus tool)", source: "ukons-v3", quote: "2 or more amber = escalate to red" },
    { claim: "Use of a national triage tool supports standard competency, training and data", grade: "recommendation (service review; not graded)", source: "ukaos-2025", quote: "The use of a national triage tool would support the development of standard competency, training and education programmes, and support the collection of detailed presentation data using a universal toxicity grading standard." },
  ],
  sources: [
    { key: "ukons-v3", label: "Oncology/Haemato-oncology Triage Line: Triage Assessment Tool, version 3 (A3 poster)", publisher: "UK Oncology Nursing Society (UKONS), hosted by the UK Acute Oncology Society", year: 2025, url: "https://www.ukacuteoncology.co.uk/application/files/4217/3799/3595/UKONS_Triage_tool_poster_A3_V10.pdf", gradingScheme: "An expert consensus triage instrument: each symptom graded 0 to 4 with a colour; the recommendations are not graded. The poster carries no publication date; the year given is the PDF's own creation date (21 January 2025).", read: "full-text", accessed: "2026-11-11" },
    { key: "ukaos-2025", label: "A UK Review of Systemic Anti-cancer Therapy Helplines: Getting it right first time for cancer patients", publisher: "UK Acute Oncology Society (UKAOS) with UKONS and UKSB", year: 2025, url: "https://www.ukacuteoncology.co.uk/application/files/7117/5260/7575/UKAOS_4_Nations_Report_v7_003_PDF_2.pdf", gradingScheme: "A four-nations survey and scoping review with recommendations; recommendations are not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "clatterbridge-2023", label: "Evaluation of an established oncology triage hotline in a model of emergency department avoidance: assessing the UKONS triage tool and call outcomes", publisher: "Supportive Care in Cancer", year: 2023, url: "https://europepmc.org/abstract/MED/38051438", doi: "10.1007/s00520-023-08167-7", read: "abstract", accessed: "2026-11-11" },
    { key: "tayside-2021", label: "Cancer Treatment Helpline: a retrospective study of the NHS Tayside experience", publisher: "BMJ Open Quality", year: 2021, url: "https://europepmc.org/article/PMC/PMC8211038", doi: "10.1136/bmjoq-2021-001488", read: "full-text", accessed: "2026-11-11" },
    { key: "jmir-2026", label: "Implementing UK Oncology Nursing Society-Informed Digital Symptom Triage With Episode-Based Review in Routine NHS Acute Oncology: Service Evaluation", publisher: "JMIR Cancer", year: 2026, url: "https://europepmc.org/article/PMC/PMC13237529", doi: "10.2196/92586", read: "full-text", accessed: "2026-11-11" },
    { key: "costars-2020", label: "Pan-Canadian Oncology Symptom Triage and Remote Support (COSTaRS) practice guides: what's changed in Version 2020?", publisher: "Canadian Oncology Nursing Journal", year: 2020, url: "https://europepmc.org/abstract/MED/33165347", doi: "10.5737/23688076304269276", read: "abstract", accessed: "2026-11-11" },
    { key: "costars-2026", label: "Leveraging co-production in the systematic review of evidence to update the Pan-Canadian Oncology Symptom Triage and Remote Support (COSTaRS) practice guides", publisher: "Canadian Oncology Nursing Journal", year: 2026, url: "https://europepmc.org/abstract/MED/42621903", doi: "10.5737/23688076362128", read: "abstract", accessed: "2026-11-11" },
    { key: "basch-2016", label: "Symptom Monitoring With Patient-Reported Outcomes During Routine Cancer Treatment: A Randomized Controlled Trial", publisher: "Journal of Clinical Oncology", year: 2016, url: "https://europepmc.org/abstract/MED/26644527", doi: "10.1200/JCO.2015.63.0830", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-acc-electronic-pro-monitoring-standard"],
  gaps: [
    "The UKONS tool's own guidance document (training, competency and the full log sheet) was not found publicly; only the version 3 poster was read. ukons.org does not list the tool among its public resources.",
    "No randomised trial has compared telephone triage with a structured tool against unstructured advice; the evidence for the UKONS tool is service evaluations (Clatterbridge, Tayside) and the expert consensus behind it.",
    "Cut-off periods after treatment differ between UK providers (6 weeks, 8 weeks or 3 to 6 months), and the tool itself uses 6 to 8 weeks for fever; no source read sets one national cut-off.",
    "The COSTaRS practice guides and their 2026 update were read only as abstracts; their triage thresholds are not compared with UKONS here.",
    "A paediatric oncology telephone triage toolkit exists (J Pediatr Hematol Oncol Nurs 2026, linguistic validation) but was not read; children are not covered.",
  ],
  technologies: ["epro-symptom-monitoring"],
  institutions: ["clatterbridge", "leicester-cancer-research-centre"],
  terms: ["febrile-neutropenia", "ctcae-grading", "superior-vena-cava-obstruction"],
  keyPapers: ["paper-basch-epro-survival-jama-2017"],
  related: ["febrile-neutropenia-first-hour", "metastatic-spinal-cord-compression-emergency", "icans-grading-and-management", "idea-acc-acute-oncology-assessment-units"],
  tags: ["protocol", "acute-oncology", "oncological-emergency", "telephone-triage"],
});

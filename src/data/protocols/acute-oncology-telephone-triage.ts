import { protocol } from "./helpers";

/*
 * Telephone triage of people on cancer treatment who ring a 24-hour helpline (acute oncology advice line).
 *
 * First written 11 November 2026. Second accuracy pass, 16 November 2026: every source was fetched again raw with
 * curl and every claim re-read against the text.
 * - UKONS Oncology/Haemato-oncology 24-Hour Triage Toolkit, Information and Instruction Manual, 3rd edition, December
 *   2024 (32 pages): NOT read in the first pass, which said ukons.org did not list it. It is listed on the UKONS
 *   "publicly available resources" page; the PDF was read in full with pdftotext on 16 November 2026. It holds the
 *   scope, the triage algorithm, the definitions of red, amber and green, the log sheet and the training and
 *   competency rules, and is now a source in its own right.
 * - UKONS Triage Assessment Tool, version 3 (A3 poster): the copy on ukons.org and the copy hosted by the UK Acute
 *   Oncology Society were both fetched (both answered 200) and their text is identical. Read in full as text, and the
 *   page rendered to an image to read the colours, which the text does not carry (chest pain is red from grade 1 to
 *   4; fever on SACT is red). The poster carries "This Tool Kit cannot be reproduced", so only short sentences are
 *   quoted and the grade table is not copied.
 * - UKAOS, UKONS and UKSB, "A UK Review of Systemic Anti-cancer Therapy Helplines" (June 2025): full PDF from
 *   ukacuteoncology.co.uk, read as text (two columns; only sentences that run contiguously in the text are quoted).
 * - Clatterbridge evaluation (Supportive Care in Cancer 2023): abstract from Europe PMC; the full text is behind the
 *   publisher's subscription and was not read.
 * - NHS Tayside Cancer Treatment Helpline (BMJ Open Quality 2021) and the Leicester digital triage evaluation (JMIR
 *   Cancer 2026): open access, full text XML from Europe PMC.
 * - COSTaRS 2020 and 2026 update papers (Canadian Oncology Nursing Journal) and Basch et al. 2016 (JCO): abstracts
 *   from Europe PMC, and the full text as HTML from PubMed Central, searched for the claims used here. The COSTaRS
 *   papers describe the update; they do not print the guides' triage thresholds.
 * Every DOI was resolved through Crossref and its title checked. Every quote checked by script against the raw text.
 */
export const acuteOncologyTelephoneTriage = protocol({
  id: "acute-oncology-telephone-triage",
  name: "Acute oncology telephone triage: the 24-hour helpline and the UKONS red, amber and green grading",
  aka: ["UKONS triage tool", "24-hour SACT helpline", "chemotherapy helpline", "oncology triage line", "acute oncology advice line", "Cancer Treatment Helpline"],
  domain: "emergencies",
  tldr: "During cancer treatment you should have a phone number answered day and night. Trained staff ask set questions about each symptom and grade it green, amber or red. Green means advice for home, one amber a review within 24 hours, and red (or two ambers) being seen in person as soon as possible. On or soon after treatment, a temperature of 37.5 °C or more, or below 36 °C, means urgent assessment.",
  simple: "Keep your cancer helpline number with you. Ring it if you feel unwell during treatment. Trained staff will ask questions and tell you whether you need to come in.",
  summary: "The UK model: everyone on systemic anticancer therapy (SACT) or radiotherapy should have a 24-hour number for specialist advice, and calls are triaged with the UKONS 24-Hour Triage Toolkit, now in its third edition (December 2024), whose Triage Assessment Tool is version 3. The tool is based on the NCI-CTCAE criteria: each of 19 symptoms is graded from 0 to 4 and each grade carries a colour. All green is self-care advice; one amber is a review within 24 hours; two or more ambers escalate to red; red is a face-to-face assessment as soon as possible. Every caller who stays at home is told to ring back if anything changes. Two rows are red at every grade above none: chest pain (stop SACT, advise 999, arrange disconnection of an infusion pump), and fever on SACT, where within 6 to 8 weeks of treatment, or in someone immunocompromised, a temperature of 37.5 °C or above, below 36.0 °C, or feeling generally unwell means urgent assessment on the neutropenia pathway, with a caution that analgesia, steroids or dehydration can mask a temperature. Version 3 carries a caution that checkpoint inhibitor problems can appear months to years after treatment, and prompts to consider ICANS with altered consciousness, ICANS or CRS with headache, MSCC with back pain and SVCO with breathlessness.\n\nThe toolkit is for staff of any discipline who have been trained in it: four online modules, scenario practice, observed practice and a competency assessment, repeated every year. It says that anyone without that training and assessment should not be triaging calls. A log sheet is completed for every call and reviewed within 24 hours.\n\nThe UKAOS four-nations review (June 2025) found 99% of UK providers support 24/7 access and 90% use the UKONS tool, but variation in who answers (41 providers relied on non-clinical staff to answer and triage first in core hours), in cut-off periods after treatment, and in records; it recommends a national framework, trained and competency-assessed triage staff, and standardised data. In Clatterbridge's year of calls, 45.2% of clinical calls were red, and 72.3% of out-of-hours reds went to the emergency department against 38.3% in hours. Scotland's Cancer Treatment Helpline routes out-of-hours calls through NHS24 call handlers using UKONS questions. Canada's COSTaRS practice guides (updated 2020 and 2026) are the main national alternative.",
  asOf: "2026-11-16",
  setting: {
    who: ["nurse", "patient-or-carer", "doctor"],
    where: ["telephone-triage", "acute-oncology-service", "home"],
  },
  population: "People who are receiving or have received systemic anticancer therapy, or any other anticancer treatment including radiotherapy and bone marrow transplant, who call a specialist helpline; the toolkit includes teenagers and young adults treated in adult services. People who have had an immune checkpoint inhibitor are covered at any time afterwards. For bleeding, haematology patients follow local policy. Children's services, and teenagers treated in them, use a separate children and young people's version (noted in gaps), which is not covered here.",
  trigger: "A patient, carer or health professional rings the 24-hour helpline about a symptom during or after cancer treatment.",
  steps: [
    {
      action: "Give every person on anticancer treatment, or their carer, a 24-hour contact number for specialist advice and guidance on which symptoms to report and when",
      why: "Problems from treatment can become dangerous within hours, often at night or at weekends.",
      source: "ukaos-2025",
      quote: "All SACT patients and/or carers should receive a 24-hour contact number for specialist advice, along with guidance on symptom recognition and when to seek help.",
    },
    {
      action: "Give each person a card with their treatment details and the triage line number, to carry and show to other healthcare teams",
      why: "The card reminds the person whom to ring and tells any other team that they are on cancer treatment.",
      source: "ukons-toolkit-v3",
      quote: "The UKONS Triage Toolkit group supports these recommendations and would also recommend that a card containing key information about the treatment they are receiving and the triage line contact details should be provided for each patient/carer.",
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
      action: "Grade each symptom the caller reports against the tool; for a problem the tool does not list, record it under other, judge its severity with the latest NCI-CTCAE criteria and seek further clinical advice",
      why: "A shared grading scale means everyone who triages reaches the same decision for the same symptom.",
      source: "ukons-v3",
      quote: "Practitioners are advised to refer to the latest version of NCI-CTCAE common toxicity criteria to assess the severity of the problem and seek further clinical advice regarding management.",
    },
    {
      action: "If the person has had anticancer treatment in the last 6 to 8 weeks or is immunocompromised and has a temperature of 37.5 °C or above, below 36.0 °C, or feels generally unwell, arrange urgent assessment and clinical review on the neutropenia pathway",
      why: "After treatment the body may be unable to fight an infection, and feeling unwell counts even when the temperature is normal.",
      source: "ukons-v3",
      quote: "IF TEMPERATURE 37.5˚C OR ABOVE OR BELOW 36.0˚C OR GENERALLY UNWELL - URGENT ASSESSMENT AND CLINICAL REVIEW - FOLLOW NEUTROPENIA PATHWAY.",
    },
    {
      action: "Do not be reassured by a normal temperature in someone who has taken painkillers or steroids, or may be dehydrated; if in doubt, arrange a blood count",
      why: "These can hide a fever while an infection is developing.",
      source: "ukons-v3",
      quote: "ALERT - patients who have taken analgesia or steroids or who may be dehydrated may not present with an abnormal temperature but may still have an infection and be at risk of sepsis - if in doubt do a count.",
    },
    {
      action: "For chest pain, advise 999 and urgent emergency assessment, stop oral and intravenous anticancer treatment until reviewed, and arrange disconnection of any infusion pump",
      why: "The tool treats any chest pain as red: it needs an emergency assessment that cannot be made by phone.",
      source: "ukons-v3",
      quote: "STOP oral and intravenous Systemic Anti-Cancer Treatment (SACT) until reviewed by oncology or haematology team.",
    },
    {
      action: "With back pain, think of spinal cord compression; with breathlessness, think of superior vena cava obstruction, anaemia, a clot in the lung, pneumonitis and infection",
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
      action: "Tell every caller who stays at home to ring back if they are still worried or anything gets worse, and follow up a single amber within 24 hours",
      why: "Advice is based on what was known at the time of the call, and symptoms can change.",
      source: "ukons-toolkit-v3",
      quote: "Amber – one toxicity in the amber area should be followed up within 24 hours and the caller should be instructed to call back if they continue to have concerns or their condition deteriorates.",
    },
    {
      action: "Complete a log sheet for every call, put a copy in the patient record, tell the treating team, and have the log sheets reviewed within 24 hours",
      why: "The next nurse or doctor needs to know what was said and advised.",
      source: "ukons-toolkit-v3",
      quote: "A log sheet should be completed for all calls and unscheduled patient visits.",
    },
  ],
  bestInClass: {
    statement: "In the UK the UKONS 24-Hour Triage Toolkit, third edition (December 2024), with its version 3 assessment tool, is the national standard in practice: 136 of the providers surveyed (90%) use it and a further 9 use their own versions based on it (UKAOS 2025), and the toolkit describes itself as the only national guideline for oncology and haematology triage. Its rules are a symptom-by-symptom 0 to 4 grade with a colour, one amber for review within 24 hours, two ambers escalating to red, and red for face-to-face assessment as soon as possible, with fever at 37.5 °C or more (or below 36.0 °C) within 6 to 8 weeks of treatment or in someone immunocompromised always triggering the neutropenia pathway. The toolkit sets the training and yearly competency assessment for whoever triages, and the UKAOS 2025 review, written in partnership with UKONS and the UK SACT Board, is the current UK statement on how the service around the tool should run (trained and competency-assessed staff, 24-hour access, records and audit). Neither grades its recommendations: the tool was built and revised by review and consultation groups, a pilot of the first edition is reported in the toolkit, and its outcomes have since been described in service evaluations rather than tested in a trial. The strongest trial evidence for structured symptom reporting comes from patient-reported outcome monitoring (Basch 2016: fewer emergency room visits, 34% against 41%, and better quality of life), which complements rather than replaces the phone line.",
    sources: ["ukons-toolkit-v3", "ukons-v3", "ukaos-2025", "clatterbridge-2023", "basch-2016"],
  },
  variants: [
    {
      name: "Non-clinical call handlers out of hours (Scotland's Cancer Treatment Helpline)",
      differs: "Out of hours, calls go to NHS24, where a trained non-clinical handler asks the UKONS questions and routes the caller; in hours a trained oncology nurse triages. The UKONS toolkit is written for trained staff of any discipline. The UKAOS review found 41 UK providers relied on non-clinical staff (bands 3 and 4) to answer and triage first in core hours, against 105 using trained clinical staff only.",
      evidence: "NHS Tayside service review of 8385 calls, 2016 to 2020: 35% telephone advice only, 41% review by a healthcare professional, 24% review and admission; 85% assessed or advised by oncology alone. A descriptive single-centre review without a comparison group.",
      sources: ["tayside-2021", "ukaos-2025", "ukons-toolkit-v3"],
    },
    {
      name: "COSTaRS practice guides (Canada)",
      differs: "Symptom-specific practice guides for nurses giving remote support (17 after the 2020 update, with a guide for difficulty swallowing added in 2026), with assessment, triage, medicines and self-care sections, CTCAE grades added in 2020, and a requirement to review three or more self-care strategies.",
      evidence: "Built from systematic reviews of guidelines (86 new sources in 2020; 175 in the 2026 update) and the 2020 version was validated by oncology nurses from across Canada. The two papers describe the updates and do not print the guides' triage thresholds.",
      sources: ["costars-2020", "costars-2026"],
    },
    {
      name: "Digital daily symptom check-ins mapped to the UKONS tiers (Leicester)",
      differs: "Patients report symptoms in an app each day; answers are mapped to green, amber or red, and red tells the patient to contact the helpline urgently or attend the emergency department if unwell. Alerts are grouped into episodes for clinician review; the dashboard was monitored on weekdays from 9 am to 5 pm only, and the 24-hour helpline stayed in place.",
      evidence: "A 10-week single-centre service evaluation of 32 patients: 91.7% of check-ins completed, median 47 minutes to first response for in-hours red alerts. Two patients came to hospital on the same day as a green check-in, for problems that began after it; the authors judged neither attributable to the tool and found no other safety signal. Not a trial.",
      sources: ["jmir-2026"],
    },
  ],
  grades: [
    { claim: "One amber: review within 24 hours", grade: "not graded (expert consensus tool)", source: "ukons-v3", quote: "1 Amber = review within 24 hours" },
    { claim: "Two or more ambers: escalate to red", grade: "not graded (expert consensus tool)", source: "ukons-v3", quote: "2 or more amber = escalate to red" },
    { claim: "Staff without the training and competency assessment should not triage calls", grade: "not graded (toolkit guidance)", source: "ukons-toolkit-v3", quote: "It should be made clear that if they have not received training and competency assessment they should NOT be triaging calls to the triage line." },
    { claim: "Use of a national triage tool supports standard competency, training and data", grade: "recommendation (service review; not graded)", source: "ukaos-2025", quote: "The use of a national triage tool would support the development of standard competency, training and education programmes, and support the collection of detailed presentation data using a universal toxicity grading standard." },
  ],
  sources: [
    { key: "ukons-toolkit-v3", label: "Oncology/Haemato-oncology 24-Hour Triage Toolkit: Information and Instruction Manual, 3rd edition (December 2024)", publisher: "UK Oncology Nursing Society (UKONS)", year: 2024, url: "https://ukons.org/resources/publicly-available-resources", gradingScheme: "A national toolkit built and revised by review and consultation groups; its recommendations are not graded. The link is the UKONS page that lists the PDF.", read: "full-text", accessed: "2026-11-16" },
    { key: "ukons-v3", label: "Oncology/Haemato-oncology Triage Line: Triage Assessment Tool, version 3 (A3 poster)", publisher: "UK Oncology Nursing Society (UKONS); a copy is also hosted by the UK Acute Oncology Society", year: 2024, url: "https://ukons.org/resources/publicly-available-resources", gradingScheme: "A triage instrument from the toolkit's third edition (December 2024): each symptom graded 0 to 4 with a colour; the recommendations are not graded. The poster itself carries no date; its PDF was created on 21 January 2025. The link is the UKONS page that lists the PDF.", read: "full-text", accessed: "2026-11-16" },
    { key: "ukaos-2025", label: "A UK Review of Systemic Anti-cancer Therapy Helplines: Getting it right first time for cancer patients", publisher: "UK Acute Oncology Society (UKAOS) with UKONS and UKSB", year: 2025, url: "https://www.ukacuteoncology.co.uk/application/files/7117/5260/7575/UKAOS_4_Nations_Report_v7_003_PDF_2.pdf", gradingScheme: "A four-nations survey and scoping review with recommendations; recommendations are not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "clatterbridge-2023", label: "Evaluation of an established oncology triage hotline in a model of emergency department avoidance: assessing the UKONS triage tool and call outcomes", publisher: "Supportive Care in Cancer", year: 2023, url: "https://europepmc.org/abstract/MED/38051438", doi: "10.1007/s00520-023-08167-7", read: "abstract", accessed: "2026-11-16" },
    { key: "tayside-2021", label: "Cancer Treatment Helpline: a retrospective study of the NHS Tayside experience", publisher: "BMJ Open Quality", year: 2021, url: "https://europepmc.org/article/PMC/PMC8211038", doi: "10.1136/bmjoq-2021-001488", read: "full-text", accessed: "2026-11-16" },
    { key: "jmir-2026", label: "Implementing UK Oncology Nursing Society-Informed Digital Symptom Triage With Episode-Based Review in Routine NHS Acute Oncology: Service Evaluation", publisher: "JMIR Cancer", year: 2026, url: "https://europepmc.org/article/PMC/PMC13237529", doi: "10.2196/92586", read: "full-text", accessed: "2026-11-16" },
    { key: "costars-2020", label: "Pan-Canadian Oncology Symptom Triage and Remote Support (COSTaRS) practice guides: what's changed in Version 2020?", publisher: "Canadian Oncology Nursing Journal", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7597772/", doi: "10.5737/23688076304269276", read: "full-text", accessed: "2026-11-16" },
    { key: "costars-2026", label: "Leveraging co-production in the systematic review of evidence to update the Pan-Canadian Oncology Symptom Triage and Remote Support (COSTaRS) practice guides", publisher: "Canadian Oncology Nursing Journal", year: 2026, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13488159/", doi: "10.5737/23688076362128", read: "full-text", accessed: "2026-11-16" },
    { key: "basch-2016", label: "Symptom Monitoring With Patient-Reported Outcomes During Routine Cancer Treatment: A Randomized Controlled Trial", publisher: "Journal of Clinical Oncology", year: 2016, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4872028/", doi: "10.1200/JCO.2015.63.0830", read: "full-text", accessed: "2026-11-16" },
  ],
  upgrades: ["idea-acc-electronic-pro-monitoring-standard"],
  gaps: [
    "On 16 November 2026 the UKONS toolkit manual (third edition, December 2024), which the first version of this page said was not public, was found on the UKONS public resources page and read in full; the scope, the training rules and the log sheet steps here now rest on it. The children and young people's version of the tool, which the manual names, was not read.",
    "No randomised trial has compared telephone triage with a structured tool against unstructured advice. The toolkit reports a pilot of its first edition (of 101 callers asked to attend, 70, or 67%, needed intervention or admission); otherwise the evidence for the UKONS tool is service evaluations (Clatterbridge, Tayside) and the review and consultation behind it.",
    "The Clatterbridge evaluation was read only as its abstract: on 16 November 2026 the full text was behind the publisher's subscription with no open copy listed, so nothing beyond the abstract's figures is used.",
    "Cut-off periods after treatment differ between UK providers (of 65 with a defined period, 49 used 6 weeks, 10 used 8 weeks and the rest 3 to 6 months, while 96 said they triage on clinical need whatever the date). The tool uses 6 to 8 weeks for fever and the toolkit says the at-risk timeframe varies with the treatment; no source read sets one national cut-off.",
    "The two COSTaRS papers were read in full on 16 November 2026, but they describe how the guides were updated and do not print the triage thresholds; the practice guides themselves were not read, so their thresholds are not compared with UKONS here.",
    "A paediatric oncology telephone triage toolkit exists (J Pediatr Hematol Oncol Nurs 2026, linguistic validation) but was not read; children are not covered.",
  ],
  technologies: ["epro-symptom-monitoring"],
  institutions: ["clatterbridge", "leicester-cancer-research-centre"],
  terms: ["febrile-neutropenia", "ctcae-grading", "superior-vena-cava-obstruction"],
  keyPapers: ["paper-basch-epro-survival-jama-2017"],
  related: ["febrile-neutropenia-first-hour", "metastatic-spinal-cord-compression-emergency", "icans-grading-and-management", "idea-acc-acute-oncology-assessment-units"],
  tags: ["protocol", "acute-oncology", "oncological-emergency", "telephone-triage"],
});

import { protocol } from "./helpers";

/*
 * Suspected febrile neutropenia (neutropenic sepsis) in adults having anticancer treatment: the first hour.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - NICE CG151, recommendations page (HTML, full text) and its update-information page; the CG151 full guideline and
 *   evidence review PDF (pdftotext, full text) for the reasoning behind "immediately" and the GRADE ratings.
 * - NICE NG253 (suspected sepsis in people aged 16 or over), the full guideline PDF (pdftotext, full text). NG51 was
 *   checked and says it has been replaced by NG253, NG254 and NG255.
 * - SEOM 2018 guideline on febrile neutropenia in adults with solid tumours, open access, full text from Europe PMC
 *   (PMC6339667, full-text XML).
 * - MASCC 2026 consensus statement on febrile neutropenia with chemotherapy and immune checkpoint inhibitors, open
 *   access, full text from Europe PMC (PMC13421288, full-text XML).
 * - ASCO/IDSA 2018 outpatient guideline update, IDSA 2010 guideline, MASCC risk index paper (2000) and the CISNE
 *   validation paper (2015): abstracts only, from the Europe PMC REST API. Their full texts sit behind publisher pages
 *   that returned 403 to a script.
 * - ESMO 2016 guideline (Klastersky et al.): no abstract in Europe PMC, and the publisher PDF returned 403. Not read;
 *   named in sources so the page can say so, and no step rests on it.
 * - Cardiff and Vale University Health Board policy UHB 529 (approved 13 May 2025), public PDF, full text: a variant only.
 * Every DOI was resolved through Crossref and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed.
 *
 * Second accuracy pass, 16 November 2026. Every source above was fetched again with curl and read as raw text: the
 * CG151 recommendations and update-information pages (HTML), the CG151 full guideline (pdftotext), the NG253 guideline
 * PDF (pdftotext; NICE now dates it "last updated 23 September 2026", a procalcitonin update that leaves the
 * recommendations cited here unchanged), SEOM 2018 and MASCC 2026 (Europe PMC full-text XML), the Cardiff and Vale
 * policy PDF, and the four abstracts from the Europe PMC REST API. All seven DOIs were resolved again through Crossref.
 * All 24 quotes were checked by script against the saved text. One was verbatim but from the wrong section: the "very
 * low" GRADE sentence quoted for antibiotic timing was the one NICE wrote about staff training, and is replaced by the
 * sentence from the timing section. Several "why" lines said more than their source and were reworded to it. The ESMO,
 * ASCO/IDSA, IDSA, MASCC index and CISNE publisher pages still returned 403 to a script, and IDSA's own page now marks
 * its 2010 guideline "ARCHIVED" and carries only the abstract.
 */
export const febrileNeutropeniaFirstHour = protocol({
  id: "febrile-neutropenia-first-hour",
  name: "Suspected febrile neutropenia (neutropenic sepsis): the first hour",
  aka: ["neutropenic sepsis first hour", "febrile neutropenia door-to-needle", "neutropenic fever emergency management", "suspected neutropenic sepsis"],
  domain: "emergencies",
  tldr: "Anyone having cancer treatment who feels unwell, with or without a high temperature, should ring their 24-hour cancer line and be seen in hospital straight away. There they should be given a strong antibiotic through a drip within about an hour, without waiting for the blood count to come back.",
  simple: "Cancer medicines can lower the white cells that fight germs. If you feel ill during treatment, even without a fever, ring your cancer helpline at once. The hospital should give you antibiotics quickly, usually within an hour.",
  summary: "Suspect neutropenic sepsis in any adult having anticancer treatment who becomes unwell (NICE CG151 1.3.1.1); NICE NG253 widens this to systemic anticancer treatment within the last 30 days and to people on immunosuppressants, and warns that people having treatment for cancer may not develop a raised temperature. NICE confirms the diagnosis later, at a neutrophil count of 0.5 × 10⁹/L or lower with a temperature higher than 38 °C or other signs of clinically significant sepsis; SEOM uses a temperature above 38 °C or clinical signs of sepsis with neutrophils below 500/mm³, or below 1000/mm³ before the nadir.\n\nTreatment does not wait for the count. NICE says to offer empiric antibiotics immediately and sets no clock, because its committee found the evidence on timing very low quality; ASCO/IDSA (2018) endorse the first dose within 1 hour of triage, and SEOM (2018) within the first hour of arrival in the emergency department, after cultures. NICE's first choice is piperacillin with tazobactam alone, with no aminoglycoside, and no empiric glycopeptide for people with a central venous access device, unless there are patient-specific or local microbiological reasons; SEOM allows any anti-pseudomonal beta-lactam and adds amikacin, preferably with a carbapenem, when severity criteria are met. Bloods include full blood count, renal and liver function with albumin, C-reactive protein, lactate and blood cultures, with an additional peripheral blood culture, if clinically feasible, where there is a central venous access device, which stays in.\n\nWithin 24 hours a competent clinician scores the risk of septic complications with a validated tool (MASCC; CISNE for stable patients with solid tumours on moderate-intensity chemotherapy in SEOM). In the MASCC 2026 statement a score of 21 or more marks those likely to be suitable for outpatient or ambulatory emergency care; under 21 is high risk and needs standard neutropenic sepsis management. Under NG253, when a high-risk patient does not respond within 1 hour of any intervention, the senior clinical decision maker attends in person, a critical care specialist or team is consulted and the responsible consultant is informed.",
  asOf: "2026-11-16",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor", "emergency-team"],
    where: ["home", "telephone-triage", "emergency-department", "acute-oncology-service", "ward"],
  },
  population: "Adults having anticancer treatment, chemotherapy above all, who become unwell or have a fever. NICE CG151 covers people of any age with age-specific recommendations marked; this protocol follows its adult recommendations and NG253, which covers people aged 16 or over. Children, and people after stem cell transplant or with acute leukaemia where local haematology protocols differ, are not covered here.",
  trigger: "A person having anticancer treatment (NICE NG253: systemic anticancer treatment within the last 30 days) becomes unwell, with or without a temperature above 38 °C.",
  steps: [
    {
      action: "Before treatment starts, give the patient and carer written and spoken information on neutropenic sepsis and the 24-hour number",
      why: "The person needs to know what neutropenic sepsis is, and how and when to reach 24-hour specialist advice or emergency care, before they need to.",
      source: "nice-cg151",
      quote: "Provide patients having anticancer treatment and their carers with written and oral information, both before starting and throughout their anticancer treatment, on:",
    },
    {
      action: "On the phone or at the door, suspect neutropenic sepsis in anyone having anticancer treatment who is unwell",
      why: "The trigger is feeling unwell during treatment, not a number on a thermometer.",
      source: "nice-cg151",
      quote: "Suspect neutropenic sepsis in patients having anticancer treatment who become unwell.",
    },
    {
      action: "Do not rule sepsis out because the temperature is normal",
      why: "NICE lists people having treatment for cancer among the groups who may have sepsis without developing a raised temperature.",
      source: "nice-ng253",
      quote: "Do not rely on fever or hypothermia alone to rule sepsis either in or out.",
    },
    {
      action: "Send the person to hospital at once; do not book a routine appointment",
      why: "Assessment and the first antibiotic happen in hospital, so any delay at the telephone stage adds to the time before treatment.",
      source: "nice-cg151",
      quote: "Refer patients with suspected neutropenic sepsis immediately for assessment in secondary or tertiary care.",
    },
    {
      action: "Treat it as an emergency on arrival and start empiric antibiotics immediately",
      why: "NICE's committee found no study that fixed the best time, but judged that giving antibiotics as soon as possible could improve survival and reduce complications.",
      source: "nice-cg151",
      quote: "Treat suspected neutropenic sepsis as an acute medical emergency and offer empiric antibiotic therapy immediately.",
    },
    {
      action: "Give the first dose within one hour of arrival in the emergency department",
      why: "SEOM sets the first hour of arrival and ASCO/IDSA one hour from triage; NICE names no period, though 65 of the 73 local protocols in its 2012 survey that gave a time had a one-hour target.",
      source: "seom-2018",
      quote: "Empirical antibiotic therapy should be initiated within the first hour of arrival at the ED (after sampling for cultures)",
      grade: "II, A",
    },
    {
      action: "Do not wait for the neutrophil count before giving the antibiotic",
      why: "NICE's antibiotic recommendation applies to suspected neutropenic sepsis, and the count appears only in its later recommendation on confirming the diagnosis (CG151 1.4.4.1).",
      source: "nice-cg151",
    },
    {
      action: "Take a history, examine, and send full blood count, kidney and liver tests with albumin, C-reactive protein, lactate and blood cultures",
      why: "These find the likely source and show how unwell the person is, which decides the next steps.",
      source: "nice-cg151",
    },
    {
      action: "Take two sets of blood cultures before the antibiotic, inside the hour, plus other samples the history points to",
      why: "SEOM asks for the samples before the antibiotic and for the antibiotic within the first hour, so both have to fit inside it.",
      source: "seom-2018",
      quote: "Two pairs of blood cultures and microbiological specimens, as clinically indicated, should be obtained prior to initiating empirical antibiotic therapy",
      grade: "III, A",
    },
    {
      action: "If there is a central line, port or PICC, take an extra blood culture from a vein if feasible, and leave the line in",
      why: "NICE asks for the extra culture to help find the cause of the sepsis, and found no group of patients who benefit from having the line taken out at this stage.",
      source: "nice-cg151",
      quote: "Do not remove central venous access devices as part of the initial empiric management of suspected neutropenic sepsis.",
    },
    {
      action: "Give piperacillin with tazobactam on its own as the first antibiotic, unless allergy or local resistance rules it out",
      why: "NICE's analysis found lower mortality and less kidney harm with this single drug than with a carbapenem or with an added aminoglycoside.",
      source: "nice-cg151",
      quote: "Offer beta lactam monotherapy with piperacillin with tazobactam as initial empiric antibiotic therapy to patients with suspected neutropenic sepsis who need intravenous treatment unless there are patient-specific or local microbiological contraindications.",
    },
    {
      action: "Do not add an aminoglycoside, or a glycopeptide because a central line is in place, without a specific reason",
      why: "NICE allows an aminoglycoside, or an empiric glycopeptide for someone with a central venous access device, only where there are patient-specific or local microbiological reasons.",
      source: "nice-cg151",
      quote: "Do not offer an aminoglycoside, either as monotherapy or in dual therapy, for the initial empiric treatment of suspected neutropenic sepsis unless there are patient-specific or local microbiological indications.",
    },
    {
      action: "Do a chest X-ray only if the history or examination points to the chest",
      why: "NICE found no evidence that a routine chest X-ray changed immediate management; SEOM includes one in the first assessment (see variants).",
      source: "nice-cg151",
      quote: "Do not perform a chest X-ray unless clinically indicated.",
    },
    {
      action: "If a high-risk patient has not responded within an hour of any intervention, get the senior clinical decision maker in person, refer to or discuss with critical care, and tell the responsible consultant",
      why: "NICE makes no response within an hour of any intervention the point at which senior doctors and the critical care team are brought in.",
      source: "nice-ng253",
      quote: "If a person aged 16 years or over who is at high risk of severe illness or death from sepsis does not respond within 1 hour of any intervention:",
    },
    {
      action: "Within 24 hours, have a competent clinician score the risk of complications with a validated tool such as MASCC",
      why: "NICE asks clinicians to consider outpatient antibiotics for people at low risk of septic complications, so the score decides who may be treated at home.",
      source: "nice-cg151",
      quote: "A healthcare professional with competence in managing complications of anticancer treatment should assess the patient's risk of septic complications within 24 hours of presentation to secondary or tertiary care, basing the risk assessment on presentation features and using a validated risk scoring system.",
    },
    {
      action: "Treat a MASCC score under 21 as high risk needing standard neutropenic sepsis management, and consider 21 or more for outpatient care",
      why: "In the original validation (Klastersky and colleagues, 2000) a score of 21 or more picked out low-risk patients with a positive predictive value of 91 per cent. The MASCC 2026 statement is written about people having chemotherapy with an immune checkpoint inhibitor.",
      source: "mascc-2026",
      quote: "Patients treated with chemotherapy/ICI presenting with febrile neutropenia and a MASCC risk index < 21 are high risk and require standard neutropenic sepsis management.",
      grade: "A",
    },
    {
      action: "For outpatient treatment, give the first dose intravenously within the hour, observe for at least 4 hours, then switch to oral antibiotics",
      why: "SEOM reports serious complications in the first 3 hours in 7.3 to 18.6 per cent of people who looked stable; ASCO/IDSA name an oral fluoroquinolone with amoxicillin and clavulanate unless a fluoroquinolone was already being taken as prevention.",
      source: "seom-2018",
      quote: "In low-risk patients for whom ambulatory treatment has been decided on, the first dose of antibiotic should be administered via IV within the first hour and the patient should remain in observation at the hospital for at least 4 h",
      grade: "III, B",
    },
  ],
  bestInClass: {
    statement: "Start empiric intravenous antibiotics on suspicion, without waiting for the neutrophil count. On timing the guidelines differ in wording and in where the clock starts: NICE CG151 says immediately and sets no clock, judging the evidence too weak to name a period while noting the one-hour pathway of the National Cancer Peer Review Programme; ASCO/IDSA (2018) endorse the first dose within 1 hour of triage; SEOM (2018) within the first hour of arrival in the emergency department, after cultures. NICE NG253 times its general sepsis antibiotic from the NEWS2 score at initial assessment but sends neutropenic sepsis back to CG151. On the trigger, NICE confirms the diagnosis at neutrophils of 0.5 × 10⁹/L or lower with a temperature higher than 38 °C or other signs of clinically significant sepsis, and both NICE guidelines warn that people having cancer treatment may not run a temperature; SEOM uses above 38 °C or clinical signs of sepsis with neutrophils below 500/mm³, or below 1000/mm³ before the nadir. On the first drug, NICE recommends piperacillin with tazobactam alone; SEOM allows any anti-pseudomonal beta-lactam (piperacillin with tazobactam, meropenem, imipenem with cilastatin or cefepime) and adds amikacin when severity criteria are met. Risk scoring with MASCC (score of 21 or more is low risk) or, for stable patients with solid tumours, CISNE then decides who can continue at home.",
    sources: ["nice-cg151", "nice-cg151-full", "nice-ng253", "asco-idsa-2018", "seom-2018", "mascc-2026"],
  },
  variants: [
    {
      name: "Clock started at presentation, with nurse-given first dose (Cardiff and Vale University Health Board)",
      differs: "Sets a local standard of intravenous antibiotics within 60 minutes of presentation, suspects neutropenic sepsis in anyone given anticancer treatment in the last 6 weeks who is unwell, has signs or symptoms of infection, or has a temperature over 38 °C or under 36 °C, tells staff not to wait for blood count results, and in haematology lets assessed nurses give the first dose of piperacillin with tazobactam under a patient group direction. Its risk scoring section, which uses MASCC, is headed for solid organ malignancy only.",
      evidence: "A local policy that cites NICE CG151; it is not graded evidence.",
      sources: ["cardiff-vale-2025"],
    },
    {
      name: "Broader anti-pseudomonal choice and combination for severe cases (SEOM)",
      differs: "Allows piperacillin with tazobactam, meropenem, imipenem with cilastatin or cefepime as the first beta-lactam, and for high-risk patients meeting severity criteria a beta-lactam, preferably a carbapenem, with amikacin; adds a gram-positive agent for suspected line or skin infection, pneumonia or haemodynamic instability.",
      evidence: "SEOM grades the beta-lactam choice I, A and the carbapenem with amikacin II, A. NICE advises against a routine aminoglycoside and keeps to piperacillin with tazobactam unless there are patient-specific or local reasons.",
      sources: ["seom-2018", "nice-cg151"],
    },
    {
      name: "Chest X-ray for everyone (SEOM)",
      differs: "Includes a chest X-ray in every initial assessment, where NICE advises one only when clinically indicated.",
      evidence: "SEOM grades its initial evaluation including chest X-ray III, B; NICE makes the opposite recommendation without a grade.",
      sources: ["seom-2018", "nice-cg151"],
    },
    {
      name: "CISNE instead of MASCC for stable patients with solid tumours (SEOM)",
      differs: "Uses the Clinical Index of Stable Febrile Neutropenia (0 low, 1 to 2 intermediate, 3 or more high risk) in people with solid tumours on moderate-intensity chemotherapy who look clinically stable, and never in haematological cancers or lymphoma.",
      evidence: "SEOM grades CISNE II, B. The CISNE validation study recruited 1,133 patients; in its validation subset the area under the curve was 0.868 for CISNE against 0.721 for MASCC.",
      sources: ["seom-2018", "cisne-2015"],
    },
  ],
  grades: [
    { claim: "Empirical antibiotics within the first hour of arrival in the emergency department, after cultures", grade: "II, A", source: "seom-2018", quote: "Empirical antibiotic therapy should be initiated within the first hour of arrival at the ED (after sampling for cultures)" },
    { claim: "First intravenous antibiotic is an anti-pseudomonal beta-lactam", grade: "I, A", source: "seom-2018", quote: "Initial parenteral antibiotherapy should include a beta-lactam with activity against Pseudomonas spp. (piperacillin/tazobactam, meropenem, imipenem–cilastatin, cefepime)" },
    { claim: "Blood cultures before the first antibiotic", grade: "III, A", source: "seom-2018", quote: "Two pairs of blood cultures and microbiological specimens, as clinically indicated, should be obtained prior to initiating empirical antibiotic therapy" },
    { claim: "Severe cases: beta-lactam, preferably a carbapenem, with amikacin", grade: "II, A", source: "seom-2018", quote: "In high-risk patients meeting criteria for severity, initial parenteral antibiotherapy should include a beta-lactam with activity against Pseudomonas spp. (preferably a carbapenem) in combination with amikacin" },
    { claim: "CISNE score for clinically stable patients with solid tumours on moderate-intensity chemotherapy", grade: "II, B", source: "seom-2018", quote: "The application of the CISNE score is recommended in patients with apparent clinical stability and solid tumors on moderate-intensity chemotherapy" },
    { claim: "Outpatient route: first intravenous dose within the hour and at least 4 hours of observation", grade: "III, B", source: "seom-2018" },
    { claim: "First dose of empirical antibiotic within 1 hour of triage and at least 4 hours of monitoring before discharge", grade: "consensus recommendations (ASCO/IDSA Expert Panel)", source: "asco-idsa-2018", quote: "The panel continued to endorse consensus recommendations from the previous version of this guideline that patients with febrile neutropenia receive initial doses of empirical antibacterial therapy within 1 hour of triage and be monitored for ≥ 4 hours before discharge." },
    { claim: "MASCC score of 21 or more is likely to be suitable for outpatient or ambulatory care", grade: "A", source: "mascc-2026", quote: "The MASCC score is a well-validated score for risk stratification in febrile neutropenia and patients with a score ≥ 21 are likely to be suitable for outpatient or ambulatory emergency care" },
    { claim: "MASCC score under 21 is high risk and needs standard neutropenic sepsis management", grade: "A", source: "mascc-2026" },
    { claim: "Evidence on how fast antibiotics must be given in suspected neutropenic sepsis", grade: "very low (GRADE)", source: "nice-cg151-full", quote: "The GDG noted that the evidence was classified by GRADE as being of ‘very low’ quality and no studies defined the optimal time for administering antibiotics." },
    { claim: "Evidence for piperacillin with tazobactam monotherapy on mortality and treatment failure", grade: "moderate (GRADE)", source: "nice-cg151-full", quote: "The overall quality of the evidence as classified by GRADE was ‘moderate’ in addressing mortality and treatment failure, and low or very low in relation to adverse effects." },
  ],
  sources: [
    { key: "nice-cg151", label: "Neutropenic sepsis: prevention and management in people with cancer (CG151), recommendations", publisher: "NICE", year: 2012, url: "https://www.nice.org.uk/guidance/cg151/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the strength is in the wording ('offer', 'do not offer', 'consider'). Published September 2012; recommendation 1.2.1.1 updated January 2020, and 1.2.1.1 and 1.2.1.2 updated September 2024.", read: "full-text", accessed: "2026-11-16" },
    { key: "nice-cg151-full", label: "Neutropenic sepsis: prevention and management of neutropenic sepsis in cancer patients, full guideline and evidence review", publisher: "NICE (National Collaborating Centre for Cancer)", year: 2012, url: "https://www.nice.org.uk/guidance/cg151/evidence/full-guideline-pdf-188303581", gradingScheme: "Evidence for each question rated with GRADE as high, moderate, low or very low; recommendations themselves are not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "nice-ng253", label: "Suspected sepsis in people aged 16 or over: recognition, assessment and early management (NG253)", publisher: "NICE", year: 2025, url: "https://www.nice.org.uk/guidance/ng253", gradingScheme: "NICE does not grade recommendations; each is dated by the year it was written or amended, for example [2016, amended 2024]. Published 19 November 2025, last updated 23 September 2026.", read: "full-text", accessed: "2026-11-16" },
    { key: "seom-2018", label: "SEOM clinical practice guideline: management and prevention of febrile neutropenia in adults with solid tumors (2018)", publisher: "Spanish Society of Medical Oncology (SEOM), Clinical and Translational Oncology", year: 2019, url: "https://europepmc.org/article/PMC/PMC6339667", doi: "10.1007/s12094-018-1983-4", gradingScheme: "Infectious Diseases Society of America-US Public Health Service grading system, printed as level of evidence (I to III) and grade of recommendation (letter), for example II, A.", read: "full-text", accessed: "2026-11-16" },
    { key: "mascc-2026", label: "Febrile neutropenia in patients treated with chemotherapy/immune checkpoint inhibition: a MASCC consensus statement", publisher: "MASCC, Supportive Care in Cancer", year: 2026, url: "https://europepmc.org/article/PMC/PMC13421288", doi: "10.1007/s00520-026-11045-7", gradingScheme: "Ten expert-consensus position points, each graded on what the authors call the standard A to D scoring system; the grade is printed after the point.", read: "full-text", accessed: "2026-11-16" },
    { key: "asco-idsa-2018", label: "Outpatient Management of Fever and Neutropenia in Adults Treated for Malignancy: ASCO and IDSA Clinical Practice Guideline Update", publisher: "ASCO and IDSA, Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/abstract/MED/29461916", doi: "10.1200/JCO.2017.77.6211", read: "abstract", accessed: "2026-11-16" },
    { key: "idsa-2010", label: "Clinical Practice Guideline for the Use of Antimicrobial Agents in Neutropenic Patients with Cancer: 2010 Update by the Infectious Diseases Society of America", publisher: "IDSA, Clinical Infectious Diseases", year: 2011, url: "https://europepmc.org/abstract/MED/21258094", doi: "10.1093/cid/cir073", read: "abstract", accessed: "2026-11-16" },
    { key: "esmo-2016", label: "Management of febrile neutropaenia: ESMO Clinical Practice Guidelines", publisher: "ESMO, Annals of Oncology", year: 2016, url: "https://doi.org/10.1093/annonc/mdw325", doi: "10.1093/annonc/mdw325", read: "not-reachable", accessed: "2026-11-16" },
    { key: "mascc-index-2000", label: "The Multinational Association for Supportive Care in Cancer Risk Index: A Multinational Scoring System for Identifying Low-Risk Febrile Neutropenic Cancer Patients", publisher: "Journal of Clinical Oncology", year: 2000, url: "https://europepmc.org/abstract/MED/10944139", doi: "10.1200/JCO.2000.18.16.3038", read: "abstract", accessed: "2026-11-16" },
    { key: "cisne-2015", label: "Prediction of Serious Complications in Patients With Seemingly Stable Febrile Neutropenia: Validation of the Clinical Index of Stable Febrile Neutropenia in a Prospective Cohort of Patients From the FINITE Study", publisher: "Journal of Clinical Oncology", year: 2015, url: "https://europepmc.org/abstract/MED/25559804", doi: "10.1200/JCO.2014.57.2347", read: "abstract", accessed: "2026-11-16" },
    { key: "cardiff-vale-2025", label: "Policy for the management of suspected and proven neutropenic sepsis in adults (UHB 529)", publisher: "Cardiff and Vale University Health Board", year: 2025, url: "https://cavuhb.nhs.wales/files/policies-procedures-and-guidelines/patient-safety-and-quality/uhb-529-neutropenic-sepsis-policy-final-version-1-2-1-pdf/", read: "full-text", accessed: "2026-11-16" },
  ],
  related: ["idea-acc-hospital-at-home-oncology", "idea-acc-acute-oncology-assessment-units"],
  upgrades: [],
  gaps: [
    "The ESMO 2016 guideline could not be read: it has no abstract in Europe PMC and the publisher's page refused a script, again on 16 November 2026. Its fever threshold, time target and antibiotic choice are not stated here.",
    "The ASCO/IDSA 2018 update and the IDSA 2010 guideline were read only as abstracts, so their temperature definitions and full lists of first-line drugs are not given; the 2010 abstract says only that empirical antibiotic therapy should be immediate. On 16 November 2026 both publisher pages still refused a script, as did those of the MASCC index paper (2000) and the CISNE validation paper (2015), whose figures here come from their abstracts; and the IDSA's own page for its 2010 guideline is marked archived and carries only the abstract.",
    "On 16 November 2026 a search of Europe PMC and Crossref found no newer edition of the SEOM, ASCO/IDSA, ESMO or IDSA guidelines cited here. NICE last updated NG253 on 23 September 2026, for procalcitonin testing, and the recommendations used here are unchanged. Guidelines from other bodies that the search listed (the 2024 consensus guidelines on neutropenic fever in Internal Medicine Journal, and the 2024 update of the AGIHO guideline in The Lancet Regional Health Europe) were not read and are not compared here.",
    "No guideline read here gives evidence that one hour is better than another short interval; NICE judged the evidence on timing very low quality and declined to name a period.",
    "The UKONS 24-hour telephone triage toolkit, which the Cardiff and Vale policy lists as a supporting document, could not be found on the UKONS site by a script on 16 November 2026 (page not found), so it is not cited and its current version is not stated.",
    "NICE gives no specific first antibiotic for people with a penicillin allergy and leaves it to clinical judgement and local policy.",
    "The MASCC score has not been validated in people having chemotherapy combined with immune checkpoint inhibitors (MASCC 2026), and SEOM says CISNE must not be used in haematological cancers or lymphoma.",
  ],
  institutions: ["nice", "asco", "mascc"],
  drugs: ["piperacillin-tazobactam"],
  technologies: ["implanted-ports", "picc-lines"],
  terms: ["febrile-neutropenia", "neutropenia", "central-venous-access", "neutropenic-sepsis-breast-chemotherapy"],
  sections: ["supportive-care"],
  tags: ["protocol", "neutropenic-sepsis", "acute-oncology"],
});

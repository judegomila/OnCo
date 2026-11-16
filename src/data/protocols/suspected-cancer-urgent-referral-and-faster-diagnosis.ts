import { protocol } from "./helpers";

/*
 * The urgent referral of a person whose symptoms could be cancer, from the first appointment in primary care to the
 * day they are told whether they have cancer: who refers, on what threshold, what the person is told, safety netting
 * for those not referred, and the time standards. This is the process, not the symptom lists: the criteria for each
 * cancer are in the guidelines themselves and on OnCo's cancer pages.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - NICE NG12, Suspected cancer: recognition and referral (published 23 June 2015, last updated 15 April 2026, which
 *   the overview page states; the current edition): full text of the overview, "Using this guideline", the
 *   recommendations on patient support, safety netting and the diagnostic process (1.14 to 1.16), "Terms used in this
 *   guideline" and "Update information" (HTML from nice.org.uk). The recommendations organised by site were fetched
 *   and searched for their referral wording only; no symptom criterion is reproduced here.
 * - Scottish Referral Guidelines for Suspected Cancer 2025 (Scottish Government and the Centre for Sustainable
 *   Delivery, published 6 August 2025, erratum 13 April 2026; the current edition, which replaced the 2019 one): full
 *   text of the introduction, purpose, referral process and glossary (HTML from gov.scot); the cancer-by-cancer
 *   chapter was fetched and searched, not reproduced.
 * - Public Health Scotland, Cancer waiting times, 1 April to 30 June 2026 (the latest quarterly release, its page
 *   states the next is due 22 December 2026): the release page, which states the two national standards and the
 *   quarter's performance (HTML).
 * - Welsh Government, Guidelines for managing patients on the suspected cancer pathway, WHC/2024/07, version 6.5
 *   (10 April 2024): full text, PDF from gov.wales read with pdftotext. No later circular was found; that was not
 *   checked beyond the gov.wales page that serves it.
 * - Not reachable: NHS England's National cancer waiting times monitoring dataset guidance and its Faster diagnosis
 *   web page. england.nhs.uk answered a script with an empty 202 response (a bot check) for both, and the block was
 *   not bypassed. Both are named in sources and gaps and nothing here rests on them: what this page says about
 *   England comes from NICE NG12 alone, which defines a suspected cancer pathway referral by the 28-day outcome and
 *   states no percentage, no 31-day or 62-day standard and no clock rules.
 * - Not read: Northern Ireland's referral guidance and waiting time standards, and any country outside the United
 *   Kingdom (Denmark's cancer patient pathways, Australia's optimal care pathways, New Zealand's faster cancer
 *   treatment indicators). They are named in gaps and nothing here describes them.
 *
 * None of these documents grades its recommendations. NICE tags each with the year it was written; the others are
 * national guidance or operational rules. No source is funded by industry. Quotes are copied from the raw text with
 * line breaks joined and nothing else changed.
 */
export const suspectedCancerUrgentReferralAndFasterDiagnosis = protocol({
  id: "suspected-cancer-urgent-referral-and-faster-diagnosis",
  name: "Urgent suspected cancer referral, safety netting and the waiting time standards",
  aka: ["two-week wait", "2WW referral", "urgent suspected cancer referral", "suspected cancer pathway referral", "urgent suspicion of cancer referral", "USC referral", "Faster Diagnosis Standard", "28-day faster diagnosis standard", "62-day cancer standard", "suspected cancer pathway", "safety netting", "non-specific symptoms pathway", "rapid diagnostic centre referral", "cancer waiting times"],
  domain: "screening-diagnostics",
  tldr: "If a doctor, nurse, dentist or optician thinks your symptoms could be cancer, they send an urgent referral so that tests happen quickly. Most people referred this way do not have cancer. In England the national guideline defines this referral by the aim that you are told whether or not you have cancer within 28 days. Scotland and Wales count 62 days to the start of treatment instead. If you are not referred, you should be told which changes to watch for and when to come back.",
  simple: "An urgent cancer referral means your doctor wants tests done quickly to find out what is causing your symptoms. Most people who are referred do not have cancer. Ask where you are being sent, how long it should take, and who to ring if you hear nothing. Go to the appointment even if you feel better. If you are not referred, ask what to watch for and when to come back.",
  summary: "Threshold. NICE NG12 (last updated April 2026) and the Scottish Referral Guidelines 2025 both rest on a positive predictive value of 3% or more; Scotland reviewed lowering it and kept it. NG12 defines urgent as before 2 weeks, very urgent as within 48 hours and immediate as within a few hours, and since October 2023 defines a suspected cancer pathway referral by a 28-day outcome (diagnosis or ruling out of cancer) rather than by a two-week appointment.\n\nReferral (NG12 1.14 to 1.16). Tell the person they are being referred to a cancer service and that most people referred do not have cancer; say where, how long, which tests, and who to contact if no appointment arrives; make the referral within 1 working day on the local form; discuss with a specialist when unsure; have local arrangements to follow up people who miss appointments. In Scotland and Wales the receiving specialty may regrade a referral after triage, with the referrer and the patient told.\n\nSafety netting (NG12 1.15). Whoever orders a test acts on the result or explicitly hands that on; people with a symptom linked to cancer who do not meet criteria are offered a planned or patient-initiated review and told what to look for.\n\nTime standards. England: NG12 gives the 28-day definition and points to NHS England for the detail; NHS England's own guidance, which holds the percentages, the clock rules and the 31-day and 62-day treatment standards, could not be read and is not described here. Scotland: 62 days from urgent suspicion of cancer referral to first treatment and 31 days from decision to treat, each 95%; in April to June 2026, 73.6% and 94.8%. Wales: one suspected cancer pathway, 62 days from the point of suspicion (for a GP referral, the day it is sent) to first definitive treatment, at least 75%. Neither the Scottish nor the Welsh document read sets a standard for the day the diagnosis is communicated, though Wales asks that a diagnosis is communicated within 24 hours.\n\nThis page describes how the route is meant to work. The referral criteria and timings your own GP practice and hospital follow come first.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["community", "outpatient-clinic", "telephone-triage"],
  },
  population: "Children, young people and adults who see a health professional in primary care (a GP, nurse practitioner, dentist, optometrist or pharmacist) with symptoms or test results that could be caused by cancer, in England, Scotland and Wales. It does not cover people found through screening programmes, people who are already acutely unwell and need same-day admission, Northern Ireland, or countries outside the United Kingdom, whose rules were not read. It reproduces no symptom criteria: those are in NICE NG12 and the Scottish guidelines, cancer by cancer. Your own practice and hospital follow their national and local version of this route, and that comes first.",
  trigger: "A person tells a health professional about a symptom, or a test in primary care shows a result, that could be caused by cancer.",
  steps: [
    {
      action: "Check the symptoms, signs and test results against the national referral guideline, and refer urgently when the chance of cancer is about 3 in 100 or more",
      why: "The guidelines are built so that people are sent for tests when the chance of cancer is still small. That is why most people referred turn out not to have it.",
      source: "scot-srg-2025",
      quote: "This meant that a person should be referred for urgent assessment if there was a 3% (or greater) chance of their clinical features being due to cancer.",
    },
    {
      action: "Send people with emergency features for assessment the same day rather than by the urgent route",
      why: "A few presentations cannot wait even two weeks, and the urgent route is not built for them.",
      source: "nice-ng12",
      quote: "An acute admission or referral occurring within a few hours, or even more quickly if necessary.",
    },
    {
      action: "If you are unsure whether the symptoms warrant a referral, discuss them with a specialist by telephone or email",
      why: "A short conversation can settle the question, and lets the GP pass on their concern when the symptoms are not typical.",
      source: "nice-ng12",
      quote: "Discussion with a specialist (for example, by telephone or email) should be considered if there is uncertainty about the interpretation of symptoms and signs, and whether a referral is needed.",
      grade: "[2005]",
    },
    {
      action: "Use the non-specific symptoms route where symptoms such as unexplained weight loss or tiredness suggest cancer but fit no single cancer's criteria",
      why: "People whose symptoms do not point to one organ can otherwise be passed between clinics; this route looks at the whole picture.",
      source: "nice-ng12",
      quote: "This pathway should apply when symptoms are suggestive of cancer but do not clearly meet tumour-specific suspected cancer pathway referral criteria.",
    },
    {
      action: "Tell the person plainly that they are being referred to a cancer service, and that most people referred do not have cancer",
      why: "People who know why they are being referred are more likely to attend, and knowing that most referrals do not end in a cancer diagnosis keeps the wait in proportion.",
      source: "nice-ng12",
      quote: "Explain to people who are being referred with suspected cancer that they are being referred to a cancer service. Reassure them, as appropriate, that most people referred will not have a diagnosis of cancer, and discuss alternative diagnoses with them.",
      grade: "[2015]",
    },
    {
      action: "Say where the referral is going, how long the wait should be, which tests to expect, whether someone can come too, and who to contact if no appointment arrives",
      why: "A referral can go astray. Someone who knows when they should have heard, and who to ring, can catch that themselves.",
      source: "nice-ng12",
      quote: "who to contact if they do not receive confirmation of an appointment",
      grade: "[2015]",
    },
    {
      action: "Make the referral within 1 working day of deciding on it, on the local referral form, marked as urgent",
      why: "A day lost in the practice is a day added to the wait.",
      source: "nice-ng12",
      quote: "Once the decision to refer has been made, make sure that the referral is made within 1 working day.",
      grade: "[2005]",
    },
    {
      action: "Assess what support the person needs while they wait, and invite them to come back with any new worry or question before the hospital appointment",
      why: "The days between referral and first appointment are often the most anxious, and symptoms can change in them.",
      source: "nice-ng12",
      quote: "When referring a person with suspected cancer to a specialist service, assess their need for continuing support while waiting for their referral appointment.",
      grade: "[2005]",
    },
    {
      action: "Have a local system that spots people who miss an appointment, so they are contacted and followed up",
      why: "A missed appointment says little about whether the person has cancer, and those who miss appointments are often those with the most in their way.",
      source: "nice-ng12",
      quote: "Ensure local arrangements are in place to identify people who miss their appointments so that they can be followed up.",
      grade: "[2005]",
    },
    {
      action: "If the hospital changes the priority of a referral after reading it, tell the referring practice promptly and keep the person informed",
      why: "The GP may know something the form did not say, and a person who expects an urgent appointment needs to know if the plan has changed.",
      source: "scot-srg-2025",
      quote: "The referring GP practice should be notified promptly of any regrading with clear communication about decisions to reduce patient anxiety and facilitate continuity of care.",
    },
    {
      action: "Tell the person the outcome, cancer or not cancer, as soon as it is known: in England the urgent referral is defined by this happening within 28 days",
      why: "Being told there is no cancer matters as much as being told there is, and until someone says so the person is still waiting.",
      source: "nice-ng12",
      quote: "Person to receive a diagnosis or ruling out of cancer within 28 days of being referred urgently by their GP for suspected cancer.",
    },
    {
      action: "When cancer is ruled out but the symptoms continue, keep looking for the cause or refer on to the right specialty",
      why: "Not having cancer is not a diagnosis, and the symptom that started the referral still needs an explanation.",
      source: "scot-srg-2025",
      quote: "For people whose presenting symptoms persist, it is not acceptable to simply exclude cancer without providing an assessment of the underlying cause.",
    },
    {
      action: "Review and act on every test result, with the person who ordered the test either doing so or clearly handing the task to someone else",
      why: "A result nobody reads is one of the ways a cancer diagnosis is delayed.",
      source: "nice-ng12",
      quote: "Ensure that the results of investigations are reviewed and acted upon appropriately, with the healthcare professional who ordered the investigation taking or explicitly passing on responsibility for this.",
      grade: "[2015]",
    },
    {
      action: "For someone with a symptom linked to cancer who does not meet the criteria, agree a review: at a set time, or when they choose if things change or do not settle",
      why: "A symptom that is low risk today can become a reason to refer if it lasts or changes, and the plan for that should not be left to chance.",
      source: "nice-ng12",
      quote: "Consider a review for people with any symptom that is associated with an increased risk of cancer, but who do not meet the criteria for referral or other investigative action.",
      grade: "[2015]",
    },
    {
      action: "Tell the person which symptoms to watch and when to return, and write the advice in the record",
      why: "Safety netting only works if the person knows exactly what should bring them back.",
      source: "scot-srg-2025",
      quote: "It is also important for clinicians to provide a ‘safety net’ and ensure people know what symptoms to monitor and when to return if their condition does not improve or change.",
    },
    {
      action: "Consider referring a child who has come three or more times with a symptom that is not settling or not following the expected course, taking the parents' and the child's concerns into account",
      why: "Cancer in children is rare and its early symptoms look like common illnesses, so a pattern of repeat visits is itself a warning sign.",
      source: "scot-srg-2025",
      quote: "Referral to secondary care should be considered for children with repeat presentations (three or more times) of any symptoms which do not appear to be resolving or following an expected pattern, taking into account parent/carer and child concerns.",
    },
  ],
  bestInClass: {
    statement: "The steps of referral are the same in the guidelines read, and none of them grades its recommendations: refer at a risk of about 3% or more (NICE NG12, updated April 2026; Scottish Referral Guidelines 2025, which reviewed a lower threshold and kept 3%), tell the person it is a cancer referral and that most people referred do not have cancer, make the referral within 1 working day, and safety net those not referred. The nations differ on what is timed. England, as NICE NG12 defines it, times the diagnosis: a diagnosis or ruling out of cancer within 28 days of the urgent referral. The percentage of patients this must be met for, the rules for starting and stopping the clock, and England's treatment standards are in NHS England guidance that could not be read, so they are not stated here. Scotland times treatment: 62 days from urgent suspicion of cancer referral and 31 days from decision to treat, each for 95% of eligible patients. Wales times one pathway from the point of suspicion, which for a GP referral is the day it is sent: 62 days to first definitive treatment for at least 75%. In Scotland and Wales the receiving specialist may regrade a referral after triage, telling the referrer and the patient. No source read compares the outcomes of these designs, so none is shown here as the better one.",
    sources: ["nice-ng12", "scot-srg-2025", "phs-cwt-2026q2", "wales-whc-2024-07"],
  },
  variants: [
    {
      name: "England: the suspected cancer pathway referral, defined by a 28-day outcome",
      differs: "NICE NG12 defines the referral by its outcome, not by the date of the first appointment: \"Person to receive a diagnosis or ruling out of cancer within 28 days of being referred urgently by their GP for suspected cancer.\" Its own vocabulary of urgency is separate: urgent means before 2 weeks and very urgent within 48 hours, used for tests and appointments in individual recommendations.",
      evidence: "A definition, not a graded recommendation. NICE's update information records: \"October 2023: We updated the definition of suspected cancer pathway referral in line with NHS England's standard on faster diagnosis of cancer.\" NICE points to NHS England for the detail; that guidance could not be read, so the threshold, the clock rules and England's treatment standards are a gap on this page.",
      sources: ["nice-ng12"],
    },
    {
      name: "Scotland: urgent suspicion of cancer referral, timed to treatment",
      differs: "The guidelines are written for any primary care setting and any member of the clinical team. The receiving specialty triages the referral and may regrade it to urgent or routine, or regrade a routine referral upwards: \"It is essential that the patient is kept informed about any change in referral priority.\" The two national standards are timed to treatment, not to diagnosis: 62 days from urgent suspicion of cancer referral to first treatment, and 31 days from decision to treat to first treatment, each for 95% of eligible patients. The documents read set no standard for the day a person is told the diagnosis.",
      evidence: "Public Health Scotland, quarter ending 30 June 2026: \"73.6% of patients started treatment within 62 days, compared with 72.2% in the previous quarter, and 83.7% in the quarter ending 31 December 2019.\" and \"94.8% of patients started treatment within 31 days, compared with 94.5% in the previous quarter, and 96.5% in the quarter ending 31 December 2019.\" There were 4,492 eligible referrals under the 62-day standard in that quarter.",
      sources: ["scot-srg-2025", "phs-cwt-2026q2"],
    },
    {
      name: "Wales: one suspected cancer pathway from the point of suspicion",
      differs: "Wales measures a single pathway that starts at the point of suspicion, whoever first suspects cancer and wherever. For a referral from primary care the circular says: \"For primary care referrals there will be little change except the clock will start at the date the GP sent the referral rather than receipt of referral by secondary care.\" The specialist may downgrade a referral on reviewing it, and the reasons go to the referrer and the patient. There is one target, to treatment, and none for the day of diagnosis, though decisions must be communicated \"in a timely manner and within 24 hours for diagnosis\".",
      evidence: "Welsh Health Circular WHC/2024/07 (version 6.5, April 2024): \"The performance target for the SCP from December 2020 is that at least 75% of patients start their first definitive treatment within 62 days of the point of suspicion.\" Wales's current performance against it was not read for this page.",
      sources: ["wales-whc-2024-07"],
    },
    {
      name: "Non-specific symptoms pathways and rapid diagnostic services",
      differs: "For people with symptoms such as unexplained weight loss, tiredness, abdominal pain or nausea, or a GP's gut feeling, that fit no single cancer's criteria. NICE NG12 defines the pathway for England. In Scotland some health boards have a Rapid Cancer Diagnostic Service and others give GPs direct access to imaging: \"The availability of these pathways varies across NHS Boards.\"",
      evidence: "NICE: \"Non-specific symptoms pathways are designed for people whose symptoms do not clearly fit into a suspected cancer referral pathway as defined by this guideline.\" The Scottish guidelines describe GP gut feeling as predictive of cancer and usable alongside symptom criteria. No source read gives the proportion of people on these pathways who are found to have cancer.",
      sources: ["scot-srg-2025", "nice-ng12"],
    },
  ],
  grades: [
    { claim: "Tell people they are being referred to a cancer service and that most people referred will not have cancer", grade: "[2015]", source: "nice-ng12" },
    { claim: "Make the referral within 1 working day of the decision", grade: "[2005]", source: "nice-ng12" },
    { claim: "Urgent means before 2 weeks", grade: "Definition (not graded)", source: "nice-ng12", quote: "To happen or be done before 2 weeks." },
    { claim: "Very urgent means within 48 hours", grade: "Definition (not graded)", source: "nice-ng12", quote: "To happen within 48 hours." },
    { claim: "England: a suspected cancer pathway referral is defined by the 28-day outcome (definition updated October 2023)", grade: "Definition (not graded)", source: "nice-ng12", quote: "Person to receive a diagnosis or ruling out of cancer within 28 days of being referred urgently by their GP for suspected cancer." },
    { claim: "Safety netting has two parts: acting on results, and monitoring people at low but not no risk", grade: "Definition (not graded)", source: "nice-ng12", quote: "The active monitoring in primary care of people who have presented with symptoms." },
    { claim: "Offer a planned or patient-initiated review to people with a symptom linked to cancer who do not meet criteria", grade: "[2015]", source: "nice-ng12" },
    { claim: "Local arrangements for a maximum wait for non-urgent referrals", grade: "[2005]", source: "nice-ng12", quote: "Put in place local arrangements to ensure that there is a maximum waiting period for non-urgent referrals, in accordance with national targets and local arrangements." },
    { claim: "Scotland kept the referral threshold at a positive predictive value of 3% or more", grade: "Steering group decision (not graded)", source: "scot-srg-2025", quote: "Considering this modest effect on cancer detection and the current pressures on diagnostic services, the Steering Group decided to keep the current Guideline’s PPV threshold at equal to or greater than 3%." },
    { claim: "Scotland: 62 days from urgent suspicion of cancer referral to first treatment, 95%", grade: "National standard (not graded)", source: "phs-cwt-2026q2", quote: "The 62-day standard states that 95% of eligible patients should wait no longer than 62 days from urgent suspicion of cancer referral to first cancer treatment." },
    { claim: "Scotland: 31 days from decision to treat to first treatment, 95%", grade: "National standard (not graded)", source: "phs-cwt-2026q2", quote: "The 31-day standard states that 95% of eligible patients should wait no longer than 31 days from decision to treat to first cancer treatment." },
    { claim: "Wales: 62 days from the point of suspicion to first definitive treatment, at least 75%", grade: "Performance target (not graded)", source: "wales-whc-2024-07", quote: "The performance target for the SCP from December 2020 is that at least 75% of patients start their first definitive treatment within 62 days of the point of suspicion." },
    { claim: "Wales: decisions communicated to the patient and their primary care clinician within 24 hours for a diagnosis", grade: "Requirement of the circular (not graded)", source: "wales-whc-2024-07", quote: "Clinicians in secondary and tertiary care must ensure that all decisions relating to a patient’s care or treatment are communicated to the patient and their primary care clinician in a timely manner and within 24 hours for diagnosis." },
  ],
  sources: [
    {
      key: "nice-ng12",
      label: "Suspected cancer: recognition and referral (NG12), published 23 June 2015, last updated 15 April 2026",
      publisher: "NICE",
      year: 2026,
      url: "https://www.nice.org.uk/guidance/ng12",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended ([2005], [2015], [2015, amended 2023]). Definitions in 'Terms used in this guideline' carry no tag.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "scot-srg-2025",
      label: "Scottish Referral Guidelines for Suspected Cancer 2025 (published 6 August 2025, erratum 13 April 2026)",
      publisher: "Scottish Government and the Centre for Sustainable Delivery",
      year: 2025,
      url: "https://www.gov.scot/publications/scottish-referral-guidelines-suspected-cancer-2025/",
      gradingScheme: "Not graded: evidence reviews by Healthcare Improvement Scotland and Cancer Research UK, then clinical consensus at peer review sessions.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "phs-cwt-2026q2",
      label: "Cancer waiting times, 1 April to 30 June 2026",
      publisher: "Public Health Scotland",
      year: 2026,
      url: "https://publichealthscotland.scot/publications/cancer-waiting-times/cancer-waiting-times-1-april-to-30-june-2026/",
      read: "public-summary",
      accessed: "2026-11-16",
    },
    {
      key: "wales-whc-2024-07",
      label: "Guidelines for managing patients on the suspected cancer pathway, WHC/2024/07, version 6.5 (April 2024)",
      publisher: "Welsh Government",
      year: 2024,
      url: "https://www.gov.wales/suspected-cancer-pathway-guidelines-whc202407",
      gradingScheme: "A Welsh Health Circular: rules and a performance target, not graded recommendations.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "nhse-cwt-v12-1",
      label: "National cancer waiting times monitoring dataset guidance",
      publisher: "NHS England",
      year: 2025,
      url: "https://www.england.nhs.uk/long-read/national-cancer-waiting-times-monitoring-dataset-guidance/",
      read: "not-reachable",
      accessed: "2026-11-16",
    },
    {
      key: "nhse-faster-diagnosis",
      label: "Faster diagnosis: the Faster Diagnosis Framework and the Faster Diagnosis Standard (web page)",
      publisher: "NHS England",
      year: 2025,
      url: "https://www.england.nhs.uk/cancer/faster-diagnosis/",
      read: "not-reachable",
      accessed: "2026-11-16",
    },
  ],
  terms: ["emergency-presentation", "patient-navigation", "tumour-board", "biopsy"],
  institutions: ["nice"],
  related: ["idea-acc-rapid-diagnostic-centres-vague-symptoms"],
  upgrades: [],
  gaps: [
    "NHS England's National cancer waiting times monitoring dataset guidance could not be read: england.nhs.uk returned an empty 202 response to a script. So this page does not state the percentage of patients England's 28-day standard must be met for, when its clock starts and stops, how the outcome may be communicated, who may downgrade a referral, or England's 31-day and 62-day treatment standards.",
    "NHS England's Faster diagnosis web page could not be read for the same reason, so nothing is said here about how England's non-specific symptoms pathways are organised or what proportion of people referred to them are found to have cancer.",
    "England's and Wales's current performance against their standards was not read for this page; only Scotland's latest quarter is given.",
    "None of the documents read grades its recommendations, and none cites a trial comparing a diagnosis standard (England's 28 days) with a treatment standard alone (Scotland, Wales). Which design finds cancer earlier or serves patients better is not answered by these sources.",
    "Northern Ireland's referral guidance and waiting time standards were not read and are not described.",
    "No country outside the United Kingdom was read. Denmark's cancer patient pathways, Australia's optimal care pathways and New Zealand's faster cancer treatment indicators are the obvious comparisons and are owed.",
    "The Scottish and Welsh documents read set no time standard for telling a person that cancer has been ruled out. Whether either nation publishes one elsewhere was not established.",
    "NICE NG12's recommendations on the diagnostic process (1.16) and on support while waiting (1.14.7, 1.14.8) date from 2005 and have not been re-reviewed against evidence since.",
    "How long a safety-netting review should be left is not set by any source read: NICE says a time frame agreed with the person.",
  ],
});

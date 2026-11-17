import { protocol } from "./helpers";

/*
 * Heart tracing (ECG) and blood salt monitoring, and the dose rules, for cancer medicines that lengthen the QT
 * interval.
 *
 * First written on 16 November 2026. Second accuracy pass on 17 November 2026: every source was re-read as raw text
 * and every quote re-checked by script (whitespace and line breaks only).
 * - 2022 ESC Guidelines on cardio-oncology (Lyon et al., Eur Heart J 2022), sections 5.5.4, 5.5.12 and 6.4.2, Tables
 *   8 and 9, Figure 32 and Recommendation Tables 18 and 32. academic.oup.com refuses a script. Read from two copies:
 *   the publisher's PDF held in an open university repository (iris.unisr.it, saved on 16 November 2026 by another
 *   checker in this pass, read with pdftotext), in which the recommendation tables and the algorithm are text, so the
 *   classes, levels and the potassium and magnesium levels were checked as text this time and not by eye; and the
 *   Internet Archive capture of the publisher's page (web.archive.org/web/20240219224147/), fetched on 17 November
 *   2026, used for the narrative quotes because the PDF text prints "<" and ">" as other characters. The two quotes
 *   from Recommendation Table 32 were checked against the PDF text; the class and level cells, which the PDF prints
 *   on their own lines, are not part of the sentence.
 * - IC-OS consensus statement (Herrmann et al., Eur Heart J 2022): the published text could not be read on 17
 *   November 2026 (the publisher does not allow the PubMed Central XML to be downloaded, the Europe PMC full-text
 *   endpoint returned an error, and the PubMed Central page asked for a browser check). The author accepted
 *   manuscript in the University of Glasgow repository (eprints.gla.ac.uk/251609) was read in full. Its wording
 *   differs slightly from the published text, so nothing is quoted from IC-OS.
 * - ESMO consensus recommendations (Curigliano et al., Ann Oncol 2020): full text from PubMed Central (PMC8019325,
 *   NCBI E-utilities XML).
 * - US prescribing information from DailyMed (SPL XML, current versions on 17 November 2026): Kisqali (ribociclib,
 *   version of July 2026), Vanflyta (quizartinib, April 2026), Tagrisso (osimertinib, September 2026), Krazati
 *   (adagrasib, August 2026) and Revuforj (revumenib, version of February 2026, text revised October 2025).
 * Not read: the 2022 ESC guideline on ventricular arrhythmias and sudden cardiac death, so the drug treatment of
 * torsades de pointes itself is not given here; the 2023 erratum notice to the ESC guideline; the CredibleMeds lists
 * the ESC guideline points to; and the labels of the other medicines in `drugs`, which are there because ESC Table 9
 * names them.
 *
 * Every DOI and PMCID was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with
 * line breaks joined and nothing else changed; where a source sentence ends in reference numbers, the quote stops
 * before them.
 */
export const qtProlongationMonitoringOnAnticancerDrugs = protocol({
  id: "qt-prolongation-monitoring-on-anticancer-drugs",
  name: "QT prolongation on cancer medicines: ECG and blood salt monitoring, and when to pause or stop",
  aka: ["QTc monitoring", "long QT on cancer treatment", "ECG before ribociclib", "ECG monitoring on quizartinib", "QTcF", "Fridericia correction", "torsades de pointes", "drug-induced long QT", "heart tracing on cancer tablets"],
  domain: "symptom-management",
  tldr: "Some cancer medicines slow the heart's electrical reset between beats, seen on a heart tracing (ECG) as a long QT interval. Rarely this sets off a dangerous rhythm. Your team should do an ECG and check your blood salts before you start, review your other medicines, and repeat the ECG on a schedule. Get medical help straight away if you faint, feel dizzy or your heartbeat is fast or irregular.",
  simple: "A few cancer medicines can affect the heart's rhythm. A quick, painless heart tracing and blood tests before and during treatment keep watch. Tell your team about every other medicine you take. Get medical help straight away if you faint, feel dizzy, or your heartbeat is fast or irregular.",
  summary: "Before a QT-prolonging cancer medicine, record a 12-lead ECG with the QT interval corrected by the Fridericia formula (ESMO 2020 [I, A] for a baseline ECG; ESC 2022 recommends Fridericia), correct potassium, magnesium and calcium, and review every other medicine for QT-prolonging drugs and, for ribociclib, quizartinib and revumenib, strong CYP3A inhibitors. The ESC algorithm asks for potassium above 4.0 mmol/L and magnesium above 1.10 mmol/L, and for cardio-oncology evaluation before starting if QTcF is above 480 ms. The labels are stricter: ribociclib is started only below 450 ms, and quizartinib and revumenib are not started above 450 ms.\n\nRepeat ECGs follow the product's label: ribociclib at about day 14 of the first cycle; quizartinib weekly during induction and consolidation and for at least the first month of maintenance; revumenib at least weekly for 4 weeks and then at least monthly; osimertinib and adagrasib in people at risk. ESC recommends QTc monitoring at baseline and at 14 and 28 days for everyone on ribociclib (Class I, Level A), and an ECG after any dose increase of a QT-prolonging medicine (Class I, Level C).\n\nThe action thresholds are QTcF above 480 ms and 500 ms. ESC: weekly ECGs for people without symptoms at 480 to 500 ms (Class I, Level C); at 500 ms or more, interrupt the medicine and repeat the ECG every 24 hours until it resolves (Class I, Level C), withdraw any other offending drug and correct electrolytes and other risk factors (Class I, Level C). ESC and IC-OS both say that a rise of more than 60 ms from baseline should not routinely change treatment while QTc stays below 500 ms. Labels are stricter in places: ribociclib and revumenib are interrupted above 480 ms, and adagrasib and revumenib are withheld for a rise of more than 60 ms. ESC recommends stopping the medicine after torsades de pointes or a sustained ventricular tachyarrhythmia (Class I, Level C), and every label read stops it permanently for torsades de pointes or signs of serious or life-threatening arrhythmia. Restarting after significant prolongation needs a multidisciplinary discussion first (Class I, Level C); ESC says it may be considered, ideally at a reduced dose (Class IIb, Level C), with weekly ECGs for the first 4 to 6 weeks and then monthly (Class I, Level C). Quizartinib carries a boxed warning and in the United States is supplied only through a restricted programme. This page explains care; the treating team's own protocol and the product's current label come first.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer", "emergency-team"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "ward", "home", "emergency-department"],
  },
  population: "Adults starting or taking a cancer medicine known to lengthen the QT interval. ESC 2022 Table 9 sorts them by risk: high (arsenic trioxide, glasdegib, nilotinib, oxaliplatin, pazopanib, ribociclib, sunitinib, toremifene, vandetanib and others), moderate (including ivosidenib, osimertinib, selpercatinib, lenvatinib, cabozantinib) and low (including midostaurin and quizartinib). Adagrasib and revumenib are newer than that table and are covered from their labels. The schedules and dose rules quoted are those of the five labels read; every other product follows its own label. Children, and QT prolongation from androgen deprivation therapy, are not covered.",
  trigger: "A QT-prolonging cancer medicine is planned; at each scheduled ECG; after any dose increase, new interacting medicine, or illness with vomiting or diarrhoea; and whenever the person faints or has palpitations.",
  steps: [
    {
      action: "Record a 12-lead ECG with the corrected QT interval before the first dose",
      why: "Later tracings are compared with this one, and several labels set a QT limit for starting the medicine.",
      source: "esmo-2020",
      quote: "For patients with a cancer diagnosis that requires treatment with a potentially cardiotoxic treatment, a baseline ECG, including measurement of heart rate QTc, is recommended",
      grade: "[I, A]",
    },
    {
      action: "Correct the QT interval for heart rate with the Fridericia formula (QTcF), and use the same method for every later ECG",
      why: "ESC says the Fridericia formula has shown less error than others such as Bazett at both high and low heart rates. ESMO says every comparison during treatment should use the same formula.",
      source: "esc-2022",
      quote: "In patients with cancer, the Fridericia formula is recommended and has demonstrated less error than other correction methods such as Bazzett at both high and low heart rates",
    },
    {
      action: "Measure potassium, magnesium and calcium before starting and during treatment, and correct any abnormal value",
      why: "ESC lists low potassium, magnesium and calcium as correctable risk factors for a long QT interval and torsades de pointes. The quizartinib label asks for more frequent checks in people with diarrhoea or vomiting.",
      source: "esc-2022",
      quote: "In patients treated with QTc-prolonging drugs, serum electrolytes and other risk factors should be closely monitored and corrected, and concomitant QT-prolonging drugs avoided if possible",
    },
    {
      action: "Review every other medicine, including anti-sickness drugs, antibiotics, antifungals and antidepressants, and avoid those that also lengthen the QT interval where possible",
      why: "ESC lists these drug classes among the risk factors, and the quizartinib label says that giving another QT-prolonging medicine with it may make QT prolongation more frequent.",
      source: "label-tagrisso",
      quote: "When feasible, avoid concomitant administration of drugs known to prolong the QTc interval with known risk of Torsades de pointes.",
    },
    {
      action: "Do not start the medicine if the baseline QTcF is outside the limit in its label (ribociclib only below 450 ms; quizartinib and revumenib not above 450 ms)",
      why: "The labels set these limits. The trials of quizartinib and revumenib did not include people whose QTcF was already 450 ms or more.",
      source: "label-kisqali",
      quote: "Initiate treatment with KISQALI only in patients with QTcF values less than 450 ms.",
    },
    {
      action: "Ask a cardiologist to review anyone with an abnormal baseline QTc, a known inherited arrhythmia disorder, or new fainting, near-fainting or rapid palpitations",
      why: "ESC advises a cardiology consultation for these groups, and its algorithm sends anyone with a baseline QTcF above 480 ms for cardio-oncology evaluation before treatment starts.",
      source: "esc-2022",
      quote: "Cardiology consultation is advised in patients with an abnormal baseline QTc interval, patients treated with drugs that prolong the QT interval, those who develop new cardiac symptoms (syncope or pre-syncope, rapid palpitations or QTc prolongation with new-onset bradycardia, high degree of heart block), and/or those with known inherited arrhythmia disorders",
    },
    {
      action: "Repeat the ECG on the schedule in the product's label, for example weekly during induction and consolidation with quizartinib",
      why: "The ribociclib label reports that most QT prolongation in its trials occurred within the first four weeks, and the quizartinib label that the severe rhythm problems occurred mostly during induction.",
      source: "label-vanflyta",
      quote: "During induction and consolidation, perform ECGs prior to initiation and then once weekly during VANFLYTA treatment or more frequently as clinically indicated",
    },
    {
      action: "Repeat the ECG as well after a dose adjustment, when a new QT-prolonging medicine is started, and when an electrolyte imbalance develops",
      why: "ESC names similar occasions for people at risk of QT prolongation on VEGF inhibitors, and recommends an ECG after any dose increase of a QT-prolonging cancer medicine (Class I, Level C).",
      source: "esmo-2020",
      quote: "Specifically, an ECG should be obtained at baseline, once steady-state levels are achieved, with dose adjustments and with the initiation of new medications that may prolong the QT interval, or with the development of an electrolyte imbalance",
    },
    {
      action: "Tell the person to report dizziness, light-headedness, fainting or a fast or irregular heartbeat straight away, and to tell the team about every medicine they take",
      why: "The labels name these as symptoms that may go with a significantly long QT interval, and a medicine started elsewhere may also lengthen it.",
      source: "label-vanflyta",
      quote: "Inform patients of symptoms that may be associated with significant QTc interval prolongation including dizziness, lightheadedness, and fainting.",
    },
    {
      action: "If QTcF is above 480 ms and below 500 ms without symptoms, correct reversible causes, repeat the ECG weekly, and apply the label (some reduce or interrupt the dose at this level)",
      why: "ESC says torsades de pointes rarely occurs below 500 ms, and its algorithm continues treatment with closer checks. The ribociclib and revumenib labels interrupt above 480 ms and the quizartinib label reduces the dose.",
      source: "esc-2022",
      quote: "Weekly ECG monitoring is recommended in asymptomatic patients with cancer with QTcF 480–500 ms who are treated with a QTc-prolonging cancer therapy",
      grade: "Class I, Level C",
    },
    {
      action: "If QTcF is 500 ms or more, pause the cancer medicine, correct blood salts and other causes, and repeat the ECG every 24 hours until it resolves",
      why: "ESC says a QTc of 500 ms or more carries a two to three times higher risk of torsades de pointes. IC-OS likewise recommends considering a change of cancer treatment only above 500 ms.",
      source: "esc-2022",
      quote: "Temporary interruption of QTc-prolonging cancer therapy is recommended in patients who develop asymptomatic QTcF ≥ 500 ms and an ECG should be repeated every 24 h until resolution of the QTcF prolongation.",
      grade: "Class I, Level C",
    },
    {
      action: "Do not routinely change treatment because QTc has risen by more than 60 ms from baseline if it is still below 500 ms, unless the product's label says to",
      why: "ESC and IC-OS say a rise of this size should not routinely affect treatment decisions below 500 ms. The adagrasib and revumenib labels do withhold the medicine for a rise of more than 60 ms.",
      source: "esc-2022",
      quote: "Changes in the QT interval of >60 ms from baseline should not routinely affect treatment decisions if the QTc remains <500 ms",
    },
    {
      action: "Restart only as the label allows, at the same or a lower dose once QTcF has come back to the label's level, after a multidisciplinary discussion, and with closer ECG checks",
      why: "The labels describe the effect on the QT interval as rising with the drug's concentration. ESC recommends a multidisciplinary discussion before restarting, and weekly ECGs for the first 4 to 6 weeks and then monthly (both Class I, Level C).",
      source: "label-kisqali",
      quote: "Interrupt KISQALI treatment and wait until QTcF resolves to ≤ 480 ms, then resume at next lower dose level.",
    },
    {
      action: "Stop the medicine for good after torsades de pointes or a long QT interval with signs or symptoms of life-threatening arrhythmia",
      why: "ESC recommends stopping after torsades de pointes or a sustained ventricular tachyarrhythmia (Class I, Level C), and all five labels read say to stop permanently.",
      source: "label-tagrisso",
      quote: "Permanently discontinue TAGRISSO in patients who develop QTc interval prolongation with signs/symptoms of life-threatening arrhythmia",
    },
    {
      action: "Refer anyone with a symptomatic ventricular arrhythmia to a cardiologist, reduce or stop the cancer medicine, and treat the rhythm by the general ventricular arrhythmia guidelines",
      why: "ESC says symptomatic ventricular arrhythmias need a dose reduction or discontinuation and referral to a cardiologist, and that recurrent, symptomatic, life-threatening ones need urgent intervention. It sets out no separate emergency procedure for people with cancer.",
      source: "esc-2022",
      quote: "Treatment of cancer therapy-induced VA should follow general clinical guidelines.",
    },
  ],
  bestInClass: {
    statement: "The 2022 ESC cardio-oncology guideline is the most recent graded guideline read. Its recommendations on managing a long QT interval (Recommendation Table 32) are all Level C, that is, expert consensus or small studies; its recommendation for QTc monitoring at baseline and at 14 and 28 days on ribociclib is Class I, Level A. ESC and ESMO (2020) recommend a baseline ECG. ESC and IC-OS (2022) recommend the Fridericia correction; ESMO accepts Bazett or Fridericia provided the same one is used throughout, and says Fridericia may be preferable. ESC and ESMO say to correct electrolytes. ESC says to avoid other QT-prolonging medicines if possible; ESMO says to use caution in people taking them. ESC interrupts treatment at 500 ms or more and IC-OS recommends considering a change of treatment only above 500 ms; ESMO gives no QTc threshold. Where the guidelines differ from the labels, both are shown. Starting: the ESC algorithm sends people with a baseline QTcF above 480 ms for cardio-oncology evaluation, while the ribociclib label allows a start only below 450 ms and the quizartinib and revumenib labels do not allow one above 450 ms. Above 480 ms and below 500 ms: ESC continues treatment with weekly ECGs; the ribociclib and revumenib labels interrupt above 480 ms, and the quizartinib label reduces the dose without interruption. A rise of more than 60 ms: ESC and IC-OS say it should not routinely change treatment below 500 ms; the trial grading scale (CTCAE, as IC-OS reports it) counts a 60 ms change from baseline as grade 3; the adagrasib label withholds for a rise of more than 60 ms and the revumenib label interrupts for one; and the ribociclib label stops treatment for either a QTcF above 500 ms or a rise of more than 60 ms when it comes with torsades de pointes, polymorphic ventricular tachycardia, syncope or signs of serious arrhythmia. Risk class: ESC Table 9 (2022) places quizartinib and midostaurin in its low-risk group, while the quizartinib label (2026) carries a boxed warning for QT prolongation, torsades de pointes and cardiac arrest. For the dose of the cancer medicine, the ESC algorithm itself defers to the drug-specific protocol.",
    sources: ["esc-2022", "ic-os-2022", "esmo-2020", "label-kisqali", "label-vanflyta", "label-tagrisso", "label-krazati", "label-revuforj"],
  },
  variants: [
    {
      name: "ECG schedule: ESC 2022 algorithm",
      differs: "ECG at baseline, once steady-state drug levels are reached, after each dose modification or any treatment interruption of more than 2 weeks; monthly for the first 3 months, then periodically according to the person's risk factors and the treatment.",
      evidence: "Figure 32 and its legend, and Recommendation Table 32: an ECG after any dose increase is Class I, Level C. Drug-specific ESC recommendations sit beside it: for ribociclib, QTc monitoring at baseline and at 14 and 28 days (Class I, Level A) and with any dose increase (Class I, Level B); for VEGF inhibitors in people at moderate or high risk of QTc prolongation, monthly for the first 3 months and every 3 to 6 months after that (Class I, Level C).",
      sources: ["esc-2022"],
    },
    {
      name: "ECG schedule: the labels",
      differs: "Ribociclib: before starting and at about day 14 of the first cycle, then as clinically indicated, with electrolytes before starting and at the start of each of the first 6 cycles. Quizartinib: before starting, weekly during induction and consolidation, weekly for at least the first month of maintenance and after dose escalation. Revumenib: before starting, at least weekly for the first 4 weeks, then at least monthly, and more often if needed in people at risk. Osimertinib: periodic ECGs and electrolytes in people with congenital long QT syndrome, heart failure, electrolyte abnormalities or QT-prolonging medicines. Adagrasib: before starting and as indicated in people with heart failure, slow heart rhythms, electrolyte abnormalities or unavoidable QT-prolonging medicines.",
      evidence: "Regulatory labels, not graded. ESC (2022) recommends QTc monitoring on ribociclib at baseline and at 14 and 28 days (Class I, Level A), and its narrative describes ECGs at day 14 of the first cycle, before the second cycle and with any dose increase; the label read here (2026) asks for baseline and about day 14, then as clinically indicated.",
      sources: ["label-kisqali", "label-vanflyta", "label-revuforj", "label-tagrisso", "label-krazati", "esc-2022"],
    },
    {
      name: "Hold and restart rules: the labels",
      differs: "Ribociclib: above 480 ms interrupt until 480 ms or less (early breast cancer resumes at the same dose, advanced disease at the next lower dose); above 500 ms interrupt and resume at the next lower dose, and stop if it recurs. Quizartinib: 481 to 500 ms reduce the dose without interruption; above 500 ms interrupt and resume at a reduced dose once below 450 ms; stop if it recurs despite dose reduction and correction of other factors. Osimertinib: above 500 ms on at least 2 separate ECGs, withhold until below 481 ms (or baseline) and resume at 40 mg. Revumenib: above 480 ms interrupt and correct low potassium and magnesium, restarting at the same dose (above 480 to 500 ms) or a reduced dose (above 500 ms, or a rise of more than 60 ms from baseline) once at or below 480 ms. Adagrasib: above 500 ms or a rise of more than 60 ms from baseline, withhold until below 481 ms or back to baseline, then resume at the next lower dose. All stop permanently for torsades de pointes or signs of serious or life-threatening arrhythmia.",
      evidence: "Regulatory labels, not graded. ESC sets one rule for any QT-prolonging cancer medicine: interrupt at 500 ms or more; once QTcF is 480 ms or less, resume at the same or a reduced dose by the drug's own protocol; if it settles only to between 480 and 500 ms, consider restarting at a reduced dose (Class IIb); if it stays at 500 ms or more, a multidisciplinary team discusses other cancer treatments (Class I).",
      sources: ["label-kisqali", "label-vanflyta", "label-tagrisso", "label-revuforj", "label-krazati", "esc-2022"],
    },
    {
      name: "Contraindications and restricted supply for quizartinib (United States)",
      differs: "The label contraindicates quizartinib in severe hypokalaemia, severe hypomagnesaemia, long QT syndrome, or a history of ventricular arrhythmias or torsades de pointes, and it is supplied only through a Risk Evaluation and Mitigation Strategy programme.",
      evidence: "Boxed warning in the US label. The label says: \"VANFLYTA is available only through a restricted program called the VANFLYTA Risk Evaluation and Mitigation Strategy (REMS).\" Arrangements in other countries were not read.",
      sources: ["label-vanflyta"],
    },
    {
      name: "Ribociclib with tamoxifen",
      differs: "The ribociclib label says to avoid tamoxifen with it because the combination lengthened the QT interval more; ESC says the prescribing information does not recommend the combination.",
      evidence: "In MONALEESA-7, a QTcF rise of more than 60 ms occurred in 14 of 87 patients (16 per cent) on ribociclib with tamoxifen and 18 of 245 (7 per cent) on ribociclib with a non-steroidal aromatase inhibitor (label).",
      sources: ["label-kisqali", "esc-2022"],
    },
  ],
  grades: [
    { claim: "Baseline ECG with QTc before potentially cardiotoxic treatment", grade: "[I, A]", source: "esmo-2020" },
    { claim: "Discontinue the QT-prolonging cancer therapy in patients who develop torsades de pointes or sustained ventricular tachyarrhythmias", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "Temporarily interrupt at an asymptomatic QTcF of 500 ms or more, with an ECG every 24 hours until it resolves", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "Withdraw any offending drug and correct electrolytes and other risk factors at a QTcF of 500 ms or more", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "Weekly ECG in asymptomatic patients with QTcF 480 to 500 ms on a QT-prolonging cancer therapy", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "12-lead ECG after any dose increase of a QT-prolonging cancer therapy", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "Multidisciplinary discussion before restarting after significant QTcF prolongation", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "Restarting the culprit medicine may be considered, ideally at a reduced dose", grade: "Class IIb, Level C", source: "esc-2022" },
    { claim: "Weekly ECG for the first 4 to 6 weeks and then monthly after restarting", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "A QTc of 500 ms or more carries a two to three times higher risk of torsades de pointes", grade: "Guideline text; not graded", source: "esc-2022", quote: "a QTc ≥ 500 ms is associated with a two- to three-fold higher risk for TdP, while TdP rarely occurs when QTc is <500 ms" },
    { claim: "QTc monitoring at baseline and at 14 and 28 days in all patients receiving ribociclib", grade: "Class I, Level A", source: "esc-2022" },
    { claim: "QTc monitoring with any dose increase of ribociclib", grade: "Class I, Level B", source: "esc-2022" },
    { claim: "A change of more than 60 ms from baseline is clinically insignificant if the QT stays below 500 ms; consider changing cancer treatment only above 500 ms", grade: "Consensus statement text; not graded", source: "ic-os-2022" },
    { claim: "Either Bazett or Fridericia, used consistently; Fridericia may be preferable in cancer", grade: "Consensus text; not graded", source: "esmo-2020", quote: "Fridericia’s formula may be preferable in the cancer population as there is less over- and under-correction in patients with tachycardia or bradycardia, respectively." },
    { claim: "Ribociclib: stop for a QTcF above 500 ms or a rise of more than 60 ms when accompanied by a serious arrhythmia or syncope", grade: "Regulatory label; not graded", source: "label-kisqali", quote: "Permanently discontinue KISQALI if QTcF interval prolongation is either > 500 ms or > 60 ms change from baseline AND associated with any of the following: Torsades de Pointes, polymorphic ventricular tachycardia, syncope, or signs/symptoms of serious arrhythmia." },
    { claim: "Quizartinib: do not start or escalate the dose at a QTcF above 450 ms (boxed warning)", grade: "Regulatory label; not graded", source: "label-vanflyta", quote: "Do not initiate treatment with VANFLYTA or escalate the VANFLYTA dose if the QT interval corrected by Fridericia's formula (QTcF) is greater than 450 ms" },
    { claim: "Revumenib: ECG before starting, weekly for 4 weeks, then monthly", grade: "Regulatory label; not graded", source: "label-revuforj", quote: "Perform an electrocardiogram (ECG) prior to the initiation of REVUFORJ, at least once a week for the first 4 weeks, and at least monthly thereafter." },
    { claim: "Adagrasib: ECG and electrolytes in people at risk; correct electrolytes", grade: "Regulatory label; not graded", source: "label-krazati", quote: "Monitor ECGs and electrolytes, particularly potassium and magnesium, prior to starting KRAZATI, during concomitant use, and as clinically indicated in patients with congestive heart failure, bradyarrhythmias, electrolyte abnormalities, and in patients who are unable to avoid concomitant medications that are known to prolong the QT interval." },
  ],
  sources: [
    {
      key: "esc-2022",
      label: "2022 ESC Guidelines on cardio-oncology developed in collaboration with the European Hematology Association (EHA), the European Society for Therapeutic Radiology and Oncology (ESTRO) and the International Cardio-Oncology Society (IC-OS)",
      publisher: "European Society of Cardiology (European Heart Journal); read from the publisher's PDF in an open university repository and from the Internet Archive capture of the publisher's page",
      year: 2022,
      url: "https://doi.org/10.1093/eurheartj/ehac244",
      doi: "10.1093/eurheartj/ehac244",
      gradingScheme: "Class of recommendation I (recommended), IIa (should be considered), IIb (may be considered), III (not recommended); level of evidence A (multiple randomised trials or meta-analyses), B (one randomised trial or large non-randomised studies), C (expert consensus, small studies, retrospective studies or registries).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ic-os-2022",
      label: "Defining cardiovascular toxicities of cancer therapies: an International Cardio-Oncology Society (IC-OS) consensus statement",
      publisher: "IC-OS (European Heart Journal); read from the author accepted manuscript in the University of Glasgow repository (eprints.gla.ac.uk/251609), because the published text could not be read",
      year: 2022,
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8803367/",
      doi: "10.1093/eurheartj/ehab674",
      gradingScheme: "Consensus statement; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "esmo-2020",
      label: "Management of cardiac disease in cancer patients throughout oncological treatment: ESMO consensus recommendations",
      publisher: "ESMO (Annals of Oncology; Curigliano et al.)",
      year: 2020,
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8019325/",
      doi: "10.1016/j.annonc.2019.10.023",
      gradingScheme: "[level, grade]: levels of evidence I to V and grades of recommendation A to E, adapted from the IDSA/USPHS system.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-kisqali",
      label: "KISQALI (ribociclib) tablets: US prescribing information (DailyMed version of July 2026)",
      publisher: "Novartis, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aaeaef94-f3f5-4367-8ea2-b181d7be2da8",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-vanflyta",
      label: "VANFLYTA (quizartinib) tablets: US prescribing information (DailyMed version of April 2026)",
      publisher: "Daiichi Sankyo, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=29cdbcfe-497d-4e78-bb7b-2d4acafe8e86",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-tagrisso",
      label: "TAGRISSO (osimertinib) tablets: US prescribing information (revised September 2026)",
      publisher: "AstraZeneca, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5e81b4a7-b971-45e1-9c31-29cea8c87ce7",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-krazati",
      label: "KRAZATI (adagrasib) tablets: US prescribing information (revised August 2026)",
      publisher: "Mirati Therapeutics, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0b8bf078-34c2-4f45-9012-38a8ac082b01",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-revuforj",
      label: "REVUFORJ (revumenib) tablets: US prescribing information (DailyMed version of February 2026; text revised October 2025)",
      publisher: "Syndax Pharmaceuticals, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6eb3cdbc-0e74-477d-82d6-3bb172d3f63f",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  upgrades: [],
  gaps: [
    "The ESC recommendations on managing a long QT interval (Recommendation Table 32) are all Level C. Its ECG schedule for ribociclib is Class I, Level A. None of the sources read cites a trial comparing ECG schedules, thresholds or restart strategies.",
    "The emergency drug treatment of torsades de pointes is not given here: the 2022 ESC guideline on ventricular arrhythmias, which the cardio-oncology guideline defers to, was not read. No source read sets out the first response to a collapse or blackout on one of these medicines. The labels tell patients to report dizziness, light-headedness, fainting or an irregular heartbeat right away, and the quizartinib label says the signs on its wallet card should prompt the patient to seek medical attention immediately.",
    "On 17 November 2026 the published text of the IC-OS consensus statement could not be read (the publisher does not allow its PubMed Central XML to be downloaded, the Europe PMC full-text endpoint returned an error, and the PubMed Central page asked for a browser check). The author accepted manuscript was read in full and supports what this page attributes to IC-OS, but its wording differs slightly from the published text, so the two IC-OS quotations the page carried were removed.",
    "The ESC algorithm (Figure 32) asks for potassium above 4.0 mmol/L and magnesium above 1.10 mmol/L (2.0 mg/dL), while ESC Table 8 lists hypokalaemia at 3.5 mEq/L or below and hypomagnesaemia at 1.6 mEq/L or below as risk factors. The guideline does not explain the difference between the target and the risk-factor level. A 2023 erratum notice to the guideline exists and was not read; the publisher's PDF read here was downloaded from the publisher in April 2026.",
    "ESC Table 9 dates from 2022. It places quizartinib and midostaurin in its low-risk group and does not list adagrasib or revumenib; the quizartinib and revumenib labels read here carry boxed warnings. The table should not be used alone to judge a newer medicine.",
    "Only five labels were read (ribociclib, quizartinib, osimertinib, adagrasib, revumenib). The ECG schedules and dose rules for ivosidenib, midostaurin, selpercatinib, nilotinib, vandetanib, arsenic trioxide, glasdegib, toremifene, pazopanib and sunitinib are in their own labels and are not given here; European product information was not read and may differ. ESC notes that the European information for ribociclib resumes at the same dose after a first QTcF above 480 ms.",
    "Oxaliplatin is in the ESC high-risk group but is not linked to this page, because no label rule for QT monitoring on oxaliplatin was read.",
    "The sources disagree about a rise of more than 60 ms with a QTc still below 500 ms: ESC and IC-OS say not to act on it routinely, trial grading counts it as grade 3, and the adagrasib and revumenib labels withhold the medicine for it.",
    "No newer edition of the ESC, ESMO or IC-OS documents was found in Europe PMC on 17 November 2026. A 2026 IC-OS and MASCC clinical practice statement on cardiovascular disease in adults with cancer (doi 10.1186/s40959-026-00481-3) was searched for QT content; it mentions QT prolongation only as a reason for cardio-oncology follow-up and gives no thresholds.",
  ],
  institutions: ["esmo"],
  drugs: ["ribociclib", "quizartinib", "osimertinib", "adagrasib", "revumenib", "ivosidenib", "midostaurin", "selpercatinib", "nilotinib", "vandetanib", "arsenic-trioxide", "glasdegib", "toremifene", "pazopanib", "sunitinib"],
  terms: ["qt-prolongation", "cardiotoxicity"],
  related: ["cardio-oncology", "cardio-oncology-risk-assessment-and-cardiac-surveillance", "hypomagnesaemia-on-egfr-antibodies", "anticancer-drug-interaction-review", "paper-lyon-eur-heart-j"],
  sections: ["supportive-care"],
  tags: ["protocol", "cardio-oncology", "side-effect-management"],
});

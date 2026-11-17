import { protocol } from "./helpers";

/*
 * Heart tracing (ECG) and blood salt monitoring, and the dose rules, for cancer medicines that lengthen the QT
 * interval.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - 2022 ESC Guidelines on cardio-oncology (Lyon et al., Eur Heart J 2022), section 6.4.2 and Tables 8 and 9: full
 *   text of the article HTML. academic.oup.com returned 403 to a script and the paper is not in PubMed Central, so it
 *   was read from the Internet Archive's public capture of academic.oup.com
 *   (web.archive.org/web/20240219224147/https://academic.oup.com/eurheartj/article/43/41/4229/6673995). Tables 8 and 9
 *   are text in that page. The recommendation tables and the algorithm figure are images: the archived images of
 *   Recommendation Table 32 (both parts) and of the QTc algorithm (Figure 32) were downloaded from the same archive
 *   and read by eye. The ESC classes and levels given here, and the potassium and magnesium levels in the algorithm,
 *   come from those images; ESC quotes come from the narrative text only.
 * - IC-OS consensus definitions (Herrmann et al., Eur Heart J 2022): full text from the PubMed Central article page
 *   (PMC8803367).
 * - ESMO consensus recommendations (Curigliano et al., Ann Oncol 2020): full text from PubMed Central (PMC8019325,
 *   NCBI E-utilities XML).
 * - US prescribing information from DailyMed (SPL XML): Kisqali (ribociclib, label dated July 2026), Vanflyta
 *   (quizartinib, April 2026), Tagrisso (osimertinib, September 2026), Krazati (adagrasib, August 2026) and Revuforj
 *   (revumenib, February 2026).
 * Not read: the 2022 ESC guideline on ventricular arrhythmias and sudden cardiac death (not in PubMed Central; not
 * pursued further), so the drug treatment of torsades de pointes itself is not given here; the CredibleMeds lists the
 * ESC guideline points to; and the labels of the other medicines in `drugs`, which are there because ESC Table 9
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
  tldr: "Some cancer medicines slow the heart's electrical reset between beats, seen on a heart tracing (ECG) as a long QT interval. Rarely this sets off a dangerous heart rhythm. Your team should do an ECG and check potassium and magnesium before you start, review your other medicines, and repeat the ECG on a set schedule. Fainting, blackouts or a racing, fluttering heartbeat need emergency help.",
  simple: "A few cancer medicines can affect the heart's rhythm. A quick, painless heart tracing and blood tests before and during treatment keep watch. Tell your team about every other medicine you take. Get urgent help if you faint or your heart races or flutters.",
  summary: "Before a QT-prolonging cancer medicine, record a 12-lead ECG with the QT interval corrected by the Fridericia formula (ESMO 2020 [I, A] for a baseline ECG; ESC 2022 recommends Fridericia), correct potassium, magnesium and calcium, and review every other medicine for QT-prolonging drugs and, for several products, strong CYP3A inhibitors. The ESC algorithm asks for potassium above 4.0 mmol/L and magnesium above 1.10 mmol/L, and for cardio-oncology review before starting if QTcF is above 480 ms; the ribociclib, quizartinib and revumenib labels do not allow a start above 450 ms.\n\nRepeat ECGs follow the product's label: ribociclib at about day 14 of the first cycle; quizartinib weekly during induction and consolidation and for at least the first month of maintenance; revumenib weekly for 4 weeks and then monthly; osimertinib and adagrasib in people at risk. ESC adds an ECG after any dose increase (Class I, Level C).\n\nThe action thresholds are QTcF above 480 ms and above 500 ms. ESC: weekly ECGs at 480 to 500 ms (Class I, Level C); at 500 ms or more, interrupt the medicine, correct electrolytes and other causes, and repeat the ECG every 24 hours until it resolves (Class I, Level C). ESC and IC-OS both say that a rise of more than 60 ms from baseline should not by itself change treatment while QTc stays below 500 ms. Labels are stricter in places: ribociclib is interrupted above 480 ms. Torsades de pointes or another life-threatening ventricular arrhythmia ends treatment with the medicine (ESC Class I, Level C; every label read). Restarting after significant prolongation is a multidisciplinary decision (Class I, Level C), usually at a reduced dose, with weekly ECGs for 4 to 6 weeks and then monthly (Class I, Level C). Quizartinib carries a boxed warning and in the United States is supplied only through a restricted programme. This page explains care; the treating team's own protocol and the product's current label come first.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer", "emergency-team"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "ward", "home", "emergency-department"],
  },
  population: "Adults starting or taking a cancer medicine known to lengthen the QT interval. ESC 2022 Table 9 sorts them by risk: high (arsenic trioxide, glasdegib, nilotinib, oxaliplatin, pazopanib, ribociclib, sunitinib, toremifene, vandetanib and others), moderate (including ivosidenib, osimertinib, selpercatinib, lenvatinib, cabozantinib) and low (including midostaurin and quizartinib). Adagrasib and revumenib are newer than that table and are covered from their labels. The schedules and dose rules quoted are those of the five labels read; every other product follows its own label. Children, and QT prolongation from androgen deprivation therapy, are not covered.",
  trigger: "A QT-prolonging cancer medicine is planned; at each scheduled ECG; after any dose increase, new interacting medicine, or illness with vomiting or diarrhoea; and whenever the person faints or has palpitations.",
  steps: [
    {
      action: "Record a 12-lead ECG with the corrected QT interval before the first dose",
      why: "Later tracings are judged against this one, and some people already have a long QT interval without knowing it.",
      source: "esmo-2020",
      quote: "For patients with a cancer diagnosis that requires treatment with a potentially cardiotoxic treatment, a baseline ECG, including measurement of heart rate QTc, is recommended",
      grade: "[I, A]",
    },
    {
      action: "Correct the QT interval for heart rate with the Fridericia formula (QTcF), and use the same method for every later ECG",
      why: "The older Bazett formula overstates the QT interval when the heart is fast, as it often is during cancer treatment, which can lead to a medicine being stopped needlessly.",
      source: "esc-2022",
      quote: "In patients with cancer, the Fridericia formula is recommended and has demonstrated less error than other correction methods such as Bazzett at both high and low heart rates",
    },
    {
      action: "Measure potassium, magnesium and calcium before starting and during treatment, and correct any low value before the next dose",
      why: "Low blood salts make a dangerous rhythm much more likely, and vomiting, diarrhoea and some medicines lower them.",
      source: "esc-2022",
      quote: "In patients treated with QTc-prolonging drugs, serum electrolytes and other risk factors should be closely monitored and corrected, and concomitant QT-prolonging drugs avoided if possible",
    },
    {
      action: "Review every other medicine, including anti-sickness drugs, antibiotics, antifungals and antidepressants, and replace those that also lengthen the QT interval where possible",
      why: "Two QT-prolonging medicines add together, and many are ones commonly given during cancer treatment.",
      source: "label-tagrisso",
      quote: "When feasible, avoid concomitant administration of drugs known to prolong the QTc interval with known risk of Torsades de pointes.",
    },
    {
      action: "Do not start the medicine if the baseline QTcF is above the limit in its label (450 ms for ribociclib, quizartinib and revumenib)",
      why: "Starting from a long QT interval leaves no margin before the level at which dangerous rhythms occur.",
      source: "label-kisqali",
      quote: "Initiate treatment with KISQALI only in patients with QTcF values less than 450 ms.",
    },
    {
      action: "Ask a cardiologist to review anyone with an abnormal baseline QTc, an inherited arrhythmia condition, or fainting, near-fainting or rapid palpitations",
      why: "These people are at the highest risk and may need a different medicine or closer monitoring.",
      source: "esc-2022",
      quote: "Cardiology consultation is advised in patients with an abnormal baseline QTc interval, patients treated with drugs that prolong the QT interval, those who develop new cardiac symptoms (syncope or pre-syncope, rapid palpitations or QTc prolongation with new-onset bradycardia, high degree of heart block), and/or those with known inherited arrhythmia disorders",
    },
    {
      action: "Repeat the ECG on the schedule in the product's label, for example weekly during the early phases of quizartinib",
      why: "The QT interval lengthens most in the first weeks, once the medicine has built up in the blood.",
      source: "label-vanflyta",
      quote: "During induction and consolidation, perform ECGs prior to initiation and then once weekly during VANFLYTA treatment or more frequently as clinically indicated",
    },
    {
      action: "Repeat the ECG as well after any dose increase, when a new QT-prolonging medicine is started, and when blood salts fall",
      why: "Each of these can lengthen the QT interval in someone whose earlier tracings were normal.",
      source: "esmo-2020",
      quote: "Specifically, an ECG should be obtained at baseline, once steady-state levels are achieved, with dose adjustments and with the initiation of new medications that may prolong the QT interval, or with the development of an electrolyte imbalance",
    },
    {
      action: "Tell the person to report dizziness, light-headedness, fainting or a fast or irregular heartbeat straight away, and to tell every prescriber about the medicine",
      why: "These can be the only warning of a rhythm problem between ECGs, and a new prescription elsewhere can interact.",
      source: "label-vanflyta",
      quote: "Inform patients of symptoms that may be associated with significant QTc interval prolongation including dizziness, lightheadedness, and fainting.",
    },
    {
      action: "If QTcF is between 481 and 500 ms, correct blood salts and interacting medicines, repeat the ECG weekly, and apply the label (some reduce or interrupt the dose at this level)",
      why: "This range is a warning zone: dangerous rhythms are still rare, and correcting other causes often brings the interval back down.",
      source: "esc-2022",
      quote: "Although the incidence of QTc prolongation ≥500 ms and TdP is low during cancer therapy, QTc prolongation to levels that require closer monitoring (QTc ≥ 480 ms) is more common",
      grade: "Class I, Level C",
    },
    {
      action: "If QTcF is above 500 ms, pause the cancer medicine, correct blood salts and other causes, and repeat the ECG daily until it settles",
      why: "Above 500 ms the risk of torsades de pointes rises two to three times, and the interval usually shortens once the medicine is paused.",
      source: "ic-os-2022",
      quote: "As such, we recommend considering a change in cancer therapy only when the corrected QT interval is >500 ms.",
      grade: "IC-OS consensus definition",
    },
    {
      action: "Do not pause treatment only because QTc has risen by more than 60 ms from baseline if it is still below 500 ms and there are no symptoms",
      why: "A change of this size without a long absolute value carries little risk, and stopping an effective cancer medicine has its own cost.",
      source: "esc-2022",
      quote: "Changes in the QT interval of >60 ms from baseline should not routinely affect treatment decisions if the QTc remains <500 ms",
    },
    {
      action: "Restart only as the label allows, usually at a lower dose once QTcF has come back to the label's level, after discussion between oncology or haematology and cardiology, and with closer ECG checks",
      why: "The interval can lengthen again on re-exposure, and a lower dose lowers the blood level that drives it.",
      source: "label-kisqali",
      quote: "Interrupt KISQALI treatment and wait until QTcF resolves to ≤ 480 ms, then resume at next lower dose level.",
    },
    {
      action: "Stop the medicine for good after torsades de pointes or another life-threatening rhythm caused by a long QT interval",
      why: "A rhythm of this kind can recur and can be fatal.",
      source: "label-tagrisso",
      quote: "Permanently discontinue TAGRISSO in patients who develop QTc interval prolongation with signs/symptoms of life-threatening arrhythmia",
    },
    {
      action: "Treat collapse, a blackout or sustained palpitations as an emergency: call the emergency team, attach a heart monitor, check potassium and magnesium at once and manage the rhythm by the general ventricular arrhythmia guideline",
      why: "Torsades de pointes can pass in seconds or turn into cardiac arrest, and it is treated in hospital.",
      source: "esc-2022",
      quote: "Treatment of cancer therapy-induced VA should follow general clinical guidelines.",
    },
  ],
  bestInClass: {
    statement: "The 2022 ESC cardio-oncology guideline is the most recent graded guideline; every QT recommendation in it is Level C, that is, expert consensus. ESC, IC-OS (2022) and ESMO (2020) agree on a baseline ECG, the Fridericia correction (ESMO accepts Bazett or Fridericia provided the same one is used throughout, and prefers Fridericia), correcting electrolytes, avoiding other QT-prolonging medicines, and 500 ms as the level at which treatment changes. Where they differ from the labels, both are shown. Starting: the ESC algorithm sends people with a baseline QTcF above 480 ms for cardio-oncology review, while the ribociclib, quizartinib and revumenib labels do not allow a start above 450 ms. At 481 to 500 ms: ESC continues treatment with weekly ECGs; the ribociclib label interrupts above 480 ms, the revumenib label interrupts above 480 ms, and the quizartinib label reduces the dose without interruption. A rise of more than 60 ms: ESC and IC-OS say it should not by itself change treatment below 500 ms; the trial grading scale (CTCAE, as IC-OS reports it) counts it as grade 3, and the ribociclib label stops treatment for either a QTcF above 500 ms or a rise of more than 60 ms when it comes with torsades de pointes, polymorphic ventricular tachycardia, syncope or signs of serious arrhythmia. Risk class: ESC Table 9 (2022) places quizartinib and midostaurin in its low-risk group, while the quizartinib label (2026) carries a boxed warning for QT prolongation, torsades de pointes and cardiac arrest. For the dose of the cancer medicine, the label is the rule that applies.",
    sources: ["esc-2022", "ic-os-2022", "esmo-2020", "label-kisqali", "label-vanflyta", "label-tagrisso", "label-krazati", "label-revuforj"],
  },
  variants: [
    {
      name: "ECG schedule: ESC 2022 algorithm",
      differs: "ECG at baseline, once steady-state drug levels are reached, after each dose modification or any treatment interruption of more than 2 weeks; monthly for the first 3 months, then periodically according to the person's risk factors and the treatment.",
      evidence: "Figure legend of the ESC algorithm (text) and Recommendation Table 32 (image): an ECG after any dose increase is Class I, Level C. No trial compares schedules.",
      sources: ["esc-2022"],
    },
    {
      name: "ECG schedule: the labels",
      differs: "Ribociclib: before starting and at about day 14 of the first cycle, then as clinically indicated, with electrolytes at the start of each of the first 6 cycles. Quizartinib: before starting, weekly during induction and consolidation, weekly for at least the first month of maintenance and after dose escalation. Revumenib: before starting, at least weekly for the first 4 weeks, then at least monthly. Osimertinib: periodic ECGs and electrolytes in people with congenital long QT syndrome, heart failure, electrolyte abnormalities or QT-prolonging medicines. Adagrasib: before starting and as indicated in people with heart failure, slow heart rhythms, electrolyte abnormalities or unavoidable QT-prolonging medicines.",
      evidence: "Regulatory labels, not graded. The ESC narrative (2022) describes ribociclib ECGs at day 14, before the second cycle and with any dose increase; the label read here (2026) asks for baseline and day 14, then as clinically indicated.",
      sources: ["label-kisqali", "label-vanflyta", "label-revuforj", "label-tagrisso", "label-krazati", "esc-2022"],
    },
    {
      name: "Hold and restart rules: the labels",
      differs: "Ribociclib: above 480 ms interrupt until 480 ms or less (early breast cancer resumes at the same dose, advanced disease at the next lower dose); above 500 ms interrupt and resume at the next lower dose, and stop if it recurs. Quizartinib: 481 to 500 ms reduce the dose without interruption; above 500 ms interrupt and resume at a reduced dose once below 450 ms; stop if it recurs despite dose reduction and correction of other factors. Osimertinib: above 500 ms on at least 2 separate ECGs, withhold until below 481 ms (or baseline) and resume at 40 mg. Revumenib: above 480 ms interrupt and correct potassium and magnesium, restarting at the same dose (480 to 500 ms) or a reduced dose (above 500 ms) once at or below 480 ms. Adagrasib: withhold, reduce or stop by severity. All stop permanently for torsades de pointes or signs of life-threatening arrhythmia.",
      evidence: "Regulatory labels, not graded. ESC sets one rule for any QT-prolonging cancer medicine: interrupt at 500 ms or more; once QTcF is 480 ms or less, resume at the same or a reduced dose by the drug's own protocol; between 480 and 500 ms, consider restarting at a reduced dose (Class IIb); if it stays at 500 ms or more, discuss other cancer treatments.",
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
      evidence: "In MONALEESA-7, a QTcF rise of more than 60 ms occurred in 16 per cent of patients on ribociclib with tamoxifen and 7 per cent on ribociclib with an aromatase inhibitor (label).",
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
    { claim: "A change of more than 60 ms is clinically insignificant if the QT stays below 500 ms", grade: "IC-OS consensus definition", source: "ic-os-2022", quote: "Moreover, changes in the QT interval of >60 ms from baseline are clinically insignificant if the QT remains <500 ms and should not routinely affect treatment decisions." },
    { claim: "Either Bazett or Fridericia, used consistently; Fridericia may be preferable in cancer", grade: "Consensus text; not graded", source: "esmo-2020", quote: "Fridericia’s formula may be preferable in the cancer population as there is less over- and under-correction in patients with tachycardia or bradycardia, respectively." },
    { claim: "Ribociclib: stop for a QTcF above 500 ms or a rise of more than 60 ms when accompanied by a serious arrhythmia or syncope", grade: "Regulatory label; not graded", source: "label-kisqali", quote: "Permanently discontinue KISQALI if QTcF interval prolongation is either > 500 ms or > 60 ms change from baseline AND associated with any of the following: Torsades de Pointes, polymorphic ventricular tachycardia, syncope, or signs/symptoms of serious arrhythmia." },
    { claim: "Quizartinib: do not start or escalate above a QTcF of 450 ms (boxed warning)", grade: "Regulatory label; not graded", source: "label-vanflyta", quote: "Do not initiate treatment with VANFLYTA or escalate the VANFLYTA dose if the QT interval corrected by Fridericia's formula (QTcF) is greater than 450 ms" },
    { claim: "Revumenib: ECG before starting, weekly for 4 weeks, then monthly", grade: "Regulatory label; not graded", source: "label-revuforj", quote: "Perform an electrocardiogram (ECG) prior to the initiation of REVUFORJ, at least once a week for the first 4 weeks, and at least monthly thereafter." },
    { claim: "Adagrasib: ECG and electrolytes in people at risk; correct electrolytes", grade: "Regulatory label; not graded", source: "label-krazati", quote: "Avoid use of KRAZATI in patients with congenital long QT syndrome and in patients with concurrent QTc prolongation." },
  ],
  sources: [
    {
      key: "esc-2022",
      label: "2022 ESC Guidelines on cardio-oncology developed in collaboration with the European Hematology Association (EHA), the European Society for Therapeutic Radiology and Oncology (ESTRO) and the International Cardio-Oncology Society (IC-OS)",
      publisher: "European Society of Cardiology (European Heart Journal); read from the Internet Archive capture of the publisher's page",
      year: 2022,
      url: "https://doi.org/10.1093/eurheartj/ehac244",
      doi: "10.1093/eurheartj/ehac244",
      gradingScheme: "Class of recommendation I (recommended), IIa (should be considered), IIb (may be considered), III (not recommended); level of evidence A (multiple randomised trials or meta-analyses), B (one randomised trial or large non-randomised studies), C (expert consensus or small studies).",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "ic-os-2022",
      label: "Defining cardiovascular toxicities of cancer therapies: an International Cardio-Oncology Society (IC-OS) consensus statement",
      publisher: "IC-OS (European Heart Journal)",
      year: 2022,
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8803367/",
      doi: "10.1093/eurheartj/ehab674",
      gradingScheme: "Consensus definitions; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
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
      accessed: "2026-11-16",
    },
    {
      key: "label-kisqali",
      label: "KISQALI (ribociclib) tablets: US prescribing information (label dated July 2026)",
      publisher: "Novartis, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aaeaef94-f3f5-4367-8ea2-b181d7be2da8",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-vanflyta",
      label: "VANFLYTA (quizartinib) tablets: US prescribing information (label dated April 2026)",
      publisher: "Daiichi Sankyo, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=29cdbcfe-497d-4e78-bb7b-2d4acafe8e86",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-tagrisso",
      label: "TAGRISSO (osimertinib) tablets: US prescribing information (label dated September 2026)",
      publisher: "AstraZeneca, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5e81b4a7-b971-45e1-9c31-29cea8c87ce7",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-krazati",
      label: "KRAZATI (adagrasib) tablets: US prescribing information (label dated August 2026)",
      publisher: "Mirati Therapeutics, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0b8bf078-34c2-4f45-9012-38a8ac082b01",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-revuforj",
      label: "REVUFORJ (revumenib) tablets: US prescribing information (label dated February 2026)",
      publisher: "Syndax Pharmaceuticals, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6eb3cdbc-0e74-477d-82d6-3bb172d3f63f",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
  ],
  upgrades: [],
  gaps: [
    "Every ESC recommendation on QT prolongation is Level C. No trial has compared ECG schedules, thresholds or restart strategies for cancer medicines.",
    "The emergency drug treatment of torsades de pointes is not given here: the 2022 ESC guideline on ventricular arrhythmias, which the cardio-oncology guideline defers to, was not read.",
    "The ESC recommendation tables and algorithm are images on the publisher's page and were read from archived images. The electrolyte levels in the algorithm (potassium above 4.0 mmol/L, magnesium above 1.10 mmol/L) come from that image and could not be checked against text; ESC Table 8, which is text, lists hypokalaemia at 3.5 mEq/L or below and hypomagnesaemia at 1.6 mEq/L or below as risk factors.",
    "ESC Table 9 dates from 2022. It places quizartinib and midostaurin in its low-risk group and does not list adagrasib or revumenib; the quizartinib and revumenib labels read here carry boxed warnings. The table should not be used alone to judge a newer medicine.",
    "Only five labels were read (ribociclib, quizartinib, osimertinib, adagrasib, revumenib). The ECG schedules and dose rules for ivosidenib, midostaurin, selpercatinib, nilotinib, vandetanib, arsenic trioxide, glasdegib, toremifene, pazopanib and sunitinib are in their own labels and are not given here; European product information was not read and may differ.",
    "Oxaliplatin is in the ESC high-risk group but is not linked to this page, because no label rule for QT monitoring on oxaliplatin was read.",
    "The sources disagree about a rise of more than 60 ms with a QTc still below 500 ms: ESC and IC-OS say not to act on it alone, while trial grading counts it as grade 3.",
  ],
  institutions: ["esmo"],
  drugs: ["ribociclib", "quizartinib", "osimertinib", "adagrasib", "revumenib", "ivosidenib", "midostaurin", "selpercatinib", "nilotinib", "vandetanib", "arsenic-trioxide", "glasdegib", "toremifene", "pazopanib", "sunitinib"],
  terms: ["qt-prolongation", "cardiotoxicity"],
  related: ["cardio-oncology", "cardio-oncology-risk-assessment-and-cardiac-surveillance", "hypomagnesaemia-on-egfr-antibodies", "anticancer-drug-interaction-review", "paper-lyon-eur-heart-j"],
  sections: ["supportive-care"],
  tags: ["protocol", "cardio-oncology", "side-effect-management"],
});

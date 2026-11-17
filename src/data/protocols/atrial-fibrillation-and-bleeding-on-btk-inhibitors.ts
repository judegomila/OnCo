import { protocol } from "./helpers";

/*
 * Atrial fibrillation, bleeding and high blood pressure on BTK inhibitors (ibrutinib, acalabrutinib, zanubrutinib,
 * pirtobrutinib).
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - 2022 ESC Guidelines on cardio-oncology (Lyon et al., Eur Heart J 2022), sections 5.5.6 and 6.4.1: full text of the
 *   article HTML. academic.oup.com returned 403 to a script and the paper is not in PubMed Central, so it was read
 *   from the Internet Archive's public capture of academic.oup.com
 *   (web.archive.org/web/20240219224147/https://academic.oup.com/eurheartj/article/43/41/4229/6673995). The
 *   recommendation tables are images in that page. The archived images of the first part of Recommendation Table 12
 *   (BTK inhibitors: blood pressure and echocardiography) and the first part of Recommendation Table 31 (atrial
 *   fibrillation: stroke risk score and long-term anticoagulation) were downloaded from the same archive and read by
 *   eye; the ESC classes and levels given here come from those images. The second parts of both tables (which hold
 *   the graded recommendations on pulse checks, choice of anticoagulant and rate control) were not archived, so
 *   those statements are quoted from the narrative text without a grade.
 * - International consensus statement on cardiovascular risk of BTK inhibitors in CLL (Awan et al., Blood Advances
 *   2022): full text, Europe PMC full-text XML (PMC9631706). Its acknowledgments and disclosures state that
 *   AstraZeneca funded the project, that all authors received funding from AstraZeneca for their work on it, and that
 *   a medical writer assisted. AstraZeneca markets acalabrutinib. It is labelled as industry funded wherever used.
 * - Australia and New Zealand consensus statement on cardiovascular management of CLL patients on BTK inhibitors
 *   (Intern Med J 2025): full text, Europe PMC full-text XML (PMC12422301). Its funding statement says the roundtable
 *   meeting and medical writing support were funded by AstraZeneca, Australia. Labelled likewise.
 * - US prescribing information from DailyMed (SPL XML): Imbruvica (ibrutinib, label dated October 2025), Calquence
 *   tablets (acalabrutinib, February 2026), Brukinsa (zanubrutinib, September 2026) and Jaypirca (pirtobrutinib,
 *   October 2026).
 * - ESMO Clinical Practice Guideline interim update on targeted therapies in CLL (Ann Oncol 2024): not reachable.
 *   It is not in PubMed Central and annalsofoncology.org returned 403 to a script. Named in sources; no step rests
 *   on it. The iwCLL guidelines were not sought.
 * Nemtabrutinib and BGB-16673 are investigational and no source read covers their management, so they are not
 * linked.
 *
 * Every DOI and PMCID was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with
 * line breaks joined and nothing else changed; where a source sentence ends in reference numbers, the quote stops
 * before them. The Australia and New Zealand text uses a typographic hyphen in compound words, kept as printed.
 */
export const atrialFibrillationAndBleedingOnBtkInhibitors = protocol({
  id: "atrial-fibrillation-and-bleeding-on-btk-inhibitors",
  name: "Atrial fibrillation, bleeding and high blood pressure on BTK inhibitors: assessment, monitoring and management",
  aka: ["ibrutinib atrial fibrillation", "BTK inhibitor cardiotoxicity", "ibrutinib bleeding", "stopping ibrutinib before surgery", "anticoagulation on ibrutinib", "acalabrutinib heart rhythm", "zanubrutinib atrial fibrillation", "pirtobrutinib bleeding", "ibrutinib and warfarin", "BTK inhibitor hypertension"],
  domain: "symptom-management",
  tldr: "BTK inhibitors such as ibrutinib and acalabrutinib can cause an irregular heartbeat (atrial fibrillation), easier bleeding and bruising, and high blood pressure. Your team should check your pulse and blood pressure before and during treatment and review any blood thinners. The medicine is often paused for a few days around surgery. Fainting, chest pain or heavy bleeding need urgent help.",
  simple: "These tablets can make the heartbeat irregular, raise blood pressure and make you bleed or bruise more easily. Your team checks your pulse and blood pressure and looks at your other medicines. Tell any surgeon or dentist you take one. Get urgent help if you faint, have chest pain or bleed heavily.",
  summary: "Before a BTK inhibitor, take a cardiovascular history and record blood pressure and an ECG (ibrutinib label; both consensus statements), with an echocardiogram for people at high cardiovascular risk (ESC 2022 Class I, Level C). ESC recommends blood pressure at every visit (Class I, Level B), home readings weekly for 3 months and then monthly (Class IIa, Level C), and a pulse check or ECG rhythm strip at every visit.\n\nOn the choice of drug the sources differ. ESC 2022 says the data do not yet support different monitoring strategies for ibrutinib and acalabrutinib. Two consensus statements, both funded by AstraZeneca, the maker of acalabrutinib, prefer acalabrutinib or zanubrutinib to ibrutinib in people with established cardiovascular disease and advise against BTK inhibitors, especially ibrutinib, after ventricular arrhythmia or cardiac arrest. In the ELEVATE-RR trial atrial fibrillation of any grade occurred in 16 per cent on ibrutinib and 9 per cent on acalabrutinib. The ibrutinib label warns of fatal arrhythmias, cardiac failure and sudden death.\n\nNew atrial fibrillation is not in itself a reason to stop cancer treatment (ESC). Rate control is with a beta-blocker, avoiding diltiazem and verapamil where possible (ESC). Long-term anticoagulation follows the CHA2DS2-VASc score (ESC Class I, Level C), weighed against the bleeding risk that the BTK inhibitor adds; warfarin is avoided where possible because the trials excluded it, and a direct oral anticoagulant, preferably apixaban, is used (Australia and New Zealand consensus, Class IIa, Level C). Dual antiplatelet therapy is avoided. All four labels say to consider withholding the drug for 3 to 7 days before and after surgery; the Australia and New Zealand consensus sets 3 days for minor and 7 days for major procedures (Class IIa, Level C). Bleeding from low platelets is covered by a separate protocol. This page explains care; the treating team's own protocol and the product's current label come first.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "multidisciplinary-team", "patient-or-carer", "surgical-team"],
    where: ["outpatient-clinic", "home", "community", "ward", "emergency-department"],
  },
  population: "Adults taking a BTK inhibitor (ibrutinib, acalabrutinib, zanubrutinib or pirtobrutinib) for chronic lymphocytic leukaemia, mantle cell lymphoma, Waldenström macroglobulinaemia or another B-cell cancer. Both consensus statements were written for chronic lymphocytic leukaemia. Investigational BTK inhibitors and degraders, children, and bleeding caused by a low platelet count are not covered.",
  trigger: "A BTK inhibitor is planned; at every clinic visit during treatment; when palpitations, fainting, breathlessness or bleeding occur; and before any operation, dental extraction or other invasive procedure.",
  steps: [
    {
      action: "Before the first dose, take a history of heart disease, rhythm problems, stroke, bleeding and high blood pressure, measure blood pressure and record an ECG",
      why: "Heart rhythm problems on these medicines are more likely in people who already have heart disease, high blood pressure or a past arrhythmia, and a baseline ECG shows atrial fibrillation that is already there.",
      source: "label-imbruvica",
      quote: "Evaluate cardiac history and function at baseline, and monitor patients for cardiac arrhythmias and cardiac function.",
    },
    {
      action: "Arrange an echocardiogram before treatment for people at high cardiovascular risk or with known heart disease",
      why: "A heart scan finds weak heart muscle or valve disease, which raise the risk of atrial fibrillation and heart failure on treatment.",
      source: "awan-2022",
      quote: "Beyond these basic measures, an echocardiogram can be considered for patients with high CV risk or established CV disease.",
    },
    {
      action: "List every medicine and supplement that affects bleeding (anticoagulants, aspirin and other antiplatelets, anti-inflammatory painkillers, fish oil, vitamin E) and stop those that are not needed",
      why: "BTK inhibitors raise the risk of bleeding on their own, and anything else that thins the blood adds to it.",
      source: "anz-2025",
      quote: "Where possible, avoid the use of antiplatelet therapies and other agents that increase the risk of bleeding (e.g. NSAIDs).",
      grade: "Class I, Level C",
    },
    {
      action: "In people with established heart disease, discuss the choice of BTK inhibitor in a multidisciplinary team; two industry-funded consensus statements prefer acalabrutinib or zanubrutinib to ibrutinib here",
      why: "Trials comparing the drugs found less atrial fibrillation with the newer ones, but the ESC guideline says the data do not yet justify different monitoring, and the consensus statements that state the preference were funded by AstraZeneca, which makes acalabrutinib.",
      source: "awan-2022",
      quote: "acalabrutinib or zanubrutinib are generally preferred over ibrutinib for patients with established CVD, such as well-controlled AF, HTN, heart failure, or valvular heart disease",
    },
    {
      action: "In people who have had a ventricular arrhythmia or cardiac arrest, avoid ibrutinib and consider a treatment that is not a BTK inhibitor",
      why: "Ibrutinib has been linked to dangerous ventricular rhythms and sudden death, and whether the newer drugs share that risk is not yet known.",
      source: "awan-2022",
      quote: "The use of BTKis, especially ibrutinib, should be avoided in patients with a history of ventricular arrhythmias and cardiac arrest.",
    },
    {
      action: "Feel the pulse or record an ECG rhythm strip at every clinic visit",
      why: "Atrial fibrillation often causes no symptoms, and an irregular pulse is the simplest way to find it.",
      source: "esc-2022",
      quote: "Opportunistic screening for AF by pulse-taking or ECG rhythm strip is recommended at every clinical visit during BTK inhibitor therapy",
    },
    {
      action: "Measure blood pressure at every visit, ask for home readings weekly for the first 3 months and then monthly, and treat high blood pressure",
      why: "High blood pressure is common on these medicines (19 per cent of patients in the ibrutinib trials) and adds to the strain on the heart.",
      source: "label-imbruvica",
      quote: "Monitor blood pressure in patients treated with IMBRUVICA, initiate or adjust anti-hypertensive medication throughout treatment with IMBRUVICA as appropriate, and follow dosage modification guidelines for Grade 3 or higher hypertension",
    },
    {
      action: "Tell the person to report palpitations, dizziness, fainting, breathlessness or chest discomfort, and record an ECG when they do",
      why: "These are the symptoms of a rhythm problem, and an ECG taken at the time is how it is diagnosed.",
      source: "label-brukinsa",
      quote: "Monitor for signs and symptoms of cardiac arrhythmias (e.g., palpitations, dizziness, syncope, dyspnea, chest discomfort), manage appropriately",
    },
    {
      action: "When atrial fibrillation is found, do not stop the BTK inhibitor automatically: arrange an echocardiogram and decide with cardiology whether to continue, pause, reduce the dose or change drug",
      why: "The cancer treatment is often working well, and many people can stay on it once the heart rate and stroke risk are managed.",
      source: "esc-2022",
      quote: "neither the presence nor the risk of AF constitutes contraindications to anticancer treatment",
    },
    {
      action: "Control the heart rate with a beta-blocker, and avoid diltiazem and verapamil where possible",
      why: "Diltiazem and verapamil interact with many cancer medicines and weaken the heart's pumping, so a beta-blocker is the safer first choice.",
      source: "esc-2022",
      quote: "Among rate-control drugs, beta-blockers are preferred, especially if the cancer therapies have potential CTRCD risk, whereas diltiazem and verapamil should be avoided where possible due to their drug–drug interactions and negative inotropic effects",
    },
    {
      action: "Work out the stroke risk with the CHA2DS2-VASc score and the bleeding risk, and offer long-term anticoagulation at a score of 2 or more in men or 3 or more in women",
      why: "Atrial fibrillation can cause a stroke, and a blood thinner prevents most of them; on a BTK inhibitor the extra bleeding risk has to be weighed each time.",
      source: "esc-2022",
      quote: "Long-term anticoagulation is recommended in adult patients with CHA2DS2-VASc score ≥2 in men or ≥3 in women and must be considered also when the score is 1 in men and 2 in women",
      grade: "Class I, Level C",
    },
    {
      action: "Where an anticoagulant is needed, avoid warfarin if possible and use a direct oral anticoagulant after an interaction check",
      why: "The BTK inhibitor trials kept out people on warfarin, so there is little evidence that the combination is safe.",
      source: "anz-2025",
      quote: "Most BTKi trials exclude warfarin use, so there are scant safety data supporting the co‐administration of these agents.",
    },
    {
      action: "Avoid dual antiplatelet therapy with a BTK inhibitor; if a stent or heart attack makes it necessary, pause ibrutinib or agree the shortest course with cardiology",
      why: "Two antiplatelet medicines on top of a BTK inhibitor carry a high risk of serious bleeding.",
      source: "esc-2022",
      quote: "Due to a higher bleeding risk, ibrutinib should be temporarily interrupted in patients requiring dual antiplatelet therapy (DAPT) and 3–7 days before invasive procedures.",
    },
    {
      action: "Before surgery, a dental extraction or another invasive procedure, consider withholding the BTK inhibitor for 3 to 7 days before and after, according to the bleeding risk of the procedure",
      why: "These medicines raise the risk of bleeding during and after a procedure, and bleeding after procedures has been reported on them.",
      source: "label-calquence",
      quote: "Consider the benefit-risk of withholding CALQUENCE for 3 to 7 days pre- and post-surgery depending upon the type of surgery and the risk of bleeding.",
    },
    {
      action: "Tell the person to report severe headache, blood in the stools or urine, or bleeding that will not stop, and treat these as urgent",
      why: "Serious bleeding, including bleeding in the brain, has occurred on every BTK inhibitor.",
      source: "label-imbruvica",
      quote: "Inform patients of the possibility of bleeding, and to report any signs or symptoms (severe headache, blood in stools or urine, prolonged or uncontrolled bleeding).",
    },
    {
      action: "After serious bleeding or a serious arrhythmia, withhold, reduce or stop the BTK inhibitor as its label directs; zanubrutinib is stopped after any bleeding inside the skull",
      why: "Each label sets its own rule for restarting at a lower dose or stopping for good.",
      source: "label-brukinsa",
      quote: "Discontinue BRUKINSA if intracranial hemorrhage of any grade occurs.",
    },
    {
      action: "Treat collapse, a blackout or a suspected ventricular arrhythmia as an emergency with urgent cardiology review",
      why: "Dangerous ventricular rhythms have been reported on BTK inhibitors, and the ibrutinib label warns of sudden death, including in people without known heart disease.",
      source: "anz-2025",
      quote: "An urgent cardiology review is required if VT is suspected at any time.",
    },
  ],
  bestInClass: {
    statement: "The 2022 ESC cardio-oncology guideline is the only independent graded guideline read; its BTK inhibitor recommendations are Level B or C. The four labels agree on monitoring for arrhythmia and bleeding and on considering a 3 to 7 day pause either side of surgery. The most detailed management advice comes from two consensus statements (international, 2022; Australia and New Zealand, 2025) that were both funded by AstraZeneca, the maker of acalabrutinib, and should be read with that in mind. Differences shown here: Choice of drug: ESC says there are not enough data to set different monitoring for ibrutinib and acalabrutinib; both consensus statements prefer acalabrutinib or zanubrutinib in people with cardiovascular disease. Time off around procedures: the labels say to consider 3 to 7 days before and after surgery; ESC says to interrupt ibrutinib 3 to 7 days before invasive procedures; the Australia and New Zealand consensus sets 3 days before and after a minor procedure and 7 days for a major one (Class IIa, Level C). Anticoagulant: ESC states that vitamin K antagonists have drawbacks in cancer and that direct oral anticoagulants are limited by drug interactions; the Australia and New Zealand consensus says to avoid warfarin if possible (Class IIb, Level C) and switch to a direct oral anticoagulant, preferably apixaban (Class IIa, Level C); the international consensus calls warfarin less preferred and says the data do not clearly support a single approach. Blood pressure medicine: ESC recommends an ACE inhibitor or ARB first for cancer therapy-related hypertension in general, while the international consensus reports an unconfirmed signal from the FLAIR trial linking ACE inhibitor use at entry with sudden cardiac death on ibrutinib and asks for close monitoring.",
    sources: ["esc-2022", "awan-2022", "anz-2025", "label-imbruvica", "label-calquence", "label-brukinsa", "label-jaypirca"],
  },
  variants: [
    {
      name: "Preferring acalabrutinib or zanubrutinib in people with heart disease (consensus statements funded by AstraZeneca)",
      differs: "Uses a second-generation BTK inhibitor rather than ibrutinib in people with established cardiovascular disease, controlled atrial fibrillation or high cardiovascular risk; avoids BTK inhibitors, especially ibrutinib, after ventricular arrhythmia or cardiac arrest; and treats active heart failure as a relative contraindication.",
      evidence: "ELEVATE-RR (acalabrutinib against ibrutinib in previously treated CLL, as reported in the international consensus): atrial fibrillation of any grade in 16 per cent on ibrutinib and 9 per cent on acalabrutinib. ESC notes that grade 3 or higher atrial fibrillation, and atrial fibrillation in people aged 75 or over or with previous atrial fibrillation, were comparable between the groups. Both consensus statements were funded by AstraZeneca, the maker of acalabrutinib; the international one states that all authors received funding from AstraZeneca for the work and that a medical writer assisted.",
      sources: ["awan-2022", "anz-2025", "esc-2022"],
    },
    {
      name: "Time off around procedures",
      differs: "Labels: consider withholding for 3 to 7 days before and after surgery (ibrutinib: at least 3 to 7 days). ESC: interrupt ibrutinib 3 to 7 days before invasive procedures, and consider platelet transfusion for emergency interventions. Australia and New Zealand consensus: 3 days before and after a minor procedure, 7 days before and after a major one.",
      evidence: "Label wording and consensus (Class IIa, Level C in the Australia and New Zealand statement). No trial compares durations.",
      sources: ["label-imbruvica", "label-calquence", "label-brukinsa", "label-jaypirca", "esc-2022", "anz-2025"],
    },
    {
      name: "Anticoagulant choice in atrial fibrillation",
      differs: "Australia and New Zealand consensus: avoid warfarin if possible, switch to a direct oral anticoagulant, preferably apixaban because it has the fewest interactions, and consider a reduced dose if bleeding risk is high; warfarin remains necessary for mechanical heart valves. International consensus: warfarin is less preferred, and the data do not clearly support a single approach between stopping the BTK inhibitor and anticoagulating, or pausing and restarting once atrial fibrillation is controlled. ESC: follow the general atrial fibrillation guideline, using the T (thrombotic risk), B (bleeding risk), I (interactions), P (patient preference) approach.",
      evidence: "The ibrutinib label reports major haemorrhage in 3.1 per cent of patients without antiplatelet or anticoagulant therapy, 4.4 per cent with antiplatelet therapy and 6.1 per cent with anticoagulant therapy. No randomised trial has tested an anticoagulant with a BTK inhibitor.",
      sources: ["anz-2025", "awan-2022", "esc-2022", "label-imbruvica"],
    },
    {
      name: "Dose rules after an arrhythmia: the labels",
      differs: "Ibrutinib: after a first grade 3 arrhythmia restart at a reduced dose, stop after a second, and stop after any grade 4 arrhythmia or grade 3 or 4 cardiac failure. Pirtobrutinib: reduce, withhold or stop by severity. Zanubrutinib and acalabrutinib: monitor for symptoms and manage as appropriate.",
      evidence: "Regulatory labels, not graded.",
      sources: ["label-imbruvica", "label-jaypirca", "label-brukinsa", "label-calquence"],
    },
  ],
  grades: [
    { claim: "Blood pressure measured at every clinical visit on BTK inhibitors", grade: "Class I, Level B", source: "esc-2022" },
    { claim: "Weekly home blood pressure for the first 3 months and monthly thereafter", grade: "Class IIa, Level C", source: "esc-2022" },
    { claim: "Baseline echocardiography in high-risk patients scheduled to receive BTK inhibitors", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "Transthoracic echocardiography in all patients who develop atrial fibrillation on a BTK inhibitor", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "CHA2DS2-VASc score for stroke risk, bearing in mind it may underestimate risk in cancer", grade: "Class IIa, Level C", source: "esc-2022" },
    { claim: "Long-term anticoagulation at a CHA2DS2-VASc score of 2 or more in men or 3 or more in women", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "ESC: not enough data to set different monitoring for ibrutinib and acalabrutinib", grade: "Guideline text; not graded", source: "esc-2022", quote: "Therefore, we currently do not have enough data to establish different monitoring strategies in patients treated with these drugs." },
    { claim: "Avoid antiplatelet therapies and other agents that increase bleeding where possible (statement funded by AstraZeneca)", grade: "Class I, Level C", source: "anz-2025" },
    { claim: "Dual antiplatelet therapy generally avoided (statement funded by AstraZeneca)", grade: "Class IIb, Level C", source: "anz-2025", quote: "Dual anti‐platelet therapy should generally be avoided wherever possible, given the limited data on safety and the increased risk of bleeding." },
    { claim: "Withhold for 3 days either side of a minor procedure and 7 days either side of a major one (statement funded by AstraZeneca)", grade: "Class IIa, Level C", source: "anz-2025", quote: "Withhold the BTKi for 3 days before and 3 days after a minor procedure (or 7 days before and after a major procedure) because of an increased periprocedural bleeding risk." },
    { claim: "Avoid warfarin if possible (Class IIb, Level C); switch to a direct oral anticoagulant, preferably apixaban (Class IIa, Level C) (statement funded by AstraZeneca)", grade: "Class IIb, Level C and Class IIa, Level C", source: "anz-2025" },
    { claim: "Initial rate control with beta-blockers is acceptable (statement funded by AstraZeneca)", grade: "Consensus text; not graded", source: "anz-2025", quote: "In general, an initial strategy of rate control with beta blockers is acceptable." },
    { claim: "Warfarin is less preferred with BTK inhibitors (statement funded by AstraZeneca)", grade: "Consensus text; not graded", source: "awan-2022", quote: "Clinical trials routinely exclude warfarin, and warfarin is less preferred in patients receiving BTKis" },
    { claim: "Pretreatment history, examination, ECG and blood pressure for everyone (statement funded by AstraZeneca)", grade: "Consensus text; not graded", source: "awan-2022", quote: "The pretreatment workup for all patients should include a comprehensive patient history and targeted CV examination, including an electrocardiogram (ECG) and a blood pressure measurement to identify the main risk factors present, including AF and HTN" },
    { claim: "Ibrutinib: fatal and serious arrhythmias, cardiac failure and sudden death", grade: "Regulatory label; not graded", source: "label-imbruvica", quote: "Fatal and serious cardiac arrhythmias and cardiac failure have occurred with IMBRUVICA." },
    { claim: "Ibrutinib: consider withholding for at least 3 to 7 days before and after surgery", grade: "Regulatory label; not graded", source: "label-imbruvica", quote: "Consider the benefit-risk of withholding IMBRUVICA for at least 3 to 7 days pre- and post-surgery depending upon the type of surgery and the risk of bleeding" },
    { claim: "Pirtobrutinib: consider withholding for 3 to 7 days before and after surgery", grade: "Regulatory label; not graded", source: "label-jaypirca", quote: "Consider the benefit-risk of withholding JAYPIRCA for 3 to 7 days pre- and post-surgery depending upon the type of surgery and risk of bleeding." },
    { claim: "Zanubrutinib: consider withholding for 3 to 7 days before and after surgery", grade: "Regulatory label; not graded", source: "label-brukinsa", quote: "Consider the benefit-risk of withholding BRUKINSA for 3-7 days before and after surgery depending upon the type of surgery and the risk of bleeding." },
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
      key: "awan-2022",
      label: "International consensus statement on the management of cardiovascular risk of Bruton's tyrosine kinase inhibitors in CLL (funded by AstraZeneca; all authors received funding from AstraZeneca for the work; medical writing assistance)",
      publisher: "Blood Advances (Awan et al.); project funded by AstraZeneca",
      year: 2022,
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9631706/",
      doi: "10.1182/bloodadvances.2022007938",
      gradingScheme: "Expert panel consensus; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "anz-2025",
      label: "Australia and New Zealand consensus statement on the cardiovascular management of patients with chronic lymphocytic leukaemia treated with Bruton's tyrosine kinase inhibitors (roundtable meeting and medical writing funded by AstraZeneca, Australia)",
      publisher: "Internal Medicine Journal; roundtable and medical writing funded by AstraZeneca, Australia",
      year: 2025,
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12422301/",
      doi: "10.1111/imj.70159",
      gradingScheme: "Class of recommendation I, IIa, IIb or III and level of evidence A, B or C, defined in the statement's Appendix II on the pattern used by cardiology guidelines.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-imbruvica",
      label: "IMBRUVICA (ibrutinib) capsules, tablets and oral suspension: US prescribing information (label dated October 2025)",
      publisher: "Pharmacyclics and Janssen, on DailyMed (US National Library of Medicine)",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0dfd0279-ff17-4ea9-89be-9803c71bab44",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-calquence",
      label: "CALQUENCE (acalabrutinib) tablets: US prescribing information (label dated February 2026)",
      publisher: "AstraZeneca, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b1409184-3267-4d8c-8f17-4e01f69828b1",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-brukinsa",
      label: "BRUKINSA (zanubrutinib) capsules and tablets: US prescribing information (label dated September 2026)",
      publisher: "BeOne Medicines, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3e08fe23-d70e-424c-bc51-1222e320f902",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-jaypirca",
      label: "JAYPIRCA (pirtobrutinib) tablets: US prescribing information (label dated October 2026)",
      publisher: "Eli Lilly, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bd551845-0878-49a4-860f-839b83f6b801",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "esmo-cll-2024",
      label: "ESMO Clinical Practice Guideline interim update on new targeted therapies in the first line and at relapse of chronic lymphocytic leukaemia",
      publisher: "ESMO (Annals of Oncology)",
      year: 2024,
      url: "https://doi.org/10.1016/j.annonc.2024.06.016",
      doi: "10.1016/j.annonc.2024.06.016",
      read: "not-reachable",
      accessed: "2026-11-16",
    },
  ],
  upgrades: [],
  gaps: [
    "The two consensus statements that give the most detailed advice (on choice of BTK inhibitor, anticoagulant and time off around procedures) were both funded by AstraZeneca, which makes acalabrutinib. The independent ESC guideline is less specific and says the data do not yet support different monitoring for ibrutinib and acalabrutinib.",
    "The ESMO guideline on chronic lymphocytic leukaemia (2024 interim update) could not be read: it is not in PubMed Central and the journal site returned 403 to a script. The iwCLL guidelines were not sought. What either says about cardiac risk and the choice of BTK inhibitor is not given here.",
    "The second parts of the ESC recommendation tables on BTK inhibitors and on atrial fibrillation were not in the archive, so no ESC class or level is given for pulse checks at each visit, for the choice of anticoagulant or for rate control; those are quoted from the guideline's narrative text.",
    "No randomised trial has tested an anticoagulant, a rate-control medicine or a length of pause around surgery in people on BTK inhibitors. The 3 to 7 day range in the labels is to be considered against the bleeding risk of the procedure; none of the sources read says when a longer or shorter pause is right for a given operation.",
    "Whether acalabrutinib, zanubrutinib or pirtobrutinib carry the risk of ventricular arrhythmia and sudden death reported with ibrutinib is not settled: their labels report grade 3 or higher ventricular arrhythmias in 0.5 per cent (acalabrutinib) and 0.3 per cent (zanubrutinib) of trial patients, and the international consensus says the risk of the newer drugs is not yet known.",
    "The international consensus reports an association in the FLAIR trial between ACE inhibitor use at entry and sudden cardiac death on ibrutinib with rituximab, calls the data immature and asks for confirmation. No source read changes blood pressure treatment on that basis.",
    "Nemtabrutinib and BGB-16673 are investigational; no source read covers managing their cardiovascular effects.",
  ],
  institutions: ["esmo"],
  targets: ["btk"],
  drugs: ["ibrutinib", "acalabrutinib", "zanubrutinib", "pirtobrutinib"],
  terms: ["cardiotoxicity"],
  related: ["bleeding-precautions-when-platelets-are-low", "antithrombotic-interruption-around-surgery", "cardio-oncology", "cardio-oncology-risk-assessment-and-cardiac-surveillance", "hypertension-and-proteinuria-on-vegf-pathway-inhibitors", "anticancer-drug-interaction-review", "btki-ibrutinib-cardiac-caution", "paper-lyon-eur-heart-j"],
  sections: ["supportive-care"],
  tags: ["protocol", "cardio-oncology", "side-effect-management"],
});

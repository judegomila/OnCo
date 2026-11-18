import { protocol } from "./helpers";

/*
 * Atrial fibrillation, bleeding and high blood pressure on BTK inhibitors (ibrutinib, acalabrutinib, zanubrutinib,
 * pirtobrutinib).
 *
 * First written on 16 November 2026. Second accuracy pass on 17 November 2026: every source below was read again as
 * raw text and each quote was checked by script (whitespace and line-break hyphenation normalised, XML tags
 * stripped, nothing else).
 * - 2022 ESC Guidelines on cardio-oncology (Lyon et al., Eur Heart J 2022), sections 5.5.6 and 6.4.1 with
 *   Recommendation Tables 12 and 31 in full: the published PDF held by an institutional repository (iris.unisr.it,
 *   hdl.handle.net/20.500.11768/201582), saved by a sibling checker on 16 November 2026 and re-used here as text
 *   (pdftotext). The first writer had only an Internet Archive capture whose recommendation tables were images, with
 *   the second half of each table missing; the PDF prints both tables whole, so the ESC classes and levels for pulse
 *   checks, the choice of anticoagulant and rate control are now given. In the PDF text the letters "fi" are a
 *   single glyph, so no ESC sentence containing that glyph is used as a quote. academic.oup.com still returns 403
 *   to a script. Crossref lists no correction or newer edition.
 * - International consensus statement on cardiovascular risk of BTK inhibitors in CLL (Awan et al., Blood Advances
 *   2022): full text, Europe PMC full-text XML (PMC9631706). Its acknowledgments and disclosures state that
 *   AstraZeneca funded the project and that all authors received funding from AstraZeneca for their work on it; the
 *   authors also thank a named person at a company called M-phaR for assistance in preparing the manuscript (the
 *   paper does not call this medical writing). AstraZeneca markets acalabrutinib. Labelled as industry funded
 *   wherever used.
 * - Australia and New Zealand consensus statement on cardiovascular management of CLL patients on BTK inhibitors
 *   (Intern Med J 2025): full text, Europe PMC full-text XML (PMC12422301). Its funding statement says the roundtable
 *   meeting and medical writing support were funded by AstraZeneca, Australia. Labelled likewise.
 * - US prescribing information from DailyMed (SPL XML, current versions checked against the DailyMed history):
 *   Imbruvica (ibrutinib, revised October 2025), Calquence tablets (acalabrutinib, revised February 2026), Brukinsa
 *   (zanubrutinib, revised July 2026; this version was published on DailyMed in September 2026) and Jaypirca
 *   (pirtobrutinib, revised October 2026). The patient information printed in the Calquence label is the source for
 *   which symptoms to report straight away.
 * - ESMO Clinical Practice Guideline interim update on targeted therapies in CLL (Ann Oncol 2024): still not
 *   reachable on 17 November 2026. It is not in PubMed Central and annalsofoncology.org returned 403 to a script.
 *   Named in sources; no step rests on it. The iwCLL guidelines were not sought.
 * Nemtabrutinib and BGB-16673 are investigational and no source read covers their management, so they are not
 * linked.
 *
 * What the second pass changed: steps that cited the ibrutinib label for things it does not print (an ECG, visit and
 * home blood pressure schedules) now cite the guideline that does; orders were softened where the source says
 * "should be considered"; the ESC grade on anticoagulation is now attached to the graded sentence; unsourced reasons
 * were reworded to what the sources state; and the ESC recommendation preferring a direct oral anticoagulant was
 * added.
 *
 * Every DOI and PMCID was resolved through Crossref and Europe PMC and its title checked. Quotes are copied from the
 * raw text with line breaks joined and nothing else changed; where a source sentence ends in reference numbers or
 * runs on, the quote stops before them. The Australia and New Zealand text uses a typographic hyphen in compound
 * words, kept as printed.
 */
export const atrialFibrillationAndBleedingOnBtkInhibitors = protocol({
  id: "atrial-fibrillation-and-bleeding-on-btk-inhibitors",
  name: "Atrial fibrillation, bleeding and high blood pressure on BTK inhibitors: assessment, monitoring and management",
  aka: ["ibrutinib atrial fibrillation", "BTK inhibitor cardiotoxicity", "ibrutinib bleeding", "stopping ibrutinib before surgery", "anticoagulation on ibrutinib", "acalabrutinib heart rhythm", "zanubrutinib atrial fibrillation", "pirtobrutinib bleeding", "ibrutinib and warfarin", "BTK inhibitor hypertension"],
  domain: "symptom-management",
  tldr: "BTK inhibitors such as ibrutinib can cause an irregular heartbeat (atrial fibrillation), bleeding and bruising, and high blood pressure. Your team checks your pulse and blood pressure and reviews any blood thinners. The medicine may be paused around an operation or dental work. Report straight away a fast or irregular heartbeat, feeling faint, chest discomfort, or bleeding you cannot control.",
  simple: "These tablets can make the heartbeat irregular, raise blood pressure and make you bleed or bruise more easily. Your team checks your pulse and blood pressure and looks at your other medicines. Tell any surgeon or dentist you take one. Tell your team straight away if your heartbeat is fast or irregular, you feel faint, your chest is uncomfortable, or you have bleeding you cannot control.",
  summary: "Before a BTK inhibitor, take a cardiovascular history and record blood pressure and an ECG (both consensus statements; the ibrutinib label says to evaluate cardiac history and function at baseline), with an echocardiogram for people at high cardiovascular risk (ESC 2022 Class I, Level C). ESC recommends blood pressure at every visit (Class I, Level B) and a pulse check or ECG rhythm strip at every visit (Class I, Level C), and says home readings weekly for 3 months and then monthly should be considered (Class IIa, Level C).\n\nOn the choice of drug the sources differ. ESC 2022 says the data do not yet support different monitoring strategies for ibrutinib and acalabrutinib. Two consensus statements, both funded by AstraZeneca, the maker of acalabrutinib, prefer acalabrutinib or zanubrutinib to ibrutinib in people with established cardiovascular disease and advise against BTK inhibitors, especially ibrutinib, after ventricular arrhythmia or cardiac arrest. In the ELEVATE-RR trial atrial fibrillation of any grade occurred in 16 per cent on ibrutinib and 9 per cent on acalabrutinib. The ibrutinib label warns of fatal arrhythmias, cardiac failure and sudden death.\n\nESC says that neither atrial fibrillation nor the risk of it is a contraindication to cancer treatment. It says rate control, preferably with a beta-blocker, should be considered for well-tolerated atrial fibrillation (Class IIa, Level C), with diltiazem and verapamil avoided where possible. Long-term anticoagulation is recommended at a CHA2DS2-VASc score of 2 or more in men or 3 or more in women (ESC Class I, Level C) and should be considered at 1 in men or 2 in women (Class IIa, Level C), weighed against bleeding risk. ESC says a direct oral anticoagulant should be considered in preference to low molecular weight heparin and vitamin K antagonists such as warfarin, in people without a high bleeding risk, significant drug interactions or severe renal dysfunction (Class IIa, Level B). The Australia and New Zealand consensus says to avoid warfarin if possible because most BTK inhibitor trials excluded it (Class IIb, Level C) and to switch to a direct oral anticoagulant, preferably apixaban (Class IIa, Level C). The same consensus says dual antiplatelet therapy should generally be avoided (Class IIb, Level C), and ESC says ibrutinib should be temporarily interrupted in people who need it. All four labels say to consider withholding the drug for 3 to 7 days before and after surgery (the ibrutinib label says at least 3 to 7 days); the Australia and New Zealand consensus sets 3 days for minor and 7 days for major procedures (Class IIa, Level C). Bleeding from low platelets is covered by a separate protocol. This page explains care; the treating team's own protocol and the product's current label come first.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "multidisciplinary-team", "patient-or-carer", "surgical-team"],
    where: ["outpatient-clinic", "home", "community", "ward", "emergency-department"],
  },
  population: "Adults taking a BTK inhibitor (ibrutinib, acalabrutinib, zanubrutinib or pirtobrutinib) for chronic lymphocytic leukaemia, mantle cell lymphoma, Waldenström macroglobulinaemia or another B-cell cancer. Both consensus statements were written for chronic lymphocytic leukaemia. Investigational BTK inhibitors and degraders, children, and bleeding caused by a low platelet count are not covered.",
  trigger: "A BTK inhibitor is planned; at every clinic visit during treatment; when palpitations, fainting, breathlessness or bleeding occur; and before any operation, dental extraction or other invasive procedure.",
  steps: [
    {
      action: "Before the first dose, take a history of heart disease, its risk factors and earlier heart-damaging treatment, measure blood pressure and pulse, and record a 12-lead ECG",
      why: "The ibrutinib label says its serious heart rhythm problems happened particularly in people with high blood pressure, diabetes or a past arrhythmia, and it too asks for cardiac history and function to be evaluated at baseline. The schedule quoted here comes from a consensus statement funded by AstraZeneca.",
      source: "anz-2025",
      quote: "A thorough baseline CV risk assessment is recommended in all CLL patients prior to starting a BTKi (time permitting). This includes patient history (risk factors, comorbidities, pre‐existing CVD, previous cardiotoxic therapy), physical examination (BP, pulse) and 12‐lead ECG.",
      grade: "Class I, Level B",
    },
    {
      action: "Arrange an echocardiogram before treatment for people at high risk",
      why: "ESC counts as high risk: men, people aged 65 or over, and people with high blood pressure, diabetes, a long QT interval (QTc of 480 ms or more), atrial fibrillation, heart failure, cardiomyopathy or severe valve disease. The international consensus is more cautious and says an echocardiogram can be considered for people at high cardiovascular risk or with established cardiovascular disease.",
      source: "esc-2022",
      quote: "Baseline echocardiography is recommended in high-risk patients scheduled to receive BTK inhibitors.",
      grade: "Class I, Level C",
    },
    {
      action: "List every medicine and supplement that affects bleeding (anticoagulants, aspirin and other antiplatelets, anti-inflammatory painkillers, fish oil, vitamin E) and stop those that are not needed",
      why: "BTK inhibitors raise the risk of bleeding on their own, and the labels say antiplatelet and anticoagulant medicines can raise it further. The same consensus, funded by AstraZeneca, asks teams to encourage people to avoid over-the-counter products such as vitamin E and fish oil (Class I, Level C).",
      source: "anz-2025",
      quote: "Where possible, avoid the use of antiplatelet therapies and other agents that increase the risk of bleeding (e.g. NSAIDs).",
      grade: "Class I, Level C",
    },
    {
      action: "In people with established heart disease, discuss the choice of BTK inhibitor in a multidisciplinary team; two industry-funded consensus statements prefer acalabrutinib or zanubrutinib to ibrutinib here",
      why: "Trials comparing the drugs found less atrial fibrillation with the newer ones, but the ESC guideline says there are not yet enough data to set different monitoring, and the consensus statements that state the preference were funded by AstraZeneca, which makes acalabrutinib.",
      source: "awan-2022",
      quote: "acalabrutinib or zanubrutinib are generally preferred over ibrutinib for patients with established CVD, such as well-controlled AF, HTN, heart failure, or valvular heart disease",
    },
    {
      action: "In people who have had a ventricular arrhythmia or cardiac arrest, avoid BTK inhibitors, especially ibrutinib, and consider a treatment from another class",
      why: "The international consensus, funded by AstraZeneca, says ibrutinib has been shown to increase ventricular arrhythmias and sudden cardiac death, that it is not yet known whether the newer drugs do the same, and that it prefers a BCL-2 inhibitor to any BTK inhibitor here. The Australia and New Zealand consensus also says BTK inhibitors should generally be avoided after ventricular arrhythmia (Class III, Level C).",
      source: "awan-2022",
      quote: "The use of BTKis, especially ibrutinib, should be avoided in patients with a history of ventricular arrhythmias and cardiac arrest.",
    },
    {
      action: "Feel the pulse or record an ECG rhythm strip at every clinic visit",
      why: "Atrial fibrillation can cause no symptoms at all, so the guideline asks for a check at each visit rather than waiting for a complaint.",
      source: "esc-2022",
      quote: "Opportunistic screening for AF by pulse-taking or ECG rhythm strip is recommended at every clinical visit during BTK inhibitor therapy",
      grade: "Class I, Level C",
    },
    {
      action: "Measure blood pressure at every visit, consider home readings weekly for the first 3 months and monthly after that, and treat high blood pressure",
      why: "High blood pressure occurred in 19 per cent of patients in the ibrutinib trials, and the ibrutinib label says to monitor it and to start or adjust blood pressure medicine as appropriate. ESC grades the home readings lower, as something that should be considered (Class IIa, Level C).",
      source: "esc-2022",
      quote: "BP measurement is recommended for patients treated with BTK inhibitors at every clinical visit.",
      grade: "Class I, Level B",
    },
    {
      action: "Tell the person to report palpitations, dizziness, fainting, breathlessness or chest discomfort, and arrange an ECG or other tests when they do",
      why: "The labels list these as the symptoms of a rhythm problem. The ibrutinib label says to obtain further evaluation, such as an ECG or echocardiogram, as indicated when they appear.",
      source: "label-brukinsa",
      quote: "Monitor for signs and symptoms of cardiac arrhythmias (e.g., palpitations, dizziness, syncope, dyspnea, chest discomfort), manage appropriately",
    },
    {
      action: "When atrial fibrillation is found, do not stop the BTK inhibitor automatically: arrange an echocardiogram and decide with cardiology whether to continue, pause, reduce the dose or change drug",
      why: "ESC recommends an echocardiogram for everyone who develops atrial fibrillation on a BTK inhibitor (Class I, Level C) and a team decision on the cancer treatment. The international consensus says people with few other risk factors are often suitable to continue.",
      source: "esc-2022",
      quote: "neither the presence nor the risk of AF constitutes contraindications to anticancer treatment",
    },
    {
      action: "Where atrial fibrillation is well tolerated, consider controlling the heart rate, preferably with a beta-blocker, and avoid diltiazem and verapamil where possible",
      why: "ESC says rate control, preferably with a beta-blocker, should be considered (Class IIa, Level C). It gives drug interactions and a weakening effect on the heart's pumping as the reasons to avoid diltiazem and verapamil where possible.",
      source: "esc-2022",
      quote: "Among rate-control drugs, beta-blockers are preferred, especially if the cancer therapies have potential CTRCD risk, whereas diltiazem and verapamil should be avoided where possible due to their drug–drug interactions and negative inotropic effects",
    },
    {
      action: "Work out the stroke risk with the CHA2DS2-VASc score and the bleeding risk, offer long-term anticoagulation at a score of 2 or more in men or 3 or more in women, and consider it at 1 in men or 2 in women",
      why: "Atrial fibrillation raises the risk of stroke, and long-term anticoagulation is given to prevent it. ESC grades anticoagulation at the lower scores as something that should be considered (Class IIa, Level C), says the score may underestimate the risk in cancer, and recommends reassessing clot and bleeding risk during follow-up (Class I, Level C).",
      source: "esc-2022",
      quote: "Long-term anticoagulation is recommended for stroke/systemic thromboembolism prevention in patients with cancer with AF and a CHA2DS2-VASc score ≥2 (men) or ≥3 (women)",
      grade: "Class I, Level C",
    },
    {
      action: "Where an anticoagulant is needed, avoid warfarin if possible and consider a direct oral anticoagulant after checking bleeding risk, drug interactions and kidney function",
      why: "Most BTK inhibitor trials kept out people on warfarin, so there is little evidence that the combination is safe; this consensus, funded by AstraZeneca, prefers apixaban. ESC says a direct oral anticoagulant should be considered in preference to warfarin and heparin in people without a high bleeding risk, significant drug interactions or severe renal dysfunction (Class IIa, Level B).",
      source: "anz-2025",
      quote: "Most BTKi trials exclude warfarin use, so there are scant safety data supporting the co‐administration of these agents.",
    },
    {
      action: "Avoid dual antiplatelet therapy with a BTK inhibitor where possible; if it is needed, for example after a stent, interrupt ibrutinib for the time being or agree the shortest course with cardiology",
      why: "ESC gives a higher bleeding risk as the reason to interrupt ibrutinib. The Australia and New Zealand consensus, funded by AstraZeneca, says the combination should generally be avoided because safety data are limited (Class IIb, Level C) and that antiplatelet therapy should be as short as possible (Class I, Level C).",
      source: "esc-2022",
      quote: "Due to a higher bleeding risk, ibrutinib should be temporarily interrupted in patients requiring dual antiplatelet therapy (DAPT) and 3–7 days before invasive procedures.",
    },
    {
      action: "Before surgery, a dental extraction or another invasive procedure, consider withholding the BTK inhibitor for 3 to 7 days before and after, according to the bleeding risk of the procedure",
      why: "These medicines raise the risk of bleeding around a procedure, and the ibrutinib label counts bleeding after a procedure among its major bleeding events. The labels tell patients the medicine may be stopped for a planned medical, surgical or dental procedure.",
      source: "label-calquence",
      quote: "Consider the benefit-risk of withholding CALQUENCE for 3 to 7 days pre- and post-surgery depending upon the type of surgery and the risk of bleeding.",
    },
    {
      action: "Tell the person to report straight away any sign of bleeding: blood in the stools or black stools, pink or brown urine, vomiting or coughing up blood, a severe or lasting headache, or bleeding that is severe or will not stop",
      why: "Fatal and serious bleeding has occurred with all four medicines. The ibrutinib label gives a similar list of signs to report (severe headache, blood in stools or urine, prolonged or uncontrolled bleeding).",
      source: "label-calquence",
      quote: "Tell your healthcare provider right away if you have any signs or symptoms of bleeding, including:",
    },
    {
      action: "After serious bleeding or a serious arrhythmia, withhold, reduce or stop the BTK inhibitor as its label directs; zanubrutinib is stopped after any bleeding inside the skull",
      why: "Each label sets its own rule for restarting at a lower dose or stopping for good.",
      source: "label-brukinsa",
      quote: "Discontinue BRUKINSA if intracranial hemorrhage of any grade occurs.",
    },
    {
      action: "Keep a ventricular arrhythmia in mind when someone on a BTK inhibitor has new light-headedness, palpitations or fainting, and arrange urgent cardiology review if one is suspected",
      why: "Ventricular arrhythmias have been reported with BTK inhibitors, and the ibrutinib label warns of sudden death, including in people without known heart disease. This consensus was funded by AstraZeneca.",
      source: "anz-2025",
      quote: "An urgent cardiology review is required if VT is suspected at any time.",
    },
  ],
  bestInClass: {
    statement: "The 2022 ESC cardio-oncology guideline is the only independent graded guideline read; its BTK inhibitor recommendations are Level B or C, and its atrial fibrillation recommendations are Level C apart from the one preferring direct oral anticoagulants (Level B). The four labels agree on monitoring for arrhythmia and bleeding and on considering a 3 to 7 day pause either side of surgery. The most detailed management advice comes from two consensus statements (international, 2022; Australia and New Zealand, 2025) that were both funded by AstraZeneca, the maker of acalabrutinib, and should be read with that in mind. Differences shown here: Choice of drug: ESC says there are not enough data to set different monitoring for ibrutinib and acalabrutinib; both consensus statements prefer acalabrutinib or zanubrutinib in people with cardiovascular disease. Time off around procedures: the labels say to consider 3 to 7 days before and after surgery; ESC says to interrupt ibrutinib 3 to 7 days before invasive procedures; the Australia and New Zealand consensus sets 3 days before and after a minor procedure and 7 days for a major one (Class IIa, Level C). Anticoagulant: ESC says a direct oral anticoagulant should be considered in preference to low molecular weight heparin and vitamin K antagonists in people without a high bleeding risk, significant drug interactions or severe renal dysfunction (Class IIa, Level B), and notes that their use in cancer is limited by drug interactions; the Australia and New Zealand consensus says to avoid warfarin if possible (Class IIb, Level C) and switch to a direct oral anticoagulant, preferably apixaban (Class IIa, Level C); the international consensus calls warfarin less preferred and says the data do not clearly support a single approach. Blood pressure medicine: ESC recommends an ACE inhibitor or ARB first for cancer therapy-related hypertension in general, while the international consensus reports an unconfirmed signal from the FLAIR trial linking ACE inhibitor use at entry with sudden cardiac death on ibrutinib, asks for close monitoring, and lists a medicine other than an ACE inhibitor in the first instance for new hypertension; the Australia and New Zealand consensus leaves the choice to local blood pressure guidelines and says medicines that interact with CYP3A4, such as diltiazem and verapamil, should generally be avoided (Class IIa, Level C).",
    sources: ["esc-2022", "awan-2022", "anz-2025", "label-imbruvica", "label-calquence", "label-brukinsa", "label-jaypirca"],
  },
  variants: [
    {
      name: "Preferring acalabrutinib or zanubrutinib in people with heart disease (consensus statements funded by AstraZeneca)",
      differs: "Uses a second-generation BTK inhibitor rather than ibrutinib in people with established cardiovascular disease, controlled atrial fibrillation or high cardiovascular risk; avoids BTK inhibitors, especially ibrutinib, after ventricular arrhythmia or cardiac arrest; and treats active heart failure as a relative contraindication.",
      evidence: "ELEVATE-RR (acalabrutinib against ibrutinib in previously treated CLL, as reported in the international consensus): atrial fibrillation of any grade in 16 per cent on ibrutinib and 9 per cent on acalabrutinib. ESC notes that grade 3 or higher atrial fibrillation, and atrial fibrillation in people aged 75 or over or with previous atrial fibrillation, were comparable between the groups. Both consensus statements were funded by AstraZeneca, the maker of acalabrutinib; the international one states that all authors received funding from AstraZeneca for the work and thanks a named person at a company for assistance in preparing the manuscript.",
      sources: ["awan-2022", "anz-2025", "esc-2022"],
    },
    {
      name: "Time off around procedures",
      differs: "Labels: consider withholding for 3 to 7 days before and after surgery (ibrutinib: at least 3 to 7 days). ESC: interrupt ibrutinib 3 to 7 days before invasive procedures, and consider platelet transfusion for emergency interventions. Australia and New Zealand consensus: 3 days before and after a minor procedure, 7 days before and after a major one.",
      evidence: "Label wording and consensus (Class IIa, Level C in the Australia and New Zealand statement). None of the sources read cites a trial comparing durations.",
      sources: ["label-imbruvica", "label-calquence", "label-brukinsa", "label-jaypirca", "esc-2022", "anz-2025"],
    },
    {
      name: "Anticoagulant choice in atrial fibrillation",
      differs: "Australia and New Zealand consensus: avoid warfarin if possible, switch to a direct oral anticoagulant, preferably apixaban because it has the fewest interactions, and consider a reduced dose if bleeding risk is high; warfarin remains necessary for mechanical heart valves. International consensus: warfarin is less preferred, and the data do not clearly support a single approach between stopping the BTK inhibitor and anticoagulating, or pausing and restarting once atrial fibrillation is controlled. ESC: follow the general atrial fibrillation guideline, using the T (thrombotic risk), B (bleeding risk), I (interactions), P (patient access and preferences) approach; a direct oral anticoagulant should be considered in preference to low molecular weight heparin and vitamin K antagonists in people without a high bleeding risk, significant drug interactions or severe renal dysfunction, and vitamin K antagonists remain the only anticoagulants indicated with a mechanical valve or moderate to severe mitral stenosis.",
      evidence: "The ibrutinib label reports major haemorrhage in 3.1 per cent of patients without antiplatelet or anticoagulant therapy, 4.4 per cent with antiplatelet therapy and 6.1 per cent with anticoagulant therapy. ESC grades its preference for direct oral anticoagulants Class IIa, Level B and says they have not been tested for atrial fibrillation in a dedicated randomised trial in people with cancer. None of the sources read cites a randomised trial of an anticoagulant given with a BTK inhibitor.",
      sources: ["anz-2025", "awan-2022", "esc-2022", "label-imbruvica"],
    },
    {
      name: "Dose rules after an arrhythmia: the labels",
      differs: "Ibrutinib: interrupt until the problem has improved to grade 1 or baseline; after a first grade 3 arrhythmia weigh benefit against risk and restart at a reduced dose, stop after a second, and stop after any grade 4 arrhythmia or grade 3 or 4 cardiac failure; grade 2 cardiac failure has its own stepped reductions. Pirtobrutinib: reduce, withhold or stop by severity. Zanubrutinib: monitor for symptoms, manage appropriately and consider the risks and benefits of continuing. Acalabrutinib: monitor for symptoms and manage as appropriate.",
      evidence: "Regulatory labels, not graded.",
      sources: ["label-imbruvica", "label-jaypirca", "label-brukinsa", "label-calquence"],
    },
  ],
  grades: [
    { claim: "Blood pressure measured at every clinical visit on BTK inhibitors", grade: "Class I, Level B", source: "esc-2022" },
    { claim: "Weekly home blood pressure for the first 3 months and monthly thereafter", grade: "Class IIa, Level C", source: "esc-2022" },
    { claim: "Baseline echocardiography in high-risk patients scheduled to receive BTK inhibitors", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "Transthoracic echocardiography in all patients who develop atrial fibrillation on a BTK inhibitor", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "Pulse check or ECG rhythm strip for atrial fibrillation at every clinical visit on a BTK inhibitor", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "CHA2DS2-VASc score for stroke risk, bearing in mind it may underestimate risk in cancer", grade: "Class IIa, Level C", source: "esc-2022" },
    { claim: "Long-term anticoagulation at a CHA2DS2-VASc score of 2 or more in men or 3 or more in women", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "Long-term anticoagulation should be considered at a CHA2DS2-VASc score of 1 in men or 2 in women", grade: "Class IIa, Level C", source: "esc-2022" },
    { claim: "A direct oral anticoagulant should be considered in preference to low molecular weight heparin and vitamin K antagonists, in people without a high bleeding risk, significant drug interactions or severe renal dysfunction and excluding mechanical heart valves and moderate to severe mitral stenosis", grade: "Class IIa, Level B", source: "esc-2022" },
    { claim: "Rate control, preferably with beta-blockers, should be considered for well-tolerated atrial fibrillation during active cancer treatment", grade: "Class IIa, Level C", source: "esc-2022" },
    { claim: "Reassessment of thromboembolic and bleeding risk during follow-up", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "ESC: not enough data to set different monitoring for ibrutinib and acalabrutinib", grade: "Guideline text; not graded", source: "esc-2022", quote: "Therefore, we currently do not have enough data to establish different monitoring strategies in patients treated with these drugs." },
    { claim: "Baseline history, blood pressure, pulse and 12-lead ECG for everyone before a BTK inhibitor (statement funded by AstraZeneca)", grade: "Class I, Level B", source: "anz-2025" },
    { claim: "Avoid antiplatelet therapies and other agents that increase bleeding where possible (statement funded by AstraZeneca)", grade: "Class I, Level C", source: "anz-2025" },
    { claim: "Dual antiplatelet therapy generally avoided (statement funded by AstraZeneca)", grade: "Class IIb, Level C", source: "anz-2025", quote: "Dual anti‐platelet therapy should generally be avoided wherever possible, given the limited data on safety and the increased risk of bleeding." },
    { claim: "Withhold for 3 days either side of a minor procedure and 7 days either side of a major one (statement funded by AstraZeneca)", grade: "Class IIa, Level C", source: "anz-2025", quote: "Withhold the BTKi for 3 days before and 3 days after a minor procedure (or 7 days before and after a major procedure) because of an increased periprocedural bleeding risk." },
    { claim: "Avoid warfarin if possible (Class IIb, Level C); switch to a direct oral anticoagulant, preferably apixaban (Class IIa, Level C) (statement funded by AstraZeneca)", grade: "Class IIb, Level C and Class IIa, Level C", source: "anz-2025" },
    { claim: "Initial rate control with beta-blockers is acceptable (statement funded by AstraZeneca)", grade: "Consensus text; not graded", source: "anz-2025", quote: "In general, an initial strategy of rate control with beta blockers is acceptable." },
    { claim: "Warfarin is less preferred with BTK inhibitors (statement funded by AstraZeneca)", grade: "Consensus text; not graded", source: "awan-2022", quote: "Clinical trials routinely exclude warfarin, and warfarin is less preferred in patients receiving BTKis" },
    { claim: "An echocardiogram can be considered for people at high cardiovascular risk or with established cardiovascular disease (statement funded by AstraZeneca)", grade: "Consensus text; not graded", source: "awan-2022", quote: "Beyond these basic measures, an echocardiogram can be considered for patients with high CV risk or established CV disease." },
    { claim: "Pretreatment history, examination, ECG and blood pressure for everyone (statement funded by AstraZeneca)", grade: "Consensus text; not graded", source: "awan-2022", quote: "The pretreatment workup for all patients should include a comprehensive patient history and targeted CV examination, including an electrocardiogram (ECG) and a blood pressure measurement to identify the main risk factors present, including AF and HTN" },
    { claim: "Ibrutinib: fatal and serious arrhythmias, cardiac failure and sudden death", grade: "Regulatory label; not graded", source: "label-imbruvica", quote: "Fatal and serious cardiac arrhythmias and cardiac failure have occurred with IMBRUVICA." },
    { claim: "Ibrutinib: evaluate cardiac history and function at baseline", grade: "Regulatory label; not graded", source: "label-imbruvica", quote: "Evaluate cardiac history and function at baseline, and monitor patients for cardiac arrhythmias and cardiac function." },
    { claim: "Ibrutinib: monitor blood pressure and start or adjust blood pressure medicine", grade: "Regulatory label; not graded", source: "label-imbruvica", quote: "Monitor blood pressure in patients treated with IMBRUVICA, initiate or adjust anti-hypertensive medication throughout treatment with IMBRUVICA as appropriate, and follow dosage modification guidelines for Grade 3 or higher hypertension" },
    { claim: "Ibrutinib: signs of bleeding for patients to report", grade: "Regulatory label; not graded", source: "label-imbruvica", quote: "Inform patients of the possibility of bleeding, and to report any signs or symptoms (severe headache, blood in stools or urine, prolonged or uncontrolled bleeding)." },
    { claim: "Ibrutinib: consider withholding for at least 3 to 7 days before and after surgery", grade: "Regulatory label; not graded", source: "label-imbruvica", quote: "Consider the benefit-risk of withholding IMBRUVICA for at least 3 to 7 days pre- and post-surgery depending upon the type of surgery and the risk of bleeding" },
    { claim: "Pirtobrutinib: consider withholding for 3 to 7 days before and after surgery", grade: "Regulatory label; not graded", source: "label-jaypirca", quote: "Consider the benefit-risk of withholding JAYPIRCA for 3 to 7 days pre- and post-surgery depending upon the type of surgery and risk of bleeding." },
    { claim: "Zanubrutinib: consider withholding for 3 to 7 days before and after surgery", grade: "Regulatory label; not graded", source: "label-brukinsa", quote: "Consider the benefit-risk of withholding BRUKINSA for 3-7 days before and after surgery depending upon the type of surgery and the risk of bleeding." },
  ],
  sources: [
    {
      key: "esc-2022",
      label: "2022 ESC Guidelines on cardio-oncology developed in collaboration with the European Hematology Association (EHA), the European Society for Therapeutic Radiology and Oncology (ESTRO) and the International Cardio-Oncology Society (IC-OS)",
      publisher: "European Society of Cardiology (European Heart Journal); read from the published PDF held by an institutional repository",
      year: 2022,
      url: "https://doi.org/10.1093/eurheartj/ehac244",
      doi: "10.1093/eurheartj/ehac244",
      gradingScheme: "Class of recommendation I (recommended), IIa (should be considered), IIb (may be considered), III (not recommended); level of evidence A (multiple randomised trials or meta-analyses), B (one randomised trial or large non-randomised studies), C (expert consensus or small studies).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "awan-2022",
      label: "International consensus statement on the management of cardiovascular risk of Bruton's tyrosine kinase inhibitors in CLL (funded by AstraZeneca; all authors received funding from AstraZeneca for the work)",
      publisher: "Blood Advances (Awan et al.); project funded by AstraZeneca",
      year: 2022,
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9631706/",
      doi: "10.1182/bloodadvances.2022007938",
      gradingScheme: "Expert panel consensus; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "label-imbruvica",
      label: "IMBRUVICA (ibrutinib) capsules, tablets and oral suspension: US prescribing information (label revised October 2025)",
      publisher: "Pharmacyclics and Janssen, on DailyMed (US National Library of Medicine)",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0dfd0279-ff17-4ea9-89be-9803c71bab44",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-calquence",
      label: "CALQUENCE (acalabrutinib) tablets: US prescribing information with patient information (label revised February 2026)",
      publisher: "AstraZeneca, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b1409184-3267-4d8c-8f17-4e01f69828b1",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-brukinsa",
      label: "BRUKINSA (zanubrutinib) capsules and tablets: US prescribing information (label revised July 2026; published on DailyMed September 2026)",
      publisher: "BeOne Medicines, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3e08fe23-d70e-424c-bc51-1222e320f902",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-jaypirca",
      label: "JAYPIRCA (pirtobrutinib) tablets: US prescribing information (label revised October 2026)",
      publisher: "Eli Lilly, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bd551845-0878-49a4-860f-839b83f6b801",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "esmo-cll-2024",
      label: "ESMO Clinical Practice Guideline interim update on new targeted therapies in the first line and at relapse of chronic lymphocytic leukaemia",
      publisher: "ESMO (Annals of Oncology)",
      year: 2024,
      url: "https://doi.org/10.1016/j.annonc.2024.06.016",
      doi: "10.1016/j.annonc.2024.06.016",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  upgrades: [],
  gaps: [
    "The two consensus statements that give the most detailed advice (on choice of BTK inhibitor, anticoagulant and time off around procedures) were both funded by AstraZeneca, which makes acalabrutinib. The independent ESC guideline is less specific and says the data do not yet support different monitoring for ibrutinib and acalabrutinib.",
    "The ESMO guideline on chronic lymphocytic leukaemia (2024 interim update) could not be read, and on 17 November 2026 it still could not: it is not in PubMed Central and the journal site returned 403 to a script. The iwCLL guidelines were not sought. What either says about cardiac risk and the choice of BTK inhibitor is not given here.",
    "The ESC recommendation tables on BTK inhibitors and on atrial fibrillation were first read in part, from archived images. On 17 November 2026 both were read whole from the published PDF, and the classes and levels for pulse checks, the choice of anticoagulant and rate control are now given. The ESC atrial fibrillation recommendations are written for people with cancer in general, not for people on a BTK inhibitor, and ESC gives no graded recommendation on which anticoagulant to use with one.",
    "None of the clinical sources read says how quickly a patient should seek help or sets out when to call an ambulance. The wording here on reporting bleeding and heart symptoms straight away follows the patient information in the acalabrutinib label; the ibrutinib label says to report the same symptoms without a time.",
    "A further set of practical recommendations for haematologists on the cardiovascular toxicities of BTK inhibitors in chronic lymphocytic leukaemia was published in the journal Cardio-Oncology in 2025 (doi 10.1186/s40959-025-00394-7). It was found on 17 November 2026 and has not been read; nothing here rests on it.",
    "None of the sources read cites a randomised trial of an anticoagulant, a rate-control medicine or a length of pause around surgery in people on BTK inhibitors. The 3 to 7 day range in the labels is to be considered against the bleeding risk of the procedure; none of the sources read says when a longer or shorter pause is right for a given operation.",
    "Whether acalabrutinib, zanubrutinib or pirtobrutinib carry the risk of ventricular arrhythmia and sudden death reported with ibrutinib is not settled: their labels report grade 3 or higher ventricular arrhythmias in 0.5 per cent (acalabrutinib) and 0.3 per cent (zanubrutinib) of trial patients, and the international consensus says the risk of the newer drugs is not yet known.",
    "The international consensus reports an association in the FLAIR trial between ACE inhibitor use at entry and sudden cardiac death on ibrutinib with rituximab, calls the data immature and asks for confirmation. Its table on new hypertension lists a medicine other than an ACE inhibitor in the first instance, while ESC recommends an ACE inhibitor or ARB first for people with cancer in general (Class I, Level B); the sources read do not resolve the difference.",
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

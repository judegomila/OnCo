import { protocol } from "./helpers";

/*
 * Breathlessness and cough during anticancer drug treatment in adults: what is excluded first, the product rules the
 * labels set for belzutifan, dasatinib, carfilzomib, pazopanib, sotorasib, adagrasib, zenocutuzumab, atezolizumab and
 * durvalumab, and how the symptom itself is eased.
 *
 * Written 18 November 2026. Every source was read as raw text that day; every quote was checked by script against
 * the saved text (whitespace and line breaks normalised, nothing else). Saved texts and a per-source list are in
 * /tmp/se-protocols-2/breath/ (text/<key>.txt and SOURCES.md).
 *
 * What was read, and how:
 * - ESMO Clinical Practice Guidelines, management of breathlessness in patients with cancer (Hui et al., ESMO Open
 *   2020, doi 10.1136/esmoopen-2020-001038, resolved through Crossref, title checked): full text, Europe PMC
 *   full-text XML (PMC7733213), tags and citation cross-references stripped. Its supplement (assessment tools,
 *   treatment of underlying causes, the grading table) was not read. A Crossref search for a later ESMO breathlessness
 *   guideline found none; the paper itself says it supersedes the 2015 version.
 * - ASCO guideline, management of dyspnea in advanced cancer (Hui et al., J Clin Oncol 2021, doi 10.1200/JCO.20.03465,
 *   resolved through Crossref): ABSTRACT ONLY, from the Europe PMC core record. See "not readable" below.
 * - CHEST guideline and expert panel report, symptomatic treatment of cough among adult patients with lung cancer
 *   (Molassiotis et al., Chest 2017, doi 10.1016/j.chest.2016.12.028, found through Europe PMC by title; a DOI
 *   recalled from memory resolved to a different Chest paper and was discarded): full text, the PubMed Central page
 *   (PMC6026217) fetched with curl and stripped to text, because the Europe PMC full-text endpoint returned 503.
 *   The page carries a notice that the article was corrected (Chest 2017;152(5):1095); the correction, which
 *   Europe PMC titles as a correction to the endorsement, could not be fetched (HTTP 500).
 * - US prescribing information, DailyMed SPL XML through the v2 API, tags stripped. SPL version dates: Welireg
 *   24 September 2026 (revised 09/2026), Sprycel 16 October 2026, Votrient 16 December 2025, Lumakras 3 November
 *   2026 (revised 01/2025), Tecentriq 13 October 2026 (revised 10/2026), Imfinzi 31 August 2026 (revised 05/2026),
 *   Kyprolis 18 June 2025, Krazati 31 August 2026 (revised 08/2026), Bizengri 19 May 2026 (revised 05/2026).
 * - EU product information (SmPC and package leaflet), the EMA EPAR PDFs through pdftotext -layout. The PDFs print
 *   no revision date; their file dates are Welireg 30 September 2026, Sprycel 22 September 2026, Votrient 17 October
 *   2025, Lumykras 1 October 2026, Tecentriq 27 March 2026, Imfinzi 21 September 2026, Kyprolis 17 July 2026,
 *   Krazati 8 July 2026.
 * - Macmillan Cancer Support "Breathlessness" (reviewed 1 March 2024) and Cancer Research UK "Cancer and shortness
 *   of breath" (last reviewed 10 August 2026): the public pages, fetched with curl and stripped to text.
 *
 * Not readable on 18 November 2026:
 * - The ASCO 2021 full text: ascopubs.org returned 403 to a script for both the HTML and the PDF, Europe PMC holds no
 *   full text, and a request to the Internet Archive was refused by the permission system and not retried. So no ASCO
 *   recommendation is quoted with its type, evidence quality or strength; the page says only what the abstract says.
 * - EU product information for zenocutuzumab: the EMA address pattern used for the other products returned 404, so
 *   only the US label was read. Whether the product is authorised in the EU was not established.
 *
 * Second reader, 18 November 2026. Re-fetched independently and converted the same way: the ESMO full text (Europe
 * PMC XML), the US labels for belzutifan, dasatinib and carfilzomib (DailyMed SPL XML) and the EU product information
 * for the same three (EMA PDFs, pdftotext -layout); all seven texts were byte-identical to the writer's saved copies.
 * The three guideline DOIs were resolved through Crossref and their titles checked; a Europe PMC title search found no
 * later ESMO, ASCO or CHEST edition. The other sources were read from the writer's saved texts of the same day.
 * PubMed Central answered the second reader with a browser check, so the CHEST text was checked on the writer's copy
 * and its correction notice stays unread. The ASCO free PDF address listed by Europe PMC returned 403; ASCO remains
 * abstract only. About 150 claims were checked; all 27 quotes were verbatim and every ESMO and CHEST grade sits on its
 * own sentence. Corrected: the dasatinib US label was said to ask for no dose change while the cause is sought, when
 * its fluid retention warning asks for a prompt chest x-ray for new dyspnoea or dry cough and says to consider dose
 * reduction or interruption; the belzutifan EU table was shown as grade-only when it defines grade 3 by the same 88%
 * resting reading as the US label; the oxygen step was an order where ESMO says "not recommended" and allows a trial;
 * the fan in the best-practice statement and the CHEST step-up were softened to "consider" and "suggests"; the ESMO
 * grading-scheme line now says its defining table was not read.
 *
 * Funding: ESMO states no external funding; CHEST states it was the sole supporter of its guideline. Labels and
 * SmPCs are regulatory texts written by the marketing authorisation holders and approved by the regulator.
 */
export const breathlessnessAndCoughDuringAnticancerTreatment = protocol({
  id: "breathlessness-and-cough-during-anticancer-treatment",
  name: "Breathlessness and cough during anticancer drug treatment: what is excluded first and how the symptom is eased",
  aka: ["dyspnoea on cancer treatment", "shortness of breath on anticancer drugs", "cough on immunotherapy", "cough on sotorasib", "belzutifan hypoxia", "low oxygen on Welireg", "dasatinib pulmonary arterial hypertension", "carfilzomib dyspnoea", "pazopanib pneumothorax", "treatment-emergent dyspnea"],
  domain: "symptom-management",
  tldr: "A new or worse cough or breathlessness during cancer drug treatment should be reported straight away. Your team first looks for a cause that can be treated, such as infection, a clot, fluid, anaemia or lung inflammation from the drug. Some drugs have their own rules for pausing or stopping. A hand-held fan, breathing techniques and sometimes low-dose morphine can ease breathlessness that remains.",
  simple: "If you get a new cough or feel more out of breath during cancer treatment, tell your cancer team straight away. They will look for the cause and treat it. Some medicines need to be paused. There are also ways to make breathing feel easier.",
  summary: "Scope. This page joins three kinds of source that answer different questions. The product labels say what to do about a breathing symptom on a named drug. The ESMO 2020 guideline covers breathlessness in patients with cancer in general, and the ASCO 2021 guideline covers dyspnoea in adults with advanced cancer; neither is written for a side effect of a particular drug. The CHEST 2017 guideline covers cough in adults with lung cancer that persists despite cancer treatment. Local protocols come first.\n\nCause first. ESMO: clinicians should identify and treat any potentially reversible condition contributing to breathlessness (II, A*); its table lists anaemia, asthma or COPD, heart failure, pleural and pericardial effusion, pneumonia, pulmonary embolism, superior vena cava syndrome, and pulmonary toxicity from chemotherapy or immunotherapy (withhold treatment and consider corticosteroids).\n\nProduct rules read. Atezolizumab and durvalumab (US labels): in suspected immune-mediated reactions, start a workup to exclude alternative causes, including infection; pneumonitis is then managed by grade (see the pneumonitis protocol). Sotorasib (US label and EU SmPC): immediately withhold for suspected ILD or pneumonitis and permanently discontinue if no other cause is identified. Adagrasib (US label): withhold, without the word immediately; the EU SmPC has no ILD warning and lists pneumonitis as a common adverse reaction. Zenocutuzumab (US label): immediately withhold, corticosteroids as clinically indicated, permanently discontinue for confirmed grade 2 or higher. Belzutifan: monitor oxygen saturation before and periodically during treatment; the US label acts on a pulse oximeter reading below 88% with exercise (consider withholding) or at rest (withhold), the EU SmPC on CTCAE grade, with grade 3 defined by the same resting reading (grade 3 without symptoms: consider supplemental oxygen and continuing or withholding). Dasatinib: the EU SmPC asks that dyspnoea and fatigue be evaluated for pleural effusion, pulmonary oedema, anaemia or lung infiltration, with the dose reduced or interrupted meanwhile, and that pulmonary arterial hypertension be considered if nothing is found; the US label asks for a prompt chest x-ray or other imaging for symptoms of pleural effusion such as new or worsened dyspnoea or dry cough; both labels stop dasatinib permanently if it is confirmed. Carfilzomib (both): evaluate dyspnoea to exclude cardiac failure and pulmonary syndromes, and stop for grade 3 or 4 until resolved. Pazopanib: the EU SmPC asks for close observation for pneumothorax; the US label reports it in 3.3% of people in the sarcoma trial and gives no instruction beyond counselling.\n\nSymptom. ESMO: consider a hand-held fan (II, B), teach breathing techniques, pacing and positions (II, B), palliative oxygen is not recommended at a resting SpO2 of 90% or more (II, D), regular low-dose oral morphine is the first-line drug for severe chronic breathlessness that persists despite non-drug measures (II, B), and benzodiazepines should not be first-line (III, D). The ASCO abstract agrees on the order and says systemic opioids should be offered when non-drug measures give inadequate relief. CHEST, for cough in lung cancer: assess for co-existing causes, then cough suppression exercises, a demulcent linctus, then an opioid derivative (Grade 2C).",
  asOf: "2026-11-18",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor", "pharmacist"],
    where: ["telephone-triage", "acute-oncology-service", "outpatient-clinic", "chemotherapy-day-unit", "emergency-department", "ward", "home"],
  },
  population: "Adults having an anticancer drug who develop a new or worsening cough, breathlessness or low oxygen level. The product rules are those of the US and EU labels read for belzutifan, dasatinib, carfilzomib, pazopanib, sotorasib, adagrasib, atezolizumab and durvalumab, and of the US label only for zenocutuzumab. The symptom advice comes from guidelines with wider or different populations: ESMO 2020 (patients with cancer, drawing on studies in COPD and other diseases), ASCO 2021 (adults with advanced cancer; abstract only) and CHEST 2017 (adults with lung cancer whose cough persists despite cancer treatment). Not covered: the graded management of pneumonitis or interstitial lung disease, pleural effusion, blood clots in the lung, superior vena cava obstruction and infusion reactions, which have their own pages; radiation pneumonitis; children.",
  trigger: "A new or worsening cough, breathlessness, chest pain, or a fall in oxygen saturation in someone on an anticancer drug, reported by the patient or found at a clinic check.",
  steps: [
    {
      action: "Before treatment starts, advise the patient to contact the team immediately about any new or worsening cough, chest pain or shortness of breath",
      why: "This is the counselling the US labels for atezolizumab and durvalumab ask for, because these drugs can cause pneumonitis. The US labels for adagrasib and zenocutuzumab ask the same for new or worsening respiratory symptoms, and the belzutifan label for signs of low oxygen. Macmillan tells patients to contact their doctor straight away if breathlessness is a new symptom, if it hurts to breathe, or if breathlessness gets worse quickly.",
      source: "us-tecentriq",
      quote: "Advise patients to contact their healthcare provider immediately for any new or worsening cough, chest pain, or shortness of breath",
    },
    {
      action: "Ask about breathlessness at clinic visits with a simple number scale, and ask which activities the person has stopped or cut down because of it",
      why: "ESMO explains that breathlessness is easily overlooked in someone sitting at rest, because people avoid the activity that brings it on, so the answer to 'are you short of breath' is often no. ESMO asks for this screening at every inpatient and outpatient encounter for patients with cancer; it is not a rule written for a particular drug.",
      source: "esmo-2020",
      quote: "Routine screening for breathlessness should include a unidimensional scale of choice and activities that patients have stopped or reduced because of breathlessness",
      grade: "III, B*",
    },
    {
      action: "Identify and treat any potentially reversible cause before treating the symptom alone",
      why: "ESMO says breathlessness may be related to cancer progression, cancer therapies or acute complications such as infections or pulmonary embolism, and that existing conditions such as COPD and heart failure may add to it. Its table of treatable conditions also lists anaemia, pleural and pericardial effusion, pneumonia, superior vena cava syndrome, and lung toxicity from chemotherapy or immunotherapy, for which it says to withhold treatment and consider corticosteroids.",
      source: "esmo-2020",
      quote: "Clinicians should identify and treat any potentially reversible condition(s) contributing to breathlessness",
      grade: "II, A*",
    },
    {
      action: "On a checkpoint inhibitor such as atezolizumab or durvalumab, treat a new or worsening cough or breathlessness as possible pneumonitis: start a workup to exclude other causes, including infection, and follow the pneumonitis protocol",
      why: "The US labels for both drugs say they can cause immune-mediated pneumonitis and give this instruction for any suspected immune-mediated reaction. The EU SmPC for atezolizumab says causes other than immune-mediated pneumonitis should be ruled out. Cough is listed as a very common adverse reaction of both drugs in the EU SmPCs, so not every cough is pneumonitis; the labels read give no rule for telling the two apart other than the workup.",
      source: "us-tecentriq",
      quote: "In cases of suspected immune-mediated adverse reactions, initiate appropriate workup to exclude alternative etiologies, including infection.",
    },
    {
      action: "On sotorasib, immediately withhold the drug when interstitial lung disease or pneumonitis is suspected, and permanently discontinue it if no other cause is identified",
      why: "The US label reports ILD or pneumonitis in 2.2% of people, with one fatal case, and names dyspnoea, cough and fever as the symptoms to monitor for; it also lists cough among the most common adverse reactions. The EU SmPC gives the same rule. For adagrasib the US label says withhold (without 'immediately') and permanently discontinue if no other cause is identified; the EU SmPC for adagrasib has no warning on the subject. For zenocutuzumab the US label says immediately withhold, give corticosteroids as clinically indicated, and permanently discontinue if grade 2 or higher is confirmed. The interstitial lung disease protocol covers what follows.",
      source: "us-lumakras",
      quote: "Immediately withhold LUMAKRAS in patients with suspected ILD/pneumonitis and permanently discontinue LUMAKRAS if no other potential causes of ILD/pneumonitis are identified",
    },
    {
      action: "On belzutifan, check oxygen saturation before treatment starts and periodically throughout treatment",
      why: "The US label says belzutifan can cause severe hypoxia that may require discontinuation, supplemental oxygen or hospitalisation. The EU SmPC asks for the same monitoring and names pulse oximetry as the method. Neither label states how often 'periodically' is.",
      source: "us-welireg",
      quote: "Monitor oxygen saturation before initiation of, and periodically throughout, treatment with WELIREG.",
    },
    {
      action: "On belzutifan, withhold the drug for low oxygen saturation at rest until it has resolved, then resume at a reduced dose or discontinue; permanently discontinue for life-threatening hypoxia or recurrent symptomatic hypoxia (US label)",
      why: "The US label defines low saturation by example as a pulse oximeter reading below 88% or a PaO2 of 55 mm Hg or less, and for a fall with exercise only says to consider withholding until the reading with exercise is above 88%. The EU SmPC is organised by CTCAE grade and symptoms instead, and its table gives the same example for grade 3 (a pulse oximeter reading below 88% or a PaO2 of 55 mm Hg or less at rest): for grade 3 hypoxia without symptoms, giving supplemental oxygen and continuing or withholding should be considered; for grade 3 with symptoms, withhold, treat the hypoxia and resume at a reduced dose; if symptomatic hypoxia keeps recurring, discontinue; for grade 4, permanently discontinue. Neither label gives a reason for its thresholds.",
      source: "us-welireg",
      quote: "For life-threatening hypoxia or for recurrent symptomatic hypoxia, permanently discontinue WELIREG",
    },
    {
      action: "On dasatinib, evaluate new breathlessness and fatigue for the common causes (pleural effusion, pulmonary oedema, anaemia, lung infiltration), and reduce the dose or interrupt treatment during the evaluation (EU SmPC)",
      why: "This is the EU SmPC's rule. The US label has no single sequence. Under pulmonary arterial hypertension it asks for evaluation for signs and symptoms of underlying cardiopulmonary disease before and during treatment. Under fluid retention it asks that symptoms of pleural effusion or other fluid retention, such as new or worsened dyspnoea on exertion or at rest, pleuritic chest pain or dry cough, be evaluated promptly with a chest x-ray or other imaging as appropriate, and says to consider dose reduction or treatment interruption. Pleural effusion on dasatinib has its own page.",
      source: "ema-sprycel",
      quote: "Patients who develop dyspnoea and fatigue after initiation of therapy should be evaluated for common etiologies including pleural effusion, pulmonary oedema, anaemia, or lung infiltration.",
    },
    {
      action: "On dasatinib, if no explanation is found or there is no improvement after the dose is reduced or interrupted, consider pulmonary arterial hypertension; if it is confirmed, stop dasatinib for good",
      why: "Both labels say pulmonary arterial hypertension has been reported at any time after starting, including after more than a year of treatment, and that it may improve after dasatinib is stopped. The US label lists dyspnoea, fatigue, hypoxia and fluid retention as how it shows itself and gives the same permanent stop. The EU SmPC describes the reported cases as confirmed by right heart catheterisation and leaves the diagnostic approach to standard practice guidelines.",
      source: "ema-sprycel",
      quote: "If no explanation is found, or if there is no improvement with dose reduction or interruption, the diagnosis of PAH should be considered. The diagnostic approach should follow standard practice guidelines. If PAH is confirmed, dasatinib should be permanently discontinued.",
    },
    {
      action: "On carfilzomib, evaluate breathlessness to exclude heart failure and lung conditions; stop carfilzomib for grade 3 or 4 dyspnoea until it has resolved or returned to baseline, then consider whether to restart",
      why: "The US label reports dyspnoea in 25% of people treated, grade 3 or greater in 4%; the EU SmPC gives the same rule. The two differ on drug-induced lung toxicity (the US label says discontinue; the EU SmPC says stop until resolved and consider restarting on a benefit and risk assessment) and agree on pulmonary hypertension (withhold until resolved or back to baseline, then consider restarting).",
      source: "us-kyprolis",
      quote: "Evaluate dyspnea to exclude cardiopulmonary conditions including cardiac failure and pulmonary syndromes. Stop Kyprolis for Grade 3 or 4 dyspnea until resolved or returned to baseline. Consider whether to restart Kyprolis based on a benefit/risk assessment",
    },
    {
      action: "On pazopanib, observe closely for signs and symptoms of a collapsed lung (pneumothorax), as the EU SmPC asks, and advise the patient to report new breathlessness or chest pain, as the US label asks",
      why: "The EU SmPC says pneumothorax occurred in the trials in advanced soft tissue sarcoma. The US label reports it in 8 of 240 people (3.3%) in the sarcoma trial and 2 of 290 (0.7%) in the kidney cancer trial, has no warning section on it, and asks only that patients be advised to report new onset of dyspnoea, chest pain or localised limb oedema. Neither says how a pneumothorax on pazopanib should be treated or whether the drug should be paused. Separately, both say pazopanib should be discontinued in anyone who develops interstitial lung disease or pneumonitis.",
      source: "ema-votrient",
      quote: "Patients on pazopanib treatment should be observed closely for signs and symptoms of pneumothorax.",
    },
    {
      action: "For breathlessness that remains, consider a hand-held fan directed at the face, and explain how it may help",
      why: "ESMO's panel supports a fan whatever the oxygen saturation, given its potential benefit and lack of harm, and describes the experimental evidence as limited: six of ten studies reported a significant improvement. The ASCO abstract says airflow interventions such as a fan directed at the cheek may be offered. ESMO writes for patients with cancer and ASCO for advanced cancer; neither tested a fan for a drug side effect.",
      source: "esmo-2020",
      quote: "Consider use of a hand-held fan directed to the face and inform patients of the potential mechanisms and benefit. This may be useful alone in people without hypoxaemia, or as an adjunct to those requiring oxygen supplementation for hypoxaemia",
      grade: "II, B",
    },
    {
      action: "Teach activity pacing, positions that ease breathing and distraction techniques, and advise on breathing retraining or refer to a physiotherapist",
      why: "ESMO says patients should be assured that being breathless is itself not dangerous and that it settles with rest, and describes leaning forward, relaxed sitting and high side lying as positions often recommended. Breathing retraining carries the same grade in a separate ESMO recommendation.",
      source: "esmo-2020",
      quote: "Educate and inform patients on strategies including activity pacing, relieving positions and distraction techniques to encourage self-management",
      grade: "II, B",
    },
    {
      action: "Keep oxygen for people whose oxygen level is low: ESMO does not recommend palliative oxygen when the resting oxygen saturation is 90% or more, and the ASCO abstract says oxygen may be offered for hypoxaemia",
      why: "ESMO says oxygen has not been consistently shown to relieve breathlessness in people with mild or no hypoxaemia, citing a trial of 239 people in which oxygen was no better than room air over 7 days, and recommends a saturation below 90% as the cut-off for clinically relevant hypoxaemia. It adds that a trial of oxygen could be justified in chronic breathlessness that persists despite other treatments, reviewed within a few days and stopped if the person perceives no benefit. The ASCO abstract says standard supplemental oxygen may be offered for patients with hypoxaemia. These are rules for the symptom; on belzutifan a low reading is a side effect with its own label rules (above).",
      source: "esmo-2020",
      quote: "Palliative oxygen is not recommended in patients with resting SpO2 ≥90%",
      grade: "II, D",
    },
    {
      action: "Where severe chronic breathlessness persists despite non-drug measures, use regular low-dose oral morphine as the first drug treatment, and offer a laxative when it is started (ESMO)",
      why: "ESMO says a starting dose of 10 to 30 mg of scheduled morphine over 24 hours can be used in people who have not had opioids (II, B), adjusted to the person's symptoms, and describes the overall evidence as low: in a Cochrane review opioids lowered breathlessness by 0.8 points on a 0 to 10 scale. The ASCO abstract says systemic opioids should be offered to patients with inadequate relief from non-drug measures, and that support for drug treatments was limited. ESMO says benzodiazepines should not be the first drug because of the risk of sedation and delirium (III, D). Both guidelines address chronic breathlessness; neither addresses a sudden symptom on a new drug, where the cause is sought first.",
      source: "esmo-2020",
      quote: "Regular, oral, low-dose morphine is the first-line pharmacological treatment for severe chronic breathlessness, which persists despite non-pharmacological measures",
      grade: "II, B",
    },
    {
      action: "For a cough in lung cancer that persists despite cancer treatment, first assess for other causes of cough and treat them",
      why: "CHEST suggests this as the first step and gives it no grade. Its guideline covers cough in adults with lung cancer that remains bothersome despite surgery, chemotherapy or radiotherapy; it notes that lung cancer treatments can themselves cause cough and says it focuses on cough beyond anticancer treatments. Its table of causes of cough in people with cancer includes pleural effusion, chest infection, COPD, gastro-oesophageal reflux disease, heart failure, cough after radiation or chemotherapy, and ACE inhibitor medicines. No guideline on cough as a side effect of a targeted drug or immunotherapy was found.",
      source: "chest-2017",
      quote: "In adult patients with cough associated with lung cancer that persists despite cancer treatment, we suggest, as a first step, that a comprehensive assessment according to a published, evidence-based management guideline be undertaken to identify any co-existing causes linked with cough and initiate treatment accordingly",
      grade: "Ungraded, Consensus Based Statement",
    },
    {
      action: "For that cough, consider the step-up CHEST suggests: cough suppression exercises (where available), a demulcent linctus such as simple linctus, then an opioid derivative titrated to acceptable side effects",
      why: "CHEST calls this a step-up approach and describes the evidence as primarily low quality: the review behind it found 17 trials. It suggests cough suppression exercises as an alternative or addition to drugs, a demulcent first because of low cost, some evidence of effect and few side effects, and says opioids are the drugs with most evidence for cough in lung cancer. All three suggestions are graded 2C.",
      source: "chest-2017",
      quote: "In adult patients with lung cancer experiencing cough that does not respond to demulcents, we suggest pharmacological management using an opiate-derivative titrated to an acceptable side-effect profile",
      grade: "Grade 2C",
    },
  ],
  bestInClass: {
    statement: "No guideline that could be found addresses breathlessness or cough as a side effect of an anticancer drug as a subject in its own right. The best-supported approach joins two things. First, the cause: ESMO 2020 asks that any reversible condition be identified and treated (II, A*), and each label read sets its own rule for its drug, which for sotorasib, adagrasib, zenocutuzumab and the checkpoint inhibitors means treating the symptom as possible lung inflammation until other causes are excluded, for belzutifan means measuring oxygen saturation, for dasatinib means looking for effusion, oedema, anaemia and infiltrates and then for pulmonary arterial hypertension, and for carfilzomib means excluding heart failure. Where the US label and the EU SmPC differ (belzutifan, dasatinib, carfilzomib lung toxicity, pazopanib pneumothorax, adagrasib) both are shown. Second, the symptom: ESMO 2020, read in full, asks clinicians to consider a fan (II, B) and recommends self-management and breathing techniques (II, B), exercise-based rehabilitation (I, A), low-dose morphine for severe chronic breathlessness that persists (II, B), no oxygen at a resting saturation of 90% or more (II, D), and referral to a breathlessness service where one exists (I, A). The ASCO 2021 abstract, for advanced cancer, describes the same order: assessment, reversible causes, palliative care referral, non-drug measures, then systemic opioids. For cough, CHEST 2017 is a guideline for lung cancer, with every graded suggestion at 2C.",
    sources: ["esmo-2020", "asco-2021", "chest-2017", "us-welireg", "ema-welireg", "us-sprycel", "ema-sprycel", "us-kyprolis", "ema-kyprolis", "us-lumakras", "ema-lumykras"],
  },
  variants: [
    {
      name: "ESMO 2020 and the ASCO 2021 abstract on easing breathlessness",
      differs: "ESMO, for patients with cancer: consider a fan (II, B); morphine is first-line for severe chronic breathlessness that persists despite non-drug measures (II, B); benzodiazepines should not be first-line (III, D) and may be used with caution for breathlessness with anxiety if opioids are not effective (V, C); palliative oxygen is not recommended at a resting saturation of 90% or more (II, D); corticosteroids may be considered for cancer-related breathlessness refractory to other treatments (II, C). ASCO, for adults with advanced cancer, as far as its abstract goes: airflow interventions such as a fan may be offered; standard supplemental oxygen may be offered for patients with hypoxaemia; systemic opioids should be offered when non-drug measures give inadequate relief; corticosteroids and benzodiazepines are 'also discussed', with no position stated in the abstract. No disagreement is visible in the abstract; the full ASCO recommendations and their strengths were not read.",
      evidence: "ESMO grades as printed above. ASCO: the abstract reports a systematic review of 48 randomised trials and two retrospective cohort studies, and says support for pharmacologic interventions was limited; it prints no grade.",
      sources: ["esmo-2020", "asco-2021"],
    },
    {
      name: "Belzutifan and low oxygen: US label and EU SmPC",
      differs: "The US label is organised by where the low reading occurs: with exercise (pulse oximeter below 88%), consider withholding until the reading with exercise is above 88%, then resume at the same or a reduced dose; at rest (below 88%, or PaO2 55 mm Hg or less) or where urgent intervention is indicated, withhold until resolved and resume at a reduced dose or discontinue; life-threatening or recurrent symptomatic hypoxia, permanently discontinue. The EU SmPC is organised by CTCAE grade and symptoms, with grade 3 defined by the same example as the US label's resting rule (pulse oximeter below 88%, or PaO2 55 mm Hg or less, at rest): grade 3 without symptoms, an option to continue or withhold, with supplemental oxygen to be considered; grade 3 with symptoms, withhold, treat and resume at a dose reduced by 40 mg or discontinue; grade 4, permanently discontinue. The EU SmPC has no separate rule for a fall with exercise only.",
      evidence: "Regulatory labels; not graded. The US label reports hypoxia in 15% of patients in the LITESPARK-005 trial, 10% at grade 3; the EU SmPC reports it in 15% of patients with advanced kidney cancer, 10% at grade 3.",
      sources: ["us-welireg", "ema-welireg"],
    },
    {
      name: "Dasatinib and pulmonary arterial hypertension: US label and EU SmPC",
      differs: "The EU SmPC sets out a sequence: echocardiography at the start in every patient with symptoms of cardiac disease, and considered in those with risk factors for cardiac or pulmonary disease; evaluation of dyspnoea and fatigue for common causes with the dose reduced or interrupted meanwhile; pulmonary arterial hypertension considered if nothing is found or there is no improvement; permanent discontinuation if confirmed. The US label says to evaluate for signs and symptoms of underlying cardiopulmonary disease before and during treatment and to discontinue permanently if pulmonary arterial hypertension is confirmed, without the intermediate steps or any mention of echocardiography. Its separate fluid retention warning asks for a prompt chest x-ray or other imaging for new or worsened dyspnoea, pleuritic chest pain or dry cough, and says to consider dose reduction or treatment interruption.",
      evidence: "Regulatory labels; not graded. The EU SmPC lists pulmonary arterial hypertension as uncommon.",
      sources: ["us-sprycel", "ema-sprycel"],
    },
    {
      name: "Carfilzomib lung toxicity: US label and EU SmPC",
      differs: "For drug-induced pulmonary toxicity (acute respiratory distress syndrome, acute respiratory failure, pneumonitis, interstitial lung disease) the US label says discontinue carfilzomib. The EU SmPC says evaluate and stop until resolved, and consider whether to restart on a benefit and risk assessment. For dyspnoea and for pulmonary hypertension the two give the same rule.",
      evidence: "Regulatory labels; not graded.",
      sources: ["us-kyprolis", "ema-kyprolis"],
    },
    {
      name: "Suspected lung inflammation on KRAS G12C inhibitors and zenocutuzumab",
      differs: "Sotorasib (US and EU): immediately withhold when suspected; permanently discontinue if no other cause is identified. Adagrasib (US): withhold when suspected; permanently discontinue if no other cause is identified. Adagrasib (EU SmPC): no warning or dose rule; pneumonitis is listed as a common adverse reaction. Zenocutuzumab (US): immediately withhold and give corticosteroids as clinically indicated; permanently discontinue if grade 2 or higher is confirmed.",
      evidence: "Regulatory labels; not graded.",
      sources: ["us-lumakras", "ema-lumykras", "us-krazati", "ema-krazati", "us-bizengri"],
    },
  ],
  grades: [
    { claim: "Identify and treat any potentially reversible condition contributing to breathlessness", grade: "II, A*", source: "esmo-2020", quote: "Clinicians should identify and treat any potentially reversible condition(s) contributing to breathlessness" },
    { claim: "A hand-held fan directed to the face", grade: "II, B", source: "esmo-2020" },
    { claim: "Breathing retraining techniques, or referral to a physiotherapist", grade: "II, B", source: "esmo-2020", quote: "Advise patients on relevant breathing retraining techniques and/or refer to specialist services such as a physiotherapist" },
    { claim: "Regular low-dose oral morphine as the first-line drug for severe chronic breathlessness that persists despite non-drug measures", grade: "II, B", source: "esmo-2020" },
    { claim: "A laxative offered to everyone starting an opioid, and an antiemetic as needed", grade: "I, A", source: "esmo-2020", quote: "All patients starting opioids should be offered prophylaxis for constipation with laxatives and, as needed, antiemetics" },
    { claim: "Benzodiazepines not to be used first-line for breathlessness", grade: "III, D", source: "esmo-2020", quote: "Because of significant risk of sedation and delirium, benzodiazepines should not be used for breathlessness as first-line pharmacological therapy" },
    { claim: "Benzodiazepines with caution for breathlessness with anxiety if opioids are not effective", grade: "V, C", source: "esmo-2020", quote: "Benzodiazepines may be used with caution in patients with cancer for the relief of breathlessness with associated anxiety if opioids are not effective" },
    { claim: "No palliative oxygen at a resting saturation of 90% or more", grade: "II, D", source: "esmo-2020" },
    { claim: "Corticosteroids may be considered for cancer-related breathlessness refractory to other treatments", grade: "II, C", source: "esmo-2020", quote: "Corticosteroids may be considered for palliation of cancer-related breathlessness refractory to other treatments" },
    { claim: "Referral to a specialist multimodal breathlessness service if available", grade: "I, A", source: "esmo-2020", quote: "Patients with cancer with chronic breathlessness should be referred to specialist multimodal breathlessness services if available" },
    { claim: "Systemic opioids should be offered when non-drug measures give inadequate relief (advanced cancer)", grade: "No grade printed in the abstract; the full text was not read", source: "asco-2021", quote: "For patients who derive inadequate relief from nonpharmacologic interventions, systemic opioids should be offered." },
    { claim: "A fan, supplemental oxygen for hypoxaemia and self-management approaches may be offered (advanced cancer)", grade: "No grade printed in the abstract; the full text was not read", source: "asco-2021", quote: "Nonpharmacologic interventions that may be offered to relieve dyspnea include airflow interventions (eg, a fan directed at the cheek), standard supplemental oxygen for patients with hypoxemia, and other psychoeducational, self-management, or complementary approaches." },
    { claim: "Assessment for co-existing causes as the first step for persistent cough in lung cancer", grade: "Ungraded, Consensus Based Statement", source: "chest-2017" },
    { claim: "Cough suppression exercises as an alternative or addition to drugs, where available", grade: "Grade 2C", source: "chest-2017", quote: "In adult patients with lung cancer experiencing cough despite anticancer treatment, we suggest cough suppression exercises as alternative or additional to pharmacological therapy where such services are available" },
    { claim: "An opioid derivative for cough that does not respond to demulcents", grade: "Grade 2C", source: "chest-2017" },
  ],
  sources: [
    { key: "esmo-2020", label: "Management of breathlessness in patients with cancer: ESMO Clinical Practice Guidelines (Hui et al.)", publisher: "ESMO Open (European Society for Medical Oncology; no external funding)", year: 2020, url: "https://europepmc.org/article/PMC/PMC7733213", doi: "10.1136/esmoopen-2020-001038", gradingScheme: "Printed in round brackets after each recommendation as a Roman numeral and a letter, for example (II, B). The paper says levels of evidence and grades of recommendation follow the system in its online supplemental table S1, which was not read, so what each numeral and letter means is not given here; that the numeral is the level of evidence and the letter the grade of recommendation follows from the order of that sentence and from the asterisk being described as attached to the grade. An asterisk marks statements for which trials are not available and which the experts and ESMO faculty consider justified by standard clinical practice.", read: "full-text", accessed: "2026-11-18" },
    { key: "asco-2021", label: "Management of Dyspnea in Advanced Cancer: ASCO Guideline (Hui et al.)", publisher: "Journal of Clinical Oncology (American Society of Clinical Oncology)", year: 2021, url: "https://europepmc.org/article/MED/33617290", doi: "10.1200/JCO.20.03465", gradingScheme: "The abstract prints no type, evidence quality or strength for any recommendation; those are in the full text, which was not read.", read: "abstract", accessed: "2026-11-18" },
    { key: "chest-2017", label: "Symptomatic Treatment of Cough Among Adult Patients With Lung Cancer: CHEST Guideline and Expert Panel Report (Molassiotis et al.)", publisher: "Chest (American College of Chest Physicians, sole supporter)", year: 2017, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6026217/", doi: "10.1016/j.chest.2016.12.028", gradingScheme: "CHEST grading on the GRADE framework: grade 1 is a strong recommendation, grade 2 a weak and conditional one, with a letter for the quality of evidence; statements without enough evidence are printed as 'Ungraded, Consensus Based Statement'.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-welireg", label: "Welireg (belzutifan) US prescribing information and patient information, revised 09/2026", publisher: "Merck Sharp & Dohme (manufacturer); FDA label via DailyMed", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=13e15ee0-d679-4fa9-9430-e2e2170474da", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "ema-welireg", label: "Welireg (belzutifan) EU summary of product characteristics and package leaflet", publisher: "Merck Sharp & Dohme (marketing authorisation holder); European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/welireg-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-sprycel", label: "Sprycel (dasatinib) US prescribing information and Medication Guide, DailyMed version of 16 October 2026", publisher: "Bristol-Myers Squibb (manufacturer); FDA label via DailyMed", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=4764f37b-c9e6-4ede-bcc2-8a03b7c521df", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "ema-sprycel", label: "Sprycel (dasatinib) EU summary of product characteristics and package leaflet", publisher: "Bristol-Myers Squibb (marketing authorisation holder); European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/sprycel-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-kyprolis", label: "Kyprolis (carfilzomib) US prescribing information, DailyMed version of 18 June 2025", publisher: "Onyx Pharmaceuticals and Amgen (manufacturer); FDA label via DailyMed", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=ea66eb30-e665-4693-99a1-a9d3b4bbe2d6", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "ema-kyprolis", label: "Kyprolis (carfilzomib) EU summary of product characteristics and package leaflet", publisher: "Amgen (marketing authorisation holder); European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/kyprolis-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-votrient", label: "Votrient (pazopanib) US prescribing information and Medication Guide, DailyMed version of 16 December 2025", publisher: "Novartis (manufacturer); FDA label via DailyMed", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=eeaaaf38-fb86-4d9f-a19d-0f61daac2fd7", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "ema-votrient", label: "Votrient (pazopanib) EU summary of product characteristics and package leaflet", publisher: "Novartis (marketing authorisation holder); European Medicines Agency", year: 2025, url: "https://www.ema.europa.eu/en/documents/product-information/votrient-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-lumakras", label: "Lumakras (sotorasib) US prescribing information and patient information, revised 01/2025", publisher: "Amgen (manufacturer); FDA label via DailyMed", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=c80a362c-7ac3-4894-a076-0691e68ef8c1", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "ema-lumykras", label: "Lumykras (sotorasib) EU summary of product characteristics and package leaflet", publisher: "Amgen (marketing authorisation holder); European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/lumykras-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-krazati", label: "Krazati (adagrasib) US prescribing information and patient information, revised 08/2026", publisher: "Mirati Therapeutics, a Bristol Myers Squibb company (manufacturer); FDA label via DailyMed", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=0b8bf078-34c2-4f45-9012-38a8ac082b01", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "ema-krazati", label: "Krazati (adagrasib) EU summary of product characteristics and package leaflet", publisher: "Bristol-Myers Squibb (marketing authorisation holder); European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/krazati-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-bizengri", label: "Bizengri (zenocutuzumab) US prescribing information and patient information, revised 05/2026", publisher: "Partner Therapeutics (labeller); FDA label via DailyMed", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=203daea4-fc87-40a4-a92f-ba2351b16de1", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-tecentriq", label: "Tecentriq (atezolizumab) US prescribing information and Medication Guide, revised 10/2026", publisher: "Genentech, a member of the Roche Group (manufacturer); FDA label via DailyMed", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=6fa682c9-a312-4932-9831-f286908660ee", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "ema-tecentriq", label: "Tecentriq (atezolizumab) EU summary of product characteristics and package leaflet", publisher: "Roche (marketing authorisation holder); European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/tecentriq-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-imfinzi", label: "Imfinzi (durvalumab) US prescribing information and Medication Guide, revised 05/2026", publisher: "AstraZeneca (manufacturer); FDA label via DailyMed", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=8baba4ea-2855-42fa-9bd9-5a7548d4cec3", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "ema-imfinzi", label: "Imfinzi (durvalumab) EU summary of product characteristics and package leaflet", publisher: "AstraZeneca (marketing authorisation holder); European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/imfinzi-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "macmillan-breathless", label: "Breathlessness (patient information, reviewed 1 March 2024)", publisher: "Macmillan Cancer Support", year: 2024, url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/breathlessness", gradingScheme: "Patient information; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "cruk-breathless", label: "Cancer and shortness of breath (patient information, last reviewed 10 August 2026)", publisher: "Cancer Research UK", year: 2026, url: "https://www.cancerresearchuk.org/about-cancer/coping/physically/breathing-problems/shortness-of-breath", gradingScheme: "Patient information; not graded.", read: "full-text", accessed: "2026-11-18" },
  ],
  upgrades: [],
  gaps: [
    "No guideline was found that addresses breathlessness or cough as a side effect of an anticancer drug as its own subject. The ESMO guideline is written for patients with cancer in general, the ASCO guideline for adults with advanced cancer, and the CHEST guideline for cough in lung cancer that persists despite cancer treatment; their advice on easing the symptom is applied here by extension, and none of them tested it in people whose symptom was caused by a drug.",
    "The ASCO 2021 dyspnoea guideline was read as an abstract only: the publisher's site returned 403 to a script, Europe PMC holds no full text, and a request to the Internet Archive was refused by the permission system on 18 November 2026 and not retried. A second reader tried once more on 18 November 2026: the free PDF address that Europe PMC lists for the paper also returned 403, and the paper is not in PubMed Central. Its individual recommendations, their evidence quality and strength, and any point where it differs from ESMO on opioids, benzodiazepines, oxygen or corticosteroids are therefore not on this page.",
    "The ESMO supplement (assessment tools, the detail on treating underlying causes, the grading table) was not read, so the definitions of the ESMO levels and grades printed on this page could not be checked against their table. The correction notice to the CHEST guideline (doi 10.1016/j.chest.2017.09.030) could not be read: on 18 November 2026 PubMed Central answered a second attempt with a browser check. Crossref records it as an erratum and Europe PMC titles it a correction to the endorsement, which suggests it does not change a recommendation, but that was not confirmed.",
    "No label read says how often oxygen saturation should be measured on belzutifan ('periodically'), and neither the US label nor the EU SmPC gives a saturation at which a patient at home should seek help.",
    "No source read says how a pneumothorax on pazopanib should be managed or whether pazopanib should be paused or stopped after one. The US label has no warning section on it.",
    "The dasatinib labels leave the diagnosis of pulmonary arterial hypertension to standard practice guidelines, which were not read for this page (for example the European cardiology and respiratory societies' pulmonary hypertension guideline).",
    "The labels for atezolizumab, durvalumab and sotorasib list cough as a frequent adverse reaction but give no way to tell a cough that is a simple side effect from the start of lung inflammation, other than the workup. No source read gives a treatment for cough caused by these drugs.",
    "EU product information for zenocutuzumab could not be found at the EMA address used for the other products (404), so only its US label was read. Adagrasib's EU SmPC has no warning on interstitial lung disease, where the US label does.",
    "Labels were read for nine products only. Other anticancer drugs with breathlessness or cough among their side effects were not read label by label for this page.",
    "Patient-facing wording on when to seek urgent help was found in the US Medication Guides or patient information for belzutifan, dasatinib, sotorasib, adagrasib, zenocutuzumab, pazopanib, atezolizumab and durvalumab, and on the Macmillan and Cancer Research UK pages. For carfilzomib the US label read has no patient leaflet and asks only that patients be advised to contact their healthcare provider if they experience shortness of breath; the EU package leaflet tells patients to tell their doctor straight away about difficulty breathing.",
    "Children are not addressed by any source read.",
  ],
  drugs: ["belzutifan", "dasatinib", "carfilzomib", "pazopanib", "sotorasib", "adagrasib", "zenocutuzumab", "atezolizumab", "durvalumab"],
  institutions: ["esmo", "asco", "ema"],
  terms: ["lung-palliation-breathlessness-effusion-obstruction", "pneumonitis", "ild", "pleural-effusion", "anaemia"],
  related: [
    "irae-pneumonitis",
    "interstitial-lung-disease-on-antibody-drug-conjugates-and-targeted-drugs",
    "acute-oncology-telephone-triage",
    "fluid-retention-and-effusions-on-kinase-inhibitors",
    "superior-vena-cava-obstruction",
    "cancer-associated-vte-treatment",
    "indwelling-pleural-catheter-drainage-at-home",
    "malignant-pericardial-effusion",
    "strong-opioids-for-cancer-pain",
    "morphine",
  ],
  tags: ["protocol", "symptom-management", "acute-oncology"],
});

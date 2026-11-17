import { protocol } from "./helpers";

/*
 * Recognising that someone may be dying and caring for them in the last days of life: communication, hydration,
 * symptom control (pain, breathlessness, nausea, agitation and delirium, noisy breathing) and anticipatory ('just in
 * case') medicines. One record for three census rows: last-days care, anticipatory medicines, and agitation,
 * breathlessness and noisy breathing in the last days, because NICE NG31 treats them as one guideline and one plan.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was read again as raw
 * text and every claim checked against it; quotes were checked by script (whitespace normalised, XML tags stripped).
 * - NICE NG31, Care of dying adults in the last days of life (published 16 December 2015): recommendations page and
 *   overview, the copies a sibling checker fetched from nice.org.uk with curl on 17 November 2026, re-used. The update
 *   information page (fetched here) lists one minor change, a link added in October 2021. NICE quality standard QS144
 *   (2 March 2017): overview and quality statements, fetched with curl.
 * - Clinical Practice Guideline for Care in the Last Days of Life (Korean Society for Hospice and Palliative Care and
 *   the National Cancer Center; Korean J Hosp Palliat Care 2020): full text, the Europe PMC XML (PMC10332720) a
 *   sibling checker fetched on 17 November 2026, re-used. Each recommendation is printed with an evidence level
 *   (A to D) and a recommendation class (I, IIa, IIb), quoted as printed.
 * - MASCC expert opinion on clinically assisted hydration in advanced cancer (Support Care Cancer 2024): full text,
 *   Europe PMC XML (PMC10937805).
 * - Care of the adult cancer patient at the end of life: ESMO Clinical Practice Guidelines (ESMO Open 2021): full
 *   text, Europe PMC XML (PMC8411064). Added in the second pass because it disagrees with NICE on medicines for noisy
 *   breathing, on suction and on hydration for thirst. Its grading key is in a supplementary table that was not read.
 * - Scottish Palliative Care Guidelines, Care in the last days of life and Anticipatory prescribing: both web pages,
 *   fetched with curl from rightdecisions.scot.nhs.uk. Added in the second pass as the source of the doses, since
 *   NICE prints none. The pages print no review date.
 * - SILENCE trial (van Esch et al., JAMA 2021): abstract, Europe PMC. The full text was tried and did not read: the
 *   Europe PMC XML endpoint returned an error, the publisher does not allow the XML through NCBI, and PubMed Central
 *   answered with a browser check.
 * - CHELsea II cluster randomised trial protocol (BMJ Open 2022): abstract; a Europe PMC search found no results
 *   paper.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const careInTheLastDaysOfLife = protocol({
  id: "care-in-the-last-days-of-life",
  name: "Care in the last days of life: recognising dying, hydration, symptom control and anticipatory medicines",
  aka: ["end of life care", "last days of life", "care of the dying", "just in case medicines", "anticipatory prescribing", "anticipatory medicines", "death rattle", "noisy respiratory secretions", "terminal agitation", "terminal delirium", "dying phase"],
  domain: "palliative",
  tldr: "When someone may be in their last days, the team should say so honestly, plan care with them and their family, stop medicines that no longer help, keep their mouth moist and help them drink if they wish, and prescribe 'just in case' medicines for pain, breathlessness, sickness, anxiety or agitation and noisy breathing so that help is at hand without delay, including at home.",
  simple: "In the last days of life, care is about comfort. The team should talk with you honestly, ask what matters to you, stop medicines that no longer help and make sure medicines are to hand in case they are needed. Noisy breathing near the end can be upsetting to hear but is unlikely to cause the person discomfort.",
  summary: "NICE NG31 (2015) sets out the process: gather and document the person's needs, signs and wishes when dying is suspected; look for the signs that suggest it (agitation, Cheyne-Stokes breathing, falling consciousness, mottled skin, noisy secretions) while staying alert to recovery; monitor at least every 24 hours; discuss the prognosis honestly unless the person does not want to know; name a lead healthcare professional; and make an individualised care plan. The person is supported to drink if they wish and are able, with frequent mouth care; clinically assisted hydration is an individual decision, with a therapeutic trial considered for distressing symptoms or signs of dehydration when drinking is not enough, monitored at least every 12 hours. MASCC (2024), writing about advanced cancer, suggests that people with insufficient intake and a prognosis of a week or more should always be considered for assisted hydration, and says a blanket policy either way is not justifiable; ESMO (2021) says artificial hydration does not improve or prevent thirst [V, C]. NICE prints no doses; for people not already on symptom medicines it advises the lowest effective dose, and it advises considering a syringe pump when more than 2 or 3 as-needed doses are given in 24 hours, avoiding intramuscular injections, no routine oxygen, and specialist advice when symptoms do not settle. The medicines it names are all 'consider': an opioid, a benzodiazepine or both for breathlessness, a benzodiazepine for anxiety or agitation, an antipsychotic for delirium or agitation, hyoscine butylbromide then octreotide for nausea or vomiting from bowel obstruction, and atropine, glycopyrronium or hyoscine for noisy secretions that distress the person. Anticipatory medicines are prescribed as early as possible and individually, with indications and doses stated. The Scottish Palliative Care Guidelines print the doses NICE does not: four as-needed medicines by subcutaneous injection (an opioid, midazolam, hyoscine butylbromide and levomepromazine). The Korean guideline (2020) grades its parallel recommendations, for example opioids for dyspnoea B IIa and antipsychotics for delirium B IIb. ESMO (2021) disagrees with NICE on noisy breathing: it finds no evidence to support anticholinergic medicines [V, C]. One randomised trial (SILENCE, 2021) found that scopolamine butylbromide given prophylactically once dying was recognised reduced death rattle from 27% to 13%; no guideline read recommends prophylaxis.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["ward", "home", "community"],
  },
  population: "Adults (18 and over) who are dying during the last 2 to 3 days of life, as NICE NG31 scopes it, with cancer or any other condition (NICE NG31 and the Korean guideline are not cancer specific; the Korean guideline was written for general wards; the MASCC and ESMO documents are about adults with advanced cancer, and ESMO covers the last weeks as well as the last days). Children and young people are outside this record. Palliative sedation for refractory symptoms is a separate record.",
  trigger: "The team thinks the person may be entering the last days of life.",
  steps: [
    {
      action: "When dying is suspected, gather and record the person's needs, current signs and symptoms, history, goals and wishes, and the views of those important to them",
      why: "NICE says it is often difficult to be certain that a person is dying; the information helps the team judge whether the person is nearing death, deteriorating, stable or improving.",
      source: "nice-ng31",
      quote: "If it is thought that a person may be entering the last days of life, gather and document information on:",
      grade: "Not graded (NICE 1.1.1)",
    },
    {
      action: "Look for the changes that suggest the last days of life, monitor for further changes at least every 24 hours and update the care plan, staying alert to signs of stabilising or recovery",
      why: "Signs such as agitation, Cheyne-Stokes breathing, falling consciousness and mottled skin suggest dying, but NICE notes that improvement could mean the person is stabilising or recovering.",
      source: "nice-ng31",
      quote: "Monitor for further changes in the person at least every 24 hours and update the person's care plan.",
      grade: "Not graded (NICE 1.1.6)",
    },
    {
      action: "Avoid tests that are unlikely to change care in the last days, unless there is a clinical need",
      why: "NICE's example of a test that may still be needed is a blood count that could guide a platelet transfusion to avoid catastrophic bleeding.",
      source: "nice-ng31",
      quote: "Avoid undertaking investigations that are unlikely to affect care in the last few days of life unless there is a clinical need to do so, for example, when a blood count could guide the use of platelet transfusion to avoid catastrophic bleeding.",
      grade: "Not graded (NICE 1.1.4)",
    },
    {
      action: "Talk about the prognosis with the person as soon as dying is recognised, unless they do not want to know, and include those important to them if the person wishes",
      why: "NICE asks for accurate information about the prognosis, explaining any uncertainty and avoiding false optimism, and for a chance to talk about fears and to ask questions.",
      source: "nice-ng31",
      quote: "Discuss the dying person's prognosis with them (unless they do not wish to be informed) as soon as it is recognised that they may be entering the last days of life and include those important to them in the discussion if the dying person wishes.",
      grade: "Not graded (NICE 1.2.3)",
    },
    {
      action: "Ask about any advance statement, advance decision to refuse treatment or lasting power of attorney, and create an individualised care plan that includes the preferred care setting",
      why: "An advance statement, an advance decision to refuse treatment and the person's current goals and wishes are all taken into account in shared decisions.",
      source: "nice-ng31",
      quote: "In discussion with the dying person, those important to them and the multiprofessional team, create an individualised care plan. The plan should include the dying person's:",
      grade: "Not graded (NICE 1.3.5)",
    },
    {
      action: "Name a lead healthcare professional, who gives the person and those important to them contact details, including for out-of-hours services",
      why: "The named professional is responsible for encouraging shared decision-making and for making sure that agreed changes to the care plan are understood by everyone involved.",
      source: "nice-ng31",
      quote: "Identify a named lead healthcare professional, who is responsible for encouraging shared decision‑making in the person's last days of life.",
      grade: "Not graded (NICE 1.3.3)",
    },
    {
      action: "Support the person to drink if they wish to and are able to, checking for swallowing problems or risk of aspiration, and offer frequent mouth and lip care; those important to the person can help if they wish",
      why: "NICE asks for frequent care of the mouth and lips, with help cleaning teeth or dentures and frequent sips of fluid as needed, and for the management of a dry mouth to be in the care plan if needed.",
      source: "nice-ng31",
      quote: "Offer frequent care of the mouth and lips to the dying person, and include the management of dry mouth in their care plan, if needed.",
      grade: "Not graded (NICE 1.4.2)",
    },
    {
      action: "Assess hydration, preferably daily, and decide on clinically assisted hydration individually; consider a therapeutic trial if there are distressing symptoms or signs that could come from dehydration, such as thirst or delirium, and drinking is not enough; monitor at least every 12 hours, and reduce or stop it if there are signs of possible harm or the person no longer wants it",
      why: "NICE asks the team to explain that assisted hydration may relieve distressing symptoms or signs related to dehydration but may cause other problems, such as fluid overload, and that it is uncertain whether giving it prolongs life or the dying process, or whether not giving it hastens death.",
      source: "nice-ng31",
      quote: "Consider a therapeutic trial of clinically assisted hydration if the person has distressing symptoms or signs that could be associated with dehydration, such as thirst or delirium, and oral hydration is inadequate.",
      grade: "Not graded (NICE 1.4.8)",
    },
    {
      action: "Review all current medicines and, after discussion and agreement, stop those that are not giving symptomatic benefit or that may cause harm",
      why: "NICE asks for this to be agreed with the person and those important to them. ESMO's examples of preventive medicines with limited benefit at the end of life, which it says should be discontinued, are lipid-lowering agents, antiplatelet agents and proton pump inhibitors.",
      source: "nice-ng31",
      quote: "When it is recognised that a person may be entering the last days of life, review their current medicines and, after discussion and agreement with the dying person and those important to them (as appropriate), stop any previously prescribed medicines that are not providing symptomatic benefit or that may cause harm.",
      grade: "Not graded (NICE 1.5.1)",
    },
    {
      action: "If the person cannot take or tolerate medicines by mouth, consider another route, avoiding intramuscular injections and giving subcutaneous or intravenous injections instead; consider a syringe pump if more than 2 or 3 doses of any as-needed medicine have been given within 24 hours",
      why: "A syringe pump delivers medicines continuously for symptom control. For someone not already on symptom medicines, NICE says to start with the lowest effective dose and adjust it, reassessing symptoms at least daily.",
      source: "nice-ng31",
      quote: "Consider using a syringe pump to deliver medicines for continuous symptom control if more than 2 or 3 doses of any 'as required' medicines have been given within 24 hours.",
      grade: "Not graded (NICE 1.5.6)",
    },
    {
      action: "For pain, assess its level and all possible causes, treat reversible causes such as urinary retention, and follow the usual principles of pain management, matching the medicine to the severity of the pain; use a validated behavioural pain assessment for someone who cannot explain that they are in pain",
      why: "Not everyone has pain in the last days of life. Where there is pain, NICE asks for it to be managed promptly and effectively; it names no medicine or dose for pain.",
      source: "nice-ng31",
      quote: "Be aware that not all people in the last days of life experience pain. If pain is identified, manage it promptly and effectively, and treat any reversible causes of pain, such as urinary retention.",
      grade: "Not graded (NICE 1.5.11)",
    },
    {
      action: "For breathlessness, identify and treat reversible causes, consider non-drug measures such as a fan, consider an opioid, a benzodiazepine or both, and do not start oxygen routinely: offer it only where symptomatic low oxygen is known or clinically suspected",
      why: "NICE reserves oxygen for people with symptomatic hypoxaemia. The Korean guideline says the effect of oxygen on breathlessness in dying people has not been established, and ESMO does not recommend palliative oxygen where resting oxygen saturation is 90% or more [II, D].",
      source: "nice-ng31",
      quote: "Do not routinely start oxygen to manage breathlessness. Only offer oxygen therapy to people known or clinically suspected to have symptomatic hypoxaemia.",
      grade: "Not graded (NICE 1.5.16)",
    },
    {
      action: "For nausea or vomiting, assess the likely cause, discuss the options, consider non-drug methods, and choose a medicine by cause, side effects and other symptoms; where the cause is an obstructive bowel disorder, consider hyoscine butylbromide first and octreotide if symptoms do not improve within 24 hours",
      why: "The causes NICE lists include medicines, recent chemotherapy or radiotherapy, hypercalcaemia, raised intracranial pressure and bowel obstruction, and the choice of medicine depends on which it is. For malignant bowel obstruction ESMO differs: it recommends octreotide and haloperidol [II, A].",
      source: "nice-ng31",
      quote: "Assess for likely causes of nausea or vomiting in the dying person.",
      grade: "Not graded (NICE 1.5.18)",
    },
    {
      action: "For anxiety, agitation or delirium, look first for a cause such as unrelieved pain or a full bladder or rectum, treat what can be reversed and consider non-drug management; then consider a trial of a benzodiazepine for anxiety or agitation, or of an antipsychotic for delirium or agitation",
      why: "Agitation near death is sometimes an unrelieved symptom or bodily need, such as pain or a full bladder, that can be put right.",
      source: "nice-ng31",
      quote: "Be aware that agitation in isolation is sometimes associated with other unrelieved symptoms or bodily needs for example, unrelieved pain or a full bladder or rectum.",
      grade: "Not graded (NICE 1.5.23)",
    },
    {
      action: "For noisy breathing, assess the likely cause and whether the noise affects the person or those important to them, reassure them that it is unlikely to cause discomfort, and consider non-drug measures; if the secretions distress the person, consider a trial of atropine, glycopyrronium or hyoscine, checking for improvement preferably every 4 hours and at least every 12 hours",
      why: "NICE says the noise can be distressing to hear but is unlikely to cause discomfort. The medicines may take up to 12 hours to work and can cause a dry mouth, urinary retention, delirium, agitation or unwanted sedation, so NICE advises considering a change or stopping if they do not help or the side effects persist.",
      source: "nice-ng31",
      quote: "Reassure them that, although the noise can be distressing, it is unlikely to cause discomfort.",
      grade: "Not graded (NICE 1.5.29)",
    },
    {
      action: "Prescribe anticipatory medicines as early as possible and individually, with the indication and dose stated, for the symptoms likely to occur (agitation, anxiety, breathlessness, nausea and vomiting, noisy respiratory secretions and pain), taking account of the place of care and the time it would take to obtain medicines; review the person's symptoms before any is given",
      why: "NICE asks prescribers to weigh how likely each symptom is, the benefits and harms of prescribing and of not prescribing, the risk of a sudden deterioration that needs urgent symptom control, and how long it would take to get the medicines to the person.",
      source: "nice-ng31",
      quote: "Ensure that suitable anticipatory medicines and routes are prescribed as early as possible. Review these medicines as the dying person's needs change.",
      grade: "Not graded (NICE 1.6.3)",
    },
    {
      action: "Seek specialist palliative care advice if symptoms do not improve promptly with treatment or if there are undesirable side effects, such as unwanted sedation",
      why: "NICE's prescribing recommendations are written for non-specialists, and it tells them when to ask for specialist advice.",
      source: "nice-ng31",
      quote: "Seek specialist palliative care advice if the dying person's symptoms do not improve promptly with treatment or if there are undesirable side effects, such as unwanted sedation.",
      grade: "Not graded (NICE 1.5.9)",
    },
  ],
  bestInClass: {
    statement: "NICE NG31 (2015) is the most complete readable standard for the last days of life in any condition: recognise and document, monitor at least every 24 hours, honest communication, a named lead healthcare professional and an individual care plan, support to drink and mouth care with assisted hydration decided individually, no routine oxygen, subcutaneous or intravenous rather than intramuscular injections, a syringe pump considered when as-needed doses mount up, and anticipatory medicines prescribed as early as possible with indications and doses. NICE does not grade its recommendations and prints no doses; the Scottish Palliative Care Guidelines print doses for four anticipatory medicines. The Korean guideline (2020) grades its parallel recommendations: opioids for dyspnoea (B IIa), oxygen not routine and considered for known or suspected hypoxia (C IIa), drugs for secretions (C IIb), antipsychotics for delirium (B IIb), and minimising physical restraints, indwelling catheters and intravenous injections in delirium (B I). The guidelines disagree in three places. On noisy breathing, NICE and the Korean guideline say a medicine can be considered once secretions cause distress, while ESMO (2021) says there is no evidence to support anticholinergic medicines [V, C]; one randomised trial (SILENCE 2021) supports prophylaxis, which no guideline read has adopted. On hydration, NICE says consider a therapeutic trial for distressing symptoms such as thirst, MASCC (2024) suggests always considering it in advanced cancer where prognosis is a week or more and rejects a blanket policy either way, and ESMO says artificial hydration does not improve or prevent thirst [V, C]. On nausea or vomiting from bowel obstruction, NICE says consider hyoscine butylbromide first and then octreotide, while ESMO recommends octreotide and haloperidol [II, A].",
    sources: ["nice-ng31", "korea-2020", "mascc-cah-2024", "esmo-eol-2021", "spcg-anticipatory", "silence-2021"],
  },
  variants: [
    {
      name: "Prophylactic anticholinergic for death rattle",
      differs: "Gives subcutaneous scopolamine (hyoscine) butylbromide 20 mg four times a day from the moment the dying phase is recognised, rather than waiting for noisy breathing to start.",
      evidence: "SILENCE (double blind, 6 hospices in the Netherlands, 162 patients randomised and 157 analysed): death rattle in 13% with scopolamine butylbromide against 27% with placebo (difference 14%, 95% CI 2% to 27%); restlessness 28% against 23%, dry mouth 10% against 15%. One trial; NICE (2015) and the Korean guideline (2020) predate it and consider a medicine only once secretions cause distress.",
      sources: ["silence-2021", "nice-ng31", "korea-2020"],
    },
    {
      name: "No medicine for noisy breathing",
      differs: "Relies on explanation to the family, repositioning and avoiding fluid overload, and does not give an anticholinergic.",
      evidence: "ESMO (2021): no evidence to support anticholinergic medicines for noisy breathing [V, C]; repositioning may enable elimination of secretions [V, B]; the risk may be reduced by avoiding fluid overload [V, B]; clear communication with the family is vital [V, B]. ESMO's text says antisecretory medication is not recommended by NICE; NG31 as read on 17 November 2026 says to consider a trial of medicine where the secretions distress the dying person (1.5.31). The ESMO guideline was published before the SILENCE trial.",
      sources: ["esmo-eol-2021", "nice-ng31"],
    },
    {
      name: "Assisted hydration considered more readily",
      differs: "In advanced cancer, always considers clinically assisted hydration for people with insufficient fluid intake and an estimated prognosis of a week or more, and in shorter prognoses for symptom control (relief of thirst, management of opioid toxicity) or to ease patient and family distress about withholding it; the route is the one that suits the person, intravenous being usual in hospital and subcutaneous infusion (hypodermoclysis) well established at home and in hospices.",
      evidence: "MASCC expert opinion (2024), after a literature review that found a lack of evidence for or against; the statements are not graded. ESMO (2021) takes the other view of the symptom benefit: artificial hydration does not improve or prevent symptoms of thirst [V, C], and hydration should be tailored to the patient. The CHELsea II cluster randomised trial (80 sites, 1600 patients planned) is testing assisted hydration in the last days of life against usual care; no results were found.",
      sources: ["mascc-cah-2024", "esmo-eol-2021", "chelsea-ii-2022"],
    },
    {
      name: "Suction for secretions",
      differs: "Uses suction to clear secretions from the mouth or throat.",
      evidence: "The Korean guideline notes suction can be burdensome from catheter irritation and asks for benefits and harms to be weighed (D IIa). ESMO says oropharyngeal suction should not be used for noisy breathing [V, D], and the Scottish guideline says suction may exacerbate secretions. NICE asks for non-drug measures to be considered without naming suction.",
      sources: ["korea-2020", "esmo-eol-2021", "spcg-last-days", "nice-ng31"],
    },
    {
      name: "Doses, where a guideline prints them (NICE prints none)",
      differs: "The Scottish Palliative Care Guidelines say the anticipatory prescription should include four medicines, all by subcutaneous injection, and print doses for a prescriber: an opioid for pain or breathlessness (for someone who has not had opioids, morphine 2 mg to 5 mg, repeated at up to hourly intervals; the last-days page gives the starting dose as 2 mg; for someone on a regular opioid, one sixth to one tenth of the 24-hour dose); midazolam 2 mg to 5 mg, hourly as needed, for anxiety or distress; hyoscine butylbromide 20 mg, up to hourly as needed, for respiratory secretions, to a maximum of 120 mg in 24 hours; and levomepromazine 2.5 mg to 5 mg, 12 hourly as needed, for nausea. For morphine, midazolam and levomepromazine it says to seek urgent advice or review if 3 or more doses within 4 hours bring little or no benefit, and advice or review if more than 6 doses are needed in 24 hours. For secretions its second line is glycopyrronium bromide 200 micrograms, 6 to 8 hourly as needed, and its third line hyoscine hydrobromide 400 micrograms, up to 2 hourly as needed.",
      evidence: "National consensus guidance for Scotland, not graded; doses depend on the person, the problem and previous opioid use, and the person's own team's prescription comes first. Other guidelines print different figures for different routes and settings. The Korean guideline (general wards) prints, for breathlessness in someone who has not had opioids, morphine 5 to 10 mg by mouth or 2.5 to 5 mg intravenously at 2 to 4 hour intervals, and for delirium haloperidol starting at 0.5 to 2 mg subcutaneously or intramuscularly, a route NICE says to avoid. ESMO prints, for cancer-related breathlessness in opioid-naive patients, slow-release morphine 10 to 20 mg by mouth over 24 hours [II, B].",
      sources: ["spcg-anticipatory", "spcg-last-days", "korea-2020", "esmo-eol-2021", "nice-ng31"],
    },
  ],
  grades: [
    { claim: "Weigh benefits and risks before giving intravenous fluids and nutrition in the dying process", grade: "B I", source: "korea-2020", quote: "We recommend that before providing intravenous (IV) fluids and nutrition to patients in the dying process, benefits and risks should be evaluated in terms of the patient’s degree of thirst, whether the patient is dehydrated, the possibility of oral feeding, the risk of aspiration, cardiovascular function, and comorbidities." },
    { claim: "Opioids for dyspnoea, adding benzodiazepines if needed", grade: "B IIa", source: "korea-2020", quote: "Opioids can be considered to improve dyspnea in patients in the dying process. If their effect is insufficient, and especially if symptoms deteriorate due to anxiety, benzodiazepines can be added." },
    { claim: "Oxygen not given routinely; considered for known or suspected hypoxia", grade: "C IIa", source: "korea-2020", quote: "Oxygen is not conventionally administered to patients in the dying process to improve dyspnea. If the cause of dyspnea is known to be hypoxia or if hypoxia is clinically suspected, oxygen can be considered." },
    { claim: "Weigh benefits and harms before using suction for respiratory secretions", grade: "D IIa", source: "korea-2020", quote: "The use of suction to remove the respiratory secretions of patients in the dying process can be burdensome for patients due to irritation from catheters, so the choice of whether to use suction should be determined after evaluating the benefits and harms in terms of the amount of secretions, the patient’s status, and the caregiver’s needs." },
    { claim: "Drugs to suppress respiratory secretions can be considered", grade: "C IIb", source: "korea-2020", quote: "Pharmacological treatments to suppress respiratory secretions can be considered for patients in the dying process." },
    { claim: "Antipsychotics may be considered first line for delirium in the dying process", grade: "B IIb", source: "korea-2020", quote: "Antipsychotics may be considered as the first-line pharmacological treatment for delirium in patients in the dying process." },
    { claim: "Minimise physical restraints, indwelling catheters and intravenous injections in delirium; non-drug measures recommended", grade: "B I", source: "korea-2020", quote: "The use of physical restraints, indwelling catheters, and intravenous injections should be minimized in patients in the process of dying who experience delirium, and non-pharmacological interventions, such as an adequate explanation of any treatments and self-care, are recommended." },
    { claim: "No evidence to support anticholinergic medicines for noisy breathing", grade: "[V, C]", source: "esmo-eol-2021", quote: "There is no evidence to support the use of anticholinergic medications for NB" },
    { claim: "Oropharyngeal suction should not be used for noisy breathing", grade: "[V, D]", source: "esmo-eol-2021", quote: "Oropharyngeal suction should not be used for NB" },
    { claim: "Artificial hydration does not improve or prevent thirst", grade: "[V, C]", source: "esmo-eol-2021", quote: "Artificial hydration does not improve or prevent symptoms of thirst" },
    { claim: "Octreotide and haloperidol for nausea and vomiting in malignant bowel obstruction", grade: "[II, A]", source: "esmo-eol-2021", quote: "Octreotide and haloperidol are recommended for NV in malignant bowel obstruction" },
    { claim: "Consider assisted hydration where the person may die of dehydration before the cancer", grade: "Expert opinion statement 5", source: "mascc-cah-2024", quote: "Clinically assisted hydration should be considered in patients at risk of dying from dehydration before dying from their cancer" },
    { claim: "Prophylactic scopolamine butylbromide reduced death rattle (13% against 27%)", grade: "One randomised, double-blind, placebo-controlled trial", source: "silence-2021" },
  ],
  sources: [
    {
      key: "nice-ng31",
      label: "Care of dying adults in the last days of life (NG31), recommendations",
      publisher: "NICE",
      year: 2015,
      url: "https://www.nice.org.uk/guidance/ng31/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider', 'do not') signals strength. Several drug uses were off label in December 2015, as the guideline notes. Published 16 December 2015; the only change NICE lists since is a link added in October 2021.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "korea-2020",
      label: "Clinical Practice Guideline for Care in the Last Days of Life",
      publisher: "Korean Journal of Hospice and Palliative Care (Korean Society for Hospice and Palliative Care and the National Cancer Center)",
      year: 2020,
      url: "https://doi.org/10.14475/kjhpc.2020.23.3.103",
      doi: "10.14475/kjhpc.2020.23.3.103",
      gradingScheme: "Each recommendation is printed with an evidence level (A to D) and a recommendation class (I, IIa, IIb), in that order.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "mascc-cah-2024",
      label: "MASCC expert opinion/guidance on the use of clinically assisted hydration in patients with advanced cancer",
      publisher: "Supportive Care in Cancer (MASCC Palliative Care Study Group)",
      year: 2024,
      url: "https://doi.org/10.1007/s00520-024-08421-6",
      doi: "10.1007/s00520-024-08421-6",
      gradingScheme: "Twelve expert opinion statements after a literature review; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "esmo-eol-2021",
      label: "Care of the adult cancer patient at the end of life: ESMO Clinical Practice Guidelines",
      publisher: "ESMO Open (ESMO Guidelines Committee)",
      year: 2021,
      url: "https://doi.org/10.1016/j.esmoop.2021.100225",
      doi: "10.1016/j.esmoop.2021.100225",
      gradingScheme: "Each recommendation is printed with a level of evidence and a grade of recommendation in square brackets, for example [V, C]; the key to the levels and grades is in the paper's Supplementary Table S3, which was not read.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "spcg-last-days",
      label: "Scottish Palliative Care Guidelines: Care in the last days of life (web page; it prints no review date, so the year is the year it was read)",
      publisher: "NHS Scotland, Right Decision Service",
      year: 2026,
      url: "https://rightdecisions.scot.nhs.uk/scottish-palliative-care-guidelines/last-days-of-life-care-around-dying/care-in-the-last-days-of-life/",
      gradingScheme: "Not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "spcg-anticipatory",
      label: "Scottish Palliative Care Guidelines: Anticipatory prescribing (web page; it prints no review date, so the year is the year it was read)",
      publisher: "NHS Scotland, Right Decision Service",
      year: 2026,
      url: "https://rightdecisions.scot.nhs.uk/scottish-palliative-care-guidelines/medicines/anticipatory-prescribing/",
      gradingScheme: "Not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "silence-2021",
      label: "Effect of Prophylactic Subcutaneous Scopolamine Butylbromide on Death Rattle in Patients at the End of Life: the SILENCE Randomized Clinical Trial",
      publisher: "JAMA (van Esch et al.)",
      year: 2021,
      url: "https://doi.org/10.1001/jama.2021.14785",
      doi: "10.1001/jama.2021.14785",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "chelsea-ii-2022",
      label: "Clinically assisted hydration in patients in the last days of life ('CHELsea II' trial): a cluster randomised trial (protocol)",
      publisher: "BMJ Open",
      year: 2022,
      url: "https://doi.org/10.1136/bmjopen-2022-068846",
      doi: "10.1136/bmjopen-2022-068846",
      read: "abstract",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["hyoscine"],
  technologies: ["syringe-drivers", "palliative-care"],
  terms: ["last-days-of-life-care", "palliative-sedation", "advance-care-planning", "respect-process"],
  related: ["strong-opioids-for-cancer-pain", "palliative-sedation-for-refractory-suffering"],
  upgrades: ["idea-upgrade-prophylactic-antimuscarinic-when-dying-recognised"],
  gaps: [
    "NICE NG31 names medicines for breathlessness, anxiety, agitation, delirium, bowel obstruction and noisy secretions, names none for pain, and prints no doses. The doses on this page come from the Scottish Palliative Care Guidelines, the Korean guideline and ESMO, each for its own setting; local formularies in England, Wales and Northern Ireland were not read, and the British National Formulary's prescribing in palliative care pages were not read for this record.",
    "NICE NG31 was published on 16 December 2015. On 17 November 2026 its update information page listed one minor change (a link to the shared decision making guideline, October 2021) and no revision of the recommendations. The NICE quality standard that rests on it, QS144, was published on 2 March 2017 and shows that as its last review; its four statements (monitoring signs and symptoms, an individualised care plan, anticipatory prescribing with individual indications, dose and route, and daily assessment of hydration) add nothing beyond NG31.",
    "The Korean guideline is from 2020 and the ESMO guideline from 2021; Crossref lists no update to either, and no newer edition was found in Europe PMC on 17 November 2026. ESMO's own website was not checked. ESMO's grading key is in a supplementary table that was not read, so its grades are printed here as bracketed in the paper without a description of each level.",
    "The Scottish Palliative Care Guidelines pages print no review date. Their two pages differ slightly on the opioid dose for someone who has not had opioids (2 mg on one, 2 mg to 5 mg on the other); both are given.",
    "Guidelines disagree on whether any medicine helps noisy breathing and whether assisted hydration eases thirst, and the evidence is thin on both. Whether assisted hydration helps or harms in the last days is unknown; the CHELsea II trial is testing it and no results were found on 17 November 2026.",
    "Prophylaxis of death rattle rests on one trial (SILENCE), read as an abstract only. On 17 November 2026 the full text could not be read: the Europe PMC full-text endpoint returned an error, the publisher does not allow the full text through NCBI's interface, and PubMed Central answered with a browser check.",
    "Non-drug care (repositioning, fans, presence, spiritual care) is acknowledged by NICE as important but was outside the scope of NG31.",
  ],
});

import { protocol } from "./helpers";

/*
 * Recognising that someone may be dying and caring for them in the last days of life: communication, hydration,
 * symptom control (pain, breathlessness, nausea, agitation and delirium, noisy breathing) and anticipatory ('just in
 * case') medicines. One record for three census rows: last-days care, anticipatory medicines, and agitation,
 * breathlessness and noisy breathing in the last days, because NICE NG31 treats them as one guideline and one plan.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - NICE NG31, Care of dying adults in the last days of life (published December 2015): recommendations page and
 *   overview (scope), full text.
 * - Clinical Practice Guideline for Care in the Last Days of Life (Korean Society for Hospice and Palliative Care and
 *   partners; Korean J Hosp Palliat Care 2020): full text, Europe PMC XML (PMC10332720). Each recommendation is printed
 *   with an evidence level (A to D) and a recommendation class (I, IIa, IIb), quoted as printed.
 * - MASCC expert opinion on clinically assisted hydration in advanced cancer (Support Care Cancer 2024): full text,
 *   Europe PMC XML (PMC10937805).
 * - SILENCE trial, prophylactic subcutaneous scopolamine butylbromide for death rattle (van Esch et al., JAMA 2021):
 *   abstract, Europe PMC.
 * - CHELsea II cluster randomised trial protocol of clinically assisted hydration (BMJ Open 2022): abstract; results were
 *   not found.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const careInTheLastDaysOfLife = protocol({
  id: "care-in-the-last-days-of-life",
  name: "Care in the last days of life: recognising dying, hydration, symptom control and anticipatory medicines",
  aka: ["end of life care", "last days of life", "care of the dying", "just in case medicines", "anticipatory prescribing", "anticipatory medicines", "death rattle", "noisy respiratory secretions", "terminal agitation", "terminal delirium", "dying phase"],
  domain: "palliative",
  tldr: "When someone may be in their last days, the team should say so honestly, plan care with them and their family, stop medicines that no longer help, keep their mouth moist and offer drinks if they want them, and prescribe 'just in case' medicines for pain, breathlessness, sickness, agitation and noisy breathing so that help is at hand without delay, including at home.",
  simple: "In the last days of life, care is about comfort. The team should talk with you honestly, ask what matters to you, stop medicines that no longer help and leave medicines in the home in case they are needed. Noisy breathing near the end is common and is not usually distressing for the person.",
  summary: "NICE NG31 (2015) sets out the process: gather and document the person's needs, signs and wishes when dying is suspected; look for the signs that suggest it (agitation, Cheyne-Stokes breathing, falling consciousness, mottled skin, noisy secretions) while staying alert to recovery; reassess at least every 24 hours; discuss the prognosis honestly unless the person does not want to know; name a lead professional; and make an individualised care plan. Hydration is supported by mouth, with frequent mouth care; clinically assisted hydration is an individual decision, with a therapeutic trial considered for distressing signs of dehydration, monitored at least every 12 hours. MASCC (2024) adds that anyone with a prognosis of a week or more and insufficient intake should be considered for assisted hydration, and that a blanket policy either way is not justifiable. NICE gives no named doses; it advises the lowest effective dose, a syringe pump when more than 2 or 3 as-needed doses are given in 24 hours, no intramuscular injections, no routine oxygen, and specialist advice when symptoms do not settle. The drug classes it names are opioids or benzodiazepines for breathlessness, benzodiazepines for anxiety and agitation, antipsychotics for delirium, hyoscine butylbromide then octreotide for nausea from bowel obstruction, and atropine, glycopyrronium or hyoscine for distressing noisy secretions. Anticipatory medicines are prescribed early and individually, with indications and doses stated. The Korean guideline (2020) grades its parallel recommendations, for example opioids for dyspnoea B IIa and antipsychotics for delirium B IIb. One randomised trial (SILENCE, 2021) found that giving scopolamine butylbromide prophylactically once dying was recognised halved the rate of death rattle; no guideline read recommends prophylaxis.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["ward", "home", "community"],
  },
  population: "Adults (18 and over) who are dying during the last 2 to 3 days of life, as NICE NG31 scopes it, with cancer or any other condition (NICE NG31 and the Korean guideline are not cancer specific). Children and young people are outside this record. Palliative sedation for refractory symptoms is a separate record.",
  trigger: "The team thinks the person may be entering the last days of life.",
  steps: [
    {
      action: "When dying is suspected, gather and record the person's needs, current signs and symptoms, history, goals and wishes, and the views of those important to them",
      why: "Recognising dying is uncertain, and a complete picture helps the team judge whether the person is dying, stable or improving.",
      source: "nice-ng31",
      quote: "If it is thought that a person may be entering the last days of life, gather and document information on:",
      grade: "Not graded (NICE 1.1.1)",
    },
    {
      action: "Look for the changes that suggest the last days of life, and reassess at least every 24 hours, staying alert to signs of stabilising or recovery",
      why: "Signs such as agitation, changed breathing, drowsiness and mottled skin suggest dying, but some people improve, and the plan must change if they do.",
      source: "nice-ng31",
      quote: "Monitor for further changes in the person at least every 24 hours and update the person's care plan.",
      grade: "Not graded (NICE 1.1.6)",
    },
    {
      action: "Avoid tests that are unlikely to change care in the last days",
      why: "Blood tests and scans cause discomfort and rarely change what is done for comfort; a blood count may still help where it guides a platelet transfusion to prevent catastrophic bleeding.",
      source: "nice-ng31",
      quote: "Avoid undertaking investigations that are unlikely to affect care in the last few days of life unless there is a clinical need to do so, for example, when a blood count could guide the use of platelet transfusion to avoid catastrophic bleeding.",
      grade: "Not graded (NICE 1.1.4)",
    },
    {
      action: "Talk about the prognosis with the person as soon as dying is recognised, unless they do not want to know, and include those important to them if the person wishes",
      why: "People and families need time and honest information to say what matters and to make choices.",
      source: "nice-ng31",
      quote: "Discuss the dying person's prognosis with them (unless they do not wish to be informed) as soon as it is recognised that they may be entering the last days of life and include those important to them in the discussion if the dying person wishes.",
      grade: "Not graded (NICE 1.2.3)",
    },
    {
      action: "Ask about any advance statement, advance decision to refuse treatment or lasting power of attorney, and build an individualised care plan including preferred place of care",
      why: "Plans made earlier, such as a ReSPECT form or an advance decision, should shape care when the person can no longer say.",
      source: "nice-ng31",
      quote: "In discussion with the dying person, those important to them and the multiprofessional team, create an individualised care plan. The plan should include the dying person's:",
      grade: "Not graded (NICE 1.3.5)",
    },
    {
      action: "Name a lead professional and give the person and family contact details, including out of hours",
      why: "Families caring at home at night need to know whom to call.",
      source: "nice-ng31",
      quote: "Identify a named lead healthcare professional, who is responsible for encouraging shared decision‑making in the person's last days of life.",
      grade: "Not graded (NICE 1.3.3)",
    },
    {
      action: "Help the person drink if they want to and can swallow safely, and offer frequent mouth and lip care; family can help if they wish",
      why: "A dry mouth is one of the commonest discomforts at the end of life, and mouth care relieves it whether or not fluids are given.",
      source: "nice-ng31",
      quote: "Offer frequent care of the mouth and lips to the dying person, and include the management of dry mouth in their care plan, if needed.",
      grade: "Not graded (NICE 1.4.2)",
    },
    {
      action: "Decide on clinically assisted hydration individually; consider a trial if there are distressing signs of dehydration such as thirst or delirium, monitor at least every 12 hours, and stop if there are signs of harm",
      why: "Drip fluids may ease thirst or confusion but can cause swelling or fluid on the lungs, and it is not known whether giving or withholding them changes when death comes.",
      source: "nice-ng31",
      quote: "Consider a therapeutic trial of clinically assisted hydration if the person has distressing symptoms or signs that could be associated with dehydration, such as thirst or delirium, and oral hydration is inadequate.",
      grade: "Not graded (NICE 1.4.8)",
    },
    {
      action: "Review all medicines and, with agreement, stop those that no longer relieve symptoms or may cause harm",
      why: "Tablets for long-term prevention no longer help and become hard to swallow.",
      source: "nice-ng31",
      quote: "When it is recognised that a person may be entering the last days of life, review their current medicines and, after discussion and agreement with the dying person and those important to them (as appropriate), stop any previously prescribed medicines that are not providing symptomatic benefit or that may cause harm.",
      grade: "Not graded (NICE 1.5.1)",
    },
    {
      action: "Give medicines subcutaneously or intravenously rather than intramuscularly when swallowing fails, and consider a syringe pump if more than 2 or 3 as-needed doses are given in 24 hours",
      why: "Injections into muscle hurt; a pump under the skin gives steady relief without repeated injections.",
      source: "nice-ng31",
      quote: "Consider using a syringe pump to deliver medicines for continuous symptom control if more than 2 or 3 doses of any 'as required' medicines have been given within 24 hours.",
      grade: "Not graded (NICE 1.5.6)",
    },
    {
      action: "For breathlessness, treat reversible causes, use non-drug measures such as a fan, consider an opioid, a benzodiazepine or both, and give oxygen only where low oxygen is known or suspected",
      why: "Oxygen does not ease breathlessness unless oxygen levels are low, and the mask can add discomfort; opioids reduce the feeling of breathlessness.",
      source: "nice-ng31",
      quote: "Do not routinely start oxygen to manage breathlessness. Only offer oxygen therapy to people known or clinically suspected to have symptomatic hypoxaemia.",
      grade: "Not graded (NICE 1.5.16)",
    },
    {
      action: "For agitation or delirium, look first for a cause such as pain or a full bladder or bowel, treat what can be reversed, then consider a benzodiazepine for anxiety or agitation or an antipsychotic for delirium",
      why: "Restlessness near death is sometimes discomfort that can be fixed, such as a full bladder, rather than something that needs sedation.",
      source: "nice-ng31",
      quote: "Be aware that agitation in isolation is sometimes associated with other unrelieved symptoms or bodily needs for example, unrelieved pain or a full bladder or rectum.",
      grade: "Not graded (NICE 1.5.23)",
    },
    {
      action: "For noisy breathing, reassure the family that it is unlikely to cause the person discomfort, reposition, and if it distresses the person consider atropine, glycopyrronium or hyoscine, reviewing at least every 12 hours",
      why: "The rattle comes from secretions the person can no longer clear; it is often harder for those listening than for the person, and the medicines dry secretions but can cause a dry mouth or confusion.",
      source: "nice-ng31",
      quote: "Reassure them that, although the noise can be distressing, it is unlikely to cause discomfort.",
      grade: "Not graded (NICE 1.5.29)",
    },
    {
      action: "Prescribe anticipatory medicines early, individually, with the indication and dose stated, for the symptoms likely to occur (pain, breathlessness, nausea, agitation, noisy secretions), taking account of place of care and how long it takes to get medicines",
      why: "Symptoms often come at night or at weekends; having the medicines and the authority to give them already in place avoids hours of distress.",
      source: "nice-ng31",
      quote: "Ensure that suitable anticipatory medicines and routes are prescribed as early as possible. Review these medicines as the dying person's needs change.",
      grade: "Not graded (NICE 1.6.3)",
    },
    {
      action: "Seek specialist palliative care advice if symptoms do not improve promptly or treatment causes unwanted sedation",
      why: "Specialist teams have more options and experience with hard-to-control symptoms.",
      source: "nice-ng31",
      quote: "Seek specialist palliative care advice if the dying person's symptoms do not improve promptly with treatment or if there are undesirable side effects, such as unwanted sedation.",
      grade: "Not graded (NICE 1.5.9)",
    },
  ],
  bestInClass: {
    statement: "NICE NG31 (2015) is the most complete readable standard: recognise and document, reassess every 24 hours, honest communication, a named lead and an individual care plan, oral fluids and mouth care with assisted hydration decided individually, no routine oxygen, subcutaneous or intravenous rather than intramuscular routes, a syringe pump when as-needed doses mount up, and anticipatory medicines prescribed early with indications and doses. NICE does not grade its recommendations or name doses. The Korean guideline (2020) agrees on the same points and grades them: opioids for dyspnoea (B IIa), oxygen only for hypoxia (C IIa), drugs for secretions (C IIb), antipsychotics for delirium (B IIb), minimising restraints and lines in delirium (B I). On hydration, MASCC (2024) leans further towards offering it than NICE where prognosis is a week or more, and both reject a blanket policy. On noisy breathing, guidelines treat once it is distressing; one randomised trial (SILENCE 2021) supports prophylaxis, which no guideline read has adopted.",
    sources: ["nice-ng31", "korea-2020", "mascc-cah-2024", "silence-2021"],
  },
  variants: [
    {
      name: "Prophylactic anticholinergic for death rattle",
      differs: "Gives subcutaneous scopolamine (hyoscine) butylbromide 20 mg four times a day from the moment dying is recognised, rather than waiting for noisy breathing to start.",
      evidence: "SILENCE (157 patients in 6 Dutch hospices, double blind): death rattle in 13% with scopolamine butylbromide against 27% with placebo (difference 14%, 95% CI 2% to 27%); restlessness 28% against 23%, dry mouth 10% against 15%. One trial; NICE (2015) and the Korean guideline (2020) predate or do not adopt prophylaxis.",
      sources: ["silence-2021", "nice-ng31"],
    },
    {
      name: "Assisted hydration offered more readily",
      differs: "Considers clinically assisted hydration for everyone with insufficient intake and a prognosis of a week or more, and in shorter prognoses for thirst, opioid toxicity or family distress, usually by subcutaneous infusion (hypodermoclysis), including at home.",
      evidence: "MASCC expert opinion (2024), based on a literature review that found a lack of evidence for or against. The CHELsea II cluster randomised trial (1600 patients planned) is testing assisted hydration in the last days of life against usual care; no results were found.",
      sources: ["mascc-cah-2024", "chelsea-ii-2022"],
    },
    {
      name: "Suction for secretions",
      differs: "Uses suction to clear secretions from the mouth or throat.",
      evidence: "The Korean guideline notes suction can be burdensome from catheter irritation and asks for benefits and harms to be weighed (D IIa); NICE asks for non-drug measures to be considered without naming suction.",
      sources: ["korea-2020", "nice-ng31"],
    },
  ],
  grades: [
    { claim: "Weigh benefits and risks before giving intravenous fluids and nutrition in the dying process", grade: "B I", source: "korea-2020", quote: "We recommend that before providing intravenous (IV) fluids and nutrition to patients in the dying process, benefits and risks should be evaluated in terms of the patient’s degree of thirst, whether the patient is dehydrated, the possibility of oral feeding, the risk of aspiration, cardiovascular function, and comorbidities." },
    { claim: "Opioids for dyspnoea, adding benzodiazepines if needed", grade: "B IIa", source: "korea-2020", quote: "Opioids can be considered to improve dyspnea in patients in the dying process. If their effect is insufficient, and especially if symptoms deteriorate due to anxiety, benzodiazepines can be added." },
    { claim: "Oxygen not given routinely; considered for known or suspected hypoxia", grade: "C IIa", source: "korea-2020", quote: "Oxygen is not conventionally administered to patients in the dying process to improve dyspnea. If the cause of dyspnea is known to be hypoxia or if hypoxia is clinically suspected, oxygen can be considered." },
    { claim: "Drugs to suppress respiratory secretions may be considered", grade: "C IIb", source: "korea-2020", quote: "Pharmacological treatments to suppress respiratory secretions can be considered for patients in the dying process." },
    { claim: "Antipsychotics first line for delirium in the dying process", grade: "B IIb", source: "korea-2020", quote: "Antipsychotics may be considered as the first-line pharmacological treatment for delirium in patients in the dying process." },
    { claim: "Minimise restraints, catheters and intravenous lines in delirium; non-drug measures recommended", grade: "B I", source: "korea-2020" },
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
      gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider', 'do not') signals strength. Several drug uses were off label in December 2015, as the guideline notes.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "korea-2020",
      label: "Clinical Practice Guideline for Care in the Last Days of Life",
      publisher: "Korean Journal of Hospice and Palliative Care (Korean Society for Hospice and Palliative Care and partners)",
      year: 2020,
      url: "https://doi.org/10.14475/kjhpc.2020.23.3.103",
      doi: "10.14475/kjhpc.2020.23.3.103",
      gradingScheme: "Each recommendation is printed with an evidence level (A to D) and a recommendation class (I, IIa, IIb), in that order.",
      read: "full-text",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "silence-2021",
      label: "Effect of Prophylactic Subcutaneous Scopolamine Butylbromide on Death Rattle in Patients at the End of Life: the SILENCE Randomized Clinical Trial",
      publisher: "JAMA (van Esch et al.)",
      year: 2021,
      url: "https://doi.org/10.1001/jama.2021.14785",
      doi: "10.1001/jama.2021.14785",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "chelsea-ii-2022",
      label: "Clinically assisted hydration in patients in the last days of life ('CHELsea II' trial): a cluster randomised trial (protocol)",
      publisher: "BMJ Open",
      year: 2022,
      url: "https://doi.org/10.1136/bmjopen-2022-068846",
      doi: "10.1136/bmjopen-2022-068846",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["hyoscine"],
  technologies: ["syringe-drivers", "palliative-care"],
  terms: ["last-days-of-life-care", "palliative-sedation", "advance-care-planning", "respect-process"],
  related: ["strong-opioids-for-cancer-pain", "palliative-sedation-for-refractory-suffering"],
  upgrades: ["idea-upgrade-prophylactic-antimuscarinic-when-dying-recognised"],
  gaps: [
    "NICE NG31 names drug classes but no doses; anticipatory medicine doses come from local formularies and were not read here. The common UK set (an opioid, midazolam, an antiemetic such as levomepromazine or haloperidol, and an antimuscarinic) is local practice and is not stated as such in NG31.",
    "NICE NG31 dates from December 2015 and has not been updated; the Korean guideline is from 2020. No newer national guideline on the last days of life was read.",
    "Whether assisted hydration helps or harms in the last days is unknown; the CHELsea II trial is testing it and no results were found.",
    "Prophylaxis of death rattle rests on one trial (SILENCE), read as an abstract only.",
    "Non-drug care (repositioning, fans, presence, spiritual care) is acknowledged by NICE as important but was outside the scope of NG31.",
  ],
});

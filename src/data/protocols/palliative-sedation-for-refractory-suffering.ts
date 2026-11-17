import { protocol } from "./helpers";

/*
 * Palliative sedation: the deliberate lowering of consciousness to relieve suffering that cannot otherwise be relieved,
 * most often in the last days of life.
 *
 * First written on 11 November 2026 from the EAPC article text and the Korean guideline.
 *
 * Second accuracy pass, 17 November 2026. Everything below was fetched raw with curl into a scratch directory and read
 * as text; every quote was checked by script against those texts with only whitespace normalised:
 * - Revised EAPC recommended framework on palliative sedation (Surges et al., Palliat Med 2024): article full text,
 *   Europe PMC XML (PMC10865771), including Table 3 (consensus per statement) and Table 5 (medications), which are
 *   text. The 42 statements with their explanatory text are NOT in the article body: they are Supplemental File 4, a
 *   Word document in the open Europe PMC supplementary files, which the first pass did not read. It was read on
 *   17 November as text extracted from the document's XML. Quotes of statements come from that file. Table 4 of the
 *   article (an image listing the statements through the Delphi rounds) was read by eye only to confirm that the
 *   supplement's wording matches the printed final statements; nothing is quoted from it.
 * - Korean Clinical Practice Guideline for Care in the Last Days of Life (2020): full text, Europe PMC XML
 *   (PMC10332720), and its supplementary PDF, whose grading table is in Korean with English labels for the classes.
 * - ESMO Clinical Practice Guidelines for the management of refractory symptoms at the end of life and the use of
 *   palliative sedation (Cherny, Ann Oncol 2014): the publisher still refuses a script, but the Internet Archive holds
 *   a capture of the publisher's free full-text page dated 2 June 2018, and that was read (one request).
 * - Care of the adult cancer patient at the end of life: ESMO Clinical Practice Guidelines (Crawford et al., ESMO
 *   Open 2021): full text, Europe PMC XML (PMC8411064), and its supplementary grading table. Added on this pass; it
 *   is ESMO's more recent statement on palliative sedation and cites the 2014 guideline rather than replacing it.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked. No newer edition of the EAPC
 * framework or the Korean guideline was found in either.
 */
export const palliativeSedation = protocol({
  id: "palliative-sedation-for-refractory-suffering",
  name: "Palliative sedation for refractory suffering at the end of life",
  aka: ["terminal sedation", "continuous deep sedation", "proportional sedation", "respite sedation", "sedation for refractory symptoms", "midazolam infusion at the end of life"],
  domain: "palliative",
  tldr: "Sometimes, near the end of life, suffering cannot be relieved by any other treatment. Palliative sedation uses medicines to lower awareness, only as deeply as needed to relieve the suffering. Its aim is comfort, not to shorten life. It is decided with the person, and with those close to them if the person agrees, by a team with palliative care expertise, and is checked often.",
  simple: "If someone at the end of life is suffering in a way nothing else can ease, the team may give medicine to make them sleepy so they are comfortable. They use the smallest amount that works and check often. They talk with the person first, and with the family if the person agrees. The aim is comfort, not to shorten life.",
  summary: "The revised EAPC framework (2024; 42 statements, all with high or very high Delphi consensus) defines palliative sedation as the monitored, proportional use of medicines intended to reduce consciousness in order to relieve refractory suffering in patients with life-limiting disease. Suffering covers physical and psychological symptoms and existential distress. It is refractory when no method is likely to give appropriate relief within an acceptable time and without unacceptable adverse effects; that is a joint decision, the team judging whether the suffering can be treated and the patient whether it is tolerable. The aim is to relieve suffering, not to shorten life, and the framework separates sedation from euthanasia by aim, means, result and timing. Sedation is not indicated as a means of hastening death, to meet a wish to avoid experiencing the end of life where there is no refractory suffering, or to ease the distress of relatives or the workload of staff. Assessment is by a physician with sufficient palliative care expertise, multi-professional wherever possible; where it is uncertain whether every option has been considered, consultation with a specialist palliative care team or other experts is strongly recommended. Apart from unanticipated emergencies, informed consent is sought from a patient who can decide. Proportionality governs depth (the lowest level that relieves the suffering, light sedation generally first) and timing (intermittent sedation earlier; continuous deep sedation usually in the final stages of life). No life-expectancy period is set, and artificial hydration and nutrition are decided separately. Table 5 gives the stepwise drugs. Step 1, midazolam: bolus 2.5 mg SC or 1.25 mg IV for light sedation, 5 to 10 mg SC or 2.5 to 5 mg IV for deep sedation, then 1 mg/h SC or IV, adjusted to effect as often as every 1 to 2 hours; with risk factors, half the initial dose and 6 to 8 hours before raising the maintenance dose; above 10 mg/h, consider adding or changing medication. Lorazepam is the alternative. Step 2, added to midazolam: levomepromazine 12.5 to 25 mg SC or IV, then the same every 6 to 8 hours or 0.5 to 8 mg/h, halved after 3 days; chlorpromazine is the alternative. Step 3: propofol from 1 mg/kg/h IV, raised by 0.5 mg/kg/h every 30 minutes, given by an anaesthetist or someone with sufficient experience. The framework names phenobarbital as an alternative to propofol and reports doses from the literature without putting them in its table. Opioids and haloperidol should not be used to sedate. Monitoring is at least every 20 minutes until sedation is adequate, then at least three times a day; on the RASS-PAL scale light sedation corresponds to -1 to -3 and deep sedation to -4 or -5, and no target depth is set. The ESMO guidelines (2014 and 2021) and the Korean guideline (2020) likewise keep sedation for symptoms that available treatments have not relieved, and each grades this at its lowest level of evidence.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team"],
    where: ["ward", "home", "community"],
  },
  population: "Adults with life-limiting disease, in all care settings (EAPC 2024). The Korean guideline covers adults whose death is anticipated in a few days or during the hospital stay. The ESMO 2014 guideline says sedation is indicated in children as well as adults, but children are outside this record.",
  trigger: "Suffering judged refractory: no method is likely to give appropriate relief within an acceptable time and without unacceptable adverse effects, and the patient finds the suffering intolerable.",
  steps: [
    {
      action: "Have a physician with palliative care expertise assess the person with due urgency, looking for reversible causes; where it is uncertain whether every option has been considered, consult a specialist palliative care team or other experts",
      why: "Sedation is a last resort, and a treatable cause or another way to relieve the suffering may be found.",
      source: "eapc-2024",
      quote: "The consultation of palliative care experts and/or other healthcare experts to determine the untreatable nature of the suffering is strongly recommended before applying palliative sedation (stat. 13).",
      grade: "Delphi statements 12 and 13 (both high consensus)",
    },
    {
      action: "Decide together that the suffering is refractory: the team judges whether it can still be treated, and the patient whether it is tolerable",
      why: "Only the person who is suffering can say what is intolerable, so their view is part of the decision.",
      source: "eapc-2024",
      quote: "Determining refractoriness is a joint decision between the physician (and/or the multi-professional team) and the patient or their legal representative/significant others.",
      grade: "Delphi statement 3 (high consensus)",
    },
    {
      action: "Apart from unanticipated emergencies, discuss the aims, methods, benefits and risks with the patient and seek informed consent; involve those close to them if the patient agrees; record the reasons and the decision",
      why: "Sedation may end the person's ability to talk with those around them, so they should understand it and agree to it. Where the person can no longer decide, an advance directive or their previously expressed wishes guide the team.",
      source: "eapc-2024",
      quote: "The patient and, with their consent, their significant others should be, whenever possible, involved in the decision-making process.",
      grade: "Delphi statements 16, 18 and 19 (high consensus) and 17 (very high consensus)",
    },
    {
      action: "Where the suffering is psychological or existential, call it refractory only after a comprehensive assessment by experts in palliative care, and try intermittent sedation first",
      why: "This kind of distress can change and people can adapt to it, so it is harder to be sure that nothing else will help.",
      source: "eapc-2024",
      quote: "The term suffering (stat. 1) is used to encompass distressing physical and psychological symptoms as well as states of existential suffering to reflect a shift towards a broader recognition of refractory existential suffering as indication for palliative sedation.",
      grade: "Delphi statements 6 and 24 (high consensus) and 14 (very high consensus)",
    },
    {
      action: "Other than in emergencies at the end of life, try light sedation first; use intermittent sedation earlier in the illness, and consider continuous deep sedation when intermittent or continuous light sedation has not been enough, usually in the final stages of life",
      why: "A temporary rest from suffering can be enough while other treatments start to work, and lets the person wake and talk again.",
      source: "eapc-2024",
      quote: "Secondly, it also encompasses proportionality in terms of timing, as intermittent sedation will be more appropriate than continuous sedation earlier in the course of the illness to provide temporary relief whilst waiting for treatment benefit from other therapeutic approaches (transient sedation) or to give the patient a break from the current burdensome situation (respite sedation) before regaining consciousness (stat. 1).",
      grade: "Delphi statements 1, 22, 23 and 26 (high consensus)",
    },
    {
      action: "Titrate the sedative to the lowest dose that relieves the suffering, keeping the person able to interact where possible, rather than aiming straight for unconsciousness",
      why: "Deeper sedation than needed takes away time the person could still be aware of those around them.",
      source: "eapc-2024",
      quote: "First in terms of depth of sedation, with the administration of sedative medications being titrated to the lowest dosage that will provide adequate relief of suffering and maintain interactive function as far as possible, instead of aiming straight at unconsciousness (stats. 1 and 5).",
      grade: "Delphi statements 1 and 5 (high consensus)",
    },
    {
      action: "Start with midazolam: a bolus, then 1 mg an hour subcutaneously or intravenously, adjusted to effect as often as every 1 to 2 hours; with risk factors such as age over 60, weight under 60 kg or severe kidney or liver disease, halve the initial dose and wait 6 to 8 hours before raising the maintenance dose",
      why: "Midazolam acts quickly, wears off quickly and can be given under the skin, so the depth can be adjusted.",
      source: "eapc-2024",
      quote: "Use 1 mg/h (SC and IV) and then adjust as needed.",
      grade: "Delphi statement 27 (high consensus); doses from Table 5",
    },
    {
      action: "If midazolam is not enough, first check the route, the medicine and remediable causes such as a full bladder or constipation; then add levomepromazine (or chlorpromazine); if that fails, change to propofol, given by an anaesthetist or someone with sufficient experience in its use",
      why: "Some people need a second medicine of a different kind to settle. Propofol acts very fast and its dosing is more complex, so it needs an experienced person and monitoring.",
      source: "eapc-2024",
      quote: "Propofol can be used as a third step but should be administered by an anaesthetist or a person with sufficient experience in its use.",
      grade: "Delphi statement 27 (high consensus)",
    },
    {
      action: "Do not use opioids or haloperidol to sedate; continue them where they are needed for pain, breathlessness or delirium",
      why: "Opioids are for pain and breathlessness, and haloperidol for delirium. They stay if those symptoms need them, but the sedation itself is done with other medicines.",
      source: "eapc-2024",
      quote: "Opioids and haloperidol should not be used to sedate a patient.",
      grade: "Delphi statements 28 and 36 (high consensus)",
    },
    {
      action: "Decide on artificial hydration and nutrition separately from the decision to sedate",
      why: "Fluids should be neither continued nor stopped automatically. It is its own decision, made for the individual and with the person's consent where they can give it.",
      source: "eapc-2024",
      quote: "The decision about artificial hydration/nutrition therapy should be independent of the decision about continuous palliative sedation itself.",
      grade: "Delphi statement 35 (high consensus)",
    },
    {
      action: "Assess the person at least every 20 minutes until sedation is adequate, then at least three times a day during continuous sedation, checking suffering, level of consciousness and adverse effects",
      why: "Regular checks show whether the person is comfortable and whether the dose needs to go up or down. The framework offers the RASS-PAL scale for level of consciousness and three scales for pain and discomfort in people whose consciousness is lowered.",
      source: "eapc-2024",
      quote: "The patient should be initially assessed at least once every 20 minutes until adequate sedation is achieved, and subsequently at least three times per day in case of continuous sedation.",
      grade: "Delphi statement 30 (high consensus)",
    },
    {
      action: "Apart from emergencies at the end of life, plan an interruption of sedation whenever possible to reassess with the patient; in the final stage of life, do not routinely lower the dose",
      why: "Earlier in the illness, waking lets the team and the person check whether sedation is still needed and still wanted. Close to death, lowering the dose risks the suffering coming back, and comfort is the only thing that needs watching.",
      source: "eapc-2024",
      quote: "Apart from emergency situations at the end of life, a planned interruption of the sedation is recommended, whenever possible, to reassess the situation with the patient.",
      grade: "Authors' discussion, not a numbered statement; the limit in the final stage of life is Delphi statement 32 (high consensus)",
    },
    {
      action: "Keep up the same personal care as before sedation, and give those close to the person information, support and the chance to be with them and say goodbye",
      why: "The person is still cared for and spoken to, and watching someone sedated can be distressing for the people who love them.",
      source: "eapc-2024",
      quote: "In all cases, the care team must maintain the same level of personalised care as before palliative sedation.",
      grade: "Delphi statements 33, 38 and 39 (very high consensus)",
    },
  ],
  bestInClass: {
    statement: "The revised EAPC framework (2024) is the most recent of the international documents read here, and its authors describe it as the first on palliative sedation to use a strict consensus methodology: assess for reversible causes, decide refractoriness jointly with the patient, seek informed consent, apply proportionality in depth and timing with light sedation generally first, start with midazolam and escalate stepwise, do not sedate with opioids, decide hydration and nutrition separately, monitor at stated intervals, and reassess. It sets no life-expectancy period, while saying continuous deep sedation is usually indicated in the final stages of life. Its statements carry levels of agreement, not grades of evidence. The ESMO 2014 guideline rates all its own assertions level V, the ESMO 2021 end-of-life guideline grades last-resort sedation [V, C], and the Korean guideline (2020) grades it D IIb, which is expert opinion and 'may be considered'.",
    sources: ["eapc-2024", "esmo-2014", "esmo-2021", "korea-2020"],
  },
  variants: [
    {
      name: "A life-expectancy limit for sedation",
      differs: "Ties sedation, or continuous deep sedation, to a short expected survival rather than leaving the period open.",
      evidence: "The EAPC 2024 authors write that the consideration of remaining life expectancy varied considerably from one guideline to another; the framework deliberately sets no period, and its Delphi panel could not agree a definition of the final stages of life. The ESMO 2021 guideline says the use of sedation where expected prognosis is more than 2 weeks remains controversial. The national guidelines that set a limit were not read here, so this page does not say which body sets which period.",
      sources: ["eapc-2024", "esmo-2021"],
    },
    {
      name: "Mandatory specialist palliative care consultation",
      differs: "Requires a palliative care specialist to agree before any palliative sedation starts.",
      evidence: "Some EAPC experts called for it and others rejected it because access to specialist palliative care is uneven. The framework's statement 13 strongly recommends consultation with a specialist palliative care team or other experts where there is uncertainty about the evaluation, rather than making it mandatory. ESMO 2021 says that ideally sedation is only considered after palliative care consultation and other multidisciplinary input where appropriate and available. ESMO 2014 says a multidisciplinary review should in general be conducted, and strongly encourages telephone consultation where local expertise is limited.",
      sources: ["eapc-2024", "esmo-2021", "esmo-2014"],
    },
    {
      name: "The doses in the ESMO 2014 table",
      differs: "Gives a midazolam starting dose of 0.5 to 1 mg/h with 1 to 5 mg as needed and a usual effective dose of 1 to 20 mg/h, against the EAPC table's set boluses followed by 1 mg/h. It lists phenobarbital with a dose (1 to 3 mg/kg SC or IV bolus, then an infusion starting at 0.5 mg/kg/h; usual maintenance 50 to 100 mg/h) and gives propofol only as one case report.",
      evidence: "ESMO 2014 lists midazolam, levomepromazine, chlorpromazine, phenobarbital and propofol without an order of steps, and rates all its assertions level V. EAPC 2024 orders them in three steps and, for phenobarbital, reports that the available literature recommends 200 mg boluses every 30 minutes until settled and then 30 to 160 mg/h, without including it in its medication table.",
      sources: ["esmo-2014", "eapc-2024"],
    },
    {
      name: "Sedation for existential or psychological distress",
      differs: "Treats existential distress as a contested indication rather than an accepted one.",
      evidence: "ESMO 2014 calls sedation for refractory psychological symptoms and existential distress controversial and relays the 2009 EAPC caveats: only in advanced terminal illness, after repeated assessment, started as respite sedation for 6 to 24 hours, with continuous sedation considered only after repeated trials. ESMO 2021 says it remains controversial. EAPC 2024 recognises refractory existential suffering as an indication in the final phase of life, with a comprehensive assessment by experts in palliative care (statement 14) and intermittent sedation first (statement 24).",
      sources: ["esmo-2014", "esmo-2021", "eapc-2024"],
    },
  ],
  grades: [
    { claim: "Palliative sedation may be considered for severe symptoms that do not improve with available treatments in the dying process", grade: "D IIb", source: "korea-2020", quote: "For severe symptoms that do not improve with available treatments in patients in the dying process, palliative sedation may be considered." },
    { claim: "All 42 EAPC statements reached high or very high consensus after two Delphi rounds", grade: "32 high, 10 very high consensus", source: "eapc-2024", quote: "Following the second Delphi round, 32 statements reached a high and 10 a very high level of consensus (Table 3)." },
    { claim: "Evidence base for palliative sedation", grade: "Lack of clinical trials and prospective studies (as stated by the authors)", source: "eapc-2024", quote: "The updated literature shows that there is still a lack of clinical trials and prospective studies." },
    { claim: "The aim of palliative sedation is to relieve refractory suffering, not to shorten life", grade: "Delphi statement 5 (high consensus)", source: "eapc-2024", quote: "The aim of palliative sedation is to relieve refractory suffering, not to shorten life." },
    { claim: "Sedation is a treatment of last resort where symptoms are refractory to available treatment", grade: "[V, C]", source: "esmo-2021", quote: "Sedation is considered as a treatment of last resort where symptoms are refractory to available treatment [V, C]." },
    { claim: "Every assertion in the ESMO 2014 guideline", grade: "Level V", source: "esmo-2014", quote: "Since there are no randomised studies addressing this issue, all assertions are level V based on case series and expert opinion." },
  ],
  sources: [
    {
      key: "eapc-2024",
      label: "Revised European Association for Palliative Care (EAPC) recommended framework on palliative sedation: an international Delphi study",
      publisher: "Palliative Medicine (EAPC)",
      year: 2024,
      url: "https://doi.org/10.1177/02692163231220225",
      doi: "10.1177/02692163231220225",
      gradingScheme: "Delphi consensus among the panel on a five-point scale, rated low (agreement under 60%), moderate (60 to 79%), high (80 to 89%) or very high (90% or more, with a median of 5 and an interquartile range of 0). It measures agreement, not strength of evidence; statements are not graded for evidence.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "korea-2020",
      label: "Clinical Practice Guideline for Care in the Last Days of Life",
      publisher: "Korean Journal of Hospice and Palliative Care",
      year: 2020,
      url: "https://doi.org/10.14475/kjhpc.2020.23.3.103",
      doi: "10.14475/kjhpc.2020.23.3.103",
      gradingScheme: "Evidence level A to D (D is expert opinion) and recommendation class I, IIa, IIb or III (IIb is labelled 'May be considered'), printed in that order. The definitions are in a supplementary table written in Korean.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "esmo-2014",
      label: "ESMO Clinical Practice Guidelines for the management of refractory symptoms at the end of life and the use of palliative sedation",
      publisher: "ESMO (Annals of Oncology)",
      year: 2014,
      url: "https://doi.org/10.1093/annonc/mdu238",
      doi: "10.1093/annonc/mdu238",
      gradingScheme: "The guideline states that all its assertions are level V, based on case series and expert opinion, because there are no randomised studies.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "esmo-2021",
      label: "Care of the adult cancer patient at the end of life: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (ESMO Open)",
      year: 2021,
      url: "https://doi.org/10.1016/j.esmoop.2021.100225",
      doi: "10.1016/j.esmoop.2021.100225",
      gradingScheme: "Level of evidence I to V and grade of recommendation A to E, adapted from the Infectious Diseases Society of America system. Level V is studies without a control group, case reports and expert opinions; grade C is insufficient evidence for efficacy, or benefit that does not outweigh the risk or disadvantages: optional.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["midazolam", "levomepromazine", "propofol"],
  technologies: ["syringe-drivers", "palliative-care"],
  terms: ["palliative-sedation", "last-days-of-life-care"],
  related: ["care-in-the-last-days-of-life"],
  upgrades: [],
  gaps: [
    "The 42 EAPC statements and their explanatory text are in Supplemental File 4 of the article, not in its body. On 17 November 2026 that file was read as text from the open Europe PMC copy, and the steps were re-checked against the statements themselves. Table 4 of the article is an image; it was read by eye only to confirm the supplement's wording, and nothing is quoted from it.",
    "On 17 November 2026 the ESMO 2014 guideline was read from the Internet Archive's capture, dated 2 June 2018, of the publisher's free full-text page; the publisher's own site still refuses a script. Any correction published after that capture would not have been seen.",
    "ESMO has not replaced its 2014 sedation guideline; its 2021 end-of-life guideline has a short section on sedation and cites the 2014 text. The EAPC task force says it will evaluate the need for an update five years after publication.",
    "National guidelines that tie continuous deep sedation to a set life expectancy (for example hours to days, or up to two weeks) were not read: the English copy of the Dutch guideline that the EAPC authors cite did not open on 17 November 2026. This page therefore does not attribute a specific limit to a specific body. Europe PMC also lists revised recommendations published in 2024 in Swiss Medical Weekly and in Der Schmerz, which were not read.",
    "The Korean guideline's definitions of its evidence levels and recommendation classes are in a supplementary table written in Korean; only its English class labels are relied on here.",
    "The evidence behind palliative sedation is consensus and expert opinion: the EAPC authors note a continuing lack of clinical trials and prospective studies, and ESMO 2014 rates all its assertions level V.",
    "The dose tables differ between EAPC 2024 and ESMO 2014 and neither rests on trials. The EAPC framework's phenobarbital doses are reported from the literature rather than recommended in its table, and it says dexmedetomidine cannot be recommended for routine use.",
    "National law and practice differ, for example on the role of the legal representative; the framework says it may need local adaptation.",
  ],
});

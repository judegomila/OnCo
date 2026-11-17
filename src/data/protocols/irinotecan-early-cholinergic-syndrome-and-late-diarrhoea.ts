import { protocol } from "./helpers";

/*
 * Irinotecan: the early cholinergic syndrome (atropine) and late diarrhoea (high-dose loperamide, then octreotide),
 * with the eviQ algorithm that applies the same steps to sacituzumab govitecan, whose payload is irinotecan's active
 * metabolite. The general approach to treatment-induced diarrhoea is in its own protocol, linked in `related`.
 *
 * First written 11 November 2026. Second accuracy pass, 17 November 2026: every source was fetched again with curl
 * into a scratch directory and read as raw text (tags stripped by script, PDF through pdftotext), every quote was
 * checked verbatim by script, and each step was re-read against its passage.
 * - CAMPTOSAR (irinotecan hydrochloride) US prescribing information, DailyMed set e518dfc6-7e93-4fee-a66c-51e1ab71c056,
 *   version 37 published 13 May 2026 (still the current version): full SPL XML (boxed warning, 2.1 to 2.4, 5.1, 5.3, 17).
 * - CAMPTO 20 mg/mL UK summary of product characteristics (Pfizer, text revised May 2024), from the electronic
 *   medicines compendium: full page. Not read in the first pass; it differs from the US label on the atropine dose,
 *   the night-time loperamide dose, antibiotics and admission, and those differences are now on the page.
 * - eviQ (Cancer Institute NSW) "Algorithm: irinotecan and sacituzumab govitecan induced diarrhoea management", ID 3238
 *   version 3 (last reviewed 5 June 2024): the page and the PDF algorithm, full text.
 * - NCI PDQ "Gastrointestinal Complications (PDQ), Health Professional Version" (updated 3 April 2025): full page.
 * - TRODELVY (sacituzumab govitecan) US prescribing information, DailyMed set 57a597d2-03f0-472e-b148-016d7169169d,
 *   version 20 published 29 June 2026: full SPL XML (boxed warning, 5.2). Not read in the first pass.
 * - Macmillan Cancer Support "Irinotecan" (reviewed 1 April 2025): full page, for the patient urgency wording.
 * - Scopolamine butylbromide prophylaxis study (Cancer Chemother Pharmacol 2019): now the full text, PMC6394464, from
 *   the Europe PMC REST endpoint.
 * The 2018 ESMO diarrhoea guideline answered with a bot check on 17 November 2026 and has no open copy in Europe PMC;
 * nothing on this page rests on it. Every DOI was resolved through Europe PMC and its title checked. Quotes are copied
 * from the raw text with nothing changed.
 */
export const irinotecanEarlyCholinergicSyndromeAndLateDiarrhoea = protocol({
  id: "irinotecan-early-cholinergic-syndrome-and-late-diarrhoea",
  name: "Irinotecan: early cholinergic syndrome and late diarrhoea",
  aka: ["irinotecan cholinergic syndrome", "atropine with irinotecan", "irinotecan late diarrhoea", "high-dose loperamide after irinotecan", "sacituzumab govitecan diarrhoea", "CPT-11 diarrhoea"],
  domain: "chemotherapy-administration",
  tldr: "Irinotecan can cause two kinds of diarrhoea. The first comes during or soon after the drip, with sweating, watery eyes and cramps; an atropine injection can prevent or ease it. The second starts a day or more later and can be serious: start your loperamide at the first loose stool, and contact your team the first time it happens, with blood, fever or faintness, or if not controlled in 24 hours.",
  simple: "This drug can give you runny poo during the drip and days later. Nurses have a medicine for the first. For the second, take your tablets and call your team.",
  summary: "Irinotecan causes an early diarrhoea during or shortly after the infusion, part of an acute cholinergic syndrome (rhinitis, salivation, miosis, lacrimation, sweating, flushing, cramps, sometimes bradycardia), and a late diarrhoea, generally more than 24 hours after the dose (median onset 5 days with 3-weekly and 11 days with weekly dosing), which can be prolonged and life-threatening. For the cholinergic syndrome the US label advises considering atropine 0.25 to 1 mg intravenously or subcutaneously as prophylaxis or treatment; the UK summary of product characteristics says atropine sulfate 0.25 mg subcutaneously should be given when the syndrome appears, with prophylaxis at later doses after an acute and severe episode; eviQ gives 0.3 to 0.6 mg, repeated to a maximum of 1.2 mg. For late diarrhoea all three give high-dose loperamide, 4 mg at the first loose stool and then 2 mg every 2 hours, continued until 12 hours after the last loose stool and for no more than 48 consecutive hours because of paralytic ileus. Only the US label adds that 4 mg every 4 hours may be taken during the night; the UK text says the regimen should not be modified. The US label advises antibiotics for ileus, fever or severe neutropenia; the UK text advises a broad-spectrum antibiotic when diarrhoea comes with a neutrophil count below 500 per mm³, and hospital admission for diarrhoea with fever, severe diarrhoea needing intravenous fluids, or diarrhoea lasting beyond 48 hours of loperamide. eviQ admits for fever, dehydration or melaena and gives octreotide when diarrhoea is unresolved after a second 12 to 24 hour review. The next dose waits until bowel function has been normal without antidiarrhoeals for 24 hours, and the dose is reduced if grade 2 to 4 late diarrhoea recurs. eviQ applies the same algorithm to sacituzumab govitecan, whose own label gives a lower loperamide dose capped at 16 mg a day.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "home", "telephone-triage", "acute-oncology-service", "ward"],
  },
  population: "Adults receiving irinotecan alone or in combination (for example with fluorouracil and folinic acid, as in FOLFIRI), and, by the eviQ algorithm, sacituzumab govitecan. The labels read are for conventional irinotecan; liposomal irinotecan has its own label, not read here. People with reduced UGT1A1 activity (UGT1A1*28/*28, *6/*6 or *6/*28) are at higher risk of severe neutropenia by the US label, and of severe neutropenia and diarrhoea by the UK product information.",
  trigger: "A course of irinotecan or sacituzumab govitecan is planned; and any diarrhoea or cholinergic symptoms during or after a dose.",
  steps: [
    {
      action: "Before the first dose, consider a reduced starting dose for people known to have UGT1A1*28/*28, *6/*6 or *6/*28",
      why: "People with these gene variants have more of the drug's active form in their blood. The US label ties this to severe neutropenia and says the precise reduction is not known; the UK product information adds severe diarrhoea to the risk.",
      source: "camptosar-label-2026",
      quote: "When administered in combination with other agents, or as a single-agent, consider a reduction in the starting dose by at least one level of CAMPTOSAR for patients known to be homozygous for the UGT1A1*28 or *6 alleles (*28/*28, *6/*6) or compound heterozygous for the UGT1A1*28 and *6 alleles (*6/*28)",
    },
    {
      action: "Tell the person and their carers about early and late diarrhoea, and make sure loperamide is readily available to them",
      why: "Late diarrhoea generally starts more than 24 hours after the drip, and the label says it should be treated promptly with loperamide.",
      source: "camptosar-label-2026",
      quote: "Patients should have loperamide readily available to begin treatment for late diarrhea (generally occurring more than 24 hours after administration of CAMPTOSAR).",
    },
    {
      action: "During and shortly after the infusion, watch for the cholinergic syndrome: runny nose, salivation, small pupils, watery eyes, sweating, flushing, cramps, diarrhoea and slow heart rate",
      why: "The label says these symptoms may be prevented or treated. The UK product information says they are thought to be related to the drug's anticholinesterase activity and are expected more often at higher doses.",
      source: "camptosar-label-2026",
      quote: "It may be accompanied by cholinergic symptoms of rhinitis, increased salivation, miosis, lacrimation, diaphoresis, flushing, and intestinal hyperperistalsis that can cause abdominal cramping. Bradycardia may also occur.",
    },
    {
      action: "Consider atropine 0.25 to 1 mg intravenously or subcutaneously to prevent or treat the cholinergic syndrome, unless contraindicated",
      why: "The US label says early diarrhoea and the other cholinergic symptoms may be prevented or ameliorated by atropine, and asks the prescriber to consider it for either purpose.",
      source: "camptosar-label-2026",
      quote: "Consider prophylactic or therapeutic administration of 0.25 mg to 1 mg of intravenous or subcutaneous atropine (unless clinically contraindicated).",
    },
    {
      action: "Where the UK product information is followed, give atropine sulfate 0.25 mg subcutaneously when the syndrome appears, unless contraindicated, and give it preventively with later doses after an acute and severe episode",
      why: "The UK text is firmer and narrower than the US label: one dose and one route, and prevention recommended only after a severe episode. It also asks for caution in people with asthma.",
      source: "campto-smpc-2024",
      quote: "In patients who experienced an acute and severe cholinergic syndrome, the use of prophylactic atropine sulfate is recommended with subsequent doses of CAMPTO.",
    },
    {
      action: "For late diarrhoea, start loperamide at the first poorly formed or loose stool, or at the first sign of more frequent bowel movements",
      why: "Late diarrhoea may be prolonged and may lead to dehydration, electrolyte imbalance or sepsis, so both labels say to start treatment at once.",
      source: "camptosar-label-2026",
      quote: "Begin loperamide at the first episode of poorly formed or loose stools or the earliest onset of bowel movements more frequent than normal.",
    },
    {
      action: "Take loperamide 4 mg, then 2 mg every 2 hours until 12 hours free of diarrhoea, for no longer than 48 consecutive hours at these doses; the US label allows 4 mg every 4 hours during the night",
      why: "Beyond 48 hours at these doses there is a risk of paralytic ileus, where the bowel stops moving. The UK product information gives the same doses with no night-time alternative, says the regimen should not be modified, and says it should not be taken for less than 12 hours.",
      source: "camptosar-label-2026",
      quote: "One dosage regimen for loperamide is 4 mg at the first onset of late diarrhea and then 2 mg every 2 hours until the patient is diarrhea-free for at least 12 hours. Loperamide is not recommended to be used for more than 48 consecutive hours at these doses, because of the risk of paralytic ileus. During the night, the patient may take 4 mg of loperamide every 4 hours.",
    },
    {
      action: "Contact the team for diarrhoea for the first time during treatment, black or bloody stools, dizziness or faintness, being unable to drink, or diarrhoea not controlled within 24 hours",
      why: "The US label lists these as the reasons to contact the doctor, and separately asks for any fever to be reported immediately. The UK product information says the person must tell their doctor or treatment unit whenever diarrhoea occurs.",
      source: "camptosar-label-2026",
      quote: "Patients should contact their physician if any of the following occur: diarrhea for the first time during treatment; black or bloody stools; symptoms of dehydration such as lightheadedness, dizziness, or faintness; inability to take fluids by mouth due to nausea or vomiting; or inability to get diarrhea under control within 24 hours.",
    },
    {
      action: "In the UK, contact the hospital straight away on the 24-hour number for diarrhoea within 24 hours of treatment, and for later diarrhoea with a temperature over 37.5°C, blood or mucus in the stool, sickness, not managing to drink enough, or tablets that have not worked within 24 hours",
      why: "Macmillan's patient information sets the urgency in these words and says hospital treatment with antibiotics and fluids through a drip may be needed.",
      source: "macmillan-irinotecan-2025",
      quote: "Contact the hospital straight away on the 24-hour number if you have diarrhoea and any of the following things happen:",
    },
    {
      action: "Admit if diarrhoea comes with fever, dehydration or melaena: assessment by a doctor, stool sample for blood, infection and C. difficile toxins, full blood count and electrolytes, and intravenous fluids and antibiotics as appropriate",
      why: "The eviQ algorithm makes these three signs the threshold for hospital care at the first report and again at the review 12 to 24 hours later.",
      source: "eviq-3238",
    },
    {
      action: "Where the UK product information is followed, admit for diarrhoea with fever, severe diarrhoea needing intravenous fluids, diarrhoea lasting beyond 48 hours of high-dose loperamide, or vomiting with delayed diarrhoea",
      why: "The UK text sets its own admission triggers. It also says a broad-spectrum antibiotic should be given preventively when diarrhoea comes with a neutrophil count below 500 per mm³, and that loperamide should not be given preventively.",
      source: "campto-smpc-2024",
      quote: "Patients with vomiting associated with delayed diarrhoea should be hospitalised as soon as possible for treatment.",
    },
    {
      action: "Monitor and replace fluid and electrolytes, give antibiotics for ileus, fever or severe neutropenia, and avoid diuretics and laxatives while there is diarrhoea",
      why: "Late diarrhoea can be life-threatening because it may lead to dehydration, electrolyte imbalance or sepsis. The US label does not name an antibiotic.",
      source: "camptosar-label-2026",
      quote: "Monitor and replace fluid and electrolytes. Use antibiotic support for ileus, fever, or severe neutropenia.",
    },
    {
      action: "If diarrhoea is still unresolved at the second review 12 to 24 hours later, start octreotide 100 to 150 micrograms subcutaneously three times daily, escalating to 500 micrograms three times daily if dehydration is severe",
      why: "eviQ makes octreotide the next step when high-dose loperamide has not settled the diarrhoea, and stops chemotherapy until all symptoms resolve. The NCI summary reports the same starting dose and escalation from an expert panel, and describes octreotide as reducing gastrointestinal secretions.",
      source: "eviq-3238",
      quote: "Octreotide 100 to 150 mcg SC three times daily (if dehydration severe, escalate dose up to 500 mcg three times daily).",
    },
    {
      action: "Delay the next dose until bowel function has been back to its pre-treatment state for at least 24 hours without antidiarrhoeal medicine, and reduce later doses if grade 2 to 4 late diarrhoea recurs",
      why: "Both labels ask for diarrhoea to be fully resolved first. In the US label's combination schedules a dose omitted for diarrhoea restarts one dose level lower after grade 2 or 3 and two levels lower after grade 4; the UK product information recommends a 15 to 20 per cent reduction after grade 3 to 4 non-haematological toxicity.",
      source: "camptosar-label-2026",
      quote: "Subsequent weekly chemotherapy treatments should be delayed in patients until return of pretreatment bowel function for at least 24 hours without anti-diarrhea medication.",
    },
  ],
  bestInClass: {
    statement: "The product labels are the authority for this drug-specific toxicity, and eviQ's 2024-reviewed algorithm turns them into a nurse-led pathway with review points at 12 to 24 hours, admission criteria and octreotide as the next step. The US label, the UK summary of product characteristics and eviQ agree on high-dose loperamide (4 mg, then 2 mg every 2 hours, at most 48 hours) and on stopping it 12 hours after the diarrhoea ends. They differ on atropine: the US label says to consider 0.25 to 1 mg intravenously or subcutaneously as prophylaxis or treatment, the UK text says 0.25 mg subcutaneously should be given as treatment and recommends prophylaxis after an acute and severe episode, and eviQ gives 0.3 to 0.6 mg repeated to 1.2 mg as treatment. They differ on antibiotics too: the US label for ileus, fever or severe neutropenia, the UK text a broad-spectrum antibiotic when diarrhoea comes with a neutrophil count below 500 per mm³, eviQ as appropriate on admission. No graded guideline for irinotecan-specific diarrhoea was read; the NCI summary says only that acute diarrhoea responds well to atropine and that delayed diarrhoea is managed with antidiarrhoeals and supportive measures.",
    sources: ["camptosar-label-2026", "campto-smpc-2024", "eviq-3238", "pdq-gi-2025"],
  },
  variants: [
    {
      name: "UK summary of product characteristics (Campto)",
      differs: "Atropine sulfate 0.25 mg subcutaneously as treatment, with prophylaxis recommended at later doses only after an acute and severe episode. The same loperamide doses with no night-time alternative, not to be modified, for at least 12 and at most 48 consecutive hours, and not to be given preventively. A broad-spectrum antibiotic when diarrhoea comes with a neutrophil count below 500 per mm³. Admission for diarrhoea with fever, severe diarrhoea needing intravenous fluids, or diarrhoea lasting beyond 48 hours of high-dose loperamide. It says the clinical utility of UGT1A1 genotyping before treatment is uncertain.",
      evidence: "UK product information, text revised May 2024; not graded.",
      sources: ["campto-smpc-2024"],
    },
    {
      name: "eviQ atropine dose and the same algorithm for sacituzumab govitecan",
      differs: "Atropine 0.3 to 0.6 mg intravenously or subcutaneously, repeated to a maximum of 1.2 mg; eviQ also starts high-dose loperamide for early-onset diarrhoea. The whole algorithm applies to sacituzumab govitecan, with a note that its product information caps loperamide at 16 mg a day, though higher doses may be considered in severe diarrhoea. The sacituzumab govitecan US label itself gives 4 mg, then 2 mg with every episode of diarrhoea to a maximum of 16 mg daily, after infectious causes have been looked for, and atropine as premedication at later doses for an excessive cholinergic response.",
      evidence: "Australian state cancer agency algorithm, reviewed by its medical oncology reference committee in June 2024; not graded. The product label is not graded.",
      sources: ["eviq-3238", "trodelvy-label-2026"],
    },
    {
      name: "Scopolamine butylbromide as prophylaxis before later doses (Japanese single-centre practice)",
      differs: "Gives scopolamine butylbromide, another antimuscarinic, before the next irinotecan dose to people who had the cholinergic syndrome, instead of atropine.",
      evidence: "Retrospective single-institution study of 59 outpatients: the syndrome occurred in 50.8 per cent, and prophylaxis at the next dose reduced it to 3.4 per cent; an irinotecan dose of 150 mg/m² or more was the only risk factor identified. Not randomised; the authors ask for a randomised study.",
      sources: ["scopolamine-2019"],
    },
  ],
  grades: [
    { claim: "Grade 3 to 4 late diarrhoea with weekly irinotecan dosing", grade: "Label incidence from the clinical studies (23 to 31 per cent)", source: "camptosar-label-2026", quote: "Grade 3–4 late diarrhea occurred in 23–31% of patients receiving weekly dosing." },
    { claim: "Severe diarrhoea with irinotecan monotherapy when the management recommendations are followed", grade: "UK product information incidence (20 per cent of patients)", source: "campto-smpc-2024", quote: "Severe diarrhoea was observed in 20% of patients who follow recommendations for the management of diarrhoea." },
    { claim: "Scopolamine butylbromide prophylaxis reduced irinotecan-related cholinergic syndrome", grade: "retrospective single-institution study, P < 0.01", source: "scopolamine-2019", quote: "Scopolamine butylbromide administration significantly reduced the incidence to 3.4% (P < 0.01)." },
  ],
  sources: [
    { key: "camptosar-label-2026", label: "CAMPTOSAR (irinotecan hydrochloride) injection: US prescribing information", publisher: "Pfizer (Pharmacia & Upjohn), via DailyMed, US National Library of Medicine", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e518dfc6-7e93-4fee-a66c-51e1ab71c056", gradingScheme: "Product labelling; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "campto-smpc-2024", label: "CAMPTO 20 mg/mL concentrate for solution for infusion: UK summary of product characteristics (text revised May 2024)", publisher: "Pfizer Limited, via the electronic medicines compendium", year: 2024, url: "https://www.medicines.org.uk/emc/product/9083/smpc", gradingScheme: "Product information; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "eviq-3238", label: "Algorithm: irinotecan and sacituzumab govitecan induced diarrhoea management (ID 3238, version 3)", publisher: "eviQ, Cancer Institute NSW", year: 2024, url: "https://www.eviq.org.au/p/3238", gradingScheme: "Algorithm endorsed by eviQ reference committees; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "pdq-gi-2025", label: "Gastrointestinal Complications (PDQ), Health Professional Version: Diarrhea", publisher: "National Cancer Institute", year: 2025, url: "https://www.cancer.gov/about-cancer/treatment/side-effects/constipation/gi-complications-hp-pdq", gradingScheme: "PDQ levels of evidence I to IV, attached to statements.", read: "full-text", accessed: "2026-11-17" },
    { key: "trodelvy-label-2026", label: "TRODELVY (sacituzumab govitecan-hziy) for injection: US prescribing information", publisher: "Gilead Sciences, via DailyMed, US National Library of Medicine", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=57a597d2-03f0-472e-b148-016d7169169d", gradingScheme: "Product labelling; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "macmillan-irinotecan-2025", label: "Irinotecan (patient information, reviewed 1 April 2025)", publisher: "Macmillan Cancer Support", year: 2025, url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/irinotecan", gradingScheme: "Patient information; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "scopolamine-2019", label: "Prophylactic effect of scopolamine butylbromide, a competitive antagonist of muscarinic acetylcholine receptor, on irinotecan-related cholinergic syndrome", publisher: "Cancer Chemotherapy and Pharmacology", year: 2019, url: "https://europepmc.org/abstract/MED/30564875", doi: "10.1007/s00280-018-3736-z", read: "full-text", accessed: "2026-11-17" },
    { key: "esmo-diarrhoea-2018", label: "Diarrhoea in adult cancer patients: ESMO Clinical Practice Guidelines", publisher: "Annals of Oncology (European Society for Medical Oncology)", year: 2018, url: "https://doi.org/10.1093/annonc/mdy145", doi: "10.1093/annonc/mdy145", read: "not-reachable", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-tr1-pre-emptive-pharmacogenomic-testing"],
  gaps: [
    "No graded guideline specific to irinotecan diarrhoea was read; the labels and eviQ are the sources. On 17 November 2026 the 2018 ESMO diarrhoea guideline answered a script with a bot check and Europe PMC holds no open copy, so how ESMO's advice differs from the labels is not stated here. No newer ESMO, ASCO or MASCC diarrhoea guideline was found in Europe PMC.",
    "The liposomal irinotecan label was not read; its atropine and loperamide wording may differ.",
    "Whether atropine should be given routinely before every dose, or only after a first episode, is not settled: the US label says prophylactic or therapeutic use should be considered, and the UK product information recommends prophylaxis only after an acute and severe episode.",
    "The labels disagree on loperamide at night: the US label allows 4 mg every 4 hours, and the UK product information says the 2-hourly regimen should not be modified.",
    "Which antibiotic to use is not specified: the US label names none and the UK product information says only broad-spectrum; local febrile neutropenia policy applies.",
    "No source read says in how many hours a person must be seen. The US label says to contact the doctor and Macmillan says to contact the hospital straight away; the page gives those words and no time limit of its own.",
    "The US label's dose advice for UGT1A1 is about neutropenia; it does not say that genotype-guided dosing reduces diarrhoea, and the UK product information calls the clinical utility of testing before treatment uncertain.",
  ],
  institutions: ["nci"],
  companies: ["pfizer"],
  technologies: ["ugt1a1-genotyping"],
  targets: ["ugt1a1"],
  drugs: ["irinotecan", "sacituzumab-govitecan", "folfiri", "folfoxiri", "loperamide", "hyoscine"],
  terms: ["ctcae-grading", "febrile-neutropenia", "chemotherapy-side-effects-colorectal", "chemotherapy-side-effects-pancreatic"],
  related: ["treatment-induced-diarrhoea-grading-and-management", "octreotide-lanreotide", "febrile-neutropenia-first-hour"],
  sections: ["supportive-care"],
  tags: ["protocol", "diarrhoea", "supportive-care"],
});

import { protocol } from "./helpers";

/*
 * Irinotecan: the early cholinergic syndrome (atropine) and late diarrhoea (high-dose loperamide, then octreotide),
 * with the eviQ algorithm that applies the same steps to sacituzumab govitecan, whose payload is irinotecan's active
 * metabolite. The general approach to treatment-induced diarrhoea is in its own protocol, linked in `related`.
 *
 * What was read, and how (11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - CAMPTOSAR (irinotecan hydrochloride) US prescribing information, DailyMed set e518dfc6-7e93-4fee-a66c-51e1ab71c056,
 *   version published 13 May 2026: full SPL text (boxed warning, 2.3, 2.4, 5.1, 17).
 * - eviQ (Cancer Institute NSW) "Algorithm: irinotecan and sacituzumab govitecan induced diarrhoea management", ID 3238
 *   version 3 (last reviewed 5 June 2024): the PDF algorithm, full text.
 * - NCI PDQ "Gastrointestinal Complications (PDQ), Health Professional Version" (updated 3 April 2025): full page.
 * - Scopolamine butylbromide prophylaxis study (Cancer Chemother Pharmacol 2019): abstract, from Europe PMC.
 * The EU summary of product characteristics (Campto) was not read. Every DOI was resolved through Europe PMC and its
 * title checked. Quotes are copied from the raw text with nothing changed.
 */
export const irinotecanEarlyCholinergicSyndromeAndLateDiarrhoea = protocol({
  id: "irinotecan-early-cholinergic-syndrome-and-late-diarrhoea",
  name: "Irinotecan: early cholinergic syndrome and late diarrhoea",
  aka: ["irinotecan cholinergic syndrome", "atropine with irinotecan", "irinotecan late diarrhoea", "high-dose loperamide after irinotecan", "sacituzumab govitecan diarrhoea", "CPT-11 diarrhoea"],
  domain: "chemotherapy-administration",
  tldr: "Irinotecan can cause two kinds of diarrhoea. The first comes during or soon after the drip, with sweating, watery eyes and cramps; an atropine injection stops it. The second starts a day or more later and can be serious: take 4 mg of loperamide at the first loose stool, then 2 mg every 2 hours, and call your team if it is not controlled in 24 hours, or with blood, fever or faintness.",
  simple: "This drug can give you runny poo during the drip and days later. Nurses have a medicine for the first. For the second, take your tablets and call your team.",
  summary: "Irinotecan causes an early diarrhoea during or shortly after the infusion, part of an acute cholinergic syndrome (rhinitis, salivation, miosis, lacrimation, sweating, flushing, cramps, sometimes bradycardia), and a late diarrhoea, generally more than 24 hours after the dose (median onset 5 days with 3-weekly and 11 days with weekly dosing), which can be prolonged and life-threatening. The US label advises considering atropine 0.25 to 1 mg intravenously or subcutaneously as prophylaxis or treatment for the cholinergic syndrome; eviQ gives 0.3 to 0.6 mg, repeated to a maximum of 1.2 mg. For late diarrhoea the label and eviQ agree on high-dose loperamide (4 mg at the first loose stool, then 2 mg every 2 hours until 12 hours free of diarrhoea, 4 mg every 4 hours at night), not for more than 48 hours because of paralytic ileus. Fever, dehydration or melaena means admission, stool tests, intravenous fluids and antibiotics; diarrhoea unresolved after a second 12 to 24 hour review is treated with octreotide. The next dose waits until bowel function has been normal without antidiarrhoeals for 24 hours, and the dose is reduced if grade 2 to 4 late diarrhoea recurs. eviQ applies the same algorithm to sacituzumab govitecan, whose label caps loperamide at 16 mg a day.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "home", "telephone-triage", "acute-oncology-service", "ward"],
  },
  population: "Adults receiving irinotecan alone or in combination (for example FOLFIRI or FOLFOXIRI), and, by the eviQ algorithm, sacituzumab govitecan. The label read is for conventional irinotecan; liposomal irinotecan has its own label, not read here. People with reduced UGT1A1 activity (UGT1A1*28/*28, *6/*6 or *6/*28) are at higher risk of severe neutropenia.",
  trigger: "A course of irinotecan or sacituzumab govitecan is planned; and any diarrhoea or cholinergic symptoms during or after a dose.",
  steps: [
    {
      action: "Before the first dose, consider a reduced starting dose for people known to have UGT1A1*28/*28, *6/*6 or *6/*28",
      why: "People with these gene variants clear the drug's active form more slowly and are more likely to have severe side effects.",
      source: "camptosar-label-2026",
      quote: "When administered in combination with other agents, or as a single-agent, consider a reduction in the starting dose by at least one level of CAMPTOSAR for patients known to be homozygous for the UGT1A1*28 or *6 alleles (*28/*28, *6/*6) or compound heterozygous for the UGT1A1*28 and *6 alleles (*6/*28)",
    },
    {
      action: "Teach the difference between early and late diarrhoea, and make sure the person has loperamide at home before the first dose",
      why: "Late diarrhoea can start days after the drip, at home; starting loperamide at the first loose stool stops it becoming dangerous.",
      source: "camptosar-label-2026",
      quote: "Patients should have loperamide readily available to begin treatment for late diarrhea (generally occurring more than 24 hours after administration of CAMPTOSAR).",
    },
    {
      action: "During and shortly after the infusion, watch for the cholinergic syndrome: runny nose, salivation, small pupils, watery eyes, sweating, flushing, cramps, diarrhoea and slow heart rate",
      why: "These come from a direct effect of the drug on the nerves of the gut and glands, and are quickly relieved by treatment.",
      source: "camptosar-label-2026",
      quote: "It may be accompanied by cholinergic symptoms of rhinitis, increased salivation, miosis, lacrimation, diaphoresis, flushing, and intestinal hyperperistalsis that can cause abdominal cramping. Bradycardia may also occur.",
    },
    {
      action: "Give atropine intravenously or subcutaneously to treat the cholinergic syndrome, and consider it before later doses as prevention, unless contraindicated",
      why: "Atropine blocks the nerve signal that causes the symptoms; giving it before the next dose usually prevents them.",
      source: "camptosar-label-2026",
      quote: "Consider prophylactic or therapeutic administration of 0.25 mg to 1 mg of intravenous or subcutaneous atropine (unless clinically contraindicated).",
    },
    {
      action: "For late diarrhoea, start loperamide at the first poorly formed or loose stool, or at the first sign of more frequent bowel movements",
      why: "Late diarrhoea can last days and cause dehydration and infection; it is easiest to control at the start.",
      source: "camptosar-label-2026",
      quote: "Begin loperamide at the first episode of poorly formed or loose stools or the earliest onset of bowel movements more frequent than normal.",
    },
    {
      action: "Take loperamide 4 mg, then 2 mg every 2 hours (4 mg every 4 hours overnight) until 12 hours free of diarrhoea, and for no longer than 48 hours at these doses",
      why: "This higher dose is needed for irinotecan diarrhoea; beyond 48 hours it risks stopping the bowel altogether (paralytic ileus).",
      source: "camptosar-label-2026",
      quote: "One dosage regimen for loperamide is 4 mg at the first onset of late diarrhea and then 2 mg every 2 hours until the patient is diarrhea-free for at least 12 hours. Loperamide is not recommended to be used for more than 48 consecutive hours at these doses, because of the risk of paralytic ileus.",
    },
    {
      action: "Call the team for diarrhoea for the first time during treatment, black or bloody stools, dizziness or faintness, being unable to drink, or diarrhoea not controlled within 24 hours",
      why: "These are signs that the diarrhoea is becoming dangerous and needs assessment the same day.",
      source: "camptosar-label-2026",
      quote: "Patients should contact their physician if any of the following occur: diarrhea for the first time during treatment; black or bloody stools; symptoms of dehydration such as lightheadedness, dizziness, or faintness; inability to take fluids by mouth due to nausea or vomiting; or inability to get diarrhea under control within 24 hours.",
    },
    {
      action: "Admit if there is fever, dehydration or melaena; replace fluid and electrolytes, send stool for infection and C. difficile, and give antibiotics for ileus, fever or severe neutropenia; avoid diuretics and laxatives",
      why: "Infection and dehydration on top of irinotecan diarrhoea can be fatal and need hospital treatment.",
      source: "camptosar-label-2026",
      quote: "Monitor and replace fluid and electrolytes. Use antibiotic support for ileus, fever, or severe neutropenia.",
    },
    {
      action: "If diarrhoea is still unresolved at the second review 12 to 24 hours later, start octreotide 100 to 150 micrograms subcutaneously three times daily, escalating to 500 micrograms if dehydration is severe",
      why: "Octreotide reduces the fluid the bowel secretes when loperamide has not worked.",
      source: "eviq-3238",
      quote: "Octreotide 100 to 150 mcg SC three times daily (if dehydration severe, escalate dose up to 500 mcg three times daily).",
    },
    {
      action: "Delay the next dose until bowel function has been back to normal for 24 hours without antidiarrhoeal medicine, and reduce later doses if grade 2 to 4 late diarrhoea recurs",
      why: "Giving the next dose while the bowel is still recovering makes severe diarrhoea more likely.",
      source: "camptosar-label-2026",
      quote: "Subsequent weekly chemotherapy treatments should be delayed in patients until return of pretreatment bowel function for at least 24 hours without anti-diarrhea medication.",
    },
  ],
  bestInClass: {
    statement: "The product label is the authority for this drug-specific toxicity, and eviQ's 2024-reviewed algorithm turns it into a nurse-led pathway with review points at 12 to 24 hours, admission criteria and octreotide as the next step. The two agree on high-dose loperamide (4 mg, then 2 mg every 2 hours, at most 48 hours) and on antibiotics for fever, ileus or severe neutropenia. They differ slightly on atropine: the label gives 0.25 to 1 mg as prophylaxis or treatment, eviQ 0.3 to 0.6 mg repeated to 1.2 mg as treatment. No graded guideline for irinotecan-specific diarrhoea was found.",
    sources: ["camptosar-label-2026", "eviq-3238", "pdq-gi-2025"],
  },
  variants: [
    {
      name: "eviQ atropine dose and the same algorithm for sacituzumab govitecan",
      differs: "Atropine 0.3 to 0.6 mg intravenously or subcutaneously, repeated to a maximum of 1.2 mg; the whole algorithm applies to sacituzumab govitecan, with a note that its product information caps loperamide at 16 mg a day, though higher doses may be considered in severe diarrhoea.",
      evidence: "Australian state cancer agency algorithm, reviewed by its medical oncology reference committee in June 2024; not graded.",
      sources: ["eviq-3238"],
    },
    {
      name: "Scopolamine butylbromide as prophylaxis before later doses (Japanese single-centre practice)",
      differs: "Gives scopolamine butylbromide, another antimuscarinic, before the next irinotecan dose to people who had the cholinergic syndrome, instead of atropine.",
      evidence: "Single-centre study of 59 outpatients: the syndrome occurred in 50.8 per cent, and prophylaxis at the next dose reduced it to 3.4 per cent; an irinotecan dose of 150 mg/m2 or more was the only risk factor identified. Not randomised.",
      sources: ["scopolamine-2019"],
    },
  ],
  grades: [
    { claim: "Grade 3 to 4 late diarrhoea with weekly irinotecan dosing", grade: "Label incidence from the registration trials (23 to 31 per cent)", source: "camptosar-label-2026", quote: "Grade 3–4 late diarrhea occurred in 23–31% of patients receiving weekly dosing." },
    { claim: "Scopolamine butylbromide prophylaxis reduced irinotecan-related cholinergic syndrome", grade: "single-centre before-and-after study, P < 0.01", source: "scopolamine-2019", quote: "Scopolamine butylbromide administration significantly reduced the incidence to 3.4% (P < 0.01)." },
  ],
  sources: [
    { key: "camptosar-label-2026", label: "CAMPTOSAR (irinotecan hydrochloride) injection: US prescribing information", publisher: "Pfizer (Pharmacia & Upjohn), via DailyMed, US National Library of Medicine", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e518dfc6-7e93-4fee-a66c-51e1ab71c056", gradingScheme: "Product labelling; not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "eviq-3238", label: "Algorithm: irinotecan and sacituzumab govitecan induced diarrhoea management (ID 3238, version 3)", publisher: "eviQ, Cancer Institute NSW", year: 2024, url: "https://www.eviq.org.au/p/3238", gradingScheme: "Algorithm endorsed by eviQ reference committees; not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "pdq-gi-2025", label: "Gastrointestinal Complications (PDQ), Health Professional Version: Diarrhea", publisher: "National Cancer Institute", year: 2025, url: "https://www.cancer.gov/about-cancer/treatment/side-effects/constipation/gi-complications-hp-pdq", gradingScheme: "PDQ levels of evidence I to IV, attached to statements.", read: "full-text", accessed: "2026-11-11" },
    { key: "scopolamine-2019", label: "Prophylactic effect of scopolamine butylbromide, a competitive antagonist of muscarinic acetylcholine receptor, on irinotecan-related cholinergic syndrome", publisher: "Cancer Chemotherapy and Pharmacology", year: 2019, url: "https://europepmc.org/abstract/MED/30564875", doi: "10.1007/s00280-018-3736-z", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-tr1-pre-emptive-pharmacogenomic-testing"],
  gaps: [
    "No graded guideline specific to irinotecan diarrhoea was found; the label and eviQ are the sources, and the 2018 ESMO diarrhoea guideline could not be read.",
    "The EU summary of product characteristics (Campto) and the liposomal irinotecan label were not read; their atropine and loperamide wording may differ.",
    "Whether atropine should be given routinely before every dose, or only after a first episode, is not settled in the sources read: the label says prophylactic or therapeutic use should be considered.",
    "The sacituzumab govitecan label itself was not read; its loperamide limit is reported here as eviQ states it.",
    "Which antibiotic to use is not specified; local febrile neutropenia policy applies.",
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

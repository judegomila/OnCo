import { protocol } from "./helpers";

/*
 * Monitoring phosphate, diet, phosphate binders and dose rules on the FGFR inhibitors erdafitinib, pemigatinib and
 * futibatinib.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - US prescribing information from DailyMed (SPL XML, full text): Balversa (erdafitinib, setid 2a8aa5c0, label
 *   version published 17 November 2025), Pemazyre (pemigatinib, 9e1f2222, 15 June 2026) and Lytgobi (futibatinib,
 *   0b1332a1, 9 November 2026).
 * - EU product information (EMA PDFs read with pdftotext): Balversa, Pemazyre and Lytgobi summaries of product
 *   characteristics, sections 4.2 and 4.4, as served by ema.europa.eu on the day of reading. The mmol/L values given
 *   here are the ones the Balversa EU text prints beside its mg/dL thresholds.
 * - Kommalapati et al., Cancers 2021, "FGFR Inhibitors in Oncology: Insight on the Management of Toxicities in
 *   Clinical Practice": full text, Europe PMC XML (PMC8231807). "This research received no external funding"; two
 *   authors declare research funding or advisory roles with makers of FGFR inhibitors outside the work.
 * - Subbiah and Verstovsek, Cell Reports Medicine 2023, review of adverse event management: full text, Europe PMC
 *   XML (PMC10591034). "This manuscript was sponsored by" Incyte, which makes pemigatinib, and its medical writing
 *   was funded by Incyte.
 * - Meric-Bernstam et al., Clinical Cancer Research 2024, pooled safety analysis of 469 patients given futibatinib
 *   with management recommendations: full text, Europe PMC XML (PMC11016890). Supported by Taiho Oncology, which
 *   makes futibatinib; the sponsor took part in the analysis and writing.
 *
 * Not found or not read: no ESMO, ASCO, MASCC or NCCN guideline on FGFR inhibitor hyperphosphataemia was found.
 * Schwartz and Darling (J Adv Pract Oncol 2024, funded by Incyte) and Wadsley et al. (Drugs in Context 2023, writing
 * funded by Incyte) were downloaded but not read closely and are not cited. Infigratinib is named in the reviews but
 * no current label was found for it on DailyMed, so it is not covered.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line
 * breaks joined and nothing else changed.
 */
export const hyperphosphataemiaOnFgfrInhibitors = protocol({
  id: "hyperphosphataemia-on-fgfr-inhibitors",
  name: "High phosphate on FGFR inhibitors (erdafitinib, pemigatinib, futibatinib): monitoring, diet, binders and dose rules",
  aka: ["erdafitinib hyperphosphataemia", "pemigatinib hyperphosphataemia", "futibatinib hyperphosphataemia", "FGFR inhibitor hyperphosphatemia", "high phosphate on Balversa", "high phosphate on Pemazyre", "high phosphate on Lytgobi", "low phosphate diet on FGFR inhibitors", "phosphate binders with FGFR inhibitors"],
  domain: "symptom-management",
  tldr: "Erdafitinib, pemigatinib and futibatinib raise blood phosphate in most people, usually in the first weeks. Phosphate is checked with blood tests. A rise is treated with a low-phosphate diet, tablets taken with food that bind phosphate, and sometimes a pause or a lower dose. Report cramps, tingling round the mouth or painful skin lumps. Your own team's plan comes first.",
  simple: "These cancer tablets make a salt called phosphate build up in the blood. Your team checks it with blood tests. If it is high you may be asked to eat less of some foods, take a tablet with meals that soaks up phosphate, or stop the cancer tablets for a while. Tell your team about muscle cramps, tingling round the mouth or sore lumps in the skin.",
  summary: "FGFR1 signalling in the proximal tubule, driven by FGF23, limits phosphate reabsorption; blocking it raises serum phosphate. It is an expected pharmacodynamic effect: the US labels report raised phosphate in 73% of patients on erdafitinib (median onset 16 days), 93% on pemigatinib (8 days) and 88% on futibatinib (5 days), with phosphate binders used in 24%, 33% and 77%. Prolonged hyperphosphataemia can cause soft tissue mineralisation, cutaneous calcinosis, non-uraemic calciphylaxis and vascular calcification.\n\nThe three labels set different thresholds. Diet: erdafitinib restricts phosphate to 600 to 800 mg a day in everyone (US) or from 5.5 mg/dL, 1.75 mmol/L (EU); pemigatinib starts a low-phosphate diet above 5.5 mg/dL; futibatinib starts diet and a binder at 5.5 mg/dL or more. Binder: erdafitinib and pemigatinib from 7 mg/dL (2.25 mmol/L). Dose: erdafitinib continues at 7 to 8.99 mg/dL, is withheld at 9 to 10 mg/dL (2.91 to 3.20 mmol/L) and restarted at the same dose, restarted one level lower after a value above 10 mg/dL, and stopped for good if 10 mg/dL or more lasts over 2 weeks. Pemigatinib is withheld if phosphate is not under 7 mg/dL within 2 weeks of starting a binder, or not 10 mg/dL or less within 1 week. Futibatinib is reduced, not withheld, above 7 mg/dL, and withheld above 10 mg/dL. Erdafitinib is also the only one whose dose is raised (8 to 9 mg) if phosphate is under 9.0 mg/dL at 14 to 21 days.\n\nChoice of binder is opinion: the EU erdafitinib text suggests a non-calcium binder such as sevelamer; an unfunded review (Kommalapati 2021) prefers lanthanum or calcium-based binders when there is diarrhoea and adds acetazolamide; an Incyte-sponsored review (Subbiah 2023) uses calcium carbonate unless calcium is raised. All EU texts warn of hypophosphataemia and say to stop binders and diet during treatment breaks. No independent guideline exists.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "home", "telephone-triage"],
  },
  population: "Adults taking erdafitinib (urothelial cancer with an FGFR3 alteration), pemigatinib (cholangiocarcinoma with an FGFR2 fusion or rearrangement; myeloid or lymphoid neoplasms with FGFR1 rearrangement) or futibatinib (cholangiocarcinoma with an FGFR2 fusion or rearrangement). Infigratinib and FGFR inhibitors in trials are not covered. People with kidney failure or a raised calcium need individual advice. Children are not covered; erdafitinib has its own warnings on bone growth.",
  trigger: "An FGFR inhibitor is about to be started, or a blood test during treatment shows a phosphate above the normal range.",
  steps: [
    {
      action: "Measure phosphate, calcium and kidney function before the first dose",
      why: "A starting value is needed to judge later rises, and the dose rules are written around phosphate levels.",
      source: "smpc-balversa",
      quote: "Phosphate concentrations should be assessed prior to the first dose and then monitored monthly.",
    },
    {
      action: "Explain before starting that a rise in phosphate is expected, and give written advice on a low-phosphate diet, with a dietitian where possible",
      why: "Phosphate is in most foods, especially processed food, meat, dairy and nuts, so cutting it down needs specific swaps and takes practice.",
      source: "kommalapati-2021",
      quote: "Patients on FGFR inhibitors should invariably be educated about dietary modifications, to reduce the risk of developing hyperphosphatemia",
    },
    {
      action: "Check phosphate throughout treatment: early in the first weeks, weekly while it is raised or being treated, and at least monthly once stable",
      why: "Phosphate usually rises within one to three weeks of starting, before any symptoms.",
      source: "label-futibatinib",
      quote: "Monitor for hyperphosphatemia throughout treatment.",
    },
    {
      action: "For erdafitinib, check phosphate at 14 to 21 days: raise the dose to 9 mg only if it is under 9.0 mg/dL (2.91 mmol/L) and there are no eye problems or other moderate side effects",
      why: "With this medicine a phosphate rise shows the drug is reaching its target, and the starting dose is deliberately adjusted on it.",
      source: "label-erdafitinib",
      quote: "Increase the dose of BALVERSA to 9 mg once daily if serum phosphate level is < 9.0 mg/dL and there are no ocular disorders or Grade 2 or greater adverse reactions.",
    },
    {
      action: "Avoid medicines and supplements that change phosphate, especially before the first erdafitinib phosphate check, and do not start vitamin D supplements on erdafitinib without advice",
      why: "They alter the phosphate reading used to set the dose, and vitamin D raises phosphate and calcium further.",
      source: "smpc-balversa",
      quote: "Supplementation with vitamin D in patients receiving erdafitinib is not recommended due to potential contribution to increased serum phosphate and calcium levels.",
    },
    {
      action: "Start a low-phosphate diet when phosphate goes above 5.5 mg/dL (1.75 mmol/L); on erdafitinib keep to 600 to 800 mg of phosphate a day",
      why: "Diet is the first step and may be enough for a small rise.",
      source: "label-pemigatinib",
      quote: "Monitor for hyperphosphatemia and initiate a low phosphate diet when serum phosphate level is > 5.5 mg/dL.",
    },
    {
      action: "Start a phosphate binder, taken with food, when phosphate is above 7 mg/dL (2.25 mmol/L), or from 5.5 mg/dL on futibatinib, and check phosphate weekly",
      why: "A binder holds on to phosphate in food so that it leaves the body in the stool; it only works if taken with meals.",
      source: "label-erdafitinib",
      quote: "If serum phosphate is above 7.0 mg/dL, consider adding an oral phosphate binder until serum phosphate level returns to <7.0 mg/dL.",
    },
    {
      action: "Choose the binder for the person: check calcium first, and take account of diarrhoea",
      why: "Calcium-based binders add calcium, which matters if calcium is already high; sevelamer and magnesium-based binders can worsen diarrhoea, which these medicines also cause. Sources differ on which to use first (see variants).",
      source: "kommalapati-2021",
      quote: "Similarly, lanthanum is preferred over calcium-based regimens in patients with baseline hypercalcemia and who are at high risk of vascular calcifications.",
    },
    {
      action: "Start the binder at the lowest dose and increase it according to the weekly phosphate result",
      why: "Too much binder with a strict diet can push phosphate too low, and high doses are hard to keep taking.",
      source: "subbiah-2023",
      quote: "When initiating phosphate binders, the lowest possible dose should be used to mitigate development of hypophosphatemia.",
    },
    {
      action: "Follow the dose table for that medicine once phosphate is above 7 mg/dL: erdafitinib continues with a binder and is withheld at 9 mg/dL (2.91 mmol/L) or more until it is back under 7 mg/dL",
      why: "Each medicine has its own rule, and they are not interchangeable (see variants).",
      source: "label-erdafitinib",
      quote: "Withhold BALVERSA with weekly reassessments until level returns to <7 mg/dL. Then restart BALVERSA at the same dose level.",
    },
    {
      action: "Withhold the medicine when phosphate is above 10 mg/dL (3.20 mmol/L), restart at a lower dose once it is 7 mg/dL or less, and stop it for good if it will not come down as that medicine's label specifies",
      why: "Phosphate this high for long risks calcium and phosphate depositing in skin, blood vessels and other tissues.",
      source: "label-futibatinib",
      quote: "Withhold LYTGOBI until phosphate is ≤7 mg/dL and resume LYTGOBI at the next lower dose.",
    },
    {
      action: "Ask about and look for painful skin lumps or sores, muscle cramps, numbness and tingling round the mouth, and act on them the same day",
      why: "Cramps and tingling suggest a sudden change in phosphate or a low calcium; painful skin lesions can be calcium deposits or calciphylaxis, which is serious.",
      source: "label-erdafitinib",
      quote: "Advise patients to immediately inform their healthcare provider of painful skin lesions or any symptoms related to acute change in phosphate levels such as muscle cramps, numbness, or tingling around the mouth",
    },
    {
      action: "Stop the binder and the diet during a break from the medicine, or if phosphate falls below normal",
      why: "Phosphate falls when the medicine is paused, and continuing to restrict it can cause low phosphate, with weakness and confusion when severe.",
      source: "smpc-pemazyre",
      quote: "Discontinuing phosphate-lowering therapy and diet should be considered during Pemazyre treatment breaks or if serum phosphate level falls below normal range.",
    },
    {
      action: "Keep the eye checks the label requires alongside the phosphate checks: an eye examination with a retinal scan (OCT) before starting and at the stated intervals, and urgently for any change in vision",
      why: "The same medicines can cause fluid under the retina, which is found on a scan before vision is lost; it is managed separately from phosphate.",
      source: "label-pemigatinib",
      quote: "Perform a comprehensive ophthalmological examination including OCT prior to initiation of PEMAZYRE and every 2 months for the first 6 months and every 3 months thereafter during treatment.",
    },
  ],
  bestInClass: {
    statement: "There is no independent guideline; the regulators' texts are the firmest source, and they differ by medicine and, for erdafitinib, between the US and the EU. All agree on monitoring phosphate throughout, a low-phosphate diet, a binder with food from 7 mg/dL (2.25 mmol/L) at the latest, weekly checks while raised, holding the medicine above 10 mg/dL (3.20 mmol/L) and restarting lower, and warning patients about cramps, tingling and painful skin lesions. They differ on when diet starts (everyone on erdafitinib in the US; from 5.5 mg/dL in the EU and for pemigatinib), when a binder starts (5.5 mg/dL for futibatinib, 7 mg/dL for the others), and what happens between 7 and 10 mg/dL (erdafitinib continues to 8.99 and is withheld from 9; pemigatinib continues for 2 weeks on a binder and is then withheld; futibatinib is reduced by one dose level). On the choice of binder the sources disagree and none is graded: the EU erdafitinib text suggests a non-calcium binder such as sevelamer carbonate; an unfunded review prefers lanthanum or calcium-based binders in people with diarrhoea and lanthanum when calcium is high; an Incyte-sponsored review uses calcium carbonate unless calcium is raised, when sevelamer is preferred. All three EU texts add that binders and diet should stop during treatment breaks or if phosphate falls below normal.",
    sources: ["label-erdafitinib", "label-pemigatinib", "label-futibatinib", "smpc-balversa", "smpc-pemazyre", "smpc-lytgobi", "kommalapati-2021", "subbiah-2023"],
  },
  variants: [
    {
      name: "Erdafitinib (Balversa): US and EU dose rules",
      differs: "Phosphate at 14 to 21 days decides whether the dose rises from 8 mg to 9 mg (only if under 9.0 mg/dL), then monthly checks. Under 7 mg/dL: continue. 7 to 8.99 mg/dL (2.25 to 2.90 mmol/L): continue, start a binder, and reduce the dose if it stays at 7 mg/dL or more for 2 months. 9 to 10 mg/dL (2.91 to 3.20 mmol/L): withhold with weekly checks until under 7 mg/dL, restart at the same dose, and reduce if it stays at 9 mg/dL or more for 1 month. Above 10 mg/dL: withhold, restart at the first reduced dose, and stop for good if 10 mg/dL or more lasts over 2 weeks. The US text restricts phosphate to 600 to 800 mg a day in all patients; the EU text does so from 5.5 mg/dL (1.75 mmol/L), names a non-calcium binder such as sevelamer carbonate for persistent rises, advises against vitamin D supplements, and stops the drug for good for a significant change in kidney function or grade 3 hypocalcaemia due to hyperphosphataemia.",
      evidence: "Regulatory texts. Raised phosphate in 73% of 479 patients (US pooled safety population), median onset 16 days; 24% took binders; vascular calcification in 0.2%. The EU text reports hyperphosphataemia as an adverse event in 78.5% and hypophosphataemia in 5.6%.",
      sources: ["label-erdafitinib", "smpc-balversa"],
    },
    {
      name: "Pemigatinib (Pemazyre) dose rules",
      differs: "Low-phosphate diet above 5.5 mg/dL. Above 7 and up to 10 mg/dL: start a binder and check weekly; withhold if not under 7 mg/dL within 2 weeks; restart at the same dose the first time and a lower dose for later recurrences. Above 10 mg/dL: binder and weekly checks; withhold if not 10 mg/dL or less within 1 week; restart at the next lower dose when under 7 mg/dL; stop for good if it recurs above 10 mg/dL after 2 dose reductions.",
      evidence: "US prescribing information: hyperphosphataemia by laboratory value in 93% of 635 patients, median onset 8 days, phosphate-lowering therapy in 33%. The EU text gives the same thresholds and adds closer follow-up of bone mineralisation in people with high or low phosphate.",
      sources: ["label-pemigatinib", "smpc-pemazyre"],
    },
    {
      name: "Futibatinib (Lytgobi) dose rules",
      differs: "Diet and a binder from 5.5 mg/dL, with weekly checks. Above 7 and up to 10 mg/dL: reduce to the next lower dose rather than withhold; reduce again if not 7 mg/dL or less within 2 weeks; withhold only if still not controlled 2 weeks after the second reduction. Above 10 mg/dL: withhold until 7 mg/dL or less and restart at the next lower dose; stop for good if not 7 mg/dL or less within 2 weeks after 2 interruptions and reductions.",
      evidence: "US prescribing information: hyperphosphataemia in 88% of 318 patients, median onset 5 days, binders in 77%. In the manufacturer's pooled analysis of 469 patients (supported by Taiho Oncology) hyperphosphataemia occurred in 82.1%, was grade 3 or higher in 18.8% by the trial's own phosphate-based grading, and was the commonest reason for dose modification (23.5%).",
      sources: ["label-futibatinib", "smpc-lytgobi", "meric-bernstam-2024"],
    },
    {
      name: "Choice of phosphate binder",
      differs: "Non-calcium binder such as sevelamer carbonate (EU erdafitinib text); lanthanum or calcium-based binders rather than sevelamer, magnesium-based or iron-based binders when the person has diarrhoea, and lanthanum rather than calcium when calcium is high or vascular calcification is a risk (Kommalapati 2021); calcium carbonate when calcium is normal and sevelamer when it is raised (Subbiah 2023).",
      evidence: "Opinion in each case, drawn from kidney disease practice; no trial has compared binders in people on FGFR inhibitors. Kommalapati 2021 had no external funding; Subbiah 2023 was sponsored by Incyte.",
      sources: ["smpc-balversa", "kommalapati-2021", "subbiah-2023"],
    },
    {
      name: "Acetazolamide added to a binder",
      differs: "A medicine that makes the kidney pass more phosphate, acetazolamide 250 mg two or three times a day, is added when a binder at full dose is not enough. It is to be avoided with advanced liver dysfunction, which matters in cholangiocarcinoma.",
      evidence: "Recommended in the Kommalapati review's table and mentioned in the Subbiah and Meric-Bernstam papers; none of the labels mentions it and no trial was cited.",
      sources: ["kommalapati-2021", "subbiah-2023", "meric-bernstam-2024"],
    },
    {
      name: "Earlier dose reduction than the label (review algorithm)",
      differs: "Dietary advice once phosphate rises more than 25% above baseline in the first week; a binder at 5.5 to 6.9 mg/dL for any FGFR inhibitor; dose reduction considered once phosphate is 7 mg/dL or more on two occasions, or 10 mg/dL or more once, despite diet and binders.",
      evidence: "Kommalapati 2021, an unfunded narrative review, which says there is no optimal cut-off for dose reduction. It predates the futibatinib label and differs from all three labels.",
      sources: ["kommalapati-2021"],
    },
  ],
  grades: [
    { claim: "Phosphate restricted to 600 to 800 mg a day and phosphate-raising agents avoided (erdafitinib, US)", grade: "Regulatory label; not graded", source: "label-erdafitinib", quote: "Restrict dietary phosphate intake (600–800 mg daily) and avoid concomitant use of agents that may increase serum phosphate levels." },
    { claim: "Erdafitinib stopped for good if phosphate of 10 mg/dL or more lasts over 2 weeks", grade: "Regulatory label; not graded", source: "label-erdafitinib", quote: "If hyperphosphatemia (≥10 mg/dL) for >2 weeks, discontinue BALVERSA permanently." },
    { claim: "A non-calcium binder for persistently raised phosphate (erdafitinib, EU)", grade: "Regulatory product information; not graded", source: "smpc-balversa", quote: "adding a non-calcium containing phosphate binder (e.g., sevelamer carbonate) should be considered as needed" },
    { claim: "Pemigatinib withheld if phosphate is not under 7 mg/dL within 2 weeks of a binder", grade: "Regulatory label; not graded", source: "label-pemigatinib", quote: "Withhold PEMAZYRE if levels are not < 7 mg/dL within 2 weeks of starting phosphate lowering therapy." },
    { claim: "Futibatinib: diet and binder from 5.5 mg/dL", grade: "Regulatory label; not graded", source: "label-futibatinib", quote: "Initiate a low phosphate diet and phosphate lowering therapy when serum phosphate level is ≥5.5 mg/dL." },
    { claim: "Futibatinib: binder from 5.5 mg/dL (EU)", grade: "Regulatory product information; not graded", source: "smpc-lytgobi", quote: "A phosphate-lowering therapy should be initiated when serum phosphate level is ≥ 5.5 mg/dL." },
    { claim: "Stop binders and diet if treatment stops or phosphate falls below normal (futibatinib, EU)", grade: "Regulatory product information; not graded", source: "smpc-lytgobi", quote: "If Lytgobi treatment is stopped or serum phosphate level falls below normal range, phosphate-lowering therapy and diet should be discontinued." },
    { claim: "Closer follow-up of bone mineralisation with high or low phosphate (pemigatinib, EU)", grade: "Regulatory product information; not graded", source: "smpc-pemazyre", quote: "For patients presenting with hyperphosphataemia or hypophosphataemia, additional close monitoring and follow-up is recommended regarding dysregulation of bone mineralization." },
    { claim: "Lanthanum and calcium-based binders preferred in people with diarrhoea", grade: "Narrative review, no external funding; not graded", source: "kommalapati-2021", quote: "In patients who also have FGFR-inhibitor-associated diarrhea, lanthanum and calcium-based regimens are preferred over magnesium-based regimens, sevelamer, and sucroferric oxyhydroxide as the latter can exacerbate the diarrhea caused by FGFR inhibitors." },
    { claim: "Sevelamer when calcium is also raised, calcium carbonate otherwise", grade: "Narrative review sponsored by Incyte; not graded", source: "subbiah-2023", quote: "If a patient has hypercalcemia and hyperphosphatemia, then sevelamer is preferred. If a patient has only hyperphosphatemia with no elevation in calcium levels, then calcium carbonate may be used." },
    { claim: "No agreed phosphate cut-off for reducing the dose", grade: "Narrative review, no external funding; not graded", source: "kommalapati-2021", quote: "Though there is no optimal cut off phosphate values to consider a dose reduction of the FGFR inhibitor, dose reduction should be considered once the phosphate levels reach ≥7 mg/dL (on two separate occasions) or one episode of ≥10 mg/dL despite optimization of diet and phosphate binding agents." },
    { claim: "Eye examinations monthly for 4 months then every 3 months (erdafitinib)", grade: "Regulatory label; not graded", source: "label-erdafitinib", quote: "Perform monthly ophthalmological examinations during the first 4 months of treatment and every 3 months afterwards, and urgently at any time for visual symptoms." },
  ],
  sources: [
    {
      key: "label-erdafitinib",
      label: "Balversa (erdafitinib) tablets: US prescribing information, sections 2.2, 2.3, 5.1, 5.2 and 7",
      publisher: "Janssen, via DailyMed (US National Library of Medicine)",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2a8aa5c0-6c92-4566-8c45-e8f4d1fc20ee",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-pemigatinib",
      label: "Pemazyre (pemigatinib) tablets: US prescribing information, sections 2.3, 5.1 and 5.2",
      publisher: "Incyte, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9e1f2222-1d89-4e63-989c-ccebe2ab1eb4",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-futibatinib",
      label: "Lytgobi (futibatinib) tablets: US prescribing information, sections 2.3, 5.1 and 5.2",
      publisher: "Taiho, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0b1332a1-0581-4707-9bf6-1eccfa39bef4",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "smpc-balversa",
      label: "Balversa: EU summary of product characteristics, sections 4.2 and 4.4 (the text served by the EMA on the day it was read)",
      publisher: "European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/balversa-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "smpc-pemazyre",
      label: "Pemazyre: EU summary of product characteristics, sections 4.2 and 4.4 (the text served by the EMA on the day it was read)",
      publisher: "European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/pemazyre-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "smpc-lytgobi",
      label: "Lytgobi: EU summary of product characteristics, sections 4.2 and 4.4 (the text served by the EMA on the day it was read)",
      publisher: "European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/lytgobi-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "kommalapati-2021",
      label: "FGFR Inhibitors in Oncology: Insight on the Management of Toxicities in Clinical Practice",
      publisher: "Cancers (Kommalapati et al.); no external funding",
      year: 2021,
      url: "https://doi.org/10.3390/cancers13122968",
      doi: "10.3390/cancers13122968",
      gradingScheme: "Narrative review; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "subbiah-2023",
      label: "Clinical development and management of adverse events associated with FGFR inhibitors (sponsored by Incyte; medical writing funded by Incyte)",
      publisher: "Cell Reports Medicine (Subbiah and Verstovsek); sponsored by Incyte Corporation",
      year: 2023,
      url: "https://doi.org/10.1016/j.xcrm.2023.101204",
      doi: "10.1016/j.xcrm.2023.101204",
      gradingScheme: "Narrative review; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "meric-bernstam-2024",
      label: "Safety Profile and Adverse Event Management for Futibatinib, An Irreversible FGFR1-4 Inhibitor: Pooled Safety Analysis of 469 Patients (supported by Taiho Oncology, which took part in the analysis and writing)",
      publisher: "Clinical Cancer Research (Meric-Bernstam et al.); supported by Taiho Oncology",
      year: 2024,
      url: "https://doi.org/10.1158/1078-0432.CCR-23-2646",
      doi: "10.1158/1078-0432.CCR-23-2646",
      gradingScheme: "Pooled trial safety analysis with recommendations based on investigators' clinical expertise; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
  ],
  drugs: ["erdafitinib", "pemigatinib", "futibatinib"],
  targets: ["fgfr1", "fgfr2"],
  pathways: ["fgfr-signalling"],
  terms: [],
  related: [],
  gaps: [
    "No ESMO, ASCO, MASCC or NCCN guideline on high phosphate from FGFR inhibitors was found. Outside the regulators' texts, the management advice is narrative review and expert opinion, most of it sponsored by a manufacturer.",
    "No trial has compared phosphate binders, or tested acetazolamide, in people on FGFR inhibitors; the sources give three different first choices.",
    "The US labels for pemigatinib and futibatinib say to monitor for hyperphosphataemia but give no schedule beyond weekly checks once it is raised; how often to test in the first weeks is left to the clinician.",
    "Labels print thresholds in mg/dL. The mmol/L values here are those printed in the EU erdafitinib text (5.5 mg/dL as 1.75, 7.00 as 2.25, 9.00 as 2.91, 10.00 as 3.20 mmol/L); the EU pemigatinib and futibatinib texts print mg/dL only.",
    "How much a low-phosphate diet achieves on its own in this setting has not been measured; the dietary advice is carried over from kidney disease. The review's examples of food swaps were read but are not reproduced here.",
    "Whether a higher phosphate predicts a better response, and so whether aggressive lowering matters to cancer control, is debated in the papers found by title and was not assessed here.",
    "Infigratinib is named in the reviews but no current DailyMed label was found for it, so no dose rule is given.",
    "The eye step is a pointer only: the detailed eye rules (central serous retinopathy and retinal pigment epithelial detachment) differ by medicine and are in each label; no protocol here covers them yet.",
    "The year given for the three EU product information documents is the year they were read.",
  ],
});

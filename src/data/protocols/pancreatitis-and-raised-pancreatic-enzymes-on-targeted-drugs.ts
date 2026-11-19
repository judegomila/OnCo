import { protocol } from "./helpers";

/*
 * Pancreatitis and raised pancreatic enzymes (lipase, amylase) on four BCR::ABL1 kinase inhibitors: asciminib,
 * ponatinib, nilotinib and bosutinib. What each label asks to be measured, and its hold, reduce and stop rules, with
 * the US label and the EU SmPC side by side.
 *
 * Written 18 November 2026. Every source was read as raw text, and every quote was checked by script (whitespace and
 * line-break hyphenation normalised, nothing else).
 *
 * What was read, and how:
 * - US labels, DailyMed SPL XML fetched with curl and stripped to text: Scemblix (asciminib, Novartis; SPL effective
 *   22 September 2026), Iclusig (ponatinib, Takeda; 14 August 2026), Tasigna (nilotinib, Novartis; 16 December 2025)
 *   and Bosulif (bosutinib, Pfizer; 10 March 2026). Only the originator labels were read; the other nilotinib and
 *   bosutinib products on DailyMed (generics, Danziten, Cavhanza) were not.
 * - EU SmPCs with their package leaflets, the EMA product-information PDFs through pdftotext -layout: Scemblix (PDF
 *   dated 3 August 2026), Iclusig (5 October 2026), Tasigna (8 December 2025) and Bosulif (25 December 2025). The
 *   SmPCs print no date of revision of the text, so the PDF date is given.
 * - European LeukemiaNet recommendations for the management and avoidance of adverse events of treatment in chronic
 *   myeloid leukaemia (Steegmann et al., Leukemia 2016): full text, Europe PMC full-text XML (PMC4991363), fetched
 *   again for this page. No funding statement was found in the text; its authors declare honoraria and research
 *   funding from Ariad, Bristol-Myers Squibb, Novartis and Pfizer, the makers of the medicines it covers. A Europe
 *   PMC title search on 18 November 2026 found no later ELN paper on adverse events.
 * - ELN 2020 recommendations for treating chronic myeloid leukaemia (Hochhaus et al.): full text, Europe PMC
 *   full-text XML (PMC7214240).
 * - 2025 ELN recommendations for the management of chronic myeloid leukaemia (Apperley et al.): full text, the
 *   open-access article page at nature.com (Europe PMC's full-text endpoint returned an error and the PMC page a bot
 *   check, which was not bypassed). It supersedes ELN 2020; it mentions pancreatitis once (nilotinib inadvisable) and
 *   gives no management rule.
 * - NCI CTCAE version 5.0 (27 November 2017) and version 6.0 (22 July 2025): the NCI PDFs through pdftotext.
 * - NICE NG104, Pancreatitis (published 5 September 2018, last updated 16 December 2020): the recommendations page,
 *   fetched raw and stripped to text. It is a general guideline, not written for cancer treatment, and is used only
 *   for one recommendation on looking for a cause.
 *
 * Not covered, and why (see `gaps`): pancreatitis on immune checkpoint inhibitors, asparaginase-associated
 * pancreatitis, and other products whose labels carry a pancreatitis warning but were not read for this page.
 *
 * Every DOI was resolved through Europe PMC and its title checked.
 *
 * Second reader, 18 November 2026. An independent reader fetched all fourteen sources again into a separate folder:
 * the four DailyMed SPL XML files (same effective dates and SPL versions), the four EMA PDFs (converted with pdftotext
 * both with and without -layout, so that each table row could be read both ways; the layout text was identical to the
 * writer's), both ELN papers from Europe PMC full-text XML, ELN 2025 from nature.com, both CTCAE PDFs and the NICE
 * page. The three DOIs were resolved through Crossref and the titles checked. All 31 quotes matched by script against
 * the reader's own copies. 137 claims were checked: 8 said more than the source and were reworded, none was wrong in a
 * figure, threshold or dose. What changed: the first step no longer says to ask about past pancreatitis under a quote
 * that does not say it; the step on choosing a medicine now quotes the 2025 ELN recommendations, the current edition,
 * and gives the 2020 sentence on bosutinib as the earlier edition's; the ponatinib percentages now say that the label's
 * tables print them under "Pancreatitis/lipase elevation"; the NICE step lost a grade field that was not a printed
 * grade and an instruction NICE does not give; the shared features in `bestInClass` no longer include bosutinib, whose
 * labels set no lipase schedule; and the asciminib rule now attaches the diagnostic tests to the row they belong to.
 */
export const pancreatitisAndRaisedPancreaticEnzymesOnTargetedDrugs = protocol({
  id: "pancreatitis-and-raised-pancreatic-enzymes-on-targeted-drugs",
  name: "Pancreatitis and raised pancreatic enzymes on asciminib, ponatinib, nilotinib and bosutinib: monitoring, hold and stop rules",
  aka: [
    "raised lipase on TKIs",
    "raised amylase on TKIs",
    "lipase monitoring on asciminib",
    "lipase monitoring on ponatinib",
    "pancreatitis on ponatinib",
    "pancreatitis on nilotinib",
    "pancreatic toxicity of BCR::ABL1 inhibitors",
    "pancreatic enzyme elevation on CML treatment",
  ],
  domain: "symptom-management",
  tldr: "Asciminib, ponatinib, nilotinib and bosutinib can raise two pancreas enzymes in the blood, lipase and amylase, and can sometimes inflame the pancreas (pancreatitis). Blood tests look for this: monthly on asciminib and nilotinib, and every 2 weeks for the first 2 months on ponatinib. Tell your team right away about sudden or severe stomach pain, feeling sick or being sick.",
  simple: "Some leukaemia tablets can upset the pancreas, a gland behind the stomach. You may feel nothing, so your team checks your blood. If the results are high, they may pause your tablets, lower the dose or change the medicine. Tell your team right away if you get sudden or bad stomach pain, feel sick or are sick. Your own team's plan comes first.",
  summary: "Scope: adults taking asciminib, ponatinib, nilotinib or bosutinib. The rules are the labels' own; a unit's protocol and the treating haematologist's judgement come first.\n\nAsciminib (US label and EU SmPC agree): assess lipase and amylase monthly, or as clinically indicated, and more often after past pancreatitis. Asymptomatic amylase or lipase above 2 x ULN: withhold until below 1.5 x ULN, then resume at a reduced dose; permanently discontinue if it recurs at the reduced dose; if it does not resolve, permanently discontinue and perform diagnostic tests to exclude pancreatitis. With abdominal symptoms: temporarily withhold and consider tests to exclude pancreatitis. In the US label's 556 patients, enzymes rose in 20% (grade 3 in 7%, grade 4 in 2%) and pancreatitis occurred in 2%.\n\nPonatinib: lipase every 2 weeks for the first 2 months, then monthly (US) or periodically (EU). The two labels differ. US: lipase above 1 to 1.5 x ULN, consider interrupting; above 1.5 to 2 x ULN, or 2 to 5 x ULN without symptoms, or asymptomatic radiologic pancreatitis, interrupt until below 1.5 x ULN and resume at the next lower dose; lipase 2 to 5 x ULN with symptoms, symptomatic grade 3 pancreatitis, or above 5 x ULN without symptoms, interrupt until symptoms resolve and lipase is grade 0 or 1, then resume at the next lower dose; symptomatic pancreatitis with lipase above 5 x ULN, discontinue. EU: at grade 2, continue at the same dose; for asymptomatic lipase above 5 x ULN or grade 3 pancreatitis, withhold and resume one dose level lower (45 to 30 to 15 mg), and at 15 mg discontinuation should be considered; grade 4, discontinue. The US label's warning says pancreatitis occurred in 26% to 34% of patients across three trials, serious or severe (grade 3 or 4) in 15% to 17%; its adverse reaction tables print the same figures for two of the trials under \"Pancreatitis/lipase elevation\", a term it does not define, so the count is not clinical pancreatitis alone.\n\nNilotinib: lipase monthly or as clinically indicated. US: for lipase or amylase of grade 3 or above in adults, withhold and resume at 400 mg once daily when grade 1 or less. EU: for grade 3 to 4 lipase, reduce to 400 mg once daily or interrupt. Bosutinib: the EU SmPC asks for interruption, and tests to be considered, when raised lipase comes with abdominal symptoms; the US label has no pancreatitis warning and no lipase schedule.\n\nThe ELN's 2016 consensus (not graded) recommends withholding for asymptomatic grade 3 enzymes, a CT scan where there are symptoms, stopping nilotinib for grade 3 pancreatitis or a positive scan, and stopping any TKI for grade 4. The ELN's 2025 recommendations call nilotinib inadvisable after past pancreatitis; the 2020 edition also preferred TKIs other than bosutinib. CTCAE version 5.0 puts grade 3 lipase at above 2 to 5 x ULN with signs or symptoms, or above 5 x ULN without; version 6.0 moves that lower boundary from 2 to 3 x ULN.",
  asOf: "2026-11-18",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "telephone-triage", "acute-oncology-service", "emergency-department", "home"],
  },
  population: "Adults taking asciminib, ponatinib, nilotinib or bosutinib, which are licensed for chronic myeloid leukaemia and, for ponatinib, Philadelphia chromosome-positive acute lymphoblastic leukaemia. The rules are those of the US labels and EU SmPCs read for this page. Children are not covered: the nilotinib labels, the bosutinib labels and the EU ponatinib SmPC carry separate paediatric dose rules that this page does not set out. Not covered: pancreatitis on immune checkpoint inhibitors, pancreatitis after asparaginase, and pancreatitis driven by raised triglycerides on bexarotene or lorlatinib, which has its own protocol.",
  trigger: "Starting one of the four medicines (note any past pancreatitis and plan the blood tests); each scheduled lipase or amylase result; any result above the upper limit of normal; or abdominal pain, nausea or vomiting during treatment.",
  steps: [
    {
      action: "On asciminib, monitor lipase and amylase more often in a person who has had pancreatitis",
      why: "Both asciminib labels ask for more frequent monitoring after past pancreatitis. No label read tells the prescriber to ask about it in so many words; the US patient leaflets for asciminib, ponatinib and nilotinib ask patients to tell their healthcare provider, before taking the medicine, if they have had pancreatitis. The US ponatinib label says to consider additional lipase monitoring where there is a history of pancreatitis or alcohol abuse, and the EU SmPC recommends caution in the same people. The US nilotinib label says people who have had pancreatitis may be at greater risk of raised lipase, and the EU SmPCs of nilotinib and bosutinib recommend caution. No label read says how much more often to test, and none lists past pancreatitis as a contraindication.",
      source: "label-asciminib",
      quote: "Perform more frequent monitoring in patients with a history of pancreatitis.",
    },
    {
      action: "Where there is a choice of medicine for a person who has had pancreatitis, take into account that the ELN's 2025 recommendations call nilotinib inadvisable",
      why: "The sentence comes from the 2025 paper's section on choosing a first medicine, and it gives no reason there. The 2020 edition, which the 2025 paper revises, gave one: raised lipase, sometimes with pancreatitis, has been reported after nilotinib and bosutinib, so in people with a history of pancreatitis other TKIs are preferred. It also called that history a contraindication to nilotinib. The 2025 paper does not repeat the sentence on bosutinib and pancreatitis. The labels are less strict: they ask for caution or closer monitoring.",
      source: "eln-2025",
      quote: "Nilotinib is inadvisable in patients with diabetes mellitus, high or very high cardiovascular risk including a history of vaso-occlusive events (VOEs) or pancreatitis.",
    },
    {
      action: "On asciminib, assess serum lipase and amylase monthly, or as clinically indicated",
      why: "The EU SmPC says the same. In the 556 patients behind the US label, lipase and amylase rose in 20% and pancreatitis occurred in 2%. The labels also ask for patients to be monitored for signs and symptoms of pancreatic toxicity.",
      source: "label-asciminib",
      quote: "Assess serum lipase and amylase levels monthly during treatment with SCEMBLIX, or as clinically indicated.",
    },
    {
      action: "On ponatinib, monitor serum lipase every 2 weeks for the first 2 months, then monthly (US label) or periodically (EU SmPC)",
      why: "The EU SmPC says the frequency of pancreatitis is greater in the first 2 months of use. In the US label the median time to onset was 8 days in PhALLCON, 1 month in OPTIC and 29 days in PACE. Neither label asks for amylase.",
      source: "label-ponatinib",
      quote: "Monitor serum lipase every 2 weeks for the first 2 months and then monthly thereafter or as clinically indicated.",
    },
    {
      action: "On nilotinib, test serum lipase monthly or as clinically indicated",
      why: "The US label says nilotinib can cause increases in serum lipase; the EU SmPC gives the same monthly test. Neither bosutinib label sets a schedule for lipase: the EU SmPC says only that elevation in serum lipase has been observed.",
      source: "label-nilotinib",
      quote: "Test serum lipase levels monthly or as clinically indicated.",
    },
    {
      action: "If raised lipase or amylase comes with abdominal symptoms, withhold the medicine and consider tests to exclude pancreatitis",
      why: "The quote is the US asciminib label; the EU SmPC matches it. The nilotinib labels (US and EU) and the EU bosutinib SmPC say to interrupt and to consider diagnostic measures to exclude pancreatitis. The US ponatinib label says to evaluate for pancreatitis, and the EU SmPC that ponatinib should be withheld and the patient evaluated for evidence of pancreatitis. The labels give no reason beyond excluding pancreatitis.",
      source: "label-asciminib",
      quote: "If lipase and amylase elevation are accompanied by abdominal symptoms, temporarily withhold SCEMBLIX and consider appropriate diagnostic tests to exclude pancreatitis",
    },
    {
      action: "Treat suspected pancreatitis as needing action: the advice of a gastroenterologist or surgeon may be needed, and the ELN recommends a CT scan where there are symptoms",
      why: "The ELN panel notes that lipase or amylase may rise without evidence of pancreatitis, with all TKIs, and asks for high awareness on nilotinib and ponatinib. It also says that with abdominal pain, gastric and pancreatic problems must be ruled out. This is a consensus of experts, not graded.",
      source: "eln-ae-2016",
      quote: "Suspicion of pancreatitis is always a call for action, and the advice of an appropriate gastroenterologist or surgeon may be needed.",
    },
    {
      action: "Where gallstones and alcohol have been excluded as the cause of acute pancreatitis, investigate other possible causes, which include prescription medicines and raised blood fats (NICE, for England)",
      why: "NICE lists prescription drugs as one of several other possible causes to investigate. This is general guidance for anyone with acute pancreatitis, it was not written for people on cancer treatment, and it names no medicine. NICE also says not to assume that pancreatitis is alcohol-related just because the person drinks alcohol.",
      source: "nice-ng104",
      quote: "If gallstones and alcohol have been excluded as potential causes of a person's acute pancreatitis, investigate other possible causes such as: metabolic causes (such as hypercalcaemia or hyperlipidaemia) prescription drugs",
    },
    {
      action: "On asciminib, for amylase or lipase above 2 x ULN without symptoms: withhold until below 1.5 x ULN, then resume at a reduced dose; stop for good if it recurs at the reduced dose; if it does not resolve, stop for good and perform tests to exclude pancreatitis",
      why: "The US label and the EU SmPC give the same rule. The reduced dose is 40 mg once daily or 20 mg twice daily, or 160 mg twice daily for people on the 200 mg twice daily dose used for the T315I mutation. Where the rise does not resolve, both labels say to permanently discontinue and to perform diagnostic tests to exclude pancreatitis. Neither gives a reason.",
      source: "label-asciminib",
      quote: "Withhold SCEMBLIX until resolved to less than 1.5 x ULN. If resolved: Resume SCEMBLIX at reduced dose. If events reoccur at reduced dose, permanently discontinue SCEMBLIX.",
    },
    {
      action: "On ponatinib, for lipase above 1.5 to 2 x ULN, or above 2 to 5 x ULN without symptoms: interrupt until below 1.5 x ULN and resume at the next lower dose (US label); continue at the same dose (EU SmPC)",
      why: "The two labels differ here. The US label also includes pancreatitis seen on a scan without symptoms in this row, and for a smaller rise (above 1 to 1.5 x ULN) says to consider interrupting until resolution and then to resume at the same dose. The EU SmPC's table starts at grade 2, where it says to continue at the same dose. Neither label gives a reason for its choice.",
      source: "label-ponatinib",
      quote: "Interrupt ICLUSIG until Grade 0 or 1 (less than 1.5 times ULN), then resume at next lower dose.",
    },
    {
      action: "On ponatinib, for lipase above 5 x ULN without symptoms, lipase above 2 to 5 x ULN with symptoms, or symptomatic grade 3 pancreatitis: interrupt until symptoms have gone and lipase is back to grade 0 or 1, then resume at the next lower dose (US label)",
      why: "The EU SmPC splits this into two rows. For asymptomatic lipase above 5 x ULN it says to withhold and resume one dose level lower (30 mg after 45 mg, 15 mg after 30 mg) after recovery to grade 1 or less, below 1.5 x ULN. For grade 3 pancreatitis or a symptomatic grade 3 rise it says to withhold until symptoms have completely resolved and lipase is below grade 2. In both rows it says that at 15 mg discontinuation should be considered. The US label's dose reductions for chronic-phase CML are 30 mg, then 15 mg, then 10 mg once daily, and it says to permanently discontinue in people unable to tolerate 10 mg.",
      source: "label-ponatinib",
      quote: "Interrupt ICLUSIG until complete resolution of symptoms and after recovery of lipase elevation Grade 0 or 1, then resume at next lower dose.",
    },
    {
      action: "On ponatinib, discontinue for symptomatic pancreatitis with lipase above 5 x ULN",
      why: "The EU SmPC says the same in its own terms: discontinue for grade 4 pancreatitis or a grade 4 rise in lipase, which it defines as above 5 x the institution's upper limit of normal with symptoms. Neither label uses the word permanently here, and neither gives a reason.",
      source: "label-ponatinib",
      quote: "Symptomatic pancreatitis and serum lipase greater than 5 times ULN Discontinue ICLUSIG.",
    },
    {
      action: "On nilotinib, for lipase or amylase of grade 3 or above in an adult: withhold and monitor, and resume at 400 mg once daily when it is back to grade 1 or less (US label)",
      why: "The EU SmPC differs: for grade 3 to 4 lipase it says the adult dose should be reduced to 400 mg once daily or interrupted, and it does not name amylase. Neither label states the multiples of the upper limit of normal it means by grade 3, and neither gives a reason.",
      source: "label-nilotinib",
      quote: "1. Withhold Tasigna, and monitor serum lipase or amylase. 2. Resume treatment at 400 mg once daily if serum lipase or amylase returns to less than or equal to Grade 1.",
    },
    {
      action: "On bosutinib, interrupt treatment if raised lipase comes with abdominal symptoms, and consider tests to exclude pancreatitis (EU SmPC)",
      why: "The EU SmPC also recommends caution in people who have had pancreatitis. The US label has no warning on pancreatitis or lipase; it lists pancreatitis among adverse reactions in 1% to less than 10% of patients, under a term that also counts raised pancreatic enzymes. Its general rule for other clinically significant, moderate or severe non-haematological toxicity is to withhold until the toxicity has resolved and then to consider resuming at a dose reduced by 100 mg once daily; the EU SmPC has a matching general rule.",
      source: "smpc-bosutinib",
      quote: "In case lipase elevations are accompanied by abdominal symptoms, bosutinib should be interrupted and appropriate diagnostic measures considered to exclude pancreatitis",
    },
    {
      action: "Where the ELN's 2016 advice is followed for an asymptomatic grade 3 rise in lipase or amylase: withhold, resume at a lower dose when the grade is below 2, and stop if full recovery takes more than 4 weeks",
      why: "This is the expert panel's recommended approach; the paper does not mention asciminib. It differs from the labels: the asciminib labels act at above 2 x ULN and the US ponatinib label at above 1.5 x ULN. For symptoms the panel says that if the CT scan is positive or the pancreatitis is grade 3, stopping nilotinib is mandatory, while for ponatinib withholding and resuming at a lower dose could be reasonable; for grade 4 pancreatitis it says stopping is mandatory whichever TKI is being taken.",
      source: "eln-ae-2016",
      quote: "If the patient is asymptomatic but with grade 3 lipase/amylase elevation, withholding therapy and resuming at a lower dose when the grade is <2 is the recommended approach.",
    },
    {
      action: "On ponatinib, manage severe or very severe hypertriglyceridaemia appropriately (EU SmPC)",
      why: "The EU SmPC says this is to reduce the risk of pancreatitis. It does not say how, or give a triglyceride figure. The US label has no matching sentence.",
      source: "smpc-ponatinib",
      quote: "Patients with severe or very severe hypertriglyceridemia should be appropriately managed to reduce the risk of pancreatitis.",
    },
    {
      action: "Tell the patient that pancreatitis can happen, what it can feel like (nausea, vomiting, severe abdominal pain or discomfort), and to report these symptoms promptly",
      why: "The US patient leaflets for asciminib, ponatinib and nilotinib say to tell the healthcare provider right away. The US nilotinib label asks prescribers to advise patients to seek immediate medical attention for sudden stomach area pain with nausea and vomiting. The EU ponatinib leaflet says to stop taking it and contact a doctor or go to the nearest emergency department immediately for severe pain in the stomach and back.",
      source: "label-asciminib",
      quote: "Inform patients of the possibility of developing pancreatitis that may be accompanied by nausea, vomiting, severe abdominal pain, or abdominal discomfort, and to promptly report these symptoms",
    },
  ],
  bestInClass: {
    statement: "No graded guideline covers this problem; the labels are the source for each medicine's rule, and they differ from one another and, for ponatinib, nilotinib and bosutinib, between the United States and the European Union. What the asciminib, ponatinib and nilotinib labels share is lipase tested on a schedule (monthly on asciminib, with amylase, and on nilotinib; every 2 weeks for the first 2 months on ponatinib); neither bosutinib label sets one. When a raised result comes with abdominal symptoms, the asciminib and nilotinib labels, the EU ponatinib SmPC and the EU bosutinib SmPC say to withhold or interrupt the medicine while pancreatitis is looked for; the US ponatinib label says to evaluate for pancreatitis and the US bosutinib label says nothing. Where they differ is the result that triggers a hold without symptoms: above 2 x ULN on asciminib (US and EU), above 1.5 x ULN on ponatinib in the US label against above 5 x ULN in the EU SmPC, and grade 3 on nilotinib. The ELN's 2016 expert consensus, which is not graded and does not mention asciminib, withholds at asymptomatic grade 3 and asks for a CT scan where there are symptoms. The US labels, the EU SmPCs and the ELN's advice are all on this page; none is ranked above the others.",
    sources: ["label-asciminib", "smpc-asciminib", "label-ponatinib", "smpc-ponatinib", "label-nilotinib", "smpc-nilotinib", "label-bosutinib", "smpc-bosutinib", "eln-ae-2016"],
  },
  variants: [
    {
      name: "Ponatinib: the US label against the EU SmPC",
      differs: "Monitoring after the first 2 months is monthly in the US label and 'periodically' in the EU SmPC. At grade 2 (lipase above 1.5 to 2 x ULN, or above 2 to 5 x ULN without symptoms) the US label interrupts and resumes at the next lower dose, and the EU SmPC continues at the same dose. For lipase above 1 to 1.5 x ULN the US label says to consider interrupting; the EU table has no row for it. For lipase above 5 x ULN without symptoms both withhold and step the dose down, and the EU SmPC adds that at 15 mg discontinuation should be considered. For symptomatic pancreatitis with lipase above 5 x ULN both discontinue. Only the EU SmPC asks for severe or very severe hypertriglyceridaemia to be managed, and only the EU SmPC carries paediatric tables.",
      evidence: "Regulatory labels; not graded. US label: pancreatitis in 34% of 163 patients in PhALLCON, 29% of 94 in OPTIC and 26% of 449 in PACE, serious or severe (grade 3 or 4) in 15%, 16% and 17%. Its adverse reaction tables print the PhALLCON and OPTIC figures under \"Pancreatitis/lipase elevation\", which it does not define, and it counts clinical pancreatitis that led to a dose change separately (7 patients in PhALLCON, 2 in OPTIC and 28 cases in PACE). The US table is based on CTCAE version 5.0.",
      sources: ["label-ponatinib", "smpc-ponatinib"],
    },
    {
      name: "Nilotinib: the US label against the EU SmPC",
      differs: "For grade 3 or higher, the US label names lipase or amylase and withholds, resuming at 400 mg once daily at grade 1 or less. The EU SmPC names lipase only and says the dose should be reduced to 400 mg once daily or interrupted. Both test lipase monthly or as clinically indicated, and both interrupt and consider diagnostics when a rise comes with abdominal symptoms.",
      evidence: "Regulatory labels; not graded. Neither dose rule states which CTCAE version, or which multiple of the upper limit of normal, defines its grade 3.",
      sources: ["label-nilotinib", "smpc-nilotinib"],
    },
    {
      name: "Bosutinib: a warning in the EU SmPC and none in the US label",
      differs: "The EU SmPC has a 'Serum lipase' warning: caution after past pancreatitis, and interruption with diagnostic measures considered when a rise comes with abdominal symptoms. The US label has no pancreatitis or lipase warning and no lipase schedule; it lists pancreatitis as an adverse reaction and reports lipase increased among laboratory abnormalities (36% of adults). Both have a general rule for clinically significant moderate or severe non-haematological toxicity.",
      evidence: "Regulatory labels; not graded.",
      sources: ["label-bosutinib", "smpc-bosutinib"],
    },
    {
      name: "The ELN's 2016 expert advice against the labels",
      differs: "The ELN withholds at an asymptomatic grade 3 rise in lipase or amylase, resumes at a lower dose when the grade is below 2 and stops if full recovery takes more than 4 weeks. The asciminib labels act earlier (above 2 x ULN) and the US ponatinib label earlier still (above 1.5 x ULN); no label sets a 4-week limit. For symptoms the ELN recommends a CT scan, which no label names; the labels say diagnostic tests or evaluation. The ELN makes stopping nilotinib mandatory for grade 3 pancreatitis or a positive CT scan; the nilotinib labels say to interrupt and consider diagnostics and give no stop rule for pancreatitis itself.",
      evidence: "Expert consensus by email and meetings in 2014 and 2015; not graded. Its authors declare honoraria and research funding from Ariad, Bristol-Myers Squibb, Novartis and Pfizer. It reports lipase rises in 29 to 47% of people on nilotinib (grade 3 to 4 in 6 to 18%) with pancreatitis in 0.9% to 2%.",
      sources: ["eln-ae-2016", "label-asciminib", "label-ponatinib", "label-nilotinib"],
    },
    {
      name: "A history of pancreatitis: avoid the medicine, or monitor more closely",
      differs: "The 2025 ELN recommendations, the current edition, call nilotinib inadvisable in people with a history of pancreatitis. The 2020 edition preferred TKIs other than nilotinib and bosutinib in them and called that history a contraindication to nilotinib; the 2025 paper does not repeat the sentence on bosutinib. The labels do not contraindicate any of the four medicines: asciminib asks for more frequent monitoring, the US ponatinib label says to consider additional lipase monitoring, and the EU SmPCs of ponatinib, nilotinib and bosutinib recommend caution.",
      evidence: "Expert consensus (ELN; not graded) against regulatory labels (not graded). ELN 2020 says pancreatitis has been reported in about 5% of people treated with nilotinib.",
      sources: ["eln-2020", "eln-2025", "label-asciminib", "label-ponatinib", "smpc-ponatinib", "smpc-nilotinib", "smpc-bosutinib"],
    },
    {
      name: "CTCAE version 5.0 against version 6.0 for a lipase grade",
      differs: "Version 5.0: grade 1 is above ULN to 1.5 x ULN; grade 2 is above 1.5 to 2.0 x ULN, or above 2.0 to 5.0 x ULN and asymptomatic; grade 3 is above 2.0 to 5.0 x ULN with signs or symptoms, or above 5.0 x ULN and asymptomatic; grade 4 is above 5.0 x ULN with signs or symptoms. Version 6.0 moves the boundary inside grades 2 and 3 for lipase from 2.0 to 3.0 x ULN. For amylase, version 6.0 keeps 2.0 x ULN and places mild signs or symptoms in grade 2. Both versions define pancreatitis grade 3 as severe pain, vomiting, or medical intervention indicated.",
      evidence: "NCI terminology, not a treatment guideline. The US ponatinib table says it is based on version 5.0. The asciminib dose tables cite version 4.03, which was not read, for their grade 3 non-haematological row only; their amylase and lipase row is written in multiples of ULN and does not depend on the version. The ponatinib lipase rows give multiples of ULN beside each grade.",
      sources: ["ctcae-v5", "ctcae-v6", "label-ponatinib", "label-asciminib", "smpc-asciminib"],
    },
  ],
  grades: [
    { claim: "Asciminib: lipase and amylase monthly (EU wording)", grade: "Regulatory label; not graded", source: "smpc-asciminib", quote: "Serum lipase and amylase levels should be assessed monthly during treatment with asciminib, or as clinically indicated." },
    { claim: "Asciminib: asymptomatic amylase or lipase above 2 x ULN, withhold until below 1.5 x ULN (EU wording)", grade: "Regulatory label; not graded", source: "smpc-asciminib", quote: "Withhold asciminib until resolved to <1.5 x ULN." },
    { claim: "Asciminib: where the rise does not resolve, permanently discontinue and test for pancreatitis (US wording)", grade: "Regulatory label; not graded", source: "label-asciminib", quote: "Permanently discontinue SCEMBLIX. Perform diagnostic tests to exclude pancreatitis." },
    { claim: "Ponatinib: lipase above 1 to 1.5 x ULN (US label only)", grade: "Regulatory label; not graded", source: "label-ponatinib", quote: "Consider interrupting ICLUSIG until resolution, then resume at same dose." },
    { claim: "Ponatinib: lipase every 2 weeks for 2 months, then periodically (EU wording)", grade: "Regulatory label; not graded", source: "smpc-ponatinib", quote: "Check serum lipase every 2 weeks for the first 2 months and then periodically thereafter." },
    { claim: "Ponatinib: raised lipase with abdominal symptoms (EU wording)", grade: "Regulatory label; not graded", source: "smpc-ponatinib", quote: "If lipase elevations are accompanied by abdominal symptoms, Iclusig should be withheld and patients evaluated for evidence of pancreatitis" },
    { claim: "Ponatinib: additional monitoring after past pancreatitis or alcohol abuse (US wording)", grade: "Regulatory label; not graded", source: "label-ponatinib", quote: "Consider additional serum lipase monitoring in patients with a history of pancreatitis or alcohol abuse." },
    { claim: "Nilotinib: grade 3 to 4 lipase in adults (EU wording)", grade: "Regulatory label; not graded", source: "smpc-nilotinib", quote: "For Grade 3-4 serum lipase elevations, doses in adult patients should be reduced to 400 mg once daily or interrupted." },
    { claim: "Nilotinib: raised lipase with abdominal symptoms (US wording)", grade: "Regulatory label; not graded", source: "label-nilotinib", quote: "If lipase elevations are accompanied by abdominal symptoms, interrupt dosing and consider appropriate diagnostics to exclude pancreatitis" },
    { claim: "Bosutinib: general rule for other non-haematological toxicity (US wording)", grade: "Regulatory label; not graded", source: "label-bosutinib", quote: "For other clinically significant, moderate or severe non-hematological toxicity, withhold BOSULIF until the toxicity has resolved, then consider resuming BOSULIF at a dose reduced by 100 mg taken once daily." },
    { claim: "Stop if full recovery of an asymptomatic grade 3 rise takes more than 4 weeks", grade: "Expert consensus; not graded", source: "eln-ae-2016", quote: "If full recovery takes more than 4 weeks, therapy should be stopped." },
    { claim: "Stopping is mandatory for grade 4 pancreatitis, whichever TKI", grade: "Expert consensus; not graded", source: "eln-ae-2016", quote: "Stopping therapy is mandatory for pancreatitis grade 4, irrespective of whether the concurrent TKI is thought to be causal." },
    { claim: "A history of pancreatitis as a contraindication to nilotinib", grade: "Expert consensus; not graded", source: "eln-2020", quote: "because pancreatitis has been reported in about 5% of treated patients, a history of pancreatitis also represents a contraindication to nilotinib use." },
    { claim: "Nilotinib inadvisable after pancreatitis", grade: "Expert consensus; not graded", source: "eln-2025", quote: "Nilotinib is inadvisable in patients with diabetes mellitus, high or very high cardiovascular risk including a history of vaso-occlusive events (VOEs) or pancreatitis." },
  ],
  sources: [
    {
      key: "label-asciminib",
      label: "Scemblix (asciminib) US prescribing information and Patient Information (DailyMed SPL, effective 22 September 2026)",
      publisher: "Novartis Pharmaceuticals Corporation (manufacturer's label, approved by the FDA)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e33001e7-3650-42b1-ae56-cddb5c43aa2b",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "smpc-asciminib",
      label: "Scemblix (asciminib) EU summary of product characteristics and package leaflet (EMA product information, PDF dated 3 August 2026)",
      publisher: "Novartis Europharm (manufacturer's document, published by the European Medicines Agency)",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/scemblix-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "label-ponatinib",
      label: "Iclusig (ponatinib) US prescribing information and Medication Guide (DailyMed SPL, effective 14 August 2026)",
      publisher: "Takeda Pharmaceuticals America (manufacturer's label, approved by the FDA)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=16d804b6-4957-43ee-b18c-3b36ec37c5ac",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "smpc-ponatinib",
      label: "Iclusig (ponatinib) EU summary of product characteristics and package leaflet (EMA product information, PDF dated 5 October 2026)",
      publisher: "Incyte Biosciences Distribution (manufacturer's document, published by the European Medicines Agency)",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/iclusig-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "label-nilotinib",
      label: "Tasigna (nilotinib) US prescribing information and Medication Guide (DailyMed SPL, effective 16 December 2025)",
      publisher: "Novartis Pharmaceuticals Corporation (manufacturer's label, approved by the FDA)",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6093952a-5248-45cb-ad17-33716a411146",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "smpc-nilotinib",
      label: "Tasigna (nilotinib) EU summary of product characteristics and package leaflet (EMA product information, PDF dated 8 December 2025)",
      publisher: "Novartis Europharm (manufacturer's document, published by the European Medicines Agency)",
      year: 2025,
      url: "https://www.ema.europa.eu/en/documents/product-information/tasigna-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "label-bosutinib",
      label: "Bosulif (bosutinib) US prescribing information and Patient Information (DailyMed SPL, effective 10 March 2026)",
      publisher: "Pfizer Laboratories (manufacturer's label, approved by the FDA)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=adc84ad5-a04d-4fee-9ba8-91f7abd928e3",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "smpc-bosutinib",
      label: "Bosulif (bosutinib) EU summary of product characteristics and package leaflet (EMA product information, PDF dated 25 December 2025)",
      publisher: "Pfizer Europe (manufacturer's document, published by the European Medicines Agency)",
      year: 2025,
      url: "https://www.ema.europa.eu/en/documents/product-information/bosulif-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "eln-ae-2016",
      label: "European LeukemiaNet recommendations for the management and avoidance of adverse events of treatment in chronic myeloid leukaemia",
      publisher: "Leukemia (Steegmann et al., European LeukemiaNet; authors declare honoraria and research funding from Ariad, Bristol-Myers Squibb, Novartis and Pfizer)",
      year: 2016,
      url: "https://doi.org/10.1038/leu.2016.104",
      doi: "10.1038/leu.2016.104",
      gradingScheme: "Expert consensus from email correspondence and meetings in 2014 and 2015; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "eln-2020",
      label: "European LeukemiaNet 2020 recommendations for treating chronic myeloid leukemia",
      publisher: "Leukemia (Hochhaus et al., European LeukemiaNet; panel members declare research support and honoraria from manufacturers including Novartis, Pfizer, Incyte and Takeda)",
      year: 2020,
      url: "https://doi.org/10.1038/s41375-020-0776-2",
      doi: "10.1038/s41375-020-0776-2",
      gradingScheme: "Expert panel consensus; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "eln-2025",
      label: "2025 European LeukemiaNet recommendations for the management of chronic myeloid leukemia",
      publisher: "Leukemia (Apperley et al., European LeukemiaNet; the paper states that no funding was received from any commercial source)",
      year: 2025,
      url: "https://doi.org/10.1038/s41375-025-02664-w",
      doi: "10.1038/s41375-025-02664-w",
      gradingScheme: "Expert panel consensus with a target of at least 75% concordance; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "ctcae-v5",
      label: "Common Terminology Criteria for Adverse Events (CTCAE) version 5.0, 27 November 2017",
      publisher: "US National Cancer Institute",
      year: 2017,
      url: "https://dctd.cancer.gov/research/ctep-trials/for-sites/adverse-events/ctcae-v5-8x11.pdf",
      gradingScheme: "Severity grades 1 to 5 for each adverse event term; a terminology, not a treatment guideline.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "ctcae-v6",
      label: "Common Terminology Criteria for Adverse Events (CTCAE) version 6.0, 22 July 2025",
      publisher: "US National Cancer Institute",
      year: 2025,
      url: "https://dctd.cancer.gov/research/ctep-trials/for-sites/adverse-events/ctcae-v6.pdf",
      gradingScheme: "Severity grades 1 to 5 for each adverse event term; a terminology, not a treatment guideline.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "nice-ng104",
      label: "Pancreatitis (NG104), recommendations (published 5 September 2018, last updated 16 December 2020)",
      publisher: "NICE",
      year: 2018,
      url: "https://www.nice.org.uk/guidance/ng104/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; the wording (offer, consider) carries the strength.",
      read: "full-text",
      accessed: "2026-11-18",
    },
  ],
  drugs: ["asciminib", "ponatinib", "nilotinib", "bosutinib"],
  terms: ["ctcae-grading", "dose-modification"],
  related: ["raised-liver-enzymes-on-targeted-anticancer-drugs", "raised-lipids-and-weight-gain-on-lorlatinib-bexarotene-and-elacestrant"],
  gaps: [
    "No graded guideline on pancreatitis or raised pancreatic enzymes from targeted anticancer drugs was found. The only society text read is the ELN's 2016 consensus on adverse events in CML, which is not graded and does not mention asciminib, and no later edition was found; the 2020 and 2025 ELN recommendations address only the choice of medicine after past pancreatitis. The 2016 advice predates the label tables read for this page and should be read beside them, not in place of them.",
    "Pancreatitis on immune checkpoint inhibitors is immune-related and is not covered here. No immune-related adverse event protocol in this collection covers it yet.",
    "Asparaginase-associated pancreatitis (asparaginase and pegaspargase products) is a different problem with its own rules on re-exposure. No guideline or label for it was read for this page, and it is not covered.",
    "Only four products were read. Other anticancer medicines whose labels mention pancreatitis or raised lipase (among them imatinib and dasatinib, which the ELN says can raise the enzymes like all TKIs) were not read for this problem and are not covered. Pancreatitis driven by raised triglycerides on bexarotene and lorlatinib is in the lipids protocol linked from this page.",
    "Children are not covered. The nilotinib labels, the bosutinib labels and the EU ponatinib SmPC carry paediatric dose rules that this page does not set out; the US ponatinib label says safety and effectiveness have not been established in children.",
    "No label read says how much more often to test a person who has had pancreatitis, and neither bosutinib label sets any schedule for lipase.",
    "The nilotinib dose rules are written in CTCAE grades without saying which version or which multiple of the upper limit of normal applies. Version 6.0 (2025) moved the lipase boundary inside grades 2 and 3 from 2 to 3 x ULN: a lipase of 2 to 3 x ULN with signs or symptoms is grade 3 in version 5.0 and grade 2 in version 6.0, so the same result can fall in a different grade depending on the version a unit uses. CTCAE version 4.03, which the asciminib labels cite, was not read.",
    "No label says which tests exclude pancreatitis. The ELN recommends a CT scan where there are symptoms; NICE NG104 describes the diagnosis in general terms and is not written for people on cancer treatment.",
    "No source read says whether, or how, to treat an asymptomatic rise in lipase or amylase beyond holding or reducing the medicine, or how often to repeat the test during a hold.",
    "The EU SmPCs print no date of revision of the text; the dates given are those of the EMA PDF files. Only the originator US labels (Scemblix, Iclusig, Tasigna, Bosulif) were read; other nilotinib and bosutinib products were not, and may word the rule differently.",
    "The ELN 2016 paper carries no funding statement that could be found, and its authors declare honoraria and research funding from the makers of the medicines it covers.",
    "The US ponatinib label's pancreatitis percentages (34%, 29% and 26%) cannot be read as clinical pancreatitis alone. Its warning says pancreatitis occurred in those proportions, and its adverse reaction tables give the same figures for PhALLCON and OPTIC under \"Pancreatitis/lipase elevation\" without defining the term. How many of those patients had a raised lipase and no pancreatitis is not stated.",
    "What patients are told differs: the US leaflets for asciminib, ponatinib and nilotinib say to tell the healthcare provider right away; the EU ponatinib leaflet says to stop taking it and contact a doctor or go to the nearest emergency department immediately; the EU bosutinib leaflet says to tell the doctor about abdominal pain or discomfort, with no time attached.",
  ],
});

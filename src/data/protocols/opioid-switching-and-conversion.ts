import { protocol } from "./helpers";

/*
 * Switching from one opioid to another, or from one route to another, in adults with cancer pain.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was read again as raw
 * text and every quote was checked by script (whitespace and line-break hyphenation only).
 * - WHO guidelines for the pharmacological and radiotherapeutic management of cancer pain in adults and adolescents
 *   (2018): full text, the PDF from iris.who.int through pdftotext -layout (a copy saved the same day by the checker
 *   of strong-opioids-for-cancer-pain was re-used). Section 6.2.3 (switching), the best practice statement on the
 *   subcutaneous route, and Annex 6 (Tables A6.2 to A6.4 and their footnotes, adapted from the Palliative Care
 *   Formulary). WHO presents the tables as examples, not recommendations. The tables are not quoted because their
 *   layout breaks in text; the ratios given in prose were read from the rows and checked against the worked example
 *   printed beside each row.
 * - Update of the Australian Guideline for the Management of Cancer Pain in Adults (Asia-Pac J Clin Oncol, published
 *   online 15 November 2025, PMC13569014): full text, the PubMed Central article page stripped to text (the same
 *   re-used copy). Recommendations P4 to P7, P15 and P18.
 * - NICE CG140 (2012, last updated August 2016): recommendations page and update information page, plain curl.
 * - Scottish Palliative Care Guidelines (NHS Scotland, Right Decision Service): three pages fetched with curl and
 *   stripped to text: "Choosing and changing opioids / opiates", the opioid conversion tables, and "Fentanyl
 *   patches". Added in this pass because it is the only source read that prints a diamorphine ratio, and because
 *   its ratios and its dose reduction differ from WHO's. The pages print no review date.
 * - MASCC-ASCO-AAHPM-HPNA-NICSO guideline, Opioid conversion in adults with cancer (Support Care Cancer 2025): abstract
 *   only, from Europe PMC. Tried again on 17 November 2026: link.springer.com served a client challenge, asco.org and
 *   mascc.org answered 403, and Europe PMC holds no open copy. Its ratios could not be read.
 * - The 2026 clinical-insights review of that guideline (J Pain Symptom Manage): abstract only, from Europe PMC.
 * - The BNF pages on prescribing in palliative care (bnf.nice.org.uk) answer 403 outside the United Kingdom and were
 *   not read.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const opioidSwitchingAndConversion = protocol({
  id: "opioid-switching-and-conversion",
  name: "Opioid switching and dose conversion in adults with cancer pain",
  aka: ["opioid rotation", "opioid conversion", "opioid switch", "equianalgesic dose", "converting oral morphine to subcutaneous", "morphine to fentanyl patch conversion", "opioid conversion ratio"],
  domain: "palliative",
  tldr: "Sometimes a strong painkiller has to be changed for another, or given a different way, for example by injection under the skin when swallowing becomes hard. Doses do not swap one for one, so the team works out the new dose from the total taken over 24 hours, often starts a little lower to be safe, and checks closely afterwards.",
  simple: "Changing from one strong painkiller to another, or from tablets to a pump or a patch, needs careful sums. Your team works out a safe new dose and checks on you closely afterwards. Tell them if you feel very sleepy or muddled, or if the pain is not relieved.",
  summary: "Switching is considered when pain stays uncontrolled despite an appropriate dose, when side effects are unacceptable (Australian guideline 2025, citing ESMO, NCCN, NICE and ASCO; NICE CG140 1.1.25 for persistent or moderate to severe central nervous system effects with uncontrolled pain), or when the oral route is lost. WHO (2018) makes no recommendation for or against switching because it found no randomised trial, and presents its conversion tables only as examples. The conversion is worked out on the total 24-hour dose from a recognised table or calculator, and every ratio is approximate. The sources read agree on two: oral to subcutaneous morphine, divide by 2, and oral morphine to subcutaneous hydromorphone, divide by 10 (WHO annex, taken from the Palliative Care Formulary; Scottish Palliative Care Guidelines). They differ on others. Oral morphine to oral oxycodone: WHO lists oxycodone as 1.5 times as potent as morphine, so the morphine dose is divided by 1.5, and gives 2 as the manufacturers' figure; the Scottish guidelines divide by 2. Fentanyl patch: a 12 microgram/hour patch stands for 30 mg of oral morphine in 24 hours in the WHO table (ratio 100:1, manufacturers 150:1), 45 mg in the Australian guideline and 30 to 60 mg in the Scottish guidelines. Buprenorphine patch: 20 micrograms/hour is 30 mg of oral morphine a day in the Australian guideline, while the Scottish guidelines put 5 micrograms/hour at about 12 mg a day. Subcutaneous diamorphine appears only in the Scottish guidelines: oral morphine divided by 3. On the starting dose, WHO calls a reduction of around 50% prudent when switching at high doses, in elderly or frail people, because of intolerable effects such as delirium, or after a rapid recent escalation; the Scottish guidelines say to consider reducing by up to 30% when changing opioid, or if the person is opioid toxic, frail or elderly; the Australian guideline asks for a dose lower than the equivalent and sets no figure. In severe kidney disease the Australian guideline prefers buprenorphine, fentanyl, hydromorphone, methadone or oxycodone to morphine, while the Scottish guidelines say to avoid hydromorphone and diamorphine in stage 4 and 5 chronic kidney disease. Methadone is started and titrated only by specialists (Australian guideline); WHO recommends specialist guidance for a conversion to regular methadone and the Scottish guidelines advise inpatient admission for it. The 2025 MASCC-ASCO-AAHPM-HPNA-NICSO guideline, described in a 2026 review as the first global consensus guideline on conversion, accepted 58 of 84 statements, found that experts' ratios vary, particularly for methadone, and is said by that review to challenge traditional dose-reduction protocols; it could be read only as an abstract.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "pharmacist", "nurse"],
    where: ["ward", "home", "community", "outpatient-clinic"],
  },
  population: "Adults with cancer pain already taking a strong opioid. WHO's guideline covers adults and adolescents, the Australian guideline and NICE CG140 adults, and the Scottish guidelines palliative care in general rather than cancer alone. Children, the working of a methadone conversion and intrathecal opioids are outside this record.",
  trigger: "Pain not controlled despite an appropriate opioid dose, side effects that cannot be managed, or the current route (usually swallowing) no longer possible.",
  steps: [
    {
      action: "Before switching for a side effect, optimise its treatment first: laxatives for constipation, anti-emetics for persistent nausea, and for drowsiness or other central nervous system effects consider a lower dose if pain is controlled",
      why: "Many side effects can be treated without changing a painkiller that is working.",
      source: "nice-cg140",
      quote: "Optimise laxative treatment for managing constipation before considering switching strong opioids.",
      grade: "Not graded (NICE 1.1.20; nausea is 1.1.23 and central nervous system effects 1.1.25)",
    },
    {
      action: "Consider switching opioid when pain is not controlled despite an appropriate dose, or side effects are unacceptable",
      why: "It has been proposed that a switch might improve the balance between pain relief and side effects (WHO 2018); no randomised trial has tested this.",
      source: "aus-2025",
      quote: "Optimal pain relief cannot be achieved despite appropriate dose. (ESMO, NCCN, NICE)",
      grade: "Adopted from ESMO, NCCN and NICE (uncontrolled pain) and from ASCO 2016 and 2022 (unacceptable adverse effects)",
    },
    {
      action: "If the person can no longer swallow, switch to subcutaneous morphine, hydromorphone, oxycodone or fentanyl, or a fentanyl patch if pain is stable",
      why: "A drug given under the skin works when tablets cannot be taken, and WHO prefers that route to injection into muscle because it is less painful.",
      source: "aus-2025",
      quote: "If the oral route is no longer possible, switch to subcutaneous morphine, hydromorphone, oxycodone, or fentanyl. Transdermal fentanyl is another alternative in stable pain.",
      grade: "No source guideline is named for this sentence (P18)",
    },
    {
      action: "Work out the total opioid dose over 24 hours and look up the conversion in a recognised table or calculator",
      why: "Conversion ratios are applied to the whole day's dose, and a table or calculator helps to avoid a gross miscalculation.",
      source: "aus-2025",
      quote: "If switching to a different formulation or route of administration with the same agent, look up conversion for total 24‐h opioid dose (ESMO, NCCN, NICE) (e.g., via the eviQ Opioid Conversion Calculator).",
      grade: "Adopted from ESMO, NCCN and NICE",
    },
    {
      action: "When changing to a different opioid, start below the calculated equivalent dose",
      why: "Tolerance to one opioid does not carry over completely to another; the Scottish guidelines name incomplete cross tolerance as a reason to reduce the dose.",
      source: "aus-2025",
      quote: "If switching to a different agent, a starting dose lower than the equivalent total 24‐h opioid dose of the previous agent should be used.",
      grade: "No source guideline is named for this sentence (P18)",
    },
    {
      action: "Reduce the calculated dose by around half when switching at high doses (morphine or equivalent of 1 g or more in 24 hours), in elderly or frail people, because of delirium or other intolerable effects, or after a rapid recent dose rise, and use as-needed doses to make up any shortfall while re-titrating",
      why: "WHO calls a reduction of this size prudent in these situations. The Scottish guidelines set a different figure: consider reducing by up to 30% when changing opioid.",
      source: "who-2018",
      quote: "A dose reduction of around 50% of the calculated equivalent dose of the new opioid is prudent when switching at high doses (e.g. morphine or equivalent doses of ≥ 1 g/24h), in elderly or frail patients, because of intolerable undesirable effects (e.g. delirium), or when there has been a recent rapid escalation of the first opioid (possibly due to opioid-induced hyperalgesia).",
      grade: "Not graded (annex guidance; WHO does not recommend the tables)",
    },
    {
      action: "In severe kidney disease, use morphine with caution and prefer another opioid when choosing what to switch to, with careful titration and monitoring",
      why: "The Australian guideline says morphine may need lower and less frequent doses when creatinine clearance is below 30 mL/min. Guidelines differ on which other opioid: the Scottish guidelines say to avoid hydromorphone and diamorphine in stage 4 and 5 chronic kidney disease.",
      source: "aus-2025",
      quote: "Buprenorphine, fentanyl, hydromorphone, methadone, or oxycodone are preferred opioids in severe kidney disease and require careful titration and monitoring. (ASCO 2022)",
      grade: "Adopted from ASCO 2022",
    },
    {
      action: "Leave starting and titrating methadone, including a switch to it, to specialists familiar with its use",
      why: "WHO notes that methadone's long and variable half-life makes it much more potent when taken regularly than a single dose suggests, sometimes much more than its table shows.",
      source: "aus-2025",
      quote: "P4 Methadone should be initiated and titrated only by specialists familiar with its use. (ESMO, NCCN, ASCO 2016, ASCO 2022)",
      grade: "Adopted from ESMO, NCCN and ASCO (2016 and 2022)",
    },
    {
      action: "Monitor carefully during the conversion for under-dosing, excessive dosing and adverse effects, and re-titrate the new opioid",
      why: "Conversion ratios are only an approximate guide and people vary widely, so the new dose is a starting point.",
      source: "who-2018",
      quote: "Thus, careful clinical monitoring during conversion is necessary to avoid under-dosing, excessive dosing and adverse effects, especially when switching at high doses, when rapidly increasing the dose of the first opioid, and when switching to methadone.",
      grade: "Not graded (annex guidance)",
    },
  ],
  bestInClass: {
    statement: "Convert on the total 24-hour dose using a recognised table or calculator, start below the calculated equivalent when changing drug, keep methadone with specialists, and monitor carefully afterwards (WHO 2018 annex; Australian guideline 2025 adopting ESMO, NCCN, NICE and ASCO; Scottish Palliative Care Guidelines). The sources do not agree on every ratio or on the size of the reduction: WHO calls around 50% prudent in the high-risk situations it lists, the Scottish guidelines say to consider up to 30% when changing opioid, and the Australian guideline sets no figure. None of these is graded, and the evidence is weak throughout: WHO found no randomised trial of switching and makes no recommendation for or against it. The 2025 MASCC-ASCO-AAHPM-HPNA-NICSO guideline is the consensus guideline written for this subject and, by the account of a 2026 review, challenges traditional dose-reduction protocols; it could be read only as an abstract, so its ratios and where it differs on the reduction cannot be stated here.",
    sources: ["who-2018", "aus-2025", "spcg", "mascc-2025", "mascc-insights-2026"],
  },
  variants: [
    {
      name: "How much to reduce the calculated dose",
      differs: "WHO: around 50%, in named situations only (high doses, elderly or frail people, intolerable effects such as delirium, a rapid recent escalation). Scottish Palliative Care Guidelines: consider up to 30% and re-titrate when changing opioid, or if the person is opioid toxic, frail or elderly, with conversions kept conservative and doses usually rounded down. Australian guideline: a starting dose lower than the equivalent, with no figure.",
      evidence: "None of the three is graded and none cites a trial for its figure. A 2026 review of the MASCC-ASCO-AAHPM-HPNA-NICSO guideline says it challenges traditional dose-reduction protocols; its exact position could not be read.",
      sources: ["who-2018", "spcg", "aus-2025", "mascc-insights-2026"],
    },
    {
      name: "Different ratios for the same switch",
      differs: "Oral morphine to oral oxycodone: divide by 1.5 (WHO annex, which gives 2 as the manufacturers' figure) or by 2 (Scottish guidelines). Oral morphine to oral hydromorphone: relative potency 4 to 5, manufacturers 5 to 7.5 (WHO); divide by 5 to 7.5 (Scottish). Fentanyl patch: 12 micrograms/hour for 30 mg of oral morphine a day and 25 for 60 mg (WHO, 100:1); 12 for 30 to 60 mg and 25 for 60 to 90 mg (Scottish); 12 equivalent to 45 mg (Australian). Buprenorphine patch: 20 micrograms/hour equivalent to 30 mg of oral morphine a day (Australian); 5 micrograms/hour to about 12 mg (Scottish); relative potency 100, manufacturers 75 to 115 (WHO). Only the Scottish guidelines give subcutaneous diamorphine (oral morphine divided by 3, so 10 mg to about 3 mg) and subcutaneous oxycodone (oral morphine divided by 4, oral oxycodone divided by 2).",
      evidence: "WHO says existing tables rest on generally weak evidence from retrospective or observational studies; the Scottish pages say their conversions rest on consensus of use across Scotland and reference sources, and that ratios vary with the resource used. The Scottish and Australian buprenorphine patch figures are for different patch strengths and neither source converts one to the other, so no single figure is given here.",
      sources: ["who-2018", "spcg", "aus-2025"],
    },
    {
      name: "Oral to subcutaneous hydromorphone at 2:1 rather than 3:1",
      differs: "Some centres convert oral to subcutaneous hydromorphone at 2:1; the manufacturer's ratio in the WHO annex is 3:1. Some centres likewise convert oral to subcutaneous methadone 1:1 rather than 2:1.",
      evidence: "WHO annex notes, based on mean oral bioavailability (hydromorphone 50%, range 35 to 60%; methadone 80%, range 40 to 100%). WHO cites no trial for either.",
      sources: ["who-2018"],
    },
    {
      name: "Which opioid in kidney disease",
      differs: "Australian guideline: buprenorphine, fentanyl, hydromorphone, methadone or oxycodone are preferred in severe kidney disease (from ASCO 2022), though elsewhere it suggests buprenorphine or fentanyl instead of morphine, codeine or hydromorphone when adverse effects occur in renal impairment (from ESMO and NCCN). Scottish guidelines: use alternatives to morphine in stage 4 and 5 chronic kidney disease and on dialysis, avoid diamorphine and hydromorphone at those stages, and avoid modified-release oxycodone; buprenorphine does not accumulate, and fentanyl patches need no initial dose reduction but may accumulate over time.",
      evidence: "Adopted recommendations and consensus; neither source grades them. NICE CG140 1.1.7 says to seek specialist advice before prescribing strong opioids in moderate to severe renal or hepatic impairment.",
      sources: ["aus-2025", "spcg", "nice-cg140"],
    },
    {
      name: "Calculator-based conversion",
      differs: "Uses an online conversion calculator, such as eviQ's in Australia, rather than a printed table.",
      evidence: "Named by the Australian guideline as the reference for its dose equivalences. A calculator is only as good as the ratios built into it; studies of calculators were not read.",
      sources: ["aus-2025"],
    },
  ],
  grades: [
    { claim: "Opioid switching or rotation", grade: "No recommendation", source: "who-2018", quote: "In the absence of evidence, WHO makes no recommendation for or against the practice of opioid switching or rotation." },
    { claim: "Conversion tables are examples to inform judgement, not WHO recommendations", grade: "Not graded (annex)", source: "who-2018", quote: "They are presented merely as examples and should not be construed as recommended by WHO." },
    { claim: "Consider reducing the dose by up to 30% when changing opioid", grade: "Not graded (consensus of use across Scotland)", source: "spcg", quote: "Consider reducing the dose by up to 30% and re-titrating" },
    { claim: "Basis of the Scottish conversion ratios", grade: "Not graded (consensus of use across Scotland)", source: "spcg", quote: "Opioid conversions and ratios may vary depending on the resource used. The conversions used in these guidelines are based on consensus of use across Scotland and reference sources." },
    { claim: "Conversion to methadone", grade: "Not graded", source: "spcg", quote: "Conversion from other opioids to methadone is complex and inpatient admission is advised." },
    { claim: "Consensus reached on conversion statements", grade: "58 of 84 statements met the 75% agreement threshold", source: "mascc-2025", quote: "In consensus voting, 58 of 84 statements met or exceeded the required 75% level of agreement and were accepted." },
    { claim: "Strength of the evidence behind conversion", grade: "Modest (as stated by the panel)", source: "mascc-2025", quote: "The strength of the evidence from the trials is modest, and there are large clinical practice and research gaps." },
    { claim: "Switch opioid for persistent or moderate to severe central nervous system effects when pain is not controlled", grade: "Not graded (NICE 1.1.25)", source: "nice-cg140", quote: "consider switching opioids if pain is not controlled." },
  ],
  sources: [
    {
      key: "who-2018",
      label: "WHO guidelines for the pharmacological and radiotherapeutic management of cancer pain in adults and adolescents (section 6.2.3 and Annex 6)",
      publisher: "World Health Organization",
      year: 2018,
      url: "https://iris.who.int/handle/10665/279700",
      gradingScheme: "GRADE: strong or conditional recommendations with quality of evidence high to very low; best practice statements; 'no recommendation' where evidence is absent. Annex tables are examples, not recommendations.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "aus-2025",
      label: "Update of the Australian Guideline for the Management of Cancer Pain in Adults (Cancer Council Australia)",
      publisher: "Asia-Pacific Journal of Clinical Oncology",
      year: 2025,
      url: "https://doi.org/10.1111/ajco.70047",
      doi: "10.1111/ajco.70047",
      gradingScheme: "Recommendations adopted from source guidelines carry the strength of the source, named in brackets; de novo ones rest on Level 1 evidence or consensus.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-cg140",
      label: "Palliative care for adults: strong opioids for pain relief (CG140), recommendations",
      publisher: "NICE",
      year: 2012,
      url: "https://www.nice.org.uk/guidance/cg140/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations. Last updated August 2016; links to technology appraisals were added in September 2024.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "spcg",
      label: "Scottish Palliative Care Guidelines: Choosing and changing opioids / opiates, Opioid/opiate conversion tables, and Fentanyl patches (web pages; they print no review date, so the year is the year they were read)",
      publisher: "NHS Scotland, Right Decision Service",
      year: 2026,
      url: "https://www.palliativecareguidelines.scot.nhs.uk/scottish-palliative-care-guidelines/medicines/medicines-information/opioids/choosing-and-changing-opioids-opiates-convertingswitching/opioidopiate-conversion-tables-switching-between-opioid-medicines/",
      gradingScheme: "Not graded. The pages say their conversions are based on consensus of use across Scotland and reference sources.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "mascc-2025",
      label: "Opioid conversion in adults with cancer: MASCC-ASCO-AAHPM-HPNA-NICSO guideline",
      publisher: "Supportive Care in Cancer",
      year: 2025,
      url: "https://doi.org/10.1007/s00520-025-09286-z",
      doi: "10.1007/s00520-025-09286-z",
      gradingScheme: "Systematic review plus modified Delphi consensus; statements accepted at 75% agreement or more.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "mascc-insights-2026",
      label: "Opioid Conversion in Adults With Cancer: MASCC-ASCO-AAHPM-HPNA-NICSO Guideline Clinical Insights",
      publisher: "Journal of Pain and Symptom Management",
      year: 2026,
      url: "https://doi.org/10.1016/j.jpainsymman.2025.10.027",
      doi: "10.1016/j.jpainsymman.2025.10.027",
      read: "abstract",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["fentanyl", "morphine", "oxycodone"],
  technologies: ["pain-management", "syringe-drivers"],
  terms: [],
  related: ["strong-opioids-for-cancer-pain"],
  upgrades: [],
  gaps: [
    "The 2025 MASCC-ASCO-AAHPM-HPNA-NICSO guideline, the most specific and most recent source, could be read only as an abstract. On 17 November 2026 the publisher again served a browser challenge to a script, the ASCO and MASCC sites answered 403, and Europe PMC holds no open copy. Its conversion ratios and its position on routine dose reduction are not on this page. A comment on it (Support Care Cancer, May 2025) was not read either.",
    "On 17 November 2026 the BNF guidance on prescribing in palliative care could not be read: the site answers 403 outside the United Kingdom. Its equivalence tables are therefore not compared here.",
    "Of the sources read, only the Scottish Palliative Care Guidelines print a ratio for subcutaneous diamorphine or subcutaneous oxycodone, so those two figures rest on one source. Its pages carry no review date, and its row for subcutaneous hydromorphone prints an example (oral morphine 15 mg to about 1 mg) that does not match the factor beside it (divide by 10).",
    "The sources disagree on several ratios and on the size of the starting-dose reduction, and none grades its figure. The page states each position and does not choose between them.",
    "No randomised trial of opioid switching exists (WHO 2018). WHO says existing conversion tables rest on generally weak evidence from retrospective or observational studies.",
    "The WHO conversion tables lose their layout when extracted as text; ratios given here were read against the worked examples beside each row, and are WHO's examples, not recommendations.",
    "No source read sets a time within which a patient should report drowsiness, confusion or unrelieved pain after a switch. The Australian guideline lists these among reasons to seek help, by consensus, without a time limit, and no source read says how many days of closer monitoring a switch needs.",
    "The working of a methadone conversion, intrathecal conversion and conversion in children are outside this record.",
  ],
});

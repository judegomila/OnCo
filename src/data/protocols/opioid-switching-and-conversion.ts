import { protocol } from "./helpers";

/*
 * Switching from one opioid to another, or from one route to another, in adults with cancer pain.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - WHO guidelines for the pharmacological and radiotherapeutic management of cancer pain in adults and adolescents
 *   (2018): full text, PDF from iris.who.int with pdftotext. Section 6.2.3 (switching) and Annex 6 (conversion tables,
 *   adapted from the Palliative Care Formulary). WHO presents the tables as examples, not recommendations. The tables
 *   themselves lose their layout in the text and are not quoted; the ratios given in prose here were read from them and
 *   checked against the worked examples beside each row.
 * - Update of the Australian Guideline for the Management of Cancer Pain in Adults (Cancer Council Australia; Asia-Pac
 *   J Clin Oncol 2025, PMC13569014): full text, the PMC article page stripped to text.
 * - NICE CG140 (2012, updated 2016): recommendations page, full text.
 * - MASCC-ASCO-AAHPM-HPNA-NICSO guideline, Opioid conversion in adults with cancer (Support Care Cancer 2025): abstract
 *   only. The publisher served a bot challenge to a script and there is no open copy in Europe PMC. This is the newest
 *   and most specific guideline on the subject and its ratios could not be read.
 * - The 2026 clinical-insights review of that guideline (J Pain Symptom Manage): abstract only.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const opioidSwitchingAndConversion = protocol({
  id: "opioid-switching-and-conversion",
  name: "Opioid switching and dose conversion in adults with cancer pain",
  aka: ["opioid rotation", "opioid conversion", "opioid switch", "equianalgesic dose", "converting oral morphine to subcutaneous", "morphine to fentanyl patch conversion", "opioid conversion ratio"],
  domain: "palliative",
  tldr: "Sometimes a strong painkiller has to be changed for another, or given a different way, for example by injection under the skin when swallowing becomes hard. Doses do not swap one for one, so the team works out the new dose from the total taken over 24 hours, often starts a little lower to be safe, and checks closely in the first days.",
  simple: "Changing from one strong painkiller to another, or from tablets to a pump or a patch, needs careful sums. Your team works out a safe new dose and checks on you closely afterwards. Tell them if you feel very sleepy or muddled, or if the pain comes back.",
  summary: "Switching is considered when pain stays uncontrolled despite an appropriate dose, when side effects are unacceptable (Australian guideline 2025, citing ESMO, NCCN, NICE and ASCO; NICE CG140 1.1.25 for persistent central nervous system effects with uncontrolled pain), or when the oral route is lost. WHO (2018) makes no recommendation for or against switching because no randomised trial has tested it, and presents its conversion tables only as examples. The conversion is done on the total 24-hour dose, looked up in a recognised table or calculator. Ratios in the WHO annex (from the Palliative Care Formulary) include oral to subcutaneous morphine 2:1 and oral morphine to subcutaneous hydromorphone 10:1; oral oxycodone is listed at 1.5 times morphine (manufacturer 2). WHO advises reducing the calculated dose of the new opioid by about 50% when switching at high doses, in older or frail people, because of intolerable side effects such as delirium, or after a rapid recent escalation; the Australian guideline says a dose lower than the equivalent should be used when changing drug. The 2025 MASCC-ASCO-AAHPM-HPNA-NICSO guideline, the first international consensus guideline on conversion, reached agreement on 58 of 84 statements and is described in a 2026 review as challenging traditional dose-reduction protocols; it could be read only as an abstract. Methadone is converted by specialists only.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "pharmacist", "nurse"],
    where: ["ward", "home", "community", "outpatient-clinic"],
  },
  population: "Adults with cancer pain already taking a strong opioid. Children, and conversions to or from methadone or intrathecal opioids, need specialist teams and are outside this record.",
  trigger: "Pain not controlled despite an appropriate opioid dose, side effects that cannot be managed, or the current route (usually swallowing) no longer possible.",
  steps: [
    {
      action: "Before switching for side effects, rule out other causes and optimise what is already in place: laxatives for constipation, anti-emetics for nausea, a dose reduction if pain is controlled",
      why: "Many side effects can be treated without changing the painkiller that is working.",
      source: "nice-cg140",
      quote: "Optimise laxative treatment for managing constipation before considering switching strong opioids.",
      grade: "Not graded (NICE 1.1.20)",
    },
    {
      action: "Consider switching opioid when pain is not controlled despite an appropriate dose, or side effects are unacceptable",
      why: "People respond differently to different opioids, and another one may give better relief with fewer side effects.",
      source: "aus-2025",
      quote: "Optimal pain relief cannot be achieved despite appropriate dose. (ESMO, NCCN, NICE)",
      grade: "Adopted from ESMO, NCCN and NICE",
    },
    {
      action: "If the person can no longer swallow, switch to subcutaneous morphine, hydromorphone, oxycodone or fentanyl, or a fentanyl patch if pain is stable",
      why: "Injection under the skin is less painful than into muscle and works when tablets cannot be taken.",
      source: "aus-2025",
      quote: "If the oral route is no longer possible, switch to subcutaneous morphine, hydromorphone, oxycodone, or fentanyl. Transdermal fentanyl is another alternative in stable pain.",
      grade: "Adopted from source guidelines",
    },
    {
      action: "Add up the total opioid taken in the last 24 hours, regular and rescue, and convert that total using a recognised conversion table or calculator",
      why: "Conversion ratios apply to the daily total, and leaving out rescue doses underestimates what the person needs.",
      source: "aus-2025",
      quote: "If switching to a different formulation or route of administration with the same agent, look up conversion for total 24‐h opioid dose (ESMO, NCCN, NICE) (e.g., via the eviQ Opioid Conversion Calculator).",
      grade: "Adopted from ESMO, NCCN and NICE",
    },
    {
      action: "When changing to a different opioid, start below the calculated equivalent dose",
      why: "Tolerance to one opioid does not fully carry over to another, so an exactly equivalent dose can be too strong.",
      source: "aus-2025",
      quote: "If switching to a different agent, a starting dose lower than the equivalent total 24‐h opioid dose of the previous agent should be used.",
      grade: "Adopted from source guidelines",
    },
    {
      action: "Reduce the calculated dose by about half when switching at high doses (around 1 g oral morphine a day or more), in older or frail people, for delirium or other intolerable effects, or after a rapid recent dose rise, and use rescue doses to cover any shortfall",
      why: "These are the situations where an equivalent dose is most likely to cause overdose.",
      source: "who-2018",
      quote: "A dose reduction of around 50% of the calculated equivalent dose of the new opioid is prudent when switching at high doses (e.g. morphine or equivalent doses of ≥ 1 g/24h), in elderly or frail patients, because of intolerable undesirable effects (e.g. delirium), or when there has been a recent rapid escalation of the first opioid (possibly due to opioid-induced hyperalgesia).",
      grade: "Not graded (annex guidance; WHO does not recommend the tables)",
    },
    {
      action: "Leave conversion to or from methadone to specialists",
      why: "Methadone's long and variable action means its effective strength rises with regular use far beyond what a single-dose table suggests.",
      source: "aus-2025",
      quote: "P4 Methadone should be initiated and titrated only by specialists familiar with its use. (ESMO, NCCN, ASCO 2016, ASCO 2022)",
      grade: "Adopted from ESMO, NCCN and ASCO",
    },
    {
      action: "Monitor closely in the first days after a switch for too much opioid (drowsiness, confusion, slow breathing) and too little (returning pain), and re-titrate",
      why: "Conversion ratios are only approximate and people vary widely, so the new dose is a starting point.",
      source: "who-2018",
      quote: "Thus, careful clinical monitoring during conversion is necessary to avoid under-dosing, excessive dosing and adverse effects, especially when switching at high doses, when rapidly increasing the dose of the first opioid, and when switching to methadone.",
      grade: "Not graded (annex guidance)",
    },
  ],
  bestInClass: {
    statement: "Convert on the total 24-hour dose using a recognised table or calculator, start below the calculated equivalent when changing drug, reduce by about 50% in the high-risk situations WHO lists, keep methadone with specialists, and monitor closely afterwards (WHO 2018 annex; Australian guideline 2025 adopting ESMO, NCCN, NICE and ASCO). The evidence is weak throughout: WHO found no randomised trial of switching and makes no recommendation for or against it. The 2025 MASCC-ASCO-AAHPM-HPNA-NICSO guideline is the first international consensus on conversion ratios and, by the account of a 2026 review, questions routine dose reduction; it could be read only as an abstract, so where it differs from WHO and the Australian guideline on the size of the reduction cannot be stated here.",
    sources: ["who-2018", "aus-2025", "mascc-2025", "mascc-insights-2026"],
  },
  variants: [
    {
      name: "Fixed routine reduction of 25 to 50% for every switch",
      differs: "Reduces the calculated dose of the new opioid by a set percentage on every change of drug, regardless of the reason or dose.",
      evidence: "WHO reserves its reduction of about 50% for named high-risk situations; the Australian guideline asks for a starting dose below the equivalent without setting a figure. A 2026 review of the MASCC-ASCO-AAHPM-HPNA-NICSO guideline says it challenges traditional dose-reduction protocols; its exact position could not be read.",
      sources: ["who-2018", "aus-2025", "mascc-insights-2026"],
    },
    {
      name: "Oral to subcutaneous hydromorphone at 2:1 rather than 3:1",
      differs: "Some centres convert oral to subcutaneous hydromorphone at 2:1; the manufacturer's ratio in the WHO annex is 3:1. Some centres likewise convert oral to subcutaneous methadone 1:1 rather than 2:1.",
      evidence: "WHO annex notes, based on mean oral bioavailability (hydromorphone 50%, range 35 to 60%; methadone 80%, range 40 to 100%). No trial.",
      sources: ["who-2018"],
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
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "nice-cg140",
      label: "Palliative care for adults: strong opioids for pain relief (CG140), recommendations",
      publisher: "NICE",
      year: 2012,
      url: "https://www.nice.org.uk/guidance/cg140/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations. Last updated August 2016.",
      read: "full-text",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "mascc-insights-2026",
      label: "Opioid Conversion in Adults With Cancer: MASCC-ASCO-AAHPM-HPNA-NICSO Guideline Clinical Insights",
      publisher: "Journal of Pain and Symptom Management",
      year: 2026,
      url: "https://doi.org/10.1016/j.jpainsymman.2025.10.027",
      doi: "10.1016/j.jpainsymman.2025.10.027",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["fentanyl", "morphine", "oxycodone"],
  technologies: ["pain-management", "syringe-drivers"],
  terms: [],
  related: ["strong-opioids-for-cancer-pain"],
  upgrades: [],
  gaps: [
    "The 2025 MASCC-ASCO-AAHPM-HPNA-NICSO guideline, the most specific and most recent source, could be read only as an abstract (the publisher served a bot challenge). Its conversion ratios and its position on routine dose reduction are not on this page.",
    "No randomised trial of opioid switching exists (WHO 2018). Every conversion ratio rests on retrospective, observational or single-dose studies.",
    "The WHO conversion tables lose their layout when extracted as text; ratios given in the summary were read against the worked examples beside each row, and are WHO's examples, not recommendations.",
    "Methadone conversion, intrathecal conversion and conversion in children are outside this record.",
  ],
});

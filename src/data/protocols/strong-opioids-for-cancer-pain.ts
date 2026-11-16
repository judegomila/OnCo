import { protocol } from "./helpers";

/*
 * Starting and titrating strong opioids for cancer pain, with rescue doses for breakthrough pain and the laxative that
 * goes with every opioid. One record for three census rows (start and titration, breakthrough pain, opioid-induced
 * constipation), because every source read treats them as one prescription.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - NICE CG140, Palliative care for adults: strong opioids for pain relief (published May 2012, last updated August
 *   2016): recommendations page, full text (HTML).
 * - WHO guidelines for the pharmacological and radiotherapeutic management of cancer pain in adults and adolescents
 *   (2018): full text, PDF from iris.who.int read with pdftotext. Recommendations and best practice statements quoted
 *   as printed.
 * - Update of the Australian Guideline for the Management of Cancer Pain in Adults (Cancer Council Australia; Asia-Pac
 *   J Clin Oncol 2025, PMC13569014): full text, the PMC article page stripped to text (Europe PMC's full-text service
 *   returned an error). It adopts recommendations from ESMO, NCCN, NICE, WHO and ASCO and names the source of each, so
 *   it is the readable route to what ESMO 2018 and ASCO 2023 say; it is cited as itself.
 * - ASCO guideline, Use of Opioids for Adults With Pain From Cancer or Cancer Treatment (Paice et al., J Clin Oncol
 *   2023): abstract only (the publisher served a bot challenge to a script).
 * - EAPC recommendations on opioids for cancer pain (Caraceni et al., Lancet Oncol 2012): abstract only.
 * - ESMO Clinical Practice Guidelines, Management of cancer pain in adult patients (Fallon et al., Ann Oncol 2018): not
 *   reachable (no abstract in Europe PMC, the publisher refused a script, no archived copy). No step rests on it.
 * - NCCN Adult Cancer Pain, version 2.2025 (J Natl Compr Canc Netw 2025): abstract only, which states no
 *   recommendation; the full NCCN guideline needs a login and was not read.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const strongOpioidsForCancerPain = protocol({
  id: "strong-opioids-for-cancer-pain",
  name: "Strong opioids for cancer pain: starting, titrating, rescue doses and preventing constipation",
  aka: ["starting morphine for cancer pain", "opioid titration", "breakthrough cancer pain", "rescue dose", "PRN morphine", "opioid-induced constipation prevention", "laxative with opioids", "WHO analgesic ladder"],
  domain: "palliative",
  tldr: "When cancer pain needs a strong painkiller, morphine by mouth is usually the first choice: a regular dose plus extra 'rescue' doses for pain that breaks through, adjusted until the pain is controlled with side effects you can live with. A laxative should be prescribed from the start, because almost everyone taking strong opioids gets constipated.",
  simple: "Strong painkillers like morphine are safe and work well for cancer pain when the dose is set carefully. You take a regular dose, and an extra dose when pain breaks through. Take a laxative every day too. Tell your team if you are very sleepy, muddled or the pain is not controlled.",
  summary: "NICE CG140 (2012, updated 2016) and WHO (2018) agree on the core: oral morphine first, regular dosing with immediate-release oral morphine for rescue (WHO strong recommendation, moderate-quality evidence). NICE gives a starting schedule for adults without renal or hepatic impairment of 20 to 30 mg oral morphine a day with 5 mg immediate-release rescue doses during titration, and asks for specialist advice before strong opioids in moderate to severe renal or hepatic impairment. ASCO 2023 starts PRN at the lowest dose with early assessment and frequent titration; the Australian guideline (2025) adds ASCO's minimum dose increase of 25 to 50% and NCCN's practice of folding the previous 24 hours of rescue doses into the regular dose.\n\nRescue doses are where the sources differ most in their numbers: WHO suggests 50 to 100% of the regular 4-hourly dose; the Australian guideline, citing ASCO 2022, 5 to 20% of the daily regular dose, up to hourly; NICE gives a fixed 5 mg during titration and says not to use fast-acting fentanyl as first-line rescue. Every patient starting a strong opioid should be prescribed a regular laxative (NICE 1.1.18); NICE says to optimise laxatives before switching opioids, and points to naldemedine and naloxegol appraisals for constipation that persists despite laxatives. Nausea and drowsiness at the start or after a dose rise are usually transient; persistent central nervous system effects call for dose reduction if pain is controlled or a switch if it is not.\n\nThe ESMO 2018 guideline, which the Australian guideline draws on heavily, could not be read directly.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["home", "ward", "outpatient-clinic", "community"],
  },
  population: "Adults with pain from cancer or its treatment that needs a strong opioid (WHO also covers adolescents). NICE CG140 is written for adults with advanced and progressive disease; ASCO 2023 covers adults with pain from cancer or cancer treatment. People with moderate to severe kidney or liver impairment, people with a substance use disorder, and children need specialist advice and are not covered by the starting doses here.",
  trigger: "Pain from cancer that is moderate or severe, or that persists despite paracetamol or an anti-inflammatory.",
  steps: [
    {
      action: "Before starting, ask about worries such as addiction, tolerance, side effects and what starting morphine means",
      why: "Fear that morphine is addictive or means the end is near stops many people taking enough to control their pain.",
      source: "nice-cg140",
      quote: "When offering pain treatment with strong opioids to a patient with advanced and progressive disease, ask them about concerns such as:",
      grade: "Not graded (NICE 1.1.1)",
    },
    {
      action: "Give spoken and written information on how and when to take regular and rescue doses, side effects, safe storage and who to call out of hours",
      why: "Most of the work of pain control happens at home, and people need to know what to do when pain breaks through at night.",
      source: "nice-cg140",
      quote: "Provide verbal and written information on strong opioid treatment to patients and carers, including the following:",
      grade: "Not graded (NICE 1.1.2)",
    },
    {
      action: "Start regular oral morphine, sustained-release or immediate-release by the patient's preference, with immediate-release oral morphine for breakthrough pain",
      why: "Morphine by mouth works for most people, is cheap and widely available, and a fast-acting rescue dose covers pain between regular doses.",
      source: "who-2018",
      quote: "Regularly-dosed immediate-release oral morphine, or regularly-dosed slow-release morphine, should be used to maintain effective and safe pain relief whenever oral dosing is possible. With either formulation, immediate-release oral morphine should be used as rescue medicine.",
      grade: "Strong recommendation; moderate-quality evidence",
    },
    {
      action: "Where kidneys and liver work normally, start at 20 to 30 mg oral morphine a day (for example 10 to 15 mg sustained-release twice daily) with 5 mg immediate-release rescue doses",
      why: "A low starting dose with rescue doses lets the right dose be found safely within a few days.",
      source: "nice-cg140",
      quote: "For patients with no renal or hepatic comorbidities, offer a typical total daily starting dose schedule of 20 mg to 30 mg of oral morphine (for example, 10 mg to 15 mg oral sustained-release morphine twice daily), plus 5 mg oral immediate-release morphine for rescue doses during the titration phase.",
      grade: "Not graded (NICE 1.1.5)",
    },
    {
      action: "Get specialist advice before starting a strong opioid in moderate to severe kidney or liver impairment",
      why: "Morphine and its breakdown products build up when the kidneys or liver are failing, which can cause drowsiness, confusion and twitching.",
      source: "nice-cg140",
      quote: "Seek specialist advice before prescribing strong opioids for patients with moderate to severe renal or hepatic impairment.",
      grade: "Not graded (NICE 1.1.7)",
    },
    {
      action: "Review often while titrating and adjust the dose until pain control and side effects are in balance; seek specialist advice if that balance is not reached after a few adjustments",
      why: "The right dose is the one that controls the pain with side effects you can live with, and it differs from person to person.",
      source: "nice-cg140",
      quote: "Adjust the dose until a good balance exists between acceptable pain control and side effects. If this balance is not reached after a few dose adjustments, seek specialist advice. Offer patients frequent review, particularly in the titration phase.",
      grade: "Not graded (NICE 1.1.6)",
    },
    {
      action: "When raising the regular dose, take account of the rescue doses used over the previous 24 hours, and reassess pain and side effects within 48 hours",
      why: "The rescue doses a person needed show how much more regular opioid they need.",
      source: "aus-2025",
      quote: "Regular dose of opioid may be increased to incorporate the rescue doses taken in previous 24 h (NCCN), then reassess pain severity and adverse effects within 48 h. (Consensus)",
      grade: "Consensus (NCCN source)",
    },
    {
      action: "Use immediate-release oral morphine for breakthrough pain, not fast-acting fentanyl, as the first-line rescue",
      why: "Oral morphine works for most breakthrough pain; fast-acting fentanyl products cost much more and are kept for when morphine does not work.",
      source: "nice-cg140",
      quote: "Do not offer fast-acting fentanyl as first-line rescue medication.",
      grade: "Not graded (NICE 1.1.15)",
    },
    {
      action: "Prescribe a regular laxative at an effective dose for everyone starting a strong opioid, and explain that it takes time to work",
      why: "Constipation affects nearly everyone on strong opioids and does not wear off with time.",
      source: "nice-cg140",
      quote: "Prescribe laxative treatment (to be taken regularly at an effective dose) for all patients starting strong opioids.",
      grade: "Not graded (NICE 1.1.18)",
    },
    {
      action: "Optimise laxatives before switching opioid for constipation, and consider a peripherally acting opioid antagonist where laxatives have failed",
      why: "Changing the laxative usually works and keeps the pain control that has been found; antagonists such as naldemedine or naloxegol block opioids in the gut only.",
      source: "nice-cg140",
      quote: "Optimise laxative treatment for managing constipation before considering switching strong opioids.",
      grade: "Not graded (NICE 1.1.20)",
    },
    {
      action: "Warn that nausea and mild drowsiness are common at the start or after a dose rise and usually pass; treat persistent nausea with an anti-emetic before switching opioid",
      why: "Knowing the early side effects usually fade helps people keep taking the medicine; drowsiness can affect driving.",
      source: "nice-cg140",
      quote: "If nausea persists, prescribe and optimise anti-emetic treatment before considering switching strong opioids.",
      grade: "Not graded (NICE 1.1.23)",
    },
    {
      action: "For persistent or moderate to severe drowsiness or confusion, reduce the dose if pain is controlled, or switch opioid if it is not",
      why: "These are signs of too much opioid for this person; lowering the dose or changing the drug usually clears them.",
      source: "nice-cg140",
      quote: "consider dose reduction if pain is controlled or",
      grade: "Not graded (NICE 1.1.25)",
    },
    {
      action: "If breathing is slow and the person cannot be roused, withhold opioid and give naloxone in small, repeated doses aimed at restoring consciousness without bringing back the pain",
      why: "A full reversing dose in someone on long-term opioids brings on severe pain and withdrawal; small doses reverse the danger and keep some pain relief.",
      source: "aus-2025",
      quote: "If respiratory rate ≤ 8/min and the person is unrousable, use the appropriate dose of naloxone in frequent small doses with the aim to improve consciousness without worsening pain (diluting ampoule to 10 mL). (ESMO, NCCN)",
      grade: "Adopted from ESMO and NCCN",
    },
  ],
  bestInClass: {
    statement: "Oral morphine first, regular dosing plus immediate-release oral morphine as rescue (WHO 2018, strong recommendation, moderate-quality evidence; NICE CG140), titrated with frequent review, with a regular laxative from day one (NICE CG140; Australian guideline 2025 citing ESMO, NICE and NCCN). The starting dose for adults without renal or hepatic impairment is NICE's 20 to 30 mg a day; ASCO 2023 starts as needed at the lowest effective dose. The size of the rescue dose differs between sources and is stated side by side: WHO 50 to 100% of the 4-hourly dose; ASCO 2022 (via the Australian guideline) 5 to 20% of the daily dose, up to hourly; NICE a fixed 5 mg while titrating. None of these rests on strong trial evidence: WHO calls its rescue statement best practice and found one small trial.",
    sources: ["who-2018", "nice-cg140", "aus-2025", "asco-2023"],
  },
  variants: [
    {
      name: "Start as needed rather than regularly",
      differs: "Starts immediate-release opioid only as needed (PRN) at the lowest dose, with early assessment and frequent titration, adding a long-acting opioid once three or four doses a day are needed consistently.",
      evidence: "ASCO 2023 recommends PRN initiation at the lowest possible dose; the Australian guideline applies it to intermittent pain and adds NCCN's threshold of 3 to 4 doses a day. NICE and WHO start regular dosing. No trial comparing the two starts was found in the sources read.",
      sources: ["asco-2023", "aus-2025"],
    },
    {
      name: "Rescue dose as a fraction of the daily dose",
      differs: "Sets the rescue dose at 5 to 20% of the daily regular morphine-equivalent dose, available hourly, with advice to seek help if three doses in a row have not worked (Australian guideline, citing ASCO 2022 and NCCN). WHO suggests 50 to 100% of the regular 4-hourly dose, which is roughly 8 to 17% of the daily dose.",
      evidence: "Consensus in all sources. WHO found one small trial (68 patients) on breakthrough pain and could not make a recommendation, issuing a best practice statement instead.",
      sources: ["aus-2025", "who-2018"],
    },
    {
      name: "Transdermal patch first",
      differs: "Starts with a fentanyl or buprenorphine patch instead of oral morphine.",
      evidence: "NICE does not routinely offer patches as first-line maintenance where oral opioids are suitable, and considers them where oral opioids are not suitable and pain is stable. The Australian guideline notes a reduced risk of constipation with transdermal preparations and that they suit stable pain only, because of slow onset and long action.",
      sources: ["nice-cg140", "aus-2025"],
    },
    {
      name: "Oxycodone with naloxone, or methylnaltrexone, for constipation",
      differs: "Where constipation persists despite stimulant and softening laxatives, switches to a less constipating opioid, to oxycodone combined with naloxone (below its maximum dose), or uses methylnaltrexone short term in palliative care.",
      evidence: "Adopted by the Australian guideline from ESMO, NCCN and NICE; NICE refers to its technology appraisals of naldemedine (TA651) and naloxegol (TA345) for people who have had laxatives.",
      sources: ["aus-2025", "nice-cg140"],
    },
  ],
  grades: [
    { claim: "NSAIDs, paracetamol and opioids, alone or together, at the start of cancer pain management", grade: "Strong recommendation; low-quality evidence", source: "who-2018" },
    { claim: "Any opioid may be considered for maintenance of pain relief", grade: "Strong recommendation; low-quality evidence", source: "who-2018" },
    { claim: "Regular oral morphine (immediate or slow release) with immediate-release oral morphine as rescue", grade: "Strong recommendation; moderate-quality evidence", source: "who-2018" },
    { claim: "Breakthrough pain treated with an immediate-release opioid rescue medicine", grade: "Best Practice statement", source: "who-2018", quote: "Breakthrough pain should be treated with a rescue medicine, which should be an opioid such as morphine in its immediate-release formulation." },
    { claim: "Subcutaneous rather than intramuscular route when oral or transdermal routes are not possible", grade: "Best Practice statement", source: "who-2018", quote: "When oral or transdermal routes are not possible for administration of opioids, the subcutaneous route is preferred over intramuscular injection, as this route is less painful for the patient." },
    { claim: "Taper gradually if physical dependence has developed", grade: "Best Practice statement", source: "who-2018", quote: "If a patient has developed physical dependence on opioids over the course of the management of their pain, opioid dosages should be decreased gradually to avoid withdrawal symptoms." },
    { claim: "A regular laxative for all patients starting strong opioids", grade: "Not graded (NICE does not grade recommendations)", source: "nice-cg140" },
    { claim: "Laxatives routinely for prophylaxis and management of opioid-induced constipation", grade: "Adopted from ESMO, NICE and NCCN (strength as in the source guidelines, not printed beside the recommendation)", source: "aus-2025", quote: "Laxatives must be routinely prescribed for both the prophylaxis and the management of opioid‐induced constipation (ESMO, NICE, NCCN)" },
  ],
  sources: [
    {
      key: "nice-cg140",
      label: "Palliative care for adults: strong opioids for pain relief (CG140), recommendations",
      publisher: "NICE",
      year: 2012,
      url: "https://www.nice.org.uk/guidance/cg140/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider', 'do not offer') signals strength. Published May 2012, last updated August 2016.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "who-2018",
      label: "WHO guidelines for the pharmacological and radiotherapeutic management of cancer pain in adults and adolescents",
      publisher: "World Health Organization",
      year: 2018,
      url: "https://iris.who.int/handle/10665/279700",
      gradingScheme: "GRADE: strong or conditional recommendations with high, moderate, low or very low quality of evidence; best practice statements where the guideline group judged the benefit clear without graded evidence.",
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
      gradingScheme: "Recommendations adopted from source guidelines (ESMO, NCCN, NICE, WHO, ASCO) carry the strength of the source, named in brackets after each; de novo recommendations rest on Level 1 evidence or on consensus.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "asco-2023",
      label: "Use of Opioids for Adults With Pain From Cancer or Cancer Treatment: ASCO Guideline",
      publisher: "ASCO (Journal of Clinical Oncology)",
      year: 2023,
      url: "https://doi.org/10.1200/JCO.22.02198",
      doi: "10.1200/JCO.22.02198",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "eapc-2012",
      label: "Use of opioid analgesics in the treatment of cancer pain: evidence-based recommendations from the EAPC",
      publisher: "European Association for Palliative Care (Lancet Oncology)",
      year: 2012,
      url: "https://doi.org/10.1016/S1470-2045(12)70040-2",
      doi: "10.1016/S1470-2045(12)70040-2",
      gradingScheme: "GRADE (16 recommendations).",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "esmo-2018",
      label: "Management of cancer pain in adult patients: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology)",
      year: 2018,
      url: "https://doi.org/10.1093/annonc/mdy152",
      doi: "10.1093/annonc/mdy152",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
    {
      key: "nccn-2025",
      label: "Adult Cancer Pain, Version 2.2025, NCCN Clinical Practice Guidelines in Oncology",
      publisher: "NCCN (Journal of the National Comprehensive Cancer Network)",
      year: 2025,
      url: "https://doi.org/10.6004/jnccn.2025.0032",
      doi: "10.6004/jnccn.2025.0032",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["fentanyl", "methylnaltrexone", "morphine", "oxycodone", "naloxone"],
  technologies: ["pain-management", "palliative-care"],
  terms: [],
  related: ["opioid-switching-and-conversion"],
  upgrades: [],
  gaps: [
    "The ESMO 2018 cancer pain guideline could not be read: Europe PMC holds no abstract, the publisher refused a script and no archived copy was found. What ESMO says is known here only through the Australian guideline (2025), which names ESMO as the source of several recommendations.",
    "The ASCO 2023 opioid guideline and the EAPC 2012 recommendations were read as abstracts only; the full NCCN guideline needs a login and was not read.",
    "The size of the rescue dose rests on consensus in every source read; WHO found a single small trial on breakthrough pain. No source read compares a fixed rescue dose with a percentage of the daily dose.",
    "NICE CG140 dates from 2012 (updated 2016) and the WHO guideline from 2018. No newer edition of either was found.",
    "Children, people with moderate to severe kidney or liver impairment, and people with a substance use disorder need specialist plans that are outside this record.",
  ],
});

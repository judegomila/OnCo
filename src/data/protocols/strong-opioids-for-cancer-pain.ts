import { protocol } from "./helpers";

/*
 * Starting and titrating strong opioids for cancer pain, with rescue doses for breakthrough pain and the laxative that
 * goes with every opioid. One record for three census rows (start and titration, breakthrough pain, opioid-induced
 * constipation), because every source read treats them as one prescription.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again raw
 * with curl into a scratch directory and read as text, every quote was checked verbatim by script, and each step,
 * dose and "offer" against "consider" was read against the passage it cites. What was read, and how:
 * - NICE CG140, Palliative care for adults: strong opioids for pain relief (published 23 May 2012, last updated
 *   3 August 2016, links to technology appraisals added September 2024): the recommendations, context and update
 *   information pages, and the information for the public, full text (HTML).
 * - NICE TA651 (naldemedine, 2020) and TA345 (naloxegol, 2015): recommendation pages, full text (HTML).
 * - WHO guidelines for the pharmacological and radiotherapeutic management of cancer pain in adults and adolescents
 *   (2018): full text, the PDF from the iris.who.int repository read with pdftotext, including Annex 6 (medicine
 *   profiles). Recommendations and best practice statements quoted as printed.
 * - Update of the Australian Guideline for the Management of Cancer Pain in Adults (Cancer Council Australia; Asia-Pac
 *   J Clin Oncol, online 15 November 2025, in the October 2026 issue; PMC13569014): full text, the PMC article page
 *   stripped to text (Europe PMC's full-text service returned an error and the publisher does not allow the XML). It
 *   adopts recommendations from ESMO, NCCN, NICE, WHO and ASCO and names the source of each, so it is the readable
 *   route to what ESMO 2018 and ASCO 2023 say; it is cited as itself. It labels the ASCO guideline "ASCO 2022" (its
 *   online date) and drew on the 2023 version of NCCN.
 * - NCCN Adult Cancer Pain, version 2.2025 (J Natl Compr Canc Netw, July 2025): on 17 November 2026 the journal's
 *   own page served the article text to a plain request, so it is now read as full text. The algorithm pages are
 *   images in that article and were not read. nccn.org lists version 2.2026, which needs a login and was not read.
 * - NHS, Morphine (medicines pages, last reviewed 14 May 2026): full text (HTML), for what patients are told to
 *   report and to whom.
 * - ASCO guideline, Use of Opioids for Adults With Pain From Cancer or Cancer Treatment (Paice et al., J Clin Oncol
 *   2023): abstract only, from Europe PMC (the publisher answered 403 again).
 * - EAPC recommendations on opioids for cancer pain (Caraceni et al., Lancet Oncol 2012): abstract only.
 * - ESMO Clinical Practice Guidelines, Management of cancer pain in adult patients (Fallon et al., Ann Oncol 2018): not
 *   reachable (no abstract in Europe PMC, the publisher answered 403). No step rests on it.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const strongOpioidsForCancerPain = protocol({
  id: "strong-opioids-for-cancer-pain",
  name: "Strong opioids for cancer pain: starting, titrating, rescue doses and preventing constipation",
  aka: ["starting morphine for cancer pain", "opioid titration", "breakthrough cancer pain", "rescue dose", "PRN morphine", "opioid-induced constipation prevention", "laxative with opioids", "WHO analgesic ladder"],
  domain: "palliative",
  tldr: "When cancer pain needs a strong painkiller, morphine by mouth is usually the first choice: a regular dose plus extra 'rescue' doses for pain that breaks through, adjusted until the pain is controlled with side effects you can live with. A laxative should be prescribed from the start, because almost everyone taking strong opioids gets constipated.",
  simple: "Strong painkillers such as morphine are the main treatment for cancer pain that usual painkillers do not control. You take a regular dose, and an extra dose when pain breaks through. The dose is adjusted to suit you. Take your laxative regularly. Feeling sick or sleepy at the start often passes. Tell your team if side effects bother you or the pain is not controlled. The NHS says to call 111 if your breathing slows or you have taken more than your prescribed dose.",
  summary: "NICE CG140 (2012, updated 2016) offers regular oral morphine first, sustained-release or immediate-release by patient preference, with immediate-release oral morphine for rescue. WHO (2018) says any opioid may be considered for maintenance (strong recommendation, low-quality evidence) and found no obviously best opioid; it recommends regular immediate-release or slow-release morphine with immediate-release oral morphine as rescue (strong recommendation, moderate-quality evidence). Starting doses differ between sources. NICE, for adults with no renal or hepatic comorbidities: a typical 20 to 30 mg of oral morphine a day (for example 10 to 15 mg sustained-release twice daily) with 5 mg immediate-release rescue doses during titration. NCCN version 2.2025, for opioid-naive adults: 5 to 7.5 mg of oral morphine sulfate every 3 to 4 hours as needed in one passage, and 5 to 15 mg of short-acting oral morphine in another. ASCO 2023: as needed, at the lowest possible dose, with early assessment and frequent titration. WHO's annex prints an adult range for chronic pain of 2 to 20 mg by mouth every 4 hours and names no starting dose. NICE asks for specialist advice before strong opioids in moderate to severe renal or hepatic impairment; the Australian guideline (2025), citing ASCO, says to use morphine with caution in severe kidney disease (creatinine clearance below 30 mL/min), and says starting doses should be lower in older or frail people. On titration the Australian guideline says evidence is insufficient for any single set of dose steps, cites ASCO for a general minimum increase of 25 to 50%, and cites NCCN for adding the previous 24 hours of rescue doses to the regular dose.\n\nRescue doses are where the numbers differ most: WHO says 50 to 100% of the regular 4-hourly dose may be considered; the Australian guideline, citing ASCO, 5 to 20% of the daily regular morphine-equivalent dose, at one-hour intervals when required; NCCN, usually 10 to 20% of the total daily opioid, every hour by mouth as needed; NICE a fixed 5 mg during titration, and not fast-acting fentanyl first line. NICE says to prescribe a regular laxative for all patients starting strong opioids (1.1.18), to optimise laxatives before considering a switch of opioid, and points to its naldemedine and naloxegol appraisals. On sickness the sources differ: NICE treats nausea if it persists; the Australian guideline routinely prescribes an as-required anti-emetic at the start and at each dose increase. NICE says nausea is likely to be transient and mild drowsiness often transient, and asks for a warning that impaired concentration may affect driving. For persistent or moderate-to-severe central nervous system side effects NICE says to consider dose reduction if pain is controlled, or to consider switching opioid if it is not.\n\nThe ESMO 2018 guideline, which the Australian guideline draws on heavily, could not be read directly, and ASCO 2023 was read as an abstract.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["home", "ward", "outpatient-clinic", "community"],
  },
  population: "Adults with pain from cancer or its treatment that needs a strong opioid. NICE CG140 is written for adults with advanced and progressive disease starting a first strong opioid; it does not cover second-line opioids or care in the last days of life. WHO covers adults (including older persons) and adolescents; ASCO 2023 adults with pain from cancer or cancer treatment; the Australian guideline adults with chronic cancer-related pain. NICE's starting dose is for people with no renal or hepatic comorbidities, and NICE asks for specialist advice in moderate to severe renal or hepatic impairment. The Australian guideline says starting doses should be lower in older or frail people. ASCO says that for people with a substance use disorder clinicians should work with a palliative care, pain or substance use disorder specialist. Children are not covered by any of these guidelines.",
  trigger: "Pain from cancer that is moderate or severe, or that continues despite paracetamol or an anti-inflammatory (Australian guideline, from ESMO and NCCN). NICE starts from an assessment that pain relief at the third step of the WHO pain ladder is needed.",
  steps: [
    {
      action: "Before starting, ask about concerns such as addiction, tolerance, side effects and fears that the treatment implies the final stages of life",
      why: "NICE's information for the public (2012) says people should be reassured that addiction is very unlikely, and that being offered a strong opioid does not necessarily mean being close to the end of life. The NHS morphine page (2026) says it is possible to become addicted and to talk to a doctor about that worry.",
      source: "nice-cg140",
      quote: "When offering pain treatment with strong opioids to a patient with advanced and progressive disease, ask them about concerns such as:",
      grade: "Not graded (NICE 1.1.1)",
    },
    {
      action: "Give spoken and written information on how, when and how often to take regular and rescue doses, side effects and signs of toxicity, safe storage and who to contact out of hours",
      why: "NICE asks for an out-of-hours contact particularly while treatment is being started. WHO adds that the regimen should ideally be written out in full for patients and families to work from.",
      source: "nice-cg140",
      quote: "Provide verbal and written information on strong opioid treatment to patients and carers, including the following:",
      grade: "Not graded (NICE 1.1.2)",
    },
    {
      action: "Offer regular oral morphine, sustained-release or immediate-release by the patient's preference, with rescue doses of immediate-release oral morphine for breakthrough pain",
      why: "NICE names oral morphine as the first strong opioid and leaves the choice of form to the patient. WHO found no difference in pain relief between the two forms (moderate strength of evidence) and recommends immediate-release oral morphine as the rescue with either; WHO also says any opioid may be considered.",
      source: "nice-cg140",
      quote: "When starting treatment with strong opioids, offer patients with advanced and progressive disease regular oral sustained-release or oral immediate-release morphine (depending on patient preference), with rescue doses of oral immediate-release morphine for breakthrough pain.",
      grade: "Not graded (NICE 1.1.4)",
    },
    {
      action: "Where there are no kidney or liver comorbidities, offer a typical starting schedule of 20 to 30 mg oral morphine a day in total (for example 10 to 15 mg sustained-release twice daily), plus 5 mg immediate-release oral morphine for rescue doses while titrating",
      why: "NICE says the dose cannot be estimated in advance and must be titrated for each person; its information for the public says the amount is monitored and adjusted over the first few days. NCCN's starting doses differ and are set out under the variants.",
      source: "nice-cg140",
      quote: "For patients with no renal or hepatic comorbidities, offer a typical total daily starting dose schedule of 20 mg to 30 mg of oral morphine (for example, 10 mg to 15 mg oral sustained-release morphine twice daily), plus 5 mg oral immediate-release morphine for rescue doses during the titration phase.",
      grade: "Not graded (NICE 1.1.5)",
    },
    {
      action: "Seek specialist advice before prescribing a strong opioid in moderate to severe kidney or liver impairment",
      why: "WHO's annex says morphine and its active metabolites are excreted more slowly in renal impairment and accumulate; NCCN says the accumulating metabolites may cause neurological toxicity. The Australian guideline, citing ASCO, says to use morphine with caution when creatinine clearance is below 30 mL/min.",
      source: "nice-cg140",
      quote: "Seek specialist advice before prescribing strong opioids for patients with moderate to severe renal or hepatic impairment.",
      grade: "Not graded (NICE 1.1.7)",
    },
    {
      action: "Offer frequent review, particularly while titrating, and adjust the dose until pain control and side effects are in balance; seek specialist advice if that balance is not reached after a few dose adjustments",
      why: "WHO says the correct dose is the one that relieves the pain to a level acceptable to the patient, and that responses vary by patient and by medicine.",
      source: "nice-cg140",
      quote: "Adjust the dose until a good balance exists between acceptable pain control and side effects. If this balance is not reached after a few dose adjustments, seek specialist advice. Offer patients frequent review, particularly in the titration phase.",
      grade: "Not graded (NICE 1.1.6)",
    },
    {
      action: "When raising the regular dose, consider adding in the rescue doses taken over the previous 24 hours, then reassess pain and side effects within 48 hours",
      why: "The Australian guideline warns against adding in doses taken only for pain on movement, which can leave a person excessively sleepy at rest. It gives a general minimum increase of 25 to 50%, from ASCO, to be weighed against frailty, comorbidities and organ function.",
      source: "aus-2025",
      quote: "Regular dose of opioid may be increased to incorporate the rescue doses taken in previous 24 h (NCCN), then reassess pain severity and adverse effects within 48 h. (Consensus)",
      grade: "Adopted from NCCN; the reassessment within 48 hours is consensus",
    },
    {
      action: "For someone on maintenance oral morphine, offer immediate-release oral morphine as the first-line rescue for breakthrough pain; do not offer fast-acting fentanyl first line",
      why: "WHO also names immediate-release morphine as the rescue medicine, and notes that transmucosal fentanyl is likely to be prohibitively expensive in some low- and middle-income settings. The Australian guideline, citing NCCN, says transmucosal fentanyl may be of use and needs individual titration.",
      source: "nice-cg140",
      quote: "Do not offer fast-acting fentanyl as first-line rescue medication.",
      grade: "Not graded (NICE 1.1.14 and 1.1.15)",
    },
    {
      action: "Prescribe a laxative, taken regularly at an effective dose, for everyone starting a strong opioid; explain that it takes time to work and that keeping to it matters",
      why: "NICE says constipation affects nearly all patients receiving strong opioids. The Australian guideline says laxatives must be routinely prescribed; NCCN says bowel problems should be anticipated and treated prophylactically with a stimulating laxative.",
      source: "nice-cg140",
      quote: "Prescribe laxative treatment (to be taken regularly at an effective dose) for all patients starting strong opioids.",
      grade: "Not graded (NICE 1.1.18)",
    },
    {
      action: "Optimise laxative treatment before considering a switch of opioid for constipation; for people who have already had laxatives, see NICE's appraisals of naldemedine and naloxegol",
      why: "NICE recommends naldemedine as an option for opioid-induced constipation in adults who have had laxative treatment (TA651), and naloxegol for adults whose constipation has not adequately responded to laxatives (TA345).",
      source: "nice-cg140",
      quote: "Optimise laxative treatment for managing constipation before considering switching strong opioids.",
      grade: "Not graded (NICE 1.1.20 and 1.1.21)",
    },
    {
      action: "Advise that nausea may occur at the start or after a dose increase and is likely to pass; if it persists, prescribe and optimise an anti-emetic before considering a switch of opioid",
      why: "NICE treats sickness only if it persists. The Australian guideline goes further and prescribes an as-required anti-emetic routinely at the start and at each dose increase; that difference is set out under the variants.",
      source: "nice-cg140",
      quote: "If nausea persists, prescribe and optimise anti-emetic treatment before considering switching strong opioids.",
      grade: "Not graded (NICE 1.1.22 and 1.1.23)",
    },
    {
      action: "Advise that mild drowsiness or impaired concentration may occur at the start or after a dose increase and is often transient, and warn that impaired concentration may affect driving and other manual tasks",
      why: "The NHS morphine page says not to drive, ride a bike or use machinery while feeling dizzy, sleepy or confused. The Australian guideline says to assess capacity to drive using national guidelines and to warn of impairment at higher doses (consensus).",
      source: "nice-cg140",
      quote: "Warn patients that impaired concentration may affect their ability to drive (see the Driver and Vehicle Licensing Agency's Assessing fitness to drive: a guide for medical professionals) and undertake other manual tasks.",
      grade: "Not graded (NICE 1.1.24)",
    },
    {
      action: "For persistent or moderate-to-severe central nervous system side effects, consider reducing the dose if pain is controlled, or consider switching opioid if it is not",
      why: "NICE words both as options to consider, and adds specialist advice if side effects stay uncontrolled. Where opioid toxicity of the central nervous system is suspected, the Australian guideline also says to review other medicines, rule out other causes and check renal function.",
      source: "nice-cg140",
      quote: "consider dose reduction if pain is controlled or",
      grade: "Not graded (NICE 1.1.25)",
    },
    {
      action: "For opioid-related respiratory depression, withhold the next opioid dose; if the respiratory rate is 8 a minute or less and the person cannot be roused, give naloxone in frequent small doses, aiming to improve consciousness without worsening pain",
      why: "WHO's annex says cautious naloxone dosing is needed to avoid a severe withdrawal syndrome after prolonged opioid use. The Australian guideline gives no dose in milligrams; WHO's annex prints, for opioid overdose, 0.08 to 0.12 mg intravenously every 2 to 3 minutes until the patient is breathing adequately.",
      source: "aus-2025",
      quote: "If respiratory rate ≤ 8/min and the person is unrousable, use the appropriate dose of naloxone in frequent small doses with the aim to improve consciousness without worsening pain (diluting ampoule to 10 mL). (ESMO, NCCN)",
      grade: "Adopted from ESMO and NCCN",
    },
  ],
  bestInClass: {
    statement: "Regular dosing plus an immediate-release rescue dose, titrated with frequent review, with a regular laxative from the start (NICE CG140; WHO 2018, strong recommendation on moderate-quality evidence for regular morphine with immediate-release oral morphine as rescue; Australian guideline 2025 citing ESMO, NICE and NCCN). NICE offers oral morphine first; WHO says any opioid may be considered and found no obviously best one; NCCN calls morphine generally the standard starting drug for someone not exposed to opioids before. Starting doses are stated side by side: NICE 20 to 30 mg a day for adults with no renal or hepatic comorbidities; NCCN 5 to 7.5 mg (in another passage 5 to 15 mg) of short-acting oral morphine as needed for opioid-naive adults; ASCO 2023 as needed at the lowest possible dose. So are rescue doses: WHO 50 to 100% of the 4-hourly dose may be considered; ASCO (through the Australian guideline) 5 to 20% of the daily dose; NCCN usually 10 to 20% of the daily dose, up to hourly; NICE a fixed 5 mg while titrating. None of the rescue figures rests on strong trial evidence: WHO found one small trial and issued a best practice statement.",
    sources: ["who-2018", "nice-cg140", "aus-2025", "asco-2023", "nccn-2025"],
  },
  variants: [
    {
      name: "Start as needed rather than regularly",
      differs: "Starts immediate-release opioid only as needed (PRN) at the lowest possible dose, with early assessment and frequent titration, and considers adding a long-acting opioid once three or four doses a day are needed consistently.",
      evidence: "ASCO 2023 (abstract) says opioids should be initiated PRN at the lowest possible dose to achieve acceptable analgesia and patient goals. The Australian guideline applies PRN initiation to people with intermittent pain and adds NCCN's threshold of 3 to 4 doses a day. NCCN version 2.2025 recommends, for opioid-naive patients with moderate or severe pain, 5 to 7.5 mg of oral morphine sulfate every 3 to 4 hours as needed, or equivalent; its section on morphine prints 5 to 15 mg of short-acting oral morphine, with a half tablet to be considered in frail or older patients. NICE starts with regular dosing, and WHO's principle is dosing by the clock. No trial comparing the two starts was found in the sources read.",
      sources: ["asco-2023", "aus-2025", "nccn-2025"],
    },
    {
      name: "Rescue dose as a fraction of the daily dose",
      differs: "Sets the rescue dose at 5 to 20% of the daily regular morphine-equivalent dose (Australian guideline, citing ASCO), prescribed at one-hour intervals when required (citing NCCN), with advice to seek help if three consecutive doses have not relieved the pain (consensus). NCCN version 2.2025 says the rescue dose is usually 10 to 20% of the total daily opioid and may be given every hour by mouth. WHO says 50 to 100% of the regular 4-hourly dose may be considered, which works out at roughly 8 to 17% of the daily dose.",
      evidence: "Consensus or ungraded in every source read. WHO found one small trial (68 patients) on breakthrough pain and could not make a recommendation, issuing a best practice statement instead. On fast-acting fentanyl, NICE says not to offer it first line; the Australian guideline, citing NCCN, says transmucosal fentanyl may be of use; NCCN's 2025 article states that all transmucosal immediate-release fentanyl medicines had been discontinued by 30 September 2024, without naming the country (NCCN is a United States body).",
      sources: ["aus-2025", "who-2018", "nccn-2025", "nice-cg140"],
    },
    {
      name: "Transdermal patch first",
      differs: "Starts with a fentanyl or buprenorphine patch instead of oral morphine.",
      evidence: "NICE says not to offer patches routinely as first-line maintenance where oral opioids are suitable, and to consider them where oral opioids are not suitable and analgesic requirements are stable. The Australian guideline, citing ESMO and NCCN, says the transdermal route can be considered as an alternative to oral administration if required, only when pain is stable because of its slow onset and long action, and notes a reduced risk of constipation. NCCN says transdermal fentanyl is not indicated for rapid titration and should be recommended only after pain is adequately managed by other opioids in patients who are opioid-tolerant.",
      sources: ["nice-cg140", "aus-2025", "nccn-2025"],
    },
    {
      name: "Oxycodone with naloxone, or methylnaltrexone, for constipation",
      differs: "For an ambulant person with severe opioid constipation that is not responding to oral stimulant and softening laxatives or polyethylene glycol, considers a switch to a less constipating opioid such as fentanyl, a switch to oxycodone combined with naloxone (if the 24-hour dose is below its maximum), or, in palliative care where other laxatives are not indicated or effective, short-term methylnaltrexone.",
      evidence: "Adopted by the Australian guideline from NCCN, NICE and ESMO. NICE refers instead to its technology appraisals: naldemedine (TA651) for adults who have had laxative treatment, and naloxegol (TA345) for adults whose constipation has not adequately responded to laxatives.",
      sources: ["aus-2025", "nice-cg140", "nice-ta651", "nice-ta345"],
    },
    {
      name: "An anti-sickness medicine from the start",
      differs: "Prescribes an as-required anti-emetic routinely when an opioid is started and at each dose increase, rather than only if nausea persists.",
      evidence: "The Australian guideline (2025) says to do this, giving metoclopramide, haloperidol or prochlorperazine as examples, and names no source guideline beside that sentence; if nausea persists after other causes are ruled out, it says to consider a regular anti-emetic (NCCN, NICE, ESMO). NICE says nausea is likely to be transient and asks for an anti-emetic if it persists. NCCN says management of common opioid adverse effects should start at the same time as the opioid.",
      sources: ["aus-2025", "nice-cg140", "nccn-2025"],
    },
  ],
  grades: [
    { claim: "NSAIDs, paracetamol and opioids, alone or together, at the start of cancer pain management", grade: "Strong recommendation; low-quality evidence", source: "who-2018" },
    { claim: "Any opioid may be considered for maintenance of pain relief", grade: "Strong recommendation; low-quality evidence", source: "who-2018" },
    { claim: "Regular oral morphine (immediate or slow release) with immediate-release oral morphine as rescue", grade: "Strong recommendation; moderate-quality evidence", source: "who-2018", quote: "Regularly-dosed immediate-release oral morphine, or regularly-dosed slow-release morphine, should be used to maintain effective and safe pain relief whenever oral dosing is possible. With either formulation, immediate-release oral morphine should be used as rescue medicine." },
    { claim: "Breakthrough pain treated with an immediate-release opioid rescue medicine", grade: "Best Practice statement", source: "who-2018", quote: "Breakthrough pain should be treated with a rescue medicine, which should be an opioid such as morphine in its immediate-release formulation." },
    { claim: "Subcutaneous rather than intramuscular route when oral or transdermal routes are not possible", grade: "Best Practice statement", source: "who-2018", quote: "When oral or transdermal routes are not possible for administration of opioids, the subcutaneous route is preferred over intramuscular injection, as this route is less painful for the patient." },
    { claim: "Taper gradually if physical dependence has developed", grade: "Best Practice statement", source: "who-2018", quote: "If a patient has developed physical dependence on opioids over the course of the management of their pain, opioid dosages should be decreased gradually to avoid withdrawal symptoms." },
    { claim: "A regular laxative for all patients starting strong opioids", grade: "Not graded (NICE does not grade recommendations)", source: "nice-cg140" },
    { claim: "Laxatives routinely for prophylaxis and management of opioid-induced constipation", grade: "Adopted from ESMO, NICE and NCCN (strength as in the source guidelines, not printed beside the recommendation)", source: "aus-2025", quote: "Laxatives must be routinely prescribed for both the prophylaxis and the management of opioid‐induced constipation (ESMO, NICE, NCCN)" },
    { claim: "Starting dose of short-acting oral morphine for opioid-naive patients", grade: "Category 2A (NCCN: all recommendations are category 2A unless otherwise indicated)", source: "nccn-2025", quote: "For patients who are opioid-naïve who are experiencing moderate/severe pain, or mild pain when nonopioid therapies are contraindicated, an initial dose of 5 to 7.5 mg of oral morphine sulfate every 3 to 4 hours as needed, or equivalent, is recommended." },
    { claim: "Rescue dose as a share of the total daily opioid", grade: "Category 2A (NCCN: all recommendations are category 2A unless otherwise indicated)", source: "nccn-2025", quote: "The rescue dose is usually equivalent to 10%–20% of the total opioid daily consumption and may be given every hour orally (or more frequently with subcutaneous or intravenous administration) as needed during severe exacerbations of pain." },
  ],
  sources: [
    {
      key: "nice-cg140",
      label: "Palliative care for adults: strong opioids for pain relief (CG140), recommendations",
      publisher: "NICE",
      year: 2012,
      url: "https://www.nice.org.uk/guidance/cg140/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider', 'do not offer') signals strength. Published May 2012, last updated August 2016; links to technology appraisals on constipation added September 2024.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-cg140-ifp",
      label: "Palliative care for adults: strong opioids for pain relief (CG140), information for the public",
      publisher: "NICE",
      year: 2012,
      url: "https://www.nice.org.uk/guidance/cg140/ifp/chapter/About-this-information",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "who-2018",
      label: "WHO guidelines for the pharmacological and radiotherapeutic management of cancer pain in adults and adolescents",
      publisher: "World Health Organization",
      year: 2018,
      url: "https://iris.who.int/handle/10665/279700",
      gradingScheme: "GRADE: strong or conditional recommendations with high, moderate, low or very low quality of evidence; best practice statements where evidence was scant or lacking and an established practice exists, in view of its potential benefit and the lack of observed harms.",
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
      gradingScheme: "Recommendations adopted from source guidelines (ESMO, NCCN, NICE, WHO, ASCO) carry the strength of the source, named in brackets after each; de novo recommendations rest on Level 1 evidence or on consensus.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nccn-2025",
      label: "Adult Cancer Pain, Version 2.2025, NCCN Clinical Practice Guidelines in Oncology",
      publisher: "NCCN (Journal of the National Comprehensive Cancer Network)",
      year: 2025,
      url: "https://doi.org/10.6004/jnccn.2025.0032",
      doi: "10.6004/jnccn.2025.0032",
      gradingScheme: "NCCN categories of evidence and consensus. All recommendations are category 2A unless otherwise indicated: based on lower-level evidence, with uniform NCCN consensus that the intervention is appropriate.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "asco-2023",
      label: "Use of Opioids for Adults With Pain From Cancer or Cancer Treatment: ASCO Guideline",
      publisher: "ASCO (Journal of Clinical Oncology)",
      year: 2023,
      url: "https://doi.org/10.1200/JCO.22.02198",
      doi: "10.1200/JCO.22.02198",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ta651",
      label: "Naldemedine for treating opioid-induced constipation (TA651)",
      publisher: "NICE",
      year: 2020,
      url: "https://www.nice.org.uk/guidance/ta651/chapter/1-Recommendations",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ta345",
      label: "Naloxegol for treating opioid-induced constipation (TA345)",
      publisher: "NICE",
      year: 2015,
      url: "https://www.nice.org.uk/guidance/ta345/chapter/1-Recommendations",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nhs-morphine",
      label: "Morphine (NHS medicines pages; last reviewed 14 May 2026)",
      publisher: "NHS",
      year: 2026,
      url: "https://www.nhs.uk/medicines/morphine/",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "esmo-2018",
      label: "Management of cancer pain in adult patients: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology)",
      year: 2018,
      url: "https://doi.org/10.1093/annonc/mdy152",
      doi: "10.1093/annonc/mdy152",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["fentanyl", "methylnaltrexone", "morphine", "oxycodone", "naloxone"],
  technologies: ["pain-management", "palliative-care"],
  terms: [],
  related: ["opioid-switching-and-conversion"],
  upgrades: [],
  gaps: [
    "The ESMO 2018 cancer pain guideline could not be read: Europe PMC holds no abstract and on 17 November 2026 the publisher again answered 403 to a script. What ESMO says is known here only through the Australian guideline (2025), which names ESMO as the source of several recommendations. ESMO's own guideline index still lists the 2018 edition.",
    "The ASCO 2023 opioid guideline (publisher answered 403 on 17 November 2026) and the EAPC 2012 recommendations were read as abstracts only. ASCO's figures on this page (a minimum dose increase of 25 to 50%, a rescue dose of 5 to 20% of the daily dose, caution with morphine below a creatinine clearance of 30 mL/min) are as the Australian guideline reports them.",
    "NCCN version 2.2025 was read on 17 November 2026 as the journal article, which served its text openly; its algorithm pages are images and were not read, and the article prints two starting doses of oral morphine for opioid-naive adults (5 to 7.5 mg and 5 to 15 mg) without reconciling them. nccn.org lists version 2.2026 as current; it needs a login and was not read. The Australian guideline drew on the 2023 version of NCCN.",
    "The size of the rescue dose rests on consensus in every source read; WHO found a single small trial on breakthrough pain. No source read compares a fixed rescue dose with a percentage of the daily dose.",
    "NICE CG140 dates from 2012 (updated 2016, links added 2024) and the WHO guideline from 2018. No newer edition of either was found on NICE's update page or in a Europe PMC search on 17 November 2026; WHO's own publication lists were not searched beyond the repository record of the 2018 edition.",
    "The sources read do not agree on addiction: NICE's 2012 information for the public says it is very unlikely, the NHS morphine page (reviewed May 2026) says it is possible. Neither gives a figure.",
    "No guideline read gives patients a list of symptoms to report with a time limit. The advice on this page to call 111 is from the NHS morphine page and applies in the UK.",
    "NICE's recommendations page does not say why fast-acting fentanyl is not first line; the full guideline behind it was not read.",
    "Children are outside every guideline read. Specialist plans for people with moderate to severe kidney or liver impairment or a substance use disorder are outside this record.",
  ],
});

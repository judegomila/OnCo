import { protocol } from "./helpers";

/*
 * Antiemetic prophylaxis for chemotherapy, chosen by the emetic risk of the regimen.
 *
 * Second accuracy pass, 17 November 2026. Every source was fetched again as raw text (curl, the Europe PMC REST API
 * and one NCBI E-utilities call) into a scratch directory, and every quote was checked by script against the saved
 * text, normalising whitespace only (XML tags stripped and entities decoded).
 * - MASCC and ESMO 2023 summary guideline in ESMO Open (2024): the first pass could not read it. It is in PubMed
 *   Central (PMC10937211) and read in full on 17 November 2026 through the Europe PMC full-text XML endpoint. It prints
 *   every recommendation with its grade, so the moderate, low and minimal risk steps now rest on it.
 * - MASCC/ESMO 2023 update, high emetic risk (Herrstedt et al.): full text from Europe PMC (PMC10739516), including
 *   its Table 2.
 * - MASCC/ESMO 2023 update, multiple-day chemotherapy, high-dose chemotherapy and breakthrough nausea and vomiting
 *   (Rapoport et al.): full text from Europe PMC (PMC10725845), including its Table 1.
 * - MASCC/ESMO 2023 emetic risk classification (Jordan et al.): full text from Europe PMC (PMC10739277). Added in this
 *   pass for the rule on combination regimens.
 * - MASCC/ESMO 2023 updates for moderate risk (Celio et al.), low and minimal risk (Olver et al.) and integrative
 *   therapies: abstracts only, from the Europe PMC REST API. link.springer.com again returned a bot challenge.
 * - ASCO Antiemetics guideline update (2020): abstract only; ascopubs.org returned 403. Europe PMC lists two errata,
 *   not read.
 * - The 2024 comparison of ASCO 2020, NCCN 2023, MASCC/ESMO 2023 and CCO 2019, the 2025 "Going beyond" review and the
 *   SPARED trial (2024): abstracts only, from Europe PMC.
 * - Not read: NCCN Antiemesis (login), Cancer Care Ontario (its site returned 403 to a script), mascc.org (403).
 * Every DOI was resolved through Europe PMC and its title checked. In the full-text XML the subscripts in "5-HT3" and
 * "NK1" are tagged, so sentences containing them are not used as quotes.
 *
 * Corrected in this pass: rescue olanzapine is for people who did not already have it as prophylaxis; the oxaliplatin
 * recommendation is for women aged 50 or under and is a suggestion graded III, B; low-risk prophylaxis is "may be
 * considered"; aprepitant continues on days 2 and 3 where the 125 mg capsule is used, so olanzapine is not given
 * "alone" after anthracycline with cyclophosphamide; the high-dose recommendation names an NK1 receptor antagonist,
 * not aprepitant only; several "why" lines said more than the sources.
 */
export const antiemeticProphylaxisByEmeticRisk = protocol({
  id: "antiemetic-prophylaxis-by-emetic-risk",
  name: "Antiemetic prophylaxis for chemotherapy by emetic risk",
  aka: ["CINV prophylaxis", "chemotherapy-induced nausea and vomiting prevention", "antiemetic regimen by emetogenicity", "anti-sickness medicines with chemotherapy"],
  domain: "supportive-care",
  tldr: "Anti-sickness medicines given before chemotherapy prevent sickness for many people. Which ones you get depends on how likely your chemotherapy is to cause sickness: for the strongest regimens that is four medicines before treatment and some for the days after, for the mildest none at all. If you are still sick, tell your team: there is a next step.",
  simple: "Some cancer medicines make people sick. Doctors give anti-sickness medicines before treatment to stop it happening. The stronger the treatment, the more of these medicines you get.",
  summary: "Prophylaxis is chosen by the emetic risk of the regimen. For intravenous drugs MASCC/ESMO (2023) define this as the proportion of patients who vomit in the first 24 hours without effective prophylaxis: high, more than 90 per cent; moderate, 30 to 90 per cent; low, 10 to 30 per cent; minimal, under 10 per cent. A combination takes the level of its most emetic drug, except that an anthracycline with cyclophosphamide counts as high. Sex and age also matter: women and younger patients are at higher risk. For high emetic risk MASCC/ESMO recommend four drugs before chemotherapy: a 5-HT3 receptor antagonist, dexamethasone, an NK1 receptor antagonist (aprepitant, fosaprepitant, netupitant or fosnetupitant with palonosetron, or rolapitant) and olanzapine (I, A). For delayed nausea after cisplatin and other high-risk regimens that are not anthracycline with cyclophosphamide, dexamethasone and olanzapine on days 2 to 4 are suggested (II, B); in women having anthracycline with cyclophosphamide, dexamethasone is not needed beyond day 1 and olanzapine on days 2 to 4 is suggested (II, B). Where aprepitant 125 mg is used on day 1, aprepitant 80 mg follows on days 2 and 3. For olanzapine, 10 mg once daily for 4 days is the best investigated dose; a starting dose of 5 mg, or a bedtime dose, is an option where sedation is a concern (II, B). None of the texts read recommends a dose of dexamethasone or of a 5-HT3 receptor antagonist.\n\nFor moderate emetic risk, MASCC/ESMO recommend a three-drug regimen with an NK1 receptor antagonist for carboplatin at AUC 5 or more, and suggest adding one for women aged 50 or under having oxaliplatin (III, B); other moderate-risk regimens get a 5-HT3 receptor antagonist with dexamethasone (II, C), and no steroid is routinely given after day 1 (II, B). For low emetic risk a single agent may be considered before treatment (II, B); for minimal risk, and for the delayed phase of both, none is given routinely (IV, D). ASCO (2020) sees no reason to leave out dexamethasone when checkpoint inhibitors are given with chemotherapy and requires no routine prophylaxis for checkpoint inhibitors alone. For breakthrough nausea and vomiting MASCC/ESMO suggest olanzapine where it was not part of the prophylaxis, with some evidence for 10 mg once daily for 3 days (II, B); for high-dose chemotherapy before stem cell transplant, a 5-HT3 receptor antagonist with dexamethasone and an NK1 receptor antagonist (I, A), with olanzapine to be considered.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "pharmacist", "nurse", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "ward", "outpatient-clinic", "home"],
  },
  population: "Adults having intravenous anticancer treatment. MASCC/ESMO state that all their recommendations are for the first course of treatment and may need modifying in later courses, and that their risk classification refers to adults only. Their recommendations for anthracycline with cyclophosphamide rest on data in women treated for breast cancer. Children (ASCO 2020 adds fosaprepitant to its paediatric recommendations) and radiotherapy-induced nausea are not covered here. For oral anticancer drugs MASCC/ESMO give no precise recommendation and say that in general only on-demand antiemetics are recommended.",
  trigger: "A chemotherapy regimen is prescribed, before the first cycle.",
  steps: [
    {
      action: "Before the first cycle, classify the regimen by its emetic risk: high, moderate, low or minimal",
      why: "The most sickness-causing drug in a combination sets the level, which decides the anti-sickness medicines needed. The one exception is an anthracycline given with cyclophosphamide, which together count as high risk.",
      source: "mascc-esmo-2023-classification",
      quote: "For combination antineoplastic regimens, the emetic level is determined by identifying the most emetic agent in the combination.",
    },
    {
      action: "Take the person's own risk factors into account as well, such as being female and younger",
      why: "Two people on the same regimen do not have the same risk; women and younger people are at higher risk.",
      source: "mascc-esmo-2023-hec",
      quote: "patient demographics such as sex (women are at a higher risk than men) and age (younger patients have a higher risk than older)",
    },
    {
      action: "For high emetic risk, give four drugs before chemotherapy: a 5-HT3 receptor antagonist, dexamethasone, an NK1 receptor antagonist and olanzapine",
      why: "Large trials showed that adding olanzapine to the older three-drug combination prevents more nausea, so it is now a fixed part of the regimen.",
      source: "mascc-esmo-2023-hec",
      quote: "Olanzapine is now recommended as a fixed part of a four-drug prophylactic antiemetic regimen in both non-AC and AC HEC.",
      grade: "I, A",
    },
    {
      action: "After cisplatin or other high-risk regimens that are not anthracycline with cyclophosphamide, give dexamethasone and olanzapine on days 2 to 4; if aprepitant 125 mg was used on day 1, give aprepitant 80 mg once on days 2 and 3",
      why: "This is to prevent delayed sickness. The guideline words it as a suggestion: the evidence for stopping the steroid after day 1 in these regimens is not conclusive, so the earlier 3 to 4 day steroid regimen stands.",
      source: "mascc-esmo-2023-hec",
      quote: "DEX and olanzapine on days 2 to 4 is suggested to prevent delayed nausea and vomiting",
      grade: "II, B",
    },
    {
      action: "After anthracycline with cyclophosphamide, give no dexamethasone beyond day 1 and continue olanzapine on days 2 to 4; if aprepitant 125 mg was used on day 1, give aprepitant 80 mg once on days 2 and 3",
      why: "Pooled trials found one day of steroid as good as three days after this regimen. The grade II, B is for olanzapine on days 2 to 4; the guideline says the evidence for limiting the steroid to day 1 is level I.",
      source: "mascc-esmo-2023-hec",
      quote: "There is no need to prescribe steroids (dexamethasone) beyond day 1 after AC HEC, whereas a 4-day regimen is recommended in non-AC HEC.",
      grade: "II, B",
    },
    {
      action: "Give olanzapine once daily for 4 days; 10 mg is the best investigated dose, and a starting dose of 5 mg or a bedtime dose is an option where drowsiness is a concern, for example in older people",
      why: "5 mg works better than placebo, but no robust study has compared it with 10 mg, so it is not known whether it works as well.",
      source: "mascc-esmo-2023-hec",
      quote: "If sedation is a concern, a starting daily dose of 5 mg and/or administration at bedtime is an option",
      grade: "II, B",
    },
    {
      action: "For carboplatin at AUC 5 or more, give three drugs before chemotherapy: a 5-HT3 receptor antagonist, dexamethasone and an NK1 receptor antagonist",
      why: "The MASCC/ESMO summary notes that the trials showing a benefit from the third drug all used carboplatin at AUC 5 or more, and that no data justify an NK1 receptor antagonist below AUC 5.",
      source: "mascc-esmo-2023-mec",
      quote: "for patients undergoing carboplatin (AUC ≥ 5) and women < 50 years of age receiving oxaliplatin-based treatment",
    },
    {
      action: "For oxaliplatin, give a 5-HT3 receptor antagonist (palonosetron preferred) and dexamethasone before chemotherapy; consider adding an NK1 receptor antagonist for women aged 50 or under",
      why: "In one trial the third drug helped women more than men, and another trial was in women aged 50 or under. The guideline words the addition as a suggestion and says there is no evidence for using it routinely first line in women over 50.",
      source: "mascc-esmo-2023-esmo-open",
      grade: "III, B",
    },
    {
      action: "For other moderate-risk regimens, give a 5-HT3 receptor antagonist with dexamethasone before chemotherapy; for all moderate-risk regimens, give no steroid routinely after day 1",
      why: "One day of steroid was shown to be no worse than three days for these regimens. If aprepitant 125 mg was used on day 1, aprepitant 80 mg still follows on days 2 and 3.",
      source: "mascc-esmo-2023-esmo-open",
      quote: "No steroid (or other antiemetic) should be routinely administered after day 1 MEC administration",
      grade: "II, B",
    },
    {
      action: "For low emetic risk, consider a single anti-sickness drug before treatment, such as dexamethasone, a 5-HT3 receptor antagonist or a dopamine receptor antagonist such as metoclopramide",
      why: "The guideline says one drug may be considered. It reports overuse, where two drugs were given and one is recommended.",
      source: "mascc-esmo-2023-esmo-open",
      grade: "II, B",
    },
    {
      action: "For minimal emetic risk, give no routine anti-sickness drug before treatment to people with no history of nausea and vomiting; for low and minimal risk, give none routinely for the following days",
      why: "With minimal-risk treatments fewer than one person in ten is at risk of vomiting, and the guideline reports that anti-sickness drugs are overused with them.",
      source: "mascc-esmo-2023-esmo-open",
      quote: "No antiemetic should be routinely administered before ChT of minimal emetic risk to patients without a history of nausea and vomiting",
      grade: "IV, D",
    },
    {
      action: "Keep dexamethasone in the regimen when a checkpoint inhibitor is given with chemotherapy; give no routine prophylaxis for a checkpoint inhibitor alone",
      why: "ASCO found no clinical evidence for leaving the steroid out: two lung cancer trials recommended dexamethasone for all patients, and the groups given immunotherapy as well still did better. MASCC/ESMO class the checkpoint inhibitors as minimal risk.",
      source: "asco-2020",
      quote: "There is no clinical evidence to warrant omission of dexamethasone from guideline-compliant prophylactic antiemetic regimens when CPIs are administered to adults in combination with chemotherapy.",
    },
    {
      action: "For high-dose chemotherapy before a stem cell transplant, give a 5-HT3 receptor antagonist, dexamethasone and an NK1 receptor antagonist before chemotherapy; consider olanzapine once daily at bedtime, continued for 2 to 3 days after chemotherapy",
      why: "High-dose chemotherapy is very likely to cause delayed sickness. In a randomised trial, adding olanzapine to the three drugs improved control in the days after treatment. The grade is for the three drugs.",
      source: "mascc-esmo-2023-multiday",
      quote: "Olanzapine could be considered part of the antiemetic regimen.",
      grade: "I, A",
    },
    {
      action: "For cisplatin given over several days, give a 5-HT3 receptor antagonist on each chemotherapy day, and dexamethasone, aprepitant (125 mg by mouth on day 1, then 80 mg) and olanzapine 5 mg at bedtime once daily from day 1 until 2 days after chemotherapy",
      why: "A large trial showed four drugs worked better than three for cisplatin given over several days. The grade I, A is for the four drugs; the number of days is graded II, B.",
      source: "mascc-esmo-2023-multiday",
      quote: "Olanzapine (in a dose of 5 mg at bedtime), aprepitant, and dexamethasone should be given once daily on the days of chemotherapy and until 2 days post-chemotherapy",
      grade: "I, A; II, B for the number of days",
    },
    {
      action: "If nausea or vomiting breaks through despite prophylaxis, look for other causes and consider olanzapine if it was not part of the prophylaxis; some evidence supports 10 mg once daily for 3 days",
      why: "The evidence for rescue olanzapine comes from people who were not already taking it. Other causes of lasting sickness include constipation, other medicines such as opioids and antibiotics, and salt imbalances.",
      source: "mascc-esmo-2023-multiday",
      quote: "The available evidence for breakthrough nausea and vomiting suggests the use of olanzapine if not used for primary prophylaxis (some evidence supports a single daily dose of 10 mg for 3 days)",
      grade: "II, B",
    },
    {
      action: "If there was nausea or vomiting in the previous cycle, move to the regimen recommended for the next higher level of risk",
      why: "Sickness in an earlier cycle is a major risk factor for sickness in the next. The guideline states this in its section on low-risk chemotherapy and gives it no grade.",
      source: "mascc-esmo-2023-esmo-open",
      quote: "Nausea and/or vomiting in the previous course is a major risk factor and should generally lead to the antiemetic regimen recommended for the next higher level of emesis.",
    },
  ],
  bestInClass: {
    statement: "The MASCC/ESMO 2023 update is the most recent international guideline found and the only one read here in full. It makes olanzapine a fixed part of a four-drug regimen for all high emetic risk chemotherapy (I, A), which it notes is in line with ASCO; keeps dexamethasone on days 2 to 4 after cisplatin and other regimens that are not anthracycline with cyclophosphamide; limits it to day 1 after anthracycline with cyclophosphamide, carboplatin and other moderate-risk regimens; and withdraws its earlier recommendation of an NK1 receptor antagonist for carboplatin below AUC 5. ASCO's latest update (2020) was read only as an abstract: it left its adult recommendations unchanged apart from adding olanzapine as an option in stem cell transplant, added the option of a 5 mg olanzapine dose, and is the source for keeping dexamethasone with chemotherapy plus checkpoint inhibitors. On olanzapine dose the two are close in what could be read: ASCO lists 5 mg as an option, and MASCC/ESMO call 10 mg the best investigated dose with 5 mg as an option where sedation is a concern. Where ASCO, NCCN and MASCC/ESMO differ on drug doses or on the carboplatin threshold could not be checked, because the ASCO full text, NCCN (2023) and Cancer Care Ontario (2019) were not read. A 2024 comparison of all four says they share many fundamental similarities and that the literature on low and minimal risk regimens is lacking.",
    sources: ["mascc-esmo-2023-esmo-open", "mascc-esmo-2023-hec", "mascc-esmo-2023-mec", "mascc-esmo-2023-low", "mascc-esmo-2023-multiday", "asco-2020", "comparison-2024"],
  },
  variants: [
    {
      name: "Olanzapine 5 mg rather than 10 mg",
      differs: "Uses 5 mg of olanzapine once daily, in some studies at bedtime, to reduce drowsiness. ASCO's 2020 update added the option of a 5 mg dose for adults.",
      evidence: "MASCC/ESMO (2023) found that 5 mg is superior to placebo but that no robust study has compared it with 10 mg, so they call 10 mg the best investigated dose and 5 mg an option where sedation is a concern (II, B). For cisplatin given over several days their recommended dose is 5 mg at bedtime, the dose used in the trial behind that recommendation. The 2025 review by members of the committee lists doses below 10 mg a day as an open question.",
      sources: ["asco-2020", "mascc-esmo-2023-hec", "mascc-esmo-2023-multiday", "beyond-2025"],
    },
    {
      name: "Dexamethasone on day 1 only after cisplatin (steroid-sparing)",
      differs: "Stops dexamethasone after day 1 for cisplatin as well as for anthracycline with cyclophosphamide, to reduce steroid exposure.",
      evidence: "MASCC/ESMO judged the trials inconclusive for cisplatin and kept the 3 to 4 day regimen; they note that a few studies have tested a 1-day regimen in cisplatin, one showing comparable efficacy, and that none of the trials they considered included olanzapine. The SPARED trial, published in full after the guideline (British Journal of Cancer, 2024; read as an abstract), gave palonosetron, an NK1 receptor antagonist and olanzapine 5 mg to 278 randomised patients having cisplatin: complete response in the delayed phase was 75.0 per cent with dexamethasone on day 1 only and 79.7 per cent with days 1 to 4, which met its non-inferiority margin, but total control was significantly lower and nausea and appetite loss more frequent with day 1 only. Its authors call steroid-sparing an alternative option to be applied on an individual basis. The 2025 review lists this as an open question.",
      sources: ["mascc-esmo-2023-hec", "mascc-esmo-2023-esmo-open", "spared-2024", "beyond-2025"],
    },
    {
      name: "Non-drug approaches alongside medicines (MASCC/ESMO integrative review)",
      differs: "Adds acupuncture or electroacupuncture, advice on eating from a dietitian or other health professional, or progressive muscle relaxation with or without guided imagery to the drug regimen, never in place of it.",
      evidence: "MASCC/ESMO (2023) suggest each of these three as an addition to standard antiemetics (II, B), noting that any effect of acupuncture may be short-lived. They found major methodological flaws in many trials, could make no recommendation for ginger because the evidence conflicts (III, C) or for acupressure, do not recommend non-invasive electrical stimulation (III, C), and could make no clear recommendation for aromatherapy, hypnosis in adults, music therapy or reflexology. Their consensus was that no such therapy can replace the recommended drug regimens.",
      sources: ["mascc-esmo-2023-integrative", "mascc-esmo-2023-esmo-open"],
    },
  ],
  grades: [
    { claim: "Four-drug regimen with olanzapine before high emetic risk chemotherapy, both cisplatin-type and anthracycline with cyclophosphamide", grade: "I, A", source: "mascc-esmo-2023-hec", quote: "Olanzapine is now recommended as a fixed part of a four-drug prophylactic antiemetic regimen in both non-AC and AC HEC." },
    { claim: "Dexamethasone and olanzapine on days 2 to 4 after high emetic risk chemotherapy that is not anthracycline with cyclophosphamide", grade: "II, B", source: "mascc-esmo-2023-hec", quote: "DEX and olanzapine on days 2 to 4 is suggested to prevent delayed nausea and vomiting" },
    { claim: "Olanzapine on days 2 to 4 in women treated with anthracycline with cyclophosphamide", grade: "II, B", source: "mascc-esmo-2023-hec" },
    { claim: "Olanzapine dose and schedule: 10 mg best investigated, once daily for 4 days, with a 5 mg starting dose or a bedtime dose as an option where sedation is a concern", grade: "II, B", source: "mascc-esmo-2023-hec", quote: "The best investigated dose is 10 mg." },
    { claim: "No steroid or other antiemetic routinely after day 1 of carboplatin, oxaliplatin or other moderate emetic risk chemotherapy", grade: "II, B", source: "mascc-esmo-2023-esmo-open", quote: "No steroid (or other antiemetic) should be routinely administered after day 1 MEC administration" },
    { claim: "Adding an NK1 receptor antagonist for women aged 50 or under having oxaliplatin", grade: "III, B", source: "mascc-esmo-2023-esmo-open" },
    { claim: "5-HT3 receptor antagonist with dexamethasone before other moderate emetic risk chemotherapy (not carboplatin, not oxaliplatin)", grade: "II, C", source: "mascc-esmo-2023-esmo-open" },
    { claim: "A single antiemetic may be considered before chemotherapy of low emetic risk", grade: "II, B", source: "mascc-esmo-2023-esmo-open" },
    { claim: "No routine antiemetic before chemotherapy of minimal emetic risk, and none routinely for delayed nausea and vomiting after low or minimal risk chemotherapy", grade: "IV, D", source: "mascc-esmo-2023-esmo-open", quote: "No antiemetic should be routinely administered before ChT of minimal emetic risk to patients without a history of nausea and vomiting" },
    { claim: "Four drugs for multiple-day cisplatin", grade: "I/A (acute); II/B for the number of days", source: "mascc-esmo-2023-multiday" },
    { claim: "5-HT3 receptor antagonist, dexamethasone and an NK1 receptor antagonist (aprepitant in the paper's table) for high-dose chemotherapy before stem cell transplant", grade: "I/A", source: "mascc-esmo-2023-multiday" },
    { claim: "Olanzapine for breakthrough nausea and vomiting where it was not used for primary prophylaxis", grade: "II/B", source: "mascc-esmo-2023-multiday" },
  ],
  sources: [
    { key: "mascc-esmo-2023-esmo-open", label: "2023 MASCC and ESMO guideline update for the prevention of chemotherapy- and radiotherapy-induced nausea and vomiting", publisher: "MASCC and ESMO, ESMO Open", year: 2024, url: "https://europepmc.org/article/PMC/PMC10937211", doi: "10.1016/j.esmoop.2023.102195", gradingScheme: "Levels of evidence (I to V) and grades of recommendation (A to E), printed in square brackets after each recommendation, for example [I, A], according to an adapted version of the Infectious Diseases Society of America grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "mascc-esmo-2023-hec", label: "2023 updated MASCC/ESMO consensus recommendations: prevention of nausea and vomiting following high-emetic-risk antineoplastic agents", publisher: "MASCC and ESMO, Supportive Care in Cancer", year: 2023, url: "https://europepmc.org/article/PMC/PMC10739516", doi: "10.1007/s00520-023-08221-4", gradingScheme: "Each recommendation printed in a table with a level of evidence (Roman numeral) and a grade of recommendation (letter), for example I and A; the scheme is the one described for the ESMO Open summary.", read: "full-text", accessed: "2026-11-17" },
    { key: "mascc-esmo-2023-multiday", label: "2023 updated MASCC/ESMO consensus recommendations: prevention of nausea and vomiting following multiple-day chemotherapy, high-dose chemotherapy, and breakthrough nausea and vomiting", publisher: "MASCC and ESMO, Supportive Care in Cancer", year: 2023, url: "https://europepmc.org/article/PMC/PMC10725845", doi: "10.1007/s00520-023-08224-1", gradingScheme: "Level of evidence and grade of recommendation printed together, as I/A in the table and as I, A in the text.", read: "full-text", accessed: "2026-11-17" },
    { key: "mascc-esmo-2023-classification", label: "Emetic risk classification and evaluation of the emetogenicity of antineoplastic agents-updated MASCC/ESMO consensus recommendation", publisher: "MASCC and ESMO, Supportive Care in Cancer", year: 2023, url: "https://europepmc.org/article/PMC/PMC10739277", doi: "10.1007/s00520-023-08220-5", read: "full-text", accessed: "2026-11-17" },
    { key: "mascc-esmo-2023-mec", label: "2023 updated MASCC/ESMO Consensus recommendations: Prevention of nausea and vomiting following moderately emetic risk antineoplastic agents", publisher: "MASCC and ESMO, Supportive Care in Cancer", year: 2023, url: "https://europepmc.org/abstract/MED/38114821", doi: "10.1007/s00520-023-08222-3", read: "abstract", accessed: "2026-11-17" },
    { key: "mascc-esmo-2023-low", label: "2023 updated MASCC/ESMO consensus recommendations: controlling nausea and vomiting with chemotherapy of low or minimal emetic potential", publisher: "MASCC and ESMO, Supportive Care in Cancer", year: 2023, url: "https://europepmc.org/abstract/MED/38110581", doi: "10.1007/s00520-023-08223-2", read: "abstract", accessed: "2026-11-17" },
    { key: "mascc-esmo-2023-integrative", label: "2023 MASCC/ESMO consensus antiemetic guidelines related to integrative and non-pharmacological therapies", publisher: "MASCC and ESMO, Supportive Care in Cancer", year: 2023, url: "https://europepmc.org/abstract/MED/38102373", doi: "10.1007/s00520-023-08225-0", read: "abstract", accessed: "2026-11-17" },
    { key: "asco-2020", label: "Antiemetics: ASCO Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2020, url: "https://europepmc.org/abstract/MED/32658626", doi: "10.1200/JCO.20.01296", read: "abstract", accessed: "2026-11-17" },
    { key: "comparison-2024", label: "2020 ASCO, 2023 NCCN, 2023 MASCC/ESMO, and 2019 CCO: a comparison of antiemetic guidelines for the treatment of chemotherapy-induced nausea and vomiting in cancer patients", publisher: "Supportive Care in Cancer", year: 2024, url: "https://europepmc.org/abstract/MED/38594320", doi: "10.1007/s00520-024-08462-x", read: "abstract", accessed: "2026-11-17" },
    { key: "beyond-2025", label: "Going beyond the 2023 MASCC and ESMO guideline update for the prevention of chemotherapy- and radiotherapy-induced nausea and vomiting", publisher: "European Journal of Cancer", year: 2025, url: "https://europepmc.org/abstract/MED/40288116", doi: "10.1016/j.ejca.2025.115451", read: "abstract", accessed: "2026-11-17" },
    { key: "spared-2024", label: "Dexamethasone-sparing on days 2-4 with combined palonosetron, neurokinin-1 receptor antagonist, and olanzapine in cisplatin: a randomized phase III trial (SPARED Trial)", publisher: "British Journal of Cancer", year: 2024, url: "https://europepmc.org/abstract/MED/37973958", doi: "10.1038/s41416-023-02493-7", read: "abstract", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-moon-olanzapine-antiemetic-everywhere"],
  gaps: [
    "No dose of dexamethasone, of a 5-HT3 receptor antagonist or of an NK1 receptor antagonist other than aprepitant is given here, because none of the texts read recommends one: the MASCC/ESMO papers report the doses used inside trials but recommend only the aprepitant and olanzapine doses shown in the steps. The ASCO dosing table and the NCCN guideline, which may print doses, could not be read on 17 November 2026.",
    "The moderate, low and integrative papers of the MASCC/ESMO update were read only as abstracts (the publisher returned a bot challenge to a script on 17 November 2026); their recommendations and grades are taken from the ESMO Open summary of the same guideline, which was read in full.",
    "For carboplatin at AUC 5 or more, the ESMO Open summary prints no grade after the three-drug recommendation itself; the grade I, A appears after the next sentence, that no data justify an NK1 receptor antagonist below AUC 5. The step therefore carries no grade.",
    "For oxaliplatin, the abstract of the moderate-risk paper says women under 50, while the recommendation in the ESMO Open summary says women aged 50 or under; the step follows the recommendation.",
    "ASCO 2020 was read only as an abstract (the publisher returned 403 on 17 November 2026); its table of regimens, its paediatric recommendations, its doses and its two published errata were not read. No ASCO antiemetic update after 2020 was found in Europe PMC on 17 November 2026.",
    "NCCN Antiemesis guidelines require a login and were not read, so the version current today was not checked; Cancer Care Ontario's site returned 403 to a script on 17 November 2026. Where these guidelines and ASCO differ from MASCC/ESMO on doses or thresholds is therefore not stated here.",
    "No MASCC/ESMO update after 2023 was found in Europe PMC on 17 November 2026. Two later MASCC papers exist and were not read: patient-centred antiemetic guidelines and education statements (2024) and consensus recommendations for resource-limited settings (2025).",
    "The emetic risk of several newer drugs is not settled: MASCC/ESMO place sacituzumab govitecan and trastuzumab deruxtecan at the high end of the moderate category, suggest preventing sickness as for carboplatin at AUC 5 or more, and say prospective studies are needed.",
    "The data that make anthracycline with cyclophosphamide high risk come almost entirely from women with breast cancer; MASCC/ESMO say it is still debated whether the pair is also highly emetic inside regimens such as CHOP for lymphoma.",
    "For oral anticancer drugs MASCC/ESMO give no precise recommendation, saying data are very limited and that in general only on-demand antiemetics are recommended; the 2025 review lists nausea from oral therapies and long-delayed nausea as open questions.",
    "Whether dexamethasone can be limited to day 1 after cisplatin when olanzapine is added is unresolved in the guidelines: MASCC/ESMO did not consider the SPARED trial, then an abstract only. It has since been published in full and is described under the variants from its abstract; the full paper was not read.",
    "No record for olanzapine, fosaprepitant or fosnetupitant exists in this corpus, so they are not linked from this page.",
  ],
  institutions: ["mascc", "esmo", "asco"],
  technologies: ["antiemetic-therapy"],
  drugs: ["aprepitant", "netupitant-palonosetron", "palonosetron", "ondansetron", "granisetron", "rolapitant", "dexamethasone", "cisplatin", "carboplatin", "oxaliplatin", "cyclophosphamide"],
  related: [],
  sections: ["supportive-care"],
  tags: ["protocol", "nausea-and-vomiting", "supportive-care"],
});

import { protocol } from "./helpers";

/*
 * Nausea and vomiting in advanced cancer that is not caused by chemotherapy or radiotherapy: assessment for a cause,
 * correcting what can be corrected, choosing an antiemetic, bowel obstruction, and refractory nausea. Nausea from
 * anticancer treatment is covered by the antiemetic prophylaxis protocol, linked in `related`.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again raw
 * (curl, the Europe PMC REST API, or a copy a sibling checker saved the same night) and every quote was checked by
 * script against the saved text. What was read, and how:
 * - MASCC antiemetics in advanced cancer updated guideline (Davis et al., Support Care Cancer 2021): abstract, from
 *   Europe PMC; the full text is behind Springer's paywall. The first pass missed this paper and called the 2016
 *   statement the latest. It is the newer one, and it makes metoclopramide and haloperidol both first line.
 * - 2016 updated MASCC/ESMO consensus recommendations on nausea and vomiting in advanced cancer (Walsh et al., Support
 *   Care Cancer 2017): abstract only, from Europe PMC. The 2023 MASCC/ESMO antiemetic update has no paper on advanced
 *   cancer (Europe PMC title search, and the 2023 summary saved by a sibling).
 * - MASCC 2021 guideline update on medical management of malignant bowel obstruction (Davis et al.): abstract.
 * - MASCC 2022 multidisciplinary recommendations on malignant bowel obstruction (Madariaga et al., PMC9046338): full
 *   text, from the copy a sibling checker fetched from Europe PMC on 16 November 2026.
 * - Scottish Palliative Care Guidelines, "Nausea and vomiting" (published 2025, updating 2019) and "Bowel obstruction"
 *   (the page prints no date): full public pages.
 * - NICE NG31, Care of dying adults in the last days of life (2015): recommendations page, from a sibling's copy
 *   fetched on 17 November 2026.
 * - MHRA Drug Safety Update on metoclopramide (article dated August 2013) and the EMA referral page on
 *   metoclopramide-containing medicines (Commission decision of 20 December 2013): full public pages.
 * - Randomised trials: Hardy et al., BMC Cancer 2018 (PMC5932901) and BMJ Open 2019 (PMC6747674), full text from
 *   Europe PMC; Navari et al., JAMA Oncol 2020 (PMC7206532), full text from PubMed Central, which the first pass had
 *   read only as an abstract.
 * - Cochrane reviews of haloperidol and of levomepromazine in palliative care (both 2015): abstracts from Europe PMC;
 *   the levomepromazine review also as full text from PubMed Central. PubMed Central answered the haloperidol review
 *   with a browser check, which was not retried.
 * - NICE Clinical Knowledge Summary "Palliative care: nausea and vomiting": cks.nice.org.uk returned 403 to a script
 *   again, and the Internet Archive held no copy at the address tried. Not read.
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text
 * with nothing changed.
 */
export const nauseaAndVomitingInAdvancedCancer = protocol({
  id: "nausea-and-vomiting-in-advanced-cancer",
  name: "Nausea and vomiting in advanced cancer not caused by cancer treatment",
  aka: ["palliative nausea and vomiting", "chronic nausea in advanced cancer", "nausea not related to chemotherapy", "antiemetic choice in palliative care", "malignant bowel obstruction nausea"],
  domain: "palliative",
  tldr: "In advanced cancer, nausea and vomiting often have a cause that can be found and treated, such as constipation, a high calcium level, a medicine, or a blocked bowel. Your team will look for the cause, stop medicines that may worsen it, and choose an anti-sickness medicine that suits it, under the skin or by a small pump if tablets will not stay down. Say if it is not improving.",
  simple: "When cancer is advanced, feeling sick often has a cause that can be fixed. Your team will look for it and choose the right medicine. Tell them if it does not help.",
  summary: "MASCC's 2021 update, read as its abstract, names metoclopramide and haloperidol as first-line antiemetics in advanced cancer, methotrimeprazine (levomepromazine) and olanzapine as second line, and tropisetron and levosulpiride as third line, each on MASCC level II evidence. It follows the 2016 MASCC/ESMO statement, which found the evidence minimal and of low quality and named metoclopramide titrated to effect as the drug of choice. Regulators limit metoclopramide: after a European review, the EMA and the MHRA restrict it to short-term use (up to 5 days) and an adult maximum of 30 mg in 24 hours because of neurological side effects. Neither notice mentions palliative care, and the Scottish guideline marks its own palliative doses as unlicensed in dose and duration. The Scottish Palliative Care Guidelines (2025) take a cause-based approach: identify and treat reversible causes, deprescribe, choose the antiemetic for the likely mechanism (haloperidol first for chemical or drug causes, metoclopramide for gastric stasis once complete obstruction is excluded, cyclizine for raised intracranial pressure or vestibular causes, levomepromazine as a broad-spectrum agent), use non-oral routes when needed, try to avoid combining prokinetics with anticholinergics, consider an ECG for QTc, and start olanzapine or mirtazapine only on specialist advice. For bowel obstruction that cannot be operated on, MASCC recommends octreotide, while the Scottish bowel obstruction guideline and NICE (for the last days of life) start with hyoscine butylbromide and keep octreotide as the second step. In the one randomised comparison of the two approaches (185 people randomised), a cause-based regimen gave more responses at 24 hours but was no better than haloperidol alone at 72 hours. Methotrimeprazine was no better than haloperidol in a double-blind trial, and olanzapine 5 mg a day markedly reduced chronic nausea against placebo in a pilot trial of 30 people.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "multidisciplinary-team"],
    where: ["ward", "home", "community", "outpatient-clinic"],
  },
  population: "People with advanced cancer and nausea or vomiting not caused by chemotherapy or radiotherapy; the trials read enrolled adults only. The Scottish guideline asks for specialist palliative care advice before it is used in people with Parkinson's disease or Parkinson's-plus syndromes, myasthenia gravis, complex metabolic conditions such as porphyria, hormone-secreting neuroendocrine tumours such as phaeochromocytoma, or a history of significant adverse effects with antipsychotics. Children are not covered by the sources read.",
  trigger: "A person with advanced cancer reports nausea or vomiting, especially when persistent or not linked to recent anticancer treatment.",
  steps: [
    {
      action: "Take a history and examine to find the likely cause: pattern (constant or intermittent), triggers, vomit volume, bowel habit, medicines, hydration, and signs of an intracranial cause or of bowel obstruction",
      why: "The likely cause decides which medicine is chosen, and some causes can be treated directly.",
      source: "scottish-palliative-nv-2025",
      quote: "Always try to identify the underlying causes of nausea and vomiting and treat if possible",
    },
    {
      action: "Correct reversible causes when possible, such as kidney failure, high calcium, low sodium, high blood sugar, constipation, symptomatic ascites, or brain swelling and raised intracranial pressure",
      why: "The guideline puts treating the cause ahead of choosing an antiemetic.",
      source: "scottish-palliative-nv-2025",
      quote: "Correct any reversible causes of nausea and vomiting when possible (eg renal failure, hypercalcaemia, hyponatraemia, hyperglycaemia, constipation, symptomatic ascites, cerebral oedema or raised intracranial pressure).",
    },
    {
      action: "Review all medicines and stop those that may cause nausea or are no longer needed, where possible",
      why: "The guideline lists opioids, antibiotics, antidepressants and other drugs among the causes of nausea, and notes that swallowing tablets can itself trigger it.",
      source: "scottish-palliative-nv-2025",
      quote: "Deprescribe potentially inappropriate medication to reduce tablet burden and polypharmacy where possible",
    },
    {
      action: "Look for bowel obstruction (colicky pain, large or faeculent vomits, constipation, distension, reduced or absent flatus); if it is found, manage it as bowel obstruction",
      why: "Obstruction has its own guideline and its own medicines, and prokinetic drugs can worsen the pain or cramping.",
      source: "scottish-palliative-nv-2025",
      quote: "If bowel obstruction is identified, manage according to the guideline on Bowel obstruction.",
    },
    {
      action: "In bowel obstruction that cannot be operated on, give a medicine that reduces gut secretions, with an antiemetic, following the local guideline's order",
      why: "MASCC recommends octreotide, and its 2016 statement with ESMO paired it with an antiemetic, haloperidol. The Scottish bowel obstruction guideline, and NICE for the last days of life, start with hyoscine butylbromide and keep octreotide as the second step.",
      source: "mascc-mbo-2021",
      quote: "The panel recommends octreotide in non-operable MBO.",
    },
    {
      action: "Choose an antiemetic for the likely cause, and consider giving it before meals",
      why: "The guideline matches each likely cause to a first-line and a second-line medicine.",
      source: "scottish-palliative-nv-2025",
      quote: "Select an antiemetic appropriate to the likely identified cause.",
    },
    {
      action: "Before starting a prokinetic such as metoclopramide, make sure there is no complete bowel obstruction and no colic",
      why: "The guideline warns that prokinetic drugs may trigger colic, and MASCC advises that they should probably be avoided in complete obstruction because of a possible risk of perforation.",
      source: "scottish-palliative-nv-2025",
      quote: "Before commencing a prokinetic it is important to ensure that the patient is not in complete obstruction and is not experiencing colic.",
    },
    {
      action: "Where the cause does not point to one drug, use metoclopramide or haloperidol first; methotrimeprazine (levomepromazine) or olanzapine are second line",
      why: "This is the order MASCC set in 2021; it notes that it could find only three placebo-controlled randomised trials. Its 2016 statement with ESMO had named metoclopramide alone as the drug of choice.",
      source: "mascc-2021-advanced",
      quote: "First-line antiemetics for nausea and vomiting in advanced cancer are metoclopramide and haloperidol, and second-line medications are methotrimeprazine and olanzapine.",
      grade: "II (each drug), high consensus",
    },
    {
      action: "Keep the licence limit on metoclopramide in mind: short-term use (up to 5 days) and, for an adult, no more than 30 mg in 24 hours; treat longer or higher-dose use as unlicensed and monitor it",
      why: "A European review found that the risk of movement disorders outweighs the benefit in long-term or high-dose treatment. The Scottish guidelines mark their own palliative dose and duration as unlicensed, ask for closer monitoring beyond one week because of cardiac risks, and tell prescribers to watch for extrapyramidal side effects on prolonged higher doses.",
      source: "mhra-metoclopramide-2013",
      quote: "metoclopramide should only be prescribed for short-term use (up to 5 days)",
    },
    {
      action: "Avoid haloperidol and prochlorperazine in Parkinson's disease or Parkinson's-plus syndromes, use levomepromazine there with caution, and choose domperidone over metoclopramide where the risk of movement side effects is high",
      why: "These medicines block dopamine. The guideline names domperidone for people with an akinetic rigid disorder such as Parkinson's or at high risk of extrapyramidal side effects or tardive dyskinesia, for example women under 50 and people on long-term antipsychotics.",
      source: "scottish-palliative-nv-2025",
      quote: "Avoid in patients with Parkinsons or Parkinsons-plus syndrome.",
    },
    {
      action: "If the oral route is not appropriate, consider liquid, buccal or sublingual, transdermal or parenteral medicines, including a continuous subcutaneous infusion",
      why: "Nausea slows stomach emptying, so medicine by mouth may not be absorbed well, and swallowing tablets may trigger nausea.",
      source: "scottish-palliative-nv-2025",
      quote: "the transdermal or parenteral route may be used if the oral route is not appropriate or to reduce tablet burden.",
    },
    {
      action: "Try to avoid giving a prokinetic (such as metoclopramide) together with an anticholinergic (such as cyclizine)",
      why: "The anticholinergic diminishes the prokinetic's effect on the gut.",
      source: "scottish-palliative-nv-2025",
      quote: "Try to avoid the concurrent prescribing of prokinetics (eg metoclopramide) and anticholinergics (eg cyclizine) medication. The anticholinergics will diminish the prokinetic effect.",
    },
    {
      action: "Consider an ECG to measure the QTc interval, since many antiemetics raise the risk of prolonging it",
      why: "The guideline marks haloperidol, levomepromazine, prochlorperazine, metoclopramide, domperidone and erythromycin as carrying a QT risk, and notes that using more than one drug at once raises the risk of interactions.",
      source: "scottish-palliative-nv-2025",
      quote: "Consider the appropriateness of performing an electrocardiogram (ECG) to measure QTc as many antiemetics increase the risk of QTc prolongation.",
    },
    {
      action: "Consider non-drug measures alongside medicines: mouth care, small palatable meals, avoiding cooking smells, regular bowels, a calm setting and loose clothing",
      why: "The guideline lists these beside antiemetics; constipation is a relatively common cause of nausea, and smells can trigger it.",
      source: "scottish-palliative-nv-2025",
      quote: "Non-pharmacological measures should be considered alongside the prescribing of appropriate antiemetics.",
    },
    {
      action: "If nausea persists, reassess, reconsider the cause and seek specialist palliative care advice; start olanzapine or mirtazapine only on specialist advice",
      why: "The guideline treats olanzapine and mirtazapine as emerging therapies for problems that have not responded to the earlier steps.",
      source: "scottish-palliative-nv-2025",
      quote: "Olanzapine and mirtazapine should only be commenced on specialist advice.",
    },
  ],
  bestInClass: {
    statement: "The most recent international statement is MASCC's 2021 update: metoclopramide or haloperidol first line, methotrimeprazine (levomepromazine) or olanzapine second line, each on MASCC level II evidence with high consensus. It was read as an abstract, which gives no doses. The Scottish Palliative Care Guidelines (2025, the most recent national guideline read) choose by cause: haloperidol first for chemical and drug-induced nausea, metoclopramide for gastric stasis, cyclizine for intracranial or vestibular causes, levomepromazine for multifactorial nausea. MASCC/ESMO (2016) had named metoclopramide alone. Both approaches rest on weak evidence: the one randomised comparison found a cause-based regimen gave more responses at 24 hours but was no better than haloperidol alone at 72 hours. They agree on finding and correcting reversible causes. They differ on bowel obstruction that cannot be operated on: MASCC (2021, and 2022 at level I, grade A) puts octreotide first, while the Scottish bowel obstruction guideline calls octreotide a second-line antisecretory after hyoscine butylbromide, and NICE NG31, for the last days of life, also starts with hyoscine butylbromide. Metoclopramide beyond 5 days or above 30 mg a day is outside the licence set after the 2013 European review. NICE's Clinical Knowledge Summary could not be read.",
    sources: ["mascc-2021-advanced", "scottish-palliative-nv-2025", "mascc-esmo-2016-advanced", "hardy-2018", "mascc-mbo-2021", "mascc-mbo-2022", "scottish-palliative-bo", "nice-ng31", "mhra-metoclopramide-2013", "nice-cks-nv"],
  },
  variants: [
    {
      name: "Cause-based antiemetic choice (Scottish Palliative Care Guidelines 2025)",
      differs: "First line by mechanism: haloperidol for chemical or drug-induced nausea; metoclopramide for gastric stasis, or domperidone where the risk of movement side effects is high, with erythromycin second line; cyclizine or prochlorperazine for raised intracranial pressure or vestibular causes; cyclizine for oral, pharyngeal or oesophageal irritation; levomepromazine second line, or first for multifactorial nausea; a benzodiazepine such as lorazepam for nausea linked to anxiety. A corticosteroid (dexamethasone) may be considered for raised intracranial pressure or for compression of the gut. For metoclopramide it prints 10 mg by mouth up to four times a day, or 30 mg to 60 mg over 24 hours by subcutaneous infusion, marked as an unlicensed route, dose and duration, with 5 mg up to three times a day to start in kidney or liver failure.",
      evidence: "National guideline based on an evidence review and, where evidence was lacking, the expert opinion of its development group; recommendations are not individually graded. Its metoclopramide doses exceed the regulators' limit of 30 mg in 24 hours for up to 5 days, which the guideline acknowledges by marking them unlicensed.",
      sources: ["scottish-palliative-nv-2025", "mhra-metoclopramide-2013", "ema-metoclopramide-2013"],
    },
    {
      name: "Metoclopramide alone as the drug of choice (MASCC/ESMO 2016)",
      differs: "Names metoclopramide titrated to effect as the single drug of choice, with haloperidol, levomepromazine or olanzapine as alternatives.",
      evidence: "Consensus statement on evidence its authors call minimal and largely of poor quality. MASCC's 2021 update placed haloperidol beside metoclopramide as first line. The abstract gives no dose or duration and does not mention the regulators' limits on metoclopramide.",
      sources: ["mascc-esmo-2016-advanced", "mascc-2021-advanced"],
    },
    {
      name: "A single agent, haloperidol, for everyone",
      differs: "Gives haloperidol to all, titrated, instead of choosing by cause. The trial started at 1 mg in 24 hours and raised it stepwise to a maximum of 3 mg in 24 hours.",
      evidence: "Open-label randomised trial with 185 people randomised: response at 24 hours was higher with cause-based treatment (49 against 32 per cent among those completing each day), but at 72 hours the intention-to-treat response was 49 per cent with cause-based treatment and 53 per cent with haloperidol, with no significant difference. The Cochrane review of haloperidol (2015) found one eligible randomised trial, of a gel applied to the skin, and judged the published evidence incomplete.",
      sources: ["hardy-2018", "cochrane-haloperidol-2015"],
    },
    {
      name: "Levomepromazine (methotrimeprazine) as the first drug",
      differs: "Uses the broad-spectrum antipsychotic levomepromazine first.",
      evidence: "Double-blind trial at 11 Australian palliative care sites: response at 72 hours was 63 per cent with methotrimeprazine 6.25 mg and 75 per cent with haloperidol 1.5 mg, each by mouth once or twice a day, with no difference between groups, and a trend to more sedation with methotrimeprazine. The 2015 Cochrane review, written before that trial, found no published randomised trial. MASCC (2021) places methotrimeprazine second line.",
      sources: ["hardy-2019", "cochrane-levomepromazine-2015", "mascc-2021-advanced"],
    },
    {
      name: "Olanzapine for chronic nausea",
      differs: "Olanzapine 5 mg by mouth daily in the trial. The Scottish guideline prints 2.5 mg to 5 mg by mouth at night, as an off-label use started only on specialist advice.",
      evidence: "Placebo-controlled pilot trial of 30 outpatients with chronic nausea and no chemotherapy or radiotherapy in the previous 14 days: median nausea scores fell from 9 to 1 out of 10 at one week with olanzapine and stayed at 9 on placebo, and the olanzapine group reported less sedation. MASCC (2021) places it second line, on that one pilot trial.",
      sources: ["olanzapine-2020", "mascc-2021-advanced", "scottish-palliative-nv-2025"],
    },
    {
      name: "Hyoscine butylbromide before octreotide in bowel obstruction",
      differs: "Starts with hyoscine butylbromide to reduce secretions and keeps octreotide as the second step. NICE, for people in the last days of life, says to consider octreotide if symptoms do not improve within 24 hours of starting hyoscine butylbromide.",
      evidence: "The Scottish bowel obstruction guideline calls octreotide second line, more effective than hyoscine but expensive. NICE does not grade its recommendations. MASCC (2022) suggests that hyoscine butylbromide may be inferior to octreotide for vomiting (level III, grade D) and recommends a somatostatin analogue (level I, grade A).",
      sources: ["scottish-palliative-bo", "nice-ng31", "mascc-mbo-2022"],
    },
  ],
  grades: [
    { claim: "The quality of evidence for antiemetics in advanced cancer", grade: "MASCC/ESMO: low level of evidence in most studies", source: "mascc-esmo-2016-advanced", quote: "The evidence base in this field is minimal with largely poor quality trials or uncontrolled trials and case studies. The level of evidence in most studies is low." },
    { claim: "Metoclopramide and haloperidol as first-line antiemetics", grade: "II (each drug), high consensus", source: "mascc-2021-advanced", quote: "First Line: Metoclopramide (II) multiple small RCTs including a placebo-controlled trial, haloperidol (II) multiple non-placebo-controlled RCTs, high consensus." },
    { claim: "Methotrimeprazine and olanzapine as second-line antiemetics", grade: "II (each drug), high consensus", source: "mascc-2021-advanced", quote: "Second line: Methotrimeprazine (II) 1 well-powered non-placebo-controlled RCT, olanzapine (II) 1 placebo-controlled pilot RCT, high consensus." },
    { claim: "Octreotide in inoperable malignant bowel obstruction", grade: "MASCC recommendation (level and category not shown in the abstract read)", source: "mascc-mbo-2021", quote: "The panel recommends octreotide in non-operable MBO." },
    { claim: "Somatostatin analogue to reduce vomiting in malignant bowel obstruction", grade: "levels of evidence: I; grade A", source: "mascc-mbo-2022", quote: "Recommendation: Somatostatin analog (octreotide, lanreotide) may reduce vomiting in MBO (levels of evidence: I; grade A)." },
    { claim: "Metoclopramide or domperidone in partial obstruction, and avoiding them in complete obstruction", grade: "level of evidence: III; grade B", source: "mascc-mbo-2022", quote: "Due to the potential increased risk of bowel perforation, it likely should be avoided in complete MBO. (level of evidence: III; grade B)" },
    { claim: "Haloperidol as an antiemetic in malignant bowel obstruction", grade: "level of evidence: IV; grade: B", source: "mascc-mbo-2022", quote: "Suggestion: Haloperidol, a butyrophenone antipsychotic, may be an effective anti-emetic in MBO, particularly for complete MBO (level of evidence: IV; grade: B)," },
    { claim: "Cause-based treatment against single-agent haloperidol at 72 hours", grade: "open-label randomised trial, 185 randomised, p = 0.59", source: "hardy-2018", quote: "Response rates at 72 h in the intention to treat analysis were 49 and 53% respectively, with no significant difference between arms (0·04; 95% CI: -0·11, 0·19; p = 0·59)." },
    { claim: "No randomised trial of levomepromazine in palliative care by 2015", grade: "Cochrane systematic review, 2015", source: "cochrane-levomepromazine-2015", quote: "As in the initial review, we identified no published randomised controlled trials examining the use of levomepromazine for the management of nausea and vomiting in adults receiving palliative care" },
  ],
  sources: [
    { key: "mascc-2021-advanced", label: "MASCC antiemetics in advanced cancer updated guideline", publisher: "MASCC, Supportive Care in Cancer", year: 2021, url: "https://europepmc.org/abstract/MED/34398289", doi: "10.1007/s00520-021-06437-w", gradingScheme: "MASCC level of evidence, I (meta-analysis or high-powered randomised trials) to V (case reports), printed in brackets after each drug, with the panel's degree of consensus. The abstract prints no grade of recommendation.", read: "abstract", accessed: "2026-11-17" },
    { key: "mascc-esmo-2016-advanced", label: "2016 Updated MASCC/ESMO consensus recommendations: Management of nausea and vomiting in advanced cancer", publisher: "MASCC/ESMO, Supportive Care in Cancer", year: 2017, url: "https://europepmc.org/abstract/MED/27534961", doi: "10.1007/s00520-016-3371-3", read: "abstract", accessed: "2026-11-17" },
    { key: "mascc-mbo-2021", label: "Medical management of malignant bowel obstruction in patients with advanced cancer: 2021 MASCC guideline update", publisher: "MASCC, Supportive Care in Cancer", year: 2021, url: "https://europepmc.org/abstract/MED/34390398", doi: "10.1007/s00520-021-06438-9", gradingScheme: "MASCC level of evidence and category of guideline; not shown in the abstract read.", read: "abstract", accessed: "2026-11-17" },
    { key: "mascc-mbo-2022", label: "MASCC multidisciplinary evidence-based recommendations for the management of malignant bowel obstruction in advanced cancer", publisher: "MASCC, Supportive Care in Cancer", year: 2022, url: "https://europepmc.org/article/PMC/PMC9046338", doi: "10.1007/s00520-022-06889-8", gradingScheme: "MASCC 2018 policy: level of evidence I (meta-analysis or high-powered randomised trials) to V (case reports), and grade A (type I evidence or consistent findings) to D (little or no systematic evidence); each statement is printed with its level and grade.", read: "full-text", accessed: "2026-11-16" },
    { key: "scottish-palliative-nv-2025", label: "Scottish Palliative Care Guidelines: Nausea and vomiting", publisher: "Healthcare Improvement Scotland (Right Decision Service)", year: 2025, url: "https://www.palliativecareguidelines.scot.nhs.uk/scottish-palliative-care-guidelines/symptoms/non-pain-symptoms/nausea-and-vomiting/", gradingScheme: "Based on an evidence review, with a methodology quality rating printed beside some references; recommendations are not individually graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "scottish-palliative-bo", label: "Scottish Palliative Care Guidelines: Bowel obstruction (the page prints no publication date)", publisher: "Healthcare Improvement Scotland (Right Decision Service)", year: 2026, url: "https://www.palliativecareguidelines.scot.nhs.uk/scottish-palliative-care-guidelines/symptoms/non-pain-symptoms/bowel-obstruction/", gradingScheme: "Recommendations are not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-ng31", label: "Care of dying adults in the last days of life (NG31), recommendations", publisher: "NICE", year: 2015, url: "https://www.nice.org.uk/guidance/ng31/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider') signals strength.", read: "full-text", accessed: "2026-11-17" },
    { key: "mhra-metoclopramide-2013", label: "Metoclopramide: risk of neurological adverse effects (Drug Safety Update vol 7 issue 1, August 2013)", publisher: "Medicines and Healthcare products Regulatory Agency", year: 2013, url: "https://www.gov.uk/drug-safety-update/metoclopramide-risk-of-neurological-adverse-effects", read: "full-text", accessed: "2026-11-17" },
    { key: "ema-metoclopramide-2013", label: "Metoclopramide-containing medicines: referral", publisher: "European Medicines Agency", year: 2013, url: "https://www.ema.europa.eu/en/medicines/human/referrals/metoclopramide-containing-medicines", read: "full-text", accessed: "2026-11-17" },
    { key: "hardy-2018", label: "A randomized open-label study of guideline-driven antiemetic therapy versus single agent antiemetic therapy in patients with advanced cancer and nausea not related to anticancer treatment", publisher: "BMC Cancer", year: 2018, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5932901/", doi: "10.1186/s12885-018-4404-8", read: "full-text", accessed: "2026-11-17" },
    { key: "hardy-2019", label: "Methotrimeprazine versus haloperidol in palliative care patients with cancer-related nausea: a randomised, double-blind controlled trial", publisher: "BMJ Open", year: 2019, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6747674/", doi: "10.1136/bmjopen-2019-029942", read: "full-text", accessed: "2026-11-17" },
    { key: "olanzapine-2020", label: "Olanzapine for the Treatment of Advanced Cancer-Related Chronic Nausea and/or Vomiting: A Randomized Pilot Trial", publisher: "JAMA Oncology", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7206532/", doi: "10.1001/jamaoncol.2020.1052", read: "full-text", accessed: "2026-11-17" },
    { key: "cochrane-haloperidol-2015", label: "Haloperidol for the treatment of nausea and vomiting in palliative care patients", publisher: "Cochrane Database of Systematic Reviews", year: 2015, url: "https://europepmc.org/abstract/MED/26524474", doi: "10.1002/14651858.CD006271.pub3", read: "abstract", accessed: "2026-11-17" },
    { key: "cochrane-levomepromazine-2015", label: "Levomepromazine for nausea and vomiting in palliative care", publisher: "Cochrane Database of Systematic Reviews", year: 2015, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6481825/", doi: "10.1002/14651858.CD009420.pub3", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-cks-nv", label: "Palliative care: nausea and vomiting (Clinical Knowledge Summary)", publisher: "NICE", year: 2021, url: "https://cks.nice.org.uk/topics/palliative-care-nausea-vomiting/", read: "not-reachable", accessed: "2026-11-17" },
  ],
  gaps: [
    "The MASCC 2021 update on antiemetics in advanced cancer, the MASCC/ESMO 2016 statement and the MASCC 2021 bowel obstruction update were read only as abstracts; their doses, their full reasoning and any grade of recommendation are not shown here. On 17 November 2026 no open full text of any of the three was found.",
    "The limit on metoclopramide (up to 5 days, and 30 mg in 24 hours for an adult) comes from the European review that the Commission adopted on 20 December 2013 and that the MHRA passed on. Neither notice mentions palliative care, and neither MASCC abstract mentions the limit. No source read says how long metoclopramide may safely be continued in advanced cancer; the Scottish guideline marks its doses as unlicensed and asks for closer monitoring.",
    "NICE's Clinical Knowledge Summary on palliative nausea and vomiting refused a script again on 17 November 2026 (403) and was not read; its year (2021) is as the Scottish guideline cites it, and whether it has been revised since could not be checked. NICE NG31, which was read, covers only the last days of life.",
    "The Scottish bowel obstruction page prints no publication or review date; the year shown for it is the year it was read. Its newest reference was cited in October 2018.",
    "MASCC and the Scottish guideline differ on how the first drug is chosen, and no trial read compared metoclopramide with haloperidol as first-line treatment in this setting.",
    "The olanzapine evidence for nausea not caused by treatment is one pilot trial of 30 people; no larger trial was found in the sources read.",
    "MASCC/ESMO (2016) could make no recommendation for opioid-induced nausea.",
    "Doses in the Scottish guideline include unlicensed routes and uses. Apart from metoclopramide and olanzapine, where sources differ, they are not repeated here: the guideline itself is the place to read them.",
    "No source read gives a list of warning signs for patients or a time limit for reporting them.",
    "The sources read do not cover children.",
  ],
  institutions: ["mascc", "esmo"],
  technologies: ["palliative-care", "syringe-drivers"],
  drugs: ["dexamethasone", "metoclopramide", "haloperidol", "levomepromazine", "cyclizine"],
  terms: ["qt-prolongation"],
  bottlenecks: ["b-palliative"],
  related: ["antiemetic-therapy", "octreotide-lanreotide", "anticipatory-nausea-and-vomiting", "antiemetic-prophylaxis-by-emetic-risk"],
  sections: ["supportive-care"],
  tags: ["protocol", "nausea-and-vomiting", "palliative"],
});

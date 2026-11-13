import { protocol } from "./helpers";

/*
 * Nausea and vomiting in advanced cancer that is not caused by chemotherapy or radiotherapy: assessment for a cause,
 * correcting what can be corrected, choosing an antiemetic, bowel obstruction, and refractory nausea. Nausea from
 * anticancer treatment is covered by the antiemetic prophylaxis protocol, linked in `related`.
 *
 * What was read, and how (11 November 2026, fetched raw with curl or the Europe PMC REST API into a scratch directory
 * and read as text):
 * - 2016 updated MASCC/ESMO consensus recommendations on nausea and vomiting in advanced cancer (Walsh et al., Support
 *   Care Cancer 2017): abstract only, from Europe PMC; no open full text was found. Still the latest MASCC/ESMO
 *   statement: the 2023 antiemetic update had no committee on advanced cancer (MASCC's slide set, read in full).
 * - MASCC 2021 guideline update on medical management of malignant bowel obstruction (Davis et al., Support Care Cancer
 *   2021): abstract.
 * - Scottish Palliative Care Guidelines, "Nausea and vomiting" (Healthcare Improvement Scotland, published 2025,
 *   updating the 2019 version): full public page.
 * - Randomised trials: guideline-driven against single-agent haloperidol (Hardy et al., BMC Cancer 2018; PMC5932901,
 *   full text); methotrimeprazine against haloperidol (Hardy et al., BMJ Open 2019; PMC6747674, full text); olanzapine
 *   against placebo (Navari et al., JAMA Oncol 2020): abstract, the full text request failed.
 * - Cochrane reviews of haloperidol (2015) and levomepromazine (2015) in palliative care: abstracts.
 * - NICE Clinical Knowledge Summary "Palliative care: nausea and vomiting": cks.nice.org.uk returned 403 to a script.
 *   Not read.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with nothing
 * changed.
 */
export const nauseaAndVomitingInAdvancedCancer = protocol({
  id: "nausea-and-vomiting-in-advanced-cancer",
  name: "Nausea and vomiting in advanced cancer not caused by cancer treatment",
  aka: ["palliative nausea and vomiting", "chronic nausea in advanced cancer", "nausea not related to chemotherapy", "antiemetic choice in palliative care", "malignant bowel obstruction nausea"],
  domain: "palliative",
  tldr: "In advanced cancer, nausea and vomiting often have a cause that can be found and treated, such as constipation, a high calcium level, a medicine, or a blocked bowel. Your team will look for the cause, stop medicines that may worsen it, and choose an anti-sickness medicine that suits it, under the skin or by a small pump if tablets will not stay down. Say if it is not improving.",
  simple: "When cancer is advanced, feeling sick often has a cause that can be fixed. Your team will look for it and choose the right medicine. Tell them if it does not help.",
  summary: "MASCC/ESMO (2016, the latest statement) found the evidence minimal and of low quality, and recommend metoclopramide titrated to effect as the drug of choice, with haloperidol, levomepromazine or olanzapine as alternatives; for bowel obstruction, octreotide with an antiemetic (haloperidol), or an anticholinergic antisecretory agent where octreotide is not an option. MASCC's 2021 update keeps octreotide as the drug of choice in inoperable bowel obstruction and suggests olanzapine or metoclopramide for partial obstruction. The Scottish Palliative Care Guidelines (2025) take a cause-based approach: identify and treat reversible causes, deprescribe, choose the antiemetic for the likely mechanism (haloperidol first for chemical or drug causes, metoclopramide for gastric stasis once complete obstruction is excluded, cyclizine for raised intracranial pressure or vestibular causes, levomepromazine as a broad-spectrum agent), use non-oral routes when needed, avoid combining prokinetics with anticholinergics, consider an ECG for QTc, and start olanzapine or mirtazapine only on specialist advice. In the one randomised comparison of the two approaches (185 people), a cause-based regimen worked faster at 24 hours but was no better than haloperidol alone at 72 hours. Methotrimeprazine (levomepromazine) was no better than haloperidol in a double-blind trial, and olanzapine 5 mg markedly reduced chronic nausea against placebo in a pilot trial of 30 people.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "multidisciplinary-team"],
    where: ["ward", "home", "community", "outpatient-clinic"],
  },
  population: "Adults with advanced cancer and nausea or vomiting not caused by chemotherapy or radiotherapy. The Scottish guideline asks for specialist palliative care advice before use in people with Parkinson's disease or Parkinson's-plus syndromes, myasthenia gravis, porphyria, hormone-secreting neuroendocrine tumours such as phaeochromocytoma, or past serious reactions to antipsychotics. Children are not covered by the sources read.",
  trigger: "A person with advanced cancer reports nausea or vomiting, especially when persistent or not linked to recent anticancer treatment.",
  steps: [
    {
      action: "Take a history and examine to find the likely cause: pattern (constant or intermittent), triggers, vomit volume, bowel habit, medicines, hydration, and signs of raised intracranial pressure or obstruction",
      why: "The cause decides which medicine works best, and some causes can be removed altogether.",
      source: "scottish-palliative-nv-2025",
      quote: "Always try to identify the underlying causes of nausea and vomiting and treat if possible",
    },
    {
      action: "Correct reversible causes, such as kidney failure, high calcium, low sodium, high blood sugar, constipation, ascites or raised intracranial pressure",
      why: "Treating the cause can stop the nausea without long-term antiemetics.",
      source: "scottish-palliative-nv-2025",
      quote: "Correct any reversible causes of nausea and vomiting when possible (eg renal failure, hypercalcaemia, hyponatraemia, hyperglycaemia, constipation, symptomatic ascites, cerebral oedema or raised intracranial pressure).",
    },
    {
      action: "Review all medicines and stop those that may cause nausea or are no longer needed",
      why: "Opioids, antibiotics, antidepressants and many other drugs can cause nausea, and fewer tablets are easier to keep down.",
      source: "scottish-palliative-nv-2025",
      quote: "Deprescribe potentially inappropriate medication to reduce tablet burden and polypharmacy where possible",
    },
    {
      action: "Look for bowel obstruction (colicky pain, large or faeculent vomits, distension, absent flatus); if it is present and inoperable, give octreotide with an antiemetic",
      why: "Obstruction needs a different treatment: octreotide reduces the fluid in the gut that causes vomiting, and some antiemetics can worsen colic.",
      source: "mascc-esmo-2016-advanced",
      quote: "For bowel obstruction, the recommendation is to use octreotide given alongside an antiemetic (haloperidol) and where octreotide is not an option to use an anticholinergic antisecretory agent.",
    },
    {
      action: "Choose an antiemetic for the likely cause, and give it before meals where that helps",
      why: "Different causes act through different nerve pathways, each blocked best by a different drug.",
      source: "scottish-palliative-nv-2025",
      quote: "Select an antiemetic appropriate to the likely identified cause.",
    },
    {
      action: "Before starting a prokinetic such as metoclopramide, make sure there is no complete bowel obstruction and no colic",
      why: "A drug that pushes the gut forward can cause severe cramping pain against a complete blockage.",
      source: "scottish-palliative-nv-2025",
      quote: "Before commencing a prokinetic it is important to ensure that the patient is not in complete obstruction and is not experiencing colic.",
    },
    {
      action: "Where no specific choice applies, use metoclopramide titrated to effect; haloperidol, levomepromazine or olanzapine are alternatives",
      why: "Metoclopramide is the agent MASCC/ESMO prefer, though the trials behind every choice are small.",
      source: "mascc-esmo-2016-advanced",
      quote: "The drug of choice for managing N & V in advanced cancer is metoclopramide titrated to effect. Alternative options include haloperidol, levomepromazine, or olanzapine.",
    },
    {
      action: "If tablets are not absorbed or cannot be kept down, use the subcutaneous, transdermal or buccal route, or a continuous subcutaneous infusion",
      why: "Nausea slows the stomach and vomiting loses tablets, so medicine by mouth may not work.",
      source: "scottish-palliative-nv-2025",
      quote: "the transdermal or parenteral route may be used if the oral route is not appropriate or to reduce tablet burden.",
    },
    {
      action: "Avoid giving a prokinetic (such as metoclopramide) together with an anticholinergic (such as cyclizine)",
      why: "The anticholinergic cancels out the prokinetic's effect on the gut.",
      source: "scottish-palliative-nv-2025",
      quote: "Try to avoid the concurrent prescribing of prokinetics (eg metoclopramide) and anticholinergics (eg cyclizine) medication. The anticholinergics will diminish the prokinetic effect.",
    },
    {
      action: "Consider an ECG to check the QTc interval, since many antiemetics prolong it",
      why: "Several antiemetics can disturb the heart rhythm, especially in combination or at higher doses.",
      source: "scottish-palliative-nv-2025",
      quote: "Consider the appropriateness of performing an electrocardiogram (ECG) to measure QTc as many antiemetics increase the risk of QTc prolongation.",
    },
    {
      action: "Use non-drug measures alongside medicines: mouth care, small palatable meals, avoiding cooking smells, regular bowels, a calm setting and loose clothing",
      why: "Simple measures reduce triggers and make eating and drinking easier.",
      source: "scottish-palliative-nv-2025",
      quote: "Non-pharmacological measures should be considered alongside the prescribing of appropriate antiemetics.",
    },
    {
      action: "If nausea persists, reassess the cause and seek specialist palliative care advice; start olanzapine or mirtazapine only on specialist advice",
      why: "Persistent nausea often has more than one cause, and specialists can add drugs whose use in this setting is less established.",
      source: "scottish-palliative-nv-2025",
      quote: "Olanzapine and mirtazapine should only be commenced on specialist advice.",
    },
  ],
  bestInClass: {
    statement: "Two current approaches disagree on the first drug. MASCC/ESMO (2016, the latest international statement) recommend metoclopramide titrated to effect for most people, with haloperidol, levomepromazine or olanzapine as alternatives. The Scottish Palliative Care Guidelines (2025, the most recent national guideline read) choose by cause: haloperidol first for chemical and drug-induced nausea, metoclopramide for gastric stasis, cyclizine for intracranial or vestibular causes, levomepromazine for multifactorial nausea. Both rest on weak evidence: the one randomised comparison found a cause-based regimen faster at 24 hours but no better than haloperidol alone at 72 hours. They agree on finding and correcting reversible causes, on octreotide with an antiemetic for inoperable bowel obstruction (reaffirmed by MASCC in 2021), and on keeping olanzapine for when first-line drugs fail. NICE's Clinical Knowledge Summary could not be read.",
    sources: ["mascc-esmo-2016-advanced", "scottish-palliative-nv-2025", "hardy-2018", "mascc-mbo-2021", "nice-cks-nv"],
  },
  variants: [
    {
      name: "Cause-based antiemetic choice (Scottish Palliative Care Guidelines 2025)",
      differs: "First line by mechanism: haloperidol for chemical or drug-induced nausea; metoclopramide or domperidone for gastric stasis, with erythromycin second line; cyclizine or prochlorperazine for raised intracranial pressure, vestibular or oral and oesophageal causes; levomepromazine second line or for multifactorial nausea; lorazepam for anxiety-related nausea. Dexamethasone for raised intracranial pressure or extrinsic compression.",
      evidence: "National guideline based on an evidence review and, where evidence was lacking, the expert opinion of its development group; recommendations are not individually graded.",
      sources: ["scottish-palliative-nv-2025"],
    },
    {
      name: "A single agent, haloperidol, for everyone",
      differs: "Gives haloperidol to all, titrated, instead of choosing by cause.",
      evidence: "Open-label randomised trial of 185 people: response at 24 hours was higher with cause-based treatment (49 against 32 per cent among those completing each day), but at 72 hours the intention-to-treat response was 49 and 53 per cent, with no significant difference. The Cochrane review of haloperidol (2015) found only one eligible randomised trial.",
      sources: ["hardy-2018", "cochrane-haloperidol-2015"],
    },
    {
      name: "Levomepromazine (methotrimeprazine) as the first drug",
      differs: "Uses the broad-spectrum antipsychotic levomepromazine first.",
      evidence: "Double-blind trial at 11 Australian palliative care sites: response at 72 hours 63 per cent with methotrimeprazine 6.25 mg and 75 per cent with haloperidol 1.5 mg, with no difference, and a trend to more sedation with methotrimeprazine. The 2015 Cochrane review found no published randomised trial.",
      sources: ["hardy-2019", "cochrane-levomepromazine-2015"],
    },
    {
      name: "Olanzapine 5 mg for chronic nausea",
      differs: "Olanzapine 5 mg by mouth daily.",
      evidence: "Placebo-controlled pilot trial of 30 outpatients with chronic nausea not related to recent treatment: median nausea scores fell from 9 to 1 out of 10 at one week with olanzapine against 9 on placebo; no excess sedation reported. MASCC/ESMO list it as an alternative, and the Scottish guideline keeps it for specialist use.",
      sources: ["olanzapine-2020", "mascc-esmo-2016-advanced", "scottish-palliative-nv-2025"],
    },
  ],
  grades: [
    { claim: "The quality of evidence for antiemetics in advanced cancer", grade: "MASCC/ESMO: low level of evidence in most studies", source: "mascc-esmo-2016-advanced", quote: "The evidence base in this field is minimal with largely poor quality trials or uncontrolled trials and case studies. The level of evidence in most studies is low." },
    { claim: "Octreotide in inoperable malignant bowel obstruction", grade: "MASCC recommendation (level and category not shown in the abstract read)", source: "mascc-mbo-2021", quote: "The panel recommends octreotide in non-operable MBO." },
    { claim: "Cause-based treatment against single-agent haloperidol at 72 hours", grade: "open-label randomised trial, n = 185, p = 0.59", source: "hardy-2018", quote: "Response rates at 72 h in the intention to treat analysis were 49 and 53% respectively, with no significant difference between arms (0·04; 95% CI: -0·11, 0·19; p = 0·59)." },
    { claim: "No randomised trial of levomepromazine in palliative care", grade: "Cochrane systematic review, 2015", source: "cochrane-levomepromazine-2015", quote: "As in the initial review, we identified no published randomised controlled trials examining the use of levomepromazine for the management of nausea and vomiting in adults receiving palliative care" },
  ],
  sources: [
    { key: "mascc-esmo-2016-advanced", label: "2016 Updated MASCC/ESMO consensus recommendations: Management of nausea and vomiting in advanced cancer", publisher: "MASCC/ESMO, Supportive Care in Cancer", year: 2017, url: "https://europepmc.org/abstract/MED/27534961", doi: "10.1007/s00520-016-3371-3", read: "abstract", accessed: "2026-11-11" },
    { key: "mascc-mbo-2021", label: "Medical management of malignant bowel obstruction in patients with advanced cancer: 2021 MASCC guideline update", publisher: "MASCC, Supportive Care in Cancer", year: 2021, url: "https://europepmc.org/abstract/MED/34390398", doi: "10.1007/s00520-021-06438-9", gradingScheme: "MASCC level of evidence and category of guideline; not shown in the abstract read.", read: "abstract", accessed: "2026-11-11" },
    { key: "scottish-palliative-nv-2025", label: "Scottish Palliative Care Guidelines: Nausea and vomiting", publisher: "Healthcare Improvement Scotland (Right Decision Service)", year: 2025, url: "https://www.palliativecareguidelines.scot.nhs.uk/scottish-palliative-care-guidelines/symptoms/non-pain-symptoms/nausea-and-vomiting/", gradingScheme: "Evidence review with SIGN methodology ratings for references; recommendations are not individually graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "hardy-2018", label: "A randomized open-label study of guideline-driven antiemetic therapy versus single agent antiemetic therapy in patients with advanced cancer and nausea not related to anticancer treatment", publisher: "BMC Cancer", year: 2018, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5932901/", doi: "10.1186/s12885-018-4404-8", read: "full-text", accessed: "2026-11-11" },
    { key: "hardy-2019", label: "Methotrimeprazine versus haloperidol in palliative care patients with cancer-related nausea: a randomised, double-blind controlled trial", publisher: "BMJ Open", year: 2019, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6747674/", doi: "10.1136/bmjopen-2019-029942", read: "full-text", accessed: "2026-11-11" },
    { key: "olanzapine-2020", label: "Olanzapine for the Treatment of Advanced Cancer-Related Chronic Nausea and/or Vomiting: A Randomized Pilot Trial", publisher: "JAMA Oncology", year: 2020, url: "https://europepmc.org/abstract/MED/32379269", doi: "10.1001/jamaoncol.2020.1052", read: "abstract", accessed: "2026-11-11" },
    { key: "cochrane-haloperidol-2015", label: "Haloperidol for the treatment of nausea and vomiting in palliative care patients", publisher: "Cochrane Database of Systematic Reviews", year: 2015, url: "https://europepmc.org/abstract/MED/26524474", doi: "10.1002/14651858.CD006271.pub3", read: "abstract", accessed: "2026-11-11" },
    { key: "cochrane-levomepromazine-2015", label: "Levomepromazine for nausea and vomiting in palliative care", publisher: "Cochrane Database of Systematic Reviews", year: 2015, url: "https://europepmc.org/abstract/MED/26524693", doi: "10.1002/14651858.CD009420.pub3", read: "abstract", accessed: "2026-11-11" },
    { key: "nice-cks-nv", label: "Palliative care: nausea and vomiting (Clinical Knowledge Summary)", publisher: "NICE", year: 2021, url: "https://cks.nice.org.uk/topics/palliative-care-nausea-vomiting/", read: "not-reachable", accessed: "2026-11-11" },
  ],
  gaps: [
    "The MASCC/ESMO 2016 statement and the MASCC 2021 bowel obstruction update were read only as abstracts; their grades, doses and the reasoning behind preferring metoclopramide are not shown here.",
    "NICE's Clinical Knowledge Summary on palliative nausea and vomiting refused a script (403) and was not read; its year (2021) is as the Scottish guideline cites it.",
    "MASCC/ESMO and the Scottish guideline disagree on the first-line drug, and no trial has compared metoclopramide with haloperidol as first-line treatment in this setting.",
    "The olanzapine evidence for nausea not caused by treatment is one pilot trial of 30 people; no larger trial was found in the sources read.",
    "MASCC/ESMO could make no recommendation for opioid-induced nausea.",
    "Doses in the Scottish guideline include unlicensed routes and uses; they are a national palliative care formulary and are not repeated here as instructions.",
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

import { protocol } from "./helpers";

/*
 * Antiemetic prophylaxis for chemotherapy, chosen by the emetic risk of the regimen.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl or the Europe PMC REST API into a scratch
 * directory and read as text):
 * - MASCC/ESMO 2023 update, high emetic risk (Herrstedt et al., Support Care Cancer 2023): full text from Europe PMC
 *   (PMC10739516, full-text XML), including its Table 2 of recommendations with level of evidence and grade.
 * - MASCC/ESMO 2023 update, multiple-day chemotherapy, high-dose chemotherapy and breakthrough nausea and vomiting
 *   (Rapoport et al., Support Care Cancer 2023): full text from Europe PMC (PMC10725845), including its Table 1.
 * - MASCC/ESMO 2023 updates for moderate emetic risk (Celio et al.), low and minimal emetic risk (Olver et al.) and
 *   integrative and non-pharmacological therapies: abstracts only, from the Europe PMC REST API. The publisher pages
 *   (link.springer.com) returned a JavaScript bot challenge to a script.
 * - MASCC and ESMO 2023 summary guideline in ESMO Open (2024): title only; the publisher page returned 403 and Europe
 *   PMC holds no abstract. Not read.
 * - ASCO Antiemetics guideline update (2020): abstract only, from Europe PMC; the publisher page refused a script.
 * - The 2024 comparison of ASCO 2020, NCCN 2023, MASCC/ESMO 2023 and CCO 2019, and the 2025 "Going beyond" review:
 *   abstracts only.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed. In the raw text, the subscripts in "5-HT3" and "NK1" print as "5-HT 3" and "NK 1",
 * so quotes containing them were avoided.
 */
export const antiemeticProphylaxisByEmeticRisk = protocol({
  id: "antiemetic-prophylaxis-by-emetic-risk",
  name: "Antiemetic prophylaxis for chemotherapy by emetic risk",
  aka: ["CINV prophylaxis", "chemotherapy-induced nausea and vomiting prevention", "antiemetic regimen by emetogenicity", "anti-sickness medicines with chemotherapy"],
  domain: "supportive-care",
  tldr: "Sickness from chemotherapy is now largely preventable. The anti-sickness medicines you are given depend on how likely your chemotherapy is to cause sickness: for the strongest regimens that is four medicines before treatment and some for the days after, for the mildest none at all. If you are still sick, tell your team: there is a next step.",
  simple: "Some cancer medicines make people sick. Doctors give anti-sickness medicines before treatment to stop it happening. The stronger the treatment, the more of these medicines you get.",
  summary: "Prophylaxis is chosen by the emetic risk of the regimen, defined as the chance of vomiting in the first 24 hours without prophylaxis (high, above 90 per cent; moderate; low; minimal), adjusted for patient factors such as female sex and younger age. MASCC/ESMO (2023) recommend for high emetic risk a four-drug regimen before chemotherapy: a 5-HT3 receptor antagonist, dexamethasone, an NK1 receptor antagonist (aprepitant, fosaprepitant, netupitant or fosnetupitant with palonosetron, or rolapitant) and olanzapine (I, A). For delayed nausea after cisplatin and other non-anthracycline-cyclophosphamide regimens, dexamethasone and olanzapine continue on days 2 to 4 (II, B); after anthracycline with cyclophosphamide, dexamethasone stops after day 1 and olanzapine alone continues on days 2 to 4 (II, B). Olanzapine 10 mg is the best investigated dose; 5 mg or a bedtime dose is an option where sedation matters (II, B).\n\nFor moderate emetic risk, MASCC/ESMO add an NK1 receptor antagonist for carboplatin at AUC 5 or more and for women under 50 having oxaliplatin, use a 5-HT3 receptor antagonist with a steroid for other regimens, and limit the steroid to day 1. Low emetic risk gets a single agent before treatment and nothing for the delayed phase; minimal risk gets none. ASCO (2020) keeps dexamethasone when checkpoint inhibitors are given with chemotherapy and gives no routine prophylaxis for checkpoint inhibitors alone. For breakthrough nausea and vomiting the evidence favours olanzapine 10 mg once daily for 3 days (II, B); for high-dose chemotherapy before stem cell transplant, a 5-HT3 receptor antagonist with dexamethasone and aprepitant (I, A), with olanzapine to be considered.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "pharmacist", "nurse", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "ward", "outpatient-clinic", "home"],
  },
  population: "Adults having intravenous anticancer treatment. The MASCC/ESMO recommendations on which most steps rest are written for adults; children (ASCO 2020 adds fosaprepitant to its paediatric recommendations), radiotherapy-induced nausea and nausea in advanced cancer not caused by treatment are covered by separate guidance and are not covered here. Oral anticancer drugs taken daily are a gap in every guideline read.",
  trigger: "A chemotherapy regimen is prescribed, before the first cycle.",
  steps: [
    {
      action: "Before the first cycle, classify the regimen by its emetic risk: high, moderate, low or minimal",
      why: "The emetic risk of the most sickness-causing drug in the regimen decides which anti-sickness medicines are needed.",
      source: "mascc-esmo-2023-hec",
      quote: "High emetic risk is defined as a risk of more than 90% of vomiting.",
    },
    {
      action: "Take the person's own risk factors into account as well, such as being female and younger",
      why: "Two people on the same regimen do not have the same risk; women and younger people are sick more often.",
      source: "mascc-esmo-2023-hec",
      quote: "patient demographics such as sex (women are at a higher risk than men) and age (younger patients have a higher risk than older)",
    },
    {
      action: "For high emetic risk, give four drugs before chemotherapy: a 5-HT3 receptor antagonist, dexamethasone, an NK1 receptor antagonist and olanzapine",
      why: "Large trials showed that adding olanzapine to the older three-drug combination prevents more nausea, so it is now part of the standard set.",
      source: "mascc-esmo-2023-hec",
      quote: "Olanzapine is now recommended as a fixed part of a four-drug prophylactic antiemetic regimen in both non-AC and AC HEC.",
      grade: "I, A",
    },
    {
      action: "After cisplatin or other high-risk regimens that are not anthracycline with cyclophosphamide, continue dexamethasone and olanzapine on days 2 to 4",
      why: "Sickness after cisplatin often peaks a few days later; the evidence for stopping the steroid after day 1 in these regimens is not yet conclusive.",
      source: "mascc-esmo-2023-hec",
      quote: "DEX and olanzapine on days 2 to 4 is suggested to prevent delayed nausea and vomiting",
      grade: "II, B",
    },
    {
      action: "After anthracycline with cyclophosphamide, stop dexamethasone after day 1 and continue olanzapine alone on days 2 to 4",
      why: "Trials showed the extra days of steroid add nothing after this regimen, so they can be spared.",
      source: "mascc-esmo-2023-hec",
      quote: "There is no need to prescribe steroids (dexamethasone) beyond day 1 after AC HEC, whereas a 4-day regimen is recommended in non-AC HEC.",
      grade: "II, B",
    },
    {
      action: "Give olanzapine 10 mg; consider 5 mg or a bedtime dose where drowsiness is a concern, for example in older people",
      why: "10 mg is the dose most studied; 5 mg works better than nothing but has not been shown equal to 10 mg.",
      source: "mascc-esmo-2023-hec",
      quote: "If sedation is a concern, a starting daily dose of 5 mg and/or administration at bedtime is an option",
      grade: "II, B",
    },
    {
      action: "For moderate emetic risk, add an NK1 receptor antagonist to the 5-HT3 receptor antagonist and steroid for carboplatin at AUC 5 or more, and for women under 50 having oxaliplatin",
      why: "These two groups are sick more often than others on moderate-risk treatment, and the third drug helps them.",
      source: "mascc-esmo-2023-mec",
      quote: "for patients undergoing carboplatin (AUC ≥ 5) and women < 50 years of age receiving oxaliplatin-based treatment",
    },
    {
      action: "For other moderate-risk regimens, give a 5-HT3 receptor antagonist with a steroid, and give the steroid on day 1 only",
      why: "Trials found a single day of steroid as good as several days for these regimens, with fewer steroid side effects.",
      source: "mascc-esmo-2023-mec",
      quote: "it is recommended that the administration of steroids should be limited to day 1 in moderately emetogenic chemotherapy regimens",
    },
    {
      action: "For low emetic risk, give one anti-sickness drug before treatment and none for the following days; for minimal risk, give none routinely",
      why: "Most people on these treatments are not sick, so routine medicines would add side effects without benefit.",
      source: "mascc-esmo-2023-low",
      quote: "No antiemetic prophylaxis is recommended for minimal emetic potential therapy, and single agents recommended for low emetic potential chemotherapy for acute emesis, but no prophylaxis is recommended for delayed emesis.",
    },
    {
      action: "Keep dexamethasone in the regimen when a checkpoint inhibitor is given with chemotherapy; give no routine prophylaxis for a checkpoint inhibitor alone",
      why: "There is no evidence that the steroid weakens immunotherapy in these combinations, and the immunotherapy drugs on their own rarely cause sickness.",
      source: "asco-2020",
      quote: "There is no clinical evidence to warrant omission of dexamethasone from guideline-compliant prophylactic antiemetic regimens when CPIs are administered to adults in combination with chemotherapy.",
    },
    {
      action: "For high-dose chemotherapy before a stem cell transplant, give a 5-HT3 receptor antagonist, dexamethasone and aprepitant, and consider olanzapine",
      why: "High-dose conditioning causes sickness over several days; this combination is the best supported.",
      source: "mascc-esmo-2023-multiday",
      quote: "Olanzapine could be considered part of the antiemetic regimen.",
    },
    {
      action: "For cisplatin given over several days, give all four drugs on each treatment day, with olanzapine 5 mg at bedtime, and continue olanzapine, aprepitant and dexamethasone for 2 days after the last dose",
      why: "Each day of cisplatin brings its own sickness, and the delayed phase follows the last dose.",
      source: "mascc-esmo-2023-multiday",
      quote: "Olanzapine (in a dose of 5 mg at bedtime), aprepitant, and dexamethasone should be given once daily on the days of chemotherapy and until 2 days post-chemotherapy",
      grade: "I/A",
    },
    {
      action: "If nausea or vomiting breaks through despite prophylaxis, give olanzapine 10 mg once daily for 3 days, and step up the next cycle",
      why: "Olanzapine has the best evidence for rescue; rescue medicines are usually those used for the next higher level of risk.",
      source: "mascc-esmo-2023-multiday",
      quote: "The available evidence for breakthrough nausea and vomiting suggests the use of 10-mg olanzapine, once daily for 3 days",
      grade: "II/B",
    },
  ],
  bestInClass: {
    statement: "The MASCC/ESMO 2023 update is the most recent international guideline and the only one read here in full. It makes olanzapine a fixed part of a four-drug regimen for all high emetic risk chemotherapy (I, A), which it notes is in line with ASCO, keeps dexamethasone on days 2 to 4 after cisplatin and other non-anthracycline-cyclophosphamide regimens, and drops it after day 1 for anthracycline with cyclophosphamide. ASCO's latest update (2020) was read only as an abstract: it left its adult recommendations unchanged apart from adding olanzapine as an option in stem cell transplant and a 5 mg olanzapine dose, and it is the source for keeping dexamethasone with chemotherapy plus checkpoint inhibitors. Where the two differ is the dose of olanzapine: ASCO offers 5 mg as an option, while MASCC/ESMO say 10 mg is the best investigated and that 5 mg has not been shown to be as effective. NCCN (2023) and Cancer Care Ontario (2019) were not read; a 2024 comparison of all four says they share many fundamental similarities and that evidence is thin for low and minimal risk regimens.",
    sources: ["mascc-esmo-2023-hec", "mascc-esmo-2023-mec", "mascc-esmo-2023-low", "mascc-esmo-2023-multiday", "asco-2020", "comparison-2024"],
  },
  variants: [
    {
      name: "Olanzapine 5 mg as a standard dose (ASCO 2020)",
      differs: "ASCO's 2020 update added a 5 mg olanzapine dose for adults as an option alongside 10 mg.",
      evidence: "MASCC/ESMO (2023) found that 5 mg is better than placebo but that no adequately powered study has compared it with 10 mg, so they keep 10 mg as the best investigated dose and 5 mg as an option where sedation is a concern (II, B).",
      sources: ["asco-2020", "mascc-esmo-2023-hec"],
    },
    {
      name: "Dexamethasone on day 1 only after cisplatin (steroid-sparing)",
      differs: "Stops dexamethasone after day 1 for cisplatin as well as for anthracycline with cyclophosphamide, to spare steroid side effects such as poor sleep, high blood sugar and indigestion.",
      evidence: "MASCC/ESMO judged the trials inconclusive for cisplatin and kept the 3 to 4 day regimen; they note that a few studies have tested a 1-day regimen in cisplatin, one showing comparable efficacy, and that none of the trials it considered included olanzapine. The 2025 review by members of the committee lists this as an open question.",
      sources: ["mascc-esmo-2023-hec", "beyond-2025"],
    },
    {
      name: "Non-drug approaches alongside medicines (MASCC/ESMO integrative review)",
      differs: "Adds acupuncture or electroacupuncture, food-based approaches, or progressive muscle relaxation with or without guided imagery to the drug regimen.",
      evidence: "MASCC/ESMO (2023) could make recommendations for these three, found major methodological flaws in many trials, could make no recommendation for ginger because the evidence conflicts, and none for aromatherapy, hypnosis in adults, music therapy or reflexology.",
      sources: ["mascc-esmo-2023-integrative"],
    },
  ],
  grades: [
    { claim: "Four-drug regimen with olanzapine before high emetic risk chemotherapy, both cisplatin-type and anthracycline with cyclophosphamide", grade: "I, A", source: "mascc-esmo-2023-hec", quote: "Olanzapine is now recommended as a fixed part of a four-drug prophylactic antiemetic regimen in both non-AC and AC HEC." },
    { claim: "Dexamethasone and olanzapine on days 2 to 4 after non-anthracycline-cyclophosphamide high emetic risk chemotherapy", grade: "II, B", source: "mascc-esmo-2023-hec", quote: "DEX and olanzapine on days 2 to 4 is suggested to prevent delayed nausea and vomiting" },
    { claim: "Olanzapine alone on days 2 to 4 after anthracycline with cyclophosphamide", grade: "II, B", source: "mascc-esmo-2023-hec" },
    { claim: "Olanzapine 10 mg, with 5 mg or a bedtime dose as an option where sedation is a concern", grade: "II, B", source: "mascc-esmo-2023-hec", quote: "The best investigated dose is 10 mg." },
    { claim: "Four drugs for multiple-day cisplatin", grade: "I/A (acute); II/B for the number of days", source: "mascc-esmo-2023-multiday" },
    { claim: "5-HT3 receptor antagonist, dexamethasone and aprepitant for high-dose chemotherapy before stem cell transplant", grade: "I/A", source: "mascc-esmo-2023-multiday" },
    { claim: "Olanzapine for breakthrough nausea and vomiting", grade: "II/B", source: "mascc-esmo-2023-multiday" },
  ],
  sources: [
    { key: "mascc-esmo-2023-hec", label: "2023 updated MASCC/ESMO consensus recommendations: prevention of nausea and vomiting following high-emetic-risk antineoplastic agents", publisher: "MASCC and ESMO, Supportive Care in Cancer", year: 2023, url: "https://europepmc.org/article/PMC/PMC10739516", doi: "10.1007/s00520-023-08221-4", gradingScheme: "Each recommendation printed with a level of evidence (Roman numeral) and a grade of recommendation (letter), for example I A; the definitions of the levels and grades were not in the text read.", read: "full-text", accessed: "2026-11-11" },
    { key: "mascc-esmo-2023-multiday", label: "2023 updated MASCC/ESMO consensus recommendations: prevention of nausea and vomiting following multiple-day chemotherapy, high-dose chemotherapy, and breakthrough nausea and vomiting", publisher: "MASCC and ESMO, Supportive Care in Cancer", year: 2023, url: "https://europepmc.org/article/PMC/PMC10725845", doi: "10.1007/s00520-023-08224-1", gradingScheme: "Level of evidence and grade of recommendation printed together, for example I/A.", read: "full-text", accessed: "2026-11-11" },
    { key: "mascc-esmo-2023-mec", label: "2023 updated MASCC/ESMO Consensus recommendations: Prevention of nausea and vomiting following moderately emetic risk antineoplastic agents", publisher: "MASCC and ESMO, Supportive Care in Cancer", year: 2023, url: "https://europepmc.org/abstract/MED/38114821", doi: "10.1007/s00520-023-08222-3", read: "abstract", accessed: "2026-11-11" },
    { key: "mascc-esmo-2023-low", label: "2023 updated MASCC/ESMO consensus recommendations: controlling nausea and vomiting with chemotherapy of low or minimal emetic potential", publisher: "MASCC and ESMO, Supportive Care in Cancer", year: 2023, url: "https://europepmc.org/abstract/MED/38110581", doi: "10.1007/s00520-023-08223-2", read: "abstract", accessed: "2026-11-11" },
    { key: "mascc-esmo-2023-integrative", label: "2023 MASCC/ESMO consensus antiemetic guidelines related to integrative and non-pharmacological therapies", publisher: "MASCC and ESMO, Supportive Care in Cancer", year: 2023, url: "https://europepmc.org/abstract/MED/38102373", doi: "10.1007/s00520-023-08225-0", read: "abstract", accessed: "2026-11-11" },
    { key: "mascc-esmo-2023-esmo-open", label: "2023 MASCC and ESMO guideline update for the prevention of chemotherapy- and radiotherapy-induced nausea and vomiting", publisher: "MASCC and ESMO, ESMO Open", year: 2024, url: "https://doi.org/10.1016/j.esmoop.2023.102195", doi: "10.1016/j.esmoop.2023.102195", read: "not-reachable", accessed: "2026-11-11" },
    { key: "asco-2020", label: "Antiemetics: ASCO Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2020, url: "https://europepmc.org/abstract/MED/32658626", doi: "10.1200/JCO.20.01296", read: "abstract", accessed: "2026-11-11" },
    { key: "comparison-2024", label: "2020 ASCO, 2023 NCCN, 2023 MASCC/ESMO, and 2019 CCO: a comparison of antiemetic guidelines for the treatment of chemotherapy-induced nausea and vomiting in cancer patients", publisher: "Supportive Care in Cancer", year: 2024, url: "https://europepmc.org/abstract/MED/38594320", doi: "10.1007/s00520-024-08462-x", read: "abstract", accessed: "2026-11-11" },
    { key: "beyond-2025", label: "Going beyond the 2023 MASCC and ESMO guideline update for the prevention of chemotherapy- and radiotherapy-induced nausea and vomiting", publisher: "European Journal of Cancer", year: 2025, url: "https://europepmc.org/abstract/MED/40288116", doi: "10.1016/j.ejca.2025.115451", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-moon-olanzapine-antiemetic-everywhere"],
  gaps: [
    "The moderate and low emetic risk updates were read only as abstracts, so their grades, their lists of which drugs fall in which risk group, and their preferred single agent for low risk are not given here.",
    "The ESMO Open summary of the 2023 MASCC/ESMO guideline could not be read: the publisher page refused a script and Europe PMC holds no abstract.",
    "ASCO 2020 was read only as an abstract; its full table of regimens, its paediatric recommendations and its doses are not given here. No ASCO antiemetic update after 2020 was found in Europe PMC.",
    "NCCN Antiemesis guidelines require a login and were not read; Cancer Care Ontario's 2019 guidance was not located.",
    "The emetic risk of several newer drugs is not settled: MASCC/ESMO say experience with sacituzumab govitecan and trastuzumab deruxtecan suggests a risk comparable to carboplatin at AUC above 5, and call for trials.",
    "No guideline read here covers nausea from daily oral anticancer drugs or long-delayed nausea, which the 2025 review lists as open questions.",
    "Whether dexamethasone can be limited to day 1 after cisplatin when olanzapine is added is unresolved; MASCC/ESMO did not consider the SPARED study, published then as an abstract only.",
  ],
  institutions: ["mascc", "esmo", "asco"],
  technologies: ["antiemetic-therapy"],
  drugs: ["aprepitant", "netupitant-palonosetron", "palonosetron", "ondansetron", "granisetron", "rolapitant", "dexamethasone", "cisplatin", "carboplatin", "oxaliplatin", "cyclophosphamide"],
  related: [],
  sections: ["supportive-care"],
  tags: ["protocol", "nausea-and-vomiting", "supportive-care"],
});

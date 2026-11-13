import { protocol } from "./helpers";

/*
 * Anticipatory nausea and vomiting before chemotherapy: prevention by controlling nausea from the first cycle, and
 * treatment with behavioural therapy and benzodiazepines. Prophylaxis by emetic risk is its own protocol, linked in
 * `related`.
 *
 * What was read, and how (11 November 2026, fetched raw with curl or the Europe PMC REST API into a scratch directory
 * and read as text):
 * - 2016 updated MASCC/ESMO consensus recommendations on anticipatory nausea and vomiting (Dupuis et al., Support Care
 *   Cancer 2017): abstract only, from Europe PMC; no open full text was found. This is still the latest MASCC/ESMO
 *   statement on the subject: the committee list of the 2023 MASCC/ESMO antiemetic update (MASCC's own slide set,
 *   read in full) has no anticipatory working group, and the 2023 ESMO Open summary (PMC10937211, full text) has no
 *   recommendation on it.
 * - 2023 MASCC/ESMO antiemetic guideline update (Herrstedt et al., ESMO Open 2024; PMC10937211): full text, for the
 *   suggestion on progressive muscle relaxation.
 * - eviQ (Cancer Institute NSW) "Prevention of anti-cancer therapy induced nausea and vomiting" (ID 7, last reviewed
 *   28 August 2024): full public page, anticipatory section.
 * - Japanese Clinical Practice Guidelines for Antiemesis 2023 systematic review of non-drug treatments for anticipatory
 *   nausea (Int J Clin Oncol 2024): abstract.
 * - Randomised trial of nurse-delivered behavioural interventions (Hunter et al., Cancer Med 2020; PMC7050098): full
 *   text.
 * - Scottish Palliative Care Guidelines, "Nausea and vomiting" (Healthcare Improvement Scotland, 2025): full page.
 * The ASCO antiemetic guideline (2020) and NCCN antiemesis guideline were not read beyond the ASCO abstract, which does
 * not address anticipatory nausea. Every DOI was resolved through Europe PMC and its title checked. Quotes are copied
 * from the raw text with nothing changed.
 */
export const anticipatoryNauseaAndVomiting = protocol({
  id: "anticipatory-nausea-and-vomiting",
  name: "Anticipatory nausea and vomiting before chemotherapy: prevention and treatment",
  aka: ["anticipatory nausea", "ANV", "conditioned nausea before chemotherapy", "anticipatory emesis", "feeling sick before chemotherapy"],
  domain: "symptom-management",
  tldr: "Some people feel sick, or are sick, before a chemotherapy session, set off by the hospital or a smell: a learned reaction to sickness in earlier cycles. The best protection is good anti-sickness medicine from the first cycle. If it happens, tell your team: relaxation training helps, and a calming tablet such as lorazepam the night before and on the morning of treatment can be offered.",
  simple: "Some people feel sick before chemo because of bad sickness last time. Good sickness medicine from the start helps stop this. Relaxing exercises and a calming tablet can help.",
  summary: "Anticipatory nausea and vomiting is a conditioned response that follows poorly controlled nausea in earlier cycles. MASCC/ESMO (2016, unchanged from 2009 and still the latest statement) recommend preventing it by optimal control of acute and delayed chemotherapy-induced nausea and vomiting, and treating it with benzodiazepines and behavioural therapies, in particular progressive muscle relaxation, systematic desensitisation and hypnosis; their 2016 search found no new trial meeting its criteria. eviQ (reviewed 2024) gives lorazepam 0.5 to 1 mg orally the night before and 1 to 2 hours before treatment. A 2024 meta-analysis for the Japanese antiemesis guideline found that systematic desensitisation reduced anticipatory nausea (risk ratio 0.60) and vomiting (0.54) in a few small, mostly high-risk-of-bias studies. In a randomised trial of 474 people, 20-minute nurse-delivered mindfulness relaxation or relaxing music reduced anticipatory nausea at the midpoint of chemotherapy but not at the end. The 2023 MASCC/ESMO update suggests progressive muscle relaxation, alone or with guided imagery, as an adjunct for chemotherapy-induced nausea generally [II, B].",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "outpatient-clinic", "home"],
  },
  population: "Children and adults receiving chemotherapy (the MASCC/ESMO statement covers both); the lorazepam dose given is for adults. Most trial participants were women with breast cancer.",
  trigger: "Before the first cycle (prevention); and whenever a person reports nausea or vomiting starting before a treatment session.",
  steps: [
    {
      action: "Give guideline antiemetic prophylaxis for the emetic risk of the regimen from the first cycle, and treat breakthrough nausea promptly",
      why: "Anticipatory nausea is learned from bad experiences in earlier cycles; preventing that first bad experience is the most effective protection.",
      source: "eviq-7",
      quote: "The best management of anticipatory emesis is to ensure good control of acute and delayed emesis, starting from the initial anti-cancer treatment cycle.",
    },
    {
      action: "Before each cycle, ask whether nausea or vomiting starts before treatment, for example on the way to hospital or at the sight or smell of the unit",
      why: "It is easily missed unless asked about, and recognising it early allows treatment before it becomes entrenched.",
      source: "eviq-7",
      quote: "Anticipatory emesis: occurring before receiving next treatment of anti-cancer therapy. It is a conditioned response, typically occurring after a previous negative experience with anti-cancer therapy.",
    },
    {
      action: "Offer a behavioural therapy: progressive muscle relaxation training, systematic desensitisation or hypnosis",
      why: "These techniques help unlearn the link between the treatment setting and feeling sick.",
      source: "mascc-esmo-2016-anv",
      quote: "Benzodiazepines and behavioral therapies, in particular progressive muscle relaxation training, systematic desensitization and hypnosis, continue to be recommended for the treatment of anticipatory nausea and vomiting.",
    },
    {
      action: "Offer a benzodiazepine, for example lorazepam 0.5 to 1 mg by mouth the night before and again 1 to 2 hours before treatment",
      why: "A benzodiazepine reduces anxiety and the learned nausea that comes with it.",
      source: "eviq-7",
      quote: "For patients who do develop anticipatory emesis, non-pharmacologic methods such as behavioural/psychological techniques may be useful and/or benzodiazepines e.g. lorazepam 0.5 mg to 1 mg orally on the night before and then repeated the next day 1-2 hours before anti-cancer treatment.",
    },
    {
      action: "Suggest progressive muscle relaxation, alone or with guided imagery, alongside antiemetics during chemotherapy",
      why: "Relaxation reduces nausea after chemotherapy as well, which helps prevent the bad experiences that anticipatory nausea grows from.",
      source: "mascc-esmo-2023",
      quote: "The adjunctive use of PMRT (alone or with GI) is suggested for the management of CINV [II, B].",
      grade: "[II, B]",
    },
  ],
  bestInClass: {
    statement: "MASCC/ESMO 2016 remains the latest international statement (the 2023 update did not revisit anticipatory nausea): prevent it through optimal control of acute and delayed nausea from the first cycle, and treat it with benzodiazepines and behavioural therapy (progressive muscle relaxation, systematic desensitisation, hypnosis). eviQ (2024) agrees and gives the lorazepam dose. The evidence under the treatment recommendations is thin: MASCC/ESMO found no new trial meeting its criteria in 2016, and the Japanese guideline's 2024 meta-analysis supports systematic desensitisation from small, mostly high-risk-of-bias studies.",
    sources: ["mascc-esmo-2016-anv", "mascc-2023-committees", "eviq-7", "jsco-2024-anv"],
  },
  variants: [
    {
      name: "Brief nurse-delivered mindfulness relaxation or relaxing music before chemotherapy",
      differs: "A 20-minute session given by an oncology nurse, of mindfulness relaxation or relaxing music, rather than a course of behavioural therapy from a psychologist.",
      evidence: "Randomised trial of 474 people (mostly women with early breast cancer): both reduced anticipatory nausea at the midpoint of chemotherapy against standard care (odds ratios 0.44 and 0.40) but not at the end, and did not change anticipatory vomiting or nausea after chemotherapy.",
      sources: ["hunter-2020"],
    },
    {
      name: "Systematic desensitisation as the preferred behavioural therapy (Japanese antiemesis guideline 2023)",
      differs: "Singles out systematic desensitisation among behavioural methods; hypnotherapy and yoga could not be pooled.",
      evidence: "Meta-analysis of two studies: risk ratio 0.60 for anticipatory nausea and 0.54 for anticipatory vomiting; most included studies at high or unclear risk of bias. The authors call for further research before routine use.",
      sources: ["jsco-2024-anv"],
    },
    {
      name: "Sublingual lorazepam for anticipatory or anxiety-related nausea in palliative care (Scotland)",
      differs: "In palliative care, gives lorazepam 500 micrograms to 1 mg sublingually (an unlicensed route), with diazepam or midazolam as second line, and pairs antiemetics with assessment and treatment of anxiety.",
      evidence: "National palliative care guideline (2025), based on an evidence review and expert opinion; not graded for this point.",
      sources: ["scottish-palliative-nv-2025"],
    },
  ],
  grades: [
    { claim: "Anticipatory nausea is best prevented by optimal control of acute and delayed nausea", grade: "MASCC/ESMO consensus recommendation (grade not shown in the abstract read)", source: "mascc-esmo-2016-anv", quote: "The guideline panel continues to recommend that anticipatory nausea and vomiting are best prevented through optimization of acute and delayed phase chemotherapy-induced nausea and vomiting control." },
    { claim: "Systematic desensitisation reduced anticipatory nausea", grade: "meta-analysis, RR 0.60 (95% CI 0.49 to 0.72)", source: "jsco-2024-anv", quote: "Among them, systematic desensitization significantly improved anticipatory CINV as compared to that in the control group (nausea: risk ratio [RR] = 0.60, 95% confidence interval [CI] = 0.49-0.72, p < 0.00001; vomiting: RR = 0.54, 95% CI = 0.32-0.91, p = 0.02)." },
    { claim: "Progressive muscle relaxation, alone or with guided imagery, as an adjunct for chemotherapy-induced nausea", grade: "[II, B]", source: "mascc-esmo-2023", quote: "The adjunctive use of PMRT (alone or with GI) is suggested for the management of CINV [II, B]." },
  ],
  sources: [
    { key: "mascc-esmo-2016-anv", label: "2016 updated MASCC/ESMO consensus recommendations: Anticipatory nausea and vomiting in children and adults receiving chemotherapy", publisher: "MASCC/ESMO, Supportive Care in Cancer", year: 2017, url: "https://europepmc.org/abstract/MED/27510314", doi: "10.1007/s00520-016-3330-z", read: "abstract", accessed: "2026-11-11" },
    { key: "mascc-esmo-2023", label: "2023 MASCC and ESMO guideline update for the prevention of chemotherapy- and radiotherapy-induced nausea and vomiting", publisher: "MASCC/ESMO, ESMO Open", year: 2024, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10937211/", doi: "10.1016/j.esmoop.2023.102195", gradingScheme: "ESMO levels of evidence (I to V) and grades of recommendation (A to E), in square brackets.", read: "full-text", accessed: "2026-11-11" },
    { key: "mascc-2023-committees", label: "MASCC/ESMO Antiemetic Guideline 2023: committee slide set", publisher: "MASCC", year: 2025, url: "https://mascc.org/wp-content/uploads/2025/04/Antiemetic-guidelines-2023-slides-v2.pdf", gradingScheme: "Slide summary of the 2023 update; lists the ten committees, none on anticipatory nausea.", read: "full-text", accessed: "2026-11-11" },
    { key: "eviq-7", label: "Prevention of anti-cancer therapy induced nausea and vomiting (AINV) (ID 7)", publisher: "eviQ, Cancer Institute NSW", year: 2024, url: "https://www.eviq.org.au/p/7", gradingScheme: "Evidence-based summary built on ASCO 2020, NCCN 2024 and MASCC/ESMO 2023; not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "jsco-2024-anv", label: "Non-pharmacological treatments for anticipatory nausea and vomiting during chemotherapy: a systematic review and meta-analysis of the Clinical Practice Guidelines for Antiemesis 2023", publisher: "International Journal of Clinical Oncology", year: 2024, url: "https://europepmc.org/abstract/MED/38722486", doi: "10.1007/s10147-024-02536-w", read: "abstract", accessed: "2026-11-11" },
    { key: "hunter-2020", label: "A randomized trial of nurse-administered behavioral interventions to manage anticipatory nausea and vomiting in chemotherapy", publisher: "Cancer Medicine", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7050098/", doi: "10.1002/cam4.2863", read: "full-text", accessed: "2026-11-11" },
    { key: "scottish-palliative-nv-2025", label: "Scottish Palliative Care Guidelines: Nausea and vomiting", publisher: "Healthcare Improvement Scotland (Right Decision Service)", year: 2025, url: "https://www.palliativecareguidelines.scot.nhs.uk/scottish-palliative-care-guidelines/symptoms/non-pain-symptoms/nausea-and-vomiting/", gradingScheme: "Evidence review with SIGN methodology ratings for references; recommendations are not individually graded.", read: "full-text", accessed: "2026-11-11" },
  ],
  gaps: [
    "The 2016 MASCC/ESMO statement was read only as an abstract; its levels of evidence, its dose recommendations and its advice for children are not shown here.",
    "The ASCO (2020) and NCCN antiemesis guidelines' sections on anticipatory nausea were not read.",
    "No trial in the sources read compares a benzodiazepine with a behavioural therapy, or tests either in the era of olanzapine and NK1 antagonists, which may have made anticipatory nausea less common.",
    "Advice on drowsiness, driving and falls with lorazepam is not given in the sources read, and should come from the prescriber.",
    "How many people are offered behavioural therapy, and who delivers it, has not been measured in any source read.",
  ],
  institutions: ["mascc", "esmo"],
  drugs: ["midazolam"],
  technologies: ["antiemetic-therapy", "relaxation-guided-imagery", "hypnosis-cancer-care"],
  related: ["antiemetic-prophylaxis-by-emetic-risk"],
  sections: ["supportive-care"],
  tags: ["protocol", "nausea-and-vomiting", "supportive-care"],
});

/**
 * Ask OnCo natural-question set: 60 questions written the way a patient, a clinician or an investor would
 * type them, each with the records that carry the answer and a rubric of must-mention points (any phrase in
 * a point satisfies it, case-insensitive substring). Complements the open benchmark (benchmark.ts), which is
 * phrased more formally. Scored by scripts/benchmark-ask.ts and floored in src/lib/ask.test.ts.
 *
 * The first question is the owner's example. Rubrics reflect the corpus as of September 2026.
 */
export type AskEvalQuestion = {
  id: string;
  question: string;
  audience: "patient" | "clinician" | "investor";
  /** Record ids that carry the answer; retrieval recall is measured against these. */
  entities: string[];
  /** Must-mention points, each a list of accepted phrases. */
  rubric: string[][];
};

const Q = (id: string, audience: AskEvalQuestion["audience"], question: string, entities: string[], rubric: string[][]): AskEvalQuestion => ({ id, audience, question, entities, rubric });

export const askEval: AskEvalQuestion[] = [
  // ---------------- patient ----------------
  Q("p-01", "patient", "What does 'triple-negative' mean in breast cancer?", ["tnbc"], [["oestrogen", "estrogen"], ["progesterone"], ["her2"], ["lack", "negative", "without"]]),
  Q("p-02", "patient", "How is TNBC treated?", ["tnbc", "pembrolizumab", "sacituzumab-govitecan"], [["pembrolizumab", "keynote-522"], ["sacituzumab", "trodelvy"], ["surgery"], ["datopotamab", "dato-dxd"]]),
  Q("p-03", "patient", "What are the side effects of Trodelvy?", ["sacituzumab-govitecan"], [["neutropenia"], ["diarrhoea", "diarrhea"], ["blood count", "ugt1a1", "monitor"]]),
  Q("p-04", "patient", "Is Enhertu approved in the UK?", ["trastuzumab-deruxtecan"], [["united kingdom"], ["mhra"], ["approved"], ["2021"]]),
  Q("p-05", "patient", "How does Keytruda work?", ["pembrolizumab"], [["pd-1"], ["t cell", "t-cell", "immune"], ["block", "releas", "brake"]]),
  Q("p-06", "patient", "What is the survival rate for triple negative breast cancer?", ["tnbc"], [["stage"], ["survival page", "seer"], ["keynote-522", "immunotherapy", "adc"], ["groups", "not any one person", "estimate"]]),
  Q("p-07", "patient", "Does scalp cooling stop hair loss during chemotherapy?", ["scalp-cooling"], [["half", "50%"], ["taxane"], ["cold cap", "scalp cooling"]]),
  Q("p-08", "patient", "What is a hazard ratio in plain words?", ["hazard-ratio"], [["two groups", "comparing"], ["0.5", "halved"], ["confidence interval", "<1", "favours"]]),
  Q("p-09", "patient", "Is there a trial I could join for metastatic pancreatic cancer?", ["pancreatic"], [["trial"], ["kras", "rasolute", "daraxonrasib"], ["pancreatic"]]),
  Q("p-10", "patient", "Who makes Keytruda?", ["pembrolizumab", "merck"], [["merck", "msd"], ["pembrolizumab"]]),
  Q("p-11", "patient", "How much does Enhertu cost and is it covered on the NHS?", ["trastuzumab-deruxtecan"], [["nice"], ["recommended"], ["her2-low"]]),
  Q("p-12", "patient", "What is HER2-low?", ["her2-low", "trastuzumab-deruxtecan"], [["1+"], ["ultralow"], ["enhertu", "trastuzumab deruxtecan"]]),
  Q("p-13", "patient", "What is the difference between a PET scan and a CT scan?", ["pet", "ct"], [["tracer", "glucose", "fdg", "metabol", "radioactive"], ["x-ray", "anatom", "structure", "cross-section"], ["pet"], ["ct"]]),
  Q("p-14", "patient", "What is immunotherapy?", ["immunotherapy-term"], [["immune system"], ["checkpoint"], ["car-t", "cell therap", "vaccine"]]),
  Q("p-15", "patient", "What does pCR mean after chemotherapy?", ["pcr"], [["no invasive cancer", "no cancer", "ypt0"], ["surgeon", "surgery", "removes"], ["prognos", "90%", "efs"]]),
  Q("p-16", "patient", "My mother has HER2-positive breast cancer. What are the main treatments?", ["breast-her2-positive"], [["trastuzumab"], ["pertuzumab"], ["t-dxd", "trastuzumab deruxtecan", "enhertu"]]),
  Q("p-17", "patient", "Are CAR-T side effects dangerous?", ["car-t"], [["crs", "cytokine release"], ["icans", "neurotox"], ["t cells", "living drug"]]),
  Q("p-18", "patient", "What does a phase 3 trial mean?", ["trial-phases"], [["standard"], ["hundreds", "thousands"], ["phase 1", "safe dose"]]),
  Q("p-19", "patient", "Is bowel cancer curable if caught early?", ["colorectal"], [["screening"], ["surgery"], ["survival page", "seer", "stage"]]),
  Q("p-20", "patient", "What questions should I ask my oncologist before surgery for triple-negative breast cancer?", ["tnbc"], [["pembrolizumab", "keynote-522"], ["trial"], ["triple-negative", "tnbc"]]),

  // ---------------- clinician ----------------
  Q("c-21", "clinician", "What is the first-line standard of care for PD-L1-negative metastatic TNBC?", ["tnbc", "datopotamab-deruxtecan", "sacituzumab-govitecan"], [["datopotamab"], ["sacituzumab"], ["tropion-breast02"], ["ascent-03"]]),
  Q("c-22", "clinician", "Which regional approvals does datopotamab deruxtecan hold?", ["datopotamab-deruxtecan"], [["united states"], ["japan"], ["2025"], ["under review", "china"]]),
  Q("c-23", "clinician", "What is the grade 3 or higher neutropenia rate with sacituzumab govitecan?", ["sacituzumab-govitecan"], [["49%"], ["neutropenia"], ["ascent"]]),
  Q("c-24", "clinician", "How should ILD from trastuzumab deruxtecan be managed?", ["trastuzumab-deruxtecan", "ild"], [["discontinue"], ["steroid"], ["grade ≥2", "grade 2", "grade 1"]]),
  Q("c-25", "clinician", "What did TROPION-Breast02 show?", ["tropion-breast02"], [["overall survival", "os"], ["datopotamab", "dato-dxd"], ["first-line", "first line"]]),
  Q("c-26", "clinician", "Which biomarkers should be tested in advanced NSCLC?", ["nsclc"], [["egfr"], ["alk"], ["pd-l1"], ["kras"]]),
  Q("c-27", "clinician", "What is the mechanism of action of venetoclax?", ["venetoclax", "bcl2"], [["bcl-2", "bcl2"], ["bh3"], ["survival shield", "self-destruct", "apoptosis", "protection"]]),
  Q("c-28", "clinician", "Which trials established osimertinib in EGFR-mutant NSCLC?", ["osimertinib", "flaura2", "adaura"], [["flaura"], ["adaura"], ["egfr"]]),
  Q("c-29", "clinician", "Compare sacituzumab govitecan and datopotamab deruxtecan.", ["sacituzumab-govitecan", "datopotamab-deruxtecan"], [["sn-38"], ["dxd"], ["trop2"], ["stomatitis", "neutropenia"]]),
  Q("c-30", "clinician", "What is the standard adjuvant treatment for germline BRCA TNBC with residual disease?", ["tnbc", "olaparib", "olympia"], [["olaparib"], ["olympia"], ["1 year", "one year", "a year"]]),
  Q("c-31", "clinician", "What are the immune-related side effects of checkpoint inhibitors and how are they managed?", ["checkpoint-inhibitor", "irae"], [["colitis", "thyroid", "pneumonitis", "hepatitis"], ["steroid"], ["immune-related", "irae"]]),
  Q("c-32", "clinician", "Where is sacituzumab tirumotecan approved?", ["sacituzumab-tirumotecan"], [["china"], ["nmpa"], ["not been filed", "planned", "under review", "not approved", "no maa"]]),
  Q("c-33", "clinician", "What does the CPS score mean for pembrolizumab eligibility in TNBC?", ["cps", "pembrolizumab"], [["10"], ["22c3"], ["pd-l1"]]),
  Q("c-34", "clinician", "What did KEYNOTE-355 show about PD-L1 thresholds?", ["keynote-355"], [["cps"], ["10"], ["0.73", "23.0"]]),
  Q("c-35", "clinician", "What is ADC sequencing and why is it an open problem?", ["adc-sequencing"], [["payload"], ["second"], ["top1", "topoisomerase", "slfn11", "efflux", "resistance"]]),
  Q("c-36", "clinician", "Which drugs target TROP2?", ["trop2", "sacituzumab-govitecan", "datopotamab-deruxtecan"], [["sacituzumab govitecan"], ["datopotamab deruxtecan"], ["sacituzumab tirumotecan"]]),
  Q("c-37", "clinician", "What is the dosing schedule of trastuzumab deruxtecan?", ["trastuzumab-deruxtecan"], [["5.4 mg/kg"], ["every 3 weeks", "3 weeks"], ["6.4", "gastric"]]),
  Q("c-38", "clinician", "What resistance mechanisms limit KRAS G12C inhibitors?", ["kras-inhibitors", "kras"], [["feedback", "rtk", "resistance"], ["combination"], ["sotorasib", "adagrasib"]]),
  Q("c-39", "clinician", "Which immunotherapy combinations are standard first line in advanced HCC?", ["hcc"], [["atezolizumab", "bevacizumab"], ["durvalumab", "tremelimumab"], ["nivolumab", "ipilimumab"]]),
  Q("c-40", "clinician", "What are the toxicities of datopotamab deruxtecan versus sacituzumab govitecan?", ["datopotamab-deruxtecan", "sacituzumab-govitecan"], [["stomatitis"], ["neutropenia"], ["eye", "keratitis", "ocular"], ["diarrhoea", "diarrhea"]]),

  // ---------------- investor / analyst ----------------
  Q("i-41", "investor", "Who owns Trodelvy and how did they get it?", ["sacituzumab-govitecan", "gilead"], [["gilead"], ["immunomedics"], ["$21b", "21b", "21 billion"]]),
  Q("i-42", "investor", "Which company develops sacituzumab tirumotecan and who holds ex-China rights?", ["sacituzumab-tirumotecan", "kelun-biotech", "merck"], [["kelun"], ["merck", "msd"]]),
  Q("i-43", "investor", "What is in the TNBC pipeline?", ["tnbc"], [["sacituzumab tirumotecan"], ["izalontamab", "iza-bren"], ["tropion-breast05"]]),
  Q("i-44", "investor", "How many products target TROP2 and which are approved?", ["trop2"], [["sacituzumab govitecan"], ["datopotamab deruxtecan"], ["tirumotecan"]]),
  Q("i-45", "investor", "What did BL-B01D1-307 show and who owns iza-bren?", ["bl-b01d1-307", "izalontamab-brengitecan"], [["bispecific"], ["systimmune", "bristol", "bms"], ["2026"]]),
  Q("i-46", "investor", "Where is datopotamab deruxtecan under review?", ["datopotamab-deruxtecan"], [["china"], ["australia"], ["under review"]]),
  Q("i-47", "investor", "How common is TNBC: how many cases per year?", ["tnbc"], [["10-15%", "15%"], ["200,000"], ["younger", "black women", "brca1"]]),
  Q("i-48", "investor", "What is Gilead's oncology portfolio?", ["gilead"], [["trodelvy", "sacituzumab"], ["kite", "yescarta", "car-t"], ["foster city"]]),
  Q("i-49", "investor", "Which companies are developing bispecific ADCs?", ["bispecific-adc"], [["systimmune", "biokin"], ["bispecific"]]),
  Q("i-50", "investor", "What was the Immunomedics deal worth?", ["gilead"], [["21"], ["immunomedics"], ["trodelvy", "sacituzumab"]]),
  Q("i-51", "investor", "What is TROPION-Breast05 testing?", ["tropion-breast05"], [["dato-dxd", "datopotamab"], ["pd-l1", "immunotherapy"], ["2026", "2027", "readout", "recruiting"]]),
  Q("i-52", "investor", "Which trial gave the first overall survival benefit for a first-line ADC in TNBC?", ["tropion-breast02"], [["tropion-breast02"], ["datopotamab", "dato-dxd"]]),
  Q("i-53", "investor", "Is ivonescimab approved anywhere?", ["ivonescimab"], [["china"], ["pd-1"], ["vegf"], ["summit", "akeso", "harmoni"]]),
  Q("i-54", "investor", "Who are the main companies in radioligand therapy?", ["radioligand-therapy", "novartis"], [["novartis"], ["pluvicto", "lutathera"]]),
  Q("i-55", "investor", "How do PROTAC degraders work and which one is approved?", ["protac-degrader", "vepdegestrant"], [["ubiquitin", "proteasom", "garbage", "degrad"], ["vepdegestrant"], ["e3", "ligase", "tag"]]),
  Q("i-56", "investor", "Which KRAS inhibitor is approved in pancreatic cancer?", ["daraxonrasib", "kras-inhibitors"], [["daraxonrasib"], ["rasolute", "pancrea"]]),
  Q("i-57", "investor", "What deals has BMS done in ADCs?", ["bms"], [["systimmune", "izalontamab"], ["8.4"]]),
  Q("i-58", "investor", "What happened to tazemetostat in 2026?", ["tazemetostat"], [["withdrawn"], ["2026"], ["ezh2"]]),
  Q("i-59", "investor", "Which institutions run TNBC trials?", ["tnbc"], [["md anderson", "gustave roussy", "institution"], ["tnbc", "triple-negative"]]),
  Q("i-60", "investor", "Which CAR-T products are approved and for which cancers?", ["car-t"], [["cd19", "tisagenlecleucel", "axicabtagene"], ["bcma", "idecabtagene", "ciltacabtagene"], ["lymphoma", "myeloma", "all"]]),
];

export type AskEvalScored = { id: string; audience: AskEvalQuestion["audience"]; score: number; met: number; total: number; missed: string[]; retrievalRecall: number; answer?: string };

/** Score an answer text against a question's rubric and the record ids it consulted. */
export function scoreAskEval(q: AskEvalQuestion, answer: string, consulted: string[]): AskEvalScored {
  const text = answer.toLowerCase();
  const missed: string[] = [];
  let met = 0;
  for (const point of q.rubric) { if (point.some((p) => text.includes(p.toLowerCase()))) met++; else missed.push(point[0]); }
  const hit = q.entities.filter((id) => consulted.includes(id)).length;
  return { id: q.id, audience: q.audience, score: q.rubric.length ? met / q.rubric.length : 0, met, total: q.rubric.length, missed, retrievalRecall: q.entities.length ? hit / q.entities.length : 1, answer };
}

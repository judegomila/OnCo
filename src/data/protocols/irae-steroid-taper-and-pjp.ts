import { protocol } from "./helpers";
import { ASCO_GAP, ASCO_ICI_2021, ESE_2022, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Tapering steroids after an immune-related adverse event, and preventing Pneumocystis pneumonia and adrenal
 * insufficiency while on them.
 *
 * What was read, and how: SITC 2021 (full text) and ESE 2022 (full text), as described in ./irae-sources.ts; ASCO 2021
 * (abstract). The ASCO/IDSA 2018 antimicrobial prophylaxis update, the ECIL-5 2016 Pneumocystis guideline and the 2024
 * ESE/Endocrine Society guideline on glucocorticoid-induced adrenal insufficiency were read as abstracts from Europe
 * PMC; their full texts are not in PubMed Central and the publishers (ascopubs.org, academic.oup.com) refuse a script.
 * ESMO 2022 not reachable. DOIs resolved through Europe PMC. Quotes checked by script against the raw text on
 * 11 November 2026.
 */
export const iraeSteroidTaperAndPjp = protocol({
  id: "irae-steroid-taper-and-pjp",
  name: "Steroid taper after immunotherapy side effects, with Pneumocystis prophylaxis and adrenal checks",
  aka: ["irAE steroid taper", "corticosteroid taper for immune-related adverse events", "PJP prophylaxis on steroids", "PCP prophylaxis immunotherapy", "co-trimoxazole prophylaxis on steroids", "steroid weaning after immunotherapy toxicity"],
  domain: "immunotherapy-toxicity",
  tldr: "Steroids for an immunotherapy side effect are reduced slowly, usually over at least 4 to 6 weeks, because stopping too fast can bring it back. A month or more of higher-dose steroids weakens defences against Pneumocystis pneumonia, so a preventive antibiotic (usually co-trimoxazole) is often given. Your body's own steroid production may need checking before the last tablets stop.",
  simple: "Steroids are reduced slowly over several weeks. If you are on them for a month or more, you may be given an antibiotic to prevent a lung infection.",
  summary: "Steroids are the first-line treatment for most irAEs, and their own harms (hyperglycaemia, mood change, insomnia, gastritis, weight gain, osteoporosis and opportunistic infection including Pneumocystis pneumonia) need counselling (SITC 2021, LE: 1). ASCO 2021 (abstract): taper over at least 4 to 6 weeks. SITC tapers over 4 to 6 weeks for hepatitis, pneumonitis and myocarditis, but within 4 weeks for colitis (LE: 1).\n\nPneumocystis prophylaxis: ASCO/IDSA 2018 recommends it for regimens carrying more than 3.5% risk, for example 20 mg prednisone equivalent or more daily for a month or longer. ECIL-5 (haematological patients) lists more than 4 weeks of corticosteroids as a main indication and makes trimethoprim/sulfamethoxazole the drug of choice, with pentamidine, atovaquone and dapsone second-line.\n\nAdrenal axis: doses equivalent to 7.5 mg prednisolone or more for over 3 weeks can suppress the adrenal glands, so ESE 2022 advises at least a morning cortisol (with ACTH, and a Synacthen test if needed) before stopping. The 2024 ESE/Endocrine Society guideline on glucocorticoid-induced adrenal insufficiency tapers faster in the supraphysiological range and more slowly at physiological doses.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "acute-oncology-service", "ward", "home"],
  },
  population: "Adults taking systemic corticosteroids for an immune-related adverse event of a checkpoint inhibitor. The ECIL-5 Pneumocystis guidance was written for people with haematological cancers and transplant recipients and is applied here by analogy; the ASCO/IDSA guideline covers adults with cancer-related immunosuppression generally. Hypophysitis and primary adrenal insufficiency, which need lifelong replacement, are covered by their own protocol.",
  trigger: "Starting systemic corticosteroids for an immune-related adverse event, and each step of the taper.",
  steps: [
    {
      action: "When starting steroids, explain their side effects, including high blood sugar, mood change, insomnia, stomach irritation, weight gain and infections such as Pneumocystis pneumonia",
      why: "Knowing what to look for lets the patient report problems early.",
      source: "sitc-2021",
      quote: "When beginning corticosteroid therapy, patients should be specifically counseled about potential toxicities, including hyperglycemia, mood disturbances, insomnia, gastritis, weight gain, and opportunistic infections (eg, Pneumocystis pneumonia)",
      grade: "LE: 1",
    },
    {
      action: "Taper the steroids over at least 4 to 6 weeks once the side effect has settled",
      why: "Reducing too quickly can make the inflammation come back.",
      source: "asco-2021",
      quote: "Corticosteroids should be tapered over the course of at least 4-6 weeks.",
    },
    {
      action: "Start Pneumocystis prophylaxis for anyone taking 20 mg prednisone or equivalent a day or more for a month or longer",
      why: "At this dose and duration the risk of a serious Pneumocystis lung infection is high enough to justify prevention.",
      source: "asco-idsa-2018",
      quote: "Pneumocystis jirovecii prophylaxis is recommended for patients receiving chemotherapy regimens that are associated with a > 3.5% risk for pneumonia as a result of this organism (eg, those with ≥ 20 mg prednisone equivalents daily for ≥ 1 month or on the basis of purine analog usage).",
    },
    {
      action: "Use trimethoprim/sulfamethoxazole (co-trimoxazole) as first choice, and pentamidine, atovaquone or dapsone if it cannot be taken",
      why: "Co-trimoxazole is the most effective preventive; the others are alternatives for allergy or intolerance.",
      source: "ecil-2016",
      quote: "All other drugs, including pentamidine, atovaquone and dapsone, are considered second-line alternatives when trimethoprim/sulfamethoxazole is poorly tolerated or contraindicated.",
    },
    {
      action: "Taper faster while the dose is above the body's own replacement level, and more slowly once it nears physiological doses",
      why: "Withdrawal symptoms and adrenal insufficiency mostly appear at the low end of the taper.",
      source: "ese-es-2024",
      quote: "In general, tapering of glucocorticoids can be more rapidly within a supraphysiological range, followed by a slower taper when on physiological glucocorticoid dosing.",
    },
    {
      action: "Before stopping steroids after 3 weeks or more at 7.5 mg prednisolone or above, check a morning cortisol (with ACTH, and a Synacthen test if needed)",
      why: "Long steroid courses can switch off the adrenal glands, and stopping suddenly can cause an adrenal crisis.",
      source: "ese-2022",
      quote: "Use of doses equivalent to 7.5 mg prednisolone or higher for more than 3 weeks can lead to secondary adrenal insufficiency. Thus, at least a medication fasting morning cortisol (plus ACTH) and if needed a 250 µg Synacthen® test should be considered if glucocorticoids are considered to be stopped.",
    },
    {
      action: "If the side effect does not respond to steroids, move to a second-line immunosuppressant rather than continuing high doses",
      why: "Prolonged high-dose steroids add harm without benefit when the toxicity is steroid-refractory.",
      source: "sitc-2021",
      quote: "However, in patients who do not respond to initial corticosteroid therapy, second-line immunosuppressive therapy should be considered.",
    },
  ],
  bestInClass: {
    statement: "On the taper, ASCO 2021 (abstract) sets at least 4 to 6 weeks and SITC 2021 agrees for most organs (LE: 1 for hepatitis) but tapers colitis within 4 weeks (LE: 1). On Pneumocystis, the ASCO/IDSA 2018 threshold (20 mg prednisone equivalent or more daily for 1 month or more) is the guideline written for adults with cancer in general and is the clearest trigger; ECIL-5 uses more than 4 weeks of corticosteroids in haematological patients and makes co-trimoxazole the drug of choice (graded A-II for adults in its abstract). SITC 2021 names Pneumocystis among the risks to counsel about but sets no prophylaxis threshold in the text read. On the adrenal axis, ESE 2022 advises a morning cortisol before stopping after more than 3 weeks at 7.5 mg prednisolone or more, and the 2024 ESE/Endocrine Society guideline tapers more slowly at physiological doses. None of these is a trial in checkpoint inhibitor patients.",
    sources: ["asco-2021", "sitc-2021", "asco-idsa-2018", "ecil-2016", "ese-2022", "ese-es-2024"],
  },
  variants: [
    {
      name: "Shorter taper for colitis (SITC 2021)",
      differs: "Tapers corticosteroids within 4 weeks after colitis improves to grade 1 or less, instead of over 4 to 6 weeks as for hepatitis and pneumonitis.",
      evidence: "LE: 1.",
      sources: ["sitc-2021"],
    },
    {
      name: "Prophylaxis after more than 4 weeks of corticosteroids (ECIL-5, haematological patients)",
      differs: "Uses duration (more than 4 weeks) rather than a dose threshold, and gives co-trimoxazole 2 to 3 times weekly for the whole period at risk.",
      evidence: "IDSA grading; co-trimoxazole as drug of choice in adults graded A-II.",
      sources: ["ecil-2016"],
    },
    {
      name: "Lowest effective dose, tapered within weeks (EULAR 2021, rheumatic irAEs)",
      differs: "For rheumatic irAEs, tapers to the lowest effective dose that controls symptoms rather than to zero over a fixed period, with a conventional DMARD above 10 mg/day prednisone.",
      evidence: "LoE 4; level of agreement 9.4 out of 10.",
      sources: ["eular-2021"],
    },
  ],
  grades: [
    { claim: "Counsel about steroid toxicities, including Pneumocystis pneumonia", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Taper over at least 4 to 6 weeks", grade: "expert consensus", source: "asco-2021" },
    { claim: "Taper within 4 weeks after colitis improves to grade 1 or less", grade: "LE: 1", source: "sitc-2021", quote: "Corticosteroids should be tapered within 4 weeks after improvement of diarrhea or colitis symptoms to grade ≤1" },
    { claim: "Co-trimoxazole 2 to 3 times weekly as the drug of choice for Pneumocystis prophylaxis in adults", grade: "A-II", source: "ecil-2016", quote: "Trimethoprim/sulfamethoxazole given 2-3 times weekly is the drug of choice for the primary prophylaxis of PCP in adults" },
    { claim: "More than 4 weeks of corticosteroids as a main indication for prophylaxis", grade: "not graded in the abstract", source: "ecil-2016", quote: "The main indications of PCP prophylaxis are ALL, allogeneic HSCT, treatment with alemtuzumab, fludarabine/cyclophosphamide/rituximab combinations, >4 weeks of treatment with corticosteroids and well-defined primary immune deficiencies in children." },
  ],
  sources: [
    SITC_ICI_2021,
    ASCO_ICI_2021,
    {
      key: "asco-idsa-2018",
      label: "Antimicrobial Prophylaxis for Adult Patients With Cancer-Related Immunosuppression: ASCO and IDSA Clinical Practice Guideline Update",
      publisher: "ASCO and Infectious Diseases Society of America, Journal of Clinical Oncology",
      year: 2018,
      url: "https://europepmc.org/abstract/MED/30179565",
      doi: "10.1200/JCO.18.00374",
      gradingScheme: "Recommendations based on an expert panel's review of a systematic review; the abstract does not print grades.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "ecil-2016",
      label: "ECIL guidelines for preventing Pneumocystis jirovecii pneumonia in patients with haematological malignancies and stem cell transplant recipients",
      publisher: "European Conference on Infections in Leukaemia (ECIL-5), Journal of Antimicrobial Chemotherapy",
      year: 2016,
      url: "https://europepmc.org/abstract/MED/27550992",
      doi: "10.1093/jac/dkw157",
      gradingScheme: "IDSA grading: strength A to C and quality of evidence I to III (for example A-II).",
      read: "abstract",
      accessed: "2026-11-11",
    },
    ESE_2022,
    {
      key: "ese-es-2024",
      label: "European Society of Endocrinology and Endocrine Society Joint Clinical Guideline: Diagnosis and therapy of glucocorticoid-induced adrenal insufficiency",
      publisher: "European Society of Endocrinology and Endocrine Society, European Journal of Endocrinology",
      year: 2024,
      url: "https://europepmc.org/abstract/MED/38714321",
      doi: "10.1093/ejendo/lvae029",
      gradingScheme: "The abstract does not print grades.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "eular-2021",
      label: "EULAR points to consider for the diagnosis and management of rheumatic immune-related adverse events due to cancer immunotherapy with checkpoint inhibitors",
      publisher: "European Alliance of Associations for Rheumatology (EULAR), Annals of the Rheumatic Diseases",
      year: 2021,
      url: "https://europepmc.org/article/PMC/PMC7788064",
      doi: "10.1136/annrheumdis-2020-217139",
      gradingScheme: "Oxford Centre for Evidence-Based Medicine levels of evidence (2009), printed as LoE 1 to 5, with the task force's mean level of agreement (LoA) on a 0 to 10 scale.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    ASCO_GAP,
    "No source read sets a Pneumocystis prophylaxis rule written specifically for checkpoint inhibitor toxicity; the ASCO/IDSA threshold covers adults with cancer generally and ECIL-5 covers haematological patients. SITC 2021 names the risk but gives no threshold in the text read.",
    "The ASCO/IDSA 2018 update, ECIL-5 and the 2024 ESE/Endocrine Society guideline were read only as abstracts; their dosing, duration and stopping rules for prophylaxis and their taper schedules are not given here. Whether ASCO/IDSA has issued a newer edition was checked only through Europe PMC.",
    "Bone protection, gastric protection and glucose monitoring during long steroid courses are named as harms by SITC but no source read gives an irAE-specific recommendation on them.",
  ],
  drugs: ["prednisone", "methylprednisolone", "hydrocortisone", "pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-colitis", "irae-hepatitis", "irae-pneumonitis", "irae-hypophysitis-adrenal", "irae-rechallenge", "idea-bio2-steroid-sparing-irae"],
  tags: ["protocol", "irae", "infection-prevention"],
});

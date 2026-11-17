import { protocol } from "./helpers";
import { ASCO_GAP, ASCO_ICI_2021, ESE_2022, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Tapering steroids after an immune-related adverse event, and preventing Pneumocystis pneumonia and adrenal
 * insufficiency while on them.
 *
 * What was read, and how (first pass, 11 November 2026): SITC 2021 and ESE 2022 as full text, ASCO 2021 as its
 * abstract, and the ASCO/IDSA 2018, ECIL-5 2016 and 2024 ESE/Endocrine Society guidelines as abstracts.
 *
 * Second accuracy pass, 17 November 2026. Every claim was re-read against raw text and every quote checked by script
 * (whitespace joined, XML tags and citation cross-references stripped, nothing else changed):
 * - SITC 2021 full text and the ASCO 2021 abstract: the copies another checker fetched from Europe PMC on
 *   16 November 2026 were re-used.
 * - ESE 2022 full text: the Europe PMC copy another checker fetched on 17 November 2026 was re-used.
 * - 2024 ESE/Endocrine Society guideline: now read in full. The guideline was co-published in the European Journal of
 *   Endocrinology (10.1093/ejendo/lvae029) and the Journal of Clinical Endocrinology and Metabolism
 *   (10.1210/clinem/dgae250); the second is open access in PubMed Central (PMC11180513) and is the copy read, through
 *   the Europe PMC full-text XML. The first refused a script at academic.oup.com and at the Aarhus repository (403).
 * - EULAR 2021 full text: Europe PMC full-text XML (PMC7788064).
 * - ASCO/IDSA 2018 and ECIL-5 2016: abstracts only, from the Europe PMC REST API. ascopubs.org and academic.oup.com
 *   returned 403, and no repository copy of ECIL-5 could be opened (one 404, one 403, one bot check, two records
 *   without a file).
 * - ESMO 2022 was not tried again; a sibling checker found it still unreachable on 16 November 2026.
 * DOIs resolved through Crossref and Europe PMC and titles checked. No newer edition of any source was found in
 * Europe PMC.
 */
export const iraeSteroidTaperAndPjp = protocol({
  id: "irae-steroid-taper-and-pjp",
  name: "Steroid taper after immunotherapy side effects, with Pneumocystis prophylaxis and adrenal checks",
  aka: ["irAE steroid taper", "corticosteroid taper for immune-related adverse events", "PJP prophylaxis on steroids", "PCP prophylaxis immunotherapy", "co-trimoxazole prophylaxis on steroids", "steroid weaning after immunotherapy toxicity"],
  domain: "immunotherapy-toxicity",
  tldr: "Steroids for an immunotherapy side effect are reduced gradually, in general over at least 4 to 6 weeks, and the side effect can return as the dose comes down. A month or more at 20 mg of prednisone a day or above raises the risk of Pneumocystis pneumonia, so a preventive antibiotic (usually co-trimoxazole) may be offered. Your own steroid production may need checking before the last tablets stop.",
  simple: "Steroids are reduced slowly over several weeks. If you are on them for a month or more, you may be given an antibiotic to prevent a lung infection.",
  summary: "Systemic corticosteroids are commonly used as first-line treatment for irAEs and have harms of their own. SITC 2021 says patients starting them should be counselled about hyperglycaemia, mood disturbance, insomnia, gastritis, weight gain and opportunistic infection, including Pneumocystis pneumonia (LE: 1), and lists osteoporosis among the harms of long-term use. ASCO 2021 (abstract) gives a general rule: taper over at least 4 to 6 weeks. SITC tapers over 4 to 6 weeks for hepatitis (LE: 1), pneumonitis (LE: 3 for grade 3 or higher), myocarditis and sicca syndrome (LE: 1), but within 4 weeks for colitis (LE: 1). Before infliximab or vedolizumab for colitis, SITC says patients should be tested for hepatitis B, HIV and tuberculosis, without delaying the drug while results are pending.\n\nPneumocystis prophylaxis: ASCO/IDSA 2018 (abstract) recommends it for patients on chemotherapy regimens carrying more than a 3.5% risk of this pneumonia, and gives 20 mg prednisone equivalent or more daily for a month or longer as an example. ECIL-5 (abstract; people with blood cancers and stem cell transplant recipients) lists more than 4 weeks of corticosteroids among the main indications and makes trimethoprim/sulfamethoxazole, given 2 to 3 times weekly, the drug of choice in adults (A-II), with pentamidine, atovaquone and dapsone second-line. Neither was written for checkpoint inhibitor toxicity.\n\nAdrenal axis: ESE 2022 says doses equivalent to 7.5 mg prednisolone or more for more than 3 weeks can lead to secondary adrenal insufficiency, so at least a morning cortisol (with ACTH, and a Synacthen test if needed) should be considered when stopping is considered. The 2024 ESE/Endocrine Society guideline on glucocorticoid-induced adrenal insufficiency tapers faster in the supraphysiological range and more slowly near the physiological dose (for example 4 to 6 mg prednisone), suggests that courses shorter than 3 to 4 weeks need no taper for adrenal reasons, recommends against routine adrenal testing while the dose is still supraphysiological, and recommends a morning cortisol as the first test if recovery is to be confirmed.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "acute-oncology-service", "ward", "home"],
  },
  population: "Adults taking systemic corticosteroids for an immune-related adverse event of a checkpoint inhibitor. The ECIL-5 Pneumocystis guidance was written for people without HIV who have a haematological condition, including stem cell transplant recipients, and the ASCO/IDSA sentence used here is about adults with cancer on chemotherapy regimens; both are applied here by analogy. The 2024 ESE/Endocrine Society guideline covers anyone on long-term glucocorticoids for a non-endocrine condition. Hypophysitis and primary adrenal insufficiency, which need hormone replacement, are covered by their own protocol.",
  trigger: "Starting systemic corticosteroids for an immune-related adverse event, and each step of the taper.",
  steps: [
    {
      action: "When starting steroids, explain their side effects, including high blood sugar, mood change, insomnia, stomach irritation, weight gain and infections such as Pneumocystis pneumonia",
      why: "Steroids have harms of their own, and SITC says patients should be told about them at the start.",
      source: "sitc-2021",
      quote: "When beginning corticosteroid therapy, patients should be specifically counseled about potential toxicities, including hyperglycemia, mood disturbances, insomnia, gastritis, weight gain, and opportunistic infections (eg, Pneumocystis pneumonia)",
      grade: "LE: 1",
    },
    {
      action: "Taper the steroids over at least 4 to 6 weeks, unless the guidance for the organ involved says otherwise",
      why: "This is ASCO's general rule across organs, reached by expert consensus; its abstract gives no reason and no organ-by-organ schedule. SITC sets a shorter taper for colitis.",
      source: "asco-2021",
      quote: "Corticosteroids should be tapered over the course of at least 4-6 weeks.",
    },
    {
      action: "Consider Pneumocystis prophylaxis for anyone taking 20 mg prednisone equivalent or more a day for a month or longer",
      why: "ASCO and IDSA recommend prophylaxis for chemotherapy regimens that carry more than a 3.5% risk of this pneumonia, and give this steroid dose and duration as an example. It is applied to steroids for an irAE by analogy.",
      source: "asco-idsa-2018",
      quote: "Pneumocystis jirovecii prophylaxis is recommended for patients receiving chemotherapy regimens that are associated with a > 3.5% risk for pneumonia as a result of this organism (eg, those with ≥ 20 mg prednisone equivalents daily for ≥ 1 month or on the basis of purine analog usage).",
    },
    {
      action: "Use trimethoprim/sulfamethoxazole (co-trimoxazole) as first choice, and pentamidine, atovaquone or dapsone if it is poorly tolerated or contraindicated",
      why: "ECIL-5 makes co-trimoxazole, given 2 to 3 times weekly for the whole period at risk, the drug of choice in adults. Its advice was written for people with blood cancers.",
      source: "ecil-2016",
      quote: "All other drugs, including pentamidine, atovaquone and dapsone, are considered second-line alternatives when trimethoprim/sulfamethoxazole is poorly tolerated or contraindicated.",
    },
    {
      action: "Consider a second-line immunosuppressant if the side effect does not respond to the first course of steroids",
      why: "SITC says second-line treatment should be considered for these patients, and that clinicians should know the risks of those drugs before giving them.",
      source: "sitc-2021",
      quote: "However, in patients who do not respond to initial corticosteroid therapy, second-line immunosuppressive therapy should be considered.",
    },
    {
      action: "Before infliximab or vedolizumab, test for hepatitis B, HIV and tuberculosis, and do not hold the drug back while results are pending",
      why: "SITC notes that these drugs may be a problem in people with latent infections, and that infliximab carries a boxed warning about reactivation of latent tuberculosis. The recommendation sits in its colitis section.",
      source: "sitc-2021",
      quote: "Prior to administration of infliximab or vedolizumab, patients should be tested for HBV, HIV, and TB. Administration of infliximab or vedolizumab should not be delayed if test results are pending.",
    },
    {
      action: "Taper faster while the dose is above the body's own replacement level, and more slowly once it nears physiological doses (for example 4 to 6 mg prednisone)",
      why: "The guideline says the taper should be slower and in smaller steps as the dose nears what the body would make itself, and that there is no compelling evidence to guide the best schedule.",
      source: "ese-es-2024",
      quote: "In general, tapering of glucocorticoids can be more rapidly within a supraphysiological range, followed by a slower taper when on physiological glucocorticoid dosing.",
    },
    {
      action: "When stopping is considered after more than 3 weeks at 7.5 mg prednisolone equivalent or above, consider a morning cortisol (with ACTH, and a Synacthen test if needed)",
      why: "ESE says steroid courses of this dose and length can lead to secondary adrenal insufficiency. The sentence comes from its section on hypophysitis.",
      source: "ese-2022",
      quote: "Use of doses equivalent to 7.5 mg prednisolone or higher for more than 3 weeks can lead to secondary adrenal insufficiency. Thus, at least a medication fasting morning cortisol (plus ACTH) and if needed a 250 µg Synacthen® test should be considered if glucocorticoids are considered to be stopped.",
    },
    {
      action: "If recovery of the adrenal axis needs confirming at a physiological dose, use a morning serum cortisol first; as a guide, above 300 nmol/L indicates recovery and steroids can be stopped, and a lower result means continuing the physiological dose and repeating the test",
      why: "The guideline treats the morning cortisol as a continuum, with higher values pointing more strongly to recovery. The alternative it offers is to keep tapering gradually while watching for symptoms of adrenal insufficiency.",
      source: "ese-es-2024",
      quote: "If confirmation of recovery of the HPA axis is desired, we recommend morning serum cortisol as the first test.",
      grade: "⊕○○○",
    },
  ],
  bestInClass: {
    statement: "On the taper, ASCO 2021 (abstract) gives at least 4 to 6 weeks as a general rule on expert consensus. SITC 2021 uses 4 to 6 weeks for hepatitis (LE: 1), pneumonitis (LE: 3 for grade 3 or higher), myocarditis and sicca syndrome (LE: 1), but tapers colitis within 4 weeks (LE: 1). On Pneumocystis, the ASCO/IDSA 2018 abstract gives the only dose threshold read (20 mg prednisone equivalent or more daily for 1 month or more), as an example of a chemotherapy regimen above a 3.5% risk; ECIL-5 uses more than 4 weeks of corticosteroids in haematological patients and makes co-trimoxazole the drug of choice (graded A-II for adults in its abstract). SITC 2021 names Pneumocystis among the risks to counsel about but sets no prophylaxis threshold. On the adrenal axis, ESE 2022 says a morning cortisol should be considered when stopping after more than 3 weeks at 7.5 mg prednisolone or more, in the rationale to a good clinical practice recommendation about hypophysitis. The 2024 ESE/Endocrine Society guideline is the fuller source: taper only when the underlying disease is controlled (good clinical practice), slow down near the physiological dose, and test with a morning cortisol first (very low quality evidence). None of these is a trial in checkpoint inhibitor patients.",
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
      evidence: "IDSA grading; co-trimoxazole as drug of choice in adults graded A-II. The abstract prints no grade for the corticosteroid indication.",
      sources: ["ecil-2016"],
    },
    {
      name: "Lowest effective dose, tapered within weeks (EULAR 2021, rheumatic irAEs)",
      differs: "For rheumatic irAEs, tapers to the lowest effective dose that controls symptoms rather than to zero over a fixed period, with 10 mg a day of prednisone equivalent or less as an acceptable target; a conventional DMARD should be considered if more than 10 mg a day is needed.",
      evidence: "LoE 4; level of agreement 9.4 out of 10 for the taper, 9 out of 10 for the conventional DMARD.",
      sources: ["eular-2021"],
    },
    {
      name: "Morning cortisol alone, without routine dynamic testing (ESE/Endocrine Society 2024)",
      differs: "Suggests against routinely performing a dynamic (Synacthen) test in people tapering or stopping steroids, where ESE 2022 says a Synacthen test should be considered if needed. It also suggests that courses shorter than 3 to 4 weeks need no taper and no testing for adrenal reasons, whatever the dose.",
      evidence: "Both suggestions are weak recommendations on very low quality evidence (⊕○○○).",
      sources: ["ese-es-2024", "ese-2022"],
    },
  ],
  grades: [
    { claim: "Counsel about steroid toxicities, including Pneumocystis pneumonia", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Taper over at least 4 to 6 weeks", grade: "expert consensus", source: "asco-2021" },
    { claim: "Taper within 4 weeks after colitis improves to grade 1 or less", grade: "LE: 1", source: "sitc-2021", quote: "Corticosteroids should be tapered within 4 weeks after improvement of diarrhea or colitis symptoms to grade ≤1" },
    { claim: "Taper over 4 to 6 weeks after liver tests return to grade 1 or less", grade: "LE: 1", source: "sitc-2021", quote: "Corticosteroids should be tapered over a period of 4–6 weeks after LFTs revert to grade ≤1" },
    { claim: "Co-trimoxazole 2 to 3 times weekly as the drug of choice for Pneumocystis prophylaxis in adults", grade: "A-II", source: "ecil-2016", quote: "Trimethoprim/sulfamethoxazole given 2-3 times weekly is the drug of choice for the primary prophylaxis of PCP in adults" },
    { claim: "More than 4 weeks of corticosteroids as a main indication for prophylaxis", grade: "not graded in the abstract", source: "ecil-2016", quote: "The main indications of PCP prophylaxis are ALL, allogeneic HSCT, treatment with alemtuzumab, fludarabine/cyclophosphamide/rituximab combinations, >4 weeks of treatment with corticosteroids and well-defined primary immune deficiencies in children." },
    { claim: "Taper long-term steroids only when the underlying disease is controlled", grade: "Good clinical practice", source: "ese-es-2024", quote: "Glucocorticoid taper for patients on long-term glucocorticoid therapy should only be attempted if the underlying disease for which glucocorticoids were prescribed is controlled, and glucocorticoids are no longer required." },
    { claim: "No taper needed for adrenal reasons after less than 3 to 4 weeks of steroids", grade: "⊕○○○", source: "ese-es-2024", quote: "We suggest not to taper glucocorticoids in patients on short-term glucocorticoid therapy of <3-4 weeks, irrespective of the dose." },
    { claim: "No routine adrenal testing while the dose is supraphysiological", grade: "Good clinical practice", source: "ese-es-2024", quote: "We recommend against routine testing for adrenal insufficiency in patients on supraphysiologic doses of glucocorticoids, or if they are still in need of glucocorticoid treatment for the underlying disease." },
    { claim: "No routine dynamic test in people tapering or stopping steroids", grade: "⊕○○○", source: "ese-es-2024", quote: "We suggest against routinely performing a dynamic test for diagnosing adrenal insufficiency in patients tapering or stopping glucocorticoid therapy." },
  ],
  sources: [
    { ...SITC_ICI_2021, accessed: "2026-11-16" },
    { ...ASCO_ICI_2021, accessed: "2026-11-16" },
    {
      key: "asco-idsa-2018",
      label: "Antimicrobial Prophylaxis for Adult Patients With Cancer-Related Immunosuppression: ASCO and IDSA Clinical Practice Guideline Update",
      publisher: "ASCO and Infectious Diseases Society of America, Journal of Clinical Oncology",
      year: 2018,
      url: "https://europepmc.org/abstract/MED/30179565",
      doi: "10.1200/JCO.18.00374",
      gradingScheme: "Recommendations based on an expert panel's review of a systematic review; the abstract does not print grades.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "ecil-2016",
      label: "ECIL guidelines for preventing Pneumocystis jirovecii pneumonia in patients with haematological malignancies and stem cell transplant recipients",
      publisher: "European Conference on Infections in Leukaemia (ECIL-5), Journal of Antimicrobial Chemotherapy",
      year: 2016,
      url: "https://europepmc.org/abstract/MED/27550992",
      doi: "10.1093/jac/dkw157",
      gradingScheme: "IDSA grading: the abstract prints grades such as A-II and A-I and does not define them.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    { ...ESE_2022, accessed: "2026-11-17" },
    {
      key: "ese-es-2024",
      label: "European Society of Endocrinology and Endocrine Society Joint Clinical Guideline: Diagnosis and Therapy of Glucocorticoid-induced Adrenal Insufficiency",
      publisher: "European Society of Endocrinology and Endocrine Society, Journal of Clinical Endocrinology and Metabolism (co-published in the European Journal of Endocrinology, 10.1093/ejendo/lvae029)",
      year: 2024,
      url: "https://europepmc.org/article/PMC/PMC11180513",
      doi: "10.1210/clinem/dgae250",
      gradingScheme: "GRADE: quality of evidence printed as ⊕○○○ (very low), ⊕⊕○○ (low), ⊕⊕⊕○ (moderate) or ⊕⊕⊕⊕ (strong); 'recommend' is a strong and 'suggest' a weak recommendation; recommendations resting on the working group's experience are marked good clinical practice and are not formally graded.",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    ASCO_GAP,
    "No source read sets a Pneumocystis prophylaxis rule written specifically for checkpoint inhibitor toxicity. The ASCO/IDSA sentence is about chemotherapy regimens in adults with cancer and gives the steroid dose as an example; ECIL-5 covers haematological patients. SITC 2021 names the risk but gives no threshold.",
    "On 17 November 2026 the ASCO/IDSA 2018 update and ECIL-5 could again be read only as abstracts: the publishers refused a script and no open copy was found. Their doses for co-trimoxazole and for the second-line drugs, their stopping rules and the grade ASCO/IDSA gives its Pneumocystis recommendation are therefore not stated here. A search of Europe PMC on the same day found no newer edition of either.",
    "The 2024 ESE/Endocrine Society guideline was read on 17 November 2026 in its Journal of Clinical Endocrinology and Metabolism co-publication, which is open access; the European Journal of Endocrinology copy refused a script, so the two were not compared word for word beyond the abstract.",
    "The sources disagree on dynamic testing: ESE 2022 says a Synacthen test should be considered if needed, and the 2024 ESE/Endocrine Society guideline suggests against doing one routinely. Neither rests on studies in people treated for an irAE.",
    "SITC names bone loss, gastritis and high blood sugar among the harms of steroids and says clinicians should be aware of the need for monitoring or prophylaxis, but no source read gives a specific recommendation on bone protection, gastric protection or glucose monitoring during an irAE steroid course.",
    "SITC's advice to test for hepatitis B, HIV and tuberculosis before infliximab or vedolizumab is written in its colitis section and carries no level of evidence; no source read says which tests to use.",
  ],
  drugs: ["prednisone", "methylprednisolone", "hydrocortisone", "pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-colitis", "irae-hepatitis", "irae-pneumonitis", "irae-hypophysitis-adrenal", "irae-rechallenge", "idea-bio2-steroid-sparing-irae"],
  tags: ["protocol", "irae", "infection-prevention"],
});

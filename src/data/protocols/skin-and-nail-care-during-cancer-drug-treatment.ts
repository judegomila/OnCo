import { protocol } from "./helpers";

/*
 * Skin and nail care during chemotherapy and targeted therapy: dry skin, acne-like rash from EGFR inhibitors, nail fold
 * inflammation (paronychia), cracks, and hand-foot syndrome.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - MASCC Skin Toxicity Study Group, Clinical practice guidelines for the prevention and treatment of EGFR
 *   inhibitor-associated dermatologic toxicities (Support Care Cancer 2011): full text, Europe PMC XML (PMC3128700).
 *   Tables do not survive extraction cleanly, so steps quote the prose and grades are copied from the table rows.
 * - Comparing clinical practice guidelines on the prevention and management of chemotherapy-induced hand-foot syndrome
 *   (Support Care Cancer 2026): abstract.
 * - NCI, Chemotherapy and You (December 2023): full text; the skin and nail changes section.
 * - ESMO, Prevention and management of dermatological toxicities related to anticancer agents (Ann Oncol 2021): not
 *   reachable (the journal page returned a bot check and PubMed holds no abstract).
 * Every DOI was resolved through Crossref and Europe PMC.
 */
export const skinAndNailCareDuringCancerDrugTreatment = protocol({
  id: "skin-and-nail-care-during-cancer-drug-treatment",
  name: "Skin and nail care during chemotherapy and targeted therapy",
  aka: ["skin care on chemotherapy", "EGFR inhibitor rash care", "acneiform rash prevention", "paronychia prevention", "hand-foot syndrome skin care", "nail care during chemotherapy", "dry skin on targeted therapy"],
  domain: "supportive-care",
  tldr: "Many cancer drugs dry the skin; some cause an acne-like rash, sore nail folds or red, painful hands and feet. Gentle washing in lukewarm water, a thick fragrance-free moisturiser, gloves for housework and careful nail trimming help; with some targeted drugs the team prescribes preventive creams from day one. Tell the team early about a rash or sore nails, and urgently about a rash with wheezing.",
  simple: "Wash with lukewarm water and a mild soap, pat dry, and use a thick moisturiser without perfume. Avoid products with alcohol. Wear gloves for cleaning and comfortable shoes, and trim nails gently. Tell your team about any rash, sore nails or sore hands and feet, and get help at once if a rash comes with wheezing.",
  summary: "The MASCC EGFR inhibitor guideline (2011, the most recent MASCC guideline on this that could be read) is the only graded source read in full. For acne-like rash it recommends prevention from the start of treatment: hydrocortisone 1% with moisturiser and sunscreen, plus doxycycline 100 mg twice daily (or minocycline 100 mg daily) for the first 6 weeks, on randomised data (systemic tetracyclines level II, grade A; topical regimen level II, grade C). For dry skin it recommends tepid bathing with mild moisturising soap or bath oil, regular moisturising creams, and avoiding extreme temperatures and direct sun (level III, grade B); thick occlusive emollients in a tub, avoiding alcohol-containing lotions, retinoids and benzoyl peroxide. For fissures, protective footwear and avoiding friction (level III, grade B). For paronychia, dilute bleach soaks (level II, grade A), comfortable shoes, careful nail trimming and gloves for cleaning. For hand-foot syndrome, a 2026 comparison of six guidelines found five of six advise avoiding chemical and physical stress to the hands and feet and using alcohol-free moisturiser; only ESMO, BC Cancer and eviQ recommend oral celecoxib for capecitabine. NCI's patient booklet (2023) gives matching ungraded advice. The ESMO 2021 dermatological toxicity guideline could not be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor", "pharmacist"],
    where: ["home", "outpatient-clinic", "chemotherapy-day-unit"],
  },
  population: "Adults having chemotherapy or targeted therapy that affects the skin or nails, including EGFR inhibitors (cetuximab, panitumumab, erlotinib, gefitinib, afatinib) and fluoropyrimidines (capecitabine, fluorouracil) that cause hand-foot syndrome. Skin reactions to immunotherapy, radiotherapy skin care, and severe reactions (blistering, peeling, mouth or eye involvement) are outside this protocol and need the team.",
  trigger: "Starting a drug known to affect the skin or nails, or new dryness, rash, nail fold redness or soreness of the hands and feet.",
  steps: [
    {
      action: "Before an EGFR inhibitor starts, ask whether preventive skin treatment is planned: a mild steroid cream with moisturiser and sunscreen, and doxycycline or minocycline, for the first 6 weeks",
      why: "The acne-like rash appears in the first weeks in most people on these drugs, and starting treatment before it appears makes it milder.",
      source: "mascc-egfri-2011",
      quote: "Hydrocortisone 1% combined with moisturizer, sunscreen, and doxycycline 100 mg bid for the first 6 weeks is recommended based on randomized data.",
      grade: "Systemic (minocycline or doxycycline): II A; topical (hydrocortisone 1% with moisturiser and sunscreen): II C (MASCC Table 3)",
    },
    {
      action: "Wash in lukewarm rather than hot water, keep baths and showers short, use a mild moisturising soap or bath oil, and pat the skin dry",
      why: "Hot water and long soaks strip the skin's oils and make dryness and cracking worse.",
      source: "mascc-egfri-2011",
      quote: "Avoiding bathing in excess and using tepid water as opposed to hot water is recommended.",
      grade: "III B (MASCC Table 8, xerosis prevention)",
    },
    {
      action: "Moisturise regularly with a thick, fragrance-free cream from a tub or jar, applied while the skin is still damp",
      why: "Thick creams hold water in the skin better than thin lotions.",
      source: "mascc-egfri-2011",
      quote: "Moisturizers should be occlusive, emollient creams that are generally packaged in a jar or tub rather than a lotion that can be pumped or poured.",
      grade: "III B (MASCC Table 8, xerosis treatment)",
    },
    {
      action: "Avoid alcohol-based lotions, perfumes and aftershaves, and do not use acne products such as retinoids or benzoyl peroxide unless the team prescribes them",
      why: "Alcohol and acne treatments dry the skin further; the rash from these drugs is not ordinary acne.",
      source: "mascc-egfri-2011",
      quote: "Topical retinoids and benzoyl peroxide gels are not recommended due to their drying effect",
      grade: "III B (MASCC Table 8: alcohol-containing lotions, retinoids and benzoyl peroxide listed as not recommended)",
    },
    {
      action: "Protect the nails: wear gloves for washing up, cleaning and gardening, wear comfortable shoes, and trim nails without aggressive manicuring",
      why: "Pressure and small injuries around the nails trigger painful inflammation of the nail folds.",
      source: "mascc-egfri-2011",
      quote: "Wearing comfortable shoes, trimming nails but avoiding aggressive manicuring, and wearing gloves while cleaning (e.g., household, dishes) are recommended to minimize periungual trauma.",
      grade: "Expert opinion (MASCC: no randomised trials of paronychia treatment)",
    },
    {
      action: "Protect hands and feet from friction, pressure and heat, with well-fitting shoes or covered fingertips, and moisturise them with an alcohol-free cream",
      why: "Friction and heat worsen hand-foot syndrome and the deep cracks that some drugs cause in fingertips and heels.",
      source: "hfs-guidelines-2026",
      quote: "Regarding prevention, five of six guidelines (83%) advised avoiding chemical and physical stressors to the hands and feet and using alcohol-free moisturizer.",
      grade: "Consensus across five of six guidelines (comparison study; recommendation grades not given in the abstract)",
    },
    {
      action: "Tell the team if cuticles become red and painful, or if hands and feet become red, sore or blistered",
      why: "Nail fold infection needs checking, and hand-foot syndrome of grade 2 or worse usually means pausing the drug until it settles.",
      source: "nci-chemo-and-you",
      quote: "Let your doctor or nurse know if your cuticles are red and painful.",
      grade: "Not graded (patient booklet)",
    },
    {
      action: "Get urgent help if a rash, hives or sudden severe itching comes with wheezing or difficulty breathing, or if there is burning or pain at the drip site during treatment",
      why: "These can be signs of an allergic reaction or of the drug leaking out of the vein, which need treating straight away.",
      source: "nci-chemo-and-you",
      quote: "Tell your doctor or nurse right away if you wheeze or have trouble breathing along with:",
      grade: "Not graded (patient booklet)",
    },
  ],
  bestInClass: {
    statement: "For EGFR inhibitors, preventive treatment from the first day (hydrocortisone 1% with moisturiser and sunscreen, plus a tetracycline for 6 weeks) is the best-supported step, on randomised data (MASCC 2011: systemic II A, topical II C). General skin and nail care (tepid bathing, thick fragrance-free emollients, no alcohol-based products, gloves, comfortable shoes, careful nail trimming) rests on level III evidence and expert opinion, and the guidelines agree on it. For hand-foot syndrome the guidelines agree on avoiding friction and heat and using alcohol-free moisturiser, and on pausing the drug at grade 2 or 3 (all but ONS), but disagree on drugs: only ESMO, BC Cancer and eviQ recommend oral celecoxib to prevent capecitabine hand-foot syndrome. The ESMO 2021 guideline, which is the most recent comprehensive one, could not be read, so its grades are not reproduced here.",
    sources: ["mascc-egfri-2011", "hfs-guidelines-2026", "nci-chemo-and-you"],
  },
  variants: [
    {
      name: "Oral celecoxib to prevent capecitabine hand-foot syndrome",
      differs: "Adds a prescribed anti-inflammatory tablet to prevent hand-foot syndrome on capecitabine.",
      evidence: "Recommended by ESMO, BC Cancer and eviQ but not by ONS, UKONS or the UK North Cancer Alliance, according to the 2026 comparison of six guidelines.",
      sources: ["hfs-guidelines-2026"],
    },
    {
      name: "Cooling the hands and feet",
      differs: "Cools the hands and feet during infusion to prevent hand-foot syndrome.",
      evidence: "ESMO and ONS recommend cooling for taxanes; BC Cancer and eviQ for all agents (2026 comparison abstract).",
      sources: ["hfs-guidelines-2026"],
    },
    {
      name: "Dilute bleach soaks for nail fold inflammation",
      differs: "Soaks fingers or toes in very dilute bleach (about 0.005%) to prevent infection of inflamed nail folds.",
      evidence: "MASCC 2011 Table 10: level II, grade A for prevention of paronychia, from a non-EGFR, non-cancer study.",
      sources: ["mascc-egfri-2011"],
    },
    {
      name: "Cornstarch and colloidal oatmeal baths (NCI)",
      differs: "For itchy, dry or peeling skin, sprinkle cornstarch and take a colloidal oatmeal bath when the whole body itches.",
      evidence: "Patient booklet advice, not graded; MASCC lists colloidal oatmeal among occlusive emollients for dry skin (level III, grade B).",
      sources: ["nci-chemo-and-you", "mascc-egfri-2011"],
    },
  ],
  grades: [
    { claim: "Preventive tetracycline (minocycline or doxycycline) for EGFR inhibitor rash", grade: "Level II, grade A (MASCC Table 3)", source: "mascc-egfri-2011" },
    { claim: "Preventive hydrocortisone 1% with moisturiser and sunscreen for EGFR inhibitor rash", grade: "Level II, grade C (MASCC Table 3)", source: "mascc-egfri-2011" },
    { claim: "Tepid bathing and regular moisturiser to prevent dry skin; avoid extreme temperatures and direct sun", grade: "Level III, grade B (MASCC Table 8)", source: "mascc-egfri-2011" },
    { claim: "Protective footwear and avoiding friction to prevent fissures", grade: "Level III, grade B (MASCC Table 9)", source: "mascc-egfri-2011", quote: "Wearing protective footwear or covering the fingertips to avoid friction can prevent skin fissures and aid healing." },
    { claim: "No randomised trials of paronychia treatment; recommendations are expert opinion", grade: "As stated by MASCC", source: "mascc-egfri-2011", quote: "Similarly, there have been no randomized controlled studies evaluating therapies for paronychia." },
    { claim: "No randomised trials of prevention or treatment of EGFR inhibitor dry skin", grade: "As stated by MASCC", source: "mascc-egfri-2011", quote: "To date, there are no existing randomized clinical trials assessing the prevention or treatment of EGFRI-induced xerosis." },
    { claim: "Pause the drug for grade 2 or 3 hand-foot syndrome and continue when it improves", grade: "Agreed by five of six guidelines (all except ONS), per the 2026 comparison", source: "hfs-guidelines-2026", quote: "All guidelines except ONS recommended dose suspension with grade 2 or 3 HFS and continuation when resolved or improved." },
  ],
  sources: [
    {
      key: "mascc-egfri-2011",
      label: "Clinical practice guidelines for the prevention and treatment of EGFR inhibitor-associated dermatologic toxicities",
      publisher: "MASCC Skin Toxicity Study Group (Supportive Care in Cancer)",
      year: 2011,
      url: "https://doi.org/10.1007/s00520-011-1197-6",
      doi: "10.1007/s00520-011-1197-6",
      gradingScheme: "Levels of evidence I to V (I meta-analyses or high-powered randomised trials, V case reports) and grades A to D (A level I or consistent findings, D little or no evidence).",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "hfs-guidelines-2026",
      label: "Comparing clinical practice guidelines on the prevention and management of chemotherapy-induced hand-foot syndrome",
      publisher: "Supportive Care in Cancer",
      year: 2026,
      url: "https://doi.org/10.1007/s00520-026-10809-5",
      doi: "10.1007/s00520-026-10809-5",
      gradingScheme: "A comparison of six guidelines appraised with AGREE II; it reports which guidelines make each recommendation, not grades.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "nci-chemo-and-you",
      label: "Chemotherapy and You: Support for People with Cancer",
      publisher: "National Cancer Institute (US)",
      year: 2023,
      url: "https://www.cancer.gov/publications/patient-education/chemotherapy-and-you.pdf",
      gradingScheme: "Patient booklet; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "esmo-derm-2021",
      label: "Prevention and management of dermatological toxicities related to anticancer agents: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology)",
      year: 2021,
      url: "https://doi.org/10.1016/j.annonc.2020.11.005",
      doi: "10.1016/j.annonc.2020.11.005",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["cetuximab", "panitumumab", "erlotinib", "gefitinib", "afatinib", "capecitabine", "fluorouracil", "doxycycline", "minocycline"],
  terms: ["hand-foot-syndrome", "rash-skin-toxicity"],
  related: ["sun-protection-during-and-after-cancer-treatment"],
  gaps: [
    "The ESMO 2021 dermatological toxicity guideline, the most recent comprehensive guideline, could not be read (bot check on the journal page, no abstract in PubMed); its grades are not reproduced.",
    "The MASCC EGFR inhibitor guideline read here dates from 2011 and describes itself as first-generation recommendations; newer targeted drugs are not covered by it.",
    "Most general skin and nail care steps rest on level III evidence or expert opinion; there are no randomised trials for dry skin or paronychia on EGFR inhibitors (MASCC).",
    "The 2026 hand-foot syndrome comparison was read as an abstract; the six guidelines it compares were not read directly.",
    "Afatinib is listed because it is an EGFR inhibitor; the MASCC 2011 guideline predates it and names cetuximab, panitumumab, erlotinib and gefitinib.",
  ],
});

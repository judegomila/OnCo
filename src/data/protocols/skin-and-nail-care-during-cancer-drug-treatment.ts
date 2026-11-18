import { protocol } from "./helpers";

/*
 * Skin and nail care during chemotherapy and targeted therapy: dry skin, acne-like rash from EGFR inhibitors, nail fold
 * inflammation (paronychia), cracks, and hand-foot syndrome.
 *
 * First written 11 November 2026. Second accuracy pass on 17 November 2026: every source was re-read as raw text
 * and every quote was checked by script against it (whitespace and line-break hyphenation normalised, nothing else).
 * - MASCC Skin Toxicity Study Group, Clinical practice guidelines for the prevention and treatment of EGFR
 *   inhibitor-associated dermatologic toxicities (Support Care Cancer 2011): full text, Europe PMC XML (PMC3128700),
 *   in a copy another checker of this pass fetched the same day. Tables survive only as a run of cells, so steps
 *   quote the prose and grades are copied from the table rows.
 * - Comparing clinical practice guidelines on the prevention and management of chemotherapy-induced hand-foot syndrome
 *   (Support Care Cancer 2026): abstract from Europe PMC (copy fetched the same day by another checker); the full
 *   text needs a subscription.
 * - NCI, Chemotherapy and You: full text of the PDF (pdftotext), the skin and nail changes section. The back cover
 *   prints "NIH Publication No. 24-7157, January 2024", so the year is 2024, not 2023.
 * - NCI, Skin and Nail Changes during Cancer Treatment (web page, reviewed 29 December 2022): added in this pass as
 *   the source for what to tell the team; fetched with curl and read as text.
 * - Management of EGFR inhibitor-related acneiform rash, Europe/USA Delphi position paper (J Eur Acad Dermatol
 *   Venereol 2025): added in this pass as a newer consensus; full text, Europe PMC XML (PMC11934016), copy fetched
 *   the same day by another checker.
 * - ESMO, Prevention and management of dermatological toxicities related to anticancer agents (Ann Oncol 2021):
 *   still not readable (other checkers found on 17 November 2026 that the journal page answers a script with a
 *   browser check and Europe PMC holds no abstract; not requested again).
 * Every DOI was resolved through Crossref or Europe PMC and the title checked.
 */
export const skinAndNailCareDuringCancerDrugTreatment = protocol({
  id: "skin-and-nail-care-during-cancer-drug-treatment",
  name: "Skin and nail care during chemotherapy and targeted therapy",
  aka: ["skin care on chemotherapy", "EGFR inhibitor rash care", "acneiform rash prevention", "paronychia prevention", "hand-foot syndrome skin care", "nail care during chemotherapy", "dry skin on targeted therapy"],
  domain: "supportive-care",
  tldr: "Some cancer drugs dry the skin; some cause an acne-like rash, sore nail folds or sore hands and feet. Guidance advises lukewarm water, mild soap, a thick fragrance-free moisturiser, gloves for housework and careful nail trimming. With EGFR-blocking drugs a preventive cream and antibiotic may be prescribed from the start. Tell the team about skin changes, and right away about a rash with wheezing.",
  simple: "Wash with lukewarm water and a mild soap, pat dry, and use a thick moisturiser without perfume. Avoid products with alcohol. Wear gloves for cleaning and comfortable shoes, and trim nails gently. Tell your team about any skin or nail changes, and tell them right away if a rash comes with wheezing or trouble breathing.",
  summary: "The MASCC EGFR inhibitor guideline (2011; no later MASCC edition was found) is the only graded guideline read in full. For acne-like rash it recommends preventive treatment unless there are contraindications, because the rash is frequent and appears within the first 2 to 4 weeks: hydrocortisone 1% with moisturiser and sunscreen twice daily, plus doxycycline 100 mg twice daily for the first 6 weeks, on randomised data. Its table also lists minocycline 100 mg daily, which one study found effective over the first 8 weeks (minocycline or doxycycline level II, grade A; the topical regimen level II, grade C). A 2025 European and US expert consensus agrees on prevention but favours a medium-potency steroid cream twice daily, doxycycline at 100 or 200 mg a day for at least 6 weeks, and sunscreen of SPF 30 or higher. For dry skin MASCC recommends tepid bathing with mild moisturising soap or bath oil, regular moisturising creams, and avoiding extreme temperatures and direct sun (level III, grade B); thick occlusive emollients from a jar or tub, and no alcohol-containing lotions, retinoids or benzoyl peroxide. For fissures, protective footwear and avoiding friction (level III, grade B). For paronychia, dilute bleach soaks to prevent it (level II, grade A, from a study outside cancer), with comfortable shoes, careful nail trimming and gloves for cleaning on expert opinion. For hand-foot syndrome, a 2026 comparison of six guidelines found five advise avoiding chemical and physical stress to the hands and feet and using alcohol-free moisturiser; only ESMO, BC Cancer and eviQ recommend oral celecoxib for capecitabine. NCI's patient booklet (2024) and web page (reviewed 2022) give ungraded advice on washing, moisturising, gloves and what to tell the team. The ESMO 2021 dermatological toxicity guideline could not be read.",
  asOf: "2026-11-17",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor", "pharmacist"],
    where: ["home", "outpatient-clinic", "chemotherapy-day-unit"],
  },
  population: "People having chemotherapy or targeted therapy that affects the skin or nails, including EGFR inhibitors (cetuximab, panitumumab, erlotinib, gefitinib, afatinib) and the fluoropyrimidines capecitabine and fluorouracil, which cause hand-foot syndrome. The graded recommendations are MASCC's for EGFR inhibitors; the sources read do not state an age range. Skin reactions to immunotherapy, radiotherapy skin care, and severe reactions (blistering, peeling, mouth or eye involvement) are outside this protocol and need the team.",
  trigger: "Starting a drug known to affect the skin or nails, or new dryness, rash, nail fold redness or soreness of the hands and feet.",
  steps: [
    {
      action: "Before an EGFR inhibitor starts, ask whether preventive skin treatment is planned: hydrocortisone 1% cream with moisturiser and sunscreen twice daily, with doxycycline 100 mg twice daily for the first 6 weeks (or minocycline 100 mg daily)",
      why: "MASCC recommends prevention, unless there are contraindications, because the rash is frequent and consistently appears within the first 2 to 4 weeks. Its table lists minocycline 100 mg daily as the other option, which one study found effective over the first 8 weeks, and lists tetracycline itself as not recommended.",
      source: "mascc-egfri-2011",
      quote: "Hydrocortisone 1% combined with moisturizer, sunscreen, and doxycycline 100 mg bid for the first 6 weeks is recommended based on randomized data.",
      grade: "The sentence carries no grade; MASCC Table 3 gives minocycline or doxycycline level II, grade A and hydrocortisone 1% with moisturiser and sunscreen level II, grade C",
    },
    {
      action: "Wash in lukewarm rather than hot water, do not bathe to excess, use a mild moisturising soap or bath oil without fragrance, and pat the skin dry",
      why: "MASCC's advice on preventing dry skin starts with how to bathe; it notes that no randomised trial has tested it. NCI's booklet adds quick showers or sponge baths instead of long, hot baths, and patting dry instead of rubbing.",
      source: "mascc-egfri-2011",
      quote: "Avoiding bathing in excess and using tepid water as opposed to hot water is recommended.",
      grade: "III B (MASCC Table 8, xerosis prevention)",
    },
    {
      action: "Moisturise regularly with a thick, fragrance-free cream from a tub or jar, put on while the skin is still damp after washing",
      why: "MASCC explains that EGFR inhibitors leave the outer layer of the skin unable to hold moisture. It cautions against greasy creams on the face and chest because blocked hair follicles can become inflamed. Putting cream on damp skin is NCI's advice.",
      source: "mascc-egfri-2011",
      quote: "Moisturizers should be occlusive, emollient creams that are generally packaged in a jar or tub rather than a lotion that can be pumped or poured.",
      grade: "III B (MASCC Table 8, xerosis treatment)",
    },
    {
      action: "Avoid alcohol-containing lotions, and perfume, cologne or aftershave that contains alcohol; do not use retinoid or benzoyl peroxide acne products unless the team prescribes them",
      why: "MASCC says alcohol-containing products may dehydrate the skin and that topical retinoids and benzoyl peroxide gels dry it. For an acne-type rash NCI advises asking the doctor or nurse whether medicated creams or soaps can be used, and which.",
      source: "mascc-egfri-2011",
      quote: "Topical retinoids and benzoyl peroxide gels are not recommended due to their drying effect",
      grade: "III B (MASCC Table 8: alcohol-containing lotions, retinoids and benzoyl peroxide listed as not recommended)",
    },
    {
      action: "Protect the nails: wear gloves for washing up, cleaning and gardening, wear comfortable shoes, and trim nails without aggressive manicuring",
      why: "MASCC says injury around the nail is thought to aggravate nail fold inflammation, though not to cause it, so the aim is to keep such injury to a minimum. Gardening is in NCI's list.",
      source: "mascc-egfri-2011",
      quote: "Wearing comfortable shoes, trimming nails but avoiding aggressive manicuring, and wearing gloves while cleaning (e.g., household, dishes) are recommended to minimize periungual trauma.",
      grade: "Expert opinion and anecdotal reports (MASCC: no randomised trials of paronychia treatment)",
    },
    {
      action: "Protect hands and feet from friction, with protective footwear or covered fingertips, and use an alcohol-free moisturiser on them",
      why: "Five of six hand-foot syndrome guidelines advise avoiding chemical and physical stress to the hands and feet. For the skin cracks EGFR inhibitors cause, MASCC says protective footwear or covering the fingertips to avoid friction can prevent fissures and help them heal (level III, grade B).",
      source: "hfs-guidelines-2026",
      quote: "Regarding prevention, five of six guidelines (83%) advised avoiding chemical and physical stressors to the hands and feet and using alcohol-free moisturizer.",
      grade: "Five of six guidelines (comparison study; the abstract gives no recommendation grades)",
    },
    {
      action: "Tell the team about any skin or nail change, such as a rash, blisters, burning or painful skin, hand-foot syndrome, or red and painful cuticles",
      why: "NCI lists these among the problems to note and call the team about, and its booklet says to report red and painful cuticles. It also says to talk with the doctor before stopping a targeted therapy because of a rash. Five of six guidelines pause the drug for grade 2 or 3 hand-foot syndrome (2026 comparison).",
      source: "nci-skin-nail-page",
      quote: "Let your health care team know if you notice any skin changes so they can be treated promptly.",
      grade: "Not graded (patient information page)",
    },
    {
      action: "Tell the doctor or nurse right away if sudden and severe itching, a rash or hives comes with wheezing or trouble breathing, or if there is burning or pain while intravenous chemotherapy is being given",
      why: "NCI says these can mean an allergy to the chemotherapy or chemotherapy leaking from the drip, and that major skin changes need to be treated right away because they can cause lifelong damage.",
      source: "nci-chemo-and-you",
      quote: "Tell your doctor or nurse right away if you wheeze or have trouble breathing along with:",
      grade: "Not graded (patient booklet)",
    },
  ],
  bestInClass: {
    statement: "For EGFR inhibitors, preventive treatment from the start (hydrocortisone 1% with moisturiser and sunscreen twice daily, plus doxycycline for the first 6 weeks or minocycline) is the best-supported step, on randomised data (MASCC 2011: minocycline or doxycycline level II, grade A; the topical regimen level II, grade C). A 2025 European and US expert consensus also backs prevention for everyone due to start one, but favours a medium-potency steroid cream and did not reach consensus on hydrocortisone 1%. General skin and nail care (tepid bathing, thick fragrance-free emollients, no alcohol-containing products, gloves, comfortable shoes, careful nail trimming) rests on level III evidence and expert opinion in MASCC, and NCI's patient advice matches it. For hand-foot syndrome five of six guidelines advise avoiding chemical and physical stress to the hands and feet and using alcohol-free moisturiser, and all but ONS pause the drug at grade 2 or 3; they differ on medicines: only ESMO, BC Cancer and eviQ recommend oral celecoxib to prevent capecitabine hand-foot syndrome. The ESMO 2021 guideline, the most recent from ESMO, could not be read, so its grades are not reproduced here.",
    sources: ["mascc-egfri-2011", "egfri-rash-consensus-2025", "hfs-guidelines-2026", "nci-chemo-and-you", "nci-skin-nail-page"],
  },
  variants: [
    {
      name: "The 2025 European and US consensus on EGFR inhibitor rash: a stronger cream, a dose range and a named SPF",
      differs: "A medium-potency steroid cream twice daily in place of hydrocortisone 1%; doxycycline at 100 or 200 mg a day (the panel could not agree on one dose), with oral antibiotics for at least 6 weeks; a daily emollient; sunscreen of SPF 30 or higher; and avoiding irritating products such as those containing salicylic acid or retinoids. MASCC 2011 names no SPF; NCI's booklet says SPF 15 or higher.",
      evidence: "A Delphi survey of experts, where consensus means 75 per cent or more agreeing; this is expert agreement and not an evidence grade. 75.0 per cent backed the medium-potency cream, 93.54 per cent the sunscreen advice and 76.25 per cent offering prevention to everyone due to receive an EGFR inhibitor. A mild-potency cream such as hydrocortisone 1% once daily did not reach consensus (25 per cent agreed). MASCC 2011 gives hydrocortisone 1% with moisturiser and sunscreen level II, grade C.",
      sources: ["egfri-rash-consensus-2025", "mascc-egfri-2011", "nci-chemo-and-you"],
    },
    {
      name: "Oral celecoxib to prevent capecitabine hand-foot syndrome",
      differs: "Adds a prescribed anti-inflammatory tablet to prevent hand-foot syndrome on capecitabine.",
      evidence: "Recommended by ESMO, BC Cancer and eviQ only, according to the 2026 comparison of six guidelines (the other three are ONS, UKONS and the UK North Cancer Alliance).",
      sources: ["hfs-guidelines-2026"],
    },
    {
      name: "Cooling the hands and feet",
      differs: "Uses cooling procedures to prevent hand-foot syndrome.",
      evidence: "ESMO and ONS recommend cooling to prevent hand-foot syndrome from taxanes; BC Cancer and eviQ recommend it for all agents (2026 comparison abstract, which does not describe the method or timing).",
      sources: ["hfs-guidelines-2026"],
    },
    {
      name: "Dilute bleach soaks for nail fold inflammation",
      differs: "Soaks fingers or toes in very dilute bleach (a final concentration of about 0.005%) to prevent infection of inflamed nail folds.",
      evidence: "MASCC 2011 Table 10: level II, grade A for prevention of paronychia, from a non-EGFR, non-cancer study.",
      sources: ["mascc-egfri-2011"],
    },
    {
      name: "Cornstarch and colloidal oatmeal baths (NCI)",
      differs: "For a rash or itchy, dry, red or peeling skin, sprinkle cornstarch, and take a colloidal oatmeal bath when the whole body itches.",
      evidence: "Patient booklet advice, not graded; MASCC lists colloidal oatmeal among occlusive emollients for dry skin (level III, grade B).",
      sources: ["nci-chemo-and-you", "mascc-egfri-2011"],
    },
  ],
  grades: [
    { claim: "Preventive minocycline or doxycycline for EGFR inhibitor rash (tetracycline itself is listed as not recommended)", grade: "Level II, grade A (MASCC Table 3)", source: "mascc-egfri-2011" },
    { claim: "Preventive hydrocortisone 1% with moisturiser and sunscreen twice daily for EGFR inhibitor rash", grade: "Level II, grade C (MASCC Table 3)", source: "mascc-egfri-2011" },
    { claim: "Minocycline 100 mg daily was studied over the first 8 weeks, not 6", grade: "Prose statement, no grade of its own (MASCC)", source: "mascc-egfri-2011", quote: "Another study revealed that prophylactic minocycline 100 mg daily is an effective agent in reducing the number of lesions during the first 8 weeks." },
    { claim: "Tepid bathing and regular moisturiser to prevent dry skin; avoid extreme temperatures and direct sun", grade: "Level III, grade B (MASCC Table 8)", source: "mascc-egfri-2011" },
    { claim: "Protective footwear and avoiding friction to prevent fissures", grade: "Level III, grade B (MASCC Table 9)", source: "mascc-egfri-2011", quote: "Wearing protective footwear or covering the fingertips to avoid friction can prevent skin fissures and aid healing." },
    { claim: "No randomised trials of paronychia treatment; recommendations are expert opinion and anecdotal reports", grade: "As stated by MASCC", source: "mascc-egfri-2011", quote: "Similarly, there have been no randomized controlled studies evaluating therapies for paronychia." },
    { claim: "No randomised trials of prevention or treatment of EGFR inhibitor dry skin", grade: "As stated by MASCC", source: "mascc-egfri-2011", quote: "To date, there are no existing randomized clinical trials assessing the prevention or treatment of EGFRI-induced xerosis." },
    { claim: "Pause the drug for grade 2 or 3 hand-foot syndrome and continue when it has resolved or improved", grade: "Recommended by five of six guidelines (all except ONS), per the 2026 comparison", source: "hfs-guidelines-2026", quote: "All guidelines except ONS recommended dose suspension with grade 2 or 3 HFS and continuation when resolved or improved." },
  ],
  sources: [
    {
      key: "mascc-egfri-2011",
      label: "Clinical practice guidelines for the prevention and treatment of EGFR inhibitor-associated dermatologic toxicities",
      publisher: "MASCC Skin Toxicity Study Group (Supportive Care in Cancer)",
      year: 2011,
      url: "https://doi.org/10.1007/s00520-011-1197-6",
      doi: "10.1007/s00520-011-1197-6",
      gradingScheme: "Levels of evidence I to V (I meta-analyses of randomised trials or high-powered randomised trials, II lower-powered randomised trials, III non-randomised trials, IV descriptive and case studies, V case reports) and grades A to D (A level I evidence or consistent findings from multiple studies, B generally consistent findings, C as B but with inconsistencies, D little or no evidence).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "egfri-rash-consensus-2025",
      label: "Management of human epidermal growth factor receptor inhibitors-related acneiform rash: a position paper based on the first Europe/USA Delphi consensus process",
      publisher: "European Academy of Dermatology and Venereology Task Force Dermatology for Cancer Patients (Journal of the European Academy of Dermatology and Venereology)",
      year: 2025,
      url: "https://europepmc.org/article/PMC/PMC11934016",
      doi: "10.1111/jdv.20391",
      gradingScheme: "Delphi survey: consensus is 75 per cent or more of respondents agreeing or disagreeing. Expert agreement, not a grade of evidence.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "hfs-guidelines-2026",
      label: "Comparing clinical practice guidelines on the prevention and management of chemotherapy-induced hand-foot syndrome",
      publisher: "Supportive Care in Cancer",
      year: 2026,
      url: "https://doi.org/10.1007/s00520-026-10809-5",
      doi: "10.1007/s00520-026-10809-5",
      gradingScheme: "A comparison of six guidelines appraised with AGREE II; the abstract reports which guidelines make each recommendation, not grades.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "nci-chemo-and-you",
      label: "Chemotherapy and You: Support for People with Cancer",
      publisher: "National Cancer Institute (US)",
      year: 2024,
      url: "https://www.cancer.gov/publications/patient-education/chemotherapy-and-you.pdf",
      gradingScheme: "Patient booklet; recommendations are not graded. Printed as NIH Publication No. 24-7157, January 2024.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nci-skin-nail-page",
      label: "Skin and Nail Changes during Cancer Treatment",
      publisher: "National Cancer Institute (US)",
      year: 2022,
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects/skin-nail-changes",
      gradingScheme: "Patient information page, reviewed 29 December 2022; advice is not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "esmo-derm-2021",
      label: "Prevention and management of dermatological toxicities related to anticancer agents: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology)",
      year: 2021,
      url: "https://doi.org/10.1016/j.annonc.2020.11.005",
      doi: "10.1016/j.annonc.2020.11.005",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["cetuximab", "panitumumab", "erlotinib", "gefitinib", "afatinib", "capecitabine", "fluorouracil", "doxycycline", "minocycline"],
  terms: ["hand-foot-syndrome", "rash-skin-toxicity"],
  related: ["sun-protection-during-and-after-cancer-treatment"],
  gaps: [
    "The ESMO 2021 dermatological toxicity guideline, the most recent from ESMO, could not be read: on 17 November 2026 the journal page still answered a script with a browser check and Europe PMC held no abstract. Its grades are not reproduced, and what it says about hand-foot syndrome is given only as the 2026 comparison reports it.",
    "The MASCC EGFR inhibitor guideline read here dates from 2011 and describes itself as first-generation recommendations; newer targeted drugs are not covered by it. No later MASCC edition was found. A 2025 European and US expert consensus on the acne-like rash is newer and differs on the steroid cream and the doxycycline dose; it is shown as a variant.",
    "Most general skin and nail care steps rest on level III evidence or expert opinion; there are no randomised trials for dry skin or paronychia on EGFR inhibitors (MASCC).",
    "The 2026 hand-foot syndrome comparison was read as an abstract; the six guidelines it compares were not read directly. Advice to avoid heat and pressure on the hands and feet, which an earlier version of this page gave, is not in the abstract and was removed on 17 November 2026.",
    "Sunscreen strength differs by source: MASCC 2011 names no SPF, NCI's booklet says 15 or higher and the 2025 consensus says 30 or higher.",
    "The warning signs and how fast to report them come from US National Cancer Institute patient material, which says to tell the doctor or nurse right away. No source read gives a time limit in hours or says which service to ring, and local advice may differ.",
    "Afatinib is listed because it is an EGFR inhibitor; the MASCC 2011 guideline predates it and names cetuximab, panitumumab, erlotinib and gefitinib.",
  ],
});

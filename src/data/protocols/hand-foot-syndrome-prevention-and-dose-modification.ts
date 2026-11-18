import { protocol } from "./helpers";

/*
 * Hand-foot syndrome (palmar-plantar erythrodysesthesia) with capecitabine and pegylated liposomal doxorubicin, and
 * hand-foot skin reaction with multikinase inhibitors such as sorafenib and regorafenib: prevention, inspection, and
 * dose modification by grade. One record for both, because the sources treat them together and the care steps overlap;
 * where they differ (urea cream has its best evidence in sorafenib skin reaction, diclofenac in capecitabine), the step
 * says which drug it is for.
 *
 * Second accuracy pass, 17 November 2026. Every source was fetched again as raw text (curl, the DailyMed SPL web
 * service, the Europe PMC REST API, pdftotext for the EMA PDF) and every claim re-read against it; every quote was
 * checked verbatim by script.
 * - ESMO 2021 guideline on dermatological toxicities (Lacouture et al., Ann Oncol 2021): still not readable. Europe PMC
 *   holds no abstract and annalsofoncology.org answered 403 (a browser check) to the one request made. Europe PMC and
 *   Crossref show no newer edition.
 * - Japanese pharmacist-led oncodermatology review (Int J Clin Oncol 2025): full text XML from Europe PMC (PMC12644181).
 * - S-1 recommendations (ESMO Open 2023): full text XML from Europe PMC (PMC10163153).
 * - XELODA US prescribing information (DailyMed SPL version 32, text revised 10/2025) and the Xeloda EU product
 *   information (EMA PDF of February 2025, SmPC sections 4.2 and 4.4 and the package leaflet): both re-used from the
 *   copies the DPYD protocol's checker saved from DailyMed and ema.europa.eu on 17 November 2026. The EU text is a new
 *   source here: it prints the grade definitions and the patient leaflet's stop rule.
 * - DOXIL (SPL version 13, published June 2026), STIVARGA (version 36, revised 2/2026), NEXAVAR (version 40, published
 *   November 2024; Tables 1 and 3 read column by column in the XML), CABOMETYX (version 18, revised 10/2025), SUTENT
 *   (version 50), INLYTA (version 24) and LENVIMA (version 82, revised 09/2026): full text from DailyMed.
 * - Nexavar EU summary of product characteristics (EMA PDF dated 9 December 2024), sections 4.2 and 4.4.
 * - Trials and meta-analyses, as abstracts from Europe PMC: Ren 2015, Lee 2020, Hofheinz 2015, D-TORCH 2024, DICLO-HFS
 *   2026 and the 2022 and 2026 network meta-analyses.
 * - New sources: the D-TORCH trial protocol (Trials 2022, PMC9117836) and the J-DIRECT trial protocol (Int J Clin Oncol
 *   2025, PMC12296980), full text from Europe PMC; a 2026 comparison of six guidelines on hand-foot syndrome (Support
 *   Care Cancer), abstract only; and the CTCAE version 5.0 spreadsheet, re-used from the copy the colitis protocol's
 *   checker saved from the National Cancer Institute.
 * What changed: the capecitabine and liposomal doxorubicin rules now give every row of the label tables, including
 * when to stop for good; general skin care is worded as the review words it (heat, footwear and "every day" were in no
 * source read); "why" lines that no source supported were rewritten; pyridoxine is stated as the sources state it;
 * cooling and the EU capecitabine text were added as variants; two quotes that carried a heading or altered spacing
 * were replaced with the exact sentence.
 * The EMA product information for Cabometyx, Sutent, Inlyta and Lenvima was not read (the EMA site answered 429 on
 * 16 November 2026 and was not retried for those).
 */
export const handFootSyndromePreventionAndDoseModification = protocol({
  id: "hand-foot-syndrome-prevention-and-dose-modification",
  name: "Hand-foot syndrome and hand-foot skin reaction: prevention, skin care and dose changes",
  aka: ["hand-foot syndrome", "HFS", "palmar-plantar erythrodysesthesia", "PPE", "PPES", "hand-foot skin reaction", "HFSR", "capecitabine hand-foot syndrome", "urea cream for hand-foot", "topical diclofenac for hand-foot syndrome"],
  domain: "symptom-management",
  tldr: "Capecitabine, liposomal doxorubicin and tablets such as sorafenib and regorafenib can make the palms and soles red, sore, peeling or blistered. Avoid rubbing and long soaks and moisturise regularly; with sorafenib, 10 per cent urea cream from day one lowered the risk in a trial. On capecitabine, if your hands or feet become painful, swollen, red or tingling, stop the tablets and contact your team.",
  simple: "Some cancer medicines make hands and feet sore. Moisturise them and avoid rubbing. If they hurt, swell or blister, tell your team straight away. With capecitabine, stop the tablets too.",
  summary: "Hand-foot syndrome (HFS) from capecitabine and pegylated liposomal doxorubicin, and hand-foot skin reaction (HFSR) from multikinase inhibitors, are managed by prevention, inspection before every cycle, and dose modification by grade. CTCAE version 5.0 grades it 1 to 3: minimal skin changes without pain (grade 1); skin changes such as peeling, blisters, bleeding, fissures, swelling or thickening with pain, limiting instrumental activities of daily living (grade 2); severe changes with pain, limiting self-care (grade 3). The liposomal doxorubicin and sorafenib labels print their own grade descriptions. Labels set the dose rules. Capecitabine (US label) is withheld for grade 2 or 3 until grade 0 to 1 and restarted at 100, 75, then 50 per cent of the current dose at the first, second and third appearance of grade 2 (stopped permanently at the fourth), or at 75, then 50 per cent after grade 3 (stopped permanently at the third); missed doses are not replaced, and patients are told to stop the tablets themselves at grade 2. Liposomal doxorubicin is delayed for up to 2 weeks or until grade 0 to 1 for grade 2 or worse, reduced by 25 per cent after grade 3 or 4 (or after a lower grade in someone who has had grade 3 or 4 before), and stopped if there is no resolution after 2 weeks. Regorafenib is reduced to 120 mg at the first grade 2 HFSR and to 80 mg if it recurs, and interrupted for at least 7 days at grade 3.\n\nFor prevention, general measures (avoiding mechanical and chemical stress and too much water, gloves that fit, regular emollients) are universal advice without randomised proof. 10 per cent urea cream three times daily from day 1 of sorafenib lowered any-grade HFSR (56.0 against 73.6 per cent) and grade 2 or worse HFSR (20.7 against 29.2 per cent) in an open trial of 871 people; a blinded trial of urea cream (20 per cent, as the Japanese review reports it) found no significant difference in cumulative incidence, though fewer severe reactions at 2 weeks (13.8 against 23.9 per cent). With capecitabine, oral celecoxib reduces grade 2 or worse HFS in network meta-analyses but carries cardiovascular and gastrointestinal risk; topical diclofenac gel reduced grade 2 or 3 HFS from 15.0 per cent (placebo, n = 133) to 3.8 per cent (diclofenac, n = 131) in the D-TORCH trial and leads the 2026 network meta-analysis, but a 2026 real-world study found no benefit and a Japanese phase 3 trial is under way. Pyridoxine has not been shown to work: most randomised trials were negative. Label dose rules for the other multikinase inhibitors: the US sorafenib label has a table by grade and occurrence (continue with topical treatment at a first grade 2 in liver and kidney cancer, or reduce to 600 mg daily in thyroid cancer; interrupt to grade 0 to 1 and restart one dose level lower if it persists beyond 7 days, recurs or reaches grade 3; stop at the fourth grade 2 or third grade 3 occurrence), while the EU sorafenib text gives no table by grade; cabozantinib tablets are withheld for intolerable grade 2 or grade 3 until grade 1 and restarted at a reduced dose; the US sunitinib, axitinib and lenvatinib labels have only general adverse-reaction rules. The ESMO 2021 guideline could not be read; a 2026 comparison of six guidelines reports some of its positions.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "home"],
  },
  population: "Adults taking capecitabine (alone or in combination) or receiving pegylated liposomal doxorubicin, and adults taking multikinase inhibitors that cause hand-foot skin reaction (regorafenib, sorafenib, cabozantinib, lenvatinib, sunitinib and others). The urea cream trials were in hepatocellular carcinoma on sorafenib; the diclofenac trial in breast and gastrointestinal cancers on capecitabine. Dose rules differ by drug and come from each drug's own label.",
  trigger: "A drug that causes hand-foot syndrome or skin reaction is started, and before every cycle or at every review while it continues.",
  steps: [
    {
      action: "At the start of treatment, teach hand and foot care: avoid mechanical and chemical stress on the hands and feet (such as heavy exercise and injury), avoid too much exposure to water, wear gloves that fit and are not tight, and use a moisturiser regularly",
      why: "The skin reaction to multikinase inhibitors appears where the skin is under stress, so protecting those areas is the aim. The review recommends these measures because they are safe; no randomised trial has tested them on their own.",
      source: "jp-review-2025",
      quote: "Preventive measures (grade 0) include avoiding mechanical or chemical stress, limiting water exposure, wearing appropriately fitted gloves, regular use of emollients, and patient education.",
      grade: "expert review; no randomised trial of these measures alone",
    },
    {
      action: "Look at the palms and soles and ask about pain or difficulty with daily activities before every cycle",
      why: "The panel thought the reaction may be under-counted, and agreed that any pain or loss of function from it is a reason to act.",
      source: "s1-esmo-open-2023",
      quote: "As its incidence may be underestimated, the panel recommended that providers carry out visual inspections of the palms of the hands and soles of the feet in addition to taking history on HFS-related symptoms prior to each cycle.",
      grade: "international expert panel recommendation, ungraded",
    },
    {
      action: "With sorafenib, offer 10 per cent urea cream three times a day from the first day of treatment",
      why: "In a trial of 871 people it lowered the chance of a reaction (56.0 against 73.6 per cent) and delayed it (a median of 84 days against 34 before the first reaction). The trial was not blinded. The Japanese review notes that urea cream can irritate the skin.",
      source: "ren-2015",
      quote: "UBC prophylaxis in patients with advanced HCC starting sorafenib reduced HFSR rates, extended the time to first occurrence of HFSR, and improved patient quality of life compared with BSC.",
      grade: "randomised open-label trial, n = 871",
    },
    {
      action: "With capecitabine, consider topical diclofenac on the hands, explaining that the evidence is mixed",
      why: "Diclofenac blocks COX-2, an enzyme involved in the inflammation behind the reaction. In one randomised trial 3.8 per cent of 131 people using it had a grade 2 or 3 reaction, against 15.0 per cent of 133 using a placebo gel; a later study in routine care found no benefit. The trial's published protocol planned 1 per cent gel on the palm and back of each hand twice a day.",
      source: "d-torch-2024",
      quote: "Grade 2 or 3 HFS was observed in 3.8% of participants in the diclofenac group compared with 15.0% in the placebo group (absolute difference, 11.2%; 95% CI, 4.3 to 18.1; P = .003).",
      grade: "single-site randomised double-blind trial, n = 264",
    },
    {
      action: "Do not rely on pyridoxine (vitamin B6) to prevent hand-foot syndrome",
      why: "Most randomised trials found no benefit. The EU capecitabine text also advises against vitamin B6 when capecitabine is given with cisplatin, because of published reports that it may make cisplatin less effective.",
      source: "jp-review-2025",
      quote: "Most RCTs on pyridoxine showed negative results, and multiple systematic reviews and meta-analyses have shown insufficient efficacy",
      grade: "narrative review citing systematic reviews and meta-analyses; ungraded",
    },
    {
      action: "Capecitabine: tell the person to stop the tablets at once and contact the team if the reaction reaches grade 2 or worse (the EU text describes grade 2 as painful redness and swelling, or discomfort affecting daily activities)",
      why: "The US label tells patients to stop straight away and get in touch, and says treatment for the symptoms should be started. The EU patient leaflet sets a lower bar: stop and contact the doctor for pain, swelling, redness or tingling of the hands or feet.",
      source: "xeloda-label",
      quote: "Instruct patients experiencing grade 2 palmar-plantar erythrodysesthesia syndrome or greater to stop taking XELODA immediately and to contact their healthcare provider.",
      grade: "US prescribing information (patient counselling)",
    },
    {
      action: "Capecitabine (US label): withhold for grade 2 or 3 until grade 0 to 1, then restart at a percentage of the current dose. After grade 2: 100 per cent at the first appearance, 75 at the second, 50 at the third, and stop permanently at the fourth. After grade 3: 75 per cent at the first, 50 at the second, and stop permanently at the third. Do not replace missed doses",
      why: "The label sets a break and then a lower dose with each repeat. An expert panel notes that grade 2 or worse hand-foot syndrome returns in about a third of people whose capecitabine dose is reduced.",
      source: "xeloda-label",
      quote: "Withhold XELODA and then resume at same or reduced dose or permanently discontinue based on severity and occurrence",
      grade: "US prescribing information (section 5.8 and Table 1)",
    },
    {
      action: "Liposomal doxorubicin: for grade 2, delay the dose for up to 2 weeks or until grade 0 to 1; for grade 3 or 4, delay in the same way and then reduce the dose by 25 per cent; stop if the reaction has not resolved after 2 weeks; do not raise the dose again after a reduction",
      why: "The label says the reaction is generally seen after 2 or 3 cycles of treatment but may come earlier. Someone who has had a grade 3 or 4 reaction before also has the dose reduced by 25 per cent after a later grade 1 or 2 reaction.",
      source: "doxil-label",
      quote: "Delay DOXIL liposomal infusion for the first episode of Grade 2 or greater HFS",
      grade: "US prescribing information (section 5.3 and Table 1)",
    },
    {
      action: "Regorafenib: reduce to 120 mg at the first grade 2 skin reaction, however long it lasts, and to 80 mg if grade 2 returns at 120 mg; interrupt if grade 2 recurs or does not improve within 7 days despite the reduction, and for at least 7 days for grade 3; stop permanently if 80 mg is not tolerated",
      why: "The label says most cases appear in the first cycle of treatment. The dose comes down one 40 mg tablet at a time, and 80 mg a day is the lowest recommended dose.",
      source: "stivarga-label",
      quote: "Grade 2 hand-foot skin reaction (HFSR) [palmar-plantar erythrodysesthesia syndrome (PPES)] that is recurrent or does not improve within 7 days despite dose reduction; interrupt therapy for a minimum of 7 days for Grade 3 HFSR",
      grade: "US prescribing information (section 2.2)",
    },
    {
      action: "Sorafenib for liver or kidney cancer (US label): at a first grade 2 reaction, continue and treat the skin; if it has not improved within 7 days, or at a second or third occurrence, interrupt until grade 0 to 1 and restart one dose level lower (400 mg once daily, then 200 mg once daily or 400 mg every other day); at grade 3, interrupt and restart one level lower; stop at the fourth grade 2 or the third grade 3 occurrence",
      why: "A painful reaction is given a week of skin treatment first; a pause and a lower dose come only if that does not work or the reaction returns.",
      source: "nexavar-label",
      quote: "Continue NEXAVAR and consider topical therapy for symptomatic relief.",
      grade: "US prescribing information (Table 3, Grade 2, first occurrence, hepatocellular and renal cell carcinoma)",
    },
    {
      action: "Sorafenib for thyroid cancer (US label): reduce to 600 mg daily at the first grade 2 reaction; if it has not improved within 7 days, or at a second or third occurrence, interrupt until resolved or grade 1 and restart one dose level lower (two levels at a third occurrence); at grade 3, interrupt and restart one level lower (two at a second occurrence); stop at the fourth grade 2 or the third grade 3 occurrence. The dose levels are 600 mg daily (400 mg and 200 mg, 12 hours apart), then 200 mg twice daily, then 200 mg once daily",
      why: "The label sets a quicker first reduction for thyroid cancer than for liver or kidney cancer, so the rule depends on which cancer sorafenib is treating.",
      source: "nexavar-label",
      quote: "Decrease NEXAVAR to 600 mg daily. If no improvement within 7 days, see below.",
      grade: "US prescribing information (Table 3, Grade 2, first occurrence, differentiated thyroid carcinoma)",
    },
    {
      action: "Cabozantinib tablets: withhold for an intolerable grade 2 or a grade 3 reaction until it improves to grade 1, then restart at a reduced dose (from 60 mg daily to 40 mg, then 20 mg; from 40 mg with nivolumab to 20 mg daily, then 20 mg every other day); stop if the lowest dose is not tolerated",
      why: "The label's rule is a pause until the hands and feet have largely recovered, then a lower dose. It reports hand-foot reactions in 45 per cent of patients, grade 3 in 13 per cent.",
      source: "cabometyx-label",
      quote: "Withhold CABOMETYX until improvement to Grade 1 and resume CABOMETYX at a reduced dose for intolerable Grade 2 PPE or Grade 3 PPE",
      grade: "US prescribing information (section 5.7 and Tables 2 and 3)",
    },
    {
      action: "With any of these medicines, ask the person to tell the team promptly about redness, pain, swelling, blisters or bleeding on the palms or soles",
      why: "The labels' advice to patients is to report these changes without waiting for the next visit, so that the dose rules above can be applied early. The liposomal doxorubicin label adds tingling or burning, flaking and small sores.",
      source: "stivarga-label",
      quote: "Tell your healthcare provider right away if you get redness, pain, blisters, bleeding, or swelling on the palms of your hands or soles of your feet, or a severe rash.",
      grade: "US prescribing information (Medication Guide)",
    },
    {
      action: "For an established reaction, keep moisturising and use 10 per cent urea cream on thickened, scaling skin; from grade 2, add a strong topical steroid and step down to a medium-strength one once it settles to grade 0 or 1",
      why: "Steroid creams are used for the inflammation and pain, and urea to loosen hard skin. Western guidelines recommend them, though no trial has tested any treatment for an established reaction.",
      source: "jp-review-2025",
      quote: "Various guidelines recommend high potent topical steroid therapy for grade ≥ 2 HFS/HFSR [13, 14], and such is used in clinical practice, although no RCTs have been conducted.",
      grade: "guideline recommendation cited by the review; no randomised trials",
    },
    {
      action: "In metastatic colorectal cancer, if capecitabine or infusional fluorouracil hand-foot syndrome causes pain or limits function, switch to S-1 at full dose, preferably once the reaction has settled to grade 1 or less",
      why: "S-1 is a different fluoropyrimidine tablet. In a Dutch trial, hand-foot syndrome of any grade occurred in 45 per cent of people on S-1 against 73 per cent on capecitabine, and grade 3 in 4 against 21 per cent.",
      source: "s1-esmo-open-2023",
      quote: "In patients who experience pain and/or functional impairment due to HFS during treatment with capecitabine or infusional 5-FU, a switch to S-1 is recommended without prior dose reduction of capecitabine/5-FU.",
      grade: "international expert panel recommendation, ungraded",
    },
  ],
  bestInClass: {
    statement: "Dose modification by grade, from each drug's label, is the core of management, with inspection of hands and feet before every cycle and early self-stopping of capecitabine at grade 2. For prevention, the strongest single result is 10 per cent urea cream from day 1 of sorafenib (large open trial; a blinded trial of urea cream was not significant on cumulative incidence). For capecitabine, two network meta-analyses agree that oral celecoxib reduces moderate to severe HFS but its cardiovascular and gastrointestinal risks limit routine use; topical diclofenac had the strongest effect in the 2026 network meta-analysis and in one randomised trial, but a 2026 real-world study found no benefit and a confirmatory phase 3 trial (J-DIRECT) is under way, so it is reasonable to offer but not yet established. Urea cream beat an antioxidant ointment for capecitabine in one trial. Pyridoxine has not been shown to work. The ESMO 2021 dermatological toxicity guideline, which is the main international guideline, could not be read. A 2026 comparison of six guidelines (ESMO, BC Cancer, eviQ, the Oncology Nursing Society and two UK nursing guidelines) found them consistent on general skin care and on suspending the dose at grade 2 or 3, and varied on medicines: only ESMO, BC Cancer and eviQ recommended oral celecoxib, and its authors ask for updates that take in newer evidence such as topical diclofenac.",
    sources: ["xeloda-label", "doxil-label", "stivarga-label", "ren-2015", "lee-2020", "nma-2022", "nma-2026", "d-torch-2024", "diclo-hfs-2026", "mapisal-2015", "jp-review-2025", "guideline-comparison-2026", "esmo-derm-2021"],
  },
  variants: [
    {
      name: "Oral celecoxib with capecitabine",
      differs: "Celecoxib 200 mg twice daily alongside capecitabine to prevent HFS.",
      evidence: "The 2022 network meta-analysis (15 trials, 2715 patients) found only celecoxib significantly prevented grade 2 or worse HFS (odds ratio 0.29); the 2026 network meta-analysis also found a reduction (risk ratio 0.46). The Japanese review counts two positive Chinese trials and one negative UK trial, and advises limiting how long it is given because of cardiovascular and gastrointestinal risk. The 2026 guideline comparison reports that ESMO, BC Cancer and eviQ recommend it and three other guidelines do not.",
      sources: ["nma-2022", "nma-2026", "jp-review-2025", "guideline-comparison-2026"],
    },
    {
      name: "Topical diclofenac in routine care (DICLO-HFS, Turkey)",
      differs: "1 per cent topical diclofenac twice daily as prophylaxis with capecitabine in routine practice, compared with active monitoring, in two centres, in adults with colorectal or gastric cancer.",
      evidence: "Prospective observational study of 151 people: grade 2 or worse HFS in 12 of 71 (16.9 per cent) with diclofenac against 11 of 80 (13.8 per cent) with monitoring (not significant); the authors concluded the findings do not support routine diclofenac prophylaxis. Not randomised.",
      sources: ["diclo-hfs-2026"],
    },
    {
      name: "Urea cream rather than an antioxidant ointment with capecitabine",
      differs: "10 per cent urea cream as the preventive cream for capecitabine, compared with Mapisal, an antioxidant ointment.",
      evidence: "Randomised phase 3 trial of 152 evaluable people: any-grade HFS in 6 weeks 22.4 per cent with urea against 39.5 per cent with the ointment. There was no untreated control group.",
      sources: ["mapisal-2015"],
    },
    {
      name: "Cooling the hands and feet",
      differs: "Cooling during treatment to prevent hand-foot syndrome. The Japanese review says cooling may be considered, except in people receiving oxaliplatin, whose nerve symptoms it makes worse. The 2026 guideline comparison reports that ESMO and the Oncology Nursing Society recommend cooling to prevent hand-foot syndrome from taxanes, and that BC Cancer and eviQ recommend it for all agents.",
      evidence: "The review says cooling has been shown to work against hand-foot syndrome from pegylated liposomal doxorubicin but that no designed trials exist. The guidelines' own wording and grades were not read; their positions are known here only from the comparison's abstract.",
      sources: ["jp-review-2025", "guideline-comparison-2026"],
    },
    {
      name: "Capecitabine in the EU product information",
      differs: "The EU text interrupts capecitabine for grade 2 or 3 hand-foot syndrome until it resolves or falls to grade 1, with the same steps as the US label (100, 75, 50 per cent, then stop, for grade 2; 75, 50 per cent, then stop, for grade 3), but as a percentage of the starting dose, where the US table says percentage of the current dose. It prints its own grade definitions: grade 1 is numbness, tingling, painless swelling or redness, or discomfort that does not disrupt normal activities; grade 2 is painful redness and swelling, or discomfort affecting daily activities; grade 3 is moist peeling, ulceration, blistering and severe pain, or discomfort that stops work or daily activities. Its patient leaflet says to stop the tablets and contact the doctor for pain, swelling, redness or tingling of the hands or feet.",
      evidence: "Regulatory labelling, not graded. The EU text also says there is some evidence that dexpanthenol is effective for prophylaxis, and advises against vitamin B6 when capecitabine is given with cisplatin.",
      sources: ["xeloda-smpc", "xeloda-label"],
    },
    {
      name: "Asian practice (Japanese pharmacist-led review)",
      differs: "Topical steroids are not recommended for grade 1 HFS, and lidocaine patches and antiseptic solutions are not used for grade 3 or worse, unlike Western guidance; urea cream used with caution because of irritation.",
      evidence: "Narrative review of 53 articles by a Japanese pharmacist-led group; based on differences in skin type and lack of Asian safety data rather than trials.",
      sources: ["jp-review-2025"],
    },
    {
      name: "Sorafenib in the EU product information: no table by grade",
      differs: "The EU text gives no rule by grade and occurrence for skin reactions. It says: \"Management of dermatological toxicities may include topical therapies for symptomatic relief, temporary treatment interruption and/or dose modification of sorafenib, or in severe or persistent cases, permanent discontinuation of sorafenib\". Its reduced doses are 400 mg once daily for liver and kidney cancer, and 600 mg, then 400 mg, then 200 mg daily for thyroid cancer. The US label sets out the steps by grade and occurrence (see the two sorafenib steps).",
      evidence: "Regulatory labelling on each side, not graded. The US label adds that after at least 28 days at grade 0 or 1 on a reduced dose, the dose may be raised one level, and that roughly half of those who try the higher dose again are expected to tolerate it.",
      sources: ["nexavar-smpc", "nexavar-label"],
    },
    {
      name: "Sunitinib, axitinib and lenvatinib: a general rule only",
      differs: "The US labels of these three medicines list hand-foot syndrome among their common side effects but give no dose rule specific to it. Lenvatinib: for a \"Persistent or intolerable Grade 2 or 3 adverse reaction\" of any kind, withhold until it improves to grade 0 to 1 or baseline and resume at a reduced dose. Axitinib: for other adverse reactions, reduce by one dose level at grade 3; at grade 4, withhold until grade 2 and resume at a reduced dose. Sunitinib: the dose modification table has no row for hand-foot syndrome; its only skin row is for erythema multiforme, Stevens-Johnson syndrome, toxic epidermal necrolysis and necrotising fasciitis, for which sunitinib is stopped permanently.",
      evidence: "US prescribing information for each. Because these rules are not specific to skin, no step is written for them; the prescriber applies the general rule and the label's own dose levels.",
      sources: ["lenvima-label", "inlyta-label", "sutent-label"],
    },
  ],
  grades: [
    { claim: "CTCAE version 5.0, grade 2 palmar-plantar erythrodysesthesia syndrome", grade: "severity scale, not an evidence grade", source: "ctcae-v5", quote: "Skin changes (e.g., peeling, blisters, bleeding, fissures, edema, or hyperkeratosis) with pain; limiting instrumental ADL" },
    { claim: "Capecitabine (EU): interrupt for grade 2 or 3 until resolved or grade 1", grade: "EU summary of product characteristics, section 4.4", source: "xeloda-smpc", quote: "If grade 2 or 3 hand-foot syndrome occurs, administration of capecitabine should be interrupted until the event resolves or decreases in intensity to grade 1." },
    { claim: "Capecitabine (US label): missed doses are not replaced", grade: "US prescribing information (dosage modifications for adverse reactions)", source: "xeloda-label", quote: "Do not replace missed doses of XELODA; instead resume XELODA with the next planned dosage." },
    { claim: "Liposomal doxorubicin: stop if a reaction has not resolved after 2 weeks", grade: "US prescribing information (Table 1)", source: "doxil-label", quote: "Discontinue DOXIL liposomal infusion if no resolution after 2 weeks." },
    { claim: "Sorafenib (US label): interrupt until grade 0 to 1 when a grade 2 reaction does not improve or recurs (liver and kidney cancer)", grade: "US prescribing information (Table 3)", source: "nexavar-label", quote: "Interrupt NEXAVAR until resolved or improved to Grade 0 to 1." },
    { claim: "Sorafenib (US label): the dose may be raised again after 28 days at grade 0 or 1", grade: "US prescribing information (section 2.2)", source: "nexavar-label", quote: "Following improvement of Grade 2 or 3 dermatologic toxicity to Grade 0 or 1 for at least 28 days on a reduced dose of NEXAVAR, the dose of NEXAVAR may be increased 1 dose level from the reduced dose." },
    { claim: "Sorafenib (EU): first reduction for liver and kidney cancer is two 200 mg tablets once daily", grade: "EU summary of product characteristics, section 4.2", source: "nexavar-smpc", quote: "When dose reduction is necessary during the treatment of hepatocellular carcinoma (HCC) and advanced renal cell carcinoma (RCC), the Nexavar dose should be reduced to two tablets of 200 mg sorafenib once daily (see section 4.4)." },
    { claim: "Cabozantinib: hand-foot reactions occurred in 45 per cent of patients, grade 3 in 13 per cent", grade: "US prescribing information (section 5.7; pooled label safety data)", source: "cabometyx-label", quote: "Grade 3 PPE occurred in 13% of patients treated with CABOMETYX." },
    { claim: "Lenvatinib: general rule for persistent or intolerable grade 2 or 3 reactions", grade: "US prescribing information (Table 2, other adverse reactions)", source: "lenvima-label", quote: "Withhold until improves to Grade 0 to 1 or baseline." },
    { claim: "Urea cream 10 per cent reduced grade 2 or worse HFSR with sorafenib", grade: "randomised open-label trial, P = .004", source: "ren-2015", quote: "as was the incidence of grade ≥ 2 HFSR (20.7% v 29.2%, respectively; OR, 0.635; 95% CI, 0.466 to 0.866; P = .004)." },
    { claim: "Urea cream did not significantly reduce cumulative HFSR in a blinded trial with sorafenib (the abstract does not print the strength; the Japanese review gives it as 20 per cent)", grade: "randomised double-blind trial, not significant on cumulative incidence", source: "lee-2020", quote: "The urea cream group showed a trend towards a lower cumulative incidence of any-grade HFSR (log-rank, P = 0.247) and severe HFSR of grade II or higher (log-rank, P = 0.394) without statistical significance." },
    { claim: "Topical diclofenac and celecoxib reduced moderate to severe HFS in the 2026 network meta-analysis", grade: "network meta-analysis of 13 RCTs, 1983 patients", source: "nma-2026", quote: "Both topical diclofenac (RR 0.26, 95% CI 0.10 to 0.66) and celecoxib (RR 0.46, 95% CI 0.26 to 0.84) significantly reduced the risk of moderate to severe HFS compared with placebo." },
    { claim: "Only celecoxib prevented moderate to severe HFS in the 2022 network meta-analysis", grade: "Bayesian network meta-analysis of 15 RCTs, 2715 patients", source: "nma-2022", quote: "The analysis showed only celecoxib could significantly prevent the incidence of moderate to severe HFS (grade ≥2) (OR 0.29, 95% CrI 0.13 to 0.68)." },
    { claim: "Topical diclofenac did not reduce grade 2 or worse HFS in routine care", grade: "prospective observational study, n = 151, not significant", source: "diclo-hfs-2026", quote: "In this prospective real-world study, prophylactic topical diclofenac did not reduce clinically significant capecitabine-induced HFS or delay its onset compared with active monitoring." },
    { claim: "D-TORCH applied diclofenac to the hands only", grade: "published trial protocol", source: "d-torch-protocol-2022", quote: "The participant will apply 1 g (1 g = two fingertip units [FTU]: one FTU for one surface of one hand) of 1% topical diclofenac or placebo on the palmar and dorsal surface of each hand twice daily until discontinuation of capecitabine or 12 weeks or development of HFS, whichever is earlier." },
    { claim: "Guidelines differ on cooling", grade: "comparison of six guidelines, appraised with AGREE II; abstract", source: "guideline-comparison-2026", quote: "ESMO and ONS recommended cooling procedures to prevent taxane-induced HFS." },
  ],
  sources: [
    { key: "esmo-derm-2021", label: "Prevention and management of dermatological toxicities related to anticancer agents: ESMO Clinical Practice Guidelines", publisher: "ESMO, Annals of Oncology", year: 2021, url: "https://doi.org/10.1016/j.annonc.2020.11.005", doi: "10.1016/j.annonc.2020.11.005", read: "not-reachable", accessed: "2026-11-17" },
    { key: "guideline-comparison-2026", label: "Comparing clinical practice guidelines on the prevention and management of chemotherapy-induced hand-foot syndrome", publisher: "Supportive Care in Cancer", year: 2026, url: "https://europepmc.org/abstract/MED/42189295", doi: "10.1007/s00520-026-10809-5", gradingScheme: "Comparison of six guidelines found by a search to February 2025, each appraised with the AGREE II checklist; it reports their recommendations and does not grade them.", read: "abstract", accessed: "2026-11-17" },
    { key: "jp-review-2025", label: "Chemotherapy-related hand-foot syndrome and hand-foot skin reaction: a review of management and possible approaches for Asian patients by the Japanese pharmacist-led oncodermatology study team", publisher: "International Journal of Clinical Oncology", year: 2025, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12644181/", doi: "10.1007/s10147-025-02895-y", gradingScheme: "Narrative review of 53 articles; recommendations not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "s1-esmo-open-2023", label: "Fluoropyrimidine-induced hand-foot syndrome and cardiotoxicity: recommendations for the use of the oral fluoropyrimidine S-1 in metastatic colorectal cancer", publisher: "ESMO Open", year: 2023, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10163153/", doi: "10.1016/j.esmoop.2023.101199", gradingScheme: "International expert group recommendations from published data; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "ctcae-v5", label: "Common Terminology Criteria for Adverse Events (CTCAE) version 5.0", publisher: "US National Cancer Institute, Cancer Therapy Evaluation Program", year: 2017, url: "https://dctd.cancer.gov/research/ctep-trials/trial-development", gradingScheme: "Not an evidence grade: a severity scale for each adverse event term. Palmar-plantar erythrodysesthesia syndrome has grades 1 to 3 only.", read: "full-text", accessed: "2026-11-17" },
    { key: "xeloda-label", label: "XELODA (capecitabine) prescribing information (text revised 10/2025)", publisher: "H2-Pharma, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e702d84d-7162-4751-bf37-d724cc7e45a5", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "xeloda-smpc", label: "Xeloda (capecitabine) EU product information: summary of product characteristics and package leaflet", publisher: "Cheplapharm, via the European Medicines Agency", year: 2025, url: "https://www.ema.europa.eu/en/documents/product-information/xeloda-epar-product-information_en.pdf", gradingScheme: "EU summary of product characteristics: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "doxil-label", label: "DOXIL (doxorubicin hydrochloride liposome injection) prescribing information", publisher: "Baxter, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1c153e9e-4cf2-4ac7-9cf9-16f9b48d7dce", gradingScheme: "US prescribing information: regulatory labelling, not graded. The label prints its own grade descriptions for hand-foot syndrome, grades 1 to 4.", read: "full-text", accessed: "2026-11-17" },
    { key: "stivarga-label", label: "STIVARGA (regorafenib) prescribing information", publisher: "Bayer, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=824f19c9-0546-4a8a-8d8f-c4055c04f7c7", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "nexavar-label", label: "NEXAVAR (sorafenib) prescribing information", publisher: "Bayer, via DailyMed (US National Library of Medicine)", year: 2024, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b50667e4-5ebc-4968-a646-d605058dbef0", gradingScheme: "US prescribing information: regulatory labelling written by the manufacturer and approved by the FDA, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "nexavar-smpc", label: "Nexavar (sorafenib) EU product information: summary of product characteristics", publisher: "Bayer, via the European Medicines Agency", year: 2024, url: "https://www.ema.europa.eu/en/documents/product-information/nexavar-epar-product-information_en.pdf", gradingScheme: "EU summary of product characteristics: regulatory labelling written by the manufacturer and approved through the EMA, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "cabometyx-label", label: "CABOMETYX (cabozantinib) tablets prescribing information", publisher: "Exelixis, via DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3850cce2-6137-42e5-a792-d318c4a4b3b5", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "sutent-label", label: "SUTENT (sunitinib malate) prescribing information", publisher: "Pfizer, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=43a4d7f8-48ae-4a63-9108-2fa8e3ea9d9c", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "inlyta-label", label: "INLYTA (axitinib) prescribing information", publisher: "Pfizer, via DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=84137882-e000-47da-bd5b-fa76ab3c76f9", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "lenvima-label", label: "LENVIMA (lenvatinib) prescribing information", publisher: "Eisai, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f4bedd21-efde-44c6-9d9c-b48b78d7ed1e", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "ren-2015", label: "Randomized controlled trial of the prophylactic effect of urea-based cream on sorafenib-associated hand-foot skin reactions in patients with advanced hepatocellular carcinoma", publisher: "Journal of Clinical Oncology", year: 2015, url: "https://europepmc.org/abstract/MED/25667293", doi: "10.1200/JCO.2013.52.9651", read: "abstract", accessed: "2026-11-17" },
    { key: "lee-2020", label: "Effect of urea cream on sorafenib-associated hand-foot skin reaction in patients with hepatocellular carcinoma: a multicenter, randomised, double-blind controlled study", publisher: "European Journal of Cancer", year: 2020, url: "https://europepmc.org/abstract/MED/33039810", doi: "10.1016/j.ejca.2020.09.012", read: "abstract", accessed: "2026-11-17" },
    { key: "mapisal-2015", label: "Mapisal Versus Urea Cream as Prophylaxis for Capecitabine-Associated Hand-Foot Syndrome: A Randomized Phase III Trial of the AIO Quality of Life Working Group", publisher: "Journal of Clinical Oncology", year: 2015, url: "https://europepmc.org/abstract/MED/26124485", doi: "10.1200/JCO.2014.60.4587", read: "abstract", accessed: "2026-11-17" },
    { key: "d-torch-2024", label: "Topical Diclofenac for Prevention of Capecitabine-Associated Hand-Foot Syndrome: A Double-Blind Randomized Controlled Trial", publisher: "Journal of Clinical Oncology", year: 2024, url: "https://europepmc.org/abstract/MED/38412399", doi: "10.1200/JCO.23.01730", read: "abstract", accessed: "2026-11-17" },
    { key: "d-torch-protocol-2022", label: "Randomized double-blind, placebo-controlled study of topical diclofenac in the prevention of hand-foot syndrome in patients receiving capecitabine (the D-TORCH study)", publisher: "Trials", year: 2022, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9117836/", doi: "10.1186/s13063-022-06353-2", gradingScheme: "Trial protocol: what the trial planned to do, not its results.", read: "full-text", accessed: "2026-11-17" },
    { key: "j-direct-2025", label: "A randomized, double-blind, placebo-controlled phase III study evaluating the preventive effect of diclofenac cream on capecitabine-related hand-foot syndrome: study protocol of J-SUPPORT2401/JORTC-SUP06 (J-DIRECT)", publisher: "International Journal of Clinical Oncology", year: 2025, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12296980/", doi: "10.1007/s10147-025-02789-z", gradingScheme: "Trial protocol: what the trial plans to do, not results.", read: "full-text", accessed: "2026-11-17" },
    { key: "diclo-hfs-2026", label: "Topical Diclofenac for Prevention of Capecitabine-Induced Hand-Foot Syndrome: A Prospective Real-World Study", publisher: "JCO Global Oncology", year: 2026, url: "https://europepmc.org/abstract/MED/42623594", doi: "10.1200/GO-26-00151", read: "abstract", accessed: "2026-11-17" },
    { key: "nma-2022", label: "Chemotherapy-induced hand foot syndrome: comparative efficacy and safety of pharmacological prophylaxis: systematic review and Bayesian network meta-analysis", publisher: "BMJ Supportive & Palliative Care", year: 2022, url: "https://europepmc.org/abstract/MED/36564149", doi: "10.1136/spcare-2022-004011", read: "abstract", accessed: "2026-11-17" },
    { key: "nma-2026", label: "Hand-foot syndrome prevention: pharmacological interventions: systematic review and network meta-analysis", publisher: "BMJ Supportive & Palliative Care", year: 2026, url: "https://europepmc.org/abstract/MED/41207711", doi: "10.1136/spcare-2025-005639", read: "abstract", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-upgrade-topical-diclofenac-during-capecitabine"],
  gaps: [
    "The ESMO 2021 dermatological toxicity guideline could not be read: on 17 November 2026 Europe PMC still held no abstract and the publisher's site answered a script with a browser check. Its grades and its own wording are not given here; what it recommends on celecoxib, cooling and topical steroids is known only from the abstract of a 2026 comparison of six guidelines and from the Japanese review. No newer edition was found in Europe PMC or Crossref, and the comparison (search to February 2025) treats the 2021 text as current. No MASCC or ASCO guideline specific to hand-foot syndrome was found.",
    "The other guidelines in that comparison (BC Cancer, eviQ, the Oncology Nursing Society, UKONS and the UK North Cancer Alliance) were not read; their positions are reported only as its abstract states them.",
    "The trials, network meta-analyses and the D-TORCH and DICLO-HFS studies were read as abstracts only. The D-TORCH abstract does not print the strength of the gel or how often it was applied; the figures given here (1 per cent, 1 g to each hand, twice a day) are what the trial's 2022 protocol planned. The Japanese review's table describes the same trial as 1 per cent gel up to four times a day with 130 people in the diclofenac group, where the trial's abstract says 131; the abstract's figure is used.",
    "Whether topical diclofenac works on the soles is unknown: D-TORCH applied it to the hands only. The Japanese phase 3 trial J-DIRECT, testing a 0.1 per cent diclofenac cream on palms and soles twice a day, had not reported in what was read.",
    "General measures (avoiding stress on the skin and too much water, fitted gloves, emollients) are universal advice with no randomised trial behind them on their own. Advice often given about avoiding heat and about footwear is in none of the sources read, so it is not stated here.",
    "Cooling is not written as a step: the one source read in full says no designed trial exists, and nothing read covers cooling for taxanes beyond one line of the guideline comparison's abstract.",
    "The capecitabine table in the US label is a general one for adverse reactions and has a grade 4 row (stop permanently, or withhold and restart at 50 per cent); CTCAE grades hand-foot syndrome only to grade 3, so that row is not written as a step. The EU text states its percentages against the starting dose and the US label against the current dose; both are given.",
    "No source read gives a time limit in hours for reporting a reaction. The labels say to stop capecitabine immediately at grade 2 and, for the other medicines, to tell the healthcare provider (regorafenib and cabozantinib: right away).",
    "Dose rules for sorafenib and cabozantinib come from their US labels. The US labels of sunitinib, axitinib and lenvatinib give no rule specific to hand-foot reactions, only a general adverse-reaction rule (see variants), so no step is written for them.",
    "European product information was read for capecitabine and sorafenib only. The EMA texts for regorafenib, liposomal doxorubicin, cabozantinib, sunitinib, axitinib and lenvatinib were not read and may differ from the US labels.",
    "The cabozantinib rule is from the tablet label (CABOMETYX); the capsule label used in medullary thyroid cancer (COMETRIQ) has different doses and was not read. Labels of other multikinase inhibitors that cause hand-foot skin reaction, such as pazopanib, tivozanib and fruquintinib, were not read.",
    "The Western guideline recommendations on topical steroids are known here only as the Japanese review and the guideline comparison report them.",
  ],
  drugs: ["capecitabine", "capox", "pegylated-liposomal-doxorubicin", "sorafenib", "regorafenib", "cabozantinib", "lenvatinib", "sunitinib", "tegafur-gimeracil-oteracil", "urea-cream", "lidocaine"],
  technologies: ["vitamin-b6-pyridoxine"],
  related: ["celecoxib", "axitinib"],
  terms: ["hand-foot-syndrome"],
  sections: ["supportive-care"],
  tags: ["protocol", "hand-foot-syndrome", "skin-toxicity", "supportive-care"],
});

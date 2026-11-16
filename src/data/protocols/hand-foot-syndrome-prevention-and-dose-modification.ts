import { protocol } from "./helpers";

/*
 * Hand-foot syndrome (palmar-plantar erythrodysesthesia) with capecitabine and pegylated liposomal doxorubicin, and
 * hand-foot skin reaction with multikinase inhibitors such as sorafenib and regorafenib: prevention, inspection, and
 * dose modification by grade. One record for both, because the sources treat them together and the care steps overlap;
 * where they differ (urea cream has its best evidence in sorafenib skin reaction, diclofenac in capecitabine), the step
 * says which drug it is for.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl, the DailyMed SPL web service or the Europe
 * PMC REST API into a scratch directory and read as text):
 * - ESMO 2021 guideline on dermatological toxicities (Lacouture et al., Ann Oncol 2021): not reachable. Europe PMC holds
 *   no abstract and annalsofoncology.org returned 403 to a script.
 * - Japanese pharmacist-led oncodermatology review of HFS and HFSR management (Int J Clin Oncol 2025): full text from
 *   PubMed Central (PMC12644181), including its summary of the Western guidelines and its tables of trials.
 * - International expert recommendations on S-1 after fluoropyrimidine hand-foot syndrome (ESMO Open 2023): full text
 *   from PubMed Central (PMC10163153).
 * - XELODA (capecitabine), DOXIL (pegylated liposomal doxorubicin) and STIVARGA (regorafenib) US prescribing
 *   information, from DailyMed (versions of February 2026, June 2026 and February 2026): dose modification sections and
 *   warnings. Full text.
 * - Trials, as abstracts from Europe PMC: urea cream with sorafenib (Ren et al., J Clin Oncol 2015; Lee et al., Eur J
 *   Cancer 2020), Mapisal against urea cream with capecitabine (Hofheinz et al., J Clin Oncol 2015), topical
 *   diclofenac with capecitabine (D-TORCH, J Clin Oncol 2024), the DICLO-HFS real-world study (JCO Glob Oncol 2026),
 *   two network meta-analyses (BMJ Support Palliat Care 2022 and 2026), and the J-DIRECT trial protocol (2025).
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text unchanged.
 */
export const handFootSyndromePreventionAndDoseModification = protocol({
  id: "hand-foot-syndrome-prevention-and-dose-modification",
  name: "Hand-foot syndrome and hand-foot skin reaction: prevention, skin care and dose changes",
  aka: ["hand-foot syndrome", "HFS", "palmar-plantar erythrodysesthesia", "PPE", "PPES", "hand-foot skin reaction", "HFSR", "capecitabine hand-foot syndrome", "urea cream for hand-foot", "topical diclofenac for hand-foot syndrome"],
  domain: "symptom-management",
  tldr: "Capecitabine, liposomal doxorubicin and tablets such as sorafenib and regorafenib can make the palms and soles red, sore, peeling or blistered. From the start, avoid rubbing, heat and long soaks, wear well-fitting shoes and moisturise daily; with sorafenib, a 10 per cent urea cream from day one helps. If hands or feet become painful or limit what you do, stop capecitabine and call your team.",
  simple: "Some cancer medicines make hands and feet sore. Keep them cool and moisturised. If they hurt or blister, stop the tablets and call your team.",
  summary: "Hand-foot syndrome (HFS) from capecitabine and pegylated liposomal doxorubicin, and hand-foot skin reaction (HFSR) from multikinase inhibitors, are managed by prevention, inspection at every cycle, and dose modification by CTCAE grade. Labels set the dose rules: capecitabine is withheld for grade 2 or worse until grade 0 to 1 and restarted at 100, 75 or 50 per cent of the current dose by occurrence (grade 2) or at 75 or 50 per cent (grade 3), and patients are told to stop the tablets themselves at grade 2; liposomal doxorubicin is delayed up to 2 weeks for grade 2 or worse and reduced by 25 per cent after grade 3; regorafenib is reduced to 120 mg at the first grade 2 HFSR and to 80 mg if it recurs, and interrupted for at least 7 days at grade 3.\n\nFor prevention, general measures (avoiding friction, heat and water exposure, fitted gloves and footwear, regular emollients) are universal advice without randomised proof. 10 per cent urea cream three times daily from day 1 of sorafenib lowered any-grade HFSR (56.0 against 73.6 per cent) and grade 2 or worse HFSR (20.7 against 29.2 per cent) in an open trial of 871 people; a blinded trial of 20 per cent urea was not significant on its primary measure. With capecitabine, oral celecoxib reduces grade 2 or worse HFS in network meta-analyses but carries cardiovascular and gastrointestinal risk; topical diclofenac gel reduced grade 2 to 3 HFS from 15.0 to 3.8 per cent in the D-TORCH trial and leads the 2026 network meta-analysis, but a 2026 real-world study found no benefit and a Japanese phase 3 trial is under way. Pyridoxine does not work. The ESMO 2021 guideline could not be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "home"],
  },
  population: "Adults taking capecitabine (alone or in combination) or receiving pegylated liposomal doxorubicin, and adults taking multikinase inhibitors that cause hand-foot skin reaction (regorafenib, sorafenib, cabozantinib, lenvatinib, sunitinib and others). The urea cream trials were in advanced hepatocellular carcinoma on sorafenib; the diclofenac trial in breast and gastrointestinal cancers on capecitabine. Dose rules differ by drug and come from each drug's own label.",
  trigger: "A drug that causes hand-foot syndrome or skin reaction is started, and at every cycle or review while it continues.",
  steps: [
    {
      action: "Before treatment starts, teach hand and foot care: avoid rubbing, pressure and long exposure to hot water, wear well-fitted (not tight) gloves and footwear, and moisturise hands and feet every day",
      why: "Pressure, friction and heat bring the reaction on where the skin is under most stress; moisturising keeps the skin supple. These measures are safe, though no trial has proved them on their own.",
      source: "jp-review-2025",
      quote: "Preventive measures (grade 0) include avoiding mechanical or chemical stress, limiting water exposure, wearing appropriately fitted gloves, regular use of emollients, and patient education.",
      grade: "expert review; no randomised trial of these measures alone",
    },
    {
      action: "Look at the palms and soles and ask about pain or difficulty with daily activities before every cycle",
      why: "The reaction is often under-reported; seeing it early allows a short break before it becomes severe.",
      source: "s1-esmo-open-2023",
      quote: "As its incidence may be underestimated, the panel recommended that providers carry out visual inspections of the palms of the hands and soles of the feet in addition to taking history on HFS-related symptoms prior to each cycle.",
      grade: "international expert panel recommendation, ungraded",
    },
    {
      action: "With sorafenib, offer 10 per cent urea cream on the hands and feet three times a day from the first day of treatment",
      why: "Urea softens the thickened skin where the reaction starts; in a large trial it lowered the chance of a reaction and delayed it.",
      source: "ren-2015",
      quote: "UBC prophylaxis in patients with advanced HCC starting sorafenib reduced HFSR rates, extended the time to first occurrence of HFSR, and improved patient quality of life compared with BSC.",
      grade: "randomised open-label trial, n = 871",
    },
    {
      action: "With capecitabine, consider topical diclofenac gel on the palms, explaining that the evidence is mixed",
      why: "An anti-inflammatory gel blocks a step in the inflammation behind the reaction; one randomised trial found it prevented most moderate cases, but a later study in routine care did not.",
      source: "d-torch-2024",
      quote: "Grade 2 or 3 HFS was observed in 3.8% of participants in the diclofenac group compared with 15.0% in the placebo group (absolute difference, 11.2%; 95% CI, 4.3 to 18.1; P = .003).",
      grade: "single-site randomised double-blind trial, n = 264",
    },
    {
      action: "Do not give pyridoxine (vitamin B6) to prevent hand-foot syndrome",
      why: "Several trials found that it does not prevent the reaction.",
      source: "jp-review-2025",
      quote: "Pyridoxine Most RCTs on pyridoxine showed negative results, and multiple systematic reviews and meta-analyses have shown insufficient efficacy [ 59 , 60 ].",
      grade: "systematic reviews and meta-analyses",
    },
    {
      action: "Capecitabine: tell the person to stop the tablets and call the team if the reaction reaches grade 2 (painful, or limiting daily activities)",
      why: "Stopping at once lets the skin recover quickly; continuing makes it worse and can lead to a longer break.",
      source: "xeloda-label",
      quote: "Instruct patients experiencing grade 2 palmar-plantar erythrodysesthesia syndrome or greater to stop taking XELODA immediately and to contact their healthcare provider.",
      grade: "US prescribing information",
    },
    {
      action: "Capecitabine: withhold until grade 0 to 1, then restart at the same or a lower dose by grade and occurrence (grade 2: 100, 75, then 50 per cent; grade 3: 75, then 50 per cent); do not replace missed doses",
      why: "Lowering the dose after a reaction makes a repeat less likely while keeping the treatment going.",
      source: "xeloda-label",
      quote: "Withhold XELODA and then resume at same or reduced dose or permanently discontinue based on severity and occurrence",
      grade: "US prescribing information (Table 1)",
    },
    {
      action: "Liposomal doxorubicin: delay the next dose for a first grade 2 or worse reaction, for up to 2 weeks, and reduce by 25 per cent after a grade 3 reaction",
      why: "The reaction usually appears after two or three cycles and settles with a delay; a lower dose makes it less likely to return.",
      source: "doxil-label",
      quote: "Delay DOXIL liposomal infusion for the first episode of Grade 2 or greater HFS",
      grade: "US prescribing information",
    },
    {
      action: "Regorafenib: reduce to 120 mg at the first grade 2 skin reaction and to 80 mg if it recurs; interrupt for at least 7 days for grade 3",
      why: "The reaction is most common in the first cycle; stepping the dose down lets most people continue.",
      source: "stivarga-label",
      quote: "Grade 2 hand-foot skin reaction (HFSR) [palmar-plantar erythrodysesthesia syndrome (PPES)] that is recurrent or does not improve within 7 days despite dose reduction; interrupt therapy for a minimum of 7 days for Grade 3 HFSR",
      grade: "US prescribing information",
    },
    {
      action: "For established reactions, use moisturisers and 10 per cent urea cream for thickened skin, and a potent topical steroid for painful inflamed areas, stepping down once better",
      why: "Steroid creams calm the inflammation and urea softens the hard skin; Western guidelines recommend them, though no trial has tested them for this.",
      source: "jp-review-2025",
      quote: "Various guidelines recommend high potent topical steroid therapy for grade ≥ 2 HFS/HFSR [ 13 , 14 ], and such is used in clinical practice, although no RCTs have been conducted.",
      grade: "guideline recommendation cited by the review; no randomised trials",
    },
    {
      action: "In metastatic colorectal cancer, if capecitabine or infusional fluorouracil hand-foot syndrome causes pain or limits function, consider switching to S-1 once it has settled to grade 1 or less",
      why: "S-1 is a different fluoropyrimidine tablet that causes much less hand-foot syndrome, so treatment can continue at full strength.",
      source: "s1-esmo-open-2023",
      quote: "In patients who experience pain and/or functional impairment due to HFS during treatment with capecitabine or infusional 5-FU, a switch to S-1 is recommended without prior dose reduction of capecitabine/5-FU.",
      grade: "international expert panel recommendation, ungraded",
    },
  ],
  bestInClass: {
    statement: "Dose modification by grade, from each drug's label, is the core of management, with inspection of hands and feet at every cycle and early self-stopping of capecitabine at grade 2. For prevention, the strongest single result is 10 per cent urea cream from day 1 of sorafenib (large open trial; a blinded trial of 20 per cent urea was not significant on its main measure). For capecitabine, two network meta-analyses agree that oral celecoxib reduces moderate to severe HFS but its cardiovascular and gastrointestinal risks limit routine use; topical diclofenac had the strongest effect in the 2026 network meta-analysis and in one randomised trial, but a 2026 real-world study found no benefit and a confirmatory phase 3 trial (J-DIRECT) is under way, so it is reasonable to offer but not yet established. Urea cream beat an antioxidant ointment for capecitabine in one trial. Pyridoxine does not work. The ESMO 2021 dermatological toxicity guideline, which is the main international guideline, could not be read.",
    sources: ["xeloda-label", "doxil-label", "stivarga-label", "ren-2015", "lee-2020", "nma-2022", "nma-2026", "d-torch-2024", "diclo-hfs-2026", "mapisal-2015", "jp-review-2025", "esmo-derm-2021"],
  },
  variants: [
    {
      name: "Oral celecoxib with capecitabine",
      differs: "Celecoxib 200 mg twice daily alongside capecitabine to prevent HFS.",
      evidence: "The 2022 network meta-analysis (15 trials, 2715 patients) found only celecoxib significantly prevented grade 2 or worse HFS (odds ratio 0.29); the 2026 network meta-analysis also found a reduction (risk ratio 0.46). The Japanese review advises limiting it because of cardiovascular and gastrointestinal risk with long-term use.",
      sources: ["nma-2022", "nma-2026", "jp-review-2025"],
    },
    {
      name: "Topical diclofenac in routine care (DICLO-HFS, Turkey)",
      differs: "1 per cent diclofenac gel twice daily from the start of capecitabine as routine practice, compared with active monitoring, in two centres.",
      evidence: "Prospective observational study of 151 people: grade 2 or worse HFS 16.9 per cent with diclofenac against 13.8 per cent with monitoring (not significant); the authors concluded the findings do not support routine diclofenac prophylaxis. Not randomised.",
      sources: ["diclo-hfs-2026"],
    },
    {
      name: "Urea cream rather than an antioxidant ointment with capecitabine",
      differs: "10 per cent urea cream as the preventive cream for capecitabine, compared with Mapisal, an antioxidant ointment.",
      evidence: "Randomised phase 3 trial of 152 evaluable people: any-grade HFS in 6 weeks 22.4 per cent with urea against 39.5 per cent with the ointment. There was no untreated control group.",
      sources: ["mapisal-2015"],
    },
    {
      name: "Asian practice (Japanese pharmacist-led review)",
      differs: "Topical steroids are not used for grade 1 HFS, and lidocaine patches and antiseptic solutions are not used for grade 3, unlike Western guidance; urea cream used with caution because of irritation.",
      evidence: "Narrative review of 53 articles by a Japanese pharmacist-led group; based on differences in skin type and lack of Asian safety data rather than trials.",
      sources: ["jp-review-2025"],
    },
  ],
  grades: [
    { claim: "Urea cream 10 per cent reduced grade 2 or worse HFSR with sorafenib", grade: "randomised open-label trial, P = .004", source: "ren-2015", quote: "as was the incidence of grade ≥ 2 HFSR (20.7% v 29.2%, respectively; OR, 0.635; 95% CI, 0.466 to 0.866; P = .004)." },
    { claim: "Urea cream 20 per cent did not significantly reduce cumulative HFSR in a blinded trial with sorafenib", grade: "randomised double-blind trial, not significant on cumulative incidence", source: "lee-2020", quote: "The urea cream group showed a trend towards a lower cumulative incidence of any-grade HFSR (log-rank, P = 0.247) and severe HFSR of grade II or higher (log-rank, P = 0.394) without statistical significance." },
    { claim: "Topical diclofenac and celecoxib reduced moderate to severe HFS in the 2026 network meta-analysis", grade: "network meta-analysis of 13 RCTs, 1983 patients", source: "nma-2026", quote: "Both topical diclofenac (RR 0.26, 95% CI 0.10 to 0.66) and celecoxib (RR 0.46, 95% CI 0.26 to 0.84) significantly reduced the risk of moderate to severe HFS compared with placebo." },
    { claim: "Only celecoxib prevented moderate to severe HFS in the 2022 network meta-analysis", grade: "Bayesian network meta-analysis of 15 RCTs, 2715 patients", source: "nma-2022", quote: "The analysis showed only celecoxib could significantly prevent the incidence of moderate to severe HFS (grade ≥2) (OR 0.29, 95% CrI 0.13 to 0.68)." },
    { claim: "Topical diclofenac did not reduce grade 2 or worse HFS in routine care", grade: "prospective observational study, n = 151, not significant", source: "diclo-hfs-2026", quote: "In this prospective real-world study, prophylactic topical diclofenac did not reduce clinically significant capecitabine-induced HFS or delay its onset compared with active monitoring." },
  ],
  sources: [
    { key: "esmo-derm-2021", label: "Prevention and management of dermatological toxicities related to anticancer agents: ESMO Clinical Practice Guidelines", publisher: "ESMO, Annals of Oncology", year: 2021, url: "https://doi.org/10.1016/j.annonc.2020.11.005", doi: "10.1016/j.annonc.2020.11.005", read: "not-reachable", accessed: "2026-11-11" },
    { key: "jp-review-2025", label: "Chemotherapy-related hand-foot syndrome and hand-foot skin reaction: a review of management and possible approaches for Asian patients by the Japanese pharmacist-led oncodermatology study team", publisher: "International Journal of Clinical Oncology", year: 2025, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12644181/", doi: "10.1007/s10147-025-02895-y", gradingScheme: "Narrative review of 53 articles; recommendations not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "s1-esmo-open-2023", label: "Fluoropyrimidine-induced hand-foot syndrome and cardiotoxicity: recommendations for the use of the oral fluoropyrimidine S-1 in metastatic colorectal cancer", publisher: "ESMO Open", year: 2023, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10163153/", doi: "10.1016/j.esmoop.2023.101199", gradingScheme: "International expert group recommendations from published data; not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "xeloda-label", label: "XELODA (capecitabine) prescribing information", publisher: "H2-Pharma, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e702d84d-7162-4751-bf37-d724cc7e45a5", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "doxil-label", label: "DOXIL (doxorubicin hydrochloride liposome injection) prescribing information", publisher: "Baxter, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1c153e9e-4cf2-4ac7-9cf9-16f9b48d7dce", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "stivarga-label", label: "STIVARGA (regorafenib) prescribing information", publisher: "Bayer, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=824f19c9-0546-4a8a-8d8f-c4055c04f7c7", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "ren-2015", label: "Randomized controlled trial of the prophylactic effect of urea-based cream on sorafenib-associated hand-foot skin reactions in patients with advanced hepatocellular carcinoma", publisher: "Journal of Clinical Oncology", year: 2015, url: "https://europepmc.org/abstract/MED/25667293", doi: "10.1200/JCO.2013.52.9651", read: "abstract", accessed: "2026-11-11" },
    { key: "lee-2020", label: "Effect of urea cream on sorafenib-associated hand-foot skin reaction in patients with hepatocellular carcinoma: a multicenter, randomised, double-blind controlled study", publisher: "European Journal of Cancer", year: 2020, url: "https://europepmc.org/abstract/MED/33039810", doi: "10.1016/j.ejca.2020.09.012", read: "abstract", accessed: "2026-11-11" },
    { key: "mapisal-2015", label: "Mapisal Versus Urea Cream as Prophylaxis for Capecitabine-Associated Hand-Foot Syndrome: A Randomized Phase III Trial of the AIO Quality of Life Working Group", publisher: "Journal of Clinical Oncology", year: 2015, url: "https://europepmc.org/abstract/MED/26124485", doi: "10.1200/JCO.2014.60.4587", read: "abstract", accessed: "2026-11-11" },
    { key: "d-torch-2024", label: "Topical Diclofenac for Prevention of Capecitabine-Associated Hand-Foot Syndrome: A Double-Blind Randomized Controlled Trial", publisher: "Journal of Clinical Oncology", year: 2024, url: "https://europepmc.org/abstract/MED/38412399", doi: "10.1200/JCO.23.01730", read: "abstract", accessed: "2026-11-11" },
    { key: "diclo-hfs-2026", label: "Topical Diclofenac for Prevention of Capecitabine-Induced Hand-Foot Syndrome: A Prospective Real-World Study", publisher: "JCO Global Oncology", year: 2026, url: "https://europepmc.org/abstract/MED/42623594", doi: "10.1200/GO-26-00151", read: "abstract", accessed: "2026-11-11" },
    { key: "nma-2022", label: "Chemotherapy-induced hand foot syndrome: comparative efficacy and safety of pharmacological prophylaxis: systematic review and Bayesian network meta-analysis", publisher: "BMJ Supportive & Palliative Care", year: 2022, url: "https://europepmc.org/abstract/MED/36564149", doi: "10.1136/spcare-2022-004011", read: "abstract", accessed: "2026-11-11" },
    { key: "nma-2026", label: "Hand-foot syndrome prevention: pharmacological interventions: systematic review and network meta-analysis", publisher: "BMJ Supportive & Palliative Care", year: 2026, url: "https://europepmc.org/abstract/MED/41207711", doi: "10.1136/spcare-2025-005639", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-upgrade-topical-diclofenac-during-capecitabine"],
  gaps: [
    "The ESMO 2021 dermatological toxicity guideline could not be read (no abstract in Europe PMC; the publisher refused a script), so its grades and its preventive recommendations are not given here. No MASCC guideline specific to hand-foot syndrome was found.",
    "The trials, network meta-analyses and the D-TORCH and DICLO-HFS studies were read as abstracts only.",
    "Whether topical diclofenac works on the soles is unknown: D-TORCH applied it to the palms only. The Japanese phase 3 trial J-DIRECT, testing a cream on palms and soles, had not reported in what was read.",
    "General measures (avoiding friction and heat, emollients) are universal advice with no randomised trial behind them on their own.",
    "Dose rules for multikinase inhibitors other than regorafenib (sorafenib, cabozantinib, lenvatinib, sunitinib) were not read here; each drug's own label sets them.",
    "The Western guideline recommendations on topical steroids are known here only as the Japanese review reports them.",
  ],
  drugs: ["capecitabine", "capox", "pegylated-liposomal-doxorubicin", "sorafenib", "regorafenib", "cabozantinib", "lenvatinib", "sunitinib", "tegafur-gimeracil-oteracil", "urea-cream", "lidocaine"],
  technologies: ["vitamin-b6-pyridoxine"],
  related: ["celecoxib"],
  terms: ["hand-foot-syndrome"],
  sections: ["supportive-care"],
  tags: ["protocol", "hand-foot-syndrome", "skin-toxicity", "supportive-care"],
});

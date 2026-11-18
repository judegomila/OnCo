import { protocol } from "./helpers";

/*
 * Recognising and treating an infusion reaction (allergic, anaphylactic or cytokine-release type) during anticancer
 * treatment, and deciding whether to give the drug again.
 *
 * First written on 11 November 2026. Second accuracy pass on 16 November 2026: every source was fetched again raw into
 * a scratch directory and each claim, quote and grade checked against the text (quotes by script, whitespace only).
 * - ESMO Clinical Practice Guidelines, management of infusion reactions to systemic anticancer therapy (Roselló et al.,
 *   Ann Oncol 2017; 28 suppl 4: iv100-iv118): full text, re-read on 16 November 2026. annalsofoncology.org returns 403 to
 *   a script and Europe PMC holds no full text, so the article HTML was read from the Internet Archive's capture of
 *   annalsofoncology.org (1 May 2024), stripped to text and searched. A correction notice exists (Ann Oncol 2018; 29
 *   suppl 4: iv260, doi 10.1093/annonc/mdy158): the publisher refused it, no archive capture exists, and PubMed and
 *   Europe PMC hold no text, so what it corrects is not known. No newer ESMO guideline on infusion reactions was found
 *   in Europe PMC. Grades are quoted as printed.
 * - Resuscitation Council UK, Emergency treatment of anaphylaxis: guidelines for healthcare providers (May 2021): full
 *   text of the PDF from resus.org.uk, with pdftotext, re-read on 16 November 2026. The RCUK anaphylaxis page says that
 *   day that the May 2021 version is the most recent.
 * - EAACI position paper, hypersensitivity reactions to chemotherapy (Allergy 2022; 77): abstract only, from Europe
 *   PMC, again on 16 November 2026. Wiley returns 403 to a script and there is no PubMed Central copy.
 * - ASCO-ONS administration safety standards (2024): read in full on 11 November 2026 from an Internet Archive capture
 *   (see sact-administration-checks-at-the-chair). Not readable on 16 November 2026 (ascopubs.org returned 403).
 *   Re-read in full on 17 November 2026 in the Oncology Nursing Society's open co-publication (the advance-print PDF
 *   offered on the ONS article page,
 *   Oncology Nursing Forum, July 2024, 51(4)), converted with pdftotext; a copy another checker fetched from ons.org
 *   the same day was re-used.
 *   The quote was matched by script and the standard number (3.12.7) confirmed. Corrected then: the summary cited
 *   3.12.7 for resuscitation equipment at hand, which that standard does not mention; it asks for a policy and for
 *   order sets and medicines to be accessible in time.
 * - European Medicines Agency, ranitidine referral page: read raw on 16 November 2026, for the EU suspension only.
 * - World Allergy Organization anaphylaxis guidance 2020: identified (PMC7607509), not read; not cited.
 *
 * Every DOI was resolved through Crossref and Europe PMC and its title checked. Quotes are copied from the raw text
 * with line breaks joined; where a sentence carries an inline reference, the quote stops before it.
 */
export const infusionReactionManagement = protocol({
  id: "infusion-reaction-management",
  name: "Infusion and hypersensitivity reactions during anticancer treatment: recognition, emergency treatment and rechallenge",
  aka: ["infusion reaction", "infusion-related reaction", "hypersensitivity reaction to chemotherapy", "anaphylaxis in the chemotherapy unit", "chemotherapy allergic reaction", "taxane reaction", "platinum allergy", "rituximab infusion reaction", "rechallenge after infusion reaction"],
  domain: "chemotherapy-administration",
  tldr: "Some cancer drugs can cause a reaction while they go in: flushing, itching, a rash, chills, tightness in the chest or throat, or feeling faint. Tell the nurse at once. They will stop the drip and check you; most reactions are mild and settle, and many people can then carry on more slowly. A severe allergic reaction (anaphylaxis) is treated at once with an adrenaline injection into the thigh.",
  simple: "If you feel strange, itchy, flushed, short of breath or faint during your drip, say so at once. The nurse will stop it and help you. It is common and is treated quickly.",
  summary: "ESMO (2017) is the only oncology guideline on reactions read; most of its recommendations are graded [V, C] (level V is uncontrolled studies, case reports and expert opinion; grade C is optional), and it says reactions are hard to study in prospective randomised trials because they are unexpected. Preparation: ask about allergy and atopy, check oral premedication was taken, have the protocol and resuscitation equipment at hand (ESMO [V, C]). ASCO-ONS (2024) standard 3.12.7 asks for a hypersensitivity management policy in line with current guidelines, with order sets and medicines accessible in time. Early odd sensations or an urge to pass urine or stool can precede a reaction and warrant blood pressure and pulse.\n\nManagement: stop the drug, keep the line, assess airway, breathing, circulation and consciousness, call for medical help, oxygen if needed (ESMO, each [V, C]). Anaphylaxis is treated with intramuscular adrenaline into the thigh: ESMO gives 0.01 mg/kg up to 0.5 mL of 1 mg/mL into the lateral thigh [IV, B], repeatable every 5 to 15 minutes [V, C]; Resuscitation Council UK (2021) gives 500 micrograms into the anterolateral thigh for adults and children over 12 and repeats after 5 minutes if problems persist, with IV fluids early for shock. The two differ on position: ESMO advises the Trendelenburg position for low blood pressure and sitting up for respiratory distress [V, C]; RCUK keeps the patient lying flat, with or without the legs raised, allows a semi-recumbent position if that makes breathing easier, and warns that standing, walking or sitting up suddenly can be fatal. They also differ on adjuncts: ESMO rates combined H1 and H2 antihistamines as superior to either alone [I, B], and says corticosteroids prevent biphasic reactions but are not critical, graded [V, D] (D is generally not recommended in its scheme), with a dose if they are given [V, C]; RCUK calls antihistamines third-line, for skin symptoms after stabilisation, and no longer advises corticosteroids routinely (very low-certainty evidence).\n\nCytokine-release type reactions to antibodies (rituximab, for example) are managed by stopping, symptomatic treatment and restarting at half the rate [IV, B]. Document with a CTCAE grade [V, B]. Rechallenge with a slower rate and more premedication usually succeeds [V, C], but ESMO advises against rechallenge after grade 3 or higher or true anaphylaxis [V, B]; for people whose reactions recur despite premedication it describes desensitisation in experienced centres, with varying success. ESMO advises an allergist's opinion when anaphylaxis is strongly suspected [V, B]; RCUK refers everyone with anaphylaxis to an allergy clinic and measures tryptase when the diagnosis is uncertain.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "pharmacist"],
    where: ["chemotherapy-day-unit", "ward", "home"],
  },
  population: "People receiving intravenous anticancer drugs, chemotherapy or antibodies; ESMO's guideline states no age range. ESMO's adrenaline dose is weight-based; the RCUK guideline covers adults and children with separate doses, and the dose in the steps is its dose for adults and children over 12. Cytokine release syndrome after CAR-T cells or bispecific antibodies has its own grading and treatment and is not covered here.",
  trigger: "During or soon after an infusion, the patient develops flushing, itch, rash, chills, fever, chest or back pain, breathlessness, wheeze, throat tightness, dizziness, low blood pressure, or says they feel odd.",
  steps: [
    {
      action: "Before giving any drug, ask about past reactions, allergies, atopy and current medicines",
      why: "A history of allergy, asthma or heart disease, or medicines such as beta-blockers, changes the risk and how a reaction is treated.",
      source: "esmo-2017",
      quote: "Before the administration of any drug, the patient should be asked about medical history, previous allergic disorders, atopic status and concomitant treatments",
      grade: "[V, C]",
    },
    {
      action: "If premedication was to be taken by mouth, check the patient actually took it",
      why: "Some premedication is taken at home, such as the dexamethasone tablets started the day before docetaxel, so a dose can be missed without anyone knowing.",
      source: "esmo-2017",
      quote: "If premedications are to be taken orally, oncology nurses should check that the patient has actually taken them",
      grade: "[V, C]",
    },
    {
      action: "Keep the reaction protocol, the drugs and the resuscitation equipment within reach before starting",
      why: "Anaphylaxis needs treatment within minutes; there is no time to fetch things.",
      source: "esmo-2017",
      quote: "An updated protocol for the management of IRs should be at hand as well as the medical equipment needed for resuscitation",
      grade: "[V, C]",
    },
    {
      action: "Take it seriously when a patient says they feel odd, or suddenly needs to pass urine or open their bowels, and check blood pressure and pulse",
      why: "These feelings can come just before a reaction becomes obvious.",
      source: "esmo-2017",
      quote: "Those symptoms should be taken seriously and the patient should be evaluated by measuring blood pressure and pulse rate",
      grade: "[V, C]",
    },
    {
      action: "Stop the infusion at once, keep the intravenous line in, and call for help",
      why: "Stopping the drug limits the dose that causes the reaction, and the line is needed for fluids and drugs.",
      source: "esmo-2017",
      quote: "Stop the administration of medication",
      grade: "[V, C]",
    },
    {
      action: "Assess airway, breathing, circulation and consciousness; keep the patient lying flat, or half sitting (semi-recumbent) if that makes breathing easier, and do not let them stand, walk or sit up suddenly",
      why: "In anaphylaxis, sitting or standing up suddenly can make the circulation collapse. ESMO words the position differently: head down (Trendelenburg) for low blood pressure and sitting up for respiratory distress [V, C].",
      source: "rcuk-2021",
      quote: "Changes in posture from supine to standing or sitting upright have been associated with cardiovascular collapse and death during anaphylaxis.",
    },
    {
      action: "If it is anaphylaxis, give adrenaline into the muscle of the outer thigh (adults and children over 12: 500 micrograms, 0.5 mL of 1 mg/mL), and repeat after 5 minutes if airway, breathing or circulation problems persist",
      why: "RCUK calls adrenaline the most important drug in anaphylaxis: it opens the airways and reverses the fall in blood pressure. It seems to work best given early, and delay is associated with longer reactions, low blood pressure and deaths.",
      source: "rcuk-2021",
      quote: "Repeat IM adrenaline after 5 minutes if Airway/Breathing/Circulation problems persist.",
    },
    {
      action: "Give intravenous fluid early if blood pressure is low or there is shock",
      why: "Anaphylaxis makes blood vessels leak, so the circulation needs filling quickly.",
      source: "rcuk-2021",
      quote: "IV fluids are recommended for refractory anaphylaxis, and must be given early if hypotension or shock is present.",
    },
    {
      action: "Do not give antihistamines or steroids ahead of adrenaline; once the patient is stable, a non-sedating antihistamine by mouth can treat skin symptoms such as hives",
      why: "Antihistamines help the skin but do nothing for the life-threatening part of the reaction, and giving them first can delay adrenaline.",
      source: "rcuk-2021",
      quote: "Antihistamines are considered a third-line intervention and should not be used to treat Airway/Breathing/Circulation problems during initial emergency treatment.",
    },
    {
      action: "For a cytokine-release type reaction to an antibody, stop briefly, treat the symptoms, then restart at half the rate and increase as tolerated",
      why: "These reactions are typically seen with the first treatment with an antibody, in the first hours after the infusion; most are mild to moderate, and a reaction becomes less likely with each later course.",
      source: "esmo-2017",
      quote: "After resolution of symptoms, the infusion can be restarted at half the rate and titrated to tolerance",
      grade: "[IV, B]",
    },
    {
      action: "If the diagnosis of anaphylaxis is uncertain, take blood for mast cell tryptase",
      why: "A raised tryptase can help confirm afterwards that the reaction was anaphylaxis. Taking the sample must not delay treatment.",
      source: "rcuk-2021",
      quote: "Mast cell tryptase should be measured in all patients with suspected anaphylaxis where the diagnosis is uncertain.",
    },
    {
      action: "After a severe reaction, observe closely; ESMO advises 24 hours",
      why: "Symptoms can come back hours later.",
      source: "esmo-2017",
      quote: "After a severe reaction, close observation for 24 h is recommended",
      grade: "[V, C]",
    },
    {
      action: "Record the reaction with its CTCAE grade, the pre-infusion assessment and what was given",
      why: "The grade and the record decide whether, and how, the drug is given next time.",
      source: "esmo-2017",
      quote: "Accurate documentation of the IR episode is critical, and should include pre-infusion assessments, an appropriate description and grading of the IR (according to accepted classifications such as CTCAE) and how it was managed",
      grade: "[V, B]",
    },
    {
      action: "Do not rechallenge after a grade 3 or higher reaction or true anaphylaxis; after milder reactions, restart slower with extra premedication",
      why: "ESMO says rechallenge at a slower rate with more premedication is usually successful once all symptoms have resolved [V, C], and that it should not be attempted after a severe reaction or true anaphylaxis.",
      source: "esmo-2017",
      quote: "However, rechallenge in IRs with CTCAE severity grade 3 or higher or in true anaphylaxis should not be attempted",
      grade: "[V, B]",
    },
    {
      action: "Refer anyone who had anaphylaxis to an allergy clinic",
      why: "The clinic investigates the cause, so the risk of another reaction can be reduced. ESMO also says an allergist's opinion is warranted when anaphylaxis is strongly suspected [V, B].",
      source: "rcuk-2021",
      quote: "All patients should be referred to a specialist clinic for allergy assessment.",
    },
  ],
  bestInClass: {
    statement: "Prepare (history, premedication taken, protocol and equipment at hand), stop the drug at the first sign, assess ABC, and give intramuscular adrenaline promptly for anaphylaxis (ESMO 2017 [IV, B]; RCUK 2021), repeated after 5 minutes if airway, breathing or circulation problems persist (RCUK; ESMO says every 5 to 15 minutes [V, C]), with early IV fluids for shock. The guidelines differ on position (RCUK: flat, or semi-recumbent if breathing is easier, and no sudden sitting or standing; ESMO: Trendelenburg for low blood pressure, sitting up for respiratory distress [V, C]) and on adjuncts: ESMO 2017 rates combined H1 and H2 antihistamines above either alone [I, B] and says corticosteroids prevent biphasic reactions but are not critical [V, D], while RCUK 2021, developed later with GRADE methods, makes antihistamines third-line for skin symptoms after stabilisation and no longer advises corticosteroids routinely. Restart antibody cytokine-release reactions at half rate [IV, B]; grade and document [V, B]; no rechallenge after grade 3 or more or true anaphylaxis [V, B].",
    sources: ["esmo-2017", "rcuk-2021", "asco-ons-2024"],
  },
  variants: [
    {
      name: "ESMO adjuncts: H1 plus H2 antihistamine and corticosteroids",
      differs: "An H1 antihistamine (diphenhydramine 1 to 2 mg/kg or 25 to 50 mg, slowly intravenously) may be given with an H2 antagonist (ranitidine 50 mg intravenously over 5 minutes) and, if corticosteroids are given, the intravenous dose is the equivalent of 1 to 2 mg/kg of (methyl)prednisolone every 6 hours, as part of reaction treatment.",
      evidence: "ESMO grades the superiority of combined antihistamines [I, B], the doses [V, C], and the statement that corticosteroids are effective in preventing biphasic reactions but not critical [V, D]. RCUK (2021) says there is little evidence that corticosteroids prevent biphasic reactions, notes emerging data linking early steroids to more intensive care admission, and no longer advises them routinely, on very low-certainty evidence; it considers them after initial resuscitation for refractory reactions or ongoing asthma or shock. ESMO names ranitidine as the H2 antagonist to give; the European Medicines Agency confirmed in September 2020 its recommendation to suspend all ranitidine medicines in the EU because of an impurity (NDMA).",
      sources: ["esmo-2017", "rcuk-2021", "ema-ranitidine-2020"],
    },
    {
      name: "Desensitisation instead of stopping the drug for good",
      differs: "For patients whose reactions recur despite premedication, the drug is given again starting from a small diluted dose with a long infusion and stepwise increases, in an experienced centre, for every course.",
      evidence: "ESMO notes desensitisation has been used with certain drugs with varying success, gives tolerance only while exposure continues, has no standard protocol and is not widely accepted because it takes time; its drug tables add 'Consider desensitisation' [IV, B] for several chemotherapy drugs. The EAACI position paper (2022) covers skin tests, drug provocation and desensitisation for chemotherapy reactions; only its abstract was read.",
      sources: ["esmo-2017", "eaaci-2022"],
    },
    {
      name: "Skin testing before re-exposure to carboplatin",
      differs: "Uses a skin test to judge the risk of a severe reaction before carboplatin is given again.",
      evidence: "ESMO says a negative skin test seems to predict, with reasonable reliability, the absence of a severe reaction at the next infusion; EAACI's recommendations on skin tests could not be read beyond the abstract.",
      sources: ["esmo-2017", "eaaci-2022"],
    },
  ],
  grades: [
    { claim: "IM adrenaline 0.01 mg/kg (1 mg/mL, maximum 0.5 mL) into the lateral thigh for anaphylaxis", grade: "[IV, B]", source: "esmo-2017", quote: "When a patient fulfils any of the three criteria of anaphylaxis (see Table 2), epinephrine (adrenaline) must be delivered immediately at a dose of 0.01 mg/kg (1 mg/mL dilution, to a maximum total dose of 0.5 mL) intramuscularly into the lateral thigh muscle" },
    { claim: "Adrenaline may be repeated every 5 to 15 minutes", grade: "[V, C]", source: "esmo-2017" },
    { claim: "Combined H1 and H2 antagonists are superior to either alone", grade: "[I, B]", source: "esmo-2017", quote: "Antihistamines: the combined use of H1 and H2 antagonists is superior to the use of H1 (diphenhydramine) or H2 antagonists (ranitidine, cimetidine) alone" },
    { claim: "Corticosteroids prevent biphasic reactions but are not critical", grade: "[V, D]", source: "esmo-2017", quote: "Corticosteroids are effective in preventing biphasic reactions, but are not critical in the management of anaphylaxis" },
    { claim: "Corticosteroids no longer advised for routine emergency treatment of anaphylaxis", grade: "very low-certainty evidence (GRADE)", source: "rcuk-2021", quote: "Corticosteroids (e.g. hydrocortisone) are no longer advised for the routine emergency treatment of anaphylaxis." },
    { claim: "Restart at half the rate after a cytokine-release type reaction resolves", grade: "[IV, B]", source: "esmo-2017" },
    { claim: "No rechallenge after CTCAE grade 3 or higher or true anaphylaxis", grade: "[V, B]", source: "esmo-2017" },
    { claim: "Rechallenge after milder reactions with a slower rate and more premedication", grade: "[V, C]", source: "esmo-2017", quote: "After all symptoms have resolved, rechallenge with a reduced infusion rate and additional premedication (such as corticosteroids and antihistamines) is usually successful" },
    { claim: "Hypersensitivity order sets and medications accessible in time", grade: "Standard (not graded)", source: "asco-ons-2024", quote: "Hypersensitivity order sets and medications are accessible within the appropriate timeframe for optimal treatment" },
  ],
  sources: [
    {
      key: "esmo-2017",
      label: "Management of infusion reactions to systemic anticancer therapy: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology, Roselló et al.)",
      year: 2017,
      url: "https://doi.org/10.1093/annonc/mdx216",
      doi: "10.1093/annonc/mdx216",
      gradingScheme: "[level, grade]: levels I (large randomised trial or meta-analysis) to V (studies without control group, case reports, expert opinion); grades A (strongly recommended) to E (never recommended), adapted from the IDSA/USPHS system.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "esmo-2018-correction",
      label: "Corrections to 'Management of infusion reactions to systemic anticancer therapy: ESMO Clinical Practice Guidelines' (Ann Oncol 2018; 29 suppl 4: iv260)",
      publisher: "ESMO (Annals of Oncology)",
      year: 2018,
      url: "https://doi.org/10.1093/annonc/mdy158",
      doi: "10.1093/annonc/mdy158",
      read: "not-reachable",
      accessed: "2026-11-16",
    },
    {
      key: "rcuk-2021",
      label: "Emergency treatment of anaphylaxis: guidelines for healthcare providers (May 2021)",
      publisher: "Resuscitation Council UK",
      year: 2021,
      url: "https://www.resus.org.uk/sites/default/files/2021-05/Emergency%20Treatment%20of%20Anaphylaxis%20May%202021_0.pdf",
      gradingScheme: "Developed with GRADE Evidence to Decision frameworks (GRADE-ADOLOPMENT). The guideline does not print a grade beside each recommendation; it states the certainty of evidence in places (very low for corticosteroids).",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "eaaci-2022",
      label: "Hypersensitivity reactions to chemotherapy: an EAACI Position Paper",
      publisher: "European Academy of Allergy and Clinical Immunology (Allergy)",
      year: 2022,
      url: "https://doi.org/10.1111/all.15113",
      doi: "10.1111/all.15113",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "asco-ons-2024",
      label: "Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology: ASCO-ONS Standards",
      publisher: "ASCO and the Oncology Nursing Society (JCO Oncology Practice)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.24.00216",
      doi: "10.1200/OP.24.00216",
      gradingScheme: "Standards are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ema-ranitidine-2020",
      label: "Ranitidine-containing medicinal products: Article 31 referral (EMA confirms recommendation to suspend all ranitidine medicines in the EU)",
      publisher: "European Medicines Agency",
      year: 2020,
      url: "https://www.ema.europa.eu/en/medicines/human/referrals/ranitidine-containing-medicinal-products",
      read: "public-summary",
      accessed: "2026-11-16",
    },
  ],
  drugs: ["paclitaxel", "docetaxel", "carboplatin", "oxaliplatin", "etoposide", "asparaginase", "pegylated-liposomal-doxorubicin", "rituximab", "cetuximab", "trastuzumab", "daratumumab"],
  terms: ["extravasation-infusion-reaction", "crs"],
  related: ["sact-administration-checks-at-the-chair", "premedication-before-reaction-prone-anticancer-drugs"],
  upgrades: [],
  gaps: [
    "The ESMO guideline dates from 2017 and most of its recommendations are graded [V, C]; on 16 November 2026 no newer ESMO guideline on infusion reactions was found. A correction notice was published in 2018 (Annals of Oncology 29, supplement 4, page iv260). On 16 November 2026 it could not be read: the journal refused a script, no archive copy exists and the indexes hold no text. So it is not known what it corrects, or whether the archived article text read here includes it. The ESMO adrenaline dose and the other ESMO figures on this page are as printed in that archived text.",
    "ESMO names ranitidine as the H2 antagonist; ranitidine medicines have been suspended in the EU since 2020 (European Medicines Agency). ESMO has not said what to use instead.",
    "ESMO and RCUK disagree on positioning, antihistamines and corticosteroids; RCUK is newer and GRADE-based but general rather than oncology-specific. Resuscitation Council UK's anaphylaxis page said on 16 November 2026 that the May 2021 version is the most recent.",
    "The ASCO-ONS standards (2024) were read in full on 17 November 2026 from the Oncology Nursing Society's open copy of the co-published text (Oncology Nursing Forum, July 2024), because the JCO Oncology Practice site refuses a script. Standard 3.12.7 and its quoted wording were confirmed there. It asks for a policy, order sets and medicines; it names no drug, dose or time limit.",
    "The EAACI position paper on chemotherapy hypersensitivity (2022), the most detailed source on skin testing and desensitisation, was read as an abstract only, again on 16 November 2026. The World Allergy Organization guidance (2020) was not read.",
    "No national nursing standard for reaction management in the chemotherapy unit (ONS, UKONS) could be read.",
    "ESMO advises 24 hours of close observation after a severe reaction [V, C] and says observation should be individualised; RCUK sets risk-stratified observation times (from 2 hours to at least 12 hours) for anaphylaxis in general. Neither addresses the day unit specifically.",
  ],
});

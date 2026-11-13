import { protocol } from "./helpers";

/*
 * Recognising and treating an infusion reaction (allergic, anaphylactic or cytokine-release type) during anticancer
 * treatment, and deciding whether to give the drug again.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - ESMO Clinical Practice Guidelines, management of infusion reactions to systemic anticancer therapy (Roselló et al.,
 *   Ann Oncol 2017; 28 suppl 4): full text. The publisher's pages refuse a script and Europe PMC holds no full text, so
 *   the article HTML was read from the Internet Archive's capture of annalsofoncology.org (1 May 2024), stripped to
 *   text and searched. No newer ESMO guideline on infusion reactions was found. Grades are quoted as printed.
 * - Resuscitation Council UK, Emergency treatment of anaphylaxis: guidelines for healthcare providers (May 2021): full
 *   text of the PDF from resus.org.uk, with pdftotext.
 * - EAACI position paper, hypersensitivity reactions to chemotherapy (Allergy 2022): abstract only.
 * - ASCO-ONS administration safety standards (2024): full text (see sact-administration-checks-at-the-chair); cited for
 *   the requirement that reaction drugs and order sets are at hand.
 * - World Allergy Organization anaphylaxis guidance 2020: identified (PMC7607509), not read; not cited.
 *
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text with
 * line breaks joined; where a sentence carries an inline reference, the quote stops before it.
 */
export const infusionReactionManagement = protocol({
  id: "infusion-reaction-management",
  name: "Infusion and hypersensitivity reactions during anticancer treatment: recognition, emergency treatment and rechallenge",
  aka: ["infusion reaction", "infusion-related reaction", "hypersensitivity reaction to chemotherapy", "anaphylaxis in the chemotherapy unit", "chemotherapy allergic reaction", "taxane reaction", "platinum allergy", "rituximab infusion reaction", "rechallenge after infusion reaction"],
  domain: "chemotherapy-administration",
  tldr: "Some cancer drugs can cause a reaction while they go in: flushing, itching, a rash, chills, tightness in the chest or throat, or feeling faint. Tell the nurse at once. They will stop the drip and check you; most reactions are mild and settle, and many people can then carry on more slowly. A severe allergic reaction (anaphylaxis) is treated at once with an adrenaline injection into the thigh.",
  simple: "If you feel strange, itchy, flushed, short of breath or faint during your drip, say so at once. The nurse will stop it and help you. It is common and is treated quickly.",
  summary: "ESMO (2017) is the only oncology guideline read; it is mostly graded [V, C] (expert opinion), because reactions are unpredictable and hard to study in trials. Preparation: ask about allergy and atopy, check oral premedication was taken, have the protocol and resuscitation equipment at hand (ESMO [V, C]; ASCO-ONS 2024 standard 3.12.7). Early odd sensations or an urge to pass urine or stool can precede a reaction and warrant blood pressure and pulse.\n\nManagement: stop the drug, keep the line, assess airway, breathing, circulation and consciousness, call for help, oxygen if needed. Anaphylaxis is treated with intramuscular adrenaline into the anterolateral thigh: ESMO gives 0.01 mg/kg up to 0.5 mL of 1 mg/mL [IV, B], repeatable every 5 to 15 minutes [V, C]; Resuscitation Council UK (2021) gives 500 micrograms for adults and repeats after 5 minutes if problems persist, with IV fluids early for shock. The two differ on adjuncts: ESMO recommends H1 plus H2 antihistamines [I, B] and allows corticosteroids against biphasic reactions [V, D]; RCUK calls antihistamines third-line, for skin symptoms after stabilisation, and no longer advises corticosteroids routinely (very low-certainty evidence). RCUK keeps the patient supine and warns against sudden sitting or standing.\n\nCytokine-release type reactions to antibodies (rituximab, for example) are managed by stopping, symptomatic treatment and restarting at half the rate [IV, B]. Document with a CTCAE grade [V, B]. Rechallenge with a slower rate and more premedication usually succeeds [V, C], but ESMO advises against rechallenge after grade 3 or higher or true anaphylaxis [V, B]; desensitisation in experienced centres is the alternative. RCUK refers everyone with anaphylaxis to an allergy clinic and measures tryptase when the diagnosis is uncertain.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "pharmacist"],
    where: ["chemotherapy-day-unit", "ward", "home"],
  },
  population: "Adults receiving intravenous anticancer drugs, chemotherapy or antibodies. ESMO's adrenaline dose is weight-based; the RCUK guideline covers adults and children with separate doses. Cytokine release syndrome after CAR-T cells or bispecific antibodies has its own grading and treatment and is not covered here.",
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
      why: "A missed steroid dose before a taxane, for example, raises the chance of a reaction.",
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
      action: "Assess airway, breathing, circulation and consciousness; keep the patient lying flat, or sitting if breathing is easier, and do not let them stand or sit up suddenly",
      why: "In anaphylaxis, sitting or standing up suddenly can make blood pressure collapse.",
      source: "rcuk-2021",
      quote: "Changes in posture from supine to standing or sitting upright have been associated with cardiovascular collapse and death during anaphylaxis.",
    },
    {
      action: "If it is anaphylaxis, give adrenaline into the muscle of the outer thigh (adult 500 micrograms, 0.5 mL of 1 mg/mL), and repeat after 5 minutes if breathing or circulation problems persist",
      why: "Adrenaline is the only drug that reverses the airway swelling, wheeze and collapse of anaphylaxis; delay is the main avoidable cause of death.",
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
      action: "Do not let antihistamines or steroids delay adrenaline; once the patient is stable, a non-sedating antihistamine can treat itch and hives",
      why: "Antihistamines help the skin but do nothing for the life-threatening part of the reaction.",
      source: "rcuk-2021",
      quote: "Antihistamines are considered a third-line intervention and should not be used to treat Airway/Breathing/Circulation problems during initial emergency treatment.",
    },
    {
      action: "For a cytokine-release type reaction to an antibody, stop briefly, treat the symptoms, then restart at half the rate and increase as tolerated",
      why: "These reactions, common with the first dose of drugs such as rituximab, usually settle and become milder with later doses.",
      source: "esmo-2017",
      quote: "After resolution of symptoms, the infusion can be restarted at half the rate and titrated to tolerance",
      grade: "[IV, B]",
    },
    {
      action: "If the diagnosis of anaphylaxis is uncertain, take blood for mast cell tryptase",
      why: "A raised tryptase supports the diagnosis, which matters for deciding whether the drug can ever be given again.",
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
      why: "After a mild reaction most people can continue safely; after anaphylaxis the next dose could be fatal unless given by a specialist desensitisation.",
      source: "esmo-2017",
      quote: "However, rechallenge in IRs with CTCAE severity grade 3 or higher or in true anaphylaxis should not be attempted",
      grade: "[V, B]",
    },
    {
      action: "Refer anyone who had anaphylaxis to an allergy clinic",
      why: "Specialist testing can confirm which drug caused it and whether a desensitisation or an alternative is possible.",
      source: "rcuk-2021",
      quote: "All patients should be referred to a specialist clinic for allergy assessment.",
    },
  ],
  bestInClass: {
    statement: "Prepare (history, premedication taken, protocol and equipment at hand), stop the drug at the first sign, assess ABC, and give intramuscular adrenaline promptly for anaphylaxis, repeated after 5 minutes if needed (RCUK 2021; ESMO 2017 [IV, B]), with early IV fluids for shock and the patient kept flat. The guidelines disagree on adjuncts: ESMO 2017 recommends combined H1 and H2 antihistamines [I, B] and allows corticosteroids against biphasic reactions [V, D], while RCUK 2021, developed later with GRADE methods, makes antihistamines third-line for skin symptoms after stabilisation and no longer advises corticosteroids routinely. Restart antibody cytokine-release reactions at half rate [IV, B]; grade and document [V, B]; no rechallenge after grade 3 or more or anaphylaxis except by desensitisation [V, B].",
    sources: ["esmo-2017", "rcuk-2021", "asco-ons-2024"],
  },
  variants: [
    {
      name: "ESMO adjuncts: H1 plus H2 antihistamine and corticosteroids",
      differs: "Gives an H1 antihistamine (diphenhydramine) with an H2 antagonist intravenously, and corticosteroids at the equivalent of 1 to 2 mg/kg of methylprednisolone every 6 hours, as part of reaction treatment.",
      evidence: "ESMO grades the combined antihistamines [I, B] and says corticosteroids are effective in preventing biphasic reactions but not critical [V, D]. RCUK (2021) found little evidence that corticosteroids prevent biphasic reactions, notes data linking early steroids to more intensive care admission, and no longer advises them routinely, on very low-certainty evidence. ESMO names ranitidine as the H2 antagonist; it has since been withdrawn in several countries.",
      sources: ["esmo-2017", "rcuk-2021"],
    },
    {
      name: "Desensitisation instead of stopping the drug for good",
      differs: "After a reaction to a drug that is still the best treatment (a platinum, a taxane or an antibody), it is given again starting from a small diluted dose with a long infusion and stepwise increases, in an experienced centre, for every course.",
      evidence: "ESMO notes desensitisation has been used with varying success, gives tolerance only while exposure continues, and has no standard protocol. The EAACI position paper (2022) covers skin tests, drug provocation and desensitisation for chemotherapy reactions; only its abstract was read.",
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
    { claim: "IM adrenaline 0.01 mg/kg (1 mg/mL, maximum 0.5 mL) into the lateral thigh for anaphylaxis", grade: "[IV, B]", source: "esmo-2017", quote: "When a patient fulfils any of the three criteria of anaphylaxis (see Table 2 ), epinephrine (adrenaline) must be delivered immediately at a dose of 0.01 mg/kg (1 mg/mL dilution, to a maximum total dose of 0.5 mL) intramuscularly into the lateral thigh muscle" },
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
      accessed: "2026-11-11",
    },
    {
      key: "rcuk-2021",
      label: "Emergency treatment of anaphylaxis: guidelines for healthcare providers (May 2021)",
      publisher: "Resuscitation Council UK",
      year: 2021,
      url: "https://www.resus.org.uk/sites/default/files/2021-05/Emergency%20Treatment%20of%20Anaphylaxis%20May%202021_0.pdf",
      gradingScheme: "Developed with GRADE Evidence to Decision frameworks (GRADE-ADOLOPMENT); certainty of evidence high, moderate, low or very low.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "eaaci-2022",
      label: "Hypersensitivity reactions to chemotherapy: an EAACI Position Paper",
      publisher: "European Academy of Allergy and Clinical Immunology (Allergy)",
      year: 2022,
      url: "https://doi.org/10.1111/all.15113",
      doi: "10.1111/all.15113",
      read: "abstract",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
  ],
  drugs: ["paclitaxel", "docetaxel", "carboplatin", "oxaliplatin", "etoposide", "asparaginase", "pegylated-liposomal-doxorubicin", "rituximab", "cetuximab", "trastuzumab", "daratumumab"],
  terms: ["extravasation-infusion-reaction", "crs"],
  related: ["sact-administration-checks-at-the-chair", "premedication-before-reaction-prone-anticancer-drugs"],
  upgrades: [],
  gaps: [
    "The ESMO guideline dates from 2017 and most of its recommendations are expert opinion ([V, C]); no newer ESMO guideline on infusion reactions was found. Some drugs it names have changed since (ranitidine withdrawn in several countries).",
    "ESMO and RCUK disagree on antihistamines and corticosteroids; RCUK is newer and GRADE-based but general rather than oncology-specific.",
    "The EAACI position paper on chemotherapy hypersensitivity (2022), the most detailed source on skin testing and desensitisation, was read as an abstract only. The World Allergy Organization guidance (2020) was not read.",
    "No national nursing standard for reaction management in the chemotherapy unit (ONS, UKONS) could be read.",
    "ESMO advises 24 hours of observation after a severe reaction; RCUK sets risk-stratified observation times (from 2 hours to at least 12 hours) for anaphylaxis in general. Neither addresses the day unit specifically.",
  ],
});

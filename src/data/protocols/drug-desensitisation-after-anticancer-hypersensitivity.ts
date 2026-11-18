import { protocol } from "./helpers";

/*
 * Rapid drug desensitisation, so that a person who has had an allergic reaction to a platinum, a taxane or a monoclonal
 * antibody can keep receiving it.
 *
 * First written on 11 November 2026. Second accuracy pass on 16 November 2026: every source was fetched again as raw
 * text and every claim re-read against it; quotes were checked by script (whitespace and line-break hyphenation
 * normalised, nothing else).
 * - Drug allergy: A 2022 practice parameter update (AAAAI/ACAAI Joint Task Force on Practice Parameters; Khan et al.,
 *   J Allergy Clin Immunol 2022, DOI 10.1016/j.jaci.2022.08.028): full text of the authors' accepted manuscript, PDF
 *   from the Murdoch University research repository (located through OpenAlex; the publisher PDF answered 403 to a
 *   script), converted with pdftotext. Only page furniture was stripped before quotes were checked: the manuscript's
 *   printed line numbers, the 'Journal Pre-proof' watermark (which comes out as stray one to three letter fragments)
 *   and the marginal stamp 'Postsubmission revision, September 7, 2022'. The consensus-based statements are now quoted
 *   from the body of the document, where each prints its strength and certainty, rather than from the 'what is new'
 *   list at the front. Table XXV (an example one-bag schedule) is scrambled by the watermark and is not used.
 * - ESMO Clinical Practice Guidelines, management of infusion reactions to systemic anticancer therapy (Roselló et al.,
 *   Ann Oncol 2017, DOI 10.1093/annonc/mdx216): full text, from the Internet Archive capture of the Annals of Oncology
 *   page that the checker of infusion-reaction-management saved on 16 November 2026 (re-used, not fetched twice). The
 *   drug table is flattened in that text, so cell boundaries cannot be seen. A correction was published in 2018
 *   (DOI 10.1093/annonc/mdy158); its text could not be read.
 * - Hypersensitivity reactions to chemotherapy: an EAACI Position Paper (Pagani et al., Allergy 2022, DOI
 *   10.1111/all.15113): abstract only, from Europe PMC; the only open copy is a submitted preprint, not used.
 * - Castells et al., 413 desensitisations (J Allergy Clin Immunol 2008, DOI 10.1016/j.jaci.2008.02.044): abstract
 *   only, from Europe PMC; the publisher PDF answered 403.
 * - Zwimpfer et al., desensitisation in gynaecological cancers (Cancer Med 2024, DOI 10.1002/cam4.6840): full text,
 *   Europe PMC XML (PMC10807606). It was read as an abstract in the first pass.
 * - Torres Górriz et al., rapid versus same-day desensitisation (Front Allergy 2026, DOI 10.3389/falgy.2026.1751512):
 *   full text, Europe PMC XML (PMC12992279). It was read as an abstract in the first pass.
 *
 * Every DOI was resolved through Europe PMC and Crossref and its title checked. Europe PMC was searched for a newer
 * edition of each guideline; none was found.
 */
export const drugDesensitisationAfterAnticancerHypersensitivity = protocol({
  id: "drug-desensitisation-after-anticancer-hypersensitivity",
  name: "Rapid drug desensitisation after an allergic reaction to a platinum, taxane or antibody",
  aka: ["chemotherapy desensitization", "rapid drug desensitisation", "RDD", "carboplatin desensitisation", "paclitaxel desensitisation", "12-step desensitization", "3-bag protocol", "rituximab desensitisation", "carboplatin allergy"],
  domain: "chemotherapy-administration",
  tldr: "If you have had a true allergic reaction to a cancer drug that is still your best treatment, allergy specialists can often give it again safely by desensitisation: starting with a tiny, very diluted dose and building up slowly over several hours, under close watch. The protection lasts only while the drug is in your body, so it is repeated at every treatment.",
  simple: "After an allergic reaction to a cancer drug, you may still be able to have it by starting with tiny amounts and building up slowly, under close watch, at every treatment.",
  summary: "After a presumed hypersensitivity reaction to chemotherapy, the choices are desensitisation, skin testing to stratify risk, risk stratification and a drug challenge without testing, or avoiding the drug if an equally effective alternative exists (AAAAI/ACAAI practice parameter 2022). The first task is phenotyping. Reactions that are not immediate, or whose history does not fit hypersensitivity, may be managed with slower infusion, graded dose escalation or premedication without desensitisation; for immediate reactions, desensitisation may be performed when the drug is the preferred therapy (both conditional, low certainty). Candidates include type I (mast-cell or IgE-mediated) reactions, including anaphylaxis. Empiric desensitisation is described as reasonable and safe even without skin testing, though with limited evidence; for platinums, skin testing can stratify risk and show when desensitisation is unnecessary; for antibodies, desensitisation should be considered when the drug is the preferred therapy. Severe delayed, T-cell mediated reactions are typically not amenable to desensitisation.\n\nOncology guidance is more cautious. ESMO (2017) says rechallenge, which it describes as restarting at a reduced rate with additional premedication, should not be attempted after a CTCAE grade 3 or higher reaction or true anaphylaxis [V, B]. It says desensitisation has been used for recurrent reactions despite premedication, for certain drugs, with varying success in experienced centres, and that no standard protocol exists; its drug table still lists 'Consider desensitisation' [IV, B] for six drugs. The method gives an initial small, diluted dose over a prolonged infusion with gradual escalation; tolerance is temporary, so it is repeated at every course. The practice parameter says protocols can last several hours, with the dose doubling every 15 to 20 minutes, usually in inpatient units or infusion centres with trained staff. The most experienced published approach, a standardised 12-step protocol, reported 413 desensitisations in 98 patients: 94% brought mild or no reactions, none was life-threatening and nobody died. One-bag protocols appear similarly safe, with less data after severe reactions. In a Swiss cohort of 241 people with gynaecological cancers, the 25 who were desensitised after a platinum or taxane reaction had overall survival comparable to those with no reaction.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "multidisciplinary-team"],
    where: ["chemotherapy-day-unit", "ward", "intensive-care", "outpatient-clinic"],
  },
  population: "People with cancer who have had an immediate hypersensitivity reaction to a platinum (carboplatin, cisplatin, oxaliplatin), a taxane or a monoclonal antibody that remains their preferred treatment. Delayed reactions and severe skin reactions are outside this protocol: the practice parameter says severe T-cell mediated delayed reactions are typically not amenable to desensitisation. The sources read do not address children separately for anticancer drugs.",
  trigger: "A person has had an infusion or hypersensitivity reaction to an anticancer drug and further doses are planned.",
  steps: [
    {
      action: "Decide what kind of reaction it was: an immediate allergic (type I, mast-cell or IgE) reaction, or one that was not immediate or does not fit the picture of allergy",
      why: "Reactions of the second kind may be managed with a slower drip, stepped doses or premedication, without desensitisation.",
      source: "jtf-2022",
      quote: "We suggest that patients with non-immediate reactions or a history of reactions inconsistent with chemotherapeutic hypersensitivity may be treated with a slowed infusion rate, graded dose escalation, and/or pre-medications without desensitization.",
      grade: "Conditional; certainty of evidence: low",
    },
    {
      action: "After a grade 3 or higher reaction or true anaphylaxis, do not rechallenge by simply restarting the drug",
      why: "ESMO describes rechallenge as restarting at a reduced rate with extra premedication once symptoms have settled. It says this usually succeeds after milder reactions and should not be attempted after severe ones.",
      source: "esmo-2017",
      quote: "Rechallenge in IRs with CTCAE severity grade 3 or higher or in true anaphylaxis should not be attempted [V, B].",
      grade: "[V, B]",
    },
    {
      action: "Weigh up the four approaches: desensitisation, skin testing, risk stratification with a drug challenge, or an equally effective alternative drug",
      why: "The practice parameter says each approach has advantages and disadvantages.",
      source: "jtf-2022",
      quote: "The main approaches to care after a presumed hypersensitivity reaction (HSR) to a chemotherapeutic include (1) desensitization, (2) skin testing to assist with risk stratification, (3) risk stratification without skin testing and drug challenge or (4) avoidance of the offending agent if an equally efficacious alternative exists.",
    },
    {
      action: "For an immediate reaction to chemotherapy, consider desensitisation when the drug is the preferred therapy",
      why: "Desensitisation lets people receive first-line treatment when there is no reasonable alternative. Candidates include people with type I reactions, including anaphylaxis.",
      source: "jtf-2022",
      quote: "We suggest that in patients with immediate reactions to chemotherapeutics a drug desensitization may be performed when the implicated drug is the preferred therapy.",
      grade: "Conditional; certainty of evidence: low",
    },
    {
      action: "Where skin testing is not possible, desensitise on the clinical history alone",
      why: "Many centres cannot skin test with chemotherapy drugs. The practice parameter calls this empiric approach safe, and adds that the evidence for it is limited.",
      source: "jtf-2022",
      quote: "If the clinical assessment is consistent with a HSR, then empiric desensitization is a reasonable and safe approach to care and can be performed even when skin testing is not possible (i.e., outpatient clinic without access to chemotherapy drugs for skin testing).",
    },
    {
      action: "For platinum reactions, consider skin testing to stratify risk, without delaying treatment; it can show that desensitisation is not needed",
      why: "Some people with a reaction history are not truly allergic and can be treated more simply. The practice parameter reports that up to 8.5% of people with a negative carboplatin skin test still react at the next dose, so a negative test is not a guarantee.",
      source: "jtf-2022",
      quote: "Skin testing may be useful in the management of patients with platin HSRs and also identifies cases where desensitization may be unnecessary despite a clinical history suggestive of an HSR.",
    },
    {
      action: "Give the drug by a stepwise protocol: a small, diluted first dose over a long infusion, increasing gradually to the full dose",
      why: "Building up gradually brings about a tolerance to the drug that is only temporary.",
      source: "esmo-2017",
      quote: "In desensitisation protocols, an initial small diluted dose of the agent with a prolonged infusion time and gradual escalation of the dose is administered.",
    },
    {
      action: "Carry it out where trained staff are present, usually an inpatient unit or an infusion centre, and allow several hours",
      why: "Reactions during desensitisation do happen. In the largest early series the first desensitisations were done in intensive care, most reactions came during the first desensitisation, and they were most often reported at the last step (Castells 2008). ESMO speaks of experienced centres.",
      source: "jtf-2022",
      quote: "Drug desensitization protocols for chemotherapeutics can last several hours with dose doubling every 15-20 minutes and are usually performed in inpatient units or infusion centers with trained staff.",
    },
    {
      action: "Repeat the desensitisation for every course of the drug",
      why: "The tolerance is lost once the drug has cleared from the body; the person is still allergic.",
      source: "esmo-2017",
      quote: "Patients remain allergic to the drug and must be desensitised for every course of treatment.",
    },
    {
      action: "For an immediate reaction to a monoclonal antibody, consider desensitisation when that antibody is the preferred therapy",
      why: "The antibody that caused the reaction often has no therapeutic equivalent. For rituximab, the practice parameter says desensitisation should be done under the guidance of experienced staff who can manage allergic reactions.",
      source: "jtf-2022",
      quote: "We suggest that for patients with immediate reactions or a history consistent with anaphylaxis to mAbs drug desensitization should be considered when the implicated drug is the preferred therapy.",
      grade: "Conditional; certainty of evidence: low",
    },
  ],
  bestInClass: {
    statement: "Phenotype the reaction first. Manage reactions that are not immediate, or that do not fit hypersensitivity, with slower infusion, graded escalation or premedication; for immediate reactions, including anaphylaxis, consider desensitisation when the drug is the preferred therapy, with skin testing as an option for platinums, by trained staff, repeated at every course (AAAAI/ACAAI 2022; each of these consensus statements is conditional, on low-certainty evidence). The guidelines differ in emphasis. The allergy practice parameter calls empiric desensitisation reasonable and safe. ESMO 2017, written for oncologists, says rechallenge after grade 3 or higher reactions or true anaphylaxis should not be attempted [V, B], and that desensitisation has had varying success, with no standard protocol; yet its drug table lists 'Consider desensitisation' [IV, B] for anthracyclines, carboplatin, oxaliplatin, docetaxel, paclitaxel and etoposide. ESMO describes rechallenge as restarting at a reduced rate with extra premedication and treats desensitisation in a separate paragraph, but does not say outright whether its advice against rechallenge covers desensitisation. The EAACI position paper (2022) notes that practice still differs widely from centre to centre.",
    sources: ["jtf-2022", "esmo-2017", "castells-2008", "eaaci-2022"],
  },
  variants: [
    {
      name: "Standardised 12-step, three-bag protocol (Brigham and Women's)",
      differs: "A 12-step schedule, given intravenously or intraperitoneally, which the practice parameter describes as a three-bag protocol. The first desensitisations were done in medical intensive care and most later ones in an outpatient setting.",
      evidence: "413 desensitisations in 98 patients reacting to carboplatin, cisplatin, oxaliplatin, paclitaxel, doxorubicin (including liposomal) or rituximab: 94% brought mild or no reactions, there were no life-threatening reactions or deaths, and every patient received the full dose (Castells 2008, abstract). The practice parameter gives the other 6% as moderate to severe reactions and calls this the most experienced published approach.",
      sources: ["castells-2008", "jtf-2022", "torres-gorriz-2026"],
    },
    {
      name: "One-bag protocols",
      differs: "Uses a single bag, still in several steps; with no drug dilutions to prepare it needs less pharmacy time and is shorter.",
      evidence: "The 2022 practice parameter says increasing evidence suggests similar safety and efficacy to three-bag protocols, with more data needed after severe initial reactions. It cites one paclitaxel study in which a one-bag protocol was noninferior to a multi-bag protocol, with 98% success.",
      sources: ["jtf-2022"],
    },
    {
      name: "Same-day desensitisation after the reaction",
      differs: "Once the person is stable, gives the drug again on the day of the reaction, from the same bag, in 10 steps, where an allergist saw and treated the reaction; later courses are given by ordinary rapid desensitisation.",
      evidence: "A retrospective cohort from Castellón, Spain, of platinum and taxane reactions. Breakthrough reactions occurred in 15% of 164 desensitisations in the 44 patients whose first was same-day (a count that includes their later ordinary desensitisations), and in 24% of 406 in the 76 patients desensitised only at a later date; a Bayesian model estimated a 14.6-point lower probability in the same-day group. Only three patients reacted during the same-day procedure itself. The groups differed: the first reaction was severe in 5% of the same-day group and 22% of the other. Observational, from one group of hospitals.",
      sources: ["torres-gorriz-2026"],
    },
  ],
  grades: [
    { claim: "For immediate taxane reactions, the severity of the initial reaction may assist risk stratification and management", grade: "Conditional; certainty of evidence: low", source: "jtf-2022", quote: "We suggest that for patients with a history of immediate allergic reactions to taxane based chemotherapeutic agents, the severity of the initial HSR may assist in their risk stratification and management." },
    { claim: "Reactions to monoclonal antibodies that are not immediate, or do not fit hypersensitivity, may be managed with slowed infusion, graded escalation or premedication without desensitisation", grade: "Conditional; certainty of evidence: low", source: "jtf-2022", quote: "We suggest that patients with non-immediate reactions or a history of reactions inconsistent with mAb hypersensitivity may be treated with a slowed infusion, graded dose escalation, and/or pre-medications without desensitization." },
    { claim: "ESMO's drug table lists desensitisation as something to consider in the management of reactions to anthracyclines, carboplatin, oxaliplatin, docetaxel, paclitaxel and etoposide", grade: "[IV, B]", source: "esmo-2017", quote: "Consider desensitisation. [IV, B]" },
  ],
  sources: [
    {
      key: "jtf-2022",
      label: "Drug allergy: A 2022 practice parameter update",
      publisher: "AAAAI/ACAAI Joint Task Force on Practice Parameters (Journal of Allergy and Clinical Immunology, Khan et al.)",
      year: 2022,
      url: "https://doi.org/10.1016/j.jaci.2022.08.028",
      doi: "10.1016/j.jaci.2022.08.028",
      gradingScheme: "Consensus-based statements, each printed with a strength of recommendation (strong or conditional) and a certainty of evidence (high, moderate, low or very low). The authors borrow these words from GRADE and state that the document is not a GRADE document.",
      read: "full-text",
      accessed: "2026-11-16",
    },
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
      key: "eaaci-2022",
      label: "Hypersensitivity reactions to chemotherapy: an EAACI Position Paper",
      publisher: "European Academy of Allergy and Clinical Immunology (Allergy, Pagani et al.)",
      year: 2022,
      url: "https://doi.org/10.1111/all.15113",
      doi: "10.1111/all.15113",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "castells-2008",
      label: "Hypersensitivity reactions to chemotherapy: outcomes and safety of rapid desensitization in 413 cases",
      publisher: "Journal of Allergy and Clinical Immunology (Castells et al.)",
      year: 2008,
      url: "https://doi.org/10.1016/j.jaci.2008.02.044",
      doi: "10.1016/j.jaci.2008.02.044",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "zwimpfer-2024",
      label: "Desensitization in patients with hypersensitivity to platinum and taxane in gynecological cancers",
      publisher: "Cancer Medicine (Zwimpfer et al.)",
      year: 2024,
      url: "https://doi.org/10.1002/cam4.6840",
      doi: "10.1002/cam4.6840",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "torres-gorriz-2026",
      label: "Comparison of rapid and same-day desensitization protocols in hypersensitivity reactions to platinum and taxanes: a retrospective cohort study",
      publisher: "Frontiers in Allergy (Torres Górriz et al.)",
      year: 2026,
      url: "https://doi.org/10.3389/falgy.2026.1751512",
      doi: "10.3389/falgy.2026.1751512",
      read: "full-text",
      accessed: "2026-11-16",
    },
  ],
  drugs: ["carboplatin", "cisplatin", "oxaliplatin", "paclitaxel", "docetaxel", "rituximab"],
  terms: ["extravasation-infusion-reaction"],
  related: ["infusion-reaction-management", "premedication-before-reaction-prone-anticancer-drugs"],
  upgrades: [],
  gaps: [
    "The EAACI position paper (2022), the European allergy statement on chemotherapy reactions, was read only as an abstract; its recommendations and grades are not quoted. On 16 November 2026 the publisher's page still refused a script and the only open copy was a submitted preprint.",
    "The Castells 2008 series was read only as an abstract (on 16 November 2026 the publisher PDF answered 403), so the bag dilutions, step rates and premedication of the 12-step protocol are not given here. That it uses three bags comes from the practice parameter, not from the abstract.",
    "No randomised trial compares desensitisation with switching to an alternative drug; outcome evidence is observational and small. In the 241-patient Basel cohort only 25 people were desensitised (11 after a platinum reaction, 4 of whom had a breakthrough reaction, and 14 after a taxane reaction), and their survival was comparable to that of people with no reaction (Zwimpfer 2024).",
    "Who should be skin tested, the exact step schedules, and whether desensitisation can move from allergy units to ordinary day units are not settled by the sources read. The practice parameter's example one-bag schedule (its Table XXV) could not be read reliably from the manuscript and is not reproduced.",
    "ESMO's infusion reaction guideline dates from 2017; no newer ESMO edition was found on 16 November 2026. A correction to it was published in 2018 (DOI 10.1093/annonc/mdy158) and its text could not be read, so what it changes is not known. ESMO's drug table was read as flattened text, so whether 'Consider desensitisation' belongs to the grade 3 and 4 line of each row or to the whole management cell could not be seen.",
  ],
});

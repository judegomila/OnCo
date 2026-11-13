import { protocol } from "./helpers";

/*
 * Rapid drug desensitisation, so that a person who has had an allergic reaction to a platinum, a taxane or a monoclonal
 * antibody can keep receiving it.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - Drug allergy: A 2022 practice parameter update (AAAAI/ACAAI Joint Task Force on Practice Parameters; Khan et al.,
 *   J Allergy Clin Immunol 2022, DOI 10.1016/j.jaci.2022.08.028): full text of the authors' accepted manuscript, PDF
 *   from the Murdoch University repository found through Unpaywall (the publisher PDF refused a script). The manuscript
 *   prints line numbers and a 'Journal Pre-proof' watermark split into letters; these were stripped before quotes were
 *   checked, and nothing else was changed.
 * - ESMO Clinical Practice Guidelines, management of infusion reactions to systemic anticancer therapy (Roselló et al.,
 *   Ann Oncol 2017, DOI 10.1093/annonc/mdx216): full text, read by the first protocol agent (copy in /tmp/pf-chemo).
 * - Hypersensitivity reactions to chemotherapy: an EAACI Position Paper (Pagani et al., Allergy 2022, DOI
 *   10.1111/all.15113): abstract only; the only open copy is a submitted version, not used.
 * - Castells et al., 413 desensitisations (J Allergy Clin Immunol 2008, DOI 10.1016/j.jaci.2008.02.044): abstract only.
 * - Zwimpfer et al., desensitisation in gynaecological cancers (Cancer Med 2024, DOI 10.1002/cam4.6840): abstract only.
 * - Torres Gorriz et al., rapid versus same-day desensitisation (Front Allergy 2026, DOI 10.3389/falgy.2026.1751512):
 *   abstract only.
 *
 * Every DOI was resolved through Europe PMC and its title checked.
 */
export const drugDesensitisationAfterAnticancerHypersensitivity = protocol({
  id: "drug-desensitisation-after-anticancer-hypersensitivity",
  name: "Rapid drug desensitisation after an allergic reaction to a platinum, taxane or antibody",
  aka: ["chemotherapy desensitization", "rapid drug desensitisation", "RDD", "carboplatin desensitisation", "paclitaxel desensitisation", "12-step desensitization", "3-bag protocol", "rituximab desensitisation", "carboplatin allergy"],
  domain: "chemotherapy-administration",
  tldr: "If you have had a true allergic reaction to a cancer drug that is still your best treatment, allergy specialists can often give it again safely by desensitisation: starting with a tiny, very diluted dose and building up slowly over several hours, under close watch. The protection lasts only while the drug is in your body, so it is repeated at every treatment.",
  simple: "After an allergic reaction to a cancer drug, you may still be able to have it by starting with tiny amounts and building up slowly, under close watch, at every treatment.",
  summary: "After a hypersensitivity reaction, the choices are desensitisation, skin testing to stratify risk, risk stratification and a drug challenge without testing, or avoiding the drug if an equally effective alternative exists (AAAAI/ACAAI practice parameter 2022). The first task is phenotyping: non-IgE reactions to chemotherapy or biologics can be managed with slower infusion, graded dose escalation or premedication without desensitisation (a conditional suggestion), while candidates for desensitisation include type I (mast-cell or IgE-mediated) reactions, including anaphylaxis. Empiric desensitisation is described as reasonable and safe even without skin testing; for platinums, skin testing can stratify risk and show when desensitisation is unnecessary; for antibodies it should be considered when the drug is the preferred therapy.\n\nOncology guidance is more cautious. ESMO (2017) says rechallenge after a CTCAE grade 3 or higher reaction or true anaphylaxis should not be attempted [V, B], and that desensitisation has been used for some drugs with varying success in experienced centres, with no standard protocol. The method gives an initial small, diluted dose over a prolonged infusion with gradual escalation; tolerance is temporary, so it is repeated at every course. The best-known protocol, a standardised 12-step, three-bag regimen, gave 413 desensitisations in 98 patients with 94% mild or no reactions and no deaths. One-bag protocols appear similarly safe, with less data after severe reactions. In 241 women with gynaecological cancers, survival after desensitisation for platinum or taxane reactions was comparable to that without reactions.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "multidisciplinary-team"],
    where: ["chemotherapy-day-unit", "ward", "intensive-care", "outpatient-clinic"],
  },
  population: "Adults with cancer who have had an immediate hypersensitivity reaction to a platinum (carboplatin, cisplatin, oxaliplatin), a taxane or a monoclonal antibody that remains their preferred treatment. Delayed reactions and severe skin reactions are outside this protocol; the sources read describe desensitisation for immediate reactions. Children are less studied.",
  trigger: "A person has had an infusion or hypersensitivity reaction to an anticancer drug and further doses are planned.",
  steps: [
    {
      action: "Decide what kind of reaction it was: a true allergic (type I, mast-cell or IgE) reaction, or a non-allergic infusion reaction",
      why: "Non-allergic reactions can usually be managed by slowing the drip and premedication; desensitisation is for true allergy.",
      source: "jtf-2022",
      quote: "Suggestion that patients with non-IgE chemotherapy or biologic reactions be treated with slowed infusion rate, graded dose escalation, and/or pre-medications without desensitization",
      grade: "Suggestion",
    },
    {
      action: "After a severe reaction or anaphylaxis, do not simply give the drug again in the usual way",
      why: "A second full-speed exposure after a severe allergic reaction can be fatal.",
      source: "esmo-2017",
      quote: "Rechallenge in IRs with CTCAE severity grade 3 or higher or in true anaphylaxis should not be attempted [V, B].",
      grade: "[V, B]",
    },
    {
      action: "Choose with the person among desensitisation, skin testing, risk stratification with a drug challenge, or an equally effective alternative drug",
      why: "Each route has different risks, time costs and chances of keeping the best treatment.",
      source: "jtf-2022",
      quote: "The main approaches to care after a presumed hypersensitivity reaction (HSR) to a chemotherapeutic include (1) desensitization, (2) skin testing to assist with risk stratification, (3) risk stratification without skin testing and drug challenge or (4) avoidance of the offending agent if an equally efficacious alternative exists.",
    },
    {
      action: "Offer desensitisation for a true allergic reaction, including anaphylaxis, when the drug remains the best treatment; it can be done without skin testing",
      why: "Desensitisation lets people keep their most effective treatment instead of switching to a weaker one.",
      source: "jtf-2022",
      quote: "If the clinical assessment is consistent with a HSR, then empiric desensitization is a reasonable and safe approach to care and can be performed even when skin testing is not possible (i.e., outpatient clinic without access to chemotherapy drugs for skin testing).",
    },
    {
      action: "For platinum reactions, consider skin testing to stratify risk; it can show that desensitisation is not needed",
      why: "Some people with a reaction history are not truly allergic and can be treated more simply.",
      source: "jtf-2022",
      quote: "Skin testing may be useful in the management of patients with platin HSRs and also identifies cases where desensitization may be unnecessary despite a clinical history suggestive of an HSR.",
    },
    {
      action: "Give the drug by a stepwise protocol: a small, diluted first dose over a long infusion, increasing gradually to the full dose",
      why: "Building up slowly lets the immune cells that cause the reaction be quietened step by step.",
      source: "esmo-2017",
      quote: "In desensitisation protocols, an initial small diluted dose of the agent with a prolonged infusion time and gradual escalation of the dose is administered.",
    },
    {
      action: "Do it in a centre experienced in desensitisation, with staff and treatment for anaphylaxis at hand",
      why: "Breakthrough reactions happen, most often on the first desensitisation and the last step, and need treating at once.",
      source: "esmo-2017",
      quote: "For patients who have recurrent IRs despite premedication, desensitisation protocols have been used with certain drugs with varying success in experienced centres.",
    },
    {
      action: "Repeat the desensitisation for every course of the drug",
      why: "The tolerance wears off once the drug has cleared from the body; the person is still allergic.",
      source: "esmo-2017",
      quote: "Patients remain allergic to the drug and must be desensitised for every course of treatment.",
    },
    {
      action: "For an immediate reaction to a monoclonal antibody, consider desensitisation when that antibody is the preferred therapy",
      why: "Antibodies often have no equal alternative.",
      source: "jtf-2022",
      quote: "In contrast, for patients with immediate reactions including anaphylactic reactions to mAbs, drug desensitization should be considered when the implicated drug is the preferred therapy.",
    },
  ],
  bestInClass: {
    statement: "Phenotype the reaction first; manage non-IgE reactions with slower infusion, graded escalation or premedication (AAAAI/ACAAI 2022, conditional suggestion); for true type I reactions, including anaphylaxis, offer desensitisation in an experienced centre when the drug is still the best treatment, with skin testing as an option for platinums, and repeat it at every course. The guidelines differ in emphasis: the allergy practice parameter calls empiric desensitisation reasonable and safe, while ESMO 2017, written for oncologists, says rechallenge after grade 3 or higher reactions or anaphylaxis should not be attempted [V, B] and that desensitisation has varying success, with no standard protocol. These are compatible if 'rechallenge' means re-exposure at the usual rate rather than desensitisation.",
    sources: ["jtf-2022", "esmo-2017", "castells-2008", "eaaci-2022"],
  },
  variants: [
    {
      name: "Standardised 12-step, three-bag protocol (Brigham and Women's)",
      differs: "Three bags of increasing concentration infused in 12 steps; the first desensitisations were done in intensive care and later ones as outpatients, intravenously or intraperitoneally.",
      evidence: "413 desensitisations in 98 patients reacting to carboplatin, cisplatin, oxaliplatin, paclitaxel, doxorubicin (including liposomal) or rituximab: 94% mild or no reactions, no life-threatening reactions or deaths, and every patient received the full dose (Castells 2008).",
      sources: ["castells-2008"],
    },
    {
      name: "One-bag protocols",
      differs: "Uses a single bag with a stepped infusion rate, which is simpler and quicker to prepare.",
      evidence: "The 2022 practice parameter says increasing evidence suggests similar safety and efficacy to three-bag protocols, with more data needed after severe initial reactions.",
      sources: ["jtf-2022"],
    },
    {
      name: "Same-day desensitisation after the reaction",
      differs: "Desensitises on the day of the initial reaction rather than at a later, planned session.",
      evidence: "A Spanish retrospective cohort (570 desensitisations in 120 patients with platinum or taxane reactions) found breakthrough reactions in 15% with same-day and 24% with planned rapid desensitisation; a Bayesian model estimated a 14.6-point lower probability with same-day. Observational and single-centre.",
      sources: ["torres-gorriz-2026"],
    },
  ],
  grades: [
    { claim: "For immediate taxane reactions, the severity of the initial reaction may assist risk stratification and management", grade: "Suggestion", source: "jtf-2022", quote: "Suggestion that for patients with immediate reactions to taxanes, the severity of the initial reaction may assist in risk stratification and management" },
    { claim: "Non-IgE reactions to monoclonal antibodies may be managed with slowed infusion, graded escalation or premedication without desensitisation", grade: "Suggestion", source: "jtf-2022", quote: "Suggestion that patients with non-IgE reactions to monoclonal antibodies (mAb) may be treated with a slowed infusion, graded dose escalation, and/or premedication without desensitization" },
  ],
  sources: [
    {
      key: "jtf-2022",
      label: "Drug allergy: A 2022 practice parameter update",
      publisher: "AAAAI/ACAAI Joint Task Force on Practice Parameters (Journal of Allergy and Clinical Immunology, Khan et al.)",
      year: 2022,
      url: "https://doi.org/10.1016/j.jaci.2022.08.028",
      doi: "10.1016/j.jaci.2022.08.028",
      gradingScheme: "Consensus-based statements, worded with GRADE terms: 'recommendation' (strong) or 'suggestion' (conditional).",
      read: "full-text",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "eaaci-2022",
      label: "Hypersensitivity reactions to chemotherapy: an EAACI Position Paper",
      publisher: "European Academy of Allergy and Clinical Immunology (Allergy, Pagani et al.)",
      year: 2022,
      url: "https://doi.org/10.1111/all.15113",
      doi: "10.1111/all.15113",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "castells-2008",
      label: "Hypersensitivity reactions to chemotherapy: outcomes and safety of rapid desensitization in 413 cases",
      publisher: "Journal of Allergy and Clinical Immunology (Castells et al.)",
      year: 2008,
      url: "https://doi.org/10.1016/j.jaci.2008.02.044",
      doi: "10.1016/j.jaci.2008.02.044",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "zwimpfer-2024",
      label: "Desensitization in patients with hypersensitivity to platinum and taxane in gynecological cancers",
      publisher: "Cancer Medicine (Zwimpfer et al.)",
      year: 2024,
      url: "https://doi.org/10.1002/cam4.6840",
      doi: "10.1002/cam4.6840",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "torres-gorriz-2026",
      label: "Comparison of rapid and same-day desensitization protocols in hypersensitivity reactions to platinum and taxanes: a retrospective cohort study",
      publisher: "Frontiers in Allergy (Torres Gorriz et al.)",
      year: 2026,
      url: "https://doi.org/10.3389/falgy.2026.1751512",
      doi: "10.3389/falgy.2026.1751512",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["carboplatin", "cisplatin", "oxaliplatin", "paclitaxel", "docetaxel", "rituximab"],
  terms: ["extravasation-infusion-reaction"],
  related: ["infusion-reaction-management", "premedication-before-reaction-prone-anticancer-drugs"],
  upgrades: [],
  gaps: [
    "The EAACI position paper (2022), the European allergy statement on chemotherapy reactions, was read only as an abstract; its recommendations and grades are not quoted.",
    "No randomised trial compares desensitisation with switching to an alternative drug; outcome evidence is observational, such as the 241-patient cohort in which survival after desensitisation matched that without reactions (Zwimpfer 2024).",
    "Who should be skin tested, the exact step schedules, and whether desensitisation can move from allergy units to ordinary day units are not settled by the sources read.",
    "ESMO's infusion reaction guideline dates from 2017; no newer ESMO edition was found.",
  ],
});

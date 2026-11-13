import { protocol } from "./helpers";

/*
 * Medicines given before an anticancer drug to prevent an infusion or hypersensitivity reaction: which drugs need
 * them, which do not, and what is given. Anti-sickness premedication is a separate subject and is not covered here.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - ESMO Clinical Practice Guidelines, management of infusion reactions to systemic anticancer therapy (Roselló et al.,
 *   Ann Oncol 2017): full text, from the Internet Archive's capture of annalsofoncology.org (1 May 2024), the publisher
 *   refusing a script. Its Tables 5 and 6 give prophylaxis drug by drug, with grades.
 * - Paclitaxel injection US prescribing information (Teva, DailyMed SPL e4be6cbf-72b9-4f7f-9b1b-459b2d35961a, published
 *   10 September 2026): full text.
 * - Docetaxel injection US prescribing information (Mylan, DailyMed SPL 2fb017fd-e55e-43ef-9024-07f2d412b37b, published
 *   5 October 2026): full text.
 *
 * Quotes are copied from the raw text with line breaks joined; where a sentence carries an inline reference, the quote
 * stops before it.
 */
export const premedicationBeforeReactionProneAnticancerDrugs = protocol({
  id: "premedication-before-reaction-prone-anticancer-drugs",
  name: "Premedication against infusion reactions before taxanes, antibodies and other reaction-prone anticancer drugs",
  aka: ["chemotherapy premedication", "taxane premedication", "paclitaxel premeds", "docetaxel dexamethasone", "rituximab premedication", "daratumumab premedication", "pre-meds before chemotherapy"],
  domain: "chemotherapy-administration",
  tldr: "Before some cancer drugs you are given other medicines, usually a steroid such as dexamethasone and an antihistamine, to lower the chance of a reaction during the drip. For docetaxel the steroid tablets start the day before, so it matters that you take them as told. Many drugs need no premedication at all.",
  simple: "Some cancer drips need tablets or injections beforehand to stop a reaction. If you were given steroid tablets to take before treatment, take them exactly as told and say if you forgot.",
  summary: "ESMO (2017) recommends premedication with corticosteroids plus antihistamines before every taxane [IV, A]. For paclitaxel it gives intravenous dexamethasone with diphenhydramine 50 mg and an H2 antagonist 30 minutes before [II, A], noting a randomised trial in which short intravenous dexamethasone matched oral dexamethasone for reactions with fewer side effects [II, A]; the US label gives oral dexamethasone 20 mg 12 and 6 hours before, with diphenhydramine and an H2 antagonist 30 to 60 minutes before. For docetaxel the label and ESMO give oral dexamethasone 8 mg twice daily for 3 days starting the day before (8 mg at 12, 3 and 1 hours before in prostate cancer), against fluid retention as well as reactions.\n\nFor platinums ESMO does not routinely recommend premedication (consider in high-risk patients; it may not prevent a reaction) [IV, B]. For antibodies it varies by drug: rituximab always with an antipyretic and antihistamine [IV, A], with glucocorticoids considered in lymphoma and CLL; cetuximab with a corticosteroid plus antihistamine [IV, B], which can stop after the second infusion if no reaction; daratumumab with an intravenous corticosteroid, an antipyretic and an antihistamine before every infusion and oral corticosteroid on the two days after [IV, B]; none recommended for trastuzumab, bevacizumab, panitumumab or atezolizumab [IV, B]. Bleomycin in lymphoma starts with two doses of 2 units or less [IV, B]. ESMO asks nurses to check that oral premedication was taken [V, C]. Severe reactions still occur despite premedication (paclitaxel 2 to 4%).",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "pharmacist", "nurse", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "ward", "home"],
  },
  population: "Adults receiving intravenous anticancer drugs. Regimens for children, for cell therapies and for bispecific antibodies with step-up dosing follow their own protocols and product labels. Premedication against nausea and vomiting is a separate protocol.",
  trigger: "A reaction-prone anticancer drug is prescribed.",
  steps: [
    {
      action: "Give every patient a corticosteroid and an antihistamine before a taxane",
      why: "Without premedication about three in ten people react to paclitaxel or docetaxel; with it, severe reactions fall to a few in a hundred.",
      source: "esmo-2017",
      quote: "All patients should receive premedication with corticosteroids plus antihistamines before taxane administration",
      grade: "[IV, A]",
    },
    {
      action: "Before paclitaxel, give dexamethasone, an H1 antihistamine such as diphenhydramine 50 mg and an H2 antagonist, 30 minutes before the infusion",
      why: "Paclitaxel reactions are mostly caused by histamine release, so blocking both histamine receptors and adding a steroid prevents most of them.",
      source: "esmo-2017",
      quote: "One dose of i.v. dexamethasone plus diphenhydramine (50 mg i.v.) and a H2 receptor antagonist (ranitidine 50 mg or cimetidine 300 mg i.v.) 30 min before paclitaxel infusion",
      grade: "[II, A]",
    },
    {
      action: "Before docetaxel, start oral dexamethasone 8 mg twice a day the day before, for 3 days (in prostate cancer, 8 mg at 12, 3 and 1 hours before)",
      why: "The steroid lowers both the risk of an allergic reaction and the fluid build-up docetaxel can cause.",
      source: "docetaxel-label",
      quote: "All patients should be premedicated with oral corticosteroids (see below for prostate cancer) such as dexamethasone 16 mg per day (e.g., 8 mg twice daily) for 3 days starting 1 day prior to docetaxel injection administration in order to reduce the incidence and severity of fluid retention as well as the severity of hypersensitivity reactions",
    },
    {
      action: "If premedication is taken by mouth, check on the day that the patient took it",
      why: "Missed tablets are a common and avoidable reason for a reaction.",
      source: "esmo-2017",
      quote: "If premedications are to be taken orally, oncology nurses should check that the patient has actually taken them",
      grade: "[V, C]",
    },
    {
      action: "Before rituximab, always give an antipyretic and an antihistamine, consider a glucocorticoid in lymphoma and CLL, and start the first infusion slowly",
      why: "Most people react to the first rituximab dose, mainly through cytokine release; a slow start and premedication make reactions milder.",
      source: "esmo-2017",
      quote: "Premedication consisting of an antipyretic and an antihistamine should always be given",
      grade: "[IV, A]",
    },
    {
      action: "Before daratumumab, give an intravenous corticosteroid, an antipyretic and an antihistamine one hour before every infusion, and oral corticosteroid on the two days after",
      why: "Reactions affect up to half of patients, mostly at the first infusion.",
      source: "esmo-2017",
      quote: "Premedication 1 h before every infusion: i.v. corticosteroid [(methyl)prednisolone 100 mg, or equivalent], oral antipyretics (paracetamol 650–1000 mg) and oral or i.v. antihistamine (diphenhydramine 25–50 mg or equivalent).",
      grade: "[IV, B]",
    },
    {
      action: "Do not routinely premedicate before carboplatin or oxaliplatin; consider it for high-risk patients, knowing it may not prevent a reaction",
      why: "Platinum reactions are true allergies that build up over many cycles, and steroids and antihistamines do not reliably stop them.",
      source: "esmo-2017",
      quote: "Corticosteroids and H1/H2 antagonists not routinely recommended. Consider in high-risk patients. Premedication may not prevent an IR.",
      grade: "[IV, B]",
    },
    {
      action: "In lymphoma, give the first two doses of bleomycin at 2 units or less, then the usual dose if there is no reaction",
      why: "Bleomycin can rarely cause a sudden severe reaction in people with lymphoma, so small first doses test for it.",
      source: "esmo-2017",
      quote: "Because of the possibility of an anaphylactoid reaction, lymphoma patients should be treated with 2 units or less for the first 2 doses. If no IR occurs, then the regular dosage schedule may be followed",
      grade: "[IV, B]",
    },
  ],
  bestInClass: {
    statement: "Premedicate by drug, not by habit: corticosteroid plus antihistamine before every taxane (ESMO [IV, A]); for paclitaxel a single intravenous dexamethasone dose with H1 and H2 blockade 30 minutes before (ESMO [II, A]), where the US label instead gives oral dexamethasone 12 and 6 hours before; for docetaxel three days of oral dexamethasone from the day before (label; ESMO [IV, B]); antipyretic and antihistamine always before rituximab (ESMO [IV, A]); per-infusion steroid, antipyretic and antihistamine before daratumumab (ESMO [IV, B]); none routinely before platinums, trastuzumab, bevacizumab, panitumumab or PD-L1 antibodies (ESMO [IV, B]). Check oral premedication was taken.",
    sources: ["esmo-2017", "paclitaxel-label", "docetaxel-label"],
  },
  variants: [
    {
      name: "Oral dexamethasone the night before and morning of paclitaxel",
      differs: "Gives dexamethasone 20 mg by mouth about 12 and 6 hours before paclitaxel instead of one intravenous dose just before.",
      evidence: "This is the US label's regimen. ESMO cites a randomised trial that found no difference in reaction rates between oral and short-term intravenous dexamethasone before a first paclitaxel cycle, with fewer side effects from the intravenous dose [II, A].",
      sources: ["paclitaxel-label", "esmo-2017"],
    },
    {
      name: "Stopping cetuximab premedication after two infusions",
      differs: "Gives corticosteroid and antihistamine before the first two cetuximab infusions only, if neither causes a reaction.",
      evidence: "ESMO [IV, B]; it reports corticosteroids plus antihistamines reduced grade 3 or 4 reactions to 1%, compared with 4.7% with antihistamines alone.",
      sources: ["esmo-2017"],
    },
  ],
  grades: [
    { claim: "Corticosteroid plus antihistamine before every taxane", grade: "[IV, A]", source: "esmo-2017" },
    { claim: "Paclitaxel: one intravenous dexamethasone dose with H1 and H2 antagonists 30 minutes before", grade: "[II, A]", source: "esmo-2017" },
    { claim: "Short intravenous dexamethasone as effective as oral, with fewer side effects", grade: "[II, A]", source: "esmo-2017", quote: "However, short-term i.v. dexamethasone was associated with fewer side-effects than oral dexamethasone" },
    { claim: "Antipyretic and antihistamine always before rituximab", grade: "[IV, A]", source: "esmo-2017" },
    { claim: "Cetuximab: corticosteroid plus antihistamine; may stop after the second infusion without a reaction", grade: "[IV, B]", source: "esmo-2017", quote: "Premedication can be discontinued after the second infusion if no IR is observed" },
    { claim: "Platinums: premedication not routinely recommended", grade: "[IV, B]", source: "esmo-2017" },
    { claim: "Trastuzumab: premedication not recommended", grade: "[IV, B]", source: "esmo-2017", quote: "Loading dose in 90 min. Subsequent doses in 30 min. Premedication is not recommended." },
    { claim: "Paclitaxel: all patients premedicated (US label)", grade: "Product labelling (not graded)", source: "paclitaxel-label", quote: "All patients should be premedicated prior to paclitaxel injection administration in order to prevent severe hypersensitivity reactions." },
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
      key: "paclitaxel-label",
      label: "Paclitaxel injection prescribing information (Teva Parenteral Medicines)",
      publisher: "US Food and Drug Administration label (DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e4be6cbf-72b9-4f7f-9b1b-459b2d35961a",
      gradingScheme: "Product labelling; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "docetaxel-label",
      label: "Docetaxel injection prescribing information (Mylan Institutional)",
      publisher: "US Food and Drug Administration label (DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2fb017fd-e55e-43ef-9024-07f2d412b37b",
      gradingScheme: "Product labelling; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["paclitaxel", "docetaxel", "rituximab", "cetuximab", "daratumumab", "carboplatin", "oxaliplatin", "bleomycin", "dexamethasone"],
  terms: ["extravasation-infusion-reaction"],
  related: ["infusion-reaction-management", "sact-prescribing-and-pharmacy-verification"],
  upgrades: [],
  gaps: [
    "ESMO's infusion reaction guideline dates from 2017 and most of its drug-by-drug advice is level IV; antibody premedication now follows each product's label, and newer antibodies (bispecifics, amivantamab and others) are not covered by it.",
    "ESMO names ranitidine as the H2 antagonist; it has since been withdrawn in several countries, and no source read names the replacement.",
    "Whether dexamethasone can be reduced or stopped after several uneventful weekly paclitaxel doses was not settled by any source read.",
    "No ASCO, NCCN or UK national guidance on reaction premedication was read.",
  ],
});

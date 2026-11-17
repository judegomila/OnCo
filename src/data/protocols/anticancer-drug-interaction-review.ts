import { protocol } from "./helpers";

/*
 * Checking anticancer treatment for interactions with other medicines, herbal products, supplements and foods, before
 * treatment starts and whenever a medicine changes.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again as raw
 * text (curl, pdftotext, tag stripping by script) and each claim and quote re-read against it.
 * - ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024, DOI 10.1200/OP.24.00216): full text, read
 *   from the open PDF of the Oncology Nursing Forum co-publication (July 2024, volume 51, number 4) on ons.org, a copy
 *   a sibling checker saved on 17 November 2026 and re-used here. ascopubs.org was not requested.
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (3 June 2025):
 *   full text, PDF, the sibling's copy of 17 November 2026. BOPA's listing page refuses a script, so a later version
 *   could not be ruled out.
 * - van Leeuwen et al., Dutch guidelines for drug-drug interactions with anticancer drugs (Semin Oncol 2022, DOI
 *   10.1053/j.seminoncol.2022.03.002): abstract only, Europe PMC. The article is open access, but ScienceDirect and
 *   two university repositories (Groningen, Rotterdam) answered 403 to a script on 17 November 2026.
 * - Brokaar et al. (Explor Res Clin Soc Pharm 2025, DOI 10.1016/j.rcsop.2025.100585): now read in full, PMC11982495
 *   through the Europe PMC REST service. The first pass read the abstract only.
 * - Malifarge et al. (JCO Oncol Pract 2024, DOI 10.1200/OP.22.00281): now read in full, PMC11005900 through the
 *   Europe PMC REST service. The full text and the abstract give different counts; the page follows the full text and
 *   says where the abstract differs.
 * - US prescribing information, DailyMed SPL XML: Imbruvica (ibrutinib; set id
 *   0dfd0279-ff17-4ea9-89be-9803c71bab44, version 65), erlotinib tablets (Camber; set id
 *   a3b2d622-b4d5-4819-862b-f8fd3adcec6f, version 1), and, added in this pass so that the St John's wort statements
 *   rest on a source read here, Camptosar (irinotecan; set id e518dfc6-7e93-4fee-a66c-51e1ab71c056, version 37) and
 *   Gleevec (imatinib; set id 211ef2da-2868-4a77-8055-1cb2cd78e24b, version 41).
 * - Cancer Drug Interactions website (Radboud UMC and University of Liverpool), home page and checker page read as
 *   HTML: the home page states the site went offline in September 2023, that an archived checker last updated in June
 *   2022 remained, and that the archive would be taken offline on 31 January 2025. Both pages still answered on
 *   17 November 2026. BOPA 2025 still names the site as a resource.
 *
 * Every DOI was resolved through Europe PMC and Crossref and its title checked. Quotes are copied with line breaks
 * joined and end-of-line hyphenation undone only, and were checked by script against the saved texts.
 */
export const anticancerDrugInteractionReview = protocol({
  id: "anticancer-drug-interaction-review",
  name: "Drug, herbal and food interaction review for anticancer treatment",
  aka: ["drug interaction check before chemotherapy", "DDI review", "drug-drug interactions with anticancer drugs", "herb-drug interactions", "supplement interactions with chemotherapy", "grapefruit and cancer drugs", "CYP3A4 interactions", "proton pump inhibitors and TKIs", "St John's wort and chemotherapy"],
  domain: "pharmacy",
  tldr: "Some everyday medicines, herbal remedies, supplements and even foods such as grapefruit can make cancer drugs stronger and more toxic or weaker and less effective. Before treatment starts, and whenever anything changes, the team should check everything you take. Tell them about every tablet, remedy, vitamin and supplement, even ones you buy yourself.",
  simple: "Tell your cancer team about every medicine, vitamin, herbal remedy and supplement you take, and ask before starting anything new, because some can stop cancer drugs working or make them harmful.",
  summary: "Interactions with anticancer drugs are common and can significantly affect both efficacy and toxicity (van Leeuwen 2022). ASCO-ONS (2024) requires a medication list that includes over-the-counter medicines, herbal products and supplements, updated at every encounter and reviewed by a licensed practitioner when it changes, and pre-treatment education on interactions with prescribed drugs, integrative therapies, over-the-counter drugs and foods. It notes that patients may not mention herbal products or vitamins because they do not regard them as medicines, so staff must ask. BOPA (2025) makes the interaction check part of pharmacy verification at cycle 1 and, where the information is accessible, for any new medicine at later cycles.\n\nProduct labels give the detail, and two serve here as worked examples. The ibrutinib label sets reduced doses with moderate CYP3A inhibitors, voriconazole and posaconazole, says to avoid other strong inhibitors (interrupting ibrutinib if one is needed for seven days or less), to avoid strong CYP3A inducers, and to avoid grapefruit and Seville oranges. The erlotinib label says to avoid proton pump inhibitors if possible, noting that separating the doses may not remove the interaction; to take erlotinib 10 hours after an H2 blocker and at least 2 hours before its next dose; and to separate antacids by several hours. On St John's wort, the irinotecan label says exposure to irinotecan or its active metabolite SN-38 is substantially reduced, and the imatinib label reports a 30% fall in imatinib exposure (AUC). A Dutch multidisciplinary group had assessed 290 potential interactions by 2022: 94 (32%) clinically relevant, needing an automated alert and a suggested intervention, 110 not relevant, and 86 with too little evidence; it argues for building such guidance into electronic prescribing. In 202 adults aged 65 or over on anticancer treatment at one Dutch hospital, 12% used herbal supplements and 8 patients (4%) had 13 potentially relevant herb-drug interactions between them, 6 of which, in 4 patients, were judged clinically relevant (red yeast rice, red coneflower, turmeric, cannabis). The original Cancer Drug Interactions website (Radboud UMC and University of Liverpool) was taken offline in September 2023; an archived checker, last updated in June 2022, was still answering on 17 November 2026.",
  asOf: "2026-11-17",
  setting: {
    who: ["pharmacist", "doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "ward", "home", "community"],
  },
  population: "Adults and children starting or receiving any systemic anticancer treatment, oral or intravenous, as the ASCO-ONS standards scope it. The labels used as examples are for oral targeted drugs (ibrutinib, erlotinib, imatinib) and for irinotecan.",
  trigger: "A new anticancer regimen is planned; a later cycle is due and a medicine has been started since the last one; or any medicine, supplement or herbal product is started, stopped or changed.",
  steps: [
    {
      action: "Keep one medication list that includes prescribed and over-the-counter medicines, herbal products and supplements, update it at every visit and have a licensed practitioner review it when anything changes",
      why: "An interaction can only be found if every product the person takes is on the list.",
      source: "asco-ons-2024",
      quote: "The patient’s medication list inclusive of prescribed and over-the-counter medications, herbal products, and supplements is updated and documented in the medical record at every encounter and reviewed by a licensed practitioner when a change occurs",
    },
    {
      action: "Ask directly about herbal products, vitamins and supplements, and record them on the medication list",
      why: "Some people do not mention these products because they do not think of them as medicines.",
      source: "asco-ons-2024",
      quote: "Some patients, at times, may not disclose their use of herbal product, supplements, and vitamins during interviews because they may not regard these as medications. Pharmacists and providers must proactively inquire and document herbal product and complementary medications use within the medication list.",
    },
    {
      action: "Before the first cycle, check every planned anticancer and supportive medicine against all the person's other medicines for interactions, contraindications and duplication",
      why: "BOPA lists this among the checks made when a new regimen is verified, before its first cycle is given.",
      source: "bopa-2025",
      quote: "Check for potential interactions, contra-indications and duplication between all planned SACT & supportive medication and patient’s concurrent medication.",
    },
    {
      action: "At each later cycle, check any medicine prescribed since the last cycle for interactions and contraindications, where that information is accessible",
      why: "A medicine started between cycles has not yet been checked against the cancer treatment.",
      source: "bopa-2025",
      quote: "Check patient allergy status, interactions or contraindications against any new medicines prescribed since last cycle (when information accessible).",
    },
    {
      action: "For a drug cleared by CYP3A, such as ibrutinib, change the dose or avoid CYP3A inhibitors and strong inducers as its label directs, and tell the person to avoid grapefruit and Seville oranges where the label says so",
      why: "The ibrutinib label says inhibitors may raise its blood levels, which may raise the risk of side effects, and strong inducers may lower them.",
      source: "ibrutinib-label",
      quote: "Avoid grapefruit and Seville oranges during IMBRUVICA treatment, as these contain strong or moderate inhibitors of CYP3A.",
    },
    {
      action: "For a drug whose absorption depends on stomach acid, such as erlotinib, avoid proton pump inhibitors where possible and time H2 blockers and antacids as its label directs",
      why: "Erlotinib dissolves less well as stomach acid falls, and its label reports lower blood levels when it is taken with omeprazole or ranitidine.",
      source: "erlotinib-label",
      quote: "For proton pump inhibitors, avoid concomitant use if possible. For H-2 receptor antagonists and antacids, modify the dosing schedule",
    },
    {
      action: "Before irinotecan, look for St John's wort and other strong CYP3A4 inducers, and do not give them together unless there is no alternative",
      why: "The irinotecan label says these lower the amount of the drug, or of its active form, in the blood by a large margin.",
      source: "irinotecan-label",
      quote: "Exposure to irinotecan or its active metabolite SN-38 is substantially reduced in adult and pediatric patients concomitantly receiving the CYP3A4 enzyme-inducing anticonvulsants phenytoin, phenobarbital, carbamazepine, or St. John's wort.",
    },
    {
      action: "Before the first dose of each treatment plan, tell the person, in speech and in writing, which prescribed medicines, over-the-counter medicines, integrative therapies and foods interact with their treatment",
      why: "The standards list drug interactions among the minimum a person is told before treatment starts.",
      source: "asco-ons-2024",
      quote: "Planned duration of treatment, schedule of treatment administration, plan for missed doses, drug names and supportive medications, and drug interactions with prescribed drugs, integrative therapies, over the counter drugs, and foods",
    },
    {
      action: "Use interaction guidance that says which interactions need action and what to do, built into electronic prescribing where possible",
      why: "The Dutch expert group judged 94 of 290 potential interactions to need an alert and an intervention, and says such guidance belongs in the prescribing system.",
      source: "van-leeuwen-2022",
      quote: "Integration of DDI guidelines into the national electronic prescribing system is essential to achieve optimal efficacy and minimal toxicity in patients receiving anticancer therapy.",
    },
  ],
  bestInClass: {
    statement: "A complete medication list including over-the-counter, herbal and supplement products, updated every visit and reviewed when it changes (ASCO-ONS 2024), with herbal use asked about directly; an interaction check at pharmacy verification before cycle 1 and for each new medicine at later cycles (BOPA 2025); label-directed management of CYP3A, acid-suppressant and St John's wort interactions; and patient education on interactions before treatment. Neither set of standards grades its statements; the only interaction-by-interaction guidance found is the Dutch multidisciplinary set (2022), read as an abstract.",
    sources: ["asco-ons-2024", "bopa-2025", "van-leeuwen-2022", "ibrutinib-label", "erlotinib-label", "irinotecan-label"],
  },
  variants: [
    {
      name: "Pharmacist-led reconciliation before early-phase trials",
      differs: "A clinical pharmacist reconciles medicines against the trial protocol's prohibited and monitored lists before the first dose of trial treatment.",
      evidence: "In 501 reconciliations across 79 trials at one French centre (95.3% for phase I studies), 360 interactions were found in 189 patients (37.7%). They involved 346 treatments or alternative medicine products: 188 needing monitoring and 158 prohibited by the protocol. Of the prohibited ones, 62.7% were self-medication or alternative medicine products, and 71.5% were found through reconciliation; of those needing monitoring, 37.2% were. The abstract counts 501 patients and 346 interactions, calls more than half of the prohibited medicines herbal, and says reconciliation identified 51% of the prohibited or monitored drugs that oncologists had initially overlooked (Malifarge 2024).",
      sources: ["malifarge-2024"],
    },
    {
      name: "Screening for specific herbs known to interact",
      differs: "Uses a questionnaire on a set list of commonly used herbs with known interactions, then has two pharmacists judge each hit.",
      evidence: "In 202 adults aged 65 or over at one Dutch hospital (people treated only with monoclonal antibodies were not invited), 12% used herbal supplements. Thirteen potentially relevant herb-drug interactions were found in 8 patients (4%), and 6 of them, in 4 patients, were judged clinically relevant (Brokaar 2025).",
      sources: ["brokaar-2025"],
    },
  ],
  grades: [],
  sources: [
    {
      key: "asco-ons-2024",
      label: "Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology: ASCO-ONS Standards",
      publisher: "ASCO and ONS (JCO Oncology Practice)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.24.00216",
      doi: "10.1200/OP.24.00216",
      gradingScheme: "Standards are not graded; developed from a systematic review (2015 to 2023), expert panel consensus and public comment.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "bopa-2025",
      label: "Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0",
      publisher: "British Oncology Pharmacy Association",
      year: 2025,
      url: "https://www.bopa.org.uk/wp-content/uploads/2019/07/BOPA-Standards-for-the-Pharmacy-Verification-of-Prescriptions-for-Cancer-Medicines-Version-5.0-3-june-2025.pdf",
      gradingScheme: "Standards are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "van-leeuwen-2022",
      label: "Evidence- and consensus-based guidelines for drug-drug interactions with anticancer drugs; A practical and universal tool for management",
      publisher: "Seminars in Oncology (van Leeuwen et al., Dutch Multidisciplinary Expert group)",
      year: 2022,
      url: "https://doi.org/10.1053/j.seminoncol.2022.03.002",
      doi: "10.1053/j.seminoncol.2022.03.002",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "ibrutinib-label",
      label: "Imbruvica (ibrutinib), US prescribing information (revised October 2025; label version 65, published January 2026)",
      publisher: "US National Library of Medicine, DailyMed",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=0dfd0279-ff17-4ea9-89be-9803c71bab44",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "erlotinib-label",
      label: "Erlotinib tablets, US prescribing information (Camber; revised May 2024, label version 1)",
      publisher: "US National Library of Medicine, DailyMed",
      year: 2024,
      url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=a3b2d622-b4d5-4819-862b-f8fd3adcec6f",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "irinotecan-label",
      label: "Camptosar (irinotecan), US prescribing information (label version 37, published May 2026)",
      publisher: "US National Library of Medicine, DailyMed",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=e518dfc6-7e93-4fee-a66c-51e1ab71c056",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "imatinib-label",
      label: "Gleevec (imatinib), US prescribing information (label version 41, published July 2026)",
      publisher: "US National Library of Medicine, DailyMed",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=211ef2da-2868-4a77-8055-1cb2cd78e24b",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "brokaar-2025",
      label: "The prevalence of clinically relevant herb-drug interactions between herbal products and anti-cancer therapy in older adults with cancer",
      publisher: "Exploratory Research in Clinical and Social Pharmacy (Brokaar et al.)",
      year: 2025,
      url: "https://doi.org/10.1016/j.rcsop.2025.100585",
      doi: "10.1016/j.rcsop.2025.100585",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "malifarge-2024",
      label: "Impact of Medication Reconciliation in Oncology Early Phase Studies: A Drug-Drug Interaction Retrospective Study",
      publisher: "JCO Oncology Practice (Malifarge et al.)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.22.00281",
      doi: "10.1200/OP.22.00281",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cancer-drug-interactions-site",
      label: "Cancer Drug Interactions (archived interaction checker)",
      publisher: "Radboud UMC and University of Liverpool",
      year: 2023,
      url: "https://cancer-druginteractions.org/",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["ibrutinib", "erlotinib", "irinotecan", "imatinib"],
  technologies: ["st-johns-wort-interaction", "dietary-supplements-treatment-interactions", "traditional-chinese-herbal-medicine"],
  related: ["medicines-reconciliation-in-cancer-care", "oral-anticancer-medicines-at-home", "sact-prescribing-and-pharmacy-verification"],
  upgrades: [],
  gaps: [
    "Neither ASCO-ONS nor BOPA grades its statements, and no graded guideline on interaction review for anticancer drugs was found. The Dutch guideline was read only as an abstract: on 17 November 2026 the publisher's page and two university repository copies refused a script, so its individual recommendations are not on this page.",
    "The Cancer Drug Interactions website that BOPA 2025 names was taken offline in September 2023. Its home page says an archived checker, last updated in June 2022, would be taken offline on 31 January 2025; the archive page still answered on 17 November 2026. No free, maintained, oncology-specific checker of the same scope was found; Stockley's, which BOPA also names, is a subscription product and was not read.",
    "BOPA's own listing page refused a script on 17 November 2026, so whether version 5.0 (June 2025) is still its latest could not be confirmed.",
    "The labels here are worked examples, each read for one product in its United States version: ibrutinib, erlotinib, irinotecan and imatinib. Other drugs, and the same drugs under other regulators, have their own instructions, and this page does not cover the interactions of other drugs, for example capecitabine, methotrexate or tamoxifen.",
    "In the one herb study read in full, the authors say much of what is known about herb-drug interactions comes from laboratory research, and that the effect on clinical outcomes is not established (Brokaar 2025).",
    "The two counts in the reconciliation study differ between its abstract and its full text (501 patients against 501 reconciliations, some patients having more than one; 346 interactions against 360 interactions involving 346 products). This page follows the full text.",
  ],
});

import { protocol } from "./helpers";

/*
 * Checking anticancer treatment for interactions with other medicines, herbal products, supplements and foods, before
 * treatment starts and whenever a medicine changes.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024, DOI 10.1200/OP.24.00216): full text, read by
 *   the first protocol agent from the Internet Archive's capture of ascopubs.org (copy in /tmp/pf-chemo).
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (June 2025): full
 *   text, PDF.
 * - van Leeuwen et al., Dutch evidence- and consensus-based guidelines for drug-drug interactions with anticancer
 *   drugs (Semin Oncol 2022, DOI 10.1053/j.seminoncol.2022.03.002): abstract only, Europe PMC.
 * - Brokaar et al., herb-drug interactions in older adults with cancer (Explor Res Clin Soc Pharm 2025, DOI
 *   10.1016/j.rcsop.2025.100585): abstract only.
 * - Malifarge et al., medication reconciliation before early-phase trials (JCO Oncol Pract 2024, DOI
 *   10.1200/OP.22.00281): abstract only.
 * - US prescribing information for Imbruvica (ibrutinib; DailyMed set id 0dfd0279-ff17-4ea9-89be-9803c71bab44) and for
 *   erlotinib tablets (Camber; set id a3b2d622-b4d5-4819-862b-f8fd3adcec6f): full text, SPL XML. Used as worked
 *   examples of a CYP3A and food interaction and an acid-suppressant interaction.
 * - Cancer Drug Interactions website (Radboud UMC and University of Liverpool), home page read as HTML: it states the
 *   site went offline in September 2023, that an archived checker last updated in June 2022 remained, and that the
 *   archive would close on 31 January 2025. BOPA 2025 still names it as a resource.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied with line breaks joined only.
 */
export const anticancerDrugInteractionReview = protocol({
  id: "anticancer-drug-interaction-review",
  name: "Drug, herbal and food interaction review for anticancer treatment",
  aka: ["drug interaction check before chemotherapy", "DDI review", "drug-drug interactions with anticancer drugs", "herb-drug interactions", "supplement interactions with chemotherapy", "grapefruit and cancer drugs", "CYP3A4 interactions", "proton pump inhibitors and TKIs", "St John's wort and chemotherapy"],
  domain: "pharmacy",
  tldr: "Some everyday medicines, herbal remedies, supplements and even foods such as grapefruit can make cancer drugs stronger and more toxic or weaker and less effective. Before treatment starts, and whenever anything changes, the team should check everything you take. Tell them about every tablet, remedy, vitamin and supplement, even ones you buy yourself.",
  simple: "Tell your cancer team about every medicine, vitamin, herbal remedy and supplement you take, and ask before starting anything new, because some can stop cancer drugs working or make them harmful.",
  summary: "Interactions with anticancer drugs are common and change both efficacy and toxicity. ASCO-ONS (2024) requires a medication list that includes over-the-counter medicines, herbal products and supplements, updated at every encounter and reviewed by a licensed practitioner when it changes, and pre-treatment education on interactions with prescribed drugs, integrative therapies, over-the-counter drugs and foods. It notes that patients may not mention herbal products or vitamins because they do not regard them as medicines, so staff must ask. BOPA (2025) makes the interaction check part of the pharmacist's verification at cycle 1 and for any new medicine at later cycles.\n\nThe interactions that matter most are pharmacokinetic: strong CYP3A inhibitors and inducers with oral targeted drugs (the ibrutinib label requires dose changes with inhibitors, avoidance of strong inducers, and no grapefruit or Seville oranges), and acid suppressants that cut absorption of pH-dependent kinase inhibitors (erlotinib: avoid proton pump inhibitors if possible, separate H2 blockers and antacids). St John's wort, a strong inducer, lowers levels of irinotecan's active metabolite and of imatinib. A Dutch multidisciplinary group graded 290 potential interactions: 94 clinically relevant with an advised intervention, 110 not relevant, and 86 with too little evidence; it argues for building such rules into electronic prescribing. In 202 older adults on anticancer treatment, 12% used herbs and 4% had a potentially relevant herb-drug interaction, half judged clinically relevant (red yeast rice, red coneflower, turmeric, cannabis). One widely named checker, Cancer Drug Interactions (Radboud UMC and University of Liverpool), has been closed since 2023, with an archive last updated in 2022.",
  asOf: "2026-11-11",
  setting: {
    who: ["pharmacist", "doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "ward", "home", "community"],
  },
  population: "Adults and children starting or receiving any systemic anticancer treatment, oral or intravenous, and especially oral targeted therapies, which carry most of the pharmacokinetic interactions.",
  trigger: "A new anticancer regimen is planned; any other medicine, supplement or herbal product is started, stopped or changed; or the person is admitted, transferred or discharged.",
  steps: [
    {
      action: "Keep one medication list that includes prescribed and over-the-counter medicines, herbal products and supplements, update it at every visit and have a licensed practitioner review it when anything changes",
      why: "An interaction can only be found if every product the person takes is on the list.",
      source: "asco-ons-2024",
      quote: "The patient's medication list inclusive of prescribed and over-the-counter medications, herbal products, and supplements is updated and documented in the medical record at every encounter and reviewed by a licensed practitioner when a change occurs",
    },
    {
      action: "Ask directly about herbal products, vitamins and supplements, because people often do not count them as medicines",
      why: "Many people do not mention remedies they buy themselves unless asked.",
      source: "asco-ons-2024",
      quote: "Some patients, at times, may not disclose their use of herbal product, supplements, and vitamins during interviews because they may not regard these as medications. Pharmacists and providers must proactively inquire and document herbal product and complementary medications use within the medication list.",
    },
    {
      action: "Before the first cycle, check every planned anticancer and supportive medicine against all the person's other medicines for interactions, contraindications and duplication",
      why: "This is the point where a regimen can still be changed or another medicine swapped before harm is done.",
      source: "bopa-2025",
      quote: "Check for potential interactions, contra-indications and duplication between all planned SACT & supportive medication and patient’s concurrent medication.",
    },
    {
      action: "At each later cycle, check any medicine started since the last cycle",
      why: "New prescriptions from other doctors, such as antibiotics, antifungals or antacids, are a common source of new interactions.",
      source: "bopa-2025",
      quote: "Check patient allergy status, interactions or contraindications against any new medicines prescribed since last cycle (when information accessible).",
    },
    {
      action: "For oral targeted drugs metabolised by CYP3A, change the dose or avoid strong inhibitors and inducers as the label directs, and tell the person to avoid grapefruit and Seville oranges where the label says so",
      why: "Inhibitors raise blood levels and toxicity; inducers lower them and can make treatment fail.",
      source: "ibrutinib-label",
      quote: "Avoid grapefruit and Seville oranges during IMBRUVICA treatment, as these contain strong or moderate inhibitors of CYP3A.",
    },
    {
      action: "For kinase inhibitors that need stomach acid to be absorbed, avoid proton pump inhibitors where possible and time H2 blockers and antacids as the label directs",
      why: "Lowering stomach acid can stop the cancer drug being absorbed, so less of it reaches the cancer.",
      source: "erlotinib-label",
      quote: "For proton pump inhibitors, avoid concomitant use if possible. For H-2 receptor antagonists and antacids, modify the dosing schedule",
    },
    {
      action: "Teach the person and their carers which medicines, remedies and foods interact with their treatment before it starts",
      why: "Most new medicines and supplements are started between clinic visits, often without the cancer team knowing.",
      source: "asco-ons-2024",
      quote: "Planned duration of treatment, schedule of treatment administration, plan for missed doses, drug names and supportive medications, and drug interactions with prescribed drugs, integrative therapies, over the counter drugs, and foods",
    },
    {
      action: "Use a graded, maintained interaction reference, ideally built into electronic prescribing, rather than a general checker alone",
      why: "General checkers flag many interactions that do not matter and can miss ones that do; graded rules say which need action.",
      source: "van-leeuwen-2022",
      quote: "Integration of DDI guidelines into the national electronic prescribing system is essential to achieve optimal efficacy and minimal toxicity in patients receiving anticancer therapy.",
    },
  ],
  bestInClass: {
    statement: "A complete medication list including over-the-counter, herbal and supplement products, updated every visit and reviewed when it changes (ASCO-ONS 2024), with herbal use asked about directly; a pharmacist interaction check before cycle 1 and for each new medicine (BOPA 2025); label-directed management of CYP3A and acid-suppressant interactions; and patient education on interactions before treatment. No international guideline grades these steps; the only graded interaction-by-interaction guidance found is the Dutch multidisciplinary set (2022), read as an abstract.",
    sources: ["asco-ons-2024", "bopa-2025", "van-leeuwen-2022", "ibrutinib-label", "erlotinib-label"],
  },
  variants: [
    {
      name: "Pharmacist-led reconciliation before early-phase trials",
      differs: "A pharmacist reconciles medicines against the trial protocol's prohibited and monitored lists before enrolment.",
      evidence: "In 501 trial patients at one French centre, reconciliation found 346 interactions, 158 with prohibited medicines, more than half of them herbal, and 51% of prohibited or monitored drugs had been missed by oncologists (Malifarge 2024).",
      sources: ["malifarge-2024"],
    },
    {
      name: "Screening for specific herbs known to interact",
      differs: "Uses a questionnaire on a set list of commonly used herbs with known interactions, then has two pharmacists judge each hit.",
      evidence: "In 202 adults aged 65 or over, herb use was 12% and potentially relevant herb-drug interactions 4%, half clinically relevant (Brokaar 2025).",
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
      accessed: "2026-11-11",
    },
    {
      key: "bopa-2025",
      label: "Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0",
      publisher: "British Oncology Pharmacy Association",
      year: 2025,
      url: "https://www.bopa.org.uk/wp-content/uploads/2019/07/BOPA-Standards-for-the-Pharmacy-Verification-of-Prescriptions-for-Cancer-Medicines-Version-5.0-3-june-2025.pdf",
      gradingScheme: "Standards are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "van-leeuwen-2022",
      label: "Evidence- and consensus-based guidelines for drug-drug interactions with anticancer drugs; A practical and universal tool for management",
      publisher: "Seminars in Oncology (van Leeuwen et al., Dutch Multidisciplinary Expert group)",
      year: 2022,
      url: "https://doi.org/10.1053/j.seminoncol.2022.03.002",
      doi: "10.1053/j.seminoncol.2022.03.002",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "ibrutinib-label",
      label: "Imbruvica (ibrutinib), US prescribing information",
      publisher: "US National Library of Medicine, DailyMed",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=0dfd0279-ff17-4ea9-89be-9803c71bab44",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "erlotinib-label",
      label: "Erlotinib tablets, US prescribing information (Camber)",
      publisher: "US National Library of Medicine, DailyMed",
      year: 2024,
      url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=a3b2d622-b4d5-4819-862b-f8fd3adcec6f",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "brokaar-2025",
      label: "The prevalence of clinically relevant herb-drug interactions between herbal products and anti-cancer therapy in older adults with cancer",
      publisher: "Exploratory Research in Clinical and Social Pharmacy (Brokaar et al.)",
      year: 2025,
      url: "https://doi.org/10.1016/j.rcsop.2025.100585",
      doi: "10.1016/j.rcsop.2025.100585",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "malifarge-2024",
      label: "Impact of Medication Reconciliation in Oncology Early Phase Studies: A Drug-Drug Interaction Retrospective Study",
      publisher: "JCO Oncology Practice (Malifarge et al.)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.22.00281",
      doi: "10.1200/OP.22.00281",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "cancer-drug-interactions-site",
      label: "Cancer Drug Interactions (archived interaction checker)",
      publisher: "Radboud UMC and University of Liverpool",
      year: 2023,
      url: "https://cancer-druginteractions.org/",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["ibrutinib", "erlotinib", "irinotecan", "imatinib"],
  technologies: ["st-johns-wort-interaction", "dietary-supplements-treatment-interactions", "traditional-chinese-herbal-medicine"],
  related: ["medicines-reconciliation-in-cancer-care", "oral-anticancer-medicines-at-home", "sact-prescribing-and-pharmacy-verification"],
  upgrades: [],
  gaps: [
    "No national or international guideline grades interaction review for anticancer drugs; ASCO-ONS and BOPA set standards without grades, and the graded Dutch guideline was read only as an abstract.",
    "The Cancer Drug Interactions checker that BOPA 2025 names went offline in September 2023, and its archive (last updated June 2022) was due to close on 31 January 2025. No free, maintained, oncology-specific checker of the same scope was found; Stockley's, which BOPA also names, is a subscription product and was not read.",
    "Evidence on most herb-drug interactions comes from small pharmacokinetic studies and case reports; for many popular supplements there is no evidence either way.",
    "The St John's wort figures in the summary come from the OnCo record st-johns-wort-interaction and its cited study, not from a source read for this protocol.",
  ],
});

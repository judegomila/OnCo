/**
 * Company catalysts for investors and business development: dated regulatory decisions, expected readouts,
 * advisory committees, label decisions, filings and deal closings, each tied to company and product ids.
 *
 * Rules mirror `calendar.ts`: `confirmed` needs a source that states the date; `expected` is our editorial
 * estimate from trial registrations and sponsor statements and can slip by quarters. Dates may be a day
 * (YYYY-MM-DD), a month (YYYY-MM), a quarter (YYYY-Qn) or a year (YYYY). Events already in `calendar.ts`
 * are not repeated here; the /catalysts/ page merges both lists.
 */
export type CatalystKind = "pdufa" | "readout" | "adcom" | "label-decision" | "patent-ruling" | "filing" | "deal-close";
export type Catalyst = {
  id: string;
  date: string;
  kind: CatalystKind;
  title: string;
  /** Company ids with a stake in the outcome. */
  companies: string[];
  /** Product ids the catalyst is about. */
  drugs: string[];
  /** Other entity ids to link (cancers, targets, trials). */
  refs: string[];
  confidence: "confirmed" | "expected";
  note: string;
  source: string;
};

const ct = (nct: string) => `https://clinicaltrials.gov/study/${nct}`;

export const catalysts: Catalyst[] = [
  {
    id: "c-zidesamtinib-pdufa", date: "2026-09-18", kind: "pdufa", confidence: "confirmed",
    title: "FDA decision: zidesamtinib in TKI-pretreated ROS1-positive NSCLC",
    companies: ["nuvalent"], drugs: ["zidesamtinib"], refs: ["ros1", "nsclc"],
    note: "PDUFA target action date stated by Nuvalent when the FDA accepted the new drug application. Nuvalent's first potential approval.",
    source: "https://investors.nuvalent.com/news-releases",
  },
  {
    id: "c-galleri-pma-decision", date: "2027", kind: "label-decision", confidence: "expected",
    title: "FDA decision on the Galleri multi-cancer early detection test (premarket approval)",
    companies: ["grail"], drugs: ["galleri"], refs: ["mced", "nhs-galleri"],
    note: "Follows the 23 September 2026 advisory committee. PMA decisions typically come months after the panel; no date has been announced.",
    source: "https://www.prnewswire.com/news-releases/grail-announces-fda-advisory-committee-meeting-to-review-premarket-approval-application-for-the-galleri-multi-cancer-early-detection-test-302846154.html",
  },
  {
    id: "c-harmoni-3-readout", date: "2027", kind: "readout", confidence: "expected",
    title: "HARMONi-3: ivonescimab plus chemotherapy versus pembrolizumab plus chemotherapy, first-line NSCLC",
    companies: ["summit-therapeutics", "akeso"], drugs: ["ivonescimab", "pembrolizumab"], refs: ["nsclc", "pdl1", "vegf"],
    note: "The first head-to-head test of the PD-1 x VEGF bispecific against pembrolizumab in a Western population. Timing is our estimate from the registry record; the sponsor has not given a date.",
    source: ct("NCT05899608"),
  },
  {
    id: "c-sunray-01-readout", date: "2027", kind: "readout", confidence: "expected",
    title: "SUNRAY-01: olomorasib plus pembrolizumab, first-line KRAS G12C NSCLC",
    companies: ["eli-lilly"], drugs: ["olomorasib", "pembrolizumab"], refs: ["kras", "nsclc"],
    note: "Phase 3 in first-line KRAS G12C-mutant NSCLC. Timing is a registry-based estimate.",
    source: ct("NCT06119581"),
  },
  {
    id: "c-krascendo-1-readout", date: "2027", kind: "readout", confidence: "expected",
    title: "Krascendo 1: divarasib versus sotorasib or adagrasib, previously treated KRAS G12C NSCLC",
    companies: ["roche-genentech"], drugs: ["divarasib", "sotorasib", "adagrasib"], refs: ["kras", "nsclc"],
    note: "The first phase 3 comparing KRAS G12C inhibitors head to head. Timing is a registry-based estimate.",
    source: ct("NCT06497556"),
  },
  {
    id: "c-ideate-lung02-readout", date: "2027", kind: "readout", confidence: "expected",
    title: "IDeate-Lung02: ifinatamab deruxtecan versus chemotherapy, relapsed small-cell lung cancer",
    companies: ["daiichi-sankyo", "merck"], drugs: ["ifinatamab-deruxtecan"], refs: ["sclc", "b7h3"],
    note: "Pivotal phase 3 for the B7-H3 ADC from the Merck and Daiichi Sankyo collaboration. Timing is a registry-based estimate.",
    source: ct("NCT06203210"),
  },
  {
    id: "c-rejoice-ovarian01-readout", date: "2027", kind: "readout", confidence: "expected",
    title: "REJOICE-Ovarian01: raludotatug deruxtecan in platinum-resistant ovarian cancer",
    companies: ["daiichi-sankyo", "merck"], drugs: ["raludotatug-deruxtecan"], refs: ["ovarian", "cdh6"],
    note: "Phase 2/3 for the CDH6 ADC. Timing is a registry-based estimate.",
    source: ct("NCT06161025"),
  },
  {
    id: "c-tropion-lung14-readout", date: "2027", kind: "readout", confidence: "expected",
    title: "TROPION-Lung14: datopotamab deruxtecan plus osimertinib, first-line EGFR-mutant NSCLC",
    companies: ["astrazeneca", "daiichi-sankyo"], drugs: ["datopotamab-deruxtecan", "osimertinib"], refs: ["nsclc", "egfr", "trop2"],
    note: "Would move the TROP2 ADC into the first-line EGFR-mutant setting on top of the standard TKI. Timing is a registry-based estimate.",
    source: ct("NCT06350097"),
  },
  {
    id: "c-ascent-07-readout", date: "2027", kind: "readout", confidence: "expected",
    title: "ASCENT-07: sacituzumab govitecan versus chemotherapy, first-line HR-positive HER2-negative metastatic breast cancer",
    companies: ["gilead"], drugs: ["sacituzumab-govitecan"], refs: ["breast-hr-positive", "trop2"],
    note: "Tests the ADC as the first chemotherapy after endocrine therapy. Timing is a registry-based estimate.",
    source: ct("NCT05840211"),
  },
  {
    id: "c-pluvicto-mhspc-decision", date: "2026", kind: "pdufa", confidence: "expected",
    title: "FDA decision on Pluvicto in metastatic hormone-sensitive prostate cancer (PSMAddition)",
    companies: ["novartis"], drugs: ["pluvicto"], refs: ["prostate", "psma"],
    note: "Novartis announced the supplemental filing after the PSMAddition results in 2025. No action date has been disclosed; the year is our estimate.",
    source: "https://www.novartis.com/news",
  },
  {
    id: "c-intismeran-filing", date: "2027", kind: "filing", confidence: "expected",
    title: "Regulatory filings for intismeran autogene plus pembrolizumab in adjuvant melanoma (INTerpath-001)",
    companies: ["moderna", "merck"], drugs: ["intismeran-autogene", "pembrolizumab"], refs: ["melanoma", "interpath-001"],
    note: "The sponsors said filings would follow the positive topline result of August 2026 and the full data presentation. Timing is our estimate.",
    source: "https://www.merck.com/news/merck-and-moderna-announce-phase-3-interpath-001-trial-of-intismeran-autogene-plus-keytruda-met-endpoints-of-recurrence-free-survival-rfs-and-distant-metastasis-free-survival-dmfs-in-patient/",
  },
  {
    id: "c-tempus-personalis-close", date: "2026-Q4", kind: "deal-close", confidence: "expected",
    title: "Tempus completes the acquisition of Personalis",
    companies: ["tempus", "personalis"], drugs: [], refs: ["mrd-testing", "liquid-biopsy"],
    note: "All-stock deal at $16.25 per share announced July 2026; the companies guided to a close in late 2026 or early 2027.",
    source: "https://investors.tempus.com/news-releases/news-release-details/tempus-acquire-personalis-more-tightly-integrating-molecular",
  },
];

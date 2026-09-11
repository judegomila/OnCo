/**
 * Readout calendar: regulatory dates, advisory committees, expected trial readouts, congresses.
 * `confidence: "confirmed"` needs a source URL. `"expected"` means our editorial estimate of timing
 * based on trial registrations and sponsor statements; treat as a guess until confirmed.
 * Dates may be a day (YYYY-MM-DD), a month (YYYY-MM), or a quarter (YYYY-Qn).
 */
export type CalendarKind = "pdufa" | "adcom" | "readout-expected" | "congress" | "policy";
export type CalendarEvent = {
  date: string;
  title: string;
  kind: CalendarKind;
  refs: string[];
  note: string;
  source?: string;
  confidence: "confirmed" | "expected";
};

export const calendar: CalendarEvent[] = [
  {
    date: "2026-09-23", kind: "adcom", confidence: "confirmed",
    title: "FDA advisory committee: Galleri multi-cancer early detection test (PMA)",
    refs: ["galleri", "grail", "mced", "nhs-galleri", "pathfinder-2"],
    note: "Molecular and Clinical Genetics Panel of the Medical Devices Advisory Committee reviews GRAIL's premarket approval application. The first FDA-level judgement on a multi-cancer blood screening test.",
    source: "https://www.prnewswire.com/news-releases/grail-announces-fda-advisory-committee-meeting-to-review-premarket-approval-application-for-the-galleri-multi-cancer-early-detection-test-302846154.html",
  },
  {
    date: "2026-10-23", kind: "congress", confidence: "confirmed",
    title: "ESMO Congress 2026, Madrid (23 to 27 October)",
    refs: ["esmo"],
    note: "Europe's largest oncology congress. Watch for: TROPION-Breast05, first-line ADC + IO data, late-breaking radioligand and bispecific ADC results.",
    source: "https://www.esmo.org/meeting-calendar/esmo-congress-2026/registration",
  },
  {
    date: "2026-12-08", kind: "congress", confidence: "confirmed",
    title: "San Antonio Breast Cancer Symposium 2026 (8 to 11 December)",
    refs: ["tnbc", "breast-hr-positive", "breast-her2-positive"],
    note: "The breast cancer congress. Post-neoadjuvant TNBC ADC trials (ASCENT-05, TROPION-Breast03) and sac-TMT first-line TNBC data are candidates for presentation here or at ESMO.",
    source: "https://sabcs.org/media/future-symposia/",
  },
  {
    date: "2026-12-12", kind: "congress", confidence: "confirmed",
    title: "ASH Annual Meeting 2026, New Orleans (12 to 15 December)",
    refs: ["aml", "dlbcl", "multiple-myeloma", "cll", "all-leukemia"],
    note: "Haematology's main congress: CAR-T, bispecifics, menin inhibitors, BCL-2 combinations.",
    source: "https://www.hematology.org/meetings/annual-meeting",
  },
  {
    date: "2027-04-02", kind: "congress", confidence: "confirmed",
    title: "AACR Annual Meeting 2027, Orlando (2 to 7 April)",
    refs: ["aacr"],
    note: "Early science and first-in-human data: next-generation ADC payloads, degraders, in vivo CAR-T.",
    source: "https://www.aacr.org/meeting/aacr-annual-meeting-2027/",
  },
  {
    date: "2027-06-04", kind: "congress", confidence: "confirmed",
    title: "ASCO Annual Meeting 2027, Chicago (4 to 8 June)",
    refs: ["asco"],
    note: "Where most practice-changing phase 3 trials are first presented.",
    source: "https://www.asco.org/annual-meeting",
  },

  // ---- Expected readouts (editorial estimates) ----
  {
    date: "2026-Q4", kind: "readout-expected", confidence: "expected",
    title: "TROPION-Breast05: Dato-DXd ± durvalumab vs pembrolizumab + chemotherapy, first-line PD-L1+ TNBC",
    refs: ["tropion-breast05", "datopotamab-deruxtecan", "durvalumab", "tnbc"],
    note: "Primary completion per registry falls in 2026; timing of topline is our estimate. Would complete the ADC + IO first-line picture alongside ASCENT-04.",
    source: "https://clinicaltrials.gov/study/NCT06103864",
  },
  {
    date: "2026-Q4", kind: "readout-expected", confidence: "expected",
    title: "INTerpath-001 full data: intismeran autogene + pembrolizumab, adjuvant melanoma",
    refs: ["interpath-001", "intismeran-autogene", "melanoma"],
    note: "Topline positive 19 August 2026; hazard ratios and curves expected at a late-2026 congress (ESMO or SMR), with regulatory filings to follow.",
    source: "https://www.merck.com/news/merck-and-moderna-announce-phase-3-interpath-001-trial-of-intismeran-autogene-plus-keytruda-met-endpoints-of-recurrence-free-survival-rfs-and-distant-metastasis-free-survival-dmfs-in-patient/",
  },
  {
    date: "2027-Q1", kind: "readout-expected", confidence: "expected",
    title: "RASolute 302: daraxonrasib vs chemotherapy, second-line metastatic pancreatic cancer",
    refs: ["daraxonrasib", "revolution-medicines", "pancreatic", "kras"],
    note: "Fully enrolled; event-driven OS endpoint. Sponsor has guided to a readout in 2026 or 2027. The first pivotal test of a pan-RAS inhibitor.",
    source: "https://clinicaltrials.gov/study/NCT06625320",
  },
  {
    date: "2027-Q2", kind: "readout-expected", confidence: "expected",
    title: "IZABRIGHT-Breast01: iza-bren vs chemotherapy, first-line TNBC (PD-(L)1 ineligible)",
    refs: ["izabright-breast01", "izalontamab-brengitecan", "tnbc"],
    note: "Global first-line trial of the EGFR×HER3 bispecific ADC; timing is an estimate from enrolment start (2025).",
    source: "https://clinicaltrials.gov/study/NCT06926868",
  },
  {
    date: "2027", kind: "pdufa", confidence: "expected",
    title: "US regulatory decision on sacituzumab tirumotecan (sac-TMT): first indication",
    refs: ["sacituzumab-tirumotecan", "merck", "kelun-biotech"],
    note: "Merck holds a Commissioner's National Priority Voucher (July 2026) that promises a 1 to 2 month review once filed. No PDUFA date has been disclosed; indication (TNBC vs EGFR-mutant NSCLC) and filing timing are not public.",
    source: "https://www.pharmacytimes.com/view/fda-grants-national-priority-vouchers-to-enlicitide-decanoate-sacituzumab-tirumotecan",
  },
  {
    date: "2027", kind: "readout-expected", confidence: "expected",
    title: "ASCENT-05 / OptimICE-RD: sacituzumab govitecan + pembrolizumab, post-neoadjuvant residual TNBC",
    refs: ["ascent-05", "sacituzumab-govitecan", "pembrolizumab", "tnbc"],
    note: "Event-driven iDFS endpoint in patients with residual disease after KEYNOTE-522-type therapy. Would be the first ADC in the curative TNBC setting.",
    source: "https://clinicaltrials.gov/study/NCT05633654",
  },
  {
    date: "2027-Q4", kind: "readout-expected", confidence: "expected",
    title: "TROPION-Breast03: Dato-DXd ± durvalumab, post-neoadjuvant residual TNBC",
    refs: ["tropion-breast03", "datopotamab-deruxtecan", "durvalumab", "tnbc"],
    note: "Registry estimated primary completion 20 September 2027; topline may lag.",
    source: "https://clinicaltrials.gov/study/NCT05629585",
  },
  {
    date: "2026-Q4", kind: "policy", confidence: "expected",
    title: "NHS England decision on Galleri rollout after full NHS-Galleri results",
    refs: ["nhs-galleri", "galleri", "mced"],
    note: "Full results presented at ASCO 2026 (primary stage III to IV endpoint not met; stage IV reduction reported). NHS England said it would wait for final results before any rollout decision; timing of a decision is not announced.",
    source: "https://grail.com/press-releases/grail-reports-full-results-from-nhs-galleri-trial-demonstrating-substantial-reduction-in-stage-iv-cancer-diagnoses-at-2026-asco-annual-meeting/",
  },
];

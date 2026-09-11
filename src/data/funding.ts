/**
 * Where the money in the war on cancer comes from. Every row has a source URL and the year
 * the figure refers to. Figures are as published by the funder; currencies are not converted.
 * If a figure cannot be sourced it is not here.
 */
export type FundingRow = {
  id: string;
  funder: string;
  type: "government" | "charity" | "eu" | "industry";
  country: string;
  amount: string;
  what: string;
  year: string;
  source: string;
  /** OnCo entity ids to link. */
  refs: string[];
  note?: string;
};

export const funding: FundingRow[] = [
  { id: "nci-budget", funder: "US National Cancer Institute (NCI)", type: "government", country: "US", amount: "US$7.22 billion", what: "Total NCI appropriation, FY2024 (FY2025 continued at roughly the same level under continuing resolutions; FY2026 proposals include cuts)", year: "FY2024", source: "https://www.cancer.gov/about-nci/budget", refs: ["nci"], note: "The single largest cancer research funder in the world. Funds the 74 NCI-designated centres, the NCTN cooperative groups, SEER, and intramural research." },
  { id: "nih-total", funder: "US National Institutes of Health (all institutes)", type: "government", country: "US", amount: "≈US$47 billion", what: "Total NIH appropriation, of which NCI is the largest institute", year: "FY2024", source: "https://www.nih.gov/about-nih/what-we-do/budget", refs: ["nci"] },
  { id: "cancer-moonshot", funder: "Cancer Moonshot (21st Century Cures Act)", type: "government", country: "US", amount: "US$1.8 billion over 7 years", what: "Dedicated Moonshot funding to NCI, FY2017 to FY2023, for immunotherapy, data sharing, early detection, and paediatric cancer", year: "2017 to 2023", source: "https://www.cancer.gov/research/key-initiatives/moonshot-cancer-initiative/funding", refs: ["nci"] },
  { id: "arpa-h", funder: "ARPA-H (Advanced Research Projects Agency for Health)", type: "government", country: "US", amount: "US$1.5 billion", what: "Total agency appropriation (all diseases); cancer programmes include ADAPT (adaptive cancer therapy) and early-detection efforts", year: "FY2024", source: "https://arpa-h.gov", refs: [], note: "Not cancer-specific; a meaningful share goes to oncology programmes." },
  { id: "cruk", funder: "Cancer Research UK", type: "charity", country: "GB", amount: "≈£440 million", what: "Annual research expenditure of the world's largest independent cancer charity", year: "2023/24", source: "https://www.cancerresearchuk.org/about-us/annual-report-and-accounts", refs: ["cruk", "francis-crick", "icr-london", "the-christie"] },
  { id: "eu-cancer-mission", funder: "EU Mission on Cancer (Horizon Europe)", type: "eu", country: "EU", amount: "€378 million (2021 to 2023 work programme)", what: "Horizon Europe research funding under the Cancer Mission; part of Europe's Beating Cancer Plan (≈€4 billion across EU instruments)", year: "2021 to 2023", source: "https://research-and-innovation.ec.europa.eu/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe/eu-missions-horizon-europe/eu-mission-cancer_en", refs: ["curie-nki-eortc", "gustave-roussy", "dkfz"] },
  { id: "dkfz", funder: "German Cancer Research Center (DKFZ)", type: "government", country: "DE", amount: "≈€400 million", what: "Annual budget, 90% federal and 10% Baden-Württemberg, plus third-party funds", year: "2024", source: "https://www.dkfz.de/en/about-dkfz", refs: ["dkfz", "heidelberg-nct"] },
  { id: "bcrf", funder: "Breast Cancer Research Foundation", type: "charity", country: "US", amount: "≈US$60 million per year", what: "Annual research grants; the largest private funder of breast cancer research", year: "2024 to 2025", source: "https://www.bcrf.org/about-bcrf/", refs: ["tnbc", "breast-hr-positive", "breast-her2-positive"] },
  { id: "su2c", funder: "Stand Up To Cancer", type: "charity", country: "US", amount: ">US$800 million raised since 2008", what: "Cumulative funds for collaborative 'Dream Team' translational research", year: "2008 to 2025", source: "https://standuptocancer.org/about-su2c/", refs: [] },
  { id: "ludwig", funder: "Ludwig Cancer Research", type: "charity", country: "CH", amount: "≈US$3 billion committed since 1971", what: "Cumulative funding of Ludwig Institute branches and Ludwig Centers at six US universities", year: "1971 to 2025", source: "https://www.ludwigcancerresearch.org/about/", refs: ["johns-hopkins", "mskcc", "stanford"] },
  { id: "pharma-oncology-market", funder: "Pharmaceutical industry (oncology medicines spending)", type: "industry", country: "Global", amount: "≈US$250 billion (2024) → ≈US$440 billion (2029, projected)", what: "Global spending on cancer medicines per IQVIA Global Oncology Trends; the revenue base that funds most late-stage oncology R&D", year: "2024", source: "https://www.iqvia.com/insights/the-iqvia-institute/reports-and-publications/reports/global-oncology-trends-2025", refs: ["merck", "astrazeneca", "roche-genentech", "bms", "pfizer", "johnson-johnson", "novartis", "daiichi-sankyo", "gilead", "abbvie"], note: "Spending, not R&D. Oncology is the largest therapeutic area in industry pipelines by number of programmes." },
];

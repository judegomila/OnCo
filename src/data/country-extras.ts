/**
 * Hand-curated country context for the research ranking. Every row carries its sources.
 *
 *  population        millions, World Bank 2024 estimates (rounded)
 *  incidence         GLOBOCAN 2024 age-standardised incidence rate, all cancers (C00-97, code 39), per 100,000 (both sexes).
 *                    Not "excluding non-melanoma skin", which this file said until 25 September 2026: GLOBOCAN's code 40
 *                    for that is null for every country here, so every value has always been the all-cancers one. It matters
 *                    most where a registry counts keratinocyte cancers heavily, which is why the Russia page names the code.
 *  mortality         GLOBOCAN 2024 age-standardised mortality rate, per 100,000 (both sexes)
 *                    On 3 November 2026 every incidence, mortality and population value was re-read against
 *                    public/globocan/countries.json (code 39) and the World Bank 2024 series; 28 rows had at least one value
 *                    that matched neither (Saudi Arabia incidence 122 against 87, Korea 300 against 235, China mortality 129
 *                    against 96) and were corrected. The same day the file moved from GLOBOCAN 2022 to GLOBOCAN 2024 (IARC,
 *                    September 2026) and every rate was re-read from the 2024 file. Some countries moved a long way between
 *                    the editions because IARC changed the sources and methods behind them, not because cancer changed:
 *                    Singapore mortality 111 to 71, Egypt incidence 166 to 138, France incidence 339 to 300.
 *  funder / budget   main public cancer-research funder and an approximate annual figure with year and source
 *
 * Figures are approximate and for orientation; follow the source links for exact values.
 * Sources: World Bank population (https://data.worldbank.org/indicator/SP.POP.TOTL); IARC Global Cancer
 * Observatory country fact sheets (https://gco.iarc.who.int/today/en/fact-sheets-populations); funder sites.
 */
export type CountryExtra = {
  name: string;
  population: number;
  incidence?: number;
  mortality?: number;
  funder?: string;
  budget?: string;
  budgetSource?: string;
  programmes?: string[];
  gcoUrl?: string;
};

/**
 * IARC names each country fact sheet "<ISO numeric code>-<GCO country name as a slug>-fact-sheet.pdf". The helper used
 * to pad the code into the name ("410-410-fact-sheet.pdf"), which IARC answers with 403. Each slug below was checked
 * on 3 November 2026 and answered with the GLOBOCAN 2024 PDF.
 */
const GCO_SLUG: Record<number, string> = {
  // Added 4 November 2026 with the wave 3 country pages; each answered with the GLOBOCAN 2024 PDF that day.
  50: "bangladesh", 360: "indonesia", 566: "nigeria", 586: "pakistan", 764: "thailand",
  36: "australia", 40: "austria", 56: "belgium", 76: "brazil", 124: "canada", 156: "china", 208: "denmark", 250: "france-metropolitan",
  276: "germany", 300: "greece", 356: "india", 364: "iran-islamic-republic-of", 376: "israel", 380: "italy", 392: "japan",
  410: "korea-republic-of", 484: "mexico", 528: "the-netherlands", 578: "norway", 616: "poland", 620: "portugal",
  643: "russian-federation", 682: "saudi-arabia", 702: "singapore", 724: "spain", 752: "sweden", 756: "switzerland",
  792: "turkiye", 818: "egypt", 826: "united-kingdom", 840: "united-states-of-america",
  // Wave 11 (11 November 2026); each answered with the GLOBOCAN 2024 PDF that day.
  31: "azerbaijan", 70: "bosnia-herzegovina", 188: "costa-rica", 332: "haiti", 466: "mali", 598: "papua-new-guinea", 600: "paraguay", 686: "senegal", 705: "slovenia", 854: "burkina-faso",
};
const gco = (code: number) => `https://gco.iarc.who.int/media/globocan/factsheets/populations/${code}-${GCO_SLUG[code]}-fact-sheet.pdf`;

export const countryExtras: Record<string, CountryExtra> = {
  US: { name: "United States", population: 340, incidence: 358, mortality: 80, funder: "National Cancer Institute (NIH)", budget: "$7.35 billion (FY2026 appropriation)", budgetSource: "https://www.cancer.gov/about-nci/budget", programmes: ["Cancer Moonshot", "NCI-designated Cancer Centers (74)", "ARPA-H", "SEER"], gcoUrl: gco(840) },
  CN: { name: "China", population: 1410, incidence: 208, mortality: 91, funder: "National Natural Science Foundation of China; NHC / NMPA programmes", budget: "NSFC total ≈ CN¥ 35 billion (2023 outturn), all fields", budgetSource: "https://www.nsfc.gov.cn/Portals/0/fj/fj20240326_01.pdf", programmes: ["Healthy China 2030 cancer targets", "National Cancer Center", "Domestic ADC and PD-1 pipelines"], gcoUrl: gco(156) },
  GB: { name: "United Kingdom", population: 69, incidence: 306, mortality: 97, funder: "Cancer Research UK; NIHR; MRC", budget: "CRUK ≈ £416 million research spend (2025/26)", budgetSource: "https://www.cancerresearchuk.org/our-accounts", programmes: ["NHS-Galleri", "Genomics England", "CRUK Cancer Grand Challenges", "NHS Cancer Plan"], gcoUrl: gco(826) },
  IN: { name: "India", population: 1451, incidence: 104, mortality: 60, funder: "ICMR; DBT; Department of Atomic Energy (Tata Memorial)", budget: "ICMR ≈ ₹ 2,732 crore (2024-25 budget estimate), all fields", budgetSource: "https://indiabudget.gov.in/budget2024-25/doc/eb/sbe47.pdf", programmes: ["National Cancer Grid", "Tata Memorial Centre", "Ayushman Bharat"], gcoUrl: gco(356) },
  IT: { name: "Italy", population: 59, incidence: 297, mortality: 89, funder: "AIRC; Ministero della Salute", budget: "AIRC ≈ €141 million for research (2024)", budgetSource: "https://bilanciosociale.airc.it/wp-content/uploads/2025/06/AIRC-abstract_WEB.pdf", programmes: ["Alliance Against Cancer (ACC)", "IRCCS network"], gcoUrl: gco(380) },
  DE: { name: "Germany", population: 84, incidence: 271, mortality: 98, funder: "DKFZ (Helmholtz) / BMBF; Deutsche Krebshilfe; DFG", budget: "DKFZ ≈ €515 million total budget (2026), all sources", budgetSource: "https://dkfz.de/en/about-us/who-we-are/facts-and-figures", programmes: ["National Decade Against Cancer", "NCT network", "German Cancer Consortium (DKTK)"], gcoUrl: gco(276) },
  JP: { name: "Japan", population: 124, incidence: 288, mortality: 82, funder: "AMED; JSPS; National Cancer Center", budget: "AMED ≈ ¥ 124.5 billion (FY2024 initial budget), all fields", budgetSource: "https://www8.cao.go.jp/iryou/council/20250114/pdf/sankou4.pdf", programmes: ["Basic Plan to Promote Cancer Control", "SCRUM-Japan", "Cancer Genomic Medicine Core Hospitals"], gcoUrl: gco(392) },
  FR: { name: "France", population: 69, incidence: 300, mortality: 96, funder: "Institut National du Cancer (INCa); Inserm; ARC Foundation", budget: "INCa ≈ €80 million research spend (2024)", budgetSource: "https://www.cancer.fr/content/download/125103/file/RAPERF24-INCa25_Rapport_performance_2024_planches.pdf?version=2", programmes: ["Ten-Year Cancer Control Strategy 2021-2030", "Unicancer", "France Génomique"], gcoUrl: gco(250) },
  KR: { name: "South Korea", population: 52, incidence: 236, mortality: 72, funder: "KHIDI / Ministry of Health and Welfare; NRF", programmes: ["National Cancer Screening Program", "K-MASTER precision oncology"], gcoUrl: gco(410) },
  CA: { name: "Canada", population: 41, incidence: 344, mortality: 88, funder: "CIHR; Canadian Cancer Society; Terry Fox Research Institute", budget: "CIHR ≈ C$ 1.4 billion actual spending (2024-25), all fields", budgetSource: "https://cihr-irsc.gc.ca/e/54360.html", programmes: ["Marathon of Hope Cancer Centres Network", "Canadian Cancer Trials Group"], gcoUrl: gco(124) },
  ES: { name: "Spain", population: 49, incidence: 255, mortality: 84, funder: "Instituto de Salud Carlos III; AECC", budget: "AECC ≈ €40 million in new research grants (2025); €157 million in active projects", budgetSource: "https://www.contraelcancer.es", programmes: ["CIBERONC", "Vall d'Hebron Institute of Oncology"], gcoUrl: gco(724) },
  AU: { name: "Australia", population: 27, incidence: 461, mortality: 82, funder: "NHMRC; Medical Research Future Fund; Cancer Australia", budget: "MRFF ≈ A$ 650 million disbursed (2025-26), all fields", budgetSource: "https://budget.gov.au/content/bp2/download/bp2_2026-27.pdf", programmes: ["Australian Cancer Plan", "Zero Childhood Cancer", "Peter MacCallum theranostics"], gcoUrl: gco(36) },
  NL: { name: "Netherlands", population: 18, incidence: 321, mortality: 100, funder: "KWF Dutch Cancer Society; ZonMw", budget: "KWF ≈ €190 million spent on its mission (2025), mostly research", budgetSource: "https://www.kwf.nl/sites/default/files/2026-04/kwf-jaarverslag-2025.pdf", programmes: ["Netherlands Cancer Institute", "Oncode Institute", "DRUP trial"], gcoUrl: gco(528) },
  BR: { name: "Brazil", population: 212, incidence: 211, mortality: 91, funder: "INCA; CNPq; FAPESP", budget: "FAPESP ≈ R$ 1.8 billion in grants and fellowships (2024), all fields", budgetSource: "https://fapesp.br/publicacoes/relat2024.pdf", programmes: ["INCA national cancer institute", "Hospital A.C. Camargo", "LACOG cooperative group"], gcoUrl: gco(76) },
  CH: { name: "Switzerland", population: 9, incidence: 287, mortality: 76, funder: "Swiss Cancer Research; SNSF", budget: "Swiss Cancer Research ≈ CHF 16 million in research grants (2024)", budgetSource: "https://www.cancerresearch.ch/ueber-uns/publikationen/research-report/-dl-/fileadmin/downloads/forschungsbericht/krebsforschung-in-der-schweiz-ausgabe-2025.pdf", programmes: ["SAKK cooperative group", "Swiss Personalized Health Network"], gcoUrl: gco(756) },
  SE: { name: "Sweden", population: 11, incidence: 289, mortality: 76, funder: "Swedish Cancer Society (Cancerfonden); Swedish Research Council", budget: "Cancerfonden ≈ SEK 1 billion in research grants (2024)", budgetSource: "https://static-files.cancerfonden.se/Arsrapporter-2024.pdf", programmes: ["National quality registries", "Karolinska Comprehensive Cancer Centre"], gcoUrl: gco(752) },
  TR: { name: "Türkiye", population: 86, incidence: 206, mortality: 95, funder: "TÜBİTAK; Ministry of Health", programmes: ["National Cancer Control Programme"], gcoUrl: gco(792) },
  IR: { name: "Iran", population: 92, incidence: 147, mortality: 92, funder: "Ministry of Health and Medical Education; NIMAD", programmes: ["National Cancer Control Programme"], gcoUrl: gco(364) },
  PL: { name: "Poland", population: 37, incidence: 256, mortality: 124, funder: "National Science Centre; Medical Research Agency", programmes: ["National Oncology Strategy 2020-2030"], gcoUrl: gco(616) },
  BE: { name: "Belgium", population: 12, incidence: 314, mortality: 86, funder: "Fondation contre le Cancer / Kom op tegen Kanker; FWO / FNRS", programmes: ["EORTC headquarters (Brussels)"], gcoUrl: gco(56) },
  // Incidence and mortality removed 2026-11-03: GLOBOCAN publishes no separate estimate for Taiwan, so the 292 and 105 shown
  // here had no source, and the Taiwan Cancer Registry's own rates use a different standard population.
  TW: { name: "Taiwan", population: 23, funder: "National Science and Technology Council; Ministry of Health and Welfare", programmes: ["National Cancer Prevention Program", "Taiwan Cancer Registry"] },
  EG: { name: "Egypt", population: 117, incidence: 138, mortality: 82, funder: "Academy of Scientific Research and Technology", programmes: ["National Cancer Institute Cairo", "Children's Cancer Hospital 57357"], gcoUrl: gco(818) },
  SA: { name: "Saudi Arabia", population: 35, incidence: 96, mortality: 45, funder: "King Abdulaziz City for Science and Technology; Ministry of Health", programmes: ["King Faisal Specialist Hospital", "Saudi Cancer Registry"], gcoUrl: gco(682) },
  DK: { name: "Denmark", population: 6, incidence: 345, mortality: 100, funder: "Danish Cancer Society; Novo Nordisk Foundation", budget: "Danish Cancer Society ≈ DKK 400 million/year", budgetSource: "https://www.cancer.dk", programmes: ["Danish Comprehensive Cancer Center", "National patient registries"], gcoUrl: gco(208) },
  AT: { name: "Austria", population: 9, incidence: 237, mortality: 86, funder: "FWF; Austrian Cancer Aid", programmes: ["MedAustron ion therapy"], gcoUrl: gco(40) },
  // Incidence and mortality corrected 2026-09-25 to the GLOBOCAN file this site renders (public/globocan/countries.json,
  // ISR code 39: 245.78 and 83.2 in GLOBOCAN 2022; 233.66 and 77.48 in GLOBOCAN 2024, which this row now carries); the
  // previous 262 and 76 matched no source we could find. Note that the Israel National
  // Cancer Registry states in its own 2021 report that Global Cancer Observatory figures for Israel cannot be compared with
  // the rates it measures, because they merge populations it reports separately: see /countries/il/#registry-limits.
  IL: { name: "Israel", population: 10, incidence: 234, mortality: 77, funder: "Israel Cancer Association (a charity, on donations); Israel Science Foundation; Israel Innovation Authority", programmes: ["Annual public health basket committee", "Population BRCA founder-variant testing", "National Cancer Registry (mandatory notification since 1982)", "Academic point-of-care CAR-T at Hadassah and Sheba"], gcoUrl: gco(376) },
  SG: { name: "Singapore", population: 6, incidence: 203, mortality: 71, funder: "National Medical Research Council (NMRC)", programmes: ["National Cancer Centre Singapore", "Singapore Translational Cancer Consortium"], gcoUrl: gco(702) },
  RU: { name: "Russia", population: 144, incidence: 243, mortality: 107, funder: "Russian Science Foundation; Ministry of Health", programmes: ["N.N. Blokhin National Medical Research Center of Oncology", "Federal project on cancer within the national project Long and Active Life 2025-2030", "Herzen institute national cancer statistics"], gcoUrl: gco(643) },
  MX: { name: "Mexico", population: 131, incidence: 136, mortality: 63, funder: "CONAHCYT; Instituto Nacional de Cancerología", programmes: ["INCan Mexico City"], gcoUrl: gco(484) },
  GR: { name: "Greece", population: 10, incidence: 273, mortality: 100, funder: "Hellenic Foundation for Research and Innovation", programmes: ["Hellenic Cooperative Oncology Group"], gcoUrl: gco(300) },
  PT: { name: "Portugal", population: 11, incidence: 293, mortality: 106, funder: "FCT; Liga Portuguesa Contra o Cancro", programmes: ["IPO Porto and Lisbon"], gcoUrl: gco(620) },
  NO: { name: "Norway", population: 6, incidence: 335, mortality: 86, funder: "Norwegian Cancer Society; Research Council of Norway", programmes: ["Cancer Registry of Norway", "Oslo University Hospital"], gcoUrl: gco(578) },
  // Wave 3 (4 November 2026): rates from public/globocan/countries.json code 39, population from the World Bank 2024
  // series. No funder is given because none was researched; each country page names its funders where it found them.
  ID: { name: "Indonesia", population: 284, incidence: 151, mortality: 91, gcoUrl: gco(360) },
  PK: { name: "Pakistan", population: 251, incidence: 107, mortality: 69, gcoUrl: gco(586) },
  BD: { name: "Bangladesh", population: 174, incidence: 118, mortality: 88, gcoUrl: gco(50) },
  NG: { name: "Nigeria", population: 233, incidence: 114, mortality: 71, gcoUrl: gco(566) },
  TH: { name: "Thailand", population: 72, incidence: 142, mortality: 90, gcoUrl: gco(764) },
  // Wave 4 (4 November 2026): rates from public/globocan/countries.json code 39, population from the World Bank 2024
  // series as tabulated in docs/proposals/country-coverage-2026-11.md. No funder is given because none was researched
  // for this file; each country page names its funders where it found them.
  VN: { name: "Viet Nam", population: 101, incidence: 142, mortality: 89, gcoUrl: gco(704) },
  PH: { name: "Philippines", population: 116, incidence: 150, mortality: 89, gcoUrl: gco(608) },
  ET: { name: "Ethiopia", population: 132, incidence: 95, mortality: 59, gcoUrl: gco(231) },
  ZA: { name: "South Africa", population: 64, incidence: 162, mortality: 88, gcoUrl: gco(710) },
  CO: { name: "Colombia", population: 53, incidence: 181, mortality: 79, gcoUrl: gco(170) },
  AR: { name: "Argentina", population: 46, incidence: 215, mortality: 100, gcoUrl: gco(32) },
  UA: { name: "Ukraine", population: 38, incidence: 218, mortality: 108, gcoUrl: gco(804) },
  RO: { name: "Romania", population: 19, incidence: 266, mortality: 128, gcoUrl: gco(642) },
  MY: { name: "Malaysia", population: 36, incidence: 141, mortality: 85, gcoUrl: gco(458) },
  DZ: { name: "Algeria", population: 47, incidence: 153, mortality: 79, gcoUrl: gco(12) },
  // Wave 11 (11 November 2026): rates from public/globocan/countries.json code 39, population from the World Bank 2024
  // series (SP.POP.TOTL, read from its API that day) to one decimal, as these countries are small. No funder researched.
  AZ: { name: "Azerbaijan", population: 10.2, incidence: 120, mortality: 69, gcoUrl: gco(31) },
  BA: { name: "Bosnia and Herzegovina", population: 3.2, incidence: 215, mortality: 112, gcoUrl: gco(70) },
  HT: { name: "Haiti", population: 11.8, incidence: 167, mortality: 111, gcoUrl: gco(332) },
  SN: { name: "Senegal", population: 18.5, incidence: 121, mortality: 85, gcoUrl: gco(686) },
  SI: { name: "Slovenia", population: 2.1, incidence: 297, mortality: 114, gcoUrl: gco(705) },
  ML: { name: "Mali", population: 24.5, incidence: 117, mortality: 80, gcoUrl: gco(466) },
  PG: { name: "Papua New Guinea", population: 10.6, incidence: 200, mortality: 118, gcoUrl: gco(598) },
  BF: { name: "Burkina Faso", population: 23.5, incidence: 110, mortality: 76, gcoUrl: gco(854) },
  CR: { name: "Costa Rica", population: 5.1, incidence: 178, mortality: 73, gcoUrl: gco(188) },
  PY: { name: "Paraguay", population: 6.9, incidence: 190, mortality: 93, gcoUrl: gco(600) },
};

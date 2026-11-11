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
  // The wave 4 rows (4 November 2026) had no slug, so their links read "<code>-undefined-fact-sheet.pdf"; each slug below
  // answered with the GLOBOCAN 2024 PDF on 11 November 2026.
  704: "viet-nam", 608: "philippines", 231: "ethiopia", 710: "south-africa", 170: "colombia", 32: "argentina", 804: "ukraine", 642: "romania", 458: "malaysia", 12: "algeria",
  // Added 11 November 2026 with the wave 5 country pages; each answered with the GLOBOCAN 2024 PDF that day.
  504: "morocco", 368: "iraq", 604: "peru", 104: "myanmar", 152: "chile", 404: "kenya", 203: "czechia",
  50: "bangladesh", 360: "indonesia", 566: "nigeria", 586: "pakistan", 764: "thailand",
  // Added 11 November 2026 with the wave 6 country pages; each answered with the GLOBOCAN 2024 PDF that day.
  144: "sri-lanka", 180: "congo-democratic-republic-of", 348: "hungary", 729: "sudan", 800: "uganda", 834: "tanzania-united-republic-of", 860: "uzbekistan", 862: "venezuela",
  // Added 11 November 2026 with the wave 7 country pages; each answered with the GLOBOCAN 2024 PDF that day.
  288: "ghana", 524: "nepal", 398: "kazakhstan", 218: "ecuador", 192: "cuba", 887: "yemen", 112: "belarus", 688: "serbia", 760: "syrian-arab-republic",
  36: "australia", 40: "austria", 56: "belgium", 76: "brazil", 124: "canada", 156: "china", 208: "denmark", 250: "france-metropolitan",
  276: "germany", 300: "greece", 356: "india", 364: "iran-islamic-republic-of", 376: "israel", 380: "italy", 392: "japan",
  410: "korea-republic-of", 484: "mexico", 528: "the-netherlands", 578: "norway", 616: "poland", 620: "portugal",
  643: "russian-federation", 682: "saudi-arabia", 702: "singapore", 724: "spain", 752: "sweden", 756: "switzerland",
  792: "turkiye", 818: "egypt", 826: "united-kingdom", 840: "united-states-of-america",
  // Wave 8 (11 November 2026); each answered with the GLOBOCAN 2024 PDF that day.
  4: "afghanistan", 100: "bulgaria", 246: "finland", 408: "korea-democratic-peoples-republic-of", 116: "cambodia", 372: "ireland",
  716: "zimbabwe", 24: "angola", 788: "tunisia",
  // Added 11 November 2026 with the wave 9 country pages; each answered with the GLOBOCAN 2024 PDF that day.
  703: "slovakia", 554: "new-zealand", 191: "croatia", 508: "mozambique", 454: "malawi", 450: "madagascar", 214: "dominican-republic", 320: "guatemala", 384: "cote-divoire",
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
  // Wave 5 (11 November 2026): rates from public/globocan/countries.json code 39, population from the World Bank 2024
  // series as tabulated in docs/proposals/country-coverage-2026-11.md. Belgium, Portugal and Greece already had rows.
  MA: { name: "Morocco", population: 38, incidence: 113, mortality: 62, gcoUrl: gco(504) },
  IQ: { name: "Iraq", population: 46, incidence: 111, mortality: 69, gcoUrl: gco(368) },
  PE: { name: "Peru", population: 34, incidence: 187, mortality: 84, gcoUrl: gco(604) },
  MM: { name: "Myanmar", population: 55, incidence: 126, mortality: 90, gcoUrl: gco(104) },
  CL: { name: "Chile", population: 20, incidence: 162, mortality: 83, gcoUrl: gco(152) },
  KE: { name: "Kenya", population: 56, incidence: 111, mortality: 75, gcoUrl: gco(404) },
  CZ: { name: "Czechia", population: 11, incidence: 282, mortality: 102, gcoUrl: gco(203) },
  // Wave 6 (11 November 2026): rates from public/globocan/countries.json code 39, population from the World Bank 2024
  // series as tabulated in docs/proposals/country-coverage-2026-11.md. Saudi Arabia and Austria already had rows.
  SD: { name: "Sudan", population: 50, incidence: 132, mortality: 87, gcoUrl: gco(729) },
  CD: { name: "Democratic Republic of the Congo", population: 109, incidence: 116, mortality: 77, gcoUrl: gco(180) },
  HU: { name: "Hungary", population: 10, incidence: 333, mortality: 135, gcoUrl: gco(348) },
  TZ: { name: "Tanzania", population: 69, incidence: 78, mortality: 53, gcoUrl: gco(834) },
  UZ: { name: "Uzbekistan", population: 36, incidence: 112, mortality: 67, gcoUrl: gco(860) },
  UG: { name: "Uganda", population: 50, incidence: 124, mortality: 81, gcoUrl: gco(800) },
  VE: { name: "Venezuela", population: 28, incidence: 174, mortality: 85, gcoUrl: gco(862) },
  LK: { name: "Sri Lanka", population: 22, incidence: 134, mortality: 82, gcoUrl: gco(144) },
  // Wave 7 (11 November 2026): rates from public/globocan/countries.json code 39, population in millions from the
  // World Bank 2024 series as tabulated in docs/proposals/country-coverage-2026-11.md. Denmark already has a row. No
  // funder is given because none was researched for this file; each country page names its funders where it found them.
  GH: { name: "Ghana", population: 34, incidence: 114, mortality: 76, gcoUrl: gco(288) },
  NP: { name: "Nepal", population: 30, incidence: 90, mortality: 64, gcoUrl: gco(524) },
  KZ: { name: "Kazakhstan", population: 21, incidence: 125, mortality: 68, gcoUrl: gco(398) },
  EC: { name: "Ecuador", population: 18, incidence: 145, mortality: 72, gcoUrl: gco(218) },
  CU: { name: "Cuba", population: 11, incidence: 215, mortality: 113, gcoUrl: gco(192) },
  YE: { name: "Yemen", population: 41, incidence: 112, mortality: 71, gcoUrl: gco(887) },
  BY: { name: "Belarus", population: 9, incidence: 275, mortality: 124, gcoUrl: gco(112) },
  RS: { name: "Serbia", population: 7, incidence: 267, mortality: 128, gcoUrl: gco(688) },
  SY: { name: "Syrian Arab Republic", population: 25, incidence: 143, mortality: 88, gcoUrl: gco(760) },
  // Wave 8 (11 November 2026): rates from public/globocan/countries.json code 39, population from the World Bank 2024
  // series as tabulated in docs/proposals/country-coverage-2026-11.md. Norway already has a row above. No funder is given.
  AF: { name: "Afghanistan", population: 43, incidence: 119, mortality: 78, gcoUrl: gco(4) },
  BG: { name: "Bulgaria", population: 6, incidence: 220, mortality: 117, gcoUrl: gco(100) },
  FI: { name: "Finland", population: 6, incidence: 259, mortality: 78, gcoUrl: gco(246) },
  KP: { name: "North Korea", population: 27, incidence: 172, mortality: 120, gcoUrl: gco(408) },
  KH: { name: "Cambodia", population: 18, incidence: 136, mortality: 93, gcoUrl: gco(116) },
  IE: { name: "Ireland", population: 5, incidence: 317, mortality: 93, gcoUrl: gco(372) },
  ZW: { name: "Zimbabwe", population: 17, incidence: 266, mortality: 182, gcoUrl: gco(716) },
  AO: { name: "Angola", population: 38, incidence: 121, mortality: 76, gcoUrl: gco(24) },
  TN: { name: "Tunisia", population: 12, incidence: 106, mortality: 58, gcoUrl: gco(788) },
  // Wave 9 (11 November 2026): rates from public/globocan/countries.json code 39, population from the World Bank 2024
  // series (SP.POP.TOTL, read through its API the same day), rounded to millions. Singapore already has a row above.
  SK: { name: "Slovakia", population: 5, incidence: 286, mortality: 122, gcoUrl: gco(703) },
  NZ: { name: "New Zealand", population: 5, incidence: 294, mortality: 98, gcoUrl: gco(554) },
  HR: { name: "Croatia", population: 4, incidence: 312, mortality: 123, gcoUrl: gco(191) },
  MZ: { name: "Mozambique", population: 35, incidence: 119, mortality: 75, gcoUrl: gco(508) },
  MW: { name: "Malawi", population: 22, incidence: 171, mortality: 109, gcoUrl: gco(454) },
  MG: { name: "Madagascar", population: 32, incidence: 100, mortality: 64, gcoUrl: gco(450) },
  DO: { name: "Dominican Republic", population: 11, incidence: 165, mortality: 91, gcoUrl: gco(214) },
  GT: { name: "Guatemala", population: 18, incidence: 149, mortality: 88, gcoUrl: gco(320) },
  CI: { name: "Côte d'Ivoire", population: 32, incidence: 114, mortality: 75, gcoUrl: gco(384) },
};

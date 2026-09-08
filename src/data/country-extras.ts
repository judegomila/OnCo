/**
 * Hand-curated country context for the research ranking. Every row carries its sources.
 *
 *  population        millions, World Bank 2024 estimates (rounded)
 *  incidence         GLOBOCAN 2022 age-standardised incidence rate, all cancers excl. NMSC, per 100,000 (both sexes)
 *  mortality         GLOBOCAN 2022 age-standardised mortality rate, per 100,000 (both sexes)
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

const gco = (code: number) => `https://gco.iarc.who.int/media/globocan/factsheets/populations/${code}-${String(code).padStart(3, "0")}-fact-sheet.pdf`;

export const countryExtras: Record<string, CountryExtra> = {
  US: { name: "United States", population: 340, incidence: 367, mortality: 82, funder: "National Cancer Institute (NIH)", budget: "≈ $7.2 billion (FY2024)", budgetSource: "https://www.cancer.gov/about-nci/budget", programmes: ["Cancer Moonshot", "NCI-designated Cancer Centers (74)", "ARPA-H", "SEER"], gcoUrl: gco(840) },
  CN: { name: "China", population: 1410, incidence: 202, mortality: 129, funder: "National Natural Science Foundation of China; NHC / NMPA programmes", budget: "NSFC total ≈ CN¥ 33 billion (2023), all fields", budgetSource: "https://www.nsfc.gov.cn", programmes: ["Healthy China 2030 cancer targets", "National Cancer Center", "Domestic ADC and PD-1 pipelines"], gcoUrl: gco(156) },
  GB: { name: "United Kingdom", population: 69, incidence: 307, mortality: 100, funder: "Cancer Research UK; NIHR; MRC", budget: "CRUK ≈ £400+ million research spend (2023/24)", budgetSource: "https://www.cancerresearchuk.org/about-us/our-research", programmes: ["NHS-Galleri", "Genomics England", "CRUK Cancer Grand Challenges", "NHS Cancer Plan"], gcoUrl: gco(826) },
  IN: { name: "India", population: 1440, incidence: 100, mortality: 65, funder: "ICMR; DBT; Department of Atomic Energy (Tata Memorial)", budget: "ICMR ≈ ₹ 2,700 crore (2024-25), all fields", budgetSource: "https://www.icmr.gov.in", programmes: ["National Cancer Grid", "Tata Memorial Centre", "Ayushman Bharat"], gcoUrl: gco(356) },
  IT: { name: "Italy", population: 59, incidence: 296, mortality: 95, funder: "AIRC; Ministero della Salute", budget: "AIRC ≈ €140 million/year", budgetSource: "https://www.airc.it", programmes: ["Alliance Against Cancer (ACC)", "IRCCS network"], gcoUrl: gco(380) },
  DE: { name: "Germany", population: 84, incidence: 313, mortality: 95, funder: "DKFZ (Helmholtz) / BMBF; Deutsche Krebshilfe; DFG", budget: "DKFZ ≈ €400 million/year", budgetSource: "https://www.dkfz.de", programmes: ["National Decade Against Cancer", "NCT network", "German Cancer Consortium (DKTK)"], gcoUrl: gco(276) },
  JP: { name: "Japan", population: 124, incidence: 267, mortality: 82, funder: "AMED; JSPS; National Cancer Center", budget: "AMED ≈ ¥ 140 billion (FY2024), all fields", budgetSource: "https://www.amed.go.jp", programmes: ["Basic Plan to Promote Cancer Control", "SCRUM-Japan", "Cancer Genomic Medicine Core Hospitals"], gcoUrl: gco(392) },
  FR: { name: "France", population: 68, incidence: 341, mortality: 96, funder: "Institut National du Cancer (INCa); Inserm; ARC Foundation", budget: "INCa ≈ €100+ million/year for research", budgetSource: "https://www.e-cancer.fr", programmes: ["Ten-Year Cancer Control Strategy 2021-2030", "Unicancer", "France Génomique"], gcoUrl: gco(250) },
  KR: { name: "South Korea", population: 52, incidence: 300, mortality: 72, funder: "KHIDI / Ministry of Health and Welfare; NRF", budget: "National Cancer Control programme; NRF ≈ ₩ 9 trillion (2024), all fields", budgetSource: "https://www.khidi.or.kr", programmes: ["National Cancer Screening Program", "K-MASTER precision oncology"], gcoUrl: gco(410) },
  CA: { name: "Canada", population: 41, incidence: 348, mortality: 89, funder: "CIHR; Canadian Cancer Society; Terry Fox Research Institute", budget: "CIHR ≈ C$ 1.3 billion (2024-25), all fields", budgetSource: "https://cihr-irsc.gc.ca", programmes: ["Marathon of Hope Cancer Centres Network", "Canadian Cancer Trials Group"], gcoUrl: gco(124) },
  ES: { name: "Spain", population: 48, incidence: 289, mortality: 91, funder: "Instituto de Salud Carlos III; AECC", budget: "AECC ≈ €100 million committed research", budgetSource: "https://www.contraelcancer.es", programmes: ["CIBERONC", "Vall d'Hebron Institute of Oncology"], gcoUrl: gco(724) },
  AU: { name: "Australia", population: 27, incidence: 462, mortality: 88, funder: "NHMRC; Medical Research Future Fund; Cancer Australia", budget: "MRFF ≈ A$ 650 million/year, all fields", budgetSource: "https://www.health.gov.au/our-work/medical-research-future-fund", programmes: ["Australian Cancer Plan", "Zero Childhood Cancer", "Peter MacCallum theranostics"], gcoUrl: gco(36) },
  NL: { name: "Netherlands", population: 18, incidence: 349, mortality: 108, funder: "KWF Dutch Cancer Society; ZonMw", budget: "KWF ≈ €150 million/year", budgetSource: "https://www.kwf.nl", programmes: ["Netherlands Cancer Institute", "Oncode Institute", "DRUP trial"], gcoUrl: gco(528) },
  BR: { name: "Brazil", population: 216, incidence: 216, mortality: 88, funder: "INCA; CNPq; FAPESP", budget: "FAPESP ≈ R$ 1.9 billion (2024), all fields", budgetSource: "https://fapesp.br", programmes: ["INCA national cancer institute", "Hospital A.C. Camargo", "LACOG cooperative group"], gcoUrl: gco(76) },
  CH: { name: "Switzerland", population: 9, incidence: 323, mortality: 84, funder: "Swiss Cancer Research; SNSF", budget: "Swiss Cancer Research ≈ CHF 30 million/year", budgetSource: "https://www.krebsforschung.ch", programmes: ["SAKK cooperative group", "Swiss Personalized Health Network"], gcoUrl: gco(756) },
  SE: { name: "Sweden", population: 11, incidence: 312, mortality: 88, funder: "Swedish Cancer Society (Cancerfonden); Swedish Research Council", budget: "Cancerfonden ≈ SEK 1 billion/year", budgetSource: "https://www.cancerfonden.se", programmes: ["National quality registries", "Karolinska Comprehensive Cancer Centre"], gcoUrl: gco(752) },
  TR: { name: "Türkiye", population: 86, incidence: 231, mortality: 106, funder: "TÜBİTAK; Ministry of Health", programmes: ["National Cancer Control Programme"], gcoUrl: gco(792) },
  IR: { name: "Iran", population: 90, incidence: 159, mortality: 87, funder: "Ministry of Health and Medical Education; NIMAD", programmes: ["National Cancer Control Programme"], gcoUrl: gco(364) },
  PL: { name: "Poland", population: 37, incidence: 262, mortality: 128, funder: "National Science Centre; Medical Research Agency", programmes: ["National Oncology Strategy 2020-2030"], gcoUrl: gco(616) },
  BE: { name: "Belgium", population: 12, incidence: 360, mortality: 97, funder: "Fondation contre le Cancer / Kom op tegen Kanker; FWO / FNRS", programmes: ["EORTC headquarters (Brussels)"], gcoUrl: gco(56) },
  TW: { name: "Taiwan", population: 23, incidence: 292, mortality: 105, funder: "National Science and Technology Council; Ministry of Health and Welfare", programmes: ["National Cancer Prevention Program", "Taiwan Cancer Registry"] },
  EG: { name: "Egypt", population: 114, incidence: 159, mortality: 99, funder: "Academy of Scientific Research and Technology", programmes: ["National Cancer Institute Cairo", "Children's Cancer Hospital 57357"], gcoUrl: gco(818) },
  SA: { name: "Saudi Arabia", population: 37, incidence: 122, mortality: 56, funder: "King Abdulaziz City for Science and Technology; Ministry of Health", programmes: ["King Faisal Specialist Hospital", "Saudi Cancer Registry"], gcoUrl: gco(682) },
  DK: { name: "Denmark", population: 6, incidence: 375, mortality: 110, funder: "Danish Cancer Society; Novo Nordisk Foundation", budget: "Danish Cancer Society ≈ DKK 400 million/year", budgetSource: "https://www.cancer.dk", programmes: ["Danish Comprehensive Cancer Center", "National patient registries"], gcoUrl: gco(208) },
  AT: { name: "Austria", population: 9, incidence: 298, mortality: 92, funder: "FWF; Austrian Cancer Aid", programmes: ["MedAustron ion therapy"], gcoUrl: gco(40) },
  IL: { name: "Israel", population: 10, incidence: 262, mortality: 76, funder: "Israel Cancer Association; Israel Science Foundation", programmes: ["Sheba and Hadassah medical centres"], gcoUrl: gco(376) },
  SG: { name: "Singapore", population: 6, incidence: 240, mortality: 78, funder: "National Medical Research Council (NMRC)", programmes: ["National Cancer Centre Singapore", "Singapore Translational Cancer Consortium"], gcoUrl: gco(702) },
  RU: { name: "Russia", population: 144, incidence: 233, mortality: 114, funder: "Russian Science Foundation; Ministry of Health", programmes: ["N.N. Blokhin National Medical Research Center of Oncology"], gcoUrl: gco(643) },
  MX: { name: "Mexico", population: 130, incidence: 141, mortality: 65, funder: "CONAHCYT; Instituto Nacional de Cancerología", programmes: ["INCan Mexico City"], gcoUrl: gco(484) },
  GR: { name: "Greece", population: 10, incidence: 273, mortality: 108, funder: "Hellenic Foundation for Research and Innovation", programmes: ["Hellenic Cooperative Oncology Group"], gcoUrl: gco(300) },
  PT: { name: "Portugal", population: 10, incidence: 300, mortality: 100, funder: "FCT; Liga Portuguesa Contra o Cancro", programmes: ["IPO Porto and Lisbon"], gcoUrl: gco(620) },
  NO: { name: "Norway", population: 6, incidence: 358, mortality: 95, funder: "Norwegian Cancer Society; Research Council of Norway", programmes: ["Cancer Registry of Norway", "Oslo University Hospital"], gcoUrl: gco(578) },
};

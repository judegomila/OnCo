import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Laos: the public bodies and the paper behind /countries/la/ (wave 15) that the corpus did not hold. Each was written
 * from its own source, read as raw text on 16 November 2026: the summary report of the July 2022 imPACT review of
 * Lao PDR by the IAEA, WHO and IARC (PDF text, iaea.org), WHO's Lao office news page of 6 October 2022 on the revised
 * National Health Insurance Strategy, WHO's 2020 cancer country profile and 2021 cervical cancer profile (PDF text),
 * and the Europe PMC record for the one paper (DOI resolved and the abstract read).
 *
 * The National Cancer Center (`national-cancer-center-laos`) and the Food and Drug Department
 * (`lao-food-and-drug-department`) already exist in src/data/institutions/countries-2026-11-asia-pacific.ts and are
 * linked here, not repeated.
 *
 * Inbound links: the Ministry lists the National Health Insurance Bureau in `institutions` and the paper in
 * `keyPapers`; the Bureau lists the Ministry. Coordinates are an approximate Vientiane city point for both bodies,
 * not building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });

const IMPACT_2022 = "https://www.iaea.org/sites/default/files/documents/review-missions/lao-impact-review-0722.pdf";
const WHO_NHI_2022 = "https://www.who.int/laos/news/detail/06-10-2022-updated-national-health-insurance-strategy-aims-to-better-protect-people--ensure-financial-sustainability";
const WHO_PROFILE_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/lao-2020.pdf";
const WHO_CX_2021 = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-lao-2021-country-profile-en.pdf";
const ICCP_NCD_PLAN = "https://www.iccp-portal.org/resources/national-multisectoral-action-plan-prevention-and-control-noncommunicable-diseases-2014";
const REGISTRY_DOI = "10.1186/s12889-026-27554-3";

const institutions: InstitutionInput[] = [
  i({ id: "lao-ministry-of-health", name: "Ministry of Health, Lao PDR", aka: ["Lao Ministry of Health", "Ministry of Health of the Lao People's Democratic Republic", "MoH Lao PDR"],
    city: "Vientiane", country: "LA", lat: 17.964, lng: 102.613, institutionType: "government",
    tldr: "The health ministry of Laos. It sets national health policy, its National Health Insurance Bureau revised the strategy for the tax-funded National Health Insurance scheme, and it has made a national cancer centre in Vientiane a priority.",
    summary: "This record is written from the summary report of the imPACT review that the IAEA, WHO and IARC carried out from 25 to 29 July 2022 at the Ministry's request. The report says the Ministry defines national health policy through the Health Sector Reform Strategy (2021 to 2023) and the Health Sector Development Plan (2021 to 2025), and that the 18 provinces carry policy out. Laos had no separate cancer plan: the policy covering cancer was the National Multisectoral Action Plan for the Prevention and Control of Noncommunicable Diseases (2014 to 2020), which the Ministry was updating, with a new plan expected to be endorsed in 2023. OnCo did not find the new plan and does not know whether it was adopted. WHO's 2020 cancer country profile records an operational integrated plan for these diseases in 2019 and gives no entry for a national cancer control plan.\n\nThe review says a national cancer centre in Vientiane is a priority objective of the Ministry, formally recognised in 2017, and that cancer diagnosis and treatment were centralised in the main hospitals of Vientiane, with Mittaphab Hospital giving the widest range of cancer services. It found that radiotherapy was not in the essential benefit package, that medicines against cancer were reimbursed only after a significant advance payment, and that anti-cancer medicines were bought directly by practitioners and sourced from Thailand with no standard procurement. The coordinates on this record are an approximate Vientiane city point.",
    programs: ["National Multisectoral Action Plan for the Prevention and Control of Noncommunicable Diseases (2014 to 2020)", "Essential Health Service Package", "National Health Insurance (through the National Health Insurance Bureau)", "National Strategy for Reproductive, Maternal, Newborn, Child and Adolescent Health (2021 to 2025), with a cervical screening target", "Planning of a national cancer centre in Vientiane (a priority recognised in 2017)"],
    institutions: ["lao-national-health-insurance-bureau", "lao-food-and-drug-department", "national-cancer-center-laos", "who", "iaea", "iarc"],
    cancers: ["cervical", "hcc", "breast-cancer"],
    keyPapers: ["paper-vongdala-hospital-cancer-registry-lao-bmcph-2026"],
    links: [
      { label: "imPACT review of Lao PDR, summary report (IAEA, WHO and IARC, July 2022, PDF)", url: IMPACT_2022 },
      { label: "National Multisectoral Action Plan for the Prevention and Control of Noncommunicable Diseases 2014 to 2020 (ICCP portal)", url: ICCP_NCD_PLAN },
      { label: "WHO: Cancer Country Profile 2020, Lao PDR (PDF)", url: WHO_PROFILE_2020 },
      { label: "WHO: Cervical Cancer Country Profile 2021, Lao PDR (PDF)", url: WHO_CX_2021 },
    ] }),

  i({ id: "lao-national-health-insurance-bureau", name: "National Health Insurance Bureau, Lao PDR", aka: ["NHIB", "National Health Insurance Bureau", "Lao National Health Insurance"],
    city: "Vientiane", country: "LA", lat: 17.964, lng: 102.613, institutionType: "government",
    tldr: "A bureau of the Lao Ministry of Health, which revised the strategy for National Health Insurance, a scheme paid for from taxes and introduced in 2016. People pay a small co-payment at the point of care, and WHO's Lao office reported in October 2022 that it protected 94% of the population in 2021.",
    summary: "WHO's Lao office reported on 6 October 2022 that the National Health Insurance Bureau, part of the Ministry of Health, had revised the National Health Insurance Strategy for 2021 to 2025 with WHO's support and that the Minister of Health had endorsed it. According to that page the scheme is funded by tax revenues and was introduced in 2016; the share of people protected rose from 45% in 2016 to 94% in 2021; patients pay a co-payment of 5,000 to 20,000 kip for outpatient care and 5,000 to 30,000 kip for inpatient care, depending on the level of facility; and pregnant women, children and the poor pay nothing. The same page says some people are asked to pay additional or excessive fees.\n\nFor cancer, the July 2022 imPACT review by the IAEA, WHO and IARC found that radiotherapy was not included in the essential benefit package, that palliative care was included with very limited coverage, that medicines against cancer were reimbursed only after a significant advance payment, and that imaging and surgery needed high out-of-pocket payments. OnCo did not read the Bureau's own benefit list. The coordinates are an approximate Vientiane city point.",
    programs: ["National Health Insurance (tax-funded, introduced in 2016)", "National Health Insurance Strategy 2021 to 2025"],
    institutions: ["lao-ministry-of-health", "who"],
    links: [
      { label: "WHO Lao PDR: updated National Health Insurance Strategy (6 October 2022)", url: WHO_NHI_2022 },
      { label: "imPACT review of Lao PDR, summary report (IAEA, WHO and IARC, July 2022, PDF)", url: IMPACT_2022 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-vongdala-hospital-cancer-registry-lao-bmcph-2026", name: "Cancer cases in the hospital-based registry of the National Cancer Center of Lao PDR, 2010 to 2024",
    journal: "BMC Public Health", year: 2026, doi: REGISTRY_DOI, pmid: "42050476", authors: "Vongdala C, Sahat O, Luangxay T, Chaidee A, Intuyod K, Kamsa-Ard S, Pinlaor S.", paperType: "observational", participants: 1738,
    tldr: "The National Cancer Center in Vientiane recorded 1,738 cancers from 2010 to 2024. Cervical cancer made up 41.1% of cases in women and liver and bile duct cancer 15.1% of cases in men, and most cases came from around the capital.",
    summary: "Published as \"Types and spatial distribution of cancer cases registered in a national hospital-based registry in the Lao People's Democratic Republic from 2010 to 2024\". A descriptive retrospective analysis of the cancer cases recorded at the National Cancer Center from 1 January 2010 to 31 December 2024, with the cases mapped by district for different periods. The authors, from the National Cancer Center and from Thailand, describe it as the first spatial analysis of hospital-based cancer data in Laos and state that the country has no national population-based cancer registry.",
    findings: [
      "1,738 cancer cases were analysed: 1,108 in women and 630 in men, a ratio of 1.76.",
      "The most frequent cancer in men was liver and bile duct cancer (15.1%); in women cervical cancer accounted for 41.1% of cases.",
      "Reported cases were concentrated in Vientiane province and the surrounding central provinces throughout; detection in northern and southern provinces improved in 2020 to 2024.",
    ],
    whatItMeans: "These are the patients who reached one hospital in the capital, not a count of cancer in Laos. The authors read the concentration around Vientiane as under-reporting elsewhere and call for a national population-based registry.",
    caveats: ["A hospital-based registry: it counts people who reached the centre, about 116 a year on average, and cannot give incidence rates.", "Only the abstract was read."],
    institutions: ["national-cancer-center-laos"], cancers: ["cervical", "hcc"],
    links: [{ label: "BMC Public Health 2026", url: `https://doi.org/${REGISTRY_DOI}` }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/42050476/" }] }),
];

export const recordsLA: EntityInput[] = [...institutions, ...papers];

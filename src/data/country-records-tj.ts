import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Tajikistan: the two public bodies and three papers behind /countries/tj/ (wave 15) that the corpus did not hold. The
 * two oncology centres and the patient organisation AVESTO already have records in
 * src/data/institutions/countries-2026-11-asia-pacific.ts and are linked, not repeated.
 *
 * Sources, read raw on 16 November 2026: the European Observatory's health system review 2025 for Tajikistan (page and
 * PDF text), the Ministry of Health and Social Protection's site (in Tajik), its cancer plan for 2016 to 2017 on the
 * ICCP portal (in Tajik), and WHO Europe's account of the HPV vaccine launch. DOIs were resolved through Europe PMC and
 * every figure in `findings` is taken from the indexed abstract.
 *
 * Inbound links: the Ministry lists the supervision service and the three papers; the service lists the Ministry. The
 * existing records tj-oncological-scientific-centre and tj-sughd-regional-oncology-centre list the Ministry. The radiotherapy paper covers Kyrgyzstan too and is listed on /countries/kg/.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const MOH = "https://moh.tj/";
const MOH_PROGRAMMES = "https://moh.tj/barnoma-oi-mill/";
const HIT_2025 = "https://eurohealthobservatory.who.int/publications/i/tajikistan-health-system-review-2025";
const HIT_2025_PDF = "https://iris.who.int/server/api/core/bitstreams/0ca0e9eb-e69f-4751-8bd8-89742897d9bf/content";
const ICCP_PLAN_2016_PDF = "https://www.iccp-portal.org/sites/default/files/plans/TJK_B5_Oncology%20-%202016%20-%202017%20%281%29.pdf";
const WHO_HPV_LAUNCH =
  "https://www.who.int/europe/news-room/feature-stories/item/hpv-vaccination-launches-in-tajikistan--protecting-the-girls-of-today--saving-the-women-of-tomorrow";

const institutions: InstitutionInput[] = [
  i({ id: "tj-ministry-of-health-and-social-protection", name: "Ministry of Health and Social Protection of the Population, Tajikistan", aka: ["Вазорати тандурустӣ ва ҳифзи иҷтимоии аҳолии Ҷумҳурии Тоҷикистон", "Министерство здравоохранения и социальной защиты населения Республики Таджикистан", "MoHSP Tajikistan"],
    city: "Dushanbe", country: "TJ", lat: 38.56, lng: 68.787, institutionType: "government", website: MOH,
    tldr: "Tajikistan's health ministry, which runs the national-level health services. It added the HPV vaccine to the national immunisation schedule on 1 October 2025.",
    summary: "The European Observatory's 2025 health system review describes a centralised system in which the Ministry of Health and Social Protection runs national-level health services, while local authorities administer most regional, city and district services. Its Department of Pharmacy and Medical Goods sets state policy on medicines. The Ministry issued a plan of measures on the prevention, diagnosis, treatment and control of cancer for 2016 to 2017, posted on the ICCP portal, which gives tasks to the state institution Republican Scientific Centre of Oncology. Its own page of national programmes, read on 16 November 2026, lists fifteen programmes, among them immunisation for 2021 to 2025, and none for cancer; OnCo found no current cancer programme. WHO's Europe office reports that the Ministry's deputy minister led the launch of HPV vaccination on 1 October 2025. The coordinates are an approximate Dushanbe city point, not the building.",
    programs: ["Plan of measures on prevention, diagnosis, treatment and control of cancer, 2016 to 2017", "National immunisation programme, 2021 to 2025", "HPV vaccination in the national schedule from October 2025", "National Health Strategy, 2021 to 2030"],
    institutions: ["tj-health-supervision-service", "tj-oncological-scientific-centre", "tj-sughd-regional-oncology-centre", "who"],
    keyPapers: [
      "paper-gupta-breast-cervical-screening-tajikistan-jcogo-2026",
      "paper-talib-breast-cancer-khorog-tajikistan-breastj-2016",
      "paper-alkhatib-radiotherapy-central-asia-jcogo-2025",
    ],
    links: [
      { label: "Ministry of Health and Social Protection of the Population (Tajik)", url: MOH },
      { label: "Ministry: national programmes (Tajik)", url: MOH_PROGRAMMES },
      { label: "Ministry: cancer plan for 2016 to 2017 (PDF, Tajik, ICCP portal)", url: ICCP_PLAN_2016_PDF },
      { label: "European Observatory: Tajikistan, health system review 2025", url: HIT_2025 },
      { label: "WHO Europe: HPV vaccination launches in Tajikistan", url: WHO_HPV_LAUNCH },
    ] }),

  i({ id: "tj-health-supervision-service", name: "Service for State Supervision of the Healthcare System and Social Protection of the Population, Tajikistan", aka: ["Хадамоти назорати давлатии тандурустӣ ва ҳифзи иҷтимоии аҳолӣ"],
    city: "Dushanbe", country: "TJ", lat: 38.56, lng: 68.787, institutionType: "government",
    tldr: "The state agency that regulates and supervises medicines and pharmacies in Tajikistan. It is listed among the agencies of the health ministry.",
    summary: "The European Observatory's 2025 health system review names the Service for State Supervision of the Healthcare System and Social Protection of the Population as the state agency authorised to regulate and supervise pharmaceutical activities in Tajikistan, and says a Pharmacological Committee, part of the regulatory body, decides on the clinical evidence, safety and effectiveness of new medicines, doses and indications. The governing law, on medicines and pharmaceutical activities, was adopted in 2003 and last updated in 2022. The Ministry of Health and Social Protection's site lists the Service among its agencies, but its page there carried no text on 16 November 2026 and OnCo found no site of its own, so this record says nothing about how a cancer medicine is registered or a trial authorised. WHO's August 2026 list of regulators at maturity level 3 and 4 does not include it. The coordinates are an approximate Dushanbe city point, not the building.",
    programs: ["Regulation and supervision of pharmaceutical activities", "Pharmacological Committee (safety and effectiveness of new medicines)"],
    institutions: ["tj-ministry-of-health-and-social-protection"],
    links: [
      { label: "European Observatory: Tajikistan, health system review 2025 (PDF)", url: HIT_2025_PDF },
      { label: "Ministry of Health and Social Protection of the Population (Tajik)", url: MOH },
      { label: "WHO: list of regulators operating at maturity level 3 and 4, August 2026 (PDF)", url: "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-gupta-breast-cervical-screening-tajikistan-jcogo-2026", name: "Breast and cervical cancer screening in Tajikistan in the 2023 Demographic and Health Survey",
    journal: "JCO Global Oncology", year: 2026, doi: "10.1200/go-25-00582", pmid: "42054614", authors: "Gupta RD, Sarker P, Haider SS, et al.", paperType: "observational", participants: 9824,
    tldr: "Among 9,824 women aged 15 to 49 in Tajikistan's 2023 national survey, 6.2% had ever had a clinical breast examination and 9.3% had ever been tested for cervical cancer. Testing was more common among older, wealthier and urban women.",
    summary: "Published as \"Determinants and Socioeconomic Inequalities in Breast and Cervical Cancer Screening in Tajikistan: Evidence From the 2023 Demographic and Health Survey\". The outcomes were self-reported: ever having received a clinical breast examination for breast cancer and ever having been tested for cervical cancer. The authors, the first of them at a research centre in Dhaka, used weighted statistics, multivariable logistic regression and concentration indices to measure inequality by household wealth.",
    findings: [
      "Screening prevalence was 6.2% for breast cancer (clinical breast examination) and 9.3% for cervical cancer, in a sample of 9,824 women.",
      "Uptake rose with age: compared with women aged 15 to 24, women aged 35 to 49 had 3.54 times the adjusted odds of breast screening and 3.27 times the adjusted odds of cervical screening.",
      "Women in the richest households had 1.95 times the adjusted odds of cervical testing of the poorest, and concentration indices showed inequality favouring the better off for both tests (0.05 each, P < .001).",
    ],
    whatItMeans: "Fewer than one woman in ten of reproductive age has been checked for either cancer, and the women least likely to be checked are the poorest and those in rural areas. WHO's profiles record no national screening programme.",
    caveats: ["Self-reported, and limited to women aged 15 to 49, so it says nothing about older women.", "A survey of use, not of what services exist."],
    institutions: ["tj-ministry-of-health-and-social-protection"], cancers: ["breast-cancer", "cervical"],
    links: [doi("10.1200/go-25-00582", "JCO Glob Oncol 2026"), pubmed("42054614")] }),

  p({ id: "paper-talib-breast-cancer-khorog-tajikistan-breastj-2016", name: "A community breast cancer awareness, detection and treatment programme in Khorog, Tajikistan",
    journal: "The Breast Journal", year: 2016, doi: "10.1111/tbj.12618", pmid: "27191360", authors: "Talib Z, Shukurbekova I, Sadonshoeva G, et al.", paperType: "observational", participants: 441,
    tldr: "A partnership between visiting health professionals from the United States and local staff in Khorog trained 24 health workers and examined 441 women. It found six breast cancers, all locally advanced.",
    summary: "Published as \"A Community-Oriented Approach to Breast Cancer in a Low-Resource Setting: Improving Awareness, Early Detection and Treatment of Breast Cancer in Tajikistan\". The authors describe a public-private partnership in Khorog that ran a breast cancer awareness intervention, trained local health professionals in clinical breast care, and carried out screening and treatment, with patient data collected through a web-based program. The abstract states that fewer than half of adult women in Tajikistan had heard of breast cancer.",
    findings: [
      "24 health care providers received teaching and clinical breast examination training; 441 women had a clinical breast evaluation.",
      "74 women (17%) had abnormal examinations and went on to further diagnostic procedures; six (1.4%) had breast cancer, all locally advanced, and all six had a modified radical mastectomy.",
      "Five of the six women with cancer already knew of their lump and three had recently seen a family medicine doctor; diagnostic equipment was available but well-trained operators and interpreters were lacking.",
    ],
    whatItMeans: "Women were reaching a doctor with a lump and still being diagnosed late, which points to training and referral, not awareness alone. The authors report that clinical breast examination was built into routine care by local family doctors.",
    caveats: ["One town, 441 women, a decade ago.", "A programme report without a comparison group."],
    institutions: ["tj-ministry-of-health-and-social-protection"], cancers: ["breast-cancer"],
    links: [doi("10.1111/tbj.12618", "Breast J 2016"), pubmed("27191360")] }),

  p({ id: "paper-alkhatib-radiotherapy-central-asia-jcogo-2025", name: "Radiotherapy resources in Central Asia: an International Atomic Energy Agency update",
    journal: "JCO Global Oncology", year: 2025, doi: "10.1200/go-25-00271", pmid: "40971756", authors: "AlKhatib S, Akbarov K, Hande V, Ciraj-Bjelac O, Abdel-Wahab M.", paperType: "observational",
    tldr: "Using the IAEA's directory of radiotherapy centres, the authors counted 75 megavoltage machines across Kazakhstan, Uzbekistan, Turkmenistan, Kyrgyzstan and Tajikistan in 2022. Tajikistan, Kyrgyzstan and Uzbekistan had 0.1 to 0.2 machines per million people, against 2.3 in Kazakhstan.",
    summary: "Published as \"Radiotherapy Resources in Central Asia: An International Atomic Energy Agency Update\". A registry-based review of radiation oncology resources in the five Central Asian countries, with data from the IAEA's Directory of Radiotherapy Centres (DIRAC) and GLOBOCAN 2020, and a linear regression of machine capacity against gross national income per person.",
    findings: [
      "In 2022 the region had 75 megavoltage machines and 35 brachytherapy units, all but two of them high-dose-rate.",
      "Megavoltage units per million population ranged from 0.1 to 0.2 in Tajikistan, Kyrgyzstan and Uzbekistan, and stood at 2.3 in Kazakhstan.",
      "Machine capacity tracked national income (R2 = 0.89, P = .014), and the authors estimate at least 115 megavoltage machines will be needed by 2030.",
    ],
    whatItMeans: "Per person, Tajikistan and Kyrgyzstan have less than a tenth of Kazakhstan's megavoltage machines. The counts are a 2022 reading of the IAEA's directory, so they do not show machines added or broken down since.",
    caveats: ["Counts are for 2022 and rest on entries in the IAEA's directory (DIRAC).", "The abstract does not give each country's machine count."],
    institutions: ["iaea", "tj-ministry-of-health-and-social-protection"],
    links: [doi("10.1200/go-25-00271", "JCO Glob Oncol 2025"), pubmed("40971756")] }),
];

export const recordsTJ: EntityInput[] = [...institutions, ...papers];

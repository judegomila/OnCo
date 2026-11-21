import type { EntityInput, PaperInput } from "@/lib/schema";

/**
 * Botswana: the papers behind /countries/bw/ (wave 15) that the corpus did not hold. The institutions the page relies
 * on already exist (src/data/institutions/countries-2026-11-east-southern-africa.ts) and are linked, not repeated.
 * Each DOI was resolved through Europe PMC on 16 November 2026 and the figures in `findings` are taken from the
 * indexed abstract; nothing here comes from a full text OnCo did not read.
 *
 * Inbound links: the six papers list each other in `related`. No existing record links to them yet; the Botswana
 * registry and ministry records could carry them in `keyPapers`.
 */
const asOf = "2026-11-16";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const MATHOMA = "paper-mathoma-cancer-incidence-hiv-botswana-cancers-2025";
const DRYDEN = "paper-dryden-peterson-cancer-incidence-art-botswana-plosone-2015";
const GROVER = "paper-grover-cervical-cancer-stage-outcomes-botswana-gore-2022";
const RAMOGOLA = "paper-ramogola-masire-see-and-treat-botswana-jaids-2012";
const SWART = "paper-swart-public-oncology-centres-botswana-jcogo-2024";
const MARTEI = "paper-martei-essential-cancer-medicines-botswana-jgo-2018";

const papers: PaperInput[] = [
  p({ id: MATHOMA, name: "Cancer incidence in people with and without HIV in Botswana, 1990 to 2021",
    journal: "Cancers", year: 2025, doi: "10.3390/cancers17142374", pmid: "40723257", authors: "Mathoma A, Tshisimogo G, Sartorius B, Mahomed S", paperType: "observational", participants: 27726,
    tldr: "An analysis of Botswana's national cancer registry found 27,726 cancers in adults over about thirty years, half of them in people living with HIV. Cancer incidence rose over the period in people with HIV and in people without it.",
    summary: "Published as \"Trends in Cancer Incidence and Associated Risk Factors in People Living with and Without HIV in Botswana: A Population-Based Cancer Registry Data Analysis from 1990 to 2021\". The authors analysed adults aged 18 and over reported to the Botswana National Cancer Registry and the National Data Warehouse, computing crude and age-standardised incidence, standardised incidence ratios and time trends for cancers that define AIDS and for those that do not.",
    findings: [
      "27,726 cancers were documented: 13,737 (49.5%) in people living with HIV, 3,505 (12.6%) in people without HIV and 10,484 (37.8%) in people whose HIV status was unknown.",
      "Overall cancer incidence in people living with HIV rose from 44.2 to 1,047.6 per 100,000 over the period, and in people without HIV from 1.4 to 27.2 per 100,000.",
      "People living with HIV had raised standardised incidence ratios for cervical cancer, for Kaposi sarcoma in men and for some cancers that do not define AIDS.",
    ],
    whatItMeans: "The authors conclude that cancers rose among people living with HIV during the years in which HIV treatment expanded, and call for prevention and screening aimed at them together with timely HIV and cancer treatment.",
    caveats: ["HIV status was unknown for more than a third of cases.", "Rising incidence in a registry can reflect better case finding as well as more cancer; the abstract does not separate the two."],
    institutions: ["botswana-national-cancer-registry", "botswana-ministry-of-health"], cancers: ["cervical"], related: [DRYDEN, GROVER, "cancer-registries-surveillance"],
    links: [doi("10.3390/cancers17142374", "Cancers 2025"), pubmed("40723257")] }),

  p({ id: DRYDEN, name: "Cancer incidence in Botswana during the expansion of HIV treatment, 2003 to 2008",
    journal: "PLoS One", year: 2015, doi: "10.1371/journal.pone.0135602", pmid: "26267867", authors: "Dryden-Peterson S, Medhin H, Kebabonye-Pusoentsi M, et al.", paperType: "observational", participants: 8479,
    tldr: "As HIV treatment reached most people who needed it in Botswana, the risk of cancer at a given age fell among people with HIV. The number of cancers diagnosed each year did not fall, because more people with HIV were living longer.",
    summary: "Published as \"Cancer Incidence following Expansion of HIV Treatment in Botswana\". The authors used 8,479 incident cases from the Botswana National Cancer Registry for 2003 to 2008, when coverage of antiretroviral treatment rose from 7.3% to 82.3%, and fitted models of age-adjusted incidence over time in the whole population and in a weighted population with known HIV status.",
    findings: [
      "61.6% of cancers were diagnosed in people with HIV; 45.4% of cancers in men and 36.4% in women were attributable to HIV.",
      "Age-adjusted incidence among people with HIV fell by 8.3% a year (95% CI 2.1 to 14.1), while the annual number of cancers stayed constant.",
      "In the whole population Kaposi sarcoma fell by 4.6% a year, non-Hodgkin lymphoma rose by 11.5% a year and HPV-associated cancers rose by 3.9% a year.",
      "Age-adjusted incidence among people without HIV rose by 7.5% a year.",
    ],
    whatItMeans: "Treating HIV lowered each person's cancer risk but did not reduce the number of cancers the health system had to diagnose and treat, which the authors say makes early detection and treatment of HIV-associated cancer a priority.",
    caveats: ["HIV status was not known for every case, so the analysis relied on weighting.", "The data end in 2008."],
    institutions: ["botswana-national-cancer-registry", "botswana-ministry-of-health"], cancers: ["cervical", "non-hodgkin-lymphoma"], related: [MATHOMA, RAMOGOLA],
    links: [doi("10.1371/journal.pone.0135602", "PLoS One 2015"), pubmed("26267867")] }),

  p({ id: GROVER, name: "Stage, treatment and survival of women with cervical cancer in Botswana, 2013 to 2020",
    journal: "Gynecologic Oncology Reports", year: 2022, doi: "10.1016/j.gore.2022.101094", pmid: "36337265", authors: "Grover S, George J, Tuli S, et al.", paperType: "observational", participants: 1043,
    tldr: "Among 1,043 women with cervical cancer enrolled in Botswana from 2013 to 2020, most were diagnosed at stage II or III and two thirds were alive two years later. Seven in ten were living with HIV, and HIV did not change survival.",
    summary: "Published as \"Stage and outcomes of invasive cervical cancer patients in Botswana: A prospective cohort study from 2013 to 2020\". Women with invasive cervical cancer were enrolled prospectively in an observational cohort, and stage, treatment and overall survival were compared between women living with and without HIV.",
    findings: [
      "1,043 women were enrolled; 69% were living with HIV, who were diagnosed at a median age of 44 against 61 for women without HIV.",
      "Stage at diagnosis was I in 17%, II in 37%, III in 35% and IV in 8%.",
      "51% received chemoradiation, 33% radiotherapy, 6% surgery and 7% no treatment.",
      "Two-year overall survival was 67%; later stage was associated with worse survival and a haemoglobin above 10 g/dL with better survival.",
    ],
    whatItMeans: "Most women needed radiotherapy or chemoradiation because of the stage at which they were diagnosed, and women living with HIV, almost all on antiretroviral therapy, did as well as other women.",
    caveats: ["An observational cohort of enrolled patients, not every woman with cervical cancer in Botswana.", "The abstract does not say where patients were treated."],
    institutions: ["botswana-ministry-of-health"], cancers: ["cervical"], related: [RAMOGOLA, MATHOMA],
    links: [doi("10.1016/j.gore.2022.101094", "Gynecologic Oncology Reports 2022"), pubmed("36337265")] }),

  p({ id: RAMOGOLA, name: "See-and-treat cervical screening for women living with HIV in Gaborone, 2009 to 2011",
    journal: "Journal of Acquired Immune Deficiency Syndromes", year: 2012, doi: "10.1097/qai.0b013e3182426227", pmid: "22134146", authors: "Ramogola-Masire D, de Klerk R, Monare B, et al.", paperType: "real-world", participants: 2175,
    tldr: "Nurses in Gaborone screened 2,175 women living with HIV by looking at the cervix after applying acetic acid, with photographs checked weekly by a specialist. About one in nine had early changes treated by freezing at the same visit.",
    summary: "Published as \"Cervical cancer prevention in HIV-infected women using the 'see and treat' approach in Botswana\". A two-tier programme ran in community and hospital clinics in Gaborone from March 2009 to January 2011: nurses screened by visual inspection with acetic acid and enhanced digital imaging and treated low-grade lesions with cryotherapy on the same visit, and women with complex lesions were referred to a specialist clinic.",
    findings: [
      "Of 2,175 women screened, 253 (11.6%) had same-day cryotherapy, 1,347 were considered normal and 575 were referred for further evaluation.",
      "Weekly review of the photographs led to 267 of the 1,347 women first considered normal being recalled.",
      "264 cases of cervical intraepithelial neoplasia grade 2 or 3 were identified and treated, and 6 microinvasive cancers were referred on.",
    ],
    whatItMeans: "The authors judged the approach feasible and efficient and proposed it as an additional screening method for women with limited access to Pap testing; the health ministry's 2018 strategy records its expansion beyond Gaborone.",
    caveats: ["One programme in one city, among women living with HIV.", "No comparison group and no long-term cancer outcomes."],
    institutions: ["botswana-ministry-of-health"], cancers: ["cervical"], related: [GROVER, SWART],
    links: [doi("10.1097/qai.0b013e3182426227", "JAIDS 2012"), pubmed("22134146")] }),

  p({ id: SWART, name: "Services at Botswana's four public oncology centres, surveyed in 2021",
    journal: "JCO Global Oncology", year: 2024, doi: "10.1200/go.24.00196", pmid: "39348622", authors: "Swart NC, Lebelonyane R, Gutterman EM, et al.", paperType: "observational",
    tldr: "Botswana's government has designated four hospitals as public oncology centres. A 2021 survey found that two of them offered a broad range of cancer services and that the two district-level centres had marked gaps.",
    summary: "Published as \"Expanding Geographical Access to Cancer Care in Botswana: Current Status and Future Prospects\". From February to April 2021 the authors surveyed oncology staff at Princess Marina Hospital, Nyangabgwe Referral Hospital, Sekgoma Memorial Hospital and Letsholathebe II Memorial Hospital, with an experienced oncology nurse at each confirming which services were available.",
    findings: [
      "Princess Marina and Nyangabgwe had a broad array of diagnostic, surgical and treatment services; Princess Marina alone had a dedicated inpatient oncology service, a multidisciplinary review committee and a palliative care team.",
      "All four centres offered Pap tests for the cervical screening programme, described as the only national cancer screening programme; mammography, at two centres, was used solely for diagnosis.",
      "Patients needing radiotherapy were referred to Gaborone Private Hospital at government expense.",
      "51 staff were surveyed on perceived availability, 66% of them based at Princess Marina.",
    ],
    whatItMeans: "Bringing cancer care closer to patients has begun but is uneven; the authors suggest the two district-level centres provide selected services for common cancers, follow-up and palliative care.",
    caveats: ["The survey describes early 2021, before the public radiotherapy centre opened in July 2023.", "Service availability was reported by staff, not audited."],
    institutions: ["botswana-ministry-of-health", "gaborone-private-hospital"], related: [MARTEI, RAMOGOLA, "global-oncology-access"],
    links: [doi("10.1200/go.24.00196", "JCO Global Oncology 2024"), pubmed("39348622")] }),

  p({ id: MARTEI, name: "Availability of essential cancer medicines in Botswana's public sector, 2015",
    journal: "Journal of Global Oncology", year: 2018, doi: "10.1200/jgo.17.00063", pmid: "30241225", authors: "Martei YM, Chiyapo S, Grover S, et al.", paperType: "observational",
    tldr: "Botswana's 2015 national list of essential cancer medicines matched four fifths of the World Health Organization's list. Even so, at least 40% of the essential cancer drugs were out of stock for a median of 30 days during that year.",
    summary: "Published as \"Availability of WHO Essential Medicines for Cancer Treatment in Botswana\". The authors analysed the weekly stock catalogue that the government's Central Medical Store sends to pharmacy departments in government hospitals, compared prices with an international price guide, and interviewed key informants about the national essential medicines list and the public supply chain.",
    findings: [
      "The 2015 national essential medicines list for cancer had 80.5% alignment with WHO's list.",
      "At least 40% of essential cancer drugs were out of stock for a median of 30 days in 2015.",
      "Stock-outs affected chemotherapy in first-line regimens for cervical, breast and colorectal cancer and were not associated with the price of the drug.",
      "The median price ratio was above 1 for 61% of the listed drugs, which the authors read as inefficient procurement.",
    ],
    whatItMeans: "Having a medicine on the national list did not guarantee it was on the shelf. The authors propose using cancer registry data and treatment guidelines to forecast how much chemotherapy is needed.",
    caveats: ["Data are for 2015 and the public sector only.", "The study measured stock at the central store, not what individual patients received."],
    institutions: ["botswana-ministry-of-health", "botswana-national-cancer-registry"], related: [SWART, MATHOMA, "global-oncology-access"],
    links: [doi("10.1200/jgo.17.00063", "Journal of Global Oncology 2018"), pubmed("30241225")] }),
];

/** Records behind /countries/bw/ (wave 15). */
export const recordsBW: EntityInput[] = [...papers];

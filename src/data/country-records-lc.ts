import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Saint Lucia: the bodies and papers behind /countries/lc/ (wave 16). The corpus held no Saint Lucian institution, so
 * four are added, each only as far as a source read raw on 16 November 2026 supports it: PAHO's release on the launch
 * of the National Cancer Registry (datelined 31 July 2026) and The Voice's report of the launch; the European Union
 * Delegation's press release on the Owen King European Union Hospital; PAHO's Health in the Americas profile; and the
 * two survivor papers, whose DOIs were resolved through Europe PMC and whose open full texts were read there. The
 * Government of Saint Lucia's own sites could not be reached, so no record rests on a Ministry page.
 *
 * Inbound links: the four institutions list one another, the Ministry and the patient group list the two papers, and
 * the papers list the institutions they name. Coordinates are approximate Castries city points, not building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const PAHO_REGISTRY = "https://www.paho.org/en/news/6-8-2026-saint-lucia-launches-national-cancer-registry-strengthen-cancer-prevention-and-care";
const VOICE_REGISTRY = "https://thevoiceslu.com/?p=153650";
const PAHO_HIA = "https://hia.paho.org/en/country-profiles/saint-lucia";
const EU_OKEU = "https://www.eeas.europa.eu/sites/default/files/press_release_owen_king_european_union1_0.pdf";
const GICR_HUB = "https://gicr.iarc.fr/hub/caribbean/";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/662-saint-lucia-fact-sheet.pdf";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'LCA'";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'LCA'";
const AUGUSTE_2021 = "paper-auguste-access-cancer-care-saint-lucia-ijerph-2021";
const AUGUSTE_2022 = "paper-auguste-survivors-social-support-saint-lucia-ijerph-2022";

const institutions: InstitutionInput[] = [
  i({ id: "moh-saint-lucia", name: "Ministry of Health, Wellness and Nutrition, Saint Lucia", aka: ["Ministry of Health, Saint Lucia", "MOH Saint Lucia"],
    city: "Castries", country: "LC", lat: 14.01, lng: -60.99, institutionType: "government",
    tldr: "Saint Lucia's health ministry, which launched the island's National Cancer Registry in July 2026 with the Caribbean Public Health Agency, IARC and PAHO.",
    summary: "PAHO's release, datelined Castries, 31 July 2026, reports that the Ministry of Health, Wellness and Nutrition officially launched Saint Lucia's National Cancer Registry, and that the Minister committed the Government to sustaining it and integrating it into the wider health system. PAHO's country profile, whose health-system text cites sources to 2022, says health reforms aim at universally accessible and affordable care, that a World Bank-financed Health System Strengthening Project is to register at least 100,000 people in a national health scheme, and that the Owen King European Union Hospital is now operating. WHO's Global Health Expenditure Database puts out-of-pocket payment at 37.1% of health spending in 2023. OnCo could not reach the Ministry's own website on 16 November 2026, so this record rests on PAHO's account. The coordinates are an approximate Castries city point.",
    programs: ["National Cancer Registry (launched July 2026)", "HPV vaccination for girls and boys (since 2019, WHO data)", "Universal health coverage project"],
    institutions: ["okeu-hospital-saint-lucia", "saint-lucia-national-cancer-registry", "faces-of-cancer-saint-lucia"],
    keyPapers: [AUGUSTE_2021, AUGUSTE_2022],
    links: [
      { label: "PAHO: Saint Lucia launches National Cancer Registry (July 2026)", url: PAHO_REGISTRY },
      { label: "PAHO: Health in the Americas, Saint Lucia country profile", url: PAHO_HIA },
      { label: "WHO Global Health Expenditure Database: out-of-pocket share, Saint Lucia (API)", url: WHO_OOP_API },
      { label: "WHO: vaccine introduction rows for Saint Lucia (API)", url: WHO_INTRO_API },
    ] }),

  i({ id: "okeu-hospital-saint-lucia", name: "Owen King European Union Hospital (Castries)", aka: ["OKEU Hospital", "Owen King EU Hospital"],
    city: "Castries", country: "LC", lat: 14.01, lng: -60.99, institutionType: "hospital",
    tldr: "The hospital in Castries that took over all in-patient services from the Victoria Hospital on 27 March 2020. It was built with European Union funds and has 120 beds.",
    summary: "The European Union Delegation's press release (headed 7 April 2019, which looks like a misprint for 2020) says Saint Lucia completed the transition from the Victoria Hospital to the Owen King European Union Hospital on 27 March 2020, after out-patient services such as dialysis and physiotherapy began moving in 2018. The EU provided 36 million euros towards construction and a further 8 million for biomedical equipment and furniture. The hospital has two floors across four wings, operating theatres, an intensive care unit, a laboratory, 120 beds and radiology equipment including an MRI scanner; the Victoria Hospital was kept as a respiratory facility during the COVID-19 pandemic. PAHO's country profile describes the hospital as operational. OnCo found no primary source describing its oncology service, though one author of a 2021 paper gives the hospital's Department of Oncology as his address; IAEA DIRAC's public data, read on 16 November 2026, has no entry for Saint Lucia. The coordinates are an approximate Castries city point.",
    programs: ["In-patient and out-patient hospital care (120 beds)", "Radiology including MRI"],
    institutions: ["moh-saint-lucia", "saint-lucia-national-cancer-registry"],
    links: [
      { label: "European Union Delegation: Owen King European Union Hospital fully operational (press release, PDF)", url: EU_OKEU },
      { label: "PAHO: Health in the Americas, Saint Lucia country profile", url: PAHO_HIA },
      doi("10.3390/ijerph18094770", "Auguste et al., access to cancer care among survivors in Saint Lucia (Int J Environ Res Public Health 2021)"),
      { label: "IAEA DIRAC: radiotherapy equipment by country (read 16 November 2026)", url: DIRAC },
    ] }),

  i({ id: "saint-lucia-national-cancer-registry", name: "Saint Lucia National Cancer Registry", aka: ["National Cancer Registry (Saint Lucia)"],
    city: "Castries", country: "LC", lat: 14.01, lng: -60.99, institutionType: "research-institute",
    tldr: "Saint Lucia's cancer registry, launched by the health ministry in July 2026 to collect and report cancer data for the whole island. OnCo found no figures published by it yet.",
    summary: "PAHO's release, datelined 31 July 2026, describes the National Cancer Registry as a central system for the collection, analysis and reporting of cancer data on incidence, distribution, trends and outcomes, launched under the theme \"Data for Action: Building a Stronger Response to Cancer\" by the Ministry of Health, Wellness and Nutrition with PAHO, the Caribbean Public Health Agency and IARC. The Chief Medical Officer is reported as saying that preliminary data suggested a 33% fall in cancer incidence in 2025 which could not be explained without a population-based registry. The Voice reports that the Caribbean Public Health Agency had assessed the island's cancer registration systems. IARC's GLOBOCAN 2024 fact sheet still lists no country-specific incidence data for Saint Lucia. The coordinates are an approximate Castries city point.",
    programs: ["Cancer registration for Saint Lucia (launched July 2026)"],
    institutions: ["moh-saint-lucia", "okeu-hospital-saint-lucia", "iarc"],
    links: [
      { label: "PAHO: Saint Lucia launches National Cancer Registry (July 2026)", url: PAHO_REGISTRY },
      { label: "The Voice: Saint Lucia launches National Cancer Registry", url: VOICE_REGISTRY },
      { label: "IARC Global Initiative for Cancer Registry Development: Caribbean Hub", url: GICR_HUB },
      { label: "IARC: GLOBOCAN 2024 fact sheet, Saint Lucia (PDF)", url: IARC_FACTSHEET },
    ] }),

  i({ id: "faces-of-cancer-saint-lucia", name: "Faces of Cancer Saint Lucia", aka: ["FOCS"],
    city: "Castries", country: "LC", lat: 14.01, lng: -60.99, institutionType: "consortium",
    tldr: "A patient group in Saint Lucia, started in 2009, that supports people through cancer treatment free of charge and was a partner in what the authors describe as the first studies of cancer survivors' experience on the island.",
    summary: "A 2022 paper says Faces of Cancer Saint Lucia started in 2009 to assist patients going through cancer, has a membership of over 215 people including volunteers from rural communities, and offers its services free of charge: education, health fairs, emotional and spiritual support, and support during chemotherapy and after surgery. It was moving towards patient navigation. The group was one of the main organisations behind a community-based study of 50 cancer survivors in 2019 and 2020. OnCo did not find a website for the group, so this record rests on the two papers and dates from 2022. The 2021 paper gives its address as Tapion Ridge, Castries; the coordinates are an approximate Castries city point.",
    programs: ["Support for people with cancer (education, emotional support, chemotherapy and post-surgical support)", "Community-based research with cancer survivors"],
    institutions: ["moh-saint-lucia"],
    keyPapers: [AUGUSTE_2021, AUGUSTE_2022],
    links: [
      doi("10.3390/ijerph19116531", "Auguste et al., cancer survivors in Saint Lucia and social support (Int J Environ Res Public Health 2022)"),
      doi("10.3390/ijerph18094770", "Auguste et al., access to cancer care among survivors in Saint Lucia (Int J Environ Res Public Health 2021)"),
    ] }),
];

const papers: PaperInput[] = [
  p({ id: AUGUSTE_2021, name: "Difficulties in Accessing Cancer Care in a Small Island State: A Community-Based Pilot Study of Cancer Survivors in Saint Lucia",
    journal: "International Journal of Environmental Research and Public Health", year: 2021, doi: "10.3390/ijerph18094770", pmid: "33947123", authors: "Auguste A, Jones G, Phillip D, et al.", paperType: "observational", participants: 50,
    tldr: "Interviews with 50 cancer survivors in Saint Lucia found that 56% had travelled abroad for treatment, and that most paid for care with help from family and friends.",
    summary: "A community-based pilot study that recruited cancer survivors by purposive and snowball sampling and interviewed them about the health services they used from first presentation to treatment. The open full text adds that radiotherapy and brachytherapy were reported as unavailable in Saint Lucia and that the commonest destinations abroad were the United States, Martinique and Guyana.",
    findings: ["50 survivors were recruited (13 men, 37 women); 52% of first presentations were with general practitioners.", "Mean turnaround for biopsy results in Saint Lucia was three times longer than overseas (p = 0.0013).", "About half started treatment more than a month after diagnosis (median 32 days, interquartile range 19 to 86), and 56% travelled out of the country for treatment.", "60% paid for care with support from family or friends; savings and medical insurance were each named by 38%."],
    whatItMeans: "The authors describe it as the first account of cancer care in Saint Lucia from the patient's side, including leaving the island for treatment.",
    caveats: ["A small convenience sample of survivors, so people who died soon after diagnosis are under-represented.", "Interviews ran from May 2019 to August 2020, across the hospital's move in March 2020 and before the cancer registry was launched."],
    cancers: ["breast-cancer"], institutions: ["faces-of-cancer-saint-lucia"], related: [AUGUSTE_2022],
    links: [doi("10.3390/ijerph18094770", "DOI"), pubmed("33947123")] }),

  p({ id: AUGUSTE_2022, name: "Cancer Survivors in Saint Lucia Deeply Value Social Support: Considerations for Cancer Control in Under-Resourced Communities",
    journal: "International Journal of Environmental Research and Public Health", year: 2022, doi: "10.3390/ijerph19116531", pmid: "35682118", authors: "Auguste A, Cox S, Oliver JS, et al.", paperType: "observational", participants: 44,
    tldr: "Forty-four cancer survivors in Saint Lucia described what mattered most in their care: support groups, family and friends, money, and health education with someone to guide them. Many had travelled overseas and felt isolated there.",
    summary: "A thematic analysis of interview answers from a cohort of adult cancer survivors in Saint Lucia, collected between 2019 and 2020. Most of the survivors were black, female and diagnosed with breast cancer, and they were interviewed on average five years after diagnosis.",
    findings: ["Forty-four survivors answered at least one of the three questions.", "Four themes emerged: availability of support groups, importance of support from family and friends, access to finances, and health education and patient navigation.", "Travel overseas for health services was common, and survivors described emotional distress from isolation from family and local providers."],
    whatItMeans: "For people on a small island, being treated abroad carries a cost in separation from family that plans for cancer care need to count.",
    caveats: ["Qualitative, from the same small convenience cohort as the 2021 paper.", "Survivors were interviewed years after diagnosis, so recall may be incomplete."],
    cancers: ["breast-cancer"], institutions: ["faces-of-cancer-saint-lucia"], related: [AUGUSTE_2021],
    links: [doi("10.3390/ijerph19116531", "DOI"), pubmed("35682118")] }),
];

/** Records behind /countries/lc/ (wave 16). */
export const recordsLC: EntityInput[] = [...institutions, ...papers];

import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Malawi: the public bodies and papers behind /countries/mw/ (wave 9) that the corpus did not hold. Institutions were
 * written from their own pages read as raw text on 11 November 2026 (the Pharmacy and Medicines Regulatory Authority's
 * home page and the Ministry of Health and Sanitation's home page); the registry from the papers it published. DOIs were
 * resolved through Europe PMC and every figure in `findings` is taken from the indexed abstract. Coordinates are
 * approximate city points.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const institutions: InstitutionInput[] = [
  i({ id: "ministry-of-health-malawi", name: "Ministry of Health and Sanitation, Malawi", aka: ["Ministry of Health Malawi", "MoH Malawi"],
    city: "Lilongwe", country: "MW", lat: -13.96, lng: 33.79, institutionType: "government", website: "https://www.health.gov.mw",
    tldr: "Malawi's health ministry. It runs the public hospitals that treat cancer and the national cervical cancer screening programme, which uses visual inspection with acetic acid and treatment of precancerous lesions.",
    summary: "Malawi's Ministry of Health and Sanitation, based in Lilongwe, runs the public health system. A 2016 paper by ministry and WHO staff describes the national cervical cancer control programme it established, using visual inspection with acetic acid (VIA) and cryotherapy: between 2011 and 2015 screening sites rose from 75 to 130 and the women screened each year from 15,331 to 49,301. Ministry staff also took part, with WHO's Malawi office and the College of Medicine, in the 2010 nationwide cancer registration exercise that counted 18,946 new cancers registered from 2007 to 2010. The coordinates on this record are an approximate Lilongwe point.",
    programs: ["National Cervical Cancer Control Programme (VIA and cryotherapy)", "Public hospital cancer care"],
    institutions: ["malawi-cancer-registry", "pmra-malawi"],
    keyPapers: ["paper-msyamboza-malawi-cervical-screening-2011-2015-bmcph-2016", "paper-msyamboza-malawi-national-cancer-burden-bmcrn-2012"],
    links: [
      { label: "Ministry of Health and Sanitation, Malawi", url: "https://www.health.gov.mw" },
      doi("10.1186/s12889-016-3530-y", "Msyamboza et al., cervical cancer screening in Malawi 2011 to 2015 (BMC Public Health 2016)"),
    ] }),

  i({ id: "malawi-cancer-registry", name: "Malawi Cancer Registry", aka: ["Malawi National Cancer Registry", "Blantyre cancer registry"],
    city: "Blantyre", country: "MW", lat: -15.79, lng: 35.01, institutionType: "research-institute", website: "https://doi.org/10.1002/ijc.30777",
    tldr: "Malawi's population-based cancer registry, based in Blantyre. It recorded 3,711 cancers in the city in 2008 to 2010, with Kaposi sarcoma leading in men and cervical cancer in women.",
    summary: "The Malawi Cancer Registry is based in Blantyre and uses active case finding with accuracy and validity checks in CanReg. Its paper on 2008 to 2010 counted 3,711 cancers among residents of Blantyre (1,643 men, age-standardised rate 169.8 per 100,000; 2,068 women, 238.7), with Kaposi sarcoma 40.5% of cancers in men and cervical cancer 33.3% in women, oesophageal cancer rates among the highest recorded anywhere, and Burkitt lymphoma 32.5% of childhood cancers; 47.5% of cases were confirmed by histology. Its data have been linked with HIV treatment records to measure cancer among people on antiretroviral therapy. OnCo found no website for the registry; this record's link is its 2017 paper. The coordinates on this record are an approximate Blantyre point.",
    programs: ["Population-based cancer registration for Blantyre", "Record linkage with HIV treatment cohorts"],
    institutions: ["ministry-of-health-malawi", "iarc"], cancers: ["cervical", "kaposi-sarcoma", "esophageal"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-chasimpha-blantyre-incidence-2008-2010-ijc-2017", "paper-msyamboza-malawi-national-cancer-burden-bmcrn-2012"],
    links: [
      doi("10.1002/ijc.30777", "Chasimpha et al., three-year cancer incidence in Blantyre, Malawi 2008 to 2010 (Int J Cancer 2017)"),
      doi("10.1093/cid/ciy960", "Horner et al., cancer among antiretroviral therapy users in Malawi (Clin Infect Dis 2019)"),
    ] }),

  i({ id: "pmra-malawi", name: "Pharmacy and Medicines Regulatory Authority, Malawi", aka: ["PMRA", "PMRA Malawi"],
    city: "Lilongwe", country: "MW", lat: -13.98, lng: 33.78, institutionType: "government", website: "https://www.pmra.mw",
    tldr: "Malawi's medicines regulator, governed by the PMRA Act of 2019. It keeps registers of approved products and of clinical trials.",
    summary: "The Pharmacy and Medicines Regulatory Authority regulates medicines, pharmacies and clinical trials in Malawi under the Pharmacy and Medicines Regulatory Authority Act, 2019, which it publishes with its regulations and guidelines. Its website keeps a products register, a premises register, a personnel register and a clinical trial register. The coordinates on this record are an approximate Lilongwe point.",
    programs: ["Product registration", "Clinical trial register", "Pharmacovigilance"],
    institutions: ["ministry-of-health-malawi"],
    links: [{ label: "Pharmacy and Medicines Regulatory Authority", url: "https://www.pmra.mw" }] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-chasimpha-blantyre-incidence-2008-2010-ijc-2017", name: "Three-year cancer incidence in Blantyre, Malawi, 2008 to 2010",
    journal: "International Journal of Cancer", year: 2017, doi: "10.1002/ijc.30777", pmid: "28493322", authors: "Chasimpha SJD, Parkin DM, Masamba L, Dzamalala CP", paperType: "observational", participants: 3711,
    tldr: "The Malawi Cancer Registry counted 3,711 cancers in Blantyre in 2008 to 2010: Kaposi sarcoma led in men, cervical cancer in women, and oesophageal cancer rates were among the highest in the world.",
    summary: "Published as \"Three-year cancer incidence in Blantyre, Malawi (2008-2010)\". The authors calculated incidence rates for the population of Blantyre from the Malawi Cancer Registry, using active case finding and standard checks in CanReg 4.",
    findings: [
      "3,711 cancers were registered: 1,643 in men (age-standardised rate 169.8 per 100,000) and 2,068 in women (238.7 per 100,000).",
      "Kaposi sarcoma was 40.5% of cancers in men (54.0 per 100,000); cervical cancer was 33.3% of cancers in women (88.6 per 100,000).",
      "Oesophageal cancer rates were 30.9 per 100,000 in men and 22.1 in women; prostate cancer was relatively low (16.4 per 100,000).",
      "Burkitt lymphoma was 32.5% of childhood cancers; 47.5% of all cases were confirmed by histology.",
    ],
    whatItMeans: "Kaposi sarcoma and cervical cancer lead in Blantyre, oesophageal cancer rates are among the highest in the world, and the authors read a histology share under half as a sign of successful case finding outside laboratories.",
    caveats: ["One city; rural Malawi may differ.", "Under half of cases had histological confirmation."],
    institutions: ["malawi-cancer-registry"], cancers: ["kaposi-sarcoma", "cervical", "esophageal"],
    links: [doi("10.1002/ijc.30777", "Int J Cancer 2017"), pubmed("28493322")] }),

  p({ id: "paper-msyamboza-malawi-national-cancer-burden-bmcrn-2012", name: "Burden of cancer in Malawi: a nationwide registration exercise for 2007 to 2010",
    journal: "BMC Research Notes", year: 2012, doi: "10.1186/1756-0500-5-149", pmid: "22424105", authors: "Msyamboza KP, Dzamalala C, Mdokwe C, et al.", paperType: "observational", participants: 18946,
    tldr: "A 2010 search of the registers of 81 health facilities found 18,946 new cancers registered in Malawi from 2007 to 2010; cervical cancer was 45.4% of cancers in women and Kaposi sarcoma 50.7% in men.",
    summary: "Published as \"Burden of cancer in Malawi; common types, incidence and trends: national population-based cancer registry\". Between September and October 2010, data were extracted from the registers and case notes of 81 of the 84 facilities providing cancer diagnosis, treatment or palliative care.",
    findings: [
      "18,946 new cancers were registered in 2007 to 2010; 55.9% were in women and 7.2% in children under 15.",
      "Only 17.9% had a histologically verified diagnosis.",
      "In women cervical cancer was 45.4% of cases and Kaposi sarcoma 21.1%; in men Kaposi sarcoma was 50.7% and oesophageal cancer 16.9%.",
      "Age-standardised incidence rose from 31 to 56 per 100,000 in men and from 29 to 69 in women between 1999 to 2002 and 2007 to 2010; the authors estimated at least 8,151 new cancers a year.",
    ],
    whatItMeans: "The only nationwide count in the sources read for this page; it shows how much cancer in Malawi is linked to HIV and HPV, and how few cancers were confirmed by a laboratory.",
    caveats: ["The authors note under-reporting and misdiagnosis.", "Facility registers, not a continuous population-based registry for the whole country."],
    institutions: ["ministry-of-health-malawi", "malawi-cancer-registry"], cancers: ["cervical", "kaposi-sarcoma", "esophageal"],
    links: [doi("10.1186/1756-0500-5-149", "BMC Res Notes 2012"), pubmed("22424105")] }),

  p({ id: "paper-msyamboza-malawi-cervical-screening-2011-2015-bmcph-2016", name: "Cervical cancer screening uptake and challenges in Malawi, 2011 to 2015",
    journal: "BMC Public Health", year: 2016, doi: "10.1186/s12889-016-3530-y", pmid: "27535359", authors: "Msyamboza KP, Phiri T, Sichali W, Kwenda W, Kachale F", paperType: "observational", participants: 145015,
    tldr: "Malawi's VIA screen-and-treat programme grew from 75 to 130 sites between 2011 and 2015 and screened 145,015 women; yearly coverage rose from 9.3% to 26.5%.",
    summary: "Published as \"Cervical cancer screening uptake and challenges in Malawi from 2011 to 2015: retrospective cohort study\". The authors analysed programme data, supervision and reports of the National Cervical Cancer Control Program, which uses visual inspection with acetic acid and cryotherapy.",
    findings: [
      "Screening sites rose from 75 to 130, women screened a year from 15,331 to 49,301, and coverage a year from 9.3% to 26.5%.",
      "145,015 women were screened; 5.1% were VIA positive and 4.3% had suspected cancer.",
      "VIA positivity was higher in women with HIV than without (8.8% against 5.0%).",
    ],
    whatItMeans: "Shows the scale and limits of screen-and-treat in a country with very high cervical cancer rates; 4.3% of women screened already had suspected cancer.",
    caveats: ["Programme data; HIV status was unknown for 29% of women with data."],
    institutions: ["ministry-of-health-malawi"], cancers: ["cervical"],
    links: [doi("10.1186/s12889-016-3530-y", "BMC Public Health 2016"), pubmed("27535359")] }),
];

/** Records behind /countries/mw/ (wave 9). */
export const recordsMW: EntityInput[] = [...institutions, ...papers];

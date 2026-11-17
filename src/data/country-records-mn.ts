import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Mongolia: the bodies and papers behind /countries/mn/ (wave 13) that the corpus did not hold. Written from sources
 * read as raw text on 16 November 2026: the National Cancer Center's registry report "Улсын хэмжээний хорт хавдрын
 * үзүүлэлт 2024" (PDF text, in Mongolian), the home, activity and registration pages of the medicines regulator
 * (mmra.gov.mn, in Mongolian), the Health Insurance General Office's mission page and its tariff page for cancer day
 * treatment (emd.gov.mn, in Mongolian), the English text of the Cancer Prevention and Control Program 2025-2028 on the
 * ICCP Portal (PDF text), and the papers' abstracts through Europe PMC (and, for the 2026 cervical cancer paper, its
 * open full text).
 *
 * The National Cancer Center itself is already in the corpus and is linked by id, not repeated. The National Cancer Council and the Onom Foundation are also in the corpus but no source read for this page describes them, so the page does not list them.
 * Coordinates are an approximate city point for Ulaanbaatar, not building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NCC_REGISTRY_LIST = "https://www.cancer-center.gov.mn/%d0%b8%d0%bb-%d1%82%d0%be%d0%b4-%d0%b1%d0%b0%d0%b9%d0%b4%d0%b0%d0%bb/%d0%b8%d0%bb-%d1%82%d0%be%d0%b4-%d0%b1%d0%b0%d0%b9%d0%b4%d0%b0%d0%bb/st/";
const NCC_REPORT_2024 = "https://www.cancer-center.gov.mn/download/st-2/";
const NCCP = "https://www.iccp-portal.org/sites/default/files/2026-01/NCCP%20Mongolia%202025-2028.pdf";
const MMRA = "https://mmra.gov.mn/";
const MMRA_REGISTRATION = "https://mmra.gov.mn/?id=226";
const MMRA_ACTIVITY = "https://mmra.gov.mn/?id=200005";
const EMD = "https://emd.gov.mn/";
const EMD_ABOUT = "https://emd.gov.mn/about";
const EMD_CANCER_DAY = "https://emd.gov.mn/service/115";
const REGISTRY_2017 = "10.1002/ijc.30463";
const CERVIX_2026 = "10.3389/fonc.2026.1853617";
const CRC_2024 = "10.31557/apjcp.2024.25.7.2305";

const institutions: InstitutionInput[] = [
  i({ id: "center-for-health-development-mongolia", name: "Эрүүл мэндийн хөгжлийн төв (Center for Health Development, Mongolia)",
    aka: ["Center for Health Development"],
    city: "Ulaanbaatar", country: "MN", lat: 47.92, lng: 106.92, institutionType: "government", website: "https://hdc.gov.mn/",
    tldr: "The Mongolian public body that supplied the national health information system (H-Info) data behind a 2026 study of cervical cancer in Mongolia. The study's authors say it gave them a de-identified extract of cervical cancer cases and deaths for 2014 to 2024.",
    summary: "A 2026 paper in Frontiers in Oncology on cervical cancer in Mongolia from 2014 to 2024 says its data came from 'Mongolia's Health Information System (H-Info), a centralized database that collects routine administrative and clinical information from health facilities across the country', and that 'the dataset used in this study was provided by the Center for Health Development, Mongolia, as a pre-extracted, de-identified dataset for research purposes'. The paper lists the Center for Health Development, Ulaanbaatar, among its authors' affiliations. The centre's own site, in Mongolian, carries the name Эрүүл мэндийн хөгжлийн төв. OnCo did not read the centre's own description of its work or its yearly health indicators report, so its legal status, its other duties and how H-Info relates to the National Cancer Center's cancer registry are not described here. The coordinates are an approximate point for Ulaanbaatar, not the building.",
    cancers: ["cervical"],
    links: [
      { label: "Center for Health Development: home page (in Mongolian)", url: "https://hdc.gov.mn/" },
      { label: "Frontiers in Oncology 2026: trends in cervical cancer incidence and mortality in Mongolia, 2014-2024", url: `https://doi.org/${CERVIX_2026}` },
    ], keyPapers: ["paper-tsogtgerel-mongolia-cervical-cancer-trends-2014-2024-front-oncol-2026"] }),
  i({ id: "national-cancer-registry-mongolia", name: "Хорт хавдар эрт илрүүлгийн бүртгэл тандалтын алба (cancer early detection, registry and surveillance unit, National Cancer Center of Mongolia)",
    aka: ["National Cancer Registry of Mongolia", "Mongolian national cancer registry", "ХХЭИБТ алба"],
    city: "Ulaanbaatar", country: "MN", lat: 47.92, lng: 106.92, institutionType: "research-institute", website: NCC_REGISTRY_LIST,
    tldr: "The unit of Mongolia's National Cancer Center that keeps the national cancer registry and publishes the yearly count of new cancers and cancer deaths. Its report for 2024 counted 8,169 new cancers and 4,755 cancer deaths.",
    summary: "The unit's report for 2024, published by the National Cancer Center, says the registry aims to record every new cancer and every cancer death in the country. It says new cases are reported on a form called AM-5 (site, morphology, TNM stage, treatment) and deaths are taken from death certificates (form AM-7), with reports coming mainly from the regional diagnostic and treatment centres, the 21 provincial general hospitals, the nine district health centres of Ulaanbaatar, some specialised hospitals and the Songdo, Intermed and Seoul hospitals. It names orders of the Minister of Health of 2013 (no. 450), 2014 (no. 431) and 2019 (no. A/611) as the rules it works under. The report gives 8,169 new cancers registered in 2024 (6,702 in 2020), 58.1% of the 2024 cases confirmed by morphology and 5% known from a death certificate only, and 4,755 cancer deaths. The Cancer Prevention and Control Program 2025-2028 calls the registry software CanReg-Mon and plans to upgrade it. The unit also compiles the quarterly breast and cervical early detection returns.",
    programs: ["National cancer registration (new cases on form AM-5, deaths from death certificates)", "Yearly report of cancer incidence and mortality", "Quarterly returns of breast and cervical early detection"],
    institutions: ["national-cancer-center-mongolia"],
    cancers: ["hcc", "gastric", "cervical", "esophageal", "colorectal"],
    links: [
      { label: "National Cancer Center: national cancer registry reports (in Mongolian)", url: NCC_REGISTRY_LIST },
      { label: "National Cancer Center: Улсын хэмжээний хорт хавдрын үзүүлэлт 2024 (national cancer indicators 2024, PDF download page)", url: NCC_REPORT_2024 },
      { label: "ICCP Portal: Cancer Prevention and Control Program 2025-2028, Mongolia (PDF)", url: NCCP },
    ], keyPapers: ["paper-chimed-mongolia-national-cancer-registry-2008-12-ijc-2017"] }),

  i({ id: "mmra-mongolia", name: "Эм, эмнэлгийн хэрэгслийн хяналт, зохицуулалтын газар (Medicines and Medical Devices Control and Regulatory Agency, Mongolia)",
    aka: ["ЭЭХХЗГ", "MMRA"],
    city: "Ulaanbaatar", country: "MN", lat: 47.92, lng: 106.92, institutionType: "government", website: MMRA,
    tldr: "Mongolia's medicines regulator, a government agency in Ulaanbaatar. It registers medicines, diagnostics and biologically active products and collects reports of side effects.",
    summary: "The agency's site describes it as a government implementing agency (Засгийн газрын хэрэгжүүлэгч агентлаг). Its registration page says medicines, diagnostics and biologically active products for use in Mongolia are registered on the basis of evidence-based quality and safety documents and test results, and it posts the lists of medicines decided at the meetings of the Эмийн зөвлөл (medicines council); the latest posted when OnCo read it were for meetings in January, March and May 2026. The site says anyone can check whether a medicine is officially registered in the electronic register Licemed (licemed.mohs.mn, an address OnCo could not open), searching by international or trade name, and it has a page for reporting side effects. Its activity pages also cover special permits, licensing, medical equipment and medicine supply. OnCo did not read the law the agency works under.",
    programs: ["Registration of medicines, diagnostics and biologically active products", "Reporting of side effects (pharmacovigilance)", "Special permits and licensing", "Licemed electronic register of medicines"],
    links: [
      { label: "ЭЭХХЗГ: home page (in Mongolian)", url: MMRA },
      { label: "ЭЭХХЗГ: registration activity and medicines council decisions (in Mongolian)", url: MMRA_REGISTRATION },
      { label: "ЭЭХХЗГ: activities and frequently asked questions (in Mongolian)", url: MMRA_ACTIVITY },
    ] }),

  i({ id: "health-insurance-general-office-mongolia", name: "Эрүүл мэндийн даатгалын ерөнхий газар (Health Insurance General Office, Mongolia)",
    aka: ["ЭМДЕГ", "Health Insurance General Agency of Mongolia", "HIGA"],
    city: "Ulaanbaatar", country: "MN", lat: 47.92, lng: 106.92, institutionType: "government", website: EMD,
    tldr: "The government agency that runs Mongolia's health insurance fund and buys care from hospitals under contract. Its published tariff for cancer day treatment shows the fund paying the whole listed price for chemotherapy and radiotherapy day treatment.",
    summary: "The office's site describes it as a government implementing agency, and its mission statement is to enrol every Mongolian in health insurance, build a stable fund and buy good-quality care that meets insured people's needs. Its tariff page for cancer chemotherapy and radiotherapy day treatment lists four rows, each with the amount the insurance pays, the amount the citizen pays and the total: chemotherapy day treatment 450,000, targeted therapy day treatment (бай эмчилгээ) 4,000,000, simple radiotherapy 66,000 and radiotherapy on a linear accelerator 350,000, with the citizen's share shown as 0 in every row. The page prints no currency and does not say whether an amount is for a day, a cycle or a course. The same page lists 17 contracted providers, including the National Cancer Center, the three state central hospitals, the National Center for Maternal and Child Health, district health centres and hospitals in Ulaanbaatar, UB Songdo Hospital and Asralt Med hospital. The site also lists inpatient, outpatient, high-cost diagnostic, palliative and rehabilitation services among those it buys. Its page on discounted medicine prices returned no list to a plain request.",
    programs: ["Health insurance fund purchasing", "Cancer chemotherapy and radiotherapy day treatment tariff", "Contracts with public and private providers"],
    institutions: ["national-cancer-center-mongolia"],
    links: [
      { label: "ЭМДЕГ: home page (in Mongolian)", url: EMD },
      { label: "ЭМДЕГ: mission (in Mongolian)", url: EMD_ABOUT },
      { label: "ЭМДЕГ: cancer chemotherapy and radiotherapy day treatment, tariff and contracted providers (in Mongolian)", url: EMD_CANCER_DAY },
    ], related: ["mmra-mongolia"] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-chimed-mongolia-national-cancer-registry-2008-12-ijc-2017", name: "Cancer incidence in Mongolia from the National Cancer Registry, 2008 to 2012",
    journal: "International Journal of Cancer", year: 2017, doi: REGISTRY_2017, pmid: "27716912", authors: "Chimed T, Sandagdorj T, Znaor A, et al.", paperType: "observational", participants: 21564,
    tldr: "The National Cancer Registry of Mongolia, covering the whole population, recorded 21,564 new cancers in 2008 to 2012. Liver cancer was the commonest in both sexes and made up almost two in five of all diagnoses.",
    summary: "Published as \"Cancer incidence and cancer control in Mongolia: Results from the National Cancer Registry 2008-12\", written by authors from the National Cancer Center of Mongolia and IARC's cancer surveillance section. It reports new cases for 2008 to 2012 from the National Cancer Registry of Mongolia, which the abstract describes as covering the entire population of 2.87 million. OnCo read the abstract through Europe PMC; the full text is not open.",
    findings: [
      "21,564 new cancers were diagnosed over the five years, 52% of them in men.",
      "Liver cancer was the leading site in both sexes, with age-standardised rates of 114.7 per 100,000 men and 74.6 per 100,000 women, and was responsible for almost two-fifths of all cancer diagnoses.",
      "Next came cancers of the stomach, lung and oesophagus in men, and of the cervix, stomach and oesophagus in women.",
      "The cumulative risk of any cancer was 27.7% in men and 20.8% in women, which the authors place above China, below the United States and similar to Russia.",
    ],
    whatItMeans: "The registry's own five-year series, analysed with IARC, and the published source for the pattern: liver cancer first in both sexes. The authors call for the registry's work to be expanded in support of cancer control planning.",
    caveats: ["Abstract only read; the completeness of registration in those years is not described in the abstract.", "The data are from 2008 to 2012; the registry's 2024 report is the current count."],
    institutions: ["national-cancer-registry-mongolia", "national-cancer-center-mongolia", "iarc"], cancers: ["hcc", "gastric", "cervical", "esophageal"],
    links: [doi(REGISTRY_2017, "International Journal of Cancer 2017"), pubmed("27716912")] }),

  p({ id: "paper-tsogtgerel-mongolia-cervical-cancer-trends-2014-2024-front-oncol-2026", name: "Cervical cancer incidence and mortality in Mongolia, 2014 to 2024, and the fall in diagnoses during the pandemic",
    journal: "Frontiers in Oncology", year: 2026, doi: CERVIX_2026, pmid: "42707334", authors: "Tsogtgerel NE, Adiyadorj D, Ganbaatar GE, et al.", paperType: "observational", participants: 3990,
    tldr: "Mongolia's health information system recorded 3,990 cervical cancers and 1,370 deaths from 2014 to 2024. Diagnoses fell from 479 in 2016 to 145 in 2022 and rose to 541 in 2024, which the authors read as missed detection during the pandemic.",
    summary: "Published as \"Trends in cervical cancer incidence and mortality in Mongolia, 2014-2024: a population-based analysis of pandemic-related disruptions\". The authors used a de-identified extract of cervical cancer cases and deaths from the national health information system (H-Info), provided by the Center for Health Development, with populations from the National Statistics Office, and age-standardised the rates to the WHO world standard. OnCo read the open full text through Europe PMC. A correction published in October 2026 changed the name of the handling editor only.",
    findings: [
      "3,990 cases and 1,370 deaths were recorded between 2014 and 2024.",
      "Age-standardised incidence was 30.5 per 100,000 women in 2014, 45.3 in 2016, 27.6 in 2019, 11.4 in 2022, 38.7 in 2023 and 39.5 in 2024.",
      "Yearly cases were 479 in 2016, 328 in 2019, 274 in 2020, 210 in 2021, 145 in 2022, 508 in 2023 and 541 in 2024.",
      "Mortality fell gradually over the period and varied much less than incidence.",
      "The paper says a national cytology-based screening programme has been in place since 2012, with coverage estimated at around 38%.",
    ],
    whatItMeans: "The fall in recorded cervical cancer from 2020 to 2022 and the rebound in 2023 follow screening and diagnostic activity, in the authors' reading, and not a real change in how often the disease occurs. It shows how sensitive Mongolia's counts are to whether services are running.",
    caveats: ["The authors analysed an extract provided to them, not the full database, and had no data on individual screening or vaccination.", "The confidence intervals around each year's rate are wide, and the 2023 to 2024 change rests on two data points.", "The counts come from H-Info and differ slightly from the National Cancer Center registry's (521 cervical cancers in 2024)."],
    institutions: ["center-for-health-development-mongolia"], cancers: ["cervical"],
    links: [doi(CERVIX_2026, "Frontiers in Oncology 2026"), pubmed("42707334")] }),

  p({ id: "paper-tsedendorj-mongolia-colorectal-cancer-2018-2022-apjcp-2024", name: "Colorectal cancer incidence and mortality in Mongolia by province, 2018 to 2022",
    journal: "Asian Pacific Journal of Cancer Prevention", year: 2024, doi: CRC_2024, pmid: "39068562", authors: "Tsedendorj Y, Zorigtbaatar S, Davaasuren NE, et al.", paperType: "observational", participants: 1316,
    tldr: "Hospitals across Mongolia recorded 1,316 new colorectal cancers and 782 deaths from 2018 to 2022, about 7.9 new cases and 4.7 deaths per 100,000 people a year.",
    summary: "Published as \"Incidence and Mortality due to Colorectal Cancer in Mongolia, 2018-2022\". A descriptive study from the Mongolian National University of Medical Sciences using data collected from the 21 provincial general hospitals, nine district general hospitals and the National Cancer Center. OnCo read the abstract through Europe PMC.",
    findings: [
      "1,316 new colorectal cancers were diagnosed and 782 deaths recorded in the five years 2018 to 2022.",
      "Incidence was 7.9 per 100,000 and mortality 4.7 per 100,000 as a mean annual rate.",
      "Incidence was highest in Orkhon (12), Khentii (11) and the province the abstract calls Central (10); incidence did not differ significantly between men and women.",
    ],
    whatItMeans: "A province-by-province picture of a cancer that Mongolia's 2025 to 2028 programme has added to its early detection plans, with a stool blood test proposed every two years for people over 45.",
    caveats: ["Abstract only read.", "A descriptive study of hospital returns; the abstract does not describe how complete they were."],
    institutions: ["national-cancer-center-mongolia"], cancers: ["colorectal"],
    links: [doi(CRC_2024, "Asian Pacific Journal of Cancer Prevention 2024"), pubmed("39068562")] }),
];

/** Records behind /countries/mn/ (wave 13). */
export const recordsMN: EntityInput[] = [...institutions, ...papers];

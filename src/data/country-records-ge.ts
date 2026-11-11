import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Georgia (the country in the Caucasus, not the US state): the public bodies and papers behind /countries/ge/
 * (wave 10) that the corpus did not hold. Each was written from its own source, read raw on 11 November 2026: the
 * National Center for Disease Control and Public Health's report "Cancer in Georgia 2015-2021" (PDF text, from the
 * Center's file service), IANPHI's March 2022 article on the registry, WHO Europe's "Health Systems in Action:
 * Georgia" (2024 edition), its 2021 financial protection review and its 2017 health system review (PDF text from
 * WHO IRIS), and the regulator's own home page as the Internet Archive kept it in August 2021 (in Georgian; the live
 * site did not resolve). The Ministry of Health's site answered with a Cloudflare challenge and was not read. DOIs
 * were resolved through Europe PMC and the figures in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the Ministry links the Center, the registry, the regulator and the purchaser; the Center links the
 * registry; the registry links its incidence and stage papers through keyPapers. Coordinates are approximate Tbilisi
 * city points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NCDC_REPORT = "https://ncdc.ge/Api/api/File/GetFile/a2a861e7-d810-41d3-8948-7316b80aff4f";
const IANPHI = "https://ianphi.org/news/2022/georgia-cancer-registry.html";
const HSIA_2024 = "https://iris.who.int/handle/10665/380264";
const FINPROT_2021 = "https://iris.who.int/handle/10665/342815";
const HIT_2017 = "https://iris.who.int/handle/10665/330206";
const RAMA_2021 = "https://web.archive.org/web/20210817174118/http://rama.moh.gov.ge/";

const institutions: InstitutionInput[] = [
  i({ id: "georgia-ministry-of-health", name: "Ministry of Internally Displaced Persons from the Occupied Territories, Labour, Health and Social Affairs of Georgia",
    aka: ["Ministry of Health of Georgia", "MoIDPLHSA", "MoLHSA", "Ministry of Labour, Health and Social Affairs of Georgia"],
    city: "Tbilisi", country: "GE", lat: 41.72, lng: 44.79, institutionType: "government", website: "https://www.moh.gov.ge",
    tldr: "Georgia's health ministry. It runs the Universal Health Care Programme, which since November 2023 opens its cancer care package to every resident regardless of income or insurance; the medicines regulator is one of its agencies.",
    summary: "The Ministry of Internally Displaced Persons from the Occupied Territories, Labour, Health and Social Affairs governs Georgia's health system, in which nearly all providers are private and about 80% of hospital beds are privately owned. WHO Europe's 2024 profile of the system describes the Universal Health Care Programme (UHCP), started in February 2013 and extended in July 2013 to a basic package that included chemotherapy, hormone therapy and radiotherapy. In 2023 it gave 93.7% of residents some degree of coverage. The National Health Agency, with ten regional departments, buys services for it. The Ministry's own website returned a Cloudflare challenge when OnCo tried to read it, so this record rests on WHO's reports. The coordinates are an approximate Tbilisi city point.\n\nFor cancer, WHO records three recent changes: since November 2023 the cancer care benefits package is available to everyone regardless of income or insurance status; also in November 2023 a managed entry agreement mechanism was introduced to give access to innovative cancer medicines; and from 2024 the GEL 25,000 annual limit on reimbursing cancer medicines was removed. WHO's 2021 financial protection review had recorded a ceiling of GEL 12,000 a year for cancer treatment, and that health technology assessment had not featured in decisions about what the programme covers.\n\nThe Ministry signed a four-year collaboration agreement with City Cancer Challenge on 13 February 2025, renewing work in Tbilisi that began in 2019, and C/Can describes a Georgian National Cancer Board led by the Minister.",
    programs: ["Universal Health Care Programme (from 2013)", "Cancer care benefits package for all residents (from November 2023)", "Managed entry agreements for innovative cancer medicines (from November 2023)", "State cancer screening programme (breast, cervical, colorectal, prostate)", "Hepatitis C Elimination Program (from 2015)"],
    institutions: ["ncdc-georgia", "georgia-population-cancer-registry", "georgia-regulation-agency", "georgia-national-health-agency", "who", "iarc"],
    cancers: ["breast-cancer", "cervical", "colorectal", "lung-cancer", "prostate"], related: ["global-oncology-access"],
    keyPapers: ["paper-kakhniashvili-cancer-financial-burden-georgia-cancer-control-2025", "paper-irzaldy-breast-screening-georgia-vhri-2024", "paper-kiguradze-hpv-test-vs-pap-tbilisi-cejph-2024", "paper-khoperia-liver-cancer-hcv-elimination-georgia-plosone-2026"],
    links: [
      { label: "WHO Europe: Health Systems in Action, Georgia, 2024 edition (WHO IRIS)", url: HSIA_2024 },
      { label: "WHO Europe: Can people afford to pay for health care? New evidence on financial protection in Georgia (2021, WHO IRIS)", url: FINPROT_2021 },
      { label: "City Cancer Challenge: Tbilisi is leading the way in cancer care reform (21 February 2025)", url: "https://citycancerchallenge.org/tbilisi-is-leading-the-way-in-cancer-care-reform/" },
    ] }),

  i({ id: "ncdc-georgia", name: "National Center for Disease Control and Public Health (Georgia)", aka: ["NCDC Georgia", "NCDC", "National Centre for Disease Control and Public Health"],
    city: "Tbilisi", country: "GE", lat: 41.73, lng: 44.77, institutionType: "government", website: "https://www.ncdc.ge",
    tldr: "Georgia's public health institute. It runs the national population-based cancer registry, started on 1 January 2015, and the electronic system behind the state cancer screening programme, and it publishes the country's cancer statistics.",
    summary: "The National Center for Disease Control and Public Health was established in 1996 from the epidemiological divisions of the Republican Sanitary-Epidemiological Station, and later absorbed the Medical Statistics and Information Centre (2003) and the Public Health Department (2007); WHO's 2017 review describes it as responsible for immunisation, surveillance, disease prevention, health promotion and laboratories. The coordinates are an approximate Tbilisi city point.\n\nFor cancer, the Center launched the population-based cancer registry on 1 January 2015, using IARC's CanReg5 software. Its report \"Cancer in Georgia 2015-2021\" counts 10,432 new cancers in 2021, 7,388 cancer deaths in the same year from national statistics, and five-year survival of 55.0% for all sites diagnosed in 2017 by the direct method. In 2019 it launched a unified electronic system for cancer data that also runs the state screening programme for cervical, breast and colorectal cancer, inviting people back after a first screen and linking to the death register so survival can be calculated. The registry's first five-year survival assessment, made in 2020, was hailed by IANPHI's General Assembly as a success.\n\nNCDC researchers have linked the cancer registry to the national Hepatitis C Elimination Program database to study liver cancer, and a survey of 2,958 primary care doctors and nurses about cancer screening referral in November 2023 was led by a researcher in its health promotion division.",
    programs: ["Population-based cancer registry (from 1 January 2015)", "Unified electronic system for cancer data and screening (from 2019)", "Cancer screening programme data and invitations", "Health care statistical yearbooks"],
    institutions: ["georgia-population-cancer-registry", "georgia-ministry-of-health", "iarc"],
    cancers: ["breast-cancer", "cervical", "colorectal", "thyroid", "hcc"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-topuridze-phc-cancer-screening-georgia-ejgp-2025", "paper-khuntsaria-hpv-vaccination-cervical-georgia-bmcph-2025", "paper-khoperia-liver-cancer-hcv-elimination-georgia-plosone-2026", "paper-surguladze-hcv-attributable-liver-cancer-georgia-bmcid-2024"],
    links: [
      { label: "NCDC: Cancer in Georgia 2015-2021 (PDF)", url: NCDC_REPORT },
      { label: "IANPHI: Georgia's cancer registry improves access to high quality data (15 March 2022)", url: IANPHI },
      { label: "WHO Europe: Georgia, health system review 2017 (WHO IRIS)", url: HIT_2017 },
    ] }),

  i({ id: "georgia-population-cancer-registry", name: "Georgia Population-Based Cancer Registry", aka: ["Georgian Cancer Registry", "Georgia National Cancer Registry", "Cancer Population Registry of Georgia"],
    city: "Tbilisi", country: "GE", lat: 41.725, lng: 44.775, institutionType: "government", website: "https://www.ncdc.ge",
    tldr: "Georgia's national population-based cancer registry, run by the National Center for Disease Control and Public Health since 1 January 2015. It counts about 10,000 to 11,000 new cancers a year across the whole country.",
    summary: "The registry was launched on 1 January 2015 by the National Center for Disease Control and Public Health, with medical facilities treating cancer required to share information with it. Before then, IANPHI reports, routine surveillance from about 200 facilities registered only 4,200 new cancers in 2014; since 2015 more than 10,000 have been recorded each year. Notification was at first on paper; in 2019 the Center launched a unified electronic system that combines screening, diagnosis and treatment data and updates each patient's vital status from the death register. The coordinates are an approximate Tbilisi city point.\n\nThe registry's report for 2015 to 2021 gives between 10,073 and 11,380 new cancers a year including in situ tumours, 10,432 in 2021 (281.3 per 100,000), with 38.2% of cancers found at stage I or II and 38.6% at stage III or IV in 2021. A national analysis of 2015 to 2019 counted 50,098 invasive cancers other than non-melanoma skin cancer, with age-standardised rates of 175.5 per 100,000 men and 192.8 per 100,000 women; lung and prostate cancer led in men, and breast and thyroid cancer in women.\n\nIARC's GLOBOCAN 2024 fact sheet for Georgia lists no country-specific incidence source and estimates incidence from national mortality instead, so the registry's counts and IARC's estimate differ.",
    programs: ["National cancer registration (from 1 January 2015)", "Five-year survival assessment (first in 2020)", "Linkage with the Hepatitis C Elimination Program and vital registration"],
    institutions: ["ncdc-georgia", "georgia-ministry-of-health", "iarc"], cancers: ["breast-cancer", "thyroid", "lung-cancer", "prostate", "colorectal"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-beraia-georgia-cancer-incidence-2015-2019-ctarc-2026", "paper-batavani-georgia-early-late-detection-canep-2022"],
    links: [
      { label: "NCDC: Cancer in Georgia 2015-2021 (PDF)", url: NCDC_REPORT },
      { label: "IANPHI: Georgia's cancer registry improves access to high quality data (15 March 2022)", url: IANPHI },
      doi("10.1016/j.ctarc.2026.101267", "Beraia et al., incidence of common cancers in Georgia 2015 to 2019 (Cancer Treat Res Commun 2026)"),
    ] }),

  i({ id: "georgia-regulation-agency", name: "Regulation Agency for Medical and Pharmaceutical Activities (Georgia)", aka: ["State Regulation Agency for Medical Activities", "SRAMA"],
    city: "Tbilisi", country: "GE", lat: 41.715, lng: 44.785, institutionType: "government", website: "http://rama.moh.gov.ge",
    tldr: "Georgia's regulator for medicines, medical facilities and health professionals, part of the health ministry. Under a 2009 law it registers medicines already accepted by approved foreign regulators such as the European Medicines Agency through a simplified route.",
    summary: "The agency, a legal entity of public law under the health ministry, licenses medical activities, issues permits to health facilities and pharmacies, and regulates health professionals, medicines and medical devices; WHO's 2017 review calls it the State Regulation Agency for Medical Activities (SRAMA). Its home page, as the Internet Archive kept it in August 2021, lists divisions for medicine registration and permits, medicine inspection, licences and accreditation and professional regulation, and a public register of pharmaceutical products. Its live site did not resolve when OnCo tried it. The coordinates are an approximate Tbilisi city point.\n\nWHO's 2017 review explains that the Law on Drugs and Pharmaceutical Regulation (2009), as it names the law, introduced a recognition policy: brand and generic medicines accepted by an approved regulator, such as the European Medicines Agency or the national regulators of most European countries, the United States, Japan, Australia and New Zealand, can be registered in Georgia automatically without extra quality certificates. The same review notes concerns about traceability and quality checks after deregulation, and that the agency received notifications of up to 300 adverse drug reactions in 2016. WHO's 2024 profile adds that a new Law on Medicinal Products, drafted from 2021 and updated in 2023 to reflect EU directives, had not yet been debated in parliament, and that reference pricing now caps the prices of more than 7,000 medicines.",
    programs: ["Registration of medicines, including recognition of approvals by reference regulators (from 2009)", "Licensing of medical facilities and pharmacies", "Certification of medical professionals", "Pharmacovigilance"],
    institutions: ["georgia-ministry-of-health"],
    links: [
      { label: "Regulation Agency for Medical and Pharmaceutical Activities: home page (Georgian; Internet Archive copy, 17 August 2021)", url: RAMA_2021 },
      { label: "WHO Europe: Georgia, health system review 2017, sections 2 and 5 (WHO IRIS)", url: HIT_2017 },
      { label: "WHO Europe: Health Systems in Action, Georgia, 2024 edition (WHO IRIS)", url: HSIA_2024 },
    ] }),

  i({ id: "georgia-national-health-agency", name: "National Health Agency (Georgia)", aka: ["Social Service Agency (Georgia)", "SSA Georgia"],
    city: "Tbilisi", country: "GE", lat: 41.71, lng: 44.8, institutionType: "government", website: "https://nha.moh.gov.ge",
    tldr: "The single public purchaser of health services in Georgia. It pays the private hospitals and clinics that deliver the Universal Health Care Programme, including cancer surgery, chemotherapy and radiotherapy, through ten regional departments.",
    summary: "WHO Europe's 2024 profile names the National Health Agency, with ten regional departments, as the single purchaser of services under the Universal Health Care Programme and most other government-funded health programmes; WHO's 2017 and 2021 reviews give the purchaser as the Social Service Agency. Since November 2022 it has paid contracted hospitals by diagnosis-related groups, and since 2023 hospitals may no longer charge patients more than the standard co-payment; government reports cited by WHO put co-payments at 10% of the cost of inpatient care in 2023, down from 27% in 2022. Its website returned a Cloudflare challenge when OnCo tried it. The coordinates are an approximate Tbilisi city point.\n\nThe National Center for Disease Control and Public Health matches registry cases with the purchaser's database to describe cancer treatment: in 2021, of 10,432 new cancers, 44.3% had surgery, 27.7% chemotherapy and 18.3% radiotherapy.",
    programs: ["Purchasing for the Universal Health Care Programme", "Diagnosis-related group payments to hospitals (from November 2022)", "Reimbursement of medicines, including cancer medicines"],
    institutions: ["georgia-ministry-of-health"],
    links: [
      { label: "WHO Europe: Health Systems in Action, Georgia, 2024 edition, sections 1 and 2 (WHO IRIS)", url: HSIA_2024 },
      { label: "WHO Europe: financial protection in Georgia (2021, WHO IRIS)", url: FINPROT_2021 },
      { label: "NCDC: Cancer in Georgia 2015-2021, treatment section (PDF)", url: NCDC_REPORT },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-beraia-georgia-cancer-incidence-2015-2019-ctarc-2026", name: "Incidence of common cancers in Georgia, 2015 to 2019, from the national cancer registry",
    journal: "Cancer Treatment and Research Communications", year: 2026, doi: "10.1016/j.ctarc.2026.101267", pmid: "42258958", authors: "Beraia A, Znaor A, Anda EE, Gamkrelidze A, Borch KB", paperType: "observational", participants: 50098,
    tldr: "Georgia's national registry counted 50,098 cancers in 2015 to 2019, other than non-melanoma skin cancer; lung and prostate cancer led in men, and breast and thyroid cancer in women.",
    summary: "Published as \"Incidence of common cancers in Georgia in 2015-2019: A national cancer registry study\". The authors, from UiT The Arctic University of Norway, IARC and the National Center for Disease Control and Public Health, used all registered cancer cases in the Georgia National Cancer Registry, excluding non-melanoma skin cancer, with population data from the National Statistics Office, and calculated age-standardised rates per 100,000 using the WHO world standard population.",
    findings: [
      "50,098 cancers were diagnosed in 2015 to 2019: 21,802 in men (age-standardised rate 175.5 per 100,000) and 28,296 in women (192.8 per 100,000).",
      "In men the commonest were lung (16%, 28.0 per 100,000), prostate (14%, 22.0), bladder (10%, 16.3), colorectal (10%, 16.2) and larynx (6%, 10.9).",
      "In women the commonest were breast (34%, 64.5 per 100,000), thyroid (14%, 34.3), colorectal (7%, 10.3), cervix (6%, 12.6) and corpus uteri (6%, 11.4).",
    ],
    whatItMeans: "The authors call this the first comprehensive evaluation of cancer incidence in Georgia. Overall incidence was lower than IARC's 2022 estimate for the 27 EU countries, which they suggest may reflect differences in health care, screening uptake or reporting accuracy.",
    caveats: ["Registry data from its first five years, while coverage and quality were still improving.", "Excludes non-melanoma skin cancer, so totals are not directly comparable with figures that include it."],
    institutions: ["georgia-population-cancer-registry", "ncdc-georgia", "iarc"], cancers: ["breast-cancer", "thyroid", "lung-cancer", "prostate", "colorectal"],
    links: [doi("10.1016/j.ctarc.2026.101267", "Cancer Treat Res Commun 2026"), pubmed("42258958")] }),

  p({ id: "paper-batavani-georgia-early-late-detection-canep-2022", name: "Early and late detection of cancer in Georgia: stage at diagnosis in the national registry, 2018 to 2019",
    journal: "Cancer Epidemiology", year: 2022, doi: "10.1016/j.canep.2022.102216", pmid: "35841760", authors: "Batavani T, Kereselidze M, Chikhladze N, Pitskhelauri N", paperType: "observational",
    tldr: "About 57% of cancers in Georgia were of types that can be found early, and at least 35.7% of these in men and 44.2% in women were; most stage I thyroid cancers were small papillary tumours, raising the possibility of overdiagnosis.",
    summary: "Published as \"Early and late detection of cancer in Georgia: Evidence from a population-based cancer registry, 2018-2019\". A descriptive analysis of stage distribution in Georgia's population-based cancer registry for 1 January 2018 to 31 December 2019, by researchers at Ivane Javakhishvili Tbilisi State University, as a first step towards finding where early detection needs to improve.",
    findings: [
      "Around 57% of cancers in men and 56% in women were amenable to early detection; at least 35.7% of these in men and 44.2% in women were detected early.",
      "15.2% of male and 35.3% of female cancer patients met the age criteria for the respective screening programmes.",
      "At least 83.8% of thyroid cancers in women were diagnosed at stage I, making up 50.7% of all stage I cancers in women; at least 42.4% of these stage I thyroid cancers in women were papillary microcarcinomas.",
    ],
    whatItMeans: "The potential of early detection is underused in Georgia, and the large share of small thyroid cancers among early-stage cancers may reflect overdiagnosis, which the authors say needs further study.",
    caveats: ["Descriptive; stage was unknown for part of the registry's cases.", "Two years of data."],
    institutions: ["georgia-population-cancer-registry"], cancers: ["thyroid", "breast-cancer", "colorectal", "lung-cancer"],
    links: [doi("10.1016/j.canep.2022.102216", "Cancer Epidemiol 2022"), pubmed("35841760")] }),

  p({ id: "paper-khuntsaria-hpv-vaccination-cervical-georgia-bmcph-2025", name: "HPV vaccination and cervical cancer control in Georgia: national trends and projections",
    journal: "BMC Public Health", year: 2025, doi: "10.1186/s12889-025-25958-1", pmid: "41390714", authors: "Khuntsaria I, Gachechiladze K, Lipartia E, et al.", paperType: "observational",
    tldr: "In 2022 only 38% of eligible adolescents in Georgia had a first HPV vaccine dose and 26% a second, and the number of women screened for cervical cancer fell from 26,348 in 2016 to 13,890 in 2022.",
    summary: "Published as \"HPV vaccination and cervical cancer control in Georgia: evidence and projections\". The authors analysed national data from 2016 to 2022 on HPV vaccination, cervical screening and cervical cancer incidence, and used scenario models to project the effect of 60%, 80% and 90% vaccination coverage through 2032. They give about 330 new cervical cancers and 200 deaths a year in Georgia.",
    findings: [
      "In 2022, 38% of eligible adolescents received the first HPV vaccine dose and 26% completed the second.",
      "Uptake varied from 83% in Adjara to 14% in Shida Kartli, and was consistently lower in rural than urban areas.",
      "Screening participation fell from 26,348 women in 2016 (4.4% of those eligible) to 13,890 in 2022 (2.3%); 90% vaccine coverage could prevent up to 276 cervical cancers over the next decade.",
    ],
    whatItMeans: "Cervical cancer prevention in Georgia is held back by low HPV vaccine uptake and falling screening; the authors argue for coverage of at least 80% alongside screening.",
    caveats: ["Projections depend on model assumptions.", "The association between vaccination coverage and incidence was not statistically significant over this short period."],
    cancers: ["cervical"],
    links: [doi("10.1186/s12889-025-25958-1", "BMC Public Health 2025"), pubmed("41390714")] }),

  p({ id: "paper-khoperia-liver-cancer-hcv-elimination-georgia-plosone-2026", name: "Primary liver cancer in Georgia in the first seven years of the Hepatitis C Elimination Program",
    journal: "PLOS ONE", year: 2026, doi: "10.1371/journal.pone.0347697", pmid: "42048314", authors: "Khoperia A, Gawel SH, Bedrava J, et al.", paperType: "real-world", participants: 1734,
    tldr: "Linking Georgia's cancer registry, death records and hepatitis C programme data for 2015 to 2022 showed that most people with liver cancer and active hepatitis C had already been treated for it, many more than a year before the cancer was found.",
    summary: "Published as \"Primary liver cancer in Georgia: Seven years' experience following the launch of the Hepatitis C Elimination Program, 2015-2022\". Georgia launched a national Hepatitis C Elimination Program in 2015. The authors, led from the National Center for Disease Control and Public Health, linked the Georgian Cancer Registry, the national vital registration system and the elimination programme's databases to describe adult primary liver cancers diagnosed from January 2015 to December 2022.",
    findings: [
      "Of 1,734 primary liver cancers, 72.0% were in men (median age 63); two thirds were stage 3 or 4 and 80.2% of patients had died by the end of 2022.",
      "Testing for hepatitis C among liver cancer patients rose from 14.0% in 2015 to 92.8% in 2022; 56.5% of those tested were antibody positive and 654 had active infection.",
      "Of the 654, 75.7% started hepatitis C treatment, 71.7% of them more than a year before the liver cancer diagnosis.",
    ],
    whatItMeans: "Curing hepatitis C does not remove liver cancer risk for people who already have cirrhosis; the authors call for routine follow-up of treated cirrhotic patients so liver cancer is found earlier.",
    caveats: ["Descriptive; registry linkage depends on matching quality.", "Not everyone with liver cancer was tested for hepatitis C, especially in the early years."],
    institutions: ["ncdc-georgia", "georgia-population-cancer-registry"], cancers: ["hcc"],
    links: [doi("10.1371/journal.pone.0347697", "PLOS ONE 2026"), pubmed("42048314")] }),

  p({ id: "paper-surguladze-hcv-attributable-liver-cancer-georgia-bmcid-2024", name: "How much liver cancer in Georgia is due to hepatitis C: a case-control study, 2015 to 2019",
    journal: "BMC Infectious Diseases", year: 2024, doi: "10.1186/s12879-024-09916-7", pmid: "39333949", authors: "Surguladze S, Armstrong PA, Beckett GA, et al.", paperType: "observational", participants: 3874,
    tldr: "Using hepatitis C programme and cancer registry data, people in Georgia with hepatitis C had about 20 times the odds of liver cancer of people without it.",
    summary: "Published as \"Hepatitis C virus attributable liver cancer in the country of Georgia, 2015-2019: a case-control study\". The study used data from Georgia's Hepatitis C Elimination Program and the Georgian Cancer Registry for 2015 to 2019, with 496 liver cancer cases and 3,378 controls, to estimate the share of liver cancer attributable to hepatitis C as an indicator of the programme's impact.",
    findings: [
      "The odds of liver cancer were 20.1 times higher (95% CI 15.97 to 25.37) in people with hepatitis C than in those without.",
      "For hepatocellular carcinoma specifically the odds ratio was 16.84 (95% CI 12.01 to 23.83).",
      "Much of the liver cancer in infected people was attributable to hepatitis C, but in the general population hepatitis C alone did not explain the burden.",
    ],
    whatItMeans: "Hepatitis C is a major driver of liver cancer in Georgia, and the authors call for closer liver cancer monitoring of people with hepatitis C.",
    caveats: ["Case-control design with programme data; other causes such as hepatitis B and alcohol were not the focus."],
    institutions: ["ncdc-georgia", "georgia-population-cancer-registry"], cancers: ["hcc"],
    links: [doi("10.1186/s12879-024-09916-7", "BMC Infect Dis 2024"), pubmed("39333949")] }),

  p({ id: "paper-kakhniashvili-cancer-financial-burden-georgia-cancer-control-2025", name: "The financial burden of cancer on patients and families in Georgia: a multicentre survey",
    journal: "Cancer Control", year: 2025, doi: "10.1177/10732748251359407", pmid: "40621728", authors: "Kakhniashvili T, Kiladze I, Okribelashvili N", paperType: "observational", participants: 181,
    tldr: "Among 181 patients in active cancer treatment at seven Georgian hospitals, 71% had paid out of pocket and 44% had taken out loans for care, most often to pay for diagnostic tests.",
    summary: "Published as \"The Cancer Burden on Patients and Their Families in a Resource-Restricted Country: A Cross-Sectional Survey Study From Georgia\". A multicentre questionnaire and clinical data study of 181 patients undergoing active cancer treatment across seven tertiary hospitals, which the authors describe as the first research in Georgia on the economic burden of cancer care.",
    findings: [
      "135 of 181 patients (74.5%) reported a moderate or heavy economic burden from cancer care.",
      "129 (71.3%) incurred out-of-pocket costs and 44.2% took out loans, 10 of them more than once; the commonest reason for debt (76 patients) was to cover diagnostic procedures.",
      "Only 57 (31.5%) had stable employment at the time of the survey, and a third of those employed or self-employed had work problems because of cancer.",
    ],
    whatItMeans: "Cancer care in Georgia brings heavy out-of-pocket costs for most patients, and diagnosis is where many borrow; the authors call for better access to financial assistance.",
    caveats: ["181 patients at tertiary hospitals; may not represent all patients.", "Self-reported burden."],
    cancers: ["breast-cancer", "lung-cancer", "colorectal"],
    links: [doi("10.1177/10732748251359407", "Cancer Control 2025"), pubmed("40621728")] }),

  p({ id: "paper-irzaldy-breast-screening-georgia-vhri-2024", name: "Choosing a cost-effective breast cancer screening strategy for Georgia",
    journal: "Value in Health Regional Issues", year: 2024, doi: "10.1016/j.vhri.2023.09.002", pmid: "37992568", authors: "Irzaldy A, Gvamichava R, Beruchashvili T, et al.", paperType: "methods",
    tldr: "A microsimulation adapted to Georgia found that its current breast screening, mammography every two years from 40 to 70 with clinical examination, costs more per quality-adjusted life year than the threshold used; mammography every three years from 45 to 66 was the optimal choice.",
    summary: "The MISCAN-Breast microsimulation model was adapted to Georgia to evaluate 736 mammography screening strategies varying interval, starting and stopping ages and whether clinical breast examination was added, from a healthcare perspective with 3% discounting.",
    findings: [
      "Adding clinical breast examination to mammography raised costs substantially with minimal gain in outcomes.",
      "The current strategy, biennial mammography from 40 to 70 with clinical examination, cost €16,218 per QALY, above the willingness-to-pay threshold of €12,720.",
      "The optimal strategy was triennial mammography-only screening from 45 to 66, at €12,507 per QALY.",
    ],
    whatItMeans: "Switching to a less frequent, mammography-only programme could let Georgia screen more eligible women within the same capacity.",
    caveats: ["Model-based; costs were a major uncertainty explored in sensitivity analyses."],
    cancers: ["breast-cancer"], related: ["mammography"],
    links: [doi("10.1016/j.vhri.2023.09.002", "Value Health Reg Issues 2024"), pubmed("37992568")] }),

  p({ id: "paper-topuridze-phc-cancer-screening-georgia-ejgp-2025", name: "How Georgia's primary care doctors and nurses recommend and refer for cancer screening, 2023",
    journal: "European Journal of General Practice", year: 2025, doi: "10.1080/13814788.2025.2582292", pmid: "41284371", authors: "Topuridze M, Kareli A, Javashvili G, et al.", paperType: "observational", participants: 2958,
    tldr: "With cancer screening uptake in Georgia at 13%, a survey of 2,958 primary care doctors and nurses found nearly all said they refer for screening, but two thirds referred only one to five people a week.",
    summary: "Published as \"Primary healthcare providers' knowledge, attitudes, and practices regarding cancer screening recommendation and referral in Georgia, 2023\". A cross-sectional survey in November 2023 of doctors and nurses in primary care, two thirds of them in rural practice; the first author is in the National Center for Disease Control and Public Health's health promotion division, and co-authors are at Tbilisi State Medical University.",
    findings: [
      "The authors give cancer screening uptake in Georgia as 13%.",
      "98% reported recommending and referring patients for screening, but 64.7% did so for only 1 to 5 patients a week and 12% for none.",
      "Higher referral was linked to being a family doctor, working in Tbilisi, comprehensive screening training, adequate infrastructure, public promotion, and seeing screening as part of the role.",
    ],
    whatItMeans: "Primary care believes in screening but refers few people; the authors call for training, public awareness and infrastructure.",
    caveats: ["Self-reported practice."],
    institutions: ["ncdc-georgia"], cancers: ["breast-cancer", "cervical", "colorectal"],
    links: [doi("10.1080/13814788.2025.2582292", "Eur J Gen Pract 2025"), pubmed("41284371")] }),

  p({ id: "paper-kiguradze-hpv-test-vs-pap-tbilisi-cejph-2024", name: "HPV testing compared with the Pap test for cervical screening in Tbilisi",
    journal: "Central European Journal of Public Health", year: 2024, doi: "10.21101/cejph.a8014", pmid: "39352091", authors: "Kiguradze E, Skhirtladze T, Chkhartishvili N, et al.", paperType: "observational", participants: 1000,
    tldr: "In 1,000 women screened in Tbilisi, an HPV test with HPV16/18 genotyping and liquid-based cytology triage found high-grade precancer more accurately than the conventional Pap test.",
    summary: "Published as \"Comparison of cervical cancer screening models based on Pap and HPV tests in Tbilisi, Georgia\". A prospective cross-sectional study in which 1,000 women aged 30 to 60 had both a conventional Pap smear and a high-risk HPV test (Roche Cobas) at one visit; women with any positive result were referred for further evaluation.",
    findings: [
      "HPV testing with HPV16/18 genotyping and liquid-based cytology triage had a sensitivity of 76.9%, specificity of 71.6% and positive predictive value of 34.5% for CIN2+, higher than the conventional Pap test.",
      "The authors conclude it is the more effective primary screening method.",
    ],
    whatItMeans: "The authors say these results should be the basis for Georgia's move from cytology to HPV testing in its cervical screening programme.",
    caveats: ["One city; women recruited during routine screening."],
    cancers: ["cervical"], related: ["hpv-testing"],
    links: [doi("10.21101/cejph.a8014", "Cent Eur J Public Health 2024"), pubmed("39352091")] }),
];

/** Records behind /countries/ge/ (wave 10). */
export const recordsGE: EntityInput[] = [...institutions, ...papers];

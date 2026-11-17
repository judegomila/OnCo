import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Eritrea: the two bodies and six papers behind /countries/er/ (wave 14) that the corpus did not hold. The Ministry of
 * Health and Orotta National Referral Hospital already exist in
 * src/data/institutions/countries-2026-11-east-southern-africa.ts and are linked, not repeated. Every source was read
 * as raw text on 16 November 2026: the six papers were resolved by DOI through Europe PMC and their abstracts read,
 * with the open full text (Europe PMC XML) read for the statements about the laboratory; the regulator is described
 * from WHO's Regional Office for Africa (news page of 31 July 2019), WHO's Country Planning Cycle Database list of
 * Eritrean legislation, and the abstract of a 2021 paper by the regulator's own staff (resolved through Europe PMC).
 * Figures in `findings` are the abstracts' own.
 *
 * Inbound links: the six papers list the laboratory, and the leukaemia paper, which has an author from the
 * regulator, lists the regulator. The laboratory lists its papers in keyPapers. Coordinates are the approximate Asmara
 * city point the corpus already uses, not building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const BREAST = "10.1155/2019/8536548";
const GYN = "10.1038/s41598-020-66096-5";
const PROSTATE = "10.1371/journal.pone.0232091";
const CRC = "10.1371/journal.pone.0224045";
const LEUK = "10.1002/cnr2.70203";
const OES = "10.1155/2024/5566016";
const PV = "10.1007/s40264-021-01102-x";
const AFRO_DEVICES = "https://www.afro.who.int/countries/eritrea/news/eritrea-consensus-building-workshop-medical-devices-registration-guideline";
const WHO_LEGISLATION = "https://extranet.who.int/cpcd/health-legislation/countries/eri/legislative-instruments";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "eritrea-national-health-laboratory", name: "National Health Laboratory, Eritrea", aka: ["Eritrean National Health Laboratory", "ENHL", "NHL Asmara"],
    city: "Asmara", country: "ER", lat: 15.339, lng: 38.933, institutionType: "research-institute",
    tldr: "A Ministry of Health laboratory in Asmara. Papers by its staff describe it as having the country's only histopathology and cytology laboratory, so its records are the nearest thing Eritrea has to a count of confirmed cancers.",
    summary: "The National Health Laboratory in Asmara is a Ministry of Health laboratory. A 2020 paper in Scientific Reports by its pathology staff says it serves as a referral facility for all hospitals in Eritrea and has the only histopathology and cytology laboratory in the country, so that all tissue specimens from patients in Eritrea can be presumed to be processed there; a 2024 paper adds that it has the only pathologists in the country. Its staff have published laboratory-based counts of breast, gynaecological, colorectal, prostate and oesophageal cancer and of leukaemia. The breast cancer paper reports 9,403 pathology cases recorded from 2011 to 2017, entered into CanReg5, the cancer registry software of the International Agency for Research on Cancer; the prostate paper reports 10,053 biopsy specimens received from 2011 to 2018. The 2025 leukaemia paper, by staff of the laboratory and of Orotta hospital, says leukaemia is classified at their centre by microscope alone, because flow cytometry, immunohistochemistry and molecular testing are not available. These are counts of cancers confirmed in a laboratory, not a population-based cancer registry, and the authors themselves say they may undercount. The prostate paper's 128 cancers include cases diagnosed clinically; it gives 36.7% as verified under the microscope. OnCo has not read a page published by the laboratory itself. The coordinates are an approximate city point for Asmara.",
    programs: ["Histopathology and cytology for all hospitals in Eritrea", "Laboratory-based cancer counts, 2010 to 2021"],
    institutions: ["eritrea-ministry-of-health", "orotta-referral-hospital"],
    cancers: ["breast-cancer", "cervical", "prostate", "colorectal", "esophageal"], related: ["cancer-registries-surveillance"],
    keyPapers: [
      "paper-medhin-breast-cancer-eritrea-ijbc-2019",
      "paper-medhin-gynaecological-cancers-eritrea-scirep-2020",
      "paper-medhin-prostate-cancer-eritrea-plosone-2020",
      "paper-medhin-colorectal-cancer-eritrea-plosone-2019",
      "paper-abraha-leukaemia-eritrea-cancer-reports-2025",
      "paper-mengistu-oesophageal-cancer-eritrea-jce-2024",
    ],
    links: [
      doi(GYN, "Medhin et al., cervical, ovarian and uterine cancer in Eritrea (Sci Rep 2020)"),
      doi(OES, "Mengistu et al., oesophageal cancer in Eritrea (J Cancer Epidemiol 2024)"),
      doi(BREAST, "Medhin et al., breast cancer in Eritrea (Int J Breast Cancer 2019)"),
      doi(LEUK, "Abraha et al., leukaemia in Eritrea 2010 to 2020 (Cancer Rep 2025)"),
    ] }),

  i({ id: "eritrea-nmfa", name: "National Medicines and Food Administration, Eritrea (NMFA)", aka: ["NMFA", "National Medicines and Food Administration", "National Food and Medicine Administration"],
    city: "Asmara", country: "ER", lat: 15.339, lng: 38.933, institutionType: "government",
    tldr: "The unit of Eritrea's Ministry of Health that regulates medicines and medical devices. It receives registration dossiers for medical devices and has recalled substandard or falsified products found through the Eritrean Pharmacovigilance Centre's monitoring.",
    summary: "WHO's Regional Office for Africa, reporting a June 2019 workshop on a medical devices registration guideline, describes the National Medicines and Food Administration as the unit to which applicants submit product dossiers before any procurement. A 2021 paper in Drug Safety by the administration's own staff, who give it as part of the Ministry of Health, says that monitoring through the Eritrean Pharmacovigilance Centre found about 55 medical products that were substandard or falsified, which the administration recalled from the Eritrean market, and that the centre had reached maturity level three on a WHO rapid benchmarking assessment; that statement is the authors' and concerns the monitoring of medicine safety, not the regulator as a whole. WHO's August 2026 list of regulators operating at maturity level 3 or 4 does not include Eritrea. WHO's Country Planning Cycle Database lists Proclamation No 36/1993, to control drugs, medical supplies and sanitary items, among Eritrea's health laws; OnCo has not read its text. OnCo found no website for the administration and no published rules on how cancer medicines are registered or clinical trials authorised. The coordinates are an approximate city point for Asmara.",
    programs: ["Registration of medical devices", "Recall of substandard or falsified medical products"],
    institutions: ["eritrea-ministry-of-health", "who"],
    links: [
      { label: "WHO Regional Office for Africa: consensus building workshop on the medical devices registration guideline (31 July 2019)", url: AFRO_DEVICES },
      doi(PV, "Russom et al., the Eritrean pharmacovigilance system (Drug Saf 2021)"),
      { label: "WHO Country Planning Cycle Database: Eritrea, main legislative instruments", url: WHO_LEGISLATION },
      { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML3 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-medhin-breast-cancer-eritrea-ijbc-2019", name: "Breast cancer in Eritrea: National Health Laboratory pathology records, 2011 to 2017",
    journal: "International Journal of Breast Cancer", year: 2019, doi: BREAST, pmid: "31355003", authors: "Medhin LB, Tekle LA, Fikadu DT, et al.", paperType: "observational", participants: 1497,
    tldr: "Eritrea's National Health Laboratory recorded 1,497 breast specimens from 2011 to 2017, of which 348 were cancers. The authors think the low rate may reflect low awareness and highly centralised screening and diagnosis.",
    summary: "Published as \"Incidence of Breast Cancer in Eritrea: A Retrospective Study from 2011 to 2017\". A retrospective study of breast cases recorded by the pathology department of the National Health Laboratory in Asmara, which the paper describes as the only pathology laboratory in Eritrea. Records were entered and analysed in CanReg5, and rates were calculated against a 2014 population estimate.",
    findings: [
      "9,403 pathology cases of all kinds were recorded from 2011 to 2017; 1,497 were breast cases confirmed by cytology or histology.",
      "1,149 breast cases were benign and 348 malignant; 1,447 (96.7%) were in women, of which 336 were malignant.",
      "The age-standardised incidence was 3.3 per 100,000 in women and 0.2 per 100,000 in men.",
    ],
    whatItMeans: "This is a count of breast cancers that reached what the paper calls the only pathology laboratory in Eritrea, about 50 a year, far below the 596 a year in IARC's modelled estimate for 2024. The authors attribute the low rate to low awareness and to screening and diagnosis being highly centralised.",
    caveats: ["Laboratory-confirmed cases only; women never biopsied are not counted.", "Rates use a single 2014 population estimate for all seven years."],
    cancers: ["breast-cancer"], related: ["cancer-registries-surveillance"],
    institutions: ["eritrea-national-health-laboratory", "eritrea-ministry-of-health"],
    links: [doi(BREAST, "Int J Breast Cancer 2019"), pubmed("31355003")] }),

  p({ id: "paper-medhin-gynaecological-cancers-eritrea-scirep-2020", name: "Cervical, ovarian and uterine cancer in Eritrea: National Health Laboratory data, 2011 to 2017",
    journal: "Scientific Reports", year: 2020, doi: GYN, pmid: "32499531", authors: "Medhin LB, Tekle LA, Achila OO, Said S.", paperType: "observational", participants: 883,
    tldr: "From 2011 to 2017 Eritrea's National Health Laboratory recorded 883 tumours of the cervix, ovary and uterus, 269 of them cancers. The cervical cancer rate was 8.7 per 100,000 women, which the authors call low for the region.",
    summary: "Published as \"Incidence of Cervical, Ovarian and Uterine Cancer in Eritrea: Data from the National Health Laboratory, 2011-2017\". A retrospective analysis of all tumour-positive cases from the cervix, ovary and uterus in the laboratory's pathology database. The full text says the laboratory serves as a referral facility for all hospitals in Eritrea and has the only histopathology and cytology laboratory in the country.",
    findings: [
      "883 cases were reported: 269 malignant and 614 benign.",
      "Age-standardised rates per 100,000 women were 8.7 for cervical, 6.75 for ovarian and 5.14 for uterine cancer, 19.32 for the three together.",
      "Incidence was largely stable over the period, with no significant change.",
    ],
    whatItMeans: "The laboratory's cervical cancer rate is about half IARC's modelled rate for Eritrea. The authors do not read this as little disease: they call for research into the true burden and for a population-based cancer registry.",
    caveats: ["Laboratory-confirmed cases only.", "Cases diagnosed clinically and never biopsied are missing."],
    cancers: ["cervical", "ovarian", "endometrial"], related: ["cancer-registries-surveillance"],
    institutions: ["eritrea-national-health-laboratory", "eritrea-ministry-of-health"],
    links: [doi(GYN, "Sci Rep 2020"), pubmed("32499531")] }),

  p({ id: "paper-medhin-prostate-cancer-eritrea-plosone-2020", name: "Prostate cancer in Eritrea: laboratory and urology department records, 2011 to 2018",
    journal: "PLoS One", year: 2020, doi: PROSTATE, pmid: "32324838", authors: "Medhin LB, Achila OO, Syum BE, et al.", paperType: "observational", participants: 1721,
    tldr: "Records from Eritrea's National Health Laboratory and the urology departments of two Asmara hospitals held 128 prostate cancers from 2011 to 2018. The authors conclude that earlier reports underestimated prostate cancer in Eritrea.",
    summary: "Published as \"Incidence of prostate cancer in Eritrea: Data from the National Health Laboratory, Orotta Referral Hospital and Sembel Hospital 2011-2018\". A retrospective study of all incident cases in the laboratory's pathology database and the urology departments of Orotta Referral Hospital and Sembel Hospital. The full text notes that only a small fraction of cases were referred for confirmation by pathology and that most patients were diagnosed with advanced disease on clinical grounds.",
    findings: [
      "1,721 cases were reported: 1,593 (92.5%) benign enlargement of the prostate and 128 (7.5%) prostate cancer.",
      "The mean age of men with prostate cancer was 73.5 years (range 54 to 98).",
      "The age-standardised rate over the whole period was 30.26 per 100,000, or 3.78 per 100,000 a year, with no significant trend.",
    ],
    whatItMeans: "About 16 prostate cancers a year were recorded, against 184 a year in IARC's modelled estimate for 2024. The authors call for a population-based cancer registry and for better screening, diagnosis and management.",
    caveats: ["Few cases had tissue confirmation.", "Sparsely populated zones contributed very few cases."],
    cancers: ["prostate"], related: ["cancer-registries-surveillance"],
    institutions: ["eritrea-national-health-laboratory", "orotta-referral-hospital"],
    links: [doi(PROSTATE, "PLoS One 2020"), pubmed("32324838")] }),

  p({ id: "paper-medhin-colorectal-cancer-eritrea-plosone-2019", name: "Colorectal cancer in Eritrea: National Health Laboratory data, 2011 to 2017",
    journal: "PLoS One", year: 2019, doi: CRC, pmid: "31721763", authors: "Medhin LB, Achila OO, Abrham AT, et al.", paperType: "observational", participants: 94,
    tldr: "Eritrea's National Health Laboratory confirmed 94 colorectal cancers from 2011 to 2017. The authors call the incidence relatively low, note that many patients were under 50, and say the study may underestimate the disease.",
    summary: "Published as \"Incidence of colorectal cancer in Eritrea: Data from the National Health Laboratory, 2011-2017\". A retrospective analysis of records captured at the National Health Laboratory in Asmara. Of 241 colorectal cases in the database, 94 confirmed cancers entered the final analysis.",
    findings: [
      "94 confirmed cases were analysed; the mean age was 57.6 years (range 19 to 90), with 58 men and 36 women.",
      "Cancers of the rectum and of the colon were equally common (47 each).",
      "The authors report that a significant number of patients were younger than 50.",
    ],
    whatItMeans: "The laboratory saw far fewer colorectal cancers than the 161 a year in IARC's modelled estimate for 2024. The authors say plainly that their count may underestimate the incidence.",
    caveats: ["Laboratory-confirmed cases only.", "The abstract gives a cumulative age-standardised rate of 9.97 per 100,000 for the seven years, and yearly rates from 0.97 to 2.21.", "The abstract's average of 18.8 patients a year does not match 94 cases over seven years, about 13 a year, so it is not used here."],
    cancers: ["colorectal"], related: ["cancer-registries-surveillance"],
    institutions: ["eritrea-national-health-laboratory", "eritrea-ministry-of-health"],
    links: [doi(CRC, "PLoS One 2019"), pubmed("31721763")] }),

  p({ id: "paper-abraha-leukaemia-eritrea-cancer-reports-2025", name: "Leukaemia in Eritrea, 2010 to 2020: laboratory records from Asmara",
    journal: "Cancer Reports", year: 2025, doi: LEUK, pmid: "40524139", authors: "Abraha DM, Mengistu ST, Ghirmay E, et al.", paperType: "observational", participants: 372,
    tldr: "Laboratory logbooks at Eritrea's National Health Laboratory and Orotta hospital recorded 372 confirmed leukaemias from 2010 to 2020. The authors believe the true number is higher and call for a national cancer registry.",
    summary: "Published as \"Unveiling the Burden of Leukemia in Eritrea (2010-2020): Chronic Leukemia Stability, Rising ALL Incidence, and the Enigma of CML in a Low-Resource Setting\". An audit of leukaemia cases in the laboratory logbooks of the National Health Laboratory and Orotta Referral and Teaching Hospital, by authors from both and from the national medicines regulator. The full text says leukaemia is classified by microscope alone at their centre, because flow cytometry, immunohistochemistry and molecular testing are not available.",
    findings: [
      "372 confirmed cases; the median age was 48 years (range 2 to 91), with 1.3 men for each woman.",
      "The crude incidence over the period was 9.22 per 100,000; chronic myeloid leukaemia was the commonest type, then chronic lymphocytic, acute lymphoblastic and acute myeloid leukaemia.",
      "The burden was stable overall, with an upward trend in acute lymphoblastic leukaemia.",
    ],
    whatItMeans: "It shows what leukaemia diagnosis in Eritrea rests on: two laboratories in Asmara and a microscope. The authors ask for diagnostic services in other regions, a national cancer registry and more research.",
    caveats: ["Cases are counted over eleven years, so the rates are cumulative, not annual.", "Leukaemia types were assigned by microscope alone, without flow cytometry, immunohistochemistry or molecular testing.", "The authors expect underreporting and underdiagnosis."],
    cancers: ["cml", "cll", "all-leukemia", "aml"], related: ["cancer-registries-surveillance"],
    institutions: ["eritrea-national-health-laboratory", "orotta-referral-hospital", "eritrea-nmfa"],
    links: [doi(LEUK, "Cancer Rep 2025"), pubmed("40524139")] }),

  p({ id: "paper-mengistu-oesophageal-cancer-eritrea-jce-2024", name: "Oesophageal cancer in Eritrea, 2011 to 2021: more women than men",
    journal: "Journal of Cancer Epidemiology", year: 2024, doi: OES, pmid: "38962101", authors: "Mengistu ST, Kesete Y, Achila OO, et al.", paperType: "observational", participants: 189,
    tldr: "Among 189 people whose oesophageal samples reached Eritrea's National Health Laboratory from 2011 to 2021, 134 were women. The authors describe oesophageal cancer in Eritrea as in large part a women's disease.",
    summary: "Published as \"High Incidence of Esophageal Cancer in Women in Eritrea and Its Potential Link to Low Age at Menopause: Evidence from a 10-Year Retrospective Data Analysis\". A retrospective study of the logbook kept at the National Health Laboratory, which the full text says has the country's only histopathology laboratory and its only pathologists.",
    findings: [
      "189 patients' samples were evaluated: 134 (70.9%) from women and 55 (29.1%) from men.",
      "Of 155 patients with oesophageal cancer, 111 (71.6%) had squamous cell carcinoma and 44 (28.4%) adenocarcinoma; the median age was 60 years.",
      "Among patients with squamous cell carcinoma aged 40 to 49 there were 10.5 women for each man.",
    ],
    whatItMeans: "In most of the world oesophageal cancer is commoner in men. The authors suggest exposures that differ by sex and call for research into risk factors in Eritrea; the link to age at menopause in the title is their hypothesis, not a finding of cause.",
    caveats: ["About 14 confirmed cancers a year (155 over eleven years), from one laboratory.", "The authors believe underdiagnosis and underreporting were severe in some sub-zones, and say tumour types may have been misclassified."],
    cancers: ["esophageal"], related: ["cancer-registries-surveillance"],
    institutions: ["eritrea-national-health-laboratory", "eritrea-ministry-of-health"],
    links: [doi(OES, "J Cancer Epidemiol 2024"), pubmed("38962101")] }),
];

/** Records behind /countries/er/ (wave 14). */
export const recordsER: EntityInput[] = [...institutions, ...papers];

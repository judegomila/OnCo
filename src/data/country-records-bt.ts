import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Bhutan: the public bodies and papers behind /countries/bt/ (wave 15) that the corpus did not hold. Each was written
 * from its own primary source, read raw on 16 November 2026: the Bhutan Cancer Control Strategy 2019 to 2025 (PDF
 * text, ICCP portal), the Ministry of Health's registry report for 2019 to 2022 (PDF text), the Bhutan Food and Drug
 * Authority's own site, WHO's list of regulators at maturity level 3 and 4 (August 2026) and its list of authorities
 * in the collaborative registration procedure (23 August 2023). DOIs were resolved through Europe PMC; figures in
 * `findings` are from the indexed abstracts, and for the registry paper, the Lancet review and the colorectal cancer
 * study also from the open-access full text served by Europe PMC.
 *
 * The national referral hospital, the registry and the Bhutan Cancer Society already have records in
 * src/data/institutions/countries-2026-11-asia-pacific.ts and are linked, not repeated. Inbound links: the Ministry
 * links the Food and Drug Authority and lists the five papers in keyPapers; the Authority links the Ministry back.
 * Coordinates are an approximate Thimphu city point, not building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const STRATEGY = "https://www.iccp-portal.org/sites/default/files/plans/BTN_B5_s21_Bhutan%20Cancer%20Control%20Strategy%20Final.pdf";
const PBCR_REPORT = "https://moh.gov.bt/wp-content/uploads/2025/07/A4_Final_PBCR-19-22-report.pdf";
const BFDA = "https://bfda.gov.bt/";
const BFDA_BACKGROUND = "https://bfda.gov.bt/background/";
const WHO_ML = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const WHO_CRP = "https://extranet.who.int/prequal/sites/default/files/document_files/Country_List-23August2023.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "bhutan-ministry-of-health", name: "Ministry of Health, Bhutan", aka: ["Ministry of Health, Royal Government of Bhutan", "National Cancer Control Program, Bhutan"],
    city: "Thimphu", country: "BT", lat: 27.47, lng: 89.64, institutionType: "government", website: "https://moh.gov.bt",
    tldr: "Bhutan's health ministry, which wrote the country's cancer control strategy for 2019 to 2025 and set up a national cancer control programme in 2020. It ran the screening of the population for stomach, cervical and breast cancer from 2020 to 2023 and publishes the national cancer registry's reports.",
    summary: "The Ministry published the Bhutan Cancer Control Strategy 2019 to 2025 (read as PDF text from the ICCP portal), which its foreword by the health minister calls the first for the country. The strategy records that there was no dedicated national cancer control programme, full-time staff or budget when it was written, and sets six objectives: governance, prevention, screening and early diagnosis, treatment at all levels of care, palliative care, and surveillance and research. Its 2025 targets include 70% of eligible women screened for cervical cancer within three years and half of cancer patients receiving palliative care. A 2024 review in The Lancet Regional Health Southeast Asia says the Ministry established the National Cancer Control Program in 2020 and ran a time-bound screening programme for gastric, cervical and breast cancer from 2020 to 2023 under the Health Flagship Programme, with a budget of 1,109.572 million ngultrum. The Ministry's site carries the population-based registry's report for 2019 to 2022. The coordinates on this record are an approximate Thimphu city point.",
    programs: ["Bhutan Cancer Control Strategy 2019 to 2025", "National Cancer Control Program (from 2020)", "Health Flagship Programme screening for gastric, cervical and breast cancer (2020 to 2023)", "National HPV vaccination programme (from 2010)"],
    institutions: ["jdwnrh-bhutan", "bhutan-population-based-cancer-registry", "bhutan-food-and-drug-authority", "bhutan-cancer-society", "who"],
    cancers: ["gastric", "cervical", "breast-cancer"], related: ["global-oncology-access"],
    keyPapers: [
      "paper-tshering-cancer-pattern-bhutan-ijc-2026",
      "paper-dorji-cancer-screening-care-bhutan-lansea-2024",
      "paper-dorji-hpv-vaccination-programme-bhutan-vaccine-2015",
      "paper-baussano-reach-bhutan-hpv-self-sampling-bmjopen-2017",
      "paper-foo-colorectal-cancer-health-system-bhutan-cam4-2026",
    ],
    links: [
      { label: "Ministry of Health, Bhutan", url: "https://moh.gov.bt/" },
      { label: "Bhutan Cancer Control Strategy 2019 to 2025 (PDF, ICCP portal)", url: STRATEGY },
      { label: "Cancer Incidence and Mortality in Bhutan 2019 to 2022, registry report (PDF)", url: PBCR_REPORT },
      doi("10.1016/j.lansea.2024.100370", "Population-level cancer screening and cancer care in Bhutan, 2020 to 2023 (Lancet Reg Health Southeast Asia 2024)"),
    ] }),

  i({ id: "bhutan-food-and-drug-authority", name: "Bhutan Food and Drug Authority", aka: ["BFDA", "Drug Regulatory Authority of Bhutan"],
    city: "Thimphu", country: "BT", lat: 27.47, lng: 89.64, institutionType: "government", website: BFDA,
    tldr: "Bhutan's regulator of medicines, food and controlled substances. It was formed by merging the Drug Regulatory Authority with the food and narcotics regulators under the Civil Service Reform Act 2022, and its Medical Product Division regulates medical products.",
    summary: "The authority's own site says the former Drug Regulatory Authority, the Bhutan Agriculture and Food Regulatory Authority and the Bhutan Narcotics Control Authority were merged as the Bhutan Food and Drug Authority in line with the Civil Service Reform Act of Bhutan 2022. The Drug Regulatory Authority had been an autonomous agency instituted under the Medicines Act of the Kingdom of Bhutan 2003, regulating human allopathic medicines, vaccines, veterinary medicines, blood and blood products, traditional medicines, health supplements and medical devices, with product registration and post-marketing surveillance as its core mandate. The home page, read on 16 November 2026, says over 1,200 medical products are registered and gives its address as the Ministry of Health, Kawajangsa, Thimphu. Bhutan is not on WHO's list of regulators operating at maturity level 3 or 4, dated August 2026 and read on 16 November 2026; that is a statement about the list, not a judgement of the authority's work. WHO's list of authorities participating in its collaborative registration procedure, dated 23 August 2023, lists the Drug Regulatory Authority of Bhutan from 16 December 2019. The former authority's own site could not be read because its certificate had expired. The coordinates are an approximate Thimphu city point.",
    programs: ["Registration of medical products (Medical Product Division)", "Post-marketing surveillance of medicines", "Participation in WHO's collaborative registration procedure (from December 2019, as the Drug Regulatory Authority)"],
    institutions: ["bhutan-ministry-of-health", "who"],
    links: [
      { label: "Bhutan Food and Drug Authority", url: BFDA },
      { label: "Bhutan Food and Drug Authority: background", url: BFDA_BACKGROUND },
      { label: "WHO: regulators operating at maturity level 3 and 4 (PDF)", url: WHO_ML },
      { label: "WHO: authorities participating in the collaborative procedure, 23 August 2023 (PDF)", url: WHO_CRP },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-tshering-cancer-pattern-bhutan-ijc-2026", name: "Cancer pattern in Bhutan 2014 to 2022 from the population-based cancer registry",
    journal: "International Journal of Cancer", year: 2026, doi: "10.1002/ijc.70308", pmid: "41634951", authors: "Tshering P, Tshomo U, Chetri M, et al.", paperType: "observational", participants: 5906,
    tldr: "Bhutan's national cancer registry recorded 5,906 new cancers and 2,510 cancer deaths from 2014 to 2022. Stomach cancer led in men and cervical cancer in women, both at higher rates than in most neighbouring registries.",
    summary: "Published as \"Cancer pattern in Bhutan (2014-2022): Findings from population-based cancer registry-A pathway to monitor cancer control activities\". The registry was established at Jigme Dorji Wangchuck National Referral Hospital in 2014 with the support of the Ministry of Health and the IARC Regional Hub at Tata Memorial Centre, Mumbai, and covers the whole population of about 0.7 million. Trained staff collect cases from hospitals and diagnostic facilities into CanReg5; the Regional Hub checks quality and consistency. The paper compares Bhutan's rates with registries in Nepal, Sri Lanka, India, Thailand, the United Kingdom, the United States and Brazil.",
    findings: [
      "5,906 incident cancers in nine years: 2,659 (45%) in men and 3,247 (55%) in women; 87.2% microscopically verified and 3.7% registered from a death certificate only.",
      "Age-adjusted incidence was 88.3 per 100,000 in men and 113.2 in women; age-adjusted mortality was 42.7 and 44.6, from 2,510 recorded deaths.",
      "Leading sites in men: stomach (613 cases, rate 20.9), oesophagus (209), liver (185), lung (160) and rectum (123). In women: cervix (569 cases, rate 19.5), stomach (426), breast (254), thyroid (212) and lung (187).",
      "135 cancers were registered in children aged 0 to 14, 2.3% of all cases.",
    ],
    whatItMeans: "Bhutan's cancer figures now rest on its own national counts, and IARC uses the registry's rates for its estimates. The pattern, with stomach and cervical cancer leading, is what the country's screening programme was built around.",
    caveats: ["The authors say the registry lacks designated space and permanent staff and that medical records are kept by hand.", "Patients who travel abroad for treatment can be missed by the registry."],
    institutions: ["bhutan-population-based-cancer-registry", "jdwnrh-bhutan", "bhutan-ministry-of-health", "tata-memorial", "iarc"], cancers: ["gastric", "cervical", "breast-cancer", "esophageal"], related: ["cancer-registries-surveillance"],
    links: [doi("10.1002/ijc.70308", "Int J Cancer 2026"), pubmed("41634951")] }),

  p({ id: "paper-dorji-cancer-screening-care-bhutan-lansea-2024", name: "Population-level cancer screening and cancer care in Bhutan, 2020 to 2023",
    journal: "The Lancet Regional Health - Southeast Asia", year: 2024, doi: "10.1016/j.lansea.2024.100370", pmid: "38444883", authors: "Dorji T, Wangmo S, Dargay S, et al.", paperType: "review",
    tldr: "A review of how Bhutan screened 91.2% of its eligible population for stomach, cervical and breast cancer between 2020 and 2023. It also describes the limits of cancer treatment in the country, where patients needing radiotherapy are referred to India.",
    summary: "Published as \"Population-level cancer screening and cancer care in Bhutan, 2020-2023: a review\". The authors searched PubMed, Scopus and Web of Science to 30 November 2023 and describe the time-bound screening programme run under the Health Flagship Programme, with a budget of 1,109.572 million ngultrum (13.095 million US dollars). The text states that all levels of health care in Bhutan are free of cost, that the oncology ward at the national referral hospital was established in November 2011, that the Ministry of Health established the National Cancer Control Program in 2020, and that the government refers all cancer patients needing radiation therapy, and selected patients needing chemotherapy, immunotherapy or targeted therapy, to medical centres in India at its own cost.",
    findings: [
      "Of 370,225 people screened for Helicobacter pylori, 32.4% tested positive; among 53,182 who had upper gastrointestinal endoscopy and biopsy, 255 had gastric cancer.",
      "The review's Table 3 gives 116,493 women tested for HPV DNA, of whom 10,749 (9.2%) were positive, with 9,887 colposcopies and 154 cervical cancers found. The abstract words this as 10,749 tested and 9.3% positive.",
      "72,283 women had a clinical breast examination and 845 a mammogram; cancer was detected in 73.",
      "In 2023 the country had no oncologists, radiation specialists, medical physicists or oncology-trained nurses; radiation therapy had been briefly available and was discontinued in August 2021.",
    ],
    whatItMeans: "The review shows a country of under a million people reaching nine in ten eligible people with screening, and it is equally plain that finding cancers early has to be matched by treatment the country can give itself.",
    caveats: ["A narrative review whose authors include Ministry of Health staff, not an independent evaluation.", "It reports cancers found, not outcomes or survival of those screened."],
    institutions: ["bhutan-ministry-of-health", "jdwnrh-bhutan"], cancers: ["gastric", "cervical", "breast-cancer"],
    links: [doi("10.1016/j.lansea.2024.100370", "Lancet Reg Health Southeast Asia 2024"), pubmed("38444883")] }),

  p({ id: "paper-dorji-hpv-vaccination-programme-bhutan-vaccine-2015", name: "Introduction of a national HPV vaccination programme in Bhutan",
    journal: "Vaccine", year: 2015, doi: "10.1016/j.vaccine.2015.05.078", pmid: "26057136", authors: "Dorji T, Tshomo U, Phuntsho S, et al.", paperType: "observational",
    tldr: "Bhutan began national HPV vaccination of girls in 2010, reaching about 99% of 12-year-olds in the first campaign. Coverage fell when delivery moved from schools to health centres and recovered above 90% when it moved back in 2014.",
    summary: "Published as \"Introduction of a National HPV vaccination program into Bhutan\". The Ministry of Health chose routine immunisation of 12-year-old girls with the quadrivalent vaccine and a one-time catch-up campaign for girls aged 13 to 18 in the first year, 2010, with health workers vaccinating in schools and out-of-school girls vaccinated at health facilities. From 2011 the vaccine entered the routine schedule with delivery through health centres.",
    findings: [
      "In the 2010 campaign over 130,000 doses were given; three-dose coverage was estimated at about 99% among 12-year-olds and 89% among girls aged 13 to 18, with no severe adverse events reported.",
      "In the three following years, with delivery mainly through health centres, three-dose coverage fell to 67 to 69%; an individual-level survey in 2012 found 73%.",
      "In 2014, when delivery was switched back to schools, three-dose coverage rose again above 90%.",
    ],
    whatItMeans: "The authors conclude that school-based delivery was clearly superior to health centres for reaching 12-year-olds, and that a broad catch-up campaign in the first year was feasible.",
    caveats: ["Coverage estimates are programme figures checked against one survey.", "The abstract reports coverage, not effects on infection or cancer."],
    institutions: ["bhutan-ministry-of-health"], cancers: ["cervical"],
    links: [doi("10.1016/j.vaccine.2015.05.078", "Vaccine 2015"), pubmed("26057136")] }),

  p({ id: "paper-baussano-reach-bhutan-hpv-self-sampling-bmjopen-2017", name: "REACH-Bhutan: cervical screening in rural Bhutan with HPV testing on self-collected samples",
    journal: "BMJ Open", year: 2017, doi: "10.1136/bmjopen-2017-016309", pmid: "28724543", authors: "Baussano I, Tshering S, Choden T, et al.", paperType: "observational", participants: 2590,
    tldr: "In 2016, women in rural Bhutan were offered a test for the virus that causes cervical cancer on a sample they collected themselves. Seven in ten of those invited took part, and half of them had never been screened before.",
    summary: "Published as \"Cervical cancer screening in rural Bhutan with the careHPV test on self-collected samples: an ongoing cross-sectional, population-based study (REACH-Bhutan)\". The abstract states that the Bhutanese screening programme recommended a Pap smear every three years for women aged 25 to 65, with coverage of 20% to 60%. The study invited 3,648 women aged 30 to 60 from 15 Basic Health Units; samples were tested in a referral laboratory in Thimphu.",
    findings: [
      "2,590 women (median age 41) were enrolled in April and May 2016; participation was 71%, ranging from 31% to 96% between health units.",
      "50% of participants reported no previous screening, from 2% to 72% between health units.",
      "265 women (10%, 95% CI 9% to 11%) tested positive for HPV.",
    ],
    whatItMeans: "Self-collected samples made screening reachable for rural women who had never been screened. The authors add that testing and treatment of precancer need to be brought closer to the remotest villages.",
    caveats: ["Participation fell with age and with travelling time to the health unit.", "A cross-sectional study of 15 health units; it does not report treatment outcomes."],
    institutions: ["jdwnrh-bhutan", "bhutan-ministry-of-health"], cancers: ["cervical"],
    links: [doi("10.1136/bmjopen-2017-016309", "BMJ Open 2017"), pubmed("28724543")] }),

  p({ id: "paper-foo-colorectal-cancer-health-system-bhutan-cam4-2026", name: "Colorectal cancer care in Bhutan: health system gaps and priorities",
    journal: "Cancer Medicine", year: 2026, doi: "10.1002/cam4.72179", pmid: "42613556", authors: "Foo C, Yoezer S, Wangdi TD, et al.", paperType: "observational", participants: 20,
    tldr: "Interviews with twenty clinicians, policymakers, nurses and traditional practitioners in Bhutan found colorectal cancer care concentrated at tertiary hospitals, with staff shortages, medicine shortages and reliance on referral abroad.",
    summary: "Published as \"Colorectal Cancer in Bhutan: Identifying Health System Gaps and Priorities\". A qualitative study using semi-structured interviews analysed against the World Health Organization's health system building blocks, with a review of public documents. The introduction says diagnostic confirmation and limited oncology services are available at the three referral hospitals, that the country has historically lacked medical oncology, haemato-oncology and radiation therapy, and that many patients needing advanced treatment are referred to India.",
    findings: [
      "Workforce shortages due to migration overseas, limited subspecialty training and limited technical expertise in policymaking.",
      "Colorectal cancer services are centralised at tertiary hospitals, creating financial and geographic barriers for patients from remote districts.",
      "Medicine shortages, constrained financing and reliance on overseas referrals limit capacity; chemotherapy medicines are imported, mainly from India.",
    ],
    whatItMeans: "Colorectal cancer was not one of the three cancers Bhutan's screening programme covered, and this study sets out what would have to change in staffing, medicines and referral for it to be treated closer to home.",
    caveats: ["Twenty interviews; findings are perceptions of those interviewed, not measured service data.", "Patients were not interviewed."],
    institutions: ["jdwnrh-bhutan", "bhutan-ministry-of-health"], cancers: ["colorectal"],
    links: [doi("10.1002/cam4.72179", "Cancer Med 2026"), pubmed("42613556")] }),
];

export const recordsBT: EntityInput[] = [...institutions, ...papers];

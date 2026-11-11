import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Nepal: the public bodies and papers behind /countries/np/ (wave 7) that the corpus did not hold. Each was written
 * from its own primary source, read raw on 11 November 2026: the Ministry of Health and Population's Nepal Cancer
 * Control Strategy 2024 to 2030 (PDF text, in Nepali, posted on the ICCP portal), the Nepal Health Research Council's
 * registry reports for Kathmandu Valley and Rukum in 2018 (PDF text), the Health Insurance Board's factsheet and
 * executive summary for 2022/23 (PDF text, read through the Internet Archive because hib.gov.np did not answer), the
 * Department of Drug Administration's about page (Internet Archive copy, June 2025), and BP Koirala Memorial Cancer
 * Hospital's about page (Internet Archive copy, August 2025). DOIs were resolved through Europe PMC and the figures in
 * `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the Ministry links the registry, NHRC, the insurer, the regulator and BP Koirala Memorial Cancer
 * Hospital; the registry links its three papers through keyPapers, and the Ministry links the two system papers.
 * Coordinates are approximate city points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NCCS = "https://www.iccp-portal.org/sites/default/files/plans/Nepal%20Cancer%20Control%20Strategy_Public%20Health%20Update.pdf";
const NCCS_NEWS = "https://www.iccp-portal.org/news/nepal-cancer-control-strategy-2024-2030";
const IMPACT = "https://www.iaea.org/sites/default/files/documents/review-missions/nepal-impact-review-report-2022.pdf";
const KTM_REPORT = "https://elibrary.nhrc.gov.np/bitstream/20.500.14356/3001/1/KTM-Valley-Report-final.pdf";
const RUKUM_REPORT = "https://elibrary.nhrc.gov.np/bitstream/20.500.14356/3002/1/Rukum_Report_final-2.pdf";
const HIB_FACTSHEET_WB = "https://web.archive.org/web/20250317081442/http://hib.gov.np/public/uploads/shares/Annual_Report_Factsheet_Summary_English_2022_23.pdf";
const HT_HIB_2026 = "https://thehimalayantimes.com/health/nepals-health-insurance-scheme-enrolls-98-million-but-only-59-million-active-rs-25-billion-funding-gap-looms";
const DDA_ABOUT_WB = "https://web.archive.org/web/20250619222337/https://www.dda.gov.np/content/about-us";
const DDA_HOME_WB = "https://web.archive.org/web/20261012211112/https://dda.gov.np/";
const BPK_ABOUT_WB = "https://web.archive.org/web/20250802171303/https://bpkmch.org.np/about-us/";
const WHO_GPACCM = "https://www.who.int/nepal/news/detail/27-03-2024-nepal-joins-the-global-platform-for-access-to-childhood-cancer-medicines-(gpaccm)";

const institutions: InstitutionInput[] = [
  i({ id: "nepal-ministry-of-health-and-population", name: "Ministry of Health and Population, Nepal", aka: ["MoHP Nepal", "Nepal Ministry of Health", "Ministry of Health and Population (Nepal)"],
    city: "Kathmandu", country: "NP", lat: 27.70, lng: 85.32, institutionType: "government", website: "https://mohp.gov.np",
    tldr: "Nepal's health ministry. Its Department of Health Services wrote the Nepal Cancer Control Strategy 2024 to 2030, and the ministry runs the scheme that gives poor patients with cancer and seven other serious diseases up to NPR 100,000 for treatment.",
    summary: "The Ministry of Health and Population asked the IAEA, WHO's South-East Asia office and IARC in June 2020 for an imPACT Review of cancer control; the review ran from November 2020 to March 2021 and recommended a national cancer control plan and a steering committee. The resulting Nepal Cancer Control Strategy 2024 to 2030, prepared by the Epidemiology and Disease Control Division of the Department of Health Services at Teku, Kathmandu, was approved by a ministerial decision dated Asar 31, 2081 in the Nepali calendar (mid-July 2024). It plans a cancer prevention and control division within the ministry, a National Cancer Control Committee that meets at least twice a year, a mid-term review in 2027 and a final review in 2029 to 2030. The coordinates on this record are an approximate Kathmandu city point.\n\nThe strategy counts six government cancer hospitals, four of them in Kathmandu Valley, one in Chitwan and one in Nepalgunj, with radiotherapy at two government hospitals and four private centres, about ten radiotherapy units against an estimated need of about 30, and a workforce of 48 radiation oncologists, 20 medical oncologists, 50 surgical oncologists and 18 medical physicists. It cites National Health Accounts for 2019/20: cancer treatment took 4.2% of current health spending, about NPR 8.5 billion.\n\nThe ministry's Impoverished Citizens Treatment programme (Bipanna Nagarik Aushadhi Upachar) pays up to NPR 100,000 towards treatment for patients with cancer and seven other serious diseases; the Health Insurance Board, which administers the payments, reports that cancer patients were the largest group, 16,696 of 29,215, in 2022/23. In March 2024 the ministry signed an agreement with WHO to join the Global Platform for Access to Childhood Cancer Medicines.",
    programs: ["Nepal Cancer Control Strategy 2024 to 2030", "Impoverished Citizens Treatment programme (Bipanna Nagarik Aushadhi Upachar), up to NPR 100,000 per patient", "National cancer treatment protocol (2017)", "National Strategy for Palliative Care", "Global Platform for Access to Childhood Cancer Medicines (joined March 2024)", "HPV vaccination of girls (nationwide from 2025)"],
    institutions: ["nepal-population-based-cancer-registry", "nhrc-nepal", "health-insurance-board-nepal", "dda-nepal", "bp-koirala-memorial-cancer-hospital", "iaea", "who", "iarc", "st-jude"],
    cancers: ["cervical", "breast-cancer", "childhood-cancers"], related: ["global-oncology-access"],
    keyPapers: ["paper-gyawali-cancer-care-delivery-nepal-jgo-2020", "paper-kafle-dahal-tobacco-cancers-nepal-plosone-2024"],
    links: [
      { label: "Nepal Cancer Control Strategy 2024 to 2030 (Ministry of Health and Population, in Nepali, PDF, ICCP portal)", url: NCCS },
      { label: "ICCP: Nepal Cancer Control Strategy 2024 to 2030", url: NCCS_NEWS },
      { label: "IAEA, WHO and IARC: imPACT Review summary report, Nepal (review period September 2020 to March 2021, PDF)", url: IMPACT },
      { label: "WHO Nepal: Nepal joins the Global Platform for Access to Childhood Cancer Medicines (27 March 2024)", url: WHO_GPACCM },
    ] }),

  i({ id: "nhrc-nepal", name: "Nepal Health Research Council (NHRC)", aka: ["NHRC", "Nepal Health Research Council"],
    city: "Kathmandu", country: "NP", lat: 27.71, lng: 85.32, institutionType: "government", website: "https://nhrc.gov.np",
    tldr: "Nepal's government body for health research, at Ramshah Path, Kathmandu. Since 1 January 2018 it has run the country's population-based cancer registries, in Kathmandu Valley, in four districts of Madhesh Province and in East and West Rukum.",
    summary: "The Nepal Health Research Council describes itself in its registry reports as a national apex body of the Government of Nepal responsible for promoting scientific study and quality health research. It started population-based cancer registration on 1 January 2018 with the Ministry of Health and Population, WHO's country office and technical support from IARC's regional hub at Tata Memorial Hospital, Mumbai, beginning in Kathmandu Valley and extending to six more districts. Its offices are at Ramshah Path, Kathmandu; the coordinates are an approximate city point.\n\nIts registry staff and collaborators wrote the first population-based incidence papers for Nepal: 2,156 new cancers in Kathmandu Valley in 2018, a comparison of urban Kathmandu with rural Rukum, and the nine-district figures for 2019. Its Ethical Review Board approved the 2019 registry analysis.",
    programs: ["Population-based cancer registry (from 1 January 2018)", "Ethical review of health research"],
    institutions: ["nepal-population-based-cancer-registry", "nepal-ministry-of-health-and-population", "iarc", "tata-memorial", "who"],
    related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-subedi-kathmandu-valley-pbcr-2018-jgo-2021", "paper-dahal-nepal-pbcr-cancer-risk-jce-2024"],
    links: [
      { label: "NHRC: Cancer Incidence and Mortality in Kathmandu Valley in 2018 (PDF)", url: KTM_REPORT },
      { label: "NHRC: Cancer Incidence and Mortality in Rukum Districts in 2018 (PDF)", url: RUKUM_REPORT },
    ] }),

  i({ id: "nepal-population-based-cancer-registry", name: "Nepal Population-Based Cancer Registry (NHRC)", aka: ["Kathmandu Valley Population-Based Cancer Registry", "Kathmandu Valley PBCR", "Rukum PBCR", "PBCR Nepal"],
    city: "Kathmandu", country: "NP", lat: 27.71, lng: 85.32, institutionType: "research-institute", website: "https://nhrc.gov.np",
    tldr: "Nepal's three population-based cancer registries, run by the Nepal Health Research Council since 2018: Kathmandu Valley, four districts of Madhesh Province, and East and West Rukum. Together they cover nine of 77 districts, about a fifth of the population.",
    summary: "The Nepal Health Research Council began population-based cancer registration on 1 January 2018 in Kathmandu, Lalitpur and Bhaktapur districts, then added Siraha, Saptari, Dhanusha and Mahottari in Madhesh Province and East and West Rukum in Karnali Province. The imPACT reviewers counted three registries covering nine of 77 districts, and the Nepal Cancer Control Strategy 2024 to 2030 says they cover about 20% of the population. Data come from hospitals, pathology laboratories, hospices and Ayurvedic centres and, in the community, from female community health volunteers and trained enumerators who visit households; cases are entered in CanReg5. The coordinates are those of the council's Kathmandu office, approximately.\n\nIn 2018 the Kathmandu Valley registry, covering about 3.07 million people through 38 partner health facilities, registered 2,156 new cancers (age-adjusted 95.3 per 100,000 men and 98.1 per 100,000 women) and 670 cancer deaths, with lung and stomach cancer leading in men and breast and lung cancer in women, and gallbladder cancer in the top five for both. The Rukum registry, covering about 221,000 people, registered 87 cancers (59.1 and 51.4 per 100,000). Across the nine districts in 2019 the age-adjusted incidence was 65.6 and mortality 29 per 100,000. The reports note that civil registration does not record cancer as a cause of death, so deaths are under-counted, and the imPACT reviewers found all registry staff on temporary contracts.",
    programs: ["Kathmandu Valley registry (Kathmandu, Lalitpur, Bhaktapur)", "Madhesh registry (Siraha, Saptari, Dhanusha, Mahottari)", "Rukum registry (East and West Rukum)"],
    institutions: ["nhrc-nepal", "nepal-ministry-of-health-and-population", "bp-koirala-memorial-cancer-hospital", "iarc", "tata-memorial"],
    cancers: ["nsclc", "gastric", "breast-cancer", "cervical", "gallbladder"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-subedi-kathmandu-valley-pbcr-2018-jgo-2021", "paper-subedi-urban-rural-nepal-pbcr-ecancer-2021", "paper-dahal-nepal-pbcr-cancer-risk-jce-2024"],
    links: [
      { label: "NHRC: Cancer Incidence and Mortality in Kathmandu Valley in 2018 (PDF)", url: KTM_REPORT },
      { label: "NHRC: Cancer Incidence and Mortality in Rukum Districts in 2018 (PDF)", url: RUKUM_REPORT },
      doi("10.1200/go.20.00574", "Subedi et al., cancer in Kathmandu Valley 2018 (JCO Glob Oncol 2021)"),
      doi("10.1155/2024/4687221", "Dahal et al., cancer risk in Nepal from the population-based registries, 2019 (J Cancer Epidemiol 2024)"),
    ] }),

  i({ id: "health-insurance-board-nepal", name: "Health Insurance Board, Nepal", aka: ["HIB Nepal", "Swasthya Bima Board", "National Health Insurance Program (Nepal)"],
    city: "Kathmandu", country: "NP", lat: 27.70, lng: 85.32, institutionType: "government", website: "https://hib.gov.np",
    tldr: "Runs Nepal's national health insurance: a family of up to five pays NPR 3,500 a year for cover of up to NPR 100,000. It also pays the government's grants of up to NPR 100,000 to poor patients with cancer and seven other serious diseases.",
    summary: "The Health Insurance Board was formed under the Health Insurance Act 2017 and is based at Babarmahal, Kathmandu, with seven provincial offices; the coordinates are an approximate city point. Its 2022/23 annual report summary describes a contributory scheme in which a family of up to five pays a premium of NPR 3,500 for a benefit ceiling of NPR 100,000, with NPR 700 and NPR 20,000 more for each extra member and a cap of NPR 200,000 per family. By the end of 2022/23 it had enrolled 7,215,098 people (24.7% of the population) in all 77 districts, but only 4,658,331 (16%) were active that year, and 463 health facilities were listed, 378 of them public.\n\nThe same report records the Impoverished Citizens Treatment programme, which gives NPR 100,000 to patients with cancer, kidney disease, heart disease, spinal injury, head injury, Alzheimer's disease, sickle cell anaemia or Parkinson's disease: 29,215 patients in 2022/23, of whom 16,696 had cancer, the largest group. That programme took 19.85% of the board's spending that year. In April 2026 The Himalayan Times, reporting a board report, gave a cumulative enrolment of 9,874,415, about 5.97 million active members, a projected shortfall of NPR 25.26 billion, and reforms including additional cover of up to NPR 100,000 for eight severe or chronic illnesses.",
    programs: ["National Health Insurance Program (NPR 3,500 premium, NPR 100,000 ceiling per family)", "Impoverished Citizens Treatment programme payments (Bipanna), up to NPR 100,000 per patient"],
    institutions: ["nepal-ministry-of-health-and-population"],
    links: [
      { label: "Health Insurance Board: Annual Report 2022/23, factsheet and executive summary (PDF; read through the Internet Archive)", url: HIB_FACTSHEET_WB },
      { label: "The Himalayan Times: Health insurance scheme faces Rs 25.26bn deficit despite rapid growth (10 April 2026)", url: HT_HIB_2026 },
    ] }),

  i({ id: "dda-nepal", name: "Department of Drug Administration, Nepal (DDA)", aka: ["DDA Nepal", "Department of Drug Administration", "Aushadhi Byabastha Bibhag"],
    city: "Kathmandu", country: "NP", lat: 27.69, lng: 85.33, institutionType: "government", website: "https://www.dda.gov.np",
    tldr: "Nepal's medicines regulator, set up in 1979 to enforce the Drugs Act 1978. It registers medicines for import and local manufacture, inspects factories against GMP, and in 2026 issued notices on the supply of cancer medicines, platinum drugs among them.",
    summary: "The Department of Drug Administration was established by the Government of Nepal in 1979 (1 Kartik 2036 in the Nepali calendar), first under the Ministry of Forest and Soil Conservation and from 2041 under the Ministry of Health and Population, to implement the Drugs Act 1978. Its own page lists the Drug Registration Regulation 2038, the Drug Standard Regulation 2043, the medicine registration guidance of 2073, the National GMP Code 2072 and the National Drug Policy 1995 among its instruments, regional offices in Biratnagar, Birgunj and Nepalgunj, and a National Medicine Laboratory. It is based at Bijulibazar, New Baneshwor, Kathmandu; the coordinates are an approximate city point.\n\nThe imPACT reviewers wrote that oncology medicines are not produced in Nepal and come mainly from India or other countries, and that supply has always been a challenge. In 2026 the department's notice board carried notices titled on the availability of medicines used in cancer, on submitting details of essential medicines including platinum-group cancer drugs, on the availability of platinum-group medicines, and on introducing risk-based registration of medicines; their texts were published as images and were not read for this record.",
    programs: ["Registration of medicines (Drug Registration Regulation 2038)", "GMP inspection (National GMP Code 2072)", "Pharmacovigilance and drug recalls", "National Medicine Laboratory"],
    institutions: ["nepal-ministry-of-health-and-population"],
    links: [
      { label: "DDA: about us (read through the Internet Archive, June 2025)", url: DDA_ABOUT_WB },
      { label: "DDA: home page and notice board (read through the Internet Archive, October 2026)", url: DDA_HOME_WB },
      { label: "IAEA, WHO and IARC: imPACT Review summary report, Nepal (PDF)", url: IMPACT },
    ] }),

  i({ id: "bp-koirala-memorial-cancer-hospital", name: "BP Koirala Memorial Cancer Hospital", aka: ["BPKMCH", "B.P. Koirala Memorial Cancer Hospital", "BP Koirala Cancer Hospital"],
    city: "Bharatpur", country: "NP", lat: 27.68, lng: 84.43, institutionType: "cancer-center", website: "https://bpkmch.org.np",
    tldr: "A government cancer hospital in Bharatpur, Chitwan, set up by an Act of Parliament with a duty to run the national cancer control programme. It started Nepal's hospital-based cancer registry in 2003 and is one of four hospitals receiving free childhood cancer medicines through a WHO and St. Jude platform.",
    summary: "BP Koirala Memorial Cancer Hospital, at Yagyapuri, Bharatpur-7, Chitwan, was established under an Act passed by Parliament on the occasion of the 25th anniversary of King Birendra's reign. Its goals, as its own page lists them, are to prevent, diagnose and treat cancer, to conduct high-level study and train the workforce the country needs, to develop systems for the safe use of radioactive materials, and to conduct the National Cancer Control Program. Its departments include medical, surgical and radiation oncology, pathology, radiodiagnosis and nuclear medicine, and cancer prevention and control, and it runs a nursing college. The coordinates are an approximate Bharatpur city point.\n\nThe Nepal Cancer Control Strategy 2024 to 2030 records that the hospital started a hospital-based cancer registry with other hospitals in 2003, since expanded to 12 hospitals. The Nepal Health Research Council thanks it for its support in continuing the population-based registry, which receives its data. WHO Nepal named it in March 2024 as one of the four institutions, with Bhaktapur Cancer Hospital, Kanti Children's Hospital and Patan Hospital, to receive 35 types of childhood cancer medicines free for four years through the Global Platform for Access to Childhood Cancer Medicines.",
    programs: ["Hospital-based cancer registry (from 2003, 12 hospitals)", "Radiotherapy, medical and surgical oncology", "Nursing college", "Childhood cancer medicines through the Global Platform for Access to Childhood Cancer Medicines"],
    institutions: ["nepal-ministry-of-health-and-population", "nepal-population-based-cancer-registry", "st-jude", "who"],
    cancers: ["cervical", "breast-cancer", "childhood-cancers"],
    links: [
      { label: "BP Koirala Memorial Cancer Hospital: about us (read through the Internet Archive, August 2025)", url: BPK_ABOUT_WB },
      { label: "Nepal Cancer Control Strategy 2024 to 2030, section 1 (in Nepali, PDF)", url: NCCS },
      { label: "WHO Nepal: Nepal joins the Global Platform for Access to Childhood Cancer Medicines (27 March 2024)", url: WHO_GPACCM },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-subedi-kathmandu-valley-pbcr-2018-jgo-2021", name: "Cancer in Kathmandu Valley in 2018, from Nepal's first population-based cancer registry",
    journal: "JCO Global Oncology", year: 2021, doi: "10.1200/go.20.00574", pmid: "33788597", authors: "Subedi R, Dhimal M, Budukh A, et al.", paperType: "observational", participants: 2156,
    tldr: "Nepal's first population-based registry counted 2,156 new cancers in Kathmandu Valley in 2018, an age-adjusted rate of 95.7 per 100,000; lung and stomach cancer led in men, breast and lung cancer in women, and gallbladder cancer was in the top five for both.",
    summary: "Published as \"Epidemiologic Pattern of Cancer in Kathmandu Valley, Nepal: Findings of Population-Based Cancer Registry, 2018\". It describes how the registry was set up and reports incidence and mortality for Kathmandu, Lalitpur and Bhaktapur districts, about 10.5% of Nepal's estimated 29 million people in 2018. Data came actively from hospitals, pathology laboratories, hospices, Ayurvedic centres, households (through enumerators and female community health volunteers) and the government division that subsidises cancer treatment for poor patients.",
    findings: [
      "2,156 new cancers were registered, an age-adjusted incidence of 95.7 per 100,000 (95.3 in men, 98.1 in women).",
      "Age-adjusted mortality was 36.3 per 100,000 in men (365 deaths) and 27.0 in women (305 deaths).",
      "The commonest cancers were lung and stomach in men and breast and lung in women; gallbladder cancer was among the five commonest in both sexes.",
    ],
    whatItMeans: "The authors describe this as Nepal's first population-based cancer registry; until it, cancer in Nepal was counted only in hospital registries and IARC estimates.",
    caveats: ["Kathmandu Valley is mainly urban and has most of the country's diagnostic services, so it may not represent rural Nepal.", "Cancer is not recorded as a cause of death in civil registration, so deaths are likely under-counted."],
    institutions: ["nepal-population-based-cancer-registry", "nhrc-nepal"], cancers: ["nsclc", "gastric", "breast-cancer", "gallbladder"],
    links: [doi("10.1200/go.20.00574", "JCO Glob Oncol 2021"), pubmed("33788597")] }),

  p({ id: "paper-subedi-urban-rural-nepal-pbcr-ecancer-2021", name: "Urban and rural differences in cancer in Nepal: Kathmandu Valley and Rukum registries",
    journal: "ecancermedicalscience", year: 2021, doi: "10.3332/ecancer.2021.1229", pmid: "34158833", authors: "Subedi R, Budukh A, Chapagain S, et al.", paperType: "observational",
    tldr: "Comparing the first year of Nepal's urban Kathmandu Valley registry with rural Rukum, cancer rates were 1.6 times higher in Kathmandu men and 1.9 times higher in Kathmandu women; breast cancer was eight times commoner in Kathmandu, but cervical cancer 30% less common.",
    summary: "Published as \"Differences in cancer incidence and pattern between urban and rural Nepal: one-year experience from two population-based cancer registries\". The authors compared data from the Kathmandu Valley (urban) and Rukum (rural) population-based registries run by the Nepal Health Research Council.",
    findings: [
      "Age-adjusted incidence in Kathmandu was 1.6 times that in Rukum among men and 1.9 times among women.",
      "Lung and stomach cancer were the two leading sites in men in both areas, with higher rates in Kathmandu; urinary bladder cancer in men was 4.4 times commoner in Kathmandu.",
      "Breast cancer, the leading cancer in Kathmandu women, was eight times commoner than in Rukum, while cervical cancer was 30% less common in Kathmandu.",
    ],
    whatItMeans: "Nepal's cancer pattern differs by setting, so a national strategy needs different priorities for cities and rural districts, including cervical screening where breast cancer is less common.",
    caveats: ["One year of data from two registries; Rukum is small (87 cancers in 2018), so its rates are imprecise.", "Lower rural rates may partly reflect less diagnosis."],
    institutions: ["nepal-population-based-cancer-registry", "nhrc-nepal"], cancers: ["breast-cancer", "cervical", "nsclc", "gastric"],
    links: [doi("10.3332/ecancer.2021.1229", "ecancermedicalscience 2021"), pubmed("34158833")] }),

  p({ id: "paper-dahal-nepal-pbcr-cancer-risk-jce-2024", name: "Cancer risk across urban, suburban and rural Nepal from the population-based registries, 2019",
    journal: "Journal of Cancer Epidemiology", year: 2024, doi: "10.1155/2024/4687221", pmid: "40151163", authors: "Dahal UK, Khadka K, Neupane K, et al.", paperType: "observational",
    tldr: "Across Nepal's population-based registries in 2019, age-adjusted cancer incidence was 65.6 and mortality 29 per 100,000; one in 14 men and one in 13 women would develop cancer before 75, with lung cancer the highest risk in men and breast cancer in women.",
    summary: "Published as \"Cancer Risk in Nepal: An Analysis from Population-Based Cancer Registry of Urban, Suburban, and Rural Regions\". Cases registered from 1 January to 31 December 2019 by the Nepal Health Research Council's registries were verified for duplication and residence by telephone and analysed following International Association of Cancer Registries guidelines, with approval from the council's Ethical Review Board.",
    findings: [
      "Age-adjusted incidence was 65.6 per 100,000 and age-adjusted mortality 29 per 100,000.",
      "One in 14 men and one in 13 women were at risk of developing cancer before age 75, and one in 28 men and one in 33 women of dying from it.",
      "Lung cancer carried the highest risk in men (1 in 80), followed by stomach and mouth; in women breast cancer (1 in 76) was commonest, followed by lung and cervix.",
    ],
    whatItMeans: "The first registry-based picture spanning urban, suburban and rural Nepal; the authors ask for screening, awareness and HPV vaccination to be government priorities.",
    caveats: ["Registries cover nine of 77 districts.", "Cancer deaths are likely under-counted because civil registration does not record cause of death."],
    institutions: ["nepal-population-based-cancer-registry", "nhrc-nepal"], cancers: ["nsclc", "gastric", "breast-cancer", "cervical"],
    links: [doi("10.1155/2024/4687221", "J Cancer Epidemiol 2024"), pubmed("40151163")] }),

  p({ id: "paper-kafle-dahal-tobacco-cancers-nepal-plosone-2024", name: "Tobacco-related cancers in urban, semi-urban and rural Nepal, 2019",
    journal: "PLoS One", year: 2024, doi: "10.1371/journal.pone.0300271", pmid: "38805435", authors: "Kafle Dahal U, Dhimal M, Budukh A, et al.", paperType: "observational",
    tldr: "In Nepal's population-based registries for 2019, tobacco-related cancers were 35.3% of cancers in men and 17.3% in women; one in 36 men and one in 65 women would develop one before 75.",
    summary: "Published as \"Burden of tobacco-related cancers in urban, semi-urban and rural setting of Nepal: Findings from population-based cancer registries 2019\". Data from the Nepal Health Research Council's registries in nine districts were grouped into urban, semi-urban and rural regions and analysed for tobacco-associated cancers.",
    findings: [
      "Tobacco-related cancers made up 35.3% of cancers in men and 17.3% in women.",
      "One in 36 men and one in 65 women developed a tobacco-related cancer before age 75; lung, mouth, oesophagus and larynx were among the five commonest.",
      "Incidence was highest in the urban region, 33.6 per 100,000 men and 17.0 per 100,000 women.",
    ],
    whatItMeans: "A large share of cancer in Nepal is tied to tobacco despite its tobacco control law, which the authors say needs better monitoring.",
    caveats: ["Registry coverage of nine districts.", "The abstract does not give the definition of tobacco-related sites used."],
    institutions: ["nepal-population-based-cancer-registry", "nhrc-nepal"], cancers: ["nsclc", "oral-cavity-cancer"],
    links: [doi("10.1371/journal.pone.0300271", "PLoS One 2024"), pubmed("38805435")] }),

  p({ id: "paper-gyawali-cancer-care-delivery-nepal-jgo-2020", name: "How cancer care is delivered in Nepal: status and priorities in 2020",
    journal: "JCO Global Oncology", year: 2020, doi: "10.1200/go.20.00287", pmid: "32735488", authors: "Gyawali B, Sharma S, Shilpakar R, et al.", paperType: "review",
    tldr: "A review by Nepali oncologists of the cancer burden, workforce and services in Nepal, which counted 35 radiation oncologists, 27 medical oncologists and 10 paediatric oncologists in 2018 and set out priorities including a registry, health insurance and essential cancer medicines.",
    summary: "Published as \"Overview of Delivery of Cancer Care in Nepal: Current Status and Future Priorities\". The authors systematically assess the burden of cancer and the resources available in Nepal, which they describe as lacking a systematic plan for cancer control, and suggest priorities for a future plan. The full text, read in Europe PMC, says patients mostly paid for care out of pocket, caregivers often bought chemotherapy drugs and brought them to hospital, and most hospitals had no oncology pharmacist.",
    findings: [
      "In 2018 there were 35 certified radiation oncologists, 10 paediatric oncologists and 27 medical oncologists; at the time of writing there were about 40 certified surgical oncologists and about 20 gynaecological oncologists.",
      "Functional teletherapy machines were 2 cobalt units and 6 linear accelerators.",
      "Radiation oncology residency at the National Academy of Medical Sciences began in 2002, and the first medical oncology fellowship there in 2016, each training two specialists a year.",
    ],
    whatItMeans: "A baseline written just before the national cancer strategy; its priorities (registry, insurance, workforce, radiotherapy and priority cancer medicines) reappear in the 2024 strategy.",
    caveats: ["A review article; the counts are the authors' and predate the 2024 strategy, which gives different workforce figures."],
    institutions: ["nepal-ministry-of-health-and-population"],
    links: [doi("10.1200/go.20.00287", "JCO Glob Oncol 2020"), pubmed("32735488")] }),
];

/** Records behind /countries/np/ (wave 7). */
export const recordsNP: EntityInput[] = [...institutions, ...papers];

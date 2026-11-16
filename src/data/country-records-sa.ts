import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Saudi Arabia: the public bodies and papers behind /countries/sa/ (wave 6) that the corpus did not hold. Each was
 * written from its own primary source, read raw on 11 November 2026: the Saudi Cancer Registry's incidence reports for
 * 2022, 2023 and 2024, its first mortality report (2022) and its first survival report (2005 to 2019), all PDFs on the
 * Saudi Health Council's site; the National Cancer Center's own vision and goals pages on that site; the Ministry of
 * Health's "about" page and its Health Sector Transformation Program delivery plan (PDF, 2021); the Saudi Food and
 * Drug Authority's regulatory guidance for submissions and applications (V1.0, PDF, October 2026); WHO's October 2023
 * news release on the SFDA's maturity level 4; and the Council of Health Insurance's "who we are" page, read through
 * the Internet Archive because chi.gov.sa did not answer a plain request. DOIs were resolved through Europe PMC and the
 * figures in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the Ministry links the National Cancer Center, the registry, the regulator, the insurance council and
 * King Faisal Specialist Hospital; the National Cancer Center links the registry and back; the registry links its
 * trend papers through keyPapers; the regulator and the insurance council link their papers. King Faisal Specialist
 * Hospital and Research Centre already exists (institutions/world.ts) and is reused. Coordinates are approximate
 * Riyadh city points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const SHC_NCC = "https://shc.gov.sa/en/Centers/NCC/Pages/default.aspx";
const NCC_VISION = "https://shc.gov.sa/en/Centers/NCC/Pages/Vision.aspx";
const NCC_GOALS = "https://shc.gov.sa/en/Centers/NCC/Pages/StrategicGoals.aspx";
const SCR_REPORTS = "https://shc.gov.sa/ar/Centers/NCC/Pages/AnnualReports.aspx";
const SCR_2024 = "https://shc.gov.sa/ar/Centers/NCC/AnnualReports/Cancer%20Incidence%20Report%202024%20-%20without%20Regions.pdf";
const SCR_MORT_2022 = "https://shc.gov.sa/ar/Centers/NCC/NationalReportsDL/Cancer%20Mortality%20Report%202022.pdf";
const SCR_SURV = "https://shc.gov.sa/ar/Centers/NCC/NationalReportsDL/Cancer%20Survival%20Report%20Saudi%20Arabia.pdf";
const MOH_ABOUT = "https://www.moh.gov.sa/en/Ministry/About/Pages/default.aspx";
const HSTP_PLAN = "https://www.moh.gov.sa/en/Ministry/vro/Documents/HSTP-Guide-EN.pdf";
const SFDA_GUIDANCE = "https://www.sfda.gov.sa/sites/default/files/2026-10/Regulatory%20guidance%20for%20submissions%20and%20applications_V1.0.pdf";
const WHO_ML4 = "https://www.who.int/news/item/30-10-2023-saudi-arabia-regulatory-system-becomes-third-to-reach-who-maturity-level-4";
const CHI_ABOUT = "https://web.archive.org/web/20260127055957/https://www.chi.gov.sa/en/aboutchi/Pages/who-we-are.aspx";

const institutions: InstitutionInput[] = [
  i({ id: "saudi-ministry-of-health", name: "Ministry of Health, Saudi Arabia", aka: ["Saudi Ministry of Health", "MOH Saudi Arabia", "وزارة الصحة"],
    city: "Riyadh", country: "SA", lat: 24.69, lng: 46.7, institutionType: "government", website: "https://www.moh.gov.sa",
    tldr: "Saudi Arabia's health ministry, set up by royal decree in 1951. Under the Vision 2030 health reform it is handing hospital care to regional health clusters, and it runs the national early screening programme for breast and colorectal cancer in people aged 40 to 69.",
    summary: "The Ministry of Health was established by Royal Decree No. 5/11/8697 of 1370 AH (1951), according to its own history page. Its Health Sector Transformation Program delivery plan (2021) describes a ministry that provides, finances and regulates care, and sets out to separate those roles: 22 health clusters of primary care centres, hospitals and medical cities, overseen by a government-owned health holding company, and a Center for National Health Insurance funded by the Ministry of Finance to buy care from the clusters so that citizens keep 100% coverage free of charge. The plan lists a cancer control initiative for breast and colon cancer and an initiative of the National Cancer Center to strengthen policy, early detection and awareness. The coordinates on this record are an approximate Riyadh city point.\n\nThe Saudi Cancer Registry's 2024 report describes the Ministry's national Early Cancer Screening Program: asymptomatic people aged 40 to 69 are offered mammography for breast cancer and the faecal immunochemical test for colorectal cancer, at Ministry screening centres, in mobile screening trucks and through partner sectors. In 2024 it screened 223,891 women for breast cancer and 240,834 people for colorectal cancer; after linkage with the registry, 1,088 breast cancers (19.0% of breast cancers registered that year) and 197 colorectal cancers (5.4%) were screen detected.",
    programs: ["Early Cancer Screening Program (mammography and FIT, ages 40 to 69)", "Health Sector Transformation Program (Vision 2030)", "Health clusters and the Center for National Health Insurance (planned)", "HPV vaccination of girls in the national schedule (from 2022)"],
    institutions: ["saudi-national-cancer-center", "saudi-cancer-registry", "sfda", "saudi-council-of-health-insurance", "kfshrc", "who"],
    cancers: ["breast-cancer", "colorectal", "cervical"], related: ["mammography", "hpv-vaccine"],
    keyPapers: ["paper-mulla-radiotherapy-access-saudi-front-oncol-2026"],
    links: [
      { label: "Ministry of Health: about the Ministry", url: MOH_ABOUT },
      { label: "Health Sector Transformation Program delivery plan (Ministry of Health, PDF)", url: HSTP_PLAN },
      { label: "Saudi Cancer Registry: Cancer Incidence Report 2024, part VI, Early Cancer Screening Program (PDF)", url: SCR_2024 },
    ] }),

  i({ id: "saudi-national-cancer-center", name: "National Cancer Center, Saudi Health Council", aka: ["Saudi National Cancer Center", "NCC Saudi Arabia", "Saudi Arabian National Cancer Center", "المركز الوطني للأورام"],
    city: "Riyadh", country: "SA", lat: 24.71, lng: 46.68, institutionType: "government", website: SHC_NCC,
    tldr: "The Saudi Health Council's cancer body. It runs the Saudi Cancer Registry, publishes the national incidence, mortality and survival reports, issues Saudi cancer treatment guidelines, and is charged with national cancer strategy.",
    summary: "The National Cancer Center sits within the Saudi Health Council. Its own page says it was established by decision No. 71/3 of the Council's chairman, the Minister of Health, dated 7/5/1437 AH, under Royal Decree No. 4015, and that it supervises the Saudi Cancer Registry. Its stated goals include updating national cancer plans and policies covering screening, prevention, treatment, rehabilitation and survivors, adopting new treatments and protocols, following up the financial burden of cancer and the local manufacture of cancer medicines and devices, managing the cancer data bank and directing cancer research. The coordinates are an approximate Riyadh city point.\n\nBesides the annual incidence reports it published the country's first national cancer survival report (Saudi nationals diagnosed 2005 to 2019) and its first cancer mortality report (deaths in 2022), and it lists national clinical guidelines for breast, lung, gastrointestinal, ovarian, prostate and other cancers, palliative care and proton therapy, cost-effectiveness analyses of screening for five cancers, and standing committees on radiotherapy, cyclotron and PET, and on CAR-T cell therapy.",
    programs: ["Saudi Cancer Registry", "National cancer incidence, mortality and survival reports", "Saudi national cancer clinical guidelines", "Screening cost-effectiveness analyses (breast, cervical, lung, colon, prostate)", "Standing committees on radiotherapy and on CAR-T cell therapy"],
    institutions: ["saudi-cancer-registry", "saudi-ministry-of-health", "kfshrc", "iarc"],
    cancers: ["breast-cancer", "colorectal", "thyroid"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-alkaiyat-trial-willingness-saudi-jco-go-2026", "paper-aldurdunji-saudi-clinicaltrials-gov-medicine-2026"],
    links: [
      { label: "Saudi Health Council: National Cancer Center", url: SHC_NCC },
      { label: "National Cancer Center: vision and establishment", url: NCC_VISION },
      { label: "National Cancer Center: strategic goals", url: NCC_GOALS },
      { label: "Cancer Survival Report, Saudi Arabia 2005 to 2019 (PDF)", url: SCR_SURV },
    ] }),

  i({ id: "saudi-cancer-registry", name: "Saudi Cancer Registry", aka: ["SCR", "السجل السعودي للأورام"],
    city: "Riyadh", country: "SA", lat: 24.712, lng: 46.675, institutionType: "government", website: SCR_REPORTS,
    tldr: "Saudi Arabia's national population-based cancer registry, set up in 1992. Cancer is a notifiable disease by royal decree, and the registry counted 27,771 new cancers reported in 2024, 22,728 of them in Saudi nationals.",
    summary: "The Saudi Cancer Registry was established in 1412 AH (1992) and is run by the National Cancer Center of the Saudi Health Council. Its reports say that a royal decree makes cancer a mandatory notifiable disease (the mortality report says the same of cancer deaths), and that trained registrars in government and private oncology centres abstract cases from medical records, coded with ICD-O-3 and staged with the SEER Summary Stage 2000 manual, and analysed with IARC's CanReg software. It has published incidence reports since 1994; the report for 2024 is its twenty-sixth. The coordinates are an approximate Riyadh city point.\n\nFor 2024 it recorded 27,771 new cancers: 22,728 in Saudi nationals and 4,981 in non-Saudis. Among Saudis the age-standardised incidence was 141.2 per 100,000 in men and 181.8 in women; breast cancer was 34.8% of cancers in Saudi women and colorectal cancer 17.5% in Saudi men. 92.1% of cases were confirmed by histology and 0.01% were registered from a death certificate only. Its first mortality report counted 8,541 cancer deaths in 2022, and its first survival report, linking 137,683 records of Saudi nationals with the National Information Center, gives 5-year net survival for 2015 to 2019 of 82.4% for breast cancer and 67.1% for colon cancer. Rates in its reports are for Saudi nationals; non-Saudis, 88.1% of them aged 15 to 59 in the 2024 report, are analysed separately, with much lower age-standardised rates (41.3 per 100,000 men and 104.7 per 100,000 women in 2024).",
    programs: ["National population-based cancer registration (from 1992)", "Annual cancer incidence reports (from 1994)", "Cancer mortality report (first edition, 2022 deaths)", "Cancer survival report (Saudi nationals, 2005 to 2019)"],
    institutions: ["saudi-national-cancer-center", "saudi-ministry-of-health", "kfshrc", "iarc"],
    cancers: ["breast-cancer", "colorectal", "thyroid", "cervical"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-alshamsan-breast-trends-saudi-2002-2022-ctarc-2026", "paper-alshamsan-colorectal-trends-saudi-2002-2023-pmedr-2026", "paper-alkhalawi-cervical-trends-saudi-emhj-2025"],
    links: [
      { label: "Saudi Health Council: Saudi Cancer Registry annual reports", url: SCR_REPORTS },
      { label: "Cancer Incidence Report, Saudi Arabia 2024 (PDF)", url: SCR_2024 },
      { label: "Cancer Mortality Report 2022, Saudi Arabia (PDF)", url: SCR_MORT_2022 },
      { label: "Cancer Survival Report, Saudi Arabia 2005 to 2019 (PDF)", url: SCR_SURV },
    ] }),

  i({ id: "sfda", name: "Saudi Food and Drug Authority (SFDA)", aka: ["SFDA", "الهيئة العامة للغذاء والدواء", "Saudi FDA"],
    city: "Riyadh", country: "SA", lat: 24.75, lng: 46.65, institutionType: "government", website: "https://www.sfda.gov.sa",
    tldr: "Saudi Arabia's regulator for medicines, devices and food, set up in 2003. WHO rated it at maturity level 4 in 2023, and from January 2027 its target for reviewing a medicine already approved in the United States or the European Union is 30 or 60 working days.",
    summary: "WHO describes the SFDA as established in 2003 as the sole agency responsible for regulatory oversight of all medical products. In October 2023 WHO announced that the SFDA had reached maturity level 4 for medicines and vaccines under its Global Benchmarking Tool, after a benchmarking in November 2022, and quoted its Assistant Director-General calling it the first in the Eastern Mediterranean and the third worldwide to reach that level. The coordinates are an approximate Riyadh city point.\n\nThe SFDA's regulatory guidance for submissions and applications (version 1.0, issued October 2026) replaces its earlier framework and submission guideline and takes effect on 1 January 2027. Its performance targets, in working days of assessment and excluding validation and the registration committee's decision, are 205 for innovative products already registered with a stringent regulatory authority, 250 for those that are not, 160 for priority review, and 60 under the breakthrough medicine programme. The verification route (30 days) and abridged route (60 days) are for products already approved by the US FDA, the US Department of Agriculture and/or the EMA. Priority review also covers certain products made entirely in the Kingdom by a sole local manufacturer.",
    programs: ["Marketing authorisation of medicines and biologicals", "Verification and abridged reliance routes", "Priority review and the Breakthrough Medicine Program", "Orphan drug designation", "Medical device regulation"],
    institutions: ["saudi-ministry-of-health", "who"],
    links: [
      { label: "SFDA: regulatory guidance for submissions and applications, V1.0 (PDF, effective 1 January 2027)", url: SFDA_GUIDANCE },
      { label: "WHO: Saudi Arabia regulatory system becomes third to reach WHO maturity level 4 (30 October 2023)", url: WHO_ML4 },
    ] }),

  i({ id: "saudi-council-of-health-insurance", name: "Council of Health Insurance, Saudi Arabia (CHI)", aka: ["CHI", "Council of Cooperative Health Insurance", "CCHI", "مجلس الضمان الصحي"],
    city: "Riyadh", country: "SA", lat: 24.72, lng: 46.66, institutionType: "government", website: "https://www.chi.gov.sa",
    tldr: "The government body that oversees Saudi Arabia's mandatory private health insurance. It defines who must be insured, sets the compulsory policy, accredits providers and runs the national insurance data exchange; in a 2018 survey nearly three quarters of foreign residents and one in eight Saudis had private insurance.",
    summary: "The Council of Health Insurance describes itself as an independent government entity established by Cabinet Decision No. 71 of 27/4/1420 AH (11 August 1999) to oversee the Cooperative Health Insurance System. Under Cabinet Decision No. 85 of 28/01/1445 AH (2023) it enforces mandatory health insurance, defines the groups that must be covered, accredits the providers that serve insured people, supervises their compliance and operates the NPHIES platform. Its site also publishes a mandatory policy document, a drug formulary and monthly statistics; the statistics are drawn by script and could not be read as text. The coordinates are an approximate Riyadh city point.\n\nCitizens are covered for government care free of charge. A 2026 analysis of the 2018 Saudi Family Health Survey found that 26.2% of adults had private health insurance, 72.8% of non-Saudis against 12.1% of Saudis, and a 2026 analysis of the Council's open data counted 102,048 cancer screening tests among privately insured people in 2023 and 159,496 in 2024.",
    programs: ["Mandatory (cooperative) private health insurance", "Accreditation of healthcare providers", "NPHIES health insurance exchange", "CHI drug formulary"],
    institutions: ["saudi-ministry-of-health"],
    keyPapers: ["paper-althabaiti-private-insurance-saudi-plos-one-2026", "paper-alloghbi-insured-screening-saudi-front-oncol-2026"],
    links: [
      { label: "Council of Health Insurance: who we are (read through the Internet Archive, January 2026)", url: CHI_ABOUT },
      { label: "Council of Health Insurance: statistics and indicators", url: "https://www.chi.gov.sa/en/open-data/Pages/Indicators-and-statistics.aspx" },
      doi("10.1371/journal.pone.0312887", "Althabaiti et al., private health insurance enrollees in Saudi Arabia (PLoS One 2026)"),
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-alshamsan-breast-trends-saudi-2002-2022-ctarc-2026", name: "Breast cancer incidence, age and stage in Saudi Arabia, 2002 to 2022",
    journal: "Cancer Treatment and Research Communications", year: 2026, doi: "10.1016/j.ctarc.2025.101077", pmid: "41411719", authors: "Alshamsan B.", paperType: "observational", participants: 38155,
    tldr: "Over 21 years of Saudi Cancer Registry data, the age-standardised rate of breast cancer in women rose from 12.6 to 49.7 per 100,000, while the share found at a localised stage rose from 26% to 52%.",
    summary: "Published as \"Trends in breast cancer incidence, age at diagnosis, and stage in Saudi Arabia, 2002-2022: a population-based study\". The author analysed 37,516 female and 639 male breast cancers reported to the Saudi Cancer Registry from 2002 to 2022, with joinpoint regression for trends in age-standardised rates.",
    findings: [
      "The age-standardised rate rose from 12.6 to 49.7 per 100,000 women (average annual percent change 5.6%, 95% CI 4.5 to 6.7).",
      "Median age at diagnosis rose from 46 to 52 years; the steepest increase was among women aged 70 to 74 (annual percent change 8.3%).",
      "Localised disease rose from 26% to 52% of cases; breast cancer rose from 21.1% to more than 30% of cancers in women.",
    ],
    whatItMeans: "Breast cancer is becoming much commoner in Saudi women and is being found earlier; the author argues for wider mammography coverage and more breast-care capacity.",
    caveats: ["Registry data describe diagnosed cases; part of the rise may reflect more diagnosis and better registration.", "A single author's analysis of aggregate registry data."],
    institutions: ["saudi-cancer-registry"], cancers: ["breast-cancer"],
    links: [doi("10.1016/j.ctarc.2025.101077", "Cancer Treat Res Commun 2026"), pubmed("41411719")] }),

  p({ id: "paper-alshamsan-colorectal-trends-saudi-2002-2023-pmedr-2026", name: "Colorectal cancer incidence in Saudi Arabia, 2002 to 2023, by age",
    journal: "Preventive Medicine Reports", year: 2026, doi: "10.1016/j.pmedr.2026.103505", pmid: "42199669", authors: "Alshamsan B.", paperType: "observational", participants: 30346,
    tldr: "Colorectal cancer incidence in Saudi Arabia rose by about 5% a year in men and 4% in women from 2002 to 2023, fastest in people aged 50 and over, and rose from 9.0% to 16.7% of cancers in men.",
    summary: "Published as \"Colorectal cancer incidence in Saudi Arabia, 2002-2023: Age-specific trends and implications for screening and prevention\". A population-based analysis of 30,346 colorectal cancers in Saudi Cancer Registry data, using joinpoint regression and interrupted time-series analysis.",
    findings: [
      "Average annual percent change in age-standardised incidence was 5.33% in men and 4.28% in women.",
      "Colorectal cancer rose from 8.5% to 13.1% of all cancers, and from 9.0% to 16.7% in men.",
      "Increases were larger at ages 50 and over than under 50 (men 5.39% against 3.69% a year); the odds of a localised-stage diagnosis rose by 5.8% a year.",
    ],
    whatItMeans: "Colorectal cancer is now the commonest cancer in Saudi men, and the author argues for age-targeted screening and reliable diagnostic pathways after a positive test.",
    caveats: ["Registry data on diagnosed cases; changes in diagnosis and registration affect trends.", "A single author's analysis."],
    institutions: ["saudi-cancer-registry"], cancers: ["colorectal"],
    links: [doi("10.1016/j.pmedr.2026.103505", "Prev Med Rep 2026"), pubmed("42199669")] }),

  p({ id: "paper-alkhalawi-cervical-trends-saudi-emhj-2025", name: "Cervical cancer trends in Saudi Arabia, 2005 to 2019",
    journal: "Eastern Mediterranean Health Journal", year: 2025, doi: "10.26719/2025.31.6.380", pmid: "40693486", authors: "Alkhalawi E, Alleman C, Al-Zahrani AS, Coleman MP.", paperType: "observational", participants: 3038,
    tldr: "Cervical cancer is uncommon in Saudi Arabia; among 3,038 women diagnosed from 2005 to 2019, non-Saudi women had higher rates than Saudi women, and the share found at a localised stage rose from 24.2% to over 40%.",
    summary: "Published as \"Fifteen-year analysis of cervical cancer trends in Saudi Arabia\". The authors analysed Saudi Cancer Registry data on all women diagnosed with cervical cancer from 2005 to 2019 and calculated age-standardised incidence by nationality, region and stage.",
    findings: [
      "3,038 women were diagnosed with invasive cervical cancer over the 15 years.",
      "Non-Saudi women had higher rates than Saudi women; Makkah Region had the highest rates, followed by Riyadh and the Eastern Region.",
      "Localised-stage diagnoses rose from 24.2% in 2005 to over 40.0% in 2019, and unknown stage fell from 19.6% to 6.3%.",
    ],
    whatItMeans: "Saudi Arabia starts from a low cervical cancer rate, but the authors call for equal access to prevention and earlier diagnosis to align with WHO's elimination goal.",
    caveats: ["The abstract gives no rates; registry completeness and data validity need continued monitoring, as the authors say."],
    institutions: ["saudi-cancer-registry"], cancers: ["cervical"],
    links: [doi("10.26719/2025.31.6.380", "East Mediterr Health J 2025"), pubmed("40693486")] }),

  p({ id: "paper-alloghbi-insured-screening-saudi-front-oncol-2026", name: "Cancer screening among privately insured people in Saudi Arabia, 2023 to 2024",
    journal: "Frontiers in Oncology", year: 2026, doi: "10.3389/fonc.2026.1837321", pmid: "42729116", authors: "Alloghbi A.", paperType: "observational",
    tldr: "Council of Health Insurance open data show breast, cervical and colorectal screening tests among privately insured people rising from 102,048 in 2023 to 159,496 in 2024, with a dip of about a third around Ramadan and Eid.",
    summary: "Published as \"Cancer screening utilization among insured beneficiaries in Saudi Arabia, 2023-2024: a national analysis of trends, calendar variation, and distribution across breast, cervical, and colorectal screening programs\". The author analysed six publicly available Council of Health Insurance datasets of monthly screening counts.",
    findings: [
      "Total screening counts rose by 56.3%, from 102,048 in 2023 to 159,496 in 2024.",
      "Monthly trends rose for breast (+3.0%), cervical (+2.7%) and colorectal screening (+4.6%).",
      "April counts were 32.4% to 41.6% below predicted values, consistent with a Ramadan and Eid reduction; colorectal screening counts were about 1.5 times higher in men than women.",
    ],
    whatItMeans: "Screening through private insurance is growing, but without the number of eligible insured people nobody can yet say what share is being screened.",
    caveats: ["Counts only, with no denominators, so not coverage or participation.", "Covers privately insured people, not the government system most citizens use."],
    institutions: ["saudi-council-of-health-insurance"], cancers: ["breast-cancer", "cervical", "colorectal"],
    links: [doi("10.3389/fonc.2026.1837321", "Front Oncol 2026"), pubmed("42729116")] }),

  p({ id: "paper-althabaiti-private-insurance-saudi-plos-one-2026", name: "Who has private health insurance in Saudi Arabia, and how it relates to outpatient care",
    journal: "PLoS One", year: 2026, doi: "10.1371/journal.pone.0312887", pmid: "42060621", authors: "Althabaiti KS, Hunsberger M, Khan J, Ahmed S.", paperType: "observational", participants: 8276,
    tldr: "In the 2018 Saudi Family Health Survey, 26.2% of adults had private health insurance, 72.8% of non-Saudis against 12.1% of Saudis, and those with it used outpatient services less than people covered by government care.",
    summary: "Published as \"Characteristics of private health insurance enrollees and the association between health coverage type and outpatient service utilization in Saudi Arabia: Insights from the National Saudi Family Health Survey\". The authors describe Saudi Arabia's mixed financing of government health coverage and private health insurance, and use the 2018 survey of 8,276 adults as a baseline before the first phase of the Vision 2030 reform in 2019.",
    findings: [
      "26.2% of respondents had private health insurance: 72.8% of non-Saudis and 12.1% of Saudis.",
      "Private insurance was associated with higher income, being non-Saudi, male, married, more educated and in good health.",
      "Private insurance was associated with lower outpatient use than government coverage (coefficient -0.107, P < 0.001).",
    ],
    whatItMeans: "Most Saudi citizens rely on free government care, while most foreign residents are privately insured; the reform's shift towards employer insurance needs watching for gaps in access.",
    caveats: ["2018 data, before the reform; coverage has changed since.", "Cross-sectional survey; association, not cause."],
    institutions: ["saudi-council-of-health-insurance"],
    links: [doi("10.1371/journal.pone.0312887", "PLoS One 2026"), pubmed("42060621")] }),

  p({ id: "paper-mulla-radiotherapy-access-saudi-front-oncol-2026", name: "Radiotherapy capacity, staffing and waiting times in Saudi Arabia",
    journal: "Frontiers in Oncology", year: 2026, doi: "10.3389/fonc.2026.1802072", pmid: "42052455", authors: "Mulla Z, Ghandourh W, Almerdhemah H, et al.", paperType: "observational",
    tldr: "A 2025 survey of 20 radiotherapy units found public centres treating the most patients with the fewest machines per patient, radical treatment waits often over 14 days and sometimes over 42, and 65% of centres hampered by tendering delays.",
    summary: "Published as \"Unlocking radiotherapy access: the critical role of structural quality and radiation therapists in Saudi Arabia\". A mixed-methods survey sent to the supervisors and managers of 20 radiotherapy units in Saudi Arabia between 24 September and 23 October 2025, covering staffing, equipment, patient volumes and waiting times for January to December 2024.",
    findings: [
      "Public facilities treated the highest caseloads but had fewer linear accelerators per patient, higher clinician workloads and longer waits.",
      "Waits for radical treatment often exceeded 14 days and in some cases 42 days; mixed public and private centres had the most machine capacity.",
      "65% of centres, most of them public, said tendering delays for equipment severely or critically affected care.",
    ],
    whatItMeans: "Even in a high-income country, radiotherapy access depends on which sector treats you; the authors call for a strategic framework to strengthen capacity and reduce the gaps between sectors.",
    caveats: ["The abstract gives no national count of machines or centres.", "Self-reported by unit managers."],
    institutions: ["saudi-ministry-of-health"],
    links: [doi("10.3389/fonc.2026.1802072", "Front Oncol 2026"), pubmed("42052455")] }),

  p({ id: "paper-aldurdunji-saudi-clinicaltrials-gov-medicine-2026", name: "Clinical studies with a Saudi site registered on ClinicalTrials.gov, to 2025",
    journal: "Medicine", year: 2026, doi: "10.1097/md.0000000000048740", pmid: "42152297", authors: "Aldurdunji MM.", paperType: "observational",
    tldr: "Of 1,502 studies with a Saudi site registered on ClinicalTrials.gov to August 2025, three quarters were interventional, most were sponsored by non-industry bodies, activity clustered in Riyadh, and only 12.1% had posted results.",
    summary: "Published as \"Trends in clinical research in Saudi Arabia: A registry-based descriptive analysis of ClinicalTrials.gov to 2025\". A descriptive analysis of every study registered on ClinicalTrials.gov with at least one Saudi site through August 2025, by sponsor, design, phase, enrolment, city and therapeutic area.",
    findings: [
      "1,502 studies; 75.5% interventional, with more late-phase (phase 3) than early-phase research.",
      "Non-industry sponsors registered 73.0%; half of trials planned 100 or fewer participants.",
      "Activity concentrated in Riyadh, with smaller hubs in Jeddah and Dammam; 12.1% of studies had posted results; oncology was among the most represented areas.",
    ],
    whatItMeans: "Saudi Arabia increasingly joins multinational late-phase trials, but early-phase capacity, research outside the big cities and results reporting lag.",
    caveats: ["ClinicalTrials.gov only; the Saudi Clinical Trials Registry is not included.", "The abstract does not give an oncology count."],
    institutions: ["saudi-national-cancer-center"],
    links: [doi("10.1097/md.0000000000048740", "Medicine 2026"), pubmed("42152297")] }),

  p({ id: "paper-alkaiyat-trial-willingness-saudi-jco-go-2026", name: "Willingness of Saudi cancer patients to take part in clinical trials",
    journal: "JCO Global Oncology", year: 2026, doi: "10.1200/go-25-00254", pmid: "42485596", authors: "Alkaiyat M, Alshammari K, Cois A.", paperType: "observational", participants: 367,
    tldr: "Among 367 cancer patients surveyed in Saudi Arabia in 2023 to 2024, 31.6% were willing to join a clinical trial against 64% for an observational study; fear of side effects and lack of information were the main barriers.",
    summary: "Published as \"Exploring Factors Affecting Participation in Oncology Clinical Trials in Saudi Arabia: Insights Into Willingness and Barriers\". A cross-sectional study with systematic sampling, December 2023 to June 2024, using patient questionnaires and medical charts.",
    findings: [
      "367 patients took part; 59.8% had stage IV disease and only 1.9% had been in a trial before.",
      "Willingness was 64% for observational studies and 31.6% for clinical trials.",
      "Barriers were fear of side effects (61.6%), lack of information (46.3%) and concerns about the product (41.6%); having a friend or relative who had joined a trial raised willingness (odds ratio 3.48).",
    ],
    whatItMeans: "Few Saudi cancer patients have been in a trial and most are reluctant; better information and the treating doctor's involvement may help.",
    caveats: ["The abstract does not name the hospital or hospitals; results may not generalise across the country."],
    institutions: ["saudi-national-cancer-center"],
    links: [doi("10.1200/go-25-00254", "JCO Glob Oncol 2026"), pubmed("42485596")] }),
];

/** Records behind /countries/sa/ (wave 6). */
export const recordsSA: EntityInput[] = [...institutions, ...papers];

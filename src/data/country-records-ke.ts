import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Kenya: the institutions and papers behind /countries/ke/ (wave 5) that the corpus did not hold. Every figure was read
 * on 11 November 2026 from the raw text of its source, not from a summary: the Cancer Prevention and Control Act, 2012
 * and the draft Cancer Registries Rules, 2023 (both as hosted by the National Cancer Institute of Kenya), the
 * Institute's own pages and the joint notice it signed with the Social Health Authority in October 2026, the Social
 * Health Authority's benefit tariffs and premium pages, the Ministry of Health's National Cancer Control Strategy
 * 2023-2027 (the WHO Africa copy, PDF text) and its launch notice, the Pharmacy and Poisons Board's own pages, its
 * marketing authorisation flow chart and the Registration of Health Products and Technologies Rules, 2022 (Legal
 * Notice No. 100), and papers resolved through Europe PMC with their abstracts (and full text where open access) read.
 * Kenya Law's site answered 403 or an empty 202 to every request, so the text of the Social Health Insurance Act was
 * not read; see the page's gaps.
 *
 * Inbound links: the six institutions link to each other through `institutions`, the papers are linked from the
 * registries' and the Ministry's `keyPapers`, and the existing Kenyatta National Hospital, Moi Teaching and Referral
 * Hospital and Aga Khan University Hospital records are reused, not duplicated.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });

const NCI = "https://ncikenya.go.ke/";
const NCI_ABOUT = "https://ncikenya.go.ke/about/";
const NCI_RESEARCH = "https://ncikenya.go.ke/research/";
const NCI_IACR = "https://ncikenya.go.ke/blogs/nci-k-ceo-dr-elias-melly-delivers-keynote-address-at-international-cancer-registries-conference-in-tanzania/";
const ACT_2012 = "https://uploads.ncikenya.go.ke/uploads/policy/CancerPreventionandControlAct2012.pdf";
const REG_RULES = "https://uploads.ncikenya.go.ke/uploads/regulations/The-Cancer-Prevention-and-Control-Cancer-Registries-Rules-2023.pdf-1712919245530.pdf-(1).pdf";
const JOINT = "https://uploads.ncikenya.go.ke/uploads/notices/SHA-NCI-Joint-Notice.pdf";
const SHA_TARIFFS = "https://www.sha.go.ke/benefit-tariffs/";
const SHA_ABOUT = "https://www.sha.go.ke/aboutus/";
const SHA_PREMIUM = "https://www.sha.go.ke/premium-rates/";
const SHA_SHIF = "https://www.sha.go.ke/social-health-insurance-fund/";
const NCCS = "https://www.afro.who.int/sites/default/files/2025-03/The%20National%20Cancer%20Control%20Strategy%20%282023-2027%29.pdf";
const NCCS_LAUNCH = "https://health.go.ke/node/614";
const PPB_ABOUT = "https://web.pharmacyboardkenya.org/about-us-2/";
const PPB_PATHWAYS = "https://web.pharmacyboardkenya.org/download/marketing-authorisation-pathways/";
const PPB_RULES = "https://web.pharmacyboardkenya.org/download/pharmacy-and-poisons-registration-of-health-products-and-technologies-rules-2022/";
const KORIR_2015 = "https://doi.org/10.1002/ijc.29674";
const KORIR_2016 = "https://doi.org/10.1016/j.canep.2016.11.006";
const GAKUNGA_2025 = "https://doi.org/10.1371/journal.pone.0324593";
const MWENDA_2022 = "https://doi.org/10.3332/ecancer.2022.1442";
const TENGE_2009 = "https://doi.org/10.4314/eamj.v86i1.46921";

const institutions: InstitutionInput[] = [
  i({ id: "national-cancer-institute-of-kenya", name: "National Cancer Institute of Kenya", aka: ["NCI-K", "NCI-Kenya", "Kenya National Cancer Institute"],
    city: "Nairobi", country: "KE", lat: -1.286, lng: 36.817, institutionType: "government", website: NCI,
    tldr: "The statutory body set up by Kenya's Cancer Prevention and Control Act of 2012. It advises the health minister on cancer, keeps the national cancer register, inspects and certifies the centres that treat cancer, and since 2026 its certificate is what a centre needs before the Social Health Authority will pay it for cancer care.",
    summary: "The Cancer Prevention and Control Act, No. 15 of 2012 (assented to on 27 July 2012) established the National Cancer Institute of Kenya. Its functions under the Act include advising the Cabinet Secretary for Health on the treatment and care of people with cancer and the priorities between measures, securing the establishment of hospitals and treatment centres in every county, coordinating cancer services, and ensuring that accurate figures of people with cancer are obtained for planning. Part III of the Act requires the Institute to keep a national cancer register, and requires every medical institution to notify the Institute of each cancer it diagnoses no later than sixty days after diagnosis, without the patient's name unless the patient consents; failing to notify is an offence. Draft Cancer Registries Rules, 2023, published by the Institute for comment, would set up an electronic national cancer registry system and require every medical institution to employ at least one certified cancer registrar.\n\nThe Institute describes four technical directorates, one of which sets standards for and inspects, registers and accredits cancer management centres under sections 34 and 36 of the Act, and another of which runs research and maintains the National Cancer Registry. In October 2026 the Institute and the Social Health Authority issued a joint notice that the Authority will contract a facility for cancer services only after verifying a valid Institute certificate and the approved scope of services, and the Institute announced a nationwide inspection of cancer management centres from 21 October 2026. It funds research through grants; the projects it lists for the 2023/2024 financial year include work on HPV self-sampling, aflatoxin and gastrointestinal cancers, and whether the insurance benefit packages protect women with cervical cancer from financial hardship. Its chief executive officer is Dr Elias Melly, and Gladys Chesumbai heads the National Cancer Registry. The coordinates are a Nairobi centroid.",
    programs: ["National cancer register (Cancer Prevention and Control Act, Part III)", "Inspection and certification of cancer management centres", "Certification for Social Health Authority oncology contracting", "Cancer research grants", "Childhood cancer registry minimum dataset", "Public awareness and education"],
    cancers: ["cervical", "breast-cancer", "esophageal", "prostate"],
    institutions: ["kenya-ministry-of-health", "social-health-authority-kenya", "nairobi-cancer-registry", "eldoret-cancer-registry", "kenyatta-national-hospital", "moi-teaching-referral-hospital"],
    people: ["elias-melly", "gladys-chesumbai"],
    links: [
      { label: "National Cancer Institute of Kenya: about", url: NCI_ABOUT },
      { label: "Cancer Prevention and Control Act, No. 15 of 2012 (PDF, hosted by the Institute)", url: ACT_2012 },
      { label: "Draft Cancer Prevention and Control (Cancer Registries) Rules, 2023 (PDF)", url: REG_RULES },
      { label: "Social Health Authority and NCI joint notice on certification of cancer centres, October 2026 (PDF)", url: JOINT },
      { label: "National Cancer Institute of Kenya: research grants", url: NCI_RESEARCH },
      { label: "National Cancer Institute of Kenya: keynote at the IACR conference, October 2026", url: NCI_IACR },
    ] }),

  i({ id: "kenya-ministry-of-health", name: "Ministry of Health (Kenya)", aka: ["MOH Kenya", "Kenyan Ministry of Health", "National Cancer Control Program (Kenya)", "NCCP Kenya"],
    city: "Nairobi", country: "KE", lat: -1.286, lng: 36.817, institutionType: "government", website: "https://www.health.go.ke",
    tldr: "Kenya's health ministry. Its National Cancer Control Program writes cancer policy and guidelines, and it launched the National Cancer Control Strategy 2023-2027 in July 2023, costed at KES 49.2 billion, with the goal of cutting premature deaths from cancer by a third by 2028.",
    summary: "The Ministry of Health launched the National Cancer Control Strategy 2023-2027 at Afya House, Nairobi, on 14 July 2023. It is the third national cancer strategy, built on the evaluation of the 2017-2022 strategy, and is organised in five pillars: prevention and early detection; imaging, pathology and laboratory diagnosis; treatment, palliative care and survivorship; advocacy, coordination, partnership and financing; and strategic information, registration, surveillance and research. Its goal is to reduce premature mortality from cancer by a third by 2028, and its costing totals KES 49,221,600,090 over five years.\n\nThe strategy states that the National Cancer Control Program, in the Division of Non-Communicable Diseases, is mandated to formulate cancer policies and guidelines and to coordinate the strategy's implementation. It records that in 2023 Kenya had 12 comprehensive cancer treatment centres (6 public, 6 private) with 58 oncologists and 11 medical physicists, and that about 11,040 of an estimated 42,000 people diagnosed each year reached treatment. It puts cervical screening coverage at about 31%, records HPV vaccination coverage in 2022 of 58% for the first dose and 29% for the second, and notes that a national breast cancer screening programme was established in October 2021. It names two population-based registries, Nairobi (2001) and Eldoret (1999), covering about 11% of the population, and states that the country had not published a detailed cancer burden report in the previous five years. The coordinates are a Nairobi centroid.",
    programs: ["National Cancer Control Program", "National Cancer Control Strategy 2023-2027", "National Cancer Screening Guidelines 2018", "Breast Cancer Screening and Early Diagnosis Action Plan 2021-2025", "HPV vaccination (routine immunisation)"],
    cancers: ["cervical", "breast-cancer", "prostate", "colorectal", "esophageal"],
    institutions: ["national-cancer-institute-of-kenya", "social-health-authority-kenya", "pharmacy-and-poisons-board-kenya", "kenyatta-national-hospital", "moi-teaching-referral-hospital"],
    keyPapers: ["paper-mwenda-kenya-cervical-cancer-programme-2022"],
    links: [
      { label: "Ministry of Health: National Cancer Control Strategy 2023-2027 (WHO Africa copy, PDF)", url: NCCS },
      { label: "Ministry of Health: launch of the strategy, 14 July 2023", url: NCCS_LAUNCH },
      { label: "Mwenda et al., Kenya's cervical cancer programme 2011-2020 (ecancermedicalscience 2022)", url: MWENDA_2022 },
    ] }),

  i({ id: "social-health-authority-kenya", name: "Social Health Authority (Kenya)", aka: ["SHA", "Social Health Insurance Fund (SHIF)", "successor to the National Health Insurance Fund (NHIF)"],
    city: "Nairobi", country: "KE", lat: -1.286, lng: 36.817, institutionType: "government", website: "https://www.sha.go.ke",
    tldr: "The public body that replaced Kenya's National Health Insurance Fund. It collects contributions of 2.75% of household income, with a floor of KES 300 a month, and pays contracted facilities for care; its oncology package covers diagnosis, staging and treatment up to KES 400,000 per person per year.",
    summary: "The Social Health Authority describes itself as the organisation set up to manage the funds collected under the Social Health Insurance Act, to pool contributions, contract approved providers and pay for services, including for vulnerable people. It runs three funds: a Primary Healthcare Fund, the Social Health Insurance Fund and an Emergency, Chronic and Critical Illness Fund, the last of which lists cancer among the chronic illnesses it covers. Salaried employees contribute 2.75% of gross salary, deducted by employers; non-salaried people contribute 2.75% of household income as assessed by means testing, with a minimum of KES 300 a month.\n\nIts published benefit tariffs include a Haematology and Oncology Services Package covering chemotherapy, radiotherapy, hormonal therapy and immunotherapy, blood products, imaging for planning and staging, surgery and management of precancerous lesions, at level 3 to 6 facilities with National Cancer Institute certification, with a limit of KES 400,000 per person per year for diagnosis, staging and treatment. Its sub-limits include radiotherapy at KES 3,600 a session for up to 30 sessions, brachytherapy up to KES 40,000 for up to 3, SBRT up to KES 70,000 for up to 5, chemotherapy administration up to KES 5,500 a session, a PET scan at KES 53,500 and a PSMA PET scan at KES 64,200, with chemotherapy drugs paid as per the National Cancer Control Program's differentiated care model. Screening tariffs include an HPV test at KES 3,600, PSA at KES 1,500 and a stool test for occult blood at KES 400, with cancer-specific screening rolled out subject to budget. The National Cancer Institute cites the tariffs as Legal Notice No. 56 of 2025. In October 2026 the Authority and the Institute stated that it will contract facilities for cancer services only on verification of a valid Institute certificate. The coordinates are a Nairobi centroid; its office is on Ragati Road.",
    programs: ["Social Health Insurance Fund", "Primary Healthcare Fund", "Emergency, Chronic and Critical Illness Fund", "Haematology and Oncology Services Package (KES 400,000 annual limit)", "Screening and management of precancerous lesions tariffs"],
    cancers: ["cervical", "breast-cancer", "prostate", "colorectal"],
    institutions: ["national-cancer-institute-of-kenya", "kenya-ministry-of-health"],
    keyPapers: ["paper-gakunga-nhif-oncology-package-time-to-treatment-2025"],
    links: [
      { label: "Social Health Authority: benefit tariffs", url: SHA_TARIFFS },
      { label: "Social Health Authority: premium rates", url: SHA_PREMIUM },
      { label: "Social Health Authority: about", url: SHA_ABOUT },
      { label: "Social Health Authority: Social Health Insurance Fund", url: SHA_SHIF },
      { label: "Social Health Authority and NCI joint notice, October 2026 (PDF)", url: JOINT },
    ] }),

  i({ id: "pharmacy-and-poisons-board-kenya", name: "Pharmacy and Poisons Board (Kenya)", aka: ["PPB", "Kenyan medicines regulator"],
    city: "Nairobi", country: "KE", lat: -1.286, lng: 36.817, institutionType: "government", website: "https://web.pharmacyboardkenya.org",
    tldr: "Kenya's medicines regulator, set up under the Pharmacy and Poisons Act (Cap. 244). It registers medicines and health technologies, inspects manufacturers and distributors, licenses pharmacy practice and authorises clinical trials; a registration lasts five years.",
    summary: "The Pharmacy and Poisons Board is the drug regulatory authority established under the Pharmacy and Poisons Act, Chapter 244 of the Laws of Kenya, and regulates the practice of pharmacy and the manufacture of and trade in drugs and poisons. Its Medical Products and Health Technologies directorate registers products, inspects and enforces good manufacturing and distribution practice, runs post-market surveillance and vigilance, and oversees clinical trials; a laboratory directorate tests products, including suspected substandard and falsified ones.\n\nThe Pharmacy and Poisons (Registration of Health Products and Technologies) Rules, 2022, made on 8 June 2022 as Legal Notice No. 100, set the registration procedure; a certificate of registration or renewal is valid for five years, and the dossier asks for the product's registration status in countries with stringent regulatory authorities. The Board's marketing authorisation flow chart (dated 31 March 2022) shows full assessment and reliance pathways scheduled first in, first out or on a fast track: screening within 30 days on the fast track and 90 days first in, first out, 90 days for a fast-tracked reliance review, approval by the Board within 14 days of the recommendation and a certificate within 7 days, with no target time for the assessor's review. For emergency use authorisation it shows 30 days for initial assessment on the full pathway and 7 days for abridged and WHO-listed products, and 15 days to a final decision. OnCo did not find measured approval times for cancer medicines. The coordinates are a Nairobi centroid.",
    programs: ["Registration of health products and technologies", "Reliance and fast-track pathways", "Clinical trial authorisation", "Pharmacovigilance and post-market surveillance", "Quality control laboratory"],
    institutions: ["kenya-ministry-of-health"],
    links: [
      { label: "Pharmacy and Poisons Board: about", url: PPB_ABOUT },
      { label: "Pharmacy and Poisons Board: marketing authorisation pathways (flow chart, PDF)", url: PPB_PATHWAYS },
      { label: "Registration of Health Products and Technologies Rules, 2022 (Legal Notice No. 100, PDF)", url: PPB_RULES },
    ] }),

  i({ id: "nairobi-cancer-registry", name: "Nairobi Cancer Registry", aka: ["NCR", "Nairobi population-based cancer registry"],
    city: "Nairobi", country: "KE", lat: -1.286, lng: 36.817, institutionType: "research-institute", university: "Kenya Medical Research Institute",
    tldr: "The population-based cancer registry for Nairobi County, run since 2001 from the Kenya Medical Research Institute's Centre for Clinical Research. With the Eldoret registry it is one of Kenya's two population-based registries and a member of the African Cancer Registry Network.",
    summary: "The Nairobi Cancer Registry began in 2001 and is based at the Centre for Clinical Research of the Kenya Medical Research Institute (KEMRI); it covers the population of Nairobi County, about 3.2 million in 2009 and about 4.4 million in 2019. It finds cases actively, works to the African Cancer Registry Network's procedures, and its data appeared in Volume XII of Cancer Incidence in Five Continents. A 2025 paper by its staff and colleagues states that, with the Eldoret registry, its data are used for Kenya's national estimates in GLOBOCAN, that it collects data on paper, and that its most recent report covered 2009 to 2013, with 10,344 cases.\n\nIts published incidence for 2004 to 2008 counted 8,982 cases, 3,889 in men (age-standardised rate 161 per 100,000) and 5,093 in women (231 per 100,000). Prostate cancer was commonest in men (40.6) and breast cancer in women (51.7), followed by cervical cancer (46.1); breast and cervical cancer made up 44% of cancers in women, oesophageal cancer was common in both sexes, and Kaposi sarcoma was relatively low (3.6 in men and 2.0 in women). A costing of the registry for July 2012 to June 2014 found that grants, research studies and international organisations paid 70% of its operating costs. Its data, for 2010 to 2019, were also used to test whether the National Hospital Insurance Fund's 2015 oncology package shortened the time to treatment; the authors found no significant change, a sudden rise of 34.6 days in June 2018 associated with a health workers' strike, and that collation for 2015 to 2019 was incomplete. The coordinates are a Nairobi centroid.",
    programs: ["Population-based cancer registration in Nairobi County (since 2001)", "Contribution to Cancer Incidence in Five Continents Volume XII", "SURVCAN-3 population-based survival"],
    cancers: ["prostate", "breast-cancer", "cervical", "esophageal", "kaposi-sarcoma"],
    institutions: ["national-cancer-institute-of-kenya", "eldoret-cancer-registry", "kenyatta-national-hospital", "iarc"],
    keyPapers: ["paper-korir-nairobi-cancer-incidence-2004-2008-ijc-2015", "paper-korir-nairobi-cancer-registry-costs-2016", "paper-gakunga-nhif-oncology-package-time-to-treatment-2025"],
    links: [
      { label: "Korir et al., Incidence of cancer in Nairobi, Kenya (2004-2008) (Int J Cancer 2015)", url: KORIR_2015 },
      { label: "Gakunga, Korir and Bouttell, NHIF oncology package and time to treatment (PLoS One 2025)", url: GAKUNGA_2025 },
      { label: "Korir et al., economic analysis of the Nairobi Cancer Registry (Cancer Epidemiol 2016)", url: KORIR_2016 },
      { label: "African Cancer Registry Network: member registries", url: "https://afcrn.org/index.php/membership/membership-list" },
    ] }),

  i({ id: "eldoret-cancer-registry", name: "Eldoret Cancer Registry", aka: ["ECR", "Eldoret population-based cancer registry"],
    city: "Eldoret", country: "KE", lat: 0.514, lng: 35.27, institutionType: "research-institute", university: "Moi University",
    tldr: "The population-based cancer registry for the Eldoret area of western Kenya, established in 1999 in Moi University's Department of Haematology at Moi Teaching and Referral Hospital, and a member of the African Cancer Registry Network.",
    summary: "The Eldoret Cancer Registry was established in 1999. An analysis of its data published in 2009 describes it as located in the Department of Haematology of Moi University School of Medicine at Moi Teaching and Referral Hospital, and reports 5,366 people diagnosed with cancer and attended at the hospital and other hospitals in Eldoret from January 1999 to December 2006, an average of 671 a year, with a male to female ratio of 1:1; about 21% had haematological cancers, non-Hodgkin lymphoma being the commonest, and among solid tumours oesophageal cancer was the commonest, with cervical cancer commonest in women and prostate cancer in men. The Ministry of Health's 2023-2027 strategy names it, with the Nairobi registry, as one of Kenya's two high-quality population-based registries.\n\nThe registry is listed as a member of the African Cancer Registry Network and contributed data to the SURVCAN-3 study of cancer survival in sub-Saharan Africa and to the network's studies of care and barriers to treatment, with Gladys Chesumbai as its author. The coordinates are those of Moi Teaching and Referral Hospital.",
    programs: ["Population-based cancer registration in the Eldoret area (since 1999)", "SURVCAN-3 population-based survival", "African Cancer Registry Network patterns-of-care studies"],
    cancers: ["esophageal", "cervical", "prostate", "kaposi-sarcoma"],
    institutions: ["moi-teaching-referral-hospital", "nairobi-cancer-registry", "national-cancer-institute-of-kenya", "iarc"],
    people: ["gladys-chesumbai"],
    keyPapers: ["paper-tenge-eldoret-cancer-registry-western-kenya-2009"],
    links: [
      { label: "Tenge et al., Burden and pattern of cancer in Western Kenya (East Afr Med J 2009)", url: TENGE_2009 },
      { label: "Joko-Fru et al., SURVCAN-3 (Lancet Glob Health 2024)", url: "https://doi.org/10.1016/S2214-109X(24)00130-X" },
      { label: "African Cancer Registry Network: member registries", url: "https://afcrn.org/index.php/membership/membership-list" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-korir-nairobi-cancer-incidence-2004-2008-ijc-2015", name: "Incidence of cancer in Nairobi, Kenya (2004-2008)",
    journal: "International Journal of Cancer", year: 2015, doi: "10.1002/ijc.29674", pmid: "26139540", authors: "Korir A, Okerosi N, Ronoh V, Mutuma G, Parkin M", paperType: "observational", participants: 8982,
    tldr: "The Nairobi Cancer Registry's incidence rates for 2004 to 2008: 8,982 cases in a city of 3.2 million, with prostate cancer commonest in men and breast and cervical cancer together making up 44% of cancers in women.",
    summary: "Cancer incidence rates for the Nairobi Cancer Registry, a population-based registry covering the capital (3.2 million inhabitants in 2009), with active case finding and standard checks for accuracy and validity.",
    findings: [
      "8,982 cases registered in 2004 to 2008: 3,889 men (age-standardised rate 161 per 100,000) and 5,093 women (231 per 100,000).",
      "Prostate cancer was commonest in men (40.6 per 100,000) and breast cancer in women (51.7), with cervical cancer second in women (46.1).",
      "Oesophageal cancer was common in both sexes (sex ratio 1.3); Kaposi sarcoma was relatively low (3.6 per 100,000 in men, 2.0 in women).",
    ],
    whatItMeans: "These are the most recent full incidence rates the Nairobi registry has published as a paper, and with the Eldoret registry they are among the data behind Kenya's national estimates.",
    caveats: ["It covers one city, not the country.", "The years are 2004 to 2008; later registry reports were not found online.", "This record summarises the abstract; the full text was not read."],
    cancers: ["prostate", "breast-cancer", "cervical", "esophageal", "kaposi-sarcoma"],
    institutions: ["nairobi-cancer-registry"],
    links: [{ label: "International Journal of Cancer 2015", url: KORIR_2015 }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/26139540/" }] }),

  p({ id: "paper-korir-nairobi-cancer-registry-costs-2016", name: "Economic analysis of the Nairobi Cancer Registry",
    journal: "Cancer Epidemiology", year: 2016, doi: "10.1016/j.canep.2016.11.006", pmid: "27915004", authors: "Korir A, Gakunga R, Subramanian S, Okerosi N, Chesumbai G, Edwards P, Tangka F, Joseph R, Buziba N, Rono V, Parkin DM, Saraiya M", paperType: "observational",
    tldr: "What it cost to run the Nairobi Cancer Registry in 2012 to 2014, measured with the CDC's registry costing tool: grants, research studies and international organisations paid 70% of the cost.",
    summary: "The authors used the Centers for Disease Control and Prevention's International Registry Costing Tool to measure the funding, cost and labour used by the Nairobi Cancer Registry in two annual periods between July 2012 and June 2014.",
    findings: [
      "Funding from grants, research studies and international organisations provided 70% of the registry's operating cost.",
      "The costliest activities were administration, management and training, and data acquisition (abstraction, entry and validation).",
    ],
    whatItMeans: "Kenya's population-based cancer counting depended largely on outside money, which bears on how a national registry could be paid for.",
    caveats: ["The costs are for 2012 to 2014.", "This record summarises the abstract; the full text was not read."],
    institutions: ["nairobi-cancer-registry", "eldoret-cancer-registry"],
    links: [{ label: "Cancer Epidemiology 2016", url: KORIR_2016 }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/27915004/" }] }),

  p({ id: "paper-gakunga-nhif-oncology-package-time-to-treatment-2025", name: "NHIF oncology package, a health workers' strike and time to cancer treatment in Nairobi",
    journal: "PLoS One", year: 2025, doi: "10.1371/journal.pone.0324593", pmid: "40402995", authors: "Gakunga R, Korir A, Bouttell J", paperType: "observational", participants: 7584,
    tldr: "An interrupted time series on Nairobi Cancer Registry data for 2010 to 2019 found that the National Hospital Insurance Fund's 2015 oncology package did not measurably shorten the wait to start cancer treatment, while a 2018 health workers' strike lengthened it by about 35 days.",
    summary: "Kenya introduced the National Health Insurance Fund oncology benefits package in April 2015, covering consultation, investigations, drugs, radiology, surgery, chemotherapy and radiotherapy. The authors computed the monthly median time from diagnosis to treatment for Nairobi County residents in the Nairobi Cancer Registry from January 2010 to December 2019 and analysed it with ARIMA-based interrupted time series.",
    findings: [
      "After cleaning, 7,584 (35%) of 21,464 cases were analysed; 57.8% were women, and about 65% of cases with a known stage were stage III or IV.",
      "The 2015 oncology package was associated with no significant change in median time to treatment (a step of 9.06 days, 95% CI -8.7 to 26.8).",
      "A sudden increase of 34.6 days (95% CI 15.4 to 53.8) in June 2018 was associated with a health workers' strike.",
      "10,329 (48.1%) registered patients had no treatment start date recorded.",
    ],
    whatItMeans: "Insurance cover on paper did not by itself bring treatment sooner in Nairobi, and disruption to the health workforce did delay it; the Social Health Authority inherits the question.",
    caveats: ["There was no control group, because the package applied nationally.", "The registry had not finished collating 2015 to 2019, so case trends could not be analysed.", "Time to treatment is a proxy; outcomes were not in the data."],
    institutions: ["nairobi-cancer-registry", "social-health-authority-kenya"],
    links: [{ label: "PLoS One 2025", url: GAKUNGA_2025 }, { label: "Europe PMC full text", url: "https://europepmc.org/article/PMC/PMC12097610" }] }),

  p({ id: "paper-mwenda-kenya-cervical-cancer-programme-2022", name: "Kenya's cervical cancer programme, 2011-2020",
    journal: "ecancermedicalscience", year: 2022, doi: "10.3332/ecancer.2022.1442", pmid: "36200015", authors: "Mwenda V, Mburu W, Bor JP, Nyangasi M, Arbyn M, Weyers S, Tummers P, Temmerman M", paperType: "review",
    tldr: "A review of Kenya's cervical cancer screening policy and performance from 2011 to 2020: policy improved, but yearly screening reached between under 1% and 36% of the target population and the burden of cervical cancer did not change.",
    summary: "The authors assessed Ministry of Health screening policy documents from 2000 to 2021 against seven criteria and analysed screening and burden indicators for 2011 to 2020 from the Kenya Health Information System and the Global Burden of Disease database.",
    findings: [
      "Annual screening coverage varied between under 1% and 36% of the year's target for HIV-negative women, and between under 1% and 7% for HIV-positive women.",
      "Positivity on visual inspection with acetic acid was below 5% for most of the period, and treatment of precancerous lesions ranged from 22% to 39%.",
      "Age-standardised incidence stayed at 26.3 to 27.4 and mortality at 16.6 to 18.0 per 100,000 women-years.",
      "Leadership and accountability improved after the National Cancer Control Program was established.",
    ],
    whatItMeans: "Kenya's cervical screening was written into policy well before it reached women at scale, which is the gap the 2023-2027 strategy and HPV testing are meant to close.",
    caveats: ["Coverage comes from routine health information data, which the authors describe as poorly collected.", "Burden figures are modelled Global Burden of Disease estimates."],
    cancers: ["cervical"],
    institutions: ["kenya-ministry-of-health"],
    links: [{ label: "ecancermedicalscience 2022", url: MWENDA_2022 }, { label: "Europe PMC full text", url: "https://europepmc.org/article/PMC/PMC9470178" }] }),

  p({ id: "paper-tenge-eldoret-cancer-registry-western-kenya-2009", name: "Burden and pattern of cancer in Western Kenya (Eldoret Cancer Registry)",
    journal: "East African Medical Journal", year: 2009, doi: "10.4314/eamj.v86i1.46921", pmid: "19530542", authors: "Tenge CN, Kuremu RT, Buziba NG, Patel K, Were PA", paperType: "observational", participants: 5366,
    tldr: "An early analysis of the Eldoret Cancer Registry, set up in 1999: 5,366 people with cancer in 1999 to 2006, with oesophageal cancer the commonest solid tumour.",
    summary: "A retrospective analysis of data in the Eldoret Cancer Registry, based in Moi University's Department of Haematology at Moi Teaching and Referral Hospital, for patients diagnosed and attended at the hospital and other hospitals in Eldoret from January 1999 to December 2006.",
    findings: [
      "5,366 patients, an average of 671 a year; 2,699 men and 2,667 women.",
      "About 21% had haematological cancers, non-Hodgkin lymphoma the commonest; oesophageal cancer was the commonest solid tumour.",
      "Cervical cancer was commonest in women and prostate cancer in men, and Kaposi sarcoma cases rose with the HIV epidemic.",
    ],
    whatItMeans: "It set out the pattern of cancer in western Kenya, where oesophageal cancer stands out, from the registry that later became one of Kenya's two population-based registries.",
    caveats: ["Counts, not population rates.", "The years are 1999 to 2006.", "This record summarises the abstract; the full text was not read."],
    cancers: ["esophageal", "cervical", "prostate", "kaposi-sarcoma"],
    institutions: ["eldoret-cancer-registry", "moi-teaching-referral-hospital"],
    links: [{ label: "East African Medical Journal 2009", url: TENGE_2009 }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/19530542/" }] }),
];

/** Records behind /countries/ke/ (wave 5). */
export const recordsKE: EntityInput[] = [...institutions, ...papers];

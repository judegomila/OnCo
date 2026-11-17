import type { InstitutionInput, PaperInput } from "@/lib/schema";

const asOf = "2026-11-03";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });

/**
 * South Korea: the records the corpus was missing when /countries/kr/ was written. OnCo held Korea's big Seoul
 * hospitals, the National Cancer Center and about forty companies, but none of the three public bodies that decide
 * what a Korean cancer patient is given and what it costs them (the regulator, the insurer and the body that
 * assesses value for the insurer), and none of the national registry's own reports.
 *
 * Institution facts are read from each body's own pages; coordinates are OpenStreetMap Nominatim lookups of the
 * headquarters address. Papers are read from their PubMed records (Europe PMC was returning 503 on the day) and
 * DOIs resolved through Crossref. Registered in src/data/index.ts as koreaInstitutions and koreaPapers.
 */
export const koreaInstitutions: InstitutionInput[] = [
  i({ id: "mfds", name: "Ministry of Food and Drug Safety (MFDS)", aka: ["MFDS", "식품의약품안전처", "식약처", "Korea Food and Drug Administration", "KFDA"], city: "Cheongju (Osong)", country: "KR", lat: 36.639, lng: 127.331, institutionType: "government", website: "https://www.mfds.go.kr",
    tldr: "South Korea's medicines regulator, which approves cancer drugs and clinical trials. It approved 783 drug trials in 2025, 304 of them for cancer medicines.",
    summary: "The Ministry of Food and Drug Safety, based in the Osong life-science complex in Cheongju, licenses medicines and approves clinical trials in South Korea; its scientific review is carried out by its National Institute of Food and Drug Safety Evaluation. Its own press note of 30 June 2023 records that it first approved Yuhan's lazertinib (Leclaza), the 31st new drug developed in Korea, on 18 January 2021 for EGFR T790M-positive lung cancer after a previous EGFR inhibitor, more than three years before the United States approved it, and extended it to first-line treatment on 30 June 2023.\n\nIts annual trial statistics for 2025, published on 6 March 2026, count 783 approved drug trials (747 in 2024), of which 668 were company-led and 115 investigator-led. Cancer medicines accounted for 304 (276 in 2024), about 68 per cent of them (207) targeted agents. Multinational trials rose from 372 to 425, while trials of medicines developed by Korean companies fell from 305 to 259. Its note for 2024 cites an analysis by the Korea National Enterprise for Clinical Trials ranking Korea sixth among countries and Seoul second among cities, after Beijing, for new company-led trials registered on ClinicalTrials.gov.\n\nA revised new-drug review procedure started in January 2025, with a dedicated review team for each product and early inspection of manufacturing; trade press reported that it came with a fee of 410 million won per new drug application and a target of 295 days against an average of about 420. MFDS's own text on the fee and the target was not reached for this record.",
    programs: ["New drug and biologic licensing", "Clinical trial approval", "New drug review procedure (from January 2025)", "Expedited review under article 35-4 of the Pharmaceutical Affairs Act"],
    links: [
      { label: "MFDS (Korean)", url: "https://www.mfds.go.kr" },
      { label: "MFDS press release, 6 March 2026: 2025 clinical trial approvals (Korean)", url: "https://www.mfds.go.kr/brd/m_99/view.do?seq=49738" },
      { label: "MFDS press release, 28 March 2025: 2024 clinical trial approvals (Korean)", url: "https://www.mfds.go.kr/brd/m_99/view.do?seq=48944" },
      { label: "MFDS press note, 30 June 2023: lazertinib first-line approval (Korean)", url: "https://www.mfds.go.kr/brd/m_99/view.do?seq=47414" },
      { label: "Daily Pharm, 6 February 2025: the 410 million won fee and 295-day target (Korean)", url: "https://www.dailypharm.com/user/news/8680" },
    ],
    drugs: ["lazertinib"], companies: ["yuhan"], institutions: ["hira", "nhis-korea"], related: ["pmda"],
    keyPapers: ["paper-lee-anticancer-drug-lag-korea-inquiry-2025"] }),

  i({ id: "hira", name: "Health Insurance Review and Assessment Service (HIRA)", aka: ["HIRA", "건강보험심사평가원", "심평원"], city: "Wonju", country: "KR", lat: 37.322, lng: 127.981, institutionType: "government", website: "https://www.hira.or.kr",
    tldr: "The Korean public body that decides whether national health insurance should pay for a new cancer drug, by judging how well it works and whether it is worth its price.",
    summary: "HIRA reviews what providers bill to the National Health Insurance and assesses whether medicines, procedures and devices should be covered by it. Its English pages describe the drug route: a company with an MFDS-approved drug applies for coverage, HIRA's Pharmaceutical Benefit Assessment Committee assesses clinical efficacy and cost-effectiveness, and the price of a newly listed drug is then negotiated between the company and the National Health Insurance Service. Cancer drugs are first considered by HIRA's cancer disease deliberation committee (암질환심의위원회), which sets the criteria for when a drug is reimbursed.\n\nHIRA's detailed evaluation rules state that it uses no explicit cost-effectiveness threshold, judging each case against earlier decisions in the light of severity, burden of disease, quality of life and innovation; an amendment in August 2024 wrote down three conditions, all of which must be met, for a new drug to be judged innovative enough for flexible treatment of its ratio. Each year-end HIRA publishes the range of the incremental cost-effectiveness ratios of the drugs it assessed over the previous five years. As reported by the trade press, anticancer drugs evaluated in 2019 to 2023 had a median of 39.93 million won per quality-adjusted life year and a maximum of 47.92 million won, and those evaluated in 2020 to 2024 a median of 42.94 million won and a maximum of 55.36 million won, the first time the maximum in the series HIRA has published since 2022 passed 50 million won.",
    programs: ["Pharmaceutical Benefit Assessment Committee", "Cancer disease deliberation committee", "Economic evaluation of new drugs", "Claims review"],
    links: [
      { label: "HIRA: role and function (English)", url: "https://www.hira.or.kr/dummy.do?pgmid=HIRAJ010000009001" },
      { label: "Daily Pharm, 31 December 2024: HIRA's published ICER ranges for 2019 to 2023 (Korean)", url: "https://www.dailypharm.com/user/news/9684" },
      { label: "Daily Pharm, 8 January 2026: the ranges for 2020 to 2024 (Korean)", url: "https://m.dailypharm.com/user/news/334595" },
      { label: "Daily Pharm, 20 March 2025: the cancer committee votes to widen trastuzumab deruxtecan's gastric cancer criteria (Korean)", url: "https://dailypharm.com/user/news/7495" },
    ],
    institutions: ["nhis-korea", "mfds"], drugs: ["trastuzumab-deruxtecan"], related: ["g-ba-iqwig"],
    keyPapers: ["paper-kim-managed-entry-agreements-korea-front-pharmacol-2023", "paper-kim-anticancer-pricing-reimbursement-korea-erpor-2021"] }),

  i({ id: "nhis-korea", name: "National Health Insurance Service (NHIS), South Korea", aka: ["NHIS", "국민건강보험공단", "건보공단", "National Health Insurance Service"], city: "Wonju", country: "KR", lat: 37.325, lng: 127.987, institutionType: "government", website: "https://www.nhis.or.kr",
    tldr: "South Korea's single public health insurer. A registered cancer patient pays 5 per cent of the cost of covered care for five years.",
    summary: "The National Health Insurance Service describes itself as a non-profit single insurer that provides health insurance to all citizens living in Korea, under the supervision of the Ministry of Health and Welfare: it manages eligibility, collects contributions, contracts fees with providers and pays benefits, while HIRA reviews fees and quality. Lower-income people are covered by Medical Aid instead. It negotiates the price of each newly listed drug after HIRA's assessment and sends the invitations for the National Cancer Screening Program.\n\nIts page on the special co-payment scheme (본인일부부담금 산정특례) sets out what a cancer diagnosis changes. A patient whose cancer is confirmed and registered pays 5 per cent of the cost of covered care, outpatient or inpatient, including CT, MRI and PET scans and pharmacy, for five years, against the usual 30 to 60 per cent for outpatient care and 20 per cent for a hospital stay. Registration applies from the date of diagnosis if made within 30 days. A patient with residual, metastatic or recurrent disease still on treatment when the five years end can register again. The scheme does not reach items the patient pays in full, selectively covered items, two- and three-bed rooms, meals or non-covered care.",
    programs: ["Single national health insurer", "Special co-payment scheme for cancer (산정특례): 5 per cent for five years", "Drug price negotiation", "National Cancer Screening Program invitations"],
    links: [
      { label: "NHIS: the special co-payment scheme (Korean)", url: "https://www.nhis.or.kr/nhis/minwon/wbhapa01000m01.do?mode=view&articleNo=10946880" },
      { label: "NHIS: about national health insurance (English)", url: "https://www.nhis.or.kr/english/wbheaa02300m01.do" },
    ],
    institutions: ["hira", "ncc-korea"] }),
];

export const koreaPapers: PaperInput[] = [
  p({ id: "paper-kccr-cancer-statistics-korea-2023-crt-2026", name: "Cancer statistics in Korea: incidence, mortality, survival and prevalence in 2023",
    tldr: "The national registry's own annual report: 288,613 new cancers and 85,271 cancer deaths in Korea in 2023, five-year relative survival of 73.7 per cent, and prostate cancer the commonest cancer in men for the first time.",
    summary: "The Korea Central Cancer Registry's annual statistics, calculated from the Korea National Cancer Incidence Database for 1999 to 2023 with survival follow-up to 31 December 2024 and mortality from the Ministry of Data and Statistics. The database is assembled from hospital registrations backed up by the central and eleven regional registries, takes two years to complete, and for 2023 was estimated to be 97.4 per cent complete by the Ajiki method.\n\nIn 2023 there were 288,613 new cancer cases (age-standardised rate 288.6 per 100,000 on the world standard) and 85,271 cancer deaths (64.3 per 100,000). Half the new cases, 145,452 or 50.4 per cent, were in people aged 65 or over. Prostate cancer became the commonest cancer among men for the first time. The share of cancers found at a localised stage rose from 45.6 per cent in 2005 to 51.8 per cent in 2023. Five-year relative survival for cases diagnosed in 2019 to 2023 was 73.7 per cent overall and 92.7 per cent for localised disease, and over 2.73 million people alive in 2023 had had a cancer diagnosis, 5.3 per cent of the population. Thyroid cancer incidence rose by 22.4 per cent a year from 1999 to 2011, fell by 12.1 per cent a year to 2016 and has risen by 5.3 per cent a year since. Stomach cancer mortality fell from 23.9 to 5.4 per 100,000 between 1999 and 2023 and liver cancer incidence from 27.9 to 12.8.",
    journal: "Cancer Research and Treatment", year: 2026, doi: "10.4143/crt.2026.298", pmid: "41881851",
    authors: "Park EH, Jung KW, Choi SH, Park NJ, et al.", paperType: "observational", participants: 288613,
    findings: ["288,613 new cancers in 2023 (world-standard ASR 288.6 per 100,000) and 85,271 cancer deaths (ASR 64.3).", "Five-year relative survival 73.7 per cent for cases diagnosed 2019 to 2023; 92.7 per cent for localised-stage cancer.", "Localised-stage share rose from 45.6 per cent in 2005 to 51.8 per cent in 2023.", "Lowest mortality-to-incidence ratios among major high-income countries for stomach (0.21), colorectal (0.22) and breast (0.08) cancer.", "The 2023 incidence database was estimated to be 97.4 per cent complete."],
    whatItMeans: "This is the registry reading itself, and it is the source every Korean cancer figure on OnCo should be traced to. It shows a country where the number of cancers is still rising as the population ages while death rates keep falling, and its authors credit cancer control efforts with earlier detection and better survival.",
    caveats: ["International comparisons set Korea's observed 2023 counts against GLOBOCAN's modelled 2022 estimates for other countries, as the authors say.", "Earlier detection can lengthen survival measured from diagnosis without lengthening life (lead time), which the authors also name.", "Incidence lags two years behind the calendar."],
    links: [{ label: "Cancer Res Treat 2026", url: "https://doi.org/10.4143/crt.2026.298" }, { label: "Full text (e-crt.org)", url: "https://www.e-crt.org/journal/view.php?doi=10.4143/crt.2026.298" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/41881851/" }],
    journals: ["cancer-research-and-treatment"], institutions: ["ncc-korea"], cancers: ["thyroid", "gastric", "hcc", "colorectal"], related: ["paper-kang-thyroid-cancer-overdiagnosis-income-korea-bmc-cancer-2020"] }),

  p({ id: "paper-lee-national-cancer-screening-program-korea-jpmph-2025", name: "Current status of the National Cancer Screening Program in Korea: history, achievements and future directions",
    tldr: "How Korea's national screening grew from three cancers for people on Medical Aid in 1999 to six cancers for everyone insured by 2019, free for the lower-income half.",
    summary: "A review by the National Cancer Center's screening researchers. The government established the National Cancer Screening Program in 1999, initially offering stomach, breast and cervical cancer screening to Medical Aid beneficiaries. By 2019 it had widened its eligible population and its range to six cancers (stomach, liver, cervical, breast, colorectal and lung) for both Medical Aid recipients and health insurance beneficiaries. The authors report steadily rising participation, falls in the incidence of stomach, liver, colorectal and cervical cancer with more detection at precancerous stages, improved five-year survival for stomach, colorectal and breast cancer, and mortality-to-incidence ratios for major cancers well below the OECD average.",
    journal: "Journal of Preventive Medicine and Public Health", year: 2025, doi: "10.3961/jpmph.25.268", pmid: "40575987",
    authors: "Lee K, Suh M, Choi KS", paperType: "review",
    findings: ["Programme founded 1999 for stomach, breast and cervical cancer in Medical Aid beneficiaries.", "Six cancers (stomach, liver, cervix, breast, colorectum, lung) offered to all insured people by 2019."],
    whatItMeans: "Every insured Korean adult from 40 is offered a stomach endoscopy every two years, and people at high risk of liver cancer an ultrasound and blood test every six months. This review, by the researchers who run the programme, sets out how that came about.",
    caveats: ["A narrative review by the programme's own researchers, not an independent evaluation.", "Falls in incidence and gains in survival have several causes; the review attributes them to screening without separating them."],
    links: [{ label: "J Prev Med Public Health 2025", url: "https://doi.org/10.3961/jpmph.25.268" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/40575987/" }],
    institutions: ["ncc-korea", "nhis-korea"], cancers: ["gastric", "hcc", "colorectal", "nsclc"], related: ["paper-jun-gastroenterology"] }),

  p({ id: "paper-kang-thyroid-cancer-overdiagnosis-income-korea-bmc-cancer-2020", name: "Income differences in screening, incidence, postoperative complications and mortality of thyroid cancer in South Korea",
    tldr: "Korea's thyroid cancer rate more than doubled between 2006 and 2012 and then fell by almost half by 2015 while deaths did not move, and the rise and fall were steepest among the better-off, which the authors read as evidence of overdiagnosis.",
    summary: "A national time-trend study using the Korea Community Health Survey, the National Health Insurance database and Statistics Korea cause-of-death data. Age-standardised thyroid cancer incidence rose from 46.6 per 100,000 in 2006 to 115.0 in 2012 and fell to 63.5 in 2015, while mortality did not fluctuate. Higher income was associated with higher rates of screening, incidence and post-operative complications, and lower income with higher mortality; lung cancer and stroke, used as negative controls, showed the opposite pattern. The fall in incidence and complications after 2012, which the authors link to public concern about overdiagnosis, was more pronounced among high-income people.",
    journal: "BMC Cancer", year: 2020, doi: "10.1186/s12885-020-07597-4", pmid: "33176753",
    authors: "Kang HY, Kim I, Kim YY, Bahk J, et al.", paperType: "observational",
    findings: ["Thyroid cancer incidence 46.6 per 100,000 in 2006, 115.0 in 2012, 63.5 in 2015; mortality flat over the same years.", "Screening, incidence and post-operative complications were all highest in the highest income groups.", "The post-2012 fall was steeper in high-income groups."],
    whatItMeans: "Finding more of a cancer is not the same as saving lives from it. In Korea, screening produced a surge in thyroid cancer diagnoses and operations without changing how many people died, and the surge reversed when doctors and the public questioned it.",
    caveats: ["Ecological trends: the study shows patterns by income, not what happened to individual patients.", "Screening rates come from a self-reported survey."],
    links: [{ label: "BMC Cancer 2020", url: "https://doi.org/10.1186/s12885-020-07597-4" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/33176753/" }],
    journals: ["bmc-cancer"], cancers: ["thyroid"], bottlenecks: ["b-overdiagnosis"], related: ["paper-ahn-n-engl-j-med"] }),

  p({ id: "paper-lee-anticancer-drug-lag-korea-inquiry-2025", name: "An empirical analysis of anti-cancer drug lags in South Korea",
    tldr: "Cancer drugs reached Korea one to two years after the United States, Europe and Japan between 2013 and 2022, mostly because companies applied later, not because the regulator was slow.",
    summary: "For cancer drugs approved between 2013 and 2022, the authors compared submission, approval and reimbursement timing in South Korea with the United States, the European Union and Japan, using multivariate linear and Cox regression. Korea showed an average delay of one to two years in submission and approval against the other three, but the Ministry of Food and Drug Safety's review time was much shorter than those lags and better than the European Medicines Agency's. Delays in reimbursement decisions were roughly halved over the period while the other lags lengthened, and the variation in approval delay was largely explained by submission delay.",
    journal: "Inquiry", year: 2025, doi: "10.1177/00469580251363855", pmid: "40790743",
    authors: "Lee SK, Lee JH", paperType: "observational",
    findings: ["Average delay of one to two years in submission and approval in Korea against the US, EU and Japan, 2013 to 2022.", "MFDS review time shorter than the EMA's.", "Reimbursement decision delay roughly halved over the decade.", "Approval delay is mostly explained by companies submitting later in Korea."],
    whatItMeans: "For a Korean patient waiting for a drug already sold abroad, the wait is mostly decided by when the company chooses to apply, and then by the insurance decision, rather than by the regulator's review.",
    caveats: ["Covers drugs that were eventually approved in Korea; drugs never submitted there are not in the comparison."],
    links: [{ label: "Inquiry 2025", url: "https://doi.org/10.1177/00469580251363855" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/40790743/" }],
    institutions: ["mfds"] }),

  p({ id: "paper-kim-managed-entry-agreements-korea-front-pharmacol-2023", name: "Introduction of managed entry agreements in Korea: problem, policy and politics",
    tldr: "From January 2014 to 2020 Korea paid for most of the cancer and rare-disease medicines it listed through confidential risk-sharing contracts, almost all of them simple financial deals rather than payment for results.",
    summary: "A policy analysis using Kingdon's three-streams model, with descriptive analysis of Korean listings and comparison with four other countries. Managed entry agreements were introduced in January 2014 as part of a benefit-enhancement plan for four major diseases and were then extended as a route to cover new premium-priced medicines. Between January 2014 and December 2020, 48 medicines were contracted under them, 73.4 per cent of listed medicines for cancer or rare diseases; 97.9 per cent of contracts were finance-based and outcome-based contracts such as coverage with evidence development were 2.1 per cent. Agreement between Korea's use of these contracts and that of the United Kingdom, Italy and Australia was low (kappa 0.00 to 0.14).",
    journal: "Frontiers in Pharmacology", year: 2023, doi: "10.3389/fphar.2023.999220", pmid: "37124231",
    authors: "Kim H, Godman B, Kwon HY, Hong SH", paperType: "review",
    findings: ["Managed entry agreements started in January 2014.", "48 medicines contracted from January 2014 to December 2020, 73.4 per cent of listed cancer or rare-disease medicines.", "97.9 per cent finance-based; 2.1 per cent outcome-based."],
    whatItMeans: "The listed price of a new cancer drug in Korea is often not the price the insurer pays: the difference sits in a confidential contract. That has made more drugs available, but it means the public cannot see what is being paid or whether the drug delivered what was promised.",
    caveats: ["Data end in December 2020; the scheme has continued and changed since."],
    links: [{ label: "Front Pharmacol 2023", url: "https://doi.org/10.3389/fphar.2023.999220" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/37124231/" }],
    institutions: ["hira", "nhis-korea"] }),

  p({ id: "paper-kim-anticancer-pricing-reimbursement-korea-erpor-2021", name: "Trends in the pricing and reimbursement of new anticancer drugs in South Korea",
    tldr: "Thirty-two new cancer drugs reviewed in Korea between 2017 and 2020 took on average 36.7 months to reach the insurance list, and the drugs listed at lower prices relative to other countries were listed faster.",
    summary: "Anticancer drugs among new drugs reviewed between January 2017 and March 2020 were analysed for reimbursement coverage, time to listing and listing price after the introduction of alternative pricing and reimbursement pathways. Thirty-two drugs were included. Average time to listing was 36.7 months. The listing price was 12.6 to 90.2 per cent of the average adjusted price in seven reference countries, and the ratio of listing price to the external reference price correlated with time to listing (Pearson r -0.37, p 0.035).",
    journal: "Expert Review of Pharmacoeconomics and Outcomes Research", year: 2021, doi: "10.1080/14737167.2021.1860023", pmid: "33275463",
    authors: "Kim S, Kim J, Cho H, Lee K, Ryu C, Lee JH", paperType: "observational", participants: 32,
    findings: ["Average time to listing 36.7 months for 32 anticancer drugs reviewed 2017 to 2020.", "Listing price 12.6 to 90.2 per cent of the seven-country adjusted average.", "Lower relative price correlated with faster listing (r -0.37, p 0.035)."],
    whatItMeans: "In this period a new cancer drug took on average about three years to reach the Korean insurance list, and drugs priced lower against other countries were listed faster.",
    caveats: ["Time to listing measured for drugs that were listed; drugs never listed are outside the average.", "The period precedes the 2024 rule changes on flexible thresholds."],
    links: [{ label: "Expert Rev Pharmacoecon Outcomes Res 2021", url: "https://doi.org/10.1080/14737167.2021.1860023" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/33275463/" }],
    institutions: ["hira"] }),
];

import type { CountryDive } from "@/data/country-dive";

/**
 * The Philippines deep dive: the hand-written cards for /countries/ph/ (wave 4). Every figure was read from the raw
 * text of its source, not from a summary of it: the National Integrated Cancer Control Act (Republic Act 11215) and
 * the Universal Health Care Act (Republic Act 11223) from the Lawphil copies; PhilHealth's benefits page, its news
 * release on the breast cancer package and Circulars 2024-0007, 2025-0014, 2025-0025 and 2025-0027 (pdftotext);
 * the Department of Health and Department of Budget and Management Joint Memorandum Circular 2023-0001 on the Cancer
 * Assistance Fund and FDA Circular 2022-004-A, both scanned and read by OCR; the 2010 Philippine Cancer Facts and
 * Estimates and the Department of Health's 2024 report on population-based registries, both hosted by the Philippine
 * Cancer Society; and the Philippine Statistics Authority's 2023 causes-of-death release, read from an Internet
 * Archive copy because psa.gov.ph answered 403. The Department of Health's site also answered 403 and the Health
 * Technology Assessment Council's did not answer; both are named under `gaps`.
 */
const RA_11215 = "https://lawphil.net/statutes/repacts/ra2019/ra_11215_2019.html";
const RA_11223 = "https://lawphil.net/statutes/repacts/ra2019/ra_11223_2019.html";
const PH_BENEFITS = "https://www.philhealth.gov.ph/benefits/";
const PC_2024_0007 = "https://www.philhealth.gov.ph/circulars/2024/PC2024-0007.pdf";
const PH_BREAST_NEWS = "https://www.philhealth.gov.ph/news/up/article/2024/news_662705cc8e1ef.php";
const PC_2025_0014 = "https://www.philhealth.gov.ph/circulars/2025/PC2025-0014.pdf";
const PC_2025_0025 = "https://www.philhealth.gov.ph/circulars/2025/PC2025-0025.pdf";
const PC_2025_0027 = "https://www.philhealth.gov.ph/circulars/2025/PC2025-0027.pdf";
const PTV_SCREENING = "https://ptvnews.ph/philhealth-to-cover-outpatient-cancer-screening-tests-starting-aug-14/";
const PH_ADB_2025 = "https://events.development.asia/system/files/inspire_philhealth_cancer-coverage_9-july-2025-1.pdf";
const JMC_CAF = "https://www.dbm.gov.ph/wp-content/uploads/Issuances/2023/Joint-Memorandum-Circular/JOINT-MEMORANDUM-CIRCULAR-NO.-2023-001-DATED-SEPTEMBER-18-2023.pdf";
const FC_2022_004_A = "https://www.fda.gov.ph/wp-content/uploads/2024/02/FDA-Circular-No.2022-004-A.pdf";
const FC_2022_004 = "https://www.fda.gov.ph/fda-circular-no-2022-004-implementing-guidelines-on-the-abridged-and-verification-review-pathways-for-new-drug-registration-applications-in-accordance-with-administrative-order-no-2020-0045/";
const FDA_DRAFT_2021 = "https://web.archive.org/web/20210929054353/https://www.fda.gov.ph/draft-for-comments-implementation-of-abridged-and-verification-review-pathways-for-new-drug-initial-registration-and-post-approval-changes-applications-of-drug-products-including-vaccines-and-bio/";
const TRADE_GOV = "https://www.trade.gov/market-intelligence/philippines-pharmaceuticals";
const PBCR_2024 = "https://www.philcancer.org.ph/images/pdf/as%20of%20Sept%202025/FINAL%20Expansion%20of%20the%20Population-Based%20Cancer%20Registries%20in%20the%20Philippines%202024%20Terminal%20Report.pdf";
const PCFE_2010 = "https://www.philcancer.org.ph/images/pdf/data/2010-Philippine-Cancer-Facts-Estimates.pdf";
const PCS_REGISTRY = "https://www.philcancer.org.ph/about-us/services/cancer-registry";
const PSA_COD_2023 = "https://web.archive.org/web/20250521050443/https://psa.gov.ph/system/files/vsd/2_Press%20Release_2023%20Cause%20of%20Death%20Statistics_as%20of%2031%20July%202024_ONS-signed.pdf";
const PSA_COD_2025 = "https://tribune.net.ph/2026/03/28/heart-disease-remains-top-killer-in-philippines-psa";
const GMA_COD_2025 = "https://www.gmanetwork.com/news/scitech/technology/989341/ischemic-heart-disease-death-ph-psa/story/";
const CIDS_CET = "https://cids.up.edu.ph/wp-content/uploads/2026/05/Estimating-the-Cost-Effectiveness-Threshold-for-the-Philippines_A-Supply-Side-Approach.pdf";
const GMA_PCC = "https://www.gmanetwork.com/news/topstories/metro/899926/philippine-cancer-center-breaks-ground-in-quezon-city/story";
const GMA_HPV = "https://www.gmanetwork.com/news/topstories/nation/933272/doh-to-offer-free-hpv-vaccines-to-female-elementary-students/story";
const BW_HPV = "https://www.bworldonline.com/?p=664313";
const CAMBIA_JJCO = "https://doi.org/10.1093/jjco/hyaf139";
const CAMBIA_CCC = "https://doi.org/10.1007/s10552-025-01969-6";
const TING_JGO = "https://doi.org/10.1200/jgo.19.00332";
const EALA_JGO = "https://doi.org/10.1200/go.22.00138";
const CHYE_BMJGH = "https://doi.org/10.1136/bmjgh-2024-016402";
const MYINT_WHR = "https://doi.org/10.1089/whr.2024.0011";

export const PH_DIVE: CountryDive = {
  iso2: "PH",
  iso3: "PHL",
  name: "the Philippines",
  flag: "🇵🇭",
  asOf: "2026-11-04",
  title: "Cancer in the Philippines",
  description:
    "Cancer in the Philippines from Philippine sources: IARC's estimate of 149,852 new cancers in 2024 against 72,855 registered deaths from neoplasms in 2023 (a provisional count), the two Metro Manila registries that the national figures rest on, the 2019 cancer law, PhilHealth's Z Benefits including a breast cancer package of up to P1.4 million, the Cancer Assistance Fund and free cancer medicines at government hospitals, the FDA's reliance routes and the law's one-year licensing limit for cancer medicines, and outpatient screening tests paid by PhilHealth since August 2025.",
  lede:
    "The Philippines passed a National Integrated Cancer Control Act in 2019 that made cancer a notifiable disease, created a Cancer Assistance Fund and a national cancer centre, and treats people with cancer as persons with disabilities under the law. Every Filipino is enrolled in PhilHealth, the state insurer, which pays fixed packages for five named cancers and since August 2025 for outpatient screening tests, while free cancer medicines not yet covered by PhilHealth are given through government hospitals.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for the Philippines is 149,852 new cancers and 86,338 deaths in 2024, including 802 non-melanoma skin cancers (149,050 without them), an age-standardised incidence rate of 149.7 per 100,000 and a mortality rate of 88.5, with a 15.3 per cent risk of developing cancer before age 75. GLOBOCAN's incidence for the Philippines is built from subnational registry rates applied to the 2024 population (method 2b); its deaths come from trends in national death rates projected to 2024 (method 1). The country's own figures are lower and older. The latest national estimate from its registries that OnCo could read, the 2010 Philippine Cancer Facts and Estimates, projected 82,468 new cancers and 51,808 deaths for 2010, and its authors state that those estimates are based on GLOBOCAN 2008; a 2015 edition exists but could not be found. The Philippine Statistics Authority counted 72,855 registered deaths from neoplasms in 2023, provisionally, 10.7 per cent of all registered deaths; those are registrations without adjustment for under-registration, and deaths of Filipinos abroad are not included. GLOBOCAN's leading cancers are breast (28,124), colorectum (17,462), lung (15,312), prostate (9,195) and liver (8,638); lung leads the estimated deaths (11,715), followed by breast (11,160).",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in the Philippines",
      aside: { label: "Philippine Cancer Society: Manila Cancer Registry", url: PCS_REGISTRY },
      cards: [
        {
          id: "shape",
          title: "Breast cancer is the commonest cancer and lung cancer the commonest cause of cancer death",
          plain:
            "Cancer is the second commonest cause of registered death in the Philippines after heart disease: 72,855 deaths in 2023, 10.7 per cent of registered deaths. IARC estimates about 150,000 new cancers in 2024, led by breast, bowel and lung cancer, then prostate and liver cancer. The country's own registry estimates are older and lower.",
          detail:
            "The Philippine Statistics Authority's provisional release of 26 September 2024 counts 127,371 deaths from ischaemic heart disease (18.7 per cent of registered deaths), 72,855 from neoplasms (10.7 per cent) and 68,708 from cerebrovascular disease in 2023, the same top three as in 2022. Later provisional releases, as reported in the press, count 51,904 neoplasm deaths in January to September 2025 (11.6 per cent) and 64,864 in January to November 2025 (11.4 per cent), with a final report for 2025 due in January 2027. GLOBOCAN 2024 puts breast cancer first with 28,124 new cases and 11,160 deaths, colorectal cancer second (17,462 cases) and lung cancer third (15,312 cases, 11,715 deaths). GLOBOCAN estimates 7,829 cervical cancers. The 2010 Philippine Cancer Facts and Estimates, written by the Manila and Rizal registries, ranked breast, lung, liver, colorectal and cervical cancer as the five commonest; liver cancer was 7,331 of its 82,468 cases and is 8,638 of GLOBOCAN's 149,852.",
          links: [
            { label: "Philippine Statistics Authority: 2023 causes of death, provisional (Internet Archive, PDF)", url: PSA_COD_2023 },
            { label: "Daily Tribune: PSA causes of death January to September 2025, 28 March 2026", url: PSA_COD_2025 },
            { label: "GMA News: PSA causes of death January to November 2025, 28 May 2026", url: GMA_COD_2025 },
            { label: "2010 Philippine Cancer Facts and Estimates (PDF)", url: PCFE_2010 },
          ],
        },
        {
          id: "registries",
          title: "How the Philippines counts: two Metro Manila registries, and a national registry still being built",
          plain:
            "The Philippines has no registry that counts every cancer in the country. Its incidence figures come from two population-based registries covering Metro Manila and Rizal province, run by the Philippine Cancer Society and the Department of Health. The 2019 law requires a national registry, every hospital to keep its own, and cancer to be reported to the Department of Health.",
          detail:
            "The Department of Health's 2024 terminal report names the Philippine Cancer Society's Manila Cancer Registry (Manila, Quezon City, Pasay and Caloocan, 266.5 square kilometres) and the Department of Health Rizal Cancer Registry (the original province of Rizal, 1,343 square kilometres, launched in 1974) as the country's two high-quality population-based registries; registries once run in Cebu and Davao were discontinued. During the project the two Metro Manila registries were still collecting cases diagnosed in 2018 to 2022, the Cebu and Davao registries began collecting for 2023 to 2027, and a method was proposed for linking registry cases with the Philippine Statistics Authority's death records, which registries need to measure survival. The National Integrated Cancer Control Act makes adult and childhood cancer notifiable, requires every hospital and clinic to keep a cancer registry, and makes submitting its data to the Department of Health a condition of renewing a hospital's licence to operate (Sections 28 to 30). The Philippine Cancer Society says Manila registry data appeared in IARC's Cancer Incidence in Five Continents from Volume VI (1983 to 1987 data).",
          links: [
            { label: "DOH: The Expansion of Population-Based Cancer Registries in the Philippines, 2024 terminal report (PDF)", url: PBCR_2024 },
            { label: "Philippine Cancer Society: Manila Cancer Registry", url: PCS_REGISTRY },
            { label: "Republic Act 11215, Sections 28 to 30 (Lawphil)", url: RA_11215 },
          ],
        },
        {
          id: "treatment-delay",
          title: "Measured from the Rizal registry: one patient in five waited more than 90 days for treatment",
          plain:
            "Two 2025 studies of the Department of Health's Rizal Cancer Registry measured how long patients waited from diagnosis to their first cancer treatment. About a third waited more than 30 days and one in five more than 90 days, and a wait of more than 90 days was linked to a higher risk of death within five years for breast and cervical cancer.",
          detail:
            "Among 20,654 patients diagnosed from 1990 to 2012 with ten common cancers who received treatment, 35.1 per cent waited more than 30 days, 25.2 per cent more than 60 days and 20.0 per cent more than 90 days; longer waits were more likely for patients aged 0 to 19, men, those treated at non-private hospitals, those with more advanced cancer and those whose first treatment was not surgery. Among 21,740 patients diagnosed from 2000 to 2017 and followed to 2022, a wait of more than 90 days carried a five-year mortality risk ratio of 1.09 (95 per cent confidence interval 1.04 to 1.14) against a wait under 30 days, with the association significant for breast and cervical cancer and for cancer that had not spread, not for metastatic cancer. These are the registry's own patients in Rizal and part of Metro Manila. A 2022 count of specialists found 348 medical oncologists and 99 radiation oncologists for almost 110 million people, with five of 17 regions having no radiation oncologist, which is part of the distance patients outside Metro Manila travel.",
          links: [
            { label: "Cambia et al., Burden of prolonged treatment delay (Cancer Causes Control 2025)", url: CAMBIA_CCC },
            { label: "Cambia et al., Treatment delay and 5-year mortality (Jpn J Clin Oncol 2025)", url: CAMBIA_JJCO },
            { label: "Eala et al., Geographic distribution of cancer care providers (JCO Glob Oncol 2022)", url: EALA_JGO },
          ],
        },
      ],
      tables: [
        {
          id: "pcfe-2010",
          title: "Estimated new cancers and deaths in the Philippines in 2010, by site",
          caption: "Projected numbers for 2010, both sexes, from the 2010 Philippine Cancer Facts and Estimates (Manila Cancer Registry and Rizal Cancer Registry), Table 3.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "men", label: "New cases, men", numeric: true },
            { key: "women", label: "New cases, women", numeric: true },
            { key: "cases", label: "New cases, both sexes", numeric: true },
            { key: "deaths", label: "Deaths, both sexes", numeric: true },
          ],
          rows: [
            { site: "All sites except skin", men: 39012, women: 43456, cases: 82468, deaths: 51808 },
            { site: "Breast", men: null, women: 12262, cases: 12262, deaths: 4371 },
            { site: "Lung", men: 8772, women: 2686, cases: 11458, deaths: 9184 },
            { site: "Liver", men: 5522, women: 1809, cases: 7331, deaths: 6819 },
            { site: "Colon and rectum", men: 3208, women: 2579, cases: 5787, deaths: 3060 },
            { site: "Cervix uteri", men: null, women: 4812, cases: 4812, deaths: 1984 },
            { site: "Leukaemia", men: 1669, women: 1484, cases: 3153, deaths: 2609 },
            { site: "Stomach", men: 1920, women: 1209, cases: 3129, deaths: 2274 },
            { site: "Prostate", men: 2712, women: null, cases: 2712, deaths: 1410 },
            { site: "Brain and nervous system", men: 1236, women: 1000, cases: 2236, deaths: 1855 },
            { site: "Ovary", men: null, women: 2165, cases: 2165, deaths: 1016 },
          ],
          note: "These are projections for the whole country, not counts; the registry authors state that their 2010 estimates are based on GLOBOCAN 2008. They are the latest national estimates from the registries that OnCo could read; the 2015 edition, which PhilHealth still cited in 2025, could not be found online. Compare GLOBOCAN 2024 below.",
          sources: [{ label: "2010 Philippine Cancer Facts and Estimates, Table 3 (PDF)", url: PCFE_2010 }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: PhilHealth for everyone, with fixed packages for named cancers",
      aside: { label: "PhilHealth: benefits", url: PH_BENEFITS },
      cards: [
        {
          id: "philhealth",
          title: "Every Filipino is a PhilHealth member, and new benefits must pass health technology assessment",
          plain:
            "Since the Universal Health Care Act of 2019, every Filipino citizen is automatically a member of PhilHealth, the state insurer. People in work pay premiums and the government pays for everyone else. PhilHealth pays hospitals fixed amounts per case, and any new benefit package must have a positive recommendation from the Health Technology Assessment Council.",
          detail:
            "Republic Act 11223, approved 20 February 2019, states that every Filipino citizen shall be automatically included in the National Health Insurance Program and that failure to pay premiums shall not prevent anyone from using its benefits. Direct contributors (employees, the self-employed, migrant workers) pay a premium that the Act's schedule sets at 5 per cent of monthly income for 2024 and 2025, between an income floor of P10,000 and a ceiling of P100,000; the national government pays the premiums of indirect contributors. The National Integrated Cancer Control Act (Section 21) directs PhilHealth to expand its packages to cover screening, diagnosis, treatment, supportive care, survivorship, rehabilitation and end-of-life care for all types and stages of cancer in adults and children, through a prioritisation process such as health technology assessment, and to make both its benefits and the Cancer Assistance Fund available at public and private licensed cancer centres. PhilHealth pays radiotherapy at P3,900 a session with cobalt and P5,850 with a linear accelerator. A PhilHealth presentation of July 2025 described palliative and hospice care as still under development, and packages for lung, liver and ovarian cancer services as in development.",
          links: [
            { label: "Republic Act 11223, Universal Health Care Act, Sections 5 to 10 (Lawphil)", url: RA_11223 },
            { label: "Republic Act 11215, Section 21 (Lawphil)", url: RA_11215 },
            { label: "PhilHealth: benefits and radiotherapy case rates", url: PH_BENEFITS },
            { label: "PhilHealth: coverage for cancer services, presentation of 9 July 2025 (PDF)", url: PH_ADB_2025 },
          ],
        },
        {
          id: "z-benefits",
          title: "The Z Benefits: fixed packages for five cancers, with breast cancer raised to P1.4 million in 2024",
          plain:
            "PhilHealth's Z Benefits pay a set amount for the whole course of treatment of named conditions at contracted hospitals. For cancer they cover breast, cervical, colorectal and prostate cancer and standard-risk leukaemia in young children. In March 2024 the breast cancer package was raised from P100,000 to up to P1.4 million and extended to every stage.",
          detail:
            "PhilHealth Circular 2024-0007, effective 30 March 2024, rewrote the breast cancer package, first introduced with the Z Benefits in 2012, following PhilHealth Board Resolution 2883 of 2024. It covers clinical stages 0 to IV, including patients already in treatment, from diagnostic tests and HER2 testing through surgery, hormone therapy, chemotherapy and surveillance; 1,000,008 pesos of it is for trastuzumab, paid in three tranches of 333,336 pesos, each six cycles. PhilHealth said no co-payment may be charged to patients in ward accommodation, and that 21 health facilities were contracted for the package when it announced the change in April 2024. The other cancer packages on PhilHealth's benefits page are acute lymphoblastic leukaemia at standard risk in children aged 1 to under 10 (P500,000), cervical cancer treated by chemoradiation or surgery (P120,000 with cobalt and low-dose brachytherapy, P175,000 with a linear accelerator and high-dose brachytherapy), low to intermediate risk prostate cancer in men up to 70 (P100,000) and colon and rectal cancer by stage (P150,000 to P400,000). At the Philippine General Hospital, 251 patients treated under the colorectal package in 2016 to 2018 had a three-year survival probability of 70 per cent, and 75 per cent kept to their treatment plan.",
          links: [
            { label: "PhilHealth Circular 2024-0007: Z Benefits Package for Breast Cancer (PDF)", url: PC_2024_0007 },
            { label: "PhilHealth: breast cancer benefit now up to P1.4 million, 6 April 2024", url: PH_BREAST_NEWS },
            { label: "PhilHealth: Z Benefits on the benefits page", url: PH_BENEFITS },
            { label: "Ting et al., colorectal Z package at the pilot site (JCO Glob Oncol 2020)", url: TING_JGO },
          ],
        },
        {
          id: "cancer-assistance-fund",
          title: "The Cancer Assistance Fund and free cancer medicines at government hospitals",
          plain:
            "For costs PhilHealth does not cover, the 2019 law created a Cancer Assistance Fund run by the Department of Health. It pays for screening, diagnosis and treatment of eight priority groups of cancers at listed access sites. Separately, the Department of Health runs a programme that gives patients free cancer and palliative care medicines not yet covered by PhilHealth, and its hospitals are the core of the fund's access sites.",
          detail:
            "Joint Memorandum Circular 2023-0001 of the Department of Health and the Department of Budget and Management, signed in September 2023, sets the rules for the fund from fiscal year 2023. Its eight priority cancer types are breast cancer; childhood cancers; gynaecological cancers; liver, colorectal and other digestive cancers; adult blood cancers; head and neck cancers including thyroid; lung cancer; and prostate, kidney and bladder cancers. Access sites are Department of Health hospitals and other government hospitals that meet the requirements of Administrative Order 2022-0013 on the Cancer and Supportive-Palliative Medicines Access Program, defined as the mechanism for giving free medicines not yet covered by PhilHealth, plus Department of Health cancer specialty centres and other health facilities that meet the department's minimum criteria; non-Department of Health hospitals receive the money by fund transfer. For cancer cases the fund is to be charged before the Medical Assistance to Indigent Patients programme, and it complements PhilHealth and the Malasakit centres. The department is to report the fund's disbursements to the Office of the President and Congress each quarter. The circular cites a study in which many patients had spent at least P181,000 on cancer care after 12 months. The current list of access sites, the medicines on the programme's list and the fund's recent budgets were not read; see gaps.",
          links: [
            { label: "DOH and DBM Joint Memorandum Circular 2023-0001 on the Cancer Assistance Fund (PDF, scanned)", url: JMC_CAF },
            { label: "Republic Act 11215, Section 20 (Lawphil)", url: RA_11215 },
          ],
        },
      ],
      tables: [
        {
          id: "z-benefit-cancer",
          title: "PhilHealth Z Benefits packages for cancer",
          caption: "Package ceiling in Philippine pesos, as listed on PhilHealth's benefits page on 4 November 2026.",
          columns: [
            { key: "pkg", label: "Package" },
            { key: "who", label: "Who qualifies (summary)" },
            { key: "amount", label: "Up to, pesos", numeric: true },
          ],
          rows: [
            { pkg: "Breast cancer", who: "Clinical stage 0 to IV", amount: 1400000 },
            { pkg: "Acute lymphoblastic leukaemia, standard risk", who: "Children aged 1 to under 10, white cell count under 50,000/mcL, no CNS or testicular involvement", amount: 500000 },
            { pkg: "Rectal cancer, stage II to III", who: "Fit for treatment (ASA I or II)", amount: 400000 },
            { pkg: "Colon cancer, stage II to III (high risk)", who: "Fit for treatment (ASA I or II)", amount: 300000 },
            { pkg: "Cervical cancer, linear accelerator and high-dose brachytherapy", who: "No previous chemotherapy or radiotherapy, plan from a gynaecological oncologist", amount: 175000 },
            { pkg: "Colon or rectal cancer, stage I to II (low risk)", who: "Fit for treatment (ASA I or II)", amount: 150000 },
            { pkg: "Cervical cancer, cobalt and low-dose brachytherapy, or primary surgery (stage IA1 to IIA1)", who: "As above", amount: 120000 },
            { pkg: "Prostate cancer, low to intermediate risk", who: "Men up to 70, localised disease, PSA up to 20 ng/ml", amount: 100000 },
          ],
          note: "Ceilings for the whole package at a contracted hospital, not what a patient pays. The breast package is set out in PhilHealth Circular 2024-0007; the circulars behind the other packages were not read. The packages list a signed Member Empowerment form among their criteria.",
          sources: [
            { label: "PhilHealth: benefits page, Z Benefits", url: PH_BENEFITS },
            { label: "PhilHealth Circular 2024-0007 (PDF)", url: PC_2024_0007 },
          ],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Assessment",
      title: "How the Philippines decides what is paid for",
      aside: { label: "Republic Act 11223, Section 34 (Lawphil)", url: RA_11223 },
      cards: [
        {
          id: "htac",
          title: "A health technology assessment council whose positive recommendation is required by law",
          plain:
            "The Universal Health Care Act created a Health Technology Assessment Council to recommend what the Department of Health and PhilHealth pay for. Their investments in health technologies and new benefit packages must be based on its positive recommendations, judged on burden of disease, effectiveness, cost to households, cost-effectiveness and affordability.",
          detail:
            "Section 34 of Republic Act 11223 makes the assessment recommendatory to the Department of Health and PhilHealth but provides that investment in any health technology and development of any benefit package shall be based on its positive recommendations, with periodic review and reassessment as new evidence emerges. Its criteria are responsiveness to magnitude, severity and equity; safety and effectiveness, stated as each intervention having undergone a phase IV clinical trial with a systematic review and meta-analysis readily available; household financial impact; cost-effectiveness; and affordability and viability. The council sits within the Department of Health, may call on PhilHealth, the Food and Drug Administration, patient groups and clinical experts, must make the result of its deliberations public, and was to transition within five years of operating into an independent body attached to the Department of Science and Technology. A 2026 University of the Philippines discussion paper, one of whose authors is at the Department of Science and Technology's Health Technology Assessment Division, states that the country has no explicit cost-effectiveness threshold and estimates one at P84,317 to P209,410 per quality-adjusted life year, 36 to 89 per cent of 2024 GDP per head; its appendix lists the faecal immunochemical test for colorectal screening from age 45 as positively recommended by the council.",
          links: [
            { label: "Republic Act 11223, Section 34 (Lawphil)", url: RA_11223 },
            { label: "Gloria et al., Estimating the cost-effectiveness threshold for the Philippines, UP CIDS 2026 (PDF)", url: CIDS_CET },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the Philippine FDA and its reliance routes",
      aside: { label: "FDA Circular 2022-004-A (PDF, scanned)", url: FC_2022_004_A },
      cards: [
        {
          id: "fda-reliance",
          title: "Abridged and verification reviews for medicines already approved by reference regulators",
          plain:
            "The Philippine Food and Drug Administration can register a medicine already approved elsewhere through a shorter review. An abridged review relies on approval by one reference regulator and a verification review on approval by at least two. A circular dated February 2024 extended these routes to generic medicines, and reference regulators must meet the World Health Organization's maturity level 4.",
          detail:
            "Department of Health Administrative Order 2020-0045 established facilitated registration pathways, first applied to new drugs through FDA Circular 2022-004. FDA Circular 2022-004-A, dated 15 February 2024 and signed by Director General Samuel A. Zacate, extended them to generic drugs, which it says make up a substantial share of applications, and set the eligibility: abridged review when a product has been approved by one reference drug regulatory agency, verification review when approved by at least two. It added Korea's Ministry of Food and Drug Safety and the Saudi Food and Drug Authority as the fifteenth and sixteenth reference agencies, and requires a sworn assurance from the product owner that the product is the same in all respects as the one approved and has not been rejected or withdrawn by any reference agency for quality, safety or efficacy reasons. The US Commercial Service summarised the target times in April 2023 as no more than 45 working days for an abridged review and 30 for a verification review, from proof of payment with a complete dossier; a 2021 draft of the circular had proposed 90 and 45, and stated that approval by a reference agency does not oblige the FDA to approve. The FDA's own page for Circular 2022-004, read on 17 November 2026, gives the same times as the US summary, not more than 45 working days for an abridged review and 30 for a verification review.",
          links: [
            { label: "FDA Circular 2022-004-A, 15 February 2024 (PDF, scanned)", url: FC_2022_004_A },
            { label: "FDA Circular 2022-004: abridged and verification review pathways for new drugs", url: FC_2022_004 },
            { label: "US Commercial Service: Philippines pharmaceuticals, 26 April 2023", url: TRADE_GOV },
            { label: "FDA: 2021 draft for comments on abridged and verification review (Internet Archive)", url: FDA_DRAFT_2021 },
          ],
        },
        {
          id: "one-year-rule",
          title: "The cancer law's limit: no more than a year to license a cancer medicine",
          plain:
            "The 2019 cancer law requires the FDA to create a dedicated, streamlined process taking no more than one year to license innovator and generic cancer medicines, provided they meet quality checks and minimum standards such as being approved and used for cancer elsewhere. OnCo found no published figure for how long cancer medicines actually take.",
          detail:
            "Section 23 of Republic Act 11215 directs the Department of Health and other agencies to support early access to essential and innovative medicines, including quick access to drugs for compassionate use, and requires the FDA to create a dedicated and streamlined process, not exceeding one year, for licensing innovator and generic cancer medication, subject to quality checks and minimum standards such as approval and use for cancer treatment in other countries. Section 7 asks the National Integrated Cancer Control Council, on which the FDA's Director General sits, to recommend medicine access programmes covering innovative medicines and compassionate use. OnCo did not find an FDA report of median approval times for cancer medicines, or a published account of how the one-year process is run, but the search was limited: the FDA's own web pages refused our requests when this page was written (only its PDF files could be read), and when they answered on 17 November 2026 only the circular on the reliance routes was read. Registration is the first step: payment then depends on PhilHealth's packages or on the Department of Health's medicines access programme, each with its own process.",
          links: [
            { label: "Republic Act 11215, Sections 7 and 23 (Lawphil)", url: RA_11215 },
            { label: "Food and Drug Administration, Philippines", url: "https://www.fda.gov.ph" },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening: outpatient tests paid by PhilHealth since August 2025",
      aside: { label: "PhilHealth Circular 2025-0014 (PDF)", url: PC_2025_0014 },
      cards: [
        {
          id: "screening-package",
          title: "Mammograms, low-dose CT, liver tests and colonoscopy, requested by the primary care doctor",
          plain:
            "Since 14 August 2025 PhilHealth pays for six outpatient cancer screening tests with no co-payment, for breast, lung, liver and bowel cancer. The member's registered primary care doctor requests the test according to age and risk. PhilHealth's primary care benefit already covered selected screening tests, particularly for bowel and breast cancer.",
          detail:
            "PhilHealth announced on 8 August 2025 that the cover would start on 14 August, as PTV News reported. PhilHealth Circular 2025-0014 pays fixed rates to accredited screening facilities with no co-payment or balance billing in public or private facilities: mammogram P2,610, breast ultrasound P1,350, low-dose chest CT P7,220, alpha-fetoprotein P1,230, liver ultrasound P960, and screening colonoscopy P23,640. Its annex, citing the Department of Health's 2023 Omnibus Health Guidelines, lists mammogram or ultrasound for women aged 50 to 69 and high-risk women aged 40 to 49, low-dose CT yearly from age 50 for smokers, former smokers or people with a family history of lung cancer, colonoscopy every 10 years from age 50 or after a positive stool test, and alpha-fetoprotein with liver ultrasound every six months for people with hepatitis B or C, cirrhosis or other risk factors. Circular 2025-0025 sets bowel screening for adults aged 45 to 75 or with risk factors, with a yearly faecal immunochemical test and colonoscopy within nine months of a positive result; Circular 2025-0027 sets lung screening for adults aged 50 to 80 with at least 30 pack-years who smoke or quit within 15 years, or with a family history and a smoking history. The circular's rationale cites the Philippine Statistics Authority: cancer was the second leading cause of death, 11 per cent of recorded deaths in the first eight months of 2024.",
          links: [
            { label: "PhilHealth Circular 2025-0014: outpatient cancer screening tests (PDF)", url: PC_2025_0014 },
            { label: "PhilHealth Circular 2025-0025: colorectal cancer screening standards (PDF)", url: PC_2025_0025 },
            { label: "PhilHealth Circular 2025-0027: lung cancer screening standards (PDF)", url: PC_2025_0027 },
            { label: "PTV News: PhilHealth to cover outpatient cancer screening from 14 August, 8 August 2025", url: PTV_SCREENING },
          ],
        },
        {
          id: "cervix-and-hpv",
          title: "Cervical screening reached one woman in ten in 2022; HPV vaccination is offered free in schools",
          plain:
            "In the 2022 national household health survey about one woman in ten of reproductive age had been screened for cervical cancer, with screening far commoner among women with more education and money. The Department of Health offers girls in Grade 4 two free doses of the HPV vaccine at school.",
          detail:
            "An analysis of the 2022 Philippines National Demographic and Health Survey found that about 10 per cent of women of reproductive age (1,648 respondents) had been screened for cervical cancer, and that screening was more likely at ages 45 to 49, with higher education and in wealthier households. A 2022 review notes the absence of organised national breast and cervical screening programmes and that most patients are diagnosed at advanced stages. GMA News reported in January 2025 that the Department of Health was vaccinating Grade 4 girls in public schools through a free school-based programme, with the Secretary of Health putting the cost to the government at P4,000 a dose and P8,000 for the two doses, and with more than half a million given a first dose by 6 January 2025 against a target of over one million; in April 2025 a department medical officer said it expected to decide on a single-dose schedule, which the World Health Organization recommends, in the third or fourth quarter of 2025. Whether that decision was made was not confirmed. PhilHealth's July 2025 presentation lists the cervical cancer Z package among the benefits being expanded.",
          links: [
            { label: "Myint et al., cervical screening in the 2022 National Demographic and Health Survey (Womens Health Rep 2024)", url: MYINT_WHR },
            { label: "GMA News: DOH to offer free HPV vaccines to female elementary students, 18 January 2025", url: GMA_HPV },
            { label: "BusinessWorld: DOH considers single-dose HPV vaccine, 7 April 2025", url: BW_HPV },
            { label: "Ho et al., Breast and cervical cancer screening in the Philippines (Prev Med Rep 2022)", url: "https://doi.org/10.1016/j.pmedr.2022.101936" },
            { label: "PhilHealth: coverage for cancer services, presentation of 9 July 2025 (PDF)", url: PH_ADB_2025 },
          ],
        },
      ],
      tables: [
        {
          id: "screening-rates",
          title: "PhilHealth outpatient cancer screening packages",
          caption: "Fixed package rates in Philippine pesos and the indications listed in PhilHealth Circular 2025-0014 and its annex; PhilHealth announced that the cover would start on 14 August 2025.",
          columns: [
            { key: "test", label: "Test" },
            { key: "who", label: "Who and how often (annex A)" },
            { key: "rate", label: "Package rate, pesos", numeric: true },
          ],
          rows: [
            { test: "Screening colonoscopy", who: "From age 50, or with risk factors, or after a positive stool test; every 10 years", rate: 23640 },
            { test: "Low-dose chest CT", who: "Aged 50 or over and a current or former smoker or with a family history of lung cancer; yearly", rate: 7220 },
            { test: "Mammogram", who: "Women 50 to 69, or 40 to 49 at high risk", rate: 2610 },
            { test: "Breast ultrasound", who: "As for mammogram; also women with breast symptoms", rate: 1350 },
            { test: "Alpha-fetoprotein", who: "Hepatitis B or C, cirrhosis, heavy alcohol use, diabetes, fatty liver disease; every 6 months", rate: 1230 },
            { test: "Liver ultrasound", who: "As for alpha-fetoprotein", rate: 960 },
          ],
          note: "No co-payment or balance billing in public or private facilities. The bowel and lung screening standards issued later in 2025 (Circulars 2025-0025 and 2025-0027) give ages 45 to 75 for bowel screening and 50 to 80 with at least 30 pack-years for lung screening. No figure for how many people have been screened under the package was found.",
          sources: [
            { label: "PhilHealth Circular 2025-0014 (PDF)", url: PC_2025_0014 },
            { label: "PhilHealth Circulars 2025-0025 and 2025-0027 (PDF)", url: PC_2025_0025 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What the Philippines does",
      title: "What the Philippines does that others do not",
      cards: [
        {
          id: "disability-rights",
          title: "People with cancer and survivors have the legal rights of persons with disabilities",
          plain:
            "The 2019 cancer law declares cancer patients, people living with cancer and cancer survivors to be persons with disabilities under the Magna Carta for Disabled Persons, with the same rights and privileges. It also requires government agencies to keep them free from discrimination at school, at work and in the community, and makes February National Cancer Awareness Month.",
          detail:
            "Section 25 of Republic Act 11215 provides that cancer patients, persons living with cancer and cancer survivors are considered persons with disabilities in accordance with Republic Act 7277, as amended, and Section 26 that they are accorded the same rights and privileges, with the Department of Social Welfare and Development to ensure that the benefits under that law are granted to them and the Department of Labor and Employment to promote work for those able to work. Section 22 requires a cancer control policy in every workplace, covering prevention including genetic counselling and testing through to palliative care, directs the Insurance Commission to require health maintenance organisations to cover genetic counselling and testing, screening, diagnostics and palliative care, and states that cancer-related absences shall be compensated by the sickness benefits of the Social Security System and the disability benefits of the Government Service Insurance System. Section 27 requires government agencies to ensure that people living with cancer and survivors are free from discrimination in school, workplace and community. OnCo did not read the implementing rules or the disability law itself, so which specific benefits a person with cancer can claim is not set out here.",
          links: [{ label: "Republic Act 11215, Sections 22 and 25 to 27 (Lawphil)", url: RA_11215 }],
        },
        {
          id: "one-law",
          title: "One law that ties the insurer, the regulator, the registry and a national cancer centre together",
          plain:
            "The National Integrated Cancer Control Act, signed on 14 February 2019, put cancer policy in one law: a council chaired by the Secretary of Health with patient representatives, a fund for treatment, duties on PhilHealth and the FDA, compulsory hospital registries and a Philippine Cancer Center. Ground was broken for the centre's 20-storey building in Quezon City in March 2024.",
          detail:
            "The National Integrated Cancer Control Council is attached to the Department of Health and chaired by the Secretary of Health; its members include the secretaries of social welfare, labour and the interior, the heads of PhilHealth and the Food and Drug Administration, two oncologists, and three representatives of cancer patient organisations appointed by the President, and it must produce a national roadmap with annual targets and report each year. The law also asks the Department of Health, with academic institutions, to provide subsidies and scholarships for training oncology professionals such as radiation oncologists, medical physicists and oncology nurses. Section 10 created the Philippine Cancer Center under the Department of Health, headed by an executive director, with other comprehensive cancer centres to be designated outside Metro Manila. GMA News reported the groundbreaking on 8 March 2024 on a 5,000 square metre lot inside the Blood Bank Complex in Quezon City, with each floor planned as a sub-specialty centre; whether it has opened was not confirmed. The Philippine General Hospital, run by the University of the Philippines Manila, describes itself as the national university hospital and national government referral centre, and has its own Cancer Institute.",
          links: [
            { label: "Republic Act 11215, Sections 5 to 14 (Lawphil)", url: RA_11215 },
            { label: "GMA News: Philippine Cancer Center breaks ground in Quezon City, 8 March 2024", url: GMA_PCC },
            { label: "Philippine General Hospital: Cancer Institute", url: "https://www.pgh.gov.ph/cancer-institute/" },
          ],
        },
        {
          id: "navigation",
          title: "Patient navigation written into law, and a modelled case for scaling it up",
          plain:
            "The cancer law defines patient navigation, individual help through every stage from before diagnosis onwards, and asks the Department of Health to set standards for it. A 2025 model of ACT NOW, a Philippine pilot that guides women from free breast checks to treatment, found it good value at about 60,700 pesos per year of healthy life saved.",
          detail:
            "Republic Act 11215 defines patient navigation as individualised assistance, through all phases of the cancer experience, offered to patients, families and carers to overcome health system barriers and reach timely medical and psychosocial care, and Section 9 asks for standards and guidelines for cancer-focused navigation. The ACT NOW pilot navigates women through free early detection, with yearly clinical breast examination and breast ultrasound for those at high risk (described in the paper as biannual), to treatment. An extended cost-effectiveness analysis published in 2025 modelled scaling it up for healthy women aged 40 to 69 over five years and estimated 60,711 pesos (1,098 US dollars) per disability-adjusted life year saved, below the 2022 GDP per head of 178,751 pesos, with 57 breast cancer deaths and eight financial catastrophes averted per 100,000 women. The authors note that the Philippines has reformed financial protection for breast cancer but has no national early detection and treatment programme.",
          links: [
            { label: "Republic Act 11215, Sections 3 and 9 (Lawphil)", url: RA_11215 },
            { label: "Chye et al., ACT NOW extended cost-effectiveness analysis (BMJ Glob Health 2025)", url: CHYE_BMJGH },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      cards: [
        {
          id: "trials-in-ph",
          title: "68 trials in OnCo's records have a site in the Philippines, almost all industry phase 3 trials",
          plain:
            "Of the trials in OnCo's records, 68 list a site in the Philippines, and 61 of them are phase 3. AstraZeneca and Merck Sharp & Dohme sponsor most of them, and lung cancer is the largest group. Several compare a proposed biosimilar with pembrolizumab or bevacizumab, and a few small trials list five or ten countries.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 17 November 2026: 68 trials list the Philippines among their countries, 61 phase 3, 4 phase 2 and 3 phase 2/3. ClinicalTrials.gov gives 40 as active and not recruiting, 14 recruiting, 12 completed and 2 terminated. AstraZeneca is lead sponsor of 27 and Merck Sharp & Dohme of 14; non-small cell lung cancer is the first-listed cancer for 24, triple-negative breast cancer for 5 and HER2-positive breast cancer, liver cancer and urothelial cancer for 4 each. They include FLAURA and FLAURA2 in EGFR-mutant lung cancer, CLEOPATRA, APHINITY and DESTINY-Breast09 in HER2-positive breast cancer, REFLECT and EMERALD-3 in liver cancer and CALLA in cervical cancer. At least four compare a proposed biosimilar with pembrolizumab or bevacizumab. The trial with the fewest countries, a phase 3 trial of acalabrutinib against chlorambucil with rituximab in untreated chronic lymphocytic leukaemia, lists five. A 2022 commentary notes that trials are concentrated in Luzon, especially Manila, and that the country lacks comprehensive patient and trial registries.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in the Philippines", url: "https://clinicaltrials.gov/search?locStr=Philippines&country=Philippines&cond=Cancer" },
            { label: "Eala et al., Cancer clinical trials in the Philippines (Cancer Causes Control 2022)", url: "https://doi.org/10.1007/s10552-022-01611-9" },
          ],
        },
        {
          id: "research-output",
          title: "Oncology research output: 165 papers in 2025 with authors based in the Philippines",
          plain:
            "OpenAlex counts 165 oncology papers with at least one author based in the Philippines in 2025, up from 130 in 2021, and 672 over the five years. The Department of Health's Rizal registry and the Philippine General Hospital are behind several of the studies on this page.",
          detail:
            "OpenAlex, counting works whose primary topic is oncology and counting a paper for every country among its authors' affiliations, gives the Philippines 130 works in 2021, 113 in 2022, 133 in 2023, 131 in 2024 and 165 in 2025, 672 in total, of which 502 are open access and 16 highly cited. OnCo's OpenAlex snapshot of 8 September 2026 also records 1,353 ClinicalTrials.gov studies of all conditions with a site in the Philippines. Studies from Philippine data on this page include two analyses of the Rizal Cancer Registry on treatment delay (2025), the Philippine General Hospital's review of the colorectal Z package (2020), a national count of cancer specialists by region (2022), an extended cost-effectiveness analysis of the ACT NOW breast cancer pilot (2025) and an analysis of cervical screening in the 2022 national household health survey. The Philippine Cancer Society's Manila Cancer Registry and the Rizal Cancer Registry prepared the 2010 Philippine Cancer Facts and Estimates with the cooperation of the Department of Health, the University of the Philippines Manila and the Finnish Cancer Registry.",
          links: [
            { label: "OpenAlex: works by country", url: "https://openalex.org" },
            { label: "2010 Philippine Cancer Facts and Estimates (PDF)", url: PCFE_2010 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "unreachable",
      title: "The Department of Health, the Statistics Authority and the HTA Council could not be read directly",
      plain:
        "doh.gov.ph and psa.gov.ph refused OnCo's requests with 403, and the Health Technology Assessment Council's site did not answer. The FDA's web pages refused them when this page was written and answered on 17 November 2026. Figures from them on this page come from their own PDF files, Internet Archive copies, the laws themselves and news reports, each named on its link.",
      detail:
        "The Philippine Statistics Authority's 2023 causes-of-death release was read from an Internet Archive copy; its 2025 figures were read from a Daily Tribune report, and a GMA News report of 64,864 neoplasm deaths covers January to November 2025, not the full year. The FDA's circular on the reliance routes was read from its PDF (scanned, read by OCR), while the base Circular 2022-004 with its target times was not found when this page was written; it was read on the FDA's own page on 17 November 2026 and gives the same times as the US Commercial Service. The Department of Health's Administrative Order 2022-0013 on the Cancer and Supportive-Palliative Medicines Access Program, its list of access sites and medicines, the implementing rules of the cancer law and the National Integrated Cancer Control Strategic Plan 2021 to 2030 were not read. The council's published recommendations on cancer medicines, and the Philippine National Formulary, were not read.",
      links: [
        { label: "Department of Health", url: "https://doh.gov.ph" },
        { label: "GMA News: PSA causes of death January to November 2025, 28 May 2026", url: GMA_COD_2025 },
        { label: "Philippine Statistics Authority: vital statistics (Internet Archive)", url: "https://web.archive.org/web/20260910134834/https://psa.gov.ph/statistics/vital-statistics" },
      ],
    },
    {
      id: "not-found",
      title: "Figures looked for and not found",
      plain:
        "OnCo could not find, from a source it could read, a national cancer incidence estimate from Philippine registries newer than 2010, population-based survival from recent years, the Cancer Assistance Fund's budget or how many patients it has helped, how many people have used the screening package, or measured approval times for cancer medicines.",
      detail:
        "The 2015 Philippine Cancer Facts and Estimates, which PhilHealth's 2025 bowel screening circular still cites, could not be found online; the registries' recent incidence tables were not published in the 2024 terminal report, which states that cases for 2018 to 2022 were still being collected. The 2010 edition gives five-year relative survival for breast cancer in Metro Manila residents diagnosed in 1993 to 2002 of 59 per cent, which is too old to describe care today. The fund's appropriations in recent budgets, the number of access sites and patients served, and PhilHealth's membership counts and claims for the cancer packages were not found from a primary source. For HPV vaccination, the World Health Organization's immunisation data, read on 17 November 2026, record administrative coverage in girls of 72.28 per cent for a first dose in 2024 (566,106 doses against a target of 783,229) and 6.73 per cent for a final dose (52,706 doses), and 24.36 per cent for a first dose in 2025 (254,662 doses against a target of 1,045,306); the 2025 final-dose rows are blank. Whether the Philippine Cancer Center has opened, and whether the Health Technology Assessment Council has become independent of the Department of Health, were not confirmed.",
      links: [
        { label: "DOH: 2024 terminal report on population-based cancer registries (PDF)", url: PBCR_2024 },
        { label: "PhilHealth Circular 2025-0025 (PDF)", url: PC_2025_0025 },
        { label: "World Health Organization: immunisation coverage data, HPV rows for the Philippines", url: "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'PHL'%20and%20contains(ANTIGEN,'HPV')" },
      ],
    },
  ],
  institutions: ["doh-philippines", "philhealth", "fda-philippines", "philippine-hta-council", "philippine-cancer-center", "doh-rizal-cancer-registry", "philippine-cancer-society", "philippine-general-hospital"],
  companies: ["astrazeneca", "merck", "amgen", "roche-genentech"],
  drugs: ["trastuzumab"],
  trials: [
    "flaura", "flaura2", "pacific-2", "lux-lung-3", "empower-lung-1", "nct03706690", "nct05526755", "nct02485652", "nct04736173", "nct05607550",
    "nct06348199", "nct06430866", "nct03390686", "cleopatra", "aphinity", "patricia", "destiny-breast09", "destiny-breast11", "tropion-breast02",
    "tropion-breast05", "capitello-281", "reflect", "emerald-3", "calla", "niagara", "ev-303", "litespark-012", "act-in-sarc", "nct04075292", "nct07007312",
  ],
  papers: [
    "paper-cambia-prolonged-treatment-delay-rizal-ccc-2025", "paper-cambia-treatment-delay-mortality-rizal-jjco-2025", "paper-ting-colorectal-z-package-pgh-jgo-2020",
    "paper-eala-oncologist-distribution-philippines-jgo-2022", "paper-chye-act-now-breast-cea-bmjgh-2025", "paper-myint-cervical-screening-ndhs-philippines-2024",
  ],
  people: ["gerardo-legaspi"],
  how:
    "Every card was written from the raw text of Philippine sources: the National Integrated Cancer Control Act and the Universal Health Care Act (Lawphil copies), PhilHealth's benefits page, news release and Circulars 2024-0007, 2025-0014, 2025-0025 and 2025-0027, the Department of Health and Department of Budget and Management circular on the Cancer Assistance Fund and FDA Circular 2022-004-A (both scanned and read by OCR), FDA Circular 2022-004 from the FDA's own page (read on 17 November 2026), the Department of Health's 2024 report on population-based registries, the 2010 Philippine Cancer Facts and Estimates, and the Philippine Statistics Authority's 2023 causes-of-death release (Internet Archive). News reports were used for events with no primary record OnCo could reach, and are named on their links. Papers were resolved through Europe PMC and their abstracts read. The trial count comes from ClinicalTrials.gov participation data in OnCo's graph. The new records for this page are the Department of Health, PhilHealth, the FDA, the Health Technology Assessment Council, the Philippine Cancer Center, the Rizal Cancer Registry and six papers; the Philippine Cancer Society and the Philippine General Hospital were already in OnCo.",
  verify:
    "The national incidence figures are estimates, IARC's from subnational registry rates and the registries' own from 2010; the registered death counts are provisional and exclude Filipinos who die abroad. PhilHealth's package amounts and screening rules change by circular, so check the current circular and ask the hospital's Z Benefits coordinator what applies. Review times are the targets set in FDA Circular 2022-004, not measured times. Before relying on free medicines from the Department of Health's programme, ask the hospital whether it is an access site and whether the medicine is on its list.",
  verifyLinks: [
    { label: "PhilHealth: benefits", url: PH_BENEFITS },
    { label: "PhilHealth: circulars", url: "https://www.philhealth.gov.ph/circulars/" },
    { label: "Republic Act 11215, National Integrated Cancer Control Act (Lawphil)", url: RA_11215 },
    { label: "Food and Drug Administration, Philippines", url: "https://www.fda.gov.ph" },
    { label: "Philippine Cancer Society", url: "https://www.philcancer.org.ph" },
  ],
};

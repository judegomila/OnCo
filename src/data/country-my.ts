import type { CountryDive } from "@/data/country-dive";

/**
 * Malaysia deep dive: the hand-written cards for /countries/my/ (wave 4). Every figure was read from the raw text of
 * its source (pdftotext for PDFs, the HTML itself for pages), Malay sources in Malay: Institut Kanser Negara's Malaysia
 * National Cancer Registry Report 2017-2021 (December 2025) and its e-Summary (July 2024), the Ministry of Health's
 * National Strategic Plan for Cancer Control Programme 2021-2025, the Fees (Medical) Order 1982 schedule and a 2016
 * parliamentary reply on cancer charges, the Medicines Formulary guidelines (2025) and dossier guidelines (2015),
 * NPRA's registration guidance (July 2026), its 2023 directive and 2026 pilot notice on reliance routes, two OpERA
 * studies of approval times (resolved through Europe PMC), ProtectHealth's PeKa Sihat page and its 2026 tender deck
 * for a cancer drug list, the 2018 MySCan press statement, a Star report of a written parliamentary reply (November
 * 2024), and the ClinicalTrials.gov record of the LEDANG trial. www.moh.gov.my answered 403; gaps are named below.
 */
const MNCR = "https://nci.moh.gov.my/images/pdf_folder/Malaysia-National-Cancer-Registry-Report-2017-2021-laterst-2026.pdf";
const MNCR_SUMMARY = "https://nci.moh.gov.my/images/pdf/SUMMARY-OF-MALAYSIA-NATIONAL-CANCER-REGISTRY-REPORT-2017-2021.pdf";
const IKN_REPORTS = "https://nci.moh.gov.my/index.php/penerbitan/laporan";
const MYSCAN = "https://drive.google.com/file/d/1qlc4AVQO2OQR6VhPTFrUO5T6mMGkkbbf/view";
const NSPCCP = "https://www.iccp-portal.org/system/files/plans/National_Strategic_Plan_for_Cancer_Control_Programme_2021-2025.pdf";
const FEES = "https://hq.moh.gov.my/ohp/images/pdf/charge/takrif_dan_jadual1982.pdf";
const PARL_2016 = "https://pardocs.sinarproject.org/documents/2016-may-parliamentary-session/oral-questions-soalan-lisan/2016-05-19-parliamentary-replies/soalan-12.pdf";
const STAR_2024 = "https://www.thestar.com.my/news/nation/2024/11/06/ministry-unveils-major-plans-for-cancer-care-services";
const PEKA = "https://protecthealth.com.my/peka-sihat/";
const MHIT_CDL = "https://protecthealth.com.my/wp-content/uploads/2026/04/Open-Day-MHIT.pdf";
const FUKKM_GUIDE = "https://pharmacy.moh.gov.my/sites/default/files/document-upload/buku-panduan-formulari-ubat-kementerian-kesihatan-malaysia-v3.pdf";
const FUKKM_DOSSIER = "https://pharmacy.moh.gov.my/sites/default/files/document-upload/guidelines-submission-dossier-listing-ministry-health-medicines-formulary-finalised.pdf";
const MAHTAS = "https://mymahtas.moh.gov.my/index.php/about-us/info-korporat";
const NPRA_APP3 = "https://npra.gov.my/~npraweb/easyarticles/images/users/1153/drgd_appendices/APPENDIX-3-Guidelines-on-Registration-of-New-Drug-Products.pdf";
const NPRA_FRP = "https://npra.gov.my/easyarticles/images/users/1051/Direktif--Guideline-FRP-Nov-2023.pdf";
const NPRA_PILOT = "https://npra.gov.my/index.php/en/component/content/article/225-english/1527850-new-route-under-the-facilitated-registration-pathway-frp-a-one-year-pilot-study-commencing-2-may-2026.html";
const OPERA_2025 = "https://doi.org/10.1007/s43441-025-00846-3";
const OPERA_2020 = "https://doi.org/10.1007/s43441-020-00140-4";
const ACTION = "https://doi.org/10.1186/s12916-015-0433-1";
const LEDANG = "https://clinicaltrials.gov/study/NCT07050043";
const CRM = "https://clinicalresearch.my/";

export const MY_DIVE: CountryDive = {
  iso2: "MY",
  iso3: "MYS",
  name: "Malaysia",
  flag: "🇲🇾",
  asOf: "2026-11-04",
  title: "Cancer in Malaysia",
  description:
    "Cancer in Malaysia from Malaysian sources: 168,823 new cancers registered in 2017 to 2021 by the National Cancer Registry, nearly two in three staged cancers found at stage III or IV, public hospital care for a nominal fee, the Ministry of Health Medicines Formulary that decides which cancer medicines its hospitals use, NPRA's 245-working-day review and its 90-day and 60-day reliance routes, HPV self-sampling for cervical screening, a cancer drug list being built for private insurance, and 170 trials with Malaysian sites.",
  lede:
    "Malaysia registers cancers through one nationwide registry run by its National Cancer Institute, which registered 168,823 new cancers in 2017 to 2021, with breast cancer the commonest in women and bowel cancer in men. Most cancer care is given in Ministry of Health hospitals for a nominal fee, with the medicines they may use set by a national formulary, and the registry's sharpest finding is how late cancers are found: of those with a recorded stage, 64.8% were at stage III or IV.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Malaysia is 54,586 new cancers and 32,830 deaths in 2024, an age-standardised incidence of 140.85 per 100,000, including 591 non-melanoma skin cancers (53,995 without them). IARC's fact sheet gives its incidence source as a subnational registry, with subnational rates applied to the 2024 population, and its deaths as national incidence estimates applied to model-based mortality-to-incidence ratios from registry survival data, so neither figure is a count. The national registry's own figure is much lower: 168,823 cancers registered over 2017 to 2021, about 33,800 a year (31,688 in 2021), at age-standardised rates of 107.3 per 100,000 in men and 120.8 in women. The registry counts what is notified or found, and its editors say counts rose with the online notification system of 2018 and the mandatory reporting circular of 2020, that the lower count for 2021 may have been influenced by disruption during COVID-19, and that its data reflect the database on 31 December 2024; private hospitals supplied about 10% of cases. On deaths, the registry report cites 97,906 cancer deaths recorded by the Department of Statistics in 2017 to 2021, about 19,600 a year, 21.7% of them not medically certified, against GLOBOCAN's modelled 32,830. Both put breast, colorectal and lung cancer first; GLOBOCAN has prostate fourth, the registry lymphoma.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Malaysia",
      aside: { label: "IKN: Malaysia National Cancer Registry Report 2017-2021 (December 2025, PDF)", url: MNCR },
      cards: [
        {
          id: "shape",
          title: "168,823 new cancers in five years, with breast cancer leading in women and bowel cancer in men",
          plain:
            "Malaysia's National Cancer Registry counted 168,823 new cancers in 2017 to 2021, 54% of them in women. Breast cancer is the commonest overall, then bowel, lung, lymphoma and liver cancer. In men bowel and lung cancer lead; in women breast cancer is about a third of all cancers. About one in eight Malaysians would be diagnosed with cancer before 75.",
          detail:
            "The Malaysia National Cancer Registry Report 2017-2021, the registry's third five-year report (published December 2025, expanding an e-Summary of July 2024), counts 77,692 cancers in men and 91,131 in women among Malaysian citizens and residents, at age-standardised rates of 107.3 and 120.8 per 100,000. The cumulative risk before age 75 was 11.9% in men and 12.7% in women (1 in 8 for both, against 1 in 10 men and 1 in 9 women in 2012 to 2016). Against 2012 to 2016 the all-sites rate rose by 21.2 per 100,000 in men and 19.2 in women. The ten commonest cancers were breast (29,719, 17.6%), colorectal (23,871), lung (17,028), lymphoma (8,793), liver (8,256), prostate (6,441), leukaemia (6,265), nasopharynx (5,186), corpus uteri (5,087) and ovary (4,714). Rates rose most for colorectal, liver, lung and prostate cancer in men and breast, colorectal, uterine and lung cancer in women; nasopharyngeal and bladder cancer fell in men and cervical cancer fell in women. The registry attributes the rise to both a true increase and better case-finding.",
          links: [
            { label: "IKN: Malaysia National Cancer Registry Report 2017-2021, Executive summary and Tables 5, 7 and 8 (PDF)", url: MNCR },
            { label: "IKN: Summary of the report (July 2024, PDF)", url: MNCR_SUMMARY },
          ],
        },
        {
          id: "how-counted",
          title: "How Malaysia counts: one nationwide registry, online notification and a mandatory reporting circular",
          plain:
            "Malaysia has had a nationwide population-based cancer registry since 2007, run by the National Cancer Registry Department of Institut Kanser Negara. Doctors notify each new cancer online, and since April 2020 notification has been mandatory in government facilities. Registry staff also search pathology, discharge and death records for cancers that were not notified.",
          detail:
            "The Ministry of Health started population-based registration in 1993 with regional registries and made it nationwide in 2007, when all 15 states and federal territories set up their own. Paper NCR-02 forms entered into IARC's CanReg5 software were replaced from 2018 by the M2b online module of the Malaysian Health Data Warehouse, which checks each patient's identity card number with the National Registration Department. A Director General of Health circular in April 2020 made notification mandatory for government doctors and encouraged it in private facilities. For 2017 to 2021, 64.4% of cases came from notifications, 16.4% from pathology records, 13.7% from hospital discharge records and 5.5% from death records alone; about 5% came from university hospitals and 10% from private hospitals. Quality indicators: 87.6% of cases were morphologically verified, 5.3% (8,904) were death certificate only, and 2.4% had an ill-defined primary site. Staging, coded to AJCC TNM, was recorded for only 45.1% of cases.",
          links: [
            { label: "IKN: Malaysia National Cancer Registry Report 2017-2021, chapters 1 to 3 (PDF)", url: MNCR },
            { label: "IKN: reports page (Malay)", url: IKN_REPORTS },
          ],
        },
        {
          id: "late-stage",
          title: "Nearly two in three staged cancers are found at stage III or IV",
          plain:
            "Of the cancers with a recorded stage in 2017 to 2021, 64.8% were found at stage III or IV, slightly more than in 2012 to 2016. Half of breast cancers with a stage were found late, and most lung cancers were found at stage IV. The Minister of Health wrote in the report that early detection and screening must remain a critical imperative.",
          detail:
            "Staging was recorded for 76,125 cases (45.1%), against 52.8% in 2012 to 2016. Among them 15.5% were stage I, 19.7% stage II, 24.6% stage III and 40.2% stage IV; stage IV fell slightly from 40.9% while stage III rose from 22.8%. By site (Table 15 and Table 17), 49.7% of staged breast cancers were stage III or IV, 73.7% of colorectal cancers in men and 73.5% in women, 76.2% of nasopharyngeal cancers in men, 63.3% of prostate cancers, 46.6% of cervical cancers, and 95.5% of lung cancers in men and 94.7% in women, of which 78.3% and 82.3% were stage IV. The Minister's message notes that more than half of breast, colorectal, lung and prostate cancers are still detected at stage III or IV. The registry's survival study, MySCan, found that stage IV breast cancer carried 7.52 times the risk of death of stage I, for cancers diagnosed in 2007 to 2011.",
          links: [
            { label: "IKN: Malaysia National Cancer Registry Report 2017-2021, sections 3.5 and 4.2 (PDF)", url: MNCR },
            { label: "Ministry of Health: press statement on MySCan, 1 October 2018 (PDF, Malay)", url: MYSCAN },
          ],
        },
        {
          id: "ethnicity",
          title: "Rates differ by ethnic group, and the registry reports every cancer by group",
          plain:
            "The registry reports cancer separately for Malays, Chinese, Indians and Other Bumiputera, the indigenous peoples of Sabah, Sarawak and the peninsula. Chinese Malaysians had the highest overall rates. Breast cancer was most common in Indian women, the risk of nasopharyngeal cancer was highest among Chinese and Other Bumiputera men, and cervical cancer was most common among Other Bumiputera women.",
          detail:
            "Age-standardised rates in 2017 to 2021 were 147.9 per 100,000 in Chinese men and 141.7 in Chinese women, 98.2 and 139.7 in Indians, 84.4 and 105.9 in Malays, and 87.4 and 99.7 in Other Bumiputera. The lifetime risk of breast cancer was 1 in 17 for Indian women, 1 in 19 for Chinese, 1 in 26 for Malay and 1 in 45 for Other Bumiputera women. Nasopharyngeal cancer, 74.8% of it in men, had a lifetime risk of 1 in 100 for Chinese and Other Bumiputera men against 1 in 167 for all men, and its highest female risk was among Other Bumiputera women (1 in 250). Cervical cancer was most common among Other Bumiputera women (lifetime risk 1 in 100) and fell nationally from an age-standardised 7.6 per 100,000 in 2007 to 2011 to 6.0 in 2017 to 2021. Liver cancer cases doubled from 4,033 in 2012 to 2016 to 8,256 in 2017 to 2021, with the highest rates among Chinese men (12.0 per 100,000).",
          links: [
            { label: "IKN: Malaysia National Cancer Registry Report 2017-2021, sections 3.4, 5.1, 5.6, 5.7 and 5.9 (PDF)", url: MNCR },
          ],
        },
      ],
      tables: [
        {
          id: "mncr-2017-2021",
          title: "New cancers registered in Malaysia, 2017 to 2021, by site and sex",
          caption: "Registered cases over five years and age-standardised rate per 100,000 (world standard), from the Malaysia National Cancer Registry Report 2017-2021, Table 8.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "men", label: "Men, cases", numeric: true },
            { key: "women", label: "Women, cases", numeric: true },
            { key: "asrM", label: "Rate, men", numeric: true },
            { key: "asrF", label: "Rate, women", numeric: true },
          ],
          rows: [
            { site: "All sites", men: 77692, women: 91131, asrM: 107.3, asrF: 120.8 },
            { site: "Breast (C50; 29,719 in both sexes)", men: null, women: 29534, asrM: null, asrF: 38.9 },
            { site: "Colorectal (C18 to C21)", men: 13610, women: 10261, asrM: 18.8, asrF: 13.7 },
            { site: "Lung, trachea and bronchus", men: 11474, women: 5554, asrM: 16.0, asrF: 7.4 },
            { site: "Prostate", men: 6441, women: null, asrM: 9.3, asrF: null },
            { site: "Liver (C22)", men: 6101, women: 2155, asrM: 8.4, asrF: 2.9 },
            { site: "Lymphoma", men: 5116, women: 3677, asrM: 6.9, asrF: 4.9 },
            { site: "Nasopharynx", men: 3877, women: 1309, asrM: 5.1, asrF: 1.7 },
            { site: "Leukaemia", men: 3529, women: 2736, asrM: 4.9, asrF: 3.9 },
            { site: "Corpus uteri", men: null, women: 5087, asrM: null, asrF: 6.7 },
            { site: "Ovary", men: null, women: 4714, asrM: null, asrF: 6.2 },
            { site: "Cervix uteri", men: null, women: 4573, asrM: null, asrF: 6.0 },
          ],
          note: "Registered cases among Malaysian citizens and residents, from notifications, pathology and discharge records and death records, with the database as it stood on 31 December 2024; rates use the 2019 population. Breast cancer in men is in the all-residents total but is not among the ten commonest cancers in men, so it is left blank. This report gives no deaths by site; see the gaps.",
          sources: [{ label: "IKN: Malaysia National Cancer Registry Report 2017-2021, Tables 5, 7, 8, 17 and 39 (PDF)", url: MNCR }],
        },
        {
          id: "stage-2017-2021",
          title: "Stage at diagnosis for selected cancers, Malaysia, 2017 to 2021",
          caption: "Percentage of cases with a recorded stage at each stage, and the share of cases staged at all, from the registry report's Tables 15 and 17.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "staged", label: "% with a stage", numeric: true },
            { key: "s1", label: "Stage I %", numeric: true },
            { key: "s2", label: "Stage II %", numeric: true },
            { key: "s3", label: "Stage III %", numeric: true },
            { key: "s4", label: "Stage IV %", numeric: true },
          ],
          rows: [
            { site: "Breast, women", staged: 57.9, s1: 15.8, s2: 34.5, s3: 28.0, s4: 21.7 },
            { site: "Colorectal, men", staged: 51.9, s1: 7.0, s2: 19.2, s3: 35.7, s4: 38.0 },
            { site: "Colorectal, women", staged: 52.6, s1: 6.8, s2: 19.7, s3: 38.6, s4: 34.9 },
            { site: "Cervix uteri", staged: 59.9, s1: 23.1, s2: 30.3, s3: 25.2, s4: 21.4 },
            { site: "Nasopharynx, men", staged: 63.6, s1: 8.2, s2: 15.6, s3: 29.5, s4: 46.7 },
            { site: "Prostate", staged: 45.4, s1: 13.8, s2: 22.9, s3: 14.7, s4: 48.6 },
            { site: "Lung, men", staged: 44.6, s1: 1.8, s2: 2.7, s3: 17.2, s4: 78.3 },
            { site: "Lung, women", staged: 50.5, s1: 2.3, s2: 2.9, s3: 12.4, s4: 82.3 },
            { site: "All sites", staged: 45.1, s1: 15.6, s2: 19.7, s3: 24.6, s4: 40.2 },
          ],
          note: "Percentages are of cases with a recorded stage, which is about half of all cases; cancers without a stage may differ from those with one. The report's text gives 15.5% for stage I in all sites and its Table 17 gives 15.6%.",
          sources: [{ label: "IKN: Malaysia National Cancer Registry Report 2017-2021, Tables 15 and 17 (PDF)", url: MNCR }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: tax-funded public hospitals for a nominal fee, and out-of-pocket costs beside them",
      aside: { label: "Ministry of Health: charges under the Fees (Medical) Order 1982 (PDF, Malay)", url: FEES },
      cards: [
        {
          id: "public-fees",
          title: "RM1 at a clinic, nothing for a first specialist visit on referral, and a cap of RM500 a stay",
          plain:
            "Malaysian citizens are treated in Ministry of Health hospitals and clinics for nominal fees set by law. A general outpatient visit costs RM1. A first visit to a specialist clinic on referral from a government doctor is free, and each follow-up costs RM5. A patient in a third-class ward pays at most RM500 per admission.",
          detail:
            "The ministry's schedule of charges under the Fees (Medical) Order 1982, as amended in 2017, sets RM1 per visit to a general outpatient department or polyclinic, including investigations; for specialist clinics, the first visit on referral from a government medical officer is free and each follow-up costs RM5, including investigations. Government employees are exempt. Surgery in a third-class ward costs RM10 to RM200 by type of operation, and the maximum charge for a third-class patient is RM500 per admission. In a reply to the Dewan Rakyat on 19 May 2016 the Minister of Health gave chemotherapy charges of RM200 per treatment in first class, RM100 in second and RM50 in third, within the same RM500 cap, and said citizens aged 60 and over pay no RM5 specialist registration charge and get 50% off third-class charges. He said the ministry spent RM253.4 million that year on medicines for radiotherapy and oncology, and that patients are referred to the Medical Welfare Fund for medicines and equipment hospitals do not supply, and Muslim patients to the zakat boards. Whether these chemotherapy charges are still current was not verified.",
          links: [
            { label: "Ministry of Health: charges under the Fees (Medical) Order 1982 and 2017 amendment (PDF, Malay)", url: FEES },
            { label: "Dewan Rakyat: Minister of Health's reply on cancer care costs, 19 May 2016 (PDF, Malay)", url: PARL_2016 },
          ],
        },
        {
          id: "oncology-centres",
          title: "Six Ministry of Health oncology centres, with more planned",
          plain:
            "Public cancer treatment with both radiotherapy and drug treatment is concentrated in a small number of centres, mostly on the west coast of the peninsula. The national cancer plan names six Ministry of Health oncology centres and three university hospitals. A newspaper reported in November 2024 that the ministry planned to place resident oncologists at six more hospitals from 2026 to 2029.",
          detail:
            "The National Strategic Plan for Cancer Control Programme 2021-2025 lists the public centres offering both systemic treatment and radiotherapy: Hospital Kuala Lumpur, Institut Kanser Negara, Hospital Pulau Pinang, Hospital Sultan Ismail in Johor Bahru, Hospital Umum Sarawak and Hospital Wanita dan Kanak-Kanak Sabah under the ministry, and the University Malaya Medical Centre, Hospital Canselor Tuanku Muhriz UKM and Hospital Universiti Sains Malaysia. It names long waits for curative radiotherapy, access to formulary drugs and access to oncologists as problems, and notes RM500 million announced in 2018 for a Northern Oncology Centre. The Star reported on 6 November 2024 that, in a written parliamentary reply, the ministry said chemotherapy would be available in 41 hospitals by 2025 and adult oncology at eight centres; that resident oncologists would be placed at Hospital Tengku Ampuan Afzan, Hospital Sultanah Bahiyah, Hospital Pakar Sultanah Fatimah, Tawau Hospital, Hospital Sultanah Nora Ismail and Duchess of Kent Hospital from 2026 to 2029; that the Sarawak Cancer Centre and the Northern Region Cancer Centre in Kedah were in pre-implementation; and that radiotherapy would be widened through its Hospital Services Outsourcing Programme. Most of that report is now behind the newspaper's paywall, so these details could not be re-read on 17 November 2026; the two opening paragraphs that can still be read say only that the ministry unveiled medium and long-term plans for cancer care under the 12th and 13th Malaysia Plans.",
          links: [
            { label: "Ministry of Health: National Strategic Plan for Cancer Control Programme 2021-2025, section 10.4 (PDF)", url: NSPCCP },
            { label: "The Star: Ministry unveils major plans for cancer care services, 6 November 2024", url: STAR_2024 },
          ],
        },
        {
          id: "out-of-pocket",
          title: "Costs still fall on families, and a scheme for lower-income Malaysians pays RM1,000 for completing treatment",
          plain:
            "Malaysia's cancer plan says about 45% of Malaysian cancer survivors spend more than a third of their household income on cancer care in the first year. For lower-income citizens aged 40 and over, the PeKa Sihat scheme pays an incentive of RM1,000 for completing cancer treatment in a Ministry of Health hospital and help with transport of up to RM500 in the peninsula or RM1,000 in Sabah, Sarawak and Labuan.",
          detail:
            "The National Strategic Plan for Cancer Control Programme 2021-2025 cites the ASEAN Costs in Oncology (ACTION) study for its Malaysian figure. The study's abstract gives pooled results for eight countries: of 9,513 adults with a new cancer diagnosis, 29% had died a year later and 48% had faced costs above 30% of household income, and people without insurance were more likely to face both. ProtectHealth's site refused our request on 17 November 2026, so the PeKa Sihat details here could not be re-read on that date. PeKa Sihat, the Skim Peduli Kesihatan untuk Kumpulan B40 run for the ministry by ProtectHealth since 15 April 2019, covers recipients of the Sumbangan Tunai Rahmah cash transfer and their spouses aged 40 and over, automatically and without registration; after a health screening at a clinic it offers medical equipment worth up to RM20,000, the RM1,000 cancer treatment incentive (RM300 when treatment starts and RM700 when it is completed in a ministry hospital) and a transport allowance of up to RM500 in the peninsula or RM1,000 in Sabah, Sarawak and Labuan. The plan lists screening by iFOBT among the targets for PeKa B40 by 2025.",
          links: [
            { label: "Kimman et al., ACTION study (BMC Medicine 2015)", url: ACTION },
            { label: "ProtectHealth: PeKa Sihat (Malay)", url: PEKA },
            { label: "Ministry of Health: National Strategic Plan for Cancer Control Programme 2021-2025 (PDF)", url: NSPCCP },
          ],
        },
      ],
    },
    {
      id: "formulary",
      nav: "Medicines list",
      title: "How Malaysia decides which cancer medicines public hospitals use",
      aside: { label: "Pharmaceutical Services Programme: Garis Panduan Formulari Ubat KKM, 2025 (PDF, Malay)", url: FUKKM_GUIDE },
      cards: [
        {
          id: "fukkm",
          title: "One national formulary, decided by a panel chaired by the Director General of Health",
          plain:
            "Ministry of Health hospitals and clinics may only use medicines, and indications, listed in the Ministry of Health Medicines Formulary. A panel chaired by the Director General of Health decides what is listed and meets three times a year. Anything outside the list needs special approval for the individual patient.",
          detail:
            "The formulary guidelines (fourth edition, 2025, in Malay) say the formulary lists medicines that are registered with the Drug Control Authority, treat diseases with a high burden, and have advantages in quality, efficacy, safety and cost-effectiveness. In January 2025 it held 1,650 preparations of 864 chemical entities, against 994 preparations of 596 entities in the first list of 1983. Each entry carries a prescriber category: A* means consultants or specialists for specific indications only, A any consultant or specialist, A/KK also family medicine specialists, and B, C and C+ widen to medical officers and paramedics. The formulary does not necessarily list every registered indication. Special approval (kelulusan khas) is needed for a registered medicine not on the list, a listed medicine for an unlisted indication, or an unregistered medicine, and is considered only when listed treatment failed or was not tolerated, for a life-saving medicine or a specific indication with no listed alternative, for epidemics, or for orphan medicines. Prices declared when a medicine is listed are valid for two years.",
          links: [
            { label: "Pharmaceutical Services Programme: Garis Panduan Formulari Ubat KKM, fourth edition 2025 (PDF, Malay)", url: FUKKM_GUIDE },
            { label: "MyFormulary: the formulary online", url: "https://myformulary.pharmacy.gov.my/" },
          ],
        },
        {
          id: "listing-rules",
          title: "Under the 2015 rules, a medicine had to be registered for a year and reimbursed in two other countries before a company could apply",
          plain:
            "Under the 2015 dossier guidelines, a company could apply to list a medicine only after it had been registered in Malaysia for at least 12 months, used in Malaysia for 12 months, and listed for reimbursement in at least two other countries, with two Ministry of Health specialists supporting it. These rules have since been revised and the current edition was not read.",
          detail:
            "The Guidelines for Submission of Dossier for Listing into the Ministry of Health Medicines Formulary (first edition, October 2015) require a letter of intent, answered within 5 working days, and a full dossier within 6 months. Eligibility: registration with the Drug Control Authority for at least 12 months, the indication approved in Malaysia, listing on a reimbursement list or national formulary in at least two countries, 12 months of use in Malaysia with an updated safety report, therapeutic advantage supported by evidence, and support from two consultants or specialists in different ministry institutions. Dossiers are evaluated by the formulary secretariat with its pharmacoeconomics unit and committees, and need at least 14 weeks before a panel meeting; panels were planned for March, July and November. A rejected medicine can be resubmitted after 6 months with new clinical evidence or a significant price reduction, and after 12 months if rejected again. The 2025 guidelines refer to a 2024 edition of these rules, which OnCo did not read. The cancer plan records that gefitinib and afatinib were listed for EGFR-mutated metastatic lung cancer after prices were negotiated under value-based medicine.",
          links: [
            { label: "Pharmaceutical Services Division: Guidelines for Submission of Dossier, first edition 2015 (PDF)", url: FUKKM_DOSSIER },
            { label: "Ministry of Health: National Strategic Plan for Cancer Control Programme 2021-2025, achievements 2016-2020 (PDF)", url: NSPCCP },
          ],
        },
        {
          id: "mahtas",
          title: "MaHTAS, the ministry's health technology assessment section",
          plain:
            "The Malaysian Health Technology Assessment Section assesses new medicines, devices and procedures for the Ministry of Health and writes its clinical practice guidelines. Its 2017 assessment of low-dose CT lung screening recommended it only for research, and the cancer plan of 2021 says no national lung screening programme had yet been established. OnCo found no published cost-effectiveness threshold.",
          detail:
            "MaHTAS, in the Medical Development Division, describes itself as the ministry's custodian of evidence- and value-based medicine. It assesses drugs, biologics, devices, procedures and programmes for effectiveness, safety, cost-effectiveness and organisational, social and ethical issues; coordinates clinical practice guidelines; and runs horizon scanning. The cancer plan reports that the 2017 assessment found low-dose CT highly sensitive but not very specific in high-risk people and recommended it for research use only; a ministry lung screening study at 14 hospitals with industry support was stopped for poor public response and budget, while Institut Kanser Negara's radiology department kept low-dose CT screening as a routine service. The plan describes value-based medicine, a health economic evaluation from several perspectives before a therapy is approved for ministry hospitals, as the ministry's response to the cost of precision medicine. A separate positive list of cancer medicines is now being built for private insurance; see below.",
          links: [
            { label: "MaHTAS: Info korporat", url: MAHTAS },
            { label: "Ministry of Health: National Strategic Plan for Cancer Control Programme 2021-2025 (PDF)", url: NSPCCP },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: NPRA, with a full review and three reliance routes",
      aside: { label: "NPRA: DRGD Appendix 3, Guideline on Registration of New Drug Products (July 2026, PDF)", url: NPRA_APP3 },
      cards: [
        {
          id: "npra-routes",
          title: "245 working days for a new medicine, 90 when NPRA relies on a reference regulator, 60 in a 2026 pilot",
          plain:
            "Malaysia's National Pharmaceutical Regulatory Agency aims to evaluate a new medicine in 245 working days. A medicine already approved by one of seven reference regulators can take a shorter route with a 90-working-day target, and from May 2026 a one-year pilot recognises US FDA and EMA approvals in a target of 60 working days.",
          detail:
            "NPRA's Drug Registration Guidance Document (third edition, 12th revision, July 2026) sets 245 working days for a new chemical entity, for which consultation with local clinical specialists is required, and 210 for a hybrid product. Its Facilitated Registration Pathway began with Directive No. 7 of 27 March 2019, relying on the EMA and US FDA, with an abbreviated review of 120 working days and a verification review of 90. Revision 1, agreed by the Drug Control Authority at its 390th meeting on 3 November 2023 and in force from 1 January 2024, added Health Canada, Japan's PMDA, Swissmedic, Australia's TGA and the UK MHRA, cut the abbreviated review to 90 working days, set 30 working days for verification of products assessed through the ASEAN Joint Assessment, extended the window for applying after the reference approval from 2 to 3 years, and brought in generics and cell and gene therapies. NPRA joined the WHO collaborative registration procedures for prequalified products on 9 January 2020 and for products of stringent authorities on 2 June 2022. The pilot announced on 7 May 2026, from 2 May 2026, accepts products identical to those approved by the US FDA or by the EMA's centralised procedure, submitted within three months of that approval, with an administrative timeline of 60 working days from payment after screening.",
          links: [
            { label: "NPRA: DRGD Appendix 3 (July 2026, PDF)", url: NPRA_APP3 },
            { label: "NPRA: Directive No. 13 of 2023, Facilitated Registration Pathway Revision 1 (PDF, Malay)", url: NPRA_FRP },
            { label: "NPRA: new route under the Facilitated Registration Pathway, pilot from 2 May 2026", url: NPRA_PILOT },
          ],
        },
        {
          id: "measured-times",
          title: "Measured: a median of 515 days in 2017 and 399 in 2019, for all new medicines",
          plain:
            "NPRA has measured its own approval times with an outside research centre. New medicines approved in 2017 took a median of 515 calendar days from submission, counting time spent by the company answering questions, and those approved in 2019 took 399. No figure for cancer medicines alone was found.",
          detail:
            "The 2020 study counted 25 new active substances and one biosimilar approved in 2017: a median of 515 days in all, with a median of 135 days between receipt of the dossier and the start of scientific assessment; the assessment took a median of 279 days, with medians of 166 days for NPRA and 131 for the applicant, and up to six review cycles and 65% of applications needing four or five. NPRA proposed starting assessment within 100 days, capping review cycles at five and limiting applicant responses to six months. The 2025 study of 24 new active substances approved in 2019 found the median had fallen to 399 calendar days, with a shorter wait before assessment. Both use the OpERA method of the Centre for Innovation in Regulatory Science and were written with NPRA staff. NPRA's client charter for 2016 reported 93 of 94 new drug and biologic applications (98.9%) evaluated within the 245-working-day target; that target is set in working days, while the two studies count calendar days including the applicant's time, so the figures are not comparable. Times under the reliance routes since 2024 have not been published in a form OnCo found.",
          links: [
            { label: "Mohd Sani et al., approval times 2017 and 2019 (Ther Innov Regul Sci 2025)", url: OPERA_2025 },
            { label: "Sani et al., new active substances approved in 2017 (Ther Innov Regul Sci 2020)", url: OPERA_2020 },
            { label: "NPRA: client charter achievement, 2016 (Malay)", url: "https://www.npra.gov.my/index.php/my/component/content/article/225-english/2095-pencapaian-piagam-pelanggan-npra-untuk-tahun-2016-januari-disember.html" },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening: four national programmes, and HPV self-sampling for cervical cancer",
      aside: { label: "Ministry of Health: National Strategic Plan for Cancer Control Programme 2021-2025 (PDF)", url: NSPCCP },
      cards: [
        {
          id: "screening-policy",
          title: "Breast, bowel, cervical and oral cancer screening, and no national lung programme in the 2021 plan",
          plain:
            "Malaysia screens for four cancers. Women have a breast examination by a trained health worker, and mammograms are recommended for women with risk factors from 40 and may be done every two years from 50 to 74. People aged 50 to 75 are offered a stool test every two years. Women aged 30 to 65 are tested for HPV every five years.",
          detail:
            "The National Strategic Plan for Cancer Control Programme 2021-2025 sets out the policies. Breast: clinical breast examination every three years from 20 to 39 and every year from 40; yearly mammography for women of 40 and over with risk factors, and every two years for women aged 50 to 74. Colorectal: an immunological faecal occult blood test (iFOBT) every two years for people aged 50 to 75 without symptoms, with colonoscopy if positive. Cervical: HPV testing on a vaginal sample, taken by the woman herself or by a health worker, for sexually active women aged 30 to 65, repeated every five years after a negative result. Oral: examination from age 18 for people with high-risk habits or communities, which the plan names as Indian communities on rubber and oil palm estates in the peninsula and Other Bumiputera in Sabah and Sarawak. The plan, published in 2021, says no national lung cancer screening programme had yet been established. The plan's colorectal target was to raise screening coverage from 10.8% (National Health and Morbidity Survey 2019) to 30% in the 2023 survey, adding iFOBT to the PeKa B40 and Social Security Organisation health screenings by 2025.",
          links: [
            { label: "Ministry of Health: National Strategic Plan for Cancer Control Programme 2021-2025, section 10.2 and Appendix 2 (PDF)", url: NSPCCP },
          ],
        },
        {
          id: "hpv-self-sampling",
          title: "HPV self-sampling, phased in state by state from 2019",
          plain:
            "In 2019 the Ministry of Health began cervical screening with HPV tests on samples women can take themselves, replacing the Pap smear as the first test. It was phased in across the states from 2019 and planned to be nationwide by 2024 or 2025, with a target of screening 40% of women aged 30 to 65 by 2025. HPV vaccination has been in the national programme since 2010.",
          detail:
            "The cancer plan describes the HPV test as more sensitive than the Pap smear and gives the phases: Kuala Lumpur and Putrajaya, Kedah and Kelantan in 2019; Negeri Sembilan, Selangor, Penang and Sarawak in 2020; Terengganu, Johor and Melaka in 2021; Perak, Pahang, Perlis and Sabah in 2022; nationwide by 2024 or 2025. Its targets were 40% of women aged 30 to 65 screened by 2025 and a gynaecologist's review within two weeks of a positive result. The Minister of Health's message in the registry report credits sustained screening for the fall in cervical cancer, whose age-standardised rate went from 7.6 per 100,000 in 2007 to 2011 to 6.0 in 2017 to 2021, and notes that the effect of the HPV vaccination programme introduced in 2010 will show as vaccinated girls reach adulthood. Of cervical cancers with a stage in 2017 to 2021, 53.4% were found at stage I or II. Whether the 40% coverage target was met was not found; see the gaps.",
          links: [
            { label: "Ministry of Health: National Strategic Plan for Cancer Control Programme 2021-2025, Appendix 2 (PDF)", url: NSPCCP },
            { label: "IKN: Malaysia National Cancer Registry Report 2017-2021, Message and section 5.9 (PDF)", url: MNCR },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Malaysia does",
      title: "What Malaysia does that others do not",
      cards: [
        {
          id: "ledang",
          title: "A government hospital trial of low-dose nivolumab for lung cancer",
          plain:
            "A respiratory physician at Hospital Sultanah Bahiyah in Alor Setar is running a phase 3 trial, under a Ministry of Health reference, of a 40 mg dose of the immunotherapy nivolumab every six weeks with chemotherapy, against chemotherapy alone, for advanced non-small cell lung cancer.",
          detail:
            "The LEDANG trial (NCT07050043), registered on ClinicalTrials.gov by its sponsor-investigator, a consultant respiratory physician at Hospital Sultanah Bahiyah, Kedah, plans to randomise 123 patients 2 to 1 between six-weekly nivolumab 40 mg plus four to six cycles of platinum-based chemotherapy chosen by local practice and the same chemotherapy alone, to test superiority and safety. It started on 19 May 2025, is recruiting at one site in Malaysia, and lists a Ministry of Health grant reference; primary completion is estimated for 31 December 2030. It is one of four cancer trials in OnCo's records that list Malaysia as their only country, with a Ministry of Health trial of Foscan photodynamic therapy against brachytherapy for recurrent nasopharyngeal cancer (NCT01086488), a phase 2 trial of pre-operative artesunate in colorectal cancer (NCT07095309) and a phase 2/3 trial of the antibody PRL3-zumab in solid tumours (NCT07290088).",
          links: [
            { label: "ClinicalTrials.gov: LEDANG (NCT07050043)", url: LEDANG },
            { label: "ClinicalTrials.gov: NCT01086488", url: "https://clinicaltrials.gov/study/NCT01086488" },
          ],
        },
        {
          id: "insurance-drug-list",
          title: "A public positive list of cancer medicines for private health insurance",
          plain:
            "Malaysia is building a Cancer Drug List for a new base medical insurance and takaful product: a positive list of proven, cost-effective cancer medicines that private insurers would cover, built on the public formulary's rules, with routes back into public cancer care when a policyholder reaches the limit of their cover.",
          detail:
            "ProtectHealth's site refused our request on 17 November 2026, so the tender deck could not be re-read on that date and what follows is as first read. ProtectHealth, the Ministry of Health's not-for-profit financing company, released the tender for the Development and Governance of a Cancer Drug List for the Base Medical Health Insurance and Takaful (MHIT) Product on 3 April 2026, with a six-month contract planned for May to November 2026. The consultant is to review every cancer medicine registered by the Drug Control Authority, draw on the Medicines Formulary, its dossier concepts and the clinical practice guidelines, require cost-effectiveness or budget impact analysis from a Malaysian payer perspective for new listings, define cost-sharing categories, co-payments and coverage caps, benchmark private-sector prices and supply-chain mark-ups against other countries, and design referral pathways to ministry oncology services when cover runs out or a co-payment cannot be met. The deck describes the list as the possible foundation of a future national reimbursement framework, extensible to diagnosis-related group payments.",
          links: [
            { label: "ProtectHealth: Cancer Drug List for the base MHIT product, open day slides (2026, PDF)", url: MHIT_CDL },
          ],
        },
        {
          id: "nationwide-registry",
          title: "One registry for the whole country, checked against the national identity card",
          plain:
            "Malaysia registers cancers in every state through one national registry, links each case to the patient's identity card number, and since 2020 has required government doctors to notify every new cancer online.",
          detail:
            "The registry covers 13 states and 3 federal territories. Notifications are made, since 2018, through the M2b module of the Malaysian Health Data Warehouse, a repository operational since August 2016 that pools records from government, private, university and military hospitals and clinics; the system verifies each patient's identity card number with the National Registration Department before the case enters the database. Cases are coded to ICD-10 and ICD-O-3.2, checked with IARC's software and assessed against the Cancer Incidence in Five Continents validity indicators. Its reports give every major cancer by state and by the four main ethnic groups, which is how the registry shows that cervical cancer is commonest among Other Bumiputera women, that the risk of nasopharyngeal cancer is highest among Chinese and Other Bumiputera men, and that Kelantan's all-cancer rate in women (91.4 per 100,000) is about half that of Johor (184.6). IARC's own estimate for Malaysia still describes its source as a subnational registry.",
          links: [
            { label: "IKN: Malaysia National Cancer Registry Report 2017-2021, sections 2 and 4.1 (PDF)", url: MNCR },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "Clinical Research Malaysia", url: CRM },
      cards: [
        {
          id: "trials-in-malaysia",
          title: "170 trials in OnCo's records have a site in Malaysia, most of them industry phase 3 trials, with lung cancer the largest group",
          plain:
            "Of the trials in OnCo's records, 170 list a site in Malaysia. Most are phase 3 trials run by international companies, with non-small cell lung cancer the largest group, then prostate and breast cancer. Clinical Research Malaysia, set up by the Ministry of Health in 2012, supports companies placing trials in Malaysian hospitals.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 17 November 2026: 170 trials list Malaysia among their countries, 123 of them phase 3, 22 phase 2, 12 phase 2/3, 12 phase 1/2 and 1 phase 1. OnCo's records mark 62 as recruiting and 72 as active. ClinicalTrials.gov names AstraZeneca as lead sponsor of 32, Merck Sharp & Dohme of 31, Janssen of 17 and Novartis of 14; non-small cell lung cancer is the first-listed cancer for 62, prostate for 14 and hormone receptor-positive breast cancer for 11. Lung trials with Malaysian sites include FLAURA, LAURA, MARIPOSA and LUX-Lung 3, and the liver and bile duct trials REFLECT, EMERALD-3 and KEYNOTE-966. Clinical Research Malaysia reports a 2024 partnership award with AstraZeneca that included a first-in-human study, and Roche's choice of Sarawak General Hospital for a global first-in-human trial. OnCo's OpenAlex snapshot of 8 September 2026 also records 2,618 ClinicalTrials.gov studies of all conditions with a site in Malaysia.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Malaysia", url: "https://clinicaltrials.gov/search?country=Malaysia&cond=Cancer" },
            { label: "Clinical Research Malaysia", url: CRM },
          ],
        },
        {
          id: "research-output",
          title: "Oncology research output: 499 papers in 2025 with authors based in Malaysia",
          plain:
            "OpenAlex counts 499 oncology papers with at least one author based in Malaysia in 2025, up from 398 in 2021, and 2,024 over the five years. The National Cancer Registry's reports, and its 2018 survival study, are the country's own statistics on cancer.",
          detail:
            "OpenAlex, counting works whose primary topic is oncology and counting a paper for every country among its authors' affiliations, gives Malaysia 398 works in 2021, 383 in 2022, 383 in 2023, 361 in 2024 and 499 in 2025, 2,024 in total, of which 1,445 are open access and 71 highly cited. The registry's Malaysian Study on Cancer Survival, published in 2018 for cancers diagnosed in 2007 to 2011, gave five-year relative survival of 82.3% for thyroid cancer, 73.0% for prostate, 70.6% for uterine, 66.8% for female breast and 56.8% for colon cancer, and 14% for pancreatic, 12.8% for liver and 11% for lung cancer; those are averages for people diagnosed 15 to 19 years ago, and the same study found survival lower the later the stage at diagnosis. The registry's foreword names survival and mortality analyses as a priority.",
          links: [
            { label: "OpenAlex: works by country", url: "https://openalex.org" },
            { label: "Ministry of Health: press statement on MySCan, 1 October 2018 (PDF, Malay)", url: MYSCAN },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "moh-unreachable",
      title: "The Ministry of Health's own website, and two news sites, refused our requests",
      plain:
        "www.moh.gov.my answered 403 to every request, so ministry facts on this page come from its own PDFs hosted on other ministry or partner sites, and from a newspaper's report of a written parliamentary reply. The current fee schedule for chemotherapy was not found in a ministry document.",
      detail:
        "The MaHTAS page on moh.gov.my returned 403; its own portal, mymahtas.moh.gov.my, was read instead. The National Strategic Plan for Cancer Control Programme 2021-2025 was read from the copy on the International Cancer Control Partnership portal. The outpatient and surgical charges come from a schedule hosted by the ministry's oral health programme (hq.moh.gov.my), which cites the 2017 amendment; the chemotherapy charges come from the minister's reply of 19 May 2016, and whether they have changed was not verified. Free Malaysia Today's report of 28 September 2025 and the New Straits Times report of February 2025 on cancer as a cause of death answered 403 and were not used. On 17 November 2026 most of the Star's report of 6 November 2024 was behind its paywall, and protecthealth.com.my refused our requests for the PeKa Sihat page and the tender deck, so what this page takes from those three sources could not be re-read on that date. No plan for cancer control after 2025 was found from any source we could read.",
      links: [
        { label: "Ministry of Health Malaysia", url: "https://www.moh.gov.my" },
        { label: "ICCP portal: Malaysia's cancer plan 2021-2025 (PDF)", url: NSPCCP },
      ],
    },
    {
      id: "not-found",
      title: "Figures looked for and not found",
      plain:
        "OnCo could not find, from a source it could read, cancer deaths by site for Malaysia, survival for anyone diagnosed after 2011, how many women and adults have actually been screened since the 2021 plan, or the share of cancer care paid privately or by insurance.",
      detail:
        "The registry report gives 97,906 cancer deaths in 2017 to 2021 from the Department of Statistics but not by cancer site in the text read, and the Department's Statistics on Causes of Death were not read. The only national survival study found is MySCan (2018), for 2007 to 2011; the registry names survival analysis as a priority. The cancer plan sets coverage targets (40% for cervical screening by 2025; colorectal from 10.8% to 30%) but the National Health and Morbidity Survey 2023 results were not read, so whether they were met is not stated. The current (2024) edition of the formulary dossier guidelines was not read; the 2015 first edition was. No cost-effectiveness threshold for Malaysia was found. The registry's e-Summary of July 2024 gives some site figures that differ slightly from the full report (for staged cervical cancer, 47.1% at stage 3 or 4 against the full report's 46.6%); the full report's figures are used here.",
      links: [
        { label: "IKN: Malaysia National Cancer Registry Report 2017-2021 (PDF)", url: MNCR },
        { label: "IKN: Summary of the report (July 2024, PDF)", url: MNCR_SUMMARY },
      ],
    },
    {
      id: "approval-times",
      title: "No published approval or listing times for cancer medicines in Malaysia",
      plain:
        "NPRA publishes target review times and two studies of measured times for all new medicines, but OnCo found no figure for cancer medicines alone, nor for how long after registration a cancer medicine reaches the Ministry of Health Medicines Formulary.",
      detail:
        "The 245, 210, 90, 30 and 60 working-day figures are NPRA's targets. The measured medians (515 calendar days in 2017, 399 in 2019) cover all new active substances and predate the 2024 revision of the reliance pathway and the 2026 pilot. The 2015 dossier rules imply at least 12 months between registration and a company's application to list a medicine, plus at least 14 weeks to a panel meeting, but the formulary's circulars of amendments are on the ministry intranet and were not read, so no listing dates for cancer medicines are given. NPRA's client charter results after 2016 were not found.",
      links: [
        { label: "NPRA: DRGD Appendix 3 (July 2026, PDF)", url: NPRA_APP3 },
        { label: "Mohd Sani et al. (Ther Innov Regul Sci 2025)", url: OPERA_2025 },
      ],
    },
  ],
  institutions: ["institut-kanser-negara", "ministry-of-health-malaysia", "npra-malaysia", "mahtas-malaysia", "protecthealth-malaysia", "clinical-research-malaysia", "ummc-kuala-lumpur", "national-cancer-society-malaysia"],
  companies: ["natureceuticals"],
  drugs: ["nivolumab", "gefitinib", "afatinib"],
  trials: [
    "nct07050043", "nct01086488", "nct07095309", "nct07290088", "flaura", "laura", "mariposa", "lux-lung-3", "keynote-671", "empower-lung-1", "nct05526755",
    "keynote-966", "reflect", "emerald-3", "keynote-590", "herizon-gea-01", "latitude", "magnitude", "ascent-04", "cambria", "nct04208178", "liger-hn1",
    "manifest-2", "impactmf", "golseek-1", "nct03182244",
  ],
  papers: ["paper-kimman-action-catastrophic-expenditure-southeast-asia-bmc-med-2015", "paper-mohd-sani-npra-approval-times-opera-tirs-2025", "paper-sani-npra-new-active-substances-2017-opera-tirs-2020"],
  people: ["mohd-zukiflee-abu-bakar"],
  how:
    "Every card was written from Malaysian sources read from their raw text, Malay ones in Malay: Institut Kanser Negara's Malaysia National Cancer Registry Report 2017-2021 (December 2025) and its e-Summary (July 2024), the 2018 MySCan press statement, the Ministry of Health's National Strategic Plan for Cancer Control Programme 2021-2025, its schedule of charges and a 2016 parliamentary reply, the Medicines Formulary guidelines (2025) and dossier guidelines (2015), NPRA's registration guidance, reliance directive and pilot notice, MaHTAS's and ProtectHealth's own pages and ProtectHealth's 2026 tender deck, Clinical Research Malaysia's home page, the LEDANG trial's ClinicalTrials.gov record, and a Star report of a written parliamentary reply. Papers were resolved through Europe PMC and their abstracts read. The trial count comes from ClinicalTrials.gov participation data in OnCo's graph. The new records for this page are Institut Kanser Negara, the Ministry of Health, NPRA, MaHTAS, ProtectHealth, Clinical Research Malaysia and three papers; the University Malaya Medical Centre, the National Cancer Society of Malaysia and the company were already in OnCo.",
  verify:
    "Incidence figures are registered cases for 2017 to 2021 from a database that is still being updated, and the registry says earlier years can change between reports. Review times are NPRA's targets except where a measured median is named. Fees and the PeKa Sihat benefits can change; ask the hospital which charges apply. Before relying on whether a particular cancer medicine is available in a Ministry of Health hospital, check the Medicines Formulary entry and its prescriber category, and ask whether special approval is possible.",
  verifyLinks: [
    { label: "IKN: cancer registry reports", url: IKN_REPORTS },
    { label: "MyFormulary: Ministry of Health Medicines Formulary", url: "https://myformulary.pharmacy.gov.my/" },
    { label: "National Pharmaceutical Regulatory Agency", url: "https://www.npra.gov.my" },
    { label: "ProtectHealth: PeKa Sihat", url: PEKA },
  ],
};

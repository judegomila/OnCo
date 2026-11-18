import type { CountryDive } from "@/data/country-dive";

/**
 * Indonesia deep dive: the hand-written cards for /countries/id/. Indonesian sources were read in Indonesian from the
 * raw text of each PDF or page (pdftotext, or the page's own HTML), not from a summary of it. The backbone is the
 * Ministry of Health's Rencana Kanker Nasional 2024-2034 (updated edition, December 2024, 16 MB PDF from the BKPK
 * repository); its two bar charts (registry counts, page 5, and survival, page 10) were also rendered to an image to
 * confirm which bar is which period. The rest: BPOM press releases of 31 December 2025 and 21 April 2026, the BKPK
 * announcement of the 2026 health technology assessment round, the DJSN note on Presidential Regulation 59 of 2024,
 * Kemenkes news of 3 October 2024 and 4 August 2026, the Ditjen Kesehatan Lanjutan World Cancer Day 2026 report,
 * ClinicalTrials.gov API v2 and OnCo's own GLOBOCAN and OpenAlex files. Where a figure could not be read it is named
 * under `gaps`.
 */
const RKN = "https://repository.badankebijakan.kemkes.go.id/id/eprint/5958/1/Rencana%20Kanker%20Nasional%202024-2034_V71.pdf";
const RKN_L = "Kemenkes: Rencana Kanker Nasional 2024-2034, updated edition (PDF)";
const LAUNCH = "https://kemkes.go.id/id/indonesia-luncurkan-rencana-nasional-untuk-penanganan-kanker";
const JKN_OCT = "https://www.metrotvnews.com/read/kewCWRyW-peserta-jkn-tembus-284-72-juta-jiwa-cakupannya-capai-98-14";
const JKN_APR = "https://www.fortuneidn.com/news/kepesertaan-aktif-baru-81-5-persen-bpjs-kesehatan-dorong-via-4-lembaga-00-ccw2k-6k8p9q";
const DJSN = "https://djsn.go.id/files/dokumen/Keputusan/202406041238Press%20Release%20DJSN%20terkait%20Perpres%2059%202024.pdf";
const HTA_2026 = "https://www.badankebijakan.kemkes.go.id/kemenkes-buka-akses-pengajuan-usulan-topik-hta-reguler-tahun-2026/";
const FORNAS = "https://farmalkes.kemkes.go.id/?p=14969";
const BPOM_DEC = "https://www.pom.go.id/siaran-pers/bpom-percepat-registrasi-obat-di-2025-perluas-akses-masyarakat-terhadap-obat-aman-dan-terjangkau";
const BPOM_APR = "https://www.pom.go.id/berita/strategi-kepala-bpom-kawal-makan-bergizi-gratis-dan-tingkatkan-akses-dan-tata-kelola-obat-sampai-apotek-desa";
const CKG = "https://www.kemkes.go.id/id/kemenkes-perkuat-tindak-lanjut-cek-kesehatan-gratis-usai-tembus-73%2C8-juta-peserta";
const WCD = "https://keslan.kemkes.go.id/read/3379/ceremony-world-cancer-day-2026";
const CTGOV = "https://clinicaltrials.gov/search?locStr=Indonesia&country=Indonesia&cond=cancer";
const CI5 = "https://ci5.iarc.fr/";

export const ID_DIVE: CountryDive = {
  iso2: "ID",
  iso3: "IDN",
  name: "Indonesia",
  flag: "🇮🇩",
  asOf: "2026-11-04",
  title: "Cancer in Indonesia",
  description:
    "Cancer in Indonesia from Indonesian sources: the national cancer plan for 2024 to 2034 and its six priority cancers, a cancer registry covering about 14 per cent of the population whose data have not yet passed IARC's quality bar, a national insurance scheme with about 285 million members that pays for cancer care on the national formulary, BPOM's 90-working-day reliance route, screening coverage of 14.6 per cent for cervical and 13.7 per cent for breast in 2023, and how few Indonesian sites appear in cancer trials.",
  lede:
    "Indonesia has a national cancer plan for 2024 to 2034 that concentrates on breast, cervical, lung, bowel, liver and childhood cancers, and a single public insurance scheme, run by BPJS Kesehatan, with about 98 per cent of the population registered (about 82 per cent of members with active cover in April 2026), that pays for treatment on the national medicines list. It does not yet have a national count of cancers: its registry covers about 14 per cent of the population, and the national figures quoted are IARC's estimates.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Indonesia is 474,083 new cancers and 283,299 deaths, including 7,234 non-melanoma skin cancers (466,849 without them). IARC codes its Indonesian incidence method as 4 (national or subnational rates scaled to regional all-cancer rates) and its mortality method as 3c (incidence estimates applied to modelled mortality-to-incidence ratios), so neither figure is a count. Separately, the national cancer plan reports that Indonesia's submissions to Cancer Incidence in Five Continents Volumes X, XI and XII did not meet the quality criteria. The plan quotes GLOBOCAN 2022 as its headline: 408,661 cases, and 242,988 deaths in its main text (242,099 in its executive summary). The registry's own figures, in the table above, are counts of registered cases in 26 districts and cities (about 14 per cent of the population) for 2008 to 2012 and 2013 to 2017, not national totals or rates, and cannot be compared directly with IARC's.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Indonesia",
      aside: { label: RKN_L, url: RKN },
      cards: [
        {
          id: "shape",
          title: "Breast cancer in women and lung cancer in men are the commonest in every source",
          plain:
            "IARC estimates 474,083 new cancers and 283,299 cancer deaths in Indonesia in 2024. Breast cancer is the commonest overall, then lung, bowel, cervical and liver cancer. The national plan says cancer is the third leading cause of death in Indonesia and that about seven in ten patients start treatment when the cancer is already advanced.",
          detail:
            "In GLOBOCAN 2024, breast cancer accounts for 93,236 new cases, lung 58,446, colorectum 39,751, cervix 31,116 and liver 24,489; nasopharyngeal cancer accounts for 16,064. The national cancer plan (Rencana Kanker Nasional 2024-2034) chose six priorities on this basis: breast, cervix, lung, colorectal, liver and cancers in children under 18. It reports that the registry's counts and BPJS Kesehatan's 2022 claims data show the same pattern, with breast cancer first in women and lung cancer first in men. The plan states that about 70 per cent of patients are already at an advanced stage when they begin treatment, and that BPJS Kesehatan's spending on cancer rose from 3.1 trillion rupiah in 2020 to 5.9 trillion in 2023, second only to heart disease.",
          links: [
            { label: RKN_L, url: RKN },
            { label: "Kemenkes: launch of the national cancer plan (3 October 2024)", url: LAUNCH },
          ],
        },
        {
          id: "registry-status",
          title: "A registry covering about 14 per cent of the population, whose submissions to IARC's world volumes have not been accepted",
          plain:
            "Indonesia records cancers in 26 districts and cities in 14 provinces, about 14 per cent of the population, coordinated from Dharmais National Cancer Centre with fourteen hospitals. The national plan says its data for 2008 to 2012 and 2013 to 2017 were submitted to Cancer Incidence in Five Continents but did not meet the quality criteria and were not published.",
          detail:
            "The plan traces registration from pathology records at Universitas Diponegoro in 1970 to a hospital registry at RS Kanker Dharmais from 1996. The first population-based registry was a Jakarta pilot for cancers diagnosed in 2005 to 2007, which gathered data from 57 hospitals and 345 community health centres and was submitted for Volume X; the plan says the evaluation found coverage too low and data quality below standard. The ministry then set 26 districts and cities as the registry's area, with RS Kanker Dharmais as the national cancer data centre, and the 2008 to 2012 (Volume XI) and 2013 to 2017 (Volume XII) submissions also failed the quality criteria. The plan names the causes: no data transfer between the fourteen hospitals and district hospitals, passive reporting by private hospitals and laboratories, and staff turnover. It names the city of Yogyakarta, with the most complete data of eighteen priority areas, as the first candidate for Volume XIII; IARC's CI5 site lists volumes I to XII only.",
          links: [
            { label: `${RKN_L}, pages 79 to 86`, url: RKN },
            { label: "IARC: Cancer Incidence in Five Continents", url: CI5 },
          ],
        },
        {
          id: "survival",
          title: "Survival: the plan's figures come from Jakarta in 2005 to 2007, one insurance cohort and the childhood registry",
          plain:
            "The plan says survival studies are still limited in Indonesia, possibly because cancer records are not yet linked to population and death records. The figures it gives are five-year survival for Jakarta patients diagnosed in 2005 to 2007, from the CONCORD-2 study, and a sample of 433 breast cancer patients insured by BPJS Kesehatan, of whom 56.8 per cent were alive five years after starting treatment in 2016.",
          detail:
            "The plan's chart compares Jakarta with Asia as a whole: five-year survival was 18 per cent for stomach cancer in Jakarta against 30 per cent in Asia, 29 against 55 for colon, 6 against 15 for lung, 41 against 45 for ovary and 54 against 55 for prostate, while for rectum (57 against 50), liver (19 against 15), cervix (67 against 60) and adult leukaemia (40 against 25) Jakarta's figure was higher. The plan's text lists adult leukaemia among the cancers where Indonesia lags, which its own chart does not show; the figures are given here as charted. In the BPJS Kesehatan cohort, survival was 95.4 per cent at one year, 64.9 per cent at three and 56.8 per cent at five. For children, the paediatric registry IP-CAR recorded about 2,000 new cancers in 2022 to 2023 against an estimated 10,000 a year, with three-year survival of 24 per cent. These are averages for people diagnosed years ago and say nothing about any one person.",
          links: [{ label: RKN_L, url: RKN }],
        },
      ],
      tables: [
        {
          id: "registry-counts",
          title: "Cancers registered by the national cancer registration, by site and sex, 2008 to 2012 and 2013 to 2017",
          caption: "Number of registered cases in the registry's 26 districts and cities (14 provinces), as charted in the national cancer plan, Gambar 6. Counts, not rates.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "w1", label: "Women, 2008 to 2012", numeric: true },
            { key: "w2", label: "Women, 2013 to 2017", numeric: true },
            { key: "m1", label: "Men, 2008 to 2012", numeric: true },
            { key: "m2", label: "Men, 2013 to 2017", numeric: true },
          ],
          rows: [
            { site: "Breast", w1: 9678, w2: 12955, m1: null, m2: null },
            { site: "Cervix", w1: 5327, w2: 4646, m1: null, m2: null },
            { site: "Ovary", w1: 2185, w2: 2530, m1: null, m2: null },
            { site: "Lung, trachea and bronchus", w1: 1401, w2: 890, m1: 1933, m2: 3076 },
            { site: "Colorectal", w1: 1618, w2: 1739, m1: 1877, m2: 1945 },
            { site: "Nasopharynx", w1: 748, w2: 626, m1: 1621, m2: 1358 },
            { site: "Non-Hodgkin lymphoma", w1: 1031, w2: 956, m1: 1410, m2: 1302 },
            { site: "Leukaemia", w1: 1000, w2: 1095, m1: 1208, m2: 1344 },
            { site: "Thyroid", w1: 1221, w2: 1649, m1: null, m2: null },
            { site: "Corpus uteri", w1: 965, w2: 966, m1: null, m2: null },
            { site: "Liver", w1: null, w2: null, m1: 1290, m2: 1199 },
            { site: "Prostate", w1: null, w2: null, m1: 894, m2: 1029 },
            { site: "Skin", w1: null, w2: null, m1: 599, m2: 473 },
            { site: "Bladder", w1: null, w2: null, m1: 531, m2: 596 },
            { site: "Brain and nervous system", w1: null, w2: null, m1: 503, m2: 551 },
            { site: "All other sites", w1: 6038, w2: 6832, m1: 5139, m2: 6061 },
          ],
          note: "The chart shows the ten commonest sites for each sex, so an empty cell means the site was not among that sex's ten, not zero. The plan titles the chart 'prevalence' and describes the same data both as hospital-based registry data and as the population-based registry's coverage; the numbers are registered cases in about 14 per cent of the population, which IARC has not accepted as complete, and are not national incidence.",
          sources: [{ label: `${RKN_L}, Gambar 6, page 5`, url: RKN }],
        },
        {
          id: "jakarta-survival",
          title: "Five-year survival, Jakarta (2005 to 2007) against Asia (2005 to 2009)",
          caption: "Five-year survival (%) as charted in the national cancer plan, Gambar 12, citing CONCORD-2 with the Jakarta sample.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "id", label: "Indonesia (Jakarta), 2005 to 2007 (%)", numeric: true },
            { key: "asia", label: "Asia, 2005 to 2009 (%)", numeric: true },
          ],
          rows: [
            { site: "Cervix", id: 67, asia: 60 },
            { site: "Rectum", id: 57, asia: 50 },
            { site: "Prostate", id: 54, asia: 55 },
            { site: "Ovary", id: 41, asia: 45 },
            { site: "Adult leukaemia", id: 40, asia: 25 },
            { site: "Colon", id: 29, asia: 55 },
            { site: "Liver", id: 19, asia: 15 },
            { site: "Stomach", id: 18, asia: 30 },
            { site: "Lung", id: 6, asia: 15 },
          ],
          note: "One registry in one city, for people diagnosed almost twenty years ago, as reproduced in the plan rather than read from the CONCORD-2 tables themselves. Survival can look high where follow-up of deaths is incomplete, which the plan names as a problem in Indonesia.",
          sources: [{ label: `${RKN_L}, Gambar 12, page 10`, url: RKN }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: one national insurance scheme, with gaps in what it covers",
      aside: { label: "DJSN: Presidential Regulation 59 of 2024 (PDF)", url: DJSN },
      cards: [
        {
          id: "jkn",
          title: "About 285 million people registered with the Jaminan Kesehatan Nasional",
          plain:
            "Indonesia's national health insurance, the Jaminan Kesehatan Nasional (JKN), is run by BPJS Kesehatan. In October 2026 its head said 284.72 million people were registered, 98.14 per cent of the population, but in April he put the share of members whose cover was active at 81.5 per cent. JKN pays for cancer treatment on the national medicines list at contracted hospitals.",
          detail:
            "BPJS Kesehatan's president director, Prihati Pujowaskito, gave the 284.72 million figure at the Satya JKN Awards 2026, against a 2026 national development plan target of 98.7 per cent, and said 28 provinces and 350 districts and cities met the priority universal coverage criteria of at least 98 per cent registration and 80 per cent active members. The April report gives 283 million members and an active share of 81.5 per cent, which it puts at about 266 million; those figures do not agree with each other, and the percentage is the one quoted here. Inactive membership matters for a patient: the minister for villages said at an April 2026 BPJS Kesehatan event that people in villages find their card inactive just when they need treatment. The national cancer plan gives the share of health spending paid by government as 59.4 per cent in 2021 and out-of-pocket spending as 27.5 per cent, down from 60.6 per cent in 2010, and cancer's share of health spending as 2.78 per cent in 2022. Presidential Regulation 59 of 2024 added fourteen screening services to the JKN benefit, including cervical, breast, bowel and lung cancer, and introduced a standard inpatient ward class (KRIS).",
          links: [
            { label: "Metro TV News: Peserta JKN Tembus 284,72 Juta Jiwa (31 October 2026)", url: JKN_OCT },
            { label: "Fortune IDN: Kepesertaan Aktif Baru 81,5 Persen (April 2026)", url: JKN_APR },
            { label: "DJSN: siaran pers Perpres 59 Tahun 2024 (PDF)", url: DJSN },
          ],
        },
        {
          id: "what-patients-pay",
          title: "What is not covered: newer targeted drugs and immunotherapy, and the cost of daily life",
          plain:
            "The national plan states plainly that the JKN benefit does not yet include many targeted and immunotherapy medicines that Indonesian guidelines recommend. In a limited study at Jakarta's national referral hospital, 79 per cent of patients having radiotherapy under JKN reported financial strain in meeting basic household costs.",
          detail:
            "The plan cites the Cipto Mangunkusumo radiotherapy study (Universitas Indonesia, 2024): 38 per cent mild, 39 per cent moderate and 2 per cent severe financial toxicity, for costs such as energy, housing and transport, because not every diagnostic test and essential treatment for the patient's cancer was covered. It also cites a 2015 George Institute for Global Health study across eight South East Asian countries in which 24 per cent of Indonesian patients faced financial catastrophe a year after diagnosis. BPJS Kesehatan claims data for 2022 put the median cost per patient at 34.4 million rupiah for pancreatic cancer and 23.6 million for colorectal cancer. To widen access the plan proposes three co-payment options for medicines: a drug outside the national formulary paid by another insurer or by the patient, co-insurance between JKN and private insurance for a formulary drug, or a branded drug with the patient's consent paid by another insurer while the generic stays covered by JKN.",
          links: [{ label: RKN_L, url: RKN }],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Drug funding",
      title: "How a cancer medicine gets paid for: the national formulary and health technology assessment",
      aside: { label: "BKPK: 2026 health technology assessment round", url: HTA_2026 },
      cards: [
        {
          id: "formulary",
          title: "The Formularium Nasional decides which medicines JKN pays for",
          plain:
            "JKN pays for medicines on the Formularium Nasional, a list set by the health minister and reviewed periodically by a national committee that includes BPOM, BPJS Kesehatan and professional bodies. The ministry says the scheme's medicine service follows this list, and the cancer plan's own proposals treat a medicine outside it as one paid for by another insurer or by the patient.",
          detail:
            "The ministry's pharmaceutical directorate describes the formulary as the list of selected medicines that guides prescribing and serves as a quality and cost control instrument for the insurance programme, first drawn up in 2013 and revised four times with six addenda by September 2022. In July 2022 the formulary committee was merged with the committees for the essential medicines list and the phytopharmaceutical formulary into one national selection committee (Kepmenkes HK.01.07/MENKES/1295/2022), with a term to 31 December 2024. The national cancer plan cites Kepmenkes HK.01.07/MENKES/2197/2023 as the formulary in force, reports work to add cancer medicines and to widen morphine use for palliative care in primary care, and names the national development of an HPV DNA test kit. OnCo could not open the formulary text itself to list which cancer medicines it holds.",
          links: [
            { label: "Ditjen Farmalkes: Tim Fornas audience with the minister (September 2022)", url: FORNAS },
            { label: RKN_L, url: RKN },
          ],
        },
        {
          id: "hta",
          title: "Health technology assessment advises what enters the benefit package",
          plain:
            "The Ministry of Health's health technology assessment committee (Komite Penilaian Teknologi Kesehatan) assesses medicines and screening tests for the JKN benefit package. Its completed cancer assessments include trastuzumab for breast cancer, bevacizumab for bowel cancer, rituximab for lymphoma and pembrolizumab for lung cancer.",
          detail:
            "The plan lists completed cancer assessments of nilotinib for chronic myeloid leukaemia, trastuzumab for early and for metastatic breast cancer, bevacizumab for metastatic colorectal cancer, rituximab for non-Hodgkin lymphoma, lapatinib for metastatic breast cancer, pembrolizumab for metastatic non-small cell lung cancer, cervical screening by HPV DNA, visual inspection and Pap smear, and colorectal screening; and assessments in progress of abiraterone, biosimilar bevacizumab, cetuximab, brigatinib, nimotuzumab, palbociclib, ribociclib, sunitinib and maximum trastuzumab prescribing. The guideline is Permenkes 51 of 2017. For the 2026 round, opened on 30 April, topics are submitted through htaindonesia.kemkes.go.id and ranked by the committee, chaired by Professor Auliya Suwantika, on six criteria: volume, efficacy and safety, cost, fit with policy priorities, potential savings and public acceptability.",
          links: [
            { label: RKN_L, url: RKN },
            { label: "BKPK: Kemenkes buka akses pengajuan usulan topik HTA reguler 2026 (4 May 2026)", url: HTA_2026 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: BPOM and its approval clocks",
      aside: { label: "BPOM: BPOM Percepat Registrasi Obat di 2025", url: BPOM_DEC },
      cards: [
        {
          id: "bpom",
          title: "BPOM can approve in 90 working days by relying on seven reference regulators",
          plain:
            "Every medicine sold in Indonesia needs a licence from BPOM. Since its 2025 rule change, BPOM can approve a medicine in 90 working days instead of 120 by relying on the assessment of the European, United States, Australian, Canadian, British, Japanese or Swiss regulator, and in 100 working days for life-saving and orphan medicines.",
          detail:
            "BPOM's press release of 31 December 2025 said Peraturan BPOM 23 of 2025, the fifth amendment to its 2017 drug registration rule, introduced the reliance mechanism cutting evaluation from 120 to 90 working days. In April 2026 it named the seven reference regulators and gave 50 working days for new medicines from companies investing in Indonesia and 100 working days for life-saving and orphan medicines, medicines for national health programmes, new medicines tested in Indonesian clinical trials, and first registrations by foreign companies investing in Indonesia. It reported the share of accelerated authorisations rising from 70.6 per cent in 2024 to 87.5 per cent in 2026. From 2023 to the end of 2025 BPOM issued 12,111 medicine authorisations, 86.26 per cent for domestic products. These are target clocks in working days; OnCo found no published median of actual approval times for cancer medicines.",
          links: [
            { label: "BPOM: BPOM Percepat Registrasi Obat di 2025 (31 December 2025)", url: BPOM_DEC },
            { label: "BPOM: strategi Kepala BPOM, akses dan tata kelola obat (21 April 2026)", url: BPOM_APR },
          ],
        },
        {
          id: "special-access",
          title: "Unregistered cancer medicines come in through a special access scheme",
          plain:
            "The national plan says many essential and innovative cancer medicines, including immunotherapies, targeted drugs and biological products, are not registered in Indonesia, and that the need for them is met through a special access scheme. It also says Indonesia depends heavily on imported cancer medicines and equipment.",
          detail:
            "The plan names reliance on imports and limited domestic capacity to make essential cancer medicines, innovative medicines and biotechnology products as challenges, and asks BPOM to keep registration and supply mechanisms working for essential and innovative cancer medicines, to support the special access scheme for those not made in Indonesia, and to review and update cancer drug indications on the evidence. One worked example: it records that BPOM was adding retinoblastoma to the registered indications of etoposide for children's cancer, planned for completion in 2025. OnCo did not find a public list of cancer medicines supplied through the special access scheme or how long a request takes.",
          links: [{ label: RKN_L, url: RKN }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening: programmes for six cancers, with coverage far below target",
      aside: { label: "Kemenkes: Cek Kesehatan Gratis reaches 73.8 million (4 August 2026)", url: CKG },
      cards: [
        {
          id: "cervical-screening",
          title: "Cervical screening: visual inspection reached 14.6 per cent in 2023; HPV DNA testing is replacing it",
          plain:
            "Cervical screening at community health centres uses visual inspection with acetic acid (IVA), and is moving to HPV DNA testing for women aged 30 to 69. In 2023 visual inspection reached 14.6 per cent of the target population against a 70 per cent target. The first dose of HPV vaccine reached 90 per cent of girls in the fifth year of primary school nationally in 2023.",
          detail:
            "HPV DNA screening was piloted in Jakarta from July 2023 with a target of 16,000 women aged 30 to 69 (14,790 tested, 99 per cent of a 15,000 target) and extended in 2024 to 35 districts and cities in 16 provinces with visual inspection as a co-test; by July 2024 it had reached 65,920 women, 12 per cent of 538,700, delayed by a laboratory consumable arriving late. The 2023 national action plan for cervical cancer elimination sets HPV DNA screening of 70 per cent of women aged 30 to 69, then 75 per cent, once every ten years; the cancer plan's target is 70 per cent by 2027. HPV vaccination: 90 per cent first-dose coverage nationally in 2023 for girls aged about 11, and 95.9 per cent second-dose coverage in 132 districts and cities of 8 provinces. Among the obstacles the plan names are poor access to early detection in remote areas and cryotherapy for treating precancer being distant and scarce.",
          links: [
            { label: RKN_L, url: RKN },
            { label: "Kemenkes: launch of the national cancer plan (3 October 2024)", url: LAUNCH },
          ],
        },
        {
          id: "breast-screening",
          title: "Breast screening by clinical examination (SADANIS) reached 13.7 per cent in 2023",
          plain:
            "Breast screening is a clinical breast examination (SADANIS) by a trained general practitioner or midwife at a community health centre, followed by ultrasound when something is found. In 2023 it reached 13.7 per cent of women aged 30 to 50 against a 60 per cent target. In February 2026 the health ministry reported that the free health check aims to reach about 40 million women over 30 for breast screening and that about 4 million people had used it so far.",
          detail:
            "The plan sets the breast screening target population as women aged 30 to 69, with a baseline of 14 per cent (cumulative over three years) and a target of 60 per cent by 2027, and reports that the ministry has funded ultrasound machines for every community health centre. At the World Cancer Day event on 4 February 2026, the health ministry reported that the Cek Kesehatan Gratis programme targets about 40 million women over 30 for breast screening and that about 4 million had used it, and that the ministry and RS Kanker Dharmais launched a ten-year national action plan for breast cancer. The plan's other primary care screening is a lung cancer questionnaire with low-dose CT referral for men over 45 who smoke, faecal occult blood testing for bowel cancer, a liver risk questionnaire with blood tests, and a childhood cancer questionnaire; baseline coverage for these was not yet available.",
          links: [
            { label: RKN_L, url: RKN },
            { label: "Ditjen Kesehatan Lanjutan: World Cancer Day 2026 (6 February 2026)", url: WCD },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Different",
      title: "What Indonesia does differently",
      cards: [
        {
          id: "birthday-checks",
          title: "A free health check for every citizen around their birthday",
          plain:
            "Indonesia offers a free health check, the Cek Kesehatan Gratis, to all age groups at more than 10,000 community health centres, schools and community sites. It reached 70 million people in 2025 and 73.8 million by 31 July 2026. The national cancer plan describes free screening for each citizen on their birthday, separate from the insurance scheme, with a breast examination and an HPV DNA test for women aged 30 and over.",
          detail:
            "The national cancer plan describes the programme as free screening for Indonesian citizens on their birthday at primary care facilities, separate from JKN, intended to raise screening coverage and find disease earlier, including cancer; the ministry's 2026 report on the Cek Kesehatan Gratis does not itself mention the birthday timing. The ministry reported on 4 August 2026 that of the 73.8 million people checked, 62.7 million were screened at health centres and community events and 11.1 million were schoolchildren, against a 2026 target of 130 million; its 2026 follow-up concentrates on blood pressure, blood sugar and cholesterol. The ministry has not published, in the pages OnCo read, how many cancers or precancers the programme has found, so its effect on cancer stage at diagnosis is not yet known.",
          links: [
            { label: "Kemenkes: Cek Kesehatan Gratis tembus 73,8 juta peserta (4 August 2026)", url: CKG },
            { label: RKN_L, url: RKN },
          ],
        },
        {
          id: "referral-tiers",
          title: "A tiered cancer hospital network, with a target hospital in every one of 514 districts",
          plain:
            "Indonesia grades hospitals into three cancer tiers: madya (basic tumour surgery and systemic therapy), with a target of one in every district or city, and utama (radiotherapy and surgery for advanced cancer) or paripurna (comprehensive and specialist care), with a target of one or the other in every province. In August 2024 radiotherapy was available in 22 of 34 target provinces, and 65 districts had a madya-tier hospital meeting the standard.",
          detail:
            "Under Kepmenkes HK.01.07/MENKES/1277/2024 on referral hospital networks, the plan counts 570 hospitals in the cancer network: 512 madya, 43 utama and 15 paripurna. Its first-phase target was 257 districts and cities (half of 514) with a madya hospital by 2024, of which 65 (25 per cent) were met by August 2024, and all 514 by 2027; for provinces, 22 of 34 (65 per cent) had an utama or paripurna hospital against 38 by 2027. Its mapping of 514 districts found mammography with staff in 154 (30 per cent), anatomical pathology in 52 (10 per cent) and adult systemic therapy in 66 (13 per cent). The workforce gap it reports is 172 radiation oncologists (173 of 345 needed) and 1,407 anatomical pathologists (852 of 2,259). The ministry's launch statement lists 276 mammography units, 236 CT scanners, 34 SPECT-CT and 8 PET-CT to be added by 2027.",
          links: [
            { label: RKN_L, url: RKN },
            { label: "Kemenkes: launch of the national cancer plan (3 October 2024)", url: LAUNCH },
          ],
        },
        {
          id: "local-vaccine",
          title: "Making its own HPV vaccine and HPV test",
          plain:
            "The national plan commits Indonesia to producing the HPV vaccine at home, through the state company Bio Farma under a technology transfer from MSD, and to making HPV DNA test kits for cervical screening domestically, as part of a push to reduce dependence on imported medicines and equipment.",
          detail:
            "The plan's health resilience pillar lists domestic production of the 14 routine immunisation vaccines, HPV vaccine among them, and names the HPV vaccine project as development and production by PT Bio Farma through technology transfer from PT Merck Sharp Dohme, alongside domestic production of cervical cancer HPV DNA diagnostic kits and real-time PCR in 169 laboratories in 2024 with specimen transport to reference laboratories. BPOM reported in December 2025 that 85 per cent of medicines used in JKN are made in Indonesia. OnCo did not find a published date from which domestically made HPV vaccine is used in the national programme, so that is not stated.",
          links: [
            { label: RKN_L, url: RKN },
            { label: "BPOM: BPOM Percepat Registrasi Obat di 2025 (31 December 2025)", url: BPOM_DEC },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with a site in Indonesia", url: CTGOV },
      cards: [
        {
          id: "trial-sites",
          title: "155 cancer studies on ClinicalTrials.gov list a site in Indonesia; 21 are recruiting or about to",
          plain:
            "ClinicalTrials.gov spells the country 'Indonesia'. A search on 4 November 2026 for cancer studies with a site there returned 155, of which 21 were recruiting or not yet recruiting, against 1,777 studies of any condition. Only 2 trial records in OnCo list an Indonesian site, both small academic or company studies in Jakarta.",
          detail:
            "OnCo queried the ClinicalTrials.gov API v2 for location Indonesia and the condition terms cancer, neoplasm, tumour, carcinoma, lymphoma or leukaemia; a keyword search can include some non-cancer studies. Of the 155, 89 have no phase (29 observational studies and 60 interventional studies that the registry lists as having no phase), 34 are phase 3, 10 phase 2 and 9 phase 4. The commonest lead sponsors are Universitas Indonesia (33), Gadjah Mada University (9), Dharmais National Cancer Center Hospital (8), Hoffmann-La Roche (7) and AstraZeneca (5). In OnCo's graph, the two trials whose ClinicalTrials.gov sites include Indonesia are a phase 1/2 trial of dendritic cells for advanced nasopharyngeal cancer by PT Prodia Stem Cell Indonesia (NCT05261750) and a phase 2 trial of simvastatin in breast cancer by Universitas Indonesia at Cipto Mangunkusumo (NCT05550415). OnCo's file of studies with an Indonesian site for any condition, built on 8 September 2026, counted 1,713.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Indonesia", url: CTGOV },
            { label: "ClinicalTrials.gov NCT05550415", url: "https://clinicaltrials.gov/study/NCT05550415" },
            { label: "ClinicalTrials.gov NCT05261750", url: "https://clinicaltrials.gov/study/NCT05261750" },
          ],
        },
        {
          id: "publications",
          title: "Between about 500 and 1,100 oncology papers a year with an Indonesian author, depending on when OpenAlex is asked",
          plain:
            "OnCo's file built from OpenAlex on 8 September 2026 counts 3,147 oncology papers with at least one Indonesia-based author from 2021 to 2025, rising from 582 in 2021 to 782 in 2025, which places Indonesia 30th among countries in that file. OpenAlex keeps adding and reclassifying papers: the same query on 17 November 2026 returned 4,324 for those five years, with 1,136 for 2025. The national plan wants cancer research built on registry, genomic and death records linked through the ministry's SATUSEHAT platform.",
          detail:
            "The OpenAlex counts use works whose primary topic is oncology, counted wholly for each country with an author there. In OnCo's file of 8 September 2026: 582 in 2021, 508 in 2022, 604 in 2023, 671 in 2024 and 782 in 2025; in the live query on 17 November 2026: 765, 669, 809, 945 and 1,136. The plan notes that most Indonesian cancer research from 2016 to 2020 was clinical observation and early-phase experimental work, and sets out five needs: cross-disciplinary research, integrating electronic medical records and genomic data from the satuDNA platform with SATUSEHAT and with civil registration death records (Dukcapil), translational research, infrastructure, and global research partnerships. It names the Biomedical and Genome Science Initiative (BGSi), which builds a national biobank for six diseases including cancer and offers genomic sequencing. It says survival studies are still limited, possibly because cancer data are not yet linked to population and death records.",
          links: [
            { label: "OpenAlex: works API (oncology subfield 2730, by country)", url: "https://api.openalex.org/works?filter=primary_topic.subfield.id:2730,authorships.countries:ID&group_by=publication_year" },
            { label: RKN_L, url: RKN },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "unreachable",
      title: "Sources that could not be read on 4 November 2026",
      plain:
        "Several official sources did not return readable text to a plain request: the RS Kanker Dharmais website returned an empty page, BPJS Kesehatan's site loads only in a browser, the Ministry of Health's regulation repository did not answer, and Gadjah Mada University's cancer registry pages redirected to a login. What they hold is not on this page.",
      detail:
        "dharmais.co.id returned HTTP 200 with an empty body, so Dharmais's bed numbers, case volumes and services are not described here and its role is sourced from the national cancer plan. bpjs-kesehatan.go.id renders by script, so JKN membership figures are quoted from news reports of the BPJS Kesehatan director's statements rather than from BPJS's own release. The BKPK regulation repository (regulasi.bkpk.kemkes.go.id) did not respond, so the Formularium Nasional decree (Kepmenkes HK.01.07/MENKES/2197/2023) could not be opened to list its cancer medicines. canreg.fk.ugm.ac.id, the Yogyakarta population-based registry, redirected to the university's login, so the Yogyakarta registry's own incidence figures are not given. BPOM's 2017 registration rule could not be read as text, so pathway clocks are quoted from BPOM's own press releases.",
      links: [{ label: RKN_L, url: RKN }],
    },
    {
      id: "figures-not-found",
      title: "Figures OnCo looked for and did not find",
      plain:
        "OnCo found no national cancer incidence count from Indonesia's own registry, no published median approval time for cancer medicines at BPOM, no national screening coverage figure later than 2023, no count of cancers found by the free health check programme, and no current statement of JKN contribution rates read from the regulation itself.",
      detail:
        "The registry's latest published figures are counts for 2013 to 2017 in about 14 per cent of the population; a national rate would have to come from IARC's model. BPOM publishes target clocks in working days and the share of accelerated approvals, not the actual time from submission to approval for each medicine. The 14.6 per cent cervical and 13.7 per cent breast coverage figures are for 2023 from the national plan; the 2026 figure of about 4 million women using the free check for breast screening is a ministerial statement without a published denominator method. Presidential Regulation 59 of 2024 gave a one-year transition to set contributions, benefits and tariffs alongside the standard inpatient class, and OnCo did not confirm which rates are now in force, so what a member pays each month is not stated. Whether any Indonesian registry was accepted for Cancer Incidence in Five Continents Volume XIII could not be confirmed; IARC's site lists volumes I to XII.",
      links: [
        { label: "DJSN: siaran pers Perpres 59 Tahun 2024 (PDF)", url: DJSN },
        { label: "IARC: Cancer Incidence in Five Continents", url: CI5 },
      ],
    },
  ],
  institutions: ["dharmais-cancer-hospital", "kemenkes-indonesia", "bpjs-kesehatan", "bpom-indonesia", "indonesia-cancer-registry", "rscm-jakarta", "iarc", "iaea"],
  companies: ["astrazeneca", "roche-genentech", "bayer", "merck", "sanofi"],
  drugs: [],
  trials: ["nct05550415", "nct05261750"],
  papers: [],
  people: ["eniarti"],
  how:
    "Every card was written from Indonesian official sources read in Indonesian from their raw text: the Ministry of Health's Rencana Kanker Nasional 2024-2034 (updated edition, read with pdftotext and its two key charts checked as images), BPOM's press releases of 31 December 2025 and 21 April 2026, the BKPK announcement of the 2026 health technology assessment round, the DJSN note on Presidential Regulation 59 of 2024, the ministry's news pages on the plan's launch and the free health check, and the Ditjen Kesehatan Lanjutan report of World Cancer Day 2026. JKN membership comes from news reports quoting the BPJS Kesehatan director. Trial counts were read from the ClinicalTrials.gov API v2 on 4 November 2026; GLOBOCAN figures come from OnCo's own file, and OpenAlex figures from OnCo's file and a live query on 17 November 2026. The companies listed are those that lead cancer studies with Indonesian sites on ClinicalTrials.gov or that the national plan names; the five new records (the ministry, BPJS Kesehatan, BPOM, the national cancer registry and Cipto Mangunkusumo hospital) carry their own sources.",
  verify:
    "Incidence and mortality for Indonesia are IARC's modelled estimates, not counts; the registry's own figures are registered cases in about 14 per cent of the population. Screening coverage is for 2023, and BPOM's approval clocks are targets in working days. Whether a particular cancer medicine is paid for depends on the Formularium Nasional and the hospital's tier: ask the hospital pharmacy and BPJS Kesehatan before relying on it.",
  verifyLinks: [
    { label: "Rencana Kanker Nasional 2024-2034 (PDF)", url: RKN },
    { label: "BPOM: medicine registration check (cekbpom)", url: "https://cekbpom.pom.go.id/" },
    { label: "BPJS Kesehatan", url: "https://www.bpjs-kesehatan.go.id" },
    { label: "ClinicalTrials.gov: cancer studies in Indonesia", url: CTGOV },
  ],
};

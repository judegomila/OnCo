import type { CountryDive } from "@/data/country-dive";

/**
 * Tanzania deep dive: the hand-written cards for /countries/tz/ (wave 6). Every figure was read from the raw text of
 * its source on 11 November 2026, not from a summary of it: the Ministry of Health's Tanzania Population-Based Cancer
 * Registry Report 2019 to 2023 (July 2025, PDF text), the Universal Health Insurance Act No. 13 of 2023 and its
 * commencement notice GN 700A of 2024 (Swahili PDF text), the National Health Insurance Fund Act (Cap 395), the Fund's
 * September 2026 news page, TMDA's October 2025 notice, WHO Africa's December 2018 release, NIAID ClinRegs' Tanzania
 * profile, the IAEA's December 2025 imPACT Review article and its Tanzania country sheet (both through the Internet
 * Archive, as the IAEA site showed a bot challenge), Ocean Road Cancer Institute's own pages, WHO's immunisation
 * coverage rows for Tanzania from its public data API, IARC's GLOBOCAN 2024 fact sheet, newspaper reports on the KCMC
 * and Benjamin Mkapa Hospital centres and on Zanzibar, GIZ's account of the Zanzibar Health Services Fund, and the
 * papers' abstracts through Europe PMC. Where a figure could not be read it is named under `gaps`.
 */
const PBCR_REPORT = "https://www.moh.go.tz/storage/app/uploads/public/691/ae9/8de/691ae98de1840169550933.pdf";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/834-tanzania-united-republic-of-fact-sheet.pdf";
const IAEA_IMPACT_WB = "https://web.archive.org/web/20251211230258/https://www.iaea.org/newscenter/news/international-review-sees-progress-in-cancer-control-in-tanzania";
const IAEA_TC_WB = "https://web.archive.org/web/20260301091525/https://www.iaea.org/sites/default/files/20/07/tc-tanzania.pdf";
const NCCS = "https://www.iccp-portal.org/system/files/plans/NCSS%20Book.pdf";
const UHI_ACT = "https://www.nhif.or.tz/uploads/documents/sw-1736978659-sw1729595633-Sheria%20ya%20Bima%20ya%20Afya%20kwa%20Wote.pdf";
const UHI_GN = "https://www.nhif.or.tz/uploads/documents/sw-1744266564-BIMA-GN%20NO.%20700A%20OF%202024%20-%20TANGAZO-KUANZA%20KUTUMIKA.pdf";
const NHIF_ACT = "https://www.nhif.or.tz/uploads/documents/sw-1736978743-sw1729595522-THE%20NATIONAL%20HEALTH%20INSURANCE%20FUND%20Cap%20395.pdf";
const NHIF_AK = "https://www.nhif.or.tz/news/agha-khan-kuhudumia-wanachama-wa-nhif";
const NCDA_UHI = "https://ncdalliance.org/stories/news-blogs/2023/tanzania-civil-society-celebrates";
const TMDA_ML3 = "https://www.tmda.go.tz/news/tmda-maintains-who-maturity-level-3-ml3-status";
const WHO_TFDA = "https://www.afro.who.int/news/tanzania-first-african-country-reach-important-milestone-regulation-medicines";
const CLINREGS = "https://clinregs.niaid.nih.gov/country/tanzania";
const ORCI_WHO = "https://www.orci.or.tz/who-are-we/";
const ORCI_HIST = "https://www.orci.or.tz/historical-background/";
const KCMC_GUARDIAN = "https://ippmedia.co.tz/the-guardian/news/local-news/read/president-samia-to-unveil-kcmc-radiotherapy-centre-in-kilimanjaro-2026-06-24-125413";
const BMH_CITIZEN = "https://thecitizen.co.tz/tanzania/news/national/tanzania-s-benjamin-mkapa-hospital-set-to-become-regional-cancer-hub-5348178";
const ZNZ_CASES = "https://ippmedia.co.tz/the-guardian/news/local-news/read/cancer-cases-surge-in-zanzibar-as-experts-warn-high-risk-groups-2026-02-06-090910";
const ZNZ_ORCI = "https://ippmedia.co.tz/the-guardian/news/local-news/read/zanzibaris-urged-to-take-preventives-measures-amid-surging-cancer-cases-2025-01-16-173323";
const ZNZ_HOSPITAL = "https://ippmedia.co.tz/the-guardian/news/local-news/read/zanzibar-eyes-new-cancer-hospital-as-burden-climbs-2025-03-23-210741";
const ZHSF_GIZ = "https://health.bmz.de/stories/zanzibar-introduces-universal-health-insurance-with-co-ordinated-p4h-support/";
const WHO_IMM_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'TZA'";
const CTGOV = "https://clinicaltrials.gov/search?country=Tanzania&cond=cancer";

export const TZ_DIVE: CountryDive = {
  iso2: "TZ",
  iso3: "TZA",
  name: "Tanzania",
  flag: "🇹🇿",
  asOf: "2026-11-11",
  title: "Cancer in Tanzania",
  description:
    "Cancer in Tanzania from Tanzanian sources: IARC's estimate of 29,044 new cancers and 18,661 deaths in 2024, the Ministry of Health's first report from five population-based registries (16,516 cancers in 2019 to 2023, 86% without a recorded stage), the 2023 Universal Health Insurance Act, the medicines regulator TMDA and its WHO maturity level 3 rating, single-dose HPV vaccination, radiotherapy spreading from Dar es Salaam to Mwanza and Moshi, Zanzibar's separate system, and why no trial in our records has a site in Tanzania.",
  lede:
    "Tanzania counts cancer through five registries on the mainland, which covered about 6 million people and recorded 16,516 cancers from 2019 to 2023; cervical, prostate, oesophageal and breast cancer lead. IARC's estimate for the whole country in 2024 is 29,044 new cancers and 18,661 deaths. Most patients are diagnosed late, and radiotherapy, long available only in Dar es Salaam, has begun to reach other regions.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Tanzania is 29,044 new cancers and 18,661 deaths, an age-standardised incidence of 77.9 per 100,000 (78.0 in men, 81.1 in women), including non-melanoma skin cancer. IARC's fact sheet gives its incidence method as subnational registry rates applied to the 2024 population, and its mortality method as national incidence applied to modelled mortality-to-incidence ratios from registry survival data; it does not name the registries used, and OnCo did not read IARC's detailed methods page. The Ministry of Health's five registries show why a single national rate is uncertain: their all-sites rates for 2019 to 2023 run from 43.2 (men) and 58.8 (women) per 100,000 in Mbeya to 175.4 and 195.3 in Dodoma, and the Ministry reads both ends as partly artefacts of incomplete case finding, outdated population figures and wrongly recorded residence. IARC's 2024 figure is also well below the GLOBOCAN 2022 estimate that the registry report quotes, 44,931 new cancers at 140.1 per 100,000, and below the about 40,000 cases a year that the IAEA and the Ministry cite; a change of that size between editions most likely reflects a change in the data and method used, not a fall in cancer, but IARC's explanation was not found. Deaths divided by new cases give 0.64 for 2024. The registries cover mainland Tanzania only, so Zanzibar's 1.9 million people are inside IARC's estimate but outside the registry counts.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Tanzania",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Tanzania (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "Cervical cancer first in women, prostate and oesophageal cancer first in men",
          plain:
            "IARC estimates 29,044 new cancers in Tanzania in 2024: 16,759 in women and 12,285 in men. Cervical cancer is the commonest cancer overall and the commonest cause of cancer death; prostate and oesophageal cancer lead in men. For every ten new cancers IARC estimates about six cancer deaths in the same year, and most patients reach care with advanced disease.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 4,966 cervical cancers (3,011 deaths), 3,024 breast cancers (1,492 deaths), 2,915 prostate cancers (1,768 deaths), 2,875 oesophageal cancers (2,617 deaths), 1,957 colorectal cancers, 1,250 liver cancers and 721 Kaposi sarcomas. Cervical cancer is 29.6% of cancers in women; in men prostate (23.7%) and oesophagus (15.3%) lead. The risk of developing a cancer before age 75 is 8.6% for men and 9.0% for women, and an estimated 54,958 people are living within five years of a diagnosis. The Ministry of Health's registries found the same leading cancers over 2019 to 2023: cervix 2,478, prostate 1,852, oesophagus 1,752 and breast 1,679. Of the 14% of registered cases with a recorded stage, 36% were stage IV and 32% stage III; 86% had no stage recorded. The IAEA's December 2025 review says more than 70% of patients present at late stages.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Tanzania (PDF)", url: IARC_FACTSHEET },
            { label: "Ministry of Health: Tanzania Population-Based Cancer Registry Report 2019 to 2023, sections 4.3 and 4.10 (PDF)", url: PBCR_REPORT },
            { label: "IAEA: international review sees progress in cancer control in Tanzania (10 December 2025; Internet Archive copy)", url: IAEA_IMPACT_WB },
          ],
        },
        {
          id: "care-capacity",
          title: "Radiotherapy in Dar es Salaam, Mwanza and, since February 2026, Moshi",
          plain:
            "Radiotherapy in Tanzania has been concentrated at Ocean Road Cancer Institute in Dar es Salaam. Bugando Medical Centre in Mwanza now treats over 1,000 patients a year, and Kilimanjaro Christian Medical Centre in Moshi began radiotherapy in February 2026. Centres are planned in Dodoma, Mbeya and Zanzibar, but reviewers found too few machines and frequent breakdowns.",
          detail:
            "The IAEA's Tanzania country sheet (read in its March 2026 archived copy) states that Ocean Road Cancer Institute moved from 2D to 3D radiotherapy through an upgrade with new bunkers, two new linear accelerators, a CT simulator and brachytherapy equipment, serving 4,000 patients a year, and that Bugando Medical Centre treats over 1,000 patients a year with a cobalt-60 machine, a simulator, brachytherapy and a SPECT gamma camera. KCMC began limited radiotherapy on 25 February 2026 in a building costing about 17 billion shillings; reports at its June 2026 opening described two installed machines (a linear accelerator and a brachytherapy unit) in a building designed for five, about 1,500 patients a year, and 80 treated by June. Benjamin Mkapa Hospital's centre in Dodoma was reported 61% complete in February 2026, due to treat patients from September. The September 2025 imPACT Review commended the expansion, named Dodoma, Mbeya and Zanzibar as planned sites, and found a shortage of specialised staff, frequent equipment breakdowns and an inadequate number of radiotherapy machines for more than 60 million people.",
          links: [
            { label: "IAEA: United Republic of Tanzania country sheet (Internet Archive copy, March 2026)", url: IAEA_TC_WB },
            { label: "IAEA: international review sees progress in cancer control in Tanzania (Internet Archive copy)", url: IAEA_IMPACT_WB },
            { label: "The Guardian (Tanzania): President Samia to unveil KCMC radiotherapy centre (24 June 2026)", url: KCMC_GUARDIAN },
            { label: "The Citizen: Benjamin Mkapa Hospital set to become regional cancer hub (February 2026)", url: BMH_CITIZEN },
          ],
        },
      ],
      tables: [
        {
          id: "tz-registry",
          title: "What Tanzania's five population-based cancer registries counted, 2019 to 2023",
          caption: "Registered cancers and age-standardised incidence per 100,000 for all sites, by registry, 2019 to 2023, from the Ministry of Health's report of July 2025.",
          columns: [
            { key: "registry", label: "Registry (host hospital)" },
            { key: "est", label: "Established" },
            { key: "pop", label: "Average population covered", numeric: true },
            { key: "cases", label: "Cancers registered", numeric: true },
            { key: "men", label: "All sites, men", numeric: true },
            { key: "women", label: "All sites, women", numeric: true },
          ],
          rows: [
            { registry: "Kilimanjaro (Kilimanjaro Christian Medical Centre)", est: "2017", pop: 1490511, cases: 6161, men: 107.9, women: 86.6 },
            { registry: "Dar es Salaam, Ilala (Ocean Road Cancer Institute)", est: "2018", pop: 1649912, cases: 3521, men: 73.9, women: 88.2 },
            { registry: "Dodoma municipal (Benjamin Mkapa Hospital)", est: "2018", pop: 633181, cases: 2999, men: 175.4, women: 195.3 },
            { registry: "Mwanza (Bugando Medical Centre)", est: "2016", pop: 1036781, cases: 2220, men: 99.7, women: 100.4 },
            { registry: "Mbeya (Mbeya Zonal Referral Hospital)", est: "2018", pop: 1161411, cases: 1615, men: 43.2, women: 58.8 },
            { registry: "All five registries", est: null, pop: 5971796, cases: 16516, men: null, women: null },
          ],
          note: "Rates are from the report's table 14 (source CanReg5). The report's own text gives different values in places: Dodoma 175.5 and 195.1, Kilimanjaro men 103.1, Mwanza men 99.6 and women 99.5, Dar es Salaam women 99.5 (against 88.2 in the table), and Mbeya 43.1 and 58.6. Its table 14 also gives Mbeya 1,616 cases by sex against 1,615 in the total. The table is used here. The report gives no pooled all-sites rate; it gives prostate (29.5 per 100,000) and cervical cancer (19.0) as the leading sites nationally in its summary, and 29.9 and 18.8 in its discussion. Registries count new cases, not deaths, and cover the mainland only.",
          sources: [{ label: "Ministry of Health: Tanzania Population-Based Cancer Registry Report 2019 to 2023, tables 1 and 14 (PDF)", url: PBCR_REPORT }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: five hospital-based teams covering about 6 million people",
      aside: { label: "Tanzania Population-Based Cancer Registry Report 2019 to 2023 (PDF)", url: PBCR_REPORT },
      cards: [
        {
          id: "registry-five",
          title: "A first national registry report in 2025, and the gaps it names itself",
          plain:
            "Tanzania's Ministry of Health published its first population-based cancer registry report in July 2025, drawing on five registries hosted at hospitals in Dar es Salaam, Dodoma, Moshi, Mbeya and Mwanza. Together they cover about 6 million of the mainland's 60 million people. The report is frank that cases are missed and that most records lack a stage.",
          detail:
            "The Ministry, with Vital Strategies through the Bloomberg Data for Health initiative and the African Cancer Registry Network, set up and strengthened the five registries from 2017, trained registrars and approved a national cancer registration plan; the report's introduction says the Kilimanjaro registry had existed since 2007 (its Kilimanjaro section says 1998), and those in Dar es Salaam and Mwanza grew out of hospital registries. Registrars collect cases from hospitals, pathology and radiology departments, medical records, death certificates and oncology units. The report records 3,058 cancers in 2019 rising to 3,448 in 2023. It names the obstacles: cancer is not a notifiable disease by law, private facilities restrict access to their records, and too few registrars are deployed. The share of cases based on death certificates is given as 1.8% (death certificate only) in its summary and 14% in its discussion, 18% in Dodoma, and it reports that registrars had limited training in TNM staging. A 2015 check of the Kilimanjaro registry found 98% agreement with medical records on primary site but only 6 of 100 cases staged. The Ministry plans an advisory committee for cancer control and to link the registry software, CanReg, with the national DHIS2 health information system.",
          links: [
            { label: "Ministry of Health: Tanzania Population-Based Cancer Registry Report 2019 to 2023 (PDF)", url: PBCR_REPORT },
            { label: "Zullig et al., validation and quality assessment of the Kilimanjaro Cancer Registry (J Glob Oncol 2016)", url: "https://doi.org/10.1200/jgo.2015.002873" },
            { label: "Olson et al., Bugando cancer registry 2008 to 2016 (Cancer Epidemiol 2020)", url: "https://doi.org/10.1016/j.canep.2020.101772" },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: a public insurer for some, and a 2023 law to cover everyone",
      aside: { label: "National Health Insurance Fund: laws and regulations", url: "https://www.nhif.or.tz/publications/act" },
      cards: [
        {
          id: "nhif",
          title: "The National Health Insurance Fund pays for members' cancer care at named hospitals",
          plain:
            "Tanzania's National Health Insurance Fund was set up in 1999 for government employees. Ocean Road Cancer Institute treats its members, and in September 2026 the Fund agreed that members can also be treated, cancer care in particular, at the Aga Khan hospitals in Dar es Salaam and Mwanza. Most Tanzanians have not been insured.",
          detail:
            "The National Health Insurance Fund Act (Act No. 8 of 1999, now Chapter 395) came into force on 1 December 1999 to pay health care benefits to certain government employees. Ocean Road Cancer Institute's own pages say it serves NHIF beneficiaries as well as private, international and privately insured patients. The Fund's news page of 25 September 2026 reports an agreement, signed by its Director General Dr Irene C. Isaka and the Aga Khan's chief executive for East Africa, Dr Zeenat Sulaiman, under which members can receive specialist treatment, cancer treatment in particular, at the Aga Khan Hospital in Dar es Salaam, its Mwanza hospital and 14 clinics. The NCD Alliance, writing in December 2023, said only about 15% of Tanzanians had health insurance at the end of 2021. The Fund's published benefit packages and any limits on chemotherapy or radiotherapy could not be read on its site.",
          links: [
            { label: "National Health Insurance Fund Act, Chapter 395 (PDF)", url: NHIF_ACT },
            { label: "NHIF: NHIF and Aga Khan agree treatment for members (25 September 2026, Swahili)", url: NHIF_AK },
            { label: "Ocean Road Cancer Institute: who we are", url: ORCI_WHO },
            { label: "NCD Alliance: Tanzania civil society celebrates signing of Universal Health Insurance bill into law (December 2023)", url: NCDA_UHI },
          ],
        },
        {
          id: "uhi-act",
          title: "The Universal Health Insurance Act of 2023 includes specialist care, but compulsory cover has not started",
          plain:
            "A 2023 law aims to give every mainland Tanzanian health insurance. Its essential package includes specialist and super-specialist services and essential medicines, and it creates a fund to pay for people who cannot afford cover, which can also pay for long-term illness. Most of the law took effect in August 2024, but the clause making insurance compulsory did not.",
          detail:
            "The Universal Health Insurance Act No. 13 of 2023 was passed by Parliament on 1 November 2023, assented to by President Samia Suluhu Hassan on 19 November 2023 and published on 1 December 2023; it applies to mainland Tanzania. Part A of its schedule, the essential benefit package, lists consultation, laboratory and radiology tests, admission, medicines on the national essential medicines list, surgery, and specialist and super-specialist services; Part B, the community package for people with no other insurance, lists the same without specialist services. Section 25 sets up a fund to pay insurance for people unable to pay, which may also pay for treatment of chronic and long-term illness, financed among other sources by levies on electronic transactions, excise on soft drinks, alcohol and cosmetics, a gaming tax and a motor insurance fee. The Minister's notice GN 700A brought the Act into force on 16 August 2024 except section 5 (compulsory insurance) and some sections of Parts 7, 8 and 9. The NCD Alliance put those unable to pay at 15.8 million people, 26% of the population, and described the fund as covering people with cancer.",
          links: [
            { label: "Universal Health Insurance Act No. 13 of 2023 (Swahili, PDF)", url: UHI_ACT },
            { label: "GN 700A of 2024: commencement of the Universal Health Insurance Act (Swahili, PDF)", url: UHI_GN },
            { label: "NCD Alliance: Tanzania civil society celebrates signing of Universal Health Insurance bill into law", url: NCDA_UHI },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Who approves medicines and trials: TMDA on the mainland, a separate agency in Zanzibar",
      aside: { label: "Tanzania Medicines and Medical Devices Authority", url: "https://www.tmda.go.tz/" },
      cards: [
        {
          id: "tmda-ml3",
          title: "The first African regulator WHO rated at maturity level 3, confirmed again after 2023",
          plain:
            "The Tanzania Medicines and Medical Devices Authority decides which medicines and devices can be sold on the mainland. In 2018 WHO confirmed its predecessor as the first regulator in Africa with a well-functioning system, maturity level 3 on WHO's scale, and TMDA says it kept that level after WHO reassessed it in 2023.",
          detail:
            "WHO Africa's release of December 2018 says that after self-assessments and a formal evaluation of both the Tanzania Food and Drugs Authority on the mainland and the Zanzibar Food and Drug Agency, the mainland authority met all indicators for maturity level 3, the second highest level on WHO's Global Benchmarking Tool, which checks more than 200 indicators; it gives July 2003 as the authority's founding. TMDA's public notice of 17 October 2025 says it kept maturity level 3 after WHO's 2023 re-benchmarking and is aiming for level 4. TMDA's site lists East African Community mutual recognition procedures among its services. Which cancer medicines TMDA has registered, and how long registration takes, were not found in the sources read.",
          links: [
            { label: "WHO Africa: Tanzania is first African country to reach an important milestone in the regulation of medicines (December 2018)", url: WHO_TFDA },
            { label: "TMDA: TMDA maintains WHO maturity level 3 status (17 October 2025)", url: TMDA_ML3 },
          ],
        },
        {
          id: "trial-approval",
          title: "A trial needs national ethics clearance and TMDA authorisation within 60 working days",
          plain:
            "Every clinical trial in Tanzania needs approval from the National Health Research Ethics Committee and from TMDA. TMDA aims to finish evaluating an application within 60 working days, or 30 on a fast track that costs twice the fee. Foreign researchers also need a research permit from the national science commission.",
          detail:
            "NIAID's ClinRegs profile for Tanzania, which summarises the national regulations and guidelines, states that TMDA evaluates applications first in, first out, with external evaluators, completes evaluation within 60 working days of receipt, and may fast-track a new application to 30 working days if the applicant asks and pays twice the fee; the clock stops while TMDA waits for answers to queries, which must come within six months. Authorisation lasts for the proposed duration of the trial up to five years. All clinical trials, and all health research with foreign collaborators, need ethics approval from both the National Health Research Ethics Committee at the National Institute for Medical Research and the institutional or zonal committee. The Tanzania Commission for Science and Technology normally processes a research permit within 14 working days. TMDA's own guideline was not read; these times are ClinRegs' summary of it.",
          links: [
            { label: "NIAID ClinRegs: Tanzania (regulatory authority, ethics committee, timeline of review)", url: CLINREGS },
            { label: "TMDA: clinical trials portal", url: "https://imis2.tmda.go.tz/portal/#/public/clinical-trials" },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination: HPV vaccine reaches most girls, screening reaches few women",
      aside: { label: "WHO immunisation coverage data for Tanzania (public API)", url: WHO_IMM_API },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination since 2018, a single dose since 2024",
          plain:
            "Tanzania began vaccinating girls against HPV nationally in April 2018, after a pilot in Kilimanjaro, and moved to a single dose in 2024. The IAEA's reviewers reported 98% coverage of girls aged 9 to 14 through school campaigns. Part of the evidence that one dose works came from a trial in Mwanza schools.",
          detail:
            "The 2018 introduction targeted 14-year-old girls with two doses; at the end of 2019 administrative coverage was 78% for the first dose and 49% for the second. WHO's coverage rows for Tanzania give HPV programme coverage of girls for the last dose of 19% in 2018, 56% in 2020, 62% in 2022, 91% in 2023, 94% in 2024 and 99% in 2025. The IAEA's December 2025 review says single-dose vaccination introduced in 2024 achieved 98% coverage among 9 to 14 year olds through school campaigns, and urged efforts to reach girls out of school. The DoRIS trial, which enrolled 930 girls from 54 government schools in Mwanza in 2017 and 2018, found that antibody levels two years after one dose were not inferior to those in cohorts where one dose had protected for up to 11 years.",
          links: [
            { label: "Mphuru et al., national introduction of HPV vaccine in Tanzania (Vaccine 2022)", url: "https://doi.org/10.1016/j.vaccine.2021.04.025" },
            { label: "WHO: immunisation coverage rows for Tanzania (public data API)", url: WHO_IMM_API },
            { label: "IAEA: international review sees progress in cancer control in Tanzania (Internet Archive copy)", url: IAEA_IMPACT_WB },
            { label: "Baisley et al., DoRIS one-dose HPV vaccine immunobridging (Lancet Glob Health 2022)", url: "https://doi.org/10.1016/s2214-109x(22)00306-0" },
          ],
        },
        {
          id: "cervical-screening",
          title: "About one woman in eight aged 30 to 49 has been screened for cervical cancer",
          plain:
            "Cervical cancer is Tanzania's commonest cancer, yet surveys find few women have ever been screened: 7% of women aged 15 to 49 in 2022, and 12.6% of women aged 30 to 49 in 2020 to 2023. HPV testing has been piloted but not scaled up. WHO's target is 70%.",
          detail:
            "An analysis of the 2022 Tanzania Demographic and Health Survey (15,254 women) found 7% of women aged 15 to 49 had ever been screened; women in rural areas, the poorest and those never insured were less likely to have been, and women living with HIV more likely. Two rounds of population-based HIV impact surveys found screening among women aged 30 to 49 rose from 8.3% in 2015 to 2017 to 12.6% in 2020 to 2023, the lowest of the four countries surveyed. The IAEA's December 2025 review called screening limited, especially for women's cancers, said HPV tests had been introduced as a pilot and needed scaling up, and recommended a phased, resource-sensitive expansion of screening and early diagnosis.",
          links: [
            { label: "Mahiti et al., cervical screening in the 2022 Tanzania DHS (Arch Public Health 2025)", url: "https://doi.org/10.1186/s13690-025-01629-w" },
            { label: "McCormick et al., cervical screening coverage in four PHIA surveys (J Acquir Immune Defic Syndr 2026)", url: "https://doi.org/10.1097/qai.0000000000003880" },
            { label: "IAEA: international review sees progress in cancer control in Tanzania (Internet Archive copy)", url: IAEA_IMPACT_WB },
          ],
        },
        {
          id: "hepatitis-b",
          title: "Hepatitis B vaccine in infancy, but no birth dose recorded",
          plain:
            "Chronic hepatitis B infection is a cause of liver cancer, and IARC estimates 1,250 liver cancers in Tanzania in 2024. Tanzanian infants receive hepatitis B vaccine in their routine schedule, with WHO and UNICEF estimating 83% complete coverage, but WHO's data hold no coverage figure for a dose at birth.",
          detail:
            "WHO's immunisation coverage rows for Tanzania give the WHO and UNICEF estimate for the third dose of hepatitis B vaccine as 89% in 2018, 91% in 2019 and 2020, 86% in 2021, 87% in 2022 and 83% in 2023, 2024 and 2025; the government's official figure for 2025 is 94%. The rows for a birth dose given within 24 hours, and for any birth dose, are empty for every year from 2018 to 2025. The registry report counted 766 liver cancers in 2019 to 2023, rising from 83 in 2019 to 224 in 2022 and 207 in 2023.",
          links: [
            { label: "WHO: immunisation coverage rows for Tanzania (public data API)", url: WHO_IMM_API },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Tanzania (PDF)", url: IARC_FACTSHEET },
            { label: "Ministry of Health: Tanzania Population-Based Cancer Registry Report 2019 to 2023, section 4.3 (PDF)", url: PBCR_REPORT },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What is being done",
      title: "What is being done: new centres, training and a review to shape the next plan",
      cards: [
        {
          id: "orci",
          title: "Ocean Road Cancer Institute, the national cancer institute since 1996",
          plain:
            "Ocean Road Cancer Institute in Dar es Salaam is Tanzania's national cancer institute, set up by Act of Parliament in 1996 in a hospital built in the 1890s. Its website describes it as the only comprehensive specialised cancer facility in Tanzania and says it serves about 28,000 cancer patients. It also hosts the Dar es Salaam registry.",
          detail:
            "ORCI's history page says the Ocean Road hospital was inaugurated in October 1895 under German colonial rule, served mainly Europeans under the colonial governments, was opened to all Tanzanians after independence in 1961, became the radiotherapy hub for the Muhimbili Medical Centre in 1980, and was made an autonomous National Cancer Institute by Act No. 2 of 1996. Its pages say it serves more than 50,000 patients, about 28,000 of them cancer patients, 10,000 screening clients and 12,000 non-cancer patients, plus over 15,000 people in outreach, and offers laboratory, imaging, chemotherapy, radiotherapy, palliative care and cervical screening; they give no year for these counts. The IAEA states that it helped establish clinical oncology training at ORCI in 2010 and helped launch Tanzania's first undergraduate and postgraduate medical physics programmes. KCMC's executive director said in June 2026 that its patients had for years been referred there for radiotherapy, and Zanzibar's health ministry says many Zanzibari patients are treated there.",
          links: [
            { label: "Ocean Road Cancer Institute: historical background", url: ORCI_HIST },
            { label: "Ocean Road Cancer Institute: who we are", url: ORCI_WHO },
            { label: "IAEA: international review sees progress in cancer control in Tanzania (Internet Archive copy)", url: IAEA_IMPACT_WB },
          ],
        },
        {
          id: "impact-2025",
          title: "A September 2025 review to inform the plan that follows the 2013 to 2022 strategy",
          plain:
            "Tanzania's National Cancer Control Strategy ran from 2013 to 2022. In September 2025, 11 experts from the IAEA, WHO and IARC reviewed cancer services in Dar es Salaam, Mwanza, Dodoma and Zanzibar to inform a new national plan. They recommended building the oncology workforce, wider screening and better maintenance of radiotherapy machines.",
          detail:
            "The IAEA's article of 10 December 2025 says the imPACT Review assessed progress since a previous review in 2006, found that Tanzania had prioritised cancer by implementing the 2013 to 2022 strategy, noted a modest fall in adult smoking and urged tobacco taxes and anti-smoking campaigns. It found around half of the country's pathologists working in Dar es Salaam, good local training and retention that could support telepathology, and a well-established imaging training programme at Muhimbili University; it suggested more interventional radiology, mammography and training in nuclear medicine, physics and radiopharmacy, and recommended in-house engineers, multidisciplinary teams and quality assurance at radiotherapy centres. The IAEA's country sheet adds that in 2023 the government approved a bankable document to raise funds for expanding radiotherapy and nuclear medicine. A successor national cancer plan was not found published.",
          links: [
            { label: "IAEA: international review sees progress in cancer control in Tanzania (10 December 2025; Internet Archive copy)", url: IAEA_IMPACT_WB },
            { label: "IAEA: United Republic of Tanzania country sheet (Internet Archive copy)", url: IAEA_TC_WB },
            { label: "National Cancer Control Strategy 2013 to 2022 (PDF, ICCP portal)", url: NCCS },
          ],
        },
      ],
    },
    {
      id: "zanzibar",
      nav: "Zanzibar",
      title: "Zanzibar: a separate health system, insurer and regulator",
      cards: [
        {
          id: "zanzibar-system",
          title: "About 300 cancers a year recorded in Zanzibar, with radiotherapy still on the mainland",
          plain:
            "Zanzibar, the semi-autonomous islands of Unguja and Pemba with about 1.9 million people at the 2022 census, has its own Ministry of Health, insurer and medicines agency. Its health ministry reported 1,533 cancers and 400 cancer deaths over five years. Patients needing radiotherapy travel to Ocean Road in Dar es Salaam, and a cancer hospital is planned.",
          detail:
            "The head of the non-communicable diseases unit in Zanzibar's Ministry of Health told a World Cancer Day briefing in February 2026 that the islands had recorded 1,533 cancer cases and 400 deaths over the past five years, the commonest being breast, cervical, prostate, brain and tissue cancers. In January 2025 the unit's assistant manager said many Zanzibari patients are treated at Ocean Road Cancer Institute. In March 2025 Zanzibar's Health Minister, Nassor Ahmed Mazrui, told an IAEA and Tanzania Atomic Energy Commission delegation that Zanzibar intends to build a cancer hospital offering radiotherapy, chemotherapy and surgery, and the IAEA's December 2025 review lists Zanzibar among planned radiotherapy sites. The mainland's five registries and its 2023 insurance law do not cover Zanzibar. The Zanzibar Health Services Fund, established by an Act in March 2023, began operating in July 2023; GIZ reports that out-of-pocket spending was 19% of total health spending in 2017/18. The Zanzibar Food and Drug Agency was assessed alongside the mainland regulator by WHO in 2018.",
          links: [
            { label: "The Guardian (Tanzania): cancer cases surge in Zanzibar (6 February 2026)", url: ZNZ_CASES },
            { label: "The Guardian (Tanzania): Zanzibaris urged to take preventive measures (17 January 2025)", url: ZNZ_ORCI },
            { label: "The Guardian (Tanzania): Zanzibar eyes new cancer hospital (24 March 2025)", url: ZNZ_HOSPITAL },
            { label: "GIZ Healthy DEvelopments: Zanzibar introduces universal health insurance (25 September 2023)", url: ZHSF_GIZ },
            { label: "Ministry of Health: Tanzania Population-Based Cancer Registry Report 2019 to 2023, table 2 (2022 census population, PDF)", url: PBCR_REPORT },
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
          id: "trials-research",
          title: "No trial in OnCo's records has a site in Tanzania",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, none of the cancer trials in our records lists a site in Tanzania. Tanzanian cancer research on this page is registry work, surveys and one HPV vaccine trial in Mwanza schools, DoRIS, which OnCo does not hold as a trial record.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 0 trials list Tanzania among their countries. That reflects the trials OnCo holds, mostly large industry and academic trials of new medicines, not every study in Tanzania; the search linked below shows the cancer studies registered there. OpenAlex, counting works whose primary topic is oncology and counting a paper for every country among its authors' affiliations, gives Tanzania 32 works in 2021, 49 in 2022, 52 in 2023, 71 in 2024 and 79 in 2025, 283 in total, of which 232 are open access and 2 highly cited (OnCo's country file, built 8 September 2026). The DoRIS trial (NCT02834637), run in Mwanza with British, American and Gates Foundation funding, contributed evidence for single-dose HPV vaccination. Registry papers from Kilimanjaro and Bugando show prostate cancer found late (43.6% of assessed men metastatic at diagnosis) and a regional centre seeing only 12.2% of expected cancers. Before a trial opens it needs national ethics clearance and TMDA authorisation.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Tanzania (search)", url: CTGOV },
            { label: "OpenAlex: works by country", url: "https://openalex.org" },
            { label: "Ngowi et al., prostate cancer in the Kilimanjaro registry 2015 to 2021 (BMC Cancer 2024)", url: "https://doi.org/10.1186/s12885-024-13194-6" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "iaea-sources",
      title: "The IAEA's pages were read through the Internet Archive, and DIRAC was not read",
      plain:
        "The IAEA's website answered OnCo's request with a bot challenge, so its December 2025 review article and its Tanzania country sheet were read in Internet Archive copies. The full imPACT Review report is not public, and the IAEA's DIRAC count of radiotherapy machines and staff for Tanzania was not read.",
      detail:
        "The archived article is dated 10 December 2025 and the country sheet copy was captured on 1 March 2026; the IAEA's live pages may since have changed. The imPACT Review's report goes to the government, and only the IAEA's summary article was available. Without DIRAC or the report, this page cannot give a current count of linear accelerators, cobalt units, radiation oncologists or medical physicists in Tanzania; the machine counts it gives come from the country sheet and newspaper reports on single centres. The 2006 imPACT Review was not read. Whether Benjamin Mkapa Hospital's centre began treating patients in September 2026 as planned was not found.",
      links: [
        { label: "IAEA: international review sees progress in cancer control in Tanzania (Internet Archive copy)", url: IAEA_IMPACT_WB },
        { label: "IAEA: United Republic of Tanzania country sheet (Internet Archive copy)", url: IAEA_TC_WB },
      ],
    },
    {
      id: "plan-and-estimates",
      title: "No successor cancer plan found, and IARC's large revision unexplained",
      plain:
        "Tanzania's National Cancer Control Strategy ended in 2022 and no successor was found published. Most of the 2013 to 2022 strategy's text is encoded in a font that extracts as unreadable characters, so only its structure was read. Why IARC's 2024 estimate is about a third lower than its 2022 estimate was not found.",
      detail:
        "The 2013 to 2022 strategy's PDF on the ICCP portal yields readable chapter titles, including goals for prevention, early detection, treatment, palliative care and cancer registration, but most of its body text extracts as unreadable characters, so none of its targets are quoted here. The IAEA describes the September 2025 imPACT Review as informing a new national cancer plan. IARC's GLOBOCAN 2024 fact sheet does not say which subnational registries its estimate used, and IARC's detailed data sources and methods page for Tanzania was not read. The Ministry of Health and the IAEA cite about 40,000 new cases a year, and a June 2026 newspaper report gives Ministry figures of about 27,000 deaths a year; neither source shows how those figures were derived.",
      links: [
        { label: "National Cancer Control Strategy 2013 to 2022 (PDF, ICCP portal)", url: NCCS },
        { label: "IARC: GLOBOCAN 2024 fact sheet, Tanzania (PDF)", url: IARC_FACTSHEET },
        { label: "The Guardian (Tanzania): President Samia to unveil KCMC radiotherapy centre (24 June 2026)", url: KCMC_GUARDIAN },
      ],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Some figures a reader would want are not here because OnCo could not find them in a primary source: survival after a cancer diagnosis in Tanzania, what the National Health Insurance Fund pays for chemotherapy and radiotherapy, what Zanzibar's insurer covers for cancer, and which cancer medicines TMDA has registered.",
      detail:
        "No population-based survival figures for Tanzania were found in the sources read. The National Health Insurance Fund's benefit packages page did not render its content to a script, and its client service charter is a scanned PDF with no text layer, so no benefit limits are given. The Zanzibar Health Services Fund's own site and benefit package were not found; its description here is GIZ's. No population-based cancer registry for Zanzibar was found. TMDA's clinical trial guideline was not read directly; review times come from NIAID ClinRegs' summary. The NCD Alliance dates the signing of the Universal Health Insurance Act to 6 December 2023, while the Act itself records assent on 19 November 2023; the Act is followed here. The Kilimanjaro radiotherapy figures come from newspaper reports quoting the hospital, not from KCMC's own pages.",
      links: [
        { label: "National Health Insurance Fund: benefit packages", url: "https://www.nhif.or.tz/packages" },
        { label: "NIAID ClinRegs: Tanzania", url: CLINREGS },
        { label: "Universal Health Insurance Act No. 13 of 2023 (Swahili, PDF)", url: UHI_ACT },
      ],
    },
  ],
  institutions: [
    "tanzania-ministry-of-health", "tanzania-population-based-cancer-registry", "tmda-tanzania", "nhif-tanzania", "nimr-tanzania",
    "ocean-road-cancer-institute", "kilimanjaro-christian-medical-centre", "bugando-medical-centre", "benjamin-mkapa-hospital",
    "aga-khan-hospital-dar-es-salaam", "zanzibar-health-services-fund", "iaea", "iarc", "who",
  ],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-olson-bugando-cancer-registry-2008-2016-canep-2020", "paper-ngowi-kilimanjaro-prostate-registry-bmccancer-2024", "paper-zullig-kilimanjaro-registry-validation-jgo-2016",
    "paper-mphuru-hpv-vaccine-introduction-tanzania-vaccine-2022", "paper-baisley-doris-one-dose-hpv-tanzania-lgh-2022", "paper-mahiti-cervical-screening-tdhs-2022-aph-2025",
    "paper-mccormick-cervical-screening-phia-jaids-2026", "paper-smith-out-of-pocket-childhood-cancer-kcmc-plosone-2025",
  ],
  people: ["diwani-msemo", "irene-isaka", "adam-fimbo", "sulaiman-shahabuddin"],
  how:
    "Every card was written from Tanzanian official sources and international reviews, read in full rather than through a summary: the Ministry of Health's Tanzania Population-Based Cancer Registry Report 2019 to 2023; the Universal Health Insurance Act No. 13 of 2023 and its commencement notice, read in Swahili; the National Health Insurance Fund Act and the Fund's news page; TMDA's notice and WHO Africa's 2018 release; NIAID ClinRegs' summary of the trial rules; Ocean Road Cancer Institute's own pages; the IAEA's December 2025 imPACT Review article and country sheet, through the Internet Archive; WHO's immunisation coverage rows from its public data API; IARC's GLOBOCAN 2024 fact sheet; newspaper reports from The Citizen and The Guardian on new centres and on Zanzibar; GIZ's account of the Zanzibar Health Services Fund; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data, and research output from OnCo's OpenAlex country file. The new records added for this page (the Ministry, the registry programme, TMDA, the insurer, the research institute, three zonal hospitals and Zanzibar's insurer) were written from the same sources.",
  verify:
    "National incidence and death figures are IARC estimates; the registries cover about a tenth of the mainland and none of Zanzibar. Which hospitals give radiotherapy, which medicines are in stock and what insurance pays for change faster than published sources; ask the treating hospital's oncology department or the National Health Insurance Fund what applies to you. In Zanzibar, ask the Ministry of Health or the Zanzibar Health Services Fund. New radiotherapy centres in Moshi and Dodoma opened or are opening during 2026, so referral routes may differ from those described here.",
  verifyLinks: [
    { label: "Ministry of Health, Tanzania", url: "https://www.moh.go.tz/" },
    { label: "National Health Insurance Fund", url: "https://www.nhif.or.tz/" },
    { label: "Tanzania Medicines and Medical Devices Authority", url: "https://www.tmda.go.tz/" },
    { label: "Ocean Road Cancer Institute", url: "https://www.orci.or.tz/" },
  ],
};

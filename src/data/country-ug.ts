import type { CountryDive } from "@/data/country-dive";

/**
 * Uganda deep dive: the hand-written cards for /countries/ug/ (wave 6). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Uganda (PDF text), the
 * African Cancer Registry Network's member pages for the Kampala and Gulu registries, the slides on the Uganda National
 * Cancer Control Plan 2025/26 to 2029/30 on the ICCP portal (PDF text), the Uganda Cancer Institute Act 2016 (PDF text),
 * the IAEA's article on Uganda's radiotherapy recovery (read through the Internet Archive, as the IAEA page refused a
 * plain request), the Daily Monitor's reports of 6 October and 4 November 2026, the Parliament of Uganda's news pages and
 * bill tracker for the National Drug and Health Products Authority Bill, WHO Africa's article on the January 2024
 * regulatory mission, Fred Hutch's global oncology page, WHO's immunisation and health expenditure rows for Uganda from
 * its public data APIs, the ClinicalTrials.gov API, and the papers through Europe PMC (Asasira et al. in full text).
 * Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/800-uganda-fact-sheet.pdf";
const AFCRN_KAMPALA = "https://afcrn.org/index.php/membership/membership-list/81-kampala-uganda";
const AFCRN_GULU = "https://afcrn.org/index.php/membership/membership-list/137-gulucancerregistry";
const NCCP_SLIDES = "https://www.iccp-portal.org/sites/default/files/2026-04/ICCP%20ECHO%202026%20Session%203%20slides_Uganda.pdf";
const UCI_ACT = "https://commons.laws.africa/akn/ug/act/2016/19/media/publication/ug-act-2016-19-publication-document.pdf";
const IAEA_RT = "https://www.iaea.org/node/74400";
const IAEA_RT_WB = "https://web.archive.org/web/2026/https://www.iaea.org/node/74400";
const MONITOR_RT = "https://www.monitor.co.ug/uganda/news/national/radiotherapy-capacity-rises-amid-cancer-patient-surge-5621012";
const MONITOR_NHIS = "https://www.monitor.co.ug/uganda/news/national/govt-targets-2027-rollout-of-long-awaited-health-insurance-scheme-5658826";
const PARL_BILL = "https://www.parliament.go.ug/news/4203/draft-national-drugs-bill-presented-health-committee";
const PARL_PASSED = "https://www.parliament.go.ug/news/4323/parliament-passes-sweeping-reforms-medicines";
const BILL_TRACKER = "https://bills.parliament.ug/user_bill_stage.php?billid=580";
const WHO_NDA = "https://www.afro.who.int/pt/node/20555";
const FH_UGANDA = "https://www.fredhutch.org/en/research/institutes-networks-ircs/global-oncology/uganda.html";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'UGA'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO = "https://immunizationdata.who.int/global/wiise-detail-page/introduction-of-hpv-(human-papilloma-virus)-vaccine";
const WHO_GHED = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'UGA'";
const CTGOV = "https://clinicaltrials.gov/search?country=Uganda&cond=cancer";
const D_BUKIRWA = "https://doi.org/10.1002/ijc.33373";
const D_WABINGA14 = "https://doi.org/10.1002/ijc.28661";
const D_ASASIRA = "https://doi.org/10.1136/bmjopen-2021-056722";
const D_OKONGO = "https://doi.org/10.1002/ijc.32053";
const D_KAVUMA_RT = "https://doi.org/10.1200/go-24-00339";
const D_KAVUMA_WAIT = "https://doi.org/10.1200/go-25-00325";
const D_RUKUNDO = "https://doi.org/10.1136/bmjph-2026-005684";
const D_DEPAEPE = "https://doi.org/10.1186/s13690-025-01749-3";

export const UG_DIVE: CountryDive = {
  iso2: "UG",
  iso3: "UGA",
  name: "Uganda",
  flag: "🇺🇬",
  asOf: "2026-11-11",
  title: "Cancer in Uganda",
  description:
    "Cancer in Uganda from Ugandan sources: IARC's estimate of 29,966 new cancers and 18,205 deaths in 2024, built on the Kampala Cancer Registry, counting since 1951, and the Gulu registry in the north; cervical cancer as the commonest cancer; the Uganda Cancer Institute and its radiotherapy rebuilt after the 2016 breakdown; no national health insurance; the 2026 law replacing the National Drug Authority; HPV vaccination since 2015; and the seven trials in our records with a Ugandan site.",
  lede:
    "Uganda has counted cancer in Kampala since 1951, longer than anywhere else in Africa according to the registry's own authors, and that record shows the country's cancers changing: Kaposi sarcoma, driven by HIV, falling, while cervical, breast and prostate cancer rise. IARC estimates 29,966 new cancers and 18,205 deaths in 2024, with cervical cancer the commonest. Specialist treatment is concentrated at the Uganda Cancer Institute in Kampala, and most people pay without insurance.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Uganda is 29,966 new cancers and 18,205 deaths, an age-standardised incidence of 123.9 per 100,000 (113.6 in men, 136.5 in women), including 382 non-melanoma skin cancers. IARC's fact sheet gives its incidence source as a subnational registry and its method as subnational rates applied to the 2024 population; Uganda has two population-based registries, the Kampala Cancer Registry and the Gulu Cancer Registry, and the fact sheet does not say how each was used. Mortality is national incidence applied to modelled mortality-to-incidence ratios drawn from registry survival data (SURVCAN). IARC's national rates sit well below Kampala's own: IARC gives 38.2 per 100,000 women for cervical cancer, 24.2 for breast cancer and 36.3 per 100,000 men for prostate cancer, against 60.5, 37.6 and 54.2 measured in Kampala in 2011 to 2015 (standardised to the WHO world population 2000 to 2025, a different standard from IARC's, so the comparison is approximate). Gulu, a largely rural population, measured 106.7 per 100,000 men and 118.5 per 100,000 women for all cancers in 2013 to 2016, close to IARC's national figures. So the national estimate reads as a blend weighted towards rural rates; a city where diagnosis is easier to reach records more cancer. Deaths divided by new cases give 0.61 for 2024.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Uganda",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Uganda (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 30,000 new cancers a year, with cervical cancer the commonest",
          plain:
            "IARC estimates 29,966 new cancers in Uganda in 2024, 18,270 in women and 11,696 in men. Cervical cancer is the commonest cancer and the commonest cause of cancer death. Prostate cancer leads in men. Cancers linked to infection, such as Kaposi sarcoma and liver cancer, are still common, and for every ten new cancers IARC estimates about six deaths in the same year.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 5,164 cervical cancers (3,000 deaths), 3,308 breast cancers (1,562 deaths), 2,537 prostate cancers (1,544 deaths), 2,186 oesophageal cancers (1,999 deaths), 1,784 colorectal cancers, 1,701 Kaposi sarcomas, 1,649 liver cancers (1,438 deaths) and 1,535 non-Hodgkin lymphomas. Cervical cancer is 28.3% of cancers in women, and its age-standardised incidence, 38.2 per 100,000, is the highest of any cancer in the country, followed by prostate cancer at 36.3. In men the leading cancers by cases are prostate (21.7%), oesophagus (10.2%), Kaposi sarcoma (9.2%), liver and colorectum; in women cervix, breast, colorectum, oesophagus and ovary. The risk of developing a cancer before age 75 is 12.4% for men and 14.2% for women, and an estimated 59,662 people are living within five years of a diagnosis. The Kampala registry's authors trace the shift: Kaposi sarcoma, almost half of cancers registered in men in 1989 to 1991, has declined as HIV prevalence fell and antiretroviral drugs arrived, while prostate, breast and cervical cancer rates were 100%, 70% and 45% higher in 2010 to 2015 than in 1991 to 1995.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Uganda (PDF)", url: IARC_FACTSHEET },
            { label: "Bukirwa et al., trends in the incidence of cancer in Kampala, 1991 to 2015 (Int J Cancer 2021)", url: D_BUKIRWA },
          ],
        },
        {
          id: "care-capacity",
          title: "Where treatment is: one national institute in Kampala, and regional centres being built",
          plain:
            "Most specialist cancer treatment in Uganda is given at the Uganda Cancer Institute on Mulago Hill in Kampala. Figures from the institute reported by the Daily Monitor give 8,764 new cancer cases in 2025, more than double the 4,000 of 2015, and 67,000 patient visits. The institute plans regional cancer centres in Arua, Gulu, Mbale and Mbarara; the Gulu centre is already working.",
          detail:
            "The Uganda Cancer Institute Act 2016, assented to on 5 July 2016, made the institute an autonomous body corporate with the functions of coordinating cancer prevention and treatment in Uganda, providing comprehensive and palliative care, overseeing cancer services in public and private health centres, and establishing and managing regional cancer units; its stated purposes include reducing the referral of cancer patients abroad and ensuring timely access to highly specialised cancer medication. In October 2026 the Daily Monitor reported information from the institute of 8,764 new cancer cases recorded in 2025, more than double the 4,000 of 2015, and 67,000 patient visits; the institute's head of training and research told the paper that the Mulago hospital was to grow from 149 to 365 beds, and that regional centres were planned at Arua, Gulu, Mbale and Mbarara, Gulu already operational. Set beside IARC's estimate of 29,966 new cancers nationally, the institute's 8,764 new patients are about 29%, a ratio OnCo computed; it does not count patients diagnosed and treated elsewhere. Fred Hutch says the UCI-Fred Hutch Cancer Centre, opened with the institute in Kampala in 2015, can accommodate 20,000 outpatient visits a year.",
          links: [
            { label: "Uganda Cancer Institute Act, 2016, sections 3 and 5 (PDF)", url: UCI_ACT },
            { label: "Daily Monitor: radiotherapy capacity rises amid cancer patient surge (6 October 2026)", url: MONITOR_RT },
            { label: "Fred Hutch: global oncology in Uganda", url: FH_UGANDA },
          ],
        },
      ],
      tables: [
        {
          id: "ug-registry",
          title: "What Uganda's two population-based registries have published",
          caption: "Age-standardised incidence per 100,000 as reported in each paper. Kampala rows are the observed five-year rates in Asasira et al. (2022); the latest published period is 2011 to 2015.",
          columns: [
            { key: "source", label: "Registry (area covered)" },
            { key: "period", label: "Years" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "men", label: "All cancers, men", numeric: true },
            { key: "women", label: "All cancers, women", numeric: true },
            { key: "cervix", label: "Cervix", numeric: true },
            { key: "breast", label: "Breast", numeric: true },
            { key: "prostate", label: "Prostate", numeric: true },
            { key: "ks", label: "Kaposi sarcoma, both sexes", numeric: true },
          ],
          rows: [
            { source: "Kampala Cancer Registry (Kyadondo County)", period: "2001 to 2005", cases: null, men: null, women: null, cervix: 52.6, breast: 33.2, prostate: 41.6, ks: 29.6 },
            { source: "Kampala Cancer Registry (Kyadondo County)", period: "2006 to 2010", cases: null, men: null, women: null, cervix: 56.0, breast: 35.2, prostate: 52.2, ks: 25.1 },
            { source: "Kampala Cancer Registry (Kyadondo County)", period: "2011 to 2015", cases: null, men: null, women: null, cervix: 60.5, breast: 37.6, prostate: 54.2, ks: 16.4 },
            { source: "Gulu Cancer Registry (four districts of the Acholi sub-region, 771,514 people)", period: "2013 to 2016", cases: 1627, men: 106.7, women: 118.5, cervix: null, breast: null, prostate: null, ks: null },
          ],
          note: "Registries publish new cases, not deaths. The Kampala rates are from table 2 of Asasira et al., which used registry data for 2001 to 2015 standardised to the WHO world population; its table 1 gives 1,316 cervical, 831 breast and 600 prostate cancers and 1,328 Kaposi sarcomas in 2011 to 2015. All-cancer rates for Kampala and site rates for Gulu are not in the abstracts read. Bukirwa et al. report Kampala's age-adjusted all-cancer rate as about 25% higher in 2011 to 2015 than in 1991 to 1995.",
          sources: [
            { label: "Asasira et al., cancer incidence in Kampala projected to 2030, tables 1 and 2 (BMJ Open 2022)", url: D_ASASIRA },
            { label: "Okongo et al., cancer incidence in Northern Uganda 2013 to 2016 (Int J Cancer 2019)", url: D_OKONGO },
            { label: "Bukirwa et al., trends in the incidence of cancer in Kampala, 1991 to 2015 (Int J Cancer 2021)", url: D_BUKIRWA },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: Kampala since 1951, and Gulu since 2014",
      aside: { label: "African Cancer Registry Network: Kampala Cancer Registry", url: AFCRN_KAMPALA },
      cards: [
        {
          id: "registry-kampala",
          title: "The Kampala Cancer Registry: three staff, a county of 3.7 million, and seventy years of data",
          plain:
            "Uganda's cancer counts come from registries that cover parts of the country, not the whole. The Kampala Cancer Registry, set up in 1951 in the pathology department of what is now Makerere University, counts new cancers among people living in Kyadondo County, which includes Kampala. Its authors call it the longest established registry in Africa, and its long series records what the HIV epidemic did to cancer in the city.",
          detail:
            "The registry's African Cancer Registry Network page, updated July 2025, describes a pathologist director, a cancer registrar and a volunteer registrar, all employed by Makerere University, with medical records staff in hospitals helping and monthly visits to other hospitals, hospices and pathology laboratories. Data are kept in IARC's CanReg software, completeness was evaluated in 2001 at about 90% of adult cancers, and death certificates are not used because certification is very incomplete. The county covers 1,914 square kilometres and had about 3.67 million people in the 2024 census; its boundary has not changed since 1951. The registry was re-established after an interruption, with incidence counted again from September 1989, and its data appear in Cancer Incidence in Five Continents volumes I and VII to XII. The most recent report its page lists covers 2013 to 2017. Wabinga and colleagues found breast and prostate cancer rising by 3.7% and 5.2% a year over 1991 to 2010, and Kaposi sarcoma in women falling continuously from 2000.",
          links: [
            { label: "African Cancer Registry Network: Uganda, Kampala Cancer Registry (updated July 2025)", url: AFCRN_KAMPALA },
            { label: "Wabinga et al., trends in the incidence of cancer in Kampala 1991 to 2010 (Int J Cancer 2014)", url: D_WABINGA14 },
            { label: "Bukirwa et al., trends in the incidence of cancer in Kampala, 1991 to 2015 (Int J Cancer 2021)", url: D_BUKIRWA },
          ],
        },
        {
          id: "registry-gulu",
          title: "The Gulu registry shows that northern Uganda is not Kampala",
          plain:
            "In 2014 a second registry opened at St. Mary's Hospital Lacor near Gulu, covering four mostly rural districts in the north. Its first data showed a different pattern from the capital: non-Hodgkin lymphoma among the commonest cancers in both sexes, a high rate of Burkitt lymphoma in children, and less breast cancer.",
          detail:
            "The Gulu Cancer Registry became operational in June 2014 with support from the International Network on Cancer Treatment and Research, to cover Gulu, Nwoya, Omoro and Amuru districts (762,343 people in the 2014 census). Its registrar collects cases from six hospitals and medical centres and follows patients referred to Mulago National Referral Hospital and the Uganda Cancer Institute in Kampala. Its first paper, covering 2013 to 2016, counted 1,627 cancers in 771,514 people: 644 in men (106.7 per 100,000) and 983 in women (118.5 per 100,000). Cervical cancer and non-Hodgkin lymphoma were commonest in women; non-Hodgkin lymphoma, Kaposi sarcoma, prostate and liver cancer in men. The authors say the registry gives a more complete picture of the national cancer profile and allows more targeted prevention, early detection and treatment.",
          links: [
            { label: "African Cancer Registry Network: Gulu Cancer Registry", url: AFCRN_GULU },
            { label: "Okongo et al., cancer incidence in Northern Uganda 2013 to 2016 (Int J Cancer 2019)", url: D_OKONGO },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: no national health insurance, and about a third of health spending from households",
      aside: { label: "Daily Monitor: government targets 2027 rollout of health insurance scheme (4 November 2026)", url: MONITOR_NHIS },
      cards: [
        {
          id: "no-insurance",
          title: "Only about 1% of Ugandans have health insurance, and the national scheme is still a plan",
          plain:
            "Uganda has no national health insurance. The 2024 census found 1.1% of Ugandans covered by any health insurance. A national insurance bill passed Parliament in 2021 but was never signed into law, and in November 2026 the Daily Monitor reported that the government planned to start a scheme by 2027. Households pay about a third of all health spending themselves.",
          detail:
            "The Daily Monitor reported on 4 November 2026, from the 32nd Joint Review Mission of the health sector, that the National Health Insurance Bill approved by Cabinet in 2019 was passed by Parliament in 2021 but not assented to by the President, and that the government now planned to roll out the scheme by 2027; the Ministry's Permanent Secretary said sustainable health financing could not be discussed without it. The same report cites the National Population and Housing Census 2024: 1.1% of Ugandans had health insurance, 1.6% in urban areas and 0.7% in rural areas. WHO's Global Health Expenditure Database puts out-of-pocket payments at 32.2% of current health expenditure in 2023, after 38.3% in 2019 and 27.4% in 2021. The Uganda Cancer Institute Act lets the Minister, on the institute's recommendation, make regulations setting the fees and charges for its services; OnCo could not find a published schedule of what a patient pays there, and that is named under gaps.",
          links: [
            { label: "Daily Monitor: government targets 2027 rollout of long-awaited health insurance scheme (4 November 2026)", url: MONITOR_NHIS },
            { label: "WHO Global Health Expenditure Database: out-of-pocket share of current health expenditure, Uganda (API)", url: WHO_GHED },
            { label: "Uganda Cancer Institute Act, 2016, section 33 (PDF)", url: UCI_ACT },
          ],
        },
        {
          id: "uci-mandate",
          title: "The national institute's legal duty: treat at home rather than refer abroad",
          plain:
            "Instead of an insurer deciding what is covered, Uganda gave one public body the job of cancer care. The Uganda Cancer Institute Act of 2016 tells the institute to coordinate prevention and treatment nationwide, to buy highly specialised medicines, and to reduce the number of patients sent abroad for treatment.",
          detail:
            "Section 3 of the Uganda Cancer Institute Act 2016 sets its purposes: an autonomous institute to undertake and coordinate the management of cancer in Uganda, a modern institute of international standard, fewer referrals of cancer patients abroad, timely access to highly specialised cancer medication, and more capacity among Ugandan oncologists, with the institute overseeing other health units that treat cancer. Section 5 gives it functions including developing policy on prevention, diagnosis and treatment, providing palliative care and rehabilitation, and procuring highly specialised medicines, supplies and equipment for itself. The Minister of Health may give it written policy directions but must not interfere with its independence. During a tour of the institute in September 2026, the Ministry's Permanent Secretary said, according to the Daily Monitor, that the government wanted to position the institute as a top cancer centre in Africa for Ugandan and foreign patients.",
          links: [
            { label: "Uganda Cancer Institute Act, 2016, sections 3, 5 and 6 (PDF)", url: UCI_ACT },
            { label: "Daily Monitor: radiotherapy capacity rises amid cancer patient surge (6 October 2026)", url: MONITOR_RT },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the National Drug Authority, rebuilt by a 2026 law",
      aside: { label: "Parliament of Uganda: Parliament passes sweeping reforms on medicines", url: PARL_PASSED },
      cards: [
        {
          id: "nda-law",
          title: "A 1993 law replaced in 2026, with compassionate use written in",
          plain:
            "Uganda's medicines regulator, the National Drug Authority, worked for more than thirty years under a 1993 law. In 2026 Parliament passed, and the President signed, a law turning it into the National Drug and Health Products Authority, with powers over vaccines, devices, diagnostics and clinical trials, and a route for patients to get unregistered medicines in life-threatening situations.",
          detail:
            "The Minister of Health presented the National Drug and Health Products Authority Bill, 2025 to Parliament's health committee on 17 September 2025, saying the 1993 law had never been amended; the bill has 14 parts and 122 clauses covering drugs, pharmacies, clinical trials, pharmacovigilance, medical devices, cosmetics and supplements. Parliament passed it at third reading on 26 March 2026, and the bill tracker records presidential assent on 29 April 2026. Clause 21 allows the authority to permit the use, importation or distribution of unregistered drugs under strict conditions for clinical trials, scientific research, personal use and compassionate use; the Minister said this would let patients with life-threatening conditions reach treatments that lengthy approval processes might otherwise delay. The law also introduces a listing system for medicines that may not undergo full registration, lot release for vaccines, biologicals and diagnostics, unique identifiers on drugs, and approval of all drug advertising.",
          links: [
            { label: "Parliament of Uganda: Parliament passes sweeping reforms on medicines", url: PARL_PASSED },
            { label: "Parliament of Uganda: draft National Drugs Bill presented to health committee (17 September 2025)", url: PARL_BILL },
            { label: "Parliament of Uganda bill tracker: National Drug and Health Products Authority Bill, 2025", url: BILL_TRACKER },
          ],
        },
        {
          id: "nda-ml3",
          title: "Working towards the World Health Organization's maturity level 3",
          plain:
            "WHO rates medicines regulators on a scale, and level 3 means a stable, well-functioning system. Uganda's neighbours Rwanda and Tanzania have reached it; Uganda has not yet, as far as OnCo could find. The Minister of Health told Parliament the 2026 law was central to getting there, which would let Uganda take a fuller part in global procurement.",
          detail:
            "WHO's Regional Office for Africa reported a high-level mission on 20 and 21 January 2024 that reviewed progress on Uganda's institutional development plan, drawn up after a 2019 WHO benchmarking assessment, which sets out the steps to maturity level 3. It said the mission assessed Uganda's readiness to attain level 3 for vaccine regulation, that Rwanda and Tanzania had already reached level 3 for medicines and imported vaccines, and that the mission visited the authority's pharmaceutical laboratory, prequalified by WHO. In September 2025 the Minister told Parliament that reaching level 3 would let Uganda participate more fully in procurement through the Global Fund, Gavi and UNICEF and would support local manufacturing. OnCo found no WHO announcement that Uganda has reached level 3, and could not read the authority's own pages, which refused a plain request; registration times are named under gaps.",
          links: [
            { label: "WHO Africa: strengthening Uganda's medical products regulatory systems (January 2024 mission)", url: WHO_NDA },
            { label: "Parliament of Uganda: draft National Drugs Bill presented to health committee (17 September 2025)", url: PARL_BILL },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "WHO immunisation data: HPV programme coverage rows for Uganda (API)", url: WHO_HPV_API },
      cards: [
        {
          id: "hpv-hbv",
          title: "HPV vaccine for girls nationwide since 2015, with 95% reported coverage in 2024",
          plain:
            "Uganda has offered girls the HPV vaccine across the country since 2015, and its recent coverage data read as a single-dose schedule. The coverage Uganda reported to WHO was 95% of the target group of girls in 2024 and 69% in 2025. Hepatitis B vaccine, which prevents most liver cancer caused by the virus, has been in the childhood schedule since 2002.",
          detail:
            "WHO's vaccine introduction records for Uganda list the HPV vaccine as introduced nationwide in 2015, hepatitis B vaccine in 2002 and a hepatitis B birth dose in 2022. In the HPV programme coverage rows Uganda reported to WHO, first-dose coverage of girls was 99% in 2016 to 2019 while last-dose coverage was between 30% and 75%. In 2023 last-dose coverage almost matched first-dose coverage (98% against 99% of 700,823 girls), and in 2024 and 2025 the two counts are identical, which reads as a single-dose schedule, an inference OnCo drew from the rows rather than a stated policy date: 95% of 1,331,840 girls in 2024 and 69% of 679,974 in 2025. The national cancer plan slides list increasing HPV and hepatitis B vaccination as its first objective, through the national immunisation programme with Gavi, UNICEF and the Ministry of Education, and record vaccine hesitancy and hepatitis B vaccine supply not yet adequate for the target population as challenges.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage rows for Uganda (API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: introduction of HPV vaccine", url: WHO_INTRO },
            { label: "ICCP: the Uganda National Cancer Control Plan 2025/26 to 2029/30 (slides, PDF)", url: NCCP_SLIDES },
          ],
        },
        {
          id: "cervical-screening",
          title: "Cervical screening by visual inspection, reaching fewer than a third of women",
          plain:
            "Uganda screens women for cervical cancer mainly by looking at the cervix after applying vinegar (visual inspection with acetic acid) and treating abnormal areas. Fewer than a third of Ugandan women have ever been screened, and the registry describes screening as opportunistic, mostly for women living with HIV. HPV testing, including self-sampling, is endorsed but not yet the norm.",
          detail:
            "A 2026 cost-effectiveness study by Rukundo-Ayeh and colleagues, written with Ugandan clinicians, states that fewer than a third of Ugandan women have ever been screened and that current guidelines recommend screening women aged 25 to 49 every three years; across 30 modelled policies, 13% to 50% of cervical cancer deaths could be averted, at 88 to 313 US dollars per quality-adjusted life year, and policies with higher treatment follow-through dominated those with lower. A 2025 qualitative study of policymakers and experts in Kampala, Mukono and Wakiso found visual inspection the predominant method, HPV testing endorsed, services concentrated in higher-level facilities and focused mainly on women living with HIV, and a heavy reliance on international partners for funding and training. The Kampala registry's page says breast screening relies on self-examination and that mammography is available in few facilities and expensive. OnCo found no official national screening coverage figure.",
          links: [
            { label: "Rukundo-Ayeh et al., optimising a national screen-and-treat cervical cancer strategy in Uganda (BMJ Public Health 2026)", url: D_RUKUNDO },
            { label: "De Paepe et al., cervical cancer screening policies and implementation in Uganda (Arch Public Health 2025)", url: D_DEPAEPE },
            { label: "African Cancer Registry Network: Kampala Cancer Registry, cancer screening", url: AFCRN_KAMPALA },
          ],
        },
      ],
    },
    {
      id: "radiotherapy",
      nav: "Radiotherapy",
      title: "Radiotherapy: from a single broken machine in 2016 to eight",
      aside: { label: "IAEA: From emergency to expansion (read through the Internet Archive)", url: IAEA_RT_WB },
      cards: [
        {
          id: "rt-recovery",
          title: "In 2016 Uganda's only working radiotherapy machine broke down; it now has eight",
          plain:
            "Early in 2016 the one working radiotherapy machine in Uganda, at the Uganda Cancer Institute, broke down, leaving the whole country without radiotherapy. With help from the IAEA it was replaced, and the institute built a new department. In October 2026 it reported eight machines, three of them modern linear accelerators, but patients still wait.",
          detail:
            "The IAEA wrote that in early 2016 the sole functioning radiotherapy machine in Uganda broke down, leaving 40 million people without the treatment, and that at the government's request it provided experts, training and equipment, including one new cobalt-60 machine and the commissioning of a second donated by India, brachytherapy equipment for oesophageal cancer, and nine fellowships; a national project launched in January 2020 was to commission a linear accelerator, CT simulator and 3D planning system, and the institute had begun building six new bunkers. In October 2026 the institute's head of training and research told the Daily Monitor it had eight radiotherapy machines: three TrueBeam linear accelerators, three high-dose-rate brachytherapy units and two cobalt-60 machines, with plans for five linear accelerators at Mulago and at least two at each regional centre within five years. A principal radiation therapist said the department treats about 260 patients a day and staff work about five hours of unpaid overtime. Kavuma and colleagues report about 2,600 new radiotherapy patients in 2023, against about 600 a year in the service's second decade.",
          links: [
            { label: "IAEA: From emergency to expansion, Uganda recovers and improves its radiotherapy services (read through the Internet Archive)", url: IAEA_RT_WB },
            { label: "Daily Monitor: radiotherapy capacity rises amid cancer patient surge (6 October 2026)", url: MONITOR_RT },
            { label: "Kavuma et al., evolution and recent radiation therapy advancement in Uganda (JCO Glob Oncol 2025)", url: D_KAVUMA_RT },
          ],
        },
        {
          id: "rt-waiting",
          title: "A quarter of women with advanced cervical cancer finish radiotherapy on time",
          plain:
            "Radiotherapy for cervical cancer should be finished within about eight weeks. At the Uganda Cancer Institute, a study of 196 women found a median wait of 88 days and only a quarter finishing within that time, mostly because of the wait for internal radiotherapy (brachytherapy). Shorter, hypofractionated courses helped more women finish on time.",
          detail:
            "Kavuma and colleagues followed 196 patients with locally advanced cervical cancer given either conventional external beam radiotherapy (50 Gy in 25 fractions) or a hypofractionated course (45 Gy in 15) followed by brachytherapy. The median delay was 41 days and the median waiting time 88 days; external beam treatment took a median 40 days conventionally and 24 days hypofractionated, and the median wait before brachytherapy was 40 days, giving overall treatment of 85 and 66 days. Only 18% on the conventional course and 37% on the hypofractionated course finished within guidelines, 25% overall, and those who finished within eight weeks more often had a complete response. Their review of the service reports that about 51% of patients are now treated with IMRT, VMAT or three-dimensional conformal techniques and about 1,440 brachytherapy insertions are done a year. OnCo did not read IAEA DIRAC figures for Uganda; see the gaps.",
          links: [
            { label: "Kavuma et al., waiting time and treatment duration for locally advanced cervical cancer at the Uganda Cancer Institute (JCO Glob Oncol 2025)", url: D_KAVUMA_WAIT },
            { label: "Kavuma et al., evolution and recent radiation therapy advancement in Uganda (JCO Glob Oncol 2025)", url: D_KAVUMA_RT },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Uganda does",
      title: "What Uganda does differently",
      cards: [
        {
          id: "infection-cancers",
          title: "Measuring how HIV, and HIV treatment, change a country's cancers",
          plain:
            "Because Kampala has counted cancer for so long, Uganda can show what the HIV epidemic did to cancer and what treatment did next. Kaposi sarcoma rose to almost half of all cancers in men around 1990 and has fallen since antiretroviral drugs became available. Researchers project it will keep falling, while cervical, breast and prostate cancer keep rising.",
          detail:
            "The re-established registry found Kaposi sarcoma to be almost half of all cancers registered in men in 1989 to 1991, and the second most frequent in women at 17.9%. Over 1991 to 2015 it remained by far the most often registered cancer, but its incidence declined with falling HIV prevalence, and non-Hodgkin lymphoma rose until 2006 or 2007 and then declined, which the authors connect to antiretroviral therapy. Projecting Kampala's 2001 to 2015 data, Asasira and colleagues expect Kaposi sarcoma incidence to fall from 29.6 per 100,000 in 2001 to 2005 to 10.4 by 2026 to 2030, while cervical cancer cases rise by 35.3%, breast by 57.7% and prostate by 33.4%; they call for cancer control to add a focus on lifestyle-related cancers while keeping infectious disease control. Bukirwa and colleagues note that the fall in cervical cancer seen in richer countries came from screening and vaccination, not lifestyle change, and needs active intervention.",
          links: [
            { label: "Wabinga et al., cancer in Kampala 1989 to 1991 in the era of AIDS (Int J Cancer 1993)", url: "https://doi.org/10.1002/ijc.2910540106" },
            { label: "Bukirwa et al., trends in the incidence of cancer in Kampala, 1991 to 2015 (Int J Cancer 2021)", url: D_BUKIRWA },
            { label: "Asasira et al., cancer incidence in Kampala projected to 2030 (BMJ Open 2022)", url: D_ASASIRA },
          ],
        },
        {
          id: "uci-fred-hutch",
          title: "A public cancer institute built in partnership with a US research centre",
          plain:
            "Since 2004 the Uganda Cancer Institute has worked with Fred Hutch, a cancer research centre in Seattle. Together they opened the UCI-Fred Hutch Cancer Centre in Kampala in 2015, for research, training and outpatient care. Fred Hutch says the partnership has run more than 30 studies and trained Ugandan doctors and nurses in cancer care.",
          detail:
            "Fred Hutch's global oncology page says its programme in Uganda has conducted more than 30 research studies and built a biorepository of over 160,000 specimens to study cancers caused by viruses, and that the UCI-Fred Hutch Cancer Centre, opened in Kampala in 2015, can accommodate 20,000 outpatient visits a year and serves a five-country region. It says that since 2004 it has trained more than a dozen Ugandan physician-scientists and is training nurses in oncology care and researchers in HIV-associated and blood cancers, and it credits the institute with the first description of an infection-related cancer and the first use of combination chemotherapy for cancer treatment. The institute's director, Jackson Orem, is an author of both radiotherapy papers on this page. A Fred Hutch trial of low-dose, less frequent nivolumab (AFFORD IO), not yet recruiting, lists a Ugandan site; see research.",
          links: [
            { label: "Fred Hutch: global oncology in Uganda", url: FH_UGANDA },
            { label: "Kavuma et al., evolution and recent radiation therapy advancement in Uganda (JCO Glob Oncol 2025)", url: D_KAVUMA_RT },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research, trials and the national plan",
      cards: [
        {
          id: "trials-research",
          title: "Seven trials in OnCo's records have a site in Uganda",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, seven cancer trials in our records list a site in Uganda. Five are Roche breast and liver cancer trials, one is a completed trial of chemotherapy for AIDS-related Kaposi sarcoma, and one is a planned Fred Hutch trial of lower-dose immunotherapy.",
          detail:
            "The seven are lidERA (giredestrant after surgery for early breast cancer), heredERA (giredestrant with Phesgo in advanced breast cancer), INAVO122 (inavolisib with Phesgo), Astefania (atezolizumab with trastuzumab emtansine for HER2-positive breast cancer after preoperative treatment), SKYSCRAPER-14 (atezolizumab and bevacizumab with or without tiragolumab in liver cancer), ACTG A5263/AMC 066, which randomised 334 adults with advanced AIDS-associated Kaposi sarcoma in Kenya, Malawi, South Africa, Uganda, Zimbabwe and Brazil, and AFFORD IO, a Fred Hutch phase 2 trial of low-dose, reduced-frequency nivolumab, not yet recruiting. That reflects the trials OnCo holds, mostly large industry and academic trials, not every study in Uganda: on 11 November 2026 the ClinicalTrials.gov API returned 37 studies matching cancer with a location in Uganda, six of them recruiting. The Kampala registry's own papers, the Gulu registry and the institute's radiotherapy studies make up most of the Ugandan research on this page.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Uganda (search)", url: CTGOV },
            { label: "Fred Hutch: global oncology in Uganda", url: FH_UGANDA },
          ],
        },
        {
          id: "plan-2025",
          title: "A national cancer control plan for 2025/26 to 2029/30, run from the Prime Minister's office",
          plain:
            "Uganda has a national cancer control plan for 2025/26 to 2029/30, presented through the International Cancer Control Partnership in 2026. A steering committee under the Office of the Prime Minister oversees it, a secretariat advised by the Uganda Cancer Institute coordinates it, and each district is meant to have a cancer control focal person.",
          detail:
            "The slides on the plan, presented by the coordinator of its secretariat at the Uganda Cancer Institute and posted on the ICCP portal in April 2026, describe a multisectoral implementation plan with a chapter on cancer control in children and special interest groups. Its governance places oversight with a national steering committee under the Office of the Prime Minister, coordination with a national cancer control secretariat under the technical guidance of the Uganda Cancer Institute within the Ministry of Health, and district activities under district health committees with a cancer control focal person. The first objective shown is raising vaccination coverage against HPV and hepatitis B through the national immunisation programme, with Gavi, UNICEF and the Ministry of Education as partners. The full plan, with its targets and costs, was not found; see the gaps. Earlier, the Ministry published a strategic plan for cervical cancer prevention and control for 2010 to 2014.",
          links: [
            { label: "ICCP: the Uganda National Cancer Control Plan 2025/26 to 2029/30 (slides, PDF)", url: NCCP_SLIDES },
            { label: "ICCP: Uganda strategic plan for cervical cancer prevention and control 2010 to 2014 (PDF)", url: "https://www.iccp-portal.org/system/files/plans/PATH_Uganda_cxca_strat_plan_2010-2014.pdf" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "plan-text",
      title: "The full national cancer control plan could not be read",
      plain:
        "OnCo found only the slides on Uganda's national cancer control plan for 2025/26 to 2029/30, not the plan itself, so its targets, costs and counts of oncologists, machines and centres are not on this page. No IAEA, WHO and IARC imPACT Review report for Uganda was found either.",
      detail:
        "The slides posted on the ICCP portal describe the plan's governance and first objective but give no targets, costing or baseline figures, and OnCo found no published copy of the plan on the Ministry of Health's or the institute's site; the institute's website is built in a way that returns no text to a plain request. Workforce figures (oncologists, radiation oncologists, medical physicists, pathologists) are therefore not given. The IAEA's DIRAC database of radiotherapy centres was not read, so the machine count on this page is the institute's own statement to the Daily Monitor in October 2026, not an independent inventory.",
      links: [
        { label: "ICCP: the Uganda National Cancer Control Plan 2025/26 to 2029/30 (slides, PDF)", url: NCCP_SLIDES },
        { label: "IAEA: From emergency to expansion (original page)", url: IAEA_RT },
      ],
    },
    {
      id: "costs-and-medicines",
      title: "What a patient pays, and which cancer medicines are registered, is not published where OnCo could read it",
      plain:
        "OnCo found no published schedule of what treatment at the Uganda Cancer Institute costs a patient, no list of cancer medicines registered in Uganda with their dates, and no target or measured time for the regulator to register a new medicine. The regulator's own website refused a plain request.",
      detail:
        "The Uganda Cancer Institute Act lets the Minister set the institute's fees and charges by regulation, but no such regulation or fee schedule was found. The National Drug Authority's website returned HTTP 403 to a plain request on 11 November 2026, so its register of medicines, its clinical trial guidelines and any published review times were not read; the 2026 Act itself was listed on Parliament's bill tracker but its text was not read, so its clause numbers are taken from Parliament's news report. The national essential medicines list and Uganda's clinical guidelines were not read. Ask the treating hospital what a medicine costs and whether it is in stock.",
      links: [
        { label: "Uganda Cancer Institute Act, 2016 (PDF)", url: UCI_ACT },
        { label: "Parliament of Uganda bill tracker: National Drug and Health Products Authority Bill, 2025", url: BILL_TRACKER },
      ],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Some figures a reader would want are not here because OnCo could not find them in a primary source: survival after a cancer diagnosis in Uganda, the Kampala registry's own report for 2013 to 2017, an official national cervical screening coverage figure, and an account of palliative care and oral morphine from a source OnCo could reach.",
      detail:
        "The Kampala registry's page says a report for 2013 to 2017 is available at the registry; it is not online and was not read, and the registry's all-cancer rates for recent periods are not in the abstracts read. Survival papers from Kampala (1993 to 1997) are listed by the registry but were not used. The census figure for insurance cover is quoted from the Daily Monitor, not read from the census report. Uganda's palliative care programme, including oral morphine prescribed by trained nurses, is widely described, but Hospice Africa Uganda's website did not resolve on 11 November 2026 and no primary source was read, so it is not described here. IARC's detailed data sources page for Uganda was not read; the method is taken from the fact sheet, and how IARC weighted the Kampala and Gulu registries is not known.",
      links: [
        { label: "African Cancer Registry Network: Kampala Cancer Registry", url: AFCRN_KAMPALA },
        { label: "IARC: GLOBOCAN 2024 fact sheet, Uganda (PDF)", url: IARC_FACTSHEET },
      ],
    },
  ],
  institutions: [
    "uganda-cancer-institute", "uganda-ministry-of-health", "nda-uganda", "kampala-cancer-registry", "gulu-cancer-registry",
    "fred-hutch", "iaea", "iarc", "who",
  ],
  companies: ["roche-genentech"],
  drugs: [],
  trials: ["lidera", "nct05296798", "nct05894239", "nct04873362", "nct05904886", "actg-a5263", "nct07576725"],
  papers: [
    "paper-bukirwa-kampala-incidence-trends-1991-2015-ijc-2021", "paper-wabinga-kampala-incidence-trends-1991-2010-ijc-2014",
    "paper-wabinga-kampala-cancer-1989-1991-aids-ijc-1993", "paper-asasira-kampala-cancer-projections-2030-bmjopen-2022",
    "paper-okongo-northern-uganda-incidence-2013-2016-ijc-2019", "paper-kavuma-radiotherapy-uganda-jgo-2025",
    "paper-kavuma-cervical-waiting-times-uci-jgo-2025", "paper-rukundo-ayeh-via-screen-treat-uganda-bmjph-2026",
  ],
  people: ["jackson-orem"],
  how:
    "Every card was written from Ugandan official sources, international agencies and peer-reviewed papers, read in full rather than through a summary: the African Cancer Registry Network's pages for the Kampala and Gulu registries; the Uganda Cancer Institute Act 2016; the slides on the national cancer control plan on the ICCP portal; the Parliament of Uganda's news pages and bill tracker for the 2026 medicines law; WHO Africa's article on the January 2024 regulatory mission; the IAEA's article on radiotherapy, through the Internet Archive; the Daily Monitor's reports of October and November 2026, used for statements by the institute and the Ministry; Fred Hutch's page on its Uganda programme; WHO's immunisation and health expenditure data from its public APIs; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data and the ClinicalTrials.gov API. The new records added for this page (the Ministry, the regulator, the two registries and eight papers) carry their own sources.",
  verify:
    "National incidence and death figures are IARC estimates built on subnational registries, not a national count. Which machines are working, how long the wait is, what treatment costs and which medicines are in stock change faster than any published source; ask the Uganda Cancer Institute or the regional centre treating you what applies now. The medicines regulator is being reconstituted under the 2026 law, so its name and procedures may change.",
  verifyLinks: [
    { label: "Ministry of Health, Uganda", url: "https://www.health.go.ug/" },
    { label: "Uganda Cancer Institute", url: "https://www.uci.or.ug/" },
    { label: "National Drug Authority", url: "https://www.nda.or.ug/" },
    { label: "African Cancer Registry Network: Kampala Cancer Registry", url: AFCRN_KAMPALA },
  ],
};

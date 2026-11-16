import type { CountryDive } from "@/data/country-dive";

/**
 * Burkina Faso deep dive: the hand-written cards for /countries/bf/ (wave 11). French sources were read in French, and
 * every figure was read from the raw text of its source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN
 * 2024 fact sheet for Burkina Faso (PDF text), the Ministry of Health's dated news pages on sante.gov.bf, Law
 * 060-2015/CNT on universal health insurance (PDF text) and the CNAMU's pages, Faso FDA's presentation page and its
 * national register of clinical trials, the AFCRN membership list, WHO's HPV coverage rows and Global Health
 * Expenditure Database rows from WHO's public data APIs, WHO's list of regulators at maturity levels 3 and 4 (August
 * 2026), IAEA DIRAC's public equipment data, Burkina Faso's statement to the IAEA General Conference in 2019 (PDF
 * text), and the papers' abstracts through Europe PMC. Burkina Faso is a fragile, conflict-affected setting; the page
 * keeps to what these sources state. Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/854-burkina-faso-fact-sheet.pdf";
const AFCRN = "https://afcrn.org/index.php/membership/membership-list";
const MS = (n: number, hash: string) =>
  `https://www.sante.gov.bf/detail?tx_news_pi1%5Baction%5D=detail&tx_news_pi1%5Bcontroller%5D=News&tx_news_pi1%5Bnews%5D=${n}&cHash=${hash}`;
const MS_PLAN_2020 = MS(148, "37a1ece8a90f478684496de066c2362e");
const MS_ANTICANCER_LIST_2025 = MS(1021, "b2135836a2aafb09f7ec2da2d6c0f0c4");
const MS_WORKING_GROUP_2025 = MS(1017, "d2f61236026193604dcd51281368c365");
const MS_CERVIX_DAY_2021 = MS(448, "3d8ef1c81de95c830216a023120000a9");
const MS_GRATUITE_2020 = MS(320, "85d8b177692b1c119a83d59ce6e5feb8");
const MS_BOGODOGO_2021 = MS(646, "916e10d6663a91d77778f732ead2cb94");
const MS_BOBO_2020 = MS(330, "35ae1aa2fc7005042627cc057f1ddcf4");
const MS_BOBO_2023 = MS(800, "649f3f6a5c4fd1498a9e2e248104357a");
const MS_BOBO_2025 = MS(1054, "e24f85bf088966165feadb79a2a91eaa");
const MS_BREAST_CAMPAIGN_2023 = MS(795, "5a2ef652507ea20b7cd150be5b31cf45");
const MS_MOBILE_CLINICS_2025 = MS(1056, "7a946ccab71cec1a5c121c0a9510118c");
const MS_REVIEW_2025 = MS(1097, "d3f4eb6f821f2bf980812b212dad6663");
const MS_HOME = "https://www.sante.gov.bf/accueil";
const LOI_060 = "https://cnamu.bf/wp-content/uploads/2026/10/Loi-060-2015-_-RAMU-BF.pdf";
const CNAMU_HOW = "https://cnamu.bf/le-ramu/comment-ca-marche/";
const CNAMU_PILOT = "https://cnamu.bf/atelier-bilan-de-la-phase-pilote-du-ramu/";
const CNAMU_TEXTS = "https://cnamu.bf/le-ramu/textes-fondamentaux/";
const FASO_FDA = "https://fasofda.bf/fr/";
const FASO_FDA_TRIALS = "https://fasofda.bf/fr/appGestion/listeDonnees/R%C3%A9pertoire%20national%20des%20essais%20cliniques/";
const WHO_ML_LIST = "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'BFA'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'BFA'";
const WHO_GGHE_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'BFA'";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/bfa-2020.pdf";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const IAEA_GC_2019 = "https://iaea.org/sites/default/files/19/10/firstlady_burkinafaso.pdf";
const CTGOV = "https://clinicaltrials.gov/search?country=Burkina%20Faso&cond=cancer";

export const BF_DIVE: CountryDive = {
  iso2: "BF",
  iso3: "BFA",
  name: "Burkina Faso",
  flag: "🇧🇫",
  asOf: "2026-11-11",
  title: "Cancer in Burkina Faso",
  description:
    "Cancer in Burkina Faso from Burkinabè and international sources: IARC's estimate of 13,631 new cancers and 8,994 deaths in 2024, made without a national incidence source, breast, liver and cervical cancer the commonest, free screening and treatment of precancerous lesions since 2016, the RAMU insurance scheme, the new Faso FDA regulator, the two radiotherapy machines in IAEA's directory and HPV vaccination since 2022.",
  lede:
    "Burkina Faso has no cancer registry whose figures IARC can use, so its national cancer figures are estimates: 13,631 new cancers and 8,994 deaths in 2024. Breast cancer is the commonest, liver cancer causes the most deaths, and almost two in three new cancers are in women. Since 2016 the state has paid for screening and treatment of precancerous cervical lesions as part of free care for women and children under five, and since 2021 the country has had its own radiotherapy.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Burkina Faso is 13,631 new cancers and 8,994 deaths, an age-standardised incidence of 109.5 per 100,000 (98.0 in men, 123.3 in women) and mortality of 76.0. The fact sheet names no country-specific source for incidence, giving the method as national or subnational rates scaled to regional all-cancer rates, and derives mortality from those incidence estimates using modelled mortality-to-incidence ratios based on registry survival data, naming Survcan, IARC's survival database, as the country-specific mortality source. So both figures are estimates rather than counts, and Burkina Faso's delegation to the IAEA said in 2019 that many cancer deaths happen outside health facilities and are recorded nowhere. IARC counts 302 non-melanoma skin cancers among the 13,631 (13,329 excluding them).",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Burkina Faso",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Burkina Faso (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 13,600 new cancers a year, most of them in women",
          plain:
            "IARC estimates 13,631 new cancers in Burkina Faso in 2024, 8,675 in women and 4,956 in men, and 8,994 cancer deaths. Breast cancer is the commonest cancer, then liver and cervical cancer. Liver cancer causes the most cancer deaths, and prostate cancer is the commonest cancer in men.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 2,179 breast cancers (1,035 deaths), 1,501 liver cancers (1,325 deaths), 1,274 cervical cancers (776 deaths), 1,014 prostate cancers (631 deaths) and 837 bladder cancers (480 deaths). In women breast cancer is 25.1% of cancers and cervical cancer 14.7%; in men prostate cancer is 20.5%, liver cancer 17.5% and bladder cancer 8.9%. By deaths the order is liver, breast, cervix, prostate and pancreas. The risk of developing a cancer before age 75 is 10.9% for men and 13.0% for women, and an estimated 21,639 people are living within five years of a diagnosis. In April 2025 the Ministry's report on its cancer programme put cancer deaths at about 10,000 a year, close to IARC's estimate.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Burkina Faso (PDF)", url: IARC_FACTSHEET },
            { label: "Ministry of Health: working group on the ten commonest cancers (29 April 2025)", url: MS_WORKING_GROUP_2025 },
          ],
        },
        {
          id: "no-registry",
          title: "No registry incidence figures that IARC can use, and no member of the African registry network",
          plain:
            "IARC's 2024 fact sheet names no Burkinabè source for cancer incidence, and the African Cancer Registry Network's membership list has no registry in Burkina Faso. The Ministry said in 2020 that a cancer registry had been started; OnCo found no published figures from it.",
          detail:
            "The AFCRN membership list, read on 11 November 2026, names 35 registries in 24 countries and territories, including neighbouring Mali, Côte d'Ivoire and Benin, but none in Burkina Faso. When the Ministry of Health validated its strategic plan against cancer in January 2020, its secretary general listed the start of a cancer registry (l'initiation d'un registre des cancers) among the actions under way. In its statement to the IAEA General Conference in 2019, the head of Burkina Faso's delegation said that more than 70% of cancers were detected at a very late stage and that many cancer deaths happen outside health facilities without being counted anywhere. Until a registry publishes, local figures come from hospital series, such as 550 patients operated on for breast cancer in Ouagadougou from 2013 to 2020, of whom 66.2% were alive after five years.",
          links: [
            { label: "AFCRN: current membership list", url: AFCRN },
            { label: "Ministry of Health: strategic plan against cancer validated (10 February 2020)", url: MS_PLAN_2020 },
            { label: "Burkina Faso statement to the IAEA General Conference, 2019 (PDF)", url: IAEA_GC_2019 },
            { label: "Zongo et al., survival after breast cancer surgery in Ouagadougou (Eur J Surg Oncol 2022)", url: "https://doi.org/10.1016/j.ejso.2022.07.001" },
          ],
        },
      ],
      tables: [
        {
          id: "bf-top",
          title: "IARC's leading cancers for Burkina Faso, 2024",
          caption: "New cases and deaths in 2024, both sexes, from the GLOBOCAN 2024 fact sheet. Estimates, not registry counts.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 2179, deaths: 1035 },
            { site: "Liver", cases: 1501, deaths: 1325 },
            { site: "Cervix uteri", cases: 1274, deaths: 776 },
            { site: "Prostate", cases: 1014, deaths: 631 },
            { site: "Bladder", cases: 837, deaths: 480 },
            { site: "Colorectum", cases: 764, deaths: 412 },
            { site: "Pancreas", cases: 540, deaths: 526 },
            { site: "All cancers", cases: 13631, deaths: 8994 },
          ],
          note: "IARC names no Burkinabè incidence source: new cases are national or subnational rates scaled to regional all-cancer rates, and deaths are derived from them with modelled mortality-to-incidence ratios based on registry survival data (Survcan). This is the table a national registry would replace.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Burkina Faso (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "CNAMU: how the RAMU works", url: CNAMU_HOW },
      cards: [
        {
          id: "ramu",
          title: "A compulsory national health insurance, still being rolled out",
          plain:
            "A 2015 law made health insurance compulsory for everyone living in Burkina Faso, with the state paying for people classed as indigent. The fund that runs it, the CNAMU, began with a pilot in two regions and had registered 388,803 people by April 2026, in a population of about 23.5 million.",
          detail:
            "Law 060-2015/CNT of 5 September 2015 creates the régime d'assurance maladie universelle (RAMU) for every person domiciled in the country and every employer, without distinction of nationality, sex or medical history. It covers care through a benefit package set by decree, may leave part of the cost to the patient, lets the insured buy complementary cover, and makes the state liable for the whole contribution of indigent people. The CNAMU, created by decree 2018-0265 of 9 April 2018, runs it for civilians. At its pilot review on 19 May 2026 it reported 388,803 registered beneficiaries in the Kadiogo and Guiriko regions at 30 April 2026, and, at the time of the review, agreements with 3,102 providers and 1,375 contacts for 784 services delivered in the pilot zones. The benefit package, decree 2023-1410, was not on its site; see the gaps.",
          links: [
            { label: "Law 060-2015/CNT on universal health insurance (PDF, CNAMU)", url: LOI_060 },
            { label: "CNAMU: review of the RAMU pilot phase (4 June 2026)", url: CNAMU_PILOT },
            { label: "CNAMU: how the RAMU works", url: CNAMU_HOW },
          ],
        },
        {
          id: "gratuite",
          title: "Free care for women and young children, and a rising share paid out of pocket",
          plain:
            "Since 2016 care for women and children under five has been free in public facilities. Even so, out-of-pocket payment has grown to 43.8% of what the country spends on health, up from 31.4% in 2016, while the government's own share has fallen to 31.4%.",
          detail:
            "The free care measure covers medical acts, tests, generic medicines, consumables and hospital stays in public facilities and in private ones under agreement with the Ministry. At its review of the first five years, in October 2020, the Ministry counted 70 million free services from 2016 to 2020, at a cost to the state of more than 120 billion CFA francs. WHO's Global Health Expenditure Database puts out-of-pocket spending at 43.8% of current health expenditure in 2023 (42.3% in 2022, 41.2% in 2021, 31.4% in 2016), and domestic general government spending at 31.4% in 2023, down from 40.1% in 2016. In 2020 the Ministry's secretary general said cancer absorbed more than 60% of the Ministry's budget for medical evacuations abroad.",
          links: [
            { label: "Ministry of Health: free care, more than 120 billion CFA francs in five years (13 October 2020)", url: MS_GRATUITE_2020 },
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Burkina Faso (API)", url: WHO_OOP_API },
            { label: "WHO Global Health Expenditure Database: government share, Burkina Faso (API)", url: WHO_GGHE_API },
            { label: "Ministry of Health: strategic plan against cancer validated (10 February 2020)", url: MS_PLAN_2020 },
          ],
        },
        {
          id: "medicines-list",
          title: "A national list of anticancer medicines, updated in 2025",
          plain:
            "The national cancer control programme keeps a list of the anticancer medicines used in Burkina Faso and revised it in May 2025 with oncologists, pharmacists and the national purchasing centre for essential generic medicines, CAMEG. The list itself was not published on the Ministry's page.",
          detail:
            "The Ministry's report of the workshop, held in May 2025 at CAMEG's headquarters, says its aim was to revise and update the list of anticancer medicines commonly used in Burkina Faso, and that participants adopted an amended version. It was funded by CAMEG and set within the national cancer strategy for 2021 to 2025. At the workshop CAMEG's director general named free screening for gynaecological and breast cancers, free radiotherapy for the commonest cancers, and mobile clinics for screening in remote areas among the government's measures. OnCo did not find a published decision setting out which cancers or which radiotherapy courses are free; see the gaps.",
          links: [
            { label: "Ministry of Health: national list of anticancer medicines updated (16 May 2025)", url: MS_ANTICANCER_LIST_2025 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved",
      aside: { label: "Faso FDA: presentation", url: FASO_FDA },
      cards: [
        {
          id: "faso-fda",
          title: "Faso FDA, a regulator created in May 2026 from two older agencies",
          plain:
            "Medicines in Burkina Faso are authorised by the Faso Food and Drug Administration, created by decree on 22 May 2026 by merging the pharmaceutical regulator, ANRP, with the health products and food safety agency, ANSSEAT. WHO does not list Burkina Faso among regulators at maturity level 3 or 4.",
          detail:
            "Faso FDA describes itself as a non-hospital public health body under the technical supervision of the Ministry of Health and the financial supervision of the Ministry of Finance, created by decree 2026-0602/PF/PRIM/MEF/MS. It grants marketing authorisations, inspects establishments, regulates prices, controls advertising and acts against falsified health products, for human and veterinary medicines, vaccines, blood products, devices and food. Its site carries the national register of clinical trials, the nomenclature of authorised health products and the national therapeutic formulary, and patients can report a side effect through the Med Safety app. WHO's list of regulators at maturity levels 3 and 4, dated August 2026, does not include Burkina Faso. OnCo did not find a published time to authorise a cancer medicine, or which regional reliance routes Faso FDA uses.",
          links: [
            { label: "Faso FDA: presentation, decree 2026-0602 and missions", url: FASO_FDA },
            { label: "WHO: regulatory authorities at maturity levels 3 and 4 (August 2026)", url: WHO_ML_LIST },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: HPV vaccination coverage rows for Burkina Faso (API)", url: WHO_HPV_API },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination of girls since 2022, with first-dose coverage of 95% in 2025",
          plain:
            "Burkina Faso began vaccinating 9-year-old girls against HPV in 2022 with Gavi's support, after pilot campaigns in two districts in 2014 and 2015. WHO's figures show first-dose coverage of girls rising from 70% in 2022 to 96% in 2023, 99% in 2024 and 95% in 2025. WHO's rows for boys are empty.",
          detail:
            "WHO's immunisation coverage rows for Burkina Faso begin in 2022. Coverage of the last dose in the schedule was 16% that year, then 96% in 2023, 99% in 2024 and 95% in 2025, the same as the first dose from 2023. The target population in WHO's rows roughly doubles in 2025, from 335,340 girls to 657,693. In 2021 the minister said HPV vaccination of girls aged 9 to 13 had been run in the Baskuy and Solenzo health districts in 2014 and 2015. A modelling study by Burkinabè and international authors found that vaccinating 9-year-old girls could prevent 37% to 72% of cervical cancer cases and deaths and is cost-effective.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Burkina Faso (public API)", url: WHO_HPV_API },
            { label: "Ministry of Health: world cancer day and cervical cancer (10 February 2021)", url: MS_CERVIX_DAY_2021 },
            { label: "Kiendrébéogo et al., cost-effectiveness of HPV vaccination in Burkina Faso (BMC Health Serv Res 2023)", url: "https://doi.org/10.1186/s12913-023-10283-3" },
          ],
        },
        {
          id: "cervical-breast-screening",
          title: "Cervical screening by visual inspection, and breast screening by campaign",
          plain:
            "The cervical screening service the Ministry added to its minimum package of care in 2016 is visual inspection with acetic acid, followed where needed by same-day treatment. In WHO's 2013 national survey only 6.2% of women had ever been screened. Breast screening is offered through campaigns, such as one for 3,000 women in four cities in 2023.",
          detail:
            "A programme run with the Ministry from 2010 to 2014 in 14 facilities screened 13,999 women by visual inspection; 8.9% screened positive and 65.9% of those were treated with cryotherapy at the same visit. Same-day treatment fell from 82 to 93% to 51% when a $10 fee was charged, and the Ministry added the service to its minimum package of care in 2016. The 2013 WHO STEPS survey found 6.2% of women had ever been screened: 18.5% in towns and 2.8% in rural areas. In April 2023 the minister launched a breast screening campaign for 3,000 women in four major cities, organised by the Coalition Burkinabè Contre le Cancer (COBUCAN), partly to assess hospitals' capacity for breast ultrasound and mammography.",
          links: [
            { label: "Ouedraogo et al., single-visit cervical cancer prevention in Burkina Faso (Glob Health Sci Pract 2018)", url: "https://doi.org/10.9745/GHSP-D-17-00326" },
            { label: "Diendéré et al., cervical screening uptake in Burkina Faso (Rev Epidemiol Sante Publique 2023)", url: "https://doi.org/10.1016/j.respe.2023.101845" },
            { label: "Ministry of Health: breast screening campaign for 3,000 women (24 April 2023)", url: MS_BREAST_CAMPAIGN_2023 },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy and cancer centres",
      aside: { label: "IAEA DIRAC: radiotherapy equipment by centre", url: DIRAC },
      cards: [
        {
          id: "radiotherapy",
          title: "Two radiotherapy machines in IAEA's directory, both at one hospital in Ouagadougou",
          plain:
            "IAEA's radiotherapy directory lists one radiotherapy centre in Burkina Faso, at the CHU de Bogodogo in Ouagadougou, with two linear accelerators and no brachytherapy. That is about one machine for every 12 million people. Before it opened in 2021, a patient quoted by the Ministry said, the alternative was treatment abroad.",
          detail:
            "IAEA DIRAC's public equipment data, read on 11 November 2026, lists the CHU de Bogodogo with two megavoltage machines, both linear accelerators, no brachytherapy and no CT simulator recorded, with the entry last updated in 2025; DIRAC gives Burkina Faso's population as about 24.1 million. Building began in April 2019, according to Burkina Faso's statement to the IAEA General Conference that year, which also credits IAEA cooperation for a nuclear medicine service at the CHU Yalgado Ouédraogo. The Ministry reported the minister meeting the centre's first patients in June 2021, about two months after its inauguration; one patient said she had been able to stay at home with her family rather than go abroad.",
          links: [
            { label: "IAEA DIRAC: radiotherapy equipment by centre (read 11 November 2026)", url: DIRAC },
            { label: "Ministry of Health: the Bogodogo radiotherapy centre (24 June 2021)", url: MS_BOGODOGO_2021 },
            { label: "Burkina Faso statement to the IAEA General Conference, 2019 (PDF)", url: IAEA_GC_2019 },
          ],
        },
        {
          id: "bobo-centre",
          title: "A second radiotherapy centre in Bobo-Dioulasso, years behind schedule",
          plain:
            "A radiotherapy centre for the west of the country has been under construction in Bobo-Dioulasso since 2020. It was due to open in December 2022; in August 2025 the Ministry reported the works 79% complete, with delivery promised for the end of September 2025.",
          detail:
            "The Ministry laid the first stone on 20 October 2020 at the Dafra medical centre, with a cost of 16.91 million euros (11.09 billion CFA francs), built by the Austrian company AME International GmbH with UniCredit Bank Austria, to serve the four western regions. In April 2023 the minister found the works 25% complete, citing internal management problems at the partner, and said a woman with breast cancer in Kénédougou province, in the far west, should not have to travel to Ouagadougou for radiotherapy. On 22 August 2025 the contractor reported 79% completion, and the minister asked for specialist staff, including medical physicists, to be recruited. In March 2026 the Ministry's review of 2025 said that a radiotherapy service had opened during the year, without saying where; OnCo found no Ministry report naming the Bobo-Dioulasso centre as open, and DIRAC does not list it.",
          links: [
            { label: "Ministry of Health: first stone of the Bobo-Dioulasso radiotherapy centre (30 October 2020)", url: MS_BOBO_2020 },
            { label: "Ministry of Health: the Bobo-Dioulasso works at 25% (24 April 2023)", url: MS_BOBO_2023 },
            { label: "Ministry of Health: the Bobo-Dioulasso works at 79% (27 August 2025)", url: MS_BOBO_2025 },
            { label: "Ministry of Health: review of 2025 (13 March 2026)", url: MS_REVIEW_2025 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What Burkina Faso does differently",
      cards: [
        {
          id: "free-precancer",
          title: "Free screening and treatment of precancerous lesions, inside free care for women",
          plain:
            "When Burkina Faso made care free for women and children under five in 2016, it included screening for cervical cancer and treatment of precancerous lesions. The minister's 2021 statement names cervical lesions; in 2020 the Ministry's secretary general described the measure as covering breast lesions too, and in 2025 the Ministry said its mobile clinics offered free breast and cervical screening. OnCo did not find a published text setting out what is free for the breast.",
          detail:
            "In February 2021 the minister of health listed free screening and treatment of precancerous cervical lesions, within the free care measures for pregnant women and children under five since 2016, among the Ministry's actions against cancer. In January 2020 the Ministry's secretary general described the free measure as covering precancerous lesions of the breast and the cervix. The evidence for why it matters is local: in a Ministry-supported programme from 2010 to 2014, the share of women treated the same day fell from 82 to 93% to 51% once a $10 fee was charged, and the Ministry added the service to its minimum package of care in 2016. How many women are now screened each year was not found.",
          links: [
            { label: "Ministry of Health: world cancer day and cervical cancer (10 February 2021)", url: MS_CERVIX_DAY_2021 },
            { label: "Ministry of Health: strategic plan against cancer validated (10 February 2020)", url: MS_PLAN_2020 },
            { label: "Ministry of Health: review of the mobile screening clinics (27 August 2025)", url: MS_MOBILE_CLINICS_2025 },
            { label: "Ouedraogo et al., single-visit cervical cancer prevention in Burkina Faso (Glob Health Sci Pract 2018)", url: "https://doi.org/10.9745/GHSP-D-17-00326" },
          ],
        },
        {
          id: "ten-cancers",
          title: "A national programme organised around the ten commonest cancers",
          plain:
            "Burkina Faso's national cancer control programme ran a national strategy for 2021 to 2025, and in 2025 drafted an order creating a technical working group on the ten commonest cancers in the country, from breast, prostate and cervical cancer to childhood and blood cancers.",
          detail:
            "At a workshop on 29 April 2025 the programme amended a draft order on the creation, duties, membership and working of a technical working group for the ten commonest cancers, which would propose strategies, follow their implementation and report to the health authorities. The Ministry lists the ten as cancers of the breast, prostate, cervix, liver, stomach, colon and rectum, bladder and kidney, childhood cancers and blood cancers. The amended draft was to go to the Ministry for signature; OnCo did not find the signed order. For children, the two national paediatric oncology units in Ouagadougou reported a median of 103.5 days from first symptoms to diagnosis, with referral the longest part of the delay.",
          links: [
            { label: "Ministry of Health: working group on the ten commonest cancers (29 April 2025)", url: MS_WORKING_GROUP_2025 },
            { label: "Ministry of Health: national list of anticancer medicines, within the 2021 to 2025 strategy (16 May 2025)", url: MS_ANTICANCER_LIST_2025 },
            { label: "Ida et al., diagnostic delay in childhood cancer in Burkina Faso (BMC Cancer 2026)", url: "https://doi.org/10.1186/s12885-026-16462-9" },
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
          id: "trials-and-papers",
          title: "No trial in OnCo's records has a site in Burkina Faso",
          plain:
            "None of the cancer trials in OnCo's ClinicalTrials.gov participation data lists Burkina Faso among its countries, and OnCo found no study whose title mentions cancer in the national register of clinical trials kept by the regulator. Burkinabè research on cancer is mostly hospital studies and screening programmes.",
          detail:
            "OnCo's participation data covers the trials in its graph, not every trial registered, so a search of ClinicalTrials.gov itself may find studies with Burkinabè sites. The national register on Faso FDA's site, read on 11 November 2026, lists trials authorised in the country, most of them on malaria, vaccines and nutrition; its titles are shortened on the page, so a cancer study could be missed. Published Burkinabè work includes survival after breast cancer surgery in Ouagadougou, cervical screening programmes and uptake, the cost-effectiveness of HPV vaccination, and delays in diagnosing childhood cancer.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Burkina Faso", url: CTGOV },
            { label: "Faso FDA: national register of clinical trials", url: FASO_FDA_TRIALS },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "who-profile-and-registry",
      title: "WHO's 2020 cancer country profile for Burkina Faso could not be reached",
      plain:
        "WHO publishes a 2020 cancer country profile for each member state, with policy, workforce and medicine availability indicators. The file for Burkina Faso was not found at WHO's address on 11 November 2026, so those indicators are not on this page.",
      detail:
        "The address that serves Senegal's profile returned a not-found error for Burkina Faso, and OnCo did not find an archived copy. OnCo also found no published figures from the cancer registry the Ministry said had been started by 2020, no count of oncologists, pathologists or medical physicists in the country, and no population-based survival figures. The 6.2% screening figure is from 2013, before screening became free.",
      links: [
        { label: "WHO: cancer country profile 2020, Burkina Faso (not found)", url: WHO_PROFILE },
        { label: "Ministry of Health: strategic plan against cancer validated (10 February 2020)", url: MS_PLAN_2020 },
      ],
    },
    {
      id: "benefits-unread",
      title: "What the insurance package and the free measures cover for cancer was not found",
      plain:
        "The RAMU benefit package is set by decree 2023-1410, which the CNAMU names but does not publish on its site. OnCo also did not find the 2025 list of anticancer medicines, or a published decision on which cancers' radiotherapy is free.",
      detail:
        "The CNAMU's page of founding texts, read on 11 November 2026, carries the 2015 law and five decrees but not decree 2023-1410. Article 14 of the law says the list of diseases exempt from charges is to be set by decree; OnCo did not find it. Free radiotherapy for the commonest cancers is mentioned in the Ministry's report of the May 2025 workshop, in the words of CAMEG's director general, not in a decree OnCo could read. Whether cancer medicines are on the national essential medicines list, and in stock, was not found.",
      links: [
        { label: "CNAMU: founding texts", url: CNAMU_TEXTS },
        { label: "Law 060-2015/CNT, article 14 (PDF, CNAMU)", url: LOI_060 },
        { label: "Ministry of Health: national list of anticancer medicines updated (16 May 2025)", url: MS_ANTICANCER_LIST_2025 },
      ],
    },
    {
      id: "radiotherapy-continuity",
      title: "Whether radiotherapy has run without interruption was not verified",
      plain:
        "OnCo found no Ministry or IAEA text on whether the Bogodogo radiotherapy centre has treated without interruption since 2021, and the Bobo-Dioulasso centre's opening was not confirmed either.",
      detail:
        "DIRAC's Burkina Faso entry was last updated in 2025 and records two linear accelerators, but not whether they are working on a given day. The Ministry's most recent page naming the Bobo-Dioulasso centre found here is from August 2025; its review of 2025, published in March 2026, says a radiotherapy service opened that year without naming it. Anyone needing radiotherapy should ask the CHU de Bogodogo directly whether it is treating and how long the wait is.",
      links: [
        { label: "IAEA DIRAC: radiotherapy equipment by centre", url: DIRAC },
        { label: "Ministry of Health: the Bobo-Dioulasso works at 79% (27 August 2025)", url: MS_BOBO_2025 },
        { label: "Ministry of Health: review of 2025 (13 March 2026)", url: MS_REVIEW_2025 },
      ],
    },
  ],
  institutions: ["burkina-faso-ministry-of-health", "cnamu-burkina-faso", "faso-fda", "chu-bogodogo", "chu-yalgado-ouedraogo", "iaea", "who", "iarc"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-ouedraogo-single-visit-cervical-burkina-ghsp-2018", "paper-diendere-cervical-screening-uptake-burkina-respe-2023",
    "paper-kiendrebeogo-hpv-vaccination-cost-effectiveness-burkina-bmchsr-2023", "paper-zongo-breast-cancer-survival-ouagadougou-ejso-2022",
    "paper-ida-childhood-cancer-diagnostic-delay-burkina-bmccancer-2026",
  ],
  people: [],
  how:
    "Every card was written from Burkinabè official sources and international agencies, read in full rather than through a summary: the Ministry of Health's dated news pages; Law 060-2015/CNT and the CNAMU's pages on the RAMU; Faso FDA's presentation page and national register of clinical trials; the AFCRN membership list; WHO's HPV coverage and health expenditure rows from its public data APIs and its August 2026 list of regulators at maturity levels 3 and 4; IAEA DIRAC's public equipment data and Burkina Faso's 2019 statement to the IAEA General Conference; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC. Burkina Faso is a fragile, conflict-affected setting, and the page keeps to what these sources state. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the Ministry, the CNAMU, Faso FDA, two university hospitals and five papers) carry their own sources.",
  verify:
    "National cancer figures for Burkina Faso are estimates, not counts. Which services are free, whether radiotherapy is running and which medicines are in stock change faster than published pages; ask the treating hospital, the CNAMU or the Ministry of Health what applies to you.",
  verifyLinks: [
    { label: "Ministère de la Santé", url: MS_HOME },
    { label: "CNAMU: the RAMU", url: CNAMU_HOW },
    { label: "Faso FDA", url: FASO_FDA },
  ],
};

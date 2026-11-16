import type { CountryDive } from "@/data/country-dive";

/**
 * Finland deep dive: the hand-written cards for /countries/fi/ (wave 8). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: the Finnish Cancer Registry's Cancer in Finland 2024 report
 * (HTML, through the Internet Archive's capture of 19 September 2026, because the registry's report host answered a
 * plain request with a bot check) and its screening pages; Kela's pages on medicine reimbursement; the Ministry of
 * Social Affairs and Health's pages on wellbeing services counties and client charges (Internet Archive captures of
 * September 2026, as stm.fi refused a plain request); FICAN's home page and its page on the national cancer strategy;
 * Fimea's "About us" page (Internet Archive, February 2025); the European Medicines Agency's page on the centralised
 * procedure; WHO's HPV coverage and health expenditure rows from its public data APIs; and IARC's GLOBOCAN 2024 fact
 * sheet. Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/246-finland-fact-sheet.pdf";
const CIF_PAGE = "https://cancerregistry.fi/reports-and-publications/annual-report-on-cancer-in-finland/";
const CIF_2024_WB = "https://web.archive.org/web/20260919081400/https://syoparekisteri.fi/assets/themes/ssy3/factsheets/cancer_in_finland_2024.html";
const CRC_SCREEN = "https://cancerregistry.fi/screening/colorectal-cancer-screening/";
const BREAST_SCREEN = "https://cancerregistry.fi/screening/breast-cancer-screening/";
const CERV_SCREEN = "https://cancerregistry.fi/screening/cervical-cancer-screening/";
const KELA_MED = "https://www.kela.fi/medicine-expenses";
const KELA_MAX = "https://www.kela.fi/medicine-expenses-annual-maximum-limit-on-out-of-pocket-costs";
const STM_WSC_WB = "https://web.archive.org/web/20260915114914/https://stm.fi/en/wellbeing-services-counties";
const STM_FEES_WB = "https://web.archive.org/web/20260927200236/https://stm.fi/en/client-fees";
const FICAN = "https://www.fican.fi/en/";
const FICAN_STRATEGY = "https://fican.fi/en/what-we-do/national-cancer-strategy/";
const FIMEA_WB = "https://web.archive.org/web/20250215204011/https://fimea.fi/en/about_us";
const EMA_CENTRAL = "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'FIN'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_GHED_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'FIN'";
const CTGOV = "https://clinicaltrials.gov/search?country=Finland&cond=cancer";

export const FI_DIVE: CountryDive = {
  iso2: "FI",
  iso3: "FIN",
  name: "Finland",
  flag: "🇫🇮",
  asOf: "2026-11-11",
  title: "Cancer in Finland",
  description:
    "Cancer in Finland from Finnish sources: the Finnish Cancer Registry's count of 38,853 new cancers and 13,490 deaths in 2024, IARC's 2024 estimate, 21 wellbeing services counties and an annual charge ceiling of EUR 815, Kela's medicine reimbursement and its EUR 636.12 yearly cap, FICAN's five regional cancer centres, a national cancer strategy for 2026 to 2035, and screening for cervical, breast and bowel cancer.",
  lede:
    "Finland has registered every cancer since 1953. Its registry counted 38,853 new cancers and 13,490 cancer deaths in 2024, and more than 340,000 people living after a diagnosis. Health services have been organised since 2023 by 21 wellbeing services counties and the City of Helsinki, and specialised cancer care is networked through FICAN's five regional cancer centres.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Finland is 36,289 new cancers and 13,674 deaths, an age-standardised incidence of 258.9 per 100,000 (280.3 in men, 245.2 in women) and mortality of 77.9. IARC's method for Finland is trends in the national registry's rates projected to 2024, and for deaths trends in national WHO mortality data. The Finnish Cancer Registry's own count for 2024, published in April 2026 and so after IARC's projection was made, is 38,853 new cases and 13,490 deaths. The registry's age-standardised rates use the Finnish population of 2014 as the standard, not IARC's world standard, so its rates and IARC's cannot be set side by side.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Finland",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Finland (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 39,000 new cancers a year: prostate and breast commonest, lung the leading cause of cancer death",
          plain:
            "The Finnish Cancer Registry counted 38,853 new cancers in 2024. Breast cancer is the commonest in women and prostate cancer in men, with colorectal cancer second in both. Lung cancer caused the most cancer deaths, followed by colorectal and pancreatic cancer.",
          detail:
            "Cancer in Finland 2024 gives 5,232 new breast cancers, 5,609 prostate cancers, 1,936 colorectal cancers in women and 2,217 in men, and 1,175 lung cancers in women and 1,717 in men. Lung and tracheal cancer caused 2,275 deaths, colorectal cancer 1,414 and pancreatic cancer 1,332. In women breast cancer was the commonest cause of cancer death (895 deaths), and in men lung cancer (1,425). The registry estimates that 36% of women and 38% of men develop cancer in their lifetime, and that 17% of women and 19% of men die of it. Incidence and mortality were highest among people with a basic education and lowest among those with higher education, the gap widest for lung cancer, though breast and prostate cancer were commoner among the more educated. Around 2,000 stomach cancers a year were diagnosed in the 1950s, when it was the commonest cancer; about 640 are diagnosed now.",
          links: [
            { label: "Cancer in Finland 2024, chapters 2, 6 and 7 (Internet Archive copy)", url: CIF_2024_WB },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Finland (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
      tables: [
        {
          id: "cif-2024",
          title: "The registry's own count for 2024",
          caption: "New cases, deaths, people alive after a diagnosis at the end of 2024, and five-year relative survival (patients followed 2022 to 2024)",
          columns: [
            { key: "group", label: "Group" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
            { key: "living", label: "Living after diagnosis", numeric: true },
            { key: "surv", label: "5-year survival %", numeric: true },
          ],
          rows: [
            { group: "All", cases: 38853, deaths: 13490, living: 343041, surv: 72 },
            { group: "Women", cases: 18667, deaths: 6206, living: 191469, surv: 74 },
            { group: "Men", cases: 20186, deaths: 7284, living: 151572, surv: 71 },
          ],
          note: "From Table 2.1 of Cancer in Finland 2024. Counts include all cancers registered; the registry notes that cases with no tissue sample and some blood cancers may go unreported.",
          sources: [{ label: "Cancer in Finland 2024, Table 2.1 (Internet Archive copy)", url: CIF_2024_WB }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "A national registry since 1953",
      cards: [
        {
          id: "registry-how",
          title: "Run by the Cancer Society for the state, and faster than before",
          plain:
            "The Finnish Cancer Registry is a research institute of the Cancer Society of Finland; the Finnish Institute for Health and Welfare is legally responsible for the data. It published final figures for 2024 and preliminary figures for 2025 in April 2026, and for the first time reports how often the stage of a cancer was recorded.",
          detail:
            "The report says the registry keeps a national register of all diagnosed cancers and the registers of the cervical, breast and colorectal screening programmes, and compiles treatment data for the cancer quality registry project. The Finnish Institute for Health and Welfare (THL) is the controller and contracts the Cancer Society for technical maintenance. Data come from healthcare providers and pathology laboratories. The preliminary 2025 count, 35,870 cases, is about 10% short, and more than 40% short for pancreatic cancer. Stage at diagnosis was recorded for 42% of solid tumours registered for 2024. From 2024 to 2045 the registry projects age-standardised incidence to rise by about 0.1% a year and mortality to fall by about 0.7% a year.",
          links: [
            { label: "Cancer in Finland 2024, foreword and chapter 2 (Internet Archive copy)", url: CIF_2024_WB },
            { label: "Finnish Cancer Registry: annual report on cancer in Finland", url: CIF_PAGE },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Who pays for cancer care",
      cards: [
        {
          id: "counties",
          title: "Public services from 21 wellbeing services counties, with a yearly ceiling on charges",
          plain:
            "Since the start of 2023, 21 wellbeing services counties and the City of Helsinki have organised health care in Finland, and HUS handles specified demanding specialist care. Charges for public health services stop for the year once a person has paid the annual ceiling, EUR 815 in 2026.",
          detail:
            "The Ministry of Social Affairs and Health says responsibility for organising health, social and rescue services moved from municipalities and joint municipal authorities to wellbeing services counties at the beginning of 2023. There are 21 counties, based mainly on the regions, with Uusimaa divided into four; the City of Helsinki continues to organise its own services, and the HUS Group is responsible for demanding specialised healthcare duties laid down by law. The Ministry's page on client charges says charges for public services, mainly health services, have an upper limit per calendar year beyond which clients do not pay, EUR 815 in 2026, and that invoices must show whether a charge counts towards it. WHO's Global Health Expenditure Database puts out-of-pocket spending at 14.1% of Finland's current health expenditure in 2023.",
          links: [
            { label: "Ministry of Social Affairs and Health: wellbeing services counties (Internet Archive copy, September 2026)", url: STM_WSC_WB },
            { label: "Ministry of Social Affairs and Health: client charges (Internet Archive copy, September 2026)", url: STM_FEES_WB },
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Finland (API)", url: WHO_GHED_API },
          ],
        },
        {
          id: "kela",
          title: "Medicines from the pharmacy: Kela pays 40%, 65% or 100%, with a yearly cap",
          plain:
            "Prescription medicines bought at a pharmacy, such as cancer tablets, are reimbursed by Kela at 40%, 65% or 100% after a yearly deductible of EUR 70.33. Once a person has paid EUR 636.12 for reimbursable medicines in 2026, each further prescription medicine costs EUR 2.50.",
          detail:
            "Kela's pages give three reimbursement categories: the basic rate of 40% of a medicine's sales or reference price, the lower special rate of 65% and the higher special rate of 100%, with a copayment of EUR 4.50 for each purchase at 100%. Special rates require a right to reimbursement granted by Kela. A person pays the full price until the initial deductible of EUR 70.33 for the calendar year. The annual maximum on out-of-pocket costs for reimbursable medicines is EUR 636.12 in 2026, and after it each prescription medicine costs EUR 2.50, plus any amount above the reference price if the person declines a cheaper substitute. Kela can lend the annual maximum to people on low incomes. Kela's pages read for this page do not say which cancer medicines fall into which category; see the gaps.",
          links: [
            { label: "Kela: reimbursements for medicine costs", url: KELA_MED },
            { label: "Kela: annual maximum limit on out-of-pocket medicine costs (2026)", url: KELA_MAX },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Who approves cancer medicines",
      cards: [
        {
          id: "fimea-ema",
          title: "European approval, with Fimea as the national regulator",
          plain:
            "New cancer medicines are approved for Finland through the European Medicines Agency's centralised procedure, which is compulsory for new cancer medicines. Fimea, the Finnish Medicines Agency, is the national regulator and can act as a rapporteur in European assessments.",
          detail:
            "The European Medicines Agency states that the centralised procedure is compulsory for medicines with a new active substance to treat cancer, for biotechnology medicines, advanced therapies and orphan medicines, and that a centralised authorisation is valid in every EU member state; the European Commission's decision is issued within 67 days of EMA's recommendation. Fimea describes itself as the national competent authority for regulating pharmaceuticals, operating under the Ministry of Social Affairs and Health, and regulating medicinal products, medical devices, blood and tissue products and biobanks; its pages describe Finland acting as rapporteur in the centralised procedure. How Fimea's assessments of hospital medicines feed decisions in the counties was not read from a primary source; see the gaps.",
          links: [
            { label: "European Medicines Agency: authorisation of medicines, the centralised procedure", url: EMA_CENTRAL },
            { label: "Fimea: about us (Internet Archive copy, February 2025)", url: FIMEA_WB },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      cards: [
        {
          id: "screening-programmes",
          title: "Cervical screening since 1963, breast screening, and bowel screening rolled out from 2022",
          plain:
            "Women aged 30 to 65 are invited to cervical screening every five years and women aged 50 to 69 to mammography every two years. Bowel screening by a home stool test was launched nationwide in 2022 for people aged 60 to 70 and will cover everyone aged 56 to 74 by 2031. Taking part in bowel screening is free.",
          detail:
            "The registry's cervical screening page says screening began in 1963 and covered the whole country by the early 1970s, that about 70% of women invited take part, and that it is estimated to avoid more than 250 cancer deaths a year; cervical cancer incidence and deaths have fallen to a fifth of their 1960s level, to about 170 cases and 55 deaths a year. HPV testing is used alongside the Pap test for women over 35. More than 80% of women invited to breast screening attend; between 1992 and 2003 breast cancer mortality among invited women was 22% lower than expected without screening. Colorectal screening uses a faecal immunochemical test every two years; it was piloted in 2019 to 2021 and launched nationwide in 2022, and a positive test leads to further examination, usually colonoscopy, arranged by the person's municipality. A randomised screening programme ran from 2004 to 2016.",
          links: [
            { label: "Finnish Cancer Registry: cervical cancer screening", url: CERV_SCREEN },
            { label: "Finnish Cancer Registry: breast cancer screening", url: BREAST_SCREEN },
            { label: "Finnish Cancer Registry: colorectal cancer screening", url: CRC_SCREEN },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccine for girls and boys at school",
          plain:
            "HPV vaccination joined Finland's national programme in 2013 and is offered to girls and boys aged 11 to 12 through school health care. WHO and UNICEF's figures put first-dose coverage at 80% for girls and 74% for boys in 2025.",
          detail:
            "The registry's cervical screening page says the HPV vaccination programme started in 2013 as part of the national vaccination programme and is offered to girls and boys aged 11 to 12 through school health care, and that it has not yet reduced the need for cervical screening. WHO's immunisation data give coverage of 80% (girls) and 74% (boys) for the first dose in 2025, and 65% and 57% for the last dose; the first rows for boys are for 2020.",
          links: [
            { label: "Finnish Cancer Registry: cervical cancer screening, HPV vaccination programme", url: CERV_SCREEN },
            { label: "WHO immunisation data: HPV programme coverage, Finland (API)", url: WHO_HPV_API },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing differently",
      title: "What Finland does differently",
      cards: [
        {
          id: "fican-network",
          title: "One national cancer centre made of five regional ones",
          plain:
            "Finland's cancer care is networked through FICAN, the Finnish Cancer Center, set up under the decree on centralising specialised care. It is made up of five regional cancer centres and a national coordinating unit.",
          detail:
            "FICAN's home page says it was established under the Centralization Decree to promote effective and equitable cancer care in Finland, and comprises five regional cancer centres and a coordinating unit responsible for national activities and collaboration. Its pages cover national treatment guidelines, rare cancers, the national personalised medicine programme and OECI accreditation, and its news pages report a roadmap for the cancer strategy accepted by its steering group and a decision to set up a Finnish National Cancer Mission Hub. Tampere's cancer centre (FICAN Mid) and the university hospitals of Helsinki, Turku, Oulu and Kuopio are listed below.",
          links: [{ label: "FICAN: home page", url: FICAN }],
        },
        {
          id: "strategy",
          title: "A national cancer strategy for 2026 to 2035",
          plain:
            "Finland published its national cancer strategy, Together against cancer, for 2026 to 2035 on 10 November 2025. It aims to reduce inequalities, prevent cancer and detect it earlier, and make treatment equal for everyone, with an implementation roadmap due in 2026, which FICAN reports its steering group has accepted.",
          detail:
            "FICAN's page on the strategy says it was published on 10 November 2025 after working groups involving more than 200 healthcare professionals, researchers, organisations and citizens, steered by the Ministry of Social Affairs and Health, the Finnish Institute for Health and Welfare, the Cancer Society of Finland and FICAN. Its stated values are reducing inequalities, improving quality of life, effective care and research. An implementation roadmap setting out actions, timetables, responsible bodies and resources, including the roles of the wellbeing services counties, was due in 2026; FICAN's news pages report that its steering group accepted it.",
          links: [{ label: "FICAN: national cancer strategy 2026 to 2035", url: FICAN_STRATEGY }],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      cards: [
        {
          id: "trial-count",
          title: "213 trials in OnCo's records have a site in Finland",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, 213 of the cancer trials in our records list a site in Finland, including prostate, ovarian and lymphoma trials. A selection is listed below.",
          detail:
            "OnCo's graph holds ClinicalTrials.gov participation snapshots for its trials, and 213 list Finland among their countries; that reflects the trials OnCo holds, not every study in Finland. When OnCo built its country file on 8 September 2026, ClinicalTrials.gov counted 4,351 studies of any condition with a site in Finland. OpenAlex, counting works whose primary topic is oncology and a paper for every country among its authors' affiliations, gives Finland 340 works in 2021, 384 in 2022, 376 in 2023, 313 in 2024 and 395 in 2025, 1,808 in total, of which 1,470 are open access and 86 highly cited.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with a site in Finland (search)", url: CTGOV }],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "hospital-medicines",
      title: "How hospital cancer medicines are chosen",
      plain:
        "OnCo could not read from a primary source how a new hospital cancer medicine is assessed and adopted across Finland's counties, because the pages of Fimea and of the Council for Choices in Health Care refused a plain request. This page therefore does not describe that route.",
      detail:
        "fimea.fi and palveluvalikoima.fi refused a plain request (HTTP 403) on 11 November 2026, and the Fimea page used here is an Internet Archive copy from February 2025 that does not cover its assessments of hospital medicines. The registry's HTML report and stm.fi also refused plain requests and were read through Internet Archive copies of September 2026. Which cancer medicines carry Kela's special reimbursement rates was not read.",
      links: [{ label: "Fimea: about us (Internet Archive copy)", url: FIMEA_WB }],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Waiting times for cancer treatment, radiotherapy capacity and survival by stage are not on this page because OnCo did not read them from a primary source.",
      detail:
        "The registry's tables of survival by cancer type and region, its screening annual reviews, and the IAEA's DIRAC radiotherapy database were not read for this page. The registry's breast screening page cites mortality results for 1992 to 2003 and says they were unchanged in the late 2000s; newer results were not read.",
      links: [{ label: "Finnish Cancer Registry: annual report on cancer in Finland", url: CIF_PAGE }],
    },
  ],
  institutions: [
    "finnish-cancer-registry", "kela-finland", "fimea-finland", "fican", "cancer-society-of-finland", "helsinki-hus",
    "tays-cancer-centre", "turku-university-hospital", "oulu-university-hospital", "kuopio-university-hospital", "docrates", "ema", "iarc",
  ],
  companies: ["orion-orion-pharma", "faron-pharmaceuticals", "tilt-biotherapeutics", "kaiku-health", "mvision-ai", "modulight"],
  drugs: [],
  trials: ["arasens", "arches", "prima", "athena-mono", "cll13-gaia", "cartitude-5", "transform", "mslt-ii"],
  papers: [],
  people: [],
  how:
    "Every card was written from Finnish official sources read in full rather than through a summary: the Finnish Cancer Registry's Cancer in Finland 2024 and its screening pages; Kela's pages on medicine reimbursement; the Ministry of Social Affairs and Health's pages on wellbeing services counties and client charges; FICAN's pages; Fimea's description of itself; the European Medicines Agency's page on the centralised procedure; WHO's HPV coverage and health expenditure rows from its public data APIs; and IARC's GLOBOCAN 2024 fact sheet. Sites that refused a plain request were read through Internet Archive copies, named in each link. Trials were counted from OnCo's ClinicalTrials.gov participation data, and research output from OpenAlex.",
  verify:
    "Charges and Kela's caps change each year, and which medicines a county's hospitals use is decided regionally and nationally. Ask the treating hospital or your wellbeing services county what applies to you, and check Kela for current reimbursement rates.",
  verifyLinks: [
    { label: "Finnish Cancer Registry", url: "https://cancerregistry.fi" },
    { label: "Kela: medicine expenses", url: KELA_MED },
    { label: "FICAN", url: FICAN },
  ],
};

import type { CountryDive } from "@/data/country-dive";

/**
 * Democratic Republic of the Congo deep dive: the hand-written cards for /countries/cd/ (wave 6). Every figure was read
 * from the raw text of its source on 11 November 2026, not from a summary of it: the IAEA, WHO and IARC imPACT Review
 * summary report (PDF text, review of May to November 2021), the IAEA's articles of 22 February 2022 and 17 November
 * 2023 (through the Internet Archive, as the IAEA refused a plain request), the OPEC Fund's project page for the
 * Kinshasa Cancer Center Project, the Ministry of Public Health's 2015 strategy against cervical and breast cancer (PDF
 * text, in French), ACOREP's register of marketing authorisations (PDF text, posted 4 February 2026), NIAID ClinRegs'
 * country profile, the national cancer centre's (CNLC) own posts, dispatches of the state news agency ACP and of Radio
 * Okapi (in French; cited as reports of what officials said, not as measurements), the World Bank's feature of 19 August
 * 2025 on HPV vaccination, WHO's immunisation data API, the World Bank's API for WHO Global Health Expenditure figures,
 * UNHCR's population statistics API, ClinicalTrials.gov's API, the African Cancer Registry Network's member list, IARC's
 * GLOBOCAN 2024 fact sheet, and the papers' abstracts through Europe PMC. Where a figure could not be read it is named
 * under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/180-congo-democratic-republic-of-fact-sheet.pdf";
const IMPACT_2022 = "https://www.iaea.org/sites/default/files/documents/review-missions/democratic-republic-of-congo-impact-review-report-2022.pdf";
const IAEA_2022 = "https://www.iaea.org/newscenter/news/strengthening-cancer-care-in-the-democratic-republic-of-the-congo-experts-recommend-decentralizing-services";
const IAEA_2022_WB = "https://web.archive.org/web/20220703120837/https://www.iaea.org/newscenter/news/strengthening-cancer-care-in-the-democratic-republic-of-the-congo-experts-recommend-decentralizing-services";
const IAEA_2023_WB = "https://web.archive.org/web/20231117192811/https://www.iaea.org/newscenter/news/iaea-director-general-and-president-of-the-democratic-republic-of-the-congo-celebrate-cancer-care-milestone";
const OPEC_KCC = "https://opecfund.org/where-we-work/list/kinshasa-cancer-center-project";
const STRAT_2015 = "https://www.iccp-portal.org/system/files/plans/COD_B5_Strat%C3%A9gie%20version%20finale%20du%2024042015.pdf";
const ACOREP = "https://acorep.gouv.cd/";
const ACOREP_AMM = "https://acorep.gouv.cd/repertoire-des-medicaments-autorises/";
const CLINREGS = "https://clinregs.niaid.nih.gov/country/drc";
const CNLC_SCREENING = "https://cnlc.cd/2025/10/20/le-cnlc-encourage-le-depistage-volontaire-et-gratuit-du-cancer/";
const ACP_EXCELLENCE = "https://acp.cd/science-sante-environnement/rdc-le-gouvernement-projette-de-creer-un-centre-national-dexcellence-contre-le-cancer/";
const ACP_MEDICINES = "https://acp.cd/science-sante-environnement/rdc-des-medicaments-receptionnes-a-kinshasa-pour-lutter-contre-le-cancer/";
const ACP_CSU_2026 = "https://acp.cd/science-sante-environnement/rdc-elargir-la-couverture-sante-universelle-en-2026/";
const OKAPI_PAEDIATRIC = "https://fr.allafrica.com/stories/202602200120.html";
const WB_HPV = "https://www.worldbank.org/en/news/feature/2025/08/19/protecting-women-and-girls-in-the-democratic-republic-of-congo-drc-against-cervical-cancer";
const WHO_IMM_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'COD'%20and%20(startswith(ANTIGEN,'HPV')%20or%20startswith(ANTIGEN,'HEPB'))";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=CD";
const WB_EXT = "https://data.worldbank.org/indicator/SH.XPD.EHEX.CH.ZS?locations=CD";
const WB_GHED = "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=CD";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=CD";
const UNHCR_API = "https://api.unhcr.org/population/v1/population/?yearFrom=2023&yearTo=2026&coo=COD&coa=COD";
const AFCRN_LIST = "https://afcrn.org/index.php/membership/membership-list";
const CTGOV = "https://clinicaltrials.gov/search?cond=cancer&country=Democratic%20Republic%20of%20the%20Congo";
const CTGOV_LMB = "https://clinicaltrials.gov/study/NCT04425421";
const P_LABS = "https://doi.org/10.5493/wjem.v13.i3.17";
const P_CERVIX = "https://doi.org/10.1016/j.gofs.2021.07.001";
const P_DHS = "https://doi.org/10.1038/s41598-026-62712-y";
const P_PILZ = "https://doi.org/10.1136/bmjopen-2025-114083";

export const CD_DIVE: CountryDive = {
  iso2: "CD",
  iso3: "COD",
  name: "the Democratic Republic of the Congo",
  flag: "🇨🇩",
  asOf: "2026-11-11",
  title: "Cancer in the Democratic Republic of the Congo",
  description:
    "Cancer in the Democratic Republic of the Congo from WHO, IAEA, UN and Congolese sources: IARC's estimate of 69,739 new cancers and 44,261 deaths in 2024, made without any Congolese registry, the 2021 imPACT Review, the national cancer centre created in 2020, one private radiotherapy centre and a public one being financed, the regulator ACOREP and its register of medicines, out-of-pocket spending, cervical screening reported by 0.69% of women, HPV vaccine planned for 2026, and why no trial in our records has a site there.",
  lede:
    "The Democratic Republic of the Congo has no cancer registry, so its national figures are IARC estimates borrowed from neighbouring countries: 69,739 new cancers and 44,261 deaths in 2024, with cervical, breast and prostate cancer leading. The 2021 imPACT Review found diagnosis and treatment concentrated in Kinshasa, mostly in private facilities, and no public radiotherapy, in a country where millions of people are displaced by conflict.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for the Democratic Republic of the Congo is 69,739 new cancers and 44,261 deaths, an age-standardised incidence of 116.3 per 100,000 (109.1 in men, 125.1 in women) and mortality of 77.0. IARC's fact sheet gives no country-specific data source for incidence: its method is rates based on incidence estimates or registry data from neighbouring countries. Mortality is the national incidence applied to modelled mortality-to-incidence ratios from registry survival data (SURVCAN). So the figure is a model for a population of about 109 million that no Congolese registry has measured; the imPACT reviewers found no population-based or hospital-based registry in 2021, and the African Cancer Registry Network's member list includes a registry in Brazzaville, in the neighbouring Republic of the Congo, but none in the DRC. The previous edition, GLOBOCAN 2020, quoted by the imPACT Review, gave 48,839 new cancers and 34,412 deaths; the two editions were built with different data and methods, so the difference should not be read as a trend. What Congolese data exist are laboratory series: four Kinshasa pathology laboratories recorded 6,106 cancers from 2005 to 2019, 68% in women, led by breast and cervical cancer in women and prostate and skin cancer in men, close to the pattern IARC models.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in the Democratic Republic of the Congo",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Democratic Republic of the Congo (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 70,000 new cancers a year in IARC's model, led by cervical, breast and prostate cancer",
          plain:
            "IARC estimates 69,739 new cancers in the Democratic Republic of the Congo in 2024, 40,144 in women and 29,595 in men. Cervical cancer is the commonest, then breast and prostate cancer. For every ten new cancers IARC estimates about six cancer deaths in the same year. These are modelled numbers, not counts, because the country has no cancer registry.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 11,215 cervical cancers (6,755 deaths), 9,722 breast cancers (4,606 deaths), 7,779 prostate cancers (4,766 deaths), 3,941 colorectal cancers, 3,606 liver cancers (3,251 deaths), 3,343 oesophageal cancers (3,048 deaths), 2,522 non-Hodgkin lymphomas, 2,387 leukaemias and 2,333 Kaposi sarcomas. Cervical cancer is 27.9% of cancers in women and has the highest age-standardised incidence, 36.2 per 100,000, followed by prostate (34.6) and breast (29.3). In men the leading cancers are prostate (26.3%), liver, colorectum, oesophagus and Kaposi sarcoma, which is fifth with 1,555 cases. The risk of developing a cancer before age 75 is 12.6%, and of dying of one 8.7%; an estimated 118,745 people are living within five years of a diagnosis. Deaths divided by new cases give 0.63. A Ministry of Health collection in 25 Kinshasa hospitals and 3 in Bas-Congo from 2008 to 2010 found 646 cancers, prostate 28%, cervix 19% and breast 18%, and the Ministry's 2015 strategy says both women's cancers are diagnosed late.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Democratic Republic of the Congo (PDF)", url: IARC_FACTSHEET },
            { label: "Stratégie nationale de lutte contre les cancers du col utérin et du sein, section 1.1.2 (Ministry of Public Health, 2015, PDF)", url: STRAT_2015 },
          ],
        },
        {
          id: "care-capacity",
          title: "Where care is: mostly in Kinshasa, mostly private, and surgery before anything else",
          plain:
            "In 2021 international reviewers found that most cancer diagnosis and treatment in the Democratic Republic of the Congo was in private facilities in Kinshasa. Ten laboratories could make a basic tissue diagnosis, chemotherapy was given by general medical departments, and surgery was done by general surgeons and gynaecologists. Many cancer medicines were not on the essential medicines list.",
          detail:
            "The imPACT Review, requested by the Ministry of Health in June 2018 and carried out virtually by IAEA, WHO and IARC experts from 28 May to 26 November 2021, held discussions with 21 of the principal cancer facilities in Kinshasa, Tshopo, Haut-Katanga and South Kivu. It found diagnostic services mainly in Kinshasa, ten functional laboratory units able to provide histological diagnosis, and immunohistochemistry not routinely available for lack of reagents, equipment and training. Cancer surgery was performed by general surgeons, gynaecologists, other organ specialists and one surgical oncologist; chemotherapy was given in various departments, especially internal medicine; access to anticancer medicines was limited because not all are on the essential medicines list. There was no palliative care unit, no policy on access to opioids, and morphine syrup was not on the essential list. The IAEA's article on the review said cancer is often treated by surgery because radiotherapy and chemotherapy are not sufficiently developed. The reviewers recommended medical oncology as a specialty, multidisciplinary tumour boards, and adding chemotherapy and hormonal therapy to the essential list in line with WHO's.",
          links: [
            { label: "imPACT Review summary report, findings 6 to 9 and recommendations (IAEA, WHO, IARC, PDF)", url: IMPACT_2022 },
            { label: "IAEA: experts recommend decentralising cancer services in the DRC (22 February 2022; read through the Internet Archive)", url: IAEA_2022_WB },
          ],
        },
      ],
      tables: [
        {
          id: "cd-counts",
          title: "The counts that exist: hospital and laboratory series, and IARC's estimates",
          caption: "New cancers counted or estimated, by source and period. There is no population-based registry; latest measured series: Kinshasa laboratories, 2005 to 2019.",
          columns: [
            { key: "source", label: "Source (what it covers)" },
            { key: "period", label: "Years" },
            { key: "cases", label: "Cancers", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
            { key: "pattern", label: "What it shows" },
          ],
          rows: [
            { source: "Ministry of Health collection (25 Kinshasa hospitals, 3 in Bas-Congo)", period: "2008 to 2010", cases: 646, deaths: null, pattern: "Prostate 28%, cervix 19%, breast 18%" },
            { source: "Four Kinshasa pathology laboratories (Bukasa-Kakamba et al.)", period: "2005 to 2019", cases: 6106, deaths: null, pattern: "68.3% in women; breast and cervix lead in women, prostate and skin in men" },
            { source: "Five Kinshasa pathology laboratories (Kajimina Katumbayi et al.)", period: "Ten years before 2021", cases: 5801, deaths: null, pattern: "Cervical cancer 22% of all cancers (1,280)" },
            { source: "IARC GLOBOCAN 2020, as quoted by the imPACT Review (national estimate)", period: "2020", cases: 48839, deaths: 34412, pattern: "21,617 cancers in men, 27,222 in women" },
            { source: "IARC GLOBOCAN 2024 (national estimate from neighbouring countries' data)", period: "2024", cases: 69739, deaths: 44261, pattern: "Cervix 11,215, breast 9,722, prostate 7,779" },
          ],
          note: "The first three rows count cancers that reached a hospital or a biopsy in the capital, not the population's cancers, and cannot give rates. The two IARC rows are models, not counts, built with different data and methods, so they are not a trend. The five-laboratory paper's abstract does not give its exact years.",
          sources: [
            { label: "Ministry of Public Health, 2015 strategy against cervical and breast cancer, section 1.1.2 (PDF)", url: STRAT_2015 },
            { label: "Bukasa-Kakamba et al., proportion of thyroid cancer and other cancers in the DRC (World J Exp Med 2023)", url: P_LABS },
            { label: "Kajimina Katumbayi et al., 1,280 cervical cancers in Kinshasa (Gynecol Obstet Fertil Senol 2022)", url: P_CERVIX },
            { label: "imPACT Review summary report, finding 1 (PDF)", url: IMPACT_2022 },
            { label: "IARC: GLOBOCAN 2024 fact sheet (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: no registry yet, and a plan for three",
      aside: { label: "imPACT Review summary report (PDF)", url: IMPACT_2022 },
      cards: [
        {
          id: "no-registry",
          title: "No population-based or hospital-based registry, and three proposed",
          plain:
            "The Democratic Republic of the Congo has never had a cancer registry that counts every cancer in a defined population. The imPACT reviewers recommended starting with two in Kinshasa and one covering the whole city of Lubumbashi, coordinated by the national cancer centre, and adding cancer to the national health information system.",
          detail:
            "The imPACT Review states that the DRC has neither a population-based nor a hospital-based cancer registry, and that developing one is a priority of the National Cancer Control Center created in 2020. It recommends a registry in the main tertiary hospitals of every province, with designated focal points trained in CanReg5; revising the ministerial decree that created the centre to add a registry division with premises, a budget and staff; and, as resources allow, population-based registries covering the Lukunga and Mont Amba districts of Kinshasa and the whole of Lubumbashi, with a coordinating registry at the centre. The Ministry's 2015 strategy had already listed the absence of a cancer database and of cancers on the list of diseases under surveillance among its problems, and annexed case notification and registration forms; its list of abbreviations names a Grand Registre Congolais des Cancers (GRCC). The African Cancer Registry Network's member list, read on 11 November 2026, has no registry in the DRC. In August 2026 the Ministry's Secretary General was reported saying the national cancer centre now supplies the statistics on the disease; its statistics page was empty when read.",
          links: [
            { label: "imPACT Review summary report, finding 3 and recommendations on registration (PDF)", url: IMPACT_2022 },
            { label: "Stratégie nationale de lutte contre les cancers du col utérin et du sein, section 1.1.3 and annexes 3 to 5 (PDF)", url: STRAT_2015 },
            { label: "African Cancer Registry Network: membership list", url: AFCRN_LIST },
            { label: "ACP: le gouvernement projette de créer un centre national d'excellence contre le cancer (2 August 2026)", url: ACP_EXCELLENCE },
          ],
        },
      ],
    },
    {
      id: "context",
      nav: "Context",
      title: "Cancer care in a country with conflict, displacement and outbreaks",
      aside: { label: "UNHCR: population statistics for the DRC (API)", url: UNHCR_API },
      cards: [
        {
          id: "displacement",
          title: "Millions of people displaced inside the country, and repeated epidemics competing for the same services",
          plain:
            "UNHCR's statistics record about 5.7 million people displaced inside the Democratic Republic of the Congo at the end of 2025, after 6.9 million at the end of 2024. Officials have also had to respond to Ebola, cholera, mpox and measles. Cancer services compete with these emergencies for staff and money, and people who have fled their homes are far from the few places that treat cancer.",
          detail:
            "UNHCR's population statistics, read through its public API on 11 November 2026, record 6,251,790 internally displaced people in the DRC at the end of 2023, 6,905,511 at the end of 2024 and 5,669,479 at the end of 2025, with 3,582,665 people recorded as returned displaced people in 2025. A January 2026 dispatch of the state news agency ACP listed outbreaks of Ebola, cholera, mpox, measles and vaccine-derived polio in 2025, and in August 2026 the Ministry's Secretary General spoke of a 17th Ebola epidemic under way. The imPACT reviewers wrote in 2021 that COVID-19 had redeployed the Ministry departments responsible for prevention and early diagnosis and disrupted cancer care. Research in the east is small-scale: screening campaigns in eastern DRC have reached hundreds of women at a time, and a 2022 study screened 41 survivors of sexual violence in Bunyakiri and Kavumu, a conflict area. OnCo found no published count of cancer services in the conflict-affected eastern provinces.",
          links: [
            { label: "UNHCR: population statistics, internally displaced people in the DRC (API)", url: UNHCR_API },
            { label: "ACP: élargir la Couverture santé universelle en 2026 (6 January 2026)", url: ACP_CSU_2026 },
            { label: "imPACT Review summary report, finding 10 (PDF)", url: IMPACT_2022 },
            { label: "Kimoni et al., cervical screening among survivors of sexual violence in eastern DRC (Afr J Reprod Health 2023)", url: "https://doi.org/10.29063/ajrh2023/v27i12.9" },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: households and donors more than the state",
      aside: { label: "World Bank: out-of-pocket spending, DRC (WHO Global Health Expenditure data)", url: WB_OOP },
      cards: [
        {
          id: "health-spending",
          title: "About 23 US dollars a person a year on health, 38% of it paid out of pocket",
          plain:
            "WHO's health spending figures put the Democratic Republic of the Congo's current health spending at about 23 US dollars per person in 2023. Households paid 38% of it directly, donors and other external sources 37%, and the government 19%. For most families a cancer diagnosis means paying for tests, medicines and travel themselves.",
          detail:
            "From the WHO Global Health Expenditure Database, as published through the World Bank's indicators: current health expenditure per capita was 23.43 US dollars in 2023 (18.57 in 2015); out-of-pocket spending was 38.0% of current health expenditure in 2023, between 37.1% and 41.6% each year from 2015; external health expenditure was 37.0%; and domestic general government spending 18.7%. The 2024 values were not yet published when read. In a 2026 study of 103 people with cancer in 12 Lubumbashi hospitals, 94.1% reported clinically important financial problems, the most frequent problem measured. The Ministry's 2015 strategy listed weak government and partner funding and poor financial access to care among the problems in cervical and breast cancer control, and the imPACT reviewers recommended public and private partnerships that regulate costs with access for the underprivileged.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, DRC (WHO GHED)", url: WB_OOP },
            { label: "World Bank: external health expenditure, % of current health expenditure, DRC (WHO GHED)", url: WB_EXT },
            { label: "World Bank: current health expenditure per capita, DRC (WHO GHED)", url: WB_CHE },
            { label: "World Bank: domestic general government health expenditure, % of current health expenditure, DRC (WHO GHED)", url: WB_GHED },
            { label: "Pilz et al., quality of life in patients with cancer in Lubumbashi (BMJ Open 2026)", url: P_PILZ },
          ],
        },
        {
          id: "csu-cancer",
          title: "Universal health coverage began with childbirth; officials now describe free or subsidised cancer care",
          plain:
            "The government's universal health coverage programme began with free childbirth and newborn care in Kinshasa and is being extended. For cancer, officials of the national cancer centre have said both that people diagnosed through its free screening will be treated free and that the government covers 85% of the cost of treatment. Neither statement comes with published rules, so ask what applies before treatment starts.",
          detail:
            "A January 2026 ACP dispatch describes free childbirth and newborn care under universal health coverage as officially launched in Kinshasa and due to extend to other provinces in 2026. In October 2025 the national cancer centre's director, Dr Bienvenu Lebwaze, announced free screening points in Kinshasa and said that people diagnosed would be treated free, the state having made medicines, radiotherapy and probably surgery available to the centre. In August 2026 ACP quoted the centre's technical coordinator, Dr Benjamin Penge, saying complete cancer treatment in the DRC costs 80,000 US dollars, and that the government covers 85% and the patient pays the remaining 15%. In June 2026 ACP reported the centre receiving a first consignment of cancer medicines from a private supplier, whose director said it was the first lot of nearly ten tonnes for 2026 to 2027 in a five-year supply project and would allow nearly 100,000 patients in 14 provinces to be treated; OnCo has not seen the contract or an official list of the medicines. In February 2026 Radio Okapi reported that the Cliniques Universitaires de Kinshasa charged children with cancer half the usual fee.",
          links: [
            { label: "ACP: élargir la Couverture santé universelle en 2026 (6 January 2026)", url: ACP_CSU_2026 },
            { label: "CNLC: le CNLC encourage le dépistage volontaire et gratuit du cancer (20 October 2025)", url: CNLC_SCREENING },
            { label: "ACP: le gouvernement projette de créer un centre national d'excellence contre le cancer (2 August 2026)", url: ACP_EXCELLENCE },
            { label: "ACP: des médicaments réceptionnés à Kinshasa pour lutter contre le cancer (23 June 2026)", url: ACP_MEDICINES },
            { label: "Radio Okapi via allAfrica: plus de 100 cas de cancers pédiatriques pris en charge en 2025 (19 February 2026)", url: OKAPI_PAEDIATRIC },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: ACOREP",
      aside: { label: "ACOREP: répertoire des médicaments autorisés", url: ACOREP_AMM },
      cards: [
        {
          id: "acorep",
          title: "A regulator since 2020, with a public register of authorised medicines",
          plain:
            "The Autorité Congolaise de Réglementation Pharmaceutique (ACOREP) has regulated medicines in the Democratic Republic of the Congo since March 2020, replacing a ministry directorate. Each medicine needs a marketing authorisation valid for five years. In February 2026 ACOREP published its register, which includes about 40 cancer medicines.",
          detail:
            "ACOREP was created by Decree No. 20/002 of 5 March 2020 and took over the equipment and infrastructure of the Directorate of Pharmacy and Medicine and of the national quality control laboratory, according to NIAID's ClinRegs profile, reviewed on 16 December 2025. It regulates medicines, foods, medical devices, herbal products and cosmetics, and runs pharmacovigilance. Its register of marketing authorisations, a 355-page PDF posted on 4 February 2026, lists authorisations registered in 2021, 2022 and 2024, each valid for five years. OnCo counted about 40 entries classed as anticancer or antineoplastic, among them rituximab, bevacizumab and pertuzumab with trastuzumab (Roche), atezolizumab, erlotinib and sorafenib, and generic imatinib, dasatinib, docetaxel, paclitaxel, gemcitabine, capecitabine, lenalidomide, bortezomib, anastrozole, letrozole and abiraterone; tamoxifen did not appear under that name. A medicine on the register is authorised for sale; that does not mean it is stocked or affordable. OnCo found no WHO maturity level published for ACOREP and no published time for a registration decision.",
          links: [
            { label: "ACOREP: répertoire des médicaments autorisés (4 February 2026)", url: ACOREP_AMM },
            { label: "ACOREP (home page)", url: ACOREP },
            { label: "NIAID ClinRegs: Democratic Republic of the Congo, regulatory authority", url: CLINREGS },
          ],
        },
        {
          id: "trial-rules",
          title: "Clinical trials need ethics approval first, then a decision within 30 days",
          plain:
            "To run a clinical trial in the Democratic Republic of the Congo, investigators need a favourable opinion from an ethics committee, such as the national health ethics committee, and then authorisation from ACOREP, which decides on a complete application within 30 days. Fees run from 200 US dollars for an observational study to 5,000 for a phase I trial with a foreign sponsor.",
          detail:
            "NIAID's ClinRegs profile, reviewed on 16 December 2025, reports that the study protocol goes to an ethics committee alongside the request to ACOREP, that ACOREP cannot authorise a study the committee has rejected, that it accepts review from any approved local committee, and that it decides whether to approve a complete application within 30 days. The National Committee of Health Ethics (CNES) has 40 members, including one delegate per province from institutional committees, and accredits institutional committees across the country. Under Ministerial Order No. 1250/CAB/MIN/SPHP/CJ/2023/058 of 16 November 2023, fees for trials funded by a non-resident sponsor are 5,000 US dollars for phase I, 4,000 for phase II and 3,000 for phase III or IV; for a local sponsor 4,000 for a drug trial, 1,000 for operational research and 200 for an observational study.",
          links: [
            { label: "NIAID ClinRegs: Democratic Republic of the Congo, ethics committee, submission and fees", url: CLINREGS },
          ],
        },
      ],
    },
    {
      id: "radiotherapy",
      nav: "Radiotherapy",
      title: "Radiotherapy and the people to deliver it",
      aside: { label: "OPEC Fund: Kinshasa Cancer Center Project", url: OPEC_KCC },
      cards: [
        {
          id: "radiotherapy-centres",
          title: "One private radiotherapy centre since 2020, a first public one begun in 2023, and a cancer centre loan in 2026",
          plain:
            "In 2022 the IAEA reported that the only radiotherapy in the Democratic Republic of the Congo was a private centre in Kinshasa, opened in 2020; in its first year it treated 130 patients, against a capacity of 500 and an estimated need of more than 25,000. The foundation stone of a first public radiotherapy centre, at the University of Kinshasa, was laid in November 2023, and in June 2026 the OPEC Fund approved a loan towards a 76 million US dollar Kinshasa Cancer Center Project.",
          detail:
            "The imPACT Review found no radiotherapy in the public sector and one private centre, and recommended increasing public access to radiotherapy at Nganda, including through collaboration with the private sector, and introducing a public service in Kinshasa. The IAEA's article on the review said the private facility, established in 2020, treated 130 patients in its first year, could treat 500 a year, and that more than 25,000 patients a year require treatment. The DRC was among the first countries of the IAEA's Rays of Hope initiative, whose launch on 4 February 2022 its President co-hosted. On 16 November 2023 the IAEA Director General attended the laying of the foundation stone of the country's first public radiotherapy centre, the Centre of Multidisciplinary Diagnostic and Radiotherapy, to be hosted by the University of Kinshasa. The OPEC Fund's project page records a loan for the Kinshasa Cancer Center Project approved on 24 June 2026: 38 million US dollars from the OPEC Fund of a total cost of 76 million, co-financed by the IAEA and the government, executed by the CGEA. The project page gives no description of the facility, so OnCo cannot confirm from it that this is the radiotherapy centre whose stone was laid in 2023. Radiation safety is regulated by the National Committee for Protection against Ionizing Radiation (CNPRI), which the reviewers said lacked operational assets.",
          links: [
            { label: "IAEA: experts recommend decentralising cancer services in the DRC (22 February 2022; read through the Internet Archive)", url: IAEA_2022_WB },
            { label: "IAEA: celebrating a cancer care milestone in the DRC (17 November 2023; read through the Internet Archive)", url: IAEA_2023_WB },
            { label: "OPEC Fund: Kinshasa Cancer Center Project", url: OPEC_KCC },
            { label: "imPACT Review summary report, findings 7 and 11 and treatment recommendations (PDF)", url: IMPACT_2022 },
          ],
        },
        {
          id: "workforce",
          title: "Training capacity exists, but oncology is not yet a specialty",
          plain:
            "The country trains about 1,000 doctors a year in fifteen medical faculties, but in 2021 it had one surgical oncologist and no medical oncology specialty. International reviewers asked for oncology teaching in the main university hospitals, and for nurses trained in palliative care.",
          detail:
            "The imPACT Review counted an average of 1,000 doctors trained each year in fifteen medical faculties, with the Faculty of Medicine in Kinshasa offering training in some twenty specialties, and named a single surgical oncologist among those performing cancer surgery. It recommended introducing graduate oncology teaching, medical oncology as an independent specialty and surgical oncology as a sub-specialty in the medical faculties of the university hospitals (the report's CUK, CUL and CUKI, in Kinshasa, Lubumbashi and Kisangani); standardising paramedical training; listing priority training needs in nuclear medicine, radiotherapy and medical physics; and training general practitioners and nurses in palliative care. Partnerships have filled some gaps: from 2017 Zambian and US teams trained staff at a private Kinshasa hospital to diagnose and operate on breast cancer, give chemotherapy and perform radical hysterectomy. OnCo found no published national count of oncologists, radiation oncologists or medical physicists; see the gaps.",
          links: [
            { label: "imPACT Review summary report, finding 8 and education recommendations (PDF)", url: IMPACT_2022 },
            { label: "Hicks et al., surgical capacity for cervical cancer in the DRC (ecancer 2021)", url: "https://doi.org/10.3332/ecancer.2021.1232" },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "World Bank: protecting women and girls in the DRC against cervical cancer (19 August 2025)", url: WB_HPV },
      cards: [
        {
          id: "cervical-screening",
          title: "Fewer than 1 in 100 women of screening age report a cervical screening test",
          plain:
            "In the national household survey of 2023 to 2024, 0.69% of women aged 30 to 49 said they had been screened for cervical cancer. Screening happens mainly in campaigns, by looking at the cervix after applying vinegar and treating abnormal areas at the same visit. The World Bank says screening will be introduced in five provinces through an existing health project.",
          detail:
            "A 2026 analysis of the Demographic and Health Survey for 2023 to 2024, with a weighted sample of 11,368 women aged 30 to 49, found 0.69% screened for cervical cancer, against 52.18% for hypertension; education, wealth, health insurance and urban residence were associated with screening. The imPACT reviewers found early detection of cervical cancer carried out through sporadic campaigns and gynaecological consultations, mostly by visual inspection with acetic acid (VIA), with most hospitals lacking equipment to diagnose and treat precancer, and no national programme to monitor early detection; the country adopted the regional framework for cervical cancer elimination in July 2021. In two screen-and-treat campaigns in eastern DRC, 7.45% of 644 women had lesions biopsied; at Monkole Hospital in Kinshasa, visual inspection photographed by smartphone ruled out high-grade lesions with a negative predictive value of 99.7%. In Kinshasa 31.3% of women living with HIV had abnormal cervical cells, against about 4% of other women. The World Bank wrote in August 2025 that its health emergency project will introduce cervical screening in Tshopo, Haut-Katanga, Kwilu, Kongo Central and Kinshasa.",
          links: [
            { label: "Mekonen et al., screening in the 2023 to 2024 DRC Demographic and Health Survey (Sci Rep 2026)", url: P_DHS },
            { label: "imPACT Review summary report, findings 2 and 5 (PDF)", url: IMPACT_2022 },
            { label: "Paluku et al., single-visit screening in eastern DRC (BMC Womens Health 2019)", url: "https://doi.org/10.1186/s12905-019-0737-y" },
            { label: "World Bank: protecting women and girls in the DRC against cervical cancer (19 August 2025)", url: WB_HPV },
          ],
        },
        {
          id: "vaccines",
          title: "HPV vaccine planned for girls aged 9 to 14 from 2026; hepatitis B vaccine reaches about two thirds of infants",
          plain:
            "The Democratic Republic of the Congo has not yet reported any HPV vaccination to WHO. The national immunisation advisory group recommended the vaccine for all girls aged 9 to 14 starting in 2026. Hepatitis B, the main cause of liver cancer there, is in the infant schedule, but WHO and UNICEF estimate that only about 65% of infants receive all three doses.",
          detail:
            "WHO's immunisation data, read through its public API on 11 November 2026, hold no HPV coverage figure for the DRC for any year from 2019 to 2025. The Ministry's 2015 strategy noted that HPV vaccination had not been introduced, and the imPACT reviewers that an application to Gavi had been submitted. The World Bank wrote in August 2025 that a national strategy against cervical and breast cancer was revised for 2024 to 2029 after a national forum in November 2024, and that on the advice of the National Immunization Technical Advisory Group the DRC will offer the quadrivalent vaccine to all girls aged 9 to 14 starting in 2026, noting that a single dose protects against HPV types 6, 11, 16 and 18; the Gates Foundation funded policy dialogue on its introduction. A January 2026 ACP dispatch repeated the plan for 2026. For hepatitis B, the WHO and UNICEF estimate (WUENIC) of third-dose coverage was 65% in 2024 and 2025, while administrative data reported 98.75% and 95.24%; no birth-dose coverage is reported. The imPACT Review, citing an estimate of 95%, recommended a dose within 24 hours of birth for every newborn.",
          links: [
            { label: "WHO immunisation data: HPV and hepatitis B coverage rows for the DRC (API)", url: WHO_IMM_API },
            { label: "World Bank: protecting women and girls in the DRC against cervical cancer (19 August 2025)", url: WB_HPV },
            { label: "ACP: élargir la Couverture santé universelle en 2026 (6 January 2026)", url: ACP_CSU_2026 },
            { label: "imPACT Review summary report, finding 4 and prevention recommendations (PDF)", url: IMPACT_2022 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What the DRC does",
      title: "What the Democratic Republic of the Congo does",
      cards: [
        {
          id: "cnlc",
          title: "A national cancer centre since 2020, running free screening and distributing medicines",
          plain:
            "The Centre National de Lutte contre le Cancer (CNLC), set up in 2020, coordinates cancer control and was asked to write a national cancer control plan. It runs free screening days at Kinshasa hospitals, says it has set up a patient pathway that directs each patient to a place and an expert who follows them to the end of treatment, and in 2026 began receiving cancer medicines to send to the provinces.",
          detail:
            "The imPACT Review describes the centre as the coordinating structure acting as the national cancer control programme, created in 2020 to strengthen governance and develop a National Cancer Control Plan; the reviewers recommended supporting it in writing a plan with objectives, indicators, a timetable and costs. In October 2025 its director, Dr Bienvenu Lebwaze, announced free screening in Kinshasa at hospitals including the Centre hospitalier Nganda, the Clinique Ngaliema, the former Mama Yemo hospital, the police general hospital at Camp Lufungula, the Hôpital de l'amitié sino-congolaise and the Hôpital Biamba Marie Mutombo. In August 2026 ACP reported Dr Lebwaze saying the centre had put in place a patient pathway, and the Ministry's Secretary General saying the government plans a national centre of excellence for cancer. ACP reported in June 2026 that the centre received a first consignment of cancer medicines for basic and targeted chemotherapy, to be given by a network of its doctors in the provinces. OnCo found no published national cancer control plan; see the gaps.",
          links: [
            { label: "imPACT Review summary report, finding 2 and governance recommendations (PDF)", url: IMPACT_2022 },
            { label: "CNLC: le CNLC encourage le dépistage volontaire et gratuit du cancer (20 October 2025)", url: CNLC_SCREENING },
            { label: "ACP: le gouvernement projette de créer un centre national d'excellence contre le cancer (2 August 2026)", url: ACP_EXCELLENCE },
            { label: "ACP: des médicaments réceptionnés à Kinshasa pour lutter contre le cancer (23 June 2026)", url: ACP_MEDICINES },
          ],
        },
        {
          id: "childhood",
          title: "Children's cancer treated within a French-African network",
          plain:
            "Children with cancer in Kinshasa and Lubumbashi are treated at the two university hospitals, which take part in the French-African paediatric oncology group's shared treatment protocols for Burkitt lymphoma, retinoblastoma and Wilms tumour. The national cancer centre says about a hundred children were treated in 2025.",
          detail:
            "ClinicalTrials.gov lists the Cliniques Universitaires de Kinshasa and the Cliniques Universitaires de Lubumbashi as recruiting sites of three studies led by the French Africa Pediatric Oncology Group (GFAOP): NCT04425421 for Burkitt lymphoma, its fourth such study, also in Burkina Faso, Côte d'Ivoire, Madagascar, Mali and Senegal; NCT04425434 for retinoblastoma; and NCT04423484 for nephroblastoma. A fourth, NCT03803735, is a hospital-based registry of childhood cancer in the group's units in French-speaking Africa, with a site in the DRC. In February 2026 Radio Okapi quoted the national cancer centre's director saying about a hundred children with cancer were treated in 2025, that the Kinshasa university hospital charged them half the usual fee, and that a new reagent would let the centre cover all paediatric biopsy tests in 2026. IARC estimates 2,522 non-Hodgkin lymphomas and 2,387 leukaemias a year at all ages; OnCo found no published estimate of childhood cancers for the DRC.",
          links: [
            { label: "ClinicalTrials.gov: NCT04425421, GFAOP Burkitt lymphoma study", url: CTGOV_LMB },
            { label: "ClinicalTrials.gov: NCT04425434, GFAOP retinoblastoma study", url: "https://clinicaltrials.gov/study/NCT04425434" },
            { label: "ClinicalTrials.gov: NCT03803735, hospital-based registry of childhood cancer in French-speaking Africa", url: "https://clinicaltrials.gov/study/NCT03803735" },
            { label: "Radio Okapi via allAfrica: plus de 100 cas de cancers pédiatriques pris en charge en 2025 (19 February 2026)", url: OKAPI_PAEDIATRIC },
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
          title: "No trial in OnCo's records has a site in the Democratic Republic of the Congo",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, none of the cancer trials in our records lists a site in the Democratic Republic of the Congo. ClinicalTrials.gov itself lists nine studies with a cancer-related condition and a Congolese site, most of them paediatric protocols or HPV studies.",
          detail:
            "ClinicalTrials.gov's API, searched on 11 November 2026 for the condition cancer with a site in the DRC, returned nine studies: the four French Africa Pediatric Oncology Group studies (Burkitt lymphoma, retinoblastoma, nephroblastoma and a childhood cancer registry), a global HPV burden study (NCT06129253), two studies of treatments for HPV infection or lesions, a Helicobacter pylori genome project and a malaria treatment trial. None tests a new cancer medicine. Congolese cancer research is mostly descriptive: pathology series from Kinshasa laboratories, studies of cervical screening in Kinshasa and the east, a national survey analysis of screening, a quality of life study in Lubumbashi, and reports of training programmes. Before a trial can open, an ethics committee and then ACOREP must approve it, ACOREP within 30 days of a complete application.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in the DRC (search)", url: CTGOV },
            { label: "Bukasa-Kakamba et al., cancers in four Kinshasa pathology laboratories (World J Exp Med 2023)", url: P_LABS },
            { label: "NIAID ClinRegs: Democratic Republic of the Congo", url: CLINREGS },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "no-plan",
      title: "No national cancer control plan was found",
      plain:
        "OnCo found no published national cancer control plan for the Democratic Republic of the Congo, and could not read the revised 2024 to 2029 strategy against cervical and breast cancer that the World Bank describes. The cervical and breast strategy quoted here is the 2015 edition.",
      detail:
        "The imPACT reviewers recommended in 2021 that the national cancer centre write a plan; OnCo found none on the International Cancer Control Partnership's portal, the Ministry's site or the centre's site, whose documents and statistics pages were empty when read on 11 November 2026. The 2024 to 2029 strategy is known only from the World Bank's description. The IAEA's own pages refused a plain request and were read through the Internet Archive; the IAEA's DIRAC database of radiotherapy machines was not read, so no machine count appears here.",
      links: [
        { label: "imPACT Review summary report (PDF)", url: IMPACT_2022 },
        { label: "IAEA: experts recommend decentralising cancer services in the DRC (22 February 2022)", url: IAEA_2022 },
        { label: "World Bank: protecting women and girls in the DRC against cervical cancer (19 August 2025)", url: WB_HPV },
      ],
    },
    {
      id: "unconfirmed",
      title: "What could not be confirmed from a primary source",
      plain:
        "Several things a reader would want are not confirmed here: whether the public radiotherapy centre is built or treating, whether HPV vaccination has started, which cancer medicines are actually stocked and free under universal health coverage, and how many oncologists the country has.",
      detail:
        "The OPEC Fund page shows financing approved in June 2026 for a Kinshasa Cancer Center Project but describes neither the facility nor a construction schedule; OnCo found no official report of a public radiotherapy centre opening. HPV vaccine introduction was planned for 2026 but WHO's data hold no coverage figure and OnCo found no official launch announcement. Statements by the national cancer centre on free treatment and on 85% government coverage were read in news dispatches and on the centre's site, not in a published regulation. A Radio Okapi report of October 2025 that over 20,000 new female cancers are recorded each year could be read only in its opening lines, the rest being behind a paywall, and is not used. No survival figures for adults with cancer in the DRC were found. WHO's health spending figures for 2024 were not yet published.",
      links: [
        { label: "OPEC Fund: Kinshasa Cancer Center Project", url: OPEC_KCC },
        { label: "WHO immunisation data: HPV and hepatitis B coverage rows for the DRC (API)", url: WHO_IMM_API },
        { label: "ACP: le gouvernement projette de créer un centre national d'excellence contre le cancer (2 August 2026)", url: ACP_EXCELLENCE },
      ],
    },
    {
      id: "groups-unread",
      title: "Patient groups and hospitals read only through secondary pages",
      plain:
        "The patient groups on this page are described from their Union for International Cancer Control member pages, read through the Internet Archive because UICC refused a plain request. OnCo could not reach a website of their own, nor official sites for the Kinshasa and Lubumbashi university hospitals.",
      detail:
        "The Congo Cancer Foundation and the Ligue Africaine pour la Lutte contre le Cancer du Sein are described from UICC pages last updated in August and December 2025. Other UICC members in the Democratic Republic of the Congo were not added because their member pages could not be read. The hospitals' roles are taken from ClinicalTrials.gov, the imPACT Review, the IAEA and published papers. Coordinates of all new records are approximate city points.",
      links: [
        { label: "UICC member page: Congo Cancer Foundation (Internet Archive)", url: "https://web.archive.org/web/20251104233858/https://www.uicc.org/membership/congo-cancer-foundation" },
        { label: "ClinicalTrials.gov: cancer studies with a site in the DRC (search)", url: CTGOV },
      ],
    },
  ],
  institutions: [
    "drc-ministry-of-health", "cnlc-drc", "acorep-drc", "cliniques-universitaires-de-kinshasa", "cliniques-universitaires-de-lubumbashi",
    "monkole-hospital", "biamba-marie-mutombo-hospital", "congo-cancer-foundation", "lalucas-drc", "opec-fund-for-international-development",
    "iaea", "who", "iarc", "uicc", "gates-foundation",
  ],
  companies: [],
  drugs: ["rituximab", "bevacizumab", "pertuzumab", "trastuzumab", "atezolizumab", "imatinib"],
  trials: [],
  papers: [
    "paper-bukasa-kakamba-kinshasa-pathology-cancers-wjem-2023", "paper-kajimina-cervical-cancer-kinshasa-gofs-2022", "paper-mekonen-ncd-screening-dhs-drc-scirep-2026",
    "paper-ali-risasi-cervical-lesions-kinshasa-iac-2015", "paper-paluku-screen-and-treat-eastern-drc-bmcwh-2019", "paper-tendobi-smartphone-via-monkole-ijgc-2022",
    "paper-mathieu-breast-platform-kinshasa-ecancer-2021", "paper-youyou-chemotherapy-access-drc-ecancer-2021", "paper-pilz-quality-of-life-lubumbashi-bmjopen-2026",
  ],
  people: [],
  how:
    "Every card was written from international and Congolese sources read in full rather than through a summary: the IAEA, WHO and IARC imPACT Review summary report; the IAEA's articles on the review and on the radiotherapy centre, through the Internet Archive; the OPEC Fund's project page; the Ministry of Public Health's 2015 strategy against cervical and breast cancer (in French); ACOREP's register of authorised medicines; NIAID ClinRegs' country profile; the national cancer centre's posts and dispatches of ACP and Radio Okapi (in French), quoted as what officials said; the World Bank's feature on HPV vaccination; WHO's immunisation data and WHO health spending figures through public APIs; UNHCR's population statistics; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data and ClinicalTrials.gov's API. The new records added for this page carry their own sources.",
  verify:
    "National incidence and death figures are IARC models borrowed from neighbouring countries, not a Congolese count. Which hospitals give chemotherapy or radiotherapy, which medicines are in stock, and what is free under universal health coverage change faster than any published source; ask the treating hospital or the national cancer centre what applies to you, and in the eastern provinces check with the health zone office or humanitarian health partners which services are open.",
  verifyLinks: [
    { label: "Ministère de la Santé Publique, Hygiène et Prévoyance Sociale", url: "https://sante.gouv.cd/" },
    { label: "Centre National de Lutte contre le Cancer", url: "https://cnlc.cd/" },
    { label: "ACOREP", url: ACOREP },
    { label: "imPACT Review summary report (PDF)", url: IMPACT_2022 },
  ],
};

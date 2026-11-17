import type { CountryDive } from "@/data/country-dive";

/**
 * Equatorial Guinea deep dive: the hand-written cards for /countries/gq/ (wave 14). Every figure was read from the raw
 * text of its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Equatorial
 * Guinea, WHO's Cancer Country Profile 2020 (PDF text, from the ICCP portal's copy) and cervical cancer profile 2021,
 * the World Bank's health expenditure series from its API, WHO's immunisation data API, IAEA DIRAC's public equipment
 * data, WHO's August 2026 list of regulators at maturity level 3 and 4, the African Union's list of signatures of the
 * African Medicines Agency treaty, two news pages on the Ministry of Health and Social Welfare's site (guineasalud.org),
 * and two papers resolved through Europe PMC with their abstracts read. This page is short because little is published:
 * OnCo found no cancer registry, no cancer plan, no regulator's page and no cancer centre, and each is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/226-equatorial-guinea-fact-sheet.pdf";
const WHO_PROFILE = "https://www.iccp-portal.org/sites/default/files/plans/GNQ_2020.pdf";
const WHO_CX = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-gnq-2021-country-profile-en.pdf";
const WB_OOP = "https://api.worldbank.org/v2/country/GNQ/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_CHE = "https://api.worldbank.org/v2/country/GNQ/indicator/SH.XPD.CHEX.PC.CD?format=json";
const WB_GOV = "https://api.worldbank.org/v2/country/GNQ/indicator/SH.XPD.GHED.CH.ZS?format=json";
const WB_EXT = "https://api.worldbank.org/v2/country/GNQ/indicator/SH.XPD.EHEX.CH.ZS?format=json";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'GNQ'%20and%20contains(ANTIGEN,'HPV')";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const MOH = "https://guineasalud.org/";
const MOH_WORKSHOP = "https://guineasalud.org/clausura-del-taller-sobre-tecnicas-de-diagnostico-del-cancer-cervicouterino/";
const MOH_HPV_PILOT = "https://guineasalud.org/discurso-de-s-e-el-ministro-de-sanidad-y-bienestar-social-con-motivo-del-lanzamiento-de-la-campana-piloto-de-vacunacion-contra-el-virus-de-papiloma-humano-en-guinea-ecuatorial/";
const CCST_PAPER = "https://doi.org/10.1200/GO-24-00658";
const CASE_PAPER = "https://doi.org/10.4269/ajtmh.20-1178";
const CTGOV = "https://clinicaltrials.gov/search?country=Equatorial%20Guinea&cond=cancer";

const L_IARC = { label: "IARC: GLOBOCAN 2024 fact sheet, Equatorial Guinea (PDF)", url: IARC_FACTSHEET };
const L_WHO = { label: "WHO: Cancer Country Profile 2020, Equatorial Guinea (PDF, ICCP portal)", url: WHO_PROFILE };
const L_CX = { label: "WHO: cervical cancer country profile 2021, Equatorial Guinea (PDF)", url: WHO_CX };
const L_DIRAC = { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC };
const L_CCST = { label: "Jayakumar et al., seven years of cervical cancer screening and treatment in Equatorial Guinea (JCO Global Oncology 2025)", url: CCST_PAPER };
const L_MOH = { label: "Ministerio de Sanidad y Bienestar Social", url: MOH };

export const GQ_DIVE: CountryDive = {
  iso2: "GQ",
  iso3: "GNQ",
  name: "Equatorial Guinea",
  flag: "🇬🇶",
  asOf: "2026-11-16",
  title: "Cancer in Equatorial Guinea",
  description:
    "Cancer in Equatorial Guinea from international sources: IARC's estimate of 1,191 new cancers and 755 deaths in 2024, modelled from neighbouring countries' rates, breast and prostate cancer leading, a cervical screening and treatment project that screened 26,998 women from 2017 to 2023, the HPV vaccine not introduced in WHO's data to 2025 although the Ministry launched a pilot campaign in one health district in April 2024, no radiotherapy centre in IAEA's directory, about two thirds of health spending paid out of pocket, and no trial in OnCo's records with a site in the country.",
  lede:
    "A cervical cancer screening and treatment project began in Equatorial Guinea in 2017 and screened 26,998 women by 2023. WHO's 2021 cervical cancer profile records no population-based cancer registry, and IARC's cancer figures for the country are modelled from its neighbours' rates. The same WHO profile recorded cancer surgery, chemotherapy and radiotherapy as not generally available.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Equatorial Guinea is 1,191 new cancers and 755 deaths, an age-standardised incidence of 84.9 per 100,000 (72.9 in men, 100.6 in women). These are modelled figures, not counts. IARC's fact sheet names no country-specific source for incidence and gives its method as rates based on incidence estimates or registry data from neighbouring countries; mortality is national incidence estimates applied to modelled mortality-to-incidence ratios built on registry survival data. WHO's 2020 profile said of the earlier estimates it printed that they have a high degree of uncertainty because they are not based on a population-based cancer registry or on national mortality data.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Equatorial Guinea",
      aside: L_IARC,
      cards: [
        {
          id: "shape",
          title: "About 1,200 new cancers a year in IARC's estimate, built from neighbouring countries' rates",
          plain:
            "IARC estimates 1,191 new cancers in Equatorial Guinea in 2024, 671 of them in women, and 755 cancer deaths. Breast cancer is the commonest, then prostate, liver, colorectal and cervical cancer. The figures are modelled from neighbouring countries, not counted in Equatorial Guinea.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 207 breast cancers (100 deaths), 131 prostate cancers (83 deaths), 104 liver cancers (96 deaths), 102 colorectal cancers (53 deaths) and 99 cervical cancers (62 deaths), in a population of 1.89 million. Breast cancer causes the most cancer deaths, followed by liver and prostate cancer. The risk of developing a cancer before age 75 is 9.2%, and an estimated 2,606 people are living within five years of a diagnosis. The fact sheet's methods box gives the incidence method as rates based on incidence estimates or registry data from neighbouring countries. WHO's 2020 profile estimated 64 cancers a year in children aged 0 to 14.",
          links: [L_IARC, L_WHO],
        },
        {
          id: "registry",
          title: "No population-based cancer registry in WHO's 2021 profile",
          plain:
            "WHO's cervical cancer profile of 2021 answers the question of whether a population-based cancer registry exists in Equatorial Guinea with no. The African Cancer Registry Network's member list has no registry for the country, and OnCo found no hospital-based count either.",
          detail:
            "WHO's Cancer Country Profile 2020 recorded no information on a population-based cancer registry for 2019 and no coverage for the quality of mortality registration for 2007 to 2016, and its 2021 cervical cancer profile states that no population-based cancer registry exists. The African Cancer Registry Network's member list, read on 16 November 2026, names 35 registries and none in Equatorial Guinea. IARC's fact sheet names no country-specific source and models the country's figures from its neighbours. The one counted series OnCo found is the screening project's own, described under screening.",
          links: [
            L_CX,
            L_WHO,
            { label: "African Cancer Registry Network: member registries", url: "https://afcrn.org/index.php/membership/membership-list" },
          ],
        },
      ],
      tables: [
        {
          id: "gq-globocan-sites",
          title: "The five commonest cancers in Equatorial Guinea, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024, modelled from neighbouring countries' rates.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 207, deaths: 100 },
            { site: "Prostate", cases: 131, deaths: 83 },
            { site: "Liver", cases: 104, deaths: 96 },
            { site: "Colorectum", cases: 102, deaths: 53 },
            { site: "Cervix uteri", cases: 99, deaths: 62 },
          ],
          note: "OnCo found no registry figures from Equatorial Guinea to set beside these. They are estimates; WHO's 2020 profile described the earlier estimates for the country as having a high degree of uncertainty.",
          sources: [L_IARC, L_WHO],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care",
      cards: [
        {
          id: "oop",
          title: "About USD 234 a person on health in 2023, two thirds of it out of pocket",
          plain:
            "Equatorial Guinea spent about 234 US dollars a person on health in 2023, and households paid 66% of it out of their own pockets, according to the World Bank's series from WHO's health expenditure database. OnCo did not find a source on what public schemes cover for cancer.",
          detail:
            "The World Bank's series gives current health spending of USD 244 per person in 2021, 215 in 2022 and 234 in 2023, and out-of-pocket spending of 64.9%, 66.7% and 66.0% of current health spending in those years. Government spending from domestic sources was 32.3% of current health spending in 2023 and external funding 1.0%. WHO's 2021 cervical cancer profile recorded palliative care for people with non-communicable diseases as not generally available in primary care or in community or home-based care, and reported opioid consumption for 2017 as 0 mg of oral morphine equivalent per person.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Equatorial Guinea (API)", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Equatorial Guinea (API)", url: WB_CHE },
            { label: "World Bank: domestic general government health expenditure, Equatorial Guinea (API)", url: WB_GOV },
            { label: "World Bank: external health expenditure, Equatorial Guinea (API)", url: WB_EXT },
            L_CX,
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator",
      cards: [
        {
          id: "regulator-gap",
          title: "OnCo has not read the rules of Equatorial Guinea's medicines regulator",
          plain:
            "OnCo did not find a page from a medicines regulator in Equatorial Guinea, so it states nothing about how cancer medicines are approved or how trials are authorised. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include Equatorial Guinea.",
          detail:
            "This card stands for a source not yet read, not a description of the regulator. The Ministry of Health and Social Welfare's site lists a directorate general for supply, pharmacy, biomedical laboratories and blood banks in its news, but OnCo did not find its rules there. The African Union's list of 19 September 2023 shows Equatorial Guinea signed the treaty establishing the African Medicines Agency on 2 February 2022 and records no ratification. A future pass should read the ministry's legal documents section in Spanish.",
          links: [
            { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML3 },
            { label: "African Union: signatures and ratifications of the African Medicines Agency treaty (19 September 2023, PDF)", url: AMA },
            L_MOH,
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: L_CCST,
      cards: [
        {
          id: "cervical-project",
          title: "A screen-and-treat project for cervical cancer screened 26,998 women from 2017 to 2023",
          plain:
            "A cervical cancer screening and treatment project began in Equatorial Guinea in 2017, examining the cervix with acetic acid and treating early changes in the same visit. Between 2017 and 2023 it screened 26,998 women, in health facilities and through community outreach.",
          detail:
            "The project's report in JCO Global Oncology (2025), whose first author is at MCD Global Health, describes a single-visit approach for women aged 20 to 60: visual inspection with acetic acid, then treatment with cold coagulation or referral. The two delivery routes reached almost equal numbers of women; 2.6% of women screened were positive, and of those 55% were treated with cold coagulation, 10% were referred for further evaluation and 18% received no treatment. The authors describe it as, to their knowledge, the first such effort in the country and call for capacity to pass increasingly to the Ministry of Health. A ministry news page of December 2020 says a cervical cancer detection and control project running since 2017 had by then seen more than 23,000 women, was supported by oil companies and the ministry, and had been extended across the country.",
          links: [L_CCST, { label: "Ministerio de Sanidad y Bienestar Social: workshop on cervical cancer diagnosis closes (December 2020)", url: MOH_WORKSHOP }],
        },
        {
          id: "who-screening",
          title: "No national screening programme in WHO's 2021 profile, and an HPV vaccination pilot launched in 2024",
          plain:
            "WHO's 2021 cervical cancer profile records no national cervical screening programme and HPV vaccination not included in the national schedule. WHO's immunisation database shows the HPV vaccine as not introduced in every year to 2025, although the Ministry's site carries the minister's speech of 22 April 2024 launching a pilot HPV vaccination campaign.",
          detail:
            "The 2021 profile records that 12% of women aged 30 to 49 had been screened for cervical cancer in the previous five years and 15% ever (2019), that a programme or guidelines to strengthen early detection of first symptoms in primary care existed, with a defined referral system, and that no national guidelines on cervical cancer management existed. WHO's 2020 profile recorded no breast cancer screening programme for 2019. WHO's immunisation data API, queried on 16 November 2026, lists the HPV vaccine as not introduced for each year from 2006 to 2025, and its 44 HPV coverage rows for the country, for 2018 to 2025, hold no coverage figure or count of doses. The Ministry of Health and Social Welfare's site carries the minister's speech at the launch of what he called the first national pilot campaign of vaccination against HPV; the page is dated 22 April and the speech refers to 2024 as the present year. He asked families and girls aged 9 to 13 to accept the vaccine in the pilot health district of Baney and its surroundings, named Chevron among the partners and thanked MCD as an implementing partner. OnCo found no report of how many girls were vaccinated or of a wider rollout; the Ministry is the place to ask.",
          links: [L_CX, L_WHO, { label: "WHO immunisation data: HPV vaccine introduction, Equatorial Guinea (API)", url: WHO_HPV_INTRO }, { label: "Ministerio de Sanidad y Bienestar Social: the minister's speech launching the pilot HPV vaccination campaign (22 April 2024, in Spanish)", url: MOH_HPV_PILOT }],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in Equatorial Guinea",
      cards: [
        {
          id: "services",
          title: "WHO's 2021 profile: cancer surgery, chemotherapy and radiotherapy not generally available",
          plain:
            "WHO's 2021 cervical cancer profile records a cancer centre or department, pathology, cancer surgery, chemotherapy and radiotherapy each as not generally available in Equatorial Guinea. IAEA's directory of radiotherapy centres lists no centre in the country.",
          detail:
            "The 2021 profile answers no for each of the five services, and WHO's 2020 profile recorded 0.0 external beam radiotherapy machines per 10,000 cancer patients for 2019 and no cancer management guidelines. The 2020 profile had recorded pathology services as generally available for 2019, so the two profiles differ on pathology. IAEA DIRAC's public equipment data, read on 16 November 2026, has no row for Equatorial Guinea. These sources date from 2019 to 2021 apart from DIRAC, and OnCo found no later account of where people with cancer are treated. One published case shows what that has meant: in a 2020 report, a young man found to have diffuse large B-cell lymphoma during a malaria vaccine trial in the country was taken to India for treatment, the authors noting that an oncologist to supervise treatment was not available. It is a single case, not a description of a referral route.",
          links: [
            L_CX,
            L_WHO,
            L_DIRAC,
            { label: "Manock et al., a lymphoma diagnosed during a malaria vaccine trial in Equatorial Guinea (Am J Trop Med Hyg 2020)", url: CASE_PAPER },
          ],
        },
        {
          id: "plan",
          title: "No national cancer plan found",
          plain:
            "WHO's 2020 profile entered n/a against a national cancer control plan for Equatorial Guinea and recorded no cancer management guidelines. A search of the ICCP portal, which collects national cancer plans, returned only WHO's own profiles of the country.",
          detail:
            "The 2020 profile enters n/a for 2019 against both the integrated non-communicable disease plan and the national cancer control plan. The International Cancer Control Partnership's portal, searched for Equatorial Guinea on 16 November 2026, returned three documents: WHO's cancer country profiles of 2014 and 2020 and its cervical cancer profile of 2021. That is what the search returned on that day, not proof that no plan exists; the ministry's site has a section for plans that OnCo did not read through.",
          links: [L_WHO, { label: "ICCP portal: search for Equatorial Guinea", url: "https://www.iccp-portal.org/resources?search_api_fulltext=equatorial%20guinea" }, L_MOH],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Equatorial Guinea", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Equatorial Guinea",
          plain:
            "None of the trials in OnCo's records lists Equatorial Guinea among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Equatorial Guinea. A query of the registry's own API that day for cancer studies with a location in the country also returned none. The published cancer research OnCo found from the country is the screening project's 2025 report and a 2009 study of the types of human papillomavirus in women with cervical lesions on Bioko island, which OnCo has listed by title only and not read.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with sites in Equatorial Guinea", url: CTGOV }, L_CCST, { label: "García-Espinosa et al., HPV genotypes in women with cervical lesions in Bioko (Diagnostic Pathology 2009)", url: "https://doi.org/10.1186/1746-1596-4-31" }],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not found or not read for this page",
      plain:
        "OnCo did not find a cancer registry, a national cancer plan, a medicines regulator's page, a named cancer centre, or any source on what public schemes pay for cancer care in Equatorial Guinea, and found no account later than 2021 of where people with cancer are treated.",
      detail:
        "The address minsabs.gob.gq did not resolve; the ministry's site at guineasalud.org answered, and OnCo read its front page and two news pages but not its sections for plans, legal documents and protocols. OnCo's one fetch of MCD Global Health's site returned its home page, which carried nothing on the screening project, so nothing here comes from MCD's own pages. WHO's 2020 profile prints totals for 2018 of 7,274 cancer cases and 5,853 cancer deaths, several times IARC's 2024 estimate of 1,191 and 755; OnCo could not account for the difference, so it has not used those totals. A future pass should read the ministry's plans and legal documents in Spanish, ask WHO's country office about a cancer plan and a registry, and look for where patients are referred abroad. Until then, the treating hospital and the Ministry of Health and Social Welfare are the places to ask.",
      links: [L_MOH, L_WHO, { label: "WHO Regional Office for Africa: Equatorial Guinea", url: "https://www.afro.who.int/countries/equatorial-guinea" }],
    },
  ],
  institutions: ["equatorial-guinea-ministry-of-health", "who", "iarc", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-jayakumar-cervical-screening-equatorial-guinea-jcogo-2025"],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 cancer profile and 2021 cervical cancer profile, the World Bank's health expenditure series, WHO's immunisation data, IAEA's directory of radiotherapy centres, two news pages of the Ministry of Health and Social Welfare, and the abstracts of two papers resolved through Europe PMC.",
  verify:
    "Most of what is known about cancer services in Equatorial Guinea here comes from WHO profiles of 2020 and 2021. Check with the Ministry of Health and Social Welfare or the treating hospital before relying on it.",
  verifyLinks: [L_IARC, L_CX],
};

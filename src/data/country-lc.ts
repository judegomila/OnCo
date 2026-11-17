import type { CountryDive } from "@/data/country-dive";

/**
 * Saint Lucia deep dive: the hand-written cards for /countries/lc/ (wave 16). Every figure was read from the raw text
 * of its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Saint Lucia (PDF
 * text); WHO's Cancer Country Profile 2020 and Cervical Cancer Country Profile 2021 for Saint Lucia (PDF text); WHO's
 * vaccine introduction, HPV coverage and Global Health Expenditure Database rows from its public data APIs; IAEA
 * DIRAC's public equipment data (no row for Saint Lucia); PAHO's release on the launch of the National Cancer Registry
 * (datelined 31 July 2026) and The Voice's report of the same launch; PAHO's Health in the Americas profile of Saint
 * Lucia; the European Union Delegation's press release on the Owen King European Union Hospital; sections 2, 3, 5 and
 * 13 of the Pharmacy Act on the Attorney General's Chambers site; the ClinicalTrials.gov API for studies with a site in
 * Saint Lucia; CARPHA's Caribbean Regulatory System pages; an OECS release
 * of November 2017 and a PAHO release of 28 May 2026 on the OECS Pharmaceutical Procurement Service; The Voice's
 * report of December 2025 on universal health coverage; the GICR page of the IARC Caribbean Cancer Registry Hub; and
 * two papers resolved through Europe PMC, their open full texts read there. The Government of Saint Lucia's own sites
 * (govt.lc and its ministry subdomains) timed out or returned server errors, so no Ministry page was read; each missing
 * source is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/662-saint-lucia-fact-sheet.pdf";
const WHO_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/lca-2020.pdf";
const WHO_CX_2021 = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-lca-2021-country-profile-en.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'LCA'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'LCA'";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'LCA'";
const WHO_GOV_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'LCA'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'LCA'";
const WHO_EXT_API = "https://ghoapi.azureedge.net/api/GHED_EXTCHE_SHA2011?$filter=SpatialDim%20eq%20'LCA'";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const PAHO_REGISTRY = "https://www.paho.org/en/news/6-8-2026-saint-lucia-launches-national-cancer-registry-strengthen-cancer-prevention-and-care";
const VOICE_REGISTRY = "https://thevoiceslu.com/?p=153650";
const VOICE_UHC = "https://thevoiceslu.com/2025/12/uhc-project-committed-to-delivering-affordable-healthcare-to-the-population/";
const PAHO_HIA = "https://hia.paho.org/en/country-profiles/saint-lucia";
const EU_OKEU = "https://www.eeas.europa.eu/sites/default/files/press_release_owen_king_european_union1_0.pdf";
const PHARMACY_S13 = "https://www.attorneygeneralchambers.com/laws-of-saint-lucia/pharmacy-act/section-13";
const PHARMACY_S5 = "https://www.attorneygeneralchambers.com/laws-of-saint-lucia/pharmacy-act/section-5";
const PHARMACY_S3 = "https://attorneygeneralchambers.com/laws-of-saint-lucia/pharmacy-act/section-3";
const PHARMACY_S2 = "https://www.attorneygeneralchambers.com/laws-of-saint-lucia/pharmacy-act/section-2-01";
const CRS_ABOUT = "https://carpha.org/What-We-Do/CRS/About-Us";
const CRS_FAQ = "https://carpha.org/What-We-Do/CRS/faq";
const OECS_PPS_2017 = "https://pressroom.oecs.int/oecs-member-states-working-together-to-save-5-million-in-annual-pharmaceutical-procurement";
const PAHO_OECS_2026 = "https://www.paho.org/en/news/2-6-2026-paho-and-oecs-advance-joint-action-improve-access-essential-medicines-and-health";
const GICR_HUB = "https://gicr.iarc.fr/hub/caribbean/";
const GOVT = "https://www.govt.lc/";
const AUGUSTE_2021 = "https://doi.org/10.3390/ijerph18094770";
const AUGUSTE_2022 = "https://doi.org/10.3390/ijerph19116531";
const MASCLE_2025 = "https://doi.org/10.1002/pbc.31952";
const ADEPOJU_2026 = "https://doi.org/10.1016/s1470-2045(26)00401-8";
const CTGOV = "https://clinicaltrials.gov/search?country=Saint%20Lucia&cond=cancer";
const CTGOV_CASIDEC = "https://clinicaltrials.gov/study/NCT07695116";

export const LC_DIVE: CountryDive = {
  iso2: "LC",
  iso3: "LCA",
  name: "Saint Lucia",
  flag: "🇱🇨",
  asOf: "2026-11-16",
  title: "Cancer in Saint Lucia",
  description:
    "Cancer in Saint Lucia from WHO, PAHO and published sources: IARC's estimate of 462 new cancers and 225 deaths in 2024, modelled from death records, a National Cancer Registry launched in July 2026, prostate and breast cancer the commonest, no radiotherapy centre recorded on the island, more than half of 50 survivors interviewed having travelled abroad for care, households paying 37% of health spending out of pocket, and HPV vaccination reaching about nine in ten girls and boys.",
  lede:
    "Saint Lucia launched a National Cancer Registry in July 2026; until it reports, the country's cancer figures are a model. IARC estimates 462 new cancers and 225 deaths in 2024, with prostate cancer the commonest by a wide margin. WHO's 2021 profile records diagnosis, surgery and chemotherapy on the island and no radiotherapy, and in a study of 50 cancer survivors more than half had travelled abroad for care.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Saint Lucia is 462 new cancers and 225 deaths, an age-standardised incidence of 185.5 per 100,000 (219.6 in men, 173.7 in women) and mortality of 90.4 (126.6 in men, 67.6 in women). The fact sheet gives the country-specific incidence data source as \"No data\" and the method as \"National mortality estimates applied to model-based M:I ratios (registry survival data)\": new cases are worked out from deaths, not counted. Mortality comes from WHO national data, with the method \"Trends in national rates projected to 2024\". With about 180,000 people, the figures for single cancers are small and move a good deal from one estimate to the next. The registry launched in 2026 is meant to replace the model with counts; OnCo found none published yet.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Saint Lucia",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Saint Lucia (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 460 new cancers a year, nearly one in four of them prostate cancer",
          plain:
            "IARC estimates 462 new cancers in Saint Lucia in 2024, 235 in men and 227 in women, and 225 cancer deaths. Prostate cancer is the commonest, then breast and colorectal cancer, and the same three cause the most deaths.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 109 prostate cancers (49 deaths), 76 breast cancers (24 deaths), 51 colorectal cancers (21 deaths), 31 thyroid cancers (1 death), 23 cervical cancers (11 deaths), 22 lung cancers (19 deaths) and 19 pancreatic cancers (13 deaths). In men the leading cancers are prostate (109, 46.4%), colorectum (31) and lung (14); in women, breast (76, 33.5%), thyroid (31, 13.7%) and cervix (23, 10.1%). The risk of developing cancer before age 75 is 17.4%, and of dying of it 9.3%. An estimated 1,065 people are living within five years of a diagnosis. At the registry's launch the Chief Medical Officer said cancers had been the leading cause of death in Saint Lucia for 16 years, as The Voice reported it.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Saint Lucia (PDF)", url: IARC_FACTSHEET },
            { label: "The Voice: Saint Lucia launches National Cancer Registry", url: VOICE_REGISTRY },
          ],
        },
        {
          id: "registry",
          title: "A National Cancer Registry, launched in July 2026",
          plain:
            "The Ministry of Health, Wellness and Nutrition launched Saint Lucia's National Cancer Registry in mid-2026, with help from the Caribbean Public Health Agency, IARC and PAHO. PAHO describes it as a central system for collecting and reporting cancer data. OnCo found no figures published by it yet.",
          detail:
            "PAHO's release, datelined Castries, 31 July 2026, describes the registry as a central system for collecting, analysing and reporting cancer data. It reports the Chief Medical Officer saying that diagnoses were rising in younger age groups, and that preliminary data suggested a 33% fall in cancer incidence in 2025 which, without a population-based registry, could not be explained. Neither the release nor The Voice's report, published on 9 August 2026, gives the day of the ceremony, so July 2026 here is the date of PAHO's dateline. The Voice reports that the Caribbean Public Health Agency had carried out a full assessment of the island's cancer registration systems. Before this, WHO's 2021 cervical cancer profile recorded no population-based registry, and a 2021 paper described hospital-based registry activity only. The IARC Caribbean Cancer Registry Hub, which covers Saint Lucia, is based at the Caribbean Public Health Agency in Trinidad and Tobago.",
          links: [
            { label: "PAHO: Saint Lucia launches National Cancer Registry (July 2026)", url: PAHO_REGISTRY },
            { label: "The Voice: Saint Lucia launches National Cancer Registry", url: VOICE_REGISTRY },
            { label: "WHO: Cervical Cancer Country Profile 2021, Saint Lucia (PDF)", url: WHO_CX_2021 },
            { label: "IARC Global Initiative for Cancer Registry Development: Caribbean Hub", url: GICR_HUB },
          ],
        },
      ],
      tables: [
        {
          id: "lc-top",
          title: "IARC's leading cancers for Saint Lucia, 2024",
          caption: "New cases and deaths in 2024, both sexes, from the GLOBOCAN 2024 fact sheet. Estimates, not registry counts.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Prostate", cases: 109, deaths: 49 },
            { site: "Breast", cases: 76, deaths: 24 },
            { site: "Colorectum", cases: 51, deaths: 21 },
            { site: "Thyroid", cases: 31, deaths: 1 },
            { site: "Cervix uteri", cases: 23, deaths: 11 },
            { site: "Lung", cases: 22, deaths: 19 },
            { site: "Pancreas", cases: 19, deaths: 13 },
            { site: "Corpus uteri", cases: 18, deaths: 4 },
            { site: "All cancers", cases: 462, deaths: 225 },
          ],
          note: "IARC lists no incidence data for Saint Lucia: new cases are modelled from national mortality estimates and mortality-to-incidence ratios, so this is the table the new registry should replace.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Saint Lucia (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "PAHO: Health in the Americas, Saint Lucia country profile", url: PAHO_HIA },
      cards: [
        {
          id: "spending",
          title: "Households pay 37% of health spending out of pocket",
          plain:
            "WHO's figures put health spending in Saint Lucia at about 641 US dollars a person in 2023. Government paid about half and households paid 37% directly out of their own pockets. PAHO's country profile, in text citing sources to 2022, says fewer than one in four Saint Lucians has private health insurance.",
          detail:
            "WHO's Global Health Expenditure Database gives, for 2023, current health expenditure of US$641 per person, 50.4% of it from domestic government sources, 37.1% out of pocket and 5.0% from external sources; the out-of-pocket share was 34.9% in 2020. PAHO's country profile, whose health-system text cites sources to 2022, says health reforms aim at care that is universally accessible and affordable, and that a project financed by the World Bank is to register at least 100,000 of the island's 180,000 people in a national health scheme. In December 2025 The Voice reported a hospital medical director, speaking about the universal health coverage project, describing a three-tier financing model still being developed, with cervical and breast cancer screening and prostate testing among the services to come and colorectal screening planned for 2026. OnCo could not read the Ministry's own pages to confirm what is in force.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Saint Lucia (API)", url: WHO_OOP_API },
            { label: "WHO Global Health Expenditure Database: government share (API)", url: WHO_GOV_API },
            { label: "WHO Global Health Expenditure Database: external share (API)", url: WHO_EXT_API },
            { label: "WHO Global Health Expenditure Database: health spending per person in US dollars (API)", url: WHO_CHE_API },
            { label: "PAHO: Health in the Americas, Saint Lucia country profile", url: PAHO_HIA },
            { label: "The Voice: UHC project committed to delivering affordable healthcare (December 2025)", url: VOICE_UHC },
          ],
        },
        {
          id: "who-pays",
          title: "In one study, family and friends were the commonest source of money for cancer care",
          plain:
            "Forty cancer survivors in Saint Lucia told researchers in 2019 and 2020 how they had paid for care. Six in ten had help from family or friends. Fewer than four in ten used medical insurance, and 15% had help from the government.",
          detail:
            "The study, run with the patient group Faces of Cancer Saint Lucia, interviewed 50 survivors, of whom 40 answered on funding and could name several sources. The paper describes universal health coverage as not yet established, with a national social security system that contributes partly to health costs, and says financial support from local health authorities for treatment abroad was limited. The survivors were recruited through the patient group and personal contacts, more than half were women with breast cancer, and the authors warn that a convenience sample is hard to generalise from and probably over-represents people who survived. It is the only source OnCo found on what patients themselves pay.",
          links: [{ label: "Auguste et al., access to cancer care among survivors in Saint Lucia (Int J Environ Res Public Health 2021)", url: AUGUSTE_2021 }],
        },
      ],
      tables: [
        {
          id: "lc-funding",
          title: "How 40 cancer survivors in Saint Lucia paid for care, 2019 to 2020",
          caption: "Percentage of the 40 survivors who named each source; a survivor could name more than one.",
          columns: [
            { key: "source", label: "Source of money" },
            { key: "share", label: "Survivors naming it (%)", numeric: true },
          ],
          rows: [
            { source: "Family or friends", share: 60 },
            { source: "Personal funds or savings", share: 38 },
            { source: "Medical insurance", share: 38 },
            { source: "Loan or credit", share: 30 },
            { source: "Fundraisers", share: 30 },
            { source: "Assistance from the government", share: 15 },
            { source: "Help from employers", share: 10 },
            { source: "Donations from non-governmental organisations", share: 8 },
            { source: "Church community", share: 3 },
          ],
          note: "A convenience sample of survivors, not a survey of all patients: the authors report a likely survival bias, with more early-stage cancers than expected.",
          sources: [{ label: "Auguste et al., access to cancer care among survivors in Saint Lucia (Int J Environ Res Public Health 2021)", url: AUGUSTE_2021 }],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are supplied",
      aside: { label: "CARPHA: Caribbean Regulatory System, guidance for applicants", url: CRS_FAQ },
      cards: [
        {
          id: "no-national-authorisation",
          title: "CARPHA does not list Saint Lucia among the Caribbean countries that conduct marketing authorisation",
          plain:
            "OnCo found no body in Saint Lucia that assesses and registers individual medicines. The Caribbean Community's shared review service lists six countries that conduct marketing authorisation, and Saint Lucia is not one of them. That is not the same as having no regulator: the Pharmacy Act sets up a Pharmacy Council, which registers pharmacists and pharmacies and advises the Minister on the import of drugs.",
          detail:
            "CARPHA's guidance says only six Caribbean Community countries conduct marketing authorisation: Belize, Guyana, Haiti, Jamaica, Suriname and Trinidad and Tobago. Its Caribbean Regulatory System, created by health ministers in 2016, reviews medicines already approved by a reference regulator and recommends them to member states, and says it offers a streamlined review for countries without a formal process of their own. Section 5 of Saint Lucia's Pharmacy Act establishes the Pharmacy Council, and section 13 gives it the registration of pharmacists, pharmacies and authorised sellers of poisons, and the task of advising the Minister on the control of the pharmaceutical industry, including the importation of drugs. CARPHA's guidance is undated, and OnCo did not read a Ministry page on how imports are approved. See the gaps.",
          links: [
            { label: "CARPHA: Caribbean Regulatory System, guidance and questions for applicants", url: CRS_FAQ },
            { label: "CARPHA: about the Caribbean Regulatory System", url: CRS_ABOUT },
            { label: "Attorney General's Chambers: Pharmacy Act, section 13 (functions of the Pharmacy Council)", url: PHARMACY_S13 },
            { label: "Attorney General's Chambers: Pharmacy Act, section 5 (establishment of the Pharmacy Council)", url: PHARMACY_S5 },
          ],
        },
        {
          id: "pooled-procurement",
          title: "Public medicines are bought jointly with other Eastern Caribbean states",
          plain:
            "The Organisation of Eastern Caribbean States runs a Pharmaceutical Procurement Service that buys medicines in bulk for its member states. Saint Lucia's Pharmacy Act names that service and keeps its work outside the Pharmacy Council's responsibility.",
          detail:
            "An OECS release of November 2017 says the service bought about 25 million dollars' worth of medical products in 2016 to 2017 and saved member states 5 million dollars in total; it does not state the currency, speaks of member states as a group and gives no figure for Saint Lucia, which it lists as a member. Section 2 of the Pharmacy Act defines the Pharmaceutical Procurement Service as the OECS Eastern Caribbean Drug Service, set up by an agreement of 2 June 1989, and section 3 says the Act is not to be read as giving the Pharmacy Council responsibility over any activity for which the Pharmaceutical Procurement Service is responsible. PAHO reports a joint planning workshop with the service in Castries on 28 May 2026, at which a senior pharmacist of Saint Lucia's Ministry spoke of barriers to access including affordability and the supply chain. None of these sources lists which cancer medicines the service buys.",
          links: [
            { label: "OECS: member states working together to save $5 million in annual pharmaceutical procurement (November 2017)", url: OECS_PPS_2017 },
            { label: "Attorney General's Chambers: Pharmacy Act, section 2 (interpretation)", url: PHARMACY_S2 },
            { label: "Attorney General's Chambers: Pharmacy Act, section 3", url: PHARMACY_S3 },
            { label: "PAHO: PAHO and OECS advance joint action on access to essential medicines (28 May 2026)", url: PAHO_OECS_2026 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: Cervical Cancer Country Profile 2021, Saint Lucia (PDF)", url: WHO_CX_2021 },
      cards: [
        {
          id: "hpv-vaccine",
          title: "HPV vaccination since 2019, for girls and boys, with coverage near 90%",
          plain:
            "Saint Lucia added the HPV vaccine to its national programme in 2019 and gives it to boys as well as girls. WHO's figures for 2025 show 89% of girls and 93% of boys in the target group vaccinated.",
          detail:
            "WHO's vaccine introduction rows record nationwide HPV vaccination from 2019. Its programme coverage rows give, for girls' first dose, 79% in 2019, 52% in 2020, 76% in 2021, 70% in 2022, 82% in 2023, 91% in 2024 and 89% in 2025 (785 of a target of 886), and for boys 72% in 2019, 49% in 2020, 68% in 2021, 61% in 2022, 89% in 2023, 87% in 2024 and 93% in 2025 (831 of 889). The target groups are under 1,300 children a year, so a few dozen children move the percentage. WHO's 2021 profile gives the primary target group as ages 11 to 12.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Saint Lucia (API)", url: WHO_HPV_API },
            { label: "WHO: vaccine introduction rows for Saint Lucia (API)", url: WHO_INTRO_API },
            { label: "WHO: Cervical Cancer Country Profile 2021, Saint Lucia (PDF)", url: WHO_CX_2021 },
          ],
        },
        {
          id: "cervical-screening",
          title: "Cervical screening by smear; WHO's two profiles describe it differently",
          plain:
            "WHO's 2021 profile records a national cervical screening programme in Saint Lucia using smear tests, and estimates that most women aged 30 to 49 have been screened. Its 2020 cancer profile recorded no screening programme for cervical or breast cancer. OnCo could not read the Ministry's own description.",
          detail:
            "The 2021 cervical cancer profile gives a national programme using cytology for women aged 15 to 49, and estimates for 2019 that 79% of women aged 30 to 49 had been screened in the previous five years and 92% at some time; these are WHO estimates, not programme counts. The 2020 cancer profile answers \"no\" for cervical cancer screening and for a breast screening programme in 2019, and records early detection guidelines for none of the four cancers it asks about. A newspaper report of December 2025 lists cervical and breast cancer screening and prostate testing among services to be added under the universal health coverage project. The nearest health centre or the Ministry of Health, Wellness and Nutrition can say what is offered now.",
          links: [
            { label: "WHO: Cervical Cancer Country Profile 2021, Saint Lucia (PDF)", url: WHO_CX_2021 },
            { label: "WHO: Cancer Country Profile 2020, Saint Lucia (PDF)", url: WHO_2020 },
            { label: "The Voice: UHC project committed to delivering affordable healthcare (December 2025)", url: VOICE_UHC },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in Saint Lucia",
      cards: [
        {
          id: "radiotherapy-abroad",
          title: "No radiotherapy centre recorded on the island: more than half of the survivors studied had travelled abroad",
          plain:
            "WHO's 2021 profile records diagnosis, cancer surgery and chemotherapy in Saint Lucia, but no radiotherapy. In interviews with 50 cancer survivors, 56% had left the island for care, most often for the United States, Martinique or Guyana. IAEA's directory of radiotherapy centres lists no centre in Saint Lucia.",
          detail:
            "WHO's 2021 profile records chemotherapy, cancer surgery and pathology as generally available, radiotherapy as not, no cancer centre at tertiary level, and no radiation oncologists or medical physicists. IAEA DIRAC's public equipment data, read on 16 November 2026, has no entry for Saint Lucia. In the survivors' study the destinations named were the United States (29%), Martinique (13%) and Guyana (13%); survivors reported radiotherapy and brachytherapy as unavailable at home, pathology reports took about three times longer on the island than abroad, and of 159 tests, 46 were done abroad, most often in Martinique. A second paper from the same interviews records the strain of being treated away from family. A 2025 paper describes cooperation between Martinique, Saint Lucia and Dominica in treating childhood leukaemia; it has no indexed abstract and was not read.",
          links: [
            { label: "Auguste et al., access to cancer care among survivors in Saint Lucia (Int J Environ Res Public Health 2021)", url: AUGUSTE_2021 },
            { label: "Auguste et al., cancer survivors in Saint Lucia and social support (Int J Environ Res Public Health 2022)", url: AUGUSTE_2022 },
            { label: "WHO: Cervical Cancer Country Profile 2021, Saint Lucia (PDF)", url: WHO_CX_2021 },
            { label: "IAEA DIRAC: radiotherapy equipment by country (read 16 November 2026)", url: DIRAC },
            { label: "Mascle et al., childhood leukaemia care across Martinique, Saint Lucia and Dominica (Pediatr Blood Cancer 2025)", url: MASCLE_2025 },
          ],
        },
        {
          id: "hospital",
          title: "A new hospital in Castries since 2020, built with European Union funds",
          plain:
            "The Owen King European Union Hospital in Castries took over all in-patient services from the old Victoria Hospital on 27 March 2020. It has 120 beds, operating theatres, a laboratory and an MRI scanner. OnCo found no primary source describing its cancer service, only an author's address naming a Department of Oncology there.",
          detail:
            "The European Union Delegation's press release says the EU provided 36 million euros towards building the hospital and a further 8 million for equipment and furniture, that out-patient services began moving in 2018, and that the Victoria Hospital was kept as a respiratory facility during the COVID-19 pandemic. The release is headed 7 April 2019, which looks like a misprint for 2020, since it describes events of March 2020. PAHO's country profile confirms the hospital is operating. One author of the 2021 survivors' paper gives the hospital's Department of Oncology as an address, and PAHO's release on the registry names an oncologist who spoke at the launch. The survivors' study, carried out in 2019 and 2020, recruited through the Victoria Hospital and an oncology centre it does not name, and says the island has five hospitals with the best equipped in the capital. Where chemotherapy is now given, and by how many oncologists, is not stated in anything OnCo could read; the hospital or the treating doctor can say.",
          links: [
            { label: "European Union Delegation: Owen King European Union Hospital fully operational (press release, PDF)", url: EU_OKEU },
            { label: "PAHO: Health in the Americas, Saint Lucia country profile", url: PAHO_HIA },
            { label: "Auguste et al., access to cancer care among survivors in Saint Lucia (Int J Environ Res Public Health 2021)", url: AUGUSTE_2021 },
            { label: "PAHO: Saint Lucia launches National Cancer Registry (July 2026)", url: PAHO_REGISTRY },
          ],
        },
        {
          id: "patient-group",
          title: "A patient group that helped carry out the research",
          plain:
            "Faces of Cancer Saint Lucia, founded in 2009, supports people through cancer treatment and was a partner in what the authors describe as the first studies of patients' experience on the island. The 2022 paper says it had more than 215 members and that its services are free.",
          detail:
            "The paper lists the group's services as education, health fairs, emotional and spiritual support, and support during chemotherapy and after surgery, and says it was moving towards patient navigation. In the interviews, survivors named four things that mattered to them: support groups, support from family and friends, access to money, and health education with someone to guide them through the system. OnCo did not find a website for the group or for a Saint Lucia cancer society, so the description comes from the papers alone and dates from 2022.",
          links: [
            { label: "Auguste et al., cancer survivors in Saint Lucia and social support (Int J Environ Res Public Health 2022)", url: AUGUSTE_2022 },
            { label: "Auguste et al., access to cancer care among survivors in Saint Lucia (Int J Environ Res Public Health 2021)", url: AUGUSTE_2021 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with a site in Saint Lucia", url: CTGOV },
      cards: [
        {
          id: "trials-and-papers",
          title: "No trial in OnCo's records has a site in Saint Lucia",
          plain:
            "None of the cancer trials in OnCo's records lists Saint Lucia among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search: it lists one cancer study with a site in Castries, a study of survivors' experience and not a trial of a treatment. The published research OnCo read is two papers from one set of interviews with cancer survivors.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Saint Lucia. The registry's own data, read on the same day, list three studies with a site in Saint Lucia, one of them about cancer: an observational study of care overseas and cancer survivorship in six Eastern Caribbean islands, sponsored by the Vaughan A. Lewis Institute for Research and Innovation, with a site in Castries, recruiting by invitation and aiming for an estimated 900 participants. It tests no treatment. A Europe PMC search for titles naming Saint Lucia (or St. Lucia) together with cancer or leukaemia returned four results: the two survivor papers, the 2025 paper on childhood leukaemia and a 2026 news item in The Lancet Oncology on the registry's launch. The last two have no indexed abstract and are cited here by title only. The survivors' first paper reports that about half of them started treatment more than a month after diagnosis (median 32 days).",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Saint Lucia", url: CTGOV },
            { label: "ClinicalTrials.gov: NCT07695116, overseas care and cancer survivorship in the Eastern Caribbean", url: CTGOV_CASIDEC },
            { label: "Auguste et al., access to cancer care among survivors in Saint Lucia (Int J Environ Res Public Health 2021)", url: AUGUSTE_2021 },
            { label: "Adepoju, Saint Lucia launches national cancer registry (Lancet Oncol 2026)", url: ADEPOJU_2026 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-government-sources",
      title: "The Government of Saint Lucia's own pages could not be read",
      plain:
        "Every request to the Government's website and its ministry sites on 16 November 2026 timed out or returned a server error. Nothing here comes from a Ministry page, including its cancer statistics, its account of universal health coverage and its description of the registry.",
      detail:
        "A web search pointed to Ministry releases on the registry, on World Cancer Day and on screening under universal health coverage, with figures OnCo has left out because it could not read them. What the Ministry has said is given only as PAHO and The Voice reported it. WHO's 2020 profile recorded an operational plan for noncommunicable diseases and gave no entry for a national cancer control plan; The ICCP portal's page for Saint Lucia returned a not-found error, so OnCo could not check it for a cancer plan. A future pass should read the Ministry's pages directly.",
      links: [
        { label: "Government of Saint Lucia", url: GOVT },
        { label: "PAHO: Saint Lucia launches National Cancer Registry (July 2026)", url: PAHO_REGISTRY },
        { label: "WHO: Cancer Country Profile 2020, Saint Lucia (PDF)", url: WHO_2020 },
      ],
    },
    {
      id: "gap-abroad",
      title: "No official account of where patients are sent for radiotherapy or who pays",
      plain:
        "The only figures on travel for cancer care come from 50 survivors interviewed in 2019 and 2020. OnCo found no official description of a referral arrangement with Martinique, Barbados, Trinidad or anywhere else, or of what the state contributes.",
      detail:
        "The survivors' paper says financial support from local health authorities was limited and that 15% of those who answered had government help. The December 2025 newspaper report says the planned financing model's tiers extend beyond Saint Lucia's shores, without detail. No count of patients sent abroad, and no survival figure for any cancer, was found. The treating doctor, the Ministry of Health, Wellness and Nutrition and the patient group Faces of Cancer Saint Lucia are the people to ask before travelling.",
      links: [
        { label: "Auguste et al., access to cancer care among survivors in Saint Lucia (Int J Environ Res Public Health 2021)", url: AUGUSTE_2021 },
        { label: "The Voice: UHC project committed to delivering affordable healthcare (December 2025)", url: VOICE_UHC },
      ],
    },
    {
      id: "gap-medicines",
      title: "How a cancer medicine is approved for import, and which are stocked, was not found",
      plain:
        "OnCo read four sections of the Pharmacy Act and CARPHA's guidance, but found no Saint Lucian page on how a medicine is cleared for import and no list of the cancer medicines the public system holds.",
      detail:
        "The copy of the Pharmacy Act read is the Attorney General's Chambers' edition of the revised laws; only sections 2, 3, 5 and 13 were read, and the regulations made under the Act were not. That Saint Lucia does not conduct marketing authorisation itself rests on CARPHA's undated guidance not listing it, not on a Saint Lucian source. WHO's 2020 and 2021 profiles both record opioid consumption for pain relief as zero, in data for 2015 to 2017. The hospital pharmacy can say whether a given medicine is available.",
      links: [
        { label: "Attorney General's Chambers: Pharmacy Act, section 13", url: PHARMACY_S13 },
        { label: "CARPHA: Caribbean Regulatory System, guidance and questions for applicants", url: CRS_FAQ },
      ],
    },
  ],
  institutions: ["moh-saint-lucia", "okeu-hospital-saint-lucia", "saint-lucia-national-cancer-registry", "faces-of-cancer-saint-lucia", "iarc", "who"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-auguste-access-cancer-care-saint-lucia-ijerph-2021", "paper-auguste-survivors-social-support-saint-lucia-ijerph-2022"],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 and 2021 country profiles and its immunisation and health expenditure data, IAEA DIRAC's public equipment data, PAHO's releases and country profile, a European Union press release, four sections of the Pharmacy Act, CARPHA's pages on the Caribbean Regulatory System, an OECS release, two reports in The Voice, ClinicalTrials.gov's study data, and two papers resolved through Europe PMC. The Government of Saint Lucia's own sites could not be reached.",
  verify:
    "National cancer figures for Saint Lucia are modelled, not counted, and what patients experience is known here from one small study carried out in 2019 and 2020. Services, costs and referral arrangements change; ask the treating doctor or the Ministry of Health, Wellness and Nutrition what applies to you.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Saint Lucia (PDF)", url: IARC_FACTSHEET },
    { label: "PAHO: Saint Lucia launches National Cancer Registry (July 2026)", url: PAHO_REGISTRY },
    { label: "Government of Saint Lucia", url: GOVT },
    { label: "Auguste et al., access to cancer care among survivors in Saint Lucia (Int J Environ Res Public Health 2021)", url: AUGUSTE_2021 },
  ],
};

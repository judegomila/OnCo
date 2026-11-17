import type { CountryDive } from "@/data/country-dive";

/**
 * Cabo Verde deep dive: the hand-written cards for /countries/cv/ (wave 14). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Cape Verde, the
 * Ministry of Health's own pages (cancer control, February 2023; breast cancer early diagnosis, October 2023; the
 * procedure for evacuation abroad), WHO's Cancer Country Profile 2020 and cervical cancer profile 2021, Portaria
 * 50/2021 on the Conselho Nacional de Medicamento (Boletim Oficial, PDF text from WHO's health legislation database),
 * the African Cancer Registry Network's page for the national registry, WHO's immunisation data API, IAEA DIRAC's
 * public data, the World Bank's health expenditure series, the African Union's treaty list, WHO's August 2026 list of
 * regulators at maturity level 3 and 4, ClinicalTrials.gov's API, and four papers resolved through Europe PMC. The
 * regulator's site (eris.cv) refused the first request and answered on the second pass the same day; what was and was
 * not read from it is set out under `gaps`. Two World Bank indicator pages answered 504 on the second pass, so those
 * links point at the World Bank API, where the figures were read.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/132-cape-verde-fact-sheet.pdf";
const WHO_PROFILE = "https://www.iccp-portal.org/sites/default/files/plans/CPV_2020.pdf";
const WHO_CERVICAL = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-cpv-2021-country-profile-en.pdf";
const MOH_FEB_2023 = "https://minsaude.gov.cv/noticias/investimentos-do-governo-no-programa-de-luta-contra-o-cancro/";
const MOH_OCT_2023 = "https://minsaude.gov.cv/noticias/cabo-verde-quer-reduzir-em-10-os-casos-de-cancro-de-mama-diagnosticados-em-estadio-avancando/";
const MOH_EVAC = "https://minsaude.gov.cv/processo-de-evacuacao-para-o-exterior/";
const AFCRN_CV = "https://afcrn.org/index.php/membership/membership-list/177-cape-verde";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=Cabo%20Verde";
const ICCP_MANUAL = "https://www.iccp-portal.org/sites/default/files/plans/CPV_B5_Manual%20de%20Preven%C3%A7%C3%A3o%20e%20Controlo%20de%20Doen%C3%A7as%20Oncol%C3%B3gicas%202015.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20%27CPV%27%20and%20contains%28ANTIGEN%2C%27HPV%27%29";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20%27CPV%27%20and%20contains%28ANTIGEN%2C%27HPV%27%29";
const WB_OOP = "https://api.worldbank.org/v2/country/CPV/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_CHE = "https://api.worldbank.org/v2/country/CPV/indicator/SH.XPD.CHEX.PC.CD?format=json";
const WB_EXT = "https://api.worldbank.org/v2/country/CPV/indicator/SH.XPD.EHEX.CH.ZS?format=json";
const WB_GOV = "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=CV";
const PORTARIA_CNM = "https://extranet.who.int/cpcd/sites/default/files/public_file_repository/CPV_Cabo-Verde_Portaria-No-50-2021_2021.pdf";
const ERIS = "https://www.eris.cv/";
const ERIS_AIM = "https://www.eris.cv/index.php/setor-farmaceutico/autorizacao-de-introducao-no-mercado-aim";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const CTGOV = "https://clinicaltrials.gov/search?country=Cape%20Verde&cond=cancer";
const SILVA_2019 = "https://doi.org/10.3332/ecancer.2019.995";
const BORGES_2025 = "https://doi.org/10.3332/ecancer.2025.1826";
const BORGES_2026 = "https://doi.org/10.1200/go-25-00258";
const VILARES_2022 = "https://doi.org/10.3332/ecancer.2022.1471";

export const CV_DIVE: CountryDive = {
  iso2: "CV",
  iso3: "CPV",
  name: "Cabo Verde",
  flag: "🇨🇻",
  asOf: "2026-11-16",
  title: "Cancer in Cabo Verde",
  description:
    "Cancer in Cabo Verde, also called Cape Verde: IARC's estimate of 448 new cancers and 318 deaths in 2024, built on national registry rates, with prostate and breast cancer leading, an oncology service for chemotherapy at the central hospital in Praia reported by the ministry in 2023, no radiotherapy centre in IAEA's directory and patients evacuated to Portugal under a cooperation agreement, HPV vaccination since 2021 reaching 99% of the girls and boys targeted in 2024 and 2025, health spending of about USD 290 a person in 2023 with 26% paid out of pocket, and no trial in OnCo's records with a site in Cabo Verde.",
  lede:
    "In 2023 Cabo Verde's Ministry of Health reported an oncology service for chemotherapy at the central hospital in Praia. WHO's figures put first-dose HPV vaccination at 99% of the girls and boys targeted in 2024 and 2025. IAEA's directory lists no radiotherapy centre in the country, and patients who cannot be treated at home are evacuated to Portugal under a cooperation agreement. By IARC's estimate for 2024, prostate cancer and breast cancer are the commonest cancers.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Cabo Verde is 448 new cancers and 318 deaths, an age-standardised incidence of 85.5 per 100,000 (105.3 in men, 77.3 in women) and an age-standardised mortality of 61.4. The fact sheet gives its incidence source as a national registry and its method as \"national rates applied to 2024 population\" (IARC's method 2a), with mortality from national incidence estimates applied to model-based mortality-to-incidence ratios. The provisional figure in the Ministry of Health's report for 2022 was \"almost 500\" cancers nationally, close to IARC's figure. The sources on the registry differ by date: a 2019 paper from the Praia hospital said there were then no national data, WHO's 2021 profile recorded no population-based registry, and the ministry reported a cancer registry in 2023.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Cabo Verde",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Cape Verde (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 450 new cancers a year; prostate cancer is the commonest",
          plain:
            "IARC estimates 448 new cancers in Cabo Verde in 2024, 231 in men and 217 in women, and 318 cancer deaths. Prostate cancer is the commonest, with 96 cases, then breast cancer with 77 and cervical cancer with 44. Prostate cancer is also the commonest cause of cancer death.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 96 prostate cancers (58 deaths), 77 breast cancers (51 deaths), 44 cervical cancers (29 deaths), 35 colorectal cancers (23 deaths), 30 stomach cancers (25 deaths) and 19 cancers of the oesophagus (19 deaths). Prostate cancer is 41.6% of the cancers estimated in men; breast cancer is 35.5% of those in women and cervical cancer 20.3%. The risk of developing a cancer before age 75 is 9.8%, and an estimated 951 people are living within five years of a diagnosis. The Ministry of Health said in February 2023 that cancers were the third cause of death in the country, with a death rate from tumours of 60 per 100,000 people in recent years. WHO's 2020 profile estimated 21 cancers a year in children aged 0 to 14.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Cape Verde (PDF)", url: IARC_FACTSHEET },
            { label: "Ministério da Saúde: government investment in cancer control (February 2023)", url: MOH_FEB_2023 },
            { label: "WHO: Cancer Country Profile 2020, Cabo Verde (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "registry",
          title: "A national cancer registry with provisional counts for 2022 and no published report found",
          plain:
            "The Ministry of Health reported in 2023 that it had set up a cancer registry. The ministry's report for 2022 gave provisional data of almost 500 cancers nationally, and the registry's provisional count of breast cancers that year was 69. OnCo found no published report from the registry.",
          detail:
            "Both figures come from the ministry's news page of October 2023: the national health director said the ministry's 2022 report, with provisional data, recorded almost 500 cancer cases, with breast and prostate cancer the most frequent, and the page gives 69 breast cancers for 2022 from the Registo Oncológico. The African Cancer Registry Network lists the Cape Verde National Cancer Registry as a member, and its page, read on 16 November 2026, says only that details are coming. Before the national registry, a hospital registry at Hospital Agostinho Neto described the cancers seen on Santiago island in 2017 and 2018: prostate, breast, stomach, cervix and oesophagus, in that order. Its authors wrote that there were no national data and called for a population-based registry. WHO's 2020 profile recorded \"registration activity\" for 2019.",
          links: [
            { label: "Ministério da Saúde: breast cancer early diagnosis programme (October 2023)", url: MOH_OCT_2023 },
            { label: "Ministério da Saúde: government investment in cancer control (February 2023)", url: MOH_FEB_2023 },
            { label: "African Cancer Registry Network: Cape Verde National Cancer Registry", url: AFCRN_CV },
            { label: "Silva et al., cancer on Santiago island 2017 to 2018 (ecancermedicalscience 2019)", url: SILVA_2019 },
          ],
        },
      ],
      tables: [
        {
          id: "cv-registry",
          title: "What the ministry and its registry have reported for 2022",
          caption: "Provisional counts for 2022 given by the Ministry of Health in October 2023.",
          columns: [
            { key: "measure", label: "Count" },
            { key: "value", label: "Cases in 2022 (provisional)" },
          ],
          rows: [
            { measure: "All cancers, nationally (the ministry's 2022 report)", value: "almost 500" },
            { measure: "Breast cancer (Registo Oncológico)", value: "69" },
          ],
          note: "The ministry gave the all-cancers figure in words, not as a number, and called both provisional. OnCo found no final figures and no counts for other cancers.",
          sources: [{ label: "Ministério da Saúde: breast cancer early diagnosis programme (October 2023)", url: MOH_OCT_2023 }],
        },
        {
          id: "cv-globocan-sites",
          title: "The five commonest cancers in Cabo Verde, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024, from national registry rates applied to the 2024 population.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Prostate", cases: 96, deaths: 58 },
            { site: "Breast", cases: 77, deaths: 51 },
            { site: "Cervix uteri", cases: 44, deaths: 29 },
            { site: "Colorectum", cases: 35, deaths: 23 },
            { site: "Stomach", cases: 30, deaths: 25 },
          ],
          note: "IARC's estimates for 2024, not the registry's own counts. Deaths are modelled from incidence. The all-cancers total is 448 new cases and 318 deaths.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Cape Verde (PDF)", url: IARC_FACTSHEET }],
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
          title: "About USD 290 a person on health, a quarter of it out of pocket",
          plain:
            "Cabo Verde spent about 290 US dollars a person on health in 2023, and households paid 26% of it out of their own pockets, according to WHO's health expenditure figures published by the World Bank. Government paid 59%.",
          detail:
            "The World Bank's series, from WHO's Global Health Expenditure Database, gives current health spending of USD 262.42 per person in 2021, 297.08 in 2022 and 290.13 in 2023, and out-of-pocket spending of 23.0%, 22.1% and 25.7% of current health spending in those years. Domestic government spending was 58.6% of current health spending in 2023 and external funding 11.0%. OnCo did not read a source setting out what the social security institute (INPS) or the state pays for chemotherapy given in Cabo Verde, so it states nothing on that.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Cabo Verde (API)", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Cabo Verde (API)", url: WB_CHE },
            { label: "World Bank: external health expenditure, % of current health expenditure, Cabo Verde (API)", url: WB_EXT },
            { label: "World Bank: domestic government health expenditure, % of current health expenditure, Cabo Verde", url: WB_GOV },
          ],
        },
        {
          id: "evacuation",
          title: "Treatment abroad: evacuation to Portugal, assessed by a medical board and arranged by INPS or the state",
          plain:
            "A patient who cannot be treated in Cabo Verde can be evacuated to Portugal. The Ministry of Health's procedure, as its page set it out on 16 November 2026, runs through a medical board, the minister's approval and a Portuguese booking system, and the journey is arranged by the social security institute (INPS) or by a government office for people it does not cover.",
          detail:
            "The ministry's page sets out the steps: the patient's file goes to the Junta de Saúde with test results, an identity document and either an INPS credential or proof of poverty or of registration in the social register; if the board advises evacuation, the minister approves within 24 hours and the file is entered in Portugal's SAGMED platform within another 24; Portuguese hospitals then set an appointment, after a wait that depends on their lists. INPS, or the evacuation office of the ministry for family and social inclusion, then arranges the visa, tickets and allowances. The page warns patients not to travel to Portugal on their own before the appointment is set, because that can end the evacuation process and the allowances that go with it. The steps OnCo read give no amounts and no typical waiting time. A study of 58 women evacuated with cervical cancer and treated in Lisbon from 2013 to 2020 found about six months between diagnosis and treatment.",
          links: [
            { label: "Ministério da Saúde: procedure for evacuation abroad", url: MOH_EVAC },
            { label: "Vilares et al., cervical cancer in women evacuated from Cape Verde (ecancermedicalscience 2022)", url: VILARES_2022 },
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
          id: "eris",
          title: "ERIS regulates medicines and grants marketing authorisation",
          plain:
            "Medicines in Cabo Verde are regulated by the Entidade Reguladora Independente da Saúde (ERIS). Its site says that no medicine, made in the country or imported, may be marketed without its prior authorisation. A 2021 order has a national medicines council give opinions on the marketing authorisation files that ERIS sends it.",
          detail:
            "Portaria 50/2021, published in November 2021, approves the rules of the Conselho Nacional de Medicamento, a permanent advisory body to the health minister on which the president of ERIS sits. Its tasks include assessing and giving opinions on applications for marketing authorisation, changes and withdrawals sent by ERIS, validating the national and hospital formularies, and, through the council or its technical committee, giving a view on clinical trials and the ethics of using medicines in them. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include Cabo Verde. The African Union's list dated 19 September 2023 gives Cabo Verde no signature date, 28 April 2023 in its column for ratification or accession and 13 July 2023 as the date of deposit, for the African Medicines Agency treaty. ERIS's site returned \"403 Forbidden\" to OnCo's first request on 16 November 2026 and answered later that day. Its page on marketing authorisation names Decreto-Lei 59/2006 as the law that governs authorisation and says a first authorisation is valid for five years. The page links a list of authorised medicines dated 2 August 2023, which OnCo did not open, and the four ERIS pages OnCo read do not mention clinical trials, so the list and the trial rules are not described here.",
          links: [
            { label: "Portaria 50/2021, regulation of the Conselho Nacional de Medicamento (Boletim Oficial, via WHO, PDF)", url: PORTARIA_CNM },
            { label: "Entidade Reguladora Independente da Saúde (ERIS)", url: ERIS },
            { label: "ERIS: marketing authorisation (Autorização de Introdução no Mercado)", url: ERIS_AIM },
            { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML3 },
            { label: "African Union: signatures and ratifications of the African Medicines Agency treaty (19 September 2023, PDF)", url: AMA },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: cervical cancer profile 2021, Cabo Verde (PDF)", url: WHO_CERVICAL },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination since 2021, for girls and from 2023 for boys, at 99% of the target group",
          plain:
            "WHO's immunisation database records the HPV vaccine as introduced nationwide in Cabo Verde in 2021. Programme coverage with a first dose among girls has been 99% every year from 2022 to 2025, and boys have been vaccinated since 2023 at 98% to 99%.",
          detail:
            "The rows for Cabo Verde, read on 16 November 2026, give programme coverage with a first dose among girls of 96% in 2021 and 99% in each year from 2022 to 2025, and among boys of 98% in 2023 and 99% in 2024 and 2025. The groups are small: 5,793 first doses to girls and 5,001 to boys in 2025. The country's official figure for a final dose in 2024 was 96% for both girls and boys. The rows hold no estimate of the share vaccinated by age 15. WHO's 2021 cervical cancer profile listed the vaccine as in the national programme from 2021.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Cabo Verde (immunisation data API)", url: WHO_HPV_API },
            { label: "WHO: HPV vaccine introduction rows for Cabo Verde (immunisation data API)", url: WHO_HPV_INTRO },
            { label: "WHO: cervical cancer profile 2021, Cabo Verde (PDF)", url: WHO_CERVICAL },
          ],
        },
        {
          id: "screening-2021",
          title: "Four in ten women screened for cervical cancer without a national programme; breast cancer early diagnosis since 2023",
          plain:
            "WHO's 2021 profile estimated that 42% of women aged 30 to 49 in Cabo Verde had been screened for cervical cancer in the previous five years, although it recorded no national screening programme. In October 2023 the ministry launched early diagnosis of breast cancer in primary care.",
          detail:
            "The 2021 profile gives, for 2019, 53% of women aged 30 to 49 ever screened and 42% in the last five years, with early detection guidelines in primary care present and a defined referral system and national management guidelines absent. The breast programme, launched in Praia on 26 October 2023, sets up breast consultations in primary care and rests on educating women about warning signs, training health workers and organising quick referral; the ministry's stated aim is 10% fewer breast cancers diagnosed at an advanced stage. At Hospital Agostinho Neto, 57% of the breast cancers diagnosed from 2015 to 2021 were at stage III or IV. The ICCP portal holds a 2015 manual of the national programme for cancer prevention and screening.",
          links: [
            { label: "WHO: cervical cancer profile 2021, Cabo Verde (PDF)", url: WHO_CERVICAL },
            { label: "Ministério da Saúde: breast cancer early diagnosis programme (October 2023)", url: MOH_OCT_2023 },
            { label: "Borges et al., breast cancer in Cape Verde and an international treatment partnership (JCO Glob Oncol 2026)", url: BORGES_2026 },
            { label: "Manual de Prevenção e Controlo de Doenças Oncológicas, Cabo Verde, 2015 (PDF via ICCP)", url: ICCP_MANUAL },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in Cabo Verde",
      cards: [
        {
          id: "radiotherapy",
          title: "No radiotherapy centre in IAEA's directory: studies describe radiotherapy given abroad",
          plain:
            "IAEA's directory, read on 16 November 2026, lists no radiotherapy centre in Cabo Verde. A 2026 study from the Praia hospital describes radiotherapy as given abroad, and a 2022 study describes women treated with it in Lisbon. Among 586 people treated at the Praia hospital for breast cancer from 2000 to 2024, a third received radiotherapy; the abstract does not say where it was given.",
          detail:
            "DIRAC's public data, read on 16 November 2026, has no row for Cabo Verde, and WHO's 2020 profile counted no external beam radiotherapy in 2019. Borges and colleagues, studying 158 women diagnosed at Hospital Agostinho Neto from 2015 to 2021 after an international treatment partnership began, report that 61.4% of those with potentially curable breast cancer received treatment that followed the harmonised guidelines for sub-Saharan Africa, radiotherapy included, although it was given abroad, and that three-year survival was 79.9% among women treated as recommended. For cervical cancer, Vilares and colleagues describe 58 women evacuated to the Portuguese cancer institute in Lisbon from 2013 to 2020 under a health cooperation agreement between the two countries: 77.6% had chemotherapy with radiotherapy there, and the stage assigned in Cabo Verde matched the one found in Lisbon in 15.5% of cases, which the authors say may be explained by the wait and by limited means of staging.",
          links: [
            { label: "IAEA DIRAC: radiotherapy centres by country (read 16 November 2026)", url: DIRAC },
            { label: "Borges et al., breast cancer in Cape Verde and an international treatment partnership (JCO Glob Oncol 2026)", url: BORGES_2026 },
            { label: "Borges et al., breast cancer at Agostinho Neto University Hospital 2000 to 2024 (ecancermedicalscience 2025)", url: BORGES_2025 },
            { label: "Vilares et al., cervical cancer in women evacuated from Cape Verde (ecancermedicalscience 2022)", url: VILARES_2022 },
          ],
        },
        {
          id: "services",
          title: "A chemotherapy service in Praia, a day hospital being set up in Mindelo, and fewer evacuations from 2017 to 2020 by the ministry's account",
          plain:
            "The Ministry of Health reported in February 2023 a 10-bed oncology service for chemotherapy and a molecular biology laboratory at Hospital Dr. Agostinho Neto in Praia, and an oncology day hospital being set up at Hospital Dr. Baptista de Sousa in Mindelo.",
          detail:
            "The same page credits a project with international partners, Oncologia Cabo Verde, with 80% more cancer operations, 18% more chemotherapy sessions and 30% fewer evacuations of patients to Portugal between 2017 and 2020, and says cancer mortality fell by 3% between 2018 and 2020; these are the ministry's own figures and OnCo found no independent evaluation. It also lists training of palliative care teams, a carer's guide and treatment protocols. WHO's 2021 profile recorded chemotherapy and pathology as generally available in 2021, and cancer surgery, radiotherapy and a cancer centre at tertiary level as not. Among 586 people treated for breast cancer at the Praia hospital from 2000 to 2024, stage III was the commonest stage at diagnosis (39.4%) and median survival was 137.1 months.",
          links: [
            { label: "Ministério da Saúde: government investment in cancer control (February 2023)", url: MOH_FEB_2023 },
            { label: "WHO: cervical cancer profile 2021, Cabo Verde (PDF)", url: WHO_CERVICAL },
            { label: "Borges et al., breast cancer at Agostinho Neto University Hospital 2000 to 2024 (ecancermedicalscience 2025)", url: BORGES_2025 },
          ],
        },
        {
          id: "plan",
          title: "A national cancer plan for 2018 to 2022, named by the ministry; OnCo did not find the document",
          plain:
            "The Ministry of Health names a Plano Estratégico Nacional de Controlo do Cancro 2018 to 2022 among its actions. The ICCP portal's search for Cabo Verde on 16 November 2026 returned no such plan and no later one.",
          detail:
            "What the portal returned was a 2015 manual of the Programa de Prevenção e Rastreio de Cancros, ICCP's 2023 survivorship profile of that 2015 programme, a 2014 multisectoral plan for non-communicable diseases, and WHO's profiles. WHO's 2020 profile recorded a national cancer plan as operational in 2019 and cancer management guidelines as absent. The ministry's pages refer to a national programme for the prevention and control of cancer within the national health directorate, which is where to ask whether a plan for the years after 2022 exists.",
          links: [
            { label: "Ministério da Saúde: government investment in cancer control (February 2023)", url: MOH_FEB_2023 },
            { label: "ICCP portal: resources returned for Cabo Verde", url: ICCP_SEARCH },
            { label: "WHO: Cancer Country Profile 2020, Cabo Verde (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Cabo Verde", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Cabo Verde",
          plain:
            "None of the trials in OnCo's records lists Cabo Verde among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Cabo Verde. Queries of the registry itself that day for cancer studies located in \"Cabo Verde\", and by the country field \"Cape Verde\", returned none; a free-text search for \"Cape Verde\" returned one study whose sites are all in the United States. Published research from the country that OnCo read comes mostly from Hospital Agostinho Neto in Praia, working with Portuguese cancer centres: its hospital registry, two studies of breast cancer and the Lisbon study of evacuated women with cervical cancer.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Cabo Verde", url: CTGOV },
            { label: "Silva et al., cancer on Santiago island 2017 to 2018 (ecancermedicalscience 2019)", url: SILVA_2019 },
            { label: "Borges et al., breast cancer in Cape Verde and an international treatment partnership (JCO Glob Oncol 2026)", url: BORGES_2026 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not found, not readable or blocked for this page",
      plain:
        "OnCo did not find a report from the national cancer registry, the cancer plan the ministry names, the regulator's rules on clinical trials, or a source on what a patient pays for cancer treatment in Cabo Verde and what evacuation covers in money.",
      detail:
        "What happened, source by source, on 16 November 2026. The regulator's site (eris.cv) returned \"403 Forbidden\" at three addresses on OnCo's first reading and answered later the same day; OnCo then read its home page and its pages about the institution, its powers and marketing authorisation, but not the legal texts or the list of authorised medicines that those pages link to. The African Cancer Registry Network's page for the national registry says only that details are coming. The ICCP portal's search returned no cancer plan for Cabo Verde later than the 2015 manual. The social security institute's home page was read, but not its rules on health benefits. The ministry's cancer pages date from 2023, and OnCo found none more recent. In WHO's 2020 profile the row for PET scanners gives a value that does not look right in the extracted text and is not used, and the counts of radiation oncologists and medical physicists are \"n/a\". A future pass should read the ministry's annual statistical report, INPS's benefit rules and ERIS's texts in Portuguese; until then the national health directorate's cancer programme and INPS are where to ask.",
      links: [
        { label: "Entidade Reguladora Independente da Saúde (ERIS)", url: ERIS },
        { label: "African Cancer Registry Network: Cape Verde National Cancer Registry", url: AFCRN_CV },
        { label: "Ministério da Saúde, Cabo Verde", url: "https://minsaude.gov.cv/" },
      ],
    },
  ],
  institutions: ["cabo-verde-ministry-of-health", "hospital-agostinho-neto", "hospital-baptista-de-sousa", "cabo-verde-cancer-registry", "ipo-lisboa", "who", "iarc", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-silva-santiago-hospital-cancer-registry-ecancer-2019", "paper-borges-breast-cancer-cape-verde-partnership-jcogo-2026", "paper-vilares-cervical-cancer-cape-verde-referral-ecancer-2022"],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, the Ministry of Health's own pages, WHO's 2020 and 2021 country profiles and immunisation data, Portaria 50/2021, the African Cancer Registry Network's page, IAEA's DIRAC directory, the World Bank's health expenditure series, the African Union's treaty list, ClinicalTrials.gov and papers resolved through Europe PMC.",
  verify:
    "The ministry pages read here date from 2023 and the registry has published no report that OnCo found. Check with the Ministry of Health, INPS or the treating hospital before relying on this page, above all on evacuation.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Cape Verde (PDF)", url: IARC_FACTSHEET },
    { label: "Ministério da Saúde: procedure for evacuation abroad", url: MOH_EVAC },
    { label: "Ministério da Saúde: government investment in cancer control (February 2023)", url: MOH_FEB_2023 },
  ],
};

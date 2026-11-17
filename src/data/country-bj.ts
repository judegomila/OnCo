import type { CountryDive } from "@/data/country-dive";

/**
 * Benin deep dive: the hand-written cards for /countries/bj/ (wave 14). Every figure was read from the raw text of its
 * source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Benin, the Plan national de
 * lutte contre les cancers au Bénin 2024 to 2028 (PDF text from the ICCP portal), the African Cancer Registry Network's
 * pages for the Cotonou and Parakou registries, WHO's Cancer Country Profile 2020 and cervical cancer profile 2021, the
 * government's own pages on the Centre Hospitalier International de Calavi (November 2025 and April 2026), the health
 * ministry's page on the December 2025 HPV campaign, ABMed's presentation page, the social protection agency's page on
 * the basic care basket of the ARCH health insurance, WHO's immunisation data API, IAEA DIRAC's public data, the World
 * Bank's health expenditure series, the African Union's treaty list, WHO's August 2026 list of regulators at maturity
 * level 3 and 4, ClinicalTrials.gov's API, and three papers resolved through Europe PMC.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/204-benin-fact-sheet.pdf";
const WHO_PROFILE = "https://www.iccp-portal.org/sites/default/files/plans/BEN_2020.pdf";
const WHO_CERVICAL = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-ben-2021-country-profile-en.pdf";
const PLAN = "https://www.iccp-portal.org/sites/default/files/2025-11/B%C3%A9nin_PNLC_2024_2028.pdf";
const AFCRN_COTONOU = "https://afcrn.org/index.php/membership/membership-list/134-cotonoucancerregistry";
const AFCRN_PARAKOU = "https://afcrn.org/index.php/membership/membership-list/176-benin-parakou";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20%27BEN%27%20and%20contains%28ANTIGEN%2C%27HPV%27%29";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20%27BEN%27%20and%20contains%28ANTIGEN%2C%27HPV%27%29";
const MOH_HPV = "https://sante.gouv.bj/article/actualites/prevention-du-cancer-du-col-de-luterus-le-benin-lance-la-campagne-nationale-contre-le-hpv-827";
const WB_OOP = "https://api.worldbank.org/v2/country/BEN/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_CHE = "https://api.worldbank.org/v2/country/BEN/indicator/SH.XPD.CHEX.PC.CD?format=json";
const WB_EXT = "https://api.worldbank.org/v2/country/BEN/indicator/SH.XPD.EHEX.CH.ZS?format=json";
const WB_GOV = "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=BJ";
const ARCH_BASKET = "https://anps.bj/panier-des-soins-de-base";
const ANPS = "https://anps.bj/qui-sommes-nous";
const ABMED_PRES = "https://abmed.bj/presentation";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const CHIC_APR_2026 = "https://www.gouv.bj/article/3490/renforcement-offre-soins-chic-radiotherapie-chirurgie-coelioscopique-hospitalisations-conventionnelles-desormais-effectives-benin/";
const CHIC_NOV_2025 = "https://www.gouv.bj/article/3330/centre-hospitalier-international-calavi-joyau-medical-redefinit-soins-benin/";
const CTGOV = "https://clinicaltrials.gov/search?country=Benin&cond=cancer";
const EGUE_2019 = "https://doi.org/10.1016/j.canep.2019.01.006";
const GNANGNON_2026 = "https://doi.org/10.1245/s10434-025-18976-1";
const SCHANTZ_2025 = "https://doi.org/10.1186/s12885-025-14325-3";

export const BJ_DIVE: CountryDive = {
  iso2: "BJ",
  iso3: "BEN",
  name: "Benin",
  flag: "🇧🇯",
  asOf: "2026-11-16",
  title: "Cancer in Benin",
  description:
    "Cancer in Benin: two population cancer registries, in Cotonou since 2014 and Parakou since 2017, a national cancer plan for 2024 to 2028 costed at 5.27 billion CFA francs, radiotherapy opened at the Centre Hospitalier International de Calavi in April 2026 by the government's account, HPV vaccine added to routine vaccination in December 2025, a public health insurance basket that lists no cancer care, health spending of about USD 47 a person with 42% paid out of pocket, IARC's estimate of 9,193 new cancers and 5,818 deaths in 2024, and no trial in OnCo's records with a site in Benin.",
  lede:
    "Benin counts cancers in two cities, Cotonou since 2014 and Parakou since 2017, has a national cancer plan for 2024 to 2028, and added the HPV vaccine to routine vaccination in December 2025. The government reports that radiotherapy, which the plan recorded as unavailable in the country, opened at the Centre Hospitalier International de Calavi on 1 April 2026.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Benin is 9,193 new cancers and 5,818 deaths, an age-standardised incidence of 113.3 per 100,000 (120.1 in men, 110.1 in women) and an age-standardised mortality of 74.0. The fact sheet gives its incidence source as a subnational registry and its method as \"subnational rates applied to 2024 population\" (IARC's method 2b), with mortality from national incidence estimates applied to model-based mortality-to-incidence ratios. The fact sheet does not name the registry; Benin's two population registries cover the cities of Cotonou and Parakou. The national figures therefore extend city rates to a country where most people live outside those two cities, and the national cancer plan itself calls the Cotonou data not exhaustive.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Benin",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Benin (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 9,200 new cancers a year; breast and prostate cancer make up four in ten",
          plain:
            "IARC estimates 9,193 new cancers in Benin in 2024 and 5,818 cancer deaths. Breast cancer is the commonest, with 2,040 cases, then prostate cancer with 1,850. Prostate cancer is the commonest cause of cancer death, followed by breast and liver cancer.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 2,040 breast cancers (1,015 deaths), 1,850 prostate cancers (1,151 deaths), 714 cervical cancers (444 deaths), 622 colorectal cancers (350 deaths), 561 liver cancers (511 deaths) and 345 stomach cancers (274 deaths). Prostate cancer is 43.0% of the 4,307 cancers estimated in men; breast cancer is 41.8% of the 4,886 in women. The risk of developing a cancer before age 75 is 12.8%, and an estimated 16,121 people are living within five years of a diagnosis. WHO's 2020 profile estimated 673 cancers a year in children aged 0 to 14. IARC applies rates from a registry covering part of the country to the whole population, as the note below explains.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Benin (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, Benin (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "late-diagnosis",
          title: "Breast cancer in Cotonou: mean age 49.6, most diagnosed at stage III or IV",
          plain:
            "A 2026 study of 277 women with breast cancer in the Cotonou registry, diagnosed from 2014 to 2019, found a mean age at diagnosis of 49.6 years, most cancers at stage III or IV, and overall survival of 57% at one year and 37% at five years.",
          detail:
            "Gnangnon and colleagues report that the crude incidence of breast cancer among women living in Cotonou rose from 16.8 per 100,000 in 2014 to 24.7 in 2019, with a peak of 38.9 in 2018, that T4 tumours were the most frequent presentation and that triple-negative breast cancer was the most prevalent molecular subtype. The abstract does not give the percentage at each stage. The registry's first results, for 2014 to 2016, put breast cancer (age-standardised rate 22.6 per 100,000) ahead of cervical cancer (14.9) in women, the two together making 49.2% of women's cancers. The national cancer plan lists late diagnosis and under-diagnosis among the obstacles that persist.",
          links: [
            { label: "Gnangnon et al., breast cancer in Cotonou 2014 to 2019 (Ann Surg Oncol 2026)", url: GNANGNON_2026 },
            { label: "Egue et al., cancer incidence in Cotonou 2014 to 2016 (Cancer Epidemiol 2019)", url: EGUE_2019 },
            { label: "Plan national de lutte contre les cancers au Bénin 2024 to 2028 (PDF via ICCP)", url: PLAN },
          ],
        },
      ],
      tables: [
        {
          id: "bj-registry",
          title: "What the Cotonou registry has reported",
          caption: "Cases registered among residents of Cotonou, 2014 to 2016, with age-standardised incidence per 100,000.",
          columns: [
            { key: "group", label: "Group" },
            { key: "cases", label: "Cases registered", numeric: true },
            { key: "share", label: "Share (%)", numeric: true },
            { key: "asr", label: "Age-standardised rate per 100,000", numeric: true },
          ],
          rows: [
            { group: "Women", cases: 608, share: 56.0, asr: 78.4 },
            { group: "Men", cases: 478, share: 44.0, asr: 91.8 },
            { group: "Both sexes", cases: 1086, share: 100, asr: null },
          ],
          note: "The registry's first published results. A registry counts new cases, not deaths, and this one covers one city; the national cancer plan describes its data as not exhaustive.",
          sources: [
            { label: "Egue et al., cancer incidence in Cotonou 2014 to 2016 (Cancer Epidemiol 2019)", url: EGUE_2019 },
            { label: "Plan national de lutte contre les cancers au Bénin 2024 to 2028 (PDF via ICCP)", url: PLAN },
          ],
        },
        {
          id: "bj-registry-sites",
          title: "The leading cancers in each registry, by sex",
          caption: "Cases and share of all cancers registered in that sex: Cotonou 2014 to 2019 and Parakou 2017 to 2019, as tabulated in the national cancer plan, which gives each registry, 2023, as its source.",
          columns: [
            { key: "registry", label: "Registry and period" },
            { key: "sex", label: "Sex" },
            { key: "site", label: "Cancer" },
            { key: "cases", label: "Cases", numeric: true },
            { key: "share", label: "Share (%)", numeric: true },
          ],
          rows: [
            { registry: "Cotonou, 2014 to 2019", sex: "Women", site: "Breast", cases: 571, share: 38.95 },
            { registry: "Cotonou, 2014 to 2019", sex: "Women", site: "Cervix", cases: 234, share: 15.96 },
            { registry: "Cotonou, 2014 to 2019", sex: "Men", site: "Prostate", cases: 318, share: 29.55 },
            { registry: "Cotonou, 2014 to 2019", sex: "Men", site: "Liver", cases: 99, share: 9.2 },
            { registry: "Parakou, 2017 to 2019", sex: "Women", site: "Cervix", cases: 70, share: 39.33 },
            { registry: "Parakou, 2017 to 2019", sex: "Women", site: "Breast", cases: 37, share: 20.79 },
            { registry: "Parakou, 2017 to 2019", sex: "Men", site: "Liver", cases: 39, share: 26.9 },
            { registry: "Parakou, 2017 to 2019", sex: "Men", site: "Prostate", cases: 34, share: 23.45 },
          ],
          note: "The two leading sites in each sex. The plan asks that both sets be read with each registry's coverage in mind, and left out 2020 to 2022 because the COVID-19 crisis disrupted registration.",
          sources: [{ label: "Plan national de lutte contre les cancers au Bénin 2024 to 2028 (PDF via ICCP)", url: PLAN }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registries",
      title: "The cancer registries",
      cards: [
        {
          id: "registry-cotonou",
          title: "Cotonou: a population registry since 2014, collecting from 28 sources",
          plain:
            "The health ministry set up a population-based cancer registry for the city of Cotonou in 2014, run and financed by its programme against non-communicable diseases. It registered 1,086 cancers in its first three years.",
          detail:
            "The registry's page on the African Cancer Registry Network, which is undated, says registration began in 2013 with a pathology registry at the Cotonou medical school; that the population registry covers the whole city, 678,874 people by a 2013 estimate; and that its registrars visit 28 sources (9 hospitals, 14 private clinics and 5 private pathology laboratories), the national teaching hospital being the most important. It notes that there is no death registry in Benin. The national cancer plan reports that the number of patients registered rose from 289 in 2014 to 581 in 2018 and then fell, probably because of COVID-19. In its first results prostate cancer was a quarter of men's cancers, with an incidence of 30.5 per 100,000.",
          links: [
            { label: "African Cancer Registry Network: Cotonou Cancer Registry", url: AFCRN_COTONOU },
            { label: "Egue et al., cancer incidence in Cotonou 2014 to 2016 (Cancer Epidemiol 2019)", url: EGUE_2019 },
            { label: "Plan national de lutte contre les cancers au Bénin 2024 to 2028 (PDF via ICCP)", url: PLAN },
          ],
        },
        {
          id: "registry-parakou",
          title: "Parakou: a second registry since 2017, where cervical and liver cancer lead",
          plain:
            "A second population registry covers the city of Parakou in the north. It was created in 2017 in the pathology laboratory of the Borgou-Alibori university hospital. From 2017 to 2019 cervical cancer led among women there and liver cancer among men.",
          detail:
            "The registry's page on the African Cancer Registry Network, updated on 24 November 2024, describes one full-time registrar, employed by the hospital since January 2022 and before that paid from the director's own funds, a motorcycle for visiting data sources, and CanReg5 for data management. The page gives the population in two places and the figures differ: about 295,000 covered by the registry, by estimates from the 2013 census, and 255,478 for the city of Parakou, by the last census, which the page does not date there. Its sources include five hospitals, four private clinics and two pathology laboratories, one of them at Tanguiéta working by telepathology with pathologists outside Benin; blood cancer patients are often referred to the national hospital in Cotonou, and death registers cannot be used because the cause of death is not recorded. Its data have gone into the NORA, SurvCan and SurvCan+ studies.",
          links: [
            { label: "African Cancer Registry Network: Parakou Cancer Registry", url: AFCRN_PARAKOU },
            { label: "Plan national de lutte contre les cancers au Bénin 2024 to 2028 (PDF via ICCP)", url: PLAN },
          ],
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
          title: "About USD 47 a person on health; households paid 42% in 2023, down from 55% in 2021",
          plain:
            "Benin spent about 47 US dollars a person on health in 2023, and households paid 42% of it out of their own pockets, according to WHO's health expenditure figures published by the World Bank. External funding paid 38%.",
          detail:
            "The World Bank's series, from WHO's Global Health Expenditure Database, gives current health spending of USD 38.45 per person in 2021, 37.76 in 2022 and 46.53 in 2023, and out-of-pocket spending of 55.4%, 49.1% and 42.4% of current health spending in those years. Over the same years external health expenditure rose from 27.5% to 38.4% of the total, and domestic government spending was 14.7% in 2023. The national cancer plan describes the money allocated to non-communicable diseases as stagnant and insufficient for cancer control, and lists the cost of cancer care and the limited access to cancer medicines, above all targeted therapies and immunotherapy, among the problems it addresses.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Benin (API)", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Benin (API)", url: WB_CHE },
            { label: "World Bank: external health expenditure, % of current health expenditure, Benin (API)", url: WB_EXT },
            { label: "World Bank: domestic government health expenditure, % of current health expenditure, Benin", url: WB_GOV },
            { label: "Plan national de lutte contre les cancers au Bénin 2024 to 2028 (PDF via ICCP)", url: PLAN },
          ],
        },
        {
          id: "arch",
          title: "The public health insurance basket lists 32 conditions and services; cancer is not among them",
          plain:
            "Benin's public health insurance, the health arm of the ARCH programme, publishes its basic care basket under a decree of 29 October 2025. It lists 32 conditions and services, such as malaria, childbirth, appendicitis and emergency care. None of them is cancer care.",
          detail:
            "The Agence Nationale de Protection Sociale, a public body under the Ministry of Economy and Finance that manages ARCH, shows the basket of Decree 2025-672 on its site: 21 items for all beneficiaries, 6 for women and 5 for children, with consultations, hospital stays, medicines and emergency tests covered for the conditions in the basket. OnCo read the list on 16 November 2026 and found no cancer, chemotherapy or radiotherapy item. This agrees with the national cancer plan of January 2024, which names \"cancers not taken into account in the basic basket of ARCH\" among its problems and plans advocacy for the health ministry and its partners to buy certain cancer medicines, with a state subsidy for some medicines as its measure of success. The agency's site describes itself as under construction, and its home page marks the health insurance component \"available soon\". The qualitative study by Schantz and colleagues found that the high cost of tests and treatment often leads women with breast cancer to abandon care.",
          links: [
            { label: "Agence Nationale de Protection Sociale: basic care basket of the AMO-ARCH (Decree 2025-672)", url: ARCH_BASKET },
            { label: "Agence Nationale de Protection Sociale: about the agency", url: ANPS },
            { label: "Plan national de lutte contre les cancers au Bénin 2024 to 2028 (PDF via ICCP)", url: PLAN },
            { label: "Schantz et al., access to oncology care in Benin (BMC Cancer 2025)", url: SCHANTZ_2025 },
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
          id: "abmed",
          title: "ABMed, a public agency under the health ministry, approves medicines and has charge of clinical trials",
          plain:
            "The Agence béninoise du Médicament et des autres produits de Santé (ABMed) regulates medicines in Benin. Its own page says it has charge of approving health products, of clinical trials and of licensing pharmaceutical businesses, under Decree 2023-422 of 26 July 2023.",
          detail:
            "ABMed describes itself as a public establishment with legal personality and financial autonomy under the supervision of the Ministry of Health, successor to the former directorate of pharmacy, with directorates for inspection and regulation, licences, vigilance and market surveillance, approvals and clinical trials, and quality. Its site offers a list of approved products, a list of withdrawn authorisations and forms for reporting side effects and stock shortages. Its clinical trials section, read on 16 November 2026, lists a webinar and a presentation on its guidelines for conducting clinical trials in Benin, the form and checklist for applying for a trial authorisation and a form for reporting serious adverse events; its directory of clinical trials of medicines showed no entries that day. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include Benin. The African Union's list dated 19 September 2023 shows that Benin signed the African Medicines Agency treaty on 3 December 2019 and ratified it on 28 July 2021.",
          links: [
            { label: "ABMed: presentation", url: ABMED_PRES },
            { label: "ABMed: clinical trials section (read 16 November 2026)", url: "https://abmed.bj/supervision-essais-clinique" },
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
      aside: { label: "WHO: cervical cancer profile 2021, Benin (PDF)", url: WHO_CERVICAL },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccine added to routine vaccination in December 2025, for girls aged 9 to 14",
          plain:
            "The health minister launched a national HPV vaccination campaign on 2 December 2025 for girls aged 9 to 14, bringing the vaccine into the routine immunisation programme. WHO's database records 730,844 first doses in 2025, 66% of the girls targeted.",
          detail:
            "The ministry's account says the campaign ran from 1 to 7 December 2025, with free vaccination in schools and public places, in the presence of UNICEF and Gavi. WHO's immunisation rows for Benin, read on 16 November 2026, show nationwide introduction in 2025 and nothing before it; programme coverage with a first dose among girls of 66% (730,844 doses for a target of 1,100,713); and, in the administrative row, 155,191 first doses against a target of 149,370, which is 103.9%, beside an official coverage row of 80%. The national cancer plan records an earlier pilot, from 2016 to 2020, in two health zones. The rows hold no estimate yet of the share of girls vaccinated by age 15.",
          links: [
            { label: "Ministère de la Santé, Bénin: national HPV vaccination campaign (December 2025)", url: MOH_HPV },
            { label: "WHO: HPV vaccination coverage rows for Benin (immunisation data API)", url: WHO_HPV_API },
            { label: "WHO: HPV vaccine introduction rows for Benin (immunisation data API)", url: WHO_HPV_INTRO },
            { label: "Plan national de lutte contre les cancers au Bénin 2024 to 2028 (PDF via ICCP)", url: PLAN },
          ],
        },
        {
          id: "screening-2021",
          title: "Cervical screening by visual inspection in maternity units; no national programme on WHO's record",
          plain:
            "The national cancer plan says cervical screening by visual inspection is organised in maternity units, and that early detection services reached eleven health facilities in two departments in 2023. WHO's 2021 profile recorded no national screening programme.",
          detail:
            "The plan describes a package of early detection for cervical cancer and precancerous lesions introduced in five facilities in Cotonou in 2019 and extended to eleven in the Littoral and Borgou departments in 2023, alongside mass screening campaigns for the cervix and breast. WHO's 2021 cervical cancer profile answers \"No\" to a national screening programme and shows 0% of women aged 30 to 49 screened, ever or in the last five years, for 2019, with the caption that fewer than 1 in 10 women have been screened in the last five years; it records national guidelines on managing cervical cancer and a defined referral system as present. WHO's 2020 profile recorded no breast screening programme in 2019. A strategic plan for cervical and other women's cancers ran from 2019 to 2023.",
          links: [
            { label: "Plan national de lutte contre les cancers au Bénin 2024 to 2028 (PDF via ICCP)", url: PLAN },
            { label: "WHO: cervical cancer profile 2021, Benin (PDF)", url: WHO_CERVICAL },
            { label: "WHO: Cancer Country Profile 2020, Benin (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in Benin",
      cards: [
        {
          id: "radiotherapy",
          title: "Radiotherapy from April 2026 at Calavi, by the government's account; not yet in IAEA's directory",
          plain:
            "The government reports that the Centre Hospitalier International de Calavi, a public hospital at Abomey-Calavi, opened its radiotherapy service on 1 April 2026 and treated its first patient on 15 April. IAEA's directory, read on 16 November 2026, still lists no radiotherapy centre in Benin.",
          detail:
            "Earlier sources recorded no radiotherapy in Benin: the national cancer plan of January 2024 says it was not yet available, WHO's 2020 profile counted no external beam radiotherapy in 2019, and Schantz and colleagues wrote in 2025 that patients who needed it had to travel abroad. The government's April 2026 account says the service reduces costly medical evacuations abroad; it does not give the number or type of machines, what a course costs or who pays. An earlier government page says the hospital was inaugurated in June 2025 with 434 beds and already offered medical oncology with chemotherapy, imaging including CT and MRI, and digestive surgery. Both pages are the government describing its own hospital; OnCo found no independent report of the service's activity, and IAEA's DIRAC had no entry for Benin.",
          links: [
            { label: "Gouvernement du Bénin: radiotherapy now effective at CHIC (25 April 2026)", url: CHIC_APR_2026 },
            { label: "Gouvernement du Bénin: Centre Hospitalier International de Calavi (2 November 2025)", url: CHIC_NOV_2025 },
            { label: "IAEA DIRAC: radiotherapy centres by country (read 16 November 2026)", url: DIRAC },
            { label: "Schantz et al., access to oncology care in Benin (BMC Cancer 2025)", url: SCHANTZ_2025 },
            { label: "Plan national de lutte contre les cancers au Bénin 2024 to 2028 (PDF via ICCP)", url: PLAN },
            { label: "WHO: Cancer Country Profile 2020, Benin (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "plan",
          title: "A cancer plan for 2024 to 2028, costed at 5.27 billion CFA francs",
          plain:
            "Benin's Plan national de lutte contre les cancers 2024 to 2028 puts its budget at 5,267,452,765 CFA francs, to come from national funds and partners. It follows a three-year plan for 2013 to 2015 and a women's cancers plan for 2019 to 2023.",
          detail:
            "The plan records where care is given: cancer surgery in several hospitals; chemotherapy in several public and private centres, organised within each speciality where specialists have the skill; blood cancers mainly at the national teaching hospital (CNHU-HKM) and at the university hospital in Porto-Novo (CHUD-OP); childhood cancers at those two; a gynaecological oncology unit at CHU-MEL; and a children's oncology unit at CHUD-OP. Among the people trained it counts three radiation oncologists, three medical oncologists, two paediatric oncologists, two nuclear medicine physicians, one medical physicist and one cancer surgeon. For diagnosis it counts pathology laboratories in and around Cotonou (five, one of them public), Parakou and Tanguiéta, immunohistochemistry at two sites, and no nuclear medicine or PET in the country. It names the absence of a cancer centre offering whole care as an obstacle.",
          links: [
            { label: "Plan national de lutte contre les cancers au Bénin 2024 to 2028 (PDF via ICCP)", url: PLAN },
            { label: "WHO: Cancer Country Profile 2020, Benin (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "access",
          title: "What women with breast cancer and their carers describe",
          plain:
            "A 2025 study interviewed women with breast cancer, the people treating them and representatives of associations in Benin. They described late diagnosis, services concentrated in Cotonou, long journeys, and costs that lead some women to stop treatment.",
          detail:
            "Schantz and colleagues report 56 semi-structured interviews and 18 days of observation in a chemotherapy department and a palliative care department in Cotonou. Besides the barriers, they point to changes under way: an inter-university diploma in gynaecological and breast oncology since 2013, the expansion of palliative care, and the hospital at Calavi, then planned to open in 2025. The national cancer plan adds that close to a hundred health workers have been trained in palliative care and in making morphine syrup. WHO's 2021 profile recorded palliative care as not generally available in primary care or in the community, and reported opioid consumption below 1 mg of oral morphine equivalent per person in 2017.",
          links: [
            { label: "Schantz et al., access to oncology care in Benin (BMC Cancer 2025)", url: SCHANTZ_2025 },
            { label: "Plan national de lutte contre les cancers au Bénin 2024 to 2028 (PDF via ICCP)", url: PLAN },
            { label: "WHO: cervical cancer profile 2021, Benin (PDF)", url: WHO_CERVICAL },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Benin", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Benin",
          plain:
            "None of the trials in OnCo's records lists Benin among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Benin. A query of the registry itself for cancer studies with a site in Benin returned one record that day, a terminated malaria treatment study, and no cancer trial. Research from Benin that OnCo read comes from the two registries and the teaching hospitals: the Cotonou registry's first incidence results, a registry-based study of breast cancer survival, and the Parakou registry's papers on breast cancer for 2017 to 2021 and cervical cancer for 2017 to 2022, which its network page cites and OnCo has not read.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Benin", url: CTGOV },
            { label: "Egue et al., cancer incidence in Cotonou 2014 to 2016 (Cancer Epidemiol 2019)", url: EGUE_2019 },
            { label: "African Cancer Registry Network: Parakou Cancer Registry", url: AFCRN_PARAKOU },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not found, not readable or out of date for this page",
      plain:
        "OnCo did not find what radiotherapy or chemotherapy costs a patient in Benin, an independent account of the new radiotherapy service, recent published counts from either registry, or the text of the regulator's rules for clinical trials.",
      detail:
        "What happened, source by source, on 16 November 2026. IAEA's DIRAC lists no centre in Benin although the government reports radiotherapy since April 2026, so the machines are not described here. ABMed's clinical trials section, which returned a server error earlier that day, now answers: it lists a webinar and a presentation on the agency's guidelines for clinical trials and the application forms, but its directory of clinical trials of medicines showed no entries, and OnCo has not read the guidelines themselves. The social protection agency's site is marked as under construction and shows the health insurance component as \"available soon\", so OnCo cannot say how many people the basket covers. The Cotonou registry's network page is undated, and the latest registry counts OnCo read are those to 2019 in the national plan. In WHO's 2020 profile the rows for pathology services and for the number of treatment services are not clear enough in the extracted text to use, and the counts of radiation oncologists, medical physicists and radiologists are \"n/a\". A future pass should read the registries' own reports, the hospital at Calavi's price list and ABMed's texts; until then the Ministry of Health and the treating hospital are where to ask.",
      links: [
        { label: "IAEA DIRAC: radiotherapy centres by country (read 16 November 2026)", url: DIRAC },
        { label: "ABMed: presentation", url: ABMED_PRES },
        { label: "ABMed: clinical trials section (read 16 November 2026)", url: "https://abmed.bj/supervision-essais-clinique" },
        { label: "Agence Nationale de Protection Sociale: basic care basket of the AMO-ARCH (Decree 2025-672)", url: ARCH_BASKET },
      ],
    },
  ],
  institutions: ["benin-ministry-of-health", "abmed-benin", "cotonou-cancer-registry", "parakou-cancer-registry", "cnhu-hkm-cotonou", "chud-oueme-plateau", "chic-abomey-calavi", "who", "iarc", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-egue-cotonou-cancer-incidence-canep-2019", "paper-gnangnon-breast-cancer-cotonou-registry-aso-2026", "paper-schantz-oncology-access-benin-bmc-cancer-2025"],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, Benin's cancer plan for 2024 to 2028 on the ICCP portal, the African Cancer Registry Network's pages for Cotonou and Parakou, WHO's 2020 and 2021 country profiles and immunisation data, the government's and health ministry's own pages, ABMed's site, the social protection agency's care basket, IAEA's DIRAC directory, the World Bank's health expenditure series, ClinicalTrials.gov and papers resolved through Europe PMC.",
  verify:
    "Services in Benin are changing quickly: radiotherapy and HPV vaccination both began within the last year, and the accounts of them here are the government's own. Check with the Ministry of Health or the treating hospital before relying on this page.",
  verifyLinks: [
    { label: "Plan national de lutte contre les cancers au Bénin 2024 to 2028 (PDF via ICCP)", url: PLAN },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Benin (PDF)", url: IARC_FACTSHEET },
    { label: "Ministère de la Santé, Bénin", url: "https://sante.gouv.bj/" },
  ],
};

import type { CountryDive } from "@/data/country-dive";

/**
 * Namibia deep dive: the hand-written cards for /countries/na/ (wave 15). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Namibia (PDF text),
 * the African Cancer Registry Network's page for the Namibian National Cancer Registry (updated 8 May 2017), the
 * Cancer Association of Namibia's own page, the Ministry of Health and Social Services' multisectoral plan against
 * non-communicable diseases 2017/18 to 2021/22 (PDF text, ICCP portal), WHO's Cancer Country Profile 2020 and cervical
 * cancer profile 2021 (PDF text), WHO's immunisation data API, a WHO Africa feature of 12 September 2025 on the HPV
 * campaign, the Medicines and Related Substances Control Act 2003 (text on WIPO Lex), WHO's August 2026 list of
 * regulators at maturity level 3 and 4, the African Union's treaty status list, IAEA DIRAC's public table of centres,
 * the World Bank's health expenditure series, two reports in The Namibian (February and June 2026), and the indexed
 * abstracts of five papers resolved through Europe PMC.
 *
 * Not reached: the Ministry of Health and Social Services, the Ministry of Finance's medical aid page and the
 * Namibia Medicines Regulatory Council's site did not answer a plain request. Each is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/516-namibia-fact-sheet.pdf";
const AFCRN_NA = "https://afcrn.org/index.php/membership/membership-list/125-nambiancr";
const CAN_ABOUT = "https://www.can.org.na/aboutus";
const NCD_PLAN = "https://www.iccp-portal.org/sites/default/files/plans/NAMIBIA%20NATIONAL%20MULTISECTORAL%20STRATEGIC%20PLAN%20FOR%20PREVENTION%20AND%20CONTROL%20OF%20NCDs.pdf";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=Namibia";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/nam-2020.pdf";
const WHO_CX_2021 = "https://www.iccp-portal.org/sites/default/files/plans/cervical-cancer-nam-2021-country-profile-en.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'NAM'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'NAM'";
const WHO_AFRO_HPV = "https://www.afro.who.int/countries/namibia/news/namibia-rolls-out-human-papillomavirus-vaccination-help-end-cervical-cancer";
const ACT_2003 = "https://www.wipo.int/wipolex/en/text/223335";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=NA";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=NA";
const WB_GOV = "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=NA";
const NAMIBIAN_FEB_2026 = "https://www.namibian.com.na/only-one-public-oncologist-for-namibia/";
const NAMIBIAN_JUN_2026 = "https://www.namibian.com.na/namibia-could-face-6-300-cancer-cases-annually-by-2045/";
const CTGOV = "https://clinicaltrials.gov/search?country=Namibia&cond=cancer";
const DOI_BOUCHERON = "https://doi.org/10.1001/jamanetworkopen.2023.41402";
const DOI_KORN = "https://doi.org/10.1371/journal.pone.0263920";
const DOI_KAHOLONGO = "https://doi.org/10.1371/journal.pone.0292794";
const DOI_STEFAN = "https://doi.org/10.11604/pamj.2014.17.191.3830";
const DOI_KANGMENNAANG = "https://doi.org/10.1177/1757975917727017";

const L_IARC = { label: "IARC: GLOBOCAN 2024 fact sheet, Namibia (PDF)", url: IARC_FACTSHEET };
const L_AFCRN = { label: "African Cancer Registry Network: Namibian National Cancer Registry (updated 8 May 2017)", url: AFCRN_NA };
const L_CAN = { label: "Cancer Association of Namibia: about us", url: CAN_ABOUT };
const L_NCD = { label: "Ministry of Health and Social Services: National Multisectoral Strategic Plan for Prevention and Control of NCDs 2017/18 to 2021/22 (PDF, ICCP portal)", url: NCD_PLAN };
const L_WHO_2020 = { label: "WHO: Cancer Country Profile 2020, Namibia (PDF)", url: WHO_PROFILE };
const L_WHO_CX = { label: "WHO: cervical cancer profile 2021, Namibia (PDF, ICCP portal)", url: WHO_CX_2021 };
const L_DIRAC = { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), public table of centres", url: DIRAC };

export const NA_DIVE: CountryDive = {
  iso2: "NA",
  iso3: "NAM",
  name: "Namibia",
  flag: "🇳🇦",
  asOf: "2026-11-16",
  title: "Cancer in Namibia",
  description:
    "Cancer in Namibia: a national cancer registry begun in 1995 and kept at the Cancer Association of Namibia, on which IARC bases its estimate of 4,205 new cancers and 2,520 deaths in 2024, breast, cervical and prostate cancer leading, health spending of about USD 397 a person with 7.5% paid out of pocket, a public cancer centre at Windhoek Central Hospital and a private cancer centre opened in 2015, HPV vaccination begun in August 2025, no published national cancer plan found, and no trial in OnCo's records with a site in Namibia.",
  lede:
    "Namibia has had a national cancer registry since 1995, kept at the Cancer Association of Namibia, and IARC builds its estimates for the country on that registry's rates. The registry's page names two centres to which cancer patients are meant to be sent, the public Dr A.B. May Cancer Care Centre at Windhoek Central Hospital and the private Namibia Oncology Centre, and a national HPV vaccination campaign for girls aged 9 to 14 began in August 2025.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Namibia is 4,205 new cancers and 2,520 deaths, an age-standardised incidence of 202.2 per 100,000 (231.1 in men, 195.4 in women). The fact sheet gives the incidence source as \"Registry (national)\" and the method as \"National rates applied to 2024 population\", so the case figures are the national registry's rates carried forward to 2024, not a count of cases diagnosed that year. Deaths are modelled: the fact sheet gives \"National incidence estimates applied to model-based M:I ratios (registry survival data)\". The registry's own description, last updated in May 2017, says it has no active case finding and that completeness is a concern, so the true number of cancers may be higher than its rates suggest.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Namibia",
      aside: L_IARC,
      cards: [
        {
          id: "shape",
          title: "About 4,200 new cancers a year; breast, cervical and prostate cancer lead",
          plain:
            "IARC estimates 4,205 new cancers in Namibia in 2024, 2,359 of them in women, and 2,520 cancer deaths. Breast cancer is the commonest, then cervical cancer, prostate cancer and Kaposi sarcoma. Breast cancer is also the commonest cause of cancer death, followed by cervical and prostate cancer.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 701 breast cancers (396 deaths), 453 cervical cancers (293 deaths), 440 prostate cancers (258 deaths), 334 cases of Kaposi sarcoma (131 deaths), 167 non-Hodgkin lymphomas (81 deaths) and 164 colorectal cancers (89 deaths). Lung cancer is eighth by cases, at 102, and fifth by deaths, at 99. The age-standardised death rate is 126.9 per 100,000 (148.0 in men, 120.4 in women). The risk of developing a cancer before age 75 is 19.3%, and an estimated 9,089 people are living within five years of a diagnosis. Deaths divided by new cases give 0.60 for 2024. The incidence figures are the national registry's rates applied to the 2024 population; the death figures are modelled from incidence, not counted from death certificates.",
          links: [L_IARC],
        },
        {
          id: "registry",
          title: "A national registry since 1995, kept at the Cancer Association of Namibia",
          plain:
            "The Namibian National Cancer Registry is population-based and, by its own description, covers the whole population. It is housed at the Cancer Association of Namibia in Windhoek, which pays for whatever IARC and the African Cancer Registry Network do not. Its latest full report listed on its network page covers 2010 to 2014.",
          detail:
            "The registry's page on the African Cancer Registry Network, last updated on 8 May 2017, says it began in 1995, when the Rössing Uranium mine, the Ministry of Health's oncology clinic and the Cancer Association collected all cancers reported to the two pathology laboratories from 1979 to 1994. At that date cases came mainly from registration forms completed at the Dr A.B. May Cancer Care Centre and the Namibia Oncology Centre and from copies of pathology reports; cases diagnosed in South Africa are passed back through a network of registries. The page says there is no active case finding and minimal follow-up, that place of residence is noted on fewer than a third of the state laboratory's reports, that the registry and the Cancer Association were pressing the ministry to have cancer declared a reportable disease, and that access to death certificates was granted from 2016 only. The Cancer Association's own page says an interim report for 2015 to 2017 was published in 2019 and that a report spanning 1995 to 2024 is to be published in 2026; OnCo did not find either report online.",
          links: [L_AFCRN, L_CAN],
        },
        {
          id: "breast-journey",
          title: "Breast cancer at Windhoek Central Hospital: survival differed sharply between groups of women",
          plain:
            "A study followed 405 women diagnosed with breast cancer at the public oncology centre of Windhoek Central Hospital between 2014 and 2016. Three years on, 60% of Black women were alive, against 80% of women of mixed ancestry and 89% of White women.",
          detail:
            "The study, the Namibian part of the African Breast Cancer: Disparities in Outcomes cohort, was published in JAMA Network Open in 2023. Of the 405 women, 300 were Black, 49 of mixed ancestry and 56 White. Early-stage diagnosis (stage I or II) was recorded in 37% of Black women and 75% of the other two groups combined; 60% and 77% respectively had reached a health worker within 60 days. Completion of surgery plus chemotherapy was 53% in Black women and 63% in the others, which the authors describe as low in all women. The cohort is women who reached the public centre in Windhoek, not every woman with breast cancer in the country.",
          links: [{ label: "Boucheron and colleagues: Analysis of the Breast Cancer Journey in Namibia (JAMA Network Open, 2023)", url: DOI_BOUCHERON }],
        },
        {
          id: "children",
          title: "Children with cancer are treated at Windhoek Central Hospital",
          plain:
            "Two published reviews of children's cancer in Namibia both come from the paediatric oncology unit at Windhoek Central Hospital. The more recent counted 174 children admitted with cancer from 2011 to 2020, with blood cancers the commonest group.",
          detail:
            "The 2023 review in PLoS One analysed 174 files of children aged 0 to 16 admitted from 1 January 2011 to 31 December 2020: 44.8% had haematopoietic cancers, leukaemias the commonest among them, 37.9% embryonal cancers, 13.8% soft tissue and bone sarcomas and 3.4% brain or central nervous system cancers; the median age at diagnosis was 5.13 years. An earlier review of 2003 to 2010, published in 2014, described the hospital as the only centre in Namibia to which children with cancer are referred, found a recorded incidence of 29.4 per million, lower than a study twenty years before, and concluded that many cancers were not being diagnosed or reported. WHO's 2020 profile estimated 93 cancers a year in children aged 0 to 14 and recorded no early detection programme or defined referral system for childhood cancer in 2019.",
          links: [
            { label: "Kaholongo and Mashingaidze-Mano: Paediatric cancer burden in Namibia, 2011 to 2020 (PLoS One, 2023)", url: DOI_KAHOLONGO },
            { label: "Stefan and colleagues: Incidence of childhood cancer in Namibia (Pan African Medical Journal, 2014)", url: DOI_STEFAN },
            L_WHO_2020,
          ],
        },
      ],
      tables: [
        {
          id: "na-registry",
          title: "What the national registry reported for 2010 to 2014",
          caption: "Cases reported to the Namibian National Cancer Registry over the five years 2010 to 2014, as cited in the Ministry of Health and Social Services' 2017 plan.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "Cases reported, 2010 to 2014", numeric: true },
            { key: "share", label: "Share" },
          ],
          rows: [
            { site: "Breast (women)", cases: 1579, share: "27% of cancers in women" },
            { site: "Prostate", cases: 1128, share: "24% of cancers in men" },
            { site: "Cervix", cases: 1118, share: "19.4% of cancers in women" },
          ],
          note: "Five-year totals, so about 316 breast, 226 prostate and 224 cervical cancers a year. These are the three counts the ministry's plan quotes from the registry; OnCo did not find the registry's own 2010 to 2014 report online. A registry counts new cases, not deaths, and this one says it has no active case finding.",
          sources: [L_NCD, L_AFCRN],
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
          title: "About USD 397 a person on health in 2023, with 7.5% paid out of pocket",
          plain:
            "Namibia spent about 397 US dollars a person on health in 2023. Government paid 58.5% of it and households paid 7.5% out of their own pockets, according to WHO's health expenditure figures as published by the World Bank.",
          detail:
            "The World Bank's series, from WHO's Global Health Expenditure Database, gives current health spending of USD 450 per person in 2021, 419 in 2022 and 397 in 2023; out-of-pocket spending of 7.3%, 7.5% and 7.5% of current health spending in those years; and domestic government spending of 63.9%, 60.3% and 58.5%. The rest is external funding and private spending other than out-of-pocket payments; the series cited here do not break that remainder down. These are national averages: they do not show what a family without medical aid pays when someone needs cancer treatment, and OnCo did not find a source that sets out the fees state hospitals charge cancer patients.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Namibia", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Namibia", url: WB_CHE },
            { label: "World Bank: domestic general government health expenditure, % of current health expenditure, Namibia", url: WB_GOV },
          ],
        },
        {
          id: "medical-aid",
          title: "State and private patients, and a charity that helps patients without medical aid or with low income",
          plain:
            "The registry's page describes cancer patients in Namibia as either state or private. The Cancer Association of Namibia says it gives financial help to patients without medical aid and to those with little or no income, lends equipment free of charge and runs interim homes for cancer patients.",
          detail:
            "The registry's page, updated in May 2017, says all cancer patients, private or state, are meant to be sent to the Dr A.B. May Cancer Care Centre or the Namibia Oncology Centre for assessment. The Cancer Association's page lists the House Acacia interim home for adults and the CHICA interim home in Windhoek, loans of hospital beds, wheelchairs, commodes and oxygen free of charge, and supplies such as stoma products and prostheses sold at cost. The ministry's 2017 plan set an objective of having non-communicable diseases fully covered by medical aid schemes. An analysis of the 2013 Demographic and Health Survey found that women with health insurance were more likely to have been screened for breast cancer (odds ratio 1.62). OnCo could not read what the public servants' medical aid scheme, PSEMAS, pays for cancer care: the Ministry of Finance's page did not answer.",
          links: [L_CAN, L_AFCRN, L_NCD, { label: "Kangmennaang and colleagues: breast cancer screening and health insurance in Namibia (Global Health Promotion, 2019)", url: DOI_KANGMENNAANG }],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator",
      cards: [
        {
          id: "nmrc",
          title: "The Namibia Medicines Regulatory Council registers medicines under a 2003 Act",
          plain:
            "Medicines in Namibia, including cancer medicines, are registered by the Namibia Medicines Regulatory Council, set up under the Medicines and Related Substances Control Act of 2003. OnCo read the Act but could not reach the Council's own website.",
          detail:
            "The Act (No. 13 of 2003) describes itself as providing for the establishment of a Namibia Medicines Regulatory Council, for the registration of medicines intended for human and for animal use, and for the control of medicines and scheduled substances. Section 2 says the Medicines Control Council set up under the 1965 Act continues to exist under the new name. WHO's August 2026 list of regulators operating at maturity level 3 or 4 does not include Namibia. The African Union's list of 19 September 2023 records that Namibia ratified the treaty establishing the African Medicines Agency on 19 January 2021 and deposited it on 18 February 2021. The Council's web address did not resolve on 16 November 2026, so this page says nothing about its current registration procedures, timelines or how it authorises clinical trials.",
          links: [
            { label: "Medicines and Related Substances Control Act 2003 (Act No. 13 of 2003), text on WIPO Lex", url: ACT_2003 },
            { label: "WHO: list of national regulatory authorities operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML3 },
            { label: "African Union: signatures and ratifications of the African Medicines Agency treaty (19 September 2023, PDF)", url: AMA },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: L_WHO_CX,
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination began in August 2025, for girls aged 9 to 14",
          plain:
            "Namibia's Ministry of Health and Social Services launched a national HPV vaccination campaign in August 2025 for about 232,000 girls aged 9 to 14 in all 14 regions. WHO's figures for 2025 put first-dose coverage of the programme's target group at 34%.",
          detail:
            "WHO's Africa office reported on 12 September 2025 that around 65,000 girls were vaccinated in the first two weeks of the campaign, which ran from 4 to 15 August 2025, and that WHO had supported the national HPV vaccine introduction plan. WHO's immunisation database marks the HPV vaccine as not introduced in Namibia for 2022 to 2024 and introduced in 2025. Its coverage row for 2025 (programme coverage, first dose, girls) is 34%, from 70,886 doses against a target of 210,621 girls; the row for the last dose shows the same 34%. WHO's 2021 cervical cancer profile, written before the campaign, recorded that HPV vaccination was not in the national schedule, and the ministry's 2017 plan had set a target of 95% coverage from a baseline of zero.",
          links: [
            { label: "WHO Africa: Namibia rolls out human papillomavirus vaccination to help end cervical cancer (12 September 2025)", url: WHO_AFRO_HPV },
            { label: "WHO: HPV vaccination coverage rows for Namibia (immunisation data API)", url: WHO_HPV_API },
            { label: "WHO: vaccine introduction rows for Namibia (immunisation data API)", url: WHO_INTRO_API },
            L_WHO_CX,
            L_NCD,
          ],
        },
        {
          id: "cervical-screening",
          title: "Cervical screening: no national programme in WHO's 2021 profile; screen-and-treat by visual inspection since 2018",
          plain:
            "WHO's 2021 profile recorded no national cervical screening programme in Namibia, with 29% of women aged 30 to 49 screened in the previous five years. In 2018 the ministry introduced a screen-and-treat approach using visual inspection, with a focus on women living with HIV.",
          detail:
            "WHO's 2021 cervical cancer profile gives 39% of women aged 30 to 49 as ever screened and 29% as screened in the last five years (2019), and records no national programme, no national guidelines on managing cervical cancer and no clearly defined referral system in 2021. WHO's 2020 cancer profile likewise recorded no cervical or breast screening programme in 2019. A paper in PLoS One describes the screen-and-treat approach the ministry introduced in 2018, using visual inspection with acetic acid and treatment by cryotherapy or thermocoagulation: from October 2018 to March 2020 the programme carried out 14,786 screenings in seven of the country's 14 regions, and among 8,150 women screened for the first time, 17% of women living with HIV and 15% of HIV-negative women screened positive. The ministry's 2017 plan, citing the 2013 Demographic and Health Survey, said 25% of women aged 15 to 49 had had a cervical examination. OnCo did not find a more recent national coverage figure.",
          links: [
            L_WHO_CX,
            L_WHO_2020,
            { label: "Korn and colleagues: Cervical cancer screening and treatment, HIV infection, and age in seven regions of Namibia (PLoS One, 2022)", url: DOI_KORN },
            L_NCD,
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in Namibia",
      cards: [
        {
          id: "centres",
          title: "Two cancer centres, one public and one private, and an oncology service being built up at Oshakati",
          plain:
            "The public Dr A.B. May Cancer Care Centre is part of Windhoek Central Hospital, and the private Namibia Oncology Centre opened in 2015. The health minister said in 2026 that the country has seven specialist oncologists, one of them in the public sector.",
          detail:
            "The registry's page, updated in May 2017, names the two centres as the places to which all cancer patients are meant to be sent, and says a cancer centre had recently opened at Oshakati Intermediate Hospital and that Paramount Hospital and GVI Oncology also collect data and refer patients. It lists the Namibia Oncology Centre after Windhoek's private hospitals but does not give its address. The public table of the IAEA's Directory of Radiotherapy Centres lists two radiotherapy centres in Namibia, both in Windhoek: the radiation oncology department of Windhoek Central Hospital, with two high-energy photon and electron beam units and one brachytherapy unit (entry last updated in 2024), and the Namibia Oncology Centre, with one such beam unit and no brachytherapy (entry last updated in 2018). The Namibian reported on 4 February 2026 that the minister, Esperance Luvindao, said six of the seven specialist oncologists work privately, that four more were training abroad, three of them for Oshakati Intermediate Hospital, which she placed in the northern regions, and that the ministry planned to establish oncology services at Oshakati during the year, cut waiting times for treatment to at most six weeks and buy a new brachytherapy machine. WHO's 2020 profile recorded pathology services as generally available and community or home-based palliative care as generally not available in 2019.",
          links: [L_AFCRN, L_DIRAC, { label: "The Namibian: Only one public oncologist for Namibia (4 February 2026)", url: NAMIBIAN_FEB_2026 }, L_WHO_2020],
        },
        {
          id: "plan",
          title: "A plan against non-communicable diseases ran to 2022; a national cancer control plan was being prepared in 2026",
          plain:
            "Namibia's published strategy that covers cancer is its plan against non-communicable diseases for 2017/18 to 2021/22. In June 2026 the minister opened a review mission from WHO, the IAEA and IARC, and said its recommendations would help shape a National Cancer Control Plan.",
          detail:
            "WHO's 2020 profile recorded an operational integrated plan for non-communicable diseases and cancer management guidelines in 2019, and gave no entry for a national cancer control plan. A search of the ICCP portal for Namibia on 16 November 2026 returned five items: the 2017 plan, WHO's 2014 and 2020 cancer profiles, its 2021 cervical profile and a study website; none is a cancer plan. The 2017 plan lists vaccination of girls against HPV, cervical screening of women aged 30 to 49, hepatitis B immunisation and basic palliative care in its table of measures WHO recommends against cancer. The Namibian reported on 4 February 2026 that the minister said a comprehensive national cancer control programme was being finalised and expected by June, and on 9 June 2026 that she opened the imPACT review mission. OnCo found no published plan and does not know whether one has since been adopted.",
          links: [
            L_NCD,
            L_WHO_2020,
            { label: "ICCP portal: resources for Namibia (search)", url: ICCP_SEARCH },
            { label: "The Namibian: Only one public oncologist for Namibia (4 February 2026)", url: NAMIBIAN_FEB_2026 },
            { label: "The Namibian: Namibia could face 6 300 cancer cases annually by 2045 (9 June 2026)", url: NAMIBIAN_JUN_2026 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Namibia", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Namibia",
          plain:
            "None of the trials in OnCo's records lists Namibia among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search for a study that is open now.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Namibia. A query of the ClinicalTrials.gov interface the same day for cancer studies with a location in Namibia also returned none. Published research from the country that OnCo has read is observational: the breast cancer cohort at Windhoek Central Hospital, the Namibian part of the African Breast Cancer: Disparities in Outcomes study, the screen-and-treat programme data from seven regions and the two reviews of childhood cancer. The registry's incidence reports are listed on its network page, but OnCo did not find them online and has not read them.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Namibia", url: CTGOV },
            { label: "Boucheron and colleagues: Analysis of the Breast Cancer Journey in Namibia (JAMA Network Open, 2023)", url: DOI_BOUCHERON },
            L_AFCRN,
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-government",
      title: "Government sources that did not answer: the ministry, the medicines regulator and the public servants' medical aid scheme",
      plain:
        "OnCo could not read the websites of the Ministry of Health and Social Services, the Namibia Medicines Regulatory Council or the Ministry of Finance's medical aid page, so this page has no official account of hospital fees, medicine registration procedures or what PSEMAS covers for cancer.",
      detail:
        "On 16 November 2026 the regulator's address (nmrc.com.na) did not resolve, the Ministry of Finance's medical aid page returned an error code (HTTP 468), a second address for it did not resolve, and the health ministry's site (mhss.gov.na) returned the same error code. OnCo does not get round a refusal. A future pass should read the regulator's registration guidelines, the PSEMAS benefit schedule and the ministry's fee rules from a browser. For now, patients can ask the Cancer Association of Namibia, which says it offers a welfare service to all cancer patients and financial help to those without medical aid.",
      links: [L_CAN, { label: "Medicines and Related Substances Control Act 2003, text on WIPO Lex", url: ACT_2003 }],
    },
    {
      id: "gap-registry-reports",
      title: "The registry's own reports, and anything after 2014, were not found online",
      plain:
        "The registry's page lists five incidence reports, the latest for 2010 to 2014, and the Cancer Association mentions an interim report for 2015 to 2017 and a 1995 to 2024 report due in 2026. OnCo found none of them online and has used only the three counts quoted in the ministry's 2017 plan.",
      detail:
        "The registry page was last updated on 8 May 2017 and should not be read as a current description of how cases are collected. A chart of incidence by period in the ministry's plan could not be read reliably from the PDF text and is not quoted here. The 1995 to 2024 report, when it appears, should replace the table on this page; the Cancer Association of Namibia is the place to ask for it.",
      links: [L_AFCRN, L_CAN, L_NCD],
    },
    {
      id: "gap-plan-and-capacity",
      title: "Not confirmed: the national cancer control plan, current radiotherapy machines by hospital, and waiting times",
      plain:
        "OnCo found news reports that a national cancer control plan was being prepared in 2026 but no published plan, and no primary source for which machines are working today or how long patients wait for treatment.",
      detail:
        "The IAEA's public table lists units by centre, with one entry last updated in 2024 and the other in 2018, and does not say which units are in use; machine makes and models are not shown to the public. The statements about oncologists and plans for Oshakati are the minister's, as reported by a newspaper, not figures OnCo could check against a ministry document. WHO's 2020 profile was compiled from 2019 data and predates the HPV campaign. A future pass should look for the imPACT review's published findings and the plan itself on the ICCP portal.",
      links: [L_DIRAC, { label: "ICCP portal: resources for Namibia (search)", url: ICCP_SEARCH }, L_WHO_2020],
    },
  ],
  institutions: [
    "namibia-national-cancer-registry",
    "cancer-association-of-namibia",
    "windhoek-central-hospital-oncology",
    "namibia-oncology-centre",
    "namibia-ministry-of-health",
    "zuzu-holding-hands-cancer-foundation",
    "who",
    "iarc",
    "iaea",
  ],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-boucheron-breast-cancer-journey-namibia-jamanetwopen-2023",
    "paper-korn-cervical-screen-and-treat-namibia-plosone-2022",
    "paper-kaholongo-paediatric-cancer-windhoek-plosone-2023",
    "paper-stefan-childhood-cancer-incidence-namibia-pamj-2014",
  ],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, the African Cancer Registry Network's page for the national registry, the Cancer Association of Namibia's page, the ministry's 2017 plan against non-communicable diseases, WHO's 2020 and 2021 country profiles and immunisation data, a WHO Africa report on the HPV campaign, the 2003 medicines Act, WHO's list of regulators, the African Union's treaty list, the IAEA's public radiotherapy table, the World Bank's health expenditure series, two newspaper reports and the abstracts of five papers resolved through Europe PMC.",
  verify:
    "The registry's description dates from 2017, WHO's profile from 2019 data, and several government sites could not be read. Check with the Ministry of Health and Social Services, the treating hospital or the Cancer Association of Namibia before relying on anything here.",
  verifyLinks: [L_AFCRN, L_IARC, L_CAN],
};

import type { CountryDive } from "@/data/country-dive";

/**
 * Timor-Leste deep dive: the hand-written cards for /countries/tl/ (wave 15). Timor-Leste has little published cancer
 * data of its own, so this page keeps to what was read as raw text on 16 November 2026 and says where nothing was
 * found: IARC's GLOBOCAN 2024 fact sheet (PDF text), WHO's Cancer Country Profile 2020 and cervical cancer profile
 * 2021 (PDF text), the Ministry of Health's two non-communicable disease plans on the ICCP portal (PDF text), WHO
 * Timor-Leste's news pages of 2022 to 2024, UNICEF's and NCIRS's pages on HPV vaccination and screening, the national
 * news agency Tatoli's reports of February and May 2023, the Timor-Leste Electronic Single Window's page on the
 * Ministry of Health, Decree-Law No. 12/2004 (text on WIPO Lex), WHO's lists of regulators, WHO's Global Health
 * Observatory and immunisation data APIs, IAEA DIRAC's public country table, the ClinicalTrials.gov API and one paper
 * resolved through Europe PMC. The Ministry of Health's own site answered 502 and is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/626-timor-leste-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/tls-2020.pdf";
const WHO_CX = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-tls-2021-country-profile-en.pdf";
const NCD_PLAN_2018 = "https://www.iccp-portal.org/sites/default/files/plans/TLS_B3_Multisectorial%20action%20plan%20for%20NCD%20prevention%20and%20Control%28complete%29.pdf";
const NCD_PLAN_2014 = "https://www.iccp-portal.org/sites/default/files/plans/TLS_B3_Final%20NCD%20Strategy%20cum%20Action%20Plan%202014-18%20%28indicator%20on%20page%2021-25%29.pdf";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=Timor";
const WHO_HNGV_2022 = "https://www.who.int/timorleste/news/detail/03-10-2022-improving-women-s-health-through-a-cervical-cancer-screening-facility";
const WHO_BAUCAU_2023 = "https://www.who.int/timorleste/news/detail/16-10-2023-baucau-gets-a-new-centre-for-cervical-cancer-screening-and-management";
const WHO_HPV_LAUNCH = "https://www.who.int/timorleste/news/detail/19-07-2024-timor-leste-launches-hpv-vaccine-for-11-14-years-girls";
const WHO_HPV_DRIVE = "https://www.who.int/timorleste/news/detail/16-10-2024-timor-leste-s-rapid-hpv-vaccine-drive--over-90--girls-immunized-in-just-3-weeks";
const WHO_2024 = "https://www.who.int/timorleste/news/detail/24-12-2024-timor-leste-s-all-out-effort-towards-cervical-cancer-elimination-in-2024";
const UNICEF_HPV = "https://www.unicef.org/timorleste/press-releases/61374-girls-timor-leste-receive-hpv-vaccine-combat-cervical-cancer";
const NCIRS_CLINIC = "https://www.ncirs.org.au/timor-leste-launches-first-same-day-hpv-screen-and-treat-clinic";
const TATOLI_ONCOLOGY = "https://en.tatoli.tl/2023/05/30/moh-launches-medical-oncology-unit-at-national-hospital/15/";
const TATOLI_REGULATORY = "https://en.tatoli.tl/2023/02/14/who-and-tga-australia-will-offer-training-to-200-professionals-on-the-drug-control-system/13/";
const TILESW = "https://tilesw.asycuda.org/en/node/193";
const DECREE_12_2004 = "https://www.wipo.int/wipolex/en/legislation/details/10844";
const WHO_ML = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const WHO_CRP = "https://extranet.who.int/prequal/sites/default/files/document_files/Country_List-23August2023.pdf";
const GHO_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'TLS'";
const GHO_CHE = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'TLS'";
const GHO_GOV = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'TLS'";
const GHO_EXT = "https://ghoapi.azureedge.net/api/GHED_EXTCHE_SHA2011?$filter=SpatialDim%20eq%20'TLS'";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'TLS'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'TLS'%20and%20contains(DESCRIPTION,'HPV')";
const BREAST_PAPER = "https://doi.org/10.1111/ans.15720";
const DIRAC = "https://dirac.iaea.org/";
const CTGOV = "https://clinicaltrials.gov/search?country=Timor-Leste&cond=cancer";
const MOH = "https://ms.gov.tl/";

export const TL_DIVE: CountryDive = {
  iso2: "TL",
  iso3: "TLS",
  name: "Timor-Leste",
  flag: "🇹🇱",
  asOf: "2026-11-16",
  title: "Cancer in Timor-Leste",
  description:
    "Cancer in Timor-Leste from international and national sources: IARC's estimate of 1,593 new cancers and 1,024 deaths in 2024, modelled from neighbouring countries' rates, breast and lung cancer leading, a medical oncology unit at the national hospital in Dili whose launch the national news agency reported in May 2023, HPV vaccination of girls introduced in 2024, cervical screening centres in Dili and Baucau, no cancer plan on the ICCP portal beyond two non-communicable disease plans, households paying 7.0% of health spending out of pocket in 2023, and no trial in OnCo's records with a site in the country.",
  lede:
    "The national news agency Tatoli reported on 30 May 2023 that the Ministry of Health had launched a medical oncology unit for chemotherapy at Hospital Nacional Guido Valadares in Dili. WHO's country office reports that HPV vaccination for girls was introduced in 2024 and that cervical screening centres were working in Dili and Baucau that year. IARC's cancer figures for the country are modelled from neighbouring countries' rates, not counted, and OnCo found no published report from a Timorese cancer registry.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Timor-Leste is 1,593 new cancers and 1,024 deaths, an age-standardised incidence of 147.9 per 100,000 (140.7 in men, 158.8 in women) and an age-standardised mortality of 97.0. These are modelled figures, not counts: the fact sheet names no country-specific data source for incidence and gives its method as \"Rates based on incidence estimates or registry data from neighbouring countries\", with mortality as national incidence estimates applied to model-based mortality-to-incidence ratios. WHO's 2020 profile, which gave 660 cases and 460 deaths for 2018, warned that its estimates had a high degree of uncertainty because they were not based on a population-based registry or on national mortality data. Read these numbers as a rough scale, and do not read the difference between the 2018 and 2024 figures as a trend.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer is estimated to look like in Timor-Leste",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Timor-Leste (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 1,600 new cancers a year by IARC's estimate, modelled from neighbouring countries",
          plain:
            "IARC estimates 1,593 new cancers in Timor-Leste in 2024, 865 of them in women, and 1,024 cancer deaths. These are modelled figures built from neighbouring countries' rates, not counts. Breast cancer is estimated to be the commonest cancer and lung cancer the commonest cause of cancer death.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 287 breast cancers (116 deaths), 183 lung cancers (173 deaths), 161 colorectal cancers (95 deaths), 118 prostate cancers (52 deaths), 88 cervical cancers (45 deaths) and 87 liver cancers (87 deaths). The risk of developing a cancer before age 75 is 15.3%, and an estimated 3,042 people are living within five years of a diagnosis. In men the leading cancers are lung, prostate and colorectal; in women, breast, cervical and colorectal. WHO's 2020 profile estimated 51 cancers a year in children aged 0 to 14.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Timor-Leste (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, Timor-Leste (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "registry-status",
          title: "No published registry report; a 2023 news report cites a cancer register at the national hospital",
          plain:
            "OnCo found no published report from a cancer registry in Timor-Leste. A May 2023 report by the national news agency cites a cancer register at the national hospital with about 1,000 patients over five years.",
          detail:
            "The Ministry of Health's non-communicable disease plan for 2018 to 2021 recorded the absence of any disease registry, including for cancer, and planned a hospital-based cancer registry at the national hospital with IARC and WHO. WHO's 2020 profile recorded \"no information\" on a population-based registry for 2019 and no coverage of death registration; WHO's 2021 cervical cancer profile records that a population-based registry exists. Tatoli's report on the opening of the oncology unit says that, according to the national cancer register of the hospital, about 1,000 cancer patients were registered in the previous five years, with breast, thyroid and cervical cancer the most frequent. OnCo could not read that register itself.",
          links: [
            { label: "Ministry of Health: multisectoral action plan for non-communicable diseases 2018 to 2021 (PDF, ICCP portal)", url: NCD_PLAN_2018 },
            { label: "WHO: Cancer Country Profile 2020, Timor-Leste (PDF)", url: WHO_PROFILE },
            { label: "WHO: cervical cancer country profile 2021, Timor-Leste (PDF)", url: WHO_CX },
            { label: "Tatoli: Ministry of Health launches medical oncology unit at the national hospital (30 May 2023)", url: TATOLI_ONCOLOGY },
          ],
        },
      ],
      tables: [
        {
          id: "tl-globocan-sites",
          title: "The six commonest cancers in Timor-Leste, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024, modelled from neighbouring countries' rates.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 287, deaths: 116 },
            { site: "Lung", cases: 183, deaths: 173 },
            { site: "Colorectum", cases: 161, deaths: 95 },
            { site: "Prostate", cases: 118, deaths: 52 },
            { site: "Cervix uteri", cases: 88, deaths: 45 },
            { site: "Liver", cases: 87, deaths: 87 },
          ],
          note: "OnCo found no published Timorese registry figures to set beside these. They are modelled estimates, not counts.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Timor-Leste (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care",
      cards: [
        {
          id: "spending",
          title: "About USD 144 a person on health in 2023, with 7.0% paid out of pocket",
          plain:
            "WHO's health expenditure figures give Timor-Leste's health spending as about 144 US dollars a person in 2023. Households paid 7.0% of it out of pocket, the government 77.7% and external donors 15.3%.",
          detail:
            "WHO's Global Health Observatory gives current health expenditure per person of USD 132.08 in 2021, 174.92 in 2022 and 144.21 in 2023, and out-of-pocket spending of 5.9%, 5.5% and 7.0% of current health spending in those years. External funding was 39.2% of health spending in 2016 and 15.3% in 2023. These figures cover all health care. A low out-of-pocket share does not show that cancer treatment is available: OnCo did not find or read a source on what the public system pays for when a patient is treated for cancer at home or sent abroad.",
          links: [
            { label: "WHO Global Health Observatory: out-of-pocket share of current health expenditure, Timor-Leste (data API)", url: GHO_OOP },
            { label: "WHO Global Health Observatory: current health expenditure per person, Timor-Leste (data API)", url: GHO_CHE },
            { label: "WHO Global Health Observatory: government share of current health expenditure, Timor-Leste (data API)", url: GHO_GOV },
            { label: "WHO Global Health Observatory: external share of current health expenditure, Timor-Leste (data API)", url: GHO_EXT },
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
          id: "dnfm",
          title: "Medicines are registered by a directorate of the Ministry of Health",
          plain:
            "The Timor-Leste Electronic Single Window, the country's customs and trade portal, says registration and import authorisation of medicines fall under the Ministry of Health's National Directorate of Pharmacy and Medicines, known as DNFM, and that a separate public body, SAMES, manages and clears imported medicines and medical equipment. Its page is undated and carries figures to June 2023; OnCo could not read the Ministry's own account.",
          detail:
            "The Timor-Leste Electronic Single Window's page on the Ministry describes the directorate's role and that of SAMES, and of a Licensing Cabinet that licenses health activities. WHO's list of authorities taking part in its collaborative registration procedure, dated 23 August 2023, lists the directorate from 7 April 2022. Tatoli, in a report published on 14 February 2023 (its own dateline reads 2022), described a WHO overview that regulatory functions were spread across four bodies: the directorate for registration and market surveillance, the General Health Inspectorate for inspection, a licensing cabinet for establishments, and the National Health Laboratory for quality testing. Decree-Law No. 12/2004 governs the import, storage and sale of medicines. Timor-Leste is not on WHO's list of regulators operating at maturity level 3 or 4, dated August 2026 and read on 16 November 2026; that is a statement about the list, not a judgement of the directorate's work.",
          links: [
            { label: "Timor-Leste Electronic Single Window: Ministry of Health", url: TILESW },
            { label: "WHO: authorities participating in the collaborative procedure, 23 August 2023 (PDF)", url: WHO_CRP },
            { label: "Tatoli: WHO and Australia's regulator to train staff on the drug control system (14 February 2023)", url: TATOLI_REGULATORY },
            { label: "Decree-Law No. 12/2004 on Pharmaceutical Activities (WIPO Lex)", url: DECREE_12_2004 },
            { label: "WHO: regulators operating at maturity level 3 and 4 (PDF)", url: WHO_ML },
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
          id: "hpv",
          title: "HPV vaccination began in 2024",
          plain:
            "Timor-Leste introduced the HPV vaccine in July 2024 and vaccinated girls aged 11 to 14 through schools that September and October. WHO's figures give first-dose programme coverage in girls of 99% for 2024 and 40% for 2025.",
          detail:
            "WHO's country office reports that the Prime Minister launched the vaccine into the routine programme on 19 July 2024, with WHO's representative describing single-dose vaccination as safe and effective, and that in three weeks from 23 September the Ministry of Health and partners vaccinated 56,350 girls aged 11 to 14 against a target of about 62,000. The introduction was supported by WHO, UNICEF, Gavi and the Australian Government, and UNICEF's release says the vaccine is available to eligible girls at no cost. WHO's immunisation data record 61,820 first doses against a target of 61,374 in 2024, and 6,252 against a target of 15,503 in 2025; the source does not explain the lower 2025 figure. WHO's 2021 profile had recorded HPV vaccination as not in the national schedule.",
          links: [
            { label: "WHO Timor-Leste: HPV vaccine launched for girls aged 11 to 14 (19 July 2024)", url: WHO_HPV_LAUNCH },
            { label: "WHO Timor-Leste: over 90% of girls immunised in three weeks (16 October 2024)", url: WHO_HPV_DRIVE },
            { label: "UNICEF Timor-Leste: 61,374 girls to receive HPV vaccine", url: UNICEF_HPV },
            { label: "WHO immunisation data: HPV programme coverage, Timor-Leste (data API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: HPV vaccine introduction, Timor-Leste (data API)", url: WHO_INTRO_API },
            { label: "WHO: cervical cancer country profile 2021, Timor-Leste (PDF)", url: WHO_CX },
          ],
        },
        {
          id: "cervical-screening",
          title: "Cervical screening centres in Dili and Baucau since 2022",
          plain:
            "WHO's country office reports that a centre for screening and treating cervical precancer opened at the national hospital in Dili in 2022 and a second at Tirilolo Hospital in Baucau in 2023. NCIRS, an Australian research centre, reported a same-day HPV test-and-treat clinic at Vera Cruz Community Health Centre in Dili in 2025.",
          detail:
            "WHO's country office reports that the national hospital's centre offers visual inspection with acetic acid, colposcopy and thermal ablation, and that by December 2024 three colposcopy centres had together screened over 900 women and found 25 precancerous cases, most treated locally and one referred abroad. Nearly 400 women had HPV testing in 2024. NCIRS reported in May 2025 that the Vera Cruz clinic, run by the Ministry of Health with Australian support, offers free HPV testing on self-collected samples to women aged 30 to 49 with results in one to two hours. Before these services, a risk factor survey (STEPS) cited in the 2018 plan found that 1.1% of women aged 30 to 49 had ever been screened.",
          links: [
            { label: "WHO Timor-Leste: a cervical cancer screening facility at the national hospital (3 October 2022)", url: WHO_HNGV_2022 },
            { label: "WHO Timor-Leste: Baucau gets a new centre for cervical cancer screening (16 October 2023)", url: WHO_BAUCAU_2023 },
            { label: "WHO Timor-Leste: cervical cancer elimination efforts in 2024 (24 December 2024)", url: WHO_2024 },
            { label: "NCIRS: Timor-Leste launches same-day HPV screen-and-treat clinic (1 May 2025)", url: NCIRS_CLINIC },
            { label: "Ministry of Health: multisectoral action plan for non-communicable diseases 2018 to 2021 (PDF, ICCP portal)", url: NCD_PLAN_2018 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What stands out",
      title: "What stands out in Timor-Leste",
      cards: [
        {
          id: "oncology-unit",
          title: "A medical oncology unit at the national hospital, launched in May 2023 by one news report",
          plain:
            "Tatoli, the national news agency, reported on 30 May 2023 that the Ministry of Health had that day launched a medical oncology unit for chemotherapy at Hospital Nacional Guido Valadares in Dili, which it called the first. This page rests on that one report for the unit, and OnCo found no later account of it.",
          detail:
            "Tatoli's report says three oncologists, four doctors, three pharmacists and three nurses had been trained at Siloam Hospitals in Indonesia, and that the head of the unit said it would start with patients who had been treated abroad and needed to continue chemotherapy at home. The Minister said the government would buy equipment and medicines for the unit. OnCo found no later account of how many patients the unit treats or which medicines it holds. Before it opened, WHO's 2021 cervical cancer profile had recorded none of a cancer centre, pathology services, cancer surgery, chemotherapy or radiotherapy as generally available.",
          links: [
            { label: "Tatoli: Ministry of Health launches medical oncology unit at the national hospital (30 May 2023)", url: TATOLI_ONCOLOGY },
            { label: "WHO: cervical cancer country profile 2021, Timor-Leste (PDF)", url: WHO_CX },
          ],
        },
        {
          id: "radiotherapy",
          title: "No radiotherapy centre is listed, and some patients are treated abroad",
          plain:
            "IAEA's DIRAC public country table has no entry for Timor-Leste, and WHO's 2021 profile recorded radiotherapy as not generally available. Sources from 2018 to 2024 describe patients being treated abroad, without naming where.",
          detail:
            "The Ministry's 2018 to 2021 plan said that to reduce its dependence on other countries Timor-Leste should start developing its own dialysis and oncology services, including palliative care, and set cancer care at the national hospital as a target. The oncology unit's head spoke in 2023 of patients who had undergone treatment abroad, and WHO's 2024 account of cervical screening mentions one woman referred abroad. None of these sources names the receiving countries or hospitals or says who pays, and OnCo does not fill that in. The absence of a DIRAC entry is not proof that no machine exists.",
          links: [
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: DIRAC },
            { label: "WHO: cervical cancer country profile 2021, Timor-Leste (PDF)", url: WHO_CX },
            { label: "Ministry of Health: multisectoral action plan for non-communicable diseases 2018 to 2021 (PDF, ICCP portal)", url: NCD_PLAN_2018 },
            { label: "Tatoli: Ministry of Health launches medical oncology unit at the national hospital (30 May 2023)", url: TATOLI_ONCOLOGY },
            { label: "WHO Timor-Leste: cervical cancer elimination efforts in 2024 (24 December 2024)", url: WHO_2024 },
          ],
        },
        {
          id: "plans",
          title: "Cancer sits inside the non-communicable disease plans; no separate cancer plan was found",
          plain:
            "A search of the ICCP portal on 16 November 2026 returned two Timorese plans, both for non-communicable diseases in general: a strategy and action plan for 2014 to 2018 and a multisectoral action plan for 2018 to 2021. It returned no national cancer control plan.",
          detail:
            "The 2018 to 2021 plan's actions for cancer were to set up cancer care including palliative therapy at the national hospital, establish a hospital-based cancer registry there, develop palliative care standards, and scale up community screening for common cancers. WHO's 2020 profile recorded an operational integrated plan for non-communicable diseases in 2019 and \"n/a\" for a national cancer control plan. Both plans have passed their end dates, and OnCo found no successor. Tatoli reported that the Minister launched the national hospital's standard treatment guidelines in May 2023, and WHO reports that standard operating procedures for screening and managing cervical precancer were launched in July 2024.",
          links: [
            { label: "ICCP portal: documents returned for Timor-Leste", url: ICCP_SEARCH },
            { label: "Ministry of Health: multisectoral action plan for non-communicable diseases 2018 to 2021 (PDF, ICCP portal)", url: NCD_PLAN_2018 },
            { label: "Ministry of Health: non-communicable disease strategy and action plan 2014 to 2018 (PDF, ICCP portal)", url: NCD_PLAN_2014 },
            { label: "WHO: Cancer Country Profile 2020, Timor-Leste (PDF)", url: WHO_PROFILE },
            { label: "WHO Timor-Leste: cervical cancer elimination efforts in 2024 (24 December 2024)", url: WHO_2024 },
          ],
        },
        {
          id: "breast",
          title: "Breast cancer is found late, and a charity helps women reach the hospital",
          plain:
            "A study of a year of breast clinics at the national hospital, from September 2016, found that 86% of women with a malignant biopsy had locally advanced disease. The Alola Foundation's HALIKU programme teaches the signs of breast cancer and supports women through treatment.",
          detail:
            "The study, in the ANZ Journal of Surgery in 2020, counted 444 women with a clinical diagnosis of breast disease in twelve months, average age 33.7 years; of the 116 who had a biopsy, 62.6% were malignant or hyperplastic. Its authors called for a national cancer registry and for funding to improve early presentation. The Alola Foundation's own page says anyone thought to have cancer must travel to the national hospital in Dili, which is far for people in Los Palos, Viqueque, Covalima, Bobonaro and Oecusse, and that it trained 50 health workers in clinical breast examination in September 2019.",
          links: [
            { label: "Fordyce et al., breast disease in Timor-Leste (ANZ J Surg 2020)", url: BREAST_PAPER },
            { label: "Alola Foundation: support to patients", url: "https://www.alolafoundation.org/support-to-patients/" },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Timor-Leste", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Timor-Leste",
          plain:
            "None of the trials in OnCo's records lists Timor-Leste among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Timor-Leste. A query of the registry itself that day for cancer studies with a site in the country returned none. A Europe PMC search for papers with Timor-Leste or East Timor in the title and a cancer term returned one study, of palliative care practice among intensive care nurses; a wider search added the 2020 breast disease study recorded here.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Timor-Leste", url: CTGOV },
            { label: "Fordyce et al., breast disease in Timor-Leste (ANZ J Surg 2020)", url: BREAST_PAPER },
            { label: "Haroen et al., palliative care practice among intensive care nurses in Timor-Leste (Nurs Open 2026)", url: "https://doi.org/10.1002/nop2.71009" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-ministry",
      title: "The Ministry of Health's site could not be read",
      plain:
        "The Ministry of Health's site answered with a gateway error (502) on 16 November 2026, so nothing on this page comes from the Ministry's own web pages. Its plans were read from the copies on the ICCP portal.",
      detail:
        "Because of this, the account of the oncology unit rests on one report by the national news agency from May 2023, and the account of the medicines directorate on a trade portal, a WHO list and a news report. OnCo read no Ministry page on which cancer medicines are stocked, how referral abroad is decided or paid for, or what the oncology unit offers today. The national hospital's own website, which Tatoli said was launched in May 2023, was not read. A future pass should try the Ministry's site again and look for the hospital's site and its treatment guidelines.",
      links: [
        { label: "Ministry of Health, Timor-Leste (502 on 16 November 2026)", url: MOH },
        { label: "Tatoli: Ministry of Health launches medical oncology unit at the national hospital (30 May 2023)", url: TATOLI_ONCOLOGY },
      ],
    },
    {
      id: "gap-sources",
      title: "Sources not found or not usable for this page",
      plain:
        "OnCo did not find a national cancer control plan, a published registry report, an essential medicines list it could read, any source naming where patients are sent abroad, or a current account of pathology and palliative care services.",
      detail:
        "The health system table in WHO's 2020 profile does not pair its labels and values cleanly as text, so its figures for radiotherapy machines, pathology and staff are not used here; WHO's 2021 cervical cancer profile, which reads cleanly, is used instead. WHO's two profiles disagree on whether a population-based registry exists. Tatoli reported in August 2025 that a national medicines policy and essential medicines list were being promoted; OnCo did not find the list. UICC's member page for the Alola Foundation refused the request (406). To ask what is available now, contact Hospital Nacional Guido Valadares or WHO's country office in Dili.",
      links: [
        { label: "WHO: Cancer Country Profile 2020, Timor-Leste (PDF)", url: WHO_PROFILE },
        { label: "WHO: cervical cancer country profile 2021, Timor-Leste (PDF)", url: WHO_CX },
        { label: "Tatoli: WHO and the Ministry promote tools for medicine access and safety (11 August 2025)", url: "https://en.tatoli.tl/2025/08/11/who-and-moh-promote-key-tools-to-strengthen-medicine-access-and-safety-in-timor-leste/16/" },
        { label: "WHO Timor-Leste", url: "https://www.who.int/timorleste" },
      ],
    },
  ],
  institutions: ["hospital-nacional-guido-valadares", "timor-leste-ministry-of-health", "alola-foundation", "who", "iarc", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-fordyce-breast-disease-timor-leste-anzjs-2020"],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 and 2021 profiles, the Ministry of Health's non-communicable disease plans on the ICCP portal, WHO Timor-Leste's news pages, UNICEF, NCIRS, the national news agency Tatoli, the Electronic Single Window's page on the Ministry, WHO's health expenditure and immunisation data, WHO's lists of regulators, IAEA's DIRAC table and one paper resolved through Europe PMC. The Ministry of Health's own site could not be reached.",
  verify:
    "The cancer figures on this page are modelled estimates, and the account of treatment rests on a small number of reports from 2022 to 2025. Anyone seeking care should ask Hospital Nacional Guido Valadares or the Ministry of Health what is available now and how referral abroad is arranged.",
  verifyLinks: [
    { label: "WHO Timor-Leste", url: "https://www.who.int/timorleste" },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Timor-Leste (PDF)", url: IARC_FACTSHEET },
    { label: "WHO: Cancer Country Profile 2020, Timor-Leste (PDF)", url: WHO_PROFILE },
  ],
};

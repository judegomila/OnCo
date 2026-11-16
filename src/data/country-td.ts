import type { CountryDive } from "@/data/country-dive";

/**
 * Chad deep dive: the hand-written cards for /countries/td/ (wave 10). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Chad and its GLOBOCAN
 * 2022 fact sheet (read through the Internet Archive), WHO's cancer country profile 2020 and cervical cancer profile
 * 2021 for Chad (PDF text), the Ministry of Public Health's multisectoral non-communicable disease plan 2017 to 2021
 * and its 2022 national list of essential medicines (PDF text), Law No. 024/PR/2000 on pharmacy (WIPO Lex), WHO
 * Africa's page on the 2019 universal health coverage law, the World Bank's health expenditure series from its API,
 * WHO's immunisation data API, the African Cancer Registry Network's member pages, news pages from Alwihda Info,
 * Tchadinfos and the Times Kuwait, and the papers' abstracts through Europe PMC. Chad is a low-income country hosting
 * a refugee emergency in its east; the page sticks to what WHO, UN agencies, the government and peer-reviewed papers
 * state. Where a figure could not be read it is named under `gaps`.
 */
const IARC_2024 = "https://gco.iarc.who.int/media/globocan/factsheets/populations/148-chad-fact-sheet.pdf";
const IARC_2022_WB = "https://web.archive.org/web/20250529211947/https://gco.iarc.who.int/media/globocan/factsheets/populations/148-chad-fact-sheet.pdf";
const WHO_PROFILE_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/cancer-tcd-2020.pdf";
const WHO_CX_2021 = "https://www.iccp-portal.org/sites/default/files/plans/cervical-cancer-tcd-2021-country-profile-en.pdf";
const NCD_PLAN = "https://www.iccp-portal.org/sites/default/files/plans/TCD_B3_PLAN%20MULTISEC%20MNT.pdf";
const LNME_2022 = "https://www.afro.who.int/sites/default/files/2023-07/LNME%202022-Tchad%2001%2009%2022-1.pdf";
const PHARMACY_LAW = "https://www.wipo.int/wipolex/fr/legislation/details/9127";
const UHC_WHO = "https://www.afro.who.int/fr/publications/modeles-des-prestations-des-soins-pour-la-mise-en-oeuvre-de-la-couverture-sante";
const UHC_LAW_NEWS = "https://www.alwihdainfo.com/Tchad-adoption-de-la-loi-sur-la-couverture-sante-universelle_a73704.html";
const WB_OOP = "https://api.worldbank.org/v2/country/TCD/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_CHE = "https://api.worldbank.org/v2/country/TCD/indicator/SH.XPD.CHEX.PC.CD?format=json";
const WB_GOV = "https://api.worldbank.org/v2/country/TCD/indicator/SH.XPD.GHED.CH.ZS?format=json";
const WB_PHYS = "https://api.worldbank.org/v2/country/TCD/indicator/SH.MED.PHYS.ZS?format=json";
const PAMJ = "https://doi.org/10.11604/pamj.2025.51.72.47698";
const AFCRN_TD = "https://afcrn.org/index.php/membership/membership-list/175-chad-ndjamena";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'TCD'";
const WHO_HEPB_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'TCD'%20and%20startswith(ANTIGEN,'HEPB')";
const ALWIHDA_IAEA_2022 = "https://www.alwihdainfo.com/tchad-acceleration-de-la-construction-du-centre-de-radiotherapie-et-medecine-nucleaire-a110652/";
const ALWIHDA_PATHOLOGY = "https://www.alwihdainfo.com/tchad-ouverture-d-un-service-d-anatomopathologie-au-chu-la-renaissance-a135591/";
const TCHADINFOS_CNEC = "https://tchadinfos.com/?p=348769";
const TIMES_KUWAIT = "https://timeskuwait.com/?p=50250";
const IAEA_CHD6008 = "https://www.iaea.org/node/107844";
const UICC_ATCC = "https://www.uicc.org/membership/association-tchadienne-contre-le-cancer";
const UICC_ATFVC = "https://www.uicc.org/membership/association-tchadienne-des-femmes-vivants-avec-le-cancer";
const UICC_DONAMA = "https://www.uicc.org/membership/association-donama";
const WHO_RD_2026 = "https://www.afro.who.int/sites/default/files/2026-08/RD_Mission_Report_Chad_June2026%20Final-FR.pdf";
const CTGOV = "https://clinicaltrials.gov/search?country=Chad&cond=cancer";

export const TD_DIVE: CountryDive = {
  iso2: "TD",
  iso3: "TCD",
  name: "Chad",
  flag: "🇹🇩",
  asOf: "2026-11-11",
  title: "Cancer in Chad",
  description:
    "Cancer in Chad from WHO, IARC, government and peer-reviewed sources: IARC's estimate of 18,655 new cancers and 12,047 deaths in 2024, built on the N'Djamena cancer registry, with prostate, breast and cervical cancer leading; households paying 52% of health spending directly; a 2000 pharmacy law under which the Minister of Health authorises medicines; no national HPV vaccination or cervical screening programme in WHO's records; no radiotherapy machine in WHO's 2020 count; a first national cancer centre under construction in N'Djamena since June 2025; and why no trial in our records has a site in Chad.",
  lede:
    "IARC estimates 18,655 new cancers and 12,047 cancer deaths in Chad in 2024, with prostate cancer the commonest in men and breast and cervical cancer in women; the estimate rests on one registry in the capital, N'Djamena. Cancer care is concentrated in a few N'Djamena hospitals: a pathology service opened at CHU La Renaissance in 2024, and the first stone of a national cancer centre, financed by the Kuwait Fund with technical support from the IAEA, was laid in June 2025.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Chad is 18,655 new cancers and 12,047 deaths, an age-standardised incidence of 180.0 per 100,000 (198.8 in men, 166.8 in women) and mortality of 121.5. IARC's fact sheet gives its incidence method as subnational rates applied to the 2024 population, from a subnational registry; its GLOBOCAN 2022 sheet named that source as the N'djamena Cancer Registry, a single registry whose most recent rates were applied to the whole country. Mortality is national incidence applied to modelled mortality-to-incidence ratios. So the national figures are one city's rates applied to Chad's whole population, which IARC puts at 20,299,128. The estimates have moved a great deal between editions: WHO's 2020 profile, built on GLOBOCAN 2018 and not on a registry, gave 7,491 cancers; GLOBOCAN 2022 gave 10,185; GLOBOCAN 2024 gives 18,655, with breast cancer rising from 749 cases (14.2 per 100,000 women) to 3,103 (50.4). These are changes in the estimate and its inputs, not a measured rise in cancer, and OnCo could not read IARC's explanation of them. The prostate cancer rate, 97.9 per 100,000 men, is the second highest IARC gives for any African country in GLOBOCAN 2024, after Zimbabwe, and comes from the same registry; treat it with the same caution.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Chad",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Chad (PDF)", url: IARC_2024 },
      cards: [
        {
          id: "shape",
          title: "About 18,700 new cancers a year: prostate in men, breast and cervical cancer in women",
          plain:
            "IARC estimates 18,655 new cancers in Chad in 2024: 9,845 in women and 8,810 in men. Prostate cancer is the commonest overall, then breast, cervical and liver cancer. For every ten new cancers IARC estimates about six or seven cancer deaths in the same year. Many of these cancers can be found early or prevented: cervical cancer by vaccination and screening, liver cancer partly by hepatitis B vaccination.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 3,340 prostate cancers (2,046 deaths), 3,103 breast cancers (1,415 deaths), 2,348 cervical cancers (1,337 deaths), 2,064 liver cancers (1,821 deaths) and 679 non-Hodgkin lymphomas. Prostate cancer is 37.9% of cancers in men, followed by liver cancer (15.2%); in women breast cancer is 31.5% and cervical cancer 23.8%. The risk of developing a cancer before age 75 is 21.5% for men and 16.3% for women, and an estimated 26,129 people are living within five years of a diagnosis. Deaths divided by new cases give 0.65 for 2024. WHO's 2020 profile estimated 951 cancers a year in children aged 0 to 14 and recorded cancer as 16.7% of premature deaths from non-communicable diseases in 2016. It attributed 24.3% of cancer cases (2012) to infections, which include HPV and hepatitis B and C. Life expectancy at birth was 55.2 years in 2024, in World Bank data.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Chad (PDF)", url: IARC_2024 },
            { label: "WHO: cancer country profile, Chad, 2020 (PDF)", url: WHO_PROFILE_2020 },
          ],
        },
        {
          id: "estimates-moved",
          title: "Why Chad's numbers changed so much between editions",
          plain:
            "Chad's cancer figures are estimates, and each edition has been built differently. WHO's 2020 profile said its 2018 figures were not based on any registry. From 2022 IARC has used the rates of the N'Djamena registry and applied them to the whole country. The estimate rose from 7,491 cancers (2018) to 10,185 (2022) and 18,655 (2024). That mostly reflects the change of method, not a measured change in how many people get cancer.",
          detail:
            "The Ministry of Public Health's 2017 to 2021 non-communicable disease plan quoted GLOBOCAN 2012: 6,078 new cancers excluding non-melanoma skin cancer and 4,034 deaths, with prostate (17.3%), liver and non-Hodgkin lymphoma leading in men and breast (34.9%) and cervical cancer (17.3%) in women. WHO's 2020 profile gave 7,491 cancers and 5,616 deaths for 2018 and warned that the incidence estimates had a high degree of uncertainty because they were not based on a population-based registry. The GLOBOCAN 2022 fact sheet gave 10,185 cancers and 7,257 deaths, an incidence of 118.1 per 100,000, naming the N'djamena Cancer Registry as its source; prostate cancer (2,582) and liver cancer (1,640) led, and breast cancer was fourth with 749 cases. In the 2024 sheet, breast cancer is 3,103 and cervical cancer 2,348, and all-cancer incidence is 180.0 per 100,000. OnCo found no published report of the registry's own counts and could not read IARC's detailed methods page, so this page does not say which change in the registry data caused the shift. For a reader, the safe reading is that prostate, breast, cervical and liver cancers are the main cancers in Chad, and that the exact numbers are uncertain.",
          links: [
            { label: "IARC: GLOBOCAN 2022 fact sheet, Chad (read through the Internet Archive, PDF)", url: IARC_2022_WB },
            { label: "WHO: cancer country profile, Chad, 2020 (PDF)", url: WHO_PROFILE_2020 },
            { label: "Ministry of Public Health: non-communicable disease plan 2017 to 2021, section 2.2.3 (PDF, ICCP portal)", url: NCD_PLAN },
          ],
        },
      ],
      tables: [
        {
          id: "td-estimates",
          title: "How the estimates for Chad have changed, edition by edition",
          caption: "New cancers and cancer deaths for the year shown, all ages, both sexes, as each source states them. Chad has no published registry report of its own counts, so this table compares the estimates.",
          columns: [
            { key: "source", label: "Source (basis)" },
            { key: "year", label: "Year estimated" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
            { key: "asr", label: "Incidence per 100,000 (age-standardised)", numeric: true },
            { key: "prostate", label: "Prostate cases", numeric: true },
            { key: "breast", label: "Breast cases", numeric: true },
            { key: "cervix", label: "Cervix cases", numeric: true },
          ],
          rows: [
            { source: "GLOBOCAN 2012, quoted in the Ministry's 2017 plan (excludes non-melanoma skin cancer)", year: "2012", cases: 6078, deaths: 4034, asr: null, prostate: null, breast: null, cervix: null },
            { source: "WHO cancer country profile 2020 (not based on a registry)", year: "2018", cases: 7491, deaths: 5616, asr: null, prostate: null, breast: null, cervix: null },
            { source: "GLOBOCAN 2022 (N'djamena Cancer Registry rates applied to Chad)", year: "2022", cases: 10185, deaths: 7257, asr: 118.1, prostate: 2582, breast: 749, cervix: 1111 },
            { source: "GLOBOCAN 2024 (subnational registry rates applied to Chad)", year: "2024", cases: 18655, deaths: 12047, asr: 180.0, prostate: 3340, breast: 3103, cervix: 2348 },
          ],
          note: "All four rows are estimates, not counts. The 2012 and 2018 sources give site shares as percentages, not case numbers, so those cells are empty. The rise across rows mostly reflects new inputs and methods, not a measured rise in cancer.",
          sources: [
            { label: "Ministry of Public Health: non-communicable disease plan 2017 to 2021, section 2.2.3 (PDF)", url: NCD_PLAN },
            { label: "WHO: cancer country profile, Chad, 2020 (PDF)", url: WHO_PROFILE_2020 },
            { label: "IARC: GLOBOCAN 2022 fact sheet, Chad (Internet Archive copy, PDF)", url: IARC_2022_WB },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Chad (PDF)", url: IARC_2024 },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a registry in N'Djamena whose own figures are not yet published",
      aside: { label: "African Cancer Registry Network: Chad, Registre de Cancer de N'Djamena", url: AFCRN_TD },
      cards: [
        {
          id: "registry-ndjamena",
          title: "The N'Djamena cancer registry feeds IARC's estimates, but its reports could not be found",
          plain:
            "Chad's cancer estimates now come from a cancer registry in the capital, N'Djamena, which is a member of the African Cancer Registry Network. OnCo could not find a published report of what the registry has counted, how many people it covers or since when. There is no registry for the rest of the country, and deaths are not recorded by cause nationally.",
          detail:
            "The African Cancer Registry Network lists \"Chad, Registre de Cancer de N'Djamena\" among its members; the registry's own page there reads only that details are coming soon. IARC's GLOBOCAN 2022 fact sheet names the N'djamena Cancer Registry as the data source for Chad's incidence. The Ministry of Public Health's 2017 to 2021 non-communicable disease plan listed, under cancer, training two epidemiologists in cancer surveillance, setting up a cancer registry, publishing cancer data in the national health statistics yearbook, and setting up a register of deaths and their causes with the city authorities. WHO's 2020 profile recorded no information on a population-based registry for 2019 and no coverage for the quality of mortality registration in 2007 to 2016; WHO's 2021 cervical cancer profile records that a population-based registry exists. No peer-reviewed paper reporting the registry's incidence was found in Europe PMC.",
          links: [
            { label: "African Cancer Registry Network: Chad, Registre de Cancer de N'Djamena", url: AFCRN_TD },
            { label: "IARC: GLOBOCAN 2022 fact sheet, Chad (Internet Archive copy, PDF)", url: IARC_2022_WB },
            { label: "WHO: cervical cancer country profile, Chad, 2021 (PDF, ICCP portal)", url: WHO_CX_2021 },
            { label: "Ministry of Public Health: non-communicable disease plan 2017 to 2021, intervention area 4 (PDF)", url: NCD_PLAN },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: mostly households, with universal coverage written into law in 2019",
      aside: { label: "World Bank: out-of-pocket share of health spending, Chad (API)", url: WB_OOP },
      cards: [
        {
          id: "out-of-pocket",
          title: "Households pay about half of all health spending directly",
          plain:
            "In 2023, 52% of Chad's health spending was paid by households at the point of care, 25% by the government and 22% by donors, in World Bank data. Total health spending was about 47 US dollars a person. No source read says how cancer care in particular is paid for, but the Ministry describes these medicines as costly and often out of stock.",
          detail:
            "The World Bank's series, drawn from WHO's Global Health Expenditure Database, gives out-of-pocket spending as 51.7% of current health expenditure in 2023, down from 69.8% in 2020, 69.5% in 2021 and 58.2% in 2022. Domestic government spending was 25.2% and external (donor) spending 22.4% of the total in 2023, and current health spending was 5.0% of GDP, or 47.44 US dollars per person. The Ministry's 2017 to 2021 plan states that medicines for non-communicable diseases are very costly and constantly out of stock, that they are almost absent from the list of free targeted emergency care introduced in 2007, and that cost leads many patients to traditional healers instead. A 2025 study by WHO's Chad office cites a World Bank estimate that fewer than 10% of Chadians have adequate health coverage and that about 42% of the population lives below the poverty line. At the 2024 opening of the pathology service at CHU La Renaissance, its director general said the aim included reducing medical evacuations abroad.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Chad (API)", url: WB_OOP },
            { label: "World Bank: domestic government health expenditure, % of current health expenditure, Chad (API)", url: WB_GOV },
            { label: "World Bank: current health expenditure per capita, Chad (API)", url: WB_CHE },
            { label: "Ministry of Public Health: non-communicable disease plan 2017 to 2021, sections 2.4.4 and 2.4.5 (PDF)", url: NCD_PLAN },
            { label: "Ragomzingba et al., essential medicines in Chad (Pan Afr Med J 2025)", url: PAMJ },
          ],
        },
        {
          id: "uhc-law",
          title: "A universal health coverage law from 2019, starting with care for the poorest",
          plain:
            "Chad adopted a strategy for universal health coverage in 2015 and a law in 2019. The law sets up three schemes and began with the one in which the state pays for the care of the poorest people. OnCo found no published rule saying which cancer services or cancer medicines the schemes cover.",
          detail:
            "The National Assembly adopted the universal health coverage law on 3 June 2019, presented as aiming to give everyone access to a basic package of care, reduce direct payment and protect people from falling into poverty. WHO's Africa office describes it as Law No. 035/PR/2019 of 5 August 2019, providing for three schemes, with the decision to start with scheme 3, under which the state reimburses the care of the most deprived. The same WHO document says that free care and results-based financing had not been sustained for financial reasons, and that the medicines used to deliver free care were frequently out of stock. The Ministry's 2017 plan records that before the law, a few insurance companies and the national social insurance fund covered some private-sector workers, and community health mutuals existed mostly in the south. The 2022 national list of essential medicines, by contrast, does name cancer medicines; see the regulator section. Whether the coverage schemes pay for any of them is not stated in the sources read.",
          links: [
            { label: "WHO Africa: models of care for universal health coverage in Chad", url: UHC_WHO },
            { label: "Alwihda Info: the National Assembly adopts the universal health coverage law (3 June 2019)", url: UHC_LAW_NEWS },
            { label: "Ministry of Public Health: non-communicable disease plan 2017 to 2021, sections 1.5 and 2.4.8 (PDF)", url: NCD_PLAN },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: a directorate of the Ministry of Health",
      aside: { label: "Law No. 024/PR/2000 on pharmacy (WIPO Lex)", url: PHARMACY_LAW },
      cards: [
        {
          id: "pharmacy-law",
          title: "The Minister of Health authorises medicines, after advice from a National Medicines Commission",
          plain:
            "Chad has no separate medicines agency. Under a 2000 law, every medicine sold in Chad needs a marketing authorisation from the Minister of Health, valid for five years, decided within six months after advice from a National Medicines Commission. A directorate of the Ministry, the DGPML, does the regulator's work, and a 2025 study rated the system's maturity as low.",
          detail:
            "Law No. 024/PR/2000 on pharmacy, adopted on 30 October 2000, creates a National Medicines Commission to advise on all questions about medicines. No proprietary or generic medicine may be sold or given without a marketing authorisation from the Minister of Health, valid for five renewable years; the decision must come within six months of the application, a refusal must give reasons, and grants, suspensions and withdrawals are to be published by the Ministry. A medicine chosen in a public tender is authorised for the length of the tender. A 2025 study by WHO's Chad office and staff of the General Directorate of Pharmacy, Medicines and Laboratories (DGPML) describes the DGPML as acting as the national pharmaceutical regulatory authority, with the national drug commission in charge of approval and a pharmacovigilance expert committee. The authors put the maturity of the regulatory system at level 1 on a scale of 1 to 4 and note its lack of autonomy and independence. Chad has no medicines manufacturer; public supply runs through a central purchasing centre and 23 provincial supply pharmacies. OnCo found no Chadian guideline or published timeline for authorising clinical trials.",
          links: [
            { label: "Law No. 024/PR/2000 on pharmacy, articles 2 and 15 to 23 (WIPO Lex, French)", url: PHARMACY_LAW },
            { label: "Ragomzingba et al., essential medicines in Chad (Pan Afr Med J 2025)", url: PAMJ },
          ],
        },
        {
          id: "essential-list",
          title: "The 2022 essential medicines list names chemotherapy, trastuzumab and imatinib for national hospitals",
          plain:
            "Chad's 2022 national list of essential medicines includes a full chapter of cancer medicines for adults, from older chemotherapy to trastuzumab for HER2-positive breast cancer, imatinib, rituximab and nivolumab, all reserved for national hospitals. Oral morphine for pain is listed for adults from district hospitals upward. Being on the list is not the same as being in stock.",
          detail:
            "The list, issued by the Ministry's General Directorate of Pharmacy, Medicines and Laboratories, assigns each medicine to levels of care: health centre, district hospital, provincial hospital and national hospital. Its adult chapter 8 lists cytotoxic medicines including capecitabine, carboplatin, cisplatin, cyclophosphamide, docetaxel, doxorubicin, fluorouracil, gemcitabine, oxaliplatin, paclitaxel and vincristine; targeted medicines bortezomib, erlotinib, imatinib, rituximab and trastuzumab; nivolumab and lenalidomide; and hormone treatments abiraterone, anastrozole, bicalutamide, leuprorelin and tamoxifen. All are marked for national hospitals only, apart from sorafenib, which is also listed for provincial hospitals. Morphine tablets, oral solution and injection are listed among adult opioid painkillers from district hospitals upward, and again in the cancer palliative care section for provincial and national hospitals. The 2023 survey by WHO and the DGPML found essential medicines in stock in 52.6% of public facilities on average, but did not report on cancer medicines. WHO's 2021 profile records reported opioid consumption, in oral morphine equivalence, of 0 mg per person in 2017.",
          links: [
            { label: "Liste nationale des médicaments essentiels et autres produits de santé, 2022 edition, adult chapter 8 (PDF, WHO Africa)", url: LNME_2022 },
            { label: "Ragomzingba et al., essential medicines in Chad (Pan Afr Med J 2025)", url: PAMJ },
            { label: "WHO: cervical cancer country profile, Chad, 2021 (PDF, ICCP portal)", url: WHO_CX_2021 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "WHO: cervical cancer country profile, Chad, 2021 (PDF)", url: WHO_CX_2021 },
      cards: [
        {
          id: "cervical",
          title: "No national cervical screening programme, and about 5% of women screened in five years",
          plain:
            "WHO recorded in 2021 that Chad had no national cervical screening programme and no guidelines for managing cervical cancer, and that about 5% of women aged 30 to 49 had been screened in the previous five years. Studies in Chad have shown that screening is accepted and that high-risk HPV is common.",
          detail:
            "WHO's 2021 cervical cancer profile gives 5% of women aged 30 to 49 screened in the last five years and 6% ever screened (2019), no national screening programme, no programme for early detection of symptoms at primary care, and no defined referral system from primary to higher levels of care. The Ministry's 2017 to 2021 plan aimed to set up screen-and-treat units using visual inspection with acetic acid and cryotherapy or LEEP in six health facilities, and to treat 80% of stage I and II cervical cancers found. In Moundou, 311 women living with HIV offered smear screening between 2013 and 2015 all accepted; 13% had high-grade lesions or cancer. In a 2018 survey of 253 women in N'Djamena, 15.8% carried high-risk HPV, and 67.5% of infections were types covered by the nine-valent vaccine. WHO's 2020 profile recorded no breast cancer screening programme; the 2017 plan proposed strengthening breast screening and mammography for women at high risk.",
          links: [
            { label: "WHO: cervical cancer country profile, Chad, 2021 (PDF, ICCP portal)", url: WHO_CX_2021 },
            { label: "Mortier et al., cervical smear screening in women living with HIV in Chad (Bull Soc Pathol Exot 2016)", url: "https://doi.org/10.1007/s13149-016-0496-z" },
            { label: "Mboumba Bouassa et al., high-risk HPV in women in N'Djamena (PLoS One 2019)", url: "https://doi.org/10.1371/journal.pone.0217486" },
            { label: "Ministry of Public Health: non-communicable disease plan 2017 to 2021, cancer actions (PDF)", url: NCD_PLAN },
          ],
        },
        {
          id: "vaccines",
          title: "HPV vaccine not yet introduced; hepatitis B vaccine for infants since 2008",
          plain:
            "WHO's immunisation records show the HPV vaccine, which prevents most cervical cancers, not introduced in Chad up to 2025, and a study based on 2024 interviews counted Chad among countries still preparing to introduce it. Infants have received hepatitis B vaccine, which protects against liver cancer, since 2008; 71% received three doses in 2025, but there is no dose at birth.",
          detail:
            "In WHO's vaccine introduction data for Chad, the HPV vaccine is recorded as not introduced in every year to 2025, and hepatitis B vaccine as introduced in 2008, with the hepatitis B birth dose not introduced. WHO and UNICEF estimates of coverage with three doses of hepatitis B vaccine rose from 47% in 2018 to 62% in 2021, 68% in 2024 and 71% in 2025. Interviews held from January to April 2024 placed Chad with the Central African Republic, Gabon and the Republic of Congo in the pre-introduction phase, and named weak health system capacity, competing vaccine priorities, staff shortages, political and conflict instability, and logistics as barriers. WHO's 2021 profile records that HPV vaccination was not in the national schedule. Liver cancer is the second commonest cancer in men in IARC's 2024 estimate.",
          links: [
            { label: "WHO immunisation data: vaccine introductions for Chad (API)", url: WHO_INTRO_API },
            { label: "WHO immunisation data: hepatitis B coverage rows for Chad (API)", url: WHO_HEPB_API },
            { label: "Waheed et al., barriers to HPV vaccine introduction in francophone Africa (Vaccine 2026)", url: "https://doi.org/10.1016/j.vaccine.2025.128030" },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Chad does",
      title: "What Chad does: building cancer care from the first pathology service up",
      cards: [
        {
          id: "national-centre",
          title: "A first public cancer centre, financed by the Kuwait Fund, under construction since June 2025",
          plain:
            "Chad had no public cancer treatment centre in WHO's 2021 records. On 15 June 2025 the first stone was laid for the Centre National d'Excellence en Cancérologie in N'Djamena, a 50-bed hospital planned to offer chemotherapy, cancer surgery, imaging and palliative care. The government thanked the IAEA for technical help, and the Kuwait Fund took part in the ceremony.",
          detail:
            "Tchadinfos reported that the centre at Karkadjerie, in N'Djamena's first district, will cover 17,000 square metres, with a main building of about 13,000 square metres and staff housing, and will offer radiology, chemotherapy, oncology, palliative care, emergency care, surgery, outpatient consultations, a laboratory and a pharmacy, with solar panels for emergency services. The Times Kuwait reported a delegation of the Kuwait Fund for Arab Economic Development at the foundation ceremony for constructing and equipping a cancer treatment and control centre in N'Djamena. In January 2022 the coordinator of Chad's national cancer control programme, Dr Fatima Haggar, told an IAEA meeting that an IAEA-funded feasibility study for a radiotherapy and nuclear medicine centre had been done in 2008; the minister said the project was financed by the Kuwait Fund but had left out staff training, and asked the IAEA to support training doctors, technicians and maintenance staff over three to four years. An IAEA technical cooperation project, CHD6008, is reported for a national radiotherapy, radiology and nuclear medicine facility in N'Djamena, but the IAEA's page refused a plain request, so OnCo has not verified it; see the gaps. WHO's 2020 profile counted no external beam radiotherapy machines (2019).",
          links: [
            { label: "Tchadinfos: first stone of the Centre National d'Excellence en Cancérologie (15 June 2025)", url: TCHADINFOS_CNEC },
            { label: "Times Kuwait: Kuwait Fund at the foundation of a cancer centre in N'Djamena (24 June 2025)", url: TIMES_KUWAIT },
            { label: "Alwihda Info: acceleration of the radiotherapy and nuclear medicine centre (21 January 2022)", url: ALWIHDA_IAEA_2022 },
            { label: "WHO: cancer country profile, Chad, 2020 (PDF)", url: WHO_PROFILE_2020 },
          ],
        },
        {
          id: "pathology",
          title: "Cancer diagnosis in the country: a pathology department at CHU La Renaissance",
          plain:
            "A cancer diagnosis needs a pathologist to examine tissue under a microscope, and WHO recorded pathology as not generally available in Chad in 2021. In September 2024 a pathology department opened at CHU La Renaissance in N'Djamena, set up with a team from India and paid for by the hospital, with a microscope linked for telemedicine.",
          detail:
            "The Minister of Public Health opened the department on 23 September 2024 with a team from the Pondicherry Institute of Medical Sciences, one of whom was to stay to train Chadian staff. The hospital's director general said the service, funded from the hospital's own resources, meant that some tests previously sent abroad could be done locally and would reduce medical evacuations. The Ministry's 2017 to 2021 plan had aimed for pathology laboratories in five hospitals and cancer departments in Abéché and Sarh, and described cancer patients being referred to the national hospitals and a few private clinics in N'Djamena without information flowing back, and the Hôpital Général de Référence Nationale as the one hospital grouping most specialised units for non-communicable diseases. WHO's 2020 profile counted 4.0 CT scanners, 1.3 MRI scanners and 20.0 mammography units per 10,000 cancer patients in 2020, and none for PET. Chad's medical workforce is small: the World Bank gives 0.085 physicians per 1,000 people in 2023, and the 2017 plan counted 735 doctors in 2015.",
          links: [
            { label: "Alwihda Info: a pathology department opens at CHU La Renaissance (23 September 2024)", url: ALWIHDA_PATHOLOGY },
            { label: "Ministry of Public Health: non-communicable disease plan 2017 to 2021, sections 2.4.2 to 2.4.4 (PDF)", url: NCD_PLAN },
            { label: "WHO: cancer country profile, Chad, 2020 (PDF)", url: WHO_PROFILE_2020 },
            { label: "World Bank: physicians per 1,000 people, Chad (API)", url: WB_PHYS },
          ],
        },
        {
          id: "civil-society",
          title: "Patient and community groups: three Chadian members of the Union for International Cancer Control",
          plain:
            "Three Chadian associations are members of the Union for International Cancer Control: the Association Tchadienne Contre le Cancer, the Association Tchadienne des Femmes Vivants avec le Cancer, an association of women living with cancer, and Association DONAMA. They are the patient and community groups OnCo found for Chad.",
          detail:
            "The Union for International Cancer Control's member directory, as OnCo read it on 4 November 2026, lists the Association Tchadienne Contre le Cancer and the Association Tchadienne des Femmes Vivants avec le Cancer as Global Network Members and Association DONAMA as an Associate Member. The Ministry's 2017 to 2021 plan names associations including ATCC and DONAMA among civil society groups working on non-communicable diseases, and says they were poorly equipped and their collaboration with national programmes undervalued. It also notes free mass screening campaigns held from time to time for some diseases. OnCo could not read the associations' own pages or the UICC's member pages, which refused a plain request, so their activities are not described here. The country also hosts a large refugee population in the east, displaced by the conflict in Sudan, which WHO's Regional Director visited in June 2026; OnCo found no source on cancer care for refugees in Chad.",
          links: [
            { label: "UICC: Association Tchadienne Contre le Cancer", url: UICC_ATCC },
            { label: "UICC: Association Tchadienne des Femmes Vivants avec le Cancer", url: UICC_ATFVC },
            { label: "UICC: Association DONAMA", url: UICC_DONAMA },
            { label: "Ministry of Public Health: non-communicable disease plan 2017 to 2021, section 2.4.8 (PDF)", url: NCD_PLAN },
            { label: "WHO Africa: Regional Director's mission report, Chad, June 2026 (PDF, French)", url: WHO_RD_2026 },
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
          title: "No trial in OnCo's records has a site in Chad",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, none of the cancer trials in our records lists a site in Chad. The Chadian cancer research OnCo found is small and mostly about cervical cancer: HPV infection in N'Djamena, screening of women living with HIV in Moundou, and the barriers to HPV vaccination.",
          detail:
            "Of 5,916 ClinicalTrials.gov participation records in OnCo's graph, 5,595 list their countries, and none includes Chad; none includes Cameroon, Niger, Sudan or the Central African Republic either, while four include Nigeria. That reflects the trials OnCo holds, mostly large industry and academic trials of new medicines; the search linked below shows any registered cancer studies with a site in Chad. OpenAlex, counting works whose primary topic falls in its oncology subfield and that have at least one author affiliated in Chad, gives 4 works for 2021 to 2025. The papers on this page were written by teams in Chad with partners in France, the Central African Republic and elsewhere, and by WHO's Chad office with the Ministry's pharmacy directorate. Chad's 2000 pharmacy law does not set out a procedure for authorising clinical trials, and OnCo found no national guideline for doing so.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Chad (search)", url: CTGOV },
            { label: "OpenAlex: works by country", url: "https://openalex.org" },
            { label: "Mboumba Bouassa et al., high-risk HPV in women in N'Djamena (PLoS One 2019)", url: "https://doi.org/10.1371/journal.pone.0217486" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "iaea-pages",
      title: "The IAEA's pages on Chad's radiotherapy project could not be read",
      plain:
        "The IAEA supports Chad's plans for radiotherapy, but its project and news pages refused a plain request, and the Internet Archive was offline when OnCo tried its copies. So this page cannot say whether Chad has any working radiotherapy machine now, or when the national centre is due to open.",
      detail:
        "The IAEA's technical cooperation page for project CHD6008, reported to be a national radiotherapy, radiology and nuclear medicine facility in N'Djamena (unverified, since the page could not be read), and its news pages on Chad returned HTTP 403 on 11 November 2026, and the Internet Archive's services were temporarily offline. Statements that Chad joined the IAEA's Rays of Hope initiative and planned to launch a national cancer control plan in 2023 appear in search summaries of IAEA pages but could not be checked against the raw text, so they are not used. OnCo found no national cancer control plan for Chad in force: WHO recorded a plan as not in effect in 2019. The IAEA's DIRAC database of radiotherapy centres was not read. WHO's count of no radiotherapy machines is for 2019.",
      links: [
        { label: "IAEA: project CHD6008, national radiotherapy, radiology and nuclear medicine facility in N'Djamena", url: IAEA_CHD6008 },
        { label: "WHO: cancer country profile, Chad, 2020 (PDF)", url: WHO_PROFILE_2020 },
      ],
    },
    {
      id: "registry-reports",
      title: "The N'Djamena registry's own figures were not found",
      plain:
        "Chad's national estimates rest on the N'Djamena cancer registry, but OnCo found no report or paper giving the registry's own counts, the population it covers or the years it has run. IARC's detailed methods page for Chad also did not load as plain text, so the large changes between estimates cannot be explained here.",
      detail:
        "The registry's page on the African Cancer Registry Network says only that details are coming soon. A Europe PMC search for the registry by name in English and French returned nothing. IARC's Global Cancer Observatory methods page is built in the browser. IARC's programming interface gives a one-line method for each edition: rates from N'Djamena (2022) applied to the 2022 population, and rates from N'Djamena (2022 to 2024) applied to the 2024 population; it does not say how many people the registry covers or why the rates changed. The 2022 figures on this page match that interface.",
      links: [
        { label: "African Cancer Registry Network: Chad, Registre de Cancer de N'Djamena", url: AFCRN_TD },
        { label: "IARC: Global Cancer Observatory, data sources and methods", url: "https://gco.iarc.who.int/today/en/data-sources-methods" },
      ],
    },
    {
      id: "coverage-rules",
      title: "What the health coverage schemes pay for, and how many people they cover, is not published",
      plain:
        "OnCo found no published list of cancer services or medicines that Chad's universal health coverage schemes pay for, no count of people enrolled, and no confirmation that a national health insurance fund is paying claims.",
      detail:
        "The 2019 law and its first scheme for the poorest are described by WHO's Africa office and a news report of its adoption; the text of the law itself was not read. OnCo could not confirm from a primary source whether a national health insurance fund has been created or is paying claims, so none is named on this page. The figure of fewer than 10% of Chadians with adequate coverage is a World Bank estimate quoted in a 2025 paper, not read at source.",
      links: [
        { label: "WHO Africa: models of care for universal health coverage in Chad", url: UHC_WHO },
        { label: "Ragomzingba et al., essential medicines in Chad (Pan Afr Med J 2025)", url: PAMJ },
      ],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Some figures a reader would want are not here because OnCo could not find them in a primary source: survival after a cancer diagnosis in Chad, the number of oncologists and radiologists, which cancer medicines are actually in stock, a registered-medicines list, and anything about cancer care in eastern Chad's refugee camps.",
      detail:
        "WHO's 2020 profile gives the counts of radiation oncologists, medical physicists and radiologists as not available, and surgeons per 10,000 cancer patients from 2013. No published list of medicines authorised in Chad, with dates, was found, nor any figure for how long authorisation takes in practice. The 2023 medicines survey did not report cancer medicines. No population-based survival figures for Chad were found. The UICC's member pages for the three Chadian associations returned HTTP 406 and were not read; their membership is taken from the UICC directory. The national cancer programme's coordinator is named from a 2022 news report, not from a Ministry page.",
      links: [
        { label: "WHO: cancer country profile, Chad, 2020 (PDF)", url: WHO_PROFILE_2020 },
        { label: "Ragomzingba et al., essential medicines in Chad (Pan Afr Med J 2025)", url: PAMJ },
      ],
    },
  ],
  institutions: [
    "chad-ministry-of-public-health", "ndjamena-cancer-registry", "dgpml-chad", "chu-la-renaissance-ndjamena", "hgrn-ndjamena",
    "iaea", "iarc", "who",
  ],
  companies: [],
  drugs: ["trastuzumab", "imatinib", "tamoxifen"],
  trials: [],
  papers: [
    "paper-ragomzingba-essential-medicines-chad-pamj-2025", "paper-mboumba-bouassa-hpv-ndjamena-plosone-2019",
    "paper-mortier-cervical-smear-hiv-chad-bspe-2016", "paper-waheed-hpv-vaccine-barriers-francophone-vaccine-2026",
  ],
  people: [],
  how:
    "Every card was written from WHO, IARC, World Bank, Chadian government and peer-reviewed sources, read in full rather than through a summary: IARC's GLOBOCAN 2024 and 2022 fact sheets for Chad; WHO's cancer country profile 2020 and cervical cancer profile 2021; the Ministry of Public Health's non-communicable disease plan 2017 to 2021 and its 2022 essential medicines list; Law No. 024/PR/2000 on pharmacy; WHO Africa's page on the 2019 universal health coverage law; the World Bank's health expenditure series; WHO's immunisation data; the African Cancer Registry Network's member pages; news reports from Alwihda Info, Tchadinfos and the Times Kuwait on the pathology service and the national cancer centre; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data, and research output from OpenAlex. The new records added for this page (the Ministry, the registry, the pharmacy directorate, two N'Djamena hospitals and four papers) carry their own sources.",
  verify:
    "National incidence and death figures are IARC estimates built on one city's registry, not a national count, and they changed sharply between editions. Which hospital can diagnose or treat a cancer, which medicines are in stock and whether the national cancer centre has opened change faster than any published source; ask the surgery department at the Hôpital Général de Référence Nationale or the pathology department at CHU La Renaissance in N'Djamena what applies to you.",
  verifyLinks: [
    { label: "WHO: cancer country profile, Chad, 2020 (PDF)", url: WHO_PROFILE_2020 },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Chad (PDF)", url: IARC_2024 },
    { label: "Liste nationale des médicaments essentiels, 2022 edition (PDF, WHO Africa)", url: LNME_2022 },
    { label: "WHO Africa: Chad", url: "https://www.afro.who.int/countries/chad" },
  ],
};

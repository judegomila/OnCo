import type { CountryDive } from "@/data/country-dive";

/**
 * Republic of the Congo (Brazzaville) deep dive: the hand-written cards for /countries/cg/ (wave 14). Every figure was
 * read from the raw text of its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet
 * for "Congo, Republic of", the Ministry of Health and Population's Plan stratégique national de lutte contre le cancer
 * 2022 to 2026 (PDF text from the ministry's own site), five pages of the ministry's site (October 2026 on Octobre Rose
 * and the 90 days initiative, February 2024, March 2026, September 2026 and a 2017 note on health insurance), the
 * African Cancer Registry Network's page for the Brazzaville registry, WHO's Cancer Country Profile 2020 (the ICCP
 * portal's copy) and cervical cancer profile 2021, the World Bank's health expenditure series from its API, WHO's
 * immunisation data API, IAEA DIRAC's public equipment data, WHO's August 2026 list of regulators at maturity level 3
 * and 4, the African Union's list of signatures of the African Medicines Agency treaty, ClinicalTrials.gov's API, and
 * five papers resolved through Europe PMC with their abstracts read. Nothing here is from the Democratic Republic of
 * the Congo: every registry hit and paper was checked for country. What was not found or not read is under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/178-congo-republic-of-fact-sheet.pdf";
const PLAN = "https://sante.gouv.cg/wp-content/uploads/2023/04/PSNLC-DU-12-AVRIL-2023.pdf";
const AFCRN_BRAZZA = "https://afcrn.org/index.php/membership/membership-list/90-brazzaville-rep-congo";
const WHO_PROFILE = "https://www.iccp-portal.org/sites/default/files/plans/COG_2020.pdf";
const WHO_CX = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-cog-2021-country-profile-en.pdf";
const WB_OOP = "https://api.worldbank.org/v2/country/COG/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_CHE = "https://api.worldbank.org/v2/country/COG/indicator/SH.XPD.CHEX.PC.CD?format=json";
const WB_GOV = "https://api.worldbank.org/v2/country/COG/indicator/SH.XPD.GHED.CH.ZS?format=json";
const WB_EXT = "https://api.worldbank.org/v2/country/COG/indicator/SH.XPD.EHEX.CH.ZS?format=json";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'COG'%20and%20contains(ANTIGEN,'HPV')";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const CTGOV = "https://clinicaltrials.gov/search?country=Congo&cond=cancer";

const L_IARC = { label: "IARC: GLOBOCAN 2024 fact sheet, Congo, Republic of (PDF)", url: IARC_FACTSHEET };
const L_PLAN = { label: "Plan stratégique national de lutte contre le cancer 2022 to 2026, Republic of the Congo (validated March 2023, PDF)", url: PLAN };
const L_AFCRN = { label: "African Cancer Registry Network: Registre des cancers de Brazzaville (undated; its text speaks of 2012 and 2013)", url: AFCRN_BRAZZA };
const L_WHO = { label: "WHO: Cancer Country Profile 2020, Congo (PDF, ICCP portal)", url: WHO_PROFILE };
const L_CX = { label: "WHO: cervical cancer country profile 2021, Congo (PDF)", url: WHO_CX };
const L_DIRAC = { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC };
const L_RCB = { label: "Nsondé Malanda et al., twelve years of the Brazzaville cancer registry (Bulletin du Cancer 2013)", url: "https://doi.org/10.1684/bdc.2013.1701" };
const L_LATE = { label: "Ilboudo et al., late breast cancer diagnosis at the Brazzaville university hospital (Cancer Control 2025)", url: "https://doi.org/10.1177/10732748241270634" };
const L_BARR_RT = { label: "Kroeber et al., patient-reported barriers to radiotherapy in sub-Saharan Africa (International Journal of Cancer 2026)", url: "https://doi.org/10.1002/ijc.70390" };
const L_BARR_CT = { label: "König et al., patient-reported barriers to chemotherapy in nine sub-Saharan African countries (International Journal of Cancer 2026)", url: "https://doi.org/10.1002/ijc.70309" };
const L_WAHEED = { label: "Waheed et al., barriers to HPV vaccine introduction in francophone African countries (Vaccine 2026)", url: "https://doi.org/10.1016/j.vaccine.2025.128030" };
const L_90J = { label: "Ministère de la Santé et de la Population: Octobre Rose and the 90 days against cancer initiative (5 October 2026)", url: "https://sante.gouv.cg/cancer-le-ministere-de-la-sante-lance-les-activites-doctobre-rose-et-linitiative-nationale-90-jours-contre-le-cancer/" };
const L_DECL = { label: "Ministère de la Santé et de la Population: government declaration for World Cancer Day (6 February 2024)", url: "https://sante.gouv.cg/declaration-du-gouvernement-a-loccasion-de-la-journee-mondiale-contre-le-cancer-le-04-fevrier/" };
const L_GUIDE = { label: "Ministère de la Santé et de la Population: national guidelines for common cancers in the health district (dated February 2025, posted 31 March 2026)", url: "https://sante.gouv.cg/lignes-directrices-nationales-de-prise-en-charge-des-cancers-courants-dans-le-district-sanitaire-en-republique-du-congo/" };
const L_AMU = { label: "Ministère de la Santé et de la Population: note on universal health insurance (22 August 2017)", url: "https://sante.gouv.cg/assurance-maladie-universelle/" };
const L_DPM = { label: "Ministère de la Santé et de la Population: training on the medicines logistics platform, with the Direction de la Pharmacie et du Médicament (23 September 2026)", url: "https://sante.gouv.cg/deployement-de-la-plateforme-electronique-msupply-e-lmis-formation-des-formateurs/" };

export const CG_DIVE: CountryDive = {
  iso2: "CG",
  iso3: "COG",
  name: "the Republic of the Congo",
  flag: "🇨🇬",
  asOf: "2026-11-16",
  title: "Cancer in the Republic of the Congo",
  description:
    "Cancer in the Republic of the Congo (Brazzaville): a national cancer plan for 2022 to 2026 and a national cancer programme created in 2019, four medical oncology services and 13 medical oncologists in the plan's count, a Brazzaville cancer registry that recorded 6,048 cancers from 1998 to 2009, one radiotherapy service that the 2023 plan records as not working and no centre in IAEA's directory, IARC's estimate of 3,575 new cancers and 2,264 deaths in 2024 with breast cancer the commonest and cervical cancer the commonest cause of cancer death, 28% of health spending paid out of pocket in 2023, HPV vaccination not introduced in WHO's data to 2025, and no trial in OnCo's records with a site in the country.",
  lede:
    "The Republic of the Congo has a national cancer plan for 2022 to 2026, a national cancer programme created in 2019, and a cancer registry for Brazzaville founded in the mid-1990s. The plan, validated in March 2023, counts four medical oncology services and 13 medical oncologists, and records that the country's one radiotherapy service was not working; it sets out to offer radiotherapy in two general hospitals, in Brazzaville and Pointe-Noire.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for the Republic of the Congo is 3,575 new cancers and 2,264 deaths, an age-standardised incidence of 94.1 per 100,000 (93.6 in men, 97.2 in women). The fact sheet gives the incidence source as a subnational registry and the method as subnational rates applied to the 2024 population; it does not name the registry. Mortality is national incidence estimates applied to modelled mortality-to-incidence ratios built on registry survival data. The Brazzaville registry is the country's member of the African Cancer Registry Network; its own published count is 6,048 cancers from 1998 to 2009, about 504 a year in one city, and the national cancer plan lists the absence of factual national data on cancer among the weaknesses it sets out to correct.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in the Republic of the Congo",
      aside: L_IARC,
      cards: [
        {
          id: "shape",
          title: "About 3,600 new cancers a year in IARC's estimate; breast cancer the commonest, cervical cancer the commonest cause of cancer death",
          plain:
            "IARC estimates 3,575 new cancers in the Republic of the Congo in 2024, 2,036 of them in women, and 2,264 cancer deaths. Breast cancer is the commonest, then cervical and prostate cancer. Cervical cancer causes the most cancer deaths, a little ahead of breast cancer.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 755 breast cancers (375 deaths), 589 cervical cancers (384 deaths), 461 prostate cancers (292 deaths), 352 liver cancers (313 deaths) and 321 colorectal cancers (187 deaths), in a population of 6.33 million. The risk of developing a cancer before age 75 is 11.0%, and an estimated 7,605 people are living within five years of a diagnosis. The fact sheet's methods box gives the incidence source as a subnational registry, with subnational rates applied to the 2024 population, so the national figures are an estimate built on registry counts from one part of the country. The national cancer plan quotes the earlier GLOBOCAN 2020 estimate, 2,478 new cancers and 1,595 deaths. WHO's 2020 profile estimated 282 cancers a year in children aged 0 to 14.",
          links: [L_IARC, L_PLAN, L_WHO],
        },
        {
          id: "registry",
          title: "The Brazzaville cancer registry, at the university hospital since the 1990s",
          plain:
            "Brazzaville has a population-based cancer registry, based in the cancer service of the university hospital and a member of the African Cancer Registry Network. Its staff published twelve years of counts, 1998 to 2009: 6,048 new cancers, about 504 a year.",
          detail:
            "The network's page is undated: its text speaks of 2012 and 2013 as current and it carries a photograph captioned 2018. It gives the registry's foundation as 1995; the registry's own 2013 paper says 1996, with support from IARC. The page says it is financed by the Ministry of Health and Marien Ngouabi University, registers cases from the whole of Brazzaville (1,376,382 people at the 2007 census) from four hospitals and four private clinics, has one full-time registrar, and based its most recent report then, for 2011, on 495 cases. The 2013 paper counts 3,377 cancers in women, 2,384 in men and 287 in children aged 0 to 14 over the twelve years, an incidence of 39.8 per 100,000 a year, with breast and cervical cancer leading in women and liver and prostate cancer in men. The national cancer plan cites the registry for 2018 to 2019, when 144 cancers, 9.5% of cases, were in children under 15; it counts one registrar in the country in 2022 and plans a national cancer registry. OnCo found no report of the registry's adult counts after 2011.",
          links: [L_AFCRN, L_RCB, L_PLAN],
        },
      ],
      tables: [
        {
          id: "cg-registry-counts",
          title: "Cancers recorded by the Brazzaville registry, 1998 to 2009",
          caption: "New cancers among residents of Brazzaville over twelve years, from the registry's 2013 paper.",
          columns: [
            { key: "group", label: "Group" },
            { key: "cases", label: "Cancers recorded", numeric: true },
            { key: "share", label: "Share of all" },
          ],
          rows: [
            { group: "Women", cases: 3377, share: "55.8%" },
            { group: "Men", cases: 2384, share: "39.4%" },
            { group: "Children aged 0 to 14", cases: 287, share: "4.8%" },
            { group: "All", cases: 6048, share: "100%" },
          ],
          note: "Counted cases in one city over twelve years, an average of 504 a year; not a national figure. The period ends in 2009 and OnCo found no later published count for adults.",
          sources: [L_RCB],
        },
        {
          id: "cg-globocan-sites",
          title: "The five commonest cancers in the Republic of the Congo, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024, from a subnational registry's rates applied to the national population.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 755, deaths: 375 },
            { site: "Cervix uteri", cases: 589, deaths: 384 },
            { site: "Prostate", cases: 461, deaths: 292 },
            { site: "Liver", cases: 352, deaths: 313 },
            { site: "Colorectum", cases: 321, deaths: 187 },
          ],
          note: "Estimates for the whole country in one year, so they cannot be set directly beside the twelve-year registry counts above.",
          sources: [L_IARC],
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
          title: "About USD 76 a person on health in 2023, 28% of it paid out of pocket",
          plain:
            "The Republic of the Congo spent about 76 US dollars a person on health in 2023. Households paid 28% of it out of pocket, the government 34% from its own revenue and external funders 15%, according to the World Bank's series from WHO's health expenditure database.",
          detail:
            "The World Bank's series gives current health spending of USD 79 per person in 2021, 53 in 2022 and 76 in 2023. Out-of-pocket spending was 42.2% of current health spending in 2019, 23.6% in 2021, 26.9% in 2022 and 28.0% in 2023; domestic government spending was 34.0% and external health expenditure 14.9% in 2023. The four series OnCo read do not account for the remaining share. The national cancer plan, quoting the national health accounts, says household spending fell from 41% of health spending in 2012 to 34% in 2015, and that households still pay directly with no sharing of costs. For cancer it records that 50 million CFA francs were allocated to run the national cancer programme in 2022 and 15 million disbursed.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Congo, Rep. (API)", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Congo, Rep. (API)", url: WB_CHE },
            { label: "World Bank: domestic general government health expenditure, Congo, Rep. (API)", url: WB_GOV },
            { label: "World Bank: external health expenditure, Congo, Rep. (API)", url: WB_EXT },
            L_PLAN,
          ],
        },
        {
          id: "insurance",
          title: "A universal health insurance law since 2014; the cancer plan says cancer care is not in its packages",
          plain:
            "A law of 27 June 2014 instituted universal health insurance in the Republic of the Congo, and a law of 31 August 2015 created its fund. The national cancer plan lists as a weakness that cancer care is not included in the care packages chosen for the scheme, and that screening for precancerous changes at the screening units is not free.",
          detail:
            "The plan names Law No. 37-2014 instituting the Assurance Maladie Universelle among its strengths, and a ministry note of August 2017 names Law No. 12-2015 creating the Caisse d'Assurance Maladie Universelle. That note describes a proposed package in two levels: a base level paid in full, covering mothers and children under five, some infectious diseases and some non-communicable diseases such as high blood pressure and diabetes, and a complementary level, with a patient contribution, for other non-communicable diseases. The cancer plan's activities include advocacy for free radiotherapy examinations and free cancer medicines, and it costs the whole plan at 12.7 billion CFA francs over five years, of which it expects the State to pay 7.6 billion and still has 3.8 billion to find. A 2025 study of 182 breast cancer patients at the Brazzaville university hospital found lack of money linked to late diagnosis, and in a 2026 survey of patients in nine African countries affordability of chemotherapy was reported as especially severe in the Republic of the Congo. OnCo found no source on whether the insurance scheme now pays for any care.",
          links: [L_PLAN, L_AMU, L_LATE, L_BARR_CT],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator",
      cards: [
        {
          id: "dpm",
          title: "The health ministry has a Direction de la Pharmacie et du Médicament; how medicines are authorised was not found",
          plain:
            "The health ministry has a Direction de la Pharmacie et du Médicament (DPM), which the cancer plan makes responsible for adding generic cancer medicines to the national essential medicines list. OnCo found no page describing how medicines or clinical trials are authorised in the country.",
          detail:
            "The cancer plan lists the absence of generic essential cancer medicines and of morphine among the weaknesses of care, and assigns to the DPM, with the national cancer programme, the listing of generic cancer medicines on the essential medicines list and, with the central purchasing body CAMEPS, international orders for cancer medicines. A ministry page of September 2026 names the DPM and its director in connection with an electronic system for managing medicine stocks. The plan also records that the country has no regulatory authority for radiation protection and nuclear safety, which it notes some international organisations require. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include the Republic of the Congo. The African Union's list of 19 September 2023 shows Congo signed the treaty establishing the African Medicines Agency on 15 October 2020, ratified it on 28 March 2023 and deposited its instrument on 19 June 2023. A future pass should read the pharmacy law and any register of authorised medicines.",
          links: [
            L_PLAN,
            L_DPM,
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
      aside: L_PLAN,
      cards: [
        {
          id: "cervical",
          title: "Cervical screening units in two referral hospitals; no national programme in WHO's 2021 profile",
          plain:
            "The cancer plan counts two working cervical screening units, at the Makélékélé and Talangaï referral hospitals, using visual inspection, and notes that some private clinics also screen. WHO's 2021 profile records no national screening programme and 15% of women aged 30 to 49 screened in the previous five years.",
          detail:
            "The plan says visual tests with acetic acid and with iodine are available in the screening units, that the acts of screening for early changes are not free, and that prevention is not part of the essential package at community level or in first-level health centres. Its expected results include raising awareness in half the population over 12 and screening half of those reached. WHO's 2021 cervical cancer profile gives 15% of women aged 30 to 49 screened in the last five years and 17% ever, on 2019 data, with no programme for early detection of symptoms in primary care and no defined referral system; WHO's 2020 profile records no breast screening programme. In October 2026 the ministry opened a consultation on an initiative called 90 days against cancer, which aims to raise awareness among at least 400,000 people across the country, with actions on information, prevention and screening that name breast, cervical and prostate cancer.",
          links: [L_PLAN, L_CX, L_WHO, L_90J],
        },
        {
          id: "hpv",
          title: "HPV vaccination not in the routine programme, in the 2023 plan and in WHO's data to 2025",
          plain:
            "The cancer plan says vaccination against human papillomavirus, the virus that causes cervical cancer, is not yet in the national immunisation programme, apart from some experience in two departments, Cuvette and Lékoumou. WHO's immunisation database shows the vaccine as not introduced in every year to 2025.",
          detail:
            "WHO's immunisation data API, queried on 16 November 2026, returns 20 rows for HPV vaccine introduction, one for each year from 2006 to 2025, all with the answer No. Its coverage table returns 44 HPV rows for the country, for 2018 to 2025, and every one has an empty coverage value. WHO's 2021 cervical cancer profile also records the vaccine as not included. The plan sets as an expected result that at least 25% of the target population is vaccinated against HPV, and among its activities an official introduction of the vaccine and vaccinating 30% of girls aged 9 to 13; vaccination against hepatitis B, a cause of liver cancer, is already in the routine programme. A study in the journal Vaccine interviewed officials and partners between January and April 2024 in six francophone African countries and placed the Republic of Congo among four still in the phase before introduction, naming weak health system capacity, competing vaccine priorities, staff shortages and logistics as barriers across them.",
          links: [L_PLAN, { label: "WHO immunisation data: HPV vaccine introduction, Congo (API)", url: WHO_HPV_INTRO }, L_CX, L_WAHEED],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Congo does",
      title: "What stands out in the Republic of the Congo",
      cards: [
        {
          id: "plan",
          title: "A national cancer plan for 2022 to 2026, and a national cancer programme since 2019",
          plain:
            "The Ministry of Health and Population's national strategic plan against cancer for 2022 to 2026 was validated in March 2023. It follows a first plan for 2013 to 2017 which, the new plan says, was not carried out, and a national cancer programme created by decree in August 2019.",
          detail:
            "The plan gives the decree as No. 2019-228 and its date as 13 August in one place and 15 August in another. It builds on the findings of an imPACT review mission of June 2017 and was assessed for the ministry by the International Cancer Control Partnership, scoring 39.5% against an average of 36.8% for plans of WHO's African region. The expected results under its ten objectives include raising the cancer workforce by half, equipping four laboratories, radiotherapy and nuclear medicine in two general hospitals, access to cancer medicines for at least 30% of patients, and a national cancer registry. The ministry posted national guidelines for managing common cancers in the health district, dated February 2025, in March 2026, and in October 2026 its consultation on the 90 days against cancer initiative included an evaluation of how the plan has been carried out. OnCo found no published result of that evaluation.",
          links: [L_PLAN, L_GUIDE, L_90J],
        },
        {
          id: "services",
          title: "Four medical oncology services, 13 medical oncologists and six pathologists in the 2022 count",
          plain:
            "The cancer plan counts four medical oncology services, one children's cancer service and one blood cancer unit in the Republic of the Congo, and 34 cancer specialists in 2022, among them 13 medical oncologists, one radiation oncologist, one paediatric oncologist and six pathologists.",
          detail:
            "The same table counts five radiologists, three medical physicists, two radiotherapy radiographers, two oncology nurses, one registrar, and no surgical oncologist, epidemiologist or psycho-oncologist. The plan places five adult cancer units and one children's unit in four general hospitals and two district hospitals, pathology laboratories in two general hospitals and one private clinic, cancer surgery in three general hospitals and two district hospitals, and a treatment unit at the Makélékélé referral hospital. It records specialist training in eight specialities, among them medical oncology, general surgery and pathology, and partnerships with Roche and Novartis and with the IAEA. The cancer service of the Brazzaville university hospital dates from 5 December 1981. WHO's 2020 profile recorded pathology services as generally available and cancer management guidelines as existing in 2019.",
          links: [L_PLAN, L_WHO],
        },
        {
          id: "radiotherapy",
          title: "No working radiotherapy in the 2023 plan or in IAEA's directory: the plan aims for two machines, in Brazzaville and Pointe-Noire",
          plain:
            "The national cancer plan, validated in March 2023, records one radiotherapy service in the country and that it was not working, and IAEA's directory, read in November 2026, lists no radiotherapy centre. The plan's target is two general hospitals, one in Pointe-Noire and one in Brazzaville, offering radiotherapy, and it plans to ask the IAEA for help in acquiring two machines.",
          detail:
            "The African Cancer Registry Network's undated page, whose text speaks of 2012 and 2013, says the university hospital's cancer service had a cobalt machine, a Theratron 780C, which was not working for want of a radiation oncologist and a physicist. The plan of 2023 lists the absence of infrastructure for radiotherapy and nuclear medicine among the weaknesses of care, and plans advocacy to the IAEA for two machines, their installation in the two hospitals, and two houses where patients can stay between sessions. IAEA DIRAC's public data, read on 16 November 2026, has no row for the country, and WHO's 2021 cervical cancer profile recorded radiotherapy as not generally available in 2021. In February 2024 the government's declaration for World Cancer Day asked companies, charities and partners to help the national cancer programme acquire radiotherapy and cancer medicines. OnCo found no source saying where people who need radiotherapy are sent, or that a machine has since been installed.",
          links: [L_PLAN, L_AFCRN, L_DIRAC, L_CX, L_DECL],
        },
        {
          id: "palliative",
          title: "Palliative care: one association named in the plan, and morphine listed as lacking",
          plain:
            "The cancer plan lists the absence of morphine and of generic essential cancer medicines among the weaknesses of care, and too few health workers trained in palliative care in public facilities. It notes one association that offers palliative care.",
          detail:
            "WHO's 2021 cervical cancer profile recorded palliative care for people with non-communicable diseases as not generally available in primary health care or in community and home-based care, and reported opioid consumption for 2017 as 0 mg of oral morphine equivalent per person. WHO's 2020 profile recorded that in 2019 palliative care was not included in a non-communicable disease plan. The cancer plan does not name the association, and OnCo did not identify it. The plan's objective on medicines is that cancer medicines and supportive medicines are available at each level of the health system.",
          links: [L_PLAN, L_CX, L_WHO],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies matching Congo", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records, and none found in the registry, lists a site in the Republic of the Congo",
          plain:
            "None of the trials in OnCo's records lists the Republic of the Congo among its countries. A search of ClinicalTrials.gov for cancer studies in Congo returns studies whose sites are all in the Democratic Republic of the Congo, a different country. OnCo holds a selection of trials, not the whole registry.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists the Republic of the Congo. A query of the registry's own API that day for cancer studies with a location matching Congo returned nine studies; OnCo read the country field of each site, and every Congolese site was in the Democratic Republic of the Congo, in Kinshasa, Lubumbashi, Bunia and other towns. None was in Brazzaville or Pointe-Noire. The national cancer plan lists the lack of funding for cancer research among its threats and sets a target of at least one cancer study recorded each year.",
          links: [{ label: "ClinicalTrials.gov: cancer studies matching Congo", url: CTGOV }, L_PLAN],
        },
        {
          id: "published",
          title: "Published research: the registry's counts, late diagnosis of breast cancer, and what patients say holds them back",
          plain:
            "Research from Brazzaville that OnCo read includes the registry's twelve-year report, a 2025 study of late breast cancer diagnosis at the university hospital, and two 2026 surveys of patients from African cancer registries; in the chemotherapy survey, cost was an especially severe obstacle in the Republic of the Congo.",
          detail:
            "The breast cancer study covered 182 patients of the hospital's medical oncology service; diagnosis was delayed in 91.21%, and delay was associated with lack of finance and with later stage. Its authors call for routine screening, an equipped cancer centre and subsidised care. The two surveys, in the International Journal of Cancer, interviewed by telephone 553 people with cancer or their carers, registered in 2018 and 2019 in population-based registries in nine countries; staff of the Brazzaville registry are among the authors. For chemotherapy the abstract says affordability was especially severe in the Republic of Congo; for radiotherapy it lists Congo among four countries where a high share of patients reported barriers. Neither abstract gives the number of participants from Brazzaville. The cancer plan notes a periodical, Carcinologie Clinique en Afrique, among the country's assets for research.",
          links: [L_RCB, L_LATE, L_BARR_CT, L_BARR_RT, L_PLAN],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not found or not read for this page",
      plain:
        "OnCo did not find whether radiotherapy has been installed since the plan, whether the health insurance scheme pays for any cancer care, how medicines are authorised, or any registry count for adults after 2011. IARC's fact sheet does not name the registry its estimate rests on.",
      detail:
        "OnCo did not read the Brazzaville university hospital's own site for this page. OnCo read the cancer plan's situation analysis, objectives and financing tables as PDF text and not every activity table; pdftotext scrambles some of those tables, and the plan gives two HPV targets in different places. The national guidelines for common cancers (February 2025) and a second Octobre Rose page of 15 October 2026 were found on the ministry's site; the guidelines PDF was not read. The ICCP portal's search for Congo, read again on 16 November 2026, lists a national plan against non-communicable diseases for 2013 to 2017, which was not opened, and on its second page the cancer plan for 2022 to 2026; OnCo read the cancer plan from the ministry's site, not the portal's copy. In WHO's 2020 profile the cells for a national cancer control plan, HPV coverage and several workforce rows read n/a. A future pass should read the evaluation of the plan promised in October 2026, the guidelines, and the pharmacy law. Until then the national cancer programme at the ministry and the cancer service of the university hospital are the places to ask.",
      links: [L_PLAN, L_90J, L_GUIDE, { label: "ICCP portal: resources search for Congo", url: "https://www.iccp-portal.org/resources?search_api_fulltext=Congo" }],
    },
  ],
  institutions: ["congo-ministry-of-health", "chu-brazzaville", "brazzaville-cancer-registry", "who", "iarc", "iaea"],
  companies: [],
  drugs: ["morphine"],
  trials: [],
  papers: [
    "paper-nsonde-malanda-brazzaville-cancer-registry-1998-2009-bullcancer-2013",
    "paper-ilboudo-late-breast-cancer-diagnosis-brazzaville-cancercontrol-2025",
    "paper-konig-chemotherapy-barriers-africa-registries-ijc-2026",
    "paper-kroeber-radiotherapy-barriers-africa-registries-ijc-2026",
    "paper-waheed-hpv-vaccine-barriers-francophone-vaccine-2026",
  ],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: the Ministry of Health and Population's national cancer plan for 2022 to 2026 and five pages of its site, IARC's GLOBOCAN 2024 fact sheet, the African Cancer Registry Network's page for Brazzaville, WHO's 2020 cancer profile and 2021 cervical cancer profile, the World Bank's health expenditure series, WHO's immunisation data, IAEA's directory of radiotherapy centres, ClinicalTrials.gov, and the abstracts of five papers resolved through Europe PMC. Sources about the Democratic Republic of the Congo were set aside. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November, and the count on this page is unchanged.",
  verify:
    "The counts of services and staff here are the cancer plan's, for 2022, and the registry description is undated, with text that speaks of 2012 and 2013. Check with the treating hospital or the national cancer programme at the Ministry of Health and Population before relying on them.",
  verifyLinks: [L_PLAN, L_IARC],
};

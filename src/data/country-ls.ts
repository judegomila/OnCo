import type { CountryDive } from "@/data/country-dive";

/**
 * Lesotho deep dive: the hand-written cards for /countries/ls/ (wave 15). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Lesotho, WHO's Cancer
 * Country Profile 2020 and cervical cancer profile 2021 (PDF text), WHO's Global Health Observatory and immunisation
 * data APIs, the Government of Lesotho's own news pages, WHO's Africa office, the IAEA's country fact sheet, the
 * Botswana medicines regulator's page on Lesotho's visit, and Lesotho and regional newspapers (Newsday, The Reporter,
 * and an MNN Centre for Investigative Journalism report published on The Namibian's investigations site), each dated in
 * the prose. An accuracy pass on the same day re-read every source, added WHO's coverage-by-age-15 rows and corrected
 * attributions. DOIs were resolved through Europe PMC or Crossref and
 * the abstracts read. IARC builds Lesotho's incidence from neighbouring countries, so the GLOBOCAN figures here are
 * modelled, not counted. Sources that could not be read are named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/426-lesotho-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/lso-2020.pdf";
const WHO_CX_2021 = "https://www.iccp-portal.org/sites/default/files/plans/cervical-cancer-lso-2021-country-profile-en.pdf";
const GHO_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'LSO'";
const GHO_CHE = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'LSO'";
const GHO_GOV = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'LSO'";
const GHO_EXT = "https://ghoapi.azureedge.net/api/GHED_EXTCHE_SHA2011?$filter=SpatialDim%20eq%20'LSO'";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'LSO'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_HPV15_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'LSO'%20and%20startswith(ANTIGEN,'15HPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'LSO'";
const DIRAC = "https://dirac.iaea.org/";
const IAEA_TC = "https://www.iaea.org/sites/default/files/20/07/tc-lesotho.pdf";
const NAMIBIAN = "https://investigations.namibian.com.na/lesothos-cancer-burden-and-its-soaring-costs/";
const BMSF = "https://www.3blmedia.com/news/cancer-care-milestone-reached-lesotho";
const NEWSDAY_2026 = "https://newsdayonline.co.ls/delays-broken-equipment-and-foreign-referrals-continue-to-undermine-cancer-care-in-lesotho/";
const NEWSDAY_2025 = "https://newsdayonline.co.ls/mochoboroane-highlights-lesothos-progress-in-cancer-fight/";
const NEWSDAY_2023 = "https://newsdayonline.co.ls/ministry-acknowledges-oversight-in-new-medicines-law/";
const GOV_2018 = "https://www.gov.ls/government/not-enough-done-to-address-cancer/";
const GOV_2021 = "https://www.gov.ls/health/health-eager-to-make-cancer-ward-functional-at-qmmh/";
const GOV_2022_FEB = "https://www.gov.ls/health/lesotho-commemorates-cancer-day/";
const GOV_2022_OCT = "https://www.gov.ls/health/senkatana-oncology-clinic-inaugurated/";
const AFRO_2025 = "https://www.afro.who.int/countries/lesotho/news/bridging-cancer-prevention-diagnosis-and-care-gaps-lesotho";
const AFRO_2013 = "https://afro.who.int/countries/lesotho/news/launching-national-cervical-cancer-screening-program-lesotho";
const WHO_CPCD = "https://extranet.who.int/cpcd/health-legislation/countries/les/thematic-highlights";
const BOMRA = "https://www.bomra.co.bw/lesotho-health-minister-leads-delegation-on-benchmarking-visit-to-bomra/";
const REPORTER_2026 = "https://www.thereporter.co.ls/2026/03/27/health-ministry-gets-m5m-for-drug-authority-offices/";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=Lesotho";
const NCD_PLAN = "https://www.iccp-portal.org/sites/default/files/plans/LSO_B3_Endorsed%20NCD%20Stratergic%20Plan%20-%20Copy.pdf";
const AFCRN_LIST = "https://afcrn.org/index.php/membership/membership-list";
const CTGOV = "https://clinicaltrials.gov/search?country=Lesotho&cond=cancer";
const DOI_BARRIERS = "https://doi.org/10.4102/sajo.v8i0.291";
const DOI_TCM = "https://doi.org/10.1186/s12906-024-04388-3";
const DOI_HPV_ROUTINE = "https://doi.org/10.1136/bmjph-2025-003889";
const DOI_HPV_UPTAKE = "https://doi.org/10.1136/bmjopen-2025-110615";
const DOI_CX_DHS = "https://doi.org/10.1186/s12889-025-23593-4";
const DOI_CX_COST = "https://doi.org/10.3389/fpubh.2026.1888325";

export const LS_DIVE: CountryDive = {
  iso2: "LS",
  iso3: "LSO",
  name: "Lesotho",
  flag: "🇱🇸",
  asOf: "2026-11-16",
  title: "Cancer in Lesotho",
  description:
    "Cancer in Lesotho from public sources: chemotherapy at the Senkatana Oncology Clinic in Maseru since July 2022, no radiotherapy in the country and referral to Bloemfontein in South Africa paid by the government, IARC's modelled estimate of 2,136 new cancers and 1,341 deaths in 2024 built from neighbouring countries' rates, 719 cancer patients registered in 2025 by a newspaper's report, cervical cancer the commonest, HPV vaccination reintroduced in 2022, a medicines regulator created by a 2023 Act and still being set up, and no trial in OnCo's records with a site in Lesotho.",
  lede:
    "Chemotherapy has been given inside Lesotho since July 2022, at the Senkatana Oncology Clinic in Maseru; people who need radiotherapy are referred to Bloemfontein in South Africa at the government's expense, and WHO's Africa office reported in February 2025 that construction of a national cancer centre with radiotherapy had begun. WHO recorded no population-based cancer registry in Lesotho in 2021, and IARC's figures for the country are modelled from its neighbours' rates, not counted.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Lesotho is 2,136 new cancers and 1,341 deaths, an age-standardised incidence of 134.9 per 100,000 (135.6 in men, 142.9 in women) and mortality of 89.2. These are modelled figures, not counts. IARC's fact sheet gives its incidence method as \"Rates based on incidence estimates or registry data from neighbouring countries\", and its mortality method as \"National incidence estimates applied to model-based M:I ratios (registry survival data)\". WHO's 2020 profile adds that the incidence estimates have a high degree of uncertainty because they are not based on a population-based cancer registry, and the mortality estimates because they are not based on any national mortality data for non-communicable diseases. The country's own count is of registered patients: Newsday reported on 19 January 2026 that Lesotho registered 719 cancer patients in 2025. That is a count of people who were recorded, so the two numbers measure different things.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Lesotho",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Lesotho (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 2,100 new cancers a year by IARC's model, a quarter of them cervical",
          plain:
            "IARC estimates 2,136 new cancers in Lesotho in 2024, 1,356 of them in women, and 1,341 cancer deaths. These are modelled figures built from neighbouring countries' rates, not counts. Cervical cancer is estimated to be the commonest cancer and the commonest cause of cancer death. Breast and prostate cancer come next: breast is second for new cases and prostate second for deaths.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 536 cervical cancers (342 deaths), 255 breast cancers (144 deaths), 238 prostate cancers (146 deaths), 118 lung cancers (104 deaths) and 103 colorectal cancers (54 deaths), with Kaposi sarcoma sixth at 63 cases. Cervical cancer is 25.1% of all new cancers and 39.5% of those in women. The risk of developing a cancer before age 75 is put at 13.8%, and an estimated 4,051 people are living within five years of a diagnosis. The fact sheet states its incidence method as rates based on incidence estimates or registry data from neighbouring countries, so each of these numbers is an estimate of scale.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Lesotho (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "clinic-counts",
          title: "A newspaper's report of the country's own count: 719 patients registered in 2025",
          plain:
            "Lesotho's own cancer numbers are counts of registered patients. Newsday reported on 19 January 2026, in an article quoting a clinical radiation oncologist at the national oncology clinic, that Lesotho registered 719 cancer patients in 2025, led by cervical cancer with 265 cases.",
          detail:
            "The same report gives breast cancer 98, prostate cancer 97, lymphoma 18 and colon cancer 13 for 2025. Earlier counts come from an affidavit by the health ministry's principal secretary in June 2024, reported on 3 March 2025 by the MNN Centre for Investigative Journalism on The Namibian's investigations site: 606 new cancer cases in 2022, 647 in 2023 and 361 by the last week of May 2024. Two other figures for 2023 are in the sources. Newsday's January 2026 article says clinical records show 625 cases in 2023 and 750 by early 2024. A WHO Africa office article of 13 February 2025 gives about 1,888 new cases reported by the Senkatana clinic in 2023; 1,888 is also the total number of cancer cases for 2018 printed in WHO's 2020 profile. OnCo cannot tell from the sources which is right. The oncologist said deaths are not reliably counted, because many patients are treated as outpatients and deaths often go unreported.",
          links: [
            { label: "Newsday: delays, broken equipment and foreign referrals (19 January 2026)", url: NEWSDAY_2026 },
            { label: "The Namibian: Lesotho's cancer burden and its soaring costs (3 March 2025)", url: NAMIBIAN },
            { label: "WHO Africa: bridging the cancer prevention, diagnosis and care gaps in Lesotho (13 February 2025)", url: AFRO_2025 },
            { label: "WHO: Cancer Country Profile 2020, Lesotho (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "no-registry",
          title: "No population-based cancer registry on record",
          plain:
            "WHO's 2021 cervical cancer profile recorded that Lesotho had no population-based cancer registry, and the African Cancer Registry Network's member list, read on 16 November 2026, has no registry in Lesotho.",
          detail:
            "WHO's 2020 cancer profile lists the availability of a population-based registry in 2019 as \"no information\" and the quality of mortality registration for 2007 to 2016 as \"no coverage\". Its 2021 cervical cancer profile answers \"No\" to whether a population-based cancer registry exists. IARC's fact sheet names no country data source for incidence and uses neighbouring countries' rates. In January 2026 the oncologist quoted by Newsday said laboratory backlogs meant the service could not get a real-time picture of the cancer burden, and that accurate mortality statistics would need a dedicated study.",
          links: [
            { label: "WHO: cervical cancer country profile 2021, Lesotho (PDF, ICCP portal copy)", url: WHO_CX_2021 },
            { label: "WHO: Cancer Country Profile 2020, Lesotho (PDF)", url: WHO_PROFILE },
            { label: "African Cancer Registry Network: member registries", url: AFCRN_LIST },
            { label: "Newsday: delays, broken equipment and foreign referrals (19 January 2026)", url: NEWSDAY_2026 },
          ],
        },
      ],
      tables: [
        {
          id: "ls-globocan-sites",
          title: "The five commonest cancers in Lesotho, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024, modelled from neighbouring countries' rates.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Cervix uteri", cases: 536, deaths: 342 },
            { site: "Breast", cases: 255, deaths: 144 },
            { site: "Prostate", cases: 238, deaths: 146 },
            { site: "Lung", cases: 118, deaths: 104 },
            { site: "Colorectum", cases: 103, deaths: 54 },
          ],
          note: "These are estimates, not counts. IARC ranks these sites with non-melanoma skin cancer (117 cases in its data) left out, as its fact sheet does.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Lesotho (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "ls-clinic-2025",
          title: "Cancer patients registered in Lesotho in 2025",
          caption: "Cancer patients registered in Lesotho in 2025, as reported by Newsday on 19 January 2026.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "Patients registered", numeric: true },
          ],
          rows: [
            { site: "All cancers", cases: 719 },
            { site: "Cervical", cases: 265 },
            { site: "Breast", cases: 98 },
            { site: "Prostate", cases: 97 },
            { site: "Lymphoma", cases: 18 },
            { site: "Colon", cases: 13 },
          ],
          note: "Registrations reported in a newspaper, not a registry's published count. The article names five cancers, which together make 491 of the 719.",
          sources: [{ label: "Newsday: delays, broken equipment and foreign referrals (19 January 2026)", url: NEWSDAY_2026 }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care",
      cards: [
        {
          id: "referral-abroad",
          title: "The government pays for treatment in South Africa",
          plain:
            "Lesotho's government pays for people with cancer to be treated in Bloemfontein, South Africa. A report published by The Namibian on 3 March 2025 says the health minister put the cost at 250,000 maloti a patient on 5 February 2025, covering treatments that include radiotherapy.",
          detail:
            "The same report, produced by the MNN Centre for Investigative Journalism, says the ministry's principal secretary told the High Court in an affidavit of June 2024 that the treatment debt to South African hospitals stood at M148 million and that the ministry had defaulted on it, and that 80% of patients referred abroad could not get early treatment because the receiving countries were themselves overwhelmed by their own growing numbers of cancer patients. Newsday reported in January 2026 that the health minister had said spending per patient rose from about M145,000 in 2015 to M220,000 in 2023, and that Lesotho was spending an estimated M12 million a month on transporting and treating patients in South Africa. Earlier government pages give the history: in July 2018 the King said about 900 patients a year were transferred to South Africa and that a first group had been taken to India at the Indian government's offer, and in September 2021 the Director-General of Health Services put the cost of sending patients to South Africa and India at almost 7 million US dollars a year.",
          links: [
            { label: "The Namibian: Lesotho's cancer burden and its soaring costs (3 March 2025)", url: NAMIBIAN },
            { label: "Newsday: delays, broken equipment and foreign referrals (19 January 2026)", url: NEWSDAY_2026 },
            { label: "Government of Lesotho: not enough done to address cancer (24 July 2018)", url: GOV_2018 },
            { label: "Government of Lesotho: health eager to make cancer ward functional at QMMH (28 September 2021)", url: GOV_2021 },
          ],
        },
        {
          id: "spending",
          title: "About USD 123 a person on health in 2023, 13% of it out of pocket",
          plain:
            "Lesotho spent about 123 US dollars a person on health in 2023, according to WHO's health expenditure figures. Households paid 13.2% of it out of pocket, the government 46.3% and external donors 40.5%.",
          detail:
            "WHO's Global Health Observatory gives current health spending of USD 115.81 per person in 2021, 133.33 in 2022 and 122.64 in 2023, and out-of-pocket spending of 14.67%, 12.75% and 13.20% of current health spending in those years. Domestic government spending was 46.34% and external funding 40.46% in 2023. These figures cover all health care, not cancer. A survey of 115 patients at the Senkatana oncology clinic, published in 2024, describes the costs that fall on patients: 64.3% said distance to facilities was a difficulty, 66.1% had trouble arranging transport, and paying for transport, health care and diagnostic tests was a major constraint. The health minister has proposed a national health insurance system, Newsday reported in January 2026; OnCo found no source showing one in operation.",
          links: [
            { label: "WHO Global Health Observatory: out-of-pocket share of current health expenditure, Lesotho (data API)", url: GHO_OOP },
            { label: "WHO Global Health Observatory: current health expenditure per capita, Lesotho (data API)", url: GHO_CHE },
            { label: "WHO Global Health Observatory: domestic government share, Lesotho (data API)", url: GHO_GOV },
            { label: "WHO Global Health Observatory: external share, Lesotho (data API)", url: GHO_EXT },
            { label: "Ramathebane and others, South African Journal of Oncology 2024", url: DOI_BARRIERS },
            { label: "Newsday: delays, broken equipment and foreign referrals (19 January 2026)", url: NEWSDAY_2026 },
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
          id: "lemera",
          title: "A medicines regulator created by a 2023 Act and still being set up",
          plain:
            "Parliament passed the Lesotho Medicines and Medical Devices Control Authority Act in 2023 to create a medicines regulator, written LeMeRA or LeMERA in the reports OnCo read. Those reports describe the authority as still being set up in 2026: The Reporter wrote in March that the National Assembly had approved 5 million maloti to build its offices.",
          detail:
            "Botswana's medicines regulator, which hosted a Lesotho delegation in June 2026, reported the health minister as saying that the Act (No. 6 of 2023) was a milestone towards a functional national regulatory authority \"now progressing towards operationalisation\". The Reporter quoted the health minister telling parliament in March 2026 that medicines were entering the country unregistered and that the authority would fill that gap and employ pharmacists to oversee registration. Newsday described the Act as recently gazetted in September 2023, when the ministry's legal director told a parliamentary committee that regulations under it were still to be made. Before the Act, WHO's legislation database records the national health strategic plan for 2018/19 to 2022/23 as saying that slow enactment of the bill had \"resulted in the absence of Medicine Regulatory Authority and poor regulation of medicines\". WHO's August 2026 list of regulators at maturity level 3 or 4 does not include Lesotho. The African Union's list dated 19 September 2023 gives 17 August 2022 as the date Lesotho ratified or acceded to the African Medicines Agency treaty, deposited on 12 September 2022, with no signature date. OnCo has not read the Act itself, so what this card says about it rests on these reports; see the gaps below.",
          links: [
            { label: "Botswana Medicines Regulatory Authority: Lesotho health minister leads benchmarking visit (June 2026)", url: BOMRA },
            { label: "The Reporter: health ministry gets M5m for drug authority offices (27 March 2026)", url: REPORTER_2026 },
            { label: "Newsday: ministry acknowledges oversight in new medicines law (4 September 2023)", url: NEWSDAY_2023 },
            { label: "WHO Country Planning Cycle Database: Lesotho, health legislation highlights", url: WHO_CPCD },
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
      aside: { label: "WHO: cervical cancer country profile 2021, Lesotho (PDF, ICCP portal copy)", url: WHO_CX_2021 },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination reintroduced in 2022, with coverage figures that disagree",
          plain:
            "WHO's immunisation records mark the HPV vaccine as introduced in Lesotho from 2022. WHO's programme coverage for the first dose in girls was 59% in 2022, 58% in 2023, 70% in 2024 and 30% in 2025. WHO's own estimate of coverage by age 15 and other sources give higher figures for 2024.",
          detail:
            "The WHO immunisation data API rows are programme coverage in females: first dose 59%, 58%, 70% and 30% for 2022 to 2025, and last dose 55%, 58%, 70% and 30%; the 2025 row is 8,247 doses against a target of 27,640 girls. The same WHO data hold a separate estimate, coverage by age 15, which is higher: first dose 92% for 2023, 93% for 2024 and 83% for 2025, and last dose 65%, 69% and 83%. WHO's Africa office reported in February 2025 that the health minister had said about 93% of girls aged 9 to 14 received the vaccine in 2024. A nationally representative survey in 2024, published in BMJ Public Health in 2026, found first-dose coverage of 85% and second-dose coverage of 52.9% among 279 eligible girls aged 9 to 17, with lower completion among girls out of school. A separate population-based cross-sectional study, in BMJ Open in 2026, says Lesotho reintroduced its national HPV programme in 2022 and found 52.15% of girls aged 15 to 17 vaccinated. OnCo reports these figures side by side and cannot reconcile them. A government page of September 2021 described the 2022 start as a national re-introduction for girls aged 9 to 14.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage, Lesotho (data API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: HPV coverage by age 15, Lesotho (data API)", url: WHO_HPV15_API },
            { label: "WHO immunisation data: vaccine introduction, Lesotho (data API)", url: WHO_INTRO_API },
            { label: "WHO Africa: bridging the cancer prevention, diagnosis and care gaps in Lesotho (13 February 2025)", url: AFRO_2025 },
            { label: "Zbelo and others, BMJ Public Health 2026", url: DOI_HPV_ROUTINE },
            { label: "Tebeje and others, BMJ Open 2026", url: DOI_HPV_UPTAKE },
            { label: "Government of Lesotho: health eager to make cancer ward functional at QMMH (28 September 2021)", url: GOV_2021 },
          ],
        },
        {
          id: "cervical-screening",
          title: "Cervical screening: launched in 2013, reaching about four women in ten by 2024",
          plain:
            "Lesotho launched a national cervical cancer screening programme at the Senkatana centre in Maseru on 30 January 2013. In the 2024 Demographic and Health Survey, 38.9% of 3,250 women of reproductive age had been screened.",
          detail:
            "WHO's Africa office reported the 2013 launch, funded by USAID, in cooperation with the Ministry of Health and EGPAF, the initials the article uses for the Elizabeth Glaser Pediatric AIDS Foundation. WHO's profiles record less: the 2020 profile lists cervical screening and a breast screening programme as \"no\" for 2019, and the 2021 cervical profile says no national screening programme existed, with 14% of women aged 30 to 49 screened in the last five years and 17% ever screened in 2019. The Director-General of Health Services said in September 2021 that screening was available at all health facilities. A survey of 100 women at the Senkatana Cervical Cancer Center of Excellence between January and November 2025, published in 2026, found Pap smear, HPV DNA testing and visual inspection in use, a mean wait of 32.4 days for results, and a mean cost to the patient of 21.4 international dollars a visit, of which direct medical costs were 4% and the rest indirect costs and lost productivity.",
          links: [
            { label: "WHO Africa: the launching of the national cervical cancer screening programme in Lesotho", url: AFRO_2013 },
            { label: "Wassie and others, BMC Public Health 2025", url: DOI_CX_DHS },
            { label: "WHO: cervical cancer country profile 2021, Lesotho (PDF, ICCP portal copy)", url: WHO_CX_2021 },
            { label: "WHO: Cancer Country Profile 2020, Lesotho (PDF)", url: WHO_PROFILE },
            { label: "Government of Lesotho: health eager to make cancer ward functional at QMMH (28 September 2021)", url: GOV_2021 },
            { label: "Sefuthi and others, Frontiers in Public Health 2026", url: DOI_CX_COST },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What stands out",
      title: "What stands out in Lesotho",
      cards: [
        {
          id: "senkatana",
          title: "Chemotherapy inside the country since July 2022",
          plain:
            "The Senkatana Oncology Clinic in Maseru gave the first chemotherapy infusion inside Lesotho in July 2022, the Bristol Myers Squibb Foundation reported. Newsday reported in January 2026 that surgery and chemotherapy are available in the country and radiotherapy is not.",
          detail:
            "The foundation, which says it provides resources and in-service training for pharmacists and oncology nurses in Lesotho, said more than 20 patients were receiving treatment and follow-up three months after it opened. The government inaugurated the clinic in October 2022, when the Director-General of Health Services said only breast cancer treatment was running at first. The Namibian reported in March 2025 that Senkatana, at the Botshabelo complex, was the only oncology clinic serving the country, set up in 2020 with the foundation's funding. In January 2026 Newsday reported that Lesotho appointed a second oncologist in 2025 after four years with one, that two specialists in nuclear medicine and two in medical physics were in place, that the Dana-Farber Cancer Institute gives mentorship through Partners In Health, and that patients waited about four months on average to begin treatment after referral from district facilities.",
          links: [
            { label: "Bristol Myers Squibb Foundation via 3BL Media: cancer care milestone reached in Lesotho (6 December 2022)", url: BMSF },
            { label: "Government of Lesotho: Senkatana Oncology Clinic inaugurated (24 October 2022)", url: GOV_2022_OCT },
            { label: "The Namibian: Lesotho's cancer burden and its soaring costs (3 March 2025)", url: NAMIBIAN },
            { label: "Newsday: delays, broken equipment and foreign referrals (19 January 2026)", url: NEWSDAY_2026 },
          ],
        },
        {
          id: "radiotherapy",
          title: "No radiotherapy yet: patients go to South Africa while a cancer centre is built",
          plain:
            "Lesotho does not offer radiotherapy, Newsday reported in January 2026, and patients who need it are referred to South Africa. The IAEA's public directory of radiotherapy centres lists no entry for Lesotho. WHO's Africa office reported in February 2025 that construction of a national cancer centre with radiotherapy had started.",
          detail:
            "The ministry's principal secretary said in her June 2024 affidavit that 60% of each year's patients need radiation therapy and that staff trained for it had finished training with no facility to work in. Newsday reported in January 2026 that the country's Comprehensive Cancer Centre was expected to be completed by 2027 and would offer radiotherapy, and that people needing chemotherapy and radiotherapy together are often transferred entirely to South Africa after surgery in Lesotho. WHO's Africa office reported in February 2025 that construction had started. The IAEA's undated country fact sheet lists establishing a radiotherapy facility among its main areas of support and gives 2011 as the year of its cancer control review. WHO's 2020 profile recorded no external beam radiotherapy machine in 2019. The absence of a directory entry is what the IAEA lists, not proof on its own.",
          links: [
            { label: "Newsday: delays, broken equipment and foreign referrals (19 January 2026)", url: NEWSDAY_2026 },
            { label: "The Namibian: Lesotho's cancer burden and its soaring costs (3 March 2025)", url: NAMIBIAN },
            { label: "WHO Africa: bridging the cancer prevention, diagnosis and care gaps in Lesotho (13 February 2025)", url: AFRO_2025 },
            { label: "IAEA: Lesotho technical cooperation fact sheet (PDF)", url: IAEA_TC },
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: DIRAC },
            { label: "WHO: Cancer Country Profile 2020, Lesotho (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "plan",
          title: "No national cancer plan found; an older plan covers non-communicable diseases",
          plain:
            "WHO's 2020 profile recorded \"n/a\" for a national cancer control plan in Lesotho in 2019, alongside an operational integrated plan for non-communicable diseases and cancer management guidelines. A search of the ICCP portal on 16 November 2026 returned no cancer plan for Lesotho.",
          detail:
            "The portal's search for Lesotho returned four documents: WHO's cancer country profiles for 2014 and 2020, WHO's 2021 cervical cancer profile, and the Ministry of Health's national multi-sectoral integrated strategic plan for the prevention and control of non-communicable diseases, 2014 to 2020. WHO's 2020 profile also recorded that palliative care was included in the non-communicable disease plan, that staff in the ministry gave a significant share of their time to cancer, that pathology services were generally available, and that community or home-based palliative care was generally not available. Newsday reported on 7 July 2025 that the health minister had told a meeting in Addis Ababa that, with the IAEA's guidance, Lesotho had developed a detailed plan for building and running its cancer centre; OnCo has not read that plan.",
          links: [
            { label: "WHO: Cancer Country Profile 2020, Lesotho (PDF)", url: WHO_PROFILE },
            { label: "ICCP portal: search results for Lesotho", url: ICCP_SEARCH },
            { label: "Ministry of Health, Lesotho: non-communicable diseases strategic plan 2014 to 2020 (PDF, ICCP portal)", url: NCD_PLAN },
            { label: "Newsday: Mochoboroane highlights Lesotho's progress in cancer fight (7 July 2025)", url: NEWSDAY_2025 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Lesotho", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Lesotho",
          plain:
            "None of the trials in OnCo's records lists Lesotho among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Lesotho. A query of the registry's own interface on the same day for cancer studies with a Lesotho site returned one study, a completed trial of text messages for alcohol use, which is not a cancer treatment trial.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with sites in Lesotho", url: CTGOV }],
        },
        {
          id: "papers",
          title: "What has been published from the oncology clinic",
          plain:
            "Published research from Lesotho's cancer service is recent and small. Two surveys of patients at the Senkatana Oncology Clinic describe the barriers patients face and their use of traditional and complementary medicine.",
          detail:
            "The first, in the South African Journal of Oncology in 2024, interviewed 115 patients: 53.9% found access difficult because services were spread across several facilities, and all reported long queues. The second, in BMC Complementary Medicine and Therapies in 2024, interviewed 50 patients in May and June 2023: all reported using traditional or complementary medicine, 94% alongside their hospital treatment, and patients said they did not tell their oncologist. Other papers use national survey data on screening and vaccination and are cited in the screening section. OnCo found no published treatment outcome or survival study from Lesotho.",
          links: [
            { label: "Ramathebane and others, South African Journal of Oncology 2024", url: DOI_BARRIERS },
            { label: "Sooro and others, BMC Complementary Medicine and Therapies 2024", url: DOI_TCM },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-ministry-and-law",
      title: "The ministry's site, the 2023 Act and the cancer centre plan were not read",
      plain:
        "OnCo could not read the Ministry of Health's own website, the text of the 2023 medicines Act, or the plan for the cancer centre. What this page says about them comes from newspapers, another country's regulator and WHO.",
      detail:
        "On 16 November 2026 health.gov.ls failed its security certificate check and was not read. The Lesotho Legal Information Institute's page for the Government Gazette returned a challenge page to a script, so the Act's text, its commencement and the authority's powers over clinical trials are not described here. IAEA news pages on Lesotho also returned a challenge page. The opening date, funding and equipment of the cancer centre are therefore unconfirmed; the date of 2027 is a newspaper's. A future pass should read the Act in the Gazette, the IAEA's project pages and any ministry statement, and anyone needing a medicine's status should ask the ministry's pharmaceutical directorate directly.",
      links: [
        { label: "Botswana Medicines Regulatory Authority: Lesotho health minister leads benchmarking visit (June 2026)", url: BOMRA },
        { label: "IAEA: Lesotho technical cooperation fact sheet (PDF)", url: IAEA_TC },
      ],
    },
    {
      id: "gap-figures",
      title: "Figures this page could not settle",
      plain:
        "Three sets of figures disagree and OnCo has not resolved them: how many new cancer patients are recorded a year, HPV vaccination coverage in 2024, and what referral abroad costs per patient.",
      detail:
        "The yearly count for 2023 is 647 in a sworn statement, 625 in Newsday's account of clinical records and about 1,888 in a WHO Africa article. HPV coverage for 2024 is 70% in WHO's programme figure and 93% in WHO's estimate by age 15, about 93% by the minister's account and 85% for the first dose in a household survey. Referral cost per patient is given as M220,000 for 2023 and M250,000 in 2025. No source gave survival or stage at diagnosis from a defined group of patients, beyond the principal secretary's statement that 40% arrive at an advanced stage. The UICC member page for the Action Against Cancer Association refused a script with an error, and DIRAC's absence of an entry was read from its public table. A future pass should look for the ministry's annual report and the 2023 to 2024 Demographic and Health Survey report; patients can ask the Senkatana Oncology Clinic what is available now.",
      links: [
        { label: "The Namibian: Lesotho's cancer burden and its soaring costs (3 March 2025)", url: NAMIBIAN },
        { label: "WHO immunisation data: HPV programme coverage, Lesotho (data API)", url: WHO_HPV_API },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: DIRAC },
      ],
    },
  ],
  institutions: ["senkatana-oncology-clinic", "lesotho-ministry-of-health", "lesotho-medicines-regulatory-authority", "action-against-cancer-lesotho", "dana-farber", "who", "iarc", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-ramathebane-barriers-cancer-services-lesotho-sajo-2024",
    "paper-sooro-traditional-medicine-senkatana-bmccmt-2024",
    "paper-zbelo-routine-hpv-vaccination-lesotho-bmjph-2026",
    "paper-wassie-cervical-screening-lesotho-dhs-bmcph-2025",
    "paper-sefuthi-patient-costs-cervical-screening-lesotho-fph-2026",
  ],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 and 2021 country profiles, WHO's health expenditure and immunisation data, the Government of Lesotho's news pages, WHO's Africa office, the IAEA's fact sheet and directory, the African Union's treaty list, and dated reports in Newsday, The Reporter and The Namibian. Papers were resolved by DOI through Europe PMC or Crossref and their abstracts read. Where sources disagree the page gives each with its date. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November, and the count on this page is unchanged.",
  verify:
    "The GLOBOCAN numbers are modelled estimates, the clinic's counts and costs come from newspaper reports and a court statement, and services change. Anyone seeking care should ask the Senkatana Oncology Clinic or the Ministry of Health what is available now and how referral to South Africa is arranged.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Lesotho (PDF)", url: IARC_FACTSHEET },
    { label: "WHO: Cancer Country Profile 2020, Lesotho (PDF)", url: WHO_PROFILE },
    { label: "WHO: cervical cancer country profile 2021, Lesotho (PDF, ICCP portal copy)", url: WHO_CX_2021 },
  ],
};

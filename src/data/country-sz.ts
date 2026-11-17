import type { CountryDive } from "@/data/country-dive";

/**
 * Eswatini deep dive: the hand-written cards for /countries/sz/ (wave 15). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Eswatini, the Ministry
 * of Health's National Cancer Control Strategic Plan 2025 to 2029, its National Cancer Prevention and Control Strategy
 * 2019, its cervical cancer elimination plan and a July 2024 Ministry presentation (all PDF text on the ICCP portal),
 * the ministry's 2021 pharmacovigilance policy, WHO's Cancer Country Profile 2020 and cervical cancer profile 2021, WHO's Global Health Observatory and
 * immunisation data APIs, the African Cancer Registry Network's page, the IAEA's 2017 review summary and country fact
 * sheet, and WHO's legislation database. DOIs were resolved through Europe PMC and the abstracts read. Sources that
 * could not be read, including the government's own website, are named under `gaps`. An accuracy pass on the same day
 * re-read every source, checked the registry chart's labels against the rendered slide and added WHO's
 * coverage-by-age-15 rows.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/748-eswatini-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/cancer-swz-2020.pdf";
const WHO_CX_2021 = "https://www.iccp-portal.org/sites/default/files/plans/cervical-cancer-swz-2021-country-profile-en.pdf";
const PLAN_2025 = "https://www.iccp-portal.org/sites/default/files/2026-03/Final%20NCCU%20Strategic%20Plan%20Document.pdf";
const STRATEGY_2019 = "https://www.iccp-portal.org/sites/default/files/plans/ESwatini%20NCCP%202019.pdf";
const CX_PLAN = "https://www.iccp-portal.org/sites/default/files/2025-07/Eswatini%20Cervical%20Cancer%20Elimination%20Acceleration%20Plan%202025-2030.pdf";
const ECHO_2024 = "https://www.iccp-portal.org/sites/default/files/resources/ICCP%20ECHO%202024%20session%207%20slides%20-%20presentation%20Eswatini.pdf";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=Eswatini";
const AFCRN_SZ = "https://afcrn.org/index.php/membership/membership-list/146-eswatinincr";
const IMPACT_2017 = "https://www.iaea.org/sites/default/files/documents/review-missions/eswatini_-_2017_impact_review.pdf";
const IAEA_TC = "https://www.iaea.org/sites/default/files/25/02/tc-eswatini.pdf";
const ARO_2025 = "https://www.appliedradiationoncology.com/news/eswatini-working-to-finalize-the-country-s-first-radiotherapy-center";
const EHOSPICE = "https://ehospice.com/africa_posts/the-role-of-south-to-south-partnerships-in-developing-cancer-services-in-africa/";
const DIRAC = "https://dirac.iaea.org/";
const GHO_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'SWZ'";
const GHO_CHE = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'SWZ'";
const GHO_GOV = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'SWZ'";
const GHO_EXT = "https://ghoapi.azureedge.net/api/GHED_EXTCHE_SHA2011?$filter=SpatialDim%20eq%20'SWZ'";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'SWZ'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_HPV15_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'SWZ'%20and%20startswith(ANTIGEN,'15HPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'SWZ'";
const WHO_CPCD = "https://extranet.who.int/cpcd/health-legislation/countries/swz/legislative-instruments";
const PV_POLICY = "https://media.tghn.org/medialibrary/2023/04/Eswatini_PV_policy_-_June_2021.pdf";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const CTGOV = "https://clinicaltrials.gov/search?country=Eswatini&cond=cancer";
const CTGOV_HPV = "https://clinicaltrials.gov/study/NCT04982614";
const DOI_SURVIVAL = "https://doi.org/10.1371/journal.pgph.0006309";
const DOI_EARLY = "https://doi.org/10.1016/j.canep.2026.103071";
const DOI_HPV = "https://doi.org/10.31557/apjcp.2025.26.6.1891";
const DOI_CX_COST = "https://doi.org/10.1371/journal.pone.0250113";
const DOI_PR_COST = "https://doi.org/10.1186/s12913-022-07817-6";
const DOI_PHIA = "https://doi.org/10.1371/journal.pone.0354508";

export const SZ_DIVE: CountryDive = {
  iso2: "SZ",
  iso3: "SWZ",
  name: "Eswatini",
  flag: "🇸🇿",
  asOf: "2026-11-16",
  title: "Cancer in Eswatini",
  description:
    "Cancer in Eswatini from its own plans and registry: a national cancer registry since 2015 with 6,785 new cases recorded from 2016 to 2023, a 60-bed oncology unit at Manzini opened in 2022 and chemotherapy at Mbabane Government Hospital, no radiotherapy in the country and referral to South Africa through the Phalala Medical Referral Fund, IARC's estimate of 1,078 new cancers and 642 deaths in 2024 with cervical cancer 38% of the new cases, HPV vaccination since June 2023, a national cancer control plan for 2025 to 2029, a medicines regulator provided for in law, and no trial in OnCo's records with a site in Eswatini.",
  lede:
    "Eswatini gives chemotherapy at a 60-bed oncology unit in Manzini, opened in 2022, and at Mbabane Government Hospital; radiotherapy is reached by referral to South Africa through the government's Phalala Medical Referral Fund while a first radiotherapy centre is planned at Manzini. A national cancer registry has recorded cases since 2016, and cervical cancer is the commonest cancer in IARC's figures, which are built from the registry's rates.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Eswatini is 1,078 new cancers and 642 deaths, an age-standardised incidence of 114.3 per 100,000 (91.8 in men, 138.4 in women) and mortality of 71.8. IARC's fact sheet gives its incidence data source as \"Registry (national)\" and its method as \"National rates applied to 2024 population\", so the incidence figures rest on the Eswatini National Cancer Registry's rates. Its mortality method is \"National incidence estimates applied to model-based M:I ratios (registry survival data)\", which means deaths are modelled, not counted: WHO's 2020 profile recorded no coverage of death registration. The registry's own counts, from a Ministry of Health presentation in July 2024, are 6,785 new cases from 2016 to 2023 and between 888 and 1,154 a year from 2019 to 2023. The Ministry's 2025 to 2029 plan says cancer is not legally notifiable and that private-sector data are limited, so the registry may undercount.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Eswatini",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Eswatini (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 1,100 new cancers a year, nearly four in ten of them cervical",
          plain:
            "IARC estimates 1,078 new cancers in Eswatini in 2024, 743 of them in women, and 642 cancer deaths. Cervical cancer is the commonest cancer and the commonest cause of cancer death, followed by prostate and breast cancer. The incidence figures are built from the national registry's rates.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 414 cervical cancers (235 deaths), 107 prostate cancers (64 deaths), 95 breast cancers (56 deaths), 50 cases of Kaposi sarcoma (19 deaths), and 40 each of lung cancer (38 deaths) and colorectal cancer (23 deaths). Cervical cancer is 38.4% of all new cancers and 55.7% of those in women, at an age-standardised rate of 76.5 per 100,000 women. The risk of developing a cancer before age 75 is put at 10.9%, and an estimated 2,466 people are living within five years of a diagnosis. The Ministry of Health's 2025 to 2029 plan links the pattern to HIV, giving an HIV prevalence of 24.8% and naming Kaposi sarcoma, cervical cancer and non-Hodgkin lymphoma as the cancers it drives.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Eswatini (PDF)", url: IARC_FACTSHEET },
            { label: "Ministry of Health, Eswatini: National Cancer Control Strategic Plan 2025 to 2029 (PDF, ICCP portal)", url: PLAN_2025 },
          ],
        },
        {
          id: "encr",
          title: "A national registry since 2015, with 6,785 cases recorded from 2016 to 2023",
          plain:
            "The Ministry of Health re-established a cancer registry in August 2015 and made it national. A Ministry presentation in July 2024 said it recorded its first case in 2016 and held 6,785 new cancer cases for 2016 to 2023, 66% of them in women.",
          detail:
            "The African Cancer Registry Network's page, last updated on 1 May 2017, says reporting requirements set in October 2015 obliged public and private hospitals and laboratories that diagnose or treat cancer to make data available, and that the registry finds cases actively in hospitals, pathology and radiology reports, oncology reports, death certificates and chemotherapy units, entering them in CanReg5. WHO's 2020 profile recorded a population-based registry in 2019, and IARC's 2024 fact sheet names a national registry as its data source. The Ministry's 2025 to 2029 plan credits the registry with population-wide coverage and lists what limits it: cancer is not legally notifiable, private-sector data are limited and there is underreporting. It recommends mandatory cancer reporting. The network's page has not been updated since 2017, so its background details are not repeated here.",
          links: [
            { label: "African Cancer Registry Network: Eswatini National Cancer Registry (updated 1 May 2017)", url: AFCRN_SZ },
            { label: "Ministry of Health, Eswatini: use of data for monitoring the national cancer plan (ICCP ECHO slides, 17 July 2024, PDF)", url: ECHO_2024 },
            { label: "Ministry of Health, Eswatini: National Cancer Control Strategic Plan 2025 to 2029 (PDF, ICCP portal)", url: PLAN_2025 },
            { label: "WHO: Cancer Country Profile 2020, Eswatini (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "registry-research",
          title: "What the registry's data have shown about cervical cancer",
          plain:
            "Two studies published in 2026 used the registry's records of women with cervical cancer. One found that 59% of 2,349 women in the registry from 2016 to 2024 did not receive any treatment, and that treatment was associated with a 30% lower hazard of death.",
          detail:
            "The survival study, in PLOS Global Public Health, covered 2,349 women in the registry from 2016 to 2024, of whom 603 deaths were analysed. In that group, median survival was about 40 months for women diagnosed at stage 1 and about 10 months at stage 4, and chemotherapy, radiation or surgery lowered the hazard of death (hazard ratio 0.70, 95% CI 0.59 to 0.84). A median is the middle of a group: half the women lived longer than the figure. The abstract does not say whether these medians describe all 2,349 women or the 603 whose deaths were analysed, and it gives no range around them. The second study, in Cancer Epidemiology, covered 2,099 women diagnosed from 2016 to 2022, with a mean age at diagnosis of 49.0 years; its abstract reports that the share diagnosed at an advanced stage was falling, and that women living with HIV were more often diagnosed with cancer that had already spread.",
          links: [
            { label: "Msibi and others, PLOS Global Public Health 2026", url: DOI_SURVIVAL },
            { label: "Vilakati and others, Cancer Epidemiology 2026", url: DOI_EARLY },
          ],
        },
      ],
      tables: [
        {
          id: "sz-registry-years",
          title: "New cancer cases and deaths recorded by the Eswatini National Cancer Registry, 2019 to 2023",
          caption: "Cases and cancer deaths per year, from the data labels of a chart in a Ministry of Health presentation dated 17 July 2024.",
          columns: [
            { key: "year", label: "Year" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { year: "2019", cases: 1037, deaths: 361 },
            { year: "2020", cases: 888, deaths: 305 },
            { year: "2021", cases: 903, deaths: 194 },
            { year: "2022", cases: 1154, deaths: 429 },
            { year: "2023", cases: 902, deaths: 200 },
          ],
          note: "Read from a slide, not a published registry report. The accuracy pass checked each data label against the rendered slide, where it sits above its year. The same slide gives 6,785 new cases for 2016 to 2023, 66% of them in women. The deaths are those shown on the registry's slide; WHO's 2020 profile recorded no coverage of death registration in Eswatini.",
          sources: [{ label: "Ministry of Health, Eswatini: use of data for monitoring the national cancer plan (ICCP ECHO slides, 17 July 2024, PDF)", url: ECHO_2024 }],
        },
        {
          id: "sz-globocan-sites",
          title: "The commonest cancers in Eswatini, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024; incidence from national registry rates, deaths modelled.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Cervix uteri", cases: 414, deaths: 235 },
            { site: "Prostate", cases: 107, deaths: 64 },
            { site: "Breast", cases: 95, deaths: 56 },
            { site: "Kaposi sarcoma", cases: 50, deaths: 19 },
            { site: "Lung", cases: 40, deaths: 38 },
            { site: "Colorectum", cases: 40, deaths: 23 },
          ],
          note: "Six rows, because lung and colorectal cancer tie for fifth at 40 cases each. Non-melanoma skin cancer is left out of the ranking, as in IARC's fact sheet.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Eswatini (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care",
      cards: [
        {
          id: "phalala",
          title: "The Phalala Medical Referral Fund pays for care the country does not have",
          plain:
            "The Ministry of Health's 2025 to 2029 plan says the government's Phalala Medical Referral Fund supports patients who need specialised care that is not available in Eswatini, mainly in South Africa. By the plan's account radiotherapy is reached by referral abroad, and most children with cancer are referred abroad under the fund.",
          detail:
            "The Ministry of Health's 2019 strategy describes the fund as assisting \"financially deserving Eswatini citizens\" who would otherwise have no access to specialist care, and says the ministry uses it to refer cancer patients to local private hospitals and to South Africa for surgery, radiation therapy or chemotherapy; in 2017, 37% of referred cases were cancer. The 2025 to 2029 plan says radiation therapy is accessed through international referral, that most children with cancer are referred abroad under the fund along a referral pathway to Chris Hani Baragwanath Hospital, and lists a referral backlog among its challenges. The cervical cancer elimination plan says a small proportion of the women who need radiotherapy are transferred. Reports that the fund was suspended for adults in 2024 are in a newspaper OnCo could not read; see the gaps below.",
          links: [
            { label: "Ministry of Health, Eswatini: National Cancer Prevention and Control Strategy 2019 (PDF, ICCP portal)", url: STRATEGY_2019 },
            { label: "Ministry of Health, Eswatini: National Cancer Control Strategic Plan 2025 to 2029 (PDF, ICCP portal)", url: PLAN_2025 },
            { label: "Kingdom of Eswatini: cervical cancer elimination acceleration plan (PDF, ICCP portal)", url: CX_PLAN },
          ],
        },
        {
          id: "spending",
          title: "About USD 296 a person on health in 2023, 11% of it out of pocket",
          plain:
            "Eswatini spent about 296 US dollars a person on health in 2023, according to WHO's health expenditure figures. Households paid 11.0% of it out of pocket, the government 42.7% and external donors 28.4%.",
          detail:
            "WHO's Global Health Observatory gives current health spending of USD 297.72 per person in 2021, 284.76 in 2022 and 296.05 in 2023, and out-of-pocket spending of 10.77%, 10.34% and 11.02% of current health spending in those years. These cover all health care, not cancer. The Ministry's 2025 to 2029 plan says free health care supports access to surgery and that public pathology services charge no user fees, and also that molecular tests are outsourced at high personal cost. Two cost-of-illness studies for 2018 put the yearly cost to society of cervical cancer at 19 million US dollars and of prostate cancer at 6.2 million, with radiotherapy the largest cost per prostate cancer patient at 16,648 dollars, followed by chemotherapy and then transport and lodging.",
          links: [
            { label: "WHO Global Health Observatory: out-of-pocket share of current health expenditure, Eswatini (data API)", url: GHO_OOP },
            { label: "WHO Global Health Observatory: current health expenditure per capita, Eswatini (data API)", url: GHO_CHE },
            { label: "WHO Global Health Observatory: domestic government share, Eswatini (data API)", url: GHO_GOV },
            { label: "WHO Global Health Observatory: external share, Eswatini (data API)", url: GHO_EXT },
            { label: "Ministry of Health, Eswatini: National Cancer Control Strategic Plan 2025 to 2029 (PDF, ICCP portal)", url: PLAN_2025 },
            { label: "Ngcamphalala and others, PLoS One 2021", url: DOI_CX_COST },
            { label: "Ngcamphalala and others, BMC Health Services Research 2022", url: DOI_PR_COST },
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
          id: "medicines-regulator",
          title: "A medicines regulatory authority provided for in law; a ministry unit carried out some of its functions in 2021",
          plain:
            "Eswatini's Medicines and Related Substances Control Act provides for a Medicines Regulatory Authority. The Ministry of Health's June 2021 pharmacovigilance policy said the authority had not yet been formally established and that a Medicines Regulatory Unit inside the ministry carried out some regulatory functions.",
          detail:
            "WHO's legislation database lists the Act as the Medicines and Related Substances Control Act, 2015, providing for a Medicines Regulatory Authority, the registration of medicines and medical devices and the control of medicines and scheduled substances; the ministry's policy cites it as Act No. 9 of 2016. The 2021 policy says the unit reported to the Deputy Director of Pharmaceutical Services and that the authority, once established, would be autonomous with a board reporting to the Minister of Health. OnCo found no later primary source saying whether the authority has since been established. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include Eswatini, and the African Union's list dated 19 September 2023 shows no signature or ratification of the African Medicines Agency treaty by Eswatini. The Ministry's 2025 to 2029 cancer plan calls the Essential Medicines List outdated and out of step with procurement.",
          links: [
            { label: "WHO Country Planning Cycle Database: Eswatini, main legislative instruments", url: WHO_CPCD },
            { label: "Ministry of Health, Eswatini: national pharmacovigilance policy and implementation framework (June 2021, PDF)", url: PV_POLICY },
            { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML3 },
            { label: "African Union: signatures and ratifications of the African Medicines Agency treaty (19 September 2023, PDF)", url: AMA },
            { label: "Ministry of Health, Eswatini: National Cancer Control Strategic Plan 2025 to 2029 (PDF, ICCP portal)", url: PLAN_2025 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "Kingdom of Eswatini: cervical cancer elimination acceleration plan (PDF, ICCP portal)", url: CX_PLAN },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination began in June 2023",
          plain:
            "Eswatini launched HPV vaccination for girls aged 9 to 14 with a school-based campaign in June 2023. The Ministry of Health reported that the campaign reached 46,512 girls, 55.9% of its target. WHO's programme coverage for the first dose in girls was 61% in 2023, 30% in 2024 and 13% in 2025.",
          detail:
            "The campaign ran from 12 to 23 June 2023 with a target of 82,400 girls; coverage ranged from 48.2% in Shiselweni to 60.1% in Manzini, according to the ministry's own account in the Asian Pacific Journal of Cancer Prevention. WHO's immunisation data mark the vaccine as introduced from 2023 and give the same figure for first and last dose in each year; WHO's rows are per year, with a target of 80,746 girls in 2023, 37,104 in 2024 and 13,559 in 2025 (1,754 doses). The same WHO data hold a separate estimate, coverage by age 15: 42% for 2024 and 60% for 2025, the same for first and last dose. The ministry's own figures are higher: a July 2024 presentation gave a target of 79,800 girls aged 9 to 14 and overall uptake from 2023 to 30 June 2024 of 76.3%, with one dose for most girls and two for those who are immunocompromised, and the 2025 to 2029 plan says 74.4% of eligible girls had been vaccinated, without giving the period, and that vaccinating boys is planned.",
          links: [
            { label: "Maseko and others, Asian Pacific Journal of Cancer Prevention 2025", url: DOI_HPV },
            { label: "WHO immunisation data: HPV programme coverage, Eswatini (data API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: HPV coverage by age 15, Eswatini (data API)", url: WHO_HPV15_API },
            { label: "WHO immunisation data: vaccine introduction, Eswatini (data API)", url: WHO_INTRO_API },
            { label: "Ministry of Health, Eswatini: use of data for monitoring the national cancer plan (ICCP ECHO slides, 17 July 2024, PDF)", url: ECHO_2024 },
            { label: "Ministry of Health, Eswatini: National Cancer Control Strategic Plan 2025 to 2029 (PDF, ICCP portal)", url: PLAN_2025 },
          ],
        },
        {
          id: "cervical-screening",
          title: "Cervical screening at most health facilities, and about half of women ever screened",
          plain:
            "About 91% of health facilities in Eswatini provide cervical cancer screening, the Ministry of Health's 2025 to 2029 plan says. In a 2021 national household survey, 48.2% of 3,192 women aged 25 to 59 reported ever having been screened.",
          detail:
            "WHO's 2021 cervical cancer profile recorded a national screening programme using visual inspection with acetic acid for women aged 18 to 65, with 15% of women aged 30 to 49 screened in the last five years and 19% ever screened in 2019; WHO's 2020 cancer profile, by contrast, listed cervical screening as \"no\" for 2019. The survey analysis, published in 2026, found screening more common among women living with HIV. The plan says HIV treatment clinics are priority entry points for screening, that HPV DNA testing is limited and Pap smear results are delayed, that nurse-led loop excision of pre-cancer is being piloted, and that the national guidelines are not yet aligned with WHO's. For other cancers it says breast screening relies on clinical breast examination, with three mammography units in the country, that prostate checks rely on digital rectal examination, and that there is no organised colorectal screening.",
          links: [
            { label: "Ministry of Health, Eswatini: National Cancer Control Strategic Plan 2025 to 2029 (PDF, ICCP portal)", url: PLAN_2025 },
            { label: "Tafese and others, PLoS One 2026", url: DOI_PHIA },
            { label: "WHO: cervical cancer country profile 2021, Eswatini (PDF, ICCP portal copy)", url: WHO_CX_2021 },
            { label: "WHO: Cancer Country Profile 2020, Eswatini (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What stands out",
      title: "What stands out in Eswatini",
      cards: [
        {
          id: "treatment",
          title: "Chemotherapy at Manzini and Mbabane",
          plain:
            "The Ministry of Health's 2025 to 2029 plan says a 60-bed oncology ward and outpatient clinic were established at Manzini in 2022 and that chemotherapy is also given at Mbabane Hospital, which has 12 chairs. It says oncologists and oncology nurses are in post and national treatment protocols exist.",
          detail:
            "The cancer unit at Mbabane Government Hospital came first: a Ministry presentation dates the Mbabane chemotherapy unit to 2015, the IAEA's 2017 review found basic chemotherapy for a few cancers there, and the African Palliative Care Association describes a partnership with the Uganda Cancer Institute from December 2016 to December 2017 that helped start and run the unit. The plan says cancer surgery is done mostly by general surgeons at Mbabane Government Hospital, with waits of up to six months and no dedicated surgical or gynaecological oncologist; that pathology is centred on the National Anatomical Pathology Laboratory, with two pathologists and backlogs of three to six months; that the public sector has no radiologist; and that there is no children's cancer treatment service in the country. It lists the absence of regional chemotherapy services and of standard procedures for giving chemotherapy safely among its challenges.",
          links: [
            { label: "Ministry of Health, Eswatini: National Cancer Control Strategic Plan 2025 to 2029 (PDF, ICCP portal)", url: PLAN_2025 },
            { label: "Ministry of Health, Eswatini: use of data for monitoring the national cancer plan (ICCP ECHO slides, 17 July 2024, PDF)", url: ECHO_2024 },
            { label: "IAEA: imPACT review, Eswatini (August 2017, PDF)", url: IMPACT_2017 },
            { label: "ehospice: the role of South-to-South partnerships in developing cancer services in Africa", url: EHOSPICE },
          ],
        },
        {
          id: "radiotherapy",
          title: "No radiotherapy in the country; a first centre is planned at Manzini",
          plain:
            "Eswatini has no radiotherapy service. The Ministry of Health's 2025 to 2029 plan calls it a major gap and says the ministry has begun establishing the first unit, with a site identified at Manzini Hospital. The IAEA's public directory of radiotherapy centres lists no entry for Eswatini.",
          detail:
            "The plan lists what is in place: a technical working group, 1 million US dollars allocated in the 2024 budget for initial works, a funding proposal the IAEA calls a bankable document, and, in its radiotherapy section, the National Nuclear and Radiation Safety Regulatory Bill 2024 as enacted; elsewhere the same plan says the nuclear and radiation safety law is still awaiting enactment by the National Assembly. It also lists what is missing: no national radiotherapy strategy and no trained radiation oncology workforce, and it recommends speeding up the establishment of the regulatory body under the nuclear legislation. The cervical cancer elimination plan describes the planned centre as having two linear accelerators and one brachytherapy unit. Applied Radiation Oncology's report of 2 January 2025 on the IAEA-led review of August 2024 says the government helps patients reach radiotherapy in South Africa through the Phalala fund and quotes the health minister calling that arrangement not sustainable. OnCo found no source giving an opening date.",
          links: [
            { label: "Ministry of Health, Eswatini: National Cancer Control Strategic Plan 2025 to 2029 (PDF, ICCP portal)", url: PLAN_2025 },
            { label: "Kingdom of Eswatini: cervical cancer elimination acceleration plan (PDF, ICCP portal)", url: CX_PLAN },
            { label: "Applied Radiation Oncology: Eswatini working to finalize the country's first radiotherapy center (2 January 2025)", url: ARO_2025 },
            { label: "IAEA: Eswatini technical cooperation fact sheet (PDF)", url: IAEA_TC },
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: DIRAC },
          ],
        },
        {
          id: "plan",
          title: "A national cancer control plan for 2025 to 2029, following the 2019 strategy",
          plain:
            "Eswatini has a National Cancer Control Strategic Plan for 2025 to 2029, issued by the Ministry of Health with a foreword by the Minister of Health. Its goal is a 30% reduction in cancer illness and death by 2030. It follows the National Cancer Prevention and Control Strategy of 2019.",
          detail:
            "The plan says the National Cancer Control Unit leads cancer control, that the 2019 to 2023 programme had reached 82% progress by 2022, and that the unit was 53% staffed. A Ministry presentation dates the unit to 2019, cancer treatment guidelines to 2020 and screening guidelines to 2021. The plan was informed by a review of the country's capacity in 2024 supported by the IAEA, WHO and IARC, the second such review after 2017. It sits beside a cervical cancer elimination acceleration plan with the WHO targets of 90% vaccination, 70% screening and 90% treatment by 2030. On palliative care the plan estimates that 12,000 people a year need it, and reports national guidelines and more than 100 trained health workers, with an irregular supply of oral morphine. All three documents were read from the ICCP portal.",
          links: [
            { label: "Ministry of Health, Eswatini: National Cancer Control Strategic Plan 2025 to 2029 (PDF, ICCP portal)", url: PLAN_2025 },
            { label: "Ministry of Health, Eswatini: National Cancer Prevention and Control Strategy 2019 (PDF, ICCP portal)", url: STRATEGY_2019 },
            { label: "Kingdom of Eswatini: cervical cancer elimination acceleration plan (PDF, ICCP portal)", url: CX_PLAN },
            { label: "Ministry of Health, Eswatini: use of data for monitoring the national cancer plan (ICCP ECHO slides, 17 July 2024, PDF)", url: ECHO_2024 },
            { label: "IAEA: Eswatini technical cooperation fact sheet (PDF)", url: IAEA_TC },
            { label: "ICCP portal: search results for Eswatini", url: ICCP_SEARCH },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Eswatini", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Eswatini",
          plain:
            "None of the trials in OnCo's records lists Eswatini among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Eswatini. A query of the registry's own interface on the same day for cancer studies with an Eswatini site returned one study, NCT04982614, a completed trial sponsored by Columbia University comparing two doses of the nine-valent HPV vaccine in young people living with HIV against three doses in young women without HIV. It is a prevention study, not a cancer treatment trial.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Eswatini", url: CTGOV },
            { label: "ClinicalTrials.gov: NCT04982614", url: CTGOV_HPV },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-government-sources",
      title: "Government and parliament sites could not be reached",
      plain:
        "OnCo could not open the Government of Eswatini's website or the parliament's site on 16 November 2026, so the current state of the Phalala fund, the medicines regulator and the radiotherapy centre is not confirmed from the government's own pages.",
      detail:
        "Both gov.sz and parliament.gov.sz timed out; the parliament's site holds a 2025 Ministry of Health annual report that OnCo has not read. A Times of Eswatini report of April 2024 on the suspension of the Phalala fund for adults is on a newspaper platform that shows nothing to a script, so the claim is not made on this page. The IAEA's news page on its 2024 review returned a challenge page; a trade journal's report of the review was read instead. A future pass should read the ministry's annual report and the Act establishing the regulator, and anyone needing a referral should ask the treating hospital or the ministry how the Phalala fund works now.",
      links: [
        { label: "Ministry of Health, Eswatini: National Cancer Control Strategic Plan 2025 to 2029 (PDF, ICCP portal)", url: PLAN_2025 },
        { label: "WHO: Cancer Country Profile 2020, Eswatini (PDF)", url: WHO_PROFILE },
      ],
    },
    {
      id: "gap-figures",
      title: "Figures this page could not settle",
      plain:
        "The registry has not published an annual report that OnCo could find, so its counts here come from a slide and from research papers. HPV coverage is reported in several ways, and the page gives each with its source.",
      detail:
        "The yearly registry counts were read from chart labels; the number of cases by cancer in the registry, and how complete the registry is, were not found. WHO's yearly programme coverage (61%, 30%, 13%), WHO's estimate of coverage by age 15 (42% and 60%) and the ministry's figures (76.3% to 30 June 2024, and 74.4% with no period given) are different measures, and OnCo has not reconciled them. The registry's page at the African Cancer Registry Network dates from May 2017. OnCo did not find how many patients the Phalala fund sends abroad each year after 2018, the number of oncologists, or what cancer medicines are on the Essential Medicines List. No named person is listed on this page because no current primary source for their role was read. A future pass should ask the National Cancer Control Unit for a registry report; readers can ask the oncology unit at Manzini or Mbabane Government Hospital what is offered now.",
      links: [
        { label: "African Cancer Registry Network: Eswatini National Cancer Registry (updated 1 May 2017)", url: AFCRN_SZ },
        { label: "Ministry of Health, Eswatini: use of data for monitoring the national cancer plan (ICCP ECHO slides, 17 July 2024, PDF)", url: ECHO_2024 },
      ],
    },
  ],
  institutions: ["eswatini-ministry-of-health", "eswatini-national-cancer-registry", "manzini-oncology-unit", "mbabane-government-hospital", "uganda-cancer-institute", "who", "iarc", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-msibi-cervical-cancer-survival-eswatini-pgph-2026",
    "paper-vilakati-early-onset-cervical-cancer-eswatini-canep-2026",
    "paper-maseko-hpv-vaccine-introduction-eswatini-apjcp-2025",
    "paper-ngcamphalala-economic-burden-cervical-cancer-eswatini-plosone-2021",
    "paper-ngcamphalala-economic-burden-prostate-cancer-eswatini-bmchsr-2022",
  ],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, the Ministry of Health's cancer plans and presentation as posted on the ICCP portal, its 2021 pharmacovigilance policy, WHO's country profiles and its health expenditure, immunisation and legislation data, the African Cancer Registry Network's page, and IAEA documents. Papers were resolved by DOI through Europe PMC and their abstracts read. The government's own website could not be reached.",
  verify:
    "Plans describe intentions as well as services, the registry counts come from a 2024 slide, and referral arrangements change. Anyone seeking care should ask the oncology unit at Manzini or Mbabane Government Hospital, or the Ministry of Health, what is available now and how referral through the Phalala fund works.",
  verifyLinks: [
    { label: "Ministry of Health, Eswatini: National Cancer Control Strategic Plan 2025 to 2029 (PDF, ICCP portal)", url: PLAN_2025 },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Eswatini (PDF)", url: IARC_FACTSHEET },
    { label: "African Cancer Registry Network: Eswatini National Cancer Registry", url: AFCRN_SZ },
  ],
};

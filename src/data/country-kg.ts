import type { CountryDive } from "@/data/country-dive";

/**
 * Kyrgyzstan deep dive: the hand-written cards for /countries/kg/ (wave 15). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Kyrgyzstan (PDF text),
 * WHO's Cancer Country Profile 2020 and cervical cancer profile 2021 (PDF text), WHO's Global Health Observatory and
 * immunisation data APIs (JSON), the country table and the centre-level feed of IAEA's Directory of Radiotherapy Centres
 * (JSON; the centre-level feed was read on the second pass), the State
 * Guarantees Programme as posted in Russian on the Mandatory Health Insurance Fund's site, the Ministry of Health's order
 * No. 1019 of 28 July 2021 approving the cancer strategy for 2021 to 2025 (a scanned PDF on the ICCP portal, read in
 * Russian; its text layer is machine-read and noisy, so figures were checked against the page images), the IAEA's
 * summary of the March 2015 imPACT review, the European Observatory's 2022 health system review, the site of the
 * Department of Medicines and Medical Devices, WHO's August 2026 list of regulators at maturity level 3 and 4, news
 * reports from 24.kg and Kaktus.media on the linear accelerators, and abstracts resolved through Europe PMC.
 *
 * What could not be read is named under `gaps`, not filled from memory.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/417-kyrgyzstan-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/kgz-2020.pdf";
const WHO_CX_2021 = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-kgz-2021-country-profile-en.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'KGZ'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'KGZ'%20and%20startswith(ANTIGEN,'HPV')";
const GHO_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'KGZ'";
const GHO_CHE = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'KGZ'";
const GHO_GOV = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'KGZ'";
const DIRAC_API = "https://dirac.iaea.org/api/DataGridWebApi/GetCountriesAndRegions";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const DIRAC_CENTRES_API = "https://dirac.iaea.org/api/DataGridWebApi/EquipmentReport";
const PGG = "https://foms.kg/ru/guaratees/";
const FOMS = "https://foms.kg";
const FOMS_PILOT = "https://foms.kg/ru/blog/509-V-Chuiskoi-oblasti-startuiet-pilot-novoi-Proghrammy-ghosudarstviennykh-gharantii.html";
const FOMS_BREAST = "https://foms.kg/ru/blog/504-FOMS-o-vazhnosti-rieghuliarnogho-obsliedovaniia-molochnoi-zhieliezy.html";
const STRATEGY_PAGE = "https://www.iccp-portal.org/resources/control-and-prevention-strategy-oncological-disease-kyrgyz-republic";
const STRATEGY_PDF =
  "https://www.iccp-portal.org/sites/default/files/plans/KGZ_B5_s21_%D0%BF%D1%80%D0%B8%D0%BA%D0%B0%D0%B7%20%E2%84%961019%20%D0%BE%D1%82%2028.07.2021%20%D0%9E%D0%B1%20%D1%83%D1%82%D0%B2%D0%B5%D1%80%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B8%20%D0%A1%D1%82%D1%80%D0%B0%D1%82%D0%B5%D0%B3%D0%B8%D0%B8%20%D0%BF%D0%BE%20%D0%BA%D0%BE%D0%BD%D1%82%D1%80%D0%BE%D0%BB%D1%8E%20%D0%B8%20%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D0%B0%D0%BA%D1%82%D0%B8%D0%BA%D0%B5%20%D0%BE%D0%BD%D0%BA%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D1%85%20%D0%B7%D0%B0%D0%B1%D0%BE%D0%BB%D0%B5%D0%B2%D0%B0%D0%BD%D0%B8%D0%B9%20%D0%B2%20%D0%9A%D0%A0%20%D0%BD%D0%B0%202021-2025%20%D0%B3%D0%BE%D0%B4%D1%8B.pdf";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=Kyrgyzstan";
const IMPACT_2015 = "https://www.iaea.org/sites/default/files/documents/review-missions/kyrgyzstan-2015-impact-review.pdf";
const HIT_2022 = "https://eurohealthobservatory.who.int/publications/i/kyrgyzstan-health-system-review-2022";
const HIT_2022_PDF = "https://iris.who.int/server/api/core/bitstreams/af52fbb1-a9de-4843-8f44-79a04b1f18c1/content";
const DLS = "https://www.dlsmi.kg";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const WHO_HPV_2023 = "https://www.who.int/europe/news/item/15-02-2023-kyrgyzstan-joins-european-cervical-cancer-prevention-week";
const WHO_HPV_STORY =
  "https://www.who.int/about/accountability/results/who-results-report-2020-mtr/country-story/2023/kyrgyzstan-s-successful-drive-to-introduce-hpv-vaccine-cuts-cervical-cancer-risk";
const LINAC_2021 = "https://24.kg/obschestvo/200172_dolgojdannaya_novost_vkyirgyizstane_zapustili_lineynyie_uskoriteli/";
const LINAC_BROKEN = "https://kaktus.media/doc/528140_v_bishkeke_slomalis_oba_lineynyh_yskoritelia_dlia_onkopacientov.html";
const LINAC_BACK = "https://24.kg/obschestvo/343511_lineynyie_uskoriteli_vtsentre_onkologii_vnov_zarabotali/";
const LINAC_INDIA = "https://24.kg/english/359460_India_to_hand_over_linear_accelerator_to_Kyrgyzstan";
const NUCMED = "https://24.kg/english/343160_Nuclear_Medicine_Center_to_be_established_in_Kyrgyzstan";
const CTGOV = "https://clinicaltrials.gov/search?country=Kyrgyzstan&cond=cancer";
const CTGOV_API = "https://clinicaltrials.gov/api/v2/studies?query.locn=Kyrgyzstan&query.cond=cancer&pageSize=20&countTotal=true";
const doi = (id: string) => `https://doi.org/${id}`;
const P_TRENDS = doi("10.1200/go-26-00137");
const P_BREAST = doi("10.31557/apjcp.2022.23.5.1603");
const P_HPV = doi("10.1186/s13027-025-00727-2");
const P_LIVER = doi("10.1016/j.lanepe.2026.101665");
const P_CERVICAL = doi("10.7759/cureus.57863");
const P_PALLIATIVE = doi("10.1016/j.jpainsymman.2017.05.010");
const P_IAEA = doi("10.1200/go-25-00271");

export const KG_DIVE: CountryDive = {
  iso2: "KG",
  iso3: "KGZ",
  name: "Kyrgyzstan",
  flag: "🇰🇬",
  asOf: "2026-11-16",
  title: "Cancer in Kyrgyzstan",
  description:
    "Cancer in Kyrgyzstan: IARC's modelled estimate of 8,902 new cancers and 5,139 deaths in 2024 beside about 6,651 newly diagnosed cases in a 2026 paper built on national reports, breast and stomach cancer leading, a national centre in Bishkek and an interregional centre in Osh, a State Guarantees Programme that charges no co-payment in chemotherapy departments, households paying 42% of health spending in 2023, a cancer strategy for 2021 to 2025, HPV vaccination since 2022 with 91% programme coverage in 2025, and no trial in OnCo's records with a site in the country.",
  lede:
    "Kyrgyzstan treats cancer at the National Center of Oncology and Hematology in Bishkek and an interregional centre in Osh, under a State Guarantees Programme that charges no co-payment in chemotherapy departments or for radiotherapy given as day care. HPV vaccination began in 2022 and WHO records 91% programme coverage among girls in 2025. IARC's incidence figure for the country is modelled from deaths, it is not a registry count.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Kyrgyzstan is 8,902 new cancers and 5,139 deaths, an age-standardised incidence of 138.2 per 100,000 (149.1 in men, 132.5 in women). These incidence figures are modelled, not counted: the fact sheet gives the country-specific data source for incidence as \"No data\" and the method as \"National mortality estimates applied to model-based M:I ratios (registry survival data)\", which means IARC started from national death figures and worked back to new cases using modelled ratios of deaths to new cases. For mortality the source is WHO's national data and the method \"Trends in national rates projected to 2024\". Figures from inside the country are lower: a 2026 paper drawing on national registry reports, Ministry of Health statistics and international databases gives about 6,651 newly diagnosed cancers in 2024.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Kyrgyzstan",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Kyrgyzstan (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 8,900 new cancers a year by IARC's model, with breast and stomach cancer leading",
          plain:
            "IARC estimates 8,902 new cancers in Kyrgyzstan in 2024, 4,719 in women and 4,183 in men, and 5,139 cancer deaths. Breast cancer is the commonest, then stomach, lung, bowel and cervical cancer. Stomach cancer is the commonest cause of cancer death, followed by lung and liver cancer.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,218 breast cancers (342 deaths), 1,076 stomach cancers (876 deaths), 816 lung cancers (684 deaths), 706 colorectal cancers (331 deaths), 538 cervical cancers (291 deaths) and 434 liver cancers (409 deaths). In men the leading cancers are stomach, lung and colorectal; in women breast, cervical and stomach. The risk of developing a cancer before age 75 is 14.8%, and an estimated 20,130 people are living within five years of a diagnosis. The incidence figures are modelled from national death statistics: the fact sheet records no country-specific incidence data. WHO's 2020 profile estimated 227 cancers a year in children aged 0 to 14.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Kyrgyzstan (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, Kyrgyzstan (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "registry",
          title: "A state cancer registration system, paper-based when the IAEA reviewed it in 2015, counts fewer cancers than IARC estimates",
          plain:
            "Kyrgyzstan has a state cancer registration system, which the IAEA's 2015 review described as manual and paper-based. National reports counted 5,377 new cancers in 2020 and, according to a 2026 paper, about 6,651 in 2024. IARC's modelled estimate for 2024 is 8,902. The Ministry of Health's strategy for 2021 to 2025 set out to build a population-based registry, starting in Chuy region.",
          detail:
            "WHO's 2020 profile recorded a population-based cancer registry for 2019 and rated the quality of death registration for 2007 to 2016 as high, and WHO's 2021 cervical cancer profile also answers yes to a population-based registry. The IAEA's summary of the 2015 imPACT review described it as a manual, paper-based registry that continued to function but whose completeness and accuracy were hard to assess. The 2021 to 2025 strategy, six years later, still listed the creation of a population-based registry as a task: a pilot in Chuy region, hospital registries at the national centre and the Osh centre, then Osh region (the action plan's table names Batken region for that last step). A registry paper covering 2003 to 2017 counted 7,850 new breast cancers, an average annual age-standardised rate of 24.0 per 100,000 women, highest in Bishkek (39.2) and Chuy (31.3). OnCo did not find a report on whether the Chuy pilot registry is running.",
          links: [
            { label: "Ministry of Health: order No. 1019 of 28 July 2021, cancer strategy 2021 to 2025 (PDF, Russian and Kyrgyz, ICCP portal)", url: STRATEGY_PDF },
            { label: "IAEA: imPACT review summary, Kyrgyzstan, March 2015 (PDF)", url: IMPACT_2015 },
            { label: "Ur Rehman and Ali, JCO Global Oncology 2026: cancer trends 2020 to 2026", url: P_TRENDS },
            { label: "Chokoev and others, Asian Pacific Journal of Cancer Prevention 2022: breast cancer, 15 years of registry", url: P_BREAST },
            { label: "WHO: Cancer Country Profile 2020, Kyrgyzstan (PDF)", url: WHO_PROFILE },
            { label: "WHO: cervical cancer profile 2021, Kyrgyzstan (PDF)", url: WHO_CX_2021 },
          ],
        },
      ],
      tables: [
        {
          id: "kg-national-counts",
          title: "New cancers a year: national reports beside IARC's estimate",
          caption: "Newly registered or newly diagnosed cancers in Kyrgyzstan as given by each named source, all cancers, both sexes.",
          columns: [
            { key: "year", label: "Year" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "source", label: "Source and what it is" },
          ],
          rows: [
            { year: "2013", cases: 5126, source: "National cancer data quoted in the IAEA's imPACT review summary (with 2,983 deaths)" },
            { year: "2020", cases: 5377, source: "Ministry of Health strategy for 2021 to 2025: cancers registered" },
            { year: "2020", cases: 5471, source: "Ur Rehman and Ali 2026, drawing on national registry reports and Ministry statistics (approximate)" },
            { year: "2024", cases: 6651, source: "Ur Rehman and Ali 2026, drawing on national registry reports and Ministry statistics (approximate)" },
            { year: "2024", cases: 8902, source: "IARC GLOBOCAN 2024: a modelled estimate, not a count" },
          ],
          note: "The first two rows are counts reported inside the country. The third and fourth come from a paper whose abstract says it used national registry reports, Ministry of Health statistics and international databases, without saying which figure came from which. The two figures for 2020 differ by 94. The last row is IARC's estimate, built from death statistics and modelled ratios. The gap between the two kinds of figure is expected where registration is incomplete, and neither should be read as exact.",
          sources: [
            { label: "IAEA: imPACT review summary, Kyrgyzstan, March 2015 (PDF)", url: IMPACT_2015 },
            { label: "Ministry of Health: cancer strategy 2021 to 2025 (PDF, ICCP portal)", url: STRATEGY_PDF },
            { label: "Ur Rehman and Ali, JCO Global Oncology 2026", url: P_TRENDS },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Kyrgyzstan (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care",
      aside: { label: "Mandatory Health Insurance Fund: State Guarantees Programme (Russian)", url: PGG },
      cards: [
        {
          id: "guarantees",
          title: "The State Guarantees Programme: no co-payment in chemotherapy and palliative departments, a sliding co-payment for other planned hospital cancer care",
          plain:
            "Kyrgyzstan's State Guarantees Programme has a chapter on cancer care. Patients treated in chemotherapy and palliative care departments pay no co-payment, nor do patients having chemotherapy or radiotherapy as day care. Other planned hospital cancer care is free for children and some other groups, and carries a co-payment for everyone else, lower for people with health insurance.",
          detail:
            "The programme is an annex to government resolution No. 493 of 21 September 2023; the text on the Mandatory Health Insurance Fund's site carries amendments to 27 August 2026. Chapter 12 makes follow-up of people with cancer at family medicine centres free, and gives specialist tests and consultations free to people on the register, children under 18 and listed groups, with others paying the full price list. Planned inpatient cancer care is free for children under 18, conscripts, listed veteran and other groups and people who need a repeat operation or repeat radiotherapy within 12 months. Pensioners and labour veterans over 70, people disabled from childhood or with a group I disability, and recipients of the monthly benefit for families with children pay the minimum co-payment (1,093 soms for a medical admission, 3,188 for a surgical one). Insured citizens and contract servicemen pay the middle co-payment (4,198 and 12,220 soms) and everyone else the maximum (21,530 and 28,120 soms). During a hospital stay no extra charge may be made for consultations, laboratory and diagnostic tests or radiotherapy. Chemotherapy medicines are bought from the republican budget, insurance funds and other lawful sources. Terminal-stage cancer is one of six conditions with subsidised prescriptions. Insured foreign citizens are an exception to the rule on chemotherapy departments: annex 2 says they pay the full cost of care there. The IAEA's 2015 review summary reported that basic chemotherapy medicines that should have been covered were not readily available and that many patients bought them in neighbouring countries; OnCo found no later audit of supply.",
          links: [
            { label: "Mandatory Health Insurance Fund: State Guarantees Programme, resolution No. 493 with amendments (Russian)", url: PGG },
            { label: "IAEA: imPACT review summary, Kyrgyzstan, March 2015 (PDF)", url: IMPACT_2015 },
          ],
        },
        {
          id: "oop",
          title: "About USD 97 a person on health in 2023, 42% of it out of pocket",
          plain:
            "Kyrgyzstan spent about 97 US dollars a person on health in 2023, and households paid 42% of it out of their own pockets, according to WHO's health expenditure figures. That share was 57% in 2016. The Mandatory Health Insurance Fund is the public payer, and a new model of the guarantees programme is being piloted in Chuy region.",
          detail:
            "WHO's Global Health Expenditure Database gives out-of-pocket spending as 39.1% of current health spending in 2021, 39.9% in 2022 and 42.3% in 2023, down from 57.2% in 2016; current health spending of USD 96.65 per person in 2023; and domestic government spending of 53.3% of the total. The European Observatory's 2022 review says that in 2019 mandatory health insurance covered 69% of the population and that medicines are the largest part of what households pay. In July 2026 the Fund reported a presidential decree for a pilot of a new guarantees model in two general practice centres in Chuy region, with a free basic package for all and an additional package on subsidised terms for the insured; the Fund's notice says the current programme has run since 2001 and that the state cannot always fund all of its guarantees in full.",
          links: [
            { label: "WHO Global Health Observatory: out-of-pocket share of health spending, Kyrgyzstan (data API)", url: GHO_OOP },
            { label: "WHO Global Health Observatory: current health expenditure per capita, Kyrgyzstan (data API)", url: GHO_CHE },
            { label: "WHO Global Health Observatory: government share of health spending, Kyrgyzstan (data API)", url: GHO_GOV },
            { label: "European Observatory: Kyrgyzstan, health system review 2022", url: HIT_2022 },
            { label: "Mandatory Health Insurance Fund: pilot of the new State Guarantees Programme in Chuy region (Russian, 23 July 2026)", url: FOMS_PILOT },
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
          id: "regulator-dls",
          title: "The Department of Medicines and Medical Devices registers medicines, including under Eurasian Economic Union rules",
          plain:
            "Medicines in Kyrgyzstan are regulated by the Department of Medicines and Medical Devices under the Ministry of Health. Its site carries the state register of medicines, the list of vital and essential medicines, registration under the rules of the Eurasian Economic Union, side-effect reporting and price regulation. It is not on WHO's list of regulators at maturity level 3 or 4.",
          detail:
            "The Department's site, read in Russian on 16 November 2026, lists sections for the State Register of medicines and medical devices, the list of vital medicines and medical devices, registration of medicines and devices under Eurasian Economic Union rules, quality assessment, licensing, pharmacovigilance, pharmaceutical inspection, its laboratories, regulation of medicine prices and traceability, and a form for reporting adverse reactions. WHO's August 2026 list of national regulatory authorities operating at maturity level 3 and 4 does not include Kyrgyzstan's regulator; of the Central Asian countries it lists Kazakhstan. That list says which regulators have been benchmarked at those levels and nothing about the others. OnCo did not read which cancer medicines are on the state register or the essential list, nor the rules for authorising clinical trials.",
          links: [
            { label: "Department of Medicines and Medical Devices, Kyrgyz Republic (Russian)", url: DLS },
            { label: "WHO: list of regulators operating at maturity level 3 and 4, August 2026 (PDF)", url: WHO_ML3 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: cervical cancer profile 2021, Kyrgyzstan (PDF)", url: WHO_CX_2021 },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination since 2022, with 91% programme coverage among girls in 2025",
          plain:
            "Kyrgyzstan added the HPV vaccine to its national schedule in 2022. WHO's immunisation data record that 91% of the girls targeted by the programme received a first dose in 2025, up from 65% in 2022. Hepatitis B vaccination, which protects against a cause of liver cancer, began in part of the country in 1999 and has been nationwide since 2001 in WHO's rows.",
          detail:
            "WHO's introduction table marks the HPV vaccine as in the national schedule, nationwide, from 2022. Its programme coverage rows for girls give a first dose of 65% in 2022, 71% in 2023, 88% in 2024 and 91% in 2025 (67,131 doses for a target of 74,169); the last-dose figure was 48% in 2023 and equals the first-dose figure in 2024 and 2025. These are programme figures, the share of each year's target group reached, not the share of all girls vaccinated by age 15. WHO's Europe office wrote in February 2023 that 63% of 200,000 targeted girls aged 9 to 14 had been vaccinated and that Gavi supplied 368,000 doses; a later WHO account gives 72% for the first dose and 63% for the second by November 2023 and says 2,284 health workers were trained. WHO's rows mark a hepatitis B vaccine as partly introduced in 1999 and 2000 and nationwide from 2001, and a birth dose from 1998. A 2026 study of hospital and oncology centre records found hepatitis B behind 32% and hepatitis C behind 32% of 572 liver cancers.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage, Kyrgyzstan (data API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: HPV vaccine introduction, Kyrgyzstan (data API)", url: WHO_INTRO_API },
            { label: "WHO Europe: Kyrgyzstan joins European Cervical Cancer Prevention Week (15 February 2023)", url: WHO_HPV_2023 },
            { label: "WHO: Kyrgyzstan's drive to introduce HPV vaccine (results report country story)", url: WHO_HPV_STORY },
            { label: "Brandl and others, Lancet Regional Health Europe 2026: cirrhosis and liver cancer attributable to hepatitis B and C", url: P_LIVER },
          ],
        },
        {
          id: "screening-kg",
          title: "No national cervical screening programme in WHO's profiles; breast checks by clinical examination, mammography where a machine exists",
          plain:
            "WHO's 2021 profile recorded no national cervical screening programme in Kyrgyzstan, with one woman in three aged 30 to 49 screened in the previous five years. For breast cancer the insurance fund describes a free clinical breast examination at primary care, yearly after age 40, with mammography where the equipment exists. The 2021 to 2025 strategy planned pilot screening centres.",
          detail:
            "WHO's 2021 cervical profile gives 33% of women aged 30 to 49 screened in the last five years and 40% ever screened (2019), early detection guidelines at primary care, and no clearly defined referral system. WHO's 2020 profile recorded a breast screening programme as present, with no starting age given. The Mandatory Health Insurance Fund's notice of June 2026, citing the Ministry's clinical protocol, sets a breast examination every three years from 18 to 40 and yearly after 40, free for insured women at the clinic where they are registered, with breast ultrasound at a 50% discount and mammography where equipment is available, and says 46.6% of breast cancers are found at stage III or IV; the Ministry's strategy gave 38.8% for breast cancer in 2020, and 46.6% for cervical cancer. The 2021 to 2025 strategy planned a pilot cervical screening centre, HPV-based screening for women aged 30 to 49, a pilot of mammography for women aged 35 to 49 and an electronic screening register. A study by Médecins Sans Frontières tested 1,213 women aged 30 to 49 in Chuy region and Bishkek in 2024 and found high-risk HPV in 9.0%. OnCo did not find a report on whether the pilot centres opened.",
          links: [
            { label: "WHO: cervical cancer profile 2021, Kyrgyzstan (PDF)", url: WHO_CX_2021 },
            { label: "WHO: Cancer Country Profile 2020, Kyrgyzstan (PDF)", url: WHO_PROFILE },
            { label: "Mandatory Health Insurance Fund: on regular breast examination (Russian, 4 June 2026)", url: FOMS_BREAST },
            { label: "Ministry of Health: cancer strategy 2021 to 2025 (PDF, ICCP portal)", url: STRATEGY_PDF },
            { label: "Kozukeev and others, Infectious Agents and Cancer 2026: high-risk HPV in Chuy region", url: P_HPV },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in Kyrgyzstan",
      cards: [
        {
          id: "plan",
          title: "A cancer strategy for 2021 to 2025, approved by ministerial order, and no successor found",
          plain:
            "The Ministry of Health approved a Strategy for the control and prevention of cancer for 2021 to 2025, with an action plan, by order No. 1019 of 28 July 2021. It covers prevention, HPV vaccination, pilot screening, radiotherapy, palliative care and a population-based registry. OnCo did not find a strategy for the years after 2025.",
          detail:
            "The order, posted on the ICCP portal as a scanned document in Kyrgyz and Russian, approves the strategy and its action plan and tells the director of the National Center of Oncology and Hematology to draft the rules of a coordination council. The strategy describes the service at the time: the national centre in Bishkek with 456 inpatient beds and an outpatient clinic, the Osh Interregional Oncology Centre with 100 beds, and oncology departments in the Jalal-Abad regional hospital (30 beds), the Issyk-Kul regional hospital (10 beds) and Chuy region (15 beds), 611 beds in all. It names access to modern diagnosis, treatment and medicines as an unsolved problem. WHO's 2020 profile had recorded the national cancer plan as under development in 2019, and the IAEA's 2015 review had recommended one. A search of the ICCP portal for Kyrgyzstan on 16 November 2026 returned this strategy, the non-communicable disease programme for 2013 to 2020, WHO's profiles and a regional document on registries, and no later national plan.",
          links: [
            { label: "ICCP portal: Control and prevention strategy for oncological disease in the Kyrgyz Republic, 2021 to 2025", url: STRATEGY_PAGE },
            { label: "Ministry of Health: order No. 1019 of 28 July 2021 (PDF, Russian and Kyrgyz)", url: STRATEGY_PDF },
            { label: "ICCP portal: search results for Kyrgyzstan", url: ICCP_SEARCH },
            { label: "IAEA: imPACT review summary, Kyrgyzstan, March 2015 (PDF)", url: IMPACT_2015 },
            { label: "WHO: Cancer Country Profile 2020, Kyrgyzstan (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "radiotherapy",
          title: "Radiotherapy in one centre in Bishkek: two linear accelerators since 2021, both out of service for part of 2025",
          plain:
            "Radiotherapy in Kyrgyzstan is given at the National Center of Oncology and Hematology in Bishkek. Two linear accelerators were started there in July 2021. Local news reported that both broke down in mid 2025 and were working again by September 2025, with some patients treated on a cobalt machine in the meantime.",
          detail:
            "The IAEA's Directory of Radiotherapy Centres lists one radiotherapy centre in Kyrgyzstan, the National Center of Oncology and Hematology in Bishkek. Its entry, last updated in 2025, shows one cobalt-60 teletherapy unit, one cobalt-60 high-dose-rate brachytherapy unit and no linear accelerator. News reports describe more machines than that: 24.kg reported the launch ceremony for two identical linear accelerators on 7 July 2021, alongside a cobalt unit donated by India; Kaktus.media reported on 22 July 2025 that the centre's director confirmed both accelerators had failed after years of heavy use without the scheduled replacement of parts, and quoted the health minister saying the country had two accelerators for 7 million people; 24.kg reported on 15 September 2025 that they were working again. In September 2025 the minister announced a nuclear medicine centre at the national centre, and in January 2026 India's embassy announced a further linear accelerator and a new source for the cobalt unit. The 2021 to 2025 strategy called for radiotherapy to be developed at the Osh centre and, until then, for travel and lodging costs to be funded for patients treated in Bishkek. OnCo could not reconcile the directory's entry, which lists no linear accelerator, with the news reports.",
          links: [
            { label: "IAEA: Directory of Radiotherapy Centres, country table", url: DIRAC },
            { label: "IAEA DIRAC: country table (data API)", url: DIRAC_API },
            { label: "IAEA DIRAC: centre-level equipment feed (data API)", url: DIRAC_CENTRES_API },
            { label: "24.kg: linear accelerators launched in Kyrgyzstan (Russian, 7 July 2021)", url: LINAC_2021 },
            { label: "Kaktus.media: both linear accelerators for cancer patients broke down in Bishkek (Russian, 22 July 2025)", url: LINAC_BROKEN },
            { label: "24.kg: linear accelerators at the oncology centre working again (Russian, 15 September 2025)", url: LINAC_BACK },
            { label: "24.kg: nuclear medicine centre to be established (11 September 2025)", url: NUCMED },
            { label: "24.kg: India to hand over linear accelerator (27 January 2026)", url: LINAC_INDIA },
            { label: "Ministry of Health: cancer strategy 2021 to 2025 (PDF, ICCP portal)", url: STRATEGY_PDF },
          ],
        },
        {
          id: "palliative",
          title: "Palliative care departments in Bishkek and Osh, and subsidised pain medicines for terminal-stage cancer",
          plain:
            "The European Observatory's 2022 review describes a palliative care department at the national centre in Bishkek and another at the Osh centre, funded by the Mandatory Health Insurance Fund, and home care teams in both cities. The Fund has paid for medicines for people with terminal-stage cancer since 2003, and morphine tablets were introduced in 2015.",
          detail:
            "The European Observatory's 2022 review describes palliative departments of 25 beds at the National Oncology Centre and five beds at the Osh Interregional Oncology Centre, a children's hospice opened by a charity in 2015, and outpatient and home care pilots in Bishkek and Osh supported by the Soros Foundation-Kyrgyzstan since 2013. It says a 2010 needs assessment found more than 20,000 people a year in need of palliative care, and that barriers to opioid pain relief remained, including dose limits and limited availability of tablets. A 2018 paper from the foundation dates the start of palliative care to a home care pilot at the Osh cancer centre in 2005. WHO's 2020 profile recorded opioid availability for 2015 to 2017 as 23 defined daily doses per million people per day. The IAEA's 2015 review noted that about 42% of cancers were found at stage III and 22% at stage IV.",
          links: [
            { label: "European Observatory: Kyrgyzstan, health system review 2022 (PDF)", url: HIT_2022_PDF },
            { label: "Mukambetov and others, Journal of Pain and Symptom Management 2018: palliative care development in Kyrgyzstan", url: P_PALLIATIVE },
            { label: "WHO: Cancer Country Profile 2020, Kyrgyzstan (PDF)", url: WHO_PROFILE },
            { label: "IAEA: imPACT review summary, Kyrgyzstan, March 2015 (PDF)", url: IMPACT_2015 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Kyrgyzstan", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Kyrgyzstan",
          plain:
            "None of the trials in OnCo's records lists Kyrgyzstan among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search. A query of the registry for cancer studies with a site in Kyrgyzstan returned three, none of them a cancer drug trial listed as recruiting.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Kyrgyzstan. The registry's own search on the same day, for the condition cancer and the location Kyrgyzstan, returned three studies: the Helicobacter pylori Genome Project (terminated), the Moscow-Berlin 2015 protocol for childhood acute lymphoblastic leukaemia (status unknown) and the Prospective Urban Rural Epidemiology study (recruiting), a population cohort and not a treatment trial. A registry search matches loosely, so check each record's site list before relying on it.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Kyrgyzstan", url: CTGOV },
            { label: "ClinicalTrials.gov: the same query through the data API", url: CTGOV_API },
          ],
        },
        {
          id: "papers",
          title: "Published research: registry trends, cervical cancer by region, HPV types and the causes of liver cancer",
          plain:
            "Research from Kyrgyzstan that OnCo read is mostly descriptive: counts and rates from the national oncology service, studies of cervical cancer by region, a survey of HPV infection run by Médecins Sans Frontières, and a study with Germany's Robert Koch Institute of how much liver cancer is caused by hepatitis B and C.",
          detail:
            "A 2026 paper from Ala-Too International University reports newly diagnosed cancers rising from about 5,471 in 2020 to 6,651 in 2024, a crude rate rising from 83 to more than 92 per 100,000. A 2022 registry paper counted 7,850 breast cancers from 2003 to 2017. A 2024 paper on 1,338 women with cervical cancer from 2012 to 2017 found rising prevalence in Chuy, Osh, Jalal-Abad and Bishkek. The 2026 HPV survey of 1,213 women found high-risk types in 9.0%, HPV16 the commonest. The 2026 liver study covered 572 people with liver cancer in Bishkek, Osh and Jalal-Abad. An IAEA review of radiotherapy in Central Asia put Kyrgyzstan, Tajikistan and Uzbekistan at 0.1 to 0.2 megavoltage machines per million people in 2022, against 2.3 in Kazakhstan. These are the papers OnCo resolved and read as abstracts, not a complete list.",
          links: [
            { label: "Ur Rehman and Ali, JCO Global Oncology 2026", url: P_TRENDS },
            { label: "Chokoev and others, Asian Pacific Journal of Cancer Prevention 2022", url: P_BREAST },
            { label: "Vaninov and others, Cureus 2024: cervical cancer prevalence and mortality", url: P_CERVICAL },
            { label: "Kozukeev and others, Infectious Agents and Cancer 2026", url: P_HPV },
            { label: "Brandl and others, Lancet Regional Health Europe 2026", url: P_LIVER },
            { label: "AlKhatib and others, JCO Global Oncology 2025: radiotherapy resources in Central Asia", url: P_IAEA },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not found or not reached for this page",
      plain:
        "OnCo did not reach a website of the National Center of Oncology and Hematology or of the Ministry of Health, and did not find a cancer strategy for the years after 2025, a recent report from the cancer registry, or a list of the cancer medicines the state buys.",
      detail:
        "The address tried for the Ministry of Health, med.kg, did not connect on 16 November 2026, and OnCo found no working site for the national centre, so what the page says about the centre comes from the Ministry's 2021 strategy, the insurance fund, the IAEA and news reports. The strategy on the ICCP portal is a scan whose machine-read text is noisy. On a second pass the bed counts outside Bishkek were read from the page images and are now on the page. The count of cancers registered in 2000 is still left out, because the strategy's text gives 4,461 and the chart beside it 4,416. The state register and the essential medicines list on the regulator's site were not read for cancer medicines. A future pass should read the Ministry's site for a strategy after 2025, the registry's annual statistics, the essential medicines list, and the Osh centre's services. To check what applies to you, the insurance fund runs a free telephone line, 113.",
      links: [
        { label: "Mandatory Health Insurance Fund of the Kyrgyz Republic", url: FOMS },
        { label: "Department of Medicines and Medical Devices, Kyrgyz Republic", url: DLS },
        { label: "ICCP portal: search results for Kyrgyzstan", url: ICCP_SEARCH },
      ],
    },
    {
      id: "gap-conflicts",
      title: "Figures that do not agree with each other",
      plain:
        "Several sources on this page give different numbers for the same thing: how many cancers there are a year, how many breast cancers, and how many radiotherapy machines the country has. OnCo reports each with its source and has not chosen between them.",
      detail:
        "IARC's modelled 8,902 new cancers for 2024 is about a third higher than the 6,651 given by the 2026 paper that draws on national reports. For breast cancer, IARC estimates 1,218 new cases in 2024, the registry paper counted 7,850 over 2003 to 2017 (about 520 a year), and the insurance fund's June 2026 notice says about 400 are registered each year. The IAEA directory's entry for the national centre, updated in 2025, lists one cobalt-60 unit and no linear accelerator, while news reports describe two linear accelerators and a cobalt unit. WHO's two profiles disagree on chemotherapy: the 2020 profile counts all three treatment services (surgery, radiotherapy and chemotherapy) for 2019, while the 2021 cervical profile marks chemotherapy as not generally available; the guarantees programme has rules for chemotherapy departments and for buying chemotherapy medicines. A future pass should ask the national centre's statistics department and the IAEA directory which figures are current; readers can ask the treating hospital what is working on the day.",
      links: [
        { label: "IARC: GLOBOCAN 2024 fact sheet, Kyrgyzstan (PDF)", url: IARC_FACTSHEET },
        { label: "Mandatory Health Insurance Fund: on regular breast examination (Russian, 4 June 2026)", url: FOMS_BREAST },
        { label: "IAEA: Directory of Radiotherapy Centres, country table", url: DIRAC },
        { label: "WHO: cervical cancer profile 2021, Kyrgyzstan (PDF)", url: WHO_CX_2021 },
        { label: "WHO: Cancer Country Profile 2020, Kyrgyzstan (PDF)", url: WHO_PROFILE },
        { label: "Mandatory Health Insurance Fund: State Guarantees Programme (Russian)", url: PGG },
      ],
    },
  ],
  institutions: [
    "kg-ministry-of-health",
    "kg-national-center-of-oncology-and-hematology",
    "kg-osh-interregional-oncology-centre",
    "kg-mandatory-health-insurance-fund",
    "kg-department-of-medicines",
    "ergene-kyrgyzstan",
    "vmeste-protiv-raka-kyrgyzstan",
    "who",
    "iarc",
    "iaea",
  ],
  companies: [],
  drugs: ["morphine"],
  trials: [],
  papers: [
    "paper-ur-rehman-cancer-trends-kyrgyzstan-jcogo-2026",
    "paper-chokoev-breast-cancer-registry-kyrgyzstan-apjcp-2022",
    "paper-kozukeev-hpv-chuy-kyrgyzstan-iac-2026",
    "paper-brandl-hepatitis-liver-cancer-kyrgyzstan-lanepe-2026",
    "paper-alkhatib-radiotherapy-central-asia-jcogo-2025",
  ],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026, many of them in Russian: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 and 2021 country profiles, WHO's health expenditure and immunisation data, the IAEA's radiotherapy directory and 2015 review summary, the State Guarantees Programme on the Mandatory Health Insurance Fund's site, the Ministry of Health's cancer strategy for 2021 to 2025, the European Observatory's 2022 review, the medicines regulator's site, news reports on the linear accelerators, and paper abstracts through Europe PMC. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November, and the count on this page is unchanged.",
  verify:
    "Co-payment amounts, what is free and which machines are working change. Check with the Mandatory Health Insurance Fund (telephone 113), the Ministry of Health or the treating hospital before relying on this page.",
  verifyLinks: [
    { label: "Mandatory Health Insurance Fund: State Guarantees Programme (Russian)", url: PGG },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Kyrgyzstan (PDF)", url: IARC_FACTSHEET },
    { label: "Department of Medicines and Medical Devices, Kyrgyz Republic", url: DLS },
  ],
};

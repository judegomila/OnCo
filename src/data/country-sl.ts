import type { CountryDive } from "@/data/country-dive";

/**
 * Sierra Leone deep dive: the hand-written cards for /countries/sl/ (wave 14). Every figure was read from the raw text
 * of its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet, WHO's Cancer Country
 * Profile 2020 and cervical cancer profile 2021 (PDF text), the Ministry of Health and Sanitation's Non-Communicable
 * Diseases Strategic Plan 2020 to 2024 (PDF text from the ICCP portal), WHO's regional office news page on the 2012
 * registry launch, the NIH ClinRegs profile, the Pharmacy Board's home page, WHO's list of regulators at maturity
 * level 3 and 4, the African Union's treaty list, WHO's immunisation data API, the World Bank's health expenditure
 * series, IAEA DIRAC's public data and the Europe PMC record of the Connaught breast cancer paper. Sources that could
 * not be read are named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/694-sierra-leone-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/sle-2020.pdf";
const WHO_CERVICAL = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-sle-2021-country-profile-en.pdf";
const NCD_PLAN = "https://www.iccp-portal.org/sites/default/files/plans/SLE_B3_s21_NCD%20strategic%20plan%202020-2024%2023Feb2020%20FINAL%20signed%20CF%20%281%29%20%281%29.pdf";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=sierra%20leone";
const AFRO_REGISTRY = "https://www.afro.who.int/pt/node/2591";
const AFCRN_LIST = "https://afcrn.org/index.php/membership/membership-list";
const CONNAUGHT_PAPER = "https://doi.org/10.1186/s12885-025-13429-0";
const CLINREGS = "https://clinregs.niaid.nih.gov/country/sierra-leone";
const PBSL = "https://pharmacyboard.gov.sl/";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const WHO_HPV_COV = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'SLE'%20and%20contains(ANTIGEN,'HPV')";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'SLE'%20and%20contains(ANTIGEN,'HPV')";
const WB_OOP = "https://api.worldbank.org/v2/country/SLE/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_CHE = "https://api.worldbank.org/v2/country/SLE/indicator/SH.XPD.CHEX.PC.CD?format=json";
const WB_GOV = "https://api.worldbank.org/v2/country/SLE/indicator/SH.XPD.GHED.CH.ZS?format=json";
const WB_EXT = "https://api.worldbank.org/v2/country/SLE/indicator/SH.XPD.EHEX.CH.ZS?format=json";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const CTGOV = "https://clinicaltrials.gov/search?country=Sierra%20Leone&cond=cancer";
const CTGOV_API = "https://clinicaltrials.gov/api/v2/studies?query.locn=Sierra%20Leone&query.cond=cancer&pageSize=20&countTotal=true";
const MOH = "https://mohs.gov.sl/";

export const SL_DIVE: CountryDive = {
  iso2: "SL",
  iso3: "SLE",
  name: "Sierra Leone",
  flag: "🇸🇱",
  asOf: "2026-11-16",
  title: "Cancer in Sierra Leone",
  description:
    "Cancer in Sierra Leone: IARC's 2024 estimate of 6,357 new cancers and 4,071 deaths, modelled from neighbouring countries' rates, breast and cervical cancer leading, a Freetown-area cancer registry launched in 2012 that recorded 2,568 cases from 2015 to 2018, breast cancer surgery, chemotherapy and hormone therapy recorded at Connaught Hospital in 2018 to 2021, no radiotherapy centre in IAEA's directory, health spending of about USD 36 a person in 2023 with 54% paid out of pocket, HPV vaccination introduced in 2022, and no trial in OnCo's records with a site in Sierra Leone.",
  lede:
    "A specialist clinic at Connaught Hospital in Freetown treated breast cancer with surgery, chemotherapy and hormone therapy in records from 2018 to 2021, a children's cancer service was set up at Ola During Children's Hospital in 2017 and described by the Ministry of Health in early 2020, and a cancer registry that collects from Freetown-area health facilities was launched in 2012. IARC's 2024 figure of 6,357 new cancers a year is built from neighbouring countries' rates: these are modelled figures, not counts.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Sierra Leone is 6,357 new cancers and 4,071 deaths, an age-standardised incidence of 118.3 per 100,000 (107.1 in men, 131.3 in women) and an age-standardised mortality of 79.5. These are modelled figures, not counts. The fact sheet's \"Data source and methods\" box names no country-specific source for incidence and gives the method as \"Rates based on incidence estimates or registry data from neighbouring countries\" (IARC's method 5); mortality is \"National incidence estimates applied to model-based M:I ratios (registry survival data)\" (method 3c). The Freetown-area registry's own counts, 2,568 cases over 2015 to 2018, come from health facilities in one part of the country and are not what the estimate is built on.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer is estimated to look like in Sierra Leone",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Sierra Leone (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 6,400 new cancers a year by IARC's estimate, six in ten in women",
          plain:
            "IARC estimates 6,357 new cancers in Sierra Leone in 2024, 3,839 of them in women, and 4,071 cancer deaths. Breast cancer is estimated to be the commonest cancer, followed by cervical, prostate and liver cancer, and it is also the commonest cause of cancer death. The estimate is modelled from neighbouring countries' rates, not counted in Sierra Leone.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,409 breast cancers (665 deaths), 721 cervical cancers (439 deaths), 622 prostate cancers (378 deaths), 542 liver cancers (483 deaths) and 346 colorectal cancers (192 deaths). By deaths the order is breast, liver, cervix, prostate. The risk of developing a cancer before age 75 is 12.5%, and an estimated 10,288 people are living within five years of a diagnosis. The fact sheet names no Sierra Leonean data source for incidence; its method is rates from neighbouring countries. WHO's 2020 profile estimated 424 cancers a year in children aged 0 to 14 and said the incidence estimates have a high degree of uncertainty because they are not based on a population-based cancer registry.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Sierra Leone (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, Sierra Leone (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "registry",
          title: "A registry launched in 2012 that collects from health facilities around Freetown",
          plain:
            "Sierra Leone launched a National Cancer Registry in Freetown on 12 June 2012, with technical and financial support from WHO. The Ministry of Health's 2020 plan says it collected from 18 mostly urban health facilities in the Western Area and recorded 2,568 cases from 2015 to 2018.",
          detail:
            "WHO's regional office reported the launch in 2012, alongside the Sierra Leone Cancer Charity. The Ministry's Non-Communicable Diseases Strategic Plan 2020 to 2024, dated 23 February 2020, says the registry was funded at the start by that charity, worked with one registrar and three data collectors, mostly on a voluntary basis, and had no legislative framework. It gives 267, 330 and 442 cases for 2015, 2016 and 2017, which it calls less than 10% of the estimated annual cases, and a preliminary 1,529 for 2018 after reporting facilities rose from 12 to 18, 1,510 of the four-year total in women and 1,058 in men. In 2018 breast cancer made up 75.6% of the cases recorded in women and prostate cancer 56% of those in men. The plan's source for these counts is a personal communication from the registrar. WHO's 2021 cervical cancer profile records a population-based registry as existing; the African Cancer Registry Network's member list, read on 16 November 2026, does not include Sierra Leone, and OnCo found no report from the registry after 2018.",
          links: [
            { label: "Ministry of Health and Sanitation: Non-Communicable Diseases Strategic Plan 2020 to 2024 (PDF via ICCP)", url: NCD_PLAN },
            { label: "WHO Africa: Sierra Leone launches National Cancer Registry (12 June 2012)", url: AFRO_REGISTRY },
            { label: "WHO: cervical cancer profile 2021, Sierra Leone (PDF)", url: WHO_CERVICAL },
            { label: "African Cancer Registry Network: member list", url: AFCRN_LIST },
          ],
        },
      ],
      tables: [
        {
          id: "sl-registry",
          title: "What the Freetown-area cancer registry recorded, 2015 to 2018",
          caption: "Cases recorded each year by the National Cancer Registry from health facilities in the Western Area, as given in the Ministry of Health's 2020 plan.",
          columns: [
            { key: "year", label: "Year" },
            { key: "cases", label: "Cases recorded", numeric: true },
            { key: "facilities", label: "Reporting facilities", numeric: true },
          ],
          rows: [
            { year: "2015", cases: 267, facilities: null },
            { year: "2016", cases: 330, facilities: null },
            { year: "2017", cases: 442, facilities: null },
            { year: "2018 (preliminary)", cases: 1529, facilities: 18 },
            { year: "2015 to 2018", cases: 2568, facilities: null },
          ],
          note: "Counts from health facilities in the Western Area, most of them urban, reported to the Ministry by the registrar in a personal communication. The plan says the 2018 figure is a little more than a third of the new cases estimated for the country that year, and gives the number of reporting facilities only as a rise from 12 to 18 in 2018. A registry counts new cases, not deaths.",
          sources: [{ label: "Ministry of Health and Sanitation: Non-Communicable Diseases Strategic Plan 2020 to 2024 (PDF via ICCP)", url: NCD_PLAN }],
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
          title: "About USD 36 a person on health in 2023, more than half of it out of pocket",
          plain:
            "Sierra Leone spent about 36 US dollars a person on health in 2023, and households paid 54% of it out of their own pockets, according to WHO's health expenditure figures. The Ministry's 2020 plan describes free care under the Free Health Care Initiative as being for children under five and for pregnant and breastfeeding women; OnCo found no source saying that any public scheme pays for cancer treatment.",
          detail:
            "The World Bank's series, from WHO's Global Health Expenditure Database, gives current health spending of USD 45 per person in 2021, 41 in 2022 and 36 in 2023, and out-of-pocket spending of 51.4%, 54.9% and 54.5% of it. In 2023 the government paid 16.7% of health spending from domestic funds and external donors 28.5%. The Ministry's 2020 plan says the Free Health Care Initiative was launched in 2010 to give free care to children under five and to pregnant and lactating women, that a 2017 survey found between 1.8% and 3.9% of the groups it asked covered by health insurance, and that the Sierra Leone Social Health Insurance scheme, enacted in 2017, had not started. OnCo did not find a source on whether it has started since. WHO's 2020 profile recorded the availability of opioids for pain relief for 2015 to 2017 as 0 defined daily doses per million people per day.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Sierra Leone (API)", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Sierra Leone (API)", url: WB_CHE },
            { label: "World Bank: domestic general government health expenditure, Sierra Leone (API)", url: WB_GOV },
            { label: "World Bank: external health expenditure, Sierra Leone (API)", url: WB_EXT },
            { label: "Ministry of Health and Sanitation: Non-Communicable Diseases Strategic Plan 2020 to 2024 (PDF via ICCP)", url: NCD_PLAN },
            { label: "WHO: Cancer Country Profile 2020, Sierra Leone (PDF)", url: WHO_PROFILE },
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
          id: "pbsl",
          title: "The Pharmacy Board registers medicines and authorises clinical trials",
          plain:
            "The Pharmacy Board of Sierra Leone, which sits within the Ministry of Health, registers medicines, regulates pharmacies and pharmacists and must authorise a clinical trial before it starts. A trial also needs approval from the national ethics committee.",
          detail:
            "The NIH's ClinRegs profile, whose latest listed update is dated 27 March 2026, says the Board was first established by an Act of Parliament in 1988 and re-established by the Pharmacy and Drugs Act 2001 to regulate pharmaceutical products, medical devices, cosmetics, food supplements and herbal products and the practice of pharmacy. It reviews trials in all phases, with an Expert Committee on Pharmacovigilance and Clinical Trials, and ethics approval comes from the Sierra Leone Ethics and Scientific Review Committee. The Board's home page, read on 16 November 2026, offers applications to register a medicine and to conduct a clinical trial. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include Sierra Leone. The African Union's list of 19 September 2023 shows Sierra Leone signed the African Medicines Agency treaty on 10 February 2020 and ratified it on 28 May 2021. OnCo did not find a public register showing which cancer medicines are registered.",
          links: [
            { label: "NIH ClinRegs: Sierra Leone", url: CLINREGS },
            { label: "Pharmacy Board of Sierra Leone", url: PBSL },
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
      aside: { label: "WHO: cervical cancer profile 2021, Sierra Leone (PDF)", url: WHO_CERVICAL },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination began nationwide in 2022; WHO's 2025 figure is 77% of the target group",
          plain:
            "WHO's immunisation database records the HPV vaccine as introduced nationwide in Sierra Leone in 2022. Its estimate of programme coverage, the share of the girls targeted that year who received a first dose, was 74% in 2022, 24% in 2023, 61% in 2024 and 77% in 2025.",
          detail:
            "These are WHO's rows for HPV vaccination programme coverage, first dose, females, read from its immunisation data API on 16 November 2026: 152,258 doses against a target of 205,754 in 2022, 25,033 against 104,306 in 2023, 127,223 against 208,562 in 2024 and 161,819 against 208,879 in 2025. The country's own administrative reports in the same database differ from them in some years (for a first dose, 91.9% in 2025), and OnCo quotes WHO's programme coverage estimate. The database's rows for coverage by age 15 are empty for Sierra Leone in every year. WHO's 2021 cervical cancer profile, which describes 2020, recorded that HPV vaccination was not then in the national schedule.",
          links: [
            { label: "WHO immunisation data API: HPV coverage rows, Sierra Leone", url: WHO_HPV_COV },
            { label: "WHO immunisation data API: HPV vaccine introduction, Sierra Leone", url: WHO_HPV_INTRO },
            { label: "WHO: cervical cancer profile 2021, Sierra Leone (PDF)", url: WHO_CERVICAL },
          ],
        },
        {
          id: "screening-2021",
          title: "No national screening programme in WHO's 2021 profile; about 1 woman in 12 screened in five years",
          plain:
            "WHO's 2021 cervical cancer profile recorded no national cervical screening programme in Sierra Leone and estimated that 8% of women aged 30 to 49 had been screened in the previous five years. WHO's 2020 profile recorded no breast screening programme.",
          detail:
            "The 2021 profile gives 11% of women aged 30 to 49 as ever screened (2019), no programme or guidelines for early detection of first symptoms in primary care, and no clearly defined referral system. WHO's 2020 profile lists early detection guidelines for none of the four cancers it asks about. The Ministry's 2020 plan reports cervical cancer services at 3% of health facilities in 2017 (2% of 1,203 public facilities, 20% of private ones), says a few charities teach clinical breast examination, and sets establishing cervical screening for women aged 30 to 49 as one of its actions. OnCo found no later count of women screened.",
          links: [
            { label: "WHO: cervical cancer profile 2021, Sierra Leone (PDF)", url: WHO_CERVICAL },
            { label: "WHO: Cancer Country Profile 2020, Sierra Leone (PDF)", url: WHO_PROFILE },
            { label: "Ministry of Health and Sanitation: Non-Communicable Diseases Strategic Plan 2020 to 2024 (PDF via ICCP)", url: NCD_PLAN },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What stands out",
      title: "What stands out in Sierra Leone",
      cards: [
        {
          id: "connaught",
          title: "Breast cancer at Connaught Hospital: surgery, chemotherapy and hormone therapy, with most patients arriving late",
          plain:
            "A study of 253 people with breast cancer seen at Connaught Hospital's specialist clinic in Freetown from 2018 to 2021 found that about 47% arrived with stage IIIB disease and 13.8% with cancer that had already spread. Treatment was by mastectomy, chemotherapy and hormone therapy.",
          detail:
            "The study, in BMC Cancer in 2025 with authors from the hospital's surgery, medicine and pathology departments, counted 120 mastectomies (48%), neoadjuvant chemotherapy in 73 patients (29.2%), adjuvant chemotherapy in 84 (33.6%), hormone therapy in 98 (39.2%) and palliative care in 35 (14.0%); about 38 (15.2%) refused or did not start treatment. The mean age was 47. The authors ask for better histology services and access to radiotherapy. The records were chosen for completeness, so they may not represent everyone seen. The Ministry's 2020 plan adds that a palliative care unit opened at Connaught in September 2018 and saw 168 patients in its first 15 months, 95% of them referred for cancer, and that a 2016 review mission found about 80% of cancer patients presenting with locally advanced or metastatic disease.",
          links: [
            { label: "Cummings-John et al., breast cancer at Connaught Hospital (BMC Cancer 2025)", url: CONNAUGHT_PAPER },
            { label: "Ministry of Health and Sanitation: Non-Communicable Diseases Strategic Plan 2020 to 2024 (PDF via ICCP)", url: NCD_PLAN },
          ],
        },
        {
          id: "children",
          title: "A children's cancer service set up at Ola During Children's Hospital in 2017",
          plain:
            "The Ministry's 2020 plan describes a service set up in 2017 at Ola During Children's Hospital in Freetown that gave chemotherapy for Burkitt lymphoma, Wilms tumour and retinoblastoma to children whose disease the plan calls potentially curable, and palliative care to other children.",
          detail:
            "By early 2020 more than 80 children had been managed through the unit, about 35% of whom had received chemotherapy. The plan says the service worked with the paediatric surgical team at Connaught Hospital and an ophthalmology team in Freetown, was supported by a paediatric team from Wales, and that its lead doctor was being supported by the charity World Child Cancer through a two-year training programme in Ghana. It hoped to extend to leukaemia and other cancers, and noted that imaging and pathology were very limited and that the supply of chemotherapy and supportive medicines needed to be made sustainable. This is the position in early 2020; OnCo did not find a more recent account, so ask the hospital what it offers now.",
          links: [{ label: "Ministry of Health and Sanitation: Non-Communicable Diseases Strategic Plan 2020 to 2024 (PDF via ICCP)", url: NCD_PLAN }],
        },
        {
          id: "radiotherapy",
          title: "No radiotherapy centre in IAEA's directory; a facility was planned in 2020",
          plain:
            "IAEA's directory of radiotherapy centres, read on 16 November 2026, lists no centre in Sierra Leone. The Ministry's 2020 plan said a radiotherapy facility was in development with the IAEA, and reported the Ministry's radiologist as saying in 2019 that a presidential programme aimed to make radiotherapy and nuclear medicine services publicly available at Lakka Hospital by 2023.",
          detail:
            "The directory's public data had no row for Sierra Leone among its countries and no centre among 8,627 equipment rows. WHO's 2020 profile recorded 0.0 external beam radiotherapy machines per 10,000 cancer patients for 2019, and its 2021 cervical cancer profile recorded radiotherapy as not generally available, with cancer surgery, chemotherapy and pathology laboratories recorded as available and no cancer centre or cancer department at tertiary level. The 2020 plan also says there was no oncologist in the country in 2016 and that histopathology was available erratically at Connaught and one private hospital in Freetown. OnCo found no source saying the planned facility has opened, and none on where patients who need radiotherapy are sent. Ask the treating hospital.",
          links: [
            { label: "IAEA DIRAC: directory of radiotherapy centres", url: DIRAC },
            { label: "Ministry of Health and Sanitation: Non-Communicable Diseases Strategic Plan 2020 to 2024 (PDF via ICCP)", url: NCD_PLAN },
            { label: "WHO: Cancer Country Profile 2020, Sierra Leone (PDF)", url: WHO_PROFILE },
            { label: "WHO: cervical cancer profile 2021, Sierra Leone (PDF)", url: WHO_CERVICAL },
          ],
        },
        {
          id: "plan",
          title: "Cancer sits inside the non-communicable disease plan; no separate cancer plan found",
          plain:
            "Sierra Leone's public plan covering cancer is the Non-Communicable Diseases Strategic Plan 2020 to 2024. A search of the ICCP portal, which collects national cancer plans, returned that plan and its predecessors on 16 November 2026 but no national cancer control plan.",
          detail:
            "The search returned a non-communicable disease policy, two non-communicable disease strategic plans (the 2020 to 2024 plan and an earlier one) and WHO's profiles; OnCo opened the 2020 to 2024 plan. WHO's 2020 profile recorded \"n/a\" for a national cancer control plan in 2019, an integrated non-communicable disease plan as under development, and no cancer management guidelines. The 2020 to 2024 plan's cancer actions are to support the Freetown cancer registry and extend registration to the Western Area and regional towns, to advocate for including the registry in the national health information system, and to support the establishment of cervical screening for women aged 30 to 49. The plan's period has ended; OnCo did not find its successor. The Ministry's site is the place to look for one.",
          links: [
            { label: "Ministry of Health and Sanitation: Non-Communicable Diseases Strategic Plan 2020 to 2024 (PDF via ICCP)", url: NCD_PLAN },
            { label: "ICCP portal: resources search for Sierra Leone", url: ICCP_SEARCH },
            { label: "WHO: Cancer Country Profile 2020, Sierra Leone (PDF)", url: WHO_PROFILE },
            { label: "Ministry of Health, Sierra Leone", url: MOH },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Sierra Leone", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Sierra Leone",
          plain:
            "None of the trials in OnCo's records lists Sierra Leone among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Sierra Leone. A query of the registry's own interface the same day for the condition \"cancer\" with a location in Sierra Leone returned four studies, among them two on HPV (one of vaccination, one measuring how common infection is), and none testing a cancer treatment. Published research from the country that OnCo read is the 2025 study of breast cancer at Connaught Hospital.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Sierra Leone", url: CTGOV },
            { label: "ClinicalTrials.gov API: the query OnCo ran", url: CTGOV_API },
            { label: "Cummings-John et al., breast cancer at Connaught Hospital (BMC Cancer 2025)", url: CONNAUGHT_PAPER },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "What OnCo could not find or read for Sierra Leone",
      plain:
        "OnCo did not find a registry report after 2018, a national cancer control plan, a successor to the 2020 to 2024 plan, a source on whether radiotherapy has opened or where patients are referred, or any statement of what public schemes pay for cancer care.",
      detail:
        "IAEA's news page on radiotherapy in Sierra Leone answered a script with a challenge page (HTTP 403) and was not read. The Ministry of Health's home page, read on 16 November 2026, lists a directorate for non-communicable diseases and mental health but carried nothing on cancer services. The Pharmacy Board's home page does not show a searchable register of medicines. WHO's 2020 profile prints figures for scanners and staff per 10,000 cancer patients that OnCo has not restated. A future pass should ask the registry and the Ministry for recent counts and the current plan, read IAEA's country pages by hand, and look for the status of the Social Health Insurance scheme. Readers can ask the treating hospital or WHO's country office in Freetown.",
      links: [
        { label: "Ministry of Health, Sierra Leone", url: MOH },
        { label: "IAEA DIRAC: directory of radiotherapy centres", url: DIRAC },
        { label: "Pharmacy Board of Sierra Leone", url: PBSL },
      ],
    },
  ],
  institutions: ["sierra-leone-ministry-of-health", "connaught-hospital-freetown", "ola-during-childrens-hospital", "sierra-leone-national-cancer-registry", "pharmacy-board-sierra-leone", "who", "iarc", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-cummings-john-breast-cancer-connaught-bmc-cancer-2025"],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 cancer profile and 2021 cervical cancer profile, the Ministry of Health and Sanitation's Non-Communicable Diseases Strategic Plan 2020 to 2024, WHO's 2012 news page on the registry, the NIH ClinRegs profile, the Pharmacy Board's site, WHO's list of regulators, the African Union's treaty list, WHO's immunisation data, the World Bank's health expenditure series, IAEA's radiotherapy directory and the Europe PMC record of the Connaught Hospital study. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November, and the count on this page is unchanged.",
  verify:
    "The cancer numbers here are modelled estimates, and much of what is known about services comes from a plan written in early 2020. Check with the Ministry of Health or the treating hospital before relying on it.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Sierra Leone (PDF)", url: IARC_FACTSHEET },
    { label: "Ministry of Health and Sanitation: Non-Communicable Diseases Strategic Plan 2020 to 2024 (PDF via ICCP)", url: NCD_PLAN },
    { label: "Ministry of Health, Sierra Leone", url: MOH },
  ],
};

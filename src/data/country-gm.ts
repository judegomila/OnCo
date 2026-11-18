import type { CountryDive } from "@/data/country-dive";

/**
 * The Gambia deep dive: the hand-written cards for /countries/gm/ (wave 14). Every figure was read from the raw text
 * of its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet (and the GLOBOCAN 2022
 * sheet still served at the older address, for the change of method), the Ministry of Health's National Cancer Control
 * Strategy 2024 to 2029 (PDF text from the ICCP portal), WHO's Cancer Country Profile 2020 and cervical cancer profile
 * 2021 (PDF text), the Europe PMC records of the registry's 2013 paper and the teaching hospital's 2024 childhood
 * cancer paper, the Medicines Control Agency's and the Ministry's home pages, WHO's list of regulators at maturity
 * level 3 and 4, the African Union's treaty list, WHO's immunisation data API, the World Bank's health expenditure
 * series and IAEA DIRAC's public data. Sources that could not be read are named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/270-the-republic-of-the-gambia-fact-sheet.pdf";
const IARC_FACTSHEET_2022 = "https://gco.iarc.who.int/media/globocan/factsheets/populations/270-the-gambia-fact-sheet.pdf";
const WHO_PROFILE = "https://www.iccp-portal.org/sites/default/files/plans/GMB_2020.pdf";
const WHO_CERVICAL = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-gmb-2021-country-profile-en.pdf";
const NCCS = "https://www.iccp-portal.org/sites/default/files/2026-03/The%20Finalized%20National%20Cancer%20Control%20Strategy%20%28NCCS%29%202024%20-2029.pdf";
const ICCP_NCCS_PAGE = "https://www.iccp-portal.org/resources/national-cancer-control-strategy-2024-2029";
const NCR_PAPER = "https://doi.org/10.1371/journal.pone.0075775";
const EFSTH_PAPER = "https://doi.org/10.1002/hsr2.70084";
const AFCRN_LIST = "https://afcrn.org/index.php/membership/membership-list";
const MCA = "https://www.mca.gm/";
const MOH = "https://moh.gov.gm/";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const WHO_HPV_COV = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'GMB'%20and%20contains(ANTIGEN,'HPV')";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'GMB'%20and%20contains(ANTIGEN,'HPV')";
const WB_OOP = "https://api.worldbank.org/v2/country/GMB/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_CHE = "https://api.worldbank.org/v2/country/GMB/indicator/SH.XPD.CHEX.PC.CD?format=json";
const WB_GOV = "https://api.worldbank.org/v2/country/GMB/indicator/SH.XPD.GHED.CH.ZS?format=json";
const WB_EXT = "https://api.worldbank.org/v2/country/GMB/indicator/SH.XPD.EHEX.CH.ZS?format=json";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const CLINREGS = "https://clinregs.niaid.nih.gov/";
const CTGOV = "https://clinicaltrials.gov/search?country=Gambia&cond=cancer";
const CTGOV_API = "https://clinicaltrials.gov/api/v2/studies?query.locn=Gambia&query.cond=cancer&pageSize=20&countTotal=true";

export const GM_DIVE: CountryDive = {
  iso2: "GM",
  iso3: "GMB",
  name: "The Gambia",
  flag: "🇬🇲",
  asOf: "2026-11-16",
  title: "Cancer in The Gambia",
  description:
    "Cancer in The Gambia: IARC's 2024 estimate of 1,921 new cancers and 1,387 deaths, with liver and cervical cancer leading, a national cancer registry that ran from 1986 to December 2019, a first National Cancer Control Strategy for 2024 to 2029, chemotherapy at the teaching hospital and one private hospital and no radiotherapy by the Ministry's account, health spending of about USD 26 a person in 2023 with 34% paid out of pocket, 79% of girls given an HPV vaccine dose by age 15 in 2025, and no trial in OnCo's records with a site in The Gambia.",
  lede:
    "The Gambia had a nationwide cancer registry from 1986, set up to test whether vaccinating infants against hepatitis B prevents liver cancer, and the Ministry of Health's first cancer control strategy runs from 2024 to 2029. Liver cancer is the commonest cancer, then cervical cancer. The strategy records chemotherapy at two hospitals, no radiotherapy, and a registry that has been inactive since December 2019.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for The Gambia is 1,921 new cancers and 1,387 deaths, an age-standardised incidence of 117.9 per 100,000 (104.0 in men, 132.4 in women) and an age-standardised mortality of 88.0. The fact sheet gives its incidence method as \"National or subnational rates scaled to regional all-cancer rates\" (IARC's method 4) and mortality as \"National incidence estimates applied to model-based M:I ratios (registry survival data)\" (method 3c). The box names no country-specific data source for incidence. The earlier GLOBOCAN 2022 sheet, which named the national cancer registry as its source and projected its rates, gave 1,192 new cancers and an age-standardised incidence of 78.9; the two editions use different methods, so the difference between them should not be read as a rise in cancer. The registry has been inactive since December 2019, so neither figure rests on recent counts.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in The Gambia",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, The Gambia (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 1,900 new cancers a year by IARC's estimate, with liver cancer the commonest",
          plain:
            "IARC estimates 1,921 new cancers in The Gambia in 2024, 1,193 of them in women, and 1,387 cancer deaths. Liver cancer is the commonest cancer and the commonest cause of cancer death, followed by cervical cancer; together they are about half of all new cancers. Breast, prostate and lung cancer follow.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 503 liver cancers (450 deaths), 447 cervical cancers (264 deaths), 161 breast cancers (77 deaths), 100 prostate cancers (60 deaths) and 82 lung cancers (68 deaths). In men liver cancer is 42.2% of new cancers; in women cervical cancer is 37.5%. The risk of developing a cancer before age 75 is 12.4%, and an estimated 3,313 people are living within five years of a diagnosis. IARC builds the estimate from national or subnational rates scaled to the region's all-cancer rates. WHO's 2020 profile estimated 142 cancers a year in children aged 0 to 14.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, The Gambia (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, Gambia (PDF via ICCP)", url: WHO_PROFILE },
          ],
        },
        {
          id: "registry",
          title: "A nationwide registry from 1986, inactive since December 2019",
          plain:
            "The National Cancer Registry of The Gambia was set up in 1986 to count every cancer diagnosed in the country, as part of a trial of infant hepatitis B vaccination. The Ministry of Health's cancer strategy for 2024 to 2029 says the registry became inactive in December 2019 when that study's programme ended.",
          detail:
            "The registry was established within the Gambia Hepatitis Intervention Study, a collaboration of the Government of The Gambia, IARC and the UK Medical Research Council, and is housed at the Medical Research Council's unit in Fajara. A 2013 paper by its staff analysed 1990 to 2009: liver cancer made up 60% of cancers in men, and cervical cancer 33%, liver cancer 24% and breast cancer 11% of cancers in women; incidence was relatively stable, and the data were not yet enough to show an effect of vaccination on liver cancer. The strategy says that because of the dormancy the actual number of cancers in the country has not been known since 2019, and it sets reactivating the registry, creating hospital registries and partnership with the African Cancer Registry Network as actions. That network's member list, read on 16 November 2026, does not include The Gambia. OnCo found no report that the registry has restarted.",
          links: [
            { label: "Ministry of Health: National Cancer Control Strategy 2024 to 2029 (PDF via ICCP)", url: NCCS },
            { label: "Bah et al., 20 years of population-based cancer registration in The Gambia (PLoS One 2013)", url: NCR_PAPER },
            { label: "African Cancer Registry Network: member list", url: AFCRN_LIST },
          ],
        },
      ],
      tables: [
        {
          id: "gm-registry",
          title: "The commonest cancers in the national registry, 1990 to 2009",
          caption: "Share of all registered cancers in each sex over the 20 years, National Cancer Registry of The Gambia, per cent.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "men", label: "Share of cancers in men (%)", numeric: true },
            { key: "women", label: "Share of cancers in women (%)", numeric: true },
          ],
          rows: [
            { site: "Liver", men: 60, women: 24 },
            { site: "Cervix uteri", men: null, women: 33 },
            { site: "Breast", men: null, women: 11 },
            { site: "Prostate", men: 5, women: null },
            { site: "Non-Hodgkin lymphoma", men: 5, women: 4 },
            { site: "Lung and bronchus", men: 4, women: null },
            { site: "Stomach", men: 3, women: null },
          ],
          note: "Shares as printed in the paper's abstract, which lists the commonest cancers in each sex and gives no counts; an empty cell means the abstract gives no figure for that sex. The registry has not been active since December 2019.",
          sources: [{ label: "Bah et al., 20 years of population-based cancer registration in The Gambia (PLoS One 2013)", url: NCR_PAPER }],
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
          title: "About USD 26 a person on health in 2023, a third of it out of pocket",
          plain:
            "The Gambia spent about 26 US dollars a person on health in 2023, and households paid 34% of it out of their own pockets, according to WHO's health expenditure figures. The national cancer strategy says essential cancer medicines are not regularly available, and OnCo found no list of cancer services that health insurance pays for.",
          detail:
            "The World Bank's series, from WHO's Global Health Expenditure Database, gives current health spending of USD 30 per person in 2021 and 2022 and 26 in 2023, and out-of-pocket spending of 27.6%, 29.4% and 33.8% of it. In 2023 the government paid 44.9% of health spending from domestic funds and external donors 17.4%. The Ministry's strategy for 2024 to 2029 gives the allocation for cancer care in the health budget as about 11 million dalasi, which it puts at 2.3%, and lists among its actions advocating for more cancer services in the benefit package covered by health insurance and for subsidising costly cancer services for the poorest patients. A study of children with cancer at the teaching hospital in 2022 and 2023 found the families of 93.8% could not obtain chemotherapy medicines because they were unavailable, too costly, or both. Ask the hospital what the family will be asked to buy.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Gambia (API)", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Gambia (API)", url: WB_CHE },
            { label: "World Bank: domestic general government health expenditure, Gambia (API)", url: WB_GOV },
            { label: "World Bank: external health expenditure, Gambia (API)", url: WB_EXT },
            { label: "Ministry of Health: National Cancer Control Strategy 2024 to 2029 (PDF via ICCP)", url: NCCS },
            { label: "Adegoke et al., childhood cancer in The Gambia, the first year (Health Science Reports 2024)", url: EFSTH_PAPER },
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
          id: "mca",
          title: "The Medicines Control Agency registers medicines and oversees clinical trials",
          plain:
            "The Medicines Control Agency, set up under the Medicines and Related Products Act 2014, registers medicines, licenses and inspects, tests quality, collects reports of side effects and oversees clinical trials.",
          detail:
            "This is from the agency's own home page, read on 16 November 2026, which lists product registration, post-market surveillance and regulatory inspection, licensing, quality control testing, pharmacovigilance and clinical trial oversight as its services, links to a list of registered medicines, and gives its address as Sukuta, West Coast Region. The Ministry of Health's site lists it among its agencies. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include The Gambia. The African Union's list of 19 September 2023 shows The Gambia had neither signed nor ratified the African Medicines Agency treaty. The national cancer strategy says the country has no list of essential medicines for oncology. OnCo did not read the agency's register to see which cancer medicines are on it, and the NIH's ClinRegs site, read on 16 November 2026, has no profile for The Gambia among its 23 countries.",
          links: [
            { label: "Medicines Control Agency, The Gambia", url: MCA },
            { label: "Ministry of Health, The Gambia", url: MOH },
            { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML3 },
            { label: "African Union: signatures and ratifications of the African Medicines Agency treaty (19 September 2023, PDF)", url: AMA },
            { label: "Ministry of Health: National Cancer Control Strategy 2024 to 2029 (PDF via ICCP)", url: NCCS },
            { label: "NIH ClinRegs: countries with a profile", url: CLINREGS },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: cervical cancer profile 2021, Gambia (PDF)", url: WHO_CERVICAL },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination nationwide since 2019; 79% of girls had a dose by age 15 in 2025",
          plain:
            "WHO's immunisation database records the HPV vaccine as introduced nationwide in The Gambia in 2019. Its estimate of girls who had received a first dose by the age of 15 was 60% in 2019, 76% in 2022, 64% in 2023, 74% in 2024 and 79% in 2025.",
          detail:
            "These are WHO's rows for HPV vaccination coverage by age 15, first dose, females, read from its immunisation data API on 16 November 2026; the 2025 row is 26,048 girls of a target of 33,027. The figure for a last dose by age 15 was 30% in 2022 and equals the first-dose figure from 2023. WHO's separate programme coverage rows, which measure each year's target group, are much lower and uneven (15% in 2024, 33% in 2025), and the country's own administrative reports in the database exceed 100% in some years; OnCo quotes the coverage by age 15. The Ministry's strategy says vaccination was piloted in 2014 among girls aged 9 to 13, and that misconceptions about the COVID-19 vaccine have increased rejection of the HPV vaccine. The strategy also lists immunising infants against hepatitis B, a cause of liver cancer, among its prevention activities.",
          links: [
            { label: "WHO immunisation data API: HPV coverage rows, Gambia", url: WHO_HPV_COV },
            { label: "WHO immunisation data API: HPV vaccine introduction, Gambia", url: WHO_HPV_INTRO },
            { label: "Ministry of Health: National Cancer Control Strategy 2024 to 2029 (PDF via ICCP)", url: NCCS },
          ],
        },
        {
          id: "screening-2024",
          title: "Cervical screening by visual inspection at some facilities, with treatment at three",
          plain:
            "The Ministry's cancer strategy for 2024 to 2029 says a number of secondary-level facilities offer cervical screening by visual inspection, but three facilities treat women whose test is positive: one general hospital, the teaching hospital and one private facility. Pap smears, HPV testing and colposcopy were available at the teaching hospital alone.",
          detail:
            "The strategy adds that five facilities have cryotherapy equipment that is not operational, that of five mammography machines in the country the three at the teaching hospital were not working, that prostate-specific antigen testing is at the teaching hospital and one private facility, and that colonoscopy is at three facilities. WHO's 2021 cervical cancer profile recorded no national screening programme and estimated that 9% of women aged 30 to 49 had been screened in the previous five years and 11% ever (2019). The strategy aims to raise the share of facilities offering screening, early detection and linkage to care to 20% and to write screening guidelines for cervical, breast and prostate cancer. OnCo found no count of women screened since.",
          links: [
            { label: "Ministry of Health: National Cancer Control Strategy 2024 to 2029 (PDF via ICCP)", url: NCCS },
            { label: "WHO: cervical cancer profile 2021, Gambia (PDF)", url: WHO_CERVICAL },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What stands out",
      title: "What stands out in The Gambia",
      cards: [
        {
          id: "strategy",
          title: "A first National Cancer Control Strategy, for 2024 to 2029",
          plain:
            "The Ministry of Health's National Cancer Control Strategy 2024 to 2029 is described in its foreword as the country's first cancer control strategic plan. It follows the setting up of a National Cancer Control Programme in September 2022.",
          detail:
            "The strategy, posted on the ICCP portal, sets seven aims: to reduce new cancers from modifiable risk factors by 2% by 2030; to raise the share of facilities offering screening, early detection and linkage to care to 20%; to raise the share offering basic diagnosis, treatment and palliative care to 30%; to strengthen surveillance and research; to build institutional and technical capacity; to set up multi-sectoral coordination; and to mobilise advocacy and resources. Its actions include advocating for a radiotherapy centre and for chemotherapy medicines, training oncologists and pathologists, and reactivating the registry. WHO's 2020 profile, describing 2019, had recorded the cancer plan as under development and no cancer management guidelines. OnCo found no progress report on the strategy.",
          links: [
            { label: "Ministry of Health: National Cancer Control Strategy 2024 to 2029 (PDF via ICCP)", url: NCCS },
            { label: "ICCP portal: The National Cancer Control Strategy 2024 to 2029", url: ICCP_NCCS_PAGE },
            { label: "WHO: Cancer Country Profile 2020, Gambia (PDF via ICCP)", url: WHO_PROFILE },
          ],
        },
        {
          id: "treatment",
          title: "Surgery at three facilities, chemotherapy at two, and one oncologist",
          plain:
            "The strategy for 2024 to 2029 records cancer surgery at three facilities (the teaching hospital, one general hospital and one private hospital) and chemotherapy and hormone therapy at the teaching hospital and one private hospital. It counts one oncologist in the country, a paediatric oncologist at the teaching hospital.",
          detail:
            "Histopathology to confirm a diagnosis, and cytology, are available at the Edward Francis Small Teaching Hospital in Banjul alone, where the strategy counts three histopathologists and two haematologists; the country has four radiologists. A CT scanner is at the teaching hospital, one general hospital and one private facility, and MRI at the teaching hospital. The strategy says there were no tumour boards in any facility, that palliative care in the full sense is not available, that the country has no list of essential medicines for oncology, and that essential cancer medicines are not regularly available. The teaching hospital's study of its first year of children's cancer care, November 2022 to October 2023, saw 44 children, most often with Wilms tumour or leukaemia: 9 completed treatment, 10 were still on chemotherapy and 8 died.",
          links: [
            { label: "Ministry of Health: National Cancer Control Strategy 2024 to 2029 (PDF via ICCP)", url: NCCS },
            { label: "Adegoke et al., childhood cancer in The Gambia, the first year (Health Science Reports 2024)", url: EFSTH_PAPER },
          ],
        },
        {
          id: "radiotherapy",
          title: "No radiotherapy in the country, by the Ministry's own account",
          plain:
            "The strategy for 2024 to 2029 says radiation therapy is not available in The Gambia, and IAEA's directory of radiotherapy centres, read on 16 November 2026, lists no centre there. The strategy's action is to advocate for a radiotherapy centre.",
          detail:
            "The directory's public data had no row for The Gambia among its countries and no centre among 8,627 equipment rows. WHO's 2020 profile recorded 0.0 external beam radiotherapy machines per 10,000 cancer patients for 2019, and its 2021 cervical cancer profile recorded radiotherapy as not generally available. The strategy also records no nuclear medicine therapy and no radiation oncologist, and none of the 44 children in the teaching hospital's 2022 to 2023 study had radiotherapy. The strategy does not say where patients who need radiotherapy are sent, and OnCo found no other source that does, so it names no country; ask the treating hospital.",
          links: [
            { label: "Ministry of Health: National Cancer Control Strategy 2024 to 2029 (PDF via ICCP)", url: NCCS },
            { label: "IAEA DIRAC: directory of radiotherapy centres", url: DIRAC },
            { label: "WHO: Cancer Country Profile 2020, Gambia (PDF via ICCP)", url: WHO_PROFILE },
            { label: "WHO: cervical cancer profile 2021, Gambia (PDF)", url: WHO_CERVICAL },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in The Gambia", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in The Gambia",
          plain:
            "None of the trials in OnCo's records lists The Gambia among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists The Gambia. A query of the registry's own interface the same day for the condition \"cancer\" with a location in The Gambia returned two completed studies, neither testing a cancer treatment: one a treatment cohort for hepatitis B in The Gambia and Senegal (NCT02129829), the other on anaemia in children. Cancer research from the country that OnCo read is the registry's work within the Gambia Hepatitis Intervention Study, the randomised trial of infant hepatitis B vaccination that the registry was built to follow, and the teaching hospital's childhood cancer study.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in The Gambia", url: CTGOV },
            { label: "ClinicalTrials.gov API: the query OnCo ran", url: CTGOV_API },
            { label: "Bah et al., 20 years of population-based cancer registration in The Gambia (PLoS One 2013)", url: NCR_PAPER },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "What OnCo could not find or read for The Gambia",
      plain:
        "OnCo did not find registry counts after 2009, a report that the registry has restarted, where patients are sent for radiotherapy, what health insurance pays for cancer care, or a progress report on the 2024 to 2029 strategy.",
      detail:
        "The Ministry of Health's home page, read on 16 November 2026, lists a health insurance body among its agencies by an acronym alone and carried nothing on cancer. WHO's 2020 profile for The Gambia prints figures for scanners, staff and public cancer centres per 10,000 cancer patients whose labels and values are not unambiguous in the PDF text, so OnCo has not restated them, and its 2021 cervical profile prints HPV coverage in a chart that did not come through clearly, so OnCo used WHO's data API. The ICCP portal also lists a cervical cancer plan for 2016 to 2020 and a non-communicable disease plan for 2022 to 2027 that OnCo did not open. A future pass should read those two plans and the Medicines Control Agency's register, and ask the Ministry's National Cancer Control Programme about the registry. Readers can ask the teaching hospital in Banjul.",
      links: [
        { label: "Ministry of Health, The Gambia", url: MOH },
        { label: "ICCP portal: resources search for Gambia", url: "https://www.iccp-portal.org/resources?search_api_fulltext=gambia" },
        { label: "Medicines Control Agency, The Gambia", url: MCA },
      ],
    },
    {
      id: "gap-globocan-editions",
      title: "Why IARC's figure rose from 1,192 to 1,921 between editions",
      plain:
        "IARC's GLOBOCAN 2022 sheet for The Gambia gave 1,192 new cancers and its 2024 sheet gives 1,921. The two editions use different methods, so the rise should not be read as that many more people developing cancer.",
      detail:
        "The 2022 sheet names the national cancer registry as its source, with the method \"National (or local with coverage greater than 50%) rates projected to 2022\", and gives an age-standardised incidence of 78.9 per 100,000. The 2024 sheet's method is \"National or subnational rates scaled to regional all-cancer rates\", with an age-standardised incidence of 117.9. IARC's sheets do not explain the change for The Gambia, and OnCo does not guess at its reasons. The 2022 sheet is still served at IARC's older address for The Gambia, and the 2024 sheet at a new one; both are linked here so the figures can be checked. IARC's methods paper is the place to read how each method works.",
      links: [
        { label: "IARC: GLOBOCAN 2024 fact sheet, The Gambia (PDF)", url: IARC_FACTSHEET },
        { label: "IARC: GLOBOCAN 2022 fact sheet, The Gambia (PDF, older address)", url: IARC_FACTSHEET_2022 },
      ],
    },
  ],
  institutions: ["gambia-ministry-of-health", "efsth-banjul", "gambia-national-cancer-registry", "mca-gambia", "who", "iarc", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-bah-gambia-cancer-registration-20-years-plos-one-2013", "paper-adegoke-childhood-cancer-gambia-hsr-2024"],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 and 2022 fact sheets, the Ministry of Health's National Cancer Control Strategy 2024 to 2029, WHO's 2020 cancer profile and 2021 cervical cancer profile, the Europe PMC records of the registry's 2013 paper and the teaching hospital's 2024 paper, the Medicines Control Agency's and the Ministry's sites, WHO's list of regulators, the African Union's treaty list, WHO's immunisation data, the World Bank's health expenditure series and IAEA's radiotherapy directory. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November, and the count on this page is unchanged.",
  verify:
    "IARC's 2024 fact sheet names no country-specific source for its incidence figures, the Ministry's strategy says the national cancer registry has been inactive since December 2019, and the account of services is the Ministry's own from that strategy for 2024 to 2029. Check with the Ministry of Health or the treating hospital before relying on it.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, The Gambia (PDF)", url: IARC_FACTSHEET },
    { label: "Ministry of Health: National Cancer Control Strategy 2024 to 2029 (PDF via ICCP)", url: NCCS },
    { label: "Ministry of Health, The Gambia", url: MOH },
  ],
};

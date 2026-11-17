import type { CountryDive } from "@/data/country-dive";

/**
 * Bhutan deep dive: the hand-written cards for /countries/bt/ (wave 15). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Bhutan (PDF text),
 * the Population-Based Cancer Registry's 2014 to 2022 paper (International Journal of Cancer 2026, full text through
 * Europe PMC) and its 2019 to 2022 report on the Ministry of Health's site (PDF text), the Bhutan Cancer Control
 * Strategy 2019 to 2025 (PDF text, ICCP portal), the 2024 review of screening and cancer care in The Lancet Regional
 * Health Southeast Asia (full text through Europe PMC), WHO's Cancer Country Profile 2020 and cervical cancer profile 2021, WHO's Global Health Observatory and
 * immunisation data APIs, the Bhutan Food and Drug Authority's own site, WHO's lists of regulators, IAEA DIRAC's
 * public country table and the ClinicalTrials.gov API. What could not be read is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/64-bhutan-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/btn_2020.pdf";
const WHO_CX = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-btn-2021-country-profile-en.pdf";
const STRATEGY = "https://www.iccp-portal.org/sites/default/files/plans/BTN_B5_s21_Bhutan%20Cancer%20Control%20Strategy%20Final.pdf";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=Bhutan";
const PBCR_REPORT = "https://moh.gov.bt/wp-content/uploads/2025/07/A4_Final_PBCR-19-22-report.pdf";
const PBCR_PAPER = "https://doi.org/10.1002/ijc.70308";
const LANSEA = "https://doi.org/10.1016/j.lansea.2024.100370";
const CRC_GAPS = "https://doi.org/10.1002/cam4.72179";
const CRC_PROFILE = "https://doi.org/10.1186/s12885-025-15037-4";
const HPV_2015 = "https://doi.org/10.1016/j.vaccine.2015.05.078";
const HPV_BOYS = "https://doi.org/10.1177/10105395241273296";
const REACH = "https://doi.org/10.1136/bmjopen-2017-016309";
const COLPO = "https://doi.org/10.1016/j.jcpo.2025.100676";
const PALLIATIVE = "https://doi.org/10.25259/ijpc_206_2024";
const GHO_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'BTN'";
const GHO_CHE = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'BTN'";
const GHO_GOV = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'BTN'";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'BTN'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'BTN'%20and%20contains(DESCRIPTION,'HPV')";
const BFDA = "https://bfda.gov.bt/";
const BFDA_BACKGROUND = "https://bfda.gov.bt/background/";
const DRA_OLD = "https://dra.gov.bt/";
const WHO_ML = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const WHO_CRP = "https://extranet.who.int/prequal/sites/default/files/document_files/Country_List-23August2023.pdf";
const DIRAC = "https://dirac.iaea.org/";
const CTGOV = "https://clinicaltrials.gov/search?country=Bhutan&cond=cancer";
const CTGOV_HP = "https://clinicaltrials.gov/study/NCT07211880";
const JDWNRH = "https://jdwnrh.gov.bt/about-us/";

export const BT_DIVE: CountryDive = {
  iso2: "BT",
  iso3: "BTN",
  name: "Bhutan",
  flag: "🇧🇹",
  asOf: "2026-11-16",
  title: "Cancer in Bhutan",
  description:
    "Cancer in Bhutan from its own registry and plans: a national population-based registry at the national referral hospital that recorded 5,906 cancers from 2014 to 2022, stomach cancer leading in men and cervical cancer in women, IARC's estimate of 644 new cancers and 466 deaths in 2024, care free of cost, with published accounts from 2024 and 2026 saying patients who need radiotherapy are referred to India at the government's expense, a cancer control strategy for 2019 to 2025, screening of the population for stomach, cervical and breast cancer from 2020 to 2023, and HPV vaccination since 2010 with 98% first-dose coverage in girls in 2025.",
  lede:
    "Bhutan has a national cancer registry, a cancer control strategy for 2019 to 2025 and a national cancer control programme, and it screened most of its eligible population for stomach, cervical and breast cancer between 2020 and 2023. Published accounts say care is free of cost and that surgery and chemotherapy are given at the national referral hospital in Thimphu. A 2024 review says radiotherapy stopped in the country in August 2021 and that patients who need it are referred to India at the government's expense; OnCo found no source on whether that has changed since.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Bhutan is 644 new cancers and 466 deaths, an age-standardised incidence of 82.6 per 100,000 (70.7 in men, 97.6 in women) and an age-standardised mortality of 61.7. The fact sheet gives the incidence data source as \"Registry (national)\" and the method as \"National rates applied to 2024 population\", so the incidence figures rest on Bhutan's own registry. Mortality is modelled: national incidence estimates applied to model-based mortality-to-incidence ratios from registry survival data. The registry's own report counted 3,172 new cancers and 1,461 deaths in the four years 2019 to 2022. That is about 793 new cancers a year, more than IARC's 644 for 2024, and about 365 deaths a year, fewer than IARC's 466; neither source explains the differences and OnCo does not guess at them.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Bhutan",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Bhutan (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "Stomach cancer leads in men and cervical cancer in women",
          plain:
            "IARC estimates 644 new cancers in Bhutan in 2024, 365 of them in women, and 466 cancer deaths. Stomach cancer is the commonest cancer and the commonest cause of cancer death, followed by cervical cancer by cases and lung cancer by deaths.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 99 stomach cancers (86 deaths), 75 cervical cancers (46 deaths), 50 lung cancers (48 deaths), 42 thyroid cancers (4 deaths), 40 oesophageal cancers (40 deaths) and 38 liver cancers (36 deaths). The risk of developing a cancer before age 75 is 9.2%, and an estimated 1,410 people are living within five years of a diagnosis. In men the leading cancers are stomach, oesophagus and liver; in women, cervix, stomach and thyroid. IARC builds the incidence figures from Bhutan's national registry rates and models the deaths.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Bhutan (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "stomach-and-cervix",
          title: "Rates of stomach and cervical cancer are higher than in most neighbouring registries",
          plain:
            "The registry's 2014 to 2022 paper sets Bhutan beside registries in Nepal, Sri Lanka, India and Thailand: Bhutan's rates of stomach cancer in both sexes and of cervical cancer are higher than most of them, its breast cancer rate is lower than all of them, and its lung cancer rates are lower than most.",
          detail:
            "Age-adjusted rates per 100,000 for 2014 to 2022 were 20.9 for stomach cancer in men and 15.3 in women, against 8.3 and 4.5 in Kathmandu and 3.7 and 1.5 in Sri Lanka; cervical cancer was 19.5 in Bhutan against 8.3 in Kathmandu and 9.1 in Sri Lanka. Breast cancer was 8.6 in Bhutanese women against 40.5 in Sri Lanka. The paper notes that stomach cancer rates in men are higher still in parts of north-east India such as Mizoram (39.1) and Aizawl (44.2), where its table also shows higher rates of cervical cancer. A 2013 study of 372 volunteers in three Bhutanese cities concluded that the high incidence of gastric cancer may be attributed to a high prevalence of Helicobacter pylori infection.",
          links: [
            { label: "Tshering et al., cancer pattern in Bhutan 2014 to 2022 (Int J Cancer 2026)", url: PBCR_PAPER },
            { label: "Vilaichone et al., Helicobacter pylori infection in Bhutan (World J Gastroenterol 2013)", url: "https://doi.org/10.3748/wjg.v19.i18.2806" },
          ],
        },
        {
          id: "pbcr",
          title: "A national population-based registry since 2014",
          plain:
            "Bhutan's population-based cancer registry was set up in 2014 at Jigme Dorji Wangchuck National Referral Hospital and covers the whole country. From 2014 to 2022 it registered 5,906 new cancers and 2,510 cancer deaths.",
          detail:
            "The registry was established with the support of the Ministry of Health and the IARC Regional Hub at Tata Memorial Centre in Mumbai, which checks its data. Staff collect cases from hospitals and diagnostic facilities into CanReg5. Of the 5,906 cases, 2,659 were in men and 3,247 in women; 87.2% were confirmed under the microscope and 3.7% were known from a death certificate alone. There were 135 cancers in children under 15. Its second report, for 2019 to 2022, counted 3,172 new cancers and 1,461 deaths. The authors list the registry's difficulties: no designated space, no permanent full-time staff, and medical records kept by hand.",
          links: [
            { label: "Tshering et al., cancer pattern in Bhutan 2014 to 2022 (Int J Cancer 2026)", url: PBCR_PAPER },
            { label: "Ministry of Health: Cancer Incidence and Mortality in Bhutan 2019 to 2022, registry report (PDF)", url: PBCR_REPORT },
          ],
        },
        {
          id: "where-treated",
          title: "What the registry records about where people were treated",
          plain:
            "For the cancers registered from 2019 to 2022, the registry's report says 2,340 patients were treated in Bhutan, 613 were treated outside the country and 76 in both.",
          detail:
            "The report says surgery was mainly done at the national referral hospital, that radiation was given partly there and partly outside the country, and that chemotherapy is either started at the hospital for gastrointestinal, breast and gynaecological cancers or continued after being started by oncologists in Kolkata or elsewhere. It explains that fewer patients were referred out in this period because radiation was available in the country from 2018 to 2021 and because of travel restrictions during the pandemic. It records 2,177 patients (71%) treated with curative intent and 871 (29%) on a palliative basis.",
          links: [{ label: "Ministry of Health: Cancer Incidence and Mortality in Bhutan 2019 to 2022, registry report (PDF)", url: PBCR_REPORT }],
        },
      ],
      tables: [
        {
          id: "bt-registry-sites",
          title: "The five commonest cancers in men and in women, registry counts 2014 to 2022",
          caption: "New cases registered over nine years and the age-adjusted incidence rate per 100,000, Population-Based Cancer Registry of Bhutan.",
          columns: [
            { key: "sex", label: "Sex" },
            { key: "site", label: "Cancer" },
            { key: "cases", label: "Cases 2014 to 2022", numeric: true },
            { key: "aar", label: "Rate per 100,000", numeric: true },
          ],
          rows: [
            { sex: "Men", site: "All cancers", cases: 2659, aar: 88.3 },
            { sex: "Men", site: "Stomach", cases: 613, aar: 20.9 },
            { sex: "Men", site: "Oesophagus", cases: 209, aar: 7.2 },
            { sex: "Men", site: "Liver", cases: 185, aar: 6.3 },
            { sex: "Men", site: "Lung", cases: 160, aar: 5.3 },
            { sex: "Men", site: "Rectum", cases: 123, aar: 4.1 },
            { sex: "Women", site: "All cancers", cases: 3247, aar: 113.2 },
            { sex: "Women", site: "Cervix uteri", cases: 569, aar: 19.5 },
            { sex: "Women", site: "Stomach", cases: 426, aar: 15.3 },
            { sex: "Women", site: "Breast", cases: 254, aar: 8.6 },
            { sex: "Women", site: "Thyroid", cases: 212, aar: 6.3 },
            { sex: "Women", site: "Lung", cases: 187, aar: 6.8 },
          ],
          note: "These are the registry's own counts for nine years, from Table 1 of its 2026 paper, not IARC's estimate for one year. The paper says patients who travel abroad for treatment can be missed by the registry.",
          sources: [{ label: "Tshering et al., cancer pattern in Bhutan 2014 to 2022 (Int J Cancer 2026)", url: PBCR_PAPER }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care",
      cards: [
        {
          id: "free-care",
          title: "Care is free of cost, including for patients referred abroad",
          plain:
            "A 2024 review says health care in Bhutan is provided free of cost at every level and that the government bears all costs of referral to India. The registry's 2026 paper says cancer treatment is free of cost, including for citizens referred outside the country.",
          detail:
            "The 2024 review in The Lancet Regional Health Southeast Asia states that all levels of health care are free and that the government refers all cancer patients needing radiation therapy, and selected patients needing chemotherapy, immunotherapy or targeted therapy, to medical centres in India with all costs borne by the government. The registry's paper adds that some patients travel to India or other countries for treatment at their own expense. The cancer control strategy says referrals abroad have risen steadily and strain a limited health budget. In a 2026 interview study of colorectal cancer care, a pharmacist described shortages of chemotherapy medicines, which are imported mainly from India, and the authors report financial and geographic barriers for patients from remote districts because care is centralised at tertiary hospitals.",
          links: [
            { label: "Dorji et al., population-level cancer screening and cancer care in Bhutan (Lancet Reg Health Southeast Asia 2024)", url: LANSEA },
            { label: "Tshering et al., cancer pattern in Bhutan 2014 to 2022 (Int J Cancer 2026)", url: PBCR_PAPER },
            { label: "Bhutan Cancer Control Strategy 2019 to 2025 (PDF, ICCP portal)", url: STRATEGY },
            { label: "Foo et al., colorectal cancer in Bhutan: health system gaps (Cancer Med 2026)", url: CRC_GAPS },
          ],
        },
        {
          id: "spending",
          title: "About USD 162 a person on health in 2023, a quarter of it out of pocket",
          plain:
            "WHO's health expenditure figures give Bhutan's health spending as about 162 US dollars a person in 2023. Households paid 25.5% of it out of pocket and the government 66.7%.",
          detail:
            "WHO's Global Health Observatory gives current health expenditure per person of USD 161.47 in 2021, 138.01 in 2022 and 162.20 in 2023. Out-of-pocket spending was 15.4% of current health spending in 2020 and 28.5%, 28.0% and 25.5% in 2021, 2022 and 2023; domestic government spending was 78.0% in 2020 and 66.7% in 2023. The series does not explain the rise in the out-of-pocket share after 2020, and these figures cover all health care, not cancer alone.",
          links: [
            { label: "WHO Global Health Observatory: out-of-pocket share of current health expenditure, Bhutan (data API)", url: GHO_OOP },
            { label: "WHO Global Health Observatory: current health expenditure per person, Bhutan (data API)", url: GHO_CHE },
            { label: "WHO Global Health Observatory: government share of current health expenditure, Bhutan (data API)", url: GHO_GOV },
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
          id: "bfda",
          title: "The Bhutan Food and Drug Authority regulates medicines",
          plain:
            "Medicines in Bhutan are regulated by the Bhutan Food and Drug Authority, formed by merging the Drug Regulatory Authority with the food and narcotics regulators under the Civil Service Reform Act 2022. Its Medical Product Division regulates medical products.",
          detail:
            "The authority's own site says the former Drug Regulatory Authority was instituted under the Medicines Act of the Kingdom of Bhutan 2003 and regulated human medicines, vaccines, veterinary and traditional medicines, blood products, health supplements and medical devices, with product registration and post-marketing surveillance as its core mandate. Its home page says it has registered over 1,200 medical products. Bhutan is not on WHO's list of regulators operating at maturity level 3 or 4, dated August 2026 and read on 16 November 2026; that is a statement about the list, not a judgement of the authority's work. WHO's list of authorities taking part in its collaborative registration procedure, dated 23 August 2023, lists the Drug Regulatory Authority of Bhutan from 16 December 2019.",
          links: [
            { label: "Bhutan Food and Drug Authority", url: BFDA },
            { label: "Bhutan Food and Drug Authority: background", url: BFDA_BACKGROUND },
            { label: "WHO: regulators operating at maturity level 3 and 4 (PDF)", url: WHO_ML },
            { label: "WHO: authorities participating in the collaborative procedure, 23 August 2023 (PDF)", url: WHO_CRP },
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
          id: "flagship",
          title: "Most eligible people were screened for three cancers from 2020 to 2023",
          plain:
            "From 2020 to 2023 the government ran a time-bound screening programme for stomach, cervical and breast cancer under its Health Flagship Programme, reaching 91.2% of the eligible population overall.",
          detail:
            "The 2024 review reports that 370,225 people were tested for Helicobacter pylori, 32.4% of them positive, and that among 53,182 who had an endoscopy and biopsy 255 had gastric cancer. The review's Table 3 gives 116,493 women tested for HPV DNA, 10,749 of them (9.2%) positive, 9,887 colposcopies and 154 cervical cancers found; its abstract words the same figures differently, as 10,749 tested and 9.3% positive. For breast cancer, 72,283 women had a clinical breast examination and 845 a mammogram, and 73 cancers were found. The programme's budget was 1,109.572 million ngultrum, about 13.1 million US dollars. The registry report gives coverage of 90.81% for cervical, 90.17% for gastric and 93% for breast cancer screening.",
          links: [
            { label: "Dorji et al., population-level cancer screening and cancer care in Bhutan (Lancet Reg Health Southeast Asia 2024)", url: LANSEA },
            { label: "Ministry of Health: Cancer Incidence and Mortality in Bhutan 2019 to 2022, registry report (PDF)", url: PBCR_REPORT },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccination since 2010, for boys as well as girls since 2020",
          plain:
            "Bhutan began a national HPV vaccination programme for girls in 2010 and extended it to boys in 2020. WHO's figures for 2025 give first-dose programme coverage of 98% in girls and 88% in boys.",
          detail:
            "A 2015 paper in the journal Vaccine describes routine vaccination of 12-year-old girls with a catch-up campaign for girls aged 13 to 18 in 2010; coverage fell to 67 to 69% in the three years of delivery through health centres and rose above 90% when delivery returned to schools in 2014. WHO's immunisation data mark the vaccine as introduced from 2009 and give programme coverage in girls of 94% for the first dose and 92% for the last dose in 2024, and 98% for both in 2025; in boys, 84% and 82% in 2024 and 88% in 2025. A 2024 study describes the school-based programme for both sexes that began in 2020.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage, Bhutan (data API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: HPV vaccine introduction, Bhutan (data API)", url: WHO_INTRO_API },
            { label: "Dorji et al., introduction of a national HPV vaccination program into Bhutan (Vaccine 2015)", url: HPV_2015 },
            { label: "Yangchen et al., extending girls-only HPV vaccination to boys in Bhutan (Asia Pac J Public Health 2024)", url: HPV_BOYS },
          ],
        },
        {
          id: "cervical-screening",
          title: "Cervical screening: from Pap smears to HPV testing",
          plain:
            "WHO's 2021 cervical cancer profile recorded a national screening programme by cytology for women aged 25 to 65, with 4 in 10 women aged 30 to 49 screened in the previous five years. The 2020 to 2023 programme used HPV DNA testing.",
          detail:
            "A 2017 study in rural Bhutan offered HPV testing on samples women collected themselves at 15 primary health centres: 2,590 women enrolled, participation was 71%, half reported no previous screening and 10% tested positive. WHO's 2021 profile gives 62% of women aged 30 to 49 as ever screened, from 2019 data. A 2026 paper in the Journal of Cancer Policy says the country reached the WHO targets known as 90-70-90 by 2023, that screening, diagnosis and treatment of cervical cancer are free of cost, and that a national guideline on colposcopy and treatment of precancer has been written; it adds that cervical cancer remains the commonest cancer in women.",
          links: [
            { label: "WHO: cervical cancer country profile 2021, Bhutan (PDF)", url: WHO_CX },
            { label: "Baussano et al., cervical screening in rural Bhutan with HPV testing on self-collected samples (BMJ Open 2017)", url: REACH },
            { label: "Dorji et al., colposcopy and treatment of cervical pre-cancer in Bhutan (J Cancer Policy 2026)", url: COLPO },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What stands out",
      title: "What stands out in Bhutan",
      cards: [
        {
          id: "strategy",
          title: "A cancer control strategy for 2019 to 2025 and a national programme since 2020",
          plain:
            "The Ministry of Health published the Bhutan Cancer Control Strategy 2019 to 2025, which its foreword calls the first for the country, and set up a National Cancer Control Program in 2020.",
          detail:
            "The strategy sets targets for 2025: more than half of oral, breast and cervical cancers diagnosed at stages I and II, 70% of eligible women screened for cervical cancer within three years, 80% of patients starting radiotherapy within 15 days of being ready to treat, and half of cancer patients receiving palliative care. It plans oncology units at the regional referral hospitals in Mongar and Gelephu and five district hubs able to give chemotherapy. It records a Royal Command of September 2017 to build a cancer hospital. The ICCP portal also holds Bhutan's screening guideline for the three cancers and its non-communicable disease action plan for 2015 to 2020. OnCo found no successor strategy for the years after 2025.",
          links: [
            { label: "Bhutan Cancer Control Strategy 2019 to 2025 (PDF, ICCP portal)", url: STRATEGY },
            { label: "ICCP portal: documents returned for Bhutan", url: ICCP_SEARCH },
            { label: "Dorji et al., population-level cancer screening and cancer care in Bhutan (Lancet Reg Health Southeast Asia 2024)", url: LANSEA },
          ],
        },
        {
          id: "treatment",
          title: "Surgery and chemotherapy in Thimphu; radiotherapy by referral to India",
          plain:
            "Cancer treatment is centred on Jigme Dorji Wangchuck National Referral Hospital in Thimphu, which has had an oncology ward for chemotherapy since November 2011. Published accounts from 2024 and 2026 say there is no radiotherapy in the country and patients who need it are referred to India.",
          detail:
            "The 2019 strategy said radiotherapy had recently become available at the hospital; the registry report says radiation was available in the country from 2018 to 2021, and the 2024 review says it was discontinued in August 2021. That review also says that in 2023 Bhutan had no oncologists, radiation specialists, medical physicists or oncology-trained nurses, and that surgeons led chemotherapy for stomach and breast cancer. A 2026 study still lists the lack of radiotherapy in the country. IAEA's DIRAC public country table has no entry for Bhutan. A 2025 paper describes the hospital as the only one in Bhutan with cancer surgery services. Home-based palliative care has run from the hospital for residents of Thimphu since 2018.",
          links: [
            { label: "Dorji et al., population-level cancer screening and cancer care in Bhutan (Lancet Reg Health Southeast Asia 2024)", url: LANSEA },
            { label: "Bhutan Cancer Control Strategy 2019 to 2025 (PDF, ICCP portal)", url: STRATEGY },
            { label: "Ministry of Health: Cancer Incidence and Mortality in Bhutan 2019 to 2022, registry report (PDF)", url: PBCR_REPORT },
            { label: "Foo et al., colorectal cancer in Bhutan: health system gaps (Cancer Med 2026)", url: CRC_GAPS },
            { label: "Pradhan et al., colorectal cancer at the national referral hospital (BMC Cancer 2025)", url: CRC_PROFILE },
            { label: "Dorji et al., palliative care services in Bhutan (Indian J Palliat Care 2025)", url: PALLIATIVE },
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: DIRAC },
            { label: "Jigme Dorji Wangchuck National Referral Hospital", url: JDWNRH },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Bhutan", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Bhutan",
          plain:
            "None of the trials in OnCo's records lists Bhutan among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Bhutan. A query of the registry itself that day for cancer studies with a site in Bhutan returned one: NCT07211880, a completed community study of Helicobacter pylori eradication and gastric disease that enrolled 1,043 people from December 2019, with Khesar Gyalpo University of Medical Sciences of Bhutan as its site. The registry lists it as an interventional study that tested for the infection and treated it, aimed at preventing stomach cancer. It is completed, and it was not a trial of cancer treatment.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Bhutan", url: CTGOV },
            { label: "ClinicalTrials.gov: NCT07211880", url: CTGOV_HP },
          ],
        },
        {
          id: "published-research",
          title: "A body of Bhutanese research on stomach and cervical cancer",
          plain:
            "Bhutanese clinicians publish regularly: on the registry, whose 2026 paper was written with Tata Memorial Centre in Mumbai, on HPV vaccination and cervical screening, on Helicobacter pylori and stomach cancer, on colorectal cancer and on palliative care.",
          detail:
            "A Europe PMC search on 16 November 2026 for papers with Bhutan and cancer, HPV, Helicobacter pylori, oncology or palliative care in the title returned 46 records. OnCo has read and recorded five of them: the registry's 2014 to 2022 results, the 2024 review of screening and cancer care, the 2015 account of introducing HPV vaccination, the 2017 study of HPV testing on self-collected samples, and the 2026 interview study of colorectal cancer care. The others are not yet recorded here.",
          links: [
            { label: "Europe PMC: Bhutan cancer papers", url: "https://europepmc.org/search?query=TITLE%3ABhutan%20AND%20%28TITLE%3Acancer%20OR%20TITLE%3AHPV%20OR%20TITLE%3Apylori%20OR%20TITLE%3Aoncology%20OR%20TITLE%3Apalliative%29" },
            { label: "Tshering et al., cancer pattern in Bhutan 2014 to 2022 (Int J Cancer 2026)", url: PBCR_PAPER },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-who-profile",
      title: "WHO's 2020 profile is used sparingly, and it disagrees with later accounts on radiotherapy",
      plain:
        "OnCo read WHO's Cancer Country Profile 2020 for Bhutan as text and used little of it, because the columns of its health system table do not pair cleanly once the PDF is turned into text.",
      detail:
        "What reads without ambiguity: a population-based registry recorded for 2019, an integrated non-communicable disease plan recorded as operational in 2019, cancer management guidelines recorded as present, and cervical screening recorded as opportunistic and by Pap smear. Its counts of radiotherapy machines and staff could not be paired with their labels and are not used on this page. WHO's 2021 cervical cancer profile lists radiotherapy as generally available in 2021, the year the 2024 review says the service stopped. A future pass should read the 2020 profile as a rendered PDF.",
      links: [
        { label: "WHO: Cancer Country Profile 2020, Bhutan (PDF)", url: WHO_PROFILE },
        { label: "WHO: cervical cancer country profile 2021, Bhutan (PDF)", url: WHO_CX },
      ],
    },
    {
      id: "gap-sources",
      title: "Sources not found or not read for this page",
      plain:
        "OnCo did not find a source on whether radiotherapy has restarted in Bhutan since 2021, on progress with the planned cancer hospital, on which hospitals in India receive Bhutanese patients, or a cancer strategy for the years after 2025.",
      detail:
        "The former Drug Regulatory Authority's site could not be read because its security certificate had expired; the new authority's site was read instead. OnCo did not read the text of Bhutan's constitution on free health care, the national essential medicines list, the registry's first report for 2014 to 2018, or the 2025 to 2029 immunisation strategy listed on the ICCP portal, and it holds no record of the two regional referral hospitals. IAEA's DIRAC public table has no entry for Bhutan, which is not proof that no machine exists. For current arrangements, ask the national referral hospital or the Ministry of Health's National Cancer Control Program.",
      links: [
        { label: "Drug Regulatory Authority of Bhutan (former site, certificate expired on 16 November 2026)", url: DRA_OLD },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: DIRAC },
        { label: "ICCP portal: documents returned for Bhutan", url: ICCP_SEARCH },
        { label: "Ministry of Health, Bhutan", url: "https://moh.gov.bt/" },
      ],
    },
  ],
  institutions: [
    "jdwnrh-bhutan",
    "bhutan-population-based-cancer-registry",
    "bhutan-ministry-of-health",
    "bhutan-food-and-drug-authority",
    "bhutan-cancer-society",
    "tata-memorial",
    "iarc",
    "who",
    "iaea",
  ],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-tshering-cancer-pattern-bhutan-ijc-2026",
    "paper-dorji-cancer-screening-care-bhutan-lansea-2024",
    "paper-dorji-hpv-vaccination-programme-bhutan-vaccine-2015",
    "paper-baussano-reach-bhutan-hpv-self-sampling-bmjopen-2017",
    "paper-foo-colorectal-cancer-health-system-bhutan-cam4-2026",
  ],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, the registry's 2026 paper and its 2019 to 2022 report, the Bhutan Cancer Control Strategy 2019 to 2025, peer-reviewed papers resolved through Europe PMC, WHO's 2020 and 2021 profiles, WHO's health expenditure and immunisation data, the Bhutan Food and Drug Authority's site, WHO's lists of regulators and IAEA's DIRAC table.",
  verify:
    "Registry counts run to 2022, the screening figures to 2023, and the accounts of radiotherapy and referral to India date from 2024 and 2026. Services change. Anyone seeking care should ask Jigme Dorji Wangchuck National Referral Hospital or the Ministry of Health what is available now and how referral abroad is arranged.",
  verifyLinks: [
    { label: "Jigme Dorji Wangchuck National Referral Hospital", url: JDWNRH },
    { label: "Ministry of Health, Bhutan", url: "https://moh.gov.bt/" },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Bhutan (PDF)", url: IARC_FACTSHEET },
  ],
};

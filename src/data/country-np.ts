import type { CountryDive } from "@/data/country-dive";

/**
 * Nepal deep dive: the hand-written cards for /countries/np/ (wave 7). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: the Ministry of Health and Population's Nepal Cancer Control
 * Strategy 2024 to 2030 (PDF text, in Nepali, set in a legacy Nepali font and read with its numerals decoded), the
 * IAEA, WHO and IARC imPACT Review summary report for Nepal (PDF text), the Nepal Health Research Council's registry
 * reports for Kathmandu Valley and Rukum in 2018 (PDF text), the Health Insurance Board's 2022/23 factsheet and
 * executive summary (PDF text, through the Internet Archive, as hib.gov.np did not answer), a Himalayan Times report of
 * April 2026 on the board's figures, the Department of Drug Administration's about page and notice board (Internet
 * Archive copies of June 2025 and October 2026, as dda.gov.np did not answer), BP Koirala Memorial Cancer Hospital's
 * about page (Internet Archive, August 2025), two WHO Nepal news pages, WHO's immunisation and Global Health
 * Observatory APIs, IARC's GLOBOCAN 2024 fact sheet for Nepal, and the papers' abstracts through Europe PMC (and the
 * full text of Gyawali et al. 2020). Where a figure could not be read it is named under `gaps`.
 */
const NCCS = "https://www.iccp-portal.org/sites/default/files/plans/Nepal%20Cancer%20Control%20Strategy_Public%20Health%20Update.pdf";
const NCCS_NEWS = "https://www.iccp-portal.org/news/nepal-cancer-control-strategy-2024-2030";
const IMPACT = "https://www.iaea.org/sites/default/files/documents/review-missions/nepal-impact-review-report-2022.pdf";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/524-nepal-fact-sheet.pdf";
const KTM_REPORT = "https://elibrary.nhrc.gov.np/bitstream/20.500.14356/3001/1/KTM-Valley-Report-final.pdf";
const RUKUM_REPORT = "https://elibrary.nhrc.gov.np/bitstream/20.500.14356/3002/1/Rukum_Report_final-2.pdf";
const HIB_FACTSHEET_WB = "https://web.archive.org/web/20250317081442/http://hib.gov.np/public/uploads/shares/Annual_Report_Factsheet_Summary_English_2022_23.pdf";
const HT_HIB_2026 = "https://thehimalayantimes.com/health/nepals-health-insurance-scheme-enrolls-98-million-but-only-59-million-active-rs-25-billion-funding-gap-looms";
const DDA_ABOUT_WB = "https://web.archive.org/web/20250619222337/https://www.dda.gov.np/content/about-us";
const DDA_HOME_WB = "https://web.archive.org/web/20261012211112/https://dda.gov.np/";
const BPK_ABOUT_WB = "https://web.archive.org/web/20250802171303/https://bpkmch.org.np/about-us/";
const WHO_GPACCM = "https://www.who.int/nepal/news/detail/27-03-2024-nepal-joins-the-global-platform-for-access-to-childhood-cancer-medicines-(gpaccm)";
const WHO_IMPACT_FOLLOWUP = "https://www.who.int/nepal/news/detail/13-05-2024-interactive-session-on-the-follow-up-of-the-2021-impact-review-mission-recommendations-held";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'NPL'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_HPV_SCHEDULE_API = "https://xmart-api-public.who.int/WIISE/AD_SCHEDULES?$filter=COUNTRY%20eq%20'NPL'%20and%20YEAR%20eq%202025";
const WHO_HPV_INTRO_API = "https://xmart-api-public.who.int/WIISE/AD_VACCINE_INTRODUCTIONS?$filter=COUNTRY%20eq%20'NPL'%20and%20startswith(VACCINECODE,'HPV')";
const GHO_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'NPL'";
const GHO_UHC = "https://ghoapi.azureedge.net/api/UHC_INDEX_REPORTED?$filter=SpatialDim%20eq%20'NPL'";
const CTGOV = "https://clinicaltrials.gov/search?country=Nepal&cond=cancer";
const D_SUBEDI_KTM = "https://doi.org/10.1200/go.20.00574";
const D_SUBEDI_RURAL = "https://doi.org/10.3332/ecancer.2021.1229";
const D_DAHAL = "https://doi.org/10.1155/2024/4687221";
const D_TOBACCO = "https://doi.org/10.1371/journal.pone.0300271";
const D_GYAWALI = "https://doi.org/10.1200/go.20.00287";

export const NP_DIVE: CountryDive = {
  iso2: "NP",
  iso3: "NPL",
  name: "Nepal",
  flag: "🇳🇵",
  asOf: "2026-11-11",
  title: "Cancer in Nepal",
  description:
    "Cancer in Nepal from Nepali sources: IARC's estimate of 24,499 new cancers and 17,213 deaths in 2024, three population-based registries covering nine of 77 districts, the Nepal Cancer Control Strategy 2024 to 2030, national health insurance with a NPR 100,000 family ceiling, a government grant of NPR 100,000 for poor patients with cancer, about ten radiotherapy machines against a need of about 30, free childhood cancer medicines through a WHO platform, and why no trial in our records has a site in Nepal.",
  lede:
    "Nepal has counted cancer in its population only since 2018, in three registries covering about a fifth of its people, and IARC's national figure still borrows rates from neighbouring countries: 24,499 new cancers and 17,213 deaths in 2024. The country has a national cancer strategy for 2024 to 2030, about ten radiotherapy machines, and a grant of NPR 100,000 for poor patients that goes to more people with cancer than with any of the seven other diseases it covers.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Nepal is 24,499 new cancers (11,080 in men, 13,419 in women) and 17,213 deaths, an age-standardised incidence of 90.1 per 100,000 and mortality of 64.1. IARC's fact sheet gives its incidence method as rates based on incidence estimates or registry data from neighbouring countries, and names no Nepali data source; mortality is national incidence applied to modelled mortality-to-incidence ratios. So the estimate is not built from Nepal's own registries, and its pattern differs from theirs. GLOBOCAN ranks stomach (3,159 cases), oesophagus (2,069) and breast (1,746) first, with lung cancer at 1,477. Nepal's registries rank lung cancer highest-risk in men and breast cancer in women: Kathmandu Valley recorded lung and stomach cancer leading in men and breast and lung cancer in women in 2018, and across nine districts in 2019 the lifetime risk before 75 was highest for lung cancer in men (1 in 80) and breast cancer in women (1 in 76). Rates differ too: Kathmandu Valley, mostly urban, measured 95.7 per 100,000 in 2018, close to IARC's 90.1, while the nine districts together measured 65.6 in 2019, and rural Rukum measured 59.1 in men and 51.4 in women. The registries under-count deaths, because civil registration does not record cancer as a cause of death. IARC puts gallbladder cancer at 1,073 cases, an age-standardised 4.01 per 100,000, the third-highest rate of the 186 countries IARC estimates, after Bolivia and Chile, and the Kathmandu Valley registry found gallbladder cancer in the top five for both sexes.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Nepal",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Nepal (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 24,500 new cancers a year, with stomach, lung, breast and cervical cancer common",
          plain:
            "IARC estimates 24,499 new cancers in Nepal in 2024 and 17,213 deaths, about seven deaths for every ten new cancers. Nepal's own registries show lung and stomach cancer leading in men and breast, lung and cervical cancer in women, with gallbladder cancer unusually common. The national strategy says most cancers are found late.",
          detail:
            "The GLOBOCAN 2024 fact sheet lists stomach, oesophagus and liver as the three commonest cancers in men by cases, and breast, cervix and stomach in women; by deaths stomach cancer leads for both sexes (2,690 deaths). The risk of developing cancer before 75 is 10.0% in men and 9.8% in women. The Nepal Cancer Control Strategy 2024 to 2030, quoting GLOBOCAN 2022, gives about 22,000 new cancers and more than 14,000 deaths, says cancer patients rose 13% over a decade, and cites the National Burden of Disease 2019 for non-communicable diseases causing 71% of deaths in Nepal and cancer 11%. It states that 50 to 65% of breast cancers are diagnosed at stage 3 or 4, that more than two thirds of lung cancers are found only at the final or metastatic stage, and that 60 to 70% of mouth and throat cancers are found late. It estimates about 1,500 new childhood cancers a year, of which only a third are diagnosed; WHO Nepal, in 2024, put the number diagnosed at about 900 a year with about a third treated. Across the registries in 2019, tobacco-related cancers were 35.3% of cancers in men and 17.3% in women.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Nepal (PDF)", url: IARC_FACTSHEET },
            { label: "Nepal Cancer Control Strategy 2024 to 2030, sections 1 and 3 (Ministry of Health and Population, in Nepali, PDF)", url: NCCS },
            { label: "WHO Nepal: Nepal joins the Global Platform for Access to Childhood Cancer Medicines (27 March 2024)", url: WHO_GPACCM },
            { label: "Kafle Dahal et al., tobacco-related cancers in Nepal 2019 (PLoS One 2024)", url: D_TOBACCO },
          ],
        },
        {
          id: "care-capacity",
          title: "Six government cancer hospitals, four of them in Kathmandu Valley",
          plain:
            "The national strategy counts six government cancer hospitals: four in Kathmandu Valley, one in Chitwan and one in Nepalgunj. Most diagnostic services are in Bagmati Province, so patients from elsewhere often travel, and many have one treatment at one hospital and radiotherapy at another. Some specialised tests on tumour samples are sent to India.",
          detail:
            "The strategy says most diagnostic services are in Bagmati Province (Kathmandu Valley and Bharatpur), that immunohistochemistry and flow cytometry are available at few centres outside the valley, and that specialised biomarker tests such as IHC, FC, PCR and FISH are rare, so samples or patients are sometimes sent abroad, samples sometimes to India, delaying diagnosis and raising costs. It counts six nuclear medicine centres, three of them private centres offering PET-CT, and three SPECT-CT centres, two of them government hospitals. Because not every hospital offers every treatment, patients are often obliged to have one part of treatment at one hospital and radiotherapy at another. The imPACT reviewers found that medical oncology was not readily available across the country and that about 25% of patients do not complete planned therapy because of cost. BP Koirala Memorial Cancer Hospital in Bharatpur, Chitwan, set up by an Act of Parliament, has a statutory goal of conducting the National Cancer Control Program.",
          links: [
            { label: "Nepal Cancer Control Strategy 2024 to 2030, section 3.3 (in Nepali, PDF)", url: NCCS },
            { label: "IAEA, WHO and IARC: imPACT Review summary report, Nepal (PDF)", url: IMPACT },
            { label: "BP Koirala Memorial Cancer Hospital: about us (read through the Internet Archive)", url: BPK_ABOUT_WB },
          ],
        },
      ],
      tables: [
        {
          id: "np-registry",
          title: "What Nepal's population-based cancer registries have published",
          caption: "New cancers registered, age-adjusted incidence per 100,000 and cancer deaths registered, from the Nepal Health Research Council's reports and papers. Latest published year: 2019.",
          columns: [
            { key: "source", label: "Registry (area covered)" },
            { key: "year", label: "Year" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "men", label: "Incidence, men", numeric: true },
            { key: "women", label: "Incidence, women", numeric: true },
            { key: "deaths", label: "Deaths registered", numeric: true },
          ],
          rows: [
            { source: "Kathmandu Valley: Kathmandu, Lalitpur, Bhaktapur (about 3.07 million people)", year: "2018", cases: 2156, men: 95.3, women: 98.1, deaths: 670 },
            { source: "Kathmandu district", year: "2018", cases: 1351, men: 90.4, women: 92.6, deaths: 393 },
            { source: "Lalitpur district", year: "2018", cases: 484, men: 101.3, women: 109.2, deaths: 173 },
            { source: "Bhaktapur district", year: "2018", cases: 321, men: 112.5, women: 107.8, deaths: 104 },
            { source: "Rukum: East and West Rukum (about 221,000 people)", year: "2018", cases: 87, men: 59.1, women: 51.4, deaths: 38 },
            { source: "All registries, nine districts (both sexes 65.6; mortality 29)", year: "2019", cases: null, men: null, women: null, deaths: null },
          ],
          note: "The registries cover nine of 77 districts, about a fifth of the population; the Madhesh registry (Siraha, Saptari, Dhanusha, Mahottari) has no separate report read here. Deaths are under-counted because civil registration does not record cancer as a cause of death. The 2019 row gives the paper's combined rates only; its counts are not in the abstract.",
          sources: [
            { label: "NHRC: Cancer Incidence and Mortality in Kathmandu Valley in 2018 (PDF)", url: KTM_REPORT },
            { label: "NHRC: Cancer Incidence and Mortality in Rukum Districts in 2018 (PDF)", url: RUKUM_REPORT },
            { label: "Dahal et al., cancer risk in Nepal from the population-based registries, 2019 (J Cancer Epidemiol 2024)", url: D_DAHAL },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: three population registries since 2018, and hospital registries since 2003",
      aside: { label: "NHRC: Cancer Incidence and Mortality in Kathmandu Valley in 2018 (PDF)", url: KTM_REPORT },
      cards: [
        {
          id: "registry-nhrc",
          title: "Female community health volunteers help find cancers that never reach a hospital record",
          plain:
            "The Nepal Health Research Council started population-based cancer registration on 1 January 2018, first in Kathmandu Valley and then in Madhesh Province and Rukum. Besides hospitals and laboratories, it collects cases through female community health volunteers and enumerators who visit households, because many deaths and cancers are never recorded officially.",
          detail:
            "The Kathmandu Valley report for 2018 describes partnerships with 38 health facilities, data also received from BP Koirala Memorial Cancer Hospital and Tata Memorial Hospital in India, and a community route in which health coordinators and female community health volunteers in each municipality report cases monthly; where reporting was low, trained enumerators visited ward chairs, health posts and households. Cases are checked for residence by telephone and entered in CanReg5. Of 11,600 records gathered in the valley, 2,156 were confirmed as new cancers among residents; 90.5% had a microscopic diagnosis and the mortality-to-incidence ratio was 31%, which the report reads as an under-count of deaths. Rukum's ratio was 43.6%. The registry was set up with the Ministry of Health and Population, WHO and IARC's regional hub at Tata Memorial Hospital, Mumbai. Separately, BP Koirala Memorial Cancer Hospital began a hospital-based cancer registry with other hospitals in 2003, which the national strategy says now covers 12 hospitals. The imPACT reviewers found all registry staff on temporary contracts and asked for the death recording system to include causes of death.",
          links: [
            { label: "NHRC: Cancer Incidence and Mortality in Kathmandu Valley in 2018, executive summary and methods (PDF)", url: KTM_REPORT },
            { label: "NHRC: Cancer Incidence and Mortality in Rukum Districts in 2018 (PDF)", url: RUKUM_REPORT },
            { label: "Subedi et al., cancer in Kathmandu Valley 2018 (JCO Glob Oncol 2021)", url: D_SUBEDI_KTM },
            { label: "IAEA, WHO and IARC: imPACT Review summary report, Nepal (PDF)", url: IMPACT },
          ],
        },
        {
          id: "urban-rural",
          title: "City and countryside differ: breast cancer eight times commoner in Kathmandu, cervical cancer commoner in Rukum",
          plain:
            "Comparing urban Kathmandu Valley with rural Rukum in the first registry year, cancer rates were 1.6 times higher in Kathmandu men and 1.9 times higher in Kathmandu women. Breast cancer was eight times commoner in Kathmandu, while cervical cancer was 30% less common there than in Rukum.",
          detail:
            "The comparison by Subedi and colleagues found lung and stomach cancer the two leading sites in men in both places, with higher rates in Kathmandu, and urinary bladder cancer in men 4.4 times commoner in Kathmandu. Tobacco-related cancers were higher in Kathmandu. In the nine-district data for 2019, tobacco-related cancer incidence was highest in the urban region, 33.6 per 100,000 men and 17.0 per 100,000 women. The authors conclude that cancer control in Nepal needs different priorities for urban and rural regions. Rukum's numbers are small, 87 cancers in a year, and lower rural rates may partly reflect fewer diagnoses: the national strategy notes that most hospitals able to diagnose and treat cancer are in large cities.",
          links: [
            { label: "Subedi et al., urban and rural differences in cancer in Nepal (ecancermedicalscience 2021)", url: D_SUBEDI_RURAL },
            { label: "Kafle Dahal et al., tobacco-related cancers in Nepal 2019 (PLoS One 2024)", url: D_TOBACCO },
            { label: "Nepal Cancer Control Strategy 2024 to 2030, section 3.2 (in Nepali, PDF)", url: NCCS },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: mostly patients, with insurance and a government grant for the poorest",
      aside: { label: "Health Insurance Board: Annual Report 2022/23 factsheet (PDF, Internet Archive)", url: HIB_FACTSHEET_WB },
      cards: [
        {
          id: "insurance",
          title: "National health insurance: NPR 3,500 a year buys a family up to NPR 100,000 of care",
          plain:
            "Nepal's national health insurance covers a family of up to five for a yearly premium of NPR 3,500, with a benefit ceiling of NPR 100,000. That ceiling is small beside the cost of cancer treatment, and most people are not active members: in 2022/23, 16% of the population was actively insured. Patients pay most health costs themselves.",
          detail:
            "The Health Insurance Board's 2022/23 summary gives the terms: NPR 3,500 for up to five members and a ceiling of NPR 100,000, with NPR 700 and NPR 20,000 more for each extra member and a cap of NPR 200,000 per family. By the end of 2022/23, 7,215,098 people (24.7%) had enrolled, but only 4,658,331 (16%) were active that year, and 463 facilities were listed, 378 public. In April 2026 The Himalayan Times, reporting a board report, gave 9,874,415 enrolled since the scheme began, about 5.97 million active, 505 facilities, a projected shortfall of NPR 25.26 billion, premiums covering about 25% of costs, and reforms including a NPR 25,000 ceiling on outpatient care and extra cover of up to NPR 100,000 for eight severe or chronic illnesses. WHO's health expenditure data give out-of-pocket payments as 59.4% of Nepal's current health spending in 2023, and its universal health coverage service index as 58 in 2023. The national strategy, citing National Health Accounts for 2019/20, says cancer treatment took 4.2% of current health spending, about NPR 8.5 billion, and recommends making cancer treatment free or including it in the insurance package.",
          links: [
            { label: "Health Insurance Board: Annual Report 2022/23, factsheet and executive summary (PDF; read through the Internet Archive)", url: HIB_FACTSHEET_WB },
            { label: "The Himalayan Times: Health insurance scheme faces Rs 25.26bn deficit despite rapid growth (10 April 2026)", url: HT_HIB_2026 },
            { label: "WHO Global Health Observatory: out-of-pocket share of current health expenditure, Nepal (API)", url: GHO_OOP },
            { label: "WHO Global Health Observatory: UHC service coverage index, Nepal (API)", url: GHO_UHC },
            { label: "Nepal Cancer Control Strategy 2024 to 2030, sections 1 and 8 (in Nepali, PDF)", url: NCCS },
          ],
        },
        {
          id: "bipanna",
          title: "A grant of NPR 100,000 for poor patients, used by more people with cancer than any other disease",
          plain:
            "Under the government's Impoverished Citizens Treatment programme (Bipanna Nagarik Aushadhi Upachar), poor patients with cancer or seven other serious diseases can receive NPR 100,000 towards treatment. In 2022/23, 16,696 of the 29,215 patients paid were people with cancer.",
          detail:
            "The Health Insurance Board's 2022/23 report lists the eight diseases as cancer, kidney disease, heart disease, spinal injury, head injury, Alzheimer's disease, sickle cell anaemia and Parkinson's disease, and gives 29,215 patients paid a total of about NPR 2.65 billion in 2022/23, cancer being the disease with the most patients (16,696). The programme took 19.85% of the board's spending that year. The national strategy names the programme and the Health Insurance Act 2074 as the main financial relief for cancer patients, and says the support available is not enough for the long-term management of cancer. Among its 2024 to 2026 actions it plans to raise the programme's amount and make treatment free for childhood, cervical and breast cancer, to ensure financial support for poor cancer patients, to explore help with air fares for patients and families who must travel within Nepal for treatment, and to discourage the air fare support currently given for going abroad for cancer diagnosis or treatment. The imPACT reviewers recommended that subsidies be increased and based on patients' needs. OnCo did not read the programme's current directive and could not confirm whether the amount has changed; see the gaps.",
          links: [
            { label: "Health Insurance Board: Annual Report 2022/23, section 10 and factsheet section E (PDF; read through the Internet Archive)", url: HIB_FACTSHEET_WB },
            { label: "Nepal Cancer Control Strategy 2024 to 2030, sections 2 and 8, actions 8.4 and 8.5 (in Nepali, PDF)", url: NCCS },
            { label: "IAEA, WHO and IARC: imPACT Review summary report, Nepal (PDF)", url: IMPACT },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the Department of Drug Administration",
      aside: { label: "DDA: about us (Internet Archive copy)", url: DDA_ABOUT_WB },
      cards: [
        {
          id: "dda",
          title: "A medicines regulator since 1979, for a country that imports its cancer medicines",
          plain:
            "Nepal's Department of Drug Administration registers medicines and inspects factories under the Drugs Act 1978. The imPACT reviewers found that cancer medicines are not made in Nepal and come mainly from India and other countries, and that supply has always been a problem. In 2026 the department issued several notices on the supply of cancer medicines.",
          detail:
            "The department's about page says the Government of Nepal established it in 1979 (1 Kartik 2036 in the Nepali calendar), first under the Ministry of Forest and Soil Conservation and under the Ministry of Health and Population from 2041, to implement the Drugs Act 1978. Its instruments include the Drug Registration Regulation 2038, the Drug Standard Regulation 2043, the National GMP Code 2072, medicine registration guidance of 2073, guidelines for drug donations and the National Drug Policy 1995, and it has regional offices in Biratnagar, Birgunj and Nepalgunj and a National Medicine Laboratory. Its notice board in October 2026 listed notices titled on the availability of medicines used in cancer (Jestha 2083, about June 2026), on submitting details of essential medicines including platinum-group cancer drugs, on the availability of platinum-group medicines (Asar 2083), and on introducing risk-based registration of medicines (Bhadra 2083, about August 2026). Their texts were published as images that OnCo could not retrieve, so their content is not described here. OnCo found no published WHO maturity level for the department.",
          links: [
            { label: "DDA: about us (read through the Internet Archive, June 2025)", url: DDA_ABOUT_WB },
            { label: "DDA: home page and notice board (read through the Internet Archive, October 2026)", url: DDA_HOME_WB },
            { label: "IAEA, WHO and IARC: imPACT Review summary report, Nepal (PDF)", url: IMPACT },
          ],
        },
        {
          id: "medicines-access",
          title: "Families often buy chemotherapy themselves and bring it to the ward",
          plain:
            "Nepali oncologists wrote in 2020 that most hospitals had no oncology pharmacist, and that caregivers usually bought chemotherapy drugs and brought them to the hospital for nurses to prepare. The imPACT reviewers asked for a national list of essential cancer medicines, reviewed regularly, and for oral morphine to be free.",
          detail:
            "Gyawali and colleagues, in their 2020 overview, recommended that insurance funds first support early detection, curative-intent treatment and palliative care, and next cover the cancer drugs on the WHO Essential Medicines List; they described dedicated oncology pharmacists as a missing bridge between oncologists and patients. The imPACT reviewers recommended developing and regularly reviewing a list of essential medicines for cancer therapy and ensuring an adequate supply, examining the supply chain for diagnostic reagents with contingency plans for shortages, and adding oral morphine to the medicines provided free of cost, for adults and children; they estimated that 12,000 people need palliative care for cancer each year, with limited availability of morphine. The national strategy names the availability of cancer medicines, equipment and diagnostic supplies under existing laws and policies as a continuing challenge and asks for simpler processes and coordination between ministries. Through the Global Platform for Access to Childhood Cancer Medicines, Nepal receives 35 childhood cancer medicines free for four years.",
          links: [
            { label: "Gyawali et al., overview of delivery of cancer care in Nepal (JCO Glob Oncol 2020)", url: D_GYAWALI },
            { label: "IAEA, WHO and IARC: imPACT Review summary report, Nepal (PDF)", url: IMPACT },
            { label: "Nepal Cancer Control Strategy 2024 to 2030, section 8 (in Nepali, PDF)", url: NCCS },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "Nepal Cancer Control Strategy 2024 to 2030 (in Nepali, PDF)", url: NCCS },
      cards: [
        {
          id: "cervical-screening",
          title: "No organised screening programme; cervical screening is free but few women have had it",
          plain:
            "Nepal has no organised population screening for any cancer. Cervical screening, mostly by visual inspection with vinegar (VIA), is offered in camps and some facilities, and the Public Health Service Regulation 2077 makes early screening and counselling for cervical and breast cancer free. In a 2019 survey, 8.2% of women aged 30 to 49 had ever been screened.",
          detail:
            "The national strategy records that a cervical screening programme drafted in 2010 aimed to screen 50% of women aged 30 to 65 within five years, but the WHO STEPS survey of 2019 found low awareness of cervical cancer (6%) and that 8.2% of women aged 30 to 49 had ever been screened; only 63% of those who needed treatment after a result received it, and 50% were followed up. It cites a demographic health survey figure of 22% for VIA screening coverage, and notes that positivity rates and stages are not published. Pap smears are mainly available to women attending specialised hospitals. For breast cancer, fewer than 20% of women know the signs, there is no population screening and mammography for it is judged neither feasible nor cost-effective, so clinical breast examination is done opportunistically and in camps run by specialised cancer centres, which reach mainly the districts near those centres. The imPACT reviewers advised that, for Nepal, early diagnosis of common cancers is recommended over population screening programmes, with awareness raising for cervical and oral cancer and community health workers teaching the signs of breast cancer. For lung cancer the strategy notes there is no formal screening programme.",
          links: [
            { label: "Nepal Cancer Control Strategy 2024 to 2030, sections 2 and 3.2 (in Nepali, PDF)", url: NCCS },
            { label: "IAEA, WHO and IARC: imPACT Review summary report, Nepal, early detection (PDF)", url: IMPACT },
          ],
        },
        {
          id: "hpv-tobacco",
          title: "HPV vaccine for girls nationwide from 2025, reaching 94% of the target in its first campaign",
          plain:
            "Nepal piloted HPV vaccination in Chitwan and Kaski in 2016 and, according to WHO's immunisation data, introduced it nationwide in February 2025 with a single dose for girls aged 10 to 14. WHO's coverage rows record 94% of 1,562,631 targeted girls vaccinated in 2025. Tobacco is the other large preventable cause.",
          detail:
            "The strategy describes the 2016 pilot in Chitwan and Kaski districts, which gave two doses to girls aged 11 to 13 through routine immunisation. WHO's vaccine introduction records say HPV vaccine was introduced in February 2025, nationwide, after a planned introduction of December 2024 was moved; the schedule reported for 2025 is one dose at age 10, with a nationwide multi-age campaign for schoolgirls in grades 6 to 10 and out-of-school girls aged 10 to 14. WHO's programme coverage rows for 2025 give 94% first-dose and last-dose coverage of a target of 1,562,631 girls, with 1,461,654 doses given; no coverage is reported for earlier years. Hepatitis B vaccine is part of the national immunisation programme. On tobacco, the strategy cites GLOBOCAN 2020 for 23.7% of cancer deaths in Nepal being caused by tobacco and the 2019 STEPS survey for 28.9% of adults using tobacco and 17.1% smoking; Nepal became party to the WHO Framework Convention on Tobacco Control in February 2007 and passed its Tobacco Products (Control and Regulation) Act in 2068 in the Nepali calendar.",
          links: [
            { label: "WHO immunisation data: HPV vaccine introduction, Nepal (API)", url: WHO_HPV_INTRO_API },
            { label: "WHO immunisation data: HPV programme coverage rows for Nepal (API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: vaccination schedule rows for Nepal, 2025 (API)", url: WHO_HPV_SCHEDULE_API },
            { label: "Nepal Cancer Control Strategy 2024 to 2030, section 3.1 (in Nepali, PDF)", url: NCCS },
          ],
        },
      ],
    },
    {
      id: "radiotherapy",
      nav: "Radiotherapy",
      title: "Radiotherapy and the cancer workforce",
      aside: { label: "Nepal Cancer Control Strategy 2024 to 2030, section 3.3 (in Nepali, PDF)", url: NCCS },
      cards: [
        {
          id: "rt-capacity",
          title: "About ten radiotherapy machines against a need of about 30",
          plain:
            "The national strategy says Nepal needs about 30 radiotherapy machines for its cancer burden but has only about ten, at two government hospitals and four private centres. Waits are long, and a department with a single machine stops treating when it breaks down. Advanced techniques exist in private hospitals but are expensive.",
          detail:
            "The strategy states that 50 to 70% of people with cancer will need radiotherapy at some point, that external beam capacity falls far short, and that the country needs about 30 radiotherapy units but has ten. It recommends at least two units in every radiotherapy centre, or close coordination between nearby centres, because a single-machine department halts treatment when the machine fails. Brachytherapy, essential for cervical cancer, is available on three HDR machines in government hospitals and four in the private sector. Private hospitals offer VMAT, SRT and SBRT, which the strategy says are very expensive and beyond most people's means. It records plans to restart radiotherapy at the National Academy of Medical Sciences (Bir Hospital) and to start it at Civil Hospital in Kathmandu and at Sushil Koirala Prakhar Hospital in Nepalgunj. Gyawali and colleagues counted 2 cobalt units and 6 linear accelerators working in 2020. The imPACT reviewers found no incident reporting in radiotherapy and asked for a national radiotherapy plan with an equipment replacement programme, and for both external beam and brachytherapy for cervical cancer.",
          links: [
            { label: "Nepal Cancer Control Strategy 2024 to 2030, section 3.3.3 (in Nepali, PDF)", url: NCCS },
            { label: "IAEA, WHO and IARC: imPACT Review summary report, Nepal, radiation oncology (PDF)", url: IMPACT },
            { label: "Gyawali et al., overview of delivery of cancer care in Nepal (JCO Glob Oncol 2020)", url: D_GYAWALI },
          ],
        },
        {
          id: "workforce",
          title: "48 radiation oncologists, 20 medical oncologists and 18 medical physicists",
          plain:
            "The national strategy counts 48 radiation oncologists, 20 medical oncologists, 50 surgical oncologists and 18 medical physicists working in Nepal. Training began at home only recently: radiation oncology residency in 2002 and medical oncology in 2016, each producing about two specialists a year. Keeping trained staff in government hospitals is hard.",
          detail:
            "The strategy's workforce figures sit beside earlier counts by Gyawali and colleagues for 2018: 35 radiation oncologists, 27 medical oncologists and 10 paediatric oncologists, and, at the time they wrote in 2020, about 40 surgical oncologists and about 20 gynaecological oncologists. The two sources count differently, and the medical oncologist figures do not agree; both are given. Because formal medical oncology training began only in 2016 at the National Academy of Medical Sciences, most radiation oncologists also give chemotherapy, and most medical oncologists trained abroad. A gynaecological oncology fellowship of the International Gynecologic Cancer Society began at Civil Service Hospital in 2019. The strategy says posting trained staff in government hospitals is a further challenge that affects continuity of services, that there are too few pathologists even in specialised centres, and that engineers to repair equipment often have to be brought from abroad, prolonging downtime. The imPACT reviewers recommended training more medical and surgical oncologists through national high-volume centres and fellowships abroad.",
          links: [
            { label: "Nepal Cancer Control Strategy 2024 to 2030, sections 3.3.1 to 3.3.2 (in Nepali, PDF)", url: NCCS },
            { label: "Gyawali et al., overview of delivery of cancer care in Nepal (JCO Glob Oncol 2020)", url: D_GYAWALI },
            { label: "IAEA, WHO and IARC: imPACT Review summary report, Nepal (PDF)", url: IMPACT },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Nepal does",
      title: "What Nepal does differently",
      cards: [
        {
          id: "childhood-medicines",
          title: "Free childhood cancer medicines through a WHO and St. Jude platform",
          plain:
            "In March 2024 Nepal became one of six countries in the world, and the only one in WHO's South-East Asia Region, to join the Global Platform for Access to Childhood Cancer Medicines. It receives 35 types of childhood cancer medicines free for four years, given at four government hospitals to start with.",
          detail:
            "WHO Nepal's announcement of 27 March 2024 says the Ministry of Health and Population signed an agreement with WHO to join the platform, an initiative of St. Jude Global and WHO, with UNICEF procuring the medicines and WHO supporting the supply chain. The first batch was expected in the third quarter of 2024, for Bhaktapur Cancer Hospital, BP Koirala Memorial Cancer Hospital, Kanti Children's Hospital and Patan Hospital, with later expansion to shared care centres as needed. WHO estimated that about 900 children are diagnosed with cancer in Nepal each year and that only about a third receive treatment. Nepal became a focus country of WHO's Global Initiative for Childhood Cancer in 2020, which aims for at least 60% survival for children with cancer by 2030; the imPACT reviewers asked for a paediatric haemato-oncology committee, national treatment guidelines and help with families' travel and accommodation costs. The national strategy plans free treatment for childhood cancer through the impoverished citizens' programme.",
          links: [
            { label: "WHO Nepal: Nepal joins the Global Platform for Access to Childhood Cancer Medicines (27 March 2024)", url: WHO_GPACCM },
            { label: "IAEA, WHO and IARC: imPACT Review summary report, Nepal, childhood cancer (PDF)", url: IMPACT },
            { label: "Nepal Cancer Control Strategy 2024 to 2030, action 8.5 (in Nepali, PDF)", url: NCCS },
          ],
        },
        {
          id: "strategy-2024",
          title: "A national cancer strategy built on an international review",
          plain:
            "Nepal asked the IAEA, WHO and IARC to review its cancer services in 2020. Their main recommendation was a national cancer control plan, and the Nepal Cancer Control Strategy 2024 to 2030 followed, approved in mid-2024. It sets nine strategies, from prevention to rehabilitation, and plans a cancer division in the Ministry and a national committee.",
          detail:
            "The imPACT Review, requested by the Ministry of Health and Population in June 2020 and carried out from November 2020 to March 2021, recommended a national cancer control plan with a steering committee, SMART indicators and a resource mobilisation strategy. In May 2024 the Ministry and WHO's country office held a session with the IAEA, IARC, St. Jude, Tata Memorial Hospital and King's College Hospital to review progress, discussing cancer registries, networking between hospitals and a National Cancer Grid. The strategy, approved by a ministerial decision dated Asar 31, 2081 in the Nepali calendar (mid-July 2024), has nine strategies: health promotion and prevention; early detection; diagnosis, treatment and palliative care; infrastructure; workforce; multisectoral collaboration; monitoring, surveillance and research; governance and financing; and supportive and rehabilitative care. It plans a cancer prevention and control division in the Ministry, a National Cancer Control Committee including civil society and people with lived experience meeting at least twice a year, annual implementation reports, a mid-term review in 2027 and a final review in 2029 to 2030, and a costed monitoring framework, which OnCo did not find published.",
          links: [
            { label: "Nepal Cancer Control Strategy 2024 to 2030, sections 7 and 9 (in Nepali, PDF)", url: NCCS },
            { label: "ICCP: Nepal Cancer Control Strategy 2024 to 2030", url: NCCS_NEWS },
            { label: "IAEA, WHO and IARC: imPACT Review summary report, Nepal (PDF)", url: IMPACT },
            { label: "WHO Nepal: follow-up of the 2021 imPACT Review recommendations (13 May 2024)", url: WHO_IMPACT_FOLLOWUP },
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
          title: "No trial in OnCo's records has a site in Nepal",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, none of the cancer trials in our records lists a site in Nepal. The Nepali research on this page is registry work by the Nepal Health Research Council and a review of cancer care by Nepali oncologists.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 0 trials list Nepal among their countries. That reflects the trials OnCo holds, mostly large industry and academic trials of new medicines, not every study in Nepal; the ClinicalTrials.gov search linked below shows the cancer studies registered with a site there. The registry papers on this page were written by Nepal Health Research Council staff with oncologists from Bir Hospital and colleagues at IARC's regional hub at Tata Memorial Hospital, Mumbai, and the council's Ethical Review Board approved the 2019 registry analysis. The national strategy's seventh strategy covers monitoring, surveillance and research, and lists laboratory, epidemiological, clinical, psychosocial and health system research as priority areas, following WHO. Gyawali and colleagues, writing in 2020, set out a research and policy agenda they called a cancer groundshot for Nepal: a population-based registry, health insurance, workforce, infrastructure and priority cancer medicines.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Nepal (search)", url: CTGOV },
            { label: "Dahal et al., cancer risk in Nepal from the population-based registries, 2019 (J Cancer Epidemiol 2024)", url: D_DAHAL },
            { label: "Gyawali et al., overview of delivery of cancer care in Nepal (JCO Glob Oncol 2020)", url: D_GYAWALI },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "bipanna-directive",
      title: "The current impoverished citizens' treatment directive was not read",
      plain:
        "The NPR 100,000 grant and its eight diseases are taken from the Health Insurance Board's 2022/23 report. OnCo did not read the Ministry's current directive for the programme, so whether the amount, the diseases or the application steps have changed since then is not confirmed here.",
      detail:
        "A directive for the programme dated 2080 in the Nepali calendar is catalogued in the Nepal Health Research Council's library as a large scanned file and was not read. The national strategy plans to raise the amount and to make some cancers free; OnCo found no official announcement that this has happened. Newspaper reports of a proposed increase were not used. The board's report gives two slightly different totals for payments in 2022/23 (NPR 2,645,664,561 in the factsheet and 2,645,564,561 in the summary), so the page rounds to about NPR 2.65 billion. Ask the hospital's social service unit or the ward office what applies now.",
      links: [
        { label: "Health Insurance Board: Annual Report 2022/23, factsheet and executive summary (PDF; read through the Internet Archive)", url: HIB_FACTSHEET_WB },
        { label: "Nepal Cancer Control Strategy 2024 to 2030, actions 8.4 and 8.5 (in Nepali, PDF)", url: NCCS },
      ],
    },
    {
      id: "dda-texts",
      title: "The regulator's 2026 notices on cancer medicines, and its registration times, could not be read",
      plain:
        "The Department of Drug Administration's website did not answer a plain request, and its 2026 notices on cancer medicine supply and on risk-based registration were published as images that the Internet Archive had not kept. OnCo found no published registration times and no WHO maturity level for the department.",
      detail:
        "Only the titles and Nepali-calendar dates of the notices were read, from the Internet Archive's copy of the notice board of 12 October 2026. The same header names the department's parent ministry differently from the Ministry of Health and Population named in the 2024 strategy; OnCo has not confirmed whether the ministry has been renamed and uses the strategy's name. Nepal's national list of essential medicines, which the department's site links, was not read, so the page does not say which cancer medicines are on it. Whether a medicine is registered in Nepal, stocked, and paid for by insurance or the impoverished citizens' programme are separate questions this page cannot answer medicine by medicine.",
      links: [
        { label: "DDA: home page and notice board (read through the Internet Archive, October 2026)", url: DDA_HOME_WB },
        { label: "DDA: about us (read through the Internet Archive, June 2025)", url: DDA_ABOUT_WB },
      ],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Some figures a reader would want are not here: the full imPACT Review report with its counts of machines and staff, the Madhesh registry's own report, registry data after 2019, survival after a cancer diagnosis in Nepal, and the insurance benefit package's rules for cancer care.",
      detail:
        "Only the IAEA's summary of the imPACT Review was read; the full report was not found. The Madhesh registry (Siraha, Saptari, Dhanusha, Mahottari) is described in the strategy and the registry papers, but its own report was not read, and no registry year after 2019 was found published. No population-based survival figures for Nepal were found. The Health Insurance Board's benefit package files for 2081 exist in the Internet Archive but were not read, so the page does not say which cancer treatments insurance pays for. The Himalayan Times figures for 2026 are a newspaper's report of a board report that OnCo did not read directly. BP Koirala Memorial Cancer Hospital's own website did not answer and was read from an archived copy of August 2025. The national strategy is in Nepali; figures were read from its text and are translated here.",
      links: [
        { label: "IAEA, WHO and IARC: imPACT Review summary report, Nepal (PDF)", url: IMPACT },
        { label: "IARC: GLOBOCAN 2024 fact sheet, Nepal (PDF)", url: IARC_FACTSHEET },
      ],
    },
  ],
  institutions: [
    "nepal-ministry-of-health-and-population", "nhrc-nepal", "nepal-population-based-cancer-registry", "health-insurance-board-nepal", "dda-nepal",
    "bp-koirala-memorial-cancer-hospital", "iaea", "iarc", "who", "st-jude", "tata-memorial", "tata-medical-center-kolkata",
  ],
  companies: [],
  drugs: ["cisplatin", "carboplatin", "oxaliplatin"],
  trials: [],
  papers: [
    "paper-subedi-kathmandu-valley-pbcr-2018-jgo-2021", "paper-subedi-urban-rural-nepal-pbcr-ecancer-2021", "paper-dahal-nepal-pbcr-cancer-risk-jce-2024",
    "paper-kafle-dahal-tobacco-cancers-nepal-plosone-2024", "paper-gyawali-cancer-care-delivery-nepal-jgo-2020",
  ],
  people: [],
  how:
    "Every card was written from Nepali official sources and international reviews, read in full rather than through a summary: the Ministry of Health and Population's Nepal Cancer Control Strategy 2024 to 2030, read in Nepali; the IAEA, WHO and IARC imPACT Review summary report; the Nepal Health Research Council's registry reports for Kathmandu Valley and Rukum; the Health Insurance Board's 2022/23 report and a Himalayan Times report of its 2026 figures; the Department of Drug Administration's pages and BP Koirala Memorial Cancer Hospital's page, both through the Internet Archive; WHO Nepal's news pages; WHO's immunisation and health expenditure data; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the Ministry, NHRC, the registry, the insurer, the regulator, BP Koirala Memorial Cancer Hospital and five papers) carry their own sources. Tata Medical Center in Kolkata is listed because its OnCo record describes it as serving eastern India, Bangladesh and Nepal.",
  verify:
    "National incidence and death figures are IARC estimates built on neighbouring countries' data, not a national count, and Nepal's own registries cover nine districts. Which hospitals give radiotherapy, which medicines are in stock, what insurance pays and the amount of the impoverished citizens' grant change faster than published reports; ask the treating hospital's oncology department, its social service unit or your ward office what applies to you. HPV vaccination is given through schools and health facilities, so ask the local health post about catch-up for girls who missed it.",
  verifyLinks: [
    { label: "Ministry of Health and Population, Nepal", url: "https://mohp.gov.np" },
    { label: "Health Insurance Board, Nepal", url: "https://hib.gov.np" },
    { label: "Department of Drug Administration, Nepal", url: "https://www.dda.gov.np" },
    { label: "Nepal Cancer Control Strategy 2024 to 2030 (in Nepali, PDF)", url: NCCS },
  ],
};

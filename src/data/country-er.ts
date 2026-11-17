import type { CountryDive } from "@/data/country-dive";

/**
 * Eritrea deep dive: the hand-written cards for /countries/er/ (wave 14). Eritrea publishes little about its cancer
 * services, and its Ministry of Health's site (moh.gov.er) did not resolve on 16 November 2026, so this page is built
 * on international sources, the ministry's own non-communicable disease documents as posted on the ICCP portal, six
 * papers by staff of the National Health Laboratory in Asmara, and the German charity that supports the children's
 * cancer unit. Every figure was read from the raw text of its source on 16 November 2026, not from a summary of it:
 * IARC's GLOBOCAN 2024 fact sheet, WHO's Cancer Country Profile 2020 and cervical cancer profile 2021 (PDF text), the
 * ministry's National Multi-Sectoral Strategic Plan for Non-Communicable Diseases 2019 to 2023 (August 2018) and its
 * Non-Communicable Diseases Policy (May 2008), both PDF text from the ICCP portal, the six papers (resolved by DOI
 * through Europe PMC, abstracts and open full text), Gavi's VaccinesWork article of 13 March 2023, Archemed's news page
 * of 31 March 2025 and its mission report of August 2024 (PDF text, in German), the GIZ hospital partnerships project
 * page, WHO Africa's news page of 31 July 2019 on the medicines regulator, a 2021 paper by the regulator's staff, a
 * 2019 paper on radiotherapy in Addis Ababa, the World Bank's health expenditure series from its API, WHO's
 * immunisation data API, IAEA DIRAC's public equipment data and ClinicalTrials.gov's API. Sources not found, blocked
 * or not read are under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/232-eritrea-fact-sheet.pdf";
const WHO_PROFILE = "https://www.iccp-portal.org/sites/default/files/plans/ERI_2020.pdf";
const WHO_CX = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-eri-2021-country-profile-en.pdf";
const NCD_PLAN = "https://www.iccp-portal.org/sites/default/files/plans/ERI_B3_NATIONAL%20MULTI-SECTORAL%20STRATEGIC%20PLAN%20FOR%20NON-COMMUNICABLE%20DISEASES%20%28NCDs%29%202019-2023.pdf";
const NCD_POLICY = "https://www.iccp-portal.org/sites/default/files/plans/ERI_B3_NCD%20POLICY%20FOR%20ERITREA.pdf";
const GAVI = "https://www.gavi.org/vaccineswork/eritrea-touts-screening-and-hpv-vaccines-drive-down-cervical-cancer-rates";
const ARCHEMED = "https://www.archemed.org/news/children-with-cancer-are-given-a-chance-at-life/?lang=en";
const ARCHEMED_2024 = "https://www.archemed.org/wp-content/uploads/2024/12/Eritrea2024_Report_Kinderonkologie.pdf";
const GIZ = "https://hospitalpartnerships.org/projects/erichildcan-kinderonkologie-diagnostik-und-therapie-von-krebserkrankungen-im-kindesalter";
const AFRO_DEVICES = "https://www.afro.who.int/countries/eritrea/news/eritrea-consensus-building-workshop-medical-devices-registration-guideline";
const WHO_LEGISLATION = "https://extranet.who.int/cpcd/health-legislation/countries/eri/legislative-instruments";
const WB_OOP = "https://api.worldbank.org/v2/country/ERI/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_CHE = "https://api.worldbank.org/v2/country/ERI/indicator/SH.XPD.CHEX.PC.CD?format=json";
const WB_EXT = "https://api.worldbank.org/v2/country/ERI/indicator/SH.XPD.EHEX.CH.ZS?format=json";
const WB_GOV = "https://api.worldbank.org/v2/country/ERI/indicator/SH.XPD.GHED.CH.ZS?format=json";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'ERI'%20and%20contains(ANTIGEN,'HPV')";
const WHO_HPV_COV = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'ERI'%20and%20contains(ANTIGEN,'HPV')";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const CTGOV = "https://clinicaltrials.gov/search?country=Eritrea&cond=cancer";
const AFCRN = "https://afcrn.org/index.php/membership/membership-list";
const doi = (id: string) => `https://doi.org/${id}`;

const L_IARC = { label: "IARC: GLOBOCAN 2024 fact sheet, Eritrea (PDF)", url: IARC_FACTSHEET };
const L_WHO = { label: "WHO: Cancer Country Profile 2020, Eritrea (PDF via ICCP)", url: WHO_PROFILE };
const L_CX = { label: "WHO: cervical cancer country profile 2021, Eritrea (PDF)", url: WHO_CX };
const L_PLAN = { label: "Ministry of Health, Eritrea: National Multi-Sectoral Strategic Plan for Non-Communicable Diseases 2019 to 2023 (August 2018, PDF via ICCP)", url: NCD_PLAN };
const L_POLICY = { label: "Ministry of Health, Eritrea: Non-Communicable Diseases Policy (May 2008, PDF via ICCP)", url: NCD_POLICY };
const L_GAVI = { label: "Gavi VaccinesWork: Eritrea touts screening and HPV vaccines to drive down cervical cancer rates (13 March 2023)", url: GAVI };
const L_ARCHEMED = { label: "Archemed: children with cancer are given a chance at life (31 March 2025)", url: ARCHEMED };
const L_ARCHEMED_2024 = { label: "Archemed: report of the Eritrean childhood cancer programme mission, 14 to 25 August 2024 (PDF, in German)", url: ARCHEMED_2024 };
const L_GIZ = { label: "GIZ hospital partnerships: EriChildCan, paediatric oncology in Eritrea (project of 2020 to 2022)", url: GIZ };
const L_DIRAC = { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC };
const L_GYN = { label: "Medhin et al., cervical, ovarian and uterine cancer in Eritrea (Sci Rep 2020)", url: doi("10.1038/s41598-020-66096-5") };
const L_BREAST = { label: "Medhin et al., breast cancer in Eritrea 2011 to 2017 (Int J Breast Cancer 2019)", url: doi("10.1155/2019/8536548") };
const L_PROSTATE = { label: "Medhin et al., prostate cancer in Eritrea 2011 to 2018 (PLoS One 2020)", url: doi("10.1371/journal.pone.0232091") };
const L_CRC = { label: "Medhin et al., colorectal cancer in Eritrea 2011 to 2017 (PLoS One 2019)", url: doi("10.1371/journal.pone.0224045") };
const L_LEUK = { label: "Abraha et al., leukaemia in Eritrea 2010 to 2020 (Cancer Rep 2025)", url: doi("10.1002/cnr2.70203") };
const L_OES = { label: "Mengistu et al., oesophageal cancer in Eritrea 2011 to 2021 (J Cancer Epidemiol 2024)", url: doi("10.1155/2024/5566016") };
const L_SAMJ = { label: "Tesfamariam et al., breast cancer presentation and management in Eritrea (S Afr Med J 2013)", url: doi("10.7196/samj.6829") };
const L_ETH_RT = { label: "Rick et al., patterns of care of cancers and radiotherapy in Ethiopia (J Glob Oncol 2019)", url: doi("10.1200/JGO.19.00129") };
const L_PV = { label: "Russom et al., the Eritrean pharmacovigilance system (Drug Saf 2021)", url: doi("10.1007/s40264-021-01102-x") };
const L_AFRO = { label: "WHO Regional Office for Africa: consensus building workshop on the medical devices registration guideline (31 July 2019)", url: AFRO_DEVICES };

export const ER_DIVE: CountryDive = {
  iso2: "ER",
  iso3: "ERI",
  name: "Eritrea",
  flag: "🇪🇷",
  asOf: "2026-11-16",
  title: "Cancer in Eritrea",
  description:
    "Cancer in Eritrea from international sources, the health ministry's own documents and papers by its laboratory staff: IARC's estimate of 2,689 new cancers and 1,703 deaths in 2024, modelled from neighbouring countries' rates, breast and cervical cancer leading; a National Health Laboratory that its staff describe as the country's only pathology laboratory, whose records are the nearest thing to a cancer count; HPV vaccination since November 2022, reaching 83% of girls by age 15 in 2025; a children's cancer unit opened at Orotta hospital in Asmara in February 2025; no radiotherapy centre in IAEA's directory; health spending of about USD 28 a person, 48% of it out of pocket; and no trial in OnCo's records with a site in the country.",
  lede:
    "Eritrea has vaccinated girls against HPV nationwide since November 2022, and WHO's data show 83% of girls had a first dose by age 15 in 2025. A children's cancer unit opened at Orotta hospital in Asmara in February 2025, and staff of the National Health Laboratory there described it in 2020 as the referral laboratory for all hospitals in the country. WHO's 2021 profile recorded no population-based cancer registry, and IARC's figures for Eritrea are modelled from its neighbours' rates.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Eritrea is 2,689 new cancers and 1,703 deaths, an age-standardised incidence of 111.5 per 100,000 (100.3 in men, 122.9 in women). These are modelled figures, not counts. IARC's fact sheet names no country-specific source for incidence and gives its method as rates based on incidence estimates or registry data from neighbouring countries; mortality is national incidence estimates applied to modelled mortality-to-incidence ratios built on registry survival data. WHO's 2020 profile adds that the estimates have a high degree of uncertainty because they are not based on a population-based cancer registry or on national mortality data.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Eritrea",
      aside: L_IARC,
      cards: [
        {
          id: "shape",
          title: "About 2,700 new cancers a year in IARC's estimate, built from neighbouring countries' rates",
          plain:
            "IARC estimates 2,689 new cancers in Eritrea in 2024, 1,612 of them in women, and 1,703 cancer deaths. By new cases, breast cancer is the commonest, then cervical, prostate, colorectal and liver cancer; the order for deaths is different and is given below. The figures are modelled from neighbouring countries, not counted in Eritrea.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 596 breast cancers (279 deaths), 199 cervical cancers (125 deaths), 184 prostate cancers (116 deaths), 161 colorectal cancers (88 deaths) and 129 liver cancers (121 deaths), in a population of 3.5 million; leukaemia also accounts for 129 cases. Breast cancer is the commonest cause of cancer death, followed by cervical and liver cancer. The age-standardised mortality rate is 73.2 per 100,000, the risk of developing a cancer before age 75 is 11.9%, and an estimated 4,679 people are living within five years of a diagnosis. The fact sheet's methods box gives the incidence method as rates based on incidence estimates or registry data from neighbouring countries. WHO's 2020 profile estimated 196 cancers a year in children aged 0 to 14.",
          links: [L_IARC, L_WHO],
        },
        {
          id: "registry",
          title: "No cancer registry in WHO's 2021 profile; one laboratory's records are the nearest thing to a count",
          plain:
            "WHO's 2021 cervical cancer profile records that no population-based cancer registry exists in Eritrea. Staff of the National Health Laboratory in Asmara, which they describe as the country's only histopathology laboratory, have published its counts of cancers for 2010 to 2021.",
          detail:
            "A 2020 paper by the laboratory's pathology staff says it serves as a referral facility for all hospitals in Eritrea and has the only histopathology and cytology laboratory in the country. From its records the authors report 348 breast cancers and 269 cancers of the cervix, ovary and uterus in 2011 to 2017, 94 colorectal cancers in the same years, 128 prostate cancers in 2011 to 2018 (with two hospitals' urology departments; the paper gives 36.7% of them as verified under the microscope, the rest diagnosed clinically), 372 leukaemias in 2010 to 2020 (with Orotta hospital) and 155 oesophageal cancers in 2011 to 2021. These numbers are far below IARC's modelled estimates, and the authors say they may undercount: the 2020 paper notes that relying on cases verified under the microscope may lead to underestimation. Several of the papers call for a population-based cancer registry. The African Cancer Registry Network's member list, read on 16 November 2026, names no registry in Eritrea. The health ministry's plan of August 2018 also charts cancer cases reported by health facilities, 575 in 2016.",
          links: [L_CX, L_GYN, L_BREAST, L_CRC, L_PROSTATE, L_LEUK, L_OES, L_PLAN, { label: "African Cancer Registry Network: member registries", url: AFCRN }],
        },
      ],
      tables: [
        {
          id: "er-globocan-sites",
          title: "The five commonest cancers in Eritrea, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024, modelled from neighbouring countries' rates.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 596, deaths: 279 },
            { site: "Cervix uteri", cases: 199, deaths: 125 },
            { site: "Prostate", cases: 184, deaths: 116 },
            { site: "Colorectum", cases: 161, deaths: 88 },
            { site: "Liver", cases: 129, deaths: 121 },
          ],
          note: "Leukaemia has the same estimated number of new cases as liver cancer, 129, with 88 deaths. These are estimates; WHO's 2020 profile described the incidence and mortality estimates for Eritrea as having a high degree of uncertainty.",
          sources: [L_IARC],
        },
        {
          id: "er-laboratory-counts",
          title: "Cancers in Eritrea's laboratory records, as published by the laboratory's staff",
          caption: "Counts of cancers recorded at the National Health Laboratory in Asmara (with hospital records where noted) over each study's whole period. They are not yearly figures and not a registry. The prostate count includes cancers diagnosed clinically: the paper gives 36.7% as verified under the microscope.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "period", label: "Years" },
            { key: "cases", label: "Cancers recorded", numeric: true },
          ],
          rows: [
            { site: "Breast", period: "2011 to 2017", cases: 348 },
            { site: "Cervix, ovary and uterus", period: "2011 to 2017", cases: 269 },
            { site: "Colorectum", period: "2011 to 2017", cases: 94 },
            { site: "Prostate (with Orotta and Sembel hospitals)", period: "2011 to 2018", cases: 128 },
            { site: "Leukaemia (with Orotta hospital)", period: "2010 to 2020", cases: 372 },
            { site: "Oesophagus", period: "2011 to 2021", cases: 155 },
          ],
          note: "The authors of these papers say their counts may be too low. The 2020 gynaecological cancer paper gives reliance on cases verified under the microscope as one reason, and the prostate paper says a small fraction of cases were referred for pathology.",
          sources: [L_BREAST, L_GYN, L_CRC, L_PROSTATE, L_LEUK, L_OES],
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
          title: "About USD 28 a person on health in 2023, 48% of it paid out of pocket",
          plain:
            "Eritrea spent about 28 US dollars a person on health in 2023. Households paid 48% of it out of pocket, external funders 28% and the government 23% from its own revenue, according to the World Bank's series from WHO's health expenditure database. OnCo did not find a source on who pays for cancer treatment.",
          detail:
            "The World Bank's series gives current health spending of USD 27.59 per person in 2021, 27.09 in 2022 and 28.30 in 2023, and out-of-pocket spending of 49.7%, 54.3% and 48.4% of current health spending in those years. In 2023 external health expenditure was 28.5% and government spending from domestic sources 23.1%. The health ministry's Non-Communicable Diseases Policy of May 2008 said health services were provided for nominal fees and that medicines for hypertension, diabetes and mental disorders were free to patients; it did not say the same of cancer medicines. In Gavi's article of March 2023 an official the article names as Head of Family and Community Health is quoted as saying the cervical screening fee is highly subsidised and HPV vaccination for girls is free. OnCo found no health insurance scheme and no statement of what a person with cancer pays.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Eritrea (API)", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Eritrea (API)", url: WB_CHE },
            { label: "World Bank: external health expenditure, Eritrea (API)", url: WB_EXT },
            { label: "World Bank: domestic general government health expenditure, Eritrea (API)", url: WB_GOV },
            L_POLICY,
            L_GAVI,
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
          id: "nmfa",
          title: "The National Medicines and Food Administration, a unit of the health ministry",
          plain:
            "WHO's Regional Office for Africa in 2019 named the National Medicines and Food Administration as the unit that receives registration dossiers for medical devices in Eritrea, and a 2021 paper by its staff, who give it as part of the Ministry of Health, says it recalls substandard or falsified medical products. OnCo found no website for it and no published rules on how a cancer medicine is registered or how a clinical trial is authorised.",
          detail:
            "WHO's Regional Office for Africa, reporting a workshop held in June 2019, describes the administration as the unit to which applicants submit product dossiers for registration before any procurement. A 2021 paper by its own staff says the Eritrean Pharmacovigilance Centre's monitoring found about 55 substandard or falsified medical products, which the administration recalled, and that the centre had reached maturity level three on a WHO rapid benchmarking assessment; that is the authors' statement about the monitoring of medicine safety, not about the regulator as a whole. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include Eritrea, and the African Union's list of 19 September 2023 records neither a signature nor a ratification of the African Medicines Agency treaty by Eritrea. WHO's legislation database lists Proclamation No 36/1993, to control drugs, medical supplies and sanitary items; OnCo has not read its text. Papers from the National Health Laboratory report approval by the ministry's Health Research Ethics and Protocol Review Committee.",
          links: [
            L_AFRO,
            L_PV,
            { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML3 },
            { label: "African Union: signatures and ratifications of the African Medicines Agency treaty (19 September 2023, PDF)", url: AMA },
            { label: "WHO Country Planning Cycle Database: Eritrea, main legislative instruments", url: WHO_LEGISLATION },
            L_GYN,
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: L_CX,
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination nationwide since 2022: 83% of girls had a first dose by age 15 in 2025",
          plain:
            "WHO's immunisation database records the HPV vaccine as introduced nationwide in Eritrea in 2022. In 2025, 83% of girls had received a first dose by age 15 and 78% a last dose. The vaccine is free for girls, according to an official quoted by Gavi in March 2023.",
          detail:
            "WHO's immunisation data API, queried on 16 November 2026, lists the vaccine as not introduced up to 2021 and introduced nationwide from 2022. Coverage by age 15 among girls was 86% for the first dose in 2023, 88% in 2024 and 83% in 2025; for the last dose it was 84%, 84% and 78%. Programme coverage for the first dose was 86% in 2022 (224,764 doses against a target of 262,596 girls), 34% in 2023, 68% in 2024 and 49% in 2025; the target group in WHO's rows fell from 262,596 girls in 2022 to 50,258 in 2025. Gavi's article of March 2023 says the health ministry launched the programme in November 2022, aimed at about 300,000 girls, reaching three quarters of them in 1,382 schools and the rest through 250 temporary centres and 60 mobile facilities, and that the vaccine was to become part of routine immunisation from May 2023. WHO's 2021 profile, written before this, records the vaccine as not in the national schedule.",
          links: [
            { label: "WHO immunisation data: HPV vaccination coverage, Eritrea (API)", url: WHO_HPV_COV },
            { label: "WHO immunisation data: HPV vaccine introduction, Eritrea (API)", url: WHO_HPV_INTRO },
            L_GAVI,
            L_CX,
          ],
        },
        {
          id: "cervical",
          title: "No national screening programme in WHO's 2021 profile; an official told Gavi in 2023 the screening fee is highly subsidised",
          plain:
            "WHO's 2021 profile recorded no national cervical screening programme in Eritrea, and 8% of women aged 30 to 49 screened in the previous five years (2019). WHO's 2020 profile recorded no breast screening programme. Gavi's article of March 2023 reported health workers saying few women have regular Pap smears, and quoted an official saying the screening fee is highly subsidised.",
          detail:
            "WHO's 2021 cervical cancer profile gives 10% of women aged 30 to 49 as ever screened (2019), and records no national guidelines on cervical cancer management and no programme to strengthen early detection of first symptoms in primary care. Gavi's article of March 2023 reports health workers on the island of Desie explaining Pap smear tests to mothers, and says there are few testing sites and little awareness of screening. The health ministry's plan for non-communicable diseases for 2019 to 2023 set out to ensure screening and early detection of cancers, naming cancers of the reproductive organs, and to train health workers in it; OnCo found no report of what was achieved. A 2013 paper from the Orotta medical school found that two thirds of 82 patients seen with breast cancer in 2007 and 2008 had stage III or IV disease.",
          links: [L_CX, L_WHO, L_GAVI, L_PLAN, L_SAMJ, { label: "PubMed: Tesfamariam et al. 2013", url: "https://pubmed.ncbi.nlm.nih.gov/23885732/" }],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in Eritrea",
      cards: [
        {
          id: "children",
          title: "A children's cancer unit opened at Orotta hospital in February 2025",
          plain:
            "A cancer unit for children opened in a renovated part of the children's hospital at Orotta Hospital in Asmara on 13 February 2025. The German charity Archemed, which supports it with a team from University Hospital Essen, describes it as the country's first, starting with Wilms tumour and Hodgkin lymphoma.",
          detail:
            "Archemed's news page of 31 March 2025 says the project is led by Prof. Uta Dirksen of University Hospital Essen with support from the RTL Foundation, that the German team trains Eritrean doctors and nurses, and that the first child in Eritrea with Hodgkin lymphoma was treated before the unit's opening. Archemed estimates that about 500 children are diagnosed with cancer in Eritrea each year; WHO's 2020 profile estimated 196 in children aged 0 to 14. The partnership's earlier project page, for 2020 to 2022, stated that no treatment was then available for children with cancer in Eritrea. Archemed's report of its mission in August 2024 describes a week of teaching for nurses, pharmacists and doctors at Orotta and says treatment results are being documented on forms drawn up together. These are the charity's own accounts; OnCo found no ministry page on the unit.",
          links: [L_ARCHEMED, L_ARCHEMED_2024, L_GIZ, L_WHO],
        },
        {
          id: "services",
          title: "Pathology at the National Health Laboratory, some chemotherapy in Asmara, and no radiotherapy centre in IAEA's directory",
          plain:
            "IAEA's directory of radiotherapy centres lists no centre in Eritrea. WHO's 2021 profile recorded pathology as generally available, and a cancer department, cancer surgery, chemotherapy and radiotherapy each as not generally available. A team visiting Orotta hospital in August 2024 reported chemotherapy being prepared for adult outpatients.",
          detail:
            "IAEA DIRAC's public equipment data, read on 16 November 2026, has no row for Eritrea, and WHO's 2020 profile gives 0.0 external beam radiotherapy units for 2019. Archemed's report of its August 2024 mission to Orotta hospital says its team watched the pharmacy prepare chemotherapy for adult outpatients, and that a building once planned as a radiotherapy and nuclear medicine clinic, long left as a shell, was being built on as an oncology centre. OnCo found no source saying that centre has opened. On where people go for radiotherapy, one source was found: a 2019 paper on the radiotherapy service at Tikur Anbessa hospital in Addis Ababa, covering May 2015 to January 2018, says its patients were referred from all regions of Ethiopia and from nearby countries, naming Eritrea and Djibouti, without a count. The 2025 leukaemia paper says leukaemia is classified by microscope alone at its authors' laboratories in Asmara, without flow cytometry or molecular tests.",
          links: [L_DIRAC, L_CX, L_WHO, L_ARCHEMED_2024, L_ETH_RT, L_LEUK],
        },
        {
          id: "plan",
          title: "No national cancer plan found; cancer sits inside the plan for non-communicable diseases",
          plain:
            "OnCo found no national cancer control plan for Eritrea. The ICCP portal holds the health ministry's strategic plan for non-communicable diseases for 2019 to 2023, which includes cancer, and its policy of May 2008.",
          detail:
            "WHO's 2020 profile entered n/a against a national cancer control plan for 2019, recorded an operational integrated plan for non-communicable diseases, and recorded no cancer management guidelines. A search of the ICCP portal for Eritrea on 16 November 2026 returned WHO's profiles, the ministry's plan of August 2018 and its policy of May 2008; that is what the search returned, not proof that no cancer plan exists. The 2019 to 2023 plan names breast, cervical, lung, liver, oesophageal, prostate, brain and colon cancer as the cancers that matter most in the community, and lists among its activities setting up specialised centres, a cancer centre among them, at national and regional level. Its reference list cites an earlier Eritrean plan of action for major chronic diseases, cancer included, for 2012 to 2016, which OnCo has not found. No plan for the years after 2023 was found.",
          links: [L_WHO, L_PLAN, L_POLICY, { label: "ICCP portal: search for Eritrea", url: "https://www.iccp-portal.org/resources?search_api_fulltext=eritrea" }],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Eritrea", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Eritrea",
          plain:
            "None of the trials in OnCo's records lists Eritrea among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search; its own search returned no cancer study with a site in Eritrea on 16 November 2026.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Eritrea. A query of the registry's own API that day for cancer studies with a location in Eritrea returned none. The published research from the country is descriptive: six papers since 2019 by staff of the National Health Laboratory and Asmara's hospitals and medical school count the cancers in the laboratory's records, with hospital records in two of them. One of them reports that 113 of the 155 oesophageal cancers confirmed from 2011 to 2021 were in women (134 of the 189 patients sampled), which the authors call highly unusual and in need of research into risk factors.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Eritrea", url: CTGOV },
            L_OES,
            L_LEUK,
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-ministry",
      title: "The health ministry's own pages could not be read",
      plain:
        "The Ministry of Health's website did not resolve when OnCo tried it on 16 November 2026, as on 11 November. The Ministry of Information's news site refused a first request and answered a later one that day; its two reports cover the HPV vaccination launch and a school lecture, not cancer treatment. This page therefore carries no account of cancer services in the health ministry's own current words.",
      detail:
        "The address moh.gov.er returned no host on 16 November 2026. The Ministry of Information's site, shabait.com, answered OnCo's first request with HTTP 403; a second check on 16 November 2026 returned both reports. Its report of 22 November 2022 says vaccination against cervical cancer began on 21 November at 1,382 schools, over 300 health facilities, 250 temporary centres and 60 mobile facilities, with 300,000 girls aged 9 to 14 expected, which agrees with Gavi's account. Its article of 26 February 2024 describes a lecture on cervical cancer for school students at Orotta Referral Hospital and says cancer screening and treatment services in the country are still relatively limited. The IAEA's main website returned HTTP 403 on both checks, so two IAEA pages about Eritrea were not read and this page says nothing about what they contain. A future pass should read those pages and ask WHO's Eritrea office for the ministry's current cancer documents. Until then the Ministry of Health and Orotta hospital in Asmara are the places to ask.",
      links: [
        L_PLAN,
        L_GAVI,
        { label: "Shabait (Ministry of Information): cervical cancer vaccination program underway nationwide (22 November 2022)", url: "https://shabait.com/2022/11/22/cervical-cancer-vaccination-program-underway-nationwide/" },
        { label: "Shabait (Ministry of Information): raising awareness and promoting prevention to reduce the cancer burden (26 February 2024)", url: "https://shabait.com/2024/02/26/raising-awareness-and-promoting-prevention-to-reduce-the-cancer-burden/" },
        { label: "WHO Regional Office for Africa: Eritrea", url: "https://www.afro.who.int/countries/eritrea" },
      ],
    },
    {
      id: "gap-sources",
      title: "What OnCo did not find for Eritrea",
      plain:
        "OnCo did not find which cancer treatments are given in Eritrea today and what they cost, any arrangement for sending patients abroad, the regulator's rules, a list of essential medicines, or a cancer plan for the years after 2023.",
      detail:
        "The one statement found on treatment abroad is a line in a 2019 paper from Addis Ababa naming Eritrea among the countries its radiotherapy patients came from; OnCo found no source on referral to Sudan or elsewhere, and none on a government scheme that pays for it. The National Medicines and Food Administration has no website OnCo could find, and Proclamation No 36/1993 was not read. WHO's 2020 profile was read as PDF text in which some rows of the workforce and services table cannot be paired with their values with certainty, so its counts of surgeons, radiologists and cancer centres are not given here; several are entered as n/a in any case. A future pass should look for the national list of medicines, the adult oncology service at Orotta hospital and any report on the planned oncology centre. A person in Eritrea should ask the treating hospital what is available now.",
      links: [L_WHO, L_ETH_RT, L_AFRO],
    },
  ],
  institutions: ["eritrea-ministry-of-health", "orotta-referral-hospital", "eritrea-national-health-laboratory", "eritrea-nmfa", "essen-wtz", "tikur-anbessa-hospital", "who", "iarc", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-medhin-breast-cancer-eritrea-ijbc-2019",
    "paper-medhin-gynaecological-cancers-eritrea-scirep-2020",
    "paper-medhin-prostate-cancer-eritrea-plosone-2020",
    "paper-medhin-colorectal-cancer-eritrea-plosone-2019",
    "paper-abraha-leukaemia-eritrea-cancer-reports-2025",
    "paper-mengistu-oesophageal-cancer-eritrea-jce-2024",
  ],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 cancer profile and 2021 cervical cancer profile, the Ministry of Health's plan for non-communicable diseases for 2019 to 2023 and its policy of May 2008, six papers by staff of the National Health Laboratory and three other papers, Gavi's article of March 2023, Archemed's news page and mission report, WHO Africa's news page on the regulator, the World Bank's health expenditure series, WHO's immunisation data, IAEA's directory of radiotherapy centres and ClinicalTrials.gov. The ministry's own website could not be reached.",
  verify:
    "Little is published about cancer services in Eritrea and the ministry's own site could not be read. Check with the Ministry of Health or Orotta hospital in Asmara before relying on this page.",
  verifyLinks: [L_IARC, L_ARCHEMED],
};

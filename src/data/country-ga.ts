import type { CountryDive } from "@/data/country-dive";

/**
 * Gabon deep dive: the hand-written cards for /countries/ga/ (wave 14). Every figure was read from the raw text of its
 * source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Gabon, WHO's Cancer Country
 * Profile 2020 (the ICCP portal's copy) and cervical cancer profile 2021, the World Bank's health expenditure series
 * from its API, WHO's immunisation data API, IAEA DIRAC's public equipment data, the CNAMGS's own pages (history, care
 * package, reimbursable medicines list, Octobre Rose), the medicines agency's front page (anmaps.ga), two news pages of
 * the health ministry (30 June and 10 November 2026), WHO's August 2026 list of regulators at maturity level 3 and 4,
 * the African Union's list of signatures of the African Medicines Agency treaty, the African Cancer Registry Network's
 * member list, ClinicalTrials.gov's API, and six papers resolved through Europe PMC with their abstracts read. The
 * ministry's site answered over https on 16 November, though several of its addresses returned 503 over plain http;
 * what was not found or not read is under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/266-gabon-fact-sheet.pdf";
const WHO_PROFILE = "https://www.iccp-portal.org/sites/default/files/plans/GAB_2020.pdf";
const WHO_CX = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-gab-2021-country-profile-en.pdf";
const WB_OOP = "https://api.worldbank.org/v2/country/GAB/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_CHE = "https://api.worldbank.org/v2/country/GAB/indicator/SH.XPD.CHEX.PC.CD?format=json";
const WB_GOV = "https://api.worldbank.org/v2/country/GAB/indicator/SH.XPD.GHED.CH.ZS?format=json";
const WB_EXT = "https://api.worldbank.org/v2/country/GAB/indicator/SH.XPD.EHEX.CH.ZS?format=json";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'GAB'%20and%20contains(ANTIGEN,'HPV')";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const AFCRN_LIST = "https://afcrn.org/index.php/membership/membership-list";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=Gabon";
const CTGOV = "https://clinicaltrials.gov/search?country=Gabon&cond=cancer";
const GFAOP_REGISTRY = "https://clinicaltrials.gov/study/NCT03803735";

const L_IARC = { label: "IARC: GLOBOCAN 2024 fact sheet, Gabon (PDF)", url: IARC_FACTSHEET };
const L_WHO = { label: "WHO: Cancer Country Profile 2020, Gabon (PDF, ICCP portal)", url: WHO_PROFILE };
const L_CX = { label: "WHO: cervical cancer country profile 2021, Gabon (PDF)", url: WHO_CX };
const L_DIRAC = { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC };
const L_REG = { label: "Ivanga et al., Cancer in the Grand Libreville, Gabon, 2013 to 2017 (Cancer Epidemiology 2024)", url: "https://doi.org/10.1016/j.canep.2024.102695" };
const L_RT = { label: "Ndjembidouma et al., rectal toxicity after prostate radiotherapy at the Akanda Cancer Institute (Reports of Practical Oncology and Radiotherapy 2023)", url: "https://doi.org/10.5603/rpor.97507" };
const L_BARR_RT = { label: "Kroeber et al., patient-reported barriers to radiotherapy in sub-Saharan Africa (International Journal of Cancer 2026)", url: "https://doi.org/10.1002/ijc.70390" };
const L_BARR_CT = { label: "König et al., patient-reported barriers to chemotherapy in nine sub-Saharan African countries (International Journal of Cancer 2026)", url: "https://doi.org/10.1002/ijc.70309" };
const L_FRANCEVILLE = { label: "Moussavou-Boundzanga et al., breast and cervical screening in Franceville, Gabon, 2015 to 2021 (Frontiers in Oncology 2026)", url: "https://doi.org/10.3389/fonc.2026.1735802" };
const L_WAHEED = { label: "Waheed et al., barriers to HPV vaccine introduction in francophone African countries (Vaccine 2026)", url: "https://doi.org/10.1016/j.vaccine.2025.128030" };
const L_MIN_POLE = { label: "Ministère de la Santé, Gabon: colloquium on the future of cancer care and research (30 June 2026)", url: "https://sante.gouv.ga/lutte-contre-les-cancers-le-gabon-affirme-sa-volonte-de-batir-un-pole-dexcellence-en-oncologie/" };
const L_MIN_CHUL = { label: "Ministère de la Santé, Gabon: equipment for the pathology laboratory of CHU de Libreville (10 November 2026)", url: "https://sante.gouv.ga/%f0%9d%90%8b%f0%9d%90%84-%f0%9d%90%8c%f0%9d%90%88%f0%9d%90%8d%f0%9d%90%88%f0%9d%90%92%f0%9d%90%93%f0%9d%90%91%f0%9d%90%84-%f0%9d%90%83%f0%9d%90%84-%f0%9d%90%8b%f0%9d%90%80-%f0%9d%90%92%f0%9d%90%80/" };
const L_CNAMGS_HIST = { label: "CNAMGS: history, missions and financing", url: "https://cnamgs.ga/apropos/" };
const L_CNAMGS_PANIER = { label: "CNAMGS: care package (panier de soins)", url: "https://cnamgs.ga/le-panier-de-soins-de-la-cnamgs/" };
const L_CNAMGS_MAPS = { label: "CNAMGS: list of reimbursable medicines, 2025 edition", url: "https://cnamgs.ga/liste-des-medicaments/" };
const L_CNAMGS_ADDITIVE = { label: "CNAMGS: additive list of reimbursable medicines by brand name, 2025 edition (PDF, read 16 November 2026)", url: "https://cnamgs.ga/wp-content/uploads/2025/06/Liste-additive-des-MAPS-edition-2025-VF2.pdf" };
const L_ANMAPS = { label: "ANMAPS: official site (front page)", url: "https://anmaps.ga/" };
const L_ANMAPS_LIST = { label: "ANMAPS: list of medicines (read 16 November 2026)", url: "https://anmaps.ga/liste_medicaments.php" };
const L_ANMAPS_TRIALS = { label: "ANMAPS: management of clinical trials (read 16 November 2026)", url: "https://anmaps.ga/gestion_essaie_clinique.php" };

export const GA_DIVE: CountryDive = {
  iso2: "GA",
  iso3: "GAB",
  name: "Gabon",
  flag: "🇬🇦",
  asOf: "2026-11-16",
  title: "Cancer in Gabon",
  description:
    "Cancer in Gabon: a cancer institute at Akanda, near Libreville, where IAEA's directory lists two linear accelerators, a compulsory health insurance fund (CNAMGS) whose 2025 medicines list includes cancer medicines subject to its prior agreement, a population-based cancer registry for Greater Libreville that counted 1,549 cancers from 2013 to 2017, a medicines agency created in 2023, IARC's estimate of 1,573 new cancers and 994 deaths in 2024 with breast cancer leading, 17% of health spending paid out of pocket in 2023, HPV vaccination not introduced, no national cancer plan found, and no trial in OnCo's records with a site in the country.",
  lede:
    "Gabon has a cancer institute at Akanda, near Libreville, where IAEA's directory lists two linear accelerators, and a compulsory health insurance fund, the CNAMGS, whose 2025 list of reimbursable medicines includes cancer medicines, marked as needing the fund's prior agreement. A population-based cancer registry for Greater Libreville has published its first five years of counts; IARC's national estimate for 2024, 1,573 new cancers and 994 deaths, applies a subnational registry's rates to the whole population.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Gabon is 1,573 new cancers and 994 deaths, an age-standardised incidence of 83.5 per 100,000 (71.2 in men, 97.2 in women). The fact sheet gives the incidence source as a subnational registry and the method as subnational rates applied to the 2024 population; it does not name the registry. Mortality is national incidence estimates applied to modelled mortality-to-incidence ratios built on registry survival data. The registry for Greater Libreville published its own counts for 2013 to 2017: 1,549 cancers in five years, at age-standardised rates of 73.3 per 100,000 in women and 47.7 in men, lower than IARC's 2024 national rates, and its authors say some cancers may be under-recorded.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Gabon",
      aside: L_IARC,
      cards: [
        {
          id: "shape",
          title: "About 1,570 new cancers a year in IARC's estimate, with breast cancer the commonest",
          plain:
            "IARC estimates 1,573 new cancers in Gabon in 2024, 931 of them in women, and 994 cancer deaths. Breast cancer is the commonest cancer and the commonest cause of cancer death, followed in new cases by prostate, cervical, liver and colorectal cancer.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 295 breast cancers (143 deaths), 169 prostate cancers (104 deaths), 146 cervical cancers (88 deaths), 137 liver cancers (125 deaths) and 134 colorectal cancers (75 deaths), in a population of 2.54 million. By deaths the order is breast, liver, prostate, cervix, colorectum. The risk of developing a cancer before age 75 is 9.2%, and an estimated 3,700 people are living within five years of a diagnosis. The fact sheet's methods box gives the incidence source as a subnational registry, with subnational rates applied to the 2024 population, so the national figures are an estimate built on registry counts from one part of the country. WHO's 2020 profile estimated 103 cancers a year in children aged 0 to 14.",
          links: [L_IARC, L_WHO],
        },
        {
          id: "registry",
          title: "A cancer registry for Greater Libreville, based at the cancer institute, has published 2013 to 2017",
          plain:
            "Gabon has a population-based cancer registry for Greater Libreville. Its first five years, 2013 to 2017, were published in 2024: 1,549 cancers among residents, 955 in women and 594 in men. Breast and cervical cancer made up half of the cancers in women.",
          detail:
            "The paper, in Cancer Epidemiology, describes the Greater Libreville registry as the primary population-based registry to be established in Gabon; most of its authors give the Institut de Cancérologie d'Akanda as their affiliation, and later papers give the affiliation as the Registre du Cancer du Gabon at the institute. Age-standardised incidence for all sites was 73.3 per 100,000 in women and 47.7 in men. In women the rates were 19.0 for breast and 16.3 for cervical cancer; in men 12.0 for prostate, 5.1 for liver and 5.0 for colorectal cancer, together 41.1% of male cancers. The authors note that breast and prostate rates are much lower than in other registries of the region and may be underestimated. WHO's 2021 cervical cancer profile recorded that no population-based registry existed, although by the paper's account the Greater Libreville registry had been recording since 2013. The African Cancer Registry Network's member list, read on 16 November 2026, has no entry for Gabon, though the registry's staff are co-authors of two 2026 surveys of patients drawn from population-based registries, and the abstract of the radiotherapy survey describes those registries as the network's. The health ministry's June 2026 colloquium listed modernising the national cancer registry among its orientations.",
          links: [L_REG, L_CX, { label: "African Cancer Registry Network: member registries", url: AFCRN_LIST }, L_BARR_RT, L_MIN_POLE],
        },
      ],
      tables: [
        {
          id: "ga-registry-rates",
          title: "Cancer in Greater Libreville, 2013 to 2017: the registry's own counts",
          caption: "Cases recorded among residents over five years, and age-standardised incidence per 100,000 a year, from the registry's published abstract.",
          columns: [
            { key: "measure", label: "Measure" },
            { key: "women", label: "Women", numeric: true },
            { key: "men", label: "Men", numeric: true },
          ],
          rows: [
            { measure: "Cancers recorded, 2013 to 2017", women: 955, men: 594 },
            { measure: "All sites, rate per 100,000", women: 73.3, men: 47.7 },
            { measure: "Breast, rate per 100,000", women: 19.0, men: null },
            { measure: "Cervix, rate per 100,000", women: 16.3, men: null },
            { measure: "Prostate, rate per 100,000", women: null, men: 12.0 },
            { measure: "Liver, rate per 100,000", women: null, men: 5.1 },
            { measure: "Colorectum, rate per 100,000", women: null, men: 5.0 },
          ],
          note: "Counted cases in one urban area, not a national figure. An empty cell means the abstract gives no rate for that sex. The authors say breast and prostate cancer may be under-recorded.",
          sources: [L_REG],
        },
        {
          id: "ga-globocan-sites",
          title: "The five commonest cancers in Gabon, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024, from a subnational registry's rates applied to the national population.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 295, deaths: 143 },
            { site: "Prostate", cases: 169, deaths: 104 },
            { site: "Cervix uteri", cases: 146, deaths: 88 },
            { site: "Liver", cases: 137, deaths: 125 },
            { site: "Colorectum", cases: 134, deaths: 75 },
          ],
          note: "Estimates for the whole country in one year, so they cannot be set directly beside the five-year registry counts above.",
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
          title: "About USD 253 a person on health in 2023, two thirds of it from the government",
          plain:
            "Gabon spent about 253 US dollars a person on health in 2023. The government paid 66% of it from its own revenue, households paid 17% out of pocket and external funders 4%, according to the World Bank's series from WHO's health expenditure database.",
          detail:
            "The World Bank's series gives current health spending of USD 228 per person in 2021, 243 in 2022 and 253 in 2023. Out-of-pocket spending fell from 23.1% of current health spending in 2019 to 21.6% in 2021, 17.9% in 2022 and 17.3% in 2023. In 2023 domestic government spending was 65.7% and external health expenditure 4.4%. The four series OnCo read do not account for the remaining share. These are averages for all health care: OnCo found no source giving what a person with cancer in Gabon pays for a course of chemotherapy or radiotherapy.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Gabon (API)", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Gabon (API)", url: WB_CHE },
            { label: "World Bank: domestic general government health expenditure, Gabon (API)", url: WB_GOV },
            { label: "World Bank: external health expenditure, Gabon (API)", url: WB_EXT },
          ],
        },
        {
          id: "cnamgs",
          title: "Compulsory health insurance through the CNAMGS; cancer medicines on its 2025 list need its prior agreement",
          plain:
            "Gabon instituted compulsory health insurance in 2007, run by the national fund CNAMGS. The fund says it pays 50%, 80% or 100% of the cost of medical bills and covers Gabonese people on low incomes from a solidarity levy. Its 2025 medicines list added 159 medicines, oncology among the fields it names, and the cancer medicines OnCo looked up on it are marked as needing the fund's prior agreement.",
          detail:
            "The fund's history page says an ordinance of 4 January 2007 instituted the compulsory scheme and created the Caisse Nationale d'Assurance Maladie et de Garantie Sociale, that the ordinance was not ratified in time and was issued again on 21 August 2007 and ratified by Parliament on 28 December 2007, that the first insurance cards were handed out on 19 December 2008, and that cover opened in stages: Gabonese people classed as economically weak, students, pupils and refugees in 2009, public employees in 2011 and private-sector employees in 2014. The fund for people on low incomes is financed by a special solidarity contribution. The fund pays providers directly; the share left to the patient is the ticket modérateur. Its care package covers outpatient care, hospital stays, medicines and devices, and medical evacuation abroad for care that cannot be given in Gabon, which needs prior agreement; people on low incomes pay nothing towards an evacuation. Prevention, screening and health promotion are excluded and stay with the health ministry. The 2025 edition of the reimbursable list is written by generic name, reimburses generics at 80%, 90% or 100% and branded medicines at 50%, and says the 159 additions answer needs in oncology, cardiology, mental health, diabetes and infection. The care package page carries a button labelled \"Fiche demande de carte ALD\", a request form for an ALD card; the page does not explain the abbreviation, and on 16 November 2026 the button led to no document. The fund also publishes an additive list that gives the brand names matching the 2025 edition. Read on 16 November 2026, it includes cancer medicines, among them tamoxifen, anastrozole, letrozole, capecitabine, cisplatin, carboplatin, docetaxel, paclitaxel, imatinib, trastuzumab, rituximab and bevacizumab. Where other medicines carry a percentage, each of these rows reads \"ACCORD PREALABLE\" (prior agreement), and the list does not say what share the fund pays once it agrees. OnCo looked up these medicines by name and did not read the whole list, so a medicine not named here may still be on it.",
          links: [L_CNAMGS_HIST, L_CNAMGS_PANIER, L_CNAMGS_MAPS, L_CNAMGS_ADDITIVE],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator",
      cards: [
        {
          id: "anmaps",
          title: "ANMAPS, a medicines agency created in 2023, lists registering medicines and managing clinical trials among its functions",
          plain:
            "Gabon's medicines regulator is the Agence Nationale du Médicament et des Autres Produits de Santé (ANMAPS), a public agency under the health ministry. Its site says it was created by an ordinance of 24 October 2023 and lists the registration of medicines and the management of clinical trials among its functions.",
          detail:
            "The agency's front page says it was created by Ordinance No. 0004 of 24 October 2023, ratified by Law No. 006/2023 on 26 January 2024, with the mission of assuring the quality, safety and efficacy of medicines and health products for human and veterinary use, and that it regulates their production, import, export, marketing, use and destruction. It lists eight functions, among them registration of medicines (homologation), management of clinical trials, market surveillance, vigilance and quality control, and announces a new laboratory. The page still carried template filler text beside these statements. Its menu leads to a list of medicines which, read on 16 November 2026, said it was updated on 23 July 2026 and held 9,258 medicines, with columns headed Désignation, DCI (the generic name), AMMG and Lab Titulaire; OnCo did not search it for cancer medicines. The agency's page on clinical trials describes audits and inspections of trial sites and says the agency must check a site before a trial is authorised; it does not set out the steps for applying. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include Gabon. The African Union's list of 19 September 2023 shows Gabon signed the treaty establishing the African Medicines Agency on 20 April 2020, ratified it on 1 October 2021 and deposited its instrument on 4 October 2021. The insurance fund's 2025 list says it reimburses medicines that hold a marketing authorisation or a special import authorisation.",
          links: [
            L_ANMAPS,
            L_ANMAPS_LIST,
            L_ANMAPS_TRIALS,
            { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML3 },
            { label: "African Union: signatures and ratifications of the African Medicines Agency treaty (19 September 2023, PDF)", url: AMA },
            L_CNAMGS_MAPS,
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
          id: "cervical",
          title: "A national cervical screening programme by smear test, from age 25; about one woman in ten screened",
          plain:
            "WHO's 2021 cervical cancer profile records a national cervical screening programme in Gabon, using cytology (the smear test) for women aged 25 and over. It also records that 8% of women aged 30 to 49 had been screened in the previous five years and 12% ever, on 2019 data.",
          detail:
            "The same profile records programmes or guidelines for early detection of first symptoms in primary care and a defined referral system, both for 2021, and no national guidelines on cervical cancer management. WHO's 2020 profile, on 2019 answers, had recorded no cervical screening programme, no breast screening programme and no cancer management guidelines. A 2026 paper from Franceville, in the south-east, describes routine screening of 1,328 women at the Centre Hospitalier Universitaire Amissa Bongo in 2015 to 2016 and 2018 to 2021 by clinical breast examination and visual inspection of the cervix with acetic acid; its authors write that national screening programmes exist and that their effectiveness is poorly documented, particularly outside Libreville. The insurance fund's care package excludes screening, which it says remains the health ministry's responsibility, and in November 2026 the ministry equipped the pathology laboratory of the Libreville university hospital to read samples from the Octobre Rose screening campaign.",
          links: [L_CX, L_WHO, L_FRANCEVILLE, L_CNAMGS_PANIER, L_MIN_CHUL],
        },
        {
          id: "hpv",
          title: "HPV vaccination not introduced, in WHO's data to 2025",
          plain:
            "WHO's immunisation database lists the vaccine against human papillomavirus, the virus that causes cervical cancer, as not introduced in Gabon in every year from 2006 to 2025, and holds no coverage figures for the country.",
          detail:
            "WHO's immunisation data API, queried on 16 November 2026, returns 20 rows for HPV vaccine introduction, one for each year from 2006 to 2025, all with the answer No. Its coverage table returns 44 HPV rows for Gabon, for 2018 to 2025, and every one has an empty coverage value. WHO's 2021 cervical cancer profile also records the vaccine as not included in the national vaccination programme. A study in the journal Vaccine interviewed officials and partners between January and April 2024 in six francophone African countries and placed Gabon among four still in the phase before introduction; across those countries it named weak health system capacity, competing vaccine priorities, staff shortages and logistics as barriers. The insurance fund's care package excludes the activities of the national immunisation programme from what it pays for.",
          links: [{ label: "WHO immunisation data: HPV vaccine introduction, Gabon (API)", url: WHO_HPV_INTRO }, L_CX, L_WAHEED, L_CNAMGS_PANIER],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Gabon does",
      title: "What stands out in Gabon",
      cards: [
        {
          id: "radiotherapy",
          title: "Radiotherapy at the cancer institute at Akanda: two linear accelerators in IAEA's directory",
          plain:
            "IAEA's directory of radiotherapy centres lists one centre in Gabon, the Institut de Cancérologie de Libreville, also called the Institut de Cancérologie d'Akanda, with two linear accelerators, a CT scanner and a treatment planning system. The entry was updated in 2026.",
          detail:
            "DIRAC's public data, read on 16 November 2026, places the institute at Angondjé on the campus of the Hôpital d'Instruction des Armées d'Akanda, formerly the CHU d'Angondjé. A paper from the institute's department of medical physics and radiotherapy reports 46 men with localised prostate cancer treated there with curative three-dimensional conformal radiotherapy between 2013 and 2021, at doses of 66 to 80 Gy; late bowel side effects occurred in five of them and none was severe. WHO's 2021 cervical cancer profile recorded radiotherapy, chemotherapy, cancer surgery, pathology and a cancer centre at tertiary level as generally available in 2021, and, on 2018 data, 11 radiotherapy units and no brachytherapy unit per 10,000 cancer patients. Brachytherapy is radiotherapy given from a source placed inside the body; DIRAC's row for the institute lists no brachytherapy unit. In a 2026 survey of patients from registries in nine African countries, cost of treatment was the commonest obstacle to radiotherapy overall; the abstract gives no separate figure for Gabon.",
          links: [L_DIRAC, L_RT, L_CX, L_BARR_RT],
        },
        {
          id: "plan",
          title: "No national cancer plan found; a June 2026 meeting set out orientations for a centre of excellence",
          plain:
            "OnCo found no national cancer plan for Gabon. The health ministry held an international meeting in Libreville on 25 June 2026 on the future of cancer care and research, which retained strengthening the Akanda institute, modernising the cancer registry and training oncology staff among its orientations.",
          detail:
            "A search of the ICCP portal for Gabon on 16 November 2026 returned WHO's profiles and no national cancer plan or non-communicable disease plan. WHO's 2020 profile gives n/a for a national cancer control plan and for an integrated non-communicable disease plan in 2019, and records no cancer management guidelines. The ministry's page of 30 June 2026 says the minister called cancer a national priority, and that participants examined a programme called CORE (Care, Outreach, Research and Education), developed with the Global Health Catalyst, which provides for scientific cooperation with the United States, training of oncology specialists and the gradual creation of a regional centre of excellence. The orientations retained also include telemedicine, support for clinical research, and prevention and awareness campaigns. The page gives no budget, dates or targets, so these are stated intentions, not a costed plan.",
          links: [L_MIN_POLE, L_WHO, { label: "ICCP portal: resources search for Gabon", url: ICCP_SEARCH }],
        },
        {
          id: "services",
          title: "Pathology at the Libreville university hospital; palliative care recorded as not generally available",
          plain:
            "Cancer is confirmed under the microscope at laboratories that include the pathology laboratory of the Centre Hospitalier Universitaire de Libreville, which the health minister equipped with four microscopes and supplies on 4 November 2026. WHO's 2021 profile recorded palliative care as not generally available in primary or community care.",
          detail:
            "The ministry's page of 10 November 2026 says the equipment is meant to improve the reading of samples from screening campaigns and shorten the wait for results, so that nobody found by screening is left without a diagnosis; it names breast, cervical and prostate cancer among the cancers the laboratory examines. WHO's 2020 profile recorded pathology services as generally available and bone marrow transplantation as generally not available in 2019, and six nuclear medicine physicians per 10,000 cancer patients; it gives n/a for radiation oncologists and medical physicists. WHO's 2021 cervical cancer profile recorded palliative care for people with non-communicable diseases as not generally available in primary health care or in community and home-based care, and reported opioid consumption for 2017 as 0 mg of oral morphine equivalent per person. OnCo found no count of Gabon's oncologists or of its chemotherapy units.",
          links: [L_MIN_CHUL, L_WHO, L_CX],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Gabon", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Gabon; the registry lists a childhood cancer register",
          plain:
            "None of the trials in OnCo's records lists Gabon among its countries. ClinicalTrials.gov itself lists one cancer study with a site there, and it is not a treatment trial: a hospital register of children with cancer. OnCo holds a selection of trials, not the whole registry.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Gabon. A query of the registry's own API that day for cancer studies with a location in Gabon returned two. One is the French African Pediatric Oncology Registry (NCT03803735), a hospital-based register of children with cancer sponsored by the French Africa Pediatric Oncology Group, recruiting, which lists the Institut de Cancérologie de Libreville among its sites. The other is a terminated malaria treatment study with an office address in Libreville, which is not a cancer study. The medicines agency lists the management of clinical trials among its functions.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Gabon", url: CTGOV },
            { label: "ClinicalTrials.gov: French African Pediatric Oncology Registry (NCT03803735)", url: GFAOP_REGISTRY },
            L_ANMAPS,
          ],
        },
        {
          id: "published",
          title: "Published research: the registry, radiotherapy outcomes and what patients say holds them back",
          plain:
            "Research from Gabon that OnCo read includes the Greater Libreville registry's report for 2013 to 2017, a radiotherapy series from the Akanda institute, and two 2026 surveys of patients from African cancer registries. In the chemotherapy survey, fear of treatment was the main obstacle reported in Gabon.",
          detail:
            "The two surveys, in the International Journal of Cancer, interviewed by telephone 553 people with cancer or their carers, registered in 2018 and 2019 in population-based registries in nine countries, Gabon among them. For chemotherapy, 58.6% of participants overall received it and 13.2% were recommended it and did not; the abstract says affordability was especially severe in the Republic of the Congo, while in Gabon fear of treatment prevailed. For radiotherapy, cost of treatment was a problem for 69.0% overall. Neither abstract gives the number of participants from Gabon. Other work indexed from Gabon covers the types of human papillomavirus found in cervical lesions in Libreville and screening in Franceville; OnCo read the abstract of the Franceville paper and not the others.",
          links: [L_BARR_CT, L_BARR_RT, L_REG, L_RT, L_FRANCEVILLE],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not found or not read for this page",
      plain:
        "OnCo found no national cancer plan, no count of Gabon's oncologists or chemotherapy units, no statement of what share of a cancer medicine's cost the insurance fund pays once it agrees to it, and no page of the cancer institute's own. IARC's fact sheet does not name the registry its estimate rests on.",
      detail:
        "The health ministry's site answered over https on 16 November 2026, but several of its addresses returned 503 over plain http that day, and OnCo read two news pages and the front page only. OnCo looked up a dozen cancer medicines by name in the CNAMGS's additive list and did not read the whole list, the 2025 edition by generic name or the fund's document of condition codes; the fund's menu entry for medical evacuations led to no page, and the addresses OnCo tried returned 404. Of the medicines agency's inner pages, OnCo read the list of medicines and the page on clinical trials and no others. In WHO's 2020 profile the cells for the national cancer plan, the non-communicable disease plan, HPV coverage and several workforce rows read n/a, and its machine counts are per 10,000 cancer patients, so this page does not turn them into numbers of machines. The fact sheet's link to IARC's detailed sources was not followed. A future pass should read the whole reimbursable list for cancer medicines, the agency's texts on trial authorisation, and any published plan from the June 2026 colloquium. Until then the Akanda institute, the CNAMGS and the health ministry are the places to ask.",
      links: [L_MIN_POLE, L_CNAMGS_MAPS, L_CNAMGS_ADDITIVE, L_ANMAPS, L_IARC],
    },
  ],
  institutions: ["ica-akanda", "cnamgs-gabon", "gabon-ministry-of-health", "anmaps-gabon", "chu-libreville", "who", "iarc", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-ivanga-cancer-grand-libreville-canep-2024",
    "paper-ndjembidouma-rectal-toxicity-prostate-radiotherapy-akanda-rpor-2023",
    "paper-konig-chemotherapy-barriers-africa-registries-ijc-2026",
    "paper-kroeber-radiotherapy-barriers-africa-registries-ijc-2026",
    "paper-waheed-hpv-vaccine-barriers-francophone-vaccine-2026",
  ],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 cancer profile and 2021 cervical cancer profile, the World Bank's health expenditure series, WHO's immunisation data, IAEA's directory of radiotherapy centres, the pages of the national insurance fund, the medicines agency and the health ministry, ClinicalTrials.gov, and the abstracts of six papers resolved through Europe PMC. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November, and the count on this page is unchanged.",
  verify:
    "Equipment counts here are IAEA's and the insurance rules are the CNAMGS's own description; neither says what a given patient will be offered or charged. Check with the treating hospital, the CNAMGS or the health ministry before relying on them.",
  verifyLinks: [L_IARC, L_CNAMGS_PANIER, L_DIRAC],
};

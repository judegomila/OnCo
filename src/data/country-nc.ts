import type { CountryDive } from "@/data/country-dive";

/**
 * New Caledonia deep dive: the hand-written cards for /countries/nc/ (wave 16). Every figure was read from the raw
 * text of its source on 16 November 2026, not from a summary of it, and French sources were read in French: IARC's
 * GLOBOCAN 2024 fact sheet for New Caledonia (PDF text); the DASS-NC cancer page, its registry report "Epidémiologie
 * des cancers en Nouvelle-Calédonie, incidence et mortalité 2018-2020" (PDF text) and the registry's open dataset on
 * data.gouv.nc (JSON export, 7,250 rows for 2008 to 2022, summed by OnCo for the tables); CAFAT's pages on the RUAMM,
 * long-illness insurance and its EVASAN pathways to Sydney and mainland France; the Agence sanitaire et sociale's
 * pages on cervical and breast cancer screening; two government press notes on HPV vaccination (21 July 2022 and
 * 30 August 2023, PDF text); Délibération n° 44 of 30 December 2004 on medicines (juridoc.gouv.nc, PDF text), opinion
 * n° 2022-A-01 of the Autorité de la concurrence de la Nouvelle-Calédonie (PDF text) and annex 1-15 of the customs
 * code (PDF text); the Centre de radiothérapie de Nouvelle-Calédonie's page; written question n° 16562 at the French
 * National Assembly; the April 2019 report of the IGAS, IGA and IGF inspectorates on French Polynesia,
 * whose comparison table carries New Caledonia's 2015 health spending; IAEA's DIRAC equipment report (JSON, no row);
 * WHO's immunisation data service (JSON: HPV coverage rows for 2023 and 2024 under antigen names starting `HPV`,
 * none under `PRHPV`, and no vaccine introduction row) and its health expenditure service (JSON, no rows); and the
 * papers' abstracts through Europe PMC.
 *
 * A second check on 16 November 2026 re-read every source and re-summed the open dataset. It found the WHO coverage
 * rows the first reading missed, and the split of health spending by payer (households 5% in 2019) in the competition
 * authority's opinion, which the page had said was not available.
 *
 * Not found or not readable: a cancer plan, screening participation rates, and the radiotherapy centre's current
 * equipment (its page is written as a project description). Named under `gaps`. The flag field is left empty:
 * choosing a flag for New Caledonia is a judgement this page does not make.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/540-new-caledonia-fact-sheet.pdf";
const DASS_CANCER = "https://dass.gouv.nc/votre-sante-maladies/le-cancer";
const DASS_REPORT = "https://dass.gouv.nc/sites/default/files/atoms/files/epidemiologie_des_cancers_nc_incidence_mortalite_2018_2020_0.pdf";
const OPEN_DATA = "https://data.gouv.nc/explore/dataset/epidemiologie_cancers_nc/information/";
const CAFAT_RUAMM = "https://www.cafat.nc/presentation/";
const CAFAT_ALM = "https://www.cafat.nc/assurance-longue-maladie/";
const CAFAT_SYDNEY = "https://www.cafat.nc/votre-parcours-evasan-a-sydney/";
const CAFAT_METROPOLE = "https://www.cafat.nc/votre-parcours-evasan-metropole/";
const ASS_CERVIX = "https://www.santepourtous.nc/les-thematiques/cancer-du-col-de-l-uterus/presentation";
const ASS_CERVIX_WHO = "https://www.santepourtous.nc/les-thematiques/cancer-du-col-de-l-uterus/depistage-organise-part/les-personnes-concernees";
const ASS_BREAST = "https://www.santepourtous.nc/les-thematiques/cancer-du-sein/depistage-du-cancer-du-sein";
const GOUV_HPV_2022 = "https://gouv.nc/sites/default/files/atoms/files/2022.07.21_ip_vaccination_anti-hpv_etendue_aux_garcons.pdf";
const GOUV_HPV_2023 = "https://gouv.nc/sites/default/files/atoms/files/2023.08.30_cp_vaccination_hpv.pdf";
const DELIB_44 = "https://juridoc.gouv.nc/JuriDoc/JdTextes.nsf/0/D3257E2E60A93C1D4B258E570009CAE2/$File/Deliberation_44_du_30-12-2004_ChG.pdf";
const ACNC_2022 = "https://autorite-concurrence.nc/sites/default/files/avis-fichiers/2022-A-01%20Avis%20pharmaceutique.pdf";
const DOUANE_ANNEX = "https://douane.gouv.nc/sites/default/files/atoms/files/annexe_1-15_-_liste_des_marchandises_soumise_a_autorisation_administrative_dimportation_en_matiere_sanitaire.pdf";
const CRNC = "https://crnc.nc/";
const CHT_ONCO = "https://www.cht.nc/offre-de-soins-du-cht/le-pole-medecine/unite-oncologie/";
const AN_16562 = "https://www.assemblee-nationale.fr/dyn/16/questions/QANR5L16QE16562";
const IGAS_2019 = "https://www.igas.gouv.fr/sites/igas/files/2024-05/Evaluation%20du%20syst%C3%A8me%20de%20protection%20sociale%20et%20de%20sant%C3%A9%20%E2%80%93%20Appui%20au%20gouvernement%20de%20la%20Polyn%C3%A9sie%20fran%C3%A7aise.pdf";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'NCL'%20and%20startswith(ANTIGEN,'HPV')";
const ASS_HPV_2026 = "https://www.santepourtous.nc/l-actualite/856-campagne-de-vaccination-anti-hpv-2026-une-organisation-optimisee-pour-la-10-edition";
const ONCO_NC_ABOUT = "https://www.onco.nc/312-2/";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'NCL'";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/ncl-2020.pdf";
const CTGOV = "https://clinicaltrials.gov/search?country=New%20Caledonia&cond=cancer";

const BAUMANN_2011 = { label: "Baumann et al., pleural mesothelioma in New Caledonia and environmental risk factors (Environ Health Perspect 2011)", url: "https://doi.org/10.1289/ehp.1002862" };
const TRUONG_2007 = { label: "Truong et al., thyroid cancer in New Caledonia 1985 to 1999 (Eur J Cancer Prev 2007)", url: "https://doi.org/10.1097/01.cej.0000236244.32995.e1" };
const HARTMANN_2018 = { label: "Hartmann et al., cancer incidence among children in New Caledonia 1994 to 2012 (J Pediatr Hematol Oncol 2018)", url: "https://doi.org/10.1097/mph.0000000000001255" };

export const NC_DIVE: CountryDive = {
  iso2: "NC",
  iso3: "NCL",
  name: "New Caledonia",
  flag: "",
  asOf: "2026-11-16",
  title: "Cancer in New Caledonia",
  description:
    "Cancer in New Caledonia from the territory's own sources: a cancer registry begun in 1977 that publishes its counts as open data, about 1,100 new cancers and 460 cancer deaths a year in 2020 to 2022, a social security fund that pays cancer care in full apart from a 10% charge on consultations, evacuation to Sydney or mainland France for care not given locally, free breast and cervical screening by invitation, HPV vaccination in schools, a radiotherapy centre at the Médipôle, and what its own authorities say about how medicines are authorised.",
  lede:
    "New Caledonia, a French territory in the Pacific, has about 290,000 people and its own health system and social security fund, the CAFAT. Its cancer registry, kept by the government's health directorate, reports about 1,100 new cancers and 460 cancer deaths a year in 2020 to 2022; cancer is the leading medical cause of death. Cancer is treated at the territorial hospital and the radiotherapy centre on its Médipôle site, and patients needing care not available there are evacuated to Sydney or mainland France.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for New Caledonia is 1,139 new cancers (612 in men, 527 in women) and 468 deaths, an age-standardised incidence of 268.3 per 100,000 (293.0 in men, 247.0 in women). For incidence IARC's fact sheet gives the data source as \"Registry (national)\" and the method as \"Trends in national rates projected to 2024\". For mortality it says \"Country-specific data source: No data\" and \"National incidence estimates applied to model-based M:I ratios (neighbouring country registry data)\", although the territory's registry does publish deaths. The two agree closely all the same: summed from the registry's open data, 2020 to 2022 saw 3,317 new cancers and 1,390 cancer deaths, about 1,106 and 463 a year. The registry stopped recording non-melanoma skin cancers from 2009.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in New Caledonia",
      aside: { label: "DASS-NC: cancer and the cancer registry (in French)", url: DASS_CANCER },
      cards: [
        {
          id: "shape",
          title: "About 1,100 new cancers a year; breast, lung and prostate lead",
          plain:
            "Summed by OnCo from the registry's open data, 2020 to 2022 saw 3,317 new cancers, 1,681 in men and 1,636 in women, and 1,390 cancer deaths. Breast cancer is the most common cancer (582 cases), then lung (500) and prostate (419). Lung cancer causes by far the most deaths: 351 in three years, about a quarter of all cancer deaths.",
          detail:
            "The registry's report for 2018 to 2020 says cancer is the leading medical cause of death in the territory, with close to 500 deaths a year, ahead of circulatory disease. In men about one cancer in five is prostate cancer; in women one in three is breast cancer. Men's overall incidence in 2018 to 2020 was significantly lower than in 2008 to 2010, which the report links to fewer prostate cancers after age 50, while incidence in men aged 40 to 49 rose with lung cancer; women's incidence was unchanged. Comparing its rates with IARC's 2020 estimates for other countries, the registry says New Caledonia would rank sixth in the world for lung cancer incidence in men, fifth for breast cancer and first for cancer of the body of the uterus, and warns that such rankings also reflect differences in diagnosis and counting between countries.",
          links: [
            { label: "Registre du cancer de Nouvelle-Calédonie: open data, incidence and mortality 2008 to 2022", url: OPEN_DATA },
            { label: "DASS-NC: Epidémiologie des cancers en Nouvelle-Calédonie, incidence et mortalité 2018-2020 (PDF, in French)", url: DASS_REPORT },
            { label: "IARC: GLOBOCAN 2024 fact sheet, New Caledonia (PDF)", url: IARC_FACTSHEET },
          ],
        },
        {
          id: "particular-cancers",
          title: "Thyroid cancer, mesothelioma and cervical cancer have each drawn particular study",
          plain:
            "Researchers have long reported very high thyroid cancer rates in New Caledonia, partly explained by better detection of small tumours. Mesothelioma, a cancer of the lining of the lung, has been linked to a natural rock, serpentinite, used on roads in some areas. Cervical cancer is about twice as common as in mainland France.",
          detail:
            "Truong and colleagues studied all 498 thyroid cancers diagnosed in 1985 to 1999, called the incidence the highest reported in the world at that time, about ten times that of most developed countries, and found the sharp rise partly related to detection of small carcinomas; incidence in Melanesian women in the Loyalty Islands was twice that elsewhere in 1995 to 1999. Baumann and colleagues analysed the 109 mesotheliomas recorded by the registry from 1984 to 2008 and found serpentinite on roads to be the greatest environmental risk factor, with the highest incidence in the Houaïlou area. The Agence sanitaire et sociale says cervical cancer is the fifth most frequent cancer in women, with a standardised incidence 1.9 times mainland France's and 2.49 times that of Australia or New Zealand. A study of 162 childhood cancers from 1994 to 2012 found incidence no different from France's. The thyroid and mesothelioma studies describe earlier decades.",
          links: [TRUONG_2007, BAUMANN_2011, { label: "ASS-NC: cervical cancer in New Caledonia (in French)", url: ASS_CERVIX }, HARTMANN_2018],
        },
      ],
      tables: [
        {
          id: "nc-factsheet",
          title: "IARC's estimate for New Caledonia, 2024, by cancer",
          caption: "Estimated new cancers and deaths in 2024, both sexes, from IARC's GLOBOCAN 2024 fact sheet. Incidence is projected from the registry; deaths are modelled.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "All cancers", cases: 1139, deaths: 468 },
            { site: "Lung", cases: 190, deaths: 139 },
            { site: "Breast", cases: 174, deaths: 38 },
            { site: "Prostate", cases: 170, deaths: 21 },
            { site: "Colorectum", cases: 88, deaths: 30 },
            { site: "Thyroid", cases: 41, deaths: 2 },
            { site: "Liver", cases: 37, deaths: 32 },
            { site: "Bladder", cases: 36, deaths: 12 },
            { site: "Stomach", cases: 34, deaths: 26 },
            { site: "Non-Hodgkin lymphoma", cases: 33, deaths: 11 },
            { site: "Corpus uteri", cases: 32, deaths: 4 },
            { site: "Leukaemia", cases: 32, deaths: 11 },
            { site: "Pancreas", cases: 31, deaths: 24 },
            { site: "Melanoma of skin", cases: 27, deaths: 3 },
            { site: "Cervix uteri", cases: 26, deaths: 11 },
          ],
          note: "IARC gives 612 new cancers in men and 527 in women, and 275 and 193 deaths. Its deaths are modelled from ratios taken from neighbouring countries' registries, not counted in New Caledonia.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, New Caledonia (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "nc-registry",
          title: "What the registry counted, 2020 to 2022",
          caption: "New cancers and cancer deaths over three years, both sexes, summed by OnCo from the rows for all ages in the registry's open dataset: the thirteen sites with the most new cancers, and the cervix.",
          columns: [
            { key: "site", label: "Cancer site" },
            { key: "cases", label: "New cancers, 3 years", numeric: true },
            { key: "deaths", label: "Deaths, 3 years", numeric: true },
          ],
          rows: [
            { site: "All cancers", cases: 3317, deaths: 1390 },
            { site: "Breast", cases: 582, deaths: 123 },
            { site: "Bronchus and lung", cases: 500, deaths: 351 },
            { site: "Prostate", cases: 419, deaths: 45 },
            { site: "Colon and rectum", cases: 279, deaths: 93 },
            { site: "Body of the uterus", cases: 169, deaths: 20 },
            { site: "Pancreas", cases: 119, deaths: 91 },
            { site: "Lip, mouth and pharynx", cases: 99, deaths: 32 },
            { site: "Thyroid", cases: 98, deaths: 11 },
            { site: "Non-Hodgkin lymphoma", cases: 94, deaths: 26 },
            { site: "Stomach", cases: 88, deaths: 60 },
            { site: "Melanoma of skin", cases: 87, deaths: 6 },
            { site: "Leukaemia", cases: 86, deaths: 35 },
            { site: "Liver and intrahepatic bile ducts", cases: 75, deaths: 76 },
            { site: "Cervix", cases: 43, deaths: 28 },
          ],
          note: "The dataset holds one row per year, sex, age band, site and indicator, with new cancers from 2008 and deaths from 2009; the DASS dates its dashboard's last update to 30 September 2025. Its total for 2018 to 2020 (3,208 new cancers, about 1,069 a year) is slightly higher than the averages in the registry's report for those years (532 a year in men and 523 in women, which OnCo adds to 1,055); the report says it used data consolidated at 31 December 2023. Kidney (74 new cancers) and bladder (56) fall between liver and cervix and are not shown. Non-melanoma skin cancers are not registered. The report says its deaths come from the territory's register of medical causes of death, not from the cancer registry's own notifications.",
          sources: [
            { label: "Registre du cancer de Nouvelle-Calédonie: open data, incidence and mortality 2008 to 2022", url: OPEN_DATA },
            { label: "DASS-NC: cancer dashboard and registry page (in French)", url: DASS_CANCER },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a registry since 1977, kept by the health directorate",
      aside: { label: "DASS-NC: cancer and the cancer registry (in French)", url: DASS_CANCER },
      cards: [
        {
          id: "registry-dass",
          title: "Cancer has been notifiable since 1994, and the registry publishes a dashboard and open data",
          plain:
            "New Caledonia's cancer registry began in 1977 as an office of cancer statistics in the health service, passed to the Institut Pasteur de Nouvelle-Calédonie in 1985 and to the government's Direction des Affaires Sanitaires et Sociales (DASS) in January 2011. Since 1994 doctors and laboratory biologists have been required to report every cancer. The registry publishes an online dashboard, updated in September 2025, and its figures as open data.",
          detail:
            "The registry records all invasive tumours, all blood cancers, all tumours of the central nervous system, and in situ tumours of the breast, bladder, colon, cervix and melanoma; non-melanoma skin cancers have not been recorded since incidence year 2009. Its sources include the two pathology laboratories, the hospitals' activity data, the oncology network ONCO NC, the CAFAT, the Agence sanitaire et sociale, specialist doctors and the radiotherapy centre. It holds an authorisation from the French data protection authority, and patients have a right of access to their record. The registry's report for 2018 to 2020 projects cases and deaths to 2028 to 2030 and thanks the French network of cancer registries and Unicancer's overseas group for support. IARC uses the registry for its incidence estimate.",
          links: [
            { label: "DASS-NC: cancer and the cancer registry (in French)", url: DASS_CANCER },
            { label: "DASS-NC: registry report, incidence and mortality 2018-2020 (PDF, in French)", url: DASS_REPORT },
            { label: "Registre du cancer de Nouvelle-Calédonie: open data", url: OPEN_DATA },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: the CAFAT's unified health insurance",
      aside: { label: "CAFAT: long-illness insurance (in French)", url: CAFAT_ALM },
      cards: [
        {
          id: "cafat",
          title: "Cancer is a long illness, covered at 100% apart from a 10% charge on doctor visits",
          plain:
            "New Caledonia's social security fund, the CAFAT, runs the territory's unified health insurance, the RUAMM. Cancers are among 32 conditions it recognises as long illnesses. For these, care and treatment related to the illness are covered at 100%, with one exception: the patient pays 10% of the cost of medical consultations.",
          detail:
            "The CAFAT's page gives an example: on a consultation of 4,150 Pacific francs the fund pays 3,735 and the patient 415. The 32 long illnesses are defined by regulation and include cancers, heart attack, severe high blood pressure, tuberculosis and some forms of diabetes. WHO publishes no health spending rows for New Caledonia. A comparison table in the French inspectorates' 2019 report on French Polynesia puts New Caledonia's current health spending at 3,132 euros per person in 2015, against 3,900 in mainland France, and 10.8% of its economic output. The competition authority's 2022 opinion on medicines gives 381,855 Pacific francs per person in 2017, against 483,974 in mainland France, and says that in 2019 the RUAMM paid more than 66% of health spending, the provinces 20% through medical aid and complementary insurers 8%, leaving households to pay on average 5% directly; its footnote sources that split to a report of the Cour des comptes on the CAFAT that it marks as confidential, so the figure cannot be checked further. Organised cervical screening is paid by a separate public health fund whatever a woman's cover.",
          links: [
            { label: "CAFAT: assurance longue maladie (in French)", url: CAFAT_ALM },
            { label: "CAFAT: the RUAMM (in French)", url: CAFAT_RUAMM },
            { label: "IGAS, IGA and IGF: report on French Polynesia with a comparison table for New Caledonia (April 2019, PDF, in French)", url: IGAS_2019 },
            { label: "Autorité de la concurrence de la Nouvelle-Calédonie: opinion 2022-A-01, paragraphs 25 and 262 on health spending (PDF, in French)", url: ACNC_2022 },
            { label: "WHO: out-of-pocket share query for New Caledonia (data API, no rows)", url: WHO_OOP_API },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Medicines: local pharmacy law, and what the competition authority says about authorisation",
      aside: { label: "Autorité de la concurrence de la Nouvelle-Calédonie: opinion 2022-A-01 on the medicines supply chain (PDF, in French)", url: ACNC_2022 },
      cards: [
        {
          id: "medicines-rules",
          title: "New Caledonia writes its own pharmacy rules, and its competition authority says marketing authorisation is a matter for mainland France",
          plain:
            "New Caledonia has its own version of the public health code for medicines, and its health directorate, the DASS, oversees pharmacists and wholesalers. The territory's competition authority wrote in 2022 that the procedure for authorising a medicine for sale belongs to mainland France. Reimbursable medicines for pharmacies come only from mainland France.",
          detail:
            "Délibération n° 44 of 30 December 2004 replaced the articles defining medicines in the public health code as applied in New Caledonia; it says the pharmacopoeia comprises the European and the French pharmacopoeias. The Autorité de la concurrence's opinion of 28 February 2022 says: \"la procédure d’autorisation de mise sur le marché du médicament relève de la métropole\", and that regulatory, language, customs and logistics barriers stop Australia and New Zealand serving as alternative sources. The customs code's list of goods needing a health import authorisation exempts pharmaceutical specialities with a marketing authorisation \"délivrée par l’agence nationale de sécurité du médicament et des produits de santé ou par l’agence européenne des médicaments\". The same opinion says the marketing authorisation of medicines sold in New Caledonia is \"délivrée très généralement par les autorités sanitaires nationale (française) ou européenne\", that a medicine can be sold in New Caledonia at the same time as in mainland France, and that the DASS is competent to issue administrative import authorisations for certain health products that have no French or European marketing authorisation, 153 of them in 2019. OnCo did not read the legal provisions behind these statements, so this page does not say that a French or European authorisation is by itself enough for a medicine to be supplied in New Caledonia, and it did not establish what the CAFAT reimburses; the hospital pharmacy can say whether a given medicine is available.",
          links: [
            { label: "Autorité de la concurrence de la Nouvelle-Calédonie: opinion 2022-A-01 (28 February 2022, PDF, in French)", url: ACNC_2022 },
            { label: "Juridoc: Délibération n° 44 of 30 December 2004 on medicines (PDF, in French)", url: DELIB_44 },
            { label: "Douanes de Nouvelle-Calédonie: annex 1-15, goods needing a health import authorisation (PDF, in French)", url: DOUANE_ANNEX },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and HPV vaccination",
      aside: { label: "ASS-NC: cervical cancer in New Caledonia (in French)", url: ASS_CERVIX },
      cards: [
        {
          id: "screening-programmes",
          title: "Free breast and cervical screening by invitation",
          plain:
            "The Agence sanitaire et sociale de la Nouvelle-Calédonie (ASS-NC) runs two organised screening programmes. Women aged 50 to 74 can have a free mammogram every two years on presenting an invitation. Women aged 25 to 65 are invited for free cervical screening: a smear every three years from 25 to 30, then an HPV test every five years from 30 to 65.",
          detail:
            "The agency's pages say the invitation, sent by post, serves as the prescription, and that organised cervical screening is free whatever the woman's social cover, financed by the Fonds Autonome de Compensation en Santé Publique. A woman who uses a doctor's prescription in place of the invitation is treated as individual screening and pays or advances the cost. Women who have not received an invitation can ask for one through a form on the agency's site. The agency gives the median age at cervical cancer diagnosis as 54 in 2018 to 2020 and encourages screening to continue after 50. OnCo found no published participation rate for either programme.",
          links: [
            { label: "ASS-NC: who organised cervical screening is for (in French)", url: ASS_CERVIX_WHO },
            { label: "ASS-NC: breast cancer screening, asking for an invitation (in French)", url: ASS_BREAST },
            { label: "ASS-NC: cervical cancer in New Caledonia (in French)", url: ASS_CERVIX },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccination in secondary schools, for girls since 2015 and boys since 2023",
          plain:
            "New Caledonia's HPV vaccination programme was created in 2011. Since 2015 the vaccine has been offered free in secondary schools to girls aged 12, with catch-up to 19. In 2022 the government proposed paying in full for vaccination of all children aged 9 to 14, boys included, and a school campaign open to boys was announced to begin on 25 September 2023. Parents must give written consent. WHO's immunisation data record a first dose for 40% of girls and 32% of boys in the 2024 target group.",
          detail:
            "The government's note of 21 July 2022 describes cervical cancer as the sixth most frequent cancer in the territory, about twice as frequent as in mainland France or Australia, and sets the proposal against Australian coverage of 80% of girls and 75% of boys aged 15. The 2023 campaign was run with the ASS-NC, the education authority and private schools for pupils born in 2011. The agency's site announces the 2026 school campaign as the tenth and dates the school programme to 2016, a year later than the government's notes; it says the vaccine has been on the territory's schedule for girls since 2011 and for boys since 2022, and that a French recommendation of May 2025 to extend catch-up to age 26 has been passed to the DASS and the CAFAT for study. Neither the government notes nor the agency's pages give a coverage rate. WHO's immunisation data do: for 2024 they record 828 first doses in a target group of 2,059 girls (40%) and 557 final doses (27%), and 693 first doses (32%) and 489 final doses (22%) in a target group of 2,174 boys; for 2023, 890 first doses among 1,894 girls (47%) and 484 among 2,016 boys (24%). These are administrative figures reported to WHO, doses given divided by a target population, not a survey.",
          links: [
            { label: "Gouvernement de la Nouvelle-Calédonie: HPV vaccination extended to boys aged 9 to 14 (21 July 2022, PDF, in French)", url: GOUV_HPV_2022 },
            { label: "Gouvernement de la Nouvelle-Calédonie: HPV vaccination open to boys in secondary schools (30 August 2023, PDF, in French)", url: GOUV_HPV_2023 },
            { label: "ASS-NC: cervical cancer in New Caledonia (in French)", url: ASS_CERVIX },
            { label: "ASS-NC: the 2026 school HPV vaccination campaign, the tenth (17 March 2026, in French)", url: ASS_HPV_2026 },
            { label: "WHO: HPV vaccination coverage rows for New Caledonia (data API)", url: WHO_HPV_API },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy at the Médipôle, and evacuation abroad",
      aside: { label: "CAFAT: your EVASAN pathway in Sydney (in French)", url: CAFAT_SYDNEY },
      cards: [
        {
          id: "radiotherapy",
          title: "A radiotherapy centre housed in the territorial hospital; IAEA's directory lists no centre",
          plain:
            "The IAEA's Directory of Radiotherapy Centres has no entry for New Caledonia. The Centre de radiothérapie de Nouvelle-Calédonie describes itself as housed within the Médipôle de Koutio, the territorial hospital's site, and says, in the future tense, that it will have two particle accelerators and a dedicated CT scanner. The page is written as a description of a project, so it may not describe the service as it runs today.",
          detail:
            "The centre's page says it hosts the oncology network ONCO NC, that the multidisciplinary cancer meetings for gynaecology, urology, head and neck, endocrinology, gastroenterology and pneumology will be held there, and that the project is to fit with the nuclear medicine offered by what it calls the future Île Nou Magnin clinic. Two other sources name the centre as a working body: ONCO NC gives its own seat as the radiotherapy centre within the Médipôle, and the registry's report for 2018 to 2020 thanks the Centre de Radiothérapie de Nouvelle-Calédonie among the partners that contribute to registering cancers. The territorial hospital, the Centre Hospitalier Territorial Gaston-Bourret, has an oncology unit. A written question put to the French government in March 2024 by a deputy for New Caledonia said that PET scanning could not be done in the territory, and that Guadeloupe, Martinique, La Réunion and French Polynesia had PET scanners while New Caledonia did not. OnCo found no current public statement of the centre's equipment, staffing or waiting times; the treating team or ONCO NC can say what is given locally.",
          links: [
            { label: "Centre de radiothérapie de Nouvelle-Calédonie (in French)", url: CRNC },
            { label: "ONCO NC: who we are (in French)", url: ONCO_NC_ABOUT },
            { label: "DASS-NC: registry report, incidence and mortality 2018-2020, acknowledgements (PDF, in French)", url: DASS_REPORT },
            { label: "CHT Gaston-Bourret: oncology unit (in French)", url: CHT_ONCO },
            { label: "Assemblée nationale: written question n° 16562 on heavy medical equipment in New Caledonia (26 March 2024, in French)", url: AN_16562 },
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
          ],
        },
        {
          id: "evasan",
          title: "EVASAN: evacuation to Sydney or mainland France, after a medical commission examines the request",
          plain:
            "When care cannot be given in New Caledonia, the patient's doctor asks the CAFAT for a medical evacuation, known as EVASAN, and a medical commission examines the request. The CAFAT publishes a pathway for patients sent to Sydney and another for those sent to mainland France, each with a guide to the steps.",
          detail:
            "The CAFAT's pages say that a patient who must return home urgently for personal reasons should contact its EVASAN service, which seeks approval from the fund's medical control, and that the journey is then at the patient's expense. In Sydney, unplanned urgent care outside the evacuation can be paid directly at 100% if the patient signs an undertaking to repay any difference from New Caledonian rates. The deputy's written question of March 2024 put spending on evacuations at 42 million euros in 2022, up 18% on the year before; that is a figure cited in a parliamentary question, not an audited account. The hospital lists an association of volunteers who help evacuated Caledonians. OnCo found no published count of cancer patients evacuated or of the treatments they travel for.",
          links: [
            { label: "CAFAT: your EVASAN pathway in Sydney (in French)", url: CAFAT_SYDNEY },
            { label: "CAFAT: your EVASAN pathway in mainland France (in French)", url: CAFAT_METROPOLE },
            { label: "Assemblée nationale: written question n° 16562 (26 March 2024, in French)", url: AN_16562 },
            { label: "CHT Gaston-Bourret: oncology unit and patient associations (in French)", url: CHT_ONCO },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What New Caledonia does",
      title: "What New Caledonia does differently",
      cards: [
        {
          id: "open-data",
          title: "The registry's counts are published as open data, row by row",
          plain:
            "New Caledonia's cancer registry publishes its incidence and mortality figures as an open dataset on the government's data portal: 7,250 rows giving, for each year from 2008 to 2022 (deaths from 2009), the number of cases or deaths, the median age and the standardised rate by sex, age band and cancer site. Anyone can download it and check the totals on this page.",
          detail:
            "The dataset sits beside an interactive dashboard that the DASS last updated on 30 September 2025, and the registry asks that its figures be cited to the dashboard. In a population of under 300,000 the numbers by site and year are small; the registry's report pools three years and tests differences statistically. The same report projects the number of cases and deaths to 2028 to 2030. Small numbers still mean that a year-to-year change for a single cancer can be chance, and the dataset carries no stage or treatment information. The portal's description says the data run to 2021, while the rows downloaded run to 2022.",
          links: [
            { label: "Registre du cancer de Nouvelle-Calédonie: open data, incidence and mortality 2008 to 2022", url: OPEN_DATA },
            { label: "DASS-NC: cancer dashboard and registry page (in French)", url: DASS_CANCER },
            { label: "DASS-NC: registry report, incidence and mortality 2018-2020 (PDF, in French)", url: DASS_REPORT },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with a site in New Caledonia (search)", url: CTGOV },
      cards: [
        {
          id: "trials-research",
          title: "No trial in OnCo's records has a site in New Caledonia",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026, no cancer trial lists a site in New Caledonia. OnCo holds a selection of trials, not the whole registry, so this is not proof that none exists. The published research read for this page is epidemiology, some of it built on the registry.",
          detail:
            "The papers read for this page are descriptive studies: thyroid cancer diagnosed from 1985 to 1999, mesothelioma and its link to serpentinite among cases the registry recorded from 1984 to 2008, and childhood cancer from 1994 to 2012. A patient who wants to know about trials should ask the treating oncologist or ONCO NC, who can say whether a French or Australian trial is open to someone treated in the territory, and whether joining would mean an evacuation.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in New Caledonia (search)", url: CTGOV },
            TRUONG_2007,
            BAUMANN_2011,
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "who-data",
      title: "WHO publishes no cancer profile or spending rows for New Caledonia",
      plain:
        "WHO's Cancer Country Profile 2020 does not exist for New Caledonia, and WHO's health expenditure database returns no rows for it. WHO's immunisation database does hold HPV coverage rows for 2023 and 2024, used above. For spending this page uses French and New Caledonian sources: the figures found are for 2015 and 2017, and the one out-of-pocket share, 5% in 2019, rests on a report that is not public.",
      detail:
        "The address where WHO publishes its 2020 cancer profiles answered 404 for New Caledonia on 16 November 2026. WHO's vaccine introduction query and three Global Health Expenditure Database indicators (out-of-pocket share, current health spending as a share of economic output, and per person) each returned an empty list for the code NCL. WHO's coverage query returns nothing under antigen names starting PRHPV and 24 rows under names starting HPV, with figures for 2023 and 2024 only. The DASS publishes health accounts for the territory, which OnCo did not read; the competition authority wrote in 2022 that the latest edition dated from 2018.",
      links: [
        { label: "WHO: Cancer Country Profile 2020 address for New Caledonia (answers 404)", url: WHO_PROFILE },
        { label: "WHO: HPV vaccination coverage rows for New Caledonia (data API)", url: WHO_HPV_API },
        { label: "WHO: out-of-pocket share query for New Caledonia (data API, no rows)", url: WHO_OOP_API },
        { label: "Autorité de la concurrence de la Nouvelle-Calédonie: opinion 2022-A-01 (PDF, in French)", url: ACNC_2022 },
      ],
    },
    {
      id: "plan-and-rates",
      title: "No cancer plan found, and no screening participation rates",
      plain:
        "OnCo did not find a cancer plan for New Caledonia; that is a search that came up empty, not a statement that none exists. No participation rate for breast or cervical screening was found either, and the only HPV vaccination coverage found is what WHO's database records, not a figure published in the territory.",
      detail:
        "The DASS, the Agence sanitaire et sociale and the government's press notes describe programmes and who is eligible, without rates. The registry report's tables and figures are images, so the 2018 to 2020 report is quoted only where it states a number in a sentence; the open dataset supplies the counts. Survival and stage at diagnosis are not in the sources read. The Agence sanitaire et sociale runs both screening programmes and the school vaccination campaign and is the body to ask for their results.",
      links: [
        { label: "ASS-NC: cervical cancer in New Caledonia (in French)", url: ASS_CERVIX },
        { label: "DASS-NC: cancer and the cancer registry (in French)", url: DASS_CANCER },
      ],
    },
    {
      id: "capacity-and-medicines",
      title: "Current radiotherapy equipment, evacuation numbers and medicine reimbursement were not established",
      plain:
        "The radiotherapy centre's page reads as a project description and carries no date. The CAFAT's pages explain the evacuation pathway but give no numbers. On medicines, this page reports what the competition authority and the customs code say; it shows no approvals count for the territory.",
      detail:
        "The statement that New Caledonia had no PET scanner comes from a parliamentary question of March 2024, closed on 11 June 2024 when the deputy's term ended, with no answer shown on the Assembly's page, and may be out of date. The CAFAT's EVASAN guides are separate documents that OnCo did not read. The competition authority's sentence about marketing authorisation is a description in an opinion on prices and supply, not a legal text; the provisions of the locally applicable public health code on authorisation were not read in full. The DASS's pharmacy inspectorate is the authority to ask.",
      links: [
        { label: "Centre de radiothérapie de Nouvelle-Calédonie (in French)", url: CRNC },
        { label: "CAFAT: your EVASAN pathway in Sydney (in French)", url: CAFAT_SYDNEY },
        { label: "Autorité de la concurrence de la Nouvelle-Calédonie: opinion 2022-A-01 (PDF, in French)", url: ACNC_2022 },
      ],
    },
  ],
  institutions: [
    "dass-new-caledonia", "cafat-new-caledonia", "ass-new-caledonia", "cht-gaston-bourret", "crnc-new-caledonia", "onco-nc-network",
    "iarc", "iaea", "who",
  ],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-truong-thyroid-cancer-new-caledonia-eur-j-cancer-prev-2007", "paper-baumann-mesothelioma-new-caledonia-ehp-2011",
    "paper-hartmann-childhood-cancer-new-caledonia-jpho-2018",
  ],
  people: [],
  how:
    "Every card was written from New Caledonia's own sources and French official documents, read in French as raw text and not through a summary: the DASS's cancer page, its registry report for 2018 to 2020 and the registry's open dataset, which OnCo summed for 2020 to 2022; the CAFAT's pages on health insurance, long illness and evacuation; the Agence sanitaire et sociale's screening pages; government press notes on HPV vaccination; the 2004 deliberation on medicines, the competition authority's 2022 opinion and the customs code's annex; the radiotherapy centre's and the hospital's pages; a written question at the French National Assembly; IARC's GLOBOCAN fact sheet; IAEA's radiotherapy directory; WHO's immunisation data; and the papers' abstracts. Trial counts are from OnCo's own copy of ClinicalTrials.gov participation data. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November, and the count on this page is unchanged.",
  verify:
    "The registry's open data run to 2022 and its written report to 2020; IARC's 2024 deaths are a model. The radiotherapy centre's page is undated, and the remark about PET scanning dates from March 2024. What the CAFAT pays depends on recognition of the long illness, and an evacuation request is examined by a medical commission: confirm both with the CAFAT before travelling.",
  verifyLinks: [
    { label: "DASS-NC: cancer and the cancer registry (in French)", url: DASS_CANCER },
    { label: "CAFAT: long-illness insurance (in French)", url: CAFAT_ALM },
    { label: "ASS-NC: cervical cancer in New Caledonia (in French)", url: ASS_CERVIX },
    { label: "IARC: GLOBOCAN 2024 fact sheet, New Caledonia (PDF)", url: IARC_FACTSHEET },
  ],
};

import type { CountryDive } from "@/data/country-dive";

/**
 * Djibouti deep dive: the hand-written cards for /countries/dj/ (wave 15). Djibouti publishes little on cancer, so
 * this page is short on purpose: IARC's modelled estimate, WHO's spending, vaccination and profile rows, three
 * hospital-based papers, the Ministry of Health's pharmaceutical policy, the Islamic Development Bank's releases on a
 * planned oncology centre, and a plain list of what was not found. Every figure was read from the raw text of its
 * source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet (PDF text), WHO's Cancer
 * Country Profile 2020 and cervical cancer profile 2021 (PDF text), WHO's Global Health Expenditure and immunisation
 * rows (data APIs), abstracts and one full text through Europe PMC's data interface, the Politique Pharmaceutique
 * Nationale 2022 and the medicines supply strategy (scanned PDFs on FAOLEX, in French, read through their text
 * layer), the Stratégie Nationale de Protection Sociale non Contributive 2023-2027 (PDF on the Journal Officiel site,
 * in French), a UN Djibouti page of June 2022 and two Islamic Development Bank releases of 2026. No Arabic-language
 * source was found. The IAEA's pages could not be read and the social security fund's site (cnss.dj) was read only at
 * its home and insurance pages by the accuracy pass; each is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/262-djibouti-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/cancer-dji-2020.pdf";
const WHO_CERVICAL = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-dji-2021-country-profile-en.pdf";
const GHO_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'DJI'";
const GHO_CHE = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'DJI'";
const GHO_GOV = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'DJI'";
const GHO_EXT = "https://ghoapi.azureedge.net/api/GHED_EXTCHE_SHA2011?$filter=SpatialDim%20eq%20'DJI'";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'DJI'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_SCHEDULE_API = "https://xmart-api-public.who.int/WIISE/MT_AD_SCHEDULER?$filter=ISO_3_CODE%20eq%20'DJI'";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'DJI'";
const ICCP_LIST = "https://www.iccp-portal.org/resources?field_n_country=DJ";
const PPN_2022 = "https://faolex.fao.org/docs/pdf/dji229457.pdf";
const SUPPLY_STRATEGY = "https://faolex.fao.org/docs/pdf/dji229461.pdf";
const SNPS = "https://www.journalofficiel.dj/wp-content/uploads/2026/04/SNPS-23-27.pdf";
const ISDB_FEB = "https://www.isdb.org/news/isdb-and-djibouti-sign-agreement-to-build-first-national-oncology-center";
const ISDB_OCT = "https://www.isdb.org/news/djiboutis-national-development-priorities-top-discussions-between-isdb-group-chairman-and-minister-of-economy-and-finance";
const UN_2022 = "https://djibouti.un.org/fr/190687-launch-prevalence-study-breast-and-cervical-cancer-and-human-papillomavirus-infection";
const QOL_DOI = "https://doi.org/10.1186/s12905-026-04755-x";
const HPV_DOI = "https://doi.org/10.1097/lgt.0000000000000240";
const EPMC = (pmid: string) => `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID%3A${pmid}&resultType=core&format=json`;
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const AFCRN_LIST = "https://afcrn.org/index.php/membership/membership-list";
const DIRAC = "https://dirac.iaea.org/";
const CTGOV = "https://clinicaltrials.gov/search?country=Djibouti&cond=cancer";
const CTGOV_API = "https://clinicaltrials.gov/api/v2/studies?query.locn=Djibouti&query.cond=cancer&pageSize=20&countTotal=true";
const MOH = "https://sante.gouv.dj/";
const CNSS_AMU = "https://cnss.dj/assurance-maladie-universelle/";

const L = {
  iarc: { label: "IARC: GLOBOCAN 2024 fact sheet, Djibouti (PDF)", url: IARC_FACTSHEET },
  profile: { label: "WHO: Cancer Country Profile 2020, Djibouti (PDF)", url: WHO_PROFILE },
  cervical: { label: "WHO: cervical cancer country profile 2021, Djibouti (PDF)", url: WHO_CERVICAL },
  breast2020: { label: "Hassan et al., breast cancer at Balbala Hospital (Ann Ital Chir 2020; Europe PMC record)", url: EPMC("33554946") },
  oeso2022: { label: "Astini et al., oesophageal carcinoma in two Djibouti hospitals (Ann Ital Chir 2022; Europe PMC record)", url: EPMC("35342103") },
  qol2026: { label: "Ali et al., quality of life of Djiboutian women with gynaecological cancers (BMC Women's Health 2026)", url: QOL_DOI },
  hpv2016: { label: "Petrelli et al., prevalence of HPV in Djibouti (J Low Genit Tract Dis 2016)", url: HPV_DOI },
  isdbFeb: { label: "Islamic Development Bank: agreement to build a National Oncology Center in Djibouti (3 February 2026)", url: ISDB_FEB },
  isdbOct: { label: "Islamic Development Bank: meeting with Djibouti's Minister of Economy and Finance (13 October 2026)", url: ISDB_OCT },
  un2022: { label: "UN Djibouti: launch of the prevalence study of breast and cervical cancer and HPV infection (9 June 2022)", url: UN_2022 },
  ppn: { label: "Ministry of Health: Politique Pharmaceutique Nationale 2022 (scanned PDF, in French, FAOLEX)", url: PPN_2022 },
  supply: { label: "Ministry of Health: medicines and pharmaceutical products supply strategy (scanned PDF, in French, FAOLEX)", url: SUPPLY_STRATEGY },
  iccp: { label: "ICCP portal: documents listed for Djibouti", url: ICCP_LIST },
  dirac: { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: DIRAC },
};

export const DJ_DIVE: CountryDive = {
  iso2: "DJ",
  iso3: "DJI",
  name: "Djibouti",
  flag: "🇩🇯",
  asOf: "2026-11-16",
  title: "Cancer in Djibouti",
  description:
    "Cancer in Djibouti from the few sources that exist: IARC's modelled estimate of 1,072 new cancers and 697 deaths in 2024, built from neighbouring countries' rates, with breast cancer first; no population-based cancer registry in WHO's 2021 profile; HPV vaccination introduced in 2025 with 10% first-dose coverage; health spending of about USD 78 a person in 2023 with 28.8% paid out of pocket; surgeons' reports of 2020 and 2022 that the country had no radiotherapy; a financing agreement for a national oncology centre signed in February 2026 and not yet in effect in October 2026; and no trial in OnCo's records with a site in the country.",
  lede:
    "Surgeons in Djibouti have published their series of breast and oesophageal cancer operations, HPV vaccination began in 2025, and the Islamic Development Bank signed financing in February 2026 for what it calls the country's first national oncology centre. WHO's 2021 profile records no population-based cancer registry. IARC's figures for the country, 1,072 new cancers and 697 deaths in 2024, are modelled from neighbouring countries' rates and are not counts, and the reports Djibouti's surgeons published in 2020 and 2022 say there was no radiotherapy in the country.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Djibouti is 1,072 new cancers and 697 deaths, an age-standardised incidence of 106.8 per 100,000 (95.2 in men, 118.9 in women). These are modelled figures, not counts. The fact sheet's data source and methods box names no country-specific source for incidence and gives the method as \"Rates based on incidence estimates or registry data from neighbouring countries\" (IARC's method code 5); for mortality it gives \"National incidence estimates applied to model-based M:I ratios (registry survival data)\" (code 3c). WHO's 2020 profile adds that the incidence estimates have a high degree of uncertainty because they are not based on a population-based cancer registry, and the mortality estimates because they are not based on any national NCD mortality data. Read these numbers as a rough scale.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer is estimated to look like in Djibouti",
      aside: L.iarc,
      cards: [
        {
          id: "shape",
          title: "About 1,070 new cancers a year by IARC's estimate, breast cancer first",
          plain:
            "IARC estimates 1,072 new cancers in Djibouti in 2024, 641 in women and 431 in men, and 697 cancer deaths. Breast cancer is estimated to be the commonest cancer and the commonest cause of cancer death. By new cases it is followed by cervical, prostate, colorectal and liver cancer. These are modelled figures built from neighbouring countries' rates, not counts.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 255 breast cancers (120 deaths), 80 cervical cancers (50 deaths), 73 prostate cancers (46 deaths), 68 colorectal cancers (36 deaths) and 54 liver cancers (54 deaths), then 51 non-Hodgkin lymphomas, 49 leukaemias and 33 oesophageal cancers. By deaths the order after breast cancer is liver (54), cervix (50) and prostate (46). The age-standardised incidence is 106.8 per 100,000 and the age-standardised mortality 71.8. The risk of developing a cancer before age 75 is 11.9%, and an estimated 1,942 people are living within five years of a diagnosis. WHO's 2020 profile estimated 37 cancers a year in children aged 0 to 14.",
          links: [L.iarc, L.profile],
        },
        {
          id: "no-registry",
          title: "No population-based cancer registry in WHO's 2021 profile; what is counted comes from hospital series",
          plain:
            "WHO's 2021 cervical cancer profile answers \"No\" to whether a population-based cancer registry exists in Djibouti, and the African Cancer Registry Network's member list names none. The counts that exist are surgeons' series: 102 women with breast cancer at Balbala Hospital from 2012 to 2017, and 159 patients with oesophageal cancer at two hospitals from 2011 to 2021.",
          detail:
            "WHO's 2020 profile recorded \"No information\" on a population-based registry for 2019 and \"No coverage\" for mortality registration in 2007 to 2016. A 2026 paper on Djiboutian women with gynaecological cancers says available estimates rely mainly on international models and not on a national population-based registry. In the oesophageal series, from Balbala Hospital and the military hospital, 89 of the 159 patients were women and 60 had surgery; its authors wrote that a national cancer register is needed. In the breast series, 86 of 102 women accepted surgery. On 7 June 2022 the UN Population Fund and two ministries launched what the UN's page calls the first study of the prevalence of breast and cervical cancer and HPV infection in Djibouti, meant to inform a national cancer control strategy; OnCo found no published result, and a future pass should look for it.",
          links: [L.cervical, L.profile, L.qol2026, L.oeso2022, L.breast2020, L.un2022, { label: "African Cancer Registry Network: member registries", url: AFCRN_LIST }],
        },
      ],
      tables: [
        {
          id: "dj-globocan-sites",
          title: "The five commonest cancers in Djibouti, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024, modelled from neighbouring countries' rates.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 255, deaths: 120 },
            { site: "Cervix uteri", cases: 80, deaths: 50 },
            { site: "Prostate", cases: 73, deaths: 46 },
            { site: "Colorectum", cases: 68, deaths: 36 },
            { site: "Liver", cases: 54, deaths: 54 },
          ],
          note: "These are estimates, not registry counts: the fact sheet names no Djiboutian source for incidence and gives the method as rates from neighbouring countries. The surgeons' series from Djibouti's hospitals describe oesophageal cancer as the commonest cancer of the digestive tract they saw, which this model places eighth with 33 cases.",
          sources: [L.iarc, L.oeso2022],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care",
      cards: [
        {
          id: "spending",
          title: "About USD 78 a person on health in 2023, 28.8% of it out of pocket",
          plain:
            "Djibouti spent about 78 US dollars a person on health in 2023, according to WHO's health expenditure database, and households paid 28.8% of it out of pocket. The country has a universal health insurance scheme, the Assurance Maladie Universelle, with a solidarity fund created by decree in 2014. OnCo found no source on what it covers for cancer or for treatment abroad.",
          detail:
            "WHO's Global Health Expenditure rows give current health spending of USD 86.88 per person in 2021, 79.13 in 2022 and 77.57 in 2023, and out-of-pocket spending of 27.3%, 29.1% and 28.8% of current health spending in those years. In 2023 domestic government spending was 46.1% of the total and external funding 23.6%. The national strategy for non-contributory social protection for 2023 to 2027 says the scheme's solidarity fund was created by decree in 2014 and ties it to a health assistance programme, the Programme d'Assistance Sociale de Santé; the PDF's text layer is garbled at the verb, which OnCo reads as \"finance\". It lists a compulsory insurance arm among its acronyms, and OnCo found no mention of cancer in its readable text. The social security fund's site lists the same two arms under the scheme, and its home page and insurance page, read on 16 November 2026, do not mention cancer or treatment abroad. The Islamic Development Bank's release of February 2026 says families bear a financial and logistical burden when they seek cancer care abroad and that the planned centre is expected to lower the yearly expense of cancer treatment abroad by up to 50%, without saying who pays that expense today. A patient should ask the social security fund what is covered before travelling.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Djibouti (data API)", url: GHO_OOP },
            { label: "WHO Global Health Expenditure Database: current health expenditure per person in US$, Djibouti (data API)", url: GHO_CHE },
            { label: "WHO Global Health Expenditure Database: domestic government share, Djibouti (data API)", url: GHO_GOV },
            { label: "WHO Global Health Expenditure Database: external share, Djibouti (data API)", url: GHO_EXT },
            { label: "Ministère des Affaires Sociales et des Solidarités: Stratégie Nationale de Protection Sociale non Contributive 2023-2027 (PDF, in French)", url: SNPS },
            { label: "Caisse Nationale de Sécurité Sociale: Assurance Maladie Universelle (in French)", url: CNSS_AMU },
            L.isdbFeb,
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
          id: "dmpl",
          title: "A directorate of the Ministry of Health regulates medicines",
          plain:
            "Djibouti's national pharmaceutical policy of 2022 names the Direction du Médicament, de la Pharmacie et des Laboratoires (DMPL), a directorate of the Ministry of Health, as the main regulatory authority for medicines. Granting Djiboutian marketing authorisations is part of its remit, but the same policy says the country has no working system for registering medicines and that the directorate carries out few of its tasks. OnCo found no page of the directorate's own and no list of the cancer medicines it has authorised.",
          detail:
            "The policy says the directorate handles nearly all regulatory functions: registration, licences for pharmaceutical establishments, import authorisations, market surveillance and quality control, alongside the health services inspectorate and the central purchasing body, CAMME. The ministry's supply strategy, whose cover gives 2023 to 2027, notes that there is no national laboratory for the quality control of medicines, that the registration system was not being applied by the directorate, and that qualified staff for these tasks were short. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include Djibouti. The African Union's list dated 19 September 2023 shows no signature or ratification of the African Medicines Agency treaty by Djibouti. Both ministry documents were read through the text layer of scanned copies on FAOLEX, which is imperfect. The 2026 paper names a National Ethics Committee for Medical Research at the National Institute of Public Health as the body that reviews research; OnCo found no text on how a clinical trial is authorised.",
          links: [
            L.ppn,
            L.supply,
            { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML3 },
            { label: "African Union: signatures and ratifications of the African Medicines Agency treaty (19 September 2023, PDF)", url: AMA },
            L.qol2026,
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: L.cervical,
      cards: [
        {
          id: "hpv-2025",
          title: "HPV vaccination introduced in 2025, with 10% first-dose coverage recorded",
          plain:
            "WHO's immunisation database marks the HPV vaccine as introduced in Djibouti in 2025, nationwide and on a one-dose schedule, and records first-dose programme coverage among girls of 10% for that year. The same database shows a hepatitis B dose at birth in the schedule since 2011.",
          detail:
            "The coverage row for 2025 gives 6,465 doses against a target population of 67,018 girls, which is 10%; the rows for 2022 to 2024 mark the vaccine as not introduced. The introduction rows show hepatitis B vaccine in the schedule from 2007 and a birth dose from 2011. A study in 2014 and 2015 tested 998 women aged 16 to 64 at three health facilities and found high-risk HPV in 5.4%, with HPV16 making up 9.2% of infections, which its authors called among the lowest shares seen in similar studies. WHO's vaccination schedule row for 2025 lists a four-valent HPV vaccine given nationally to girls aged 9 in one dose, with further doses one month and five months later for girls whose immunity is weakened by HIV. OnCo found no WHO, UNICEF or ministry page on the 2025 launch or its dates, so those details are left out here; the health centre or the Ministry of Health can say where the vaccine is given.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage rows, Djibouti (data API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: vaccine introduction rows, Djibouti (data API)", url: WHO_INTRO_API },
            { label: "WHO immunisation data: vaccination schedule rows, Djibouti (data API)", url: WHO_SCHEDULE_API },
            L.hpv2016,
          ],
        },
        {
          id: "screening-who",
          title: "WHO's two profiles disagree on cervical screening",
          plain:
            "WHO's 2020 profile recorded an organised cervical screening programme by Pap smear in Djibouti in 2019 and a breast screening programme starting at age 50. WHO's 2021 cervical cancer profile answers \"No\" to whether a national cervical screening programme exists, and estimates that 5% of women aged 30 to 49 had been screened in the previous five years.",
          detail:
            "The 2020 profile gives screening participation for 2019 as 10% to 50% and early detection programmes or guidelines for 0 of the 4 cancers it asks about. The 2021 profile's estimates, for 2019, are 5% of women aged 30 to 49 screened in the last five years and 7% ever screened; it also answers \"No\" on early detection guidelines in primary care and on a defined referral system. OnCo cannot tell from the two documents which answer on the programme is right, and reports both. In the 2026 paper, 82.2% of 90 women with gynaecological cancers seen in early 2024 had advanced disease and 85.6% had cervical cancer. That paper recruited at the National Police Hospital and the Housseina Reproductive Health Centre; OnCo found no source saying where screening is offered today, so a woman could ask at either or at her health centre.",
          links: [L.profile, L.cervical, L.qol2026],
        },
      ],
    },
    {
      id: "doing",
      nav: "What stands out",
      title: "What stands out in Djibouti",
      cards: [
        {
          id: "oncology-centre",
          title: "A financing agreement for a national oncology centre was signed in February 2026",
          plain:
            "On 3 February 2026 the Islamic Development Bank and Djibouti signed a financing agreement of 26.10 million US dollars to establish what the bank calls Djibouti's first National Oncology Center. In October 2026 the two sides were still discussing the steps needed for the project to take effect.",
          detail:
            "The bank's release puts the total cost at USD 28.35 million, with USD 2.25 million from the government, and includes USD 0.40 million for peer-to-peer knowledge sharing and training. Once operating, the centre is expected to give outpatient cancer services to 6,000 people a year and inpatient services to 1,200. The release does not say where it will be built, when it will open or whether it will have radiotherapy. The bank's release of 13 October 2026 says its chairman and Djibouti's Minister of Economy and Finance reviewed the project's status and discussed measures to expedite the remaining procedures required for it to become effective. Until the centre opens, the hospitals named on this page are where the published reports place cancer care, and they or the Ministry of Health can say what has changed.",
          links: [L.isdbFeb, L.isdbOct],
        },
        {
          id: "treatment-today",
          title: "Surgery in Djibouti's hospitals; no radiotherapy reported in the country",
          plain:
            "Published reports from Djibouti describe cancer surgery at Balbala Hospital and the military hospital, and stated, in 2020 and 2022, that the country had no radiotherapy. WHO's 2021 profile recorded pathology and cancer surgery as generally available, and chemotherapy and radiotherapy as not generally available.",
          detail:
            "The 2020 breast cancer paper says there were no radiotherapy and chemotherapy facilities in Djibouti, with tamoxifen available; the 2022 oesophageal paper says there were no facilities for radiotherapy. In the 2026 paper, on women seen from February to April 2024, the table of treatments received lists chemotherapy for 50 of the 90, surgery for 12 and radiotherapy for none, and the paper says treatment data were missing for 29 to 32 women depending on the item; OnCo did not find in it where the chemotherapy was given. WHO's 2020 profile gives 0.0 external beam radiotherapy machines per 10,000 cancer patients for 2019, and the IAEA's public directory has no entry for Djibouti in its country table, read on 16 November 2026; that is what the directory lists, not proof of what exists. WHO's 2021 profile recorded no cancer centre or cancer department at tertiary level and palliative care as not generally available in primary or home-based care. On a cancer plan, the 2020 profile answered \"not in effect\" for 2019, and the ICCP portal's listing, read on 16 November 2026, held three WHO profiles and no national plan.",
          links: [L.breast2020, L.oeso2022, L.qol2026, L.cervical, L.profile, L.dirac, L.iccp],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Djibouti", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Djibouti",
          plain:
            "None of the trials in OnCo's records lists Djibouti among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search. The published research is a handful of hospital studies.",
          detail:
            "Counted from OnCo's own graph on 16 November 2026: no trial record lists Djibouti. A query of ClinicalTrials.gov's data interface the same day for cancer studies with a location in Djibouti returned a total of 0. The hospital studies OnCo read are the breast cancer series from Balbala Hospital (2020), the oesophageal cancer series from Balbala Hospital and the military hospital (2022), the HPV prevalence study of 2014 and 2015 (2016), and the quality of life study of 90 women with gynaecological cancers (2026). A 2023 review titled as an overview of cancer in Djibouti, from the country's research centre, is largely about risk factors and plant-based remedies, and OnCo took no figures from it. A future pass should look for the results of the prevalence study launched in 2022.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Djibouti", url: CTGOV },
            { label: "ClinicalTrials.gov: the same query through the data interface (total 0)", url: CTGOV_API },
            L.breast2020,
            L.oeso2022,
            L.hpv2016,
            L.qol2026,
            { label: "Abdoul-Latif et al., an overview of cancer in Djibouti (Pharmaceuticals 2023)", url: "https://doi.org/10.3390/ph16111617" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not found, not readable or blocked",
      plain:
        "OnCo did not find a national cancer plan, a cancer registry report, a list of authorised or essential cancer medicines, the insurance scheme's rules for cancer, or a current official account of where chemotherapy is given and where patients are sent abroad. It describes none of these from memory.",
      detail:
        "The IAEA's news and project pages on Djibouti returned HTTP 403 on 16 November 2026, so what the IAEA has published on a radiotherapy or oncology project is unread here. The social security fund's site failed its security certificate check at www.cnss.dj and answered at cnss.dj; its home page and its page on the insurance scheme do not mention cancer or treatment abroad, and its other pages were not read. The Ministry of Health's home page answered and carried nothing on cancer. A news site's page on the HPV vaccination launch did not load its text, and a news agency's page on the oncology centre returned HTTP 403, so neither is used. WHO's Eastern Mediterranean office page for Djibouti carried no cancer content that OnCo could read, and no Arabic-language source was found. In WHO's 2020 profile the PDF text, read again in the accuracy pass, puts 1 beside the number of treatment services (surgery, radiotherapy, chemotherapy) for 2019 and 0 beside opioid availability for 2015 to 2017; the layout of that text is loose, so OnCo builds nothing on those two rows. A future pass should read the IAEA pages, the 2022 prevalence study, the national list of essential medicines and the insurance fund's benefit rules; a reader can ask the Ministry of Health, the social security fund or WHO's country office.",
      links: [
        { label: "Ministry of Health, Djibouti", url: MOH },
        { label: "Caisse Nationale de Sécurité Sociale: Assurance Maladie Universelle (in French)", url: CNSS_AMU },
        L.iccp,
        L.dirac,
        { label: "WHO Regional Office for the Eastern Mediterranean: Djibouti", url: "https://www.emro.who.int/countries/dji/index.html" },
      ],
    },
  ],
  institutions: ["balbala-hospital-djibouti", "who", "iarc", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-hassan-breast-cancer-balbala-djibouti-aic-2020", "paper-astini-oesophageal-cancer-djibouti-aic-2022"],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 and 2021 country profiles, WHO's health expenditure and immunisation rows, four hospital-based papers through Europe PMC, the Ministry of Health's pharmaceutical policy of 2022 and its supply strategy as scanned on FAOLEX, the social protection strategy for 2023 to 2027, a UN Djibouti page and two Islamic Development Bank releases. The national documents are in French and were read in French; no Arabic-language source was found. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November, and the count on this page is unchanged.",
  verify:
    "The cancer figures on this page are modelled estimates, the service answers are WHO survey rows from 2019 to 2021, and the hospital papers describe the years they studied. The oncology centre is a project with a signed financing agreement, not a service. Anyone seeking care should ask the treating hospital or the Ministry of Health what is available now.",
  verifyLinks: [L.iarc, L.cervical, L.profile, L.isdbFeb],
};

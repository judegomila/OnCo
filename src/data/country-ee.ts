import type { CountryDive } from "@/data/country-dive";

/**
 * Estonia deep dive: the hand-written cards and tables for /countries/ee/ (wave 13). Written from Estonian primary
 * sources read raw, in Estonian and English, on 16 November 2026, every figure checked against the text of the linked
 * page, PDF or API response: the Estonian Cancer Registry's page at Tervise Arengu Instituut (TAI, the National Institute
 * for Health Development), TAI's releases of 24 September 2026 (2024 incidence), 6 July 2026 (the report "Cancer in
 * Estonia: incidence 2023, survival 2019-2023 and stage-specific incidence 2012-2023", whose tables 10 and 12 were read
 * from the PDF), 25 March 2026 (screening in 2025, with the one-page report "Vähi sõeluuringud Eestis 2025. aastal") and
 * 30 May 2025 (HPV-related cancers); TAI's statistics database through its PxWeb API (tables PK10 and SD21); the
 * Vähitõrje tegevuskava 2021-2030 (Estonian Cancer Control Plan, PDF); Tervisekassa's English pages on health insurance,
 * fees, medicines, the list of health care services and screening, its Estonian page on exceptional reimbursement, and
 * its 2026 guide to the regional expansion of lung cancer screening (PDF); the State Agency of Medicines' English pages;
 * the EMA's leaflet on the centralised procedure; the OECD and European Commission Country Cancer Profile for Estonia
 * 2025 (the copy on the Commission's European Cancer Inequalities Registry site); the Estonian Biobank's page at the
 * University of Tartu; TAI's page on the prostate early detection study; the Cancer Treatment Fund's own site; the
 * ClinicalTrials.gov API for six trials; IARC's GLOBOCAN 2024 fact sheet; the IAEA DIRAC country row; WHO's
 * immunisation data API; and the World Bank API.
 *
 * Counting conventions worth holding in mind:
 *  - incidence  Estonian Cancer Registry, table PK10, diagnoses in 2024, ICD-10 C00-C97; the all-sites figure includes
 *               non-melanoma skin cancer (C44), which GLOBOCAN's Estonian estimate barely counts
 *  - deaths     Estonian Causes of Death Register, table SD21, malignant neoplasms C00-C97
 *  - survival   relative survival for patients diagnosed 2019 to 2023; table 12 is age-standardised (ICSS), table 10 is not
 *  - screening  participation among people invited in the calendar year, from the cancer screening registry
 */
const TAI_REG = { label: "Tervise Arengu Instituut: Vähiregister (Estonian Cancer Registry)", url: "https://www.tai.ee/et/statistika-ja-registrid/vahiregister" };
const TAI_2024 = { label: "TAI: Vähijuhtude arv on püsinud eelmise aastaga samal tasemel (24 September 2026)", url: "https://www.tai.ee/et/uudised/vahijuhtude-arv-pusinud-eelmise-aastaga-samal-tasemel" };
const TAI_STAGE = { label: "TAI: värske vähiraport, staadiumid 2012 kuni 2023 (6 July 2026)", url: "https://www.tai.ee/et/uudised/tai-varske-raport-mitme-vahi-puhul-leitakse-kasvajad-uha-enam-varases-staadiumis" };
const TAI_REPORT = { label: "TAI: Cancer in Estonia, incidence 2023 and survival 2019-2023 (2026, PDF)", url: "https://www.tai.ee/sites/default/files/2026-07/cancer_in_estonia_2023.pdf" };
const PX_PK10 = { label: "TAI statistics database: table PK10, new cases of malignant neoplasms by site, sex and age group", url: "https://statistika.tai.ee/pxweb/et/Andmebaas/Andmebaas__02Haigestumus__04PahaloomulisedKasvajad/?tablelist=true" };
const PX_SD21 = { label: "TAI statistics database: table SD21, deaths by cause, sex and age group (API metadata)", url: "https://statistika.tai.ee/api/v1/en/Andmebaas/01Rahvastik/04Surmad/SD21.px" };
const PLAN = { label: "Vähitõrje tegevuskava 2021-2030 (Estonian Cancer Control Plan, PDF, with an English summary)", url: "https://www.tai.ee/sites/default/files/2021-05/V%C3%A4hit%C3%B5rje_tegevuskava_2021%E2%80%932030.pdf" };
const PLAN_PAGE = { label: "TAI: Vähitõrje tegevuskava 2021-2030", url: "https://www.tai.ee/et/valjaanded/vahitorje-tegevuskava-2021-2030" };
const TAI_CONTROL = { label: "TAI: Vähitõrje (cancer control)", url: "https://www.tai.ee/et/tervis-ja-heaolu/vahitorje" };
const TAI_SCREEN_REG = { label: "TAI: Vähi sõeluuringute register (cancer screening registry)", url: "https://www.tai.ee/et/terviseandmed/registrid/vahi-soeluuringute-register" };
const TAI_SCREEN_2025 = { label: "TAI: vähi sõeluuringutel osaleti eelmisel aastal üle 183 000 korra (25 March 2026)", url: "https://www.tai.ee/et/uudised/elupaastvatel-vahi-soeluuringutel-osales-eelmisel-aastal-ule-183-000-inimese" };
const TAI_SCREEN_PDF = { label: "TAI: Vähi sõeluuringud Eestis 2025. aastal (2026, PDF)", url: "https://www.tai.ee/sites/default/files/2026-06/vahi_soeluuringud_eestis_2025_aastal.pdf" };
const TAI_HPV = { label: "TAI: HPV põhjustab Eestis aastas üle 200 vähidiagnoosi (30 May 2025)", url: "https://www.tai.ee/et/uudised/tai-vahiraport-vaktsiiniga-valditav-inimese-papilloomiviirus-hpv-pohjustab-eestis-aastas" };
const TAI_ENV = { label: "TAI: Eesnäärmevähi varase avastamise uuring (prostate early detection study)", url: "https://www.tai.ee/et/env" };
const TK_INS = { label: "Tervisekassa: health insurance", url: "https://www.tervisekassa.ee/en/people/health-insurance" };
const TK_ABOUT = { label: "Tervisekassa: about us", url: "https://www.tervisekassa.ee/en/organisation/about-us" };
const TK_FEES = { label: "Tervisekassa: service fees and co-payments for healthcare services", url: "https://www.tervisekassa.ee/en/people/service-fees-and-co-payments-healthcare-services" };
const TK_PHARMA = { label: "Tervisekassa: pharmaceuticals", url: "https://www.tervisekassa.ee/en/people/pharmaceuticals" };
const TK_MED = { label: "Tervisekassa: medicinal products (how the discount list is amended)", url: "https://www.tervisekassa.ee/en/partner/medicinal-products" };
const TK_LIST = { label: "Tervisekassa: list of health care services", url: "https://www.tervisekassa.ee/en/partner/list-health-care-services" };
const TK_EXC = { label: "Tervisekassa: ravimite erandkorras hüvitamine (exceptional reimbursement of medicines)", url: "https://www.tervisekassa.ee/inimesele/ravimid/ravimite-erandkorras-huvitamine" };
const TK_SCREEN = { label: "Tervisekassa: screenings", url: "https://www.tervisekassa.ee/en/people/screenings" };
const TK_COLON = { label: "Tervisekassa: colon cancer screening", url: "https://www.tervisekassa.ee/en/people/health-prevention/colon-cancer-screening" };
const TK_LUNG = { label: "Tervisekassa: riikliku kopsuvähi sõeluuringu piirkondliku laienemise tegevusjuhend 2026 (PDF)", url: "https://tervisekassa.ee/sites/default/files/riikliku_kopsuvahi_soeluuringu_piirkondliku_laienemise_tegevusjuhend_2026.pdf" };
const SAM = { label: "Ravimiamet (State Agency of Medicines): about the agency", url: "https://www.ravimiamet.ee/en/agency-and-contact/about-state-agency-medicines" };
const SAM_CUP = { label: "Ravimiamet: compassionate use programme", url: "https://www.ravimiamet.ee/en/medicines/marketing-authorisations/compassionate-use-program" };
const SAM_TRIALS = { label: "Ravimiamet: statistics on clinical trials", url: "https://www.ravimiamet.ee/en/statistics/statistics/statistics-clinical-trials" };
const EMA_LEAFLET = { label: "EMA: applying for EU marketing authorisation (leaflet, 2015, PDF)", url: "https://www.ema.europa.eu/en/documents/leaflet/applying-european-union-marketing-authorisation-medicinal-products-human-use_en.pdf" };
const OECD = { label: "OECD and European Commission: Country Cancer Profile, Estonia 2025 (PDF on the European Cancer Inequalities Registry site)", url: "https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-ee-2024-1665-en.pdf" };
const FUND = { label: "Vähiravifond Kingitud Elu (Cancer Treatment Fund)", url: "https://kingitudelu.ee/" };
const BIOBANK = { label: "University of Tartu, Institute of Genomics: Estonian Biobank", url: "https://genomics.ut.ee/en/content/estonian-biobank" };
const FACTSHEET = { label: "IARC, GLOBOCAN 2024: Estonia fact sheet (PDF)", url: "https://gco.iarc.who.int/media/globocan/factsheets/populations/233-estonia-fact-sheet.pdf" };
const DIRAC = { label: "IAEA DIRAC: radiotherapy centres by country", url: "https://dirac.iaea.org/Query/Countries" };
const WHO_HPV = { label: "WHO immunisation data API: HPV programme coverage, Estonia", url: "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20%27EST%27%20and%20startswith%28ANTIGEN%2C%27PRHPV%27%29" };
const WB = (code: string, label: string) => ({ label: `World Bank: ${label}, Estonia`, url: `https://data.worldbank.org/indicator/${code}?locations=EE` });
const CT = (nct: string) => ({ label: `ClinicalTrials.gov: ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });

export const EE_DIVE: CountryDive = {
  iso2: "EE",
  iso3: "EST",
  name: "Estonia",
  flag: "🇪🇪",
  asOf: "2026-11-16",
  title: "Cancer in Estonia",
  description:
    "Cancer in Estonia read from Estonian sources: the national cancer registry's 2024 counts and survival for 2019 to 2023, the health insurance fund that pays for care and what patients pay themselves, how new cancer medicines are approved through the EU and added to Estonia's reimbursement lists, the cancer control plan for 2021 to 2030, three screening programmes with their 2025 participation, HPV vaccination, radiotherapy in Tallinn and Tartu, and trials with Estonian sites.",
  lede:
    "Estonia has registered every cancer diagnosed in the country since 1968, pays for most care through one national health insurance fund, runs three organised screening programmes from a single screening registry, and has a cancer control plan for 2021 to 2030, one of whose aims is survival equal to that of the Nordic countries.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Estonia is 8,363 new cancers (4,451 in men, 3,912 in women) and 4,094 deaths, at age-standardised rates of 280.2 and 109.5 per 100,000 on the World standard population. IARC's fact sheet gives its sources as the national registry for incidence and WHO's national mortality data for deaths, in both cases with trends in national rates projected to 2024, so these are projections built on Estonia's own data and not counts. The Estonian Cancer Registry's own count for 2024 is 9,926 new cancers. Most of the difference is skin cancer other than melanoma: the registry counts 1,754 such cases, while GLOBOCAN's total includes 235 (OnCo's subtraction of the fact sheet's two all-cancers rows, 8,363 and 8,128). Without them the two figures are 8,172 (registry) and 8,128 (GLOBOCAN). Individual sites can still differ: the registry's bladder row (C67) holds 176 cases against GLOBOCAN's 329, and OnCo has not established why. The Estonian Causes of Death Register recorded 3,508 deaths from cancer in 2024, below GLOBOCAN's projected 4,094. Compare like with like.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Estonia, from the national registry",
      aside: TAI_REG,
      cards: [
        {
          id: "registry-2024",
          title: "9,926 new cancers registered in 2024, and 3,508 deaths",
          plain:
            "The Estonian Cancer Registry recorded 9,926 new cancers diagnosed in 2024: 4,956 in men and 4,970 in women. Prostate cancer was the commonest in men, with 1,418 cases. In women, skin cancer other than melanoma was counted most often and breast cancer next, with 969 cases. In the same year 3,508 of the 15,530 deaths in Estonia were recorded as caused by cancer.",
          detail:
            "The registry is kept by Tervise Arengu Instituut (TAI, the National Institute for Health Development) and published the 2024 figures on 24 September 2026. Its total includes 1,754 skin cancers other than melanoma; without them the count is 8,172. More than half of all new cases were in people aged 70 or older; 22 were in children aged 0 to 14 and 37 in people aged 15 to 24. TAI says the rise of about 90 breast cancers on the year before can probably be linked to a wider screening group, since women aged 70 and 74 were invited for the first time in 2024. The registry's head, Margit Mägi, said that since 2020 the age-standardised rate of lung cancer has fallen in men and stayed stable in women, that the rise in bowel cancer appears to have stopped in both sexes, and that cervical cancer continues to fall. The figures can still change: the database now holds 9,940 cases for 2023, which was first published as 9,843. Deaths come from the Estonian Causes of Death Register, also at TAI: 1,870 men and 1,638 women died of cancer in 2024, among them 586 from lung cancer, 418 from cancer of the colon, rectum and anus, 277 from pancreatic cancer and 239 from stomach cancer. The register holds 3,620 cancer deaths for 2025.",
          links: [TAI_2024, PX_PK10, PX_SD21, TAI_REG],
        },
        {
          id: "registry-how",
          title: "A national registry with data from 1968",
          plain:
            "Every doctor in Estonia who diagnoses or treats cancer is required to report it to the cancer registry, which holds every case diagnosed since 1968. The registry follows each person for life, adds data from the population register and the causes of death register, and regularly compares its records with the databases of two large hospitals and of Tallinn Children's Hospital.",
          detail:
            "The registry's own page says it has recorded in situ tumours since 1994 and, since 1998, benign and uncertain tumours of the brain and central nervous system; these are reported separately from the C00-C97 cancers counted on this page. Pathologists and forensic doctors report as well as clinicians. The registry compares its database regularly with those of Põhja-Eesti Regionaalhaigla (North Estonia Medical Centre), Tartu Ülikooli Kliinikum (Tartu University Hospital) and Tallinna Lastehaigla (Tallinn Children's Hospital). It has belonged to the International Association of Cancer Registries since 1989 and the European Network of Cancer Registries since 1994, and its data go into IARC's Cancer Incidence in Five Continents and GLOBOCAN and into the European Cancer Information System. It states that final incidence statistics are published about two years after the end of the year of diagnosis, because notifications about one person arrive from several providers and often well after the diagnosis. In 2023, 92 per cent of cancers were confirmed by microscopy, and at the end of 2023, 73,303 people were living in Estonia who had been diagnosed with a cancer at some point in their lives.",
          links: [TAI_REG, TAI_STAGE, TAI_REPORT],
        },
        {
          id: "survival",
          title: "Five-year relative survival of 66 per cent for people diagnosed in 2019 to 2023",
          plain:
            "For everyone diagnosed with cancer in Estonia in 2019 to 2023, relative survival was 79 per cent at one year, 66 per cent at five years and 62 per cent at ten years. Leaving out skin cancer other than melanoma, the figures were 75, 60 and 54 per cent. For most cancers, survival was higher in women than in men.",
          detail:
            "The figures come from TAI's report Cancer in Estonia, published in 2026. Relative survival compares the survival of people with cancer with that expected in the general population of the same age and sex. Five-year relative survival was 95 per cent for prostate cancer, 84 per cent for breast cancer in women, 63 per cent for both colon and rectal cancer, 23 per cent for lung cancer and 7 per cent for pancreatic cancer. Comparing 2009 to 2013 with 2019 to 2023, the report says age-standardised five-year survival rose most for leukaemia (10 per cent, in the report's wording) and for lung and kidney cancer (8 per cent each). In 2023, 16 per cent of men and 15 per cent of women already had distant metastases when their cancer was diagnosed. The report finds Estonian survival comparable with the Nordic countries (its table shows Finland and Denmark) for stomach, pancreatic, lung, cervical, ovarian, prostate and testicular cancer and Hodgkin lymphoma, and names the largest gaps as non-Hodgkin lymphoma and cancers of the lip, mouth and throat, followed by colon and rectal cancer, melanoma, and breast and womb cancer. These are averages across everyone diagnosed and say nothing about any one person's outlook.",
          links: [TAI_REPORT, TAI_STAGE],
        },
        {
          id: "globocan-method",
          title: "IARC's estimate is a projection of Estonia's own registry data",
          plain:
            "IARC's GLOBOCAN 2024 gives Estonia 8,363 new cancers and 4,094 cancer deaths in 2024, and 25,470 people alive within five years of a diagnosis. The first two are projections from Estonian national data, and the figure for new cancers sits close to the registry's own count once skin cancer other than melanoma is set aside. The third is calculated with ratios taken from the Nordic countries.",
          detail:
            "The fact sheet's methods box reads, for incidence, country-specific data source: Registry (national), method: trends in national rates projected to 2024; and for mortality, country-specific data source: WHO (national), with the same method. Both figures therefore rest on Estonia's own national data, and neither is modelled from neighbouring countries. The five-year prevalence figure is different: the fact sheet says it is computed from incidence using prevalence ratios from the Nordic countries for 2011 to 2020, scaled by Human Development Index ratios. IARC puts the risk of developing cancer before the age of 75 at 28.4 per cent (35.6 per cent in men, 22.9 per cent in women) and the risk of dying of it before 75 at 11.9 per cent. Its five commonest cancers for Estonia are prostate (1,235 cases), colorectum (1,125), breast (891), lung (813) and stomach (413); lung cancer is its leading cause of cancer death, with 640 deaths. By OnCo's subtraction of the fact sheet's two all-cancers rows (8,363 and 8,128), IARC's all-cancers figure includes 235 non-melanoma skin cancers against the registry's 1,754, so the two totals should not be set side by side without removing them.",
          links: [FACTSHEET, PX_PK10],
        },
      ],
      tables: [
        {
          id: "sites-2024",
          title: "New cancers in Estonia by site, 2024",
          caption: "New cases of malignant neoplasms diagnosed in 2024, by sex. Counts from the Estonian Cancer Registry, table PK10, updated 24 September 2026.",
          columns: [
            { key: "site", label: "Cancer site (ICD-10)" },
            { key: "women", label: "Women", numeric: true },
            { key: "men", label: "Men", numeric: true },
          ],
          rows: [
            { site: "Prostate (C61)", women: null, men: 1418 },
            { site: "Breast (C50)", women: 969, men: 8 },
            { site: "Skin, other than melanoma (C44)", women: 1123, men: 631 },
            { site: "Trachea, bronchus and lung (C33-C34)", women: 285, men: 566 },
            { site: "Colon (C18)", women: 330, men: 295 },
            { site: "Rectum and others (C19-C21)", women: 178, men: 186 },
            { site: "Stomach (C16)", women: 170, men: 200 },
            { site: "Kidney and renal pelvis (C64-C65)", women: 124, men: 205 },
            { site: "Pancreas (C25)", women: 169, men: 153 },
            { site: "Melanoma of skin (C43)", women: 170, men: 119 },
            { site: "Corpus uteri (C54)", women: 274, men: null },
            { site: "Leukaemia (C91-C95)", women: 116, men: 134 },
            { site: "Non-Hodgkin lymphoma (C82-C85, C96)", women: 120, men: 110 },
            { site: "Bladder (C67)", women: 44, men: 132 },
            { site: "Liver and others (C22)", women: 46, men: 103 },
            { site: "Ovary (C56)", women: 131, men: null },
            { site: "Cervix uteri (C53)", women: 120, men: null },
            { site: "Brain and central nervous system (C70-C72)", women: 50, men: 58 },
            { site: "Multiple myeloma (C90)", women: 61, men: 45 },
            { site: "All sites except other skin (C00-C97 except C44)", women: 3847, men: 4325 },
            { site: "All sites (C00-C97)", women: 4970, men: 4956 },
          ],
          note: "Site names are adapted from the registry's English labels. The rows are a selection and do not add up to the totals. In situ tumours and benign tumours of the central nervous system, which the registry also records, are not in this table. The registry describes these as statistical data that may still be revised.",
          sources: [PX_PK10, TAI_2024],
        },
        {
          id: "survival-5y",
          title: "Five-year relative survival: Estonia beside Finland and Denmark",
          caption: "Age-standardised five-year relative survival, per cent, for people diagnosed in 2019 to 2023, by sex.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "sex", label: "Sex" },
            { key: "ee", label: "Estonia (%)", numeric: true },
            { key: "fi", label: "Finland (%)", numeric: true },
            { key: "dk", label: "Denmark (%)", numeric: true },
          ],
          rows: [
            { site: "Lung", sex: "Men", ee: 19, fi: 17, dk: 27 },
            { site: "Lung", sex: "Women", ee: 36, fi: 29, dk: 35 },
            { site: "Colon", sex: "Men", ee: 64, fi: 67, dk: 72 },
            { site: "Colon", sex: "Women", ee: 66, fi: 71, dk: 73 },
            { site: "Rectum", sex: "Men", ee: 64, fi: 70, dk: 72 },
            { site: "Rectum", sex: "Women", ee: 67, fi: 74, dk: 75 },
            { site: "Breast", sex: "Women", ee: 83, fi: 92, dk: 91 },
            { site: "Prostate", sex: "Men", ee: 94, fi: 94, dk: 91 },
            { site: "Cervix uteri", sex: "Women", ee: 69, fi: 70, dk: 76 },
            { site: "Corpus uteri", sex: "Women", ee: 78, fi: 83, dk: 83 },
            { site: "Ovary", sex: "Women", ee: 46, fi: 50, dk: 47 },
            { site: "Stomach", sex: "Men", ee: 30, fi: 33, dk: 32 },
            { site: "Stomach", sex: "Women", ee: 37, fi: 42, dk: 39 },
            { site: "Pancreas", sex: "Men", ee: 10, fi: 11, dk: 14 },
            { site: "Pancreas", sex: "Women", ee: 12, fi: 14, dk: 15 },
            { site: "Skin melanoma", sex: "Men", ee: 85, fi: 93, dk: 96 },
            { site: "Skin melanoma", sex: "Women", ee: 90, fi: 95, dk: 98 },
            { site: "Non-Hodgkin lymphoma", sex: "Men", ee: 57, fi: 68, dk: 80 },
            { site: "Non-Hodgkin lymphoma", sex: "Women", ee: 61, fi: 75, dk: 84 },
            { site: "Lip, oral cavity and pharynx", sex: "Men", ee: 42, fi: 66, dk: 63 },
            { site: "Lip, oral cavity and pharynx", sex: "Women", ee: 60, fi: 78, dk: 71 },
          ],
          note: "Table 12 of TAI's report Cancer in Estonia (2026), which takes the Finnish and Danish figures from its reference 15. These are age-standardised, so they differ slightly from the unstandardised figures in the report's table 10 that are quoted in the card above. Relative survival leaves out deaths from other causes.",
          sources: [TAI_REPORT],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Who pays: one national health insurance fund",
      aside: TK_ABOUT,
      cards: [
        {
          id: "tervisekassa",
          title: "Tervisekassa, the Estonian Health Insurance Fund, pays for most cancer care",
          plain:
            "Cancer care in Estonia is paid for by Tervisekassa, the national health insurance fund. People are covered if social tax is paid for them through work, or if they count as equivalent to insured persons, or under a voluntary contract; the fund says the care of children, students and pensioners is paid for by those in work. In 2024 patients paid 21.4 per cent of Estonia's health spending out of their own pockets.",
          detail:
            "Tervisekassa describes the system as built on solidarity: people in work cover the costs of children, students and pensioners, and contributions depend on income and not on health risk. Permanent residents and people with a residence permit are entitled to insurance when they work and social tax is paid for them, when they are treated as equal to insured persons, or when they sign a voluntary contract. The OECD and European Commission profile for 2025 calls the fund a semi-autonomous public body that pools most of its money through a payroll tax, with state transfers playing a growing part; it reports that in 2022 the fund paid for cancer treatment for 51,000 people at a cost of more than 171 million euros, and that cancer took 15 per cent of specialist care spending in 2023. In the World Bank's series, health spending was 7.8 per cent of GDP and 2,438 US dollars a person in 2024, the out-of-pocket share fell from 23.9 per cent in 2019 to 21.4 per cent in 2024, and government sources paid 75.8 per cent in 2023. Because cover follows employment, some residents are uninsured; screening and the investigations and treatment that follow from it have been free for them since 2021.",
          links: [TK_INS, TK_ABOUT, OECD, WB("SH.XPD.OOPC.CH.ZS", "out-of-pocket share of current health expenditure"), WB("SH.XPD.CHEX.GD.ZS", "current health expenditure as a share of GDP"), WB("SH.XPD.CHEX.PC.CD", "current health expenditure per person"), WB("SH.XPD.GHED.CH.ZS", "government share of current health expenditure"), TAI_SCREEN_PDF],
        },
        {
          id: "what-patients-pay",
          title: "What an insured patient pays: small capped fees, and 3.50 euros a prescription",
          plain:
            "A visit to the family doctor is free. A specialist may charge a visit fee of up to 20 euros, or 5 euros for groups such as pensioners and people over 63, and a hospital may charge up to 5 euros a day for at most 10 days. For a medicine on the reimbursed list at the 100 per cent rate, which covers serious and life-threatening diseases, the patient pays 3.50 euros per prescription.",
          detail:
            "Tervisekassa's fees page says the Health Insurance Act sets these maximums and that charging them is a right of the provider, not an obligation. No visit fee may be charged when a doctor refers the patient to another doctor in the same institution or to another doctor in the same specialty, or for preventive activities such as screening programmes. Medicines bought at a pharmacy are reimbursed at 50, 75, 90 or 100 per cent of a reference price after the 3.50 euro payment; where several medicines share an active ingredient, the reference is generally the second cheapest, and a patient who chooses a dearer one pays the difference. A supplementary benefit applies automatically at the pharmacy within a calendar year: once a person's own spending on reimbursed prescriptions passes 100 euros, half of the amount between 100 and 300 euros is refunded, and 90 per cent of anything above 300 euros. Cancer medicines given in hospital are not bought by the patient: they sit in the list of health care services that Tervisekassa pays the hospital for.",
          links: [TK_FEES, TK_PHARMA, TK_LIST],
        },
      ],
      tables: [
        {
          id: "prescription-rates",
          title: "Reimbursement of prescription medicines in Estonia",
          caption: "Share of the reference price that Tervisekassa pays for medicines on its reimbursed list, after the patient's payment of 3.50 euros per prescription.",
          columns: [
            { key: "rate", label: "Rate (%)", numeric: true },
            { key: "applies", label: "Applies to" },
          ],
          rows: [
            { rate: 100, applies: "Medicines for serious, life-threatening or epidemic diseases or diseases that cause severe pain; all patients under 4" },
            { rate: 90, applies: "Medicines at the 75 per cent rate when prescribed for children aged 4 to 16, people on an incapacity or old-age pension, and insured people aged 63 and older" },
            { rate: 75, applies: "Medicines mainly for treating or relieving chronic diseases" },
            { rate: 50, applies: "All other medicines on the reimbursed list" },
          ],
          note: "From Tervisekassa's page on pharmaceuticals. The patient also pays any amount above the reference price or the agreed price. The supplementary benefit described in the card above is applied on top of these rates.",
          sources: [TK_PHARMA],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Approval through the EU, and two Estonian lists that decide what is paid for",
      aside: EMA_LEAFLET,
      cards: [
        {
          id: "ema-route",
          title: "New cancer medicines are approved for Estonia through the EU",
          plain:
            "Estonia is an EU member, so every medicine with a new active substance for cancer is evaluated by the European Medicines Agency and authorised by the European Commission for all member states at once. Ravimiamet, the State Agency of Medicines, works inside that system and supervises medicines and clinical trials in Estonia.",
          detail:
            "The EMA's leaflet on the centralised procedure, dated 2015, says that all medicines from biotechnology, all advanced therapies, all designated orphan medicines and medicines containing new active substances for cancer must be evaluated by the agency. After a valid application the Committee for Medicinal Products for Human Use has up to 210 days to give its opinion, and the European Commission then has 67 days to decide; the authorisation is valid in every EU state and in Iceland, Liechtenstein and Norway. Ravimiamet was created in 1993 and is an agency under the Ministry of Social Affairs with nine departments and over 130 employees; its main office is in Tartu, with another in Tallinn. It assesses marketing authorisation and clinical trial applications, collects reports of side effects, supervises those who handle medicines, and represents Estonia on the EMA's committees. It also runs a compassionate use programme, under which a medicine that has passed at least phase 2 trials and is the subject of a centralised application, or is already authorised for another use, can be given to patients with a life-threatening disease, or a chronic or disabling one, who have no authorised option and no suitable trial.",
          links: [EMA_LEAFLET, SAM, SAM_CUP],
        },
        {
          id: "reimbursement",
          title: "Two lists: hospital medicines in the list of health care services, pharmacy medicines in the reimbursed list",
          plain:
            "An EU approval does not mean a medicine is paid for in Estonia. Cancer medicines given in hospital must be added to Tervisekassa's list of health care services, which is updated every year. Medicines collected at a pharmacy must be added to the list of reimbursed medicines, which is amended four times a year.",
          detail:
            "The list of health care services holds every service, procedure and hospital medicine in the insurance package with its price and conditions of payment. Its amendment criteria are set by the Government, and Tervisekassa says changes weigh the evidence, including medical efficacy and cost-effectiveness, against the fund's money. For the pharmacy list, the manufacturer applies and price negotiations follow; the criteria include the need for the medicine, its cost-effectiveness, and a rule that spending on medicines must not exceed 20 per cent of the health care benefits budget. Where a change could shift use or cost substantially, an advisory Committee for Medicinal Products of eight members takes part, among them representatives of doctors, family physicians, disabled people, patients, Ravimiamet and the ministry; its minutes are public. The list changes on 1 January, 1 April, 1 July and 1 October. Under section 41(8) of the Health Insurance Act, Tervisekassa can reimburse by exception a medicine taken at home that has no marketing authorisation in Estonia, or one that is already on the reimbursed list, for example for another use; a separate route covers medicines for ultra-rare diseases. The patient applies with a justification from the treating doctor, and Tervisekassa says it mostly decides within 30 days.",
          links: [TK_LIST, TK_MED, TK_PHARMA, TK_EXC],
        },
        {
          id: "access-gap",
          title: "559 days from EU approval to reimbursement, and a charity that fills part of the gap",
          plain:
            "The OECD and European Commission profile for 2025 reports that new medicines took 559 days to go from European approval to reimbursement in Estonia, against an EU average of 516 days, and that 46 per cent of a sample of newer cancer medicines with high clinical benefit were publicly reimbursed, against 59 per cent across the EU. A private fund, Kingitud Elu, pays for some treatments that are not covered.",
          detail:
            "The profile attributes the delay to longer timeframes for applications and price negotiations in a small country. Its sample was 13 indications of 10 new medicines for breast and lung cancer, measured against the reimbursement list on 1 April 2023, so the share is a snapshot from that date. It adds that for around half of newer medicines Estonia applies more restrictions on which patients are eligible than the EMA approval does, and that all 19 sampled biosimilars of bevacizumab, rituximab and trastuzumab were reimbursed, because Estonia lists by active substance and not by brand. Sihtasutus Hille Tänavsuu Vähiravifond Kingitud Elu (the Gifted Life cancer treatment fund) describes itself as a privately initiated fund whose mission is to help cancer patients whose treatment the state does not currently consider cost-effective enough, mainly by paying for modern medicines; it says more than 16,000 people and companies in Estonia donate to it every month. OnCo did not find a statement of how many patients it funds each year on the page it read.",
          links: [OECD, FUND, TK_EXC],
        },
      ],
    },
    {
      id: "plan",
      nav: "Cancer plan",
      title: "The Cancer Control Plan 2021 to 2030, and where cancer is treated",
      aside: PLAN_PAGE,
      cards: [
        {
          id: "cancer-plan",
          title: "Vähitõrje tegevuskava: fewer cancers, longer lives after diagnosis, better quality of life",
          plain:
            "Estonia's Cancer Control Plan (Vähitõrje tegevuskava) runs from 2021 to 2030. Its vision has three parts: fewer people develop cancer, people live longer and healthier lives after a diagnosis, and people living with cancer have a better quality of life. Its survival goal is to match the Nordic countries.",
          detail:
            "The plan's English summary says more than a hundred experts in 16 working groups wrote it, and TAI led the drafting. It expects the number of new cases to reach 11,000 a year by 2030, partly from an ageing population. Under prevention it commits to lowering lifestyle risks, continuing HPV vaccination for girls and extending it to boys, and setting up a central screening board. Under treatment it commits to standard patient pathways from the first doctor's appointment to the start of treatment, to concentrating diagnosis and treatment in cancer centres that offer what it calls multimodal treatment, and to a network that brings some care closer to home under those centres' coordination. Under life with cancer it commits to a needs assessment and care plan for each patient and to follow-up shared between cancer centres and family doctors. The summary calls the 2007 to 2015 strategy Estonia's only earlier national cancer strategy and says its evaluation found a lack of strategic planning. The summary, written in 2021, says the plan is to be carried out within the National Health Plan and that a first implementation plan for 2021 to 2024 would follow in the first half of 2021; OnCo did not find that document. The OECD profile notes that the plan defines waiting time limits along the pathway but that average waiting times could not yet be calculated because of gaps in data infrastructure.",
          links: [PLAN, PLAN_PAGE, TAI_CONTROL, TAI_HPV, OECD],
        },
        {
          id: "where-treated",
          title: "Two regional hospitals offer the full range of cancer treatment",
          plain:
            "As the Cancer Control Plan described it in 2021, regulation gives the right to provide the full range of cancer care, meaning surgery, medicines and radiotherapy, to Estonia's regional hospitals: Tartu Ülikooli Kliinikum (Tartu University Hospital) and Põhja-Eesti Regionaalhaigla (North Estonia Medical Centre) in Tallinn. Other hospitals give cancer medicines under special permission.",
          detail:
            "The plan, describing the position in 2020, cites the Minister of Social Affairs' regulation no. 103 of 19 August 2004 on hospital types. Under special permission, cancer medicines have been given at Ida-Tallinna Keskhaigla (East Tallinn Central Hospital) since 2007, at Pärnu Haigla since 2014, at Ida-Viru Keskhaigla since 2018 and at Kuressaare Haigla since 2020; Pärnu and Ida-Viru work with the two regional hospitals and Kuressaare with East Tallinn Central Hospital. Children's cancers are diagnosed and treated at Tartu University Hospital and Tallinna Lastehaigla (Tallinn Children's Hospital), and eye tumours at the eye clinic of East Tallinn Central Hospital. The plan notes that a considerable share of planned cancer operations for some sites was done outside the cancer centres. The OECD profile counts 56 oncologists in Estonia in 2023, about 4 per 100,000 people, adding that the number of full-time equivalents was lower, and reports a government aim to set up a national cancer centre that would seek European accreditation as a comprehensive cancer centre.",
          links: [PLAN, OECD],
        },
        {
          id: "radiotherapy",
          title: "Radiotherapy in two centres, Tallinn and Tartu",
          plain:
            "Radiotherapy is given in two places in Estonia: North Estonia Medical Centre in Tallinn and Tartu University Hospital. The IAEA's directory of radiotherapy centres lists 2 centres and 10 megavoltage treatment units for the country in a row last updated in 2026.",
          detail:
            "The IAEA DIRAC row for Estonia gives 2 radiotherapy centres, 10 in its field for megavoltage photon and electron beam units (HePhotonAndElectronBeamRt) and 3 in its brachytherapy field (BrachyTherapyIncEl). National sources are older. The Cancer Control Plan counted six linear accelerators in 2020, four in Tallinn and two in Tartu, which it put at 4.6 per million people, with one high-dose-rate brachytherapy unit in each hospital; it says the IAEA supported radiotherapy in Estonia with 2.8 million euros between 2005 and 2020. The OECD profile counted seven machines in 2023, a supply per person 35 per cent below the EU average, and says more had been bought by 2024. The plan gave an approximate estimate that 33 per cent of newly diagnosed patients, leaving out skin cancer other than melanoma, received radiotherapy in 2013 to 2017, against an international benchmark of at least 50 per cent over a lifetime, and cautions that the two figures are calculated differently. Median waits from the tumour board to the first curative treatment in 2018 were 33 days in Tallinn and 38 days in Tartu. The OECD profile says proton therapy is not available to children with cancer in Estonia and that Estonian centres arrange it through international collaboration.",
          links: [DIRAC, PLAN, OECD],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and HPV vaccination",
      aside: TK_SCREEN,
      cards: [
        {
          id: "programmes",
          title: "Three organised programmes: breast, cervix and bowel",
          plain:
            "Estonia invites people for screening by year of birth. In 2026 breast screening by mammography is for women aged 50 to 74, cervical screening with an HPV test is for women aged 30 to 65, and bowel screening with a stool test is for men and women aged 56 to 68. Screening is free for everyone in the target group, including people without health insurance.",
          detail:
            "The cancer screening registry at TAI draws up the invitation lists and Tervisekassa pays. An invitation that doubles as a referral appears in each person's health portal at the start of the year and is valid to the end of it, with notices by e-mail, text message or letter and reminders in September and October; nobody has to wait for the invitation to book. Women are not invited for breast or cervical screening within five years of a diagnosis of that cancer. After a negative HPV test a woman is invited again in five years, and the test can be taken at a clinic or with a home kit; after a negative stool test the next invitation comes in two years, and the kit is handed out by the family nurse. The lower age for bowel screening was cut from 60 to 58 in 2025 and TAI says the plan is to add one birth cohort each year until screening starts at 50. Breast screening was extended to women aged 70 and 74 in 2024 and to those aged 72 in 2025. Mammography buses travel the country on a published schedule. TAI reports that screening found 480 tumours in 2023 and that 80 per cent of them were at an early stage.",
          links: [TK_SCREEN, TK_COLON, TAI_SCREEN_REG, TAI_SCREEN_2025, TAI_2024],
        },
        {
          id: "participation",
          title: "About two in three invited people took part in 2025",
          plain:
            "In 2025, 65.2 per cent of invited women took part in breast screening and 65.2 per cent in cervical screening, and 62.3 per cent of invited men and women took part in bowel screening. Among people without health insurance the rates were 19.3, 25.0 and 18.0 per cent.",
          detail:
            "TAI's report on 2025 counts 74,372 women screened for breast cancer of about 114,000 invited, 48,619 for cervical cancer of about 75,000 invited, and 60,309 people for bowel cancer, where 66.9 per cent of invited women and 56.7 per cent of invited men took part. The report draws a target line at 70 per cent, which it labels as WHO's. Counties differ: for bowel screening Võru, Tartu, Hiiu and Põlva counties passed 70 per cent while Ida-Viru, Harju and Valga were lowest. Across the screening programmes, TAI's release says the Tallinn districts of Lasnamäe, Kesklinn and Põhja-Tallinn had lower rates than Nõmme and Pirita. TAI observes that in Harju and Ida-Viru counties, where hospitals offer mammography all year, fewer women take part than in small counties visited by a mammography bus a few times a year. An HPV infection was found in 9 per cent of the women screened. For comparison, the Cancer Control Plan records cervical screening participation of 46.1 per cent in 2019.",
          links: [TAI_SCREEN_PDF, TAI_SCREEN_2025, PLAN],
        },
        {
          id: "lung-screening",
          title: "Lung: a Tartu pilot, with a regional expansion set out for 2026",
          plain:
            "Estonia does not yet screen for lung cancer nationwide. A pilot in Tartu county, run through family doctors since 2022, offers low-dose CT scans to people aged 55 to 75 whose calculated risk of lung cancer is raised. Tervisekassa's guide for 2026 sets out an expansion region by region, with Viljandi county named as the first new region.",
          detail:
            "Tervisekassa's 2026 guide sets out the history. A feasibility study in 2021 used three family doctor practices in Tartu; the first pilot year in 2022 covered 74 family doctor lists in Tartu county and the second, in 2023 to 2024, covered 87, led by the University of Tartu and Tartu University Hospital. The second year found more cancers at an early stage than the first. Family practices contact their patients in the age group and estimate each person's risk with a model called PLCOm2012noRace, which uses age, smoking history, lung cancer in a close relative, any earlier cancer, chronic obstructive lung disease, education and body mass index; a score above 1.5 per cent counts as raised risk. Other regions and providers able to perform the scan can apply to join, and a screening steering group at the Ministry of Social Affairs decides. Tervisekassa also pays for people without insurance, including further tests and treatment. The OECD profile reports an aim of a national programme by 2027 and names a shortage of radiologists as a barrier to expansion.",
          links: [TK_LUNG, TAI_CONTROL, OECD],
        },
        {
          id: "hpv-vaccine",
          title: "HPV vaccination: girls since 2018, boys since 2024",
          plain:
            "HPV vaccination for girls joined Estonia's national schedule in 2018. Since 1 February 2024 girls and boys aged 12 to 18 are vaccinated free. WHO's figures put programme coverage in 2025 at 65 per cent of girls and 55 per cent of boys.",
          detail:
            "WHO's immunisation data, which countries report, give last-dose programme coverage in girls of 56 per cent in 2021, 42 per cent in 2022, 50 per cent in 2023, 63 per cent in 2024 and 65 per cent in 2025, and in boys of 44 per cent in 2024 and 55 per cent in 2025; no figure for boys is reported before 2024. TAI's cancer report of 2025 estimated that HPV caused 213 cancers a year in Estonia in 2018 to 2022, of which 130 were cervical, 38 of the oropharynx and 19 of the anus, and found that oropharyngeal cancer had been rising by nearly 5 per cent a year since 2005. Cervical cancer, by contrast, has fallen by about 5.5 per cent a year since 2012, which TAI attributes to screening. Tervisekassa's screening page states, without giving figures for other countries, that the prevalence of and mortality from cervical cancer in Estonia are among the highest in Europe. The registry counted 120 new cervical cancers in 2024.",
          links: [TK_SCREEN, WHO_HPV, TAI_HPV, TAI_STAGE, PLAN, PX_PK10],
        },
      ],
      tables: [
        {
          id: "participation-2025",
          title: "Screening participation in Estonia, 2025",
          caption: "Share of invited people who took part, per cent, overall and by insurance status, with the number who took part.",
          columns: [
            { key: "programme", label: "Programme" },
            { key: "all", label: "All invited (%)", numeric: true },
            { key: "insured", label: "Insured (%)", numeric: true },
            { key: "uninsured", label: "Uninsured (%)", numeric: true },
            { key: "n", label: "Took part", numeric: true },
          ],
          rows: [
            { programme: "Breast (women)", all: 65.2, insured: 67.6, uninsured: 19.3, n: 74372 },
            { programme: "Cervix (women aged 30 to 65)", all: 65.2, insured: 69.1, uninsured: 25.0, n: 48619 },
            { programme: "Bowel (men and women aged 58 to 68 in 2025)", all: 62.3, insured: 65.3, uninsured: 18.0, n: 60309 },
          ],
          note: "From TAI's report Vähi sõeluuringud Eestis 2025. aastal. The rates by insurance status are read from the report's three charts, in the order breast, cervix, bowel. The age ranges are those invited in 2025; TAI's report gives the breast screening group as 50 to 72 while its release also counts participants aged 74, so the upper age is left out of that label.",
          sources: [TAI_SCREEN_PDF, TAI_SCREEN_2025],
        },
      ],
    },
    {
      id: "doing",
      nav: "Distinctive",
      title: "What Estonia does that is worth a closer look",
      cards: [
        {
          id: "home-hpv-test",
          title: "An HPV home test inside the national programme, chosen by one in five",
          plain:
            "A woman invited for cervical screening in Estonia can take the sample herself at home instead of visiting a clinic. She orders a kit online or asks for one at a pharmacy and posts the sample free of charge. In 2025, 19 per cent of the women who took part chose the home test.",
          detail:
            "Tervisekassa states that a home HPV test and a sample taken by a health professional are equally accurate and reliable. The kit holds a sampler, instructions and a prepaid return envelope, and the sample should be posted within five days. TAI's first results from a pilot study in 2021 found that offering the choice raised participation by about 10 per cent on average, most of all where a kit was posted with the reminder. In 2025 the home test was used more by women without health insurance (27 per cent of those who took part) than overall, and by 55 per cent of uninsured participants in Hiiu county. The Cancer Control Plan set the HPV test as the first test in cervical screening from 2021. The screening registry that makes this possible pulls results electronically from the national health information system and checks them against the population, cancer and causes of death registers, all linked by each resident's personal identification code.",
          links: [TK_SCREEN, TAI_SCREEN_2025, TAI_CONTROL, TAI_SCREEN_REG, PLAN],
        },
        {
          id: "biobank",
          title: "A biobank holding about a fifth of the adult population, linked to the cancer registry",
          plain:
            "The Estonian Biobank at the University of Tartu holds genetic data from more than 210,000 people, which it puts at about 20 per cent of Estonia's adults. Its records are regularly linked with the cancer registry, the causes of death register, hospital databases and the health insurance fund's bills.",
          detail:
            "The biobank's page says every participant has been genotyped on a microarray of more than 700,000 markers and has signed a broad consent under what the page calls the Human Genetic Research Act, which also allows participants to be contacted again. Researchers at the university's Estonian Genome Centre have published more than 830 papers from it. One pilot of personalised medicine covered breast cancer and heart attack: more than 2,000 participants were given feedback on their genetic risk and were followed up by family doctors, oncologists and medical geneticists where needed. The page describes this as groundwork for bringing personalised medicine into ordinary care in Estonia, and does not report cancer outcomes from the pilot. The European Commission's CORDIS record names the University of Tartu as coordinator of UNCAN-CONNECT, a European project on shared cancer research data that OnCo records separately.",
          links: [BIOBANK, { label: "European Commission, CORDIS: UNCAN-CONNECT, project 101215206", url: "https://cordis.europa.eu/project/id/101215206" }],
        },
        {
          id: "prostate-risk",
          title: "A risk-based test of prostate cancer screening",
          plain:
            "In 2024 and 2025 Estonia tested whether prostate cancer screening could be run by individual risk. TAI says it invited 12,000 men aged 50 to 69 in Tallinn and Tartu for a PSA blood test, and sent on for further assessment those whose result was 3 ng/mL or higher, which was 7 per cent of the men who took part.",
          detail:
            "TAI ran the study with Tervisekassa, the Estonian Society of Urologists, Tartu University Hospital, North Estonia Medical Centre and East Tallinn Central Hospital. The men invited had health insurance, had not had a PSA test in the previous 12 months and had never had prostate cancer. Urologists assessed 168 men and sent 60 per cent of them for an MRI scan; 60 per cent of those scanned went on to a biopsy. Cancer was found in more than half of the men sent for a biopsy, and over half of those cancers were low-risk tumours that needed no immediate treatment and were kept under observation. TAI's summary is that a quarter of the men above the PSA threshold needed a biopsy, that a risk-based programme is feasible in Estonia and acceptable to men, and that the next step would be to test it in other counties, possibly starting with men aged 50. This was a feasibility study and not a screening programme: TAI describes Estonia's organised programmes as three, for breast, cervical and bowel cancer. The OECD profile, written while the study was under way, gave the number of invitations as more than 13,000; the 12,000 here is TAI's own figure.",
          links: [TAI_ENV, TAI_STAGE, OECD],
        },
      ],
    },
    {
      id: "research",
      nav: "Trials",
      title: "Trials with Estonian sites in OnCo's registry data",
      cards: [
        {
          id: "trials-ee",
          title: "41 trials in OnCo's data list a site in Estonia",
          plain:
            "Of the trials OnCo holds with ClinicalTrials.gov site data, 41 list at least one site in Estonia, and 9 of them had the registry status recruiting when OnCo's records were recounted on 18 November 2026, after their statuses were refreshed from the registry on 17 November. OnCo holds a selection of trials, not the whole registry, so this is a floor and not a count of every trial in the country.",
          detail:
            "Most are phase 3 trials: in OnCo's records as recounted on 18 November 2026, 37 of the 41 are phase 3, one is phase 2/3 and three are phase 2; by registry status 9 were recruiting, 15 active and no longer recruiting, 14 completed and 3 terminated. Six were checked against ClinicalTrials.gov on 16 November 2026; all six are international phase 3 trials led by companies. Where the registry names the Estonian sites, they are North Estonia Medical Centre, Tartu University Hospital, East Tallinn Central Hospital and Pärnu Haigla; one trial gives its sites by city alone. Among those recruiting: a trial of opevesostat in advanced prostate cancer (NCT06136650) lists four recruiting Estonian sites, including Pärnu Haigla; a trial of dostarlimab around surgery for a group of colon cancers (NCT05855200) lists two sites in Tallinn and one in Tartu; and a trial of darovasertib before treatment of melanoma of the eye (NCT07015190) lists East Tallinn Central Hospital, where Estonia's eye tumour care is concentrated, as a site not yet recruiting. Among completed trials, CLL14 of venetoclax with obinutuzumab in chronic lymphocytic leukaemia had sites in Tallinn and Tartu, and FRESCO-2 of fruquintinib in bowel cancer had three Estonian sites. KEYNOTE-671 of pembrolizumab around lung cancer surgery, which the registry lists as active and no longer recruiting, has one site in Tallinn. The OECD profile judges access to trials in Estonia lower than the average of other countries and suggests the cost of paperwork, ethics review and translation weighs more in a small country; it reports that 1 per cent of 436 European childhood cancer trials in 2010 to 2022 were open to under-18s in Estonia. Registry entries change; check the trial's own page before contacting a site.",
          links: [
            CT("NCT06136650"),
            CT("NCT05855200"),
            CT("NCT07015190"),
            CT("NCT02242942"),
            CT("NCT04322539"),
            CT("NCT03425643"),
            { label: "ClinicalTrials.gov: cancer studies with locations in Estonia", url: "https://clinicaltrials.gov/search?cond=cancer&country=Estonia" },
            OECD,
            { label: "OnCo trials", url: "/trials/" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "not-reached",
      title: "What OnCo could not read or verify",
      plain:
        "Several sources a reader would want behind this page could not be read as text, or were not found. They are named here so the gap is visible, with what was used instead.",
      detail:
        "Ravimiamet's page of clinical trial statistics shows its figures as charts and its text holds no numbers, so the national count of authorised cancer trials is not given. The national vaccination site redirected to a health portal page that is drawn by scripts, so county-level HPV coverage was not read and the coverage here is WHO's reported figure. No page of North Estonia Medical Centre or Tartu University Hospital on their radiotherapy departments was read (a guessed address returned an error), so the current number of linear accelerators rests on the IAEA directory row, whose field names are quoted, and on older national and OECD counts that do not agree with it. Tervisekassa's own annual report was not read; its spending figures here are as quoted by the OECD profile for 2022 and 2023. No page describing step by step how a hospital cancer medicine is assessed for the list of health care services was found, and no current count of cancer medicines waiting for a decision. The Cancer Control Plan's implementation plan for 2021 to 2024, any later one and any evaluation of progress were not found. No Tervisekassa page confirming that lung screening has begun in Viljandi county was read; the 2026 guide describes the expansion as its plan. Waiting times from referral to treatment are not published as averages, according to the OECD profile. The Cancer Treatment Fund's page did not state how many patients it supports a year. The World Bank series has no government share for 2024. Deaths in 2025 are as held in the database on the day it was read and may be provisional.",
      links: [SAM_TRIALS, { label: "Terviseportaal: vaktsineerimine", url: "https://www.terviseportaal.ee/haiguste-ennetus/vaktsineerimine" }, DIRAC, OECD, TK_LIST],
    },
    {
      id: "corpus-gaps",
      title: "What this corpus still does not hold about Estonia",
      plain: "Named so the gap is visible rather than invisible. Adding any of these would improve the page.",
      detail:
        "The corpus has no record for Tallinna Lastehaigla (Tallinn Children's Hospital), for Pärnu Haigla, Ida-Viru Keskhaigla or Kuressaare Haigla, which give cancer medicines under special permission, for the Ministry of Social Affairs, or for the University of Tartu as a university. It holds no Estonian companies and no Estonian-led trial. The lung screening pilot, the prostate early detection study and the home HPV test programme have no records of their own, and neither does the Cancer Control Plan. TAI's annual cancer reports are not held as paper records, and none of the registry's published research is linked. The Estonian Causes of Death Register appears only inside the record for TAI.",
      links: [PLAN, TAI_REG],
    },
  ],
  institutions: [
    "tervise-arengu-instituut", "estonian-cancer-registry", "estonian-cancer-screening-registry", "tervisekassa", "ravimiamet-estonia", "estonian-biobank",
    "vahiravifond-elu", "north-estonia-medical-centre", "tartu-university-hospital", "east-tallinn-central-hospital", "estonian-cancer-society",
    "eu-uncan-connect", "ema", "iarc", "iaea",
  ],
  companies: [],
  drugs: ["opevesostat", "dostarlimab", "darovasertib", "venetoclax", "obinutuzumab", "fruquintinib", "pembrolizumab"],
  trials: ["nct06136650", "nct05855200", "nct07015190", "cll14", "fresco-2", "keynote-671"],
  papers: [],
  people: ["margit-magi", "dolores-eamets", "katrin-kiisk", "priit-perens", "kristo-erikson", "tarmo-bakler"],
  how:
    "Written from Estonian sources read in Estonian and English on 16 November 2026: the Estonian Cancer Registry's page and TAI's releases on 2024 incidence, on stage and survival, on screening in 2025 and on HPV-related cancers; TAI's report Cancer in Estonia and its one-page screening report; TAI's statistics database, queried through its public API for registry counts and causes of death; the Cancer Control Plan 2021 to 2030; Tervisekassa's pages on insurance, fees, medicines, the list of health care services, exceptional reimbursement and screening, and its 2026 lung screening guide; the State Agency of Medicines' pages; the EMA leaflet on the centralised procedure; the OECD and European Commission Country Cancer Profile for Estonia 2025; the Estonian Biobank's page; TAI's page on the prostate study; the Cancer Treatment Fund's site; IARC's fact sheet; the IAEA DIRAC row; WHO's immunisation data; and the World Bank's series. Every figure was checked against the raw text of the linked page, PDF or API response, not against a summary. Trial counts come from OnCo's ClinicalTrials.gov capture, and the six trials named were checked against the registry on the same day. The entity lists are drawn from the graph by id, with new records for TAI, the cancer registry, the cancer screening registry, Tervisekassa, the State Agency of Medicines, the Estonian Biobank, the Cancer Treatment Fund and three people. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November: still 41, with the phase and status counts in the trials section taken from that recount.",
  verify:
    "Registry counts for the latest years are revised as late notifications arrive: the 2023 total has already risen since it was first published. Screening ages change each year as cohorts are added, and fees and reimbursement rules are set by law and can change. The reimbursed medicines list changes four times a year. Survival figures are averages for people diagnosed in 2019 to 2023. Nothing here is advice about an individual's care.",
  verifyLinks: [TAI_REG, PX_PK10, TAI_SCREEN_2025, TK_FEES, TK_PHARMA],
};

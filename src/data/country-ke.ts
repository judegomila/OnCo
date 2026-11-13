import type { CountryDive } from "@/data/country-dive";

/**
 * Kenya deep dive: the hand-written cards for /countries/ke/ (wave 5). Every figure was read on 11 November 2026 from
 * the raw text of its source, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Kenya (PDF text) and
 * OnCo's copy of the GLOBOCAN data; WHO's Cancer Country Profile 2020 for Kenya (PDF text); the Ministry of Health's
 * National Cancer Control Strategy 2023-2027 (the WHO Africa copy, PDF text) and its launch notice; the Cancer
 * Prevention and Control Act, 2012 and the draft Cancer Registries Rules, 2023 as hosted by the National Cancer
 * Institute of Kenya, with the Institute's own pages and its October 2026 joint notice with the Social Health
 * Authority; the Authority's benefit tariffs and premium pages; the Pharmacy and Poisons Board's pages, its marketing
 * authorisation flow chart and Legal Notice No. 100 of 2022; the World Bank's API for the WHO Global Health
 * Expenditure Database indicators; WHO's Global Health Observatory and immunization data APIs for HPV vaccination;
 * the IAEA's DIRAC country table (its public JSON); ClinicalTrials.gov participation data in OnCo's graph; and papers
 * resolved through Europe PMC, read in full text where open access. Kenya Law refused every scripted request, so the
 * Social Health Insurance Act itself was not read; that and every other unread source is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/404-kenya-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/ken-2020.pdf";
const NCCS = "https://www.afro.who.int/sites/default/files/2025-03/The%20National%20Cancer%20Control%20Strategy%20%282023-2027%29.pdf";
const NCCS_LAUNCH = "https://health.go.ke/node/614";
const NCI = "https://ncikenya.go.ke/";
const NCI_ABOUT = "https://ncikenya.go.ke/about/";
const NCI_RESEARCH = "https://ncikenya.go.ke/research/";
const NCI_RESOURCES = "https://ncikenya.go.ke/resources/";
const NCI_IACR = "https://ncikenya.go.ke/blogs/nci-k-ceo-dr-elias-melly-delivers-keynote-address-at-international-cancer-registries-conference-in-tanzania/";
const ACT_2012 = "https://uploads.ncikenya.go.ke/uploads/policy/CancerPreventionandControlAct2012.pdf";
const REG_RULES = "https://uploads.ncikenya.go.ke/uploads/regulations/The-Cancer-Prevention-and-Control-Cancer-Registries-Rules-2023.pdf-1712919245530.pdf-(1).pdf";
const JOINT = "https://uploads.ncikenya.go.ke/uploads/notices/SHA-NCI-Joint-Notice.pdf";
const INSPECTION = "https://uploads.ncikenya.go.ke/uploads/notices/NOTICE-OF-NATIONWIDE-INSPECTION.pdf";
const SHA = "https://www.sha.go.ke/";
const SHA_TARIFFS = "https://www.sha.go.ke/benefit-tariffs/";
const SHA_PREMIUM = "https://www.sha.go.ke/premium-rates/";
const SHA_ABOUT = "https://www.sha.go.ke/aboutus/";
const SHA_ECCIF = "https://www.sha.go.ke/emergency-chronic-critical-illness-fund/";
const PPB = "https://web.pharmacyboardkenya.org/";
const PPB_ABOUT = "https://web.pharmacyboardkenya.org/about-us-2/";
const PPB_PATHWAYS = "https://web.pharmacyboardkenya.org/download/marketing-authorisation-pathways/";
const PPB_RULES = "https://web.pharmacyboardkenya.org/download/pharmacy-and-poisons-registration-of-health-products-and-technologies-rules-2022/";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=KE";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS?locations=KE";
const WHO_HPV = "https://ghoapi.azureedge.net/api/SDGHPVRECEIVED?$filter=SpatialDim%20eq%20'KEN'";
const WHO_HPV_SCHEDULE = "https://xmart-api-public.who.int/WIISE/MT_HPV?$filter=ISO_3_CODE%20eq%20'KEN'";
const DIRAC = "https://dirac.iaea.org/Query/Countries";
const DIRAC_JSON = "https://dirac.iaea.org/api/DataGridWebApi/GetCountriesAndRegions";
const KORIR_2015 = "https://doi.org/10.1002/ijc.29674";
const KORIR_2016 = "https://doi.org/10.1016/j.canep.2016.11.006";
const GAKUNGA_2025 = "https://europepmc.org/article/PMC/PMC12097610";
const MWENDA_2022 = "https://europepmc.org/article/PMC/PMC9470178";
const OKETCH_2026 = "https://europepmc.org/article/PMC/PMC13354814";
const TENGE_2009 = "https://doi.org/10.4314/eamj.v86i1.46921";
const SURVCAN3 = "https://doi.org/10.1016/S2214-109X(24)00130-X";
const BARRIERS_RT = "https://doi.org/10.1002/ijc.70390";
const KENSHE_2026 = "https://doi.org/10.1038/s41467-026-72654-8";
const AFCRN = "https://afcrn.org/index.php/membership/membership-list";

export const KE_DIVE: CountryDive = {
  iso2: "KE",
  iso3: "KEN",
  name: "Kenya",
  flag: "🇰🇪",
  asOf: "2026-11-11",
  title: "Cancer in Kenya",
  description:
    "Cancer in Kenya from Kenyan sources: IARC's estimate of 35,867 new cancers in 2024 against the Nairobi and Eldoret population registries, the National Cancer Institute set up by the Cancer Prevention and Control Act of 2012, the move from the National Health Insurance Fund to the Social Health Authority and its KES 400,000 oncology limit, the Pharmacy and Poisons Board's approval routes, HPV vaccination since 2019, 19 radiotherapy machines and the 2023-2027 cancer strategy.",
  lede:
    "Kenya counts cancer through two city-based population registries, in Nairobi and Eldoret, which together cover about one person in nine, and a law of 2012 that makes every hospital notify a national cancer register within sixty days. Treatment is now paid for by the Social Health Authority, which replaced the National Health Insurance Fund and pays for cancer care only at centres certified by the National Cancer Institute of Kenya.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Kenya is 35,867 new cancers (13,914 in men and 21,953 in women) and 22,888 deaths, with an age-standardised incidence of 111.0 per 100,000 and mortality of 74.6. Its fact sheet gives the incidence source as subnational registries, with rates applied to the 2024 population (method 2b), and derives deaths from national incidence through modelled mortality-to-incidence ratios based on registry survival data from SURVCAN (method 3c), not from death certificates; WHO's 2020 profile records no coverage by mortality registration. Breast cancer is first (5,822 cases), then cervical cancer (4,294) and prostate cancer (3,601), oesophageal cancer (2,532) and colorectal cancer (2,525). Earlier editions were higher: the Ministry of Health's 2023-2027 strategy quotes GLOBOCAN 2020 at 42,116 new cases and 27,092 deaths, and WHO's 2020 profile quotes GLOBOCAN 2018 at 47,887 and 32,987. None of these sources explains the change, and OnCo does not read it as a fall in cancer. Kenya's own registries are city-based and their latest published rates are older: the Nairobi Cancer Registry's 2004 to 2008 figures give age-standardised incidence of 161 per 100,000 in men and 231 in women, well above IARC's national rates of 99.3 and 125.2 for 2024, but Nairobi is one urban county, not the country.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Kenya",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Kenya (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 36,000 new cancers a year, led by breast, cervical and prostate cancer, with oesophageal cancer close behind",
          plain:
            "IARC estimates 35,867 new cancers and 22,888 cancer deaths in Kenya in 2024. Breast and cervical cancer lead in women and prostate and oesophageal cancer in men, and more women than men are diagnosed. The government's own strategy names the same five commonest cancers: breast, cervical, prostate, oesophageal and colorectal.",
          detail:
            "IARC's GLOBOCAN 2024 fact sheet for Kenya gives the top three cancers by new cases as prostate, oesophagus and colorectum in men and breast, cervix and colorectum in women, and the same leading causes of death except that oesophageal cancer replaces colorectal cancer as third in women. Age-standardised incidence is 32.2 per 100,000 for prostate cancer, 31.5 for breast cancer and 24.0 for cervical cancer, and the risk of developing cancer before 75 is 12.3%. Five-year prevalence is 76,165. The Ministry of Health's National Cancer Control Strategy 2023-2027 calls cancer the third leading cause of death in Kenya after infectious and cardiovascular diseases and names breast, cervical, prostate, oesophageal and colorectal cancer as the five commonest. Mwenda and colleagues describe cervical cancer as the leading cause of cancer death, with about 3,200 deaths estimated for 2020. The Nairobi registry's 2004 to 2008 data recorded oesophageal cancer as common in both sexes, and the Eldoret registry found it the commonest solid tumour in western Kenya in 1999 to 2006.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Kenya (PDF)", url: IARC_FACTSHEET },
            { label: "Ministry of Health: National Cancer Control Strategy 2023-2027, section 1.3 (PDF)", url: NCCS },
            { label: "Mwenda et al., Kenya's cervical cancer programme 2011-2020 (ecancermedicalscience 2022)", url: MWENDA_2022 },
          ],
        },
        {
          id: "counting",
          title: "How Kenya counts: two city registries, a national register in law, and coverage of about 11%",
          plain:
            "Kenya has two population-based cancer registries, in Nairobi (since 2001) and Eldoret (since 1999). Together they cover about 11% of the population. A 2012 law requires every hospital to report each new cancer to a national register at the National Cancer Institute within sixty days, without the patient's name unless they agree.",
          detail:
            "The 2023-2027 strategy states that Kenya has two high-quality population-based registries, Nairobi and Eldoret, that efforts to start others have been made in Mombasa, Kisumu, Nakuru and Meru, that there are hospital-based registries at regional cancer centres and special registries for childhood cancer, breast cancer and chronic myeloid leukaemia, and that coverage is about 11% against IARC's recommended 20%. It also records that registration had remained fragmented and that the country had not published a detailed cancer burden report in the previous five years. Section 21 of the Cancer Prevention and Control Act, 2012 makes notification within sixty days of diagnosis an obligation of every medical institution, and failing to notify an offence. The Institute's draft Cancer Registries Rules, 2023, published for comment, would create an electronic national registry system and require every medical institution to employ at least one certified cancer registrar. The Nairobi Cancer Registry sits at the Kenya Medical Research Institute's Centre for Clinical Research, and the Eldoret registry at Moi University and Moi Teaching and Referral Hospital; both are members of the African Cancer Registry Network.",
          links: [
            { label: "Ministry of Health: National Cancer Control Strategy 2023-2027, pillar 5 (PDF)", url: NCCS },
            { label: "Cancer Prevention and Control Act, No. 15 of 2012, sections 20 and 21 (PDF)", url: ACT_2012 },
            { label: "Draft Cancer Registries Rules, 2023 (PDF)", url: REG_RULES },
            { label: "African Cancer Registry Network: member registries", url: AFCRN },
          ],
        },
        {
          id: "nairobi-registry",
          title: "What the Nairobi registry found: high rates of breast, cervical and prostate cancer in the capital",
          plain:
            "In 2004 to 2008 the Nairobi Cancer Registry counted 8,982 new cancers in a city of 3.2 million. Breast and cervical cancer made up 44% of cancers in women and prostate cancer was commonest in men. Its latest report, for 2009 to 2013, counted 10,344 cases, and later years were still being collated in 2022.",
          detail:
            "Korir and colleagues reported age-standardised incidence of 161 per 100,000 in men and 231 in women for 2004 to 2008, with prostate cancer at 40.6, breast cancer at 51.7 and cervical cancer at 46.1, and Kaposi sarcoma relatively low for East Africa at 3.6 in men and 2.0 in women. A 2017 paper from the same registry, covering 2000 to 2014, found marked differences in risk by ethnic group, including higher odds of Kaposi sarcoma and Burkitt lymphoma among Luo and Luhya patients. Gakunga, Korir and Bouttell, writing in 2025 with registry data received in April 2022, state that the most recent registry report covered 2009 to 2013 with 10,344 cases (57.7% women), that the registry covers about 4.4 million people (2019), that data are collected on paper, and that collation for 2015 to 2019 was incomplete, interrupted by Covid-19 restrictions and financial constraints. A costing for July 2012 to June 2014 found that grants, research studies and international organisations paid 70% of the registry's costs.",
          links: [
            { label: "Korir et al., Incidence of cancer in Nairobi, Kenya (2004-2008) (Int J Cancer 2015)", url: KORIR_2015 },
            { label: "Gakunga, Korir and Bouttell (PLoS One 2025, full text)", url: GAKUNGA_2025 },
            { label: "Korir et al., economic analysis of the Nairobi Cancer Registry (Cancer Epidemiol 2016)", url: KORIR_2016 },
            { label: "Korir et al., Cancer risks in Nairobi (2000-2014) by ethnic group (Int J Cancer 2017)", url: "https://doi.org/10.1002/ijc.30502" },
          ],
        },
      ],
      tables: [
        {
          id: "nairobi-2004-2008",
          title: "Nairobi Cancer Registry: new cancers registered in 2004 to 2008",
          caption: "Cases registered in five years among residents of Nairobi, with age-standardised incidence rates per 100,000 (world standard), from the registry's published paper.",
          columns: [
            { key: "group", label: "Group or cancer" },
            { key: "cases", label: "Cases, 2004 to 2008", numeric: true },
            { key: "asr", label: "Rate per 100,000", numeric: true },
          ],
          rows: [
            { group: "All cancers, both sexes", cases: 8982, asr: null },
            { group: "All cancers, men", cases: 3889, asr: 161 },
            { group: "All cancers, women", cases: 5093, asr: 231 },
            { group: "Breast (women)", cases: null, asr: 51.7 },
            { group: "Cervix", cases: null, asr: 46.1 },
            { group: "Prostate", cases: null, asr: 40.6 },
            { group: "Kaposi sarcoma, men", cases: null, asr: 3.6 },
            { group: "Kaposi sarcoma, women", cases: null, asr: 2.0 },
          ],
          note: "A count of registered cases for one urban county of about 3.2 million people (2009), not the country. The abstract gives counts only for the totals; site counts are left blank rather than estimated.",
          sources: [{ label: "Korir et al., Int J Cancer 2015", url: KORIR_2015 }],
        },
        {
          id: "registry-periods",
          title: "Kenya's population-based cancer registries and their latest published periods",
          caption: "What each registry covers and the most recent figures found in a source OnCo could read.",
          columns: [
            { key: "registry", label: "Registry" },
            { key: "since", label: "Since", numeric: true },
            { key: "period", label: "Period" },
            { key: "cases", label: "Cases", numeric: true },
            { key: "population", label: "Population covered" },
          ],
          rows: [
            { registry: "Nairobi Cancer Registry (KEMRI)", since: 2001, period: "2004 to 2008", cases: 8982, population: "3.2 million (2009)" },
            { registry: "Nairobi Cancer Registry, latest report", since: 2001, period: "2009 to 2013", cases: 10344, population: "about 4.4 million (2019)" },
            { registry: "Eldoret Cancer Registry (Moi University)", since: 1999, period: "1999 to 2006", cases: 5366, population: "not stated" },
          ],
          note: "The Nairobi 2009 to 2013 count is as quoted by Gakunga and colleagues; the report itself was not found online. The Eldoret count is of patients attended at hospitals in Eldoret, not a population rate. The Ministry puts the two registries' combined coverage at about 11% of Kenya's population.",
          sources: [
            { label: "Korir et al., Int J Cancer 2015", url: KORIR_2015 },
            { label: "Gakunga, Korir and Bouttell, PLoS One 2025", url: GAKUNGA_2025 },
            { label: "Tenge et al., East Afr Med J 2009", url: TENGE_2009 },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays for cancer care",
      aside: { label: "Social Health Authority: benefit tariffs", url: SHA_TARIFFS },
      cards: [
        {
          id: "sha",
          title: "The Social Health Authority replaced the National Health Insurance Fund, funded by 2.75% of income",
          plain:
            "Kenya's public health insurance is now run by the Social Health Authority, which replaced the National Health Insurance Fund. Salaried workers pay 2.75% of gross salary through their employer, and others pay 2.75% of household income as assessed by means testing, with a minimum of KES 300 a month.",
          detail:
            "The Authority describes itself as set up to manage the funds collected under the Social Health Insurance Act, to pool contributions, contract approved providers and pay for services, including for people in need and people in custody. It runs a Primary Healthcare Fund, the Social Health Insurance Fund, whose services include chemotherapy, radiotherapy, brachytherapy, radiosurgery and cancer surgery, and an Emergency, Chronic and Critical Illness Fund that lists cancer among the chronic illnesses it covers. A 2026 scoping review by Oketch and colleagues dates the move from the National Hospital Insurance Fund to the Authority to 2023 and reports early problems including underfunding and limited uptake of expert recommendations; Nungo and colleagues found that the old fund covered only 17% of Kenyans in 2023. Before the change, the fund had introduced an oncology benefits package in April 2015; an analysis of Nairobi registry data for 2010 to 2019 found it was not associated with a significant change in the time from diagnosis to treatment, while a health workers' strike in 2018 added about 35 days. The text of the Social Health Insurance Act itself was not read for this page.",
          links: [
            { label: "Social Health Authority: premium rates", url: SHA_PREMIUM },
            { label: "Social Health Authority: about", url: SHA_ABOUT },
            { label: "Social Health Authority: Emergency, Chronic and Critical Illness Fund", url: SHA_ECCIF },
            { label: "Oketch et al., access to cancer medicines in Kenya (ecancermedicalscience 2026, full text)", url: OKETCH_2026 },
            { label: "Gakunga, Korir and Bouttell (PLoS One 2025, full text)", url: GAKUNGA_2025 },
          ],
        },
        {
          id: "oncology-package",
          title: "The oncology package: up to KES 400,000 a person a year, at centres certified by the National Cancer Institute",
          plain:
            "The Social Health Authority pays for cancer diagnosis, staging and treatment up to KES 400,000 per person per year, at hospitals certified by the National Cancer Institute. It sets prices for each part: for example, KES 3,600 per radiotherapy session for up to 30 sessions, and KES 5,500 per chemotherapy administration.",
          detail:
            "The Authority's Haematology and Oncology Services Package covers chemotherapy, radiotherapy, hormonal therapy and immunotherapy, consumables and stoma appliances, routine and specialised laboratory tests, blood products, imaging for treatment planning and staging, surgery and management of precancerous lesions, at level 3 to 6 facilities with National Cancer Institute certification. Its annex sets sub-limits: a holistic care consultation up to KES 2,500 (up to 4), chemotherapy administration up to KES 5,500 as per the treatment plan, a chemotherapy port up to KES 15,000, a PET scan KES 53,500, a PSMA PET scan KES 64,200, CT KES 6,900, MRI KES 11,000, a bone scan KES 15,000, radiotherapy KES 3,600 a session (30), brachytherapy up to KES 40,000 (3), SBRT up to KES 70,000 (5) and supportive care medicines up to KES 10,000; chemotherapy drugs follow the National Cancer Control Program's adult and child differentiated care model. The National Cancer Institute cites the tariffs as Legal Notice No. 56 of 2025. Oketch and colleagues found that the limit showed potential to reduce costs, but that only two studies had looked at the new scheme.",
          links: [
            { label: "Social Health Authority: benefit tariffs, oncology package and Annex 2", url: SHA_TARIFFS },
            { label: "National Cancer Institute of Kenya: home page notice on SHA onboarding", url: NCI },
            { label: "Oketch et al. (ecancermedicalscience 2026, full text)", url: OKETCH_2026 },
          ],
        },
        {
          id: "out-of-pocket",
          title: "About a quarter of health spending is paid out of pocket, and cancer medicines are often missing in public facilities",
          plain:
            "Households paid 24.2% of Kenya's health spending out of their own pockets in 2023, according to WHO figures published by the World Bank. The government's cancer strategy gives a higher figure, about a third. A 2026 review found that public facilities stocked fewer than half of the cancer medicines studied.",
          detail:
            "The WHO Global Health Expenditure Database, as published by the World Bank, gives out-of-pocket spending at 24.2% of current health expenditure in 2023 (24.0% in 2022), domestic general government spending at 44.9%, total health spending at 4.35% of GDP and USD 85 a person. The 2023-2027 strategy states public health spending of 2.2% of GDP and that a third of health spending is out of pocket, without a year. Oketch and colleagues' 2026 scoping review of 60 studies found that a cycle of chemotherapy cost 3.15 to 162.42 days of the minimum wage, highest for regimens including trastuzumab; that availability in public facilities was below 50%, with procurement delays of 4 to 8 months at the Kenya Medical Supplies Agency; that stage I to III treatment cost USD 1,340 to 1,542 in public and USD 10,915 to 11,862 in private facilities; that financial toxicity affected 20% to 54% of households; and that 53.8% of patients in one study abandoned treatment because of cost. The Kenya Essential Medicines List was not read for this page.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, Kenya (WHO GHED)", url: WB_OOP },
            { label: "World Bank: current health expenditure as % of GDP, Kenya", url: WB_CHE },
            { label: "Oketch et al. (ecancermedicalscience 2026, full text)", url: OKETCH_2026 },
            { label: "Ministry of Health: National Cancer Control Strategy 2023-2027, pillar 4 (PDF)", url: NCCS },
          ],
        },
      ],
      tables: [
        {
          id: "sha-oncology-sublimits",
          title: "What the Social Health Authority pays for parts of cancer care",
          caption: "Tariffs and limits in the Haematology and Oncology Services Package, in Kenyan shillings, as published on the Authority's site in November 2026.",
          columns: [
            { key: "item", label: "Item" },
            { key: "tariff", label: "Tariff (KES)", numeric: true },
            { key: "limit", label: "Limit" },
          ],
          rows: [
            { item: "Diagnosis, staging and treatment, all items", tariff: 400000, limit: "per person per year" },
            { item: "Radiotherapy", tariff: 3600, limit: "per session, up to 30" },
            { item: "Brachytherapy (with sedation)", tariff: 40000, limit: "up to 3" },
            { item: "SBRT or SRS", tariff: 70000, limit: "up to 5" },
            { item: "Chemotherapy administration", tariff: 5500, limit: "as per treatment plan" },
            { item: "PET scan (FDG, FAPI or DOTANOC)", tariff: 53500, limit: "1" },
            { item: "PSMA PET scan", tariff: 64200, limit: "not stated" },
            { item: "CT scan", tariff: 6900, limit: "1" },
            { item: "MRI", tariff: 11000, limit: "1" },
            { item: "HPV test (screening)", tariff: 3600, limit: "screening tariff" },
          ],
          note: "Tariffs are upper amounts the Authority pays a contracted facility, not prices a patient pays. Chemotherapy drugs are paid as per the National Cancer Control Program's differentiated care model and are not priced in the table. Limits are as the page lays them out; where the page gives no number the column says so.",
          sources: [{ label: "Social Health Authority: benefit tariffs", url: SHA_TARIFFS }],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Who approves medicines and cancer centres",
      aside: { label: "Pharmacy and Poisons Board", url: PPB },
      cards: [
        {
          id: "ppb",
          title: "The Pharmacy and Poisons Board registers medicines for five years, with full, reliance and fast-track routes",
          plain:
            "Medicines in Kenya are registered by the Pharmacy and Poisons Board under the Pharmacy and Poisons Act. A registration lasts five years. The Board publishes a full assessment route and a reliance route, each first in, first out or fast-tracked, but no target time for its own scientific review.",
          detail:
            "The Board is the drug regulatory authority established under the Pharmacy and Poisons Act, Chapter 244, and regulates pharmacy practice and the manufacture of and trade in drugs; its Medical Products and Health Technologies directorate registers products, inspects manufacturing and distribution, runs vigilance and oversees clinical trials. The Registration of Health Products and Technologies Rules, 2022 (Legal Notice No. 100, made on 8 June 2022) make a certificate of registration valid for five years, and the dossier asks for the product's registration status in countries with stringent regulatory authorities. The Board's marketing authorisation flow chart, posted on 31 March 2022, shows screening within 30 days on the fast track and 90 days first in, first out; a fast-tracked reliance review of 90 days; up to six months for the applicant to answer queries; approval by the Board within 14 days and a certificate within 7; and no target time for the assessor's review or for reviewing responses. For emergency use authorisation it shows 30 days for initial assessment on the full pathway, 7 days for abridged and WHO-listed products, and 15 days to a final decision. Measured approval times for cancer medicines were not found.",
          links: [
            { label: "Pharmacy and Poisons Board: about", url: PPB_ABOUT },
            { label: "Pharmacy and Poisons Board: marketing authorisation pathways (flow chart, PDF)", url: PPB_PATHWAYS },
            { label: "Registration of Health Products and Technologies Rules, 2022 (PDF)", url: PPB_RULES },
          ],
        },
        {
          id: "nci-certification",
          title: "The National Cancer Institute inspects and certifies cancer centres, and only certified centres are paid",
          plain:
            "Kenya regulates where cancer is treated as well as what is used. The National Cancer Institute inspects, registers and accredits cancer centres, and since October 2026 the Social Health Authority contracts a hospital for cancer care only once it has checked the hospital's certificate and the services it covers.",
          detail:
            "The Cancer Prevention and Control Act, 2012 gives the Institute the job of setting standards and designating institutions involved in cancer care; its directorate for standards, established under sections 34 and 36 of the Act, inspects cancer management centres, registers and accredits them, and runs an ethical review committee. Draft rules under the Act from 2023, covering inspection and certification, standards of care, registries and public awareness, are posted by the Institute. The joint notice signed by the chief executives of the Social Health Authority and the Institute, a file created on 15 October 2026, asks facilities to update their certification, the oncology services they propose (chemotherapy, radiotherapy, brachytherapy, surgical oncology), their equipment and staff and their licences, and states that the Authority will contract facilities for cancer services only on verification of a valid certificate and approved scope. The Institute announced a nationwide inspection of previously inspected centres from 21 October 2026; the notice itself is a scanned image and was not read beyond the Institute's summary.",
          links: [
            { label: "Social Health Authority and NCI joint notice, October 2026 (PDF)", url: JOINT },
            { label: "National Cancer Institute of Kenya: about, directorates", url: NCI_ABOUT },
            { label: "National Cancer Institute of Kenya: draft regulations and policies", url: NCI_RESOURCES },
            { label: "Notice of nationwide inspection from 21 October 2026 (scanned PDF)", url: INSPECTION },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: HPV vaccination coverage, Kenya", url: WHO_HPV },
      cards: [
        {
          id: "hpv-vaccination",
          title: "HPV vaccination since 2019, now one dose for girls aged 10 to 14, with coverage rising from 25% to 79%",
          plain:
            "Kenya added the HPV vaccine to its routine schedule in 2019 for girls aged 10 to 14 and now gives a single dose. WHO and UNICEF estimate that coverage of the target girls was 25% in 2019, rose to 79% in 2024 and was 69% in 2025.",
          detail:
            "WHO's HPV schedule table records a national schedule introduced in 2019, delivered mainly through facilities, for girls aged 10 to 14, with a one-dose schedule. WHO's Global Health Observatory gives HPV vaccination coverage of the primary target cohort (girls aged 9 to 14) at 25% in 2019, 33% in 2020, 29% in 2021, 25% in 2022, 62% in 2023, 79% in 2024 and 69% in 2025. The Ministry's 2023-2027 strategy, using the Kenya Health Information System for 2022, gave 58% for the first dose and 29% for the second, under the two-dose schedule then in use, and sets a target of 90% by 2030. Kenya was the site of KEN SHE, a randomised trial in women aged 15 to 20 whose 54-month results, published in 2026, gave single-dose efficacy of 99.3% against persistent HPV 16/18 infection. A national phone survey of 1,416 parents in July to October 2022 found that 38.2% had a vaccinated daughter, and that problems reaching vaccination services roughly halved the odds.",
          links: [
            { label: "WHO Global Health Observatory: HPV coverage, Kenya (API)", url: WHO_HPV },
            { label: "WHO immunization data: HPV schedule, Kenya (API)", url: WHO_HPV_SCHEDULE },
            { label: "Barnabas et al., KEN SHE 54-month results (Nat Commun 2026)", url: KENSHE_2026 },
            { label: "Moucheraud et al., national phone survey (Vaccine 2024)", url: "https://doi.org/10.1016/j.vaccine.2024.126410" },
          ],
        },
        {
          id: "screening-programmes",
          title: "Cervical screening reaches about 31% of women; breast screening became national in 2021",
          plain:
            "Kenya screens for cervical and breast cancer through national programmes. The Ministry estimates cervical screening coverage at about 31%, and says 1.6 million women would need screening each year to meet WHO's elimination targets. A national breast screening programme began in October 2021, and a bowel screening programme is still planned.",
          detail:
            "The National Cancer Screening Guidelines 2018 name cervical, breast, colorectal and prostate cancer as suited to population screening or early diagnosis, together accounting for 43.1% of new cancers and 36.9% of deaths in GLOBOCAN 2020. The strategy states that, after a pilot in Nyeri County in 2019, a national breast screening programme was established in October 2021 with the Breast Cancer Screening and Early Diagnosis Action Plan 2021-2025, targeting 4.8 million women a year, and that it will pilot and roll out HPV testing for cervical screening. Mwenda and colleagues' review of 2011 to 2020 found that yearly cervical screening reached between under 1% and 36% of the target for HIV-negative women and between under 1% and 7% for HIV-positive women, that treatment of precancerous lesions reached 22% to 39%, and that incidence did not change. The Social Health Authority's tariffs include an HPV test (KES 3,600), PSA (KES 1,500), a stool occult blood test (KES 400) and treatment of precancerous lesions by cryotherapy, thermal ablation or LEEP, with cancer-specific screening rolled out subject to budget.",
          links: [
            { label: "Ministry of Health: National Cancer Control Strategy 2023-2027, pillar 1 (PDF)", url: NCCS },
            { label: "Mwenda et al. (ecancermedicalscience 2022, full text)", url: MWENDA_2022 },
            { label: "Social Health Authority: benefit tariffs, screening", url: SHA_TARIFFS },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy and workforce",
      aside: { label: "IAEA: DIRAC, radiotherapy centres by country", url: DIRAC },
      cards: [
        {
          id: "radiotherapy",
          title: "19 radiotherapy machines in 10 centres, about one for every 3 million people",
          plain:
            "The IAEA's directory, updated for Kenya in 2026, lists 10 radiotherapy centres with 19 high-energy treatment machines and 6 brachytherapy units. That is about one machine for every 3 million people. Patients surveyed in Kenya and other African countries most often named cost as a barrier to radiotherapy.",
          detail:
            "The public country table of the IAEA's Directory of Radiotherapy Centres gives Kenya, last updated in 2026, 10 radiotherapy centres, all with radiotherapy, 19 high-energy photon and electron beam units and 6 brachytherapy units; the ratio is OnCo's division of IARC's 2024 population of 56.4 million by 19. DIRAC's centre-level list requires a sign-in, so the centres are not named here. WHO's 2020 profile recorded 2.3 external beam radiotherapy units and 0.8 medical physicists per 10,000 cancer patients in 2019. A 2026 survey of 553 patients registered in population-based registries in nine countries, including Kenya, found cost of treatment the commonest problem (69.0% overall) and a high share of patients in Kenya reporting barriers. The 2023-2027 strategy plans national radiotherapy protocols and the expansion of nuclear medicine to Kenyatta National Hospital, Moi Teaching and Referral Hospital and at least three more regional cancer centres.",
          links: [
            { label: "IAEA DIRAC: countries (public data table)", url: DIRAC_JSON },
            { label: "WHO: Cancer Country Profile 2020, Kenya (PDF)", url: WHO_PROFILE },
            { label: "Kroeber et al., barriers to radiotherapy in sub-Saharan Africa (Int J Cancer 2026)", url: BARRIERS_RT },
          ],
        },
        {
          id: "workforce",
          title: "12 comprehensive cancer centres, 58 oncologists, and treatment reaching about 28% of patients",
          plain:
            "In 2023 Kenya had 12 comprehensive cancer treatment centres, six public and six private, with 58 oncologists and 11 medical physicists, according to the Ministry of Health. It estimated that about 11,040 of the 42,000 people diagnosed each year reached treatment, about 28%.",
          detail:
            "The National Cancer Control Strategy 2023-2027 gives these figures for 2023 and says the specialised workforce and infrastructure are limited across all cadres; it plans expansion of the oncology workforce and a target of at least 80% treatment completion. Its review of the 2017-2022 strategy found that planned improvements in pathology and imaging had not started or were partly done, leaving patients with suspected cancer facing long distances and high costs for diagnosis. A Ministry taskforce set up in 2021 recommended a hub-and-spoke model with a centre of excellence, more training of cancer specialists and inclusion of essential cancer services in the universal health coverage benefit package. During Covid-19 the National Cancer Institute listed oncology clinics for medicine refills at the county referral hospitals in Mombasa, Meru, Nyeri, Kisumu, Kakamega, Machakos, Nakuru, Bomet, Embu and Garissa. WHO's 2020 profile recorded 0.4 public cancer centres per 10,000 cancer patients in 2019.",
          links: [
            { label: "Ministry of Health: National Cancer Control Strategy 2023-2027, pillar 3 and chapter 3 (PDF)", url: NCCS },
            { label: "National Cancer Institute of Kenya: resources, including the access to medicine flyer", url: NCI_RESOURCES },
            { label: "WHO: Cancer Country Profile 2020, Kenya (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Kenya does",
      title: "What Kenya does differently",
      cards: [
        {
          id: "cancer-law",
          title: "A law just for cancer, with a national institute, compulsory notification and protection from discrimination",
          plain:
            "Kenya passed a Cancer Prevention and Control Act in 2012. Besides creating the National Cancer Institute and a national cancer register, it forbids denying a person employment, a school place or the right to seek public office only because they have cancer, and protects them from being made to disclose it to get credit or insurance.",
          detail:
            "The Act, assented to on 27 July 2012, sets out the Institute's functions, from advising the Cabinet Secretary to securing treatment centres in every county and ensuring accurate figures for planning; Part III creates the national register and the duty to notify each diagnosis within sixty days without disclosing the patient's name unless they consent; and Part IV deals with discrimination in the workplace, in schools, in seeking public office and in access to credit and insurance. The Ministry's 2023-2027 strategy plans to amend the Act to define key roles in the spirit of devolution, between the national government and the counties, and to strengthen the Institute's operational capacity. The Institute also funds research: the grants it lists for the 2023/2024 financial year include HPV self-sampling, aflatoxin in food and gastrointestinal cancer, lung cancer risk factors and whether the insurance packages protect women with cervical cancer from financial hardship, and the review of cancer medicine access by Oketch and colleagues was funded by the National Cancer Research Fund.",
          links: [
            { label: "Cancer Prevention and Control Act, No. 15 of 2012 (PDF)", url: ACT_2012 },
            { label: "National Cancer Institute of Kenya: research grants", url: NCI_RESEARCH },
            { label: "Ministry of Health: National Cancer Control Strategy 2023-2027 (PDF)", url: NCCS },
          ],
        },
        {
          id: "certify-then-pay",
          title: "Insurance money follows certification: the cancer institute decides which centres the insurer can pay",
          plain:
            "Kenya links who may treat cancer to who gets paid for it. The Social Health Authority's oncology package can only be used at hospitals the National Cancer Institute has certified, and for the services in that certificate. In October 2026 the two bodies told every hospital offering cancer care to update its certificate.",
          detail:
            "The Authority's tariff page limits the oncology package to level 3 to 6 facilities with National Cancer Institute certification and capacity to offer the service. The joint notice of October 2026 sets out what each body does: facilities submit applications and resolve gaps; the Institute assesses and certifies eligible centres and verifies their approved scope; and facilities then choose, in the Authority's e-contracting system, only the oncology services within that scope, with supporting documents. The Institute's home page describes the nationwide inspection from 21 October 2026 as being for on-boarding facilities onto the Authority's oncology package. Whether this has changed where patients are treated, or how fast, had not been measured in any source found for this page.",
          links: [
            { label: "Social Health Authority and NCI joint notice, October 2026 (PDF)", url: JOINT },
            { label: "Social Health Authority: benefit tariffs, oncology access rules", url: SHA_TARIFFS },
            { label: "National Cancer Institute of Kenya: home page", url: NCI },
          ],
        },
        {
          id: "single-dose-evidence",
          title: "Kenya produced key evidence for a single dose of HPV vaccine, and uses one",
          plain:
            "The KEN SHE trial, run in Kenya with more than 2,000 young women, found that a single dose of HPV vaccine protected almost completely against the virus types that cause most cervical cancer. Kenya's own programme now gives girls a single dose.",
          detail:
            "KEN SHE (NCT03675256) randomised healthy women aged 15 to 20, recruited through community screening in Kenya, to immediate nonavalent or bivalent vaccination or to a control vaccine with delayed HPV vaccination. Its 54-month analysis, published in Nature Communications in 2026, gave efficacy of 99.3% (95% CI 96.2 to 99.9) against incident persistent HPV 16/18 infection and 98.9% against seven high-risk types, with little change over time. ClinicalTrials.gov records 2,275 participants. WHO's immunisation data record Kenya's HPV schedule as one dose for girls aged 10 to 14. The trial and its earlier results are in OnCo as KEN SHE.",
          links: [
            { label: "Barnabas et al., KEN SHE 54-month results (Nat Commun 2026)", url: KENSHE_2026 },
            { label: "ClinicalTrials.gov: NCT03675256", url: "https://clinicaltrials.gov/study/NCT03675256" },
            { label: "WHO immunization data: HPV schedule, Kenya (API)", url: WHO_HPV_SCHEDULE },
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
          id: "trials-in-kenya",
          title: "8 trials in OnCo's records have a site in Kenya: six Roche phase 3 trials, KEN SHE and a Kaposi sarcoma trial",
          plain:
            "Of the trials in OnCo's records, 8 list a site in Kenya. Six are international phase 3 trials sponsored by Roche, five in breast cancer and one in liver cancer. The other two were designed around African patients: the KEN SHE single-dose HPV vaccine trial and a trial of chemotherapy for advanced AIDS-related Kaposi sarcoma.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 8 trials list Kenya among their countries, 7 phase 3 and 1 phase 4. ClinicalTrials.gov lists 5 as active and not recruiting, 1 recruiting, 1 completed and 1 of unknown status. Hoffmann-La Roche is lead sponsor of 6: lidERA, pionERA and heredERA with giredestrant, a trial of inavolisib with Phesgo in PIK3CA-mutated HER2-positive breast cancer, the adjuvant atezolizumab and trastuzumab emtansine trial in HER2-positive breast cancer, and a trial of atezolizumab and bevacizumab with or without tiragolumab in liver cancer; each has between 27 and 54 countries. KEN SHE (sponsor Massachusetts General Hospital) had Kenya as its only country. ACTG A5263/AMC 066 randomised 334 adults with advanced AIDS-associated Kaposi sarcoma, at sites in Kenya, Malawi, South Africa, Uganda, Zimbabwe and Brazil, to paclitaxel, oral etoposide or bleomycin with vincristine. The count covers only trials OnCo holds, not every study in Kenya.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Kenya", url: "https://clinicaltrials.gov/search?country=Kenya&cond=Cancer" },
            { label: "ClinicalTrials.gov: KEN SHE (NCT03675256)", url: "https://clinicaltrials.gov/study/NCT03675256" },
          ],
        },
        {
          id: "registry-research",
          title: "Kenya's registries feed African survival and patterns-of-care studies",
          plain:
            "Data from the Nairobi and Eldoret registries are part of the African Cancer Registry Network's population studies, including SURVCAN-3, IARC's study of cancer survival in sub-Saharan Africa. These measure what happens to all patients in an area, not only those treated at one hospital.",
          detail:
            "SURVCAN-3 analysed 10,500 people diagnosed in 2005 to 2014 in 13 registries in 11 countries, including Eldoret and Nairobi, and found three-year age-standardised net survival of 52.3% for cervical cancer, 18.1% for liver cancer and 32.4% for lung cancer, with fewer than half alive after three years for eight cancer types including oesophageal cancer; the abstract gives pooled rather than Kenyan figures. Gladys Chesumbai of the Eldoret registry, now head of the National Cancer Registry, is an author of SURVCAN-3 and of the network's 2025 and 2026 studies of guideline-concordant care and barriers to treatment. Nairobi registry data were used to evaluate the 2015 insurance package, and the 2016 registry costing was done with the US Centers for Disease Control and Prevention's tool. At the IACR conference in October 2026 the Institute presented a Delphi consensus on a minimum dataset for a national childhood cancer registry.",
          links: [
            { label: "Joko-Fru et al., SURVCAN-3 (Lancet Glob Health 2024)", url: SURVCAN3 },
            { label: "National Cancer Institute of Kenya: report of the IACR conference, October 2026", url: NCI_IACR },
            { label: "Korir et al., economic analysis of the Nairobi Cancer Registry (Cancer Epidemiol 2016)", url: KORIR_2016 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "unread-ke",
      title: "Sources that refused a script or could not be read",
      plain:
        "Kenya Law refused every scripted request, so the Social Health Insurance Act and its regulations were not read in their own text. IARC's Cancer Incidence in Five Continents site, which holds the Nairobi and Eldoret registries' 2013 to 2017 data, builds its tables in the browser and was not read.",
      detail:
        "kenyalaw.org answered 403 and new.kenyalaw.org an empty 202 to every request on 11 November 2026, and no Internet Archive copy of the Act was found at the addresses tried; the Social Health Authority's description and the papers by Oketch and colleagues (who date the transition to 2023) and Gakunga and colleagues are used instead, and the Act's date of assent and commencement are not stated here. The Cancer Prevention and Control Act was read from the copy the National Cancer Institute hosts. Cancer Incidence in Five Continents Volume XII, which includes the Nairobi registry, loads by script. The National Cancer Institute's registry portal (nacare.ncikenya.go.ke) returned an error, its notice of the October 2026 inspection is a scanned image that was not transcribed, and DIRAC's list of individual centres requires a sign-in. OnCo's web search allowance ran out early in this research, so some sources may exist that were not found.",
      links: [
        { label: "Kenya Law", url: "https://new.kenyalaw.org" },
        { label: "IARC: Cancer Incidence in Five Continents", url: "https://ci5.iarc.who.int/" },
        { label: "IAEA DIRAC", url: DIRAC },
      ],
    },
    {
      id: "not-found-ke",
      title: "Figures looked for and not found",
      plain:
        "OnCo did not find, in a source it could read, the Nairobi registry's own report for 2009 to 2013 or any later year, current rates from the Eldoret registry, the Pharmacy and Poisons Board's measured approval times for cancer medicines, the Kenya Essential Medicines List, or how much the Social Health Authority has spent on cancer.",
      detail:
        "The 2009 to 2013 Nairobi count of 10,344 cases is quoted from Gakunga and colleagues, and the strategy states that no detailed national cancer burden report was published in the five years before 2023. Eldoret's figures here are counts for 1999 to 2006. The Board's flow chart sets some time limits but none for scientific review, and no published median approval time was found; whether the Board has been benchmarked by WHO was not checked. The Kenya Essential Medicines List and the National Cancer Treatment Protocols were not read, so which cancer medicines are on the list, and their availability beyond the review by Oketch and colleagues, are not stated. The Social Health Authority publishes payments to providers by fund, but its spending on the oncology package was not found broken out. The Ministry's figures for oncologists and centres are for 2023 and may have changed.",
      links: [
        { label: "Gakunga, Korir and Bouttell (PLoS One 2025, full text)", url: GAKUNGA_2025 },
        { label: "Pharmacy and Poisons Board: marketing authorisation pathways", url: PPB_PATHWAYS },
        { label: "Social Health Authority", url: SHA },
      ],
    },
    {
      id: "estimates-ke",
      title: "National figures are estimates built on two city registries",
      plain:
        "Kenya has no complete count of cancer. IARC's national figures are modelled from the Nairobi and Eldoret registries, and its death figures are calculated from survival data, because deaths are not registered with their causes well enough to count. Treat every national number on this page as an estimate.",
      detail:
        "IARC's fact sheet gives subnational registries as the incidence source and SURVCAN survival data, through mortality-to-incidence ratios, as the basis for deaths, and WHO's 2020 profile records no coverage by mortality registration for 2007 to 2016. Gakunga and colleagues state that the Nairobi and Eldoret registries' data are used for Kenya's GLOBOCAN estimates. The registries cover about 11% of the population, mostly urban Nairobi and the Eldoret area, so cancers common elsewhere in Kenya may be under- or over-represented. The Nyandarua County hospital registry, reported in 2024, found oesophageal, cervical and stomach cancer the commonest sites there, a reminder that the pattern varies by county.",
      links: [
        { label: "IARC: GLOBOCAN 2024 fact sheet, Kenya (PDF)", url: IARC_FACTSHEET },
        { label: "WHO: Cancer Country Profile 2020, Kenya (PDF)", url: WHO_PROFILE },
        { label: "Kamita et al., Nyandarua County cancer registry (Heliyon 2024)", url: "https://doi.org/10.1016/j.heliyon.2024.e39056" },
      ],
    },
  ],
  institutions: [
    "national-cancer-institute-of-kenya", "kenya-ministry-of-health", "social-health-authority-kenya", "pharmacy-and-poisons-board-kenya",
    "nairobi-cancer-registry", "eldoret-cancer-registry", "kenyatta-national-hospital", "moi-teaching-referral-hospital", "aga-khan-university-hospital-nairobi", "iarc", "who",
  ],
  companies: ["roche-genentech"],
  drugs: ["gardasil-9", "trastuzumab", "trastuzumab-emtansine", "atezolizumab", "giredestrant", "inavolisib", "paclitaxel", "etoposide"],
  trials: ["ken-she", "actg-a5263", "lidera", "nct06065748", "nct05296798", "nct05894239", "nct04873362", "nct05904886"],
  papers: [
    "paper-korir-nairobi-cancer-incidence-2004-2008-ijc-2015", "paper-korir-nairobi-cancer-registry-costs-2016", "paper-gakunga-nhif-oncology-package-time-to-treatment-2025",
    "paper-mwenda-kenya-cervical-cancer-programme-2022", "paper-tenge-eldoret-cancer-registry-western-kenya-2009", "paper-barnabas-nejm-evid",
  ],
  people: ["elias-melly", "gladys-chesumbai", "richard-lesiyampe", "philip-kirwa", "rashid-khalani"],
  how:
    "Every card was written from sources read in their raw text on 11 November 2026: IARC's GLOBOCAN 2024 fact sheet for Kenya, WHO's Cancer Country Profile 2020, the Ministry of Health's National Cancer Control Strategy 2023-2027, the Cancer Prevention and Control Act, 2012 and the draft rules under it, the National Cancer Institute of Kenya's pages and its joint notice with the Social Health Authority, the Authority's benefit tariffs and premium pages, the Pharmacy and Poisons Board's pages, flow chart and 2022 registration rules, WHO's health expenditure figures as published by the World Bank, WHO's HPV vaccination data, the IAEA's DIRAC country table and papers resolved through Europe PMC, read in full where open access. The trial count comes from ClinicalTrials.gov participation data in OnCo's graph. New records for this page are the National Cancer Institute, the Ministry of Health, the Social Health Authority, the Pharmacy and Poisons Board, the Nairobi and Eldoret registries, five papers and two people; the hospitals, the KEN SHE trial and its paper were already in OnCo.",
  verify:
    "National incidence and death figures are IARC estimates built on two city registries, and the registries' own published rates are from 2004 to 2008. The Social Health Authority's tariffs and rules change by legal notice; the figures here are those on its site in November 2026. Before relying on cover for cancer treatment, ask the hospital whether it is contracted by the Authority for the specific cancer service, check its National Cancer Institute certification, and ask how much of the KES 400,000 limit the treatment plan will use.",
  verifyLinks: [
    { label: "Social Health Authority: benefit tariffs", url: SHA_TARIFFS },
    { label: "National Cancer Institute of Kenya", url: NCI },
    { label: "Pharmacy and Poisons Board", url: PPB },
    { label: "Ministry of Health: strategy launch", url: NCCS_LAUNCH },
  ],
};

import type { CountryDive } from "@/data/country-dive";

/**
 * Denmark deep dive: the hand-written cards and tables for /countries/dk/ (wave 7). Written from Danish primary sources,
 * read in Danish and English on 11 November 2026, every figure checked against the raw text of the linked page or PDF:
 * Sundhedsdatastyrelsen's 2024 incidence tables from the Danish Cancer Registry (published 25 June 2025), its survival
 * report for 2010 to 2024 (26 February 2026), its quarterly monitoring of cancer pathways for the first quarter of 2026
 * (12 June 2026) and its analysis of the cancer area 2013 to 2023 for Kræftplan V (15 January 2025); Statistics
 * Denmark's cause of death table DODA1 through its public API; Sundhedsstyrelsen's pages on the five national cancer
 * plans (through the Internet Archive, because sst.dk answered a plain request with a browser check); the two
 * implementation agreements on Kræftplan V (June 2025 and 27 November 2025); Danske Regioner's fact sheet on maximum
 * waiting times (12 April 2024); Medicinrådet's pages, terms of reference, severity principle, the 2016 parliamentary
 * principles and its 2026 news; the Danish Medicines Agency's English pages on its tasks and on 2026 reimbursement
 * thresholds; the EMA's leaflet on the centralised procedure; Life in Denmark and Danske Regioner on how care is
 * organised; the Danish Cancer Society's screening pages; Statens Serum Institut's childhood vaccination page and its
 * 2017 annual report; WHO's Global Health Observatory API; IARC's GLOBOCAN 2024 fact sheet for Denmark; the DCCC and
 * DMCG.dk websites; ClinicalTrials.gov for NCT02278887; and the papers' abstracts through Europe PMC.
 *
 * Counting conventions worth holding in mind:
 *  - incidence  Cancerregisteret, diagnoses in 2024, people per group, basal cell skin cancer excluded; the brain and
 *               urinary tract groups include some benign and uncertain (ICD-10 D) tumours
 *  - rates      age-standardised to the Danish population of 2000, not the World standard GLOBOCAN uses
 *  - deaths     Statistics Denmark, DODA1, cause of death "A-02 Cancer", deaths in 2024
 *  - survival   age-standardised relative survival (ICSS weights), by three-year diagnosis period, computed by the
 *               Danish Cancer Society for Sundhedsdatastyrelsen
 */
const SDS_INC = { label: "Sundhedsdatastyrelsen, Nye kræfttilfælde i Danmark 2024, fordelt på kommuner (25 June 2025, PDF)", url: "https://cdn1.gopublic.dk/sundhedsdatastyrelsen/Media/638938615398782138/Nye%20kr%C3%A6fttilf%C3%A6lde%202024,%20fordelt%20p%C3%A5%20kommuner%20(udgivet%2025.%20juni%202025).pdf" };
const SDS_SURV = { label: "Sundhedsdatastyrelsen, Kræftoverlevelse i Danmark 2010-2024 (26 February 2026, PDF)", url: "https://cdn.sundhedsdatastyrelsen.dk/sundhedsdatastyrelsen/Media/639076903175066575/kraeftoverlevelse-i-danmark-2010-2024.pdf" };
const SDS_DEV = { label: "Sundhedsdatastyrelsen, Kræftområdet: Udvikling 2013-2023 (15 January 2025, PDF)", url: "https://cdn1.gopublic.dk/sundhedsdatastyrelsen/Media/638955202737604757/Udvikling%20p%C3%A5%20kr%C3%A6ftomr%C3%A5det%202013-2023,%20Kr%C3%A6ftplan%20V%20(udgivet%2015.%20januar%202025).pdf" };
const SDS_MON = { label: "Sundhedsdatastyrelsen, Monitorering af kræftområdet 1. kvartal 2026 (12 June 2026, PDF)", url: "https://cdn1.gopublic.dk/sundhedsdatastyrelsen/Media/639168548108232079/monitorering-af-kraeftomraadet-1-kvartal-2026.pdf" };
const DST_DEATHS = { label: "Statistics Denmark, StatBank table DODA1: deaths by cause (2024)", url: "https://www.statbank.dk/DODA1" };
const SST_PLANS = { label: "Sundhedsstyrelsen: Nationale kræftplaner (Internet Archive copy; sst.dk asked for a browser check)", url: "https://web.archive.org/web/2026/https://www.sst.dk/da/Fagperson/Sygdomme-lidelser-og-behandling/Kraeftsygdom/Kraeftplaner" };
const SST_KP5 = { label: "Sundhedsstyrelsen: Kræftplan V (Internet Archive copy)", url: "https://web.archive.org/web/2026/https://www.sst.dk/da/Fagperson/Sygdomme-lidelser-og-behandling/Kraeftsygdom/Kraeftplaner/Kraeftplan-V" };
const SST_KP3 = { label: "Sundhedsstyrelsen: Kræftplan III (Internet Archive copy)", url: "https://web.archive.org/web/2026/https://www.sst.dk/da/Fagperson/Sygdomme-lidelser-og-behandling/Kraeftsygdom/Kraeftplaner/Kraeftplan-III" };
const SST_KP2 = { label: "Sundhedsstyrelsen: Kræftplan II (Internet Archive copy)", url: "https://web.archive.org/web/2026/https://www.sst.dk/da/Fagperson/Sygdomme-lidelser-og-behandling/Kraeftsygdom/Kraeftplaner/Kraeftplan-II" };
const SST_KP4 = { label: "Sundhedsstyrelsen: Kræftplan IV (Internet Archive copy)", url: "https://web.archive.org/web/2026/https://www.sst.dk/da/Fagperson/Sygdomme-lidelser-og-behandling/Kraeftsygdom/Kraeftplaner/Kraeftplan-IV" };
const KPV_2026 = { label: "Udmøntningsaftale om Kræftplan V (2026 og frem), government, Danske Regioner and KL, 27 November 2025 (PDF)", url: "https://medcom.dk/wp-content/uploads/2026/08/Bilag-2-Udmoentningsaftale-om-Kraeftplan-V-2026-og-frem.pdf" };
const KPV_2025 = { label: "Udmøntningsaftale om Kræftplan V (2025), June 2025 (PDF)", url: "https://www.ism.dk/Media/638926676927162662/KPV-udmoentningsaftale-2025.pdf" };
const WAITS = { label: "Danske Regioner: Faktaark, hvad er de maksimale ventetider? (12 April 2024, PDF)", url: "https://www.regioner.dk/media/rupbf04u/faktaark-hvad-er-de-maksimale-ventetider.pdf" };
const MR_ABOUT = { label: "Medicinrådet: om os", url: "https://medicinraadet.dk/om-os" };
const MR_EN = { label: "Medicinrådet: in English", url: "https://medicinraadet.dk/om-os/in-english" };
const MR_TOR = { label: "Kommissorium for Medicinrådet, version 1.7 (PDF)", url: "https://filer.medicinraadet.dk/media/nvmdgxqu/medicinradet-kommissorium-version-1-7.pdf" };
const MR_7P = { label: "Princippapir om prioritering for sygehuslægemidler, 31 March 2016 (PDF)", url: "https://filer.medicinraadet.dk/media/1oxfmhsz/ad-pkt-4-folketingets-7-principper-for-prioritering-af-sygehuslaegemidler_final-a.pdf" };
const MR_SEV = { label: "Medicinrådets anvendelse af alvorlighedsprincippet (PDF)", url: "https://filer.medicinraadet.dk/media/weanjjre/medicinr%C3%A5dets-anvendelse-af-alvorlighedsprincippet-januar-2021.pdf" };
const MR_OCT = { label: "Medicinrådet: overview of decisions in October 2026", url: "https://medicinraadet.dk/nyheder/2026/overblik-medicinradets-beslutninger-i-oktober-2026" };
const MR_BREXU = { label: "Medicinrådet: outcome-based agreement for brexucabtagene autoleucel (2026)", url: "https://medicinraadet.dk/nyheder/2026/ny-effektbaseret-aftale-baner-vejen-for-behandling-til-kraeftpatienter" };
const MR_TDXD = { label: "Medicinrådet: risk-sharing agreement for trastuzumab deruxtecan (2026)", url: "https://medicinraadet.dk/nyheder/2026/ny-risikodelingsaftale-abner-for-behandling-af-to-typer-kraeft" };
const MR_BACKLOG = { label: "Medicinrådet: the 2025 backlog is almost cleared (2026)", url: "https://medicinraadet.dk/nyheder/2026/medicinradets-sagspukkel-er-naesten-vaek-nye-vurderinger-starter-som-planlagt" };
const DKMA = { label: "Danish Medicines Agency: about us", url: "https://laegemiddelstyrelsen.dk/en/about/" };
const DKMA_THRESH = { label: "Danish Medicines Agency: reimbursement thresholds 2026", url: "https://laegemiddelstyrelsen.dk/en/reimbursement/reimbursement-thresholds/" };
const DKMA_IND = { label: "Danish Medicines Agency: individual reimbursement, including for the terminally ill", url: "https://laegemiddelstyrelsen.dk/en/reimbursement/individual-reimbursement/" };
const EMA_LEAFLET = { label: "EMA: applying for EU marketing authorisation (leaflet, PDF)", url: "https://www.ema.europa.eu/en/documents/leaflet/applying-european-union-marketing-authorisation-medicinal-products-human-use_en.pdf" };
const LID = { label: "Life in Denmark (Danish Patient Safety Authority): how the Danish healthcare system works", url: "https://lifeindenmark.borger.dk/healthcare/the-danish-healthcare-system/how-the-danish-healthcare-system-works" };
const REGIONS = { label: "Danske Regioner: regional Denmark", url: "https://www.regioner.dk/services/in-english/regional-denmark/" };
const GHO = (code: string, label: string) => ({ label: `WHO Global Health Observatory API: ${label}, Denmark`, url: `https://ghoapi.azureedge.net/api/${code}?$filter=SpatialDim%20eq%20'DNK'` });
const KB = "https://www.cancer.dk/forebyg-kraeft/screening";
const SSI_CHILD = { label: "Statens Serum Institut: børnevaccination", url: "https://www.ssi.dk/vaccinationer/boernevaccination" };
const SSI_2017 = { label: "Årsrapport for børnevaccinationsprogrammet 2017 (PDF)", url: "https://www.ssi.dk/-/media/arkiv/dk/vaccination/boernevaccinationsprogrammet/aarsrapporten_for_2017.pdf" };
const DCCC = { label: "DCCC: baggrund og strategi", url: "https://www.dccc.dk/om-dccc/baggrund/" };
const DMCG = { label: "DMCG.dk: om DMCG", url: "https://www.dmcg.dk/om-dmcg/" };

export const DK_DIVE: CountryDive = {
  iso2: "DK",
  iso3: "DNK",
  name: "Denmark",
  flag: "🇩🇰",
  asOf: "2026-11-11",
  title: "Cancer in Denmark",
  description:
    "Cancer in Denmark read from Danish sources: the national cancer registry's 2024 counts and survival to 2024, the legal maximum waits and how often cancer pathways meet their standard times, five regions paying from general taxes and the cap on prescription costs, how Medicinrådet decides on new hospital cancer medicines, the screening and HPV programmes, and the Danish trials and registries that changed practice.",
  lede:
    "Denmark has counted every new cancer in a national registry since 1943, gives each patient a legal maximum wait for investigation and treatment with the right to be sent elsewhere when the home region cannot meet it, and lets a council set up by its five regions decide which new hospital cancer medicines become standard treatment.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Denmark is 46,512 new cancers and 17,720 deaths, at age-standardised rates of 345.07 and 99.89 per 100,000 on the World standard population; the all-cancers figure includes 5,207 non-melanoma skin cancers. IARC's fact sheet gives its sources as the national registry for incidence and WHO's national mortality data for deaths, in both cases with trends in national rates projected to 2024. The registry's own count for 2024 is 24,794 men and 23,664 women with a new cancer, 48,458 together, excluding basal cell skin cancer; it counts people within each cancer group, and its brain and urinary tract groups include some benign and uncertain tumours that GLOBOCAN's C00-97 does not. Statistics Denmark recorded 16,389 deaths from cancer in 2024, below GLOBOCAN's projected 17,720. The registry standardises its rates to the Danish population of 2000 (649 per 100,000 in 2023), so they cannot be set beside IARC's World-standard rates. Compare like with like.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Denmark, from the national registry",
      aside: SDS_INC,
      cards: [
        {
          id: "registry-2024",
          title: "48,458 people diagnosed in 2024, and 16,389 deaths",
          plain:
            "The Danish Cancer Registry recorded 24,794 men and 23,664 women with a new cancer in 2024. Prostate cancer was the commonest in men and breast cancer in women. Lung cancer came next in women; in men, skin cancers other than melanoma and urinary tract cancers were each counted more often than lung cancer. In 2024 cancer was recorded as the cause of 16,389 of the 57,071 deaths in Denmark.",
          detail:
            "The registry was founded in 1942 and holds incidence data from 1943; it is kept by Sundhedsdatastyrelsen, the health data authority, and linked to the patient, death and population registers through each person's identity number. The 2024 tables, drawn from the registry on 2 May 2025, count 4,446 men with prostate cancer, 5,389 women with breast cancer, 2,783 women and 2,394 men with lung cancer, and 1,747 women and 1,487 men with colon cancer. Basal cell skin cancer is excluded. The number of new cases rose from 42,582 in 2014 to 48,372 in 2023 while the age-standardised rate stayed between 633 and 661 per 100,000, so the rise in numbers is not a rise in the age-standardised rate; the analysis's figures do not split it between ageing and growth. At the end of 2023, 396,775 people in Denmark were living after a cancer diagnosis. Deaths by cause come from Statistics Denmark's table DODA1: 8,681 men and 7,708 women died of cancer in 2024.",
          links: [SDS_INC, SDS_DEV, DST_DEATHS, { label: "Gjerstorff, The Danish Cancer Registry (Scand J Public Health 2011)", url: "https://doi.org/10.1177/1403494810393562" }],
        },
        {
          id: "survival",
          title: "Five-year survival rose from 64 to 74 per cent in women and from 61 to 71 per cent in men",
          plain:
            "For people diagnosed in 2022 to 2024, five-year relative survival across all cancers except non-melanoma skin cancer was 74 per cent for women and 71 per cent for men, up from 64 and 61 per cent in 2010 to 2012. Lung cancer survival roughly doubled in both sexes over the same period.",
          detail:
            "Sundhedsdatastyrelsen's survival report of 26 February 2026 uses age-standardised relative survival, an estimate of survival if the cancer were the only possible cause of death, calculated by the Danish Cancer Society from the registry and the Central Person Register. Five-year survival for lung cancer rose from 19 to 38 per cent in women and from 13 to 27 per cent in men; for kidney cancer from 62 to 81 per cent in women and 64 to 82 in men; for pancreatic cancer in men from 6 to 17 per cent. Leaving out breast and prostate cancer, which are common and have high survival, five-year survival was 67 per cent for women and 64 per cent for men. The report notes that more PSA testing in the years up to 2009, breast screening rolled out across the country in 2007 to 2009, and bowel screening from spring 2014 can raise survival figures through earlier diagnosis without lengthening life (lead time) and by finding slower cancers. These are averages across everyone diagnosed and say nothing about any one person's outlook.",
          links: [SDS_SURV],
        },
        {
          id: "nordic",
          title: "Measured against the other Nordic countries",
          plain:
            "Denmark has more cancer than its Nordic neighbours. Sundhedsdatastyrelsen's comparison using NORDCAN found that by 2017 to 2021 five-year survival for Danish women had reached the Nordic level, about 72 per cent, but that for Danish men it was 69.6 per cent, 6 to 7 points below Norway and Sweden.",
          detail:
            "The comparison was made for the Kræftplan V analysis published on 15 January 2025, from NORDCAN data (the Nordic registries' shared database hosted by IARC), excluding non-melanoma skin cancer. Age-standardised incidence and mortality in Danish women were generally higher than in Norway, Sweden, Finland and Iceland from 1990 to 2021; in men incidence was at about Norway's level while mortality was higher than in the other Nordic countries. The prevalence of women living after cancer in Denmark was 6,486 per 100,000 in 2021. Denmark's earlier plan, Kræftplan IV of 2016, had set the goal that survival in 2025 should match the best of the Nordic neighbours, and Kræftplan V repeats it: Danish cancer survival should be at the top among the Nordic countries.",
          links: [SDS_DEV, KPV_2026, SST_KP4],
        },
      ],
      tables: [
        {
          id: "groups-2024",
          title: "New cancers in Denmark by group, 2024",
          caption: "People with a new cancer in each group, by sex, 2024. Counts from the Danish Cancer Registry, drawn on 2 May 2025.",
          columns: [
            { key: "group", label: "Cancer group" },
            { key: "women", label: "Women", numeric: true },
            { key: "men", label: "Men", numeric: true },
          ],
          rows: [
            { group: "Prostate", women: null, men: 4446 },
            { group: "Breast (women)", women: 5389, men: null },
            { group: "Lung, bronchus and trachea", women: 2783, men: 2394 },
            { group: "Colon", women: 1747, men: 1487 },
            { group: "Rectum", women: 452, men: 781 },
            { group: "Skin, other than melanoma (basal cell excluded)", women: 2645, men: 3119 },
            { group: "Melanoma", women: 1497, men: 1536 },
            { group: "Urinary tract, including kidney", women: 1059, men: 2740 },
            { group: "Brain and central nervous system", women: 1417, men: 1021 },
            { group: "Head and neck, including thyroid", women: 791, men: 1110 },
            { group: "Uterus", women: 769, men: null },
            { group: "Ovary", women: 491, men: null },
            { group: "Cervix", women: 326, men: null },
            { group: "Testis", women: null, men: 279 },
            { group: "Other cancers", women: 4298, men: 5881 },
            { group: "Total", women: 23664, men: 24794 },
          ],
          note: "From the TOTAL rows of Table 1 in the municipal tables, which give the number of unique people per group. The urinary tract and brain groups include some benign and uncertain tumours (ICD-10 D codes) under the classification Sundhedsdatastyrelsen uses for these reports, and head and neck includes thyroid; GLOBOCAN does not count those benign tumours.",
          sources: [SDS_INC, SDS_DEV],
        },
        {
          id: "survival-5y",
          title: "Five-year relative survival in Denmark, then and now",
          caption: "Age-standardised five-year relative survival, per cent, for people diagnosed in 2010 to 2012 and in 2022 to 2024.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "sex", label: "Sex" },
            { key: "p1", label: "2010 to 2012 (%)", numeric: true },
            { key: "p2", label: "2022 to 2024 (%)", numeric: true },
          ],
          rows: [
            { site: "All cancers (non-melanoma skin excluded)", sex: "Women", p1: 64, p2: 74 },
            { site: "All cancers (non-melanoma skin excluded)", sex: "Men", p1: 61, p2: 71 },
            { site: "Lung", sex: "Women", p1: 19, p2: 38 },
            { site: "Lung", sex: "Men", p1: 13, p2: 27 },
            { site: "Colon and rectum", sex: "Women", p1: 64, p2: 74 },
            { site: "Colon and rectum", sex: "Men", p1: 63, p2: 71 },
            { site: "Breast", sex: "Women", p1: 88, p2: 91 },
            { site: "Prostate", sex: "Men", p1: 88, p2: 90 },
            { site: "Ovary", sex: "Women", p1: 40, p2: 48 },
            { site: "Kidney", sex: "Women", p1: 62, p2: 81 },
            { site: "Kidney", sex: "Men", p1: 64, p2: 82 },
            { site: "Stomach", sex: "Women", p1: 23, p2: 41 },
            { site: "Stomach", sex: "Men", p1: 23, p2: 34 },
            { site: "Pancreas", sex: "Women", p1: 8, p2: 14 },
            { site: "Pancreas", sex: "Men", p1: 6, p2: 17 },
          ],
          note: "Appendix table 3 of the report, which also gives 95 per cent confidence intervals; for less common cancers such as oesophageal and liver cancer the intervals are wide. Relative survival excludes deaths from other causes. The report expanded its groups to 21 cancers in this edition, so its figures are not directly comparable with earlier reports.",
          sources: [SDS_SURV],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Who pays: five regions financed from general taxes, and a cap on prescription costs",
      aside: LID,
      cards: [
        {
          id: "regions",
          title: "Hospital care is run by five regions and paid for from general taxes",
          plain:
            "Denmark's five regions run the public hospitals and are responsible for general practitioners and specialists in private practice; the 98 municipalities run rehabilitation outside hospital, home nursing and other local services. Most health care is financed by general taxes and provided free of charge.",
          detail:
            "The regions were created in 2007 by a structural reform that abolished 14 counties and reduced 273 municipalities to 98; each has between 0.6 and 1.6 million inhabitants and a directly elected regional council. Life in Denmark, written by the Danish Patient Safety Authority, describes three levels: the state regulates and supervises, the regions provide hospital care including emergency care and psychiatry, and the municipalities provide primary health and social services and co-finance regional rehabilitation. In WHO's Global Health Observatory, current health spending in Denmark was 9.6 per cent of GDP in 2023, of which 83.3 per cent came from domestic government sources and 14.0 per cent was paid out of pocket; WHO's universal health coverage service index for Denmark was 85 in 2023. Every cancer pathway figure, waiting time and screening rate on this page is therefore reported region by region.",
          links: [LID, REGIONS, GHO("GHED_OOPSCHE_SHA2011", "out-of-pocket share of current health expenditure"), GHO("GHED_GGHE-DCHE_SHA2011", "government share of current health expenditure"), GHO("UHC_INDEX_REPORTED", "UHC service coverage index")],
        },
        {
          id: "prescriptions",
          title: "What a patient pays for prescription medicines: at most 4,850 kroner a year",
          plain:
            "Medicines bought at a pharmacy on prescription are reimbursed in steps. In 2026 an adult pays the full price of the first 1,135 kroner in a twelve-month period, then a falling share, and nothing more once their total spending passes 22,596 kroner: a ceiling of 4,850 kroner. People who are terminally ill at home or in a hospice can have their medicines covered.",
          detail:
            "The Danish Medicines Agency publishes the thresholds. The period starts with the first purchase of a reimbursable medicine after the previous period ends. Above 1,135 kroner the reimbursement is 50 per cent, above 1,910 kroner 75 per cent and above 4,155 kroner 85 per cent; children under 18 receive 60 per cent from the first krone and reach full reimbursement above 26,998 kroner, with the same co-payment ceiling. A patient who expects high spending can agree with the pharmacy to pay the year's co-payment in twelve instalments, about 404 kroner a month. For terminally ill patients who choose to spend their last time at home or in a hospice, a doctor or the hospital can apply for reimbursement of the prescribed medicines. The thresholds apply to reimbursable medicines bought at a pharmacy; cancer medicines given in hospital are bought by the regions through Amgros on Medicinrådet's recommendations.",
          links: [DKMA_THRESH, DKMA_IND, MR_TOR],
        },
      ],
      tables: [
        {
          id: "reimbursement-2026",
          title: "Reimbursement of prescription medicines in Denmark, 2026",
          caption: "Share of the price reimbursed by total spending on reimbursable medicines in a twelve-month period, adults and under-18s, in kroner.",
          columns: [
            { key: "band", label: "Total spending in the period" },
            { key: "adult", label: "Adults, reimbursed (%)", numeric: true },
            { key: "child", label: "Under 18, reimbursed (%)", numeric: true },
          ],
          rows: [
            { band: "0 to 1,135 kroner", adult: 0, child: 60 },
            { band: "1,135 to 1,910 kroner", adult: 50, child: 60 },
            { band: "1,910 to 4,155 kroner", adult: 75, child: 75 },
            { band: "Above 4,155 kroner", adult: 85, child: 85 },
            { band: "Above 22,596 kroner (adults) or 26,998 kroner (under 18)", adult: 100, child: 100 },
          ],
          note: "The most a patient pays in co-payment in 2026 is 4,850 kroner. Medicines given in hospital are not counted here.",
          sources: [DKMA_THRESH],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Drug decisions",
      title: "How Denmark decides a new hospital cancer medicine is worth its price: Medicinrådet",
      aside: MR_ABOUT,
      cards: [
        {
          id: "medicinraadet",
          title: "One council for five regions, deciding on price and benefit together",
          plain:
            "Most new cancer medicines are given in hospital and paid for by the regions. Since 2017 the regions' Medicinrådet has decided whether each new medicine or new use becomes standard treatment across Denmark, weighing its added benefit over current treatment against the price the regions' purchasing body Amgros negotiates.",
          detail:
            "Danske Regioner set up Medicinrådet from 1 January 2017, replacing RADS (2009) and KRIS (2012). Its terms of reference say it recommends to the five regions whether to take new medicines and indications into use, on the basis of Amgros's negotiations and tenders, that its recommendations are not binding on the regions, and that its decisions cannot be appealed to another administrative authority. The Council has up to 18 members, among them a medical director or chief physician from each region, four from the medical societies and two patient representatives, with the industry association, Sundhedsstyrelsen, the Danish Medicines Agency and Amgros as observers without a vote; more than 50 expert committees with more than 500 members, each with at least one patient representative, prepare the assessments. It works to seven principles the parties in the Folketing agreed on 31 March 2016, including that a medicine with well-documented added effect should not be rejected on cost alone and that the price must stand in reasonable relation to the added value. It received 81 applications from companies in 2025, against 66 in 2024.",
          links: [MR_ABOUT, MR_EN, MR_TOR, MR_7P, MR_BACKLOG],
        },
        {
          id: "severity-risk",
          title: "A higher price for severe disease, and deals that share the risk",
          plain:
            "Medicinrådet can accept a higher cost, or weaker evidence than it normally requires, when a disease is very severe: for example when it causes unusually early death or when the medicine is the only real curative treatment. Where the effect is uncertain, Amgros and the company can agree a risk-sharing deal under which the price depends on what the medicine achieves.",
          detail:
            "The severity principle dates from the Council's founding mandate and was revised on 18 December 2020; its examples also include medicines for children and young people aged 0 to 25 and treatments that prevent chronic disability, and the Council says severity does not override other relevant considerations. Two cancer decisions in 2026 show the risk-sharing route. Brexucabtagene autoleucel, a CAR-T therapy, was not recommended in January 2026 for relapsed B-cell acute lymphoblastic leukaemia and mantle cell lymphoma because its cost was not acceptable for the health gain; after an outcome-based agreement in which payment depends on whether patients benefit, it was recommended, for an expected six patients with mantle cell lymphoma and three with B-cell ALL a year. Trastuzumab deruxtecan was recommended in October 2026 for HER2-positive cancer of the stomach and gastro-oesophageal junction and for a group with lung cancer, under an agreement in which the companies repay costs when a patient stops treatment early. In the same month sacituzumab govitecan was not recommended for a group of previously treated breast cancer patients because the Council judged its cost not acceptable for a small effect; the company can return with new data or a new price.",
          links: [MR_SEV, MR_BREXU, MR_TDXD, MR_OCT],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Approval: the European Medicines Agency and Lægemiddelstyrelsen",
      aside: EMA_LEAFLET,
      cards: [
        {
          id: "ema-route",
          title: "New cancer medicines are approved for Denmark through the EU",
          plain:
            "Denmark is an EU member, so every medicine with a new active substance for cancer is evaluated by the European Medicines Agency and authorised by the European Commission for all member states at once. Lægemiddelstyrelsen, the Danish Medicines Agency, works inside that system; whether a hospital medicine is then used is decided by Medicinrådet.",
          detail:
            "Under the EU centralised procedure, all medicines from biotechnology, all advanced therapies, all designated orphan medicines and every medicine with a new active substance for cancer must be evaluated by the European Medicines Agency. After a valid application the Committee for Medicinal Products for Human Use has up to 210 days to give its opinion, and the European Commission then has 67 days to decide; the authorisation is valid across the European Economic Area. The Danish Medicines Agency, with about 650 staff, licenses medicines for the Danish market, authorises clinical trials, monitors side effects, decides which prescription medicines are eligible for reimbursement and supervises pharmacies, and does most of this with the other EU regulators. It sits on Medicinrådet as an observer. The time from European approval to treatment in a Danish hospital is therefore set mainly by Medicinrådet's assessment and the price Amgros agrees.",
          links: [EMA_LEAFLET, DKMA, MR_TOR],
        },
      ],
    },
    {
      id: "pathways",
      nav: "Waiting times",
      title: "A legal maximum wait, cancer pathways, and how often they are met",
      aside: WAITS,
      cards: [
        {
          id: "maximum-waits",
          title: "Investigation within 14 days and treatment within 28, by law",
          plain:
            "Danish law gives most cancer patients a maximum wait. Investigation must start within 14 days of the hospital receiving the referral. Treatment, such as an operation, chemotherapy or radiotherapy, must start within 14 days of the patient agreeing to it and within 28 days of the referral for treatment. If the home region cannot manage that, it must offer another hospital, a private hospital or one abroad.",
          detail:
            "The rights are set in section 88 of the Health Act and executive order no. 584 of 28 April 2015, with Sundhedsstyrelsen's guidance updated in 2024. The same limits apply to follow-on treatment meant to stop the cancer returning. They do not cover cancers needing bone marrow transplantation or skin cancer other than melanoma. A wait beyond the limit can still be lawful when a clinician judges that the patient's health means treatment should wait, for example to treat an infection or to build strength first, or when the patient chooses a later date. If the region cannot find another provider in time it must tell Sundhedsstyrelsen, which must then try to find one. Danske Regioner's fact sheet says that where the rules are broken it is often through a human error, such as a mis-booked operation or a patient not told of the option to go elsewhere, or an unforeseen event such as an emergency operation taking the slot.",
          links: [WAITS, SST_PLANS],
        },
        {
          id: "pakkeforloeb",
          title: "Cancer pathways: 80 per cent completed within the standard time",
          plain:
            "Each suspected cancer follows a cancer pathway (pakkeforløb) with a standard number of days from referral to the start of treatment. In the first three months of 2026, 80 per cent of the 6,568 pathways that ended in treatment were completed within the standard time, from 73 per cent in Region Sjælland to 85 per cent in Region Hovedstaden.",
          detail:
            "The pathways grew out of Kræftplan II of 2005; Kræftplan III, agreed in November 2010, revised all of them and added a diagnostic pathway for people with non-specific symptoms of serious illness that could be cancer. Sundhedsdatastyrelsen measures each quarter the share of pathways where the total time from receiving the referral to the start of first treatment is within the standard time for that cancer and treatment. The national share was 82 per cent in the first quarter of 2025, 77 in the second, 81 in the third and 78 in the fourth. In 2023 there were 160,137 cancer pathways, and in each year from 2014 to 2023 between 26 and 30 per cent confirmed the suspected cancer. The figures are provisional and the authority still calls the underlying data model development data. Across all hospital care in 2023, 24,537 people with cancer were treated with surgery, 16,281 with radiotherapy and 58,083 with medical cancer treatment.",
          links: [SDS_MON, SDS_DEV, SST_KP2, SST_KP3],
        },
        {
          id: "kraeftplan-v",
          title: "Kræftplan V: 600 million kroner a year from 2025",
          plain:
            "Denmark has had five national cancer plans, in 2000, 2005, 2010, 2016 and 2025. The latest, Kræftplan V, published by the government on 23 May 2025, has 36 initiatives and 600 million kroner a year. Its three goals are that patients get the help they need after hospital treatment, that they are involved in decisions about their care, and that survival is at the top among the Nordic countries.",
          detail:
            "Sundhedsstyrelsen's professional proposal for the plan, presented on 15 January 2025, made 11 recommendations under three themes: more individual pathways within the cancer pathways and maximum waits, better support during and after treatment, including late-effects and rehabilitation services, and higher quality through new technology and health data. The June 2025 agreement between the government, Danske Regioner and KL allocated 60 million kroner in 2025 to late-effects clinics and money for basic and specialised palliative care; 111 million kroner for extra treatment capacity in cancer departments in 2025, a lung cancer screening pilot, stronger patient advice for life-threatening illness and wider dental subsidies for cancer patients had already been allocated. The November 2025 agreement adds 180 million kroner in 2026 and 120 million a year from 2027 for investigation and treatment capacity, with radiology, pathology and operating capacity named as pressure points; it has the regions report each year to Sundhedsstyrelsen until 2030, notes that Sundhedsstyrelsen will revise the cancer pathways with DMCG to allow more for individual needs, and widens the national research collaboration DCCC to primary care.",
          links: [SST_KP5, SST_PLANS, KPV_2025, KPV_2026],
        },
      ],
      tables: [
        {
          id: "pathways-by-region",
          title: "Cancer pathways completed within the standard time, by region",
          caption: "Share of organ-specific cancer pathways where treatment started within the standard pathway time, per cent, with the number of pathways, first quarter of 2025 and of 2026.",
          columns: [
            { key: "region", label: "Region" },
            { key: "q125", label: "Q1 2025 (%)", numeric: true },
            { key: "q126", label: "Q1 2026 (%)", numeric: true },
            { key: "n126", label: "Pathways, Q1 2026", numeric: true },
          ],
          rows: [
            { region: "Nordjylland", q125: 84, q126: 77, n126: 673 },
            { region: "Midtjylland", q125: 82, q126: 76, n126: 1461 },
            { region: "Syddanmark", q125: 87, q126: 84, n126: 1411 },
            { region: "Hovedstaden", q125: 84, q126: 85, n126: 2035 },
            { region: "Sjælland", q125: 71, q126: 73, n126: 988 },
            { region: "Denmark", q125: 82, q126: 80, n126: 6568 },
          ],
          note: "Table 1c of the quarterly report, from the National Patient Register on 10 May 2026. Earlier quarters are shown as first published. The figures are provisional, especially for the most recent three or four quarters. The report does not state a national target share.",
          sources: [SDS_MON],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and HPV vaccination",
      aside: { label: "Kræftens Bekæmpelse: screening", url: `${KB}/` },
      cards: [
        {
          id: "programmes",
          title: "Three national programmes: breast, cervix and bowel",
          plain:
            "Denmark invites women aged 50 to 69 for breast screening every two years, women aged 23 to 64 regularly for cervical screening at their own doctor, and everyone aged 50 to 74 every two years for bowel screening with a stool test taken at home. Prostate cancer is not screened for, because no test is accurate enough.",
          detail:
            "The Danish Cancer Society, which recommends taking part in all three, describes the programmes on its screening pages. Breast screening was rolled out to the whole country in 2007 to 2009 and bowel screening began in spring 2014, according to Sundhedsdatastyrelsen, which notes that both raised the number of cancers diagnosed in the years they started. For prostate cancer the Society says there is no test precise and safe enough, that PSA testing causes considerable overdiagnosis, and it does not recommend PSA screening. Kræftplan II of 2005 already recommended screening for cervical, breast and bowel cancer. Participation rates and detection rates by region are published in the clinical quality databases, which were not read for this page.",
          links: [
            { label: "Kræftens Bekæmpelse: screening for brystkræft", url: `${KB}/brystkraeft/` },
            { label: "Kræftens Bekæmpelse: screening for livmoderhalskræft", url: `${KB}/livmoderhalskraeft/` },
            { label: "Kræftens Bekæmpelse: screening for tarmkræft", url: `${KB}/tarmkraeft/` },
            { label: "Kræftens Bekæmpelse: screening for prostatakræft", url: `${KB}/prostatakraeft/` },
            SDS_SURV,
            SDS_DEV,
            SST_KP2,
          ],
        },
        {
          id: "lung-pilot",
          title: "Lung: a pilot with 1,300 heavy smokers on Funen, 2024 to 2027",
          plain:
            "Denmark has no lung cancer screening programme. A pilot funded by Sundhedsstyrelsen and run by Odense University Hospital is offering low-dose CT scans to 1,300 people with heavy tobacco use on Funen from 2024 to 2027, to decide whether a national programme should follow.",
          detail:
            "The Danish Cancer Society's page on the pilot, called PLUS, says the first invitations went out in July 2024. Participants have a low-dose CT scan of the chest and a lung function test, are offered three scans over the project and are encouraged to join a free stop-smoking course; a suspicious finding leads to a cancer pathway. The Society notes that tobacco causes more than 80 per cent of lung cancers in Denmark and that in about 45 per cent of patients the cancer has spread by diagnosis. Money for the pilot comes from Kræftplan V; the November 2025 agreement lists 8.8 million kroner for it in 2026 and 2.7 million in 2027, at 2025 prices.",
          links: [{ label: "Kræftens Bekæmpelse: screening for lungekræft", url: `${KB}/lungekraeft/` }, KPV_2026],
        },
        {
          id: "hpv",
          title: "HPV vaccination: girls since 2009, boys since 2019, coverage back near 90 per cent",
          plain:
            "HPV vaccine has been part of Denmark's free childhood programme for girls since 2009 and for boys since 2019. Coverage fell sharply in 2015 and 2016 and recovered after a national information campaign in 2017; WHO estimates coverage of the girls' target group at 89 to 92 per cent each year from 2020 to 2025.",
          detail:
            "Statens Serum Institut runs the vaccination register and sends reminders to parents; it states that about 328 HPV-associated cervical cancers are seen in Denmark each year. The quadrivalent vaccine was used from 2009 (with a start on 1 October 2008), a two-type vaccine against HPV 16 and 18 from February 2016, and the nine-valent vaccine from 1 November 2017. WHO's estimates for Denmark's primary target cohort of girls were 86 per cent in 2013, 47 per cent in 2016 and 90 per cent in 2025. The 2017 annual report of the programme records concern at the fall in 2015 and 2016 and the campaign Stop HPV, stop livmoderhalskræft launched by Sundhedsstyrelsen in May 2017 with the Danish Cancer Society and the Danish Medical Association; first-dose coverage among 14-year-old girls rose from 47 to 68 per cent in a year. A Danish register study of 867,689 women found a cervical cancer rate 0.14 times that of unvaccinated women among those vaccinated at 16 or younger.",
          links: [SSI_CHILD, SSI_2017, GHO("SDGHPVRECEIVED", "HPV coverage of the primary target cohort of girls"), { label: "Kjaer et al., J Natl Cancer Inst 2021", url: "https://doi.org/10.1093/jnci/djab080" }],
        },
      ],
    },
    {
      id: "doing",
      nav: "Distinctive",
      title: "What Denmark does that others do not",
      cards: [
        {
          id: "national-trials",
          title: "National trials run through cooperative groups",
          plain:
            "Danish cooperative groups have run randomised trials across the whole country. The breast cancer group's 82b trial showed that radiotherapy after mastectomy lengthened survival, the head and neck group's DAHANCA 5 trial showed that the radiosensitiser nimorazole improved control of throat and larynx cancer treated with radiotherapy, and the Funen trial showed that a stool test every two years reduced bowel cancer deaths.",
          detail:
            "DBCG 82b randomised 1,708 premenopausal women after mastectomy for stage II or III breast cancer to chemotherapy with or without radiotherapy to the chest wall and nodes; ten-year overall survival was 54 against 45 per cent. DAHANCA 5-85 randomised 422 patients with cancers of the pharynx and supraglottic larynx to nimorazole or placebo with radiotherapy; locoregional control was 49 against 33 per cent. On Funen, 61,933 people aged 45 to 75 were randomised to faecal occult blood tests every two years or no screening, and deaths from colorectal cancer were 18 per cent lower in the screened group (mortality ratio 0.82). Today 25 national multidisciplinary cancer groups, joined in DMCG.dk since 2004, write Denmark's clinical guidelines and run its clinical quality databases.",
          links: [
            { label: "Overgaard et al., DBCG 82b, NEJM 1997", url: "https://doi.org/10.1056/NEJM199710023371401" },
            { label: "Overgaard et al., DAHANCA 5-85, Radiother Oncol 1998", url: "https://doi.org/10.1016/S0167-8140(97)00220-X" },
            { label: "Kronborg et al., Funen FOB trial, Lancet 1996", url: "https://doi.org/10.1016/S0140-6736(96)03430-7" },
            DMCG,
          ],
        },
        {
          id: "cell-therapy",
          title: "A hospital-made cell therapy tested against a standard drug, with the Netherlands",
          plain:
            "The Center for Cancer Immune Therapy (CCIT) at Herlev Hospital ran, with the Netherlands Cancer Institute, a randomised phase 3 trial of tumour-infiltrating lymphocyte (TIL) therapy, grown from each patient's own tumour, against ipilimumab in advanced melanoma. TIL therapy roughly doubled the time before the cancer progressed.",
          detail:
            "The trial (NCT02278887) was sponsored by the Netherlands Cancer Institute with Copenhagen University Hospital at Herlev as collaborator, and recruited at the two centres. It randomised 168 patients with unresectable stage IIIC or IV melanoma, 86 per cent of whom had disease refractory to PD-1 antibodies. Median progression-free survival was 7.2 months with TIL therapy against 3.1 months with ipilimumab (hazard ratio 0.50), and 49 against 21 per cent of patients responded; median overall survival was 25.8 against 18.9 months. Severe side effects occurred in every patient given TIL therapy, mostly from the chemotherapy given beforehand. The results were published in the New England Journal of Medicine in 2022.",
          links: [
            { label: "Rohaan et al., NEJM 2022", url: "https://doi.org/10.1056/NEJMoa2210233" },
            { label: "ClinicalTrials.gov: NCT02278887", url: "https://clinicaltrials.gov/study/NCT02278887" },
          ],
        },
        {
          id: "linked-registers",
          title: "Registers linked through one identity number, used to measure the system itself",
          plain:
            "Because every Dane has a personal identity number, the cancer registry can be linked to the patient register, the cause of death register and the vaccination register. Denmark uses this to publish cancer survival every year, to track every cancer pathway against its standard time, and to study whether prevention works.",
          detail:
            "Sundhedsdatastyrelsen's Kræftplan V analysis drew on the National Patient Register, the Cancer Registry, the cause of death register, the register of chronic diseases and severe mental illness and the DREAM register of welfare payments. Among people aged 25 to 67 who were earning a wage in the month before a first cancer diagnosis, it found that 84 to 86 per cent were in employment six months later in each year from 2012 to 2022, and after twelve months 66 per cent for lung cancer and 67 per cent for ovarian cancer. A register study of 867,689 Danish women aged 17 to 30, published in 2021, measured HPV vaccine effectiveness against cervical cancer directly. The Danish Comprehensive Cancer Center, set up in 2017 under Kræftplan IV, links research across the regions; it states that twelve national research centres have been set up by the Danish Cancer Society, the regions and DCCC together, with 203 million kroner raised through the Danish Cancer Society's Knæk Cancer campaign.",
          links: [SDS_DEV, { label: "Kjaer et al., J Natl Cancer Inst 2021", url: "https://doi.org/10.1093/jnci/djab080" }, DCCC, { label: "DCCC: nationale forskningscentre", url: "https://www.dccc.dk/nationale-forskningscentre/" }],
        },
      ],
    },
    {
      id: "research",
      nav: "Trials",
      title: "Trials with Danish sites in OnCo's registry data",
      cards: [
        {
          id: "trials-dk",
          title: "422 trials in OnCo's data list a site in Denmark",
          plain:
            "Of the trials OnCo holds with ClinicalTrials.gov site data, 422 list at least one site in Denmark, and 127 of them were recruiting when the data were retrieved on 7 October 2026. Most are international company trials; 19 run in Denmark alone.",
          detail:
            "By lead sponsor the commonest are Merck Sharp and Dohme (45 trials), Hoffmann-La Roche (32), AstraZeneca (31) and Bristol-Myers Squibb (24). The Danish antibody company Genmab leads 11, including the EPCORE trials of epcoritamab in lymphoma and phase 3 trials of rinatabart sesutecan in ovarian and endometrial cancer, and IO Biotech leads 2 of its IO102-IO103 vaccine with pembrolizumab, one in advanced melanoma and one before and after surgery for resectable tumours. Danish hospitals and Aarhus University lead 12, from Rigshospitalet, Zealand University Hospital, Aarhus, Herlev, Odense and Vejle, among them trials of immunotherapy for early mismatch-repair-deficient rectal cancer at Odense, higher-dose radiotherapy to preserve the rectum at Vejle, proton therapy for recurrent rectal cancer at Aarhus and molecularly tailored treatment for advanced pancreatic cancer at Herlev. Registry entries change; check the trial's own page before contacting a site.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with locations in Denmark", url: "https://clinicaltrials.gov/search?cond=cancer&locStr=Denmark&country=Denmark" },
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
        "Several sources a reader would want behind this page could not be read directly. They are named here so the gap is visible, with what was used instead.",
      detail:
        "Sundhedsstyrelsen's website answered plain requests with a browser check, so its cancer plan pages were read through the Internet Archive and its own annual report on cancer pathway times for 2025 was not read; the national figures here come from Sundhedsdatastyrelsen's quarterly report instead. The Folketing's copy of the full report on new cancers in 2024 sat behind a similar check, so the 2024 counts come from the registry's municipal tables, whose totals give people per group but no national age-standardised rate for 2024; the rate quoted is for 2023. eSundhed and Sundhedsdatabanken, which hold registry deaths, regional survival and stage, are interactive applications and were not read; cancer deaths come from Statistics Denmark instead. Sundhedsstyrelsen's screening pages and the clinical quality databases' annual reports on screening participation were not read, so no participation rates are given. No authoritative public count of radiotherapy machines or oncologists was read, and Medicinrådet's average time from application to decision was not found on its pages.",
      links: [
        { label: "eSundhed: kræft", url: "https://www.esundhed.dk/Emner/Kraeft/Nye-kraefttilfaelde" },
        { label: "Sundhedsdatabanken: kræft", url: "https://sundhedsdatabank.dk/sygdomme/kraeft" },
        SST_PLANS,
      ],
    },
    {
      id: "corpus-gaps",
      title: "What this corpus still does not hold about Denmark",
      plain: "Named so the gap is visible rather than invisible. Adding any of these would improve the page.",
      detail:
        "The corpus has no record for Amgros, the regions' purchasing body, for Danske Regioner, for the national clinical quality databases individually, such as the breast cancer database run by DBCG, or for the Danish Centre for Particle Therapy as its own record; it appears only inside the Aarhus University Hospital record. The Danish lung cancer screening pilot PLUS, the diagnostic pathway for non-specific symptoms and the late-effects clinics set up under Kræftplan V have no records of their own. The Danish twin and national patient registers as research resources are not recorded, nor are the DMCG groups other than DBCG and DAHANCA.",
      links: [DMCG, KPV_2026],
    },
  ],
  institutions: [
    "sundhedsstyrelsen", "sundhedsdatastyrelsen", "danish-cancer-registry", "medicinraadet", "danish-medicines-agency", "statens-serum-institut",
    "dccc-denmark", "dmcg-denmark", "danish-cancer-society", "rigshospitalet", "herlev-hospital", "aarhus-university-hospital",
    "odense-university-hospital", "aalborg-university-hospital", "zealand-university-hospital", "vejle-cancer-centre", "ema", "iarc",
  ],
  companies: [
    "dbcg", "dahanca", "genmab", "novo-holdings", "leo-pharma", "bavarian-nordic", "pharmacosmos", "coloplast", "io-biotech", "evaxion", "adcendo",
    "2curex", "curasight", "cystotech", "var2-pharmaceuticals", "fluoguide", "optheras", "expres2ion-biotechnologies",
  ],
  drugs: ["nimorazole", "epcoritamab", "daratumumab", "tisotumab-vedotin", "rinatabart-sesutecan", "acasunlimab", "io102-io103", "trastuzumab-deruxtecan", "sacituzumab-govitecan", "brexucabtagene-autoleucel"],
  trials: [
    "dbcg-82bc", "dahanca-5", "funen-fob", "rejuv-trial-allocare", "nct05732389", "nct04095299", "nct04695782", "nct04087421", "nct07802418",
    "nct05909423", "nct06145074", "nct05709171", "nct07213375", "nct05155254", "nct05280314", "epcore-dlbcl-1", "nct06619236", "nct07166094",
  ],
  papers: [
    "paper-gjerstorff-danish-cancer-registry-sjph-2011",
    "paper-kjaer-hpv-vaccine-cervical-cancer-denmark-jnci-2021",
    "paper-overgaard-n-engl-j-med",
    "paper-overgaard-radiother-oncol",
    "paper-kronborg-funen-faecal-occult-blood-lancet-1996",
    "paper-rohaas-til-vs-ipilimumab-nejm-2022",
    "paper-reinert-ctdna-ultradeep-sequencing-colorectal-jama-oncol-2019",
    "paper-henriksen-ctdna-stage-iii-colorectal-improve-it-ccr-2022",
    "paper-dreyer-xpert-bladder-dablaca-15-eur-urol-2025",
    "paper-mucci-nortwincan-heritability-jama-2016",
  ],
  people: [
    "jens-overgaard", "inge-marie-svane", "mansoor-raza-mirza", "birgitte-klindt-poulsen", "soren-gaard", "rasmus-mogelvang", "thomas-balle-kristensen",
    "christian-sauvr", "jannick-brennum", "lisbet-isenbeg-ravn", "niels-norgaard-pedersen", "lars-dahl-pedersen", "ricco-norman-dyhr",
  ],
  how:
    "Written from Danish sources read in Danish and English: Sundhedsdatastyrelsen's 2024 incidence tables, its survival report for 2010 to 2024, its quarterly monitoring of cancer pathways and its 2013 to 2023 analysis for Kræftplan V; Statistics Denmark's cause of death table; Sundhedsstyrelsen's cancer plan pages, through the Internet Archive; the two Kræftplan V agreements; Danske Regioner on maximum waits and on the regions; Medicinrådet's own pages, terms of reference, principles and 2026 decisions; the Danish Medicines Agency's pages; the EMA leaflet on the centralised procedure; the Danish Cancer Society's screening pages; Statens Serum Institut's vaccination page and 2017 annual report; WHO's Global Health Observatory; and IARC's fact sheet. Every figure was checked against the raw text of the linked page or PDF; papers were resolved by DOI through Europe PMC and their figures read from the abstract. Trial counts come from OnCo's ClinicalTrials.gov capture of 7 October 2026. The entity lists are drawn from the graph by id, with new records for Sundhedsstyrelsen, Sundhedsdatastyrelsen, the Danish Cancer Registry, Medicinrådet, the Danish Medicines Agency, Statens Serum Institut, DCCC, DMCG.dk, two papers and two people.",
  verify:
    "Registry counts for the latest year are revised as late notifications arrive, and survival for the most recent period is estimated; check Sundhedsdatastyrelsen's newest reports before quoting them. Reimbursement thresholds are published for each calendar year. Medicinrådet's recommendations change when companies return with new prices or data. Pathway figures are provisional for the latest quarters. Nothing here is advice about an individual's care.",
  verifyLinks: [SDS_INC, SDS_SURV, SDS_MON, MR_ABOUT, DKMA_THRESH],
};

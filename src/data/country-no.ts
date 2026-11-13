import type { CountryDive } from "@/data/country-dive";

/**
 * Norway deep dive: the hand-written cards for /countries/no/ (wave 8). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: the Cancer Registry of Norway's Cancer in Norway 2024 (PDF text,
 * with its erratum, published by the Norwegian Institute of Public Health on 14 May 2025) and its publication page; the
 * Institute's bowel screening page; the Nye metoder English page; the Institute's page on its role in Nye metoder; the
 * Directorate of Health's general chapter on cancer patient pathways and its 2026 circular on the patient charge cap;
 * the Norwegian Medical Products Agency's English pages; the European Medicines Agency's page on the centralised
 * procedure; WHO's HPV coverage rows and its Global Health Expenditure Database row for Norway from WHO's public data
 * APIs; and IARC's GLOBOCAN 2024 fact sheet for Norway. Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/578-norway-fact-sheet.pdf";
const CIN_2024 = "https://www.fhi.no/en/publ/2025/cancer-in-norway-2024/";
const CIN_2024_PDF = "https://www.fhi.no/contentassets/1d3cf9facb9747a1b9148cb23a7f7c54/cin_report_erratum.pdf";
const BOWEL = "https://www.fhi.no/kreft/kreftscreening/tarmscreening/nar-kommer-invitasjonen/";
const NM_EN = "https://www.nyemetoder.no/english";
const FHI_NM = "https://www.fhi.no/ku/kunnskaps-og-beslutningsstotte/systemet-nye-metoder/";
const PATHWAYS = "https://www.helsedirektoratet.no/nasjonale-forlop/lungekreft/generelt-om-pakkeforlop-for-kreft";
const CAP_2026 = "https://www.helsedirektoratet.no/rundskriv/folketrygdloven-kap-5/rundskriv-til-folketrygdloven--5-3--egenandelstak/egenandelstaket-og-rammene-for-frikortordningen";
const NOMA_ABOUT = "https://www.dmp.no/en/about-us";
const NOMA_FUNDING = "https://dmp.no/en/public-funding-and-pricing-of-medicines";
const EMA_CENTRAL = "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'NOR'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_GHED_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'NOR'";
const CTGOV = "https://clinicaltrials.gov/search?country=Norway&cond=cancer";

export const NO_DIVE: CountryDive = {
  iso2: "NO",
  iso3: "NOR",
  name: "Norway",
  flag: "🇳🇴",
  asOf: "2026-11-11",
  title: "Cancer in Norway",
  description:
    "Cancer in Norway from Norwegian sources: the Cancer Registry's count of 38,811 new cancers and 11,452 deaths in 2024, IARC's 2024 estimate, public hospital care paid by the state with a capped patient charge of 3,278 kroner in 2026, Nye metoder and its Decision Forum for new hospital medicines, cancer patient pathways with time targets, screening for breast, cervical and bowel cancer, and HPV vaccination above 90 per cent.",
  lede:
    "Norway's cancer registry has collected notifications of cancer since 1952. Its registry recorded 38,811 new cancers in 2024 and 347,867 people alive after a cancer diagnosis, and five-year survival across all cancers is close to 78%. Hospital cancer care is publicly funded, and which new hospital medicines it pays for is decided nationally, by the four regional health authorities acting together.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Norway is 39,345 new cancers and 12,472 deaths, an age-standardised incidence of 334.6 per 100,000 (349.8 in men, 323.9 in women) and mortality of 86.4. IARC's method for Norway is trends in the national registry's rates projected to 2024, and for deaths trends in national WHO mortality data projected to 2024. The Cancer Registry's own count for 2024 is 38,811 new cases, and the Cause of Death Registry's preliminary figure is 11,452 deaths; the registry adds that a further 1 to 2% of a year's cases typically arrive after publication. The registry's age-standardised rates use a Norwegian standard population, not IARC's world standard, so its rates (702.9 per 100,000 men and 571.2 per 100,000 women for 2020 to 2024) cannot be set beside IARC's. Both counts include non-melanoma skin cancer.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Norway",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Norway (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 39,000 new cancers a year, with prostate, colorectal, breast and lung leading",
          plain:
            "IARC estimates 39,345 new cancers in Norway in 2024 and 12,472 deaths. Prostate, colorectal, breast and lung cancer are the four commonest, and lung cancer causes the most deaths. Norway's registry says it has among the highest colorectal cancer rates in the world.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 5,671 prostate cancers, 5,102 colorectal cancers (1,998 deaths), 4,500 breast cancers, 3,626 lung cancers (2,462 deaths, a fifth of all cancer deaths) and 2,858 melanomas. The registry's 2024 report names prostate, lung, non-melanoma skin, colon cancer and melanoma as the five commonest in men in 2020 to 2024, and breast, colon, lung, non-melanoma skin cancer and melanoma in women. It reports that Norway still has among the highest colorectal cancer incidence rates in the world, that colorectal cancer is rising in people under 50, and that lung cancer is falling in men of all ages but rising among the oldest women, the generation that took up smoking in the 1960s and 1970s. Breast cancer rates continue to rise, most in women outside the screening ages.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Norway (PDF)", url: IARC_FACTSHEET },
            { label: "Cancer Registry of Norway: Cancer in Norway 2024, foreword and chapter 9 (PDF)", url: CIN_2024_PDF },
          ],
        },
      ],
      tables: [
        {
          id: "cin-2024",
          title: "The registry's own count for 2024",
          caption: "New cases in 2024, age-standardised incidence 2020 to 2024 (Norwegian standard, per 100,000), and five-year relative survival 2020 to 2024 (%)",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "sex", label: "Sex" },
            { key: "cases", label: "New cases 2024", numeric: true },
            { key: "rate", label: "Rate 2020 to 2024", numeric: true },
            { key: "surv", label: "5-year survival %", numeric: true },
          ],
          rows: [
            { site: "All sites", sex: "Men", cases: 20623, rate: 702.9, surv: 77.9 },
            { site: "All sites", sex: "Women", cases: 18188, rate: 571.2, surv: 77.7 },
            { site: "Prostate", sex: "Men", cases: 5207, rate: 178.0, surv: 95.9 },
            { site: "Breast", sex: "Women", cases: 4215, rate: 136.5, surv: 92.8 },
            { site: "Lung", sex: "Men", cases: 1700, rate: 59.7, surv: 28.4 },
            { site: "Lung", sex: "Women", cases: 1735, rate: 52.1, surv: 35.8 },
            { site: "Colon", sex: "Men", cases: 1702, rate: 56.4, surv: 69.8 },
            { site: "Colon", sex: "Women", cases: 1807, rate: 52.8, surv: 71.7 },
            { site: "Melanoma", sex: "Men", cases: 1394, rate: 48.1, surv: 91.9 },
            { site: "Cervix", sex: "Women", cases: 269, rate: 11.8, surv: 82.4 },
          ],
          note: "From Table 2.1 of Cancer in Norway 2024. The rates use a Norwegian standard population and are not comparable with IARC's world-standard rates. Rectal cancer is counted separately from colon cancer.",
          sources: [{ label: "Cancer in Norway 2024, Table 2.1 (PDF)", url: CIN_2024_PDF }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "A national registry since 1952",
      cards: [
        {
          id: "registry-count",
          title: "38,811 new cancers and 347,867 people living after a diagnosis",
          plain:
            "The Cancer Registry of Norway, now part of the Norwegian Institute of Public Health, counted 38,811 new cancers in 2024 and 11,452 cancer deaths. At the end of 2024, 347,867 people in Norway were alive after a cancer diagnosis, nearly 11,000 more than a year before.",
          detail:
            "Cancer in Norway 2024 was published on 14 May 2025 by the Cancer Registry of Norway at the Norwegian Institute of Public Health. It counts 20,623 cases in men and 18,188 in women, and says the five commonest cancers in each sex made up 57.4% of cancers in men and 57.1% in women in 2020 to 2024. Comparing 2020 to 2024 with 2015 to 2019, the combined incidence rate fell by 3.5% in men and rose by 1.8% in women (the English summary rounds these to 4% and 2%). The largest fall was in cervical cancer, 17.2%, and the 2024 rate is the lowest ever reported in Norway. Five-year relative survival ranges from 99.1% for testicular cancer to 8.5% for men with pancreatic cancer excluding neuroendocrine tumours; for lung cancer it rose from 24.1% to 28.4% in men and from 30.1% to 35.8% in women between the two periods. Death figures come from the Cause of Death Registry and were preliminary when the report was published.",
          links: [
            { label: "NIPH: Cancer in Norway 2024 (14 May 2025)", url: CIN_2024 },
            { label: "Cancer in Norway 2024, summary and Table 2.1 (PDF)", url: CIN_2024_PDF },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Who pays for cancer care",
      cards: [
        {
          id: "public-hospitals",
          title: "Public hospitals, run by four regional health authorities, with a yearly cap on what a patient pays",
          plain:
            "Specialist cancer care in Norway is given by public hospitals in four regional health authorities. Patients pay set charges for some services, but once a person's approved charges reach the yearly cap, 3,278 kroner in 2026, they receive an exemption card and pay no more approved charges that year.",
          detail:
            "The Directorate of Health's circular on the National Insurance Act section 5-3 sets the cap on approved patient charges (egenandelstak) for 2026 at 3,278 kroner; a person who has paid that much in approved charges in a calendar year is entitled to an exemption card (frikort) for the rest of the year. Children under 16 pay no charges until 31 July 2026, and from 1 August 2026 the exemption covers everyone under 18. Nye metoder names the four regional health authorities, South-Eastern, Western, Northern and Central Norway, including all their hospitals, as responsible for its system. WHO's Global Health Expenditure Database puts out-of-pocket spending at 13.7% of Norway's current health expenditure in 2023. OnCo did not find a single official statement of which cancer-related costs fall outside the cap; see the gaps.",
          links: [
            { label: "Directorate of Health: the patient charge cap and the exemption card scheme, 2026 (in Norwegian)", url: CAP_2026 },
            { label: "Nye metoder: information in English", url: NM_EN },
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Norway (API)", url: WHO_GHED_API },
          ],
        },
      ],
    },
    {
      id: "assessment",
      nav: "New medicines",
      title: "How a new cancer medicine reaches Norwegian hospitals",
      cards: [
        {
          id: "nye-metoder",
          title: "Nye metoder: the four health authorities decide together, after a price is negotiated",
          plain:
            "Under Nye metoder, launched in 2013, a new hospital medicine, or a new use of one, generally cannot be prescribed in Norwegian hospitals until the Decision Forum of Nye metoder says yes. The Forum is the four regional chief executives. Before it decides, a national agency assesses the medicine and the hospitals' procurement body negotiates the price.",
          detail:
            "Nye metoder's English page describes a national system of managed introduction of new methods in the specialist health service, launched in 2013. Companies seeking public funding for a new medicine or indication must submit a request for assessment. An Ordering Forum of the four regional medical directors and two delegates from the Directorate of Health decides what to assess. The Norwegian Medical Products Agency assesses medicines and devices; the Norwegian Institute of Public Health assesses procedures, says national assessments carry no direct recommendations, and names the priority criteria used in Norway as benefit, resource use and severity. After a single technology assessment, the Norwegian Hospital Procurement Trust negotiates with the company, and the Decision Forum, made up of the four regional chief executives, decides whether to introduce the method. Once an assessment has been commissioned, a medicine may be used under an exemption scheme if specific requirements are met.",
          links: [
            { label: "Nye metoder: information in English", url: NM_EN },
            { label: "Norwegian Institute of Public Health: its role in Nye metoder (in Norwegian)", url: FHI_NM },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Who approves cancer medicines",
      cards: [
        {
          id: "noma-ema",
          title: "European approval through the EEA, then the Norwegian Medical Products Agency",
          plain:
            "Norway is not in the EU, but a European marketing authorisation for a new cancer medicine is valid there under the European Economic Area agreement. The Norwegian Medical Products Agency regulates medicines and devices nationally, assesses cost-effectiveness and sets maximum prices.",
          detail:
            "The European Medicines Agency states that a centralised marketing authorisation granted by the European Commission is valid in all EU member states and in the EEA countries Iceland, Liechtenstein and Norway, and that the centralised procedure is compulsory for medicines containing a new active substance to treat cancer, for biotechnology medicines, advanced therapies and orphan medicines. The Commission's decision is issued within 67 days of EMA's recommendation. Nationally, the Norwegian Medical Products Agency (Direktoratet for medisinske produkter) is responsible for safe medicines and medical devices; its funding and pricing page says it assesses the cost-effectiveness of prescription-only medicines and sets maximum prices. Nye metoder's English page, last updated in November 2024, still calls it by its earlier name, the Norwegian Medicines Agency.",
          links: [
            { label: "European Medicines Agency: authorisation of medicines, the centralised procedure", url: EMA_CENTRAL },
            { label: "Norwegian Medical Products Agency: about us", url: NOMA_ABOUT },
            { label: "Norwegian Medical Products Agency: public funding and pricing of medicines", url: NOMA_FUNDING },
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
          id: "screening-programmes",
          title: "Three national screening programmes, the newest for bowel cancer from 2022",
          plain:
            "Women aged 50 to 69 are invited to mammography every two years, and women aged 25 to 69 to cervical screening, now by HPV testing. Since 2022 men and women are invited at 55 to send a stool sample for bowel cancer screening, and by 2030 everyone aged 55 to 65 will be included.",
          detail:
            "The registry's 2024 report says the breast screening programme began in 1996 as a four-year pilot in four counties and was nationwide by 2005, inviting women aged 50 to 69 to biennial mammography; the cervical programme became nationwide for women aged 25 to 69 in 1995 and moved from cytology to primary HPV testing between 2015 and 2023. The bowel screening page of the Norwegian Institute of Public Health says the Storting decided in 2017 that men and women would be offered screening at 55; the programme started in 2022 with people born in 1967, sends an invitation every second year up to five times, and will include all ages from 55 to 65 from 2030. A positive stool test leads to colonoscopy in hospital. The 2024 report notes that a lung screening programme is being discussed, as is extending breast screening beyond 50 to 69, and that there is extensive unorganised PSA testing for prostate cancer.",
          links: [
            { label: "Cancer in Norway 2024, foreword and chapter 9 (PDF)", url: CIN_2024_PDF },
            { label: "NIPH: bowel screening programme, who is invited (in Norwegian)", url: BOWEL },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccination for girls since 2009 and boys since 2018, with coverage above 90%",
          plain:
            "Norway has offered HPV vaccine to girls through the childhood programme since 2009 and to boys since 2018. WHO and UNICEF's figures put first-dose coverage at 91% for both girls and boys in 2025, and the registry credits the vaccine for the fall in cervical cancer among the youngest women.",
          detail:
            "The registry's 2024 report says HPV vaccination has been offered since 2009 to all girls born in 1997 and later and was extended to boys in 2018, and that in 2024 three birth cohorts of vaccinated women were invited to cervical screening. WHO's immunisation data give programme coverage of 91% for the first dose in girls and in boys in 2025, and 92% (girls) and 91% (boys) for the last dose. The report's foreword says the cervical cancer rate for 2024 was about 7 per 100,000 on the world standard population, against WHO's elimination threshold of fewer than 4, and that cervical dysplasia still occurs among vaccinated women, so screening remains important.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage, Norway (API)", url: WHO_HPV_API },
            { label: "Cancer in Norway 2024, foreword (PDF)", url: CIN_2024_PDF },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing differently",
      title: "What Norway does differently",
      cards: [
        {
          id: "pathways",
          title: "Cancer patient pathways with a 70% time target",
          plain:
            "Since 2015 a patient referred with a well-founded suspicion of cancer enters a cancer patient pathway (pakkeforløp), which sets the maximum time in calendar days for each step from referral to the start of treatment. The goal is that 70% of pathways are completed within that time.",
          detail:
            "The Directorate of Health's general chapter on cancer patient pathways says they were introduced in 2015, and that in 2026 there are 24 organ-specific pathways, one for metastatic cancer and one diagnostic pathway for non-specific symptoms that could be cancer, each with a diagnostic guide for general practitioners. The target is that 70% of pathways are completed within the maximum recommended time. The times are not a new patient right but are meant to set the norm; the legal basis remains the Patient and User Rights Act section 2-2 and the priority regulations. The Norwegian Institute of Public Health measures pathway times from codes entered at set points. Revised times for thirteen pathways, among them breast, prostate, colorectal and pancreatic cancer, apply from 1 September 2026.",
          links: [{ label: "Directorate of Health: general information on cancer patient pathways (in Norwegian)", url: PATHWAYS }],
        },
        {
          id: "joint-decisions",
          title: "One national decision on each new hospital medicine",
          plain:
            "Instead of each hospital or region deciding, Norway's four regional health authorities decide together whether a new hospital medicine is introduced, after a national assessment and a negotiated price.",
          detail:
            "Nye metoder states that certain methods, medicines among them, must always be processed at the national level, while other methods can be assessed by a hospital in a local mini-HTA. Decisions at the national level are made by the four regional health authorities in concert, through the Decision Forum of their chief executives, after the Norwegian Hospital Procurement Trust has negotiated with the supplier. Until the Forum decides, a new medicine or indication generally cannot be prescribed in hospitals, apart from use under the exemption scheme once an assessment has been commissioned.",
          links: [{ label: "Nye metoder: information in English", url: NM_EN }],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      cards: [
        {
          id: "trial-count",
          title: "238 trials in OnCo's records have a site in Norway",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, 238 of the cancer trials in our records list a site in Norway, among them trials of PARP inhibitors, immunotherapy and CAR-T cells. A selection is listed below.",
          detail:
            "OnCo's graph holds ClinicalTrials.gov participation snapshots for its trials, and 238 list Norway among their countries; that reflects the trials OnCo holds, mostly large industry and academic trials of new medicines, not every study run in Norway. When OnCo built its country file on 8 September 2026, ClinicalTrials.gov counted 5,761 studies of any condition with a site in Norway. OpenAlex, counting works whose primary topic is oncology and counting a paper for every country among its authors' affiliations, gives Norway 557 works in 2021, 516 in 2022, 546 in 2023, 498 in 2024 and 520 in 2025, 2,637 in total, of which 2,021 are open access and 164 highly cited.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with a site in Norway (search)", url: CTGOV }],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "costs-outside-cap",
      title: "What a cancer patient pays outside the cap",
      plain:
        "OnCo did not find one official statement of which costs a cancer patient in Norway meets outside the yearly charge cap, such as travel, medicines bought without a blue prescription or care abroad, so this page gives the cap and not a full account of costs.",
      detail:
        "The Directorate of Health circular read for this page gives the 2026 cap and the age exemptions. It does not list every cost a cancer patient might meet, and helsenorge.no's page on charges and exemption cards returned 404 to a plain request on 11 November 2026. Nye metoder's list of medicines it has introduced or declined, and the prices it negotiated, were not read.",
      links: [{ label: "Directorate of Health: the patient charge cap, 2026 (in Norwegian)", url: CAP_2026 }],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Radiotherapy capacity, waiting times against the 70% pathway target, the share of medicines approved by the Decision Forum and stage at diagnosis are not on this page because OnCo did not read them from a primary source.",
      detail:
        "The Norwegian Institute of Public Health publishes pathway times, and the IAEA's DIRAC database lists radiotherapy machines; neither was read for this page. The registry report's chapters on stage and its special issue on life after a cancer diagnosis were not read. The date the Norwegian Medicines Agency became the Norwegian Medical Products Agency was not confirmed from a primary source that answered a plain request, so it is not given.",
      links: [
        { label: "Cancer in Norway 2024 (PDF)", url: CIN_2024_PDF },
        { label: "Directorate of Health: cancer patient pathways (in Norwegian)", url: PATHWAYS },
      ],
    },
  ],
  institutions: [
    "cancer-registry-of-norway", "nye-metoder-norway", "noma-norway", "oslo-radium-hospital", "haukeland-university-hospital",
    "akershus-university-hospital", "norwegian-cancer-society", "barnekreftforeningen", "ema", "iarc",
  ],
  companies: ["nykode-therapeutics", "photocure", "zelluna", "oncosyne", "nadeno-nanoscience"],
  drugs: [],
  trials: ["alsympca", "prima", "keynote-a18", "cartitude-5", "karmma-3", "echelon-1", "eortc-40983", "monaleesa-2"],
  papers: [],
  people: [],
  how:
    "Every card was written from Norwegian official sources read in full rather than through a summary: the Cancer Registry of Norway's Cancer in Norway 2024 and its publication page; the Norwegian Institute of Public Health's bowel screening page and its page on Nye metoder; Nye metoder's English page; the Directorate of Health's chapter on cancer patient pathways and its 2026 circular on the charge cap; the Norwegian Medical Products Agency's English pages; the European Medicines Agency's page on the centralised procedure; WHO's HPV coverage and health expenditure rows from its public data APIs; and IARC's GLOBOCAN 2024 fact sheet. Trials were counted from OnCo's ClinicalTrials.gov participation data, and research output from OpenAlex. The new records added for this page (the registry, Nye metoder and the medicines agency) carry their own sources.",
  verify:
    "Which medicines Norwegian hospitals use changes with each Decision Forum meeting, and pathway times were revised from 1 September 2026. Check Nye metoder for the current decision on a specific medicine, and ask the treating hospital what applies to you.",
  verifyLinks: [
    { label: "Nye metoder", url: "https://www.nyemetoder.no" },
    { label: "Cancer Registry of Norway", url: "https://www.fhi.no/kreft/kreftregisteret/" },
    { label: "Norwegian Medical Products Agency", url: "https://www.dmp.no/en" },
  ],
};

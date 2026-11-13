import type { CountryDive } from "@/data/country-dive";

/**
 * Slovenia deep dive: the hand-written cards for /countries/si/ (wave 11). Slovenian sources were read in Slovenian, and
 * every figure was read from the raw text of its source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN
 * 2024 fact sheet for Slovenia (PDF text), the Cancer Registry of the Republic of Slovenia's page and its summary report
 * "Rak v Sloveniji 2023" (PDF text), the SLORA portal's home page, the National Cancer Control Programme 2022 to 2026
 * (DPOR, PDF text) and a DPOR news item of October 2026, the ZORA, DORA and Svit screening programme pages, the ZZZS
 * pages on compulsory insurance and the compulsory health contribution, JAZMP's pages on the agency, prices and health
 * technology assessment, the EFPIA Patients W.A.I.T. Indicator 2024 survey (PDF text, chart values located by position),
 * a government news item on UKC Maribor, WHO's HPV coverage and Global Health Expenditure Database rows from WHO's
 * public data APIs, IAEA DIRAC's public equipment data, and the paper's abstract through Europe PMC. The registry's full
 * 2023 annual report link answered with a web page rather than the PDF; what could not be read is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/705-slovenia-fact-sheet.pdf";
const RRS = "https://www.onko-i.si/rrs/register-raka-republike-slovenije";
const SLORA = "https://www.slora.si/";
const RAK_2023 = "https://www.onko-i.si/fileadmin/onko/datoteke/dokumenti/2026/Rak_v_Sloveniji_2023_povzetek.pdf";
const DPOR = "https://www.dpor.si/";
const DPOR_PDF = "http://www.dpor.si/wp-content/uploads/2021/12/Drzavni-program-obvladovanja-raka-2022-2026.pdf";
const DPOR_BREAST = "https://www.dpor.si/novice/zakljucuje-se-roznati-oktober-mesec-ozavescanja-o-raku-dojk-zgodnje-odkrivanje-in-kakovostna-obravnava-sta-kljucna-pri-obvladovanju-raka-dojk/";
const ZORA_UPGRADE = "https://zora.onko-i.si/novice/novica/nova-nadgradnja-programa-zora-prinasa-sodobnejse-in-zanesljivejse-presejanje";
const ZORA_RESULTS = "https://zora.onko-i.si/program-zora/kljucni-dosezki-programa-zora";
const DORA = "https://dora.onko-i.si/presejanje_za_raka_dojk";
const SVIT = "https://www.program-svit.si/za-uporabnike/o-programu/kako-poteka-program-svit/";
const SVIT_ONAS = "https://www.program-svit.si/za-uporabnike/o-nas/";
const ZZZS_CONTR = "https://www.zzzs.si/en/compulsory-health-insurance/contributions-for-compulsory-health-insurance/";
const ZZZS_KAJ = "https://www.zzzs.si/kaj-je-zdravstveno-zavarovanje/";
const ZZZS_OZP = "https://zavezanec.zzzs.si/prispevki-za-obvezno-zdravstveno-zavarovanje/obvezni-zdravstveni-prispevek/";
const ZZZS_MED = "https://www.zzzs.si/en/compulsory-health-insurance/the-extent-of-rights-deriving-from-compulsory-health-insurance/medicaments-on-prescription/";
const JAZMP_ID = "https://www.jazmp.si/o-nas/osebna-izkaznica-agencije/";
const JAZMP_PRICES = "https://www.jazmp.si/humana-zdravila/cene-zdravil/";
const JAZMP_HTA = "https://www.jazmp.si/humana-zdravila/hta/";
const EMA_AUTH = "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines";
const WAIT_2024 = "https://www.iqvia.com/-/media/iqvia/pdfs/library/publications/efpia-patients-wait-indicator-2024.pdf";
const MB_ONCO = "https://www.gov.si/novice/2026-11-11-evropska-sredstva-za-siritev-onkoloske-dejavnosti-v-ukc-maribor/";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'SVN'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'SVN'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHEGDP_SHA2011?$filter=SpatialDim%20eq%20'SVN'";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const CTGOV = "https://clinicaltrials.gov/search?country=Slovenia&cond=cancer";

export const SI_DIVE: CountryDive = {
  iso2: "SI",
  iso3: "SVN",
  name: "Slovenia",
  flag: "🇸🇮",
  asOf: "2026-11-11",
  title: "Cancer in Slovenia",
  description:
    "Cancer in Slovenia from Slovenian sources: a national cancer registry kept since 1950 that counted 19,111 new cancers in 2023, one public insurer that since 2024 covers the basket of care in full, with a flat monthly contribution replacing complementary insurance, the JAZMP regulator inside the EU system, three national screening programmes, and cervical cancer cases down from 210 in 2003 to 81 in 2024.",
  lede:
    "Slovenia has counted every cancer since 1950, in a national registry at the Institute of Oncology Ljubljana. Its latest report counts 19,111 new cancers in 2023, 13,666 of them other than non-melanoma skin cancer, and 6,691 cancer deaths. One public insurer pays for care, and three national screening programmes invite people for cervical, breast and bowel cancer screening.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Slovenia is 14,264 new cancers and 6,899 deaths, an age-standardised incidence of 296.8 per 100,000 (335.2 in men, 268.3 in women) and mortality of 113.9. The fact sheet gives the incidence source as Slovenia's national registry, projected to 2024 from trends in national rates, and mortality from WHO's national data. The registry's own count for 2023 is higher, 19,111, because it includes 5,445 non-melanoma skin cancers, which IARC estimates at only 699. Excluding those skin cancers the two agree closely: 13,666 counted by the registry for 2023 and 13,565 estimated by IARC for 2024. The registry's age-standardised rate of 406.6 per 100,000 uses the European standard population, not the world standard IARC uses, so the two rates cannot be compared directly.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Slovenia",
      aside: { label: "Cancer Registry of the Republic of Slovenia", url: RRS },
      cards: [
        {
          id: "shape",
          title: "About 14,000 new cancers a year by IARC's estimate, with prostate cancer the commonest",
          plain:
            "IARC estimates 14,264 new cancers in Slovenia in 2024, 7,862 in men and 6,402 in women, and 6,899 cancer deaths. Prostate, lung, breast and colorectal cancer are the commonest, followed by melanoma. Lung cancer causes the most cancer deaths, followed by colorectal and breast cancer.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,804 prostate cancers (464 deaths), 1,686 lung cancers (1,264 deaths), 1,655 breast cancers (496 deaths), 1,532 colorectal cancers (722 deaths) and 721 melanomas (131 deaths). Pancreatic cancer is seventh by cases, with 486, but fifth by deaths, with 455. The risk of developing a cancer before age 75 is 33.0% for men and 26.0% for women, and 45,033 people are estimated to be living within five years of a diagnosis. Unlike many countries' estimates these rest on a national registry, so IARC projects the registry's own trends forward rather than modelling from deaths.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Slovenia (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "registry-1950",
          title: "A national registry since 1950, with cancer reporting compulsory by law",
          plain:
            "The Cancer Registry of the Republic of Slovenia was founded in 1950 at the Institute of Oncology Ljubljana, and every health provider must report cancer to it. It counted 19,111 new cancers in 2023, and 62% of adults diagnosed from 2019 to 2023 were alive five years later, allowing for other causes of death.",
          detail:
            "The registry describes itself as one of the oldest population-based registries in Europe and has been a member of the International Association of Cancer Registries since that body began in 1968. Since 2019 it has been moving to active registration, in which hospitals send it lists of eligible patients from their own systems, and paper forms are being phased out. Its summary report for 2023, published in September 2026, counts 10,483 cancers in men and 8,628 in women, 6,691 deaths and 142,393 people alive who had ever had cancer; 68% of men and 62% of women were diagnosed after age 65. Five-year net survival was 60% for men and 64% for women. The report attributes more than half of the rise in cancer incidence to an ageing population, and says the surge in prostate cancer came mainly from wide PSA testing of men without symptoms. Most of its data can be explored on the SLORA portal.",
          links: [
            { label: "Cancer Registry of the Republic of Slovenia", url: RRS },
            { label: "Rak v Sloveniji 2023, registry summary report (PDF)", url: RAK_2023 },
            { label: "SLORA: Slovenia and cancer, data portal", url: SLORA },
          ],
        },
      ],
      tables: [
        {
          id: "si-registry-2023",
          title: "Slovenia's cancer registry counts for 2023",
          caption: "New cases, deaths and people ever diagnosed who were alive, Slovenia 2023, from the registry's summary report. Counts, not estimates.",
          columns: [
            { key: "measure", label: "Measure" },
            { key: "men", label: "Men", numeric: true },
            { key: "women", label: "Women", numeric: true },
            { key: "both", label: "Both sexes", numeric: true },
          ],
          rows: [
            { measure: "New cancers, all sites", men: 10483, women: 8628, both: 19111 },
            { measure: "New cancers, excluding non-melanoma skin", men: 7681, women: 5985, both: 13666 },
            { measure: "Cancer deaths", men: 3825, women: 2866, both: 6691 },
            { measure: "Alive after a cancer diagnosis at any time", men: 66747, women: 75646, both: 142393 },
          ],
          note: "The registry counts non-melanoma skin cancer, which IARC largely leaves out, so its all-sites total is well above GLOBOCAN's. Prevalence is from the report's text; its chart gives 75,648 women and 142,395 in all.",
          sources: [{ label: "Rak v Sloveniji 2023, registry summary report (PDF)", url: RAK_2023 }],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy and cancer centres",
      aside: { label: "IAEA DIRAC: radiotherapy equipment by centre", url: DIRAC },
      cards: [
        {
          id: "radiotherapy",
          title: "Twelve linear accelerators in two centres, Ljubljana and Maribor",
          plain:
            "IAEA's radiotherapy directory lists two centres in Slovenia with 12 linear accelerators: seven at the Institute of Oncology Ljubljana, which also has brachytherapy, and five at the university hospital in Maribor. EU funds approved in November 2026 are to expand oncology in Maribor.",
          detail:
            "IAEA DIRAC's public equipment data, read on 11 November 2026 with both Slovenian entries updated in 2026, list the Institute of Oncology Ljubljana with 7 linear accelerators and 5 brachytherapy units and UKC Maribor with 5 linear accelerators, and no cobalt machines. With DIRAC's population figure of about 2.13 million, that is roughly 5.6 machines per million people. On 11 November 2026 the government announced that the European Regional Development Fund will contribute €15,085,134.93 to a €65,738,002.33 project to bring oncology, nuclear medicine and haematology at UKC Maribor onto one site with more space, so that patients from north-east Slovenia can be treated closer to home.",
          links: [
            { label: "IAEA DIRAC: radiotherapy equipment by centre (read 11 November 2026)", url: DIRAC },
            { label: "Government news: EU funds for expanding oncology at UKC Maribor (11 November 2026)", url: MB_ONCO },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "ZZZS: the compulsory health contribution", url: ZZZS_OZP },
      cards: [
        {
          id: "one-insurer",
          title: "One public insurer, and since 2024 no co-payments within the basket of care",
          plain:
            "Health insurance in Slovenia is compulsory and run by one public body, ZZZS. Voluntary complementary insurance, which covered co-payments, was abolished at the end of 2023; since January 2024 insured people pay a flat compulsory health contribution, now €39.36 a month, and compulsory insurance covers the basket of care in full.",
          detail:
            "ZZZS began work on 1 March 1992 under the Health Care and Health Insurance Act, and insurance is compulsory for everyone who meets the conditions in that act, as an insured person or a family member. Contributions depend on salary or other income, and for groups such as the unemployed or people receiving social assistance they are paid from national or local budgets. Voluntary complementary insurance ended on 31 December 2023 and the compulsory health contribution began on 1 January 2024. ZZZS says compulsory insurance now covers the basket of rights 100%, and warns people not to buy extra insurance sold as a way to avoid co-payments. The contribution is €39.36 a month from March 2026 to February 2027, uprated every 1 March with average gross wages; it cannot be written off, deferred or paid in instalments, and for some groups, such as recipients of permanent social assistance and refugees, the state budget pays it.",
          links: [
            { label: "ZZZS: the compulsory health contribution", url: ZZZS_OZP },
            { label: "ZZZS: what health insurance is", url: ZZZS_KAJ },
            { label: "ZZZS: contributions for compulsory health insurance (English)", url: ZZZS_CONTR },
          ],
        },
        {
          id: "spending-medicines",
          title: "Out-of-pocket payment is about an eighth of health spending",
          plain:
            "WHO puts out-of-pocket payment at 12.4% of Slovenia's health spending in 2023, the year before complementary insurance ended, and total health spending at 9.3% of GDP. ZZZS pays for medicines on its positive list; JAZMP caps their prices by comparison with Germany, Austria and France.",
          detail:
            "WHO's Global Health Expenditure Database gives out-of-pocket spending of 12.4% of current health expenditure in 2023, 12.4% in 2022 and 12.9% in 2021, and current health expenditure of 9.3% of GDP in 2023; the database has no year yet after the 2024 change. ZZZS covers the cost of medicines on the positive list and not those on the negative list; a doctor may prescribe medicines that insurance does not cover, and the patient then pays. Medicines given by injection or needing a health professional are given at the clinic, not collected from a pharmacy. JAZMP sets the regulated price of every medicine paid from public funds, as a maximum wholesale price based on prices in Germany, Austria and France, and buyers may agree lower prices.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Slovenia (API)", url: WHO_OOP_API },
            { label: "WHO Global Health Expenditure Database: health spending as share of GDP, Slovenia (API)", url: WHO_CHE_API },
            { label: "ZZZS: medicines on prescription (English)", url: ZZZS_MED },
            { label: "JAZMP: medicine prices", url: JAZMP_PRICES },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved",
      aside: { label: "JAZMP", url: "https://www.jazmp.si/" },
      cards: [
        {
          id: "jazmp",
          title: "JAZMP, inside the European system",
          plain:
            "New cancer medicines reach Slovenia through the EU's centralised procedure: one authorisation from the European Commission, on the advice of the European Medicines Agency, for every member state. Slovenia's own agency, JAZMP, supervises medicines nationally and sets the prices of those paid from public funds.",
          detail:
            "JAZMP describes itself as a member of the European Medicines Regulatory Network. It regulates and supervises medicines, medical devices, blood, tissues and cells, authorises clinical trials and runs pharmacovigilance. For new active substances to treat cancer the centralised procedure is compulsory, so authorisation comes from Brussels and the question for a Slovenian patient is when the medicine is reimbursed. Health technology assessment is a separate job: under the Act on Quality Assurance in Health Care, the body responsible for applying the EU regulation on health technology assessment (2021/2282) is the Public Agency of the Republic of Slovenia for Quality in Health Care.",
          links: [
            { label: "JAZMP: agency profile", url: JAZMP_ID },
            { label: "EMA: authorisation of medicines, scope of the centralised procedure", url: EMA_AUTH },
            { label: "JAZMP: health technology assessment", url: JAZMP_HTA },
          ],
        },
        {
          id: "wait-oncology",
          title: "34 of 56 new EU cancer medicines reimbursed, after 591 days on average",
          plain:
            "The industry's 2024 W.A.I.T. survey counted 56 cancer medicines authorised for the EU from 2020 to 2023. By January 2025, 34 of them (61%) were available to Slovenian patients through reimbursement, against an EU average of 28 (50%). On average they took 591 days after EU authorisation, close to the EU average of 586.",
          detail:
            "The EFPIA Patients W.A.I.T. Indicator 2024 survey, prepared by IQVIA with data correct to 5 January 2025, covers medicines centrally authorised from 2020 to 2023. For Slovenia it counts a medicine as available if it is reimbursed through the regular system or automatically reimbursed. Its oncology charts give Slovenia 34 of 56 cancer medicines available (61%) and a mean of 591 days from authorisation to availability, with 33 dates submitted; the EU averages are 28 medicines (50%) and 586 days. These values were read from the survey's chart labels by their position on the page. The survey is commissioned by the pharmaceutical industry and measures reimbursement, not whether a given patient can get a medicine.",
          links: [{ label: "EFPIA Patients W.A.I.T. Indicator 2024 Survey, IQVIA, pages 22, 26 and appendix (PDF)", url: WAIT_2024 }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "Državni program obvladovanja raka (DPOR)", url: DPOR },
      cards: [
        {
          id: "dora-svit",
          title: "Breast screening for women aged 50 to 69 and bowel screening for everyone aged 50 to 74",
          plain:
            "DORA invites women aged 50 to 69 for a mammogram every two years, and 81% of those invited took part in the first half of 2026. Programme Svit sends people aged 50 to 74 a home stool test every two years; in 2025, 66% of those whose invitation was delivered agreed to take part.",
          detail:
            "DORA, run by the Institute of Oncology Ljubljana, includes every woman in Slovenia aged 50 to 69 without a previous breast cancer and aims to cut breast cancer deaths in that group by 25 to 30%. A DPOR news item says 81% of invited women took part in the first half of 2026 and breast cancer was found in 329 of them, and that a pilot study of widening the age range was ending. Programme Svit, founded by the Ministry of Health in 2007 and held by the National Institute of Public Health, refers people with a positive stool test to colonoscopy and is free for those with compulsory insurance. In 2025 it invited 322,786 people, 321,291 invitations were delivered, and 212,052 people (66.00% of those delivered) returned the form agreeing to take part, against its aim of at least 70%. The registry reports that colorectal cancer incidence has fallen since 2014, after rising before Svit began.",
          links: [
            { label: "DORA: breast screening", url: DORA },
            { label: "DPOR: breast cancer awareness month (October 2026)", url: DPOR_BREAST },
            { label: "Programme Svit: how it works", url: SVIT },
            { label: "Programme Svit: about us and yearly figures", url: SVIT_ONAS },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccination reaches about 42% of girls, against a target of 80%",
          plain:
            "Slovenia offers HPV vaccination to girls in the sixth year of primary school and, since 2021, to boys. WHO's figures show 42% of girls and 26% of boys vaccinated in 2025. The national cancer plan set a target of at least 80% of girls by 2026.",
          detail:
            "WHO's immunisation rows for Slovenia give HPV coverage for girls of 44% in 2010, the first year with data, 38 to 50% through to 2018, a peak of 57% in 2019 and 56% in 2020, then 38% in 2021, 45% in 2022 and 2023, 43% in 2024 and 42% in 2025. Rows for boys begin in 2022 at 23% and reach 26% in 2025. The National Cancer Control Programme 2022 to 2026 says vaccination is recommended for girls in the sixth class of primary school, that boys could be vaccinated from the 2021/2022 school year, and sets the 80% target for girls aged 11 to 12. Even at about half coverage, a 2025 study in Slovenia's screening registry found 42% fewer high-grade cervical lesions in the first vaccinated cohorts.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Slovenia (public API)", url: WHO_HPV_API },
            { label: "Državni program obvladovanja raka 2022 to 2026, section 1.6 (PDF)", url: DPOR_PDF },
            { label: "Irzaldy et al., HPV vaccination and CIN2+ in Slovenia (Lancet Reg Health Eur 2025)", url: "https://doi.org/10.1016/j.lanepe.2024.101203" },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What Slovenia does differently",
      cards: [
        {
          id: "cervical-elimination",
          title: "Cervical cancer cut by more than half, and screening moving to the HPV test",
          plain:
            "In 2003, when the organised cervical screening programme ZORA began, about 210 Slovenian women developed cervical cancer. In 2024 there were 81, the fewest since the programme began. ZORA expects to start replacing the smear test with an HPV test in 2027, phased in over five years, with a five-year interval after a negative HPV test, for women aged 25 to 64.",
          detail:
            "ZORA invites women through the central population register to a smear test at their own gynaecologist. It reached its 70% coverage target among women aged 20 to 64 in 2007 to 2009, and it notes that most women who develop cervical cancer have not been screening. A rule that came into force on 20 May 2026 upgrades it over five years: no screening under 25 from 1 January 2027, a validated HPV test with reflex cytology from the same sample, expected to start in 2027, a five-year interval after a negative HPV test, and no active invitations after 64. ZORA says cervical cancer, the commonest cancer in Slovenian women in the early 1960s, is nearing the threshold for elimination as a public health problem, fewer than 4 cases per 100,000 women.",
          links: [
            { label: "ZORA: the upgrade of the programme (2026)", url: ZORA_UPGRADE },
            { label: "ZORA: key achievements", url: ZORA_RESULTS },
          ],
        },
        {
          id: "national-programme",
          title: "A national cancer plan run by the cancer institute itself",
          plain:
            "Slovenia's National Cancer Control Programme is held by the Ministry of Health but managed and led by the Institute of Oncology Ljubljana, which also keeps the national registry and runs the cervical and breast screening programmes. The third plan covers 2022 to 2026.",
          detail:
            "The first programme, for 2010 to 2015, and the second, for 2017 to 2021, were adopted by the government in 2010 and 2017; the 2022 to 2026 plan follows the direction of Europe's Beating Cancer Plan and sets goals from prevention and screening through treatment, rehabilitation, palliative care, research and education, each with a named body and a deadline. DPOR's October 2026 news refers to a DPOR 2027 to 2036 in preparation. The Institute of Oncology Ljubljana also works on electrochemotherapy, electric pulses that let a chemotherapy drug into tumour cells: a researcher from its Department of Experimental Oncology co-wrote the 2018 European standard operating procedures, and it sponsors a single-group trial of electrochemotherapy for locally recurrent vulvar cancer.",
          links: [
            { label: "Državni program obvladovanja raka 2022 to 2026 (PDF)", url: DPOR_PDF },
            { label: "Gehl et al., updated standard operating procedures for electrochemotherapy (Acta Oncol 2018)", url: "https://doi.org/10.1080/0284186X.2018.1454602" },
            { label: "ClinicalTrials.gov: NCT05916690, electrochemotherapy for vulvar cancer", url: "https://clinicaltrials.gov/study/NCT05916690" },
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
          id: "trial-sites",
          title: "26 trials in OnCo's records have a site in Slovenia",
          plain:
            "OnCo's ClinicalTrials.gov participation data finds 26 trials with a Slovenian site, from breast cancer trials such as AMAROS, APHINITY and IBCSG 23-01 to company trials still recruiting. Two are sponsored by the Institute of Oncology Ljubljana itself.",
          detail:
            "The Ljubljana-sponsored studies are PILDI, a phase 2 trial of lidocaine given around the time of colon cancer surgery and its effect on the immune response, and a single-group trial of electrochemotherapy for locally recurrent vulvar cancer, which ClinicalTrials.gov lists with no phase and a status last verified in January 2024. ClinicalTrials.gov now redirects two other registration numbers held in OnCo's data, NCT07432399 and NCT07443475, to these two studies (NCT06923787 and NCT05916690), so they are counted once here. Others include the EORTC trial of stereotactic radiotherapy with ivonescimab for lung cancer brain metastases, the SIOPEN high-risk neuroblastoma studies, the RAPIDO rectal cancer trial, and recruiting trials in myeloma, uveal melanoma and endometrial cancer. OnCo's data covers the trials in its graph, not every trial registered, so a search of ClinicalTrials.gov itself will find more.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Slovenia", url: CTGOV },
            { label: "ClinicalTrials.gov: NCT06923787, PILDI study", url: "https://clinicaltrials.gov/study/NCT06923787" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "full-report",
      title: "The registry's full 2023 report and site-by-site counts were not read",
      plain:
        "The link to the Cancer Registry's full annual report for 2023 answered with a web page rather than the PDF, so this page uses the registry's summary report. Counts for each cancer site from the registry are on the SLORA portal, which OnCo did not query.",
      detail:
        "The summary report gives totals, shares by site and survival, but not site-by-site counts, which is why the profile table shows totals and the cancer-by-cancer figures on this page are IARC's. SLORA's interactive tool builds tables by site, sex, age and period, and is the place to check a specific cancer. The cervical cancer counts of about 210 in 2003 and 81 in 2024 come from ZORA's pages, which quote the registry; ZORA's home page gives 211 for 2003, and notes that with so few cases the yearly count fluctuates (131 in 2020, 100 in 2023).",
      links: [
        { label: "SLORA: Slovenia and cancer, data portal", url: SLORA },
        { label: "Rak v Sloveniji 2023, registry summary report (PDF)", url: RAK_2023 },
      ],
    },
    {
      id: "workforce-waits",
      title: "Cancer workforce and waiting times were not found in a primary source",
      plain:
        "OnCo did not find a primary source giving the number of oncologists, radiation oncologists or pathologists in Slovenia, or official waiting times to start cancer treatment. Both matter to patients, but no figure is given here without a source.",
      detail:
        "ZZZS has a page on booking health services and waiting times, which was not read for this page. The National Cancer Control Programme 2022 to 2026 says modern cancer care needs specialists focused on oncology and depends on staff and space, and requires that a suspected cancer be referred as \"zelo hitro\" (very fast), within 14 days, but the parts read here give no current staff counts or measured waits. The effect of the 2024 change from complementary insurance to the compulsory contribution on out-of-pocket spending is not yet in WHO's expenditure data, whose latest year is 2023.",
      links: [
        { label: "Državni program obvladovanja raka 2022 to 2026 (PDF)", url: DPOR_PDF },
        { label: "WHO Global Health Expenditure Database: out-of-pocket share, Slovenia (API)", url: WHO_OOP_API },
      ],
    },
    {
      id: "right-to-be-forgotten",
      title: "Slovenia's law on the right to be forgotten after cancer was not read",
      plain:
        "Several European countries limit what insurers and lenders may ask about a past cancer. A 2025 review lists a Slovenian law of November 2024, in force in 2025, with a standard period of 7 years, but OnCo could not read the statute itself, so its exact terms are not given here.",
      detail:
        "OnCo's glossary entry on the right to be forgotten after cancer tabulates European laws as a 2025 ESMO Open review states them, including Slovenia's. When it was written in November 2026 the Slovenian PIS legal register was a JavaScript application, the National Assembly site did not answer and the Official Gazette search could not be driven without a browser, so for Slovenia the review is the only source. The review notes that for a diagnosis before age 18 the period is 5 years in every jurisdiction it lists. A patient who needs to know should ask the insurer or lender what applies.",
      links: [
        { label: "OnCo glossary: the right to be forgotten after cancer in Europe", url: "/terms/right-to-be-forgotten-cancer-europe/" },
        { label: "Ministrstvo za zdravje (gov.si)", url: "https://www.gov.si/drzavni-organi/ministrstva/ministrstvo-za-zdravje/" },
      ],
    },
  ],
  institutions: [
    "onkoloski-institut-ljubljana", "slovenia-ministry-of-health", "zzzs-slovenia", "jazmp-slovenia", "nijz-slovenia",
    "cancer-registry-slovenia", "ukc-maribor", "slovenian-association-psychosocial-oncology-palliative-care", "ema", "iaea", "who", "iarc",
  ],
  companies: [],
  drugs: [],
  trials: [
    "nct03591510", "nct00781612", "nct03148418", "nct06065748", "amaros", "aphinity", "nct05566795", "nct06923787",
    "nct07443475", "nct04221035", "ibcsg-23-01", "impassion130", "ipatunity130", "lidera", "nct06152575",
    "nct07015190", "nct07234877", "nct07044336", "raise", "rapido", "nct04421963", "hr-nbl1", "stevie", "nct05132075",
    "nct05797831", "nct00066703",
  ],
  papers: ["paper-irzaldy-hpv-vaccination-cin2-slovenia-lanepe-2025", "paper-gehl-acta-oncol"],
  people: [],
  how:
    "Every card was written from Slovenian official sources and international agencies, read in full rather than through a summary: the Cancer Registry's page and its 2023 summary report, the SLORA portal, the National Cancer Control Programme 2022 to 2026 and its news pages, the ZORA, DORA and Svit programme pages, ZZZS and JAZMP pages, a government news item on UKC Maribor, the EFPIA W.A.I.T. 2024 survey, WHO's HPV coverage and health expenditure rows from its public data APIs, IAEA DIRAC's public equipment data, IARC's GLOBOCAN 2024 fact sheet, and papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the Ministry, ZZZS, JAZMP, NIJZ, the cancer registry, UKC Maribor and one paper) carry their own sources.",
  verify:
    "Screening rules are changing: ZORA moves to HPV testing from 2027, and DORA is piloting a wider age range. The compulsory health contribution is uprated every March, and which medicines ZZZS reimburses changes often. Ask your doctor, the Institute of Oncology Ljubljana or ZZZS what applies to you.",
  verifyLinks: [
    { label: "Onkološki inštitut Ljubljana", url: "https://www.onko-i.si/" },
    { label: "ZZZS", url: "https://www.zzzs.si/" },
    { label: "SLORA cancer data portal", url: SLORA },
    { label: "Državni program obvladovanja raka", url: DPOR },
  ],
};

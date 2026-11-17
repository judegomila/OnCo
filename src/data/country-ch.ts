import type { CountryDive } from "@/data/country-dive";

/**
 * Switzerland deep dive: the hand-written cards for /countries/ch/. Swiss sources were read in German (and French where
 * a page was only in French) on 2026-11-03: the Federal Statistical Office's key figures workbook and its open data on
 * stats.swiss, the NKRS pages and care-quality reports, the consolidated statutes on fedlex (KVG, KVV, KLV, KRG),
 * Swissmedic's 2025 report on new active substances and its CIRS benchmarking note, and the Swiss Cancer Institute's
 * own pages. Every figure below was checked against the raw text or table, not a summary of it.
 */
const BFS = "https://www.bfs.admin.ch/bfs/de/home/statistiken/gesundheit/gesundheitszustand/krankheiten/krebs.html";
const BFS_KEY = "https://dam-api.bfs.admin.ch/hub/api/dam/assets/36582275/master";
const BFS_METHODS = "https://dam-api.bfs.admin.ch/hub/api/dam/assets/36531516/master";
const BFS_REPORT = "https://dam-api.bfs.admin.ch/hub/api/dam/assets/19305696/master";
const STATS = "https://stats.swiss/vis?lc=de&df%5bds%5d=disseminate&df%5bid%5d=DF_STATKREBS_MEASURES&df%5bag%5d=CH1.STATKREBS&df%5bvs%5d=1.0.0";
const NKRS_PROSTATE = "https://www.nkrs.ch/upload/downloads/Berichte%20und%20Statistiken/KennzahlenZuDiagnoseUndTherapie/Kurzbericht_zu_Prostatakrebskennzahlen_2020_2023.pdf";
const NKRS_BREAST = "https://www.nkrs.ch/upload/downloads/Berichte%20und%20Statistiken/KennzahlenZuDiagnoseUndTherapie/Summary_BreastCancerIndicators_2020-2022_DE.pdf";
const KRG = "https://www.fedlex.admin.ch/eli/cc/2018/289/de";
const KVG = "https://www.fedlex.admin.ch/eli/cc/1995/1328_1328_1328/de";
const KVV = "https://www.fedlex.admin.ch/eli/cc/1995/3867_3867_3867/de";
const KLV = "https://www.fedlex.admin.ch/eli/cc/1995/4964_4964_4964/de";
const SM_NAS = "https://www.swissmedic.ch/swissmedic/de/home/humanarzneimittel/authorisations/new-medicines/zl-ham-nas-ie-2024.html";
const SM_NAS_PDF = "https://www.swissmedic.ch/dam/swissmedic/de/dokumente/zulassung/zl_hmv_iv/zl-ham-nas-ie-2025.pdf.download.pdf/DE_NAS_JB25_260212_web.pdf";
const SM_CIRS = "https://www.swissmedic.ch/swissmedic/de/home/news/mitteilungen/internationale-studie-zlzeiten-2025.html";
const SM_GB = "https://www.swissmedic.ch/swissmedic/de/home/news/mitteilungen/geschaeftsbericht-2025.html";
const IPH = "https://www.interpharma.ch/wp-content/uploads/2026/03/IPH-Innovationsreport-2025-DE.pdf";
const SCI = "https://www.swisscancerinstitute.ch/de/ueber-uns/ueber-swiss-cancer-institute/";

export const CH_DIVE: CountryDive = {
  iso2: "CH",
  iso3: "CHE",
  name: "Switzerland",
  flag: "🇨🇭",
  asOf: "2026-11-03",
  title: "Cancer in Switzerland",
  description: "Cancer in Switzerland from its own sources: the Federal Statistical Office's count of about 50,800 new cancers and 17,200 cancer deaths in 2022, national registration made compulsory in 2020, basic insurance with a capped co-payment, the Spezialitätenliste and its 60-day rule, single-case payment for drugs not yet listed, Swissmedic's approval times, and the national trials group that was SAKK.",
  lede: "Switzerland is home to Roche and Novartis in Basel, and has recorded every adult cancer nationally only since a law of 2016 took effect in 2020. Basic insurance is compulsory and caps what a patient pays, but a new drug is paid for only once the federal health office lists it, and doctors and insurers have a legal route for the months in between.",
  globocanNote: "GLOBOCAN 2024's estimate for Switzerland is 56,828 new cancers and 19,408 deaths for 2024. Its all-cancers total includes 7,417 non-melanoma skin cancers, which the Swiss national count leaves out; without them GLOBOCAN's figure is 49,411, between the Federal Statistical Office's 2018-2022 annual average of 48,137 and its single-year 2022 count of 50,834. The Swiss office counted 17,220 cancer deaths in 2022, from its own cause-of-death statistics; OnCo could not establish from either source why GLOBOCAN's death estimate is about 2,200 higher, beyond the two years being different. The office's own world-standardised rates for 2018-2022, 271.8 new cancers and 74.4 deaths per 100,000, are the ones to set beside the ASR column here, remembering that GLOBOCAN's all-cancers rate includes non-melanoma skin cancer and the office's does not; its headline rates use the 1976 European standard and are not comparable.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Switzerland",
      aside: { label: "BFS: Nationale Krebsstatistik", url: BFS },
      cards: [
        {
          id: "the-count",
          title: "About 50,800 new cancers and 17,200 cancer deaths in 2022",
          plain: "The Federal Statistical Office counted 28,141 new cancers in men and 22,693 in women in 2022, not including the common skin cancers, and 9,310 and 7,910 cancer deaths. Prostate cancer is the commonest cancer in men and breast cancer in women; lung, bowel and melanoma follow. About one man in four and one woman in five is diagnosed with cancer before 70.",
          detail: "The office's key figures workbook (Kennzahlen zu Krebs, updated 10 November 2025) gives for 2022: 28,141 new cases in men and 22,693 in women, estimated from registry data and excluding non-melanoma skin cancer; incidence rates of 450.67 and 348.29 per 100,000 on the 1976 European standard; a cumulative risk before 70 of 25.3 and 21.5 per cent; 9,310 and 7,910 cancer deaths, 25.5 per cent of all deaths in men and 20.8 per cent in women; and 34,381 men and 30,352 women hospitalised with cancer as the main diagnosis. Averaged over 2018-2022, the open data put the commonest cancers at about 8,300 prostate cancers a year, 6,760 breast cancers in women, 5,060 lung, 4,560 colorectal and 3,510 melanomas. The median age at diagnosis was 70 for all cancers, and 64 for breast cancer. Lung cancer causes the most cancer deaths, about 3,260 a year; breast cancer is the commonest cause of cancer death in women, at 17.6 per cent of women's cancer deaths. The office's next release, covering 1984-2023, is scheduled for 16 November 2026.",
          links: [
            { label: "BFS: Kennzahlen zu Krebs 2020-2022 (XLSX)", url: BFS_KEY },
            { label: "BFS: Nationale Krebsstatistik, overview by site (German)", url: BFS },
            { label: "stats.swiss: Cancer key figures by language region, site, sex and period", url: STATS },
          ],
        },
        {
          id: "coverage",
          title: "Why the national figures are still partly an estimate",
          plain: "Swiss cancer registration grew canton by canton from 1969, so for most of its history only part of the country was counted and national figures were estimated from the covered cantons. By 2018-2022 registries covered 98.3 per cent of the population. Since a federal law took effect in 2020, every canton is covered and every cancer must be reported.",
          detail: "The office's methods note (2026) sets out how a national figure is made: observed cases are weighted up by the ratio of total population to registered population, stratified by age, sex and language region, to compensate for cantons or years without registration. The share of the population covered was 55.3 per cent in 1993-1997, 67.4 per cent in 2008-2012, 91.6 per cent in 2013-2017 and 98.3 per cent in 2018-2022; the French- and Italian-speaking cantons have been fully covered since 2006 and the German-speaking ones since 2020. The first registry opened in Basel in 1969 (electronic data from 1981), followed by Geneva in 1970 and Vaud and Neuchâtel in 1974; Bern began in 2014, Solothurn in 2019, and Schwyz and Schaffhausen joined on 1 January 2020. The note also records quality limits: in the Basel registry, linkage with death certificates was complete only from 2013, and for Zurich it is documented only from 1997; whether it was complete for 1980-1996 can no longer be established. Children and adolescents under 20 are counted by the national Childhood Cancer Registry in Bern, about 247 new cases a year in 2019-2023.",
          links: [
            { label: "BFS: Methoden der nationalen Krebsstatistik (PDF, 2026)", url: BFS_METHODS },
            { label: "NKRS: history of cancer registration in Switzerland", url: "https://www.nkrs.ch/de/die-krebsregistrierung-kurz-erklaert/geschichte-des-nkrs" },
          ],
        },
        {
          id: "what-is-changing",
          title: "What is changing: lung cancer in women, bowel cancer in the young, and melanoma",
          plain: "Over thirty years lung cancer has become less common in Swiss men and more common in women, though women's death rate has stopped rising. Bowel cancer has been falling since 2000 overall but slowly rising in adults under 50. Melanoma is common in Switzerland and still rising, while deaths from it have stayed stable.",
          detail: "The office reports that since 1993 lung cancer incidence and mortality rates fell by 31 and 48 per cent in men and rose by 72 and 40 per cent in women, with women's mortality no longer rising between 2013-2017 and 2018-2022. Colorectal incidence fell by 21 per cent in men and 10 per cent in women between 1998-2002 and 2018-2022, and mortality by 45 and 41 per cent over thirty years. A 2026 national study on the NKRS dataset found the opposite trend under 50: of 96,410 adults diagnosed from 1980 to 2021, 6.1 per cent were under 50, incidence in that group rose by about 0.5 per cent a year, and 27.7 per cent of early-onset cancers were stage IV against 19.4 per cent at 75 and over. Melanoma incidence rose 78 per cent in men and 65 per cent in women over thirty years, and the 2021 Swiss Cancer Report noted that Switzerland's melanoma rate is above the average of the comparison countries while most other rates are low. Breast cancer mortality has fallen 44 per cent since 1993 and prostate cancer mortality 50 per cent.",
          links: [
            { label: "BFS: Nationale Krebsstatistik, trends by site (German)", url: BFS },
            { label: "Fournier et al., early-onset colorectal cancer in Switzerland (Eur J Cancer 2026)", url: "https://doi.org/10.1016/j.ejca.2026.116707" },
            { label: "Schweizerischer Krebsbericht 2021 (PDF)", url: BFS_REPORT },
          ],
        },
        {
          id: "survival",
          title: "Survival: about two in three people are alive five years after diagnosis",
          plain: "In the latest national report, 64 per cent of men and 67 per cent of women were alive five years after a cancer diagnosis, compared with the general population of the same age. That had risen from 61 and 64 per cent in 2003-2007. These are averages across all cancers and all stages, from people diagnosed in 2013-2017.",
          detail: "The Swiss Cancer Report 2021 gives relative five-year survival for 2013-2017 of 63.8 per cent in men and 67.1 per cent in women (absolute survival 56.4 and 61.5 per cent), up from 61 and 64 per cent in 2003-2007; relative ten-year survival rose from 54 to 57 per cent in men and from 57 to 60 per cent in women. It attributes the rise in part to earlier detection, for example of breast cancer, and to better treatment, and places Switzerland in the upper middle of the international comparison. On 31 December 2017, 65,762 men and 62,781 women were living with a cancer diagnosed in the previous five years. Newer site-specific figures come from the NKRS: in 2020-2023, relative survival with prostate cancer was 97 per cent at three years, and observed three-year survival ranged from 98 per cent in the lowest-risk group to 58 per cent with distant metastases; the office's cancer report, which carries survival, appears every five years, and the 2021 edition is the latest OnCo found.",
          links: [
            { label: "Schweizerischer Krebsbericht 2021 (PDF)", url: BFS_REPORT },
            { label: "NKRS: Diagnose und Therapie von Prostatakrebs 2020-2023 (PDF)", url: NKRS_PROSTATE },
          ],
        },
      ],
      tables: [
        {
          id: "key-figures-2022",
          title: "Cancer in Switzerland, 2022: the Federal Statistical Office's key figures",
          caption: "Single year 2022; counts and rates per 100,000 on the 1976 European standard population",
          columns: [
            { key: "measure", label: "Measure" },
            { key: "men", label: "Men", numeric: true },
            { key: "women", label: "Women", numeric: true },
          ],
          rows: [
            { id: "new", measure: "New cancers (excluding non-melanoma skin cancer)", men: 28141, women: 22693 },
            { id: "inc", measure: "Incidence rate (European standard 1976)", men: 450.67, women: 348.29 },
            { id: "risk", measure: "Cumulative risk before age 70, %", men: 25.3, women: 21.5 },
            { id: "deaths", measure: "Cancer deaths", men: 9310, women: 7910 },
            { id: "share", measure: "Share of all deaths, %", men: 25.5, women: 20.8 },
            { id: "mort", measure: "Mortality rate (European standard 1976)", men: 133.2, women: 94.8 },
            { id: "hosp", measure: "Patients hospitalised with cancer as main diagnosis", men: 34381, women: 30352 },
          ],
          note: "New cases are national estimates from cantonal registry data pooled by the NKRS; deaths are from the cause-of-death statistics. Statistics updated 10 November 2025.",
          sources: [{ label: "BFS, Kennzahlen zu Krebs (T 14.03.03.03.01.00, XLSX)", url: BFS_KEY }],
        },
        {
          id: "sites-2018-2022",
          title: "The commonest cancers, 2018-2022 annual average",
          caption: "Both sexes; average new cases and deaths a year, and median age at diagnosis",
          columns: [
            { key: "site", label: "Cancer site" },
            { key: "cases", label: "New cases a year", numeric: true },
            { key: "deaths", label: "Deaths a year", numeric: true },
            { key: "age", label: "Median age at diagnosis", numeric: true },
          ],
          rows: [
            { id: "all", site: "All cancers (excluding non-melanoma skin)", cases: 48137, deaths: 17116, age: 70 },
            { id: "prostate", site: "Prostate", cases: 8297, deaths: 1342, age: 71 },
            { id: "breast", site: "Breast (both sexes; 59 a year in men)", cases: 6819, deaths: 1377, age: 64 },
            { id: "lung", site: "Lung, bronchus and trachea", cases: 5060, deaths: 3262, age: 71 },
            { id: "colorectal", site: "Colon and rectum", cases: 4562, deaths: 1606, age: 72 },
            { id: "melanoma", site: "Skin melanoma", cases: 3513, deaths: 295, age: 67 },
            { id: "pancreas", site: "Pancreas", cases: 1780, deaths: 1461, age: 74 },
            { id: "nhl", site: "Non-Hodgkin lymphoma", cases: 1690, deaths: 541, age: 71 },
            { id: "bladder", site: "Bladder", cases: 1364, deaths: 587, age: 75 },
            { id: "leukaemia", site: "Leukaemia", cases: 1278, deaths: 553, age: 71 },
            { id: "kidney", site: "Kidney", cases: 1170, deaths: 298, age: 69 },
          ],
          note: "Five-year annual averages, rounded to whole cases and whole years of age. The national figures are weighted estimates, so men and women do not add exactly to the both-sexes total. Uterus, liver and other sites are in the open data.",
          sources: [{ label: "stats.swiss, DF_STATKREBS_MEASURES (FSO, NACR, ChCR), released 10 November 2025", url: STATS }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registration",
      title: "A national registry since 2020, and what it now measures",
      aside: { label: "NKRS", url: "https://www.nkrs.ch/de/" },
      cards: [
        {
          id: "krg",
          title: "Every cancer must be reported, and every patient may say no",
          plain: "Since 1 January 2020 doctors, hospitals and laboratories that diagnose or treat a cancer must report it to the cantonal registry where the patient lives, with its stage and first treatment. Patients must be told, and can object at any time without giving a reason. If they object within three months, their data are destroyed before they are ever registered.",
          detail: "The Federal Act on the Registration of Cancer Diseases (Krebsregistrierungsgesetz, KRG, SR 818.33) was passed in March 2016 and came into force on 1 January 2020 with its ordinance (KRV) of April 2018. Article 3 obliges doctors, hospitals and other health institutions that diagnose or treat a cancer to record and report basic data: name, AHV insurance number, address, date of birth, sex, diagnostic data and first treatment. The NKRS adds that reports are due within four weeks, that in-situ tumours, tumours of uncertain behaviour and benign tumours of the central nervous system and pituitary are reportable, and that breast, colorectal and prostate cancer in adults, and all cancers in children, carry additional data on predispositions and comorbidities. Article 6 makes registration conditional on the patient not objecting after being informed. Registration happens no earlier than three months after the report; an objection after that deletes the personal data, keeps the disease data, and applies for life and across cantons. Adults are registered by 13 cantonal registries, children and young people up to 20 by the national Childhood Cancer Registry, and the NKRS, run by the NICER foundation, pools and checks the data. Article 34 required the Federal Office of Public Health to evaluate the Act within five years of its entry into force.",
          links: [
            { label: "Krebsregistrierungsgesetz (KRG), SR 818.33", url: KRG },
            { label: "NKRS: duty to report", url: "https://www.nkrs.ch/de/meldepflicht/meldepflicht" },
            { label: "NKRS: the right to object", url: "https://www.nkrs.ch/de/betroffene/ihr-recht-auf-widerspruch" },
            { label: "NKRS: the 13 cantonal registries", url: "https://www.nkrs.ch/de/die-krebsregistrierung-kurz-erklaert/krebsregister" },
          ],
        },
        {
          id: "care-quality",
          title: "What the registry now shows about care: tumour boards and overdiagnosis",
          plain: "Because the law asks for diagnosis and first-treatment data, the national registry now reports how breast and prostate cancer are treated across the whole country. In breast cancer, 85 per cent of treatment decisions were made by a team of specialists meeting together. In prostate cancer it was 56 per cent, and the registry says some men are being diagnosed and treated who need not be.",
          detail: "The NKRS analysed more than 20,000 breast cancers and precursors from 2020-2022 against 38 indicators, and more than 35,000 prostate cancers from 2020-2023 against 32, published with Swiss Urology in September 2026. For prostate cancer, about 8,929 cases a year at an average age of 71 (the report's mittleres Erkrankungsalter): 76 per cent were found by opportunistic early-detection testing, 13 per cent incidentally and 7 per cent from symptoms; 35 per cent of men had surgery (or rarely HIFU), 25 per cent hormone therapy, 19 per cent radiotherapy, 20 per cent active surveillance and 4 per cent watchful waiting; 72 per cent of low-risk cancers went on active surveillance; 30-day mortality after radical prostatectomy was 0.2 per cent. The report concludes that care is broadly guideline-concordant, that avoidable overdiagnosis and overtreatment occur, pointing to low-risk tumours found in men over 80, and recommends restraint in PSA testing where life expectancy is under ten years, evaluating an organised programme like those for breast and bowel cancer, and discussing every new case at a tumour board. For breast cancer, 85 per cent of treatment decisions were taken at a tumour board, and in cantons with a programme, 34 per cent of invasive cancers and 52 per cent of precursors in women of screening age were found by the programme. Both reports caution that 2020 was the first year of compulsory reporting and of the pandemic, and treatment may be under-reported.",
          links: [
            { label: "NKRS: Diagnose und Therapie von Prostatakrebs in der Schweiz 2020-2023 (PDF)", url: NKRS_PROSTATE },
            { label: "NKRS: Diagnose und Therapie von Brustkrebs in der Schweiz 2020-2022 (PDF)", url: NKRS_BREAST },
            { label: "NKRS: Kennzahlen zu Diagnose und Therapie", url: "https://www.nkrs.ch/de/statistiken-und-berichte/kennzahlen-zu-diagnose-und-therapie" },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Who pays: compulsory basic insurance with a capped share",
      cards: [
        {
          id: "kvg",
          title: "Everyone must buy basic insurance, and the premium does not depend on income",
          plain: "Everyone living in Switzerland must take out basic health insurance within three months of arriving or being born. It is sold by competing private insurers, but the benefits are set by federal law, and each insurer charges the same premium to everyone of the same age group in the same region. Cantons reduce premiums for people on lower incomes.",
          detail: "The Health Insurance Act (KVG, SR 832.10) makes basic insurance (obligatorische Krankenpflegeversicherung, OKP) compulsory for everyone resident in Switzerland (Article 3). Article 61 requires an insurer to charge its insured the same premium unless the Act provides otherwise, graded by canton and, within limits set by the Federal Department of Home Affairs, by region, with lower premiums for children and young adults; premiums are a flat amount per person, not a share of income. Cantons pay premium reductions to people on modest incomes (Article 65). What the insurance covers is the same for everyone, and every covered service must be effective, appropriate and economical (Article 32), the WZW criteria that also decide which cancer medicines are paid for.",
          links: [
            { label: "KVG, SR 832.10 (fedlex)", url: KVG },
          ],
        },
        {
          id: "what-it-costs",
          title: "What a patient pays: at most CHF 1,000 a year on the standard deductible, plus CHF 15 a day in hospital",
          plain: "An adult pays the first CHF 300 of costs each year, the deductible, then 10 per cent of everything above it until that share reaches CHF 700. On the standard deductible the most an adult pays for covered care in a year is CHF 1,000, plus CHF 15 for each day in hospital. People who choose a higher deductible, up to CHF 2,500, pay lower premiums but more before insurance starts paying.",
          detail: "KVG Article 64 sets the cost share as a fixed annual deductible (Franchise) plus 10 per cent of costs above it (Selbstbehalt). KVV Article 103 fixes the ordinary deductible at CHF 300 a year and the annual ceiling on the 10 per cent share at CHF 700 for adults and CHF 350 for children, who pay no deductible. KVV Article 93 lets adults choose deductibles of CHF 500, 1,000, 1,500, 2,000 or 2,500 in exchange for a premium reduction capped by Article 95. KVV Article 104 adds a contribution of CHF 15 a day to the cost of a hospital stay, not charged for the day of discharge or for children and young adults in education. One exception raises the share: under KLV Article 38a, a medicine whose price is at least 10 per cent above the average of the cheapest third of products with the same active substance carries a 40 per cent share instead of 10, which matters for tablets that have generics. The cap applies to covered care; costs the insurance does not cover, loss of earnings and travel are outside it.",
          links: [
            { label: "KVG Article 64 (fedlex)", url: KVG },
            { label: "KVV Articles 93, 103 and 104 (fedlex)", url: KVV },
            { label: "KLV Article 38a (fedlex)", url: KLV },
          ],
        },
        {
          id: "screening",
          title: "Screening: mammography and bowel screening without the deductible, where a canton runs a programme",
          plain: "Basic insurance pays for a screening mammogram every two years from age 50 when it is done in a quality-assured screening programme, without the deductible, and for bowel cancer screening from 50 to 74, with the deductible waived inside a cantonal programme. Not every canton runs one, so what a person is offered depends on where they live.",
          detail: "KLV Article 12e lists the screening basic insurance pays for. Screening mammography is covered every two years from the 50th birthday within a programme meeting the 1999 ordinance on quality assurance in mammography screening, with no deductible. Colorectal screening is covered from 50 to 74, as a faecal occult blood test every two years with colonoscopy if positive, or colonoscopy every ten years; the deductible is waived when it is done in the programmes of Basel-Landschaft, Basel-Stadt, Bern, Fribourg, Geneva, Glarus, Graubünden, Jura, Lucerne, Neuchâtel, Solothurn, St Gallen, Ticino, Uri, Vaud or Valais, sixteen of the 26 cantons. Cervical smears are covered, but testing for human papillomavirus in cervical screening is excluded. There is no organised prostate programme; the NKRS reports that three in four prostate cancers are found by opportunistic early-detection testing outside one. The NKRS breast report says about half of the women invited to a programme take part.",
          links: [
            { label: "KLV Article 12e (fedlex)", url: KLV },
            { label: "NKRS: Diagnose und Therapie von Brustkrebs 2020-2022 (PDF)", url: NKRS_BREAST },
          ],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Reimbursement",
      title: "Getting a cancer drug paid for: the Spezialitätenliste, and the route around it",
      aside: { label: "Spezialitätenliste", url: "https://sl.bag.admin.ch/sl" },
      cards: [
        {
          id: "sl",
          title: "A drug is paid for once the federal health office lists it, at a price set by comparison",
          plain: "Swissmedic's approval means a medicine may be sold; it does not mean insurance pays for it. Basic insurance pays for a medicine once the Federal Office of Public Health puts it on the Spezialitätenliste, after judging that it is effective, appropriate and economical. The price is set half by comparison with other drugs for the same disease and half by its price in nine European countries.",
          detail: "KVV Article 65 makes a valid Swissmedic authorisation a precondition and requires the WZW criteria. KVV Article 65b defines economic as achieving the intended effect at the lowest possible cost, assessed by a therapeutic cross-comparison with the average price of other medicines for the same disease and by a foreign price comparison, the two weighted half each. KLV Article 34abis names the reference countries: Belgium, Denmark, Germany, Finland, France, the United Kingdom, the Netherlands, Austria and Sweden. The Federal Drugs Commission advises the BAG on the list (KVV Article 37e). The BAG can attach conditions and time limits to a listing, for example for a medicine whose effectiveness or economy is still being clarified where alternatives are lacking (KVV Article 65 paragraph 5). Neither the KVV nor the KLV sets a cost-per-QALY threshold. Under KVV Article 71 the BAG publishes the list itself, the basis of its effectiveness and cross-comparison assessment and the reference-country average price where the commission was consulted, the reasons for refusing or deleting a listing, and, once an application arrives, the drug, the disease and the date; what it does not publish is the basis of confidential rebates agreed with the company.",
          links: [
            { label: "KVV Articles 37e, 65, 65b and 71 (fedlex)", url: KVV },
            { label: "KLV Article 34abis (fedlex)", url: KLV },
            { label: "Spezialitätenliste (BAG)", url: "https://sl.bag.admin.ch/sl" },
          ],
        },
        {
          id: "sixty-days",
          title: "The 60-day rule, and the 219-day reality the industry reports",
          plain: "A company can apply to the federal health office before Swissmedic's final approval, and when it does the rules say the office decides as a rule within 60 days of approval. The pharmaceutical industry's association calculated that in 2025 this happened for 4 per cent of new medicines, and that the median wait from approval to listing was 219 days. OnCo could not find the office's own figure.",
          detail: "KVV Article 69 paragraph 4 allows an application once Swissmedic has confirmed the indication and dose in its preliminary decision (Vorbescheid), and Article 69a allows a preliminary consultation and, after one with Swissmedic, filing even before the preliminary decision. KLV Article 31b then says that where the conditions were met before final authorisation, the BAG decides as a rule within 60 days of it; KLV Article 31c requires the company to tell the BAG within 30 days of filing with Swissmedic. Interpharma's Innovationsreport 2025 states that only four per cent of newly authorised medicines were decided within 60 days in 2025, and that the median time from authorisation to listing was 219 days, citing its own calculations from the Spezialitätenliste and Swissmedic data. That is an industry association's figure, not a government one; the BAG may publish its own monitoring, but OnCo did not find it. Of the 40 new active substances Swissmedic authorised in 2025, 11 were for cancer and haematological malignancies.",
          links: [
            { label: "KLV Articles 31b and 31c (fedlex)", url: KLV },
            { label: "KVV Articles 69 and 69a (fedlex)", url: KVV },
            { label: "Interpharma, Innovationsreport 2025 (PDF, industry association)", url: IPH },
          ],
        },
        {
          id: "single-case",
          title: "Before a drug is listed, or outside its label: payment case by case",
          plain: "If a cancer drug is not on the list, or is to be used outside its approved use, a patient's insurer can still agree to pay in a single case. After consulting its medical adviser, the insurer must judge that a large benefit is expected against a serious disease and that there is no effective approved alternative. The insurer must decide within two weeks and must explain a refusal.",
          detail: "KVV Articles 71a to 71d set the rules, in their current form since 1 January 2024. Article 71a covers listed medicines used outside the label or the listing limitation; 71b, Swissmedic-authorised medicines not on the list; 71c, imported medicines not authorised in Switzerland but authorised for the indication in a country whose system Swissmedic recognises as equivalent. The core condition is that a large therapeutic benefit is expected against a disease that can be fatal or cause severe chronic harm and, for lack of alternatives, no other effective authorised treatment is available. The insurer sets the price with the company: for benefit-based cases the discount on the listed or foreign reference price is set by benefit category and is at most 50 per cent. Article 71d requires prior approval (Kostengutsprache) after consulting the insurer's medical adviser, a decision within two weeks of a complete request, reasons to doctor and patient for a refusal, and, for a rare-disease medicine likely to be refused without clinical trials, the opinion of a clinical expert. The decision is each insurer's, so two patients with the same cancer can receive different answers.",
          links: [
            { label: "KVV Articles 71a-71d (fedlex)", url: KVV },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Swissmedic: its own approvals, outside the EU, and how fast",
      aside: { label: "Swissmedic: new active substances 2025", url: SM_NAS },
      cards: [
        {
          id: "speed",
          title: "A median of 392 days in 2025, and 321 days for cancer drugs reviewed with the FDA",
          plain: "Switzerland is not in the EU, so a cancer medicine needs its own Swiss approval from Swissmedic. In 2025 Swissmedic approved 40 medicines with new active substances, 11 of them for cancer and blood cancers, taking a median of 392 calendar days. Medicines reviewed together with the FDA and other regulators in Project Orbis took 321 days.",
          detail: "Swissmedic's 2025 report on new active substances gives a median throughput of 392 calendar days for the 40 applications, 52 days (12 per cent) faster than 2024's 444. Half were authorised in procedures with standard deadlines, with a median of 458 days against a maximum of 540, and half in accelerated procedures, median 338 days; the fast-track procedure (beschleunigtes Zulassungsverfahren) was used for six, median 288 days against a 350-day limit. Two were temporary (befristete) authorisations. Reliance on a foreign decision under Article 13 of the Therapeutic Products Act was used for seven, median 391 days. Ten approvals, 25 per cent, came through international work-sharing: eight in the Access Consortium with Australia, Canada, Singapore and the United Kingdom (median 395 days), and two cancer medicines in the FDA-led Project Orbis (median 321 days). The eleven oncology approvals included erdafitinib, belantamab mafodotin, datopotamab deruxtecan, mirvetuximab soravtansine, serplulimab, inavolisib, lazertinib, selinexor, quizartinib and zolbetuximab.",
          links: [
            { label: "Swissmedic: Zulassungen mit neuem Wirkstoff 2025, annual report (PDF)", url: SM_NAS_PDF },
            { label: "Swissmedic: new medicines 2025 (German)", url: SM_NAS },
            { label: "Swissmedic: annual report 2025 press release", url: SM_GB },
          ],
        },
        {
          id: "benchmark",
          title: "Compared with the EMA and FDA, and why availability is late anyway",
          plain: "An independent comparison of six regulators found Swissmedic's total time to approval in 2025 was 413 days, shorter than the European Medicines Agency's 448. But companies filed in Switzerland a median of 569 days after filing with their first regulator, usually the FDA. A late Swiss approval is mostly a late Swiss application.",
          detail: "Swissmedic summarises the Centre for Innovation in Regulatory Science's R&D Briefing 106, which compares Swissmedic, EMA, FDA, PMDA, Health Canada and TGA: 34 of Swissmedic's 40 new substances of 2025 were included; total approval time including company time was 413 days against 448 for EMA; scientific review time including company response was 303 days, second after Japan; the labelling phase fell by 22 days to 119. From 2021 to 2025 Swissmedic used at least one facilitated pathway in 68 per cent of applications, behind the FDA's 75 per cent and ahead of TGA (62), Health Canada (55), EMA (36) and PMDA (24). The median submission gap, from filing with the first regulator to filing with Swissmedic, was 569 days; for EMA it was 69, Health Canada 670, TGA 700 and PMDA 807. Swissmedic's own conclusion is that availability in Switzerland depends substantially on when companies submit. The CIRS figures are Swissmedic's summary of the study; OnCo did not read the CIRS report itself.",
          links: [
            { label: "Swissmedic: international study of approval times 2025 (6 July 2026)", url: SM_CIRS },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Distinctive",
      title: "What Switzerland does that others do not",
      cards: [
        {
          id: "trials-group",
          title: "One national academic trials group, renamed from SAKK, funded by federal contract",
          plain: "Most independent multicentre cancer trials in Switzerland run through one organisation, the Swiss Cancer Institute, known until July 2025 as SAKK. Its members are every university hospital and the country's leading hospitals, and it says they reach about 80 per cent of the country's cancer patients. The federal government funds it under a contract.",
          detail: "The Swiss Cancer Institute is recognised by the State Secretariat for Education, Research and Innovation as a research institution of national importance and funded under a performance agreement based on Article 15a of the Research and Innovation Promotion Act. It changed its name from SAKK on 1 July 2025 with the same management and contracts. Its trials have tested questions industry does not ask: SAKK 16/00 randomised 232 patients with stage IIIA/N2 lung cancer at 23 centres and found that adding radiotherapy to induction chemotherapy before surgery did not improve event-free survival (12.8 against 11.6 months, p=0.67), funded by SERI, the Swiss Cancer League and Sanofi. Two international academic groups are also based in Switzerland: the ETOP IBCSG Partners Foundation in Bern, behind the SOFT and TEXT breast cancer trials, and the International Extranodal Lymphoma Study Group in Bellinzona, behind IELSG-19 in MALT lymphoma.",
          links: [
            { label: "Swiss Cancer Institute: about (German)", url: SCI },
            { label: "From SAKK to Swiss Cancer Institute (press release, 1 July 2025, PDF)", url: "https://www.swisscancerinstitute.ch/media/1rrpazo0/mm_sakk_swisscancerinstitute_de.pdf" },
            { label: "Pless et al., SAKK 16/00 (Lancet 2015)", url: "https://doi.org/10.1016/S0140-6736(15)60294-X" },
          ],
        },
        {
          id: "basel",
          title: "Where many of the world's cancer drugs are made",
          plain: "Roche and Novartis are both headquartered in Basel, and some of the medicines most used in cancer were discovered in Swiss laboratories, among them imatinib for chronic myeloid leukaemia. A Swiss patient's access to those drugs still goes through the same approval and listing steps as anyone else's.",
          detail: "Imatinib, the targeted drug that transformed chronic myeloid leukaemia, came out of the oncology research department of Ciba-Geigy in Basel, which became part of Novartis; asciminib, midostaurin and everolimus are Novartis medicines, and the glycoengineered CD20 antibody obinutuzumab was engineered at GlycArt Biotechnology in Schlieren, near Zurich, and the CD20 by CD3 bispecific glofitamab at the Roche Innovation Center Zurich, as the affiliations on their first papers show. The country also hosts ESMO's head office in Lugano and the Union for International Cancer Control and the World Health Organization in Geneva, and the Lausanne university hospital, CHUV, from which Roger Stupp led the EORTC and NCIC trial that made temozolomide with radiotherapy the standard for glioblastoma. The companies section below lists the Swiss oncology companies in the corpus, from Roche and Novartis to Basel and Zurich biotechs.",
          links: [
            { label: "Swissmedic: new medicines 2025", url: SM_NAS },
            { label: "Buchdunger et al., the Abl inhibitor later named imatinib, from Ciba-Geigy, Basel (Cancer Res 1996)", url: "https://pubmed.ncbi.nlm.nih.gov/8548747/" },
            { label: "Stupp et al., radiotherapy plus temozolomide for glioblastoma (NEJM 2005)", url: "https://doi.org/10.1056/NEJMoa043330" },
            { label: "Mössner et al., the type II CD20 antibody later named obinutuzumab (Blood 2010)", url: "https://doi.org/10.1182/blood-2009-06-225979" },
            { label: "Bacac et al., CD20-TCB, later glofitamab (Clin Cancer Res 2018)", url: "https://doi.org/10.1158/1078-0432.CCR-18-0455" },
          ],
        },
        {
          id: "help",
          title: "Free advice by phone, chat or WhatsApp: KrebsInfo, 0800 11 88 11",
          plain: "The Swiss Cancer League and its 18 cantonal and regional leagues give free advice and practical help to people with cancer and their families. Its KrebsInfo service answers on weekdays from 10:00 to 18:00 on 0800 11 88 11, or by e-mail, chat or WhatsApp, and the regional leagues offer advice in person.",
          detail: "The League describes more than 110 years of work and acts as umbrella for 18 cantonal and regional leagues. With the Swiss Cancer Research foundation, which since 1991 has funded only industry-independent projects chosen by a scientific committee and approved about CHF 12.2 million of new projects in its round announced on 18 June 2026, it funds independent Swiss cancer research. The League also runs prevention campaigns and smoking-cessation support.",
          links: [
            { label: "Krebsliga Schweiz: about us", url: "https://www.krebsliga.ch/ueber-uns" },
            { label: "Krebsforschung Schweiz: about us", url: "https://www.krebsforschung.ch/ueber-uns" },
            { label: "Krebsforschung Schweiz: news, projects approved (18 June 2026)", url: "https://www.krebsforschung.ch" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sl-time",
      title: "No government figure for the wait between approval and payment",
      plain: "The only figure OnCo found for how long it takes from Swissmedic approval to a listing on the Spezialitätenliste is the industry association's 219-day median. The federal health office's own monitoring of its 60-day rule was not found.",
      detail: "KLV Article 31b sets the 60-day target; Interpharma's Innovationsreport 2025 is the source of the 4 per cent and 219-day figures. OnCo searched the BAG site only lightly because the BAG restructured its website and older addresses now return a not-found page. A BAG or Federal Audit Office figure would replace the industry one here.",
      links: [{ label: "Interpharma, Innovationsreport 2025 (PDF)", url: IPH }],
    },
    {
      id: "gap-survival",
      title: "Survival figures are from 2013-2017",
      plain: "The latest national all-cancer survival figures are from people diagnosed in 2013-2017, published in the 2021 Swiss Cancer Report. The next five-yearly report had not appeared when OnCo checked, and the annual statistics do not include survival.",
      detail: "The NKRS says the office publishes a cancer report every five years with survival and prevalence; the NKRS's list of reports ends at 2021. Newer site-specific survival is available only from the NKRS care-quality reports: for breast cancer diagnosed in 2020-2022, to two years, and for prostate cancer diagnosed in 2020-2023, to three years.",
      links: [{ label: "NKRS: Krebsmonitoring und Krebsbericht", url: "https://www.nkrs.ch/de/statistiken-und-berichte/krebsmonitoring-und-krebsbericht" }],
    },
    {
      id: "gap-deaths",
      title: "Why GLOBOCAN's death estimate is higher than the Swiss count",
      plain: "GLOBOCAN 2024 estimates 19,408 cancer deaths in Switzerland in 2024; the Federal Statistical Office counted 17,220 in 2022. OnCo could not find either source explaining the difference of about 2,200.",
      detail: "The Swiss figure comes from the cause-of-death statistics and counts deaths where cancer is the underlying cause. GLOBOCAN's method for Switzerland is not described in the extract OnCo holds. The page reports both rather than choosing.",
      links: [{ label: "BFS: Kennzahlen zu Krebs (XLSX)", url: BFS_KEY }],
    },
    {
      id: "gap-krg-evaluation",
      title: "The five-year evaluation of the registration law",
      plain: "The cancer registration law, in force since 2020, required the federal health office to evaluate it within five years. OnCo did not find the evaluation report.",
      detail: "KRG Article 34 required a first evaluation at the latest five years after entry into force, so by January 2025, reported by the Federal Department of Home Affairs to the Federal Council. Whether it has been published, and what it found about completeness and objections, OnCo could not establish.",
      links: [{ label: "KRG, SR 818.33 (fedlex)", url: KRG }],
    },
    {
      id: "gap-sources",
      title: "Sources that could not be read",
      plain: "Some sources were not reached: the full CIRS report on approval times, the Swiss Cancer Institute's annual report figures on trials and patients, and Ludwig Lausanne's and EPFL's own pages, which OnCo has not yet used. The Swissmedic approval times above come from Swissmedic's own report and its summary of the CIRS study.",
      detail: "Crossref and Europe PMC were rate-limited or unavailable on the day this page was built, so papers were resolved through PubMed instead. The Swiss Cancer Institute's founding year is not stated on its current pages beyond more than 60 years, and is left out. The national cancer strategy that ran until 2020 and any successor plan were not researched for this page.",
      links: [{ label: "Swissmedic: international study of approval times 2025", url: SM_CIRS }],
    },
  ],
  institutions: [
    "swissmedic", "foph-bag", "nkrs-nicer", "federal-statistical-office-ch", "childhood-cancer-registry-ch",
    "swiss-cancer-league", "swiss-cancer-research-foundation",
    "usz-zurich", "chuv-lausanne", "inselspital-bern", "hug-geneva", "usb-basel", "iosi-bellinzona",
    "esmo", "uicc",
  ],
  companies: [
    "roche-genentech", "novartis", "sandoz", "lonza", "debiopharm", "helsinn", "basilea", "adc-therapeutics",
    "molecular-partners", "sophia-genetics", "ionctura", "alentis-therapeutics", "cdr-life", "araris", "nouscom",
    "tolremo-therapeutics", "roche-venture-fund", "novartis-venture-fund",
    "swiss-cancer-institute", "etop-ibcsg", "ielsg",
  ],
  drugs: ["imatinib", "asciminib", "midostaurin", "everolimus", "obinutuzumab", "glofitamab"],
  trials: ["sakk-16-00", "nct06358573", "ielsg-19", "ielsg32", "ielsg37", "ielsg43", "ibcsg-23-01", "soft-text", "beat-meso", "eortc-26981"],
  papers: [
    "paper-pless-sakk-16-00-induction-chemoradiation-lancet-2015",
    "paper-menges-prostate-cancer-switzerland-jama-netw-open-2026",
    "paper-fournier-early-onset-colorectal-switzerland-ejc-2026",
    "paper-stupp-temozolomide-nejm-2005",
    "paper-ielsg-19-chlorambucil-rituximab-malt-jco-2017",
  ],
  people: [
    "katharina-staehelin", "viviane-hess", "vincenza-trivigno", "solange-peters", "silke-gillessen", "franco-cavalli",
    "rolf-stahel", "adrian-ochsenbein", "alfredo-addeo", "jean-bourhis", "marie-catherine-vozenin", "monika-hegi",
    "reinhard-dummer", "markus-g-manz", "daniel-aebersold",
  ],
  how: "Built on 3 November 2026 from Swiss sources read in German: the Federal Statistical Office's key figures workbook and its open data (queried through the stats.swiss SDMX interface), its 2026 methods note and the 2021 Swiss Cancer Report; the NKRS pages and its breast and prostate care-quality reports; the consolidated KVG, KVV, KLV and KRG on fedlex; Swissmedic's 2025 report on new active substances and its note on the CIRS study; and the pages of the Swiss Cancer Institute, the Swiss Cancer League and Swiss Cancer Research. Each figure was checked against the raw table or text. The one industry figure, the 219-day wait for listing, is labelled as such. Institutions, companies, trials, papers and people are drawn from the corpus; seven institutions and groups, one trial, three papers and two people were added for this page.",
  verify: "Laws change on 1 January most years: check the deductible, co-payment ceiling and screening rules against the current consolidated version on fedlex before relying on them, and ask the insurer about a specific drug, because single-case payment is decided by the insurer. Cancer figures are national estimates; the Federal Statistical Office publishes new ones on 16 November 2026.",
  verifyLinks: [
    { label: "BFS: Nationale Krebsstatistik", url: BFS },
    { label: "NKRS: Swiss cancer registration", url: "https://www.nkrs.ch/de/" },
    { label: "Spezialitätenliste (BAG)", url: "https://sl.bag.admin.ch/sl" },
    { label: "Swissmedic: new medicines", url: SM_NAS },
  ],
};

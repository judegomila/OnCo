import type { CountryDive } from "@/data/country-dive";

/**
 * Czechia deep dive: the hand-written cards for /countries/cz/ (wave 5). Czech sources were read in Czech, from the
 * raw text of each spreadsheet, PDF or page (the XLSX itself, pdftotext, or the HTML), not from a summary of it: the
 * Národní onkologický registr incidence and mortality data summaries published by ÚZIS on the national health
 * information portal (processed 24 June 2026, data to the end of 2024), the SVOD portal's note of 18 May 2026, the
 * consolidated texts of Act 48/1997 Coll. on public health insurance, Act 592/1992 Coll. on premiums and the Medicines
 * Act 378/2007 Coll., the English text of the National Oncology Plan 2030, the Czech Oncological Society's list of
 * comprehensive cancer centres on Linkos, VZP's and SÚKL's own pages, ÚZIS's screening programme sites, IARC's GLOBOCAN
 * 2024 fact sheet, the IAEA DIRAC public country table and the World Bank's health expenditure series. Every figure
 * below is quoted from one of those; where a figure could not be read it is named under `gaps`.
 */
const NOR_INC = "https://www.nzip.cz/data/1773-novotvary-kraje-incidence-datovy-souhrn";
const NOR_MORT = "https://www.nzip.cz/data/1774-novotvary-kraje-mortalita-datovy-souhrn";
const NOR_UZIS = "https://www.uzis.cz/index.php?pg=registry-sber-dat--narodni-zdravotni-registry--narodni-onkologicky-registr";
const SVOD = "https://www.svod.cz/";
const SVOD_2024 = "https://www.svod.cz/news-detail/cs/25-aktualizace-data-nor-2024/";
const GCO_FS = "https://gco.iarc.who.int/media/globocan/factsheets/populations/203-czechia-fact-sheet.pdf";
const ACT_48 = "https://www.zakonyprolidi.cz/cs/1997-48";
const ACT_592 = "https://www.zakonyprolidi.cz/cs/1992-592";
const ACT_378 = "https://www.zakonyprolidi.cz/cs/2007-378";
const VZP_ABOUT = "https://www.vzp.cz/o-nas";
const SUKL_PZI = "https://sukl.gov.cz/o-nas/povinne-zverejnovane-informace/";
const NOPL = "https://mzd.gov.cz/narodni-onkologicky-plan-cr-2030/";
const NOPL_EN = "https://mzd.gov.cz/wp-content/uploads/2022/07/2207_MZCR_NOPL_CR_2030_EN_v03.pdf";
const KOC_LIST = "https://www.linkos.cz/pacient-a-rodina/lecba/kde-se-lecit/seznam-koc/";
const MAMO = "https://www.mamo.cz/cs/o-programu/zeny-starsi-45-let/";
const MAMO_HOME = "https://www.mamo.cz/";
const KOLO = "https://www.kolorektum.cz/cs/o-programu/pro-koho-je-program-urcen/";
const CERVIX = "https://www.cervix.cz/cs/o-programu/pro-koho/";
const HPV = "https://www.cervix.cz/cs/o-programu/ockovani-hpv-dospivajici/rodice/";
const LUNG_ARCH = "https://web.archive.org/web/20251222030216/https://www.prevenceproplice.cz/cs/program/pro-koho/";
const PROST_ARCH = "https://web.archive.org/web/20251221100646/https://www.prostascreening.cz/cs/program/pro-koho/";
const DIRAC = "https://dirac.iaea.org/api/DataGridWebApi/GetCountriesAndRegions";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=CZ";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS?locations=CZ";
const EMA = "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines";

export const CZ_DIVE: CountryDive = {
  iso2: "CZ",
  iso3: "CZE",
  name: "Czechia",
  flag: "🇨🇿",
  asOf: "2026-11-11",
  title: "Cancer in Czechia",
  description:
    "Cancer in Czechia from Czech sources: the national registry's 102,027 malignant cancers diagnosed in 2024 and 27,219 cancer deaths, with the stage at diagnosis for each cancer; seven public health insurers and a yearly cap on what a patient pays towards medicines; how SÚKL decides prices and reimbursement, including temporary payment for highly innovative medicines; exceptional reimbursement for one patient; the network of comprehensive cancer centres; and the screening programmes, from mammography at 45 to early detection of lung and prostate cancer.",
  lede:
    "Czechia has counted every cancer in one national registry since 1976, and publishes the counts, with the stage at diagnosis, as open spreadsheets. Public health insurance pays for cancer care, a patient's yearly payments towards medicines are capped, and most cancer patients are treated in a network of comprehensive cancer centres that hold the contracts for the newest and most expensive medicines.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Czechia is 65,308 new cancers and 28,845 cancer deaths in 2024, of which 4,477 are non-melanoma skin cancers, so 60,831 without them. The Czech national registry (NOR) counts, for the same year, 102,027 malignant cancers including 33,012 non-melanoma skin cancers, and 69,015 without them. On the like-for-like measure the registry's count is about 13% above IARC's estimate, and its count of skin cancers is about seven times IARC's, which suggests that IARC's model leaves most of the registry's skin cancers out. On deaths, the registry's figure of 27,219 malignant cancer deaths in 2024, Czech Statistical Office records corrected by the registry for selected diagnoses, is 1,626 below IARC's modelled 28,845. IARC's fact sheet states that its Czech figures are national registry rates with the trend projected to 2024, so they are a projection rather than the registry's count; neither source reconciles the specific differences, so they are noted here rather than explained. IARC's world age-standardised incidence, 281.9 per 100,000 including skin cancers, is not comparable with the registry's 299.9 per 100,000 excluding them, because the two counts differ.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Czechia",
      aside: { label: "NZIP: NOR incidence data summary, 1995 to 2024", url: NOR_INC },
      cards: [
        {
          id: "shape",
          title: "102,027 malignant cancers in 2024, and lung cancer still the commonest cause of cancer death",
          plain:
            "Czechia's national cancer registry counted 102,027 new malignant cancers in 2024. A third of them, 33,012, were the common skin cancers that are rarely dangerous; without them there were 69,015. Prostate cancer is the commonest of the rest, then breast, bowel and lung cancer. 27,219 people died of cancer, and lung cancer caused more of those deaths than any other.",
          detail:
            "The incidence summary of the Národní onkologický registr, processed by ÚZIS on 24 June 2026, counts 102,027 malignant cancers (ICD-10 C00 to C97) diagnosed in 2024: 54,009 in men and 48,018 in women. Without non-melanoma skin cancer (C44) the totals are 69,015, of which 37,115 in men and 31,900 in women, a world age-standardised rate of 299.9 per 100,000. The commonest sites were prostate (10,153), female breast (8,717), colon and rectum (C18 to C20, 7,502) and lung (6,818). The mortality summary, which takes Czech Statistical Office death records and corrects them against the registry for selected diagnoses, counts 27,219 deaths from malignant cancers in 2024, 14,803 men and 12,416 women. Lung cancer caused 4,958 of them, bowel cancer 3,222 and pancreatic cancer 2,351, almost as many deaths as the 2,694 pancreatic cancers diagnosed. The SVOD portal, run by ÚZIS with Masaryk University, added the 2024 data on 18 May 2026.",
          links: [
            { label: "NZIP: NOR incidence data summary (XLSX, sheet Celkem, 2024)", url: NOR_INC },
            { label: "NZIP: NOR mortality data summary (XLSX, 2024)", url: NOR_MORT },
            { label: "SVOD: Aktualizace dat NOR do roku 2024", url: SVOD_2024 },
          ],
        },
        {
          id: "stage",
          title: "The stage at diagnosis is published for every cancer, and it shows where late diagnosis remains",
          plain:
            "The registry records how far each cancer had spread when it was found, and publishes it. In 2024 almost half of lung cancers and pancreatic cancers were found at stage IV, when the cancer has already spread, against about one breast cancer in sixteen. The national cancer plan calls late diagnosis one of the main challenges of Czech oncology.",
          detail:
            "The 2024 incidence summary gives the share of each cancer registered at each stage. Stage IV accounted for 47.1% of lung cancers (C33 to C34), 44.5% of pancreatic cancers, 21.2% of colorectal cancers (C18 to C20), 15.6% of cervical cancers, 11.5% of prostate cancers and 6.3% of female breast cancers; the remainder includes cases whose stage was unknown for objective reasons or not recorded. Over time the count has grown: malignant cancers other than C44 rose from 60,185 in 2015 to 69,015 in 2024, while the world age-standardised rate moved from 289.4 to 299.9 per 100,000. The National Oncology Plan 2030 states that almost 50% of colorectal cancers were still caught at stage III or IV despite screening, calls the high proportion of late diagnoses one of the main challenges of Czech oncology, and projects an 18 to 20% rise in incidence by 2040 under medium-risk scenarios, mainly from an ageing population.",
          links: [
            { label: "NZIP: NOR incidence data summary, columns Stadium (XLSX)", url: NOR_INC },
            { label: "National Oncology Plan of the Czech Republic 2030, English text, chapter on the current state (PDF)", url: NOPL_EN },
          ],
        },
      ],
      tables: [
        {
          id: "nor-2024",
          title: "Malignant cancers diagnosed and cancer deaths in 2024, by site",
          caption: "New cases registered in the Národní onkologický registr and deaths, Czechia 2024, both sexes unless stated.",
          columns: [
            { key: "site", label: "Cancer (ICD-10)" },
            { key: "cases", label: "New cases, 2024", numeric: true },
            { key: "deaths", label: "Deaths, 2024", numeric: true },
            { key: "stage4", label: "Stage IV at diagnosis (%)", numeric: true },
          ],
          rows: [
            { site: "All malignant cancers, C00 to C97", cases: 102027, deaths: 27219, stage4: 13.3 },
            { site: "All malignant cancers except non-melanoma skin (C44)", cases: 69015, deaths: 27034, stage4: 19.4 },
            { site: "Non-melanoma skin cancer (C44)", cases: 33012, deaths: 185, stage4: 0.5 },
            { site: "Prostate (C61)", cases: 10153, deaths: 1535, stage4: 11.5 },
            { site: "Breast, women (C50)", cases: 8717, deaths: 1623, stage4: 6.3 },
            { site: "Colon and rectum (C18 to C20)", cases: 7502, deaths: 3222, stage4: 21.2 },
            { site: "Trachea, bronchus and lung (C33, C34)", cases: 6818, deaths: 4958, stage4: 47.1 },
            { site: "Kidney (C64)", cases: 3469, deaths: 864, stage4: 13.1 },
            { site: "Melanoma of skin (C43)", cases: 3412, deaths: 444, stage4: 6.4 },
            { site: "Urinary bladder (C67)", cases: 2991, deaths: 928, stage4: 5.8 },
            { site: "Pancreas (C25)", cases: 2694, deaths: 2351, stage4: 44.5 },
            { site: "Head and neck (C00 to C14, C30, C31)", cases: 2206, deaths: 854, stage4: 39.8 },
            { site: "Uterine body (C54, C55)", cases: 2109, deaths: 409, stage4: 7.1 },
            { site: "Stomach (C16)", cases: 1592, deaths: 986, stage4: 32.9 },
            { site: "Ovary (C56)", cases: 952, deaths: 575, stage4: 29.5 },
            { site: "Cervix (C53)", cases: 778, deaths: 223, stage4: 15.6 },
          ],
          note: "Cases are what the registry held when ÚZIS processed the summary on 24 June 2026, built from reports to the registry checked against the national registers of reimbursed care and hospitalisations and the death examination forms. Deaths are Czech Statistical Office records corrected by the registry for selected diagnoses. The stage share is of all cases of that cancer, including those whose stage was unknown or not recorded, so the shares of the stated stages do not add to 100%.",
          sources: [
            { label: "NZIP: NOR incidence data summary, sheet Celkem (XLSX)", url: NOR_INC },
            { label: "NZIP: NOR mortality data summary, sheet Celkem (XLSX)", url: NOR_MORT },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national registry since 1976, published as open data",
      aside: { label: "ÚZIS: Národní onkologický registr", url: NOR_UZIS },
      cards: [
        {
          id: "nor",
          title: "Every provider and laboratory must report a new tumour to the state health statistics institute",
          plain:
            "The Národní onkologický registr is run by ÚZIS, the state health statistics institute, and counts cancers across the whole population. Hospitals, doctors and laboratories that diagnose or confirm a cancer must report it. ÚZIS publishes the yearly counts by region, age and stage as spreadsheets anyone can download.",
          detail:
            "ÚZIS describes the registry as a population-wide registry that continues the monitoring of tumours introduced in the 1950s, run by ÚZIS as a registry of individual tumour records since 1976, and a member of the International Association of Cancer Registries working with the European Network of Cancer Registries. Reporting rests on Act 372/2011 Coll. on health services and Decree 373/2016 Coll.; the reporting units are the provider who made the diagnosis or is responsible for treating a new tumour, and the pathology or cytology laboratory that made or confirmed it, and a ÚZIS notice of 23 April 2021 announced that reports to the registry are to be sent only in electronic form. Cancers found only on the death examination form are also recorded. The data summaries go back to 1995 and give absolute counts, rates per 100,000, four age-standardised rates and stage shares, by region of residence. ÚZIS and Masaryk University's Faculty of Medicine also run the SVOD portal, under the professional guarantee of the Czech Oncological Society, with interactive analyses of incidence, mortality, prevalence and survival.",
          links: [
            { label: "ÚZIS: Národní onkologický registr, o registru", url: NOR_UZIS },
            { label: "NZIP: incidence data summary and methodological note", url: NOR_INC },
            { label: "SVOD: Portál epidemiologie novotvarů v ČR", url: SVOD },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: seven public health insurers and a cap on what a patient pays",
      aside: { label: "Zákon 48/1997 Sb. o veřejném zdravotním pojištění", url: ACT_48 },
      cards: [
        {
          id: "insurers",
          title: "Compulsory public health insurance, a 13.5% premium and a choice of insurer",
          plain:
            "Care in Czechia is paid for by public health insurance, with a premium of 13.5% of the assessment base. There are seven public insurers; the biggest, VZP, has more than 6 million clients. A person can switch insurer once a year. Health spending was 8.5% of the economy in 2024, and people paid about 14% of it out of their own pockets.",
          detail:
            "Section 2 of Act 592/1992 Coll. sets the premium at 13.5% of the assessment base, and section 11a of Act 48/1997 Coll. lets an insured person change insurer once in 12 months, always from the first day of a half-year. VZP states that it was established on 1 January 1992 by Act 551/1991 Coll., that further insurers arose under Act 280/1992 Coll., that it competes with six others and has more than 6 million clients, and that it will spend 327 billion koruna on its clients' care in 2026. It also says that most patients of the comprehensive cancer centres, which hold special contracts allowing them to treat with the newest and most expensive medicines, are its clients. The World Bank series, drawn from WHO's Global Health Expenditure Database, puts current health expenditure at 8.51% of GDP in 2024, out-of-pocket spending at 14.06% of it in 2024, and domestic government spending at 84.34% of it in 2023.",
          links: [
            { label: "VZP: O nás", url: VZP_ABOUT },
            { label: "Zákon 592/1992 Sb. o pojistném, section 2", url: ACT_592 },
            { label: "World Bank: out-of-pocket expenditure, Czechia", url: WB_OOP },
            { label: "World Bank: current health expenditure, Czechia", url: WB_CHE },
          ],
        },
        {
          id: "copay-cap",
          title: "What a patient pays: a yearly cap on co-payments for medicines",
          plain:
            "Some medicines carry a co-payment at the pharmacy. The law caps what a person pays in a year: 5,000 koruna for most people, 1,000 koruna for children and people over 65, and 500 koruna for people over 70 and people recognised as invalid in the second or third degree. The insurer refunds anything above the cap.",
          detail:
            "Section 16b of Act 48/1997 Coll. says that when a person's co-payments for prescribed, partly reimbursed medicines or foods for special medical purposes dispensed in Czechia exceed 5,000 koruna in a calendar year, the insurer must refund the excess; the limit is 1,000 koruna for children under 18 and people over 65, and 500 koruna for people over 70 and for recipients of a third-degree invalidity pension or people recognised as invalid in the second or third degree. Only the co-payment on the cheapest product with the same active substance and route counts towards the limit, unless the doctor has marked the prescription as not substitutable, and co-payments for medicines for supportive or complementary treatment do not count, except for people over 65. Section 16a sets a regulatory fee of 90 koruna for using the out-of-hours emergency service (pohotovostní služba), medical or dental. No figure was found for what cancer patients themselves pay in total.",
          links: [{ label: "Zákon 48/1997 Sb., sections 16a and 16b", url: ACT_48 }],
        },
        {
          id: "section-16",
          title: "Section 16: a route to an uncovered treatment for one patient",
          plain:
            "When a treatment is not normally paid for but is the only option for a patient's state of health, the patient's insurer can pay for it in that one case. The insurer assesses the request before the treatment is given. VZP writes joint expert statements with the medical societies to guide these decisions.",
          detail:
            "Section 16 of Act 48/1997 Coll. reads that the competent insurer pays, by the procedure of section 19(1)(a), in exceptional cases for health services otherwise not paid from health insurance, if providing them is the only option with regard to the insured person's state of health. Section 19(1) makes the insurer assess, before the care is given, whether the conditions for payment are met, and the insurer can extend its consent to repeated care for a stated period. VZP describes a transparent procedure for assessing payment of medicines that are otherwise not covered: joint expert statements of VZP and the professional medical societies, which serve as the basis both for an insured person's section 16 request and for VZP's part in proceedings on the level and conditions of reimbursement. How many section 16 requests for cancer medicines are made, granted or refused each year was not found in a source that could be read.",
          links: [
            { label: "Zákon 48/1997 Sb., sections 16 and 19", url: ACT_48 },
            { label: "VZP: O nás", url: VZP_ABOUT },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: SÚKL, inside the European system, and the one that sets reimbursement",
      aside: { label: "SÚKL", url: "https://sukl.gov.cz/" },
      cards: [
        {
          id: "sukl-card",
          title: "Most cancer medicines are approved in Brussels; SÚKL decides the price and whether insurance pays",
          plain:
            "New cancer medicines are authorised once for the whole European Union, so they are valid in Czechia without a separate national approval. What decides access is the next step: Czechia's regulator, SÚKL, sets the maximum price and decides whether public health insurance pays and on what terms. SÚKL also assesses applications to run clinical trials in Czechia.",
          detail:
            "New active substances for cancer go through the EU centralised procedure, in which the European Commission grants a marketing authorisation valid in every member state on the opinion of the European Medicines Agency. SÚKL states that since 1 January 2008 Act 48/1997 Coll. has made it responsible for maximum prices and for the level and conditions of reimbursement. Section 39b lists what it weighs: therapeutic effect and safety, the severity of the disease, the applicant's cost-effectiveness and budget impact analyses with the cost per patient and the expected number of patients a year, the public interest, substitutability and the prices of alternatives, the expected impact on health insurance funds, professional guidelines, and any published EU joint clinical assessment report. It may also set reimbursement for an indication not in the product information, if the use is justified by current science and is the only option or cost-effective. Under section 51 of the Medicines Act SÚKL assesses trial applications under the EU clinical trials regulation and is the national contact point. No official average for the time from European approval to Czech reimbursement was found; it is named under gaps.",
          links: [
            { label: "SÚKL: povinně zveřejňované informace", url: SUKL_PZI },
            { label: "Zákon 48/1997 Sb., section 39b", url: ACT_48 },
            { label: "Zákon 378/2007 Sb. o léčivech, section 51", url: ACT_378 },
            { label: "EMA: authorisation of medicines", url: EMA },
          ],
        },
        {
          id: "highly-innovative",
          title: "Temporary payment for highly innovative medicines, with thresholds written into law",
          plain:
            "A medicine for a very serious disease that clearly beats current treatment can be paid for on a temporary basis for three years, renewable once for up to two, before its cost-effectiveness is proven. The law says how large the benefit must be, for example a gain in median overall survival of at least 30% and at least three months.",
          detail:
            "Section 39d of Act 48/1997 Coll. lets SÚKL, where it is in the public interest, set temporary reimbursement of a highly innovative medicine. The medicine must be for a very serious disease, which the law defines to include one that shortens expected life by more than 20%, and its benefit must be shown in one of three ways: a clinically significant primary endpoint that affects quality of life improved by at least 30% in a direct comparison or 35% in an indirect one, with at least 3 months' longer median progression-free survival where that is the endpoint; median overall survival longer by at least 30% and at least 3 months, or where the median is not reached a hazard ratio for overall survival reduced by at least 35%; or a conditional EU marketing authorisation where there is no paid alternative, with the holder undertaking to repay the insurers if that authorisation lapses. Temporary reimbursement lasts 3 years and can be set again for at most 2 more, and cost-effectiveness is not required for it. Section 39da sets a separate route for medicines for rare diseases.",
          links: [{ label: "Zákon 48/1997 Sb., sections 39d and 39da", url: ACT_48 }],
        },
        {
          id: "treatment-programmes",
          title: "Specific treatment programmes: using a medicine that is not yet authorised",
          plain:
            "When no authorised medicine is available for a condition that seriously threatens health, a company or doctor can propose a specific treatment programme to use an unregistered medicine for a defined group of patients. The Ministry of Health approves it, on SÚKL's opinion.",
          detail:
            "Section 49 of the Medicines Act 378/2007 Coll. allows the use, distribution and dispensing of human medicines not authorised in Czechia or the EU within specific treatment programmes, where no authorised medicine is available for effective treatment, prophylaxis or diagnosis, in cases set by the EU regulation or other exceptional need. A programme may be proposed only for conditions seriously threatening human health, and must set out the medicine, its maker or importer, the group of patients and how it is used, how quality, safety and effectiveness are monitored, the sites where it runs and the reasons for it. The proposer, a legal or natural person, submits it to the Ministry of Health for consent and to SÚKL for an opinion on the conditions of use, distribution, dispensing and monitoring. Under section 39b(3) of Act 48/1997 Coll. SÚKL may set reimbursement for an unregistered medicine for the duration of an approved programme if its use is justified by current science and is the only treatment option, or is cost-effective. The Ministry of Health may also publish on its official notice board the conditions for a special treatment programme, which a provider can then join with the ministry's consent (section 49(6) and (7)).",
          links: [
            { label: "Zákon 378/2007 Sb. o léčivech, section 49", url: ACT_378 },
            { label: "Zákon 48/1997 Sb., section 39b(3)", url: ACT_48 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening, vaccination and the national cancer plan",
      aside: { label: "mamo.cz, kolorektum.cz, cervix.cz (ÚZIS)", url: MAMO_HOME },
      cards: [
        {
          id: "programmes",
          title: "Three established screening programmes and two newer early detection programmes",
          plain:
            "Women can have a screening mammogram every two years from age 45. Men and women aged 45 to 74 can choose a stool test every two years or a screening colonoscopy every ten years. Women have a yearly gynaecological check from 15, with an HPV test at 35, 45 and 55. Smokers and former heavy smokers aged 55 to 74 can have a low-dose lung CT, and men aged 50 to 69 can join a prostate early detection programme.",
          detail:
            "The breast programme's site says every woman in Czechia is entitled to preventive breast examination by mammography from her 45th birthday, at two-year intervals, and that on average 736,000 women a year had a mammogram in 2020 to 2024. The colorectal programme's site gives men and women aged 45 to 74 a faecal occult blood test once every 2 years or a screening colonoscopy once every 10 years, through a GP or gynaecologist; the national cancer plan dates the programme to 2000. The cervical programme's site gives women over 15 a yearly preventive gynaecological examination, adds a screening HPV test at 35, 45 and 55, and says insurers invite women over 25 who have not attended. The lung programme, which the national cancer plan says started on 1 January 2022, is for people aged 55 to 74 who smoke or used to and have smoked 20 or more pack-years, and the prostate early detection programme for men aged 50 to 69 not already followed or treated for prostate cancer; both were read from Internet Archive copies, because their sites did not answer a script.",
          links: [
            { label: "mamo.cz: women from age 45", url: MAMO },
            { label: "mamo.cz: home page, yearly averages for 2020 to 2024", url: MAMO_HOME },
            { label: "kolorektum.cz: who the programme is for", url: KOLO },
            { label: "cervix.cz: who the programme is for", url: CERVIX },
            { label: "prevenceproplice.cz: who the programme is for (Internet Archive copy)", url: LUNG_ARCH },
            { label: "prostascreening.cz: who the programme is for (Internet Archive copy)", url: PROST_ARCH },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccination for girls and boys, paid in full from 11 to 15",
          plain:
            "Vaccination against HPV, the virus behind most cervical cancers and some cancers of the anus, penis, head and neck, is paid for by public health insurance for girls and boys between their 11th and 15th birthdays. The national cancer plan aims to raise coverage in line with the European goal of vaccinating at least 90% of girls by 2030.",
          detail:
            "The cervical programme's page for parents, published by ÚZIS, describes HPV vaccination from age 11 until the 15th birthday, says it concerns girls and boys alike, that it is fully paid in this age range from public health insurance, and that parents should arrange it with the child's paediatrician; it lists cervical, anal and penile cancer, head and neck tumours and genital warts among the conditions HPV can cause. The National Oncology Plan 2030 sets as a measure to increase vaccination coverage of the target population of girls and boys against HPV and to strengthen promotion of the vaccine, especially to parents, and records the target of Europe's Beating Cancer Plan to vaccinate at least 90% of the EU target population of girls and significantly increase coverage of boys by 2030. The plan's indicator table gives a starting value of 63.9% of girls aged 13 vaccinated against HPV in 2019, against a 2030 target of 90%; a more recent Czech coverage rate was not read from an official source for this page, and is named under gaps.",
          links: [
            { label: "cervix.cz: očkování proti HPV, informace pro rodiče", url: HPV },
            { label: "National Oncology Plan 2030, strategic objective 1 on prevention and table 3 of indicators (English, PDF)", url: NOPL_EN },
          ],
        },
        {
          id: "nopl",
          title: "The National Oncology Plan 2030: screening works, but too few people attend",
          plain:
            "The government approved a national cancer plan in June 2022. It credits the screening programmes with falls in bowel and cervical cancer and in breast cancer deaths, but says too few people come regularly: about 60% of women for breast screening, more than 55% for cervical screening and 30% of people for bowel screening.",
          detail:
            "The Ministry of Health states that the government approved the National Oncology Plan of the Czech Republic 2030 on 22 June 2022. Its analysis records that between 2000 and 2018 colorectal cancer incidence and mortality fell by 24% and 40%, breast cancer mortality by 32% and cervical cancer incidence by 37%, but that only about 60% of the target group attends breast screening at the prescribed interval, 30% colorectal and more than 55% cervical screening. It names ÚZIS's National Screening Centre as the body that coordinates, methodologically supports and evaluates early detection programmes. Its four strategic objectives cover prevention in every phase, quality of life of patients and survivors, coordination of the whole cancer system, and care to a high standard with access to innovation, research and digital tools; its indicators include coverage of the target population by the screening programmes and the number of participants in the lung programme. Action plans cover 2022 to 2024 and 2025 to 2027.",
          links: [
            { label: "MZ ČR: Národní onkologický plán ČR 2030", url: NOPL },
            { label: "National Oncology Plan of the Czech Republic 2030 (English, PDF)", url: NOPL_EN },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Where care is given: comprehensive cancer centres and radiotherapy",
      aside: { label: "Linkos: Seznam KOC", url: KOC_LIST },
      cards: [
        {
          id: "koc",
          title: "A network of comprehensive cancer centres, with separate centres for children and blood cancers",
          plain:
            "Cancer care in Czechia is organised around comprehensive cancer centres in university and large regional hospitals, which work with the hospitals near patients' homes. The Czech Oncological Society lists sixteen, of which two are also named national cancer centres, plus two children's cancer centres and six centres for blood cancers. The national plan says more than 70% of cancer patients are treated in them.",
          detail:
            "The Czech Oncological Society's list on Linkos names as national oncology centres the comprehensive cancer centre of Motol and Homolka university hospitals, working with Karlovy Vary regional hospital, and that of the Masaryk Memorial Cancer Institute in Brno with Brno University Hospital and St Anne's. Its list of comprehensive cancer centres also includes Bulovka, Královské Vinohrady, Hradec Králové, Olomouc, Plzeň, Ostrava, Ústí nad Labem, Liberec, Zlín, České Budějovice, Jihlava, Nový Jičín, Pardubice and the General University Hospital in Prague, with Thomayer and the Central Military Hospital; two children's cancer centres, at Brno University Hospital and at Motol and Homolka; and six haemato-oncology centres. The National Oncology Plan states that the share of cancer patients treated in these centres exceeds 70%, close to 90% in Prague but about 43% in the Karlovy Vary region, which has no centre of its own; that more than 23,000 patients received centre-based innovative medicines in 2021 at a cost of more than 8.6 billion koruna; and that reported multidisciplinary team consultations rose from about 51,000 in 2015 to over 91,000 a year in 2019 and 2020.",
          links: [
            { label: "Linkos (Czech Oncological Society): Seznam KOC", url: KOC_LIST },
            { label: "National Oncology Plan 2030, chapter on the current state (English, PDF)", url: NOPL_EN },
          ],
        },
        {
          id: "radiotherapy",
          title: "Radiotherapy: 38 centres and 67 high-energy treatment machines in the IAEA's directory",
          plain:
            "The International Atomic Energy Agency's directory of radiotherapy centres lists 38 centres in Czechia, 36 of them giving radiotherapy, with 67 high-energy treatment machines and one proton or ion therapy facility. That is about six machines per million people. The figures were last updated in 2021, so newer machines may be missing.",
          detail:
            "The public country table of the IAEA's DIrectory of RAdiotherapy Centres (DIRAC), read through its data service on 11 November 2026, gives Czechia (last update 2021) 38 radiotherapy centres, 36 with radiotherapy, 67 high-energy photon and electron beam teletherapy units, 1 proton or ion therapy facility and 30 X-ray generators. Against GLOBOCAN's 2024 population of 10,735,864, 67 units is about 6.2 per million people. DIRAC depends on what each country and centre reports, and the Czech entry has not been updated since 2021, so the count may not reflect machines installed or retired since. No Czech official count of linear accelerators or of radiation oncologists was read for this page, and no official figure on the cancer workforce was found; both are named under gaps. The National Oncology Plan names sufficient numbers of qualified and motivated staff in oncology as a specific objective (4.1).",
          links: [
            { label: "IAEA DIRAC: countries and regions table (JSON)", url: DIRAC },
            { label: "National Oncology Plan 2030, specific objective 4.1 (English, PDF)", url: NOPL_EN },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What is different",
      title: "What Czechia does differently",
      cards: [
        {
          id: "centre-medicines",
          title: "The most expensive cancer medicines are given only in contracted centres",
          plain:
            "In Czechia the newest and most expensive cancer medicines are, in practice, given in the comprehensive cancer centres that hold special contracts with the insurers, rather than in any hospital. This concentrates both the medicines and the patients who need them, and lets the state follow their use: ÚZIS collects data on the indications and use of these centre medicines.",
          detail:
            "VZP's own page says that most patients of the comprehensive cancer centres and other centres with a special contract, which allows them to treat with the newest and most expensive medicines, are its clients. The National Oncology Plan calls this segment centre-based treatment, counts more than 23,000 cancer patients treated with these medicines in 2021 at a total cost of more than 8.6 billion koruna, expects the number of patients to grow by at least 10% a year in both adult solid tumours and haemato-oncology, with costs rising 10 to 12% a year, and records that the centralisation of haemato-oncology reaches up to 83% for chronic myeloid leukaemia. ÚZIS has published a notice on the transfer of data on the indications and consumption of innovative medicines (centrová léčba). The plan names as a weakness the large gaps in cooperation between regional hospitals and the centres, and the regional differences in access, worst in the Karlovy Vary region.",
          links: [
            { label: "VZP: O nás", url: VZP_ABOUT },
            { label: "National Oncology Plan 2030 (English, PDF)", url: NOPL_EN },
            { label: "ÚZIS: Národní onkologický registr and related collections", url: NOR_UZIS },
          ],
        },
        {
          id: "open-registry",
          title: "Registry data, with stage, are open to anyone",
          plain:
            "Many countries publish cancer counts in a yearly report. Czechia publishes the registry's data as downloadable spreadsheets going back to 1995, by region, age and stage at diagnosis, together with an interactive portal on incidence, deaths, prevalence and survival. A patient group or journalist can check the figures on this page from the source.",
          detail:
            "The incidence summary on the national health information portal covers 1 January 1995 to 31 December 2024, by year, for Czechia and each region by residence, for each diagnosis and group, with absolute counts, counts per 100,000 overall and by age band, four age-standardised rates (to the Czech population of the latest year, the old and new European standards, and the world standard) and stage counts and shares; it is updated once a year and was approved by the ÚZIS management on 30 April 2024. Matching summaries exist for deaths, prevalence by region and district, and relative survival. The SVOD portal, built by ÚZIS with Masaryk University's Faculty of Medicine under the professional guarantee of the Czech Oncological Society, offers the same data as interactive analyses, diagnosis cards and international comparisons. The registry's ability to publish stage for every cancer is what lets this page show that almost half of lung cancers are found at stage IV.",
          links: [
            { label: "NZIP: NOR incidence data summary", url: NOR_INC },
            { label: "SVOD: Portál epidemiologie novotvarů v ČR", url: SVOD },
          ],
        },
        {
          id: "innovation-rules",
          title: "Rules in statute for paying for medicines before cost-effectiveness is proven",
          plain:
            "Czech law spells out when a new medicine can be paid for before its value for money is proven: the size of benefit it must show is written in the act itself, and the payment is time-limited. Alongside this, a single patient's insurer can pay for an uncovered treatment when it is the only option.",
          detail:
            "Section 39d of Act 48/1997 Coll. sets numerical thresholds for highly innovative medicines, such as at least a 30% and at least 3-month improvement in median overall survival over reimbursed treatment, and limits temporary reimbursement to 3 years plus at most 2; cost-effectiveness is not required for it. Section 39da adds a route for medicines for rare diseases, and section 39b(3) allows reimbursement of off-label use, and of unregistered medicines within an approved specific treatment programme, where justified by current science and the only option or cost-effective. For an individual patient, section 16 makes the insurer pay in exceptional cases for care not otherwise covered when it is the only option for the patient's health, assessed before the care is given. How many cancer medicines have used the temporary route, and how often section 16 requests succeed, were not found in a readable official source.",
          links: [
            { label: "Zákon 48/1997 Sb., sections 16, 39b, 39d and 39da", url: ACT_48 },
            { label: "SÚKL: povinně zveřejňované informace", url: SUKL_PZI },
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
          id: "trials-in-czechia",
          title: "516 trials in OnCo's records have sites in Czechia, almost all led by companies",
          plain:
            "OnCo's copy of the ClinicalTrials.gov registry lists 516 cancer trials with at least one site in Czechia, 132 of them recruiting. Most are large phase 3 trials run by international drug companies. None in this set is led by a Czech sponsor, though European academic groups lead some, especially in children's cancers, lymphoma and myeloma.",
          detail:
            "Of the 516 trials in OnCo's participation records (retrieved from ClinicalTrials.gov on 7 October 2026) that name Czechia among their site countries, 132 were recruiting, 223 active but not recruiting, 139 completed, 19 terminated and 3 of unknown status; 420 are recorded in OnCo as phase 3. No lead sponsor in this set is a Czech institution or company. Academic and cooperative trials with Czech sites include the pancreatic cancer trial ESPAC-3 (Royal Liverpool University Hospital), EORTC 22991 in prostate cancer, the children's trials EuroNet-PHL-C2, IntReALL SR 2010, Interfant-06 and the SIOPEN high-risk neuroblastoma studies HR-NBL1 and HR-NBL2, the lymphoma trial IELSG37 and the European Myeloma Network's PERSEUS and CARTITUDE-6. Trials sponsored by SOTIO companies, NCT05120271 (lead sponsor Sotio Biotech Inc.) and NCT07693751 (SOTIO Biotech a.s.), are not among the 516. The list below is a selection, not all 516.",
          links: [
            { label: "ClinicalTrials.gov: cancer trials with sites in Czechia", url: "https://clinicaltrials.gov/search?cond=cancer&locStr=Czechia&country=Czechia" },
            { label: "SÚKL: clinical trials (Medicines Act, section 51)", url: ACT_378 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "unreachable",
      title: "Sources and figures that could not be read on 11 November 2026",
      plain:
        "Several things were looked for and not found in a source that could be read: HPV vaccination coverage since 2019, how long it takes for a medicine approved in Europe to be paid for in Czechia, how often insurers grant section 16 requests, current screening coverage, and a national count of radiotherapy machines and cancer specialists.",
      detail:
        "No official HPV vaccination coverage rate for Czechia more recent than the National Oncology Plan's 2019 baseline (63.9% of girls aged 13) was read for this page, from ÚZIS or from WHO's immunisation data. No official average time from EU authorisation to Czech reimbursement, and no count of medicines given temporary reimbursement as highly innovative, was found on SÚKL's pages. Counts of section 16 requests for cancer medicines were not found. The screening attendance figures given are those of the 2022 National Oncology Plan; the programme sites' newer coverage data were not read. The radiotherapy figures are IAEA DIRAC's, last updated for Czechia in 2021; no Czech official count of linear accelerators, radiation oncologists or oncologists was read. The lung and prostate programme sites (prevenceproplice.cz, prostascreening.cz) and ÚZIS's National Screening Centre site did not answer a script, so their pages were read from Internet Archive copies of December 2025, and the prostate programme's start date was not confirmed. The domain onkoscreening.cz, suggested as a screening source, now carries a page promoting a commercial blood test and was not used.",
      links: [
        { label: "SÚKL", url: "https://sukl.gov.cz/" },
        { label: "IAEA DIRAC", url: "https://dirac.iaea.org/" },
        { label: "National Oncology Plan 2030, table 3 of indicators (English, PDF)", url: NOPL_EN },
        { label: "prevenceproplice.cz (Internet Archive copy)", url: LUNG_ARCH },
      ],
    },
    {
      id: "globocan-gap",
      title: "Why IARC's estimate and the Czech registry differ",
      plain:
        "IARC's GLOBOCAN estimate for Czechia in 2024 is lower than what the Czech registry actually counted for 2024, by about 13% for cancers other than common skin cancers. The registry also counts about seven times as many skin cancers. IARC's figures are national registry rates projected forward to 2024, and neither IARC nor the registry reconciles the specific differences in the sources read.",
      detail:
        "GLOBOCAN 2024 gives 65,308 new cancers including 4,477 non-melanoma skin cancers (60,831 without), 28,845 deaths and 202,007 people alive within five years of a diagnosis; its fact sheet lists breast, colorectum and prostate as the commonest cancers and lung, colorectum and pancreas as the commonest causes of cancer death. The registry counts 69,015 malignant cancers other than C44 and 33,012 of C44 for 2024, and 27,219 deaths. IARC's fact sheet gives its Czech data source as the national registry and its method as trends in national rates projected to 2024, while the registry's figures are counts completed against national claims and hospital data; which years of registry data IARC projected from was not read. Readers should prefer the registry's counts for Czechia and use GLOBOCAN for comparison between countries.",
      links: [
        { label: "IARC GLOBOCAN 2024: Czechia fact sheet (PDF)", url: GCO_FS },
        { label: "NZIP: NOR incidence data summary", url: NOR_INC },
      ],
    },
  ],
  institutions: [
    "nor-czech", "uzis-czech", "sukl", "vzp-czech", "ministry-of-health-czech",
    "mou-brno", "motol-university-hospital", "iba-masaryk", "liga-proti-rakovine-praha", "institute-of-applied-psychology-czech", "esgo",
    "ema", "iarc",
  ],
  companies: ["sotio", "lipidica", "maia-labs"],
  drugs: [],
  trials: [
    "espac-3", "eortc-22991", "euronet-phl-c2", "intreall-sr-2010", "interfant-06", "hr-nbl1", "nct04221035", "ielsg37",
    "perseus", "cartitude-6", "senticol-iii", "checkmate-067", "flaura", "katherine", "aphinity", "monarche", "murano", "keynote-564",
    "adriatic", "napoli-3", "nct06966700", "nct05920356", "bellwave-011", "nct06925737", "nct05120271", "nct07693751",
  ],
  papers: [],
  people: ["ladislav-dusek", "tomas-boran", "marek-svoboda", "tomas-kazda", "igor-kiss", "petr-poloucek"],
  how:
    "Every card was written from Czech official sources read in Czech: the Národní onkologický registr incidence and mortality data summaries published by ÚZIS on the national health information portal (the spreadsheets themselves, processed 24 June 2026), ÚZIS's registry and management pages, the SVOD portal, the consolidated texts of Act 48/1997 Coll., Act 592/1992 Coll. and the Medicines Act 378/2007 Coll., the English text of the National Oncology Plan 2030, the Czech Oncological Society's list of comprehensive cancer centres, the pages of VZP and SÚKL and ÚZIS's screening programme sites. IARC's GLOBOCAN 2024 fact sheet, the IAEA DIRAC country table and the World Bank's health expenditure series were read for comparison. Each figure was checked against the raw text of the spreadsheet, PDF or page rather than a summary. Trial counts come from OnCo's own ClinicalTrials.gov records. The new records added for this page are the registry, ÚZIS, SÚKL, VZP, the Ministry of Health and SÚKL's director.",
  verify:
    "The registry's counts for 2024 will be revised as late reports arrive, and the stage shares include cases of unknown stage. Reimbursement terms change through SÚKL decisions and the insurers' contracts with centres: before relying on whether a medicine is paid for, ask the treating comprehensive cancer centre and the insurer. The lung and prostate programme details were read from archived copies.",
  verifyLinks: [
    { label: "NZIP: NOR incidence data summary", url: NOR_INC },
    { label: "SVOD: Portál epidemiologie novotvarů v ČR", url: SVOD },
    { label: "SÚKL", url: "https://sukl.gov.cz/" },
    { label: "Linkos: Seznam KOC", url: KOC_LIST },
  ],
};

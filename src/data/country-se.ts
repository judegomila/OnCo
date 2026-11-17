import type { CountryDive } from "@/data/country-dive";

/**
 * Sweden deep dive: the hand-written cards and tables for /countries/se/. Written from Swedish primary sources read in
 * Swedish: Socialstyrelsen's cancer register fact sheet for 2024 and its tables, the register's own quality report and
 * its estimate of missing cases, Cancer i siffror 2023, RCC i samverkan's annual SVF report for 2025 and its screening
 * pages, the national care pathway for breast cancer in Kunskapsbanken, 1177 on patient fees, SKR on how care is
 * financed, TLV's own pages and a TLV decision basis, the ordinance on pharmaceutical benefits, the NT council's pages,
 * Cancerfonden's household cost estimates and the government's January 2026 cancer strategy announcement.
 *
 * Counting conventions worth holding in mind:
 *  - incidence  Cancerregistret, diagnoses in 2024, published 4 November 2025; counts people unless tumours are named
 *  - deaths     Dödsorsaksregistret, deaths in 2024, reported in the same fact sheet
 *  - rates      age-standardised to Sweden's own 2024 population, not to the World standard GLOBOCAN uses
 *  - survival   Cancer i siffror 2023 (Cancerfonden with Socialstyrelsen), 2021 data
 * Every number below was read from the raw text of the linked page or PDF.
 */
const SS_2024 = { label: "Socialstyrelsen, Statistik om nyupptäckta cancerfall 2024 (4 November 2025, PDF)", url: "https://www.socialstyrelsen.se/contentassets/06ca5be116fc41f7a0326ef92a0715f1/2025-11-9874.pdf" };
const SS_TABLES = { label: "Socialstyrelsen, tables for Statistik om nyupptäckta cancerfall 2024 (xlsx)", url: "https://www.socialstyrelsen.se/contentassets/06ca5be116fc41f7a0326ef92a0715f1/2025-11-9874-tabeller.xlsx" };
const SS_REG = { label: "Socialstyrelsen: Cancerregistret", url: "https://www.socialstyrelsen.se/statistik-och-data/register/cancerregistret/" };
const SS_QUAL = { label: "Socialstyrelsen: Cancerregistrets framställning och kvalitet", url: "https://www.socialstyrelsen.se/statistik-och-data/register/cancerregistret/framstallning-och-kvalitet/" };
const SS_BORT = { label: "Socialstyrelsen, Bortfall i svenska cancerregistret 2005-2022 (2024, PDF)", url: "https://www.socialstyrelsen.se/contentassets/24aca3770af044db957f4ee2af50172a/2024-4-9040.pdf" };
const CIS = { label: "Cancer i siffror 2023 (Cancerfonden and Socialstyrelsen, PDF)", url: "https://www.socialstyrelsen.se/globalassets/sharepoint-dokument/dokument-webb/statistik/cancer-i-siffror-2023.pdf" };
const SVF_2025 = { label: "RCC i samverkan, SVF annual report 2025 (Bilaga 1, 27 March 2026, PDF)", url: "https://cancercentrum.se/download/18.7c07b08019d24db18e31c22a/1774867469204/%C3%85rsapport%20%C3%B6verenskommelse%202025%20J%C3%A4mlik%20och%20effektiv%20cancerv%C3%A5rd%20med%20kortare%20v%C3%A4ntetider_bilaga%201%20SVF.pdf" };
const SVF = { label: "RCC: standardiserade vårdförlopp (SVF)", url: "https://cancercentrum.se/diagnosbehandling/vardforloppsvf.11933.html" };
const SVF_BREAST = { label: "Kunskapsbanken: SVF bröstcancer, lead times for national follow-up", url: "https://kunskapsbanken.cancercentrum.se/diagnoser/brostcancer/vardforlopp/" };
const HK_CARE = { label: "1177: högkostnadsskydd för öppenvård", url: "https://www.1177.se/sa-fungerar-varden/kostnader-och-ersattningar/hogkostnadsskydd-for-oppenvard/" };
const HK_DRUGS = { label: "1177: läkemedel på recept, kostnader", url: "https://www.1177.se/undersokning-behandling/behandling-med-lakemedel/att-fa-recept-och-att-kopa-lakemedel/lakemedel-pa-recept--kostnader/" };
const FEES = { label: "1177: patientavgifter", url: "https://www.1177.se/sa-fungerar-varden/kostnader-och-ersattningar/patientavgifter/" };
const SKR_GOV = { label: "SKR: så styrs sjukvården i Sverige", url: "https://skr.se/halsaochsjukvard/sastyrssjukvardenisverige.7651.html" };
const SKR_ECON = { label: "SKR: statistik över kommuners och regioners ekonomi", url: "https://skr.se/ekonomiochbudgetplanering/statistikoverkommunerochregionersekonomi.8290.html" };
const CF_COST = { label: "Cancerfonden: så kan cancer påverka din ekonomi (14 October 2026)", url: "https://www.cancerfonden.se/nyhet/cancer-kan-paverka-privatekonomin" };
const TLV_HE = { label: "TLV: hälsoekonomi (the ethical platform and the severity scale)", url: "https://www.tlv.se/lakemedelsforetag/halsoekonomi.html" };
const TLV_3P = { label: "TLV: trepartsöverläggningar mellan företag och regionerna", url: "https://www.tlv.se/lakemedelsforetag/trepartsoverlaggningar-mellan-foretag-och-regionerna.html" };
const TLV_BALVERSA = { label: "TLV decision basis, Balversa (erdafitinib), Dnr 3644/2024 (PDF)", url: "https://www.tlv.se/download/18.1a66d8be196f12a54922e940/1748270301976/bes250522_balversa_3644-2024_underlag.pdf" };
const SFS_687 = { label: "Förordning (2002:687) om läkemedelsförmåner m.m., section 9", url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/forordning-2002687-om-lakemedelsformaner-mm_sfs-2002-687/" };
const TLV_KLINIK = { label: "TLV: hälsoekonomiska bedömningar av klinikläkemedel", url: "https://www.tlv.se/lakemedelsforetag/halsoekonomiska-bedomningar-och-rapporter-kliniklakemedel.html" };
const TLV_HTAR = { label: "TLV: HTA-förordningen", url: "https://www.tlv.se/lakemedelsforetag/hta-forordningen.html" };
const TLV_HTA_REPORT = { label: "TLV: Nationell samverkan stärker Sveriges inflytande inom HTA i Europa (2 November 2026)", url: "https://www.tlv.se/press/nyheter/arkiv/2026-11-02-nationell-samverkan-starker-sveriges-inflytande-inom-hta-i-europa.html" };
const TLV_JNHB = { label: "TLV: Nordiskt samarbete, FINOSE/JNHB", url: "https://www.tlv.se/lakemedelsforetag/nordiskt-samarbete---finose-jnhb.html" };
const NT = { label: "Samverkan läkemedel: NT-rådet", url: "https://samverkanlakemedel.se/organisation---ordnat-inforande/nt-radet" };
const NT_PUBLIC = { label: "Samverkan läkemedel: ordered introduction, for patients and the public", url: "https://samverkanlakemedel.se/process---ordnat-inforande/for-patienter-och-allmanhet" };
const NT_DEALS = { label: "Samverkan läkemedel: four new medicines in the high-cost protection after three-party talks (1 September 2026)", url: "https://samverkanlakemedel.se/lakemedel---ordnat-inforande/nyheter/nyheter/2026-09-01-fyra-nya-lakemedel-i-hogkostnadsskyddet-tack-vare-trepartsoverlaggningar" };
const EMA_LEAFLET = { label: "EMA: applying for EU marketing authorisation (leaflet, PDF)", url: "https://www.ema.europa.eu/en/documents/leaflet/applying-european-union-marketing-authorisation-medicinal-products-human-use_en.pdf" };
const STRATEGY = { label: "Regeringen: Ny nationell cancerstrategi ska rädda liv och höja livskvaliteten (17 January 2026)", url: "https://www.regeringen.se/pressmeddelanden/2026/01/ny-nationell-cancerstrategi-ska-radda-liv-och-hoja-livskvaliteten/" };
const STRATEGY_DOC = { label: "Regeringen: Ökad överlevnad och bättre livskvalitet, nationell cancerstrategi 2.0", url: "https://www.regeringen.se/informationsmaterial/2026/01/okad-overlevnad-och-battre-livskvalitet--nationell-cancerstrategi-2.0" };
const CF_AR_2024 = { label: "Cancerfonden: annual report 2024 (PDF)", url: "https://static-files.cancerfonden.se/Arsrapporter-2024.pdf" };
const BUDGET_2026 = { label: "Regeringen: Regeringen utökar satsningen på cancerområdet (October 2025)", url: "https://www.regeringen.se/artiklar/2025/10/regeringen-utokar-satsningen-pa-canceromradet/" };
const SCR = "https://www.socialstyrelsen.se/kunskapsstod-och-regler/regler-och-riktlinjer/nationella-screeningprogram/slutliga-rekommendationer";
const RCC_SCR = "https://cancercentrum.se/preventiontidigupptackt/screeningochtestning";

export const SE_DIVE: CountryDive = {
  iso2: "SE",
  iso3: "SWE",
  name: "Sweden",
  flag: "🇸🇪",
  asOf: "2026-11-03",
  title: "Cancer in Sweden",
  description:
    "Cancer in Sweden read from Swedish sources: the national cancer register's 2024 counts, the care pathways that set a maximum wait from suspicion to treatment and how often it is met, the regions that pay and the caps on what a patient pays, how TLV and the regions' NT council decide on new cancer medicines, the screening and organised testing programmes, and the twin, registry and screening research Sweden is known for.",
  lede:
    "Sweden counts cancer through a register every clinic and laboratory must report to by law, sets a time limit from well-founded suspicion of cancer to the start of treatment in each of 27 care pathways and publishes how often it is met, and lets 21 tax-funded regions decide together which hospital cancer drugs are worth their price.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Sweden is 68,934 new cancers and 24,410 deaths for 2024, at age-standardised rates of 288.58 and 76.12 per 100,000 on the World standard population. Socialstyrelsen's register counted 73,861 people with a new cancer in 2024 (80,764 tumours) and the cause of death register 23,514 cancer deaths. Both include non-melanoma skin cancer: IARC's fact sheet says so of its all-cancers figure, and the register counts non-melanoma skin cancer other than basal cell carcinoma, which has its own register. They still do not measure the same thing: the register's rates are standardised to Sweden's own 2024 population; it records some benign tumours as malignant because of where they sit; and Socialstyrelsen estimates that cancers recorded on death certificates but never notified to the register would have added 4.8 per cent to its count in 2014 to 2022. Compare like with like.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Sweden, from the national register",
      aside: SS_2024,
      cards: [
        {
          id: "register-2024",
          title: "73,861 people diagnosed in 2024, and 23,514 deaths",
          plain:
            "In 2024 the Swedish Cancer Register recorded 80,764 cancers in 73,861 people: 34,996 women and 38,865 men. The same year 11,372 women and 12,142 men died of cancer. Breast cancer was the commonest diagnosis in women and prostate cancer in men. Since 1970 the age-standardised rate of new cancers has risen while the death rate has fallen, in women and in men.",
          detail:
            "Socialstyrelsen published its fact sheet for 2024 on 4 November 2025. The register has run since 1958, reporting is a legal duty under the health data register law and Socialstyrelsen's regulations, and a notification is normally complete only when both the treating clinic and the pathology laboratory have reported. About 99 per cent of tumour records are confirmed by microscopy. In women the commonest cancers were breast (8,803 diagnoses, 1,328 deaths), non-melanoma skin cancer (5,420), colon (2,743 and 1,000 deaths), melanoma (2,671) and lung (2,511 and 1,965 deaths). In men they were prostate (10,782 diagnoses, 2,043 deaths), non-melanoma skin (6,760), melanoma (2,931), lymphoma, leukaemia and related cancers together (2,792) and colon (2,745). Socialstyrelsen notes that the fall in reported cases in 2024 probably reflects late reporting rather than less cancer: the latest year is revised upwards the following year. Basal cell carcinoma is counted separately, at about 50,000 people a year, and is not in these totals.",
          links: [SS_2024, SS_TABLES, SS_REG],
        },
        {
          id: "lung-women",
          title: "Lung cancer is now commoner in Swedish women than in men",
          plain:
            "Historically lung cancer was commoner in men in Sweden. It no longer is: in 2024, 2,511 women and 1,829 men were diagnosed. Rates in women have risen by about 1.5 per cent a year for twenty years while rates in men have fallen. Skin cancers have risen fastest of all.",
          detail:
            "Socialstyrelsen measures change as the average annual percentage change in age-standardised incidence between 2005 and 2024. Lung cancer rose 1.5 per cent a year in women and fell 1.8 per cent a year in men, reaching 46 per 100,000 in women and 37 in men. Non-melanoma skin cancer rose 6 per cent a year in women and 4.5 per cent in men; melanoma 4.2 and 3.9 per cent. Pancreatic cancer rose 2.3 per cent a year in women and 1.7 per cent in men, colon cancer 0.6 to 0.7 per cent in both, and prostate cancer fell 1 per cent a year. Pancreatic cancer caused 1,007 deaths in women and 1,046 in men in 2024, more than colon cancer in either sex, on about 850 diagnoses in each.",
          links: [SS_2024, SS_TABLES],
        },
        {
          id: "inequality",
          title: "Which cancers people get, and die of, differs with the kind of area they live in",
          plain:
            "People in Sweden's better-off areas are diagnosed with cancer more often, mostly because they are found to have more prostate, breast and skin cancer. People in the poorest areas die of cancer more often, and die of lung cancer about twice as often.",
          detail:
            "The 2024 fact sheet divides the country into Statistics Sweden's 3,363 regional statistical areas, grouped into five types by education, income and welfare dependence. Age-standardised cancer mortality runs the opposite way to incidence. Among women, lung cancer incidence was 55 per 100,000 in areas with major socioeconomic challenges against 38 in the most advantaged areas, and lung cancer mortality 45 against 23. Among men, lung cancer incidence was 63 against 31 and mortality 54 against 27, while prostate cancer incidence was 149 against 259. Melanoma and non-melanoma skin cancer were more than twice as common in the advantaged areas in both sexes; in women the death rates from them were similar, while in men melanoma was more than twice as common a cause of death in the advantaged areas.",
          links: [SS_2024],
        },
        {
          id: "survival",
          title: "Relative five-year survival of about 77 per cent, and about 600,000 people who have had cancer",
          plain:
            "Relative five-year survival in Sweden, counting all cancers, was 77.8 per cent for men and 76.6 per cent for women in figures Cancerfonden published with Socialstyrelsen in 2023. At the end of 2021 about 600,000 people living in Sweden had been diagnosed with cancer at some point since 1958.",
          detail:
            "Cancer i siffror 2023 uses 2021 data. It gives relative ten-year survival of 72.8 per cent for men and 71.6 per cent for women, a total prevalence of 292,051 men and 317,040 women at 31 December 2021, and a five-year prevalence of about 240,000 people. Relative survival is an estimate of the share of patients who have not died of their cancer, so it excludes deaths from other causes; these all-cancer figures mix cancers with very different outlooks and should not be read as anyone's individual outlook. Cancerfonden summarises the change since 1970 as a move from three in ten alive ten years after diagnosis to about seven in ten. Socialstyrelsen's own fact sheet for 2024 does not publish survival.",
          links: [CIS, SS_2024],
        },
        {
          id: "missing-cases",
          title: "What the register misses: cancers that appear only on a death certificate",
          plain:
            "Socialstyrelsen describes the register's quality as very high in most respects, but it has a known gap. Unlike the other Nordic registers it does not follow up cancers that appear on a death certificate without a registration, so some cancers in very old people, found by a scan and never biopsied, are not counted.",
          detail:
            "Socialstyrelsen estimated the gap by linking the cause of death and patient registers for 2005 to 2022. Of 509,832 cancer-related causes of death, 76 per cent matched a diagnosis in the cancer register and 17 per cent one in the patient register only. The confirmed cases missing from the register averaged 3,958 a year, which would add 6.4 per cent to the count; the shortfall fell from 8.0 per cent in 2005 to 2013 to 4.8 per cent in 2014 to 2022, and in 2014 to 2022 was 12.3 per cent among people diagnosed at 80 or older against 2.7 per cent below 80. Its quality page singles out pancreatic and lung cancer, where about 500 cases a year reported on death certificates have never been notified. Socialstyrelsen states that systematic follow-up would probably need a change in the law.",
          links: [SS_BORT, SS_QUAL],
        },
      ],
      tables: [
        {
          id: "top-sites-2024",
          title: "The commonest cancers in Sweden, 2024",
          caption: "New diagnoses (people) and deaths, by sex, 2024. Counts; age-standardised rates per 100,000 on Sweden's 2024 population.",
          columns: [
            { key: "sex", label: "Sex" },
            { key: "site", label: "Cancer (ICD)" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "caseRate", label: "Incidence per 100,000", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
            { key: "deathRate", label: "Mortality per 100,000", numeric: true },
          ],
          rows: [
            { sex: "Women", site: "Breast (C50)", cases: 8803, caseRate: 163, deaths: 1328, deathRate: 23 },
            { sex: "Women", site: "Skin, excluding melanoma (C44)", cases: 5420, caseRate: 93, deaths: 39, deathRate: 1 },
            { sex: "Women", site: "Colon (C18)", cases: 2743, caseRate: 49, deaths: 1000, deathRate: 17 },
            { sex: "Women", site: "Melanoma (C43)", cases: 2671, caseRate: 49, deaths: 180, deathRate: 3 },
            { sex: "Women", site: "Lung and bronchus (C34)", cases: 2511, caseRate: 46, deaths: 1965, deathRate: 35 },
            { sex: "Women", site: "Lymphoma, leukaemia and related (C81-C96)", cases: 2057, caseRate: 38, deaths: 864, deathRate: 15 },
            { sex: "Women", site: "Pancreas (C25)", cases: 849, caseRate: 15, deaths: 1007, deathRate: 18 },
            { sex: "Men", site: "Prostate (C61)", cases: 10782, caseRate: 211, deaths: 2043, deathRate: 46 },
            { sex: "Men", site: "Skin, excluding melanoma (C44)", cases: 6760, caseRate: 145, deaths: 68, deathRate: 2 },
            { sex: "Men", site: "Melanoma (C43)", cases: 2931, caseRate: 58, deaths: 311, deathRate: 6 },
            { sex: "Men", site: "Lymphoma, leukaemia and related (C81-C96)", cases: 2792, caseRate: 55, deaths: 1040, deathRate: 22 },
            { sex: "Men", site: "Colon (C18)", cases: 2745, caseRate: 55, deaths: 954, deathRate: 20 },
            { sex: "Men", site: "Bladder (C67)", cases: 2447, caseRate: 50, deaths: 476, deathRate: 10 },
            { sex: "Men", site: "Lung and bronchus (C34)", cases: 1829, caseRate: 37, deaths: 1596, deathRate: 33 },
            { sex: "Men", site: "Pancreas (C25)", cases: 850, caseRate: 17, deaths: 1046, deathRate: 21 },
          ],
          note: "From Figure 2 of the fact sheet, which lists each sex's ten commonest diagnoses; rectum in both sexes, corpus uteri and bladder in women, and kidney in men are in the source but omitted here. Incidence is coded in ICD-O-2 from the cancer register and deaths in ICD-10 from the cause of death register; people who died in 2024 may have been diagnosed many years earlier. Basal cell carcinoma is not included.",
          sources: [SS_2024, SS_TABLES],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Who pays: 21 regions, financed by their own taxes, and a cap on what a patient pays",
      aside: SKR_GOV,
      cards: [
        {
          id: "regions",
          title: "Care is run and paid for by the regions",
          plain:
            "Swedish health care is run by 21 regions, which raise most of the money through their own taxes, with grants from the state and a small share from patient fees. Health care is almost nine-tenths of what the regions spend. Six health-care regions share the most specialised care, and each has at least one regional hospital.",
          detail:
            "SKR, the association of municipalities and regions, describes health care as financed mainly by the regions and municipalities themselves through their own power to tax, together with state grants and, to some extent, patient fees. Health care made up 88 per cent of the regions' costs in 2025, of a total of about 492.6 billion kronor. Regions decide how much care to provide and how it is organised, including what they pay private providers working with public money. The six health-care regions agree price lists and where particular specialities sit, and each has at least one regional hospital. A cancer patient's treatment is therefore decided and paid for by a region, which is why waiting times, screening and access to new hospital drugs are measured and published region by region.",
          links: [SKR_GOV, SKR_ECON],
        },
        {
          id: "caps",
          title: "What a patient pays: capped at 1,450 kronor a year for visits and 3,800 for prescriptions",
          plain:
            "A patient pays a fee for each outpatient visit until they have paid 1,450 kronor in twelve months, after which visits are free for the rest of that period, in every region. Prescription medicines have a separate cap of 3,800 kronor in twelve months. A stay in hospital costs at most 130 kronor a day by law. Most regions charge nothing for outpatient care until age 20.",
          detail:
            "The outpatient cap (högkostnadsskydd) counts from the first visit; once 1,450 kronor has been paid the patient receives a frikort, valid in all regions, and a region may set a lower amount. It does not usually cover certificates, health checks, copies of records or the daily charge for inpatient care. The pharmaceutical benefit has its own twelve-month period: the patient pays full price up to 2,000 kronor, then the share falls in steps, with 25, 75 and 90 per cent discounts, until 3,800 kronor has been paid, after which subsidised prescription medicines are free for the rest of the period. 1177 describes the 3,800 kronor cap for medicines on prescription. Medicines given by health-care staff, which the regions call clinic medicines, are handled through the regions' joint introduction process, described in the next section.",
          links: [HK_CARE, HK_DRUGS, FEES, NT_PUBLIC],
        },
        {
          id: "household",
          title: "The cost that is not capped: lost income",
          plain:
            "Because care and medicines are capped, the larger cost of cancer for a working-age Swede is lost income. Cancerfonden estimates the average economic burden for a woman aged 40 to 64 with breast cancer, lost income plus added costs once sick pay and benefits are counted, at about 170,000 kronor, most of it in the first two years.",
          detail:
            "A report that Cancerfonden presented on 14 October 2026 modelled breast and colorectal cancer. For women aged 40 to 64 with breast cancer, reduced income was estimated at a little over 345,000 kronor, mostly from sick leave, offset by about 200,000 kronor of sick pay, sickness benefit and activity compensation, with about 21,000 kronor of added costs for care fees, medicines, dental care, aids and travel: a burden of about 170,000 kronor, about 135,000 of it in the first two years. For colorectal cancer at the same ages the total was also about 170,000 kronor. Above 65, where income is less affected, the estimated burden was about 35,000 kronor for breast cancer and 50,000 for colorectal cancer, mostly in costs. The sickness insurance ceiling in 2026 is an income of 600,000 kronor a year, so higher earners lose a larger share. About 12,000 people with cancer receive sickness benefit each year.",
          links: [CF_COST],
        },
      ],
      tables: [
        {
          id: "patient-caps",
          title: "Patient cost ceilings in Sweden",
          caption: "Maximum a patient pays, in Swedish kronor, as stated by 1177 (the national health information service) on 3 November 2026.",
          columns: [
            { key: "what", label: "What" },
            { key: "cap", label: "Ceiling (kronor)", numeric: true },
            { key: "period", label: "Period" },
          ],
          rows: [
            { what: "Outpatient visits (högkostnadsskydd for öppenvård); a region may set less", cap: 1450, period: "12 months from the first visit" },
            { what: "Prescription medicines in the pharmaceutical benefit", cap: 3800, period: "12 months from the first purchase" },
            { what: "Inpatient stay, daily charge (legal maximum)", cap: 130, period: "Per day" },
          ],
          note: "The pharmacy cap applies to subsidised prescription medicines only. Medicines given by health-care staff in hospital or at a clinic are not prescription medicines and are not counted here.",
          sources: [HK_CARE, HK_DRUGS, FEES],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Drug decisions",
      title: "How Sweden decides a cancer drug is worth its price: TLV and the regions' NT council",
      aside: TLV_HE,
      cards: [
        {
          id: "tlv",
          title: "TLV: prescription drugs, a 180-day clock, and a higher price accepted for more severe disease",
          plain:
            "TLV, a state agency, decides whether a prescription medicine is subsidised and enters the patient cost cap, and at what price. The company has to apply and show the drug is worth it. TLV accepts a higher cost for the same health gain the more severe the disease. Its page on health economics gives no fixed price limit and says each case is judged on its own.",
          detail:
            "Under the law on pharmaceutical benefits (2002:160) TLV's expert board decides on applications, and the ordinance (2002:687) requires a decision within 180 days of a complete application. TLV's assessments follow the ethical platform parliament set for health-care priorities: equal human dignity, need and solidarity, and a reasonable relation between cost and benefit. Severity is graded low, moderate, high or very high; the agency states that the higher the severity, the higher the cost per quality-adjusted life year (QALY) it is reasonable to pay, and that for particularly rare conditions of very high severity it may accept more. It takes a limited societal perspective and does not, as a starting point, count productivity gains from returning to work, because doing so would favour people who can work. One cancer example: for erdafitinib (Balversa) in previously treated FGFR3-altered urothelial cancer, TLV graded the severity very high, estimated about 950,000 kronor per QALY against vinflunine with sensitivity analyses from about 750,000 to 1.14 million, and noted most of them were below what it normally accepts at that severity.",
          links: [TLV_HE, SFS_687, TLV_BALVERSA],
        },
        {
          id: "nt-council",
          title: "The NT council: one recommendation for every region on hospital cancer drugs",
          plain:
            "Medicines given by health-care staff, such as an injection, are called clinic medicines, and TLV notes that more and more cancer medicines are expected to be approved. So that access does not depend on where a patient lives, the regions' NT council decides together whether such a drug should be used, after TLV has assessed its value and the regions have negotiated the price. It says openly that it sometimes has to say no when the price is very high.",
          detail:
            "Rådet för nya terapier has a member from each health-care region, a chair, experts in health economics and medical ethics, co-opted oncology, paediatric, legal and communication expertise, and two patient advisers. It decides which medicines go into the national process of ordered introduction; for those, it orders a health-economic assessment from TLV, decides the willingness to pay, can send the regions' negotiators to the company, and then issues a recommendation to all regions. TLV's planned and ongoing hospital-drug assessments for the council include datopotamab deruxtecan and sacituzumab govitecan in triple-negative breast cancer, tarlatamab in small-cell lung cancer, zanidatamab in biliary cancer and teclistamab with daratumumab in myeloma. Where a company and the regions agree, three-party talks with TLV can end in a side agreement under which the company repays part of the cost; the regions report more than 140 such joint agreements and say almost all are needed for the drugs to count as cost-effective. On 1 September 2026 three cancer medicines, inavolisib and capivasertib in breast cancer and lazertinib in lung cancer, entered the cost cap, decisions the regions say were largely made possible by such agreements.",
          links: [NT, NT_PUBLIC, TLV_KLINIK, TLV_3P, NT_DEALS],
        },
        {
          id: "nordic-eu",
          title: "Joint assessments with the Nordic countries and the EU",
          plain:
            "Sweden does not assess every cancer drug alone. TLV assesses some hospital drugs jointly with the other Nordic agencies, and since January 2025 the EU has assessed the clinical evidence for new cancer medicines once for all member states. The judgement on price stays in Sweden.",
          detail:
            "The FINOSE collaboration began in 2018 between the HTA agencies of Finland, Norway and Sweden, added Denmark in 2023 and Iceland in 2024, and was renamed Joint Nordic HTA-Bodies in June 2024; it assesses relative effect and cost-effectiveness together, mainly for hospital drugs, while price and use are decided nationally. The EU HTA Regulation (2021/2282) has applied since 12 January 2025; its first phase covers cancer medicines and advanced therapy medicinal products, an estimated 30 products a year, rising to all centrally authorised medicines, about 120 a year, from 2030. The joint clinical assessment reports contain no value judgement, so TLV still interprets the relative effect itself, and because Sweden uses health economics the cost-effectiveness judgement remains national. TLV and SBU reported to the government on 2 November 2026 on how Sweden takes part.",
          links: [TLV_JNHB, TLV_HTAR, TLV_HTA_REPORT],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Approval: Läkemedelsverket and the European Medicines Agency",
      aside: EMA_LEAFLET,
      cards: [
        {
          id: "ema-route",
          title: "New cancer medicines are approved for Sweden through the EU, not nationally",
          plain:
            "Sweden's own medicines agency, Läkemedelsverket, works within the European system. Every new cancer medicine with a new active substance must be approved through the EU's central procedure, which covers Sweden with every other member state. What happens in Sweden afterwards, price and use, is decided by TLV and the regions.",
          detail:
            "Under the EU centralised procedure, medicines containing a new active substance for cancer must be evaluated by the European Medicines Agency, as must all biotechnology products, advanced therapies and designated orphan medicines. After a valid application the evaluation by the Committee for Medicinal Products for Human Use takes up to 210 days, and the European Commission then has 67 days to decide; the authorisation is valid across the European Economic Area. The scientific approval is European. The steps that follow for a Swedish patient, TLV's subsidy decision and the regions' NT council, are national, and the section above describes them.",
          links: [EMA_LEAFLET, { label: "Läkemedelsverket", url: "https://www.lakemedelsverket.se/" }],
        },
      ],
    },
    {
      id: "pathways",
      nav: "Waiting times",
      title: "A time limit for each suspected-cancer pathway, with results published every year",
      aside: SVF,
      cards: [
        {
          id: "svf",
          title: "Standardised care pathways: from well-founded suspicion to treatment within a set number of days",
          plain:
            "Since 2015 Sweden has introduced standardised care pathways for suspected cancer; the 2025 report counts 27. Each lists which tests to do and sets a maximum number of days from the moment a doctor has a well-founded suspicion of cancer to the start of treatment. For breast cancer that is 35 calendar days. The goal is that 80 per cent of patients start treatment within the time.",
          detail:
            "The pathways (standardiserade vårdförlopp, SVF) were started in 2015 by the government and the regions to cut waiting and uncertainty and to make care more equal. Each begins with a defined well-founded suspicion, for breast cancer a list of findings such as a suspicious lump in the breast or a new nipple retraction, after which the patient is referred straight into the pathway. The breast cancer pathway's national lead time, from the decision of well-founded suspicion to the start of first treatment by surgery, drugs or radiotherapy, was extended from 28 to 35 calendar days. Two national goals apply: that 70 per cent of all new cancers in a diagnosis with a pathway are investigated through it, and that 80 per cent of patients start treatment within the lead time. Regions report start and stop dates to SKR's waiting-time database and, from 1 July 2025, also to Socialstyrelsen; each region's yearly report on its pathway work is a condition for receiving the second half of that year's money for it.",
          links: [SVF, SVF_BREAST, SVF_2025],
        },
        {
          id: "svf-2025",
          title: "In 2025, 47 per cent started treatment in time, against a goal of 80",
          plain:
            "The pathways are used: almost 150,000 were completed in 2025. But the waiting-time goal is far from met. 47 per cent of patients started treatment within the pathway's time limit, up from 45 per cent in 2024. Only acute leukaemia reached 80 per cent.",
          detail:
            "RCC's annual report for 2025, dated 27 March 2026, records 148,441 completed pathways. The inclusion goal was met for 16 of 27 pathways. Three regions, all of which changed electronic records systems during the period, missed the 70 per cent goal for the first half of the year, and four missed it for the year as a whole. By first treatment, 46 per cent of surgical patients started in time (44 per cent in 2024), 35 per cent of radiotherapy patients (32 per cent) and 50 per cent of drug-treated patients (unchanged). In eight regions at least 50 per cent started in time. RCC found no clear difference between women and men nationally. Patient surveys give a good overall impression of the pathways. In 2026 every region must review the patients who waited more than 50 per cent longer than the lead time in the myeloma and colorectal pathways.",
          links: [SVF_2025, { label: "RCC: redovisning av införande av SVF, regional reports 2025", url: "https://cancercentrum.se/diagnosbehandling/vardforloppsvf/handlingsplanerochredovisningar.7400.html" }],
        },
        {
          id: "strategy",
          title: "A new national cancer strategy in January 2026, with 1.5 billion kronor proposed for 2026",
          plain:
            "Sweden's first national cancer strategy dates from 2009. In January 2026 the government published an updated one for the next 10 to 15 years, with three goals: lower risk and earlier detection, higher survival, and the best possible quality of life during and after illness. It now covers children and young adults.",
          detail:
            "The government launched the strategy on 17 January 2026. Its measures cover prevention, screening, rehabilitation and palliative care, with weight on research, innovation and cooperation across sectors. Agencies received assignments to begin implementation at once: the Swedish Agency for Health and Care Services Analysis to build a structure for following up the strategy's goals and sub-goals; Socialstyrelsen to strengthen screening recommendations and the use of cancer register data and to lead a cooperation group for Swedish cancer care; and the Public Health Agency to draw up an action plan for prevention. In the budget bill for 2026 the government proposed a further 500 million kronor, making 1.5 billion kronor set aside for the cancer area in 2026, to implement the strategy. The announcement states that cancer causes a quarter of all deaths in Sweden and is the leading cause of years of life lost.",
          links: [STRATEGY, STRATEGY_DOC, BUDGET_2026],
        },
      ],
      tables: [
        {
          id: "svf-results",
          title: "Standardised care pathways: national results",
          caption: "Share of patients starting first treatment within the pathway's lead time, Sweden, 2024 and 2025. Goal: 80 per cent.",
          columns: [
            { key: "measure", label: "Measure" },
            { key: "y2024", label: "2024 (%)", numeric: true },
            { key: "y2025", label: "2025 (%)", numeric: true },
          ],
          rows: [
            { measure: "All pathways, treatment started within lead time", y2024: 45, y2025: 47 },
            { measure: "First treatment surgery", y2024: 44, y2025: 46 },
            { measure: "First treatment radiotherapy", y2024: 32, y2025: 35 },
            { measure: "First treatment drugs", y2024: 50, y2025: 50 },
          ],
          note: "148,441 pathways were completed in 2025. Lead times are counted for the region where the pathway started or the patient is registered, even when treatment was given elsewhere. Only acute leukaemia met the 80 per cent goal in 2025.",
          sources: [SVF_2025],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and organised testing",
      aside: { label: "Socialstyrelsen: nationella screeningprogram", url: "https://www.socialstyrelsen.se/kunskapsstod-och-regler/regler-och-riktlinjer/nationella-screeningprogram/" },
      cards: [
        {
          id: "programmes",
          title: "Three national programmes: breast, cervix and bowel",
          plain:
            "Socialstyrelsen recommends screening and the regions deliver it. Every region must offer free breast screening to women aged 40 to 74 and free cervical screening to women aged 23 to 70. Every region should offer bowel screening with a home stool test to everyone aged 60 to 74, and that programme is due to be fully built in 2026.",
          detail:
            "Breast and cervical screening are regulated by Socialstyrelsen's binding regulations on free screening; Socialstyrelsen recommends against breast screening after 74 because no benefit has been shown, and judged the gains from tomosynthesis and breast-density assessment uncertain. Cervical screening is an HPV test, every five or seven years depending on age; about 2.5 million women are tested according to the care programme, about 340,000 have not been tested or not within the interval, and regions are sending reminders and self-sampling kits to reach them. Sweden measures the share actually tested, with a goal of 90 per cent. Bowel screening has been recommended since 2014; Stockholm and Gotland have long offered it, the other regions began from 2021, and once complete everyone aged 60 to 74 will be invited every other year to send a stool sample, with colonoscopy if blood is found. RCC estimates about 300 lives a year could be saved. Socialstyrelsen's evaluation of bowel screening is due in early 2027.",
          links: [
            { label: "Socialstyrelsen: breast screening", url: `${SCR}/brostcancer/` },
            { label: "Socialstyrelsen: cervical screening", url: `${SCR}/livmoderhalscancer/` },
            { label: "Socialstyrelsen: bowel screening", url: `${SCR}/tjock-och-andtarmscancer/` },
            { label: "RCC: cervical screening and HPV self-sampling", url: `${RCC_SCR}/gynekologiskcellprovtagningochsjalvprovforhpv.676.html` },
            { label: "RCC: bowel screening", url: `${RCC_SCR}/screeningtjockochandtarmscancer.679.html` },
          ],
        },
        {
          id: "prostate-opt",
          title: "Prostate: no screening programme, but organised testing",
          plain:
            "Socialstyrelsen advises against prostate screening with a PSA test alone, because too many men would be diagnosed with cancers that would never have harmed them. Instead most regions now run organised prostate cancer testing: men are given clear information and decide for themselves, and the testing is structured so that it is fairer and can be evaluated.",
          detail:
            "Socialstyrelsen's recommendation is that health care should not offer prostate screening with PSA alone, because the benefit does not clearly outweigh the harms; it judged that the evidence for adding a second test before biopsy needs to be completed before it can recommend that, and is reviewing how and when to reassess. Organised prostate cancer testing (organiserad prostatacancertestning, OPT) is the regions' answer, supported by the regional cancer centres: two regions started in 2020 and most have begun in some form. Socialstyrelsen's own description, quoted by RCC, is that organised PSA testing means men receive clear information on the test's advantages and disadvantages and then decide individually, and is not to be confused with a screening programme. Swedish studies of ways to cut overdiagnosis in prostate testing include STHLM3 and STHLM3-MRI from Karolinska Institutet and GÖTEBORG-2 from Gothenburg.",
          links: [
            { label: "Socialstyrelsen: prostate screening recommendation", url: `${SCR}/prostatacancer/` },
            { label: "RCC: organiserad prostatacancertestning", url: `${RCC_SCR}/prostatacancertestning.678.html` },
          ],
        },
        {
          id: "lung",
          title: "Lung: research studies only",
          plain:
            "Sweden has no lung cancer screening programme and no decision to introduce one. Studies are testing how a programme should be designed: one in Stockholm since 2022, and implementation studies in the north and west of the country.",
          detail:
            "The regional cancer centres run the studies, RCC Stockholm Gotland in Stockholm and RCC Väst with RCC Norr in their regions, the latter also testing whether blood biomarkers can refine who is invited. RCC notes that about half of lung cancer patients in Sweden are diagnosed between 70 and 79 and a fifth over 80, which bears on the upper age limit any programme would use.",
          links: [{ label: "RCC: pilot studies in lung cancer screening", url: `${RCC_SCR}/lungcancerscreening.683.html` }],
        },
      ],
    },
    {
      id: "doing",
      nav: "Distinctive",
      title: "What Sweden does that others do not",
      cards: [
        {
          id: "registries",
          title: "Registers that can be linked person by person",
          plain:
            "Sweden's cancer register records each person's personal identity number, so it can be linked to other national registers: Socialstyrelsen linked it to the cause of death and patient registers to measure its own gaps, and researchers link registers like it to twin and population registers to follow whole populations for decades.",
          detail:
            "The cancer register has run since 1958; national quality registers, hosted by the regional cancer centres on the INCA platform, now cover almost all cancer types, and Socialstyrelsen says it must be assumed that they have improved reporting to the register. A Nordic twin study led from Karolinska Institutet, using 44,788 twin pairs from the Swedish, Danish and Finnish twin registers, estimated in 2000 that heritable factors account for 42 per cent of the variation in prostate cancer risk, 35 per cent for colorectal and 27 per cent for breast cancer, and that the environment plays the principal role for most cancers; a four-country follow-up of 203,691 twins in 2016 put the heritability of cancer overall at 33 per cent. A register study of 1,672,983 Swedish girls and women published in 2020 found an adjusted incidence rate ratio for invasive cervical cancer of 0.12 among those vaccinated against HPV before 17, against the unvaccinated.",
          links: [
            { label: "Lichtenstein et al., NEJM 2000", url: "https://doi.org/10.1056/NEJM200007133430201" },
            { label: "Mucci et al., JAMA 2016 (NorTwinCan)", url: "https://doi.org/10.1001/jama.2015.17703" },
            { label: "Lei et al., HPV vaccination and invasive cervical cancer, NEJM 2020", url: "https://doi.org/10.1056/NEJMoa1917338" },
            SS_BORT,
          ],
        },
        {
          id: "screening-trials",
          title: "Screening tested in randomised trials inside the public programmes",
          plain:
            "Sweden tests changes to screening by running trials inside the screening programmes themselves. Two examples: whether artificial intelligence can replace one of the two doctors who read each mammogram, and whether an MRI scan should decide which men with a raised PSA need a biopsy.",
          detail:
            "MASAI randomised 80,033 women at four screening sites in Sweden to AI-supported reading or standard double reading; at the planned safety analysis AI support found 6.1 cancers per 1,000 women screened against 5.1, with a similar false-positive rate of 1.5 per cent and 44.3 per cent less reading work, and the Swedish Cancer Society and the regional cancer centres were among its funders. ScreenTrustCAD, at Capio S:t Göran's Hospital in Stockholm, found that one radiologist plus AI was non-inferior to two radiologists in 55,581 women. STHLM3-MRI found that an MRI-first pathway found clinically significant prostate cancer in 21 per cent of men with a raised PSA randomised to it against 18 per cent with standard biopsy, while cutting insignificant cancers from 12 to 4 per cent. In treatment, the ALASCCA trial led from Karolinska Institutet found that low-dose aspirin after surgery for colorectal cancer with PI3K pathway alterations reduced three-year recurrence from 14.1 to 7.7 per cent in the primary group.",
          links: [
            { label: "Lång et al., MASAI, Lancet Oncology 2023", url: "https://doi.org/10.1016/S1470-2045(23)00298-X" },
            { label: "Dembrower et al., ScreenTrustCAD, Lancet Digital Health 2023", url: "https://doi.org/10.1016/S2589-7500(23)00153-X" },
            { label: "Eklund et al., STHLM3-MRI, NEJM 2021", url: "https://doi.org/10.1056/NEJMoa2100852" },
            { label: "Martling et al., ALASCCA, NEJM 2025", url: "https://doi.org/10.1056/NEJMoa2504650" },
          ],
        },
        {
          id: "joint-introduction",
          title: "Twenty-one regions deciding together on hospital drugs",
          plain:
            "Where health care is run by regions, access to a new hospital drug can differ from one region to the next. Sweden's regions agree a single recommendation through the NT council and can negotiate prices jointly. The regions' site has a page for patients and the public that explains how the council decides.",
          detail:
            "The council's recommendations rest on the ethical platform parliament adopted for health-care priorities and on TLV's health-economic assessment; treatment councils can review individual cases against a recommendation, including whether a patient should be an exception to it. The regions' joint market function negotiates agreements with companies; more than 140 cover prescription and hospital medicines.",
          links: [NT, NT_PUBLIC, NT_DEALS],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "not-reached",
      title: "What OnCo could not read or verify",
      plain:
        "Several things a reader would want on this page are missing because the source could not be read or does not publish them. They are named here so the gap is visible.",
      detail:
        "Läkemedelsverket's website is built so that its pages do not render without running scripts, so OnCo could not read its own description of its performance, timelines or the Swedish licence route for unapproved medicines, and this page says nothing about them beyond the EU procedure. Socialstyrelsen's 2024 fact sheet publishes no survival figures, so the survival quoted is Cancerfonden's 2023 compilation from 2021 data rather than a register figure for a recent cohort, and no survival by stage is given. The interactive SVF statistics, which give results by region and diagnosis, are not read here; only the national annual report is. TLV's health-economics page states no threshold for cost per QALY and says each case is judged on its own, so the erdafitinib figure is one decision, not a rule. The full text of the 2026 cancer strategy, including any numeric targets, was not read; only the government's announcement was. Cancerfonden's annual report for 2024, read on 17 November 2026, gives 1,002 million kronor for research funding in 2024 and 966 million in 2023; OnCo's country table gives about 1 billion kronor for 2024. Europe PMC was unavailable on 3 November 2026, so DOIs were resolved through Crossref and PubMed.",
      links: [
        { label: "RCC: interactive SVF statistics", url: "https://cancercentrum.se/utvecklingsarbeteutbildning/statistikrapporter/statistik/svfstatistik.743.html" },
        STRATEGY_DOC,
        { label: "Läkemedelsverket", url: "https://www.lakemedelsverket.se/" },
        CF_AR_2024,
      ],
    },
    {
      id: "corpus-gaps",
      title: "What this corpus still does not hold about Sweden",
      plain: "Named so the gap is visible rather than invisible. Adding any of these would improve the page.",
      detail:
        "The corpus has no record for Läkemedelsverket, for SBU, or for the national quality registers individually, such as the breast cancer register NKBC or the prostate register. It has no record for the Swedish Twin Registry or the Multi-Generation Register as resources, nor for the Swedish Family-Cancer Database. Karolinska Institutet is held only inside the Karolinska University Hospital record. GÖTEBORG-2's founding trial, the Göteborg randomised prostate screening study, and the Swedish organised testing programmes region by region are not recorded. Swedish-language care programmes in Kunskapsbanken, which govern practice in every region, are not in the guideline comparison.",
      links: [
        { label: "RCC: national quality registers", url: "https://cancercentrum.se/utvecklingsarbeteutbildning/statistikrapporter/statistik/kvalitetsregister.8592.html" },
        { label: "Kunskapsbanken (national care programmes)", url: "https://kunskapsbanken.cancercentrum.se/" },
      ],
    },
  ],
  institutions: ["karolinska", "swedish-cancer-register", "rcc-i-samverkan", "tlv-sweden", "nt-radet", "cancerfonden", "sahlgrenska", "lund-skane", "uppsala-akademiska", "linkoping-university-hospital", "orebro-university-hospital", "umea-university-hospital", "capio-st-goran", "sgccn"],
  companies: ["elekta", "raysearch", "sectra", "c-rad", "sobi", "oncopeptides", "bioinvent-international", "alligator-bioscience", "active-biotech", "camurus", "elypta", "mendus", "anocca", "rhovac", "spectracure", "dignitana", "nanoecho", "navari-surgical", "one-carbon-therapeutics", "nordic-lymphoma-group", "scandinavian-sarcoma-group"],
  drugs: ["melflufen", "tasquinimod", "mitazalimab", "rv001v", "cam2029", "gagome-mced-test"],
  trials: ["sthlm3-mri", "masai", "screentrustcad", "goteborg-2", "alascca", "stockholm-iii", "senomac", "ssgxviii", "lev87a", "lev93a", "nct02963493", "nct03151811", "tasquinimod-10tasq10", "nct04888312", "nct04219254"],
  papers: [
    "paper-eklund-sthlm3-mri-nejm-2021",
    "paper-gronberg-sthlm3-lancet-oncol-2015",
    "paper-lichtenstein-twins-cancer-heritability-nejm-2000",
    "paper-mucci-nortwincan-heritability-jama-2016",
    "paper-hpv-vaccine-sweden-nejm-2020",
    "paper-masai-lancet-oncol-2023",
    "paper-masai-lancet-digit-health-2025",
    "paper-screentrustcad-dembrower-lancet-digit-health-2023",
    "paper-goteborg-2-n-engl-j-med-2022",
    "paper-alascca-n-engl-j-med-2025",
    "paper-swedish-rectal-cancer-trial-preoperative-radiotherapy-nejm-1997",
    "paper-staaf-tnbc-whole-genome-scan-b-nat-med-2019",
    "paper-sigurjonsdottir-sp142-22c3-tnbc-bcr-2023",
    "paper-bratulic-gagome-pnas-2022",
  ],
  people: ["mats-lambe", "henrik-gronberg", "martin-eklund", "paul-lichtenstein", "per-hall", "jonas-bergh", "thomas-helleday", "kristina-lang", "rolf-kiessling", "hans-gustaf-ljunggren"],
  how:
    "Written from Swedish sources read in Swedish: Socialstyrelsen's 2024 fact sheet and tables for the cancer register, its quality pages and its estimate of missing cases; Cancer i siffror 2023; the regional cancer centres' 2025 annual report on the care pathways, the breast cancer pathway in Kunskapsbanken and their screening pages; 1177 on patient fees; SKR on how care is financed; TLV's pages, one TLV decision basis and the ordinance on pharmaceutical benefits; the NT council's pages; Cancerfonden's 2026 household cost estimates; and the government's January 2026 strategy announcement. Every figure was checked against the raw text of the linked page or PDF; papers were resolved by DOI through Crossref and PubMed and their figures read from the abstract. The entity lists are drawn from the graph by id, with new records for the cancer register, the regional cancer centres, TLV, the NT council, Cancerfonden, the STHLM3 studies, the Nordic twin studies and four researchers.",
  verify:
    "Register counts for the latest year are revised upwards the following year, so check Socialstyrelsen's most recent fact sheet before quoting 2024 figures. Patient fee ceilings change with government decisions and a region may set lower ones; 1177 and the region are the authorities for what a patient pays. Pathway results and NT council recommendations change through the year. Nothing here is advice about an individual's care.",
  verifyLinks: [SS_REG, SVF, HK_CARE, NT],
};

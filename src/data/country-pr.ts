import type { CountryDive } from "@/data/country-dive";

/**
 * Puerto Rico deep dive: the hand-written cards for /countries/pr/ (wave 10). Every figure was read from the raw text
 * of its source on 11 November 2026, not from a summary of it: the Puerto Rico Central Cancer Registry's site and its
 * report "Cancer in Puerto Rico, 2018-2022" (PDF text, 2025), IARC's GLOBOCAN 2024 fact sheet for Puerto Rico (PDF
 * text), 21 U.S.C. 321 as published by the Legal Information Institute, HHS's Federal Register notice of 29 November
 * 2024 setting matching rates for fiscal year 2026, MACPAC's February 2021 fact sheet and match-rate page, KFF's
 * October 2024 brief on territory Medicaid financing, the Puerto Rico Department of Health's Medicaid and SARSP pages,
 * two SARSP notices to medicine distributors (scanned PDFs, read by OCR with Tesseract and checked against the page
 * images for the dates and numbers used), the Administración de Seguros de Salud's Plan Vital page and a Plan Vital
 * beneficiary manual (PDF text), the University of Puerto Rico Comprehensive Cancer Center's screening programme page,
 * NCI's lists of designated cancer centres, SEER registries and NCORP sites, and the papers' abstracts through Europe
 * PMC. Spanish sources were read in Spanish. medicaid.gov and cdc.gov answered 403; where a figure could not be read it
 * is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/630-puerto-rico-fact-sheet.pdf";
const RCPR = "https://rcpr.org/";
const RCPR_ABOUT = "https://rcpr.org/Sobre-Nosotros";
const RCPR_REPORT = "https://rcpr.org/Portals/0/informe%202018-2022%20-%20Ingles.pdf";
const RCPR_REPORT_ES = "https://rcpr.org/Portals/0/informe%202018-2022%20-%20Espanol.pdf";
const SEER_LIST = "https://seer.cancer.gov/registries/list.html";
const USC_321 = "https://www.law.cornell.edu/uscode/text/21/321";
const FR_FMAP_2026 = "https://www.federalregister.gov/documents/2024/11/29/2024-27910/federal-financial-participation-in-state-assistance-expenditures-federal-matching-shares-for";
const MACPAC_PR = "https://www.macpac.gov/wp-content/uploads/2020/08/Medicaid-and-CHIP-in-Puerto-Rico.pdf";
const KFF_2024 = "https://www.kff.org/medicaid/recent-changes-in-medicaid-financing-in-puerto-rico-and-other-u-s-territories/";
const DS_MEDICAID = "https://www.salud.pr.gov/CMS/85";
const DS_SARSP = "https://www.salud.pr.gov/CMS/187";
const DS_NOTICE_2024 = "https://www.salud.pr.gov/CMS/DOWNLOAD/9461";
const DS_NOTICE_2025 = "https://www.salud.pr.gov/CMS/DOWNLOAD/9655";
const ASES_VITAL = "https://www.ases.pr.gov/plan-vital";
const VITAL_MANUAL = "https://docs.pr.gov/files/ASES/Plan%20Vital/Manuales%20del%20los%20Beneficiarios/Triple-S-Beneficiary-Manual-English-Version-1.pdf";
const CCCUPR_SCREENING = "https://www.cccupr.org/cancer-mama-cuello-uterino/";
const CCCUPR = "https://www.cccupr.org/";
const NCI_CENTERS = "https://www.cancer.gov/research/infrastructure/cancer-centers/find";
const NCORP_SITES = "https://ncorp.cancer.gov/findasite/";
const CTGOV = "https://clinicaltrials.gov/search?country=Puerto%20Rico&cond=cancer";
const WB_OOP = "https://api.worldbank.org/v2/country/PRI/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const DIRAC = "https://dirac.iaea.org/";

const ORTIZ_2024 = { label: "Ortiz et al., cervical cancer trends in Puerto Rico 2001 to 2019 (BMC Med 2024)", url: "https://doi.org/10.1186/s12916-024-03535-4" };
const SUAREZ_2025 = { label: "Suárez-Ramos et al., hurricanes, COVID-19 and colorectal cancer incidence in Puerto Rico (Cancer 2025)", url: "https://doi.org/10.1002/cncr.35793" };
const CHANCE_2018 = { label: "Chance et al., radiotherapy after breast-conserving surgery in Puerto Rico (J Glob Oncol 2018)", url: "https://doi.org/10.1200/JGO.2016.008664" };
const GIERBOLINI_2026 = { label: "Gierbolini-Bermúdez et al., insurance, deprivation and breast cancer in Puerto Rico (Healthcare 2026)", url: "https://doi.org/10.3390/healthcare14050676" };
const COLON_2021 = { label: "Colón-López et al., the HPV vaccine school-entry requirement in Puerto Rico (Prev Chronic Dis 2021)", url: "https://doi.org/10.5888/pcd18.210035" };
const MUNOZ_2024 = { label: "Muñoz-Torres et al., cancer treatment disruption after Hurricanes Irma and María (Int J Environ Res Public Health 2024)", url: "https://doi.org/10.3390/ijerph21101334" };
const GOPALANI_2023 = { label: "Gopalani et al., cancer screening in Guam, Puerto Rico and the US Virgin Islands (Cancer Epidemiol 2023)", url: "https://doi.org/10.1016/j.canep.2023.102371" };

export const PR_DIVE: CountryDive = {
  iso2: "PR",
  iso3: "PRI",
  name: "Puerto Rico",
  flag: "🇵🇷",
  asOf: "2026-11-11",
  title: "Cancer in Puerto Rico",
  description:
    "Cancer in Puerto Rico from Puerto Rican and US federal sources: a registry counting every cancer since the early 1950s, 80,473 diagnoses and 26,105 deaths in 2018 to 2022, FDA approval with the Department of Health's own register of cancer medicines, Medicaid with capped federal funding and a 76% match until September 2027, Plan Vital's special coverage for cancer, the HPV vaccine as a school requirement since 2018, what the 2017 hurricanes did to cancer care, and 226 trials in our records with a site on the island.",
  lede:
    "Puerto Rico is a US territory of about 3.2 million people, almost all Hispanic, with its own population-based cancer registry: 16,512 new cancers and 5,392 cancer deaths were recorded in 2022, with prostate cancer leading in men and breast cancer in women. Medicines reach the island through FDA approval, as in the states, but federal Medicaid money is capped, and about half the population was enrolled in Medicaid or the children's programme in 2021.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Puerto Rico is 16,568 new cancers and 7,876 deaths, an age-standardised incidence of 236.1 per 100,000 (252.2 in men, 225.7 in women), including 69 non-melanoma skin cancers. IARC's fact sheet gives the incidence source as the national registry, with national rates projected to 2024, and this is close to the registry's own count of 16,512 cancers in 2022. The deaths are not. IARC's mortality method for Puerto Rico applies model-based mortality-to-incidence ratios to incidence, while the registry counts death certificates from Puerto Rico's Demographic Registry: 5,392 cancer deaths in 2022, and a world-standardised death rate of 61.1 per 100,000 for 2018 to 2022 against IARC's 99.9. For deaths, the registry's count is the measured figure; IARC's is a model.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Puerto Rico",
      aside: { label: "Puerto Rico Central Cancer Registry: Cancer in Puerto Rico, 2018-2022 (PDF)", url: RCPR_REPORT },
      cards: [
        {
          id: "shape",
          title: "About 16,000 new cancers a year, and prostate cancer two in five of men's",
          plain:
            "Puerto Rico's cancer registry counted 80,473 people diagnosed with cancer in the five years 2018 to 2022, about 16,000 a year, slightly more men than women. Prostate cancer is 38.9% of cancers in men and breast cancer 31.4% in women; colorectal cancer is second in both. About 5,200 people a year died of cancer in that period.",
          detail:
            "The registry's report gives 42,143 diagnoses in men and 38,330 in women over 2018 to 2022, a median age at diagnosis of 67, and 26,105 cancer deaths (14,300 men, 11,805 women) with a median age at death of 74. In women uterine cancer is third (10.0%) and thyroid cancer fourth (8.1%); uterine cancer rose 4.0% a year and thyroid cancer 6.5% a year from 2000 to 2022, although the report says thyroid cancer has declined since 2015. The leading causes of cancer death are prostate, colorectal and lung cancer in men and breast, colorectal and lung cancer in women. About 39.7% of people will be diagnosed with a cancer in their lifetime, and on 1 January 2022 some 144,531 people diagnosed in the previous 25 years were alive, 4.46% of the population.",
          links: [
            { label: "Cancer in Puerto Rico, 2018-2022: overview, figures 2 and 3, annexes II and III (PDF)", url: RCPR_REPORT },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Puerto Rico (PDF)", url: IARC_FACTSHEET },
          ],
        },
        {
          id: "trends",
          title: "More cancers diagnosed since 2000, fewer cancer deaths",
          plain:
            "Between 2000 and 2022 the rate of new cancers rose a little in men and more in women, while the cancer death rate fell in both: by about 1.9% a year in men and 1.1% a year in women. Death rates from prostate, breast, colorectal and lung cancer all fell. The registry counts cervical cancer incidence as stable, but a study allowing for hysterectomy found more cervical cancers found late.",
          detail:
            "Age-adjusted to the US 2000 standard population, incidence in men went from 348.3 to 377.6 per 100,000 between 2000 and 2022 and in women from 252.9 to 314.5, average increases of 0.2% and 1.1% a year; mortality fell from 182.4 to 121.4 per 100,000 in men and from 106.4 to 82.7 in women. Prostate cancer deaths fell 3.4% a year and breast cancer deaths 1.3% a year. The report counts cervical cancer incidence and mortality as stable from 2000 to 2022. A registry study by Ortiz and colleagues, correcting for hysterectomy, found incidence going from 12.5 to 15.3 per 100,000 between 2001 and 2019, an average 1.6% a year that was not statistically significant, while cancers already spread at diagnosis rose 5.8% a year among women aged 25 to 64, a significant rise; the authors call improved prevention an urgent priority.",
          links: [
            { label: "Cancer in Puerto Rico, 2018-2022: trends 2000 to 2022, figure 9 (PDF)", url: RCPR_REPORT },
            ORTIZ_2024,
          ],
        },
      ],
      tables: [
        {
          id: "pr-registry",
          title: "What the Puerto Rico Central Cancer Registry counted, 2018 to 2022",
          caption: "New invasive cancers and cancer deaths over five years, with rates per 100,000 age-standardised to the world (Segi) population so they can be set beside IARC's.",
          columns: [
            { key: "site", label: "Cancer site" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "inc", label: "Incidence rate", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
            { key: "mort", label: "Death rate", numeric: true },
          ],
          rows: [
            { site: "All sites", cases: 80473, inc: 247.1, deaths: 26105, mort: 61.1 },
            { site: "Prostate", cases: 16409, inc: 99.8, deaths: 2320, mort: 8.7 },
            { site: "Breast (women)", cases: 12052, inc: 72.7, deaths: 2088, mort: 10.3 },
            { site: "Colon and rectum", cases: 8651, inc: 25.6, deaths: 3256, mort: 8.0 },
            { site: "Thyroid", cases: 3929, inc: 18.5, deaths: 101, mort: 0.2 },
            { site: "Uterus", cases: 3832, inc: 24.8, deaths: 693, mort: 3.5 },
            { site: "Lung and bronchus", cases: 3799, inc: 9.1, deaths: 2761, mort: 6.1 },
            { site: "Pancreas", cases: 2092, inc: 5.2, deaths: 1727, mort: 4.0 },
            { site: "Liver and intrahepatic bile duct", cases: 2026, inc: 5.2, deaths: 1770, mort: 4.3 },
            { site: "Cervix", cases: 1012, inc: 8.8, deaths: 236, mort: 1.7 },
          ],
          note: "From the report's annexes II and III. Cases are malignant tumours only, except bladder (not shown), which includes in situ tumours. Deaths come from death certificates supplied by Puerto Rico's Demographic Registry. Incidence for 2017 counts January to June only, because of Hurricane María. Rates for prostate are per 100,000 men and for breast, uterus and cervix per 100,000 women.",
          sources: [
            { label: "Torres-Cintrón et al., Cancer in Puerto Rico, 2018-2022 (Puerto Rico Central Cancer Registry, 2025, PDF)", url: RCPR_REPORT },
            { label: "The same report in Spanish (PDF)", url: RCPR_REPORT_ES },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a registry since the early 1950s, in the CDC's programme",
      aside: { label: "Registro Central de Cáncer de Puerto Rico (in Spanish)", url: RCPR },
      cards: [
        {
          id: "registry-rccpr",
          title: "A registry for the whole island, run by the university cancer centre, reporting more than 95% of cases",
          plain:
            "The Registro Central de Cáncer de Puerto Rico belongs to the Department of Health and has counted cancers among residents since the early 1950s. Since 2008 the University of Puerto Rico Comprehensive Cancer Center has run it. Hospitals and laboratories must report every case by law. The CDC's latest evaluation found it captured more than 95% of expected cancers, and the registry says it has done so every year since 2010.",
          detail:
            "The registry's own page dates it to Law 28 of 20 March 1951 and calls it one of the first registries in the Americas; its report says it was established in March 1950. Law 113 of 2010 replaced the 1951 law, made reporting by public and private institutions compulsory and formalised electronic reporting. The registry joined the CDC's National Program of Cancer Registries in October 1997, is funded in part by CDC grant NU58DP007164, and its data are included in the CDC's US Cancer Statistics; it has been above 95% complete each year since 2010. NCI's SEER programme, the other federal registry network, does not list Puerto Rico among its registries, so statistics drawn from SEER registries do not include the island. The report itself was published in 2025 and covers diagnoses to the end of 2022.",
          links: [
            { label: "RCCPR: about the registry (in Spanish)", url: RCPR_ABOUT },
            { label: "Cancer in Puerto Rico, 2018-2022: introduction and data completeness (PDF)", url: RCPR_REPORT },
            { label: "NCI SEER: list of SEER registries", url: SEER_LIST },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: Medicaid with a federal cap, a government health plan, and Medicare",
      aside: { label: "KFF: recent changes in Medicaid financing in Puerto Rico and other US territories (October 2024)", url: KFF_2024 },
      cards: [
        {
          id: "medicaid-cap",
          title: "Medicaid covers about half the island, but federal money is capped",
          plain:
            "In the states, the federal government pays its share of every Medicaid bill. In Puerto Rico it pays only up to a yearly ceiling set by Congress, and at a fixed rate: 76% of costs until September 2027, after which the law returns it to 55% unless Congress acts. In January 2021 about half of Puerto Ricans were enrolled in Medicaid or the children's programme.",
          detail:
            "The Department of Health's page says Medicaid began in Puerto Rico on 1 January 1966. MACPAC's February 2021 fact sheet counts 1,372,282 people in Medicaid and 91,092 in CHIP in January 2021, about 50% of the population, with eligibility up to 133% of a local Puerto Rico poverty level, about 43% of the federal poverty level, and notes the programme does not provide all mandatory Medicaid benefits, nursing facility services among them. Under section 1905(b) of the Social Security Act the territories' match rate is 55%; the Consolidated Appropriations Act 2023 set Puerto Rico's at 76% through 30 September 2027, the rate in HHS's notice for fiscal year 2026. KFF gives the capped federal allotments as 3.475 billion US dollars for fiscal year 2025, 3.645 billion for 2026 and 3.825 billion for 2027, recalculated afterwards from the much lower 2019 base unless the law changes.",
          links: [
            { label: "KFF: recent changes in Medicaid financing in Puerto Rico and other US territories (28 October 2024)", url: KFF_2024 },
            { label: "Federal Register: matching shares for fiscal year 2026 (29 November 2024)", url: FR_FMAP_2026 },
            { label: "MACPAC: Medicaid and CHIP in Puerto Rico (February 2021, PDF)", url: MACPAC_PR },
            { label: "Departamento de Salud: Programa Medicaid (in Spanish)", url: DS_MEDICAID },
          ],
        },
        {
          id: "plan-vital",
          title: "Plan Vital puts cancer in a special coverage tier, with no referral needed",
          plain:
            "Medicaid in Puerto Rico is delivered as Plan Vital, the government health plan, which the Administración de Seguros de Salud (ASES) buys from private insurers. It covers about 1.6 million people. Cancer is one of the conditions in its special coverage: once registered, a patient can see any provider in the plan's networks and get chemotherapy, radiotherapy, tests and medicines without a referral.",
          detail:
            "The plan dates from Law 72 of 1993, which created ASES and, in MACPAC's words, shifted much of the publicly financed health system to the private sector; Puerto Rico is the only territory whose Medicaid uses managed care. ASES's page lists beneficiary manuals for four insurers, First Medical, Menonita, MMM and Triple-S, and lists 26 special coverage conditions, set by attachment 7 of the insurer contract, including cancer and invasive skin cancers. The Triple-S manual (2022) says people in special coverage can get prescription drugs, tests and other services without a referral or their primary doctor's signature, and lists chemotherapy, radiology and related services. Basic coverage includes preventive mammograms, colonoscopies and annual Pap tests. Some members pay copays, shown on their card.",
          links: [
            { label: "ASES: Plan Vital, basic and special coverage (in Spanish)", url: ASES_VITAL },
            { label: "Triple-S Salud: Plan Vital beneficiary manual, special coverage (PDF, 2022)", url: VITAL_MANUAL },
            { label: "MACPAC: Medicaid and CHIP in Puerto Rico (February 2021, PDF)", url: MACPAC_PR },
          ],
        },
        {
          id: "insurance-matters",
          title: "Medicare, Medicare Platino, and why the type of insurance shows up in treatment",
          plain:
            "Medicare also operates in Puerto Rico, and nearly everyone eligible for both Medicare and full Medicaid joins Medicare Platino, a Medicare Advantage plan whose premiums and cost sharing the Puerto Rico government pays. Registry studies linked to insurance claims find that the kind of insurance a woman had was linked to whether she got standard breast cancer treatment.",
          detail:
            "MACPAC reports that Medicare Savings Programs, which help people with lower incomes pay Medicare costs in the states, are not available in Puerto Rico, and that Platino premiums and cost sharing are paid by the Puerto Rico government. In the registry's insurance-linked database, only 64% of women whose main treatment for stage I or II breast cancer in 2008 to 2012 was breast-conserving surgery had radiotherapy afterwards; women with Medicare (odds ratio 2.14) or both Medicare and Medicaid (1.61) were more likely to receive it than women with Medicaid alone. A 2026 study of women diagnosed in 2012 to 2016 found differences by insurance type in diagnostic delays and survival that were clearest in better-off neighbourhoods.",
          links: [
            { label: "MACPAC: Medicaid and CHIP in Puerto Rico, benefits for dually eligible beneficiaries (PDF)", url: MACPAC_PR },
            CHANCE_2018,
            GIERBOLINI_2026,
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the FDA, with a Puerto Rican register of medicines alongside",
      aside: { label: "21 U.S.C. 321: definitions in the Federal Food, Drug, and Cosmetic Act", url: USC_321 },
      cards: [
        {
          id: "fda",
          title: "FDA approval is what puts a cancer medicine on the market in Puerto Rico",
          plain:
            "Puerto Rico does not run its own approval of new medicines. The federal Food, Drug, and Cosmetic Act defines a State to include the Commonwealth of Puerto Rico, so the US Food and Drug Administration's approval decides which cancer medicines can be sold there, as in the 50 states. The approvals count on this page is the US count for that reason.",
          detail:
            "Section 201(a)(1) of the Act, 21 U.S.C. 321(a)(1), says the term State, except in one sentence of section 372(a), means any State or Territory of the United States, the District of Columbia, and the Commonwealth of Puerto Rico; Congress inserted the reference to Puerto Rico in 1962. An FDA approval, accelerated approval or label change therefore applies on the island as it does in the states. What a patient can actually get also depends on payers: Plan Vital has its own drug formulary, and Medicare plans and private insurers each decide what they cover. OnCo did not read an FDA page specific to Puerto Rico.",
          links: [
            { label: "21 U.S.C. 321: definitions (Legal Information Institute)", url: USC_321 },
            { label: "Triple-S Salud: Plan Vital beneficiary manual (PDF, 2022)", url: VITAL_MANUAL },
          ],
        },
        {
          id: "pr-register",
          title: "The Department of Health keeps its own register of medicines, starting with cancer medicines",
          plain:
            "On top of FDA approval, Puerto Rico's Department of Health keeps a register of the medicines distributed on the island. In August 2024 it told wholesale distributors based outside Puerto Rico that supply cancer medicines, vaccines or antibiotics to apply for a special authorisation, and it later extended the process to other medicines. The notices concern authorising distributors and registering products; nothing in them describes a second review of whether a medicine works.",
          detail:
            "The notices come from the Department's Secretaría Auxiliar para la Regulación de la Salud Pública (SARSP), which regulates, plans and oversees health facilities and health professionals, and its Section of Pharmacy Licensing, Medicines and Medicines Registration. A notice dated November 2024 records that on 19 August 2024 SARSP gave non-resident wholesale distributors of oncology medicines, vaccines and antibiotics 90 calendar days to apply for a Special Authorisation, and granted 120 more days from 19 November 2024 while registration continued for prescription and non-prescription medicines, veterinary medicines, homeopathic and natural products, supplements and devices, under the Department's Regulation No. 156. A further notice granted 90 days from 19 March 2025. Both notices are scanned images and were read by OCR.",
          links: [
            { label: "SARSP: notice to non-resident distributors on continuing medicines registration (November 2024, scanned PDF, in Spanish)", url: DS_NOTICE_2024 },
            { label: "SARSP: notice to non-resident distributors of medicines (March 2025, scanned PDF, Spanish and English)", url: DS_NOTICE_2025 },
            { label: "Departamento de Salud: Secretaría Auxiliar para la Regulación de la Salud Pública (in Spanish)", url: DS_SARSP },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "UPR Comprehensive Cancer Center: breast and cervical cancer early detection programme (in Spanish)", url: CCCUPR_SCREENING },
      cards: [
        {
          id: "screening-rates",
          title: "Breast screening as high as in the states, colorectal screening lower",
          plain:
            "In surveys from 2016 to 2020, 83.4% of women in Puerto Rico aged 50 to 74 were up to date with breast screening, more than the 78.3% across the states, and 83.0% of women aged 21 to 65 with cervical screening. Only 61.2% of adults aged 50 to 75 were up to date with colorectal screening, against 69.0% in the states. A CDC-funded programme offers free mammograms and Pap tests to women without insurance, but its page says enrolment for 2025 to 2026 is paused.",
          detail:
            "The figures come from the Behavioral Risk Factor Surveillance System for 2016, 2018 and 2020, analysed by Gopalani and colleagues; adults without health coverage reported low screening for all three cancers in every jurisdiction. The University of Puerto Rico Comprehensive Cancer Center hosts Puerto Rico's breast and cervical cancer prevention and early detection programme, which its page says the CDC sponsors: free mammograms, Pap and HPV tests and diagnostic procedures, with patient navigation, for women aged 21 to 64 who do not qualify for the government health plan, have no private insurance and meet income limits, and for women 65 or over without Medicare Part B. The page also says recruitment for fiscal year 2025 to 2026 has been halted until further notice, with a waiting list open. When the 2017 hurricanes and then the COVID-19 lockdown interrupted services, colorectal cancer diagnoses fell by 17.5% and 24.2%, and early-stage diagnoses had not recovered by 2021.",
          links: [
            GOPALANI_2023,
            { label: "UPR Comprehensive Cancer Center: Prevención y Detección Temprana de Cáncer de Mama y Cuello Uterino (in Spanish)", url: CCCUPR_SCREENING },
            SUAREZ_2025,
          ],
        },
        {
          id: "hpv",
          title: "The HPV vaccine has been required for school entry at ages 11 to 12 since August 2018",
          plain:
            "Puerto Rico's Secretary of Health can decide which vaccines children need to enrol in school, and since August 2018 the HPV vaccine has been one of them for children aged 11 to 12. Earlier laws gave girls, then boys, access to the vaccine. Early data from the island's immunisation registry showed 54% more vaccinations in that age group in 2019 than in 2017.",
          detail:
            "Colón-López and colleagues, writing with Department of Health staff, trace the policy to Law No. 25 of 1983, which lets the Secretary of Health set school vaccine requirements; Law No. 9 of 2010, which gave girls aged 11 to 18 access to the HPV vaccine; and its 2012 amendment adding boys. The Department announced the requirement in May 2018 for August 2018. Before it, the 2016 National Immunization Survey-Teen put HPV vaccine initiation at 80.8% in girls and 71.1% in boys. The authors call the 54.0% increase a preliminary analysis, and note that the requirement began 11 months after Hurricane María and that migration complicates rates calculated from the registry. WHO's immunisation data hold no HPV coverage rows for Puerto Rico.",
          links: [
            COLON_2021,
            { label: "Vázquez-Otero and Lockhart, adoption of the HPV vaccine school-entry requirement in Puerto Rico (Prev Med Rep 2022)", url: "https://doi.org/10.1016/j.pmedr.2022.102025" },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Puerto Rico does",
      title: "What Puerto Rico does differently",
      cards: [
        {
          id: "registry-claims",
          title: "Linking the cancer registry to insurance claims to see who gets treated",
          plain:
            "Puerto Rico's registry has linked its cancer cases to health insurance claims, building a database that shows not only who was diagnosed but what treatment they received and who paid. Researchers have used it to find gaps, such as women on Medicaid alone being less likely to have radiotherapy after breast-conserving surgery than women with Medicare.",
          detail:
            "The Puerto Rico Central Cancer Registry-Health Insurance Linkage Database joins registry records to claims from private insurance, Medicare and Medicaid. Published uses include the 2018 study of radiotherapy after breast-conserving surgery, which found 64% of eligible women treated and variation by region and insurance; the 2026 study of diagnostic delays over 60 days and six-year survival by insurance type and neighbourhood deprivation for women diagnosed in 2012 to 2016; and a 2025 study of opioid prescribing among breast cancer survivors listed among the registry's publications. The linkage can only see care that was billed to an insurer, so treatment paid for in other ways is missed.",
          links: [
            CHANCE_2018,
            GIERBOLINI_2026,
            { label: "Cancer in Puerto Rico, 2018-2022: scientific publications (PDF)", url: RCPR_REPORT },
          ],
        },
        {
          id: "hurricanes",
          title: "Measuring what Hurricanes Irma and María did to cancer care",
          plain:
            "Hurricanes Irma and María struck Puerto Rico in 2017, María on 20 September. About 1,800 fewer cancers were diagnosed that year than the year before, and the registry counted only January to June 2017 when calculating rates. Among people in treatment for breast or colorectal cancer, 59% had their treatment interrupted, more often outside San Juan.",
          detail:
            "The registry's report says the hurricane on 20 September 2017 caused a large fall in diagnoses and treatment, and that cases from July to December 2017 were excluded from rates because of delayed diagnoses and population displacement. In a telephone survey of 241 breast and colorectal cancer patients who were in treatment when the hurricanes struck, half of those whose treatment was interrupted were interrupted for more than 30 days, and disruption was 48% more common outside the San Juan metropolitan area, with the Arecibo, Bayamón, Caguas and Mayagüez regions highest. A registry analysis found colorectal cancer diagnoses fell 17.5% in the month of the hurricanes, and that late-stage diagnoses later exceeded expected numbers. The authors call for disaster plans that reach patients across the island.",
          links: [
            { label: "Cancer in Puerto Rico, 2018-2022: impact of year 2017 and COVID-19 (PDF)", url: RCPR_REPORT },
            MUNOZ_2024,
            SUAREZ_2025,
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research, trials and the NCI network",
      cards: [
        {
          id: "trials-research",
          title: "226 trials in OnCo's records have a site in Puerto Rico",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, 226 cancer trials list Puerto Rico among their countries; 91 were recruiting when last read and 90 were active but no longer recruiting. Their sponsors are mostly NCI and its cooperative groups and drug companies.",
          detail:
            "Of the 226 trials, 43 had completed and 2 had been terminated. The sponsors with most trials were the National Cancer Institute (27), AstraZeneca (16), the Children's Oncology Group (15), and Janssen, Pfizer and Merck Sharp & Dohme (14 each). Recruiting trials include NCI's ComboMATCH and myeloMATCH platforms, ASCO's TAPUR study, SWOG's SCARLET trial in triple-negative breast cancer and its CTAC trial of a website for colorectal cancer survivors, and AstraZeneca's eVOLVE-Cervical trial in locally advanced cervical cancer. The count covers the trials OnCo holds, not every study on the island; ClinicalTrials.gov's own search gives the full list.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Puerto Rico (search)", url: CTGOV },
            { label: "NCI NCORP: find a site (Puerto Rico NCORP)", url: NCORP_SITES },
          ],
        },
        {
          id: "nci-status",
          title: "No NCI-designated cancer centre, but a community research site linking 15 hospitals and practices",
          plain:
            "None of the cancer centres designated by the National Cancer Institute is in Puerto Rico; NCI's list, updated in June 2026, has none on the island. NCI does fund Puerto Rico NCORP, a community research site whose affiliates include the University of Puerto Rico Comprehensive Cancer Center and hospitals in San Juan, Bayamón, Arecibo and Ponce.",
          detail:
            "NCI's NCORP site list names Luis J. Santos Reyes as principal investigator of Puerto Rico NCORP and lists 15 affiliates, among them the University of Puerto Rico Comprehensive Cancer Center, HIMA San Pablo Oncologic Hospital, the I. González Martínez Oncologic Hospital, Instituto Oncología Moderna Ponce, San Juan City Hospital and University Pediatric Hospital. The University of Puerto Rico Comprehensive Cancer Center runs a hospital and radiotherapy centre and a research centre whose pages list the NCORP, the AIDS Malignancy Consortium, the ANCHOR study, a cancer control and population sciences division and the cancer registry. NCORP membership and NCI designation are separate: a centre can take part in NCI trials without being designated.",
          links: [
            { label: "NCI: find an NCI-designated cancer center (updated 10 June 2026)", url: NCI_CENTERS },
            { label: "NCI NCORP: find a site (Puerto Rico NCORP)", url: NCORP_SITES },
            { label: "Centro Comprensivo de Cáncer de la Universidad de Puerto Rico (in Spanish)", url: CCCUPR },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "spending",
      title: "No out-of-pocket spending figure and no current uninsured rate",
      plain:
        "OnCo found no figure for how much of Puerto Rico's health spending people pay out of their own pockets. The World Bank's series, built from WHO's Global Health Expenditure Database, has no values for Puerto Rico, and OnCo could not read a current uninsured rate from the US Census Bureau's survey without an access key.",
      detail:
        "The World Bank indicator SH.XPD.OOPC.CH.ZS returned 66 years with no values for Puerto Rico on 11 November 2026, and the series for current health expenditure as a share of GDP was empty too. The Census Bureau's American Community Survey publishes health insurance coverage for Puerto Rico, but its data service redirected requests without a key and the figure is not used here. Medicaid.gov's Puerto Rico pages answered HTTP 403, and no copy was held by the Internet Archive, so the latest Medicaid enrolment read is MACPAC's for January 2021; ASES's figure of 1.6 million Plan Vital members carries no date.",
      links: [
        { label: "World Bank: out-of-pocket expenditure, Puerto Rico (API)", url: WB_OOP },
        { label: "MACPAC: Medicaid and CHIP in Puerto Rico (February 2021, PDF)", url: MACPAC_PR },
      ],
    },
    {
      id: "radiotherapy-workforce",
      title: "Radiotherapy machines and cancer specialists are not counted here",
      plain:
        "OnCo found no authoritative public count of radiotherapy machines, radiotherapy centres or cancer specialists in Puerto Rico. The IAEA's Directory of Radiotherapy Centres serves its figures through an interactive application that a plain request could not read.",
      detail:
        "The registry and the papers read for this page describe the loss of health workers after 2017 only in general terms: Muñoz-Torres and colleagues write that the crises since 2017 led to the emigration of healthcare workers, without a count. The University of Puerto Rico Comprehensive Cancer Center lists a radiotherapy centre, and the NCORP list names oncology hospitals and practices, but neither is a census of capacity. A reader who needs to know where radiotherapy is available should ask the treating oncologist or the insurer's network directory.",
      links: [
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: DIRAC },
        MUNOZ_2024,
      ],
    },
    {
      id: "unread-sources",
      title: "Documents found but not read in full",
      plain:
        "Some sources behind this page could only be read in part. The Department of Health's Regulation No. 156, which governs the medicines register, was not read; Plan Vital's attachment 7, which sets the rules for registering cancer patients in special coverage, is a scanned image and only ASES's summary of it was used; and the CDC's own pages refused automated requests.",
      detail:
        "The two notices to medicine distributors are scanned images, read by OCR; the date line of the March 2025 notice is partly illegible, so the page gives only the date from which its 90 days run. The CDC's pages answered HTTP 403, including the breast and cervical cancer programme's page of locations, so the registry's own statements about its CDC funding and the cancer centre's programme page are used instead. No current HPV vaccination coverage figure for Puerto Rico was read: WHO's immunisation data have no Puerto Rico rows, and the most recent figures here are the 2016 survey and the 2019 registry analysis. Survival by stage is in the registry report's annex I and is not summarised here.",
      links: [
        { label: "SARSP: notice to non-resident distributors of medicines (March 2025, scanned PDF)", url: DS_NOTICE_2025 },
        { label: "ASES: Plan Vital, special coverage (in Spanish)", url: ASES_VITAL },
        { label: "Cancer in Puerto Rico, 2018-2022, annex I: relative survival (PDF)", url: RCPR_REPORT },
      ],
    },
  ],
  institutions: [
    "puerto-rico-department-of-health", "puerto-rico-central-cancer-registry", "ases-puerto-rico", "upr-comprehensive-cancer-center",
    "puerto-rico-ncorp", "fda-oce", "cms", "nci", "naaccr", "iarc",
  ],
  companies: [],
  drugs: [],
  trials: ["combomatch", "myelomatch", "tapur", "scarlet-s2212", "nct07018869", "nct06079671", "optimice-pcr", "nct06056830"],
  papers: [
    "paper-ortiz-cervical-cancer-trends-puerto-rico-bmc-med-2024", "paper-suarez-ramos-hurricanes-covid-colorectal-incidence-pr-cancer-2025",
    "paper-chance-radiotherapy-after-bcs-puerto-rico-jgo-2018", "paper-gierbolini-insurance-deprivation-breast-cancer-pr-healthcare-2026",
    "paper-colon-lopez-hpv-school-entry-puerto-rico-pcd-2021", "paper-munoz-torres-hurricane-treatment-disruption-pr-ijerph-2024",
    "paper-gopalani-screening-us-territories-canep-2023",
  ],
  people: ["karen-j-ortiz-ortiz", "luis-j-santos-reyes"],
  how:
    "Every card was written from Puerto Rican and US federal sources, read in full rather than through a summary: the Puerto Rico Central Cancer Registry's site and its report Cancer in Puerto Rico, 2018-2022; the Department of Health's Medicaid and regulation pages and two notices on the medicines register; ASES's Plan Vital page and an insurer's beneficiary manual; the federal Food, Drug, and Cosmetic Act's definitions; HHS's matching-rate notice for 2026, MACPAC's fact sheet and KFF's brief on territory Medicaid; the University of Puerto Rico Comprehensive Cancer Center's pages; NCI's lists of designated centres, SEER registries and NCORP sites; IARC's GLOBOCAN fact sheet; and the papers' abstracts. Spanish sources were read in Spanish. OnCo files Puerto Rico's own records under the country code PR, while the university cancer centre's older record uses US. Trial counts are from OnCo's own copy of ClinicalTrials.gov participation data.",
  verify:
    "Medicaid funding for Puerto Rico is set by Congress and changes at the end of September 2027 unless the law changes; check the current rules with ASES or the Department of Health before relying on them. What Plan Vital covers, and which medicines its formulary includes, are set by the insurer contract; ask the insurer or the treating oncologist. Registry figures run to 2022; IARC's 2024 death figure is a model and differs from the registry's count.",
  verifyLinks: [
    { label: "Registro Central de Cáncer de Puerto Rico", url: RCPR },
    { label: "Departamento de Salud de Puerto Rico", url: "https://www.salud.pr.gov/" },
    { label: "ASES: Plan Vital", url: ASES_VITAL },
    { label: "Cancer in Puerto Rico, 2018-2022 (PDF)", url: RCPR_REPORT },
  ],
};

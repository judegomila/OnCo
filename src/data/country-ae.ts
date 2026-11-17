import type { CountryDive } from "@/data/country-dive";

/**
 * United Arab Emirates deep dive: the hand-written cards for /countries/ae/ (wave 13). Every figure was read from the
 * raw text of its source on 16 November 2026, not from a summary of it: the UAE National Cancer Registry's annual
 * report for 2019 (Ministry of Health and Prevention, PDF text, read through the Internet Archive because
 * mohap.gov.ae did not answer a plain request); IARC's GLOBOCAN 2024 fact sheet; WHO's Cancer Country Profile 2020;
 * the World Bank's health spending series; WHO's HPV coverage rows from its immunisation data API; the IAEA DIRAC
 * country row; the Emirates Drug Establishment's home, services, legislation and news pages; the Thiqa programme's
 * pages and its IFHAS screening package sheet; Daman's Abu Dhabi Basic plan page; the Dubai Health Authority's ISAHD
 * pages and its BASMAH cancer programme guideline (PDF); two Abu Dhabi Media Office notices; and the full text of two
 * papers by Al-Shamsi and colleagues in Clinics and Practice (2022) and one editorial in Cureus (2025), read through
 * Europe PMC. The sites of the Ministry of Health and Prevention, the Department of Health Abu Dhabi, the Dubai Health
 * Authority and the u.ae portal could not be read; what that leaves out is named under `gaps`.
 */
const NCR_2019 = "https://web.archive.org/web/20240411162544/https://mohap.gov.ae/assets/download/bc820447/CANCER%20INCIDENCE%20IN%20UNITED%20ARAB%20EMIRATES%20ANNUAL%20REPORT%20OF%20THE%20UAE%20-%202019.pdf.aspx";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/784-united-arab-emirates-fact-sheet.pdf";
const WHO_PROFILE_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/are-2020.pdf";
const STATE_2022 = "https://doi.org/10.3390/clinpract12060101";
const NCCP_PROPOSAL = "https://doi.org/10.3390/clinpract12010016";
const ESRO_2025 = "https://doi.org/10.7759/cureus.80500";
const EDE_HOME = "https://www.ede.gov.ae/en/home";
const EDE_SERVICES = "https://www.ede.gov.ae/en/service-list";
const EDE_LAWS = "https://www.ede.gov.ae/en/legislations";
const EDE_AGENTS = "https://www.ede.gov.ae/w/emirates-drug-establishment-breaks-the-monopoly-of-medical-products-in-the-country";
const THIQA_ABOUT = "https://www.thiqa.ae/about-thiqa-programme/";
const THIQA_ELIGIBILITY = "https://www.thiqa.ae/eligibility/";
const THIQA_BENEFIT = "https://www.thiqa.ae/benefit/";
const THIQA_IFHAS = "https://www.thiqa.ae/about-ifhas/";
const IFHAS_PACKAGES = "https://www.thiqa.ae/wp-content/uploads/2023/11/IFHAS-packages-Arabic-English.pdf";
const ADMO_IFHAS = "https://www.mediaoffice.abudhabi/en/health/abu-dhabi-public-health-centre-expands-comprehensive-screening-programme-ifhas-to-advance-community-health-and-preventive-care/";
const ADMO_PRECISION = "https://www.mediaoffice.abudhabi/en/health/department-of-health-abu-dhabi-personalised-precision-medicine-programme-provides-tailored-care-to-250-cancer-patients/";
const DAMAN_BASIC = "https://www.damaninsurance.ae/products/abu-dhabi-government-health-plans/";
const ISAHD_FAQ = "https://www.isahd.ae/Home/FAQ";
const ISAHD_LAW = "https://www.isahd.ae/Home/LawAndRegulations";
const BASMAH = "https://www.isahd.ae/content/docs/PD%20PSP%20Program_Basmah%20Guidelines_24-11-2020.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'ARE'%20and%20startswith(ANTIGEN,'PRHPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=AE";
const WB_PC = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=AE";
const WB_GOV = "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=AE";
const DIRAC = "https://dirac.iaea.org/Query/Countries";
const CTGOV = "https://clinicaltrials.gov/search?country=United%20Arab%20Emirates&cond=cancer";

export const AE_DIVE: CountryDive = {
  iso2: "AE",
  iso3: "ARE",
  name: "the United Arab Emirates",
  flag: "🇦🇪",
  asOf: "2026-11-16",
  title: "Cancer in the United Arab Emirates",
  description:
    "Cancer in the United Arab Emirates from its own sources: a national registry that counted 4,381 malignant cancers in 2019, three in four of them in people who are not citizens; IARC's estimate of 8,815 cases and 3,814 deaths in 2024; insurance and screening rules that differ by emirate; a federal medicines regulator set up in 2023; and no adopted national cancer plan that OnCo could read.",
  lede:
    "The United Arab Emirates has a national cancer registry, a federal medicines regulator and health insurance that is arranged emirate by emirate, so what a person is covered for depends on the emirate they live in and on whether they are a citizen. In 2019, the latest year of registry figures OnCo could read, about three in four cancers were in people who are not citizens, and breast cancer is the commonest cancer by a wide margin.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for the United Arab Emirates is 8,815 new cancers and 3,814 deaths, an age-standardised incidence of 146.0 per 100,000 (142.5 in men, 164.4 in women) and mortality of 70.7 (75.9 in men, 67.5 in women). IARC's fact sheet names the national registry as its source for incidence, with national rates applied to the 2024 population. For deaths it has no national count: it applies modelled mortality-to-incidence ratios, built from registry survival data, to its incidence estimate, so the 3,814 deaths are a model's output and not a tally of death certificates. The latest registry report OnCo could read, for 2019, counted 4,381 malignant cancers and 1,181 cancer deaths, and gave an age-standardised incidence of 78.4 per 100,000. Those are well below IARC's 2024 figures, and none of the sources read here explains the difference; the registry's later reports could not be read.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in the United Arab Emirates",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, United Arab Emirates (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "Breast cancer is one in five of all cancers, and two in five among women",
          plain:
            "IARC estimates 8,815 new cancers and 3,814 cancer deaths in the United Arab Emirates in 2024. Breast cancer is the commonest, with 1,774 cases, followed by cancers of the bowel, thyroid, prostate and lung. Among men, bowel cancer is the commonest.",
          detail:
            "IARC's GLOBOCAN 2024 fact sheet gives 1,774 breast cancers (482 deaths), 1,005 colorectal cancers (444 deaths), 682 thyroid cancers (54 deaths), 595 prostate cancers (150 deaths), 449 lung cancers (378 deaths) and 423 leukaemias (263 deaths). Breast cancer is 20.1% of all cases and 39.1% of cases in women, followed in women by thyroid (535) and colorectal cancer (365); in men the order is colorectal (640), prostate (595) and lung (347). The fact sheet's population is 7,046,497 males and 3,980,643 females, and it counts 4,274 cancers in men and 4,541 in women. It puts the risk of developing cancer before age 75 at 17.3% and the number of people alive within five years of a diagnosis at 29,704. The registry's own 2019 report ranks breast, thyroid, colorectal, skin and leukaemia as the five commonest.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, United Arab Emirates (PDF)", url: IARC_FACTSHEET },
            { label: "UAE National Cancer Registry: annual report 2019 (PDF, Internet Archive copy of 11 April 2024)", url: NCR_2019 },
          ],
        },
        {
          id: "registry",
          title: "A national registry under the health ministry, fed by the Abu Dhabi and Dubai registries",
          plain:
            "The UAE National Cancer Registry sits in the Ministry of Health and Prevention and counts every cancer diagnosed or treated in the country, in citizens and non-citizens. Its report for 2019, the latest OnCo could read, recorded 4,381 malignant cancers and 252 in-situ cases.",
          detail:
            "The 2019 report, which calls itself the registry's sixth annual report, describes a population-based registry set up under the ministry by order of the UAE Cabinet, part of the National Diseases Registry within the ministry's Statistics and Research Center. A ministerial decree makes cancer a mandatory notifiable disease. Cases come from the Department of Health's central cancer registry for Abu Dhabi, the Dubai Health Authority's central registry, hospital records departments, pathology laboratories, death records and the ministry's medical treatment abroad department, and duplicates are removed by cross-checking Emirates ID number, name, age, sex, date of birth and address. For 2019 it reports 4,633 newly diagnosed cases, 2,604 in females and 2,029 in males, a crude incidence of 46.1 per 100,000 (75.8 in females, 31.0 in males) and an age-standardised rate of 78.4. In-situ cases are left out of the crude rates. It recorded 125 cancers in children under 15, leukaemia the commonest (44).",
          links: [{ label: "UAE National Cancer Registry: annual report 2019 (PDF, Internet Archive copy of 11 April 2024)", url: NCR_2019 }],
        },
        {
          id: "who-is-counted",
          title: "Three in four cancers registered in 2019 were in people who are not citizens",
          plain:
            "Of the 4,633 cancers the registry recorded in 2019, 3,440 were in non-citizens and 1,193 in UAE citizens. The report notes that the age group with the most cases was 40 to 44.",
          detail:
            "The registry's Table 1 for 2019 splits every cancer by nationality and sex: among malignant cases, 1,117 were in UAE citizens (674 female, 443 male) and 3,264 in non-citizens (1,751 female, 1,513 male). The report says its rates use the total resident population as estimated by the Federal Competitiveness and Statistics Center, citizens and non-citizens together. Its age chart text states that the 40 to 44 age group had the highest frequency of malignant cases. IARC's 2024 fact sheet counts 7.0 million males and 4.0 million females in the population. A 2022 review by an Abu Dhabi oncologist draws the consequence for policy: most cancer care spending is for non-citizens, while the screening programmes it lists were, with one exception, for citizens.",
          links: [
            { label: "UAE National Cancer Registry: annual report 2019, Table 1 (PDF, Internet Archive copy of 11 April 2024)", url: NCR_2019 },
            { label: "Al-Shamsi: The State of Cancer Care in the United Arab Emirates in 2022 (Clinics and Practice)", url: STATE_2022 },
          ],
        },
        {
          id: "deaths-counted",
          title: "Cancer deaths: 1,181 recorded in 2019, and IARC's larger figure is modelled",
          plain:
            "The registry's 2019 report counts 1,181 deaths from cancer, 13% of all deaths that year, which made cancer the third commonest cause of death. IARC's estimate for 2024 is 3,814, worked out from a model and not from death records.",
          detail:
            "The 2019 report gives 1,181 cancer deaths (629 in males, 552 in females) among 9,006 deaths of citizens and non-citizens, 13.11% of the total, after diseases of the circulatory system and injuries, and an age-standardised mortality rate of 33.3 per 100,000. Abu Dhabi's mortality data came from the Department of Health and the other emirates' from the ministry. Breast cancer accounted for 11.6% of cancer deaths, colon cancer 8.9% and lung cancer 8.8%, with 59.9% grouped as other malignant neoplasms. IARC's fact sheet lists its mortality source as Survcan and its method as national incidence estimates applied to model-based mortality-to-incidence ratios. WHO's Cancer Country Profile 2020 rated the quality of mortality registration for 2007 to 2016 as low and noted that its mortality estimates had a high degree of uncertainty because they were not based on national mortality data for non-communicable diseases.",
          links: [
            { label: "UAE National Cancer Registry: annual report 2019, chapter 4 (PDF, Internet Archive copy of 11 April 2024)", url: NCR_2019 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, data source and methods (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, United Arab Emirates (PDF)", url: WHO_PROFILE_2020 },
          ],
        },
      ],
      tables: [
        {
          id: "ae-registry",
          title: "The ten commonest cancers registered in the United Arab Emirates, 2019",
          caption: "Malignant cases diagnosed from 1 January to 31 December 2019, by site and nationality, from Tables 1 and 2 of the UAE National Cancer Registry's annual report.",
          columns: [
            { key: "site", label: "Cancer (ICD-10)" },
            { key: "all", label: "All cases", numeric: true },
            { key: "share", label: "% of malignant cases", numeric: true },
            { key: "citizens", label: "UAE citizens", numeric: true },
            { key: "others", label: "Non-citizens", numeric: true },
          ],
          rows: [
            { site: "All invasive cancers (C00 to C96)", all: 4381, share: 100, citizens: 1117, others: 3264 },
            { site: "Breast (C50)", all: 883, share: 20.2, citizens: 210, others: 673 },
            { site: "Thyroid (C73)", all: 501, share: 11.4, citizens: 145, others: 356 },
            { site: "Colorectal (C18 to C21)", all: 413, share: 9.4, citizens: 129, others: 284 },
            { site: "Skin (C44)", all: 278, share: 6.3, citizens: 19, others: 259 },
            { site: "Leukaemia (C91 to C95)", all: 220, share: 5.0, citizens: 52, others: 168 },
            { site: "Non-Hodgkin lymphoma (C82 to C85, C96)", all: 215, share: 4.9, citizens: 64, others: 151 },
            { site: "Prostate (C61)", all: 172, share: 3.9, citizens: 57, others: 115 },
            { site: "Bronchus and lung (C34)", all: 151, share: 3.4, citizens: 41, others: 110 },
            { site: "Lip, oral cavity and pharynx (C00 to C14)", all: 142, share: 3.2, citizens: 31, others: 111 },
            { site: "Uterus (C54 to C55)", all: 125, share: 2.9, citizens: 46, others: 79 },
          ],
          note: "Counts of new malignant cases, not deaths, and not the 252 in-situ cases the registry also records. This is the 2019 report, the latest OnCo could read. The report lists melanoma of the skin (C43, 51 cases) as a separate row from C44.",
          sources: [{ label: "UAE National Cancer Registry: annual report 2019 (PDF, Internet Archive copy of 11 April 2024)", url: NCR_2019 }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care: insurance rules set emirate by emirate",
      aside: { label: "World Bank: out-of-pocket expenditure, United Arab Emirates", url: WB_OOP },
      cards: [
        {
          id: "who-pays",
          title: "People pay about a tenth of health spending out of pocket",
          plain:
            "Out-of-pocket payments were 9.7% of health spending in the United Arab Emirates in 2023, down from 12.2% in 2019. Government paid about two thirds. These figures cover all health care, not cancer alone.",
          detail:
            "The World Bank's series, drawn from WHO's health expenditure database, puts out-of-pocket spending at 12.2% of current health expenditure in 2019 and 9.7% in 2023. Domestic general government health expenditure rose from 51.2% of current health expenditure in 2019 to 66.8% in 2023. Current health expenditure was US$2,402 per person in 2023, or 5.0% of gross domestic product. The series does not separate citizens from non-citizens, or one emirate from another, and no source read here gives cancer patients' own costs. The 2022 review reports that almost all payers did not cover tumour sequencing tests and that most insurance policies excluded genetic testing.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, United Arab Emirates", url: WB_OOP },
            { label: "World Bank: domestic general government health expenditure, % of current health expenditure", url: WB_GOV },
            { label: "World Bank: current health expenditure per person, current US$", url: WB_PC },
            { label: "Al-Shamsi: The State of Cancer Care in the United Arab Emirates in 2022, sections 19 and 20", url: STATE_2022 },
          ],
        },
        {
          id: "abu-dhabi-cover",
          title: "Abu Dhabi: Thiqa for citizens, a Basic plan for people on low incomes",
          plain:
            "In the Emirate of Abu Dhabi, the government's Thiqa programme covers UAE nationals from Abu Dhabi with no annual limit. The insurer Daman, which runs Thiqa, also sells a Basic plan for low-income expatriates and domestic workers that follows the Department of Health's rules.",
          detail:
            "Thiqa's site describes a programme offered by the Government of Abu Dhabi to UAE nationals and those of similar status in the emirate, managed by Daman since 2008, with more than one million members. A UAE national from Abu Dhabi has full cover in the public and private Thiqa network, emergency treatment worldwide and no annual benefit limit; a national from another emirate who does not live in Abu Dhabi is covered in the public Thiqa network; a non-national sponsored by a UAE national family member is covered in the public network. Listed benefits include inpatient care, medicines, and MRI, CT and PET scans when a specialist prescribes them. Daman describes its Basic (Abu Dhabi) plan as covering hospital stays, treatments and medicines within the emirate and emergencies elsewhere in the UAE, for lower income members as determined by the regulator, updated under Department of Health regulations from 1 July 2024. Neither site states what the Basic plan pays for cancer treatment.",
          links: [
            { label: "Thiqa: about the programme", url: THIQA_ABOUT },
            { label: "Thiqa: eligibility", url: THIQA_ELIGIBILITY },
            { label: "Thiqa: benefits", url: THIQA_BENEFIT },
            { label: "Daman: Abu Dhabi Basic health insurance plan", url: DAMAN_BASIC },
          ],
        },
        {
          id: "dubai-cover",
          title: "Dubai: employers must insure staff, and a cancer fund pays beyond the policy limit",
          plain:
            "In the Emirate of Dubai, a 2013 law makes health insurance compulsory and employers must pay the whole premium. For breast, bowel and cervical cancer, a programme called BASMAH, in its 2020 guideline, requires cover without copayment for the insured members it calls LSB, which OnCo takes to mean the low salary band, and keeps paying for them after the policy's yearly limit is reached. Other insured members can use the same centres at subsidised rates.",
          detail:
            "The Dubai Health Authority's insurance site says cover is mandatory under Dubai Health Insurance Law No. 11 of 2013, that employers must bear the full cost of premiums and may not deduct it from salaries, that the Essential Benefits Plan is the minimum level of cover, and that a Government Insurance Program is open to Dubai citizens not covered by another government scheme and to Dubai government employees and their eligible family members. The Dubai Health Insurance Corporation's BASMAH guideline, issued 24 November 2020, covers screening and treatment of cervical, breast and colorectal cancer for insured members holding a Dubai residence visa valid for at least a year. It says the mandate to cover cancer applies only to the members it calls LSB (the guideline does not spell this out; a circular title on the same site refers to Low Salary Band members): for them cancer cover runs up to the policy's annual limit with no sublimit or copayment, and treatment beyond that limit is paid from a fund that insurers finance. Members outside that group can use the centres at subsidised rates but do not get the cover beyond the annual limit. Treatment is at designated centres of excellence, and a person diagnosed before arriving becomes eligible after a year of residence. A 2022 circular title on the same site refers to extending those centres to private providers. Other cancers are not in the guideline.",
          links: [
            { label: "Dubai Health Authority (ISAHD): frequently asked questions on health insurance", url: ISAHD_FAQ },
            { label: "Dubai Health Insurance Corporation: Cancer Patient Support Program (BASMAH) guideline, 24 November 2020 (PDF)", url: BASMAH },
            { label: "Dubai Health Authority (ISAHD): laws, policy directives and circulars", url: ISAHD_LAW },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Approval and access: one federal regulator, many payers",
      aside: { label: "Emirates Drug Establishment", url: EDE_HOME },
      cards: [
        {
          id: "approval",
          title: "The Emirates Drug Establishment, set up in 2023, is the federal medicines regulator",
          plain:
            "The Emirates Drug Establishment, set up on 29 September 2023, describes itself as the only federal authority regulating medicines and medical devices in the United Arab Emirates. It issues the marketing authorisation for medicines, cancer medicines included.",
          detail:
            "The establishment's site says its services cover research and development, clinical and non-clinical trials, pharmaceutical testing, drug approval and registration, manufacturing, market authorisation, pharmacovigilance, control and inspection, and its service list includes issuing, renewing and amending the marketing authorisation of a drug or biopharmaceutical product. Its legislation page lists the Federal Decree-Law on its establishment (published 25 September 2023), a Federal Decree-Law governing medical products, pharmacists and pharmaceutical establishments (published 1 October 2024), and a 2025 resolution approving a National Essential Medicines List. A notice of 24 February 2026, in Arabic, says that under Federal Decree-Law No. 38 of 2024 companies must appoint more than one agent for each medical product, to keep supply steady. The 2022 review, written before the establishment existed, says approvals in the UAE often follow soon after approval in the United States.",
          links: [
            { label: "Emirates Drug Establishment: home page", url: EDE_HOME },
            { label: "Emirates Drug Establishment: service list", url: EDE_SERVICES },
            { label: "Emirates Drug Establishment: legislation", url: EDE_LAWS },
            { label: "Emirates Drug Establishment: more than one agent for each medical product (24 February 2026, in Arabic)", url: EDE_AGENTS },
          ],
        },
        {
          id: "reimbursement",
          title: "Approval is not coverage: each insurer and government programme decides what it pays for",
          plain:
            "OnCo found no single national list that says which cancer medicines are paid for in the United Arab Emirates. After the regulator approves a medicine, whether a patient gets it without paying depends on their insurer or government programme and on the emirate.",
          detail:
            "The sources read describe payers, not a national reimbursement decision: Thiqa lists pharmaceuticals as a benefit for Abu Dhabi's citizens, and Dubai's BASMAH guideline covers treatment for three cancers at designated centres, which submit the pre-authorisation request. A Dubai circular title from 2021 refers to an Essential Benefit Plan formulary, which OnCo did not read. The 2022 review reports that cancer medicines, including recently approved ones, are widely available; that when a manufacturer has not registered a medicine, obtaining it takes four to six weeks and costs more; that cover for medicines used against a mutation outside an approved use is hard to obtain from private insurers and easier, though not guaranteed, from publicly funded insurance; and that the use of biosimilars varies between doctors and centres. The Emirates Drug Establishment's National Essential Medicines List was approved in 2025; its contents were not read.",
          links: [
            { label: "Al-Shamsi: The State of Cancer Care in the United Arab Emirates in 2022, sections 20 and 22", url: STATE_2022 },
            { label: "Thiqa: benefits", url: THIQA_BENEFIT },
            { label: "Dubai Health Insurance Corporation: BASMAH guideline, 24 November 2020 (PDF)", url: BASMAH },
            { label: "Emirates Drug Establishment: legislation, including the National Essential Medicines List resolution", url: EDE_LAWS },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "Thiqa: about the IFHAS screening programme", url: THIQA_IFHAS },
      cards: [
        {
          id: "screening-by-emirate",
          title: "Screening is run emirate by emirate, mostly for citizens",
          plain:
            "There is no single screening programme for the whole country in the sources OnCo read. Abu Dhabi's IFHAS programme offers holders of the Thiqa card checks for breast, cervical, bowel and, for heavy smokers, lung cancer. Dubai's BASMAH programme, in its 2020 guideline, covers screening of insured residents at high risk of three cancers.",
          detail:
            "Thiqa's site says IFHAS is for Thiqa card holders aged 18 and above in the Emirate of Abu Dhabi, and its package sheet lists a cervical Pap smear every 3 to 5 years, mammography for women aged 40 and over, colonoscopy every 10 years, a yearly stool test (FIT), and low-dose CT for heavy smokers aged 55 to 75. The Abu Dhabi Media Office reported on 1 August 2025 that the Abu Dhabi Public Health Centre had added clinical breast examinations for women aged 20 to 39 and non-invasive colorectal cancer tests. Dubai's 2020 BASMAH guideline covers screening for breast, colorectal and cervical cancer in high-risk cases, with written pre-approval. The 2022 review lists a programme for the Northern Emirates, ITMENAN, started in November 2016, says no official data on screening uptake had been published, and cites unofficial estimates that no more than 25% of eligible people had breast or colorectal screening. WHO's 2020 profile recorded cervical screening in 2019 as opportunistic, by Pap smear, with participation under 10%.",
          links: [
            { label: "Thiqa: IFHAS screening packages by age group (PDF, Arabic and English)", url: IFHAS_PACKAGES },
            { label: "Thiqa: about the IFHAS programme", url: THIQA_IFHAS },
            { label: "Abu Dhabi Media Office: IFHAS screening programme expanded (1 August 2025)", url: ADMO_IFHAS },
            { label: "Dubai Health Insurance Corporation: BASMAH guideline, 24 November 2020 (PDF)", url: BASMAH },
            { label: "Al-Shamsi: The State of Cancer Care in the United Arab Emirates in 2022, section 5", url: STATE_2022 },
            { label: "WHO: Cancer Country Profile 2020, United Arab Emirates (PDF)", url: WHO_PROFILE_2020 },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccination reaches about a third of girls, and boys were first reported in 2025",
          plain:
            "WHO's figures put HPV vaccination at 37% of girls for a first dose and 34% for the last dose in 2025. That year the country reported boys for the first time: 30% had a first dose.",
          detail:
            "WHO's immunisation data give HPV programme coverage among females, first dose and last dose, as 38% and 30% in 2021, 37% and 31% in 2022, 37% and 35% in 2023, 51% and 46% in 2024, and 37% and 34% in 2025 (21,006 first doses against a target of 56,867 girls). For males the rows for 2021 to 2024 are empty; in 2025 coverage was 30% for the first dose and 26% for the last. The 2022 review says the Department of Health in Abu Dhabi introduced HPV vaccination for schoolgirls in 2008 and extended it in 2013 to all females aged 15 to 26 regardless of nationality, that the Dubai Health Authority recommended vaccinating girls at 11 to 12, and that no official uptake reports were available when it was written.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for the United Arab Emirates (data API)", url: WHO_HPV_API },
            { label: "Al-Shamsi: The State of Cancer Care in the United Arab Emirates in 2022, section 6", url: STATE_2022 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What the United Arab Emirates does differently",
      cards: [
        {
          id: "cancer-plan",
          title: "A national cancer control plan was proposed for 2022 to 2026; OnCo found no adopted one",
          plain:
            "OnCo could not find an adopted national cancer plan for the United Arab Emirates. Oncologists published a proposed plan for 2022 to 2026 and said it had not been officially adopted, and the health ministry's own pages could not be read to check what has happened since.",
          detail:
            "Al-Shamsi, Abyad and Rafii's proposal in Clinics and Practice (February 2022) describes a plan drawn up by a committee of oncology practitioners and policy makers and says it is still a work in progress and has not yet been officially adopted; its proposals include a legal obligation to notify cancer and covering screening through health insurance. Al-Shamsi's review later that year says that no national cancer control plan had been implemented. WHO's Cancer Country Profile 2020 lists a national cancer control plan as operational in 2019, which does not agree with the two papers. The Ministry of Health and Prevention's site did not answer on 16 November 2026, so no plan document, target or budget is quoted here.",
          links: [
            { label: "Al-Shamsi, Abyad and Rafii: A Proposal for a National Cancer Control Plan for the UAE, 2022 to 2026 (Clinics and Practice)", url: NCCP_PROPOSAL },
            { label: "Al-Shamsi: The State of Cancer Care in the United Arab Emirates in 2022, section 32", url: STATE_2022 },
            { label: "WHO: Cancer Country Profile 2020, United Arab Emirates (PDF)", url: WHO_PROFILE_2020 },
          ],
        },
        {
          id: "radiotherapy",
          title: "Ten radiotherapy centres and 20 megavoltage machines in the IAEA's directory",
          plain:
            "The IAEA's directory lists 10 radiotherapy centres in the United Arab Emirates with 20 megavoltage treatment machines. A 2022 review placed the centres in Abu Dhabi and Al Ain, Dubai and Ras Al-Khaimah.",
          detail:
            "The IAEA's DIRAC country row, last updated in 2025, gives 10 radiotherapy centres, 20 megavoltage photon and electron beam units, and 7 in a field named BrachyTherapyIncEl, which OnCo takes to be brachytherapy units without being certain of the definition. Set against IARC's 2024 population of 11.0 million, that is about 1.8 megavoltage units per million people, by OnCo's arithmetic. Al-Shamsi's 2022 review counted at least ten centres: four in Abu Dhabi and Al Ain, five in Dubai and one in Ras Al-Khaimah, which it called the only radiation centre in the Northern Emirates. It listed linear accelerators, two tomotherapy units, a CyberKnife and an MR-guided machine among them, said proton therapy was planned at one centre, and recommended an independent quality-control programme for radiation facilities. A 2025 editorial announcing the Emirates Society of Radiation Oncology says radiation oncologists have traditionally trained abroad because no comprehensive residency existed in the country.",
          links: [
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
            { label: "Al-Shamsi: The State of Cancer Care in the United Arab Emirates in 2022, section 10", url: STATE_2022 },
            { label: "Emirates Society of Radiation Oncology: advancing cancer care in the UAE (Cureus, 2025)", url: ESRO_2025 },
          ],
        },
        {
          id: "precision-programme",
          title: "Abu Dhabi tests cancer patients' inherited genes and offers prevention plans to their relatives",
          plain:
            "Since October 2022 the Department of Health in Abu Dhabi has run a precision medicine programme for cancer. By December 2024 it had given tailored treatment plans to 256 Emirati patients, tested for 47 genes, and written prevention plans for 207 of their relatives.",
          detail:
            "The Abu Dhabi Media Office's notice of 11 December 2024 says the Personalised Precision Medicine Programme for Oncology was launched by the Department of Health with Cleveland Clinic Abu Dhabi and G42 Healthcare in 2022. Eligible patients were screened for 47 genes, and prevention plans were written for 207 family members of patients who tested positive for inherited mutations linked to specific cancers. A further 200 people aged 25 to 50 were selected at random from the Emirati Genome Programme and tested for variants that raise the risk of breast, ovarian, colorectal and lung cancer. The notice describes the patients as Emirati, so the figures are for citizens in Abu Dhabi. It says the programme improved treatment but gives no outcome figures. The 2022 review said genetic counsellors were scarce and that tumour sequencing was sent abroad for testing at that time.",
          links: [
            { label: "Abu Dhabi Media Office: Personalised Precision Medicine Programme (11 December 2024)", url: ADMO_PRECISION },
            { label: "Al-Shamsi: The State of Cancer Care in the United Arab Emirates in 2022, sections 19 and 20", url: STATE_2022 },
          ],
        },
        {
          id: "treatment-abroad",
          title: "Government bodies pay for some citizens to be treated abroad, by rules that differ between them",
          plain:
            "Several government bodies in the United Arab Emirates sponsor citizens to have cancer treatment in other countries. A 2022 review found no shared criteria between them and no published figures on which cancers are sent abroad.",
          detail:
            "The registry's 2019 report collects cases from the ministry's medical treatment abroad department, which shows such patients are counted. Al-Shamsi's 2022 review names the sponsors as the three health authorities, the Presidential Affairs offices, the armed forces, the police and charities, says being a UAE citizen is an essential requirement with exceptions where a treatment is unavailable in the country, and cites an estimate of more than US$163 million spent in 2013 on what it calls government-funded cancer care, medical treatment abroad and medical tourism outside the country. It reports an internal review of 273 patients at one referral centre who asked to travel between January and September 2017, in which 86% of referrals were judged not clinically indicated because the service existed in the UAE; that was before bone marrow transplantation was available there. The author estimates that more than 95% of cancer cases can be treated in the country. These are one author's figures and are not official statistics.",
          links: [
            { label: "Al-Shamsi: The State of Cancer Care in the United Arab Emirates in 2022, section 31", url: STATE_2022 },
            { label: "UAE National Cancer Registry: annual report 2019, methods (PDF, Internet Archive copy of 11 April 2024)", url: NCR_2019 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in the United Arab Emirates", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "Ten trials in OnCo's records list a site in the United Arab Emirates",
          plain:
            "Ten trials in OnCo's records include the United Arab Emirates among their countries, and six were recruiting when the registry was last read. Seven are phase 3, and six are in breast or lung cancer. OnCo holds a selection of trials, not the whole registry.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: 10 trials list a site in the United Arab Emirates, 7 of them phase 3, 1 phase 2/3, 1 phase 2 and 1 phase 1/2. ClinicalTrials.gov lists 6 as recruiting and 4 as active and not recruiting. Four are in breast cancer (CAMBRIA-1 and CAMBRIA-2, heredERA, IZABRIGHT-Breast01 and a camizestrant study) and two in non-small-cell lung cancer; the others are in head and neck cancer, chronic myeloid leukaemia and cancers with RET changes, and one tests golcadomide with rituximab. Al-Shamsi's 2022 review found six clinical trials among 203 breast cancer publications from the country over twenty years, and said earlier attempts at large randomised trials had been held back by slow recruitment.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in the United Arab Emirates", url: CTGOV },
            { label: "CAMBRIA-1 (NCT05952557)", url: "https://clinicaltrials.gov/study/NCT05952557" },
            { label: "Al-Shamsi: The State of Cancer Care in the United Arab Emirates in 2022, section 26", url: STATE_2022 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-registry-years",
      title: "Registry reports after 2019 were not read",
      plain:
        "The latest registry report OnCo could read is for 2019. The Ministry of Health and Prevention's site, where later reports are published, did not answer, so this page has no registry counts for 2020 onwards and no survival or stage figures at all.",
      detail:
        "Requests to mohap.gov.ae timed out and www.mohap.gov.ae reset the connection on 16 November 2026. A web search result, which was not saved and could not be opened, pointed to a 2021 edition of the registry's annual report on that site; OnCo could not confirm it, and the 2019 report was read from the Internet Archive's capture of 11 April 2024. The 2019 report gives no stage at diagnosis and no survival. A journal article on incidence and mortality trends from 2011 to 2024 (doi 10.4103/gaoh.gaoh_13_26) appeared in a search but is not in Europe PMC and was not read. The gap between the registry's 2019 count and IARC's 2024 estimate is therefore left unexplained here.",
      links: [
        { label: "UAE National Cancer Registry: annual report 2019 (PDF, Internet Archive copy of 11 April 2024)", url: NCR_2019 },
        { label: "Ministry of Health and Prevention", url: "https://mohap.gov.ae/en" },
      ],
    },
    {
      id: "gap-government-sites",
      title: "Four government sites could not be read, so emirate rules come from insurers and notices",
      plain:
        "OnCo could not read the sites of the Department of Health Abu Dhabi, the Dubai Health Authority, the health ministry or the national government portal. The insurance and screening rules on this page come from the programmes' own insurer pages and one Dubai guideline from 2020, and may have changed.",
      detail:
        "On 16 November 2026 www.doh.gov.ae failed at the secure connection, www.dha.gov.ae returned a page that needs JavaScript, u.ae returned 404 for its health insurance and cancer pages, and www.ifhas.gov.ae redirected to a page that was not found. The Department of Health's 2025 cervical screening standard and older u.ae pages on health insurance and cancer have Internet Archive copies that were not read in this pass. Not read as a result: Abu Dhabi's health insurance law and the Basic plan's cancer benefits, Dubai's current Essential Benefits Plan table, any federal rule on health insurance in the five northern emirates, and screening ages for Dubai and the northern emirates. Dubai's BASMAH guideline carries a revision date of 25 November 2022 and may have been replaced: the same site lists a 2025 circular titled as an issuance of updated regulations superseding previous regulatory documents, which OnCo did not read.",
      links: [
        { label: "Department of Health Abu Dhabi", url: "https://www.doh.gov.ae/en" },
        { label: "Dubai Health Authority", url: "https://www.dha.gov.ae/en" },
        { label: "UAE Government portal", url: "https://u.ae/en" },
      ],
    },
    {
      id: "gap-other",
      title: "Also not found: news agency notices, a medicines list, and machine counts by type",
      plain:
        "Notices from the state news agency about a national lung screening guideline and an HPV plan could not be read, so neither is described here. OnCo also did not read which cancer medicines are on the national essential medicines list.",
      detail:
        "wam.ae pages returned a JavaScript shell with no article text, so reported items such as a national guideline for lung cancer screening and a roadmap on HPV-related disease are left out. The Emirates Drug Establishment's drug directory and its National Essential Medicines List were not read, so no medicine is named as approved or listed. The IAEA row gives totals only; its fields for linear accelerators, cobalt units and proton therapy are zero in the aggregated row and are not reported here as counts. No official figure was found for waiting times, for the number of oncologists, or for screening uptake in any emirate. The Sharjah charity Friends of Cancer Patients and the hospitals listed below were not re-read for this page.",
      links: [
        { label: "Emirates Drug Establishment: drug directory", url: "https://www.ede.gov.ae/en/drug-directory" },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
        { label: "Emirates News Agency (WAM)", url: "https://www.wam.ae/en" },
      ],
    },
  ],
  institutions: [
    "emirates-drug-establishment",
    "department-of-health-abu-dhabi",
    "abu-dhabi-public-health-centre",
    "thiqa-programme-abu-dhabi",
    "dubai-health-authority",
    "tawam-hospital",
    "sheikh-shakhbout-medical-city",
    "cleveland-clinic-abu-dhabi",
    "burjeel-medical-city",
    "friends-of-cancer-patients-uae",
  ],
  companies: [],
  drugs: [],
  trials: ["cambria", "izabright-breast01", "nct07647328", "nct05296798", "nct06422143", "nct05565378", "nct06256588", "nct06911502", "nct05456191", "nct05443126"],
  papers: [],
  people: [],
  how:
    "Every card was written from sources read as raw text on 16 November 2026: the UAE National Cancer Registry's 2019 report, IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 country profile and immunisation data, the World Bank, the IAEA's radiotherapy directory, the Emirates Drug Establishment's site, the Thiqa, Daman and Dubai Health Authority insurance pages, two Abu Dhabi Media Office notices and three journal articles read in full through Europe PMC. Statements about insurance and screening name the emirate they apply to. One notice from the regulator was read in Arabic.",
  verify:
    "Insurance rules, screening ages and programme names change and differ between emirates; check with your insurer or the health authority of the emirate you live in before relying on anything here. The registry figures are for 2019, and the 2022 review reflects one author's account of that year.",
  verifyLinks: [
    { label: "Emirates Drug Establishment", url: EDE_HOME },
    { label: "Thiqa programme (Abu Dhabi)", url: THIQA_ABOUT },
    { label: "Dubai Health Authority: health insurance (ISAHD)", url: ISAHD_FAQ },
    { label: "IARC: GLOBOCAN 2024 fact sheet, United Arab Emirates (PDF)", url: IARC_FACTSHEET },
  ],
};

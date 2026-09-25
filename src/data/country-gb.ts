/**
 * UNITED KINGDOM deep dive: the hand-written cards for /countries/gb/. Plain English first, detail second, every
 * card with its sources. Entity lists (institutions, companies, trials, papers, people) are pulled from the graph
 * on the page by id so they stay in step with the corpus.
 *
 * What this page is NOT. Eight cancers already have a full NHS pathway page (src/data/spikes/*-uk.ts, rendered at
 * /cancers/<id>/uk/): gallbladder, triple-negative breast, pancreatic, colorectal, lung, prostate, breast and
 * skin. Each carries the referral route, the specialist centres, the funding table by line of treatment, the
 * genomic tests, the open trials, the UK figures and a four-nations table for that one disease; /coverage/uk/
 * carries the patient-facing explainer of how NHS cancer care and drug funding work, product by product. This
 * page repeats none of it. It says what is true of the system, and links each cancer page as the worked example.
 *
 * Rules followed here: every figure carries its cohort, its year and the page it was read from; where two sources
 * disagree both are given with their cohorts rather than averaged; where a page could not be read the gap is
 * named in GB_GAPS rather than filled from memory. Several England figures are quoted at one remove because the
 * National Disease Registration Service answers HTTP 403 and NHS England's HTML answers HTTP 202 to a program.
 */
export type CountryCard = { id: string; title: string; plain: string; detail: string; links: Array<{ label: string; url: string }> };

export const GB_ASOF = "2026-09-25";

/** What is different about cancer in the United Kingdom, and how the country counts it. */
export const GB_PROFILE: CountryCard[] = [
  {
    id: "shape",
    title: "An ordinary rich country's cancer rate, and a worse than ordinary death rate",
    plain: "The United Kingdom does not get an unusual amount of cancer. It gets an unusual share of deaths from the cancer it gets. On the same GLOBOCAN estimates it has a lower incidence rate than the United States, Australia, Canada, Denmark, France or the Netherlands, and a death rate close to or above most of them. Its own government opens its cancer plan by saying so.",
    detail: "GLOBOCAN 2022 estimates 454,954 new cancers and 181,807 cancer deaths a year in the United Kingdom, an age-standardised incidence of 307.8 per 100,000 and an age-standardised mortality of 98.3, with a cumulative risk of a diagnosis before 75 of 29.7 percent. Set the mortality rate beside the incidence rate and the United Kingdom's ratio is about 0.32, against 0.22 for the United States, 0.19 for Australia, 0.26 for Canada and 0.28 for Sweden; the table below this section does that arithmetic country by country from one source. The National Cancer Plan for England, published on 4 February 2026, states it in words: \"Cancer mortality rates in the UK are much higher than in other, comparable countries, while survival is lower. Early diagnosis rates were flat for nearly a decade beginning in 2013 and have only recently started to increase.\" About 2.4 million people in England are living with or beyond a cancer diagnosis; Cancer Research UK counts 403,601 new cancer cases a year across the United Kingdom, averaging 2019 with 2021 and 2022.",
    links: [
      { label: "GLOBOCAN 2022: United Kingdom fact sheet (IARC)", url: "https://gco.iarc.who.int/media/globocan/factsheets/populations/826-united-kingdom-of-great-britain-and-northern-ireland-fact-sheet.pdf" },
      { label: "The National Cancer Plan for England (4 February 2026)", url: "https://www.gov.uk/government/publications/national-cancer-plan-for-england/the-national-cancer-plan-for-england-delivering-world-class-cancer-care-accessible-version" },
      { label: "Cancer Research UK: cancer incidence statistics", url: "https://www.cancerresearchuk.org/health-professional/cancer-statistics/incidence" },
    ],
  },
  {
    id: "counting",
    title: "How the United Kingdom counts cancer: national registration since 1971, without asking consent",
    plain: "England has had complete national cancer registration since 1971, and it is compulsory in the sense that it does not need the patient's consent: a specific regulation permits it. That is why England can say what proportion of its cancers were found after an emergency admission, and why a synthetic copy of the whole registry can be downloaded by anyone in the world. The other three nations run their own registries on their own timetables, so a UK-wide number is four numbers added together.",
    detail: "The national cancer registration dataset in England has had \"national coverage since 1971\" and receives about 25 million records a year for roughly 300,000 malignant tumours. Its legal basis is section 251 of the National Health Service Act 2006, implemented through regulation 2 of the Health Service (Control of Patient Information) Regulations 2002, a regulation whose heading is literally \"Medical purposes related to the diagnosis or treatment of neoplasia\": cancer is the one disease with its own consent exemption. The quality indicator that travels internationally is the death-certificate-only rate, which fell from more than 8 percent of cancers in the 1980s to under 1 percent of registrations by 2016; the Office for National Statistics estimated 2017 registrations at 98.5 percent complete. The service moved from Public Health England to NHS Digital on 1 October 2021 and is now part of NHS England. The Simulacrum, built by Health Data Insight with AstraZeneca and IQVIA, is a synthetic copy of it, version 2.1.0 covering diagnosis years 2016 to 2019 with tumour, systemic therapy, radiotherapy and gene-testing tables, free to download and analyse without a permission or a confidentiality risk. Scotland, Wales and Northern Ireland publish separately, and what each publishes differs, which the four-nations section sets out.",
    links: [
      { label: "Henson et al, Data Resource Profile: National Cancer Registration Dataset in England (Int J Epidemiol 2020)", url: "https://doi.org/10.1093/ije/dyz076" },
      { label: "Health Service (Control of Patient Information) Regulations 2002, regulation 2", url: "https://www.legislation.gov.uk/uksi/2002/1438/regulation/2/made" },
      { label: "Section 251, National Health Service Act 2006", url: "https://www.legislation.gov.uk/ukpga/2006/41/section/251" },
      { label: "The Simulacrum: a synthetic copy of the English cancer registry", url: "https://simulacrum.healthdatainsight.org.uk/" },
      { label: "ONS: Cancer Registration Statistics, England 2017 (completeness)", url: "https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/bulletins/cancerregistrationstatisticsengland/2017" },
    ],
  },
  {
    id: "causes",
    title: "What drives it: a long tobacco decline, a rising sun, and a gap between rich and poor",
    plain: "About a third of British cancers are preventable, and the country is living through the consequences of its own history. Smoking fell earlier here than almost anywhere, so lung cancer is now concentrated among the poorest. Skin cancer runs the other way: non-melanoma skin cancer rates are up 169 percent since the early 1990s. The clearest single fact in British cancer is not a cancer at all; it is deprivation.",
    detail: "The National Cancer Plan for England puts it at \"as many as a third of cancers are preventable\", with tobacco, diet, obesity, alcohol and ultraviolet exposure as the key risk factors, and names over-exposure to ultraviolet radiation as the third highest preventable cause after tobacco and overweight and obesity. The per-cancer pages on this site carry the shape: Cancer Research UK attributes 72 percent of UK lung cancer cases and 86 percent of lung cancer deaths to smoking, 86 percent of melanomas to ultraviolet overexposure, 54 percent of bowel cancers and 37 percent of pancreatic cancers to preventable causes. Lung cancer mortality is 102 percent higher in women and 93 percent higher in men in the most deprived fifth of the population than in the least, and the plan states that lung cancer alone accounts for almost a year of the nine-year life expectancy gap between richer and poorer parts of England. The gradient runs through diagnosis too: in the twelve months to September 2025, 56.0 percent of cancers in England's most deprived quintile were found at stage 1 or 2, against 62.2 percent in the least deprived, a gap that has narrowed from 8.2 percentage points before the pandemic to 6.2.",
    links: [
      { label: "The National Cancer Plan for England: prevention", url: "https://www.gov.uk/government/publications/national-cancer-plan-for-england/the-national-cancer-plan-for-england-delivering-world-class-cancer-care-accessible-version" },
      { label: "National Cancer Plan technical annex (the evidence base, 4 February 2026)", url: "https://assets.publishing.service.gov.uk/media/69830a12015e2ba11991bbf6/national-cancer-plan-technical-annex.pdf" },
      { label: "Cancer Research UK: lung cancer statistics", url: "https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/lung-cancer" },
      { label: "Cancer Research UK: sun, UV and cancer", url: "https://www.cancerresearchuk.org/about-cancer/causes-of-cancer/sun-uv-and-cancer" },
    ],
  },
];

/**
 * Four nations, one label. The eight pathway pages each carry a four-nations table for their own cancer; this
 * section is the generalisation those eight tables imply, with the per-cancer numbers left on the pages that own
 * them. Waiting-time and performance figures are quoted from the publications the pathway pages read.
 */
export const GB_NATIONS: CountryCard[] = [
  {
    id: "one-label",
    title: "The National Health Service is four health services, and one of them is not called the NHS",
    plain: "Health is devolved. England, Scotland, Wales and Northern Ireland each run their own health service, set their own targets, decide their own medicines and publish their own statistics. Northern Ireland's is not called the NHS at all: it is Health and Social Care, and its Department is under a statutory duty to run health care and social care as one integrated system. What the four still share is the money, the medicines licence and the screening committee.",
    detail: "Health was never reserved: the Scotland Act 1998 reserves medicines, poisons, embryology and xenotransplantation but not the health service itself, and the equivalent Welsh reservations now sit in Schedule 7A, in force since 1 April 2018. Health functions transferred to the National Assembly for Wales on 1 July 1999, to the Scottish Parliament on the same principal appointed day, and to Northern Ireland on devolution day, 2 December 1999. Northern Ireland's integration is not a habit but a statutory duty: section 2(1) of the Health and Social Care (Reform) Act (Northern Ireland) 2009 requires the Department to \"promote in Northern Ireland an integrated system of health care and social care\", delivered through five Health and Social Care trusts. What remains United Kingdom-wide is short: the Medicines and Healthcare products Regulatory Agency licenses a medicine for the whole country, the UK National Screening Committee advises all four governments and is accountable to their four chief medical officers, and general taxation pays for it under a Barnett formula whose Department of Health and Social Care comparability factor is 99.5 percent. Almost everything a patient meets is devolved. A sentence beginning \"in the UK\" is usually wrong about at least one nation, and the cards below say which.",
    links: [
      { label: "Scotland Act 1998, Schedule 5 Part II, Head J (what is reserved)", url: "https://www.legislation.gov.uk/ukpga/1998/46/schedule/5/part/II/crossheading/head-j-health-and-medicines" },
      { label: "Government of Wales Act 2006, Schedule 7A", url: "https://www.legislation.gov.uk/ukpga/2006/32/schedule/7A" },
      { label: "Health and Social Care (Reform) Act (Northern Ireland) 2009, section 2", url: "https://www.legislation.gov.uk/nia/2009/1/section/2" },
      { label: "UK National Screening Committee: accountable to the four chief medical officers", url: "https://www.gov.uk/government/organisations/uk-national-screening-committee/about" },
      { label: "HM Treasury: Statement of Funding Policy, June 2025 (the Barnett formula and comparability factors)", url: "https://assets.publishing.service.gov.uk/media/684859e3d0ca5d7801e4e6f6/Statement_of_Funding_Policy.pdf" },
    ],
  },
  {
    id: "clocks",
    title: "Four waiting-time standards that cannot be compared, because the clocks start in different places",
    plain: "Every nation promises to treat cancer quickly, and every nation measures the promise differently. England counts from the referral; Wales counts from the moment a clinician first suspects cancer, which lengthens the measured wait by design. The target for what looks like the same 62-day wait is 85 percent in England, 95 in Scotland, 95 in Northern Ireland and 75 in Wales. Ranking the four numbers is the commonest mistake made about NHS cancer care.",
    detail: "England has three standards: 28 days from an urgent suspected cancer referral, an urgent screening referral or a consultant upgrade to the day the patient is told (the Faster Diagnosis Standard, raised to 80 percent from the first quarter of 2026/27), 31 days from the decision to treat to the first treatment (96 percent), and 62 days from referral to first treatment (85 percent). In July 2026 it achieved 79.3, 92.5 and 71.2 percent, with 9,091 people treated outside 62 days in that month alone. Scotland has two standards, both set at 95 percent, 31 days from decision to treat and 62 days from an urgent suspicion of cancer referral; in the quarter to 31 March 2026 it achieved 94.5 and 72.2 percent, and the 62-day standard was met by no NHS board. Wales replaced separate standards with a Single Suspected Cancer Pathway measured from the point of suspicion, with a 75 percent target at 62 days; in July 2026 it achieved 60.1 percent, from 44.7 percent in Swansea Bay to 67.5 percent in Cwm Taf Morgannwg. Northern Ireland sets 98 percent at 31 days and 95 percent at 62 days, plus a 14-day target for urgent breast referrals to be seen; in the quarter to 31 March 2026 it achieved 87.3 percent, 29.6 percent and 7.9 percent. The 62-day figure was withheld at first and the whole series republished on 11 September 2026 after an error in the suspension logic of its new encompass patient administration system, which revised every quarter back to December 2024 downward by as much as 4.5 percentage points. Even within one nation the clock differs by cancer: England stops the 62-day clock for a man with lower-risk prostate cancer when active monitoring is agreed, counting that as a first treatment, and neither the Scottish nor the Welsh publication says whether it does the same.",
    links: [
      { label: "NHS England: cancer waiting times monthly combined data, April to July 2026 (provisional)", url: "https://www.england.nhs.uk/statistics/wp-content/uploads/sites/2/2026/09/2026-27-Apr-Jul-Monthly-Combined-CSV-Provisional.csv" },
      { label: "NHS England: changes to cancer waiting times standards from 1 October 2023", url: "https://www.england.nhs.uk/long-read/changes-to-cancer-waiting-times-standards-from-1-october-2023/" },
      { label: "Public Health Scotland: cancer waiting times, 1 January to 31 March 2026", url: "https://publichealthscotland.scot/publications/cancer-waiting-times/cancer-waiting-times-1-january-to-31-march-2026/" },
      { label: "Welsh Government: NHS activity and performance summary, July and August 2026", url: "https://www.gov.wales/nhs-activity-and-performance-summary-july-and-august-2026-html" },
      { label: "Department of Health (Northern Ireland): revised 62-day waits, published 11 September 2026", url: "https://www.health-ni.gov.uk/sites/default/files/2026-09/ni-cancer-waiting-times-2026-revised.pdf" },
    ],
  },
  {
    id: "what-counts",
    title: "They do not agree on which diseases count as cancer",
    plain: "Before comparing waiting times you have to know which diseases are counted, and the four nations do not agree. Scotland's cancer waiting-time standards cover melanoma and no other skin cancer at all, so a Scottish patient with a cutaneous squamous cell carcinoma, a cancer that kills, has no waiting-time standard protecting them. England and Northern Ireland count that cancer and exclude basal cell carcinoma. Wales publishes no split by tumour site, so the question cannot be answered from a Welsh page.",
    detail: "England's cancer waiting times monitoring dataset guidance applies the treatment standards to ICD-10 C00 to C97 excluding basal cell carcinoma of skin, and to D05. Section 5.10 puts C43 and C44 in scope, then names seven excluded conditions (basal cell carcinoma and its multicentric, morphoeic and fibroepithelial variants, basosquamous carcinoma, metatypical carcinoma and pilomatrix carcinoma) and puts lentigo maligna, Bowen's disease, intraepidermal carcinoma and keratoacanthoma out of scope as carcinoma in situ or benign; cutaneous squamous cell carcinoma and Merkel cell carcinoma are in. Public Health Scotland's inclusion criteria for the same standards read, for skin, \"melanoma, new primary invasive (i.e. Clark level greater than 1, melanoma of any site except eye); includes C43\": C44 does not appear on the list at all. Northern Ireland's ICD-10 mapping maps both C43 and C44 to a Skin Cancers tumour site and labels C44 explicitly as other malignant neoplasms of skin except basal cell carcinoma, which is England's rule. Wales reports one all-cancer pathway with no site split. This is not a technicality: it decides whether a real person's wait is counted at all, and it is invisible in every headline that compares the four nations.",
    links: [
      { label: "NHS England: national cancer waiting times monitoring dataset guidance (sections 3.2 and 5.10)", url: "https://www.england.nhs.uk/long-read/national-cancer-waiting-times-monitoring-dataset-guidance/" },
      { label: "Public Health Scotland: cancer waiting times inclusion criteria, quarter ending 31 March 2026", url: "https://publichealthscotland.scot/media/39235/2026-06-30-cwt-table-1-compliance-to-standard.xlsx" },
      { label: "Department of Health (Northern Ireland): cancer waiting times ICD-10 mapping", url: "https://www.health-ni.gov.uk/sites/default/files/2026-07/hs-niwts-cwt-icd10-q4-25-26.xlsx" },
    ],
  },
  {
    id: "publishing",
    title: "What each nation publishes, and therefore what a reader can find out",
    plain: "England publishes monthly by tumour type. Scotland publishes quarterly by tumour type and health board, with median and worst-case waits, which England does not. Wales publishes one monthly all-cancer number and no tumour split at all. Northern Ireland publishes the 31-day standard by tumour site and the 62-day standard without one. Which nation looks worse often depends on which nation published the number you are reading.",
    detail: "The asymmetry runs both ways. Scotland is the only nation that publishes a lung-specific waiting-time split, and the only one with a breast or prostate split at health board level; Public Health Scotland's open data gives incidence to 2024, mortality to 2024, survival to 2022 and staging with deprivation breakdowns in downloadable workbooks, which for lung cancer is the most complete public data of the four nations. Against that, Scotland publishes no gallbladder (C23) or extrahepatic bile duct (C24) site at all: its open data and Table 1 spreadsheets carry liver and intrahepatic bile ducts (C22) and pancreas (C25) only, so a Scottish gallbladder cancer figure does not exist in public. The Northern Ireland Cancer Registry assigns a stage to 94.7 percent of lung cancers, the best stage completeness of the four nations. England's National Disease Registration Service publishes the largest and deepest dataset of the four, including routes to diagnosis, and answers HTTP 403 to automated readers, which is why several England figures across this site are quoted from Cancer Research UK, which builds on the same registrations, or from the government's own cancer plan, rather than from the registry itself.",
    links: [
      { label: "NHS England: cancer waiting times statistics", url: "https://www.england.nhs.uk/statistics/statistical-work-areas/cancer-waiting-times/" },
      { label: "Public Health Scotland: cancer incidence in Scotland", url: "https://publichealthscotland.scot/publications/cancer-incidence-in-scotland/" },
      { label: "Welsh Cancer Intelligence and Surveillance Unit: cancer incidence in Wales", url: "https://phw.nhs.wales/reports/cancer-incidence-in-wales/" },
      { label: "Northern Ireland Cancer Registry, Queen's University Belfast", url: "https://www.qub.ac.uk/research-centres/nicr/" },
      { label: "NDRS: Cancer Registration Statistics, England 2023 (answers HTTP 403 to automated readers)", url: "https://digital.nhs.uk/data-and-information/publications/statistical/cancer-registration-statistics/england-2023" },
    ],
  },
  {
    id: "screening-ages",
    title: "Different screening ages for the same cancer",
    plain: "The UK National Screening Committee advises all four nations with one voice, and the four nations then do different things with the advice. Bowel screening starts at 50 in England, Scotland and Wales and at 60 in Northern Ireland. Cervical screening is now five-yearly for every age group in England, Wales and Scotland, and still three-yearly for women under 50 in Northern Ireland. Where you live changes when you are invited and how often.",
    detail: "Bowel screening: England, Scotland and Wales invite people aged 50 to 74 every two years with a faecal immunochemical test; Northern Ireland invites from 60 to 74 and is, on the Northern Ireland Assembly's own account, still considering lowering it. Scotland went further in the other direction on 12 July 2026, when its public health minister asked the UK National Screening Committee to review the recommended starting age, citing a 49 percent rise in colorectal cancer in people under 50 between 2013 and 2023, and said Scotland would pilot alone if the committee declined. Cervical screening: England moved to a five-year interval for the whole 25 to 64 range on 1 July 2025, having followed Wales, which did so on 1 January 2022, and Scotland; Northern Ireland still invites women aged 25 to 49 every three years and 50 to 64 every five. Breast screening: 50 to 70 in Scotland and Northern Ireland, 50 up to the 71st birthday in England, where the AgeX trial of an extra screen at 47 to 49 and at 71 to 73 remains a trial and not routine practice. Lung screening is being rolled out in England with a target of full national coverage by March 2030; the other nations are at different stages.",
    links: [
      { label: "UK National Screening Committee: recommendations for all four nations", url: "https://view-health-screening-recommendations.service.gov.uk/" },
      { label: "GOV.UK: bowel cancer screening programme overview (England)", url: "https://www.gov.uk/guidance/bowel-cancer-screening-programme-overview" },
      { label: "nidirect: bowel cancer screening (Northern Ireland, 60 to 74)", url: "https://www.nidirect.gov.uk/articles/bowel-cancer-screening" },
      { label: "GOV.UK: extended cervical screening interval clinical pathway protocol (1 July 2025)", url: "https://www.gov.uk/government/publications/extended-screening-interval-clinical-pathway-protocol" },
      { label: "nidirect: cervical screening (Northern Ireland, three-yearly under 50)", url: "https://www.nidirect.gov.uk/articles/cervical-screening" },
    ],
  },
];

/** Who pays, what is still charged for, and what happens when a patient buys a drug the NHS will not. */
export const GB_PAYING: CountryCard[] = [
  {
    id: "free-at-point-of-use",
    title: "Free at the point of use, except in limited circumstances sanctioned by Parliament",
    plain: "Cancer treatment in all four nations is paid for out of general taxation and costs the patient nothing at the point of use: no bill for surgery, radiotherapy, chemotherapy, scans, the hospital stay or the drugs given in hospital, whatever they cost. The NHS Constitution puts the exception in its second principle, and the exceptions are where a cancer diagnosis still costs a household money: prescriptions in England, dentistry, glasses, travel, parking, and the social care that is means-tested rather than free.",
    detail: "Principle 2 of the NHS Constitution reads: \"Access to NHS services is based on clinical need, not an individual's ability to pay. NHS services are free of charge, except in limited circumstances sanctioned by Parliament.\" The distinction that catches people out is between health care, which is free, and social care, which is means-tested: a person who needs help washing and dressing after treatment is in the social care system unless their needs are judged primarily health needs, when NHS Continuing Healthcare pays. Free hospital car parking for frequent outpatient attenders, including cancer patients, has been required in England since 1 January 2021 through the NHS Standard Contract, and has applied in non-private-finance hospitals in Scotland since 2008; Northern Ireland legislated to abolish charges in 2022 and has not commenced the Act, most recently postponing it to a date no later than 12 May 2029, so parking charges there remain lawful. Two routes to exemption from prescription, dental and optical charges have just been removed: the tax-credit route ended on 23 June 2025 as tax credits ended, and legacy Department for Work and Pensions benefits ceased to qualify from 1 April 2026, with a time-limited discretion under the Low Income Scheme expiring on 1 April 2027. The residency rule is worth stating plainly: the NHS is residency-based, so a UK national who moves abroad permanently loses entitlement to free NHS care, and an overseas visitor who is charged pays 150 percent of the national tariff.",
    links: [
      { label: "The NHS Constitution for England", url: "https://www.gov.uk/government/publications/the-nhs-constitution-for-england/the-nhs-constitution-for-england" },
      { label: "GOV.UK: how the NHS charges overseas visitors for hospital care", url: "https://www.gov.uk/government/publications/how-the-nhs-charges-overseas-visitors-for-nhs-hospital-care/how-the-nhs-charges-overseas-visitors-for-nhs-hospital-care" },
      { label: "Hospital Parking Charges Act (Northern Ireland) 2026 (commencement postponed again)", url: "https://www.legislation.gov.uk/nia/2026/4" },
      { label: "NHS: help with health costs", url: "https://www.nhs.uk/nhs-services/help-with-health-costs/" },
      { label: "Financial help, scheme by scheme", url: "/assistance/" },
    ],
  },
  {
    id: "prescriptions",
    title: "Prescription charges: England charges, the other three do not",
    plain: "Drugs given in hospital are free everywhere in the United Kingdom. Tablets collected from a pharmacy are free in Scotland, Wales and Northern Ireland and cost 9.90 pounds an item in England, unless you are exempt. Anyone in England being treated for cancer, for the effects of cancer or for the effects of cancer treatment can get a five-year medical exemption certificate that makes all their NHS prescriptions free, not only the cancer ones. That exemption is younger than most people assume: it dates from 2009.",
    detail: "The cancer exemption was created by the National Health Service (Charges for Drugs and Appliances) (Amendment) Regulations 2009, made on 13 January 2009 and applying to drugs supplied on or after 1 April 2009, covering a person \"undergoing treatment for cancer, the effects of cancer, or the effects of cancer treatment\" and claimed on form FP92A. The current English charge of 9.90 pounds an item was set by regulations in force on 1 May 2024 and has not been raised since; everyone aged 60 and over is exempt, which covers most people with the commonest cancers, and prepayment certificates cap the cost for those who are not. Scotland abolished the charge in 2011, Wales in 2007 and Northern Ireland in 2010, so in those three nations there is nothing to apply for; Wales issues a WP92A certificate and Scotland an EC92A for people who need a prescription dispensed in another nation. This is the clearest small example of the four-nations pattern: the same diagnosis, the same drug, four different answers to what it costs at the counter.",
    links: [
      { label: "NHS Charges for Drugs and Appliances (Amendment) Regulations 2009 (the cancer exemption)", url: "https://www.legislation.gov.uk/uksi/2009/29/made" },
      { label: "NHS Business Services Authority: medical exemption certificates", url: "https://www.nhsbsa.nhs.uk/help-nhs-prescription-costs/medical-exemption-certificates" },
      { label: "NHS: prescription charges (England)", url: "https://www.nhs.uk/nhs-services/prescriptions/nhs-prescription-charges/" },
      { label: "NHS inform: prescription charges and exemptions (Scotland)", url: "https://www.nhsinform.scot/care-support-and-rights/nhs-services/pharmacy/prescription-charges-and-exemptions/" },
      { label: "nidirect: help with health costs (Northern Ireland)", url: "https://www.nidirect.gov.uk/articles/help-health-costs" },
    ],
  },
  {
    id: "top-ups",
    title: "Paying privately for a drug the NHS will not fund, and keeping your NHS care",
    plain: "Until 2009 an NHS patient in England who bought a cancer drug privately could be told they had gone private and would have to pay for the rest of their care too. That rule is gone. Since 23 March 2009 the position is that buying additional private care removes no NHS entitlement; the private part has to be given separately, at a different time and in a different place, so that the NHS is not subsidising it.",
    detail: "The change followed Professor Mike Richards's review, published on 4 November 2008, which found \"a great deal of confusion about the rules in this area\" and that \"many patients were not clear whether they would still be entitled to NHS care if they purchased additional private drugs\". The Department of Health guidance that followed states at paragraph 4.1 that \"where a patient opts to pay for private care, their entitlement to NHS services remains and may not be withdrawn\", and its executive summary lists four rules: NHS organisations should not withdraw NHS care simply because a patient chooses to buy additional private care; any additional private care must be delivered separately; the NHS must never charge for NHS care and should never subsidise private care; and the NHS should continue to provide free of charge all care the patient would have been entitled to anyway. Paragraph 4.2 defines separation as a different time and a different place, which can be a private provider, a private wing, an amenity bed or a room temporarily designated for private care; paragraph 4.3 allows departure only for overriding patient safety reasons, not convenience. The guidance is England-only, came into force on 23 March 2009 and does not apply retrospectively.",
    links: [
      { label: "Department of Health: NHS patients who wish to pay for additional private care (23 March 2009)", url: "https://www.gov.uk/government/publications/nhs-patients-who-wish-to-pay-for-additional-private-care" },
      { label: "The guidance itself (PDF, 15 pages)", url: "https://assets.publishing.service.gov.uk/media/5a74ccb340f0b61df4778971/patients-add-priv-care.pdf" },
      { label: "Improving access to medicines for NHS patients: the Richards report (4 November 2008)", url: "https://assets.publishing.service.gov.uk/media/5a8194e3e5274a2e87dbe654/prof-richards-report.pdf" },
    ],
  },
];

/** The licence is UK-wide; the funding is not. The bodies, and the three different things a "no" can mean. */
export const GB_MEDICINES: CountryCard[] = [
  {
    id: "licence-versus-funding",
    title: "One licence, four decisions about paying for it, and a year between them",
    plain: "The Medicines and Healthcare products Regulatory Agency licenses a cancer drug for the whole United Kingdom. That says the drug may be sold, not that the NHS will buy it. Four bodies then decide that separately, and the gap between a licence and a funded prescription is measured in months: of the medicines licensed in Europe between 2020 and 2023, 65 percent had become available in England and 57 percent in Scotland, with a median wait after licensing of 310 and 303 days.",
    detail: "The MHRA has been the sole United Kingdom regulator since 1 January 2021. Its European reliance routes ended on 31 December 2023 and were replaced on 1 January 2024 by the International Recognition Procedure, a 60-day or 110-day route that relies on a prior approval by the regulators of Australia, Canada, the European Union, Japan, Switzerland, Singapore or the United States; the national route runs to 150 or 210 days. In 2025/26 the agency approved 921 medicinal products including 39 new medicines. Then the payers: NICE for England, whose recommendation carries a statutory funding requirement under regulation 7 of the 2013 NICE Constitution and Functions Regulations, which gives commissioners three months, or 30 days for products in the Early Access to Medicines Scheme or a fast-track appraisal. Scotland decides for itself through the Scottish Medicines Consortium, which sits inside Healthcare Improvement Scotland and has advised on more than 2,000 medicines since 2002; in 2024/25 it published 96 pieces of advice, accepting 66 percent. Wales adopts NICE and its All Wales Medicines Strategy Group appraises only what NICE has not, with the New Treatment Fund requiring health boards to fund a recommended medicine within 60 days. Northern Ireland's Department of Health reviews each NICE appraisal for legal, policy and financial consequences within four weeks of final publication, issues a service notification within fifteen weeks of endorsement and expects implementation within three months; where NICE has not looked at a treatment, Northern Ireland considers adopting the Scottish and then the Welsh decision, in that order. From 1 April 2026 the MHRA and NICE run an aligned pathway intended to bring some English decisions three to six months forward.",
    links: [
      { label: "MHRA: International Recognition Procedure", url: "https://www.gov.uk/government/publications/international-recognition-procedure/international-recognition-procedure" },
      { label: "Regulation 7, NICE (Constitution and Functions) Regulations 2013: the three-month funding requirement", url: "https://www.legislation.gov.uk/uksi/2013/259/regulation/7/made" },
      { label: "DHSC: Life Sciences Competitiveness Indicators 2026 (availability and time to availability)", url: "https://www.gov.uk/government/publications/life-sciences-competitiveness-indicators-2026/life-sciences-competitiveness-indicators-2026-summary" },
      { label: "DHSC: introducing new medicines in the NHS across the four nations", url: "https://www.gov.uk/government/publications/introducing-new-medicines-in-the-nhs-in-the-uk/introducing-new-medicines-in-the-nhs-in-the-uk-pathway" },
      { label: "Department of Health (Northern Ireland): HSC (SQSD) 12/22, the NICE endorsement process", url: "https://www.health-ni.gov.uk/sites/default/files/publications/health/doh-hsc-sqsd-12-22.pdf" },
    ],
  },
  {
    id: "three-kinds-of-no",
    title: "The three different things a \"no\" means, and why the difference matters",
    plain: "A cancer drug can be unavailable on the NHS for three quite different reasons, and they are routinely reported as one. A committee can look at the evidence and judge the price too high. A committee can never look at it, because the company submitted nothing. Or the drug can never have been put in front of a committee. Only the first is a judgement about the medicine. Of NICE's 666 recommendations on cancer drugs since 2000, 96 are refusals and 100 are appraisals that never happened.",
    detail: "NICE's own figures, read from its cancer appraisal data page: \"Since 2000, we have published: 596 technology appraisals on cancer drugs. These have resulted in: 666 individual recommendations\", of which \"83% of our recommendations on cancer drugs have been positive\". Then, under a heading reading \"Not included in the data\": \"Recommendations could not be made for 100 technology appraisals in the absence of a submission from the company (known as a non-submission).\" A hundred cancer appraisals that never happened are counted separately from the 666 that did, which is the distinction in a single sentence. A refusal is a decision: NICE TA580 refused enzalutamide for high-risk hormone-relapsed non-metastatic prostate cancer on 15 May 2019 because \"the estimates are not within the range that NICE usually considers a cost-effective use of NHS resources\". A termination is the absence of one: NICE's wording is \"NICE is unable to make a recommendation ... This is because the company did not provide an evidence submission\", and terminated appraisals sit at a different address, nice.org.uk/guidance/terminated/, which is how a machine can tell them apart. Process manual PMG36 adds a nuance worth knowing: at 5.6.9 NICE will consider terminating if no submission arrives, but at 5.6.12 it \"may also use the termination process to manage a company submission with a significantly high ICER\", and at 5.6.13 a termination can be restarted, so the individual guidance page is the only reliable evidence of which happened. Scotland does the opposite with the same facts: rather than terminate, the Scottish Medicines Consortium issues substantive negative advice anyway, printing \"Advice in the absence of a submission from the holder of the marketing authorisation: [medicine] is not recommended for use within NHSScotland\", and its April 2025 process document confirms this does not prevent a later submission, which would supersede the advice. The third case has no page at all, but for cancer in England the gap is largely closed: since the 2016 Cancer Drugs Fund reforms \"all new cancer drugs and significant new licensed indications for cancer drugs are now referred automatically to NICE for appraisal\". Where a medicine falls outside that, as sonidegib does for locally advanced basal cell carcinoma, there is no decision to find, and the NHS Constitution's answer is a different right: a right to expect a local decision made rationally on the evidence, rather than a right to the drug.",
    links: [
      { label: "NICE: technology appraisal data, cancer appraisal recommendations", url: "https://www.nice.org.uk/what-nice-does/our-guidance/about-technology-appraisal-guidance/technology-appraisal-data-cancer-appraisal-recommendations" },
      { label: "NICE PMG36, section 5.6: terminating an evaluation", url: "https://www.nice.org.uk/process/pmg36/chapter/5-developing-the-guidance" },
      { label: "NICE TA580: enzalutamide, not recommended after appraisal", url: "https://www.nice.org.uk/guidance/ta580" },
      { label: "NICE TA1141: a terminated appraisal, at the /terminated/ address", url: "https://www.nice.org.uk/guidance/ta1141" },
      { label: "SMC: process for issuing not recommended advice due to non-submission (April 2025)", url: "https://www.scottishmedicines.org.uk/media/9118/2025-04-25-process-for-issuing-nr-advice-due-to-non-sub-v10.docx" },
      { label: "Skin cancer in the NHS: funded, refused, terminated and never appraised, side by side", url: "/cancers/skin-cancer/uk/#funding" },
    ],
  },
  {
    id: "managed-access",
    title: "The Cancer Drugs Fund: England's way of saying \"not yet\" instead of \"no\"",
    plain: "England's distinctive invention is a fund that pays for a cancer drug while the evidence is still being collected. NICE recommends it for managed access, the NHS pays from the draft guidance onward, data come back from the national chemotherapy dataset and the continuing trial, and the drug is appraised again at the end. It exists because the first version of the fund, which simply paid for drugs NICE had refused, overspent by a third and could not show that it had helped anyone.",
    detail: "The original Cancer Drugs Fund ran from October 2010 with a lifetime budget of 1.27 billion pounds and supported over 74,000 patients to March 2015. The National Audit Office's investigation of 17 September 2015 found that 51 percent of the patients supported between April 2013 and March 2015 received drugs NICE had appraised and not recommended, that the fund overspent its allocated budget by 35 percent across those two years, and, most damningly, that \"due to a lack of data, it is not possible to evaluate the impact that the Fund has had on patient outcomes, such as survival\". NHS England's own account records a 2015/16 outturn of 466 million pounds against 340 million, a 37 percent overspend, and the board's decision on 26 February 2016 to rebuild it. The new fund began on 29 July 2016 with a fixed 340 million pound annual budget, an expenditure control mechanism that claws back overspend, and a third NICE outcome, \"recommended for use within the Cancer Drugs Fund\", available where NICE sees \"plausible potential\" but \"significant remaining clinical uncertainty\". A managed access agreement runs for at most five years, after which a full reappraisal decides whether the drug moves to routine commissioning. NICE has made 61 Cancer Drugs Fund recommendations since 2016; 14 cancer medicines are in managed access now. The sister Innovative Medicines Fund, launched in June 2022 with an identical 340 million pound budget, is for non-cancer medicines only, and is barely used by comparison: NICE has made three Innovative Medicines Fund recommendations in its history against 61 for cancer.",
    links: [
      { label: "National Audit Office: Investigation into the Cancer Drugs Fund (17 September 2015)", url: "https://www.nao.org.uk/reports/investigation-into-the-cancer-drugs-fund/" },
      { label: "NHS England: appraisal and funding of cancer drugs from July 2016", url: "https://www.england.nhs.uk/wp-content/uploads/2024/04/appraisal-and-funding-of-cancer-drugs-from-July-2016.pdf" },
      { label: "NICE: managed access", url: "https://www.nice.org.uk/what-nice-does/patient-access-schemes-and-pricing-agreements/managed-access" },
      { label: "NHS England: the Innovative Medicines Fund principles (non-cancer medicines)", url: "https://www.england.nhs.uk/wp-content/uploads/2022/06/B1686-the-innovate-medicines-fund-principles-june-2022.pdf" },
      { label: "National Cancer Drugs Fund list, version 1.408 (24 September 2026)", url: "https://www.england.nhs.uk/wp-content/uploads/2017/04/national-cancer-drugs-fund-list-v1.408.pdf" },
    ],
  },
  {
    id: "disagreement",
    title: "How often the nations actually disagree, and what a patient can do when the answer is no",
    plain: "The four nations agree far more than they differ. A study of every oncology appraisal published by NICE and the Scottish Medicines Consortium between 2017 and 2022 found 111 medicines appraised by both and disagreement on 14 of them, 12.6 percent: six that NICE refused and Scotland funded, eight that Scotland refused and NICE funded. Where the answer is no, each nation has a route for one patient at a time, and the tests are not the same.",
    detail: "Across the full study, 148 SMC and 161 NICE oncology appraisals published between 1 January 2017 and 31 December 2022, the two bodies recommended almost identically, 90.5 percent of SMC decisions positive against 89.4 percent of NICE's. The real difference was speed, and only for solid tumours: a median 291 days from marketing authorisation to guidance for the SMC against 257 for NICE overall, which did not reach significance, but 273 against 231.5 days for solid organ cancers, which did. The author attributes the gap in part to the Cancer Drugs Fund. On the individual route, England's individual funding request still turns on \"clinical exceptionality\", meaning a clinician must show the patient is in a different clinical condition from the typical patient with the same disease. Wales abolished that test after a 2017 review and its individual patient funding request panels now ask instead whether significant clinical benefit is expected for that patient and whether the cost is in balance with it. Scotland replaced individual patient treatment requests in February 2018 with the Peer Approved Clinical System, whose tier two guidance was announced with the striking instruction that \"a decision for non-routine access must not include cost-effectiveness as part of the consideration\", alongside a separate ultra-orphan pathway introduced in October 2018 for conditions affecting one person in 50,000 or fewer, which funds for up to three years while data are gathered. Northern Ireland runs individual funding requests through a regional scrutiny committee, and its endorsement circular is explicit that a patient already on a drug NICE later refuses \"should have the option of continuing their therapy until they and their clinicians consider it appropriate to stop\".",
    links: [
      { label: "Taylor, Appraisal of novel oncological therapies by the SMC and NICE, six years of data (Cureus 2023)", url: "https://doi.org/10.7759/cureus.50560" },
      { label: "NHS England: commissioning policy, individual funding requests", url: "https://www.england.nhs.uk/wp-content/uploads/2017/11/B2086-commissioning-policy-individual-funding-requests-v3.pdf" },
      { label: "AWTTC: individual patient funding requests in Wales", url: "https://awttc.nhs.wales/accessing-medicines/ipfr/" },
      { label: "Scottish Government: the Peer Approved Clinical System", url: "https://www.gov.scot/news/better-access-to-new-medicines/" },
      { label: "SMC: the ultra-orphan pathway", url: "https://scottishmedicines.org.uk/how-we-decide/ultra-orphan-medicines-for-extremely-rare-conditions/" },
    ],
  },
];

/** What the United Kingdom does that other countries do not. */
export const GB_DOING: CountryCard[] = [
  {
    id: "trials-that-ask-no",
    title: "The country that runs the trials asking whether a treatment is worth having at all",
    plain: "Most cancer trials ask whether a new thing beats the old thing, because a company is paying. British publicly funded trials keep asking a different question: is the treatment people already get worth its harm, its cost and its time? The answer has repeatedly been no, or less, and Britain has published it. That is why prostate radiotherapy went from 37 hospital visits to five, why breast radiotherapy went from 25 to five, and why a man with localised prostate cancer can be told, from a randomised trial, that monitoring is a reasonable choice.",
    detail: "ProtecT PSA-tested 82,429 men aged 50 to 69 across nine UK centres, randomised 1,643 between active monitoring, surgery and radiotherapy, and found no significant difference in prostate cancer death at ten years or at fifteen. CHHiP took 3,216 men at 71 centres from 37 fractions to 20 and PACE-B took a subgroup to five; START-B and FAST-Forward did the same for breast radiotherapy, from 25 fractions to 15 and then to five in a week. QUASAR randomised 3,239 people whose need for adjuvant chemotherapy was genuinely unclear and turned a default into a 3.6 percent absolute five-year survival gain a patient could weigh; SCOT then showed three months was enough where six had been standard. MRC CR07 cut three-year local recurrence in rectal cancer from 10.6 percent to 4.4 percent with a week of preoperative radiotherapy. MRC COIN showed cetuximab added nothing to oxaliplatin-based chemotherapy even in KRAS wild-type bowel cancer. SINS asked whether a cream could replace the knife for basal cell carcinoma and answered no; MoleMate tested a diagnostic gadget for GPs and stopped the NHS buying one. STAMPEDE, which ran one shared control arm against ten questions and recruited nearly 12,000 men between 2005 and 2023, won an inaugural NIHR Impact Prize in March 2025 with an estimated one million life years gained globally. The infrastructure is the National Institute for Health and Care Research, through which the Department of Health and Social Care invested 1.6 billion pounds in domestic research in 2024/25, the 50 UKCRC-registered clinical trials units, 29 Experimental Cancer Medicine Centres, and Cancer Research UK, which spent 416 million pounds on research in the year to 31 March 2026, supports more than 100 clinical trials open to more than 80,000 people, and describes itself as the world's largest non-commercial, non-governmental funder of cancer research.",
    links: [
      { label: "Cancer Research UK: annual report and accounts", url: "https://www.cancerresearchuk.org/about-us/our-organisation/annual-report-and-accounts" },
      { label: "DHSC annual report and accounts 2024 to 2025 (NIHR investment)", url: "https://www.gov.uk/government/publications/dhsc-annual-report-and-accounts-2024-to-2025" },
      { label: "UK Clinical Trials Unit Network: the 50 registered units", url: "https://ukctunetwork.org/our-members/" },
      { label: "Prostate cancer in the NHS: ProtecT, STAMPEDE, CHHiP and PACE-B in full", url: "/cancers/prostate/uk/#legacy" },
      { label: "Bowel cancer in the NHS: QUASAR, SCOT, CR07 and FOxTROT in full", url: "/cancers/colorectal/uk/#legacy" },
    ],
  },
  {
    id: "audits",
    title: "Ten national cancer audits that publish results trust by trust",
    plain: "Most countries do not publish how each of their hospitals performs on cancer. England and Wales do. Ten national cancer audits, brought together at the Royal College of Surgeons of England in October 2022 and commissioned through the Healthcare Quality Improvement Partnership, cover bowel, kidney, lung, primary breast, metastatic breast, non-Hodgkin lymphoma, oesophago-gastric, ovarian, pancreatic and prostate cancer, and put results on public dashboards at NHS trust and cancer alliance level in England and health board level in Wales.",
    detail: "The audits are why several figures on this site exist at all, and why some of them move. The bowel audit's 2025 report shows minimally invasive major colorectal cancer surgery rising from 66 percent in 2019 to 75 percent in 2023, adjusted 90-day mortality after major resection falling from 3.1 to 2.5 percent, and diagnosis at stage 1 or 2 rising from 39 to 42 percent. The lung audit's 2026 report shows the surgical resection rate in non-small-cell lung cancer rising from 18 percent in 2022 to 22 percent in 2024, stage 1 to 2 diagnosis from 32 to 40 percent, one-year survival from 45 to 51 percent and median survival from 281 to 372 days. The coverage is two nations, not four: Scotland and Northern Ireland are not in the audits and publish quality performance indicators and registry reports instead, and Welsh data quality is currently affected by a cancer informatics implementation, with quarterly Welsh data not expected until 2027. The audits are also candid about what they do not measure: the bowel audit publishes no time-to-treatment indicator, and the prostate audit publishes no active surveillance uptake figure and no patient-reported outcomes in its 2025 report. Note the granularity carefully: NATCAN reports at trust and alliance level and \"do not routinely report hospital-level results\".",
    links: [
      { label: "NATCAN, the National Cancer Audit Collaborating Centre", url: "https://www.natcan.org.uk/about/" },
      { label: "National Bowel Cancer Audit, State of the Nation 2025", url: "https://www.natcan.org.uk/wp-content/uploads/2025/10/NBOCA-State-of-the-Nation-Report-2025.pdf" },
      { label: "National Lung Cancer Audit, State of the Nation 2026", url: "https://www.natcan.org.uk/wp-content/uploads/2026/02/NLCA-State-of-the-Nation-Report-2026.pdf" },
      { label: "Lung cancer in the NHS: what the audit found", url: "/cancers/lung-cancer/uk/#data" },
    ],
  },
  {
    id: "genomics",
    title: "Genomics as a national service rather than a research project, with a tissue problem",
    plain: "Britain sequenced 100,000 genomes as a public project and then turned the result into a service. The NHS Genomic Medicine Service, which the government called the first national genomic healthcare service in the world when it launched on 2 October 2018, runs seven Genomic Laboratory Hubs against a single published test directory, so which test a patient is entitled to is a national list rather than a local decision. The honest part is the bottleneck: whole genome sequencing needs fresh-frozen tumour, and not every hospital can freeze one.",
    detail: "The 100,000 Genomes Project was announced on 10 December 2012 and reached its target in December 2018, with more than 85,000 participants; its cancer arm produced an integrated analysis of 13,880 solid tumours across 33 cancer types, published in Nature Medicine in January 2024, finding small variants in 94 percent of glioblastomas, actionable structural variants in 13 percent of sarcomas and homologous recombination deficiency in 40 percent of high-grade serous ovarian cancers. Genomics England's Cancer 2.0 programme is now testing long-read sequencing and multimodal data that joins genomics to pathology and radiology images. The service side is where the difficulty shows. A survey of 21 UK neuro-oncology centres covering about 84 percent of the population found the share requesting whole genome sequencing rising from 4 of 21 in 2021 to 15 of 21 in 2024, and 19 of 21 snap-freezing brain tumour samples in 2024, but at a mean of 173 samples per centre with a range from 0 to 650: one centre in ten could not freeze tumour at all. Turnaround worsened over the same period, from a mean 16 days to 21, and the share of centres meeting a 14-day target fell from 48 percent to 30. A West Midlands series of 146 gliomas sequenced as NHS standard of care found the median time from sampling to report falling from 255 days in early 2022 to 137 days by late 2023, with 17.8 percent producing a trial recommendation. What the four nations do not share is the directory: Scotland, Wales and Northern Ireland each run their own genomics service.",
    links: [
      { label: "GOV.UK: the NHS Genomic Medicine Service, announced 2 October 2018", url: "https://www.gov.uk/government/news/matt-hancock-announces-ambition-to-map-5-million-genomes" },
      { label: "Genomics England: the 100,000 Genomes Project", url: "https://www.genomicsengland.co.uk/initiatives/100000-genomes-project" },
      { label: "Sosinsky et al, insights for precision oncology from 13,880 tumours in the 100,000 Genomes Project (Nature Medicine 2024)", url: "https://doi.org/10.1038/s41591-023-02682-0" },
      { label: "NHS England: the National Genomic Test Directory", url: "https://www.england.nhs.uk/genomics/the-national-genomic-test-directory/" },
      { label: "GeNotes: genomic testing in the devolved nations", url: "https://www.genomicseducation.hee.nhs.uk/genotes/knowledge-hub/genomic-testing-in-the-devolved-nations/" },
    ],
  },
  {
    id: "screening-committee",
    title: "One committee for four nations, whose usual answer is no",
    plain: "Screening decisions in the United Kingdom are made differently from most countries: a single expert body established in 1996 reviews the evidence and advises all four governments, and it says no far more often than yes. That is why the UK screens for three cancers and not for prostate or ovarian cancer. The pay-off is visible in the one cancer the country is close to eliminating: among women in their early twenties in England between 2020 and 2024, the first fully vaccinated cohort, there were no cervical cancer deaths at all against 23.1 expected.",
    detail: "The committee's recommendations are published with the evidence behind them, so a reader can find out why a cancer is not screened for rather than only that it is not. Its prostate work is live: a twelve-week public consultation closed on 24 February 2026, and the modelling behind it found that around 40 to 50 percent of screen-detected cancers are slow growing and that at age 60 roughly half of screen-detected cases would be overdiagnosed, while the evidence on Black men was too thin to decide. TRANSFORM, designed with the committee's input, invites Black men from 45 against 50 for everyone else and carries a floor of at least one in ten invitations going to Black men. NHS-Galleri took the same approach to a commercial multi-cancer blood test: 142,250 people randomised in England from September 2021, with the primary endpoint of fewer stage III and IV diagnoses not met, full results at ASCO in mid-2026 and the test-performance paper in Nature Medicine on 22 September 2026. Britain is unusual in running a randomised trial of a screening product at that scale and publishing that it did not work. The HPV evidence runs the other way: Falcaro and colleagues showed in the Lancet in 2021 that girls offered the bivalent vaccine at 12 or 13 had 87 percent fewer cervical cancers and 97 percent fewer CIN3 lesions than the unvaccinated reference cohort, and the 2026 mortality follow-up found a 100 percent reduction in cervical cancer deaths in women aged 20 to 24 over 2020 to 2024. England's ambition is to eliminate cervical cancer by 2040.",
    links: [
      { label: "UK National Screening Committee: recommendations", url: "https://view-health-screening-recommendations.service.gov.uk/" },
      { label: "UK NSC: consultation on prostate cancer screening closes", url: "https://www.gov.uk/government/news/uk-nsc-consultation-on-prostate-cancer-screening-closes" },
      { label: "Falcaro et al, effect of the HPV vaccination programme on cervical cancer in England (Lancet 2021)", url: "https://doi.org/10.1016/S0140-6736(21)02178-4" },
      { label: "Cervical cancer mortality trends following HPV vaccination in England, 2001 to 2024 (Lancet 2026)", url: "https://doi.org/10.1016/S0140-6736(26)00918-9" },
      { label: "Bowel cancer in the NHS: the screening programme and the trials behind it", url: "/cancers/colorectal/uk/#legacy" },
    ],
  },
];

/** What the country does badly, with the figures. */
export const GB_FAILING: CountryCard[] = [
  {
    id: "survival",
    title: "Last of seven comparable countries on five cancers out of seven",
    plain: "The United Kingdom's cancer survival has been behind that of comparable rich countries for as long as anyone has measured it properly, and the comparison that proves it is one the country helps run. The International Cancer Benchmarking Partnership, set up in 2009 to deliver, in its own words, high quality comparative research on cancer survival, and now in its third phase to 2028, has its programme management team hosted by Cancer Research UK, and its own findings keep putting the United Kingdom at the wrong end. On its most recent published cohort the United Kingdom came last of seven countries for lung, pancreatic, colon, rectal and stomach cancer. The uncomfortable second fact is that British survival rose sharply over the same period. The gap, not the trend, is the finding.",
    detail: "SURVMARK-2 collected patient-level data on 3,764,543 cancers from population-based registries in 19 jurisdictions across Australia, Canada, Denmark, Ireland, New Zealand, Norway and the United Kingdom, for seven cancer sites diagnosed between 1995 and 2014, and concluded that \"for 2010 to 14, survival was generally higher in Australia, Canada, and Norway than in New Zealand, Denmark, Ireland, and the UK\". Its own data file gives the five-year age-standardised net survival for the 2010 to 2014 cohort: UK lung 14.8 percent against Canada's 21.7; pancreas 7.9 against Australia's 14.3; colon 59.0 against Australia's 70.8; rectum 62.1 against Australia's 70.8; stomach 20.8 against Australia's 32.8; oesophagus 16.2, sixth of seven; ovary 37.1, fifth. Over the same twenty years UK five-year survival roughly doubled in lung (7.2 to 14.8), pancreas (3.3 to 7.9) and oesophagus (8.6 to 16.2) and rose by more than fourteen points in rectal cancer. The government's own technical annex to the 2026 cancer plan reports England's CONCORD-3 position across 18 cancers as 15th of up to 28 European countries, ranging from 4th for childhood acute lymphoblastic leukaemia and 7th for melanoma to 21st for lung and 22nd for stomach. Both comparisons rest on cohorts ending in 2014; the annex notes that CONCORD-4, covering 2015 to 2019, was expected later in 2026 and should be checked before this page is relied on.",
    links: [
      { label: "Arnold et al, ICBP SURVMARK-2 (Lancet Oncology 2019)", url: "https://doi.org/10.1016/S1470-2045(19)30456-5" },
      { label: "ICBP SURVMARK-2 data explorer (IARC)", url: "https://gco.iarc.who.int/survival/survmark/" },
      { label: "National Cancer Plan technical annex, Table 1: England's CONCORD-3 ranks", url: "https://assets.publishing.service.gov.uk/media/69830a12015e2ba11991bbf6/national-cancer-plan-technical-annex.pdf" },
      { label: "Cancer Research UK: the International Cancer Benchmarking Partnership", url: "https://www.cancerresearchuk.org/health-professional/data-and-statistics/international-cancer-benchmarking-partnership-icbp" },
    ],
  },
  {
    id: "late",
    title: "Found late: about a fifth of cancers arrive through an emergency admission",
    plain: "The reason British survival lags is mostly that British cancer is found later. Around a fifth of cancers in England, Scotland and Northern Ireland are diagnosed after an emergency admission, and a person diagnosed that way is far more likely to be dead within a year. The NHS Long Term Plan set out to have three-quarters of cancers diagnosed at stage 1 or 2 by 2028; the figure has been stuck in the mid-fifties.",
    detail: "Cancer Research UK's 2025 overview puts early-stage diagnosis at around 55 percent of cancers in England and Northern Ireland, among those with a known stage, and notes that the current trajectory falls far short of the 75 percent ambition; the government's technical annex, working from the Rapid Cancer Registration Dataset rather than full registration, describes the same measure as broadly flat in the mid-fifties and recovering to around 60 percent by mid-2025. The two figures use different datasets with different lags and should not be averaged. On emergency presentation, Cancer Research UK reports 19 to 22 percent across Scotland, Northern Ireland and England, down from around 24 percent in England since 2006, and the technical annex describes it as still the route for a fifth of cancers in 2024. The International Cancer Benchmarking Partnership's own study of 857,068 patients across 14 jurisdictions and eight cancers found that emergency presenters had more than 1.9 times the odds of dying within twelve months in every one of the 112 jurisdiction-by-site strata examined, and that a 10 percent increase in a jurisdiction's emergency-presentation share was associated with a fall in one-year net survival of between 2.5 and 7.0 percentage points. The delay after diagnosis matters too: the largest systematic review of the question, led from Queen's University in Canada with British co-authors, pooled 1,272,681 patients across 17 indications and found that each four-week delay to treatment raised mortality by 6 to 8 percent for surgery and by 1 to 28 percent for systemic treatment.",
    links: [
      { label: "Cancer Research UK: Cancer in the UK, Overview 2025", url: "https://assets.ctfassets.net/u7vsjnoopqo5/1F8hk0zoIHA8MP4zwMkf2l/bfa8c15ed63bff7cf34e7e561d4fb48a/cancer_in_the_uk_overview_2025.pdf" },
      { label: "National Cancer Plan technical annex: stage at diagnosis and emergency presentation", url: "https://assets.publishing.service.gov.uk/media/69830a12015e2ba11991bbf6/national-cancer-plan-technical-annex.pdf" },
      { label: "McPhail et al, cancer diagnosed after an emergency admission across 14 jurisdictions (Lancet Oncology 2022)", url: "https://doi.org/10.1016/S1470-2045(22)00127-9" },
      { label: "Hanna et al, mortality due to cancer treatment delay (BMJ 2020)", url: "https://doi.org/10.1136/bmj.m4087" },
    ],
  },
  {
    id: "waiting",
    title: "A waiting-time standard England last met in December 2015",
    plain: "England's headline cancer target is that 85 percent of people should start treatment within 62 days of an urgent referral. It was last met nationally in December 2015, at 85.1 percent, and the deadline for meeting it again is March 2029. The government's chosen comparison in its own plan is Denmark, where almost all patients begin treatment within legally mandated timeframes.",
    detail: "The plan's wording is that \"since 2014, the NHS has consistently missed its central cancer performance target ... it has not met this target at a national level since late 2015\"; NHS England's own monthly time series puts the last compliant month at December 2015 on 85.1 percent, with January and February 2016 at 81.0. Performance is now rising slowly: the financial-year figures for the 28-day, 31-day and 62-day standards run 70.2, 91.4 and 64.8 percent in 2022/23; 72.8, 90.1 and 64.7 in 2023/24; 76.4, 91.1 and 68.5 in 2024/25; 76.3, 91.8 and 69.4 in 2025/26; and 78.3, 92.2 and 70.2 in 2026/27 to date. In the week ending 1 February 2026, 17,404 people in England had been waiting more than 62 days from an urgent referral, against 15,273 in the equivalent week before the pandemic. The plan also notes that cancer incidence is 15 percent higher than when the targets were last met, so restoring the standard is harder than restoring a number. The other three nations are not comparable and none is meeting its own standard either. Cancer Research UK's summary is the bluntest available: the 62-day standard has not been met since 2015 in England, since 2012 in Scotland, and never in Northern Ireland since it was introduced in 2008.",
    links: [
      { label: "The National Cancer Plan for England: performance", url: "https://www.gov.uk/government/publications/national-cancer-plan-for-england/the-national-cancer-plan-for-england-delivering-world-class-cancer-care-accessible-version" },
      { label: "NHS England: cancer waiting times national time series, October 2009 to July 2026", url: "https://www.england.nhs.uk/statistics/wp-content/uploads/sites/2/2026/09/CWT-CRS-National-Time-Series-Oct-2009-Jul-2026-with-Revisions.xlsx" },
      { label: "Cancer Research UK: Cancer in the UK, Overview 2025", url: "https://assets.ctfassets.net/u7vsjnoopqo5/1F8hk0zoIHA8MP4zwMkf2l/bfa8c15ed63bff7cf34e7e561d4fb48a/cancer_in_the_uk_overview_2025.pdf" },
    ],
  },
  {
    id: "workforce",
    title: "A 17 percent shortfall of cancer doctors and a 32 percent shortfall of radiologists",
    plain: "The constraint on British cancer care is not knowledge or drugs. It is people who can plan radiotherapy and people who can read a scan. The Royal College of Radiologists counts both every year and both are getting worse: a 17 percent shortfall of consultant clinical oncologists and a 32 percent shortfall of consultant clinical radiologists in 2025, forecast to reach 26 and 40 percent by 2030. For the first time, more than half of cancer centre heads of service report having seen patients' conditions worsen because staff shortages delayed treatment.",
    detail: "The 2025 clinical oncology census counts 1,138 whole time equivalent substantive consultant and specialist doctors in the NHS, of whom 1,049 are consultants, and puts the United Kingdom 234 whole time equivalents short. The shortfall was 8 percent in 2015 and 15 percent in 2024. It is worst where patients are poorest: small cancer centres average 26 percent against 13 at large ones, and centres in rural or more deprived areas 22 percent against 12 in urban or less deprived ones. By nation it is 17 percent in England, 17 in Wales, 18 in Scotland and 9 in Northern Ireland, with internal ranges that dwarf the national figures, from 11 percent in South Wales to 39 in North Wales and from 13 percent in South East Scotland to 21 in the north. Demand is outgrowing supply, radiotherapy activity at 4 percent and systemic therapy at 5.2 percent a year against workforce growth of 3.6 percent; one consultant in five is due to retire by 2030; and the share of centres reporting recruitment freezes more than doubled in a year, from 23 percent in 2024 to 51 percent in 2025. Radiology is worse in absolute terms: a 32 percent shortfall, 2,313 whole time equivalents, the largest recorded since at least 2019, ranging from 22 percent in London to 43 in the North East and from 16 percent in South East Scotland to 50 in the north of Scotland. The United Kingdom has 10.3 clinical radiologists per 100,000 people against an OECD average of 12.8 and a European Union average of 12.7, and only London exceeds the OECD figure. In 2025 the NHS spent 362 million pounds on outsourcing, insourcing and locum reporting, more than twice the 2021 figure and, by the college's arithmetic, enough to pay over 3,000 consultant radiologists; over a million diagnostic imaging studies in 2024/25 were not reported within the 28-day target.",
    links: [
      { label: "Royal College of Radiologists: clinical oncology workforce census 2025", url: "https://www.rcr.ac.uk/media/prbd5ofl/rcr-2025-clinical-oncology-workforce-census-report.pdf" },
      { label: "Royal College of Radiologists: clinical radiology workforce census 2025", url: "https://www.rcr.ac.uk/media/n1fjvrv4/rcr-2025-clinical-radiology-workforce-census-report.pdf" },
      { label: "RCR workforce censuses, all years and the four nation briefings", url: "https://www.rcr.ac.uk/news-policy/workforce-censuses/" },
    ],
  },
  {
    id: "money",
    title: "Roughly average spending, well below average equipment, and a falling share for cancer",
    plain: "The United Kingdom spends about as much on health as its peers when measured against the size of its economy, and less than them per person. What it does not have is machines and beds. On the like-for-like hospital basis it has 9.9 CT scanners per million people, the third lowest of 27 reporting countries, and 2.44 hospital beds per 1,000, seventh lowest of 39. Cancer takes 5.3 percent of British health spending against 6.6 percent across Europe.",
    detail: "OECD figures put United Kingdom health spending at 11.1 percent of GDP in 2024, eighth highest of 50 countries, and at 7,008 US dollars per person at purchasing power parity, sixteenth of 49 and below the western European average. The gap is in capital, not revenue: the King's Fund's 2023 comparison of 19 countries concluded that \"the UK lags behind other countries in its capital investment, and has substantially fewer key physical resources than many of its peers, including CT and MRI scanners and hospital beds\", and Lord Darzi's 2024 investigation put a number on it, that there would have been 27 billion pounds more capital investment in the 2010s had the UK matched the EU15, and 46 billion more had it matched the predominantly English-speaking countries. Darzi's own words on the consequence for cancer: \"Despite the first clinical use of MRI taking place in an NHS hospital, the health service has far fewer MRI and CT scanners than comparable countries. Moreover, many of the machines are old.\" The Swedish Institute for Health Economics estimates the direct costs of cancer at 5.3 percent of United Kingdom health expenditure in 2023, or 219 euros per person at purchasing power parity, against 6.6 percent and 260 euros across Europe, 7.7 percent in both Germany and France. Research money is going the same way: the UK Health Research Analysis puts cancer research funding at 469.3 million pounds in 2022, 68.5 percent of it from charities, but its share of total UK health research funding has fallen from 20.3 percent in 2004/05 to 16.8 percent, a real-terms fall of 54 million pounds since 2018. The body that used to publish that map, the National Cancer Research Institute, closed in June 2023 after 22 years, was removed from the charity register on 14 August 2026, and its website no longer resolves; no successor has been named, and the 2026 National Cancer Plan does not mention it.",
    links: [
      { label: "OECD Health Statistics (health expenditure, medical technology and hospital beds)", url: "https://data-explorer.oecd.org" },
      { label: "The King's Fund: how does the NHS compare to the health care systems of other countries? (2023)", url: "https://assets.kingsfund.org.uk/f/256914/x/7cdf5ad1de/how_nhs_compares_other_countries_abpi_2023.pdf" },
      { label: "Lord Darzi: independent investigation of the NHS in England (2024)", url: "https://www.gov.uk/government/publications/independent-investigation-of-the-nhs-in-england" },
      { label: "IHE: Comparator Report on Cancer in Europe 2025 (cancer as a share of health spending)", url: "https://ihe.se/app/uploads/2025/03/IHE-REPORT-2025_2_.pdf" },
      { label: "UK Health Research Analysis 2022 (cancer research funding and its falling share)", url: "https://hrcsonline.net/reports/analysis-reports/uk-health-research-analysis-2022/" },
    ],
  },
  {
    id: "trials-decline",
    title: "The slowest country in its comparison group at getting a trial started",
    plain: "The research strength described above is not safe. Commercial cancer trial activity fell sharply in the UK after 2017, and the one thing that has not recovered is speed. On the government's own indicator, the median time from a trial application to the first patient being dosed in the United Kingdom rose from 222 days in 2018 to 338 days in 2023, the slowest of all ten comparator countries. The next slowest was Switzerland at 300 days; Australia took 172.",
    detail: "Lord O'Shaughnessy's review of commercial clinical trials, published in February 2023, found the United Kingdom ranked fourth in the world for phase 1 trials initiated in 2021 but tenth for phase 3, with 394 trials initiated against 471 in Spain, over 1,110 in China and nearly 2,000 in the United States, and recorded that the number of participants in NIHR-supported commercial research had fallen from over 50,000 in 2017/18 to just over 28,000 in 2021/22, a drop of 44 percent. The government committed up to 121 million pounds over three years in response. Recruitment has partly recovered, from 2,907 UK patients in a 25-company commercial subset in 2020 to 8,865 in 2023, and the UK's share of that subset from 3.0 percent in 2020 to 2.7 percent in 2023, fifth of ten; but the set-up time went the other way in every single year. The 2026 National Cancer Plan responds with a Cancer Trials Accelerator Programme and a pledge to cut trial set-up from over 250 days to 150, and records the patient-facing consequence of the present state: the 2024 national Cancer Patient Experience Survey found that fewer than half of respondents were offered the chance to take part in a trial at all.",
    links: [
      { label: "Lord O'Shaughnessy review of commercial clinical trials in the UK (February 2023)", url: "https://www.gov.uk/government/publications/commercial-clinical-trials-in-the-uk-the-lord-oshaughnessy-review/commercial-clinical-trials-in-the-uk-the-lord-oshaughnessy-review-final-report" },
      { label: "DHSC: Life Sciences Competitiveness Indicators 2026 (trial set-up times)", url: "https://www.gov.uk/government/publications/life-sciences-competitiveness-indicators-2026" },
      { label: "The National Cancer Plan for England: the Cancer Trials Accelerator Programme", url: "https://www.gov.uk/government/publications/national-cancer-plan-for-england/the-national-cancer-plan-for-england-delivering-world-class-cancer-care-accessible-version" },
    ],
  },
];

/** Named gaps: what could not be sourced on the check date, so a missing figure is not read as a zero. */
export const GB_GAPS: string[] = [
  "The National Disease Registration Service is unreachable to an automated reader: every digital.nhs.uk address answered HTTP 403 with a Cloudflare challenge, to plain curl, a browser user agent and a Googlebot user agent. The England stage-at-diagnosis and routes-to-diagnosis figures on this page are therefore quoted from Cancer Research UK, which builds on the same registrations, or from the government's own cancer plan and its technical annex.",
  "Two current figures for the proportion of English cancers diagnosed at stage 1 or 2 disagree and both are given: Cancer Research UK says around 55 percent (Cancer in the UK, Overview 2025, cancers with known stage); the National Cancer Plan technical annex says around 60 percent by mid-2025 on the Rapid Cancer Registration Dataset. Different datasets with different lags; they are not averaged here.",
  "Every HTML page on england.nhs.uk answers HTTP 202 with an empty web application firewall challenge body. The documents those pages link to under wp-content/uploads and the site's own content API do resolve, and that is where the NHS England figures here were read.",
  "The survival comparisons rest on cohorts that end in 2014. SURVMARK-2's most recent cohort is 2010 to 2014 and CONCORD-3's is the same; the government's technical annex of February 2026 states that CONCORD-4, covering 2015 to 2019, was expected later in 2026. If it has landed it supersedes both, and the UK's own strongly upward trend over the same window should be read alongside them.",
  "Per-jurisdiction emergency-presentation percentages for the four UK nations could not be extracted from the ICBP study; only the cross-jurisdiction range is quoted. The study also used two different definitions across jurisdictions, so within-UK comparisons from it would need careful framing.",
  "The 2009 guidance on paying for additional private care is England-only and does not apply retrospectively. No equivalent Scottish, Welsh or Northern Irish policy was located, so this page does not say what the rule is in the other three nations.",
  "No count of Scottish Medicines Consortium non-submissions could be sourced: the SMC's advice database has no submission-type filter and the SMC publishes no annual report of its own. NICE's equivalent counts (100 cancer, 177 across all appraisals) are published and are quoted instead.",
  "Scotland's Peer Approved Clinical System is documented only by government news releases from 2016 and 2017. No current operational PACS guidance could be found on gov.scot, nhsinform.scot, NHS National Services Scotland, Public Health Scotland or six named health boards, so the description here may be out of date.",
  "The Scottish Medicines Consortium's only published statement of how its end-of-life and orphan modifiers affect willingness to pay, including the statement that it has no formal cost-per-QALY threshold, is a document dated June 2012, which is why no Scottish threshold figure is quoted on this page.",
  "What replaced the National Cancer Research Institute could not be established. Its closure letter of 26 June 2023 names no successor, the 2026 National Cancer Plan and its technical annex do not mention it, and ncri.org.uk no longer resolves: the domain fails its TLS handshake and the last archive capture returns an empty body. The 469.3 million pound figure for UK cancer research funding in 2022 comes from the UK Health Research Analysis instead. The older corpus figure that lung cancer received 6 percent of UK cancer research funding while causing 26 percent of cancer deaths rests on 2010 data published in 2015 and has no current equivalent.",
  "The Northern Ireland Cancer Registry's own pages at qub.ac.uk answer HTTP 403 to every request, with a browser header set and without, so no Northern Ireland figure on this page is read from the registry itself. The Department of Health's waiting-time workbooks do open and are the readable substitute.",
  "Every comparison here described as an average of countries is the arithmetic mean of the country rows in the source file, computed here, not a figure the OECD or the IHE publishes. Scanner counts are on the hospital-provider basis, because the United Kingdom does not report scanners outside hospitals and comparisons on an all-provider basis flatter countries that do.",
  "No cancer-specific NIHR recruitment figure exists on a public page: the recruitment dataset breaks down by study type, not by disease area. The NIHR's own site answers an AWS firewall challenge to automated readers.",
];

/**
 * Entity ids to render from the graph, in display order. Missing ids are skipped at render time. These are records
 * that already exist elsewhere in the corpus; the page pulls them live so a new UK trial, company or person added
 * anywhere in OnCo appears here once listed.
 */
export const GB_INSTITUTIONS = [
  "cruk", "nice", "smc", "mhra", "wellcome", "wellcome-sanger", "francis-crick", "icr-london", "embl-ebi",
  "royal-marsden", "the-christie", "uclh", "oxford-cancer", "cruk-cambridge-centre", "addenbrookes-cambridge",
  "barts-cancer-institute", "imperial-cancer-centre", "birmingham-cancer-centre", "leeds-cancer-centre",
  "newcastle-cancer-centre", "southampton-cancer", "clatterbridge", "weston-park-sheffield", "guys-st-thomas",
  "royal-free-hospital", "great-ormond-street", "nottingham-cancer-centre", "leicester-cancer-research-centre",
  "cruk-manchester-institute", "cruk-city-of-london-centre", "cruk-convergence-science-centre",
  "beatson-glasgow", "edinburgh-cancer-centre", "wolfson-wohl-cancer-research-centre", "ninewells-dundee",
  "velindre-cardiff", "university-hospital-wales-cardiff", "northern-ireland-cancer-centre",
  "cancer-grand-challenges", "macmillan-cancer-support", "marie-curie-uk", "breast-cancer-now",
  "prostate-cancer-uk", "pancreatic-cancer-uk", "bowel-cancer-uk", "roy-castle-lung-cancer-foundation",
  "melanoma-focus", "teenage-cancer-trust", "ammf", "worldwide-cancer-research",
];

export const GB_COMPANIES = [
  "astrazeneca", "gsk", "immunocore", "adaptimmune", "autolus", "bicycle-therapeutics", "artios-pharma",
  "oxford-biomedica", "oxford-nanopore", "exscientia", "isomorphic-labs", "google-deepmind", "cmr-surgical",
  "owlstone-medical", "cyted-health", "optellum", "kheiron-medical-technologies", "inivata", "microbiotica",
  "myricx-bio", "pheon-therapeutics", "iksuda-therapeutics", "theolytics", "scancell", "amphista-therapeutics",
  "paxman", "vision-rt", "lightpoint-medical", "blue-earth-diagnostics", "hikma", "sterling-pharma-solutions",
  "abzena", "cancer-research-horizons", "syncona", "sv-health-investors", "medicxi", "sr-one", "mrc-ctu",
];

export const GB_TRIALS = [
  "protect", "promis", "stampede", "chhip", "pace-b", "radicals-rt", "radicals-hd", "transform-prostate",
  "quasar", "scot", "cr07", "mercury", "star-trec", "coin", "focus4", "foxtrot", "nottingham-fob", "ukfss",
  "start-b", "fast-forward", "import-low", "ibis-i", "ibis-ii", "agex", "tnt", "partner",
  "espac-3", "espac-4", "espac-5", "europac", "precision-panc",
  "abc-02", "abc-06", "abc-07", "bilcap",
  "tracerx", "national-lung-matrix-trial", "chart-lung", "big-lung-trial", "convert", "quartz", "violet",
  "ukls", "ylst", "summit-lung", "lungsearch", "nhs-galleri",
  "sins-trial", "molemate", "add-aspirin", "determine-trial", "atlantis", "ukallr3",
];

export const GB_PAPERS = [
  "paper-protect-nejm-2016", "paper-protect-15-year-nejm-2023", "paper-stampede-lancet-2016",
  "paper-stampede-abiraterone-nejm-2017", "paper-chhip-lancet-oncol-2016", "paper-pace-b-lancet-oncol-2019",
  "paper-quasar-adjuvant-chemotherapy-vs-observation-lancet-2007",
  "paper-sebag-montefiore-cr07-preoperative-radiotherapy-lancet-2009",
  "paper-foxtrot-preoperative-chemotherapy-colon-jco-2023",
  "paper-espac-1-chemoradiotherapy-chemotherapy-resected-pancreatic-nejm-2004",
  "paper-espac-4-gemcitabine-capecitabine-adjuvant-pancreatic-lancet-2017",
  "paper-abc-02-gemcitabine-cisplatin-nejm-2010", "paper-abc-06-folfox-second-line-lancet-oncol-2021",
  "paper-bilcap-lancet-oncol-2019", "paper-tracerx-100-nejm-2017", "paper-tracerx-evolution-nature-2023",
  "paper-fitzgerald-lancet", "paper-nhs-galleri-performance-nat-med-2026", "paper-tutt-nat-med",
  "paper-doll-peto-50-year-doctors-bmj-2004", "paper-peto-smoking-cessation-lung-cancer-uk-bmj-2000",
  "paper-stratton-nature",
];

export const GB_PEOPLE = [
  "paul-nurse", "michael-stratton", "matthew-hurles", "charles-swanton", "mel-greaves", "richard-peto",
  "jack-cuzick", "peter-sasieni", "rebecca-fitzgerald", "serena-nik-zainal", "carlos-caldas", "caroline-dive",
  "owen-sansom", "erik-sahai", "caetano-reis-e-sousa", "chris-lord", "paul-workman", "kristian-helin",
  "freddie-hamdy", "jenny-donovan", "nicholas-james", "david-dearnaley", "johann-de-bono", "gerhardt-attard",
  "mahesh-parmar", "judith-bliss", "andrew-tutt", "charlotte-coles", "nicholas-turner", "peter-schmid",
  "david-cunningham", "matt-seymour", "david-sebag-montefiore", "dion-morton", "rachel-kerr",
  "john-primrose", "john-bridgewater", "juan-valle", "andrew-biankin", "paula-ghaneh",
  "corinne-faivre-finn", "fiona-blackhall", "dean-fennell", "sanjay-popat", "james-larkin", "kevin-harrington",
  "ruth-plummer", "usha-menon", "john-burn", "ewan-birney",
  "michelle-mitchell", "gemma-peters", "jonathan-benger", "lawrence-tallon", "robert-peel",
];

/**
 * The three kinds of "no", as worked examples. Three separate review passes of this corpus have found a NICE
 * refusal presented as a funded option, or a termination presented as a refusal, so the distinction gets its own
 * table on the page rather than a sentence inside a card. Each row was read on the body named in `url`.
 */
export type RefusalKind = {
  id: string;
  /** The category, in the body's own vocabulary. */
  kind: string;
  /** What actually happened, in one line. */
  meaning: string;
  /** The worked example: drug, indication and reference. */
  example: string;
  /** What the body itself prints, quoted. */
  quote: string;
  /** Whether it can change, and how. */
  reversible: string;
  url: string;
};

export const GB_REFUSALS: RefusalKind[] = [
  {
    id: "refused",
    kind: "Not recommended (NICE)",
    meaning: "A committee read the company's evidence, modelled the cost per quality-adjusted life year and judged it too high. This is a judgement about the medicine at the price offered.",
    example: "Enzalutamide for high-risk hormone-relapsed non-metastatic prostate cancer, NICE TA580, 15 May 2019",
    quote: "\"Enzalutamide is not recommended, within its marketing authorisation, for treating high-risk hormone-relapsed non-metastatic prostate cancer in adults.\" The stated reason: \"The estimates are not within the range that NICE usually considers a cost-effective use of NHS resources.\"",
    reversible: "Yes, through a new appraisal at a different price, or a resubmission.",
    url: "https://www.nice.org.uk/guidance/ta580",
  },
  {
    id: "terminated",
    kind: "Terminated appraisal (NICE)",
    meaning: "No committee ever assessed it, because the company submitted no evidence. Nothing has been judged about the medicine at all. Terminated appraisals sit at a separate address, nice.org.uk/guidance/terminated/, which is how a program can tell them apart from refusals.",
    example: "Nivolumab with chemotherapy for untreated unresectable or metastatic urothelial cancer, NICE TA1141, 17 March 2026",
    quote: "\"NICE is unable to make a recommendation on nivolumab (Opdivo) for untreated unresectable or metastatic urothelial cancer. This is because the company did not provide an evidence submission.\"",
    reversible: "Yes, immediately: \"We will review this decision if the company decides to make a submission.\" One caveat, from NICE's process manual at PMG36 5.6.12: NICE \"may also use the termination process to manage a company submission with a significantly high ICER\", so the category is usually but not always a non-submission, and the individual guidance page is the only reliable evidence of which it was.",
    url: "https://www.nice.org.uk/guidance/ta1141",
  },
  {
    id: "non-submission-smc",
    kind: "Not recommended in the absence of a submission (SMC)",
    meaning: "The same facts as a NICE termination, handled the opposite way. Scotland does not stop: it issues substantive negative advice to health boards without ever having seen a submission, so the outcome reads exactly like a refusal and is not one.",
    example: "Lutetium-177 vipivotide tetraxetan (Pluvicto) for PSMA-positive metastatic hormone-relapsed prostate cancer, SMC2966, 10 August 2026",
    quote: "\"Advice in the absence of a submission from the holder of the marketing authorisation: lutetium (177Lu) vipivotide tetraxetan (Pluvicto) is not recommended for use within NHSScotland. The holder of the marketing authorisation has not made a submission to SMC regarding this product in this indication. As a result, we cannot recommend its use within NHSScotland.\"",
    reversible: "Yes. The SMC's April 2025 process document says a non-submission \"does not prevent the pharmaceutical company from making a submission at any point in the future\", and later advice supersedes it.",
    url: "https://www.scottishmedicines.org.uk/medicines-advice/lutetium-177lu-vipivotide-tetraxetan-pluvicto-nonsub-smc2966/",
  },
  {
    id: "never-appraised",
    kind: "Never appraised",
    meaning: "There is no decision to find, because the medicine was never routed to an appraisal. For cancer in England this is now rare: since the 2016 Cancer Drugs Fund reforms, all new cancer drugs and significant new licensed indications are referred to NICE automatically. Where it happens, the NHS Constitution gives a different right: not a right to the drug, but a right to expect a local funding decision made rationally on the evidence.",
    example: "Sonidegib (Odomzo) for locally advanced basal cell carcinoma: licensed in Great Britain and absent from every NICE skin cancer product list, published or in development",
    quote: "The NHS Constitution: \"You have the right to drugs and treatments that have been recommended by NICE for use in the NHS ... You have the right to expect local decisions on funding of other drugs and treatments to be made rationally following a proper consideration of the evidence.\"",
    reversible: "Only by topic selection: the medicine has to be referred to an appraisal before there can be a decision either way.",
    url: "https://www.gov.uk/government/publications/the-nhs-constitution-for-england/the-nhs-constitution-for-england",
  },
];

/**
 * Five-year age-standardised net survival for the 2010 to 2014 cohort, computed from the ICBP SURVMARK-2 data file
 * published by IARC (https://gco.iarc.who.int/survival/survmark/data/V3.csv, read 25 September 2026): rows with
 * measure_type "Net Survival", time 5, sub_region "All", agegrp "All", both sexes except ovary. Values are
 * percentages; `rank` is the United Kingdom's position among the seven countries, best first. `uk1995` is the same
 * measure for the 1995 to 1999 cohort, because the honest reading is that British survival rose substantially over
 * twenty years and still finished last on five of the seven sites.
 */
export const GB_SURVMARK: Array<{ site: string; uk: number; uk1995: number; rank: number; best: string; bestValue: number }> = [
  { site: "Lung", uk: 14.8, uk1995: 7.2, rank: 7, best: "Canada", bestValue: 21.7 },
  { site: "Pancreas", uk: 7.9, uk1995: 3.3, rank: 7, best: "Australia", bestValue: 14.3 },
  { site: "Colon", uk: 59.0, uk1995: 47.0, rank: 7, best: "Australia", bestValue: 70.8 },
  { site: "Rectum", uk: 62.1, uk1995: 47.8, rank: 7, best: "Australia", bestValue: 70.8 },
  { site: "Stomach", uk: 20.8, uk1995: 14.1, rank: 7, best: "Australia", bestValue: 32.8 },
  { site: "Oesophagus", uk: 16.2, uk1995: 8.6, rank: 6, best: "Australia", bestValue: 23.2 },
  { site: "Ovary (women)", uk: 37.1, uk1995: 27.3, rank: 5, best: "Norway", bestValue: 46.2 },
];

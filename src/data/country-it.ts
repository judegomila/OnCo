/**
 * Italy deep dive: the hand-written cards and tables for /countries/it/. Plain English first, detail second, every
 * card with its sources. Entity lists are pulled from the graph on the page by id so they stay in step with the corpus.
 *
 * Written from Italian primary sources rather than from the corpus: the 2025 and 2024 editions of I numeri del cancro
 * in Italia (AIOM, AIRTUM, Fondazione AIOM, the Istituto Superiore di Sanità's PASSI surveillance, the national
 * screening observatory ONS and the pathologists' society SIAPeC-IAP), the text of law 29 of 2019 and of the 2025 budget
 * law on Normattiva, AIFA's own pages and determinations, the AIFA list of innovative medicines dated 31 October 2026,
 * and the sites of CNAO, AIRC and Alleanza Contro il Cancro. Every figure was read from the raw page or from
 * pdftotext output of the PDF, not from a summary of it.
 *
 * Counting conventions worth holding in mind:
 *  - Italy's registries have published registered incidence up to 2017. The national "new cases" figure is therefore a
 *    projection: AIRTUM projected 360,000 to 390,000 for 2024 under two assumptions, and the 2025 edition did not
 *    produce a new one. Incidence excludes non-melanoma skin cancer.
 *  - Deaths are the 2022 estimates the 2025 edition prints; it says estimates for 2023 were not available.
 *  - GLOBOCAN 2024's 429,695 for Italy in 2024 counts all cancers including non-melanoma skin (code 39), so it is not
 *    comparable with the AIRTUM figure; less its 28,698 non-melanoma skin cancers (code 17) it is 400,997.
 *  - The ClinicalTrials.gov counts in IT_TRIAL_STARTS are OnCo's own, made on 3 November 2026 with the API v2 query
 *    query.cond=cancer, query.locn=Italy, filter.advanced=AREA[StudyType]INTERVENTIONAL AND AREA[StartDate]RANGE[<year>],
 *    and the same with AND AREA[LeadSponsorClass]INDUSTRY for the industry column.
 */
export type CountryCard = { id: string; title: string; plain: string; detail: string; links: Array<{ label: string; url: string }> };

export const IT_ASOF = "2026-11-03";

/** Shorthand for the sources used more than once. */
const NDC_2025 = { label: "I numeri del cancro in Italia 2025 (AIOM, AIRTUM, Fondazione AIOM, ISS-PASSI, ONS, SIAPeC-IAP; PDF, Italian)", url: "https://www.aiom.it/wp-content/uploads/2025/12/2025_NDC_web.pdf" };
const NDC_2024 = { label: "I numeri del cancro in Italia 2024 (PDF, Italian)", url: "https://www.aiom.it/wp-content/uploads/2025/11/2024_NDC-web-21.11.25.pdf" };
const NDC_ALL = { label: "AIOM: every edition of I numeri del cancro in Italia since 2011", url: "https://www.aiom.it/i-numeri-del-cancro-in-italia/" };
const AIFA_INNOV = { label: "AIFA: innovative medicines, criteria and current list (Italian)", url: "https://www.aifa.gov.it/farmaci-innovativi" };
const AIFA_REG = { label: "AIFA: monitoring registries and managed entry agreements (Italian)", url: "https://www.aifa.gov.it/registri-farmaci-sottoposti-a-monitoraggio" };
const L207 = { label: "Law 207 of 30 December 2024 (2025 budget law), article 1, paragraphs 281 to 292, on Normattiva", url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2024-12-30;207" };
const WAIT = { label: "EFPIA Patients W.A.I.T. Indicator 2025 survey, published May 2026 (PDF)", url: "https://www.efpia.eu/media/mnfdwzax/efpia-patients-wait-indicator-2025.pdf" };

export const IT_PROFILE: CountryCard[] = [
  {
    id: "shape",
    title: "Roughly 360,000 to 390,000 new cancers a year, and a count that has not been refreshed since 2017",
    plain: "Italy's own cancer registries project between 360,000 and 390,000 new cancers a year, not counting common skin cancers. The most frequent are breast, bowel, lung and prostate. The registries' latest registered year is 2017, so these are projections, and the 2025 edition of the national report did not make a new one.",
    detail: "The 2024 edition of I numeri del cancro in Italia, using AIRTUM's analysis of 2013 to 2017 diagnoses in 35 registries covering 80 per cent of the population, estimated that new malignant cancers in 2024, excluding non-melanoma skin cancer, would not exceed 390,000, with the higher estimate 214,000 in men and 175,000 in women; under a second assumption the total was 360,000. The most common cancers projected for 2024 were, in men, prostate 40,190, lung 31,900, colorectal 27,500 and bladder 25,230 (58.2 per cent of male cancers together) and, in women, breast 53,060, colorectal 21,230, lung 12,940, endometrium 8,650 and thyroid 8,320 (59.3 per cent). The 2025 edition reports that from 2013 to 2017 the registries monitored 44,459,587 inhabitants and recorded 1,648,162 new cases, that its projections run about 20,000 cases a year below IARC's, and that, pending registered data from 2018 onwards, 2025 was not expected to differ materially from 2024. It notes the Italian population fell 0.6 per cent between 2020 and 2025 and that, on IARC figures, the age-standardised incidence of all cancers except non-melanoma skin fell 10.1 per cent in men between 2004 and 2017 (315 to 286 per 100,000) and rose 4.4 per cent in women (228 to 238).",
    links: [NDC_2025, NDC_2024],
  },
  {
    id: "survival",
    title: "3.7 million people living after a cancer diagnosis, and survival above the European average for breast, bowel and lung cancer",
    plain: "About 3.7 million Italians, one in sixteen, are alive after a cancer diagnosis. Registry research estimates that about half of the people diagnosed in 2024 will be cured, in the sense of having the same life expectancy as people who never had cancer. Italy's cancer death rate is a little below the European Union average.",
    detail: "The 2024 edition estimates 3.7 million people living after a cancer diagnosis in 2024, 6.2 per cent of the population: 2,041,996 women and 1,619,503 men. Breast cancer accounts for 925,406 of them, prostate 484,882, colorectal 442,634, bladder 300,246, thyroid 235,989 and melanoma 221,015; the number grows about 1.5 per cent a year. An AIRTUM analysis of registries covering 47 per cent of the population (ESMO Open 2024) estimated that 86 per cent of the 3.35 million alive in 2018 would not die of their cancer, rising to 93 per cent of those five years past diagnosis. The 2025 edition's minister's preface states that Italy's cancer death rate is below the EU average and that five-year survival for breast, colorectal and lung cancer is above it; its key points put Italy's 2022 cancer deaths at an estimated 192,000, a death rate of 256 per 100,000, 3.1 per cent below the EU27 average, with men 6.5 per cent below it and women level with it.",
    links: [NDC_2024, NDC_2025, { label: "Guzzinati and others, cure prevalence in Italy 2018 to 2030 (ESMO Open 2024)", url: "https://doi.org/10.1016/j.esmoop.2024.103635" }],
  },
  {
    id: "north-south",
    title: "One service, two countries: screening, travel for surgery and inactivity all divide along the line between North and South",
    plain: "The South and the islands have largely caught up on sending screening invitations, but far fewer people there actually get screened, and women in the South travel to another region for breast cancer surgery about three times as often as women in the Centre and North. In Calabria 45.7 per cent of these operations were done in another region in 2022 to 2023.",
    detail: "Screening data from the national screening observatory for 2024, reported in the 2025 edition: mammography invitations reached 97 per cent of the eligible population nationally (88 per cent in the South and islands, up from 43 per cent in 2020), but the share actually screened was 62 per cent in the North, 51 in the Centre and 34 in the South and islands. Bowel screening by faecal occult blood test reached 7,984,447 people aged 50 to 69 invited (94 per cent), but only 33 per cent were screened, 46 per cent in the North, 32 in the Centre and 18 in the South and islands, and no macro-area reached the acceptable 50 per cent. Cervical screening invited 4,048,525 people, with 51 per cent screened (North 62, Centre 51, South and islands 37). A chapter on interregional travel for breast cancer surgery finds the escape index in southern regions about three times that of the Centre and North throughout 2010 to 2023. In 2022 to 2023, 45.7 per cent of operations on women living in Calabria were performed outside the region (the chapter says the figure has come close to 50 per cent) and 40.3 per cent for Molise (36.33 per cent in 2023 alone), against 1.9, 2.1 and 3.0 per cent for Lombardy, Friuli Venezia Giulia and Lazio, whose averages over the whole period were about 1.5, 2.5 and 4 per cent. PASSI surveillance for 2023 to 2024 finds 39 per cent of adults in the South completely sedentary against 16 per cent in the North.",
    links: [NDC_2025],
  },
  {
    id: "risk",
    title: "A quarter of adults smoke, and the habit follows income and education",
    plain: "About one adult in four aged 18 to 69 smokes, men more than women and people who struggle financially far more than those who do not. More than four in ten adults are overweight or obese, and one in six drinks in a way the surveillance system classes as higher risk.",
    detail: "From the Istituto Superiore di Sanità's PASSI surveillance as reported in the 2025 edition, for 2023 to 2024: 24 per cent of 18 to 69 year olds smoke and 17 per cent are former smokers; 28 per cent of men and 20 per cent of women smoke; 36 per cent of people with economic difficulties smoke against 21 per cent of those without; the share fell from 30 per cent in 2008 to 23 per cent in 2024; and only 5 smokers in 10 report being advised by a health professional to quit. Electronic cigarettes and heated tobacco products are each used by about 4 per cent, mostly alongside cigarettes rather than instead of them. 18 per cent drink at higher risk and only 7 per cent of them report being advised to drink less. 43 per cent are overweight (33) or obese (10), and 27 per cent are completely sedentary.",
    links: [NDC_2025],
  },
];

/** Five sites from the 2025 edition's site chapters: incidence projected for 2024, deaths estimated for 2022. */
export const IT_SITES: Array<{ id: string; site: string; cancerId: string; newCases: number; deaths: number; survival: string; living: number }> = [
  { id: "breast", site: "Breast", cancerId: "breast-cancer", newCases: 53686, deaths: 15500, survival: "88%", living: 925000 },
  { id: "colorectal", site: "Colon and rectum", cancerId: "colorectal", newCases: 48706, deaths: 24200, survival: "65% men, 66% women", living: 442600 },
  { id: "lung", site: "Lung", cancerId: "nsclc", newCases: 44831, deaths: 35700, survival: "16% men, 23% women", living: 108900 },
  { id: "prostate", site: "Prostate", cancerId: "prostate", newCases: 40192, deaths: 8200, survival: "91%", living: 485000 },
  { id: "pancreas", site: "Pancreas", cancerId: "pancreatic", newCases: 13585, deaths: 14900, survival: "11% men, 12% women", living: 23600 },
];

export const IT_REGISTRY: CountryCard[] = [
  {
    id: "network",
    title: "What the Italian registry is: a network of regional and local registries, not yet a national one",
    plain: "Italy has no single national cancer registry yet. Local and regional registries, gathered in the association AIRTUM, cover about 80 per cent of the population, and their pooled data are what the national figures rest on. A law of 2019 created a national network of registries, but the president of the oncologists' society AIOM wrote that at the end of September 2025 the legislative steps to activate the national registry were still not complete.",
    detail: "Law 29 of 22 March 2019, in force from 20 April 2019, established the national network of cancer registries and surveillance systems (Rete nazionale dei registri dei tumori e dei sistemi di sorveglianza), with the Ministry of Health as data controller, and required a regulation within twelve months to define the data, access rights and security, with regions to validate their data by 30 April of the following year. In the introduction to the 2025 edition of I numeri del cancro in Italia, AIOM's president wrote that at the end of September 2025 the legislative process to activate the national cancer registry was still not complete, an unfinished task with harmful side effects on the functioning of some regional registries. The registry data used for national projections cover 2013 to 2017 in 35 registries and about 80 per cent of the population; the cure-prevalence analysis used registries covering 47 per cent.",
    links: [
      { label: "Law 29 of 22 March 2019, national network of cancer registries (Normattiva, Italian)", url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2019-03-22;29" },
      NDC_2025,
      { label: "AIRTUM, Italian association of cancer registries (Italian)", url: "https://www.registri-tumori.it/cms/" },
    ],
  },
  {
    id: "projection",
    title: "Why the headline number is a range: two assumptions about the years nobody has counted",
    plain: "Because registered data stop at 2017 and the pandemic disrupted both care and data collection, AIRTUM projected 2024 under two assumptions. They agree for women and disagree for men by 33,000 cases, mostly in prostate, lung, bowel and bladder cancer.",
    detail: "The 2025 edition's incidence chapter, by Diego Serraino of Alleanza Contro il Cancro and the AIRTUM board, sets out the series: AIRTUM estimates of 360,000 new cases in 2011 rising to 377,000 in 2020, no estimate for 2021, IARC projections of 391,000 for 2022 and 395,000 for 2023, and AIRTUM's 360,000 or 391,000 for 2024. The first assumption extrapolated each site, area and sex trend from 2013 to 2017 linearly; the second held 2013 to 2017 rates constant. For women the two give 178,000 and 176,000. For men they give 182,000 and 215,000, with the projection for prostate ranging from 31,000 to 40,000, lung 27,000 to 32,000, colorectal 23,000 to 28,000 and bladder 23,000 to 25,000; the chapter ascribes the uncertainty to falling smoking among men and to changing participation in organised and opportunistic screening.",
    links: [NDC_2025, NDC_2024],
  },
];

export const IT_PAYING: CountryCard[] = [
  {
    id: "ssn",
    title: "A tax-funded national health service delivered region by region",
    plain: "Cancer care in Italy is paid for by the Servizio Sanitario Nazionale from general taxation, free or with a small charge. The state defines a package of essential care (the LEA); the regions run the hospitals and deliver it, which is why what a patient gets depends partly on where they live.",
    detail: "The LEA (livelli essenziali di assistenza) are the services the national health service must provide to everyone, free or for a co-payment, funded from general taxation. The state defines them with the opinion of the State-Regions Conference; the regions deliver them; the Ministry of Health monitors delivery, and a standing LEA committee at the ministry assesses it with the 88 indicators of the New Guarantee System. They were first defined in a prime ministerial decree of 29 November 2001 and updated by a decree of 12 January 2017, but the updated outpatient and prosthetic tariff schedule that made many of the 2017 services actually available took effect only on 1 January 2025. Medicines enter the LEA through AIFA rather than through the LEA commission. Some regions pay separately for expensive devices that hospital tariffs do not cover, which counts as care beyond the LEA and is not allowed in regions under a deficit recovery plan, an inequity patient associations have pointed out. All of this is from Americo Cicchetti's chapter in the 2025 edition.",
    links: [NDC_2025],
  },
  {
    id: "innovative-fund",
    title: "A ring-fenced national fund for innovative medicines, and three years of guaranteed access",
    plain: "Italy pays for medicines it judges truly innovative out of a separate national fund, so a hospital's drug budget does not decide whether a patient gets them. An innovative indication gets up to three years of this funding and must be made available in every region straight away. About two thirds of the indications holding the status today are for cancer.",
    detail: "The fund created by law 232 of 2016 (article 1, paragraph 401) was set at 1,000 million euros a year from 2022, after a separate oncology fund was merged into it in 2021, and increased by 300 million euros a year from 2024 by law 234 of 2021. The 2025 budget law (paragraphs 281 to 292) caps innovative medicines at 900 million euros a year, conditionally innovative ones at 300 million and antibiotics for multiresistant infections at 100 million, and fixes the status at a maximum of 36 months. AIFA's criteria, rewritten by presidential determination 966/2025, require at least a moderate level of unmet need, added therapeutic benefit and quality of evidence (assessed with GRADE), with low-quality evidence acceptable for rare diseases; benefits are access to the fund, suspension of statutory price cuts, mandatory inclusion in regional hospital formularies and exclusion from the cap on hospital drug spending. The criteria also let the commission, when judging how far trial results carry over to practice, take into account that a medicine's research and development plan was designed and conducted in Italy. AIFA's list dated 31 October 2026 holds 59 innovative indications for 44 medicines and 152 negative assessments; by OnCo's reading of the indication text, 39 of the 59 are cancer indications, among them adjuvant alectinib, CAR-T cells for myeloma and lymphoma, trastuzumab deruxtecan in HER2-low breast cancer and pembrolizumab in several settings.",
    links: [AIFA_INNOV, L207, { label: "AIFA presidential determination 966/2025 (PDF, Italian)", url: "https://www.aifa.gov.it/documents/20142/847382/Determina_Pres-966-2025.pdf" }],
  },
  {
    id: "no-threshold",
    title: "No cost-per-QALY threshold on AIFA's pages: the price is negotiated",
    plain: "AIFA's page on economic evaluation names no cost-effectiveness threshold of the kind England publishes. AIFA asks companies for economic analyses and its experts review them, but the price is set by negotiation and the economic opinion is advisory.",
    detail: "AIFA's page on economic evaluation says cost-effectiveness has been a criterion in price negotiation since a 1997 CIPE resolution, that the QALY is widely applied though it does not capture everything that makes up value, and that economic evaluations entered AIFA's assessment practice after its 2016 organisation regulation. Budget impact and pharmacoeconomic analyses are required for new medicines, orphan medicines and new indications of patented medicines, and AIFA's opinions on them are described as neither mandatory nor binding. The page names no threshold. Price is set by negotiation between AIFA and the company under a ministerial decree of 2 August 2019; new guidelines for the health technology assessment dossier, adopted by determination DTS 88/2025, apply from 1 April 2026, and the 2025 edition notes that AIFA is strongly encouraged to use the EU joint clinical assessments under regulation 2021/2282, which apply from 12 January 2025.",
    links: [{ label: "AIFA: economic evaluations (Italian)", url: "https://www.aifa.gov.it/valutazioni-economiche" }, { label: "AIFA: pricing and reimbursement applications (Italian)", url: "https://www.aifa.gov.it/domanda-rimborsabilita-e-prezzo" }, NDC_2025],
  },
  {
    id: "law-648",
    title: "Law 648 of 1996: paying for a drug before Italy has approved it, or outside its licence",
    plain: "When there is no good alternative, the health service can pay in full for a medicine approved abroad but not in Italy, one still in clinical trials, or one used for a different condition from the licensed one, if phase 2 evidence supports it. Patient associations, scientific societies, hospitals, universities and doctors can all ask for a medicine to be added.",
    detail: "Under law 648 of 1996, on the opinion of AIFA's Scientific and Economic Commission and a board decision on spending, a medicine is added to a national list and becomes free to every patient in Italy with the named condition. The conditions are no valid therapeutic alternative and completed studies, at least phase 2, showing adequate efficacy and acceptable risk; since law 79 of 2014 an off-label use may be listed even where an alternative exists, if the use is known and consistent with research and economical. Requests may come from patient associations, scientific societies, hospitals, universities and clinicians. Prescribing requires the patient's written informed consent, a treatment plan from a specialist hospital, university or IRCCS, and reporting of each patient's course to AIFA.",
    links: [{ label: "AIFA: law 648/1996 (Italian)", url: "https://www.aifa.gov.it/legge-648-96" }],
  },
  {
    id: "costs",
    title: "Free medicines, and money troubles anyway",
    plain: "A quarter of patients in Italian academic trials reported financial difficulties before starting treatment, and those whose finances got worse during treatment had a higher risk of dying. Southern patients and those under 65 report it most.",
    detail: "Pooling 3,670 patients from 16 academic trials in lung, breast and ovarian cancer, Francesco Perrone's group at the Pascale institute in Naples found that 26 per cent reported financial difficulty at baseline, which predicted worse quality of life, and that the 22.5 per cent whose finances worsened during treatment had a hazard ratio for death of 1.20 (Annals of Oncology 2016). In the 2025 edition the same group writes that it then built PROFFIT, an Italian financial-toxicity questionnaire funded by AIRC, with data on 2,166 patients from October 2019, and that financial toxicity is consistently higher in patients under 65 and in the South and islands. The national plan's dedicated fund is small: 10 million euros a year from 2023 to 2027 to implement the Piano Oncologico Nazionale, alongside 20 million euros a year to reimburse genomic tests in early hormone-sensitive breast cancer and a fund of 5 million euros for 2022 and 2023 for next-generation sequencing in metastatic non-squamous lung cancer.",
    links: [{ label: "Perrone and others, financial difficulties and outcomes in Italian trials (Annals of Oncology 2016)", url: "https://doi.org/10.1093/annonc/mdw433" }, NDC_2025, NDC_2024],
  },
];

export const IT_REGULATOR: CountryCard[] = [
  {
    id: "aifa",
    title: "AIFA and its single commission",
    plain: "New cancer medicines reach Italy through the European approval, after which AIFA, the Italian Medicines Agency, decides whether the health service pays and at what price. Since a 2022 reform one commission gives both the clinical and the economic opinion; the agency's board decides.",
    detail: "Decree-law 169 of 8 November 2022 abolished AIFA's technical-scientific commission (CTS) and its pricing and reimbursement committee (CPR) and replaced them with a single Scientific and Economic Commission (CSE) of ten members: AIFA's technical-scientific director and the president of the Istituto Superiore di Sanità by right, four designated by the health minister including the chair, one by the economy minister and three by the State-Regions Conference, the appointed members serving three years renewable once; the decree is cited in the preamble of AIFA's determination 966/2025 and the membership is from AIFA's page on the commission. As the 2025 edition of I numeri del cancro in Italia describes it, the CSE appraises and the board decides reimbursement and price by determination. AIFA's pricing page now distinguishes simplified procedures, which skip the CSE and need the board's approval before the measure is published in the Gazzetta Ufficiale, from fast-track procedures, which the CSE assesses more quickly.",
    links: [{ label: "AIFA: Scientific and Economic Commission (Italian)", url: "https://www.aifa.gov.it/commissione-scientifica-economica" }, { label: "AIFA: pricing and reimbursement applications (Italian)", url: "https://www.aifa.gov.it/domanda-rimborsabilita-e-prezzo" }, { label: "AIFA presidential determination 966/2025 (PDF, Italian)", url: "https://www.aifa.gov.it/documents/20142/847382/Determina_Pres-966-2025.pdf" }, NDC_2025],
  },
  {
    id: "speed",
    title: "Faster than the European average for cancer medicines, and most of them reach patients",
    plain: "Of 56 cancer medicines approved in the EU from 2021 to 2024, 50 were available to Italian patients by January 2026, against an EU average of 28. They took on average 470 days from EU approval, against an EU average of 655.",
    detail: "In the EFPIA Patients W.A.I.T. Indicator survey published in May 2026 (IQVIA data to 5 January 2026, medicines centrally authorised 2021 to 2024), Italy had 50 of 56 oncology medicines available (89 per cent) against an EU average of 28 (51 per cent). Its mean time from marketing authorisation to availability for oncology medicines was 470 days and its median 420, against EU averages of 655 and 598. Germany, where medicines are reimbursed from launch, had a mean of 113 days; France 789. Availability in the survey means inclusion on the public reimbursement list, so the figures measure AIFA's negotiation as much as anything clinical. The survey is commissioned by the industry's own association.",
    links: [WAIT],
  },
  {
    id: "trials-regulation",
    title: "Trials: 40 regional ethics committees and three national ones",
    plain: "Since the EU trials regulation, Italy reviews trials through 40 territorial ethics committees and three national ones for children, advanced therapies and public research bodies, with AIFA as the competent authority.",
    detail: "AIFA's list dated 3 November 2025 names three national ethics committees, set up by a health ministry decree of 1 February 2022, for paediatric trials, for advanced therapy medicinal products and for public research bodies, and 40 territorial ethics committees set up by a decree of 26 January 2023, all operational in the EU Clinical Trials Information System. AIFA's national observatory on clinical trials (OsSC) handles national submissions and publishes a national report.",
    links: [{ label: "AIFA: EU clinical trials regulation and ethics committees (Italian)", url: "https://www.aifa.gov.it/regolamento-europeo-sperimentazioni-cliniche" }, { label: "AIFA: national observatory on clinical trials (Italian)", url: "https://www.aifa.gov.it/osservatorio-nazionale-sperimentazione-clinica" }],
  },
];

export const IT_DOING: CountryCard[] = [
  {
    id: "registries-pbr",
    title: "Paying only for patients who respond: AIFA's monitoring registries",
    plain: "For many expensive medicines, Italian doctors must register each patient in an online AIFA registry. The registry checks the patient fits the reimbursed indication and, under payment-by-result agreements, makes the company refund the health service for patients the drug did not help.",
    detail: "AIFA describes its monitoring registries as an administrative control that must never delay treatment. Law 135 of 2012 made them part of the national health service's information system, and later laws (125 of 2015, 232 of 2016, 205 of 2017) gave them roles in assessing effectiveness for renegotiation and in controlling spending on innovative medicines. AIFA classifies its managed entry agreements as outcome-based (payment by result, in which the company repays 100 per cent of treatment failures; risk sharing, a discount for non-responders only; and success fee, in which the service initially receives the medicine free and pays only for responders) or financial (cost sharing, a discount on the first cycles for everyone, and capping). The registries network spans about 3,500 health facilities, 52 regional leads, 963 medical directors, 32,857 doctors and 2,318 pharmacists, with 49 companies holding at least one registry. An innovative indication is automatically subject to a registry.",
    links: [AIFA_REG, AIFA_INNOV],
  },
  {
    id: "oblio",
    title: "The right to be forgotten: no need to declare a cured cancer after ten years, or five for cancers diagnosed before 21",
    plain: "Since January 2024, Italians who have had cancer do not have to tell insurers, banks, employers or adoption services about it once ten years have passed since the end of treatment without relapse, or five years if they were diagnosed before 21. For some cancers the wait is shorter, as little as one year.",
    detail: "Law 193 of 2023, passed unanimously by both chambers and in force from 2 January 2024, bars asking for or using information about a past cancer in insurance, credit, employment competitions and adoption once ten years have passed since the end of treatment without recurrence (five years if diagnosed before age 21). A ministerial decree of 22 March 2024 set shorter terms: one year for stage I colorectal cancer, stage I to II breast cancer, testicular cancer and thyroid cancer in women diagnosed under 55 and men under 45 (excluding anaplastic); five years for endometrial cancer, Hodgkin lymphoma under 45 and acute leukaemias; six for melanoma and cervical cancer over 21; seven for stage II to III colorectal cancer over 21. A July 2024 decree created a free certificate issued by a family doctor or specialist. Writing in October 2025, Giordano Beretta, an oncologist in Pescara, and Elisabetta Iannelli, secretary general of FAVO, note that the labour ministry decree and the insurance and banking regulators' measures were still missing, and argue that an August 2024 decree requiring the certificate in adoption proceedings contradicts the law.",
    links: [NDC_2025, NDC_2024],
  },
  {
    id: "cnao",
    title: "Carbon ions on the national health service",
    plain: "CNAO in Pavia, half an hour from Milan, is the only centre in Italy that treats with both protons and carbon ions, for tumours that cannot be operated on or resist ordinary radiotherapy. The national health service pays for it.",
    detail: "CNAO's history page dates the idea to a 1991 report by Ugo Amaldi and Giampiero Tosi, the design to the CERN PIMMS study, the funding decision to Umberto Veronesi as health minister in 2000, and the inauguration to 15 February 2010, at a construction cost of 135 million euros plus 37.1 million euros for the three years of clinical trials the ministry required. Its home page states that hadron therapy has been reimbursable by the national health service since 1 January 2014; its history page states that it entered the LEA in 2017. It treats tumours of the skull base, head and neck, chest, abdomen, pelvis, limbs and spine and paediatric solid tumours, and does not treat widely metastatic disease.",
    links: [{ label: "Fondazione CNAO (Italian)", url: "https://fondazionecnao.it" }, { label: "History of CNAO (Italian)", url: "https://fondazionecnao.it/storia" }, { label: "Carbon-ion therapy on OnCo", url: "/technologies/carbon-ion/" }],
  },
  {
    id: "milan",
    title: "The Milan trials that changed breast cancer and Hodgkin lymphoma",
    plain: "Two of the trials every breast cancer patient benefits from were run at the Istituto Nazionale dei Tumori in Milan: Umberto Veronesi's, showing a woman can keep her breast without losing survival, and Gianni Bonadonna's, showing chemotherapy after surgery prevents relapses. Bonadonna also introduced the ABVD chemotherapy for Hodgkin lymphoma.",
    detail: "Milan I randomised 701 women with tumours of 2 cm or less between 1973 and 1980; at twenty years, death from any cause was 41.7 per cent after quadrantectomy with radiotherapy and 41.2 per cent after radical mastectomy (New England Journal of Medicine 2002). Bonadonna's 1976 trial gave CMF after radical mastectomy for node-positive disease; after 27 months, 5.3 per cent of 207 treated women had relapsed against 24 per cent of 179 controls. The Milan criteria for liver transplantation in hepatocellular carcinoma came from the same institute's surgery department (Mazzaferro, New England Journal of Medicine 1996). Bonadonna's group reported ABVD against MOPP in advanced Hodgkin's disease in 1975, with complete remission in 75 and 76 per cent. Later Italian academic groups produced the APL0406 trial, which showed that low-to-intermediate-risk acute promyelocytic leukaemia can be treated with retinoic acid and arsenic trioxide instead of chemotherapy (GIMEMA), the HERACLES trial of HER2-targeted therapy in colorectal cancer (Candiolo and Niguarda) and the SOUND trial that showed axillary surgery can be omitted in small breast cancers with a negative ultrasound (IEO).",
    links: [{ label: "Veronesi and others, Milan I at 20 years (NEJM 2002)", url: "https://doi.org/10.1056/NEJMoa020989" }, { label: "Bonadonna and others, adjuvant CMF (NEJM 1976)", url: "https://doi.org/10.1056/NEJM197602192940801" }, { label: "Bonadonna and others, ABVD against MOPP in Hodgkin's disease (Cancer 1975)", url: "https://doi.org/10.1002/1097-0142(197507)36:1<252::aid-cncr2820360128>3.0.co;2-7" }],
  },
  {
    id: "irccs",
    title: "Research hospitals with state research status, and a network that joins them",
    plain: "Italy gives a set of hospitals the status of IRCCS, scientific research and care institutes funded partly for research by the health ministry. Many of Italy's cancer centres hold it, and 27 IRCCS belong to Alleanza Contro il Cancro, the cancer research network the ministry founded.",
    detail: "Alleanza Contro il Cancro states that it was founded by the Ministry of Health in 2002 and that its members are 27 IRCCS, the patient association AIMaC, the Italian Sarcoma Group, the CNAO foundation, the nuclear physics institute INFN, the Fondazione Policlinico di Milano and the Istituto Superiore di Sanità, which hosts it. The health minister's preface to the 2025 edition names research funding through targeted research and IRCCS activities, and investment through the national recovery and resilience plan, as the ministry's levers. The cancer research charity AIRC gave more than 141 million euros to research in 2024, supporting about 5,200 researchers across the country: more than 112 million funded 673 individual projects, 8 special programmes and 90 fellowships, and 29 million went to its own institute IFOM. A national lung screening network (RISP) of 18 centres in 15 regions, coordinated by the Istituto Nazionale dei Tumori, had performed about 9,130 baseline low-dose CT scans by May 2024.",
    links: [{ label: "Alleanza Contro il Cancro (Italian)", url: "https://www.alleanzacontroilcancro.it" }, { label: "AIRC 2024 accounts (Italian)", url: "https://www.airc.it/fondazione/chi-siamo/bilancio/bilancio-2024" }, NDC_2025, NDC_2024],
  },
];

/** OnCo's own count from the ClinicalTrials.gov API v2, 3 November 2026; query in the file header. */
export const IT_TRIAL_STARTS: Array<{ year: number; studies: number; industry: number }> = [
  { year: 2015, studies: 261, industry: 167 },
  { year: 2016, studies: 234, industry: 164 },
  { year: 2017, studies: 299, industry: 193 },
  { year: 2018, studies: 284, industry: 171 },
  { year: 2019, studies: 331, industry: 200 },
  { year: 2020, studies: 305, industry: 193 },
  { year: 2021, studies: 361, industry: 223 },
  { year: 2022, studies: 316, industry: 212 },
  { year: 2023, studies: 301, industry: 176 },
  { year: 2024, studies: 334, industry: 204 },
  { year: 2025, studies: 319, industry: 195 },
];
export const IT_TRIAL_TOTAL = 5826;

export const IT_GAPS: CountryCard[] = [
  {
    id: "what-could-not-be-sourced",
    title: "What could not be sourced",
    plain: "Four things this page should say and does not, because the source could not be read or does not exist.",
    detail: "First, registered cancer incidence for any year after 2017: the national report has no registered data from 2018 onwards, so every national incidence figure here is a projection; AIRTUM's site says its special issue in Cancer Epidemiology, covering the years up to the COVID-19 pandemic with projections to 2025, has been published, but it was not read for this page. Second, whether the legislative steps to activate the national registry under law 29 of 2019, which AIOM's president called incomplete at the end of September 2025, have been completed since: the Ministry of Health's site (salute.gov.it) refused every request with a 403 on 3 November 2026 and answered a scripted request with a bot challenge on 17 November 2026, so the Piano Oncologico Nazionale 2023-2027 is described here from the 2024 edition's account of it rather than from the plan itself. Third, the number of IRCCS recognised for oncology and the funding the ministry gives them, which the same site holds. Fourth, the regional oncology networks one by one: the 2024 edition reports a ministerial decree of 10 June 2024 rewarding regions whose networks are fully operational, but which regions qualify was not found in a primary source.",
    links: [NDC_2025, NDC_2024, { label: "Ministry of Health: cancer (Italian; refused scripted requests on 3 November 2026)", url: "https://www.salute.gov.it/" }],
  },
  {
    id: "corpus",
    title: "Records that should be in this corpus and are not",
    plain: "OnCo still holds no record for AIOM, the oncologists' society that writes Italy's treatment guidelines and the national cancer report, for AIRTUM, or for the Istituto Superiore di Sanità, and few Italian trials beyond those registered on ClinicalTrials.gov.",
    detail: "Added with this page: AIFA, CNAO, Alleanza Contro il Cancro, IFOM, Umberto Veronesi, Gianni Bonadonna, and four papers (Milan I at twenty years, Bonadonna's adjuvant CMF trial, Perrone's financial difficulties analysis and the AIRTUM cure prevalence study). Still missing: AIOM and its guidelines, AIRTUM as an institution, the Istituto Superiore di Sanità, the Italian cooperative groups GIM, GOIRC, GONO and MITO, Italian trials registered only in the EU registers, and the ABVD regimen's founding paper. New trials of medicines in the EU are submitted through CTIS, and those that are not also registered on ClinicalTrials.gov are missing from the start-year table on this page; how many that is was not measured.",
    links: [NDC_ALL, { label: "AIOM guidelines (Italian)", url: "https://www.aiom.it/linee-guida-aiom/" }],
  },
];

export const IT_INSTITUTIONS = ["int-milan", "ieo-milan", "pascale-naples", "regina-elena-rome", "irst-meldola", "candiolo", "humanitas", "iov-veneto", "cro-aviano", "gemelli", "san-raffaele", "niguarda-cancer-center", "istituto-tumori-bari", "crob-rionero", "policlinico-san-matteo", "sant-orsola-bologna", "san-martino-genoa", "ausl-irccs-reggio-emilia", "cnao-pavia", "ifom", "alleanza-contro-il-cancro", "airc", "favo", "aifa"];
export const IT_COMPANIES = ["menarini", "menarini-silicon-biosystems", "recordati", "philogen-s-p-a", "nerviano-medical-sciences", "italfarmaco", "leadiant", "comecer", "igea", "aptadir-therapeutics", "thena-biotech", "gimema", "fondazione-italiana-linfomi", "italian-sarcoma-group"];
export const IT_DRUGS = ["elacestrant", "tagraxofusp", "daromun", "givinostat"];
export const IT_TRIALS = ["milan-i", "sound", "neotrip", "apl0406", "d-alba", "heracles", "tosca", "isg-sts-1001", "cyto-pv", "gd2-cart01", "tam-01", "adiuvo", "a-brave", "nct02938299"];
export const IT_PAPERS = ["paper-veronesi-milan-i-twenty-year-nejm-2002", "paper-bonadonna-adjuvant-cmf-nejm-1976", "paper-mazzaferro-milan-criteria-nejm-1996", "paper-apl0406-lo-coco-nejm-2013", "paper-sartore-bianchi-heracles-trastuzumab-lapatinib-lancet-oncol-2016", "paper-misale-kras-acquired-resistance-anti-egfr-colorectal-nature-2012", "paper-cremolini-tribe-folfoxiri-bevacizumab-lancet-oncol-2015", "paper-orecchia-lancet-oncol", "paper-balkwill-mantovani-inflammation-virchow-lancet-2001", "paper-perrone-financial-difficulties-italy-annonc-2016", "paper-guzzinati-cure-prevalence-italy-esmo-open-2024"];
export const IT_PEOPLE = ["umberto-veronesi", "gianni-bonadonna", "francesco-lo-coco", "alberto-bardelli", "salvatore-siena", "andrea-sartore-bianchi", "giuseppe-curigliano", "nicoletta-colombo", "paolo-veronesi", "paolo-ascierto", "alessandro-gronchi", "silvia-stacchiotti", "pier-giuseppe-pelicci", "armando-santoro", "giovanni-scambia", "anna-fagotti", "andrea-necchi", "andres-ferreri", "domenica-lorusso", "luca-gianni"];

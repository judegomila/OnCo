import type { CountryDive } from "@/data/country-dive";

/**
 * Lithuania deep dive: the hand-written cards for /countries/lt/ (wave 10). Every figure was read from the raw text of
 * its source on 11 November 2026, not from a summary of it: the OECD and European Commission's EU Country Cancer
 * Profile: Lithuania 2025 (PDF text, from the Internet Archive's copy, because the European Cancer Inequalities
 * Registry's own link no longer served it), the National Cancer Institute's Cancer Registry page, its news pages and its
 * activity report for 2025 (in Lithuanian; PDF text), SIOP Europe's childhood cancer country profile for Lithuania (PDF
 * text), the patient association POLA's pages (in Lithuanian), IARC's GLOBOCAN 2024 fact sheet for Lithuania, WHO's HPV
 * coverage rows from its public data API, the World Bank's health spending series from its API, the full text of the
 * 2026 Baltic radiotherapy census through Europe PMC, and the papers' abstracts through Europe PMC. The Lithuanian
 * government sites on lrv.lt, e-seimas and e-tar, the State Audit Office and Santaros Klinikos answered a plain request
 * with a bot challenge and were not read; the Internet Archive refused most requests with "too many requests", and one VLK
 * news page of December 2021 was read from its archived copy.
 * Those gaps are named under `gaps`.
 */
const CCP_2025 = "https://web.archive.org/web/20260519070348/https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-lt-2024-1674-en.pdf";
const CCP_DOI = "https://doi.org/10.1787/b260e7d1-en";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/440-lithuania-fact-sheet.pdf";
const NVI_REGISTRY = "https://nvi.lt/vezio-registras/";
const NVI_REPORT_2025 = "https://nvi.lt/wp-content/uploads/2026/05/NVI_Ataskaita_2025_GALUTINE-2026-03-18.pdf";
const NVI_REGISTRY_REFORM = "https://nvi.lt/pradedamas-lietuvos-vezio-registro-pertvarkymas-siekiama-realaus-laiko-duomenu-ir-pazangios-onkologijos-politikos/";
const NVI_HI = "https://nvi.lt/nvi-ir-higienos-instituto-partneryste-atvers-daugiau-galimybiu-vezio-duomenu-analizei/";
const REGISTRY_PORTAL = "https://registras.nvi.lt/lt/";
const SIOPE_LT = "https://siope.eu/media/documents/ocean-projectlithuania.pdf";
const POLA_ABOUT = "https://pola.lt/apie-pola/";
const WB_OOP = "https://api.worldbank.org/v2/country/LTU/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_CHE = "https://api.worldbank.org/v2/country/LTU/indicator/SH.XPD.CHEX.GD.ZS?format=json";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'LTU'%20and%20startswith(ANTIGEN,'PRHPV')";
const BALTIC_RT = "https://doi.org/10.2340/ao.v65.45442";
const BALTIC_RT_FULL = "https://europepmc.org/articles/PMC13127107";
const VLK_2021 = "https://web.archive.org/web/20250911092910/https://ligoniukasa.lrv.lt/en/news/oncological-diseases-will-invest-in-both-treatment-and-prevention/";
const CTGOV = "https://clinicaltrials.gov/search?country=Lithuania&cond=cancer";

export const LT_DIVE: CountryDive = {
  iso2: "LT",
  iso3: "LTU",
  name: "Lithuania",
  flag: "🇱🇹",
  asOf: "2026-11-11",
  title: "Cancer in Lithuania",
  description:
    "Cancer in Lithuania from Lithuanian and European sources: 16,413 new cancers counted by the national Cancer Registry in 2022 and IARC's estimate of 16,368 for 2024, prostate cancer a third of men's cancers, compulsory health insurance that pays for four screening programmes including PSA testing since 2006, a mean of 1,141 days from European approval to reimbursement of new cancer medicines, the Green Corridor fast track since 2023, and 53 trials in our records with a Lithuanian site.",
  lede:
    "Lithuania's national Cancer Registry, with records going back to 1978, counted 16,413 new cancers in 2022. Prostate cancer is a third of the cancers in men, found partly through a PSA testing programme that has run since 2006, and men die of cancer at a rate 30% above the EU average. Since 2023 a Green Corridor has given each newly diagnosed patient a care manager, but new cancer medicines took a mean of 1,141 days after European approval to be reimbursed, the second longest wait of 22 EU countries measured.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Lithuania is 16,368 new cancers and 8,037 deaths, an age-standardised incidence of 275.9 per 100,000 (374.0 in men, 213.8 in women) on the world standard population, including 297 non-melanoma skin cancers. IARC's fact sheet gives the source as the national registry, with trends in national rates projected to 2024, and national WHO mortality data for deaths. The Lithuanian Cancer Registry's own count for 2022, in the National Cancer Institute's 2025 report, is 16,413 new cancers with an age-standardised rate of 287.9 per 100,000; the report does not name the standard population, and it lists non-melanoma skin cancer (C44) among the most frequently registered cancers, so the two totals may not count skin cancers the same way. The European Commission's estimates quoted in the Country Cancer Profile (780 per 100,000 men and 395 per 100,000 women in 2022, excluding non-melanoma skin cancer) use the European standard population, which gives higher rates than the world standard, so they cannot be set beside IARC's rates directly.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Lithuania",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Lithuania (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 16,400 new cancers a year, and prostate cancer a third of them in men",
          plain:
            "Lithuania, with about 2.9 million people, records about 16,400 new cancers and 8,000 cancer deaths a year. In men, prostate cancer is by far the commonest, more than a third of their cancers; in women it is breast cancer. Lung cancer causes the most cancer deaths, and bowel cancer is common in both sexes.",
          detail:
            "IARC's GLOBOCAN 2024 fact sheet estimates 16,368 new cancers (9,212 in men, 7,156 in women) and 8,037 deaths (4,394 and 3,643). The commonest cancers are prostate (3,209, 34.8% of cancers in men), breast (1,716, 24.0% of cancers in women), colorectum (1,515), lung (1,452) and stomach (746); by deaths lung cancer leads (1,208), then colorectum (926), prostate (558) and breast (550). The risk of developing a cancer before age 75 is 36.5% for men and 21.2% for women, and 48,655 people are estimated to be living within five years of a diagnosis. The National Cancer Institute's Cancer Registry counted 16,413 new cancers in 2022, after a fall of about 10% in 2020 that its 2025 report attributes to the COVID-19 pandemic disrupting diagnosis, with radiology examinations down 16% and endoscopies down 29%. The European Commission's estimates, quoted in the OECD and European Commission's Country Cancer Profile 2025, put Lithuania above the EU average for cervical (18 against 12 per 100,000), endometrial (39 against 27) and ovarian cancer (21 against 16) in 2022, and expect cancer cases to rise by 13% between 2022 and 2040.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Lithuania (PDF)", url: IARC_FACTSHEET },
            { label: "National Cancer Institute: activity report 2025, epidemiology section (PDF, in Lithuanian)", url: NVI_REPORT_2025 },
            { label: "OECD and European Commission: EU Country Cancer Profile Lithuania 2025, section 2 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
        {
          id: "men-and-education",
          title: "Men's cancer death rate 30% above the EU, and a wide gap by education",
          plain:
            "Lithuanian men die of cancer at a rate 30% above the EU average for men, and the rate has been falling more slowly. Men with less education are more than twice as likely to die of cancer as men with more. For women the overall death rate is close to the EU average, but cervical cancer deaths are double it.",
          detail:
            "The Country Cancer Profile 2025 gives Lithuania's male cancer mortality as 400 per 100,000 in 2021, 30% higher than the EU average, with a slower fall between 2011 and 2021 (6.3 percentage points behind the EU). The main causes of cancer death in men were lung (77 per 100,000), prostate (56), colorectal (45) and stomach cancer (34). From the EU-CanIneq study for 2015 to 2019, men with lower education died of cancer at 776 per 100,000 and men with higher education at 364, a gap of 412 per 100,000, the second largest among 15 EU countries with data; for women the figures were 336 and 223. The female cancer mortality rate in 2021 was the same as the EU average, but for cervical cancer it was double the EU average under and over age 65. Daily smoking fell among men from 34% in 2014 to 30% in 2019, and male lung cancer deaths that are preventable fell by 35% between 2011 and 2021, against 27% across the EU. The share of adults who are overweight rose from 56% in 2017 to 59% in 2022, and alcohol consumption was 11 litres per head in 2022.",
          links: [
            { label: "OECD and European Commission: EU Country Cancer Profile Lithuania 2025, sections 2 and 3 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "EU Country Cancer Profile Lithuania 2025 (OECD record)", url: CCP_DOI },
          ],
        },
      ],
      tables: [
        {
          id: "lt-registry",
          title: "What the Lithuanian Cancer Registry reports",
          caption: "Headline figures from the National Cancer Institute's activity report for 2025, drawn from the registry; latest year given: 2022.",
          columns: [
            { key: "measure", label: "Measure" },
            { key: "all", label: "Both sexes" },
            { key: "men", label: "Men" },
            { key: "women", label: "Women" },
            { key: "year", label: "Year" },
          ],
          rows: [
            { measure: "New cancers registered", all: "16,413", men: null, women: null, year: "2022" },
            { measure: "New cancers per 100,000 (age-standardised, as the report gives it)", all: "287.9", men: null, women: null, year: "2022" },
            { measure: "New cancers per 100,000 (rate as the report gives it)", all: null, men: "638.7", women: "585.8", year: "2022" },
            { measure: "Cancer deaths per 100,000 (rate as the report gives it)", all: null, men: "328.4", women: "241.9", year: "2022" },
            { measure: "Commonest cancer and its share of cases", all: null, men: "Prostate, 21%", women: "Breast, 21%", year: "2022" },
            { measure: "People living after a cancer diagnosis", all: "about 138,500", men: null, women: null, year: "2022" },
            { measure: "Alive at least five years after diagnosis", all: null, men: "59%", women: "69%", year: "not stated" },
          ],
          note: "The report does not say which standard population its age-standardised rate uses, nor whether the separate rates for men and women are crude or standardised, nor whether the totals include non-melanoma skin cancer; they are shown as printed. Its 21% share for prostate cancer is lower than IARC's 34.8% for 2024; the report lists non-melanoma skin cancer (C44) among the most frequently registered cancers, which would lower every other cancer's share if counted, but it does not say so. The registry's open data portal holds the detailed tables but is a script-driven application and was not read for this page.",
          sources: [
            { label: "National Cancer Institute: activity report 2025, pages 13 to 15 (PDF, in Lithuanian)", url: NVI_REPORT_2025 },
            { label: "National Cancer Institute: Cancer Registry (in Lithuanian)", url: NVI_REGISTRY },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national registry kept since 1978",
      aside: { label: "Cancer Registry open data portal (in Lithuanian)", url: REGISTRY_PORTAL },
      cards: [
        {
          id: "registry-nvi",
          title: "A national registry at the National Cancer Institute, rebuilt in 2025 with an open portal",
          plain:
            "Hospitals and doctors who diagnose a cancer in Lithuania report it to the Cancer Registry at the National Cancer Institute in Vilnius. The registry holds records from 1978, receives more than 25,000 reports a year, and in 2025 moved to fully electronic reporting and opened a public website where anyone can look up its figures.",
          detail:
            "The registry's page states that it was established by Government resolution No. 806 of 11 August 2016 and began work under those regulations on 1 January 2017, and that the regulations of its information system were approved in July 2025 with the Ministry of Health as controller and the National Cancer Institute as keeper. Doctors report on form No. 090/a; from 1 January 2026 the registry also receives data from the national e-health system, and it checks its records against death certificates and the State Register of Deaths. Diagnoses are coded with ICD-10-AM and ICD-O-3.1, with grade since 2003 and TNM 8th edition stage since 2020. It has sent data to IARC's Cancer Incidence in Five Continents since 1998 and contributes to CONCORD, EUROCARE and the childhood cancer study IICC. A yearly report has been published since 1994, titled \"Vėžys Lietuvoje\" (Cancer in Lithuania) since 2006. The institute's December 2025 news page says the registry received budget funding in 2025 and is using artificial intelligence to process reports, and its 2025 report plans to automate much of cancer data collection by 2030. In September 2026 the institute signed a data-sharing agreement with the Institute of Hygiene, which holds national mortality statistics, to evaluate the screening programmes together.",
          links: [
            { label: "National Cancer Institute: Cancer Registry (in Lithuanian)", url: NVI_REGISTRY },
            { label: "National Cancer Institute: the Lithuanian Cancer Registry's modernisation begins (17 December 2025, in Lithuanian)", url: NVI_REGISTRY_REFORM },
            { label: "National Cancer Institute: partnership with the Institute of Hygiene (9 September 2026, in Lithuanian)", url: NVI_HI },
            { label: "National Cancer Institute: activity report 2025 (PDF, in Lithuanian)", url: NVI_REPORT_2025 },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: compulsory health insurance, and new cancer medicines that arrive late",
      aside: { label: "EU Country Cancer Profile Lithuania 2025 (OECD record)", url: CCP_DOI },
      cards: [
        {
          id: "psdf",
          title: "A single compulsory insurance fund pays for treatment, screening and palliative care",
          plain:
            "Cancer care in Lithuania is paid for by the Compulsory Health Insurance Fund (PSDF), run by the National Health Insurance Fund (VLK). It pays for the four screening programmes, free for the people they are meant for, and fully covers palliative care at home or in hospital. Even so, households pay for about 31% of all health spending themselves.",
          detail:
            "The Country Cancer Profile 2025 reports that the PSDF covers breast, cervical, colorectal and prostate cancer screening free of charge for the target groups, and that palliative care is fully covered in inpatient and outpatient settings once a GP has assessed the need, with up to 120 days of inpatient palliative treatment and nursing reimbursed. Until 2020 only 24 outpatient palliative services at home a year could be reimbursed; a 2020 amendment required providers of outpatient nursing to offer palliative care, made it available around the clock, and raised the reimbursable home visits to 52, 156 or 260 depending on need. Vilnius and Kaunas each have three public pain clinics and the other municipalities one each. The World Bank's series, from WHO's Global Health Expenditure Database, puts out-of-pocket payments at 31.4% of current health spending in 2024 (31.0% in 2023), government spending at 65.0% in 2023, and total health spending at 7.6% of GDP in 2024; the Country Cancer Profile gives 7.2% in 2022 against an EU average of 10.4%. The profile also reports that OECD modelling expects health spending on cancer per person to grow by 55% between 2023 and 2050. A VLK news page of 1 December 2021 put the fund's spending on cancer treatment in 2020 at more than EUR 280 million: EUR 35 million for outpatient services, EUR 93.5 million for inpatient services, almost EUR 27 million for centrally purchased medicines and medical aids, and EUR 126 million to reimburse anti-cancer medicines for almost 40,000 patients.",
          links: [
            { label: "OECD and European Commission: EU Country Cancer Profile Lithuania 2025, sections 4, 5.3 and 5.4 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "VLK: oncological diseases, will invest in both treatment and prevention (1 December 2021; Internet Archive copy)", url: VLK_2021 },
            { label: "World Bank API: out-of-pocket expenditure, Lithuania (SH.XPD.OOPC.CH.ZS)", url: WB_OOP },
            { label: "World Bank API: current health expenditure as % of GDP, Lithuania (SH.XPD.CHEX.GD.ZS)", url: WB_CHE },
          ],
        },
        {
          id: "reimbursement-wait",
          title: "1,141 days on average from European approval to reimbursement of new cancer medicines",
          plain:
            "A new cancer medicine approved for the whole EU is only free to patients in Lithuania once it is added to the national reimbursement list. On average this took more than three years, the second longest wait of 22 EU countries measured, and in April 2023 about 40% of a sample of high-benefit cancer treatments were reimbursed, against almost 60% across the EU.",
          detail:
            "The Country Cancer Profile 2025, drawing on an OECD working paper by Hofmarcher, Berchet and Dedet (2024), gives a mean of 1,141 days between approval by the European Medicines Agency and a decision on the public reimbursement list in Lithuania, against an EU average of 516 days, and 770 days for biosimilars. Of 13 indications of 10 new medicines for breast and lung cancer with a high clinical benefit, about 40% were on the reimbursement list on 1 April 2023, against almost 60% across the EU and 47% among countries of similar income; for 19 biosimilars of bevacizumab, rituximab and trastuzumab the share was 47%, against 65% across the EU. The profile reports that women with metastatic, aggressive breast cancer in Lithuania did not have access to newer protein kinase inhibitors in 2019. The State Medicines Control Agency (VVKT) evaluates each application and the Medicinal Products and Medical Aid Reimbursement Commission decides; the profile's figures on VVKT's backlog are in the regulator section below. The profile notes that the 2023 to 2025 implementation plan names VVKT but specifies no role for it beyond its ordinary business.",
          links: [
            { label: "OECD and European Commission: EU Country Cancer Profile Lithuania 2025, section 5.1 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "Hofmarcher, Berchet and Dedet, access to oncology medicines in EU and OECD countries (OECD Health Working Papers 170, 2024)", url: "https://doi.org/10.1787/c263c014-en" },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: VVKT, inside the European system",
      aside: { label: "EU Country Cancer Profile Lithuania 2025 (PDF, Internet Archive copy)", url: CCP_2025 },
      cards: [
        {
          id: "vvkt-approval",
          title: "Approval comes from the European Medicines Agency; Lithuania's agency decides the next step",
          plain:
            "As in every EU country, most new cancer medicines are authorised once for the whole EU, on the European Medicines Agency's assessment. Lithuania's State Medicines Control Agency (VVKT) then evaluates whether the national insurance fund should pay for them. The time between European approval and that decision is where Lithuanian patients wait.",
          detail:
            "The Country Cancer Profile 2025 describes VVKT as evaluating reimbursement applications and making recommendations, after which the Medicinal Products and Medical Aid Reimbursement Commission decides on inclusion in the reimbursable medicines list. Quoting the State Audit Office's 2023 audit of medicine availability, it reports that of 140 new drug applications made since January 2020, only 60 had a decision from VVKT by 12 September 2023, and 8 of those met the 180-day limit set by the EU Transparency Directive on pricing and reimbursement decisions; 66 applications were pending, with waits of between 223 and 902 days. VVKT's specialists assessing new drug applications rose from eight to ten in 2022, and more staff were trained with increased Ministry of Health funding; the profile says more clinical and pharmacoeconomic experts are needed to clear the backlog. VVKT's own pages could not be read for this page, so its procedures for national authorisations and clinical trial applications are not described here; see the gaps.",
          links: [
            { label: "OECD and European Commission: EU Country Cancer Profile Lithuania 2025, section 5.1 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "State Medicines Control Agency (VVKT)", url: "https://vvkt.lrv.lt" },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "WHO immunisation data: HPV coverage rows for Lithuania (API)", url: WHO_HPV_API },
      cards: [
        {
          id: "four-programmes",
          title: "Four free screening programmes, now moving from GP referral to invitations",
          plain:
            "Lithuania screens for breast, cervical, bowel and prostate cancer, free of charge. Until the end of 2024 people joined only when their family doctor told them about it, so taking part depended on how often they saw a doctor. From 2025 no referral is needed, breast screening was widened to women aged 45 to 74, and two hospitals began sending invitations.",
          detail:
            "The Country Cancer Profile 2025 dates the programmes: cervical screening fully reimbursed from July 2004 (a smear every three years at 25 to 34, an HPV test with liquid-based cytology every five years at 35 to 59), breast screening from October 2005 (a mammogram every two years at 50 to 69, from January 2025 at 45 to 74, with tomosynthesis introduced), prostate screening from January 2006, and colorectal screening covered from July 2009 and rolled out to the current target group aged 50 to 74 in January 2014, with a faecal immunochemical test every two years. Participation reached 58% for breast screening in 2022, 55% for cervical screening and 56% for colorectal screening, against national targets of 60% in 2023, 70% in 2024 and 80% in 2025; men took part in bowel screening less than women (50% against 60% in 2022). From 1 January 2025 a GP referral is no longer required, and Santaros Klinikos in Vilnius and Kauno Klinikos in Kaunas became co-ordination centres that invite people and manage the workflow for all programmes except prostate. A cancer found through screening puts the patient on the Green Corridor fast track.",
          links: [
            { label: "OECD and European Commission: EU Country Cancer Profile Lithuania 2025, section 4 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "Steponaviciene et al., breast cancer stage before and during mammography screening in Lithuania (Cancer Control 2019)", url: "https://doi.org/10.1177/1073274818821096" },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccine for girls since 2016 and boys since 2023",
          plain:
            "Lithuania offers the HPV vaccine to girls and boys aged 11 to 12. Girls have been vaccinated since 2016 and boys since 2023. In 2025, 62% of the girls and 62% of the boys targeted had completed the course, according to the figures Lithuania reported to the World Health Organization.",
          detail:
            "The Country Cancer Profile 2025 dates the national HPV programme for girls aged 11 to 12 to 2016 and for boys to 2023, with doses recorded in a national registry, and reports that 76% of 15-year-old girls had completed the course in 2023, which it counts among the highest in the EU, and that 43% of boys had received all recommended doses in 2023. In the programme coverage rows Lithuania reported to WHO, last-dose coverage of girls was 28% in 2017, between 63% and 68% in 2018 to 2022, 47% in 2023, 59% in 2024 and 62% of 14,320 girls in 2025; for boys it was 47% in 2023, 59% in 2024 and 62% of 14,885 in 2025, with first-dose coverage of boys at 61%. The two sources measure different groups (15-year-olds against the programme's target cohort), which may explain why their figures differ. Given that Lithuania's cervical cancer incidence and mortality are above the EU average, the profile advises sustaining the programme.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage rows for Lithuania (API)", url: WHO_HPV_API },
            { label: "OECD and European Commission: EU Country Cancer Profile Lithuania 2025, section 3 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Lithuania does",
      title: "What Lithuania does differently",
      cards: [
        {
          id: "psa-programme",
          title: "A national PSA testing programme since 2006",
          plain:
            "Lithuania has offered men the PSA blood test for prostate cancer through a national programme since 2006, now for men aged 50 to 69 and men from 45 with a family history. In its first ten years 70% of eligible men were tested at least once. The test can also find cancers that would never have caused harm, which has to be weighed against the benefit.",
          detail:
            "The Country Cancer Profile 2025 describes the programme: the GP orders a PSA test, usually every two years but up to every five if the level is low (under 1 ng/ml before age 60 or 2 ng/ml from 60), and refers men with a level above 3 ng/ml to a urologist who may perform a biopsy. In 2023, 25% of the target group took part. Patasius and colleagues, from the Cancer Registry, counted 16,061 prostate cancers registered within the programme in 2006 to 2015; coverage reached up to 45.5% in later rounds, 70% of eligible men were tested at least once, and screened men were more likely to be diagnosed with cancer confined to the prostate. Everatt and Gudavičienė found prostate cancer death rates falling by 1.7% a year from 2007 and judged any screening effect moderate and limited to men under 65. The profile says overdiagnosis and overtreatment need to be weighed against the benefits. Prostate cancer is a third of men's cancers in IARC's estimate, with an age-standardised incidence of 130.3 per 100,000. The National Cancer Institute is a partner in the EU project PRAISE-U+, started on 1 September 2026, which aims to help countries move from unorganised PSA testing to organised, risk-based screening.",
          links: [
            { label: "Patasius et al., ten years of the Lithuanian PSA programme (J Clin Med 2020)", url: "https://doi.org/10.3390/jcm9123826" },
            { label: "Everatt and Gudavičienė, breast and prostate cancer mortality in Lithuania 1986 to 2020 (BMC Public Health 2022)", url: "https://doi.org/10.1186/s12889-022-14207-4" },
            { label: "OECD and European Commission: EU Country Cancer Profile Lithuania 2025, section 4 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "National Cancer Institute: PRAISE-U project page (in Lithuanian)", url: "https://nvi.lt/projektas/prostatos-vezio-patikros-diegimas-es-praise-u/" },
          ],
        },
        {
          id: "green-corridor",
          title: "The Green Corridor: a care manager for every newly diagnosed patient",
          plain:
            "Waiting for tests and treatment has long been a problem in Lithuania. Since May 2023 a patient diagnosed with cancer, including through screening, is placed on a Green Corridor: a named oncology care manager arranges the tests, the specialist team's decision and the first treatment, and supports the patient through it.",
          detail:
            "The Country Cancer Profile 2025 records national waiting-time targets set in 2017: 30 calendar days from booking a diagnostic scan to the scan, 28 days from the first specialist visit to diagnosis, 14 days from diagnosis to the start of treatment, 30 days from registration to the start of chemotherapy or haematology treatment, and 60 days from registration to surgery. A State Audit Office review in 2018 found the measures to enforce them inadequate. The Green Corridor, implemented since May 2023, relies on an electronic patient queue system and a new post of oncology care manager, who gives logistical and emotional support and co-ordinates care until a multidisciplinary team confirms the diagnosis and prescribes the first treatment. The profile names six oncology clinics that form the Green Corridor's oncology cluster: Santaros Klinikos and the National Cancer Institute in Vilnius, Kauno Klinikos, Klaipėda University Hospital, Šiauliai Hospital and Panevėžys Hospital. Since 1 January 2025 the National Cancer Institute's clinical work has been run by the National Cancer Center of Santaros Klinikos, according to the institute's 2025 report. The profile says the outcome of the Green Corridor has yet to be assessed, and the patient association POLA has raised concerns about how patients enter it.",
          links: [
            { label: "OECD and European Commission: EU Country Cancer Profile Lithuania 2025, sections 4, 5.1 and 5.2 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "National Cancer Institute: activity report 2025 (PDF, in Lithuanian)", url: NVI_REPORT_2025 },
            { label: "POLA: about POLA (in Lithuanian)", url: POLA_ABOUT },
          ],
        },
        {
          id: "radiotherapy",
          title: "Radiotherapy: modern machines, but fewer than the European guideline",
          plain:
            "About 40% of people with cancer in Lithuania receive radiotherapy, below the 50% who would usually benefit. The machines are mostly new and use modern techniques, but there are 3.8 linear accelerators per million people, fewer than the European guideline, so each machine treats far more patients than in neighbouring countries.",
          detail:
            "The Country Cancer Profile 2025 counts 27 radiotherapy machines in Lithuania in 2024 (15 for photon and electron beam therapy, 4 X-ray generators and 8 for brachytherapy or electronic X-ray), about 80% installed in the previous 15 years, and a density that fell from 9 per million inhabitants in 2019 to 7 in 2023, against 8 across the EU; there is no proton therapy. Of the six oncology clinics, Panevėžys Hospital has no radiotherapy and Santaros Klinikos offered only brachytherapy when the profile was written. A census of all 11 Baltic radiotherapy centres for 2016 to 2023, by Korobeinikova and colleagues, found Lithuania at 3.8 linear accelerators per million, the only Baltic State below the ESTRO-QUARTS guideline of one per 250,000 people, with the highest external beam treatment rate (252 per 100,000 inhabitants in 2023) and nearly double the treatments per machine of Estonia and Latvia. By 2023 all Lithuanian linear accelerators could deliver IMRT, 64% VMAT and 64% stereotactic treatment. The authors call for a shared regional particle therapy centre.",
          links: [
            { label: "Korobeinikova et al., radiotherapy and diagnostic capacity in the Baltic States (Acta Oncol 2026)", url: BALTIC_RT },
            { label: "Full text (Europe PMC)", url: BALTIC_RT_FULL },
            { label: "OECD and European Commission: EU Country Cancer Profile Lithuania 2025, section 5.1 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research, trials and the cancer institutes",
      cards: [
        {
          id: "trials-in-lithuania",
          title: "53 cancer trials in OnCo's records have a site in Lithuania, two of them led from Lithuania",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, 53 of the trials in our records list a site in Lithuania, 15 of them recruiting when last captured. Almost all are international company trials; two, both in rectal cancer, are led by Lithuanian hospitals.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 53 trials list Lithuania among their countries, 47 of them phase 3 or phase 2/3, and 15 were recruiting at their last capture. They span prostate cancer (ARAMIS, ARANOTE, PREVAIL and a trial of opevesostat), lung cancer (KEYNOTE-671 and IMpower150), blood cancers (IMROZ, ELEVATE-TN and a trial of revumenib with chemotherapy in acute myeloid leukaemia), gastric cancer (RAINBOW and FORTITUDE-101), endometrial cancer (DUO-E) and melanoma (PRISM-MEL-301), and the SIOPEN high-risk neuroblastoma study in children. Two are led from Lithuania, both in rectal cancer: a phase 2 trial of neoadjuvant therapy run by the Lithuanian University of Health Sciences (NCT05378919), and a phase 2/3 trial of total neoadjuvant therapy and organ preservation run by the National Cancer Center of Santaros Klinikos (NCT06758830). This reflects the trials OnCo holds, not every study in Lithuania. For children, SIOP Europe's OCEAN project counted 7 of 436 European paediatric cancer trials (1.6%) running in Lithuania between 2010 and 2022, 6 of them international.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Lithuania (search)", url: CTGOV },
            { label: "SIOP Europe: childhood cancer country profile, Lithuania (PDF)", url: SIOPE_LT },
          ],
        },
        {
          id: "institutes",
          title: "The National Cancer Institute became a research institute in 2025, with its hospital now part of Santaros Klinikos",
          plain:
            "Lithuania's National Cancer Institute in Vilnius, founded in 1931, used to treat patients as well as run research. From 1 January 2025 its clinical work moved to a new National Cancer Center within Vilnius University Hospital Santaros Klinikos. The institute keeps its research laboratories, the Cancer Registry and a clinic for clinical trials.",
          detail:
            "The National Cancer Institute's activity report for 2025 states that the institute was founded in 1931, operates under the Law on the National Cancer Institute since 2014, and has the Ministry of Education, Science and Sport, the Ministry of Health and, since 2023, Vilnius University as its shareholders. After an agreement approved on 31 October 2024, its clinical work in diagnosis, treatment and follow-up passed on 1 January 2025 to the National Cancer Center, a newly created branch of Vilnius University Hospital Santaros Klinikos; the institute remains a state research institute licensed for clinical trials, genetic diagnostics and biobanking. Treatment is also given at Kauno Klinikos, Klaipėda University Hospital, Šiauliai and Panevėžys. For children, SIOP Europe's OCEAN profile lists two treating hospitals, Santaros Klinikos and Kauno Klinikos, with 11 of 13 treatment modalities available in the country, proton therapy not among them, and five-year survival of 73.8% for children aged 0 to 14 diagnosed in 2000 to 2013. The Country Cancer Profile reports that only 49% of 68 medicines essential for children's cancers were available in Lithuania in 2018, against 76% across the EU.",
          links: [
            { label: "National Cancer Institute: activity report 2025 (PDF, in Lithuanian)", url: NVI_REPORT_2025 },
            { label: "SIOP Europe: childhood cancer country profile, Lithuania (PDF)", url: SIOPE_LT },
            { label: "OECD and European Commission: EU Country Cancer Profile Lithuania 2025, section 6 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "lrv-unread",
      title: "Lithuanian government sites could not be read",
      plain:
        "The websites of the Ministry of Health, the National Health Insurance Fund (VLK), the State Medicines Control Agency (VVKT), the legal registers, the State Audit Office and Santaros Klinikos answered with a bot challenge, and the Internet Archive refused repeated requests. Apart from one archived VLK news page, what this page says about those bodies comes from the OECD and European Commission's profile.",
      detail:
        "On 11 November 2026 sam.lrv.lt, ligoniukasa.lrv.lt, vvkt.lrv.lt, e-seimas.lrs.lt, e-tar.lt, valstybeskontrole.lt, hi.lt and santa.lt returned a bot challenge to a plain request, which OnCo does not bypass, and the Internet Archive answered \"too many requests\" for most archived VLK pages; one VLK news page of December 2021 on cancer spending was read from its archived copy. As a result this page does not give: the health insurance contribution rates and who is covered, VLK's own budget for cancer care or its list of reimbursed cancer medicines, VVKT's procedures and timelines for national authorisations and clinical trial applications, the text of the State Audit Office's 2023 audit, the National Cancer Prevention and Control Programme 2014 to 2025 itself, or Santaros Klinikos' description of the new National Cancer Center. Each figure about them on this page is quoted from the Country Cancer Profile 2025, which cites those sources.",
      links: [
        { label: "National Health Insurance Fund (VLK)", url: "https://ligoniukasa.lrv.lt" },
        { label: "State Medicines Control Agency (VVKT)", url: "https://vvkt.lrv.lt" },
        { label: "OECD and European Commission: EU Country Cancer Profile Lithuania 2025 (PDF, Internet Archive copy)", url: CCP_2025 },
      ],
    },
    {
      id: "registry-detail",
      title: "The registry's detailed tables and survival by cancer were not read",
      plain:
        "The Cancer Registry's open data portal holds incidence, survival and mortality by cancer, sex and year, but it is a script-driven application that could not be read as text. This page uses the headline figures in the institute's 2025 report instead, and those leave some definitions unstated.",
      detail:
        "The figures in the registry table come from pages 13 to 15 of the National Cancer Institute's 2025 activity report. The report does not say which standard population its age-standardised rate of 287.9 uses, whether the sex-specific rates are crude, whether non-melanoma skin cancer is included, or which diagnosis years its five-year survival figures (59% for men, 69% for women) cover. The institute's December 2025 news page says the registry's information system holds 6,670,575 malignant cases since 1978, while its registry page counts more than 500,000 notifications; OnCo could not reconcile the two and uses neither as a count of patients. Survival by cancer site and stage, which the registry publishes, is therefore not shown here.",
      links: [
        { label: "Cancer Registry open data portal (in Lithuanian)", url: REGISTRY_PORTAL },
        { label: "National Cancer Institute: activity report 2025 (PDF, in Lithuanian)", url: NVI_REPORT_2025 },
        { label: "National Cancer Institute: the Lithuanian Cancer Registry's modernisation begins (in Lithuanian)", url: NVI_REGISTRY_REFORM },
      ],
    },
    {
      id: "plan-and-dates",
      title: "Whether the 2026 to 2030 cancer programme was adopted, and current figures for the Green Corridor",
      plain:
        "The national cancer programme ran to 2025. The Country Cancer Profile reported a new programme for 2026 to 2030 in preparation, but OnCo could not confirm whether it has been adopted, nor find published waiting times or outcomes for the Green Corridor since it began in May 2023.",
      detail:
        "The profile, published in February 2025, describes the Implementation Measures Plan 2023 to 2025 and a programme for 2026 to 2030 being prepared by the Monitoring Council for the Organisation of Oncological Care. The Ministry of Health's pages where its adoption would be announced could not be read. Likewise the profile says the outcome of the Green Corridor had yet to be assessed, and no later measured waiting times were found in the sources that could be read. The EFPIA Patients W.A.I.T. survey published in May 2026 includes Lithuania, but its country figures are in charts that do not extract as text and were not used; the 1,141-day figure on this page is the OECD's, for medicines approved earlier.",
      links: [
        { label: "OECD and European Commission: EU Country Cancer Profile Lithuania 2025 (PDF, Internet Archive copy)", url: CCP_2025 },
        { label: "EFPIA Patients W.A.I.T. Indicator 2025 survey, published May 2026 (PDF)", url: "https://www.efpia.eu/media/mnfdwzax/efpia-patients-wait-indicator-2025.pdf" },
      ],
    },
  ],
  institutions: [
    "nci-vilnius", "santaros-klinikos", "kauno-klinikos", "klaipeda-university-hospital", "lithuanian-cancer-registry", "lithuania-ministry-of-health",
    "vlk-lithuania", "vvkt-lithuania", "pola-lithuania", "psychosocial-oncology-association-lithuania", "youth-cancer-europe", "siop-europe", "ema", "iarc", "oeci",
  ],
  companies: [],
  drugs: ["bevacizumab", "rituximab", "trastuzumab"],
  trials: [
    "nct05378919", "nct06758830", "nct04221035", "aramis", "aranote", "prevail", "nct06136650", "keynote-671", "impower150", "imroz", "elevate-tn",
    "nct07211958", "rainbow", "fortitude-101", "duo-e", "prism-mel-301",
  ],
  papers: [
    "paper-patasius-lithuania-psa-screening-jcm-2020", "paper-everatt-lithuania-breast-prostate-mortality-bmcph-2022",
    "paper-steponaviciene-lithuania-mammography-stage-cancer-control-2019", "paper-korobeinikova-baltic-radiotherapy-capacity-acta-oncol-2026",
  ],
  people: ["valdas-peceliunas", "tomas-jovaisa", "renaldas-jurkevicius", "audrius-simaitis"],
  how:
    "Every card was written from sources read in full rather than through a summary: in Lithuanian, the National Cancer Institute's Cancer Registry page, its news pages and its 2025 activity report, and the patient association POLA's pages; in English, the OECD and European Commission's EU Country Cancer Profile: Lithuania 2025 (through the Internet Archive), SIOP Europe's childhood cancer profile for Lithuania, IARC's GLOBOCAN 2024 fact sheet, a December 2021 VLK news page on cancer spending (through the Internet Archive), WHO's HPV coverage rows and the World Bank's health spending series from their public APIs, and the papers through Europe PMC, including the full text of the 2026 Baltic radiotherapy census. Trials were counted from OnCo's ClinicalTrials.gov participation data. The Lithuanian government sites could not be read and are named under gaps. The new records added for this page (the Ministry, the Cancer Registry, VLK, VVKT, POLA and four papers) carry their own sources.",
  verify:
    "Incidence and death figures here are a mix of the registry's own count and IARC and European estimates, which use different standard populations. Which cancer medicines are reimbursed changes through the year: ask the treating oncologist or the National Health Insurance Fund what applies to you. Screening invitations changed in 2025 and may differ by area, so check with your family doctor or the co-ordination centres at Santaros Klinikos and Kauno Klinikos.",
  verifyLinks: [
    { label: "National Health Insurance Fund (VLK)", url: "https://ligoniukasa.lrv.lt" },
    { label: "Cancer Registry open data portal (in Lithuanian)", url: REGISTRY_PORTAL },
    { label: "OECD and European Commission: EU Country Cancer Profile Lithuania 2025 (PDF, Internet Archive copy)", url: CCP_2025 },
    { label: "POLA: patient association (in Lithuanian)", url: "https://pola.lt" },
  ],
};

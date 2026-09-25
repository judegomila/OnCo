/**
 * Germany deep dive: the hand-written cards for /countries/de/. Plain English first, detail second, every card
 * with its sources. Entity lists (institutions, companies, trials, papers, people) are pulled from the graph on
 * the page by id so they stay in step with the corpus. Figures are quoted only where the linked source states
 * them, and German sources were read in German.
 */
export type CountryCard = { id: string; title: string; plain: string; detail: string; links: Array<{ label: string; url: string }> };

export const DE_ASOF = "2026-09-25";

export const DE_PROFILE: CountryCard[] = [
  {
    id: "shape",
    title: "An old country's cancer profile: prostate, breast, lung and bowel, and survival around three in five",
    plain: "Germany counted about 517,800 new cancers and 228,960 cancer deaths in 2023, excluding the common skin cancers. Prostate is the commonest cancer in men, breast in women, and lung and bowel follow in both. Nearly half of German men and more than two in five German women will be told they have cancer at some point. About 65% of women and 61% of men are alive five years later.",
    detail: "The Robert Koch Institute's Krebs in Deutschland für 2021-2023, the fifteenth edition, published in 2025 with Deutsche Krebsregister e.V., puts 2023 at 241,440 new cancers in women and 276,350 in men, with 105,911 and 123,049 deaths. Prostate cancer leads with 79,610 cases, then breast with 75,860, lung with 58,340 and colorectum with 55,320. The median age at diagnosis is 69 for women and 71 for men. Relative five-year survival is 65 percent for women and 61 percent for men, and ten-year survival 60 and 55 percent, ranging from about 10 percent for pancreatic cancer and mesothelioma to 95 percent or more for melanoma and testicular cancer. About 1.7 million people in Germany are living with a cancer diagnosed in the past five years and nearly 4.8 million with one diagnosed in the past 25. Lifetime risk is 49 percent for men and 43 percent for women. Around 19 percent of new cancers are attributed to smoking, about 4 percent to chronic infections and about 6 percent of lung cancers to radon; the DKFZ puts the share due to avoidable or modifiable risk factors at at least 37 percent.",
    links: [
      { label: "Krebs in Deutschland für 2021-2023, 15th edition (RKI, 2025, PDF)", url: "https://www.krebsdaten.de/Krebs/DE/Content/Publikationen/Krebs_in_Deutschland/krebs_in_deutschland_2025.pdf?__blob=publicationFile" },
      { label: "ZfKD: Krebs gesamt fact sheet", url: "https://www.krebsdaten.de/Krebs/DE/Content/Krebsarten/Krebs_gesamt/krebs_gesamt_node.html" },
      { label: "Krebs in Deutschland 2025: all cancers, Table 3.1.1 (PDF)", url: "https://www.krebsdaten.de/Krebs/DE/Content/Publikationen/Krebs_in_Deutschland/kid_2025/kid_2025_c00_97_krebs_gesamt.pdf?__blob=publicationFile" },
    ],
  },
  {
    id: "two-sets-of-numbers",
    title: "Why the German numbers and the international numbers do not match",
    plain: "IARC's GLOBOCAN estimates 605,805 new cancers in Germany for 2022; the Robert Koch Institute counted 517,800 for 2023. Both are on this page. The gap is mostly method: they standardise against different populations, they do not include the same tumours, and GLOBOCAN models where the German registries count and then correct.",
    detail: "The rates are the clearer case. The RKI report states in its methods that it uses the old European standard population, which is younger-weighted than the World standard used by GLOBOCAN throughout this site, so the German age-standardised incidence of 346.9 per 100,000 in women and 418.1 in men is not comparable with GLOBOCAN's 274.24 for both sexes. The counts differ for other reasons: GLOBOCAN is a modelled estimate built from what registries publish rather than a national count, and the two do not draw the line around non-melanoma skin cancer in the same place. That cancer is the single largest confound in any German total: the RKI estimates about 242,820 cases of it in 2023 against 1,332 deaths, and excludes it from Krebs gesamt as is international practice. Where the two disagree, this page gives both figures with their cohorts rather than averaging them; the table here is GLOBOCAN, because it is the comparable source across every country page, and the cards quote the German registry because it is the better count of Germany.",
    links: [
      { label: "Krebs in Deutschland 2025: methods, including the standard population (PDF)", url: "https://www.krebsdaten.de/Krebs/DE/Content/Publikationen/Krebs_in_Deutschland/kid_2025/kid_2025_methoden.pdf?__blob=publicationFile" },
      { label: "IARC Global Cancer Observatory: Germany", url: "https://gco.iarc.who.int/today" },
    ],
  },
  {
    id: "lung-and-bowel",
    title: "What is actually changing: lung cancer in women, and bowel cancer falling for twenty years",
    plain: "German men's lung cancer rates have been falling since the late 1990s and women's have been rising, and the two are now close. Bowel cancer has been falling in both sexes for about twenty years, and the registry attributes part of that to colonoscopy. Melanoma is far commoner in Germany than in the rest of the EU, and prostate cancer is diagnosed more often, partly because of PSA tests bought privately.",
    detail: "The report calls the lung cancer divergence its flagship trend: age-standardised incidence in 2023 was 33.1 per 100,000 in women and 49.4 in men, against 33.3 and 52.7 in 2021, and it attributes about nine in ten male and eight in ten female cases to active smoking. Five-year relative survival is 25 percent in women and 19 percent in men, and the histology differs by sex, with adenocarcinoma in 48 percent of women against 41 percent of men. For colorectal cancer the report says flatly that incidence has fallen continuously in both sexes for about twenty years and that the decline in Germany and the United States is attributed at least in part to greater use of colonoscopy, whether for screening or for diagnosis; mortality has fallen 2.5 to 3 percent a year over the last decade. Against the EU as a whole in 2022 the report puts German melanoma incidence 39 percent higher in women and 32 percent higher in men, the largest excess of any site, with skin cancer screening offered from age 35 since mid-2008; prostate cancer incidence 17 percent higher, with the PSA test explicitly outside the statutory programme; and breast cancer incidence 6 percent higher but mortality 12 percent higher. An HPV vaccination signal is already visible: cervical cancer incidence is falling markedly in women up to about 35.",
    links: [
      { label: "Krebs in Deutschland 2025: lung, C33-C34 (PDF)", url: "https://www.krebsdaten.de/Krebs/DE/Content/Publikationen/Krebs_in_Deutschland/kid_2025/kid_2025_c33_c34_lunge.pdf?__blob=publicationFile" },
      { label: "Krebs in Deutschland 2025: colorectum, C18-C20 (PDF)", url: "https://www.krebsdaten.de/Krebs/DE/Content/Publikationen/Krebs_in_Deutschland/kid_2025/kid_2025_c18_c20_darm.pdf?__blob=publicationFile" },
      { label: "Krebs in Deutschland 2025: prostate, C61 (PDF)", url: "https://www.krebsdaten.de/Krebs/DE/Content/Publikationen/Krebs_in_Deutschland/kid_2025/kid_2025_c61_prostata.pdf?__blob=publicationFile" },
      { label: "Krebs in Deutschland 2025: cervix, C53 (PDF)", url: "https://www.krebsdaten.de/Krebs/DE/Content/Publikationen/Krebs_in_Deutschland/kid_2025/kid_2025_c53_gebaermutterhals.pdf?__blob=publicationFile" },
    ],
  },
];
export const DE_REGISTRIES: CountryCard[] = [
  {
    id: "mandatory",
    title: "Registering a cancer is a legal duty, and the doctor who reports it is paid for doing so",
    plain: "Since 2013 every German state has had to run a clinical cancer registry, and every doctor and dentist involved in diagnosing, treating or following up a cancer has to report it, including what treatment was given and what happened afterwards. The sickness funds pay the registry a fee for each new case and pay the reporting doctor a fee for each complete report.",
    detail: "The Krebsfrüherkennungs- und -registergesetz came into force on 9 April 2013 and inserted section 65c into Book V of the Social Code, which opens by making the Länder responsible for running clinical cancer registries to improve the quality of oncological care. The registries must record, at person level, every patient treated in hospital or as an outpatient in a defined catchment area, covering the occurrence, treatment and course of malignant neoplasms including their early stages and of benign central nervous system tumours, excluding cases reportable to the German Childhood Cancer Registry. Reporting runs on the onkologischer Basisdatensatz agreed by the ADT and the epidemiological registries, whose updated version was published in the Bundesanzeiger on 12 July 2021 and which has a nationwide uniform XML interface, so what is collected in Saxony and in Bavaria is the same data. Funding is set in section 65c(4): the sickness funds pay the registry a per-case flat rate, 141.73 euros in 2021 and indexed annually, calibrated to cover 90 percent of the registries' average operating costs, with the remainder falling to the Länder, and private insurers may pay the equivalent for their own members. Section 65c(6) separately obliges the registry to pay a reporting fee to the provider for each complete report, negotiated between the GKV-Spitzenverband, the German Hospital Federation and the association of statutory health insurance physicians. That last provision is the reason the data flow works.",
    links: [
      { label: "Section 65c SGB V: clinical cancer registries", url: "https://www.gesetze-im-internet.de/sgb_5/__65c.html" },
      { label: "The onkologischer Basisdatensatz (oBDS)", url: "https://www.basisdatensatz.de/" },
      { label: "Plattform Paragraf 65c: the expert body of the clinical registries", url: "https://www.plattform65c.de/" },
      { label: "BMG: Nationaler Krebsplan (PDF)", url: "https://www.bundesgesundheitsministerium.de/fileadmin/Dateien/5_Publikationen/Praevention/Broschueren/Broschuere_Nationaler_Krebsplan.pdf" },
    ],
  },
  {
    id: "zfkd",
    title: "Where the data goes: one federal centre that pools it, and deletes each year's copy after two years",
    plain: "The sixteen state registries send a defined set of fields to a centre at the Robert Koch Institute in Berlin, which checks completeness, removes duplicates across state borders and builds the national picture. It is required by law to delete each annual dataset after two years, which is a deliberate limit on how much it accumulates.",
    detail: "The Bundeskrebsregisterdatengesetz of 10 August 2009 established the Zentrum für Krebsregisterdaten at the Robert Koch Institute, which began work in January 2010, and defines Krebsregister to mean both the clinical registries under section 65c SGB V and the epidemiological registries of the Länder. Section 5 lists exactly what is transmitted: sex, month and year of birth, the first five digits of the municipality key and a one-off pseudonym; the ICD code, month and year of first diagnosis, histology, grading, nodes examined and involved, site, method of diagnostic confirmation including confirmation by death certificate alone, and TNM stage; surgery, radiotherapy, systemic treatment or watchful waiting and residual status; recurrence, remission and new metastasis; and month, year and causes of death. Data are due by 31 December of the following calendar year, and section 5(5) requires the centre to delete each annual dataset after two years. The centre checks completeness, deduplicates nationally using control numbers, publishes Krebs in Deutschland every two years and, from 2026 and then every five years, a summary report on cancer control. Continuous nationwide epidemiological registration has existed only since 2009; the earliest registry, Saarland, began in 1967 and Hamburg's goes back to 1926.",
    links: [
      { label: "Bundeskrebsregisterdatengesetz (BKRG)", url: "https://www.gesetze-im-internet.de/bkrg/BJNR270700009.html" },
      { label: "ZfKD: tasks", url: "https://www.krebsdaten.de/Krebs/DE/Content/ZfKD/Aufgaben/aufgaben_node.html" },
      { label: "ZfKD (English)", url: "https://www.krebsdaten.de/Krebs/EN/Home/homepage_node.html" },
    ],
  },
  {
    id: "how-complete",
    title: "How complete is it, and the institute's own answer: still an estimate, not a count",
    plain: "A German registry counts as complete when it records at least 90% of the cases a statistical model predicts. For 2023, twelve of the sixteen states cleared that bar. One state, Saxony-Anhalt, never has. The Robert Koch Institute says in its own words that it cannot yet say when the estimate will become a count.",
    detail: "The reference region for the 2023 data year comprises Schleswig-Holstein, Hamburg, Lower Saxony, Bremen, North Rhine-Westphalia, Hesse, Rhineland-Palatinate, Baden-Württemberg, Bavaria, Saarland, Berlin and Brandenburg. To qualify a registry must have registered nationwide for at least ten years, have exceeded 90 percent completeness for all cancers over the last five, and have a death-certificate-only share between zero and 15 percent. The institute names Saxony-Anhalt as the only registry never to have qualified in any diagnosis year. The last published per-state completeness figures date from 2019 and cover 2015 and 2016, and even those are bands rather than numbers: ten states at 90 percent or more, five of them above 95. The institute also flags a specific hole, warning that the transition to nationwide clinical and epidemiological registration temporarily cost some regions cases, particularly for diagnosis years 2015 to 2018. Death-certificate-only cases are treated as ordinary incident cases when estimating incidence, excluded when judging completeness, and excluded from survival analysis because the diagnosis date is unknown, which biases survival upwards; per-site shares for 2021 to 2023 run at 5 percent for colorectal cancer in women and 3 percent in men, 9 percent for lung cancer in both, and 3 percent for breast and prostate. A national all-cancer figure is not published. Survival is calculated from only six registries, and only those whose five-year survival for pancreatic cancer and metastatic lung cancer averages at most 8 percent, a proxy for deaths the registry missed.",
    links: [
      { label: "ZfKD: how incidence is estimated, and when an estimate becomes a count", url: "https://www.krebsdaten.de/Krebs/DE/Content/Methoden/Inzidenzschaetzung/inzidenzschaetzung_node.html" },
      { label: "ZfKD: completeness estimation, with the per-state bands", url: "https://www.krebsdaten.de/Krebs/DE/Content/Methoden/Vollzaehligkeitsschaetzung/vollzaehligkeitsschaetzung_node.html" },
      { label: "Krebs in Deutschland 2025: methods (PDF)", url: "https://www.krebsdaten.de/Krebs/DE/Content/Publikationen/Krebs_in_Deutschland/kid_2025/kid_2025_methoden.pdf?__blob=publicationFile" },
    ],
  },
  {
    id: "what-it-is-for",
    title: "What the registries are actually used for, which is not mainly statistics",
    plain: "The point of registering every cancer clinically is not the annual report. It is that the registry feeds each hospital back its own results, supplies the committee that runs cross-sector quality assurance, supports the certified centres, and lets researchers link treatment to survival across the whole country. That last use produced the largest study Germany has of whether certified centres save lives.",
    detail: "Section 65c lists the tasks in order: recording, then analysis, then feedback of results to individual providers, then data exchange with other regional registries and state-level evaluation units, support for interdisciplinary working, participation in the G-BA's cross-sector quality assurance, cooperation with certified cancer centres, supply to the epidemiological registries and to the federal centre, contribution to the reconciliation of screening data under section 25a, and supply of data for transparency and research. Two further deliverables were written into the statute: a concept for matching data to find comparable cases at a treating doctor's request, due at the end of 2023, and a concept for the systematic recording of late and long-term effects, due at the end of 2024. Section 65c(10) requires a joint evaluation commissioned by the sickness funds and the state health ministries, with a report due by 30 June 2026, on what the registries contribute to quality and to linking care with research; whether it has appeared we could not establish. The clearest demonstration of what the data can do is the WiZen study, which linked nine years of statutory insurance claims to four of the clinical registries to compare survival after treatment in certified and non-certified hospitals, and which could only adjust for tumour stage in the registry arm.",
    links: [
      { label: "Section 65c SGB V", url: "https://www.gesetze-im-internet.de/sgb_5/__65c.html" },
      { label: "WiZen: what registry linkage made possible (Dtsch Arztebl Int 2023)", url: "https://doi.org/10.3238/arztebl.m2023.0169" },
      { label: "ZfKD: current projects", url: "https://www.krebsdaten.de/Krebs/DE/Content/ZfKD/Projekte/projekte_node.html" },
    ],
  },
  {
    id: "not-counted",
    title: "What the registry does not count",
    plain: "Non-melanoma skin cancer is left out of the German total, although it is by far the commonest cancer: about 242,800 cases against 1,332 deaths in 2023. In-situ tumours, non-invasive bladder tumours, borderline ovarian tumours and benign brain tumours are reported but kept separate. Childhood cancers are counted by a different registry in Mainz, which is why the regional maps only cover adults.",
    detail: "Krebs gesamt excludes C44, as is international practice, because it contributes very little to cancer mortality and is recorded incompletely or not at all in many registries; the RKI still estimates it separately, at about 242,820 cases in 2023, with no completeness estimate at all, a different set of ten reference registries and figures restricted to 2006 onwards with, in the report's words, greater uncertainty. Incidence rose sharply after skin cancer screening began in mid-2008. The fifteenth edition added a separate chapter for the other reportable tumours: in-situ lesions, of which 31,642 are cervical with a median age of 39, non-invasive bladder tumours at 2,915 in women and 11,215 in men, 1,577 borderline ovarian tumours and 10,846 benign central nervous system tumours. Cancers in children and adolescents come from the Deutsches Kinderkrebsregister in Mainz, which has been more than 95 percent complete since about 1987 and holds around 80,000 cases, about 2,350 a year under 18; it supplies the federal centre only aggregated state-level data, which is why the new regional maps in the report cover adults aged 20 and over. Registration lag is about two years, and the editors explain rather than hide it: reporting is a legal duty but not an automatic one, and the registries spend heavily to capture the last few percent.",
    links: [
      { label: "Krebs in Deutschland 2025: other reportable tumours (PDF)", url: "https://www.krebsdaten.de/Krebs/DE/Content/Publikationen/Krebs_in_Deutschland/kid_2025/kid_2025_weitere_meldepflichtige_tumoren.pdf?__blob=publicationFile" },
      { label: "Deutsches Kinderkrebsregister, Mainz", url: "https://www.kinderkrebsregister.de/" },
      { label: "ZfKD: Krebs gesamt fact sheet", url: "https://www.krebsdaten.de/Krebs/DE/Content/Krebsarten/Krebs_gesamt/krebs_gesamt_node.html" },
    ],
  },
];
export const DE_PAYING: CountryCard[] = [
  {
    id: "gkv-pkv",
    title: "Two insurance systems, one benefits catalogue",
    plain: "Almost everyone in Germany is in statutory health insurance, a fund you pay into as a share of your income, with children and a non-earning spouse covered free. A minority, mostly civil servants, the self-employed and high earners, are privately insured instead and are billed per item. Cancer treatment is a benefit of both.",
    detail: "Statutory health insurance (gesetzliche Krankenversicherung, GKV) is compulsory for employees below an income threshold and is run by competing non-profit sickness funds; contributions are shared between employee and employer and do not depend on health or on how ill you become. Family members without their own income are covered at no extra cost (Familienversicherung, section 10 SGB V). What the funds must pay for is not decided by each fund but centrally, by the Gemeinsamer Bundesausschuss, so the benefits catalogue is the same wherever you are insured. Private comprehensive insurance (private Krankenvollversicherung, PKV) is an alternative for civil servants, the self-employed and employees above the threshold; premiums are risk-rated at entry and each family member is a separate policy, and doctors bill privately at a multiple of the statutory tariff. The practical difference in cancer care is less about which drugs you can have than about waiting times for appointments and imaging, the choice of consultant, and the single hospital room.",
    links: [
      { label: "Section 10 SGB V: Familienversicherung (Gesetze im Internet)", url: "https://www.gesetze-im-internet.de/sgb_5/__10.html" },
      { label: "Gemeinsamer Bundesausschuss: what statutory insurance covers", url: "https://www.g-ba.de/english/" },
      { label: "Bundesministerium für Gesundheit: Krankenversicherung", url: "https://www.bundesgesundheitsministerium.de/themen/krankenversicherung" },
    ],
  },
  {
    id: "what-it-costs",
    title: "What cancer costs a statutorily insured patient: capped at 2% of income, 1% if you are chronically ill",
    plain: "You pay 10% of the price of each prescription, never less than 5 euros and never more than 10, and 10 euros a day in hospital for at most 28 days a year. Everything you pay is added up, and once it passes 2% of your household's gross income for the year you pay nothing more. For someone in long-term treatment for a serious illness, which is what cancer is, the ceiling is 1%.",
    detail: "Section 61 SGB V sets the co-payment at 10 percent of the dispensing price, with a floor of 5 euros and a ceiling of 10 euros, and at 10 euros per calendar day for inpatient care; section 39(4) limits the hospital charge to 28 days in a calendar year, so at most 280 euros. Section 62 sets the annual burden limit (Belastungsgrenze) at 2 percent of the household's gross annual income for living costs, reduced to 1 percent for people in continuous treatment for the same serious chronic illness, with allowances deducted for a spouse and for each child. Once the limit is reached the fund issues an exemption for the rest of the year. The consequence is that the sticker price of a cancer medicine, however large, is not a number a German patient ever sees: on a gross household income of 40,000 euros the most a chronically ill patient pays in a year is 400 euros. What is not covered by this cap is income: statutory sick pay (Krankengeld) runs at 70 percent of gross earnings, capped at 90 percent of net, for up to 78 weeks for the same illness in three years, and loss of earnings, travel and childcare are the costs patients and charities describe.",
    links: [
      { label: "Section 61 SGB V: Zuzahlungen", url: "https://www.gesetze-im-internet.de/sgb_5/__61.html" },
      { label: "Section 62 SGB V: Belastungsgrenze", url: "https://www.gesetze-im-internet.de/sgb_5/__62.html" },
      { label: "Section 39 SGB V: hospital co-payment, 28 days", url: "https://www.gesetze-im-internet.de/sgb_5/__39.html" },
      { label: "Section 44 ff SGB V: Krankengeld", url: "https://www.gesetze-im-internet.de/sgb_5/__44.html" },
    ],
  },
];
export const DE_ASSESSMENT: CountryCard[] = [
  {
    id: "day-one",
    title: "Reimbursed on day one, judged afterwards, priced last: the sequence that is close to unique",
    plain: "In Germany a new cancer drug is paid for by statutory insurance the day it goes on sale, at whatever price the company asks. Only then is it assessed for how much better it is than the existing standard, and only then is the price negotiated. The negotiated price is backdated to the seventh month, and the difference is clawed back.",
    detail: "Under section 35a SGB V the company files a dossier by the day of launch; the Gemeinsamer Bundesausschuss sets the appropriate comparator therapy (zweckmäßige Vergleichstherapie), IQWiG assesses the dossier against it within three months, and the G-BA resolves on the added benefit within three months of that assessment being published, so about six months after launch. The company and the GKV-Spitzenverband then have six months to agree a reimbursement amount, with a three-month arbitration if they fail; in completed procedures from 2019 to 2024 about 95 percent ended in an agreed price and 5 percent in an arbitration award. Section 130b(3a) makes the agreed price apply from the seventh month after the substance first went on sale, and the difference against what was actually charged, including the pharmacy mark-up and VAT paid on it, is recovered. That seventh month used to be the thirteenth: the change was made by the GKV-Finanzstabilisierungsgesetz of 7 November 2022, in force from 12 November 2022. The consequence of the whole design is that German patients get new cancer medicines before anyone else in Europe, and that the German list price, set by the company for the first six months, anchors reference pricing across the continent.",
    links: [
      { label: "G-BA: benefit assessment of medicinal products (English)", url: "https://www.g-ba.de/english/benefitassessment/" },
      { label: "Section 35a SGB V: the assessment", url: "https://www.gesetze-im-internet.de/sgb_5/__35a.html" },
      { label: "Section 130b SGB V: the negotiation, arbitration and the seventh-month rule", url: "https://www.gesetze-im-internet.de/sgb_5/__130b.html" },
      { label: "G-BA: the procedure step by step", url: "https://www.g-ba.de/themen/arzneimittel/arzneimittel-richtlinie-anlagen/nutzenbewertung-35a/ablauf/" },
    ],
  },
  {
    id: "no-added-benefit",
    title: "What happens when the answer is no added benefit",
    plain: "Nothing is banned. A drug found to add nothing keeps its licence and can still be prescribed, but its price is pulled down to the cost of the therapy it was compared against. Some companies would rather withdraw the drug from Germany than accept that price, and about twenty have.",
    detail: "If the resolution puts the medicine in a reference price group there is no negotiation at all and the reference price applies. Otherwise section 130b(3) says a medicine with no proven added benefit should be given a reimbursement amount that does not produce higher annual therapy costs than the comparator the G-BA named, with the cheapest comparator used where several were named and a fifteen percent reduction where the comparator is itself a patent-protected medicine outside the assessment scheme. An orphan medicine whose added benefit is not proven after it crosses the revenue threshold must be appropriately cheaper than the comparator. The alternative is the opt-out: after the resolution and before the negotiation ends, the company may take the product off the German market. The GKV-Spitzenverband's register, updated 13 August 2026, carries twenty products with the status opt-out and two more with a mixed status, twenty-two in all since 2013, of which five are oncology: alpelisib, amivantamab, duvelisib, regorafenib and idecabtagene vicleucel. The German haematology and oncology society found that every opt-out in its cohort had been given no added benefit, and that withdrawals are concentrated in diabetes and metabolic medicine rather than cancer, with many later reversed, among them osimertinib, pomalidomide and necitumumab.",
    links: [
      { label: "GKV-Spitzenverband: the register of negotiated amounts and opt-outs", url: "https://www.gkv-spitzenverband.de/krankenversicherung/arzneimittel/verhandlungen_nach_amnog/ebv_130b/ebv_nach_130b.jsp" },
      { label: "Section 130b SGB V", url: "https://www.gesetze-im-internet.de/sgb_5/__130b.html" },
      { label: "DGHO: early benefit assessment of new medicines in Germany 2011-2020 (PDF)", url: "https://www.dgho.de/publikationen/schriftenreihen/fruehe-nutzenbewertung/awmf_amnog_2021_210x297_ok_ansicht_es.pdf" },
    ],
  },
  {
    id: "grades",
    title: "Six grades, and how often cancer drugs reach them",
    plain: "The verdict is one of six: major, considerable, minor, non-quantifiable, none proven, or worse than the comparator. Cancer drugs do better than average. On the industry association's count, 60% of oncology procedures showed some added benefit against 52% across all medicines, and the share has been falling: 58% in 2011 to 2013, 43% in 2023 to 2025.",
    detail: "Oncology is the largest single field in the scheme. The G-BA's own procedure database held 1,377 procedures on 25 September 2026, of which 1,257 were complete, and 588 oncology procedures of which 538 were complete, so cancer is about 43 percent of all completed assessments; 109 of the oncology procedures ran as orphan procedures. The G-BA does not publish an aggregate table of verdicts, so every published percentage comes from somebody counting for themselves, and the counts do not agree because the unit of analysis differs. The vfa, using the Pharm-Analytics database and taking the best rating per procedure from 2011 to March 2026, gives 2 percent major, 16 percent considerable, 15 percent minor, 19 percent non-quantifiable and 48 percent not proven across 1,201 procedures, with oncology the strongest field at 60 percent showing some added benefit. The DGHO, over 519 procedures from 2011 to 2020, found 41.1 percent not proven per procedure but 59.6 percent not proven per subgroup, and for oncology specifically fewer than 30 percent of procedures rated not proven as their best verdict. Those two oncology figures are not reconcilable and should not be averaged: the cohorts, end dates and definitions of oncology differ. One striking detail from the DGHO count: across six CAR-T procedures every subgroup was rated non-quantifiable, because there were no randomised data to compare.",
    links: [
      { label: "G-BA: the benefit assessment register, filterable by therapeutic area", url: "https://www.g-ba.de/bewertungsverfahren/nutzenbewertung/" },
      { label: "vfa: AMNOG in 10 Zahlen, 2026 edition (PDF)", url: "https://www.vfa.de/download/kurzreport-amnog-in-10-zahlen.pdf" },
      { label: "DGHO: early benefit assessment 2011-2020 (PDF)", url: "https://www.dgho.de/publikationen/schriftenreihen/fruehe-nutzenbewertung/awmf_amnog_2021_210x297_ok_ansicht_es.pdf" },
      { label: "G-BA: what the six added-benefit categories mean", url: "https://www.g-ba.de/themen/arzneimittel/arzneimittel-richtlinie-anlagen/nutzenbewertung-35a/zusatznutzen/" },
    ],
  },
  {
    id: "method-criticism",
    title: "The argument about the method: surrogates, single arms and a 15% rule for quality of life",
    plain: "IQWiG will not usually accept progression-free survival or tumour response as proof of benefit unless someone has shown, for that disease and that kind of drug, that they track how long people live. It will rarely accept a trial without a control group. And it only counts a quality-of-life difference if it reaches 15% of the scale. Industry says this is why good drugs get graded down; IQWiG says it is why companies should run better trials.",
    detail: "IQWiG's Allgemeine Methoden, version 7.0 of 19 September 2023, grades certainty in four steps, Beleg, Hinweis, Anhaltspunkt or none, and says most surrogate endpoints are unreliable and can be misleading, so they are normally considered only where they have been validated by statistical methods within a sufficiently narrow patient population and within comparable interventions, usually a meta-analysis of several randomised trials correlating treatment effects rather than individual outcomes. Validity is specific to both the disease and the mechanism. The oncology report behind this rule, rapid report A10-05 of 2011, examined validation studies in colorectal and breast cancer and concluded that they permit no final statement on the validity of tumour response measures for overall survival in those diseases. On uncontrolled trials the methods are equally plain: a before-and-after comparison without a control group generally yields no proof of effect, with exceptions only for near-deterministic conditions. For quality of life the institute identified 15 percent of the scale range as a plausible threshold for a change a patient can reliably feel, and does not use pre-specified responder criteria below it. In September 2026, on its thousandth assessment, IQWiG argued that manufacturers still submit evidence unfit for comparison, that a placebo comparison where a standard therapy exists can only yield no added benefit, and that comparative trials are feasible in rare diseases if the company wants them. The vfa's counter-example is trastuzumab deruxtecan in advanced breast cancer, where a survival and safety advantage was rated non-quantifiable because it rested on an age subgroup, and it names capmatinib and nivolumab with relatlimab among the cancer medicines not available in Germany, the latter because progression-free survival alone was not accepted. The German Cancer Society's own market access group, reviewing ten years of AMNOG from an oncology perspective, called the system largely proven but said its structures predate immuno-oncology, tumour-agnostic approvals and the splitting of entities by molecular marker.",
    links: [
      { label: "IQWiG: Allgemeine Methoden, version 7.0 (PDF)", url: "https://www.iqwig.de/methoden/allgemeine-methoden_version-7-0.pdf" },
      { label: "IQWiG rapid report A10-05: the informative value of surrogate endpoints in oncology (PDF)", url: "https://www.iqwig.de/download/a10-05_rapid_report_version_1-1_surrogatendpunkte_in_der_onkologie.pdf" },
      { label: "IQWiG, 1 September 2026: fifteen years of AMNOG, on its thousandth assessment", url: "https://www.iqwig.de/presse/pressemitteilungen/pressemitteilungen-detailseite_183106.html" },
      { label: "vfa: what the association says has gone wrong since the 2022 reform", url: "https://www.vfa.de/de/gesundheit-versorgung/amnog/amnog-fehlentwicklungen.html" },
      { label: "Bartol 2023: ten years of AMNOG from an oncological perspective (J Cancer Res Clin Oncol)", url: "https://doi.org/10.1007/s00432-022-04379-2" },
    ],
  },
  {
    id: "guardrails",
    title: "The price guardrails of 2022, and their repeal in July 2026",
    plain: "In 2022 Germany added rules forcing the price of a drug with no, minor or unmeasurable added benefit below or level with the comparator, and a flat 20% discount on drugs used in combination. Industry said this punished real benefit. Those rules were narrowed in 2025 and then abolished on 30 July 2026, replaced by tendered rebate contracts within classes of comparable drugs, three of which are cancer classes.",
    detail: "The GKV-Finanzstabilisierungsgesetz of 7 November 2022 inserted guardrails into section 130b(3): a drug with no added benefit whose comparator was still patent-protected had to be priced at least 10 percent below it; a drug with only minor or non-quantifiable added benefit could not exceed the comparator's cost at all. Section 130e added a 20 percent discount on medicines used in a combination named by the G-BA, removable only if the G-BA found the combination likely to have at least considerable added benefit. The same law cut the orphan revenue threshold from 50 to 30 million euros, raised the manufacturer discount to 12 percent for 2023 and extended the price moratorium to 2026. The Medizinforschungsgesetz, in force 1 January 2025, disapplied the two guardrails for medicines whose trials were conducted to a relevant extent in Germany and added a confidential reimbursement amount option at a 9 percent discount. The GKV-Beitragssatzstabilisierungsgesetz of 24 July 2026, in force 30 July 2026, then replaced the guardrail sentences with the plain rule that a drug with no added benefit must not cost more than the comparator, and replaced section 130e entirely with a regime letting sickness funds tender exclusive rebate contracts within groups of therapeutically comparable patent-protected medicines, limited until the end of 2030 to five classes: JAK inhibitors, CGRP antagonists, PARP inhibitors, PCSK9 inhibitors and PD-1 and PD-L1 inhibitors. Three of those five are oncology. A mandatory price-volume rule was added at the same time. The seventh-month rule and the 30 million euro orphan threshold survive both later laws.",
    links: [
      { label: "GKV-Finanzstabilisierungsgesetz 2022: the amending text", url: "https://www.buzer.de/gesetz/15550/a291011.htm" },
      { label: "GKV-Beitragssatzstabilisierungsgesetz 2026: the amending text", url: "https://www.buzer.de/gesetz/17632/a340690.htm" },
      { label: "Section 130e SGB V as it now reads: rebate contracts for comparable patent-protected medicines", url: "https://www.gesetze-im-internet.de/sgb_5/__130e.html" },
      { label: "Section 35a SGB V: the 30 million euro orphan threshold", url: "https://www.gesetze-im-internet.de/sgb_5/__35a.html" },
    ],
  },
  {
    id: "speed",
    title: "The price of the design: Germany is the fastest country in Europe for a new cancer medicine",
    plain: "Counting from the day a medicine is approved for the European Union to the day it is on a public reimbursement list, Germany takes a median of 56 days, and 47 days for cancer medicines. The European average is 532 days, and 598 for cancer. All 56 of the cancer medicines in the survey were available in Germany; the EU average was 28.",
    detail: "The EFPIA Patients W.A.I.T. Indicator, compiled by IQVIA and published in May 2026, followed 168 innovative medicines centrally authorised in the EU between 2021 and 2024 across 36 countries, with availability measured to 5 January 2026 and a deliberate one-year lag. Availability means inclusion on a country's public reimbursement list, including limited availability. Germany's median wait of 56 days across all products and 158-day mean was the fastest in the survey, ahead of Switzerland at 212, Austria at 259, Denmark at 268 and England at 282; Romania was slowest at 1,201. For oncology alone Germany's median was 47 days against a European average of 598, with Romania at 1,227 and Portugal at 1,026. Germany had all 56 oncology medicines available, the only country at 100 percent, ahead of Austria at 51 and Italy at 50, against an EU27 average of 28. The survey also records that across Europe full availability on public reimbursement lists has fallen from 42 percent of products in 2019 to 28 percent in 2025. The trade-off Germany has accepted is that it pays the company's own price for the first six months of every new medicine, and recovers the difference afterwards.",
    links: [
      { label: "EFPIA Patients W.A.I.T. Indicator 2025 survey, published May 2026 (PDF)", url: "https://www.efpia.eu/media/mnfdwzax/efpia-patients-wait-indicator-2025.pdf" },
      { label: "EFPIA: patients in Europe waiting longer for new medicines", url: "https://www.efpia.eu/news-events/the-efpia-view/statements-press-releases/patients-in-europe-waiting-longer-for-new-medicines-as-inequality-grows-between-member-states/" },
    ],
  },
  {
    id: "eu-jca",
    title: "Europe now does part of the assessment, starting with cancer",
    plain: "Since 12 January 2025 a joint clinical assessment is done once for the whole European Union, and cancer medicines and advanced therapies were the first in scope. It describes the clinical results but deliberately does not say whether there is added benefit. That judgement stays national, so the German verdict still decides the German price.",
    detail: "Regulation (EU) 2021/2282 applies from 12 January 2025, with article 7(2) phasing scope: medicines with a new active substance whose therapeutic indication is the treatment of cancer, and advanced therapy medicinal products, from 2025; orphan medicines from 13 January 2028; all other medicines from 13 January 2030. New indications for medicines already assessed are in scope too, which matters in oncology where indication extensions dominate. Article 13 requires member states to give due consideration to the joint report, annex it to the national assessment, and not ask again at national level for evidence already submitted at Union level, while expressly preserving their competence to draw their own conclusions on overall clinical added value. The G-BA puts it bluntly: the joint report draws no conclusion about added benefit against the existing standard of care. In practice the German assessment generally starts after the European one finishes, the G-BA supplies the German comparator question into the European scoping, and IQWiG acts as assessor or co-assessor and leads the methodology working group. Four joint assessments had been published by 1 September 2026. IQWiG's own hope is that assessment running in parallel with licensing gives companies an earlier reason to design comparative trials.",
    links: [
      { label: "Regulation (EU) 2021/2282 on health technology assessment", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX%3A32021R2282" },
      { label: "G-BA: the EU HTA Regulation and how it meets the German procedure", url: "https://www.g-ba.de/themen/arzneimittel/arzneimittel-richtlinie-anlagen/nutzenbewertung-35a/eu-hta-verordnung/" },
      { label: "IQWiG: European benefit assessment", url: "https://www.iqwig.de/presse/im-fokus/europaeische-nutzenbewertung/" },
    ],
  },
];
export const DE_REGULATOR: CountryCard[] = [
  {
    id: "who-approves",
    title: "Nobody in Germany approves a modern cancer drug: Europe does",
    plain: "A new cancer medicine is authorised for the whole European Union by the European Commission on the advice of the European Medicines Agency, and that authorisation is valid in Germany without a German decision. Germany's two national medicines agencies do the assessing inside that procedure, license clinical trials, and handle the products that never go through Brussels.",
    detail: "Section 77 of the Arzneimittelgesetz splits the national competence in one sentence: the Bundesinstitut für Arzneimittel und Medizinprodukte (BfArM, Bonn and Cologne, about 1,350 staff) is the competent federal higher authority unless the Paul-Ehrlich-Institut is, and the Paul-Ehrlich-Institut (PEI, Langen) is competent for sera, vaccines, blood and tissue preparations, allergens, advanced therapy medicinal products, xenogeneic medicines and genetically engineered blood components. In oncology that means BfArM takes the cytotoxics, kinase inhibitors and hormonal agents and PEI takes every CAR-T, oncolytic virus, gene-modified cell product and therapeutic cancer vaccine, along with its antibody portfolio. Both act as rapporteur or co-rapporteur inside the EMA centralised procedure rather than granting a separate German licence; PEI says it frequently takes the (co-)rapporteur role for advanced therapies at the CAT and CHMP and was often the lead assessor on the CAR-T products. Clinical trials need one decision from the competent federal authority under section 42(2) AMG plus a favourable opinion from a Land ethics committee, submitted through CTIS under EU Regulation 536/2014; the Medizinforschungsgesetz added a specialised ethics committee and a shortened timetable for trials run only in Germany.",
    links: [
      { label: "Section 77 AMG: which agency is competent", url: "https://www.gesetze-im-internet.de/amg_1976/__77.html" },
      { label: "BfArM: tasks", url: "https://www.bfarm.de/EN/BfArM/Tasks/_node.html" },
      { label: "Paul-Ehrlich-Institut: the institute", url: "https://www.pei.de/EN/institute/institute-node.html" },
      { label: "BfArM: authorisation of clinical trials", url: "https://www.bfarm.de/DE/Arzneimittel/Klinische-Pruefung/Genehmigungsverfahren/_node.html" },
      { label: "PEI FAQ: ATMP authorisation and the rapporteur role", url: "https://www.pei.de/DE/service/faq/arzneimittel/faq-atmp-node.html" },
    ],
  },
  {
    id: "hospital-exemption",
    title: "The hospital exemption: a German university hospital holds its own licence for a CAR-T",
    plain: "European law lets a hospital make a cell or gene therapy for its own patients, to a doctor's prescription and not as a routine product, without the usual marketing authorisation. Germany uses it. In September 2025 Heidelberg University Hospital was granted a national approval for its own CD19 CAR-T cell product.",
    detail: "Section 4b of the Arzneimittelgesetz disapplies the authorisation chapter for advanced therapy medicinal products that are prescribed for an individual patient, made to specific quality standards but not routinely, and used in a specialised healthcare facility under a doctor's responsibility; supplying such a product to others still needs a permission from the competent federal authority, granted by the Paul-Ehrlich-Institut, with the facilities named, the expected number of patients a year stated and a risk-management plan. PEI says a product still in development counts as not routinely manufactured and that a section 4b permission allows it to be marketed, the point being early patient access. PEI's table of gene therapy medicinal products lists eighteen entries: seventeen with EU/1 numbers from the centralised procedure, and one national permission, HD-CAR-19 (heidagen-lecleucel), Universitätsklinikum Heidelberg, PEI.A.12181.01.1, dated 23 September 2025. The somatic cell therapy and tissue-engineered tables carry four more national permissions. PEI does not publish a running count of section 4b permissions, so the total granted is not knowable from its pages.",
    links: [
      { label: "Section 4b AMG: advanced therapies not routinely manufactured", url: "https://www.gesetze-im-internet.de/amg_1976/__4b.html" },
      { label: "PEI: gene therapy medicinal products authorised in Germany (HD-CAR-19 listed)", url: "https://www.pei.de/DE/arzneimittel/atmp/gentherapeutika/gentherapeutika-node.html" },
      { label: "PEI: permissions for ATMP under section 4b(3) AMG, including the fee range", url: "https://www.pei.de/DE/regulation/genehmigungen/atmp-4b-amg/atmp-4b-amg-node.html" },
    ],
  },
];
export const DE_CERTIFICATION: CountryCard[] = [
  {
    id: "how-certification-works",
    title: "Certification: published criteria, a named surgeon's case count, and an auditor who visits every year",
    plain: "Germany writes down what a cancer centre has to have, sends trained oncologists to check it on site, and publishes the result. There are three levels: a centre for one organ, a centre covering several, and a small number of comprehensive centres with a research remit. At the end of 2025 there were 2,294 certified centres across 2,429 sites, more than 190 of them outside Germany.",
    detail: "The programme is run jointly by the Deutsche Krebsgesellschaft and Deutsche Krebshilfe. Certification commissions of about thirty mandated members, drawn from some fifty learned societies, professional bodies and patient organisations, write the Erhebungsbogen, the requirements document; OnkoZert, an independent institute in Neu-Ulm, runs the audits with two to eight trained oncologist auditors; a separate committee awards the certificate, so the bodies that write the rules, apply them and decide are deliberately kept apart. The first Brustkrebszentren were certified against an Erhebungsbogen from 2003, after national and international analyses found unexplained variation in breast cancer care; colorectal followed in 2006, prostate, lung, gynaecology, skin and the first Onkologische Zentren in 2008, and entities have been added almost every year since, most recently penile and biliary carcinoma in 2023. An Onkologisches Zentrum must hold at least two organ-centre certificates. The Onkologische Spitzenzentren, the top tier, are assessed and funded by Deutsche Krebshilfe, which currently supports fifteen sites and networks. The certificate is valid three years, with an on-site surveillance audit every year and a full repeat audit before renewal; a non-conformity must be rectified within three months.",
    links: [
      { label: "Deutsche Krebsgesellschaft: certification, with the current centre count", url: "https://www.krebsgesellschaft.de/zertifizierung.html" },
      { label: "DKG: how the rule-making, auditing and awarding are kept separate", url: "https://www.krebsgesellschaft.de/unsere-themen/zertifizierung/transparenz" },
      { label: "OnkoZert: the audit procedure", url: "https://www.onkozert.de/zertifizierung/ablauf/" },
      { label: "Jahresbericht der zertifizierten Onkologischen Zentren 2026 (PDF)", url: "https://www.krebsgesellschaft.de/files/content/unsere-themen/zertifizierung/jahresberichte/onkologische-zentren/2026_jahresbericht-oz-de-a1_260720.pdf" },
      { label: "Deutsche Krebshilfe: the funded Onkologische Spitzenzentren", url: "https://www.krebshilfe.de/helfen/rat-hilfe/onkologische-spitzenzentren/" },
    ],
  },
  {
    id: "what-the-criteria-say",
    title: "What the criteria actually demand, in numbers",
    plain: "A breast cancer centre must treat at least 100 new patients a year and each named breast surgeon at least 50 operations. A bowel centre needs 30 colon and 20 rectal cancers a year, and each named bowel surgeon 15 and 10. The tumour board must meet weekly with named specialties present. At least 5% of patients must be entered into a study, and if the centre loses track of more than 40% of its patients at follow-up it cannot be recertified.",
    detail: "The Erhebungsbögen are published documents, one per entity, and the numbers are explicit. Breast (version of 11 December 2025): at least 100 primary cases a year per centre counting invasive carcinoma and DCIS; at least 50 breast operations a year per named surgeon; radiologists reading mammograms of at least 1,000 patients a year, or 500 plus a biennial test; at least 25 minimally invasive interventions a year per operator. Colorectal (16 December 2025): 30 colon and 20 rectal carcinomas a year per centre, at least two named bowel surgeons at 15 and 10 primary cases each, and pancreas 25, stomach 30, liver and biliary 40, oesophagus 40 per centre as separate modules. Both require a tumour board at least weekly with consultant-grade attendance by the surgeon, radiologist, pathologist, radiation oncologist and medical oncologist evidenced by an attendance list, each cooperation partner at least monthly, and telephone conferences without images are not accepted. Both require at least one full-time social worker per 400 patients counselled, a named psycho-oncologist with recognised training and documented distress screening. The follow-up thresholds are graded: 80 percent or more is the requirement for recertification, 60 to 79 percent allows it only with conditions, and below 60 percent recertification is not possible. In the 2024 data year, breast centres met the 5 percent study quota with a median of 13.2 percent, and colorectal centres with 16.7 percent, but only 81.5 percent of breast sites reached the distress screening target of 65 percent, with a site-level range of 0 to 100 percent.",
    links: [
      { label: "DKG: the Erhebungsbögen and data sheets, by entity", url: "https://www.krebsgesellschaft.de/unsere-themen/zertifizierung/erhebungsboegen-und-dokumente" },
      { label: "Jahresbericht Brustkrebszentren 2026: quality indicators against their targets (PDF)", url: "https://www.krebsgesellschaft.de/files/content/unsere-themen/zertifizierung/jahresberichte/brustkrebszentren/qualitaetsindikatoren_brustkrebs_2026-a1_260630.pdf" },
      { label: "Jahresbericht Darmkrebszentren 2026 (PDF)", url: "https://www.krebsgesellschaft.de/files/content/unsere-themen/zertifizierung/jahresberichte/darmkrebszentren/qualitaetsindikatoren_darmkrebs_2026-a1_260506.pdf" },
      { label: "OncoMap: find a certified centre", url: "https://www.oncomap.de/" },
    ],
  },
  {
    id: "wizen",
    title: "WiZen: the study that asked whether it makes any difference, and what it can and cannot show",
    plain: "Germany funded a study linking nine years of insurance claims for AOK members with four cancer registries to compare survival after first treatment in a certified centre against a hospital without one. Across eleven cancers the risk of death was lower in certified centres for most, by a little for lung cancer and by a lot for breast. The authors say plainly that this does not prove the certificate caused it.",
    detail: "WiZen, funded by the G-BA's Innovationsfonds and led from TU Dresden, used AOK claims from 2009 to 2017 linked with the Regensburg, Dresden, Erfurt and Berlin-Brandenburg cancer registries, with Cox models adjusted for age, sex, metastasis, comorbidity, hospital size, ownership and teaching status, and for UICC stage in the registry arm. Adjusted hazard ratios for overall survival in certified versus non-certified hospitals ran from 0.77 (breast, 143,720 patients) to 0.97 (lung, 172,901), with colon 0.92, rectum 0.90, pancreas 0.88, cervix 0.83, ovary 0.88, prostate 0.83, endometrium 0.92, neuro-oncological 0.92 and head and neck 0.94; the simulated gain over eight years ranged from 0.62 months for lung to 4.61 months for cervical cancer. Four of the eleven lost significance after the authors' own Bonferroni correction: endometrium, lung, neuro-oncology and head and neck. The two data sources disagree in ways worth noticing: only five entities were significant in both, and for rectum, pancreas and ovary the registry analysis, which could adjust for stage, showed no effect at all, while for lung the registry analysis showed one (0.85) where the claims analysis did not. The authors list their own limitations: no causal interpretation, no socioeconomic status, no stage in claims data, and, most importantly, that certification requires a minimum case volume, so part of the result may simply be volume. A companion analysis estimated that 537,396 of the study population, 68.7 percent, were treated outside certified hospitals.",
    links: [
      { label: "Schmitt 2023: initial cancer treatment in certified versus non-certified hospitals (Dtsch Arztebl Int)", url: "https://doi.org/10.3238/arztebl.m2023.0169" },
      { label: "WiZen final report to the Innovationsfonds, 17 October 2022 (PDF)", url: "https://innovationsfonds.g-ba.de/downloads/beschluss-dokumente/268/2022-10-17_WiZen_Ergebnisbericht.pdf" },
      { label: "Schoffer 2022: pancreatic cancer, median survival 8.0 versus 4.4 months (BMC Cancer)", url: "https://doi.org/10.1186/s12885-022-09731-w" },
      { label: "Bierbaum 2023: years of life lost if everyone were treated in a certified centre (Gesundheitswesen)", url: "https://doi.org/10.1055/a-2132-6797" },
    ],
  },
  {
    id: "wizen-criticism",
    title: "The argument against: case mix, volume, and an effect too large to be a certificate",
    plain: "Critics in the same journal say the comparison cannot be trusted. Certified hospitals may simply be treating different patients. One editorial shows that the pancreatic result could be explained entirely by certified centres seeing more neuroendocrine tumours, which have a far better prognosis. A urologist points out that the prostate effect claimed is bigger than the effect of the operation itself in a randomised trial.",
    detail: "Andreas Stang's editorial argues the evidence base for external inspection against standards is weak, that claims data contain neither morphology, grading nor stage, and that hospital and surgeon case volume are the better-established determinants of outcome. His quantitative bias analysis for North Rhine-Westphalia estimates that neuroendocrine neoplasms, with a relative five-year survival of about 65 percent against 11 percent for adenocarcinoma, make up roughly 28 percent of pancreatic cases in certified centres and 8 percent outside, which alone could account for the reported effect; he also notes that missing UICC stage was at least twice as common for non-certified patients in most entities, and that 60 percent of non-certified pancreatic patients were treated in hospitals of under 300 beds against 2 percent of certified ones. Michael Fröhner argues the prostate result, a hazard ratio of 0.83 and about eight percentage points of five-year survival, exceeds what radical prostatectomy itself achieved against conservative management in the PIVOT randomised trial, so it is more plausibly selection of younger, fitter, asymptomatic men. Ernst Hanisch questions risk adjustment built on billing data. The authors reply that the design meets the criteria of a target trial emulation and that the result holds on Bradford-Hill grounds. A separate population study in Upper Franconia found that although 90.1 percent of tumours could have been treated in a certified network, only about half of care actually was, from 79.5 percent for breast cancer to 2.7 percent for lung and zero for anal cancer and mesothelioma, which is the practical limit on any policy of simply referring everyone.",
    links: [
      { label: "Stang 2023: evaluability of the effect of oncology centre certification (Dtsch Arztebl Int)", url: "https://doi.org/10.3238/arztebl.m2023.0184" },
      { label: "Fröhner 2024: certification does not necessarily reduce mortality (Dtsch Arztebl Int)", url: "https://doi.org/10.3238/arztebl.m2023.0264" },
      { label: "Schmitt 2024: the authors' reply (Dtsch Arztebl Int)", url: "https://doi.org/10.3238/arztebl.m2023.0265" },
      { label: "2024: what share of care in Upper Franconia actually happened in a certified network (BMC Health Serv Res)", url: "https://doi.org/10.1186/s12913-024-11972-3" },
    ],
  },
  {
    id: "minimum-volumes",
    title: "The other lever: minimum operation numbers with the law behind them",
    plain: "Separately from certification, the Federal Joint Committee sets a legal minimum number of operations a hospital site must do each year, or it may not do them at all. Oesophagus 26, pancreas 20, breast 100, lung 75, and colon and rectum are being phased in. Stomach cancer surgery joins from 2031, which is expected to concentrate the operation from about 705 sites to about 120.",
    detail: "The Mindestmengenregelungen under section 136b(1) SGB V apply per hospital site, and a hospital must file a forecast with the regional sickness fund associations by 7 August for the following year or lose the right to perform the service. The catalogue in force from 6 August 2026 sets complex oesophageal procedures at 26 a year, complex pancreatic procedures at 20, breast cancer surgery at 100, thoracic surgery for lung carcinoma at 75, colon cancer surgery at 30 and rectal cancer surgery at 20, alongside transplantation, allogeneic stem cell transplantation and orthopaedic fields. The cancer figures are recent and phased: breast and lung had no minimum in 2022 and 2023, then 50 and 40 in 2024 before the full figures; colon and rectum have no minimum in 2025 and 2026, then 20 and 15 in 2027, rising to 30 and 20 by 2029. On 18 June 2026 the committee added elective gastric cancer surgery at 20 a year from 2031, having modelled that 705 sites performed at least one such procedure in 2023 and that about 120 would remain, with average travel time to the nearest clinic rising from 13 to 23 minutes; states may grant exemptions where comprehensive provision would be at risk. The two systems measure different things: the G-BA minimum is per site with the loss of the operation as the sanction, while certification also counts cases per named surgeon, which no G-BA rule does.",
    links: [
      { label: "G-BA: Mindestmengenregelungen", url: "https://www.g-ba.de/richtlinien/5/" },
      { label: "Mindestmengenregelungen in force 6 August 2026 (PDF)", url: "https://www.g-ba.de/downloads/62-492-4202/Mm-R_2026-08-06_iK-2026-08-06.pdf" },
      { label: "G-BA press release, 18 June 2026: minimum volume for gastric cancer surgery", url: "https://www.g-ba.de/presse/pressemitteilungen-meldungen/1337/" },
    ],
  },
];
export const DE_PRECISION: CountryCard[] = [
  {
    id: "nngm",
    title: "nNGM: how a lung cancer patient in Germany gets sequenced, and who pays before anyone has to",
    plain: "Germany did not wait for genomic testing in lung cancer to be added to the national benefits catalogue. A network of university centres signed contracts directly with the sickness funds, so the test is paid for by whoever insures you. Sixty-six funds have signed, covering almost every patient in the country.",
    detail: "The nationale Netzwerk Genomische Medizin (nNGM) Lungenkrebs grew out of the Cologne Network Genomic Medicine, running comprehensive molecular pathology on a single diagnostic platform at University Hospital Cologne since 2012 under Jürgen Wolf and Reinhard Büttner; Deutsche Krebshilfe rolled the model out nationally with one of its largest single grants, from 1 April 2018. The site lists 29 network centres and more than 500 network partners, hospitals and specialist practices that send samples in. The money comes from selective contracts for besondere Versorgung under section 140a SGB V, which explicitly permit terms departing from the ordinary reimbursement rules; 66 cooperating sickness funds have signed, covering 94.79 percent of patients as at June 2025, and the contracts pay for the molecular pathology and for a second opinion. The contracts date from 2019, which is to say the network was paying for comprehensive testing before there was any national route to fund it. The gap is geographical rather than financial: an analysis of 993 hospitals and 167,216 reimbursed lung cancer cases found 240 nNGM-affiliated hospitals treating 59 percent of cases, and 668 hospitals treating 26 percent affiliated with no network at all, concentrated in northern Brandenburg, Lower Saxony and Saxony-Anhalt.",
    links: [
      { label: "nNGM Lungenkrebs", url: "https://www.nngm.de/" },
      { label: "nNGM: cooperating sickness funds and the section 140a contracts", url: "https://nngm.de/ueber-das-nngm/kooperationskrankenkassen/" },
      { label: "Section 140a SGB V: besondere Versorgung", url: "https://www.gesetze-im-internet.de/sgb_5/__140a.html" },
      { label: "Berressem 2025: which hospitals are in a network (BMC Cancer)", url: "https://doi.org/10.1186/s12885-025-15411-2" },
      { label: "Büttner 2019: the Cologne model and its national rollout (Der Pathologe)", url: "https://doi.org/10.1007/s00292-019-0605-4" },
    ],
  },
  {
    id: "nngm-outcome",
    title: "Does the network help? The insurers checked their own claims data",
    plain: "Germany's largest statutory insurer paid for a study comparing its own members with advanced lung cancer who went through the network against those who did not. Those in the network lived a median of 10.5 months against 8.7, and were more likely to be started on a targeted drug.",
    detail: "Kästner and colleagues linked the prospective nNGM database case by case to AOK claims data for patients first diagnosed with advanced non-small-cell lung cancer between April 2019 and June 2020, with a control group drawn from AOK claims for usual care and a minimum six months of follow-up. In 509 nNGM patients against 7,213 others, median overall survival was 10.5 versus 8.7 months (hazard ratio 0.84, 95% CI 0.74 to 0.95, p = 0.008) and one-year survival 46.8 versus 41.3 percent. First-line use of an approved tyrosine kinase inhibitor was 8.4 percent (43 of 509) against 5.1 percent (366 of 7,213), and patients who received a first-line TKI had one-year survival of 67.2 percent against 40.2 percent for those given immunotherapy or chemotherapy. The study was funded by the AOK federal association. It is a historical cohort, not a randomised comparison, so the difference cannot be cleanly separated from who gets referred to a network centre in the first place; a prospective successor, DigiNet, uses matched controls from the cancer registries. A separate costing study reports that about 15 percent of patients with advanced NSCLC in Germany still go untested.",
    links: [
      { label: "Kästner 2024: nationwide precision medicine programme in NSCLC (Lancet Reg Health Eur)", url: "https://doi.org/10.1016/j.lanepe.2023.100788" },
      { label: "Kästner 2025: DigiNet prospective cohort (J Cancer Res Clin Oncol)", url: "https://doi.org/10.1007/s00432-025-06275-x" },
      { label: "Schumacher 2026: reflex testing from the payer perspective (Cost Eff Resour Alloc)", url: "https://doi.org/10.1186/s12962-026-00803-3" },
    ],
  },
  {
    id: "master",
    title: "MASTER: what happens when you sequence the whole genome of people with rare and incurable cancers",
    plain: "The German Cancer Consortium sequenced the genome and the RNA of 1,310 adults with incurable cancer, three quarters of them rare ones, and put every case to a molecular tumour board spanning several universities. The board could recommend something in 88% of cases; about a third of patients actually received the recommended treatment, and about a quarter of those responded.",
    detail: "Horak, Heining, Kreutzfeldt, Fröhling and colleagues reported the MASTER programme (Molecularly Aided Stratification for Tumor Eradication Research) in Cancer Discovery in 2021: a prospective observational study across NCT Heidelberg, NCT/UCC Dresden and the DKTK partner sites in Berlin, Essen and Düsseldorf, Frankfurt and Mainz, Freiburg, Munich and Tübingen, applying whole-genome or whole-exome plus RNA sequencing, with DNA methylation profiling added. On the basis of 472 single and six composite biomarkers the cross-institutional board gave evidence-based management recommendations in 88 percent of cases; the recommended therapy was administered to 362 of 1,138 patients (31.8 percent), with an objective response rate of 23.9 percent, disease control in 55.3 percent, and a progression-free survival ratio above 1.3 in 35.7 percent. The distance between 88 percent recommended and 31.8 percent treated is the honest measure of how far genomics gets a patient in routine practice: the recommendation is usually an off-label or trial drug, and the obstacle is access rather than knowledge. A later head-to-head found that about a third of whole-genome and transcriptome recommendations rested on biomarkers a large panel would not have covered.",
    links: [
      { label: "Horak 2021: comprehensive genomic and transcriptomic analysis in rare cancers (Cancer Discov)", url: "https://doi.org/10.1158/2159-8290.CD-21-0126" },
      { label: "NCT Heidelberg: MASTER", url: "https://www.nct-heidelberg.de/forschung/molecular-precision-oncology/master.html" },
      { label: "2025: whole genome and transcriptome versus a panel, head to head (npj Precis Oncol)", url: "https://doi.org/10.1038/s41698-024-00788-3" },
    ],
  },
  {
    id: "modellvorhaben",
    title: "The 700 million euro model project: sequencing written into the social code",
    plain: "Since 2024 the sickness funds have been paying for whole-genome sequencing for people with rare diseases and for people with cancer under a law of their own, with a fixed fee per case and a fixed budget. Half the money is for cancer. You can only join once standard treatment is exhausted, and only if you have not already been sequenced somewhere else.",
    detail: "Section 64e SGB V, inserted by the Gesundheitsversorgungsweiterentwicklungsgesetz of 11 July 2021, requires a model project on comprehensive diagnosis and treatment finding by genome sequencing. After deadlines were pushed back three times the contract was signed on 31 July 2024, binding all statutory funds, with the private insurers' association joining from 1 September 2024; the University Hospital Schleswig-Holstein signed for the rare disease arm and Tübingen for the oncology arm. It runs to 31 December 2029 across five periods with a joint financing volume of 100, 130, 150, 160 and 160 million euros, 700 million in all, split in half between rare disease and cancer. The per-case flat fees for the first two periods are 8,000 euros for a molecular tumour board decision based on whole-genome sequencing, 6,000 for whole-exome, 4,000 for a large panel and 500 for a board decision without sequencing. BfArM is the platform operator, holding clinical data in nodes at university hospitals and genomic data in computing centres, with the pseudonymisation trust centre at the Robert Koch Institute. Twenty-seven university hospitals take part in the oncology arm in the second period. The entry criteria are strict: standard treatment must be exhausted, known driver mutations must already have been tested for, and patients already diagnosed through the DNPM, a Zentrum für Personalisierte Medizin or INFORM are in principle excluded. Neither the statute nor the contract states a target number of patients, and no count of patients sequenced has been published.",
    links: [
      { label: "Section 64e SGB V: Modellvorhaben zur Genomsequenzierung", url: "https://www.gesetze-im-internet.de/sgb_5/__64e.html" },
      { label: "GKV-Spitzenverband: the model project and its contract history", url: "https://www.gkv-spitzenverband.de/krankenversicherung/forschung_modellvorhaben/mv_genomsequenzierung/genomsequenzierung.jsp" },
      { label: "The signed 64e contract (PDF): financing volumes and flat fees", url: "https://www.gkv-spitzenverband.de/media/dokumente/krankenversicherung_1/forschung_modellvorhaben/mv_genomsequenzierung/2024_07_31_64e-GenomSq-Vertrag.pdf" },
      { label: "BfArM: Modellvorhaben Genomsequenzierung and the data platform", url: "https://www.bfarm.de/DE/Das-BfArM/Aufgaben/Modellvorhaben-Genomsequenzierung/_node.html" },
      { label: "genomDE", url: "https://www.genom.de/" },
    ],
  },
  {
    id: "off-label",
    title: "What happens after the tumour board recommends a drug that is not licensed for your cancer",
    plain: "A German doctor may prescribe a drug outside its licence, but statutory insurance only pays for it in exceptional cases. A committee at the drug regulator writes opinions on particular drug-and-cancer pairs, and the ones the Federal Joint Committee accepts go on a published list. Everything not on that list is argued case by case.",
    detail: "Section 35c SGB V has the health ministry appoint expert groups seated at BfArM to assess the state of scientific knowledge on using licensed medicines outside their approved indications; their assessments go to the G-BA, which adds the substance to Annex VI of the medicines directive either as prescribable at insurance expense (Part A) or as not prescribable (Part B). Assessments are normally only produced with the consent of the manufacturer concerned, which limits what can be listed. The version in force from 11 June 2026 carries 42 active Part A entries and 16 active Part B entries, most of them oncology: cisplatin with gemcitabine in advanced gallbladder and biliary carcinoma, platinum in triple-negative breast cancer, rituximab in mantle cell lymphoma and sorafenib in desmoid tumours are prescribable; inhaled interleukin-2 in renal cell carcinoma and gemcitabine monotherapy in breast cancer are explicitly not. In hospital, a treatment not yet paid for by the DRG system can be charged under the NUB procedure in section 6(2) of the Krankenhausentgeltgesetz, which needs an InEK enquiry by 31 October each year. Outpatient specialist cancer care runs under section 116b SGB V (ambulante spezialfachärztliche Versorgung), which a hospital or practice enters by notification rather than licence and may begin two months later.",
    links: [
      { label: "Section 35c SGB V: expert groups on off-label use", url: "https://www.gesetze-im-internet.de/sgb_5/__35c.html" },
      { label: "G-BA: off-label use and Annex VI", url: "https://www.g-ba.de/themen/arzneimittel/arzneimittel-richtlinie-anlagen/off-label-use/" },
      { label: "Annex VI of the medicines directive, in force 11 June 2026 (PDF)", url: "https://www.g-ba.de/downloads/83-691-1103/AM-RL-VI-Off-label-2026-06-11.pdf" },
      { label: "Section 6(2) KHEntgG: NUB charges for new methods", url: "https://www.gesetze-im-internet.de/khentgg/__6.html" },
      { label: "Section 116b SGB V: ambulante spezialfachärztliche Versorgung", url: "https://www.gesetze-im-internet.de/sgb_5/__116b.html" },
    ],
  },
];
export const DE_DOING: CountryCard[] = [
  {
    id: "screening",
    title: "Organised screening, invitation by post, and the sex difference that was removed",
    plain: "Germany invites people by letter to be screened for cervical, breast, bowel and, from 2026, lung cancer, and pays for it in full. Until April 2025 men could have a screening colonoscopy at 50 and women only at 55; the committee abolished that difference and both now start at 50.",
    detail: "The organised early-detection programmes run under the G-BA's oKFE-Richtlinie, which specifies who is invited, at what age and how often. Cervical screening is annual cytology from 20 to 34 and a three-yearly HPV test with cytology from 35; breast screening is two-yearly mammography, whose upper age limit was raised to 75; colorectal screening offers a choice of colonoscopy or a two-yearly faecal immunochemical test. On 16 January 2025 the G-BA resolved to equalise the sex-specific entitlement in colorectal screening and to adjust the iFOBT intervals, in force from 1 April 2025, so that women as well as men may have a screening colonoscopy from 50; the same body has asked IQWiG to re-examine the lower age limit and the frequency of screening colonoscopy. A statutory low-dose CT screening programme for people with a heavy smoking history begins in April 2026, which makes Germany one of the first large European countries to fund lung cancer screening as an insurance benefit rather than a pilot.",
    links: [
      { label: "G-BA: Richtlinie für organisierte Krebsfrüherkennungsprogramme (oKFE-RL)", url: "https://www.g-ba.de/richtlinien/104/" },
      { label: "G-BA Beschluss of 16 January 2025: equal colorectal screening entitlement from 50", url: "https://www.g-ba.de/beschluesse/7021/" },
      { label: "Krebsinformationsdienst (DKFZ): Krebsvorsorge und Krebsfrüherkennung", url: "https://www.krebsinformationsdienst.de/krebsvorsorge-und-krebsfrueherkennung" },
    ],
  },
  {
    id: "psma",
    title: "PSMA theranostics were designed in Heidelberg and are now a global prostate cancer treatment",
    plain: "The molecule behind Pluvicto, the radioactive drug given to men with advanced prostate cancer, was designed at the German Cancer Research Center. Heidelberg made it, imaged the first patients with it, treated the first patients with it, and then a Swiss company took it to market.",
    detail: "Benešová and colleagues at the DKFZ Division of Radiopharmaceutical Chemistry published the design of PSMA-617, a DOTA-conjugated PSMA inhibitor with an optimised linker for imaging and endoradiotherapy, in the Journal of Nuclear Medicine in 2015 (doi:10.2967/jnumed.114.147413). Afshar-Oromieh and colleagues at Heidelberg University Hospital and the DKFZ published its biodistribution, dosimetry and first tumour lesion detection in patients in the same journal that year (doi:10.2967/jnumed.115.161299). In 2016 Kratochwil and colleagues reported the first alpha-emitting version, 225Ac-PSMA-617, in men who had exhausted beta therapy (doi:10.2967/jnumed.116.178673). The lutetium-177 form is marketed by Novartis as Pluvicto; the actinium form is still in trials. The same Heidelberg nuclear medicine group produced the FAPI tracers. The pattern, an academic radiochemistry division designing the ligand and a company owning the product, is the recurring German story and the reason the country's contribution is easy to miss in a list of approvals.",
    links: [
      { label: "Benešová 2015: preclinical evaluation of PSMA-617 (J Nucl Med)", url: "https://doi.org/10.2967/jnumed.114.147413" },
      { label: "Afshar-Oromieh 2015: PSMA-617 in patients (J Nucl Med)", url: "https://doi.org/10.2967/jnumed.115.161299" },
      { label: "Kratochwil 2016: 225Ac-PSMA-617 alpha therapy (J Nucl Med)", url: "https://doi.org/10.2967/jnumed.116.178673" },
    ],
  },
  {
    id: "trial-groups",
    title: "Academic trial groups that set the world's standard of care",
    plain: "A handful of German study groups, run from university hospitals rather than by companies, have decided how several cancers are treated everywhere: how much chemotherapy Hodgkin lymphoma needs, when rectal cancer is irradiated, what to give before stomach cancer surgery, and how to treat chronic lymphocytic leukaemia without chemotherapy.",
    detail: "The German Hodgkin Study Group has randomised tens of thousands of patients since 1978 and its HD trials set the de-escalation standard, most recently HD21, where PET-guided BrECADD beat escalated BEACOPP on progression-free survival with less toxicity. The German Rectal Cancer Study Group's CAO/ARO/AIO-94 trial moved chemoradiotherapy from after surgery to before it, which is now standard worldwide. FLOT4-AIO replaced the ECF/ECX regimen before and after gastro-oesophageal surgery, and ESOPEC then showed FLOT beating chemoradiotherapy in oesophageal adenocarcinoma. The German CLL Study Group ran CLL14, which put a fixed-duration, chemotherapy-free venetoclax and obinutuzumab regimen into first-line CLL, and CLL12, which showed that treating early-stage disease early does not help. The German Breast Group's GeparSixto and its pooled neoadjuvant analyses defined HER2-low as a category and tumour-infiltrating lymphocytes as a prognostic marker. Deutsche Krebshilfe, funded entirely by donations since Mildred Scheel founded it on 25 September 1974, is the principal funder of this kind of investigator-initiated trial.",
    links: [
      { label: "German Hodgkin Study Group", url: "https://www.ghsg.org" },
      { label: "German CLL Study Group", url: "https://www.dcllsg.de" },
      { label: "German Breast Group", url: "https://www.gbg.de" },
      { label: "AIO (Arbeitsgemeinschaft Internistische Onkologie)", url: "https://www.aio-portal.de" },
      { label: "Deutsche Krebshilfe: who we are and how we are funded", url: "https://www.krebshilfe.de/informieren/ueber-uns/deutsche-krebshilfe/" },
    ],
  },
  {
    id: "nct-network",
    title: "One national cancer centre, in six places",
    plain: "Germany decided not to build a single national cancer institute. Instead it built the NCT in Heidelberg, then Dresden, and in 2023 added four more sites, so that a group of university hospitals across the country now runs one shared early-trials and translational research programme.",
    detail: "The Nationales Centrum für Tumorerkrankungen began in Heidelberg in 2004 as a partnership of the DKFZ, Heidelberg University Hospital, the university and the Thoraxklinik, and was joined by NCT/UCC Dresden in 2015. Under the National Decade Against Cancer four further sites were added in 2023: NCT Berlin, NCT SüdWest (Tübingen-Stuttgart and Ulm), NCT WERA (Würzburg with Erlangen, Regensburg and Augsburg) and NCT West (Essen and Cologne). The six sites operate as One NCT, sharing early clinical trial infrastructure, molecular diagnostics and patient involvement. It sits alongside the German Cancer Consortium (DKTK), the DKFZ's translational network across eight partner sites, and the Deutsche Krebshilfe-funded Onkologische Spitzenzentren, so a German university cancer centre may carry three separate national labels at once, each with its own criteria.",
    links: [
      { label: "NCT: Wir im One NCT", url: "https://www.nct-heidelberg.de/das-nct/vorstellung/wir-im-one-nct.html" },
      { label: "Nationale Dekade gegen Krebs", url: "https://www.dekade-gegen-krebs.de/" },
      { label: "German Cancer Consortium (DKTK)", url: "https://dktk.dkfz.de/en" },
    ],
  },
  {
    id: "s3",
    title: "One guideline programme, thirty-eight cancer guidelines, and a patient version of nearly every one",
    plain: "Germany writes its cancer guidelines through a single programme run jointly by the medical societies, the German Cancer Society and the cancer charity, which pays for them. Thirty-eight cover cancer, and thirty-six of them have a plain-language version written for patients. The quality indicators pulled out of them are what the certified centres are audited against.",
    detail: "The Leitlinienprogramm Onkologie was launched in February 2008 by the Arbeitsgemeinschaft der Wissenschaftlichen Medizinischen Fachgesellschaften (AWMF), the Deutsche Krebsgesellschaft and Deutsche Krebshilfe, working to the AWMF's rulebook and funded by the charity. A steering committee of six, two from each partner, decides which guidelines to fund and with how much, meeting about four times a year. The programme lists 38 guidelines, from the common cancers to nutrition, complementary medicine, palliative care, psycho-oncology and supportive therapy, and 36 corresponding Patientenleitlinien. In the AWMF's classification the S stands for how systematic the development was: S1 is a handout from an expert group, S2e adds a systematic evidence review, S2k adds a structured consensus, and S3 has both, which is why German oncology guidelines are almost all S3. The link that matters is the last one: quality indicators extracted from these guidelines are what the certification system measures centres against, so the guideline, the audit and the annual report are one chain rather than three.",
    links: [
      { label: "Leitlinienprogramm Onkologie: the guidelines", url: "https://www.leitlinienprogramm-onkologie.de/leitlinien" },
      { label: "Leitlinienprogramm Onkologie: patient guidelines", url: "https://www.leitlinienprogramm-onkologie.de/patientenleitlinien" },
      { label: "Leitlinienprogramm Onkologie: how the programme works and who funds it", url: "https://www.leitlinienprogramm-onkologie.de/programm/informationen-zum-leitlinienprogramm" },
      { label: "AWMF: the S classification", url: "https://www.awmf.org/regelwerk/stufenklassifikation-nach-systematik" },
    ],
  },
  {
    id: "kid",
    title: "A national cancer information service anyone can telephone, free, run by the research institute",
    plain: "If you have a question about cancer in Germany you can ring a doctor at the German Cancer Research Center and ask it. The service is free, runs every day, and is paid for from public funds rather than by a charity or a company.",
    detail: "The Krebsinformationsdienst (KID) is run by the DKFZ in Heidelberg and answers questions by telephone on 0800 420 30 40 from 08:00 to 20:00 every day, and by email through a secure form, with a call-back option. It says it is financed predominantly from public funds and works without sponsorship or advertising, and it publishes evidence-based written information for patients and relatives, including versions in German sign language and in plain German, alongside the answering service. There is no equivalent in most countries: national cancer information lines are usually charity-run. It is the front door most German patients actually use, which is why it sits in the corpus as a collection rather than only as a link.",
    links: [
      { label: "Krebsinformationsdienst (DKFZ)", url: "https://www.krebsinformationsdienst.de/" },
      { label: "Krebsinformationsdienst: über uns", url: "https://www.krebsinformationsdienst.de/ueber-uns" },
    ],
  },
];
export const DE_GAPS: CountryCard[] = [
  {
    id: "not-published",
    title: "What Germany does not publish",
    plain: "Four things we went looking for and could not find, all of them things the responsible body could publish and does not.",
    detail: "First, the G-BA runs the most rigorous public comparative-effectiveness scheme in the world and publishes no aggregate table of its verdicts. The counts on this page are our own queries against its procedure register plus figures compiled separately by the industry association and by the haematology and oncology society, which use different units of analysis and do not agree. The per-decision data exists only as machine-readable XML refreshed twice a month. Second, the German Cancer Society publishes the number of certified centres and the number of primary cases they treat, but no figure for the share of all German cancer patients treated in one; the sourced proxies on this page come from WiZen, which found more than 40 percent treated outside certified hospitals between 2009 and 2017, and from a population study in Upper Franconia that put actual treatment in a certified network at about half. Third, the Robert Koch Institute last published per-state registry completeness in 2019, for 2015 and 2016, and only as bands rather than numbers, and publishes no national death-certificate-only rate for all cancers. Fourth, neither section 64e SGB V nor the signed contract states how many patients the 700 million euro genome sequencing project will sequence, and no count of patients sequenced so far has been published.",
    links: [
      { label: "G-BA: the machine-readable version of its decisions", url: "https://www.g-ba.de/themen/arzneimittel/arzneimittel-richtlinie-anlagen/nutzenbewertung-35a/ais/" },
      { label: "ZfKD: completeness estimation, last updated 2019", url: "https://www.krebsdaten.de/Krebs/DE/Content/Methoden/Vollzaehligkeitsschaetzung/vollzaehligkeitsschaetzung_node.html" },
      { label: "GKV-Spitzenverband: the section 64e model project", url: "https://www.gkv-spitzenverband.de/krankenversicherung/forschung_modellvorhaben/mv_genomsequenzierung/genomsequenzierung.jsp" },
    ],
  },
  {
    id: "corpus-gaps",
    title: "What this corpus still does not hold about Germany",
    plain: "Named so the gap is visible rather than invisible. Adding any of these would improve the page.",
    detail: "The corpus has no record of the German S3 guideline programme as a guideline body, so the 38 oncology guidelines that actually govern German practice do not appear alongside NCCN, ESMO, NICE and ASCO in the guideline comparison. It holds none of the four NCT sites added in 2023 (Berlin, SüdWest, WERA and West) as institutions, nor the fifteen Deutsche Krebshilfe-funded Onkologische Spitzenzentren as a set, nor the Deutsches Kinderkrebsregister in Mainz, nor the ADT, nor OnkoZert as a record separate from the German Cancer Society. It has no entity for the German Consortium for Hereditary Breast and Ovarian Cancer, which section 64e names alongside the networks on this page. The G-BA minimum volume rules are not in the corpus as law records. German-language sources are under-represented across the corpus generally, which is the measurement trap this round of country pages was written to expose: the ranking that put Germany here is built from English-language publication counts, and nothing in that ranking would have shown you the certification system, the clinical registry data flow, or the fact that a German patient gets a new cancer medicine a median of 47 days after European approval.",
    links: [
      { label: "Leitlinienprogramm Onkologie", url: "https://www.leitlinienprogramm-onkologie.de/leitlinien" },
      { label: "Deutsche Krebshilfe: the Onkologische Spitzenzentren", url: "https://www.krebshilfe.de/helfen/rat-hilfe/onkologische-spitzenzentren/" },
      { label: "Deutsches Kinderkrebsregister", url: "https://www.kinderkrebsregister.de/" },
    ],
  },
];

/** Entity ids to render from the graph, in display order. Missing ids are skipped at render time. */
export const DE_INSTITUTIONS = ["dkfz", "heidelberg-nct", "dktk", "nct-dresden", "charite", "mdc-berlin", "essen-wtz", "uke-hamburg", "lmu-munich", "tum-munich", "uniklinik-koeln", "uct-frankfurt", "uct-mainz", "uk-duesseldorf", "university-hospital-leipzig", "ulm-university-hospital", "ccc-freiburg", "ccc-tuebingen", "ccc-wuerzburg", "kliniken-essen-mitte", "krankenhaus-nordwest", "klinikum-stuttgart-olgahospital", "lungenclinic-grosshansdorf", "curanosticum", "cecurio", "deutsche-krebshilfe", "deutsche-krebsgesellschaft", "g-ba-iqwig", "bfarm", "paul-ehrlich-institut", "zfkd-rki", "nngm", "dnpm"];
export const DE_COMPANIES = ["biontech", "bayer", "boehringer-ingelheim", "merck-kgaa", "curevac", "immatics", "morphosys", "miltenyi-biotec", "miltenyi-biomedicine", "heidelberg-pharma", "tubulis", "catalym", "itm", "eckert-ziegler", "emergence-therapeutics", "ariceum-therapeutics", "lindis-biotech", "medigene", "isarna-therapeutics", "4sc", "medac", "gruenenthal", "fresenius-kabi", "b-braun", "siemens-healthineers", "carl-zeiss-meditec", "brainlab", "karl-storz", "sartorius", "leica-biosystems", "ptw-freiburg", "abx-advanced-biochemical-compounds", "photonamic", "biofrontera", "aignostics", "vara", "cegat", "indivumed", "leaps-by-bayer", "ghsg", "gbg", "german-cll-study-group", "aio", "ago-study-group", "german-lymphoma-alliance"];
export const DE_DRUGS = ["pluvicto", "psma-1007-f18", "ga68-psma-11", "ac225-psma", "itm-11", "catumaxomab", "regorafenib", "darolutamide", "radium-223", "larotrectinib", "afatinib", "nintedanib", "copanlisib", "anetumab-ravtansine", "autogene-cevumeran", "bnt113", "brigimadlin", "obrixtamig", "ima203", "aminolevulinic-acid-gleolan", "precemtabart-tocentecan", "resminostat"];
export const DE_TRIALS = ["hd21", "cll14", "cll13-gaia", "cll12", "cao-aro-aio-94", "cao-aro-aio-12", "flot4", "esopec", "insema", "conko-001", "conko-003", "gain-igbc", "acticca-1", "desktop-iii", "geparsixto", "gepardouze", "admec-o", "crystal-fire3", "aramis", "arasens", "alsympca", "correct", "compete", "beamion-lung-1", "euronet-phl-c2", "intreall-sr-2010"];
export const DE_PAPERS = ["paper-ghsg-hd21-brecadd-vs-ebeacopp-advanced-hodgkin-lancet-2024", "paper-ghsg-hd10-reduced-intensity-early-hodgkin-nejm-2010", "paper-eichenauer-nlphl-ghsg-hd7-hd15-long-term-jco-2020", "paper-sauer-preoperative-chemoradiotherapy-rectal-nejm-2004", "paper-conko-001-adjuvant-gemcitabine-long-term-oettle-jama-2013", "paper-heinemann-fire-3-cetuximab-vs-bevacizumab-lancet-oncol-2014", "paper-cll12-ibrutinib-early-stage-langerbeins-jco-2025", "paper-denkert-her2-low-pooled-neoadjuvant-lancet-oncol-2021", "paper-denkert-tils-neoadjuvant-pooled-lancet-oncol-2018", "paper-loibl-geparsixto-survival-hrd-ann-oncol-2018", "paper-noa-08-temozolomide-vs-radiotherapy-elderly-wick-lancet-oncol-2012", "paper-issels-lancet-oncol", "paper-senft-lancet-oncol", "paper-rummel-lancet", "paper-neumann-germline-mutations-nonsyndromic-pheochromocytoma-nejm-2002", "paper-heining-nrg1-fusions-kras-wild-type-pancreatic-cancer-discov-2018", "paper-lynch-frameshift-vaccine-ccr-2020", "paper-kralovics-n-engl-j-med", "paper-rojas-mrna-neoantigen-vaccine-pancreatic-nature-2023", "paper-sethna-rna-neoantigen-vaccine-long-lived-t-cells-nature-2025", "paper-vokinger-lancet-oncol"];
export const DE_PEOPLE = ["harald-zur-hausen", "michael-baumann", "ugur-sahin", "michael-hallek", "peter-borchmann", "andreas-engert", "sibylle-loibl", "gunter-von-minckwitz", "nadia-harbeck", "carsten-denkert", "volker-heinemann", "salah-eddin-al-batran", "juergen-wolf", "reinhard-buettner", "roman-thomas", "martin-reck", "hartmut-dohner", "nicola-gokbuget", "lars-bullinger", "uwe-platzbecker", "stefan-froehling", "hanno-glimm", "stefan-pfister", "andreas-von-deimling", "andreas-trumpp", "uwe-haberkorn", "clemens-kratochwil", "frederik-giesel", "ken-herrmann", "juergen-debus", "klaus-pantel", "dirk-schadendorf", "markus-graefen", "hermann-brenner", "jakob-nikolas-kather", "nikolaus-rajewsky", "christof-von-kalle", "martin-dreyling", "andreas-du-bois", "barbara-eichhorst", "rita-schmutzler", "thomas-kaiser", "sonja-optendrenk"];

import type { CountryDive } from "@/data/country-dive";

/**
 * Luxembourg deep dive: the hand-written cards for /countries/lu/ (wave 13). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: the Registre National du Cancer's site (home page, "Cancer
 * au Luxembourg", data collection, FAQ and dashboard pages) and its first national report, "Le cancer au Luxembourg:
 * incidence et mortalité 2014-2021" (PDF text, in French); the OECD and European Commission EU Country Cancer Profile
 * for Luxembourg 2025 (PDF text); the health ministry's portal pages on the National Cancer Plan, the Programme
 * Mammographie, colorectal screening, HPV vaccination, the Division de la pharmacie et des médicaments, marketing
 * authorisation and the reimbursement of medicines; the Caisse nationale de santé's pages on medicines and on health
 * insurance; the Chamber of Deputies' file on bill 8491 creating a medicines agency; the government's notice of
 * 1 July 2024 on screening ages; the Centre François Baclesse's and the Institut National du Cancer's own pages; EMA's
 * leaflet on the centralised procedure; IAEA's DIRAC country row; WHO's HPV coverage rows from its public immunisation
 * data API; the World Bank's health spending series; and IARC's GLOBOCAN 2024 fact sheet for Luxembourg. French
 * sources were read in French. Where a figure could not be read it is named under `gaps`.
 */
const CCP_2025 = "https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-lu-2024-1676-en.pdf";
const CCP_PAGE = "https://cancer-inequalities.jrc.ec.europa.eu/country-cancer-profiles-2025";
const RNC_HOME = "https://www.rnc.lu/fr/";
const RNC_CANCER = "https://www.rnc.lu/fr/cancer-in-luxembourg/";
const RNC_REPORT = "https://www.rnc.lu/wp-content/uploads/2026/06/2025_RNC_Rapport_Cancer_au_Luxembourg_14-21_VF.pdf";
const RNC_FAQ = "https://www.rnc.lu/fr/faqs/";
const RNC_DATA = "https://www.rnc.lu/fr/recueil-des-donnees/";
const RNC_DASHBOARD = "https://www.rnc.lu/fr/statistiques/";
const PNC = "https://santesecu.public.lu/fr/espace-professionnel/departement-sante/plans-nationaux/plan-national-cancer.html";
const PNC_BROCHURE = "https://santesecu.public.lu/fr/publications/p/plan-national-cancer-brochure-2020-2024.html";
const MAMMO = "https://santesecu.public.lu/fr/espace-citoyen/departement-sante/maladies/cancer-sein-depistage.html";
const COLORECTAL = "https://santesecu.public.lu/fr/espace-citoyen/departement-sante/maladies/cancer-colon-depistage.html";
const HPV_PAGE = "https://santesecu.public.lu/fr/espace-citoyen/departement-sante/vaccination/maladies-vaccinables/universelle/infection-papillomavirus.html";
const SCREENING_CENTRE = "https://dirsante.gouvernement.lu/fr/la-direction/structure/centre-de-coordination-programmes-depistages-cancers.html";
const SCREENING_2024 = "https://gouvernement.lu/fr/actualites/toutes_actualites/communiques/2024/07-juillet/01-deprez-depistage-cancer.html";
const DPM = "https://santesecu.public.lu/fr/espace-professionnel/departement-sante/pharmacies-et-medicaments.html";
const AMM = "https://santesecu.public.lu/fr/espace-professionnel/departement-sante/pharmacies-et-medicaments/medicaments-humains/autorisation-mise-sur-le-marche.html";
const REIMBURSEMENT = "https://santesecu.public.lu/en/espace-citoyen/departement-secu/remboursement/medicaments.html";
const CNS_MEDICINES = "https://cns.public.lu/en/assure/remboursements/prestations-remboursees/medicaments-dispositifs-medicaux.html";
const CNS_POSITIVE_LIST = "https://cns.public.lu/en/assure/publications/legislations/textes-coordonnes/liste-positive.html";
const CNS_BRIEF = "https://cns.public.lu/fr/assure/droits-demarches/bases-bonnes-pratiques/assurance-maladie-bref.html";
const BILL_8491 = "https://www.chd.lu/fr/dossier/8491";
const EMA_LEAFLET = "https://www.ema.europa.eu/en/documents/leaflet/applying-european-union-marketing-authorisation-medicinal-products-human-use_en.pdf";
const CFB_HOME = "https://www.baclesse.lu/";
const CFB_EQUIPMENT = "https://www.baclesse.lu/offre-de-soins-plateau-technique/";
const INC_HOME = "https://institutcancer.lu/";
const INC_ABOUT = "https://institutcancer.lu/a-propos";
const INC_CCC = "https://institutcancer.lu/blog/article/le-luxembourg-ccc-designe-par-eunetccc";
const DIRAC = "https://dirac.iaea.org/Query/Countries";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/442-luxembourg-fact-sheet.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'LUX'%20and%20startswith(ANTIGEN,'PRHPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=LU";
const WB_GOV = "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=LU";
const WB_PC = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=LU";
const WB_GDP = "https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS?locations=LU";
const CTGOV = "https://clinicaltrials.gov/search?country=Luxembourg&cond=cancer";

const CCP = (section: string) => ({ label: `OECD and European Commission: EU Country Cancer Profile Luxembourg 2025, ${section} (PDF)`, url: CCP_2025 });

export const LU_DIVE: CountryDive = {
  iso2: "LU",
  iso3: "LUX",
  name: "Luxembourg",
  flag: "🇱🇺",
  asOf: "2026-11-16",
  title: "Cancer in Luxembourg",
  description:
    "Cancer in Luxembourg from Luxembourgish and European sources: a national registry that counted 3,181 new cancers and 1,024 cancer deaths in 2023, IARC's modelled estimate of 2,777 cases in 2024, one national radiotherapy centre, chemotherapy, immunotherapy, targeted therapy and radiotherapy that the 2025 European profile reports as fully covered by statutory health insurance, organised breast and bowel screening from 45 to 74, a cancer plan extended to 2026, and a medicines agency voted by parliament in October 2026.",
  lede:
    "Luxembourg is a country of about 673,000 people (the 2024 population IARC uses) with statutory health insurance, one national radiotherapy centre and a national cancer registry that has been running since 2013. The 2025 European profile says chemotherapy, immunotherapy, targeted therapy and radiotherapy are fully covered by statutory insurance, and new cancer medicines are authorised through the European route. IARC still models the country's incidence from deaths rather than from the registry.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Luxembourg is 2,777 new cancers and 1,100 deaths, an age-standardised incidence of 216.7 per 100,000 (239.6 in men, 197.3 in women) and mortality of 70.9 (84.8 in men, 59.2 in women), with 9,003 people alive within five years of a diagnosis. The deaths come from national data reported to WHO, projected to 2024. The incidence does not come from Luxembourg's registry: IARC's fact sheet gives the country-specific data source for incidence as \"No data\" and the method as \"National mortality estimates applied to model-based M:I ratios (neighbouring country registry data)\". The Registre National du Cancer's own count is higher: 3,181 new cancers in 2023, not counting non-melanoma skin cancers, against 2,731 on the same basis in IARC's 2024 estimate. The registry standardises its rates to the European standard population of 2013 and IARC to the world standard, so the two sets of rates cannot be compared directly.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Luxembourg",
      aside: { label: "Registre National du Cancer: Cancer au Luxembourg (in French)", url: RNC_CANCER },
      cards: [
        {
          id: "shape",
          title: "About 3,200 new cancers and 1,000 deaths a year, counted by the national registry",
          plain:
            "Luxembourg's cancer registry counted 3,181 new cancers in 2023, leaving out the common skin cancers, and 1,024 cancer deaths. Breast cancer is the most frequent, then prostate, lung and colon cancer. Lung cancer causes the most deaths. The registry says cancer is the country's leading cause of death.",
          detail:
            "The Registre National du Cancer (RNC) gives the shares for 2023: breast 18.2% of new cases, prostate 14.1%, lung 9.9%, colon 7.3% and leukaemia 4.5%, together 54.0% of all new cases; and of deaths, lung 16.7%, breast 7.7%, colon 7.5%, pancreas 7.3% and leukaemia 5.3%. It puts the average at 9 new cases and 3 deaths a day, says one person in four will develop a cancer before the age of 75, and cites a European projection that the number of people diagnosed each year will rise by 79.2% by 2050 as the population grows and ages. The OECD and European Commission's 2025 profile, using rates standardised to the European population, gives cancer mortality in 2021 as 272 per 100,000 men and 157 per 100,000 women, says mortality rates are lower than in the EU, and reports a fall of 25% in the mortality rate between 2011 and 2021.",
          links: [
            { label: "Registre National du Cancer: Cancer au Luxembourg, key results for 2023 (in French)", url: RNC_CANCER },
            CCP("sections 1 and 2"),
          ],
        },
        {
          id: "registry",
          title: "A national registry created in 2013, run from the Luxembourg Institute of Health",
          plain:
            "The Registre National du Cancer records every cancer diagnosed or treated in Luxembourg. Trained data managers in the four general hospitals and the radiotherapy centre enter each case, and the registry checks its records against death certificates and health insurance data. Its first multi-year report, covering 2014 to 2021, came out in November 2025.",
          detail:
            "The registry's report says its missions and data sources are set by a Grand-Ducal regulation of 18 April 2013, that it has been operational since 2013, and that it is run mainly by the cancer epidemiology and prevention group (EPICAN) of the Luxembourg Institute of Health. Cancer data managers at the Centre Hospitalier de Luxembourg, Centre Hospitalier Emile Mayrisch, Centre Hospitalier du Nord, Hôpitaux Robert Schuman and Centre François Baclesse code each case to ICD-O-3. For 2014 to 2021 the report counts 23,660 new cancers among residents and 8,490 cancer deaths, an average of 2,957 new cases a year; 4.7% of cases were known from a death certificate alone. The report notes its own limits: data published four years after the last year covered, and not all the sources its legal basis provides for are connected yet. The registry's dashboard now covers 2014 to 2023.",
          links: [
            { label: "Registre National du Cancer: Le cancer au Luxembourg, incidence et mortalité 2014-2021 (PDF, in French)", url: RNC_REPORT },
            { label: "Registre National du Cancer: how the data are collected (in French)", url: RNC_DATA },
            { label: "Registre National du Cancer: dashboard, 2014 to 2023 (in French)", url: RNC_DASHBOARD },
          ],
        },
        {
          id: "iarc-method",
          title: "IARC models Luxembourg's new cases from deaths, not from the registry",
          plain:
            "The international estimate for Luxembourg, 2,777 new cancers in 2024, was not built from the national registry. IARC took Luxembourg's cancer deaths and applied ratios of deaths to new cases from neighbouring countries' registries. The registry's own count for 2023 is 450 cases higher than IARC's estimate for 2024, by OnCo's subtraction, with both counts leaving out the common skin cancers.",
          detail:
            "IARC's GLOBOCAN 2024 fact sheet lists the country-specific data source for incidence as \"No data\" and the method as \"National mortality estimates applied to model-based M:I ratios (neighbouring country registry data)\"; mortality comes from national data held by WHO, with trends projected to 2024. Excluding non-melanoma skin cancer, IARC estimates 2,731 new cases and 1,092 deaths in 2024, against the registry's 3,181 new cases and 1,024 deaths in 2023; the registry's page marks its case count as leaving out non-melanoma skin cancer and does not say whether the death count does. The registry's FAQ makes the same point about the European Cancer Information System: its own figures are cases observed and recorded in Luxembourg, the European ones are estimates from statistical models, and differences between the two are expected. Neither is wrong; they count different things. The registry's totals also include some benign and borderline tumours of the brain and central nervous system, which its report lists by code.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Luxembourg (PDF)", url: IARC_FACTSHEET },
            { label: "Registre National du Cancer: FAQ, why its figures differ from European estimates (in French)", url: RNC_FAQ },
            { label: "Registre National du Cancer: 2014-2021 report, methods (PDF, in French)", url: RNC_REPORT },
          ],
        },
      ],
      tables: [
        {
          id: "lu-registry",
          title: "Cancers counted by the Registre National du Cancer, 2014 to 2021",
          caption: "Number of new cases and of deaths among residents of Luxembourg over the eight years 2014 to 2021, for the cancers the report names as the five most frequent and the five causing the most deaths.",
          columns: [
            { key: "site", label: "Cancer (ICD-10)" },
            { key: "cases", label: "New cases, 2014 to 2021", numeric: true },
            { key: "deaths", label: "Deaths, 2014 to 2021", numeric: true },
          ],
          rows: [
            { site: "All cancers", cases: 23660, deaths: 8490 },
            { site: "Breast, women only (C50)", cases: 3995, deaths: 739 },
            { site: "Prostate (C61)", cases: 3276, deaths: 452 },
            { site: "Lung and trachea (C33 to C34)", cases: 2610, deaths: 1768 },
            { site: "Colon (C18)", cases: 1680, deaths: 668 },
            { site: "Leukaemias (C91 to C95)", cases: 923, deaths: 433 },
            { site: "Pancreas (C25)", cases: 663, deaths: 621 },
          ],
          note: "Eight-year totals, not annual figures: the annual average is 2,957 new cases. The breast figures are the ones the report's overview prints, which its annex 2 shows are for women; with men the annex gives 4,021 cases and 743 deaths. Deaths from leukaemia and new cases of pancreatic cancer are not in the overview and are taken from annex 2. All cancers excludes non-melanoma skin cancer and includes some benign and borderline tumours of the central nervous system. New cases come from the registry and deaths from the national register of causes of death. Colon is counted without the rectum.",
          sources: [{ label: "Registre National du Cancer: Le cancer au Luxembourg, incidence et mortalité 2014-2021, section 1 and annex 2 (PDF, in French)", url: RNC_REPORT }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care: statutory health insurance, with cancer medicines and radiotherapy covered in full",
      aside: { label: "Caisse nationale de santé: health insurance in brief (in French)", url: CNS_BRIEF },
      cards: [
        {
          id: "who-pays",
          title: "Statutory health insurance pays; patients' own spending is about 9% of the total",
          plain:
            "Care is paid for through statutory health insurance; the Caisse nationale de santé (CNS) covers everyone insured in the private sector. The 2025 European profile says chemotherapy, immunotherapy, targeted therapy and radiotherapy are fully covered. Across all health care, patients paid about 8.5% of the bill themselves in 2024; the EU average the profile gives for 2022 is 15%.",
          detail:
            "The OECD and European Commission's 2025 profile says public spending was 86% of health spending in 2022 and out-of-pocket spending 9%, against an EU average of 15%; that the CNS reimburses 88% of outpatient medical consultations at the official rate; and that all expenses related to chemotherapy, immunotherapy, targeted therapy and radiotherapy are fully covered under the statutory scheme. If a person's own contributions in a year exceed 2.5% of their contributory income of the previous year, they can apply for additional reimbursement above that threshold. The World Bank's series, from WHO's health expenditure database, gives out-of-pocket spending as 8.5% of current health spending in 2024 (9.6% in 2019) and, also for 2024, domestic general government health expenditure as 86.9% of the total and health spending as 8,170 US dollars per person and 5.9% of GDP. These are shares for all care, not cancer alone. The CNS describes itself as managing sickness, maternity and long-term care insurance for everyone insured in the private sector and for the state's manual workers, with three separate funds for the public sector.",
          links: [
            CCP("section 5.1"),
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Luxembourg", url: WB_OOP },
            { label: "World Bank: government health expenditure, % of current health expenditure, Luxembourg", url: WB_GOV },
            { label: "World Bank: current health expenditure per capita, Luxembourg", url: WB_PC },
            { label: "World Bank: current health expenditure, % of GDP, Luxembourg", url: WB_GDP },
            { label: "Caisse nationale de santé: health insurance in brief (in French)", url: CNS_BRIEF },
          ],
        },
        {
          id: "medicine-rates",
          title: "Pharmacy medicines are reimbursed at 40%, 80% or 100% if they are on the positive list",
          plain:
            "A medicine bought at a pharmacy is reimbursed if a doctor prescribed it and it is on the CNS's positive list. The normal rate is 80%. Medicines that are irreplaceable for serious or chronic illness are reimbursed at 100%. The pharmacist charges only the part the insurance does not cover.",
          detail:
            "The health ministry's portal sets out three classes on the positive list, which is published in the Mémorial, the official journal: a reduced rate of 40% for medicines of moderate interest used for the symptoms of benign conditions; a normal rate of 80% for every listed medicine with no other rate; and a preferential rate of 100% for medicines that are used for a specific therapeutic indication, contain one active ingredient, are irreplaceable or of vital interest in particularly serious or chronic conditions, and would otherwise ask an inappropriate contribution of the patient, all four conditions together. The 2025 profile adds that in certain cases, such as bisphosphonates used in cancer, strong opioid painkillers for cancer patients and painkillers in palliative care, the CNS covers up to 100% of the cost, pending approval. Third-party payment applies at the pharmacy on presentation of the prescription and social security card. The CNS publishes the positive list sorted by name and updates it; the copy read for this page was dated 1 November 2026. These rules are for medicines dispensed in pharmacies; the profile's separate statement that chemotherapy, immunotherapy and targeted therapy are fully covered is in the card above.",
          links: [
            { label: "Health portal: reimbursement of medicines (English)", url: REIMBURSEMENT },
            { label: "Caisse nationale de santé: medicines and medical devices (English)", url: CNS_MEDICINES },
            { label: "Caisse nationale de santé: positive list of medicines (in French)", url: CNS_POSITIVE_LIST },
            CCP("section 5.1"),
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Approval and access: the European route, a national division, and the positive list",
      aside: { label: "EMA: applying for EU marketing authorisation (leaflet, PDF)", url: EMA_LEAFLET },
      cards: [
        {
          id: "ema-route",
          title: "New cancer medicines are authorised for the whole EU, Luxembourg included",
          plain:
            "Luxembourg does not assess new cancer medicines on its own. A company applies once to the European Medicines Agency, and an authorisation granted by the European Commission is valid in Luxembourg as in every EU country. Luxembourg's health portal says this route is compulsory for innovative products such as cancer medicines.",
          detail:
            "EMA's leaflet on the centralised procedure says the evaluation takes up to 210 days, after which its Committee for Medicinal Products for Human Use gives a scientific opinion, and the European Commission grants the authorisation within 67 days of receiving it; the authorisation is valid in all EU states and in Iceland, Liechtenstein and Norway. The procedure is mandatory for medicines containing a new active substance intended for the treatment of cancer, for biotechnology medicines, advanced therapies and orphan medicines. Luxembourg's portal describes the same four routes (centralised, decentralised, mutual recognition and national) and states that the centralised procedure is obligatory for innovative products such as anticancer medicines. Authorisation is not the same as availability: a medicine still has to be priced and placed on the positive list before the insurer pays for it at a pharmacy.",
          links: [
            { label: "EMA: applying for EU marketing authorisation (leaflet, PDF)", url: EMA_LEAFLET },
            { label: "Health portal: marketing authorisation of medicines (in French)", url: AMM },
          ],
        },
        {
          id: "national-regulator",
          title: "The national regulator is a division of the health directorate; an agency was voted in October 2026",
          plain:
            "Medicines in Luxembourg are overseen by the Division de la pharmacie et des médicaments, part of the Direction de la santé. The health minister grants national authorisations on the advice of a committee of experts. On 29 October 2026 parliament voted to create a separate medicines agency to take over these tasks.",
          detail:
            "The health portal says the division is competent for the practice of pharmacy and for the manufacture, control, marketing, advertising, distribution, import and export of medicines, and also for medical devices and cosmetics. For national authorisations the minister decides on the opinion of a national committee of experts, and the division validates the files and keeps the national medicines database. The portal itself asks companies choosing a reference country for shared assessments of changes to an authorisation to bear in mind that Luxembourg has, for the moment, limited resources. Bill 8491, tabled on 31 January 2025, creates a public body called the Agence luxembourgeoise des médicaments et produits de santé (ALMPS). The Chamber of Deputies' file records that it was adopted by 60 votes to 0 on 29 October 2026 and that a dispensation from the second constitutional vote was requested. The Chamber of Commerce's opinion of 25 August 2026 describes the agency as centralising the medicines and health product tasks that now sit with the Direction de la santé. OnCo did not find the law's publication or a date on which the agency starts work, and describes the division as the regulator on that basis.",
          links: [
            { label: "Health portal: Division de la pharmacie et des médicaments (in French)", url: DPM },
            { label: "Health portal: marketing authorisation of medicines (in French)", url: AMM },
            { label: "Chamber of Deputies: bill 8491 creating the Agence luxembourgeoise des médicaments et produits de santé (in French)", url: BILL_8491 },
            { label: "Chamber of Commerce: second complementary opinion on bill 8491, 25 August 2026 (PDF, in French)", url: "https://wdocs-pub.chd.lu/docs/Dossiers_parlementaires/8491/20260831_Avis.pdf" },
          ],
        },
        {
          id: "reimbursement-route",
          title: "Getting paid for: an authorisation, a public price and a listing by the CNS",
          plain:
            "After a medicine is authorised, three more things have to happen before the insurer pays for it at a pharmacy: it needs a public price, the company has to apply for it to be listed, and the Caisse nationale de santé has to add it to the positive list. Medicines not on the list are generally not reimbursed.",
          detail:
            "The health portal states the conditions for entry on the positive list: a marketing authorisation, a fixed public price and an application for listing. The CNS's own page says the list includes medicines that have received marketing authorisation and a public price and whose inclusion has been requested with and granted by the CNS. The 2025 profile says Luxembourg also works through the Beneluxa Initiative with Belgium, the Netherlands, Austria and Ireland on horizon scanning, information sharing and joint health technology assessment for pricing and reimbursement. The profile for Luxembourg does not report how many new cancer medicines are reimbursed or how long listing takes after European authorisation, and OnCo found no national figure for either.",
          links: [
            { label: "Health portal: reimbursement of medicines (English)", url: REIMBURSEMENT },
            { label: "Caisse nationale de santé: medicines and medical devices (English)", url: CNS_MEDICINES },
            CCP("section 5.3"),
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "Direction de la santé: coordination centre for organised cancer screening (in French)", url: SCREENING_CENTRE },
      cards: [
        {
          id: "breast-screening",
          title: "A free mammogram every two years from 45 to 74, read by two radiologists",
          plain:
            "The Programme Mammographie invites women aged 45 to 74 who are insured with the CNS for a free mammogram every two years. Each mammogram is read by two radiologists independently. The age range was 50 to 70 until July 2024. Among women aged 50 to 69, 52% took part in 2022.",
          detail:
            "The health portal says the invitation comes with a voucher, that the woman books at an approved radiology centre of her choice, and that the second reading is done at the coordination centre without knowledge of the first; where the two differ, a third reading settles it. About 8% of mammograms show an abnormality that needs further tests, most of which turn out benign. Women insured with the CNS who live abroad can also take part. The page sets out the limits as well as the benefits: it estimates that about 10% of cancers detected would not have affected the woman's health (overdiagnosis), and describes false positives and cancers that appear between two screens. The 2025 profile says about 430,500 women aged 50 to 70 have taken part since the programme began in 1992 and that by 2022 it had detected cancer in 2,900 of them, and that participation among women aged 50 to 69 fell from 62% in 2010 to 52% in 2022 while the number screened rose from 14,586 to 18,304.",
          links: [
            { label: "Health portal: Programme Mammographie (in French)", url: MAMMO },
            { label: "Government notice of 1 July 2024: screening extended to ages 45 to 74 (in French)", url: SCREENING_2024 },
            CCP("section 4"),
          ],
        },
        {
          id: "bowel-screening",
          title: "A home stool test for everyone aged 45 to 74",
          plain:
            "The colorectal screening programme invites everyone aged 45 to 74 who is insured with the CNS, by post. The test looks for hidden blood in a stool sample taken at home and posted free to the laboratory. If blood is found, the doctor usually arranges a colonoscopy. Participation was 31% in 2022.",
          detail:
            "The health portal describes the programme (PDOCCR) and its faecal immunochemical test: people who took part last time receive the kit with the invitation, and others order it by telephone or online, or collect it at a blood collection centre or a pharmacy. The page is plain about the test's limits: cancers or polyps that are not bleeding when the sample is taken are not detected, so symptoms should still be taken to a doctor after a negative test. The government's notice of 1 July 2024 lowered the starting age from 55 to 45 on a recommendation of the Council of the European Union, with invitations staggered through 2024 and 2025. The 2025 profile says invitations are every two years and gives participation among people aged 55 to 74 as 31% in 2022; it cautions that the 40% reported for 2019 came from survey data during the pilot, so the two are not measured the same way.",
          links: [
            { label: "Health portal: colorectal cancer screening programme (in French)", url: COLORECTAL },
            { label: "Government notice of 1 July 2024: screening extended to ages 45 to 74 (in French)", url: SCREENING_2024 },
            CCP("section 4"),
          ],
        },
        {
          id: "cervical-screening",
          title: "No organised cervical screening: a smear every three years is recommended and left to each woman and her doctor",
          plain:
            "Luxembourg has two organised screening programmes, for breast and bowel cancer. Cervical screening is left to each woman and her doctor: the health portal recommends a smear every three years from 25 to 69, and the 2025 European profile says there is no population-based programme for it. About 60% of women aged 20 to 69 reported a smear within three years in 2022.",
          detail:
            "The Direction de la santé's coordination centre lists two organised programmes. The 2025 profile says measures to set up cervical screening were included in the National Cancer Plans of 2014 to 2018 and 2020 to 2024 without a programme being created, and that national recommendations published in 2019 advise women aged 25 to 69 to consult their clinician about screening by co-testing (HPV and cytology on the same sample). It reports that around 60% of women aged 20 to 69 had a smear within the past three years in 2022, above the EU average of 55% and down from 77% in 2017, and that there are no plans to establish screening programmes for lung, prostate and gastric cancers. The registry's FAQ notes that screening data are held by the Direction de la santé, not by the registry.",
          links: [
            { label: "Direction de la santé: coordination centre for organised cancer screening (in French)", url: SCREENING_CENTRE },
            { label: "Health portal: HPV infection, vaccination and smear advice (in French)", url: HPV_PAGE },
            CCP("section 4"),
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccination is free from 9 to 26 for girls and boys; the coverage figures disagree",
          plain:
            "The HPV vaccine is free in Luxembourg for girls and boys aged 9 to 26, given by doctors and not in schools. WHO's data give 82% of girls and 73% of boys the full course in 2025. The 2025 European profile gives a much lower figure for girls, 43%, and says coverage has been hard to measure since 2018.",
          detail:
            "The health portal sets out the Conseil Supérieur des Maladies Infectieuses's schedule: two doses from 9 to 14, a catch-up for those aged 15 to 20, a catch-up campaign for women and men aged 21 to 26 not vaccinated in adolescence, and three doses for immunocompromised people over 27. The 2025 profile says the programme began in 2008, became universal for girls and boys in 2018, and that since 2018 the Direction de la santé has supplied the vaccine free to doctors; there is no school-based programme, though school nurses record doses and send reminders. WHO's immunisation data give HPV programme coverage among females of 79% (first dose) and 72% (last dose) in 2021, and 87% and 82% in 2025; among males, 68% and 60% in 2022 and 81% and 73% in 2025. The profile, citing WHO estimates for 2016 to 2023, puts the share of girls with all recommended doses by age 15 at 43% against an EU average of 64%, and states that no assessment of coverage has been conducted since distribution moved to medical practices in 2018; an electronic vaccination record begun in 2022 and a survey launched in 2024 are meant to fix that. The two are not labelled as the same measure: WHO's rows are programme coverage for a single year, and the profile's figure is girls with all doses by age 15 over 2016 to 2023. OnCo cannot reconcile them and reports both.",
          links: [
            { label: "Health portal: HPV infection and vaccination (in French)", url: HPV_PAGE },
            { label: "WHO: HPV vaccination coverage rows for Luxembourg (data API)", url: WHO_HPV_API },
            CCP("section 3"),
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What Luxembourg does differently",
      cards: [
        {
          id: "radiotherapy",
          title: "One national radiotherapy centre, in Esch-sur-Alzette, with four treatment machines",
          plain:
            "IAEA's directory counts one radiotherapy centre in Luxembourg. The Centre François Baclesse in Esch-sur-Alzette calls itself the national radiotherapy centre. It lists three linear accelerators and a robotic CyberKnife, and offers brachytherapy for prostate and gynaecological cancers. Chemotherapy can be given alongside in its day hospital.",
          detail:
            "The centre's own page lists 3 linear accelerators (2 Halcyon and 1 Ethos), 1 robotic linear accelerator (CyberKnife), 1 scanner, 1 high-dose-rate brachytherapy afterloader with an iridium-192 source for gynaecological treatment, and equipment for permanent iodine-125 seed implants in the prostate. Its home page says it works closely with the other bodies in cancer care in Luxembourg and the Greater Region. IAEA's DIRAC directory, in a row marked as updated in 2026, counts 1 radiotherapy centre in Luxembourg with 4 units in its field for high-energy photon and electron beam radiotherapy and 2 in its brachytherapy field; by OnCo's reading the 4 would be the centre's three linear accelerators and its CyberKnife, though the directory's country row does not name the centre or the machines. The 2025 profile, using OECD data, gives six radiation therapy machines (four for photon and electron beams and two for brachytherapy or electronic X-ray) and a density of 9 per million people in 2023, up from 7 in 2012, and a density in 2022 that was 12% above the EU average of 8 per million; it reports four of the machines as 10 to 15 years old, one as 5 to 10 and the oldest as 20 to 30, while the centre's page does not give the age of its machines. None of these sources gives waiting times for radiotherapy.",
          links: [
            { label: "Centre François Baclesse: treatments and equipment (in French)", url: CFB_EQUIPMENT },
            { label: "Centre François Baclesse: home page (in French)", url: CFB_HOME },
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
            CCP("section 5.1"),
          ],
        },
        {
          id: "cancer-plan",
          title: "The second National Cancer Plan, 2020 to 2024, has been extended to 2026",
          plain:
            "Luxembourg is on its second National Cancer Plan. It was written for 2020 to 2024 and has been extended to 2026. Its running theme is support for the patient, and its priorities include sharing data digitally between hospitals, modern genetic and molecular testing, organising cancer care into networks, and research.",
          detail:
            "The health ministry's page says the first plan ran from 2014 to 2018 and the second (PNC2) follows the recommendations of the European Partnership for Action Against Cancer and WHO's strategy for national plans. It names as main priorities the digitalisation of data exchange, modern genetics and molecular pathology through the Centre National de Génétique Humaine, structuring oncology into competence networks, translational research, and recognition of the central role of the Institut National du Cancer. The 2025 profile describes eight axes and judges the plan partly aligned with Europe's Beating Cancer Plan: it does not have a primary focus on early detection, and cancer inequalities are covered without being a focus. It says that since the first plan was launched in 2014 the Institut National du Cancer and the National Centre for Human Genetics have been established. The ministry's page was last modified on 25 February 2026; OnCo found no published third plan or a date for one.",
          links: [
            { label: "Health portal: National Cancer Plan 2020-2024, extended to 2026 (in French)", url: PNC },
            { label: "Health portal: National Cancer Plan 2020-2024, brochure (in French)", url: PNC_BROCHURE },
            CCP("section 2, box 1"),
          ],
        },
        {
          id: "coordination",
          title: "A coordinating institute instead of a single cancer hospital",
          plain:
            "The sources read for this page describe no single cancer hospital in Luxembourg. Four general hospitals and the radiotherapy centre treat patients, and the Institut National du Cancer, a non-profit body mandated by the health ministry, coordinates them: it organises case review meetings, writes shared guidelines and patient pathways, and labels providers.",
          detail:
            "The institute's own site says it was founded on 25 June 2015 as a non-profit association recognised as being of public utility, mandated by the ministry of health and social security. The 2025 profile lists its members as the Centre Hospitalier de Luxembourg, the Centre Hospitalier du Nord, the Centre Hospitalier Emile Mayrisch, the Hôpitaux Robert Schuman and the Centre François Baclesse, and says multidisciplinary boards were introduced in 2016: local boards for common cancers, national boards overseen by the institute for rare cancers, and molecular boards. The institute's news of 10 March 2026 reports that a Luxembourg Comprehensive Cancer Centre, a national consortium of those five providers with the Laboratoire National de Santé, the Luxembourg Institute of Health and the University of Luxembourg, was among the first 30 centres designated by the European network EUnetCCC; the institute adds that this designation is neither an accreditation nor a quality certification. The institute's home page says a national lung cancer network has been set up step by step since 2023 with the four hospitals, the radiotherapy centre and the national health laboratory.",
          links: [
            { label: "Institut National du Cancer: about (in French)", url: INC_ABOUT },
            { label: "Institut National du Cancer: Luxembourg CCC designated by EUnetCCC, 10 March 2026 (in French)", url: INC_CCC },
            { label: "Institut National du Cancer: home page (in French)", url: INC_HOME },
            CCP("sections 5.1 and 5.2"),
          ],
        },
        {
          id: "workforce-and-rights",
          title: "Many nurses, fewer doctors, and a right to be forgotten after ten years",
          plain:
            "Luxembourg has more nurses for each new cancer case than almost any EU country but fewer doctors than the EU average, partly because it had no medical degree of its own until 2020. Since 2020, people who finished cancer treatment ten years ago no longer have to declare it when applying for insurance or a loan.",
          detail:
            "The 2025 profile counts 647 physicians per 1,000 new cancer cases against an EU average of 679, and 2,538 nurses per 1,000 new cases against 1,376; the workforce figures for Luxembourg date from 2017. A Bachelor of Medicine was established in September 2020, along with three postgraduate specialty training programmes, one of them in oncology. The profile says the right to be forgotten, implemented in 2020, means a cancer diagnosis need not be disclosed for financial products 10 years after treatment ends, or 5 years for those under 18. It also reports that children with cancer are treated at one national paediatric oncology and haematology service at the Centre Hospitalier de Luxembourg, which treats 25 to 30 children a year and has agreements with France, Germany and Belgium for specific childhood cancers, and that five-year survival is not yet collected systematically. The registry's FAQ says its first survival analysis, on 3,003 women diagnosed with invasive breast cancer between 2013 and 2018, was published in 2026.",
          links: [
            CCP("sections 5.1, 5.2, 5.4 and 6"),
            { label: "Registre National du Cancer: FAQ (in French)", url: RNC_FAQ },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Luxembourg", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "Five trials in OnCo's records list a site in Luxembourg, none recruiting",
          plain:
            "Five trials in OnCo's records include Luxembourg among their countries: four completed phase 3 trials and one phase 1/2 breast cancer study that is active but no longer recruiting. OnCo holds a selection of trials, not the whole registry, so this is not a count of what is open in Luxembourg today.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026. The four completed phase 3 trials are ALTA-1L and PROFILE 1014 in ALK-positive lung cancer, and two European Organisation for Research and Treatment of Cancer trials, EORTC 22033-26033 in low-grade glioma and EORTC 22991 in prostate cancer; the fifth is an umbrella study of elacestrant combinations in metastatic breast cancer (NCT05563220). The 2025 profile, citing the European paediatric oncology society, says that of 436 trials enrolling children and young people in Europe between 2010 and 2022, none was available in Luxembourg to children under 18. The profile also notes the development of a National Centre for Translational Cancer Research in April 2022 under the cancer plan. Search the registry itself for what is recruiting now.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Luxembourg", url: CTGOV },
            { label: "Elacestrant umbrella study (NCT05563220)", url: "https://clinicaltrials.gov/study/NCT05563220" },
            CCP("sections 2 and 6"),
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-survival-and-access",
      title: "Not found: national survival, and how fast new cancer medicines are reimbursed",
      plain:
        "OnCo found no national five-year survival figures for Luxembourg beyond one breast cancer study, no count of how many new cancer medicines are on the positive list, and no measure of the time from European approval to reimbursement. The registry also does not yet publish how many people are living with cancer.",
      detail:
        "The 2025 Country Cancer Profile says five-year survival data are not systematically collected, and gives no figure for the share of new cancer medicines reimbursed or the delay after European Medicines Agency authorisation. The registry's FAQ says survival analyses have begun with breast cancer and that national prevalence estimates are not yet published. The CNS positive list is published as files sorted by name; OnCo did not open or analyse those files, so no cancer medicine on this page is described as listed or not listed. The registry's dashboard, which covers 2014 to 2023, loads its figures with JavaScript and could not be read by a plain request, so the 2023 figures on this page are the headline numbers printed on the registry's own pages.",
      links: [
        CCP("sections 5.2 and 5.3"),
        { label: "Registre National du Cancer: FAQ (in French)", url: RNC_FAQ },
        { label: "Caisse nationale de santé: positive list of medicines (in French)", url: CNS_POSITIVE_LIST },
      ],
    },
    {
      id: "gap-sources",
      title: "Sources looked for and not read",
      plain:
        "OnCo did not find the published law creating the medicines agency, a third cancer plan, radiotherapy waiting times, or the full text of the current cancer plan. The Luxembourg Institute of Health's own pages and several pages of the insurer's site could not be reached at the addresses tried.",
      detail:
        "On 16 November 2026: the Chamber of Deputies' file on bill 8491 showed the vote of 29 October 2026 and no promulgation; OnCo did not search the Mémorial for the law. The address almps.public.lu redirected to the existing division's page. Two guessed addresses on lih.lu returned an error page, so the Luxembourg Institute of Health is described here only through the registry's report and the Institut National du Cancer's news. Several guessed addresses on cns.public.lu and on the health portal returned 404 before the right pages were found by search. The plan's brochure PDF and the 2024 evaluation report of the Programme Mammographie were located but not read; plancancer.lu redirects to the health portal. The registry's page for the 2014 to 2021 report gives its publication as November 2025. One sentence of that report gives 12,424 cases in men where its figure captions give 12,242, which is the number that adds up to the report's total of 23,660 with the 11,418 cases in women. WHO's 2020 cancer country profile was not used because newer national sources were available.",
      links: [
        { label: "Chamber of Deputies: bill 8491 (in French)", url: BILL_8491 },
        { label: "Health portal: National Cancer Plan 2020-2024, brochure (in French)", url: PNC_BROCHURE },
        { label: "Registre National du Cancer: home page (in French)", url: RNC_HOME },
      ],
    },
  ],
  institutions: [
    "registre-national-du-cancer-luxembourg", "inc-luxembourg", "centre-francois-baclesse-luxembourg", "centre-hospitalier-de-luxembourg",
    "cns-luxembourg", "dpm-luxembourg", "centre-coordination-depistages-cancers-luxembourg", "ema",
  ],
  companies: ["steba-biotech"],
  drugs: [],
  trials: ["nct05563220", "alta-1l", "profile-1014", "eortc-22033", "eortc-22991"],
  papers: [],
  people: ["nikolai-goncharenko"],
  how:
    "Every card was written from Luxembourgish, European and international public sources read as raw text on 16 November 2026: the Registre National du Cancer's site and its 2014 to 2021 report, the health ministry's portal, the Caisse nationale de santé, the Chamber of Deputies, the Centre François Baclesse, the Institut National du Cancer, the OECD and European Commission's 2025 Country Cancer Profile, EMA's leaflet, IAEA's DIRAC directory, WHO's immunisation data, the World Bank and IARC's GLOBOCAN 2024 fact sheet. French sources were read in French.",
  verify:
    "Registry counts for recent years can be revised as late reports arrive. Screening ages, reimbursement rates and the positive list change, and the medicines agency voted in October 2026 may by now have replaced the division described here. Check the health portal and the Caisse nationale de santé before relying on a rule, and ask the treating team about cover for a specific medicine.",
  verifyLinks: [
    { label: "Registre National du Cancer", url: RNC_HOME },
    { label: "Caisse nationale de santé: medicines and medical devices", url: CNS_MEDICINES },
    { label: "Health portal: National Cancer Plan", url: PNC },
    { label: "EU Country Cancer Profile Luxembourg 2025 (European Cancer Inequalities Registry)", url: CCP_PAGE },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Luxembourg (PDF)", url: IARC_FACTSHEET },
  ],
};

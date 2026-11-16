import type { CountryDive } from "@/data/country-dive";

/**
 * Morocco deep dive: the hand-written cards for /countries/ma/ (wave 5). Every figure was read from the raw text of its
 * source on 11 November 2026, in French where that is the original, not from a summary of it: the Plan National de
 * Prévention et de Contrôle du Cancer 2020 to 2029 (PDF text, French edition, checked against the Arabic edition), the
 * Registre des Cancers de la Région du Grand Casablanca's incidence report for 2013 to 2017 (PDF text), the Fondation
 * Lalla Salma's own pages, IARC's GLOBOCAN 2024 fact sheet for Morocco, WHO's cancer country profile 2020, WHO's
 * immunisation data (WIISE public API), the World Bank's health expenditure series, the Rabat registry paper and a 2026
 * registry survey through Europe PMC, and press reports of ministers' statements and official notes (Hespress, Aujourd'hui
 * le Maroc, Le360, Finances News Hebdo), each named where it is used. The websites of the medicines agency, the CNSS,
 * the health insurance agency (ANAM) and CNOPS did not answer, and the Internet Archive refused connections from this
 * machine during the session; what that leaves unverified is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/504-morocco-fact-sheet.pdf";
const WHO_PROFILE_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/mar-2020.pdf";
const PNPCC2_FR = "https://lodj.ma/attachment/2414341";
const PNPCC2_AR = "https://www.iccp-portal.org/system/files/plans/Plan_National_de_Prevention_et_de_Controle_du_Cancer_2020-2029_VA.pdf";
const RCGC_2013_17 = "https://contrelecancer.ma/site_media/uploaded_files/Registre_des_Cancers_de_la_Region_du_Grand_Casablanca_2013-2017.pdf";
const RABAT_2013 = "https://doi.org/10.3332/ecancer.2013.338";
const CHELLAT_2026 = "https://doi.org/10.1016/j.jcpo.2026.100774";
const FLSC = "https://www.contrelecancer.ma/fr/alsc";
const FLSC_PNPCC = "https://www.contrelecancer.ma/fr/le_pnpcc";
const FLSC_ACCES = "https://www.contrelecancer.ma/fr/hopitaux_acces_aux_medicaments";
const FLSC_MV = "https://www.contrelecancer.ma/fr/maisons-de-vie/";
const FLSC_DP = "https://www.contrelecancer.ma/fr/detection_precoce";
const HES_REVIEW_2026 = "https://fr.hespress.com/481494-lutte-contre-le-cancer-le-ms-veut-accelerer-la-prevention-et-reduire-les-inegalites-dacces-aux-soins.html";
const AUJ_REVIEW_2026 = "https://aujourdhui.ma/?p=524782";
const HES_AMO_89 = "https://fr.hespress.com/495393-amo-plus-de-4-millions-de-marocains-toujours-exclus-malgre-un-taux-de-couverture-de-89.html";
const HES_CNSS_2026 = "https://fr.hespress.com/487088-cnss-plus-de-25-millions-de-beneficiaires-de-lamo-en-2025-en-hausse-de-3.html";
const HES_TADAMON_2024 = "https://fr.hespress.com/392505-amo-tadamon-1551-mmdh-de-cotisations-des-beneficiaires-versees-par-letat-a-la-cnss.html";
const HES_RSU_2024 = "https://fr.hespress.com/359872-ait-taleb-12-million-exclus-du-regime-amo-tadamon-par-le-rsu.html";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=MA";
const L360_LAW_10_22 = "https://fr.le360.ma/politique/chambre-des-representants-adoption-du-projet-de-loi-sur-la-creation-de-lagence-des-medicaments_FPLLIXKSPBCEPE6TPIZ5B7CFQQ/";
const HES_AMMPS_2025 = "https://fr.hespress.com/454502-ca-ammps-tahraoui-fixe-le-cap-de-la-souverainete-sanitaire.html";
const FNH_2026 = "https://www.fnh.ma/article/actualite-economique/reglementation-pharmaceutique-maroc-pharmacovigilance-reforme";
const L360_HPV_2022 = "https://fr.le360.ma/societe/cancer-du-col-uterin-le-vaccin-anti-hpv-integre-le-calendrier-vaccinal-au-maroc-a-partir-doctobre-267137";
const WHO_HPV = "https://immunizationdata.who.int/global/wiise-detail-page/human-papillomavirus-(hpv)-vaccination-coverage?CODE=MAR";
const BOURISSI_2026 = "https://doi.org/10.1007/s13187-025-02729-5";

export const MA_DIVE: CountryDive = {
  iso2: "MA",
  iso3: "MAR",
  name: "Morocco",
  flag: "🇲🇦",
  asOf: "2026-11-11",
  title: "Cancer in Morocco",
  description:
    "Cancer in Morocco from Moroccan sources: IARC's estimate of 47,944 new cancers and 26,459 deaths in 2024 built on city registries, two national cancer plans written by the health ministry and the Fondation Lalla Salma, health cover widened from 42% to about 89% of the population, free cancer care in public centres, the new medicines agency (AMMPS), 45 linear accelerators, and an HPV vaccine introduced in 2022 that reached about 3% of girls.",
  lede:
    "Morocco has no national cancer registry: its figures come from population registries in cities such as Casablanca and Rabat, and IARC applies subnational registry rates to the whole country to estimate 47,944 new cancers in 2024, with breast cancer first in women and lung cancer in men. Since 2010 the health ministry and the Fondation Lalla Salma have run two ten-year cancer plans that built regional oncology centres and made screening and treatment in public centres largely free, while compulsory health insurance has been extended to about nine in ten people.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Morocco is 47,944 new cancers and 26,459 deaths, an age-standardised incidence of 112.9 per 100,000 (103.9 in men, 123.8 in women) and mortality of 62.2; the all-cancers figure includes non-melanoma skin cancer, and without it IARC gives 47,550 cases. IARC's fact sheet gives the incidence source as subnational registries, with subnational rates applied to the 2024 population, and mortality as national incidence estimates applied to modelled mortality-to-incidence ratios from registry survival data, so neither is a national count. The Greater Casablanca registry's own rates for 2013 to 2017 are very close to IARC's national ones: 101.9 per 100,000 men and 123.0 per 100,000 women, breast cancer 45.6 per 100,000 women against IARC's 48.1, cervical cancer 10.2 against 10.2, lung cancer in men 25.8 against 25.6 and prostate cancer 15.3 against 17.3. Rabat's registry, whose only report found covers 2006 to 2008, measured 136.6 per 100,000 men and 114.5 per 100,000 women. The 2020 to 2029 national plan put the number of new cancers at close to 50,000 a year, and the health minister said in July 2026 that public oncology centres see nearly 24,000 new patients a year; neither is a count of all cancers in the country. WHO's 2020 profile rated the quality of Morocco's death registration very low for 2007 to 2016, and IARC models deaths rather than counting them.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Morocco",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Morocco (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 48,000 new cancers a year, breast cancer first",
          plain:
            "IARC estimates 47,944 new cancers in Morocco in 2024: 26,689 in women and 21,255 in men. Breast cancer is the commonest, at 39% of cancers in women, followed by thyroid and cervical cancer. In men lung cancer leads, at a quarter of all cancers, and it causes more deaths than any other cancer.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 10,410 breast cancers (3,918 deaths), 6,101 lung (5,763 deaths), 4,040 colorectal (2,068 deaths), 3,533 prostate (1,348 deaths) and 3,209 thyroid cancers. In men the leading cancers by cases are lung (5,326, 25.1%), prostate (3,533), colorectum (2,025), bladder (1,342) and non-Hodgkin lymphoma (849); in women breast (10,410), thyroid (2,704), cervix (2,228), colorectum (2,015) and ovary (1,029). Nasopharyngeal cancer, common across North Africa, accounts for 666 cases. The risk of developing a cancer before age 75 is 11.3% for men and 12.6% for women, and IARC estimates 113,159 people living within five years of a diagnosis. The Casablanca registry adds what IARC cannot: in 2013 to 2017 the age groups with most cancers in women were 45 to 59, younger than in men, among whom people aged 75 and over were the largest group.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Morocco (PDF)", url: IARC_FACTSHEET },
            { label: "RCGC: incidence report 2013 to 2017 (PDF)", url: RCGC_2013_17 },
          ],
        },
        {
          id: "city-registries",
          title: "Two city registries stand in for a national one",
          plain:
            "Morocco counts cancer in two cities. The Greater Casablanca registry, running since 2004 and supported by the Fondation Lalla Salma since 2005, has published four incidence reports, the latest covering 2013 to 2017. Rabat's registry, whose report was written at the national oncology institute, has one report found online, for 2006 to 2008.",
          detail:
            "The Casablanca registry collects every new invasive cancer in residents of the region as drawn in 2003 (Casablanca, Mohammedia, Médiouna and Nouaceur) from public hospitals, oncology centres, private clinics and pathology laboratories, and recorded 25,143 cases in 2013 to 2017. Its report states that IARC named it a collaborating centre for registry training in Africa in 2018. The 2020 to 2029 national plan commits to consolidating it with a report every two years, setting up a national children's cancer registry and hospital registries in every regional oncology centre, but no report after 2013 to 2017 was found. Rabat's 2006 to 2008 report counted 2,473 cases; its authors wrote that no population-based incidence data from Morocco had been published before it. A 2026 survey of 319 people working in cancer control found that 56.4% knew of the Casablanca registry and that its data were used more for research than for planning.",
          links: [
            { label: "RCGC: incidence report 2013 to 2017 (PDF)", url: RCGC_2013_17 },
            { label: "Tazi et al., cancer incidence in Rabat 2006 to 2008 (ecancermedicalscience 2013)", url: RABAT_2013 },
            { label: "Plan National de Prévention et de Contrôle du Cancer 2020 to 2029, measure 7.15 (PDF)", url: PNPCC2_FR },
            { label: "Chellat et al., use of the Casablanca registry (Journal of Cancer Policy 2026)", url: CHELLAT_2026 },
          ],
        },
      ],
      tables: [
        {
          id: "ma-registries",
          title: "What Morocco's cancer registries report",
          caption: "New cancers and age-standardised rates per 100,000 as each source states them, 2006 to 2017. The standard population differs by row and is named in the last column.",
          columns: [
            { key: "registry", label: "Registry and cancer" },
            { key: "period", label: "Years" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "men", label: "Men, per 100,000", numeric: true },
            { key: "women", label: "Women, per 100,000", numeric: true },
            { key: "rate", label: "Rate type" },
          ],
          rows: [
            { registry: "Greater Casablanca, all cancers (10,557 men, 14,586 women)", period: "2013 to 2017", cases: 25143, men: 101.9, women: 123.0, rate: "Age-standardised, world population; both sexes 111.9" },
            { registry: "Greater Casablanca, all cancers", period: "2013 to 2017", cases: null, men: 82.7, women: 116.3, rate: "Age-standardised, Moroccan population; both sexes 99.4" },
            { registry: "Greater Casablanca, breast", period: "2013 to 2017", cases: 5669, men: 1.0, women: 45.6, rate: "Age-standardised, world population; 5,555 in women" },
            { registry: "Greater Casablanca, cervix", period: "2013 to 2017", cases: 1187, men: null, women: 10.2, rate: "Age-standardised, world population" },
            { registry: "Greater Casablanca, lung", period: "2013 to 2017", cases: 3124, men: 25.8, women: 3.7, rate: "Age-standardised, world population" },
            { registry: "Greater Casablanca, prostate", period: "2013 to 2017", cases: 1438, men: 15.3, women: null, rate: "Age-standardised, world population" },
            { registry: "Greater Casablanca, all cancers, as the 2020 to 2029 plan quotes it", period: "2008 to 2012", cases: null, men: null, women: null, rate: "Both sexes 137.3 on the world population, 115.4 on the Moroccan population" },
            { registry: "Rabat, all cancers", period: "2006 to 2008", cases: 2473, men: 136.6, women: 114.5, rate: "Age-standardised, world population" },
          ],
          note: "Registries publish new cases; Casablanca's report describes collecting deaths from municipal hygiene offices but publishes no mortality rates in the pages read. The 2008 to 2012 row is the national plan's quotation of the registry's earlier report, which was not read; the plan's own sentence compares that figure with a 2004 rate on a different standard, so the apparent fall to 111.9 in 2013 to 2017 is not used here as a trend. Rabat's figures are from the only report of that registry found online.",
          sources: [
            { label: "RCGC: Registre des cancers de la région du Grand Casablanca, rapport d'incidence 2013 to 2017 (PDF)", url: RCGC_2013_17 },
            { label: "Plan National de Prévention et de Contrôle du Cancer 2020 to 2029, situation analysis (PDF)", url: PNPCC2_FR },
            { label: "Tazi et al. (ecancermedicalscience 2013)", url: RABAT_2013 },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays for cancer care",
      cards: [
        {
          id: "amo-generalisation",
          title: "Health insurance extended from 42% to about 89% of people",
          plain:
            "Morocco has been making compulsory health insurance (AMO) universal. The ministry's figures for 2025 put more than 32 million people under cover, about 89%, against 42% before the reform. The poorest, once on the RAMED assistance scheme, moved in December 2022 to AMO Tadamon, whose contributions the state pays.",
          detail:
            "AMO Tadamon is run by the social security fund (CNSS). The state paid 15.51 billion dirhams of Tadamon contributions from December 2022 to September 2024 and, according to the 2025 finance bill note, also pays the patient's share (ticket modérateur) for Tadamon members treated in public facilities, with a budget of one billion dirhams a year. In March 2024 the health minister said 1.2 million former RAMED beneficiaries had been excluded by the means test of the unified social register. The ministry's note on the 2027 finance bill counts 28.7 million people with open rights, 11.1 million of them in Tadamon, says more than four million people remain without any cover, and states that being affiliated does not always mean effective access to care. In 2025 the CNSS paid 22.65 billion dirhams in health benefits. How cancer is reimbursed under each scheme could not be read from the insurers' own pages, which did not answer.",
          links: [
            { label: "Hespress: AMO, 89% covered and more than four million excluded (7 November 2026)", url: HES_AMO_89 },
            { label: "Hespress: CNSS, 25.08 million AMO beneficiaries in 2025 (4 September 2026)", url: HES_CNSS_2026 },
            { label: "Hespress: AMO Tadamon contributions paid by the state (25 October 2024)", url: HES_TADAMON_2024 },
            { label: "Hespress: 1.2 million excluded from AMO Tadamon by the register (28 March 2024)", url: HES_RSU_2024 },
          ],
        },
        {
          id: "free-public-care",
          title: "Cancer care in public centres is largely free",
          plain:
            "The health ministry says screening, diagnosis and treatment of cancer in the public sector are already largely free, whatever a patient's income or insurance. It spends close to 200 million dirhams a year buying cancer medicines for public oncology centres, and the Fondation Lalla Salma runs a programme giving low-income patients their chemotherapy without charge.",
          detail:
            "The 2020 to 2029 plan states that the first plan secured basic and innovative medicines for all patients in public centres, used without regard to income or social cover, with national treatment protocols and standard preparation units in every regional oncology centre, and that early detection is delivered free in the public sector. The Foundation's ACCES programme provides cancer medicines in public facilities without payment by the patient, aiming at 100% access to chemotherapy for low-income patients without cover. At the plan's mid-term review on 15 July 2026 the minister, Amine Tahraoui, gave the 200 million dirham medicines budget and said it covers innovative molecules, while asking for vigilance on supply. Private clinics, where the plan counts more than 18 oncology providers and 24 of 45 accelerators, are paid through insurance and by patients; this page found no published figure for what cancer patients pay there.",
          links: [
            { label: "Hespress: mid-term review of the cancer plan (15 July 2026)", url: HES_REVIEW_2026 },
            { label: "Fondation Lalla Salma: hospitals and access to medicines (ACCES)", url: FLSC_ACCES },
            { label: "Plan National de Prévention et de Contrôle du Cancer 2020 to 2029 (PDF)", url: PNPCC2_FR },
          ],
        },
        {
          id: "out-of-pocket",
          title: "Households pay a falling but large share of health spending",
          plain:
            "Out-of-pocket payments were 37.3% of Morocco's current health spending in 2023, down from 49.2% in 2014, according to the World Bank's series from WHO's Global Health Expenditure Database. Health spending was 6.1% of GDP in 2023. These figures cover all health care, not cancer alone.",
          detail:
            "The World Bank's indicator gives out-of-pocket spending as 51.7% of current health expenditure in 2013, 49.2% in 2014, 48.0% in 2017, 46.6% in 2019, 43.4% in 2020, 41.8% in 2021, 40.5% in 2022 and 37.3% in 2023. No source read for this page measures what cancer patients themselves pay, how many face catastrophic costs, or what share of cancer care is delivered in private clinics; a search of Europe PMC found no Moroccan study with those words in its title. The 2020 to 2029 plan asks the national health insurance agency (ANAM) to add nicotine replacement and a palliative care nomenclature to what AMO reimburses, a sign of how reimbursement lists are set.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Morocco", url: WB_OOP },
            { label: "Plan National de Prévention et de Contrôle du Cancer 2020 to 2029, measures 1.2 and 21.52 (PDF)", url: PNPCC2_FR },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The medicines agency",
      cards: [
        {
          id: "ammps",
          title: "A new medicines agency replaced the ministry's directorate",
          plain:
            "Law 10-22 created the Agence Marocaine du Médicament et des Produits de Santé (AMMPS), an autonomous agency that took over from the health ministry's Direction du Médicament et de la Pharmacie. It authorises and inspects medicines and other health products and draws up the essential medicines list with other departments.",
          detail:
            "The House of Representatives adopted bill 10-22 in February 2023. As presented by the health minister, the agency coordinates national pharmaceutical policy, regulates and inspects the sector, oversees narcotics and psychotropic substances, promotes local manufacture of generics and biosimilars, and sets and updates the list of essential medicines. Its first board meeting, chaired by the head of government, approved its strategy, organisation and 2025 budget; the second, on 17 December 2025, reviewed its 2025 report and its plans for 2026 to 2028. A pharmaceutical analyst interviewed in May 2026 named Professor Samir Ahid as its director and said a labour dispute led more than 200 former directorate employees to leave, with the agency recruiting by open calls. The agency's own site did not answer, so the text of the law as published and the agency's procedures were not read.",
          links: [
            { label: "Le360: House of Representatives adopts bill 10-22 (1 March 2023)", url: L360_LAW_10_22 },
            { label: "Hespress: second board meeting of the AMMPS (17 December 2025)", url: HES_AMMPS_2025 },
            { label: "Finances News Hebdo: interview with Abdelmadjid Belaïche (18 May 2026)", url: FNH_2026 },
          ],
        },
        {
          id: "rules-2026",
          title: "New decrees on imports, trials and drug safety in 2026",
          plain:
            "Decrees adopted in 2025 and early 2026 set a single framework for the import visa of medicines, updated the rules on biomedical research to protect participants, and moved drug safety monitoring to the agency. No published figure was found for how long Morocco takes to approve a cancer medicine.",
          detail:
            "According to the May 2026 interview in Finances News Hebdo, decree 2.26.28 created a unified framework for the sanitary visa of imported medicines, decree 2.26.223 amended the 2021 decree 2.20.326 on biomedical research to strengthen the protection of participants and research ethics, decree 2.26.266 revised the rules for pharmacies and pharmaceutical establishments, and a 2026 law amending the medicines code (law 17-04) set up a national pharmacovigilance system with mandatory reporting by the responsible pharmacists of pharmaceutical establishments. The analyst said the agency aims at WHO maturity level 3 and that pharmacovigilance, formerly run by the poison control and pharmacovigilance centre, is still in transition. These decree numbers come from the interview; the Bulletin officiel texts were not read. Whether the agency relies on approvals by other regulators, and its approval times, are not stated in any source reached.",
          links: [
            { label: "Finances News Hebdo: interview on pharmaceutical regulation (18 May 2026)", url: FNH_2026 },
            { label: "Le360: bill 10-22 and the agency's missions (1 March 2023)", url: L360_LAW_10_22 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Early detection and HPV vaccination",
      cards: [
        {
          id: "early-detection",
          title: "Breast and cervical early detection since 2010, free in public care",
          plain:
            "Morocco has run an organised early detection programme for breast and cervical cancer since 2010. Women aged 40 to 69 are offered a breast examination every two years and women aged 30 to 49 a cervical test every three years, free in the public sector, through health centres and reference centres for reproductive health.",
          detail:
            "The 2020 to 2029 plan reports that the breast programme reached its goal of covering half of the target population, with more than 30% of eligible women covered each year since 2015 (a participation rate of 60%), while cervical screening covered 8% to 9% a year (25% participation) and was in place in 11 of 12 regions and 58 of 82 provinces. WHO's 2020 profile records the cervical method as visual inspection and participation under 10%. The first plan built 39 reproductive health reference centres where it had planned 23, and fielded 16 mobile teams; the ministry counted 59 centres in July 2026, with mobile mammography units in remote areas. The second plan sets targets of 40% annual coverage for breast and 30% for cervical screening, makes mammography and early diagnosis free, and plans a pilot of HPV testing for cervical screening in line with WHO's recommendations.",
          links: [
            { label: "Plan National de Prévention et de Contrôle du Cancer 2020 to 2029, actions 10 to 12 (PDF)", url: PNPCC2_FR },
            { label: "WHO: cancer country profile 2020, Morocco (PDF)", url: WHO_PROFILE_2020 },
            { label: "Aujourd'hui le Maroc: mid-term review (17 July 2026)", url: AUJ_REVIEW_2026 },
            { label: "Fondation Lalla Salma: early detection", url: FLSC_DP },
          ],
        },
        {
          id: "hpv-vaccination-ma",
          title: "HPV vaccine since October 2022, reaching about 3% of girls",
          plain:
            "The HPV vaccine entered Morocco's national immunisation schedule in October 2022 for girls aged 11, free of charge. WHO's data show it reached about 3% of the target group of 320,000 girls in 2024, far from the 90% the cancer plan aims for, and the plan's steering committee named it a weakness in 2026.",
          detail:
            "A joint circular of the health and education ministries dated 14 September 2022 announced the vaccine for girls aged 11 and over in public, private and foreign-mission schools, in two doses six months apart. WHO's immunisation database now lists Morocco's schedule as one dose, delivered mainly in health facilities, for girls. The administrative figures Morocco reported to WHO give 11,365 girls completing the schedule in 2023 out of a target of 319,989 (3.6%) and 9,315 receiving a first dose in 2024 out of 320,000 (2.9%); WHO's summary gives 3% for both first and last dose. The 2020 to 2029 plan's target is 90% coverage of girls aged 11. A 2026 commentary in the Journal of Cancer Education names lack of awareness, sociocultural and religious sensitivities and a fall in trust since the COVID-19 pandemic as barriers, and the July 2026 mid-term review called for coverage to rise.",
          links: [
            { label: "Le360: HPV vaccine enters the schedule from October 2022 (19 September 2022)", url: L360_HPV_2022 },
            { label: "WHO: HPV vaccination coverage, Morocco", url: WHO_HPV },
            { label: "Bourissi and Zinab, HPV vaccination in Morocco (Journal of Cancer Education 2026)", url: BOURISSI_2026 },
            { label: "Hespress: mid-term review of the cancer plan (15 July 2026)", url: HES_REVIEW_2026 },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Centres, machines and specialists",
      cards: [
        {
          id: "radiotherapy-ma",
          title: "45 linear accelerators, more than half of them private",
          plain:
            "When the second cancer plan was written, Morocco had 45 linear accelerators: 21 in the public sector, two of them military, and 24 in private clinics. Brachytherapy was available in every university hospital's regional oncology centre. WHO counted 8 external beam radiotherapy machines per 10,000 cancer patients in 2019.",
          detail:
            "The 2020 to 2029 plan says the first plan's investment put Morocco among the countries meeting WHO's recommended norms for radiotherapy, that good practice guidelines are used in every radiotherapy service, and that it counted more than 190 radiation oncologists and nearly 180 medical oncologists, above the first plan's norms of one radiation oncologist per 400 new cancers and one medical oncologist per 300. It budgets a further programme of accelerator purchases. WHO's 2020 profile gives, per 10,000 cancer patients, 8.0 external beam radiotherapy units, 9.5 medical physicists, 43.6 mammographs, 53.0 CT scanners, 22.7 MRI scanners and 2.3 PET scanners. IAEA's directory of radiotherapy centres could not be queried, so no more recent machine count is given here.",
          links: [
            { label: "Plan National de Prévention et de Contrôle du Cancer 2020 to 2029, situation analysis (PDF)", url: PNPCC2_FR },
            { label: "WHO: cancer country profile 2020, Morocco (PDF)", url: WHO_PROFILE_2020 },
          ],
        },
        {
          id: "oncology-centres-ma",
          title: "Regional oncology centres treat about 24,000 new patients a year",
          plain:
            "Public cancer care runs through regional oncology centres attached to university and regional hospitals, ten of them working when the second plan was written, plus paediatric haemato-oncology centres in Casablanca and Rabat. In July 2026 the minister said public centres follow more than 110,000 patients a year, nearly 24,000 of them new.",
          detail:
            "The 2020 to 2029 plan lists ten operational regional oncology centres, two paediatric haemato-oncology centres in the Casablanca and Rabat university hospitals with two more being opened in Fès and Marrakech, centres of excellence for gynaecological and breast oncology in Casablanca and Rabat, digestive surgery in Rabat and thoracic surgery in Casablanca, and more than 18 private oncology clinics. A computerised patient record was installed in the centres of Rabat, Casablanca, Tangier and Béni Mellal. The first plan created six palliative care units in the regional centres, which had cared for nearly 28,000 patients, and seven mobile teams that had treated more than 4,500 patients at home; morphine consumption more than tripled, from 7.28 kg in 2009 to more than 25 kg in 2016. The reform now places hospitals under territorial health groups, and the minister asked each to adopt a cancer roadmap.",
          links: [
            { label: "Plan National de Prévention et de Contrôle du Cancer 2020 to 2029, situation analysis (PDF)", url: PNPCC2_FR },
            { label: "Hespress: mid-term review of the cancer plan (15 July 2026)", url: HES_REVIEW_2026 },
            { label: "Aujourd'hui le Maroc: mid-term review (17 July 2026)", url: AUJ_REVIEW_2026 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Morocco does",
      title: "What Morocco does differently",
      cards: [
        {
          id: "foundation-partnership",
          title: "A foundation and the ministry write the cancer plan together",
          plain:
            "Morocco's cancer plans are a partnership between the health ministry and the Fondation Lalla Salma, a non-profit created in 2005 on the initiative of Princess Lalla Salma. The first plan, launched on 24 March 2010 with 78 measures, built the network of public oncology centres; the second runs from 2020 to 2029.",
          detail:
            "The Foundation, recognised as being of public utility and funded by partnerships and private donors, says it does not replace any public, private or voluntary actor but works alongside them; it financed and equipped oncology centres with the ministry, standardised treatment protocols and medicine circuits, and supports the Casablanca registry. The second plan was drafted by a joint committee from the first plan's evaluations and the registry's data, in five workshops. Its investment budget is 7.83 billion dirhams over ten years, 74% of it for treatment and care, 15% for prevention (mostly the prevention of infection-related cancers), 4% for early detection and 1% for palliative care. A steering committee chaired by the minister met on 15 July 2026 for the mid-term review and set priorities for 2027 to 2029: governance, prevention, equal access to diagnosis and treatment, staff and equipment, and digital records.",
          links: [
            { label: "Fondation Lalla Salma: the national cancer plan", url: FLSC_PNPCC },
            { label: "Fondation Lalla Salma: who we are", url: FLSC },
            { label: "Plan National de Prévention et de Contrôle du Cancer 2020 to 2029, budget (French, PDF)", url: PNPCC2_FR },
            { label: "Plan National de Prévention et de Contrôle du Cancer 2020 to 2029 (Arabic, PDF)", url: PNPCC2_AR },
          ],
        },
        {
          id: "maisons-de-vie",
          title: "Houses where patients from far away stay during treatment",
          plain:
            "Because many patients travel far to reach an oncology centre, the Fondation Lalla Salma opened maisons de vie, houses beside the centres where patients and their families sleep and eat during weeks of outpatient treatment. The first opened in Casablanca in May 2007, with others in Agadir, Fès, Marrakech, Meknès and beyond.",
          detail:
            "The Foundation says the houses were created to improve care and reduce the number of patients who abandon long treatment. Each offers between 6,000 and 12,000 nights a year, with occupancy between 60% and 89% and peaks at 100%, and teams of health professionals, psychologists, social workers and volunteers. Its list of addresses includes houses near the oncology centres of Béni Mellal, Marrakech, Tangier and Laâyoune, and a house for children and their parents in Casablanca. The Foundation also runs an orphans' programme, launched in January 2014, that pays school costs for children whose father died of cancer in a public hospital, with 154 children in its first year. These figures are the Foundation's own; no independent evaluation of the houses was found.",
          links: [
            { label: "Fondation Lalla Salma: maisons de vie", url: FLSC_MV },
            { label: "Fondation Lalla Salma: home page (programmes)", url: "https://www.contrelecancer.ma/fr/" },
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
          id: "trials-research-ma",
          title: "One trial in OnCo's records lists a site in Morocco",
          plain:
            "Of the trials whose ClinicalTrials.gov site lists OnCo holds, one lists Morocco: IMpassion131, Roche's phase 3 trial of atezolizumab with paclitaxel in triple-negative breast cancer. That reflects OnCo's own records, not every trial open in Morocco, so patients should search the registry directly.",
          detail:
            "The count was made on 11 November 2026 from the ClinicalTrials.gov participation snapshots in OnCo's graph; OnCo does not hold site lists for every trial, so the ClinicalTrials.gov search below is the place to look. A 2026 decree updated Morocco's rules for biomedical research to strengthen participants' protection. Moroccan cancer research visible in OnCo includes the Rabat registry's 2006 to 2008 incidence report and a 2026 survey of how the Casablanca registry's data are used, by authors from the Cancer Research Institute in Fès, the Fondation Lalla Salma, the ministry and the Moroccan Association of Cancer Registries. The 2020 to 2029 plan has a training and research axis with its own budget lines.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Morocco", url: "https://clinicaltrials.gov/search?cond=Cancer&country=Morocco" },
            { label: "Tazi et al., cancer incidence in Rabat 2006 to 2008 (ecancermedicalscience 2013)", url: RABAT_2013 },
            { label: "Chellat et al., use of the Casablanca registry (Journal of Cancer Policy 2026)", url: CHELLAT_2026 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "unreachable-ma",
      title: "The insurers' and the medicines agency's own sites could not be read",
      plain:
        "The websites of the medicines agency (AMMPS), the social security fund (CNSS), the health insurance agency (ANAM) and the civil servants' fund (CNOPS) did not answer on 11 November 2026, and Internet Archive copies could not be fetched. Insurance and regulatory facts on this page therefore rest on press reports of official statements and notes.",
      detail:
        "ammps.sante.gov.ma, cnss.ma and cnops.org.ma did not connect, and anam.ma returned a 404 page; the Internet Archive lists copies of the AMMPS, CNSS and ANAM sites but refused connections from this machine during the session. As a result, the list of long-term and costly conditions reimbursed in full under AMO, which is where cancer cover is set, was not read; nor were the published text of law 10-22, the AMMPS's registration procedures, any approval times or reliance pathways, or the essential medicines list. Figures on AMO coverage come from Hespress reports of the CNSS's communiqué and of the ministry's note on the 2027 finance bill. Medias24, SNRT News and Le Desk refused automated requests, so their reports on HPV vaccination and AMO Tadamon were not used.",
      links: [
        { label: "Hespress: AMO, 89% covered (7 November 2026)", url: HES_AMO_89 },
        { label: "Finances News Hebdo: interview on pharmaceutical regulation (18 May 2026)", url: FNH_2026 },
      ],
    },
    {
      id: "registry-gaps-ma",
      title: "No national registry, no recent Rabat report, no counted deaths",
      plain:
        "Morocco has no national cancer registry and no reliable count of cancer deaths. The latest Casablanca report found covers 2013 to 2017 and the only Rabat report found covers 2006 to 2008, so every national figure on this page is an estimate built on city data.",
      detail:
        "The Casablanca report for 2013 to 2017 was read from its PDF, whose damaged structure stopped text extraction at page 164 of 184, so the annex with the yearly population of the covered area was not read; the 2008 to 2012 report was not read and its figures are as the national plan quotes them. Registry-based studies from the Oriental region, Marrakech and Kenitra exist in the literature but were not read for this page. The plan's promised national children's cancer registry and hospital registries in each regional centre were not found online. No Moroccan population-based survival figures were read. IAEA's directory of radiotherapy centres is a script-driven application that returned no data to a plain request, so the radiotherapy count is the plan's figure from 2019 to 2020.",
      links: [
        { label: "RCGC: incidence report 2013 to 2017 (PDF)", url: RCGC_2013_17 },
        { label: "WHO: cancer country profile 2020, Morocco (PDF)", url: WHO_PROFILE_2020 },
      ],
    },
    {
      id: "plan-evaluation-ma",
      title: "The mid-term evaluation of the cancer plan is not published",
      plain:
        "The 2026 mid-term review of the 2020 to 2029 cancer plan is known only from press reports of the steering committee's meeting. Its figures, including 24,000 new patients a year in public centres and a 200 million dirham medicines budget, are the minister's as reported, not from a published evaluation.",
      detail:
        "Hespress and Aujourd'hui le Maroc reported the meeting of 15 July 2026 and the priorities approved for 2027 to 2029; no evaluation report was found on the ministry's or the Foundation's site. The first plan's final evaluation, which the second plan cites, was also not found. The second plan's budget table, read from the PDF text, has misaligned sub-lines under treatment and care, so only the totals by axis are used. The health minister's name is spelled Tahraoui in the AMMPS report and Tehraoui in the plan review reports; this page uses Tahraoui.",
      links: [
        { label: "Hespress: mid-term review of the cancer plan (15 July 2026)", url: HES_REVIEW_2026 },
        { label: "Aujourd'hui le Maroc: priorities for 2027 to 2029 (17 July 2026)", url: AUJ_REVIEW_2026 },
      ],
    },
  ],
  institutions: ["casablanca-cancer-registry", "fondation-lalla-salma", "ministry-of-health-morocco", "ammps-morocco", "cnss-morocco", "institut-national-oncologie-rabat", "centre-mohammed-vi-casablanca", "iarc", "who"],
  companies: [],
  drugs: [],
  trials: ["impassion131"],
  papers: ["paper-tazi-rabat-cancer-incidence-ecancer-2013", "paper-chellat-casablanca-registry-survey-j-cancer-policy-2026"],
  people: ["karima-bendahhou", "brahim-lakhal"],
  how:
    "Every card was written from Moroccan and international sources read in full rather than through a summary, in French where that is the original: the Plan National de Prévention et de Contrôle du Cancer 2020 to 2029 (French edition, checked against the Arabic edition); the Greater Casablanca cancer registry's incidence report for 2013 to 2017; the Fondation Lalla Salma's own pages; IARC's GLOBOCAN 2024 fact sheet; WHO's 2020 cancer country profile and its immunisation database; the World Bank's health expenditure series; the Rabat registry paper and a 2026 registry survey through Europe PMC; and press reports of ministers' statements and official notes in Hespress, Aujourd'hui le Maroc, Le360 and Finances News Hebdo, named on each card. The new records for this page (the Casablanca registry, the Foundation, the ministry, the AMMPS, the CNSS, the Centre Mohammed VI, two papers and one person) carry their own sources.",
  verify:
    "National incidence and deaths are IARC estimates built on city registries, not counts. Whether a cancer medicine is free to you depends on where you are treated and on your insurance scheme: ask the regional oncology centre's social service, and check your cover with the CNSS or your fund. Screening and HPV vaccination are free at public health centres; ask at the nearest reference centre for reproductive health.",
  verifyLinks: [
    { label: "Ministère de la Santé et de la Protection Sociale", url: "https://www.sante.gov.ma" },
    { label: "Fondation Lalla Salma", url: "https://www.contrelecancer.ma" },
    { label: "CNSS", url: "https://www.cnss.ma" },
    { label: "AMMPS", url: "https://ammps.sante.gov.ma" },
  ],
};

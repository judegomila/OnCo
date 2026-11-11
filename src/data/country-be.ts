import type { CountryDive } from "@/data/country-dive";

/**
 * Belgium deep dive: the hand-written cards for /countries/be/ (wave 5). Sources were read raw, in English, French or
 * Dutch, on 11 November 2026: the Belgian Cancer Registry's Cancer Fact Sheets 2024 and their appendices (pdftotext),
 * its news releases, history and mission pages; IARC's GLOBOCAN 2024 fact sheet for Belgium; the national insurer
 * RIZIV-INAMI's pages on maximum billing, medicine reimbursement reform, Early and Equitable Fast Access, unmet medical
 * need, BeNeLuxA, the multidisciplinary oncology consultation, primary HPV screening, essential medicine shortages and
 * medicines for children with cancer; the FAMHP's pages until its site served a bot challenge; the KCE's own pages; the
 * Flemish screening infosheet for 2023 and the registry's Walloon and Brussels breast screening mementos; WHO's
 * immunisation data API and the World Bank's health expenditure API. Every figure below is quoted from one of those;
 * where a figure could not be read it is named under `gaps`.
 */
const CFS_ALL = "https://kankerregister.org/sites/default/files/2026/2026_BE_CFS2024_ALL_0_1.pdf";
const CFS_LIST = "https://kankerregister.org/en/publicaties/cancer-fact-sheet";
const APP_LUNG = "https://kankerregister.org/sites/default/files/2026/2026_BE_CFS2024_APP_LUNG_0.pdf";
const APP_BREAST = "https://kankerregister.org/sites/default/files/2026/2026_BE_CFS2024_APP_BREAST_2.pdf";
const APP_PROSTATE = "https://kankerregister.org/sites/default/files/2026/2026_BE_CFS2024_APP_PROSTATE_2.pdf";
const APP_CRC = "https://kankerregister.org/sites/default/files/2026/2026_BE_CFS2024_APP_CRC_0_1.pdf";
const BCR_2024 = "https://kankerregister.org/en/news/belgian-cancer-registry-publishes-new-figures-more-78000-new-cancer-diagnoses-recorded-first";
const BCR_2035 = "https://kankerregister.org/en/news/44-more-cancer-diagnoses-daily-2035-compared-2023";
const BCR_20Y = "https://kankerregister.org/en/news/belgian-cancer-registry-bcr-publishes-new-figures-20-years-cancer-statistics-belgium-now";
const BCR_HISTORY = "https://kankerregister.org/en/history";
const BCR_MISSION = "https://kankerregister.org/en/mission";
const BCR_CONC = "https://kankerregister.org/en/news/concentration-care-bears-fruit-better-outcomes-after-pancreatic-and-oesophageal-surgery";
const IARC_FS = "https://gco.iarc.who.int/media/globocan/factsheets/populations/56-belgium-fact-sheet.pdf";
const INAMI = "https://www.inami.fgov.be/fr/themes/soins-de-sante-cout-et-remboursement";
const INAMI_SSI = "https://www.inami.fgov.be/fr/themes/soins-de-sante-cout-et-remboursement/les-prestations-de-sante-que-vous-rembourse-votre-mutualite";
const INAMI_PARTNERS = "https://www.inami.fgov.be/fr/l-inami/nos-partenaires";
const INAMI_MAF = "https://www.inami.fgov.be/fr/themes/soins-de-sante-cout-et-remboursement/facilites-financieres/types-de-maximum-a-facturer-maf";
const INAMI_REFORM = `${INAMI_SSI}/medicaments/reformer-les-procedures-de-remboursement-des-medicaments`;
const INAMI_EEFA = "https://www.inami.fgov.be/fr/actualites/un-acces-plus-rapide-aux-medicaments-innovants-grace-a-la-procedure-early-and-equitable-fast-access-eefa";
const INAMI_UMN = `${INAMI_SSI}/fonds-special-de-solidarite/intervention-dans-le-cadre-d-un-besoin-medical-non-rencontre-unmet-medical-need`;
const INAMI_BNLA = "https://www.inami.fgov.be/fr/l-inami/nos-collaborations-internationales/initiative-beneluxa";
const INAMI_COM = `${INAMI_SSI}/soins-palliatifs/consultation-oncologique-multidisciplinaire`;
const INAMI_HPV = `${INAMI_SSI}/notre-intervention-dans-le-cadre-de-la-detection-precoce-de-certaines-affections-malignes/depistage-primaire-du-cancer-du-col-de-l-uterus-par-test-hpv`;
const INAMI_SHORT = `${INAMI_SSI}/medicaments/intervention-dans-le-surcout-du-a-l-indisponibilite-de-medicaments-essentiels`;
const INAMI_KIDS = `${INAMI_SSI}/medicaments/remboursement-d-un-medicament/accessibilite-des-medicaments-pour-les-enfants-atteints-de-cancer`;
const INAMI_PANC = "https://www.riziv.fgov.be/nl/professionals/verzorgingsinstellingen-en-diensten/ziekenhuizen/verzorging-in-ziekenhuizen/pancreaschirurgie-terugbetaling-in-gespecialiseerde-centra";
const INAMI_OES = "https://www.riziv.fgov.be/nl/professionals/verzorgingsinstellingen-en-diensten/ziekenhuizen/verzorging-in-ziekenhuizen/slokdarmchirurgie-terugbetaling-in-een-gespecialiseerd-centrum";
const FAMHP_CUP = "https://www.famhp.be/en/human_use/medicines/medicines/research_development/compassionate_use_medical_need";
const FAMHP_CT = "https://www.famhp.be/en/human_use/medicines/medicines/research_development/clinical_trials";
const FAMHP_2025 = "https://www.famhp.be/en/news/ensuring_access_to_treatments_today_while_preparing_for_those_of_tomorrow";
const KCE_MISSION = "https://kce.fgov.be/en/about-us/what-is-kce/missions-and-values";
const KCE_WHY = "https://kce.fgov.be/en/about-us/what-is-kce/why-a-belgian-healthcare-knowledge-centre";
const CVKO_2023 = "https://dikkedarmkanker.bevolkingsonderzoek.be/sites/default/files/2024-12/CVK24-027%20Verkorte%20Jaarfiche_DDK-BK-BHK%282024%29-DEF%28Hires%29.pdf";
const MEMENTO_WAL = "https://kankerregister.org/sites/default/files/2026/Memento%20evaluation%20depistage%20cancer%20du%20sein%202021-2024%20Wallonie.pdf";
const MEMENTO_BXL = "https://kankerregister.org/sites/default/files/2026/Memento%20evaluation%20depistage%20cancer%20du%20sein%202021-2024_0.pdf";
const CCREF = "https://www.ccref.org/";
const DE_TROEYER = "https://doi.org/10.1016/j.canep.2022.102320";
const WHO_HPV = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'BEL'%20and%20startswith(ANTIGEN,'PRHPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=BE";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS?locations=BE";
const IRE = "https://www.ire.eu/en/";
const CTGOV_BE = "https://clinicaltrials.gov/search?cond=Cancer&country=Belgium";

export const BE_DIVE: CountryDive = {
  iso2: "BE",
  iso3: "BEL",
  name: "Belgium",
  flag: "🇧🇪",
  asOf: "2026-11-11",
  title: "Cancer in Belgium",
  description:
    "Cancer in Belgium from Belgian sources: the national registry's 78,697 new cancers in 2024 and its survival figures, compulsory health insurance with a yearly cap on what a household pays, how medicines are reimbursed and the early access route opened in January 2026, the regulator's compassionate use programmes, three regional screening systems with very different coverage, primary HPV screening since 2025, the concentration of complex cancer surgery in reference centres, and Belgium's place in European cancer trials.",
  lede:
    "Belgium registers every cancer in one national registry, which counted 78,697 new cancers in 2024, and it publishes five-year survival for the whole population: 70.6% across all cancers. Care is paid for by compulsory health insurance through the sickness funds, with a yearly cap on what a household pays, while screening is organised separately by Flanders, Wallonia and Brussels, with very different results.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Belgium is 80,019 new cancers and 28,692 deaths for 2024, labelled ICD-10 C00-97 and including 8,389 non-melanoma skin cancers, so 71,630 without them. The Belgian Cancer Registry's own count for 2024 is 78,697 invasive cancers, which excludes non-melanoma skin cancer and includes myelodysplastic syndromes and myeloproliferative neoplasms; on that basis the registry's observed count is about 10% higher than IARC's modelled estimate. The same direction holds by site: the registry counts 12,535 prostate cancers against GLOBOCAN's 10,436, 11,741 breast cancers in women against 10,928 in both sexes, 9,681 lung cancers against 8,859, and 7,839 colorectal cancers against 7,258. On deaths, the registry quotes 25,836 cancer deaths in 2023 (excluding myelodysplastic syndromes and myeloproliferative neoplasms), from mortality statistics collected by the three regions and merged by Statistics Belgium, against GLOBOCAN's 28,692 for 2024; neither source explains the gap, so it is stated here rather than explained. The registry standardises its rates to the 2013 European population and GLOBOCAN to the world population, so their rates are not comparable.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Belgium",
      aside: { label: "Belgian Cancer Registry: Cancer Fact Sheets 2024", url: CFS_LIST },
      cards: [
        {
          id: "shape",
          title: "78,697 cancers registered in 2024, and most of the rise is an older population",
          plain:
            "Belgium's national cancer registry recorded 78,697 new cancers in 2024, 1.4% more than in 2023, and 25,836 people died of cancer in 2023. Prostate cancer is the commonest cancer in men and breast cancer in women, and lung cancer is second in both. The registry expects about 93,330 diagnoses a year by 2035, mostly because the population is growing and ageing.",
          detail:
            "The registry's release of 23 July 2026 gives 78,697 diagnoses in 2024: 47,341 in Flanders, 25,661 in Wallonia and 5,695 in the Brussels-Capital Region, 54.3% in men and 45.7% in women. Its fact sheet gives a median age at diagnosis of 69 and a higher risk of a cancer diagnosis in Wallonia than in the other regions. The registry reports that the risk of a cancer diagnosis changes little in men (an average of minus 0.1% a year) but rises in women (plus 0.7% a year), while the risk of dying of cancer is falling in both (minus 2.2% a year in men, minus 1.0% in women). Lung cancer diagnoses keep falling in men and rising in women; pancreatic, liver and testicular cancer, non-melanoma skin cancer and tumours of the central nervous system are increasing. The projections published on 27 April 2026 forecast a rise from 77,344 diagnoses in 2023 to about 93,330 in 2035, 44 more a day, of which the registry attributes most to population growth and ageing, with the underlying risk rising by about 3%. It notes that the projected rise in lung cancer (plus 52%) and head and neck cancer (plus 33%) in women may partly reflect women having started smoking decades later than men.",
          links: [
            { label: "Belgian Cancer Registry: Cancer Fact Sheet 2024, all invasive tumours (PDF)", url: CFS_ALL },
            { label: "Belgian Cancer Registry: more than 78,000 new cancer diagnoses (23 July 2026)", url: BCR_2024 },
            { label: "Belgian Cancer Registry: 44 more cancer diagnoses daily in 2035 (27 April 2026)", url: BCR_2035 },
          ],
        },
        {
          id: "survival",
          title: "Survival is published for the whole country, and lung cancer survival is improving",
          plain:
            "Because cancer registration is compulsory and linked to vital status, the registry can publish survival for the whole population. Five-year net survival is 92% for breast cancer in women and 98% for prostate cancer, but only 25% for lung cancer in men and 34% in women, though lung cancer survival has risen by more than ten percentage points since the mid-2000s.",
          detail:
            "Net survival estimates the chance of surviving the cancer when other causes of death are excluded; the registry computes it from regional life tables of Statbel. In the 2024 fact sheet appendices, for patients followed from 2015 to 2024, five-year net survival is 92.0% for breast cancer in women, 97.9% for prostate cancer, 25.1% for lung cancer in men and 34.1% in women, and 69.9% for colorectal cancer in men and 71.4% in women; the all-cancer fact sheet gives 70.6%. The registry's release of 3 July 2025, comparing diagnoses from 2004 to 2008 with 2019 to 2023, reported lung cancer five-year net survival up by 15 percentage points in women, to 35%, and by 12 points in men, to 27%, and colorectal survival up from 63% to 70% over twenty years. Vital status for every registered patient comes from the Crossroads Bank for Social Security, which is what makes national survival possible.",
          links: [
            { label: "Belgian Cancer Registry: lung cancer fact sheet 2024 appendix, section 4 (PDF)", url: APP_LUNG },
            { label: "Belgian Cancer Registry: breast cancer fact sheet 2024 appendix, section 4 (PDF)", url: APP_BREAST },
            { label: "Belgian Cancer Registry: 20 years of cancer statistics (3 July 2025)", url: BCR_20Y },
          ],
        },
      ],
      tables: [
        {
          id: "bcr-2024",
          title: "Cancers registered in 2024, cancer deaths in 2023 and five-year survival, by site",
          caption: "Belgian residents. New diagnoses 2024; deaths 2023; five-year net survival for patients followed 2015 to 2024. Men and women summed where the registry reports them separately.",
          columns: [
            { key: "site", label: "Cancer (ICD-10)" },
            { key: "cases", label: "New diagnoses, 2024", numeric: true },
            { key: "deaths", label: "Deaths, 2023", numeric: true },
            { key: "survival", label: "Five-year net survival" },
          ],
          rows: [
            { site: "All invasive cancers except non-melanoma skin cancer, with MDS and MPN", cases: 78697, deaths: 25836, survival: "70.6%" },
            { site: "Prostate (C61)", cases: 12535, deaths: 1485, survival: "97.9%" },
            { site: "Breast, women (C50)", cases: 11741, deaths: 2109, survival: "92.0%" },
            { site: "Lung (C34)", cases: 9681, deaths: 5660, survival: "25.1% men, 34.1% women" },
            { site: "Colorectal", cases: 7839, deaths: 2430, survival: "69.9% men, 71.4% women" },
          ],
          note: "Diagnoses are the registry's count of Belgian residents. Deaths exclude myelodysplastic syndromes and myeloproliferative neoplasms and come from the regions' mortality statistics merged by Statistics Belgium; 2023 is the latest year the registry uses. Lung: 5,779 men and 3,902 women diagnosed, 3,519 and 2,141 deaths. Colorectal: 4,203 men and 3,636 women, 1,320 and 1,110 deaths. The all-cancer survival figure is the key fact of the all-cancer fact sheet, which does not restate its follow-up period.",
          sources: [
            { label: "Belgian Cancer Registry: Cancer Fact Sheet 2024, all invasive tumours (PDF)", url: CFS_ALL },
            { label: "Prostate appendix, tables 1.1.1, 4.1.1 and 6.1.1 (PDF)", url: APP_PROSTATE },
            { label: "Breast appendix, tables 1.1.1, 4.1.1 and 6.1.1 (PDF)", url: APP_BREAST },
            { label: "Lung appendix, tables 1.1.1, 4.1.1 and 6.1.1 (PDF)", url: APP_LUNG },
            { label: "Colorectal appendix, tables 1.1.1, 4.1.1 and 6.1.1 (PDF)", url: APP_CRC },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national registry that every hospital must report to",
      aside: { label: "Belgian Cancer Registry: history", url: BCR_HISTORY },
      cards: [
        {
          id: "bcr-card",
          title: "Reporting has been compulsory since 2003, tied to the funded cancer team meeting",
          plain:
            "The Belgian Cancer Registry is a public benefit foundation set up in 2005 by the federal and regional governments. Hospitals and pathology laboratories must report every cancer, and since 2003 that duty has been tied to the paid multidisciplinary meeting where a cancer team decides on treatment: the doctor who coordinates it must send a registration form.",
          detail:
            "The registry's history says cancer registration began in the 1950s as an initiative of health insurance funds, that a National Cancer Registry created in 1983 suffered significant under-reporting, and that Flanders funded a registration network from 1994. In 2003 the multidisciplinary oncology consultation and oncology care programmes were introduced nationally and participation in cancer registration was made mandatory, with a standard hospital form. The registry was established on 28 June 2005 and has data for Flanders since 1999 and for Belgium since 2004; its mission page gives article 39 of the act of 13 December 2006 as its legal basis. The national insurer's page on the consultation states that after it the coordinating doctor completes a form for the registry, that this registration is compulsory, and that it contributes greatly to the registry's quality and completeness. Pathology laboratories send their reports, which the registry uses to check the hospitals' data, and the Crossroads Bank for Social Security supplies vital status.",
          links: [
            { label: "Belgian Cancer Registry: history", url: BCR_HISTORY },
            { label: "Belgian Cancer Registry: mission", url: BCR_MISSION },
            { label: "RIZIV-INAMI: consultation oncologique multidisciplinaire (French)", url: INAMI_COM },
            { label: "Belgian Cancer Registry: Cancer Fact Sheet 2024, data flow (PDF)", url: CFS_ALL },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: compulsory insurance through the sickness funds, with a yearly cap",
      aside: { label: "RIZIV-INAMI: soins de santé, coût et remboursement (French)", url: INAMI },
      cards: [
        {
          id: "insurance",
          title: "Compulsory health insurance, run by a federal institute and paid through the sickness funds",
          plain:
            "Care in Belgium is paid back, in part or in full, by the sickness funds (mutualités) under rules set by the national insurer, RIZIV-INAMI. Patients often pay a personal share, but a household's yearly total is capped. Even so, the World Bank puts out-of-pocket spending at about a fifth of all health spending.",
          detail:
            "RIZIV-INAMI describes the compulsory health care and benefits insurance as run by negotiation: the sickness funds, care providers, employers and trade unions sit on its committees, and the insurance is 75% financed by social security contributions. The patient's share (ticket modérateur) is capped by the maximum billing scheme (maximum à facturer): once a household's shares for the year reach a ceiling that depends on its net taxable income, the sickness fund pays the rest. The ceiling is fixed at 450 euros (indexed) for households entitled to increased reimbursement, was lowered in 2022 to 250 euros for households whose net income in 2020 did not exceed 11,120 euros, is 650 euros (indexed) for each child under 19, and is lowered by 100 euros (indexed) when a household member has chronic illness status or has paid at least 450 euros in shares in each of the two previous years. The World Bank, from WHO's Global Health Expenditure Database, puts out-of-pocket spending at 21.5% of current health expenditure in 2023 and current health expenditure at 10.8% of GDP.",
          links: [
            { label: "RIZIV-INAMI: nos partenaires (French)", url: INAMI_PARTNERS },
            { label: "RIZIV-INAMI: types de maximum à facturer (French)", url: INAMI_MAF },
            { label: "World Bank: out-of-pocket expenditure, Belgium", url: WB_OOP },
            { label: "World Bank: current health expenditure, Belgium", url: WB_CHE },
          ],
        },
        {
          id: "shortages",
          title: "When an essential medicine is unavailable, the industry pays the extra cost",
          plain:
            "Since January 2025, if an essential reimbursed medicine is unavailable and a pharmacy or hospital has to import a replacement, the patient no longer pays the extra price. The pharmaceutical industry covers it, and the patient pays the same share as for the usual medicine.",
          detail:
            "The national insurer's page explains that until 31 December 2024 the patient bore the extra cost when a pharmacist or hospital imported an unavailable medicine from abroad: a higher purchase price, because the foreign product is not reimbursable in Belgium, and any shipping costs, which it says could rise so much that some patients could not continue treatment. Since 1 January 2025 those extra costs for an unavailable essential, reimbursable medicine are borne by the pharmaceutical industry, and the patient pays the same personal share at the pharmacy or hospital as for the usual medicine, if the replacement is on the list of reimbursable medicines. No national essential medicines list in the WHO sense was found on the insurer's pages; the reimbursement lists are what decide whether a cancer medicine is paid for.",
          links: [{ label: "RIZIV-INAMI: intervention dans le surcoût dû à l'indisponibilité de médicaments essentiels (French)", url: INAMI_SHORT }],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Assessment",
      title: "How Belgium decides which cancer medicines are paid for",
      aside: { label: "RIZIV-INAMI: réformer les procédures de remboursement (French)", url: INAMI_REFORM },
      cards: [
        {
          id: "reform",
          title: "A reimbursement commission, confidential agreements, and a reform under way",
          plain:
            "A medicine is reimbursed when it is on one of the national insurer's lists, after advice from its Commission for the Reimbursement of Medicines. For many new cancer medicines Belgium signs confidential agreements with the maker. A reform whose roadmap the government approved in 2024 added patient representatives to the commission in April 2025 and plans a classification of each medicine's added value from 2027.",
          detail:
            "The insurer's reimbursement page lists four conditions: a prescription, dispensing by a pharmacist, the medicine on a reimbursement list, and its conditions met; in some cases the patient pays nothing, otherwise a personal share. Its reform page explains that work began in 2022 with a stakeholder process supported by KU Leuven academics, that the government approved a roadmap in January 2024 and parliament the necessary legislation in May 2024, and that the government confirmed it in January 2025. Eight reforms were completed in 2024, including more transparency on contracts: the public parts of the agreements under articles 81 and 111 concluded for some innovative medicines are now published in a web application. Patient representatives joined the Commission for the Reimbursement of Medicines on 1 April 2025; eighteen further reforms around an added-value classification are being prepared in 2026, for launch on 1 January 2027. The independent Belgian Health Care Knowledge Centre (KCE), created in 2003, advises on health technology but states that it is strictly advisory and that decision-makers may not follow it.",
          links: [
            { label: "RIZIV-INAMI: réformer les procédures de remboursement des médicaments (French)", url: INAMI_REFORM },
            { label: "RIZIV-INAMI: le remboursement d'un médicament (French)", url: `${INAMI_SSI}/medicaments/remboursement-d-un-medicament` },
            { label: "KCE: missions and values", url: KCE_MISSION },
            { label: "KCE: why a Belgian Healthcare Knowledge Centre?", url: KCE_WHY },
          ],
        },
        {
          id: "eefa",
          title: "Early access: the insurer pays a flat amount while a new medicine is still being assessed",
          plain:
            "From 1 January 2026, under a procedure called Early and Equitable Fast Access, a company can give an innovative medicine free to patients while its reimbursement is decided, and the insurance pays the company a temporary flat amount per patient. Patients who start keep access even if the medicine is never reimbursed. A separate solidarity fund pays for some medicines in small groups of patients with unmet needs.",
          detail:
            "RIZIV-INAMI announced on 23 September 2025 that its insurance committee had approved the procedure, which merges the earlier early temporary reimbursement with new fast access routes. A medicine is eligible if its safety is confirmed by the European Medicines Agency or if it is already in a compassionate use or medical need programme at the FAMHP. The flat-rate payment lasts until the final reimbursement decision, which may be listing, a temporary contract or refusal; patients already treated keep access as long as needed on the same conditions. Separately, the Special Solidarity Fund, under the Royal Decree of 12 May 2014 and article 25quater/1 of the coordinated law of 14 July 1994, can pay for an innovative medicine in an unmet medical need cohort decided by the College of Medical Directors, with the payment made to the company so the patient pays nothing. The insurer's page lists one open cohort, for solid tumours with an NTRK gene fusion (decision no. 1056), and two closed ones, for FLT3-mutated acute myeloid leukaemia (no. 1053) and first-line HR-positive, HER2-negative advanced breast cancer with letrozole (no. 1054).",
          links: [
            { label: "RIZIV-INAMI: Early and Equitable Fast Access, 23 September 2025 (French)", url: INAMI_EEFA },
            { label: "RIZIV-INAMI: Fonds spécial de solidarité, Unmet Medical Need (French)", url: INAMI_UMN },
          ],
        },
        {
          id: "beneluxa",
          title: "Negotiating medicine prices with four other countries",
          plain:
            "Belgium works with the Netherlands, Luxembourg, Austria and Ireland in the BeNeLuxA initiative. The countries can write joint assessments of a new medicine, or reuse one another's, and in pilot projects they assess it together and sometimes negotiate jointly, while each keeps its own rules.",
          detail:
            "The national insurer's page says the BeNeLuxA countries work together in four areas: assessment of new therapies, where they may produce joint health technology assessment reports or one country may take over another's; horizon scanning, where BeNeLuxA launched the International Horizon Scanning Initiative, now joined by eight countries and running independently; knowledge sharing; and pricing, reimbursement and negotiation. Belgium, it explains, usually negotiates with the manufacturer for promising new medicines whose long-term effect is still uncertain and which are often very expensive. In joint pilot projects the countries consult closely on approach, added value and acceptable cost, and harmonise processes, but each follows its own regulation. The page does not list which cancer medicines have gone through a joint procedure, and none is named here.",
          links: [{ label: "RIZIV-INAMI: initiative BeNeLuxA (French)", url: INAMI_BNLA }],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the FAMHP, inside the European system",
      aside: { label: "FAMHP", url: "https://www.famhp.be/en" },
      cards: [
        {
          id: "famhp-card",
          title: "Cancer medicines are approved for the whole EU; Belgium runs trials and early access",
          plain:
            "New cancer medicines are authorised once for the whole European Union, so they are valid in Belgium without a separate national approval. The Belgian regulator, the FAMHP, authorises clinical trials in Belgium, approves programmes that give patients a medicine before it is marketed or reimbursed, and collects reports of side effects.",
          detail:
            "New active substances for cancer go through the EU centralised procedure, in which the European Commission grants an authorisation valid in every member state on the opinion of the European Medicines Agency. The FAMHP's compassionate use and medical need programmes follow the Royal Decree of 25 April 2014, in force from 1 July 2014, which sets how a company submits a programme, with templates for the protocol and the physician's declaration. Its list of authorised programmes, read on 11 November 2026, included trastuzumab deruxtecan for adults with unresectable or metastatic HER2-positive (IHC 3+) solid tumours after prior treatment with no satisfactory options, updated 9 November 2026, and niraparib with abiraterone acetate for metastatic hormone-sensitive prostate cancer with BRCA1/2 mutations. For trials, the agency points to the EU's CTIS database and trial map and publishes a quarterly dashboard of initial applications decided in Belgium under the EU clinical trials regulation. Its 2025 annual report announcement gives 654 staff and says 2025 was marked by the case of a sperm donor carrying a TP53 gene mutation, which affected many families.",
          links: [
            { label: "FAMHP: compassionate use and medical need programmes", url: FAMHP_CUP },
            { label: "FAMHP: clinical trials for human medicines", url: FAMHP_CT },
            { label: "FAMHP: 2025 annual report announcement (19 October 2026)", url: FAMHP_2025 },
            { label: "EMA: authorisation of medicines", url: "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines" },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening: three regions, three programmes, very different coverage",
      aside: { label: "CvKO: screening infosheet 2023 (PDF, Dutch)", url: CVKO_2023 },
      cards: [
        {
          id: "breast-screening",
          title: "Breast screening: two thirds covered in Flanders, under half in Wallonia and Brussels",
          plain:
            "All three regions invite women aged 50 to 69 for a mammogram every two years, but the results differ. In 2023 about two thirds of Flemish women in the age group were covered, against under half in Wallonia and Brussels, where most screened women had their mammogram outside the organised programme.",
          detail:
            "In Flanders the Centrum voor Kankeropsporing has run the programme since 15 June 2001, with an appointment proposed in the invitation and every mammogram read by two radiologists; in 2023 it sent 434,268 invitations and total coverage of the 896,559 women aged 50 to 69 was 65.6%. In Wallonia, where the CCRef runs the programme with the health agency AVIQ, the registry's memento gives 482,922 eligible women in 2023: 4% covered inside the programme, 44% by screening outside it and 52% not covered, a total of 48.4% (50.3% provisionally in 2024). In Brussels, run by Bruprev, 120,575 women were eligible: 9% covered inside the programme, 37% outside it and 54% not covered. Both mementos report recall rates above the European recommendations of under 7% at a first screen and under 5% after. A registry case-referent study found that women who took part in the Flemish programme had a 51% lower risk of dying of breast cancer than those who did not (adjusted odds ratio 0.49, 95% CI 0.44 to 0.55).",
          links: [
            { label: "CvKO, BCR and Departement Zorg: infosheet, screening year 2023 (PDF, Dutch)", url: CVKO_2023 },
            { label: "Belgian Cancer Registry: memento, breast screening in Wallonia 2021 to 2024 (PDF, French)", url: MEMENTO_WAL },
            { label: "Belgian Cancer Registry: memento, breast screening in Brussels 2021 to 2024 (PDF, French)", url: MEMENTO_BXL },
            { label: "De Troeyer et al., Cancer Epidemiology 2023", url: DE_TROEYER },
          ],
        },
        {
          id: "bowel-cervix",
          title: "A stool test by post for bowel cancer, and HPV testing for cervical cancer since 2025",
          plain:
            "In Flanders everyone aged 50 to 74 is sent a stool test kit every two years, and about two thirds of the age group were covered in 2023. Since January 2025 cervical screening across Belgium uses an HPV test every five years from age 30, with no charge for the test itself.",
          detail:
            "The Flemish bowel programme has run since October 2013 and since 2020 has sent everyone aged 50 to 74 a test kit by post every two years. In 2023, 51.9% of those invited took part (436,927 people), 6.2% had an abnormal test, total coverage was 64.0% of 2,148,358 people; the infosheet also says 72% of screen-detected cancers were found at stage 0 or I, a share its table gives only up to screening year 2020 (72.3%), and notes that fewer than 40% had a colonoscopy within the 30 days the European guideline sets, down from 48% the year before. For cervical screening, the national insurer states that from 1 January 2025 cytology was replaced by primary HPV screening: cytology every three years at 25 to 29, an HPV test every five years at 30 to 64 with cytology only if HPV is found, and one exit test after 64 if none was reimbursed in the previous ten years. Women are invited to have the smear taken by a GP or gynaecologist, except in Brussels, where no invitation is sent; the tests are free, but the usual personal share applies to the consultation. In Flanders, cervical coverage was 66.1% of 1,744,891 women in 2023.",
          links: [
            { label: "CvKO, BCR and Departement Zorg: infosheet, screening year 2023 (PDF, Dutch)", url: CVKO_2023 },
            { label: "RIZIV-INAMI: dépistage primaire du cancer du col de l'utérus par test HPV (French)", url: INAMI_HPV },
            { label: "CCRef: présentation (French)", url: CCREF },
          ],
        },
        {
          id: "hpv-vaccine",
          title: "HPV vaccination: about four in five girls and three in four boys get a first dose",
          plain:
            "Belgium vaccinates both girls and boys against HPV. WHO's figures for 2025 put first-dose coverage at 80% for girls and 73% for boys, and completed vaccination at 72% and 65%.",
          detail:
            "WHO's immunisation data, as reported for Belgium, give HPV vaccination programme coverage in 2025 of 80% for a first dose and 72% for the last dose in girls, and 73% and 65% in boys. The same values are reported for 2023 and 2024, and 77%, 69%, 71% and 63% for 2021 and 2022, so the series moves in steps rather than yearly; the regional vaccination programmes behind these figures were not read for this page, so the ages at which each region vaccinates are not stated here.",
          links: [{ label: "WHO immunisation data API: HPV programme coverage, Belgium", url: WHO_HPV }],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Belgium does",
      title: "What Belgium does that others do not",
      cards: [
        {
          id: "concentration",
          title: "Complex pancreatic and oesophageal surgery moved to reference centres, and deaths fell",
          plain:
            "After the registry showed that patients were more likely to die after complex pancreatic or oesophageal surgery in hospitals that did few operations, the national insurer limited these operations from 2019 to reference centres, fifteen for the pancreas and eight for the oesophagus when the registry reported in May 2025. Deaths within 90 days of surgery for these cancers fell.",
          detail:
            "The registry's release of 27 May 2025 reports that its research showed 90-day mortality falling as hospitals performed more of these operations, and that on that basis RIZIV-INAMI limited them in 2019, through an agreement with the reference centres that sets quality criteria, pays for the prior multidisciplinary discussion and makes registration with the registry mandatory. In five years 2,626 patients with pancreatic disease were discussed and 1,011 operated, 799 for a malignant tumour; for the oesophagus 1,012 were discussed and 401 operated, 371 for a malignant tumour. Comparing 2015 to 2018 with the first three and a half years after concentration, with adjustment for patient differences, 90-day mortality fell from 7.3% to 5.4% for pancreatic cancer and from 9.6% to 6.5% for oesophageal cancer. Open surgery fell from 67.6% to 51.6% for the pancreas and from 41.0% to 27.2% for the oesophagus. The registry says it hopes to extend the model to other cancers.",
          links: [
            { label: "Belgian Cancer Registry: concentration of care bears fruit (27 May 2025)", url: BCR_CONC },
            { label: "RIZIV: pancreaschirurgie in gespecialiseerde centra (Dutch)", url: INAMI_PANC },
            { label: "RIZIV: slokdarmchirurgie in een gespecialiseerd centrum (Dutch)", url: INAMI_OES },
          ],
        },
        {
          id: "children-medicines",
          title: "Medicines for children with cancer that were never licensed for them, paid for by agreement",
          plain:
            "Many cancer medicines used for children are not licensed or reimbursed for them. Since January 2024 a three-year agreement lets the seven Belgian hospitals with an approved specialised children's cancer programme that joined it bill about fifty such medicines directly to the insurance, so the roughly 100 families affected pay nothing.",
          detail:
            "The national insurer explains that ordinary rules reimburse cancer treatment, but about fifty medicines used for children with cancer were not reimbursed and could cost these families a great deal. From 1 January 2024 the hospital bills them directly to the insurance, with nothing paid by the patient or the sickness fund. Only centres meeting the approval standards of the Royal Decree of 2 April 2014 for the specialised paediatric haemato-oncology care programme could join, and seven hospitals did, for 2024 to 2026. Only medicines in international guidelines with certain scientific evidence are covered, and medicines previously refused by the reimbursement commission are not. Because many are used off-label, the prescribing doctor alone bears responsibility, the page notes, citing a 2015 KCE report on off-label use. The insurer's committee set an annual budget of 3.2 million euros and is collecting data to decide whether the medicines can move to normal reimbursement.",
          links: [{ label: "RIZIV-INAMI: accessibilité des médicaments pour les enfants atteints de cancer (French)", url: INAMI_KIDS }],
        },
        {
          id: "isotopes",
          title: "A national institute that supplies isotopes for nuclear medicine worldwide",
          plain:
            "Belgium's National Institute for Radioelements at Fleurus makes molybdenum-99, from which the technetium-99m used in nuclear medicine scans is produced, and IRE ELiT, the other entity in its group, makes gallium-68 generators used for PET scans. In 2026 it announced work on actinium-225 for newer radioactive cancer treatments.",
          detail:
            "IRE describes itself as one of the leaders in producing molybdenum-99 for technetium-99m generators, and says its subsidiary IRE ELiT is one of only two global suppliers of germanium-68/gallium-68 generators approved as a medicine in Europe and as an active ingredient in the United States. Its site gives a turnover of 118M in 2025, without stating the currency, and 300 employees. On 27 August 2026 IRE ELiT announced the first marketing authorisation for a gallium-68 generator in Switzerland, and on 27 May 2026 it announced that TerraPower Isotopes and PanTera, supported by IRE, were expanding collaboration on actinium-225 supply, with new facilities in Belgium. These are the institute's own statements and were not checked against an independent source.",
          links: [{ label: "IRE: home page, figures and news", url: IRE }],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      cards: [
        {
          id: "trials-in-belgium",
          title: "909 cancer trials in OnCo's records have a site in Belgium, and EORTC is based in Brussels",
          plain:
            "Of the cancer trials whose site countries OnCo holds, 909 list a site in Belgium, and 262 of them were recruiting when last read. Most are international company trials, but the European Organisation for Research and Treatment of Cancer (EORTC) is based in Brussels, and Belgian university hospitals lead trials of their own.",
          detail:
            "OnCo's trial records carry what ClinicalTrials.gov says about where each study runs. 909 of the 5,579 trials with site countries list Belgium: 262 recruiting, 370 active but not recruiting, 250 completed and 19 terminated, and 636 are phase 3. The commonest lead sponsors are AstraZeneca (79), Hoffmann-La Roche (54), Merck Sharp & Dohme (45), Janssen (42) and Bristol-Myers Squibb (42). Eleven are led by the EORTC, among them its prostate radiotherapy trials 22911, 22961 and 22991, the CATNON glioma trial, PEACE-3 in prostate cancer and STRASS in retroperitoneal sarcoma. Trials led from Belgian hospitals include Antwerp University Hospital's ASPIRIN trial in colon cancer and its FOLICOLOR liquid biopsy trial, UZ Leuven's trials of neoadjuvant dostarlimab in colon cancer and of a lifestyle intervention with neoadjuvant therapy in triple-negative breast cancer, a FAPI PET imaging trial from KU Leuven, Ghent's STOMP trial of metastasis-directed therapy in prostate cancer and a FLASH radiotherapy trial for skin cancer at the Institut Jules Bordet.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Belgium", url: CTGOV_BE },
            { label: "EORTC", url: "https://www.eortc.org" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "unread-figures",
      title: "Radiotherapy capacity, workforce and waiting times are not on this page",
      plain:
        "OnCo looked for official counts of radiotherapy machines, cancer specialists and waiting times for cancer treatment in Belgium and could not read them, so no figure is given. The IAEA's radiotherapy database loads its country data only in an interactive viewer that does not answer a script.",
      detail:
        "The IAEA's DIRAC database returned only its page shell and an interactive dashboard to a script, so the number of radiotherapy machines and centres in Belgium was not read. No official national count of oncologists or radiation oncologists was located in raw form, and no published waiting-time figure for cancer diagnosis or treatment was found on RIZIV-INAMI's pages. The FAMHP's quarterly dashboard of clinical trial applications decided in Belgium is interactive and was not read, so no national count of authorised trials is given; the trial count on this page is OnCo's own.",
      links: [
        { label: "IAEA DIRAC", url: "https://dirac.iaea.org/" },
        { label: "FAMHP: clinical trials for human medicines", url: FAMHP_CT },
      ],
    },
    {
      id: "refused",
      title: "Sources that refused a script or could not be read on 11 November 2026",
      plain:
        "The regulator's website began answering with a bot challenge partway through this research, so its full list of compassionate use programmes was not read, and the archived copy held the same challenge. Wallonia's and Brussels' bowel and cervical screening coverage, the community HPV vaccination programmes and any current national cancer plan were not read either.",
      detail:
        "The FAMHP's pages on compassionate use and on clinical trials were read once in raw form; a second request served a challenge asking for JavaScript and an image code, which OnCo does not bypass, and the Internet Archive's copy of the compassionate use page held the same challenge. Only the first programmes on its list are therefore named. When this page was checked against its sources the same day, every FAMHP page served the challenge, so the FAMHP figures here (the programmes, the staff count and the annual report) rest on that single reading and could not be read a second time. The registry publishes Walloon and Brussels indicator reports for bowel and cervical screening, but only the breast mementos were read. The breast coverage totals for Brussels appear in the memento only as a chart; the shares quoted are the chart's labels. The KCE's reports on cancer were not read individually, and no current Belgian national cancer plan was located. The registry's all-cancer fact sheet shows its incidence charts as images, so only its stated key facts are used.",
      links: [
        { label: "FAMHP: compassionate use and medical need programmes", url: FAMHP_CUP },
        { label: "Belgian Cancer Registry: publications", url: "https://kankerregister.org/en/publications" },
      ],
    },
  ],
  institutions: [
    "belgian-cancer-registry", "riziv-inami", "famhp", "kce-belgium", "centrum-voor-kankeropsporing", "ccref-wallonia",
    "uz-leuven", "institut-jules-bordet", "uz-gent", "uz-brussel-cancer-centre", "king-albert-ii-cancer-institute", "antwerp-university-hospital", "az-groeninge-kortrijk",
    "foundation-against-cancer-belgium", "kom-op-tegen-kanker", "ema",
  ],
  companies: ["curie-nki-eortc", "big", "ire", "iba", "pantera", "ucb", "argenx", "galapagos", "biocartis", "oncodna", "precirix", "trasis"],
  drugs: ["trastuzumab-deruxtecan", "niraparib", "abiraterone"],
  trials: [
    "eortc-22911", "eortc-22961", "eortc-22991", "eortc-22033", "eortc-22922", "eortc-62012", "eortc-40983", "catnon", "peace-3", "strass", "clocc",
    "nct03464305", "nct07558083", "nct06830239", "nct06831955", "nct06365788", "nct06782412", "stomp-oligorecurrence", "nct07455331", "nct04557059",
  ],
  papers: ["paper-de-troeyer-flemish-breast-screening-mortality-2023"],
  people: [
    "liesbet-van-eycken", "hugues-malonne", "denis-lacombe", "martine-piccart", "eric-van-cutsem", "ignace-vergote", "patrick-schoffski", "jean-pascal-machiels",
    "jan-vermorken", "karim-vermaelen", "evandro-de-azambuja", "paul-herijgers", "renaud-witmeur", "inge-buyse",
  ],
  how:
    "Every card was written from Belgian and international sources read raw: the Belgian Cancer Registry's Cancer Fact Sheets 2024 and their site appendices, read from the PDFs, and its news releases; RIZIV-INAMI's pages in French; the FAMHP's pages until its site served a bot challenge; the KCE's own pages; the Flemish screening centre's 2023 infosheet in Dutch and the registry's Walloon and Brussels breast screening mementos in French; IARC's GLOBOCAN 2024 fact sheet; WHO's immunisation data and the World Bank's expenditure data through their APIs. Each figure was checked against the raw text rather than a summary. Trial counts come from OnCo's own ClinicalTrials.gov records. The new records added for this page are the registry, the national insurer, the regulator, the knowledge centre, the Flemish and Walloon screening centres, the registry's breast screening study and two people.",
  verify:
    "Survival and incidence come from the registry, but deaths lag a year behind diagnoses. Reimbursement depends on the current lists and on confidential agreements, and the early access procedure only began in January 2026: before relying on whether a medicine is paid for, ask the treating hospital and the sickness fund. Screening is organised by region, so the programme, invitation and coverage depend on where you live.",
  verifyLinks: [
    { label: "Belgian Cancer Registry: Cancer Fact Sheets 2024", url: CFS_LIST },
    { label: "RIZIV-INAMI: soins de santé, coût et remboursement (French)", url: INAMI },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Belgium (PDF)", url: IARC_FS },
    { label: "CvKO: screening infosheet 2023 (PDF, Dutch)", url: CVKO_2023 },
  ],
};

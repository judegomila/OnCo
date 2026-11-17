import type { CountryDive } from "@/data/country-dive";

/**
 * French Polynesia deep dive: the hand-written cards for /countries/pf/ (wave 16). Every figure was read from the raw
 * text of its source on 16 November 2026, not from a summary of it, and French sources were read in French: IARC's
 * GLOBOCAN 2024 fact sheet for French Polynesia (PDF text); the Institut du cancer de Polynésie française's pages
 * (institute, registry, EVASAN, screening, HPV vaccination), its registry report "Epidémiologie des cancers en
 * Polynésie française, données 2019-2021" (PDF text, published February 2026) and its 2025 activity report (PDF
 * text); the Plan cancer pour la Polynésie française 2018-2022 and the 2018 Stratégie polynésienne de lutte contre le
 * cancer (PDF text); the CHPF's oncology and radiotherapy service sheet (PDF text, January 2019); CLEISS's page on the
 * Polynesian social security scheme (dated 2026); the April 2019 report of the IGAS, IGA and IGF inspectorates on the
 * territory's social protection and health system (PDF text); Délibération n° 80-107 of 29 August 1980 on the import
 * of medicines, in the consolidated version in force from 15 July 2024, from Lexpol (PDF text); the ARASS pages on
 * medicine imports and pharmacovigilance; IAEA's DIRAC equipment report (JSON, no row); WHO's immunisation data
 * service (JSON: 44 HPV rows for 2018 to 2025 under antigen names starting `HPV`, none with a coverage value, and no
 * rows under `PRHPV`) and its health expenditure data service (JSON, no rows); ClinicalTrials.gov's study API for
 * studies with a site in French Polynesia (JSON); and one paper's abstract through Europe PMC.
 *
 * Second accuracy pass, 16 November 2026: every claim re-read against its source. Corrected then: the statement that
 * WHO holds no immunisation rows (it holds HPV rows with empty coverage), the cancer plan's axes, the wording of the
 * long illness cover in a section title, GDP per person called income, and four sentences that said more than their
 * source; added the two studies ClinicalTrials.gov lists with a site at the hospital in Pirae.
 *
 * Not read: Délibération n° 88-153 AT of 20 October 1988 on pharmacy, which the 1980 text cites and which would say
 * how a medicine comes to be admitted to the market; most pages of the CPS site, which need a browser to render. The
 * registry report's page layout interleaves columns, so only sentences that read whole are used. Named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/258-french-polynesia-fact-sheet.pdf";
const ICPF = "https://www.icpf.pf/institut/";
const ICPF_REG = "https://www.icpf.pf/registre/";
const ICPF_REG_REPORT = "https://www.icpf.pf/wp-content/uploads/2026/07/Rapport-Registre-2019-2021.pdf";
const ICPF_ACTIVITY_2025 = "https://www.icpf.pf/wp-content/uploads/2026/10/Rapport-dactivite-2025-ICPF.pdf";
const ICPF_EVASAN = "https://www.icpf.pf/patient-evasan/";
const ICPF_SCREENING = "https://www.icpf.pf/depistage/";
const ICPF_HPV = "https://www.icpf.pf/vaccination-hpv/";
const STRATEGY_2018 = "https://www.icpf.pf/wp-content/uploads/2023/09/strategie-polynesienne-de-lutte-contre-le-cancer-2018.pdf";
const PLAN_2018 = "https://www.iccp-portal.org/sites/default/files/plans/Plan-cancer-polyn%C3%A9sien-2018_2022_21juin.pdf";
const CHPF_RT = "https://www.chpf.pf/wp-content/uploads/2019/01/pr%C3%A9sentation-g%C3%A9n%C3%A9rale-du-service-radioth%C3%A9rapie-oncologie.pdf";
const CLEISS = "https://www.cleiss.fr/docs/regimes/regime_pf_salaries.html";
const IGAS_2019 = "https://www.igas.gouv.fr/sites/igas/files/2024-05/Evaluation%20du%20syst%C3%A8me%20de%20protection%20sociale%20et%20de%20sant%C3%A9%20%E2%80%93%20Appui%20au%20gouvernement%20de%20la%20Polyn%C3%A9sie%20fran%C3%A7aise.pdf";
const LEXPOL_80_107 = "https://lexpol.cloud.pf/LexpolAfficheTexte.php?texte=260994";
const ARASS_IMPORT = "https://www.service-public.pf/arass/importation-des-medicaments/";
const ARASS_PV = "https://www.service-public.pf/arass/pharmacovigilance/";
const CPS = "https://www.cps.pf/";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'PYF'%20and%20startswith(ANTIGEN,'HPV')";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'PYF'";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/pyf-2020.pdf";
const CTGOV = "https://clinicaltrials.gov/search?country=French%20Polynesia&cond=cancer";
const CTGOV_PRISM = "https://clinicaltrials.gov/study/NCT05283044";
const CTGOV_KPAREAC = "https://clinicaltrials.gov/study/NCT07158879";

const VATHAIRE_2023 = { label: "de Vathaire et al., thyroid carcinomas in French Polynesia after atmospheric nuclear tests (JAMA Netw Open 2023)", url: "https://doi.org/10.1001/jamanetworkopen.2023.11908" };

export const PF_DIVE: CountryDive = {
  iso2: "PF",
  iso3: "PYF",
  name: "French Polynesia",
  flag: "🇵🇫",
  asOf: "2026-11-16",
  title: "Cancer in French Polynesia",
  description:
    "Cancer in French Polynesia from the territory's own sources: a cancer registry with a legal basis since 1985 that counted 2,889 cancers in 2019 to 2021, a cancer institute created in 2021, a social security fund that pays 95% to 100% of care for a recognised long illness and the full cost of medical evacuation, 348 evacuation files for cancer in 2025 to France and New Zealand, a radiotherapy service at the hospital in Pirae, breast screening reaching about 40% of women, free HPV vaccination since June 2024, and what is not established about how medicines are authorised.",
  lede:
    "French Polynesia is a French overseas collectivity of about 280,000 people, and health is its own responsibility, not the French state's. Its cancer registry counted an average of 963 new cancers a year in 2019 to 2021. Chemotherapy and radiotherapy are given at the public hospital in Pirae, on Tahiti; for treatment or tests not available there, the social security fund pays for evacuation to France or New Zealand.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for French Polynesia is 983 new cancers (560 in men, 423 in women) and 425 deaths, an age-standardised incidence of 235.8 per 100,000 (261.8 in men, 211.4 in women). For incidence IARC's fact sheet gives the data source as \"Registry (national)\" and the method as \"Trends in national rates projected to 2024\", and its total is close to the registry's own average of 963 cancers a year in 2019 to 2021. The deaths are a model: the fact sheet says \"Country-specific data source: No data\" and \"National incidence estimates applied to model-based M:I ratios (neighbouring country registry data)\". The registry's report says the most recent local mortality data are for 2019, from death certificates. IARC's figures by site also differ from the registry's: it projects 61 thyroid cancers for 2024, where the registry recorded 81 over the three years 2019 to 2021.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in French Polynesia",
      aside: { label: "Institut du cancer de Polynésie française: registry report, data 2019 to 2021 (PDF, in French)", url: ICPF_REG_REPORT },
      cards: [
        {
          id: "shape",
          title: "About 960 new cancers a year, split almost evenly between men and women",
          plain:
            "The cancer registry recorded 2,889 malignant tumours in 2019 to 2021: 1,447 in men and 1,442 in women, an average of 963 a year. Prostate cancer is the most common cancer in men, about 139 cases a year, and breast cancer in women, about 198 a year, which is 41% of all cancers in women. Women are diagnosed younger: the median age is 58, against 66 for men.",
          detail:
            "The registry's report gives a crude incidence of 345.5 per 100,000 inhabitants and says world-standardised rates are similar in the two sexes. Of the yearly average, 901 were solid tumours and 62 blood cancers; the most frequent blood cancers were myeloma and plasmacytoma, diffuse large B-cell lymphoma and acute myeloid leukaemia. Over the three years it counted 595 breast cancers, 418 prostate cancers (29.0% of cancers in men), 400 lung cancers (271 in men, 129 in women), 87 cancers of the lip, mouth and pharynx, 81 thyroid cancers (66 of them in women), 63 stomach cancers and 49 cervical cancers. Among people aged 18 to 49, three in four cancers were in women. Twenty-nine malignant tumours were recorded in people under 18. Only 9.9% of the population is 65 or older, against 21.3% in mainland France.",
          links: [
            { label: "ICPF: Epidémiologie des cancers en Polynésie française, données 2019-2021 (PDF, in French)", url: ICPF_REG_REPORT },
            { label: "IARC: GLOBOCAN 2024 fact sheet, French Polynesia (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
      tables: [
        {
          id: "pf-factsheet",
          title: "IARC's estimate for French Polynesia, 2024, by cancer",
          caption: "Estimated new cancers and deaths in 2024, both sexes, from IARC's GLOBOCAN 2024 fact sheet. Incidence is projected from the registry; deaths are modelled.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "All cancers", cases: 983, deaths: 425 },
            { site: "Prostate", cases: 204, deaths: 54 },
            { site: "Breast", cases: 164, deaths: 40 },
            { site: "Lung", cases: 156, deaths: 135 },
            { site: "Thyroid", cases: 61, deaths: 5 },
            { site: "Colorectum", cases: 56, deaths: 21 },
            { site: "Stomach", cases: 32, deaths: 21 },
            { site: "Non-Hodgkin lymphoma", cases: 27, deaths: 13 },
            { site: "Melanoma", cases: 24, deaths: 1 },
            { site: "Corpus uteri", cases: 23, deaths: 6 },
            { site: "Liver", cases: 22, deaths: 19 },
            { site: "Cervix uteri", cases: 19, deaths: 9 },
          ],
          note: "IARC gives 560 new cancers in men and 423 in women, and 263 and 162 deaths. The deaths are not counted in French Polynesia: IARC applies model-based ratios taken from neighbouring countries' registries to its incidence estimates.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, French Polynesia (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "pf-registry",
          title: "What the registry counted, 2019 to 2021",
          caption: "New malignant tumours recorded over three years by the Registre des cancers de Polynésie française, for the sites whose totals the report states in a sentence.",
          columns: [
            { key: "site", label: "Cancer site" },
            { key: "cases", label: "New cancers, 3 years", numeric: true },
          ],
          rows: [
            { site: "All malignant tumours", cases: 2889 },
            { site: "Breast", cases: 595 },
            { site: "Prostate", cases: 418 },
            { site: "Bronchus and lung", cases: 400 },
            { site: "Lip, mouth and pharynx", cases: 87 },
            { site: "Thyroid", cases: 81 },
            { site: "Stomach", cases: 63 },
            { site: "Cervix", cases: 49 },
            { site: "Oesophagus", cases: 35 },
          ],
          note: "Data consolidated to 1 March 2025 and published in February 2026. The report covers more sites than are listed here; its tables could not be read reliably from the PDF, so only totals stated in the text are shown. For deaths the report has figures for 2019 only, from death certificates, so no deaths are set beside these three-year counts.",
          sources: [{ label: "ICPF: Epidémiologie des cancers en Polynésie française, données 2019-2021 (PDF, in French)", url: ICPF_REG_REPORT }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a registry with a legal basis since 1985, run by the cancer institute",
      aside: { label: "Institut du cancer de Polynésie française: the registry (in French)", url: ICPF_REG },
      cards: [
        {
          id: "registry-icpf",
          title: "Cancer must be reported, and the registry draws on hospitals, laboratories and the social security fund",
          plain:
            "The Registre des cancers de Polynésie française was given a legal basis by a deliberation of 30 May 1985. Since 1 January 2022 it has been run by the Institut du cancer de Polynésie française, a public body created in July 2021. Cancer is a notifiable disease: the public hospital, private clinics, doctors and laboratories send a report for each diagnosis.",
          detail:
            "The legal texts are Délibération n° 85-1042 AT of 30 May 1985 for the registry and Arrêté n° 1291 CM of 13 July 2021 for the institute. The registry cross-checks reports from health establishments, laboratories and the Caisse de Prévoyance Sociale to identify the same cancer arriving from several sources, and says it works under authorisations from the French data protection authority and local rules. Its report notes that fewer cancers were registered between 2007 and 2015 and that this may reflect the registry's own difficulties, including failing computer equipment and a shortage of staff and money in 2011 and 2012, so trends across those years should be read with care. The previous report covered 2015 to 2019. IARC uses this registry as its source for French Polynesia.",
          links: [
            { label: "ICPF: the registry (in French)", url: ICPF_REG },
            { label: "ICPF: registry report, data 2019 to 2021, context and method (PDF, in French)", url: ICPF_REG_REPORT },
            { label: "ICPF: the institute (in French)", url: ICPF },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: one social security fund, with 95% to 100% cover for a recognised long illness",
      aside: { label: "CLEISS: the Polynesian social security scheme (in French)", url: CLEISS },
      cards: [
        {
          id: "cps",
          title: "The Caisse de Prévoyance Sociale covers nearly everyone, and long illness is paid at 95% to 100%",
          plain:
            "French Polynesia has its own social protection system, separate from France's. One fund, the Caisse de Prévoyance Sociale (CPS), runs three schemes: for employees, for the self-employed, and a solidarity scheme for people on low incomes. Ordinary care is reimbursed at 70%. For a recognised long illness, medicines, hospital stays and nursing are paid at 100% and doctor visits at 95%.",
          detail:
            "The three French inspectorates that reviewed the system in April 2019 wrote that it covered more than 98% of the population at the end of 2018 and was financed 70% by contributions. CLEISS, the French liaison centre for social security, says the long illness scheme applies to conditions on a list, and requires the treating doctor to send a care protocol to the CPS medical adviser, who decides; care unrelated to the long illness stays at 70%. Workers on long illness can receive daily allowances for up to three years. Anyone who has lived in the territory for more than six months and does not qualify otherwise is enrolled in the solidarity scheme, subject to an income test. OnCo did not read the list of long illnesses itself; the CPS can confirm whether a diagnosis is on it and what a protocol covers.",
          links: [
            { label: "CLEISS: Le régime polynésien de sécurité sociale (in French, dated 2026)", url: CLEISS },
            { label: "IGAS, IGA and IGF: evaluation of French Polynesia's social protection and health system (April 2019, PDF, in French)", url: IGAS_2019 },
            { label: "Caisse de Prévoyance Sociale", url: CPS },
          ],
        },
        {
          id: "spending",
          title: "Health spending per person was about a third lower than in mainland France in 2015",
          plain:
            "WHO publishes no health spending figures for French Polynesia. The French inspectorates' 2019 report gives the territory's own accounts for 2015: current health spending of 2,434 euros per person, against 3,900 in mainland France, yet 14.4% of the territory's economic output, against 12% in France. No out-of-pocket share is given.",
          detail:
            "The same table puts consumption of care and medical goods at 2,011 euros per person in French Polynesia, 2,977 in mainland France and 2,806 in New Caledonia. The report explains the high share of output by the gap in economic output (GDP) per person, about 15,700 euros against 31,200 in mainland France, and notes that prices are higher: a general practitioner visit cost 30.15 euros against 25. It also states that health and solidarity policy, its aims, tools and financing, have been the sole responsibility of the territory since the 1950s. These figures are for 2015, more than ten years ago. WHO's Global Health Expenditure Database returned no rows for French Polynesia, so the usual comparison of out-of-pocket spending cannot be made.",
          links: [
            { label: "IGAS, IGA and IGF: evaluation of French Polynesia's social protection and health system (April 2019, PDF, in French)", url: IGAS_2019 },
            { label: "WHO: out-of-pocket share query for French Polynesia (data API, no rows)", url: WHO_OOP_API },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Medicines: local rules, applied by the territory's health agency",
      aside: { label: "Lexpol: Délibération n° 80-107 of 29 August 1980 on the import of medicines (in French)", url: LEXPOL_80_107 },
      cards: [
        {
          id: "medicines-rules",
          title: "French Polynesia sets its own rules for importing medicines; how a medicine is authorised was not established",
          plain:
            "Health policy is French Polynesia's own responsibility, and its assembly has its own law on importing medicines. Only listed professionals, such as pharmacists, may import them. A medicine of foreign origin that is not on the territory's list of medicines admitted to the market, and has no equivalent in the French pharmacopoeia, needs an import authorisation, requested from the health agency ARASS and granted by the President of French Polynesia.",
          detail:
            "Délibération n° 80-107 of 29 August 1980, in the version in force from 15 July 2024, treats medicines of mainland French origin separately from medicines of foreign origin. For the latter, human medicines \"qui ne sont pas sur la liste des médicaments dont la mise sur le marché est admise en Polynésie française et qui n’ont pas d’équivalent dans la pharmacopée française\" require an authorisation, with the summary of product characteristics supplied in French. The Agence de régulation de l'action sanitaire et sociale (ARASS) also receives reports of suspected side effects and handles requests to import medicines prescribed abroad for personal use. The import law does not say how a medicine comes to be on that list. It cites Délibération n° 88-153 AT of 1988 on pharmacy, in its clause on veterinary medicines, for the standards for placing a medicine on the market; OnCo did not read that text, so this page does not say whether a French or European marketing authorisation is recognised automatically. The hospital pharmacy or ARASS's pharmacists can say whether a given cancer medicine is available.",
          links: [
            { label: "Lexpol: Délibération n° 80-107 of 29 August 1980, consolidated (in French)", url: LEXPOL_80_107 },
            { label: "ARASS: importing medicines for personal use (in French)", url: ARASS_IMPORT },
            { label: "ARASS: pharmacovigilance (in French)", url: ARASS_PV },
            { label: "IGAS, IGA and IGF: evaluation of French Polynesia's social protection and health system (April 2019, PDF, in French)", url: IGAS_2019 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening, HPV vaccination and the cancer plan",
      aside: { label: "Institut du cancer de Polynésie française: screening (in French)", url: ICPF_SCREENING },
      cards: [
        {
          id: "screening-rates",
          title: "About four in ten eligible women take part in breast screening",
          plain:
            "The cancer institute runs screening for breast and cervical cancer. Its 2025 activity report estimates breast screening participation at about 40% to 41%, up from 39.4% in 2023, with 7,643 mammograms done in 2025. Women are not sent an individual invitation by post, as they are in mainland France; they book the examination themselves. For cervical screening, 11,075 smears were done in 2025.",
          detail:
            "The report gives the 2025 participation figure as 40% in one place and 41% in another. Mammograms rose from 6,953 in 2024, and smears from 10,991. Under a scheme called Tarona Tere, run with town halls, the institute arranges group transport and pays in full for the mammogram; its screening page reports 122 women screened that way in 2023 on Tahiti, Moorea, Bora Bora, Raiatea and the Marquesas. The 2025 report also describes a new mammography machine at Atuona, quality control of mammography machines across the islands, and laboratory equipment for HPV testing as the first-line cervical test from age 30. For cervical screening its table gives a screening rate of 40% in 2023, 40% in 2024 and 39% in 2025, on 10,313, 10,991 and 11,075 smears; the report does not say how that rate is calculated.",
          links: [
            { label: "ICPF: activity report 2025 (PDF, in French)", url: ICPF_ACTIVITY_2025 },
            { label: "ICPF: screening and the Tarona Tere scheme (in French)", url: ICPF_SCREENING },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccination has been free for 11 to 14 year olds since June 2024",
          plain:
            "Since 1 June 2024 the cancer institute has paid in full for the two doses of HPV vaccine for girls and boys aged 11 to 14, funded by the territory's health prevention fund. The vaccine is given on prescription through pharmacies that have signed an agreement with the institute. Doses for teenagers aged 15 to 19, who need three, are not covered.",
          detail:
            "The institute's activity report counts 1,056 doses distributed in 2024, and in 2025 1,867 doses distributed to community pharmacies and 724 distributed and given in public health facilities, with 44 pharmacies taking part, nearly 92% of those in the territory. The report credits a larger part played by the Direction de la santé in 2025, including a session on 25 June 2025 that vaccinated more than 70 children in a day. The vaccine used is Gardasil 9. Neither the institute nor WHO publishes a coverage rate. The report counts doses, not the share of children vaccinated. WHO's immunisation data hold HPV rows for French Polynesia for each year from 2018 to 2025, but every coverage value in them is empty; the only numbers are final doses reported for 2022, 36 in girls and 15 in boys, with no target population.",
          links: [
            { label: "ICPF: HPV vaccination (in French)", url: ICPF_HPV },
            { label: "ICPF: activity report 2025 (PDF, in French)", url: ICPF_ACTIVITY_2025 },
            { label: "WHO: HPV vaccination coverage query for French Polynesia (data API, rows with no coverage value)", url: WHO_HPV_API },
          ],
        },
        {
          id: "plan",
          title: "A first cancer plan for 2018 to 2022, and a cancer institute since 2021",
          plain:
            "French Polynesia's health ministry published a cancer plan for 2018 to 2022, drawn from a wider strategy document that calls it the first Polynesian cancer plan. Its eight axes run from understanding the patient, observing cancer and prevention through screening, the patient's pathway, diagnosis and treatment, support and palliative care, to life after cancer. OnCo found no plan covering the years after 2022.",
          detail:
            "The plan describes itself as a framing document that sets priorities for five years. When it was written it counted more than 600 new cancers and about 300 cancer deaths a year, about a quarter of all deaths in the territory. The strategy document traces the growth of services: an oncology service in 2004, radiotherapy at the hospital in 2011, a mobile palliative care team in 2015. The Institut du cancer de Polynésie française was created by an order of 13 July 2021 and now carries the registry, screening, coordination of care and a research directorate; its board decides its strategy. Its yearly activity reports are the current account of what is being done.",
          links: [
            { label: "Plan cancer pour la Polynésie française 2018-2022 (PDF, in French)", url: PLAN_2018 },
            { label: "Stratégie polynésienne de lutte contre le cancer (2018, PDF, in French)", url: STRATEGY_2018 },
            { label: "ICPF: the institute (in French)", url: ICPF },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy in Pirae, and evacuation abroad",
      aside: { label: "Institut du cancer de Polynésie française: preparing a medical evacuation (in French)", url: ICPF_EVASAN },
      cards: [
        {
          id: "radiotherapy",
          title: "Two linear accelerators at the public hospital; IAEA's directory lists no centre",
          plain:
            "The IAEA's Directory of Radiotherapy Centres has no entry for French Polynesia. The territory's own documents describe a radiotherapy service at the Centre Hospitalier de la Polynésie française in Pirae since 2011, with two linear accelerators. One accelerator broke down in May 2023, which sent more patients abroad; the cancer institute reports the second accelerator back in service from August 2025.",
          detail:
            "The 2018 strategy document describes two radiotherapists, two accelerators and a positioning scanner, and says the service then met 98% of the territory's radiotherapy needs. The hospital's service sheet, dated January 2019, lists an oncology day hospital of 11 places and an 8-bed inpatient unit. The institute's 2025 report records the inauguration on 27 June 2025 of the first PET scanner in French Polynesia; until then patients needing a PET scan were evacuated, about 200 in 2016. In 2025, 43 evacuations were still for radiotherapy and 33 for brachytherapy. OnCo found no current public statement of how many machines are running or how long patients wait; the treating team at the hospital is the place to ask.",
          links: [
            { label: "ICPF: activity report 2025, CAP EVASAN (PDF, in French)", url: ICPF_ACTIVITY_2025 },
            { label: "Stratégie polynésienne de lutte contre le cancer (2018, PDF, in French)", url: STRATEGY_2018 },
            { label: "CHPF: oncology and radiotherapy service sheet (January 2019, PDF, in French)", url: CHPF_RT },
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
          ],
        },
        {
          id: "evasan",
          title: "EVASAN: 348 cancer evacuation files in 2025, to France and New Zealand",
          plain:
            "When a treatment or test is not available in the territory, the treating doctor prescribes a medical evacuation, known as EVASAN. For adults with cancer it goes to mainland France or New Zealand. The social security fund pays the medical costs, flights, local transport, lodging and meals, and under conditions an accompanying person. A nurse team at the cancer institute, CAP EVASAN, guides the patient from the decision to the return home.",
          detail:
            "The institute's 2025 report says CAP EVASAN handled 348 evacuation files and held 602 nurse interviews that year. New Zealand received 158 evacuations for PET scans, and France accounted for 49% of evacuations. After PET scans, the main reasons were radiotherapy (43), brachytherapy (33) and surgery (32), and the main conditions were lung, gynaecological, blood and digestive cancers. The report's count of cancelled files is larger than its total, so it is not repeated here. Europ Assistance organises tickets, visas and transfers, and associations for Polynesian patients work in Tahiti, France and New Zealand. CLEISS confirms that the fund pays all medical costs of an evacuation to France or New Zealand directly. The team plans to extend its support to children.",
          links: [
            { label: "ICPF: preparing a medical evacuation (in French)", url: ICPF_EVASAN },
            { label: "ICPF: activity report 2025, CAP EVASAN (PDF, in French)", url: ICPF_ACTIVITY_2025 },
            { label: "CLEISS: Le régime polynésien de sécurité sociale, évacuation sanitaire (in French)", url: CLEISS },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What French Polynesia does",
      title: "What French Polynesia does differently",
      cards: [
        {
          id: "remote-follow-up",
          title: "Following patients on cancer tablets at home across the archipelagos",
          plain:
            "Many patients in French Polynesia live on islands far from the hospital on Tahiti. The cancer institute runs ARATA'I Onco, a remote monitoring service for people taking cancer medicines by mouth at home. In 2025 it followed 50 patients, and nearly half of those still enrolled at the end of the year lived in remote archipelagos.",
          detail:
            "The institute's 2025 activity report says the service uses a digital monitoring platform and was developed with the support of the drug company AstraZeneca. It aims to improve adherence, detect side effects early and build patients' autonomy; six oral cancer treatments were included in 2025, notably for breast and digestive cancers, with about five new patients a month and more than 50 telephone calls a month, plus prescriptions sent remotely. Forty-eight patients remained in follow-up at the end of the year. The report counts 677 side effects recorded in 2025, mostly mild or moderate and none life-threatening, and says more than 65% were handled remotely. These are the service's own counts, with no comparison group: the report does not show whether side effects were caught earlier or evacuations avoided.",
          links: [
            { label: "ICPF: activity report 2025, ARATA'I Onco (PDF, in French)", url: ICPF_ACTIVITY_2025 },
            { label: "ICPF: the institute (in French)", url: ICPF },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with a site in French Polynesia (search)", url: CTGOV },
      cards: [
        {
          id: "nuclear-tests",
          title: "Thyroid cancer and the nuclear tests: a 2023 study estimates 29 cases attributable to fallout",
          plain:
            "France carried out 41 atmospheric nuclear tests in French Polynesia between 1966 and 1974. A case-control study published in 2023, using military reports declassified in 2013, estimated that the fallout accounts for about 29 thyroid cancers over the lifetime of the whole population, set against 1,524 sporadic cases in the same population (2.3%). The range around that estimate is wide: 8 to 97 cases.",
          detail:
            "De Vathaire and colleagues extended an earlier study to 395 people diagnosed with differentiated thyroid cancer from 1984 to 2016 at age 55 or younger and 555 controls. The declassified measurements roughly doubled the estimated average thyroid dose, from 2 to nearly 5 milligray. They found no significant association between dose received before age 15 and thyroid cancer overall; an association appeared when small non-invasive tumours were excluded, but the authors say inconsistencies with the earlier study reduce the credibility of that result. They conclude the number of cases linked to the tests was small. The study covers thyroid cancer only, and its dose estimates rest on reconstruction many years after the tests.",
          links: [VATHAIRE_2023, { label: "ICPF: registry report, data 2019 to 2021, thyroid cancer (PDF, in French)", url: ICPF_REG_REPORT }],
        },
        {
          id: "trials-research",
          title: "No trial in OnCo's records has a site in French Polynesia",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026, no cancer trial lists a site in French Polynesia. OnCo holds a selection of trials, not the whole registry: ClinicalTrials.gov itself, searched the same day for cancer studies with a site in French Polynesia, returned two, both at the hospital in Pirae and neither testing a medicine. The cancer institute lists setting up clinical trials among its aims and is a member of the French Unicancer network.",
          detail:
            "The institute's 2025 activity report describes a research and innovation directorate, membership of Unicancer's overseas coordinating group, which works on access to therapeutic innovation for patients in the French overseas territories, and a study, KPAREAC, that began at the hospital on 2 October 2025; the report says work is under way with the Direction de la santé to open it, in time, at the day hospital at Uturoa on Raiatea so that patients on that island can take part. That study, run for the Institut Curie, looks at skin reactions to the dressings of implanted chest ports, not at a medicine; OnCo found no drug trial open in the territory named in the report. ClinicalTrials.gov lists it as NCT07158879, an observational study with sites at the hospital in Pirae and at Uturoa, both shown as not yet recruiting when the entry was last updated in September 2025. The other study the registry returned is NCT05283044, PRISM-PORTAL, sponsored by Gustave Roussy: its registry entry calls it a biomarker study of whether liquid biopsy leads to better treatment for people with metastatic cancer cared for in community hospitals, and it lists the hospital in Pirae among 21 sites, shown as active and not recruiting. A patient who wants to know about trials should ask the treating oncologist, who can check French trial registers and whether taking part would mean treatment in France.",
          links: [
            { label: "ICPF: activity report 2025 (PDF, in French)", url: ICPF_ACTIVITY_2025 },
            { label: "ClinicalTrials.gov: cancer studies with a site in French Polynesia (search)", url: CTGOV },
            { label: "ClinicalTrials.gov: NCT07158879, KPAREAC, skin reactions to implanted chest port dressings", url: CTGOV_KPAREAC },
            { label: "ClinicalTrials.gov: NCT05283044, PRISM-PORTAL, liquid biopsy in community hospitals", url: CTGOV_PRISM },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "who-data",
      title: "WHO publishes no cancer profile, vaccination coverage or spending figures for French Polynesia",
      plain:
        "WHO's Cancer Country Profile 2020 does not exist for French Polynesia. WHO's immunisation database holds HPV rows for the territory but no coverage value in any of them, and its health expenditure database returns no rows. This page uses the territory's own figures: the cancer institute's dose counts for HPV vaccination and health accounts for 2015 quoted by French inspectorates. No out-of-pocket share is available.",
      detail:
        "The address where WHO publishes its 2020 cancer profiles answered 404 for French Polynesia on 16 November 2026. WHO's HPV coverage query returned 44 rows for the code PYF, for 2018 to 2025, every one with an empty coverage value; its vaccine introduction query and four Global Health Expenditure Database indicators each returned an empty list. The 2019 inspectorate report says the territory's health accounts were last produced in 2016, for 2010 to 2015, and that the territory depends on the Caisse de Prévoyance Sociale for health spending data; OnCo did not find or read a more recent edition.",
      links: [
        { label: "WHO: Cancer Country Profile 2020 address for French Polynesia (answers 404)", url: WHO_PROFILE },
        { label: "WHO: HPV vaccination coverage query for French Polynesia (data API, rows with no coverage value)", url: WHO_HPV_API },
        { label: "WHO: out-of-pocket share query for French Polynesia (data API, no rows)", url: WHO_OOP_API },
      ],
    },
    {
      id: "medicine-authorisation",
      title: "How a cancer medicine is authorised in French Polynesia is not established here",
      plain:
        "OnCo read the territory's law on importing medicines but not its law on pharmacy, which the import law cites, in its clause on veterinary medicines, for the standards for placing a medicine on the market. This page therefore does not say that approvals by the French or European medicines agencies apply automatically, and it shows no approvals count for the territory.",
      detail:
        "Délibération n° 80-107 refers to a list of medicines whose marketing is admitted in French Polynesia and cites Délibération n° 88-153 AT of 20 October 1988 on pharmacy; Lexpol, the territory's legal database, holds both, but OnCo read only the first. A cooperation agreement between French Polynesia and the French medicines agency was found mentioned in search results and not read. Whether a newly approved cancer medicine can be prescribed and reimbursed locally is a question for the hospital pharmacy, ARASS or the CPS.",
      links: [
        { label: "Lexpol: Délibération n° 80-107 of 29 August 1980, consolidated (in French)", url: LEXPOL_80_107 },
        { label: "ARASS: importing medicines for personal use (in French)", url: ARASS_IMPORT },
      ],
    },
    {
      id: "deaths-and-coverage",
      title: "No recent count of cancer deaths, and no HPV vaccination rate",
      plain:
        "The registry's latest report covers new cancers to 2021 and says the most recent death data are for 2019. OnCo found no published HPV vaccination coverage rate; the institute reports doses, and WHO's rows for the territory carry no coverage value. Its cervical screening rate, 39% in 2025, appears in a table with no stated method. IARC's death figure for 2024 is modelled from neighbouring countries.",
      detail:
        "Death certificates are analysed by the Bureau de veille sanitaire et de l'observation of ARASS, and the registry report uses them only for 2019. The registry report's detailed tables, by site, sex and stage, could not be read reliably from the PDF text because its columns interleave, so this page gives only totals stated in sentences. Most pages of the CPS site need a browser, and the list of long illnesses was not read. The institute's registry team can supply figures on request.",
      links: [
        { label: "ICPF: registry report, data 2019 to 2021 (PDF, in French)", url: ICPF_REG_REPORT },
        { label: "ICPF: the registry (in French)", url: ICPF_REG },
        { label: "ICPF: activity report 2025 (PDF, in French)", url: ICPF_ACTIVITY_2025 },
      ],
    },
  ],
  institutions: ["icpf-french-polynesia", "chpf-french-polynesia", "cps-french-polynesia", "arass-french-polynesia", "iarc", "iaea", "who"],
  companies: ["unicancer"],
  drugs: [],
  trials: [],
  papers: ["paper-de-vathaire-thyroid-nuclear-tests-french-polynesia-jama-netw-open-2023"],
  people: [],
  how:
    "Every card was written from French Polynesia's own sources and French official documents, read in French as raw text and not through a summary: the Institut du cancer de Polynésie française's pages, its registry report for 2019 to 2021 and its 2025 activity report; the 2018 to 2022 cancer plan and the strategy document behind it; the public hospital's radiotherapy service sheet; CLEISS's description of the social security scheme; the April 2019 report of three French inspectorates; the territory's deliberation on importing medicines, from its legal database Lexpol; ARASS's pages; IARC's GLOBOCAN fact sheet; IAEA's radiotherapy directory; and one paper's abstract. Trial counts are from OnCo's own copy of ClinicalTrials.gov participation data, and the two studies named on the page were read from ClinicalTrials.gov's own records.",
  verify:
    "The registry's figures run to 2021 and its death data to 2019; IARC's 2024 deaths are a model. Radiotherapy capacity changed in 2023 and again in 2025, so ask the hospital what is available now. What the CPS pays for depends on an agreed care protocol, and an evacuation needs its approval: confirm both with the CPS and the CAP EVASAN nurses before travelling.",
  verifyLinks: [
    { label: "Institut du cancer de Polynésie française", url: ICPF },
    { label: "ICPF: preparing a medical evacuation (in French)", url: ICPF_EVASAN },
    { label: "Caisse de Prévoyance Sociale", url: CPS },
    { label: "IARC: GLOBOCAN 2024 fact sheet, French Polynesia (PDF)", url: IARC_FACTSHEET },
  ],
};

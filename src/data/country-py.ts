import type { CountryDive } from "@/data/country-dive";

/**
 * Paraguay deep dive: the hand-written cards for /countries/py/ (wave 11). Spanish sources were read in Spanish, and
 * every figure was read from the raw text of its source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN
 * 2024 fact sheet for Paraguay (PDF text), Law 6266 of 2018 and Law 6788 of 2021 (full text on the Congress library
 * site), DINAVISA's 2025 annual report (PDF text), INCAN's guidelines page, PAHO's April 2026 release on the imPACT
 * Review and its 2021 report on the COVID-19 response in Paraguay (PDF text), WHO's HPV coverage rows and the Global
 * Health Expenditure Database rows from WHO's public data APIs, IAEA DIRAC's public equipment data, and the papers'
 * abstracts through Europe PMC. Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/600-paraguay-fact-sheet.pdf";
const LEY_6266 = "https://www.bacn.gov.py/leyes-paraguayas/8708/ley-n-6266-de-atenci-n-integral-a-las-personas-con-c-ncer";
const LEY_6788 = "https://www.bacn.gov.py/leyes-paraguayas/9645/ley-n-6788-establece-la-competencia-atribuciones-y-estructura-org-nica-de-la-direcci-n-nacional-de-vigilancia-sanitaria";
const DINAVISA_2025 = "https://dinavisa.gov.py/wp-content/uploads/2026/03/Memoria-2025.pdf";
const INCAN_GUIAS = "https://incan.mspbs.gov.py/guias/";
const PAHO_IMPACT = "https://www.paho.org/es/noticias/24-4-2026-paraguay-identifica-brechas-oportunidades-respuesta-al-cancer-con-mision-impact";
const PAHO_COVID = "https://paho.org/sites/default/files/2021-05/OPSPARCOVID-19210002-spa.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'PRY'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'PRY'";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const CTGOV = "https://clinicaltrials.gov/search?country=Paraguay&cond=cancer";

export const PY_DIVE: CountryDive = {
  iso2: "PY",
  iso3: "PRY",
  name: "Paraguay",
  flag: "🇵🇾",
  asOf: "2026-11-11",
  title: "Cancer in Paraguay",
  description:
    "Cancer in Paraguay from Paraguayan sources: IARC's estimate of 13,064 new cancers and 6,210 deaths in 2024, made without any Paraguayan incidence data, the 2018 cancer law that created a national register and a solidarity fund fed by tobacco and alcohol taxes, a public network covering about 70% of people, the DINAVISA regulator, 11 radiotherapy machines in six centres, and HPV vaccination that fell from about 80% to 42%.",
  lede:
    "Paraguay has no population-based cancer registry that IARC can use, so its national cancer incidence is a model built from death records: 13,064 new cancers and 6,210 deaths in 2024, with prostate, breast and cervical cancer the commonest. A 2018 law promised every person timely cancer care, a compulsory national register and a dedicated fund; OnCo found no published report of how far each has been carried out.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Paraguay is 13,064 new cancers and 6,210 deaths, an age-standardised incidence of 190.4 per 100,000 (215.6 in men, 178.5 in women) and mortality of 92.6. The fact sheet gives Paraguay's country-specific incidence data source as \"No data\": incidence is national mortality estimates applied to model-based mortality-to-incidence ratios from registry survival data elsewhere. Mortality comes from WHO's national mortality data, projected to 2024 from trends in national rates. So the incidence figure is only as good as Paraguay's death certificates, and a study of death certificates in rural Itapúa found the cause of death ill-defined on 19.6% of them. IARC counts 753 non-melanoma skin cancers among the 13,064 (12,311 excluding them).",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Paraguay",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Paraguay (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 13,000 new cancers a year, with prostate cancer the commonest",
          plain:
            "IARC estimates 13,064 new cancers in Paraguay in 2024, split almost evenly between men (6,549) and women (6,515), and 6,210 cancer deaths. Prostate cancer is the commonest cancer overall, breast cancer the commonest in women and cervical cancer the second. Lung cancer causes the most cancer deaths.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 2,103 prostate cancers (601 deaths), 1,877 breast cancers (631 deaths), 1,121 cervical cancers (593 deaths), 1,112 colorectal cancers (578 deaths) and 786 lung cancers (702 deaths). Prostate cancer is 32.1% of cancers in men and breast cancer 28.8% of cancers in women, with cervical cancer at 17.2%. By deaths the order is lung, breast, prostate, cervix and colorectum. The risk of developing a cancer before age 75 is 17.3% for men and 16.4% for women, and an estimated 32,342 people are living within five years of a diagnosis. These incidence figures are modelled from deaths, not counted; see the note under the table below.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Paraguay (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "no-registry",
          title: "No registry figures that IARC can use, though the law has required a national register since 2019",
          plain:
            "Paraguay has no cancer registry whose figures IARC uses. Law 6266 of 2018 created a national register of people with cancer, kept by the national cancer institute, and made every confirmed cancer diagnosis notifiable, but OnCo found no published figures from it.",
          detail:
            "Article 12 of Law 6266, published on 3 January 2019, creates the Registro Nacional de Personas con Cáncer under the Instituto Nacional del Cáncer (INCAN), makes every confirmed cancer diagnosis made in Paraguay compulsorily notifiable, and obliges every institution in the national health system to keep the register and report to it. IARC's 2024 fact sheet still lists no country-specific incidence source for Paraguay. The cancer registry was one of the areas the IAEA's imPACT reviewers examined in April 2026; their final report was still to be presented to the authorities when PAHO announced the mission. Until then, local evidence comes from death certificates and single studies, such as the analysis of 2003 to 2012 deaths in Itapúa, which found recorded cancer mortality in remote districts far below that in central ones and judged the true burden most likely underestimated.",
          links: [
            { label: "Law 6266 of 2018, article 12 (Congress library)", url: LEY_6266 },
            { label: "PAHO: imPACT mission to Paraguay (25 April 2026)", url: PAHO_IMPACT },
            { label: "Codas et al., cancer mortality in Itapúa 2003 to 2012 (Cancer Epidemiol 2016)", url: "https://doi.org/10.1016/j.canep.2015.11.005" },
          ],
        },
      ],
      tables: [
        {
          id: "py-top",
          title: "IARC's leading cancers for Paraguay, 2024",
          caption: "New cases and deaths in 2024, both sexes, from the GLOBOCAN 2024 fact sheet. Estimates, not registry counts.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Prostate", cases: 2103, deaths: 601 },
            { site: "Breast", cases: 1877, deaths: 631 },
            { site: "Cervix uteri", cases: 1121, deaths: 593 },
            { site: "Colorectum", cases: 1112, deaths: 578 },
            { site: "Lung", cases: 786, deaths: 702 },
            { site: "Thyroid", cases: 506, deaths: 40 },
            { site: "Stomach", cases: 408, deaths: 299 },
            { site: "All cancers", cases: 13064, deaths: 6210 },
          ],
          note: "IARC lists no Paraguayan incidence data: new cases are modelled from national mortality and mortality-to-incidence ratios, so this is the table a registry would replace. Deaths come from WHO's national mortality data, projected to 2024.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Paraguay (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "Law 6266 of 2018 (Congress library)", url: LEY_6266 },
      cards: [
        {
          id: "three-systems",
          title: "A public network, social security and private insurance",
          plain:
            "Most Paraguayans rely on the Ministry of Health's public hospitals. PAHO put coverage at about 70% of people through the Ministry's network, 22% through the social security institute (IPS) and 5% through private insurers. Out-of-pocket payment is 36% of what the country spends on health.",
          detail:
            "PAHO's 2021 report on its COVID-19 response in Paraguay gives the split: about 70% of the population covered by the network of the Ministry of Public Health and Social Welfare, 22% by the Instituto de Previsión Social, the social security institute, whose stated mission is to administer social insurance and guarantee economic and health benefits to its insured members, and 5% by private insurance companies. WHO's Global Health Expenditure Database puts out-of-pocket spending at 36.3% of current health expenditure in 2023 (38.9% in 2022, 35.9% in 2021). Law 6266 of 2018 states that people with cancer need special protection against excessive and catastrophic spending, and applies to every institution of the national health system: public, private, IPS and the National University's medical school.",
          links: [
            { label: "PAHO: response to COVID-19 in Paraguay (2021, PDF)", url: PAHO_COVID },
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Paraguay (API)", url: WHO_OOP_API },
            { label: "Instituto de Previsión Social: mission (portal)", url: "https://portal.ips.gov.py/sistemas/ipsportal/" },
            { label: "Law 6266 of 2018, articles 2 and 3 (Congress library)", url: LEY_6266 },
          ],
        },
        {
          id: "medicines-list",
          title: "A national list of cancer medicines that the state must provide",
          plain:
            "The 2018 cancer law requires the Ministry to keep a national list of anticancer and supportive medicines inside the essential medicines list, and guarantees timely access to diagnosis and treatment according to that list and national protocols. Medicines outside the list are not an obligation of the state.",
          detail:
            "Article 17 of Law 6266 tells the Ministry to set a Listado Nacional de Drogas Antineoplásicas, with supportive and palliative medicines, as part of the national essential medicines list, and to build diagnosis and treatment protocols naming the medicines for each regimen, both to be reviewed periodically on the advice of a national advisory commission for comprehensive cancer care. Article 18 says the state guarantees timely access to diagnosis and treatment in the national health system according to those standards, protocols and list, and that technologies and products not on the list or in the protocols are not compulsory for the state. INCAN publishes national guidelines for breast, cervical and colorectal cancer and paediatric leukaemia. OnCo did not find the current list itself; see the gaps.",
          links: [
            { label: "Law 6266 of 2018, articles 17 and 18 (Congress library)", url: LEY_6266 },
            { label: "INCAN: oncology guidelines, plans and resolutions", url: INCAN_GUIAS },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved",
      aside: { label: "Law 6788 of 2021 on DINAVISA (Congress library)", url: LEY_6788 },
      cards: [
        {
          id: "dinavisa",
          title: "DINAVISA, an autonomous regulator since 2021",
          plain:
            "Medicines in Paraguay are registered by DINAVISA, the National Directorate of Health Surveillance. A 2021 law made it an autonomous public body. It works with Brazil's and Argentina's regulators and aims to be recognised by PAHO as a regional reference authority, which it is not yet.",
          detail:
            "Law 6788, promulgated on 23 August 2021, sets out DINAVISA's autonomy, powers and structure: a public-law body with administrative autonomy and its own assets, relating to the executive through the Ministry of Public Health and Social Welfare, and responsible for regulating medicines and other health products. Its 2025 annual report lists accreditation by PAHO/WHO as a regional reference regulatory authority among its strategic objectives, describes strengthened cooperation with Brazil's ANVISA and an agreement with Argentina's ANMAT on food standards, refers to reliance strategies for regulatory decisions, and records a tool for setting retail prices of medicines. Its registration rules for new and renewed medicines are set by resolutions the report names. OnCo found no published time to register a cancer medicine.",
          links: [
            { label: "Law 6788 of 2021 (Congress library, full text)", url: LEY_6788 },
            { label: "DINAVISA: annual report 2025 (PDF)", url: DINAVISA_2025 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: HPV vaccination coverage rows for Paraguay (API)", url: WHO_HPV_API },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination coverage for girls fell from about 80% to 42%",
          plain:
            "WHO's figures for Paraguay begin in 2013 and show around 80% of girls receiving a first HPV dose in the programme's first years. Coverage fell during and after the pandemic, to 42% for girls in 2025. WHO's rows for boys begin in 2024, at 35% in 2024 and 2025.",
          detail:
            "WHO's immunisation coverage rows for Paraguay give first-dose HPV coverage for girls of 91% in 2013, the first year with data, 78 to 81% from 2014 to 2019, then 72% in 2020, 56% in 2021, 45% in 2022, 44% in 2023, 47% in 2024 and 42% in 2025. Coverage of the last dose in the schedule fell further, to 18% in 2022, before recovering to 47% in 2024 and 42% in 2025. Rows for boys start in 2024, at 35% for both first and last dose, and stay at 35% in 2025. A population-based study of 5,677 women aged 30 to 64 in the Central Department, screened with an HPV test and a Pap smear, found 13.8% carrying a high-risk HPV type.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Paraguay (public API)", url: WHO_HPV_API },
            { label: "Kasamatsu et al., high-risk HPV in Paraguay (PLoS One 2019)", url: "https://doi.org/10.1371/journal.pone.0218016" },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy and cancer centres",
      aside: { label: "IAEA DIRAC: radiotherapy equipment by centre", url: DIRAC },
      cards: [
        {
          id: "radiotherapy",
          title: "Eleven radiotherapy machines in six centres, three of them at the national cancer institute",
          plain:
            "IAEA's radiotherapy directory lists six centres in Paraguay with 11 megavoltage machines, all linear accelerators. Three are at the public national cancer institute, INCAN, in Capiatá; the other five centres are named clinics and institutes, most of them in Asunción.",
          detail:
            "IAEA DIRAC's public equipment data, read on 11 November 2026 with every Paraguayan entry updated in 2026, lists INCAN in Capiatá (3 linear accelerators, brachytherapy), Instituto Codas Thompson in Asunción (2, brachytherapy), Centro Oncológico La Costa REVITA in Asunción (2, brachytherapy), Radioterapia Concordia (2), Terapeutix in Asunción (1) and Itamax in Franco (1). DIRAC's figure for Paraguay's population is about 7.0 million, so this is roughly 1.6 machines per million people. At INCAN, volunteers from Health Volunteers Overseas reported that between 2012 and 2017 the wait to start radiotherapy for cervical cancer fell from 2 to 3 months to 4 to 6 weeks, with a move to 3D planning and chemoradiation with brachytherapy. The imPACT reviewers in April 2026 named radiotherapy among the critical gaps they set out to assess.",
          links: [
            { label: "IAEA DIRAC: radiotherapy equipment by centre (read 11 November 2026)", url: DIRAC },
            { label: "Jacobson et al., radiotherapy access at INCAN Paraguay (Gynecol Oncol Rep 2018)", url: "https://doi.org/10.1016/j.gore.2018.06.006" },
            { label: "PAHO: imPACT mission to Paraguay (25 April 2026)", url: PAHO_IMPACT },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What Paraguay does differently",
      cards: [
        {
          id: "earmarked-fund",
          title: "A cancer fund paid for by taxes on tobacco and alcohol",
          plain:
            "Paraguay's 2018 cancer law created a solidarity fund for cancer care and fed it partly from taxes on the products that cause cancer: a quarter of a tobacco tax and a quarter of the alcohol excise go to it. The law forbids using the money for anything else.",
          detail:
            "Article 23 of Law 6266 creates the Fondo Solidario para la Atención Integral de las Personas con Cáncer, made up of state budget allocations, 40% of a health allocation from the FONACIDE public investment fund, donations, 25% of the participation rate on the tobacco selective consumption tax and 25% of the selective consumption tax collected on alcoholic drinks. Article 24 has the Ministry administer it in a special account that cannot be used for other purposes, cut or capped, and article 25 lets the Ministry buy services from the private sector when the public sector cannot provide them. Separately, Ministry resolution 1127 of 2021, listed on INCAN's guidelines page, makes multidisciplinary tumour boards compulsory in every institution of the national health system that treats cancer. OnCo found no published figure for how much the fund has received or spent.",
          links: [
            { label: "Law 6266 of 2018, articles 23 to 25 (Congress library)", url: LEY_6266 },
            { label: "INCAN: resolution 1127 of 2021 on multidisciplinary committees", url: INCAN_GUIAS },
          ],
        },
        {
          id: "children",
          title: "A national network for children with cancer",
          plain:
            "Paraguay built its first children's cancer centre at the National University's medical school and a national referral network. Children with leukaemia treated after the network began had better survival and abandoned treatment less often than those treated before.",
          detail:
            "Samudio and colleagues describe building the paediatric cancer centre at the National University School of Medicine and the National Network for Pediatric Cancer, and report that children with acute lymphoblastic leukaemia treated from 2008 to 2012 had higher 3-year survival and lower treatment abandonment than those treated from 2000 to 2007, coinciding with the centre's greater capacity. The abstract gives no percentages. The imPACT reviewers in 2026 visited the Hospital General Pediátrico Niños de Acosta Ñu and the Hospital de Clínicas in San Lorenzo among other services.",
          links: [
            { label: "Samudio et al., building a national paediatric cancer centre and network in Paraguay (J Pediatr Hematol Oncol 2015)", url: "https://doi.org/10.1097/MPH.0000000000000338" },
            { label: "PAHO: imPACT mission to Paraguay (25 April 2026)", url: PAHO_IMPACT },
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
          id: "trials-and-papers",
          title: "No trial in OnCo's records has a site in Paraguay",
          plain:
            "None of the cancer trials in OnCo's ClinicalTrials.gov participation data lists Paraguay among its countries. OpenAlex counts 98 oncology papers with an author in Paraguay from 2021 to 2025.",
          detail:
            "OnCo's participation data covers the trials in its graph, not every trial registered, so a search of ClinicalTrials.gov itself may find studies with Paraguayan sites. OpenAlex, counting oncology papers by author country, finds 18 in 2021, 19 in 2022, 9 in 2023, 21 in 2024 and 31 in 2025, 98 in all, 76 of them open access. Recent Paraguayan work includes a patient navigation programme to shorten the time to treatment for advanced breast cancer, published in JCO Global Oncology in 2026, and population studies of HPV. Law 6266 gives research priority to the national advisory commission for cancer care, working with the national science council, CONACYT.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Paraguay", url: CTGOV },
            { label: "Gonzalez Donna et al., a navigation programme for advanced breast cancer in Paraguay (JCO Glob Oncol 2026)", url: "https://doi.org/10.1200/GO-25-00281" },
            { label: "Law 6266 of 2018, article 19 (Congress library)", url: LEY_6266 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "impact-report",
      title: "The imPACT Review's findings for Paraguay are not published",
      plain:
        "IAEA, PAHO and WHO reviewers assessed Paraguay's cancer services from 20 to 24 April 2026. PAHO's release says a final report would be presented to the national authorities; OnCo found no published report, so the reviewers' counts of staff, machines and services are not here.",
      detail:
        "PAHO's release names the areas reviewed (governance, cancer registration, imaging, nuclear medicine, pathology, clinical and surgical oncology, radiotherapy, paediatric oncology and radiation safety) and the critical gaps the mission set out to identify, in radiotherapy, cancer surgery, diagnosis and palliative care, and says a prioritised roadmap was drawn up. It gives no figures. Numbers of oncologists, pathologists and other cancer staff in Paraguay were not found in a primary source.",
      links: [{ label: "PAHO: imPACT mission to Paraguay (25 April 2026)", url: PAHO_IMPACT }],
    },
    {
      id: "register-and-fund",
      title: "No published figures from the national register or the cancer fund",
      plain:
        "The 2018 law created a compulsory national cancer register and a solidarity fund. OnCo found no published count of cases from the register, no report of the fund's income or spending, and no current national list of cancer medicines.",
      detail:
        "The Ministry of Health's site and INCAN's guidelines page, read on 11 November 2026, did not link a register report, a fund report or the Listado Nacional de Drogas Antineoplásicas required by article 17. Press reports about the register were not used, because they are not primary sources. The coverage split of 70%, 22% and 5% is PAHO's 2021 figure; a more recent official figure from the Ministry or IPS was not found. Survival after a cancer diagnosis in Paraguay was not found in a population-based source.",
      links: [
        { label: "Law 6266 of 2018 (Congress library)", url: LEY_6266 },
        { label: "INCAN: oncology guidelines, plans and resolutions", url: INCAN_GUIAS },
      ],
    },
    {
      id: "screening-programme",
      title: "Cervical and breast screening coverage was not found",
      plain:
        "Paraguay screens for cervical cancer, and researchers have studied HPV testing there, but OnCo found no official figure for how many women are screened for cervical or breast cancer, or whether HPV testing has replaced the Pap smear in the public programme.",
      detail:
        "The Ministry's national cancer control programme (PRONAC) coordinated the 2026 imPACT Review, but OnCo did not reach a programme page with screening coverage. The HPV prevalence figure on this page comes from one study in the Central Department; the 2022 national cervical cancer guideline approved by resolution SG 268 of 2022 is listed on INCAN's page and was not read here.",
      links: [{ label: "INCAN: oncology guidelines, plans and resolutions", url: INCAN_GUIAS }],
    },
  ],
  institutions: ["paraguay-ministry-of-health", "incan-paraguay", "ips-paraguay", "dinavisa-paraguay", "iaea", "who", "iarc"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-kasamatsu-hrhpv-paraguay-plosone-2019", "paper-codas-itapua-cancer-mortality-canep-2016",
    "paper-samudio-paediatric-cancer-network-paraguay-jpho-2015", "paper-jacobson-incan-paraguay-cervical-radiotherapy-gore-2018",
  ],
  people: [],
  how:
    "Every card was written from Paraguayan law and official sources and from international agencies, read in full rather than through a summary: Law 6266 of 2018 and Law 6788 of 2021 from the Congress library; DINAVISA's 2025 annual report; INCAN's guidelines page; PAHO's release on the April 2026 imPACT Review and its 2021 report on the COVID-19 response; WHO's HPV coverage and health expenditure rows from its public data APIs; IAEA DIRAC's public equipment data; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data, and research output from OpenAlex. The new records added for this page (the Ministry, INCAN, DINAVISA, IPS and four papers) carry their own sources.",
  verify:
    "National incidence figures for Paraguay are modelled from deaths, not counted. Which medicines the public system provides, which centre is giving radiotherapy and how long the wait is change faster than the law and the published reports; ask the treating hospital's oncology service, INCAN or IPS what applies to you.",
  verifyLinks: [
    { label: "Ministerio de Salud Pública y Bienestar Social", url: "https://www.mspbs.gov.py/" },
    { label: "Instituto Nacional del Cáncer: guidelines", url: INCAN_GUIAS },
    { label: "Instituto de Previsión Social", url: "https://www.ips.gov.py/" },
    { label: "DINAVISA", url: "https://dinavisa.gov.py/" },
  ],
};

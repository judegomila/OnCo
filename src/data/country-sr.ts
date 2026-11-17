import type { CountryDive } from "@/data/country-dive";

/**
 * Suriname deep dive: the hand-written cards for /countries/sr/ (wave 16). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Suriname (PDF text);
 * the Ministry of Health's National Cancer Control Plan Suriname 2019-2028 (PDF text, ICCP portal copy); WHO's Cancer
 * Country Profile 2020 and Cervical Cancer Country Profile 2021 for Suriname (PDF text); WHO's vaccine introduction,
 * HPV coverage and Global Health Expenditure Database rows from its public data APIs; IAEA DIRAC's public equipment
 * data; the Netherlands Enterprise Agency's page on export rules for Suriname (read in Dutch); CARPHA's Caribbean
 * Regulatory System pages; the State Health Insurance Fund's home page (read in Dutch); and five papers resolved
 * through Europe PMC, with the open full text of one read there. The Academic Hospital Paramaribo's website was being
 * rebuilt and carried no clinical information. Sources not found or not read are named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/740-suriname-fact-sheet.pdf";
const NCCP = "https://www.iccp-portal.org/system/files/plans/SUR_B5_s21_NCCP%20Suriname%202019-2028.pdf";
const WHO_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/sur-2020.pdf";
const WHO_CX_2021 = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-sur-2021-country-profile-en.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'SUR'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'SUR'";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'SUR'";
const WHO_GOV_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'SUR'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'SUR'";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const RVO = "https://www.rvo.nl/onderwerpen/landen-en-gebieden/suriname/exportregels";
const CRS_ABOUT = "https://carpha.org/What-We-Do/CRS/About-Us";
const CRS_FAQ = "https://carpha.org/What-We-Do/CRS/faq";
const SZF = "https://www.szf.sr/";
const AZP = "https://www.azp.sr/";
const GICR_HUB = "https://gicr.iarc.fr/hub/caribbean/";
const MANS_2003 = "https://doi.org/10.1177/030089160308900404";
const BISHESHAR_2025 = "https://doi.org/10.1200/go-25-00045";
const WIELZEN_2026 = "https://doi.org/10.1200/go-26-00274";
const STIJNBERG_2024 = "https://doi.org/10.26633/rpsp.2024.122";
const WOITTIEZ_2026 = "https://doi.org/10.7759/cureus.105234";
const CTGOV = "https://clinicaltrials.gov/search?country=Suriname&cond=cancer";

export const SR_DIVE: CountryDive = {
  iso2: "SR",
  iso3: "SUR",
  name: "Suriname",
  flag: "🇸🇷",
  asOf: "2026-11-16",
  title: "Cancer in Suriname",
  description:
    "Cancer in Suriname from its own and WHO sources: IARC's estimate of 1,223 new cancers and 638 deaths in 2024, modelled because there is no cancer registry, one pathology laboratory whose records stand in for one, a national cancer control plan for 2019 to 2028, compulsory basic health insurance since 2014, one radiotherapy centre in Paramaribo since 2012, referral to Colombia for what is not available, and HPV vaccination coverage of 21% in 2025.",
  lede:
    "Suriname has a ten-year cancer plan, compulsory basic health insurance and, since 2012, its own radiotherapy centre in Paramaribo, but no cancer registry. IARC models 1,223 new cancers and 638 deaths for 2024, with prostate, breast and colorectal cancer the commonest and lung cancer causing the most deaths. What is known from inside the country comes from the one pathology laboratory, at the Academic Hospital Paramaribo.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Suriname is 1,223 new cancers and 638 deaths, an age-standardised incidence of 166.7 per 100,000 (204.9 in men, 152.7 in women) and mortality of 86.4. The fact sheet gives the country-specific incidence data source as \"No data\" and the method as \"National mortality estimates applied to model-based M:I ratios (registry survival data)\": new cases are worked out from deaths. Mortality comes from WHO national data, with the method \"Trends in national rates projected to 2024\". The Ministry of Health's own plan makes the same point from the other side: the pathology department counted 133 histologically confirmed cancers per 100,000 people a year in 2013 and 2014, which the plan judges an undercount, because cancers that are never biopsied, lung cancer in particular, do not reach the laboratory.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Suriname",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Suriname (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 1,220 new cancers a year; prostate cancer the commonest, lung cancer the largest cause of death",
          plain:
            "IARC estimates 1,223 new cancers in Suriname in 2024, 629 in men and 594 in women, and 638 cancer deaths. Prostate cancer is the commonest, then breast and colorectal cancer. Lung cancer causes the most deaths, followed by prostate and colorectal cancer.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 256 prostate cancers (77 deaths), 160 breast cancers (55 deaths), 137 colorectal cancers (75 deaths), 108 lung cancers (101 deaths), 76 cervical cancers (45 deaths), 47 liver cancers (44 deaths) and 33 stomach cancers (25 deaths). In men the leading cancers are prostate (256, 40.7%), colorectum (73) and lung (70); in women, breast (160, 26.9%), cervix (76, 12.8%) and colorectum (64). The risk of developing cancer before age 75 is 14.8%, and of dying of it 8.6%. An estimated 2,729 people are living within five years of a diagnosis. The Ministry's plan calls cancer the second leading cause of death in Suriname.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Suriname (PDF)", url: IARC_FACTSHEET },
            { label: "Ministry of Health: National Cancer Control Plan Suriname 2019-2028, foreword (PDF)", url: NCCP },
          ],
        },
        {
          id: "no-registry",
          title: "No cancer registry: one pathology laboratory's records stand in for one",
          plain:
            "Suriname's cancer plan says the country has no national cancer registry. Figures from inside the country come from the pathology department of the Academic Hospital Paramaribo, the only pathology laboratory, which sees every cancer confirmed under the microscope and none that is not.",
          detail:
            "The plan reports an average of 133 histologically confirmed cancers per 100,000 people a year for 2013 and 2014, with breast (18% of cases), prostate (12%), colorectal (11%) and cervical cancer (10%) the commonest, and notes that a study of 1980 to 2000 had found 70 per 100,000. That study, of pathology records, gave 59 per 100,000 in men and 83 in women, with cervical cancer the leading site. The plan commits to building a national cancer registry linked to the Caribbean registry hub, within one to three years of 2019; OnCo found no announcement that one has started. WHO's two profiles disagree, the 2020 one recording \"registration activity\" and the 2021 cervical profile answering \"Yes\" to a population-based registry. Later studies still draw on the pathology database, such as 570 prostate cancers from 2018 to 2023.",
          links: [
            { label: "Ministry of Health: National Cancer Control Plan Suriname 2019-2028, situational analysis and goal 5 (PDF)", url: NCCP },
            { label: "Mans et al., cancer incidence in Suriname 1980 to 2000 (Tumori 2003)", url: MANS_2003 },
            { label: "Wielzen et al., prostate cancer presentation in Suriname (JCO Glob Oncol 2026)", url: WIELZEN_2026 },
            { label: "WHO: Cancer Country Profile 2020, Suriname (PDF)", url: WHO_2020 },
            { label: "IARC Global Initiative for Cancer Registry Development: Caribbean Hub", url: GICR_HUB },
          ],
        },
      ],
      tables: [
        {
          id: "sr-top",
          title: "IARC's leading cancers for Suriname, 2024",
          caption: "New cases and deaths in 2024, both sexes, from the GLOBOCAN 2024 fact sheet. Estimates, not registry counts.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Prostate", cases: 256, deaths: 77 },
            { site: "Breast", cases: 160, deaths: 55 },
            { site: "Colorectum", cases: 137, deaths: 75 },
            { site: "Lung", cases: 108, deaths: 101 },
            { site: "Cervix uteri", cases: 76, deaths: 45 },
            { site: "Liver", cases: 47, deaths: 44 },
            { site: "Corpus uteri", cases: 34, deaths: 7 },
            { site: "Stomach", cases: 33, deaths: 25 },
            { site: "All cancers", cases: 1223, deaths: 638 },
          ],
          note: "IARC lists no incidence data for Suriname: new cases are modelled from national mortality estimates and mortality-to-incidence ratios, so this is the table a registry would replace.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Suriname (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "sr-pathology",
          title: "Share of cancers confirmed by the pathology laboratory, 2013 to 2014",
          caption: "Percentage of histologically confirmed cancers at the Academic Hospital Paramaribo's pathology department, as given in the National Cancer Control Plan.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "share", label: "Share of confirmed cancers (%)", numeric: true },
          ],
          rows: [
            { site: "Breast", share: 18 },
            { site: "Prostate", share: 12 },
            { site: "Colorectal", share: 11 },
            { site: "Cervical", share: 10 },
          ],
          note: "Laboratory confirmations, not incidence: a cancer diagnosed without a biopsy is not counted. The plan gives lung cancer in men as 7.4 per 100,000 on this basis and treats that as an undercount.",
          sources: [{ label: "Ministry of Health: National Cancer Control Plan Suriname 2019-2028, cancer incidence (PDF)", url: NCCP }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "Ministry of Health: National Cancer Control Plan Suriname 2019-2028 (PDF)", url: NCCP },
      cards: [
        {
          id: "basic-insurance",
          title: "Compulsory basic health insurance since 2014, run by the State Health Insurance Fund",
          plain:
            "Since 2014 everyone in Suriname has been required by law to hold insurance for a basic package of health care. Children up to 16 and adults over 60 who are Surinamese nationals do not pay the premium. The State Health Insurance Fund, known as SZF, has run the scheme since 2016.",
          detail:
            "The cancer plan describes the National Basic Health Insurance Act of 2014: compulsory insurance, compulsory acceptance and an affordable premium for a uniform basic package, with government paying part or all of the premium for adults who cannot. Implementation began with a private insurer and passed to the State Health Insurance Fund (Staatsziekenfonds) in 2016. At the end of 2016 an estimated 78% of the population was insured, three quarters of them by the fund. The plan says cover varies by type of insurance, that no insurer paid for some biopsy procedures and that CT and MRI scans were paid for only once a year, which it says can leave cancer patients with high costs of their own. WHO puts out-of-pocket payment at 19.7% of health spending in 2023, with 62.0% from government, on spending of about US$297 a person.",
          links: [
            { label: "Ministry of Health: National Cancer Control Plan Suriname 2019-2028, health system (PDF)", url: NCCP },
            { label: "Staatsziekenfonds (State Health Insurance Fund)", url: SZF },
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Suriname (API)", url: WHO_OOP_API },
            { label: "WHO Global Health Expenditure Database: government share (API)", url: WHO_GOV_API },
            { label: "WHO Global Health Expenditure Database: health spending per person in US dollars (API)", url: WHO_CHE_API },
          ],
        },
        {
          id: "cancer-cover",
          title: "Radiotherapy paid for by the government in 2019; a yearly cap on cancer medicines under basic insurance",
          plain:
            "The 2019 cancer plan says radiotherapy is funded by the government alone, and that patients and insurers were not yet being charged anything for it. Cancer medicines on the national list are covered by basic insurance, but only up to 800 US dollars a year, a limit the plan says delays and interrupts chemotherapy.",
          detail:
            "The plan states that anticancer medicines are on the national medicines list (the Nationale Geneesmiddelen Klapper) and so are eligible for cover under the 2014 Act, up to a maximum of US$800 a year for people insured under it; that other insurers also set limits and often require approval before cancer medicines are prescribed; and that the list held about half of the anticancer medicines on WHO's 2019 model list, with no targeted therapies, because of cost. Screening is reimbursed by all insurers. These are the plan's statements from 2019. Whether the cap and the list have changed since is not something OnCo could confirm; the insurer and the treating hospital can say what applies now.",
          links: [
            { label: "Ministry of Health: National Cancer Control Plan Suriname 2019-2028, treatment (PDF)", url: NCCP },
            { label: "Staatsziekenfonds (State Health Insurance Fund)", url: SZF },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines reach patients",
      aside: { label: "Netherlands Enterprise Agency: export rules for Suriname (in Dutch)", url: RVO },
      cards: [
        {
          id: "medicines-rules",
          title: "Medicines are regulated by the Ministry of Health, with a national list that decides what can be imported",
          plain:
            "In Suriname the Ministry of Health and its Inspectorate set and enforce the rules on medicines. A medicine must be on the national medicines list to be imported, and a state company, known as BGVS, buys and distributes medicines for public health facilities. OnCo has not read the registration rules themselves.",
          detail:
            "The cancer plan describes the Ministry and the Inspectorate as responsible for standard-setting, inspection and monitoring, says the national list is drawn up by a Steering Committee of Essential Medicines appointed by the Ministry on the same principles as WHO's model list, and says the drug supply company is responsible for procurement, storage and distribution to public facilities, and puts the coverage of cancer drugs at around 80%. The Netherlands Enterprise Agency's guidance for exporters says the import, registration and pricing of medicines in Suriname are bound by rules, that an import licence is required, and that a product must be included in the Nationale Geneesmiddelenklapper kept by the Bedrijf Geneesmiddelen Voorziening Suriname, part of the Ministry. Neither source names the body that registers a medicine or the law it acts under.",
          links: [
            { label: "Ministry of Health: National Cancer Control Plan Suriname 2019-2028, health system and treatment (PDF)", url: NCCP },
            { label: "Netherlands Enterprise Agency: export rules for Suriname (in Dutch)", url: RVO },
          ],
        },
        {
          id: "crs",
          title: "Suriname grants its own marketing authorisations and can use a Caribbean review",
          plain:
            "The Caribbean Community's public health agency runs a shared review service for medicines, which recommends products that a trusted regulator elsewhere has already approved. Suriname is one of six countries the service lists as granting marketing authorisations of their own.",
          detail:
            "CARPHA's pages say health ministers agreed in 2016 to create the Caribbean Regulatory System within the Caribbean Public Health Agency, to support marketing authorisation and the monitoring of medicine safety, and its guidance for applicants says in one place that the aim is to turn its recommendation into a lawful national marketing authorisation within 60 calendar days and in another that the target is 120 calendar days. The guidance lists Belize, Guyana, Haiti, Jamaica, Suriname and Trinidad and Tobago as the countries that conduct marketing authorisation. The guidance is undated, and OnCo found no Surinamese source on how often the route is used.",
          links: [
            { label: "CARPHA: about the Caribbean Regulatory System", url: CRS_ABOUT },
            { label: "CARPHA: Caribbean Regulatory System, guidance and questions for applicants", url: CRS_FAQ },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: Cervical Cancer Country Profile 2021, Suriname (PDF)", url: WHO_CX_2021 },
      cards: [
        {
          id: "no-programme",
          title: "No national screening programme; cervical screening is offered by clinics and a foundation",
          plain:
            "Suriname has no national screening programme for any cancer. Cervical screening, by smear or by visual inspection, is offered by gynaecologists, the Medical Mission that serves the interior, and the Lobi Foundation. The cancer plan estimated that fewer than 20% of eligible women were screened.",
          detail:
            "The plan says a national cervical screening pilot using cytology ran for three years from 1998 and was not continued after low coverage, that a 2008 strategic plan was never carried out, and that a national screening and precancer treatment protocol was agreed in 2018. The Medical Mission trains staff to treat women in the interior at the same visit as an abnormal visual inspection. Mammography has been available since 2009 in public and private clinics. A 2024 study using the pathology laboratory's records says Suriname has no formal national screening programme, and WHO's 2021 profile estimated that 32% of women aged 30 to 49 had been screened in the previous five years. Among 195 women living with HIV seen at one clinic in 2023, 39.5% had been screened in the previous three years.",
          links: [
            { label: "Ministry of Health: National Cancer Control Plan Suriname 2019-2028, screening and early diagnosis (PDF)", url: NCCP },
            { label: "Stijnberg et al., HIV among cervical precancer and cancer diagnoses in Suriname (Rev Panam Salud Publica 2024)", url: STIJNBERG_2024 },
            { label: "WHO: Cervical Cancer Country Profile 2021, Suriname (PDF)", url: WHO_CX_2021 },
            { label: "Woittiez et al., cervical screening in women living with HIV in Suriname (Cureus 2026)", url: WOITTIEZ_2026 },
          ],
        },
        {
          id: "hpv-vaccine",
          title: "HPV vaccination since 2013, with coverage at 21% of girls in 2025",
          plain:
            "Suriname has vaccinated girls against HPV since 2013. WHO's figures show coverage of 68% in 2017 and 2018, a fall to 3% in 2021, and 21% in 2025. WHO's rows for boys begin in 2024, with 20% covered in 2025.",
          detail:
            "WHO's vaccine introduction rows record nationwide HPV vaccination from 2013. Its programme coverage rows give, for girls' first dose, 57% in 2014, 63% in 2015, 34% in 2016, 68% in 2017 and 2018, 47% in 2019, 16% in 2020, 3% in 2021, 8% in 2022, 13% in 2024 (713 of a target of 5,443) and 21% in 2025 (1,125 of 5,370); there is no row with a value for 2023. Rows for boys begin in 2024 at 13% and give 20% for 2025 (1,134 of 5,561). The cancer plan listed raising HPV vaccination coverage among its actions and said in 2019 that the programme had no monitoring system.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Suriname (API)", url: WHO_HPV_API },
            { label: "WHO: vaccine introduction rows for Suriname (API)", url: WHO_INTRO_API },
            { label: "Ministry of Health: National Cancer Control Plan Suriname 2019-2028, goal 1 (PDF)", url: NCCP },
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
          title: "One radiotherapy centre, at the Academic Hospital Paramaribo, with two linear accelerators",
          plain:
            "Radiotherapy has been given in Suriname since 2012, at the Radiotherapy Centre Suriname on the grounds of the Academic Hospital Paramaribo. IAEA's directory lists it as the country's one centre, with two linear accelerators and a brachytherapy unit. Surgery and chemotherapy are given at the four hospitals in the capital.",
          detail:
            "IAEA DIRAC's public equipment data, read on 16 November 2026, lists for the Radiotherapeutisch Centrum Suriname two linear accelerators, one high-dose-rate brachytherapy unit, one CT scanner and one treatment planning system, in an entry last updated in 2026, for a population of about 640,000. The 2019 plan counted two medical oncologists, two radiotherapy specialists, two gynaecological and three surgical oncology specialists, all in Paramaribo, no paediatric oncologist or haematologist, and one pathologist for the whole country, with pathology reports generally taking more than two to three weeks. A national multidisciplinary team has met weekly since 2012, and about 70% of new cancer patients were being referred to it. The hospital's website was being rebuilt when read and gave only contact details, so current staffing is not confirmed here.",
          links: [
            { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC },
            { label: "Ministry of Health: National Cancer Control Plan Suriname 2019-2028, capacity for cancer management (PDF)", url: NCCP },
            { label: "Academisch Ziekenhuis Paramaribo (site being rebuilt)", url: AZP },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in Suriname",
      cards: [
        {
          id: "abroad",
          title: "A state scheme sends patients to Colombia for what Suriname cannot provide",
          plain:
            "People who need a test or treatment that is not available in Suriname can be sent to Colombia under a government scheme, which pays for the treatment and the stay. The cancer plan says a medical committee decides each request, and that since radiotherapy opened in Paramaribo far fewer adults have been sent.",
          detail:
            "The plan names the scheme as ARMU-LOV (Afbouw Regeling Medische Uitzendingen, Lokale Opbouw Voorzieningen), dating from 2004, with strict selection: the main criteria are the expected outcome of treatment and an age limit of 70. Treatment and housing abroad are paid by the government, at US$12,500 to US$150,000 a patient; travel and daily expenses are the patient's own. Bone marrow transplantation is not available in Suriname and is not reimbursed. The main reasons for sending adults abroad had become radioactive iodine treatment and complicated cancer surgery. Children with cancer, especially acute leukaemia, were often sent to Colombia, as the country had no paediatric oncologist. Specialists complete part of their training in the Netherlands, and pathology material can be sent there for a second reading. This is the position in 2019.",
          links: [{ label: "Ministry of Health: National Cancer Control Plan Suriname 2019-2028, treatment (PDF)", url: NCCP }],
        },
        {
          id: "ethnic-patterns",
          title: "Cancer patterns that differ between Suriname's ethnic groups",
          plain:
            "Suriname's population includes Hindustani, Creole, Javanese and Maroon communities, and studies of the pathology laboratory's records find different cancers in each. Mouth cancer is most common among Hindustani patients, cancer of the nasopharynx among Maroon and Javanese patients, and cancer of the larynx among Creole patients.",
          detail:
            "A review of 364 head and neck cancers diagnosed from 2009 to 2021 found those patterns, a rise in incidence of 6.8% a year from 2012 to 2019 that the authors put down to better diagnosis and more specialists, and 73.0% of patients presenting at an advanced stage; 43 of 47 nasopharyngeal cancers tested were positive for Epstein-Barr virus. Among 570 prostate cancers from 2018 to 2023, 40.9% were high grade and the median PSA at diagnosis was 21.0 ng/mL; Javanese ethnicity was associated with high-grade disease compared with Creole ethnicity. The study of 1980 to 2000 found cancer overall two to six times more common in Creole than in Hindustani and Javanese people, with cervical cancer as frequent in Hindustani as in Creole women. The authors of the prostate study call their findings hypothesis generating.",
          links: [
            { label: "Bisheshar et al., head and neck cancer in Suriname 2009 to 2021 (JCO Glob Oncol 2025)", url: BISHESHAR_2025 },
            { label: "Wielzen et al., prostate cancer presentation in Suriname (JCO Glob Oncol 2026)", url: WIELZEN_2026 },
            { label: "Mans et al., cancer incidence in Suriname 1980 to 2000 (Tumori 2003)", url: MANS_2003 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with a site in Suriname", url: CTGOV },
      cards: [
        {
          id: "trials-and-papers",
          title: "No trial in OnCo's records has a site in Suriname",
          plain:
            "None of the cancer trials in OnCo's records lists Suriname among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search. Published research from Suriname rests largely on the national pathology database.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Suriname. A Europe PMC search for Suriname in the titles of cancer papers returned seven results; five were read in abstract for this page, on cancer incidence from 1980 to 2000, head and neck cancer, prostate cancer, HIV among women with cervical precancer or cancer, and cervical screening in women living with HIV. The 2024 study matched 2,901 cervical diagnoses from 2010 to 2020, 666 of them cancers, against the national HIV test database and found that 57.5% of the women had an HIV test on record.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Suriname", url: CTGOV },
            { label: "Stijnberg et al., HIV among cervical precancer and cancer diagnoses in Suriname (Rev Panam Salud Publica 2024)", url: STIJNBERG_2024 },
            { label: "Mans et al., cancer incidence in Suriname 1980 to 2000 (Tumori 2003)", url: MANS_2003 },
            { label: "Woittiez et al., cervical screening in women living with HIV in Suriname (Cureus 2026)", url: WOITTIEZ_2026 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-registry-and-progress",
      title: "No registry, no survival figures, and no published review of the plan's progress",
      plain:
        "Suriname's plan promised a national cancer registry, a screening programme and better access to medicines by 2028. OnCo found no report on how far any of these has got, and no survival figure for any cancer in Suriname.",
      detail:
        "The plan itself said in 2019 that there was no monitoring system for cancer and that the national multidisciplinary team's data were not part of one. WHO's 2020 profile recorded the plan as still under development in 2019. The ICCP portal holds the plan and a draft dated 2018 to 2028 prepared for the Ministry, but no progress report, and the Academic Hospital Paramaribo's website was being rebuilt on 16 November 2026. A future pass should look for a registry launch, for the Ministry of Health's annual reports in Dutch, and for the Radiotherapy Centre's own figures. Until then the Ministry of Health and the treating hospital are the places to ask.",
      links: [
        { label: "Ministry of Health: National Cancer Control Plan Suriname 2019-2028 (PDF)", url: NCCP },
        { label: "WHO: Cancer Country Profile 2020, Suriname (PDF)", url: WHO_2020 },
        { label: "Academisch Ziekenhuis Paramaribo (site being rebuilt)", url: AZP },
      ],
    },
    {
      id: "gap-regulator",
      title: "The law and the body that register medicines were not read",
      plain:
        "OnCo did not find or read the Surinamese law on registering medicines or a page from the body that does it, so it cannot say how a cancer medicine is approved, how long that takes, or which cancer medicines are on the current national list.",
      detail:
        "What is on this page about medicines comes from the 2019 cancer plan, a Dutch government guide for exporters and CARPHA's guidance. The national medicines list itself was not found online. The plan's figures, that the list held about half of WHO's anticancer medicines and no targeted therapy, date from 2019 and may have changed. A future pass should read the relevant decree and the Ministry's pharmaceutical inspectorate in Dutch. The treating hospital's pharmacy or the insurer can say whether a given medicine is available and covered.",
      links: [
        { label: "Netherlands Enterprise Agency: export rules for Suriname (in Dutch)", url: RVO },
        { label: "Ministry of Health: National Cancer Control Plan Suriname 2019-2028 (PDF)", url: NCCP },
      ],
    },
    {
      id: "gap-current-cover",
      title: "What insurance covers for cancer today is known here only from 2019",
      plain:
        "The yearly cap on cancer medicines, the free radiotherapy and the rules for treatment in Colombia are all taken from the 2019 plan. OnCo found no current benefits list from the State Health Insurance Fund that mentions cancer care.",
      detail:
        "The fund's home page describes its insurance products in general terms and was the only page of its site read. Suriname's economy and health budget have changed since 2019: WHO's figures show health spending per person at US$410 in 2020 and US$297 in 2023. Whether the selection criteria for treatment abroad, including the age limit of 70, still apply is not confirmed. Ask the fund, the Ministry of Health or the hospital's oncology team before relying on any of these figures.",
      links: [
        { label: "Staatsziekenfonds (State Health Insurance Fund)", url: SZF },
        { label: "WHO Global Health Expenditure Database: health spending per person in US dollars (API)", url: WHO_CHE_API },
      ],
    },
  ],
  institutions: ["azp-suriname", "moh-suriname", "szf-suriname", "iaea", "iarc", "who"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-mans-cancer-incidence-suriname-tumori-2003", "paper-bisheshar-head-neck-cancer-suriname-jcogo-2025", "paper-wielzen-prostate-cancer-suriname-jcogo-2026",
    "paper-stijnberg-hiv-cervical-suriname-rpsp-2024", "paper-woittiez-cervical-screening-hiv-suriname-cureus-2026",
  ],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, the Ministry of Health's National Cancer Control Plan 2019 to 2028, WHO's 2020 and 2021 country profiles and its immunisation and health expenditure data, IAEA DIRAC's public equipment data, a Dutch government guide to export rules, CARPHA's pages on the Caribbean Regulatory System, the State Health Insurance Fund's home page, and five papers resolved through Europe PMC.",
  verify:
    "National cancer figures for Suriname are modelled, not counted, and most of what is said here about services, insurance and referral abroad comes from a plan written in 2019. Ask the treating hospital, the State Health Insurance Fund or the Ministry of Health what applies to you now.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Suriname (PDF)", url: IARC_FACTSHEET },
    { label: "Ministry of Health: National Cancer Control Plan Suriname 2019-2028 (PDF)", url: NCCP },
    { label: "Staatsziekenfonds (State Health Insurance Fund)", url: SZF },
    { label: "IAEA DIRAC: radiotherapy equipment by centre", url: DIRAC },
  ],
};

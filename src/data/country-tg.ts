import type { CountryDive } from "@/data/country-dive";

/**
 * Togo deep dive: the hand-written cards for /countries/tg/ (wave 14). Every figure was read from the raw text of its
 * source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Togo, WHO's Cancer Country
 * Profile 2020 and cervical cancer profile 2021 (PDF text), the draft Plan cancer Togo 2022 to 2025 (October 2021, PDF
 * text from the ICCP portal), Decrees 2023-093 and 2023-097 on universal health insurance (Journal officiel, PDF text
 * from WHO's health legislation database), IAEA DIRAC's public equipment data, WHO's immunisation data API, the World
 * Bank's health expenditure series, the African Union's list of ratifications of the African Medicines Agency treaty,
 * WHO's August 2026 list of regulators at maturity level 3 and 4, ClinicalTrials.gov's API, and two papers resolved
 * through Europe PMC. The insurer's site (inam.tg) answered with a challenge page and no regulator's site was reached;
 * both are named under `gaps` rather than filled from memory.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/768-togo-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/tgo-2020.pdf";
const WHO_CERVICAL = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-tgo-2021-country-profile-en.pdf";
const PLAN = "https://www.iccp-portal.org/sites/default/files/plans/Plan%20Cancer%20Togo%202022-2025_31_10-2.pdf";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=Togo";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20%27TGO%27%20and%20contains%28ANTIGEN%2C%27HPV%27%29";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20%27TGO%27%20and%20contains%28ANTIGEN%2C%27HPV%27%29";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=TG";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=TG";
const WB_GOV = "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=TG";
const WB_EXT = "https://data.worldbank.org/indicator/SH.XPD.EHEX.CH.ZS?locations=TG";
const DECREE_BASKET = "https://extranet.who.int/cpcd/sites/default/files/public_file_repository/TGO_Togo_Decret-No-2023-093-PR-fixant-le-panier-de-soins-de-reference-de-lassurance-maladie-Universelle-pour-les-salaries-du-secteur-public-et-les-travailleurs-2023.pdf";
const DECREE_MANAGERS = "https://extranet.who.int/cpcd/sites/default/files/public_file_repository/TGO_Togo_Decret-No2023-097-PR-confiant-la-gestions-delAssurance-Maladie-Univeselle-a-linstitut-national-dassurance-maladie-et-a-la-caisse-Nationale-de-Securite-Sociale_2023.pdf";
const INAM = "https://www.inam.tg/";
const MOH = "https://sante-assurances.gouv.tg/";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const CICL_NEWS = "https://www.republicoftogo.com/toutes-les-rubriques/sante/le-togo-se-dote-d-un-centre-de-cancerologie";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const AFCRN_LIST = "https://afcrn.org/index.php/membership/membership-list";
const CTGOV = "https://clinicaltrials.gov/search?country=Togo&cond=cancer";
const GFAOP_REGISTRY = "https://clinicaltrials.gov/study/NCT03803735";
const DARRE_2017 = "https://doi.org/10.22034/apjcp.2017.18.12.3407";
const AMEGBOR_2011 = "https://doi.org/10.1155/2011/319872";
const ADANI_2026 = "https://doi.org/10.1186/s12904-026-01994-5";

export const TG_DIVE: CountryDive = {
  iso2: "TG",
  iso3: "TGO",
  name: "Togo",
  flag: "🇹🇬",
  asOf: "2026-11-16",
  title: "Cancer in Togo",
  description:
    "Cancer in Togo: a national cancer programme since 2009 and a draft cancer plan for 2022 to 2025, one radiotherapy centre in Lomé with one linear accelerator in IAEA's directory, HPV vaccination introduced in 2023 and reaching 87% of the target group of girls in 2025, universal health insurance managed by INAM and CNSS, whose reference basket for public employees and formal private-sector workers pays 80% of covered care, health spending of about USD 60 a person with 64% paid out of pocket, IARC's modelled estimate of 7,031 new cancers and 4,351 deaths in 2024, and no trial in OnCo's records with a site in Togo.",
  lede:
    "Togo has had a national cancer programme since 2009, an oncology unit at CHU Sylvanus Olympio in Lomé, one radiotherapy centre in IAEA's directory, inaugurated in November 2022, and, since 2023, HPV vaccination for girls. OnCo found no published results from a population cancer registry in Togo, and IARC's figures for the country are modelled from neighbouring countries' rates: they are estimates, not counts.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Togo is 7,031 new cancers and 4,351 deaths, an age-standardised incidence of 117.7 per 100,000 (102.4 in men, 134.2 in women) and an age-standardised mortality of 77.1. These are modelled figures, not counts. The fact sheet gives its incidence method as \"rates based on incidence estimates or registry data from neighbouring countries\", which is IARC's method 5, and its mortality method as national incidence estimates applied to model-based mortality-to-incidence ratios from registry survival data. Togo's draft cancer plan of October 2021 says a population registry had just been set up and had no data yet, and WHO's 2021 cervical cancer profile recorded no population-based registry.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer is estimated to look like in Togo",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Togo (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 7,000 new cancers a year by IARC's estimate, six in ten in women",
          plain:
            "IARC estimates 7,031 new cancers in Togo in 2024, 4,299 of them in women, and 4,351 cancer deaths. Breast cancer is estimated to be the commonest cancer and the commonest cause of cancer death, followed by cervical cancer. These are modelled figures, not counts.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,701 breast cancers (806 deaths), 746 cervical cancers (452 deaths), 548 prostate cancers (333 deaths), 499 liver cancers (450 deaths), 453 colorectal cancers (260 deaths) and 330 stomach cancers (265 deaths). Prostate cancer leads in men, with 548 of 2,732 cases, then liver cancer with 355. The risk of developing a cancer before age 75 is 12.3%, and an estimated 13,472 people are living within five years of a diagnosis. IARC built the incidence figures from neighbouring countries' rates, not from cases counted in Togo. WHO's 2020 profile estimated 445 cancers a year in children aged 0 to 14.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Togo (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, Togo (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "pathology-register",
          title: "What has been counted: the pathology laboratory in Lomé, about 210 to 217 cancers a year",
          plain:
            "The counts that exist come from the pathology laboratory of CHU Sylvanus Olympio in Lomé. Its register held 5,251 cancers from 1984 to 2008 and 1,738 from 2009 to 2016, with breast and cervical cancer leading in women and prostate cancer in men.",
          detail:
            "Amégbor and colleagues reviewed the laboratory's records for 1984 to 2008 and found 5,251 cancers, an average of 210 a year: in women breast cancer was 27.1% and cervical cancer 11.2%; in men prostate cancer was 12.9%. Darre and colleagues, describing it as Togo's only pathology laboratory, found 1,738 confirmed cancers from 2009 to 2016: in women breast cancer 21.2% and cervical cancer 16.3%; in men prostate cancer 18.5%, non-Hodgkin lymphoma 13.2% and stomach cancer 10.7%; in children Burkitt lymphoma 41.8%. The draft cancer plan of October 2021 notes that, with one public laboratory, many cases escape this register, and that blood cancers are diagnosed in haematology services and not recorded there. A laboratory register counts biopsies examined, not the cancers in a population, so no rate can be drawn from it.",
          links: [
            { label: "Amégbor et al., cancers in Togo 1984 to 2008 (J Cancer Epidemiol 2011)", url: AMEGBOR_2011 },
            { label: "Darre et al., cancers in Togo 2009 to 2016 (Asian Pac J Cancer Prev 2017)", url: DARRE_2017 },
            { label: "Plan cancer Togo 2022 to 2025, draft of October 2021 (PDF via ICCP)", url: PLAN },
          ],
        },
      ],
      tables: [
        {
          id: "tg-globocan-sites",
          title: "The five commonest cancers in Togo, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024, modelled from neighbouring countries' rates.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 1701, deaths: 806 },
            { site: "Cervix uteri", cases: 746, deaths: 452 },
            { site: "Prostate", cases: 548, deaths: 333 },
            { site: "Liver", cases: 499, deaths: 450 },
            { site: "Colorectum", cases: 453, deaths: 260 },
          ],
          note: "Estimates, not counts: IARC's stated method for Togo is rates from neighbouring countries. The all-cancers total is 7,031 new cases and 4,351 deaths.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Togo (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "The cancer registry",
      cards: [
        {
          id: "registry-status",
          title: "A registry begun at CHU Sylvanus Olympio in August 2017, with no published results found",
          plain:
            "Togo's draft cancer plan says work to set up a cancer registry began in August 2017 at CHU Sylvanus Olympio, and that its data were not yet available in October 2021. OnCo found no published results from it.",
          detail:
            "The plan describes \"an embryo of a cancer registry since August 2017 at CHU SO\", counts two registrars among the country's cancer workforce, and lists making the registry operational, with trained focal points in health facilities, among its activities. WHO's 2020 profile recorded the status of a population-based registry in 2019 as \"registration activity\" and death registration for 2007 to 2016 as \"no coverage\"; WHO's 2021 cervical cancer profile answered \"No\" to whether a population-based registry exists. The African Cancer Registry Network's membership list, read on 16 November 2026, has no registry in Togo. A reader who needs the registry's current state can ask the national cancer programme at the Ministry of Health.",
          links: [
            { label: "Plan cancer Togo 2022 to 2025, draft of October 2021 (PDF via ICCP)", url: PLAN },
            { label: "WHO: Cancer Country Profile 2020, Togo (PDF)", url: WHO_PROFILE },
            { label: "WHO: cervical cancer profile 2021, Togo (PDF)", url: WHO_CERVICAL },
            { label: "African Cancer Registry Network: membership list", url: AFCRN_LIST },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care",
      cards: [
        {
          id: "oop",
          title: "About USD 60 a person on health, nearly two thirds of it out of pocket",
          plain:
            "Togo spent about 60 US dollars a person on health in 2023, and households paid 64% of it out of their own pockets, according to WHO's health expenditure figures published by the World Bank.",
          detail:
            "The World Bank's series, from WHO's Global Health Expenditure Database, gives current health spending of USD 52.72 per person in 2021, 55.80 in 2022 and 59.61 in 2023, and out-of-pocket spending of 69.0%, 64.2% and 64.3% of current health spending in those years. Domestic government spending was 11.1% of current health spending in 2023 and external funding 20.0%, from the same World Bank series. The draft cancer plan of October 2021 lists no budget allocated to cancer, no subsidy for cancer medicines and low availability of those medicines among the weaknesses it sets out to correct, and costs its own activities at 4,597,956,095 without stating the currency on that line.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Togo", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Togo", url: WB_CHE },
            { label: "World Bank: domestic government health expenditure, % of current health expenditure, Togo", url: WB_GOV },
            { label: "World Bank: external health expenditure, % of current health expenditure, Togo", url: WB_EXT },
            { label: "Plan cancer Togo 2022 to 2025, draft of October 2021 (PDF via ICCP)", url: PLAN },
          ],
        },
        {
          id: "amu",
          title: "Universal health insurance: 80% of covered care paid for public and formal private-sector workers, care abroad excluded",
          plain:
            "Togo's universal health insurance (AMU) is run by two bodies: INAM for public servants, pensioners of the state and vulnerable households, and CNSS for private employees, the self-employed and informal and farm workers. For public employees and workers in the formal private sector, a 2023 decree has the insurer pay 80% of the reference price of covered care and medicines.",
          detail:
            "Law 2021-022 of 18 October 2021 instituted the scheme, and Decree 2023-097 of 11 October 2023 gave its management to the Institut National d'Assurance Maladie (INAM) and the Caisse Nationale de Sécurité Sociale (CNSS). Decree 2023-093 of 4 October 2023 sets the reference basket of care for public-sector employees and workers in the formal private sector: consultations, hospital stays, essential health products, medical and paramedical procedures, imaging, laboratory tests and maternity care, with the insured person paying 20% of the reference price and the insurer 80%. The decree leaves the baskets of other groups of workers to separate ministerial orders, which OnCo did not read. Its exclusions include care in facilities that have no agreement with the insurer unless the insurer authorises it beforehand, care abroad unless a decree provides otherwise, and procedures and products that are not on the reference lists. The detailed lists of covered procedures and medicines are in two annexes, which OnCo did not read, so it cannot say which cancer medicines, chemotherapy or radiotherapy are covered; INAM's site answered automated reading with a challenge page. Ask INAM or CNSS before treatment starts.",
          links: [
            { label: "Decree 2023-093/PR setting the reference basket of care of the AMU for public-sector employees and formal private-sector workers (Journal officiel, via WHO, PDF)", url: DECREE_BASKET },
            { label: "Decree 2023-097/PR giving management of the AMU to INAM and CNSS (Journal officiel, via WHO, PDF)", url: DECREE_MANAGERS },
            { label: "Institut National d'Assurance Maladie (INAM)", url: INAM },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator",
      cards: [
        {
          id: "regulator-gap",
          title: "OnCo has not yet read Togo's medicines regulator",
          plain:
            "OnCo did not reach a site or a legal text of Togo's medicines regulator, so it states nothing about how cancer medicines are approved or how trials are authorised. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include Togo.",
          detail:
            "This card stands for a source not yet read, not a description of the regulator. What the sources read do say: Decree 2023-093 has \"the body in charge of medicines regulation\" set the reference prices of medicines covered by health insurance, and the draft cancer plan speaks of asking the directorate of pharmacies to make generic cancer medicines available. The African Union's list dated 19 September 2023 shows that Togo signed the treaty establishing the African Medicines Agency on 20 September 2021 and records no ratification. The address dpml.tg returned a \"page not found\" message on 16 November 2026, and the NIH's ClinRegs site has no profile for Togo. A future pass should read the pharmacy law and the directorate's own texts in French; until then, the Ministry of Health is where to ask.",
          links: [
            { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML3 },
            { label: "African Union: signatures and ratifications of the African Medicines Agency treaty (19 September 2023, PDF)", url: AMA },
            { label: "Decree 2023-093/PR setting the reference basket of care of the AMU (Journal officiel, via WHO, PDF)", url: DECREE_BASKET },
            { label: "Ministère de la Santé, Togo", url: MOH },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: cervical cancer profile 2021, Togo (PDF)", url: WHO_CERVICAL },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination since 2023, reaching 87% of the target group of girls in 2025",
          plain:
            "WHO's immunisation database records the HPV vaccine as introduced nationwide in Togo in 2023. In 2025 the programme gave a first dose to 105,261 girls, 87% of its target group, up from 36% in 2024.",
          detail:
            "The rows for Togo, read on 16 November 2026, give programme coverage with a first dose among girls of 45% in 2023 (304,458 doses for a target of 679,293, which suggests several age groups were vaccinated at once), 36% in 2024 (42,724 doses) and 87% in 2025 (105,261 doses for a target of 121,366). These are the rows the database labels HPV estimates. The administrative rows reported by the country differ: 55.72% in 2023 (62,284 doses for a target of 111,787), 36.81% in 2024 and 88.65% in 2025. WHO's separate estimate of girls who had received a first dose by age 15 was 43% in both 2024 and 2025. The introduction table shows no HPV vaccine from 2010 to 2022 and nationwide introduction from 2023. The draft cancer plan of October 2021, written before introduction, records a feasibility study and planned advocacy to scale up vaccination of girls aged 9 to 10.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Togo (immunisation data API)", url: WHO_HPV_API },
            { label: "WHO: HPV vaccine introduction rows for Togo (immunisation data API)", url: WHO_HPV_INTRO },
            { label: "Plan cancer Togo 2022 to 2025, draft of October 2021 (PDF via ICCP)", url: PLAN },
          ],
        },
        {
          id: "screening-2021",
          title: "No national cervical or breast screening programme on WHO's record; about one woman in ten screened",
          plain:
            "WHO's 2021 profile recorded no national cervical screening programme in Togo, and estimated that 10% of women aged 30 to 49 had been screened in the previous five years. Its 2020 profile recorded no breast screening programme.",
          detail:
            "The 2021 cervical cancer profile gives, for 2019, 13% of women aged 30 to 49 ever screened and 10% screened in the last five years; it records guidelines to strengthen early detection of first symptoms in primary care and a defined referral system as present, and national guidelines on managing cervical cancer as absent. The 2020 profile records, for 2019, no cervical screening programme, no breast screening programme and no cancer management guidelines. The draft cancer plan of October 2021 lists the absence of an early detection programme as a weakness and plans combined breast and cervical screening campaigns, prostate campaigns for men and hepatitis B, C and D testing; OnCo found no report of what was carried out. The plan mentions a separate national cervical cancer plan for 2017 to 2022, which OnCo did not find.",
          links: [
            { label: "WHO: cervical cancer profile 2021, Togo (PDF)", url: WHO_CERVICAL },
            { label: "WHO: Cancer Country Profile 2020, Togo (PDF)", url: WHO_PROFILE },
            { label: "Plan cancer Togo 2022 to 2025, draft of October 2021 (PDF via ICCP)", url: PLAN },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in Togo",
      cards: [
        {
          id: "plan",
          title: "A cancer programme since 2009 and a plan for 2022 to 2025 that OnCo found in draft",
          plain:
            "Togo created a national cancer programme by ministerial order in 2009. The cancer plan for 2022 to 2025 that the ICCP portal holds is marked as a draft of October 2021; OnCo did not find an adopted version.",
          detail:
            "The draft records a 2015 decree creating a national cancer institute, an IAEA imPACT review in September 2017 that made 53 recommendations, more than half of them said to be implemented, and a five-year plan for children's cancer drawn up in 2019. Its own assessment lists a pathology laboratory, a medical oncology unit and a paediatric oncology unit as strengths, and as weaknesses no radiotherapy in the public sector, no nuclear medicine, no standard protocols for diagnosis and treatment, and care that is out of reach by distance and cost. Among its activities are making the cancer institute operational with radiotherapy and nuclear medicine, and a pathology service at the university hospital in Kara. The ICCP portal's search for Togo on 16 November 2026 also returned an earlier draft plan for 2016 to 2020. WHO's 2020 profile recorded a national cancer plan as operational in 2019.",
          links: [
            { label: "Plan cancer Togo 2022 to 2025, draft of October 2021 (PDF via ICCP)", url: PLAN },
            { label: "ICCP portal: resources returned for Togo", url: ICCP_SEARCH },
            { label: "WHO: Cancer Country Profile 2020, Togo (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "radiotherapy",
          title: "One radiotherapy centre in IAEA's directory: one linear accelerator in Lomé",
          plain:
            "IAEA's directory lists one radiotherapy centre in Togo, the Centre International de Cancérologie de Lomé, with one linear accelerator and no brachytherapy. The draft cancer plan describes radiotherapy in Togo as private and absent from public hospitals.",
          detail:
            "DIRAC's public data, read on 16 November 2026 with the entry updated in 2025, gives the centre's address as Rue de l'Ecosse, Amadahome, Lomé, and one megavoltage linear accelerator. The République Togolaise news site reported on 3 November 2022 that the health minister had inaugurated the centre and that it also has screening equipment; the article does not mention radiotherapy, and the draft plan of October 2021 already noted a private radiotherapy centre without naming it. WHO's 2020 profile counted no external beam radiotherapy in 2019, and its 2021 cervical profile recorded radiotherapy as not generally available and no brachytherapy unit. None of these sources says what treatment at the centre costs a patient or whether health insurance pays for it, and OnCo found no website for the centre.",
          links: [
            { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC },
            { label: "République Togolaise: Le Togo se dote d'un centre de cancérologie (3 November 2022)", url: CICL_NEWS },
            { label: "Plan cancer Togo 2022 to 2025, draft of October 2021 (PDF via ICCP)", url: PLAN },
            { label: "WHO: cervical cancer profile 2021, Togo (PDF)", url: WHO_CERVICAL },
          ],
        },
        {
          id: "oncology-unit",
          title: "Oncology at CHU Sylvanus Olympio, where six in ten patients in one 2024 study had metastatic disease",
          plain:
            "CHU Sylvanus Olympio in Lomé has an oncology unit that a 2026 paper calls the national referral unit, and a paediatric unit that the cancer plan builds children's cancer care around. In a 2024 survey there, 61% of the patients being cared for had metastatic cancer.",
          detail:
            "Adani-Ifè and colleagues interviewed 123 family caregivers in the unit from March to May 2024: 61% of the patients were at a metastatic stage, 61.8% of caregivers had been caring for more than six months, and 61% reported a mild to moderate burden and 15.4% a moderate to severe one. The draft cancer plan counts among the country's cancer workforce two paediatric oncologists, two cancer surgeons, one nuclear medicine physician and 22 radiologists; its figure for medical oncologists is not legible in the text OnCo read. WHO's 2021 profile recorded palliative care as not generally available in primary care or in the community, and reported opioid consumption of 0 mg of oral morphine equivalent per person in 2017.",
          links: [
            { label: "Adani-Ifè et al., burden of family caregivers in the oncology unit of CHU Sylvanus Olympio (BMC Palliat Care 2026)", url: ADANI_2026 },
            { label: "Plan cancer Togo 2022 to 2025, draft of October 2021 (PDF via ICCP)", url: PLAN },
            { label: "WHO: cervical cancer profile 2021, Togo (PDF)", url: WHO_CERVICAL },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Togo", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Togo",
          plain:
            "None of the trials in OnCo's records lists Togo among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Togo. A query of the registry itself for cancer studies with a site in Togo returned two on that day, neither of them a treatment trial: the French African Pediatric Oncology Registry (NCT03803735), a hospital-based registry of children with cancer that is recruiting and lists CHU Sylvanus Olympio in Lomé among its sites, and a study of anal lesions and HPV infection among men who have sex with men (NCT04910438), whose status the registry gives as unknown. Published research from Togo that OnCo read is mostly from the pathology laboratory in Lomé.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Togo", url: CTGOV },
            { label: "ClinicalTrials.gov: French African Pediatric Oncology Registry (NCT03803735)", url: GFAOP_REGISTRY },
            { label: "Darre et al., cancers in Togo 2009 to 2016 (Asian Pac J Cancer Prev 2017)", url: DARRE_2017 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not found, not readable or blocked for this page",
      plain:
        "OnCo did not find an adopted cancer plan, any results from the cancer registry, the medicines regulator's own texts, or a source on which cancer treatments health insurance pays for and what radiotherapy costs a patient in Togo.",
      detail:
        "What happened, source by source, on 16 November 2026. INAM's site (inam.tg) answered with a challenge page (HTTP 403) and was not read further. The Ministry of Health's home and programmes pages returned menus with no text on cancer. The address dpml.tg returned \"page not found\", and ClinRegs has no Togo profile. The annexes of Decree 2023-093, which list the covered procedures and medicines, were not read. The cancer plan on the ICCP portal is a draft of October 2021 with unfinished passages, and the 2017 to 2022 cervical cancer plan and the 2017 imPACT report it cites were not found. In WHO's 2020 profile the counts of radiation oncologists, medical physicists and radiologists are \"n/a\". A future pass should read the insurance annexes, the pharmacy law, and any report of the national cancer programme; until then the programme at the Ministry of Health, INAM and CNSS are where to ask.",
      links: [
        { label: "Ministère de la Santé, Togo", url: MOH },
        { label: "Institut National d'Assurance Maladie (INAM)", url: INAM },
        { label: "ICCP portal: resources returned for Togo", url: ICCP_SEARCH },
      ],
    },
  ],
  institutions: ["togo-ministry-of-health", "chu-sylvanus-olympio", "cicl-lome", "who", "iarc", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-darre-cancers-togo-2009-2016-apjcp-2017", "paper-amegbor-cancers-togo-1984-2008-jce-2011"],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 and 2021 country profiles and immunisation data, the draft Plan cancer Togo 2022 to 2025 on the ICCP portal, the 2023 decrees on universal health insurance, IAEA's DIRAC directory, the World Bank's health expenditure series, the African Union's treaty list, ClinicalTrials.gov and papers resolved through Europe PMC.",
  verify:
    "IARC's figures for Togo are modelled, the cancer plan read here is a draft from 2021, and services change. Check with the Ministry of Health's national cancer programme, your insurer (INAM or CNSS) or the treating hospital before relying on this page.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Togo (PDF)", url: IARC_FACTSHEET },
    { label: "Plan cancer Togo 2022 to 2025, draft of October 2021 (PDF via ICCP)", url: PLAN },
    { label: "Ministère de la Santé, Togo", url: MOH },
  ],
};

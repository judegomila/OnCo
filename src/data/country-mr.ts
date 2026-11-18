import type { CountryDive } from "@/data/country-dive";

/**
 * Mauritania deep dive: the hand-written cards for /countries/mr/ (wave 14). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Mauritania, the Plan
 * national de lutte contre le cancer 2018 to 2022 (PDF text from the ICCP portal), WHO's Cancer Country Profile 2020
 * and cervical cancer profile 2021, the national essential medicines list for 2024 to 2026 (PDF text from WHO), IAEA
 * DIRAC's public equipment data, the health insurance fund's home page, WHO's immunisation data API, the World Bank's
 * health expenditure series, the African Union's treaty list, WHO's August 2026 list of regulators at maturity level 3
 * and 4, ClinicalTrials.gov's API, an Enabel article on medicines supply, and two Pan African Medical Journal articles
 * read in full on the journal's site (Europe PMC holds no abstract for either). The Ministry of Health's site reset the
 * connection and is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/478-mauritania-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/mrt-2020.pdf";
const WHO_CERVICAL = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-mrt-2021-country-profile-en.pdf";
const PLAN = "https://www.iccp-portal.org/sites/default/files/plans/MRT_B5_PLAN%20CANCER%20MAURITANIE%20VF%202018%20(1).pdf";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=Mauritania";
const NEML = "https://cdn.who.int/media/docs/default-source/essential-medicines/national-essential-medicines-lists-(neml)/afro_neml/mauritania-nemle-2024.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20%27MRT%27%20and%20contains%28ANTIGEN%2C%27HPV%27%29";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20%27MRT%27%20and%20contains%28ANTIGEN%2C%27HPV%27%29";
const WB_OOP = "https://api.worldbank.org/v2/country/MRT/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_CHE = "https://api.worldbank.org/v2/country/MRT/indicator/SH.XPD.CHEX.PC.CD?format=json";
const WB_GOV = "https://api.worldbank.org/v2/country/MRT/indicator/SH.XPD.GHED.CH.ZS?format=json";
const WB_EXT = "https://api.worldbank.org/v2/country/MRT/indicator/SH.XPD.EHEX.CH.ZS?format=json";
const CNAM = "https://www.cnam.mr/fr/";
const MOH = "https://www.sante.gov.mr/";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const ENABEL = "https://www.eeas.europa.eu/sites/default/files/2026/documents/2.%20Article_garantir%20l%E2%80%99acce%CC%80s%20aux%20me%CC%81dicaments%20essentiels%20en%20Mauritanie.pdf";
const AFCRN_LIST = "https://afcrn.org/index.php/membership/membership-list";
const CTGOV = "https://clinicaltrials.gov/search?country=Mauritania&cond=cancer";
const GFAOP_REGISTRY = "https://clinicaltrials.gov/study/NCT03803735";
const BABA_2013 = "https://doi.org/10.11604/pamj.2013.14.149.2565";
const MAMINA_2025 = "https://doi.org/10.11604/pamj.2025.52.36.45258";
const FUSEINI_2025 = "https://doi.org/10.1002/ijgo.70145";

export const MR_DIVE: CountryDive = {
  iso2: "MR",
  iso3: "MRT",
  name: "Mauritania",
  flag: "🇲🇷",
  asOf: "2026-11-16",
  title: "Cancer in Mauritania",
  description:
    "Cancer in Mauritania: a national oncology centre in Nouakchott created in 2009, listed by IAEA with three linear accelerators, a cobalt unit and brachytherapy in an entry last updated in 2019, a cancer plan for 2018 to 2022 with no successor found, HPV vaccination since 2021 with 60% of girls given a first dose by age 15 in 2025, an essential medicines list for 2024 to 2026 that includes cancer medicines, health spending of about USD 92 a person in 2023 with 44% paid out of pocket, IARC's modelled estimate of 3,605 new cancers and 2,281 deaths in 2024, and no trial in OnCo's records with a site in Mauritania.",
  lede:
    "Mauritania's national reference centre for cancer is the Centre National d'Oncologie in Nouakchott, created in 2009 so that patients could be treated in the country instead of being sent abroad; the cancer plan of 2018 described chemotherapy, radiotherapy and radioiodine units there. Girls have been vaccinated against HPV since 2021. WHO's 2021 profile recorded no population cancer registry, and IARC's figures for Mauritania are modelled from neighbouring countries' rates: they are estimates, not counts.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Mauritania is 3,605 new cancers and 2,281 deaths, an age-standardised incidence of 119.2 per 100,000 (107.1 in men, 130.5 in women) and an age-standardised mortality of 78.9. These are modelled figures, not counts. The fact sheet gives its incidence method as \"rates based on incidence estimates or registry data from neighbouring countries\", which is IARC's method 5, and its mortality method as national incidence estimates applied to model-based mortality-to-incidence ratios from registry survival data. What has been counted in Mauritania comes from hospital pathology records, which show a different picture for men: skin cancer and lymphomas are prominent there and liver cancer is rarely biopsied, while IARC's model puts liver cancer second in men.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer is estimated to look like in Mauritania",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Mauritania (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 3,600 new cancers a year by IARC's estimate, six in ten in women",
          plain:
            "IARC estimates 3,605 new cancers in Mauritania in 2024, 2,179 of them in women, and 2,281 cancer deaths. Breast cancer is estimated to be the commonest cancer and the commonest cause of cancer death, followed by prostate and cervical cancer. These are modelled figures, not counts.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 844 breast cancers (399 deaths), 404 prostate cancers (258 deaths), 390 cervical cancers (239 deaths), 260 liver cancers (234 deaths), 210 colorectal cancers (118 deaths) and 137 stomach cancers (110 deaths). The risk of developing a cancer before age 75 is 12.6%, and an estimated 6,759 people are living within five years of a diagnosis. IARC built the incidence figures from neighbouring countries' rates, not from cases counted in Mauritania. WHO's 2020 profile estimated 244 cancers a year in children aged 0 to 14, and noted that its own estimates carry a high degree of uncertainty because they are based on no population-based cancer registry and no national data on deaths from non-communicable diseases.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Mauritania (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, Mauritania (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "pathology-register",
          title: "What has been counted: 3,305 biopsy-confirmed cancers at the national hospital, 2000 to 2009",
          plain:
            "The pathology department of the Centre Hospitalier National in Nouakchott recorded 3,305 cancers confirmed by biopsy from 2000 to 2009, 58% of them in women. Breast and cervical cancer led in women; in men skin cancer came first, then prostate cancer.",
          detail:
            "Baba and Sauvaget report 1,902 cases in women and 1,403 in men: in women 485 breast cancers, a quarter of the biopsies, then 344 cervical cancers, 218 cancers of the ovary and womb and 114 skin cancers; in men 218 skin cancers, 203 prostate cancers, 179 digestive cancers and 151 lymphomas. The paper notes three liver cancers analysed in the ten years. The authors state that these results reflect neither the incidence nor the burden of cancer in Mauritania, because many patients diagnosed with cancer never have a biopsy. The cancer plan of 2018 cites a later count of 1,115 new cases registered in 2016, of whom 112 had died, from a second study that it does not name. A 2025 letter from the Centre National d'Oncologie counts 429 breast cancers there in 2020 and 2021, 15.71% of all the cancers diagnosed at the centre.",
          links: [
            { label: "Baba and Sauvaget, ten years of the Nouakchott hospital register (Pan Afr Med J 2013)", url: BABA_2013 },
            { label: "Plan national de lutte contre le cancer 2018 to 2022, Mauritania (PDF via ICCP)", url: PLAN },
            { label: "Mamina et al., 200 breast cancers at the Centre National d'Oncologie (Pan Afr Med J 2025)", url: MAMINA_2025 },
          ],
        },
      ],
      tables: [
        {
          id: "mr-globocan-sites",
          title: "The five commonest cancers in Mauritania, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024, modelled from neighbouring countries' rates.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 844, deaths: 399 },
            { site: "Prostate", cases: 404, deaths: 258 },
            { site: "Cervix uteri", cases: 390, deaths: 239 },
            { site: "Liver", cases: 260, deaths: 234 },
            { site: "Colorectum", cases: 210, deaths: 118 },
          ],
          note: "Estimates, not counts: IARC's stated method for Mauritania is rates from neighbouring countries. The all-cancers total is 3,605 new cases and 2,281 deaths.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Mauritania (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "mr-hospital-register",
          title: "What the Nouakchott hospital register counted, 2000 to 2009",
          caption: "Biopsy-confirmed cancers recorded by the pathology department of the Centre Hospitalier National, the four leading groups in each sex.",
          columns: [
            { key: "sex", label: "Sex" },
            { key: "site", label: "Cancer" },
            { key: "cases", label: "Cases in ten years", numeric: true },
          ],
          rows: [
            { sex: "Women (1,902 cases)", site: "Breast", cases: 485 },
            { sex: "Women (1,902 cases)", site: "Cervix", cases: 344 },
            { sex: "Women (1,902 cases)", site: "Ovary and womb", cases: 218 },
            { sex: "Women (1,902 cases)", site: "Skin", cases: 114 },
            { sex: "Men (1,403 cases)", site: "Skin, melanoma included", cases: 218 },
            { sex: "Men (1,403 cases)", site: "Prostate", cases: 203 },
            { sex: "Men (1,403 cases)", site: "Digestive (colorectal and oesophagus)", cases: 179 },
            { sex: "Men (1,403 cases)", site: "Lymphomas", cases: 151 },
          ],
          note: "A hospital register counts biopsies examined, not the cancers in a population: the authors say it reflects neither incidence nor burden, since many patients are never biopsied.",
          sources: [{ label: "Baba and Sauvaget, ten years of the Nouakchott hospital register (Pan Afr Med J 2013)", url: BABA_2013 }],
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
          title: "A registry team trained, but no population registry on record",
          plain:
            "Mauritania's cancer plan of 2018 says the health ministry had formed and trained a registry team, but that the registry had no dedicated staff, premises or budget. WHO's 2021 profile recorded no population-based cancer registry.",
          detail:
            "The plan says the team was trained in cancer registration with support from the African Cancer Registry Network, that the registry's head also attended an IARC course and a course in Brazzaville supported by the IAEA and WHO, and that the team worked as a coordination committee because the registry was not yet formally established; setting up a national population-based registry and hospital registers in every centre treating cancer was among the plan's aims. WHO's 2020 profile recorded \"No information\" on a population registry for 2019 and \"No coverage\" for the quality of death registration in 2007 to 2016; its 2021 cervical cancer profile answered \"No\". The African Cancer Registry Network's membership list, read on 16 November 2026, has no registry in Mauritania. OnCo found no later report on whether the registry now runs; the directorate for disease control at the Ministry of Health, which issued the plan, is where to ask.",
          links: [
            { label: "Plan national de lutte contre le cancer 2018 to 2022, Mauritania (PDF via ICCP)", url: PLAN },
            { label: "WHO: Cancer Country Profile 2020, Mauritania (PDF)", url: WHO_PROFILE },
            { label: "WHO: cervical cancer profile 2021, Mauritania (PDF)", url: WHO_CERVICAL },
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
          title: "About USD 92 a person on health; households paid 44% in 2023, down from 60% in 2019",
          plain:
            "Mauritania spent about 92 US dollars a person on health in 2023, and households paid 44% of it out of their own pockets, according to WHO's health expenditure figures published by the World Bank. In 2019 the household share was 60%.",
          detail:
            "The World Bank's series, from WHO's Global Health Expenditure Database, gives current health spending of USD 54.63 per person in 2019, 73.63 in 2021, 91.54 in 2022 and 92.11 in 2023, and out-of-pocket spending of 60.3%, 48.2%, 41.7% and 43.8% of current health spending in those years. Domestic government spending was 34.2% of current health spending in 2023 and external funding 19.5%. The cancer plan for 2018 to 2022 costed its own activities at 2,480,000,000 ouguiyas over five years, with the largest lines for cancer surgery and for palliative care.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Mauritania (API)", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Mauritania (API)", url: WB_CHE },
            { label: "World Bank: domestic general government health expenditure, % of current health expenditure, Mauritania (API)", url: WB_GOV },
            { label: "World Bank: external health expenditure, % of current health expenditure, Mauritania (API)", url: WB_EXT },
            { label: "Plan national de lutte contre le cancer 2018 to 2022, Mauritania (PDF via ICCP)", url: PLAN },
          ],
        },
        {
          id: "who-pays",
          title: "The cancer plan's account: care at the national centre free for people without means",
          plain:
            "The cancer plan of 2018 says the creation of the Centre National d'Oncologie made it possible to treat cancer patients locally and free of charge, and that its founding aims included free medicines for people without means. It reports that 94% of the centre's care was paid as care for the indigent and 6% by the health insurance fund, CNAM.",
          detail:
            "Those shares appear beside a count of patients treated up to August 2012, so they describe the centre's first years; OnCo found no current figure and no published rule on what a patient pays there today. The plan gives the reason the centre was built: in 2008, by CNAM's figures, 441 of the 1,366 patients sent abroad for treatment had cancer, at an estimated cost of 1.5 billion ouguiyas, and the plan credits the centre with ending evacuations for radiotherapy and cutting those for chemotherapy by more than 98%. CNAM's site, read on 16 November 2026, tells insured people to check that a provider is contracted with it or bills will not be reimbursed, and that care abroad without a prior evacuation is reimbursed at the national rate. OnCo did not find CNAM's list of covered cancer treatments. Ask the centre's social service or CNAM before treatment starts.",
          links: [
            { label: "Plan national de lutte contre le cancer 2018 to 2022, Mauritania (PDF via ICCP)", url: PLAN },
            { label: "Caisse Nationale d'Assurance Maladie (CNAM), Mauritania", url: CNAM },
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
          id: "regulator-dpl",
          title: "Medicines are regulated from within the health ministry; OnCo has not read its rules for trials",
          plain:
            "In Mauritania medicines are regulated by a directorate of the Ministry of Health under the pharmacy law of 2010, and a medicine needs a marketing authorisation even when it is on the essential medicines list. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include Mauritania.",
          detail:
            "The order fixing the essential medicines list for 2024 to 2026 cites Law 2010-022 of 10 February 2010 on pharmacy, amended by Law 2015-029, names the director of pharmacy and laboratories (the DPL), with the ministry's secretary general and inspector general, as responsible for carrying it out, and states that being on the list does not exempt a product from marketing authorisation. An Enabel article on medicines supply, which reports results to 2025, names a differently titled directorate, the Direction de l'Approvisionnement en Médicaments et en produits de Santé, as the body it helps to evaluate marketing authorisation applications in the international common technical format; OnCo could not confirm from the ministry which name is current, because its site reset the connection. The African Union's list dated 19 September 2023 records neither a signature nor a ratification by Mauritania of the African Medicines Agency treaty. OnCo read no text on how clinical trials are authorised.",
          links: [
            { label: "Liste nationale des médicaments et consommables essentiels 2024 to 2026, Mauritania (PDF via WHO)", url: NEML },
            { label: "Enabel: access to essential medicines in Mauritania (PDF on the EU external action site)", url: ENABEL },
            { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML3 },
            { label: "African Union: signatures and ratifications of the African Medicines Agency treaty (19 September 2023, PDF)", url: AMA },
          ],
        },
        {
          id: "essential-medicines",
          title: "The essential medicines list for 2024 to 2026 includes chemotherapy, hormone treatment and morphine",
          plain:
            "Mauritania's essential medicines list for 2024 to 2026 has a section for cancer and palliative care. It lists more than thirty cancer medicines, among them tamoxifen, letrozole, paclitaxel, cisplatin, imatinib and sunitinib, and morphine by mouth and by injection.",
          detail:
            "The section on cytotoxic medicines includes carboplatin, oxaliplatin, docetaxel, cabazitaxel, gemcitabine, doxorubicin, methotrexate and BCG for the bladder; the hormone section has tamoxifen, anastrozole, exemestane and letrozole. The list contains neither trastuzumab nor rituximab. Its covering order, whose number is left blank in the copy WHO holds, makes the list indicative for national, specialised and regional hospitals and binding at lower levels. A place on the list is not the same as a medicine on the shelf: the Enabel article cites a 2018 survey that put the average availability of essential medicines in public health facilities at 22%, and the cancer plan of 2018 described stock-outs of some medicines and opioids available in Nouakchott and nowhere else.",
          links: [
            { label: "Liste nationale des médicaments et consommables essentiels 2024 to 2026, Mauritania (PDF via WHO)", url: NEML },
            { label: "Enabel: access to essential medicines in Mauritania (PDF on the EU external action site)", url: ENABEL },
            { label: "Plan national de lutte contre le cancer 2018 to 2022, Mauritania (PDF via ICCP)", url: PLAN },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: cervical cancer profile 2021, Mauritania (PDF)", url: WHO_CERVICAL },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination since 2021: 60% of girls had a first dose by age 15 in 2025",
          plain:
            "WHO's immunisation database records the HPV vaccine as introduced nationwide in Mauritania in 2021. By WHO's estimate, 60% of girls had received a first dose by age 15 in 2025 and 27% a final dose.",
          detail:
            "The rows for Mauritania, read on 16 November 2026, give coverage by age 15 with a first dose among girls of 44% in 2022, 65% in 2023, 55% in 2024 and 60% in 2025, and with a final dose of 19%, 18%, 26% and 27%. Programme coverage of the target group with a first dose was 35% in 2021, 20% in 2022, 16% in 2023, 51% in 2024 and 54% in 2025 (75,973 doses for a target of 140,353). The country's own administrative figure for first doses in 2025 is 76,819 doses against a target of 66,026, which is more than 100% of the target. WHO's 2021 cervical cancer profile already listed the vaccine as in the national programme from 2021, with no coverage data at that time.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Mauritania (immunisation data API)", url: WHO_HPV_API },
            { label: "WHO: HPV vaccine introduction rows for Mauritania (immunisation data API)", url: WHO_HPV_INTRO },
            { label: "WHO: cervical cancer profile 2021, Mauritania (PDF)", url: WHO_CERVICAL },
          ],
        },
        {
          id: "screening-2021",
          title: "No national cervical screening programme on WHO's record; about one woman in twenty screened",
          plain:
            "WHO's 2021 profile recorded no national cervical screening programme in Mauritania, and estimated that 5% of women aged 30 to 49 had been screened in the previous five years. The cancer plan describes a pilot screening unit for breast and cervical cancer opened in Rosso in 2015.",
          detail:
            "The 2021 profile gives, for 2019, 6% of women aged 30 to 49 ever screened and 5% in the last five years, with early detection guidelines in primary care present and a defined referral system and national management guidelines absent. WHO's 2020 profile recorded no cervical or breast screening programme in 2019. The cancer plan for 2018 to 2022 set out to install cervical screening units using visual inspection followed by treatment, and names cervical cancer as the cancer for which screening is feasible in Mauritania. A 2025 paper in the International Journal of Gynaecology and Obstetrics reports a pilot programme of cervical precancer screening and treatment in Nouakchott, meant to inform a national programme; Europe PMC holds no abstract for it and OnCo has not read its results.",
          links: [
            { label: "WHO: cervical cancer profile 2021, Mauritania (PDF)", url: WHO_CERVICAL },
            { label: "WHO: Cancer Country Profile 2020, Mauritania (PDF)", url: WHO_PROFILE },
            { label: "Plan national de lutte contre le cancer 2018 to 2022, Mauritania (PDF via ICCP)", url: PLAN },
            { label: "Fuseini et al., cervical precancer screening pilot in Nouakchott (Int J Gynaecol Obstet 2025)", url: FUSEINI_2025 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in Mauritania",
      cards: [
        {
          id: "cno",
          title: "One national centre, built so that patients would not have to be sent abroad",
          plain:
            "The Centre National d'Oncologie in Nouakchott was created in 2009 as the national reference centre for diagnosing and treating cancer. The cancer plan of 2018 said it had chemotherapy, radiotherapy and radioiodine units and received more than a thousand patients a year.",
          detail:
            "The plan dates the first cancer patient sent abroad to 1991, and says the centre's founding aims included cutting evacuations by 80%. It also sets out what was missing in 2018: one medical oncologist, two radiotherapists, two pathologists and one haematologist for the country; problems with preventive maintenance of equipment and stock-outs of some medicines and single-use supplies; no standard protocols for diagnosis and treatment; many patients lost to follow-up; and about 80% of patients arriving at an advanced stage. Outside the centre it found no organised palliative care. A 2025 letter from the centre's pathology department adds that a third of 200 patients with breast cancer, nearly all of them women, had waited three months or more before consulting, and that testing tumours for hormone receptors and HER2 became reliably available there in 2024.",
          links: [
            { label: "Plan national de lutte contre le cancer 2018 to 2022, Mauritania (PDF via ICCP)", url: PLAN },
            { label: "Mamina et al., 200 breast cancers at the Centre National d'Oncologie (Pan Afr Med J 2025)", url: MAMINA_2025 },
          ],
        },
        {
          id: "radiotherapy",
          title: "Radiotherapy: three linear accelerators, a cobalt unit and brachytherapy in IAEA's directory, last updated in 2019",
          plain:
            "IAEA's directory lists one radiotherapy centre in Mauritania, the Centre National d'Oncologie, with three linear accelerators, one cobalt-60 unit and high-dose-rate brachytherapy. The entry was last updated in 2019, so it may not match the machines working today.",
          detail:
            "DIRAC's public data, read on 16 November 2026, gives the centre's address as 86 Avenue Jean Kennedy, Nouakchott, with three megavoltage linear accelerators, one cobalt-60 teletherapy unit, one iridium-192 high-dose-rate brachytherapy unit, one CT scanner and one treatment planning system. The cancer plan of 2018 counted one linear accelerator in the country, and said a nuclear medicine unit was being set up. WHO's 2021 cervical profile recorded radiotherapy and chemotherapy as generally available in 2021 and cancer surgery as not. The sources disagree on the number of machines and none is recent; a patient should ask the centre what is running.",
          links: [
            { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC },
            { label: "Plan national de lutte contre le cancer 2018 to 2022, Mauritania (PDF via ICCP)", url: PLAN },
            { label: "WHO: cervical cancer profile 2021, Mauritania (PDF)", url: WHO_CERVICAL },
          ],
        },
        {
          id: "plan",
          title: "A cancer plan for 2018 to 2022; OnCo found no successor",
          plain:
            "Mauritania's Plan national de lutte contre le cancer covered 2018 to 2022. The ICCP portal's search for Mauritania on 16 November 2026 returned that plan and a plan for non-communicable diseases, and no later cancer plan.",
          detail:
            "The plan was issued by the health ministry's directorate for disease control after preparation that began in November 2012. Its five axes are prevention, screening and early diagnosis, treatment including palliative care, training with research and surveillance, and coordination. Among its targets were a 15% fall in cancer mortality and more than half of women over 40 screened for cervical cancer at least once in their lives; among its planned works, radiotherapy units with two linear accelerators at each university hospital and a national registry. WHO's 2020 profile recorded a national cancer plan as operational in 2019 and cancer management guidelines as absent. OnCo found no evaluation of what the plan achieved.",
          links: [
            { label: "Plan national de lutte contre le cancer 2018 to 2022, Mauritania (PDF via ICCP)", url: PLAN },
            { label: "ICCP portal: resources returned for Mauritania", url: ICCP_SEARCH },
            { label: "WHO: Cancer Country Profile 2020, Mauritania (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Mauritania", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Mauritania",
          plain:
            "None of the trials in OnCo's records lists Mauritania among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Mauritania. A query of the registry itself for cancer studies with a site in Mauritania returned one that day, and it is not a treatment trial: a hospital-based registry of childhood cancer in French-speaking Africa sponsored by the French Africa Pediatric Oncology Group (NCT03803735), which was recruiting that day and lists the Centre National d'Oncologie in Nouakchott among its sites. Published research from Mauritania that OnCo read comes from the pathology departments of the national hospital and of the oncology centre.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Mauritania", url: CTGOV },
            { label: "ClinicalTrials.gov: hospital-based registry of childhood cancer in French-speaking Africa (NCT03803735)", url: GFAOP_REGISTRY },
            { label: "Baba and Sauvaget, ten years of the Nouakchott hospital register (Pan Afr Med J 2013)", url: BABA_2013 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not found, not readable or out of date for this page",
      plain:
        "OnCo did not find a current cancer plan, a working population registry, a recent count of radiotherapy machines, what a patient pays at the national oncology centre today, or the rules for authorising clinical trials in Mauritania.",
      detail:
        "What happened, source by source, on 16 November 2026. The Ministry of Health's site (sante.gov.mr) reset the connection and was not read. The national oncology centre has no website that OnCo found. IAEA's entry for the centre dates from 2019, and the cancer plan's account of who pays dates from about 2012. CNAM's home page was read but not its list of covered services. Europe PMC holds no abstract for the three Mauritanian papers used or cited here; two were read in full on the journal's site and the third, the cervical screening pilot, was not read. In WHO's 2020 profile the counts of radiation oncologists and medical physicists are \"n/a\". A future pass should read the national health development plan for 2022 to 2030, CNAM's benefits pages and the pharmacy law; until then the Centre National d'Oncologie and CNAM are where to ask.",
      links: [
        { label: "Ministère de la Santé, Mauritanie", url: MOH },
        { label: "Caisse Nationale d'Assurance Maladie (CNAM), Mauritania", url: CNAM },
        { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC },
      ],
    },
  ],
  institutions: ["cno-nouakchott", "mauritania-ministry-of-health", "cnam-mauritania", "who", "iarc", "iaea"],
  companies: [],
  drugs: ["tamoxifen", "letrozole", "anastrozole", "exemestane", "paclitaxel", "docetaxel", "cabazitaxel", "cisplatin", "carboplatin", "oxaliplatin", "imatinib", "sunitinib"],
  trials: [],
  papers: ["paper-baba-nouakchott-hospital-register-pamj-2013", "paper-mamina-breast-cancer-cno-nouakchott-pamj-2025"],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, Mauritania's cancer plan for 2018 to 2022 on the ICCP portal, WHO's 2020 and 2021 country profiles and immunisation data, the national essential medicines list for 2024 to 2026, IAEA's DIRAC directory, the health insurance fund's site, the World Bank's health expenditure series, the African Union's treaty list, ClinicalTrials.gov and two Pan African Medical Journal articles read in full. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November, and the count on this page is unchanged.",
  verify:
    "IARC's figures for Mauritania are modelled, and much of what is described here comes from a plan written in 2018 and a directory entry from 2019. Check with the Centre National d'Oncologie, CNAM or the Ministry of Health before relying on this page.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Mauritania (PDF)", url: IARC_FACTSHEET },
    { label: "Plan national de lutte contre le cancer 2018 to 2022, Mauritania (PDF via ICCP)", url: PLAN },
    { label: "Caisse Nationale d'Assurance Maladie (CNAM), Mauritania", url: CNAM },
  ],
};

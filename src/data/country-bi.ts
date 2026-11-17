import type { CountryDive } from "@/data/country-dive";

/**
 * Burundi deep dive: the hand-written cards for /countries/bi/ (wave 14). Every figure was read from the raw text of its
 * source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Burundi, the Ministry of
 * Public Health's Plan stratégique national de lutte contre le cancer au Burundi 2024 to 2028 (January 2024, PDF text
 * from the ICCP portal), WHO's Cancer Country Profile 2020 (the ICCP portal's copy) and cervical cancer profile 2021,
 * two WHO Africa news pages on the cancer unit at the Centre Médico-Chirurgical de Kinindo (April 2021 and February
 * 2023), the World Bank's health expenditure series from its API, WHO's immunisation data API, IAEA DIRAC's public
 * equipment data, WHO's August 2026 list of regulators at maturity level 3 and 4, the African Union's list of
 * signatures of the African Medicines Agency treaty, ClinicalTrials.gov's API, and one paper resolved through Europe
 * PMC with its abstract read. The regulator's site did not resolve; that and the other unread sources are under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/108-burundi-fact-sheet.pdf";
const PLAN = "https://www.iccp-portal.org/sites/default/files/plans/PNLC%20Version%20pr%C3%A9fac%C3%A9.pdf";
const WHO_PROFILE = "https://www.iccp-portal.org/sites/default/files/plans/BDI_2020.pdf";
const WHO_CX = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-bdi-2021-country-profile-en.pdf";
const WHO_BI_2021 = "https://www.afro.who.int/node/14378";
const WHO_BI_2023 = "https://www.afro.who.int/node/17240";
const WB_OOP = "https://api.worldbank.org/v2/country/BDI/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_CHE = "https://api.worldbank.org/v2/country/BDI/indicator/SH.XPD.CHEX.PC.CD?format=json";
const WB_EXT = "https://api.worldbank.org/v2/country/BDI/indicator/SH.XPD.EHEX.CH.ZS?format=json";
const WB_GOV = "https://api.worldbank.org/v2/country/BDI/indicator/SH.XPD.GHED.CH.ZS?format=json";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'BDI'%20and%20contains(ANTIGEN,'HPV')";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const TA_PAPER = "https://doi.org/10.1002/ijc.34117";
const CTGOV = "https://clinicaltrials.gov/search?country=Burundi&cond=cancer";
const CTGOV_TA = "https://clinicaltrials.gov/study/NCT05211271";

const L_IARC = { label: "IARC: GLOBOCAN 2024 fact sheet, Burundi (PDF)", url: IARC_FACTSHEET };
const L_PLAN = { label: "Plan stratégique national de lutte contre le cancer au Burundi 2024 to 2028 (January 2024, PDF via ICCP)", url: PLAN };
const L_WHO = { label: "WHO: Cancer Country Profile 2020, Burundi (PDF, ICCP portal)", url: WHO_PROFILE };
const L_CX = { label: "WHO: cervical cancer country profile 2021, Burundi (PDF)", url: WHO_CX };
const L_WHO_2021 = { label: "WHO Africa: minister and WHO representative visit the CMCK cancer unit (April 2021)", url: WHO_BI_2021 };
const L_WHO_2023 = { label: "WHO Africa: Pour combattre le cancer, il faut le dépister tôt (4 February 2023)", url: WHO_BI_2023 };
const L_DIRAC = { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC };
const L_TA = { label: "Sauvaget et al., thermal ablation for cervical neoplasia in Burundi (International Journal of Cancer 2022)", url: TA_PAPER };

export const BI_DIVE: CountryDive = {
  iso2: "BI",
  iso3: "BDI",
  name: "Burundi",
  flag: "🇧🇮",
  asOf: "2026-11-16",
  title: "Cancer in Burundi",
  description:
    "Cancer in Burundi: a national cancer plan for 2024 to 2028, three chemotherapy units (one public, two private) and four medical oncologists in the plan's count, no radiotherapy unit, a Bujumbura registry that ran for one year from March 2019, IARC's estimate of 7,992 new cancers and 4,993 deaths in 2024 modelled from neighbouring countries, cervical cancer leading, HPV vaccination not in the national schedule, about a quarter of health spending paid out of pocket, and no trial in OnCo's records with a site in the country.",
  lede:
    "Burundi has a national cancer plan for 2024 to 2028, which counts three chemotherapy units, one public at the Kamenge university hospital and two private, and four medical oncologists. It has no radiotherapy unit: a doctor at the Kinindo centre in Bujumbura told WHO in 2023 that patients who can pay are sent to Rwanda or Kenya. A cancer registry for Bujumbura ran for one year from 2019, so IARC's figures for Burundi are modelled from neighbouring countries.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Burundi is 7,992 new cancers and 4,993 deaths, an age-standardised incidence of 113.2 per 100,000 (110.2 in men, 119.2 in women). These are modelled figures, not counts. IARC's fact sheet names no country-specific source for incidence and gives its method as rates based on incidence estimates or registry data from neighbouring countries; mortality is national incidence estimates applied to modelled mortality-to-incidence ratios built on registry survival data. Burundi's own cancer plan says the same: data are poorly documented for want of a registry, and the national figures it quotes are IARC's estimates.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Burundi",
      aside: L_IARC,
      cards: [
        {
          id: "shape",
          title: "About 8,000 new cancers a year in IARC's estimate, with cervical cancer the commonest",
          plain:
            "IARC estimates 7,992 new cancers in Burundi in 2024, 4,688 of them in women, and 4,993 cancer deaths. Cervical cancer is the commonest, then breast and prostate cancer. The figures are modelled from neighbouring countries, not counted in Burundi.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,242 cervical cancers (732 deaths), 966 breast cancers (456 deaths), 912 prostate cancers (556 deaths), 521 colorectal cancers (293 deaths) and 460 oesophageal cancers (425 deaths), in a population of 14.0 million. Cervical cancer causes the most cancer deaths, followed by prostate and breast cancer. The risk of developing a cancer before age 75 is 12.3%, and an estimated 12,623 people are living within five years of a diagnosis. The fact sheet's methods box gives the incidence method as rates based on incidence estimates or registry data from neighbouring countries. WHO's 2020 profile estimated 723 cancers a year in children aged 0 to 14.",
          links: [L_IARC, L_WHO],
        },
        {
          id: "registry",
          title: "A Bujumbura cancer registry started in March 2019 and worked for one year",
          plain:
            "A population-based cancer registry for the city of Bujumbura started in March 2019 with outside training and equipment. The national cancer plan says it worked for one year only, for want of funding, means of collecting data and trained staff.",
          detail:
            "The plan for 2024 to 2028 traces the attempts: a first initiative in 1992 with the Imperial Cancer Research Fund at Oxford, stopped by the events of 1993; a feasibility study in 2014 with WHO; an imPACT review in March 2017 by the IAEA with WHO and IARC, which recommended a population-based registry for Bujumbura; and the registry's start in March 2019, helped by the East, Central and Southern Africa Health Community, IARC and the African Cancer Registry Network, which trained the team and equipped an office in the oncology service. It then worked for one year, limited to collecting and recording data. The plan cites one older series: 4,135 cancers confirmed over 30 years, 1978 to 2008, at what was then the country's single pathology laboratory, at the Kamenge university hospital, with a mean age at diagnosis of 41.3 years in women and 48.5 in men, and it cautions that a single-centre series of patients who could pay for pathology cannot be generalised. The African Cancer Registry Network's member list, read on 16 November 2026, has no registry for Burundi.",
          links: [L_PLAN, { label: "African Cancer Registry Network: member registries", url: "https://afcrn.org/index.php/membership/membership-list" }],
        },
      ],
      tables: [
        {
          id: "bi-globocan-sites",
          title: "The five commonest cancers in Burundi, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024, modelled from neighbouring countries' rates.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Cervix uteri", cases: 1242, deaths: 732 },
            { site: "Breast", cases: 966, deaths: 456 },
            { site: "Prostate", cases: 912, deaths: 556 },
            { site: "Colorectum", cases: 521, deaths: 293 },
            { site: "Oesophagus", cases: 460, deaths: 425 },
          ],
          note: "The Bujumbura registry published no counts that OnCo found to set beside these. They are estimates; WHO's 2020 profile describes Burundi's as having a high degree of uncertainty because they are not based on a population-based registry.",
          sources: [L_IARC, L_WHO],
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
          title: "About USD 28 a person on health in 2023, more than half of it from external funders",
          plain:
            "Burundi spent about 28 US dollars a person on health in 2023. External funders paid 57% of it, households 24% out of pocket and the government 15% from its own revenue, according to the World Bank's series from WHO's health expenditure database. The cancer plan says patients who can afford it seek care abroad.",
          detail:
            "The World Bank's series gives current health spending of USD 23 per person in 2021, 26 in 2022 and 28 in 2023, and out-of-pocket spending of 24.3%, 25.2% and 24.5% of current health spending in those years. In 2023 external health expenditure was 57.4% and government spending from domestic sources 14.7%. The cancer plan of January 2024 gives prices a patient meets: a pathology examination costs 50,000 Burundi francs in the public laboratory, with results in one to two months, and about 200,000 francs in the private one, with results in two to three weeks; a CT scan costs 150,000 to 200,000 francs in the public sector. Among its strategies are advocacy for free screening and treatment of early changes in the cervix, a yearly budget line for cancer medicines, and adding oral morphine to the medicines the mutual health insurer pays for; OnCo found no source showing that any of these has been adopted.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Burundi (API)", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Burundi (API)", url: WB_CHE },
            { label: "World Bank: external health expenditure, Burundi (API)", url: WB_EXT },
            { label: "World Bank: domestic general government health expenditure, Burundi (API)", url: WB_GOV },
            L_PLAN,
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
          id: "abrema",
          title: "ABREMA is the medicines regulator; OnCo could not read its own pages",
          plain:
            "The national cancer plan names Burundi's medicines regulator as the Autorité Burundaise de Régulation des Médicaments et des Aliments à usage humain (ABREMA). Its website did not resolve when OnCo tried it, so this page states nothing about how it approves cancer medicines or authorises trials.",
          detail:
            "The plan lists ABREMA among its abbreviations and names it as responsible for one measure, a strict control on the use of pesticides, in its tables on exposure to cancer-causing agents. The address abrema.bi did not resolve on 16 November 2026. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include Burundi. The African Union's list of 19 September 2023 shows Burundi signed the treaty establishing the African Medicines Agency on 11 June 2021 and records no ratification. The plan notes that the country had no pharmacist trained in managing cancer medicines. A future pass should read the regulator's founding decree and its register of approved medicines.",
          links: [
            L_PLAN,
            { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML3 },
            { label: "African Union: signatures and ratifications of the African Medicines Agency treaty (19 September 2023, PDF)", url: AMA },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: L_PLAN,
      cards: [
        {
          id: "cervical",
          title: "Cervical screening by campaign in six provinces; no national screening policy",
          plain:
            "Burundi has no national policy on screening and early detection, the cancer plan says. The health ministry, with non-governmental organisations, has run campaigns to find and treat early changes in the cervix among women aged 25 and over in six provinces, and testing for the virus has been done in the country since May 2023.",
          detail:
            "The plan names the health provinces of Muyinga, Kayanza, Cibitoke, Rutana, Bururi and Bujumbura Mairie for the campaigns, and says an HPV test has been run locally since 1 May 2023 at 85,000 Burundi francs. It plans a pilot of cervical screening by HPV test. WHO's 2021 cervical cancer profile recorded no national screening programme, 8% of women aged 30 to 49 screened in the previous five years and 10% ever (2019), and national guidelines on cervical cancer management in place. A study with a first author at IARC used thermal ablation to treat 86 women in Burundi who had a positive visual inspection; among the 82 examined at 12 months the cure rate was 96%, and no major adverse event was reported.",
          links: [L_PLAN, L_CX, L_TA],
        },
        {
          id: "hpv",
          title: "HPV vaccination is not in the national schedule",
          plain:
            "The cancer plan of January 2024 says vaccination against human papillomavirus, the virus that causes cervical cancer, is not in Burundi's national vaccination calendar. WHO's immunisation database shows the vaccine as not introduced in every year to 2025.",
          detail:
            "The plan records that a national scale-up of HPV vaccination had been planned for December 2018 with support from the vaccine alliance Gavi (the plan writes its name out as the Global Agency for Vaccination and Immunization), and sets introducing the vaccine into the routine programme as a priority strategy for 2025, with a target of 90% coverage. WHO's immunisation data API, queried on 16 November 2026, lists the HPV vaccine as not introduced for each year from 2006 to 2025 and holds 44 coverage rows for Burundi, none with a figure in it. WHO's 2021 cervical cancer profile also records it as not included.",
          links: [L_PLAN, { label: "WHO immunisation data: HPV vaccine introduction, Burundi (API)", url: WHO_HPV_INTRO }, L_CX],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Burundi does",
      title: "What stands out in Burundi",
      cards: [
        {
          id: "plan",
          title: "A national cancer plan for 2024 to 2028, following the plan for 2016 to 2020",
          plain:
            "The Ministry of Public Health published a national strategic plan against cancer for 2024 to 2028 in January 2024. It follows a national cancer policy of 2015 and a first plan for 2016 to 2020, and it sets out to build a national reference cancer centre by December 2026.",
          detail:
            "The plan was written under the ministry's integrated programme against non-communicable diseases and covers governance and financing, prevention and early detection, diagnosis and treatment, palliative care, and registration, surveillance and research. Its treatment strategy includes identifying a site and starting construction of a national reference centre in cancer care in 2024, and preparing a technical cooperation file with the IAEA for a radiotherapy centre. OnCo found no source on whether construction has started; WHO Africa's 2023 page speaks of a cancer treatment centre the government plans. WHO's 2020 profile had recorded an operational national cancer plan for 2019.",
          links: [L_PLAN, L_WHO_2023, L_WHO],
        },
        {
          id: "services",
          title: "Three chemotherapy units, four medical oncologists, two pathology laboratories",
          plain:
            "The cancer plan counts three chemotherapy units in Burundi: one public, at the Kamenge university hospital, and two private, at the Centre Médico-Chirurgical de Kinindo and Tanganyika Hospital. It counts four medical oncologists, two paediatric oncologists and two pathologists.",
          detail:
            "Together the units have 69 inpatient beds and 18 day-hospital beds. The plan also counts one nuclear medicine physician, one gynaecological oncologist, 13 radiologists and 26 surgeons, and no medical physicist, dosimetrist or radiotherapy technician. Cancer can be confirmed by pathology in one public laboratory, at Kamenge, and one private one; some immunohistochemistry is sent to France. For staging there are two CT scanners and one MRI in the public sector and two CT scanners in the private sector, and two mammography machines, both private. The Kinindo unit opened in June 2020; WHO Africa reported in February 2023 that its oncology service had received 1,427 patients, 467 of them diagnosed with cancer, 75 of those children.",
          links: [L_PLAN, L_WHO_2023, L_WHO_2021],
        },
        {
          id: "radiotherapy",
          title: "No radiotherapy unit: patients who can pay go to Rwanda or Kenya",
          plain:
            "Burundi does not have a radiotherapy unit, the national cancer plan says, and IAEA's directory lists no centre there. A doctor at the Kinindo centre told WHO in 2023 that patients who need radiotherapy and have the means are sent abroad, to Rwanda or Kenya.",
          detail:
            "The plan states that many cancers common in Burundi could be found early but that curing them remains a challenge because the country has no radiotherapy unit, and that patients who are able must seek care abroad. IAEA DIRAC's public equipment data, read on 16 November 2026, has no row for Burundi. WHO Africa's page of 4 February 2023 quotes a doctor of the Kinindo oncology service: chemotherapy with curative or palliative intent is given there, radiotherapy is not available, and patients with the means are referred abroad, naming Rwanda and Kenya. The oncologist who set up the unit told WHO in 2021 that he had seen how many Burundians travelled and paid large sums for treatment in Rwanda, where he then worked.",
          links: [L_PLAN, L_DIRAC, L_WHO_2023, L_WHO_2021],
        },
        {
          id: "palliative",
          title: "Morphine by injection for inpatients; oral morphine not available",
          plain:
            "The cancer plan says palliative care is not part of the basic package of Burundi's health facilities. Morphine is available in public facilities by injection and for inpatients, and the oral morphine solution, which the plan recommends as easy to make and affordable, is not available in the country.",
          detail:
            "The plan estimates that 18,244 people in Burundi need palliative care and says palliative care should be a public health priority. It notes that one private facility holds some morphine capsules, at a cost most people cannot meet, and that severe or chronic pain is therefore hard to manage in or out of hospital. Burundi's palliative care association and the non-governmental organisation Kenyera are among the institutions listed below. WHO's 2021 cervical cancer profile reported opioid consumption for 2017 as under 1 mg of oral morphine equivalent per person.",
          links: [L_PLAN, L_CX],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Burundi", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Burundi; the registry lists one completed study",
          plain:
            "None of the trials in OnCo's records lists Burundi among its countries. ClinicalTrials.gov itself lists one cancer study with a site there, a completed evaluation of thermal ablation for early changes in the cervix. OnCo holds a selection of trials, not the whole registry.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Burundi. A query of the registry's own API that day for cancer studies with a location in Burundi returned one, NCT05211271, Evaluating Thermal Ablation in the Treatment of Cervical Neoplasia, sponsored by IARC at Kamenge University Hospital and marked completed. Its results, published in the International Journal of Cancer in 2022, cover 86 women: 82 were examined at 12 months and the overall cure rate was 96%. The national cancer plan describes clinical and epidemiological cancer research in Burundi as little developed, held back by the cost of investigations and pathology.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Burundi", url: CTGOV },
            { label: "ClinicalTrials.gov: NCT05211271", url: CTGOV_TA },
            L_TA,
            L_PLAN,
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not found or not read for this page",
      plain:
        "OnCo could not read the medicines regulator's pages, and did not find whether the national reference cancer centre is being built, whether any insurance scheme now pays for cancer care, or any count published by the Bujumbura registry.",
      detail:
        "The address abrema.bi did not resolve on 16 November 2026. The Ministry of Public Health's site answered, and OnCo read only its front page, on which the word cancer did not appear that day. OnCo read the cancer plan's situation analysis and strategy tables as PDF text and not its full costing. Two papers on cancer care in Burundi, in Bulletin du Cancer (2023) and The Oncologist (2020), were found by title through Europe PMC and not read. A future pass should read them, the report of the 2017 imPACT review, and any news of the reference centre. Until then the treating unit and the ministry's programme against non-communicable diseases are the places to ask.",
      links: [L_PLAN, { label: "Ministère de la Santé Publique et de la Lutte contre le Sida", url: "https://minisante.gov.bi/" }],
    },
  ],
  institutions: ["chu-kamenge", "cmck-bujumbura", "abspa-burundi", "kenyera-burundi", "who", "iarc", "iaea"],
  companies: [],
  drugs: ["morphine"],
  trials: [],
  papers: ["paper-sauvaget-thermal-ablation-burundi-ijc-2022"],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: the Ministry of Public Health's national cancer plan for 2024 to 2028, IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 cancer profile and 2021 cervical cancer profile, two WHO Africa news pages, the World Bank's health expenditure series, WHO's immunisation data, IAEA's directory of radiotherapy centres, ClinicalTrials.gov, and the abstract of one paper resolved through Europe PMC.",
  verify:
    "The counts of units and staff here are the cancer plan's, dated January 2024. Check with the treating unit or the Ministry of Public Health before relying on them.",
  verifyLinks: [L_PLAN, L_IARC],
};
